---
title: vue组件通信全面总结
reprint: true
categories: reprint
abbrlink: 109c9ece
date: 2018-11-05 02:30:11
---

{{% raw %}}
<h2 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;</h2><p>&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#x662F;&#x662F;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x4E2D;&#x975E;&#x5E38;&#x5E38;&#x7528;&#x7684;&#x4E00;&#x73AF;&#xFF0C;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x5BF9;&#x9879;&#x76EE;&#x6574;&#x4F53;&#x8BBE;&#x8BA1;&#x3001;&#x5F00;&#x53D1;&#x3001;&#x89C4;&#x8303;&#x90FD;&#x6709;&#x5F88;&#x5B9E;&#x9645;&#x7684;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x6211;&#x5728;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x4E2D;&#x5BF9;&#x6B64;&#x6DF1;&#x6709;&#x4F53;&#x4F1A;&#xFF0C;&#x603B;&#x7ED3;&#x4E0B;vue&#x7EC4;&#x4EF6;&#x95F4;&#x901A;&#x4FE1;&#x7684;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x8BA8;&#x8BBA;&#x4E0B;&#x5404;&#x81EA;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;</p><hr><p><strong>&#x6587;&#x7AE0;&#x5BF9;&#x76F8;&#x5173;&#x573A;&#x666F;&#x9884;&#x89C8;</strong></p><ul><li>&#x7236;-&gt;&#x5B50;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9012;</li><li>&#x5B50;-&gt;&#x7236;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9012;</li><li>&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9012;</li><li>&#x7EC4;&#x4EF6;&#x6DF1;&#x5C42;&#x5D4C;&#x5957;&#xFF0C;&#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x4E0E;&#x5B50;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9012;</li></ul><p><strong>&#x6587;&#x7AE0;&#x76F8;&#x5173;&#x6280;&#x672F;&#x9884;&#x89C8;</strong><br>prop&#x3001;emit&#x3001;bus&#x3001;vuex&#x3001;&#x8DEF;&#x7531;URL&#x3001;provide/inject&#x3001;<strong>$attrs/inheritAttrs</strong></p><p><em>&#x6CE8;&#xFF1A;&#x4EE5;&#x4E0B;&#x4ECB;&#x7ECD;&#x4E0E;&#x4EE3;&#x7801;&#x73AF;&#x5883;&#xFF1A;<strong>vue2.0+&#x3001;vue-cli2</strong></em></p><h2 id="articleHeader1">&#x7236;-&gt;&#x5B50;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9012;</h2><p>&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x901A;&#x4FE1;&#x662F;&#x5F00;&#x53D1;&#x662F;&#x6700;&#x5E38;&#x7528;&#x7684;&#x4E5F;&#x662F;&#x6700;&#x91CD;&#x8981;&#x7684;&#xFF0C;&#x4F60;&#x4EEC;&#x4E00;&#x5B9A;&#x77E5;&#x9053;&#x7236;&#x5B50;&#x901A;&#x4FE1;&#x662F;&#x7528;prop&#x4F20;&#x9012;&#x6570;&#x636E;&#x7684;,&#x50CF;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x7236;&#x7EC4;&#x4EF6;,&#x4F20;&#x9012;&#x6570;&#x636E;
&lt;editor :inputIndex=&quot;data&quot; :inputName=&quot;&#x738B;&#x6587;&#x5065;&quot;&gt;&lt;/editor&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x7236;&#x7EC4;&#x4EF6;,&#x4F20;&#x9012;&#x6570;&#x636E;</span>
&lt;editor :inputIndex=<span class="hljs-string">&quot;data&quot;</span> :inputName=<span class="hljs-string">&quot;&#x738B;&#x6587;&#x5065;&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">editor</span>&gt;</span></span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x63A5;&#x53D7;&#x6570;&#x636E;&#xFF0C;&#x5B9A;&#x4E49;&#x4F20;&#x9012;&#x6570;&#x636E;&#x7684;&#x7C7B;&#x578B;type&#x4E0E;&#x9ED8;&#x8BA4;&#x503C;default
    props: {
        inputIndex: {
            type: Object, 
            default: function(){
                return {}
            }
        },
        inputName: {
            type: String,
            default: &apos;&apos;
        }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haskell"><code>//&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x63A5;&#x53D7;&#x6570;&#x636E;&#xFF0C;&#x5B9A;&#x4E49;&#x4F20;&#x9012;&#x6570;&#x636E;&#x7684;&#x7C7B;&#x578B;<span class="hljs-class"><span class="hljs-keyword">type</span>&#x4E0E;&#x9ED8;&#x8BA4;&#x503C;default</span>
    props: {
        inputIndex: {
            <span class="hljs-class"><span class="hljs-keyword">type</span>: <span class="hljs-type">Object</span>, </span>
            <span class="hljs-keyword">default</span>: function(){
                return {}
            }
        },
        inputName: {
            <span class="hljs-class"><span class="hljs-keyword">type</span>: <span class="hljs-type">String</span>,</span>
            <span class="hljs-keyword">default</span>: &apos;&apos;
        },</code></pre><p><strong>&#x6CE8;&#x610F;&#x9879;</strong>&#xFF1A;</p><ol><li><p>&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;&#x65F6;&#x7C7B;&#x4F3C;&#x5728;&#x6807;&#x7B7E;&#x4E2D;&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x4F20;&#x9012;&#x7684;&#x6570;&#x636E;&#x662F;data&#x4E2D;&#x7684;&#x81EA;&#x7136;&#x662F;&#x8981;&#x5728;&#x4F20;&#x9012;&#x5C5E;&#x6027;&#x524D;&#x52A0;<strong>v-bind:</strong>&#xFF0C;&#x5982;&#x679C;&#x4F20;&#x9012;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x5DF2;&#x77E5;&#x7684;&#x56FA;&#x5B9A;&#x503C;&#x5462;</p><ul><li>&#x5B57;&#x7B26;&#x4E32;&#x662F;<strong>&#x9759;&#x6001;</strong>&#x7684;&#x53EF;&#x76F4;&#x63A5;&#x4F20;&#x5165;&#x65E0;&#x9700;&#x5728;&#x5C5E;&#x6027;&#x524D;&#x52A0;<strong>v-bind</strong></li><li>&#x6570;&#x5B57;&#xFF0C;&#x5E03;&#x5C14;&#xFF0C;&#x5BF9;&#x8C61;&#xFF0C;&#x6570;&#x7EC4;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4E9B;&#x662F;js&#x8868;&#x8FBE;&#x5F0F;&#x800C;&#x4E0D;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x6240;&#x4EE5;&#x5373;&#x4F7F;&#x8FD9;&#x4E9B;&#x4F20;&#x9012;&#x7684;&#x662F;&#x9759;&#x6001;&#x7684;&#x4E5F;&#x9700;&#x8981;&#x52A0;<strong>v-bind</strong>&#xFF0C;&#x628A;&#x6570;&#x636E;&#x653E;&#x5230;<strong>data</strong>&#x4E2D;&#x5F15;&#x7528;&#xFF0C;</li></ul></li><li><p>&#x5982;&#x679C;prop&#x4F20;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x8BDD;&#xFF0C;&#x8981;&#x6CE8;&#x610F;&#x4F20;&#x9012;&#x7684;&#x662F;&#x4E00;&#x4E2A;<strong>&#x5BF9;&#x8C61;&#x5F15;&#x7528;</strong>&#xFF0C;&#x867D;&#x7136;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x770B;&#x4F3C;&#x662F;&#x5206;&#x79BB;&#x7684;&#x4F46;&#x6700;&#x540E;&#x90FD;&#x662F;&#x5728;&#x540C;&#x4E00;&#x5BF9;&#x8C61;&#x4E0B;</p></li><li><ul><li>&#x5982;&#x679C;prop&#x4F20;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x503C;&#x53EA;&#x662F;&#x4F5C;&#x4E3A;&#x521D;&#x59CB;&#x503C;&#x4F7F;&#x7528;&#xFF0C;&#x4E14;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x4E0D;&#x4F1A;&#x53D8;&#x5316;&#x8D4B;&#x503C;&#x5230;<strong>data</strong>&#x4E2D;&#x4F7F;&#x7528;</li><li>&#x5982;&#x679C;&#x4F20;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;prop&#x7684;&#x6570;&#x636E;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4F1A;&#x88AB;&#x6539;&#x53D8;&#x7684;&#xFF0C;&#x653E;&#x5230;<strong>&#x8BA1;&#x7B97;&#x5C5E;&#x6027;</strong>&#x4E2D;&#x76D1;&#x542C;&#x53D8;&#x5316;&#x4F7F;&#x7528;&#x3002;<strong>&#x56E0;&#x4E3A;&#x5982;&#x679C;&#x4F20;&#x9012;&#x7684;&#x662F;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x8BDD;&#xFF0C;&#x53EA;&#x6539;&#x53D8;&#x4E0B;&#x9762;&#x7684;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x662F;&#x4E0D;&#x4F1A;&#x54CD;&#x5E94;&#x5F0F;&#x66F4;&#x65B0;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x5B50;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x5728;&#x6570;&#x636E;&#x53D8;&#x5316;&#x65F6;&#x54CD;&#x5E94;&#x5F0F;&#x66F4;&#x65B0;&#x90A3;&#x53EA;&#x80FD;&#x653E;&#x5230;computed&#x4E2D;&#x6216;&#x8005;&#x7528;watch&#x6DF1;&#x62F7;&#x8D1D;deep:true&#x624D;&#x80FD;&#x76D1;&#x542C;&#x5230;&#x53D8;&#x5316;</strong></li><li>&#x5F53;&#x7136;&#x5982;&#x679C;&#x4F60;&#x53C8;&#x9700;&#x8981;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x901A;&#x8FC7;prop&#x4F20;&#x9012;&#x6570;&#x636E;&#x7684;&#x53D8;&#x5316;&#x505A;&#x4E9B;&#x64CD;&#x4F5C;&#xFF0C;&#x90A3;&#x4E48;&#x5199;&#x5728;computed&#x4E2D;&#x4F1A;&#x62A5;&#x8B66;&#x544A;&#xFF0C;&#x56E0;&#x4E3A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E2D;<strong>&#x4E0D;&#x63A8;&#x8350;&#x6709;&#x4EFB;&#x4F55;&#x6570;&#x636E;&#x7684;&#x6539;&#x53D8;</strong>&#xFF0C;&#x6700;&#x597D;&#x53EA;&#x8FDB;&#x884C;&#x8BA1;&#x7B97;&#x3002;&#x5982;&#x679C;&#x4F60;&#x975E;&#x8981;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x7684;&#x64CD;&#x4F5C;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x628A;&#x76D1;&#x542C;&#x5199;&#x5728;<strong>watch</strong>&#xFF08;&#x6CE8;&#x610F;deep&#x6DF1;&#x62F7;&#x8D1D;&#xFF09;&#x6216;&#x8005;&#x4F7F;&#x7528;computed&#x7684;<strong>get</strong>&#x548C;<strong>set</strong>&#x5982;&#x4E0B;&#x56FE;&#xFF1A;<span class="img-wrap"><img data-src="/img/remote/1460000016627807?w=994&amp;h=748" src="https://static.alili.tech/img/remote/1460000016627807?w=994&amp;h=748" alt="&#x8BA1;&#x7B97;&#x5C5E;&#x6027;.png" title="&#x8BA1;&#x7B97;&#x5C5E;&#x6027;.png" style="cursor:pointer"></span></li></ul></li></ol><ul><li>&#x4F46;&#x95EE;&#x9898;&#x53C8;&#x6765;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x662F;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x540C;&#x65F6;&#x4F60;&#x53C8;&#x9700;&#x8981;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x64CD;&#x4F5C;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#xFF0C;&#x90A3;&#x4E48;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;&#x8FD9;&#x4E2A;<strong>&#x6570;&#x636E;&#x4E5F;&#x4F1A;&#x6539;&#x53D8;</strong>&#xFF0C;<strong>&#x56E0;&#x4E3A;&#x4F60;&#x4F20;&#x9012;&#x7684;&#x53EA;&#x662F;&#x4E2A;&#x5F15;&#x7528;</strong>&#xFF0C; &#x5373;&#x4F7F;&#x4F60;&#x628A;prop&#x7684;&#x6570;&#x636E;&#x590D;&#x5236;&#x5230;<strong>data</strong>&#x4E2D;&#x4E5F;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x65E0;&#x8BBA;&#x5982;&#x4F55;&#x8D4B;&#x503C;&#x90FD;&#x662F;&#x5F15;&#x7528;&#x7684;&#x8D4B;&#x503C;&#xFF0C;<strong>&#x4F60;&#x53EA;&#x80FD;&#x5BF9;&#x5BF9;&#x8C61;&#x505A;&#x6DF1;&#x62F7;&#x8D1D;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x526F;&#x672C;&#x624D;&#x80FD;&#x7EE7;&#x7EED;&#x64CD;&#x4F5C;</strong>&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x7528;JSON&#x7684;&#x65B9;&#x6CD5;&#x5148;&#x8F6C;&#x5316;&#x5B57;&#x7B26;&#x4E32;&#x5728;&#x8F6C;&#x6210;&#x5BF9;&#x8C61;&#x66F4;&#x65B9;&#x4FBF;&#x4E00;&#x70B9;&#xFF0C;</li><li>&#x6240;&#x4EE5;&#x5728;&#x7236;&#x5B50;&#x4F20;&#x9012;&#x6570;&#x636E;&#x65F6;&#x8981;&#x5148;&#x8003;&#x8651;&#x597D;&#x6570;&#x636E;&#x8981;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#xFF0C;&#x5426;&#x5219;&#x4F60;&#x4F1A;&#x9047;&#x5230;&#x5F88;&#x591A;&#x95EE;&#x9898;&#x6216;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x4FEE;&#x6539;&#x4E86;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x662F;&#x5F88;<strong>&#x9690;&#x853D;</strong>&#x5E76;&#x4E14;&#x5F88;&#x5371;&#x9669;&#x7684;</li></ul><h2 id="articleHeader2">&#x5B50;-&gt;&#x7236;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9012;</h2><p>&#x5728;vue&#x4E2D;&#x5B50;&#x5411;&#x7236;&#x4F20;&#x9012;&#x6570;&#x636E;&#x4E00;&#x822C;&#x7528;<strong>$emit</strong>&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#xFF0C;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x76D1;&#x542C;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x5E76;&#x5728;&#x56DE;&#x8C03;&#x4E2D;&#x5199;&#x76F8;&#x5173;&#x903B;&#x8F91;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7236;&#x7EC4;&#x4EF6;&#x76D1;&#x542C;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9A;&#x4E49;&#x7684;&#x4E8B;&#x4EF6;
 &lt;editor :inputIndex=&quot;index&quot; @editorEmit=&apos;editorEmit&apos;&gt;&lt;/editor&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x7236;&#x7EC4;&#x4EF6;&#x76D1;&#x542C;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9A;&#x4E49;&#x7684;&#x4E8B;&#x4EF6;</span>
 &lt;editor :inputIndex=<span class="hljs-string">&quot;index&quot;</span> @editorEmit=<span class="hljs-string">&apos;editorEmit&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">editor</span>&gt;</span></span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B50;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x65F6;&#x6267;&#x884C;&#xFF0C;&#x5E76;&#x53EF;&#x4EE5;&#x4F20;&#x9012;&#x6570;&#x636E;
this.$emit(&apos;editorEmit&apos;, data)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// &#x5B50;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x65F6;&#x6267;&#x884C;&#xFF0C;&#x5E76;&#x53EF;&#x4EE5;&#x4F20;&#x9012;&#x6570;&#x636E;</span>
<span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;editorEmit&apos;</span>, <span class="hljs-keyword">data</span>)</code></pre><p>&#x90A3;&#x4E48;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x6211;&#x662F;&#x4E0D;&#x662F;&#x771F;&#x7684;&#x6709;&#x5FC5;&#x8981;&#x53BB;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#xFF0C;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x5B50;&#x7EC4;&#x4EF6;&#x60F3;&#x4F20;&#x9012;&#x6570;&#x636E;&#x6216;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x6570;&#x636E;&#x6709;&#x53D8;&#x5316;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x4F20;&#x9012;&#x65F6;&#x6267;&#x884C;&#xFF0C;&#x90A3;&#x4E48;&#x53E6;&#x5916;&#x4E00;&#x79CD;&#x573A;&#x666F;&#xFF0C;<strong>&#x7236;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x4F46;&#x5B50;&#x7EC4;&#x4EF6;&#x5E76;&#x4E0D;&#x77E5;&#x9053;&#x6216;&#x8005;&#x8BF4;&#x6CA1;&#x6709;&#x80FD;&#x529B;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x60F3;&#x8981;&#x7684;&#x65F6;&#x5019;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;</strong>&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5C31;&#x8981;&#x7528;&#x5230;&#x7EC4;&#x4EF6;&#x7684;&#x4E00;&#x4E2A;&#x9009;&#x9879;<strong>ref</strong>&#xFF1A;</p><blockquote><code>&lt;editor ref=&quot;editor&quot; @editorEmit=&apos;editorEmit&apos;&gt;&lt;/editor&gt;</code></blockquote><ul><li>&#x7236;&#x7EC4;&#x4EF6;&#x5728;&#x6807;&#x7B7E;&#x4E2D;&#x5B9A;&#x4E49;ref&#x5C5E;&#x6027;&#xFF0C;&#x5728;js&#x4E2D;&#x76F4;&#x63A5;&#x8C03;&#x7528;<strong>this.$refs.editor</strong>&#x5C31;&#x662F;&#x8C03;&#x7528;&#x6574;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x5185;&#x5BB9;&#x90FD;&#x80FD;&#x901A;&#x8FC7;ref&#x53BB;&#x8C03;&#x7528;&#xFF0C;&#x5F53;&#x7136;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x63A8;&#x8350;&#x56E0;&#x4E3A;&#x8FD9;&#x4F1A;&#x4F7F;&#x6570;&#x636E;&#x770B;&#x8D77;&#x6765;&#x975E;&#x5E38;&#x6DF7;&#x4E71;&#xFF0C;</li><li><strong>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E49;&#x4E00;&#x79CD;&#x4E13;&#x4F9B;&#x7236;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#xFF0C;</strong>&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x4E2D;&#x8FD4;&#x56DE;&#x5B50;&#x7EC4;&#x4EF6;data&#x4E2D;&#x67D0;&#x4E2A;&#x6570;&#x636E;&#xFF0C;<strong>&#x5F53;&#x7236;&#x7EC4;&#x4EF6;&#x60F3;&#x8981;&#x83B7;&#x53D6;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#x5C31;&#x76F4;&#x63A5;&#x4E3B;&#x52A8;&#x8C03;&#x7528;ref&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x83B7;&#x53D6;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#xFF0C;</strong>&#x8FD9;&#x6837;&#x80FD;&#x9002;&#x5E94;&#x5F88;&#x5927;&#x4E00;&#x90E8;&#x5206;&#x573A;&#x666F;&#xFF0C;&#x903B;&#x8F91;&#x4E5F;&#x66F4;&#x6E05;&#x6670;&#x4E00;&#x70B9;</li><li>&#x53E6;&#x5916;&#xFF0C;&#x7236;&#x5411;&#x5B50;&#x4F20;&#x9012;&#x6570;&#x636E;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;ref&#xFF0C;&#x6709;&#x6B21;&#x9700;&#x8981;&#x5728;&#x4E00;&#x4E2A;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x5927;&#x91CF;&#x8C03;&#x7528;&#x540C;&#x4E00;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x800C;&#x6BCF;&#x6B21;&#x8C03;&#x7528;&#x4F20;&#x9012;&#x7684;prop&#x6570;&#x636E;&#x90FD;&#x4E0D;&#x540C;&#xFF0C;&#x5E76;&#x4E14;&#x4F20;&#x9012;&#x6570;&#x636E;&#x4F1A;&#x6839;&#x636E;&#x4E4B;&#x540E;&#x64CD;&#x4F5C;&#x53D8;&#x5316;&#xFF0C;&#x8FD9;&#x6837;&#x6211;&#x9700;&#x8981;&#x5728;data&#x4E2D;&#x5B9A;&#x4E49;&#x5927;&#x91CF;&#x76F8;&#x5173;&#x6570;&#x636E;&#x5E76;&#x6539;&#x53D8;&#x5B83;&#xFF0C;&#x6211;<strong>&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x7528;ref&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x51FD;&#x6570;&#x76F4;&#x63A5;&#x628A;&#x6570;&#x636E;&#x4EE5;&#x53C2;&#x6570;&#x7684;&#x5F62;&#x5F0F;&#x4F20;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;</strong>&#xFF0C;&#x903B;&#x8F91;&#x4E00;&#x4E0B;&#x5B50;&#x6E05;&#x6670;&#x4E86;</li><li>&#x5982;&#x679C;&#x8C03;&#x7528;&#x57FA;&#x7840;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x8C03;&#x7528;ref&#x6267;&#x884C;&#x57FA;&#x7840;&#x7EC4;&#x4EF6;&#x4E2D;&#x66B4;&#x9732;&#x7684;&#x5404;&#x79CD;&#x529F;&#x80FD;&#x63A5;&#x53E3;&#xFF0C;&#x6BD4;&#x5982;&#x663E;&#x793A;&#xFF0C;&#x6D88;&#x5931;&#x7B49;</li></ul><h2 id="articleHeader3">&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9012;</h2><p>vue&#x4E2D;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#x662F;&#x5F88;&#x4E0D;&#x65B9;&#x4FBF;&#x7684;&#xFF0C;&#x6216;&#x8005;&#x8BF4;&#x4E0D;&#x652F;&#x6301;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x90FD;&#x6709;&#x4EC0;&#x4E48;&#x901A;&#x4FE1;&#x65B9;&#x5F0F;&#x5462;</p><ul><li><p><strong>&#x8DEF;&#x7531;URL&#x53C2;&#x6570;</strong></p><ul><li><p>&#x5728;&#x4F20;&#x7EDF;&#x5F00;&#x53D1;&#x65F6;&#x6211;&#x4EEC;&#x5E38;&#x5E38;&#x628A;&#x9700;&#x8981;&#x8DE8;&#x9875;&#x9762;&#x4F20;&#x9012;&#x7684;&#x6570;&#x636E;&#x653E;&#x5230;url&#x540E;&#x9762;&#xFF0C;&#x8DF3;&#x8F6C;&#x5230;&#x53E6;&#x5916;&#x9875;&#x9762;&#x65F6;&#x76F4;&#x63A5;&#x83B7;&#x53D6;url&#x5B57;&#x7B26;&#x4E32;&#x83B7;&#x53D6;&#x60F3;&#x8981;&#x7684;&#x53C2;&#x6570;&#x5373;&#x53EF;&#xFF0C;&#x5728;vue&#x8DE8;&#x7EC4;&#x4EF6;&#x65F6;&#x4E00;&#x6837;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x505A;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// router index.js &#x52A8;&#x6001;&#x8DEF;&#x7531;
{
   path:&apos;/params/:Id&apos;,
   component:Params,
   name&#xFF1A;Params
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code><span class="hljs-comment">// router index.js &#x52A8;&#x6001;&#x8DEF;&#x7531;</span>
{
   path:<span class="hljs-string">&apos;/params/:Id&apos;</span>,
   component:<span class="hljs-built_in">Params</span>,
   <span class="hljs-built_in">name</span>&#xFF1A;<span class="hljs-built_in">Params</span>
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8DF3;&#x8F6C;&#x8DEF;&#x7531;
&lt;router-link :to=&quot;/params/12&quot;&gt;&#x8DF3;&#x8F6C;&#x8DEF;&#x7531;&lt;/router-link&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>// &#x8DF3;&#x8F6C;&#x8DEF;&#x7531;
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">&quot;/params/12&quot;</span>&gt;</span>&#x8DF3;&#x8F6C;&#x8DEF;&#x7531;<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></code></pre></li><li>&#x5728;&#x8DF3;&#x8F6C;&#x540E;&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#x7528;$route.params.id&#x53BB;&#x83B7;&#x53D6;&#x5230;&#x8FD9;&#x4E2A;id&#x53C2;&#x6570;&#x4E3A;12&#xFF0C;&#x4F46;&#x8FD9;&#x79CD;&#x53EA;&#x9002;&#x5408;&#x4F20;&#x9012;&#x6BD4;&#x8F83;&#x5C0F;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x6570;&#x5B57;&#x4E4B;&#x7C7B;&#x7684;</li></ul></li><li><strong>Bus&#x901A;&#x4FE1;</strong></li></ul><p>&#x5728;&#x7EC4;&#x4EF6;&#x4E4B;&#x5916;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;bus.js&#x4F5C;&#x4E3A;&#x7EC4;&#x4EF6;&#x95F4;&#x901A;&#x4FE1;&#x7684;&#x6865;&#x6881;&#xFF0C;&#x9002;&#x7528;&#x4E8E;&#x6BD4;&#x8F83;&#x5C0F;&#x578B;&#x4E0D;&#x9700;&#x8981;vuex&#x53C8;&#x9700;&#x8981;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x7684;</p><ol><li><p>bus.js&#x4E2D;&#x6DFB;&#x52A0;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  import Vue from &apos;vue&apos;
  export default new Vue" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vue</code></pre></li><li><p>&#x7EC4;&#x4EF6;&#x4E2D;&#x8C03;&#x7528;bus.js&#x901A;&#x8FC7;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  import Bus from &apos;./bus.js&apos; 
  export default { 
      methods: {
         bus () {
            Bus.$emit(&apos;msg&apos;, &apos;&#x6211;&#x8981;&#x4F20;&#x7ED9;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x4EEC;&apos;)
         }
      }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>  <span class="hljs-keyword">import</span> Bus from <span class="hljs-string">&apos;./bus.js&apos;</span> 
  export <span class="hljs-keyword">default</span> { 
      methods: {
         bus () {
            Bus.$emit(<span class="hljs-string">&apos;msg&apos;</span>, <span class="hljs-string">&apos;&#x6211;&#x8981;&#x4F20;&#x7ED9;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x4EEC;&apos;</span>)
         }
      }
  }</code></pre></li><li><p>&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x4E2D;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x63A5;&#x53D7;&#x6570;&#x636E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import Bus from &apos;./bus.js&apos;
    export default {
        mounted() {
           Bus.$on(&apos;msg&apos;, (e) =&gt; {
             console.log(e)
           })
         }
       }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>    <span class="hljs-keyword">import</span> Bus <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./bus.js&apos;</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        mounted() {
           Bus.$<span class="hljs-literal">on</span>(<span class="hljs-string">&apos;msg&apos;</span>, <span class="hljs-function"><span class="hljs-params">(e)</span> =&gt;</span> {
             <span class="hljs-built_in">console</span>.log(e)
           })
         }
       }</code></pre></li></ol><p><em>&#x6CE8;&#xFF1A;&#x4EE5;&#x4E0A;&#x4E24;&#x79CD;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x5E76;&#x4E0D;&#x9AD8;&#x6240;&#x4EE5;&#x53EA;&#x662F;&#x7B80;&#x7565;&#x63D0;&#x4E00;&#x4E0B;&#xFF0C;&#x8FD9;&#x4E24;&#x70B9;&#x90FD;&#x662F;&#x5F88;&#x4E45;&#x4EE5;&#x524D;&#x5199;&#x8FC7;&#xFF0C;&#x4EE5;&#x4E0A;&#x4F8B;&#x5B50;&#x7F51;&#x4E0A;&#x76F4;&#x63A5;&#x641C;&#x96C6;&#x800C;&#x6765;&#x5982;&#x6709;&#x9519;&#x8BEF;&#xFF0C;&#x6307;&#x6B63;</em></p><ul><li><strong>Vuex&#x96C6;&#x4E2D;&#x72B6;&#x6001;&#x7BA1;&#x7406;</strong></li></ul><p>vuex&#x662F;vue&#x7684;&#x96C6;&#x4E2D;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#xFF0C;&#x5BF9;&#x4E8E;&#x5927;&#x578B;&#x5E94;&#x7528;&#x7EDF;&#x4E00;&#x96C6;&#x4E2D;&#x7BA1;&#x7406;&#x6570;&#x636E;&#xFF0C;&#x5F88;&#x65B9;&#x4FBF;&#xFF0C;&#x5728;&#x6B64;&#x5BF9;vuex&#x7684;&#x7528;&#x6CD5;&#x5E76;&#x4E0D;&#x8FC7;&#x591A;&#x4ECB;&#x7ECD;&#x53EA;&#x662F;&#x63D0;&#x4E00;&#x4E0B;&#x4F7F;&#x7528;&#x8FC7;&#x7A0B;&#x4E2D;&#x9047;&#x5230;&#x7684;&#x95EE;&#x9898;</p><ul><li><p>&#x89C4;&#x8303;&#xFF1A;&#x5BF9;&#x4E8E;&#x591A;&#x4EBA;&#x5F00;&#x53D1;&#x7684;&#x5927;&#x578B;&#x5E94;&#x7528;&#x89C4;&#x8303;&#x7684;&#x5236;&#x5B9A;&#x662F;&#x81F3;&#x5173;&#x91CD;&#x8981;&#x7684;&#xFF0C;&#x5BF9;&#x4E8E;&#x6240;&#x6709;&#x4EBA;&#x90FD;&#x4F1A;&#x63A5;&#x89E6;&#x5230;&#x7684;vuex&#x5BF9;&#x5176;&#x4FEE;&#x6539;&#x6570;&#x636E;&#x8C03;&#x7528;&#x6570;&#x636E;&#x90FD;&#x5E94;&#x6709;&#x4E00;&#x4E2A;&#x660E;&#x786E;&#x4E25;&#x683C;&#x7684;<strong>&#x4F7F;&#x7528;&#x89C4;&#x8303;</strong></p><ol><li>vuex&#x5206;&#x6A21;&#x5757;&#xFF1A;&#x9879;&#x76EE;&#x4E0D;&#x540C;&#x6A21;&#x5757;&#x95F4;&#x7EF4;&#x62A4;&#x5404;&#x81EA;&#x7684;vuex&#x6570;&#x636E;</li><li>&#x9650;&#x5236;&#x8C03;&#x7528;&#xFF1A;&#x53EA;&#x5141;&#x8BB8;action&#x64CD;&#x4F5C;&#x6570;&#x636E;&#xFF0C;getters&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x4F7F;&#x7528;mapGetters&#xFF0C;mapActions&#x8F85;&#x52A9;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x6570;&#x636E;<span class="img-wrap"><img data-src="/img/remote/1460000016627808?w=1218&amp;h=1372" src="https://static.alili.tech/img/remote/1460000016627808?w=1218&amp;h=1372" alt="vuex.png" title="vuex.png" style="cursor:pointer;display:inline"></span></li></ol></li><li>&#x5BF9;&#x4E8E;vuex&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x4E5F;&#x6709;&#x4E00;&#x4E9B;&#x4E89;&#x8BBA;&#xFF0C;&#x6709;&#x4EBA;&#x8BA4;&#x4E3A;&#x6B63;&#x5E38;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x5C31;&#x662F;&#x8981;&#x7528;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x503C;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5373;&#x4F7F;&#x5B50;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x4F7F;vuex&#x4E2D;&#x7684;&#x6570;&#x636E;&#x4E5F;&#x5E94;&#x8BE5;&#x7531;&#x7236;&#x7EC4;&#x4EF6;&#x83B7;&#x53D6;&#x518D;&#x4F20;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x4F46;&#x6709;&#x7684;&#x65F6;&#x5019;&#x7EC4;&#x4EF6;&#x95F4;&#x5D4C;&#x5957;&#x5F88;&#x6DF1;&#xFF0C;&#x53EA;&#x5141;&#x8BB8;&#x7236;&#x7EC4;&#x4EF6;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x5E76;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x65B9;&#x4FBF;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x5BF9;&#x4E8E;&#x7956;&#x5148;&#x5143;&#x7EC4;&#x4EF6;&#x4E0E;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x503C;&#x53C8;&#x6709;&#x4E86;&#x65B0;&#x95EE;&#x9898;&#xFF0C;vue&#x5B98;&#x7F51;&#x4E5F;&#x6709;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#x89E3;&#x51B3;&#xFF0C;&#x5982;&#x4E0B;</li></ul><h2 id="articleHeader4">&#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x4E0E;&#x5B50;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9012;</h2><p><strong><a href="https://cn.vuejs.org/v2/api/#provide-inject" rel="nofollow noreferrer" target="_blank">provide/inject</a></strong><br>&#x9664;&#x4E86;&#x6B63;&#x5E38;&#x7684;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x503C;&#x5916;&#xFF0C;vue&#x4E5F;&#x63D0;&#x4F9B;&#x4E86;provide/inject</p><blockquote>&#x8FD9;&#x5BF9;&#x9009;&#x9879;&#x9700;&#x8981;&#x4E00;&#x8D77;&#x4F7F;&#x7528;&#xFF0C;&#x4EE5;&#x5141;&#x8BB8;&#x4E00;&#x4E2A;&#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x5411;&#x5176;&#x6240;&#x6709;&#x5B50;&#x5B59;&#x540E;&#x4EE3;&#x6CE8;&#x5165;&#x4E00;&#x4E2A;&#x4F9D;&#x8D56;&#xFF0C;&#x4E0D;&#x8BBA;&#x7EC4;&#x4EF6;&#x5C42;&#x6B21;&#x6709;&#x591A;&#x6DF1;&#xFF0C;&#x5E76;&#x5728;&#x8D77;&#x4E0A;&#x4E0B;&#x6E38;&#x5173;&#x7CFB;&#x6210;&#x7ACB;&#x7684;&#x65F6;&#x95F4;&#x91CC;&#x59CB;&#x7EC8;&#x751F;&#x6548;</blockquote><p>&#x5B98;&#x7F51;&#x5B9E;&#x4F8B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7236;&#x7EA7;&#x7EC4;&#x4EF6;&#x63D0;&#x4F9B; &apos;foo&apos;
var Provider = {
  provide: {
    foo: &apos;bar&apos;
  },
  // ...
}

// &#x5B50;&#x7EC4;&#x4EF6;&#x6CE8;&#x5165; &apos;foo&apos;
var Child = {
  inject: [&apos;foo&apos;],
  created () {
    console.log(this.foo) // =&gt; &quot;bar&quot;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x7236;&#x7EA7;&#x7EC4;&#x4EF6;&#x63D0;&#x4F9B; &apos;foo&apos;</span>
<span class="hljs-keyword">var</span> Provider = {
  <span class="hljs-attr">provide</span>: {
    <span class="hljs-attr">foo</span>: <span class="hljs-string">&apos;bar&apos;</span>
  },
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// &#x5B50;&#x7EC4;&#x4EF6;&#x6CE8;&#x5165; &apos;foo&apos;</span>
<span class="hljs-keyword">var</span> Child = {
  <span class="hljs-attr">inject</span>: [<span class="hljs-string">&apos;foo&apos;</span>],
  created () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.foo) <span class="hljs-comment">// =&gt; &quot;bar&quot;</span>
  }
}</code></pre><ul><li>provide &#x9009;&#x9879;&#x5E94;&#x8BE5;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x6216;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x51FD;&#x6570;&#x3002;&#x8BE5;&#x5BF9;&#x8C61;&#x5305;&#x542B;&#x53EF;&#x6CE8;&#x5165;&#x5176;&#x5B50;&#x5B59;&#x7684;&#x5C5E;&#x6027;&#x3002;</li><li><p>&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x6570;&#x7EC4;&#xFF0C;&#x6216;<br>&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5BF9;&#x8C61;&#x7684; key &#x662F;&#x672C;&#x5730;&#x7684;&#x7ED1;&#x5B9A;&#x540D;&#xFF0C;value &#x662F;&#xFF1A;</p><ul><li><p>&#x5728;&#x53EF;&#x7528;&#x7684;&#x6CE8;&#x5165;&#x5185;&#x5BB9;&#x4E2D;&#x641C;&#x7D22;&#x7528;&#x7684; key (&#x5B57;&#x7B26;&#x4E32;&#x6216; Symbol)&#xFF0C;&#x6216;<br>&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#xFF1A;</p><ul><li>from &#x5C5E;&#x6027;&#x662F;&#x5728;&#x53EF;&#x7528;&#x7684;&#x6CE8;&#x5165;&#x5185;&#x5BB9;&#x4E2D;&#x641C;&#x7D22;&#x7528;&#x7684; key (&#x5B57;&#x7B26;&#x4E32;&#x6216; Symbol)</li><li>default &#x5C5E;&#x6027;&#x662F;&#x964D;&#x7EA7;&#x60C5;&#x51B5;&#x4E0B;&#x4F7F;&#x7528;&#x7684; value</li></ul></li></ul></li></ul><blockquote>&#x63D0;&#x793A;&#xFF1A;provide &#x548C; inject &#x7ED1;&#x5B9A;&#x5E76;&#x4E0D;&#x662F;&#x53EF;&#x54CD;&#x5E94;&#x7684;&#x3002;&#x8FD9;&#x662F;&#x523B;&#x610F;&#x4E3A;&#x4E4B;&#x7684;&#x3002;&#x7136;&#x800C;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x4F20;&#x5165;&#x4E86;&#x4E00;&#x4E2A;&#x53EF;&#x76D1;&#x542C;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E48;&#x5176;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x8FD8;&#x662F;&#x53EF;&#x54CD;&#x5E94;&#x7684;&#x3002;</blockquote><p><strong>&#x5177;&#x4F53;&#x7EC6;&#x8282;&#x79FB;&#x6B65;vue&#x76F8;&#x5173;&#x4ECB;&#x7ECD;<a href="https://cn.vuejs.org/v2/api/#provide-inject" rel="nofollow noreferrer" target="_blank"></a><a href="https://cn.vuejs.org/v2/api/#provide-inject" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/api/#...</a></strong></p><p>provide/inject&#x8FD8;&#x672A;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x5E94;&#x7528;&#x8FC7;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x505A;&#x5C1D;&#x8BD5;</p><hr><h2 id="articleHeader5">&#x8865;&#x5145; $attrs/inheritAttrs</h2><p>&#x7ECF;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x63D0;&#x9192;&#x8865;&#x5145;<strong>$attrs</strong>&#x7684;&#x4F7F;&#x7528;<br><strong>&#x573A;&#x666F;</strong>&#xFF1A;&#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x4E0E;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x503C;</p><ul><li>&#x5982;&#x679C;&#x662F;props&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x5FC5;&#x987B;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E0E;&#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x90FD;&#x8981;prop&#x63A5;&#x53D7;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#xFF0C;&#x518D;&#x4F20;&#x5230;&#x4E0B;&#x4E00;&#x5C42;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FD9;&#x5C31;&#x5F88;&#x9EBB;&#x70E6;&#xFF0C;&#x8026;&#x5408;&#x6DF1;&#x7A0B;&#x5E8F;&#x81C3;&#x80BF;</li><li>&#x5982;&#x679C;&#x7528;vuex&#x786E;&#x5B9E;&#x663E;&#x5F97;&#x6709;&#x70B9;&#x5C0F;&#x9898;&#x5927;&#x505A;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x7528;$attrs&#x76F4;&#x63A5;&#x53BB;&#x83B7;&#x53D6;&#x7956;&#x5148;&#x6570;&#x636E;&#x4E5F;&#x4E0D;&#x9519;</li></ul><blockquote>&#x5305;&#x542B;&#x4E86;&#x7236;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x4E0D;&#x4F5C;&#x4E3A; prop &#x88AB;&#x8BC6;&#x522B; (&#x4E14;&#x83B7;&#x53D6;) &#x7684;&#x7279;&#x6027;&#x7ED1;&#x5B9A; (class &#x548C; style &#x9664;&#x5916;)&#x3002;&#x5F53;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x6CA1;&#x6709;&#x58F0;&#x660E;&#x4EFB;&#x4F55; prop &#x65F6;&#xFF0C;&#x8FD9;&#x91CC;&#x4F1A;&#x5305;&#x542B;&#x6240;&#x6709;&#x7236;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x7ED1;&#x5B9A; (class &#x548C; style &#x9664;&#x5916;)&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; v-bind=&quot;$attrs&quot; &#x4F20;&#x5165;&#x5185;&#x90E8;&#x7EC4;&#x4EF6;&#x2014;&#x2014;&#x5728;&#x521B;&#x5EFA;&#x9AD8;&#x7EA7;&#x522B;&#x7684;&#x7EC4;&#x4EF6;&#x65F6;&#x975E;&#x5E38;&#x6709;&#x7528;&#x3002;</blockquote><p>&#x4EE5;&#x4E0A;&#x662F;&#x5B98;&#x7F51;&#x5BF9;$attrs&#x7684;&#x89E3;&#x91CA;&#xFF0C;&#x6211;&#x521A;&#x770B;&#x6211;&#x4E5F;&#x662F;&#x4E00;&#x8138;&#x61F5;&#x903C;&#xFF0C;&#x56DE;&#x53BB;&#x8BD5;&#x4E86;&#x4E00;&#x4E0B;&#x5176;&#x5B9E;&#x5E76;&#x4E0D;&#x96BE;&#xFF0C;&#x800C;&#x4E14;&#x6BD4;&#x8F83;&#x9002;&#x7528;&#x7EC4;&#x4EF6;&#x6DF1;&#x5C42;&#x5D4C;&#x5957;&#x573A;&#x666F;&#x4E0B;&#xFF0C;<strong>&#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x503C;&#x7684;&#x95EE;&#x9898;</strong></p><p>&#x610F;&#x601D;&#x5C31;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x7684;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x4E0D;prop&#x63A5;&#x53D7;&#x7684;&#x6570;&#x636E;&#x90FD;&#x4F1A;&#x653E;&#x5728;$attrs&#x4E2D;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x76F4;&#x63A5;&#x7528;this.$attrs&#x83B7;&#x53D6;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;&#x5982;&#x8FC7;&#x4ECE;&#x7236;-&gt;&#x5B59;&#x4F20;&#xFF0C;&#x5C31;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x6DFB;&#x52A0;<strong>v-bind=&apos;$attrs&apos;</strong>&#xFF0C;&#x5C31;&#x628A;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x6765;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#x6CA1;props&#x63A5;&#x6536;&#x7684;&#x6570;&#x636E;&#x5168;&#x90E8;&#x4F20;&#x5230;&#x5B59;&#x7EC4;&#x4EF6;&#xFF0C;&#x5177;&#x4F53;&#x770B;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;</p><p><strong>&#x4F7F;&#x7528;&#xFF1A;</strong></p><p>&#x7956;&#x5148;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7956;&#x5148;&#x7EC4;&#x4EF6;
// &#x5728;&#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x4E2D;&#x76F4;&#x63A5;&#x4F20;&#x5165;output&#x548C;input
&lt;template&gt;
  &lt;div&gt;
    &lt;child1 :output=&apos;output&apos; :input=&quot;input&quot;&gt;&lt;/child1&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
import child1 from &apos;./child1.vue&apos;
export default {
  components: {
    child1
  },
  data () {
    return {
      input: &apos;jijijijjijiji&apos;,
      output: {
        name: &apos;&#x738B;&#x6587;&#x5065;&apos;,
        age: &apos;18&apos;
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>// &#x7956;&#x5148;&#x7EC4;&#x4EF6;
// &#x5728;&#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x4E2D;&#x76F4;&#x63A5;&#x4F20;&#x5165;output&#x548C;input
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child1</span> <span class="hljs-attr">:output</span>=<span class="hljs-string">&apos;output&apos;</span> <span class="hljs-attr">:input</span>=<span class="hljs-string">&quot;input&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> child1 <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./child1.vue&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    child1
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">input</span>: <span class="hljs-string">&apos;jijijijjijiji&apos;</span>,
      <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x738B;&#x6587;&#x5065;&apos;</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-string">&apos;18&apos;</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x5B50;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div
    &lt;h1&gt;{{input}}&lt;/h1&gt;
    &lt;child2 :child=&quot;child&quot; v-bind=&apos;$attrs&apos;&gt;&lt;/child2&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
import child2 from &apos;./child2.vue&apos;
export default {
  components: {
    child2
  },
  props: {
    input: [String]
  },
  data () {
    return {
      child: &apos;child1child1child1child1s&apos;
    }
  },
// &#x9ED8;&#x8BA4;&#x4E3A;true&#xFF0C;&#x5982;&#x679C;&#x4F20;&#x5165;&#x7684;&#x5C5E;&#x6027;&#x5B50;&#x7EC4;&#x4EF6;&#x6CA1;&#x6709;prop&#x63A5;&#x53D7;&#xFF0C;&#x5C31;&#x4F1A;&#x4EE5;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5F62;&#x5F0F;&#x51FA;&#x73B0;&#x4E3A;&#x6807;&#x7B7E;&#x5C5E;&#x6027;
// &#x8BBE;&#x4E3A;false&#xFF0C;&#x5728;dom&#x4E2D;&#x5C31;&#x770B;&#x4E0D;&#x5230;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#xFF0C;&#x8BD5;&#x4E00;&#x4E0B;&#x5C31;&#x77E5;&#x9053;&#x4E86;
  inheritAttrs: false,
  created () {
    // &#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x6253;&#x5370;&#x7684;$attrs&#x5C31;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x5165;&#x7684;&#x503C;&#xFF0C;&#x5228;&#x53BB;style,class,&#x548C;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x5DF2;props&#x7684;&#x5C5E;&#x6027;
    console.log(this.$attrs)  // &#x6253;&#x5370;output
  }
}
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs htmlbars"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    &lt;<span class="hljs-attr">h1</span>&gt;</span></span><span class="hljs-template-variable">{{<span class="hljs-built_in">input</span>}}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child2</span> <span class="hljs-attr">:child</span>=<span class="hljs-string">&quot;child&quot;</span> <span class="hljs-attr">v-bind</span>=<span class="hljs-string">&apos;$attrs&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child2</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> child2 <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./child2.vue&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    child2
  },
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">input</span>: [<span class="hljs-built_in">String</span>]
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">child</span>: <span class="hljs-string">&apos;child1child1child1child1s&apos;</span>
    }
  },
<span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x4E3A;true&#xFF0C;&#x5982;&#x679C;&#x4F20;&#x5165;&#x7684;&#x5C5E;&#x6027;&#x5B50;&#x7EC4;&#x4EF6;&#x6CA1;&#x6709;prop&#x63A5;&#x53D7;&#xFF0C;&#x5C31;&#x4F1A;&#x4EE5;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5F62;&#x5F0F;&#x51FA;&#x73B0;&#x4E3A;&#x6807;&#x7B7E;&#x5C5E;&#x6027;</span>
<span class="hljs-comment">// &#x8BBE;&#x4E3A;false&#xFF0C;&#x5728;dom&#x4E2D;&#x5C31;&#x770B;&#x4E0D;&#x5230;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#xFF0C;&#x8BD5;&#x4E00;&#x4E0B;&#x5C31;&#x77E5;&#x9053;&#x4E86;</span>
  inheritAttrs: <span class="hljs-literal">false</span>,
  created () {
    <span class="hljs-comment">// &#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x6253;&#x5370;&#x7684;$attrs&#x5C31;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x5165;&#x7684;&#x503C;&#xFF0C;&#x5228;&#x53BB;style,class,&#x548C;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x5DF2;props&#x7684;&#x5C5E;&#x6027;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$attrs)  <span class="hljs-comment">// &#x6253;&#x5370;output</span>
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre><p>&#x5B59;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    {{$attrs.output.name}}
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  created () {
    // &#x6253;&#x5370;output&#x548C;child
    console.log(this.$attrs)
  }
}
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    </span><span class="hljs-template-variable">{{$attrs.output.name}}</span><span class="xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  created () {
    <span class="hljs-comment">// &#x6253;&#x5370;output&#x548C;child</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$attrs)
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre><p>&#x770B;&#x8D77;&#x6765;&#x8FD8;&#x662F;&#x633A;&#x597D;&#x7528;&#x7684;&#xFF0C;&#x8FD8;&#x6CA1;&#x5728;&#x5177;&#x4F53;&#x9879;&#x76EE;&#x4E2D;&#x7528;&#x8FC7;&#xFF0C;&#x76F8;&#x4FE1;&#x4E0D;&#x4E45;&#x4F1A;&#x7528;&#x5230;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x8FD8;&#x6709;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#x6B22;&#x8FCE;&#x7559;&#x8A00;</p><p><strong>$children/$parent</strong><br>&#x5F53;&#x7136;&#x4F60;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x7528;$children/$parent&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x6216;&#x7236;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF08;&#x5982;&#x679C;&#x6709;&#x7684;&#x8BDD;&#xFF09;&#xFF0C;&#x4E5F;&#x80FD;&#x5BF9;&#x5176;&#x505A;&#x4E9B;&#x64CD;&#x4F5C;&#xFF0C;&#x4E0D;&#x8FC7;&#x5E76;&#x4E0D;&#x63A8;&#x8350;&#x8FD9;&#x4E48;&#x505A;<br>&#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x653E;&#x5230;localStorage&#xFF0C;sessionStorage&#xFF0C;cooikes&#x4E4B;&#x7C7B;&#x7684;&#x5B58;&#x5728;&#x672C;&#x5730;&#x5F53;&#x7136;&#x4E5F;&#x80FD;&#x505A;&#x5230;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x901A;&#x4FE1;</p><h2 id="articleHeader6">&#x5199;&#x5728;&#x7ED3;&#x5C3E;</h2><p>&#x6587;&#x7AE0;&#x53EA;&#x662F;&#x6574;&#x7406;&#x4E00;&#x4E0B;&#x7B14;&#x8BB0;&#xFF0C;&#x8C08;&#x4E00;&#x8C08;&#x9047;&#x5230;&#x7684;&#x95EE;&#x9898;&#x548C;&#x7ECF;&#x9A8C;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x4E25;&#x8C28;&#x7684;&#x63AA;&#x8F9E;&#x548C;&#x8BE6;&#x7EC6;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x5982;&#x6709;&#x9519;&#x8BEF;&#x671B;&#x6307;&#x6B63;</p><hr><p>&#x539F;&#x521B;&#x6587;&#x7AE0;&#x8F6C;&#x8F7D;&#x5F15;&#x7528;&#x8BF7;&#x6CE8;&#x660E;&#x539F;&#x6587;&#x94FE;&#x63A5;<a href="http://blog.wwenj.com/index.php/archives/69/" rel="nofollow noreferrer" target="_blank"></a><a href="http://blog.wwenj.com/index.php/archives/69/" rel="nofollow noreferrer" target="_blank">http://blog.wwenj.com/index.p...</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue组件通信全面总结

## 原文链接
[https://segmentfault.com/a/1190000016627804](https://segmentfault.com/a/1190000016627804)

