---
title: '手动实现一个new操作' 
date: 2018-11-28 2:30:11
hidden: true
slug: 2s6rbojqeaw
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;</h2><hr><p>&#x5728;&#x6240;&#x6709;&#x7684;&#x524D;&#x7AEF;&#x9762;&#x8BD5;&#x4E2D;&#x5E38;&#x5E38;&#x559C;&#x6B22;&#x8003;&#x9762;&#x8BD5;&#x8005;&#x5982;&#x4F55;&#x624B;&#x5199;&#x4E00;&#x4E2A;new&#x64CD;&#x4F5C;&#x7B26;&#xFF0C;&#x4F5C;&#x4E3A;&#x5728;&#x51C6;&#x5907;&#x79CB;&#x62DB;&#x7684;&#x5927;&#x4E09;&#x515A;&#xFF0C;&#x6211;&#x4E5F;&#x8981;&#x8003;&#x8651;&#x8FD9;&#x4E9B;&#x3002;<br>&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5148;&#x770B;&#x770B;new&#x64CD;&#x4F5C;&#x7B26;&#x90FD;&#x5E72;&#x4E86;&#x4EC0;&#x4E48;&#x4E8B;&#x60C5;&#xFF0C;&#x6709;&#x54EA;&#x4E9B;&#x64CD;&#x4F5C;&#xFF1F;&#x901A;&#x8FC7;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x6765;&#x8FDB;&#x884C;&#x601D;&#x8003;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x7C7B;&#xFF08;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF09;
function Otaku(name, age) {
    this.name = name;
    this.age = age;
    // &#x81EA;&#x8EAB;&#x7684;&#x5C5E;&#x6027;
    this.habit = &apos;pk&apos;;
}
// &#x7ED9;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x4E0A;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;
Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
    console.log(&apos;I am &apos; + this.name);
}
// &#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;person&#x5BF9;&#x8C61;
const person = new Otaku(&apos;&#x4E54;&#x5CF0;&apos;,5000);
person.sayYourName();
console.log(person);//&#x6253;&#x5370;&#x51FA;&#x6784;&#x9020;&#x51FA;&#x6765;&#x7684;&#x5B9E;&#x4F8B;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x7C7B;&#xFF08;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF09;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Otaku</span>(<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
    <span class="hljs-comment">// &#x81EA;&#x8EAB;&#x7684;&#x5C5E;&#x6027;</span>
    <span class="hljs-keyword">this</span>.habit = <span class="hljs-string">&apos;pk&apos;</span>;
}
<span class="hljs-comment">// &#x7ED9;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x4E0A;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</span>
Otaku.prototype.strength = <span class="hljs-number">60</span>;
Otaku.prototype.sayYourName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;I am &apos;</span> + <span class="hljs-keyword">this</span>.name);
}
<span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;person&#x5BF9;&#x8C61;</span>
<span class="hljs-keyword">const</span> person = <span class="hljs-keyword">new</span> Otaku(<span class="hljs-string">&apos;&#x4E54;&#x5CF0;&apos;</span>,<span class="hljs-number">5000</span>);
person.sayYourName();
<span class="hljs-built_in">console</span>.log(person);<span class="hljs-comment">//&#x6253;&#x5370;&#x51FA;&#x6784;&#x9020;&#x51FA;&#x6765;&#x7684;&#x5B9E;&#x4F8B;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000015276662?w=472&amp;h=131" src="https://static.alili.tech/img/remote/1460000015276662?w=472&amp;h=131" alt="&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x7ED3;&#x679C;" title="&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x7ED3;&#x679C;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x89E3;&#x6790;</h2><p>&#x4ECE;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x51FA;&#x6765;&#x7684;&#x7ED3;&#x679C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x51FA;new&#x64CD;&#x4F5C;&#x7B26;&#x5927;&#x6982;&#x505A;&#x4E86;&#x51E0;&#x4EF6;&#x4E8B;&#x60C5;&#xFF1A;</p><ol><li>&#x8FD4;&#x56DE;&#xFF08;&#x4EA7;&#x751F;&#xFF09;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5BF9;&#x8C61;</li><li>&#x8BBF;&#x95EE;&#x5230;&#x4E86;&#x7C7B;Otaku&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#x7684;&#x5C5E;&#x6027;</li><li>&#x8BBF;&#x95EE;&#x5230;Otaku&#x539F;&#x578B;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5; &#x5E76;&#x4E14;&#x8BBE;&#x7F6E;&#x4E86;this&#x7684;&#x6307;&#x5411;&#xFF08;&#x6307;&#x5411;&#x65B0;&#x751F;&#x6210;&#x7684;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#xFF09;</li></ol><p>&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x5206;&#x6790;&#x5C55;&#x793A;&#xFF0C;&#x53EF;&#x4EE5;&#x77E5;&#x9053;new&#x56E2;&#x4F19;&#x91CC;&#x9762;&#x4E00;&#x5B9A;&#x6709;Object&#x7684;&#x53C2;&#x4E0E;&#xFF0C;&#x4E0D;&#x7136;&#x5BF9;&#x8C61;&#x7684;&#x4EA7;&#x751F;&#x5C31;&#x6709;&#x70B9;&#x8BF4;&#x4E0D;&#x6E05;&#x4E86;&#x3002; &#x5148;&#x6765;&#x8FB9;&#x5199;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x9700;&#x8981;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61; &#x501F;&#x52A9;&#x51FD;&#x6570;&#x6765;&#x5B9E;&#x73B0;new&#x64CD;&#x4F5C; 
// &#x4F20;&#x5165;&#x9700;&#x8981;&#x7684;&#x53C2;&#x6570;&#xFF1A; &#x7C7B; + &#x5C5E;&#x6027;
const person = new Otaku(&apos;&#x4E54;&#x5CF0;&apos;,5000);
const person1 = objectFactory(Otaku, &apos;&#x9E20;&#x6469;&#x667A;&apos;, 5000);

// &#x5F00;&#x59CB;&#x6765;&#x5B9E;&#x73B0;objectFactory &#x65B9;&#x6CD5; 
function objectFactory(obj, name, age) {}
// &#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x5C06;&#x81EA;&#x8EAB;&#x5199;&#x6B7B;&#x4E86; &#x5982;&#x6B64;&#x4ED6;&#x53EA;&#x80FD;&#x6784;&#x9020;&#x4EE5;obj&#x4E3A;&#x539F;&#x578B;&#xFF0C;&#x5E76;&#x4E14;&#x53EA;&#x6709;name &#x548C; age &#x5C5E;&#x6027;&#x7684; obj
// &#x5728;js&#x4E2D; &#x51FD;&#x6570;&#x56E0;&#x4E3A;arguments &#x4F7F;&#x5F97;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x7684;&#x5199;&#x6CD5;&#x5F02;&#x5E38;&#x7075;&#x6D3B;&#xFF0C;&#x5728;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;arguments&#x6765;&#x83B7;&#x5F97;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;
function objectFactory() {
    console.log(arguements); //{ &apos;0&apos;: [Function: Otaku], &apos;1&apos;: &apos;&#x9E20;&#x6469;&#x667A;&apos;, &apos;2&apos;: 5000 }
     // &#x901A;&#x8FC7;arguments&#x7C7B;&#x6570;&#x7EC4;&#x6253;&#x5370;&#x51FA;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5176;&#x4E2D;&#x5305;&#x542B;&#x4E86;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4EE5;&#x53CA;&#x6211;&#x4EEC;&#x8C03;&#x7528;objectfactory&#x65F6;&#x4F20;&#x5165;&#x7684;&#x5176;&#x4ED6;&#x53C2;&#x6570;
    // &#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x8981;&#x60F3;&#x5982;&#x4F55;&#x5F97;&#x5230;&#x5176;&#x4E2D;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x548C;&#x5176;&#x4ED6;&#x7684;&#x53C2;&#x6570;
    // &#x7531;&#x4E8E;arguments&#x662F;&#x7C7B;&#x6570;&#x7EC4;&#xFF0C;&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x7684;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x4F9B;&#x5176;&#x4F7F;&#x7528;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6709;&#x4EE5;&#x4E0B;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;:
    // 1. Array.from(arguments).shift(); //&#x8F6C;&#x6362;&#x6210;&#x6570;&#x7EC4; &#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x7684;&#x65B9;&#x6CD5;shift&#x5C06;&#x7B2C;&#x4E00;&#x9879;&#x5F39;&#x51FA;
    // 2.[].shift().call(arguments); // &#x901A;&#x8FC7;call() &#x8BA9;arguments&#x80FD;&#x591F;&#x501F;&#x7528;shift&#x65B9;&#x6CD5;
    const Constructor = [].shift.call(arguments);
    const args = arguments;
    // &#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x5BF9;&#x8C61; &#x7EAF;&#x6D01;&#x65E0;&#x90AA;
    let obj = new Object();
    // &#x63A5;&#x4E0B;&#x6765;&#x7684;&#x60F3;&#x6CD5; &#x7ED9;obj&#x8FD9;&#x4E2A;&#x65B0;&#x751F;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x6307;&#x5411;&#x5B83;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;  
    // &#x7ED9;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x5165;&#x5C5E;&#x6027;&#xFF0C;&#x6CE8;&#x610F;&#xFF1A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;this&#x5C5E;&#x6027;
    // &#x53C2;&#x6570;&#x4F20;&#x8FDB;Constructor&#x5BF9;obj&#x7684;&#x5C5E;&#x6027;&#x8D4B;&#x503C;&#xFF0C;this&#x8981;&#x6307;&#x5411;obj&#x5BF9;&#x8C61;
    // &#x5728;Coustructor&#x5185;&#x90E8;&#x624B;&#x52A8;&#x6307;&#x5B9A;&#x51FD;&#x6570;&#x6267;&#x884C;&#x65F6;&#x7684;this &#x4F7F;&#x7528;call&#x3001;apply&#x5B9E;&#x73B0;
    Constructor.call(obj,...args);
    return obj;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x9700;&#x8981;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61; &#x501F;&#x52A9;&#x51FD;&#x6570;&#x6765;&#x5B9E;&#x73B0;new&#x64CD;&#x4F5C; </span>
<span class="hljs-comment">// &#x4F20;&#x5165;&#x9700;&#x8981;&#x7684;&#x53C2;&#x6570;&#xFF1A; &#x7C7B; + &#x5C5E;&#x6027;</span>
<span class="hljs-keyword">const</span> person = <span class="hljs-keyword">new</span> Otaku(<span class="hljs-string">&apos;&#x4E54;&#x5CF0;&apos;</span>,<span class="hljs-number">5000</span>);
<span class="hljs-keyword">const</span> person1 = objectFactory(Otaku, <span class="hljs-string">&apos;&#x9E20;&#x6469;&#x667A;&apos;</span>, <span class="hljs-number">5000</span>);

<span class="hljs-comment">// &#x5F00;&#x59CB;&#x6765;&#x5B9E;&#x73B0;objectFactory &#x65B9;&#x6CD5; </span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">objectFactory</span>(<span class="hljs-params">obj, name, age</span>) </span>{}
<span class="hljs-comment">// &#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x5C06;&#x81EA;&#x8EAB;&#x5199;&#x6B7B;&#x4E86; &#x5982;&#x6B64;&#x4ED6;&#x53EA;&#x80FD;&#x6784;&#x9020;&#x4EE5;obj&#x4E3A;&#x539F;&#x578B;&#xFF0C;&#x5E76;&#x4E14;&#x53EA;&#x6709;name &#x548C; age &#x5C5E;&#x6027;&#x7684; obj</span>
<span class="hljs-comment">// &#x5728;js&#x4E2D; &#x51FD;&#x6570;&#x56E0;&#x4E3A;arguments &#x4F7F;&#x5F97;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x7684;&#x5199;&#x6CD5;&#x5F02;&#x5E38;&#x7075;&#x6D3B;&#xFF0C;&#x5728;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;arguments&#x6765;&#x83B7;&#x5F97;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">objectFactory</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(arguements); <span class="hljs-comment">//{ &apos;0&apos;: [Function: Otaku], &apos;1&apos;: &apos;&#x9E20;&#x6469;&#x667A;&apos;, &apos;2&apos;: 5000 }</span>
     <span class="hljs-comment">// &#x901A;&#x8FC7;arguments&#x7C7B;&#x6570;&#x7EC4;&#x6253;&#x5370;&#x51FA;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5176;&#x4E2D;&#x5305;&#x542B;&#x4E86;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4EE5;&#x53CA;&#x6211;&#x4EEC;&#x8C03;&#x7528;objectfactory&#x65F6;&#x4F20;&#x5165;&#x7684;&#x5176;&#x4ED6;&#x53C2;&#x6570;</span>
    <span class="hljs-comment">// &#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x8981;&#x60F3;&#x5982;&#x4F55;&#x5F97;&#x5230;&#x5176;&#x4E2D;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x548C;&#x5176;&#x4ED6;&#x7684;&#x53C2;&#x6570;</span>
    <span class="hljs-comment">// &#x7531;&#x4E8E;arguments&#x662F;&#x7C7B;&#x6570;&#x7EC4;&#xFF0C;&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x7684;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x4F9B;&#x5176;&#x4F7F;&#x7528;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6709;&#x4EE5;&#x4E0B;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;:</span>
    <span class="hljs-comment">// 1. Array.from(arguments).shift(); //&#x8F6C;&#x6362;&#x6210;&#x6570;&#x7EC4; &#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x7684;&#x65B9;&#x6CD5;shift&#x5C06;&#x7B2C;&#x4E00;&#x9879;&#x5F39;&#x51FA;</span>
    <span class="hljs-comment">// 2.[].shift().call(arguments); // &#x901A;&#x8FC7;call() &#x8BA9;arguments&#x80FD;&#x591F;&#x501F;&#x7528;shift&#x65B9;&#x6CD5;</span>
    <span class="hljs-keyword">const</span> Constructor = [].shift.call(<span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">const</span> args = <span class="hljs-built_in">arguments</span>;
    <span class="hljs-comment">// &#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x5BF9;&#x8C61; &#x7EAF;&#x6D01;&#x65E0;&#x90AA;</span>
    <span class="hljs-keyword">let</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
    <span class="hljs-comment">// &#x63A5;&#x4E0B;&#x6765;&#x7684;&#x60F3;&#x6CD5; &#x7ED9;obj&#x8FD9;&#x4E2A;&#x65B0;&#x751F;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x6307;&#x5411;&#x5B83;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;  </span>
    <span class="hljs-comment">// &#x7ED9;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x5165;&#x5C5E;&#x6027;&#xFF0C;&#x6CE8;&#x610F;&#xFF1A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;this&#x5C5E;&#x6027;</span>
    <span class="hljs-comment">// &#x53C2;&#x6570;&#x4F20;&#x8FDB;Constructor&#x5BF9;obj&#x7684;&#x5C5E;&#x6027;&#x8D4B;&#x503C;&#xFF0C;this&#x8981;&#x6307;&#x5411;obj&#x5BF9;&#x8C61;</span>
    <span class="hljs-comment">// &#x5728;Coustructor&#x5185;&#x90E8;&#x624B;&#x52A8;&#x6307;&#x5B9A;&#x51FD;&#x6570;&#x6267;&#x884C;&#x65F6;&#x7684;this &#x4F7F;&#x7528;call&#x3001;apply&#x5B9E;&#x73B0;</span>
    Constructor.call(obj,...args);
    <span class="hljs-keyword">return</span> obj;
}
</code></pre><ul><li>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x6CE8;&#x91CA;&#x592A;&#x591A;&#xFF0C;&#x5254;&#x9664;&#x6CE8;&#x91CA;&#x4EE5;&#x540E;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function objectFactory() {
        let Constructor = [].shift.call(arguments);
        const obj = new Object();
        obj.__proto__ = Conctructor.prototype;
        Constructor.call(obj,...arguments);
        return obj;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">objectFactory</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">let</span> Constructor = [].shift.call(<span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">const</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
        obj.__proto__ = Conctructor.prototype;
        Constructor.call(obj,...arguments);
        <span class="hljs-keyword">return</span> obj;
    }</code></pre><ul><li>&#x8FD8;&#x6709;&#x53E6;&#x5916;&#x4E00;&#x79CD;&#x64CD;&#x4F5C;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myNew(Obj,...args){
  var obj = Object.create(Obj.prototype);//&#x4F7F;&#x7528;&#x6307;&#x5B9A;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x53CA;&#x5176;&#x5C5E;&#x6027;&#x53BB;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5BF9;&#x8C61;
  Obj.apply(obj,args); // &#x7ED1;&#x5B9A; this &#x5230;obj, &#x8BBE;&#x7F6E; obj &#x7684;&#x5C5E;&#x6027;
  return obj; // &#x8FD4;&#x56DE;&#x5B9E;&#x4F8B;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myNew</span>(<span class="hljs-params">Obj,...args</span>)</span>{
  <span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">Object</span>.create(Obj.prototype);<span class="hljs-comment">//&#x4F7F;&#x7528;&#x6307;&#x5B9A;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x53CA;&#x5176;&#x5C5E;&#x6027;&#x53BB;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5BF9;&#x8C61;</span>
  Obj.apply(obj,args); <span class="hljs-comment">// &#x7ED1;&#x5B9A; this &#x5230;obj, &#x8BBE;&#x7F6E; obj &#x7684;&#x5C5E;&#x6027;</span>
  <span class="hljs-keyword">return</span> obj; <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x5B9E;&#x4F8B;</span>
}</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手动实现一个new操作

## 原文链接
[https://segmentfault.com/a/1190000015276659](https://segmentfault.com/a/1190000015276659)

