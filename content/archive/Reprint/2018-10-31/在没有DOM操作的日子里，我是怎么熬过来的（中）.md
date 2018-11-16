---
title: 在没有DOM操作的日子里，我是怎么熬过来的（中）
hidden: true
categories: [reprint]
slug: 5b850124
date: 2018-10-31 02:30:10
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVZsm6?w=669&amp;h=445" src="https://static.alili.tech/img/bVZsm6?w=669&amp;h=445" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x7EE7;&#x4E0A;&#x7BC7;&#x63A8;&#x9001;&#x4E4B;&#x540E;&#xFF0C;&#x5728;&#x6398;&#x91D1;&#x3001;segmentfault&#x3001;&#x7B80;&#x4E66;&#x3001;&#x535A;&#x5BA2;&#x56ED;&#x7B49;&#x5E73;&#x53F0;&#x4E0A;&#x8FC5;&#x901F;&#x6536;&#x5230;&#x4E86;&#x4E0D;&#x4FD7;&#x7684;&#x53CD;&#x9988;&#xFF0C;&#x5927;&#x90E8;&#x5206;&#x7F51;&#x53CB;&#x90FD;&#x7559;&#x8A00;&#x8BF4;&#x611F;&#x540C;&#x8EAB;&#x53D7;&#xFF0C;&#x8FD8;&#x6709;&#x4E0D;&#x5C11;&#x7F51;&#x53CB;&#x8FFD;&#x95EE;&#x4E2D;&#x7BC7;&#x4F55;&#x65F6;&#x66F4;&#x65B0;&#x3002;&#x4E8E;&#x662F;&#xFF0C;&#x95F0;&#x571F;&#x987A;&#x5E94;&#x547C;&#x58F0;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x51DB;&#x51BD;&#x7684;&#x5BD2;&#x51AC;&#x65E9;&#x6668;&#xFF0C;&#x5C06;&#x4E2D;&#x7BC7;&#x70ED;&#x6587;&#x6EDA;&#x70EB;&#x5448;&#x4E0A;&#x3002;</p><p>&#x642C;&#x597D;&#x5C0F;&#x677F;&#x51F3;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6B63;&#x6587;&#x4ECE;&#x8FD9;&#x5F00;&#x59CB;&#xFF5E;</p><p>&#x5728;&#x4E0A;&#x7BC7;&#x7684;&#x4F17;&#x591A;&#x7559;&#x8A00;&#x4E2D;&#xFF0C;&#x6709;&#x4F4D;&#x7F51;&#x53CB;&#x7684;&#x8BC4;&#x8BBA;&#x6BD4;&#x8F83;&#x5177;&#x6709;&#x4EE3;&#x8868;&#x6027;&#xFF0C;&#x6458;&#x51FA;&#x6765;&#x4F9B;&#x5927;&#x5BB6;&#x4E00;&#x9605;&#xFF1A;</p><blockquote>&#x201C; &#x540C;&#x611F;&#x554A;&#x697C;&#x4E3B; &#x6BD4;&#x5982;&#x505A;tab&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4EE5;&#x524D;jq&#x5C31;&#x662F;&#x5207;&#x6362;&#x4E00;&#x4E0B;class&#xFF0C;&#x73B0;&#x5728;vue&#x662F;&#x5207;&#x6362;&#x6570;&#x636E;&#xFF0C;&#x518D;&#x6839;&#x636E;&#x6570;&#x636E;&#x663E;&#x793A;class&#xFF0C;&#x8FD9;&#x5F2F;&#x7ED5;&#x7684;&#x554A; &#x201D;</blockquote><p>&#x5F53;&#x7136;&#xFF0C;&#x6709;&#x8BC4;&#x8BBA;&#x5C31;&#x6709;&#x56DE;&#x590D;&#xFF0C;&#x8BF7;&#x770B;&#x4E0B;&#x9762;&#x8FD9;&#x4F4D;&#x7F51;&#x53CB;&#x662F;&#x600E;&#x4E48;&#x56DE;&#x590D;&#x4ED6;&#x7684;&#xFF1A;</p><blockquote>&#x201C; &#x54EA;&#x91CC;&#x7ED5;&#x5F2F;&#x4E86;&#xFF0C;&#x53EA;&#x8981;&#x8BB0;&#x7740;&#x6570;&#x636E;&#x9A71;&#x52A8;dom&#xFF0C;&#x4E60;&#x60EF;&#x5C31;&#x597D;&#xFF0C;&#x8FD9;&#x79CD;&#x6A21;&#x5F0F;&#x624D;&#x6BD4;&#x8F83;&#x9002;&#x5408;&#x9875;&#x9762;dom&#x53D8;&#x5316;&#x6E32;&#x67D3;&#xFF0C;&#x53EA;&#x662F;&#x4E4B;&#x524D;&#x88AB;jq&#x5E26;&#x7684;&#x6839;&#x751F;&#x8482;&#x56FA; &#x201D;</blockquote><p>&#x6709;&#x65F6;&#x5019;&#x5199;&#x6587;&#x7AE0;&#xFF0C;&#x4E0D;&#x4E00;&#x5B9A;&#x4EC5;&#x4EC5;&#x662F;&#x4E3A;&#x4E86;&#x5206;&#x4EAB;&#x81EA;&#x5DF1;&#x7684;&#x5DE5;&#x4F5C;&#x7ECF;&#x9A8C;&#xFF0C;&#x800C;&#x662F;&#x8FD8;&#x60F3;&#x770B;&#x770B;&#x7F51;&#x53CB;&#x662F;&#x600E;&#x4E48;&#x770B;&#x5F85;&#x8FD9;&#x4E2A;&#x8BDD;&#x9898;&#x7684;&#xFF0C;&#x4ECE;&#x800C;&#x884D;&#x751F;&#x51FA;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x5BF9;&#x8BDD;&#xFF0C;&#x4EE5;&#x53CA;&#x601D;&#x60F3;&#x78B0;&#x649E;&#x3002;<br>&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x95F0;&#x571F;&#x6709;&#x53E5;&#x8BDD;&#x60F3;&#x9001;&#x7ED9;&#x521A;&#x4ECE;JQ&#x8F6C;&#x53D8;&#x601D;&#x8DEF;&#x8FC7;&#x6765;&#x7684;&#x540C;&#x884C;&#x4EEC;&#xFF1A;</p><blockquote>MVVM&#x65F6;&#x4EE3;&#xFF0C;&#x6570;&#x636E;&#x6620;&#x50CF;&#x4E86;DOM&#x4E16;&#x754C;&#xFF0C;&#x4E00;&#x5207;&#x4EE5;&#x6570;&#x636E;&#x4E3A;&#x6838;&#x5FC3;&#xFF0C;&#x6B63;&#x5982;&#x540C;&#x6570;&#x5B66;&#x53EF;&#x4EE5;&#x63CF;&#x8FF0;&#x4E16;&#x754C;&#x4E00;&#x6837;&#xFF0C;&#x4F60;&#x53EA;&#x9700;&#x8981;&#x8003;&#x8651;&#x6570;&#x636E;&#x6216;&#x8005;&#x72B6;&#x6001;&#x5373;&#x53EF;&#x3002;</blockquote><p>&#x6240;&#x4EE5;&#xFF0C;&#x53EA;&#x8981;&#x4F60;&#x5145;&#x5206;&#x7406;&#x89E3;&#x4E86;&#x4E0A;&#x9762;&#x8FD9;&#x53E5;&#x8BDD;&#xFF0C;&#x606D;&#x559C;&#x4F60;&#xFF0C;&#x4F60;&#x5DF2;&#x7ECF;&#x4ECE;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;DOM&#x7684;&#x65F6;&#x4EE3;&#x6BEB;&#x65E0;&#x538B;&#x529B;&#x7684;&#x8FC7;&#x6E21;&#x5230;&#x4E86;MVVM&#x65F6;&#x4EE3;&#xFF01;</p><p>&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x5148;&#x6765;&#x770B;&#x770B;MVVM&#x9879;&#x76EE;&#x7684;&#x5DE5;&#x7A0B;&#x76EE;&#x5F55;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVZsnG?w=662&amp;h=947" src="https://static.alili.tech/img/bVZsnG?w=662&amp;h=947" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x5F53;&#x7136;&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;vue&#x5B98;&#x7F51;&#x63D0;&#x4F9B;&#x7684;vue-cli&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;&#xFF0C;&#x6765;&#x5FEB;&#x901F;&#x642D;&#x5EFA;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x3002;&#x5982;&#x679C;&#x6709;&#x4E0D;&#x61C2;&#x811A;&#x624B;&#x67B6;&#x4F5C;&#x7528;&#x7684;&#x8001;&#x94C1;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x7167;&#x4E0B;&#x56FE;&#xFF0C;&#x8FD9;&#x5C31;&#x6709;&#x70B9;&#x7C7B;&#x4F3C;&#x4E8E;&#x5DE5;&#x5730;&#x4E0A;&#x7684;&#x811A;&#x624B;&#x67B6;&#xFF0C;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x5DE5;&#x4EBA;&#x4EEC;&#x5FEB;&#x901F;&#x642D;&#x5EFA;&#x8BE5;&#x5EFA;&#x7B51;&#x7684;&#x7ED3;&#x6784;&#x6A21;&#x578B;&#xFF08;&#x8BDD;&#x7CD9;&#x7406;&#x4E0D;&#x7CD9;&#xFF0C;&#x8BF4;&#x660E;&#x95EE;&#x9898;&#x5373;&#x53EF;&#xFF09;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVZsph?w=671&amp;h=377" src="https://static.alili.tech/img/bVZsph?w=671&amp;h=377" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x642D;&#x5EFA;&#x5B8C;&#x6BD5;&#x540E;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;npm install &#x6765;&#x5B89;&#x88C5;&#x9879;&#x76EE;&#x4F9D;&#x8D56;&#x4E86;&#x3002;&#x901A;&#x5E38;&#x8FD9;&#x4E2A;&#x9636;&#x6BB5;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x6BD4;&#x8F83;&#x6F2B;&#x957F;&#xFF0C;&#x5EFA;&#x8BAE;&#x7528;&#x56FD;&#x5185;&#x6DD8;&#x5B9D;&#x7684;&#x955C;&#x50CF;cnpm&#x3002;</p><p>&#x4E5F;&#x662F;&#x5728;&#x8FD9;&#x671F;&#x95F4;&#xFF0C;&#x7ECF;&#x5E38;&#x6709;&#x540C;&#x5B66;&#x5728;&#x5B89;&#x88C5;&#x67D0;&#x4F9D;&#x8D56;&#x6A21;&#x5757;&#x65F6;&#xFF0C;&#x4F1A;&#x78B0;&#x5230;&#x547D;&#x4EE4;&#x884C;&#x62A5;&#x9519;&#xFF0C;&#x8BF4;&#x662F;node&#x6216;&#x8005;npm&#x7248;&#x672C;&#x8FC7;&#x4F4E;&#x7B49;&#x95EE;&#x9898;&#x3002;&#x5047;&#x5982;&#x4F60;&#x679C;&#x771F;&#x78B0;&#x5230;&#x8FD9;&#x4E2A;&#x7C7B;&#x4F3C;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x4EE5;&#x8003;&#x8651;&#x5148;&#x5C06;&#x9879;&#x76EE;&#x4E2D;&#x7684;node_modules&#x5220;&#x9664;&#x6389;&#xFF0C;&#x7136;&#x540E;&#x91CD;&#x65B0;cnpm install&#x5B89;&#x88C5;&#x9879;&#x76EE;&#x6240;&#x9700;&#x7684;&#x4F9D;&#x8D56;&#x3002;&#x901A;&#x5E38;&#x8FD9;&#x4E2A;&#x60C5;&#x51B5;&#xFF0C;&#x5C31;&#x4F1A;&#x8FCE;&#x5203;&#x800C;&#x89E3;&#xFF08;&#x4E0D;&#x8981;&#x95EE;&#x4E3A;&#x4EC0;&#x4E48;&#xFF0C;&#x8FD9;&#x53EF;&#x80FD;&#x662F;&#x4E2A;&#x504F;&#x65B9;&#xFF09;&#x3002;</p><p>&#x7136;&#x540E;&#xFF0C;&#x4F60;&#x5C31;&#x53EF;&#x4EE5;&#x5927;&#x6B65;&#x6D41;&#x661F;&#x5730;&#x53BB;&#x6267;&#x884C;&#x4EE5;&#x4E0B;&#x64CD;&#x4F5C;&#x4E86;&#xFF1A;</p><h4>&#x5F00;&#x542F;&#x672C;&#x5730;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x76D1;&#x63A7;&#x9879;&#x76EE;&#x6587;&#x4EF6;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x5B9E;&#x65F6;&#x6784;&#x5EFA;&#x5E76;&#x81EA;&#x52A8;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x8BBF;&#x95EE; <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8081</h4><blockquote>npm run dev</blockquote><h4>&#x4F7F;&#x7528;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x914D;&#x7F6E;&#x6784;&#x5EFA;&#x9879;&#x76EE;&#xFF0C;&#x6784;&#x5EFA;&#x597D;&#x7684;&#x6587;&#x4EF6;&#x4F1A;&#x8F93;&#x51FA;&#x5230; &quot;dist&quot; &#x76EE;&#x5F55;&#xFF0C;</h4><blockquote>npm run build</blockquote><h4>&#x8FD0;&#x884C;&#x6784;&#x5EFA;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x6784;&#x5EFA;&#x7684;&#x9875;&#x9762;</h4><blockquote>npm run build-server</blockquote><h4>&#x8FD0;&#x884C;&#x5355;&#x5143;&#x6D4B;&#x8BD5;</h4><blockquote>npm run unit</blockquote><p>&#x5F53;&#x4F60;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x8FD0;&#x884C;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x4E4B;&#x540E;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5C31;&#x8BE5;&#x804A;&#x804A;&#x9879;&#x76EE;&#x91CC;&#x7684;&#x5404;&#x4E2A;&#x6587;&#x4EF6;&#x4E86;&#x3002;</p><p>&#x4FD7;&#x8BDD;&#x8BF4;&#xFF0C;&#x5728;js&#x91CC;&#x9762;&#x4E00;&#x5207;&#x7686;&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E48;vue&#x91CC;&#x9762;&#xFF0C;&#x5219;&#x662F;&#x4E00;&#x5207;&#x7686;&#x7EC4;&#x4EF6;&#xFF0C;&#x80FD;&#x7528;&#x7EC4;&#x4EF6;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x7EC8;&#x5C06;&#x88AB;&#x7EC4;&#x4EF6;&#x5B9E;&#x73B0;&#x3002;</p><p>&#x8BF4;&#x5230;&#x7EC4;&#x4EF6;&#xFF0C;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x770B;&#x5230;&#x516C;&#x53F8;&#x524D;&#x8F88;&#x5199;&#x7684;&#x7EC4;&#x4EF6;&#x4EE3;&#x7801;&#xFF0C;&#x90FD;&#x662F;&#x4EE5; .vue &#x4E3A;&#x540E;&#x7F00;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x6253;&#x5F00;&#x540E;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x5B83;&#x7684;&#x6574;&#x4F53;&#x7ED3;&#x6784;&#x5206;&#x4E09;&#x5C42;&#xFF0C;&#x5206;&#x522B;&#x5B9A;&#x4E49;&#x4E86;&#x4E09;&#x4E2A; tag&#x6807;&#x7B7E;&#xFF0C;template&#xFF0C;script&#xFF0C;style&#x3002;&#x7136;&#x540E;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;&#x5728;&#x81EA;&#x5DF1;&#x7684;&#x6807;&#x7B7E;&#x91CC;&#x9762;&#x5404;&#x53F8;&#x5176;&#x804C;&#xFF0C;&#x6240;&#x6709;&#x9700;&#x8981;&#x7684;html&#x3001;css&#x3001;javascript&#x90FD;&#x5728;&#x91CC;&#x9762;&#x3002;</p><p>&#x7EC4;&#x4EF6;&#x770B;&#x5B8C;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x79FB;&#x6B65;&#x5230;webpack&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;webpack.config.js&#x6587;&#x4EF6;&#xFF0C;&#x5185;&#x5BB9;&#x5927;&#x6982;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: {
        &apos;index&apos;: &apos;./vue/index/main.js&apos;,
    },
    output: {
        path: &apos;./public/bulid&apos;,
        filename: &apos;[filename].js&apos; // &#x53EF;&#x4EE5;&#x591A;&#x70B9;&#x5207;&#x5165;
    },
    module: {
        loaders: [
            {
              test: /\.vue$/,
              exclude: /node_modules/,
              loader: vue.withLoaders({
                  js: &apos;babel?optional[]=runtime&apos;
              })
            },
            { test: /\.scss$/, loader: &apos;style!css!sass },
            { test: /\.css$/, loader: &quot;style!css&quot; },
            { test: /\.js$/, loader: &apos;babel-loader&apos; }
        ]
    },
    resolve: { // &#x89E3;&#x51B3; npm &#x7684;&#x4F9D;&#x8D56;&#x95EE;&#x9898;
        modulesDirectories: [&apos;node_modules&apos;],
        extensions: [&apos;&apos;, &apos;.js&apos;, &apos;.json&apos;]
    },
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">module.exports</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    entry:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        &apos;index&apos;:</span> <span class="hljs-string">&apos;./vue/index/main.js&apos;</span><span class="hljs-string">,</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    output:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        path:</span> <span class="hljs-string">&apos;./public/bulid&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        filename:</span> <span class="hljs-string">&apos;[filename].js&apos;</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x53EF;&#x4EE5;&#x591A;&#x70B9;&#x5207;&#x5165;</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    module:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        loaders:</span> <span class="hljs-string">[</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">              test:</span> <span class="hljs-string">/\.vue$/,</span>
<span class="hljs-attr">              exclude:</span> <span class="hljs-string">/node_modules/,</span>
<span class="hljs-attr">              loader:</span> <span class="hljs-string">vue.withLoaders({</span>
<span class="hljs-attr">                  js:</span> <span class="hljs-string">&apos;babel?optional[]=runtime&apos;</span>
              <span class="hljs-string">})</span>
            <span class="hljs-string">},</span>
            <span class="hljs-string">{</span> <span class="hljs-attr">test:</span> <span class="hljs-string">/\.scss$/,</span> <span class="hljs-attr">loader:</span> <span class="hljs-string">&apos;style!css!sass },
            { test: /\.css$/, loader: &quot;style!css&quot; },
            { test: /\.js$/, loader: &apos;</span><span class="hljs-string">babel-loader&apos;</span> <span class="hljs-string">}</span>
        <span class="hljs-string">]</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    resolve:</span> <span class="hljs-string">{</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x89E3;&#x51B3;</span> <span class="hljs-string">npm</span> <span class="hljs-string">&#x7684;&#x4F9D;&#x8D56;&#x95EE;&#x9898;</span>
<span class="hljs-attr">        modulesDirectories:</span> <span class="hljs-string">[&apos;node_modules&apos;],</span>
<span class="hljs-attr">        extensions:</span> <span class="hljs-string">[&apos;&apos;,</span> <span class="hljs-string">&apos;.js&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;.json&apos;</span><span class="hljs-string">]</span>
    <span class="hljs-string">},</span>
<span class="hljs-string">}</span>
</code></pre><p>&#x6211;&#x5BF9; webpack &#x7684;&#x6700;&#x521D;&#x4FE1;&#x4EF0;&#x5C31;&#x662F;&#xFF0C;&#x5B83;&#x975E;&#x5E38;&#x7684;&#x667A;&#x80FD;&#x5316;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;&#x4E00;&#x5207;&#x7684;&#x8D44;&#x6E90;&#xFF08;&#x5305;&#x62EC;html css javascript image&#xFF09;&#x7528; import &#x548C; require &#x6A21;&#x5757;&#x5316;&#x5F15;&#x5165;&#xFF0C;&#x5E76;&#x5BF9;&#x8D44;&#x6E90;&#x8FDB;&#x884C;&#x9884;&#x5904;&#x7406;&#xFF0C;&#x6700;&#x7EC8;&#x88AB;&#x6253;&#x5305;&#x6210;&#x4E00;&#x4E2A;js&#x6587;&#x4EF6;&#x89E3;&#x91CA;&#x6267;&#x884C;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x60F3;&#x8C08;&#x8C08;vue&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x548C;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x3002;</p><p>&#x6BCF;&#x4E2A; Vue &#x5B9E;&#x4F8B;&#x5728;&#x88AB;&#x521B;&#x5EFA;&#x4E4B;&#x524D;&#x90FD;&#x8981;&#x7ECF;&#x8FC7;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x521D;&#x59CB;&#x5316;&#x8FC7;&#x7A0B;&#x3002;&#x4F8B;&#x5982;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x6570;&#x636E;&#x76D1;&#x542C;&#x3001;&#x7F16;&#x8BD1;&#x6A21;&#x677F;&#x3001;&#x6302;&#x8F7D;&#x5B9E;&#x4F8B;&#x5230; DOM&#x3001;&#x5728;&#x6570;&#x636E;&#x53D8;&#x5316;&#x65F6;&#x66F4;&#x65B0; DOM &#x7B49;&#x3002;<br>&#x8BF4;&#x7684;&#x76F4;&#x767D;&#x4E00;&#x70B9;&#xFF0C;&#x5206;&#x522B;&#x5BF9;&#x5E94;&#x7684;&#x56DB;&#x7EC4;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x5C31;&#x662F;&#xFF1A;</p><blockquote>beforeCreate &#x3001;created&#xFF1B; // &#x521B;&#x5EFA;&#x524D;&#x3001;&#x521B;&#x5EFA;&#x5B8C;&#x6210;<br>beforeMount &#x3001;mounted&#xFF1B;// &#x6302;&#x8F7D;&#x524D;&#x3001;&#x6302;&#x8F7D;&#x5B8C;&#x6210;<br>beforeUpdate &#x3001;updated&#xFF1B; // &#x66F4;&#x65B0;&#x524D;&#x3001;&#x66F4;&#x65B0;&#x5B8C;&#x6210;<br>beforeDestory &#x3001;destoryed&#x3002;// &#x9500;&#x6BC1;&#x524D;&#x3001;&#x9500;&#x6BC1;&#x5B8C;&#x6210;</blockquote><p>&#x8FD9;&#x91CC;&#x95F0;&#x571F;&#x5728;&#x7F51;&#x4E0A;&#x627E;&#x5230;&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Vue&#x751F;&#x547D;&#x5468;&#x671F;&lt;/title&gt;
    &lt;script type=&quot;text/javascript&quot; src=&quot;https://cdn.jsdelivr.net/vue/2.1.3/vue.js&quot;&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id=&quot;app&quot;&gt;
     &lt;p&gt;{{ message }}&lt;/p&gt;
&lt;/div&gt;

&lt;script type=&quot;text/javascript&quot;&gt;
  var app = new Vue({
      el: &apos;#app&apos;,
      data: {
          message : &quot;&#x95F0;&#x571F;&#x5C11;&#x5E74;&quot;
      },
       beforeCreate: function () {
            console.group(&apos;beforeCreate &#x521B;&#x5EFA;&#x524D;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot; , &quot;el     : &quot; + this.$el); //undefined
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); //undefined
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message)
        },
        created: function () {
            console.group(&apos;created &#x521B;&#x5EFA;&#x5B8C;&#x6BD5;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + this.$el); //undefined
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); //&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message); //&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;
        },
        beforeMount: function () {
            console.group(&apos;beforeMount &#x6302;&#x8F7D;&#x524D;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + (this.$el)); //&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;
            console.log(this.$el);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); //&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message); //&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;
        },
        mounted: function () {
            console.group(&apos;mounted &#x6302;&#x8F7D;&#x7ED3;&#x675F;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + this.$el); //&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;
            console.log(this.$el);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); //&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message); //&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;
        },
        beforeUpdate: function () {
            console.group(&apos;beforeUpdate &#x66F4;&#x65B0;&#x524D;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + this.$el);
            console.log(this.$el);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message);
        },
        updated: function () {
            console.group(&apos;updated &#x66F4;&#x65B0;&#x5B8C;&#x6210;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + this.$el);
            console.log(this.$el);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message);
        },
        beforeDestroy: function () {
            console.group(&apos;beforeDestroy &#x9500;&#x6BC1;&#x524D;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + this.$el);
            console.log(this.$el);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message);
        },
        destroyed: function () {
            console.group(&apos;destroyed &#x9500;&#x6BC1;&#x5B8C;&#x6210;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + this.$el);
            console.log(this.$el);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data);
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message)
        }
    })
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Vue&#x751F;&#x547D;&#x5468;&#x671F;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.jsdelivr.net/vue/2.1.3/vue.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" message "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
      <span class="hljs-attr">data</span>: {
          <span class="hljs-attr">message</span> : <span class="hljs-string">&quot;&#x95F0;&#x571F;&#x5C11;&#x5E74;&quot;</span>
      },
       <span class="hljs-attr">beforeCreate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">&apos;beforeCreate &#x521B;&#x5EFA;&#x524D;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span> , <span class="hljs-string">&quot;el     : &quot;</span> + <span class="hljs-keyword">this</span>.$el); <span class="hljs-comment">//undefined</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;data   : &quot;</span> + <span class="hljs-keyword">this</span>.$data); <span class="hljs-comment">//undefined</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;message: &quot;</span> + <span class="hljs-keyword">this</span>.message)
        },
        <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">&apos;created &#x521B;&#x5EFA;&#x5B8C;&#x6BD5;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;el     : &quot;</span> + <span class="hljs-keyword">this</span>.$el); <span class="hljs-comment">//undefined</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;data   : &quot;</span> + <span class="hljs-keyword">this</span>.$data); <span class="hljs-comment">//&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;message: &quot;</span> + <span class="hljs-keyword">this</span>.message); <span class="hljs-comment">//&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;</span>
        },
        <span class="hljs-attr">beforeMount</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">&apos;beforeMount &#x6302;&#x8F7D;&#x524D;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;el     : &quot;</span> + (<span class="hljs-keyword">this</span>.$el)); <span class="hljs-comment">//&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;data   : &quot;</span> + <span class="hljs-keyword">this</span>.$data); <span class="hljs-comment">//&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;message: &quot;</span> + <span class="hljs-keyword">this</span>.message); <span class="hljs-comment">//&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;</span>
        },
        <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">&apos;mounted &#x6302;&#x8F7D;&#x7ED3;&#x675F;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;el     : &quot;</span> + <span class="hljs-keyword">this</span>.$el); <span class="hljs-comment">//&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;data   : &quot;</span> + <span class="hljs-keyword">this</span>.$data); <span class="hljs-comment">//&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;message: &quot;</span> + <span class="hljs-keyword">this</span>.message); <span class="hljs-comment">//&#x5DF2;&#x88AB;&#x521D;&#x59CB;&#x5316;</span>
        },
        <span class="hljs-attr">beforeUpdate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">&apos;beforeUpdate &#x66F4;&#x65B0;&#x524D;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;el     : &quot;</span> + <span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;data   : &quot;</span> + <span class="hljs-keyword">this</span>.$data);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;message: &quot;</span> + <span class="hljs-keyword">this</span>.message);
        },
        <span class="hljs-attr">updated</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">&apos;updated &#x66F4;&#x65B0;&#x5B8C;&#x6210;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;el     : &quot;</span> + <span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;data   : &quot;</span> + <span class="hljs-keyword">this</span>.$data);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;message: &quot;</span> + <span class="hljs-keyword">this</span>.message);
        },
        <span class="hljs-attr">beforeDestroy</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">&apos;beforeDestroy &#x9500;&#x6BC1;&#x524D;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;el     : &quot;</span> + <span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;data   : &quot;</span> + <span class="hljs-keyword">this</span>.$data);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;message: &quot;</span> + <span class="hljs-keyword">this</span>.message);
        },
        <span class="hljs-attr">destroyed</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">&apos;destroyed &#x9500;&#x6BC1;&#x5B8C;&#x6210;&#x72B6;&#x6001; &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&apos;</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;el     : &quot;</span> + <span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;data   : &quot;</span> + <span class="hljs-keyword">this</span>.$data);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%c%s&quot;</span>, <span class="hljs-string">&quot;color:red&quot;</span>,<span class="hljs-string">&quot;message: &quot;</span> + <span class="hljs-keyword">this</span>.message)
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</span></code></pre><p>&#x6700;&#x540E;&#x5728;chrome&#x7684;console&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x6548;&#x679C;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVZso3?w=641&amp;h=651" src="https://static.alili.tech/img/bVZso3?w=641&amp;h=651" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x5728;&#x4E0A;&#x56FE;&#x4E2D;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x5728;beforeMount&#x6302;&#x8F7D;&#x524D;&#xFF0C; $el&#x91CC;&#x9762;&#x8FD8;&#x662F;{{ message }}&#xFF0C;&#x8FD9;&#x5C31;&#x662F;Virtual DOM&#xFF08;&#x865A;&#x62DF;dom&#xFF09;&#x6280;&#x672F;&#x7684;&#x5E94;&#x7528;&#xFF0C;&#x4E0A;&#x6765;&#x4E8C;&#x8BDD;&#x4E0D;&#x8BF4;&#xFF0C;&#x5148;&#x628A;&#x5751;&#x4F4D;&#x5360;&#x4E86;&#xFF0C;&#x7B49;&#x540E;&#x9762;mounted&#x6302;&#x8F7D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x518D;&#x628A;&#x503C;&#x6E32;&#x67D3;&#x8FDB;&#x53BB;&#x3002;</p><p>&#x6700;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x804A;&#x804A;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#xFF0C;&#x5E76;&#x884C;&#x5F00;&#x53D1;&#x7684;&#x4E8B;&#x60C5;&#x3002;</p><p>&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#x5F00;&#x53D1;&#x524D;&#xFF0C;&#x9700;&#x8981;&#x548C;&#x540E;&#x7AEF;&#x540C;&#x5B66;&#x5B9A;&#x4E49;&#x597D;&#x63A5;&#x53E3;&#x4FE1;&#x606F;&#xFF08;&#x8BF7;&#x6C42;&#x5730;&#x5740;&#xFF0C;&#x53C2;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x4FE1;&#x606F;&#x7B49;&#xFF09;&#xFF0C;&#x524D;&#x7AEF;&#x901A;&#x8FC7; mock &#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5373;&#x53EF;&#x5F00;&#x59CB;&#x7F16;&#x7801;&#xFF0C;&#x65E0;&#x9700;&#x7B49;&#x5F85;&#x540E;&#x7AEF;&#x63A5;&#x53E3;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x51C6;&#x5907;&#x5C31;&#x7EEA;&#xFF08;&#x662F;&#x4E0D;&#x662F;&#x611F;&#x89C9;&#x524D;&#x7AEF;&#x5E72;&#x7684;&#x6D3B;&#x513F;&#x8D8A;&#x6765;&#x8D8A;&#x91CD;&#xFF09;&#x3002;</p><p>&#x5728;&#x5B9E;&#x6218;&#x6F14;&#x7EC3;&#x8FC7;&#x540E;&#xFF0C;Vue&#x7ED9;&#x6211;&#x7684;&#x611F;&#x89C9;&#x5C31;&#x4E24;&#x4E2A;&#x5B57;&#xFF1A;&#x7701;&#x5FC3;&#x3002;&#x6240;&#x6709;&#x7684;&#x64CD;&#x4F5C;&#x5173;&#x6CE8;&#x70B9;&#x90FD;&#x5728;data&#x4E0A;&#x9762;&#x3002;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5199;&#x597D;data &#x5269;&#x4E0B;&#x7684;&#x4E8B;&#x60C5;&#x5C31;&#x662F; &#x901A;&#x8FC7;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x6765;&#x4EA4;&#x4E92;data&#xFF0C;UI&#x5C42;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x6539;&#x53D8;data&#xFF0C;&#x5728;&#x7EC4;&#x4EF6;&#x95F4;&#x4F20;&#x9012;data&#x3002;</p><h2 id="articleHeader1">&#x540E;&#x8BB0;</h2><p>&#x5728;&#x8FD9;&#x4E2A;MVVM&#x6A2A;&#x884C;&#x7684;&#x65F6;&#x4EE3;&#xFF0C;&#x6211;&#x5DF2;&#x7ECF;&#x6E10;&#x6E10;&#x7684;&#x5FD8;&#x5374;&#x4E86;jQuery&#x7684;&#x5B58;&#x5728;&#x3002;&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x8FD8;&#x6CA1;&#x6709;&#x7ED3;&#x675F;&#xFF0C;&#x4E0B;&#x7BC7;&#xFF0C;&#x4E5F;&#x53EF;&#x80FD;&#x662F;&#x7EC8;&#x7ED3;&#x7BC7;&#xFF0C;&#x5373;&#x5C06;&#x6765;&#x88AD;&#xFF01;</p><blockquote>&#x4F5C;&#x8005;&#xFF1A;&#x95F0;&#x571F;&#x5C11;&#x5E74;<br>&#x94FE;&#x63A5;&#xFF1A;<a href="https://juejin.im/post/5a1f60d56fb9a045132a7724" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/5a1f60...</a><br>&#x6765;&#x6E90;&#xFF1A;&#x6398;&#x91D1;<br>&#x8457;&#x4F5C;&#x6743;&#x5F52;&#x4F5C;&#x8005;&#x6240;&#x6709;&#x3002;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x8054;&#x7CFB;&#x4F5C;&#x8005;&#x83B7;&#x5F97;&#x6388;&#x6743;&#xFF0C;&#x975E;&#x5546;&#x4E1A;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;&#x3002;</blockquote><p>&#x60F3;&#x4E86;&#x89E3;&#x6211;&#x7684;&#x66F4;&#x591A;&#x52A8;&#x6001;&#xFF1F;&#x6B22;&#x8FCE;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;<strong>&#x95F0;&#x571F;&#x5927;&#x53D4;</strong></p><p><span class="img-wrap"><img data-src="/img/bVZjMq?w=430&amp;h=430" src="https://static.alili.tech/img/bVZjMq?w=430&amp;h=430" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在没有DOM操作的日子里，我是怎么熬过来的（中）

## 原文链接
[https://segmentfault.com/a/1190000012224953](https://segmentfault.com/a/1190000012224953)

