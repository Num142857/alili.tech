---
title: 'vue零碎记忆' 
date: 2018-11-20 2:30:10
hidden: true
slug: y7ykphjnxo9
categories: [reprint]
---

{{< raw >}}
<p>Vue &#x96F6;&#x788E;&#x603B;&#x7ED3;</p><p>1&#xFF1A;&#x4EC0;&#x4E48;&#x4E8B;Vue?</p><pre><code>Vue&#x662F;&#x4E00;&#x4E2A;&#x6E10;&#x8FDB;&#x5F0F;&#x7684;&#x6846;&#x67B6;&#xFF08;&#x53EF;&#x4EE5;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x7684;&#xFF0C;&#x6709;&#x9636;&#x6BB5;&#x6027;&#x7684;&#x4F7F;&#x7528;vue,js&#xFF0C;&#x4E0D;&#x5FC5;&#x5728;&#x5F00;&#x59CB;&#x5C31;&#x4F7F;&#x7528;&#x6240;&#x6709;&#x7684;&#x8BBE;&#x5907;&#xFF09;</code></pre><p>2&#xFF1A;Vue&#x7684;&#x7279;&#x70B9;&#xFF1F;</p><pre><code>* &#x89E3;&#x8026;&#x6570;&#x636E;&#x4E0E;&#x89C6;&#x56FE;
* &#x7EC4;&#x4EF6;&#x590D;&#x7528;
* &#x524D;&#x7AEF;&#x8DEF;&#x7531;
* &#x72B6;&#x6001;&#x7BA1;&#x7406;
* &#x865A;&#x62DF;DOM     
</code></pre><p>3&#xFF1A;&#x6BD4;&#x8F83;&#x4F20;&#x7EDF;&#xFF1F;</p><pre><code>&#x4E07;&#x91D1;&#x6CB9;&#x64CD;&#x4F5C;&#xFF1A; jQuery + RequireJS(SeaJS) + artTemplate(doT) + Gulp(Grunt)
&#x73B0;&#x5728;&#xFF1A; &#x51FA;&#x73B0;&#x4E86;React&#x3001; Angular &#x76EE;&#x7684;&#x662F;&#x4E3A;&#x4E86;&#x6EE1;&#x8DB3;&#x4F7F;&#x7528;&#x5FC3;&#x5F97;&#x5F00;&#x53D1;&#x9700;&#x6C42;&#xFF0C;&#x50CF;&#x5355;&#x9875;&#x9762;&#x5BCC;&#x5E94;&#x7528;&#xFF0C; &#x63D0;&#x5347;&#x5F00;&#x53D1;&#x6548;&#x7387;&#xFF0C;&#x964D;&#x4F4E;&#x7EF4;&#x62A4;&#x6210;&#x672C;&#xFF0C;&#x7EC4;&#x4EF6;&#x89E3;&#x8026;&#x3002; </code></pre><p>4&#xFF1A; Vue&#x7684;&#x5B9E;&#x4F8B;&#x6570;&#x636E;&#xFF1F;</p><pre><code>    &#x5B58;&#x50A8;&#x5728;&#x5B9E;&#x4F8B;&#x65B9;&#x7136;data&#x9009;&#x9879;&#x4E2D;&#xFF0C;&#x6240;&#x6709;&#x5E94;&#x7528;&#x5230;&#x7684;&#x6570;&#x636E;&#x90FD;&#x4F1A;&#x9884;&#x5148;&#x5728;data&#x5185;&#x751F;&#x547D;&#xFF0C;&#x7528;&#x6765;&#x4FDD;&#x8BC1;&#x4E0D;&#x81F3;&#x4E8E;&#x5C06;&#x6570;&#x636E;&#x6563;&#x843D;&#x5728;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4E2D;&#x3002;</code></pre><p>5&#xFF1A;Vue&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;?</p><pre><code>created: &#x5728;&#x5B9E;&#x4F8B;&#x521B;&#x5EFA;&#x5B8C;&#x6210;&#x540E;&#x8C03;&#x7528;&#xFF0C;&#x6B64;&#x9636;&#x6BB5;&#x4E3B;&#x8981;&#x662F;&#x5B8C;&#x6210;&#x6570;&#x636E;&#x7684;&#x89C2;&#x6D4B;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x6CA1;&#x6709;&#x6302;&#x8F7D;&#xFF0C;$el&#x8FD8;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#xFF0C;&#x9700;&#x8981;&#x521D;&#x59CB;&#x5316;&#x5904;&#x7406;&#x4E00;&#x4E9B;&#x6570;&#x636E;&#x65F6;&#x4F1A;&#x6BD4;&#x8F83;&#x6709;&#x7528;&#x3002;
mounted&#xFF1A; el&#x5DF2;&#x7ECF;&#x6302;&#x8F7D;&#x5230;&#x5B9E;&#x4F8B;&#x4E0A;&#x4F7F;&#x7528;&#x4E86;&#xFF0C;&#x4E00;&#x822C;&#x6211;&#x4EEC;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4F1A;&#x5728;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x3002;
beforeDestory&#xFF1A; &#x5B9E;&#x4F8B;&#x9500;&#x6BC1;&#x4E4B;&#x524D;&#x8C03;&#x7528;&#xFF0C; &#x4E3B;&#x8981;&#x89E3;&#x7ED1;&#x4E00;&#x4E9B;&#x4F7F;&#x7528;addEventListener&#x76D1;&#x542C;&#x7684;&#x4E8B;&#x4EF6;&#x7B49;&#x3002;</code></pre><p>&lt;div id=&quot;app&quot;&gt;</p><pre><code>"{{"date"}}"</code></pre><p>&lt;/div&gt;<br>&lt;script&gt;</p><pre><code>var app = new Vue({
    el:&quot;#app&quot;,
    data: {
        data: new Date();
    },
    mounted&#xFF1A; function () {
        var _this = this;
        _this.timer = setInterVal(() {
            _this.date = new Date();   
        }, 1000);
    },
    brforeDestory: () {
        if (this.timer) {
            clearInterVal(this.timer); // &#x5F53;Vue&#x5B9E;&#x4F8B;&#x9500;&#x6BC1;&#x524D;&#xFF0C;&#x6E05;&#x9664;&#x6211;&#x4EEC;&#x7684;&#x5B9A;&#x65F6;&#x5668;&#x3002;
        }
    } 
});</code></pre><p>&lt;/script&gt;<br>&#x6CE8;&#x610F;&#xFF1A; link&#x7684;&#x5185;&#x5BB9;&#x4F1A;&#x88AB;&#x6E32;&#x67D3;&#x6210;&#x4E00;&#x4E2A;&#x5177;&#x4F53;&#x7684;&#x70B9;&#x51FB;&#x529F;&#x80FD;&#x7684;a&#x6807;&#x7B7E;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x7EAF;&#x6587;&#x672C;&#xFF0C; &#x5982;&#x679C;&#x5C06;&#x7528;&#x6237;&#x4EA7;&#x751F;&#x7684;&#x5185;&#x5BB9;&#x4F7F;&#x7528;v-html&#x76F4;&#x63A5;&#x8F93;&#x51FA;&#xFF0C;&#x6709;&#x53EF;&#x80FD;&#x51FA;&#x73B0;XSS&#x653B;&#x51FB;&#xFF08;&#x8DE8;&#x7AD9;&#x811A;&#x672C;&#x653B;&#x51FB;&#xFF09;</p><pre><code>        &#x5728;vue&#x4E2D;&#x53EA;&#x652F;&#x6301;"{{""}}"&#x63D2;&#x503C;&#x6216;&#x8005;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x7BA1;&#x9053;&#x7B26;&#x53F7;| &#x4E0D;&#x652F;&#x6301;&#x8BED;&#x53E5;&#x548C;&#x6D41;&#x7A0B;&#x63A7;&#x5236;&#xFF0C;&#x5728;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#xFF0C;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x7528;&#x6237;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C; &#x53EA;&#x80FD;&#x4F7F;&#x7528;Vue&#x767D;&#x540D;&#x5355;&#x5185;&#x7684;&#x5168;&#x5C40;&#x53D8;               &#x91CF;&#xFF0C;&#x4F8B;&#x5982;Math,Date</code></pre><p>6&#xFF1A;&#x5173;&#x952E;&#x5B57;<br>v-pre [&#x5982;&#x679C;&#x60F3;&#x663E;&#x793A;"{{""}}"&#x6807;&#x7B7E;&#xFF0C; &#x800C;&#x4E0D;&#x8FDB;&#x884C;&#x66FF;&#x6362;&#xFF0C; &#x4F7F;&#x7528;v-pre&#x5373;&#x53EF;&#x8DF3;&#x8FC7;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x548C;&#x5B83;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;&#x3011;</p><pre><code>          &#x5B9E;&#x4F8B;&#xFF1A;&lt;span v-pre&gt;"{{" &#x8FD9;&#x91CC;&#x7684;&#x5185;&#x5BB9;&#x662F;&#x4E0D;&#x4F1A;&#x88AB;&#x7F16;&#x8BD1;&#x7684; "}}"&lt;/span&gt;
v-cloak[&#x89E3;&#x51B3;&#x521D;&#x59CB;&#x5316;&#x6162;&#x5BFC;&#x81F4;&#x9875;&#x9762;&#x95EA;&#x52A8;&#x7684;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;]
            [&#x5B83;&#x4E0D;&#x9700;&#x8981;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C; &#x5B83;&#x4F1A;&#x5728;Vue&#x5B9E;&#x4F8B;&#x7ED3;&#x675F;&#x7F16;&#x8BD1;&#x7684;&#x65F6;&#x5019;&#x4ECE;&#x7ED1;&#x5B9A;&#x7684;HTML&#x5143;&#x7D20;&#x4E0A;&#x9762;&#x79FB;&#x9664;&#xFF0C;&#x7ECF;&#x5E38;&#x4E0E;CSS&#x7684;display:none&#x8054;&#x5408;&#x4F7F;&#x7528;&#x3002;]
v-once [&#x4F5C;&#x7528;&#x662F;&#x5B9A;&#x4E49;&#x5B83;&#x7684;&#x5143;&#x7D20;&#x6216;&#x8005;&#x7EC4;&#x4EF6;&#x503C;&#x6E32;&#x67D3;&#x4E00;&#x6B21;&#xFF0C; &#x5305;&#x62EC;&#x5143;&#x7D20;&#x6216;&#x8005;&#x7EC4;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x5B50;&#x96C6;]
            [&#x9996;&#x6B21;&#x6E32;&#x67D3;&#x540E;&#xFF0C;&#x4E0D;&#x518D;&#x968F;&#x7740;&#x6570;&#x636E;&#x7684;&#x53D8;&#x5316;&#x800C;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x5C06;&#x88AB;&#x89C6;&#x4E3A;&#x9759;&#x6001;&#x5185;&#x5BB9;&#xFF0C;&#x4E0D;&#x968F;&#x6570;&#x636E;&#x7684;&#x53D8;&#x5316;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x88AB;&#x89C6;&#x4E3A;&#x9759;&#x6001;&#x6570;&#x636E;]
v-if  v-else-if  v-else  [&#x4E3B;&#x8981;&#x7528;&#x4E8E;&#x6761;&#x4EF6;&#x6E32;&#x67D3;]
v-show [&#x4E3B;&#x8981;&#x7528;&#x4E8E;&#x6761;&#x4EF6;&#x6E32;&#x67D3;][&#x7B80;&#x5355;&#x7684;CSS&#x5C5E;&#x6027;&#x5207;&#x6362;]
            &#x6CE8;&#x610F;: v-show&#x53EA;&#x662F;&#x7B80;&#x5355;&#x5730;CSS&#x5C5E;&#x6027;&#x5207;&#x6362;&#xFF0C; &#x65E0;&#x8BBA;&#x6761;&#x4EF6;&#x662F;&#x5426;&#x662F;&#x771F;&#x4E0E;&#x5426;&#xFF0C; &#x90FD;&#x4F1A;&#x88AB;&#x7F16;&#x8BD1;&#xFF0C; &#x76F8;&#x6BD4;&#x4E4B;&#x4E0B;&#xFF0C; v-if&#x66F4;&#x9002;&#x5408;&#x6761;&#x4EF6;&#x4E0D;&#x7ECF;&#x5E38;&#x6539;&#x53D8;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x7684;&#x5207;&#x6362;&#x5F00;&#x9500;&#x76F8;&#x5BF9;
             &#x8F83;&#x5927;&#xFF0C; &#x800C;v-show&#x9002;&#x5E94;&#x4E8E;&#x9891;&#x7E41;&#x5207;&#x6362;&#x6761;&#x4EF6;&#x3002; 
v-for [&#x6570;&#x636E;&#x904D;&#x5386;&#x3010;&#x8FED;&#x4EE3;&#x6570;&#x7EC4;&#x3001;&#x8FED;&#x4EE3;&#x5BF9;&#x8C61;&#x3001;&#x8FED;&#x4EE3;&#x4E00;&#x4E2A;&#x6574;&#x6570;&#x7B49;&#x3011;]</code></pre><p>&lt;div id=&quot;app&quot; v-cloak&gt;</p><pre><code>"{{"message"}}"</code></pre><p>&lt;/div&gt;<br>[v-cloak] {</p><pre><code>display: none</code></pre><p>}</p><p>7&#xFF1A; &#x8FC7;&#x6EE4;&#x5668;<br>&#x7528;&#x6CD5;&#xFF1A; &#x652F;&#x6301;&#x5728;"{{""}}"&#x63D2;&#x503C;&#x7684;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x7BA1;&#x9053;&#x7B26; &quot; | &quot;<br>&lt;div&gt;</p><pre><code>"{{" date | formDate "}}"</code></pre><p>&lt;/div&gt;<br>&lt;script&gt;</p><pre><code>var app = new Vue({
    el:&quot;#app&quot;,
    data: {
        data: new Date();
    },
filters: {
        formDtate: function (value) {
            var date = new Date(value);
            var year = date.getFullUYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            return year + &apos;-&apos; + month + &apos;-&apos; + day + &apos;&apos; + hours + &apos;:&apos; + minute + &apos;:&apos; + seconds;  
        }
}
});</code></pre><p>&lt;/script&gt;<br>&#x8FC7;&#x6EE4;&#x5668;&#x8FD8;&#x53EF;&#x4EE5;&#x4E32;&#x8054;&#xFF0C; &#x800C;&#x4E14;&#x53EF;&#x4EE5;&#x63A5;&#x6536;&#x53C2;&#x6570;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;<br>"{{"message | filterA | filterB"}}"<br>&#x8FC7;&#x6EE4;&#x5668;&#x8FD8;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x53C2;&#x6570;&#x3010;&#x8FD9;&#x91CC;&#x7684;&#x5B57;&#x7B26;&#x4E32;arg1&#x548C;arg2&#x5C06;&#x5206;&#x522B;&#x4F20;&#x7ED9;&#x8FC7;&#x6EE4;&#x5668;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x548C;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x56E0;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x6570;&#x636E;&#x672C;&#x8EAB;&#x3011;<br>"{{"message | filterA(&apos;arg1&apos;, &apos;arg2&apos;)"}}"<br>8&#xFF1A; &#x8BA1;&#x7B97;&#x5C5E;&#x6027;</p><pre><code>&#x6BCF;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x90FD;&#x5305;&#x542B;&#x4E00;&#x4E2A;getter&#x548C;setter&#x901A;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x4F1A;&#x7528;&#x9ED8;&#x8BA4;&#x7684;getter&#x65B9;&#x6CD5;&#x6765;&#x8BFB;&#x53D6;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x3002;</code></pre><p>&lt;div id=&quot;app1&quot;&gt;&lt;/div&gt;<br>&lt;div id=&quot;app2&quot;&gt;</p><pre><code>"{{"reversedText"}}"</code></pre><p>&lt;/div&gt;<br>&lt;script&gt;</p><pre><code>var app1 = new Vue({
    el:&quot;#app1&quot;,
    data: {
        text: 123.456
    }
});
var app2 = new Vue({
    el:&quot;#app2&quot;,
    computed:  {
        reversedText () {
            return app1.text.aplit(&apos;,&apos;).reverse().join(&apos;,&apos;);
        }
    }
});</code></pre><p>&lt;/script&gt;<br>&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x662F;&#x7ED9;&#x4E88;&#x5B83;&#x7684;&#x4F9D;&#x8D56;&#x7F13;&#x5B58;&#x7684;&#xFF0C;&#x4E00;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x6240;&#x4F9D;&#x8D56;&#x7684;&#x6570;&#x636E;&#x53D1;&#x751F;&#x7684;&#x65F6;&#x5019;&#x4ED6;&#x4F1A;&#x91CD;&#x65B0;&#x53D6;&#x503C;&#x3002;<br>9&#xFF1A;&#x6570;&#x636E;&#x7ED1;&#x5B9A;</p><pre><code>9.1&#xFF1A; class&#x7ED1;&#x5B9A;&#x3010;&#x5BF9;&#x8C61;&#x7ED1;&#x5B9A;,&#x6570;&#x7EC4;&#x7ED1;&#x5B9A;&#x3011;
    </code></pre><p>&lt;div :class=&quot;{ &apos;active&apos;: isActive }&quot;&gt;&lt;div&gt;<br>&lt;div :class=&quot;{ &apos;active&apos;: isActive, &apos;error&apos;: isError }&quot;&gt;&lt;div&gt;</p><p>&lt;div :class=&quot;[ activeCls, errorCls ]&quot;&gt;&lt;/div&gt;</p><p>&lt;div :class=&quot;[{ &apos;active&apos;: isActive }, errorCls]&quot;&gt;&lt;/div&gt;<br>&#x6CE8;&#x610F;&#xFF1A; &#x5982;&#x679C;&#x76F4;&#x63A5;&#x5728;&#x5B9A;&#x4E49;&#x7684;&#x7EC4;&#x4EF6;&#x4E0A;&#x4F7F;&#x7528;class&#x6216;&#x8005;&#xFF1A;class,&#x6837;&#x5F0F;&#x89C4;&#x5219;&#x4F1A;&#x76F4;&#x63A5;&#x5E94;&#x7528;&#x5230;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x6839;&#x5143;&#x7D20;&#x4E0A;&#x9762;<br>10&#xFF1A; &#x6570;&#x636E;&#x76D1;&#x6D4B;&#xFF1F;</p><pre><code>&#x6570;&#x7EC4;&#x76D1;&#x6D4B;&#xFF1A;
        Vue&#x76D1;&#x6D4B;&#x6570;&#x7EC4;&#x7684;&#x53D8;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x6574;&#x4E2A;&#x5217;&#x8868;&#xFF0C;&#x800C;&#x662F;&#x6700;&#x5927;&#x5316;&#x7684;&#x590D;&#x7528;DOM&#x5143;&#x7D20;&#xFF0C;&#x66FF;&#x6362;&#x7684;&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x542B;&#x6709;&#x76F8;&#x540C;&#x5143;&#x7D20;&#x7684;&#x9879;&#x662F;&#x4E0D;&#x4F1A;&#x88AB;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C; &#x56E0;&#x6B64;
        &#x53EF;&#x4EE5;&#x5927;&#x80C6;&#x7684;&#x7528;&#x65B0;&#x6570;&#x7EC4;&#x66FF;&#x6362;&#x65E7;&#x6570;&#x7EC4;&#x3002;</code></pre><p>app.books = app.books.filter((item) =&gt; {</p><pre><code>return item.name.match(/javascript/);</code></pre><p>})<br>11: &#x4E8B;&#x4EF6;&#x4E0E;&#x4FEE;&#x9970;&#x7B26;&#xFF1F;</p><pre><code>* .stop
* .prevent
* .capture
* .self
* .once
</code></pre><p><a>&#x963B;&#x6B62;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;</a></p><p>&lt;form @submit.prevent=&quot;handle&quot;&gt;&lt;/form&gt; &#x63D0;&#x4EA4;&#x4E8B;&#x4EF6;&#x4E0D;&#x518D;&#x91CD;&#x590D;&#x52A0;&#x8F7D;</p><p><a></a> &#x4FEE;&#x9970;&#x7B26;&#x4E32;&#x8054;</p><p><a></a> &#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;&#x4F7F;&#x7528;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x6A21;&#x5F0F;</p><p>&lt;div @click.self=&quot;handle&quot;&gt;...&lt;/div&gt; &#x53EA;&#x6709;&#x4E8B;&#x4EF6;&#x5728;&#x5143;&#x7D20;&#x672C;&#x8EAB;&#xFF08;&#x800C;&#x4E0D;&#x662F;&#x5B50;&#x5143;&#x7D20;&#xFF09;&#x89E6;&#x53D1;&#x65F6;&#x51FA;&#x53D1;&#x56DE;&#x8C03;</p><p>&lt;div @click.once=&quot;helf&quot;&gt;...&lt;/div&gt; &#x53EA;&#x662F;&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#xFF0C;&#x7EC4;&#x4EF6;&#x540C;&#x6837;&#x9002;&#x7528;</p><pre><code>
&#x4E8B;&#x4EF6;&#x4FEE;&#x9970;&#x7B26;&#x3010;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6309;&#x952E;&#x4FEE;&#x9970;&#x7B26;&#x3011;</code></pre><p>&lt;input @keyup.13=&quot;submit&quot;/&gt;<br>@keyup.enter<br>@keyup.tab<br>...<br>@keyup. delete/esc/space/up/down/left/right</p><pre><code>&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x914D;&#x7F6E;&#x5177;&#x4F53;&#x6309;&#x952E;
Vue.config.keyCodes.f1 = f12
&#x53EF;&#x4EE5;&#x914D;&#x5408;&#x9F20;&#x6807;&#x6309;&#x952E;</code></pre><p>@click.ctrl alt/shift/meta......<br>12: v-model&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;</p><pre><code>v-mode&#x7ED1;&#x5B9A;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x7528;&#x4E2D;&#x6587;&#x8F93;&#x5165;&#x6CD5;&#x8F93;&#x5165;&#x4E2D;&#x6587;&#xFF0C;&#x4E00;&#x822C;&#x5728;&#x6CA1;&#x6709;&#x9009;&#x5B9A;&#x8BCD;&#x524D;&#x4E5F;&#x5C31;&#x662F;&#x5728;&#x62FC;&#x97F3;&#x9636;&#x6BB5;Vue&#x662F;&#x4E0D;&#x4F1A;&#x6570;&#x636E;&#x66F4;&#x65B0;&#x7684;&#xFF0C;&#x5728;&#x6572;&#x4E0B;&#x6C49;&#x5B57;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x66F4;&#x65B0;
             [&#x5982;&#x679C;&#x662F;&#x5B9E;&#x65F6;&#x66F4;&#x65B0;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;@input]
v-model&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E00;&#x4E9B;&#x4FEE;&#x9970;&#x7B26;&#xFF1A;
              1&#xFF1A; v-model.lazy  [.lazy&#x4F1A;&#x8F6C;&#x6362;&#x4E3A;&#x5728;change&#x4E8B;&#x4EF6;&#x4E2D;&#x540C;&#x6B65;]
              2&#xFF1A; v-model.number [.number&#x4F1A;&#x5C06;&#x8F93;&#x5165;&#x8F6C;&#x6362;&#x4E3A;Number&#x7C7B;&#x578B;&#xFF0C;&#x5426;&#x5219;&#x867D;&#x7136;&#x4F60;&#x8F93;&#x5165;&#x7684;&#x662F;&#x6570;&#x5B57;&#xFF0C;&#x4F46;&#x5B83;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x662F;String]
              3&#xFF1A; v-model.trim [.trim&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x8FC7;&#x6EE4;&#x8F93;&#x5165;&#x7684;&#x9996;&#x4F4D;&#x7A7A;&#x683C;]
</code></pre><p>&#x5355;&#x9009;&#x3010;v-model&#x4E0E;value&#x914D;&#x5408;&#x4F7F;&#x7528;&#x3011;<br>&lt;div id=&quot;app&quot;&gt;</p><pre><code>&lt;input type=&quot;radio&quot; v-model=&quot;picked&quot; value=&quot;html&quot; id=&quot;html&quot;/&gt;
&lt;label for=&quot;html&quot;&gt;HTML&lt;/label&gt;
&lt;br/&gt;
&lt;input type=&quot;radio&quot; v-model=&quot;picked&quot; value=&quot;js&quot; id=&quot;js&quot;/&gt;
    &lt;label for=&quot;js&quot;&gt;Javascript&lt;/label&gt;
    &lt;br/&gt;
 &lt;input type=&quot;radio&quot; v-model=&quot;picked&quot; value=&quot;css&quot; id=&quot;css&quot;/&gt;
     &lt;label for=&quot;css&quot;&gt;CSS&lt;/label&gt;
    &lt;br/&gt;
     &lt;p&gt;&#x5F53;&#x524D;&#x9009;&#x62E9;&#x7684;&#x9879;&#x662F;&#xFF1A; "{{"[picked"}}"&lt;/p&gt;  </code></pre><p>&lt;/div&gt;<br>&lt;script&gt;</p><pre><code>var app = new Vue({
    el: &quot;#app&quot;,
    data: {
        picked: &apos;js&apos;
    }
})</code></pre><p>&lt;/script&gt;</p><pre><code>&#x6CE8;&#x610F;&#xFF1A; &#x6570;&#x636E;picked&#x7684;&#x503C;&#x4E0E;value&#x503C;&#x662F;&#x4E00;&#x6837;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x88AB;&#x9009;&#x4E2D;&#x3002;</code></pre><p>&#x591A;&#x9009;[v-mode&#x4E0E;value&#x914D;&#x5408;&#x4F7F;&#x7528;]<br>&lt;div id=&quot;app&quot;&gt;</p><pre><code>&lt;input type=&quot;checkbox&quot; v-model=&quot;checked&quot; value=&quot;html&quot; id=&quot;html&quot;/&gt;
&lt;label for=&quot;html&quot;&gt;HTML&lt;/label&gt;
&lt;br/&gt;
&lt;input type=&quot;checkbox &quot; v-model=&quot;checked &quot; value=&quot;js&quot; id=&quot;js&quot;/&gt;
    &lt;label for=&quot;js&quot;&gt;Javascript&lt;/label&gt;
    &lt;br/&gt;
 &lt;input type=&quot;checkbox &quot; v-model=&quot;checked &quot; value=&quot;css&quot; id=&quot;css&quot;/&gt;
     &lt;label for=&quot;css&quot;&gt;CSS&lt;/label&gt;
    &lt;br/&gt;
     &lt;p&gt;&#x5F53;&#x524D;&#x9009;&#x62E9;&#x7684;&#x9879;&#x662F;&#xFF1A; "{{"[checked "}}"&lt;/p&gt;  </code></pre><p>&lt;/div&gt;<br>&lt;script&gt;</p><pre><code>var app = new Vue({
    el: &quot;#app&quot;,
    data: {
       checked : [&apos;html&apos;, &apos;css&apos;]
    }
})</code></pre><p>&lt;/script&gt;<br>&#x4E0B;&#x62C9;&#x83DC;&#x5355; [v-model&#x4E0E;value&#x914D;&#x5408;&#x4F7F;&#x7528;]<br>&lt;div id=&quot;app&quot;&gt;</p><pre><code>&lt;select v-model=&quot;selected&quot;&gt;
    &lt;option v-for=&quot;&#xFF08;option, index) in options&quot; key=&quot;index&quot; :value=&quot;option.text&quot;&gt;"{{"option.text"}}"&lt;/option&gt;
&lt;/select&gt;
&lt;p&gt;&#x9009;&#x62E9;&#x7684;&#x9879;&#x662F;&#xFF1A;"{{" selected "}}"&lt;/p&gt;</code></pre><p>&lt;/div&gt;<br>&lt;script&gt;</p><pre><code>var app = new Vue({
    el: &quot;#app&quot;,
    data: {
        selected: &apos;html&apos;,
        options: [
            {
                text: &apos;HTML&apos;,
                value: &apos;html&apos;
            }, 
            {
                text: &apos;Javascript&apos;,
                value: &apos;js&apos;
            },
            {
                text: &apos;CSS&apos;,
                value: &apos;css&apos;
            }
        ]
    }
})</code></pre><p>&lt;/script</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue零碎记忆

## 原文链接
[https://segmentfault.com/a/1190000015808350](https://segmentfault.com/a/1190000015808350)

