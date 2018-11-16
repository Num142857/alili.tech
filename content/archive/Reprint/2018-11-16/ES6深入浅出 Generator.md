---
title: 'ES6深入浅出 Generator' 
date: 2018-11-16 2:30:06
hidden: true
slug: 32ufjbf3p3i
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x4E00;&#x6B65;&#xFF0C;&#x4E00;&#x6B65;&#x524D;&#x9032;&#x306E;&#x4E00;&#x6B65;</blockquote><p>ES6&#x6DF1;&#x5165;&#x6D45;&#x51FA;&#x4E4B;Generator&#x751F;&#x6210;&#x5668;&#x3002;&#x672C;&#x4EBA;&#x5BF9;&#x751F;&#x6210;&#x5668;&#x7684;&#x5370;&#x8C61;&#x662F;&#x8BED;&#x6CD5;&#x96BE;&#x4EE5;&#x7406;&#x89E3;&#xFF0C;&#x53C8;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x5B9E;&#x9645;&#x7684;&#x5E94;&#x7528;&#x573A;&#x666F;&#x3002;&#x4E3A;&#x5565;&#x8981;&#x5B66;&#x4E60;&#x4E00;&#x4E0B;&#x5462;&#xFF1F;&#x53EF;&#x80FD;&#x672A;&#x6765;&#x67D0;&#x4E9B;&#x9AD8;&#x7EA7;&#x7684;&#x4E1A;&#x52A1;&#x4F1A;&#x7528;&#x5230;&#xFF0C;&#x8FD8;&#x6709;&#x4E07;&#x4E00;&#x9762;&#x8BD5;&#x5B98;&#x95EE;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x5F97;&#x80FD;&#x4F83;&#x51E0;&#x53E5;&#xFF0C;&#x663E;&#x5F97;&#x6211;&#x725B;&#x1F60F;&#x3002;</p><h2>&#x5B9A;&#x4E49;</h2><p>Generator &#x662F;&#x4E3A;&#x5F02;&#x6B65;&#x800C;&#x751F;&#xFF0C;&#x6B63;&#x5E38;&#x7684;&#x51FD;&#x6570;&#x662F;&#x4E00;&#x8FDB;&#x5165;&#x5C31;&#x5FC5;&#x987B;&#x6267;&#x884C;&#x5B8C;&#x6210;&#x7684;&#xFF0C;&#x800C; Generator &#x53EF;&#x4EE5;&#x591A;&#x6B21;&#x6682;&#x505C;&#xFF0C;&#x8BA9;&#x51FA;&#x63A7;&#x5236;&#x6743;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbfs9z?w=1556&amp;h=1145" src="https://static.alili.tech/img/bVbfs9z?w=1556&amp;h=1145" alt="generator.png" title="generator.png"></span></p><h2>&#x8BED;&#x6CD5;</h2><p>&#x5B66;&#x4E60; Generator &#x8BED;&#x6CD5;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x4E86;&#x89E3;<code>function*</code>&#x3001;<code>yield</code>&#x3001;<code>next</code>&#x4E09;&#x4E2A;&#x57FA;&#x672C;&#x6982;&#x5FF5;&#x3002;</p><p><code>function*</code>&#x7528;&#x6765;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x662F;&#x751F;&#x6210;&#x5668;&#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x6BD4;&#x666E;&#x901A;&#x7684;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x591A;&#x4E86;&#x4E00;&#x4E2A;<code>*</code>,<code>*</code>&#x7684;&#x4F4D;&#x7F6E;&#x6BD4;&#x8F83;&#x968F;&#x610F;&#x53EF;&#x4EE5;&#x6328;&#x7740; function &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x6328;&#x7740;&#x51FD;&#x6570;&#x540D;&#xFF0C;&#x770B;&#x4E2A;&#x4EBA;&#x559C;&#x597D;&#x3002;</p><p><code>yield</code> &#x4EA7;&#x51FA;&#x7684;&#x610F;&#x601D;&#xFF0C;&#x8FD9;&#x4E2A;&#x5173;&#x952E;&#x5B57;&#x53EA;&#x80FD;&#x51FA;&#x73B0;&#x5728;&#x751F;&#x6210;&#x5668;&#x51FD;&#x6570;&#x4F53;&#x5185;&#xFF0C;&#x4F46;&#x662F;&#x751F;&#x6210;&#x5668;&#x4E2D;&#x4E5F;&#x53EF;&#x4EE5;&#x6CA1;&#x6709; yield &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x51FD;&#x6570;&#x9047;&#x5230; yield &#x7684;&#x65F6;&#x5019;&#x4F1A;&#x6682;&#x505C;&#xFF0C;&#x5E76;&#x628A; yield &#x540E;&#x9762;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x7ED3;&#x679C;&#x629B;&#x51FA;&#x53BB;&#x3002;</p><p><code>next</code>&#x4F5C;&#x7528;&#x662F;&#x5C06;&#x4EE3;&#x7801;&#x7684;&#x63A7;&#x5236;&#x6743;&#x4EA4;&#x8FD8;&#x7ED9;&#x751F;&#x6210;&#x5668;&#x51FD;&#x6570;&#x3002;</p><pre><code class="js">// &#x58F0;&#x660E;&#x751F;&#x6210;&#x5668;&#x51FD;&#x6570;
function* generator() {
    // A
    yield &apos;foo&apos;
    // B
}
// &#x83B7;&#x53D6;&#x751F;&#x6210;&#x5668;&#x5BF9;&#x8C61;
let g = generator();
// &#x7B2C;&#x4E00;&#x4E2A; next()&#xFF0C;&#x9996;&#x6B21;&#x542F;&#x52A8;&#x751F;&#x6210;&#x5668;
g.next(); // {value: &quot;foo&quot;, done: false}
// &#x5524;&#x9192;&#x88AB; yield &#x6682;&#x505C;&#x7684;&#x72B6;&#x6001;
g.next();
// {value: undefined, done: true}</code></pre><p>&#x8BFB;&#x5B8C;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x6709;&#x6CA1;&#x6709;&#x611F;&#x89C9;&#x751F;&#x6210;&#x5668;&#x597D;&#x50CF;&#x4E2A;&#x53C8;&#x61D2;&#x53C8;&#x80D6;&#x7684;&#x4EBA;&#xFF0C;&#x6BCF;&#x6B21;&#x5FC5;&#x987B;&#x63A8;&#x4ED6;&#x4E00;&#x4E0B;&#x624D;&#x4F1A;&#x8D70;&#x4E00;&#x70B9;&#x70B9;&#xFF0C;&#x76F4;&#x5230;&#x5C3D;&#x5934;&#x3002;&#x6211;&#x5BF9;&#x751F;&#x6210;&#x5668;&#x7684;&#x8BEF;&#x89E3;&#xFF0C;&#x751F;&#x6210;&#x5668;&#x53EF;&#x80FD;&#x5B9E;&#x9645;&#x4E0A;&#x8D85;&#x7EA7;&#x5C4C;&#x7684;&#x3002;</p><p>&#x5F53;&#x7136;&#xFF0C;&#x751F;&#x6210;&#x5668;&#x548C;&#x8FED;&#x4EE3;&#x5668;&#x6709;&#x70B9;&#x66A7;&#x6627;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x597D;&#x50CF;&#x751F;&#x6210;&#x5668;&#x5C31;&#x662F;&#x8FED;&#x4EE3;&#x5668;&#xFF0C;&#x8FD8;&#x6CA1;&#x6709;&#x4ED4;&#x7EC6;&#x5B66;&#x4E60;&#x8FC7; Iterator&#xFF0C;&#x5728;&#x6B64;&#x4E0D;&#x5C55;&#x5F00;&#xFF0C;&#x81EA;&#x884C;&#x4E86;&#x89E3;&#x3002;</p><h2>yield &amp; next &#x751F;&#x6210;&#x5668;&#x5185;&#x5916;&#x52FE;&#x7ED3;</h2><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#xFF0C;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x4E86; next()&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x7684; value&#x90E8;&#x5206;&#x5C31;&#x662F; yield &#x540E;&#x9762;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x3002;&#x5B9E;&#x9645;&#x4E0A; next()&#x4E5F;&#x53EF;&#x4EE5;&#x5411;&#x751F;&#x6210;&#x5668;&#x5185;&#x90E8;&#x4F20;&#x9012;&#x67D0;&#x4E9B;&#x6570;&#x636E;&#x3002;</p><pre><code class="js">function* generator(txt) {
    console.log(txt); // 2
    let result01 = yield &apos;&#x6211;&#x662F;&#x4E00;&#x6B65;&apos;;
    console.log(result01); // 4
    // return;
}

let g = generator(&apos;&#x4F60;&#x662F;&#x8C01;?&apos;);
console.log(&apos;&#x5BF9;&#x8BDD;&#x5F00;&#x59CB;~~&apos;); // 1
let step01 = g.next();
console.log(step01.value);// 3
g.next(&apos;&#x6B22;&#x8FCE;&#x6253;&#x8D4F;&apos;)&#xFF1B;
console.log(&apos;&#x5BF9;&#x8BDD;&#x7ED3;&#x675F;~~&apos;); // 5</code></pre><p>&#x6765;&#x6765;&#x4E00;&#x56FE;&#x80DC;&#x5343;&#x8A00;&#xFF0C;&#x6211;&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x5E76;&#x4E0D;&#x4E25;&#x8C28;&#x7684; low &#x56FE;&#xFF0C;&#x1F624;&#x771F;&#x4E11;&#x554A;&#x3002;&#x5BF9;&#x4E0D;&#x5BF9;&#x6211;&#x4E5F;&#x4E0D;&#x80FD;&#x4FDD;&#x8BC1;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbfs9D?w=657&amp;h=784" src="https://static.alili.tech/img/bVbfs9D?w=657&amp;h=784" alt="%E7%94%9F%E6%88%90%E5%99%A8.png" title="%E7%94%9F%E6%88%90%E5%99%A8.png"></span></p><p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x4E00;&#x70B9;&#x662F;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A; next()&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x542F;&#x52A8;&#x751F;&#x6210;&#x5668;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x5C1D;&#x8BD5;&#x7ED9;&#x6B64;&#x5904;&#x7684;&#x5B83;&#x4F20;&#x9012;&#x70B9;&#x4E1C;&#x897F;&#x662F;&#x6CA1;&#x7528;&#x7684;&#x3002;</p><p>&#x901A;&#x8FC7;&#x4E0A;&#x56FE;&#xFF0C;&#x5E0C;&#x671B;&#x8BFB;&#x5230;&#x8FD9;&#x91CC;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x7406;&#x89E3;&#x4E86;&#x751F;&#x6210;&#x5668;&#x7684;&#x6267;&#x884C;&#x6D41;&#x7A0B;&#x4EE5;&#x53CA; yield &#x548C; next &#x662F;&#x5982;&#x4F55;&#x76F8;&#x4E92;&#x4F20;&#x9012;&#x6570;&#x636E;&#x7684;&#x3002;</p><h2>Generator &#x7ED3;&#x5408;&#x5F02;&#x6B65;&#x5904;&#x7406;</h2><p>&#x5F00;&#x7BC7;&#x4E5F;&#x8BF4;&#xFF0C;Generator &#x662F;&#x4E3A;&#x4E86;&#x5F02;&#x6B65;&#x800C;&#x751F;&#x7684;&#xFF0C;&#x90A3;&#x6211;&#x4EEC;&#x5C31;&#x7B80;&#x5355;&#x770B;&#x4E0B;&#x5982;&#x4F55;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x3002;&#x989D;&#xFF0C;&#x5176;&#x5B9E; async await &#x5DF2;&#x7ECF;&#x5F88;&#x5B8C;&#x7F8E;&#x4E86;&#x3002;</p><pre><code class="js">function* gen () {
  let url = &apos;https://api.github.com/users/github&apos;
  let result = yield fetch(url)
  console.log(result.bio)
  // &#x8BF7;&#x6C42;2&#x5FC5;&#x987B;&#x7B49;&#x8BF7;&#x6C42;1&#x62FF;&#x5230;&#x7ED3;&#x679C;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x662F;&#x4F2A;&#x4EE3;&#x7801;
  yield fetch(&apos;xxxxxx?name=&apos; + result.bio)
}

let g = gen()
let result = g.next()

result
  .value
  .then(function (data) {
    return data.json()
  })
  .then(function (data) {
    g.next(data)
  })
  g.next();</code></pre><p>&#x5199;&#x5230;&#x8FD9;&#x91CC;&#x6709;&#x70B9;&#x611F;&#x609F;&#xFF0C;&#x666E;&#x901A;&#x51FD;&#x6570;&#x4E00;&#x65E6;&#x6267;&#x884C;&#xFF0C;&#x51FD;&#x6570;&#x5916;&#x90E8;&#x662F;&#x65E0;&#x6CD5;&#x5E72;&#x9884;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x90E8;&#x7684;&#x6D41;&#x7A0B;&#x7684;&#x53EA;&#x80FD;&#x7B49;&#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#x6210;&#xFF0C;&#x800C;&#x751F;&#x6210;&#x5668;&#x51FD;&#x6570;&#x901A;&#x8FC7; yield &#x548C; next &#x76F8;&#x4E92;&#x4F20;&#x9012;&#x6570;&#x636E;&#x53EF;&#x4EE5;&#x63A7;&#x5236;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x7684;&#x4EE3;&#x7801;&#x6D41;&#x7A0B;&#xFF0C;&#x7A81;&#x7136;&#x611F;&#x89C9; Generator &#x5E76;&#x4E0D;&#x662F;&#x4E00;&#x65E0;&#x662F;&#x5904;&#x5462;~&#x3002;&#x5F02;&#x6B65;&#x4EE3;&#x7801;&#x53C2;&#x8003;&#x4E86;<a href="https://www.cnblogs.com/libin-1/p/6917097.html" rel="nofollow noreferrer">Promise,Generator&#xFF08;&#x751F;&#x6210;&#x5668;&#xFF09;,async&#xFF08;&#x5F02;&#x6B65;&#xFF09;&#x51FD;&#x6570;</a></p><h2>&#x5176;&#x4ED6;</h2><p>Generator &#x8FD8;&#x6709;&#x4E24;&#x70B9;&#x6BD4;&#x8F83;&#x597D;&#x73A9;&#x7684;&#xFF0C;&#x5F02;&#x5E38;&#x5904;&#x7406;&#xFF0C;&#x8BE5;&#x90E8;&#x5206;&#x5185;&#x5BB9;&#x8BF7;&#x67E5;&#x9605;<a href="http://es6.ruanyifeng.com/#docs/generator" rel="nofollow noreferrer">&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684;&#x6587;&#x7AE0;</a>&#x81EA;&#x5B66;&#x3002;<br>&#x751F;&#x6210;&#x5668;&#x51FA;&#x4E86;&#x53EF;&#x4EE5;&#x8C03;&#x7528;<code>next()</code>&#x3001;&#x8FD8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>throw()</code>&#x3001;<code>return()</code>&#xFF0C;&#x4E5F;&#x8BF7;&#x81EA;&#x5B66;&#x3002;</p><h2>&#x8D44;&#x6599;&#x63A8;&#x8350;</h2><p><a href="https://imququ.com/post/generator-function-in-es6.html" rel="nofollow noreferrer">ES6 &#x4E2D;&#x7684;&#x751F;&#x6210;&#x5668;&#x51FD;&#x6570;&#x4ECB;&#x7ECD;</a><br><a href="https://medium.com/@hidace/javascript-es6-generators-part-i-understanding-generators-93dea22bf1b" rel="nofollow noreferrer">Javascript (ES6) Generators&#x200A;&#x2014;&#x200A;Part I: Understanding Generators(&#x56FE;&#x662F;&#x4ECE;&#x6B64;&#x5904; copy &#x6765;&#x7684;)</a><br><a href="http://www.alloyteam.com/2015/03/es6-generator-introduction/" rel="nofollow noreferrer">ES6 Generator&#x4ECB;&#x7ECD;</a><br><a href="https://github.com/Jocs/jocs.github.io/issues/11" rel="nofollow noreferrer">&#x901A;&#x8FC7;ES6 Generator&#x51FD;&#x6570;&#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;</a><br><a href="https://blog.csdn.net/liwusen/article/details/79617903" rel="nofollow noreferrer">&#x603B;&#x7ED3;&#x4E00;&#x4E0B;ES6&#x4E2D;promise&#x3001;generator&#x548C;async/await&#x4E2D;&#x7684;&#x9519;&#x8BEF;&#x5904;&#x7406;</a></p><p>&#x1F31A; &#x524D;&#x7AEF;&#x5B66;&#x4E60;QQ&#x7FA4;: 538631558 &#x1F31A;</p><blockquote>&#x3010;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x63A8;&#x8350;&#x3011;<a href="https://studio.coding.net/intro" rel="nofollow noreferrer">Cloud Studio</a> &#x662F;&#x57FA;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x96C6;&#x6210;&#x5F0F;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x652F;&#x6301;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#xFF0C;&#x5305;&#x62EC; HTML5&#x3001;PHP&#x3001;Python&#x3001;Java&#x3001;Ruby&#x3001;C/C++&#x3001;.NET &#x5C0F;&#x7A0B;&#x5E8F;&#x7B49;&#x7B49;&#xFF0C;&#x65E0;&#x9700;&#x4E0B;&#x8F7D;&#x5B89;&#x88C5;&#x7A0B;&#x5E8F;&#xFF0C;&#x4E00;&#x952E;&#x5207;&#x6362;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x3002; Cloud Studio&#x63D0;&#x4F9B;&#x4E86;&#x5B8C;&#x6574;&#x7684; Linux &#x73AF;&#x5883;&#xFF0C;&#x5E76;&#x4E14;&#x652F;&#x6301;&#x81EA;&#x5B9A;&#x4E49;&#x57DF;&#x540D;&#x6307;&#x5411;&#xFF0C;&#x52A8;&#x6001;&#x8BA1;&#x7B97;&#x8D44;&#x6E90;&#x8C03;&#x6574;&#xFF0C;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x5404;&#x79CD;&#x5E94;&#x7528;&#x7684;&#x5F00;&#x53D1;&#x7F16;&#x8BD1;&#x4E0E;&#x90E8;&#x7F72;&#x3002;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6深入浅出 Generator

## 原文链接
[https://segmentfault.com/a/1190000016040985](https://segmentfault.com/a/1190000016040985)

