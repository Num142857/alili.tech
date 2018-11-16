---
title: node中的密码安全
hidden: true
categories: [reprint]
slug: 3426c7b1
date: 2018-11-09 02:30:06
---

{{< raw >}}
<blockquote>&#x672C;&#x6587;&#x5C06;&#x8BB2;&#x89E3;&#x5BF9;&#x4E8E;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x524D;&#x7AEF;&#x6CE8;&#x518C;&#x6216;&#x767B;&#x5F55;&#x65F6;&#x5982;&#x4F55;&#x4FDD;&#x8BC1;&#x7528;&#x6237;&#x5BC6;&#x7801;&#x5B89;&#x5168;&#x4F20;&#x8F93;&#x5230;server&#x7AEF;&#xFF0C;&#x6700;&#x7EC8;&#x5B58;&#x5165;&#x6570;&#x636E;&#x5E93;</blockquote><h2 id="articleHeader0">&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;&#x52A0;&#x5BC6;</h2><p>&#x52A0;&#x5BC6;&#x771F;&#x7684;&#x6709;&#x5FC5;&#x8981;&#x5417;&#xFF1F;<br>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x4E00;&#x770B;&#x524D;&#x7AEF;&#x53D1;&#x8D77;&#x7684;ajax&#x8BF7;&#x6C42;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x5BF9;&#x5BC6;&#x7801;&#x8FDB;&#x884C;&#x52A0;&#x5BC6;&#xFF0C;&#x4F1A;&#x53D1;&#x751F;&#x4EC0;&#x4E48;&#x3002;<br>f12&#x6253;&#x5F00;chrome&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;&#xFF0C;&#x627E;&#x5230;&#x8BF7;&#x6C42;&#xFF0C;&#x67E5;&#x770B;&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbg0rg?w=237&amp;h=76" src="https://static.alili.tech/img/bVbg0rg?w=237&amp;h=76" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5982;&#x679C;&#x4F60;&#x7684;&#x534F;&#x8BAE;&#x662F;http&#xFF0C;&#x90A3;&#x4E48;&#x524D;&#x7AEF;&#x4F20;&#x7ED9;&#x540E;&#x7AEF;&#x7684;&#x5BC6;&#x7801;&#x5DEE;&#x4E0D;&#x591A;&#x662F;&#x88F8;&#x5954;&#x72B6;&#x6001;&#xFF0C;&#x56E0;&#x4E3A;http&#x4F20;&#x8F93;&#x7684;&#x662F;&#x660E;&#x6587;&#xFF0C;&#x5F88;&#x53EF;&#x80FD;&#x5728;&#x4F20;&#x8F93;&#x8FC7;&#x7A0B;&#x4E2D;&#x88AB;&#x7A83;&#x542C;&#xFF0C;&#x4F2A;&#x88C5;&#x6216;&#x7BE1;&#x6539;&#x3002;<br>&#x90A3;&#x4E48;&#xFF0C;&#x5F04;&#x4E2A;https&#x4E0D;&#x5C31;&#x597D;&#x4E86;&#x5417;&#xFF1F;<br>https&#x7684;&#x786E;&#x80FD;&#x591F;&#x6781;&#x5927;&#x589E;&#x52A0;&#x7F51;&#x7AD9;&#x7684;&#x5B89;&#x5168;&#x6027;&#xFF0C;&#x4F46;&#x662F;&#x7528;https&#x5F97;&#x5148;&#x4E70;&#x8BC1;&#x4E66;&#xFF08;&#x4E5F;&#x6709;&#x514D;&#x8D39;&#x7684;&#xFF09;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E2A;&#x4EBA;&#x7AD9;&#x70B9;&#x6216;&#x8005;&#x4E0D;&#x60F3;&#x5F04;&#x8BC1;&#x4E66;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x90A3;&#x6700;&#x8D77;&#x7801;&#x4E5F;&#x5F97;&#x5BF9;&#x7528;&#x6237;&#x5BC6;&#x7801;&#x8FDB;&#x884C;&#x4E00;&#x4E0B;&#x52A0;&#x5BC6;&#x5427;&#x3002;</p><h2 id="articleHeader1">&#x6D41;&#x7A0B;&#x56FE;</h2><p>&#x5148;&#x770B;&#x4E00;&#x4E0B;&#x5927;&#x4F53;&#x6D41;&#x7A0B;&#x56FE;&#xFF0C;&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x7528;&#x5DE5;&#x5177;&#x751F;&#x6210;&#x516C;&#x94A5;&#x548C;&#x79C1;&#x94A5;&#xFF0C;&#x5C06;&#x5176;&#x653E;&#x5165;server&#x7AEF;&#xFF0C;&#x524D;&#x7AEF;&#x53D1;&#x8D77;&#x8BF7;&#x6C42;&#x83B7;&#x53D6;&#x516C;&#x94A5;&#xFF0C;&#x62FF;&#x5230;&#x516C;&#x94A5;&#x540E;&#x5BF9;&#x5BC6;&#x7801;&#x8FDB;&#x884C;&#x52A0;&#x5BC6;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x52A0;&#x5BC6;&#x540E;&#x7684;&#x5BC6;&#x7801;&#x53D1;&#x9001;&#x5230;server&#x7AEF;&#xFF0C;server&#x7AEF;&#x5C06;&#x7528;&#x5BC6;&#x94A5;&#x89E3;&#x5BC6;&#xFF0C;&#x6700;&#x540E;&#x518D;&#x7528;sha1&#x52A0;&#x5BC6;&#x5BC6;&#x7801;&#xFF0C;&#x5B58;&#x5165;&#x6570;&#x636E;&#x5E93;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbg0Ip?w=805&amp;h=236" src="https://static.alili.tech/img/bVbg0Ip?w=805&amp;h=236" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">&#x751F;&#x6210;RSA&#x516C;&#x94A5;&#x548C;&#x5BC6;&#x94A5;</h2><p>&#x65E2;&#x7136;&#x9009;&#x62E9;RSA&#x52A0;&#x5BC6;&#xFF0C;&#x90A3;&#x4E48;&#x9996;&#x5148;&#x5F97;&#x6709;&#x5DE5;&#x5177;&#x554A;&#xFF0C;&#x5E38;&#x89C1;&#x7684;&#x6709;<a href="https://www.openssl.org/" rel="nofollow noreferrer" target="_blank">openssl</a>&#xFF0C;&#x4F46;&#x8FD9;&#x91CC;&#x4E0D;&#x4ECB;&#x7ECD;&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x8BF7;&#x81EA;&#x884C;&#x67E5;&#x9605;&#xFF0C;&#x5BF9;&#x4E8E;node&#x800C;&#x8A00;&#xFF0C;&#x6211;&#x4ECB;&#x7ECD;&#x4E00;&#x4E2A;&#x4E0D;&#x9519;&#x7684;&#x5E93;<a href="https://github.com/rzcoder/node-rsa" rel="nofollow noreferrer" target="_blank">Node-RSA</a>&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x7528;&#x5B83;&#x6765;&#x751F;&#x6210;RSA&#x516C;&#x94A5;&#x548C;&#x5BC6;&#x94A5;&#x3002;</p><p>RSA&#x662F;&#x4E00;&#x79CD;&#x975E;&#x5BF9;&#x79F0;&#x52A0;&#x5BC6;&#x7B97;&#x6CD5;&#xFF0C;&#x5373;&#x7531;&#x4E00;&#x4E2A;<code>&#x5BC6;&#x94A5;</code>&#x548C;&#x4E00;&#x4E2A;<code>&#x516C;&#x94A5;</code>&#x6784;&#x6210;&#x7684;&#x5BC6;&#x94A5;&#x5BF9;&#xFF0C;&#x901A;&#x8FC7;&#x5BC6;&#x94A5;&#x52A0;&#x5BC6;&#xFF0C;&#x516C;&#x94A5;&#x89E3;&#x5BC6;&#xFF0C;&#x6216;&#x8005;&#x901A;&#x8FC7;&#x516C;&#x94A5;&#x52A0;&#x5BC6;&#xFF0C;&#x5BC6;&#x94A5;&#x89E3;&#x5BC6;&#x3002;&#x5176;&#x4E2D;&#xFF0C;&#x516C;&#x94A5;&#x53EF;&#x4EE5;&#x516C;&#x5F00;&#xFF0C;<code>&#x5BC6;&#x94A5;&#x5FC5;&#x987B;&#x4FDD;&#x5BC6;</code>&#x3002;</p><p>&#x7528;Node-RSA&#x751F;&#x6210;&#x7684;&#x516C;&#x94A5;&#x548C;&#x5BC6;&#x94A5;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const NodeRSA = require(&apos;node-rsa&apos;)
const fs = require(&apos;fs&apos;)

// Generate new 512bit-length key
var key = new NodeRSA({b: 512})
key.setOptions({encryptionScheme: &apos;pkcs1&apos;})

var privatePem = key.exportKey(&apos;pkcs1-private-pem&apos;)
var publicDer = key.exportKey(&apos;pkcs8-public-der&apos;)
var publicDerStr = publicDer.toString(&apos;base64&apos;)

// &#x4FDD;&#x5B58;&#x8FD4;&#x56DE;&#x5230;&#x524D;&#x7AEF;&#x7684;&#x516C;&#x94A5;
fs.writeFile(&apos;./pem/public.pem&apos;, publicDerStr, (err) =&gt; {
  if (err) throw err
  console.log(&apos;&#x516C;&#x94A5;&#x5DF2;&#x4FDD;&#x5B58;&#xFF01;&apos;)
})
// &#x4FDD;&#x5B58;&#x79C1;&#x94A5;
fs.writeFile(&apos;./pem/private.pem&apos;, privatePem, (err) =&gt; {
  if (err) throw err
  console.log(&apos;&#x79C1;&#x94A5;&#x5DF2;&#x4FDD;&#x5B58;&#xFF01;&apos;)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> NodeRSA = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;node-rsa&apos;</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)

<span class="hljs-comment">// Generate new 512bit-length key</span>
<span class="hljs-keyword">var</span> key = <span class="hljs-keyword">new</span> NodeRSA({b: <span class="hljs-number">512</span>})
key.setOptions({encryptionScheme: <span class="hljs-string">&apos;pkcs1&apos;</span>})

<span class="hljs-keyword">var</span> privatePem = key.exportKey(<span class="hljs-string">&apos;pkcs1-private-pem&apos;</span>)
<span class="hljs-keyword">var</span> publicDer = key.exportKey(<span class="hljs-string">&apos;pkcs8-public-der&apos;</span>)
<span class="hljs-keyword">var</span> publicDerStr = publicDer.toString(<span class="hljs-string">&apos;base64&apos;</span>)

<span class="hljs-comment">// &#x4FDD;&#x5B58;&#x8FD4;&#x56DE;&#x5230;&#x524D;&#x7AEF;&#x7684;&#x516C;&#x94A5;</span>
fs.writeFile(<span class="hljs-string">&apos;./pem/public.pem&apos;</span>, publicDerStr, <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x516C;&#x94A5;&#x5DF2;&#x4FDD;&#x5B58;&#xFF01;&apos;</span>)
})
<span class="hljs-comment">// &#x4FDD;&#x5B58;&#x79C1;&#x94A5;</span>
fs.writeFile(<span class="hljs-string">&apos;./pem/private.pem&apos;</span>, privatePem, <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x79C1;&#x94A5;&#x5DF2;&#x4FDD;&#x5B58;&#xFF01;&apos;</span>)
})</code></pre><p>&#x6267;&#x884C;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x5F97;&#x5230;&#x516C;&#x94A5;&#x548C;&#x79C1;&#x94A5;&#x6587;&#x4EF6;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbg0Ks?w=174&amp;h=70" src="https://static.alili.tech/img/bVbg0Ks?w=174&amp;h=70" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6CE8;&#x610F;&#xFF1A;server&#x7AEF;&#x7684;&#x516C;&#x94A5;&#x548C;&#x5BC6;&#x94A5;&#x5E94;&#x8BE5;&#x9694;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x6362;&#x4E00;&#x6B21;&#xFF0C;&#x6BD4;&#x5982;&#x6BCF;&#x6B21;&#x670D;&#x52A1;&#x5668;&#x91CD;&#x542F;&#x65F6;&#x3002;</p><h2 id="articleHeader3">&#x524D;&#x7AEF;&#x52A0;&#x5BC6;</h2><p>&#x6838;&#x5FC3;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;script src=&quot;https://cdn.bootcss.com/jsencrypt/2.3.1/jsencrypt.min.js&quot;&gt;&lt;/script&gt;
  &lt;script src=&quot;https://cdn.bootcss.com/axios/0.18.0/axios.min.js&quot;&gt;&lt;/script&gt;
  &lt;script&gt;
    function reg() {
      axios({
        method: &apos;post&apos;,
        url: &apos;http://127.0.0.1:3000/getPublicKey&apos;
      })
        .then(res =&gt; {
          let result = res.data

          // &#x4ECE;&#x540E;&#x7AEF;&#x83B7;&#x53D6;&#x7684;&#x516C;&#x94A5; String
          var publicPem = result
          // &#x7528;JSEncrypt&#x5BF9;&#x5BC6;&#x7801;&#x8FDB;&#x884C;&#x52A0;&#x5BC6;
          var encrypt = new JSEncrypt()
          encrypt.setPublicKey(publicPem)
          var password = &apos;abc123&apos;
          password = encrypt.encrypt(password)

          axios({
            method: &apos;post&apos;,
            url: &apos;http://127.0.0.1:3000/reg&apos;,
            data: {
              password: password
            }
          })
            .then(res =&gt; {
              let result = res.data
              console.log(result)
            })
            .catch(error =&gt; {
              console.log(error)
            })
        })
    }
  &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.bootcss.com/jsencrypt/2.3.1/jsencrypt.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.bootcss.com/axios/0.18.0/axios.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reg</span>(<span class="hljs-params"></span>) </span>{
      axios({
        <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;post&apos;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://127.0.0.1:3000/getPublicKey&apos;</span>
      })
        .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          <span class="hljs-keyword">let</span> result = res.data

          <span class="hljs-comment">// &#x4ECE;&#x540E;&#x7AEF;&#x83B7;&#x53D6;&#x7684;&#x516C;&#x94A5; String</span>
          <span class="hljs-keyword">var</span> publicPem = result
          <span class="hljs-comment">// &#x7528;JSEncrypt&#x5BF9;&#x5BC6;&#x7801;&#x8FDB;&#x884C;&#x52A0;&#x5BC6;</span>
          <span class="hljs-keyword">var</span> encrypt = <span class="hljs-keyword">new</span> JSEncrypt()
          encrypt.setPublicKey(publicPem)
          <span class="hljs-keyword">var</span> password = <span class="hljs-string">&apos;abc123&apos;</span>
          password = encrypt.encrypt(password)

          axios({
            <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;post&apos;</span>,
            <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://127.0.0.1:3000/reg&apos;</span>,
            <span class="hljs-attr">data</span>: {
              <span class="hljs-attr">password</span>: password
            }
          })
            .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
              <span class="hljs-keyword">let</span> result = res.data
              <span class="hljs-built_in">console</span>.log(result)
            })
            .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
              <span class="hljs-built_in">console</span>.log(error)
            })
        })
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x524D;&#x7AEF;&#x5C06;&#x7528;&#x5230;<a href="https://github.com/travist/jsencrypt" rel="nofollow noreferrer" target="_blank">jsencrypt</a>&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x52A0;&#x5BC6;&#xFF0C;&#x8BE6;&#x7EC6;&#x7528;&#x6CD5;&#x8BF7;&#x53C2;&#x8003;github&#x3002;</p><h2 id="articleHeader4">&#x540E;&#x7AEF;&#x89E3;&#x5BC6;</h2><p>&#x540E;&#x7AEF;&#x6838;&#x5FC3;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require(&apos;express&apos;);
const crypto = require(&apos;crypto&apos;);
const fs = require(&apos;fs&apos;);

var privatePem = fs.readFileSync(&apos;./pem/private.pem&apos;);

var app = express();
app.use(express.json());

// CORS &#x6CE8;&#x610F;&#xFF1A;&#x8981;&#x653E;&#x5728;&#x5904;&#x7406;&#x8DEF;&#x7531;&#x524D;
function crossDomain(req, res, next) {
  res.header(&apos;Access-Control-Allow-Origin&apos;, &apos;*&apos;);
  res.header(&apos;Access-Control-Allow-Headers&apos;, &apos;Content-Type&apos;);

  next();
}
app.use(crossDomain)

app.use(function (req, res, next) {
  // &#x4E0D;&#x52A0;&#x4F1A;&#x62A5;&#x9519;
  if (req.method === &apos;OPTIONS&apos;) {
    res.end(&apos;ok&apos;)
    return
  }

  switch (req.url) {
    case &apos;/getPublicKey&apos;:
      let publicPem = fs.readFileSync(&apos;./pem/public.pem&apos;, &apos;utf-8&apos;)
      res.json(publicPem)
      break
    case &apos;/reg&apos;:
      // &#x89E3;&#x5BC6;
      var privateKey = fs.readFileSync(&apos;./pem/private.pem&apos;, &apos;utf8&apos;)
      var password = req.body.password
      var buffer2 = Buffer.from(password, &apos;base64&apos;)
      var decrypted = crypto.privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_PADDING // &#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684;&#x5E38;&#x91CF;&#x503C;&#x8981;&#x8BBE;&#x7F6E;&#x4E3A;RSA_PKCS1_PADDING
        },
        buffer2
      )
      console.log(decrypted.toString(&apos;utf8&apos;))

      // sha1&#x52A0;&#x5BC6;
      var sha1 = crypto.createHash(&apos;sha1&apos;);
      var password = sha1.update(decrypted).digest(&apos;hex&apos;);
      console.log(&apos;&#x8F93;&#x5165;&#x5230;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x7684;&#x5BC6;&#x7801;&#x662F;: &apos;, password)
      // &#x5B58;&#x5165;&#x6570;&#x636E;&#x5E93;&#x4E2D;
      // store to db...
      res.end(&apos;reg ok&apos;)
      break
  }
})

app.listen(3000, &apos;127.0.0.1&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs zephir"><code><span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">const</span> crypto = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;crypto&apos;</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);

<span class="hljs-keyword">var</span> privatePem = fs.readFileSync(<span class="hljs-string">&apos;./pem/private.pem&apos;</span>);

<span class="hljs-keyword">var</span> app = express();
app.<span class="hljs-keyword">use</span>(express.json());

<span class="hljs-comment">// CORS &#x6CE8;&#x610F;&#xFF1A;&#x8981;&#x653E;&#x5728;&#x5904;&#x7406;&#x8DEF;&#x7531;&#x524D;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">crossDomain</span><span class="hljs-params">(req, res, next)</span> </span>{
  res.header(<span class="hljs-string">&apos;Access-Control-Allow-Origin&apos;</span>, <span class="hljs-string">&apos;*&apos;</span>);
  res.header(<span class="hljs-string">&apos;Access-Control-Allow-Headers&apos;</span>, <span class="hljs-string">&apos;Content-Type&apos;</span>);

  next();
}
app.<span class="hljs-keyword">use</span>(crossDomain)

app.<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res, next)</span> </span>{
  <span class="hljs-comment">// &#x4E0D;&#x52A0;&#x4F1A;&#x62A5;&#x9519;</span>
  <span class="hljs-keyword">if</span> (req.method === <span class="hljs-string">&apos;OPTIONS&apos;</span>) {
    res.end(<span class="hljs-string">&apos;ok&apos;</span>)
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-keyword">switch</span> (req.url) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;/getPublicKey&apos;</span>:
      <span class="hljs-keyword">let</span> publicPem = fs.readFileSync(<span class="hljs-string">&apos;./pem/public.pem&apos;</span>, <span class="hljs-string">&apos;utf-8&apos;</span>)
      res.json(publicPem)
      <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;/reg&apos;</span>:
      <span class="hljs-comment">// &#x89E3;&#x5BC6;</span>
      <span class="hljs-keyword">var</span> privateKey = fs.readFileSync(<span class="hljs-string">&apos;./pem/private.pem&apos;</span>, <span class="hljs-string">&apos;utf8&apos;</span>)
      <span class="hljs-keyword">var</span> password = req.body.password
      <span class="hljs-keyword">var</span> buffer2 = Buffer.from(password, <span class="hljs-string">&apos;base64&apos;</span>)
      <span class="hljs-keyword">var</span> decrypted = crypto.privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_PADDING <span class="hljs-comment">// &#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684;&#x5E38;&#x91CF;&#x503C;&#x8981;&#x8BBE;&#x7F6E;&#x4E3A;RSA_PKCS1_PADDING</span>
        },
        buffer2
      )
      console.log(decrypted.toString(<span class="hljs-string">&apos;utf8&apos;</span>))

      <span class="hljs-comment">// sha1&#x52A0;&#x5BC6;</span>
      <span class="hljs-keyword">var</span> sha1 = crypto.createHash(<span class="hljs-string">&apos;sha1&apos;</span>);
      <span class="hljs-keyword">var</span> password = sha1.update(decrypted).digest(<span class="hljs-string">&apos;hex&apos;</span>);
      console.log(<span class="hljs-string">&apos;&#x8F93;&#x5165;&#x5230;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x7684;&#x5BC6;&#x7801;&#x662F;: &apos;</span>, password)
      <span class="hljs-comment">// &#x5B58;&#x5165;&#x6570;&#x636E;&#x5E93;&#x4E2D;</span>
      <span class="hljs-comment">// store to db...</span>
      res.end(<span class="hljs-string">&apos;reg ok&apos;</span>)
      <span class="hljs-keyword">break</span>
  }
})

app.listen(<span class="hljs-number">3000</span>, <span class="hljs-string">&apos;127.0.0.1&apos;</span>)</code></pre><p>&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x662F;&#x7528;node&#x81EA;&#x5E26;&#x6A21;&#x5757;crpto&#x8FDB;&#x884C;&#x89E3;&#x5BC6;&#xFF0C;&#x5F53;&#x7136;&#xFF0C;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;Node-RSA&#x7684;&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x89E3;&#x5BC6;&#x3002;</p><h2 id="articleHeader5">&#x6700;&#x540E;</h2><p>&#x6211;&#x4EEC;&#x518D;&#x6765;&#x770B;&#x4E00;&#x770B;&#x524D;&#x7AEF;&#x8BF7;&#x6C42;&#x7684;&#x5BC6;&#x7801;&#x4FE1;&#x606F;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbg0Ou?w=783&amp;h=81" src="https://static.alili.tech/img/bVbg0Ou?w=783&amp;h=81" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x6837;&#x4E00;&#x4E32;&#x5B57;&#x7B26;&#xFF0C;&#x5373;&#x4FBF;&#x88AB;&#x4ED6;&#x4EBA;&#x83B7;&#x53D6;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5BC6;&#x94A5;&#xFF0C;&#x5728;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x4E0A;&#xFF0C;&#x4ED6;&#x662F;&#x65E0;&#x6CD5;&#x77E5;&#x9053;&#x4F60;&#x7684;&#x5BC6;&#x7801;&#x7684;&#x3002;</p><p>&#x5F53;&#x7136;&#xFF0C;&#x5173;&#x4E8E;&#x7F51;&#x7EDC;&#x5B89;&#x5168;&#x662F;&#x4E00;&#x4E2A;&#x5927;&#x8BDD;&#x9898;&#xFF0C;&#x672C;&#x7BC7;&#x53EA;&#x662F;&#x5BF9;&#x5176;&#x4E2D;&#x7684;&#x4E00;&#x5C0F;&#x90E8;&#x5206;&#x8FDB;&#x884C;&#x4ECB;&#x7ECD;&#xFF0C;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x8BA8;&#x8BBA;&#xFF0C;&#x5E0C;&#x671B;&#x5BF9;&#x60A8;&#x6709;&#x5E2E;&#x52A9;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node中的密码安全

## 原文链接
[https://segmentfault.com/a/1190000016408673](https://segmentfault.com/a/1190000016408673)

