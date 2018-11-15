---
title: 高效的Mobx模式（Part 1 - 构建可观察数据）
hidden: true
categories: reprint
slug: f869b514
date: 2018-11-12 02:30:05
---

{{< raw >}}
<h1>&#x8D77;&#x56E0;</h1><p>&#x5F88;&#x65E9;&#x4E4B;&#x524D;&#x770B;&#x5230;&#x7684;&#x4E00;&#x7BC7;&#x5173;&#x4E8E;mobx&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x4E4B;&#x524D;&#x8BB0;&#x5F97;&#x662F;&#x6709;&#x4EBA;&#x7FFB;&#x8BD1;&#x8FC7;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x600E;&#x4E48;&#x627E;&#x90FD;&#x627E;&#x4E0D;&#x5230;&#xFF0C;&#x6545;&#x82B1;&#x4E86;&#x70B9;&#x65F6;&#x95F4;&#x901A;&#x8FC7;&#x81EA;&#x5DF1;&#x90A3;&#x534A;&#x6876;&#x6C34;&#x7684;&#x82F1;&#x6587;&#x6C34;&#x5E73;&#xFF0C;&#x52A0;&#x4E0A;Google&#x7FFB;&#x8BD1;&#x4E00;&#x4E0B;&#xFF0C;&#x5BF9;&#x4E8E;&#x521D;&#x5B66;&#x8005;&#xFF0C;&#x4EE5;&#x53CA;mobx&#x7684;&#x5F00;&#x53D1;&#x8005;&#x63D0;&#x4F9B;&#x4E9B;&#x8BB8;&#x5E2E;&#x52A9;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x9488;&#x5BF9;&#x5DF2;&#x7ECF;&#x4E86;&#x89E3;mobx&#xFF0C;&#x4E14;&#x6709;&#x8FC7;&#x4E00;&#x4E9B;&#x7B80;&#x5355;&#x7684;&#x5F00;&#x53D1;&#x7684;&#x540C;&#x5B66;&#xFF0C;&#x5176;&#x4E2D;&#x5BF9;&#x6587;&#x7AE0;&#x6709;&#x4E00;&#x4E9B;&#x5220;&#x51CF;&#xFF0C;&#x8FD8;&#x6709;&#x7FFB;&#x8BD1;&#x7684;&#x4E0D;&#x5BF9;&#x7684;&#x5730;&#x65B9;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6307;&#x51FA;&#x3002;</p><h1>&#x9AD8;&#x6548;&#x7684;Mobx&#x6A21;&#x5F0F; - &#xFF08;Part 1&#xFF09;</h1><p>MobX&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x7B80;&#x5355;&#x800C;&#x5F3A;&#x5927;&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x7BA1;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x72B6;&#x6001;&#x3002; &#x5B83;&#x4F7F;&#x7528;&#x4E00;&#x79CD;&#x79F0;&#x4E3A;&#xFF08;TFRP-<code>Transparent Functional Reactive Programming</code>&#xFF09;&#x7684;&#x6280;&#x672F;&#xFF0C;&#x5176;&#x4E2D;&#x5982;&#x679C;&#x4EFB;&#x4F55;&#x76F8;&#x5173;&#x503C;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x5B83;&#x4F1A;&#x81EA;&#x52A8;&#x8BA1;&#x7B97;&#x6D3E;&#x751F;&#x503C;&#x3002; &#x4E5F;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x8BBE;&#x7F6E;&#x8DDF;&#x8E2A;&#x503C;&#x66F4;&#x6539;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x56FE;&#x6765;&#x5B8C;&#x6210;&#x7684;&#x3002;</p><p>MobX&#x5BFC;&#x81F4;&#x601D;&#x7EF4;&#x65B9;&#x5F0F;&#x7684;&#x8F6C;&#x53D8;&#xFF08;<code>For the better</code>&#xFF09;&#xFF0C;&#x5E76;&#x6539;&#x53D8;&#x60A8;&#x7684;&#x5FC3;&#x7406;&#x6A21;&#x578B;&#x56F4;&#x7ED5;&#x7BA1;&#x7406;&#x5BA2;&#x6237;&#x7AEF;&#x72B6;&#x6001;&#x3002;</p><h2>Part 1 - &#x6784;&#x5EFA;&#x53EF;&#x89C2;&#x5BDF;&#x8005;</h2><p>&#x5F53;&#x6211;&#x4EEC;&#x4F7F;&#x7528;<strong>Mobx</strong>&#x65F6;&#xFF0C;&#x5EFA;&#x7ACB;&#x5BA2;&#x6237;&#x7AEF;&#x72B6;&#x6001;&#x6A21;&#x578B;&#x662F;&#x7B2C;&#x4E00;&#x6B65;&#xFF0C; &#x8FD9;&#x662F;&#x6700;&#x6709;&#x53EF;&#x80FD;&#x88AB;&#x5BA2;&#x6237;&#x7AEF;&#x4E0A;&#x5448;&#x73B0;&#x4F60;&#x7684;&#x57DF;&#x6A21;&#x578B;&#x7684;&#x76F4;&#x63A5;&#x4F53;&#x73B0;&#x3002;&#x5B9E;&#x9645;&#x4E0A;&#x5BA2;&#x6237;&#x7AEF;&#x72B6;&#x6001;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x8BF4;&#x7684;<code>Store</code>&#xFF0C;&#x4E86;&#x89E3;redux&#x7684;&#x5BF9;&#x6B64;&#x90FD;&#x5F88;&#x719F;&#x6089;&#xFF0C;&#x867D;&#x7136;&#x4F60;&#x53EA;&#x6709;&#x4E00;&#x4E2A;<strong>Store</strong>&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x662F;&#x7531;&#x591A;&#x4E2A;&#x5B50;<strong>Store</strong>&#x7EC4;&#x4EF6;&#x7684;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x5B50;<strong>Store</strong>&#x7528;&#x6765;&#x5904;&#x7406;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684;&#x5404;&#x79CD;&#x529F;&#x80FD;&#x3002;</p><p>&#x6700;&#x7B80;&#x5355;&#x7684;&#x5165;&#x95E8;&#x65B9;&#x6CD5;&#x662F;&#x6CE8;&#x91CA;<strong>Store</strong>&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#x5C06;&#x968F;&#x7740;<code>@observable</code>&#x800C;&#x4E0D;&#x65AD;&#x53D8;&#x5316;&#x3002; &#x8BF7;&#x6CE8;&#x610F;&#xFF0C;&#x6211;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x88C5;&#x9970;&#x5668;&#x8BED;&#x6CD5;&#xFF0C;&#x4F46;&#x4F7F;&#x7528;&#x7B80;&#x5355;&#x7684;ES5&#x51FD;&#x6570;&#x5305;&#x88C5;&#x5668;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x76F8;&#x540C;&#x7684;&#x529F;&#x80FD;&#x3002;</p><pre><code class="javascript">import { observable } from &apos;mobx&apos;
class MyStore {
    @observable name
    @observable description
    @observable author

    @observable photos = [] 
}</code></pre><h3>&#x4FEE;&#x526A;&#x53EF;&#x89C2;&#x5BDF;&#x5C5E;&#x6027;</h3><p>&#x901A;&#x8FC7;&#x5C06;&#x5BF9;&#x8C61;&#x6807;&#x8BB0;&#x4E3A;<code>@observable</code>&#xFF0C;&#x60A8;&#x5C06;&#x81EA;&#x52A8;&#x89C2;&#x5BDF;&#x5176;&#x6240;&#x6709;&#x5D4C;&#x5957;&#x5C5E;&#x6027;&#x3002; &#x73B0;&#x5728;&#x8FD9;&#x53EF;&#x80FD;&#x662F;&#x4F60;&#x60F3;&#x8981;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x4F46;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x5B83;&#x66F4;&#x80FD;&#x9650;&#x5236;&#x53EF;&#x89C2;&#x5BDF;&#x6027;&#x3002; &#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E00;&#x4E9B;MobX&#x4FEE;&#x9970;&#x7B26;&#x6765;&#x505A;&#x5230;&#x8FD9;&#x4E00;&#x70B9;&#xFF1A;</p><h4><code>asReference</code></h4><p>&#x5F53;&#x67D0;&#x4E9B;&#x5C5E;&#x6027;&#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x503C;&#x65F6;&#xFF0C;&#x8FD9;&#x662F;&#x975E;&#x5E38;&#x6709;&#x7528;&#x7684;&#x3002; &#x8BF7;&#x6CE8;&#x610F;&#xFF0C;&#x5982;&#x679C;&#x60A8;&#x786E;&#x5B9E;&#x66F4;&#x6539;&#x4E86;&#x5F15;&#x7528;&#x672C;&#x8EAB;&#xFF0C;&#x5B83;&#x5C06;&#x89E6;&#x53D1;&#x66F4;&#x6539;&#x3002;</p><pre><code class="javascript">let address = new Address();
let contact = observable({
    person: new Person(),
    address: asReference(address)
});

address.city = &apos;New York&apos;; // &#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#x901A;&#x77E5;&#x4EFB;&#x4F55;

// &#x5C06;&#x89E6;&#x53D1;&#x901A;&#x77E5;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x662F;&#x5C5E;&#x6027;&#x5F15;&#x7528;&#x66F4;&#x6539;
contact.address = new Address();</code></pre><p>&#x5728;&#x4E0A;&#x9762;&#x7684;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;address&#x5C5E;&#x6027;&#x5C06;&#x4E0D;&#x53EF;&#x89C2;&#x5BDF;&#x3002; &#x5982;&#x679C;&#x60A8;&#x66F4;&#x6539;&#x5730;&#x5740;&#x8BE6;&#x7EC6;&#x4FE1;&#x606F;&#xFF0C;&#x5219;&#x4E0D;&#x4F1A;&#x6536;&#x5230;&#x901A;&#x77E5;&#x3002; &#x4F46;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x60A8;&#x66F4;&#x6539;&#x5730;&#x5740;&#x5F15;&#x7528;&#x672C;&#x8EAB;&#xFF0C;&#x60A8;&#x5C06;&#x6536;&#x5230;&#x901A;&#x77E5;&#x3002;</p><p>&#x4E00;&#x4E2A;&#x6709;&#x8DA3;&#x7684;&#x6D88;&#x606F;&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x89C2;&#x5BDF;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5176;&#x503C;&#x5177;&#x6709;&#x539F;&#x578B;&#xFF08;&#x7C7B;&#x5B9E;&#x4F8B;&#xFF09;&#x5C06;&#x81EA;&#x52A8;&#x4F7F;&#x7528;<code>asReference()</code>&#x6CE8;&#x91CA;&#x3002; &#x6B64;&#x5916;&#xFF0C;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#x4E0D;&#x4F1A;&#x88AB;&#x8FDB;&#x4E00;&#x6B65;&#x9012;&#x5F52;&#x3002;<br></p><hr><h4><code>asFlat</code></h4><p>&#x8FD9;&#x6BD4;<code>asReference</code>&#x7565;&#x5BBD;&#x4E00;&#x4E9B;&#x3002; <code>asFlat</code>&#x5141;&#x8BB8;&#x5C5E;&#x6027;&#x672C;&#x8EAB;&#x53EF;&#x89C2;&#x5BDF;&#xFF0C;&#x4F46;&#x4E0D;&#x5141;&#x8BB8;&#x5176;&#x4EFB;&#x4F55;&#x5B50;&#x8282;&#x70B9;&#x3002; &#x5178;&#x578B;&#x7528;&#x6CD5;&#x9002;&#x7528;&#x4E8E;&#x60A8;&#x53EA;&#x60F3;&#x89C2;&#x5BDF;&#x6570;&#x7EC4;&#x5B9E;&#x4F8B;&#x800C;&#x4E0D;&#x662F;&#x5176;&#x9879;&#x76EE;&#x7684;&#x6570;&#x7EC4;&#x3002; &#x8BF7;&#x6CE8;&#x610F;&#xFF0C;&#x5BF9;&#x4E8E;&#x6570;&#x7EC4;&#xFF0C;<strong>length</strong>&#x5C5E;&#x6027;&#x4ECD;&#x7136;&#x662F;&#x53EF;&#x89C2;&#x5BDF;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x5728;&#x6570;&#x7EC4;&#x5B9E;&#x4F8B;&#x4E0A;&#x3002; &#x4F46;&#x662F;&#xFF0C;&#x5BF9;&#x5B50;&#x5C5E;&#x6027;&#x7684;&#x4EFB;&#x4F55;&#x66F4;&#x6539;&#x90FD;&#x4E0D;&#x4F1A;&#x88AB;&#x89C2;&#x5BDF;&#x5230;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016266275" src="https://static.alili.tech/img/remote/1460000016266275" alt="" title=""></span></p><blockquote>&#x9996;&#x5148;&#x521B;&#x5EFA;<code>@observable</code>&#x6240;&#x6709;&#x5185;&#x5BB9;&#xFF0C;&#x7136;&#x540E;&#x5E94;&#x7528;<code>asReference</code>&#x548C;<code>asFlat</code>&#x4FEE;&#x9970;&#x7B26;&#x6765;&#x4FEE;&#x526A;&#x53EF;&#x89C2;&#x5BDF;&#x5C5E;&#x6027;&#x3002;</blockquote><p>&#x5F53;&#x4F60;&#x6DF1;&#x5165;&#x5B9E;&#x73B0;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684;&#x5404;&#x79CD;&#x529F;&#x80FD;&#x65F6;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x8FD9;&#x79CD;&#x4FEE;&#x526A;&#x7684;&#x597D;&#x5904;&#x3002;&#x4E14;&#x5F53;&#x4F60;&#x5F00;&#x59CB;&#x65F6;&#x53EF;&#x80FD;&#x5E76;&#x4E0D;&#x660E;&#x663E;&#xFF0C;&#x8FD9;&#x5B8C;&#x5168;&#x5F88;&#x6B63;&#x5E38;&#x3002;&#x5F53;&#x4F60;&#x8BC6;&#x522B;&#x51FA;&#x4E0D;&#x9700;&#x8981;&#x6DF1;&#x5EA6;&#x53EF;&#x89C2;&#x5BDF;&#x6027;&#x7684;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x8BF7;&#x786E;&#x4FDD;&#x91CD;&#x65B0;&#x68C0;&#x67E5;&#x4F60;&#x7684;<code>Store</code>&#xFF0C; &#x5B83;&#x53EF;&#x4EE5;&#x5BF9;&#x60A8;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684;&#x6027;&#x80FD;&#x4EA7;&#x751F;&#x79EF;&#x6781;&#x5F71;&#x54CD;&#x3002;</p><pre><code class="javascript">import {observable} from &apos;mobx&apos;;

class AlbumStore {
    @observable name;
    
    // &#x8FD9;&#x91CC;&#x4E0D;&#x9700;&#x8981;&#x89C2;&#x5BDF;
    @observable createdDate = asReference(new Date()); 
    
    @observable description;
    @observable author;
    
    // &#x53EA;&#x89C2;&#x5BDF;&#x7167;&#x7247;&#x6570;&#x7EC4;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5355;&#x72EC;&#x7684;&#x7167;&#x7247;
    @observable photos = asFlat([]); 
}</code></pre><p></p><hr><h3>&#x6269;&#x5C55;&#x53EF;&#x89C2;&#x5BDF;&#x5C5E;&#x6027;</h3><p>&#x548C;&#x4FEE;&#x526A;&#x53EF;&#x89C2;&#x5BDF;&#x5C5E;&#x6027;&#x76F8;&#x53CD;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x6269;&#x5C55;&#x5BF9;&#x8C61;&#x4E0A;&#x53EF;&#x89C2;&#x5BDF;&#x6027;&#x7684;&#x8303;&#x56F4;/&#x884C;&#x4E3A;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5220;&#x9664;&#x53EF;&#x89C2;&#x5BDF;&#x6027;&#x3002; &#x8FD9;&#x91CC;&#x6709;&#x4E09;&#x4E2A;&#x53EF;&#x4EE5;&#x63A7;&#x5236;&#x5B83;&#x7684;&#x4FEE;&#x9970;&#x7B26;&#xFF1A;</p><h4><code>asStructure</code></h4><p>&#x8FD9;&#x4F1A;&#x4FEE;&#x6539;&#x5C06;&#x65B0;&#x503C;&#x5206;&#x914D;&#x7ED9;<code>observable</code>&#x65F6;&#x5B8C;&#x6210;&#x76F8;&#x7B49;&#x6027;&#x68C0;&#x67E5;&#x7684;&#x65B9;&#x5F0F;&#x3002; &#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4EC5;&#x5C06;&#x5F15;&#x7528;&#x66F4;&#x6539;&#x89C6;&#x4E3A;&#x66F4;&#x6539;&#x3002; &#x5982;&#x679C;&#x60A8;&#x5E0C;&#x671B;&#x57FA;&#x4E8E;&#x5185;&#x90E8;&#x7ED3;&#x6784;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;&#x5219;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6B64;&#x4FEE;&#x9970;&#x7B26;&#x3002; &#x8FD9;&#x4E3B;&#x8981;&#x662F;&#x9488;&#x5BF9;&#x503C;&#x7C7B;&#x578B;&#xFF08;&#x4E5F;&#x79F0;&#x4E3A;&#x7ED3;&#x6784;&#xFF09;&#xFF0C;&#x53EA;&#x6709;&#x5728;&#x5B83;&#x4EEC;&#x7684;&#x503C;&#x5339;&#x914D;&#x65F6;&#x624D;&#x76F8;&#x7B49;&#x3002;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000016266276" src="https://static.alili.tech/img/remote/1460000016266276" alt="" title=""></span></p><pre><code class="javascript">const { asStructure, observable } = require(&apos;mobx&apos;);

let address1 = {
    zip: 12345,
    city: &apos;New York&apos;
};

let address2 = {
    zip: 12345,
    city: &apos;New York&apos;
};

let contact = {
    address: observable(address1)
};

// &#x5C06;&#x88AB;&#x89C6;&#x4E3A;&#x4E00;&#x79CD;&#x53D8;&#x5316;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5F15;&#x7528;
contact.address = address2;

// &#x4F7F;&#x7528; asStructure() &#x4FEE;&#x9970;
let contact2 = {
    address: observable(asStructure(address1)) 
};

// &#x4E0D;&#x4F1A;&#x88AB;&#x89C6;&#x4E3A;&#x4E00;&#x79CD;&#x53D8;&#x5316;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x5177;&#x6709;&#x76F8;&#x540C;&#x7684;&#x4EF7;&#x503C;
contact.address = address2;</code></pre><p></p><hr><h4><code>asMap</code></h4><p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5C06;&#x5BF9;&#x8C61;&#x6807;&#x8BB0;&#x4E3A;&#x53EF;&#x89C2;&#x5BDF;&#x5BF9;&#x8C61;&#x65F6;&#xFF0C;&#x5B83;&#x53EA;&#x80FD;&#x8DDF;&#x8E2A;&#x6700;&#x521D;&#x5728;&#x5BF9;&#x8C61;&#x4E0A;&#x5B9A;&#x4E49;&#x7684;&#x5C5E;&#x6027;&#x3002; &#x5982;&#x679C;&#x6DFB;&#x52A0;&#x65B0;&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x4E0D;&#x4F1A;&#x8DDF;&#x8E2A;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#x3002; &#x4F7F;&#x7528;<code>asMap</code>&#xFF0C;&#x60A8;&#x751A;&#x81F3;&#x53EF;&#x4EE5;&#x4F7F;&#x65B0;&#x6DFB;&#x52A0;&#x7684;&#x5C5E;&#x6027;&#x53EF;&#x89C2;&#x5BDF;&#x3002; &#x5728;&#x5185;&#x90E8;&#xFF0C;MobX&#x5C06;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;ES6&#x7684;Map&#xFF0C;&#x5B83;&#x5177;&#x6709;&#x4E0E;&#x539F;&#x751F;Map&#x7C7B;&#x4F3C;&#x7684;API&#x3002;</p><p>&#x9664;&#x4E86;&#x4F7F;&#x7528;&#x6B64;&#x4FEE;&#x9970;&#x7B26;&#xFF0C;&#x60A8;&#x8FD8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4ECE;&#x5E38;&#x89C4;&#x53EF;&#x89C2;&#x5BDF;&#x5BF9;&#x8C61;&#x5F00;&#x59CB;&#x6765;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x7684;&#x6548;&#x679C;&#x3002; &#x7136;&#x540E;&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>extendObservable()</code>API&#x6DFB;&#x52A0;&#x66F4;&#x591A;&#x53EF;&#x89C2;&#x5BDF;&#x7684;&#x5C5E;&#x6027;&#x3002; &#x5F53;&#x60A8;&#x60F3;&#x8981;&#x5EF6;&#x8FDF;&#x6DFB;&#x52A0;&#x53EF;&#x89C2;&#x5BDF;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x6B64;API&#x975E;&#x5E38;&#x6709;&#x7528;&#x3002;<br></p><hr><h4><code>computed</code></h4><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5982;&#x6B64;&#x5F3A;&#x5927;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x5176;&#x91CD;&#x8981;&#x6027;&#x65E0;&#x6CD5;&#x5F97;&#x5230;&#x8DB3;&#x591F;&#x7684;&#x91CD;&#x89C6;&#x3002; &#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E0D;&#x662F;&#x57DF;&#x7684;&#x771F;&#x5B9E;&#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x662F;&#x4F7F;&#x7528;&#x5B9E;&#x9645;&#x5C5E;&#x6027;&#x6D3E;&#x751F;&#xFF08;&#x4E5F;&#x79F0;&#x4E3A;&#x8BA1;&#x7B97;&#xFF09;&#x3002; &#x4E00;&#x4E2A;&#x5178;&#x578B;&#x7684;&#x4F8B;&#x5B50;&#x662F;person&#x5B9E;&#x4F8B;&#x7684;fullName&#x5C5E;&#x6027;&#x3002; &#x5B83;&#x6D3E;&#x751F;&#x81EA;firstName&#x548C;lastName&#x5C5E;&#x6027;&#x3002; &#x901A;&#x8FC7;&#x521B;&#x5EFA;&#x7B80;&#x5355;&#x7684;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x7B80;&#x5316;&#x57DF;&#x903B;&#x8F91;&#x3002; &#x4F8B;&#x5982;&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x53EA;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x7684;hasLastName&#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x68C0;&#x67E5;&#x4E00;&#x4E2A;&#x4EBA;&#x662F;&#x5426;&#x5728;&#x4EFB;&#x4F55;&#x5730;&#x65B9;&#x90FD;&#x6709;lastName</p><pre><code class="javascript">class Person {
    @observable firstName;
    @observable lastName;

    @computed get fullName() {
        return `${this.firstName}, ${this.lastName}`;
    }

    @computed get hasLastName() {
        return !!this.lastName;
    }
}</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016266277" src="https://static.alili.tech/img/remote/1460000016266277" alt="" title=""></span></p><p>&#x6784;&#x5EFA;&#x53EF;&#x89C2;&#x5BDF;&#x6811;&#x662F;&#x4F7F;&#x7528;MobX&#x7684;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x65B9;&#x9762;&#xFF0C;&#x8FD9;&#x4F7F;MobX&#x5F00;&#x59CB;&#x8DDF;&#x8E2A;&#x60A8;&#x7684;<code>store</code>&#x4E2D;&#x6709;&#x8DA3;&#x4E14;&#x503C;&#x5F97;&#x6539;&#x53D8;&#x7684;&#x90E8;&#x5206;&#xFF01;</p><blockquote>&#x7279;&#x6B64;&#x58F0;&#x660E;&#xFF1A; &#x5728;&#x65B0;&#x7248;&#x672C;4.0&#x4EE5;&#x4E0A;&#xFF0C;<code>asFlat</code>&#x3001;<code>asStructure</code>&#x3001;<code>asReference</code>&#x4EE5;&#x53CA;<code>asMap</code>&#x7B49;&#x5176;&#x4ED6;API&#x5DF2;&#x7ECF;&#x88AB;&#x5F03;&#x7528;&#xFF0C;&#x5177;&#x4F53;&#x4E8B;&#x5B9C;&#x9700;&#x53C2;&#x9605;&#x66F4;&#x65B0;&#x6587;&#x6863;&#x3002;</blockquote><ul><li>Part 1 - &#x6784;&#x5EFA;&#x53EF;&#x89C2;&#x5BDF;&#x6570;&#x636E;</li><li><a href="https://segmentfault.com/a/1190000016279185">Part 2 - &#x638C;&#x63E1;&#x6570;&#x636E;&#x53D8;&#x66F4;&#x65B9;&#x6CD5;</a></li><li><a href="https://segmentfault.com/a/1190000016298558">Part 3 - &#x9AD8;&#x9636;&#x5E94;&#x7528;&#x5B9E;&#x4F8B;</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高效的Mobx模式（Part 1 - 构建可观察数据）

## 原文链接
[https://segmentfault.com/a/1190000016266272](https://segmentfault.com/a/1190000016266272)

