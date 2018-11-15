---
title: Babel 插件原理的理解与深入
reprint: true
categories: reprint
abbrlink: 15644fc0
date: 2018-11-10 02:30:10
---

{{% raw %}}
<blockquote>&#x73B0;&#x5728;&#x8C08;&#x5230; babel &#x80AF;&#x5B9A;&#x5927;&#x5BB6;&#x90FD;&#x4E0D;&#x4F1A;&#x611F;&#x89C9;&#x5230;&#x964C;&#x751F;&#xFF0C;&#x867D;&#x7136;&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x4E2D;&#x5F88;&#x5C11;&#x4F1A;&#x76F4;&#x63A5;&#x63A5;&#x89E6;&#x5230;&#x5B83;&#xFF0C;&#x4F46;&#x5B83;&#x5DF2;&#x7136;&#x6210;&#x4E3A;&#x4E86;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x4E2D;&#x4E0D;&#x53EF;&#x6216;&#x7F3A;&#x7684;&#x5DE5;&#x5177;&#xFF0C;&#x4E0D;&#x4EC5;&#x53EF;&#x4EE5;&#x8BA9;&#x5F00;&#x53D1;&#x8005;&#x53EF;&#x4EE5;&#x7ACB;&#x5373;&#x4F7F;&#x7528; ES &#x89C4;&#x8303;&#x4E2D;&#x7684;&#x6700;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x4E5F;&#x5927;&#x5927;&#x7684;&#x63D0;&#x9AD8;&#x4E86;&#x524D;&#x7AEF;&#x65B0;&#x6280;&#x672F;&#x7684;&#x666E;&#x53CA;&#xFF08;&#x5B66;&#x4E0D;&#x52A8;&#x4E86;...&#xFF09;&#x3002;&#x4F46;&#x662F;&#x5BF9;&#x4E8E;&#x5176;&#x8F6C;&#x6362;&#x4EE3;&#x7801;&#x7684;&#x5185;&#x90E8;&#x539F;&#x7406;&#x6211;&#x4EEC;&#x5927;&#x591A;&#x6570;&#x4EBA;&#x5374;&#x77E5;&#x4E4B;&#x751A;&#x5C11;&#xFF0C;&#x6240;&#x4EE5;&#x5E26;&#x7740;&#x597D;&#x5947;&#x4E0E;&#x7591;&#x95EE;&#xFF0C;&#x7B14;&#x8005;&#x5C1D;&#x8BD5;&#x5BF9;&#x5176;&#x539F;&#x7406;&#x8FDB;&#x884C;&#x63A2;&#x7D22;&#x3002;</blockquote><p>Babel &#x662F;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x7684;&#x591A;&#x529F;&#x80FD; JavaScript &#x7F16;&#x8BD1;&#x5668;&#xFF0C;&#x4F46;&#x4E0E;&#x4E00;&#x822C;&#x7F16;&#x8BD1;&#x5668;&#x4E0D;&#x540C;&#x7684;&#x662F;&#x5B83;&#x53EA;&#x662F;&#x628A;&#x540C;&#x79CD;&#x8BED;&#x8A00;&#x7684;&#x9AD8;&#x7248;&#x672C;&#x89C4;&#x5219;&#x8F6C;&#x6362;&#x4E3A;&#x4F4E;&#x7248;&#x672C;&#x89C4;&#x5219;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x8F93;&#x51FA;&#x53E6;&#x4E00;&#x79CD;&#x4F4E;&#x7EA7;&#x673A;&#x5668;&#x53EF;&#x8BC6;&#x522B;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x4F9D;&#x8D56;&#x4E0D;&#x540C;&#x7684;&#x62D3;&#x5C55;&#x63D2;&#x4EF6;&#x4E0B;&#x53EF;&#x7528;&#x4E8E;&#x4E0D;&#x540C;&#x5F62;&#x5F0F;&#x7684;&#x9759;&#x6001;&#x5206;&#x6790;&#x3002;&#xFF08;&#x9759;&#x6001;&#x5206;&#x6790;&#xFF1A;&#x6307;&#x5728;&#x4E0D;&#x9700;&#x8981;&#x6267;&#x884C;&#x4EE3;&#x7801;&#x7684;&#x524D;&#x63D0;&#x4E0B;&#x5BF9;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x5206;&#x6790;&#x4EE5;&#x53CA;&#x76F8;&#x5E94;&#x5904;&#x7406;&#x7684;&#x4E00;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF0C;&#x4E3B;&#x8981;&#x5E94;&#x7528;&#x4E8E;&#x8BED;&#x6CD5;&#x68C0;&#x67E5;&#x3001;&#x7F16;&#x8BD1;&#x3001;&#x4EE3;&#x7801;&#x9AD8;&#x4EAE;&#x3001;&#x4EE3;&#x7801;&#x8F6C;&#x6362;&#x3001;&#x4F18;&#x5316;&#x3001;&#x538B;&#x7F29;&#x7B49;&#x7B49;&#xFF09;</p><h2 id="articleHeader0">babel &#x505A;&#x4E86;&#x4EC0;&#x4E48;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000016359113?w=1958&amp;h=812" src="https://static.alili.tech/img/remote/1460000016359113?w=1958&amp;h=812" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x548C;&#x7F16;&#x8BD1;&#x5668;&#x7C7B;&#x4F3C;&#xFF0C;babel &#x7684;&#x8F6C;&#x8BD1;&#x8FC7;&#x7A0B;&#x4E5F;&#x5206;&#x4E3A;&#x4E09;&#x4E2A;&#x9636;&#x6BB5;&#xFF0C;&#x8FD9;&#x4E09;&#x6B65;&#x5177;&#x4F53;&#x662F;&#xFF1A;</p><ul><li><strong>&#x89E3;&#x6790;</strong> Parse</li></ul><p>&#x5C06;&#x4EE3;&#x7801;&#x89E3;&#x6790;&#x751F;&#x6210;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;( &#x5373;AST )&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BA1;&#x7B97;&#x673A;&#x7406;&#x89E3;&#x6211;&#x4EEC;&#x4EE3;&#x7801;&#x7684;&#x65B9;&#x5F0F;(&#x6269;&#x5C55;&#xFF1A;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x6BCF;&#x4E2A; js &#x5F15;&#x64CE;&#x90FD;&#x6709;&#x81EA;&#x5DF1;&#x7684; <code>AST</code>&#xFF0C;&#x6BD4;&#x5982;&#x719F;&#x77E5;&#x7684; <code>v8</code>&#xFF0C;chrome &#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x628A; js &#x6E90;&#x7801;&#x8F6C;&#x6362;&#x4E3A;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#xFF0C;&#x518D;&#x8FDB;&#x4E00;&#x6B65;&#x8F6C;&#x6362;&#x4E3A;&#x5B57;&#x8282;&#x7801;&#x6216;&#x673A;&#x5668;&#x4EE3;&#x7801;)&#xFF0C;&#x800C; <code>babel</code> &#x5219;&#x662F;&#x901A;&#x8FC7; <code>babylon</code> &#x5B9E;&#x73B0;&#x7684; &#x3002;&#x7B80;&#x5355;&#x6765;&#x8BF4;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x4E8E; JS &#x4EE3;&#x7801;&#x7684;&#x4E00;&#x4E2A;&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;&#xFF0C;&#x8FDB;&#x884C;&#x4E86;&#x8BCD;&#x6CD5;&#x5206;&#x6790;&#x4E0E;&#x8BED;&#x6CD5;&#x5206;&#x6790;&#x7684;&#x8FC7;&#x7A0B;&#x3002;</p><ul><li><strong>&#x8F6C;&#x6362;</strong> Transform</li></ul><p>&#x5BF9;&#x4E8E; AST &#x8FDB;&#x884C;&#x53D8;&#x6362;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;babel &#x63A5;&#x53D7;&#x5F97;&#x5230; AST &#x5E76;&#x901A;&#x8FC7; <code>babel-traverse</code> &#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x904D;&#x5386;&#xFF0C;&#x5728;&#x6B64;&#x8FC7;&#x7A0B;&#x4E2D;&#x8FDB;&#x884C;&#x6DFB;&#x52A0;&#x3001;&#x66F4;&#x65B0;&#x53CA;&#x79FB;&#x9664;&#x7B49;&#x64CD;&#x4F5C;&#x3002;</p><ul><li><strong>&#x751F;&#x6210;</strong> Generate</li></ul><p>&#x5C06;&#x53D8;&#x6362;&#x540E;&#x7684; AST &#x518D;&#x8F6C;&#x6362;&#x4E3A; JS &#x4EE3;&#x7801;, &#x4F7F;&#x7528;&#x5230;&#x7684;&#x6A21;&#x5757;&#x662F; <code>babel-generator</code>&#x3002;</p><p>&#x800C; <code>babel-core</code> &#x6A21;&#x5757;&#x5219;&#x662F;&#x5C06;&#x4E09;&#x8005;&#x7ED3;&#x5408;&#x4F7F;&#x5F97;&#x5BF9;&#x5916;&#x63D0;&#x4F9B;&#x7684;API&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5316;&#x3002;</p><p>&#x6B64;&#x5916;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;babel &#x53EA;&#x662F;&#x8F6C;&#x8BD1;&#x65B0;&#x6807;&#x51C6;&#x5F15;&#x5165;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x6BD4;&#x5982;ES6&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF1A;&#x800C;&#x65B0;&#x6807;&#x51C6;&#x5F15;&#x5165;&#x7684;&#x65B0;&#x7684;&#x539F;&#x751F;&#x5BF9;&#x8C61;&#xFF0C;&#x90E8;&#x5206;&#x539F;&#x751F;&#x5BF9;&#x8C61;&#x65B0;&#x589E;&#x7684;&#x539F;&#x578B;&#x65B9;&#x6CD5;&#xFF0C;&#x65B0;&#x589E;&#x7684; API &#x7B49;&#xFF08;Proxy&#x3001;Set &#x7B49;&#xFF09;, &#x8FD9;&#x4E9B;&#x4E8B;&#x4E0D;&#x4F1A;&#x8F6C;&#x8BD1;&#x7684;&#xFF0C;&#x9700;&#x8981;&#x5F15;&#x5165;&#x5BF9;&#x5E94;&#x7684; polyfill &#x6765;&#x89E3;&#x51B3;&#x3002;</p><p>&#x800C;&#x6211;&#x4EEC;&#x7F16;&#x5199;&#x7684; babel &#x63D2;&#x4EF6;&#x5219;&#x4E3B;&#x8981;&#x4E13;&#x6CE8;&#x4E8E;&#x7B2C;&#x4E8C;&#x6B65;&#x8F6C;&#x6362;&#x8FC7;&#x7A0B;&#x7684;&#x5DE5;&#x4F5C;&#xFF0C;&#x4E13;&#x6CE8;&#x4E8E;&#x5BF9;&#x4E8E;&#x4EE3;&#x7801;&#x7684;&#x8F6C;&#x5316;&#x89C4;&#x5219;&#x7684;&#x62D3;&#x5C55;&#xFF0C;&#x89E3;&#x6790;&#x4E0E;&#x751F;&#x6210;&#x7684;&#x504F;&#x5E95;&#x5C42;&#x76F8;&#x5173;&#x64CD;&#x4F5C;&#x5219;&#x6709;&#x5BF9;&#x5E94;&#x7684;&#x6A21;&#x5757;&#x652F;&#x6301;&#xFF0C;&#x5728;&#x6B64;&#x6211;&#x4EEC;&#x7406;&#x89E3;&#x5B83;&#x4E3B;&#x8981;&#x505A;&#x4E86;&#x4EC0;&#x4E48;&#x5373;&#x53EF;&#x3002;</p><p>&#x6BD4;&#x5982;&#x8FD9;&#x6837;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;hello&quot;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;hello&quot;</span>)</code></pre><p>&#x5219;&#x4F1A;&#x5F97;&#x5230;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x6811;&#x5F62;&#x7ED3;&#x6784;(&#x5DF2;&#x7B80;&#x5316;)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{
    &quot;type&quot;: &quot;Program&quot;, // &#x7A0B;&#x5E8F;&#x6839;&#x8282;&#x70B9;
    &quot;body&quot;: [
        {
            &quot;type&quot;: &quot;ExpressionStatement&quot;, // &#x4E00;&#x4E2A;&#x8BED;&#x53E5;&#x8282;&#x70B9;
            &quot;expression&quot;: {
                &quot;type&quot;: &quot;CallExpression&quot;, // &#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x8868;&#x8FBE;&#x5F0F;&#x8282;&#x70B9;
                &quot;callee&quot;: {
                    &quot;type&quot;: &quot;MemberExpression&quot;, // &#x8868;&#x8FBE;&#x5F0F;
                    &quot;object&quot;: {
                        &quot;type&quot;: &quot;Identifier&quot;,
                        &quot;name&quot;: &quot;console&quot;
                    },
                    &quot;property&quot;: {
                        &quot;type&quot;: &quot;Identifier&quot;,
                        &quot;name&quot;: &quot;log&quot;
                    },
                    &quot;computed&quot;: false
                },
                &quot;arguments&quot;: [
                    {
                        &quot;type&quot;: &quot;StringLiteral&quot;,
                        &quot;extra&quot;: {
                            &quot;rawValue&quot;: &quot;hello&quot;,
                            &quot;raw&quot;: &quot;\&quot;hello\&quot;&quot;
                        },
                        &quot;value&quot;: &quot;hello&quot;
                    }
                ]
            }
        }
    ],
    &quot;directives&quot;: []
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">
{
    <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;Program&quot;</span>, // &#x7A0B;&#x5E8F;&#x6839;&#x8282;&#x70B9;
    <span class="hljs-attr">&quot;body&quot;</span>: [
        {
            <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;ExpressionStatement&quot;</span>, // &#x4E00;&#x4E2A;&#x8BED;&#x53E5;&#x8282;&#x70B9;
            <span class="hljs-attr">&quot;expression&quot;</span>: {
                <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;CallExpression&quot;</span>, // &#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x8868;&#x8FBE;&#x5F0F;&#x8282;&#x70B9;
                <span class="hljs-attr">&quot;callee&quot;</span>: {
                    <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;MemberExpression&quot;</span>, // &#x8868;&#x8FBE;&#x5F0F;
                    <span class="hljs-attr">&quot;object&quot;</span>: {
                        <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,
                        <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;console&quot;</span>
                    },
                    <span class="hljs-attr">&quot;property&quot;</span>: {
                        <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,
                        <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;log&quot;</span>
                    },
                    <span class="hljs-attr">&quot;computed&quot;</span>: <span class="hljs-literal">false</span>
                },
                <span class="hljs-attr">&quot;arguments&quot;</span>: [
                    {
                        <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;StringLiteral&quot;</span>,
                        <span class="hljs-attr">&quot;extra&quot;</span>: {
                            <span class="hljs-attr">&quot;rawValue&quot;</span>: <span class="hljs-string">&quot;hello&quot;</span>,
                            <span class="hljs-attr">&quot;raw&quot;</span>: <span class="hljs-string">&quot;\&quot;hello\&quot;&quot;</span>
                        },
                        <span class="hljs-attr">&quot;value&quot;</span>: <span class="hljs-string">&quot;hello&quot;</span>
                    }
                ]
            }
        }
    ],
    <span class="hljs-attr">&quot;directives&quot;</span>: []
}</code></pre><p>&#x5176;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x8282;&#x70B9;&#x540D;&#x8BCD;&#xFF0C;&#x5747;&#x6765;&#x6E90;&#x4E8E; <a href="http://www.ecma-international.org/ecma-262/6.0/index.html" rel="nofollow noreferrer" target="_blank">ECMA &#x89C4;&#x8303;</a> &#x3002;</p><h2 id="articleHeader1">&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#x662F;&#x600E;&#x4E48;&#x751F;&#x6210;&#x7684;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000016359114?w=678&amp;h=362" src="https://static.alili.tech/img/remote/1460000016359114?w=678&amp;h=362" alt="" title="" style="cursor:pointer"></span></p><p>&#x8C08;&#x5230;&#x8FD9;&#x70B9;&#xFF0C;&#x5C31;&#x8981;&#x8BF4;&#x5230;&#x8BA1;&#x7B97;&#x673A;&#x662F;&#x600E;&#x4E48;&#x8BFB;&#x61C2;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x7684;&#x3002;&#x89E3;&#x6790;&#x8FC7;&#x7A0B;&#x5206;&#x4E3A;&#x4E24;&#x4E2A;&#x6B65;&#x9AA4;&#xFF1A;</p><p>1.&#x5206;&#x8BCD;&#xFF1A; &#x5C06;&#x6574;&#x4E2A;&#x4EE3;&#x7801;&#x5B57;&#x7B26;&#x4E32;&#x5206;&#x5272;&#x6210;&#x8BED;&#x6CD5;&#x5355;&#x5143;&#x6570;&#x7EC4;&#xFF08;token&#xFF09;</p><p>JS &#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x8BED;&#x6CD5;&#x5355;&#x5143;&#x4E3B;&#x8981;&#x6307;&#x5982;&#x6807;&#x8BC6;&#x7B26;&#xFF08;if/else&#x3001;return&#x3001;function&#xFF09;&#x3001;&#x8FD0;&#x7B97;&#x7B26;&#x3001;&#x62EC;&#x53F7;&#x3001;&#x6570;&#x5B57;&#x3001;&#x5B57;&#x7B26;&#x4E32;&#x3001;&#x7A7A;&#x683C;&#x7B49;&#x7B49;&#x80FD;&#x88AB;&#x89E3;&#x6790;&#x7684;&#x6700;&#x5C0F;&#x5355;&#x5143;&#x3002;&#x6BD4;&#x5982;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x751F;&#x6210;&#x7684;&#x8BED;&#x6CD5;&#x5355;&#x5143;&#x6570;&#x7EC4;&#x5982;&#x4E0B;&#xFF1A;<br><a href="http://esprima.org/demo/parse.html#" rel="nofollow noreferrer" target="_blank">&#x5728;&#x7EBF;&#x5206;&#x8BCD;&#x5DE5;&#x5177;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function demo (a) {
    console.log(a || &apos;a&apos;);
}
=&gt; 

[
    { &quot;type&quot;: &quot;Keyword&quot;,&quot;value&quot;: &quot;function&quot; },
    { &quot;type&quot;: &quot;Identifier&quot;,&quot;value&quot;: &quot;demo&quot; },
    { &quot;type&quot;: &quot;Punctuator&quot;,&quot;value&quot;: &quot;(&quot; },
    { &quot;type&quot;: &quot;Identifier&quot;,&quot;value&quot;: &quot;a&quot; },
    { &quot;type&quot;: &quot;Punctuator&quot;,&quot;value&quot;: &quot;)&quot; },
    { &quot;type&quot;: &quot;Punctuator&quot;,&quot;value&quot;: &quot;{ &quot; },
    { &quot;type&quot;: &quot;Identifier&quot;,&quot;value&quot;: &quot;console&quot; },
    { &quot;type&quot;: &quot;Punctuator&quot;,&quot;value&quot;: &quot;.&quot; },
    { &quot;type&quot;: &quot;Identifier&quot;,&quot;value&quot;: &quot;log&quot; },
    { &quot;type&quot;: &quot;Punctuator&quot;,&quot;value&quot;: &quot;(&quot; },
    { &quot;type&quot;: &quot;Identifier&quot;,&quot;value&quot;: &quot;a&quot; },
    { &quot;type&quot;: &quot;Punctuator&quot;,&quot;value&quot;: &quot;||&quot; },
    { &quot;type&quot;: &quot;String&quot;,&quot;value&quot;: &quot;&apos;a&apos;&quot; },
    { &quot;type&quot;: &quot;Punctuator&quot;,&quot;value&quot;: &quot;)&quot; },
    { &quot;type&quot;: &quot;Punctuator&quot;,&quot;value&quot;: &quot;}&quot; }
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">demo</span> (<span class="hljs-params">a</span>) </span>{
    <span class="hljs-built_in">console</span>.log(a || <span class="hljs-string">&apos;a&apos;</span>);
}
=&gt; 

[
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Keyword&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;function&quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;demo&quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Punctuator&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;(&quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;a&quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Punctuator&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;)&quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Punctuator&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;{ &quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;console&quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Punctuator&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;.&quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;log&quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Punctuator&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;(&quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;a&quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Punctuator&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;||&quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;String&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;&apos;a&apos;&quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Punctuator&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;)&quot;</span> },
    { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Punctuator&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;}&quot;</span> }
]</code></pre><p>2.&#x8BED;&#x4E49;&#x5206;&#x6790;&#xFF1A; &#x5728;&#x5206;&#x8BCD;&#x7ED3;&#x679C;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x5206;&#x6790;&#x8BED;&#x6CD5;&#x5355;&#x5143;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#x3002;</p><p>&#x8BED;&#x4E49;&#x5206;&#x6790;&#x5219;&#x662F;&#x5C06;&#x5F97;&#x5230;&#x7684;&#x8BCD;&#x6C47;&#x8FDB;&#x884C;&#x4E00;&#x4E2A;&#x7ACB;&#x4F53;&#x7684;&#x7EC4;&#x5408;&#xFF0C;&#x786E;&#x5B9A;&#x8BCD;&#x8BED;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#x3002;&#x8003;&#x8651;&#x5230;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#x7684;&#x5404;&#x79CD;&#x4ECE;&#x5C5E;&#x5173;&#x7CFB;&#x7684;&#x590D;&#x6742;&#x6027;&#xFF0C;&#x8BED;&#x4E49;&#x5206;&#x6790;&#x7684;&#x8FC7;&#x7A0B;&#x53C8;&#x662F;&#x5728;&#x904D;&#x5386;&#x5F97;&#x5230;&#x7684;&#x8BED;&#x6CD5;&#x5355;&#x5143;&#x7EC4;&#xFF0C;&#x76F8;&#x5BF9;&#x800C;&#x8A00;&#x5C31;&#x4F1A;&#x53D8;&#x5F97;&#x66F4;&#x590D;&#x6742;&#x3002;</p><p>&#x5148;&#x7406;&#x89E3;&#x4E24;&#x4E2A;&#x91CD;&#x8981;&#x6982;&#x5FF5;&#xFF0C;&#x5373;&#x8BED;&#x53E5;&#x548C;&#x8868;&#x8FBE;&#x5F0F;&#x3002;</p><ul><li><strong>&#x8BED;&#x53E5;</strong>(<code>statement</code>)&#xFF0C;&#x5373;&#x6307;&#x4E00;&#x4E2A;&#x5177;&#x5907;&#x8FB9;&#x754C;&#x7684;&#x4EE3;&#x7801;&#x533A;&#x57DF;&#xFF0C;&#x76F8;&#x90BB;&#x7684;&#x4E24;&#x4E2A;&#x8BED;&#x53E5;&#x4E4B;&#x95F4;&#x4ECE;&#x8BED;&#x6CD5;&#x4E0A;&#x6765;&#x8BB2;&#x4E92;&#x8865;&#x5F71;&#x54CD;&#xFF0C;&#x5373;&#x8C03;&#x6362;&#x987A;&#x5E8F;&#x4E5F;&#x4E0D;&#x4F1A;&#x4EA7;&#x751F;&#x8BED;&#x6CD5;&#x9519;&#x8BEF;&#x3002;</li><li><strong>&#x8868;&#x8FBE;&#x5F0F;</strong>(<code>expression</code>)&#xFF0C;&#x5219;&#x6307;&#x6700;&#x7EC8;&#x6709;&#x4E2A;&#x7ED3;&#x679C;&#x7684;&#x4E00;&#x5C0F;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x4ED6;&#x53EF;&#x4EE5;&#x5D4C;&#x5165;&#x5230;&#x53E6;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x4E14;&#x5305;&#x542B;&#x5728;&#x8BED;&#x53E5;&#x4E2D;&#x3002;</li></ul><p>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#x8BED;&#x4E49;&#x5206;&#x6790;&#x65E2;&#x662F;&#x5BF9;&#x8BED;&#x53E5;&#x548C;&#x8868;&#x8FBE;&#x5F0F;&#x8BC6;&#x522B;&#xFF0C;&#x8FD9;&#x662F;&#x4E2A;&#x9012;&#x5F52;&#x8FC7;&#x7A0B;&#xFF0C;&#x5728;&#x89E3;&#x6790;&#x4E2D;&#xFF0C;babel &#x4F1A;&#x5728;&#x89E3;&#x6790;&#x6BCF;&#x4E2A;&#x8BED;&#x53E5;&#x548C;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x6682;&#x5B58;&#x5668;&#xFF0C;&#x7528;&#x6765;&#x6682;&#x5B58;&#x5F53;&#x524D;&#x8BFB;&#x53D6;&#x5230;&#x7684;&#x8BED;&#x6CD5;&#x5355;&#x5143;&#xFF0C;&#x5982;&#x679C;&#x89E3;&#x6790;&#x5931;&#x8D25;&#xFF0C;&#x5C31;&#x4F1A;&#x8FD4;&#x56DE;&#x4E4B;&#x524D;&#x7684;&#x6682;&#x5B58;&#x70B9;&#xFF0C;&#x518D;&#x6309;&#x7167;&#x53E6;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x89E3;&#x6790;&#xFF0C;&#x5982;&#x679C;&#x89E3;&#x6790;&#x6210;&#x529F;&#xFF0C;&#x5219;&#x5C06;&#x6682;&#x5B58;&#x70B9;&#x9500;&#x6BC1;&#xFF0C;&#x4E0D;&#x65AD;&#x91CD;&#x590D;&#x4EE5;&#x4E0A;&#x64CD;&#x4F5C;&#xFF0C;&#x76F4;&#x5230;&#x6700;&#x540E;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;&#x8BED;&#x6CD5;&#x6811;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{&quot;type&quot;: &quot;Program&quot;,
&quot;body&quot;: [{
    &quot;type&quot;: &quot;FunctionDeclaration&quot;,
    &quot;id&quot;: { &quot;type&quot;: &quot;Identifier&quot;, &quot;name&quot;: &quot;demo&quot; },
    &quot;params&quot;: [{ &quot;type&quot;: &quot;Identifier&quot;, &quot;name&quot;: &quot;a&quot; }],
    &quot;body&quot;: {
        &quot;type&quot;: &quot;BlockStatement&quot;,
        &quot;body&quot;: [{
            &quot;type&quot;: &quot;ExpressionStatement&quot;,
            &quot;expression&quot;: {
                &quot;type&quot;: &quot;CallExpression&quot;,
                &quot;callee&quot;: {
                    &quot;type&quot;: &quot;MemberExpression&quot;,
                    &quot;computed&quot;: false,
                    &quot;object&quot;: { &quot;type&quot;: &quot;Identifier&quot;, &quot;name&quot;: &quot;console&quot; },
                    &quot;property&quot;: { &quot;type&quot;: &quot;Identifier&quot;, &quot;name&quot;: &quot;log&quot; }
                },
                &quot;arguments&quot;: [{   
                    &quot;type&quot;: &quot;LogicalExpression&quot;,
                    &quot;operator&quot;: &quot;||&quot;,
                    &quot;left&quot;: { &quot;type&quot;: &quot;Identifier&quot;, &quot;name&quot;: &quot;a&quot; },
                    &quot;right&quot;: { &quot;type&quot;: &quot;Literal&quot;, &quot;value&quot;: &quot;a&quot;, &quot;raw&quot;: &quot;&apos;a&apos;&quot; }
                }]
            }
        }]
    },
}]}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JS">{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Program&quot;</span>,
<span class="hljs-string">&quot;body&quot;</span>: [{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;FunctionDeclaration&quot;</span>,
    <span class="hljs-string">&quot;id&quot;</span>: { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;demo&quot;</span> },
    <span class="hljs-string">&quot;params&quot;</span>: [{ <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;a&quot;</span> }],
    <span class="hljs-string">&quot;body&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;BlockStatement&quot;</span>,
        <span class="hljs-string">&quot;body&quot;</span>: [{
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;ExpressionStatement&quot;</span>,
            <span class="hljs-string">&quot;expression&quot;</span>: {
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;CallExpression&quot;</span>,
                <span class="hljs-string">&quot;callee&quot;</span>: {
                    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;MemberExpression&quot;</span>,
                    <span class="hljs-string">&quot;computed&quot;</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-string">&quot;object&quot;</span>: { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;console&quot;</span> },
                    <span class="hljs-string">&quot;property&quot;</span>: { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;log&quot;</span> }
                },
                <span class="hljs-string">&quot;arguments&quot;</span>: [{   
                    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;LogicalExpression&quot;</span>,
                    <span class="hljs-string">&quot;operator&quot;</span>: <span class="hljs-string">&quot;||&quot;</span>,
                    <span class="hljs-string">&quot;left&quot;</span>: { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;a&quot;</span> },
                    <span class="hljs-string">&quot;right&quot;</span>: { <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Literal&quot;</span>, <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;raw&quot;</span>: <span class="hljs-string">&quot;&apos;a&apos;&quot;</span> }
                }]
            }
        }]
    },
}]}</code></pre><p><strong>&#x63A8;&#x8350;</strong><br><a href="https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js" rel="nofollow noreferrer" target="_blank">the-super-tiny-compiler</a> &#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x53EA;&#x7528;&#x4E86;&#x767E;&#x6765;&#x884C;&#x4EE3;&#x7801;&#x7684;&#x7B80;&#x5355;&#x7F16;&#x8BD1;&#x5668;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#xFF0C;&#x91CC;&#x9762;&#x7684;&#x4F5C;&#x8005;&#x4E5F;&#x5F88;&#x7528;&#x5FC3;&#x7684;&#x7F16;&#x5199;&#x4E86;&#x8BE6;&#x5C3D;&#x7684;&#x6CE8;&#x91CA;&#xFF0C;&#x901A;&#x8FC7;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x66F4;&#x597D;&#x5730;&#x7406;&#x89E3;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x3002;</p><h2 id="articleHeader2">&#x5177;&#x4F53;&#x8FC7;&#x7A0B;&#x5206;&#x6790;</h2><p>&#x4E86;&#x89E3;&#x6E90;&#x4EE3;&#x7801;&#x7684; AST &#x7ED3;&#x6784;&#x5219;&#x662F;&#x6211;&#x4EEC;&#x8F6C;&#x6362;&#x8FC7;&#x7A0B;&#x7684;&#x5173;&#x952E;&#x70B9;&#xFF0C;&#x53EF;&#x4EE5;&#x501F;&#x52A9;&#x76F4;&#x89C2;&#x7684;&#x6811;&#x5F62;&#x7ED3;&#x6784;&#x8F6C;&#x6362; <a href="http://astexplorer.net/" rel="nofollow noreferrer" target="_blank">AST Explorer</a>&#xFF0C;&#x66F4;&#x52A0;&#x76F4;&#x89C2;&#x7684;&#x7406;&#x89E3; AST &#x7ED3;&#x6784;&#x3002;</p><p><strong>Visitors</strong><br>&#x5BF9;&#x4E8E;&#x8FD9;&#x4E2A;&#x904D;&#x5386;&#x8FC7;&#x7A0B;&#xFF0C;babel &#x901A;&#x8FC7;&#x5B9E;&#x4F8B;&#x5316; visitor &#x5BF9;&#x8C61;&#x5B8C;&#x6210;&#xFF0C;&#x65E2;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x751F;&#x6210;&#x51FA;&#x6765;&#x7684; AST &#x7ED3;&#x6784;&#x90FD;&#x62E5;&#x6709;&#x4E00;&#x4E2A; accept &#x65B9;&#x6CD5;&#x7528;&#x6765;&#x63A5;&#x6536; visitor &#x8BBF;&#x95EE;&#x8005;&#x5BF9;&#x8C61;&#x7684;&#x8BBF;&#x95EE;&#xFF0C;&#x800C;&#x8BBF;&#x95EE;&#x8005;&#x5176;&#x4E2D;&#x4E5F;&#x5B9A;&#x4E49;&#x4E86; visit &#x65B9;&#x6CD5;(&#x5373;&#x5F00;&#x53D1;&#x8005;&#x5B9A;&#x4E49;&#x7684;&#x51FD;&#x6570;&#x65B9;&#x6CD5;)&#x4F7F;&#x5176;&#x80FD;&#x591F;&#x5BF9;&#x6811;&#x72B6;&#x7ED3;&#x6784;&#x4E0D;&#x540C;&#x8282;&#x70B9;&#x505A;&#x51FA;&#x4E0D;&#x540C;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x501F;&#x6B64;&#x505A;&#x5230;&#x5728;&#x5BF9;&#x8C61;&#x7ED3;&#x6784;&#x7684;&#x4E00;&#x6B21;&#x8BBF;&#x95EE;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x80FD;&#x591F;&#x904D;&#x5386;&#x6574;&#x4E2A;&#x5BF9;&#x8C61;&#x7ED3;&#x6784;&#x3002;&#xFF08;&#x8BBF;&#x95EE;&#x8005;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#xFF1A;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x4F5C;&#x7528;&#x4E8E;&#x67D0;&#x5BF9;&#x8C61;&#x7ED3;&#x6784;&#x4E2D;&#x7684;&#x5404;&#x5143;&#x7D20;&#x7684;&#x64CD;&#x4F5C;&#x8868;&#x793A;&#xFF0C;&#x5B83;&#x4F7F;&#x5F97;&#x53EF;&#x4EE5;&#x5728;&#x4E0D;&#x6539;&#x53D8;&#x5404;&#x5143;&#x7D20;&#x7684;&#x7C7B;&#x7684;&#x524D;&#x63D0;&#x4E0B;&#x5B9A;&#x4E49;&#x4F5C;&#x7528;&#x4E8E;&#x8FD9;&#x4E9B;&#x5143;&#x7D20;&#x7684;&#x65B0;&#x64CD;&#x4F5C;&#xFF09;</p><p>&#x904D;&#x5386;&#x7ED3;&#x70B9;&#x8BA9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5B9A;&#x4F4D;&#x5E76;&#x627E;&#x5230;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x64CD;&#x4F5C;&#x7684;&#x7ED3;&#x70B9;&#xFF0C;&#x5728;&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x65F6;&#xFF0C;&#x5B58;&#x5728;enter&#x548C;exit&#x4E24;&#x4E2A;&#x65F6;&#x6001;&#x5468;&#x671F;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x8FDB;&#x5165;&#x7ED3;&#x70B9;&#x65F6;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x8282;&#x70B9;&#x7684;&#x5B50;&#x8282;&#x70B9;&#x8FD8;&#x6CA1;&#x89E6;&#x8FBE;&#xFF0C;&#x904D;&#x5386;&#x5B50;&#x8282;&#x70B9;&#x5B8C;&#x6210;&#x7684;&#x540E;&#xFF0C;&#x4F1A;&#x79BB;&#x5F00;&#x8BE5;&#x8282;&#x70B9;&#x5E76;&#x89E6;&#x53D1;exit&#x65B9;&#x6CD5;&#x3002;</p><p><strong>Paths</strong><br>Visitors &#x5728;&#x904D;&#x5386;&#x5230;&#x6BCF;&#x4E2A;&#x8282;&#x70B9;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x90FD;&#x4F1A;&#x7ED9;&#x6211;&#x4EEC;&#x4F20;&#x5165; path &#x53C2;&#x6570;&#xFF0C;&#x5305;&#x542B;&#x4E86;&#x8282;&#x70B9;&#x7684;&#x4FE1;&#x606F;&#x4EE5;&#x53CA;&#x8282;&#x70B9;&#x548C;&#x6240;&#x5728;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4F9B;&#x6211;&#x4EEC;&#x5BF9;&#x7279;&#x5B9A;&#x8282;&#x70B9;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#xFF0C;&#x4E4B;&#x6240;&#x4EE5;&#x79F0;&#x4E4B;&#x4E3A; path &#x662F;&#x5176;&#x8868;&#x793A;&#x7684;&#x662F;&#x4E24;&#x4E2A;&#x8282;&#x70B9;&#x4E4B;&#x95F4;&#x8FDE;&#x63A5;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x975E;&#x6307;&#x5F53;&#x524D;&#x7684;&#x8282;&#x70B9;&#x5BF9;&#x8C61;&#x3002;path&#x5C5E;&#x6027;&#x6709;&#x51E0;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x7EC4;&#x6210;&#xFF0C;&#x4E3B;&#x8981;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016359115?w=899&amp;h=884" src="https://static.alili.tech/img/remote/1460000016359115?w=899&amp;h=884" alt="" title="" style="cursor:pointer"></span></p><p>&#x4F8B;&#x5982;&#xFF0C;&#x5982;&#x679C;&#x8BBF;&#x95EE;&#x5230;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x8282;&#x70B9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    type: &quot;FunctionDeclaration&quot;,
    id: {
        type: &quot;Identifier&quot;,
        name: &quot;square&quot;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FunctionDeclaration&quot;</span>,
    <span class="hljs-attr">id</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;square&quot;</span>
    }
}</code></pre><p>&#x800C;&#x4ED6;&#x7684; path &#x5173;&#x8054;&#x8DEF;&#x5F84;&#x5F97;&#x5230;&#x7684;&#x5BF9;&#x8C61;&#x5219;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;parent&quot;: {
        &quot;type&quot;: &quot;FunctionDeclaration&quot;,
        &quot;id&quot;: {...},...
    }, {
        &quot;node&quot;: {
            &quot;type&quot;: &quot;Identifier&quot;,
            &quot;name&quot;: &quot;square&quot;
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">&quot;parent&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;FunctionDeclaration&quot;</span>,
        <span class="hljs-string">&quot;id&quot;</span>: {...},...
    }, {
        <span class="hljs-string">&quot;node&quot;</span>: {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;square&quot;</span>
        }
    }
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230; path &#x5176;&#x5B9E;&#x662F;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x5728;&#x6811;&#x4E2D;&#x7684;&#x4F4D;&#x7F6E;&#x4EE5;&#x53CA;&#x5173;&#x4E8E;&#x8BE5;&#x8282;&#x70B9;&#x5404;&#x79CD;&#x4FE1;&#x606F;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x8868;&#x793A;&#xFF0C;&#x5373;&#x6211;&#x4EEC;&#x8BBF;&#x95EE;&#x8FC7;&#x7A0B;&#x4E2D;&#x64CD;&#x4F5C;&#x7684;&#x5E76;&#x4E0D;&#x662F;&#x8282;&#x70B9;&#x672C;&#x8EAB;&#x800C;&#x662F;&#x8DEF;&#x5F84;&#xFF0C;&#x4E14;&#x5176;&#x4E2D;&#x5305;&#x542B;&#x4E86;&#x6DFB;&#x52A0;&#x3001;&#x66F4;&#x65B0;&#x3001;&#x79FB;&#x52A8;&#x548C;&#x5220;&#x9664;&#x8282;&#x70B9;&#x6709;&#x5173;&#x7684;&#x5176;&#x4ED6;&#x5F88;&#x591A;&#x65B9;&#x6CD5;&#xFF0C;&#x5F53;&#x8C03;&#x7528;&#x4E00;&#x4E2A;&#x4FEE;&#x6539;&#x6811;&#x7684;&#x65B9;&#x6CD5;&#x540E;&#xFF0C;&#x8DEF;&#x5F84;&#x4FE1;&#x606F;&#x4E5F;&#x4F1A;&#x88AB;&#x66F4;&#x65B0;&#x3002;&#x4E3B;&#x8981;&#x76EE;&#x7684;&#x8FD8;&#x662F;&#x4E3A;&#x4E86;&#x7B80;&#x5316;&#x64CD;&#x4F5C;&#xFF0C;&#x5C3D;&#x53EF;&#x80FD;&#x505A;&#x5230;&#x65E0;&#x72B6;&#x6001;&#x3002;</p><p><strong>&#x5B9E;&#x9645;&#x8FD0;&#x7528;</strong><br>&#x5047;&#x5982;&#x6709;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NEJ.define([&quot;./modal&quot;], function(Modal){});

=&gt; transform &#x4E3A;
define([&quot;./modal&quot;], function(Modal){});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">NEJ.define([<span class="hljs-string">&quot;./modal&quot;</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Modal</span>)</span>{});

=&gt; transform &#x4E3A;
define([<span class="hljs-string">&quot;./modal&quot;</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Modal</span>)</span>{});</code></pre><p>&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x628A; <code>NEJ.define</code>&#x8F6C;&#x5316;&#x4E3A; <code>define</code>,&#x4E3A;&#x4E86;&#x5C06;&#x6A21;&#x5757;&#x4F9D;&#x8D56;&#x7CFB;&#x7EDF;&#x8F6C;&#x6362;&#x4E3A;&#x6807;&#x51C6;&#x7684; AMD &#x5F62;&#x5F0F;&#xFF0C;&#x5219;&#x53EF;&#x4EE5;&#x7528;&#x7F16;&#x5199; babel &#x63D2;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x505A;&#x3002;</p><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5148;&#x5206;&#x6790;&#x9700;&#x8981;&#x8BBF;&#x95EE;&#x4FEE;&#x6539;&#x7684; AST &#x7ED3;&#x6784;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    ExpressionStatement {
        expression: CallExpression {
            callee: MemberExpression {
                object: Identifier {
                    name: &quot;NEJ&quot;
                }
                property: Identifier {
                    name: &quot;define&quot;
                }
            }
            arguments: [
                ArrayExpression{},
                FunctionExpression{}
            ]
        }
    }
}

=&gt;  &#x8F6C;&#x5316;&#x4E3A;&#x4E0B;&#x9762;&#x8FD9;&#x6837;

{
    ExpressionStatement {
        expression: CallExpression {
            callee:  Identifier {
                 name: &quot;define&quot;
            }
            arguments: [
                ArrayExpression{},
                FunctionExpression{}
            ]
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
    ExpressionStatement {
        <span class="hljs-attr">expression</span>: CallExpression {
            <span class="hljs-attr">callee</span>: MemberExpression {
                <span class="hljs-attr">object</span>: Identifier {
                    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;NEJ&quot;</span>
                }
                property: Identifier {
                    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;define&quot;</span>
                }
            }
            <span class="hljs-built_in">arguments</span>: [
                ArrayExpression{},
                FunctionExpression{}
            ]
        }
    }
}

=&gt;  &#x8F6C;&#x5316;&#x4E3A;&#x4E0B;&#x9762;&#x8FD9;&#x6837;

{
    ExpressionStatement {
        <span class="hljs-attr">expression</span>: CallExpression {
            <span class="hljs-attr">callee</span>:  Identifier {
                 <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;define&quot;</span>
            }
            <span class="hljs-built_in">arguments</span>: [
                ArrayExpression{},
                FunctionExpression{}
            ]
        }
    }
}</code></pre><p>&#x5206;&#x6790;&#x7ED3;&#x6784;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;<code>arguments</code> &#x662F;&#x4EE3;&#x7801;&#x4E2D;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x90E8;&#x5206;&#xFF0C;&#x8FD9;&#x90E8;&#x5206;&#x4FDD;&#x6301;&#x4E0D;&#x53D8;&#x76F4;&#x63A5;&#x62FF;&#x5230;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x7684;&#x662F; <code>MemberExpression</code> &#x8868;&#x8FBE;&#x5F0F;&#x8282;&#x70B9;&#x4E0B;&#x7684;name &#x4E3A; &apos;NEJ&apos; &#x7684; <code>Identifier</code>&#x90E8;&#x5206;&#xFF0C;&#x7531;&#x4E8E;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x7ED3;&#x6784;&#x662F;&#x4E00;&#x4E2A;<code>CallExpression</code>&#x51FD;&#x6570;&#x8C03;&#x7528;&#x5F62;&#x5F0F;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x90A3;&#x4E48;&#x6574;&#x4F53;&#x601D;&#x8DEF;&#x73B0;&#x5728;&#x5C31;&#x662F;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>CallExpression</code>&#x66FF;&#x6362;&#x6389;&#x539F;&#x6765;&#x7684;<code>MemberExpression</code>&#x5373;&#x53EF;&#x3002;&#x8FD9;&#x91CC;&#x501F;&#x7528;&#x4E86; <code>babel-type</code>&#xFF08; &#x4E3A; babel&#x63D0;&#x4F9B;&#x591A;&#x79CD;&#x8F85;&#x52A9;&#x51FD;&#x6570;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E8E; loadsh &#x4E0E; js&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#xFF09;&#x521B;&#x5EFA;&#x8282;&#x70B9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const babel = require(&apos;babel-core&apos;);
const t = require(&apos;babel-types&apos;);
const code = &apos;NEJ.define([&quot;./modal&quot;], function(Modal){});&apos;;
let args = [];
const visitor = {
    ExpressionStatement(path) {
        if (path.node &amp;&amp; path.node.arguments) {
            args = path.node.arguments;
        }
    },
    MemberExpression(path) {
        if (path.node &amp;&amp; path.node.object &amp;&amp; path.node.object.name === &apos;NEJ&apos;) {
            path.replaceWith(t.CallExpression(
                t.identifier(&apos;define&apos;), args
            ))
        }
    }
}
const result = babel.transform(code, {
    plugins: [{
        visitor
    }]
})
console.log(result.code)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> babel = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;babel-core&apos;</span>);
<span class="hljs-keyword">const</span> t = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;babel-types&apos;</span>);
<span class="hljs-keyword">const</span> code = <span class="hljs-string">&apos;NEJ.define([&quot;./modal&quot;], function(Modal){});&apos;</span>;
<span class="hljs-keyword">let</span> args = [];
<span class="hljs-keyword">const</span> visitor = {
    ExpressionStatement(path) {
        <span class="hljs-keyword">if</span> (path.node &amp;&amp; path.node.arguments) {
            args = path.node.arguments;
        }
    },
    MemberExpression(path) {
        <span class="hljs-keyword">if</span> (path.node &amp;&amp; path.node.object &amp;&amp; path.node.object.name === <span class="hljs-string">&apos;NEJ&apos;</span>) {
            path.replaceWith(t.CallExpression(
                t.identifier(<span class="hljs-string">&apos;define&apos;</span>), args
            ))
        }
    }
}
<span class="hljs-keyword">const</span> result = babel.transform(code, {
    <span class="hljs-attr">plugins</span>: [{
        visitor
    }]
})
<span class="hljs-built_in">console</span>.log(result.code)</code></pre><p>&#x6267;&#x884C;&#x540E;&#x5373;&#x53EF;&#x770B;&#x5230;&#x7ED3;&#x679C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define()([&quot;./modal&quot;], function (Modal) {});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">define()([<span class="hljs-string">&quot;./modal&quot;</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Modal</span>) </span>{});</code></pre><p>&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x5BF9;&#x4E8E;&#x6BCF;&#x4E00;&#x6B65;&#x8BBF;&#x95EE;&#x5230;&#x7684;&#x8282;&#x70B9;&#x6211;&#x4EEC;&#x90FD;&#x8981;&#x4E25;&#x683C;&#x7684;&#x5224;&#x65AD;&#x662F;&#x5426;&#x4E0E;&#x6211;&#x4EEC;&#x9884;&#x60F3;&#x7684;&#x7C7B;&#x578B;&#x4E00;&#x81F4;&#xFF0C;&#x8FD9;&#x6837;&#x4E0D;&#x4EC5;&#x662F;&#x4E3A;&#x4E86;&#x6392;&#x9664;&#x5230;&#x5176;&#x4ED6;&#x60C5;&#x51B5;&#xFF0C;&#x66F4;&#x662F;&#x4E3A;&#x4E86;&#x9632;&#x6B62; Visitor &#x5728;&#x8BBF;&#x95EE;&#x76F8;&#x540C;&#x8282;&#x70B9;&#x65F6;&#x8BEF;&#x5165;&#x5230;&#x5176;&#x4E2D;&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x53EF;&#x80FD;&#x6CA1;&#x6709;&#x9700;&#x8981;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x975E;&#x5E38;&#x5BB9;&#x6613;&#x51FA;&#x9519;&#x6216;&#x8005;&#x8BEF;&#x4F24;&#xFF0C;&#x4E25;&#x683C;&#x7684;&#x63A7;&#x5236;&#x8282;&#x70B9;&#x7684;&#x83B7;&#x53D6;&#x6D41;&#x7A0B;&#x5C06;&#x4F1A;&#x7701;&#x53BB;&#x4E0D;&#x5C11;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x9EBB;&#x70E6;&#x3002;</p><h2 id="articleHeader3">&#x9700;&#x8981;&#x6CE8;&#x610F;&#x4EC0;&#x4E48;</h2><p><strong>State &#x72B6;&#x6001;</strong></p><p>&#x72B6;&#x6001;&#x662F;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811; AST &#x8F6C;&#x6362;&#x7684;&#x654C;&#x4EBA;&#xFF0C;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x4F1A;&#x4E0D;&#x65AD;&#x7275;&#x626F;&#x6211;&#x4EEC;&#x7684;&#x7CBE;&#x529B;&#xFF0C;&#x800C;&#x4E14;&#x51E0;&#x4E4E;&#x6240;&#x6709;&#x4F60;&#x5BF9;&#x72B6;&#x6001;&#x7684;&#x5047;&#x8BBE;&#xFF0C;&#x603B;&#x662F;&#x4F1A;&#x6709;&#x4E00;&#x4E9B;&#x672A;&#x8003;&#x8651;&#x5230;&#x7684;&#x8BED;&#x6CD5;&#x6700;&#x7EC8;&#x8BC1;&#x660E;&#x4F60;&#x7684;&#x5047;&#x8BBE;&#x662F;&#x9519;&#x8BEF;&#x7684;&#x3002;</p><p><strong>Scope &#x4F5C;&#x7528;&#x57DF;</strong></p><p>&#x5728; JavaScript &#x4E2D;&#xFF0C;&#x6BCF;&#x5F53;&#x4F60;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#xFF0C;&#x4E0D;&#x7BA1;&#x662F;&#x901A;&#x8FC7;&#x53D8;&#x91CF;&#xFF08;variable&#xFF09;&#x3001;&#x51FD;&#x6570;&#xFF08;function&#xFF09;&#x3001;&#x7C7B;&#x578B;&#xFF08;class&#xFF09;&#x3001;&#x53C2;&#x6570;&#xFF08;params&#xFF09;&#x3001;&#x6A21;&#x5757;&#x5BFC;&#x5165;&#xFF08;import&#xFF09;&#x8FD8;&#x662F;&#x6807;&#x7B7E;&#xFF08;label&#xFF09;&#x7B49;&#xFF0C;&#x5B83;&#x90FD;&#x5C5E;&#x4E8E;&#x5F53;&#x524D;&#x4F5C;&#x7528;&#x57DF;&#x3002;</p><p>&#x5F53;&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x8F6C;&#x6362;&#x65F6;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x5C0F;&#x5FC3;&#x4F5C;&#x7528;&#x57DF;&#x3002;&#x6211;&#x4EEC;&#x5F97;&#x786E;&#x4FDD;&#x5728;&#x6539;&#x53D8;&#x4EE3;&#x7801;&#x7684;&#x5404;&#x4E2A;&#x90E8;&#x5206;&#x65F6;&#x4E0D;&#x4F1A;&#x7834;&#x574F;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x5728;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5F15;&#x7528;&#x65F6;&#x9700;&#x8981;&#x786E;&#x4FDD;&#x65B0;&#x589E;&#x52A0;&#x7684;&#x5F15;&#x7528;&#x540D;&#x5B57;&#x548C;&#x5DF2;&#x6709;&#x7684;&#x6240;&#x6709;&#x5F15;&#x7528;&#x4E0D;&#x51B2;&#x7A81;&#xFF0C;&#x6216;&#x8005;&#x4EC5;&#x4EC5;&#x60F3;&#x627E;&#x51FA;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x7684;&#x6240;&#x6709;&#x5F15;&#x7528;&#xFF0C; &#x6211;&#x4EEC;&#x53EA;&#x60F3;&#x5728;&#x7ED9;&#x5B9A;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF08;Scope&#xFF09;&#x4E2D;&#x627E;&#x51FA;&#x8FD9;&#x4E9B;&#x5F15;&#x7528;&#x3002;</p><p>&#x4F5C;&#x7528;&#x57DF;&#x53EF;&#x4EE5;&#x88AB;&#x8868;&#x793A;&#x4E3A;&#x5982;&#x4E0B;&#x5F62;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  path: path,
  block: path.node,
  parentBlock: path.parent,
  parent: parentScope,
  bindings: [...]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">path</span>: path,
  <span class="hljs-attr">block</span>: path.node,
  <span class="hljs-attr">parentBlock</span>: path.parent,
  <span class="hljs-attr">parent</span>: parentScope,
  <span class="hljs-attr">bindings</span>: [...]
}</code></pre><p>&#x5373;&#x5728;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9700;&#x8981;&#x7ED9;&#x51FA;&#x5B83;&#x7684;&#x8DEF;&#x5F84;&#x548C;&#x7236;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x4E4B;&#x540E;&#x5728;&#x904D;&#x5386;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x5B83;&#x4F1A;&#x5728;&#x8BE5;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x6536;&#x96C6;&#x6240;&#x6709;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x6536;&#x96C6;&#x5B8C;&#x6BD5;&#x540E;&#x65E2;&#x53EF;&#x4EE5;&#x5728;&#x4F5C;&#x7528;&#x57DF;&#x4E0A;&#x8C03;&#x7528;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x4F8B;&#x5982;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x6211;&#x4E48;&#x9700;&#x8981;&#x5C06;&#x51FD;&#x6570;&#x4E2D;&#x7684; n &#x8F6C;&#x6362;&#x4E3A; x &#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function square(n) {
  return n * n;
}
var n = 1;

// &#x5B9A;&#x4E49;&#x7684; visitor&#xFF08;&#x9519;&#x8BEF;&#x7248;&#x274C;&#xFF09;
let paramName;

const MyVisitor = {
  FunctionDeclaration(path) {
    const param = path.node.params[0];
    paramName = param.name;
    param.name = &quot;x&quot;;
  },

  Identifier(path) {
    if (path.node.name === paramName) {
      path.node.name = &quot;x&quot;;
    }
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span>(<span class="hljs-params">n</span>) </span>{
  <span class="hljs-keyword">return</span> n * n;
}
<span class="hljs-keyword">var</span> n = <span class="hljs-number">1</span>;

<span class="hljs-comment">// &#x5B9A;&#x4E49;&#x7684; visitor&#xFF08;&#x9519;&#x8BEF;&#x7248;&#x274C;&#xFF09;</span>
<span class="hljs-keyword">let</span> paramName;

<span class="hljs-keyword">const</span> MyVisitor = {
  FunctionDeclaration(path) {
    <span class="hljs-keyword">const</span> param = path.node.params[<span class="hljs-number">0</span>];
    paramName = param.name;
    param.name = <span class="hljs-string">&quot;x&quot;</span>;
  },

  Identifier(path) {
    <span class="hljs-keyword">if</span> (path.node.name === paramName) {
      path.node.name = <span class="hljs-string">&quot;x&quot;</span>;
    }
  }
};</code></pre><p>&#x5982;&#x679C;&#x4E0D;&#x8003;&#x8651;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5219;&#x4F1A;&#x5BFC;&#x81F4;&#x51FD;&#x6570;&#x5916;&#x7684; n &#x4E5F;&#x88AB;&#x8F6C;&#x53D8;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x8F6C;&#x6362;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728; <code>FunctionDeclaration</code> &#x8282;&#x70B9;&#x4E2D;&#x8FDB;&#x884C; n &#x7684;&#x8F6C;&#x53D8;&#xFF0C;&#x628A;&#x9700;&#x8981;&#x904D;&#x5386;&#x7684;&#x8F6C;&#x6362;&#x65B9;&#x6CD5;&#x653E;&#x5728;&#x5176;&#x4E2D;&#xFF0C;&#x9632;&#x6B62;&#x5BF9;&#x5916;&#x90E8;&#x7684;&#x4EE3;&#x7801;&#x4EA7;&#x751F;&#x4F5C;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6539;&#x8FDB;&#x540E;
const updateParamNameVisitor = {
  Identifier(path) {
    if (path.node.name === this.paramName) {
      path.node.name = &quot;x&quot;;
    }
  }
};

const MyVisitor = {
  FunctionDeclaration(path) {
    const param = path.node.params[0];
    const paramName = param.name;
    param.name = &quot;x&quot;;

    path.traverse(updateParamNameVisitor, { paramName });
  }
};

path.traverse(MyVisitor);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x6539;&#x8FDB;&#x540E;</span>
<span class="hljs-keyword">const</span> updateParamNameVisitor = {
  Identifier(path) {
    <span class="hljs-keyword">if</span> (path.node.name === <span class="hljs-keyword">this</span>.paramName) {
      path.node.name = <span class="hljs-string">&quot;x&quot;</span>;
    }
  }
};

<span class="hljs-keyword">const</span> MyVisitor = {
  FunctionDeclaration(path) {
    <span class="hljs-keyword">const</span> param = path.node.params[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">const</span> paramName = param.name;
    param.name = <span class="hljs-string">&quot;x&quot;</span>;

    path.traverse(updateParamNameVisitor, { paramName });
  }
};

path.traverse(MyVisitor);</code></pre><p><strong>Bindings &#x7ED1;&#x5B9A;</strong><br>&#x6240;&#x6709;&#x5F15;&#x7528;&#x5C5E;&#x4E8E;&#x7279;&#x5B9A;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x5F15;&#x7528;&#x548C;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x8FD9;&#x79CD;&#x5173;&#x7CFB;&#x79F0;&#x4F5C;&#x4E3A;&#x7ED1;&#x5B9A;&#x3002;</p><p>&#x4F8B;&#x5982;&#x9700;&#x8981;&#x5C06; const &#x8F6C;&#x6362;&#x4E3A; var&#xFF0C;&#x5E76;&#x4E14;&#x5BF9; const &#x58F0;&#x660E;&#x7684;&#x503C;&#x7ED9;&#x4E88;&#x53EA;&#x8BFB;&#x4FDD;&#x62A4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const  a = 1;
const  b = 4;
function test (){
    let a = 2;
      a = 3;
}
a = 34;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span>  a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">const</span>  b = <span class="hljs-number">4</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> a = <span class="hljs-number">2</span>;
      a = <span class="hljs-number">3</span>;
}
a = <span class="hljs-number">34</span>;</code></pre><p>&#x800C;&#x5BF9;&#x4E8E;&#x4E0A;&#x9762;&#x7684;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#xFF0C;&#x7531;&#x4E8E; function &#x6709;&#x81EA;&#x5DF1;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x6240;&#x4EE5;&#x5728; function &#x5185; a &#x53EF;&#x4EE5;&#x88AB;&#x4FEE;&#x6539;&#xFF0C;&#x800C;&#x5728;&#x5916;&#x9762;&#x5219;&#x4E0D;&#x80FD;&#x88AB;&#x4FEE;&#x6539;&#x3002;&#x6240;&#x4EE5;&#x5728;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x4E2D;&#x5C31;&#x9700;&#x8981;&#x8003;&#x8651;&#x5230;&#x7ED1;&#x5B9A;&#x5173;&#x7CFB;&#x3002;</p><h2 id="articleHeader4">&#x4F7F;&#x7528;&#x914D;&#x7F6E;</h2><p>&#x5E38;&#x89C1;&#x505A;&#x6CD5;&#x662F;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x7684; <code>.babelrc</code> &#x6587;&#x4EF6;&#xFF0C;&#x7EDF;&#x4E00;&#x5C06; babel &#x7684;&#x8BBE;&#x7F6E;&#x90FD;&#x653E;&#x5728;&#x8FD9;&#x91CC;&#x3002;</p><p><strong>&#x5E38;&#x7528; options &#x5B57;&#x6BB5;&#x8BF4;&#x660E;</strong></p><ul><li>env&#xFF1A;env &#x7684;&#x6838;&#x5FC3;&#x76EE;&#x7684;&#x662F;&#x901A;&#x8FC7;&#x914D;&#x7F6E;&#x5F97;&#x77E5;&#x76EE;&#x6807;&#x73AF;&#x5883;&#x7684;&#x7279;&#x70B9;&#xFF0C;&#x7136;&#x540E;&#x53EA;&#x505A;&#x5FC5;&#x8981;&#x7684;&#x8F6C;&#x6362;&#x3002;&#x4F8B;&#x5982;&#x76EE;&#x6807;&#x6D4F;&#x89C8;&#x5668;&#x652F;&#x6301; es2015&#xFF0C;&#x90A3;&#x4E48; es2015 &#x8FD9;&#x4E2A; preset &#x5176;&#x5B9E;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x7684;&#xFF0C;&#x4E8E;&#x662F;&#x4EE3;&#x7801;&#x5C31;&#x53EF;&#x4EE5;&#x5C0F;&#x4E00;&#x70B9;(&#x4E00;&#x822C;&#x8F6C;&#x5316;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x603B;&#x662F;&#x66F4;&#x957F;)&#xFF0C;&#x6784;&#x5EFA;&#x65F6;&#x95F4;&#x4E5F;&#x53EF;&#x4EE5;&#x7F29;&#x77ED;&#x4E00;&#x4E9B;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x5199;&#x4EFB;&#x4F55;&#x914D;&#x7F6E;&#x9879;&#xFF0C;env &#x7B49;&#x4EF7;&#x4E8E; latest&#xFF0C;&#x4E5F;&#x7B49;&#x4EF7;&#x4E8E; es2015 + es2016 + es2017 &#x4E09;&#x4E2A;&#x76F8;&#x52A0;(&#x4E0D;&#x5305;&#x542B; stage-x &#x4E2D;&#x7684;&#x63D2;&#x4EF6;)&#x3002;</li><li>plugins&#xFF1A;&#x8981;&#x52A0;&#x8F7D;&#x548C;&#x4F7F;&#x7528;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x63D2;&#x4EF6;&#x540D;&#x524D;&#x7684;babel-plugin-&#x53EF;&#x7701;&#x7565;&#xFF1B;plugin&#x5217;&#x8868;&#x6309;&#x4ECE;&#x5934;&#x5230;&#x5C3E;&#x7684;&#x987A;&#x5E8F;&#x8FD0;&#x884C;</li><li>presets&#xFF1A;&#x8981;&#x52A0;&#x8F7D;&#x548C;&#x4F7F;&#x7528;&#x7684;preset &#xFF0C;&#x6BCF;&#x4E2A; preset &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x9884;&#x8BBE;&#x63D2;&#x4EF6;&#x5217;&#x8868;&#xFF0C;preset&#x540D;&#x524D;&#x7684;babel-preset-&#x53EF;&#x7701;&#x7565;&#xFF1B;presets&#x5217;&#x8868;&#x7684;preset&#x6309;&#x4ECE;&#x5C3E;&#x5230;&#x5934;&#x7684;&#x9006;&#x5E8F;&#x8FD0;&#x884C;&#xFF08;&#x4E3A;&#x4E86;&#x517C;&#x5BB9;&#x7528;&#x6237;&#x4F7F;&#x7528;&#x4E60;&#x60EF;&#xFF09;</li><li>&#x540C;&#x65F6;&#x8BBE;&#x7F6E;&#x4E86;presets&#x548C;plugins&#xFF0C;&#x90A3;&#x4E48;plugins&#x7684;&#x5148;&#x8FD0;&#x884C;&#xFF1B;&#x6BCF;&#x4E2A;preset&#x548C;plugin&#x90FD;&#x53EF;&#x4EE5;&#x518D;&#x914D;&#x7F6E;&#x81EA;&#x5DF1;&#x7684;option</li></ul><p>&#x5E38;&#x89C1;&#x7684;&#x914D;&#x7F6E;&#x65B9;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;plugins&quot;: [
        &quot;transform-remove-strict-mode&quot;,
        [&quot;transform-nej-module&quot;, {&quot;mode&quot;: &quot;web&quot;}]
    ],
    &quot;presets&quot;: [
        &quot;env&quot;
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">&quot;plugins&quot;</span>: [
        <span class="hljs-string">&quot;transform-remove-strict-mode&quot;</span>,
        [<span class="hljs-string">&quot;transform-nej-module&quot;</span>, {<span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;web&quot;</span>}]
    ],
    <span class="hljs-string">&quot;presets&quot;</span>: [
        <span class="hljs-string">&quot;env&quot;</span>
    ]
}</code></pre><h2 id="articleHeader5">&#x53C2;&#x8003;</h2><ul><li><a href="https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#builders" rel="nofollow noreferrer" target="_blank">Babel &#x63D2;&#x4EF6;&#x624B;&#x518C;</a></li><li><a href="https://zhuanlan.zhihu.com/p/27289600" rel="nofollow noreferrer" target="_blank">Babel&#x662F;&#x5982;&#x4F55;&#x8BFB;&#x61C2;JS&#x4EE3;&#x7801;&#x7684;</a></li></ul><p><strong>&#x63A8;&#x8350;&#x5DE5;&#x5177;</strong></p><ul><li><a href="http://astexplorer.net/" rel="nofollow noreferrer" target="_blank">AST Explorer</a> &#x5728;&#x7EBF;&#x751F;&#x6210; AST</li><li><a href="http://esprima.org/demo/parse.html#" rel="nofollow noreferrer" target="_blank">Esprima</a> &#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x5206;&#x8BCD;&#x7ED3;&#x679C;</li></ul>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Babel 插件原理的理解与深入

## 原文链接
[https://segmentfault.com/a/1190000016359110](https://segmentfault.com/a/1190000016359110)

