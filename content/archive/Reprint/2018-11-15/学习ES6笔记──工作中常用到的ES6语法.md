---
title: '学习ES6笔记──工作中常用到的ES6语法' 
date: 2018-11-15 21:20:48
hidden: true
slug: cmqgpc7l9w
categories: [reprint]
---

{{< raw >}}
<h2>&#x4E00;&#x3001;let&#x548C;const</h2><p>&#x5728;JavaScript&#x4E2D;&#x54B1;&#x4EEC;&#x4EE5;&#x524D;&#x4E3B;&#x8981;&#x7528;&#x5173;&#x952E;var&#x6765;&#x5B9A;&#x4E49;&#x53D8;&#x91CF;&#xFF0C;ES6&#x4E4B;&#x540E;&#xFF0C;&#x65B0;&#x589E;&#x4E86;&#x5B9A;&#x4E49;&#x53D8;&#x91CF;&#x7684;&#x4E24;&#x4E2A;&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x5206;&#x522B;&#x662F;let&#x548C;const&#x3002;<br>&#x5BF9;&#x4E8E;&#x53D8;&#x91CF;&#x6765;&#x8BF4;&#xFF0C;&#x5728;ES5&#x4E2D;var&#x5B9A;&#x4E49;&#x7684;&#x53D8;&#x91CF;&#x4F1A;&#x63D0;&#x5347;&#x5230;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x51FD;&#x6570;&#x4E0E;&#x8BED;&#x53E5;&#x524D;&#x9762;&#xFF0C;&#x800C;ES6&#x4E2D;let&#x5B9A;&#x4E49;&#x7684;&#x53D8;&#x91CF;&#x5219;&#x4E0D;&#x4F1A;&#xFF0C;let&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x4F1A;&#x5728;&#x5176;&#x76F8;&#x5E94;&#x7684;&#x4EE3;&#x7801;&#x5757;&#x4E2D;&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;&#x6682;&#x65F6;&#x6027;&#x6B7B;&#x533A;&#xFF0C;&#x76F4;&#x81F3;&#x53D8;&#x91CF;&#x88AB;&#x58F0;&#x660E;&#x3002;<br>let&#x548C;const&#x90FD;&#x80FD;&#x591F;&#x58F0;&#x660E;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x7528;&#x6CD5;&#x548C;var&#x662F;&#x7C7B;&#x4F3C;&#x7684;&#xFF0C;let&#x7684;&#x7279;&#x70B9;&#x662F;&#x4E0D;&#x4F1A;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#xFF0C;&#x800C;&#x662F;&#x88AB;&#x9501;&#x5728;&#x5F53;&#x524D;&#x5757;&#x4E2D;&#x3002;</p><p>&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><pre><code>function test() {
if(true) {
  console.log(a)//TDZ&#xFF0C;&#x4FD7;&#x79F0;&#x4E34;&#x65F6;&#x6B7B;&#x533A;&#xFF0C;&#x7528;&#x6765;&#x63CF;&#x8FF0;&#x53D8;&#x91CF;&#x4E0D;&#x63D0;&#x5347;&#x7684;&#x73B0;&#x8C61;
  let a = 1
}
}
test()  // a is not defined

function test() {
    if(true) {
      let a = 1
    }
    console.log(a)
}    
test() // a is not defined</code></pre><p><strong>&#x552F;&#x4E00;&#x6B63;&#x786E;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF1A;&#x5148;&#x58F0;&#x660E;&#xFF0C;&#x518D;&#x8BBF;&#x95EE;&#x3002;</strong></p><pre><code>function test() {
    if(true) {
      let a = 1
      console.log(a)
    }
}
test() // 1</code></pre><p>const<br>&#x58F0;&#x660E;&#x5E38;&#x91CF;&#xFF0C;&#x4E00;&#x65E6;&#x58F0;&#x660E;&#xFF0C;&#x4E0D;&#x53EF;&#x66F4;&#x6539;&#xFF0C;&#x800C;&#x4E14;&#x5E38;&#x91CF;&#x5FC5;&#x987B;&#x521D;&#x59CB;&#x5316;&#x8D4B;&#x503C;&#x3002;<br>const&#x867D;&#x7136;&#x662F;&#x5E38;&#x91CF;&#xFF0C;&#x4E0D;&#x5141;&#x8BB8;&#x4FEE;&#x6539;&#x9ED8;&#x8BA4;&#x8D4B;&#x503C;&#xFF0C;&#x4F46;&#x5982;&#x679C;&#x5B9A;&#x4E49;&#x7684;&#x662F;&#x5BF9;&#x8C61;Object&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;&#x5BF9;&#x8C61;&#x5185;&#x90E8;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;</p><pre><code>const type = {
  a: 1
}
type.a = 2 //&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x4FEE;&#x6539;type&#x7684;&#x503C;&#xFF0C;&#x800C;&#x662F;&#x4FEE;&#x6539;type.a&#x7684;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x8FD9;&#x662F;&#x5141;&#x8BB8;&#x7684;&#x3002;
console.log(type) // {a: 2}</code></pre><p><strong>const&#x548C;let&#x7684;&#x5F02;&#x540C;&#x70B9;</strong><br><strong>&#x76F8;&#x540C;&#x70B9;&#xFF1A;</strong>const&#x548C;let&#x90FD;&#x662F;&#x5728;&#x5F53;&#x524D;&#x5757;&#x5185;&#x6709;&#x6548;&#xFF0C;&#x6267;&#x884C;&#x5230;&#x5757;&#x5916;&#x4F1A;&#x88AB;&#x9500;&#x6BC1;&#xFF0C;&#x4E5F;&#x4E0D;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#xFF08;TDZ&#xFF09;&#xFF0C;&#x4E0D;&#x80FD;&#x91CD;&#x590D;&#x58F0;&#x660E;&#x3002;<br><strong>&#x4E0D;&#x540C;&#x70B9;&#xFF1A;</strong>const&#x4E0D;&#x80FD;&#x518D;&#x8D4B;&#x503C;&#xFF0C;let&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x53EF;&#x4EE5;&#x91CD;&#x590D;&#x8D4B;&#x503C;&#x3002;<br><strong>const</strong>&#x5B9E;&#x9645;&#x4E0A;&#x4FDD;&#x8BC1;&#x7684;&#xFF0C;<strong>&#x5E76;&#x4E0D;&#x662F;&#x53D8;&#x91CF;&#x7684;&#x503C;&#x4E0D;&#x5F97;&#x6539;&#x52A8;&#xFF0C;&#x800C;&#x662F;&#x53D8;&#x91CF;&#x6307;&#x5411;&#x7684;&#x90A3;&#x4E2A;&#x5185;&#x5B58;&#x5730;&#x5740;&#x6240;&#x4FDD;&#x5B58;&#x7684;&#x6570;&#x636E;&#x4E0D;&#x5F97;&#x6539;&#x52A8;</strong>&#x3002;&#x5BF9;&#x4E8E;&#x7B80;&#x5355;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#xFF08;&#x6570;&#x503C;&#x3001;&#x5B57;&#x7B26;&#x4E32;&#x3001;&#x5E03;&#x5C14;&#x503C;&#xFF09;&#xFF0C;&#x503C;&#x5C31;&#x4FDD;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x6307;&#x5411;&#x7684;&#x90A3;&#x4E2A;&#x5185;&#x5B58;&#x5730;&#x5740;&#xFF0C;&#x56E0;&#x6B64;&#x7B49;&#x540C;&#x4E8E;&#x5E38;&#x91CF;&#x3002;&#x4F46;&#x5BF9;&#x4E8E;&#x590D;&#x5408;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#xFF08;&#x4E3B;&#x8981;&#x662F;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;&#xFF09;&#xFF0C;&#x53D8;&#x91CF;&#x6307;&#x5411;&#x7684;&#x5185;&#x5B58;&#x5730;&#x5740;&#xFF0C;&#x4FDD;&#x5B58;&#x7684;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#x5B9E;&#x9645;&#x6570;&#x636E;&#x7684;&#x6307;&#x9488;&#xFF0C;const&#x53EA;&#x80FD;&#x4FDD;&#x8BC1;&#x8FD9;&#x4E2A;&#x6307;&#x9488;&#x662F;&#x56FA;&#x5B9A;&#x7684;&#xFF08;&#x5373;&#x603B;&#x662F;&#x6307;&#x5411;&#x53E6;&#x4E00;&#x4E2A;&#x56FA;&#x5B9A;&#x7684;&#x5730;&#x5740;&#xFF09;&#xFF0C;&#x81F3;&#x4E8E;&#x5B83;&#x6307;&#x5411;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x662F;&#x4E0D;&#x662F;&#x53EF;&#x53D8;&#x7684;&#xFF0C;&#x5C31;&#x5B8C;&#x5168;&#x4E0D;&#x80FD;&#x63A7;&#x5236;&#x4E86;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x5C06;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x58F0;&#x660E;&#x4E3A;&#x5E38;&#x91CF;&#x5FC5;&#x987B;&#x975E;&#x5E38;&#x5C0F;&#x5FC3;&#x3002;</p><p><strong>&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;</strong><br>&#x9664;&#x4E86;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684;&#x5E38;&#x7528;&#x58F0;&#x660E;&#x65B9;&#x5F0F;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x5728;&#x5FAA;&#x73AF;&#x4E2D;&#x4F7F;&#x7528;&#xFF0C;&#x6700;&#x51FA;&#x540D;&#x7684;&#x4E00;&#x9053;&#x9762;&#x8BD5;&#x9898;&#xFF1A;&#x5FAA;&#x73AF;&#x4E2D;&#x5B9A;&#x65F6;&#x5668;&#x95ED;&#x5305;&#x7684;&#x8003;&#x9898;<br>&#x5728;for&#x5FAA;&#x73AF;&#x4E2D;&#x4F7F;&#x7528;var&#x58F0;&#x660E;&#x7684;&#x5FAA;&#x73AF;&#x53D8;&#x91CF;&#xFF0C;&#x4F1A;&#x8DF3;&#x51FA;&#x5FAA;&#x73AF;&#x4F53;&#x6C61;&#x67D3;&#x5F53;&#x524D;&#x7684;&#x51FD;&#x6570;&#x3002;</p><pre><code>for(var i = 0; i &lt; 5; i++) {
  setTimeout(() =&gt; {
    console.log(i) //5, 5, 5, 5, 5
  }, 0)
}
console.log(i) //5 i&#x8DF3;&#x51FA;&#x5FAA;&#x73AF;&#x4F53;&#x6C61;&#x67D3;&#x5916;&#x90E8;&#x51FD;&#x6570;

//&#x5C06;var&#x6539;&#x6210;let&#x4E4B;&#x540E;
for(let i = 0; i &lt; 5; i++) {
  setTimeout(() =&gt; {
    console.log(i) // 0,1,2,3,4
  }, 0)
}
console.log(i)//i is not defined i&#x65E0;&#x6CD5;&#x6C61;&#x67D3;&#x5916;&#x90E8;&#x51FD;&#x6570;</code></pre><p>&#x5728;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x9009;&#x62E9;&#x4F7F;&#x7528;var&#x3001;let&#x8FD8;&#x662F;const&#xFF0C;&#x53D6;&#x51B3;&#x4E8E;&#x6211;&#x4EEC;&#x7684;&#x53D8;&#x91CF;&#x662F;&#x4E0D;&#x662F;&#x9700;&#x8981;&#x66F4;&#x65B0;&#xFF0C;&#x901A;&#x5E38;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x53D8;&#x91CF;&#x4FDD;&#x8BC1;&#x4E0D;&#x88AB;&#x6076;&#x610F;&#x4FEE;&#x6539;&#xFF0C;&#x800C;&#x4F7F;&#x7528;&#x5927;&#x91CF;&#x7684;const&#x3002;&#x4F7F;&#x7528;const&#x58F0;&#x660E;&#xFF0C;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E5F;&#x63A8;&#x8350;&#x4F7F;&#x7528;const&#xFF0C;&#x5F53;&#x4F60;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x503C;&#x65F6;&#xFF0C;&#x4F7F;&#x7528;let&#xFF0C;var&#x80FD;&#x7528;&#x7684;&#x573A;&#x666F;&#x90FD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;let&#x66FF;&#x4EE3;&#x3002;</p><p><strong>symbol</strong><br>ES6 &#x4EE5;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x77E5;&#x9053;5&#x79CD;&#x57FA;&#x672C;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x5206;&#x522B;&#x662F;Undefined&#xFF0C;Null&#xFF0C;Boolean&#xFF0C;Number&#x4EE5;&#x53CA;String&#xFF0C;&#x7136;&#x540E;&#x52A0;&#x4E0A;&#x4E00;&#x79CD;&#x5F15;&#x7528;&#x7C7B;&#x578B;Object&#x6784;&#x6210;&#x4E86;JavaScript&#x4E2D;&#x6240;&#x6709;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x4F46;&#x662F;ES6&#x51FA;&#x6765;&#x4E4B;&#x540E;&#xFF0C;&#x65B0;&#x589E;&#x4E86;&#x4E00;&#x79CD;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x540D;&#x53EB;symbol&#xFF0C;&#x50CF;&#x5B83;&#x7684;&#x540D;&#x5B57;&#x8868;&#x9732;&#x7684;&#x4E00;&#x6837;&#xFF0C;&#x610F;&#x5473;&#x7740;&#x72EC;&#x4E00;&#x65E0;&#x4E8C;&#xFF0C;&#x610F;&#x601D;&#x662F;&#x6BCF;&#x4E2A; Symbol&#x7C7B;&#x578B;&#x90FD;&#x662F;&#x72EC;&#x4E00;&#x65E0;&#x4E8C;&#x7684;&#xFF0C;&#x4E0D;&#x4E0E;&#x5176;&#x5B83; Symbol &#x91CD;&#x590D;&#x3002;<br>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8C03;&#x7528; Symbol() &#x65B9;&#x6CD5;&#x5C06;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684; Symbol &#x7C7B;&#x578B;&#x7684;&#x503C;&#xFF0C;&#x8FD9;&#x4E2A;&#x503C;&#x72EC;&#x4E00;&#x65E0;&#x4E8C;&#xFF0C;&#x4E0D;&#x4E0E;&#x4EFB;&#x4F55;&#x503C;&#x76F8;&#x7B49;&#x3002;</p><pre><code>var mySymbol=Symbol();
console.log(typeof mySymbol) //&quot;symbol&quot;</code></pre><h2>&#x4E8C;&#x3001;&#x5B57;&#x7B26;&#x4E32;</h2><p>ES6&#x5B57;&#x7B26;&#x4E32;&#x65B0;&#x589E;&#x7684;&#x65B9;&#x6CD5;</p><p><strong>UTF-16&#x7801;&#x4F4D;&#xFF1A;</strong>ES6&#x5F3A;&#x5236;&#x4F7F;&#x7528;UTF-16&#x5B57;&#x7B26;&#x4E32;&#x7F16;&#x7801;&#x3002;&#x5173;&#x4E8E;UTF-16&#x7684;&#x89E3;&#x91CA;&#x8BF7;&#x81EA;&#x884C;&#x767E;&#x5EA6;&#x4E86;&#x89E3;&#x3002;</p><p><strong>codePointAt()&#xFF1A;</strong>&#x8BE5;&#x65B9;&#x6CD5;&#x652F;&#x6301;UTF-16&#xFF0C;&#x63A5;&#x53D7;&#x7F16;&#x7801;&#x5355;&#x5143;&#x7684;&#x4F4D;&#x7F6E;&#x800C;&#x975E;&#x5B57;&#x7B26;&#x4E32;&#x4F4D;&#x7F6E;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x4E0E;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7ED9;&#x5B9A;&#x4F4D;&#x7F6E;&#x5BF9;&#x5E94;&#x7684;&#x7801;&#x4F4D;&#xFF0C;&#x5373;&#x4E00;&#x4E2A;&#x6574;&#x6570;&#x503C;&#x3002;</p><p><code>String.fromCodePoiont()&#xFF1A;</code>&#x4F5C;&#x7528;&#x4E0E;codePointAt&#x76F8;&#x53CD;&#xFF0C;&#x68C0;&#x7D22;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x67D0;&#x4E2A;&#x5B57;&#x7B26;&#x7684;&#x7801;&#x4F4D;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x6307;&#x5B9A;&#x7684;&#x7801;&#x4F4D;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x3002;</p><p><strong>normalize()&#xFF1A;</strong>&#x63D0;&#x4F9B;Unicode&#x7684;&#x6807;&#x51C6;&#x5F62;&#x5F0F;&#xFF0C;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x53EF;&#x9009;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x53C2;&#x6570;&#xFF0C;&#x6307;&#x660E;&#x5E94;&#x7528;&#x67D0;&#x79CD;Unicode&#x6807;&#x51C6;&#x5F62;&#x5F0F;&#x3002;</p><p>&#x5728;ES6&#x4E2D;&#xFF0C;&#x65B0;&#x589E;&#x4E86;3&#x4E2A;&#x65B0;&#x65B9;&#x6CD5;&#x3002;&#x6BCF;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x63A5;&#x6536;2&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x9700;&#x8981;&#x68C0;&#x6D4B;&#x7684;&#x5B50;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x4EE5;&#x53CA;&#x5F00;&#x59CB;&#x5339;&#x914D;&#x7684;&#x7D22;&#x5F15;&#x4F4D;&#x7F6E;&#x3002;</p><p><strong>&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;</strong><br>&#x5B57;&#x7B26;&#x4E32;&#x662F;JavaScript&#x4E2D;&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x4E4B;&#x4E00;&#xFF0C;&#x5E94;&#x8BE5;&#x7B97;&#x662F;&#x9664;&#x4E86;&#x5BF9;&#x8C61;&#x4E4B;&#x5916;&#x662F;&#x4F7F;&#x7528;&#x6700;&#x4E3A;&#x9891;&#x7E41;&#x7684;&#x7C7B;&#x578B;&#x5427;&#xFF0C;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x5305;&#x542B;&#x4E86;&#x4F8B;&#x5982;substr&#xFF0C;replace&#xFF0C;indexOf,slice&#x7B49;&#x7B49;&#x8BF8;&#x591A;&#x65B9;&#x6CD5;&#xFF0C;ES6&#x5F15;&#x5165;&#x4E86;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x7528;&#x53CD;&#x5F15;&#x53F7;&#x6765;&#x8868;&#x793A;&#xFF0C;&#x53EF;&#x4EE5;&#x8868;&#x793A;&#x591A;&#x884C;&#x5B57;&#x7B26;&#x4E32;&#x4EE5;&#x53CA;&#x505A;&#x5230;&#x6587;&#x672C;&#x63D2;&#x503C;&#xFF08;&#x5229;&#x7528;&#x6A21;&#x677F;&#x5360;&#x4F4D;&#x7B26;&#xFF09;&#x3002;</p><pre><code>// &#x4EE5;&#x524D;&#x7684;&#x591A;&#x884C;&#x5B57;&#x7B26;&#x4E32;&#x6211;&#x4EEC;&#x8FD9;&#x4E48;&#x5199;&#xFF1A;
console.log(&quot;hello world 1\n\
hello cala&quot;);
// &quot;hello world
// hello cala&quot;

//&#x6709;&#x4E86;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x4E4B;&#x540E;
console.log(`hello world
string text line 2`);
// &quot;hello world
// hello cala&quot;</code></pre><p>&#x53EF;&#x4EE5;&#x7528;${}&#x6765;&#x8868;&#x793A;&#x6A21;&#x677F;&#x5360;&#x4F4D;&#x7B26;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;&#x4F60;&#x5DF2;&#x7ECF;&#x5B9A;&#x4E49;&#x597D;&#x7684;&#x53D8;&#x91CF;&#x4F20;&#x8FDB;&#x62EC;&#x5F27;&#x4E2D;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><pre><code>var name=&quot;cala&quot;;
var age=22;
console.log(`hello,I&apos;am ${name},my age is ${age}`)
//hello,I&apos;am cala,my age is 22</code></pre><p><strong>includes(str, index)&#xFF1A;</strong>&#x5982;&#x679C;&#x5728;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x68C0;&#x6D4B;&#x5230;&#x6307;&#x5B9A;&#x6587;&#x672C;&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;false&#x3002;</p><pre><code>let t = &apos;abcdefg&apos;
if(t.includes(&apos;cde&apos;)) {
  console.log(2)
}
//true</code></pre><p><strong>startsWith(str, index)&#xFF1A;</strong>&#x5982;&#x679C;&#x5728;&#x5B57;&#x7B26;&#x4E32;&#x8D77;&#x59CB;&#x90E8;&#x5206;&#x68C0;&#x6D4B;&#x5230;&#x6307;&#x5B9A;&#x6587;&#x672C;&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false&#x3002;</p><pre><code>let t = &apos;abcdefg&apos;
if(t.startsWith(&apos;ab&apos;)) {
  console.log(2)
}
//true</code></pre><p><strong>endsWith(str, index)&#xFF1A;</strong>&#x5982;&#x679C;&#x5728;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x7ED3;&#x675F;&#x90E8;&#x5206;&#x68C0;&#x6D4B;&#x5230;&#x6307;&#x5B9A;&#x6587;&#x672C;&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false&#x3002;</p><pre><code>let t = &apos;abcdefg&apos;
if(t.endsWith(&apos;fg&apos;)) {
  console.log(2)
}
//true</code></pre><p>&#x5982;&#x679C;&#x4F60;&#x53EA;&#x662F;&#x9700;&#x8981;&#x5339;&#x914D;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x662F;&#x5426;&#x5305;&#x542B;&#x67D0;&#x5B50;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x90A3;&#x4E48;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x65B0;&#x589E;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#x679C;&#x9700;&#x8981;&#x627E;&#x5230;&#x5339;&#x914D;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4F7F;&#x7528;indexOf()&#x3002;</p><h2>&#x4E09;&#x3001;&#x51FD;&#x6570;</h2><p><em>&#x51FD;&#x6570;&#x7684;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;</em><br>&#x5728;ES5&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x7ED9;&#x51FD;&#x6570;&#x4F20;&#x53C2;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5982;&#x4E0B;&#x9762;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x3002;</p><pre><code>function a(num, callback) {
  num = num || 6
  callback = callback || function (data) {console.log(&apos;ES5: &apos;, data)}
  callback(num * num)
}
a() //ES5: 36&#xFF0C;&#x4E0D;&#x4F20;&#x53C2;&#x8F93;&#x51FA;&#x9ED8;&#x8BA4;&#x503C;

//&#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x4F7F;&#x7528;callback
a(10, function(data) {
  console.log(data * 10) // 1000&#xFF0C; &#x4F20;&#x53C2;&#x8F93;&#x51FA;&#x65B0;&#x6570;&#x503C;
})</code></pre><p>&#x5728;ES6&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x65B0;&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#x5199;&#x6CD5;</p><pre><code>function a(num = 6, callback = function (data) {console.log(&apos;ES6: &apos;, data)}) {
  callback(num * num)
}

a() //ES6: 36&#xFF0C; &#x4E0D;&#x4F20;&#x53C2;&#x8F93;&#x51FA;&#x9ED8;&#x8BA4;&#x503C;

a(10, function(data) {
  console.log(data * 10) // 1000&#xFF0C;&#x4F20;&#x53C2;&#x8F93;&#x51FA;&#x65B0;&#x6570;&#x503C;
})</code></pre><h2>&#x56DB;&#x3001;<strong>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF08;=&gt;&#xFF09;</strong></h2><p>&#xFF08;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6BD4;&#x8F83;&#x91CD;&#x8981;&#xFF0C;&#x73B0;&#x5728;&#x7B80;&#x5355;&#x63D0;&#x4E00;&#x4E0B;&#xFF0C;&#x8FDF;&#x4E00;&#x70B9;&#x6709;&#x7A7A;&#x4E13;&#x95E8;&#x5199;&#x4E00;&#x7BC7;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;&#x6587;&#x7AE0;&#x3002;&#xFF09;</p><pre><code>const arr = [5, 10]
const s = arr.reduce((sum, item) =&gt; sum + item)
console.log(s) // 15</code></pre><p>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E2D;this&#x7684;&#x4F7F;&#x7528;&#x8DDF;&#x666E;&#x901A;&#x51FD;&#x6570;&#x4E5F;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5728;JavaScript&#x7684;&#x666E;&#x901A;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x90FD;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x81EA;&#x5DF1;&#x7684;this&#x503C;&#xFF0C;&#x4E3B;&#x8981;&#x5206;&#x4E3A;&#xFF1A;<br><strong>&#x666E;&#x901A;&#x51FD;&#x6570;&#xFF1A;</strong><br>1&#x3001;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x5168;&#x5C40;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF0C;this&#x6307;&#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;<br>2&#x3001;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF0C;this&#x6307;&#x5411;&#x8BE5;&#x5BF9;&#x8C61;<br>3&#x3001;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#xFF0C;this&#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;new&#x51FA;&#x6765;&#x7684;&#x65B0;&#x5BF9;&#x8C61;<br>4&#x3001;&#x8FD8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;call&#xFF0C;apply&#xFF0C;bind&#x6539;&#x53D8;this&#x7684;&#x6307;&#x5411;<br><strong>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF1A;</strong><br>1&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6CA1;&#x6709;this&#xFF0C;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;this&#x6765;&#x81EA;&#x4E8E;&#x7236;&#x7EA7;&#x6700;&#x8FD1;&#x7684;&#x975E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x4E0D;&#x80FD;&#x6539;&#x53D8;this&#x7684;&#x6307;&#x5411;&#x3002;<br>2&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6CA1;&#x6709;super<br>3&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6CA1;&#x6709;arguments<br>4&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6CA1;&#x6709;new.target&#x7ED1;&#x5B9A;&#x3002;<br>5&#x3001;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;new<br>6&#x3001;&#x6CA1;&#x6709;&#x539F;&#x578B;<br>7&#x3001;&#x4E0D;&#x652F;&#x6301;&#x91CD;&#x590D;&#x7684;&#x547D;&#x540D;&#x53C2;&#x6570;&#x3002;</p><p><strong>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;&#x7B80;&#x5355;&#x7406;&#x89E3;</strong></p><p>1&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;&#x5DE6;&#x8FB9;&#x8868;&#x793A;&#x8F93;&#x5165;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x53F3;&#x8FB9;&#x8868;&#x793A;&#x8F93;&#x51FA;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><pre><code>const s = a =&gt; a
console.log(s(2)) // 2</code></pre><p>2&#x3001;&#x5728;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;this&#x5C5E;&#x4E8E;&#x8BCD;&#x6CD5;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x76F4;&#x63A5;&#x7531;&#x4E0A;&#x4E0B;&#x6587;&#x786E;&#x5B9A;&#xFF0C;&#x5BF9;&#x4E8E;&#x666E;&#x901A;&#x51FD;&#x6570;&#x4E2D;&#x6307;&#x5411;&#x4E0D;&#x5B9A;&#x7684;this&#xFF0C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E2D;&#x5904;&#x7406;this&#x65E0;&#x7591;&#x66F4;&#x52A0;&#x7B80;&#x5355;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>//ES5&#x666E;&#x901A;&#x51FD;&#x6570;
function Man(){
  this.age=22;
  return function(){
    this.age+1;
  }
}
var cala=new Man();
console.log(cala())//undefined

//ES6&#x7BAD;&#x5934;&#x51FD;&#x6570;
function Man(){
  this.age=22;
  return () =&gt; this.age+1;
}
var cala=new Man();
console.log(cala())//23</code></pre><p>3&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4E2D;&#x6CA1;&#x6709;arguments(&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7528;rest&#x53C2;&#x6570;&#x66FF;&#x4EE3;),&#x4E5F;&#x6CA1;&#x6709;&#x539F;&#x578B;&#xFF0C;&#x4E5F;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;new &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><pre><code>//&#x6CA1;&#x6709;arguments
var foo=(a,b)=&gt;{return arguments[0]*arguments[1]}
console.log(foo(3,5))
//arguments is not defined

//&#x6CA1;&#x6709;&#x539F;&#x578B;
var Obj = () =&gt; {};
console.log(Obj.prototype); 
// undefined

//&#x4E0D;&#x80FD;&#x4F7F;&#x7528;new &#x5173;&#x952E;&#x5B57;
var Obj = () =&gt; {&quot;hello world&quot;};
var o = new Obj(); 
// TypeError: Obj is not a constructor</code></pre><p>4&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7ED9;&#x6570;&#x7EC4;&#x6392;&#x5E8F;</p><pre><code>const arr = [10, 50, 30, 40, 20]
const s = arr.sort((a, b) =&gt; a - b)
console.log(s) // [10,20,30,40,50]</code></pre><p><strong>&#x5C3E;&#x8C03;&#x7528;&#x4F18;&#x5316;</strong><br>&#x5C3E;&#x8C03;&#x7528;&#x662F;&#x6307;&#x5728;&#x51FD;&#x6570;return&#x7684;&#x65F6;&#x5019;&#x8C03;&#x7528;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x7531;&#x4E8E;&#x5C3E;&#x8C03;&#x7528;&#x7684;&#x5B9E;&#x73B0;&#x9700;&#x8981;&#x5B58;&#x50A8;&#x5230;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x5728;&#x4E00;&#x4E2A;&#x5FAA;&#x73AF;&#x4F53;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x5B58;&#x5728;&#x51FD;&#x6570;&#x7684;&#x5C3E;&#x8C03;&#x7528;&#xFF0C;&#x4F60;&#x7684;&#x5185;&#x5B58;&#x53EF;&#x80FD;&#x7206;&#x6EE1;&#x6216;&#x6EA2;&#x51FA;&#x3002;</p><p>ES6&#x4E2D;&#xFF0C;&#x5F15;&#x64CE;&#x4F1A;&#x5E2E;&#x4F60;&#x505A;&#x597D;&#x5C3E;&#x8C03;&#x7528;&#x7684;&#x4F18;&#x5316;&#x5DE5;&#x4F5C;&#xFF0C;&#x4F60;&#x4E0D;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x4F18;&#x5316;&#xFF0C;&#x4F46;&#x9700;&#x8981;&#x6EE1;&#x8DB3;&#x4E0B;&#x9762;3&#x4E2A;&#x8981;&#x6C42;&#xFF1A;<br>1&#x3001;&#x51FD;&#x6570;&#x4E0D;&#x662F;&#x95ED;&#x5305;<br>2&#x3001;&#x5C3E;&#x8C03;&#x7528;&#x662F;&#x51FD;&#x6570;&#x6700;&#x540E;&#x4E00;&#x6761;&#x8BED;&#x53E5;<br>3&#x3001;&#x5C3E;&#x8C03;&#x7528;&#x7ED3;&#x679C;&#x4F5C;&#x4E3A;&#x51FD;&#x6570;&#x8FD4;&#x56DE;</p><p><strong>&#x5C3E;&#x8C03;&#x7528;&#x5B9E;&#x9645;&#x7528;&#x9014;&#x2014;&#x2014;&#x9012;&#x5F52;&#x51FD;&#x6570;&#x4F18;&#x5316;</strong><br>&#x5728;ES5&#x65F6;&#x4EE3;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x9012;&#x5F52;&#xFF0C;&#x56E0;&#x4E3A;&#x9012;&#x5F52;&#x4F1A;&#x5F71;&#x54CD;&#x6027;&#x80FD;&#x3002;<br>&#x4F46;&#x662F;&#x6709;&#x4E86;&#x5C3E;&#x8C03;&#x7528;&#x4F18;&#x5316;&#x4E4B;&#x540E;&#xFF0C;&#x9012;&#x5F52;&#x51FD;&#x6570;&#x7684;&#x6027;&#x80FD;&#x6709;&#x4E86;&#x63D0;&#x5347;&#x3002;</p><pre><code>//&#x65B0;&#x578B;&#x5C3E;&#x4F18;&#x5316;&#x5199;&#x6CD5;
&quot;use strict&quot;;  
function a(n, p = 1) {
  if(n &lt;= 1) {
    return 1 * p
  }
  let s = n * p
  return a(n - 1, s)
}
//&#x6C42; 1 x 2 x 3&#x7684;&#x9636;&#x4E58;
let sum = a(3)
console.log(sum) // 6</code></pre><h2>&#x4E94;&#x3001;ES6&#x5BF9;&#x8C61;&#x65B0;&#x589E;&#x65B9;&#x6CD5;</h2><p><strong>Object.assign()</strong><br>Object.assign()&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x5C06;&#x6240;&#x6709;&#x53EF;&#x679A;&#x4E3E;&#x5C5E;&#x6027;&#x7684;&#x503C;&#x4ECE;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x6E90;&#x5BF9;&#x8C61;&#x590D;&#x5236;&#x5230;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x3002;&#x5B83;&#x5C06;&#x8FD4;&#x56DE;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x3002;<br>Object.assign &#x65B9;&#x6CD5;&#x53EA;&#x4F1A;&#x62F7;&#x8D1D;&#x6E90;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x7684;&#x5E76;&#x4E14;&#x53EF;&#x679A;&#x4E3E;&#x7684;&#x5C5E;&#x6027;&#x5230;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x3002;&#x8BE5;&#x65B9;&#x6CD5;&#x4F7F;&#x7528;&#x6E90;&#x5BF9;&#x8C61;&#x7684;[[Get]]&#x548C;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x7684;[[Set]]&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x4F1A;&#x8C03;&#x7528;&#x76F8;&#x5173; getter &#x548C; setter&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x5B83;&#x5206;&#x914D;&#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x4E0D;&#x4EC5;&#x4EC5;&#x662F;&#x590D;&#x5236;&#x6216;&#x5B9A;&#x4E49;&#x65B0;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x5982;&#x679C;&#x5408;&#x5E76;&#x6E90;&#x5305;&#x542B;getter&#xFF0C;&#x8FD9;&#x53EF;&#x80FD;&#x4F7F;&#x5176;&#x4E0D;&#x9002;&#x5408;&#x5C06;&#x65B0;&#x5C5E;&#x6027;&#x5408;&#x5E76;&#x5230;&#x539F;&#x578B;&#x4E2D;&#x3002;&#x4E3A;&#x4E86;&#x5C06;&#x5C5E;&#x6027;&#x5B9A;&#x4E49;&#xFF08;&#x5305;&#x62EC;&#x5176;&#x53EF;&#x679A;&#x4E3E;&#x6027;&#xFF09;&#x590D;&#x5236;&#x5230;&#x539F;&#x578B;&#xFF0C;&#x5E94;&#x4F7F;&#x7528;Object.getOwnPropertyDescriptor()&#x548C;Object.defineProperty() &#x3002;<br>String&#x7C7B;&#x578B;&#x548C; Symbol &#x7C7B;&#x578B;&#x7684;&#x5C5E;&#x6027;&#x90FD;&#x4F1A;&#x88AB;&#x62F7;&#x8D1D;&#x3002;<br>&#x5408;&#x5E76;&#x5BF9;&#x8C61;</p><pre><code>var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };
var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, &#x6CE8;&#x610F;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x4E5F;&#x4F1A;&#x6539;&#x53D8;&#x3002;</code></pre><p>&#x5408;&#x5E76;&#x5177;&#x6709;&#x76F8;&#x540C;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;</p><pre><code>var o1 = { a: 1, b: 1, c: 1 };
var o2 = { b: 2, c: 2 };
var o3 = { c: 3 };
var obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }</code></pre><h2>&#x516D;&#x3001;Map&#x548C;Set</h2><p>Map&#x548C;Set&#x90FD;&#x53EB;&#x505A;&#x96C6;&#x5408;&#xFF0C;&#x4F46;&#x662F;&#x4ED6;&#x4EEC;&#x4E5F;&#x6709;&#x6240;&#x4E0D;&#x540C;&#x3002;Set&#x5E38;&#x88AB;&#x7528;&#x6765;&#x68C0;&#x67E5;&#x5BF9;&#x8C61;&#x4E2D;&#x662F;&#x5426;&#x5B58;&#x5728;&#x67D0;&#x4E2A;&#x952E;&#x540D;&#xFF0C;Map&#x96C6;&#x5408;&#x5E38;&#x88AB;&#x7528;&#x6765;&#x83B7;&#x53D6;&#x5DF2;&#x5B58;&#x7684;&#x4FE1;&#x606F;&#x3002;<br>Set&#x662F;&#x6709;&#x5E8F;&#x5217;&#x8868;&#xFF0C;&#x542B;&#x6709;&#x76F8;&#x4E92;&#x72EC;&#x7ACB;&#x7684;&#x975E;&#x91CD;&#x590D;&#x503C;&#x3002;<br><strong>Array&#x548C;Set&#x5BF9;&#x6BD4;</strong><br><em>&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x5B58;&#x50A8;&#x591A;&#x503C;&#x7684;&#x5BB9;&#x5668;&#xFF0C;&#x4E24;&#x8005;&#x53EF;&#x4EE5;&#x4E92;&#x76F8;&#x8F6C;&#x6362;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x4E0A;&#x6709;&#x533A;&#x522B;&#x3002;&#x5982;&#x4E0B;:</em><br>Array&#x7684;indexOf&#x65B9;&#x6CD5;&#x6BD4;Set&#x7684;has&#x65B9;&#x6CD5;&#x6548;&#x7387;&#x4F4E;&#x4E0B;<br>Set&#x4E0D;&#x542B;&#x6709;&#x91CD;&#x590D;&#x503C;&#xFF08;&#x53EF;&#x4EE5;&#x5229;&#x7528;&#x8FD9;&#x4E2A;&#x7279;&#x6027;&#x5B9E;&#x73B0;&#x5BF9;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x7684;&#x53BB;&#x91CD;&#xFF09;<br>Set&#x901A;&#x8FC7;delete&#x65B9;&#x6CD5;&#x5220;&#x9664;&#x67D0;&#x4E2A;&#x503C;&#xFF0C;&#x800C;Array&#x53EA;&#x80FD;&#x901A;&#x8FC7;splice&#x3002;&#x4E24;&#x8005;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x4FBF;&#x7A0B;&#x5EA6;&#x524D;&#x8005;&#x66F4;&#x4F18;<br>Array&#x7684;&#x5F88;&#x591A;&#x65B0;&#x65B9;&#x6CD5;map&#x3001;filter&#x3001;some&#x3001;every&#x7B49;&#x662F;Set&#x6CA1;&#x6709;&#x7684;&#xFF08;&#x4F46;&#x662F;&#x901A;&#x8FC7;&#x4E24;&#x8005;&#x53EF;&#x4EE5;&#x4E92;&#x76F8;&#x8F6C;&#x6362;&#x6765;&#x4F7F;&#x7528;&#xFF09;<br><strong>Object&#x548C;Map&#x5BF9;&#x6BD4;</strong><br><em>Object&#x662F;&#x5B57;&#x7B26;&#x4E32;-&#x503C;&#xFF0C;Map&#x662F;&#x503C;-&#x503C;</em><br>Object&#x952E;&#x4E3A;string&#x7C7B;&#x578B;,Map&#x7684;&#x952E;&#x662F;&#x4EFB;&#x610F;&#x7C7B;&#x578B;<br>&#x624B;&#x52A8;&#x8BA1;&#x7B97;Object&#x5C3A;&#x5BF8;,Map.size&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x5C3A;&#x5BF8;<br>Map&#x7684;&#x6392;&#x5E8F;&#x662F;&#x63D2;&#x5165;&#x987A;&#x5E8F;<br>Object&#x6709;&#x539F;&#x578B;&#xFF0C;&#x6240;&#x4EE5;&#x6620;&#x5C04;&#x4E2D;&#x6709;&#x4E00;&#x4E9B;&#x7F3A;&#x7701;&#x7684;&#x952E;&#x3002;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;Map=Object.create(null)</p><p><strong>Set&#x64CD;&#x4F5C;&#x96C6;&#x5408;</strong></p><pre><code>let set = new Set()
// Set&#x8F6C;&#x5316;&#x4E3A;&#x6570;&#x7EC4;
let arr = Array.from(set)
let arr = [...set]
// &#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#xFF08;&#x7EE7;&#x627F;&#x81EA;Set&#xFF09;
set.constructor === Set 
set.size 
// &#x64CD;&#x4F5C;&#x65B9;&#x6CD5;
set.add(1) // &#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x503C;
set.delete(1) //&#x5220;&#x9664;&#x4E00;&#x4E2A;&#x503C;
set.has(1) //&#x5224;&#x65AD;&#x662F;&#x5426;&#x6709;&#x8FD9;&#x4E2A;&#x503C;&#xFF08;Array&#x4E2D;&#x7684;indexOf&#xFF09;
set.clear() //&#x6E05;&#x9664;&#x6240;&#x6709;&#x503C;
// &#x83B7;&#x53D6;&#x7528;&#x4E8E;&#x904D;&#x5386;&#x7684;&#x6210;&#x5458;&#x65B9;&#x6CD5;(Set&#x7684;&#x904D;&#x5386;&#x987A;&#x5E8F;&#x5C31;&#x662F;&#x63D2;&#x5165;&#x987A;&#x5E8F;)
set.keys() // &#x8FD4;&#x56DE;&#x952E;&#x540D;&#x7684;&#x904D;&#x5386;&#x5668;
set.values() // &#x8FD4;&#x56DE;&#x952E;&#x503C;&#x5F97;&#x904D;&#x5386;&#x5668;
set.entries() // &#x8FD4;&#x56DE;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x904D;&#x5386;&#x5668;
set.forEach() // &#x5FAA;&#x73AF;&#x904D;&#x5386;&#x6BCF;&#x4E2A;&#x503C;(&#x548C;Array&#x7684;&#x65B9;&#x6CD5;&#x4E00;&#x81F4;)
for (let key of set.keys()){}
for (let val of set.values()){}
for (let entry of set.entries()){}
// &#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x65B9;&#x6CD5;&#x6765;&#x5904;&#x7406;set&#x503C;
set = new Set(arr)
set = new Set([...set].map((x) =&gt; x = x * 2))
set = new Set([...set].filter((x) =&gt; x &gt; 2))</code></pre><p><strong>Map&#x7684;&#x65B9;&#x6CD5;&#x96C6;&#x5408;</strong></p><pre><code>let map = new Map()
// &#x5B9E;&#x4F8B;&#x5C5E;&#x6027;(&#x7EE7;&#x627F;&#x81EA;Map)
map.constructor === Map
map.size
// &#x64CD;&#x4F5C;&#x65B9;&#x6CD5;
map.set(1,2)
map.get(1)
map.delete(1)
map.has(1)
map.clear()
// &#x904D;&#x5386;&#x65B9;&#x6CD5;
map.keys()
map.values()
map.entries()
map.forEach()
// Map&#x548C;&#x6570;&#x7EC4;&#x7684;&#x8F6C;&#x6362;
map = new Map([[&apos;key&apos;,&apos;val&apos;],[2,1]]) // &#x8981;&#x6C42;&#x53CC;&#x6210;&#x5458;&#x6570;&#x7EC4;
let arr = [...map]
// &#x503C;&#x5F97;&#x6CE8;&#x610F;&#x7684;&#x662F;Map&#x7684;&#x952E;&#x662F;&#x8DDF;&#x5185;&#x5B58;&#x7ED1;&#x5B9A;&#x7684;
map.set([1], &apos;s&apos;)
map.get([1])
let arr = [1]
let arr1 = [1]
map.set(arr, &apos;s&apos;)
map.get(arr)
map.set(arr1, &apos;s&apos;)
map.get(arr1)</code></pre><p>&#x60F3;&#x8981;&#x6DF1;&#x5165;&#x7406;&#x89E3;Set&#x548C;Map&#xFF0C;&#x53EF;&#x4EE5;&#x67E5;&#x770B;<a>&#x300A;&#x6DF1;&#x5165;&#x7406;&#x89E3;&#xFF1A;ES6&#x4E2D;&#x7684;Set&#x548C;Map&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;Map&#x4E0E;&#x5176;&#x5B83;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x7684;&#x4E92;&#x76F8;&#x8F6C;&#x6362;&#x300B;</a></p><h2>&#x4E03;&#x3001;&#x8FED;&#x4EE3;&#x5668;&#xFF08;Iterator&#xFF09;</h2><p><strong>1&#x3001;entries() &#x8FD4;&#x56DE;&#x8FED;&#x4EE3;&#x5668;&#xFF1A;&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x5BF9;</strong></p><pre><code>//&#x6570;&#x7EC4;
const arr = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;];
for(let v of arr.entries()) {
  console.log(v)
}
// [0, &apos;a&apos;] [1, &apos;b&apos;] [2, &apos;c&apos;]

//Set
const arr = new Set([&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]);
for(let v of arr.entries()) {
  console.log(v)
}
// [&apos;a&apos;, &apos;a&apos;] [&apos;b&apos;, &apos;b&apos;] [&apos;c&apos;, &apos;c&apos;]

//Map
const arr = new Map();
arr.set(&apos;a&apos;, &apos;a&apos;);
arr.set(&apos;b&apos;, &apos;b&apos;);
for(let v of arr.entries()) {
  console.log(v)
}
// [&apos;a&apos;, &apos;a&apos;] [&apos;b&apos;, &apos;b&apos;]</code></pre><p><strong>2&#x3001;values() &#x8FD4;&#x56DE;&#x8FED;&#x4EE3;&#x5668;&#xFF1A;&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x5BF9;&#x7684;value</strong></p><pre><code>//&#x6570;&#x7EC4;
const arr = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;];
for(let v of arr.values()) {
  console.log(v)
}
//&apos;a&apos; &apos;b&apos; &apos;c&apos;

//Set
const arr = new Set([&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]);
for(let v of arr.values()) {
  console.log(v)
}
// &apos;a&apos; &apos;b&apos; &apos;c&apos;

//Map
const arr = new Map();
arr.set(&apos;a&apos;, &apos;a&apos;);
arr.set(&apos;b&apos;, &apos;b&apos;);
for(let v of arr.values()) {
  console.log(v)
}
// &apos;a&apos; &apos;b&apos;</code></pre><p><strong>3&#x3001;keys() &#x8FD4;&#x56DE;&#x8FED;&#x4EE3;&#x5668;&#xFF1A;&#x8FD4;&#x56DE;&#x952E;&#x503C;&#x5BF9;&#x7684;key</strong></p><pre><code>//&#x6570;&#x7EC4;
const arr = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;];
for(let v of arr.keys()) {
  console.log(v)
}
// 0 1 2

//Set
const arr = new Set([&apos;a&apos;, &apos;b&apos;, &apos;c&apos;]);
for(let v of arr.keys()) {
  console.log(v)
}
// &apos;a&apos; &apos;b&apos; &apos;c&apos;

//Map
const arr = new Map();
arr.set(&apos;a&apos;, &apos;a&apos;);
arr.set(&apos;b&apos;, &apos;b&apos;);
for(let v of arr.keys()) {
  console.log(v)
}
// &apos;a&apos; &apos;b&apos;</code></pre><p>&#x867D;&#x7136;&#x4E0A;&#x9762;&#x5217;&#x4E3E;&#x4E86;3&#x79CD;&#x5185;&#x5EFA;&#x7684;&#x8FED;&#x4EE3;&#x5668;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x540C;&#x96C6;&#x5408;&#x7684;&#x7C7B;&#x578B;&#x8FD8;&#x6709;&#x81EA;&#x5DF1;&#x9ED8;&#x8BA4;&#x7684;&#x8FED;&#x4EE3;&#x5668;&#xFF0C;&#x5728;for of&#x4E2D;&#xFF0C;&#x6570;&#x7EC4;&#x548C;Set&#x7684;&#x9ED8;&#x8BA4;&#x8FED;&#x4EE3;&#x5668;&#x662F;values()&#xFF0C;Map&#x7684;&#x9ED8;&#x8BA4;&#x8FED;&#x4EE3;&#x5668;&#x662F;entries()&#x3002;</p><p><strong>for of&#x5FAA;&#x73AF;&#x89E3;&#x6784;</strong></p><p>&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x4E0D;&#x652F;&#x6301;&#x8FED;&#x4EE3;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x751F;&#x6210;&#x5668;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;key&#xFF0C;value&#x7684;&#x8FED;&#x4EE3;&#x5668;&#xFF0C;&#x7136;&#x540E;&#x4F7F;&#x7528;for of&#x5FAA;&#x73AF;&#x89E3;&#x6784;key&#x548C;value&#x3002;</p><pre><code>const obj = {
  a: 1,
  b: 2,
  *[Symbol.iterator]() {
    for(let i in obj) {
      yield [i, obj[i]]
    }
  }
}
for(let [key, value] of obj) {
  console.log(key, value)
}
// &apos;a&apos; 1, &apos;b&apos; 2</code></pre><p>&#x5B57;&#x7B26;&#x4E32;&#x8FED;&#x4EE3;&#x5668;</p><pre><code>const str = &apos;abc&apos;;
for(let v of str) {
  console.log(v)
}
// &apos;a&apos; &apos;b&apos; &apos;c&apos;</code></pre><h2>ES6&#x7ED9;&#x6570;&#x7EC4;&#x6DFB;&#x52A0;&#x4E86;&#x51E0;&#x4E2A;&#x65B0;&#x65B9;&#x6CD5;&#xFF1A;find()&#x3001;findIndex()&#x3001;fill()&#x3001;copyWithin()</h2><p>1&#x3001;find()&#xFF1A;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x627E;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7B26;&#x5408;&#x5F53;&#x524D;&#x641C;&#x7D22;&#x89C4;&#x5219;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;&#x5B83;&#xFF0C;&#x5E76;&#x4E14;&#x7EC8;&#x6B62;&#x641C;&#x7D22;&#x3002;</p><pre><code>const arr = [1, &quot;2&quot;, 3, 3, &quot;2&quot;]
console.log(arr.find(n =&gt; typeof n === &quot;number&quot;)) // 1</code></pre><p>2&#x3001;findIndex()&#xFF1A;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x627E;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x7B26;&#x5408;&#x5F53;&#x524D;&#x641C;&#x7D22;&#x89C4;&#x5219;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;&#x5B83;&#x7684;&#x4E0B;&#x6807;&#xFF0C;&#x7EC8;&#x6B62;&#x641C;&#x7D22;&#x3002;</p><pre><code>const arr = [1, &quot;2&quot;, 3, 3, &quot;2&quot;]
console.log(arr.findIndex(n =&gt; typeof n === &quot;number&quot;)) // 0</code></pre><p>3&#x3001;fill()&#xFF1A;&#x7528;&#x65B0;&#x5143;&#x7D20;&#x66FF;&#x6362;&#x6389;&#x6570;&#x7EC4;&#x5185;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x66FF;&#x6362;&#x4E0B;&#x6807;&#x8303;&#x56F4;&#x3002;</p><pre><code>arr.fill(value, start, end)</code></pre><p>4&#x3001;copyWithin()&#xFF1A;&#x9009;&#x62E9;&#x6570;&#x7EC4;&#x7684;&#x67D0;&#x4E2A;&#x4E0B;&#x6807;&#xFF0C;&#x4ECE;&#x8BE5;&#x4F4D;&#x7F6E;&#x5F00;&#x59CB;&#x590D;&#x5236;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#xFF0C;&#x9ED8;&#x8BA4;&#x4ECE;0&#x5F00;&#x59CB;&#x590D;&#x5236;&#x3002;&#x4E5F;&#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x8981;&#x590D;&#x5236;&#x7684;&#x5143;&#x7D20;&#x8303;&#x56F4;&#x3002;</p><pre><code>arr.copyWithin(target, start, end)

const arr = [1, 2, 3, 4, 5]
console.log(arr.copyWithin(3)) // [1,2,3,1,2] &#x4ECE;&#x4E0B;&#x6807;&#x4E3A;3&#x7684;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#xFF0C;&#x590D;&#x5236;&#x6570;&#x7EC4;&#xFF0C;&#x6240;&#x4EE5;4, 5&#x88AB;&#x66FF;&#x6362;&#x6210;1, 2

const arr1 = [1, 2, 3, 4, 5]
console.log(arr1.copyWithin(3, 1)) // [1,2,3,2,3] &#x4ECE;&#x4E0B;&#x6807;&#x4E3A;3&#x7684;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#xFF0C;&#x590D;&#x5236;&#x6570;&#x7EC4;&#xFF0C;&#x6307;&#x5B9A;&#x590D;&#x5236;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E0B;&#x6807;&#x4E3A;1&#xFF0C;&#x6240;&#x4EE5;4, 5&#x88AB;&#x66FF;&#x6362;&#x6210;2, 3

const arr2 = [1, 2, 3, 4, 5]
console.log(arr2.copyWithin(3, 1, 2)) // [1,2,3,2,5] &#x4ECE;&#x4E0B;&#x6807;&#x4E3A;3&#x7684;&#x5143;&#x7D20;&#x5F00;&#x59CB;&#xFF0C;&#x590D;&#x5236;&#x6570;&#x7EC4;&#xFF0C;&#x6307;&#x5B9A;&#x590D;&#x5236;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E0B;&#x6807;&#x4E3A;1&#xFF0C;&#x7ED3;&#x675F;&#x4F4D;&#x7F6E;&#x4E3A;2&#xFF0C;&#x6240;&#x4EE5;4&#x88AB;&#x66FF;&#x6362;&#x6210;2</code></pre><hr><p>ES6&#x4E2D;&#x7C7B;class&#x3001;Promise&#x4E0E;&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x3001;&#x4EE3;&#x7406;&#xFF08;Proxy&#xFF09;&#x548C;&#x53CD;&#x5C04;&#xFF08;Reflection&#xFF09;API&#xFF0C;&#x8FD9;&#x51E0;&#x5757;&#x5185;&#x5BB9;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#xFF0C;&#x4EE5;&#x540E;&#x6709;&#x673A;&#x4F1A;&#x518D;&#x8BE6;&#x7EC6;&#x5199;&#x3002;</p><p>PS: &#x5199;&#x7684;&#x592A;&#x5306;&#x5FD9;&#x4E86;&#xFF0C;&#x96BE;&#x514D;&#x6709;&#x9519;&#x6F0F;&#x7684;&#x5730;&#x65B9;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
学习ES6笔记──工作中常用到的ES6语法

## 原文链接
[https://segmentfault.com/a/1190000016068235](https://segmentfault.com/a/1190000016068235)

