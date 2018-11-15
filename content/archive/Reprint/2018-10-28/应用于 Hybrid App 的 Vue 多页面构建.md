---
title: 应用于 Hybrid App 的 Vue 多页面构建
hidden: true
categories: reprint
slug: b080bd59
date: 2018-10-28 02:30:09
---

{{< raw >}}
<p>&#x672C;&#x6587;&#x4ECB;&#x7ECD;&#x4E00;&#x6B3E;&#x57FA;&#x4E8E; Vue &#x7684;&#x4F7F; App &#x652F;&#x6301;&#x79BB;&#x7EBF;&#x7F13;&#x5B58; Web &#x8D44;&#x6E90;&#x7684;&#x6DF7;&#x5408;&#x5F00;&#x53D1;&#x6846;&#x67B6;&#x3002;&#x672C;&#x4EBA;&#x5C0F;&#x767D;&#x4E00;&#x679A;&#xFF0C;&#x8BF7;&#x5C06;&#x5B83;&#x89C6;&#x4F5C;&#x4E00;&#x4EFD;&#x6211;&#x7684;&#x5B66;&#x4E60;&#x603B;&#x7ED3;&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x795E;&#x4EEC;&#x8D50;&#x6559;&#x3002;&#x672C;&#x6587;&#x591A;&#x9610;&#x8FF0;&#x601D;&#x8DEF;&#xFF0C;&#x5B9E;&#x73B0;&#x7EC6;&#x8282;&#x8BF7;&#x9605;&#x8BFB;<a href="https://github.com/sunmengyuan/ballade" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;</a>&#x3002;</p><h4>&#x4E3A;&#x4F55;&#x9009;&#x62E9;&#x6DF7;&#x5408;&#x5F00;&#x53D1;&#xFF1F;</h4><ul><li>&#x9AD8;&#x6548;&#x7387;&#x754C;&#x9762;&#x5F00;&#x53D1;&#xFF1A;HTML + CSS + JavaScript &#x88AB;&#x8BC1;&#x5B9E;&#x5177;&#x5907;&#x6781;&#x9AD8;&#x7684;&#x754C;&#x9762;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;</li><li>&#x8DE8;&#x5E73;&#x53F0;&#xFF1A;&#x8F83;&#x7EDF;&#x4E00;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x5185;&#x6838;&#x6807;&#x51C6;&#xFF0C;&#x4F7F; H5 &#x9875;&#x9762;&#x5728; IOS&#x3001;Android &#x5171;&#x4EAB;&#x540C;&#x5957;&#x4EE3;&#x7801;&#x3002;&#x4F7F;&#x7528; Native &#x5F00;&#x53D1;&#x4E00;&#x529F;&#x80FD;&#x9700; IOS&#x3001;Android &#x7814;&#x53D1;&#x5404;&#x4E00;&#x679A;&#xFF0C;&#x800C;&#x4F7F;&#x7528; H5 &#x4E00;&#x679A;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#x8DB3;&#x77E3;&#x3002;&#x4F46;&#x6DF7;&#x5408; App &#x5E76;&#x975E; Native &#x8D8A;&#x5C11;&#x8D8A;&#x4F73;&#xFF0C;&#x6027;&#x80FD;&#x8981;&#x6C42;&#x8F83;&#x9AD8;&#x7684;&#x4ECD;&#x9700;&#x52B3; Native &#x5927;&#x9A7E;...&#x5206;&#x5DE5;&#x9700;&#x660E;&#x786E;&#xFF0C;&#x4E0D;&#x53EF;&#x539A;&#x6B64;&#x8584;&#x5F7C;&#x3002;</li><li>&#x70ED;&#x66F4;&#x65B0;&#xFF1A;&#x4E0D;&#x4F9D;&#x8D56;&#x4E8E;&#x53D1;&#x5E03;&#x6E20;&#x9053;&#x81EA;&#x4E3B;&#x66F4;&#x65B0;&#x5E94;&#x7528;&#x3002;Native &#x4FEE;&#x590D;&#x7EBF;&#x4E0A; Bug &#x9700;&#x53D1;&#x5E03;&#x65B0;&#x7248;&#x672C;&#xFF0C;&#x7528;&#x6237;&#x672A;&#x5347;&#x7EA7; App &#x8BE5; Bug &#x5C06;&#x4E00;&#x76F4;&#x5448;&#x73B0;&#x3002;&#x800C;&#x4FEE;&#x590D; H5 &#x53EA;&#x9700;&#x5C06; Fixbug &#x7684;&#x4EE3;&#x7801;&#x63A8;&#x81F3;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x4EFB;&#x4E00;&#x7248;&#x672C; App &#x4FBF;&#x53EF;&#x540C;&#x6B65;&#x66F4;&#x65B0;&#x5BF9;&#x5E94;&#x529F;&#x80FD;&#x65E0;&#x9700;&#x5347;&#x7EA7;&#x3002;</li></ul><h4>&#x4E3A;&#x4F55;&#x79BB;&#x7EBF;&#x7F13;&#x5B58; Web &#x8D44;&#x6E90;&#xFF1F;</h4><p>&#x76F8;&#x6BD4;&#x4E8E;&#x4ECE;&#x8FDC;&#x7A0B;&#x670D;&#x52A1;&#x5668;&#x8BF7;&#x6C42;&#x52A0;&#x8F7D; Web &#x8D44;&#x6E90;&#xFF0C;App &#x4F18;&#x5148;&#x52A0;&#x8F7D;&#x672C;&#x5730;&#x9884;&#x7F6E;&#x8D44;&#x6E90;&#xFF0C;&#x53EF;&#x63D0;&#x5347;&#x9875;&#x9762;&#x54CD;&#x5E94;&#x901F;&#x5EA6;&#xFF0C;&#x8282;&#x7701;&#x7528;&#x6237;&#x6D41;&#x91CF;&#x3002;</p><p>&#x95EE;&#x9898;&#x6765;&#x4E86;...&#x672C;&#x5730;&#x9884;&#x7F6E;&#x7684; Web &#x8D44;&#x6E90;&#x4E5F;&#x968F; App &#x5B89;&#x88C5;&#x5305;&#x4E00;&#x8D77;&#x6210;&#x4E3A;&#x6CFC;&#x51FA;&#x53BB;&#x7684;&#x6C34;&#xFF0C;&#x4FEE;&#x590D; H5 &#x7EBF;&#x4E0A; Bug &#x4E5F;&#x9700;&#x53D1;&#x7248;&#x4E86;&#xFF1F;&#x4E22;&#x897F;&#x74DC;&#x6361;&#x829D;&#x9EBB;&#x7684;&#x4E8B;&#x5B9A;&#x4E0D;&#x53EF;&#x505A;&#xFF01;&#x8BF7;&#x6CE8;&#x610F;&#x201C;&#x4F18;&#x5148;&#x52A0;&#x8F7D;&#x672C;&#x5730;&#x9884;&#x7F6E;&#x8D44;&#x6E90;&#x201D;&#xFF0C;&#x4F46;&#x68C0;&#x6D4B;&#x5230;&#x66F4;&#x65B0;&#x65F6;&#x52A0;&#x8F7D;&#x8FDC;&#x7A0B;&#x6700;&#x65B0;&#x8D44;&#x6E90;&#xFF0C;&#x5982;&#x4F55;&#x68C0;&#x6D4B;&#x66F4;&#x65B0;&#x6211;&#x7A0D;&#x540E;&#x9610;&#x660E;&#x3002;</p><h4>&#x5BF9;&#x6211;&#x53F8;&#x524D;&#x7AEF;&#x56E2;&#x961F;&#x7684;&#x610F;&#x4E49;</h4><ul><li>&#x6280;&#x672F;&#x6808;&#x7531; Jinja + jQuery + Require + Gulp &#x8FC1;&#x79FB;&#x81F3; Vue + Webpack + Gulp + Sass&#xFF0C;&#x62E5;&#x62B1; Vue&#xFF01;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000013881402?w=635&amp;h=200" src="https://static.alili.tech/img/remote/1460000013881402?w=635&amp;h=200" alt="" title="" style="cursor:pointer;display:inline"></span></p><ul><li>&#x5B9E;&#x73B0;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#xFF1A;&#x539F; <a href="http://docs.jinkan.org/docs/jinja2/templates.html" rel="nofollow noreferrer" target="_blank">Jinja</a> &#x4E3A; Python &#x6A21;&#x677F;&#x5F15;&#x64CE;&#xFF0C;&#x524D;&#x7AEF;&#x4EE3;&#x7801;&#x7684;&#x8FD0;&#x4F5C;&#x4F9D;&#x8D56;&#x4E8E;&#x670D;&#x52A1;&#x7AEF;&#xFF0C;&#x670D;&#x52A1;&#x7AEF;&#x5F02;&#x5E38;&#x7B49;&#x5F85;&#x73AF;&#x5883;&#x7EF4;&#x4FEE;&#x4E25;&#x91CD;&#x5F71;&#x54CD;&#x524D;&#x7AEF;&#x5DE5;&#x4F5C;&#x8FDB;&#x5EA6;&#x3002;&#x5206;&#x79BB;&#x540E;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x6302;&#x4E86;&#x6211;&#x4EEC;&#x6109;&#x5FEB;&#x7684;&#x5F00;&#x542F; Mock Server &#x7EE7;&#x7EED;&#x642C;&#x7816;&#x4FBF;&#x662F;&#x3002;</li><li>App &#x4F18;&#x5148;&#x52A0;&#x8F7D;&#x672C;&#x5730;&#x9884;&#x7F6E; Web &#x8D44;&#x6E90;&#xFF0C;&#x53EF;&#x63D0;&#x5347; H5 &#x9875;&#x9762;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;&#x3002;</li></ul><h4>&#x5F0A;&#x7AEF;</h4><ul><li>&#x6280;&#x672F;&#x91CD;&#x6784;&#x672C;&#x8EAB;&#x5177;&#x5907;&#x98CE;&#x9669;&#x6027;&#x3002;</li><li>&#x589E;&#x52A0;&#x56E2;&#x961F;&#x5B66;&#x4E60;&#x6210;&#x672C;&#x3002;</li><li>&#x524D;&#x7AEF;&#x6846;&#x67B6;&#x901A;&#x8FC7; JS &#x6E32;&#x67D3; HTML &#x5BF9; SEO &#x4E0D;&#x53CB;&#x597D;&#x3002;&#x4F46;&#x4F60;&#x53EF;&#x9009;&#x62E9;&#x4F7F;&#x7528; <a href="https://ssr.vuejs.org/zh/" rel="nofollow noreferrer" target="_blank">Vue 2.2 &#x7684;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF08;SSR&#xFF09;</a>&#x3002;&#x589E;&#x6DFB; Node &#x5C42;&#x9664;&#x5B9E;&#x73B0; SSR&#xFF0C;&#x80FD;&#x505A;&#x7684;&#x4E8B;&#x8FD8;&#x5F88;&#x591A;...</li></ul><hr><p>&#x8FDB;&#x5165;&#x6B63;&#x9898;~</p><h3 id="articleHeader0">&#x6DF7;&#x5408;&#x5F00;&#x53D1;&#x6846;&#x67B6;&#x8FD0;&#x4F5C;&#x673A;&#x5236;</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000013881403?w=442&amp;h=405" src="https://static.alili.tech/img/remote/1460000013881403?w=442&amp;h=405" alt="" title="" style="cursor:pointer"></span></p><p>&#x5C06; Web &#x8D44;&#x6E90;&#x6587;&#x4EF6;&#x6253;&#x5305;&#x81F3; dist/&#xFF08;&#x542B; routes.json &#x53CA; N &#x591A; .html&#xFF09;&#x5E76;&#x538B;&#x7F29;&#x4E3A; dist.zip&#xFF0C;&#x56FE;&#x7247;&#x8D44;&#x6E90;&#x5355;&#x72EC;&#x6253;&#x5305;&#x81F3; assets/&#xFF0C;&#x4E00;&#x540C;&#x4E0A;&#x4F20;&#x81F3; CDN&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000013881404?w=500&amp;h=616" src="https://static.alili.tech/img/remote/1460000013881404?w=500&amp;h=616" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>App &#x5185;&#x9884;&#x7F6E; dist/ &#x4E0B;&#x5168;&#x90E8;&#x8D44;&#x6E90;&#xFF08;&#x53D1;&#x7248;&#x65F6;&#x4EC5;&#x4E0B;&#x8F7D; dist.zip&#xFF0C;&#x5B89;&#x88C5; App &#x65F6;&#x89E3;&#x538B;&#xFF09;&#xFF0C;&#x5728;&#x62E6;&#x622A;&#x5E76;&#x89E3;&#x6790; URL &#x540E;&#xFF0C;&#x901A;&#x8FC7; routes.json &#x67E5;&#x627E;&#x5E76;&#x52A0;&#x8F7D;&#x672C;&#x5730; .html &#x9875;&#x9762;&#x3002;</p><p>routes.json &#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;items&quot;: [
        {
            &quot;remote_file&quot;: &quot;http://p2znmi5xx.bkt.clouddn.com/dist/demo/Demo-13700fc663.html&quot;,
            &quot;uri&quot;: &quot;https://backend.igengmei.com/demo[/]?.*&quot;
        },
        {
            &quot;remote_file&quot;: &quot;http://p2znmi5xx.bkt.clouddn.com/dist/demo/Album-a757d93443.html&quot;,
            &quot;uri&quot;: &quot;https://backend.igengmei.com/album[/]?.*&quot;
        },
        {
            &quot;remote_file&quot;: &quot;http://p2znmi5xx.bkt.clouddn.com/dist/post/ArticleDetail-d5c43ffc46.html&quot;,
            &quot;uri&quot;: &quot;https://backend.igengmei.com/article/detail[/]?.*&quot;
        }
    ],
    &quot;deploy_time&quot;: &quot;Fri Mar 16 2018 15:27:57 GMT+0800 (CST)&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">&quot;items&quot;</span>: [
        {
            <span class="hljs-attr">&quot;remote_file&quot;</span>: <span class="hljs-string">&quot;http://p2znmi5xx.bkt.clouddn.com/dist/demo/Demo-13700fc663.html&quot;</span>,
            <span class="hljs-attr">&quot;uri&quot;</span>: <span class="hljs-string">&quot;https://backend.igengmei.com/demo[/]?.*&quot;</span>
        },
        {
            <span class="hljs-attr">&quot;remote_file&quot;</span>: <span class="hljs-string">&quot;http://p2znmi5xx.bkt.clouddn.com/dist/demo/Album-a757d93443.html&quot;</span>,
            <span class="hljs-attr">&quot;uri&quot;</span>: <span class="hljs-string">&quot;https://backend.igengmei.com/album[/]?.*&quot;</span>
        },
        {
            <span class="hljs-attr">&quot;remote_file&quot;</span>: <span class="hljs-string">&quot;http://p2znmi5xx.bkt.clouddn.com/dist/post/ArticleDetail-d5c43ffc46.html&quot;</span>,
            <span class="hljs-attr">&quot;uri&quot;</span>: <span class="hljs-string">&quot;https://backend.igengmei.com/article/detail[/]?.*&quot;</span>
        }
    ],
    <span class="hljs-attr">&quot;deploy_time&quot;</span>: <span class="hljs-string">&quot;Fri Mar 16 2018 15:27:57 GMT+0800 (CST)&quot;</span>
}</code></pre><p>&#x6B20;&#x4F60;&#x4E00;&#x4E2A;&#x56DE;&#x7B54;~</p><blockquote>&#x8BF7;&#x6CE8;&#x610F;&#x201C;&#x4F18;&#x5148;&#x52A0;&#x8F7D;&#x672C;&#x5730;&#x9884;&#x7F6E;&#x8D44;&#x6E90;&#x201D;&#xFF0C;&#x4F46;&#x68C0;&#x6D4B;&#x5230;&#x66F4;&#x65B0;&#x65F6;&#x52A0;&#x8F7D;&#x8FDC;&#x7A0B;&#x6700;&#x65B0;&#x8D44;&#x6E90;&#xFF0C;&#x5982;&#x4F55;&#x68C0;&#x6D4B;&#x66F4;&#x65B0;&#x6211;&#x7A0D;&#x540E;&#x9610;&#x660E;&#x3002;</blockquote><p>&#x68C0;&#x6D4B; .html &#x6587;&#x4EF6;&#x66F4;&#x65B0;&#x7684;&#x6865;&#x6881;&#x4FBF;&#x662F; routes.json&#x3002;&#x6BCF;&#x542F;&#x52A8; App &#x4ECE; CDN &#x9759;&#x9ED8;&#x66F4;&#x65B0; routes.json &#x4E00;&#x6B21;&#xFF08;CDN &#x7F13;&#x5B58;&#x4F1A;&#x5BFC;&#x81F4; routes.json &#x65E0;&#x6CD5;&#x53CA;&#x65F6;&#x66F4;&#x65B0;&#xFF0C;&#x4E0B;&#x8F7D;&#x8DEF;&#x7531;&#x8868;&#x8BF7;&#x6DFB;&#x52A0;&#x65F6;&#x95F4;&#x6233;&#x53C2;&#x6570;&#x5F3A;&#x5236;&#x66F4;&#x65B0;&#xFF09;&#xFF0C;&#x4EFB;&#x4E00;&#x8D44;&#x6E90;&#x66F4;&#x65B0;&#x5747;&#x540C;&#x6B65;&#x81F3; routes.json &#x5E76;&#x4E0A;&#x4F20; CDN&#x3002;</p><p>&#x6807;&#x8BB0;&#x66F4;&#x65B0;&#x7684;&#x65B9;&#x5F0F;&#x5219;&#x662F;&#x4E3A; .html &#x6253; Hash&#xFF08;MD5&#xFF09;&#x6233;&#xFF0C;&#x4E8E; App &#x800C;&#x8A00;&#x4E0D;&#x540C; Hash &#x540E;&#x7F00;&#x7684; .html &#x4E3A;&#x4E0D;&#x540C;&#x6587;&#x4EF6;&#x3002;App &#x6839;&#x636E;&#x8DEF;&#x7531;&#x8868; remote_file &#x67E5;&#x5BFB;&#x672C;&#x5730; .html&#xFF0C;&#x82E5;&#x8BE5; .html &#x4E0D;&#x5B58;&#x5728;&#x5219;&#x76F4;&#x63A5;&#x52A0;&#x8F7D;&#x8FDC;&#x7A0B;&#x8D44;&#x6E90;&#x540C;&#x65F6;&#x9759;&#x9ED8;&#x4E0B;&#x8F7D;&#x66F4;&#x65B0;&#x3002;</p><p>&#x6CE8;&#xFF1A;&#x7531;&#x4E8E; js&#x3001;css &#x811A;&#x672C;&#x5747;&#x88AB;&#x5185;&#x8054;&#x81F3;&#x5BF9;&#x5E94; .html&#xFF0C;App &#x4EC5;&#x9700;&#x76D1;&#x542C; .html &#x6587;&#x4EF6;&#x7684;&#x53D8;&#x5316;&#x3002;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x63D0;&#x53D6;&#x516C;&#x7528;&#x811A;&#x672C;&#x5E76;&#x4E3A;&#x4E4B;&#x6253; Hash &#x6233;&#xFF0C;&#x5C06;&#x8BE5;&#x8D44;&#x6E90;&#x7684;&#x53D8;&#x5316;&#x8BB0;&#x5F55;&#x81F3;&#x4E00;&#x5F20;&#x8868;&#x4F9B; App &#x76D1;&#x542C;&#x3002;&#x5E38;&#x5E74;&#x4E0D;&#x66F4;&#x65B0;&#x7684;&#x516C;&#x7528;&#x811A;&#x672C;&#xFF0C;&#x7F13;&#x5B58;&#x5728; App &#x5185;&#x4E0D;&#x968F; .html &#x4E00;&#x540C;&#x52A0;&#x8F7D;&#x4E5F;&#x53EF;&#x63D0;&#x5347;&#x9875;&#x9762;&#x54CD;&#x5E94;&#x901F;&#x5EA6;&#x3002;</p><p>&#x7EFC;&#x4E0A;&#xFF0C;Web &#x8D44;&#x6E90;&#x867D;&#x88AB;&#x9884;&#x7F6E;&#x4E8E; App&#xFF0C;&#x4F46;&#x5176; Fixbug &#x7EA7;&#x522B;&#x7684;&#x66F4;&#x65B0;&#x4E0D;&#x5FC5;&#x8D70;&#x53D1;&#x7248;&#x8FD9;&#x6761;&#x8DEF;&#x3002;</p><p>&#x4E3A;&#x4F55;&#x56FE;&#x7247;&#x8D44;&#x6E90;&#x5355;&#x72EC;&#x6253;&#x5305;&#x81F3; assets/&#xFF0C;&#x5148;&#x6B20;&#x7740;~</p><hr><h3 id="articleHeader1">Web &#x6846;&#x67B6;&#x8BBE;&#x8BA1;</h3><p>Web &#x6846;&#x67B6;&#x8BBE;&#x8BA1;&#x56F4;&#x7ED5;&#xFF1A;</p><ul><li>&#x51CF;&#x5C11;&#x65E0;&#x7528;&#x8D44;&#x6E90;&#x53CA;&#x5197;&#x4F59;&#x8D44;&#x6E90;</li><li>&#x51CF;&#x5C0F;&#x4F9D;&#x8D56;&#x6A21;&#x5757;&#x5BF9; Hash &#x7684;&#x5F71;&#x54CD;</li><li>&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x6A21;&#x5F0F;&#x5C3D;&#x91CF;&#x7B80;&#x6613;</li></ul><h4>&#x51CF;&#x5C11;&#x65E0;&#x7528;&#x8D44;&#x6E90;&#x53CA;&#x5197;&#x4F59;&#x8D44;&#x6E90;</h4><p>&#x673A;&#x667A;&#x7684;&#x4F60;&#x53D1;&#x73B0;&#x4F7F;&#x7528; Vue &#x811A;&#x624B;&#x67B6; build &#x540E;&#x4EA7;&#x751F;&#x5355; .html&#x3001;&#x5355; .js&#x3001;&#x5355; .css&#xFF08;&#x6240;&#x6709;&#x9875;&#x9762;&#x8D44;&#x6E90;&#x6253;&#x5305;&#x5728;&#x4E00;&#x5768;&#x5566;&#xFF09;&#xFF0C;&#x800C;&#x6211;&#x6240;&#x4E3E;&#x4F8B;&#x7684;&#x5374;&#x662F;&#x591A; .html&#x3002;&#x5982;&#x4F55;&#x5B9E;&#x73B0; Vue &#x591A;&#x9875;&#x9762;&#x62C6;&#x5206;&#x6211;&#x4F1A;&#x7EC6;&#x8BB2;&#xFF0C;&#x5148;&#x8BA8;&#x8BBA;&#x62C6;&#x5206;&#x591A;&#x9875;&#x9762;&#x7684;&#x610F;&#x4E49;&#x5427;&#xFF1A;&#x201C;&#x5FEB;&#x201D; + &#x201C;&#x8282;&#x7EA6;&#x201D;&#xFF01;</p><p>&#x5047;&#x5B9A;&#x6211;&#x7AD9;&#x542B;&#x9875;&#x9762; A&#x3001;B&#x3001;C&#xFF0C;&#x7528;&#x6237;&#x4EC5;&#x8BBF;&#x95EE; A &#x4F46;&#x5355;&#x9875;&#x5E94;&#x7528;&#x5374;&#x5C06; A&#x3001;B&#x3001;C &#x6240;&#x4F9D;&#x8D56;&#x7684;&#x5168;&#x90E8;&#x8D44;&#x6E90;&#x52A0;&#x8F7D;&#x3002;B&#x3001;C &#x4E8E;&#x7528;&#x6237;&#x800C;&#x8A00;&#x662F;&#x65E0;&#x7528;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x5077;&#x5077;&#x5403;&#x7528;&#x6237;&#x6D41;&#x91CF;&#x4E0B;&#x8F7D;&#x65E0;&#x7528;&#x8D44;&#x6E90;&#x5F88;&#x4E0D;&#x539A;&#x9053;&#x3002;</p><p>&#x62C6;&#x5206;&#x8D44;&#x6E90;&#x53EF;&#x51CF;&#x5C0F; .html &#x4F53;&#x79EF;&#x81EA;&#x7136;&#x63D0;&#x5347;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;&#xFF0C;&#x4E14; App &#x4F18;&#x5148;&#x8BBF;&#x95EE;&#x672C;&#x5730; .html &#x514D;&#x53BB;&#x8FDC;&#x7A0B;&#x8BF7;&#x6C42;&#x66F4;&#x662F;&#x5FEB;&#x4E0A;&#x52A0;&#x5FEB;&#x3002;</p><p>&#x65E0;&#x7528;&#x8D44;&#x6E90;&#x9700;&#x4E22;&#x5F03;&#xFF0C;&#x516C;&#x5171;&#x8D44;&#x6E90;&#x4E5F;&#x9700;&#x63D0;&#x53D6;&#x3002;&#x5047;&#x5B9A;&#x9875;&#x9762; A&#x3001;B &#x5747;&#x5F15;&#x7528;&#x8D44;&#x6E90; C&#xFF0C;&#x8D44;&#x6E90; C &#x4FBF;&#x53EF;&#x5355;&#x72EC;&#x63D0;&#x53D6;&#x3002;&#x53EF;&#x4F7F;&#x7528; <a href="https://doc.webpack-china.org/plugins/commons-chunk-plugin" rel="nofollow noreferrer" target="_blank">CommonsChunkPlugin</a> &#x8FBE;&#x6210;&#x5BF9;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#xFF0C;&#x516C;&#x7528;&#x7EC4;&#x4EF6;&#x7684;&#x62BD;&#x79BB;&#x3002;&#x4E00;&#x63D0;&#x53D6;&#x9879;&#x76EE;&#x6240;&#x5E94;&#x7528; node_module &#x811A;&#x672C;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.CommonsChunkPlugin({
    name: &apos;vendor&apos;,
    minChunks: function (module) {
        return (
            module.resource &amp;&amp;
            /\.js$/.test(module.resource) &amp;&amp;
            module.resource.indexOf(
                path.join(__dirname, &apos;../node_modules&apos;)
            ) === 0
        )
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;vendor&apos;</span>,
    <span class="hljs-attr">minChunks</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module</span>) </span>{
        <span class="hljs-keyword">return</span> (
            <span class="hljs-built_in">module</span>.resource &amp;&amp;
            <span class="hljs-regexp">/\.js$/</span>.test(<span class="hljs-built_in">module</span>.resource) &amp;&amp;
            <span class="hljs-built_in">module</span>.resource.indexOf(
                path.join(__dirname, <span class="hljs-string">&apos;../node_modules&apos;</span>)
            ) === <span class="hljs-number">0</span>
        )
    }
})</code></pre><p>&#x9879;&#x76EE;&#x4E2D;&#x6240;&#x5E94;&#x7528;&#x5230;&#x7684; node_module &#x5C06;&#x7EDF;&#x4E00;&#x6253;&#x5305;&#x81F3; vendor.js&#x3002;&#x516C;&#x7528;&#x811A;&#x672C;&#x4E5F;&#x9700;&#x9884;&#x7F6E;&#xFF0C;&#x4E5F;&#x9700;&#x68C0;&#x6D4B;&#x66F4;&#x65B0;&#xFF0C;&#x82E5;&#x8BA4;&#x4E3A;&#x76D1;&#x542C;&#x4F17;&#x591A;&#x8D44;&#x6E90;&#x8F83;&#x9EBB;&#x70E6;&#x5C06;&#x811A;&#x672C;&#x5185;&#x8054;&#x81F3; .html &#x4E5F;&#x53EF;&#xFF0C;&#x4F46;&#x6211;&#x4E0D;&#x63D0;&#x5021;&#x8FD9;&#x6837;&#x505A;&#xFF08;&#x5931;&#x53BB;&#x4E86;&#x53BB;&#x5197;&#x4F59;&#x7684;&#x610F;&#x4E49;&#xFF09;&#x3002;&#x9884;&#x7F6E;&#x7684;&#x516C;&#x7528;&#x811A;&#x672C;&#x62F7;&#x8D1D;&#x5230;&#x54EA;&#x91CC;&#xFF1F;&#x62F7;&#x8D1D;&#x81F3;&#x624B;&#x673A;&#x5185;&#x5B58;&#x7A7A;&#x95F4;&#x4E0D;&#x591F;&#x600E;&#x4E48;&#x7834;&#xFF0C;&#x62F7;&#x8D1D;&#x81F3;&#x5B58;&#x50A8;&#x5361;&#x88AB;&#x7528;&#x6237;&#x8BEF;&#x5220;&#x600E;&#x4E48;&#x7834;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x540C;&#x5B66;&#x4E3A;&#x6B64;&#x5F88;&#x7EA0;&#x7ED3;...emmm</p><p>vendor.js &#x542B;&#x6240;&#x6709;&#x9875;&#x9762;&#x4F9D;&#x8D56;&#x5230;&#x7684; node_module&#x3002;&#x5047;&#x5B9A;&#x9875;&#x9762; A &#x4F7F;&#x7528;&#x4E86; Swiper &#x800C;&#x5176;&#x5B83;&#x9875;&#x9762;&#x672A;&#x5F15;&#x7528;&#x5B83;&#xFF0C;vendor.js &#x4E2D;&#x7684; Swiper &#x76F8;&#x5173;&#x4EE3;&#x7801;&#x4FBF;&#x5E94;&#x4EC5;&#x6253;&#x5305;&#x81F3;&#x9875;&#x9762; A&#xFF0C;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#xFF1F;</p><ul><li>&#x751F;&#x6210; vendor.js &#x65F6;&#x8FC7;&#x6EE4; Swiper &#x5E76;&#x5C06;&#x5176;&#x5355;&#x72EC;&#x6253;&#x5305;&#xFF0C;node_modules &#x4ECD;&#x542B; Swiper&#x3002;</li><li>&#x5C06; Swiper &#x4ECE; node_modules &#x79FB;&#x52A8;&#x81F3;&#x5176;&#x5B83;&#x8DEF;&#x5F84;&#xFF0C;&#x5F15;&#x7528;&#x65F6;&#x4F7F;&#x7528;&#x8FC1;&#x79FB;&#x540E;&#x7684;&#x8DEF;&#x5F84;&#x3002;</li></ul><p>&#x5F15;&#x5165; Sass &#x4E5F;&#x53EF;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x7684;&#x53BB;&#x9664;&#x65E0;&#x7528;&#x4EE3;&#x7801;&#xFF1A;</p><blockquote>&#x4F7F;&#x7528; @mixin&#x3001;% &#x5B9A;&#x4E49;&#x7684;&#x901A;&#x7528;&#x6837;&#x5F0F;&#x672A;&#x88AB;&#x7EE7;&#x627F;&#x4E0D;&#x4F1A;&#x88AB;&#x89E3;&#x6790;&#x4EA7;&#x751F;&#x76F8;&#x5E94;&#x7684; css&#x3002;</blockquote><p>&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#x7684;&#x540C;&#x5B66;&#x8BF7;&#x7814;&#x8BFB; <a href="http://sass-lang.com/" rel="nofollow noreferrer" target="_blank">Sass: Syntactically Awesome Style Sheets</a>&#x3002;</p><h4>&#x51CF;&#x5C0F;&#x4F9D;&#x8D56;&#x6A21;&#x5757;&#x5BF9; Hash &#x7684;&#x5F71;&#x54CD;</h4><p>&#x7531;&#x4E8E; App &#x9700;&#x76D1;&#x542C;&#x4F17; .html &#x53D8;&#x5316;&#x5E76;&#x5B9E;&#x65F6;&#x66F4;&#x65B0;&#x8D44;&#x6E90;&#xFF0C;&#x5E94;&#x683C;&#x5916;&#x6CE8;&#x610F; Hash &#x503C;&#x7684;&#x7A33;&#x5B9A;&#x6027;&#xFF0C;&#x4E3A;&#x6B64;&#x5E94;&#x575A;&#x5B88;&#x4EE3;&#x7801;&#x6A21;&#x5757;&#x5316;&#x539F;&#x5219;&#x3002;&#x5047;&#x5B9A;&#x5168;&#x5C40;&#x5F15;&#x5165; app.js&#x3001;app.css&#xFF0C;&#x5219;&#x4E0D;&#x5141;&#x8BB8;&#x6DFB;&#x52A0;&#x975E;&#x5168;&#x5C40;&#x6027;&#x8D28;&#x7684;&#x4EE3;&#x7801;&#x81F3;&#x4E0A;&#x8FF0;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x3002;</p><p>&#x5047;&#x5982;&#x6A21;&#x5757; A &#x88AB;&#x6CE8;&#x5165; app.js&#xFF0C;&#x5B83;&#x7684;&#x4FEE;&#x6539;&#x5C06;&#x5F71;&#x54CD;&#x6240;&#x6709; .html &#x7684; Hash &#x503C;&#xFF0C;&#x672A;&#x8C03;&#x7528;&#x6A21;&#x5757; A &#x7684;&#x9875;&#x9762;&#x5B9E;&#x9645;&#x4E0A;&#x672A;&#x505A;&#x4FEE;&#x6539;&#x5374;&#x88AB;&#x52A8;&#x66F4;&#x65B0; Hash&#x3002;App &#x6839;&#x636E; Hash &#x7684;&#x53D8;&#x5316;&#x5224;&#x65AD;&#x8D44;&#x6E90;&#x66F4;&#x65B0;&#x5219;&#x8BA4;&#x4E3A;&#x6240;&#x6709; .html &#x66F4;&#x65B0;&#x4E86;&#xFF0C;&#x8FDB;&#x800C;&#x91CD;&#x65B0;&#x4E0B;&#x8F7D;&#x6240;&#x6709; Web &#x8D44;&#x6E90;&#x3002;</p><p>&#x603B;&#x4E4B; A &#x672A;&#x8C03;&#x7528; B&#xFF0C;B &#x7684;&#x4FEE;&#x6539;&#x4E0D;&#x8981;&#x5F71;&#x54CD; A &#x7684; Hash&#xFF0C;&#x6A21;&#x5757;&#x5982;&#x4F55;&#x62C6;&#x5206;&#x8BF7;&#x81EA;&#x884C;&#x4F9D;&#x7167;&#x6B64;&#x539F;&#x5219;&#x628A;&#x63E1;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x8BA8;&#x8BBA; manifest &#x7684;&#x6CE8;&#x5165;&#x65F6;&#x673A;&#x3002;manifest &#x5305;&#x542B;&#x6A21;&#x5757;&#x5904;&#x7406;&#x903B;&#x8F91;&#xFF0C;&#x5728; Webpack &#x7F16;&#x8BD1;&#x53CA;&#x6620;&#x5C04;&#x5E94;&#x7528;&#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x6A21;&#x5757;&#x4FE1;&#x606F;&#x88AB;&#x8BB0;&#x5F55;&#x81F3; manifest&#xFF0C;runtime &#x5219;&#x6839;&#x636E; manifest &#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.CommonsChunkPlugin({
    name: &apos;manifest&apos;,
    minChunks: Infinity
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;manifest&apos;</span>,
    <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>
})</code></pre><p>&#x4EFB;&#x4E00;&#x6A21;&#x5757;&#x66F4;&#x65B0;&#x5747;&#x4F1A;&#x5F15;&#x53D1;&#x5B83;&#x7684;&#x7EC6;&#x5FAE;&#x53D8;&#x5316;&#xFF08;&#x4F46;&#x53EF;&#x901A;&#x8FC7; minChunks &#x63A7;&#x5236; manifest &#x5F71;&#x54CD;&#x8303;&#x56F4;&#xFF09;&#xFF0C;&#x4E14;&#x6240;&#x6709;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x4F9D;&#x8D56; manifest&#x3002;&#x53EF;&#x6015;&#x7684;&#x73B0;&#x8C61;&#x53D1;&#x751F;&#x4E86;&#xFF1A;manifest &#x66F4;&#x65B0;&#x6240;&#x6709; .html &#x7684; Hash &#x66F4;&#x65B0; -&gt; &#x6240;&#x6709; .html &#x88AB;&#x91CD;&#x65B0;&#x4E0B;&#x8F7D;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x5148;&#x4E3A; .html &#x6253; Hash &#x518D;&#x5C06; manifest &#x5185;&#x8054;&#xFF0C;&#x56E0;&#x4E3A;&#x672A;&#x66F4;&#x65B0;&#x6A21;&#x5757;&#x8C03;&#x7528;&#x65E7; manifest &#x4E0D;&#x4F1A;&#x53D7;&#x5F71;&#x54CD;&#x3002;</p><h4>&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x6A21;&#x5F0F;&#x5C3D;&#x91CF;&#x7B80;&#x6613;</h4><p>&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x53C2;&#x4E0E;&#x8005;&#x4F17;&#x591A;&#xFF0C;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x6A21;&#x5F0F;&#x590D;&#x6742;&#x5C06;&#x63D0;&#x9AD8;&#x5B66;&#x4E60;&#x6210;&#x672C;&#x4E0E;&#x98CE;&#x9669;&#x3002;&#x5728;&#x7B80;&#x5316;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x4E0A;&#x6211;&#x505A;&#x4E86;&#x54EA;&#x4E9B;&#xFF1A;</p><h5>&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x5355;&#x5165;&#x53E3;&#x3001;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x591A;&#x5165;&#x53E3;</h5><p>&#x5148;&#x8BB2;&#x4E0B; Vue &#x591A;&#x9875;&#x9762;&#x62C6;&#x5206;&#x5982;&#x4F55;&#x505A;&#x3002;&#x76F8;&#x5173;&#x6587;&#x7AE0;&#x5F88;&#x591A;&#x5728;&#x6B64;&#x63A8;&#x8350;&#x4E00;&#x7BC7;&#xFF0C;<a href="https://github.com/zhaoqize/blog/issues/17" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x6211;</a>~</p><p>&#x6838;&#x5FC3;&#x601D;&#x60F3;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000013881405?w=428&amp;h=299" src="https://static.alili.tech/img/remote/1460000013881405?w=428&amp;h=299" alt="" title="" style="cursor:pointer;display:inline"></span></p><ul><li>&#x5355;&#x9875;&#xFF1A;&#x591A; View &#x5BF9;&#x5E94; <strong>&#x5355; index.html</strong> + <strong>&#x5355; entry.js</strong></li><li>&#x591A;&#x9875;&#xFF1A;&#x591A; View &#x5BF9;&#x5E94; <strong>&#x591A; index.html</strong> + <strong>&#x591A; entry.js</strong></li></ul><p>&#x5047;&#x5B9A;&#x542B; 100 &#x4E2A; View &#x5219;&#x9700;&#x5BF9;&#x5E94;&#x521B;&#x5EFA; 100 &#x4E2A; index.html&#x3001;100 &#x4E2A; entry.js&#xFF01;&#x4F46;&#x5B83;&#x4EEC;&#x51E0;&#x4E4E;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#xFF0C;&#x91CD;&#x590D;&#x521B;&#x5EFA;&#x5341;&#x5206;&#x6D6A;&#x8D39;&#xFF0C;&#x5F00;&#x53D1;&#x6210;&#x672C;&#x4E5F;&#x88AB;&#x589E;&#x52A0;&#x3002;</p><p>index.html &#x53EF;&#x88AB;&#x591A;&#x4E2A; View &#x590D;&#x7528;&#xFF0C;entry.js &#x4E0D;&#x53EF;&#x3002;&#x5171;&#x4EAB; entry &#x9700;&#x5728;&#x5176;&#x4E2D; import &#x5168;&#x90E8; View&#xFF0C;&#x5219; build &#x751F;&#x6210;&#x7684;&#x6BCF;&#x4E00;&#x9875;&#x9762;&#x542B;&#x6BCF;&#x4E00; View &#x7684;&#x5168;&#x90E8;&#x8D44;&#x6E90;&#xFF0C;&#x5373; 100 &#x4E2A;&#x5185;&#x5BB9;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x7684; .html&#x3002;</p><p>&#x6211;&#x4EEC;&#x53EF;&#x5F62;&#x5F0F;&#x4E0A;&#x5355;&#x5165;&#x53E3;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x591A;&#x5165;&#x53E3;&#xFF0C;&#x5982;&#x4F55;&#x505A;&#xFF1F;&#x5B9A;&#x4E49;&#x4E00;&#x542B;&#x5360;&#x4F4D;&#x7B26;&#x7684; entry &#x6A21;&#x677F;&#xFF0C;build &#x65F6;&#x5C06;&#x5360;&#x4F4D;&#x7B26;&#x66FF;&#x6362;&#x4E3A;&#x5BF9;&#x5E94; View &#x7684;&#x5F15;&#x5165;&#xFF0C;&#x5982;&#x6B64; import &#x8D44;&#x6E90;&#x5C06;&#x6309;&#x9700;&#x62C6;&#x5206;&#x3002;</p><p>&#x542B; <strong>&lt;%=Page%&gt;</strong> &#x5360;&#x4F4D;&#x7B26;&#x7684; entry.js&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import Page from &apos;&lt;%=Page%&gt;&apos;
/* eslint-disable no-new */
new Vue({
    el: &apos;#app&apos;,
    template: &apos;&lt;Page /&gt;&apos;,
    components: {
        Page
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> Page <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;&lt;%=Page%&gt;&apos;</span>
<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;Page /&gt;&apos;</span>,
    <span class="hljs-attr">components</span>: {
        Page
    }
})</code></pre><p>&#x751F;&#x6210;&#x591A; entry &#x7684; gulp task&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task(&apos;entries&apos;, () =&gt; {
    var flag = true
    for (let key in routes) {
        // &#x68C0;&#x67E5; entry &#x662F;&#x5426;&#x5DF2;&#x5B58;&#x5728;
        gulp.src(`./entry/entries/${routes[key].view}.js`)
            .on(&apos;data&apos;, () =&gt; {
                // &#x5DF2;&#x5B58;&#x5728; entry &#x4E0D;&#x91CD;&#x590D;&#x6784;&#x9020;
                flag = false
            })
            .on(&apos;end&apos;, () =&gt; {
                if (flag) {
                    console.log(&apos;new entry: &apos;, `/entries/${routes[key].view}.js`)
                    // &#x6784;&#x9020;&#x65B0; entry
                    gulp.src(&apos;./entry/entry.js&apos;)
                        .pipe(replace({
                            patterns: [
                                {
                                    match: /&lt;%=Page%&gt;/g,
                                    replacement: `../../src/views/${routes[key].path}${routes[key].view}`
                                }
                            ]
                        }))
                        .pipe(rename(`entries/${routes[key].view}.js`))
                        .pipe(gulp.dest(&apos;./entry/&apos;))
                }
                flag = true
            })
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">gulp.task(<span class="hljs-string">&apos;entries&apos;</span>, () =&gt; {
    <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> routes) {
        <span class="hljs-comment">// &#x68C0;&#x67E5; entry &#x662F;&#x5426;&#x5DF2;&#x5B58;&#x5728;</span>
        gulp.src(<span class="hljs-string">`./entry/entries/<span class="hljs-subst">${routes[key].view}</span>.js`</span>)
            .on(<span class="hljs-string">&apos;data&apos;</span>, () =&gt; {
                <span class="hljs-comment">// &#x5DF2;&#x5B58;&#x5728; entry &#x4E0D;&#x91CD;&#x590D;&#x6784;&#x9020;</span>
                flag = <span class="hljs-literal">false</span>
            })
            .on(<span class="hljs-string">&apos;end&apos;</span>, () =&gt; {
                <span class="hljs-keyword">if</span> (flag) {
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;new entry: &apos;</span>, <span class="hljs-string">`/entries/<span class="hljs-subst">${routes[key].view}</span>.js`</span>)
                    <span class="hljs-comment">// &#x6784;&#x9020;&#x65B0; entry</span>
                    gulp.src(<span class="hljs-string">&apos;./entry/entry.js&apos;</span>)
                        .pipe(replace({
                            <span class="hljs-attr">patterns</span>: [
                                {
                                    <span class="hljs-attr">match</span>: <span class="hljs-regexp">/&lt;%=Page%&gt;/g</span>,
                                    <span class="hljs-attr">replacement</span>: <span class="hljs-string">`../../src/views/<span class="hljs-subst">${routes[key].path}</span><span class="hljs-subst">${routes[key].view}</span>`</span>
                                }
                            ]
                        }))
                        .pipe(rename(<span class="hljs-string">`entries/<span class="hljs-subst">${routes[key].view}</span>.js`</span>))
                        .pipe(gulp.dest(<span class="hljs-string">&apos;./entry/&apos;</span>))
                }
                flag = <span class="hljs-literal">true</span>
            })
    }
})</code></pre><p>&#x4EC5;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x6267;&#x884C; gulp entries &#x6784;&#x9020;&#x591A;&#x5165;&#x53E3;&#xFF0C;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x5355;&#x5165;&#x53E3;&#x5373;&#x53EF;&#xFF0C;&#x514D;&#x53BB;&#x7814;&#x53D1;&#x540C;&#x5B66;&#x6784;&#x9020; entry &#x7684;&#x6210;&#x672C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function entries () {
    var entries = {}
    for (let key in routes) {
        entries[routes[key].view] = process.env.NODE_ENV === &apos;production&apos;
            ? `./entry/entries/${routes[key].view}.js`
            : &apos;./entry/dev.js&apos;
    }
    return entries
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">entries</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> entries = {}
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> routes) {
        entries[routes[key].view] = process.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>
            ? <span class="hljs-string">`./entry/entries/<span class="hljs-subst">${routes[key].view}</span>.js`</span>
            : <span class="hljs-string">&apos;./entry/dev.js&apos;</span>
    }
    <span class="hljs-keyword">return</span> entries
}</code></pre><h5>&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x5F15;&#x7528;&#x672C;&#x5730;&#x56FE;&#x7247;&#x3001;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x5F15;&#x7528; CDN &#x56FE;&#x7247;</h5><p>&#x7531;&#x4E8E; App &#x4EC5;&#x76D1;&#x542C; .html &#x53D8;&#x5316;&#xFF0C;&#x56FE;&#x7247;&#x8D44;&#x6E90;&#x9700;&#x4ECE;&#x8FDC;&#x7A0B;&#x5F15;&#x7528;&#x3002;&#x7814;&#x53D1;&#x81EA;&#x884C;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&#x81F3; CDN &#x4F3C;&#x4E4E;&#x5E76;&#x4E0D;&#x590D;&#x6742;&#xFF0C;&#x4F46;&#x6211;&#x53F8; CDN &#x4E0A;&#x4F20;&#x6743;&#x9650;&#x6CDB;&#x6EE5;&#x662F;&#x4E0D;&#x88AB;&#x5141;&#x8BB8;&#x7684;&#x3002;</p><p>&#x56FE;&#x7247;&#x4E0A;&#x4F20;&#x4EA4;&#x4E13;&#x4EBA;&#x8D1F;&#x8D23;&#xFF0C;&#x65B9;&#x6CD5;&#x539F;&#x59CB;&#x6C9F;&#x901A;&#x6210;&#x672C;&#x9AD8;&#xFF0C;&#x7B49;&#x5F85;&#x4ED6;&#x4EBA;&#x4E0A;&#x4F20;&#x4E5F;&#x5F71;&#x54CD;&#x81EA;&#x8EAB;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;</p><p>&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#x5C06;&#x56FE;&#x7247;&#x4E0A;&#x4F20;&#x6D4B;&#x8BD5; CDN&#xFF0C;&#x751F;&#x4EA7;&#x9636;&#x6BB5;&#x518D;&#x7EDF;&#x4E00;&#x62F7;&#x8D1D;&#x81F3;&#x7EBF;&#x4E0A;&#x73AF;&#x5883;&#xFF1F;&#x8F6C;&#x5316;&#x6210;&#x672C;&#x4E0D;&#x5C0F;&#xFF0C;&#x9057;&#x6F0F;&#x4E0A;&#x4F20;&#x8FD8;&#x4F1A;&#x5F15;&#x53D1;&#x7EBF;&#x4E0A;&#x4E8B;&#x6545;&#x3002;</p><p>&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#x4E66;&#x5199;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#x5F15;&#x7528;&#x672C;&#x5730;&#x8D44;&#x6E90;&#xFF0C;&#x514D;&#x53BB;&#x7814;&#x53D1;&#x81EA;&#x884C;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&#x7684;&#x70E6;&#x607C;&#x4E14;&#x6A21;&#x5F0F;&#x4E0E;&#x4F20;&#x7EDF; Web &#x5F00;&#x53D1;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#x3002;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x76F4;&#x63A5;&#x8F6C;&#x5316;&#x56FE;&#x7247;&#x94FE;&#x63A5;&#x4E3A; CDN &#x8DEF;&#x5F84;&#x3002;&#x5E76;&#x5C06;&#x6240;&#x6709; image &#x5355;&#x72EC;&#x6253;&#x5305;&#x81F3; assets/ &#x4E00;&#x540C;&#x4E0A;&#x4F20; CDN&#xFF0C;&#x6B64;&#x65F6; .html &#x5BF9; CDN &#x56FE;&#x7247;&#x7684;&#x5F15;&#x7528;&#x751F;&#x6548;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: &apos;url-loader&apos;,
    options: {
        limit: 1,
        name: &apos;assets/imgs/[name]-[hash:10].[ext]&apos;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
    <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;url-loader&apos;</span>,
    <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">limit</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;assets/imgs/[name]-[hash:10].[ext]&apos;</span>
    }
}</code></pre><p>&#x4E3A;&#x9632;&#x6B62; CDN &#x7F13;&#x5B58;&#x5BFC;&#x81F4;&#x56FE;&#x7247;&#x65E0;&#x6CD5;&#x53CA;&#x65F6;&#x66F4;&#x65B0;&#xFF0C;build &#x540E;&#x56FE;&#x7247;&#x540D;&#x79F0;&#x6DFB;&#x52A0; Hash &#x540E;&#x7F00;&#x3002;&#x5728;&#x6B64;&#x6211;&#x8BBE;&#x7F6E; Base64 &#x8F6C;&#x5316; limit &#x4E3A; 1&#xFF0C;&#x9632;&#x6B62; HTML &#x7A7F;&#x63D2;&#x8FC7;&#x591A; Base64 &#x683C;&#x5F0F;&#x56FE;&#x7247;&#x963B;&#x585E;&#x52A0;&#x8F7D;&#x3002;</p><p>&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x56FE;&#x7247;&#x94FE;&#x63A5;&#x8F6C;&#x5316; CDN &#x8DEF;&#x5F84;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const settings = require(&apos;../settings&apos;)
module.exports = {
    dev: {
        // code...
    },
    build: {
        assetsRoot: path.resolve(__dirname, &apos;../../dist&apos;),
        assetsSubDirectory: &apos;static&apos;,
        assetsPublicPath: `${settings.cdn}/`,
        // code...
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> settings = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../settings&apos;</span>)
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">dev</span>: {
        <span class="hljs-comment">// code...</span>
    },
    <span class="hljs-attr">build</span>: {
        <span class="hljs-attr">assetsRoot</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../../dist&apos;</span>),
        <span class="hljs-attr">assetsSubDirectory</span>: <span class="hljs-string">&apos;static&apos;</span>,
        <span class="hljs-attr">assetsPublicPath</span>: <span class="hljs-string">`<span class="hljs-subst">${settings.cdn}</span>/`</span>,
        <span class="hljs-comment">// code...</span>
    }
}</code></pre><hr><h3 id="articleHeader2">&#x5DE5;&#x5177;&#x4E00;&#x89C8;</h3><p><a href="https://www.npmjs.com/package/html-webpack-inline-source-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-inline-source-plugin</a>&#x3001;<a href="https://www.npmjs.com/package/gulp-inline-source" rel="nofollow noreferrer" target="_blank">gulp-inline-source</a>&#xFF1A;JS&#x3001;CSS &#x8D44;&#x6E90;&#x5185;&#x8054;&#x5DE5;&#x5177;&#x3002;</p><p><a href="https://doc.webpack-china.org/plugins/commons-chunk-plugin" rel="nofollow noreferrer" target="_blank">commons-chunk-plugin</a>&#xFF1A;&#x516C;&#x5171;&#x6A21;&#x5757;&#x62C6;&#x5206;&#x5DE5;&#x5177;&#x3002;</p><p><a href="https://www.npmjs.com/package/gulp-rev" rel="nofollow noreferrer" target="_blank">gulp-rev</a>&#x3001;<a href="https://doc.webpack-china.org/plugins/hashed-module-ids-plugin" rel="nofollow noreferrer" target="_blank">hashed-module-ids-plugin</a>&#xFF1A;MD5 &#x7B7E;&#x540D;&#x751F;&#x6210;&#x5DE5;&#x5177;&#x3002;</p><p><a href="https://www.npmjs.com/package/gulp-zip" rel="nofollow noreferrer" target="_blank">gulp-zip</a>&#xFF1A;&#x538B;&#x7F29;&#x5DE5;&#x5177;&#x3002;</p><p>&#x5176;&#x5B83;&#x5E38;&#x7528; Gulp &#x5DE5;&#x5177;&#xFF1A;<a href="https://www.npmjs.com/package/gulp-rename" rel="nofollow noreferrer" target="_blank">gulp-rename</a>&#x3001;<a href="https://www.npmjs.com/package/gulp-replace-task" rel="nofollow noreferrer" target="_blank">gulp-replace-task</a>&#x3001;<a href="https://www.npmjs.com/package/del" rel="nofollow noreferrer" target="_blank">del</a></p><hr><h3 id="articleHeader3">&#x8E29;&#x5751;&#x672D;&#x8BB0;</h3><h4>&#x8DEF;&#x7531;&#x89E3;&#x6790;&#x95EE;&#x9898;</h4><p>&#x5047;&#x5B9A;&#x8DEF;&#x7531;&#x914D;&#x7F6E;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;/demo&quot;: {
        &quot;view&quot;: &quot;Demo&quot;,
        &quot;path&quot;: &quot;demo/&quot;,
        &quot;query&quot;: [
            &quot;topic_id&quot;,
            &quot;service_id&quot;
        ]
    },
    &quot;/album&quot;: {
        &quot;view&quot;: &quot;Album&quot;,
        &quot;path&quot;: &quot;demo/&quot;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">&quot;/demo&quot;</span>: {
        <span class="hljs-string">&quot;view&quot;</span>: <span class="hljs-string">&quot;Demo&quot;</span>,
        <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;demo/&quot;</span>,
        <span class="hljs-string">&quot;query&quot;</span>: [
            <span class="hljs-string">&quot;topic_id&quot;</span>,
            <span class="hljs-string">&quot;service_id&quot;</span>
        ]
    },
    <span class="hljs-string">&quot;/album&quot;</span>: {
        <span class="hljs-string">&quot;view&quot;</span>: <span class="hljs-string">&quot;Album&quot;</span>,
        <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;demo/&quot;</span>
    }
}</code></pre><p>&#x751F;&#x6210; routes.json &#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;items&quot;: [
        {
            &quot;remote_file&quot;: &quot;http://p2znmi5xx.bkt.clouddn.com/dist/demo/Demo-2392a800be.html&quot;,
            &quot;uri&quot;: &quot;https://backend.igengmei.com/demo[/]?.*&quot;
        },
        {
            &quot;remote_file&quot;: &quot;http://p2znmi5xx.bkt.clouddn.com/dist/demo/Album-1564b12a1c.html&quot;,
            &quot;uri&quot;: &quot;https://backend.igengmei.com/album[/]?.*&quot;
        }
    ],
    &quot;deploy_time&quot;: &quot;Mon Mar 19 2018 19:41:22 GMT+0800 (CST)&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">&quot;items&quot;</span>: [
        {
            <span class="hljs-string">&quot;remote_file&quot;</span>: <span class="hljs-string">&quot;http://p2znmi5xx.bkt.clouddn.com/dist/demo/Demo-2392a800be.html&quot;</span>,
            <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;https://backend.igengmei.com/demo[/]?.*&quot;</span>
        },
        {
            <span class="hljs-string">&quot;remote_file&quot;</span>: <span class="hljs-string">&quot;http://p2znmi5xx.bkt.clouddn.com/dist/demo/Album-1564b12a1c.html&quot;</span>,
            <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;https://backend.igengmei.com/album[/]?.*&quot;</span>
        }
    ],
    <span class="hljs-string">&quot;deploy_time&quot;</span>: <span class="hljs-string">&quot;Mon Mar 19 2018 19:41:22 GMT+0800 (CST)&quot;</span>
}</code></pre><p>&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x901A;&#x8FC7; localhost:8080/demo?topic_id=&amp;service_id= &#x8BBF;&#x95EE; Demo &#x9875;&#x9762;&#xFF0C;&#x5F62;&#x5982; vue-router &#x4E3A;&#x6211;&#x4EEC;&#x6784;&#x5EFA;&#x7684;&#x8DEF;&#x7531;&#x3002;&#x800C;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x8BBF;&#x95EE;&#x8DEF;&#x5F84;&#x4E3A; file:////dist/demo/Demo-2392a800be.html?uri=https%3A%2F%2Fbackend.igengmei.com%2Fdemo%3Ftopic_id%3D%26service_id%3D&#xFF0C;&#x83B7;&#x53D6;&#x53C2;&#x6570;&#x9700;&#x89E3;&#x6790; uri&#x3002;</p><p>&#x56E0;&#x4E24;&#x5927;&#x73AF;&#x5883;&#x53C2;&#x6570;&#x89E3;&#x6790;&#x65B9;&#x5F0F;&#x4E0D;&#x540C;&#xFF0C;&#x9700;&#x81EA;&#x884C;&#x5C01;&#x88C5; $router&#xFF0C;&#x4F8B;&#x5982; this.$router.query &#x7684;&#x5B9A;&#x4E49;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const App = {
    $router: {
        query: (key) =&gt; {
            var search = window.location.search
            var value = &apos;&apos;
            var tmp = []
            if (search) {
                // &#x751F;&#x4EA7;&#x73AF;&#x5883;&#x89E3;&#x6790; uri
                tmp = (process.env.NODE_ENV === &apos;production&apos;)
                    ? decodeURIComponent(search.split(&apos;uri=&apos;)[1]).split(&apos;?&apos;)[1].split(&apos;&amp;&apos;)
                    : search.slice(1).split(&apos;&amp;&apos;)
            }
            for (let i in tmp) {
                if (key === tmp[i].split(&apos;=&apos;)[0]) {
                    value = tmp[i].split(&apos;=&apos;)[1]
                    break
                }
            }
            return value
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> App = {
    <span class="hljs-attr">$router</span>: {
        <span class="hljs-attr">query</span>: <span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> {
            <span class="hljs-keyword">var</span> search = <span class="hljs-built_in">window</span>.location.search
            <span class="hljs-keyword">var</span> value = <span class="hljs-string">&apos;&apos;</span>
            <span class="hljs-keyword">var</span> tmp = []
            <span class="hljs-keyword">if</span> (search) {
                <span class="hljs-comment">// &#x751F;&#x4EA7;&#x73AF;&#x5883;&#x89E3;&#x6790; uri</span>
                tmp = (process.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>)
                    ? <span class="hljs-built_in">decodeURIComponent</span>(search.split(<span class="hljs-string">&apos;uri=&apos;</span>)[<span class="hljs-number">1</span>]).split(<span class="hljs-string">&apos;?&apos;</span>)[<span class="hljs-number">1</span>].split(<span class="hljs-string">&apos;&amp;&apos;</span>)
                    : search.slice(<span class="hljs-number">1</span>).split(<span class="hljs-string">&apos;&amp;&apos;</span>)
            }
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> tmp) {
                <span class="hljs-keyword">if</span> (key === tmp[i].split(<span class="hljs-string">&apos;=&apos;</span>)[<span class="hljs-number">0</span>]) {
                    value = tmp[i].split(<span class="hljs-string">&apos;=&apos;</span>)[<span class="hljs-number">1</span>]
                    <span class="hljs-keyword">break</span>
                }
            }
            <span class="hljs-keyword">return</span> value
        }
    }
}</code></pre><p>&#x53EF;&#x5C06; $router &#x7ED1;&#x5B9A;&#x81F3; Vue.prototype&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="App.install = (Vue, options) =&gt; {
    Vue.prototype.$router = App.$router
}
export default App" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">App.install = <span class="hljs-function">(<span class="hljs-params">Vue, options</span>) =&gt;</span> {
    Vue.prototype.$router = App.$router
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App</code></pre><p>&#x5728; entry.js &#x6267;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.use(App)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">Vue.use(App)</code></pre><p>&#x6B64;&#x65F6;&#x4EFB;&#x4E00; .vue &#x53EF;&#x76F4;&#x63A5;&#x8C03;&#x7528; this.$router&#xFF0C;&#x65E0;&#x9700; import&#x3002;&#x8C03;&#x7528;&#x9891;&#x7387;&#x8F83;&#x9AD8;&#x7684; method &#x5747;&#x53EF; bind &#x81F3; Vue.prototype&#xFF0C;&#x4F8B;&#x5982;&#x5BF9;&#x8BF7;&#x6C42;&#x7684;&#x5C01;&#x88C5; this.$request&#x3002;</p><p>&#x7F3A;&#x9677;&#xFF1A;&#x81EA;&#x5236; router &#x4EC5;&#x652F;&#x6301; query &#x53C2;&#x6570;&#x4E0D;&#x652F;&#x6301; param &#x53C2;&#x6570;&#x3002;</p><h4>Cookie &#x540C;&#x6B65;&#x95EE;&#x9898;</h4><p>App &#x52A0;&#x8F7D;&#x672C;&#x5730;&#x9884;&#x7F6E;&#x8D44;&#x6E90;&#x5728; file:/// &#x57DF;&#xFF0C;&#x65E0;&#x6CD5;&#x76F4;&#x63A5;&#x5C06; Cookie &#x8F7D;&#x5165; Webview&#xFF0C;&#x5BF9; file:/// &#x5F00;&#x653E; Cookie &#x5C06;&#x5BFC;&#x81F4;&#x5B89;&#x5168;&#x95EE;&#x9898;&#x3002;&#x51E0;&#x79CD;&#x89E3;&#x51B3;&#x601D;&#x8DEF;&#xFF1A;</p><ul><li>&#x533A;&#x5206; file:/// &#x6765;&#x6E90;&#xFF0C;&#x5224;&#x5B9A;&#x6765;&#x6E90;&#x5B89;&#x5168;&#x5219;&#x8F7D;&#x5165; Cookie&#xFF0C;&#x4F46; H5 &#x4F9D;&#x7136;&#x65E0;&#x6CD5;&#x5C06; Cookie &#x5E26;&#x5230;&#x8BF7;&#x6C42;&#x4E2D;&#x3002;</li><li>&#x4F2A;&#x9020;&#x7C7B;&#x4F3C; http &#x8BF7;&#x6C42;&#x5F62;&#x6210;&#x5047;&#x57DF;&#x3002;</li><li>Native &#x7EF4;&#x62A4; Cookie &#x5E76;&#x63D0;&#x4F9B;&#x83B7;&#x53D6;&#x63A5;&#x53E3;&#xFF0C;H5 &#x62FC;&#x63A5; Cookie &#x81EA;&#x884C;&#x5199;&#x5165; Request Header&#x3002;</li><li>Native &#x4EE3;&#x53D1;&#x8BF7;&#x6C42;&#x56DE;&#x4F20;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x4F46;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x5927;&#x6570;&#x636E;&#x91CF; POST &#x8BF7;&#x6C42;&#xFF08;&#x4F8B; POST File&#xFF09;&#x3002;</li></ul><p>&#x901A;&#x5E38;&#x5728;&#x9875;&#x9762; render &#x65F6;&#x670D;&#x52A1;&#x5668;&#x4F1A;&#x5C06; CSRFToken &#x5199;&#x5165; Cookie&#xFF0C;Request &#x65F6;&#x518D;&#x5C06; CSRFToken &#x4F20;&#x56DE;&#x670D;&#x52A1;&#x5668;&#x9632;&#x6B62;&#x8DE8;&#x57DF;&#x653B;&#x51FB;&#x3002;&#x4F46;&#x52A0;&#x8F7D;&#x672C;&#x5730; HTML &#x7F3A;&#x5C11;&#x4E0A;&#x8FF0;&#x6B65;&#x9AA4;&#xFF0C;&#x9700;&#x989D;&#x5916;&#x6CE8;&#x610F; CSRFToken &#x7684;&#x83B7;&#x53D6;&#x95EE;&#x9898;&#x3002;</p><p>&#x672A;&#x5B8C;&#x5F85;&#x7EED;~</p><hr><p>&#x4F5C;&#x8005;&#xFF1A;&#x5446;&#x604B;&#x5C0F;&#x55B5;</p><p>&#x6211;&#x7684;&#x540E;&#x82B1;&#x56ED;&#xFF1A;<a href="https://sunmengyuan.github.io/garden/" rel="nofollow noreferrer" target="_blank">https://sunmengyuan.github.io...</a></p><p>&#x6211;&#x7684; github&#xFF1A;<a href="https://github.com/sunmengyuan" rel="nofollow noreferrer" target="_blank">https://github.com/sunmengyuan</a></p><p>&#x539F;&#x6587;&#x94FE;&#x63A5;&#xFF1A;<a href="https://sunmengyuan.github.io/garden/2018/03/05/ballade.html" rel="nofollow noreferrer" target="_blank">https://sunmengyuan.github.io...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
应用于 Hybrid App 的 Vue 多页面构建

## 原文链接
[https://segmentfault.com/a/1190000013881397](https://segmentfault.com/a/1190000013881397)

