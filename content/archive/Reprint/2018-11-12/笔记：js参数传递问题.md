---
title: 笔记：js参数传递问题
hidden: true
categories: reprint
slug: 11ab453f
date: 2018-11-12 02:30:05
---

{{< raw >}}
<h2><strong>&#x524D;&#x8A00;</strong></h2><pre><code>var a = [1],b=[1];
a==b;     //fasle
var c = b;
c[0]=2;
b         //[2]
c = [3];
b         //[2]</code></pre><p>&#x89E3;&#x91CA;&#xFF1A;b&#x5BF9;c&#x8BF4;&#xFF0C;&#x6211;&#x540C;&#x610F;&#x4F60;&#x8DDF;&#x6211;&#x5171;&#x7528;&#x4E00;&#x4E2A;&#x5185;&#x5B58;&#x5730;&#x5740;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x6211;&#x7684;&#x5185;&#x5B58;&#x5730;&#x5740;&#x5185;&#xFF0C;&#x4FEE;&#x6539;&#x5C40;&#x90E8;&#x6210;&#x5458;&#xFF0C;&#x4F46;&#x662F;&#x4F60;&#x8981;&#x8FDE;&#x6211;&#x7684;&#x5BB6;&#x90FD;&#x7ED9;&#x632A;&#x8D70;&#xFF0C;&#x5BF9;&#x4E0D;&#x8D77; &#x4F60;&#x81EA;&#x5DF1;&#x8D70;&#x3002;&#x3002;&#x3002;</p><h2><strong>&#x6B63;&#x9898;</strong></h2><p>ECMAScript &#x4E2D;&#x6240;&#x6709;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x90FD;&#x662F;&#x6309;&#x503C;&#x4F20;&#x9012;&#x7684;&#x3002;&#x8BBF;&#x95EE;&#x53D8;&#x91CF;&#x6709;&#x6309;&#x503C;&#x548C;&#x6309;&#x5F15;&#x7528;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x800C;&#x53C2;&#x6570;&#x53EA;&#x80FD;&#x6309;&#x503C;&#x4F20;&#x9012;&#x3002;<br>&#x2003;&#x2003;</p><p>&#x57FA;&#x672C;&#x7C7B;&#x578B;&#x53C2;&#x6570;&#x4F20;&#x9012;&#xFF1A;&#x4F20;&#x7ED9;&#x51FD;&#x6570;&#x7684;&#x662F;&#x6570;&#x503C;&#x7684;&#x4E00;&#x4E2A;&#x590D;&#x5236;&#xFF0C;&#x51FD;&#x6570;&#x4E2D;&#x5BF9;&#x5176;&#x7684;&#x4FEE;&#x6539;&#x5916;&#x90E8;&#x4E0D;&#x53EF;&#x89C1;&#x3002;</p><pre><code>var a = 1;
var b = 2;
function change(a, b) {
    var c = a;
    a = b;
    b = c;
    console.log(a);    //2
    console.log(b);    //1
}
change(a, b);
console.log(a);    //1
console.log(b);    //2
</code></pre><p>&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x53C2;&#x6570;&#x4F20;&#x9012;&#xFF1A;&#x4F20;&#x7ED9;&#x51FD;&#x6570;&#x7684;&#x662F;&#x6570;&#x503C;&#x7684;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#xFF0C;&#x51FD;&#x6570;&#x4E2D;&#x5BF9;&#x5176;&#x5C5E;&#x6027;&#x7684;&#x4FEE;&#x6539;&#x5916;&#x90E8;&#x53EF;&#x89C1;&#xFF0C;&#x4F46;&#x7528;&#x65B0;&#x5F15;&#x7528;&#x8986;&#x76D6;&#x5176;&#x5219;&#x5728;&#x5916;&#x90E8;&#x4E0D;&#x53EF;&#x89C1;</p><pre><code>var a = [1, 2, 3];
var b = [5, 6];
function change(a,b) {
  a[0] = 4;    //&#x5BF9;&#x5176;&#x5C5E;&#x6027;&#x7684;&#x4FEE;&#x6539;&#x5916;&#x90E8;&#x53EF;&#x89C1; 
  var c = a;
  a = b;      //&#x7528;&#x65B0;&#x5F15;&#x7528;&#x8986;&#x76D6;
  b = c;
  console.log(a);  //&quot;5,6&quot;        
  console.log(b);  //&quot;4,2,3&quot;
}
change(a,b);
console.log(a);    //&quot;4,2,3&quot;
console.log(b);    //&quot;5,6&quot;
</code></pre><p>&#x2003;&#x2003;a&#xFF0C;b&#x662F;change&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x5728;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x65F6;&#x4F20;&#x9012;&#x4E86;a&#xFF0C;b&#x7684;&#x5F15;&#x7528;&#x8D4B;&#x7ED9;&#x4E86;&#x8FD9;&#x4E24;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x4F46;&#x662F;&#x5E76;&#x4E0D;&#x80FD;&#x6539;&#x53D8;&#x5168;&#x5C40;&#x4E2D;&#x7684;a&#xFF0C;b&#x3002;&#x56E0;&#x4E3A;&#x7528;&#x65B0;&#x5F15;&#x7528;&#x8986;&#x76D6;&#x5728;&#x5916;&#x90E8;&#x4E0D;&#x53EF;&#x89C1;&#xFF0C;&#x56E0;&#x4E3A;&#x51FD;&#x6570;&#x53EA;&#x662F;&#x62FF;&#x5230;&#x4E86;&#x5F15;&#x7528; &#x5E76;&#x6CA1;&#x6709;&#x6743;&#x529B;&#x66F4;&#x6539;&#x5F15;&#x7528;&#x3002;</p><pre><code>var a = [1, 2, 3];
var b = [5, 6];
function change() {
  var c = a;
  a[0] = 4;    //&#x5BF9;&#x5176;&#x5C5E;&#x6027;&#x7684;&#x4FEE;&#x6539;&#x5916;&#x90E8;&#x53EF;&#x89C1; 
  a = b;      //&#x7528;&#x65B0;&#x5F15;&#x7528;&#x8986;&#x76D6;
  b = c;
}
change(a,b);
console.log(a);  //&quot;5,6&quot; 
console.log(b);  //&quot;4,2,3&quot;
</code></pre><p>&#x2003;&#x2003;&#x56E0;&#x4E3A;js&#x6CA1;&#x6709;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x5728;change&#x91CC;&#x627E;&#x4E0D;&#x5230;&#x53D8;&#x91CF;a&#xFF0C;b&#x5C31;&#x4F1A;&#x81EA;&#x89C9;&#x7684;&#x5230;&#x4E0A;&#x5C42;&#x53BB;&#x627E;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x7684;a&#xFF0C;b&#x662F;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x7684;&#x5F15;&#x7528;&#x3002;<br>&#x6B22;&#x8FCE;&#x641C;&#x7D22;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;<strong>&#x4E00;&#x7EBF;&#x7801;&#x519C;</strong><br>&#x6216;&#x626B;&#x7801;&#x5173;&#x6CE8;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbgoy5?w=258&amp;h=258" src="https://static.alili.tech/img/bVbgoy5?w=258&amp;h=258" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
笔记：js参数传递问题

## 原文链接
[https://segmentfault.com/a/1190000016261581](https://segmentfault.com/a/1190000016261581)

