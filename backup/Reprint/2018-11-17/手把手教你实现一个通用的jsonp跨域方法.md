---
title: '手把手教你实现一个通用的jsonp跨域方法' 
date: 2018-11-17 14:34:54
hidden: true
slug: i98xmbmhfbt
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x4EC0;&#x4E48;&#x662F;jsonp</h1><p><strong>JSONP</strong>(JSON with Padding)&#x662F;JSON&#x7684;&#x4E00;&#x79CD;&#x201C;&#x4F7F;&#x7528;&#x6A21;&#x5F0F;&#x201D;&#xFF0C;&#x53EF;&#x7528;&#x4E8E;&#x89E3;&#x51B3;&#x4E3B;&#x6D41;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x8DE8;&#x57DF;&#x6570;&#x636E;&#x8BBF;&#x95EE;&#x7684;&#x95EE;&#x9898;&#x3002;&#x7531;&#x4E8E;&#x540C;&#x6E90;&#x7B56;&#x7565;&#xFF0C;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x4F4D;&#x4E8E; server1.example.com &#x7684;&#x7F51;&#x9875;&#x65E0;&#x6CD5;&#x4E0E;&#x4E0D;&#x662F; server1.example.com&#x7684;&#x670D;&#x52A1;&#x5668;&#x6C9F;&#x901A;&#xFF0C;&#x800C; HTML &#x7684;&lt;script&gt; &#x5143;&#x7D20;&#x662F;&#x4E00;&#x4E2A;&#x4F8B;&#x5916;&#x3002;&#x5229;&#x7528; &lt;script&gt; &#x5143;&#x7D20;&#x7684;&#x8FD9;&#x4E2A;&#x5F00;&#x653E;&#x7B56;&#x7565;&#xFF0C;&#x7F51;&#x9875;&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x4ECE;&#x5176;&#x4ED6;&#x6765;&#x6E90;&#x52A8;&#x6001;&#x4EA7;&#x751F;&#x7684; JSON &#x8D44;&#x6599;&#xFF0C;&#x800C;&#x8FD9;&#x79CD;&#x4F7F;&#x7528;&#x6A21;&#x5F0F;&#x5C31;&#x662F;&#x6240;&#x8C13;&#x7684; JSONP&#x3002;&#x7528; JSONP &#x6293;&#x5230;&#x7684;&#x8D44;&#x6599;&#x5E76;&#x4E0D;&#x662F; JSON&#xFF0C;&#x800C;&#x662F;&#x4EFB;&#x610F;&#x7684;JavaScript&#xFF0C;&#x7528; JavaScript &#x76F4;&#x8BD1;&#x5668;&#x6267;&#x884C;&#x800C;&#x4E0D;&#x662F;&#x7528; JSON &#x89E3;&#x6790;&#x5668;&#x89E3;&#x6790;&#x3002;</p><p>&#x4EE5;&#x4E0A;&#x5185;&#x5BB9;&#x6765;&#x81EA;&#x767E;&#x5EA6;&#xFF0C;&#x4E0D;&#x592A;&#x7406;&#x89E3;&#x4E0D;&#x8981;&#x7D27;&#xFF0C;&#x8BB0;&#x4F4F;&#x6700;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x70B9;&#x662F;&#xFF1A;<strong>&#x901A;&#x8FC7;script&#x6807;&#x7B7E;&#x5F15;&#x5165;&#x7684;&#x94FE;&#x63A5;&#xFF0C;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;&#x5185;&#x5BB9;&#x662F;&#x88AB;&#x5F53;&#x6210;js&#x4EE3;&#x7801;&#x6765;&#x8FDB;&#x884C;&#x89E3;&#x6790;&#x7684;</strong>&#x3002;&#x8BF7;&#x5927;&#x5BB6;&#x8BB0;&#x4F4F;&#x8FD9;&#x4E00;&#x70B9;&#xFF0C;&#x5F88;&#x91CD;&#x8981;&#x7684;&#x7279;&#x6027;&#x3002;</p><h2 id="articleHeader1">&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;jsonp&#x670D;&#x52A1;&#x5668;</h2><p>&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;nodejs&#x7684;&#x7B80;&#x5355;&#x7684;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x4E86;&#x89E3;nodejs&#x4E5F;&#x6CA1;&#x5173;&#x7CFB;&#xFF0C;&#x5927;&#x5BB6;&#x770B;&#x4E0B;&#x6CE8;&#x91CA;&#xFF0C;&#x7406;&#x89E3;&#x4E0B;&#x4F5C;&#x7528;&#x5C31;&#x53EF;&#x4EE5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require(&apos;http&apos;)
const url = require(&apos;url&apos;)

const jsonpServer = http.createServer((req, res) =&gt; {
    let data = {
        status: true,
        msg: &apos;hello jsonp&apos;
    }
    const body = url.parse(req.url, true)
    // jsonp&#x8BF7;&#x6C42;&#x4E2D;&#x4F1A;&#x5305;&#x542B;&#x4E00;&#x4E2A;callback&#x53C2;&#x6570;&#xFF0C;&#x4F8B;&#x5982; http://baidu.com.js?callback=hello
    // &#x83B7;&#x53D6;&#x8BF7;&#x6C42;&#x7684;url&#x4E2D;&#x7684;callback&#x53C2;&#x6570;&#x7684;&#x503C;,callback&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x540D;
    const callback = body.query.callback
    // &#x5C06;&#x5BF9;&#x8C61;&#x6570;&#x636E;&#x8F6C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;
    data = JSON.stringify(data)
    // &#x62FC;&#x63A5;&#x6210;js&#x4EE3;&#x7801;
    // &#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x5047;&#x8BBE;&#x8FD9;&#x4E2A;callback&#x56DE;&#x8C03;&#x7684;&#x540D;&#x5B57;&#x662F; test
    // &#x62FC;&#x63A5;&#x5B8C;&#x5C31;&#x662F; test({status: true,msg: &apos;hello jsonp&apos;})
    // &#x663E;&#x7136;&#xFF0C;&#x5C31;&#x662F;&#x4E00;&#x6BB5;js&#x4EE3;&#x7801;&#xFF0C;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;
    const js = `${callback}(${data})`
    // &#x8FD4;&#x56DE;js&#x4EE3;&#x7801;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;
    res.end(js)
})

jsonpServer.listen(&apos;3000&apos;, (err) =&gt; {
    if (!err) {
        console.log(&apos;server is running at localhost:3000&apos;)
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>)
<span class="hljs-keyword">const</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;url&apos;</span>)

<span class="hljs-keyword">const</span> jsonpServer = http.createServer(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> data = {
        status: <span class="hljs-literal">true</span>,
        msg: <span class="hljs-string">&apos;hello jsonp&apos;</span>
    }
    <span class="hljs-keyword">const</span> body = url.parse(req.url, <span class="hljs-literal">true</span>)
    <span class="hljs-comment">// jsonp&#x8BF7;&#x6C42;&#x4E2D;&#x4F1A;&#x5305;&#x542B;&#x4E00;&#x4E2A;callback&#x53C2;&#x6570;&#xFF0C;&#x4F8B;&#x5982; http://baidu.com.js?callback=hello</span>
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x8BF7;&#x6C42;&#x7684;url&#x4E2D;&#x7684;callback&#x53C2;&#x6570;&#x7684;&#x503C;,callback&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x540D;</span>
    <span class="hljs-keyword">const</span> callback = body.query.callback
    <span class="hljs-comment">// &#x5C06;&#x5BF9;&#x8C61;&#x6570;&#x636E;&#x8F6C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;</span>
    data = <span class="hljs-built_in">JSON</span>.stringify(data)
    <span class="hljs-comment">// &#x62FC;&#x63A5;&#x6210;js&#x4EE3;&#x7801;</span>
    <span class="hljs-comment">// &#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x5047;&#x8BBE;&#x8FD9;&#x4E2A;callback&#x56DE;&#x8C03;&#x7684;&#x540D;&#x5B57;&#x662F; test</span>
    <span class="hljs-comment">// &#x62FC;&#x63A5;&#x5B8C;&#x5C31;&#x662F; test({status: true,msg: &apos;hello jsonp&apos;})</span>
    <span class="hljs-comment">// &#x663E;&#x7136;&#xFF0C;&#x5C31;&#x662F;&#x4E00;&#x6BB5;js&#x4EE3;&#x7801;&#xFF0C;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">const</span> js = <span class="hljs-string">`<span class="hljs-subst">${callback}</span>(<span class="hljs-subst">${data}</span>)`</span>
    <span class="hljs-comment">// &#x8FD4;&#x56DE;js&#x4EE3;&#x7801;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;</span>
    res.end(js)
})

jsonpServer.listen(<span class="hljs-string">&apos;3000&apos;</span>, <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (!err) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server is running at localhost:3000&apos;</span>)
    }
})</code></pre><h2 id="articleHeader2">&#x521B;&#x5EFA;&#x5B8C;&#x670D;&#x52A1;&#x5668;&#x4EE5;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x63A5;&#x4E0B;&#x6765;&#x5F00;&#x59CB;&#x4E66;&#x5199;&#x4E00;&#x4E2A;jsonp</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @description &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x968F;&#x673A;&#x7684;&#x51FD;&#x6570;&#x540D;
 * @return {string}
 */
const createCallbackName = function () {
    return `callback${(Math.random() * 1000000).toFixed(0)}`
}
/**
 * @description &#x63D2;&#x5165;&#x4E00;&#x4E2A;script&#x6807;&#x7B7E;
 * @param url {string}
 */
const insertScript = function (url) {
    let script = document.createElement(&apos;script&apos;)
    script.onload = script.onerror = function () {
        document.body.removeChild(script)
    }
    script.setAttribute(&apos;src&apos;, url)
    document.body.appendChild(script)
}
/**
 * @description &#x62FC;&#x63A5;&#x5B57;&#x7B26;&#x4E32;&#x53C2;&#x6570;
 * @param url {string} url
 * @param data {object} &#x8981;&#x62FC;&#x63A5;&#x7684;query&#x6570;&#x636E;
 * @return url {string} &#x62FC;&#x63A5;&#x5B8C;&#x6210;&#x540E;&#x7684;&#x65B0;url
 */
const setQuery = function (url, data) {
    const keys = Object.keys(data)
    if (keys.length === 0) {
        return url
    } else{
        const pairs = keys.map(key =&gt; `${key}=${data[key]}`)
        url = url.includes(&apos;?&apos;) ? url : `${url}?`
        url += pairs.join(&apos;&amp;&apos;)
        return url
    }
}
/**
 * @description jsonp&#x51FD;&#x6570;
 * @param url {string} &#x8BF7;&#x6C42;&#x5730;&#x5740;
 * @param config {object} &#x63A5;&#x53E3;&#x914D;&#x7F6E;&#x8BBE;&#x7F6E;
 * @return {Promise}
 */
const jsonp = function (url, config = {}) {
    let data = config.data || {}
    let timeout = config.timeout || 5000
    let timer
    const funcName = createCallbackName()
    data.callback = funcName
    return new Promise((resolve, reject) =&gt; {
        window[funcName] = function (res) {
            if (timer) {
                clearTimeout(timer)
            }
            delete window[funcName]
            resolve(res)
        }
        url = setQuery(url, data)
        timer = setTimeout(() =&gt; {
            delete window[funcName]
            reject(new Error(`fetch ${url} fail`))
        }, timeout)
        insertScript(url)
    })
}
// &#x4F7F;&#x7528;&#x6548;&#x679C;
jsonp(&apos;http://localhost:3000&apos;)
    .then(res =&gt; {
        console.log(res)
    })
    .catch(err =&gt; {
        console.log(err)
    })
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @description &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x968F;&#x673A;&#x7684;&#x51FD;&#x6570;&#x540D;
 * @return {string}
 */</span>
<span class="hljs-keyword">const</span> createCallbackName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">`callback<span class="hljs-subst">${(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">1000000</span>).toFixed(<span class="hljs-number">0</span>)}</span>`</span>
}
<span class="hljs-comment">/**
 * @description &#x63D2;&#x5165;&#x4E00;&#x4E2A;script&#x6807;&#x7B7E;
 * @param url {string}
 */</span>
<span class="hljs-keyword">const</span> insertScript = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">let</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;script&apos;</span>)
    script.onload = script.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">document</span>.body.removeChild(script)
    }
    script.setAttribute(<span class="hljs-string">&apos;src&apos;</span>, url)
    <span class="hljs-built_in">document</span>.body.appendChild(script)
}
<span class="hljs-comment">/**
 * @description &#x62FC;&#x63A5;&#x5B57;&#x7B26;&#x4E32;&#x53C2;&#x6570;
 * @param url {string} url
 * @param data {object} &#x8981;&#x62FC;&#x63A5;&#x7684;query&#x6570;&#x636E;
 * @return url {string} &#x62FC;&#x63A5;&#x5B8C;&#x6210;&#x540E;&#x7684;&#x65B0;url
 */</span>
<span class="hljs-keyword">const</span> setQuery = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">url, data</span>) </span>{
    <span class="hljs-keyword">const</span> keys = <span class="hljs-built_in">Object</span>.keys(data)
    <span class="hljs-keyword">if</span> (keys.length === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> url
    } <span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">const</span> pairs = keys.map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> <span class="hljs-string">`<span class="hljs-subst">${key}</span>=<span class="hljs-subst">${data[key]}</span>`</span>)
        url = url.includes(<span class="hljs-string">&apos;?&apos;</span>) ? url : <span class="hljs-string">`<span class="hljs-subst">${url}</span>?`</span>
        url += pairs.join(<span class="hljs-string">&apos;&amp;&apos;</span>)
        <span class="hljs-keyword">return</span> url
    }
}
<span class="hljs-comment">/**
 * @description jsonp&#x51FD;&#x6570;
 * @param url {string} &#x8BF7;&#x6C42;&#x5730;&#x5740;
 * @param config {object} &#x63A5;&#x53E3;&#x914D;&#x7F6E;&#x8BBE;&#x7F6E;
 * @return {Promise}
 */</span>
<span class="hljs-keyword">const</span> jsonp = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">url, config = {}</span>) </span>{
    <span class="hljs-keyword">let</span> data = config.data || {}
    <span class="hljs-keyword">let</span> timeout = config.timeout || <span class="hljs-number">5000</span>
    <span class="hljs-keyword">let</span> timer
    <span class="hljs-keyword">const</span> funcName = createCallbackName()
    data.callback = funcName
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-built_in">window</span>[funcName] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
            <span class="hljs-keyword">if</span> (timer) {
                clearTimeout(timer)
            }
            <span class="hljs-keyword">delete</span> <span class="hljs-built_in">window</span>[funcName]
            resolve(res)
        }
        url = setQuery(url, data)
        timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">delete</span> <span class="hljs-built_in">window</span>[funcName]
            reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`fetch <span class="hljs-subst">${url}</span> fail`</span>))
        }, timeout)
        insertScript(url)
    })
}
<span class="hljs-comment">// &#x4F7F;&#x7528;&#x6548;&#x679C;</span>
jsonp(<span class="hljs-string">&apos;http://localhost:3000&apos;</span>)
    .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(res)
    })
    .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(err)
    })
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbe3rm?w=636&amp;h=391" src="https://static.alili.tech/img/bVbe3rm?w=636&amp;h=391" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader3">&#x9879;&#x76EE;&#x6F14;&#x793A;&#x5730;&#x5740;&#x8BF7;&#x67E5;&#x770B;<a href="https://github.com/NextBoy/easy-jsonp.git" rel="nofollow noreferrer" target="_blank">github: jsonp</a></h2>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你实现一个通用的jsonp跨域方法

## 原文链接
[https://segmentfault.com/a/1190000015942144](https://segmentfault.com/a/1190000015942144)

