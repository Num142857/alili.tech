---
title: vue中使用cookies和crypto-js实现记住密码和加密
hidden: true
categories: [reprint]
slug: 8cf05ebf
date: 2018-11-08 02:30:09
---

{{< raw >}}
<p>&#x4E0D;&#x591A;BB&#xFF0C;&#x641E;&#x5FEB;&#x3001;&#x641E;&#x5FEB;&#x3001;</p><h2 id="articleHeader0">&#x4F7F;&#x7528;crypto-js&#x52A0;&#x89E3;&#x5BC6;</h2><p>&#x7B2C;&#x4E00;&#x6B65;&#xFF0C;&#x5B89;&#x88C5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install crypto-js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> crypto-js</code></pre><p>&#x7B2C;&#x4E8C;&#x6B65;&#xFF0C;&#x5728;&#x4F60;&#x9700;&#x8981;&#x7684;vue&#x7EC4;&#x4EF6;&#x5185;import</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import CryptoJS from &quot;crypto-js&quot;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs capnproto"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> CryptoJS <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;crypto-js&quot;</span>;</code></pre><p>&#x7B2C;&#x4E09;&#x6B65;&#xFF0C;&#x4F7F;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // Encrypt &#x52A0;&#x5BC6; 
    var cipherText = CryptoJS.AES.encrypt(
      &quot;my message&quot;,
      &quot;secretkey123&quot;
    ).toString();
    console.log(cipherText)
    // Decrypt &#x89E3;&#x5BC6;
    var bytes = CryptoJS.AES.decrypt(cipherText, &quot;secretkey123&quot;);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalText); // &apos;my message&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>    <span class="hljs-comment">// Encrypt &#x52A0;&#x5BC6; </span>
    <span class="hljs-keyword">var</span> cipherText = CryptoJS.AES.encrypt(
      <span class="hljs-string">&quot;my message&quot;</span>,
      <span class="hljs-string">&quot;secretkey123&quot;</span>
    ).<span class="hljs-keyword">toString</span>();
    console.<span class="hljs-built_in">log</span>(cipherText)
    <span class="hljs-comment">// Decrypt &#x89E3;&#x5BC6;</span>
    <span class="hljs-keyword">var</span> bytes = CryptoJS.AES.decrypt(cipherText, <span class="hljs-string">&quot;secretkey123&quot;</span>);
    <span class="hljs-keyword">var</span> originalText = bytes.<span class="hljs-keyword">toString</span>(CryptoJS.<span class="hljs-keyword">enc</span>.Utf8);
    console.<span class="hljs-built_in">log</span>(originalText); <span class="hljs-comment">// &apos;my message&apos;</span></code></pre><p><strong>&#x6CE8;&#x610F;&#x8FD9;&#x4E2A;mymessage&#x662F;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x8981;&#x52A0;&#x5BC6;&#x7684;&#x7528;&#x6237;id&#xFF08;number&#x7C7B;&#x578B;&#xFF09;&#x5F97;&#x5148;&#x8F6C;&#x6210;&#x5B57;&#x7B26;&#x4E32;</strong></p><p>&#x66F4;&#x591A;&#x4F7F;&#x7528;&#x8BF7;&#x8BBF;&#x95EE;<a href="https://github.com/brix/crypto-js#usage-without-requirejs" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a></p><h2 id="articleHeader1">&#x8BB0;&#x4F4F;&#x5BC6;&#x7801;</h2><ol><li>&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x662F;&#x767B;&#x5F55;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C;&#x52FE;&#x9009;&#x4E86;&#x8BB0;&#x4F4F;&#x5BC6;&#x7801;&#xFF08;&#x628A;&#x2018;&#x8BB0;&#x4F4F;&#x5BC6;&#x7801;&#x2019;&#x72B6;&#x6001;&#x4FDD;&#x5B58;&#x5230;localstorage&#xFF09;&#x5C31;&#x4FDD;&#x5B58;&#x8D26;&#x53F7;&#x5BC6;&#x7801;&#x5230;cookies&#xFF1B;</li><li>&#x4E4B;&#x540E;&#x8FDB;&#x5165;&#x767B;&#x5F55;&#x9875;&#x9762;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5224;&#x65AD;&#x662F;&#x5426;&#x8BB0;&#x4F4F;&#x4E86;&#x5BC6;&#x7801;&#xFF08;&#x4ECE;localstorage&#x5224;&#x65AD;&#xFF09;&#xFF0C;&#x5982;&#x679C;&#x8BB0;&#x4F4F;&#x5BC6;&#x7801;&#x5219;&#x5BFC;&#x51FA;cookies&#x5230;&#x8868;&#x5355;&#xFF1B;</li></ol><p>&#x5176;&#x4E2D;&#x4FDD;&#x5B58;&#x4F7F;&#x7528;setcookie&#x65B9;&#x6CD5;&#xFF0C;&#x53D6;&#x51FA;&#x5219;&#x4F7F;&#x7528;getcookie&#x65B9;&#x6CD5;&#x3002;<br>ok&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x7F16;&#x5199;&#x65B9;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x8BBE;&#x7F6E;cookie
    setCookie(portId, psw, exdays) {
      // Encrypt&#xFF0C;&#x52A0;&#x5BC6;&#x8D26;&#x53F7;&#x5BC6;&#x7801;
      var cipherPortId = CryptoJS.AES.encrypt(
        portId+&apos;&apos;,
        &quot;secretkey123&quot;
      ).toString();
      var cipherPsw = CryptoJS.AES.encrypt(psw+&apos;&apos;, &quot;secretkey123&quot;).toString();
      console.log(cipherPortId+&apos;/&apos;+cipherPsw)//&#x6253;&#x5370;&#x4E00;&#x4E0B;&#x770B;&#x770B;&#x6709;&#x6CA1;&#x6709;&#x52A0;&#x5BC6;&#x6210;&#x529F;

      var exdate = new Date(); //&#x83B7;&#x53D6;&#x65F6;&#x95F4;
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //&#x4FDD;&#x5B58;&#x7684;&#x5929;&#x6570;
      //&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;cookie&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x91CC;&#x7528;&#x4E86;==&#xFF0C;&#x56E0;&#x4E3A;&#x52A0;&#x5BC6;&#x540E;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x4E5F;&#x6709;&#x4E2A;=&#x53F7;&#xFF0C;&#x5F71;&#x54CD;&#x4E0B;&#x9762;getcookie&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x5207;&#x5272;&#xFF0C;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x66F4;&#x70AB;&#x9177;&#x7684;&#x7B26;&#x53F7;&#x3002;
      window.document.cookie =
        &quot;currentPortId&quot; +
        &quot;==&quot; +
        cipherPortId +
        &quot;;path=/;expires=&quot; +
        exdate.toGMTString();
      window.document.cookie =
        &quot;password&quot; +
        &quot;==&quot; +
        cipherPsw +
        &quot;;path=/;expires=&quot; +
        exdate.toGMTString();
    },
    //&#x8BFB;&#x53D6;cookie
    getCookie: function() {
      if (document.cookie.length &gt; 0) {
        var arr = document.cookie.split(&quot;; &quot;); //&#x8FD9;&#x91CC;&#x663E;&#x793A;&#x7684;&#x683C;&#x5F0F;&#x8BF7;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x7684;&#x4EE3;&#x7801;&#x66F4;&#x6539;
        for (var i = 0; i &lt; arr.length; i++) {
          var arr2 = arr[i].split(&quot;==&quot;); //&#x6839;&#x636E;==&#x5207;&#x5272;
          //&#x5224;&#x65AD;&#x67E5;&#x627E;&#x76F8;&#x5BF9;&#x5E94;&#x7684;&#x503C;
          if (arr2[0] == &quot;currentPortId&quot;) {
            // Decrypt&#xFF0C;&#x5C06;&#x89E3;&#x5BC6;&#x540E;&#x7684;&#x5185;&#x5BB9;&#x8D4B;&#x503C;&#x7ED9;&#x8D26;&#x53F7;
            var bytes = CryptoJS.AES.decrypt(arr2[1], &quot;secretkey123&quot;);
            this.currentPortId = bytes.toString(CryptoJS.enc.Utf8)-0;
          } else if (arr2[0] == &quot;password&quot;) {
            // Decrypt&#xFF0C;&#x5C06;&#x89E3;&#x5BC6;&#x540E;&#x7684;&#x5185;&#x5BB9;&#x8D4B;&#x503C;&#x7ED9;&#x5BC6;&#x7801;
            var bytes = CryptoJS.AES.decrypt(arr2[1], &quot;secretkey123&quot;);
            this.password = bytes.toString(CryptoJS.enc.Utf8);
          }
        }
      }
    },
    //&#x6E05;&#x9664;cookie
    clearCookie: function() {
      this.setCookie(&quot;&quot;, &quot;&quot;, -1); 
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x8BBE;&#x7F6E;cookie</span>
    setCookie(portId, psw, exdays) {
      <span class="hljs-comment">// Encrypt&#xFF0C;&#x52A0;&#x5BC6;&#x8D26;&#x53F7;&#x5BC6;&#x7801;</span>
      <span class="hljs-keyword">var</span> cipherPortId = CryptoJS.AES.encrypt(
        portId+<span class="hljs-string">&apos;&apos;</span>,
        <span class="hljs-string">&quot;secretkey123&quot;</span>
      ).toString();
      <span class="hljs-keyword">var</span> cipherPsw = CryptoJS.AES.encrypt(psw+<span class="hljs-string">&apos;&apos;</span>, <span class="hljs-string">&quot;secretkey123&quot;</span>).toString();
      <span class="hljs-built_in">console</span>.log(cipherPortId+<span class="hljs-string">&apos;/&apos;</span>+cipherPsw)<span class="hljs-comment">//&#x6253;&#x5370;&#x4E00;&#x4E0B;&#x770B;&#x770B;&#x6709;&#x6CA1;&#x6709;&#x52A0;&#x5BC6;&#x6210;&#x529F;</span>

      <span class="hljs-keyword">var</span> exdate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(); <span class="hljs-comment">//&#x83B7;&#x53D6;&#x65F6;&#x95F4;</span>
      exdate.setTime(exdate.getTime() + <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span> * exdays); <span class="hljs-comment">//&#x4FDD;&#x5B58;&#x7684;&#x5929;&#x6570;</span>
      <span class="hljs-comment">//&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;cookie&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x91CC;&#x7528;&#x4E86;==&#xFF0C;&#x56E0;&#x4E3A;&#x52A0;&#x5BC6;&#x540E;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x4E5F;&#x6709;&#x4E2A;=&#x53F7;&#xFF0C;&#x5F71;&#x54CD;&#x4E0B;&#x9762;getcookie&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x5207;&#x5272;&#xFF0C;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x66F4;&#x70AB;&#x9177;&#x7684;&#x7B26;&#x53F7;&#x3002;</span>
      <span class="hljs-built_in">window</span>.document.cookie =
        <span class="hljs-string">&quot;currentPortId&quot;</span> +
        <span class="hljs-string">&quot;==&quot;</span> +
        cipherPortId +
        <span class="hljs-string">&quot;;path=/;expires=&quot;</span> +
        exdate.toGMTString();
      <span class="hljs-built_in">window</span>.document.cookie =
        <span class="hljs-string">&quot;password&quot;</span> +
        <span class="hljs-string">&quot;==&quot;</span> +
        cipherPsw +
        <span class="hljs-string">&quot;;path=/;expires=&quot;</span> +
        exdate.toGMTString();
    },
    <span class="hljs-comment">//&#x8BFB;&#x53D6;cookie</span>
    getCookie: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.cookie.length &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">var</span> arr = <span class="hljs-built_in">document</span>.cookie.split(<span class="hljs-string">&quot;; &quot;</span>); <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x663E;&#x793A;&#x7684;&#x683C;&#x5F0F;&#x8BF7;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x7684;&#x4EE3;&#x7801;&#x66F4;&#x6539;</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
          <span class="hljs-keyword">var</span> arr2 = arr[i].split(<span class="hljs-string">&quot;==&quot;</span>); <span class="hljs-comment">//&#x6839;&#x636E;==&#x5207;&#x5272;</span>
          <span class="hljs-comment">//&#x5224;&#x65AD;&#x67E5;&#x627E;&#x76F8;&#x5BF9;&#x5E94;&#x7684;&#x503C;</span>
          <span class="hljs-keyword">if</span> (arr2[<span class="hljs-number">0</span>] == <span class="hljs-string">&quot;currentPortId&quot;</span>) {
            <span class="hljs-comment">// Decrypt&#xFF0C;&#x5C06;&#x89E3;&#x5BC6;&#x540E;&#x7684;&#x5185;&#x5BB9;&#x8D4B;&#x503C;&#x7ED9;&#x8D26;&#x53F7;</span>
            <span class="hljs-keyword">var</span> bytes = CryptoJS.AES.decrypt(arr2[<span class="hljs-number">1</span>], <span class="hljs-string">&quot;secretkey123&quot;</span>);
            <span class="hljs-keyword">this</span>.currentPortId = bytes.toString(CryptoJS.enc.Utf8)<span class="hljs-number">-0</span>;
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (arr2[<span class="hljs-number">0</span>] == <span class="hljs-string">&quot;password&quot;</span>) {
            <span class="hljs-comment">// Decrypt&#xFF0C;&#x5C06;&#x89E3;&#x5BC6;&#x540E;&#x7684;&#x5185;&#x5BB9;&#x8D4B;&#x503C;&#x7ED9;&#x5BC6;&#x7801;</span>
            <span class="hljs-keyword">var</span> bytes = CryptoJS.AES.decrypt(arr2[<span class="hljs-number">1</span>], <span class="hljs-string">&quot;secretkey123&quot;</span>);
            <span class="hljs-keyword">this</span>.password = bytes.toString(CryptoJS.enc.Utf8);
          }
        }
      }
    },
    <span class="hljs-comment">//&#x6E05;&#x9664;cookie</span>
    clearCookie: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">this</span>.setCookie(<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-number">-1</span>); 
    }</code></pre><p>&#x767B;&#x5F55;&#x7684;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" login() {
      this.$http //&#x8BF7;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#x4FEE;&#x6539;&#x8BE5;&#x65B9;&#x6CD5;
        .post(...)
        .then(res =&gt; {
          if (res.data.code == &quot;success&quot;) {
            if (this.rememberPsw == true) {
               //&#x5224;&#x65AD;&#x7528;&#x6237;&#x662F;&#x5426;&#x52FE;&#x9009;&#x4E86;&#x8BB0;&#x4F4F;&#x5BC6;&#x7801;&#x9009;&#x9879;rememberPsw&#xFF0C;&#x4F20;&#x5165;&#x4FDD;&#x5B58;&#x7684;&#x8D26;&#x53F7;currentPortId&#xFF0C;&#x5BC6;&#x7801;password&#xFF0C;&#x5929;&#x6570;30
              this.setCookie(this.currentPortId, this.password, 30);
            }else{
              this.clearCookie();
            }
            //&#x8FD9;&#x91CC;&#x662F;&#x56E0;&#x4E3A;&#x8981;&#x5728;created&#x4E2D;&#x5224;&#x65AD;&#xFF0C;&#x6240;&#x4EE5;&#x4F7F;&#x7528;&#x4E86;localstorage&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6839;&#x636E;cookie&#x7684;&#x957F;&#x5EA6;or&#x5176;&#x4ED6;&#x9A9A;&#x64CD;&#x4F5C;&#x6765;&#x5224;&#x65AD;&#x6709;&#x6CA1;&#x6709;&#x8BB0;&#x4F4F;&#x5BC6;&#x7801;&#x3002;
            localStorage.setItem(&quot;rememberPsw&quot;, this.rememberPsw);
            
          } else {
           //----
          }
        })
        .catch(err =&gt; {
          //----
        });
    }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code> login() {
      <span class="hljs-keyword">this</span>.$http <span class="hljs-comment">//&#x8BF7;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#x4FEE;&#x6539;&#x8BE5;&#x65B9;&#x6CD5;</span>
        .post(...)
        .then(res =&gt; {
          <span class="hljs-keyword">if</span> (res.<span class="hljs-keyword">data</span>.code == <span class="hljs-string">&quot;success&quot;</span>) {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.rememberPsw == <span class="hljs-literal">true</span>) {
               <span class="hljs-comment">//&#x5224;&#x65AD;&#x7528;&#x6237;&#x662F;&#x5426;&#x52FE;&#x9009;&#x4E86;&#x8BB0;&#x4F4F;&#x5BC6;&#x7801;&#x9009;&#x9879;rememberPsw&#xFF0C;&#x4F20;&#x5165;&#x4FDD;&#x5B58;&#x7684;&#x8D26;&#x53F7;currentPortId&#xFF0C;&#x5BC6;&#x7801;password&#xFF0C;&#x5929;&#x6570;30</span>
              <span class="hljs-keyword">this</span>.setCookie(<span class="hljs-keyword">this</span>.currentPortId, <span class="hljs-keyword">this</span>.password, <span class="hljs-number">30</span>);
            }<span class="hljs-keyword">else</span>{
              <span class="hljs-keyword">this</span>.clearCookie();
            }
            <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x662F;&#x56E0;&#x4E3A;&#x8981;&#x5728;created&#x4E2D;&#x5224;&#x65AD;&#xFF0C;&#x6240;&#x4EE5;&#x4F7F;&#x7528;&#x4E86;localstorage&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6839;&#x636E;cookie&#x7684;&#x957F;&#x5EA6;or&#x5176;&#x4ED6;&#x9A9A;&#x64CD;&#x4F5C;&#x6765;&#x5224;&#x65AD;&#x6709;&#x6CA1;&#x6709;&#x8BB0;&#x4F4F;&#x5BC6;&#x7801;&#x3002;</span>
            localStorage.setItem(<span class="hljs-string">&quot;rememberPsw&quot;</span>, <span class="hljs-keyword">this</span>.rememberPsw);
            
          } <span class="hljs-keyword">else</span> {
           <span class="hljs-comment">//----</span>
          }
        })
        .<span class="hljs-keyword">catch</span>(err =&gt; {
          <span class="hljs-comment">//----</span>
        });
    },</code></pre><p>&#x6700;&#x540E;&#x8981;&#x5728;created&#x72D7;&#x5B50;&#x51FD;&#x6570;&#x5185;&#x5224;&#x65AD;&#x7528;&#x6237;&#x662F;&#x5426;&#x8BB0;&#x4F4F;&#x4E86;&#x5BC6;&#x7801;&#x6765;&#x6267;&#x884C;&#x76F8;&#x5173;&#x7684;&#x64CD;&#x4F5C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5224;&#x65AD;&#x662F;&#x5426;&#x8BB0;&#x4F4F;&#x5BC6;&#x7801;
//**&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684;true&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x683C;&#x5F0F;&#xFF0C;&#x56E0;&#x4E3A;Boolean&#x5B58;&#x8FDB;localstorage&#x4E2D;&#x4F1A;&#x53D8;&#x6210;String**
 created() {
    //&#x5224;&#x65AD;&#x662F;&#x5426;&#x8BB0;&#x4F4F;&#x5BC6;&#x7801;
    if (localStorage.getItem(&quot;rememberPsw&quot;) == &apos;true&apos;) {
      this.getCookie();
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code><span class="hljs-comment">//&#x5224;&#x65AD;&#x662F;&#x5426;&#x8BB0;&#x4F4F;&#x5BC6;&#x7801;</span>
<span class="hljs-comment">//**&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684;true&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x683C;&#x5F0F;&#xFF0C;&#x56E0;&#x4E3A;Boolean&#x5B58;&#x8FDB;localstorage&#x4E2D;&#x4F1A;&#x53D8;&#x6210;String**</span>
 created<span class="hljs-comment">()</span> {
    <span class="hljs-comment">//&#x5224;&#x65AD;&#x662F;&#x5426;&#x8BB0;&#x4F4F;&#x5BC6;&#x7801;</span>
    <span class="hljs-keyword">if</span> <span class="hljs-comment">(localStorage.getItem(&quot;rememberPsw&quot;)</span> == <span class="hljs-string">&apos;true&apos;</span>) {
      this.getCookie<span class="hljs-comment">()</span>;
    }
  }</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x754C;&#x9762;&#x8D34;&#x4E0A;&#xFF0C;&#x5176;&#x4E2D;rememberPsw&#x662F;&#x8BB0;&#x4F4F;&#x5BC6;&#x7801;&#x6309;&#x94AE;&#x7684;v-model&#x503C;&#xFF0C;currentPortId&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x6846;&#x7684;v-model&#x503C;&#xFF0C;password&#x5C31;&#x662F;&#x7B2C;&#x4E8C;&#x4E2A;&#x6846;&#x7684;v-model&#x503C;&#x5566;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbhfKX?w=371&amp;h=183" src="https://static.alili.tech/img/bVbhfKX?w=371&amp;h=183" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">&#x6700;&#x540E;</h2><p>&#x6211;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x624B;&#xFF0C;&#x5199;&#x5F97;&#x4E0D;&#x597D;&#x7684;&#x5730;&#x65B9;&#x8BF7;&#x8F7B;&#x55B7;~&#x6709;&#x597D;&#x7684;&#x5EFA;&#x8BAE;&#x4E5F;&#x53EF;&#x4EE5;&#x8BC4;&#x8BBA;&#x544A;&#x8BC9;&#x4E0B;~&#x8C22;&#x8C22;&#x5927;&#x5BB6;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue中使用cookies和crypto-js实现记住密码和加密

## 原文链接
[https://segmentfault.com/a/1190000016466399](https://segmentfault.com/a/1190000016466399)

