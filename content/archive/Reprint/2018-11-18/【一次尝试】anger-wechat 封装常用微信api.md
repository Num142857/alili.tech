---
title: '【一次尝试】anger-wechat 封装常用微信api' 
date: 2018-11-18 2:30:10
hidden: true
slug: grv53x88ypg
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x8D77;&#x56E0;</h1><p>&#x6700;&#x8FD1;&#x5F00;&#x53D1;&#x5FAE;&#x4FE1;&#xFF0C;&#x9047;&#x5230;&#x4E86;&#x5404;&#x79CD;&#x95EE;&#x9898;&#xFF0C;&#x770B;&#x6587;&#x6863;&#x770B;&#x4E86;&#x597D;&#x591A;&#x904D;&#x4ECD;&#x7136;&#x611F;&#x89C9;&#x5F88;&#x96BE;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x5C1D;&#x8BD5;&#x628A;&#x5FAE;&#x4FE1;api&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E0B;,&#x6240;&#x4EE5;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#xFF0C;&#x6709;&#x95EE;&#x9898;&#x63D0;&#x4EA4;Issues&#x54E6;&#x3002;</p><h1 id="articleHeader1">&#x9879;&#x76EE;&#x5730;&#x5740;</h1><p><a href="https://github.com/Jon-Millent/anger-wechat" rel="nofollow noreferrer" target="_blank">anger-wechat</a></p><h1 id="articleHeader2">anger-wechat <span style="font-weight:400">&#x1F612;</span><span style="font-weight:400">&#x1F437;</span></h1><p><span class="img-wrap"><img data-src="/img/bVbf13p?w=374&amp;h=249" src="https://static.alili.tech/img/bVbf13p?w=374&amp;h=249" alt="1657e6bbde0afb3a?w=374&amp;h=249&amp;f=png&amp;s=16312" title="1657e6bbde0afb3a?w=374&amp;h=249&amp;f=png&amp;s=16312" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader3">Directory</h2><ul><li><p><code>Global</code> &#x5168;&#x5C40;&#x65B9;&#x6CD5;</p><ul><li><a href="#iswechat">isWechat <code>&#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;&#x5FAE;&#x4FE1;&#x73AF;&#x5883;</code></a></li><li><a href="#getglobalaccesstoken">getGlobalAccessToken <code>&#x83B7;&#x53D6; access_token</code></a></li></ul></li><li><p><code>Web</code> &#x9002;&#x7528;&#x4E8E;&#x7F51;&#x9875;&#x516C;&#x4F17;&#x53F7;&#x5F00;&#x53D1;</p><ul><li><a href="#getjsticket">getJsTicket <code>&#x83B7;&#x53D6; js api_ticket</code></a></li><li><a href="#getauthurl">getAuthUrl <code>&#x83B7;&#x53D6; Auth&#x5730;&#x5740;</code></a></li><li><a href="#getauthaccesstokenbycode">getAuthAccessTokenByCode <code>&#x6839;&#x636E;code&#x83B7;&#x53D6; openid</code></a></li><li><a href="#getuserinfo">getUserInfo <code>&#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;</code></a></li><li><a href="#getjssdkconfig">getJsSdkConfig <code>&#x83B7;&#x53D6;js sdk config&#x914D;&#x7F6E;</code></a></li></ul></li><li><p><code>Mini</code> &#x9002;&#x7528;&#x4E8E;&#x5C0F;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;</p><ul><li><a href="#getopenidbycode">getOpenidByCode <code>&#x6839;&#x636E;code&#x6362;&#x53D6; openid&#x7B49;</code></a></li></ul></li><li><p><code>angerPay</code> &#x9002;&#x7528;&#x4E8E;&#x652F;&#x4ED8;</p><ul><li><a href="https://github.com/Jon-Millent/anger-wechat/blob/master/pay.MD" rel="nofollow noreferrer" target="_blank"><code>&#x652F;&#x4ED8;&#x6587;&#x6863;</code></a></li></ul></li></ul><h1 id="articleHeader4">Getting started</h1><p><code>npm install anger-wechat --save</code></p><h1 id="articleHeader5">Use</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var AngerWechat = require(&apos;anger-wechat&apos;)
var weixinApi = new AngerWechat({
    appId: &apos;[your appId]&apos;, // appId &#x5FC5;&#x4F20;
    appSecret: &apos;[your appSecret]&apos;, // appSecret &#x5FC5;&#x4F20;
    authUrl: &apos;http://www.test.cc/get-weixin-code.html&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> AngerWechat = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;anger-wechat&apos;</span>)
<span class="hljs-keyword">var</span> weixinApi = <span class="hljs-keyword">new</span> AngerWechat({
    <span class="hljs-attr">appId</span>: <span class="hljs-string">&apos;[your appId]&apos;</span>, <span class="hljs-comment">// appId &#x5FC5;&#x4F20;</span>
    appSecret: <span class="hljs-string">&apos;[your appSecret]&apos;</span>, <span class="hljs-comment">// appSecret &#x5FC5;&#x4F20;</span>
    authUrl: <span class="hljs-string">&apos;http://www.test.cc/get-weixin-code.html&apos;</span>
})</code></pre><blockquote>&#x5982;&#x679C;&#x9700;&#x8981;&#x652F;&#x4ED8;&#x7684;&#x8BDD;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var AngerWechat = require(&apos;anger-wechat&apos;)
var weixinApi = new AngerWechat({
    appId: &apos;[your appId]&apos;, // appId &#x5FC5;&#x4F20;
    appSecret: &apos;[your appSecret]&apos;, // appSecret &#x5FC5;&#x4F20;
    authUrl: &apos;http://www.test.cc/get-weixin-code.html&apos;, // &#x53EF;&#x9009; &#x5FAE;&#x4FE1;auth2.0&#x6388;&#x6743;&#x516C;&#x5171;&#x9875;&#x9762;
    payment: { // &#x53EF;&#x9009; &#x5982;&#x679C;&#x9700;&#x8981;&#x652F;&#x4ED8;&#x6A21;&#x5757;&#x7684;&#x8BDD;
        mchId: &apos;123456&apos;,
        partnerKey: &apos;456789&apos;,
        pfx: path.join(__dirname, &apos;apiclient_cert.p12&apos;), //&#x3010;&#x53EF;&#x9009;&#x3011;&#x8BC1;&#x4E66;&#x8DEF;&#x5F84;&#xFF0C;&#x4E0D;&#x4F20;&#x5927;&#x591A;&#x63A5;&#x53E3;&#x6389;&#x4E0D;&#x4E86;
        notifyUrl: &apos;&apos; // &#x3010;&#x53EF;&#x9009;&#x3011;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;&#x63A5;&#x53D7;&#x5230;&#x7ED3;&#x679C;&apos;
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> AngerWechat = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;anger-wechat&apos;</span>)
<span class="hljs-keyword">var</span> weixinApi = <span class="hljs-keyword">new</span> AngerWechat({
    <span class="hljs-attr">appId</span>: <span class="hljs-string">&apos;[your appId]&apos;</span>, <span class="hljs-comment">// appId &#x5FC5;&#x4F20;</span>
    appSecret: <span class="hljs-string">&apos;[your appSecret]&apos;</span>, <span class="hljs-comment">// appSecret &#x5FC5;&#x4F20;</span>
    authUrl: <span class="hljs-string">&apos;http://www.test.cc/get-weixin-code.html&apos;</span>, <span class="hljs-comment">// &#x53EF;&#x9009; &#x5FAE;&#x4FE1;auth2.0&#x6388;&#x6743;&#x516C;&#x5171;&#x9875;&#x9762;</span>
    payment: { <span class="hljs-comment">// &#x53EF;&#x9009; &#x5982;&#x679C;&#x9700;&#x8981;&#x652F;&#x4ED8;&#x6A21;&#x5757;&#x7684;&#x8BDD;</span>
        mchId: <span class="hljs-string">&apos;123456&apos;</span>,
        <span class="hljs-attr">partnerKey</span>: <span class="hljs-string">&apos;456789&apos;</span>,
        <span class="hljs-attr">pfx</span>: path.join(__dirname, <span class="hljs-string">&apos;apiclient_cert.p12&apos;</span>), <span class="hljs-comment">//&#x3010;&#x53EF;&#x9009;&#x3011;&#x8BC1;&#x4E66;&#x8DEF;&#x5F84;&#xFF0C;&#x4E0D;&#x4F20;&#x5927;&#x591A;&#x63A5;&#x53E3;&#x6389;&#x4E0D;&#x4E86;</span>
        notifyUrl: <span class="hljs-string">&apos;&apos;</span> <span class="hljs-comment">// &#x3010;&#x53EF;&#x9009;&#x3011;&#x5FAE;&#x4FE1;&#x652F;&#x4ED8;&#x63A5;&#x53D7;&#x5230;&#x7ED3;&#x679C;&apos;</span>
    }
})</code></pre><h1 id="articleHeader6">Global</h1><h2 id="articleHeader7"><code>getGlobalAccessToken</code></h2><blockquote>&#x5168;&#x5C40;&#x4F7F;&#x7528;&#xFF0C;&#x5EFA;&#x8BAE;&#x4FDD;&#x5B58;&#x5728;&#x6570;&#x636E;&#x5E93;</blockquote><p>&#x83B7;&#x53D6; access_token <a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421140183" rel="nofollow noreferrer" target="_blank">&#x6233;&#x6211;&#x67E5;&#x770B;&#x5B98;&#x65B9;&#x6587;&#x6863;</a></p><blockquote>access_token&#x662F;&#x516C;&#x4F17;&#x53F7;&#x7684;&#x5168;&#x5C40;&#x552F;&#x4E00;&#x63A5;&#x53E3;&#x8C03;&#x7528;&#x51ED;&#x636E;&#xFF0C;&#x516C;&#x4F17;&#x53F7;&#x8C03;&#x7528;&#x5404;&#x63A5;&#x53E3;&#x65F6;&#x90FD;&#x9700;&#x4F7F;&#x7528;access_token&#x3002;&#x5F00;&#x53D1;&#x8005;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x59A5;&#x5584;&#x4FDD;&#x5B58;&#x3002;access_token&#x7684;&#x5B58;&#x50A8;&#x81F3;&#x5C11;&#x8981;&#x4FDD;&#x7559;512&#x4E2A;&#x5B57;&#x7B26;&#x7A7A;&#x95F4;&#x3002;access_token&#x7684;&#x6709;&#x6548;&#x671F;&#x76EE;&#x524D;&#x4E3A;2&#x4E2A;&#x5C0F;&#x65F6;&#xFF0C;&#x9700;&#x5B9A;&#x65F6;&#x5237;&#x65B0;&#xFF0C;&#x91CD;&#x590D;&#x83B7;&#x53D6;&#x5C06;&#x5BFC;&#x81F4;&#x4E0A;&#x6B21;&#x83B7;&#x53D6;&#x7684;access_token&#x5931;&#x6548;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let access_token = await weixinApi.getGlobalAccessToken()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">let</span> access_token = <span class="hljs-keyword">await</span> weixinApi.getGlobalAccessToken()</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ 
    &quot;code&quot;: 200,
    &quot;msg&quot;: &quot;&#x8BF7;&#x6C42;&#x6210;&#x529F;&quot;,
    &quot;data&quot;: { 
        &quot;access_token&quot;: &quot;11_oTBrYVsT9wqa_-q3WDNEBOtfz1XKdM7YKIcNBEiu29Wfh5yTnlqaj5W0hMuxZ7C9FlY7CxD0RjR35V1ik1M3Nyi5QENcgFKhh0gYoBnAXEQ2oV93sVtO7IRqhh1kd9QLG8fwyA3vFRdifpJCOVLgAGAVCS&quot;,
        &quot;expires_in&quot;: 7200 
    } 
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{ 
    <span class="hljs-attr">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">&quot;msg&quot;</span>: <span class="hljs-string">&quot;&#x8BF7;&#x6C42;&#x6210;&#x529F;&quot;</span>,
    <span class="hljs-attr">&quot;data&quot;</span>: { 
        <span class="hljs-attr">&quot;access_token&quot;</span>: <span class="hljs-string">&quot;11_oTBrYVsT9wqa_-q3WDNEBOtfz1XKdM7YKIcNBEiu29Wfh5yTnlqaj5W0hMuxZ7C9FlY7CxD0RjR35V1ik1M3Nyi5QENcgFKhh0gYoBnAXEQ2oV93sVtO7IRqhh1kd9QLG8fwyA3vFRdifpJCOVLgAGAVCS&quot;</span>,
        <span class="hljs-attr">&quot;expires_in&quot;</span>: <span class="hljs-number">7200</span> 
    } 
}</code></pre><h2 id="articleHeader8"><code>isWechat</code></h2><p>&#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;&#x5FAE;&#x4FE1;&#x73AF;&#x5883;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let ua = request.headers[&quot;user-agent&quot;]
let isWeixin = weixinApi.isWechat(ua) // &#x4F20;&#x5165; `UserAgent` &#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8FD4;&#x56DE; true | false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> ua = request.headers[<span class="hljs-string">&quot;user-agent&quot;</span>]
<span class="hljs-keyword">let</span> isWeixin = weixinApi.isWechat(ua) <span class="hljs-comment">// &#x4F20;&#x5165; `UserAgent` &#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8FD4;&#x56DE; true | false</span></code></pre><h1 id="articleHeader9">Web</h1><p><code>[AngerWechat.Web]</code></p><h2 id="articleHeader10"><code>getJsTicket</code></h2><blockquote>&#x5168;&#x5C40;&#x4F7F;&#x7528;&#xFF0C;&#x5EFA;&#x8BAE;&#x4FDD;&#x5B58;&#x5728;&#x6570;&#x636E;&#x5E93;</blockquote><p>&#x83B7;&#x53D6; js api_ticket <a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421141115" rel="nofollow noreferrer" target="_blank">&#x6233;&#x6211;&#x67E5;&#x770B;&#x5B98;&#x65B9;&#x6587;&#x6863;</a></p><blockquote>api_ticket &#x662F;&#x7528;&#x4E8E;&#x8C03;&#x7528;&#x5FAE;&#x4FE1;&#x5361;&#x5238;JS API&#x7684;&#x4E34;&#x65F6;&#x7968;&#x636E;&#xFF0C;&#x6709;&#x6548;&#x671F;&#x4E3A;7200 &#x79D2;&#xFF0C;&#x901A;&#x8FC7;access_token &#x6765;&#x83B7;&#x53D6;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let jsTrickt = await weixinApi.Web.getJsTicket({
    access_token: &apos;11_oTBrYVsT9wqa_-q3WDNEBOtfz1XKdM7YKIcNBEiu29Wfh5yTnlqaj5W0hMuxZ7C9FlY7CxD0RjR35V1ik1M3Nyi5QENcgFKhh0gYoBnAXEQ2oV93sVtO7IRqhh1kd9QLG8fwyA3vFRdifpJCOVLgAGAVCS&apos; // &#x4EE5;&#x4E0A;&#x4E00;&#x6B65;&#x83B7;&#x53D6;&#x5230;&#x7684;access_token &#x83B7;&#x53D6; js api_ticket
  })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> jsTrickt = <span class="hljs-keyword">await</span> weixinApi.Web.getJsTicket({
    <span class="hljs-attr">access_token</span>: <span class="hljs-string">&apos;11_oTBrYVsT9wqa_-q3WDNEBOtfz1XKdM7YKIcNBEiu29Wfh5yTnlqaj5W0hMuxZ7C9FlY7CxD0RjR35V1ik1M3Nyi5QENcgFKhh0gYoBnAXEQ2oV93sVtO7IRqhh1kd9QLG8fwyA3vFRdifpJCOVLgAGAVCS&apos;</span> <span class="hljs-comment">// &#x4EE5;&#x4E0A;&#x4E00;&#x6B65;&#x83B7;&#x53D6;&#x5230;&#x7684;access_token &#x83B7;&#x53D6; js api_ticket</span>
  })</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;code&quot;: 200,
    &quot;msg&quot;: &quot;ok&quot;,
    &quot;data&quot;: {
        &quot;errcode&quot;: 0,
        &quot;errmsg&quot;: &quot;ok&quot;,
        &quot;ticket&quot;: &quot;HoagFKDcsGMVCIY2vOjf9oKOmI5MRTBgKJJwCDQ2BnyLbfAJHCZXUIs992xQP246Nzp7LCNupv5Jablw8COZ_w&quot;,
        &quot;expires_in&quot;: 7200
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">&quot;msg&quot;</span>: <span class="hljs-string">&quot;ok&quot;</span>,
    <span class="hljs-attr">&quot;data&quot;</span>: {
        <span class="hljs-attr">&quot;errcode&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">&quot;errmsg&quot;</span>: <span class="hljs-string">&quot;ok&quot;</span>,
        <span class="hljs-attr">&quot;ticket&quot;</span>: <span class="hljs-string">&quot;HoagFKDcsGMVCIY2vOjf9oKOmI5MRTBgKJJwCDQ2BnyLbfAJHCZXUIs992xQP246Nzp7LCNupv5Jablw8COZ_w&quot;</span>,
        <span class="hljs-attr">&quot;expires_in&quot;</span>: <span class="hljs-number">7200</span>
    }
}</code></pre><h2 id="articleHeader11"><code>getAuthUrl</code></h2><p>&#x83B7;&#x53D6; Auth&#x5730;&#x5740;,&#x91CD;&#x5B9A;&#x5411;&#x4E4B;&#x540E;&#x7528;&#x6765;&#x83B7;&#x53D6;code</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let authURl = weixinApi.Web.getAuthUrl({
    redirect_uri: &apos;http://www.baidu.com&apos;,
    scope: &apos;snsapi_userinfo&apos; // snsapi_base:&#x9759;&#x9ED8;&#x6388;&#x6743;&#xFF0C;snsapi_userinfo:&#x63D0;&#x793A;&#x6388;&#x6743;&#xFF08;&#x53EF;&#x4EE5;&#x540E;&#x7EED;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;&#xFF09;
})
console.log(authURl)
// http://www.toolos.cc/get-weixin-code.html?appid=wxf638c1f64239e786&amp;redirect_uri=http://www.baidu.com&amp;scope=snsapi_userinfo&amp;state=STATE" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> authURl = weixinApi.Web.getAuthUrl({
    <span class="hljs-attr">redirect_uri</span>: <span class="hljs-string">&apos;http://www.baidu.com&apos;</span>,
    <span class="hljs-attr">scope</span>: <span class="hljs-string">&apos;snsapi_userinfo&apos;</span> <span class="hljs-comment">// snsapi_base:&#x9759;&#x9ED8;&#x6388;&#x6743;&#xFF0C;snsapi_userinfo:&#x63D0;&#x793A;&#x6388;&#x6743;&#xFF08;&#x53EF;&#x4EE5;&#x540E;&#x7EED;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;&#xFF09;</span>
})
<span class="hljs-built_in">console</span>.log(authURl)
<span class="hljs-comment">// http://www.toolos.cc/get-weixin-code.html?appid=wxf638c1f64239e786&amp;redirect_uri=http://www.baidu.com&amp;scope=snsapi_userinfo&amp;state=STATE</span></code></pre><h2 id="articleHeader12"><code>getAuthAccessTokenByCode</code></h2><p>&#x6839;&#x636E;code&#x83B7;&#x53D6; openid</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let codeInfo = await weixinApi.Web.getAuthAccessTokenByCode({
    code: &apos;061729xv1BtSAa09g8yv1hr0xv1729xB&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> codeInfo = <span class="hljs-keyword">await</span> weixinApi.Web.getAuthAccessTokenByCode({
    <span class="hljs-attr">code</span>: <span class="hljs-string">&apos;061729xv1BtSAa09g8yv1hr0xv1729xB&apos;</span>
})</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;code&quot;: 200,
    &quot;msg&quot;: &quot;&#x8BF7;&#x6C42;&#x6210;&#x529F;&quot;,
    &quot;data&quot;: {
        &quot;access_token&quot;: &quot;11_Vc7D8AoYURWoECzJgD6Q1ccUOOHypO6mU0RQF7BnliKKCY5arfVvl0h3PWURwpK7QFgPLfDkHLX-9Dif6BTntw&quot;,
        &quot;expires_in&quot;: 7200,
        &quot;refresh_token&quot;: &quot;11_ii3uONcMPA-04RjuLlckMMiwaDGF2MjW2SB5vOI3Sshz39PAVn7kOyC80_pPmmRJxqbfJ3Rdw07WG154AeP83Q&quot;,
        &quot;openid&quot;: &quot;oI-Aa04T6FrpFFpTfyAaXR4SKacU&quot;,
        &quot;scope&quot;: &quot;snsapi_userinfo&quot;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">&quot;msg&quot;</span>: <span class="hljs-string">&quot;&#x8BF7;&#x6C42;&#x6210;&#x529F;&quot;</span>,
    <span class="hljs-attr">&quot;data&quot;</span>: {
        <span class="hljs-attr">&quot;access_token&quot;</span>: <span class="hljs-string">&quot;11_Vc7D8AoYURWoECzJgD6Q1ccUOOHypO6mU0RQF7BnliKKCY5arfVvl0h3PWURwpK7QFgPLfDkHLX-9Dif6BTntw&quot;</span>,
        <span class="hljs-attr">&quot;expires_in&quot;</span>: <span class="hljs-number">7200</span>,
        <span class="hljs-attr">&quot;refresh_token&quot;</span>: <span class="hljs-string">&quot;11_ii3uONcMPA-04RjuLlckMMiwaDGF2MjW2SB5vOI3Sshz39PAVn7kOyC80_pPmmRJxqbfJ3Rdw07WG154AeP83Q&quot;</span>,
        <span class="hljs-attr">&quot;openid&quot;</span>: <span class="hljs-string">&quot;oI-Aa04T6FrpFFpTfyAaXR4SKacU&quot;</span>,
        <span class="hljs-attr">&quot;scope&quot;</span>: <span class="hljs-string">&quot;snsapi_userinfo&quot;</span>
    }
}</code></pre><h2 id="articleHeader13"><code>getUserInfo</code></h2><p>&#x6839;&#x636E; <code>getAuthAccessTokenByCode</code> &#x83B7;&#x53D6;&#x7684; <code>access_token</code> &#x548C; <code>openid</code> &#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;&#xFF0C;&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684;&#x83B7;&#x53D6;&#x56DE;&#x8C03;url&#x65B9;&#x6CD5; <code>getAuthUrl</code> &#x7684; <code>scope</code> &#x9700;&#x8981;&#x4F20; <code>snsapi_userinfo</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let userInfo = await weixinApi.Web.getUserInfo({
    access_token: codeInfo.data.access_token,
    openid: codeInfo.data.openid
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> userInfo = <span class="hljs-keyword">await</span> weixinApi.Web.getUserInfo({
    <span class="hljs-attr">access_token</span>: codeInfo.data.access_token,
    <span class="hljs-attr">openid</span>: codeInfo.data.openid
})</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;code&quot;: 200,
    &quot;msg&quot;: &quot;&#x8BF7;&#x6C42;&#x6210;&#x529F;&quot;,
    &quot;data&quot;: {
        &quot;openid&quot;: &quot;oI-Aa04T6FrpFFpTfyAaXR4SKacU&quot;,
        &quot;nickname&quot;: &quot;&#x5403;&#x9C7C;&#x7684;&#x5E06;&quot;,
        &quot;sex&quot;: 1,
        &quot;language&quot;: &quot;zh_CN&quot;,
        &quot;city&quot;: &quot;**&quot;,
        &quot;province&quot;: &quot;**&quot;,
        &quot;country&quot;: &quot;&#x4E2D;&#x56FD;&quot;,
        &quot;headimgurl&quot;: &quot;http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIS3x9dFdptD1s2ZZMTDCriaiaXiaDPtyZw3vfMmJLyQ8PU8laBv4MNnJh5c9QWtTQey0m4FYUPVEvAQ/132&quot;,
        &quot;privilege&quot;: []
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">&quot;msg&quot;</span>: <span class="hljs-string">&quot;&#x8BF7;&#x6C42;&#x6210;&#x529F;&quot;</span>,
    <span class="hljs-attr">&quot;data&quot;</span>: {
        <span class="hljs-attr">&quot;openid&quot;</span>: <span class="hljs-string">&quot;oI-Aa04T6FrpFFpTfyAaXR4SKacU&quot;</span>,
        <span class="hljs-attr">&quot;nickname&quot;</span>: <span class="hljs-string">&quot;&#x5403;&#x9C7C;&#x7684;&#x5E06;&quot;</span>,
        <span class="hljs-attr">&quot;sex&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">&quot;language&quot;</span>: <span class="hljs-string">&quot;zh_CN&quot;</span>,
        <span class="hljs-attr">&quot;city&quot;</span>: <span class="hljs-string">&quot;**&quot;</span>,
        <span class="hljs-attr">&quot;province&quot;</span>: <span class="hljs-string">&quot;**&quot;</span>,
        <span class="hljs-attr">&quot;country&quot;</span>: <span class="hljs-string">&quot;&#x4E2D;&#x56FD;&quot;</span>,
        <span class="hljs-attr">&quot;headimgurl&quot;</span>: <span class="hljs-string">&quot;http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIS3x9dFdptD1s2ZZMTDCriaiaXiaDPtyZw3vfMmJLyQ8PU8laBv4MNnJh5c9QWtTQey0m4FYUPVEvAQ/132&quot;</span>,
        <span class="hljs-attr">&quot;privilege&quot;</span>: []
    }
}</code></pre><h2 id="articleHeader14"><code>getJsSdkConfig</code></h2><p>&#x83B7;&#x53D6;js sdk config&#x914D;&#x7F6E; <a href="https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign" rel="nofollow noreferrer" target="_blank">&#x5FAE;&#x4FE1; JS &#x63A5;&#x53E3;&#x7B7E;&#x540D;&#x6821;&#x9A8C;&#x5DE5;&#x5177;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let jsTricktConfig = await weixinApi.Web.getJsSdkConfig({
    ticket: &apos;HoagFKDcsGMVCIY2vOjf9oKOmI5MRTBgKJJwCDQ2Bnx34ua3MVs9zUZpV0wQPe8h83AwFSZQREHGgmuKpqvdsg&apos;,
    url: &apos;http://www.toolos.cc&apos; // &#x8C03;&#x7528;js sdk &#x9875;&#x9762;&#x5730;&#x5740;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> jsTricktConfig = <span class="hljs-keyword">await</span> weixinApi.Web.getJsSdkConfig({
    <span class="hljs-attr">ticket</span>: <span class="hljs-string">&apos;HoagFKDcsGMVCIY2vOjf9oKOmI5MRTBgKJJwCDQ2Bnx34ua3MVs9zUZpV0wQPe8h83AwFSZQREHGgmuKpqvdsg&apos;</span>,
    <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://www.toolos.cc&apos;</span> <span class="hljs-comment">// &#x8C03;&#x7528;js sdk &#x9875;&#x9762;&#x5730;&#x5740;</span>
})</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;appId&quot;: &quot;wxf638c1f64239e786&quot;,
    &quot;signature&quot;: &quot;2c18eb8d6adaa5e02a9df517e776f5eef40ed402&quot;,
    &quot;noncestr&quot;: &quot;04b21a6a-caea-4878-9fdb-8b2c1ff699b0&quot;,
    &quot;timestamp&quot;: 1530636997,
    &quot;jsapi_ticket&quot;: &quot;HoagFKDcsGMVCIY2vOjf9oKOmI5MRTBgKJJwCDQ2Bnx34ua3MVs9zUZpV0wQPe8h83AwFSZQREHGgmuKpqvdsg&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">&quot;appId&quot;</span>: <span class="hljs-string">&quot;wxf638c1f64239e786&quot;</span>,
    <span class="hljs-attr">&quot;signature&quot;</span>: <span class="hljs-string">&quot;2c18eb8d6adaa5e02a9df517e776f5eef40ed402&quot;</span>,
    <span class="hljs-attr">&quot;noncestr&quot;</span>: <span class="hljs-string">&quot;04b21a6a-caea-4878-9fdb-8b2c1ff699b0&quot;</span>,
    <span class="hljs-attr">&quot;timestamp&quot;</span>: <span class="hljs-number">1530636997</span>,
    <span class="hljs-attr">&quot;jsapi_ticket&quot;</span>: <span class="hljs-string">&quot;HoagFKDcsGMVCIY2vOjf9oKOmI5MRTBgKJJwCDQ2Bnx34ua3MVs9zUZpV0wQPe8h83AwFSZQREHGgmuKpqvdsg&quot;</span>
}</code></pre><h1 id="articleHeader15">Mini</h1><p><code>[AngerWechat.Mini]</code></p><h2 id="articleHeader16"><code>getOpenidByCode</code></h2><p>&#x6839;&#x636E;&#x5C0F;&#x7A0B;&#x5E8F;&#x4F20;&#x6765;&#x7684;code&#x83B7;&#x53D6;openid&#x7B49;&#x4FE1;&#x606F; <a href="https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html#wxloginobject" rel="nofollow noreferrer" target="_blank">&#x4E34;&#x65F6;&#x767B;&#x5F55;&#x51ED;&#x8BC1;code &#x83B7;&#x53D6; session_key &#x548C; openid &#x7B49;&#x3002;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let info = await weixinApi.Mini.getOpenidByCode({
    code: &apos;xxxxxxxxxxxxxx&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> info = <span class="hljs-keyword">await</span> weixinApi.Mini.getOpenidByCode({
    <span class="hljs-attr">code</span>: <span class="hljs-string">&apos;xxxxxxxxxxxxxx&apos;</span>
})</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;openid&quot; : &quot;oynY34-0Err_YssQIFsK-Ht1eGs&quot;,
    &quot;session_key&quot; : &quot;sPxOFsssssCP54n6cCfshw==&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">&quot;openid&quot;</span> : <span class="hljs-string">&quot;oynY34-0Err_YssQIFsK-Ht1eGs&quot;</span>,
    <span class="hljs-attr">&quot;session_key&quot;</span> : <span class="hljs-string">&quot;sPxOFsssssCP54n6cCfshw==&quot;</span>
}</code></pre><h1 id="articleHeader17">&#x652F;&#x4ED8;</h1><p><a href="https://github.com/Jon-Millent/anger-wechat/blob/master/pay.MD" rel="nofollow noreferrer" target="_blank">&#x6233;&#x6211;&#x67E5;&#x770B;&#x6587;&#x6863;&#x5730;&#x5740;</a></p><h1 id="articleHeader18">&#x9644;&#x5F55;</h1><h2 id="articleHeader19">&#x5173;&#x4E8E; authUrl &#x53C2;&#x6570;</h2><p>&#x53C2;&#x8003; <a href="https://github.com/Jon-Millent/GetWeixinCode" rel="nofollow noreferrer" target="_blank">GetWeixinCode</a></p><h2 id="articleHeader20">&#x6821;&#x9A8C;&#x5DE5;&#x5177;</h2><ul><li><a href="https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign" rel="nofollow noreferrer" target="_blank">&#x5FAE;&#x4FE1; JS &#x63A5;&#x53E3;&#x7B7E;&#x540D;&#x6821;&#x9A8C;&#x5DE5;&#x5177;</a></li><li><a href="https://mp.weixin.qq.com/debug/" rel="nofollow noreferrer" target="_blank">&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x5E73;&#x53F0;&#x63A5;&#x53E3;&#x8C03;&#x8BD5;&#x5DE5;&#x5177;</a></li></ul><h2 id="articleHeader21">&#x8BF7;&#x6211;&#x559D;&#x676F;&#x5496;&#x5561;&#xFF0C;&#x652F;&#x6301;&#x66F4;&#x591A;&#x5F00;&#x6E90;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000016175116?w=1024&amp;h=600" src="https://static.alili.tech/img/remote/1460000016175116?w=1024&amp;h=600" alt="1024.png" title="1024.png" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【一次尝试】anger-wechat 封装常用微信api

## 原文链接
[https://segmentfault.com/a/1190000015912780](https://segmentfault.com/a/1190000015912780)

