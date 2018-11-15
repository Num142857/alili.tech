---
title: 高效遍历匹配Json数据，避免嵌套循环
hidden: true
categories: reprint
slug: 65f55222
date: 2018-11-12 02:30:05
---

{{< raw >}}
<blockquote>&#x5DE5;&#x4F5C;&#x4E2D;&#x7ECF;&#x5E38;&#x4F1A;&#x9047;&#x5230;&#x8FD9;&#x6837;&#x7684;&#x9700;&#x6C42;&#xFF1A;<br>1.&#x8D2D;&#x7269;&#x8F66;&#x5217;&#x8868;&#x4E2D;&#x52FE;&#x9009;&#x67D0;&#x4E9B;&#xFF0C;&#x70B9;&#x51FB;&#x4EFB;&#x610F;&#x4E00;&#x9879;&#xFF0C;&#x524D;&#x5F80;&#x8BE6;&#x60C5;&#x9875;&#xFF0C;&#x518D;&#x8FD4;&#x56DE;&#x8D2D;&#x7269;&#x8F66;&#x4F9D;&#x65E7;&#x9700;&#x8981;&#x5448;&#x73B0;&#x52FE;&#x9009;&#x72B6;&#x6001;<br>2.&#x52FE;&#x9009;&#x4EBA;&#x5458;&#x540E;&#xFF0C;&#x524D;&#x5F80;&#x522B;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x518D;&#x6B21;&#x8FD4;&#x56DE;&#xFF0C;&#x4EBA;&#x5458;&#x4F9D;&#x65E7;&#x7A0B;&#x52FE;&#x9009;&#x72B6;&#x6001;<br>3.&#x7B49;&#x7B49;....</blockquote><h5><strong>&#x6570;&#x636E;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</strong></h5><pre><code>// &#x7F13;&#x5B58;&#x6570;&#x636E;
var students = [
        { id: 35, name: &apos;&#x5C0F;&#x660E;&apos;, age: 25, address: &apos;&#x73AF;&#x7403;&#x4E2D;&#x5FC3;&apos;,checked:true},
        { id: 36, name: &apos;&#x6770;&#x4F26;&apos;, age: 41, address: &apos;&#x4E2D;&#x56FD;&#x53F0;&#x6E7E;&apos; ,checked:true},
        { id: 37, name: &apos;&#x4E0D;&#x64B8;&#x6B7B;&apos;, age: 46, address: &apos;&#x9709;&#x56FD;&apos; ,checked:true}
    ]
    
 // &#x6700;&#x65B0;&#x6570;&#x636E;
var data = [
        { id: 35, name: &apos;&#x5C0F;&#x660E;&apos;, age: 25, address: &apos;&#x73AF;&#x7403;&#x4E2D;&#x5FC3;&apos;,checked:false },
        { id: 36, name: &apos;&#x6770;&#x4F26;&apos;, age: 41, address: &apos;&#x4E2D;&#x56FD;&#x53F0;&#x6E7E;&apos; ,checked:false},
        { id: 37, name: &apos;&#x4E0D;&#x64B8;&#x6B7B;&apos;, age: 46, address: &apos;&#x9709;&#x56FD;&apos; ,checked:false},
        { id: 38, name: &apos;&#x5927;&#x660E;&apos;, age: 46, address: &apos;&#x54C8;&#x54C8;&#x54C8;&#x54C8;&#x54C8;&apos; ,checked:false},
        { id: 39, name: &apos;&#x4E2D;&#x660E;&apos;, age: 46, address: &apos;&#x4E2D;&#x56FD;&#x56DB;&#x5DDD;&apos; ,checked:false}
    ]</code></pre><h5><strong>&#x601D;&#x8DEF;&#x5982;&#x4E0B;&#xFF1A;</strong></h5><p>&#x79BB;&#x5F00;&#x9875;&#x9762;&#x7684;&#x65F6;&#x5019;&#x5C06;&#x52FE;&#x9009;&#x7684;&#x6570;&#x636E;&#x7F13;&#x5B58;&#xFF0C;&#x518D;&#x6B21;&#x8FD4;&#x56DE;&#x5230;&#x9875;&#x9762;&#x65F6;&#xFF0C;&#x5C06;&#x6700;&#x65B0;&#x6DFB;&#x52A0;&#x7684;&#x6570;&#x636E;&#x548C;&#x7F13;&#x5B58;&#x7684;&#x6570;&#x636E;&#x505A;&#x5BF9;&#x6BD4;&#xFF0C;&#x5982;&#x679C;&#x7F13;&#x5B58;&#x4E2D;&#x5B58;&#x5728;&#x52FE;&#x9009;&#xFF0C;&#x5219;&#x66F4;&#x6539;&#x5BF9;&#x5E94;&#x7684;&#x6700;&#x65B0;&#x6570;&#x636E;&#x3002;</p><blockquote>&#x5728;&#x505A;&#x6570;&#x636E;&#x6BD4;&#x5BF9;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5D4C;&#x5957;for&#x5FAA;&#x73AF;&#xFF0C;&#x4E00;&#x5C42;for&#x5FAA;&#x73AF;&#x904D;&#x5386;&#x6700;&#x65B0;&#x6570;&#x636E;,&#x4E8C;&#x5C42;for&#x5FAA;&#x73AF;&#x904D;&#x5386;&#x7F13;&#x5B58;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x679C;&#x7F13;&#x5B58;&#x6570;&#x636E;&#x4E2D;&#x5BF9;&#x5E94;&#x7684;checked&#x4E3A;true&#xFF0C;&#x5219;&#x66F4;&#x6539;&#x7B2C;&#x4E00;&#x5C42;for&#x5FAA;&#x73AF;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#x3002;&#x867D;&#x7136;&#x901A;&#x8FC7;&#x5D4C;&#x5957;&#x5FAA;&#x73AF;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x6548;&#x679C;&#xFF0C;&#x4F46;&#x662F;&#x5FAA;&#x73AF;&#x7684;&#x6B21;&#x6570;&#x662F;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x7684;&#x4E58;&#x79EF;&#xFF0C;&#x5F53;&#x6570;&#x636E;&#x91CF;&#x5927;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD9;&#x6837;&#x4F1A;&#x5F88;&#x8017;&#x6027;&#x80FD;&#x3002;<strong>&#x8FD9;&#x91CC;&#x63A8;&#x8350;&#x53E6;&#x4E00;&#x79CD;&#x529E;&#x6CD5;&#xFF0C;&#x5C06;&#x7F13;&#x5B58;&#x7684;&#x6570;&#x7EC4;&#x8F6C;&#x6362;&#x6210;<code>Json&#x5BF9;&#x8C61;</code>&#xFF0C;&#x5C06;&#x552F;&#x4E00;&#x7684;<code>id</code>&#x4F5C;&#x4E3A;&#x6570;&#x7EC4;&#x4E2D;&#x6BCF;&#x4E00;&#x9879;&#x7684;<code>key</code>&#xFF0C;&#x5C06;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x505A;&#x4E3A;<code>value</code>&#xFF0C;&#x8FD9;&#x6837;&#x5FAA;&#x73AF;&#x7684;&#x65F6;&#x5019;&#x53EA;&#x9700;&#x8981;&#x4E00;&#x5C42;&#x5FAA;&#x73AF;&#x5373;&#x53EF;</strong>&#x3002;</blockquote><h5><strong>&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</strong></h5><pre><code>// &#x7F13;&#x5B58;&#x6570;&#x636E;
var students = [
        { id: 35, name: &apos;&#x5C0F;&#x660E;&apos;, age: 25, address: &apos;&#x73AF;&#x7403;&#x4E2D;&#x5FC3;&apos;,checked:true },
        { id: 36, name: &apos;&#x6770;&#x4F26;&apos;, age: 41, address: &apos;&#x4E2D;&#x56FD;&#x53F0;&#x6E7E;&apos; ,checked:true},
        { id: 37, name: &apos;&#x4E0D;&#x64B8;&#x6B7B;&apos;, age: 46, address: &apos;&#x9709;&#x56FD;&apos; ,checked:true}
    ]
    
 // &#x6700;&#x65B0;&#x6570;&#x636E;
var data = [
        { id: 35, name: &apos;&#x5C0F;&#x660E;&apos;, age: 25, address: &apos;&#x73AF;&#x7403;&#x4E2D;&#x5FC3;&apos;,checked:false },
        { id: 36, name: &apos;&#x6770;&#x4F26;&apos;, age: 41, address: &apos;&#x4E2D;&#x56FD;&#x53F0;&#x6E7E;&apos; ,checked:false},
        { id: 37, name: &apos;&#x4E0D;&#x64B8;&#x6B7B;&apos;, age: 46, address: &apos;&#x9709;&#x56FD;&apos; ,checked:false},
        { id: 38, name: &apos;&#x5927;&#x540D;&apos;, age: 46, address: &apos;&#x54C8;&#x54C8;&#x54C8;&#x54C8;&#x54C8;&apos; ,checked:false},
        { id: 39, name: &apos;&#x4E2D;&#x660E;&apos;, age: 46, address: &apos;&#x4E2D;&#x56FD;&#x56DB;&#x5DDD;&apos; ,checked:false}
    ]
    
    // &#x5C06;&#x6570;&#x7EC4;&#x8F6C;&#x6362;&#x4E3A;json&#x5BF9;&#x8C61;
function Array2Json(arr, obj = {}) {
        arr.forEach(item =&gt; {
            obj[item.id] = item;
        })

        return obj
    }
    
    students  = Array2Json(students);
    
    // &#x6B64;&#x5904;&#x53EF;&#x4EE5;&#x7528;for&#x5FAA;&#x73AF;&#xFF0C;&#x4F46;&#x662F;&#x63A8;&#x8350;&#x4F7F;&#x7528;while&#xFF0C;&#x56E0;&#x4E3A;while&#x6BD4;for&#x6548;&#x7387;&#x9AD8;
    
    let i = 0;
    while (i &lt; data.length) {
      if (students[data[i].id]) {
        data[i].checked = true
      }
      i++;
    }
    // &#x6700;&#x7EC8;&#x5F97;&#x5230;&#x7684;data&#x5C31;&#x662F;&#x8FD8;&#x539F;&#x4E86;&#x52FE;&#x9009;&#x72B6;&#x6001;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6E32;&#x67D3;&#x5728;&#x754C;&#x9762;&#x4E0A;
    console.log(data)
    </code></pre><blockquote>&#x5199;&#x5B8C;&#x4E86;&#xFF0C;&#x8981;&#x4E0B;&#x73ED;&#x4E86;&#xFF0C;&#x54C8;&#x54C8;&#x54C8;&#x54C8;</blockquote><p><span class="img-wrap"><img data-src="/img/bVbgtMO?w=690&amp;h=690" src="https://static.alili.tech/img/bVbgtMO?w=690&amp;h=690" alt="clipboard.png" title="clipboard.png"></span></p><p><strong>---------------------------------------&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;------------------&#x8C22;&#x8C22;-----------------</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高效遍历匹配Json数据，避免嵌套循环

## 原文链接
[https://segmentfault.com/a/1190000016281753](https://segmentfault.com/a/1190000016281753)

