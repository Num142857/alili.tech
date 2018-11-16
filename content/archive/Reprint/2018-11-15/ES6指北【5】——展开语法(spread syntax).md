---
title: 'ES6指北【5】——展开语法(spread syntax)' 
date: 2018-11-15 21:20:48
hidden: true
slug: gnkxbx0efzr
categories: [reprint]
---

{{< raw >}}
<p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x4E00;&#x770B;MDN&#x7684;&#x5B98;&#x65B9;&#x5B9A;&#x4E49;</p><blockquote>&#x5C55;&#x5F00;&#x8BED;&#x6CD5;(Spread syntax), &#x53EF;&#x4EE5;&#x5728;<code>&#x51FD;&#x6570;&#x8C03;&#x7528;/&#x6570;&#x7EC4;&#x6784;&#x9020;</code>&#x65F6;, &#x5C06;<strong>&#x6570;&#x7EC4;&#x8868;&#x8FBE;&#x5F0F;</strong>&#x6216;&#x8005;<strong>string</strong>&#x5728;&#x8BED;&#x6CD5;&#x5C42;&#x9762;&#x5C55;&#x5F00;&#xFF1B;<br>&#x8FD8;&#x53EF;&#x4EE5;&#x5728;<code>&#x6784;&#x9020;&#x5B57;&#x9762;&#x91CF;&#x5BF9;&#x8C61;</code>&#x65F6;, &#x5C06;<strong>&#x5BF9;&#x8C61;&#x8868;&#x8FBE;&#x5F0F;</strong>&#x6309;key-value&#x7684;&#x65B9;&#x5F0F;&#x5C55;&#x5F00;&#x3002;(&#x8BD1;&#x8005;&#x6CE8;: &#x5B57;&#x9762;&#x91CF;&#x4E00;&#x822C;&#x6307; [1, 2, 3] &#x6216;&#x8005; {name: &quot;mdn&quot;} &#x8FD9;&#x79CD;&#x7B80;&#x6D01;&#x7684;&#x6784;&#x9020;&#x65B9;&#x5F0F;)</blockquote><p>&#x4ECE;&#x5B9A;&#x4E49;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E86;&#x89E3;&#x5230;&#x5C55;&#x5F00;&#x8BED;&#x6CD5;&#x7684;<strong>&#x4F7F;&#x7528;&#x573A;&#x666F;</strong>&#x5982;&#x4E0B;</p><ul><li><code>&#x51FD;&#x6570;</code>&#x8C03;&#x7528;</li><li><code>&#x6570;&#x7EC4;</code>&#x6784;&#x9020;</li><li>&#x6784;&#x9020;<code>&#x5B57;&#x9762;&#x91CF;&#x5BF9;&#x8C61;</code>(ES2018)</li></ul><p><strong>&#x4F5C;&#x7528;</strong>&#x5982;&#x4E0B;</p><ul><li>&#x5C55;&#x5F00;<code>&#x6570;&#x7EC4;</code></li><li>&#x5C55;&#x5F00;<code>&#x5B57;&#x7B26;&#x4E32;</code></li><li>&#x5C55;&#x5F00;<code>&#x5BF9;&#x8C61;</code>&#xFF08;<strong>&#x53EA;&#x80FD;&#x7528;&#x4E8E;&#x6784;&#x9020;&#x5B57;&#x9762;&#x91CF;&#x5BF9;&#x8C61;</strong>&#xFF09;</li></ul><h1>1. &#x5728;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x65F6;&#x4F7F;&#x7528;</h1><pre><code class="javascript">// &#x5C55;&#x5F00;&#x6570;&#x7EC4;
console.log(...[1,2,3]) // 1 2 3

// &#x5C55;&#x5F00;&#x5B57;&#x7B26;&#x4E32;
console.log(...&apos;hello world&apos;) // h e l l o   w o r l d

// &#x5C55;&#x5F00;&#x5BF9;&#x8C61;&#x3010;&#x65E0;&#x6CD5;&#x4F7F;&#x7528;&#xFF0C;&#x4F1A;&#x62A5;&#x9519;&#x3011;
console.log(...{a:1}) // Uncaught TypeError</code></pre><h2>1.1 &#x4E0E;rest&#x53C2;&#x6570;&#x5BF9;&#x6BD4;</h2><p>&#x5728;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x65F6;&#x4F7F;&#x7528;&#x5C55;&#x5F00;&#x8BED;&#x6CD5;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x7279;&#x522B;&#x6CE8;&#x610F;<strong>&#x6570;&#x7EC4;&#x3001;&#x5B57;&#x7B26;&#x4E32;</strong>&#x5176;&#x5B9E;&#x662F;&#x88AB;&#x5C55;&#x5F00;&#x6210;&#x4E86;<strong>&#x53C2;&#x6570;&#x5E8F;&#x5217;</strong>&#x3002;<br>&#x8FD8;&#x8BB0;&#x5F97;<code>rest&#x53C2;&#x6570;</code>&#x662F;<strong>&#x5C06;&#x53C2;&#x6570;&#x90FD;&#x90FD;&#x6536;&#x96C6;&#x4E3A;&#x6570;&#x7EC4;</strong>&#x5417;&#xFF1F;<br><code>&#x5C55;&#x5F00;&#x8BED;&#x6CD5;</code>&#x6B63;&#x597D;&#x662F;&#x5B83;&#x7684;&#x9006;&#x8FD0;&#x7B97;&#x2014;&#x2014;<strong>&#x5C06;&#x6570;&#x7EC4;&#x5C55;&#x5F00;&#x4E3A;&#x53C2;&#x6570;</strong><br>&#x8FD8;&#x6709;&#x6CE8;&#x610F;&#x7684;&#x662F;<code>rest&#x53C2;&#x6570;&#x5728;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x65F6;&#x4F7F;&#x7528;&#x3010;&#x5904;&#x7406;&#x5F62;&#x53C2;&#x3011;&#xFF0C;&#x5C55;&#x5F00;&#x8BED;&#x6CD5;&#x5728;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x65F6;&#x4F7F;&#x7528;&#x3010;&#x5904;&#x7406;&#x5B9E;&#x53C2;&#x3011;</code>&#xFF0C;&#x53EF;&#x80FD;&#x6709;&#x4E9B;&#x62D7;&#x53E3;&#xFF0C;&#x4E0B;&#x9762;&#x770B;&#x4E2A;&#x4F8B;&#x5B50;&#x5927;&#x5BB6;&#x5C31;&#x660E;&#x767D;&#x4E86;</p><pre><code class="javascript">function test(x, y, ...params) {
  // &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x662F;rest&#x53C2;&#x6570;
  console.log(...params) // &#x8C03;&#x7528;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x662F;rest&#x53C2;&#x6570;
}</code></pre><h2>1.2 &#x4F5C;&#x4E3A;apply&#x7684;&#x8BED;&#x6CD5;&#x7CD6;</h2><pre><code class="javascript">let numArr = [1, 10, 2, 234]
Math.max.apply(null, numArr)
// &#x5B8C;&#x5168;&#x7B49;&#x4EF7;&#x4E8E;
Math.max(...numArr) // &#x5C06;numArr&#x5C55;&#x5F00;&#x4E3A;&#x53C2;&#x6570;&#x5E8F;&#x5217;</code></pre><h2>1.3 &#x5728;new&#x7684;&#x65F6;&#x5019;&#x4F7F;&#x7528;</h2><p>&#x56E0;&#x4E3A;new&#x7684;&#x65F6;&#x5019;&#x662F;&#x65E0;&#x6CD5;&#x8C03;&#x7528;apply&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5C55;&#x5F00;&#x8BED;&#x6CD5;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x8D77;&#x5230;&#x4E86;&#x5F88;&#x725B;X&#x7684;&#x4F5C;&#x7528;</p><pre><code class="javascript">function Person(name, age, weight) {
  this.name = name
  this.age = age
  this.weight = weight
}

let blues = new Person(&apos;blueswong&apos;, &apos;16&apos;, &apos;60&apos;)
// &#x5B8C;&#x5168;&#x7B49;&#x4EF7;&#x4E8E;
let blues = new Person(...[&apos;blueswong&apos;, &apos;16&apos;, &apos;60&apos;])</code></pre><p>&#x8FD9;&#x5728;&#x9700;&#x8981;&#x751F;&#x4EA7;&#x5F88;&#x591A;&#x4E2A;&#x5B9E;&#x4F8B;&#x65F6;&#xFF0C;&#x975E;&#x5E38;&#x6709;&#x7528;</p><pre><code class="javascript">function Person(name, age, weight) {
  this.name = name
  this.age = age
  this.weight = weight
}

let persons = [[&apos;blues1&apos;, &apos;16&apos;, &apos;60&apos;], [&apos;blues2&apos;, &apos;16&apos;, &apos;60&apos;], [&apos;blues3&apos;, &apos;16&apos;, &apos;60&apos;]]
let createdPersons = {}
persons.forEach(e =&gt; {
  console.log(e[0])
  createdPersons[e[0]] = new Person(...e)
})</code></pre><h1>2. &#x5728;&#x6570;&#x7EC4;&#x6784;&#x9020;&#x65F6;&#x4F7F;&#x7528;</h1><pre><code class="javascript">// &#x5C55;&#x5F00;&#x6570;&#x7EC4;
let arr1 = [1, 2, 3]
let arr2 = [0, ...arr1, 4] // [0, 1, 2, 3, 4]

// &#x5C55;&#x5F00;&#x5B57;&#x7B26;&#x4E32;
let arr1 = [1, 2, 3, ...&apos;456&apos;] // [1, 2, 3, &quot;4&quot;, &quot;5&quot;, &quot;6&quot;]</code></pre><h2>2.1 &#x4EE3;&#x66FF;&#x5C06;&#x5DF2;&#x6709;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x63D2;&#x5165;&#x5230;&#x65B0;&#x6570;&#x7EC4;&#x91CD;&#x7684;&#x6240;&#x6709;API</h2><blockquote>&#x4EE5;&#x5F80;&#x6211;&#x4EEC;&#x5C06;&#x5DF2;&#x6709;&#x6570;&#x7EC4;&#x7684;<strong>&#x5143;&#x7D20;</strong>&#x63D2;&#x5165;&#x5230;&#x65B0;&#x6570;&#x7EC4;&#x7684;&#x4E2D;&#xFF0C;&#x9700;&#x8981;&#x501F;&#x7528;&#x4E00;&#x4E9B;API&#x4F8B;&#x5982;<code>push/unshift/splice/concat</code>&#xFF0C;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x5C55;&#x5F00;&#x8BED;&#x6CD5;&#x53EF;&#x4EE5;&#x5BF9;&#x4E0A;&#x8FF0;api&#x8FDB;&#x884C;&#x66FF;&#x6362;&#x3002;<p>&#x9700;&#x8981;&#x7279;&#x522B;&#x5F3A;&#x8C03;&#x7684;&#x662F;&#xFF0C;&#x8FD9;&#x5728;<strong>&#x521B;&#x5EFA;&#x65B0;&#x6570;&#x7EC4;</strong>&#x7684;&#x65F6;&#x5019;&#x624D;&#x6BD4;&#x8F83;&#x65B9;&#x4FBF;</p></blockquote><pre><code class="javascript">let arr = [4, 5]
let arr2 = [6, 7, 8]
// &#x5728;&#x6570;&#x7EC4;&#x4EFB;&#x610F;&#x4F4D;&#x7F6E;&#x589E;&#x52A0;&#x5143;&#x7D20;
let newArr1 = [1, 2, 3, ...arr] // [1, 2, 3, 4, 5]
let newArr2 = [...arr, 1, 2, 3] // [4, 5, 1, 2, 3]
let newArr3 = [1, ...arr, 2, 3] // [1, 4, 5, 2, 3]
let newArr4 = [1, 2, ...arr, 3] // [1, 2, 4, 5, 3]
// &#x8FDE;&#x63A5;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;
let newArr5 = [...arr, ...arr2] // [4, 5, 6, 7, 8]</code></pre><p>&#x5982;&#x679C;&#x662F;<strong>&#x5BF9;&#x539F;&#x6709;&#x7684;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;</strong>&#xFF0C;<code>&#x539F;&#x6709;API</code>+<code>&#x5728;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x4E2D;&#x4F7F;&#x7528;&#x5C55;&#x5F00;&#x8BED;&#x6CD5;</code>&#x6BD4;&#x8F83;&#x65B9;&#x4FBF;</p><h2>2.2 &#x5B9E;&#x73B0;&#x5BF9;&#x6570;&#x7EC4;&#x7684;&#x6D45;&#x62F7;&#x8D1D;</h2><pre><code class="javascript">let obj = {a: 1}
let arr = [2, 1, &apos;&#x7684;&apos;, obj]
// &#x5728;&#x6570;&#x7EC4;&#x4EFB;&#x610F;&#x4F4D;&#x7F6E;&#x589E;&#x52A0;&#x5143;&#x7D20;
let newarr = [...arr] // [2, 1, &apos;&#x7684;&apos;, {a: 1}]

// &#x4F46;&#x4EC5;&#x4EC5;&#x662F;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x65B0;&#x6570;&#x7EC4;&#x4E2D;&#x7684;{a:1}&#x4E0E;obj&#x8FD8;&#x662F;&#x6307;&#x5411;&#x4E86;&#x76F8;&#x540C;&#x7684;&#x5185;&#x5B58;
newarr[3].a = 2
console.log(obj) // {a: 2}</code></pre><h1>3. &#x5728;&#x6784;&#x9020;&#x5B57;&#x9762;&#x91CF;&#x5BF9;&#x8C61;&#x65F6;&#x4F7F;&#x7528;</h1><h2>3.1 &#x5B9E;&#x73B0;&#x5BF9;&#x8C61;&#x7684;&#x6D45;&#x62F7;&#x8D1D;</h2><blockquote>&#x5E38;&#x89C1;&#x7684;&#x5B9E;&#x73B0;&#x5BF9;&#x8C61;&#x6D45;&#x62F7;&#x8D1D;&#x7684;&#x65B9;&#x6CD5;</blockquote><pre><code class="javascript">let obj = {a: &apos;10&apos;, b: {c: 10}, d: [1, 2, 3]}

// 1. &#x904D;&#x5386;
let newObj = {}
for (let key in obj) {
  newObj[key] = obj[key]
}
console.log(newObj)

// 2.&#x4F7F;&#x7528;assign
let newObj1 = Object.assign({}, obj)
console.log(newObj1)</code></pre><blockquote>&#x4F7F;&#x7528;&#x5C55;&#x5F00;&#x8BED;&#x6CD5;&#x5B9E;&#x73B0;</blockquote><pre><code class="javascript">let newObj2 = {...obj}</code></pre><blockquote>&#x7531;&#x4E8E;&#x8FD9;&#x662F;ES2018&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x73B0;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x652F;&#x6301;&#x7684;&#x5E76;&#x4E0D;&#x5230;&#x4F4D;&#xFF0C;&#x56E0;&#x6B64;&#x7B14;&#x8005;&#x5C31;&#x4E0D;&#x505A;&#x8FC7;&#x591A;&#x4ECB;&#x7ECD;&#x4E86;&#x3002;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax#%E6%9E%84%E9%80%A0%E5%AD%97%E9%9D%A2%E9%87%8F%E5%AF%B9%E8%B1%A1%E6%97%B6%E4%BD%BF%E7%94%A8%E5%B1%95%E5%BC%80%E8%AF%AD%E6%B3%95" rel="nofollow noreferrer">&#x53BB;mdn&#x4E0A;&#x67E5;&#x770B;</a></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6指北【5】——展开语法(spread syntax)

## 原文链接
[https://segmentfault.com/a/1190000016071130](https://segmentfault.com/a/1190000016071130)

