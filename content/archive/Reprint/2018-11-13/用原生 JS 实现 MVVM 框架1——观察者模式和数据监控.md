---
title: 用原生 JS 实现 MVVM 框架1——观察者模式和数据监控
reprint: true
categories: reprint
abbrlink: 4bb4bd4b
date: 2018-11-13 02:30:09
---

{{% raw %}}
<p>&#x5728;&#x524D;&#x7AEF;&#x9875;&#x9762;&#x4E2D;&#xFF0C;&#x628A; Model &#x7528;&#x7EAF; JS &#x5BF9;&#x8C61;&#x8868;&#x793A;&#xFF0C;View &#x8D1F;&#x8D23;&#x663E;&#x793A;&#xFF0C;&#x4E24;&#x8005;&#x505A;&#x5230;&#x4E86;&#x6700;&#x5927;&#x5316;&#x7684;&#x5206;&#x79BB;</p><p>&#x628A; Model &#x548C; View &#x5173;&#x8054;&#x8D77;&#x6765;&#x7684;&#x5C31;&#x662F; ViewModel&#x3002;ViewModel &#x8D1F;&#x8D23;&#x628A; Model &#x7684;&#x6570;&#x636E;&#x540C;&#x6B65;&#x5230; View &#x4E2D;&#x663E;&#x793A;&#x51FA;&#x6765;&#xFF0C;&#x8FD8;&#x8D1F;&#x8D23;&#x628A; View &#x7684;&#x4FEE;&#x6539;&#x540C;&#x6B65;&#x56DE; Model&#x3002;</p><p>MVVM &#x7684;&#x8BBE;&#x8BA1;&#x601D;&#x60F3;&#xFF1A;&#x5173;&#x6CE8; Model &#x7684;&#x53D8;&#x5316;&#xFF0C;&#x8BA9; MVVM &#x6846;&#x67B6;&#x53BB;&#x81EA;&#x52A8;&#x66F4;&#x65B0; DOM &#x7684;&#x72B6;&#x6001;&#xFF0C;&#x4ECE;&#x800C;&#x628A;&#x5F00;&#x53D1;&#x8005;&#x4ECE;&#x64CD;&#x4F5C; DOM &#x7684;&#x7E41;&#x7410;&#x6B65;&#x9AA4;&#x4E2D;&#x89E3;&#x8131;&#x51FA;&#x6765;&#x3002;</p><p>&#x4E86;&#x89E3;&#x4E86; MVVM &#x601D;&#x60F3;&#x540E;&#xFF0C;&#x81EA;&#x5DF1;&#x7528;&#x539F;&#x751F; JS &#x5B9E;&#x73B0;&#x4E00;&#x4E2A; MVVM &#x6846;&#x67B6;&#x3002;</p><p>&#x5B9E;&#x73B0; MVVM &#x6846;&#x67B6;&#x524D;&#x5148;&#x6765;&#x770B;&#x51E0;&#x4E2A;&#x57FA;&#x672C;&#x7528;&#x6CD5;&#xFF1A;</p><h2>Object.defineProperty</h2><p>&#x666E;&#x901A;&#x58F0;&#x660E;&#x5BF9;&#x8C61;&#xFF0C;&#x5B9A;&#x4E49;&#x548C;&#x4FEE;&#x6539;&#x5C5E;&#x6027;</p><pre><code>let obj = {}
obj.name = &apos;zhangsan&apos;
obj.age = 20</code></pre><p>&#x7528;<code>ObjectdefineProperty</code>&#x58F0;&#x660E;&#x5BF9;&#x8C61;<br>&#x8BED;&#x6CD5;&#xFF1A;</p><ul><li><code>Object.defineProperty(obj,prop,descriptor)</code></li><li><code>obj</code>&#xFF1A;&#x8981;&#x5904;&#x7406;&#x7684;&#x76EE;&#x6807;&#x5BF9;&#x8C61;</li><li><code>prop</code>&#xFF1A;&#x8981;&#x5B9A;&#x4E49;&#x6216;&#x4FEE;&#x6539;&#x7684;&#x5C5E;&#x6027;&#x7684;&#x540D;&#x79F0;</li><li><code>descriptor</code>&#xFF1A;&#x5C06;&#x88AB;&#x5B9A;&#x4E49;&#x6216;&#x4FEE;&#x6539;&#x7684;&#x5C5E;&#x6027;&#x63CF;&#x8FF0;&#x7B26;</li></ul><pre><code>let obj = {}
Object.defineProperty(obj,&apos;age&apos;,{
    value = 14,
})</code></pre><p>&#x548B;&#x4E00;&#x770B;&#x6709;&#x70B9;&#x753B;&#x86C7;&#x6DFB;&#x8DB3;&#xFF0C;&#x8FD9;&#x4E0D;&#x5F88;&#x9E21;&#x808B;&#x561B;</p><p>&#x522B;&#x6025;&#xFF0C;&#x5F80;&#x4E0B;&#x770B;</p><h3>&#x63CF;&#x8FF0;&#x7B26;</h3><p><code>descriptor</code>&#x6709;&#x4E24;&#x79CD;&#x5F62;&#x5F0F;&#xFF1A;&#x6570;&#x636E;&#x63CF;&#x8FF0;&#x7B26;&#x548C;&#x5B58;&#x50A8;&#x63CF;&#x8FF0;&#x7B26;&#xFF0C;&#x4ED6;&#x4EEC;&#x4E24;&#x4E2A;&#x5171;&#x6709;&#x5C5E;&#x6027;&#xFF1A;</p><ul><li><code>configurable</code>&#xFF0C;&#x662F;&#x5426;&#x53EF;&#x5220;&#x9664;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;<code>false</code>&#xFF0C;&#x5B9A;&#x4E49;&#x540E;&#x65E0;&#x6CD5;&#x4FEE;&#x6539;</li><li><code>enumerable</code>&#xFF0C;&#x662F;&#x5426;&#x53EF;&#x904D;&#x5386;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;<code>false</code>&#xFF0C;&#x5B9A;&#x4EE5;&#x540E;&#x65E0;&#x6CD5;&#x4FEE;&#x6539;</li></ul><h4>&#x5171;&#x6709;&#x5C5E;&#x6027;</h4><p><code>configurable</code>&#x8BBE;&#x7F6E;&#x4E3A;<code>false</code>&#x65F6;&#xFF0C;&#x5176;&#x5185;&#x90E8;&#x5C5E;&#x6027;&#x65E0;&#x6CD5;&#x7528;<code>delete</code>&#x5220;&#x9664;&#xFF1B;&#x5982;&#x8981;&#x5220;&#x9664;&#xFF0C;&#x9700;&#x8981;&#x628A;<code>configurable</code>&#x8BBE;&#x7F6E;&#x4E3A;<code>true</code>&#x3002;</p><pre><code>let obj = {}
Object.defineProperty(obj,&apos;age&apos;,{
    configurable:false,
    value:20,
})
delete obj.age         //false</code></pre><p><code>enumerable</code>&#x8BBE;&#x7F6E;&#x4E3A;<code>false</code>&#x65F6;&#xFF0C;&#x5176;&#x5185;&#x90E8;&#x5C5E;&#x6027;&#x65E0;&#x6CD5;&#x904D;&#x5386;&#xFF1B;&#x5982;&#x9700;&#x904D;&#x5386;&#xFF0C;&#x8981;&#x628A;<code>enumerable</code>&#x8BBE;&#x7F6E;&#x4E3A;<code>true</code></p><pre><code>let obj = {name:&apos;zhangsan&apos;}
Object.defineProperty(obj,&apos;age&apos;,{
    enumerable:false,
    value:20,
})
for(let key in obj){
    console.log(key)    //name
}</code></pre><h4>&#x6570;&#x636E;&#x63CF;&#x8FF0;&#x7B26;</h4><p><code>value</code>&#xFF1A;&#x8BE5;&#x5C5E;&#x6027;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;<code>undefined</code>&#x3002;<br><code>writable</code>&#xFF1A;&#x5F53;&#x4E14;&#x7D27;&#x5F53;&#x4E3A;<code>true</code>&#x65F6;&#xFF0C;<code>value</code>&#x624D;&#x80FD;&#x88AB;&#x8D4B;&#x503C;&#x8FD0;&#x7B97;&#x7B26;&#x6539;&#x53D8;&#x3002;&#x9ED8;&#x8BA4;&#x4E3A;<code>false</code>&#x3002;</p><pre><code>let obj = {}
Object.defineProperty(obj,&apos;age&apos;,{
    value:10,
    writable:false
})
obj.age = 11
obj.age        //10</code></pre><p><code>writable</code>&#x548C;<code>configurable</code>&#x7684;&#x533A;&#x522B;&#x662F;&#x524D;&#x8005;&#x662F;<code>value</code>&#x80FD;&#x5426;&#x88AB;&#x4FEE;&#x6539;&#xFF0C;&#x540E;&#x8005;&#x662F;<code>value</code>&#x80FD;&#x5426;&#x88AB;&#x5220;&#x9664;&#x3002;</p><h4>&#x5B58;&#x50A8;&#x63CF;&#x8FF0;&#x7B26;</h4><p><code>get()</code>&#xFF1A;&#x4E00;&#x4E2A;&#x7ED9;&#x5C5E;&#x6027;&#x63D0;&#x4F9B;<code>getter</code>&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;<code>undefined</code>&#x3002;<br><code>set()</code>&#xFF1A;&#x4E00;&#x4E2A;&#x7ED9;&#x5C5E;&#x6027;&#x63D0;&#x4F9B;<code>setter</code>&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;<code>undefined</code>&#x3002;</p><pre><code>let obj = {}
let age
Object.defineProperty(obj,&apos;age&apos;,{
    get:function(){
        return age
    },
    set:function(newVal){
        age = newVal
    }
})
obj.age = 20
obj.age        //20</code></pre><p>&#x5F53;&#x6211;&#x8C03;&#x7528;<code>obj.age</code>&#x65F6;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x5728;&#x5411;<code>obj</code>&#x5BF9;&#x8C61;&#x8981;<code>age</code>&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x5B83;&#x4F1A;&#x5E72;&#x561B;&#x5462;&#xFF1F;&#x5B83;&#x4F1A;&#x8C03;&#x7528;<code>obj.get()</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5B83;&#x4F1A;&#x627E;&#x5230;&#x5168;&#x5C40;&#x53D8;&#x91CF;<code>age</code>&#xFF0C;&#x5F97;&#x5230;<code>undefined</code>&#x3002;</p><p>&#x5F53;&#x6211;&#x8BBE;&#x7F6E;<code>obj.age = 20</code>&#x65F6;&#xFF0C;&#x5B83;&#x4F1A;&#x8C03;&#x7528;<code>obj.set()</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x5168;&#x5C40;&#x53D8;&#x91CF;<code>age</code>&#x8BBE;&#x7F6E;&#x4E3A;<code>20</code>&#x3002;</p><p>&#x6B64;&#x65F6;&#x5728;&#x8C03;&#x7528;<code>obj.age</code>&#xFF0C;&#x5F97;&#x5230;<code>20</code>&#x3002;</p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong>&#x6570;&#x636E;&#x63CF;&#x8FF0;&#x7B26;&#x548C;&#x5B58;&#x50A8;&#x63CF;&#x8FF0;&#x7B26;&#x4E0D;&#x80FD;&#x540C;&#x65F6;&#x5B58;&#x5728;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x62A5;&#x9519;</p><pre><code>let obj = {}
let age
Object.defineProperty(obj,&apos;age&apos;,{
    value:10,        //&#x62A5;&#x9519;
    get:function(){
        return age
    },
    set:function(newVal){
        age = newVal
    }
})</code></pre><h2>&#x6570;&#x636E;&#x62E6;&#x622A;</h2><p>&#x4F7F;&#x7528;<code>Object.defineProperty</code>&#x6765;&#x5B9E;&#x73B0;&#x6570;&#x636E;&#x62E6;&#x622A;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x6570;&#x636E;&#x76D1;&#x542C;&#x3002;</p><p>&#x9996;&#x5148;&#x6709;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</p><pre><code>let data = {
    name:&apos;zhangsan&apos;,
    friends:[1,2,3,4]
}</code></pre><p>&#x4E0B;&#x9762;&#x5199;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5B9E;&#x73B0;&#x5BF9;<code>data</code>&#x5BF9;&#x8C61;&#x7684;&#x76D1;&#x542C;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x5185;&#x90E8;&#x505A;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;</p><pre><code>observe(data)</code></pre><p>&#x6362;&#x53E5;&#x8BDD;&#x8BF4;&#xFF0C;&#x5C31;&#x662F;<code>data</code>&#x5185;&#x90E8;&#x7684;&#x5C5E;&#x6027;&#x90FD;&#x88AB;&#x6211;&#x4EEC;&#x76D1;&#x63A7;&#x7684;&#xFF0C;&#x5F53;&#x8C03;&#x7528;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x4E0A;&#x9762;&#x505A;&#x4E9B;&#x624B;&#x811A;&#xFF0C;&#x4F7F;&#x5F97;&#x8FD4;&#x56DE;&#x7684;&#x503C;&#x53D8;&#x6389;&#xFF1B;&#x5F53;&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x4E0D;&#x7ED9;&#x4ED6;&#x8BBE;&#x7F6E;&#x3002;</p><p>&#x5F53;&#x7136;&#x8FD9;&#x6837;&#x505A;&#x5F88;&#x65E0;&#x804A;&#xFF0C;&#x53EA;&#x662F;&#x60F3;&#x8BF4;&#x660E;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x5185;&#x90E8;&#x505A;&#x624B;&#x811A;&#xFF0C;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><p>&#x90A3;<code>observe</code>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5E94;&#x8BE5;&#x600E;&#x4E48;&#x5199;&#x5462;&#xFF1F;</p><pre><code>function observe(data){
    if(!data || typeof data !== &apos;object&apos;)return //&#x5982;&#x679C; data &#x4E0D;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x4EC0;&#x4E48;&#x4E5F;&#x4E0D;&#x505A;&#xFF0C;&#x76F4;&#x63A5;&#x8DF3;&#x51FA;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x53EA;&#x5BF9; &#x5BF9;&#x8C61; &#x64CD;&#x4F5C;
    for(let key in data){    //&#x904D;&#x5386;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;
        let val = data[key]    //&#x5F97;&#x5230;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;`value`
        if(typeof val === &apos;object&apos;){    //&#x5982;&#x679C;&#x8FD9;&#x4E2A; value &#x4F9D;&#x7136;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x7528;&#x9012;&#x5F52;&#x7684;&#x65B9;&#x5F0F;&#x7EE7;&#x7EED;&#x8C03;&#x7528;&#xFF0C;&#x76F4;&#x5230;&#x5F97;&#x5230;&#x57FA;&#x672C;&#x503C;&#x7684;`value`
            observe(val)
        }
        Object.defineProperty(data,key,{    //&#x5B9A;&#x4E49;&#x5BF9;&#x8C61;
            configurable:true,    //&#x53EF;&#x5220;&#x9664;&#xFF0C;&#x539F;&#x672C;&#x7684;&#x5BF9;&#x8C61;&#x5C31;&#x80FD;&#x5220;&#x9664;
            enumerable:true,    //&#x53EF;&#x904D;&#x5386;&#xFF0C;&#x539F;&#x672C;&#x7684;&#x5BF9;&#x8C61;&#x5C31;&#x80FD;&#x904D;&#x5386;
            get:function(){
                console.log(&apos;&#x8FD9;&#x662F;&#x5047;&#x7684;&apos;)    //&#x8C03;&#x7528;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x4F1A;&#x8C03;&#x7528; get &#x65B9;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x8C03;&#x7528;&#x5C5E;&#x6027;&#x53EF;&#x4EE5;&#x5728; get &#x5185;&#x90E8;&#x505A;&#x624B;&#x811A;
                //return val    //&#x8FD9;&#x91CC;&#x6CE8;&#x91CA;&#x6389;&#x4E86;&#xFF0C;&#x5B9E;&#x9645;&#x8C03;&#x7528;&#x5C5E;&#x6027;&#x5C31;&#x662F;&#x628A;&#x503C; return &#x51FA;&#x53BB;
            },
            set:function(newVal){
                console.log(&apos;&#x6211;&#x4E0D;&#x7ED9;&#x4F60;&#x8BBE;&#x7F6E;&#x3002;&#x3002;&#x3002;&apos;)    //&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x4F1A;&#x8C03;&#x7528; set &#x65B9;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x53EF;&#x4EE5;&#x5728; set &#x5185;&#x90E8;&#x505A;&#x624B;&#x811A;
                //val = newVal    //&#x8FD9;&#x91CC;&#x6CE8;&#x91CA;&#x6389;&#x4E86;&#xFF0C;&#x5B9E;&#x9645;&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x5199;&#x7684;&#x3002;
            }
        })
    }
}</code></pre><p>&#x6CE8;&#x610F;&#x4E24;&#x70B9;&#xFF1A;</p><ol><li>&#x6211;&#x4EEC;&#x5728;&#x58F0;&#x660E;<code>let val = data[key]</code>&#x65F6;&#xFF0C;&#x4E0D;&#x80FD;&#x7528;<code>var</code>&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x5BF9;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x8FDB;&#x884C;&#x76D1;&#x63A7;&#xFF0C;&#x7528;<code>let</code>&#x6BCF;&#x6B21;&#x904D;&#x5386;&#x90FD;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;<code>val</code>&#xFF0C;&#x5728;&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#xFF1B;&#x5982;&#x679C;&#x7528;<code>var</code>&#xFF0C;&#x53EA;&#x6709;&#x7B2C;&#x4E00;&#x6B21;&#x624D;&#x662F;&#x58F0;&#x660E;&#xFF0C;&#x540E;&#x9762;&#x90FD;&#x662F;&#x5BF9;&#x4E00;&#x6B21;&#x58F0;&#x660E;<code>val</code>&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#xFF0C;&#x904D;&#x5386;&#x7ED3;&#x675F;&#x540E;&#xFF0C;&#x5F97;&#x5230;&#x7684;&#x662F;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x663E;&#x7136;&#x8FD9;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x3002;</li><li><code>get</code>&#x65B9;&#x6CD5;&#x91CC;&#xFF0C;<code>return</code>&#x5C31;&#x662F;&#x524D;&#x9762;&#x58F0;&#x660E;&#x7684;<code>val</code>&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x80FD;&#x7528;<code>data[key]</code>&#xFF0C;&#x4F1A;&#x62A5;&#x9519;&#x3002;&#x56E0;&#x4E3A;&#x8C03;&#x7528;<code>data.name</code>&#xFF0C;&#x5C31;&#x662F;&#x8C03;&#x7528;<code>get</code>&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C;&#x662F;<code>data.name</code>&#xFF0C;&#x53C8;&#x7EE7;&#x7EED;&#x8C03;&#x7528;<code>get</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x968F;&#x53D8;&#x6210;&#x6B7B;&#x5FAA;&#x73AF;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x7528;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x6765;&#x5B58;&#x50A8;<code>data[key]</code>&#xFF0C;&#x5E76;&#x5C06;&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#x8FD4;&#x56DE;&#x51FA;&#x53BB;&#x3002;</li></ol><h2>&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;</h2><p>&#x4E00;&#x4E2A;&#x5178;&#x578B;&#x7684;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#x5E94;&#x7528;&#x573A;&#x666F;&#x2014;&#x2014;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;</p><ol><li>&#x4E0D;&#x540C;&#x7684;&#x7528;&#x6237;&#xFF08;&#x6211;&#x4EEC;&#x628A;&#x5B83;&#x53EB;&#x505A;&#x89C2;&#x5BDF;&#x8005;&#xFF1A;Observer&#xFF09;&#x90FD;&#x53EF;&#x4EE5;&#x8BA2;&#x9605;&#x540C;&#x4E00;&#x4E2A;&#x516C;&#x4F17;&#x53F7;&#xFF08;&#x6211;&#x4EEC;&#x628A;&#x5B83;&#x53EB;&#x505A;&#x4E3B;&#x4F53;&#xFF1A;Subject&#xFF09;</li><li>&#x5F53;&#x8BA2;&#x9605;&#x7684;&#x516C;&#x4F17;&#x53F7;&#x66F4;&#x65B0;&#x65F6;&#xFF08;&#x4E3B;&#x4F53;&#xFF09;&#xFF0C;&#x7528;&#x6237;&#x90FD;&#x80FD;&#x6536;&#x5230;&#x901A;&#x77E5;&#xFF08;&#x89C2;&#x5BDF;&#x8005;&#xFF09;</li></ol><p>&#x7528;&#x4EE3;&#x7801;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x5462;&#xFF1F;&#x5148;&#x770B;&#x903B;&#x8F91;&#xFF1A;</p><p>Subject &#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;new Subject()&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4E3B;&#x9898;&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x7EF4;&#x62A4;&#x8BA2;&#x9605;&#x8BE5;&#x4E3B;&#x9898;&#x7684;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x6570;&#x7EC4;&#x6570;&#x7EC4;&#xFF08;&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF1A;Subject &#x662F;&#x817E;&#x8BAF;&#x63A8;&#x51FA;&#x7684;&#x516C;&#x4F17;&#x53F7;&#xFF0C;new Subject() &#x662F;&#x4E00;&#x4E2A;&#x67D0;&#x4E2A;&#x673A;&#x6784;&#x7684;&#x516C;&#x4F17;&#x53F7;&#x2014;&#x2014;&#x65B0;&#x4E16;&#x76F8;&#xFF0C;&#x5B83;&#x8981;&#x7EF4;&#x62A4;&#x8BA2;&#x9605;&#x8FD9;&#x4E2A;&#x516C;&#x4F17;&#x53F7;&#x7684;&#x7528;&#x6237;&#x7FA4;&#x4F53;&#xFF09;</p><p>&#x4E3B;&#x9898;&#x4E0A;&#x6709;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#x6DFB;&#x52A0;&#x89C2;&#x5BDF;&#x8005;<code>addObserver</code>&#x3001;&#x5220;&#x9664;&#x89C2;&#x5BDF;&#x8005;<code>removeObserver</code>&#x3001;&#x901A;&#x77E5;&#x89C2;&#x5BDF;&#x8005;&#x66F4;&#x65B0;<code>notify</code>&#xFF08;&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF1A;&#x65B0;&#x4E16;&#x76F8;&#x5C06;&#x7528;&#x6237;&#x5206;&#x4E3A;&#x4E24;&#x7EC4;&#xFF0C;&#x4E00;&#x7EC4;&#x662F;&#x5FE0;&#x7C89;&#x5C31;&#x662F; addObserver&#xFF0C;&#x4E00;&#x7EC4;&#x662F;&#x9ED1;&#x540D;&#x5355;&#x5C31;&#x662F;&#xFF1A;removeObserver&#xFF0C;&#x5B83;&#x5728;&#x5FE0;&#x7C89;&#x7EC4;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x7528;&#x6237;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x9ED1;&#x540D;&#x5355;&#x91CC;&#x62C9;&#x9ED1;&#x4E00;&#x4E9B;&#x6760;&#x7CBE;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x798F;&#x5229;&#x53D1;&#x653E;&#xFF0C;&#x5B83;&#x5C31;&#x4F1A;&#x7EDF;&#x6CBB;&#x5FE0;&#x7C89;&#x91CC;&#x7684;&#x7528;&#x6237;&#xFF1A;notify&#xFF09;</p><p>Observer &#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;new Observer() &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x6709;&#x4E00;&#x4E2A;<code>update</code>&#x65B9;&#x6CD5;&#xFF08;&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF1A;Observer &#x662F;&#x5FE0;&#x7C89;&#x7528;&#x6237;&#x7FA4;&#x4F53;&#xFF0C;new Observer() &#x662F;&#x67D0;&#x4E2A;&#x5177;&#x4F53;&#x7684;&#x7528;&#x6237;&#x2014;&#x2014;&#x5C0F;&#x738B;&#xFF0C;&#x4ED6;&#x5FC5;&#x987B;&#x8981;&#x6253;&#x5F00;&#x6D41;&#x91CF;&#x624D;&#x80FD;&#x6536;&#x5230;&#x65B0;&#x4E16;&#x76F8;&#x7684;&#x798F;&#x5229;&#x63A8;&#x9001;&#xFF1A;updata&#xFF09;</p><p>&#x5F53;&#x8C03;&#x7528;<code>notify</code>&#x65F6;&#x5B9E;&#x9645;&#x4E0A;&#x8C03;&#x7528;&#x5168;&#x90E8;&#x89C2;&#x5BDF;&#x8005;<code>observer</code>&#x81EA;&#x8EAB;&#x7684;<code>update</code>&#x65B9;&#x6CD5;&#xFF08;&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF1A;&#x5F53;&#x65B0;&#x4E16;&#x76F8;&#x63A8;&#x9001;&#x798F;&#x5229;&#x65F6;&#xFF0C;&#x5B83;&#x4F1A;&#x81EA;&#x52A8;&#x5E2E;&#x5FE0;&#x7C89;&#x7EC4;&#x7684;&#x7528;&#x6237;&#x6253;&#x5F00;&#x6D41;&#x91CF;&#xFF0C;&#x8FD9;&#x6BD4;&#x8F83;&#x6781;&#x7AEF;&#xFF0C;&#x53EA;&#x662F;&#x7528;&#x6765;&#x4E3E;&#x4F8B;&#xFF09;</p><h3>ES5 &#x5199;&#x6CD5;&#xFF1A;</h3><pre><code>function Subject(){
    this.observers = []
}
Subject.prototype.addObserver = function(observer){
    this.observers.push(observer)
}
Subject.prototype.removeObserver = function(observer){
    let index = this.observers.indexOf(observer)
    if(index &gt; -1){
        this.observers.splice(index,1)
    }
}
Subject.prototype.notify = function(){
    this.observers.forEach(observer=&gt;{
        observer.update()
    })
}
function Observer(name){
    this.name = name
    this.update = function(){
        console.log(name + &apos; update...&apos;)
    }
}

let subject = new Subject()    //&#x521B;&#x5EFA;&#x4E3B;&#x9898;
let observer1 = new Observer(&apos;xiaowang&apos;)    //&#x521B;&#x5EFA;&#x89C2;&#x5BDF;&#x8005;1
subject.addObserver(observer1)    //&#x4E3B;&#x9898;&#x6DFB;&#x52A0;&#x89C2;&#x5BDF;&#x8005;1
let observer2 = new Observer(&apos;xiaozhang&apos;)    //&#x521B;&#x5EFA;&#x89C2;&#x5BDF;&#x8005;2
subject.addObserver(observer2)    //&#x4E3B;&#x9898;&#x6DFB;&#x52A0;&#x89C2;&#x5BDF;&#x8005;2
subject.notify()    //&#x4E3B;&#x9898;&#x901A;&#x77E5;&#x89C2;&#x5BDF;&#x8005;

/**** &#x8F93;&#x51FA; *****/
xiaowang update...
xiaozhang update...</code></pre><h3>ES6 &#x5199;&#x6CD5;&#xFF1A;</h3><pre><code>class Subject{
    constructor(){
        this.observers = []
    }
    addObserver(observer){
        this.observers.push(observer)
    }
    removeObserver(observer){
        let index = this.observers.indexOf(observer)
        if(index &gt; -1){
            this.observers.splice(index,1)
        }
    }
    notify(){
        this.observers.forEach(observer=&gt;{
            observer.update()
        })
    }
}
class Observer{
    constructor(name){
        this.name = name
        this.update = function(){
            console.log(name + &apos; update...&apos;)
        }
    }
}
let subject = new Subject()    //&#x521B;&#x5EFA;&#x4E3B;&#x9898;
let observer1 = new Observer(&apos;xiaowang&apos;)    //&#x521B;&#x5EFA;&#x89C2;&#x5BDF;&#x8005;1
subject.addObserver(observer1)    //&#x4E3B;&#x9898;&#x6DFB;&#x52A0;&#x89C2;&#x5BDF;&#x8005;1
let observer2 = new Observer(&apos;xiaozhang&apos;)    //&#x521B;&#x5EFA;&#x89C2;&#x5BDF;&#x8005;2
subject.addObserver(observer2)    //&#x4E3B;&#x9898;&#x6DFB;&#x52A0;&#x89C2;&#x5BDF;&#x8005;2
subject.notify()    //&#x4E3B;&#x9898;&#x901A;&#x77E5;&#x89C2;&#x5BDF;&#x8005;

/**** &#x8F93;&#x51FA; *****/
xiaowang update...
xiaozhang update...</code></pre><p>ES5 &#x548C; ES6 &#x5199;&#x6CD5;&#x6548;&#x679C;&#x4E00;&#x6837;&#xFF0C;ES5 &#x7684;&#x5199;&#x6CD5;&#x66F4;&#x597D;&#x7406;&#x89E3;&#xFF0C;ES6 &#x53EA;&#x662F;&#x4E2A;&#x8BED;&#x6CD5;&#x7CD6;</p><p>&#x4E3B;&#x9898;&#x6DFB;&#x52A0;&#x89C2;&#x5BDF;&#x8005;&#x7684;&#x65B9;&#x6CD5;<code>subject.addObserver(observer)</code>&#x5F88;&#x7E41;&#x7410;&#xFF0C;&#x76F4;&#x63A5;&#x7ED9;&#x89C2;&#x5BDF;&#x8005;&#x4E0B;&#x65B9;&#x6743;&#x9650;&#xFF0C;&#x7ED9;&#x4ED6;&#x4EEC;&#x589E;&#x52A0;&#x6DFB;&#x52A0;&#x8FDB;&#x5FE0;&#x7C89;&#x7EC4;&#x7684;&#x6743;&#x9650;</p><pre><code>class Observer{
  constructor() {
    this.update = function() {
        console.log(name + &apos; update...&apos;)
    }
  }
  subscribeTo(subject) {    //&#x53EA;&#x8981;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x4E86;&#x4E3B;&#x9898;&#x5C31;&#x4F1A;&#x81EA;&#x52A8;&#x6DFB;&#x52A0;&#x8FDB;&#x5FE0;&#x7C89;&#x7EC4;
    subject.addObserver(this)    //&#x8FD9;&#x91CC;&#x7684; this &#x662F; Observer &#x7684;&#x5B9E;&#x4F8B;
  }
}

let subject = new Subject()
let observer = new Observer(&apos;lisi&apos;)
observer.subscribeTo(subject)  //&#x89C2;&#x5BDF;&#x8005;&#x81EA;&#x5DF1;&#x8BA2;&#x9605;&#x5FE0;&#x7C89;&#x5206;&#x7EC4;
subject.notify()

/****** &#x8F93;&#x51FA; *******/
lisi update...</code></pre><p>MVVM &#x6846;&#x67B6;&#x7684;&#x5185;&#x90E8;&#x57FA;&#x672C;&#x539F;&#x7406;&#x5C31;&#x662F;&#x4E0A;&#x9762;&#x8FD9;&#x4E9B;&#xFF0C;&#x4E0B;&#x4E00;&#x7BC7;&#x7528;&#x4EE3;&#x7801;&#x5199;&#x4E00;&#x904D;&#x5B8C;&#x6574;&#x7684; MVVM &#x6846;&#x67B6;&#x3002;</p><p>&#x7528;&#x539F;&#x751F; JS &#x5B9E;&#x73B0; MVVM &#x6846;&#x67B6;MVVM &#x6846;&#x67B6;&#x7CFB;&#x5217;&#xFF1A;<br><a href="https://segmentfault.com/a/1190000016236834">&#x7528;&#x539F;&#x751F; JS &#x5B9E;&#x73B0; MVVM &#x6846;&#x67B6;2&#x2014;&#x2014;&#x5355;&#x5411;&#x7ED1;&#x5B9A;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用原生 JS 实现 MVVM 框架1——观察者模式和数据监控

## 原文链接
[https://segmentfault.com/a/1190000016234207](https://segmentfault.com/a/1190000016234207)

