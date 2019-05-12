---
title: '「跨域」利用node.js实践前端各种跨域方式（下）' 
date: 2018-11-28 2:30:11
hidden: true
slug: iwvddhpxfrf
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>&#x5E38;&#x8A00;&#x9053;&#xFF0C;&quot;&#x8BFB;&#x4E07;&#x5377;&#x4E66;&#xFF0C;&#x4E0D;&#x5982;&#x884C;&#x4E07;&#x91CC;&#x8DEF;&quot;&#x3002;&#x6280;&#x672F;&#x7684;&#x5B66;&#x4E60;&#x4E5F;&#x662F;&#x5982;&#x6B64;,&#x552F;&#x6709;&#x5B9E;&#x8DF5;&#x624D;&#x80FD;&#x66F4;&#x6E05;&#x695A;&#x7684;&#x660E;&#x767D;&#x539F;&#x7406;&#x548C;&#x52A0;&#x6DF1;&#x5370;&#x8C61;&#xFF0C;&#x56E0;&#x6B64;&#x672C;&#x6587;&#x4F1A;&#x5229;&#x7528;node.js&#x5BF9;&#x524D;&#x7AEF;&#x7684;&#x5404;&#x79CD;&#x8DE8;&#x57DF;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x5B9E;&#x8DF5;&#xFF0C;&#x5F3A;&#x70C8;&#x5EFA;&#x8BAE;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x8DDF;&#x7740;&#x505A;&#xFF0C;&#x76F8;&#x4FE1;&#x4F60;&#x80AF;&#x5B9A;&#x4F1A;&#x5BF9;&#x8DE8;&#x57DF;&#x6709;&#x66F4;&#x6DF1;&#x5C42;&#x6B21;&#x7684;&#x7406;&#x89E3;&#x3002;&#x800C;&#x7531;&#x4E8E;&#x7BC7;&#x5E45;&#x9650;&#x5236;&#xFF0C;&#x672C;&#x6587;&#x53EA;&#x4F1A;&#x8D34;&#x51FA;&#x5173;&#x952E;&#x6027;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x672C;&#x7CFB;&#x5217;&#x603B;&#x5171;&#x5206;&#x4E3A;&#x4E0A;&#x4E0B;&#x7BC7;&#x3002;&#x5177;&#x4F53;&#x7684;&#x4EE3;&#x7801;&#x8BF7;&#x79FB;&#x6B65;&#x6211;&#x7684;<a href="https://github.com/JChermy/cross-domain-practice" rel="nofollow noreferrer" target="_blank">Github</a>&#x3002;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x7684;&#x8BDD;&#xFF0C;&#x6B22;&#x8FCE; <strong>star</strong> &#x30FE;(&#xB4;&#xFF65;&#x3C9;&#xFF65;&#xFF40;)&#xFF89;</p><p>&#x63A5;&#x4E0A;&#x6587;---&gt;<a href="https://segmentfault.com/a/1190000015276992">&#x300C;&#x8DE8;&#x57DF;&#x300D;&#x5229;&#x7528;node.js&#x5B9E;&#x8DF5;&#x524D;&#x7AEF;&#x5404;&#x79CD;&#x8DE8;&#x57DF;&#x65B9;&#x5F0F;&#xFF08;&#x4E0A;&#xFF09;</a></p><h3 id="articleHeader1">&#x516D;&#x3001;window.postMessage</h3><p>postMessage&#x662F;HTML5 XMLHttpRequest Level 2&#x4E2D;&#x7684;API&#xFF0C;&#x4E14;&#x662F;&#x4E3A;&#x6570;&#x4E0D;&#x591A;&#x53EF;&#x4EE5;&#x8DE8;&#x57DF;&#x64CD;&#x4F5C;&#x7684;window&#x5C5E;&#x6027;&#x4E4B;&#x4E00;&#xFF0C;&#x5B83;&#x53EF;&#x7528;&#x4E8E;&#x89E3;&#x51B3;&#x4EE5;&#x4E0B;&#x65B9;&#x9762;&#x7684;&#x95EE;&#x9898;&#xFF1A;</p><p>1.&#x9875;&#x9762;&#x548C;&#x5176;&#x6253;&#x5F00;&#x7684;&#x65B0;&#x7A97;&#x53E3;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9012;<br>2.&#x591A;&#x7A97;&#x53E3;&#x4E4B;&#x95F4;&#x6D88;&#x606F;&#x4F20;&#x9012;<br>3.&#x9875;&#x9762;&#x4E0E;&#x5D4C;&#x5957;&#x7684;iframe&#x6D88;&#x606F;&#x4F20;&#x9012;<br>4.&#x4E0A;&#x9762;&#x4E09;&#x4E2A;&#x573A;&#x666F;&#x7684;&#x8DE8;&#x57DF;&#x6570;&#x636E;&#x4F20;&#x9012;</p><p>&#x7528;&#x6CD5;&#xFF1A;<code>postMessage(data,origin)</code>&#x65B9;&#x6CD5;&#x63A5;&#x53D7;&#x4E24;&#x4E2A;&#x53C2;&#x6570;<br>data&#xFF1A; html5&#x89C4;&#x8303;&#x652F;&#x6301;&#x4EFB;&#x610F;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x6216;&#x53EF;&#x590D;&#x5236;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x4F46;&#x90E8;&#x5206;&#x6D4F;&#x89C8;&#x5668;&#x53EA;&#x652F;&#x6301;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x6240;&#x4EE5;&#x4F20;&#x53C2;&#x65F6;&#x6700;&#x597D;&#x7528;JSON.stringify()&#x5E8F;&#x5217;&#x5316;&#x3002;<br>origin&#xFF1A; &#x534F;&#x8BAE;+&#x4E3B;&#x673A;+&#x7AEF;&#x53E3;&#x53F7;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E3A;&quot;*&quot;&#xFF0C;&#x8868;&#x793A;&#x53EF;&#x4EE5;&#x4F20;&#x9012;&#x7ED9;&#x4EFB;&#x610F;&#x7A97;&#x53E3;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x6307;&#x5B9A;&#x548C;&#x5F53;&#x524D;&#x7A97;&#x53E3;&#x540C;&#x6E90;&#x7684;&#x8BDD;&#x8BBE;&#x7F6E;&#x4E3A;&quot;/&quot;&#x3002;</p><p>&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x7528;node.js&#x5B9E;&#x8DF5;&#x4E00;&#x4E0B;~</p><p>&#x76EE;&#x5F55;&#xFF1A;postMessage/public/a.html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;a&lt;/title&gt;
    &lt;iframe id=&quot;iframe&quot; src=&quot;http://localhost:4444/b.html&quot; style=&quot;display:none;&quot;&gt;&lt;/iframe&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;script&gt;
        const iframe = document.getElementById(&apos;iframe&apos;);
        iframe.onload = function() {
            const data = {
                name : &apos;Jchermy&apos;
            };

            //&#x5411;http://localhost:4444 &#x53D1;&#x9001;&#x8DE8;&#x57DF;&#x6570;&#x636E;
            iframe.contentWindow.postMessage(JSON.stringify(data), &quot;http://localhost:4444&quot;);
        };

        //&#x63A5;&#x53D7; localhost:4444 &#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;
        window.addEventListener(&apos;message&apos;, function(e){
            alert(&apos;data from b.html -----&gt;&apos; + e.data);
        },false);
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>a<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;iframe&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;http://localhost:4444/b.html&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display:none;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">const</span> iframe = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;iframe&apos;</span>);
        iframe.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">const</span> data = {
                <span class="hljs-attr">name</span> : <span class="hljs-string">&apos;Jchermy&apos;</span>
            };

            <span class="hljs-comment">//&#x5411;http://localhost:4444 &#x53D1;&#x9001;&#x8DE8;&#x57DF;&#x6570;&#x636E;</span>
            iframe.contentWindow.postMessage(<span class="hljs-built_in">JSON</span>.stringify(data), <span class="hljs-string">&quot;http://localhost:4444&quot;</span>);
        };

        <span class="hljs-comment">//&#x63A5;&#x53D7; localhost:4444 &#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;</span>
        <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&apos;message&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            alert(<span class="hljs-string">&apos;data from b.html -----&gt;&apos;</span> + e.data);
        },<span class="hljs-literal">false</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x5728;iframe&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x5411;b.html&#x6240;&#x5728;&#x57DF;&#x53D1;&#x9001;&#x6570;&#x636E;&#x3002;&#x56E0;&#x4E3A;postMessage&#x662F;&#x7ED1;&#x5B9A;&#x5728;window&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8981;&#x83B7;&#x53D6;iframe.contentWindow&#x518D;&#x53D1;&#x9001;&#x6570;&#x636E;&#xFF0C;&#x540C;&#x65F6;&#x76D1;&#x542C;<code>message</code>&#xFF0C;&#x89C2;&#x5BDF;b.html&#x6709;&#x6CA1;&#x6709;&#x56DE;&#x4F20;&#x6570;&#x636E;&#x7ED9;&#x6211;&#x4EEC;&#x3002;&#x73B0;&#x5728;&#x5206;&#x522B;&#x8DD1;&#x4E24;&#x4E2A;&#x670D;&#x52A1;&#x3002;&#x8BBF;&#x95EE;localhost:3333&#x53EF;&#x4EE5;&#x770B;&#x5230;:<br><span class="img-wrap"><img data-src="/img/bVbcfhJ?w=440&amp;h=138" src="https://static.alili.tech/img/bVbcfhJ?w=440&amp;h=138" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>b.html&#x63A5;&#x6536;&#x5230;a.html&#x53D1;&#x9001;&#x8FC7;&#x53BB;&#x7684;&#x6570;&#x636E;&#x5566;~</p><p><span class="img-wrap"><img data-src="/img/bVbcfid?w=440&amp;h=137" src="https://static.alili.tech/img/bVbcfid?w=440&amp;h=137" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x7136;&#x540E;a.html&#x4E5F;&#x6536;&#x5230;&#x4E86;b.html&#x56DE;&#x4F20;&#x7684;&#x6570;&#x636E;&#x4E86;&#x3002;</p><p>&#x8DE8;&#x57DF;&#x6210;&#x529F;~ ( &#xFF61;&#x1EDB; &#x2083;&#x1EDD;)&#x6BE;</p><h3 id="articleHeader2">&#x4E03;&#x3001;nginx &#x53CD;&#x5411;&#x4EE3;&#x7406;</h3><p>&#x8FD9;&#x4E2A;&#x65B9;&#x6848;&#x7684;&#x539F;&#x7406;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcftB?w=559&amp;h=257" src="https://static.alili.tech/img/bVbcftB?w=559&amp;h=257" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x8BF4;&#x660E;&#xFF1A;&#x5F53;A&#x57DF;&#x60F3;&#x4E0E;B&#x57DF;&#x901A;&#x4FE1;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;nginx&#x7684;&#x53CD;&#x5411;&#x4EE3;&#x7406;&#xFF0C;&#x9996;&#x5148;A&#x57DF;&#x4E0E;&#x540C;&#x57DF;&#x7684;nginx&#x670D;&#x52A1;&#x5668;&#x901A;&#x4FE1;&#xFF0C;&#x7136;&#x540E;nginx&#x5C06;&#x8BF7;&#x6C42;&#x8F6C;&#x53D1;&#x5230;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x56E0;&#x4E3A;&#x670D;&#x52A1;&#x5668;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#x4E0D;&#x5B58;&#x5728;&#x8DE8;&#x57DF;&#xFF0C;&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x8DE8;&#x57DF;&#x3002;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x5982;&#x4E0B;&#xFF1A;</p><p>&#x9996;&#x5148;&#xFF0C;&#x5982;&#x679C;&#x672C;&#x5730;&#x6CA1;&#x6709;&#x5B89;&#x88C5;nginx&#x7684;&#xFF0C;&#x9700;&#x8981;&#x5B89;&#x88C5;nginx&#x3002;&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;nginx&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#xFF1A;</p><p>&#x76EE;&#x5F55;&#xFF1A;nginx-1.14.0/conf/nginx.conf</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    server {
        listen       1111;
        server_name  localhost;

        location / {
            proxy_pass http://localhost:9999/; #&#x53CD;&#x5411;&#x4EE3;&#x7406;&#x5230;9999&#x7AEF;&#x53E3;
            index  index.html index.htm;
            default_type &quot;text/html&quot;;
            alias  &quot;D:/Github/node-server/nginx/public/&quot;; #client.html&#x6240;&#x5728;&#x7684;&#x672C;&#x5730;&#x7684;&#x5730;&#x5740;

            add_header Access_Control_Allow_Origin http://localhost:1111; 
            add_header Access_Control_Allow_Credentials true; #&#x5141;&#x8BB8;&#x5BA2;&#x6237;&#x7AEF;&#x5E26;cookie&#x8BBF;&#x95EE;
        }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nginx"><code>    <span class="hljs-section">server</span> {
        <span class="hljs-attribute">listen</span>       <span class="hljs-number">1111</span>;
        <span class="hljs-attribute">server_name</span>  localhost;

        <span class="hljs-attribute">location</span> / {
            <span class="hljs-attribute">proxy_pass</span> http://localhost:9999/; <span class="hljs-comment">#&#x53CD;&#x5411;&#x4EE3;&#x7406;&#x5230;9999&#x7AEF;&#x53E3;</span>
            <span class="hljs-attribute">index</span>  index.html index.htm;
            <span class="hljs-attribute">default_type</span> <span class="hljs-string">&quot;text/html&quot;</span>;
            <span class="hljs-attribute">alias</span>  <span class="hljs-string">&quot;D:/Github/node-server/nginx/public/&quot;</span>; <span class="hljs-comment">#client.html&#x6240;&#x5728;&#x7684;&#x672C;&#x5730;&#x7684;&#x5730;&#x5740;</span>

            <span class="hljs-attribute">add_header</span> Access_Control_Allow_Origin http://localhost:1111; 
            <span class="hljs-attribute">add_header</span> Access_Control_Allow_Credentials <span class="hljs-literal">true</span>; <span class="hljs-comment">#&#x5141;&#x8BB8;&#x5BA2;&#x6237;&#x7AEF;&#x5E26;cookie&#x8BBF;&#x95EE;</span>
        }
</code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x914D;&#x7F6E;9999&#x7AEF;&#x53E3;&#x7684;&#x670D;&#x52A1;&#x5668;</p><p>&#x76EE;&#x5F55;&#xFF1A;nginx/server.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require(&apos;http&apos;);
const server = http.createServer();
const qs = require(&apos;querystring&apos;);

server.on(&apos;request&apos;, function(req, res) {
    const query = require(&apos;url&apos;).parse(req.url, true).query;

    //&#x5411;&#x524D;&#x53F0;&#x5199;cookie
    res.writeHead(200, {
        &apos;Set-Cookie&apos; : &apos;name=jchermy;Path:/;Domain:localhost;Httponly&apos; //HttpOnly &#x811A;&#x672C;&#x65E0;&#x6CD5;&#x8BFB;&#x53D6;
    });
   
    res.write(JSON.stringify(&apos;Hi! &apos;+query.user));
    res.end();
})

server.listen(&apos;9999&apos;);
console.log(&apos;Server is running at port 9999 .....&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>);
<span class="hljs-keyword">const</span> server = http.createServer();
<span class="hljs-keyword">const</span> qs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;querystring&apos;</span>);

server.on(<span class="hljs-string">&apos;request&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">const</span> query = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;url&apos;</span>).parse(req.url, <span class="hljs-literal">true</span>).query;

    <span class="hljs-comment">//&#x5411;&#x524D;&#x53F0;&#x5199;cookie</span>
    res.writeHead(<span class="hljs-number">200</span>, {
        <span class="hljs-string">&apos;Set-Cookie&apos;</span> : <span class="hljs-string">&apos;name=jchermy;Path:/;Domain:localhost;Httponly&apos;</span> <span class="hljs-comment">//HttpOnly &#x811A;&#x672C;&#x65E0;&#x6CD5;&#x8BFB;&#x53D6;</span>
    });
   
    res.write(<span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">&apos;Hi! &apos;</span>+query.user));
    res.end();
})

server.listen(<span class="hljs-string">&apos;9999&apos;</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Server is running at port 9999 .....&apos;</span>);</code></pre><p>&#x8FD9;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x8BBF;&#x95EE; <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:1111/client.html?user=jchermy,&#x770B;&#x5230;&#x4E0B;&#x9762;&#x7684;&#x9875;&#x9762;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcggT?w=450&amp;h=117" src="https://static.alili.tech/img/bVbcggT?w=450&amp;h=117" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x6211;&#x4EEC;&#x5728;1111&#x7AEF;&#x53E3;&#xFF0C;&#x5C06;<code>user=jchermy</code>&#x4F20;&#x7ED9;9999&#x7AEF;&#x53E3;&#xFF0C;&#x7136;&#x540E;9999&#x7AEF;&#x53E3;&#x63A5;&#x6536;&#x5230;&#x4E86;&#x6211;&#x4EEC;&#x7684;&#x53D1;&#x9001;&#x7684;&#x4FE1;&#x606F;&#x5E76;&#x56DE;&#x4F20;&#x4E86;<code>&quot;Hi! jchermy&quot;</code>.&#x8BF4;&#x660E;&#x8FD9;&#x4E24;&#x4E2A;url&#x53EF;&#x4EE5;&#x8DE8;&#x57DF;&#x76F8;&#x4E92;&#x901A;&#x4FE1;&#xFF01;&#x5B8C;&#x6210;~</p><h3 id="articleHeader3">&#x4E03;&#x3001;node.js &#x4E2D;&#x95F4;&#x4EF6;&#x8DE8;&#x57DF;</h3><p>&#x8FD9;&#x4E2A;&#x65B9;&#x6848;&#x4E0E;nginx&#x53CD;&#x5411;&#x4EE3;&#x7406;&#x5341;&#x5206;&#x7C7B;&#x4F3C;&#xFF0C;&#x53EA;&#x662F;&#x5C06;nginx&#x4EE3;&#x7406;&#x670D;&#x52A1;&#x5668;&#x6362;&#x6210;&#x4E86;node&#x670D;&#x52A1;&#x5668;&#x3002;</p><p>&#x76EE;&#x5F55;&#xFF1A;node-middleware/proxyserver.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require(&apos;express&apos;);
const proxy = require(&apos;http-proxy-middleware&apos;);
const app = express();

app.use(&apos;/login&apos;, proxy({
    //&#x4EE3;&#x7406;&#x8DE8;&#x57DF;&#x7684;&#x76EE;&#x6807;&#x63A5;&#x53E3;
    target: &apos;http://localhost:5555&apos;,
    changeOrigin: true,
    //&#x4FEE;&#x6539;&#x54CD;&#x5E94;&#x5934;&#x4FE1;&#x606F;&#xFF0C;&#x5B9E;&#x73B0;&#x8DE8;&#x57DF;&#xFF0C;&#x5E76;&#x5141;&#x8BB8;&#x5E26;cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header(&apos;Access-Control-Allow-Origin&apos;, &apos;http://localhost&apos;);
        res.header(&apos;Access-Control-Allow-Credentials&apos;, &apos;true&apos;);
    },

    //&#x4FEE;&#x6539;&#x54CD;&#x5E94;&#x4FE1;&#x606F;&#x4E2D;&#x7684;cookie&#x57DF;&#x540D;
    cookieDomainRewrite: &apos;http://localhost&apos;
}));

app.use(express.static( &apos;./public&apos;));
app.listen(3333);
console.log(&apos;proxy server is listen at port 3333&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">const</span> proxy = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;http-proxy-middleware&apos;</span>);
<span class="hljs-keyword">const</span> app = express();

app.<span class="hljs-keyword">use</span>(<span class="hljs-string">&apos;/login&apos;</span>, proxy({
    <span class="hljs-comment">//&#x4EE3;&#x7406;&#x8DE8;&#x57DF;&#x7684;&#x76EE;&#x6807;&#x63A5;&#x53E3;</span>
    target: <span class="hljs-string">&apos;http://localhost:5555&apos;</span>,
    changeOrigin: <span class="hljs-keyword">true</span>,
    <span class="hljs-comment">//&#x4FEE;&#x6539;&#x54CD;&#x5E94;&#x5934;&#x4FE1;&#x606F;&#xFF0C;&#x5B9E;&#x73B0;&#x8DE8;&#x57DF;&#xFF0C;&#x5E76;&#x5141;&#x8BB8;&#x5E26;cookie</span>
    onProxyRes: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(proxyRes, req, res)</span> </span>{
        res.header(<span class="hljs-string">&apos;Access-Control-Allow-Origin&apos;</span>, <span class="hljs-string">&apos;http://localhost&apos;</span>);
        res.header(<span class="hljs-string">&apos;Access-Control-Allow-Credentials&apos;</span>, <span class="hljs-string">&apos;true&apos;</span>);
    },

    <span class="hljs-comment">//&#x4FEE;&#x6539;&#x54CD;&#x5E94;&#x4FE1;&#x606F;&#x4E2D;&#x7684;cookie&#x57DF;&#x540D;</span>
    cookieDomainRewrite: <span class="hljs-string">&apos;http://localhost&apos;</span>
}));

app.<span class="hljs-keyword">use</span>(express.<span class="hljs-keyword">static</span>( <span class="hljs-string">&apos;./public&apos;</span>));
app.listen(<span class="hljs-number">3333</span>);
console.log(<span class="hljs-string">&apos;proxy server is listen at port 3333&apos;</span>);</code></pre><p>&#x76EE;&#x5F55;&#xFF1A;node-middleware/server.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require(&apos;http&apos;);
const server = new http.Server();
const qs = require(&apos;querystring&apos;);

server.on(&apos;request&apos;, function(request, response) {
    const query = require(&apos;url&apos;).parse(request.url, true).query;
    response.writeHead(200, {
        &apos;Set-Cookie&apos;: &apos;name=amiee;Path:/;Domain:localhost:3333;Httponly&apos;
    });

    response.write(`Hi, ${query.name} ! I come from localhost:5555`);
    response.end();
})

server.listen(&apos;5555&apos;);
console.log(&apos;Server is running at port 5555 .....&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>);
<span class="hljs-keyword">const</span> server = <span class="hljs-keyword">new</span> http.Server();
<span class="hljs-keyword">const</span> qs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;querystring&apos;</span>);

server.on(<span class="hljs-string">&apos;request&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
    <span class="hljs-keyword">const</span> query = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;url&apos;</span>).parse(request.url, <span class="hljs-literal">true</span>).query;
    response.writeHead(<span class="hljs-number">200</span>, {
        <span class="hljs-string">&apos;Set-Cookie&apos;</span>: <span class="hljs-string">&apos;name=amiee;Path:/;Domain:localhost:3333;Httponly&apos;</span>
    });

    response.write(<span class="hljs-string">`Hi, <span class="hljs-subst">${query.name}</span> ! I come from localhost:5555`</span>);
    response.end();
})

server.listen(<span class="hljs-string">&apos;5555&apos;</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Server is running at port 5555 .....&apos;</span>)</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x8BBF;&#x95EE;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3333/login?name=hahah&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbcgkb?w=402&amp;h=87" src="https://static.alili.tech/img/bVbcgkb?w=402&amp;h=87" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader4">&#x516B;&#x3001;webSocket</h3><p>WebSocket protocol&#x662F;HTML5&#x4E00;&#x79CD;&#x65B0;&#x7684;&#x534F;&#x8BAE;&#x3002;&#x5B83;&#x5B9E;&#x73B0;&#x4E86;&#x6D4F;&#x89C8;&#x5668;&#x4E0E;&#x670D;&#x52A1;&#x5668;&#x5168;&#x53CC;&#x5DE5;&#x901A;&#x4FE1;&#xFF0C;&#x540C;&#x65F6;&#x5141;&#x8BB8;&#x8DE8;&#x57DF;&#x901A;&#x8BAF;&#xFF0C;&#x662F;server push&#x6280;&#x672F;&#x7684;&#x4E00;&#x79CD;&#x5F88;&#x597D;&#x7684;&#x5B9E;&#x73B0;&#x3002;<br>&#x539F;&#x751F;WebSocket API&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x4E0D;&#x592A;&#x65B9;&#x4FBF;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;Socket.io&#xFF0C;&#x5B83;&#x5F88;&#x597D;&#x5730;&#x5C01;&#x88C5;&#x4E86;webSocket&#x63A5;&#x53E3;&#xFF0C;&#x63D0;&#x4F9B;&#x4E86;&#x66F4;&#x7B80;&#x5355;&#x3001;&#x7075;&#x6D3B;&#x7684;&#x63A5;&#x53E3;&#xFF0C;&#x4E5F;&#x5BF9;&#x4E0D;&#x652F;&#x6301;webSocket&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x63D0;&#x4F9B;&#x4E86;&#x5411;&#x4E0B;&#x517C;&#x5BB9;&#x3002;</p><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5BA2;&#x6237;&#x7AEF;&#x7684;html&#x9875;&#x9762;&#x3002;</p><p>&#x76EE;&#x5F55;&#xFF1A;webSocket/public/index.html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;index&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div&gt;&#x7528;&#x6237;&#x8F93;&#x5165;: &lt;input type=&quot;text&quot;&gt;&lt;/div&gt;
    &lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
        window.onload = function(){
            var socket = io(&apos;http://localhost:5555&apos;);

            //&#x8FDE;&#x63A5;&#x6210;&#x529F;&#x5904;&#x7406;
            socket.on(&apos;connect&apos;, function(){
                console.log(&apos;Server socket has established&apos;);
            });

            socket.on(&apos;disconnect&apos;, function() {
                console.log(&apos;Server sockect has closed&apos;);
            });

            //&#x76D1;&#x542C;&#x670D;&#x52A1;&#x7AEF;&#x6D88;&#x606F;
            socket.on(&apos;message&apos;, function(msg) {
                console.log(&apos;data from server ----&gt;&apos; +msg);
            } )

            document.getElementsByTagName(&apos;input&apos;)[0].onblur = function() {
                socket.send(this.value);
            };
        }
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>index<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x7528;&#x6237;&#x8F93;&#x5165;: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> socket = io(<span class="hljs-string">&apos;http://localhost:5555&apos;</span>);

            <span class="hljs-comment">//&#x8FDE;&#x63A5;&#x6210;&#x529F;&#x5904;&#x7406;</span>
            socket.on(<span class="hljs-string">&apos;connect&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Server socket has established&apos;</span>);
            });

            socket.on(<span class="hljs-string">&apos;disconnect&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Server sockect has closed&apos;</span>);
            });

            <span class="hljs-comment">//&#x76D1;&#x542C;&#x670D;&#x52A1;&#x7AEF;&#x6D88;&#x606F;</span>
            socket.on(<span class="hljs-string">&apos;message&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;data from server ----&gt;&apos;</span> +msg);
            } )

            <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">&apos;input&apos;</span>)[<span class="hljs-number">0</span>].onblur = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                socket.send(<span class="hljs-keyword">this</span>.value);
            };
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x5C06;&#x8FD9;&#x4E2A;&#x9875;&#x9762;&#x90E8;&#x7F72;&#x5728;3333&#x7AEF;&#x53E3;&#x4E0A;&#x3002;</p><p>&#x76EE;&#x5F55;&#xFF1A;webSocket/client.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require(&apos;express&apos;);
const app = express();

app.use(express.static(&apos;./public&apos;));
app.listen(3333);
console.log(&apos;client is running at port 3333....&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">const</span> app = express();

app.<span class="hljs-keyword">use</span>(express.<span class="hljs-keyword">static</span>(<span class="hljs-string">&apos;./public&apos;</span>));
app.listen(<span class="hljs-number">3333</span>);
console.log(<span class="hljs-string">&apos;client is running at port 3333....&apos;</span>);</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x63A5;&#x6536;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x5E76;&#x7ED9;&#x4E88;&#x8FD4;&#x56DE;&#x503C;</p><p>&#x76EE;&#x5F55;: webSocket/server.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require(&apos;http&apos;);
const socket = require(&apos;socket.io&apos;);
 
//&#x542F;&#x52A8;http&#x670D;&#x52A1;
const server = http.createServer(function(req, res) {
    res.writeHead(200, {
        &apos;Content-type&apos;: &apos;text/html&apos;
    });
    res.end();
})

server.listen(5555);
console.log(&apos;server is running at port 5555&apos;);

const io = socket(server);
//&#x76D1;&#x542C;socket&#x8FDE;&#x63A5;
io.on(&apos;connection&apos;, function (client) {
    //&#x63A5;&#x6536;&#x6D88;&#x606F;
    client.on(&apos;message&apos;, function (msg) {
        io.emit(&apos;message&apos;,  `hello, ${msg}`);
        console.log(&apos;data from client ---&gt;&apos; + msg);
      });

      //&#x65AD;&#x5F00;&#x5904;&#x7406;
      client.on(&apos;disconnect&apos;, function() {
          console.log(&apos;Client socket has closed&apos;);
      });
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>);
<span class="hljs-keyword">const</span> socket = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;socket.io&apos;</span>);
 
<span class="hljs-comment">//&#x542F;&#x52A8;http&#x670D;&#x52A1;</span>
<span class="hljs-keyword">const</span> server = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.writeHead(<span class="hljs-number">200</span>, {
        <span class="hljs-string">&apos;Content-type&apos;</span>: <span class="hljs-string">&apos;text/html&apos;</span>
    });
    res.end();
})

server.listen(<span class="hljs-number">5555</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server is running at port 5555&apos;</span>);

<span class="hljs-keyword">const</span> io = socket(server);
<span class="hljs-comment">//&#x76D1;&#x542C;socket&#x8FDE;&#x63A5;</span>
io.on(<span class="hljs-string">&apos;connection&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">client</span>) </span>{
    <span class="hljs-comment">//&#x63A5;&#x6536;&#x6D88;&#x606F;</span>
    client.on(<span class="hljs-string">&apos;message&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">msg</span>) </span>{
        io.emit(<span class="hljs-string">&apos;message&apos;</span>,  <span class="hljs-string">`hello, <span class="hljs-subst">${msg}</span>`</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;data from client ---&gt;&apos;</span> + msg);
      });

      <span class="hljs-comment">//&#x65AD;&#x5F00;&#x5904;&#x7406;</span>
      client.on(<span class="hljs-string">&apos;disconnect&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Client socket has closed&apos;</span>);
      });
});</code></pre><p>&#x5C06;&#x5BA2;&#x6237;&#x7AEF;&#x548C;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x90FD;&#x8DD1;&#x8D77;&#x6765;&#xFF0C;&#x8F93;&#x5165;&#x4E00;&#x4E9B;&#x5B57;&#x7B26;&#xFF0C;&#x5F53;&#x9F20;&#x6807;&#x5931;&#x53BB;&#x7126;&#x70B9;&#x540E;&#x53EF;&#x4EE5;&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;5555&#x7AEF;&#x53E3;&#x7684;&#x63A7;&#x5236;&#x53F0;&#x770B;&#x5230;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbcgnq?w=344&amp;h=144" src="https://static.alili.tech/img/bVbcgnq?w=344&amp;h=144" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x8FD9;&#x8BF4;&#x660E;&#x670D;&#x52A1;&#x5668;&#x5DF2;&#x7ECF;&#x6536;&#x5230;&#x4E86;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x8FC7;&#x53BB;&#x7684;&#x5B57;&#x7B26;&#x3002;</p><p>&#x6B64;&#x65F6;&#x5728;&#x6253;&#x5F00;&#x5BA2;&#x6237;&#x7AEF;&#x9875;&#x9762;&#x7684;&#x63A7;&#x5236;&#x53F0;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x4E5F;&#x6536;&#x5230;&#x4E86;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x5B57;&#x7B26;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbcgnk?w=501&amp;h=374" src="https://static.alili.tech/img/bVbcgnk?w=501&amp;h=374" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader5">&#x7ED3;&#x8BED;</h3><p>&#x8FD9;&#x4E2A;&#x7CFB;&#x5217;&#x7EC8;&#x4E8E;&#x5199;&#x5B8C;&#x5566;&#xFF0C;&#x8FD8;&#x662F;&#x90A3;&#x53E5;&#x8BDD;&#xFF0C;&#x6709;&#x9519;&#x8BEF;&#x548C;&#x4E0D;&#x5408;&#x7406;&#x7684;&#x5730;&#x65B9;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6307;&#x6B63;&#xFF01;&#x5982;&#x679C;&#x6587;&#x7AE0;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x7684;&#x8BDD;&#xFF0C;&#x6B22;&#x8FCE;<strong>&#x70B9;&#x8D5E;</strong>&#x548C;<strong>&#x6536;&#x85CF;</strong>&#xFF01;&#xFF01;<a href="https://github.com/JChermy/cross-domain-practice" rel="nofollow noreferrer" target="_blank">Github</a>&#x7ED9;&#x4E2A;<strong><em>star</em></strong>&#x5C31;&#x6700;&#x597D;&#x5566;&#xFF01;=&#xFF08;//&#x25BD;//&#xFF09;&#x611F;&#x8C22;&#x5927;&#x5BB6;~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
「跨域」利用node.js实践前端各种跨域方式（下）

## 原文链接
[https://segmentfault.com/a/1190000015276949](https://segmentfault.com/a/1190000015276949)

