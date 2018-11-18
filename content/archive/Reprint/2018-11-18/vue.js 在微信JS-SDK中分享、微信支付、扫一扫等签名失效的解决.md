---
title: 'vue.js 在微信JS-SDK中分享、微信支付、扫一扫等签名失效的解决' 
date: 2018-11-18 3:32:07
hidden: true
slug: 11wexz8ckyo
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E00;&#xFF0C;&#x5148;&#x767B;&#x9646;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#x540E;&#x53F0;&#x7ED1;&#x5B9A;js&#x5B89;&#x5168;&#x57DF;&#x540D;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x52A0;http&#x6216;https&#xFF0C;&#x8BE6;&#x60C5;&#x767E;&#x5EA6;&#x3002;</h2><h2 id="articleHeader1">&#x4E8C;&#x3001;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#x540E;&#x53F0;&#x8BBE;&#x7F6E;&#x670D;&#x52A1;&#x5668;&#x7684;IP&#x4E3A;&#x767D;&#x540D;&#x5355;&#xFF0C;&#x5426;&#x5219;&#x65E0;&#x6CD5;&#x83B7;&#x53D6;access_token&#xFF0C;&#x8BE6;&#x60C5;&#x767E;&#x5EA6;</h2><h2 id="articleHeader2">&#x4E09;&#x3001;&#x5F15;&#x5165;wx-js-sdk</h2><p>1.&#x4F7F;&#x7528;script&#x6807;&#x7B7E; <a href="http://res.wx.qq.com/open/js/jweixin-1.2.0.js" rel="nofollow noreferrer" target="_blank">http://res.wx.qq.com/open/js/...</a>&#xFF08;&#x652F;&#x6301;https&#xFF09;&#x5F15;&#x5165;&#xFF1B;<br>2.&#x5982;&#x679C;&#x4F7F;&#x7528;vue-cli&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;&#xFF0C;&#x53EF;&#x4EE5;&#x5148;npm install weixin-js-sdk -s &#x52A0;&#x8F7D;&#x4F9D;&#x8D56;&#x5305;<br>&#x4EE5;&#x4E0B;&#x5DF2;&#x811A;&#x624B;&#x67B6;&#x4E3A;&#x4F8B;<br>.vue &#x6587;&#x4EF6;&#x4E2D; import wx from &apos;weixin-js-sdk&apos;;</p><p>getConfig(){</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            let that = this;
          this.$axios({
              url:that.api.shareUrl,//&#x6362;&#x6210;&#x4F60;&#x5B9E;&#x9645;&#x8BF7;&#x6C42;&#x7684;&#x8DEF;&#x5F84;
              method:&apos;post&apos;,
              data:{
                  url:window.location.href //&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x8DEF;&#x5F84;&#xFF0C;&#x6CE8;&#x610F;&#x8DEF;&#x5F84;&#x4E00;&#x822C;&#x4E0D;&#x80FD;&#x5199;&#x6B7B;&#xFF0C;&#x8BF7;&#x6C42;&#x7B7E;&#x540D;&#x7684;&#x8DEF;&#x5F84;&#x548C;&#x6700;&#x7EC8;&#x8C03;&#x53D6;wx-sdk&#x8DEF;&#x5F84;&#x5FC5;&#x987B;&#x4E00;&#x81F4;&#x3002;
              }
          }).then(function (res) {
              let sign = res.data.data;//&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;&#x5FAE;&#x4FE1;&#x7684;&#x6570;&#x636E;
              wx.config({
                  debug: true, // &#x5F00;&#x542F;&#x8C03;&#x8BD5;&#x6A21;&#x5F0F;,&#x8C03;&#x7528;&#x7684;&#x6240;&#x6709;api&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4F1A;&#x5728;&#x5BA2;&#x6237;&#x7AEF;alert&#x51FA;&#x6765;&#xFF0C;&#x82E5;&#x8981;&#x67E5;&#x770B;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;pc&#x7AEF;&#x6253;&#x5F00;&#xFF0C;&#x53C2;&#x6570;&#x4FE1;&#x606F;&#x4F1A;&#x901A;&#x8FC7;log&#x6253;&#x51FA;&#xFF0C;&#x4EC5;&#x5728;pc&#x7AEF;&#x65F6;&#x624D;&#x4F1A;&#x6253;&#x5370;&#x3002;
                  appId: sign.appId, // &#x5FC5;&#x586B;&#xFF0C;&#x516C;&#x4F17;&#x53F7;&#x7684;&#x552F;&#x4E00;&#x6807;&#x8BC6;
                  timestamp: sign.timestamp, // &#x5FC5;&#x586B;&#xFF0C;&#x751F;&#x6210;&#x7B7E;&#x540D;&#x7684;&#x65F6;&#x95F4;&#x6233;
                  nonceStr: sign.nonceStr, // &#x5FC5;&#x586B;&#xFF0C;&#x751F;&#x6210;&#x7B7E;&#x540D;&#x7684;&#x968F;&#x673A;&#x4E32;
                  signature: sign.signature, // &#x5FC5;&#x586B;&#xFF0C;&#x7B7E;&#x540D;&#xFF0C;&#x89C1;&#x9644;&#x5F55;1
                  jsApiList: [
                      &apos;onMenuShareTimeline&apos;,
                      &apos;onMenuShareAppMessage&apos;,
                      &apos;hideMenuItems&apos;,
                      &apos;showMenuItems&apos;,
                      &apos;showAllNonBaseMenuItem&apos;,
                      &apos;hideAllNonBaseMenuItem&apos;,
                      &apos;startRecord&apos;,
                      &apos;stopRecord&apos;,
                      &apos;onVoiceRecordEnd&apos;,
                      &apos;uploadVoice&apos;,
                      &apos;downloadVoice&apos;,
                      &apos;playVoice&apos;,
                      &apos;onVoicePlayEnd&apos;,
                      &apos;pauseVoice&apos;,
                      &apos;stopVoice&apos;,
                      &apos;openLocation&apos;,
                      &apos;getLocation&apos;,
                      &apos;chooseWXPay&apos;,
                      &apos;onMenuShareQQ&apos;,
                      &apos;scanQRCode&apos;,
                  ], // &#x5FC5;&#x586B;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;JS&#x63A5;&#x53E3;&#x5217;&#x8868;&#xFF0C;&#x6240;&#x6709;JS&#x63A5;&#x53E3;&#x5217;&#x8868;&#x89C1;&#x9644;&#x5F55;2
              });
          }).catch(function (err) {
              
          })
        };
        &#x521D;&#x59CB;&#x5316;&#x5B8C;&#x6210;&#xFF0C;&#x4EE5;&#x8C03;&#x8D77;&#x5FAE;&#x4FE1;&#x626B;&#x4E00;&#x626B;&#x4E3A;&#x4F8B;
            scan(){
            let that =this;
            wx.ready(function() {
                wx.scanQRCode({
                    needResult : 1, // &#x9ED8;&#x8BA4;&#x4E3A;0&#xFF0C;&#x626B;&#x63CF;&#x7ED3;&#x679C;&#x7531;&#x5FAE;&#x4FE1;&#x5904;&#x7406;&#xFF0C;1&#x5219;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x626B;&#x63CF;&#x7ED3;&#x679C;
                    success : function(res) {
                        var data = res.resultStr; // &#x5F53;needResult &#x4E3A; 1 &#x65F6;&#xFF0C;&#x626B;&#x7801;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;
                        var result  =data.split(&apos;,&apos;)[1];//&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x7801;&#x7684;&#x7C7B;&#x578B;+&#x2018;,&#x2019;+&#x5185;&#x5BB9;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x4EE5;&#x6570;&#x7EC4;&#x5206;&#x5272;&#x53D6;&#x7B2C;&#x4E8C;&#x4E2A;&#x3002;
                      //&#x5904;&#x7406;&#x81EA;&#x5DF1;&#x7684;&#x903B;&#x8F91;
                         
                    }
                });
            })
        }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>            <span class="hljs-keyword">let</span> that = <span class="hljs-keyword">this</span>;
          <span class="hljs-keyword">this</span>.$axios({
              <span class="hljs-attr">url</span>:that.api.shareUrl,<span class="hljs-comment">//&#x6362;&#x6210;&#x4F60;&#x5B9E;&#x9645;&#x8BF7;&#x6C42;&#x7684;&#x8DEF;&#x5F84;</span>
              method:<span class="hljs-string">&apos;post&apos;</span>,
              <span class="hljs-attr">data</span>:{
                  <span class="hljs-attr">url</span>:<span class="hljs-built_in">window</span>.location.href <span class="hljs-comment">//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x8DEF;&#x5F84;&#xFF0C;&#x6CE8;&#x610F;&#x8DEF;&#x5F84;&#x4E00;&#x822C;&#x4E0D;&#x80FD;&#x5199;&#x6B7B;&#xFF0C;&#x8BF7;&#x6C42;&#x7B7E;&#x540D;&#x7684;&#x8DEF;&#x5F84;&#x548C;&#x6700;&#x7EC8;&#x8C03;&#x53D6;wx-sdk&#x8DEF;&#x5F84;&#x5FC5;&#x987B;&#x4E00;&#x81F4;&#x3002;</span>
              }
          }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
              <span class="hljs-keyword">let</span> sign = res.data.data;<span class="hljs-comment">//&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;&#x5FAE;&#x4FE1;&#x7684;&#x6570;&#x636E;</span>
              wx.config({
                  <span class="hljs-attr">debug</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x5F00;&#x542F;&#x8C03;&#x8BD5;&#x6A21;&#x5F0F;,&#x8C03;&#x7528;&#x7684;&#x6240;&#x6709;api&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4F1A;&#x5728;&#x5BA2;&#x6237;&#x7AEF;alert&#x51FA;&#x6765;&#xFF0C;&#x82E5;&#x8981;&#x67E5;&#x770B;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;pc&#x7AEF;&#x6253;&#x5F00;&#xFF0C;&#x53C2;&#x6570;&#x4FE1;&#x606F;&#x4F1A;&#x901A;&#x8FC7;log&#x6253;&#x51FA;&#xFF0C;&#x4EC5;&#x5728;pc&#x7AEF;&#x65F6;&#x624D;&#x4F1A;&#x6253;&#x5370;&#x3002;</span>
                  appId: sign.appId, <span class="hljs-comment">// &#x5FC5;&#x586B;&#xFF0C;&#x516C;&#x4F17;&#x53F7;&#x7684;&#x552F;&#x4E00;&#x6807;&#x8BC6;</span>
                  timestamp: sign.timestamp, <span class="hljs-comment">// &#x5FC5;&#x586B;&#xFF0C;&#x751F;&#x6210;&#x7B7E;&#x540D;&#x7684;&#x65F6;&#x95F4;&#x6233;</span>
                  nonceStr: sign.nonceStr, <span class="hljs-comment">// &#x5FC5;&#x586B;&#xFF0C;&#x751F;&#x6210;&#x7B7E;&#x540D;&#x7684;&#x968F;&#x673A;&#x4E32;</span>
                  signature: sign.signature, <span class="hljs-comment">// &#x5FC5;&#x586B;&#xFF0C;&#x7B7E;&#x540D;&#xFF0C;&#x89C1;&#x9644;&#x5F55;1</span>
                  jsApiList: [
                      <span class="hljs-string">&apos;onMenuShareTimeline&apos;</span>,
                      <span class="hljs-string">&apos;onMenuShareAppMessage&apos;</span>,
                      <span class="hljs-string">&apos;hideMenuItems&apos;</span>,
                      <span class="hljs-string">&apos;showMenuItems&apos;</span>,
                      <span class="hljs-string">&apos;showAllNonBaseMenuItem&apos;</span>,
                      <span class="hljs-string">&apos;hideAllNonBaseMenuItem&apos;</span>,
                      <span class="hljs-string">&apos;startRecord&apos;</span>,
                      <span class="hljs-string">&apos;stopRecord&apos;</span>,
                      <span class="hljs-string">&apos;onVoiceRecordEnd&apos;</span>,
                      <span class="hljs-string">&apos;uploadVoice&apos;</span>,
                      <span class="hljs-string">&apos;downloadVoice&apos;</span>,
                      <span class="hljs-string">&apos;playVoice&apos;</span>,
                      <span class="hljs-string">&apos;onVoicePlayEnd&apos;</span>,
                      <span class="hljs-string">&apos;pauseVoice&apos;</span>,
                      <span class="hljs-string">&apos;stopVoice&apos;</span>,
                      <span class="hljs-string">&apos;openLocation&apos;</span>,
                      <span class="hljs-string">&apos;getLocation&apos;</span>,
                      <span class="hljs-string">&apos;chooseWXPay&apos;</span>,
                      <span class="hljs-string">&apos;onMenuShareQQ&apos;</span>,
                      <span class="hljs-string">&apos;scanQRCode&apos;</span>,
                  ], <span class="hljs-comment">// &#x5FC5;&#x586B;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;JS&#x63A5;&#x53E3;&#x5217;&#x8868;&#xFF0C;&#x6240;&#x6709;JS&#x63A5;&#x53E3;&#x5217;&#x8868;&#x89C1;&#x9644;&#x5F55;2</span>
              });
          }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
              
          })
        };
        &#x521D;&#x59CB;&#x5316;&#x5B8C;&#x6210;&#xFF0C;&#x4EE5;&#x8C03;&#x8D77;&#x5FAE;&#x4FE1;&#x626B;&#x4E00;&#x626B;&#x4E3A;&#x4F8B;
            scan(){
            <span class="hljs-keyword">let</span> that =<span class="hljs-keyword">this</span>;
            wx.ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                wx.scanQRCode({
                    <span class="hljs-attr">needResult</span> : <span class="hljs-number">1</span>, <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x4E3A;0&#xFF0C;&#x626B;&#x63CF;&#x7ED3;&#x679C;&#x7531;&#x5FAE;&#x4FE1;&#x5904;&#x7406;&#xFF0C;1&#x5219;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x626B;&#x63CF;&#x7ED3;&#x679C;</span>
                    success : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                        <span class="hljs-keyword">var</span> data = res.resultStr; <span class="hljs-comment">// &#x5F53;needResult &#x4E3A; 1 &#x65F6;&#xFF0C;&#x626B;&#x7801;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;</span>
                        <span class="hljs-keyword">var</span> result  =data.split(<span class="hljs-string">&apos;,&apos;</span>)[<span class="hljs-number">1</span>];<span class="hljs-comment">//&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x7801;&#x7684;&#x7C7B;&#x578B;+&#x2018;,&#x2019;+&#x5185;&#x5BB9;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x4EE5;&#x6570;&#x7EC4;&#x5206;&#x5272;&#x53D6;&#x7B2C;&#x4E8C;&#x4E2A;&#x3002;</span>
                      <span class="hljs-comment">//&#x5904;&#x7406;&#x81EA;&#x5DF1;&#x7684;&#x903B;&#x8F91;</span>
                         
                    }
                });
            })
        }
</code></pre><h2 id="articleHeader3">&#x56DB;&#x3001;&#x91CD;&#x70B9;&#x6765;&#x4E86;&#xFF0C;&#x89E3;&#x51B3;&#x5FAE;&#x4FE1;signature&#x65E0;&#x6548;&#x7684;&#x95EE;&#x9898;</h2><p>&#x4F7F;&#x7528;vue-router&#x7684;&#x7F51;&#x53CB;&#x90FD;&#x77E5;&#x9053;&#xFF0C;&#x8DEF;&#x7531;&#x4E0A;&#x5E26;&#x6709;#&#x505A;&#x8DEF;&#x7531;&#x7684;&#x8DF3;&#x8F6C;&#xFF0C;&#x800C;#&#x5728;&#x53D1;&#x8FC7;&#x53BB;&#x505A;&#x5FAE;&#x4FE1;&#x9A8C;&#x8BC1;&#x7684;signature&#x7684;&#x65F6;&#x5019;&#xFF0C;#&#x4F1A;&#x88AB;&#x5E72;&#x6389;&#xFF0C;&#x6700;&#x7EC8;&#x5BFC;&#x81F4;&#x7B7E;&#x540D;&#x65E0;&#x6548;&#x3002;&#x4F8B;&#x5982;&#x4F60;&#x7684;&#x8DEF;&#x5F84;&#x662F; www.a.com/#/scan &#x62FF;&#x53BB;&#x7B7E;&#x540D;&#xFF0C;#&#x88AB;&#x5E72;&#x6389;&#x4EE5;&#x540E;&#xFF0C;&#x4F60;&#x4F7F;&#x7528;www.a.com/#/scan&#xFF0C;&#x505A;wx.config signature&#x662F;&#x65E0;&#x6548;&#x7684;&#x3002;&#x5F88;&#x591A;&#x4EBA;&#x90FD;&#x77E5;&#x9053;&#x8981;&#x4F7F;&#x7528;vue&#x7684;history&#x6A21;&#x5F0F;&#x3002;<br>// &#x8DEF;&#x7531;&#x914D;&#x7F6E;<br>const RouterConfig = {</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mode: &apos;history&apos;,
routes: routers" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-string">mode:</span> <span class="hljs-string">&apos;history&apos;</span>,
<span class="hljs-string">routes:</span> routers</code></pre><p>};<br>&#x4F8B;&#x5982;&#x4F60;&#x7684;&#x57DF;&#x540D;&#x662F;www.a.com&#xFF0C;&#x4F60;&#x7684;&#x6587;&#x4EF6;&#x90E8;&#x7F72;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x9996;&#x9875;&#x6B63;&#x5E38;&#x8BBF;&#x95EE;&#xFF0C;&#x4F7F;&#x7528;&#x9875;&#x9762;&#x5185;&#x90E8;&#x8C03;&#x6574;&#x8DEF;&#x7531;&#xFF0C;&#x5982;&#x83DC;&#x5355;&#x7B49;&#xFF0C;&#x6CA1;&#x95EE;&#x9898;&#x3002;&#x4F46;&#x662F;&#x4E00;&#x65E6;&#x4F60;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;www.a.com/scan&#xFF0C;&#x6216;&#x8005;&#x4ECE;&#x9996;&#x9875;&#x83DC;&#x5355;&#x8DF3;&#x8F6C;&#x5230;www.a.com/sacn&#x7136;&#x540E;&#x5237;&#x65B0;&#x672C;&#x9875;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x8FD4;&#x56DE;404&#x3002;<br>&#x4EE5;&#x4E0B;&#x4EE5;nginx&#x4E3A;&#x4F8B;&#x5206;&#x6790;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x4F60;&#x8BBF;&#x95EE;www.a.com&#xFF0C;nginx&#x8BF7;&#x6C42;&#x5230;&#x6839;&#x76EE;&#x5F55;&#x4E0B;index.html&#xFF0C;&#x6CA1;&#x95EE;&#x9898;&#xFF0C;&#x9875;&#x9762;&#x4E0A;&#x4F7F;&#x7528;&#x83DC;&#x5355;&#x505A;&#x8DF3;&#x8F6C;&#x9875;&#x6CA1;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x4E00;&#x65E6;&#x4F60;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;www.a.com/scan&#xFF0C;&#x6216;&#x8005;&#x5237;&#x65B0;www.a.com/scan,nginx&#x627E;&#x4E0D;&#x5230;scan&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x6240;&#x4EE5;&#x8FD4;&#x56DE;404<br>so&#xFF0C;&#x914D;&#x7F6E; mode: &apos;history&apos;,&#x8FD8;&#x9700;&#x8981;nginx&#x914D;&#x7F6E;&#x914D;&#x5408;&#x3002;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x65F6;&#x5019;&#xFF0C;<br>location / {</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        if (!-e $request_filename){
            rewrite ^/(.*) /index.html last;
        }
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nginx"><code>        <span class="hljs-attribute">if</span> (!-e <span class="hljs-variable">$request_filename</span>){
            <span class="hljs-attribute">rewrite</span><span class="hljs-regexp"> ^/(.*)</span> /index.html <span class="hljs-literal">last</span>;
        }
        }</code></pre><p>&#x76F4;&#x63A5;&#x56DE;&#x5230;&#x4F60;&#x7684;index.html&#x5E76;&#x628A;&#x53C2;&#x6570;&#x5E26;&#x56DE;&#x6765;&#x3002;&#x89E3;&#x51B3;&#x6240;&#x6709;&#x95EE;&#x9898;</p><p>&#x5982;&#x679C;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x4E0D;&#x662F;&#x90E8;&#x7F72;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x600E;&#x4E48;&#x529E;&#xFF1F;<br>&#x5047;&#x5982;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x90E8;&#x7F72;&#x7684;&#x76EE;&#x5F55;&#x662F; /test/<br>vue router &#x7684;&#x914D;&#x7F6E;&#x4E3A;<br>const RouterConfig = {</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mode: &apos;history&apos;,
base:&apos;test&apos;,
routes: routers" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-string">mode:</span> <span class="hljs-string">&apos;history&apos;</span>,
<span class="hljs-string">base:</span><span class="hljs-string">&apos;test&apos;</span>,
<span class="hljs-string">routes:</span> routers</code></pre><p>};<br>nginx&#x7684;&#x914D;&#x7F6E;&#x4E3A;<br>location /test/ {</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!-e $request_filename){
            rewrite ^/(.*) /test/index.html last;
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nginx"><code><span class="hljs-attribute">if</span> (!-e <span class="hljs-variable">$request_filename</span>){
            <span class="hljs-attribute">rewrite</span><span class="hljs-regexp"> ^/(.*)</span> /test/index.html <span class="hljs-literal">last</span>;
        }</code></pre><p>}</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js 在微信JS-SDK中分享、微信支付、扫一扫等签名失效的解决

## 原文链接
[https://segmentfault.com/a/1190000015873294](https://segmentfault.com/a/1190000015873294)

