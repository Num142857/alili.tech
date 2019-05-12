---
title: 'JavaScript异步编程' 
date: 2018-11-22 2:30:10
hidden: true
slug: tbccta00dp9
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p>&#x4ECE;&#x6211;&#x4EEC;&#x4E00;&#x5F00;&#x59CB;&#x5B66;&#x4E60;JavaScript&#x7684;&#x65F6;&#x5019;&#x5C31;&#x542C;&#x5230;&#x8FC7;&#x4E00;&#x6BB5;&#x8BDD;&#xFF1A;<strong>JS&#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x7684;&#xFF0C;&#x5929;&#x751F;&#x5F02;&#x6B65;&#xFF0C;&#x9002;&#x5408;IO&#x5BC6;&#x96C6;&#x578B;&#xFF0C;&#x4E0D;&#x9002;&#x5408;CPU&#x5BC6;&#x96C6;&#x578B;</strong>&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x591A;&#x6570;JavaScript&#x5F00;&#x53D1;&#x8005;&#x4ECE;&#x6765;&#x6CA1;&#x6709;&#x8BA4;&#x771F;&#x601D;&#x8003;&#x8FC7;&#x81EA;&#x5DF1;&#x7A0B;&#x5E8F;&#x4E2D;&#x7684;&#x5F02;&#x6B65;&#x5230;&#x5E95;&#x662F;&#x600E;&#x4E48;&#x51FA;&#x73B0;&#x7684;&#xFF0C;&#x4EE5;&#x53CA;&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x51FA;&#x73B0;&#xFF0C;&#x4E5F;&#x6CA1;&#x6709;&#x63A2;&#x7D22;&#x8FC7;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x7684;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#x3002;&#x5230;&#x76EE;&#x524D;&#x4E3A;&#x6B62;&#xFF0C;&#x8FD8;&#x6709;&#x5F88;&#x591A;&#x4EBA;&#x575A;&#x6301;&#x8BA4;&#x4E3A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5C31;&#x5B8C;&#x5168;&#x591F;&#x7528;&#x4E86;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;&#x968F;&#x7740;JavaScript&#x9762;&#x4E34;&#x7684;&#x9700;&#x6C42;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x8FD0;&#x884C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x3001;&#x670D;&#x52A1;&#x5668;&#x3001;&#x751A;&#x81F3;&#x662F;&#x5D4C;&#x5165;&#x5F0F;&#x8BBE;&#x5907;&#x4E0A;&#xFF0C;&#x4E3A;&#x4E86;&#x6EE1;&#x8DB3;&#x8FD9;&#x4E9B;&#x9700;&#x6C42;&#xFF0C;JavaScript&#x7684;&#x89C4;&#x6A21;&#x548C;&#x590D;&#x6742;&#x6027;&#x4E5F;&#x5728;&#x6301;&#x7EED;&#x589E;&#x957F;&#xFF0C;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6765;&#x7BA1;&#x7406;&#x5F02;&#x6B65;&#x4E5F;&#x8D8A;&#x6765;&#x8D8A;&#x8BA9;&#x4EBA;&#x75DB;&#x82E6;&#xFF0C;&#x8FD9;&#x4E00;&#x5207;&#xFF0C;&#x90FD;&#x9700;&#x8981;&#x66F4;&#x5F3A;&#x5927;&#x3001;&#x66F4;&#x5408;&#x7406;&#x7684;&#x5F02;&#x6B65;&#x65B9;&#x6CD5;&#xFF0C;&#x901A;&#x8FC7;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x6211;&#x60F3;&#x5BF9;&#x76EE;&#x524D;&#x5DF2;&#x6709;JavaScript&#x5F02;&#x6B65;&#x7684;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#x505A;&#x4E00;&#x4E2A;&#x603B;&#x7ED3;&#xFF0C;&#x540C;&#x65F6;&#x8BD5;&#x7740;&#x53BB;&#x89E3;&#x91CA;&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x51FA;&#x73B0;&#x8FD9;&#x4E9B;&#x6280;&#x672F;&#xFF0C;&#x8BA9;&#x5927;&#x5BB6;&#x5BF9;JavaScript&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x6709;&#x4E00;&#x4E2A;&#x66F4;&#x5B8F;&#x89C2;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x8BA9;&#x77E5;&#x8BC6;&#x53D8;&#x5F97;&#x66F4;&#x4F53;&#x7CFB;&#x5316;&#x4E00;&#x4E9B;&#x3002;</p><p>&#x672C;&#x6587;&#x4E5F;&#x4F1A;&#x540C;&#x6B65;&#x5230;&#x6211;&#x7684;<a href="http://blog.liuxuan.site" rel="nofollow noreferrer" target="_blank">&#x4E2A;&#x4EBA;&#x7F51;&#x7AD9;</a>&#x3002;</p><h1 id="articleHeader1">&#x6B63;&#x6587;</h1><h2 id="articleHeader2">Step1 - &#x56DE;&#x8C03;&#x51FD;&#x6570;</h2><p>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5927;&#x5BB6;&#x80AF;&#x5B9A;&#x90FD;&#x4E0D;&#x964C;&#x751F;&#xFF0C;&#x4ECE;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x6BB5;&#x6700;&#x7B80;&#x5355;&#x7684;&#x5B9A;&#x65F6;&#x5668;&#x5F00;&#x59CB;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function () {
    console.log(&apos;Time out&apos;);
}, 1000);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Time out&apos;</span>);
}, <span class="hljs-number">1000</span>);</code></pre><p>&#x5B9A;&#x65F6;&#x5668;&#x91CC;&#x9762;&#x7684;&#x533F;&#x540D;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;JS&#x4E2D;&#x51FD;&#x6570;&#x662F;&#x4E00;&#x7B49;&#x516C;&#x6C11;&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x53EF;&#x4EE5;&#x50CF;&#x5176;&#x4ED6;&#x53D8;&#x91CF;&#x4E00;&#x6837;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x4F20;&#x9012;&#x3002;&#x8FD9;&#x6837;&#x770B;&#x6765;&#xFF0C;&#x901A;&#x8FC7;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6765;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x633A;&#x597D;&#x7684;&#xFF0C;&#x5199;&#x7740;&#x4E5F;&#x987A;&#x624B;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x7528;&#x522B;&#x7684;&#x65B9;&#x6CD5;&#x5462;&#xFF1F;</p><p>&#x6211;&#x4EEC;&#x6765;&#x770B;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015711832?w=780&amp;h=786" src="https://static.alili.tech/img/remote/1460000015711832?w=780&amp;h=786" alt="http-1" title="http-1" style="cursor:pointer"></span></p><p>&#x4E0A;&#x9762;&#x662F;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x7684;&#x767B;&#x5F55;&#x65F6;&#x5E8F;&#x56FE;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x9700;&#x6C42;&#x548C;&#x5B83;&#x7C7B;&#x4F3C;&#x4F46;&#x53C8;&#x6709;&#x4E9B;&#x5DEE;&#x522B;&#xFF0C;&#x60F3;&#x8981;&#x83B7;&#x53D6;&#x4E00;&#x6BB5;&#x4E1A;&#x52A1;&#x6570;&#x636E;&#xFF0C;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x5206;&#x4E3A;3&#x6B65;&#xFF1A;</p><ol><li>&#x8C03;&#x7528;&#x79D8;&#x94A5;&#x63A5;&#x53E3;&#xFF0C;&#x83B7;&#x53D6;key</li><li>&#x643A;&#x5E26;key&#x8C03;&#x7528;&#x767B;&#x5F55;&#x63A5;&#x53E3;&#xFF0C;&#x83B7;&#x53D6;token&#x548C;userId</li><li>&#x643A;&#x5E26;token&#x548C;userId&#x8C03;&#x7528;&#x4E1A;&#x52A1;&#x63A5;&#x53E3;&#xFF0C;&#x83B7;&#x53D6;&#x6570;&#x636E;</li></ol><p>&#x53EF;&#x80FD;&#x4E0A;&#x8FF0;&#x6B65;&#x9AA4;&#x548C;&#x5B9E;&#x9645;&#x4E1A;&#x52A1;&#x4E2D;&#x7684;&#x6709;&#x4E9B;&#x51FA;&#x5165;&#xFF0C;&#x4F46;&#x662F;&#x5374;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x8BF4;&#x660E;&#x95EE;&#x9898;&#xFF0C;&#x8BF7;&#x5927;&#x5BB6;&#x8C05;&#x89E3;&#x3002;</p><p><strong>&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#x6765;&#x5B9E;&#x73B0;&#x4E0A;&#x8FF0;&#x9700;&#x6C42;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let key, token, userId;

$.ajax({
    type: &apos;get&apos;,
    url: &apos;http://localhost:3000/apiKey&apos;,
    success: function (data) {
        key = data;
        
        $.ajax({
            type: &apos;get&apos;,
            url: &apos;http://localhost:3000/getToken&apos;,
            data: {
                key: key
            },
            success: function (data) {
                token = data.token;
                userId = data.userId;
                
                $.ajax({
                    type: &apos;get&apos;,
                    url: &apos;http://localhost:3000/getData&apos;,
                    data: {
                        token: token,
                        userId: userId
                    },
                    success: function (data) {
                        console.log(&apos;&#x4E1A;&#x52A1;&#x6570;&#x636E;&#xFF1A;&apos;, data);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            },
            error: function (err) {
                console.log(err);
            }
        });
    },
    error: function (err) {
        console.log(err);
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scilab"><code>let key, token, userId;

$.ajax({
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&apos;get&apos;</span>,
    url: <span class="hljs-string">&apos;http://localhost:3000/apiKey&apos;</span>,
    success: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(data)</span> {</span>
        key = data;
        
        $.ajax({
            <span class="hljs-built_in">type</span>: <span class="hljs-string">&apos;get&apos;</span>,
            url: <span class="hljs-string">&apos;http://localhost:3000/getToken&apos;</span>,
            data: {
                key: key
            },
            success: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(data)</span> {</span>
                token = data.token;
                userId = data.userId;
                
                $.ajax({
                    <span class="hljs-built_in">type</span>: <span class="hljs-string">&apos;get&apos;</span>,
                    url: <span class="hljs-string">&apos;http://localhost:3000/getData&apos;</span>,
                    data: {
                        token: token,
                        userId: userId
                    },
                    success: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(data)</span> {</span>
                        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;&#x4E1A;&#x52A1;&#x6570;&#x636E;&#xFF1A;&apos;</span>, data);
                    },
                    <span class="hljs-built_in">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err)</span> {</span>
                        console.<span class="hljs-built_in">log</span>(err);
                    }
                });
            },
            <span class="hljs-built_in">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err)</span> {</span>
                console.<span class="hljs-built_in">log</span>(err);
            }
        });
    },
    <span class="hljs-built_in">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err)</span> {</span>
        console.<span class="hljs-built_in">log</span>(err);
    }
});</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x6574;&#x6BB5;&#x4EE3;&#x7801;&#x5145;&#x6EE1;&#x4E86;&#x56DE;&#x8C03;&#x5D4C;&#x5957;&#xFF0C;&#x4EE3;&#x7801;&#x4E0D;&#x4EC5;&#x5728;&#x7EB5;&#x5411;&#x6269;&#x5C55;&#xFF0C;&#x6A2A;&#x5411;&#x4E5F;&#x5728;&#x6269;&#x5C55;&#x3002;&#x6211;&#x76F8;&#x4FE1;&#xFF0C;&#x5BF9;&#x4E8E;&#x4EFB;&#x4F55;&#x4EBA;&#x6765;&#x8BF4;&#xFF0C;&#x8C03;&#x8BD5;&#x8D77;&#x6765;&#x90FD;&#x4F1A;&#x5F88;&#x56F0;&#x96BE;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x5F97;&#x4E0D;&#x4ECE;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x8DF3;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;&#xFF0C;&#x518D;&#x8DF3;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;&#xFF0C;&#x5728;&#x6574;&#x4E2A;&#x4EE3;&#x7801;&#x4E2D;&#x8DF3;&#x6765;&#x8DF3;&#x53BB;&#x4EE5;&#x67E5;&#x770B;&#x6D41;&#x7A0B;&#xFF0C;&#x800C;&#x6700;&#x7EC8;&#x7684;&#x7ED3;&#x679C;&#x85CF;&#x5728;&#x6574;&#x6BB5;&#x4EE3;&#x7801;&#x7684;&#x4E2D;&#x95F4;&#x4F4D;&#x7F6E;&#x3002;&#x771F;&#x5B9E;&#x7684;JavaScript&#x7A0B;&#x5E8F;&#x4EE3;&#x7801;&#x53EF;&#x80FD;&#x8981;&#x6DF7;&#x4E71;&#x7684;&#x591A;&#xFF0C;&#x4F7F;&#x5F97;&#x8FD9;&#x79CD;&#x8FFD;&#x8E2A;&#x96BE;&#x5EA6;&#x4F1A;&#x6210;&#x500D;&#x589E;&#x52A0;&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x5E38;&#x8BF4;&#x7684;<strong>&#x56DE;&#x8C03;&#x5730;&#x72F1;&#xFF08;Callback Hell&#xFF09;</strong>&#x3002;</p><p>&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x51FA;&#x73B0;&#x8FD9;&#x79CD;&#x73B0;&#x8C61;&#xFF1F;</p><p><strong>&#x5982;&#x679C;&#x67D0;&#x4E2A;&#x4E1A;&#x52A1;&#xFF0C;&#x4F9D;&#x8D56;&#x4E8E;&#x4E0A;&#x5C42;&#x4E1A;&#x52A1;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x4E0A;&#x5C42;&#x4E1A;&#x52A1;&#x53C8;&#x4F9D;&#x8D56;&#x4E8E;&#x66F4;&#x4E0A;&#x4E00;&#x5C42;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x91C7;&#x7528;&#x56DE;&#x8C03;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x4F1A;&#x51FA;&#x73B0;&#x56DE;&#x8C03;&#x5730;&#x72F1;</strong>&#x3002;</p><p>&#x5927;&#x8111;&#x5BF9;&#x4E8E;&#x4E8B;&#x60C5;&#x7684;&#x8BA1;&#x5212;&#x65B9;&#x5F0F;&#x662F;&#x7EBF;&#x6027;&#x7684;&#x3001;&#x963B;&#x585E;&#x7684;&#x3001;&#x5355;&#x7EBF;&#x7A0B;&#x7684;&#x8BED;&#x4E49;&#xFF0C;&#x4F46;&#x662F;&#x56DE;&#x8C03;&#x8868;&#x8FBE;&#x5F02;&#x6B65;&#x6D41;&#x7A0B;&#x7684;&#x65B9;&#x5F0F;&#x662F;&#x975E;&#x7EBF;&#x6027;&#x7684;&#x3001;&#x975E;&#x987A;&#x5E8F;&#x7684;&#xFF0C;&#x8FD9;&#x4F7F;&#x5F97;&#x6B63;&#x786E;&#x63A8;&#x5BFC;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x7684;&#x96BE;&#x5EA6;&#x5F88;&#x5927;&#xFF0C;&#x5F88;&#x5BB9;&#x6613;&#x4EA7;&#x751F;Bug&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5F15;&#x51FA;&#x4E86;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x89E3;&#x51B3;&#x5F02;&#x6B65;&#x7684;<strong>&#x7B2C;1&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x56DE;&#x8C03;&#x5730;&#x72F1;</strong>&#x3002;</p><p>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8FD8;&#x4F1A;&#x5B58;&#x5728;&#x522B;&#x7684;&#x95EE;&#x9898;&#x5417;&#xFF1F;<br>&#x8BA9;&#x6211;&#x4EEC;&#x518D;&#x6DF1;&#x5165;&#x601D;&#x8003;&#x4E00;&#x4E0B;&#x56DE;&#x8C03;&#x7684;&#x6982;&#x5FF5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// A
$.ajax({
    ...
    success: function (...) {
        // C
    }
});
// B" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">// A</span>
$.ajax({
    ...
    success: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-rest_arg">...) {
        // C</span>
    }
})</span></span>;
<span class="hljs-comment">// B</span></code></pre><p>A&#x548C;B&#x53D1;&#x751F;&#x4E8E;&#x73B0;&#x5728;&#xFF0C;&#x5728;JavaScript&#x4E3B;&#x7A0B;&#x5E8F;&#x7684;&#x76F4;&#x63A5;&#x63A7;&#x5236;&#x4E4B;&#x4E0B;&#xFF0C;&#x800C;C&#x4F1A;&#x5EF6;&#x8FDF;&#x5230;&#x5C06;&#x6765;&#x53D1;&#x751F;&#xFF0C;&#x5E76;&#x4E14;&#x662F;&#x5728;&#x7B2C;&#x4E09;&#x65B9;&#x7684;&#x63A7;&#x5236;&#x4E0B;&#xFF0C;&#x5728;&#x672C;&#x4F8B;&#x4E2D;&#x5C31;&#x662F;&#x51FD;&#x6570;$.ajax(...)&#x3002;&#x4ECE;&#x6839;&#x672C;&#x4E0A;&#x6765;&#x8BF4;&#xFF0C;&#x8FD9;&#x79CD;&#x63A7;&#x5236;&#x7684;&#x8F6C;&#x79FB;&#x901A;&#x5E38;&#x4E0D;&#x4F1A;&#x7ED9;&#x7A0B;&#x5E8F;&#x5E26;&#x6765;&#x5F88;&#x591A;&#x95EE;&#x9898;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;&#x8BF7;&#x4E0D;&#x8981;&#x88AB;&#x8FD9;&#x4E2A;&#x5C0F;&#x6982;&#x7387;&#x8FF7;&#x60D1;&#x800C;&#x8BA4;&#x4E3A;&#x8FD9;&#x79CD;&#x63A7;&#x5236;&#x5207;&#x6362;&#x4E0D;&#x662F;&#x4EC0;&#x4E48;&#x5927;&#x95EE;&#x9898;&#x3002;&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x8FD9;&#x662F;&#x56DE;&#x8C03;&#x9A71;&#x52A8;&#x8BBE;&#x8BA1;&#x6700;&#x4E25;&#x91CD;&#xFF08;&#x4E5F;&#x662F;&#x6700;&#x5FAE;&#x5999;&#xFF09;&#x7684;&#x95EE;&#x9898;&#x3002;&#x5B83;&#x4EE5;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x601D;&#x8DEF;&#x4E3A;&#x4E2D;&#x5FC3;&#xFF1A;&#x6709;&#x65F6;&#x5019;ajax(...)&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4F60;&#x4EA4;&#x4ED8;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x4E0D;&#x662F;&#x4F60;&#x7F16;&#x5199;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4E5F;&#x4E0D;&#x5728;&#x4F60;&#x7684;&#x76F4;&#x63A5;&#x63A7;&#x5236;&#x4E4B;&#x4E0B;&#xFF0C;&#x5B83;&#x662F;&#x67D0;&#x4E2A;&#x7B2C;&#x4E09;&#x65B9;&#x63D0;&#x4F9B;&#x7684;&#x5DE5;&#x5177;&#x3002;</p><p>&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x79F0;&#x4E3A;<strong>&#x63A7;&#x5236;&#x53CD;&#x8F6C;</strong>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x628A;&#x81EA;&#x5DF1;&#x7A0B;&#x5E8F;&#x4E00;&#x90E8;&#x5206;&#x7684;&#x6267;&#x884C;&#x63A7;&#x5236;&#x4EA4;&#x7ED9;&#x67D0;&#x4E2A;&#x7B2C;&#x4E09;&#x65B9;&#xFF0C;&#x5728;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x548C;&#x7B2C;&#x4E09;&#x65B9;&#x5DE5;&#x5177;&#x76F4;&#x63A5;&#x6709;&#x4E00;&#x4EFD;&#x5E76;&#x6CA1;&#x6709;&#x660E;&#x786E;&#x8868;&#x8FBE;&#x7684;&#x5951;&#x7EA6;&#x3002;</p><p>&#x65E2;&#x7136;&#x662F;&#x65E0;&#x6CD5;&#x63A7;&#x5236;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5728;&#x6267;&#x884C;&#x4F60;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x6709;&#x53EF;&#x80FD;&#x5B58;&#x5728;&#x4EE5;&#x4E0B;&#x95EE;&#x9898;&#xFF0C;&#x5F53;&#x7136;&#x901A;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#x662F;&#x4E0D;&#x4F1A;&#x53D1;&#x751F;&#x7684;&#xFF1A;</p><ol><li>&#x8C03;&#x7528;&#x56DE;&#x8C03;&#x8FC7;&#x65E9;</li><li>&#x8C03;&#x7528;&#x56DE;&#x8C03;&#x8FC7;&#x665A;</li><li>&#x8C03;&#x7528;&#x56DE;&#x8C03;&#x6B21;&#x6570;&#x592A;&#x591A;&#x6216;&#x8005;&#x592A;&#x5C11;</li><li>&#x672A;&#x80FD;&#x628A;&#x6240;&#x9700;&#x7684;&#x53C2;&#x6570;&#x6210;&#x529F;&#x4F20;&#x7ED9;&#x4F60;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</li><li>&#x541E;&#x6389;&#x53EF;&#x80FD;&#x51FA;&#x73B0;&#x7684;&#x9519;&#x8BEF;&#x6216;&#x5F02;&#x5E38;</li><li>......</li></ol><p>&#x8FD9;&#x79CD;&#x63A7;&#x5236;&#x53CD;&#x8F6C;&#x4F1A;&#x5BFC;&#x81F4;&#x4FE1;&#x4EFB;&#x94FE;&#x7684;&#x5B8C;&#x5168;&#x65AD;&#x88C2;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x6CA1;&#x6709;&#x91C7;&#x53D6;&#x884C;&#x52A8;&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E9B;&#x63A7;&#x5236;&#x53CD;&#x8F6C;&#x5BFC;&#x81F4;&#x7684;&#x4FE1;&#x4EFB;&#x95EE;&#x9898;&#xFF0C;&#x90A3;&#x4E48;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x9690;&#x85CF;&#x7684;Bug&#xFF0C;&#x5C3D;&#x7BA1;&#x6211;&#x4EEC;&#x5927;&#x591A;&#x6570;&#x4EBA;&#x90FD;&#x6CA1;&#x6709;&#x8FD9;&#x6837;&#x505A;&#x3002;</p><p>&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x5F15;&#x51FA;&#x4E86;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x7684;<strong>&#x7B2C;&#x4E8C;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x63A7;&#x5236;&#x53CD;&#x8F6C;</strong>&#x3002;</p><p>&#x7EFC;&#x4E0A;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x6D41;&#x7A0B;&#x5B58;&#x5728;2&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><p><strong>1. &#x7F3A;&#x4E4F;&#x987A;&#x5E8F;&#x6027;&#xFF1A; &#x56DE;&#x8C03;&#x5730;&#x72F1;&#x5BFC;&#x81F4;&#x7684;&#x8C03;&#x8BD5;&#x56F0;&#x96BE;&#xFF0C;&#x548C;&#x5927;&#x8111;&#x7684;&#x601D;&#x7EF4;&#x65B9;&#x5F0F;&#x4E0D;&#x7B26;</strong><br><strong>2. &#x7F3A;&#x4E4F;&#x53EF;&#x4FE1;&#x4EFB;&#x6027;&#xFF1A; &#x63A7;&#x5236;&#x53CD;&#x8F6C;&#x5BFC;&#x81F4;&#x7684;&#x4E00;&#x7CFB;&#x5217;&#x4FE1;&#x4EFB;&#x95EE;&#x9898;</strong></p><p>&#x90A3;&#x4E48;&#x5982;&#x4F55;&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E24;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5148;&#x9A71;&#x8005;&#x4EEC;&#x5F00;&#x59CB;&#x4E86;&#x63A2;&#x7D22;&#x4E4B;&#x8DEF;......</p><h2 id="articleHeader3">Step2 - Promise</h2><p><strong>&#x5F00;&#x95E8;&#x89C1;&#x5C71;&#xFF0C;Promise&#x89E3;&#x51B3;&#x7684;&#x662F;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x7684;&#x7B2C;2&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x63A7;&#x5236;&#x53CD;&#x8F6C;</strong>&#x3002;</p><p>&#x81F3;&#x4E8E;Promise&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x5927;&#x5BB6;&#x80AF;&#x5B9A;&#x90FD;&#x6709;&#x6240;&#x4E86;&#x89E3;&#xFF0C;&#x8FD9;&#x91CC;&#x662F;<a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">PromiseA+&#x89C4;&#x8303;</a>&#xFF0C;ES6&#x7684;Promise&#x4E5F;&#x597D;&#xFF0C;jQuery&#x7684;Promise&#x4E5F;&#x597D;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x5E93;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x4F46;&#x662F;&#x5927;&#x5BB6;&#x9075;&#x5FAA;&#x7684;&#x90FD;&#x662F;&#x540C;&#x4E00;&#x5957;&#x89C4;&#x8303;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;Promise&#x5E76;&#x4E0D;&#x6307;&#x7279;&#x5B9A;&#x7684;&#x67D0;&#x4E2A;&#x5B9E;&#x73B0;&#xFF0C;<strong>&#x5B83;&#x662F;&#x4E00;&#x79CD;&#x89C4;&#x8303;&#xFF0C;&#x662F;&#x4E00;&#x5957;&#x5904;&#x7406;JavaScript&#x5F02;&#x6B65;&#x7684;&#x673A;&#x5236;</strong>&#x3002;</p><p>&#x6211;&#x4EEC;&#x628A;&#x4E0A;&#x9762;&#x90A3;&#x4E2A;&#x591A;&#x5C42;&#x56DE;&#x8C03;&#x5D4C;&#x5957;&#x7684;&#x4F8B;&#x5B50;&#x7528;Promise&#x7684;&#x65B9;&#x5F0F;&#x91CD;&#x6784;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let getKeyPromise = function () {
    return new Promsie(function (resolve, reject) {
        $.ajax({
            type: &apos;get&apos;,
            url: &apos;http://localhost:3000/apiKey&apos;,
            success: function (data) {
               let key = data;
               resolve(key);         
            },
            error: function (err) {
                reject(err);
            }
        });
    });
};

let getTokenPromise = function (key) {
    return new Promsie(function (resolve, reject) {
        $.ajax({
            type: &apos;get&apos;,
            url: &apos;http://localhost:3000/getToken&apos;,
            data: {
                key: key
            },
            success: function (data) {
                resolve(data);         
            },
            error: function (err) {
                reject(err);
            }
        });
    });
};

let getDataPromise = function (data) {
    let token = data.token;
    let userId = data.userId;
    
    return new Promsie(function (resolve, reject) {
        $.ajax({
            type: &apos;get&apos;,
            url: &apos;http://localhost:3000/getData&apos;,
            data: {
                token: token,
                userId: userId
            },
            success: function (data) {
                resolve(data);         
            },
            error: function (err) {
                reject(err);
            }
        });
    });
};

getKeyPromise()
    .then(function (key) {
        return getTokenPromise(key);
    })
    .then(function (data) {
        return getDataPromise(data);
    })
    .then(function (data) {
        console.log(&apos;&#x4E1A;&#x52A1;&#x6570;&#x636E;&#xFF1A;&apos;, data);
    })
    .catch(function (err) {
        console.log(err);
    }); " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
<span class="hljs-keyword">let</span> getKeyPromise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promsie(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        $.ajax({
            <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;get&apos;</span>,
            <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://localhost:3000/apiKey&apos;</span>,
            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
               <span class="hljs-keyword">let</span> key = data;
               resolve(key);         
            },
            <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
                reject(err);
            }
        });
    });
};

<span class="hljs-keyword">let</span> getTokenPromise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promsie(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        $.ajax({
            <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;get&apos;</span>,
            <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://localhost:3000/getToken&apos;</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">key</span>: key
            },
            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
                resolve(data);         
            },
            <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
                reject(err);
            }
        });
    });
};

<span class="hljs-keyword">let</span> getDataPromise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">let</span> token = data.token;
    <span class="hljs-keyword">let</span> userId = data.userId;
    
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promsie(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        $.ajax({
            <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;get&apos;</span>,
            <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://localhost:3000/getData&apos;</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">token</span>: token,
                <span class="hljs-attr">userId</span>: userId
            },
            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
                resolve(data);         
            },
            <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
                reject(err);
            }
        });
    });
};

getKeyPromise()
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
        <span class="hljs-keyword">return</span> getTokenPromise(key);
    })
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
        <span class="hljs-keyword">return</span> getDataPromise(data);
    })
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x4E1A;&#x52A1;&#x6570;&#x636E;&#xFF1A;&apos;</span>, data);
    })
    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
        <span class="hljs-built_in">console</span>.log(err);
    }); </code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;Promise&#x5728;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x4E0A;&#x5176;&#x5B9E;&#x6539;&#x5584;&#x4E86;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x4E66;&#x5199;&#x65B9;&#x5F0F;&#xFF0C;&#x6700;&#x660E;&#x663E;&#x7684;&#x4E00;&#x70B9;&#x5C31;&#x662F;&#x53BB;&#x9664;&#x4E86;&#x6A2A;&#x5411;&#x6269;&#x5C55;&#xFF0C;&#x65E0;&#x8BBA;&#x6709;&#x518D;&#x591A;&#x7684;&#x4E1A;&#x52A1;&#x4F9D;&#x8D56;&#xFF0C;&#x901A;&#x8FC7;&#x591A;&#x4E2A;then(...)&#x6765;&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x8BA9;&#x4EE3;&#x7801;&#x53EA;&#x5728;&#x7EB5;&#x5411;&#x8FDB;&#x884C;&#x6269;&#x5C55;&#xFF1B;&#x53E6;&#x5916;&#x4E00;&#x70B9;&#x5C31;&#x662F;&#x903B;&#x8F91;&#x6027;&#x66F4;&#x660E;&#x663E;&#x4E86;&#xFF0C;&#x5C06;&#x5F02;&#x6B65;&#x4E1A;&#x52A1;&#x63D0;&#x53D6;&#x6210;&#x5355;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x662F;&#x4E00;&#x6B65;&#x6B65;&#x5411;&#x4E0B;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x4F9D;&#x8D56;&#x5C42;&#x7EA7;&#x4E5F;&#x5F88;&#x6E05;&#x6670;&#xFF0C;&#x6700;&#x540E;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#x662F;&#x5728;&#x6574;&#x4E2A;&#x4EE3;&#x7801;&#x7684;&#x6700;&#x540E;&#x4E00;&#x6B65;&#x83B7;&#x5F97;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;Promise&#x5728;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x4E0A;&#x89E3;&#x51B3;&#x4E86;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x4E66;&#x5199;&#x7ED3;&#x6784;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4F9D;&#x7136;&#x5728;&#x4E3B;&#x6D41;&#x7A0B;&#x4E0A;&#x5B58;&#x5728;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x90FD;&#x653E;&#x5230;&#x4E86;then(...)&#x91CC;&#x9762;&#xFF0C;&#x548C;&#x6211;&#x4EEC;&#x5927;&#x8111;&#x987A;&#x5E8F;&#x7EBF;&#x6027;&#x7684;&#x601D;&#x7EF4;&#x903B;&#x8F91;&#x8FD8;&#x662F;&#x6709;&#x51FA;&#x5165;&#x7684;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6211;&#x60F3;&#x4E3B;&#x8981;&#x8BA8;&#x8BBA;&#x7684;&#x662F;&#xFF0C;<strong>Promise&#x662F;&#x5982;&#x4F55;&#x89E3;&#x51B3;&#x63A7;&#x5236;&#x53CD;&#x8F6C;&#x5E26;&#x6765;&#x7684;&#x4FE1;&#x4EFB;&#x7F3A;&#x5931;&#x95EE;&#x9898;&#x3002;</strong></p><p>&#x9996;&#x5148;&#x660E;&#x786E;&#x4E00;&#x70B9;&#xFF0C;Promise&#x53EF;&#x4EE5;&#x4FDD;&#x8BC1;&#x4EE5;&#x4E0B;&#x60C5;&#x51B5;&#xFF0C;&#x5F15;&#x7528;&#x81EA;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises" rel="nofollow noreferrer" target="_blank">JavaScript | MDN</a>&#xFF1A;</p><blockquote><ol><li>&#x5728;JavaScript&#x4E8B;&#x4EF6;&#x961F;&#x5217;&#x7684;&#x5F53;&#x524D;&#x8FD0;&#x884C;&#x5B8C;&#x6210;&#x4E4B;&#x524D;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x88AB;&#x8C03;&#x7528;</li><li>&#x901A;&#x8FC7; .then &#x5F62;&#x5F0F;&#x6DFB;&#x52A0;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x751A;&#x81F3;&#x90FD;&#x5728;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x624D;&#x88AB;&#x6DFB;&#x52A0;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x90FD;&#x4F1A;&#x88AB;&#x8C03;&#x7528;</li><li>&#x901A;&#x8FC7;&#x591A;&#x6B21;&#x8C03;&#x7528; .then&#xFF0C;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x591A;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x4EEC;&#x4F1A;&#x6309;&#x7167;&#x63D2;&#x5165;&#x987A;&#x5E8F;&#x5E76;&#x4E14;&#x72EC;&#x7ACB;&#x8FD0;&#x884C;</li></ol></blockquote><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x9488;&#x5BF9;&#x524D;&#x9762;&#x63D0;&#x8FC7;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x5BFC;&#x81F4;&#x7684;&#x4E00;&#x7CFB;&#x5217;&#x4FE1;&#x4EFB;&#x95EE;&#x9898;&#x6765;&#x8BA8;&#x8BBA;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x7528;Promise&#x6765;&#x5904;&#x7406;&#xFF0C;&#x662F;&#x5426;&#x8FD8;&#x4F1A;&#x5B58;&#x5728;&#x8FD9;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x5F53;&#x7136;&#x524D;&#x63D0;&#x662F;&#x5B9E;&#x73B0;&#x7684;Promise&#x5B8C;&#x5168;&#x9075;&#x5FAA;<strong><a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">PromiseA+&#x89C4;&#x8303;</a></strong>&#x3002;</p><h3 id="articleHeader4">&#x8C03;&#x7528;&#x8FC7;&#x65E9;</h3><p>&#x5F53;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x65E0;&#x6CD5;&#x4FDD;&#x8BC1;&#x6216;&#x8005;&#x4E0D;&#x77E5;&#x9053;&#x7B2C;&#x4E09;&#x65B9;&#x5BF9;&#x4E8E;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x662F;&#x4F55;&#x79CD;&#x5F62;&#x5F0F;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x5B83;&#x5728;&#x67D0;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x662F;&#x7ACB;&#x5373;&#x5B8C;&#x6210;&#x4EE5;&#x540C;&#x6B65;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x8C03;&#x7528;&#xFF0C;&#x90A3;&#x53EF;&#x80FD;&#x5C31;&#x4F1A;&#x5BFC;&#x81F4;&#x6211;&#x4EEC;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x903B;&#x8F91;&#x9519;&#x8BEF;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;&#x6839;&#x636E;<a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">PromiseA+&#x89C4;&#x8303;</a>&#xFF0C;Promise&#x5C31;&#x4E0D;&#x5FC5;&#x62C5;&#x5FC3;&#x8FD9;&#x79CD;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A;&#x5373;&#x4F7F;&#x662F;&#x7ACB;&#x5373;&#x5B8C;&#x6210;&#x7684;Promise&#xFF08;&#x7C7B;&#x4F3C;&#x4E8E;new Promise(function (resolve, reject) {resolve(2);})&#xFF09;&#xFF0C;&#x4E5F;&#x65E0;&#x6CD5;&#x88AB;&#x540C;&#x6B65;&#x89C2;&#x5BDF;&#x5230;&#x3002;</p><p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5BF9;&#x4E00;&#x4E2A;Promise&#x8C03;&#x7528;then(...)&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5373;&#x4F7F;&#x8FD9;&#x4E2A;Promise&#x5DF2;&#x7ECF;&#x51B3;&#x8BAE;&#xFF0C;&#x63D0;&#x4F9B;&#x7ED9;then(...)&#x7684;&#x56DE;&#x8C03;&#x4E5F;&#x603B;&#x4F1A;&#x5728;JavaScript&#x4E8B;&#x4EF6;&#x961F;&#x5217;&#x7684;&#x5F53;&#x524D;&#x8FD0;&#x884C;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x518D;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x5373;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#x3002;</p><h3 id="articleHeader5">&#x8C03;&#x7528;&#x8FC7;&#x665A;</h3><p>&#x5F53;Promise&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x8C03;&#x7528;resolve(...)&#x6216;reject(...)&#x65F6;&#xFF0C;&#x8FD9;&#x4E2A;Promise&#x901A;&#x8FC7;then(...)&#x6CE8;&#x518C;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5C31;&#x4F1A;&#x5728;&#x4E0B;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x65F6;&#x95F4;&#x70B9;&#x4E0A;&#x88AB;&#x89E6;&#x53D1;&#x3002;</p><p>&#x5E76;&#x4E14;&#xFF0C;&#x8FD9;&#x4E2A;Promise&#x4E0A;&#x7684;&#x591A;&#x4E2A;&#x901A;&#x8FC7;then(...)&#x6CE8;&#x518C;&#x7684;&#x56DE;&#x8C03;&#x90FD;&#x4F1A;&#x5728;&#x4E0B;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x65F6;&#x95F4;&#x70B9;&#x4E0A;&#x88AB;&#x4F9D;&#x6B21;&#x8C03;&#x7528;&#xFF0C;&#x8FD9;&#x4E9B;&#x56DE;&#x8C03;&#x4E2D;&#x7684;&#x4EFB;&#x610F;&#x4E00;&#x4E2A;&#x90FD;&#x65E0;&#x6CD5;&#x5F71;&#x54CD;&#x6216;&#x5EF6;&#x8BEF;&#x5BF9;&#x5176;&#x4ED6;&#x56DE;&#x8C03;&#x7684;&#x8C03;&#x7528;&#x3002;</p><p>&#x4E3E;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p.then(function () {
    p.then(function () {
        console.log(&apos;C&apos;);
    });
    console.log(&apos;A&apos;);
})
.then(funtion () {
    console.log(&apos;B&apos;);
});

// &#x6253;&#x5370; A B C" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scilab"><code>p.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    p.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;C&apos;</span>);
    });
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;A&apos;</span>);
})
.<span class="hljs-keyword">then</span>(funtion () {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;B&apos;</span>);
});

<span class="hljs-comment">// &#x6253;&#x5370; A B C</span></code></pre><p>&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;C&#x65E0;&#x6CD5;&#x6253;&#x65AD;&#x6216;&#x62A2;&#x5360;B&#xFF0C;&#x6240;&#x4EE5;Promise&#x6CA1;&#x6709;&#x8C03;&#x7528;&#x8FC7;&#x665A;&#x7684;&#x73B0;&#x8C61;&#xFF0C;&#x53EA;&#x8981;&#x4F60;&#x6CE8;&#x518C;&#x4E86;then(...)&#xFF0C;&#x5C31;&#x80AF;&#x5B9A;&#x4F1A;&#x6309;&#x987A;&#x5E8F;&#x4F9D;&#x6B21;&#x8C03;&#x7528;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x5C31;&#x662F;Promise&#x7684;&#x8FD0;&#x4F5C;&#x65B9;&#x5F0F;&#x3002;</p><h3 id="articleHeader6">&#x56DE;&#x8C03;&#x672A;&#x8C03;&#x7528;</h3><p>&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x4E1C;&#x897F;&#xFF08;&#x751A;&#x81F3;JavaScript&#x9519;&#x8BEF;&#xFF09;&#x80FD;&#x963B;&#x6B62;Promise&#x5411;&#x4F60;&#x901A;&#x77E5;&#x5B83;&#x7684;&#x51B3;&#x8BAE;&#xFF08;&#x5982;&#x679C;&#x5B83;&#x51B3;&#x8BAE;&#x4E86;&#x7684;&#x8BDD;&#xFF09;&#x3002;&#x5982;&#x679C;&#x4F60;&#x5BF9;&#x4E00;&#x4E2A;Promise&#x6CE8;&#x518C;&#x4E86;&#x4E00;&#x4E2A;&#x6210;&#x529F;&#x56DE;&#x8C03;&#x548C;&#x62D2;&#x7EDD;&#x56DE;&#x8C03;&#xFF0C;&#x90A3;&#x4E48;Promise&#x5728;&#x51B3;&#x8BAE;&#x7684;&#x65F6;&#x5019;&#x603B;&#x4F1A;&#x8C03;&#x7528;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x3002;</p><p>&#x5F53;&#x7136;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x672C;&#x8EAB;&#x5305;&#x542B;JavaScript&#x9519;&#x8BEF;&#xFF0C;&#x90A3;&#x53EF;&#x80FD;&#x5C31;&#x4F1A;&#x770B;&#x4E0D;&#x5230;&#x4F60;&#x671F;&#x671B;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x56DE;&#x8C03;&#x8FD8;&#x662F;&#x88AB;&#x8C03;&#x7528;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p.then(function (data) {
    console.log(data);
    foo.bar();       // &#x8FD9;&#x91CC;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;foo&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x4F1A;&#x62A5;Type Error, foo is not defined
}, function (err) {

});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code>p.<span class="hljs-keyword">then</span>(<span class="hljs-keyword">function</span> <span class="hljs-title"></span>(data) {
    console.log(data);
    foo.bar();       // &#x8FD9;&#x91CC;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;foo&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x4F1A;&#x62A5;<span class="hljs-keyword">Type</span> <span class="hljs-type">Error, </span>foo <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> defined
}, <span class="hljs-keyword">function</span> <span class="hljs-title"></span>(err) {

});</code></pre><h3 id="articleHeader7">&#x8C03;&#x7528;&#x6B21;&#x6570;&#x592A;&#x591A;&#x6216;&#x8005;&#x592A;&#x5C11;</h3><p>&#x6839;&#x636E;<a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">PromiseA+&#x89C4;&#x8303;</a>&#xFF0C;&#x56DE;&#x8C03;&#x88AB;&#x8C03;&#x7528;&#x7684;&#x6B63;&#x786E;&#x6B21;&#x6570;&#x5E94;&#x8BE5;&#x662F;1&#x6B21;&#x3002;&#x201C;&#x592A;&#x5C11;&#x201D;&#x5C31;&#x662F;&#x4E0D;&#x8C03;&#x7528;&#xFF0C;&#x524D;&#x9762;&#x5DF2;&#x7ECF;&#x89E3;&#x91CA;&#x8FC7;&#x4E86;&#x3002;</p><p>&#x201C;&#x592A;&#x591A;&#x201D;&#x7684;&#x60C5;&#x51B5;&#x5F88;&#x5BB9;&#x6613;&#x89E3;&#x91CA;&#xFF0C;Promise&#x7684;&#x5B9A;&#x4E49;&#x65B9;&#x5F0F;&#x4F7F;&#x5F97;&#x5B83;&#x53EA;&#x80FD;&#x88AB;&#x51B3;&#x8BAE;&#x4E00;&#x6B21;&#x3002;&#x5982;&#x679C;&#x5904;&#x4E8E;&#x591A;&#x79CD;&#x539F;&#x56E0;&#xFF0C;Promise&#x521B;&#x5EFA;&#x4EE3;&#x7801;&#x8BD5;&#x56FE;&#x8C03;&#x7528;&#x591A;&#x6B21;resolve(...)&#x6216;reject(...)&#xFF0C;&#x6216;&#x8005;&#x8BD5;&#x56FE;&#x4E24;&#x8005;&#x90FD;&#x8C03;&#x7528;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;Promise&#x5C06;&#x53EA;&#x4F1A;&#x63A5;&#x53D7;&#x7B2C;&#x4E00;&#x6B21;&#x51B3;&#x8BAE;&#xFF0C;&#x5E76;&#x9ED8;&#x9ED8;&#x5FFD;&#x7565;&#x4EFB;&#x4F55;&#x540E;&#x7EED;&#x8C03;&#x7528;&#x3002;</p><p>&#x7531;&#x4E8E;Promise&#x53EA;&#x80FD;&#x88AB;&#x51B3;&#x8BAE;&#x4E00;&#x6B21;&#xFF0C;&#x6240;&#x4EE5;&#x4EFB;&#x4F55;&#x901A;&#x8FC7;then(...)&#x6CE8;&#x518C;&#x7684;&#x56DE;&#x8C03;&#x5C31;&#x53EA;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#x4E00;&#x6B21;&#x3002;</p><h3 id="articleHeader8">&#x672A;&#x80FD;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x503C;</h3><p>&#x5982;&#x679C;&#x4F60;&#x6CA1;&#x6709;&#x628A;&#x4EFB;&#x4F55;&#x503C;&#x4F20;&#x9012;&#x7ED9;resolve(...)&#x6216;reject(...)&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x503C;&#x5C31;&#x662F;<strong>undefined</strong>&#x3002;&#x4F46;&#x4E0D;&#x7BA1;&#x8FD9;&#x4E2A;&#x503C;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x5B83;&#x90FD;&#x4F1A;&#x88AB;&#x4F20;&#x7ED9;&#x6240;&#x6709;&#x6CE8;&#x518C;&#x5728;then(...)&#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</p><p>&#x5982;&#x679C;&#x4F7F;&#x7528;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x8C03;&#x7528;resolve(...)&#x6216;reject(...)&#xFF0C;&#x90A3;&#x4E48;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E4B;&#x540E;&#x7684;&#x6240;&#x6709;&#x53C2;&#x6570;&#x90FD;&#x4F1A;&#x88AB;&#x5FFD;&#x7565;&#x3002;&#x5982;&#x679C;&#x8981;&#x4F20;&#x9012;&#x591A;&#x4E2A;&#x503C;&#xFF0C;&#x4F60;&#x5C31;&#x5FC5;&#x987B;&#x628A;&#x5B83;&#x4EEC;&#x5C01;&#x88C5;&#x5728;&#x5355;&#x4E2A;&#x503C;&#x4E2D;&#x8FDB;&#x884C;&#x4F20;&#x9012;&#xFF0C;&#x6BD4;&#x5982;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x6216;&#x5BF9;&#x8C61;&#x3002;</p><h3 id="articleHeader9">&#x541E;&#x6389;&#x53EF;&#x80FD;&#x51FA;&#x73B0;&#x7684;&#x9519;&#x8BEF;&#x6216;&#x5F02;&#x5E38;</h3><p>&#x5982;&#x679C;&#x5728;Promise&#x7684;&#x521B;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E2D;&#x6216;&#x5728;&#x67E5;&#x770B;&#x5176;&#x51B3;&#x8BAE;&#x7ED3;&#x679C;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x4EFB;&#x4F55;&#x65F6;&#x95F4;&#x70B9;&#x4E0A;&#xFF0C;&#x51FA;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;JavaScript&#x5F02;&#x5E38;&#x9519;&#x8BEF;&#xFF0C;&#x6BD4;&#x5982;&#x4E00;&#x4E2A;TypeError&#x6216;ReferenceError&#xFF0C;&#x8FD9;&#x4E2A;&#x5F02;&#x5E38;&#x90FD;&#x4F1A;&#x88AB;&#x6355;&#x6349;&#xFF0C;&#x5E76;&#x4E14;&#x4F1A;&#x4F7F;&#x8FD9;&#x4E2A;Promise&#x88AB;&#x62D2;&#x7EDD;&#x3002;</p><p>&#x4E3E;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = new Promise(function (resolve, reject) {
    foo.bar();    // foo&#x672A;&#x5B9A;&#x4E49;
    resolve(2);
});

p.then(function (data) {
    console.log(data);    // &#x6C38;&#x8FDC;&#x4E5F;&#x4E0D;&#x4F1A;&#x5230;&#x8FBE;&#x8FD9;&#x91CC;
}, function (err) {
    console.log(err);    // err&#x5C06;&#x4F1A;&#x662F;&#x4E00;&#x4E2A;TypeError&#x5F02;&#x5E38;&#x5BF9;&#x8C61;&#x6765;&#x81EA;foo.bar()&#x8FD9;&#x4E00;&#x884C;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    foo.bar();    <span class="hljs-comment">// foo&#x672A;&#x5B9A;&#x4E49;</span>
    resolve(<span class="hljs-number">2</span>);
});

p.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(data);    <span class="hljs-comment">// &#x6C38;&#x8FDC;&#x4E5F;&#x4E0D;&#x4F1A;&#x5230;&#x8FBE;&#x8FD9;&#x91CC;</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
    <span class="hljs-built_in">console</span>.log(err);    <span class="hljs-comment">// err&#x5C06;&#x4F1A;&#x662F;&#x4E00;&#x4E2A;TypeError&#x5F02;&#x5E38;&#x5BF9;&#x8C61;&#x6765;&#x81EA;foo.bar()&#x8FD9;&#x4E00;&#x884C;</span>
});</code></pre><p>foo.bar()&#x4E2D;&#x53D1;&#x751F;&#x7684;JavaScript&#x5F02;&#x5E38;&#x5BFC;&#x81F4;&#x4E86;Promise&#x7684;&#x62D2;&#x7EDD;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x6355;&#x6349;&#x5E76;&#x5BF9;&#x5176;&#x4F5C;&#x51FA;&#x54CD;&#x5E94;&#x3002;</p><h3 id="articleHeader10">&#x4E0D;&#x662F;&#x6240;&#x6709;&#x7684;thenable&#x90FD;&#x53EF;&#x4EE5;&#x4FE1;&#x4EFB;</h3><p>&#x5230;&#x76EE;&#x524D;&#x4E3A;&#x6B62;&#xFF0C;&#x6211;&#x4EEC;&#x8BA8;&#x8BBA;&#x4E86;&#x4F7F;&#x7528;Promise&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x4E0A;&#x8FF0;&#x591A;&#x79CD;&#x7531;&#x63A7;&#x5236;&#x53CD;&#x8F6C;&#x5BFC;&#x81F4;&#x7684;&#x4FE1;&#x4EFB;&#x95EE;&#x9898;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x4F60;&#x80AF;&#x5B9A;&#x4E5F;&#x6CE8;&#x610F;&#x5230;&#x4E86;&#xFF0C;Promise&#x5E76;&#x6CA1;&#x6709;&#x5B8C;&#x5168;&#x6446;&#x8131;&#x56DE;&#x8C03;&#xFF0C;&#x5B83;&#x53EA;&#x662F;&#x6539;&#x53D8;&#x4E86;&#x4F20;&#x9012;&#x56DE;&#x8C03;&#x7684;&#x4F4D;&#x7F6E;&#x3002;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x662F;&#x628A;&#x56DE;&#x8C03;&#x4F20;&#x9012;&#x7ED9;foo(...)&#x8BA9;&#x7B2C;&#x4E09;&#x65B9;&#x53BB;&#x6267;&#x884C;&#xFF0C;&#x800C;&#x662F;&#x4ECE;foo(...)&#x5F97;&#x5230;&#x67D0;&#x4E2A;&#x4E1C;&#x897F;&#xFF08;Promise&#x5BF9;&#x8C61;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x56DE;&#x8C03;&#x4F20;&#x9012;&#x7ED9;&#x8FD9;&#x4E2A;&#x4E1C;&#x897F;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x5C31;&#x6BD4;&#x5355;&#x7EAF;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x66F4;&#x503C;&#x5F97;&#x4FE1;&#x4EFB;&#x5462;&#xFF1F;&#x5982;&#x4F55;&#x80FD;&#x591F;&#x786E;&#x5B9A;&#x8FD4;&#x56DE;&#x7684;&#x8FD9;&#x4E2A;&#x4E1C;&#x897F;&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x4FE1;&#x4EFB;&#x7684;Promise&#x5462;&#xFF1F;</p><p>Promise&#x5BF9;&#x4E8E;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;ES6&#x5B9E;&#x73B0;&#x7684;Promise&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x5C31;&#x662F;<strong>Promise.resolve(...)</strong>&#x3002;</p><p>&#x5982;&#x679C;&#x5411;Promise.resolve(...)&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x975E;Promise&#xFF0C;&#x975E;thenable&#x5F97;&#x7ACB;&#x5373;&#x503C;&#xFF0C;&#x5C31;&#x4F1A;&#x5F97;&#x5230;&#x4E00;&#x4E2A;&#x7528;&#x8FD9;&#x4E2A;&#x503C;&#x586B;&#x5145;&#x7684;Promise&#x3002;</p><p>&#x4E3E;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = new Promise(function (resolve, reject) {
    resolve(2);
});

var p2 = Promise.resolve(2);

// &#x8FD9;&#x91CC;p1&#x548C;p2&#x7684;&#x6548;&#x679C;&#x662F;&#x4E00;&#x6837;&#x7684;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
    resolve(<span class="hljs-number">2</span>);
});

<span class="hljs-keyword">var</span> p2 = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">2</span>);

<span class="hljs-comment">// &#x8FD9;&#x91CC;p1&#x548C;p2&#x7684;&#x6548;&#x679C;&#x662F;&#x4E00;&#x6837;&#x7684;</span></code></pre><p>&#x800C;&#x5982;&#x679C;&#x5411;Promise.resolve(...)&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x771F;&#x6B63;&#x7684;Promise&#xFF0C;&#x5C31;&#x53EA;&#x4F1A;&#x8FD4;&#x56DE;&#x540C;&#x4E00;&#x4E2A;Promise&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = Promise.resolve(2);
var p2 = Promise.resolve(p1);

p1 === p2;    // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p1 = <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">2</span>);
<span class="hljs-keyword">var</span> p2 = <span class="hljs-built_in">Promise</span>.resolve(p1);

p1 === p2;    <span class="hljs-comment">// true</span></code></pre><p>&#x66F4;&#x91CD;&#x8981;&#x7684;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x5411;Promise.resolve(...)&#x4F20;&#x9012;&#x4E86;&#x4E00;&#x4E2A;&#x975E;Promise&#x7684;thenable&#x503C;&#xFF0C;&#x524D;&#x8005;&#x5C31;&#x4F1A;&#x8BD5;&#x56FE;&#x5C55;&#x5F00;&#x8FD9;&#x4E2A;&#x503C;&#xFF0C;&#x800C;&#x4E14;&#x5C55;&#x5F00;&#x8FC7;&#x7A0B;&#x4E2D;&#x4F1A;&#x6301;&#x7EED;&#x5230;&#x63D0;&#x53D6;&#x51FA;&#x4E00;&#x4E2A;&#x5177;&#x4F53;&#x7684;&#x975E;&#x7C7B;Promise&#x7684;&#x6700;&#x7EC8;&#x503C;&#x3002;</p><p>&#x4E3E;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = {
    then: function (cb, errCb) {
        cb(2);
        errCb(&apos;haha&apos;);
    }
};

// &#x8FD9;&#x53EF;&#x4EE5;&#x5DE5;&#x4F5C;&#xFF0C;&#x56E0;&#x4E3A;&#x51FD;&#x6570;&#x662F;&#x4E00;&#x7B49;&#x516C;&#x6C11;&#xFF0C;&#x53EF;&#x4EE5;&#x5F53;&#x505A;&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x4F20;&#x9012;
p.then(function (data) {
    console.log(data);    // 2
}, function (err) {
    console.log(err);    // haha
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scilab"><code>var p = {
    <span class="hljs-keyword">then</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(cb, errCb)</span> {</span>
        cb(<span class="hljs-number">2</span>);
        errCb(<span class="hljs-string">&apos;haha&apos;</span>);
    }
};

<span class="hljs-comment">// &#x8FD9;&#x53EF;&#x4EE5;&#x5DE5;&#x4F5C;&#xFF0C;&#x56E0;&#x4E3A;&#x51FD;&#x6570;&#x662F;&#x4E00;&#x7B49;&#x516C;&#x6C11;&#xFF0C;&#x53EF;&#x4EE5;&#x5F53;&#x505A;&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x4F20;&#x9012;</span>
p.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(data)</span> {</span>
    console.<span class="hljs-built_in">log</span>(data);    <span class="hljs-comment">// 2</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err)</span> {</span>
    console.<span class="hljs-built_in">log</span>(err);    <span class="hljs-comment">// haha</span>
});</code></pre><p>&#x8FD9;&#x4E2A;p&#x662F;&#x4E00;&#x4E2A;thenable&#xFF0C;&#x4F46;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x771F;&#x6B63;&#x7684;Promise&#xFF0C;&#x5176;&#x884C;&#x4E3A;&#x548C;Promise&#x5E76;&#x4E0D;&#x5B8C;&#x5168;&#x4E00;&#x81F4;&#xFF0C;&#x5B83;&#x540C;&#x65F6;&#x89E6;&#x53D1;&#x4E86;&#x6210;&#x529F;&#x56DE;&#x8C03;&#x548C;&#x62D2;&#x7EDD;&#x56DE;&#x8C03;&#xFF0C;&#x5B83;&#x662F;&#x4E0D;&#x53EF;&#x4FE1;&#x4EFB;&#x7684;&#x3002;</p><p>&#x5C3D;&#x7BA1;&#x5982;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x662F;&#x90FD;&#x53EF;&#x4EE5;&#x628A;&#x8FD9;&#x6837;&#x7684;p&#x4F20;&#x7ED9;Promise.resolve(...)&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x4F1A;&#x5F97;&#x5230;&#x671F;&#x671B;&#x4E2D;&#x7684;&#x89C4;&#x8303;&#x5316;&#x540E;&#x7684;&#x5B89;&#x5168;&#x7ED3;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(p)
    .then(function (data) {
        console.log(data);    // 2
    }, function (err) {
        console.log(err);    // &#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x5230;&#x8FBE;&#x8FD9;&#x91CC;
    });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.resolve(p)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data);    <span class="hljs-comment">// 2</span>
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
        <span class="hljs-built_in">console</span>.log(err);    <span class="hljs-comment">// &#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x5230;&#x8FBE;&#x8FD9;&#x91CC;</span>
    });</code></pre><p>&#x56E0;&#x4E3A;&#x524D;&#x9762;&#x8BA8;&#x8BBA;&#x8FC7;&#xFF0C;&#x4E00;&#x4E2A;Promise&#x53EA;&#x63A5;&#x53D7;&#x4E00;&#x6B21;&#x51B3;&#x8BAE;&#xFF0C;&#x5982;&#x679C;&#x591A;&#x6B21;&#x8C03;&#x7528;resolve(...)&#x6216;reject(...)&#xFF0C;&#x540E;&#x9762;&#x7684;&#x4F1A;&#x88AB;&#x81EA;&#x52A8;&#x5FFD;&#x7565;&#x3002;</p><p>Promise.resolve(...)&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4EFB;&#x4F55;thenable&#xFF0C;&#x5C06;&#x5176;&#x89E3;&#x5C01;&#x4E3A;&#x5B83;&#x7684;&#x975E;thenable&#x503C;&#x3002;&#x4ECE;Promise.resolve(...)&#x5F97;&#x5230;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x771F;&#x6B63;&#x7684;Promise&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x4FE1;&#x4EFB;&#x7684;&#x503C;&#x3002;&#x5982;&#x679C;&#x4F60;&#x4F20;&#x5165;&#x7684;&#x5DF2;&#x7ECF;&#x662F;&#x771F;&#x6B63;&#x7684;Promise&#xFF0C;&#x90A3;&#x4E48;&#x4F60;&#x5F97;&#x5230;&#x7684;&#x5C31;&#x662F;&#x5B83;&#x672C;&#x8EAB;&#xFF0C;&#x6240;&#x4EE5;&#x901A;&#x8FC7;Promise.resolve(...)&#x8FC7;&#x6EE4;&#x6765;&#x83B7;&#x5F97;&#x53EF;&#x4FE1;&#x4EFB;&#x6027;&#x5B8C;&#x5168;&#x6CA1;&#x6709;&#x574F;&#x5904;&#x3002;</p><p><strong>&#x7EFC;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x660E;&#x786E;&#x4E86;&#xFF0C;&#x4F7F;&#x7528;Promise&#x5904;&#x7406;&#x5F02;&#x6B65;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x63A7;&#x5236;&#x53CD;&#x8F6C;&#x5E26;&#x6765;&#x7684;&#x4E00;&#x7CFB;&#x5217;&#x4FE1;&#x4EFB;&#x95EE;&#x9898;</strong>&#x3002;<br><strong>&#x5F88;&#x597D;&#xFF0C;&#x6211;&#x4EEC;&#x53C8;&#x5411;&#x524D;&#x8FC8;&#x4E86;&#x4E00;&#x6B65;</strong>&#x3002;</p><h2 id="articleHeader11">Step3 - &#x751F;&#x6210;&#x5668;Generator</h2><p>&#x5728;Step1&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x786E;&#x5B9A;&#x4E86;&#x7528;&#x56DE;&#x8C03;&#x8868;&#x8FBE;&#x5F02;&#x6B65;&#x6D41;&#x7A0B;&#x7684;&#x4E24;&#x4E2A;&#x5173;&#x952E;&#x95EE;&#x9898;&#xFF1A;</p><ol><li>&#x57FA;&#x4E8E;&#x56DE;&#x8C03;&#x7684;&#x5F02;&#x6B65;&#x4E0D;&#x7B26;&#x5408;&#x5927;&#x8111;&#x5BF9;&#x4EFB;&#x52A1;&#x6B65;&#x9AA4;&#x7684;&#x89C4;&#x8303;&#x65B9;&#x5F0F;</li><li>&#x7531;&#x4E8E;&#x63A7;&#x5236;&#x53CD;&#x8F6C;&#xFF0C;&#x56DE;&#x8C03;&#x5E76;&#x4E0D;&#x662F;&#x53EF;&#x4FE1;&#x4EFB;&#x7684;</li></ol><p>&#x5728;Step2&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x4E86;Promise&#x662F;&#x5982;&#x4F55;&#x628A;&#x56DE;&#x8C03;&#x7684;&#x63A7;&#x5236;&#x53CD;&#x8F6C;&#x53C8;&#x53CD;&#x8F6C;&#x8FC7;&#x6765;&#xFF0C;&#x6062;&#x590D;&#x4E86;&#x53EF;&#x4FE1;&#x4EFB;&#x6027;&#x3002;</p><p>&#x73B0;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x628A;&#x6CE8;&#x610F;&#x529B;&#x8F6C;&#x79FB;&#x5230;&#x4E00;&#x79CD;&#x987A;&#x5E8F;&#x3001;&#x770B;&#x4F3C;&#x540C;&#x6B65;&#x7684;&#x5F02;&#x6B65;&#x6D41;&#x7A0B;&#x63A7;&#x5236;&#x8868;&#x8FBE;&#x98CE;&#x683C;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;<strong>ES6&#x4E2D;&#x7684;&#x751F;&#x6210;&#x5668;&#xFF08;Gererator&#xFF09;</strong>&#x3002;</p><h3 id="articleHeader12">&#x53EF;&#x8FED;&#x4EE3;&#x534F;&#x8BAE;&#x548C;&#x8FED;&#x4EE3;&#x5668;&#x534F;&#x8BAE;</h3><p>&#x4E86;&#x89E3;Generator&#x4E4B;&#x524D;&#xFF0C;&#x5FC5;&#x987B;&#x5148;&#x4E86;&#x89E3;ES6&#x65B0;&#x589E;&#x7684;&#x4E24;&#x4E2A;&#x534F;&#x8BAE;&#xFF1A;<strong>&#x53EF;&#x8FED;&#x4EE3;&#x534F;&#x8BAE;</strong>&#x548C;<strong>&#x8FED;&#x4EE3;&#x5668;&#x534F;&#x8BAE;</strong>&#x3002;</p><h4>&#x53EF;&#x8FED;&#x4EE3;&#x534F;&#x8BAE;</h4><p><strong>&#x53EF;&#x8FED;&#x4EE3;&#x534F;&#x8BAE;</strong>&#x8FD0;&#x884C;JavaScript&#x5BF9;&#x8C61;&#x53BB;&#x5B9A;&#x4E49;&#x6216;&#x5B9A;&#x5236;&#x5B83;&#x4EEC;&#x7684;&#x8FED;&#x4EE3;&#x884C;&#x4E3A;&#xFF0C;&#x4F8B;&#x5982;&#xFF08;&#x5B9A;&#x4E49;&#xFF09;&#x5728;&#x4E00;&#x4E2A;for...of&#x7ED3;&#x6784;&#x4E2D;&#x4EC0;&#x4E48;&#x503C;&#x53EF;&#x4EE5;&#x88AB;&#x5FAA;&#x73AF;&#xFF08;&#x5F97;&#x5230;&#xFF09;&#x3002;&#x4EE5;&#x4E0B;&#x5185;&#x7F6E;&#x7C7B;&#x578B;&#x90FD;&#x662F;&#x5185;&#x7F6E;&#x7684;&#x53EF;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#x5E76;&#x4E14;&#x6709;&#x9ED8;&#x8BA4;&#x7684;&#x8FED;&#x4EE3;&#x884C;&#x4E3A;&#xFF1A;</p><ol><li>Array</li><li>Map</li><li>Set</li><li>String</li><li>TypedArray</li><li>&#x51FD;&#x6570;&#x7684;Arguments&#x5BF9;&#x8C61;</li><li>NodeList&#x5BF9;&#x8C61;</li></ol><p><strong>&#x6CE8;&#x610F;&#xFF0C;Object&#x4E0D;&#x7B26;&#x5408;&#x53EF;&#x8FED;&#x4EE3;&#x534F;&#x8BAE;</strong>&#x3002;</p><p>&#x4E3A;&#x4E86;&#x53D8;&#x6210;&#x53EF;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#xFF0C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5FC5;&#x987B;&#x5B9E;&#x73B0;@@iterator&#x65B9;&#x6CD5;&#xFF0C;&#x610F;&#x601D;&#x662F;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#xFF08;&#x6216;&#x8005;&#x5B83;&#x539F;&#x578B;&#x94FE;prototype chain&#x4E0A;&#x7684;&#x67D0;&#x4E2A;&#x5BF9;&#x8C61;&#xFF09;&#x5FC5;&#x987B;&#x6709;&#x4E00;&#x4E2A;&#x540D;&#x5B57;&#x662F;Symbol.iterator&#x7684;&#x5C5E;&#x6027;&#xFF1A;</p><table><thead><tr><th>&#x5C5E;&#x6027;</th><th>&#x503C;</th></tr></thead><tbody><tr><td>[Symbol.iterator]</td><td>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x65E0;&#x53C2;&#x51FD;&#x6570;&#xFF0C;&#x88AB;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#x7B26;&#x5408;&#x8FED;&#x4EE3;&#x5668;&#x534F;&#x8BAE;</td></tr></tbody></table><p>&#x5F53;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x9700;&#x8981;&#x88AB;&#x8FED;&#x4EE3;&#x7684;&#x65F6;&#x5019;&#xFF08;&#x6BD4;&#x5982;&#x5F00;&#x59CB;&#x7528;&#x4E8E;&#x4E00;&#x4E2A;for...of&#x5FAA;&#x73AF;&#x4E2D;&#xFF09;&#xFF0C;&#x5B83;&#x7684;@@iterator&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&#x5E76;&#x4E14;&#x65E0;&#x53C2;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x5728;&#x8FED;&#x4EE3;&#x4E2D;&#x83B7;&#x5F97;&#x503C;&#x7684;&#x8FED;&#x4EE3;&#x5668;&#x3002;</p><h4>&#x8FED;&#x4EE3;&#x5668;&#x534F;&#x8BAE;</h4><p><strong>&#x8FED;&#x4EE3;&#x5668;&#x534F;&#x8BAE;</strong>&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x79CD;&#x6807;&#x51C6;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x4EA7;&#x751F;&#x4E00;&#x4E2A;&#x6709;&#x9650;&#x6216;&#x65E0;&#x9650;&#x5E8F;&#x5217;&#x7684;&#x503C;&#x3002;<br>&#x5F53;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x4E00;&#x4E2A;&#x8FED;&#x4EE3;&#x5668;&#x65F6;&#xFF0C;&#x5B83;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;next()&#x7684;&#x65B9;&#x6CD5;&#x5E76;&#x4E14;&#x62E5;&#x6709;&#x4EE5;&#x4E0B;&#x542B;&#x4E49;&#xFF1A;</p><table><thead><tr><th>&#x5C5E;&#x6027;</th><th>&#x503C;</th></tr></thead><tbody><tr><td>next</td><td>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x65E0;&#x53C2;&#x51FD;&#x6570;&#xFF0C;&#x88AB;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#x62E5;&#x6709;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#xFF1A;<br><strong>1. done&#xFF08;boolean&#xFF09;</strong><br>- &#x5982;&#x679C;&#x8FED;&#x4EE3;&#x5668;&#x5DF2;&#x7ECF;&#x7ECF;&#x8FC7;&#x4E86;&#x88AB;&#x8FED;&#x4EE3;&#x5E8F;&#x5217;&#x65F6;&#x4E3A;true&#x3002;&#x8FD9;&#x65F6;value&#x53EF;&#x80FD;&#x63CF;&#x8FF0;&#x4E86;&#x8BE5;&#x8FED;&#x4EE3;&#x5668;&#x7684;&#x8FD4;&#x56DE;&#x503C;<br>- &#x5982;&#x679C;&#x8FED;&#x4EE3;&#x5668;&#x53EF;&#x4EE5;&#x4EA7;&#x751F;&#x5E8F;&#x5217;&#x4E2D;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x5219;&#x4E3A;false&#x3002;&#x8FD9;&#x7B49;&#x6548;&#x4E8E;&#x8FDE;&#x540C;done&#x5C5E;&#x6027;&#x4E5F;&#x4E0D;&#x6307;&#x5B9A;&#x3002;<br><strong>2. value</strong> - &#x8FED;&#x4EE3;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x4EFB;&#x4F55;JavaScript&#x503C;&#x3002;done&#x4E3A;true&#x65F6;&#x53EF;&#x4EE5;&#x5FFD;&#x7565;&#x3002;</td></tr></tbody></table><p>&#x4F7F;&#x7528;&#x53EF;&#x8FED;&#x4EE3;&#x534F;&#x8BAE;&#x548C;&#x8FED;&#x4EE3;&#x5668;&#x534F;&#x8BAE;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &apos;hello&apos;;

// &#x53EF;&#x8FED;&#x4EE3;&#x534F;&#x8BAE;&#x4F7F;&#x7528;for...of&#x8BBF;&#x95EE;
typeof str[Symbol.iterator];    // &apos;function&apos;

for (var s of str) {
    console.log(s);    // &#x5206;&#x522B;&#x6253;&#x5370; &apos;h&apos;&#x3001;&apos;e&apos;&#x3001;&apos;l&apos;&#x3001;&apos;l&apos;&#x3001;&apos;o&apos;
}

// &#x8FED;&#x4EE3;&#x5668;&#x534F;&#x8BAE;next&#x65B9;&#x6CD5;
var iterator = str[Symbol.iterator]();

iterator.next();    // {value: &quot;h&quot;, done: false}
iterator.next();    // {value: &quot;e&quot;, done: false}
iterator.next();    // {value: &quot;l&quot;, done: false}
iterator.next();    // {value: &quot;l&quot;, done: false}
iterator.next();    // {value: &quot;o&quot;, done: false}
iterator.next();    // {value: undefined, done: true}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code>var str = <span class="hljs-string">&apos;hello&apos;</span>;

<span class="hljs-regexp">//</span> &#x53EF;&#x8FED;&#x4EE3;&#x534F;&#x8BAE;&#x4F7F;&#x7528;<span class="hljs-keyword">for</span>...of&#x8BBF;&#x95EE;
typeof str[Symbol.iterator];    <span class="hljs-regexp">//</span> <span class="hljs-string">&apos;function&apos;</span>

<span class="hljs-keyword">for</span> (var s of str) {
    console.log(s);    <span class="hljs-regexp">//</span> &#x5206;&#x522B;&#x6253;&#x5370; <span class="hljs-string">&apos;h&apos;</span>&#x3001;<span class="hljs-string">&apos;e&apos;</span>&#x3001;<span class="hljs-string">&apos;l&apos;</span>&#x3001;<span class="hljs-string">&apos;l&apos;</span>&#x3001;<span class="hljs-string">&apos;o&apos;</span>
}

<span class="hljs-regexp">//</span> &#x8FED;&#x4EE3;&#x5668;&#x534F;&#x8BAE;<span class="hljs-keyword">next</span>&#x65B9;&#x6CD5;
var iterator = str[Symbol.iterator]();

iterator.<span class="hljs-keyword">next</span>();    <span class="hljs-regexp">//</span> {value: <span class="hljs-string">&quot;h&quot;</span>, done: false}
iterator.<span class="hljs-keyword">next</span>();    <span class="hljs-regexp">//</span> {value: <span class="hljs-string">&quot;e&quot;</span>, done: false}
iterator.<span class="hljs-keyword">next</span>();    <span class="hljs-regexp">//</span> {value: <span class="hljs-string">&quot;l&quot;</span>, done: false}
iterator.<span class="hljs-keyword">next</span>();    <span class="hljs-regexp">//</span> {value: <span class="hljs-string">&quot;l&quot;</span>, done: false}
iterator.<span class="hljs-keyword">next</span>();    <span class="hljs-regexp">//</span> {value: <span class="hljs-string">&quot;o&quot;</span>, done: false}
iterator.<span class="hljs-keyword">next</span>();    <span class="hljs-regexp">//</span> {value: undefined, done: true}</code></pre><p>&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x8BA9;&#x5176;&#x7B26;&#x5408;<strong>&#x53EF;&#x8FED;&#x4EE3;&#x534F;&#x8BAE;</strong>&#x548C;<strong>&#x8FED;&#x4EE3;&#x5668;&#x534F;&#x8BAE;</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var something = (function () {
    var nextVal;
    
    return {
        // &#x53EF;&#x8FED;&#x4EE3;&#x534F;&#x8BAE;&#xFF0C;&#x4F9B;for...of&#x6D88;&#x8D39;
        [Symbol.iterator]: function () {
            return this;
        },
        
        // &#x8FED;&#x4EE3;&#x5668;&#x534F;&#x8BAE;&#xFF0C;&#x5B9E;&#x73B0;next()&#x65B9;&#x6CD5;
        next: function () {
            if (nextVal === undefined) {
                nextVal = 1;
            } else {
                nextVal = (3 * nextVal) + 6;
            }
            
            return {value: nextVal, done: false};
        }
    };
})();

something.next().value;    // 1
something.next().value;    // 9
something.next().value;    // 33
something.next().value;    // 105" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> something = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> nextVal;
    
    <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">// &#x53EF;&#x8FED;&#x4EE3;&#x534F;&#x8BAE;&#xFF0C;&#x4F9B;for...of&#x6D88;&#x8D39;</span>
        [<span class="hljs-built_in">Symbol</span>.iterator]: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
        },
        
        <span class="hljs-comment">// &#x8FED;&#x4EE3;&#x5668;&#x534F;&#x8BAE;&#xFF0C;&#x5B9E;&#x73B0;next()&#x65B9;&#x6CD5;</span>
        next: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (nextVal === <span class="hljs-literal">undefined</span>) {
                nextVal = <span class="hljs-number">1</span>;
            } <span class="hljs-keyword">else</span> {
                nextVal = (<span class="hljs-number">3</span> * nextVal) + <span class="hljs-number">6</span>;
            }
            
            <span class="hljs-keyword">return</span> {<span class="hljs-attr">value</span>: nextVal, <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>};
        }
    };
})();

something.next().value;    <span class="hljs-comment">// 1</span>
something.next().value;    <span class="hljs-comment">// 9</span>
something.next().value;    <span class="hljs-comment">// 33</span>
something.next().value;    <span class="hljs-comment">// 105</span></code></pre><h3 id="articleHeader13">&#x7528;Generator&#x5B9E;&#x73B0;&#x5F02;&#x6B65;</h3><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x7528;Generator&#x6539;&#x5199;&#x4E0A;&#x9762;&#x56DE;&#x8C03;&#x5D4C;&#x5957;&#x7684;&#x4F8B;&#x5B50;&#x4F1A;&#x662F;&#x4EC0;&#x4E48;&#x6837;&#x7684;&#x5462;&#xFF1F;&#x89C1;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getKey () {
    $.ajax({
        type: &apos;get&apos;,
        url: &apos;http://localhost:3000/apiKey&apos;,
        success: function (data) {
            key = data;
            it.next(key);
        }
        error: function (err) {
            console.log(err);
        }
    });
}

function getToken (key) {
    $.ajax({
        type: &apos;get&apos;,
        url: &apos;http://localhost:3000/getToken&apos;,
        data: {
            key: key
        },
        success: function (data) {
            loginData = data;
            it.next(loginData);
        }
        error: function (err) {
            console.log(err);
        }
    });
}

function getData (loginData) {
    $.ajax({
        type: &apos;get&apos;,
        url: &apos;http://localhost:3000/getData&apos;,
        data: {
            token: loginData.token,
            userId: loginData.userId
        },
        success: function (busiData) {
            it.next(busiData);
        }
        error: function (err) {
            console.log(err);
        }
    });
}



function *main () {
    let key = yield getKey();
    let LoginData = yield getToken(key);
    let busiData = yield getData(loginData);
    console.log(&apos;&#x4E1A;&#x52A1;&#x6570;&#x636E;&#xFF1A;&apos;, busiData);
}

// &#x751F;&#x6210;&#x8FED;&#x4EE3;&#x5668;&#x5B9E;&#x4F8B;
var it = main();

// &#x8FD0;&#x884C;&#x7B2C;&#x4E00;&#x6B65;
it.next();
console.log(&apos;&#x4E0D;&#x5F71;&#x54CD;&#x4E3B;&#x7EBF;&#x7A0B;&#x6267;&#x884C;&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getKey</span> (<span class="hljs-params"></span>) </span>{
    $.ajax({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;get&apos;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://localhost:3000/apiKey&apos;</span>,
        <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
            key = data;
            it.next(key);
        }
        error: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
            <span class="hljs-built_in">console</span>.log(err);
        }
    });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getToken</span> (<span class="hljs-params">key</span>) </span>{
    $.ajax({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;get&apos;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://localhost:3000/getToken&apos;</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">key</span>: key
        },
        <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
            loginData = data;
            it.next(loginData);
        }
        error: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
            <span class="hljs-built_in">console</span>.log(err);
        }
    });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getData</span> (<span class="hljs-params">loginData</span>) </span>{
    $.ajax({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;get&apos;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://localhost:3000/getData&apos;</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">token</span>: loginData.token,
            <span class="hljs-attr">userId</span>: loginData.userId
        },
        <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">busiData</span>) </span>{
            it.next(busiData);
        }
        error: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
            <span class="hljs-built_in">console</span>.log(err);
        }
    });
}



<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">main</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> key = <span class="hljs-keyword">yield</span> getKey();
    <span class="hljs-keyword">let</span> LoginData = <span class="hljs-keyword">yield</span> getToken(key);
    <span class="hljs-keyword">let</span> busiData = <span class="hljs-keyword">yield</span> getData(loginData);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x4E1A;&#x52A1;&#x6570;&#x636E;&#xFF1A;&apos;</span>, busiData);
}

<span class="hljs-comment">// &#x751F;&#x6210;&#x8FED;&#x4EE3;&#x5668;&#x5B9E;&#x4F8B;</span>
<span class="hljs-keyword">var</span> it = main();

<span class="hljs-comment">// &#x8FD0;&#x884C;&#x7B2C;&#x4E00;&#x6B65;</span>
it.next();
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x4E0D;&#x5F71;&#x54CD;&#x4E3B;&#x7EBF;&#x7A0B;&#x6267;&#x884C;&apos;</span>);</code></pre><p>&#x6211;&#x4EEC;&#x6CE8;&#x610F;*main()&#x751F;&#x6210;&#x5668;&#x5185;&#x90E8;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4E0D;&#x770B;yield&#x5173;&#x952E;&#x5B57;&#x7684;&#x8BDD;&#xFF0C;&#x662F;&#x5B8C;&#x5168;&#x7B26;&#x5408;&#x5927;&#x8111;&#x601D;&#x7EF4;&#x4E60;&#x60EF;&#x7684;&#x540C;&#x6B65;&#x4E66;&#x5199;&#x5F62;&#x5F0F;&#xFF0C;&#x628A;&#x5F02;&#x6B65;&#x7684;&#x6D41;&#x7A0B;&#x5C01;&#x88C5;&#x5230;&#x5916;&#x9762;&#xFF0C;&#x5728;&#x6210;&#x529F;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x8C03;&#x7528;it.next()&#xFF0C;&#x5C06;&#x4F20;&#x56DE;&#x7684;&#x6570;&#x636E;&#x653E;&#x5230;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x91CC;&#x8FDB;&#x884C;&#x6392;&#x961F;&#xFF0C;&#x5F53;JavaScript&#x4E3B;&#x7EBF;&#x7A0B;&#x7A7A;&#x95F2;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x4ECE;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x91CC;&#x4F9D;&#x6B21;&#x53D6;&#x51FA;&#x56DE;&#x8C03;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x3002;</p><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x4E00;&#x76F4;&#x5360;&#x7528;JavaScript&#x4E3B;&#x7EBF;&#x7A0B;&#x7684;&#x8BDD;&#xFF0C;&#x662F;&#x6CA1;&#x6709;&#x65F6;&#x95F4;&#x53BB;&#x6267;&#x884C;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x4E2D;&#x7684;&#x4EFB;&#x52A1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8FD0;&#x884C;&#x7B2C;&#x4E00;&#x6B65;
it.next();

// &#x6301;&#x7EED;&#x5360;&#x7528;JavaScript&#x4E3B;&#x7EBF;&#x7A0B;
while(1) {};    // &#x8FD9;&#x91CC;&#x662F;&#x62FF;&#x4E0D;&#x5230;&#x5F02;&#x6B65;&#x6570;&#x636E;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x673A;&#x4F1A;&#x53BB;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x91CC;&#x53D6;&#x4EFB;&#x52A1;&#x6267;&#x884C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> &#x8FD0;&#x884C;&#x7B2C;&#x4E00;&#x6B65;
it.<span class="hljs-keyword">next</span>();

<span class="hljs-regexp">//</span> &#x6301;&#x7EED;&#x5360;&#x7528;JavaScript&#x4E3B;&#x7EBF;&#x7A0B;
<span class="hljs-keyword">while</span>(<span class="hljs-number">1</span>) {};    <span class="hljs-regexp">//</span> &#x8FD9;&#x91CC;&#x662F;&#x62FF;&#x4E0D;&#x5230;&#x5F02;&#x6B65;&#x6570;&#x636E;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x673A;&#x4F1A;&#x53BB;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x91CC;&#x53D6;&#x4EFB;&#x52A1;&#x6267;&#x884C;</code></pre><p>&#x7EFC;&#x4E0A;&#xFF0C;&#x751F;&#x6210;&#x5668;Generator&#x89E3;&#x51B3;&#x4E86;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x6D41;&#x7A0B;&#x7684;<strong>&#x7B2C;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x4E0D;&#x7B26;&#x5408;&#x5927;&#x8111;&#x987A;&#x5E8F;&#x3001;&#x7EBF;&#x6027;&#x7684;&#x601D;&#x7EF4;&#x65B9;&#x5F0F;&#x3002;</strong>&#x3002;</p><h2 id="articleHeader14">Step4 - Async/Await</h2><p>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x4ECB;&#x7ECD;&#x4E86;Promise&#x548C;Generator&#xFF0C;&#x628A;&#x8FD9;&#x4E24;&#x8005;&#x7ED3;&#x5408;&#x8D77;&#x6765;&#xFF0C;&#x5C31;&#x662F;Async/Await&#x3002;</p><p>Generator&#x7684;&#x7F3A;&#x70B9;&#x662F;&#x8FD8;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x624B;&#x52A8;&#x63A7;&#x5236;next()&#x6267;&#x884C;&#xFF0C;&#x4F7F;&#x7528;Async/Await&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EA;&#x8981;await&#x540E;&#x9762;&#x8DDF;&#x7740;&#x4E00;&#x4E2A;Promise&#xFF0C;&#x5B83;&#x4F1A;&#x81EA;&#x52A8;&#x7B49;&#x5230;Promise&#x51B3;&#x8BAE;&#x4EE5;&#x540E;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;resolve(...)&#x6216;&#x8005;reject(...)&#x90FD;&#x53EF;&#x4EE5;&#x3002;</p><p>&#x6211;&#x4EEC;&#x628A;&#x6700;&#x5F00;&#x59CB;&#x7684;&#x4F8B;&#x5B50;&#x7528;Async/Await&#x7684;&#x65B9;&#x5F0F;&#x6539;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let getKeyPromise = function () {
    return new Promsie(function (resolve, reject) {
        $.ajax({
            type: &apos;get&apos;,
            url: &apos;http://localhost:3000/apiKey&apos;,
            success: function (data) {
               let key = data;
               resolve(key);         
            },
            error: function (err) {
                reject(err);
            }
        });
    });
};

let getTokenPromise = function (key) {
    return new Promsie(function (resolve, reject) {
        $.ajax({
            type: &apos;get&apos;,
            url: &apos;http://localhost:3000/getToken&apos;,
            data: {
                key: key
            },
            success: function (data) {
                resolve(data);         
            },
            error: function (err) {
                reject(err);
            }
        });
    });
};

let getDataPromise = function (data) {
    let token = data.token;
    let userId = data.userId;
    
    return new Promsie(function (resolve, reject) {
        $.ajax({
            type: &apos;get&apos;,
            url: &apos;http://localhost:3000/getData&apos;,
            data: {
                token: token,
                userId: userId
            },
            success: function (data) {
                resolve(data);         
            },
            error: function (err) {
                reject(err);
            }
        });
    });
};

async function main () {
    let key = await getKeyPromise();
    let loginData = await getTokenPromise(key);
    let busiData = await getDataPromise(loginData);
    
    console.log(&apos;&#x4E1A;&#x52A1;&#x6570;&#x636E;&#xFF1A;&apos;, busiData);
}

main();

console.log(&apos;&#x4E0D;&#x5F71;&#x54CD;&#x4E3B;&#x7EBF;&#x7A0B;&#x6267;&#x884C;&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> getKeyPromise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promsie(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        $.ajax({
            <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;get&apos;</span>,
            <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://localhost:3000/apiKey&apos;</span>,
            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
               <span class="hljs-keyword">let</span> key = data;
               resolve(key);         
            },
            <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
                reject(err);
            }
        });
    });
};

<span class="hljs-keyword">let</span> getTokenPromise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promsie(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        $.ajax({
            <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;get&apos;</span>,
            <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://localhost:3000/getToken&apos;</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">key</span>: key
            },
            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
                resolve(data);         
            },
            <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
                reject(err);
            }
        });
    });
};

<span class="hljs-keyword">let</span> getDataPromise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">let</span> token = data.token;
    <span class="hljs-keyword">let</span> userId = data.userId;
    
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promsie(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        $.ajax({
            <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;get&apos;</span>,
            <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://localhost:3000/getData&apos;</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">token</span>: token,
                <span class="hljs-attr">userId</span>: userId
            },
            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
                resolve(data);         
            },
            <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
                reject(err);
            }
        });
    });
};

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> key = <span class="hljs-keyword">await</span> getKeyPromise();
    <span class="hljs-keyword">let</span> loginData = <span class="hljs-keyword">await</span> getTokenPromise(key);
    <span class="hljs-keyword">let</span> busiData = <span class="hljs-keyword">await</span> getDataPromise(loginData);
    
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x4E1A;&#x52A1;&#x6570;&#x636E;&#xFF1A;&apos;</span>, busiData);
}

main();

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x4E0D;&#x5F71;&#x54CD;&#x4E3B;&#x7EBF;&#x7A0B;&#x6267;&#x884C;&apos;</span>);</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x4F7F;&#x7528;Async/Await&#xFF0C;&#x5B8C;&#x5168;&#x5C31;&#x662F;&#x540C;&#x6B65;&#x7684;&#x4E66;&#x5199;&#x65B9;&#x5F0F;&#xFF0C;&#x903B;&#x8F91;&#x548C;&#x6570;&#x636E;&#x4F9D;&#x8D56;&#x90FD;&#x975E;&#x5E38;&#x6E05;&#x695A;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x628A;&#x5F02;&#x6B65;&#x7684;&#x4E1C;&#x897F;&#x7528;Promise&#x5C01;&#x88C5;&#x51FA;&#x53BB;&#xFF0C;&#x7136;&#x540E;&#x4F7F;&#x7528;await&#x8C03;&#x7528;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x4E5F;&#x4E0D;&#x9700;&#x8981;&#x50CF;Generator&#x4E00;&#x6837;&#x9700;&#x8981;&#x624B;&#x52A8;&#x63A7;&#x5236;next()&#x6267;&#x884C;&#x3002;</p><p><strong>Async/Await&#x662F;Generator&#x548C;Promise&#x7684;&#x7EC4;&#x5408;&#xFF0C;&#x5B8C;&#x5168;&#x89E3;&#x51B3;&#x4E86;&#x57FA;&#x4E8E;&#x56DE;&#x8C03;&#x7684;&#x5F02;&#x6B65;&#x6D41;&#x7A0B;&#x5B58;&#x5728;&#x7684;&#x4E24;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x80FD;&#x662F;&#x73B0;&#x5728;&#x6700;&#x597D;&#x7684;JavaScript&#x5904;&#x7406;&#x5F02;&#x6B65;&#x7684;&#x65B9;&#x5F0F;&#x4E86;&#x3002;</strong></p><h2 id="articleHeader15">&#x603B;&#x7ED3;</h2><p>&#x672C;&#x6587;&#x901A;&#x8FC7;&#x56DB;&#x4E2A;&#x9636;&#x6BB5;&#x6765;&#x8BB2;&#x8FF0;JavaScript&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x7684;&#x53D1;&#x5C55;&#x5386;&#x7A0B;&#xFF1A;</p><ol><li><p><strong>&#x7B2C;&#x4E00;&#x4E2A;&#x9636;&#x6BB5; - &#x56DE;&#x8C03;&#x51FD;&#x6570;</strong>&#xFF0C;&#x4F46;&#x4F1A;&#x5BFC;&#x81F4;&#x4E24;&#x4E2A;&#x95EE;&#x9898;:</p><ul><li>&#x7F3A;&#x4E4F;&#x987A;&#x5E8F;&#x6027;&#xFF1A; &#x56DE;&#x8C03;&#x5730;&#x72F1;&#x5BFC;&#x81F4;&#x7684;&#x8C03;&#x8BD5;&#x56F0;&#x96BE;&#xFF0C;&#x548C;&#x5927;&#x8111;&#x7684;&#x601D;&#x7EF4;&#x65B9;&#x5F0F;&#x4E0D;&#x7B26;</li><li>&#x7F3A;&#x4E4F;&#x53EF;&#x4FE1;&#x4EFB;&#x6027;&#xFF1A; &#x63A7;&#x5236;&#x53CD;&#x8F6C;&#x5BFC;&#x81F4;&#x7684;&#x4E00;&#x7CFB;&#x5217;&#x4FE1;&#x4EFB;&#x95EE;&#x9898;</li></ul></li><li><strong>&#x7B2C;&#x4E8C;&#x4E2A;&#x9636;&#x6BB5; - Promise</strong>&#xFF0C;Promise&#x662F;&#x57FA;&#x4E8E;PromiseA+&#x89C4;&#x8303;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x5B83;&#x5F88;&#x597D;&#x7684;&#x89E3;&#x51B3;&#x4E86;&#x63A7;&#x5236;&#x53CD;&#x8F6C;&#x5BFC;&#x81F4;&#x7684;&#x4FE1;&#x4EFB;&#x95EE;&#x9898;&#xFF0C;&#x5C06;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x7684;&#x4E3B;&#x52A8;&#x6743;&#x91CD;&#x65B0;&#x62FF;&#x4E86;&#x56DE;&#x6765;&#x3002;</li><li><strong>&#x7B2C;&#x4E09;&#x4E2A;&#x9636;&#x6BB5; - &#x751F;&#x6210;&#x5668;&#x51FD;&#x6570;Generator</strong>&#xFF0C;&#x4F7F;&#x7528;Generator&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x7528;&#x540C;&#x6B65;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x4E66;&#x5199;&#x4EE3;&#x7801;&#xFF0C;&#x89E3;&#x51B3;&#x4E86;&#x987A;&#x5E8F;&#x6027;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x9700;&#x8981;&#x624B;&#x52A8;&#x53BB;&#x63A7;&#x5236;next(...)&#xFF0C;&#x5C06;&#x56DE;&#x8C03;&#x6210;&#x529F;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x9001;&#x56DE;JavaScript&#x4E3B;&#x6D41;&#x7A0B;&#x4E2D;&#x3002;</li><li><strong>&#x7B2C;&#x56DB;&#x4E2A;&#x9636;&#x6BB5; - Async/Await</strong>&#xFF0C;Async/Await&#x7ED3;&#x5408;&#x4E86;Promise&#x548C;Generator&#xFF0C;&#x5728;await&#x540E;&#x9762;&#x8DDF;&#x4E00;&#x4E2A;Promise&#xFF0C;&#x5B83;&#x4F1A;&#x81EA;&#x52A8;&#x7B49;&#x5F85;Promise&#x7684;&#x51B3;&#x8BAE;&#x503C;&#xFF0C;&#x89E3;&#x51B3;&#x4E86;Generator&#x9700;&#x8981;&#x624B;&#x52A8;&#x63A7;&#x5236;next(...)&#x6267;&#x884C;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x771F;&#x6B63;&#x5B9E;&#x73B0;&#x4E86;<strong>&#x7528;&#x540C;&#x6B65;&#x7684;&#x65B9;&#x5F0F;&#x4E66;&#x5199;&#x5F02;&#x6B65;&#x4EE3;&#x7801;</strong>&#x3002;</li></ol><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x6BCF;&#x9879;&#x6280;&#x672F;&#x7684;&#x7A81;&#x7834;&#x90FD;&#x662F;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x73B0;&#x6709;&#x6280;&#x672F;&#x5B58;&#x5728;&#x7684;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x5B83;&#x662F;&#x5FAA;&#x5E8F;&#x6E10;&#x8FDB;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x5B66;&#x4E60;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x8981;&#x771F;&#x6B63;&#x53BB;&#x7406;&#x89E3;&#x8FD9;&#x9879;&#x6280;&#x672F;&#x89E3;&#x51B3;&#x4E86;&#x54EA;&#x4E9B;&#x75DB;&#x70B9;&#xFF0C;&#x5B83;&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x5B58;&#x5728;&#xFF0C;&#x8FD9;&#x6837;&#x4F1A;&#x6709;&#x76CA;&#x4E8E;&#x6211;&#x4EEC;&#x6784;&#x5EFA;&#x4F53;&#x7CFB;&#x5316;&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x4F1A;&#x66F4;&#x597D;&#x7684;&#x53BB;&#x7406;&#x89E3;&#x8FD9;&#x95E8;&#x6280;&#x672F;&#x3002;</p><p><strong>&#x6700;&#x540E;&#xFF0C;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x5BF9;JavaScript&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x6709;&#x4E00;&#x4E2A;&#x66F4;&#x5B8F;&#x89C2;&#x7684;&#x4F53;&#x7CFB;&#x5316;&#x7684;&#x4E86;&#x89E3;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x8D77;&#x8FDB;&#x6B65;</strong>&#x3002;</p><h2 id="articleHeader16">&#x53C2;&#x8003;&#xFF1A;</h2><ol><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#iterable" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript异步编程

## 原文链接
[https://segmentfault.com/a/1190000015711829](https://segmentfault.com/a/1190000015711829)

