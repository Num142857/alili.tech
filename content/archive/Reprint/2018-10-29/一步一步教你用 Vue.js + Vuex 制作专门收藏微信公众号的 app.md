---
title: 一步一步教你用 Vue.js + Vuex 制作专门收藏微信公众号的 app
reprint: true
categories: reprint
abbrlink: b5a8e07a
date: 2018-10-29 02:30:09
---

{{% raw %}}
<p>&#x53EA;&#x770B;&#x4E0D;&#x8D5E;&#xFF0C;&#x6216;&#x8005;&#x53EA;&#x6536;&#x85CF;&#x4E0D;&#x8D5E;&#x7684;&#x90FD;&#x662F;&#x800D;&#x6D41;&#x6C13;&#xFF0C;&#x653E;&#x5B66;&#x522B;&#x8D70;&#xFF0C;&#x6211;&#x627E;&#x6211;&#x54E5;&#x6536;&#x62FE;&#x4F60;&#x4EEC;&#x3002;</p><blockquote><p>&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/jrainlau/wechat-subscriptor" rel="nofollow noreferrer" target="_blank">https://github.com/jrainlau/wechat-subscriptor</a></p></blockquote><p><span class="img-wrap"><img data-src="/img/bVyFVF" src="https://static.alili.tech/img/bVyFVF" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVyFV9" src="https://static.alili.tech/img/bVyFV9" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader0">&#x4E0B;&#x8F7D;&amp;&#x8FD0;&#x884C;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone git@github.com:jrainlau/wechat-subscriptor.git
cd wechat-subscriptor &amp;&amp; npm install

npm run dev   // run in dev mode
cd backend-server &amp;&amp; node crawler.js   // turn on the crawler server

open `localhost:8080` in your broswer and enjoy it." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">git</span>@github.com:jrainlau/wechat-subscriptor.git
cd wechat-subscriptor &amp;&amp; npm install

npm run dev   // run <span class="hljs-keyword">in</span> dev mode
cd backend-server &amp;&amp; <span class="hljs-keyword">node</span> <span class="hljs-title">crawler</span>.js   // turn on the crawler server

open `localhost:<span class="hljs-number">8080</span>` <span class="hljs-keyword">in</span> your broswer <span class="hljs-keyword">and</span> enjoy it.</code></pre><h2 id="articleHeader1">&#x9879;&#x76EE;&#x4ECB;&#x7ECD;</h2><p>&#x6211;&#x5728;&#x5FAE;&#x4FE1;&#x4E0A;&#x5173;&#x6CE8;&#x4E86;&#x4E0D;&#x5C11;&#x7684;&#x516C;&#x4F17;&#x53F7;&#xFF0C;&#x7ECF;&#x5E38;&#x6D4F;&#x89C8;&#x91CC;&#x9762;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x4F46;&#x662F;&#x5F80;&#x5F80;&#x5728;&#x6211;&#x9605;&#x8BFB;&#x6587;&#x7AE0;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x603B;&#x662F;&#x88AB;&#x5404;&#x79CD;&#x5FAE;&#x4FE1;&#x6D88;&#x606F;&#x6253;&#x65AD;&#xFF0C;&#x4E0D;&#x5F97;&#x4E0D;&#x5207;&#x51FA;&#x53BB;&#xFF0C;&#x56DE;&#x590D;&#x6D88;&#x606F;&#xFF0C;&#x7136;&#x540E;&#x4E00;&#x8DEF;&#x70B9;&#x56DE;&#x516C;&#x4F17;&#x53F7;&#xFF0C;&#x91CD;&#x65B0;&#x6253;&#x5F00;&#x6587;&#x7AE0;&#xFF0C;&#x5468;&#x800C;&#x590D;&#x59CB;&#xFF0C;&#x4E0D;&#x80DC;&#x5176;&#x70E6;&#x3002;&#x540E;&#x6765;&#x60F3;&#x8D77;&#xFF0C;&#x5FAE;&#x4FE1;&#x8DDF;&#x641C;&#x72D7;&#x6709;&#x5408;&#x4F5C;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x641C;&#x72D7;&#x76F4;&#x63A5;&#x641C;&#x7D22;&#x516C;&#x4F17;&#x53F7;&#xFF0C;&#x90A3;&#x4E48;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x5229;&#x7528;&#x8FD9;&#x4E2A;&#x8D44;&#x6E90;&#x505A;&#x4E00;&#x4E2A;&#x4E13;&#x95E8;&#x6536;&#x85CF;&#x516C;&#x4F17;&#x53F7;&#x7684;&#x5E94;&#x7528;&#x5462;&#xFF1F;&#x8FD9;&#x4E2A;&#x5E94;&#x7528;&#x53EF;&#x4EE5;&#x65B9;&#x4FBF;&#x5730;&#x641C;&#x7D22;&#x516C;&#x4F17;&#x53F7;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x5B83;&#x6536;&#x85CF;&#x8D77;&#x6765;&#xFF0C;&#x60F3;&#x770B;&#x7684;&#x65F6;&#x5019;&#x76F4;&#x63A5;&#x6253;&#x5F00;&#x5C31;&#x80FD;&#x770B;&#x3002;&#x597D;&#x5427;&#xFF0C;&#x5176;&#x5B9E;&#x4E5F;&#x4E0D;&#x96BE;&#xFF0C;&#x90A3;&#x5C31;&#x5F00;&#x59CB;&#x4ECE;&#x67B6;&#x6784;&#x5F00;&#x59CB;&#x6784;&#x601D;&#x3002;</p><h2 id="articleHeader2">&#x6574;&#x4F53;&#x67B6;&#x6784;</h2><p>&#x56FD;&#x9645;&#x60EF;&#x4F8B;&#xFF0C;&#x5148;&#x770B;&#x67B6;&#x6784;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVyGqh" src="https://static.alili.tech/img/bVyGqh" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x7136;&#x540E;&#x662F;&#x6280;&#x672F;&#x9009;&#x578B;&#xFF1A;</p><ol><li><p>&#x5229;&#x7528;&#x641C;&#x72D7;&#x7684;API&#x4F5C;&#x4E3A;&#x67E5;&#x8BE2;&#x516C;&#x4F17;&#x53F7;&#x7684;&#x63A5;&#x53E3;</p></li><li><p>&#x7531;&#x4E8E;&#x5B58;&#x5728;&#x8DE8;&#x57DF;&#x95EE;&#x9898;&#xFF0C;&#x9042;&#x901A;&#x8FC7;<code>node</code>&#x722C;&#x866B;&#x4F7F;&#x7528;&#x63A5;&#x53E3;</p></li><li><p>&#x4F7F;&#x7528;<code>vue</code>&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#xFF0C;<code>vuex</code>&#x4F5C;&#x72B6;&#x6001;&#x7BA1;&#x7406;</p></li><li><p>&#x4F7F;&#x7528;<code>mui</code>&#x4F5C;&#x4E3A;UI&#x6846;&#x67B6;&#xFF0C;&#x65B9;&#x4FBF;&#x65E5;&#x540E;&#x6253;&#x5305;&#x6210;&#x624B;&#x673A;app</p></li><li><p>&#x4F7F;&#x7528;<code>vue-cli</code>&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#x5E76;&#x901A;&#x8FC7;<code>webpack</code>&#x8FDB;&#x884C;&#x6784;&#x5EFA;</p></li></ol><p>&#x9996;&#x5148;&#x5206;&#x6790;&#x7EA2;&#x5708;&#x4E2D;&#x7684;<code>vuex</code>&#x90E8;&#x5206;&#x3002;&#x5B83;&#x662F;&#x6574;&#x4E2A;APP&#x7684;&#x6838;&#x5FC3;&#xFF0C;&#x4E5F;&#x662F;&#x6240;&#x6709;&#x6570;&#x636E;&#x7684;&#x5904;&#x7406;&#x4E2D;&#x5FC3;&#x3002;</p><p>&#x5BA2;&#x6237;&#x7AEF;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x90FD;&#x662F;&#x5728;<code>action</code>&#x4E2D;&#x5B8C;&#x6210;&#x5BF9;&#x6D41;&#x5165;&#x6570;&#x636E;&#x7684;&#x5904;&#x7406;&#xFF08;&#x5982;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x7B49;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;<code>action</code>&#x89E6;&#x53D1;<code>mutation</code>&#x4FEE;&#x6539;<code>state</code>&#xFF0C;&#x540E;&#x7531;<code>state</code>&#x7ECF;&#x8FC7;<code>getter</code>&#x5206;&#x53D1;&#x7ED9;&#x5404;&#x7EC4;&#x4EF6;&#xFF0C;&#x6EE1;&#x8DB3;&#x201C;&#x5355;&#x9879;&#x6570;&#x636E;&#x6D41;&#x201D;&#x7684;&#x7279;&#x70B9;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x7B26;&#x5408;&#x5B98;&#x65B9;&#x63A8;&#x8350;&#x7684;&#x505A;&#x6CD5;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVvQhq" src="https://static.alili.tech/img/bVvQhq" alt="vuex.png" title="vuex.png" style="cursor:pointer"></span></p><p>&#x7406;&#x89E3;&#x5B8C;&#x6700;&#x91CD;&#x8981;&#x7684;<code>vuex</code>&#x4EE5;&#x540E;&#xFF0C;&#x5176;&#x4ED6;&#x90E8;&#x5206;&#x4E5F;&#x5C31;&#x987A;&#x5229;&#x6210;&#x7AE0;&#x4E86;&#x3002;&#x7BAD;&#x5934;&#x8868;&#x793A;&#x6570;&#x636E;&#x7684;&#x6D41;&#x52A8;&#xFF0C;<code>LocalStorage</code>&#x8D1F;&#x8D23;&#x50A8;&#x5B58;&#x6536;&#x85CF;&#x5939;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x65B9;&#x4FBF;&#x4E0B;&#x4E00;&#x6B21;&#x6253;&#x5F00;&#x5E94;&#x7528;&#x7684;&#x65F6;&#x5019;&#x5185;&#x5BB9;&#x4E0D;&#x4F1A;&#x4E22;&#x5931;&#xFF0C;node&#x670D;&#x52A1;&#x5668;&#x8D1F;&#x8D23;&#x6839;&#x636E;&#x5173;&#x952E;&#x5B57;&#x722C;&#x53D6;&#x641C;&#x72D7;API&#x63D0;&#x4F9B;&#x7684;&#x6570;&#x636E;&#x3002;</p><p>&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x7B80;&#x5355;&#xFF1F;&#x4E0B;&#x9762;&#x8BA9;&#x6211;&#x4EEC;&#x4E00;&#x8D77;&#x6765;&#x5F00;&#x59CB;coding&#x5427;&#xFF01;</p><h2 id="articleHeader3">&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;</h2><p><code>npm install vue-cli -g</code>&#x5B89;&#x88C5;&#x6700;&#x65B0;&#x7248;&#x7684;<code>vue-cli</code>&#xFF0C;&#x7136;&#x540E;<code>vue init webpack wechat-subscriptor</code>&#xFF0C;&#x6309;&#x63D0;&#x793A;&#x7ECF;&#x8FC7;&#x4E00;&#x6B65;&#x6B65;&#x8BBE;&#x7F6E;&#x5E76;&#x5B89;&#x88C5;&#x5B8C;&#x4F9D;&#x8D56;&#x5305;&#x4EE5;&#x540E;&#xFF0C;&#x8FDB;&#x5165;&#x9879;&#x76EE;&#x7684;&#x76EE;&#x5F55;&#x5E76;&#x7A0D;&#x4F5C;&#x6539;&#x52A8;&#xFF0C;&#x6700;&#x7EC8;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVyF62" src="https://static.alili.tech/img/bVyF62" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x5177;&#x4F53;&#x7684;&#x5185;&#x5BB9;&#x8BF7;&#x76F4;&#x63A5;&#x6D4F;&#x89C8;<a href="https://github.com/jrainlau/wechat-subscriptor" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;</a></p><h2 id="articleHeader4">&#x670D;&#x52A1;&#x5668;&amp;&#x722C;&#x866B;</h2><p>&#x8FDB;&#x5165;<code>/backend-server</code>&#x6587;&#x4EF6;&#x5939;&#x5E76;&#x65B0;&#x5EFA;&#x540D;&#x4E3A;<code>crawler-server.js</code>&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*** crawler-server.js ***/

&apos;use strict&apos;
const http = require(&apos;http&apos;)
const url = require(&apos;url&apos;)
const util = require(&apos;util&apos;)
const superagent = require(&apos;superagent&apos;)
const cheerio = require(&apos;cheerio&apos;)

const onRequest = (req, res) =&gt; {
    // CORS options
    res.writeHead(200, {&apos;Content-Type&apos;: &apos;text/plain&apos;, &apos;Access-Control-Allow-Origin&apos;: &apos;*&apos;})
    let keyWord = encodeURI(url.parse(req.url, true).query.query)
    // recieve keyword from the client side and use it to make requests
    if (keyWord) {
        let resultArr = []
        superagent.get(&apos;http://weixin.sogou.com/weixin?type=1&amp;query=&apos; + keyWord + &apos;&amp;ie=utf8&amp;_sug_=n&amp;_sug_type_=&apos;).end((err, response) =&gt; {
            if (err) console.log(err)
            let $ = cheerio.load(response.text)

            $(&apos;.mt7 .wx-rb&apos;).each((index, item) =&gt; {
                // define an object and update it
                // then push to the result array
                let resultObj = {
                    title: &apos;&apos;,
                    wxNum: &apos;&apos;,
                    link: &apos;&apos;,
                    pic: &apos;&apos;,
                }

                resultObj.title = $(item).find(&apos;h3&apos;).text()
                resultObj.wxNum = $(item).find(&apos;label&apos;).text()
                resultObj.link = $(item).attr(&apos;href&apos;)
                resultObj.pic = $(item).find(&apos;img&apos;).attr(&apos;src&apos;)
                resultArr.push(resultObj)
            })
            
            res.write(JSON.stringify(resultArr))
            res.end()
        })
    }
}

http.createServer(onRequest).listen(process.env.PORT || 8090)
console.log(&apos;Server Start!&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">/*** crawler-server.js ***/</span>
<span class="hljs-meta">
&apos;use strict&apos;</span>
<span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>)
<span class="hljs-keyword">const</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;url&apos;</span>)
<span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;util&apos;</span>)
<span class="hljs-keyword">const</span> superagent = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;superagent&apos;</span>)
<span class="hljs-keyword">const</span> cheerio = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;cheerio&apos;</span>)

<span class="hljs-keyword">const</span> onRequest = <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-comment">// CORS options</span>
    res.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;text/plain&apos;</span>, <span class="hljs-string">&apos;Access-Control-Allow-Origin&apos;</span>: <span class="hljs-string">&apos;*&apos;</span>})
    <span class="hljs-keyword">let</span> keyWord = <span class="hljs-built_in">encodeURI</span>(url.parse(req.url, <span class="hljs-literal">true</span>).query.query)
    <span class="hljs-comment">// recieve keyword from the client side and use it to make requests</span>
    <span class="hljs-keyword">if</span> (keyWord) {
        <span class="hljs-keyword">let</span> resultArr = []
        superagent.get(<span class="hljs-string">&apos;http://weixin.sogou.com/weixin?type=1&amp;query=&apos;</span> + keyWord + <span class="hljs-string">&apos;&amp;ie=utf8&amp;_sug_=n&amp;_sug_type_=&apos;</span>).end(<span class="hljs-function">(<span class="hljs-params">err, response</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span> (err) <span class="hljs-built_in">console</span>.log(err)
            <span class="hljs-keyword">let</span> $ = cheerio.load(response.text)

            $(<span class="hljs-string">&apos;.mt7 .wx-rb&apos;</span>).each(<span class="hljs-function">(<span class="hljs-params">index, item</span>) =&gt;</span> {
                <span class="hljs-comment">// define an object and update it</span>
                <span class="hljs-comment">// then push to the result array</span>
                <span class="hljs-keyword">let</span> resultObj = {
                    <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&apos;</span>,
                    <span class="hljs-attr">wxNum</span>: <span class="hljs-string">&apos;&apos;</span>,
                    <span class="hljs-attr">link</span>: <span class="hljs-string">&apos;&apos;</span>,
                    <span class="hljs-attr">pic</span>: <span class="hljs-string">&apos;&apos;</span>,
                }

                resultObj.title = $(item).find(<span class="hljs-string">&apos;h3&apos;</span>).text()
                resultObj.wxNum = $(item).find(<span class="hljs-string">&apos;label&apos;</span>).text()
                resultObj.link = $(item).attr(<span class="hljs-string">&apos;href&apos;</span>)
                resultObj.pic = $(item).find(<span class="hljs-string">&apos;img&apos;</span>).attr(<span class="hljs-string">&apos;src&apos;</span>)
                resultArr.push(resultObj)
            })
            
            res.write(<span class="hljs-built_in">JSON</span>.stringify(resultArr))
            res.end()
        })
    }
}

http.createServer(onRequest).listen(process.env.PORT || <span class="hljs-number">8090</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Server Start!&apos;</span>)</code></pre><p>&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x722C;&#x866B;&#xFF0C;&#x901A;&#x8FC7;&#x5BA2;&#x6237;&#x7AEF;&#x63D0;&#x4F9B;&#x7684;&#x5173;&#x952E;&#x8BCD;&#x5411;&#x641C;&#x72D7;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#xFF0C;&#x540E;&#x5229;&#x7528;<code>cheerio</code>&#x5206;&#x6790;&#x83B7;&#x53D6;&#x5173;&#x952E;&#x7684;&#x4FE1;&#x606F;&#x3002;&#x8FD9;&#x91CC;&#x8D34;&#x4E0A;&#x641C;&#x72D7;&#x516C;&#x4F17;&#x53F7;&#x641C;&#x7D22;&#x7684;&#x5730;&#x5740;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4EB2;&#x81EA;&#x8BD5;&#x4E00;&#x8BD5;&#xFF1A;<a href="http://weixin.sogou.com/" rel="nofollow noreferrer" target="_blank">http://weixin.sogou.com/</a></p><p>&#x5F53;&#x5F00;&#x542F;&#x670D;&#x52A1;&#x5668;&#x4EE5;&#x540E;&#xFF0C;&#x53EA;&#x8981;&#x5E26;&#x4E0A;&#x53C2;&#x6570;&#x8BF7;&#x6C42;<code>localhost:8090</code>&#x5373;&#x53EF;&#x83B7;&#x53D6;&#x5185;&#x5BB9;&#x3002;</p><h2 id="articleHeader5">&#x4F7F;&#x7528;<code>Vuex</code>&#x4F5C;&#x72B6;&#x6001;&#x7BA1;&#x7406;</h2><p>&#x5148;&#x8D34;&#x4E0A;<code>vuex</code>&#x5B98;&#x65B9;&#x6587;&#x6863;&#xFF1A;<a href="http://vuex.vuejs.org/en/index.html" rel="nofollow noreferrer" target="_blank">http://vuex.vuejs.org/en/index.html</a>&#xFF0C;&#x76F8;&#x4FE1;&#x6211;&#xFF0C;&#x4E0D;&#x8981;&#x770B;&#x4E2D;&#x6587;&#x7248;&#x7684;&#xFF0C;&#x4E0D;&#x7136;&#x4F60;&#x4F1A;&#x8E29;&#x5751;&#xFF0C;&#x82F1;&#x6587;&#x7248;&#x8DB3;&#x591F;&#x4E86;&#x3002;</p><p>&#x4ECE;&#x524D;&#x6587;&#x7684;&#x67B6;&#x6784;&#x56FE;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x6570;&#x636E;&#x6D41;&#x901A;&#x90FD;&#x662F;&#x901A;&#x8FC7;<code>vuex</code>&#x8FDB;&#x884C;&#xFF0C;&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x6587;&#x6863;&#x4E86;&#x89E3;&#x4E86;&#x6709;&#x5173;<code>vuex</code>&#x7684;&#x7528;&#x6CD5;&#x4EE5;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x8FDB;&#x5165;<code>/vuex</code>&#x6587;&#x4EF6;&#x5939;&#x6765;&#x6784;&#x5EFA;&#x6838;&#x5FC3;&#x7684;<code>store.js</code>&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*** store.js ***/

import Vue from &apos;vue&apos;
import Vuex from &apos;vuex&apos;

Vue.use(Vuex)

const state = {
  collectItems: [],
  searchResult: {}
}

localStorage.getItem(&quot;collectItems&quot;)?
 state.collectItems = localStorage.getItem(&quot;collectItems&quot;).split(&apos;,&apos;):
  false

const mutations = {
  SET_RESULT (state, result) {
    state.searchResult = result
  },
  COLLECT_IT (state, name) {
    state.collectItems.push(name)
    localStorage.setItem(&quot;collectItems&quot;, state.collectItems)
  },
  DELETE_COLLECTION (state, name) {
    state.collectItems.splice(state.collectItems.indexOf(name), 1)
    localStorage.setItem(&quot;collectItems&quot;, state.collectItems)
  }
}

export default new Vuex.Store({
  state,
  mutations
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>/*** store.js ***/

import Vue <span class="hljs-keyword">from</span> &apos;vue&apos;
import Vuex <span class="hljs-keyword">from</span> &apos;vuex&apos;

Vue.use(Vuex)

const <span class="hljs-keyword">state</span> = {
  collectItems: [],
  searchResult: {}
}

localStorage.getItem(<span class="hljs-string">&quot;collectItems&quot;</span>)?
 <span class="hljs-keyword">state</span>.collectItems = localStorage.getItem(<span class="hljs-string">&quot;collectItems&quot;</span>).split(&apos;,&apos;):
  false

const mutations = {
  SET_RESULT (<span class="hljs-keyword">state</span>, result) {
    <span class="hljs-keyword">state</span>.searchResult = result
  },
  COLLECT_IT (<span class="hljs-keyword">state</span>, name) {
    <span class="hljs-keyword">state</span>.collectItems.push(name)
    localStorage.<span class="hljs-built_in">set</span>Item(<span class="hljs-string">&quot;collectItems&quot;</span>, <span class="hljs-keyword">state</span>.collectItems)
  },
  DELETE_COLLECTION (<span class="hljs-keyword">state</span>, name) {
    <span class="hljs-keyword">state</span>.collectItems.splice(<span class="hljs-keyword">state</span>.collectItems.indexOf(name), <span class="hljs-number">1</span>)
    localStorage.<span class="hljs-built_in">set</span>Item(<span class="hljs-string">&quot;collectItems&quot;</span>, <span class="hljs-keyword">state</span>.collectItems)
  }
}

export <span class="hljs-keyword">default</span> new Vuex.Store({
  <span class="hljs-keyword">state</span>,
  mutations
})</code></pre><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5C06;&#x5BF9;&#x5F53;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x91CD;&#x70B9;&#x5206;&#x6790;&#x3002;</p><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;<code>state</code>&#x5BF9;&#x8C61;&#xFF0C;&#x91CC;&#x9762;&#x7684;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x5BF9;&#x5E94;&#x7740;&#x6536;&#x85CF;&#x5939;&#x5185;&#x5BB9;&#xFF0C;&#x641C;&#x7D22;&#x7ED3;&#x679C;&#x3002;&#x6362;&#x53E5;&#x8BDD;&#x8BF4;&#xFF0C;&#x6574;&#x4E2A;APP&#x7684;&#x6570;&#x636E;&#x5C31;&#x662F;&#x5B58;&#x653E;&#x5728;<code>state</code>&#x5BF9;&#x8C61;&#x91CC;&#xFF0C;&#x968F;&#x53D6;&#x968F;&#x7528;&#x3002;</p><p>&#x63A5;&#x7740;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;<code>mutations</code>&#x5BF9;&#x8C61;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;<code>mutations</code>&#x7406;&#x89E3;&#x4E3A;&#x201C;&#x7528;&#x4E8E;&#x6539;&#x53D8;<code>state</code>&#x72B6;&#x6001;&#x7684;&#x4E00;&#x7CFB;&#x5217;&#x65B9;&#x6CD5;&#x201D;&#x3002;&#x5728;<code>vuex</code>&#x7684;&#x6982;&#x5FF5;&#x91CC;&#xFF0C;<code>state</code>&#x4EC5;&#x80FD;&#x901A;&#x8FC7;<code>mutation</code>&#x4FEE;&#x6539;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x597D;&#x5904;&#x662F;&#x80FD;&#x591F;&#x66F4;&#x76F4;&#x89C2;&#x6E05;&#x6670;&#x5730;&#x96C6;&#x4E2D;&#x7BA1;&#x7406;&#x5E94;&#x7528;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x628A;&#x6570;&#x636E;&#x6254;&#x5F97;&#x5230;&#x5904;&#x90FD;&#x662F;&#x3002;</p><p>&#x901A;&#x8FC7;&#x4EE3;&#x7801;&#x4E0D;&#x96BE;&#x770B;&#x51FA;&#xFF0C;&#x4E09;&#x4E2A;<code>mutation</code>&#x7684;&#x4F5C;&#x7528;&#x5206;&#x522B;&#x662F;&#xFF1A;</p><ul><li><p><code>SET_RESULT</code>&#xFF1A;&#x628A;&#x641C;&#x7D22;&#x7ED3;&#x679C;&#x5B58;&#x5165;<code>state</code></p></li><li><p><code>COLLECT_IT</code>&#xFF1A;&#x6DFB;&#x52A0;&#x5230;&#x6536;&#x85CF;&#x5939;&#x64CD;&#x4F5C;&#xFF08;&#x5305;&#x62EC;<code>localstorage</code>&#xFF09;</p></li><li><p><code>DELETE_IT</code>&#xFF1A;&#x4ECE;&#x6536;&#x85CF;&#x5939;&#x79FB;&#x9664;&#x64CD;&#x4F5C;&#xFF08;&#x5305;&#x62EC;<code>localstorage</code>&#xFF09;</p></li></ul><h2 id="articleHeader6">&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x5904;&#x7406;</h2><p>&#x6211;&#x4EEC;&#x7684;APP&#x4E00;&#x5171;&#x6709;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;<code>SearchBar.vue</code>&#x548C;<code>SearchResult.vue</code>&#xFF0C;&#x5206;&#x522B;&#x5BF9;&#x5E94;&#x7740;&#x641C;&#x7D22;&#x90E8;&#x5206;&#x7EC4;&#x4EF6;&#x548C;&#x7ED3;&#x679C;&#x90E8;&#x5206;&#x7EC4;&#x4EF6;&#x3002;&#x5176;&#x4E2D;&#x641C;&#x7D22;&#x90E8;&#x5206;&#x7EC4;&#x4EF6;&#x5305;&#x542B;&#x7740;&#x6536;&#x85CF;&#x5939;&#x90E8;&#x5206;&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x6709;&#x4E09;&#x4E2A;&#x90E8;&#x5206;&#x3002;</p><h4>&#x641C;&#x7D22;&#x90E8;&#x5206;&#x7EC4;&#x4EF6;<code>SearchBar.vue</code></h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*** SearchBar.vue ***/


vuex: {
  getters: {
    collectItem(state) {
      return state.collectItems
    }
  },
  actions: {
    deleteCollection: ({ dispatch }, name) =&gt; {
      dispatch(&apos;DELETE_COLLECTION&apos;, name)
    },
    searchFun: ({ dispatch }, keyword) =&gt; {
      $.get(&apos;http://localhost:8090&apos;, { query: keyword }, (data) =&gt; {
        dispatch(&apos;SET_RESULT&apos;, JSON.parse(data))
      })
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">/*** SearchBar.vue ***/</span>


vuex: {
  getters: {
    collectItem(state) {
      <span class="hljs-keyword">return</span> state.collectItems
    }
  },
  actions: {
    deleteCollection: <span class="hljs-function">(<span class="hljs-params">{ dispatch }, name</span>) =&gt;</span> {
      dispatch(<span class="hljs-string">&apos;DELETE_COLLECTION&apos;</span>, name)
    },
    searchFun: <span class="hljs-function">(<span class="hljs-params">{ dispatch }, keyword</span>) =&gt;</span> {
      $.<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;http://localhost:8090&apos;</span>, { query: keyword }, <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
        dispatch(<span class="hljs-string">&apos;SET_RESULT&apos;</span>, <span class="hljs-built_in">JSON</span>.parse(data))
      })
    }
  }
}</code></pre><p>&#x4EE3;&#x7801;&#x6709;&#x70B9;&#x957F;&#xFF0C;&#x8FD9;&#x91CC;&#x4EC5;&#x91CD;&#x70B9;&#x4ECB;&#x7ECD;<code>vuex</code>&#x90E8;&#x5206;&#xFF0C;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x53C2;&#x8003;<a href="https://github.com/jrainlau/wechat-subscriptor" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;</a>&#x3002;</p><ul><li><p><code>getters</code>&#x83B7;&#x53D6;<code>store</code>&#x5F53;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x4F5C;&#x4E88;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;</p></li><li><p><code>actions</code>&#x7684;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x8D1F;&#x8D23;&#x628A;&#x6570;&#x636E;&#x5206;&#x53D1;&#x5230;<code>store</code>&#x4E2D;&#x4F9B;<code>mutation</code>&#x4F7F;&#x7528;</p></li></ul><p>&#x770B;&#x5B98;&#x65B9;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x5411;<code>action</code>&#x4F20;&#x53C2;&#x4F3C;&#x4E4E;&#x5F88;&#x590D;&#x6742;&#xFF0C;&#x5176;&#x5B9E;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>methods</code>&#x6765;&#x5904;&#x7406;&#x53C2;&#x6570;&#xFF0C;&#x5728;&#x89E6;&#x53D1;<code>actions</code>&#x7684;&#x540C;&#x65F6;&#x628A;&#x53C2;&#x6570;&#x4F20;&#x8FDB;&#x53BB;&#x3002;</p><h4>&#x7ED3;&#x679C;&#x90E8;&#x5206;&#x7EC4;&#x4EF6;<code>SearchResult.vue</code></h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*** SearchResult.vue ***/

vuex: {
  getters: {
    wordValue(state) {
      return state.keyword
    },
    collectItems(state) {
      return state.collectItems
    },
    searchResult(state) {
      return state.searchResult
    }
  },
  actions: {
    collectIt: ({ dispatch }, name, collectArr) =&gt; {
      for(let item of collectArr) {
        if(item == name) return false
      }
      dispatch(&apos;COLLECT_IT&apos;, name)
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>/*** SearchResult.vue ***/

vuex: {
  getters: {
    wordValue(<span class="hljs-keyword">state</span>) {
      return <span class="hljs-keyword">state</span>.keyword
    },
    collectItems(<span class="hljs-keyword">state</span>) {
      return <span class="hljs-keyword">state</span>.collectItems
    },
    searchResult(<span class="hljs-keyword">state</span>) {
      return <span class="hljs-keyword">state</span>.searchResult
    }
  },
  actions: {
    collectIt: ({ dispatch }, name, collectArr) =&gt; {
      <span class="hljs-keyword">for</span>(let item of collectArr) {
        if(item == name) return false
      }
      dispatch(&apos;COLLECT_IT&apos;, name)
    }
  }
}</code></pre><p>&#x7ED3;&#x679C;&#x90E8;&#x5206;&#x4E3B;&#x8981;&#x5728;&#x4E8E;&#x5C55;&#x793A;&#xFF0C;&#x9700;&#x8981;&#x89E6;&#x53D1;<code>action</code>&#x7684;&#x5730;&#x65B9;&#x4EC5;&#x4EC5;&#x662F;&#x6DFB;&#x52A0;&#x5230;&#x6536;&#x85CF;&#x5939;&#x8FD9;&#x4E00;&#x64CD;&#x4F5C;&#x3002;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5730;&#x65B9;&#x662F;&#x5E94;&#x5F53;&#x907F;&#x514D;&#x91CD;&#x590D;&#x6DFB;&#x52A0;&#xFF0C;&#x6240;&#x4EE5;&#x4F7F;&#x7528;&#x4E86;<code>for...of</code>&#x5FAA;&#x73AF;&#xFF0C;&#x5F53;&#x6570;&#x7EC4;&#x4E2D;&#x5DF2;&#x6709;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x4E0D;&#x518D;&#x6DFB;&#x52A0;&#x4E86;&#x3002;</p><h2 id="articleHeader7">&#x5C3E;&#x58F0;</h2><p>&#x5173;&#x952E;&#x7684;&#x903B;&#x8F91;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x5206;&#x6790;&#x5B8C;&#x6BD5;&#xFF0C;&#x8FD9;&#x4E2A;APP&#x4E5F;&#x5C31;&#x8FD9;&#x4E48;&#x4E00;&#x56DE;&#x4E8B;&#x513F;&#xFF0C;UI&#x90E8;&#x5206;&#x5C31;&#x4E0D;&#x7EC6;&#x8BF4;&#x4E86;&#xFF0C;&#x770B;&#x770B;&#x9879;&#x76EE;&#x6E90;&#x7801;&#x6216;&#x8005;&#x4F60;&#x81EA;&#x5DF1;DIY&#x5C31;&#x53EF;&#x4EE5;&#x3002;&#x81F3;&#x4E8E;&#x6253;&#x5305;&#x6210;APP&#xFF0C;&#x9996;&#x5148;&#x4F60;&#x8981;&#x4E0B;&#x8F7D;HBuilder&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x5B83;&#x76F4;&#x63A5;&#x6253;&#x5305;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x914D;&#x5957;&#x4F7F;&#x7528;<code>mui</code>&#x80FD;&#x591F;&#x4F53;&#x9A8C;&#x66F4;&#x597D;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x4E0D;&#x77E5;&#x9053;&#x4E3A;&#x4EC0;&#x4E48;&#x90A3;&#x4E48;&#x591A;&#x4EBA;&#x9ED1;&#x5B83;&#x3002;</p><p>&#x641C;&#x72D7;&#x63D0;&#x4F9B;&#x7684;API&#x5F88;&#x5F3A;&#x5927;&#xFF0C;&#x4F46;&#x662F;&#x63D0;&#x9192;&#x4E00;&#x4E0B;&#xFF0C;&#x5343;&#x4E07;&#x4E0D;&#x8981;&#x64CD;&#x4F5C;&#x592A;&#x8FC7;&#x9891;&#x7E41;&#xFF0C;&#x4E0D;&#x7136;&#x4F60;&#x7684;IP&#x4F1A;&#x88AB;&#x5B83;&#x5C01;&#x6389;&#xFF0C;&#x6211;&#x7684;&#x5DF2;&#x7ECF;&#x88AB;&#x5C01;&#x4E86;&#x2026;&#x2026;</p><p><code>Weex</code>&#x5DF2;&#x7ECF;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x901A;&#x8FC7;&#x5B83;&#x53EF;&#x4EE5;&#x6784;&#x5EFA;Native&#x5E94;&#x7528;&#xFF0C;&#x60F3;&#x60F3;&#x4E5F;&#x662F;&#x6FC0;&#x52A8;&#x554A;&#xFF0C;&#x5F85;&#x5FC3;&#x8840;&#x6765;&#x6F6E;&#x5C31;&#x628A;&#x672C;&#x6587;&#x7684;&#x9879;&#x76EE;&#x505A;&#x6210;<code>Weex</code>&#x7248;&#x672C;&#x7684;&#x73A9;&#x73A9;&#x2026;&#x2026;</p><p>&#x6700;&#x540E;&#x7684;&#x6700;&#x540E;&#xFF0C;&#x611F;&#x8C22;&#x4F60;&#x7684;&#x9605;&#x8BFB;&#xFF0C;&#x5982;&#x679C;&#x89C9;&#x5F97;&#x6211;&#x7684;&#x6587;&#x7AE0;&#x4E0D;&#x9519;&#xFF0C;&#x6B22;&#x8FCE;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x4E13;&#x680F;&#xFF0C;&#x4E0B;&#x6B21;&#x89C1;&#xFF01;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一步一步教你用 Vue.js + Vuex 制作专门收藏微信公众号的 app

## 原文链接
[https://segmentfault.com/a/1190000005844155](https://segmentfault.com/a/1190000005844155)

