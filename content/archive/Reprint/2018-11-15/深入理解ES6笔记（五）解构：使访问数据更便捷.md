---
title: 深入理解ES6笔记（五）解构：使访问数据更便捷
hidden: true
categories: reprint
slug: 2c51a5c3
date: 2018-11-15 02:30:08
---

{{< raw >}}
<blockquote>&#x4E3B;&#x8981;&#x77E5;&#x8BC6;&#x70B9;&#xFF1A;&#x5BF9;&#x8C61;&#x89E3;&#x6784;&#x3001;&#x6570;&#x7EC4;&#x89E3;&#x6784;&#x3001;&#x6DF7;&#x5408;&#x89E3;&#x6784;&#x4EE5;&#x53CA;&#x53C2;&#x6570;&#x89E3;&#x6784;<br><span class="img-wrap"><img data-src="/img/bVbfWgH?w=1020&amp;h=585" src="https://static.alili.tech/img/bVbfWgH?w=1020&amp;h=585" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></blockquote><p><a href="https://segmentfault.com/a/1190000016152299">&#x300A;&#x6DF1;&#x5165;&#x7406;&#x89E3;ES6&#x300B;&#x7B14;&#x8BB0; &#x76EE;&#x5F55;</a></p><h1>&#x5BF9;&#x8C61;&#x89E3;&#x6784;</h1><h2>&#x5BF9;&#x8C61;&#x89E3;&#x6784;</h2><p><strong>&#x5BF9;&#x8C61;&#x89E3;&#x6784;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;</strong></p><pre><code>let node = {
    type: &quot;Identifier&quot;,
    name: &quot;foo&quot;
};
let { type, name } = node;
console.log(type); // &quot;Identifier&quot;
console.log(name); // &quot;foo&quot;</code></pre><h2>&#x89E3;&#x6784;&#x8D4B;&#x503C;</h2><pre><code>let node = {
    type: &quot;Identifier&quot;,
    name: &quot;foo&quot;
},
type = &quot;Literal&quot;,
name = 5;
//&#x4F7F;&#x7528;&#x89E3;&#x6784;&#x6765;&#x5206;&#x914D;&#x4E0D;&#x540C;&#x7684;&#x503C;
({ type, name } = node);
console.log(type); // &quot;Identifier&quot;
console.log(name); // &quot;foo&quot;</code></pre><p><strong>&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x4F7F;&#x7528;&#x89E3;&#x6784;&#x8D4B;&#x503C;</strong></p><pre><code>let node = {
    type: &quot;Identifier&quot;,
    name: &quot;foo&quot;
},
type = &quot;Literal&quot;,
name = 5;
function outputInfo(value) {
    console.log(value === node); // true
}
outputInfo({ type, name } = node);
console.log(type); // &quot;Identifier&quot;
console.log(name); // &quot;foo&quot;</code></pre><h2>&#x9ED8;&#x8BA4;&#x503C;</h2><p>&#x5F53;&#x4F60;&#x4F7F;&#x7528;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x8BED;&#x53E5;&#x65F6;&#xFF0C;&#x5982;&#x679C;&#x6240;&#x6307;&#x5B9A;&#x7684;&#x672C;&#x5730;&#x53D8;&#x91CF;&#x5728;&#x5BF9;&#x8C61;&#x4E2D;&#x6CA1;&#x6709;&#x627E;&#x5230;&#x540C;&#x540D;&#x5C5E;&#x6027;&#xFF0C;&#x90A3;&#x4E48;&#x8BE5;&#x53D8;&#x91CF;&#x4F1A;&#x88AB;&#x8D4B;&#x503C;&#x4E3A; undefined &#x3002;</p><pre><code>let node = {
    type: &quot;Identifier&quot;,
    name: &quot;foo&quot;
};
let { type, name, value } = node;
console.log(type); // &quot;Identifier&quot;
console.log(name); // &quot;foo&quot;
console.log(value); // undefined</code></pre><p>&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x6027;&#x5730;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x4EE5;&#x4FBF;&#x5728;&#x6307;&#x5B9A;&#x5C5E;&#x6027;&#x4E0D;&#x5B58;&#x5728;&#x65F6;&#x4F7F;&#x7528;&#x8BE5;&#x503C;:</p><pre><code>let node = {
    type: &quot;Identifier&quot;,
    name: &quot;foo&quot;
};
let { type, name, value = true } = node;
console.log(type); // &quot;Identifier&quot;
console.log(name); // &quot;foo&quot;
console.log(value); // true</code></pre><h2>&#x8D4B;&#x503C;&#x7ED9;&#x4E0D;&#x540C;&#x7684;&#x672C;&#x5730;&#x53D8;&#x91CF;&#x540D;</h2><pre><code>let node = {
    type: &quot;Identifier&quot;,
    name: &quot;foo&quot;
};
//&#x8BFB;&#x53D6;&#x540D;&#x4E3A;  type  &#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x628A;&#x5B83;&#x7684;&#x503C;&#x5B58;&#x50A8;&#x5728;&#x53D8;&#x91CF;  localType  &#x4E0A;
let { type: localType, name: localName } = node;
console.log(localType); // &quot;Identifier&quot;
console.log(localName); // &quot;foo&quot;</code></pre><p>&#x4E5F;&#x53EF;&#x4EE5;&#x7ED9;&#x53D8;&#x91CF;&#x522B;&#x540D;&#x6DFB;&#x52A0;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x4F9D;&#x7136;&#x662F;&#x5728;&#x672C;&#x5730;&#x53D8;&#x91CF;&#x540D;&#x79F0;&#x540E;&#x6DFB;&#x52A0;&#x7B49;&#x53F7;&#x4E0E;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><pre><code>let node = {
    type: &quot;Identifier&quot;
};
//&#x8BE5;&#x8BED;&#x6CD5;&#x5B9E;&#x9645;&#x4E0A;&#x4E0E;&#x4F20;&#x7EDF;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;&#x8BED;&#x6CD5;&#x76F8;&#x53CD;&#xFF0C;&#x4F20;&#x7EDF;&#x8BED;&#x6CD5;&#x5C06;&#x540D;&#x79F0;&#x653E;&#x5728;&#x5192;&#x53F7;&#x5DE6;&#x8FB9;&#x3001;&#x503C;&#x653E;&#x5728;&#x5192;&#x53F7;&#x53F3;&#x8FB9;&#xFF1B;&#x800C;&#x5728;&#x672C;&#x4F8B;&#x4E2D;&#xFF0C;&#x5219;&#x662F;&#x540D;&#x79F0;&#x5728;&#x53F3;&#x8FB9;&#xFF0C;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x503C;&#x8BFB;&#x53D6;&#x7684;&#x4F4D;&#x7F6E;&#x5219;&#x88AB;&#x653E;&#x5728;&#x4E86;&#x5DE6;&#x8FB9;&#x3002;
let { type: localType, name: localName = &quot;bar&quot; } = node;
console.log(localType); // &quot;Identifier&quot;
console.log(localName); // &quot;bar&quot;</code></pre><h2>&#x5D4C;&#x5957;&#x7684;&#x5BF9;&#x8C61;&#x89E3;&#x6784;</h2><p>&#x4F7F;&#x7528;&#x7C7B;&#x4F3C;&#x4E8E;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x6DF1;&#x5165;&#x5230;&#x5D4C;&#x5957;&#x7684;&#x5BF9;&#x8C61;&#x7ED3;&#x6784;&#x4E2D;&#x53BB;&#x63D0;&#x53D6;&#x4F60;&#x60F3;&#x8981;&#x7684;&#x6570;&#x636E;:</p><pre><code>let node = {
    type: &quot;Identifier&quot;,
    name: &quot;foo&quot;,
    loc: {
        start: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
            column: 4
        }
    }
};
//&#x6BCF;&#x5F53;&#x6709;&#x4E00;&#x4E2A;&#x5192;&#x53F7;&#x5728;&#x89E3;&#x6784;&#x6A21;&#x5F0F;&#x4E2D;&#x51FA;&#x73B0;&#xFF0C;&#x5C31;&#x610F;&#x5473;&#x7740;&#x5192;&#x53F7;&#x4E4B;&#x524D;&#x7684;&#x6807;&#x8BC6;&#x7B26;&#x4EE3;&#x8868;&#x9700;&#x8981;&#x68C0;&#x67E5;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x800C;&#x5192;&#x53F7;&#x53F3;&#x4FA7;&#x5219;&#x662F;&#x8D4B;&#x503C;&#x7684;&#x76EE;&#x6807;&#x3002;&#x5F53;&#x5192;&#x53F7;&#x53F3;&#x4FA7;&#x5B58;&#x5728;&#x82B1;&#x62EC;&#x53F7;&#x65F6;&#xFF0C;&#x8868;&#x793A;&#x76EE;&#x6807;&#x88AB;&#x5D4C;&#x5957;&#x5728;&#x5BF9;&#x8C61;&#x7684;&#x66F4;&#x6DF1;&#x4E00;&#x5C42;&#x4E2D;&#x3002;
let { loc: { start }} = node;
console.log(start.line); // 1
console.log(start.column); // 1</code></pre><p>&#x5728;&#x5BF9;&#x8C61;&#x7684;&#x5D4C;&#x5957;&#x89E3;&#x6784;&#x4E2D;&#x540C;&#x6837;&#x80FD;&#x4E3A;&#x672C;&#x5730;&#x53D8;&#x91CF;&#x4F7F;&#x7528;&#x4E0D;&#x540C;&#x7684;&#x540D;&#x79F0;&#xFF1A;</p><pre><code>let node = {
    type: &quot;Identifier&quot;,
    name: &quot;foo&quot;,
    loc: {
        start: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
                column: 4
       }
    }
};
// &#x63D0;&#x53D6; node.loc.start
let { loc: { start: localStart }} = node;
console.log(localStart.line); // 1
console.log(localStart.column); // 1</code></pre><h1>&#x6570;&#x7EC4;&#x89E3;&#x6784;</h1><h2>&#x7ED3;&#x6784;&#x8D4B;&#x503C;</h2><ul><li>&#x57FA;&#x672C;</li></ul><pre><code>let colors = [ &quot;red&quot;, &quot;green&quot;, &quot;blue&quot; ];
let [ firstColor, secondColor ] = colors;
console.log(firstColor); // &quot;red&quot;
console.log(secondColor); // &quot;green&quot;</code></pre><ul><li>&#x5FFD;&#x7565;&#x4E00;&#x4E9B;&#x9009;&#x9879;</li></ul><pre><code>let colors = [ &quot;red&quot;, &quot;green&quot;, &quot;blue&quot; ];
let [ , , thirdColor ] = colors;
console.log(thirdColor); // &quot;blue&quot;</code></pre><ul><li>&#x91CD;&#x65B0;&#x8D4B;&#x503C;</li></ul><pre><code>let colors = [ &quot;red&quot;, &quot;green&quot;, &quot;blue&quot; ],
firstColor = &quot;black&quot;,
secondColor = &quot;purple&quot;;
[ firstColor, secondColor ] = colors;
console.log(firstColor); // &quot;red&quot;
console.log(secondColor); // &quot;green&quot;</code></pre><h2>&#x9ED8;&#x8BA4;&#x503C;</h2><p>&#x6570;&#x7EC4;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x540C;&#x6837;&#x5141;&#x8BB8;&#x5728;&#x6570;&#x7EC4;&#x4EFB;&#x610F;&#x4F4D;&#x7F6E;&#x6307;&#x5B9A;&#x9ED8;&#x8BA4;&#x503C;&#x3002;&#x5F53;&#x6307;&#x5B9A;&#x4F4D;&#x7F6E;&#x7684;&#x9879;&#x4E0D;&#x5B58;&#x5728;&#x3001;&#x6216;&#x5176;&#x503C;&#x4E3A;undefined &#xFF0C;&#x90A3;&#x4E48;&#x8BE5;&#x9ED8;&#x8BA4;&#x503C;&#x5C31;&#x4F1A;&#x88AB;&#x4F7F;&#x7528;:</p><pre><code>let colors = [ &quot;red&quot; ];
let [ firstColor, secondColor = &quot;green&quot; ] = colors;
console.log(firstColor); // &quot;red&quot;
console.log(secondColor); // &quot;green&quot;</code></pre><h2>&#x5D4C;&#x5957;&#x7684;&#x89E3;&#x6784;</h2><p>&#x5728;&#x6574;&#x4E2A;&#x89E3;&#x6784;&#x6A21;&#x5F0F;&#x4E2D;&#x63D2;&#x5165;&#x53E6;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x6A21;&#x5F0F;&#xFF0C;&#x89E3;&#x6784;&#x64CD;&#x4F5C;&#x5C31;&#x4F1A;&#x4E0B;&#x884C;&#x5230;&#x5D4C;&#x5957;&#x7684;&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x5C31;&#x50CF;&#x8FD9;&#x6837;&#xFF1A;</p><pre><code>let colors = [ &quot;red&quot;, [ &quot;green&quot;, &quot;lightgreen&quot; ], &quot;blue&quot; ];
// &#x968F;&#x540E;
let [ firstColor, [ secondColor ] ] = colors;
console.log(firstColor); // &quot;red&quot;
console.log(secondColor); // &quot;green&quot;</code></pre><h2>&#x5269;&#x4F59;&#x9879;</h2><p>&#x6570;&#x7EC4;&#x89E3;&#x6784;&#x6709;&#x4E2A;&#x540D;&#x4E3A;&#x5269;&#x4F59;&#x9879;&#xFF08; rest items &#xFF09;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x5B83;&#x4F7F;&#x7528; ... &#x8BED;&#x6CD5;&#x6765;&#x5C06;&#x5269;&#x4F59;&#x7684;&#x9879;&#x76EE;&#x8D4B;&#x503C;&#x7ED9;&#x4E00;&#x4E2A;&#x6307;&#x5B9A;&#x7684;&#x53D8;&#x91CF;:<br>&#x4E09;&#x4E2A;&#x70B9;&#x7684;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x5FC5;&#x987B;&#x653E;&#x5728;&#x6240;&#x6709;&#x89E3;&#x6784;&#x5143;&#x7D20;&#x7684;&#x6700;&#x672B;&#x5C3E;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#x3002;</p><pre><code>let colors = [ &quot;red&quot;, &quot;green&quot;, &quot;blue&quot; ];
let [ firstColor, ...restColors ] = colors;
console.log(firstColor); // &quot;red&quot;
console.log(restColors.length); // 2
console.log(restColors[0]); // &quot;green&quot;
console.log(restColors[1]); // &quot;blue&quot;</code></pre><p>&#x4E5F;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x6570;&#x7EC4;&#x7684;&#x514B;&#x9686;&#x64CD;&#x4F5C;&#xFF1A;</p><pre><code>/ &#x5728; ES5 &#x4E2D;&#x514B;&#x9686;&#x6570;&#x7EC4;
var colors = [ &quot;red&quot;, &quot;green&quot;, &quot;blue&quot; ];
var clonedColors = colors.concat();
console.log(clonedColors); //&quot;[red,green,blue]&quot;

// &#x5728; ES6 &#x4E2D;&#x514B;&#x9686;&#x6570;&#x7EC4;
let colors = [ &quot;red&quot;, &quot;green&quot;, &quot;blue&quot; ];
let [ ...clonedColors ] = colors;
console.log(clonedColors); //&quot;[red,green,blue]&quot;</code></pre><h1>&#x6DF7;&#x5408;&#x89E3;&#x6784;</h1><p>&#x6DF7;&#x5408;&#x89E3;&#x6784;&#x6307;&#x7684;&#x662F;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;&#x6DF7;&#x5408;&#x8D77;&#x6765;&#xFF0C;&#x6267;&#x884C;&#x89E3;&#x6784;&#x64CD;&#x4F5C;</p><pre><code>let node = {
    type: &quot;Identifier&quot;,
    name: &quot;foo&quot;,
    loc: {
        start: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
            column: 4
        }
    },
    range: [0, 3]
};
let {
loc: { start },
range: [ startIndex ]
} = node;
console.log(start.line); // 1
console.log(start.column); // 1
console.log(startIndex); // 0</code></pre><h1>&#x53C2;&#x6570;&#x89E3;&#x6784;</h1><p>&#x539F;&#x51FD;&#x6570;&#x5199;&#x6CD5;&#xFF1A;</p><pre><code>// options &#x4E0A;&#x7684;&#x5C5E;&#x6027;&#x8868;&#x793A;&#x9644;&#x52A0;&#x53C2;&#x6570;
function setCookie(name, value, options) {
    options = options || {};
    let secure = options.secure,
    path = options.path,
    domain = options.domain,
    expires = options.expires;
// &#x8BBE;&#x7F6E; cookie &#x7684;&#x4EE3;&#x7801;
}
// &#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x6620;&#x5C04;&#x5230; options
setCookie(&quot;type&quot;, &quot;js&quot;, {
    secure: true,
    expires: 60000
});</code></pre><p>&#x95EE;&#x9898;&#xFF1A;&#x65E0;&#x6CD5;&#x4EC5;&#x901A;&#x8FC7;&#x67E5;&#x770B;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x5C31;&#x5224;&#x65AD;&#x51FA;&#x51FD;&#x6570;&#x6240;&#x671F;&#x671B;&#x7684;&#x8F93;&#x5165;&#xFF0C;&#x5FC5;&#x987B;&#x9605;&#x8BFB;&#x51FD;&#x6570;&#x4F53;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x91CD;&#x5199;&#x51FD;&#x6570;&#xFF1A;</p><pre><code>function setCookie(name, value, { secure, path, domain, expires }) {
// &#x8BBE;&#x7F6E; cookie &#x7684;&#x4EE3;&#x7801;
}
setCookie(&quot;type&quot;, &quot;js&quot;, {
    secure: true,
    expires: 60000
});</code></pre><h2>&#x89E3;&#x6784;&#x7684;&#x53C2;&#x6570;&#x662F;&#x5FC5;&#x9700;&#x7684;</h2><p>&#x53C2;&#x6570;&#x89E3;&#x6784;&#x6709;&#x4E00;&#x4E2A;&#x602A;&#x5F02;&#x70B9;&#xFF1A;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x65F6;&#x672A;&#x7ED9;&#x53C2;&#x6570;&#x89E3;&#x6784;&#x4F20;&#x503C;&#x4F1A;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#xFF1A;</p><pre><code>// &#x51FA;&#x9519;&#xFF01;
setCookie(&quot;type&quot;, &quot;js&quot;);</code></pre><p>&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5199;&#x907F;&#x514D;&#x9519;&#x8BEF;&#xFF1A;</p><pre><code>function setCookie(name, value, { secure, path, domain, expires } = {}) {
// ...
}</code></pre><h2>&#x53C2;&#x6570;&#x89E3;&#x6784;&#x7684;&#x9ED8;&#x8BA4;&#x503C;</h2><pre><code>function setCookie(name, value,
{
    secure = false,
    path = &quot;/&quot;,
    domain = &quot;example.com&quot;,
    expires = new Date(Date.now() + 360000000)
} = {}
) {
// ...
}</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解ES6笔记（五）解构：使访问数据更便捷

## 原文链接
[https://segmentfault.com/a/1190000016109498](https://segmentfault.com/a/1190000016109498)

