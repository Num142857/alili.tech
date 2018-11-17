---
title: 'Promise必知必会' 
date: 2018-11-18 2:30:09
hidden: true
slug: 1oconx0ywmh
categories: [reprint]
---

{{< raw >}}
<p>&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x4E2D;&#x7ECF;&#x5E38;&#x4F1A;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x5E38;&#x89C1;&#x7684;&#x5F02;&#x6B65;&#x6709;&#xFF1A;</p><ul><li>&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF1A;ajax</li><li>IO&#x64CD;&#x4F5C;&#xFF1A; readFile</li><li>&#x5B9A;&#x65F6;&#x5668;&#xFF1A;setTimeout</li></ul><p><a href="http://anata.me" rel="nofollow noreferrer" target="_blank">&#x535A;&#x5BA2;&#x5730;&#x5740;</a></p><h2 id="articleHeader0">&#x56DE;&#x8C03;</h2><p>&#x6700;&#x57FA;&#x7840;&#x7684;&#x5F02;&#x6B65;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x83AB;&#x8FC7;&#x4E8E;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E86;</p><p>&#x524D;&#x7AEF;&#x7ECF;&#x5E38;&#x4F1A;&#x5728;&#x6210;&#x529F;&#x65F6;&#x548C;&#x5931;&#x8D25;&#x65F6;&#x5206;&#x522B;&#x6CE8;&#x518C;&#x56DE;&#x8C03;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const req = new XMLHttpRequest();
req.open(&apos;GET&apos;, URL, true);
req.onload = function () {
    // &#x6210;&#x529F;&#x7684;&#x56DE;&#x8C03;
    if (req.status === 200) {
        console.log(req.statusText)
    }
};
req.onerror = function () {
    // &#x5931;&#x8D25;&#x7684;&#x56DE;&#x8C03;
    console.log(req.statusText)
};
req.send();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> req = <span class="hljs-keyword">new</span> XMLHttpRequest();
req.open(<span class="hljs-string">&apos;GET&apos;</span>, URL, <span class="hljs-literal">true</span>);
req.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x6210;&#x529F;&#x7684;&#x56DE;&#x8C03;</span>
    <span class="hljs-keyword">if</span> (req.status === <span class="hljs-number">200</span>) {
        <span class="hljs-built_in">console</span>.log(req.statusText)
    }
};
req.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x5931;&#x8D25;&#x7684;&#x56DE;&#x8C03;</span>
    <span class="hljs-built_in">console</span>.log(req.statusText)
};
req.send();</code></pre><p>node&#x7684;&#x5F02;&#x6B65;api&#xFF0C;&#x5219;&#x901A;&#x5E38;&#x53EA;&#x6CE8;&#x518C;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x901A;&#x8FC7;&#x7EA6;&#x5B9A;&#x7684;&#x53C2;&#x6570;&#x6765;&#x5224;&#x65AD;&#x5230;&#x5E95;&#x662F;&#x6210;&#x529F;&#x8FD8;&#x662F;&#x5931;&#x8D25;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require(&quot;fs&quot;);
fs.readFile(&apos;input.txt&apos;, function (err, data) {
    // &#x56DE;&#x8C03;&#x51FD;&#x6570;
    // &#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;err&#xFF0C;&#x5982;&#x679C;&#x6709;err&#xFF0C;&#x5219;&#x8868;&#x793A;&#x8C03;&#x7528;&#x5931;&#x8D25;
   if (err) {
       return console.error(err);
   }
   console.log(&quot;&#x5F02;&#x6B65;&#x8BFB;&#x53D6;: &quot; + data.toString());
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;fs&quot;</span>);
fs.readFile(<span class="hljs-string">&apos;input.txt&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, data</span>) </span>{
    <span class="hljs-comment">// &#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
    <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;err&#xFF0C;&#x5982;&#x679C;&#x6709;err&#xFF0C;&#x5219;&#x8868;&#x793A;&#x8C03;&#x7528;&#x5931;&#x8D25;</span>
   <span class="hljs-keyword">if</span> (err) {
       <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.error(err);
   }
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x5F02;&#x6B65;&#x8BFB;&#x53D6;: &quot;</span> + data.toString());
});</code></pre><p>&#x56DE;&#x8C03;&#x7684;&#x5F02;&#x6B65;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x672C;&#x8EAB;&#x4E5F;&#x7B80;&#x5355;&#x6613;&#x61C2;&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x6709;&#x4E00;&#x4E2A;&#x81F4;&#x547D;&#x7684;&#x7F3A;&#x70B9;&#xFF1A;<strong>&#x65E0;&#x6CD5;&#x4F18;&#x96C5;&#x7684;&#x63A7;&#x5236;&#x5F02;&#x6B65;&#x6D41;&#x7A0B;</strong></p><p>&#x4EC0;&#x4E48;&#x610F;&#x601D;&#xFF1F;</p><p>&#x5355;&#x4E2A;&#x5F02;&#x6B65;&#x5F53;&#x7136;&#x53EF;&#x4EE5;&#x5F88;&#x7B80;&#x5355;&#x7684;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x4F46;&#x662F;&#x5BF9;&#x4E8E;&#x591A;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x5C31;&#x4F1A;&#x9677;&#x5165;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8BF7;&#x6C42;data1&#x6210;&#x529F;&#x540E;&#x518D;&#x8BF7;&#x6C42;data2&#xFF0C;&#x6700;&#x540E;&#x8BF7;&#x6C42;data3
const ajax = $.ajax({
    url: &apos;data1.json&apos;,
    success: function(data1) {
        console.log(data1);
        $.ajax({
            url: &apos;data2.json&apos;,
            success: function(data2) {
                console.log(data2);
                $.ajax({
                    url: &apos;data3.json&apos;,
                    success: function(data3) {
                        console.log(data3);

                    }
                })
            }
        })
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x8BF7;&#x6C42;data1&#x6210;&#x529F;&#x540E;&#x518D;&#x8BF7;&#x6C42;data2&#xFF0C;&#x6700;&#x540E;&#x8BF7;&#x6C42;data3</span>
<span class="hljs-keyword">const</span> ajax = $.ajax({
    <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;data1.json&apos;</span>,
    <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data1</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data1);
        $.ajax({
            <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;data2.json&apos;</span>,
            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data2</span>) </span>{
                <span class="hljs-built_in">console</span>.log(data2);
                $.ajax({
                    <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;data3.json&apos;</span>,
                    <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data3</span>) </span>{
                        <span class="hljs-built_in">console</span>.log(data3);

                    }
                })
            }
        })
    }
})</code></pre><p>&#x8FD9;&#x79CD;&#x8981;&#x6309;&#x987A;&#x5E8F;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x6D41;&#x7A0B;&#x63A7;&#x5236;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5C31;&#x663E;&#x5F97;&#x6349;&#x895F;&#x89C1;&#x8098;&#x4E86;&#x3002;&#x8FD9;&#x65F6;&#xFF0C;Promise&#x7684;&#x5F02;&#x6B65;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x5C31;&#x88AB;&#x63D0;&#x4E86;&#x51FA;&#x6765;&#x3002;</p><h2 id="articleHeader1">Promise</h2><p>&#x5F53;&#x521D;&#x5728;&#x5B66;Promise&#x65F6;&#xFF0C;&#x770B;&#x5F97;&#x6211;&#x771F;&#x662F;&#x4E00;&#x8138;&#x61F5;&#x903C;&#xFF0C;&#x5B8C;&#x5168;&#x4E0D;&#x660E;&#x767D;&#x8FD9;&#x8D27;&#x5230;&#x5E95;&#x600E;&#x4E48;&#x7528;&#x3002;&#x5176;&#x5B9E;&#xFF0C;Promise&#x7684;api&#x8981;&#x5206;&#x6210;&#x4E24;&#x90E8;&#x5206;&#x6765;&#x7406;&#x89E3;&#xFF1A;</p><ol><li>Promise&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF1A;resolve reject (&#x6539;&#x53D8;&#x5185;&#x90E8;&#x72B6;&#x6001;)</li><li>Promise&#x5BF9;&#x8C61;: then catch (&#x6D41;&#x7A0B;&#x63A7;&#x5236;)</li></ol><h2 id="articleHeader2">Promise&#x5BF9;&#x8C61;</h2><p>Promise&#x5BF9;&#x8C61;&#x4EE3;&#x8868;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x6709;&#x4E09;&#x79CD;&#x72B6;&#x6001;&#xFF1A;pending&#xFF08;&#x8FDB;&#x884C;&#x4E2D;&#xFF09;&#x3001;fulfilled&#xFF08;&#x5DF2;&#x6210;&#x529F;&#xFF09;&#x548C;rejected&#xFF08;&#x5DF2;&#x5931;&#x8D25;&#xFF09;</p><p>&#x521D;&#x59CB;&#x65F6;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x72B6;&#x6001;&#x4E3A;pending&#xFF0C;&#x4E4B;&#x540E;&#x53EA;&#x80FD;&#x53D8;&#x6210;fulfilled&#x548C;rejected&#x5176;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;</p><p>then&#x65B9;&#x6CD5;&#x6709;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5206;&#x522B;&#x5BF9;&#x5E94;&#x72B6;&#x6001;&#x4E3A;fulfilled&#x548C;rejected&#x65F6;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x5176;&#x4E2D;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x53EF;&#x9009;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-comment">// success</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
  <span class="hljs-comment">// failure</span>
});</code></pre><p>&#x901A;&#x5E38;&#x6211;&#x4EEC;&#x4F1A;&#x7701;&#x7565;then&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x800C;&#x6539;&#x7528;catch&#x6765;&#x6CE8;&#x518C;&#x72B6;&#x6001;&#x53D8;&#x4E3A;rejected&#x65F6;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise.then(function(value) {
  // success
}).catch(function(error) {
  // failure
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-comment">// success</span>
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
  <span class="hljs-comment">// failure</span>
});</code></pre><h2 id="articleHeader3">Promise&#x6784;&#x9020;&#x51FD;&#x6570;</h2><p>Promise&#x5BF9;&#x8C61;&#x600E;&#x4E48;&#x751F;&#x6210;&#x7684;&#x5462;&#xFF1F;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x6784;&#x9020;&#x51FD;&#x6570;new&#x51FA;&#x6765;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const promise = new Promise(function(resolve, reject) {
    
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    
});</code></pre><p>Promise&#x6784;&#x9020;&#x51FD;&#x6570;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;resolve&#x548C;reject</p><p>resolve, reject&#x662F;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x7531;JavaScript&#x5F15;&#x64CE;&#x63D0;&#x4F9B;&#xFF0C;&#x4E0D;&#x7528;&#x81EA;&#x5DF1;&#x7F16;&#x5199;</p><p>&#x524D;&#x9762;&#x6211;&#x4EEC;&#x8BF4;&#x8FC7;&#xFF0C;Promise&#x5BF9;&#x8C61;&#x6709;&#x4E09;&#x79CD;&#x72B6;&#x6001;&#xFF0C;&#x521D;&#x59CB;&#x65F6;&#x4E3A;pending&#xFF0C;&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x53D8;&#x6210;fulfilled&#x6216;&#x8005;rejected&#xFF0C;&#x90A3;&#x600E;&#x4E48;&#x6539;&#x53D8;&#x72B6;&#x6001;&#x5462;&#xFF1F;&#x7B54;&#x6848;&#x5C31;&#x662F;&#x8C03;&#x7528;resolve&#x6216;&#x8005;reject</p><p>&#x8C03;&#x7528;resolve&#x65F6;&#xFF0C;&#x72B6;&#x6001;&#x53D8;&#x6210;fulfilled&#xFF0C;&#x8868;&#x793A;&#x5F02;&#x6B65;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;;&#x8C03;&#x7528;reject&#x65F6;&#xFF0C;&#x72B6;&#x6001;&#x53D8;&#x6210;rejected&#xFF0C;&#x8868;&#x793A;&#x5F02;&#x6B65;&#x5931;&#x8D25;&#x3002;</p><h2 id="articleHeader4">&#x56DE;&#x8C03;&#x548C;Promise&#x7684;&#x5BF9;&#x6BD4;</h2><p><strong>&#x5176;&#x5B9E;&#x8FD9;&#x91CC;&#x5C31;&#x662F;Promise&#x6700;&#x96BE;&#x7406;&#x89E3;&#x7684;&#x5730;&#x65B9;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x770B;&#x4E0B;&#x4F8B;&#x5B50;&#xFF1A;</strong></p><p>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5C01;&#x88C5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getURL(URL, success, error) {
    const req = new XMLHttpRequest();
    req.open(&apos;GET&apos;, URL, true);
    req.onload = function () {
        if (req.status === 200) {
            success(req.responseText);
        } else {
            error(new Error(req.statusText));
        }
    };
    req.onerror = function () {
        error(new Error(req.statusText));
    };
    req.send();
}
const URL = &quot;http://httpbin.org/get&quot;;
getURL(URL, function onFulfilled(value) {
    console.log(value);
}, function onRejected(error) {
    console.error(error);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getURL</span>(<span class="hljs-params">URL, success, error</span>) </span>{
    <span class="hljs-keyword">const</span> req = <span class="hljs-keyword">new</span> XMLHttpRequest();
    req.open(<span class="hljs-string">&apos;GET&apos;</span>, URL, <span class="hljs-literal">true</span>);
    req.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (req.status === <span class="hljs-number">200</span>) {
            success(req.responseText);
        } <span class="hljs-keyword">else</span> {
            error(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(req.statusText));
        }
    };
    req.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        error(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(req.statusText));
    };
    req.send();
}
<span class="hljs-keyword">const</span> URL = <span class="hljs-string">&quot;http://httpbin.org/get&quot;</span>;
getURL(URL, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onFulfilled</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-built_in">console</span>.log(value);
}, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onRejected</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.error(error);
})</code></pre><p>Promise&#x5C01;&#x88C5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getURL(URL) {
    return new Promise(function (resolve, reject) {
        const req = new XMLHttpRequest();
        req.open(&apos;GET&apos;, URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}

const URL = &quot;http://httpbin.org/get&quot;;
getURL(URL).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){
    console.error(error);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getURL</span>(<span class="hljs-params">URL</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-keyword">const</span> req = <span class="hljs-keyword">new</span> XMLHttpRequest();
        req.open(<span class="hljs-string">&apos;GET&apos;</span>, URL, <span class="hljs-literal">true</span>);
        req.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (req.status === <span class="hljs-number">200</span>) {
                resolve(req.responseText);
            } <span class="hljs-keyword">else</span> {
                reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(req.statusText));
            }
        };
        req.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(req.statusText));
        };
        req.send();
    });
}

<span class="hljs-keyword">const</span> URL = <span class="hljs-string">&quot;http://httpbin.org/get&quot;</span>;
getURL(URL).then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onFulfilled</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value);
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onRejected</span>(<span class="hljs-params">error</span>)</span>{
    <span class="hljs-built_in">console</span>.error(error);
});</code></pre><p>&#x4E24;&#x6BB5;&#x4EE3;&#x7801;&#x6700;&#x5927;&#x7684;&#x533A;&#x522B;&#x5C31;&#x662F;&#xFF1A;</p><p><strong>&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5C01;&#x88C5;&#x7684;getURL&#x51FD;&#x6570;&#xFF0C;&#x9700;&#x8981;&#x660E;&#x663E;&#x7684;&#x4F20;&#x7ED9;&#x5B83;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;success&#x548C;error&#x7684;&#x6700;&#x7EC8;&#x8C03;&#x7528;&#x662F;&#x5728;getURL&#x91CC;&#x88AB;&#x8C03;&#x7528;&#x7684;</strong></p><p><strong>&#x7528;Promise&#x5C01;&#x88C5;&#x7684;getURL&#x51FD;&#x6570;&#xFF0C;&#x5B8C;&#x5168;&#x4E0D;&#x5173;&#x5FC3;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x53EA;&#x9700;&#x8981;&#x5728;ajax&#x6210;&#x529F;&#x65F6;&#x8C03;&#x7528;resolve()&#xFF0C;&#x544A;&#x8BC9;promise&#x5BF9;&#x8C61;&#xFF0C;&#x4F60;&#x73B0;&#x5728;&#x7684;&#x72B6;&#x6001;&#x53D8;&#x6210;&#x4E86;fulfilled&#xFF0C;&#x5728;ajax&#x5931;&#x8D25;&#x65F6;&#xFF0C;&#x8C03;&#x7528;reject()&#x3002;&#x800C;&#x771F;&#x6B63;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x662F;&#x5728;getURL&#x7684;&#x5916;&#x9762;&#x88AB;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;then&#x548C;catch&#x4E2D;&#x8C03;&#x7528;</strong></p><p>then&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Promise&#x5B9E;&#x4F8B;&#xFF08;&#x6CE8;&#x610F;&#xFF0C;&#x4E0D;&#x662F;&#x539F;&#x6765;&#x90A3;&#x4E2A;Promise&#x5B9E;&#x4F8B;&#xFF09;&#x3002;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x91C7;&#x7528;&#x94FE;&#x5F0F;&#x5199;&#x6CD5;&#xFF0C;&#x5373;then&#x65B9;&#x6CD5;&#x540E;&#x9762;&#x518D;&#x8C03;&#x7528;&#x53E6;&#x4E00;&#x4E2A;then&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getURL(URL) {
    return new Promise(function (resolve, reject) {
        const req = new XMLHttpRequest();
        req.open(&apos;GET&apos;, URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}

const URL = &quot;http://httpbin.org/get&quot;;
const URL2 = &quot;http://deepred5.com/cors.php?search=ntr&quot;;
getURL(URL).then(function onFulfilled(value){
    console.log(value);
    // &#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Promise&#x5BF9;&#x8C61;
    return getURL(URL2)
}).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){
    console.error(error);
});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getURL</span>(<span class="hljs-params">URL</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-keyword">const</span> req = <span class="hljs-keyword">new</span> XMLHttpRequest();
        req.open(<span class="hljs-string">&apos;GET&apos;</span>, URL, <span class="hljs-literal">true</span>);
        req.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (req.status === <span class="hljs-number">200</span>) {
                resolve(req.responseText);
            } <span class="hljs-keyword">else</span> {
                reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(req.statusText));
            }
        };
        req.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(req.statusText));
        };
        req.send();
    });
}

<span class="hljs-keyword">const</span> URL = <span class="hljs-string">&quot;http://httpbin.org/get&quot;</span>;
<span class="hljs-keyword">const</span> URL2 = <span class="hljs-string">&quot;http://deepred5.com/cors.php?search=ntr&quot;</span>;
getURL(URL).then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onFulfilled</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value);
    <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Promise&#x5BF9;&#x8C61;</span>
    <span class="hljs-keyword">return</span> getURL(URL2)
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onFulfilled</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value);
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onRejected</span>(<span class="hljs-params">error</span>)</span>{
    <span class="hljs-built_in">console</span>.error(error);
});
</code></pre><p>&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x5C31;&#x5145;&#x5206;&#x8BF4;&#x660E;&#x4E86;Promise&#x5BF9;&#x4E8E;&#x6D41;&#x7A0B;&#x63A7;&#x5236;&#x7684;&#x4F18;&#x52BF;&#xFF1A;&#x8BFB;&#x53D6;URL&#x7684;&#x6570;&#x636E;&#x540E;&#x518D;&#x8BFB;&#x53D6;URL2&#xFF0C;&#x6CA1;&#x6709;&#x4E86;&#x4E4B;&#x524D;&#x7684;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x95EE;&#x9898;&#x3002;</p><h2 id="articleHeader5">Promise&#x5E94;&#x7528;</h2><p>Promise&#x7ECF;&#x5E38;&#x7528;&#x4E8E;&#x5BF9;&#x51FD;&#x6570;&#x7684;&#x5F02;&#x6B65;&#x6D41;&#x7A0B;&#x5C01;&#x88C5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getURL(URL) {
    return new Promise(function (resolve, reject) {
        const req = new XMLHttpRequest();
        req.open(&apos;GET&apos;, URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getURL</span>(<span class="hljs-params">URL</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-keyword">const</span> req = <span class="hljs-keyword">new</span> XMLHttpRequest();
        req.open(<span class="hljs-string">&apos;GET&apos;</span>, URL, <span class="hljs-literal">true</span>);
        req.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (req.status === <span class="hljs-number">200</span>) {
                resolve(req.responseText);
            } <span class="hljs-keyword">else</span> {
                reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(req.statusText));
            }
        };
        req.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(req.statusText));
        };
        req.send();
    });
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> preloadImage = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">path</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">const</span> image = <span class="hljs-keyword">new</span> Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require(&apos;fs&apos;)
const path = require(&apos;path&apos;) 
const readFilePromise = function (fileName) {
    return new Promise((resolve, reject) =&gt; {
        fs.readFile(fileName, (err, data) =&gt; {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>) 
<span class="hljs-keyword">const</span> readFilePromise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fileName</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        fs.readFile(fileName, (err, data) =&gt; {
            <span class="hljs-keyword">if</span> (err) {
                reject(err)
            } <span class="hljs-keyword">else</span> {
                resolve(data.toString())
            }
        })
    })
}</code></pre><p>&#x7ED3;&#x5408;&#x4E0A;&#x9762;&#x51E0;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x51FA;Promise&#x5C01;&#x88C5;&#x4EE3;&#x7801;&#x7684;&#x57FA;&#x672C;&#x5957;&#x8DEF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const methodPromise = function() {
    return new Promise((resolve, reject) =&gt; {
        // &#x5F02;&#x6B65;&#x6D41;&#x7A0B;
        if (/* &#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6210;&#x529F; */){
            resolve(value);
        } else {
            reject(error);
        }
    })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> methodPromise = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-comment">// &#x5F02;&#x6B65;&#x6D41;&#x7A0B;</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-comment">/* &#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6210;&#x529F; */</span>){
            resolve(value);
        } <span class="hljs-keyword">else</span> {
            reject(error);
        }
    })
}</code></pre><h2 id="articleHeader6">Promise.race Promise.all</h2><p>Promise.all &#x63A5;&#x6536;&#x4E00;&#x4E2A;promise&#x5BF9;&#x8C61;&#x7684;&#x6570;&#x7EC4;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x5F53;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x91CC;&#x7684;&#x6240;&#x6709;promise&#x5BF9;&#x8C61;&#x5168;&#x90E8;&#x53D8;&#x4E3A;resolve&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B83;&#x624D;&#x4F1A;&#x53BB;&#x8C03;&#x7528;then&#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#x679C;&#x5176;&#x4E2D;&#x6709;&#x4E00;&#x4E2A;&#x53D8;&#x4E3A;rejected&#xFF0C;&#x5C31;&#x76F4;&#x63A5;&#x8C03;&#x7528;catch&#x65B9;&#x6CD5;</p><p>&#x4F20;&#x7ED9;then&#x65B9;&#x6CD5;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x91CC;&#x9762;&#x5206;&#x522B;&#x5BF9;&#x5E94;promise&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getURL(URL) {
    return new Promise(function (resolve, reject) {
        const req = new XMLHttpRequest();
        req.open(&apos;GET&apos;, URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}

Promise.all([getURL(&apos;http://deepred5.com/cors.php?search=ntr&apos;), getURL(&apos;http://deepred5.com/cors.php?search=rbq&apos;)])
.then((dataArr) =&gt; {
    const [data1, data2] = dataArr;
}).catch((err) =&gt; {
    console.log(err)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getURL</span>(<span class="hljs-params">URL</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-keyword">const</span> req = <span class="hljs-keyword">new</span> XMLHttpRequest();
        req.open(<span class="hljs-string">&apos;GET&apos;</span>, URL, <span class="hljs-literal">true</span>);
        req.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (req.status === <span class="hljs-number">200</span>) {
                resolve(req.responseText);
            } <span class="hljs-keyword">else</span> {
                reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(req.statusText));
            }
        };
        req.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(req.statusText));
        };
        req.send();
    });
}

<span class="hljs-built_in">Promise</span>.all([getURL(<span class="hljs-string">&apos;http://deepred5.com/cors.php?search=ntr&apos;</span>), getURL(<span class="hljs-string">&apos;http://deepred5.com/cors.php?search=rbq&apos;</span>)])
.then(<span class="hljs-function">(<span class="hljs-params">dataArr</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> [data1, data2] = dataArr;
}).catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(err)
})</code></pre><p>Promise.race&#x7C7B;&#x4F3C;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x53EA;&#x8981;&#x6709;&#x4E00;&#x4E2A;Promise&#x53D8;&#x6210;resolve&#x5C31;&#x8C03;&#x7528;then&#x65B9;&#x6CD5;</p><h2 id="articleHeader7">Promise.resolve Promise.reject</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(42); 
// &#x7B49;&#x4EF7;&#x4E8E;
new Promise(function(resolve){
    resolve(42);
});

Promise.reject(new Error(&quot;&#x51FA;&#x9519;&#x4E86;&quot;))
// &#x7B49;&#x4EF7;&#x4E8E;
new Promise(function(resolve,reject){
    reject(new Error(&quot;&#x51FA;&#x9519;&#x4E86;&quot;));
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">42</span>); 
<span class="hljs-comment">// &#x7B49;&#x4EF7;&#x4E8E;</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>)</span>{
    resolve(<span class="hljs-number">42</span>);
});

<span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&quot;&#x51FA;&#x9519;&#x4E86;&quot;</span>))
<span class="hljs-comment">// &#x7B49;&#x4EF7;&#x4E8E;</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
    reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&quot;&#x51FA;&#x9519;&#x4E86;&quot;</span>));
});</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(42).then(function(value){
    console.log(value);
});

Promise.reject(new Error(&quot;&#x51FA;&#x9519;&#x4E86;&quot;)).catch(function(error){
    console.error(error);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">42</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-built_in">console</span>.log(value);
});

<span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&quot;&#x51FA;&#x9519;&#x4E86;&quot;</span>)).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
    <span class="hljs-built_in">console</span>.error(error);
});</code></pre><p>Promise.resolve&#x65B9;&#x6CD5;&#x53E6;&#x4E00;&#x4E2A;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x5C06;thenable&#x5BF9;&#x8C61;&#x8F6C;&#x6362;&#x4E3A;promise&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const promise = Promise.resolve($.ajax(&apos;/json/comment.json&apos;));// =&gt; promise&#x5BF9;&#x8C61;
promise.then(function(value){
   console.log(value);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> promise = <span class="hljs-built_in">Promise</span>.resolve($.ajax(<span class="hljs-string">&apos;/json/comment.json&apos;</span>));<span class="hljs-comment">// =&gt; promise&#x5BF9;&#x8C61;</span>
promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
   <span class="hljs-built_in">console</span>.log(value);
});</code></pre><p>thenable&#x5BF9;&#x8C61;&#x6307;&#x7684;&#x662F;&#x5177;&#x6709;then&#x65B9;&#x6CD5;&#x7684;&#x5BF9;&#x8C61;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> thenable = {
  <span class="hljs-attr">then</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    resolve(<span class="hljs-number">42</span>);
  }
};
<span class="hljs-keyword">let</span> p1 = <span class="hljs-built_in">Promise</span>.resolve(thenable);
p1.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-built_in">console</span>.log(value);  <span class="hljs-comment">// 42</span>
});</code></pre><h2 id="articleHeader8">&#x5F02;&#x5E38;&#x6355;&#x83B7;</h2><p>&#x7406;&#x60F3;&#x72B6;&#x6001;&#x4E0B;&#xFF0C;Promise&#x53EF;&#x4EE5;&#x901A;&#x8FC7;catch&#x6355;&#x83B7;&#x5230;&#x5F02;&#x5E38;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6CA1;&#x6709;&#x4F7F;&#x7528;catch&#xFF0C;&#x90A3;&#x4E48;&#x867D;&#x7136;&#x63A7;&#x5236;&#x53F0;&#x4F1A;&#x6253;&#x5370;&#x9519;&#x8BEF;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x6B21;&#x9519;&#x8BEF;&#x5E76;&#x4E0D;&#x4F1A;&#x7EC8;&#x6B62;&#x811A;&#x672C;&#x6267;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
const a = b.c.d;
console.log(1); // &#x4EE3;&#x7801;&#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x4F1A;&#x8FD0;&#x884C;&#x5230;&#x6B64;&#x5904;
&lt;/script&gt;
&lt;script&gt;
console.log(2); // &#x4EE3;&#x7801;&#x8FD0;&#x884C;
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">const</span> a = b.c.d;
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>); <span class="hljs-comment">// &#x4EE3;&#x7801;&#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x4F1A;&#x8FD0;&#x884C;&#x5230;&#x6B64;&#x5904;</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>); <span class="hljs-comment">// &#x4EE3;&#x7801;&#x8FD0;&#x884C;</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x53EA;&#x4F1A;&#x6253;&#x5370;2</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
const promise = new Promise((resolve, reject) =&gt; {
    const a = b.c.d;
    resolve(&apos;ok&apos;);
})
promise.then(data =&gt; {
    console.log(data)
})
console.log(1); // &#x4EE3;&#x7801;&#x62A5;&#x9519;&#xFF0C;&#x4F46;&#x662F;&#x4F1A;&#x8FD0;&#x884C;&#x5230;&#x6B64;&#x5904;
&lt;/script&gt;
&lt;script&gt;
console.log(2); // &#x4EE3;&#x7801;&#x8FD0;&#x884C;
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> a = b.c.d;
    resolve(<span class="hljs-string">&apos;ok&apos;</span>);
})
promise.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(data)
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>); <span class="hljs-comment">// &#x4EE3;&#x7801;&#x62A5;&#x9519;&#xFF0C;&#x4F46;&#x662F;&#x4F1A;&#x8FD0;&#x884C;&#x5230;&#x6B64;&#x5904;</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>); <span class="hljs-comment">// &#x4EE3;&#x7801;&#x8FD0;&#x884C;</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x6253;&#x5370;1&#x548C;2</p><p>&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#xFF1A;<br>window&#x6709;&#x4E00;&#x4E2A;unhandledRejection&#x4E8B;&#x4EF6;&#xFF0C;&#x4E13;&#x95E8;&#x76D1;&#x542C;&#x672A;&#x6355;&#x83B7;&#x7684;reject&#x9519;&#x8BEF;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onunhandledrejection = function(e) {
    console.log(e.reason);
}
const promise = new Promise((resolve, reject) =&gt; {
    const a = b.c.d;
    resolve(&apos;ok&apos;);
})
promise.then(data =&gt; {
    console.log(data)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.onunhandledrejection = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.log(e.reason);
}
<span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> a = b.c.d;
    resolve(<span class="hljs-string">&apos;ok&apos;</span>);
})
promise.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(data)
})</code></pre><h2 id="articleHeader9">&#x53C2;&#x8003;</h2><ul><li><a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">ECMAScript 6 &#x5165;&#x95E8;</a></li><li><a href="http://liubin.org/promises-book/" rel="nofollow noreferrer" target="_blank">JavaScript Promise&#x8FF7;&#x4F60;&#x4E66;</a></li><li><a href="https://github.com/wangfupeng1988/js-async-tutorial" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;&#x7406;&#x89E3; JavaScript &#x5F02;&#x6B65;</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Promise必知必会

## 原文链接
[https://segmentfault.com/a/1190000015938310](https://segmentfault.com/a/1190000015938310)

