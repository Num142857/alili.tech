---
title: "一眼看穿\U0001F440JS继承"
hidden: true
categories: [reprint]
slug: 1a921f0c
date: 2018-11-13 02:30:09
---

{{< raw >}}
<h2>&#x7EE7;&#x627F;</h2><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;JS&#x662F;OO&#x7F16;&#x7A0B;&#xFF0C;&#x81EA;&#x7136;&#x5C11;&#x4E0D;&#x4E86;OO&#x7F16;&#x7A0B;&#x6240;&#x62E5;&#x6709;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x5B66;&#x4E60;&#x5B8C;&#x539F;&#x578B;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x8D81;&#x70ED;&#x6253;&#x94C1;&#xFF0C;&#x6765;&#x804A;&#x804A;OO&#x7F16;&#x7A0B;&#x4E09;&#x5927;&#x7279;&#x6027;&#x4E4B;&#x4E00;&#x2014;&#x2014;&#x7EE7;&#x627F;&#x3002;</p><p>&#x7EE7;&#x627F;&#x8FD9;&#x4E2A;&#x8BCD;&#x5E94;&#x8BE5;&#x6BD4;&#x8F83;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x6211;&#x4EEC;&#x8033;&#x719F;&#x80FD;&#x8BE6;&#x7684;&#xFF0C;&#x7EE7;&#x627F;&#x8D22;&#x4EA7;&#xFF0C;&#x7EE7;&#x627F;&#x5BB6;&#x4E1A;&#x7B49;&#xFF0C;&#x4ED6;&#x4EEC;&#x7684;&#x524D;&#x63D0;&#x662F;&#x6709;&#x4E2A;&#x7EE7;&#x627F;&#x4EBA;&#xFF0C;&#x7136;&#x540E;&#x4F60;&#x662F;&#x7EE7;&#x627F;&#x8005;&#xFF0C;&#x8FD9;&#x6837;&#x624D;&#x6709;&#x7EE7;&#x627F;&#x800C;&#x8A00;&#x3002;&#x6CA1;&#x9519;&#xFF0C;JS&#x4E2D;&#x7684;&#x7EE7;&#x627F;&#x6B63;&#x5982;&#x4F60;&#x6240;&#x7406;&#x89E3;&#x7684;&#x4E00;&#x6837;&#xFF0C;&#x4E5F;&#x662F;&#x6210;&#x5BF9;&#x51FA;&#x73B0;&#x7684;&#x3002;<br><strong>&#x7EE7;&#x627F;&#x5C31;&#x662F;&#x5C06;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x590D;&#x5236;&#x4E00;&#x4EFD;&#x7ED9;&#x9700;&#x8981;&#x7EE7;&#x627F;&#x7684;&#x5BF9;&#x8C61;</strong></p><p>OO&#x8BED;&#x8A00;&#x652F;&#x6301;&#x4E24;&#x79CD;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#xFF1A;&#x63A5;&#x53E3;&#x7EE7;&#x627F;&#x548C;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF0C;&#x5176;&#x4E2D;&#x63A5;&#x53E3;&#x7EE7;&#x627F;&#x53EA;<strong>&#x7EE7;&#x627F;&#x65B9;&#x6CD5;&#x7B7E;&#x540D;</strong>&#xFF0C;&#x800C;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x5219;<strong>&#x7EE7;&#x627F;&#x5B9E;&#x9645;&#x7684;&#x65B9;&#x6CD5;</strong>&#x3002;&#x7531;&#x4E8E;ECMAScript&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x7B7E;&#x540D;&#xFF0C;&#x56E0;&#x6B64;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x63A5;&#x53E3;&#x7EE7;&#x627F;&#xFF0C;&#x53EA;&#x652F;&#x6301;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF0C;&#x800C;<strong>&#x7EE7;&#x627F;&#x7684;&#x4E3B;&#x8981;&#x65B9;&#x5F0F;&#xFF0C;&#x662F;&#x901A;&#x8FC7;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;&#x7684;</strong>&#xFF0C;&#x8981;&#x7406;&#x89E3;&#x539F;&#x578B;&#x94FE;&#xFF0C;&#x9996;&#x5148;&#x8981;&#x77E5;&#x9053;&#x4EC0;&#x4E48;&#x662F;&#x539F;&#x578B;&#xFF0C;&#x4E0D;&#x61C2;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x8FD9;&#x7BC7;&#x535A;&#x6587;<a href="https://segmentfault.com/a/1190000016065038">&#x4E00;&#x773C;&#x770B;&#x7A7F;&#x1F440;JS&#x539F;&#x578B;</a>&#x3002;<br>&#x5176;&#x5B9E;&#x7EE7;&#x627F;&#x8BF4;&#x767D;&#x4E86;&#x5C31;&#x662F;<br>&#x2460;&#x5B83;&#x4E0A;&#x9762;&#x5FC5;&#x987B;&#x6709;&#x4E2A;&#x7236;&#x7EA7;<br>&#x2461;&#x4E14;&#x5B83;&#x83B7;&#x53D6;&#x4E86;&#x8FD9;&#x4E2A;&#x7236;&#x7EA7;&#x7684;&#x6240;&#x6709;&#x5B9E;&#x4F8B;&#x548C;&#x65B9;&#x6CD5;</p><p>&#x8FD9;&#x91CC;&#x666E;&#x53CA;&#x4E00;&#x4E2A;&#x5C0F;&#x6982;&#x5FF5;&#xFF0C;&#x4E0A;&#x6587;&#x63D0;&#x5230;&#x7684;<strong>&#x6CA1;&#x6709;&#x7B7E;&#x540D;</strong>&#xFF0C;&#x7B2C;&#x4E00;&#x6B21;&#x770B;&#x8FD9;&#x4E2A;&#x5B57;&#x773C;&#x4E5F;&#x4E0D;&#x662F;&#x5F88;&#x61C2;&#xFF0C;&#x641C;&#x7D22;&#x4E86;&#x4E00;&#x4E0B;&#xFF0C;&#x89C9;&#x5F97;&#x8FD9;&#x4E2A;&#x8BF4;&#x6CD5;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x8BA4;&#x53EF;&#x7684;&#x3002;</p><blockquote>&#x6CA1;&#x6709;&#x7B7E;&#x540D;<br>&#x6211;&#x4EEC;&#x77E5;&#x9053;JS&#x662F;&#x5F31;&#x7C7B;&#x578B;&#x8BED;&#x8A00;&#xFF0C;&#x5B83;&#x7684;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x7531;0&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x503C;&#x7684;&#x6570;&#x7EC4;&#x6765;&#x8868;&#x793A;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E3A;JS&#x51FD;&#x6570;&#x547D;&#x540D;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x505A;&#x6CD5;&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#xFF0C;&#x4F46;&#x4E0D;&#x662F;&#x5FC5;&#x987B;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;<strong>&#x6211;&#x4EEC;&#x547D;&#x4E0D;&#x547D;&#x540D;&#x53C2;&#x6570;&#x548C;&#x4F20;&#x4E0D;&#x4F20;&#x53C2;&#x6570;&#x6CA1;&#x6709;&#x5FC5;&#x7136;&#x8054;&#x7CFB;&#xFF0C;&#x65E2;&#x53EF;&#x4EE5;&#x547D;&#x540D;&#x53C2;&#x6570;&#xFF0C;&#x4F46;&#x4E0D;&#x4F20;(&#x6B64;&#x65F6;&#x9ED8;&#x8BA4;&#x4E3A;undefined)&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4E0D;&#x547D;&#x540D;&#x53C2;&#x6570;&#xFF0C;&#x4F46;&#x4F20;&#x53C2;&#x6570;</strong>&#xFF0C;&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x5728;JS&#x4E2D;&#x662F;&#x5408;&#x6CD5;&#x7684;&#xFF0C;&#x53CD;&#x4E4B;&#xFF0C;&#x5F3A;&#x7C7B;&#x578B;&#x8BED;&#x8A00;&#xFF0C;&#x5BF9;&#x8FD9;&#x4E2A;&#x8981;&#x6C42;&#x5C31;&#x975E;&#x5E38;&#x4E25;&#x683C;&#xFF0C;&#x5B9A;&#x4E49;&#x4E86;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#x5C31;&#x4E00;&#x5B9A;&#x8981;&#x4F20;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#x4E0B;&#x53BB;&#x3002;<strong>&#x547D;&#x540D;&#x53C2;&#x6570;&#x8FD9;&#x5757;&#x5FC5;&#x987B;&#x8981;&#x6C42;&#x4E8B;&#x5148;&#x521B;&#x5EFA;&#x51FD;&#x6570;&#x7B7E;&#x540D;&#xFF0C;&#x800C;&#x5C06;&#x6765;&#x7684;&#x8C03;&#x7528;&#x4E5F;&#x5FC5;&#x987B;&#x4E0E;&#x8BE5;&#x7B7E;&#x540D;&#x4E00;&#x81F4;&#x3002;</strong>(&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x5B9A;&#x4E49;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#x5C31;&#x8981;&#x4F20;&#x51E0;&#x4E2A;&#x4E0B;&#x53BB;)**&#xFF0C;&#x800C;js&#x6CA1;&#x6709;&#x8FD9;&#x4E9B;&#x6761;&#x6761;&#x6846;&#x6846;&#xFF0C;&#x89E3;&#x6790;&#x5668;&#x4E0D;&#x4F1A;&#x9A8C;&#x8BC1;&#x547D;&#x540D;&#x53C2;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x8BF4;js&#x6CA1;&#x6709;&#x7B7E;&#x540D;&#x3002;</blockquote><p>&#x4E3E;&#x4E2A;&#x1F330;</p><pre><code>function JSNoSignature () {  
  console.log(&quot;first params&quot; + arguments[0] + &quot;,&quot; + &quot;second params&quot; + arguments[1]);
}
JSNoSignature (&quot;hello&quot;, &quot;world&quot;);</code></pre><p>&#x8FD9;&#x4E2A;&#x1F330;&#x5F88;&#x660E;&#x663E;&#x4E86;&#x3002;&#x547D;&#x540D;&#x53C2;&#x6570;&#x4E3A;&#x7A7A;&#xFF0C;&#x4F46;&#x6211;&#x4EEC;&#x4F9D;&#x65E7;&#x53EF;&#x4EE5;&#x4F20;&#x53C2;&#xFF0C;&#x8C03;&#x7528;&#x8BE5;&#x65B9;&#x6CD5;&#x3002;&#x6240;&#x8C13;&#x7684;&#x53C2;&#x6570;&#x7C7B;&#x578B;&#xFF0C;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#xFF0C;&#x53C2;&#x6570;&#x4F4D;&#x7F6E;&#xFF0C;&#x51FA;&#x5165;&#x53C2;&#x6570;&#xFF0C;js&#x7EDF;&#x7EDF;&#x4E0D;&#x5173;&#x5FC3;&#xFF0C;&#x5B83;&#x6240;&#x6709;&#x7684;&#x503C;&#x90FD;&#x88AB;&#x653E;&#x5230;arguments&#x4E2D;&#x4E86;&#xFF0C;&#x9700;&#x8981;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x8BDD;&#x76F4;&#x63A5;return&#xFF0C;&#x4E0D;&#x7528;&#x58F0;&#x660E;&#xFF0C;&#x8FD9;&#x5C31;&#x53EB;&#x505A;js&#x6CA1;&#x6709;&#x7B7E;&#x540D;&#x3002;</p><h3>&#x539F;&#x578B;&#x94FE;</h3><p>&#x4EC0;&#x4E48;&#x662F;&#x539F;&#x578B;&#x94FE;&#x5462;&#xFF1F;&#x5B57;&#x9762;&#x4E0A;&#x4E5F;&#x5F88;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x5C31;&#x662F;&#x5C06;&#x6240;&#x6709;&#x7684;&#x539F;&#x578B;&#x4E32;&#x5728;&#x4E00;&#x8D77;&#x5C31;&#x53EB;&#x505A;&#x539F;&#x578B;&#x94FE;&#x3002;&#x5F53;&#x7136;&#x8FD9;&#x4E2A;&#x89E3;&#x91CA;&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x7406;&#x89E3;&#x7F62;&#x4E86;&#xFF0C;&#x539F;&#x578B;&#x94FE;&#x662F;&#x4F5C;&#x4E3A;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x7684;&#x4E3B;&#x8981;&#x65B9;&#x6CD5;&#xFF0C;&#x5176;&#x57FA;&#x672C;&#x601D;&#x60F3;&#x662F;<strong>&#x5229;&#x7528;&#x539F;&#x578B;</strong>&#x8BA9;<strong>&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7EE7;&#x627F;&#x53E6;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</strong>&#x3002;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x6BCF;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF0C;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x90FD;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;&#xFF0C;&#x800C;&#x5B9E;&#x4F8B;&#x90FD;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#x539F;&#x578B;&#x7684;&#x5185;&#x90E8;&#x6307;&#x9488;&#x3002;&#x6B64;&#x65F6;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8BA9;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7B49;&#x4E8E;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x7C7B;&#x578B;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x90A3;&#x4E48;&#x6B64;&#x65F6;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x5C06;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#x53E6;&#x4E00;&#x4E2A;&#x539F;&#x578B;&#x7684;&#x6307;&#x9488;&#xFF0C;&#x76F8;&#x5E94;&#x5730;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x539F;&#x578B;&#x4E2D;&#x4E5F;&#x5305;&#x542B;&#x7740;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#x53E6;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6307;&#x9488;&#xFF0C;&#x8FD9;&#x79CD;&#x5468;&#x800C;&#x590D;&#x59CB;&#x7684;&#x8FDE;&#x63A5;&#x5173;&#x7CFB;&#xFF0C;&#x5C31;&#x6784;&#x6210;&#x4E86;&#x5B9E;&#x4F8B;&#x4E0E;&#x539F;&#x578B;&#x7684;&#x94FE;&#x6761;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x539F;&#x578B;&#x94FE;&#x3002;</p><p><strong>&#x4E00;&#x53E5;&#x8BDD;&#x8BF4;&#x767D;&#x4E86;&#xFF0C;&#x5C31;&#x662F;&#x5B9E;&#x4F8B;&#x2192;&#x539F;&#x578B;&#x2192;&#x5B9E;&#x4F8B;&#x2192;&#x539F;&#x578B;&#x2192;&#x5B9E;&#x4F8B;... &#x8FDE;&#x63A5;&#x4E0B;&#x53BB;&#x5C31;&#x662F;&#x539F;&#x578B;&#x94FE;&#x3002;</strong></p><p>&#x6211;&#x89C9;&#x5F97;<strong>&#x7EE7;&#x627F;&#x5C31;&#x662F;&#x539F;&#x578B;&#x94FE;&#x7684;&#x4E00;&#x79CD;&#x8868;&#x73B0;&#x5F62;&#x5F0F;</strong>&#x3002;</p><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x4E86;&#x539F;&#x578B;&#x94FE;&#x540E;&#xFF0C;&#x8981;&#x77E5;&#x9053;&#x4ED6;&#x5982;&#x4F55;&#x53BB;&#x4F7F;&#x7528;&#xFF0C;ECMA&#x63D0;&#x4F9B;&#x4E00;&#x5957;&#x539F;&#x578B;&#x94FE;&#x7684;&#x57FA;&#x672C;&#x6A21;&#x5F0F;&#x57FA;&#x672C;&#x6A21;&#x5F0F;&#x1F447;</p><h4>&#x539F;&#x578B;&#x94FE;&#x7684;&#x57FA;&#x672C;&#x6A21;&#x5F0F;</h4><pre><code>// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7236;&#x7C7B;
function FatherType(){
    this.fatherName = &apos;&#x547D;&#x540D;&#x6700;&#x5934;&#x75DB;&apos;;
}

FatherType.prototype.getFatherValue = function() {
    return this.fatherName;
}

function ChildType(){
    this.childName = &apos;George&apos;;
}

// &#x7EE7;&#x627F;&#x4E86;FatherType&#xFF0C;&#x5373;&#x5C06;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x8D4B;&#x503C;&#x7ED9;&#x51FD;&#x6570;&#x539F;&#x578B;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x8BF4;&#x8FD9;&#x4E2A;&#x539F;&#x578B;&#x7EE7;&#x627F;&#x4E86;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5B9E;&#x4F8B;
// &#x5C06;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x6307;&#x5411;&#x8FD9;&#x4E2A;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;
ChildType.prototype = new FatherType();

ChildType.prototype.getChildValue = function() {
    return this.childName;
}

let instance = new ChildType();
console.log(instance.getFatherValue()); // &#x547D;&#x540D;&#x6700;&#x5934;&#x75DB;
 </code></pre><p>&#x8C03;&#x7528;instance.getFatherValue()&#x65F6;&#x4F1A;&#x7ECF;&#x5386;&#x4E09;&#x4E2A;&#x641C;&#x7D22;&#x6B65;&#x9AA4;<br>&#x2460;&#x641C;&#x7D22;&#x5B9E;&#x4F8B;<br>&#x2461;&#x641C;&#x7D22;ChildType.prototype<br>&#x2462;&#x641C;&#x7D22;FatherType.prototype&#xFF0C;&#x6B64;&#x65F6;&#x5728;&#x8FD9;&#x6B65;&#x627E;&#x5230;&#x8BE5;&#x65B9;&#x6CD5;&#xFF0C;&#x5728;&#x627E;&#x4E0D;&#x5230;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x641C;&#x7D22;&#x8FC7;&#x7A0B;&#x603B;&#x662F;&#x8981;&#x4E00;&#x73AF;&#x4E00;&#x73AF;&#x5730;&#x5411;&#x524D;&#x884C;&#x5230;&#x539F;&#x578B;&#x94FE;&#x672B;&#x7AEF;&#x624D;&#x4F1A;&#x505C;&#x4E0B;&#x6765;&#x3002;</p><p>&#x6B64;&#x65F6;&#x7684;&#x539F;&#x578B;&#x94FE;&#x662F;instance &#x2192; ChildType.prototype &#x2192; FatherType.prototype<br>&#x6267;&#x884C;instance.getFatherValue()&#x540E;&#xFF0C;getFatherValue&#x91CC;&#x9762;&#x7684;this&#x662F;ChildType&#xFF0C;&#x6B64;&#x65F6;ChildType&#x4F1A;&#x6839;&#x636E;&#x539F;&#x578B;&#x94FE;&#x53BB;&#x627E;fatherName&#x5C5E;&#x6027;&#xFF0C;&#x6700;&#x7EC8;&#x5728;FatherType&#x4E2D;&#x627E;&#x5230;&#x3002;<br><strong>&#x6B64;&#x65F6;instance.constructor&#x662F;&#x6307;&#x5411;FatherType&#x7684;</strong></p><h4>&#x9ED8;&#x8BA4;&#x7684;&#x539F;&#x578B;</h4><blockquote><strong>&#x6240;&#x6709;&#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x9ED8;&#x8BA4;&#x90FD;&#x7EE7;&#x627F;&#x4E86;Object</strong>&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;&#x7EE7;&#x627F;&#x4E5F;&#x662F;&#x901A;&#x8FC7;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;<strong>&#x6240;&#x6709;&#x51FD;&#x6570;&#x7684;&#x9ED8;&#x8BA4;&#x539F;&#x578B;&#x90FD;&#x662F;Object&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x56E0;&#x6B64;&#x9ED8;&#x8BA4;&#x539F;&#x578B;&#x90FD;&#x4F1A;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x5185;&#x90E8;&#x6307;&#x9488;&#xFF0C;&#x6307;&#x5411;Object&#x3002;prototype</strong>&#xFF0C;&#x8FD9;&#x4E5F;&#x5C31;&#x662F;&#x6240;&#x6709;&#x81EA;&#x5B9A;&#x4E49;&#x7C7B;&#x578B;&#x90FD;&#x4F1A;&#x7EE7;&#x627F;toString()&#xFF0C;valueOf()&#x7B49;&#x9ED8;&#x8BA4;&#x65B9;&#x6CD5;&#x7684;&#x6839;&#x672C;&#x539F;&#x56E0;&#x3002;<br>Array&#x7C7B;&#x578B;&#x4E5F;&#x662F;&#x7EE7;&#x627F;&#x4E86;Object&#x7C7B;&#x578B;&#x7684;&#x3002;<br>&#x56E0;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#xFF0C;&#x5728;&#x539F;&#x578B;&#x94FE;&#x7684;&#x6700;&#x9876;&#x7AEF;&#x5C31;&#x662F;Object&#x7C7B;&#x578B;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x51FD;&#x6570;&#x9ED8;&#x8BA4;&#x90FD;&#x7EE7;&#x627F;&#x4E86;Object&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x3002;</blockquote><h4>&#x539F;&#x578B;&#x548C;&#x5B9E;&#x4F8B;&#x5173;&#x7CFB;&#x7684;&#x786E;&#x8BA4;</h4><h5>isPrototypeOf&#x65B9;&#x6CD5;</h5><p>&#x5728;<a href="https://segmentfault.com/a/1190000016065038">&#x4E00;&#x773C;&#x770B;&#x7A7F;&#x1F440;JS&#x539F;&#x578B;</a>&#x4E2D;&#x6211;&#x4EEC;&#x6709;&#x63D0;&#x5230;&#x8FC7;isPrototypeOf&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x5224;&#x65AD;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x7684;&#x6307;&#x9488;&#x662F;&#x5426;&#x6307;&#x5411;&#x8FD9;&#x4E2A;&#x539F;&#x578B;&#xFF0C;&#x8FD9;&#x4E00;&#x7AE0;&#x6211;&#x4EEC;&#x5B66;&#x4E60;&#x4E86;&#x539F;&#x578B;&#x94FE;&#xFF0C;&#x8FD9;&#x91CC;&#x505A;&#x4E2A;&#x8865;&#x5145;&#xFF0C;<strong>&#x6309;&#x7167;&#x539F;&#x578B;&#x94FE;&#x7684;&#x5148;&#x540E;&#x987A;&#x5E8F;&#xFF0C;isPrototypeOf&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x5224;&#x65AD;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x662F;&#x5426;&#x5C5E;&#x4E8E;&#x8FD9;&#x4E2A;&#x539F;&#x578B;&#x7684;</strong>&#x3002;</p><pre><code>&#x4F9D;&#x65E7;&#x7528;&#x4E0A;&#x9762;&#x90A3;&#x4E2A;&#x1F330;
// &#x6CE8;&#x610F;&#xFF0C;&#x8FD9;&#x91CC;&#x7528;&#x7684;&#x662F;&#x539F;&#x578B;&#xFF0C;Object.prototype&#xFF0C;FatherType.prototype&#xFF0C;ChildType.prototype
console.log(Object.prototype.isPrototypeOf(instance)); // true
console.log(FatherType.prototype.isPrototypeOf(instance)); // true
console.log(ChildType.prototype.isPrototypeOf(instance)); // true</code></pre><p>&#x4E0B;&#x9762;&#x518D;&#x4ECB;&#x7ECD;&#x53E6;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#xFF0C;&#x901A;&#x8FC7;instanceof&#x64CD;&#x4F5C;&#x7B26;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x786E;&#x5B9A;&#x539F;&#x578B;&#x548C;&#x5B9E;&#x4F8B;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;</p><h5>instanceof&#x64CD;&#x4F5C;&#x7B26;</h5><p>instanceof&#x64CD;&#x4F5C;&#x7B26;&#x662F;&#x7528;&#x6765;&#x6D4B;&#x8BD5;&#x539F;&#x578B;&#x94FE;&#x4E2D;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x662F;&#x5426;&#x6709;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;</p><pre><code>console.log(instance instanceof Object); // true
console.log(instance instanceof FatherType); // true
console.log(instance instanceof ChildType); // true</code></pre><p><strong>&#x4E0E;isPrototypeOf&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;&#x524D;&#x8005;&#x7528;&#x7684;&#x662F;&#x539F;&#x578B;&#xFF0C;&#x540E;&#x8005;&#x7528;&#x7684;&#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;</strong></p><h4>&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;&#x65F6;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x95EE;&#x9898;</h4><p>&#x2460;&#x7ED9;&#x539F;&#x578B;&#x6DFB;&#x52A0;&#x65B9;&#x6CD5;&#x7684;&#x4EE3;&#x7801;&#x4E00;&#x5B9A;&#x8981;&#x653E;&#x5728;&#x7EE7;&#x627F;&#x4E4B;&#x540E;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#xFF0C;&#x5728;&#x7EE7;&#x627F;&#x7684;&#x65F6;&#x5019;&#x88AB;&#x7EE7;&#x627F;&#x8005;&#x4F1A;&#x8986;&#x76D6;&#x6389;&#x7EE7;&#x627F;&#x8005;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x6240;&#x6709;&#x65B9;&#x6CD5;</p><pre><code>function FatherType(){
    this.fatherName = &apos;&#x547D;&#x540D;&#x6700;&#x5934;&#x75DB;&apos;;
}

FatherType.prototype.getFatherValue = function() {
    return this.fatherName;
}

function ChildType(){
    this.childName = &apos;George&apos;;
}

// &#x7EE7;&#x627F;&#x4E86;FatherType
ChildType.prototype = new FatherType();

// &#x521B;&#x5EFA;&#x5B9E;&#x4F8B;
let instance = new ChildType();

// &#x4E3A;ChildType&#x539F;&#x578B;&#x4E0A;&#x6DFB;&#x52A0;&#x65B0;&#x65B9;&#x6CD5;&#xFF0C;&#x8981;&#x653E;&#x5728;&#x7EE7;&#x627F;FatherType&#x4E4B;&#x540E;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;new FatherType()&#x4F1A;&#x5C06;ChildType&#x539F;&#x578B;&#x4E0A;&#x6DFB;&#x52A0;&#x7684;&#x65B0;&#x65B9;&#x6CD5;&#x5168;&#x90E8;&#x8986;&#x76D6;&#x6389;

ChildType.prototype.getChildValue = function() {
    return this.childName;
}

// &#x6B64;&#x65F6;getFatherValue&#x88AB;&#x91CD;&#x5199;&#x4E86;
ChildType.prototype.getFatherValue = function() {
    return true
}

console.log(instance.getFatherValue()); // true </code></pre><p>&#x2461;&#x901A;&#x8FC7;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x65F6;&#xFF0C;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;&#x521B;&#x5EFA;&#x539F;&#x578B;&#x65B9;&#x6CD5;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x6837;&#x4F1A;&#x91CD;&#x5199;&#x539F;&#x578B;&#x94FE;&#x3002;&#x8FD9;&#x90E8;&#x5206;&#x7684;&#x1F330;&#x548C;&#x89E3;&#x91CA;&#x5728;<a href="https://segmentfault.com/a/1190000016065038">&#x4E00;&#x773C;&#x770B;&#x7A7F;&#x1F440;JS&#x539F;&#x578B;</a>&#x4E2D;&#x300A;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x95EE;&#x9898;&#x300B;&#x8FD9;&#x4E00;&#x5C0F;&#x8282;&#x5DF2;&#x7ECF;&#x8868;&#x8FF0;&#x8FC7;&#x4E86;&#x3002;&#x4E00;&#x6837;&#x7684;&#x9053;&#x7406;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x628A;&#x539F;&#x578B;&#x6362;&#x6210;&#x4E86;&#x539F;&#x578B;&#x94FE;&#x7F62;&#x4E86;&#x3002;</p><h4>&#x539F;&#x578B;&#x94FE;&#x7684;bug</h4><p>&#x539F;&#x578B;&#x94FE;&#x867D;&#x7136;&#x5F3A;&#x5927;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x5B83;&#x6765;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x662F;&#x5B58;&#x5728;bug&#x7684;&#xFF0C;&#x5B83;&#x6700;&#x5927;&#x7684;bug&#x6765;&#x81EA;<strong>&#x5305;&#x542B;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x503C;&#x7684;&#x539F;&#x578B;</strong>&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x9762;&#x5B9A;&#x4E49;&#x7684;&#x539F;&#x578B;&#x5C5E;&#x6027;&#x4F1A;&#x88AB;&#x6240;&#x6709;&#x7684;&#x5B9E;&#x4F8B;&#x5171;&#x4EAB;&#x3002;<br>&#x5B83;&#x8FD8;&#x6709;&#x53E6;&#x5916;&#x4E00;&#x4E2A;bug&#xFF0C;&#x5373;<strong>&#x5728;&#x521B;&#x5EFA;&#x5B50;&#x7C7B;&#x578B;&#x7684;&#x5B9E;&#x4F8B;&#x65F6;&#xFF0C;&#x4E0D;&#x80FD;&#x5411;&#x7236;&#x7C7B;&#x578B;&#xFF08;&#x8D85;&#x7C7B;&#x578B;&#xFF09;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x4F20;&#x9012;&#x53C2;&#x6570;</strong>&#x3002;&#x6216;&#x8005;&#x8BF4;&#x6CA1;&#x6709;&#x529E;&#x6CD5;&#x5728;&#x4E0D;&#x5F71;&#x54CD;&#x6240;&#x6709;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x7ED9;&#x8D85;&#x7C7B;&#x578B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x3002;<br>&#x57FA;&#x4E8E;&#x4EE5;&#x4E0A;&#x8FD9;&#x4E24;&#x4E2A;&#x539F;&#x56E0;&#xFF0C;&#x5B9E;&#x8DF5;&#x8FC7;&#x7A0B;&#x4E2D;&#x5F88;&#x5C11;&#x4F1A;&#x5355;&#x72EC;&#x4F7F;&#x7528;&#x539F;&#x578B;&#x94FE;</p><h3>&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;</h3><p>&#x5176;<strong>&#x8BBE;&#x8BA1;&#x601D;&#x60F3;&#x5C31;&#x662F;&#x5728;&#x5B50;&#x7C7B;&#x578B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5185;&#x90E8;&#x8C03;&#x7528;&#x7236;&#x7C7B;(&#x8D85;&#x7C7B;)&#x6784;&#x9020;&#x51FD;&#x6570;</strong>&#x3002;<br>&#x7531;&#x4E8E;<strong>&#x51FD;&#x6570;&#x53EA;&#x4E0D;&#x8FC7;&#x662F;&#x5728;&#x7279;&#x5B9A;&#x73AF;&#x5883;&#x4E2D;&#x6267;&#x884C;&#x4EE3;&#x7801;&#x7684;&#x5BF9;&#x8C61;</strong>&#xFF0C;&#x56E0;&#x6B64;&#x901A;&#x8FC7;apply()&#x548C;call()&#x65B9;&#x6CD5;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;(&#x5C06;&#x6765;)&#x65B0;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#x4E0A;&#x6267;&#x884C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</p><pre><code>function FatherType() {
  this.name = &apos;George&apos;;
} 

function ChildType() {
  //&#x901A;&#x8FC7;call&#x65B9;&#x6CD5;&#x6539;&#x53D8;this&#x7684;&#x6307;&#x5411;&#xFF0C;&#x6B64;&#x65F6;FatherType&#x4E2D;&#x7684;this&#x6307;&#x7684;&#x662F;ChildType&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x5B9A;&#x4E49;&#x81EA;&#x5DF1;&#x7684;&#x5C5E;&#x6027;&#x3002;
  FatherType.call(this);
}

let instance1 = new ChildType(); 
instance1.name = &apos;&#x547D;&#x540D;&#x6700;&#x5934;&#x75DB;&apos;;
console.log(instance1.name); // &apos;&#x547D;&#x540D;&#x6700;&#x5934;&#x75DB;&apos;

let instance2 = new ChildType();
console.log(instance2.name); // George</code></pre><p>&#x901A;&#x8FC7;&#x4E0A;&#x8FF0;&#x65B9;&#x6CD5;&#x5F88;&#x597D;&#x89E3;&#x51B3;&#x4E86;&#x539F;&#x578B;&#x5C5E;&#x6027;&#x5171;&#x4EAB;&#x95EE;&#x9898;&#xFF0C;&#x6B64;&#x5916;&#xFF0C;&#x65E2;&#x7136;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x4E5F;&#x80FD;&#x4F20;&#x76F8;&#x5E94;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x56E0;&#x6B64;&#x4E5F;&#x80FD;&#x5B9E;&#x73B0;<strong>&#x5728;&#x5B50;&#x7C7B;&#x578B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x5411;&#x8D85;&#x7C7B;&#x578B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x9012;&#x53C2;&#x6570;</strong>&#x3002;</p><pre><code>function FatherType(name){
  this.name = name
}
function ChildType(){
  FatherType.call(this, &quot;George&quot;);
  this.age = 18
}
let instance = new ChildType();
console.log(instance.name);  // George
console.log(instance.age);   // 18</code></pre><p>&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x95EE;&#x9898;<br>&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x65B9;&#x6CD5;&#x90FD;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x5B9A;&#x4E49;&#xFF0C;&#x90A3;&#x4E48;&#x51FD;&#x6570;&#x7684;&#x590D;&#x7528;&#x5C31;&#x65E0;&#x4ECE;&#x8C08;&#x8D77;&#xFF0C;&#x800C;&#x4E14;&#x5728;&#x7236;&#x7C7B;(&#x8D85;&#x7C7B;&#x578B;)&#x7684;&#x539F;&#x578B;&#x5B9A;&#x4E49;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5BF9;&#x5B50;&#x7C7B;&#x578B;&#x800C;&#x8A00;&#x4E5F;&#x662F;&#x4E0D;&#x53EF;&#x89C1;&#x7684;&#xFF0C;&#x7ED3;&#x679C;&#x6240;&#x6709;&#x7C7B;&#x578B;&#x90FD;&#x53EA;&#x80FD;&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x3002;</p><h3>&#x7EC4;&#x5408;&#x7EE7;&#x627F;</h3><p>&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x4E5F;&#x53EB;&#x4F2A;&#x7ECF;&#x5178;&#x7EE7;&#x627F;&#xFF0C;&#x5176;&#x8BBE;&#x8BA1;&#x601D;&#x60F3;&#x662F;&#x5C06;&#x539F;&#x578B;&#x94FE;&#x548C;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6280;&#x672F;&#x7EC4;&#x5408;&#x5230;&#x4E00;&#x5757;&#xFF0C;&#x53D1;&#x6325;&#x4E8C;&#x8005;&#x4E4B;&#x957F;&#x7684;&#x4E00;&#x79CD;&#x7EE7;&#x627F;&#x6A21;&#x5F0F;&#xFF0C;&#x5176;&#x80CC;&#x540E;&#x7684;&#x601D;&#x8DEF;&#x662F;&#x4F7F;&#x7528;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;&#x5BF9;&#x539F;&#x578B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x7684;&#x7EE7;&#x627F;&#xFF0C;&#x800C;&#x901A;&#x8FC7;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x5B9E;&#x73B0;&#x5BF9;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x7684;&#x7EE7;&#x627F;&#xFF0C;&#x8FD9;&#x6837;&#x65E2;&#x901A;&#x8FC7;&#x5728;&#x539F;&#x578B;&#x4E0A;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x4E86;&#x51FD;&#x6570;&#x590D;&#x7528;&#xFF0C;&#x53C8;&#x80FD;&#x591F;&#x4FDD;&#x8BC1;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x90FD;&#x6709;&#x5B83;&#x81EA;&#x5DF1;&#x7684;&#x5C5E;&#x6027;&#x3002;</p><pre><code>function FatherType(name){
  this.name = name
  this.colors = [&apos;red&apos;, &apos;blue&apos;, &apos;green&apos;]
}

FatherType.prototype.sayName = function() {
  console.log(this.name)
}

// &#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5B9E;&#x73B0;&#x5BF9;&#x5B9E;&#x4F8B;&#x7684;&#x7EE7;&#x627F;
function ChildType(name, age){
  // &#x4F7F;&#x7528;call&#x65B9;&#x6CD5;&#x7EE7;&#x627F;FatherType&#x4E2D;&#x7684;&#x5C5E;&#x6027;
  FatherType.call(this, name);
  this.age = age
}

// &#x5229;&#x7528;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;&#x5BF9;&#x539F;&#x578B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x7684;&#x7EE7;&#x627F;
ChildType.prototype = new FatherType(); //&#x5C06;FatherType&#x7684;&#x5B9E;&#x4F8B;&#x8D4B;&#x503C;&#x7ED9;ChildType&#x539F;&#x578B;
ChildType.prototype.constructor = ChildType; // &#x8BA9;ChildType&#x7684;&#x539F;&#x578B;&#x6307;&#x5411;ChildType&#x51FD;&#x6570;
ChildType.prototype.sayAge = function(){
  console.log(this.age)
}
let instance1 = new ChildType(&apos;&#x547D;&#x540D;&#x6700;&#x5934;&#x75DB;&apos;, 18);
instance1.colors.push(&apos;black&apos;);
console.log(instance1.colors);         // &apos;red, blue, green, black&apos;
instance1.sayName();
instance1.sayAge();

var instance2 = new ChildType(&apos;&#x547D;&#x540D;&#x6700;&#x5934;&#x75DB;&apos;, 18);
console.log(instance2.colors);         // &apos;red, blue, green&apos;
instance2.sayName();                   // &apos;&#x547D;&#x540D;&#x6700;&#x5934;&#x75DB;&apos;
instance2.sayAge();                    // 18</code></pre><p>&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x907F;&#x514D;&#x4E86;&#x539F;&#x578B;&#x94FE;&#x548C;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x7F3A;&#x9677;&#xFF0C;&#x662F;JS&#x4E2D;&#x5E38;&#x7528;&#x7684;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x3002;</p><h3>&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;</h3><p>&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x4E25;&#x683C;&#x610F;&#x4E49;&#x4E0A;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5176;&#x601D;&#x60F3;&#x662F;&#x57FA;&#x4E8E;&#x5DF2;&#x6709;&#x7684;&#x5BF9;&#x8C61;&#x521B;&#x5EFA;&#x65B0;&#x5BF9;&#x8C61;</p><pre><code>// &#x6B64;object&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;, &#x5B9E;&#x9645;&#x4E0A;object()&#x5BF9;&#x4F20;&#x5165;&#x5176;&#x4E2D;&#x7684;&#x5BF9;&#x8C61;&#x6267;&#x884C;&#x4E86;&#x4E00;&#x6B21;&#x6D45;&#x590D;&#x5236;.
function object(o) {
  function F() {}  // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4E34;&#x65F6;&#x6784;&#x9020;&#x51FD;&#x6570;
  F.prototype = o; // &#x5C06;&#x4F20;&#x5165;&#x7684;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;
  return new F();  // &#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x4E34;&#x65F6;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65B0;&#x5B9E;&#x4F8B;
}

let demo = {
  name: &apos;George&apos;,
  like: [&apos;apple&apos;, &apos;dog&apos;]
}

let demo1 = object(demo);
demo1.name = &apos;&#x547D;&#x540D;&apos;;     // &#x57FA;&#x672C;&#x7C7B;&#x578B;
demo1.like.push(&apos;cat&apos;); // &#x5F15;&#x7528;&#x7C7B;&#x578B;&#x5171;&#x7528;&#x4E00;&#x4E2A;&#x5185;&#x5B58;&#x5730;&#x5740;

let demo2 = object(demo);
demo2.name = &apos;&#x5934;&#x75DB;&apos;;    // &#x57FA;&#x672C;&#x7C7B;&#x578B;
demo2.like.push(&apos;chicken&apos;) // &#x5F15;&#x7528;&#x7C7B;&#x578B;&#x5171;&#x7528;&#x4E00;&#x4E2A;&#x5185;&#x5B58;&#x5730;&#x5740;
console.log(demo.name) // George
console.log(demo.like) // [&quot;apple&quot;, &quot;dog&quot;, &quot;cat&quot;, &quot;chicken&quot;]</code></pre><p><strong>&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x7684;&#x524D;&#x63D0;&#x662F;&#x5FC5;&#x987B;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x53E6;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x57FA;&#x7840;&#x3002;&#x901A;&#x8FC7;object()&#x51FD;&#x6570;&#x751F;&#x6210;&#x65B0;&#x5BF9;&#x8C61;&#x540E;&#xFF0C;&#x518D;&#x6839;&#x636E;&#x9700;&#x6C42;&#x5BF9;&#x65B0;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#x5373;&#x53EF;&#x3002;</strong> &#x7531;&#x4E8E;&#x65B0;&#x5BF9;&#x8C61;(demo1, demo2)&#x662F;&#x5C06;&#x4F20;&#x5165;&#x5BF9;&#x8C61;(demo)&#x4F5C;&#x4E3A;&#x539F;&#x578B;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x5F53;&#x6D89;&#x53CA;&#x5230;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x65F6;&#xFF0C;&#x4ED6;&#x4EEC;&#x4F1A;&#x5171;&#x7528;&#x4E00;&#x4E2A;&#x5185;&#x5B58;&#x5730;&#x5740;&#xFF0C;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x4F1A;&#x88AB;&#x6240;&#x6709;&#x5B9E;&#x4F8B;&#x6240;&#x5171;&#x4EAB;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x76F8;&#x5F53;&#x4E8E;&#x521B;&#x5EFA;&#x4E86;demo&#x5BF9;&#x8C61;&#x7684;&#x4E24;&#x4E2A;&#x526F;&#x672C;&#x3002;</p><h4>Object.create()&#x65B9;&#x6CD5;</h4><blockquote>ECMA5&#x4E2D;&#x65B0;&#x589E;Object.create()&#x65B9;&#x6CD5;&#x89C4;&#x8303;&#x5316;&#x4E86;&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;&#x3002;&#x8BE5;&#x65B9;&#x6CD5;&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;<br>&#x2460;&#x57FA;&#x7840;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x5B9E;&#x9645;&#x4F5C;&#x7528;&#x662F;&#x5B9A;&#x4E49;&#x4E86;&#x6A21;&#x677F;&#x5BF9;&#x8C61;&#x4E2D;&#x6709;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5C31;&#x50CF;&#x4E0A;&#x9762;&#x1F330;&#x4E2D;&#x7684;demo&#xFF0C;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;Object.create()&#x4E0E;&#x4E0A;&#x1F330;&#x4E2D;&#x7684;object&#x76F8;&#x540C;<br>&#x2461;&#x8FD9;&#x4E2A;&#x662F;&#x53EF;&#x9009;&#x53C2;&#x6570;&#xFF0C;&#x4E00;&#x4E2A;&#x4E3A;&#x57FA;&#x7840;&#x5BF9;&#x8C61;&#x5B9A;&#x4E49;&#x989D;&#x5916;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;, &#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x4E66;&#x5199;&#x683C;&#x5F0F;&#x4E0E;Object.defineProperties()&#x65B9;&#x6CD5;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x683C;&#x5F0F;&#x76F8;&#x540C;&#xFF0C;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x90FD;&#x662F;&#x901A;&#x8FC7;&#x81EA;&#x5DF1;&#x7684;&#x63CF;&#x8FF0;&#x7B26;&#x5B9A;&#x4E49;&#x7684;&#xFF0C;&#x4EE5;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x6307;&#x5B9A;&#x7684;&#x4EFB;&#x4F55;&#x5C5E;&#x6027;&#x90FD;&#x4F1A;&#x8986;&#x76D6;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x540C;&#x540D;&#x5C5E;&#x6027;&#x3002;</blockquote><pre><code>// &#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x53C2;&#x6570;
var demoObj = {
  name: &apos;George&apos;,
  like: [&apos;apple&apos;, &apos;dog&apos;, &apos;cat&apos;]
}
let demo1Obj = Object.create(demoObj);
demo1Obj.name = &apos;&#x547D;&#x540D;&apos;;
demo1Obj.like.push(&apos;banana&apos;);

let demo2Obj = Object.create(demoObj);
demo2Obj.name = &apos;&#x5934;&#x75DB;&apos;;
demo2Obj.like.push(&apos;walk&apos;);

console.log(demoObj.like) //[&quot;apple&quot;, &quot;dog&quot;, &quot;cat&quot;, &quot;banana&quot;, &quot;walk&quot;]

// &#x4E24;&#x4E2A;&#x53C2;&#x6570;
var demoObj = {
  name: &apos;George&apos;,
  like: [&apos;apple&apos;, &apos;dog&apos;, &apos;cat&apos;]
}

let demo1Obj = Object.create(demoObj, {
  name: {
    value:&apos;&#x547D;&#x540D;&apos;
  },
  like:{
    value: [&apos;monkey&apos;]
  },
  new_val: {
    value: &apos;new_val&apos;
  }
});
console.log(demoObj.name) // George
console.log(demo1Obj.name) // &#x547D;&#x540D;
console.log(demo1Obj.like) // [&quot;monkey&quot;]
console.log(demo1Obj.new_val) // new_val
console.log(Object.getOwnPropertyDescriptor(demo1Obj,&apos;new_val&apos;)) // {value: &quot;new_val&quot;, writable: false, enumerable: false, configurable: false}
</code></pre><p>&#x5982;&#x679C;&#x53EA;&#x60F3;&#x8BA9;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0E;&#x53E6;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4FDD;&#x6301;&#x7C7B;&#x578B;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;&#x662F;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x80DC;&#x4EFB;&#x7684;&#xFF0C;&#x4E0D;&#x8FC7;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x503C;&#x7684;&#x5C5E;&#x6027;&#x59CB;&#x7EC8;&#x90FD;&#x4F1A;&#x5171;&#x4EAB;&#x76F8;&#x5E94;&#x7684;&#x503C;&#x3002;</p><h3>&#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;</h3><p>&#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;&#x662F;&#x4E0E;&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;&#x7D27;&#x5BC6;&#x76F8;&#x5173;&#x7684;&#x4E00;&#x79CD;&#x601D;&#x8DEF;&#xFF0C;&#x5176;&#x8BBE;&#x8BA1;&#x601D;&#x60F3;&#x4E0E;&#x5BC4;&#x751F;&#x6784;&#x9020;&#x51FD;&#x6570;&#x548C;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x7C7B;&#x4F3C;&#xFF0C;&#x5373;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4EC5;&#x7528;&#x4E8E;&#x5C01;&#x88C5;&#x7EE7;&#x627F;&#x8FC7;&#x7A0B;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x4EE5;&#x67D0;&#x79CD;&#x65B9;&#x5F0F;&#x6765;&#x589E;&#x5F3A;&#x5BF9;&#x8C61;&#xFF0C;&#x6700;&#x540E;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;</p><pre><code>// &#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x6240;&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x65E2;&#x6709;original&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x4E5F;&#x6709;&#x81EA;&#x5DF1;&#x7684;sayHello&#x65B9;&#x6CD5;
function createAnother(original) {
  let clone = Object.create(original);
  clone.sayHello = function(){            
    console.log(&apos;HELLO WORLD&apos;)
  }
  return clone;
}

let person = {
  name: &apos;George&apos;,
  foods: [&apos;apple&apos;, &apos;banana&apos;]
}

let anotherPerson = createAnother(person);
anotherPerson.sayHello();  // HELLO WORLD</code></pre><p>&#x4F7F;&#x7528;&#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;&#x6765;&#x4E3A;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x51FD;&#x6570;&#xFF0C;&#x4F1A;&#x7531;&#x4E8E;&#x4E0D;&#x80FD;&#x505A;&#x5230;&#x51FD;&#x6570;&#x590D;&#x7528;&#x800C;&#x964D;&#x4F4E;&#x6548;&#x7387;&#xFF0C;&#x8FD9;&#x4E00;&#x70B9;&#x4E0E;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#x7C7B;&#x4F3C;&#x3002;</p><h3>&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;</h3><p>&#x6240;&#x8C13;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#xFF0C;&#x5373;&#x901A;&#x8FC7;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x7EE7;&#x627F;&#x5C5E;&#x6027;&#xFF0C;&#x901A;&#x8FC7;&#x539F;&#x578B;&#x94FE;&#x7684;&#x6DF7;&#x5408;&#x5F62;&#x5F0F;&#x6765;&#x7EE7;&#x627F;&#x65B9;&#x6CD5;&#x3002;&#x5176;&#x80CC;&#x540E;&#x601D;&#x60F3;&#xFF1A;&#x4E0D;&#x5FC5;&#x4E3A;&#x4E86;&#x6307;&#x5B9A;&#x5B50;&#x7C7B;&#x578B;&#x7684;&#x539F;&#x578B;&#x800C;&#x8C03;&#x7528;&#x8D85;&#x7C7B;&#x578B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x6211;&#x4EEC;&#x6240;&#x9700;&#x8981;&#x7684;&#x65E0;&#x975E;&#x5C31;&#x662F;&#x8D85;&#x7C7B;&#x578B;&#x539F;&#x578B;&#x7684;&#x4E00;&#x4E2A;&#x526F;&#x672C;&#x800C;&#x5DF2;&#x3002;&#x8BF4;&#x767D;&#x4E86;&#x5C31;&#x662F;&#x4F7F;&#x7528;&#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;&#x6765;&#x7EE7;&#x627F;&#x8D85;&#x7C7B;&#x578B;&#x7684;&#x539F;&#x578B;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5C06;&#x7ED3;&#x679C;&#x6307;&#x5B9A;&#x7ED9;&#x5B50;&#x7C7B;&#x578B;&#x7684;&#x539F;&#x578B;&#x3002;</p><pre><code>function inheritPrototype(childType, fatherType){
  let fatherObj = Object.create(fatherType.prototype);  // &#x521B;&#x5EFA;&#x5BF9;&#x8C61;
  fatherObj.constructor = childType;   // &#x5F25;&#x8865;&#x91CD;&#x5199;&#x539F;&#x578B;&#x800C;&#x5931;&#x53BB;&#x7684;&#x9ED8;&#x8BA4;constructor&#x5C5E;&#x6027;
  childType.prototype = fatherObj;     // &#x6307;&#x5B9A;&#x5BF9;&#x8C61;
}</code></pre><p>&#x4E0A;&#x1F330;&#x662F;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#x6700;&#x7B80;&#x5355;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;&#x5B50;&#x7C7B;&#x578B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x548C;&#x8D85;&#x7C7B;&#x578B;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x51FD;&#x6570;&#x5185;&#x90E8;&#xFF0C;&#x2460;&#x521B;&#x5EFA;&#x4E86;&#x7236;&#x7C7B;&#x578B;&#x539F;&#x578B;&#x7684;&#x4E00;&#x4E2A;&#x526F;&#x672C;&#xFF0C;&#x2461;&#x4E3A;&#x521B;&#x5EFA;&#x7684;&#x526F;&#x672C;&#x6DFB;&#x52A0;constructor&#x5C5E;&#x6027;&#xFF0C;&#x4ECE;&#x800C;&#x5F25;&#x8865;&#x56E0;&#x91CD;&#x5199;&#x539F;&#x578B;&#x800C;&#x5931;&#x53BB;&#x7684;&#x9ED8;&#x8BA4;&#x7684;constructor&#x5C5E;&#x6027;&#x3002;&#x2462;&#x5C06;&#x65B0;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#xFF08;&#x5373;&#x526F;&#x672C;&#xFF09;&#x8D4B;&#x503C;&#x7ED9;&#x5B50;&#x7C7B;&#x578B;&#x7684;&#x539F;&#x578B;&#x3002;</p><pre><code>function FatherType(name){
  this.name = name;
  this.foods = [&apos;apple&apos;, &apos;banana&apos;];
}
FatherType.prototype.sayName = function(){
  console.log(this.name)
}
function ChildType(name, age){
  FatherType.call(this, name);
  this.age = age;
}
inheritPrototype(ChildType, FatherType);
ChildType.prototype.sayAge = function(){
  console.log(this.age)
}</code></pre><h2>&#x5C0F;&#x7ED3;</h2><ul><li>JS&#x7EE7;&#x627F;&#x7684;&#x4E3B;&#x8981;&#x65B9;&#x5F0F;&#x662F;&#x901A;&#x8FC7;&#x539F;&#x578B;&#x94FE;&#x5B9E;&#x73B0;&#x7684;</li><li>&#x5B9E;&#x4F8B;-&#x539F;&#x578B;-&#x5B9E;&#x4F8B;-&#x539F;&#x578B;...&#x65E0;&#x9650;&#x94FE;&#x63A5;&#x4E0B;&#x53BB;&#x5C31;&#x662F;&#x539F;&#x578B;&#x94FE;</li><li>&#x6240;&#x6709;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x9ED8;&#x8BA4;&#x539F;&#x578B;&#x90FD;&#x662F;Object</li><li>instanceof&#x64CD;&#x4F5C;&#x7B26;&#x548C;isPrototypeOf&#x65B9;&#x6CD5;&#x90FD;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x5224;&#x65AD;&#x5B9E;&#x4F8B;&#x4E0E;&#x539F;&#x578B;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x5176;&#x533A;&#x522B;&#x662F;&#xFF0C;&#x524D;&#x8005;&#x7528;&#x7684;&#x662F;&#x539F;&#x578B;&#xFF0C;&#x540E;&#x8005;&#x7528;&#x7684;&#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;</li><li>&#x7ED9;&#x539F;&#x578B;&#x6DFB;&#x52A0;&#x65B9;&#x6CD5;&#x7684;&#x4EE3;&#x7801;&#x4E00;&#x5B9A;&#x8981;&#x653E;&#x5728;&#x7EE7;&#x627F;&#x4E4B;&#x540E;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#xFF0C;&#x5728;&#x7EE7;&#x627F;&#x7684;&#x65F6;&#x5019;&#x88AB;&#x7EE7;&#x627F;&#x8005;&#x4F1A;&#x8986;&#x76D6;&#x6389;&#x7EE7;&#x627F;&#x8005;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x6240;&#x6709;&#x65B9;&#x6CD5;</li><li>Object.create()&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x5176;&#x5C5E;&#x6027;&#x4F1A;&#x653E;&#x7F6E;&#x5728;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x4E0A;</li><li>&#x7EE7;&#x627F;&#x6709;6&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x5206;&#x522B;&#x662F;&#x539F;&#x578B;&#x94FE;&#xFF0C;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#xFF0C;&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;&#xFF0C;&#x5BC4;&#x751F;&#x5F0F;&#x7EE7;&#x627F;&#x548C;&#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一眼看穿👀JS继承

## 原文链接
[https://segmentfault.com/a/1190000016243117](https://segmentfault.com/a/1190000016243117)

