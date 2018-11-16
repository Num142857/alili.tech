---
title: 以登录注册理解Cookie的作用过程
hidden: true
categories: [reprint]
slug: 1d7eb5bc
date: 2018-11-06 02:30:12
---

{{< raw >}}
<p>&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x662F;<a href="https://segmentfault.com/a/1190000016372516?_ea=4428881#articleHeader6">&#x524D;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;(Cookie&#x7406;&#x8BBA;&#x77E5;&#x8BC6;)</a>&#x7684;&#x5B9E;&#x8DF5;&#x6027;&#x7406;&#x89E3;</p><p>&#x5B8C;&#x6574;&#x4EE3;&#x7801;:</p><p><a href="https://github.com/mtt3366/CookieStudy" rel="nofollow noreferrer" target="_blank">&#x5B8C;&#x6574;&#x4EE3;&#x7801;</a></p><h2 id="articleHeader0">Cookie&#x5728;&#x6CE8;&#x518C;&#x767B;&#x5F55;&#x65F6;&#x7684;&#x4F5C;&#x7528;&#x8FC7;&#x7A0B;&#xFF1A;</h2><h3 id="articleHeader1">&#x6CE8;&#x518C;</h3><p>&#x6CE8;&#x518C;&#x65F6;&#x628A;&#x8D26;&#x53F7;&#x5BC6;&#x7801;&#x5199;&#x5165;&#x6570;&#x636E;&#x5E93;</p><h3 id="articleHeader2">&#x767B;&#x5F55;</h3><p>&#x7B2C;&#x4E00;&#x6B21;&#x767B;&#x5F55;&#x65F6;&#x670D;&#x52A1;&#x5668;&#x7ED9;&#x6D4F;&#x89C8;&#x5668;&#x53D1;&#x9001;Cookie.</p><p>&#x540E;&#x53F0;&#x7684;&#x767B;&#x5F55;&#x8DEF;&#x7531;&#x4EE3;&#x7801;(nodejs):</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="else if (path === &apos;/sign_in&apos; &amp;&amp; method === &apos;POST&apos;) {
        readBody(request).then((body) =&gt; {
            let strings = body.split(&apos;&amp;&apos;) // [&apos;email=1&apos;, &apos;password=2&apos;, &apos;password_confirmation=3&apos;]
            let hash = {}
            strings.forEach((string) =&gt; {
                // string == &apos;email=1&apos;
                let parts = string.split(&apos;=&apos;) // [&apos;email&apos;, &apos;1&apos;]
                let key = parts[0]
                let value = parts[1]
                hash[key] = decodeURIComponent(value) // hash[&apos;email&apos;] = &apos;1&apos;
            })
            let {
                email,
                password
            } = hash
            var users = fs.readFileSync(&apos;./db/users&apos;, &apos;utf8&apos;)
            try {
                users = JSON.parse(users) // []
            } catch (exception) {
                users = []
            }
            let found
            for (let i = 0; i &lt; users.length; i++) {
                if (users[i].email === email &amp;&amp; users[i].password === password) {
                    found = true
                    break
                }
            }
            if (found) {//&#x5173;&#x952E;&#x5728;&#x8FD9;&#x91CC;,&#x9A8C;&#x8BC1;&#x6210;&#x529F;,&#x8BBE;&#x7F6E;&#x767B;&#x5F55;Cookie&#x4E3A;&#x767B;&#x5F55;&#x7684;&#x90AE;&#x7BB1;,&#x5E76;&#x653E;&#x5728;&#x54CD;&#x5E94;&#x91CC;&#x53D1;&#x7ED9;&#x6D4F;&#x89C8;&#x5668;
                response.setHeader(&apos;Set-Cookie&apos;, `sign_in_email=${email}`)
                response.statusCode = 200
            } else {
                response.statusCode = 401
            }
            response.end()
        })
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (path === <span class="hljs-string">&apos;/sign_in&apos;</span> &amp;&amp; method === <span class="hljs-string">&apos;POST&apos;</span>) {
        readBody(request).then(<span class="hljs-function">(<span class="hljs-params">body</span>) =&gt;</span> {
            <span class="hljs-keyword">let</span> strings = body.split(<span class="hljs-string">&apos;&amp;&apos;</span>) <span class="hljs-comment">// [&apos;email=1&apos;, &apos;password=2&apos;, &apos;password_confirmation=3&apos;]</span>
            <span class="hljs-keyword">let</span> hash = {}
            strings.forEach(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-built_in">string</span></span>) =&gt;</span> {
                <span class="hljs-comment">// string == &apos;email=1&apos;</span>
                <span class="hljs-keyword">let</span> parts = <span class="hljs-built_in">string</span>.split(<span class="hljs-string">&apos;=&apos;</span>) <span class="hljs-comment">// [&apos;email&apos;, &apos;1&apos;]</span>
                <span class="hljs-keyword">let</span> key = parts[<span class="hljs-number">0</span>]
                <span class="hljs-keyword">let</span> value = parts[<span class="hljs-number">1</span>]
                hash[key] = <span class="hljs-built_in">decodeURIComponent</span>(value) <span class="hljs-comment">// hash[&apos;email&apos;] = &apos;1&apos;</span>
            })
            <span class="hljs-keyword">let</span> {
                email,
                password
            } = hash
            <span class="hljs-keyword">var</span> users = fs.readFileSync(<span class="hljs-string">&apos;./db/users&apos;</span>, <span class="hljs-string">&apos;utf8&apos;</span>)
            <span class="hljs-keyword">try</span> {
                users = <span class="hljs-built_in">JSON</span>.parse(users) <span class="hljs-comment">// []</span>
            } <span class="hljs-keyword">catch</span> (exception) {
                users = []
            }
            <span class="hljs-keyword">let</span> found
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; users.length; i++) {
                <span class="hljs-keyword">if</span> (users[i].email === email &amp;&amp; users[i].password === password) {
                    found = <span class="hljs-literal">true</span>
                    <span class="hljs-keyword">break</span>
                }
            }
            <span class="hljs-keyword">if</span> (found) {<span class="hljs-comment">//&#x5173;&#x952E;&#x5728;&#x8FD9;&#x91CC;,&#x9A8C;&#x8BC1;&#x6210;&#x529F;,&#x8BBE;&#x7F6E;&#x767B;&#x5F55;Cookie&#x4E3A;&#x767B;&#x5F55;&#x7684;&#x90AE;&#x7BB1;,&#x5E76;&#x653E;&#x5728;&#x54CD;&#x5E94;&#x91CC;&#x53D1;&#x7ED9;&#x6D4F;&#x89C8;&#x5668;</span>
                response.setHeader(<span class="hljs-string">&apos;Set-Cookie&apos;</span>, <span class="hljs-string">`sign_in_email=<span class="hljs-subst">${email}</span>`</span>)
                response.statusCode = <span class="hljs-number">200</span>
            } <span class="hljs-keyword">else</span> {
                response.statusCode = <span class="hljs-number">401</span>
            }
            response.end()
        })
    }</code></pre><p>&#x5728;&#x767B;&#x5F55;&#x6210;&#x529F;&#x7684;&#x4E00;&#x77AC;&#x95F4;,&#x9700;&#x8981;&#x540E;&#x53F0;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;Cookie,&#x8BB0;&#x5F55;&#x4E00;&#x4E0B;&#x767B;&#x9646;&#x7684;&#x7528;&#x6237;id(&#x8FD9;&#x91CC;&#x7528;&#x90AE;&#x7BB1;&#x8868;&#x793A;,&#x4EE3;&#x7801;&#x5728;&#x4E0A;&#x9762;),&#x7136;&#x540E;&#x53D1;&#x54CD;&#x5E94;&#x7ED9;&#x6D4F;&#x89C8;&#x5668;<br>&#x4F8B;&#x5982;&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x8BBE;&#x7F6E;&#x54CD;&#x5E94;&#x5934;&#xFF1A;<code>set-cookies&#xFF1A;user_email=1@mtt.com</code></p><p>&#x8FD9;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x67E5;&#x770B;&#x54CD;&#x5E94;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhGdq?w=943&amp;h=544" src="https://static.alili.tech/img/bVbhGdq?w=943&amp;h=544" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x53D1;&#x73B0;&#x54CD;&#x5E94;&#x5934;&#x5DF2;&#x7ECF;&#x8BBE;&#x7F6E;cookie.</p><p><span class="img-wrap"><img data-src="/img/bVbhGdr?w=875&amp;h=465" src="https://static.alili.tech/img/bVbhGdr?w=875&amp;h=465" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x7136;&#x540E;&#x8DF3;&#x8F6C;&#x5230;&#x4E3B;&#x9875;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x67E5;&#x770B;&#x8DF3;&#x8F6C;&#x5230;&#x4E3B;&#x9875;&#x7684;&#x8BF7;&#x6C42;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhGds?w=1189&amp;h=1325" src="https://static.alili.tech/img/bVbhGds?w=1189&amp;h=1325" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x53D1;&#x73B0;&#x8DF3;&#x8F6C;&#x5230;&#x4E3B;&#x9875;&#x7684;&#x8BF7;&#x6C42;&#x5934;&#x4E2D;&#x5305;&#x542B;cookie&#x5B57;&#x6BB5;(&#x4EE5;&#x540E;&#x8BBF;&#x95EE;&#x8FD9;&#x4E2A;&#x57DF;&#x540D;&#x90FD;&#x4F1A;&#x5E26;&#x7740;&#x8FD9;&#x4E2A;Cookie)!&#x6240;&#x4EE5;&#xFF0C;&#x5C31;&#x50CF;&#x4E0A;&#x7BC7;&#x6587;&#x7AE0;&#x8BF4;&#x7684;&#xFF1A;</p><p>&#x5982;&#x679C;&#x670D;&#x52A1;&#x5668;&#x7ED9;&#x4E86;&#x6D4F;&#x89C8;&#x5668;&#x4E00;&#x4E2A;setcookie&#x7684;&#x54CD;&#x5E94;&#x5934;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x4EE5;&#x540E;&#x6240;&#x6709;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x53EA;&#x8981;&#x662F;&#x76F8;&#x540C;&#x7684;&#x6E90;(&#x5373;&#x5C31;&#x662F;&#x4E0A;&#x6B21;&#x7ED9;&#x6211;&#x53D1;&#x9001;Cookie&#x7684;&#x90A3;&#x4E2A;&#x57DF;&#x540D;,&#x57DF;&#x540D;&#x548C;&#x7AEF;&#x53E3;&#x76F8;&#x540C;)&#xFF0C;&#x90A3;&#x5C31;&#x4E48;&#x5C31;&#x4F1A;&#x628A;&#x5F53;&#x65F6;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x7ED9;&#x8FD9;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x7684;Cookie&#x5E26;&#x7740;</p><blockquote>&#x4EE5;&#x540E;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4E00;&#x65E6;&#x8BBF;&#x95EE;&#x8FD9;&#x4E2A;&#x8DEF;&#x5F84;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5C31;&#x4F1A;&#x9644;&#x4E0A;&#x8FD9;&#x6BB5; Cookie &#x53D1;&#x9001;&#x7ED9;&#x670D;&#x52A1;&#x5668;</blockquote><p>&#x5373;:&#x7B2C;&#x4E00;&#x6B21;&#x8BF7;&#x6C42;,&#x670D;&#x52A1;&#x5668;&#x4E3A;&#x6D4F;&#x89C8;&#x5668;&#x8BBE;&#x7F6E;Cookie.&#x4E0B;&#x6B21;&#x8BF7;&#x6C42;,&#x6D4F;&#x89C8;&#x5668;&#x5E26;&#x4E0A;Cookie,&#x53D1;&#x9001;&#x7ED9;&#x670D;&#x52A1;&#x5668;.<br>&#x7B2C;&#x4E00;&#x6B21;&#x767B;&#x5F55;&#x7684;&#x65F6;&#x5019;,&#x670D;&#x52A1;&#x5668;&#x7ED9;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x54CD;&#x5E94;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;Cookie,<code>set-cookies&#xFF1A;user_email=1@mtt.com</code>,&#x7136;&#x540E;&#x5F53;&#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#x6B21;&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x7684;&#x65F6;&#x5019;,&#x53D1;&#x73B0;Cookie&#x4E2D;&#x6709;&#x540D;&#x4E3A;User_email&#x7684;Cookie,&#x800C;&#x4E14;&#x6211;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x7684;&#x57DF;&#x540D;&#x8FD8;&#x662F;&#x4E0A;&#x6B21;&#x53D1;&#x7ED9;&#x6211;&#x5E26;Cookie&#x7684;&#x54CD;&#x5E94;&#x7684;&#x90A3;&#x4E2A;&#x57DF;&#x540D;.</p><p>&#x90A3;&#x4E48;&#x5C31;&#x65E0;&#x9700;&#x518D;&#x6B21;&#x767B;&#x5F55;&#x4E86;.&#x76F8;&#x5F53;&#x4E8E;&#x670D;&#x52A1;&#x5668;&#x7ED9;&#x6D4F;&#x89C8;&#x5668;&#x53D1;&#x4E86;&#x8FDB;&#x5165;&#x95E8;&#x7968;,&#x4E0B;&#x6B21;&#x6216;&#x4E0B;&#x4E0B;&#x6B21;&#x6D4F;&#x89C8;&#x5668;&#x5728;&#x8FDB;&#x5165;&#x670D;&#x52A1;&#x5668;&#x7684;&#x65F6;&#x5019;&#x7ED9;&#x670D;&#x52A1;&#x5668;&#x770B;&#x7968;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;</p><h2 id="articleHeader3">&#x540E;&#x53F0;&#x8BFB;&#x53D6;Cookie&#x4FDD;&#x7559;&#x767B;&#x5F55;&#x72B6;&#x6001;&#x4E0E;&#x5220;&#x9664;Cookie&#x9000;&#x51FA;&#x767B;&#x5F55;&#x72B6;&#x6001;</h2><p>&#x9996;&#x9875;&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;body&gt;
    &lt;h1&gt;&#x6211;&#x662F;&#x9996;&#x9875;&lt;/h1&gt;
    &lt;div class=&quot;&quot;&gt;
        &lt;a href=&quot;./sign_up&quot;&gt;&#x6CE8;&#x518C;&lt;/a&gt;
        &lt;a href=&quot;./sign_in&quot;&gt;&#x767B;&#x5F55;&lt;/a&gt;
    &lt;/div&gt;
    
    &lt;h1&gt;&#x4F60;&#x7684;&#x72B6;&#x6001;&#x662F;:__status__&lt;/h1&gt;
    &lt;h1&gt;&#x4F60;&#x7684;&#x90AE;&#x7BB1;&#x8D26;&#x53F7;&#x662F;:__email__&lt;/h1&gt;
    &lt;h1&gt;&#x4F60;&#x7684;&#x5BC6;&#x7801;&#x662F;:__password__&lt;/h1&gt;

    &lt;a href=&quot;javascript:;&quot; id=&quot;logOffBtn&quot;&gt;&#x9000;&#x51FA;&#x767B;&#x5F55;(&#x5220;&#x9664;cookie)&lt;/a&gt;

&lt;/body&gt;
&lt;script&gt;
logOffBtn.addEventListener(&quot;click&quot;, () =&gt; {
        // &#x5220;&#x9664;&#x4E00;&#x4E2A;&#x73B0;&#x5B58; Cookie &#x7684;&#x552F;&#x4E00;&#x65B9;&#x6CD5;&#xFF0C;&#x662F;&#x8BBE;&#x7F6E;&#x5B83;&#x7684;expires&#x5C5E;&#x6027;&#x4E3A;&#x4E00;&#x4E2A;&#x8FC7;&#x53BB;&#x7684;&#x65E5;&#x671F;&#x3002;
        document.cookie = &apos;sign_in_email=;expires=Thu, 01-Jan-1970 00:00:01 GMT&apos;
        window.location = &quot;/&quot;
    })
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x6211;&#x662F;&#x9996;&#x9875;<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;./sign_up&quot;</span>&gt;</span>&#x6CE8;&#x518C;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;./sign_in&quot;</span>&gt;</span>&#x767B;&#x5F55;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x4F60;&#x7684;&#x72B6;&#x6001;&#x662F;:__status__<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x4F60;&#x7684;&#x90AE;&#x7BB1;&#x8D26;&#x53F7;&#x662F;:__email__<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x4F60;&#x7684;&#x5BC6;&#x7801;&#x662F;:__password__<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;logOffBtn&quot;</span>&gt;</span>&#x9000;&#x51FA;&#x767B;&#x5F55;(&#x5220;&#x9664;cookie)<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
logOffBtn.addEventListener(<span class="hljs-string">&quot;click&quot;</span>, () =&gt; {
        <span class="hljs-comment">// &#x5220;&#x9664;&#x4E00;&#x4E2A;&#x73B0;&#x5B58; Cookie &#x7684;&#x552F;&#x4E00;&#x65B9;&#x6CD5;&#xFF0C;&#x662F;&#x8BBE;&#x7F6E;&#x5B83;&#x7684;expires&#x5C5E;&#x6027;&#x4E3A;&#x4E00;&#x4E2A;&#x8FC7;&#x53BB;&#x7684;&#x65E5;&#x671F;&#x3002;</span>
        <span class="hljs-built_in">document</span>.cookie = <span class="hljs-string">&apos;sign_in_email=;expires=Thu, 01-Jan-1970 00:00:01 GMT&apos;</span>
        <span class="hljs-built_in">window</span>.location = <span class="hljs-string">&quot;/&quot;</span>
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre><p>&#x540E;&#x53F0;&#x8DEF;&#x7531;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (path === &apos;/&apos;) {
        response.statusCode = 200
        let string = fs.readFileSync(&apos;./index.html&apos;)
        string = string.toString();
        var users = fs.readFileSync(&apos;./db/users&apos;, &apos;utf8&apos;)
        users = JSON.parse(users)//&#x8F6C;&#x5316;&#x4E3A;user&#x5BF9;&#x8C61;&#x6570;&#x7EC4;

        console.log(users);
        let cookies = request.headers.cookie || &apos;&apos;//[&apos;email=111&apos;, &apos;asdasd=111&apos;]
        cookies = cookies.split(&quot;; &quot;)
        let hash={}
        cookies.forEach((string)=&gt;{
            let parts = string.split(&quot;=&quot;)
            let key = parts[0]
            let value = parts[1]
            hash[key] = value;
        })
        
        let eamil = hash.sign_in_email
        let foundedUser
        users.forEach((userObj)=&gt;{
            if(userObj.email===eamil){
                foundedUser = userObj;
            }
        })
        console.log(foundedUser);
        if(foundedUser){
            string = string.replace(&apos;__status__&apos;, &apos;&#x5DF2;&#x767B;&#x5F55;&apos;)
            string = string.replace(&apos;__email__&apos;, foundedUser.email)
            string = string.replace(&apos;__password__&apos;, foundedUser.password)
        }else{
            string = string.replace(&apos;__status__&apos;, &apos;&#x672A;&#x767B;&#x5F55;,&#x8BF7;&#x53BB;&#x767B;&#x5F55;&apos;)
            string = string.replace(&apos;__email__&apos;, &apos;&#x6CA1;&apos;)
            string = string.replace(&apos;__password__&apos;, &apos;&#x6CA1;&apos;)
        }
        
        response.setHeader(&apos;Content-Type&apos;, &apos;text/html;charset=utf-8&apos;)
        response.write(string)
        response.end()
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">if</span> (path === <span class="hljs-string">&apos;/&apos;</span>) {
        response.statusCode = <span class="hljs-number">200</span>
        <span class="hljs-keyword">let</span> <span class="hljs-built_in">string</span> = fs.readFileSync(<span class="hljs-string">&apos;./index.html&apos;</span>)
        <span class="hljs-built_in">string</span> = <span class="hljs-built_in">string</span>.toString();
        <span class="hljs-keyword">var</span> users = fs.readFileSync(<span class="hljs-string">&apos;./db/users&apos;</span>, <span class="hljs-string">&apos;utf8&apos;</span>)
        users = <span class="hljs-built_in">JSON</span>.parse(users)<span class="hljs-comment">//&#x8F6C;&#x5316;&#x4E3A;user&#x5BF9;&#x8C61;&#x6570;&#x7EC4;</span>

        <span class="hljs-built_in">console</span>.log(users);
        <span class="hljs-keyword">let</span> cookies = request.headers.cookie || <span class="hljs-string">&apos;&apos;</span><span class="hljs-comment">//[&apos;email=111&apos;, &apos;asdasd=111&apos;]</span>
        cookies = cookies.split(<span class="hljs-string">&quot;; &quot;</span>)
        <span class="hljs-keyword">let</span> hash={}
        cookies.forEach(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-built_in">string</span></span>)=&gt;</span>{
            <span class="hljs-keyword">let</span> parts = <span class="hljs-built_in">string</span>.split(<span class="hljs-string">&quot;=&quot;</span>)
            <span class="hljs-keyword">let</span> key = parts[<span class="hljs-number">0</span>]
            <span class="hljs-keyword">let</span> value = parts[<span class="hljs-number">1</span>]
            hash[key] = value;
        })
        
        <span class="hljs-keyword">let</span> eamil = hash.sign_in_email
        <span class="hljs-keyword">let</span> foundedUser
        users.forEach(<span class="hljs-function">(<span class="hljs-params">userObj</span>)=&gt;</span>{
            <span class="hljs-keyword">if</span>(userObj.email===eamil){
                foundedUser = userObj;
            }
        })
        <span class="hljs-built_in">console</span>.log(foundedUser);
        <span class="hljs-keyword">if</span>(foundedUser){
            <span class="hljs-built_in">string</span> = <span class="hljs-built_in">string</span>.replace(<span class="hljs-string">&apos;__status__&apos;</span>, <span class="hljs-string">&apos;&#x5DF2;&#x767B;&#x5F55;&apos;</span>)
            <span class="hljs-built_in">string</span> = <span class="hljs-built_in">string</span>.replace(<span class="hljs-string">&apos;__email__&apos;</span>, foundedUser.email)
            <span class="hljs-built_in">string</span> = <span class="hljs-built_in">string</span>.replace(<span class="hljs-string">&apos;__password__&apos;</span>, foundedUser.password)
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-built_in">string</span> = <span class="hljs-built_in">string</span>.replace(<span class="hljs-string">&apos;__status__&apos;</span>, <span class="hljs-string">&apos;&#x672A;&#x767B;&#x5F55;,&#x8BF7;&#x53BB;&#x767B;&#x5F55;&apos;</span>)
            <span class="hljs-built_in">string</span> = <span class="hljs-built_in">string</span>.replace(<span class="hljs-string">&apos;__email__&apos;</span>, <span class="hljs-string">&apos;&#x6CA1;&apos;</span>)
            <span class="hljs-built_in">string</span> = <span class="hljs-built_in">string</span>.replace(<span class="hljs-string">&apos;__password__&apos;</span>, <span class="hljs-string">&apos;&#x6CA1;&apos;</span>)
        }
        
        response.setHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>, <span class="hljs-string">&apos;text/html;charset=utf-8&apos;</span>)
        response.write(<span class="hljs-built_in">string</span>)
        response.end()
    }</code></pre><p>&#x5728;&#x6CA1;&#x6709;Cookie&#x7684;&#x65F6;&#x5019;,&#x9996;&#x9875;&#x7684;&#x72B6;&#x6001;</p><p><span class="img-wrap"><img data-src="/img/bVbhJaG?w=841&amp;h=428" src="https://static.alili.tech/img/bVbhJaG?w=841&amp;h=428" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x767B;&#x5F55;&#x4E4B;&#x540E;,&#x540E;&#x53F0;&#x6839;&#x636E;Cookie&#x67E5;&#x8BE2;&#x6570;&#x636E;&#x5E93;,&#x5C06;&#x7528;&#x6237;&#x540D;&#x4E0E;&#x5BC6;&#x7801;&#x4F20;&#x5230;&#x524D;&#x53F0;&#x7684;&#x9996;&#x9875;&#x4E0A;</p><p><span class="img-wrap"><img data-src="/img/bVbhJa1?w=1077&amp;h=1070" src="https://static.alili.tech/img/bVbhJa1?w=1077&amp;h=1070" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x9000;&#x51FA;&#x767B;&#x5F55;&#x5C06;&#x5220;&#x9664;Cookie&#x5E76;&#x5237;&#x65B0;&#x9875;&#x9762;,&#x91CD;&#x65B0;&#x56DE;&#x5230;&#x672A;&#x767B;&#x5F55;&#x7684;&#x72B6;&#x6001;</p><h2 id="articleHeader4">Cookie&#x5728;&#x767B;&#x5F55;&#x7684;&#x65F6;&#x5019;&#x7684;&#x7279;&#x70B9;</h2><p>&#x6211;&#x4EEC;&#x5F97;&#x5230;Cookie&#x7684;&#x7279;&#x70B9;:</p><ol><li>&#x7B2C;&#x4E00;&#x6B21;&#x767B;&#x5F55;&#x7684;&#x65F6;&#x5019;,&#x670D;&#x52A1;&#x5668;&#x901A;&#x8FC7; Set-Cookie &#x54CD;&#x5E94;&#x5934;&#x8BBE;&#x7F6E; Cookie,&#x7136;&#x540E;&#x4EE5;&#x54CD;&#x5E94;&#x7684;&#x5F62;&#x5F0F;&#x53D1;&#x7ED9;&#x6D4F;&#x89C8;&#x5668;</li><li>&#x6D4F;&#x89C8;&#x5668;&#x5F97;&#x5230; &#x54CD;&#x5E94;&#x4E2D;Cookie &#x4E4B;&#x540E;&#xFF0C;&#x4E4B;&#x540E;&#x6BCF;&#x6B21;&#x8BF7;&#x6C42;&#x8FD9;&#x4E2A;&#x57DF;&#x540D;&#x90FD;&#x8981;&#x5E26;&#x4E0A;&#x8FD9;&#x4E2A; Cookie</li><li>&#x4E4B;&#x540E;&#x670D;&#x52A1;&#x5668;&#x8BFB;&#x53D6;&#x5F53;&#x65F6;&#x81EA;&#x5DF1;&#x8BBE;&#x7F6E;&#x7684; Cookie &#x5C31;&#x77E5;&#x9053;&#x767B;&#x5F55;&#x7528;&#x6237;&#x7684;&#x4FE1;&#x606F;&#xFF08;email&#xFF09;</li></ol><h2 id="articleHeader5">&#x51E0;&#x4E2A;&#x5173;&#x4E8E;Cookie&#x7684;&#x95EE;&#x9898;</h2><p>1.&#x6211;&#x5728; Chrome &#x767B;&#x5F55;&#x4E86;&#x5F97;&#x5230; Cookie&#xFF0C;&#x7528; Safari &#x8BBF;&#x95EE;&#xFF0C;Safari &#x4F1A;&#x5E26;&#x4E0A; Cookie &#x5417;<br>no</p><p>2.Cookie &#x5B58;&#x5728;&#x54EA;<br>Windows &#x5B58;&#x5728; C &#x76D8;&#x7684;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;</p><p>3.Cookie&#x4F1A;&#x88AB;&#x7528;&#x6237;&#x7BE1;&#x6539;&#x5417;&#xFF1F;<br>&#x53EF;&#x4EE5;&#xFF0C;&#x4F8B;&#x5982;&#x5728;&#x8C37;&#x6B4C;&#x6D4F;&#x89C8;&#x5668;&#x5F00;&#x53D1;&#x8005;&#x6A21;&#x5F0F;&#x4E0B;&#x7684;application-&gt;Cookie&#x4E2D;&#x53EF;&#x4EE5;&#x624B;&#x52A8;&#x4FEE;&#x6539;,&#x4FEE;&#x6539;&#x4E4B;&#x540E;,&#x4E0B;&#x6B21;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x65F6;,&#x9644;&#x5E26;&#x7684;&#x5C31;&#x662F;&#x4FEE;&#x6539;&#x540E;&#x7684;Cookie</p><p><span class="img-wrap"><img data-src="https://image-static.segmentfault.com/269/812/2698121046-5b9bc1e20a4ba_articlex" src="https://static.alili.techhttps://image-static.segmentfault.com/269/812/2698121046-5b9bc1e20a4ba_articlex" alt="&#x4FEE;&#x6539;Cookie" title="&#x4FEE;&#x6539;Cookie" style="cursor:pointer;display:inline"></span></p><p>JS&#x4E2D;&#x4E5F;&#x6709;&#x53EF;&#x4EE5;&#x64CD;&#x4F5C;cookie&#x7684;api<br>( &#x5047;&#x5982;&#x6362;&#x6210;&#x522B;&#x7684;&#x7528;&#x6237;&#x7684;&#x8D26;&#x53F7;,&#x90A3;&#x4E48;&#x8FD8;&#x53EF;&#x4EE5;&#x767B;&#x5F55;&#x6210;&#x529F;&#x7684;&#x8BDD;,&#x5C31;&#x4F1A;&#x5B58;&#x5728;&#x98CE;&#x9669;&#x95EE;&#x9898;.Session &#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x9632;&#x6B62;&#x7528;&#x6237;&#x7BE1;&#x6539;)<br>&#x540E;&#x7AEF;&#x53EF;&#x4EE5;&#x5F3A;&#x5236;&#x8BBE;&#x7F6E;&#x4E0D;&#x5141;&#x8BB8;&#x4FEE;&#x6539;Cookie&#xFF0C;&#x53EA;&#x8981;&#x5C06;Cookie&#x7684;&#x5C5E;&#x6027;&#x8BBE;&#x7F6E;&#x4E3A;<code>Httponly</code>&#x5373;&#x53EF;(&#x8FD8;&#x53EF;&#x4EE5;&#x624B;&#x52A8;&#x6539;,&#x4F46;&#x662F;JS&#x6539;&#x4E0D;&#x4E86;,&#x4E5F;&#x65E0;&#x6CD5;&#x83B7;&#x53D6;),&#x5177;&#x4F53;&#x8BED;&#x6CD5;&#x770B; MDN<br>4.Cookie &#x6709;&#x6548;&#x671F;&#x5417;&#xFF1F;<br>&#x9ED8;&#x8BA4;&#x6709;&#x6548;&#x671F;20&#x5206;&#x949F;&#x5DE6;&#x53F3;&#xFF0C;&#x4E0D;&#x540C;&#x6D4F;&#x89C8;&#x5668;&#x7B56;&#x7565;&#x4E0D;&#x540C;(&#x5982;&#x679C;&#x6D4F;&#x89C8;&#x5668;&#x4E00;&#x76F4;&#x5F00;&#x7740;,&#x90A3;&#x4E48;Cookie&#x4E0D;&#x4F1A;&#x88AB;&#x5220;&#x9664;.&#x5982;&#x679C;&#x5173;&#x95ED;&#x6D4F;&#x89C8;&#x5668;,&#x90A3;&#x4E48;&#x6D4F;&#x89C8;&#x5668;&#x4E3A;&#x4E86;&#x5B89;&#x5168;&#x8003;&#x8651;,20&#x5206;&#x949F;&#x5DE6;&#x53F3;&#x540E;&#x53EF;&#x80FD;&#x4F1A;&#x5220;&#x9664;Cookie.&#x8FD9;&#x4E5F;&#x53D6;&#x51B3;&#x4E8E;&#x670D;&#x52A1;&#x5668;&#x5982;&#x4F55;&#x8BBE;&#x7F6E;Cookie&#x7684;&#x6709;&#x6548;&#x671F;)<br>&#x540E;&#x7AEF;&#x53EF;&#x4EE5;&#x5F3A;&#x5236;&#x8BBE;&#x7F6E;&#x6709;&#x6548;&#x671F;&#xFF0C;&#x5177;&#x4F53;&#x8BED;&#x6CD5;&#x770B; MDN<br>Cookie &#x9075;&#x5B88;&#x540C;&#x6E90;&#x7B56;&#x7565;&#x5417;&#xFF1F;<br>&#x4E5F;&#x6709;&#xFF0C;&#x4E0D;&#x8FC7;&#x8DDF; AJAX &#x7684;&#x540C;&#x6E90;&#x7B56;&#x7565;&#x7A0D;&#x5FAE;&#x6709;&#x4E9B;&#x4E0D;&#x540C;&#x3002;<br>&#x5F53;&#x8BF7;&#x6C42; qq.com &#x4E0B;&#x7684;&#x8D44;&#x6E90;&#x65F6;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x9ED8;&#x8BA4;&#x5E26;&#x4E0A; qq.com &#x5BF9;&#x5E94;&#x7684; Cookie&#xFF0C;&#x4E0D;&#x4F1A;&#x5E26;&#x4E0A; baidu.com &#x5BF9;&#x5E94;&#x7684; Cookie<br>&#x5F53;&#x8BF7;&#x6C42; v.qq.com &#x4E0B;&#x7684;&#x8D44;&#x6E90;&#x65F6;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x4EC5;&#x4F1A;&#x5E26;&#x4E0A; v.qq.com &#x7684;Cookie&#xFF0C;&#x8FD8;&#x4F1A;&#x5E26;&#x4E0A; qq.com &#x7684; Cookie<br>&#x53E6;&#x5916; Cookie &#x8FD8;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x8DEF;&#x5F84;&#x505A;&#x9650;&#x5236;&#xFF0C;&#x8BF7;&#x81EA;&#x884C;&#x4E86;&#x89E3;&#xFF0C;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x7528;&#x5F97;&#x6BD4;&#x8F83;&#x5C11;&#x3002;</p><h2 id="articleHeader6">&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x7EC6;&#x8282;&#x95EE;&#x9898;</h2><h3 id="articleHeader7">&#x4E3A;&#x4EC0;&#x4E48;&#x524D;&#x540E;&#x7AEF;&#x90FD;&#x8981;&#x8FDB;&#x884C;&#x8868;&#x5355;&#x9A8C;&#x8BC1;?</h3><p>&#x524D;&#x540E;&#x7AEF;&#x90FD;&#x8981;&#x9A8C;&#x8BC1;&#x90AE;&#x7BB1;&#x683C;&#x5F0F;&#x662F;&#x5426;&#x6B63;&#x786E;&#xFF0C;&#x8D26;&#x53F7;&#x5BC6;&#x7801;&#x683C;&#x5F0F;&#x662F;&#x5426;&#x6B63;&#x786E;&#xFF0C;&#x4E24;&#x6B21;&#x63D0;&#x4EA4;&#x7684;&#x5BC6;&#x7801;&#x662F;&#x5426;&#x76F8;&#x540C;&#x7B49;&#x3002;<br>&#x56E0;&#x4E3A;&#x9ED1;&#x5BA2;&#x53EF;&#x4EE5;&#x7ED5;&#x8FC7;&#x524D;&#x7AEF;&#x7684;js&#x9A8C;&#x8BC1;&#x6D41;&#x7A0B;&#xFF0C;&#x4F8B;&#x5982;&#x9ED1;&#x5BA2;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;curl &#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x7684;&#x53D1;&#x9001;&#xFF0C;&#x76F4;&#x63A5;&#x4E0E;&#x540E;&#x53F0;&#x670D;&#x52A1;&#x5668;&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#x3002;<br>&#x5982;&#x56FE;:</p><p><span class="img-wrap"><img data-src="https://image-static.segmentfault.com/410/641/4106417372-5baf73ddaef3e_articlex" src="https://static.alili.techhttps://image-static.segmentfault.com/410/641/4106417372-5baf73ddaef3e_articlex" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x6240;&#x4EE5;&#x540E;&#x53F0;&#x4E5F;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#x3002;</p><h3 id="articleHeader8">Cookie&#x5982;&#x4F55;&#x624B;&#x52A8;&#x5173;&#x95ED;</h3><p><span class="img-wrap"><img data-src="https://image-static.segmentfault.com/236/619/2366198568-5baf39b6c0fa5_articlex" src="https://static.alili.techhttps://image-static.segmentfault.com/236/619/2366198568-5baf39b6c0fa5_articlex" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader9">&#x7FFB;&#x8BD1;</h3><p>cookie&#xFF1A;&#x66F2;&#x5947;&#x997C;<br>cache-control&#xFF1A;&#x7F13;&#x5B58;&#x63A7;&#x5236;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
以登录注册理解Cookie的作用过程

## 原文链接
[https://segmentfault.com/a/1190000016579340](https://segmentfault.com/a/1190000016579340)

