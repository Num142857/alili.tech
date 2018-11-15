---
title: vue 单文件探索
hidden: true
categories: reprint
slug: 804c55fa
date: 2018-11-12 02:30:05
---

{{< raw >}}
<blockquote>&#x539F;&#x6587;&#x5730;&#x5740;&#xFF1A; <a href="http://www.monster1935.com/2018/09/04/vue%E5%8D%95%E6%96%87%E4%BB%B6%E6%8E%A2%E7%B4%A2/" rel="nofollow noreferrer">vue &#x5355;&#x6587;&#x4EF6;&#x63A2;&#x7D22;</a></blockquote><p>&#x4EE5; vue &#x4F5C;&#x4E3A;&#x5F00;&#x53D1;&#x6280;&#x672F;&#x6808;&#x7684;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x8005;&#xFF0C;&#x5F80;&#x5F80;&#x4F1A;&#x914D;&#x5408;&#x524D;&#x7AEF;&#x6784;&#x5EFA;&#x5DE5;&#x5177;&#xFF0C;&#x8FDB;&#x884C;&#x9879;&#x76EE;&#x7684;&#x5DE5;&#x7A0B;&#x5316;&#x7BA1;&#x7406;&#x3002;&#x6BD4;&#x5982;&#xFF0C;&#x5927;&#x5BB6;&#x5E38;&#x7528;&#x7684; vue &#x5168;&#x5BB6;&#x6876; + webpack &#x7684;&#x65B9;&#x6848;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x4E2D;&#x5927;&#x578B;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x7684;&#x5F00;&#x53D1;&#x3002;&#x914D;&#x5408; webpack &#x540E;&#xFF0C;vue &#x7684;&#x7EC4;&#x4EF6;&#x5316;&#x4F18;&#x52BF;&#x66F4;&#x52A0;&#x660E;&#x663E;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5355;&#x6587;&#x4EF6;&#x7684;&#x7EC4;&#x4EF6;&#x5316;&#x5F00;&#x53D1;&#x65B9;&#x5F0F;&#xFF0C;&#x5728;&#x5DE5;&#x4F5C;&#x5B9E;&#x8DF5;&#x4E2D;&#x642D;&#x5EFA;&#x524D;&#x7AEF;&#x9875;&#x9762;&#xFF0C;&#x4ECE;&#x800C;&#x63D0;&#x9AD8;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;&#x6709;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;<strong>&#x201C;&#x5F53;&#x6211;&#x4EEC;&#x5728;&#x5199; vue &#x5355;&#x6587;&#x4EF6;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x5199;&#x4EC0;&#x4E48;&#xFF1F;&#x201D;</strong> &#x5F88;&#x591A;&#x4EBA;&#x53EF;&#x80FD;&#x4F1A;&#x8FD9;&#x6837;&#x56DE;&#x7B54;&#xFF1A;template &#x8D1F;&#x8D23;&#x6A21;&#x677F;&#xFF0C;javascript &#x8D1F;&#x8D23;&#x903B;&#x8F91;&#xFF0C;style &#x8D1F;&#x8D23;&#x6837;&#x5F0F;&#x3002;&#x5F53;&#x56DE;&#x7B54;&#x5230;&#x8FD9;&#x91CC;&#x65F6;&#xFF0C;&#x4E00;&#x4E2A; vue &#x5F00;&#x53D1;&#x8005;&#x7684;&#x4E16;&#x754C;&#x89C2;&#x57FA;&#x672C;&#x4E0A;&#x7B97;&#x662F;&#x5F88;&#x660E;&#x786E;&#x4E86;&#x3002;&#x6211;&#x4EEC;&#x8981;&#x505A;&#x7684;&#x5C31;&#x662F;&#x5728;&#x4E00;&#x4E2A;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#x4E2D;&#x5199; template&#x3001;javascript&#x3001;style&#x3002;&#x5982;&#x679C;&#x4EC5;&#x4EC5;&#x5C40;&#x9650;&#x4E8E;&#x6B64;&#xFF0C;&#x663E;&#x7136;&#x6211;&#x4EEC;&#x65E0;&#x6CD5;&#x4ECE;&#x66F4;&#x597D;&#x7684;&#x5229;&#x7528;&#x7684;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#x670D;&#x52A1;&#x6211;&#x4EEC;&#x7684;&#x6574;&#x4E2A;&#x5F00;&#x53D1;&#x6D41;&#x7A0B;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x5C06;&#x548C;&#x5927;&#x5BB6;&#x8BA8;&#x8BBA;&#x5728; vue &#x5355;&#x6587;&#x4EF6;&#x5F00;&#x53D1;&#x4E2D;&#x7684;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#x8BBA;&#x7684;&#x95EE;&#x9898;&#x3002;</p><h2>vue &#x5355;&#x6587;&#x4EF6;&#x672C;&#x8D28;</h2><p>vue&#x5355;&#x6587;&#x4EF6;&#x662F;&#x4EE5;&#x7279;&#x5B9A;&#x6587;&#x4EF6;&#x6269;&#x5C55;&#x540D; <code>.vue</code> &#x547D;&#x540D;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x5982;&#x4E0B;&#x6240;&#x793A;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><p>ListDemo.vue</p><pre><code class="javascript">&lt;template&gt;
    &lt;div class=&quot;list-demo&quot;&gt;
        &lt;ul&gt;
            &lt;li v-for=&quot;item in list&quot; :key=&quot;item.key&quot;&gt;{{item.value}}&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
    name: &apos;ListNav&apos;,
    data() {
        return {
            list: [
                { key: &apos;home&apos;, value: &apos;&#x9996;&#x9875;&apos; },
                { key: &apos;category&apos;, value: &apos;&#x6587;&#x7AE0;&#x5206;&#x7C7B;&apos; },
                { key: &apos;tags&apos;, value: &apos;&#x6807;&#x7B7E;&apos; },
                { key: &apos;about&apos;, value: &apos;&#x5173;&#x4E8E;&#x6211;&apos; },
                { key: &apos;links&apos;, value: &apos;&#x53CB;&#x60C5;&#x94FE;&#x63A5;&apos;},
            ],
        };
    },
};
&lt;/script&gt;

&lt;style&gt;
.list-demo {
    font-size: 14px;
}
&lt;/style&gt;
</code></pre><p>&#x4EE3;&#x7801;&#x4E2D;&#x542B;&#x6709; template&#xFF0C;script&#xFF0C;style&#x3002;&#x4E09;&#x8005;&#x7684;&#x4F5C;&#x7528;&#x6B64;&#x5904;&#x5C31;&#x4E0D;&#x5728;&#x8D58;&#x8FF0;&#xFF0C;&#x5982;&#x4E0A;&#x7684;&#x7ED3;&#x6784;&#x5C55;&#x793A;&#x4E86;&#x4E00;&#x4E2A; vue &#x5355;&#x6587;&#x4EF6;&#x57FA;&#x672C;&#x7684;&#x6587;&#x4EF6;&#x7ED3;&#x6784;&#x3002;&#x5176;&#x80CC;&#x540E;&#x7684;&#x7406;&#x5FF5;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#x5BF9;&#x5E94;&#x4E86;&#x4E00;&#x4E2A;&#x529F;&#x80FD;&#x6027;&#x7EC4;&#x4EF6;&#xFF0C;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x6837;&#x5F0F;&#xFF0C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x90FD;&#x91C7;&#x7528;&#x5C31;&#x8FD1;&#x7EF4;&#x62A4;&#x7684;&#x601D;&#x60F3;&#x3002;&#x4ECE;&#x7EC4;&#x4EF6;&#x7684;&#x590D;&#x7528;&#x6027;&#xFF0C;&#x540E;&#x671F;&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x7684;&#x89D2;&#x5EA6;&#x4E0A;&#x6765;&#x8BF4;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x7406;&#x5FF5;&#x90FD;&#x5927;&#x5927;&#x7684;&#x63D0;&#x9AD8;&#x4E86;&#x7EC4;&#x4EF6;&#x5316;&#x7684;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;vue &#x7684;&#x5355;&#x6587;&#x4EF6;&#xFF0C;&#x65E2;&#x4E0D;&#x662F; js&#xFF0C;&#x4E5F;&#x4E0D;&#x662F; html&#xFF0C;&#x4E5F;&#x4E0D;&#x662F; css &#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x6587;&#x4EF6;&#x5982;&#x4F55;&#x88AB;&#x5E94;&#x7528;&#x5230;&#x9875;&#x9762;&#x4E0A;&#xFF0C;&#x8FD9;&#x4E5F;&#x5C31;&#x662F;&#x4E0B;&#x9762;&#x5C06;&#x4F1A;&#x8BF4;&#x5230;&#x7684;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;vue &#x5355;&#x6587;&#x4EF6;&#x662F;&#x5982;&#x4F55;&#x88AB;&#x5904;&#x7406;&#x6210;&#x9875;&#x9762;&#x4E2D;&#x53EF;&#x7528;&#x7684;&#x8D44;&#x6E90;&#x3002;</p><h2>vue &#x5355;&#x6587;&#x4EF6;&#x88AB;&#x5904;&#x7406;&#x7684;&#x6D41;&#x7A0B;</h2><p>vue &#x5355;&#x6587;&#x4EF6;&#x914D;&#x5408; webpack &#x6784;&#x5EFA;&#x5DE5;&#x5177;&#xFF0C;&#x5728; webpack &#x4E2D;&#x4F1A;&#x4EA4;&#x7531; vue-loader &#x6765;&#x5904;&#x7406;&#x3002;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><pre><code>{
    test: /\.vue$/,
    loader: &apos;vue-loader&apos;,
}</code></pre><p>&#x9879;&#x76EE;&#x4E2D;&#x901A;&#x8FC7; import &#x6216;&#x8005; require &#x5F15;&#x5165;&#x7684; vue &#x5355;&#x6587;&#x4EF6;&#xFF0C;&#x90FD;&#x4F1A;&#x7ECF;&#x8FC7; vue-loader &#x5904;&#x7406;&#xFF0C;vue-loader &#x5728;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#x4F1A;&#x5C06;&#x6A21;&#x677F;&#x6309;&#x7167; template&#x3001;script&#x3001;style &#x89E3;&#x6790;&#x5E76;&#x5C06;&#x5904;&#x7406;&#x7ED3;&#x679C;&#x8FD4;&#x56DE;&#xFF0C;&#x4E09;&#x79CD;&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x6587;&#x4EF6;&#x4EA4;&#x7531;&#x63A5;&#x4E0B;&#x6765;&#x7684;loader &#x8FDB;&#x884C;&#x5904;&#x7406;&#x3002;&#x5982;&#x679C;&#x8BE5;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684; components &#x58F0;&#x660E;&#xFF0C;&#x5219; components &#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x8BE5;&#x9879;&#x4F1A;&#x88AB;&#x63D2;&#x5165;&#x89E3;&#x6790;&#x540E; script &#x4EE3;&#x7801;&#x3002;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4ECE;&#x5165;&#x53E3;&#x6587;&#x4EF6; <code>main.js</code> &#x5F00;&#x59CB;&#xFF0C;&#x6240;&#x6709;&#x6D89;&#x53CA;&#x7684;&#x88AB;&#x4F9D;&#x8D56;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#x4F9D;&#x6B21;&#x7ECF;&#x5386;&#x8FD9;&#x6837;&#x7684;&#x5904;&#x7406;&#x8FC7;&#x7A0B;&#x3002;&#x4E4B;&#x540E;&#x6240;&#x6709;&#x7684;&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#x5316;&#x5C06;&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4E2D;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x8FDB;&#x884C;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E5F;&#x662F;&#x6211;&#x4EEC;&#x5E73;&#x65F6;&#x5728;&#x5F00;&#x53D1;&#x4E2D;&#x7ECF;&#x5E38;&#x7528;&#x5230;&#x7684;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x3002;&#xFF08;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x5355;&#x62C9;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x8BE6;&#x7EC6;&#x8BB2;&#x8FF0; vue-loader &#x7684;&#x5904;&#x7406;&#x6D41;&#x7A0B;&#xFF09;</p><h2>&#x5355;&#x6587;&#x4EF6;&#x7684;&#x5E38;&#x7528;&#x59FF;&#x52BF;</h2><h3>&#x6A21;&#x677F;&#x4E2D;&#x7684;&#x7EC4;&#x4EF6;&#x5F15;&#x7528;</h3><p>&#x4E00;&#x3001;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;</p><p>&#x7EC4;&#x4EF6;&#x7684;&#x62C6;&#x5206;&#x548C;&#x5D4C;&#x5957;&#xFF1A;</p><ul><li>&#x5C06;&#x5177;&#x4F53;&#x7684;&#x4E1A;&#x52A1;&#x6309;&#x7167;&#x529F;&#x80FD;&#x4EE5;&#x53CA;&#x540E;&#x671F;&#x590D;&#x7528;&#x6027;&#x65B9;&#x9762;&#x7684;&#x8003;&#x8651;&#x5212;&#x5206;&#x6210;&#x66F4;&#x5C0F;&#x7684;&#x7EC4;&#x4EF6;</li><li>&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#xFF08;&#x7236;&#x7EC4;&#x4EF6;&#xFF09;&#x5C06;&#x5C0F;&#x7684;&#x529F;&#x80FD;&#x7EC4;&#x4EF6;&#xFF08;&#x5B50;&#x7EC4;&#x4EF6;&#xFF09;&#x8FDB;&#x884C;&#x6574;&#x5408;</li></ul><p>&#x64CD;&#x4F5C;&#x624B;&#x6CD5;&#xFF1A;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x5F15;&#x5165;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;components &#x4E2D;&#x6CE8;&#x518C;&#xFF0C;template &#x4E2D;&#x6DFB;&#x52A0;&#x76F8;&#x5E94;&#x7684;&#x7EC4;&#x4EF6;&#x5F15;&#x7528;&#x6A21;&#x677F;</p><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4E5F;&#x662F;&#x6211;&#x4EEC;&#x5728;&#x8FDB;&#x884C;&#x5355;&#x6587;&#x4EF6;&#x7684;&#x5F00;&#x53D1;&#x4E2D;&#x5E38;&#x7528;&#x7684;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#x5316;&#xFF0C;&#x90FD;&#x88AB;&#x9690;&#x542B;&#x5728;&#x7EC4;&#x4EF6;&#x7684;&#x5D4C;&#x5957;&#x5173;&#x7CFB;&#x548C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4E2D;&#x3002;&#x5F00;&#x53D1;&#x8005;&#x53EA;&#x9700;&#x8981;&#x5173;&#x5FC3;&#x7EC4;&#x4EF6;&#x7684;&#x5F15;&#x5165;&#xFF0C;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x903B;&#x8F91;&#x4E2D;&#x6CE8;&#x518C;&#x8BE5;&#x7EC4;&#x4EF6;&#xFF0C;&#x5E76;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x4E2D;&#x4EE5;&#x6807;&#x7B7E;&#x7684;&#x65B9;&#x5F0F;&#x5F15;&#x5165;&#x7EC4;&#x4EF6;&#x3002;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#x5F85;&#x5F15;&#x5165;&#x7684;&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#x5316;&#x65F6;&#x673A;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; v-if &#x6307;&#x4EE4;&#x5728;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4E2D;&#x8FDB;&#x884C;&#x63A7;&#x5236;&#x3002;</p><p>&#x4E8C;&#x3001;&#x9002;&#x7528;&#x573A;&#x666F;</p><p>&#x5927;&#x90E8;&#x5206;&#x573A;&#x666F;&#x4E0B;&#x6211;&#x4EEC;&#x90FD;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x6837;&#x7684;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x7EC4;&#x4EF6;&#x5316;&#x7684;&#x5F00;&#x53D1;&#x3002;&#x8FD9;&#x79CD;&#x6A21;&#x5F0F;&#x7684;&#x6709;&#x4E00;&#x4E2A;&#x7279;&#x70B9;&#xFF1A; &#x7EC4;&#x4EF6;&#x7684;&#x5F15;&#x5165;&#x901A;&#x8FC7;&#x7EC4;&#x4EF6;&#x6CE8;&#x518C;&#x548C;&#x6A21;&#x677F;&#x4E2D;&#x5199;&#x5165;&#x5BF9;&#x5E94;&#x7684;&#x7EC4;&#x4EF6;&#x7684;&#x6807;&#x7B7E;&#x6765;&#x5B8C;&#x6210;&#x3002;<strong>&#x6A21;&#x677F;&#x4E2D;&#x901A;&#x8FC7;&#x6807;&#x7B7E;&#x6765;&#x5F15;&#x5165;&#x7EC4;&#x4EF6;&#x8FD9;&#x4E00;&#x6B65;&#x5FC5;&#x4E0D;&#x53EF;&#x5C11;</strong>&#xFF0C;&#x8FD9;&#x4E2A;&#x7279;&#x70B9;&#x5728;&#x67D0;&#x4E9B;&#x4E1A;&#x52A1;&#x573A;&#x666F;&#x4E0B;&#x53EF;&#x80FD;&#x7ED9;&#x5F00;&#x53D1;&#x8005;&#x5E26;&#x6765;&#x4E86;&#x4E00;&#x5B9A;&#x7684;&#x91CD;&#x590D;&#x5DE5;&#x4F5C;&#x91CF;&#x3002;</p><h3>API &#x5F0F;&#x7684;&#x8C03;&#x7528;</h3><p>API &#x5F0F;&#x7684;&#x8C03;&#x7528;&#x6307;&#x7684;&#x662F;&#x624B;&#x52A8;&#x521B;&#x5EFA;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4E2D;&#x65E0;&#x9700;&#x5F15;&#x5165;&#x7EC4;&#x4EF6;&#x548C;&#x6A21;&#x677F;&#x6807;&#x7B7E;&#x5360;&#x4F4D;&#xFF0C;&#x5728;&#x66B4;&#x9732;&#x7684; API &#x4E2D;&#x63A7;&#x5236;&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#x5316;&#x4E0E;&#x663E;&#x793A;&#x3002;</p><p>&#x4E00;&#x3001;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;</p><ul><li>&#x529F;&#x80FD;&#x6A21;&#x5757;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x5165;&#x53E3; js &#x6765;&#x63A7;&#x5236;&#x8BE5;&#x529F;&#x80FD;&#x6A21;&#x5757;&#x4E0B;&#x5355;&#x6587;&#x4EF6;&#x5B9E;&#x4F8B;&#x7684;&#x6240;&#x6709;&#x529F;&#x80FD;&#x903B;&#x8F91;</li><li>&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;&#x8BE5;&#x529F;&#x80FD;&#x6A21;&#x5757;&#x65F6;&#xFF0C;&#x8C03;&#x7528;&#x529F;&#x80FD;&#x6A21;&#x5757;&#x4E0B;&#x7684; js&#xFF0C;&#x4F20;&#x5165;&#x90E8;&#x5206;&#x53C2;&#x6570;</li></ul><p>&#x64CD;&#x4F5C;&#x624B;&#x6CD5;&#xFF1A;</p><p>Confirm.vue</p><pre><code class="html">&lt;template&gt;
    &lt;el-dialg
        title=&quot;test&quot;
        :visible.sync=&quot;visible&quot;&gt;
        {{content}}
        &lt;el-button @click=&quot;handleCancelClick&quot;&gt;cancel&lt;/el-button&gt;
        &lt;el-button @click=&quot;handleOkClick&quot;&gt;ok&lt;/el-button&gt;
    &lt;/el-dialg&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
    name: &apos;Confirm&apos;,
    data() {
        return {
            visible: false,
            content: &apos;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;confirm dialog&apos;,
            callback: null,
        };
    },
    methods: {
        handleCancelClick() {
            this.callback(&apos;cancel&apos;);
        },
        handleOkClick() {
            this.callback(&apos;confirm&apos;);
        },
    },
};
&lt;/script&gt;
</code></pre><p>confirm.js</p><pre><code class="js">import Vue from &apos;vue&apos;;
import Confirm from &apos;./confirm&apos;;

const ConfirmConstructor = Vue.extend(Confirm);

const confirm = (content) =&gt; {
    let confirmInstance = new ConfirmConstructor({
        data: {
            content,
        },
    });
    confirmInstance.vm = confirmInstance.$mount();
    confirmInstance.vm.visible = true;
    // &#x624B;&#x52A8;&#x63D2;&#x5165;&#x76EE;&#x7684; dom
    document.body.appendChild(confirmInstance.vm.$el);
    confirmInstance.vm.callback = action =&gt; {
        return new Promise((resolve, reject) =&gt; {
          resolve(action);
        });
    };
    return confirmInstance.vm;
};
</code></pre><p>&#x5982;&#x4E0A;&#x6240;&#x793A;&#xFF0C;&#x7ED9;&#x51FA;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x786E;&#x8BA4;&#x5F39;&#x6846;&#x7684;&#x573A;&#x666F;&#x5B9E;&#x73B0;&#x3002;&#x786E;&#x8BA4;&#x5F39;&#x6846;&#x5728;&#x5F88;&#x591A;&#x7528;&#x6237;&#x4EA4;&#x4E92;&#x4E2D;&#x662F;&#x4E00;&#x4E2A;&#x5FC5;&#x987B;&#x7684;&#x4EA4;&#x4E92;&#x5F62;&#x5F0F;&#x3002;&#x5F88;&#x591A;&#x7EC4;&#x4EF6;&#x5E93;&#x4E5F;&#x91C7;&#x7528;&#x4E0A;&#x9762;&#x8FD9;&#x79CD; API &#x5F0F;&#x7684;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x3002;&#x8C03;&#x7528;&#x65B9;&#x4EC5;&#x4EC5;&#x901A;&#x8FC7; api &#x7684;&#x8C03;&#x7528;&#xFF0C;&#x5C31;&#x80FD;&#x5B9E;&#x73B0;&#x8BE5;&#x529F;&#x80FD;&#x6A21;&#x5757;&#x7684;&#x5F15;&#x7528;&#x3002;&#x8FD9;&#x6837;&#x5C31;&#x907F;&#x514D;&#x4E86;&#x5728; template &#x4E2D;&#x901A;&#x8FC7;&#x6807;&#x7B7E;&#x5360;&#x4F4D;&#x7684;&#x65B9;&#x5F0F;&#x5F15;&#x7528;&#x3002;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x5C31;&#x662F;&#x624B;&#x52A8;&#x63A5;&#x7BA1;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#x5316;&#xFF0C;&#x901A;&#x8FC7; Vue.extend &#x83B7;&#x5F97;&#x8BE5;&#x7EC4;&#x4EF6;&#x5BF9;&#x5E94;&#x7684; Vue &#x7684;&#x5B50;&#x7C7B;&#xFF0C;&#x5728;&#x66B4;&#x9732;&#x7ED9;&#x8C03;&#x7528;&#x7684; api &#x4E2D;&#x53BB;&#x5B9E;&#x4F8B;&#x5316;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x3002;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x8FD8;&#x8981;&#x5B8C;&#x6210;&#x4E00;&#x4E9B;&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x7684;&#x6CE8;&#x5165;&#xFF0C;&#x903B;&#x8F91;&#x76F8;&#x5173;&#x4EE5;&#x53CA;&#x624B;&#x52A8;&#x5C06;&#x8BE5;&#x7EC4;&#x4EF6;&#x63D2;&#x5165;&#x5230;&#x76EE;&#x7684; dom &#x4E2D;&#x3002;&#x624B;&#x52A8;&#x7684;&#x6CE8;&#x5165; dom &#x662F;&#x8BE5;&#x79CD;&#x65B9;&#x5F0F;&#x7684;&#x4E00;&#x4E2A;&#x5F88;&#x5927;&#x7279;&#x70B9;&#xFF0C;&#x901A;&#x8FC7;&#x5728; api &#x4E2D;&#x52A8;&#x6001;&#x7684;&#x6CE8;&#x5165;&#x76EE;&#x7684; dom&#xFF0C;&#x907F;&#x514D;&#x6211;&#x4EEC;&#x5728;&#x5404;&#x4E2A;&#x4E1A;&#x52A1;&#x7EC4;&#x4EF6;&#x4E2D;&#x8C03;&#x7528;&#x8BE5;&#x529F;&#x80FD;&#x6A21;&#x5757;&#x65F6;&#x91CD;&#x590D;&#x6027;&#x7684;&#x5728;&#x4E1A;&#x52A1;&#x7EC4;&#x4EF6; template &#x4E2D;&#x624B;&#x5199;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x3002;</p><p>&#x4E8C;&#x3001;&#x9002;&#x7528;&#x573A;&#x666F;</p><ul><li>&#x529F;&#x80FD;&#x805A;&#x5408;&#x5EA6;&#x9AD8;&#xFF0C;&#x7EC4;&#x4EF6;&#x5185;&#x903B;&#x8F91;&#x7B80;&#x5355;&#xFF0C;&#x8F93;&#x5165;&#x8F93;&#x51FA;&#x8F83;&#x4E3A;&#x5355;&#x4E00;&#xFF0C;&#x6BD4;&#x5982;&#x4E00;&#x4E9B;&#x529F;&#x80FD;&#x8F83;&#x4E3A;&#x72EC;&#x7ACB;&#x7684;&#x5F39;&#x6846;</li><li>&#x4E00;&#x4E9B;&#x7279;&#x6B8A;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x6307;&#x4EE4;&#x5F00;&#x53D1;&#xFF0C;&#x6BD4;&#x5982;&#x5728;&#x4E00;&#x4E9B;&#x7279;&#x6B8A;&#x573A;&#x666F;&#x7684;&#x6307;&#x4EE4;&#xFF0C;&#x53EF;&#x4EE5;&#x590D;&#x7528;&#x4E00;&#x4E9B;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#xFF0C;&#x901A;&#x8FC7;&#x5728;&#x6307;&#x4EE4;&#x7684;&#x94A9;&#x5B50;&#x4E2D;&#x5B9E;&#x4F8B;&#x5316;&#x7EC4;&#x4EF6;&#x5BF9;&#x5E94;&#x7684; vue &#x5B50;&#x7C7B;&#xFF0C;&#x6309;&#x7167;&#x7279;&#x5B9A;&#x7684;&#x903B;&#x8F91;&#x63D2;&#x5165;&#x5230;&#x76EE;&#x7684; dom &#x4E2D;&#xFF08;&#x4F8B;&#x5982;&#xFF1A;element-ui&#x7684;v-loading&#xFF09;</li></ul><h3>&#x533A;&#x522B;&#x548C;&#x5171;&#x6027;</h3><p>&#x5171;&#x6027;&#xFF1A;&#x901A;&#x8FC7;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x5E94;&#x7EC4;&#x4EF6;&#x5B8C;&#x6210;&#x7EC4;&#x4EF6;&#x7684;&#x529F;&#x80FD;&#x903B;&#x8F91;</p><p>&#x533A;&#x522B;&#xFF1A;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x65F6;&#x673A;&#x548C;&#x65B9;&#x5F0F;&#x4E0D;&#x540C;&#x3002;&#x6A21;&#x677F;&#x5F0F;&#x7684;&#x5F15;&#x5165;&#x901A;&#x8FC7;&#x7EC4;&#x4EF6;&#x6CE8;&#x518C;&#x548C;&#x6807;&#x7B7E;&#x5F15;&#x5165;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x4F7F;&#x7528;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#x3002;&#x6807;&#x7B7E;&#x5F15;&#x5165;&#x89E3;&#x51B3;&#x4E86;&#x5B50;&#x7EC4;&#x4EF6;&#x63D2;&#x5165;&#x7684; dom &#x4F4D;&#x7F6E;&#x95EE;&#x9898;&#xFF0C;&#x5F00;&#x53D1;&#x8005;&#x65E0;&#x9700;&#x5173;&#x5FC3;&#x3002;API &#x5F0F;&#x7684;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;&#xFF0C;&#x5728; API &#x8C03;&#x7528;&#x65F6;&#x624B;&#x52A8;&#x5B9E;&#x4F8B;&#x5316;&#x7EC4;&#x4EF6;&#xFF0C;&#x9700;&#x8981;&#x624B;&#x52A8;&#x63A7;&#x5236;&#x63D2;&#x5165;&#x5230;&#x76EE;&#x7684; dom&#x3002;</p><h2>&#x603B;&#x7ED3;</h2><p>vue &#x7684;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#x63D0;&#x4F9B;&#x4E86; vue &#x7684;&#x7EC4;&#x4EF6;&#x5316;&#x5F00;&#x53D1;&#x601D;&#x8DEF;&#xFF0C;&#x5176;&#x672C;&#x8D28;&#x5728;&#x5BFC;&#x51FA; vue &#x7684;&#x4E00;&#x4E9B;&#x5173;&#x952E;&#x5C5E;&#x6027;&#xFF0C;&#x6BD4;&#x5982;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#xFF0C;methods&#xFF0C;computed&#xFF0C; watch&#xFF0C;props&#x7B49;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E0A;&#x8FF0;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x6765;&#x4F7F;&#x7528;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#xFF0C;&#x76EE;&#x7684;&#x5728;&#x4E8E;&#x5DE5;&#x7A0B;&#x5185;&#x90E8;&#x5C3D;&#x91CF;&#x51CF;&#x5C11;&#x91CD;&#x590D;&#x7684;&#x6A21;&#x677F;&#x4EE3;&#x7801;&#xFF0C;&#x7EC4;&#x4EF6;&#x89E3;&#x8026;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 单文件探索

## 原文链接
[https://segmentfault.com/a/1190000016269009](https://segmentfault.com/a/1190000016269009)

