---
title: '谈谈我熟悉又陌生的cookie' 
date: 2018-11-28 2:30:10
hidden: true
slug: x3j1xapgvs
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x5927;&#x6982;&#x662F;&#x6211;&#x7684;&#x4E1A;&#x52A1;&#x9886;&#x57DF;&#x6BD4;&#x8F83;&#x72ED;&#x7A84;&#x7684;&#x539F;&#x56E0;,&#x6211;&#x603B;&#x662F;&#x4F1A;&#x542C;&#x8BF4;cookie,&#x5374;&#x5F88;&#x5C11;&#x5728;&#x5B9E;&#x9645;&#x7684;&#x5F00;&#x53D1;&#x4E2D;&#x5E94;&#x7528;&#x6216;&#x8005;&#x5B9E;&#x8DF5;&#x8FC7;&#x5B83;,&#x4ECA;&#x5929;&#x521A;&#x597D;&#x770B;&#x5230;&lt;&lt;JavaScript&#x9AD8;&#x7EA7;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x7B2C;&#x4E09;&#x7248;&gt;&gt;&#x7684;&#x6570;&#x636E;&#x5B58;&#x50A8;&#x90E8;&#x5206;,&#x8BF4;&#x5230;&#x4E86;cookie,&#x8FD9;&#x91CC;&#x5C31;&#x5BF9;cookie&#x505A;&#x4E00;&#x4E2A;&#x6DF1;&#x5165;&#x8BBF;&#x8C08;,&#x5E0C;&#x671B;&#x548C;&#x6211;&#x4E00;&#x6837;&#x5BF9;cookie&#x4F3C;&#x66FE;&#x76F8;&#x8BC6;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x771F;&#x6B63;&#x7684;&#x719F;&#x6089;cookie,&#x5E76;&#x5B66;&#x4F1A;&#x5229;&#x7528;cookie&#x6765;&#x670D;&#x52A1;&#x6211;&#x4EEC;&#x7684;&#x4E1A;&#x52A1;.^_^^_^</p><h2 id="articleHeader1">Cookie</h2><h3 id="articleHeader2">&#x5B9A;&#x4E49;</h3><p>cookie,&#x662F;&#x670D;&#x52A1;&#x5668;&#x4E3A;&#x4E86;&#x8FA8;&#x522B;&#x7528;&#x6237;&#x8EAB;&#x4EFD;,&#x8FDB;&#x884C;session&#x8DDF;&#x8E2A;&#x800C;&#x5B58;&#x50A8;&#x5728;&#x7528;&#x6237;&#x672C;&#x5730;&#x7EC8;&#x7AEF;&#x4E0A;&#x7684;&#x6570;&#x636E;(&#x901A;&#x5E38;&#x7ECF;&#x8FC7;&#x52A0;&#x5BC6;).</p><h3 id="articleHeader3">&#x9650;&#x5236;</h3><p><strong>&#x57DF;&#x540D;&#x9650;&#x5236;</strong></p><p>&#x56E0;&#x4E3A;cookie&#x4E00;&#x822C;&#x7528;&#x4E8E;&#x4E0E;&#x670D;&#x52A1;&#x5668;&#x8FDB;&#x884C;&#x4EA4;&#x4E92;,&#x6240;&#x4EE5;&#x5B83;&#x4E00;&#x822C;&#x5B58;&#x653E;&#x5728;&#x5BF9;&#x5E94;&#x7684;&#x57DF;&#x540D;&#x4E0B;.&#x5F53;&#x8BBE;&#x5B9A;&#x4E86;&#x4E00;&#x4E2A;cookie&#x540E;,&#x518D;&#x7ED9;&#x521B;&#x5EFA;&#x5B83;&#x7684;&#x57DF;&#x540D;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x65F6;,&#x90FD;&#x4F1A;&#x5305;&#x542B;&#x8FD9;&#x4E2A;cookie,&#x8FD9;&#x4E2A;&#x9650;&#x5236;&#x786E;&#x4FDD;&#x4E86;&#x50A8;&#x5B58;&#x5728;cookie&#x4E2D;&#x7684;&#x4FE1;&#x606F;&#x53EA;&#x80FD;&#x8BA9;&#x6279;&#x51C6;&#x7684;&#x63A5;&#x53D7;&#x8005;&#x8BBF;&#x95EE;,&#x800C;&#x65E0;&#x6CD5;&#x88AB;&#x5176;&#x4ED6;&#x57DF;&#x8BBF;&#x95EE;.</p><p><strong>&#x4E2A;&#x6570;&#x9650;&#x5236;</strong><br>&#x7531;&#x4E8E;cooki&#x662F;&#x5B58;&#x50A8;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x8BA1;&#x7B97;&#x673A;&#x4E0A;&#x7684;,&#x8FD8;&#x52A0;&#x5165;&#x4E86;&#x4E00;&#x4E9B;&#x9650;&#x5236;&#x786E;&#x4FDD;cookie&#x4E0D;&#x4F1A;&#x88AB;&#x6076;&#x610F;&#x4F7F;&#x7528;,&#x540C;&#x65F6;&#x4E0D;&#x4F1A;&#x5360;&#x636E;&#x592A;&#x591A;&#x78C1;&#x76D8;&#x7A7A;&#x95F4;.&#x6BCF;&#x4E2A;&#x57DF;&#x7684;cookie&#x603B;&#x6570;&#x662F;&#x6709;&#x9650;&#x7684;,&#x4E0D;&#x8FC7;&#x6D4F;&#x89C8;&#x5668;&#x4E4B;&#x95F4;&#x5404;&#x6709;&#x4E0D;&#x540C;.</p><ul><li>IE7&#x548C;&#x4E4B;&#x540E;&#x7684;&#x7248;&#x672C;&#x6BCF;&#x4E2A;&#x57DF;&#x540D;&#x6700;&#x591A;50&#x4E2A;.</li><li>Firefox&#x9650;&#x5236;&#x6BCF;&#x4E2A;&#x57DF;&#x6700;&#x591A;50&#x4E2A;cookie</li><li>Opera&#x9650;&#x5236;&#x6BCF;&#x4E2A;&#x57DF;&#x6700;&#x591A;30&#x4E2A;cookie</li><li>Safari &#x548C;Chrome &#x5BF9;&#x6BCF;&#x4E2A;&#x57DF;&#x7684;cookie&#x6570;&#x91CF;&#x6CA1;&#x6709;&#x786C;&#x6027;&#x89C4;&#x5B9A;.</li></ul><p>&#x5F53;&#x8D85;&#x8FC7;&#x5355;&#x4E2A;&#x57DF;&#x540D;&#x9650;&#x5236;&#x4E4B;&#x540E;&#x8FD8;&#x8981;&#x5728;&#x8BBE;&#x7F6E;cookie,&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x6E05;&#x9664;&#x4EE5;&#x524D;&#x8BBE;&#x7F6E;&#x7684;cookie.IE&#x548C;Opera&#x4F1A;&#x5220;&#x9664;&#x6700;&#x8FD1;&#x6700;&#x5C11;&#x4F7F;&#x7528;&#x8FC7;&#x7684;cookie.&#x6240;&#x4EE5;&#x8003;&#x8651;cookie&#x9650;&#x5236;&#x975E;&#x5E38;&#x91CD;&#x8981;,&#x907F;&#x514D;&#x51FA;&#x73B0;&#x4E0D;&#x53EF;&#x9884;&#x671F;&#x7684;&#x540E;&#x679C;.</p><p><strong>&#x5C3A;&#x5BF8;&#x9650;&#x5236;</strong><br>&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x5BF9;&#x4E8E;cookie&#x7684;&#x5C3A;&#x5BF8;&#x4E5F;&#x6709;&#x9650;&#x5236;,&#x5927;&#x591A;&#x6570;&#x6D4F;&#x89C8;&#x5668;&#x662F;4KB&#x7684;&#x957F;&#x5EA6;&#x9650;&#x5236;,&#x5C3A;&#x5BF8;&#x9650;&#x5236;&#x5F71;&#x54CD;&#x4E00;&#x4E2A;&#x57DF;&#x4E0B;&#x6240;&#x6709;&#x7684;cookie,&#x800C;&#x5E76;&#x975E;&#x6BCF;&#x4E2A;cookie&#x5355;&#x72EC;&#x9650;&#x5236;.<br>&#x5982;&#x679C;&#x4F60;&#x5C1D;&#x8BD5;&#x521B;&#x5EFA;&#x67E5;&#x8FC7;&#x6700;&#x5927;&#x9650;&#x5236;&#x7684;cookie,&#x90A3;&#x4E48;&#x8BE5;cookie&#x4F1A;&#x88AB;&#x6084;&#x65E0;&#x58F0;&#x606F;&#x5730;&#x4E22;&#x6389;.</p><h3 id="articleHeader4">cookie&#x7684;&#x6784;&#x6210;</h3><p>cookie&#x7531;&#x6D4F;&#x89C8;&#x5668;&#x4FDD;&#x5B58;&#x7684;&#x4EE5;&#x4E0B;&#x51E0;&#x5757;&#x4FE1;&#x606F;&#x6784;&#x6210;.</p><ul><li>&#x540D;&#x79F0;(name): &#x4E00;&#x4E2A;&#x552F;&#x4E00;&#x786E;&#x5B9A;cookie&#x7684;&#x540D;&#x79F0;.</li><li>&#x503C;(value): &#x5B58;&#x50A8;&#x5728;cookie&#x4E2D;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x503C;.</li><li>&#x57DF;(domain): cookie&#x5BF9;&#x4E8E;&#x54EA;&#x4E2A;&#x57DF;&#x662F;&#x6709;&#x6548;&#x7684;,&#x63A7;&#x5236;&#x53EA;&#x6709;&#x5411;&#x8BE5;&#x57DF;&#x53D1;&#x9001;&#x7684;&#x8BF7;&#x6C42;&#x624D;&#x4F1A;&#x5305;&#x542B;&#x8FD9;&#x4E2A;cookie.</li><li>&#x8DEF;&#x5F84;(path): &#x5BF9;&#x4E8E;&#x6307;&#x5B9A;&#x57DF;&#x4E2D;&#x7684;&#x54EA;&#x4E2A;&#x8DEF;&#x5F84;,&#x5E94;&#x8BE5;&#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;cookie.</li><li>&#x5931;&#x6548;&#x65F6;&#x95F4;(expires): &#x8868;&#x793A;cookie&#x4F55;&#x65F6;&#x4F1A;&#x88AB;&#x5220;&#x9664;&#x7684;&#x65F6;&#x95F4;&#x6233;,&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;&#x5219;&#x9ED8;&#x8BA4;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x8BDD;&#x7ED3;&#x675F;&#x65F6;,&#x5373;&#x5C06;&#x6240;&#x6709;cookie&#x5220;&#x9664;,&#x82E5;&#x8BBE;&#x7F6E;&#x7684;&#x5931;&#x6548;&#x65E5;&#x671F;&#x662F;&#x4EE5;&#x524D;&#x7684;&#x65F6;&#x95F4;,&#x5219;cookie&#x4F1A;&#x88AB;&#x7ACB;&#x523B;&#x5220;&#x9664;.</li><li>&#x5B89;&#x5168;&#x6807;&#x5FD7;(secure): &#x5236;&#x5B9A;&#x540E;,cookie&#x53EA;&#x6709;&#x5728;&#x4F7F;&#x7528;SSL&#x94FE;&#x63A5;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x53D1;&#x9001;&#x5230;&#x670D;&#x52A1;&#x5668;,&#x5373;https&#x8BF7;&#x6C42;&#x624D;&#x53EF;&#x4EE5;&#x53D1;&#x9001;cookie.</li></ul><p>&#x6CE8;&#x610F;&#x53D1;&#x9001;cookie&#x7684;&#x65F6;&#x5019;&#x53EA;&#x4F1A;&#x53D1;&#x9001;cookie&#x7684;&#x540D;&#x548C;&#x503C;&#x624D;&#x4F1A;&#x88AB;&#x53D1;&#x9001;,&#x5176;&#x4ED6;&#x503C;&#x53EA;&#x4F1A;cookie&#x4FE1;&#x606F;&#x7684;&#x63CF;&#x8FF0;.</p><h3 id="articleHeader5">cookie&#x7684;&#x4F7F;&#x7528;</h3><h3 id="articleHeader6">&#x4F7F;&#x7528;&#x573A;&#x666F;</h3><p>&#x5E38;&#x7528;&#x573A;&#x666F;: cookie&#x4E00;&#x822C;&#x7528;&#x6765;&#x505A;&#x767B;&#x5F55;&#x9A8C;&#x8BC1;,&#x7528;&#x6237;&#x767B;&#x9646;&#x7684;&#x65F6;&#x5019;&#x8BB2;&#x7528;&#x6237;&#x540D;&#x548C;&#x5BC6;&#x7801;&#x4F20;&#x5165;&#x5230;&#x670D;&#x52A1;&#x5668;&#x7AEF;,&#x670D;&#x52A1;&#x5668;&#x4F1A;&#x8FD4;&#x56DE;&#x5C06;&#x7528;&#x6237;&#x76F8;&#x5173;&#x7684;&#x8BA4;&#x8BC1;&#x4FE1;&#x606F;,&#x7136;&#x540E;&#x7531;&#x670D;&#x52A1;&#x5668;&#x5C06;&#x8FD9;&#x4E9B;&#x4FE1;&#x606F;&#x5199;&#x5165;cookie&#x6216;&#x8005;&#x7531;&#x524D;&#x7AEF;&#x4F7F;&#x7528;js&#x64CD;&#x4F5C;cookie&#x5C06;&#x8FD9;&#x4E9B;&#x4FE1;&#x606F;&#x5199;&#x5165;&#x5230;cookie&#x4E2D;(&#x5982;&#x679C;&#x670D;&#x52A1;&#x5668;&#x901A;&#x8FC7;Set-Cookie&#x7684;&#x65B9;&#x5F0F;&#x76F4;&#x63A5;&#x5199;&#x5165;&#x5219;&#x4E0D;&#x9700;&#x8981;&#x524D;&#x7AEF;&#x7684;&#x53C2;&#x4E0E;,&#x524D;&#x7AEF;&#x662F;&#x65E0;&#x611F;&#x77E5;&#x7684;),&#x767B;&#x9646;&#x6210;&#x529F;&#x4EE5;&#x540E;&#x7684;&#x7528;&#x6237;&#x5728;&#x8BE5;&#x57DF;&#x540D;&#x4E0B;&#x7684;&#x8BBF;&#x95EE;&#x90FD;&#x4F1A;&#x5728;&#x8BF7;&#x6C42;&#x4E2D;&#x53D1;&#x9001;cookie,&#x4F5C;&#x4E3A;&#x8BE5;&#x7528;&#x6237;&#x7684;&#x8EAB;&#x4EFD;&#x6807;&#x8BC6;.&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x8BA8;&#x8BBA;&#x7684;&#x662F;&#x524D;&#x7AEF;&#x4F7F;&#x7528;js&#x64CD;&#x4F5C;cookie&#x7684;&#x60C5;&#x51B5;.</p><p>&#x4E0D;&#x5E38;&#x7528;&#x573A;&#x666F;: &#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;js&#x64CD;&#x4F5C;cookie,&#x5728;cookie&#x4E0A;&#x5B58;&#x50A8;&#x6211;&#x4EEC;&#x4E34;&#x65F6;&#x9700;&#x8981;&#x7684;&#x7528;&#x4E8E;&#x9875;&#x9762;&#x4EA4;&#x4E92;&#x7684;&#x53D8;&#x91CF;,&#x8FD9;&#x4E2A;&#x65F6;&#x5019;cookie&#x5C31;&#x5145;&#x5F53;&#x4E86;sessionStorage&#x6216;&#x8005;localStorage&#x7684;&#x89D2;&#x8272;.</p><h3 id="articleHeader7">&#x64CD;&#x4F5C;cookie</h3><p>&#x7531;&#x4E8E;JavaScript&#x4E2D;&#x8BFB;&#x5199;cookie&#x4E0D;&#x662F;&#x975E;&#x5E38;&#x76F4;&#x89C2;,&#x5E38;&#x5E38;&#x9700;&#x8981;&#x5199;&#x4E00;&#x4E9B;&#x51FD;&#x6570;&#x6765;&#x7B80;&#x5316;cookie&#x7684;&#x529F;&#x80FD;.&#x57FA;&#x672C;&#x7684;&#x64CD;&#x4F5C;&#x6709;&#x4E09;&#x79CD;: &#x8BFB;&#x53D6;,&#x5199;&#x5165;,&#x5220;&#x9664;;</p><p><strong>&#x8BF4;&#x660E;: &#x6211;&#x4E0D;&#x77E5;&#x9053;&#x770B;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x670B;&#x53CB;&#x662F;&#x4E0D;&#x662F;&#x4E86;&#x89E3;&#x8FD9;&#x4E9B;&#x64CD;&#x4F5C;cookie&#x7684;&#x65B9;&#x6CD5;,&#x5982;&#x679C;&#x4E0D;&#x4E86;&#x89E3;,&#x6211;&#x5EFA;&#x8BAE;&#x4F60;&#x5148;&#x60F3;&#x4E00;&#x60F3;,&#x7136;&#x540E;&#x5C1D;&#x8BD5;&#x7740;&#x81EA;&#x5DF1;&#x53BB;&#x5199;,&#x7136;&#x540E;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x8BDD;&#x518D;&#x6765;&#x770B;&#x770B;&#x6211;&#x7684;&#x4EE3;&#x7801;,&#x4E5F;&#x53EF;&#x4EE5;&#x5206;&#x4EAB;&#x5230;&#x8BC4;&#x8BBA;&#x533A;,&#x6211;&#x4EEC;&#x4E00;&#x8D77;&#x6765;&#x770B;&#x770B;&#x8FD9;&#x4E9B;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x7684;&#x4F18;&#x52A3;,&#x4E0D;&#x77E5;&#x9053;&#x4E0D;&#x540C;&#x601D;&#x60F3;&#x7684;&#x78B0;&#x649E;&#x4F1A;&#x4E0D;&#x4F1A;&#x64E6;&#x51FA;&#x5947;&#x5999;&#x7684;&#x706B;&#x82B1;&#x5462;? &#x5F88;&#x671F;&#x5F85;&#x5965;~</strong></p><p>&#x5C01;&#x88C5;&#x7684;&#x64CD;&#x4F5C;cookie&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CookieUtil = {
    // &#x83B7;&#x53D6;cookie &#x63A5;&#x53D7;&#x7684;&#x53C2;&#x6570; cookie&#x7684;&#x540D;&#x79F0;
    get: function(name) {
        var cookieName = encodeURIComponent(name) + &quot;=&quot;,
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if(cookieStart !== -1) {
            var cookieEnd = document.cookie.indexOf(&quot;;&quot;,cookieStart);
            if(cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.LENGTH, cookieEnd));
        }
        return cookieValue;
    },
    // &#x8BBE;&#x7F6E;cookie, &#x63A5;&#x6536;&#x53C2;&#x6570;: cookie&#x7684;&#x540D;&#x79F0;, cookie&#x7684;&#x503C;, 
    // &#x53EF;&#x9009;&#x7684;&#x7528;&#x4E8E;&#x6267;&#x884C;cookie&#x4F55;&#x65F6;&#x5E94;&#x88AB;&#x5220;&#x9664;&#x7684;Date&#x5BF9;&#x8C61;,cookie&#x7684;&#x53EF;&#x9009;&#x7684;URL&#x8DEF;&#x5F84;, &#x53EF;&#x9009;&#x7684;&#x57DF;&#x548C;&#x662F;&#x5426;&#x8981;&#x6DFB;&#x52A0;secure&#x6807;&#x5FD7;&#x7684;&#x5E03;&#x5C14;&#x503C;
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + &quot;=&quot; + encodeURIComponent(value);
        if(expires instanceof Date) {
            cookieText += &quot;; expires=&quot; + expires.toGMTString();
        }
        if(path) {
            cookieText += &quot;; path=&quot; + path;
        }
        if(domain) {
            cookieText += &quot;; domain=&quot; + domain;
        }
        if(secure) {
            cookieText += &quot;; secure&quot;;
        }
        document.cookie = cookieText;
    },
    // &#x5220;&#x9664;cookie&#x7684;&#x65B9;&#x6CD5;, &#x63A5;&#x6536;&#x7684;&#x53C2;&#x6570;: &#x8981;&#x5220;&#x9664;&#x7684;cookie&#x7684;&#x540D;&#x79F0;,&#x53EF;&#x9009;&#x7684;&#x8DEF;&#x5F84;&#x53C2;&#x6570;,&#x53EF;&#x9009;&#x7684;&#x57DF;&#x53C2;&#x6570;&#x548C;&#x53EF;&#x9009;&#x7684;&#x5B89;&#x5168;&#x53C2;&#x6570;
    unset: function (name, path, domain, secure) {
        // &#x5C06;&#x67D0;&#x4E2A;cookie&#x7684;&#x8FC7;&#x671F;&#x65F6;&#x95F4;&#x65E9;&#x4E8E;&#x5F53;&#x524D;&#x65F6;&#x95F4;,&#x5219;&#x4F1A;&#x88AB;&#x7ACB;&#x523B;&#x5220;&#x9664;,&#x8BE5;&#x65B9;&#x6CD5;&#x8BBE;&#x7F6E;&#x5931;&#x6548;&#x65F6;&#x95F4;&#x4E3A;1970&#x5E74;1&#x6708;1&#x65E5;
        this.set(name, &quot;&quot;, new Date(0), path, domain, secure);
    }
}

// &#x8BBE;&#x7F6E;cookie
CookieUtil.set(&quot;name&quot;, &quot;Nicholas&quot;);
CookieUtil.set(&quot;book&quot;, &quot;Professional JavaScript&quot;);

// &#x8BFB;&#x53D6;cookie&#x7684;&#x503C;
CookieUtil.get(&quot;name&quot;);
CookieUtil.get(&quot;book&quot;);

// &#x5220;&#x9664;cookie
CookieUtil.unset(&quot;name&quot;);
CookieUtil.unset(&quot;book&quot;);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> CookieUtil = {
    <span class="hljs-comment">// &#x83B7;&#x53D6;cookie &#x63A5;&#x53D7;&#x7684;&#x53C2;&#x6570; cookie&#x7684;&#x540D;&#x79F0;</span>
    get: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
        <span class="hljs-keyword">var</span> cookieName = <span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">&quot;=&quot;</span>,
            cookieStart = <span class="hljs-built_in">document</span>.cookie.indexOf(cookieName),
            cookieValue = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">if</span>(cookieStart !== <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">var</span> cookieEnd = <span class="hljs-built_in">document</span>.cookie.indexOf(<span class="hljs-string">&quot;;&quot;</span>,cookieStart);
            <span class="hljs-keyword">if</span>(cookieEnd == <span class="hljs-number">-1</span>) {
                cookieEnd = <span class="hljs-built_in">document</span>.cookie.length;
            }
            cookieValue = <span class="hljs-built_in">decodeURIComponent</span>(<span class="hljs-built_in">document</span>.cookie.substring(cookieStart + cookieName.LENGTH, cookieEnd));
        }
        <span class="hljs-keyword">return</span> cookieValue;
    },
    <span class="hljs-comment">// &#x8BBE;&#x7F6E;cookie, &#x63A5;&#x6536;&#x53C2;&#x6570;: cookie&#x7684;&#x540D;&#x79F0;, cookie&#x7684;&#x503C;, </span>
    <span class="hljs-comment">// &#x53EF;&#x9009;&#x7684;&#x7528;&#x4E8E;&#x6267;&#x884C;cookie&#x4F55;&#x65F6;&#x5E94;&#x88AB;&#x5220;&#x9664;&#x7684;Date&#x5BF9;&#x8C61;,cookie&#x7684;&#x53EF;&#x9009;&#x7684;URL&#x8DEF;&#x5F84;, &#x53EF;&#x9009;&#x7684;&#x57DF;&#x548C;&#x662F;&#x5426;&#x8981;&#x6DFB;&#x52A0;secure&#x6807;&#x5FD7;&#x7684;&#x5E03;&#x5C14;&#x503C;</span>
    set: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, value, expires, path, domain, secure</span>) </span>{
        <span class="hljs-keyword">var</span> cookieText = <span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">&quot;=&quot;</span> + <span class="hljs-built_in">encodeURIComponent</span>(value);
        <span class="hljs-keyword">if</span>(expires <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>) {
            cookieText += <span class="hljs-string">&quot;; expires=&quot;</span> + expires.toGMTString();
        }
        <span class="hljs-keyword">if</span>(path) {
            cookieText += <span class="hljs-string">&quot;; path=&quot;</span> + path;
        }
        <span class="hljs-keyword">if</span>(domain) {
            cookieText += <span class="hljs-string">&quot;; domain=&quot;</span> + domain;
        }
        <span class="hljs-keyword">if</span>(secure) {
            cookieText += <span class="hljs-string">&quot;; secure&quot;</span>;
        }
        <span class="hljs-built_in">document</span>.cookie = cookieText;
    },
    <span class="hljs-comment">// &#x5220;&#x9664;cookie&#x7684;&#x65B9;&#x6CD5;, &#x63A5;&#x6536;&#x7684;&#x53C2;&#x6570;: &#x8981;&#x5220;&#x9664;&#x7684;cookie&#x7684;&#x540D;&#x79F0;,&#x53EF;&#x9009;&#x7684;&#x8DEF;&#x5F84;&#x53C2;&#x6570;,&#x53EF;&#x9009;&#x7684;&#x57DF;&#x53C2;&#x6570;&#x548C;&#x53EF;&#x9009;&#x7684;&#x5B89;&#x5168;&#x53C2;&#x6570;</span>
    unset: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, path, domain, secure</span>) </span>{
        <span class="hljs-comment">// &#x5C06;&#x67D0;&#x4E2A;cookie&#x7684;&#x8FC7;&#x671F;&#x65F6;&#x95F4;&#x65E9;&#x4E8E;&#x5F53;&#x524D;&#x65F6;&#x95F4;,&#x5219;&#x4F1A;&#x88AB;&#x7ACB;&#x523B;&#x5220;&#x9664;,&#x8BE5;&#x65B9;&#x6CD5;&#x8BBE;&#x7F6E;&#x5931;&#x6548;&#x65F6;&#x95F4;&#x4E3A;1970&#x5E74;1&#x6708;1&#x65E5;</span>
        <span class="hljs-keyword">this</span>.set(name, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>), path, domain, secure);
    }
}

<span class="hljs-comment">// &#x8BBE;&#x7F6E;cookie</span>
CookieUtil.set(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;Nicholas&quot;</span>);
CookieUtil.set(<span class="hljs-string">&quot;book&quot;</span>, <span class="hljs-string">&quot;Professional JavaScript&quot;</span>);

<span class="hljs-comment">// &#x8BFB;&#x53D6;cookie&#x7684;&#x503C;</span>
CookieUtil.get(<span class="hljs-string">&quot;name&quot;</span>);
CookieUtil.get(<span class="hljs-string">&quot;book&quot;</span>);

<span class="hljs-comment">// &#x5220;&#x9664;cookie</span>
CookieUtil.unset(<span class="hljs-string">&quot;name&quot;</span>);
CookieUtil.unset(<span class="hljs-string">&quot;book&quot;</span>);
</code></pre><h2 id="articleHeader8">&#x5B50;cookie</h2><p>&#x4E3A;&#x4E86;&#x7ED5;&#x5F00;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x5355;&#x57DF;&#x540D;&#x4E0B;&#x7684;cookie&#x6570;&#x9650;&#x5236;,&#x4E00;&#x4E9B;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x4F7F;&#x7528;&#x4E86;&#x4E00;&#x79CD;&#x6210;&#x4E3A;&#x5B50;cookie&#x7684;&#x6539;&#x53D8;,&#x5B50;cookie&#x662F;&#x5B58;&#x653E;&#x5728;&#x5355;&#x4E2A;cookie&#x4E2D;&#x7684;&#x66F4;&#x5C0F;&#x6BB5;&#x7684;&#x6570;&#x636E;,&#x901A;&#x5E38;&#x662F;&#x591A;&#x4E2A;&#x540D;&#x79F0;&#x503C;&#x5BF9;&#x7684;&#x5F62;&#x5F0F;.&#x5B50;cookie&#x5BF9;&#x5E38;&#x89C1;&#x7684;&#x683C;&#x5F0F;&#x5982;&#x4E0B;&#x6240;&#x793A;:<br>namename1=value1&amp;name2=value2&amp;name3=value3&amp;name4=value4&amp;name5=value5<br>&#x5B50;cookie&#x4E00;&#x822C;&#x4E5F;&#x4EE5;&#x67E5;&#x8BE2;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x683C;&#x5F0F;&#x8FDB;&#x884C;&#x683C;&#x5F0F;&#x5316;,&#x7136;&#x540E;&#x8FD9;&#x4E9B;&#x503C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5355;&#x4E2A;cookie&#x8FDB;&#x884C;&#x50A8;&#x5B58;&#x548C;&#x8BBF;&#x95EE;,&#x800C;&#x975E;&#x5BF9;&#x6BCF;&#x4E2A;&#x540D;&#x79F0;-&#x503C;&#x5BF9;&#x513F;&#x4F7F;&#x7528;&#x4E0D;&#x540C;&#x7684;cookie&#x5B58;&#x50A8;,&#x6700;&#x540E;&#x7F51;&#x7AD9;&#x6216;&#x8005;web&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x53EF;&#x4EE5;&#x65E0;&#x9700;&#x5927;&#x5230;&#x5355;&#x57DF;&#x540D;cookie&#x4E0A;&#x9650;&#x4E5F;&#x53EF;&#x4EE5;&#x5B58;&#x50A8;&#x66F4;&#x52A0;&#x7ED3;&#x6784;&#x5316;&#x7684;&#x6570;&#x636E;.<br>&#x4E3A;&#x4E86;&#x66F4;&#x597D;&#x7684;&#x64CD;&#x4F5C;&#x5B50;cookie,&#x5FC5;&#x987B;&#x5EFA;&#x7ACB;&#x4E00;&#x7CFB;&#x5217;&#x65B0;&#x65B9;&#x6CD5;,&#x5B50;cookie&#x7684;&#x89E3;&#x6790;&#x548C;&#x5E8F;&#x5217;&#x5316;&#x4F1A;&#x56E0;&#x5B50;cookie&#x7684;&#x671F;&#x671B;&#x7528;&#x9014;&#x800C;&#x7565;&#x6709;&#x4E0D;&#x540C;&#x5E76;&#x66F4;&#x52A0;&#x590D;&#x6742;&#x4E9B;,&#x4F8B;&#x5982;,&#x8981;&#x83B7;&#x5F97;&#x4E00;&#x4E2A;&#x5B50;cookie,&#x9996;&#x5148;&#x8981;&#x9075;&#x5FAA;&#x4E0E;&#x83B7;&#x5F97;cookie&#x4E00;&#x6837;&#x7684;&#x57FA;&#x672C;&#x6B65;&#x9AA4;,&#x4F46;&#x662F;&#x5728;&#x89E3;&#x7801;cookie&#x503C;&#x4E4B;&#x524D;,&#x9700;&#x8981;&#x64CD;&#x4F5C;&#x5B57;&#x7B26;&#x4E32;,&#x904D;&#x5386;&#x6570;&#x7EC4;&#x4E4B;&#x7C7B;&#x7684;&#x64CD;&#x4F5C;&#x6765;&#x627E;&#x51FA;&#x5B50;cookie&#x7684;&#x4FE1;&#x606F;.</p><p><strong>&#x8BF4;&#x660E;: &#x6211;&#x4E0D;&#x77E5;&#x9053;&#x770B;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x670B;&#x53CB;&#x662F;&#x4E0D;&#x662F;&#x4E86;&#x89E3;&#x8FD9;&#x4E9B;&#x64CD;&#x4F5C;cookie&#x7684;&#x65B9;&#x6CD5;,&#x5982;&#x679C;&#x4E0D;&#x4E86;&#x89E3;,&#x6211;&#x5EFA;&#x8BAE;&#x4F60;&#x5148;&#x60F3;&#x4E00;&#x60F3;,&#x7136;&#x540E;&#x5C1D;&#x8BD5;&#x7740;&#x81EA;&#x5DF1;&#x53BB;&#x5199;,&#x7136;&#x540E;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x8BDD;&#x518D;&#x6765;&#x770B;&#x770B;&#x6211;&#x7684;&#x4EE3;&#x7801;,&#x4E5F;&#x53EF;&#x4EE5;&#x5206;&#x4EAB;&#x5230;&#x8BC4;&#x8BBA;&#x533A;,&#x6211;&#x4EEC;&#x4E00;&#x8D77;&#x6765;&#x770B;&#x770B;&#x8FD9;&#x4E9B;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x7684;&#x4F18;&#x52A3;,&#x4E0D;&#x77E5;&#x9053;&#x4E0D;&#x540C;&#x601D;&#x60F3;&#x7684;&#x78B0;&#x649E;&#x4F1A;&#x4E0D;&#x4F1A;&#x64E6;&#x51FA;&#x5947;&#x5999;&#x7684;&#x706B;&#x82B1;&#x5462;?</strong></p><p>&#x64CD;&#x4F5C;&#x5B50;cookie&#x7684;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// &#x64CD;&#x4F5C;&#x5B50;cookie&#x7684;&#x4E00;&#x7EC4;&#x65B9;&#x6CD5;
var SubCookieUtil = {
    // &#x83B7;&#x53D6;cookie, &#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;,cookie&#x540D;&#x548C;&#x5B50;cookie&#x540D;
    // &#x5982;&#x679C;&#x4E0D;&#x7A7F;&#x5B50;cookie&#x540D;,&#x5219;&#x662F;&#x666E;&#x901A;&#x7684;&#x83B7;&#x53D6;&#x65B9;&#x6CD5;,&#x5982;&#x679C;&#x4F20;&#x4E86;,&#x5219;&#x53D6;&#x5BF9;&#x5E94;&#x5B50;cookie&#x540D;&#x7684;value.
    get: function (name, subName) {
        var subCookies = this.getAll(name);
        if(subCookies) {
            return subCookies[subName];
        } else {
            return null;
        }
    },
    // &#x5224;&#x65AD;&#x5982;&#x679C;cookie&#x4E2D;name&#x5BF9;&#x5E94;&#x7684;value&#x4E0D;&#x5305;&#x542B;&#x5B50;cookie,
    // &#x5219;&#x8FD4;&#x56DE;&#x89E3;&#x7801;&#x540E;&#x7684;cookieValue,&#x5982;&#x679C;&#x5305;&#x542B;&#x5B50;cookie,&#x5219;&#x8FD4;&#x56DE;&#x5904;&#x7406;&#x540E;&#x7684;result&#x5BF9;&#x8C61;
    getAll: function (name) {
        var cookieName = encodeURIComponent(name) + &quot;=&quot;,
            cookieStart = document.cookie.indexOf(cookieName),
            cookieEnd,
            result={},
            cookieValue= null,
            i,len,subCookies=&apos;&apos;,
            parts = [];
        if(cookieStart !== -1) {
            cookieEnd = document.cookie.indexOf(&quot;;&quot;, cookieStart);
            if(cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
            if(cookieValue.length &gt; 0) {
                if(cookieValue.indexOf(&quot;&amp;&quot;) &gt; -1) {
                    subCookies = cookieValue.split(&quot;&amp;&quot;);
                    console.log(&quot;get subCookies&quot;,subCookies);
                    for(i = 0,len = subCookies.length; i &lt; len; i++) {
                        parts = subCookies[i].split(&quot;=&quot;);
                        result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                    }
                } else {
                    parts = cookieValue.split(&quot;=&quot;);
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
                }
                return result;
            }
        }
        return null;
        
    },
    // &#x540C;&#x6837;&#x7684;,&#x8981;&#x8BBE;&#x7F6E;&#x5B50;cookie,&#x4E5F;&#x6709;&#x65B0;&#x7684;set&#x65B9;&#x6CD5;
    set: function(name, subName, value, expires, path, domain, secure) {
        
        var subCookies = this.getAll(name) || {};
        subCookies[subName] = value;
        this.setAll(name, subCookies, expires, path, domain, secure);
    },
    setAll: function(name, subCookies, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + &quot;=&quot;,
            subCookieParts = [],
            sub, result;
        // &#x5C06;subCookies&#x5BF9;&#x8C61;&#x91CC;&#x7684;cookie&#x503C;&#x5BF9;&#x7F16;&#x7801;,&#x5E76;&#x653E;&#x8FDB;subCookieParts&#x6570;&#x7EC4;&#x4E2D;
        for(sub in subCookies) {
            if(subCookies.hasOwnProperty(sub)) {
                subCookieParts.push(encodeURIComponent(sub)+ &quot;=&quot; + encodeURIComponent(subCookies[sub]));
            }
        }
        if(subCookieParts.length &gt; 0) {
            cookieText += subCookieParts.join(&quot;&amp;&quot;);
            if(expires instanceof Date) {
                cookieText += &quot;; expires=&quot; + expires.toGMTString();
            }
        } else {
            cookieText += &quot;; expires=&quot; + (new Date(0)).toGMTString();
        }
        if(path) {
            cookieText += &quot;; path=&quot; + path;
        }
        if(domain) {
            cookieText += &quot;; domain=&quot; + domain;
        }
        if(secure) {
            cookieText += &quot;; secure&quot;;
        }
        document.cookie = cookieText;   
    },
    // &#x5220;&#x9664;cookie &#x5220;&#x9664;&#x5355;&#x4E2A;cookie
    unset: function(name, subName, path, domain, secure) {
        var subCookies = this.getAll(name);
        subCookies[subName] ? delete subCookies[subName] : &apos;&apos;;
        this.setAll(name, subCookies, null, path, domain, secure);
    },
    //&#x5220;&#x9664;cookie  &#x5220;&#x9664;&#x591A;&#x4E2A;cookie  
    unsetAll: function (name, path, domain, secure) {
        this.setAll(name, null, new Date(0), path, domain, secure);
    }  
}

// &#x5047;&#x8BBE; document.cookie = &quot;data=name=Nicholas&amp;book=Professional%20JavaScript&quot;
// &#x8BBE;&#x7F6E;&#x4E24;&#x4E2A;cookie
SubCookieUtil.set(&quot;xiaosisi&quot;, &quot;name&quot;, &quot;Nicholas&quot;);
SubCookieUtil.set(&quot;xiaosisi&quot;, &quot;book&quot;, &quot;Professional JavaScript&quot;);
SubCookieUtil.set(&quot;xiaosisi&quot;, &quot;sisisi&quot;, &quot;&#x6495;&#x6495;&#x6495;&quot;);
// &#x8BBE;&#x7F6E;&#x5168;&#x90E8;&#x5B50;cookie&#x548C;&#x5931;&#x6548;&#x65E5;&#x671F;
SubCookieUtil.setAll(&quot;xiaosisi&quot;, {name: &quot;Nicholas&quot;, book:&quot;Professional JavaScript&quot;,  sisisi: &quot;&#x6495;&#x6495;&#x6495;&quot;}, new Date(&quot;2018-10-25&quot;));
// &#x4FEE;&#x6539;&#x540D;&#x5B57;&#x7684;&#x503C;,&#x5E76;&#x4FEE;&#x6539;&#x5931;&#x6548;&#x65E5;&#x671F;
SubCookieUtil.setAll(&quot;xiaosisi&quot;, &quot;name&quot;, &quot;MIrascl&quot;, new Date(&quot;2018-11-25&quot;));

// &#x5220;&#x9664;&#x540D;&#x4E3A;sisisi&#x7684;&#x5B50;cookie
SubCookieUtil.unset(&quot;xiaosisi&quot;, &quot;sisisi&quot;);
// &#x5220;&#x9664;&#x6574;&#x4E2A;cookie
SubCookieUtil.unsetAll(&quot;xiaosisi&quot;);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
<span class="hljs-comment">// &#x64CD;&#x4F5C;&#x5B50;cookie&#x7684;&#x4E00;&#x7EC4;&#x65B9;&#x6CD5;</span>
<span class="hljs-keyword">var</span> SubCookieUtil = {
    <span class="hljs-comment">// &#x83B7;&#x53D6;cookie, &#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;,cookie&#x540D;&#x548C;&#x5B50;cookie&#x540D;</span>
    <span class="hljs-comment">// &#x5982;&#x679C;&#x4E0D;&#x7A7F;&#x5B50;cookie&#x540D;,&#x5219;&#x662F;&#x666E;&#x901A;&#x7684;&#x83B7;&#x53D6;&#x65B9;&#x6CD5;,&#x5982;&#x679C;&#x4F20;&#x4E86;,&#x5219;&#x53D6;&#x5BF9;&#x5E94;&#x5B50;cookie&#x540D;&#x7684;value.</span>
    get: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, subName</span>) </span>{
        <span class="hljs-keyword">var</span> subCookies = <span class="hljs-keyword">this</span>.getAll(name);
        <span class="hljs-keyword">if</span>(subCookies) {
            <span class="hljs-keyword">return</span> subCookies[subName];
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        }
    },
    <span class="hljs-comment">// &#x5224;&#x65AD;&#x5982;&#x679C;cookie&#x4E2D;name&#x5BF9;&#x5E94;&#x7684;value&#x4E0D;&#x5305;&#x542B;&#x5B50;cookie,</span>
    <span class="hljs-comment">// &#x5219;&#x8FD4;&#x56DE;&#x89E3;&#x7801;&#x540E;&#x7684;cookieValue,&#x5982;&#x679C;&#x5305;&#x542B;&#x5B50;cookie,&#x5219;&#x8FD4;&#x56DE;&#x5904;&#x7406;&#x540E;&#x7684;result&#x5BF9;&#x8C61;</span>
    getAll: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name</span>) </span>{
        <span class="hljs-keyword">var</span> cookieName = <span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">&quot;=&quot;</span>,
            cookieStart = <span class="hljs-built_in">document</span>.cookie.indexOf(cookieName),
            cookieEnd,
            result={},
            cookieValue= <span class="hljs-literal">null</span>,
            i,len,subCookies=<span class="hljs-string">&apos;&apos;</span>,
            parts = [];
        <span class="hljs-keyword">if</span>(cookieStart !== <span class="hljs-number">-1</span>) {
            cookieEnd = <span class="hljs-built_in">document</span>.cookie.indexOf(<span class="hljs-string">&quot;;&quot;</span>, cookieStart);
            <span class="hljs-keyword">if</span>(cookieEnd == <span class="hljs-number">-1</span>) {
                cookieEnd = <span class="hljs-built_in">document</span>.cookie.length;
            }
            cookieValue = <span class="hljs-built_in">document</span>.cookie.substring(cookieStart + cookieName.length, cookieEnd);
            <span class="hljs-keyword">if</span>(cookieValue.length &gt; <span class="hljs-number">0</span>) {
                <span class="hljs-keyword">if</span>(cookieValue.indexOf(<span class="hljs-string">&quot;&amp;&quot;</span>) &gt; <span class="hljs-number">-1</span>) {
                    subCookies = cookieValue.split(<span class="hljs-string">&quot;&amp;&quot;</span>);
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;get subCookies&quot;</span>,subCookies);
                    <span class="hljs-keyword">for</span>(i = <span class="hljs-number">0</span>,len = subCookies.length; i &lt; len; i++) {
                        parts = subCookies[i].split(<span class="hljs-string">&quot;=&quot;</span>);
                        result[<span class="hljs-built_in">decodeURIComponent</span>(parts[<span class="hljs-number">0</span>])] = <span class="hljs-built_in">decodeURIComponent</span>(parts[<span class="hljs-number">1</span>]);
                    }
                } <span class="hljs-keyword">else</span> {
                    parts = cookieValue.split(<span class="hljs-string">&quot;=&quot;</span>);
                    result[<span class="hljs-built_in">decodeURIComponent</span>(parts[<span class="hljs-number">0</span>])] = <span class="hljs-built_in">decodeURIComponent</span>(parts[<span class="hljs-number">1</span>])
                }
                <span class="hljs-keyword">return</span> result;
            }
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        
    },
    <span class="hljs-comment">// &#x540C;&#x6837;&#x7684;,&#x8981;&#x8BBE;&#x7F6E;&#x5B50;cookie,&#x4E5F;&#x6709;&#x65B0;&#x7684;set&#x65B9;&#x6CD5;</span>
    set: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, subName, value, expires, path, domain, secure</span>) </span>{
        
        <span class="hljs-keyword">var</span> subCookies = <span class="hljs-keyword">this</span>.getAll(name) || {};
        subCookies[subName] = value;
        <span class="hljs-keyword">this</span>.setAll(name, subCookies, expires, path, domain, secure);
    },
    <span class="hljs-attr">setAll</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, subCookies, expires, path, domain, secure</span>) </span>{
        <span class="hljs-keyword">var</span> cookieText = <span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">&quot;=&quot;</span>,
            subCookieParts = [],
            sub, result;
        <span class="hljs-comment">// &#x5C06;subCookies&#x5BF9;&#x8C61;&#x91CC;&#x7684;cookie&#x503C;&#x5BF9;&#x7F16;&#x7801;,&#x5E76;&#x653E;&#x8FDB;subCookieParts&#x6570;&#x7EC4;&#x4E2D;</span>
        <span class="hljs-keyword">for</span>(sub <span class="hljs-keyword">in</span> subCookies) {
            <span class="hljs-keyword">if</span>(subCookies.hasOwnProperty(sub)) {
                subCookieParts.push(<span class="hljs-built_in">encodeURIComponent</span>(sub)+ <span class="hljs-string">&quot;=&quot;</span> + <span class="hljs-built_in">encodeURIComponent</span>(subCookies[sub]));
            }
        }
        <span class="hljs-keyword">if</span>(subCookieParts.length &gt; <span class="hljs-number">0</span>) {
            cookieText += subCookieParts.join(<span class="hljs-string">&quot;&amp;&quot;</span>);
            <span class="hljs-keyword">if</span>(expires <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>) {
                cookieText += <span class="hljs-string">&quot;; expires=&quot;</span> + expires.toGMTString();
            }
        } <span class="hljs-keyword">else</span> {
            cookieText += <span class="hljs-string">&quot;; expires=&quot;</span> + (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>)).toGMTString();
        }
        <span class="hljs-keyword">if</span>(path) {
            cookieText += <span class="hljs-string">&quot;; path=&quot;</span> + path;
        }
        <span class="hljs-keyword">if</span>(domain) {
            cookieText += <span class="hljs-string">&quot;; domain=&quot;</span> + domain;
        }
        <span class="hljs-keyword">if</span>(secure) {
            cookieText += <span class="hljs-string">&quot;; secure&quot;</span>;
        }
        <span class="hljs-built_in">document</span>.cookie = cookieText;   
    },
    <span class="hljs-comment">// &#x5220;&#x9664;cookie &#x5220;&#x9664;&#x5355;&#x4E2A;cookie</span>
    unset: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, subName, path, domain, secure</span>) </span>{
        <span class="hljs-keyword">var</span> subCookies = <span class="hljs-keyword">this</span>.getAll(name);
        subCookies[subName] ? <span class="hljs-keyword">delete</span> subCookies[subName] : <span class="hljs-string">&apos;&apos;</span>;
        <span class="hljs-keyword">this</span>.setAll(name, subCookies, <span class="hljs-literal">null</span>, path, domain, secure);
    },
    <span class="hljs-comment">//&#x5220;&#x9664;cookie  &#x5220;&#x9664;&#x591A;&#x4E2A;cookie  </span>
    unsetAll: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, path, domain, secure</span>) </span>{
        <span class="hljs-keyword">this</span>.setAll(name, <span class="hljs-literal">null</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">0</span>), path, domain, secure);
    }  
}

<span class="hljs-comment">// &#x5047;&#x8BBE; document.cookie = &quot;data=name=Nicholas&amp;book=Professional%20JavaScript&quot;</span>
<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4E24;&#x4E2A;cookie</span>
SubCookieUtil.set(<span class="hljs-string">&quot;xiaosisi&quot;</span>, <span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;Nicholas&quot;</span>);
SubCookieUtil.set(<span class="hljs-string">&quot;xiaosisi&quot;</span>, <span class="hljs-string">&quot;book&quot;</span>, <span class="hljs-string">&quot;Professional JavaScript&quot;</span>);
SubCookieUtil.set(<span class="hljs-string">&quot;xiaosisi&quot;</span>, <span class="hljs-string">&quot;sisisi&quot;</span>, <span class="hljs-string">&quot;&#x6495;&#x6495;&#x6495;&quot;</span>);
<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5168;&#x90E8;&#x5B50;cookie&#x548C;&#x5931;&#x6548;&#x65E5;&#x671F;</span>
SubCookieUtil.setAll(<span class="hljs-string">&quot;xiaosisi&quot;</span>, {<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Nicholas&quot;</span>, <span class="hljs-attr">book</span>:<span class="hljs-string">&quot;Professional JavaScript&quot;</span>,  <span class="hljs-attr">sisisi</span>: <span class="hljs-string">&quot;&#x6495;&#x6495;&#x6495;&quot;</span>}, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">&quot;2018-10-25&quot;</span>));
<span class="hljs-comment">// &#x4FEE;&#x6539;&#x540D;&#x5B57;&#x7684;&#x503C;,&#x5E76;&#x4FEE;&#x6539;&#x5931;&#x6548;&#x65E5;&#x671F;</span>
SubCookieUtil.setAll(<span class="hljs-string">&quot;xiaosisi&quot;</span>, <span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;MIrascl&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">&quot;2018-11-25&quot;</span>));

<span class="hljs-comment">// &#x5220;&#x9664;&#x540D;&#x4E3A;sisisi&#x7684;&#x5B50;cookie</span>
SubCookieUtil.unset(<span class="hljs-string">&quot;xiaosisi&quot;</span>, <span class="hljs-string">&quot;sisisi&quot;</span>);
<span class="hljs-comment">// &#x5220;&#x9664;&#x6574;&#x4E2A;cookie</span>
SubCookieUtil.unsetAll(<span class="hljs-string">&quot;xiaosisi&quot;</span>);
</code></pre><h2 id="articleHeader9">&#x603B;&#x7ED3;</h2><p>&#x5173;&#x4E8E;cookie&#x6709;&#x4E24;&#x70B9;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5730;&#x65B9;:</p><p>&#x7B2C;&#x4E00;: &#x7531;&#x4E8E;&#x6240;&#x6709;&#x7684;cookie&#x90FD;&#x4F1A;&#x7531;&#x6D4F;&#x89C8;&#x5668;&#x4F5C;&#x4E3A;&#x8BF7;&#x6C42;&#x5934;&#x53D1;&#x9001;,&#x6240;&#x4EE5;&#x5728;cookie&#x4E2D;&#x5B58;&#x50A8;&#x5927;&#x91CF;&#x4FE1;&#x606F;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x7279;&#x5B9A;&#x57DF;&#x7684;&#x8BF7;&#x6C42;&#x6027;&#x80FD;,cookie&#x4FE1;&#x606F;&#x8D8A;&#x5927;,&#x5B8C;&#x6210;&#x5BF9;&#x670D;&#x52A1;&#x5668;&#x8BF7;&#x6C42;&#x7684;&#x65F6;&#x95F4;&#x4E5F;&#x5C31;&#x8D8A;&#x957F;.&#x5C3D;&#x7BA1;&#x6D4F;&#x89C8;&#x5668;&#x5BF9;cookie&#x7684;&#x5927;&#x505A;&#x4E86;&#x9650;&#x5236;,&#x4E0D;&#x8FC7;&#x6700;&#x597D;&#x8FD8;&#x662F;&#x5C3D;&#x53EF;&#x80FD;&#x5728;cookie&#x4E2D;&#x5C11;&#x5B58;&#x50A8;&#x4FE1;&#x606F;,&#x4EE5;&#x514D;&#x5F71;&#x54CD;&#x6027;&#x80FD;.</p><p>&#x7B2C;&#x4E8C;:&#x4E00;&#x5B9A;&#x4E0D;&#x8981;&#x5728;cookie&#x4E2D;&#x5B58;&#x50A8;&#x91CD;&#x8981;&#x548C;&#x654F;&#x611F;&#x7684;&#x6570;&#x636E;.cookie&#x7684;&#x5B58;&#x50A8;&#x4E0D;&#x662F;&#x5F88;&#x5B89;&#x5168;,&#x5176;&#x4E2D;&#x5305;&#x542B;&#x7684;&#x4EFB;&#x4F55;&#x6570;&#x636E;&#x90FD;&#x53EF;&#x4EE5;&#x88AB;&#x4ED6;&#x4EBA;&#x8BBF;&#x95EE;,&#x91CD;&#x8981;&#x7684;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x4E0D;&#x5EFA;&#x8BAE;&#x5B58;&#x50A8;&#x5728;cookie&#x91CC;.</p><p>&#x5982;&#x679C;&#x8BFB;&#x8005;&#x4EEC;&#x6709;&#x5173;&#x4E8E;cookie&#x7684;&#x6BD4;&#x8F83;&#x597D;&#x7684;&#x4F7F;&#x7528;&#x7B56;&#x7565;&#x6B22;&#x8FCE;&#x5728;&#x8BC4;&#x8BBA;&#x533A;&#x7559;&#x8A00;&#x6216;&#x8005;&#x79C1;&#x4FE1;&#x6211;&#x5965;~&#x5171;&#x540C;&#x8FDB;&#x6B65;&#x662F;&#x6700;&#x8BA9;&#x4EBA;&#x5F00;&#x5FC3;&#x7684;&#x4E8B;&#x513F;&#x5462;~~~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈谈我熟悉又陌生的cookie

## 原文链接
[https://segmentfault.com/a/1190000015281164](https://segmentfault.com/a/1190000015281164)

