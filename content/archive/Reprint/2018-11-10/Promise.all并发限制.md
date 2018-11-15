---
title: Promise.all并发限制
hidden: true
categories: reprint
slug: 51a9b
date: 2018-11-10 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">&#x80CC;&#x666F;</h2><p>&#x901A;&#x5E38;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x9700;&#x8981;&#x4FDD;&#x8BC1;&#x4EE3;&#x7801;&#x5728;&#x591A;&#x4E2A;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x4E4B;&#x540E;&#x6267;&#x884C;&#xFF0C;&#x4F1A;&#x7528;&#x5230;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all(promises: []).then(fun: function);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crystal"><code style="word-break:break-word;white-space:initial">Promise.all(<span class="hljs-symbol">promises:</span> []).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">fun</span>: <span class="hljs-title">function</span></span>);</code></pre><p><code>Promise.all</code>&#x53EF;&#x4EE5;&#x4FDD;&#x8BC1;&#xFF0C;<code>promises</code>&#x6570;&#x7EC4;&#x4E2D;&#x6240;&#x6709;promise&#x5BF9;&#x8C61;&#x90FD;&#x8FBE;&#x5230;resolve&#x72B6;&#x6001;&#xFF0C;&#x624D;&#x6267;&#x884C;<code>then</code>&#x56DE;&#x8C03;&#x3002;</p><p>&#x8FD9;&#x65F6;&#x5019;&#x8003;&#x8651;&#x4E00;&#x4E2A;&#x573A;&#x666F;&#xFF1A;&#x5982;&#x679C;&#x4F60;&#x7684;<code>promises</code>&#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E2A;&#x5BF9;&#x8C61;&#x90FD;&#x662F;http&#x8BF7;&#x6C42;&#xFF0C;&#x6216;&#x8005;&#x8BF4;&#x6BCF;&#x4E2A;&#x5BF9;&#x8C61;&#x5305;&#x542B;&#x4E86;&#x590D;&#x6742;&#x7684;&#x8C03;&#x7528;&#x5904;&#x7406;&#x3002;&#x800C;&#x8FD9;&#x6837;&#x7684;&#x5BF9;&#x8C61;&#x6709;&#x51E0;&#x5341;&#x4E07;&#x4E2A;&#x3002;</p><p>&#x90A3;&#x4E48;&#x4F1A;&#x51FA;&#x73B0;&#x7684;&#x60C5;&#x51B5;&#x662F;&#xFF0C;&#x4F60;&#x5728;&#x77AC;&#x95F4;&#x53D1;&#x51FA;&#x51E0;&#x5341;&#x4E07;http&#x8BF7;&#x6C42;&#xFF08;tcp&#x8FDE;&#x63A5;&#x6570;&#x4E0D;&#x8DB3;&#x53EF;&#x80FD;&#x9020;&#x6210;&#x7B49;&#x5F85;&#xFF09;&#xFF0C;&#x6216;&#x8005;&#x5806;&#x79EF;&#x4E86;&#x65E0;&#x6570;&#x8C03;&#x7528;&#x6808;&#x5BFC;&#x81F4;&#x5185;&#x5B58;&#x6EA2;&#x51FA;&#x3002;</p><p>&#x8FD9;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x9700;&#x8981;&#x8003;&#x8651;&#x5BF9;<code>Promise.all</code>&#x505A;&#x5E76;&#x53D1;&#x9650;&#x5236;&#x3002;</p><p><code>Promise.all</code>&#x5E76;&#x53D1;&#x9650;&#x5236;&#x6307;&#x7684;&#x662F;&#xFF0C;&#x6BCF;&#x4E2A;&#x65F6;&#x523B;&#x5E76;&#x53D1;&#x6267;&#x884C;&#x7684;promise&#x6570;&#x91CF;&#x662F;&#x56FA;&#x5B9A;&#x7684;&#xFF0C;&#x6700;&#x7EC8;&#x7684;&#x6267;&#x884C;&#x7ED3;&#x679C;&#x8FD8;&#x662F;&#x4FDD;&#x6301;&#x4E0E;&#x539F;&#x6765;&#x7684;<code>Promise.all</code>&#x4E00;&#x81F4;&#x3002;</p><h2 id="articleHeader1">&#x5B9E;&#x73B0;</h2><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#xFF0C;promise&#x5E76;&#x4E0D;&#x662F;&#x56E0;&#x4E3A;&#x8C03;&#x7528;<code>Promise.all</code>&#x624D;&#x6267;&#x884C;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x5B9E;&#x4F8B;&#x5316;promise&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x6267;&#x884C;&#x4E86;&#xFF0C;&#x5728;&#x7406;&#x89E3;&#x8FD9;&#x4E00;&#x70B9;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x8981;&#x5B9E;&#x73B0;&#x5E76;&#x53D1;&#x9650;&#x5236;&#xFF0C;&#x53EA;&#x80FD;&#x4ECE;promise&#x5B9E;&#x4F8B;&#x5316;&#x4E0A;&#x4E0B;&#x624B;&#x3002;</p><p>&#x6362;&#x53E5;&#x8BDD;&#x8BF4;&#xFF0C;&#x5C31;&#x662F;&#x628A;&#x751F;&#x6210;<code>promises</code>&#x6570;&#x7EC4;&#x7684;&#x63A7;&#x5236;&#x6743;&#xFF0C;&#x4EA4;&#x7ED9;&#x5E76;&#x53D1;&#x63A7;&#x5236;&#x903B;&#x8F91;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6211;&#x5E76;&#x4E0D;&#x6253;&#x7B97;&#x4E00;&#x6B65;&#x6B65;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#xFF0C;npm&#x4E2D;&#x6709;&#x5F88;&#x591A;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5305;&#xFF0C;&#x6BD4;&#x5982;<a href="https://www.npmjs.com/package/tiny-async-pool" rel="nofollow noreferrer" target="_blank">async-pool</a>&#x3001;<a href="https://www.npmjs.com/package/es6-promise-pool" rel="nofollow noreferrer" target="_blank">es6-promise-pool</a>&#x3001;<a href="https://www.npmjs.com/package/p-limit" rel="nofollow noreferrer" target="_blank">p-limit</a>&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x76F4;&#x63A5;&#x62FF;async-pool&#x7684;&#x4EE3;&#x7801;&#x6765;&#x5206;&#x6790;&#x4E00;&#x4E0B;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x3002;</p><p>&#x4EE3;&#x7801;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x53BB;&#x6389;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x52A0;&#x4E0A;&#x81EA;&#x5DF1;&#x7684;&#x6CE8;&#x91CA;&#xFF0C;&#x5927;&#x6982;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function asyncPool(poolLimit, array, iteratorFn) {
    let i = 0;
    const ret = [];
    const executing = [];
    const enqueue = function () {
        // &#x8FB9;&#x754C;&#x5904;&#x7406;&#xFF0C;array&#x4E3A;&#x7A7A;&#x6570;&#x7EC4;
        if (i === array.length) {
            return Promise.resolve();
        }
        // &#x6BCF;&#x8C03;&#x4E00;&#x6B21;enqueue&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A;promise
        const item = array[i++];
        const p = Promise.resolve().then(() =&gt; iteratorFn(item, array));
        // &#x653E;&#x5165;promises&#x6570;&#x7EC4;
        ret.push(p);
        // promise&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#xFF0C;&#x4ECE;executing&#x6570;&#x7EC4;&#x4E2D;&#x5220;&#x9664;
        const e = p.then(() =&gt; executing.splice(executing.indexOf(e), 1));
        // &#x63D2;&#x5165;executing&#x6570;&#x5B57;&#xFF0C;&#x8868;&#x793A;&#x6B63;&#x5728;&#x6267;&#x884C;&#x7684;promise
        executing.push(e);
        // &#x4F7F;&#x7528;Promise.rece&#xFF0C;&#x6BCF;&#x5F53;executing&#x6570;&#x7EC4;&#x4E2D;promise&#x6570;&#x91CF;&#x4F4E;&#x4E8E;poolLimit&#xFF0C;&#x5C31;&#x5B9E;&#x4F8B;&#x5316;&#x65B0;&#x7684;promise&#x5E76;&#x6267;&#x884C;
        let r = Promise.resolve();
        if (executing.length &gt;= poolLimit) {
            r = Promise.race(executing);
        }
        // &#x9012;&#x5F52;&#xFF0C;&#x76F4;&#x5230;&#x904D;&#x5386;&#x5B8C;array
        return r.then(() =&gt; enqueue());
    };
    return enqueue().then(() =&gt; Promise.all(ret));
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncPool</span>(<span class="hljs-params">poolLimit, array, iteratorFn</span>) </span>{
    <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> ret = [];
    <span class="hljs-keyword">const</span> executing = [];
    <span class="hljs-keyword">const</span> enqueue = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// &#x8FB9;&#x754C;&#x5904;&#x7406;&#xFF0C;array&#x4E3A;&#x7A7A;&#x6570;&#x7EC4;</span>
        <span class="hljs-keyword">if</span> (i === array.length) {
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve();
        }
        <span class="hljs-comment">// &#x6BCF;&#x8C03;&#x4E00;&#x6B21;enqueue&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A;promise</span>
        <span class="hljs-keyword">const</span> item = array[i++];
        <span class="hljs-keyword">const</span> p = <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> iteratorFn(item, array));
        <span class="hljs-comment">// &#x653E;&#x5165;promises&#x6570;&#x7EC4;</span>
        ret.push(p);
        <span class="hljs-comment">// promise&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#xFF0C;&#x4ECE;executing&#x6570;&#x7EC4;&#x4E2D;&#x5220;&#x9664;</span>
        <span class="hljs-keyword">const</span> e = p.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> executing.splice(executing.indexOf(e), <span class="hljs-number">1</span>));
        <span class="hljs-comment">// &#x63D2;&#x5165;executing&#x6570;&#x5B57;&#xFF0C;&#x8868;&#x793A;&#x6B63;&#x5728;&#x6267;&#x884C;&#x7684;promise</span>
        executing.push(e);
        <span class="hljs-comment">// &#x4F7F;&#x7528;Promise.rece&#xFF0C;&#x6BCF;&#x5F53;executing&#x6570;&#x7EC4;&#x4E2D;promise&#x6570;&#x91CF;&#x4F4E;&#x4E8E;poolLimit&#xFF0C;&#x5C31;&#x5B9E;&#x4F8B;&#x5316;&#x65B0;&#x7684;promise&#x5E76;&#x6267;&#x884C;</span>
        <span class="hljs-keyword">let</span> r = <span class="hljs-built_in">Promise</span>.resolve();
        <span class="hljs-keyword">if</span> (executing.length &gt;= poolLimit) {
            r = <span class="hljs-built_in">Promise</span>.race(executing);
        }
        <span class="hljs-comment">// &#x9012;&#x5F52;&#xFF0C;&#x76F4;&#x5230;&#x904D;&#x5386;&#x5B8C;array</span>
        <span class="hljs-keyword">return</span> r.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> enqueue());
    };
    <span class="hljs-keyword">return</span> enqueue().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.all(ret));
}</code></pre><p>&#x56E0;&#x4E3A;&#x662F;promise&#x52A0;&#x4E0A;&#x9012;&#x5F52;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x4EE3;&#x7801;&#x6CE8;&#x91CA;&#x4E0A;&#x4E0D;&#x592A;&#x597D;&#x6807;&#x6CE8;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF0C;&#x4F46;&#x662F;&#x5927;&#x6982;&#x7684;&#x903B;&#x8F91;&#x53EF;&#x4EE5;&#x603B;&#x7ED3;&#x4E3A;&#xFF1A;</p><ol><li>&#x4ECE;<code>array</code>&#x7B2C;1&#x4E2A;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#xFF0C;&#x521D;&#x59CB;&#x5316;<code>promise</code>&#x5BF9;&#x8C61;&#xFF0C;&#x540C;&#x65F6;&#x7528;&#x4E00;&#x4E2A;<code>executing</code>&#x6570;&#x7EC4;&#x4FDD;&#x5B58;&#x6B63;&#x5728;&#x6267;&#x884C;&#x7684;promise</li><li>&#x4E0D;&#x65AD;&#x521D;&#x59CB;&#x5316;promise&#xFF0C;&#x76F4;&#x5230;&#x8FBE;&#x5230;<code>poolLimt</code></li><li>&#x4F7F;&#x7528;<code>Promise.race</code>&#xFF0C;&#x83B7;&#x5F97;<code>executing</code>&#x4E2D;promise&#x7684;&#x6267;&#x884C;&#x60C5;&#x51B5;&#xFF0C;&#x5F53;&#x6709;&#x4E00;&#x4E2A;promise&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#xFF0C;&#x7EE7;&#x7EED;&#x521D;&#x59CB;&#x5316;promise&#x5E76;&#x653E;&#x5165;<code>executing</code>&#x4E2D;</li><li>&#x6240;&#x6709;promise&#x90FD;&#x6267;&#x884C;&#x5B8C;&#x4E86;&#xFF0C;&#x8C03;&#x7528;<code>Promise.all</code>&#x8FD4;&#x56DE;</li></ol><p>&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x5C31;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const timeout = i =&gt; new Promise(resolve =&gt; setTimeout(() =&gt; resolve(i), i));
return asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(results =&gt; {
    ...
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> timeout = <span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(i), i));
<span class="hljs-keyword">return</span> asyncPool(<span class="hljs-number">2</span>, [<span class="hljs-number">1000</span>, <span class="hljs-number">5000</span>, <span class="hljs-number">3000</span>, <span class="hljs-number">2000</span>], timeout).then(<span class="hljs-function"><span class="hljs-params">results</span> =&gt;</span> {
    ...
});</code></pre><h2 id="articleHeader2">&#x603B;&#x7ED3;</h2><p>&#x6240;&#x8C13;promise&#x5E76;&#x53D1;&#x9650;&#x5236;&#xFF0C;&#x5176;&#x5B9E;&#x6839;&#x6E90;&#x4E0A;&#x5C31;&#x662F;&#x63A7;&#x5236;promise&#x7684;&#x5B9E;&#x4F8B;&#x5316;&#x3002;&#x5982;&#x679C;&#x662F;&#x901A;&#x8FC7;&#x7B2C;&#x4E09;&#x65B9;&#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x628A;&#x521B;&#x5EFA;promise&#x7684;&#x63A7;&#x5236;&#x6743;&#x4EA4;&#x7ED9;&#x7B2C;&#x4E09;&#x65B9;&#x5373;&#x53EF;&#x3002;</p><p>&#x7136;&#x800C;&#x8FD9;&#x6837;&#x7684;&#x5B9E;&#x73B0;&#x6548;&#x679C;&#xFF0C;&#x672C;&#x8D28;&#x4E0A;&#x6765;&#x8BF4;&#x5DF2;&#x7ECF;&#x629B;&#x5F03;&#x4E86;<code>Promise.all</code>&#x800C;&#x53E6;&#x8F9F;&#x8E4A;&#x5F84;&#x3002;&#x6240;&#x4EE5;&#x671F;&#x5F85;&#x6709;&#x4E00;&#x5929;promise&#x6807;&#x51C6;&#x80FD;&#x63D0;&#x4F9B;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Promise.all并发限制

## 原文链接
[https://segmentfault.com/a/1190000016389127](https://segmentfault.com/a/1190000016389127)

