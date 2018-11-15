---
title: 做面试的不倒翁：浅谈 Vue 中 computed 实现原理
reprint: true
categories: reprint
abbrlink: cf712ace
date: 2018-11-02 02:30:12
---

{{% raw %}}
<blockquote>&#x7F16;&#x8005;&#x6309;&#xFF1A;&#x6211;&#x4EEC;&#x4F1A;&#x4E0D;&#x65F6;&#x9080;&#x8BF7;&#x5DE5;&#x7A0B;&#x5E08;&#x8C08;&#x8C08;&#x6709;&#x610F;&#x601D;&#x7684;&#x6280;&#x672F;&#x7EC6;&#x8282;&#xFF0C;&#x5E0C;&#x671B;&#x77E5;&#x5176;&#x6240;&#x4EE5;&#x7136;&#x80FD;&#x8BA9;&#x5927;&#x5BB6;&#x5728;&#x9762;&#x8BD5;&#x6709;&#x66F4;&#x51FA;&#x8272;&#x8868;&#x73B0;&#x3002;<del>&#x4E5F;&#x7ED9;&#x9762;&#x8BD5;&#x5B98;&#x63D0;&#x4F9B;&#x66F4;&#x591A;&#x601D;&#x8DEF;&#x3002;</del></blockquote><p><span class="img-wrap"><img data-src="/img/bVbgYyU?w=1200&amp;h=600" src="https://static.alili.tech/img/bVbgYyU?w=1200&amp;h=600" alt="" title="" style="cursor:pointer;display:inline"></span></p><hr><p>&#x867D;&#x7136;&#x76EE;&#x524D;&#x7684;&#x6280;&#x672F;&#x6808;&#x5DF2;&#x7531; Vue &#x8F6C;&#x5230;&#x4E86; React&#xFF0C;&#x4F46;&#x4ECE;&#x4E4B;&#x524D;&#x4F7F;&#x7528; Vue &#x5F00;&#x53D1;&#x7684;&#x591A;&#x4E2A;&#x9879;&#x76EE;&#x5B9E;&#x9645;&#x7ECF;&#x5386;&#x6765;&#x770B;&#x8FD8;&#x662F;&#x975E;&#x5E38;&#x6109;&#x60A6;&#x7684;&#xFF0C;Vue &#x6587;&#x6863;&#x6E05;&#x6670;&#x89C4;&#x8303;&#xFF0C;api &#x8BBE;&#x8BA1;&#x7B80;&#x6D01;&#x9AD8;&#x6548;&#xFF0C;&#x5BF9;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x53CB;&#x597D;&#xFF0C;&#x4E0A;&#x624B;&#x5FEB;&#xFF0C;&#x751A;&#x81F3;&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A;&#x5728;&#x5F88;&#x591A;&#x573A;&#x666F;&#x4F7F;&#x7528; Vue &#x6BD4; React &#x5F00;&#x53D1;&#x6548;&#x7387;&#x66F4;&#x9AD8;&#xFF0C;&#x4E4B;&#x524D;&#x4E5F;&#x6709;&#x65AD;&#x65AD;&#x7EED;&#x7EED;&#x7814;&#x8BFB;&#x8FC7; Vue &#x7684;&#x6E90;&#x7801;&#xFF0C;&#x4F46;&#x4E00;&#x76F4;&#x6CA1;&#x6709;&#x68B3;&#x7406;&#x603B;&#x7ED3;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x6B64;&#x505A;&#x4E00;&#x4E9B;&#x6280;&#x672F;&#x5F52;&#x7EB3;&#x540C;&#x65F6;&#x4E5F;&#x52A0;&#x6DF1;&#x81EA;&#x5DF1;&#x5BF9; Vue &#x7684;&#x7406;&#x89E3;&#xFF0C;&#x90A3;&#x4E48;&#x4ECA;&#x5929;&#x8981;&#x5199;&#x7684;&#x4FBF;&#x662F; Vue &#x4E2D;&#x6700;&#x5E38;&#x7528;&#x5230;&#x7684; API &#x4E4B;&#x4E00; <code>computed</code> &#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x3002;</p><h2 id="articleHeader0">&#x57FA;&#x672C;&#x4ECB;&#x7ECD;</h2><p>&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x4E00;&#x4E2A;&#x6700;&#x57FA;&#x672C;&#x7684;&#x4F8B;&#x5B50;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;p&gt;{{fullName}}&lt;/p&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">{{fullName}}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    data: {
        firstName: &apos;Xiao&apos;,
        lastName: &apos;Ming&apos;
    },
    computed: {
        fullName: function () {
            return this.firstName + &apos; &apos; + this.lastName
        }
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">firstName</span>: <span class="hljs-string">&apos;Xiao&apos;</span>,
        <span class="hljs-attr">lastName</span>: <span class="hljs-string">&apos;Ming&apos;</span>
    },
    <span class="hljs-attr">computed</span>: {
        <span class="hljs-attr">fullName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.firstName + <span class="hljs-string">&apos; &apos;</span> + <span class="hljs-keyword">this</span>.lastName
        }
    }
})</code></pre><p>Vue &#x4E2D;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x5728; template &#x91CC;&#x9762;&#x76F4;&#x63A5;&#x8BA1;&#x7B97; <code>{{this.firstName + &apos; &apos; + this.lastName}}</code>&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x6A21;&#x7248;&#x4E2D;&#x653E;&#x5165;&#x592A;&#x591A;&#x58F0;&#x660E;&#x5F0F;&#x7684;&#x903B;&#x8F91;&#x4F1A;&#x8BA9;&#x6A21;&#x677F;&#x672C;&#x8EAB;&#x8FC7;&#x91CD;&#xFF0C;&#x5C24;&#x5176;&#x5F53;&#x5728;&#x9875;&#x9762;&#x4E2D;&#x4F7F;&#x7528;&#x5927;&#x91CF;&#x590D;&#x6742;&#x7684;&#x903B;&#x8F91;&#x8868;&#x8FBE;&#x5F0F;&#x5904;&#x7406;&#x6570;&#x636E;&#x65F6;&#xFF0C;&#x4F1A;&#x5BF9;&#x9875;&#x9762;&#x7684;&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x9020;&#x6210;&#x5F88;&#x5927;&#x7684;&#x5F71;&#x54CD;&#xFF0C;&#x800C; <code>computed</code> &#x7684;&#x8BBE;&#x8BA1;&#x521D;&#x8877;&#x4E5F;&#x6B63;&#x662F;&#x7528;&#x4E8E;&#x89E3;&#x51B3;&#x6B64;&#x7C7B;&#x95EE;&#x9898;&#x3002;</p><h2 id="articleHeader1">&#x5BF9;&#x6BD4;&#x4FA6;&#x542C;&#x5668; <code>watch</code></h2><p>&#x5F53;&#x7136;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x4F7F;&#x7528; <code>computed</code> &#x65F6;&#x5F80;&#x5F80;&#x4F1A;&#x4E0E; Vue &#x4E2D;&#x53E6;&#x4E00;&#x4E2A; API &#x4E5F;&#x5C31;&#x662F;&#x4FA6;&#x542C;&#x5668; <code>watch</code> &#x76F8;&#x6BD4;&#x8F83;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x67D0;&#x4E9B;&#x65B9;&#x9762;&#x5B83;&#x4EEC;&#x662F;&#x4E00;&#x81F4;&#x7684;&#xFF0C;&#x90FD;&#x662F;&#x4EE5; Vue &#x7684;&#x4F9D;&#x8D56;&#x8FFD;&#x8E2A;&#x673A;&#x5236;&#x4E3A;&#x57FA;&#x7840;&#xFF0C;&#x5F53;&#x67D0;&#x4E2A;&#x4F9D;&#x8D56;&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#x7684;&#x76F8;&#x5173;&#x6570;&#x636E;&#x6216;&#x51FD;&#x6570;&#x90FD;&#x4F1A;&#x81EA;&#x52A8;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x6216;&#x8C03;&#x7528;&#x3002;</p><blockquote>&#x867D;&#x7136;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x5728;&#x5927;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#x66F4;&#x5408;&#x9002;&#xFF0C;&#x4F46;&#x6709;&#x65F6;&#x4E5F;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x4FA6;&#x542C;&#x5668;&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x4E3A;&#x4EC0;&#x4E48; Vue &#x901A;&#x8FC7; <code>watch</code> &#x9009;&#x9879;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x66F4;&#x901A;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x7684;&#x53D8;&#x5316;&#x3002;&#x5F53;&#x9700;&#x8981;&#x5728;&#x6570;&#x636E;&#x53D8;&#x5316;&#x65F6;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x6216;&#x5F00;&#x9500;&#x8F83;&#x5927;&#x7684;&#x64CD;&#x4F5C;&#x65F6;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x5F0F;&#x662F;&#x6700;&#x6709;&#x7528;&#x7684;&#x3002;</blockquote><p>&#x4ECE; Vue &#x5B98;&#x65B9;&#x6587;&#x6863;&#x5BF9; <code>watch</code> &#x7684;&#x89E3;&#x91CA;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E86;&#x89E3;&#x5230;&#xFF0C;&#x4F7F;&#x7528; <code>watch</code> &#x9009;&#x9879;&#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF08;&#x8BBF;&#x95EE;&#x4E00;&#x4E2A; API&#xFF09;&#x6216;&#x9AD8;&#x6D88;&#x8017;&#x6027;&#x80FD;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x9650;&#x5236;&#x6211;&#x4EEC;&#x6267;&#x884C;&#x8BE5;&#x64CD;&#x4F5C;&#x7684;&#x9891;&#x7387;&#xFF0C;&#x5E76;&#x5728;&#x6211;&#x4EEC;&#x5F97;&#x5230;&#x6700;&#x7EC8;&#x7ED3;&#x679C;&#x524D;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E2D;&#x95F4;&#x72B6;&#x6001;&#xFF0C;&#x800C;&#x8FD9;&#x4E9B;&#x90FD;&#x662F;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x65E0;&#x6CD5;&#x505A;&#x5230;&#x7684;&#x3002;</p><p><strong>&#x4E0B;&#x9762;&#x8FD8;&#x53E6;&#x5916;&#x603B;&#x7ED3;&#x4E86;&#x51E0;&#x70B9;&#x5173;&#x4E8E; <code>computed</code> &#x548C; <code>watch</code> &#x7684;&#x5DEE;&#x5F02;&#xFF1A;</strong></p><ol><li><code>computed</code> &#x662F;&#x8BA1;&#x7B97;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x5C06;&#x8BE5;&#x5C5E;&#x6027;&#x6302;&#x8F7D;&#x5230; vm&#xFF08;Vue &#x5B9E;&#x4F8B;&#xFF09;&#x4E0A;&#xFF0C;&#x800C; <code>watch</code> &#x662F;&#x76D1;&#x542C;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x4E14;&#x5DF2;&#x6302;&#x8F7D;&#x5230; <code>vm</code> &#x4E0A;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x6240;&#x4EE5;&#x7528; <code>watch</code> &#x540C;&#x6837;&#x53EF;&#x4EE5;&#x76D1;&#x542C; <code>computed</code> &#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x53D8;&#x5316;&#xFF08;&#x5176;&#x5B83;&#x8FD8;&#x6709; <code>data</code>&#x3001;<code>props</code>&#xFF09;</li><li><code>computed</code> &#x672C;&#x8D28;&#x662F;&#x4E00;&#x4E2A;&#x60F0;&#x6027;&#x6C42;&#x503C;&#x7684;&#x89C2;&#x5BDF;&#x8005;&#xFF0C;&#x5177;&#x6709;&#x7F13;&#x5B58;&#x6027;&#xFF0C;&#x53EA;&#x6709;&#x5F53;&#x4F9D;&#x8D56;&#x53D8;&#x5316;&#x540E;&#xFF0C;&#x7B2C;&#x4E00;&#x6B21;&#x8BBF;&#x95EE; <code>computed</code> &#x5C5E;&#x6027;&#xFF0C;&#x624D;&#x4F1A;&#x8BA1;&#x7B97;&#x65B0;&#x7684;&#x503C;&#xFF0C;&#x800C; <code>watch</code> &#x5219;&#x662F;&#x5F53;&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x4FBF;&#x4F1A;&#x8C03;&#x7528;&#x6267;&#x884C;&#x51FD;&#x6570;</li><li>&#x4ECE;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x4E0A;&#x8BF4;&#xFF0C;<code>computed</code> &#x9002;&#x7528;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x88AB;&#x591A;&#x4E2A;&#x6570;&#x636E;&#x5F71;&#x54CD;&#xFF0C;&#x800C; <code>watch</code> &#x9002;&#x7528;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x5F71;&#x54CD;&#x591A;&#x4E2A;&#x6570;&#x636E;&#xFF1B;</li></ol><p>&#x4EE5;&#x4E0A;&#x6211;&#x4EEC;&#x4E86;&#x89E3;&#x4E86; <code>computed</code> &#x548C; <code>watch</code> &#x4E4B;&#x95F4;&#x7684;&#x4E00;&#x4E9B;&#x5DEE;&#x5F02;&#x548C;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x5F53;&#x7136;&#x67D0;&#x4E9B;&#x65F6;&#x5019;&#x4E24;&#x8005;&#x5E76;&#x6CA1;&#x6709;&#x90A3;&#x4E48;&#x660E;&#x786E;&#x4E25;&#x683C;&#x7684;&#x9650;&#x5236;&#xFF0C;&#x6700;&#x540E;&#x8FD8;&#x662F;&#x8981;&#x5177;&#x4F53;&#x5230;&#x4E0D;&#x540C;&#x7684;&#x4E1A;&#x52A1;&#x8FDB;&#x884C;&#x5206;&#x6790;&#x3002;</p><h2 id="articleHeader2">&#x539F;&#x7406;&#x5206;&#x6790;</h2><p>&#x8A00;&#x5F52;&#x6B63;&#x4F20;&#xFF0C;&#x56DE;&#x5230;&#x6587;&#x7AE0;&#x7684;&#x4E3B;&#x9898; <code>computed</code> &#x8EAB;&#x4E0A;&#xFF0C;&#x4E3A;&#x4E86;&#x66F4;&#x6DF1;&#x5C42;&#x6B21;&#x5730;&#x4E86;&#x89E3;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x5185;&#x5728;&#x673A;&#x5236;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x8BA9;&#x6211;&#x4EEC;&#x4E00;&#x6B65;&#x6B65;&#x63A2;&#x7D22; Vue &#x6E90;&#x7801;&#x4E2D;&#x5173;&#x4E8E;&#x5B83;&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x5427;&#x3002;</p><p>&#x5728;&#x5206;&#x6790; <code>computed</code> &#x6E90;&#x7801;&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x5148;&#x5F97;&#x5BF9; Vue &#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x7CFB;&#x7EDF;&#x6709;&#x4E00;&#x4E2A;&#x57FA;&#x672C;&#x7684;&#x4E86;&#x89E3;&#xFF0C;Vue &#x79F0;&#x5176;&#x4E3A;&#x975E;&#x4FB5;&#x5165;&#x6027;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x7CFB;&#x7EDF;&#xFF0C;&#x6570;&#x636E;&#x6A21;&#x578B;&#x4EC5;&#x4EC5;&#x662F;&#x666E;&#x901A;&#x7684; JavaScript &#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x5F53;&#x4F60;&#x4FEE;&#x6539;&#x5B83;&#x4EEC;&#x65F6;&#xFF0C;&#x89C6;&#x56FE;&#x4FBF;&#x4F1A;&#x8FDB;&#x884C;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbgVln?w=610&amp;h=392" src="https://static.alili.tech/img/bVbgVln?w=610&amp;h=392" alt="" title="" style="cursor:pointer;display:inline"></span></p><blockquote>&#x5F53;&#x4F60;&#x628A;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684; JavaScript &#x5BF9;&#x8C61;&#x4F20;&#x7ED9; Vue &#x5B9E;&#x4F8B;&#x7684; <code>data</code> &#x9009;&#x9879;&#x65F6;&#xFF0C;Vue &#x5C06;&#x904D;&#x5386;&#x6B64;&#x5BF9;&#x8C61;&#x6240;&#x6709;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x4F7F;&#x7528; <code>Object.defineProperty</code> &#x628A;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#x5168;&#x90E8;&#x8F6C;&#x4E3A; <code>getter/setter</code>&#xFF0C;&#x8FD9;&#x4E9B; <code>getter/setter</code> &#x5BF9;&#x7528;&#x6237;&#x6765;&#x8BF4;&#x662F;&#x4E0D;&#x53EF;&#x89C1;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x5185;&#x90E8;&#x5B83;&#x4EEC;&#x8BA9; Vue &#x8FFD;&#x8E2A;&#x4F9D;&#x8D56;&#xFF0C;&#x5728;&#x5C5E;&#x6027;&#x88AB;&#x8BBF;&#x95EE;&#x548C;&#x4FEE;&#x6539;&#x65F6;&#x901A;&#x77E5;&#x53D8;&#x5316;&#xFF0C;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x90FD;&#x6709;&#x76F8;&#x5E94;&#x7684; <code>watcher</code> &#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x4F1A;&#x5728;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x628A;&#x5C5E;&#x6027;&#x8BB0;&#x5F55;&#x4E3A;&#x4F9D;&#x8D56;&#xFF0C;&#x4E4B;&#x540E;&#x5F53;&#x4F9D;&#x8D56;&#x9879;&#x7684; <code>setter</code> &#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x4F1A;&#x901A;&#x77E5; <code>watcher</code> &#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#xFF0C;&#x4ECE;&#x800C;&#x81F4;&#x4F7F;&#x5B83;&#x5173;&#x8054;&#x7684;&#x7EC4;&#x4EF6;&#x5F97;&#x4EE5;&#x66F4;&#x65B0;&#x3002;</blockquote><p>Vue &#x54CD;&#x5E94;&#x7CFB;&#x7EDF;&#xFF0C;&#x5176;&#x6838;&#x5FC3;&#x6709;&#x4E09;&#x70B9;&#xFF1A;<code>observe</code>&#x3001;<code>watcher</code>&#x3001;<code>dep</code>&#xFF1A;</p><ol><li><code>observe</code>&#xFF1A;&#x904D;&#x5386; <code>data</code> &#x4E2D;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x4F7F;&#x7528; <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">Object.defineProperty</a> &#x7684; <code>get/set</code> &#x65B9;&#x6CD5;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x52AB;&#x6301;&#xFF1B;</li><li><code>dep</code>&#xFF1A;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x62E5;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x6D88;&#x606F;&#x8BA2;&#x9605;&#x5668; <code>dep</code>&#xFF0C;&#x7528;&#x4E8E;&#x5B58;&#x653E;&#x6240;&#x6709;&#x8BA2;&#x9605;&#x4E86;&#x8BE5;&#x5C5E;&#x6027;&#x7684;&#x89C2;&#x5BDF;&#x8005;&#x5BF9;&#x8C61;&#xFF1B;</li><li><code>watcher</code>&#xFF1A;&#x89C2;&#x5BDF;&#x8005;&#xFF08;&#x5BF9;&#x8C61;&#xFF09;&#xFF0C;&#x901A;&#x8FC7; <code>dep</code> &#x5B9E;&#x73B0;&#x5BF9;&#x54CD;&#x5E94;&#x5C5E;&#x6027;&#x7684;&#x76D1;&#x542C;&#xFF0C;&#x76D1;&#x542C;&#x5230;&#x7ED3;&#x679C;&#x540E;&#xFF0C;&#x4E3B;&#x52A8;&#x89E6;&#x53D1;&#x81EA;&#x5DF1;&#x7684;&#x56DE;&#x8C03;&#x8FDB;&#x884C;&#x54CD;&#x5E94;&#x3002;</li></ol><p>&#x5BF9;&#x54CD;&#x5E94;&#x5F0F;&#x7CFB;&#x7EDF;&#x6709;&#x4E00;&#x4E2A;&#x521D;&#x6B65;&#x4E86;&#x89E3;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x6765;&#x5206;&#x6790;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x3002;<br>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x627E;&#x5230;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x521D;&#x59CB;&#x5316;&#x662F;&#x5728; <code>src/core/instance/state.js</code> &#x6587;&#x4EF6;&#x4E2D;&#x7684; <code>initState</code> &#x51FD;&#x6570;&#x4E2D;&#x5B8C;&#x6210;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  // computed&#x521D;&#x59CB;&#x5316;
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch &amp;&amp; opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initState</span> (<span class="hljs-params">vm: Component</span>) </span>{
  vm._watchers = []
  <span class="hljs-keyword">const</span> opts = vm.$options
  <span class="hljs-keyword">if</span> (opts.props) initProps(vm, opts.props)
  <span class="hljs-keyword">if</span> (opts.methods) initMethods(vm, opts.methods)
  <span class="hljs-keyword">if</span> (opts.data) {
    initData(vm)
  } <span class="hljs-keyword">else</span> {
    observe(vm._data = {}, <span class="hljs-literal">true</span> <span class="hljs-comment">/* asRootData */</span>)
  }
  <span class="hljs-comment">// computed&#x521D;&#x59CB;&#x5316;</span>
  <span class="hljs-keyword">if</span> (opts.computed) initComputed(vm, opts.computed)
  <span class="hljs-keyword">if</span> (opts.watch &amp;&amp; opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}</code></pre><p>&#x8C03;&#x7528;&#x4E86; <code>initComputed</code> &#x51FD;&#x6570;&#xFF08;&#x5176;&#x524D;&#x540E;&#x4E5F;&#x5206;&#x522B;&#x521D;&#x59CB;&#x5316;&#x4E86; <code>initData</code> &#x548C; <code>initWatch</code> &#xFF09;&#x5E76;&#x4F20;&#x5165;&#x4E24;&#x4E2A;&#x53C2;&#x6570; <code>vm</code> &#x5B9E;&#x4F8B;&#x548C; <code>opt.computed</code> &#x5F00;&#x53D1;&#x8005;&#x5B9A;&#x4E49;&#x7684; <code>computed</code> &#x9009;&#x9879;&#xFF0C;&#x8F6C;&#x5230; <code>initComputed</code> &#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const computedWatcherOptions = { computed: true }

function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === &apos;function&apos; ? userDef : userDef.get
    if (process.env.NODE_ENV !== &apos;production&apos; &amp;&amp; getter == null) {
      warn(
        &apos;Getter is missing for computed property &quot;${key}&quot;.&apos;,
        vm
      )
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== &apos;production&apos;) {
      if (key in vm.$data) {
        warn(&apos;The computed property &quot;${key}&quot; is already defined in data.&apos;, vm)
      } else if (vm.$options.props &amp;&amp; key in vm.$options.props) {
        warn(&apos;The computed property &quot;${key}&quot; is already defined as a prop.&apos;, vm)
      }
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> computedWatcherOptions = { <span class="hljs-attr">computed</span>: <span class="hljs-literal">true</span> }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initComputed</span> (<span class="hljs-params">vm: Component, computed: Object</span>) </span>{
  <span class="hljs-comment">// $flow-disable-line</span>
  <span class="hljs-keyword">const</span> watchers = vm._computedWatchers = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
  <span class="hljs-comment">// computed properties are just getters during SSR</span>
  <span class="hljs-keyword">const</span> isSSR = isServerRendering()

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> computed) {
    <span class="hljs-keyword">const</span> userDef = computed[key]
    <span class="hljs-keyword">const</span> getter = <span class="hljs-keyword">typeof</span> userDef === <span class="hljs-string">&apos;function&apos;</span> ? userDef : userDef.get
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span> &amp;&amp; getter == <span class="hljs-literal">null</span>) {
      warn(
        <span class="hljs-string">&apos;Getter is missing for computed property &quot;${key}&quot;.&apos;</span>,
        vm
      )
    }

    <span class="hljs-keyword">if</span> (!isSSR) {
      <span class="hljs-comment">// create internal watcher for the computed property.</span>
      watchers[key] = <span class="hljs-keyword">new</span> Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    <span class="hljs-comment">// component-defined computed properties are already defined on the</span>
    <span class="hljs-comment">// component prototype. We only need to define computed properties defined</span>
    <span class="hljs-comment">// at instantiation here.</span>
    <span class="hljs-keyword">if</span> (!(key <span class="hljs-keyword">in</span> vm)) {
      defineComputed(vm, key, userDef)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span>) {
      <span class="hljs-keyword">if</span> (key <span class="hljs-keyword">in</span> vm.$data) {
        warn(<span class="hljs-string">&apos;The computed property &quot;${key}&quot; is already defined in data.&apos;</span>, vm)
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (vm.$options.props &amp;&amp; key <span class="hljs-keyword">in</span> vm.$options.props) {
        warn(<span class="hljs-string">&apos;The computed property &quot;${key}&quot; is already defined as a prop.&apos;</span>, vm)
      }
    }
  }
}</code></pre><p>&#x4ECE;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x5F00;&#x59CB;&#x6211;&#x4EEC;&#x89C2;&#x5BDF;&#x8FD9;&#x51E0;&#x90E8;&#x5206;&#xFF1A;</p><ol><li><p>&#x83B7;&#x53D6;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x5B9A;&#x4E49; <code>userDef</code> &#x548C; <code>getter</code> &#x6C42;&#x503C;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const userDef = computed[key]
const getter = typeof userDef === &apos;function&apos; ? userDef : userDef.get" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> userDef = computed[key]
<span class="hljs-keyword">const</span> getter = <span class="hljs-keyword">typeof</span> userDef === <span class="hljs-string">&apos;function&apos;</span> ? userDef : userDef.get</code></pre><p>&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x6709;&#x4E24;&#x79CD;&#x5199;&#x6CD5;&#xFF0C;&#x4E00;&#x79CD;&#x662F;&#x76F4;&#x63A5;&#x8DDF;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x53E6;&#x4E00;&#x79CD;&#x662F;&#x6DFB;&#x52A0; <code>set</code> &#x548C; <code>get</code> &#x65B9;&#x6CD5;&#x7684;&#x5BF9;&#x8C61;&#x5F62;&#x5F0F;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x9996;&#x5148;&#x83B7;&#x53D6;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x5B9A;&#x4E49; <code>userDef</code>&#xFF0C;&#x518D;&#x6839;&#x636E; <code>userDef</code> &#x7684;&#x7C7B;&#x578B;&#x83B7;&#x53D6;&#x76F8;&#x5E94;&#x7684; <code>getter</code> &#x6C42;&#x503C;&#x51FD;&#x6570;&#x3002;</p></li><li><p>&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x89C2;&#x5BDF;&#x8005; <code>watcher</code> &#x548C;&#x6D88;&#x606F;&#x8BA2;&#x9605;&#x5668; <code>dep</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watchers[key] = new Watcher(
    vm,
    getter || noop,
    noop,
    computedWatcherOptions
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">watchers[key] = <span class="hljs-keyword">new</span> Watcher(
    vm,
    getter || noop,
    noop,
    computedWatcherOptions
)</code></pre><p>&#x8FD9;&#x91CC;&#x7684; <code>watchers</code> &#x4E5F;&#x5C31;&#x662F; <code>vm._computedWatchers</code> &#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x5B58;&#x653E;&#x4E86;&#x6BCF;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x89C2;&#x5BDF;&#x8005; <code>watcher</code> &#x5B9E;&#x4F8B;&#xFF08;&#x6CE8;&#xFF1A;&#x540E;&#x6587;&#x4E2D;&#x63D0;&#x5230;&#x7684;&#x201C;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x89C2;&#x5BDF;&#x8005;&#x201D;&#x3001;&#x201C;&#x8BA2;&#x9605;&#x8005;&#x201D;&#x548C; <code>watcher</code> &#x5747;&#x6307;&#x4EE3;&#x540C;&#x4E00;&#x4E2A;&#x610F;&#x601D;&#x4F46;&#x6CE8;&#x610F;&#x548C; <code>Watcher</code> &#x6784;&#x9020;&#x51FD;&#x6570;&#x533A;&#x5206;&#xFF09;&#xFF0C;<code>Watcher</code> &#x6784;&#x9020;&#x51FD;&#x6570;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x65F6;&#x4F20;&#x5165;&#x4E86; 4 &#x4E2A;&#x53C2;&#x6570;&#xFF1A;<code>vm</code> &#x5B9E;&#x4F8B;&#x3001;<code>getter</code>&#x6C42;&#x503C;&#x51FD;&#x6570;&#x3001;<code>noop</code> &#x7A7A;&#x51FD;&#x6570;&#x3001;<code>computedWatcherOptions</code> &#x5E38;&#x91CF;&#x5BF9;&#x8C61;&#xFF08;&#x5728;&#x8FD9;&#x91CC;&#x63D0;&#x4F9B;&#x7ED9; <code>Watcher</code> &#x4E00;&#x4E2A;&#x6807;&#x8BC6; <code>{computed:true}</code> &#x9879;&#xFF0C;&#x8868;&#x660E;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x800C;&#x4E0D;&#x662F;&#x975E;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x89C2;&#x5BDF;&#x8005;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x5230; <code>Watcher</code> &#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5B9A;&#x4E49;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Watcher {
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    if (options) {
      this.computed = !!options.computed
    } 

    if (this.computed) {
      this.value = undefined
      this.dep = new Dep()
    } else {
      this.value = this.get()
    }
  }
  
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      
    } finally {
      popTarget()
    }
    return value
  }
  
  update () {
    if (this.computed) {
      if (this.dep.subs.length === 0) {
        this.dirty = true
      } else {
        this.getAndInvoke(() =&gt; {
          this.dep.notify()
        })
      }
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  evaluate () {
    if (this.dirty) {
      this.value = this.get()
      this.dirty = false
    }
    return this.value
  }

  depend () {
    if (this.dep &amp;&amp; Dep.target) {
      this.dep.depend()
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watcher</span> </span>{
  <span class="hljs-keyword">constructor</span> (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    <span class="hljs-keyword">if</span> (options) {
      <span class="hljs-keyword">this</span>.computed = !!options.computed
    } 

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.computed) {
      <span class="hljs-keyword">this</span>.value = <span class="hljs-literal">undefined</span>
      <span class="hljs-keyword">this</span>.dep = <span class="hljs-keyword">new</span> Dep()
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.get()
    }
  }
  
  get () {
    pushTarget(<span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">let</span> value
    <span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">this</span>.vm
    <span class="hljs-keyword">try</span> {
      value = <span class="hljs-keyword">this</span>.getter.call(vm, vm)
    } <span class="hljs-keyword">catch</span> (e) {
      
    } <span class="hljs-keyword">finally</span> {
      popTarget()
    }
    <span class="hljs-keyword">return</span> value
  }
  
  update () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.computed) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.dep.subs.length === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">this</span>.dirty = <span class="hljs-literal">true</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.getAndInvoke(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.dep.notify()
        })
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.sync) {
      <span class="hljs-keyword">this</span>.run()
    } <span class="hljs-keyword">else</span> {
      queueWatcher(<span class="hljs-keyword">this</span>)
    }
  }

  evaluate () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.dirty) {
      <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.get()
      <span class="hljs-keyword">this</span>.dirty = <span class="hljs-literal">false</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.value
  }

  depend () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.dep &amp;&amp; Dep.target) {
      <span class="hljs-keyword">this</span>.dep.depend()
    }
  }
}</code></pre><p>&#x4E3A;&#x4E86;&#x7B80;&#x6D01;&#x7A81;&#x51FA;&#x91CD;&#x70B9;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x624B;&#x52A8;&#x53BB;&#x6389;&#x4E86;&#x6211;&#x4EEC;&#x6682;&#x65F6;&#x4E0D;&#x9700;&#x8981;&#x5173;&#x5FC3;&#x7684;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x3002;<br>&#x89C2;&#x5BDF; <code>Watcher</code> &#x7684; <code>constructor</code> &#xFF0C;&#x7ED3;&#x5408;&#x521A;&#x624D;&#x8BB2;&#x5230;&#x7684; <code>new Watcher</code> &#x4F20;&#x5165;&#x7684;&#x7B2C;&#x56DB;&#x4E2A;&#x53C2;&#x6570; <code>{computed:true}</code> &#x77E5;&#x9053;&#xFF0C;&#x5BF9;&#x4E8E;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x800C;&#x8A00; <code>watcher</code> &#x4F1A;&#x6267;&#x884C; <code>if</code> &#x6761;&#x4EF6;&#x6210;&#x7ACB;&#x7684;&#x4EE3;&#x7801; <code>this.dep = new Dep()</code>&#xFF0C;&#x800C; <code>dep</code> &#x4E5F;&#x5C31;&#x662F;&#x521B;&#x5EFA;&#x4E86;&#x8BE5;&#x5C5E;&#x6027;&#x7684;&#x6D88;&#x606F;&#x8BA2;&#x9605;&#x5668;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Dep {
  static target: ?Watcher;
  subs: Array&lt;Watcher&gt;;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i &lt; l; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null
  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dep</span> </span>{
  <span class="hljs-keyword">static</span> target: ?Watcher;
  subs: <span class="hljs-built_in">Array</span>&lt;Watcher&gt;;

  <span class="hljs-keyword">constructor</span> () {
    <span class="hljs-keyword">this</span>.id = uid++
    <span class="hljs-keyword">this</span>.subs = []
  }

  addSub (sub: Watcher) {
    <span class="hljs-keyword">this</span>.subs.push(sub)
  }

  depend () {
    <span class="hljs-keyword">if</span> (Dep.target) {
      Dep.target.addDep(<span class="hljs-keyword">this</span>)
    }
  }

  notify () {
    <span class="hljs-keyword">const</span> subs = <span class="hljs-keyword">this</span>.subs.slice()
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = subs.length; i &lt; l; i++) {
      subs[i].update()
    }
  }
}

Dep.target = <span class="hljs-literal">null</span>
  </code></pre><p><code>Dep</code> &#x540C;&#x6837;&#x7CBE;&#x7B80;&#x4E86;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x89C2;&#x5BDF; <code>Watcher</code> &#x548C; <code>Dep</code> &#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x7528;&#x4E00;&#x53E5;&#x8BDD;&#x603B;&#x7ED3;</p><blockquote><code>watcher</code> &#x4E2D;&#x5B9E;&#x4F8B;&#x5316;&#x4E86; <code>dep</code> &#x5E76;&#x5411; <code>dep.subs</code> &#x4E2D;&#x6DFB;&#x52A0;&#x4E86;&#x8BA2;&#x9605;&#x8005;&#xFF0C;<code>dep</code> &#x901A;&#x8FC7; <code>notify</code> &#x904D;&#x5386;&#x4E86; <code>dep.subs</code> &#x901A;&#x77E5;&#x6BCF;&#x4E2A; <code>watcher</code> &#x66F4;&#x65B0;&#x3002;</blockquote></li><li><p><code>defineComputed</code> &#x5B9A;&#x4E49;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!(key in vm)) {
  defineComputed(vm, key, userDef)
} else if (process.env.NODE_ENV !== &apos;production&apos;) {
  if (key in vm.$data) {
    warn(&apos;The computed property &quot;${key}&quot; is already defined in data.&apos;, vm)
  } else if (vm.$options.props &amp;&amp; key in vm.$options.props) {
    warn(&apos;The computed property &quot;${key}&quot; is already defined as a prop.&apos;, vm)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (!(key <span class="hljs-keyword">in</span> vm)) {
  defineComputed(vm, key, userDef)
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span>) {
  <span class="hljs-keyword">if</span> (key <span class="hljs-keyword">in</span> vm.$data) {
    warn(<span class="hljs-string">&apos;The computed property &quot;${key}&quot; is already defined in data.&apos;</span>, vm)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (vm.$options.props &amp;&amp; key <span class="hljs-keyword">in</span> vm.$options.props) {
    warn(<span class="hljs-string">&apos;The computed property &quot;${key}&quot; is already defined as a prop.&apos;</span>, vm)
  }
}</code></pre><p>&#x56E0;&#x4E3A; <code>computed</code> &#x5C5E;&#x6027;&#x662F;&#x76F4;&#x63A5;&#x6302;&#x8F7D;&#x5230;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x5B9A;&#x4E49;&#x4E4B;&#x524D;&#x9700;&#x8981;&#x5224;&#x65AD;&#x5BF9;&#x8C61;&#x4E2D;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x91CD;&#x540D;&#x7684;&#x5C5E;&#x6027;&#xFF0C;<code>defineComputed</code> &#x4F20;&#x5165;&#x4E86;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;<code>vm</code>&#x5B9E;&#x4F8B;&#x3001;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684; <code>key</code> &#x4EE5;&#x53CA; <code>userDef</code> &#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x5B9A;&#x4E49;&#xFF08;&#x5BF9;&#x8C61;&#x6216;&#x51FD;&#x6570;&#xFF09;&#x3002;<br>&#x7136;&#x540E;&#x7EE7;&#x7EED;&#x627E;&#x5230; <code>defineComputed</code> &#x5B9A;&#x4E49;&#x5904;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering()
  if (typeof userDef === &apos;function&apos;) {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache &amp;&amp; userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop
  }
  if (process.env.NODE_ENV !== &apos;production&apos; &amp;&amp;
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        &apos;Computed property &quot;${key}&quot; was assigned to but it has no setter.&apos;,
        this
      )
    }
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineComputed</span> (<span class="hljs-params">
  target: any,
  key: string,
  userDef: Object | Function
</span>) </span>{
  <span class="hljs-keyword">const</span> shouldCache = !isServerRendering()
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> userDef === <span class="hljs-string">&apos;function&apos;</span>) {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef
    sharedPropertyDefinition.set = noop
  } <span class="hljs-keyword">else</span> {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache &amp;&amp; userDef.cache !== <span class="hljs-literal">false</span>
        ? createComputedGetter(key)
        : userDef.get
      : noop
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop
  }
  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span> &amp;&amp;
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      warn(
        <span class="hljs-string">&apos;Computed property &quot;${key}&quot; was assigned to but it has no setter.&apos;</span>,
        <span class="hljs-keyword">this</span>
      )
    }
  }
  <span class="hljs-built_in">Object</span>.defineProperty(target, key, sharedPropertyDefinition)
}</code></pre><p>&#x5728;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x7684;&#x6700;&#x540E;&#x8C03;&#x7528;&#x4E86;&#x539F;&#x751F; <code>Object.defineProperty</code> &#x65B9;&#x6CD5;&#xFF0C;&#x5176;&#x4E2D;&#x4F20;&#x5165;&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x5C5E;&#x6027;&#x63CF;&#x8FF0;&#x7B26;<code>sharedPropertyDefinition</code>&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> sharedPropertyDefinition = {
  <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">get</span>: noop,
  <span class="hljs-attr">set</span>: noop
}</code></pre><p>&#x968F;&#x540E;&#x6839;&#x636E; <code>Object.defineProperty</code> &#x524D;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x770B;&#x5230; <code>sharedPropertyDefinition</code> &#x7684; <code>get/set</code> &#x65B9;&#x6CD5;&#x5728;&#x7ECF;&#x8FC7; <code>userDef</code> &#x548C; <code>shouldCache</code> &#x7B49;&#x591A;&#x91CD;&#x5224;&#x65AD;&#x540E;&#x88AB;&#x91CD;&#x5199;&#xFF0C;&#x5F53;&#x975E;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x65F6;&#xFF0C;<code>sharedPropertyDefinition</code> &#x7684; <code>get</code> &#x51FD;&#x6570;&#x4E5F;&#x5C31;&#x662F; <code>createComputedGetter(key)</code> &#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x6211;&#x4EEC;&#x627E;&#x5230; <code>createComputedGetter</code> &#x51FD;&#x6570;&#x8C03;&#x7528;&#x7ED3;&#x679C;&#x5E76;&#x6700;&#x7EC8;&#x6539;&#x5199; <code>sharedPropertyDefinition</code> &#x5927;&#x81F4;&#x5448;&#x73B0;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: function computedGetter () {
        const watcher = this._computedWatchers &amp;&amp; this._computedWatchers[key]
        if (watcher) {
            watcher.depend()
            return watcher.evaluate()
        }
    },
    set: userDef.set || noop
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">sharedPropertyDefinition = {
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">computedGetter</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">const</span> watcher = <span class="hljs-keyword">this</span>._computedWatchers &amp;&amp; <span class="hljs-keyword">this</span>._computedWatchers[key]
        <span class="hljs-keyword">if</span> (watcher) {
            watcher.depend()
            <span class="hljs-keyword">return</span> watcher.evaluate()
        }
    },
    <span class="hljs-attr">set</span>: userDef.set || noop
}</code></pre><p>&#x5F53;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x88AB;&#x8C03;&#x7528;&#x65F6;&#x4FBF;&#x4F1A;&#x6267;&#x884C; <code>get</code> &#x8BBF;&#x95EE;&#x51FD;&#x6570;&#xFF0C;&#x4ECE;&#x800C;&#x5173;&#x8054;&#x4E0A;&#x89C2;&#x5BDF;&#x8005;&#x5BF9;&#x8C61; <code>watcher</code> &#x7136;&#x540E;&#x6267;&#x884C; <code>wather.depend()</code> &#x6536;&#x96C6;&#x4F9D;&#x8D56;&#x548C; <code>watcher.evaluate()</code> &#x8BA1;&#x7B97;&#x6C42;&#x503C;&#x3002;</p></li></ol><h3 id="articleHeader3">&#x5206;&#x6790;&#x5B8C;&#x6240;&#x6709;&#x6B65;&#x9AA4;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x6765;&#x603B;&#x7ED3;&#x4E0B;&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#xFF1A;</h3><ol><li>&#x5F53;&#x7EC4;&#x4EF6;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;<code>computed</code> &#x548C; <code>data</code> &#x4F1A;&#x5206;&#x522B;&#x5EFA;&#x7ACB;&#x5404;&#x81EA;&#x7684;&#x54CD;&#x5E94;&#x7CFB;&#x7EDF;&#xFF0C;<code>Observer</code>&#x904D;&#x5386; <code>data</code> &#x4E2D;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x8BBE;&#x7F6E; <code>get/set</code> &#x6570;&#x636E;&#x62E6;&#x622A;</li><li><p>&#x521D;&#x59CB;&#x5316; <code>computed</code> &#x4F1A;&#x8C03;&#x7528; <code>initComputed</code> &#x51FD;&#x6570;</p><ol><li>&#x6CE8;&#x518C;&#x4E00;&#x4E2A; <code>watcher</code> &#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x5728;&#x5185;&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A; <code>Dep</code> &#x6D88;&#x606F;&#x8BA2;&#x9605;&#x5668;&#x7528;&#x4F5C;&#x540E;&#x7EED;&#x6536;&#x96C6;&#x4F9D;&#x8D56;&#xFF08;&#x6BD4;&#x5982;&#x6E32;&#x67D3;&#x51FD;&#x6570;&#x7684; <code>watcher</code> &#x6216;&#x8005;&#x5176;&#x4ED6;&#x89C2;&#x5BDF;&#x8BE5;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x53D8;&#x5316;&#x7684; <code>watcher</code> &#xFF09;</li><li>&#x8C03;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x65F6;&#x4F1A;&#x89E6;&#x53D1;&#x5176;<code>Object.defineProperty</code>&#x7684;<code>get</code>&#x8BBF;&#x95EE;&#x5668;&#x51FD;&#x6570;</li><li>&#x8C03;&#x7528; <code>watcher.depend()</code> &#x65B9;&#x6CD5;&#x5411;&#x81EA;&#x8EAB;&#x7684;&#x6D88;&#x606F;&#x8BA2;&#x9605;&#x5668; <code>dep</code> &#x7684; <code>subs</code> &#x4E2D;&#x6DFB;&#x52A0;&#x5176;&#x4ED6;&#x5C5E;&#x6027;&#x7684; <code>watcher</code></li><li>&#x8C03;&#x7528; <code>watcher</code> &#x7684; <code>evaluate</code> &#x65B9;&#x6CD5;&#xFF08;&#x8FDB;&#x800C;&#x8C03;&#x7528; <code>watcher</code> &#x7684; <code>get</code> &#x65B9;&#x6CD5;&#xFF09;&#x8BA9;&#x81EA;&#x8EAB;&#x6210;&#x4E3A;&#x5176;&#x4ED6; <code>watcher</code> &#x7684;&#x6D88;&#x606F;&#x8BA2;&#x9605;&#x5668;&#x7684;&#x8BA2;&#x9605;&#x8005;&#xFF0C;&#x9996;&#x5148;&#x5C06; <code>watcher</code> &#x8D4B;&#x7ED9; <code>Dep.target</code>&#xFF0C;&#x7136;&#x540E;&#x6267;&#x884C; <code>getter</code> &#x6C42;&#x503C;&#x51FD;&#x6570;&#xFF0C;&#x5F53;&#x8BBF;&#x95EE;&#x6C42;&#x503C;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x7684;&#x5C5E;&#x6027;&#xFF08;&#x6BD4;&#x5982;&#x6765;&#x81EA; <code>data</code>&#x3001;<code>props</code> &#x6216;&#x5176;&#x4ED6; <code>computed</code>&#xFF09;&#x65F6;&#xFF0C;&#x4F1A;&#x540C;&#x6837;&#x89E6;&#x53D1;&#x5B83;&#x4EEC;&#x7684; <code>get</code> &#x8BBF;&#x95EE;&#x5668;&#x51FD;&#x6570;&#x4ECE;&#x800C;&#x5C06;&#x8BE5;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684; <code>watcher</code> &#x6DFB;&#x52A0;&#x5230;&#x6C42;&#x503C;&#x51FD;&#x6570;&#x4E2D;&#x5C5E;&#x6027;&#x7684; <code>watcher</code> &#x7684;&#x6D88;&#x606F;&#x8BA2;&#x9605;&#x5668; <code>dep</code> &#x4E2D;&#xFF0C;&#x5F53;&#x8FD9;&#x4E9B;&#x64CD;&#x4F5C;&#x5B8C;&#x6210;&#xFF0C;&#x6700;&#x540E;&#x5173;&#x95ED; <code>Dep.target</code> &#x8D4B;&#x4E3A; <code>null</code> &#x5E76;&#x8FD4;&#x56DE;&#x6C42;&#x503C;&#x51FD;&#x6570;&#x7ED3;&#x679C;&#x3002;</li></ol></li><li>&#x5F53;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x89E6;&#x53D1; <code>set</code> &#x62E6;&#x622A;&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x8C03;&#x7528;&#x81EA;&#x8EAB;&#x6D88;&#x606F;&#x8BA2;&#x9605;&#x5668; <code>dep</code> &#x7684; <code>notify</code> &#x65B9;&#x6CD5;&#xFF0C;&#x904D;&#x5386;&#x5F53;&#x524D; <code>dep</code> &#x4E2D;&#x4FDD;&#x5B58;&#x7740;&#x6240;&#x6709;&#x8BA2;&#x9605;&#x8005; <code>wathcer</code> &#x7684; <code>subs</code> &#x6570;&#x7EC4;&#xFF0C;&#x5E76;&#x9010;&#x4E2A;&#x8C03;&#x7528; <code>watcher</code> &#x7684; <code>update</code> &#x65B9;&#x6CD5;&#xFF0C;&#x5B8C;&#x6210;&#x54CD;&#x5E94;&#x66F4;&#x65B0;&#x3002;</li></ol><hr><blockquote>&#x6587; / &#x4EA6;&#x7136;<br>&#x4E00;&#x679A;&#x5411;&#x5F80;&#x8BD7;&#x4E0E;&#x8FDC;&#x65B9;&#x7684; coder<p>&#x7F16; / &#x8367;&#x58F0;</p></blockquote><p>&#x672C;&#x6587;&#x5DF2;&#x7531;&#x4F5C;&#x8005;&#x6388;&#x6743;&#x53D1;&#x5E03;&#xFF0C;&#x7248;&#x6743;&#x5C5E;&#x4E8E;&#x521B;&#x5B87;&#x524D;&#x7AEF;&#x3002;&#x6B22;&#x8FCE;&#x6CE8;&#x660E;&#x51FA;&#x5904;&#x8F6C;&#x8F7D;&#x672C;&#x6587;&#x3002;&#x672C;&#x6587;&#x94FE;&#x63A5;&#xFF1A;<a href="https://knownsec-fed.com/2018-09-12-qian-tan-vue-zhong-computed-shi-xian-yuan-li/" rel="nofollow noreferrer" target="_blank">https://knownsec-fed.com/2018...</a></p><p>&#x60F3;&#x8981;&#x8BA2;&#x9605;&#x66F4;&#x591A;&#x6765;&#x81EA;&#x77E5;&#x9053;&#x521B;&#x5B87;&#x5F00;&#x53D1;&#x4E00;&#x7EBF;&#x7684;&#x5206;&#x4EAB;&#xFF0C;&#x8BF7;&#x641C;&#x7D22;&#x5173;&#x6CE8;&#x6211;&#x4EEC;&#x7684;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x521B;&#x5B87;&#x524D;&#x7AEF;&#xFF08;KnownsecFED&#xFF09;&#x3002;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x8BA8;&#x8BBA;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x5C3D;&#x53EF;&#x80FD;&#x56DE;&#x590D;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbgVle?w=296&amp;h=295" src="https://static.alili.tech/img/bVbgVle?w=296&amp;h=295" alt="" title="" style="cursor:pointer"></span></p><p>&#x611F;&#x8C22;&#x60A8;&#x7684;&#x9605;&#x8BFB;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
做面试的不倒翁：浅谈 Vue 中 computed 实现原理

## 原文链接
[https://segmentfault.com/a/1190000016387717](https://segmentfault.com/a/1190000016387717)

