---
title: '「跨域」利用node.js实践前端各种跨域方式（上）' 
date: 2018-11-28 2:30:10
hidden: true
slug: 2m6n1ls3j07
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>&#x5E38;&#x8A00;&#x9053;&#xFF0C;&quot;&#x8BFB;&#x4E07;&#x5377;&#x4E66;&#xFF0C;&#x4E0D;&#x5982;&#x884C;&#x4E07;&#x91CC;&#x8DEF;&quot;&#x3002;&#x6280;&#x672F;&#x7684;&#x5B66;&#x4E60;&#x4E5F;&#x662F;&#x5982;&#x6B64;,&#x552F;&#x6709;&#x5B9E;&#x8DF5;&#x624D;&#x80FD;&#x66F4;&#x6E05;&#x695A;&#x7684;&#x660E;&#x767D;&#x539F;&#x7406;&#x548C;&#x52A0;&#x6DF1;&#x5370;&#x8C61;&#xFF0C;&#x56E0;&#x6B64;&#x672C;&#x6587;&#x4F1A;&#x5229;&#x7528;node.js&#x5BF9;&#x524D;&#x7AEF;&#x7684;&#x5404;&#x79CD;&#x8DE8;&#x57DF;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x5B9E;&#x8DF5;&#xFF0C;&#x5F3A;&#x70C8;&#x5EFA;&#x8BAE;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x8DDF;&#x7740;&#x505A;&#xFF0C;&#x76F8;&#x4FE1;&#x4F60;&#x80AF;&#x5B9A;&#x4F1A;&#x5BF9;&#x8DE8;&#x57DF;&#x6709;&#x66F4;&#x6DF1;&#x5C42;&#x6B21;&#x7684;&#x7406;&#x89E3;&#x3002;&#x800C;&#x7531;&#x4E8E;&#x7BC7;&#x5E45;&#x9650;&#x5236;&#xFF0C;&#x672C;&#x6587;&#x53EA;&#x4F1A;&#x8D34;&#x51FA;&#x5173;&#x952E;&#x6027;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x672C;&#x7CFB;&#x5217;&#x603B;&#x5171;&#x5206;&#x4E3A;&#x4E0A;&#x4E0B;&#x7BC7;&#x3002;&#x5177;&#x4F53;&#x7684;&#x4EE3;&#x7801;&#x8BF7;&#x79FB;&#x6B65;&#x6211;&#x7684;<a href="https://github.com/JChermy/cross-domain-practice" rel="nofollow noreferrer" target="_blank">Github</a>&#x3002;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x7684;&#x8BDD;&#xFF0C;&#x6B22;&#x8FCE; <strong>star</strong> &#x30FE;(&#xB4;&#xFF65;&#x3C9;&#xFF65;&#xFF40;)&#xFF89;</p><h3 id="articleHeader1">&#x4E00;&#x3001;cors &#x8DE8;&#x57DF;</h3><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5728;&#x672C;&#x5730;&#x8D77;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x7528;&#x4E8E;&#x63A5;&#x6536;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x8BF7;&#x6C42;&#x5E76;&#x4F5C;&#x51FA;&#x56DE;&#x5E94;&#x3002;</p><p>//&#x76EE;&#x5F55;&#xFF1A;cors/server.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require(&apos;http&apos;);

http.createServer(function (req, res) {
    //&#x8BBE;&#x7F6E;&#x54CD;&#x5E94;&#x5934;&#x90E8;
    res.writeHead(200, {&apos;Content-Type&apos;: &apos;text/plain&apos;});
    res.write(&apos;This is a server page&apos;);
    res.end();
  }).listen(3333);
   console.log(&apos;server start!&apos;)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>);

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x54CD;&#x5E94;&#x5934;&#x90E8;</span>
    res.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;text/plain&apos;</span>});
    res.write(<span class="hljs-string">&apos;This is a server page&apos;</span>);
    res.end();
  }).listen(<span class="hljs-number">3333</span>);
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server start!&apos;</span>)
</code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x5F00;&#x542F;&#x53E6;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#xFF0C;&#x670D;&#x52A1;&#x91CC;&#x52A0;&#x8F7D;&#x4E00;&#x4E2A;html&#x9875;&#x9762;&#xFF0C;&#x9875;&#x9762;&#x5BF9;&#x53D1;&#x51FA;xhr&#x8BF7;&#x6C42;&#xFF0C;&#x6A21;&#x62DF;&#x6D4F;&#x89C8;&#x5668;&#x5BF9;&#x670D;&#x52A1;&#x5668;&#x7684;&#x8BF7;&#x6C42;&#x3002;</p><p>//&#x76EE;&#x5F55;&#xFF1A;cors/clientServer.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require(&apos;express&apos;);
const app = express();

app.use(express.static(&apos;./public&apos;));
app.listen(3000)
console.log(&apos;client server start&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">const</span> app = express();

app.<span class="hljs-keyword">use</span>(express.<span class="hljs-keyword">static</span>(<span class="hljs-string">&apos;./public&apos;</span>));
app.listen(<span class="hljs-number">3000</span>)
console.log(<span class="hljs-string">&apos;client server start&apos;</span>);</code></pre><p>//&#x76EE;&#x5F55;&#xFF1A;cors/public/client.html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            const  content = document.getElementById(&apos;content&apos;);

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.onload = function(){
                if(xhr.readyState == 4) {
                    if(xhr.status &gt;= 200 &amp;&amp; xhr.status &lt;300 || xhr.status == 304) {
                        content.innerHTML = &apos;Reuqest was success:&apos; + xhr.responseText;
                        console.log(&apos;Request was success:&apos;, xhr.responseText);
                    }else {
                        content.innerHTML = &apos;Reuqest was failed:&apos; + xhr.status;
                        console.log(&quot;Request was failed:&quot;, xhr.status); 
                    }
                }
            }
            // xhr.open(&apos;get&apos;, &apos;http://localhost:3000/client.html&apos;, true); //&#x4E0D;&#x8DE8;&#x57DF;
            xhr.open(&apos;get&apos;, &apos;http://localhost:3333&apos;, true); //&#x8DE8;&#x57DF;

            xhr.send();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lua"><code>            const  content = document.getElementById(<span class="hljs-string">&apos;content&apos;</span>);

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = <span class="hljs-literal">true</span>;
            xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-keyword">if</span>(xhr.readyState == <span class="hljs-number">4</span>) {
                    <span class="hljs-keyword">if</span>(xhr.<span class="hljs-built_in">status</span> &gt;= <span class="hljs-number">200</span> &amp;&amp; xhr.<span class="hljs-built_in">status</span> &lt;<span class="hljs-number">300</span> || xhr.<span class="hljs-built_in">status</span> == <span class="hljs-number">304</span>) {
                        content.innerHTML = <span class="hljs-string">&apos;Reuqest was success:&apos;</span> + xhr.responseText;
                        console.log(<span class="hljs-string">&apos;Request was success:&apos;</span>, xhr.responseText);
                    }<span class="hljs-keyword">else</span> {
                        content.innerHTML = <span class="hljs-string">&apos;Reuqest was failed:&apos;</span> + xhr.<span class="hljs-built_in">status</span>;
                        console.log(<span class="hljs-string">&quot;Request was failed:&quot;</span>, xhr.<span class="hljs-built_in">status</span>); 
                    }
                }
            }
            // xhr.<span class="hljs-built_in">open</span>(<span class="hljs-string">&apos;get&apos;</span>, <span class="hljs-string">&apos;http://localhost:3000/client.html&apos;</span>, <span class="hljs-literal">true</span>); //&#x4E0D;&#x8DE8;&#x57DF;
            xhr.<span class="hljs-built_in">open</span>(<span class="hljs-string">&apos;get&apos;</span>, <span class="hljs-string">&apos;http://localhost:3333&apos;</span>, <span class="hljs-literal">true</span>); //&#x8DE8;&#x57DF;

            xhr.send();
</code></pre><p>&#x5206;&#x522B;&#x8FD0;&#x884C;&#x4E24;&#x4E2A;&#x670D;&#x52A1;&#xFF0C;&#x6D4B;&#x8BD5;3000&#x548C;3333&#x63A5;&#x53E3;&#xFF0C;&#x53D1;&#x73B0;&#x53EA;&#x6709;&#x8DE8;&#x57DF;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8BF7;&#x6C42;&#x7684;&#x5934;&#x90E8;&#x624D;&#x4F1A;&#x5E26;&#x7740;<code>origin</code>&#x5B57;&#x6BB5;&#x3002;&#x6B64;&#x65F6;&#x6211;&#x4EEC;&#x4FEE;&#x6539;cors/server.js, &#x52A0;&#x4E0A;&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    res.setHeader(&apos;Access-Control-Allow-Origin&apos;, &apos;http://localhost:3000&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code style="word-break:break-word;white-space:initial">    <span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.setHeader</span>(<span class="hljs-string">&apos;Access-Control-Allow-Origin&apos;</span>, <span class="hljs-string">&apos;http://localhost:3000&apos;</span>);</code></pre><p>&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#x4EE3;&#x8868;&#x670D;&#x52A1;&#x5668;&#x5141;&#x8BB8;&#x63A5;&#x6536;&#x6765;&#x81EA;3000&#x63A5;&#x53E3;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x6B64;&#x65F6;&#x5BA2;&#x6237;&#x7AEF;&#x518D;&#x6B21;&#x8BF7;&#x6C42;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x5C31;&#x80FD;&#x5728;&#x7528;&#x6237;&#x6BEB;&#x65E0;&#x611F;&#x77E5;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x5B8C;&#x6210;&#x8DE8;&#x57DF;&#x3002;</p><p>&#x800C;&#x6B64;&#x65F6;&#x5982;&#x679C;&#x60F3;&#x8BA9;&#x5BA2;&#x6237;&#x7AEF;&#x5E26;cookie&#x8BF7;&#x6C42;&#x5462;&#xFF1F;&#x90A3;&#x4E48;&#x9700;&#x8981;&#x505A;&#x4EE5;&#x4E0B;&#x5DE5;&#x4F5C;&#xFF1A;</p><p>1.cors/server.js &#x52A0;&#x4E0A;&#x8FD9;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    res.setHeader(&apos;Access-Control-Allow-Credentials&apos;, true);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code style="word-break:break-word;white-space:initial">    res.setHeader(<span class="hljs-string">&apos;Access-Control-Allow-Credentials&apos;</span>, <span class="hljs-literal">true</span>);</code></pre><p>2.cors/public/client.html &#x52A0;&#x4E0A;&#x8FD9;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.withCredentials = true;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code style="word-break:break-word;white-space:initial">xhr.<span class="hljs-attr">withCredentials</span> = <span class="hljs-literal">true</span>;</code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x4F60;&#x5C31;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x4F1A;&#x628A;&#x5F53;&#x524D;&#x57DF;&#x4E0B;&#x7684;cookie&#x4E00;&#x8D77;&#x53D1;&#x7ED9;&#x670D;&#x52A1;&#x5668;&#x5566;&#x256E;(&#xFFE3;&#x25BD;&#xFFE3;&quot;)&#x256D;</p><blockquote>ps&#xFF1A;&#x6CE8;&#x610F;cookie&#x53EA;&#x80FD;&#x7EC6;&#x5206;&#x5230;&#x57DF;&#x540D;&#x4E0B;&#xFF0C;&#x4E0D;&#x80FD;&#x7EC6;&#x5206;&#x5230;&#x7AEF;&#x53E3;&#x3002;&#x5373;&#x6CA1;&#x529E;&#x6CD5;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;cookie&#x4EC5;&#x5728;localhost:xxxx&#x4E0B;&#x3002;&#x5C3D;&#x7BA1;&#x7AEF;&#x53E3;&#x4E0D;&#x540C;&#x4F1A;&#x88AB;&#x6D4F;&#x89C8;&#x5668;&#x8BA4;&#x4E3A;&#x4E0D;&#x540C;&#x6E90;&#x3002;</blockquote><h3 id="articleHeader2">&#x4E8C;&#x3001;jsonp&#x8DE8;&#x57DF;</h3><p>&#x901A;&#x5E38;&#x4E3A;&#x4E86;&#x51CF;&#x8F7B;web&#x670D;&#x52A1;&#x5668;&#x7684;&#x8D1F;&#x8F7D;&#xFF0C;&#x6211;&#x4EEC;&#x628A;js&#x3001;css&#xFF0C;img&#x7B49;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x5206;&#x79BB;&#x5230;&#x53E6;&#x4E00;&#x53F0;&#x72EC;&#x7ACB;&#x57DF;&#x540D;&#x7684;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#xFF0C;&#x5728;html&#x9875;&#x9762;&#x4E2D;&#x518D;&#x901A;&#x8FC7;&#x76F8;&#x5E94;&#x7684;&#x6807;&#x7B7E;&#x4ECE;&#x4E0D;&#x540C;&#x57DF;&#x540D;&#x4E0B;&#x52A0;&#x8F7D;&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF0C;&#x800C;&#x88AB;&#x6D4F;&#x89C8;&#x5668;&#x5141;&#x8BB8;&#xFF0C;&#x57FA;&#x4E8E;&#x6B64;&#x539F;&#x7406;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x52A8;&#x6001;&#x521B;&#x5EFA;script&#xFF0C;&#x518D;&#x8BF7;&#x6C42;&#x4E00;&#x4E2A;&#x5E26;&#x53C2;&#x7F51;&#x5740;&#x5B9E;&#x73B0;&#x8DE8;&#x57DF;&#x901A;&#x4FE1;&#x3002;</p><p>&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x91C7;&#x7528;jQuery&#x4E2D;&#x7684;ajax&#x65B9;&#x6CD5;&#xFF0C;&#x4E0E;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x7EA6;&#x5B9A;&#x5C06;&#x6570;&#x636E;&#x56DE;&#x4F20;&#x5230;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x6BD4;&#x5982;&#x672C;&#x4F8B;&#x4E2D;&#x7684;<code>callback=person</code>&#xFF0C;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x4ECE;&#x56DE;&#x8C03;&#x51FD;&#x6570;person&#x91CC;&#x83B7;&#x53D6;&#x670D;&#x52A1;&#x5668;&#x4F20;&#x7ED9;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x6570;&#x636E;&#x4E86;&#x3002;&#x53E6;&#x5916;&#xFF0C;jsonp&#x7684;&#x7F3A;&#x70B9;&#x5C31;&#x662F;&#x53EA;&#x80FD;&#x91C7;&#x7528;get&#x8BF7;&#x6C42;&#x3002;</p><p>1.&#x76EE;&#x5F55;&#xFF1A;jsonp/server.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require(&apos;http&apos;);
const urllib = require(&apos;url&apos;);
const  httpdispatcher = require(&apos;httpdispatcher&apos;);
const dispatcher = new httpdispatcher();

const PORT = 1112;

function handleRequest(req, res) {
    try {
        console.log(req.url);

        dispatcher.dispatch(req, res);
    }catch(err) {
        console.log(err);
    }
}

const server = http.createServer(handleRequest);

dispatcher.onGet(&apos;/getPerson&apos;, function (req, res, next) {
  const data = {&apos;name&apos;: &apos;Jchermy&apos;, &apos;company&apos;: &apos;dog company&apos;};
  const params = urllib.parse(req.url, true);

  if(params.query &amp;&amp; params.query.callback) {
      let str = `${params.query.callback}(${JSON.stringify(data)})`;
      res.write(str);
      res.end();
  }else {
      res.write(JSON.stringify(data));
      res.end();
  }
})

server.listen(PORT, function () {
    console.log(&quot;server listening on http://localhost: %s&quot;, PORT);
  })
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>);
<span class="hljs-keyword">const</span> urllib = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;url&apos;</span>);
<span class="hljs-keyword">const</span>  httpdispatcher = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;httpdispatcher&apos;</span>);
<span class="hljs-keyword">const</span> dispatcher = <span class="hljs-keyword">new</span> httpdispatcher();

<span class="hljs-keyword">const</span> PORT = <span class="hljs-number">1112</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleRequest</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-built_in">console</span>.log(req.url);

        dispatcher.dispatch(req, res);
    }<span class="hljs-keyword">catch</span>(err) {
        <span class="hljs-built_in">console</span>.log(err);
    }
}

<span class="hljs-keyword">const</span> server = http.createServer(handleRequest);

dispatcher.onGet(<span class="hljs-string">&apos;/getPerson&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-keyword">const</span> data = {<span class="hljs-string">&apos;name&apos;</span>: <span class="hljs-string">&apos;Jchermy&apos;</span>, <span class="hljs-string">&apos;company&apos;</span>: <span class="hljs-string">&apos;dog company&apos;</span>};
  <span class="hljs-keyword">const</span> params = urllib.parse(req.url, <span class="hljs-literal">true</span>);

  <span class="hljs-keyword">if</span>(params.query &amp;&amp; params.query.callback) {
      <span class="hljs-keyword">let</span> str = <span class="hljs-string">`<span class="hljs-subst">${params.query.callback}</span>(<span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(data)}</span>)`</span>;
      res.write(str);
      res.end();
  }<span class="hljs-keyword">else</span> {
      res.write(<span class="hljs-built_in">JSON</span>.stringify(data));
      res.end();
  }
})

server.listen(PORT, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;server listening on http://localhost: %s&quot;</span>, PORT);
  })
</code></pre><p>2.&#x76EE;&#x5F55;&#xFF1A;jsonp/client.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require(&apos;express&apos;);
const app = express();

app.use(express.static(&apos;./public&apos;));
app.listen(1111);
console.log(&apos;client start&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">const</span> app = express();

app.<span class="hljs-keyword">use</span>(express.<span class="hljs-keyword">static</span>(<span class="hljs-string">&apos;./public&apos;</span>));
app.listen(<span class="hljs-number">1111</span>);
console.log(<span class="hljs-string">&apos;client start&apos;</span>);</code></pre><p>3.&#x76EE;&#x5F55;&#xFF1A;jsonp/public/index.html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;index&lt;/title&gt;
    &lt;script src=&quot;http://apps.bdimg.com/libs/jquery/2.1.4/jquery.js&quot;&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;button id=&apos;getData&apos;&gt;&#x8DE8;&#x57DF;&#x83B7;&#x53D6;&#x6570;&#x636E;&lt;/button&gt;
    &lt;div id=&apos;content&apos;&gt;
        &#x59D3;&#x540D;&#xFF1A;&lt;span class=&quot;name&quot;&gt;&lt;/span&gt;&lt;br/&gt;
        &#x516C;&#x53F8;&#xFF1A;&lt;span class=&quot;company&quot;&gt;&lt;/span&gt;
    &lt;/div&gt;
    &lt;script&gt;
        const btn = document.getElementById(&apos;getData&apos;);
        const container = document.getElementById(&apos;content&apos;);
        btn.addEventListener(&apos;click&apos;, function(){
            $.ajax({
                url: &apos;http://localhost:1112/getPerson?callback=?&apos;,
                dataType: &apos;jsonp&apos;,
                jsonpCallback: &apos;person&apos;,
                success: function(data){
                    $(&apos;.name&apos;).html(data.name);
                    $(&apos;.company&apos;).html(data.company);
                }
            })
        }, false);
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>index<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;http://apps.bdimg.com/libs/jquery/2.1.4/jquery.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&apos;getData&apos;</span>&gt;</span>&#x8DE8;&#x57DF;&#x83B7;&#x53D6;&#x6570;&#x636E;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&apos;content&apos;</span>&gt;</span>
        &#x59D3;&#x540D;&#xFF1A;<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;name&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
        &#x516C;&#x53F8;&#xFF1A;<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;company&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">const</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;getData&apos;</span>);
        <span class="hljs-keyword">const</span> container = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;content&apos;</span>);
        btn.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            $.ajax({
                <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://localhost:1112/getPerson?callback=?&apos;</span>,
                <span class="hljs-attr">dataType</span>: <span class="hljs-string">&apos;jsonp&apos;</span>,
                <span class="hljs-attr">jsonpCallback</span>: <span class="hljs-string">&apos;person&apos;</span>,
                <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
                    $(<span class="hljs-string">&apos;.name&apos;</span>).html(data.name);
                    $(<span class="hljs-string">&apos;.company&apos;</span>).html(data.company);
                }
            })
        }, <span class="hljs-literal">false</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x5206;&#x522B;&#x8FD0;&#x884C;&#x5BA2;&#x6237;&#x7AEF;&#x548C;&#x670D;&#x52A1;&#x7AEF;&#xFF0C;&#x70B9;&#x51FB;&#x201C;&#x83B7;&#x53D6;&#x8DE8;&#x57DF;&#x6570;&#x636E;&#x7684;&#x6309;&#x94AE;&#x201D;&#xFF0C;&#x5F53;&#x524D;&#x9875;&#x9762;(1111&#x7AEF;&#x53E3;)&#x5C31;&#x53EF;&#x4EE5;&#x62FF;&#x5230;1112&#x7AEF;&#x53E3;&#x7684;&#x6570;&#x636E;&#x5566;~~(&#x25CF;&#x2032;&#x3C9;`&#x25CF;)</p><h3 id="articleHeader3">&#x4E09;&#x3001;document.domain + frame &#x8DE8;&#x57DF;</h3><p>&#x6B64;&#x65B9;&#x6848;&#x4EC5;&#x9650;&#x4E3B;&#x57DF;&#x76F8;&#x540C;&#xFF0C;&#x5B50;&#x57DF;&#x4E0D;&#x540C;&#x7684;&#x8DE8;&#x57DF;&#x5E94;&#x7528;&#x573A;&#x666F;&#x3002;</p><p>&#x5B9E;&#x73B0;&#x539F;&#x7406;&#xFF1A;&#x4E24;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x901A;&#x8FC7;js&#x5F3A;&#x5236;&#x8BBE;&#x7F6E;document.domain&#x4E3A;&#x57FA;&#x7840;&#x4E3B;&#x57DF;&#xFF0C;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;&#x540C;&#x57DF;&#x3002;</p><p>&#x4E0B;&#x9762;&#x53EA;&#x662F;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#x5E2E;&#x52A9;&#x5927;&#x5BB6;&#x7406;&#x89E3;&#x4E00;&#x4E0B;&#x3002;</p><p>&#x73B0;&#x5728;&#x6709;&#x4E24;&#x4E2A;&#x7F51;&#x5740;&#x3002;&#x767E;&#x5EA6;&#x77E5;&#x9053;&#x548C;&#x767E;&#x5EA6;&#x767E;&#x79D1;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://zhidao.baidu.com/
https://baike.baidu.com/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="http hljs"><code class="http"><span class="hljs-attribute">https://zhidao.baidu.com/
https://baike.baidu.com/</span></code></pre><p>&#x5728;&#x767E;&#x5EA6;&#x77E5;&#x9053;&#x7684;&#x7F51;&#x9875;,&#x5199;&#x4E0B;&#x4EE5;&#x4E0B;&#x547D;&#x4EE4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.domain = &quot;baidu.com&quot;;
const child= window.open(&quot;https://baike.baidu.com/&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-built_in">document</span>.domain = <span class="hljs-string">&quot;baidu.com&quot;</span>;
<span class="hljs-keyword">const</span> child= <span class="hljs-built_in">window</span>.open(<span class="hljs-string">&quot;https://baike.baidu.com/&quot;</span>);</code></pre><p>&#x5728;&#x6253;&#x5F00;&#x7684;&#x767E;&#x5EA6;&#x767E;&#x79D1;&#x7684;&#x7F51;&#x9875;&#xFF0C;&#x5199;&#x4E0B;&#x4EE5;&#x4E0B;&#x547D;&#x4EE4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.domain = &quot;baidu.com&quot;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code style="word-break:break-word;white-space:initial">document.domain = <span class="hljs-string">&quot;baidu.com&quot;</span><span class="hljs-comment">;</span></code></pre><p>&#x7136;&#x540E;&#x56DE;&#x5230;&#x767E;&#x5EA6;&#x77E5;&#x9053;&#x7684;&#x7F51;&#x9875;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x5230;&#x767E;&#x5EA6;&#x767E;&#x79D1;(&#x5B50;&#x9875;&#x9762;)&#x7684;&#x5143;&#x7D20;&#x5566;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const button = other.document.getElementById(&quot;search&quot;);

//&lt;button id=&quot;search&quot; nslog=&quot;normal&quot; nslog-type=&quot;10080008&quot; type=&quot;button&quot;&gt;&#x8FDB;&#x5165;&#x8BCD;&#x6761;&lt;/button&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nimrod"><code><span class="hljs-keyword">const</span> button = other.document.getElementById(<span class="hljs-string">&quot;search&quot;</span>);

//&lt;button id=<span class="hljs-string">&quot;search&quot;</span> nslog=<span class="hljs-string">&quot;normal&quot;</span> nslog-<span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;10080008&quot;</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;button&quot;</span>&gt;&#x8FDB;&#x5165;&#x8BCD;&#x6761;&lt;/button&gt;</code></pre><h3 id="articleHeader4">&#x56DB;&#x3001;window.name+iframe &#x8DE8;&#x57DF;</h3><blockquote>window.name&#x5C5E;&#x6027;&#x7684;&#x72EC;&#x7279;&#x4E4B;&#x5904;&#xFF1A;name&#x503C;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x9875;&#x9762;&#xFF08;&#x751A;&#x81F3;&#x4E0D;&#x540C;&#x57DF;&#x540D;&#xFF09;&#x52A0;&#x8F7D;&#x540E;&#x4F9D;&#x65E7;&#x5B58;&#x5728;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x652F;&#x6301;&#x975E;&#x5E38;&#x957F;&#x7684; name &#x503C;&#xFF08;2MB&#xFF09;&#x3002;</blockquote><p>&#x5728;&#x672C;&#x5730;&#x8D77;&#x4E24;&#x4E2A;node&#x670D;&#x52A1;&#xFF0C;&#x5206;&#x522B;&#x5360;&#x7528;3333&#x548C;4444&#x3002;&#x7236;&#x9875;&#x9762;&#x662F;:<br>1.window-name/public/index.html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          const proxy = function(url ,callback) {
                let status = 0;
                const iframe = document.createElement(&apos;iframe&apos;);

                iframe.src = url;

                iframe.onload = function(){
                    if(status === 1) {
                        callback(iframe.contentWindow.name);
                        destoryFrame();
                    } else if (status === 0) {
                        iframe.contentWindow.location = &apos;http://localhost:4444/proxy.html&apos;;
                        status = 1;
                    }
                }

                document.body.appendChild(iframe);
          };
         

          function destoryFrame() {
              iframe.contentWindow.document.write(&apos;&apos;);
              iframe.contentWindow.close();
              document.body.removeChild(iframe);
          }

          proxy(&apos;http://localhost:3333/iframe.html&apos;, function(data) {
              alert(data);
          })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code>          <span class="hljs-keyword">const</span> proxy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url ,callback</span>) </span>{
                <span class="hljs-keyword">let</span> status = <span class="hljs-number">0</span>;
                <span class="hljs-keyword">const</span> iframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;iframe&apos;</span>);

                iframe.src = <span class="hljs-built_in">url</span>;

                iframe.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    <span class="hljs-keyword">if</span>(status === <span class="hljs-number">1</span>) {
                        callback(iframe.contentWindow.name);
                        destoryFrame();
                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (status === <span class="hljs-number">0</span>) {
                        iframe.contentWindow.location = <span class="hljs-string">&apos;http://localhost:4444/proxy.html&apos;</span>;
                        status = <span class="hljs-number">1</span>;
                    }
                }

                <span class="hljs-built_in">document</span>.body.appendChild(iframe);
          };
         

          <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">destoryFrame</span>(<span class="hljs-params"></span>) </span>{
              iframe.contentWindow.document.write(<span class="hljs-string">&apos;&apos;</span>);
              iframe.contentWindow.close();
              <span class="hljs-built_in">document</span>.body.removeChild(iframe);
          }

          proxy(<span class="hljs-string">&apos;http://localhost:3333/iframe.html&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
              alert(data);
          })</code></pre><p>2.iframe &#x9875;&#x9762;&#x662F;<br>window-name/public/iframe.html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        window.name = &apos;this is window.name from iframe&apos;;
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>    &lt;<span class="hljs-keyword">script</span>&gt;
        window.<span class="hljs-built_in">name</span> = &apos;this <span class="hljs-keyword">is</span> window.<span class="hljs-built_in">name</span> <span class="hljs-keyword">from</span> iframe&apos;;
    &lt;/<span class="hljs-keyword">script</span>&gt;</code></pre><p>3.&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x4EE3;&#x7406;&#x9875;&#x9762;&#xFF0C;&#x8DDF;&#x7236;&#x9875;&#x9762;&#x540C;&#x6E90;&#x3002;&#x5185;&#x5BB9;&#x4E3A;&#x7A7A;&#x5C31;&#x597D;&#x3002;&#x76EE;&#x5F55;&#xFF1A;/window-name/public/proxy.html</p><p>&#x603B;&#x7ED3;&#xFF1A;&#x901A;&#x8FC7;iframe&#x7684;src&#x5C5E;&#x6027;&#x7531;&#x5916;&#x57DF;&#x8F6C;&#x5411;&#x672C;&#x5730;&#x57DF;&#xFF0C;&#x8DE8;&#x57DF;&#x6570;&#x636E;&#x5373;&#x7531;iframe&#x7684;window.name&#x4ECE;&#x5916;&#x57DF;&#x4F20;&#x9012;&#x5230;&#x672C;&#x5730;&#x57DF;&#x3002;&#x8FD9;&#x4E2A;&#x5C31;&#x5DE7;&#x5999;&#x5730;&#x7ED5;&#x8FC7;&#x4E86;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x8DE8;&#x57DF;&#x8BBF;&#x95EE;&#x9650;&#x5236;&#xFF0C;&#x4F46;&#x540C;&#x65F6;&#x5B83;&#x53C8;&#x662F;&#x5B89;&#x5168;&#x64CD;&#x4F5C;&#x3002;</p><h3 id="articleHeader5">&#x4E94;&#x3001;location.hash+iframe &#x8DE8;&#x57DF;</h3><p>&#x539F;&#x7406;&#xFF1A;A&#x57DF;&#x60F3;&#x548C;B&#x57DF;&#x901A;&#x4FE1;&#xFF0C;&#x901A;&#x8FC7;&#x4E2D;&#x95F4;&#x9875;&#x9762;c&#x3002;&#x4E0D;&#x540C;&#x57DF;&#x4E4B;&#x95F4;&#x901A;&#x8FC7;location.hash&#x6765;&#x901A;&#x4FE1;&#xFF0C;&#x800C;&#x76F8;&#x540C;&#x57DF;&#x4E4B;&#x95F4;&#x76F4;&#x63A5;&#x901A;&#x8FC7;js&#x6765;&#x901A;&#x4FE1;&#x3002;</p><p>&#x5B9E;&#x73B0;&#xFF1A;A&#x57DF;&#xFF1A;a.html ----&gt; B&#x57DF;&#xFF1A;b.html ----&gt; A&#x57DF;&#xFF1A;c.html&#xFF0C;a&#x4E0E;b&#x4E0D;&#x540C;&#x57DF;&#x53EA;&#x80FD;&#x901A;&#x8FC7;hash&#x503C;&#x5355;&#x5411;&#x901A;&#x4FE1;&#xFF0C;b&#x4E0E;c&#x4E5F;&#x4E0D;&#x540C;&#x57DF;&#x4E5F;&#x53EA;&#x80FD;&#x5355;&#x5411;&#x901A;&#x4FE1;&#xFF0C;&#x4F46;c&#x4E0E;a&#x540C;&#x57DF;&#xFF0C;&#x6240;&#x4EE5;c&#x53EF;&#x901A;&#x8FC7;parent.parent&#x8BBF;&#x95EE;a&#x9875;&#x9762;&#x6240;&#x6709;&#x5BF9;&#x8C61;&#x3002;</p><p>&#x76EE;&#x5F55;:location-hash/public/a.html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;a&lt;/title&gt;
    &lt;iframe id=&apos;iframe&apos; src=&quot;http://localhost:4444/b.html&quot; style=&quot;display:none;&quot;&gt;&lt;/iframe&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;script&gt;
        const iframe = document.getElementById(&apos;iframe&apos;);

        //&#x5411;b.html&#x4F20;&#x9012;hash&#x503C;
        setTimeout(function(){
           iframe.src = iframe.src + &apos;#user=admin&apos;;
        },1000);

        function onCallback(res) {
            alert(&apos;data from c.html ----&gt;&apos; + res);
        }
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>a<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&apos;iframe&apos;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;http://localhost:4444/b.html&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display:none;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">const</span> iframe = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;iframe&apos;</span>);

        <span class="hljs-comment">//&#x5411;b.html&#x4F20;&#x9012;hash&#x503C;</span>
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
           iframe.src = iframe.src + <span class="hljs-string">&apos;#user=admin&apos;</span>;
        },<span class="hljs-number">1000</span>);

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onCallback</span>(<span class="hljs-params">res</span>) </span>{
            alert(<span class="hljs-string">&apos;data from c.html ----&gt;&apos;</span> + res);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x76EE;&#x5F55;:location-hash/public/b.html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;b&lt;/title&gt;
    &lt;iframe id=&quot;iframe&quot;  src=&quot;http://localhost:3333/c.html&quot; style=&quot;display:none;&quot;&gt;&lt;/iframe&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;script&gt;
        const iframe = document.getElementById(&apos;iframe&apos;);

        // &#x76D1;&#x542C;a.html&#x4F20;&#x6765;&#x7684;hash&#x503C;&#xFF0C;&#x518D;&#x4F20;&#x7ED9;c.html
        window.onhashchange = function(){
            iframe.src = iframe.src + location.hash;
        }
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>b<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;iframe&quot;</span>  <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;http://localhost:3333/c.html&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display:none;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">const</span> iframe = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;iframe&apos;</span>);

        <span class="hljs-comment">// &#x76D1;&#x542C;a.html&#x4F20;&#x6765;&#x7684;hash&#x503C;&#xFF0C;&#x518D;&#x4F20;&#x7ED9;c.html</span>
        <span class="hljs-built_in">window</span>.onhashchange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            iframe.src = iframe.src + location.hash;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x76EE;&#x5F55;&#xFF1A;location-hash/public/c.html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script&gt;
        // &#x76D1;&#x542C;b.html&#x4F20;&#x6765;&#x7684;hash&#x503C;
        window.onhashchange = function(){
            // &#x518D;&#x901A;&#x8FC7;&#x64CD;&#x4F5C;&#x540C;&#x57DF;a.html&#x7684;js&#x56DE;&#x8C03;&#xFF0C;&#x5C06;&#x7ED3;&#x679C;&#x4F20;&#x56DE;
            window.parent.parent.onCallback(&apos;hello &apos;+ location.hash.replace(&apos;#user=&apos;, &apos;&apos;));
        };
    &lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">// &#x76D1;&#x542C;b.html&#x4F20;&#x6765;&#x7684;hash&#x503C;</span>
        <span class="hljs-built_in">window</span>.onhashchange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-comment">// &#x518D;&#x901A;&#x8FC7;&#x64CD;&#x4F5C;&#x540C;&#x57DF;a.html&#x7684;js&#x56DE;&#x8C03;&#xFF0C;&#x5C06;&#x7ED3;&#x679C;&#x4F20;&#x56DE;</span>
            <span class="hljs-built_in">window</span>.parent.parent.onCallback(<span class="hljs-string">&apos;hello &apos;</span>+ location.hash.replace(<span class="hljs-string">&apos;#user=&apos;</span>, <span class="hljs-string">&apos;&apos;</span>));
        };
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;node&#x670D;&#x52A1;&#x5C06;a.html&#x548C;c.html&#x90E8;&#x7F72;&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x7AEF;&#x53E3;&#x4E0B;&#xFF0C;&#x5C06;b.html&#x90E8;&#x7F72;&#x5728;&#x53E6;&#x4E00;&#x4E2A;&#x7AEF;&#x53E3;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//location-hash/server1.js
app.use(&apos;/a.html&apos;, express.static(__dirname+&apos;/public/a.html&apos;));
app.use(&apos;/c.html&apos;, express.static(__dirname+&apos;/public/c.html&apos;));
app.listen(3333);

//location-hash/server2.js
app.use(&apos;/b.html&apos;, express.static(__dirname+&apos;/public/b.html&apos;));
app.listen(4444);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-comment">//location-hash/server1.js</span>
app.<span class="hljs-keyword">use</span>(<span class="hljs-string">&apos;/a.html&apos;</span>, express.<span class="hljs-keyword">static</span>(__dirname+<span class="hljs-string">&apos;/public/a.html&apos;</span>));
app.<span class="hljs-keyword">use</span>(<span class="hljs-string">&apos;/c.html&apos;</span>, express.<span class="hljs-keyword">static</span>(__dirname+<span class="hljs-string">&apos;/public/c.html&apos;</span>));
app.listen(<span class="hljs-number">3333</span>);

<span class="hljs-comment">//location-hash/server2.js</span>
app.<span class="hljs-keyword">use</span>(<span class="hljs-string">&apos;/b.html&apos;</span>, express.<span class="hljs-keyword">static</span>(__dirname+<span class="hljs-string">&apos;/public/b.html&apos;</span>));
app.listen(<span class="hljs-number">4444</span>);
</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5206;&#x522B;&#x5C06;&#x4E24;&#x4E2A;&#x670D;&#x52A1;&#x8DD1;&#x8D77;&#x6765;&#x3002;&#x8BBF;&#x95EE;localhost:3333&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5F39;&#x7A97;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbce9C?w=441&amp;h=144" src="https://static.alili.tech/img/bVbce9C?w=441&amp;h=144" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x5373;b.html&#x501F;&#x52A9;c.html&#x63A5;&#x6536;&#x5230;&#x4E86;a.html&#x53D1;&#x6765;&#x7684;&#x6D88;&#x606F;&#xFF0C;&#x5E76;&#x7ED9;&#x4E88;&#x56DE;&#x5E94;<code>&quot;hello admin&quot;</code>,&#x8DE8;&#x57DF;&#x6210;&#x529F;~</p><p>&#x63A5;&#x4E0B;&#x6587;---&gt;<a href="https://segmentfault.com/a/1190000015276949">&#x300C;&#x8DE8;&#x57DF;&#x300D;&#x5229;&#x7528;node.js&#x5B9E;&#x8DF5;&#x524D;&#x7AEF;&#x5404;&#x79CD;&#x8DE8;&#x57DF;&#x65B9;&#x5F0F;&#xFF08;&#x4E0B;&#xFF09;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
「跨域」利用node.js实践前端各种跨域方式（上）

## 原文链接
[https://segmentfault.com/a/1190000015276992](https://segmentfault.com/a/1190000015276992)

