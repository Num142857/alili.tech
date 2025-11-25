---
title: 'san.parseExpr 源码学习' 
date: 2018-11-27 2:30:13
hidden: true
slug: urflhyorg8
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x535A;&#x5BA2;&#x6E90;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/LeuisKen/leuisken.github.io/issues/7" rel="nofollow noreferrer" target="_blank">https://github.com/LeuisKen/l...</a><br>&#x76F8;&#x5173;&#x8BC4;&#x8BBA;&#x8FD8;&#x8BF7;&#x5230; issue &#x4E0B;&#x3002;</blockquote><h2 id="articleHeader0">&#x65B9;&#x6CD5;&#x8BF4;&#x660E;</h2><p><a href="https://baidu.github.io/san/doc/main-members/#parseExpr" rel="nofollow noreferrer" target="_blank">san.parseExpr</a>&#x662F;<a href="https://baidu.github.io/san/" rel="nofollow noreferrer" target="_blank">San</a>&#x4E2D;&#x4E3B;&#x6A21;&#x5757;&#x4E0B;&#x7684;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x3002;&#x7528;&#x4E8E;&#x5C06;&#x6E90;&#x5B57;&#x7B26;&#x4E32;&#x89E3;&#x6790;&#x6210;<a href="https://github.com/baidu/san/blob/master/doc/anode.md#user-content-%E8%A1%A8%E8%BE%BE%E5%BC%8F" rel="nofollow noreferrer" target="_blank">&#x8868;&#x8FBE;&#x5F0F;&#x5BF9;&#x8C61;</a>&#x3002;&#x8BE5;&#x65B9;&#x6CD5;&#x548C;<a href="https://baidu.github.io/san/doc/main-members/#evalExpr" rel="nofollow noreferrer" target="_blank">san.evalExpr</a>&#x662F;&#x4E00;&#x5BF9;&#xFF0C;&#x540E;&#x8005;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x5BF9;&#x8C61;&#x548C;&#x4E00;&#x4E2A;<a href="https://baidu.github.io/san/doc/main-members/#Data" rel="nofollow noreferrer" target="_blank">san.Data</a>&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x7528;&#x4E8E;&#x5BF9;&#x8868;&#x8FBE;&#x5F0F;&#x8FDB;&#x884C;&#x6C42;&#x503C;&#x3002;&#x5982;&#x4E0B;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x89E3;&#x6790;&#x8868;&#x8FBE;&#x5F0F;
 *
 * @param {string} source &#x6E90;&#x7801;
 * @return {Object} &#x8868;&#x8FBE;&#x5F0F;&#x5BF9;&#x8C61;
 */
function parseExpr(source) {}

/**
 * &#x8BA1;&#x7B97;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x503C;
 *
 * @param {Object} expr &#x8868;&#x8FBE;&#x5F0F;&#x5BF9;&#x8C61;
 * @param {Data} data &#x6570;&#x636E;&#x5BB9;&#x5668;&#x5BF9;&#x8C61;
 * @param {Component=} owner &#x6240;&#x5C5E;&#x7EC4;&#x4EF6;&#x73AF;&#x5883;&#xFF0C;&#x4F9B; filter &#x4F7F;&#x7528;
 * @return {*}
 */
function evalExpr(expr, data, owner) {}

san.evalExpr(san.parseExpr(&apos;1+1&apos;), new san.Data());     // 2
san.evalExpr(san.parseExpr(&apos;1+num&apos;), new san.Data({
    num: 3
}));        // 4" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x89E3;&#x6790;&#x8868;&#x8FBE;&#x5F0F;
 *
 * @param {string} source &#x6E90;&#x7801;
 * @return {Object} &#x8868;&#x8FBE;&#x5F0F;&#x5BF9;&#x8C61;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseExpr</span>(<span class="hljs-params">source</span>) </span>{}

<span class="hljs-comment">/**
 * &#x8BA1;&#x7B97;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x503C;
 *
 * @param {Object} expr &#x8868;&#x8FBE;&#x5F0F;&#x5BF9;&#x8C61;
 * @param {Data} data &#x6570;&#x636E;&#x5BB9;&#x5668;&#x5BF9;&#x8C61;
 * @param {Component=} owner &#x6240;&#x5C5E;&#x7EC4;&#x4EF6;&#x73AF;&#x5883;&#xFF0C;&#x4F9B; filter &#x4F7F;&#x7528;
 * @return {*}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">evalExpr</span>(<span class="hljs-params">expr, data, owner</span>) </span>{}

san.evalExpr(san.parseExpr(<span class="hljs-string">&apos;1+1&apos;</span>), <span class="hljs-keyword">new</span> san.Data());     <span class="hljs-comment">// 2</span>
san.evalExpr(san.parseExpr(<span class="hljs-string">&apos;1+num&apos;</span>), <span class="hljs-keyword">new</span> san.Data({
    <span class="hljs-attr">num</span>: <span class="hljs-number">3</span>
}));        <span class="hljs-comment">// 4</span></code></pre><p>&#x5355;&#x72EC;&#x62FF;&#x51FA;<code>parseExpr</code>&#x6765;&#x5206;&#x6790;&#xFF0C;&#x5176;&#x6839;&#x636E;&#x6E90;&#x5B57;&#x7B26;&#x4E32;&#x751F;&#x6210;&#x8868;&#x8FBE;&#x5F0F;&#x5BF9;&#x8C61;&#xFF0C;&#x4ECE;San&#x7684;<a href="https://github.com/baidu/san/blob/master/doc/anode.md#user-content-%E8%A1%A8%E8%BE%BE%E5%BC%8F" rel="nofollow noreferrer" target="_blank">&#x8868;&#x8FBE;&#x5F0F;&#x5BF9;&#x8C61;</a>&#x6587;&#x6863;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;San&#x652F;&#x6301;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x7C7B;&#x578B;&#x4EE5;&#x53CA;&#x8FD9;&#x4E9B;&#x8868;&#x8FBE;&#x5F0F;&#x5BF9;&#x8C61;&#x7684;&#x7ED3;&#x6784;&#x3002;&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x8BB0;&#x5F55;&#x4E00;&#x4E0B;&#xFF0C;<code>parseExpr</code>&#x9700;&#x8981;&#x89E3;&#x6790;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x90FD;&#x6709;&#x54EA;&#x4E9B;&#xFF1A;</p><ul><li>TertiaryExpr&#xFF1A;&#x4E09;&#x5143;&#x8868;&#x8FBE;&#x5F0F;</li><li>LogicalORExpr&#xFF1A;&#x903B;&#x8F91;&#x6216;</li><li>LogicalANDExpr&#xFF1A;&#x903B;&#x8F91;&#x4E0E;</li><li>EqualityExpr&#xFF1A;&#x5224;&#x7B49;</li><li>RelationalExpr&#xFF1A;&#x5173;&#x7CFB;&#xFF08;&#x5927;&#x4E8E;&#x3001;&#x5C0F;&#x4E8E;&#x7B49;&#xFF09;</li><li>AdditiveExpr&#xFF1A;&#x52A0;&#x51CF;&#x6CD5;</li><li>MultiplicativeExpr&#xFF1A;&#x4E58;&#x9664;&#x6CD5;&#x3001;&#x53D6;&#x4F59;&#x8FD0;&#x7B97;</li><li>UnaryExpr&#xFF1A;&#x4E00;&#x5143;&#x8868;&#x8FBE;&#x5F0F;</li><li>ParenthesizedExpr&#xFF1A;&#x62EC;&#x53F7;&#x8868;&#x8FBE;&#x5F0F;</li></ul><p>&#x9664;&#x4E86;&#x4E0A;&#x8FF0;&#x8868;&#x793A;&#x8FD0;&#x7B97;&#x5173;&#x7CFB;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x8868;&#x793A;&#x6570;&#x636E;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>String&#xFF1A;&#x5B57;&#x7B26;&#x4E32;</li><li>Number&#xFF1A;&#x6570;&#x7EC4;</li><li>Boolean&#xFF1A;&#x5E03;&#x5C14;&#x503C;</li><li>ArrayLiteral&#xFF1A;&#x6570;&#x7EC4;&#x5B57;&#x9762;&#x91CF;</li><li>ObjectLiteral&#xFF1A;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;</li><li>Accessor&#xFF1A;&#x8BBF;&#x95EE;&#x5668;&#x8868;&#x8FBE;&#x5F0F;</li></ul><p>&#x7531;&#x4E8E;<code>Accessor</code>&#x5B58;&#x5728;&#x610F;&#x4E49;&#xFF0C;&#x662F;&#x4E3A;&#x4E86;&#x5728;<code>evalExpr</code>&#x9636;&#x6BB5;&#x4ECE;<code>Data</code>&#x5BF9;&#x8C61;&#x4E2D;&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x6211;&#x5C06;<code>Accessor</code>&#x5F52;&#x7C7B;&#x4E3A;&#x8868;&#x793A;&#x6570;&#x636E;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x3002;</p><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x4E86;&#x6240;&#x6709;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x7C7B;&#x578B;&#xFF0C;&#x90A3;&#x4E48;&#xFF0C;<code>parseExpr</code>&#x662F;&#x5982;&#x4F55;&#x4ECE;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#xFF0C;&#x89E3;&#x6790;&#x51FA;&#x8868;&#x8FBE;&#x5F0F;&#x5BF9;&#x8C61;&#x7684;&#x5462;&#xFF1F;</p><h2 id="articleHeader1">&#x5982;&#x4F55;&#x8BFB;&#x53D6;&#x5B57;&#x7B26;&#x4E32;</h2><p><code>parseExpr</code>&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;<a href="https://github.com/baidu/san/blob/master/src/parser/parse-expr.js" rel="nofollow noreferrer" target="_blank">src/parser/parse-expr.js</a>&#x4E2D;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5176;&#x4F9D;&#x8D56;&#x4E86;&#x4E00;&#x4E2A;<a href="https://github.com/baidu/san/blob/master/src/parser/walker.js" rel="nofollow noreferrer" target="_blank">Walker</a>&#x7C7B;&#xFF0C;&#x6CE8;&#x91CA;&#x4E2D;&#x7684;&#x8BF4;&#x660E;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x6E90;&#x7801;&#x8BFB;&#x53D6;&#x7C7B;&#x3002;</p><p><code>Walker</code>&#x7C7B;&#x5305;&#x542B;&#x4EE5;&#x4E0B;&#x5185;&#x5BB9;&#xFF1A;</p><h3 id="articleHeader2">&#x5C5E;&#x6027;&#xFF1A;</h3><ul><li><code>this.source</code>&#xFF1A;&#x4FDD;&#x5B58;&#x8981;&#x8BFB;&#x53D6;&#x7684;&#x6E90;&#x5B57;&#x7B26;&#x4E32;</li><li><code>this.len</code>&#xFF1A;&#x4FDD;&#x5B58;&#x6E90;&#x5B57;&#x7B26;&#x4E32;&#x957F;&#x5EA6;</li><li><code>this.index</code>&#xFF1A;&#x4FDD;&#x5B58;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#x8BFB;&#x53D6;&#x5B57;&#x7B26;&#x7684;&#x4F4D;&#x7F6E;</li></ul><h3 id="articleHeader3">&#x65B9;&#x6CD5;&#xFF1A;</h3><ul><li><code>currentCode</code>&#x65B9;&#x6CD5;&#xFF1A;&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x8BFB;&#x53D6;&#x5B57;&#x7B26;&#x7684; charCode</li><li><code>charCode</code>&#x65B9;&#x6CD5;&#xFF1A;&#x8FD4;&#x56DE;&#x6307;&#x5B9A;&#x4F4D;&#x7F6E;&#x5B57;&#x7B26;&#x7684; charCode</li><li><code>cut</code>&#x65B9;&#x6CD5;&#xFF1A;&#x6839;&#x636E;&#x6307;&#x5B9A;&#x8D77;&#x59CB;&#x548C;&#x7ED3;&#x675F;&#x4F4D;&#x7F6E;&#x8FD4;&#x56DE;&#x5B57;&#x7B26;&#x4E32;&#x7247;&#x6BB5;</li><li><code>go</code>&#x65B9;&#x6CD5;&#xFF1A;&#x5C06;<code>this.index</code>&#x589E;&#x52A0;&#x7ED9;&#x5B9A;&#x6570;&#x503C;</li><li><code>nextCode</code>&#x65B9;&#x6CD5;&#xFF1A;&#x8BFB;&#x53D6;&#x4E0B;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x5E76;&#x8FD4;&#x56DE;&#x5B83;&#x7684; charCode</li></ul><h4>goUntil &#x65B9;&#x6CD5;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x5411;&#x524D;&#x8BFB;&#x53D6;&#x5B57;&#x7B26;&#xFF0C;&#x76F4;&#x5230;&#x9047;&#x5230;&#x6307;&#x5B9A;&#x5B57;&#x7B26;&#x518D;&#x505C;&#x6B62;
 * &#x672A;&#x6307;&#x5B9A;&#x5B57;&#x7B26;&#x65F6;&#xFF0C;&#x5F53;&#x9047;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x683C;&#x3001;&#x5236;&#x8868;&#x7B26;&#x7684;&#x5B57;&#x7B26;&#x505C;&#x6B62;
 *
 * @param {number=} charCode &#x6307;&#x5B9A;&#x5B57;&#x7B26;&#x7684;code
 * @return {boolean} &#x5F53;&#x6307;&#x5B9A;&#x5B57;&#x7B26;&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x662F;&#x5426;&#x78B0;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x5B57;&#x7B26;
 */
Walker.prototype.goUntil = function (charCode) {
    var code;
    while (this.index &lt; this.len &amp;&amp; (code = this.currentCode())) {
        switch (code) {
            // &#x7A7A;&#x683C; space
            case 32:
            // &#x5236;&#x8868;&#x7B26; tab
            case 9:
                this.index++;
                break;
            default:
                if (code === charCode) {
                    // &#x627E;&#x5230;&#x4E86;
                    this.index++;
                    return 1;
                }
                // &#x6CA1;&#x627E;&#x5230;
                return;
        }
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x5411;&#x524D;&#x8BFB;&#x53D6;&#x5B57;&#x7B26;&#xFF0C;&#x76F4;&#x5230;&#x9047;&#x5230;&#x6307;&#x5B9A;&#x5B57;&#x7B26;&#x518D;&#x505C;&#x6B62;
 * &#x672A;&#x6307;&#x5B9A;&#x5B57;&#x7B26;&#x65F6;&#xFF0C;&#x5F53;&#x9047;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x683C;&#x3001;&#x5236;&#x8868;&#x7B26;&#x7684;&#x5B57;&#x7B26;&#x505C;&#x6B62;
 *
 * @param {number=} charCode &#x6307;&#x5B9A;&#x5B57;&#x7B26;&#x7684;code
 * @return {boolean} &#x5F53;&#x6307;&#x5B9A;&#x5B57;&#x7B26;&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x662F;&#x5426;&#x78B0;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x5B57;&#x7B26;
 */</span>
Walker.prototype.goUntil = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">charCode</span>) </span>{
    <span class="hljs-keyword">var</span> code;
    <span class="hljs-keyword">while</span> (<span class="hljs-keyword">this</span>.index &lt; <span class="hljs-keyword">this</span>.len &amp;&amp; (code = <span class="hljs-keyword">this</span>.currentCode())) {
        <span class="hljs-keyword">switch</span> (code) {
            <span class="hljs-comment">// &#x7A7A;&#x683C; space</span>
            <span class="hljs-keyword">case</span> <span class="hljs-number">32</span>:
            <span class="hljs-comment">// &#x5236;&#x8868;&#x7B26; tab</span>
            <span class="hljs-keyword">case</span> <span class="hljs-number">9</span>:
                <span class="hljs-keyword">this</span>.index++;
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">default</span>:
                <span class="hljs-keyword">if</span> (code === charCode) {
                    <span class="hljs-comment">// &#x627E;&#x5230;&#x4E86;</span>
                    <span class="hljs-keyword">this</span>.index++;
                    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
                }
                <span class="hljs-comment">// &#x6CA1;&#x627E;&#x5230;</span>
                <span class="hljs-keyword">return</span>;
        }
    }
};</code></pre><h4>match &#x65B9;&#x6CD5;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x5411;&#x524D;&#x8BFB;&#x53D6;&#x7B26;&#x5408;&#x89C4;&#x5219;&#x7684;&#x5B57;&#x7B26;&#x7247;&#x6BB5;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x89C4;&#x5219;&#x5339;&#x914D;&#x7ED3;&#x679C;
 *
 * @param {RegExp} reg &#x5B57;&#x7B26;&#x7247;&#x6BB5;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;
 * @param {boolean} isMatchStart &#x662F;&#x5426;&#x5FC5;&#x987B;&#x5339;&#x914D;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;
 * @return {Array?}
 */
Walker.prototype.match = function (reg, isMatchStart) {
    reg.lastIndex = this.index;

    var match = reg.exec(this.source);
    /**
     * &#x8FD9;&#x91CC;&#x662F;&#x6E90;&#x7801;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x7B80;&#x6D01;&#x4F46;&#x662F;&#x6709;&#x70B9;&#x6666;&#x6DA9;&#xFF0C;&#x540E;&#x9762;&#x6211;&#x628A;&#x903B;&#x8F91;&#x8FD0;&#x7B97;&#x7B26;&#x62C6;&#x6210;&#x4E86; if else&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x597D;&#x7406;&#x89E3;&#x4E00;&#x4E9B;
    if (match &amp;&amp; (!isMatchStart || this.index === match.index)) {
        this.index = reg.lastIndex;
        return match;
    }
    */
    if (match) {
        // &#x5982;&#x679C;&#x662F;&#x5FC5;&#x987B;&#x5339;&#x914D;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;
        // &#x8FD9;&#x4E2A;&#x6807;&#x8BB0;&#x662F; 3.5.11 &#x7684;&#x65F6;&#x5019;&#x52A0;&#x4E0A;&#x7684;&#xFF0C;changelog &#x8868;&#x8FF0;&#x4E3A;&#xFF1A;
        // &#x3010;&#x4F18;&#x5316;&#x3011;- &#x5728; dev &#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x589E;&#x52A0;&#x4E00;&#x4E9B;&#x8868;&#x8FBE;&#x5F0F;&#x89E3;&#x6790;&#x9519;&#x8BEF;&#x7684;&#x63D0;&#x793A;
        if (isMatchStart) {
            // &#x5224;&#x65AD;&#x5F53;&#x524D;&#x8BFB;&#x53D6;&#x5B57;&#x7B26;&#x7684; index&#xFF0C;&#x662F;&#x5426;&#x548C;&#x5339;&#x914D;&#x7ED3;&#x679C;&#x7B2C;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x7684; index &#x76F8;&#x7B49;
            if (this.index === match.index) {
                this.index = reg.lastIndex;
                return match;
            }
        }
        // &#x4E0D;&#x5FC5;&#x987B;&#x5339;&#x914D;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;
        else {
            this.index = reg.lastIndex;
            return match;
        }
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x5411;&#x524D;&#x8BFB;&#x53D6;&#x7B26;&#x5408;&#x89C4;&#x5219;&#x7684;&#x5B57;&#x7B26;&#x7247;&#x6BB5;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x89C4;&#x5219;&#x5339;&#x914D;&#x7ED3;&#x679C;
 *
 * @param {RegExp} reg &#x5B57;&#x7B26;&#x7247;&#x6BB5;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;
 * @param {boolean} isMatchStart &#x662F;&#x5426;&#x5FC5;&#x987B;&#x5339;&#x914D;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;
 * @return {Array?}
 */</span>
Walker.prototype.match = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">reg, isMatchStart</span>) </span>{
    reg.lastIndex = <span class="hljs-keyword">this</span>.index;

    <span class="hljs-keyword">var</span> match = reg.exec(<span class="hljs-keyword">this</span>.source);
    <span class="hljs-comment">/**
     * &#x8FD9;&#x91CC;&#x662F;&#x6E90;&#x7801;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x7B80;&#x6D01;&#x4F46;&#x662F;&#x6709;&#x70B9;&#x6666;&#x6DA9;&#xFF0C;&#x540E;&#x9762;&#x6211;&#x628A;&#x903B;&#x8F91;&#x8FD0;&#x7B97;&#x7B26;&#x62C6;&#x6210;&#x4E86; if else&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x597D;&#x7406;&#x89E3;&#x4E00;&#x4E9B;
    if (match &amp;&amp; (!isMatchStart || this.index === match.index)) {
        this.index = reg.lastIndex;
        return match;
    }
    */</span>
    <span class="hljs-keyword">if</span> (match) {
        <span class="hljs-comment">// &#x5982;&#x679C;&#x662F;&#x5FC5;&#x987B;&#x5339;&#x914D;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;</span>
        <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x6807;&#x8BB0;&#x662F; 3.5.11 &#x7684;&#x65F6;&#x5019;&#x52A0;&#x4E0A;&#x7684;&#xFF0C;changelog &#x8868;&#x8FF0;&#x4E3A;&#xFF1A;</span>
        <span class="hljs-comment">// &#x3010;&#x4F18;&#x5316;&#x3011;- &#x5728; dev &#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x589E;&#x52A0;&#x4E00;&#x4E9B;&#x8868;&#x8FBE;&#x5F0F;&#x89E3;&#x6790;&#x9519;&#x8BEF;&#x7684;&#x63D0;&#x793A;</span>
        <span class="hljs-keyword">if</span> (isMatchStart) {
            <span class="hljs-comment">// &#x5224;&#x65AD;&#x5F53;&#x524D;&#x8BFB;&#x53D6;&#x5B57;&#x7B26;&#x7684; index&#xFF0C;&#x662F;&#x5426;&#x548C;&#x5339;&#x914D;&#x7ED3;&#x679C;&#x7B2C;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x7684; index &#x76F8;&#x7B49;</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index === match.index) {
                <span class="hljs-keyword">this</span>.index = reg.lastIndex;
                <span class="hljs-keyword">return</span> match;
            }
        }
        <span class="hljs-comment">// &#x4E0D;&#x5FC5;&#x987B;&#x5339;&#x914D;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;</span>
        <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.index = reg.lastIndex;
            <span class="hljs-keyword">return</span> match;
        }
    }
};</code></pre><h2 id="articleHeader4">&#x5982;&#x4F55;&#x5904;&#x7406;&#x8FD0;&#x7B97;&#x7B26;&#x7684;&#x4F18;&#x5148;&#x7EA7;</h2><p>&#x5728;&#x521D;&#x770B;<code>parseExpr</code>&#x5B9E;&#x73B0;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x56F0;&#x6270;&#x6211;&#x7684;&#x96BE;&#x9898;&#x3002;&#x5B66;&#x4E60;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x770B;&#x5230;<code>San</code>&#x6700;&#x5148;&#x662F;&#x5C06;&#x8868;&#x8FBE;&#x5F0F;&#x4E22;&#x7ED9;&#x4E00;&#x4E2A;&#x8BFB;&#x53D6;&#x4E09;&#x5143;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x91CC;&#x9762;&#x53BB;&#x8C03;&#x7528;&#x8BFB;&#x53D6;&#x903B;&#x8F91;&#x6216;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x903B;&#x8F91;&#x6216;&#x91CC;&#x9762;&#x8C03;&#x7528;&#x903B;&#x8F91;&#x4E0E;&#xFF0C;&#x903B;&#x8F91;&#x4E0E;&#x91CC;&#x9762;&#x8C03;&#x7528;&#x5224;&#x7B49;&#xFF0C;&#x5224;&#x7B49;&#x91CC;&#x9762;&#x8C03;&#x7528;&#x5173;&#x7CFB;&#x22EF;&#x22EF;&#x770B;&#x5F97;&#x6211;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x4E91;&#x91CC;&#x96FE;&#x91CC;&#x3002;&#x867D;&#x7136;&#x5927;&#x81F4;&#x80FD;&#x660E;&#x767D;&#x8FD9;&#x662F;&#x5728;&#x5904;&#x7406;&#x8FD0;&#x7B97;&#x4F18;&#x5148;&#x7EA7;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x89C9;&#x5F97;&#x80AF;&#x5B9A;&#x6709;&#x4E00;&#x4E2A;&#x66F4;&#x4E0A;&#x5C42;&#x7684;&#x6307;&#x5BFC;&#x601D;&#x60F3;&#x6765;&#x8BA9;<code>San</code>&#x9009;&#x62E9;&#x8FD9;&#x4E00;&#x65B9;&#x6848;&#x3002;</p><p>&#x4E3A;&#x4E86;&#x5BFB;&#x627E;&#x8FD9;&#x4E2A;&#x201C;&#x6307;&#x5BFC;&#x601D;&#x60F3;&#x201D;&#xFF0C;&#x6211;&#x8F6C;&#x5934;&#x53BB;&#x770B;&#x4E86;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x7684;&#x7F16;&#x8BD1;&#x539F;&#x7406;&#xFF0C;&#x5927;&#x81F4;&#x4E0A;&#x7406;&#x6E05;&#x4E86;&#x8FD9;&#x90E8;&#x5206;&#x601D;&#x8DEF;&#x3002;&#x8003;&#x8651;&#x5230;&#x6709;&#x4E9B;&#x540C;&#x5B66;&#x5E94;&#x8BE5;&#x4E5F;&#x548C;&#x6211;&#x4E00;&#x6837;&#x6CA1;&#x6709;&#x7CFB;&#x7EDF;&#x5730;&#x5B66;&#x4E60;&#x8FC7;&#x8FD9;&#x95E8;&#x8BFE;&#x7A0B;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x5728;&#x4E0B;&#x9762;&#x53D6;&#x300A;&#x7F16;&#x8BD1;&#x539F;&#x7406;&#x300B;&#x4E2D;&#x7684;&#x4F8B;&#x5B50;&#x6765;&#x4E88;&#x4EE5;&#x8BF4;&#x660E;&#xFF08;&#x4E0B;&#x6587;&#x5185;&#x5BB9;&#x5305;&#x542B;&#x4E86;&#x5F88;&#x591A;&#x5B9A;&#x4E49;&#x6027;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x4E14;&#x4E3A;&#x4E86;&#x4FDD;&#x8BC1;&#x4E25;&#x8C28;&#xFF0C;&#x5F88;&#x591A;&#x5B9A;&#x4E49;&#x90FD;&#x662F;&#x76F4;&#x63A5;&#x7167;&#x642C;&#x4E66;&#x4E0A;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x4F60;&#x5BF9;&#x8FD9;&#x90E8;&#x5206;&#x8DB3;&#x591F;&#x719F;&#x6089;&#xFF0C;&#x8DF3;&#x8FC7;&#x5373;&#x53EF;&#x3002;&#xFF09;</p><h3 id="articleHeader5">&#x4E0A;&#x4E0B;&#x6587;&#x65E0;&#x5173;&#x6587;&#x6CD5;&#x53CA;&#x5176;&#x6784;&#x6210;</h3><p>&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x8981;&#x89E3;&#x6790;&#x7684;<code>expr</code>&#x662F;&#x4E00;&#x4E2A;&#x5341;&#x4EE5;&#x5185;&#x7684;&#x56DB;&#x5219;&#x8FD0;&#x7B97;&#x7B97;&#x5F0F;&#xFF08;&#x7F16;&#x8BD1;&#x539F;&#x7406;&#x5C06;&#x5176;&#x89C6;&#x4E3A;&#x4E00;&#x79CD;&#x8BED;&#x8A00;&#xFF09;&#xFF0C;&#x5176;&#x5305;&#x62EC;&#x52A0;&#x51CF;&#x4E58;&#x9664;&#xFF08; +&#x3001;-&#x3001;*&#x3001;/ &#xFF09;&#x56DB;&#x5219;&#x8FD0;&#x7B97;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E00;&#x79CD;&#x53EB;&#x505A;&#x4EA7;&#x751F;&#x5F0F;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x6765;&#x8868;&#x793A;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x89E3;&#x6790;&#x89C4;&#x5219;&#x3002;&#x6709;&#x4E86;&#x4EA7;&#x751F;&#x5F0F;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#x4E00;&#x4E2A;&#x7B97;&#x5F0F;&#x7684;&#x89E3;&#x6790;&#x89C4;&#x5219;&#x8868;&#x8FBE;&#x6210;&#x5982;&#x4E0B;&#x5F62;&#x5F0F;&#xFF08;&#x8FD9;&#x4E00;&#x89E3;&#x6790;&#x8FC7;&#x7A0B;&#x88AB;&#x79F0;&#x4E3A;&#x8BCD;&#x6CD5;&#x5206;&#x6790;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="expr ---&gt; digit         // &#x8FD9;&#x91CC;&#x7684; digit &#x6307; 0,1,2,3...9 &#x8FD9;&#x5341;&#x4E2A;&#x6570;&#x5B57;
        | expr + expr   // &#x7AD6;&#x7EBF;&#xFF08;|&#xFF09;&#x8868;&#x793A;&#x6216;&#xFF0C;&#x8FD9;&#x4E00;&#x884C;&#x5B9A;&#x4E49;&#x4E86;&#x52A0;&#x6CD5;
        | expr - expr   // &#x51CF;&#x6CD5;
        | expr * expr   // &#x4E58;&#x6CD5;
        | expr / expr   // &#x9664;&#x6CD5;
        | (expr)        // &#x52A0;&#x62EC;&#x53F7;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-keyword">expr</span> ---&gt; digit         <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7684; digit &#x6307; 0,1,2,3...9 &#x8FD9;&#x5341;&#x4E2A;&#x6570;&#x5B57;</span>
        | <span class="hljs-keyword">expr</span> + <span class="hljs-keyword">expr</span>   <span class="hljs-comment">// &#x7AD6;&#x7EBF;&#xFF08;|&#xFF09;&#x8868;&#x793A;&#x6216;&#xFF0C;&#x8FD9;&#x4E00;&#x884C;&#x5B9A;&#x4E49;&#x4E86;&#x52A0;&#x6CD5;</span>
        | <span class="hljs-keyword">expr</span> - <span class="hljs-keyword">expr</span>   <span class="hljs-comment">// &#x51CF;&#x6CD5;</span>
        | <span class="hljs-keyword">expr</span> * <span class="hljs-keyword">expr</span>   <span class="hljs-comment">// &#x4E58;&#x6CD5;</span>
        | <span class="hljs-keyword">expr</span> / <span class="hljs-keyword">expr</span>   <span class="hljs-comment">// &#x9664;&#x6CD5;</span>
        | (<span class="hljs-keyword">expr</span>)        <span class="hljs-comment">// &#x52A0;&#x62EC;&#x53F7;</span></code></pre><p>&#x8FD9;&#x91CC;&#x4ECB;&#x7ECD;&#x51E0;&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;<code>digit</code>&#x548C;<code>+ - * / ()</code>&#x7B49;&#x7B26;&#x53F7;&#xFF0C;&#x88AB;&#x79F0;&#x4E3A;&#x7EC8;&#x7ED3;&#x7B26;&#x53F7;&#xFF0C;&#x8868;&#x793A;&#x8BED;&#x8A00;&#x4E2D;&#x4E0D;&#x53EF;&#x518D;&#x5206;&#x7684;&#x57FA;&#x672C;&#x7B26;&#x53F7;&#xFF1B;&#x800C;&#x50CF;<code>expr</code>&#x8FD9;&#x6837;&#x80FD;&#x591F;&#x7528;&#x4E8E;&#x8868;&#x793A;&#x7EC8;&#x7ED3;&#x7B26;&#x53F7;&#x5E8F;&#x5217;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x88AB;&#x79F0;&#x4E3A;&#x975E;&#x7EC8;&#x7ED3;&#x7B26;&#x53F7;&#x3002;</p><p>&#x6211;&#x4EEC;&#x90FD;&#x77E5;&#x9053;&#xFF0C;&#x5341;&#x4EE5;&#x5185;&#x7684;&#x56DB;&#x5219;&#x8FD0;&#x7B97;&#x7B97;&#x5F0F;&#x7684;&#x89E3;&#x6790;&#x662F;&#x4E0E;&#x4E0A;&#x4E0B;&#x6587;&#x65E0;&#x5173;&#x7684;&#x3002;&#x5728;&#x7F16;&#x8BD1;&#x539F;&#x7406;&#x4E2D;&#xFF0C;&#x5C06;&#x63CF;&#x8FF0;&#x8BED;&#x8A00;&#x6784;&#x9020;&#x7684;&#x5C42;&#x6B21;&#x5316;&#x8BED;&#x6CD5;&#x7ED3;&#x6784;&#x79F0;&#x4E3A;&#x201C;&#x6587;&#x6CD5;&#x201D;&#xFF08;grammar&#xFF09;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x5341;&#x4EE5;&#x5185;&#x7684;&#x56DB;&#x5219;&#x8FD0;&#x7B97;&#x7B97;&#x5F0F;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x201C;&#x4E0A;&#x4E0B;&#x6587;&#x65E0;&#x5173;&#x6587;&#x6CD5;&#x201D;&#xFF08;context-free grammar&#xFF09;&#x3002;&#x7F16;&#x8BD1;&#x539F;&#x7406;&#x4E2D;&#x5B9A;&#x4E49;&#x4E86;&#x4E0A;&#x4E0B;&#x6587;&#x65E0;&#x5173;&#x6587;&#x6CD5;&#x7531;&#x56DB;&#x4E2A;&#x5143;&#x7D20;&#x6784;&#x6210;&#xFF1A;</p><ul><li>&#x7EC8;&#x7ED3;&#x7B26;&#x53F7;&#x96C6;&#x5408;</li><li>&#x975E;&#x7EC8;&#x7ED3;&#x7B26;&#x53F7;&#x96C6;&#x5408;</li><li>&#x4EA7;&#x751F;&#x5F0F;&#x96C6;&#x5408;</li><li>&#x4E00;&#x4E2A;&#x6307;&#x5B9A;&#x7684;&#x975E;&#x7EC8;&#x7ED3;&#x7B26;&#x53F7;&#x4F5C;&#x4E3A;&#x5F00;&#x59CB;&#x7B26;&#x53F7;&#xFF08;&#x4E0A;&#x9762;&#x7684;expr&#xFF09;</li></ul><h3 id="articleHeader6">&#x8BED;&#x6CD5;&#x5206;&#x6790;&#x6811;</h3><p>&#x8BED;&#x6CD5;&#x5206;&#x6790;&#x6811;&#x662F;&#x4E00;&#x79CD;&#x56FE;&#x5F62;&#x8868;&#x793A;&#xFF0C;&#x4ED6;&#x5C55;&#x73B0;&#x4E86;&#x4ECE;&#x6587;&#x6CD5;&#x7684;&#x5F00;&#x59CB;&#x7B26;&#x53F7;&#x63A8;&#x5BFC;&#x51FA;&#x76F8;&#x5E94;&#x8BED;&#x8A00;&#x4E2D;&#x7684;&#x7EC8;&#x7ED3;&#x7B26;&#x53F7;&#x4E32;&#x7684;&#x8FC7;&#x7A0B;&#x3002;&#x4F8B;&#x5982;&#x4E00;&#x4E2A;&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x7B97;&#x5F0F;&#xFF1A;9 - 5 + 2&#xFF0C;&#x53EF;&#x4EE5;&#x8868;&#x793A;&#x6210;&#x5982;&#x4E0B;&#x7684;&#x8BED;&#x6CD5;&#x5206;&#x6790;&#x6811;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            expr
    expr      +     expr
expr  -  expr      digit
digit    digit       2
  9        5" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code>            <span class="hljs-keyword">expr</span>
    <span class="hljs-keyword">expr</span>      +     <span class="hljs-keyword">expr</span>
<span class="hljs-keyword">expr</span>  -  <span class="hljs-keyword">expr</span>      digit
digit    digit       <span class="hljs-number">2</span>
  <span class="hljs-number">9</span>        <span class="hljs-number">5</span></code></pre><h3 id="articleHeader7">&#x4E8C;&#x4E49;&#x6027;&#x53CA;&#x5176;&#x6D88;&#x9664;</h3><p>&#x5355;&#x7EAF;&#x4ECE; 9 - 5 + 2 &#x51FA;&#x53D1;&#x53BB;&#x753B;&#x8BED;&#x6CD5;&#x5206;&#x6790;&#x6811;&#xFF0C;&#x8FD8;&#x80FD;&#x5F97;&#x5230;&#x53E6;&#x4E00;&#x79CD;&#x7ED3;&#x679C;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            expr
expr         -          expr
digit            expr     +     expr
  9             digit           digit
                  5               2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code>            <span class="hljs-keyword">expr</span>
<span class="hljs-keyword">expr</span>         -          <span class="hljs-keyword">expr</span>
digit            <span class="hljs-keyword">expr</span>     +     <span class="hljs-keyword">expr</span>
  <span class="hljs-number">9</span>             digit           digit
                  <span class="hljs-number">5</span>               <span class="hljs-number">2</span></code></pre><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x4ECE;&#x4E0B;&#x5F80;&#x4E0A;&#x5BF9;&#x8BED;&#x6CD5;&#x5206;&#x6790;&#x6811;&#x8FDB;&#x884C;&#x8BA1;&#x7B97;&#xFF0C;&#x524D;&#x4E00;&#x68F5;&#x6811;&#x5148;&#x8BA1;&#x7B97; 9 - 5 &#x5F97; 4&#xFF0C;&#x7136;&#x540E; 4 + 2 &#x5F97; 6&#xFF0C;&#x4F46;&#x540E;&#x4E00;&#x68F5;&#x6811;&#x7684;&#x7ED3;&#x679C;&#x5219;&#x662F; 5 + 2 &#x5F97; 7&#xFF0C;9 - 7 &#x5F97; 2&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x6587;&#x6CD5;&#x5F97;&#x4E8C;&#x4E49;&#x6027;&#xFF0C;&#x5176;&#x5B9A;&#x4E49;&#x4E3A;&#xFF1A;&#x5BF9;&#x4E8E;&#x540C;&#x4E00;&#x4E2A;&#x7ED9;&#x5B9A;&#x7684;&#x7EC8;&#x7ED3;&#x7B26;&#x53F7;&#x4E32;&#xFF0C;&#x6709;&#x4E24;&#x68F5;&#x53CA;&#x4EE5;&#x4E0A;&#x7684;&#x8BED;&#x6CD5;&#x5206;&#x6790;&#x6811;&#x3002;&#x7531;&#x4E8E;&#x591A;&#x68F5;&#x6811;&#x610F;&#x5473;&#x7740;&#x591A;&#x4E2A;&#x542B;&#x4E49;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8BBE;&#x8BA1;&#x6CA1;&#x6709;&#x4E8C;&#x4E49;&#x6027;&#x7684;&#x6587;&#x6CD5;&#xFF0C;&#x6216;&#x7ED9;&#x4E8C;&#x4E49;&#x6027;&#x6587;&#x6CD5;&#x6DFB;&#x52A0;&#x9644;&#x52A0;&#x89C4;&#x5219;&#x6765;&#x5BF9;&#x9F50;&#x8FDB;&#x884C;&#x6D88;&#x9664;&#x3002;</p><p>&#x5728;&#x672C;&#x4F8B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x91C7;&#x7528;&#x8BBE;&#x8BA1;&#x6587;&#x6CD5;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x6D88;&#x9664;&#x4E8C;&#x4E49;&#x6027;&#x3002;&#x7531;&#x4E8E;&#x56DB;&#x5219;&#x8FD0;&#x7B97;&#x4E2D;&#xFF0C;&#x52A0;&#x51CF;&#x4F4D;&#x4E8E;&#x4E00;&#x4E2A;&#x4F18;&#x5148;&#x7EA7;&#x5C42;&#x6B21;&#xFF0C;&#x4E58;&#x9664;&#x4F4D;&#x4E8E;&#x53E6;&#x4E00;&#x4E2A;&#xFF0C;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E24;&#x4E2A;&#x975E;&#x7EC8;&#x7ED3;&#x7B26;&#x53F7;<code>expr</code>&#x548C;<code>term</code>&#x5206;&#x522B;&#x5BF9;&#x5E94;&#x8FD9;&#x4E24;&#x4E2A;&#x5C42;&#x6B21;&#xFF0C;&#x5E76;&#x4F7F;&#x7528;&#x53E6;&#x4E00;&#x4E2A;&#x975E;&#x7EC8;&#x7ED3;&#x7B26;&#x53F7;<code>factor</code>&#x6765;&#x751F;&#x6210;&#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x7684;&#x57FA;&#x672C;&#x5355;&#x5143;&#xFF0C;&#x53EF;&#x5F97;&#x5230;&#x5982;&#x4E0B;&#x7684;&#x4EA7;&#x751F;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="factor ---&gt; digit | (expr)
// &#x8003;&#x8651;&#x4E58;&#x6CD5;&#x548C;&#x52A0;&#x6CD5;&#x7684;&#x5DE6;&#x7ED3;&#x5408;&#x6027;
term ---&gt; term * factor
        | term / factor
        | factor
expr ---&gt; expr + term
        | expr - term
        | term" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>factor ---&gt; digit | <span class="hljs-type">(expr</span>)
// &#x8003;&#x8651;&#x4E58;&#x6CD5;&#x548C;&#x52A0;&#x6CD5;&#x7684;&#x5DE6;&#x7ED3;&#x5408;&#x6027;
term ---&gt; term * factor
        | <span class="hljs-type">term</span> / factor
        | <span class="hljs-type">factor</span>
expr ---&gt; expr + term
        | <span class="hljs-type">expr</span> - term
        | <span class="hljs-type">term</span></code></pre><p>&#x6709;&#x4E86;&#x65B0;&#x7684;&#x6587;&#x6CD5;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x770B; 9 - 5 + 2&#xFF0C;&#x5176;&#x4EC5;&#x80FD;&#x751F;&#x6210;&#x5982;&#x4E0B;&#x7684;&#x552F;&#x4E00;&#x8BED;&#x6CD5;&#x5206;&#x6790;&#x6811;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                expr
        expr     +      term
   expr - term          factor
   term   factor        digit
 factor   digit           2
  digit     5
    9" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code>                <span class="hljs-keyword">expr</span>
        <span class="hljs-keyword">expr</span>     +      term
   <span class="hljs-keyword">expr</span> - term          factor
   term   factor        digit
 factor   digit           <span class="hljs-number">2</span>
  digit     <span class="hljs-number">5</span>
    <span class="hljs-number">9</span></code></pre><h2 id="articleHeader8">parseExpr &#x7684;&#x5B9E;&#x73B0;</h2><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x56DE;&#x5230;San&#x4E2D;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x6709;&#x4E86;&#x524D;&#x9762;&#x7684;&#x57FA;&#x7840;&#xFF0C;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x90FD;&#x5DF2;&#x7ECF;&#x6E05;&#x695A;&#x4E86;<code>parseExpr</code>&#x89E3;&#x6790;&#x8868;&#x8FBE;&#x5F0F;&#x6E90;&#x5B57;&#x7B26;&#x4E32;&#x65B9;&#x6CD5;&#x7684;&#x7F18;&#x7531;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x8981;&#x5408;&#x7406;&#x7684;&#x5B9A;&#x4E49;&#x51FA;&#x6765;&#x201C;San&#x4E2D;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x201D;&#x8FD9;&#x4E00;&#x8BED;&#x8A00;&#x7684;&#x4EA7;&#x751F;&#x5F0F;&#xFF0C;&#x51FD;&#x6570;&#x5B9E;&#x73B0;&#x5C31;&#x6C34;&#x5230;&#x6E20;&#x6210;&#x4E86;&#x3002;</p><p>&#x8868;&#x8FBE;&#x5F0F;&#x89E3;&#x6790;&#x5165;&#x53E3;<a href="https://github.com/baidu/san/blob/master/src/parser/parse-expr.js" rel="nofollow noreferrer" target="_blank">parseExpr</a>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x89E3;&#x6790;&#x8868;&#x8FBE;&#x5F0F;
 *
 * @param {string} source &#x6E90;&#x7801;
 * @return {Object}
 */
function parseExpr(source) {
    if (typeof source === &apos;object&apos; &amp;&amp; source.type) {
        return source;
    }

    var expr = readTertiaryExpr(new Walker(source));
    expr.raw = source;
    return expr;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x89E3;&#x6790;&#x8868;&#x8FBE;&#x5F0F;
 *
 * @param {string} source &#x6E90;&#x7801;
 * @return {Object}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseExpr</span>(<span class="hljs-params">source</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> source === <span class="hljs-string">&apos;object&apos;</span> &amp;&amp; source.type) {
        <span class="hljs-keyword">return</span> source;
    }

    <span class="hljs-keyword">var</span> expr = readTertiaryExpr(<span class="hljs-keyword">new</span> Walker(source));
    expr.raw = source;
    <span class="hljs-keyword">return</span> expr;
}</code></pre><p>&#x5176;&#x5BF9;&#x5E94;&#x7684;&#x4EA7;&#x751F;&#x5F0F;&#x5C31;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Expr ---&gt; TertiaryExpr" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code style="word-break:break-word;white-space:initial">E<span class="hljs-function"><span class="hljs-title">xpr</span> ---&gt;</span> TertiaryExpr</code></pre><p><a href="https://github.com/baidu/san/blob/master/src/parser/read-tertiary-expr.js" rel="nofollow noreferrer" target="_blank">readTertiaryExpr</a>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x8BFB;&#x53D6;&#x4E09;&#x5143;&#x8868;&#x8FBE;&#x5F0F;
 *
 * @param {Walker} walker &#x6E90;&#x7801;&#x8BFB;&#x53D6;&#x5BF9;&#x8C61;
 * @return {Object}
 */
function readTertiaryExpr(walker) {
    var conditional = readLogicalORExpr(walker);
    walker.goUntil();

    if (walker.currentCode() === 63) { // ?
        walker.go(1);
        var yesExpr = readTertiaryExpr(walker);
        walker.goUntil();

        if (walker.currentCode() === 58) { // :
            walker.go(1);
            return {
                type: ExprType.TERTIARY,
                segs: [
                    conditional,
                    yesExpr,
                    readTertiaryExpr(walker)
                ]
            };
        }
    }

    return conditional;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x8BFB;&#x53D6;&#x4E09;&#x5143;&#x8868;&#x8FBE;&#x5F0F;
 *
 * @param {Walker} walker &#x6E90;&#x7801;&#x8BFB;&#x53D6;&#x5BF9;&#x8C61;
 * @return {Object}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readTertiaryExpr</span>(<span class="hljs-params">walker</span>) </span>{
    <span class="hljs-keyword">var</span> conditional = readLogicalORExpr(walker);
    walker.goUntil();

    <span class="hljs-keyword">if</span> (walker.currentCode() === <span class="hljs-number">63</span>) { <span class="hljs-comment">// ?</span>
        walker.go(<span class="hljs-number">1</span>);
        <span class="hljs-keyword">var</span> yesExpr = readTertiaryExpr(walker);
        walker.goUntil();

        <span class="hljs-keyword">if</span> (walker.currentCode() === <span class="hljs-number">58</span>) { <span class="hljs-comment">// :</span>
            walker.go(<span class="hljs-number">1</span>);
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">type</span>: ExprType.TERTIARY,
                <span class="hljs-attr">segs</span>: [
                    conditional,
                    yesExpr,
                    readTertiaryExpr(walker)
                ]
            };
        }
    }

    <span class="hljs-keyword">return</span> conditional;
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x5224;&#x65AD;&#x6761;&#x4EF6;&#x90E8;&#x5206;<code>conditional</code>&#x662F;<code>readLogicalORExpr</code>&#x7684;&#x7ED3;&#x679C;&#x3002;&#x5982;&#x679C;&#x5B58;&#x5728;<code>?</code>&#x3001;<code>:</code>&#x4E24;&#x4E2A;&#x548C;&#x4E09;&#x5143;&#x8868;&#x8FBE;&#x5F0F;&#x76F8;&#x5173;&#x7684;&#x7EC8;&#x7ED3;&#x7B26;&#x53F7;&#xFF0C;&#x5C31;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x4E09;&#x5143;&#x8868;&#x8FBE;&#x5F0F;&#x7C7B;&#x578B;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x5BF9;&#x8C61;&#xFF1B;&#x5426;&#x5219;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;<code>conditional</code>&#x3002;&#x53EF;&#x77E5;&#x4EA7;&#x751F;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TertiaryExpr ---&gt; LogicalORExpr ? TertiaryExpr : TertiaryExpr
                | LogicalORExpr" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>TertiaryExpr ---&gt; LogicalORExpr ? TertiaryExpr : TertiaryExpr
                | <span class="hljs-type">LogicalORExpr</span></code></pre><p>&#x7531;<a href="https://github.com/baidu/san/blob/master/src/parser/read-logical-or-expr.js" rel="nofollow noreferrer" target="_blank">readLogicalORExpr</a>&#x53EF;&#x5F97;&#x4EA7;&#x751F;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="LogicalORExpr ---&gt; LogicalORExpr || LogicalANDExpr
                 | LogicalANDExpr" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>LogicalORExpr ---&gt; LogicalORExpr |<span class="hljs-type">| LogicalANDExpr</span>
                 | <span class="hljs-type">LogicalANDExpr</span></code></pre><p>&#x7531;<a href="https://github.com/baidu/san/blob/master/src/parser/read-logical-and-expr.js" rel="nofollow noreferrer" target="_blank">readLogicalANDExpr</a>&#x5F97;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="LogicalANDExpr ---&gt; LogicalANDExpr &amp;&amp; EqualityExpr
                  | EqualityExpr" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>LogicalANDExpr ---&gt; LogicalANDExpr &amp;&amp; EqualityExpr
                  | <span class="hljs-type">EqualityExpr</span></code></pre><p>&#x7531;<a href="https://github.com/baidu/san/blob/master/src/parser/read-equality-expr.js" rel="nofollow noreferrer" target="_blank">readEqualityExpr</a>&#x5F97;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="EqualityExpr ---&gt; RelationalExpr == RelationalExpr
                | RelationalExpr != RelationalExpr
                | RelationalExpr === RelationalExpr
                | RelationalExpr !== RelationalExpr
                | RelationalExpr" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>EqualityExpr ---&gt; RelationalExpr == RelationalExpr
                | <span class="hljs-type">RelationalExpr</span> != RelationalExpr
                | <span class="hljs-type">RelationalExpr</span> === RelationalExpr
                | <span class="hljs-type">RelationalExpr</span> !== RelationalExpr
                | <span class="hljs-type">RelationalExpr</span></code></pre><p>&#x7531;<a href="https://github.com/baidu/san/blob/master/src/parser/read-relational-expr.js" rel="nofollow noreferrer" target="_blank">readRelationalExpr</a>&#x5F97;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="RelationalExpr ---&gt; AdditiveExpr &gt; AdditiveExpr
                  | AdditiveExpr &lt; AdditiveExpr
                  | AdditiveExpr &gt;= AdditiveExpr
                  | AdditiveExpr &lt;= AdditiveExpr
                  | AdditiveExpr" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>RelationalExpr ---&gt; AdditiveExpr &gt; AdditiveExpr
                  | <span class="hljs-type">AdditiveExpr</span> &lt; AdditiveExpr
                  | <span class="hljs-type">AdditiveExpr</span> &gt;= AdditiveExpr
                  | <span class="hljs-type">AdditiveExpr</span> &lt;= AdditiveExpr
                  | <span class="hljs-type">AdditiveExpr</span></code></pre><p><a href="https://github.com/baidu/san/blob/master/src/parser/read-additive-expr.js" rel="nofollow noreferrer" target="_blank">readAdditiveExpr</a>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x8BFB;&#x53D6;&#x52A0;&#x6CD5;&#x8868;&#x8FBE;&#x5F0F;
 *
 * @param {Walker} walker &#x6E90;&#x7801;&#x8BFB;&#x53D6;&#x5BF9;&#x8C61;
 * @return {Object}
 */
function readAdditiveExpr(walker) {
    var expr = readMultiplicativeExpr(walker);

    while (1) {
        walker.goUntil();
        var code = walker.currentCode();

        switch (code) {
            case 43: // +
            case 45: // -
                walker.go(1);
                // &#x8FD9;&#x91CC;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x5305;&#x4F4F;&#x4E86;&#x539F;&#x6765;&#x7684; expr&#xFF0C;&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x7684; expr
                expr = {
                    type: ExprType.BINARY,
                    operator: code,
                    segs: [expr, readMultiplicativeExpr(walker)]
                };
                // &#x6CE8;&#x610F;&#x5230;&#x8FD9;&#x91CC;&#x662F; continue&#xFF0C;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;&#x90FD;&#x662F; return
                continue;
        }

        break;
    }

    return expr;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x8BFB;&#x53D6;&#x52A0;&#x6CD5;&#x8868;&#x8FBE;&#x5F0F;
 *
 * @param {Walker} walker &#x6E90;&#x7801;&#x8BFB;&#x53D6;&#x5BF9;&#x8C61;
 * @return {Object}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readAdditiveExpr</span>(<span class="hljs-params">walker</span>) </span>{
    <span class="hljs-keyword">var</span> expr = readMultiplicativeExpr(walker);

    <span class="hljs-keyword">while</span> (<span class="hljs-number">1</span>) {
        walker.goUntil();
        <span class="hljs-keyword">var</span> code = walker.currentCode();

        <span class="hljs-keyword">switch</span> (code) {
            <span class="hljs-keyword">case</span> <span class="hljs-number">43</span>: <span class="hljs-comment">// +</span>
            <span class="hljs-keyword">case</span> <span class="hljs-number">45</span>: <span class="hljs-comment">// -</span>
                walker.go(<span class="hljs-number">1</span>);
                <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x5305;&#x4F4F;&#x4E86;&#x539F;&#x6765;&#x7684; expr&#xFF0C;&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x7684; expr</span>
                expr = {
                    <span class="hljs-attr">type</span>: ExprType.BINARY,
                    <span class="hljs-attr">operator</span>: code,
                    <span class="hljs-attr">segs</span>: [expr, readMultiplicativeExpr(walker)]
                };
                <span class="hljs-comment">// &#x6CE8;&#x610F;&#x5230;&#x8FD9;&#x91CC;&#x662F; continue&#xFF0C;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;&#x90FD;&#x662F; return</span>
                <span class="hljs-keyword">continue</span>;
        }

        <span class="hljs-keyword">break</span>;
    }

    <span class="hljs-keyword">return</span> expr;
}</code></pre><p>&#x8BFB;&#x52A0;&#x6CD5;&#x7684;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x6709;&#x4E9B;&#x7279;&#x6B8A;&#xFF0C;&#x5176;&#x5728;&#x7B2C;&#x4E00;&#x6B65;&#x5148;&#x8C03;&#x7528;&#x4E86;&#x8BFB;&#x4E58;&#x6CD5;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5F97;&#x5230;&#x4E86;&#x53D8;&#x91CF;<code>expr</code>&#xFF0C;&#x7136;&#x540E;&#x4E0D;&#x65AD;&#x5730;&#x66F4;&#x65B0;<code>expr</code>&#x5BF9;&#x8C61;&#x5305;&#x4F4F;&#x539F;&#x6765;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x4EE5;&#x4FDD;&#x8BC1;&#x7ED3;&#x5408;&#x6027;&#x7684;&#x6B63;&#x786E;&#x3002;</p><p>&#x65B9;&#x6CD5;&#x7684;&#x4EA7;&#x751F;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="AdditiveExpr ---&gt; AdditiveExpr + MultiplicativeExpr
                | AdditiveExpr - MultiplicativeExpr
                | MultiplicativeExpr" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>AdditiveExpr ---&gt; AdditiveExpr + MultiplicativeExpr
                | <span class="hljs-type">AdditiveExpr</span> - MultiplicativeExpr
                | <span class="hljs-type">MultiplicativeExpr</span></code></pre><p>&#x7531;<a href="https://github.com/baidu/san/blob/master/src/parser/read-multiplicative-expr.js" rel="nofollow noreferrer" target="_blank">readMultiplicativeExpr</a>&#x5F97;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MultiplicativeExpr ---&gt; MultiplicativeExpr * UnaryExpr
                      | MultiplicativeExpr / UnaryExpr
                      | MultiplicativeExpr % UnaryExpr
                      | UnaryExpr" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>MultiplicativeExpr ---&gt; MultiplicativeExpr * UnaryExpr
                      | <span class="hljs-type">MultiplicativeExpr</span> / UnaryExpr
                      | <span class="hljs-type">MultiplicativeExpr</span> % UnaryExpr
                      | <span class="hljs-type">UnaryExpr</span></code></pre><p><a href="https://github.com/baidu/san/blob/master/src/parser/read-unary-expr.js" rel="nofollow noreferrer" target="_blank">readUnaryExpr</a>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5305;&#x542B;&#x4E86;&#x9664;&#x5E03;&#x5C14;&#x503C;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x4E4B;&#x5916;&#x7684;&#xFF0C;&#x5404;&#x4E2A;&#x8868;&#x793A;&#x6570;&#x636E;&#x5F97;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x89E3;&#x6790;&#x90E8;&#x5206;&#x3002;&#x56E0;&#x6B64;&#x5BF9;&#x5E94;&#x7684;&#x4EA7;&#x751F;&#x5F0F;&#x4E5F;&#x76F8;&#x5BF9;&#x590D;&#x6742;&#xFF0C;&#x4E3A;&#x4E86;&#x4FBF;&#x4E8E;&#x8BF4;&#x660E;&#xFF0C;&#x6211;&#x81EA;&#x884C;&#x5F15;&#x5165;&#x4E86;&#x4E00;&#x4E9B;&#x975E;&#x7EC8;&#x7ED3;&#x7B26;&#x53F7;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="UnaryExpr ---&gt; !UnaryExpr
             | &apos;String&apos;
             | &quot;String&quot;
             | Number
             | ArrayLiteral
             | ObjectLiteral
             | ParenthesizedExpr
             | Accessor

ArrayLiteral ---&gt; []
                | [ElementList]     // &#x8FD9;&#x91CC;&#x5F15;&#x5165;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x975E;&#x7EC8;&#x7ED3;&#x7B26;&#x53F7; ElementList &#x6765;&#x8F85;&#x52A9;&#x8BF4;&#x660E;
ElementList ---&gt; Element
               | ElementList, Element
Element ---&gt; TertiaryExpr
           | ...TertiaryExpr

ObjectLiteral ---&gt; {}
                 | {FieldList}      // &#x7C7B;&#x4F3C;&#x4E0A;&#x9762;&#x7684; ElementList
FieldList ---&gt; Field
             | FieldList, Field
Field ---&gt; ...TertiaryExpr
         | SimpleExpr
         | SimpleExpr: TertiaryExpr
SimpleExpr ---&gt; true
              | false
              | &apos;String&apos;
              | &quot;String&quot;
              | Number" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code>U<span class="hljs-function"><span class="hljs-title">naryExpr</span> ---&gt;</span> !UnaryExpr
             | <span class="hljs-string">&apos;String&apos;</span>
             | <span class="hljs-string">&quot;String&quot;</span>
             | Number
             | ArrayLiteral
             | ObjectLiteral
             | ParenthesizedExpr
             | Accessor

A<span class="hljs-function"><span class="hljs-title">rrayLiteral</span> ---&gt;</span> []
                | [ElementList]     <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5F15;&#x5165;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x975E;&#x7EC8;&#x7ED3;&#x7B26;&#x53F7; ElementList &#x6765;&#x8F85;&#x52A9;&#x8BF4;&#x660E;</span>
E<span class="hljs-function"><span class="hljs-title">lementList</span> ---&gt;</span> Element
               | ElementList, Element
E<span class="hljs-function"><span class="hljs-title">lement</span> ---&gt;</span> TertiaryExpr
           | ...TertiaryExpr

O<span class="hljs-function"><span class="hljs-title">bjectLiteral</span> ---&gt;</span> {}
                 | {FieldList}      <span class="hljs-comment">// &#x7C7B;&#x4F3C;&#x4E0A;&#x9762;&#x7684; ElementList</span>
F<span class="hljs-function"><span class="hljs-title">ieldList</span> ---&gt;</span> Field
             | FieldList, Field
F<span class="hljs-function"><span class="hljs-title">ield</span> ---&gt;</span> ...TertiaryExpr
         | SimpleExpr
         | SimpleExpr: TertiaryExpr
S<span class="hljs-function"><span class="hljs-title">impleExpr</span> ---&gt;</span> <span class="hljs-literal">true</span>
              | <span class="hljs-literal">false</span>
              | <span class="hljs-string">&apos;String&apos;</span>
              | <span class="hljs-string">&quot;String&quot;</span>
              | Number</code></pre><p>&#x7531;<a href="https://github.com/baidu/san/blob/master/src/parser/read-parenthesized-expr.js" rel="nofollow noreferrer" target="_blank">readParenthesizedExpr</a>&#x5F97;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ParenthesizedExpr ---&gt; (TertiaryExpr)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code style="word-break:break-word;white-space:initial">ParenthesizedExpr ---&gt; (<span class="hljs-name">TertiaryExpr</span>)</code></pre><p>&#x7531;<a href="https://github.com/baidu/san/blob/master/src/parser/read-accessor.js" rel="nofollow noreferrer" target="_blank">readAccessor</a>&#x5F97;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Accessor ---&gt; true
            | false
            | Identifier MemberOperator*        // &#x6B64;&#x5904; * &#x8868;&#x793A; 0&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x7684;&#x610F;&#x601D;

MemberOperator ---&gt; .Identifier
                  | [TertiaryExpr]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code>A<span class="hljs-function"><span class="hljs-title">ccessor</span> ---&gt;</span> <span class="hljs-literal">true</span>
            | <span class="hljs-literal">false</span>
            | Identifier MemberOperator*        <span class="hljs-comment">// &#x6B64;&#x5904; * &#x8868;&#x793A; 0&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x7684;&#x610F;&#x601D;</span>

M<span class="hljs-function"><span class="hljs-title">emberOperator</span> ---&gt;</span> .Identifier
                  | [TertiaryExpr]</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x7EC8;&#x4E8E;&#x628A;&#x6240;&#x6709;&#x7684;&#x4EA7;&#x751F;&#x5F0F;&#x90FD;&#x68B3;&#x7406;&#x6E05;&#x695A;&#x4E86;&#x3002;</p><h2 id="articleHeader9">&#x548C; JavaScript &#x6587;&#x6CD5;&#x7684;&#x5BF9;&#x6BD4;</h2><p>&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x9644;&#x4E0A;&#x4E00;&#x4EFD;<a href="https://www-archive.mozilla.org/js/language/grammar14.html" rel="nofollow noreferrer" target="_blank">JavaScript 1.4 Grammar</a>&#x4F9B;&#x53C2;&#x8003;&#x3002;&#x901A;&#x8FC7;&#x5BF9;&#x6BD4;&#x4E24;&#x79CD;&#x6587;&#x6CD5;&#x4EA7;&#x751F;&#x5F0F;&#x7684;&#x4E0D;&#x540C;&#xFF0C;&#x80FD;&#x627E;&#x5230;&#x5F88;&#x591A;&#x4E24;&#x8005;&#x4E4B;&#x95F4;&#x89E3;&#x6790;&#x7ED3;&#x679C;&#x5F97;&#x5DEE;&#x5F02;&#x3002;&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 &gt; 2 &lt; 3       // &#x8FD4;&#x56DE; true&#xFF0C;&#x76F8;&#x5F53;&#x4E8E; 1 &gt; 2 &#x8FD4;&#x56DE; false&#xFF0C;false &lt; 3 &#x8FD4;&#x56DE; true
san.evalExpr(san.parseExpr(&apos;1 &gt; 2 &lt; 3&apos;), new san.Data());       // &#x8FD4;&#x56DE; false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1</span> &gt; <span class="hljs-number">2</span> &lt; <span class="hljs-number">3</span>       <span class="hljs-comment">// &#x8FD4;&#x56DE; true&#xFF0C;&#x76F8;&#x5F53;&#x4E8E; 1 &gt; 2 &#x8FD4;&#x56DE; false&#xFF0C;false &lt; 3 &#x8FD4;&#x56DE; true</span>
san.evalExpr(san.parseExpr(<span class="hljs-string">&apos;1 &gt; 2 &lt; 3&apos;</span>), <span class="hljs-keyword">new</span> san.Data());       <span class="hljs-comment">// &#x8FD4;&#x56DE; false</span></code></pre><p>&#x6CE8;&#x610F;&#x5230; San &#x4E2D;&#x5173;&#x4E8E;<code>RelationalExpression</code>&#x7684;&#x4EA7;&#x751F;&#x5F0F;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="RelationalExpr ---&gt; AdditiveExpr &gt; AdditiveExpr
                  | AdditiveExpr &lt; AdditiveExpr
                  | AdditiveExpr &gt;= AdditiveExpr
                  | AdditiveExpr &lt;= AdditiveExpr
                  | AdditiveExpr" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>RelationalExpr ---&gt; AdditiveExpr &gt; AdditiveExpr
                  | <span class="hljs-type">AdditiveExpr</span> &lt; AdditiveExpr
                  | <span class="hljs-type">AdditiveExpr</span> &gt;= AdditiveExpr
                  | <span class="hljs-type">AdditiveExpr</span> &lt;= AdditiveExpr
                  | <span class="hljs-type">AdditiveExpr</span></code></pre><p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5BF9;&#x4E8E;<code>1 &gt; 2 &lt; 3</code>&#xFF0C;&#x5176;&#x5339;&#x914D;&#x4E86;<code>RelationalExpr ---&gt; AdditiveExpr &gt; AdditiveExpr</code>&#x3002;&#x5176;&#x4E2D;<code>1</code>&#x4F20;&#x5165;&#x4E86;<code>AdditiveExpr</code>&#x89E3;&#x6790;&#x6210;<code>Number</code>&#x7684;<code>1</code>&#xFF1B;<code>2 &lt; 3</code>&#x5219;&#x88AB;&#x89C6;&#x4E3A;&#x53E6;&#x4E00;&#x4E2A;<code>AdditiveExpr</code>&#x8FDB;&#x884C;&#x89E3;&#x6790;&#xFF0C;&#x7531;&#x4E8E;&#x540E;&#x9762;&#x5DF2;&#x7ECF;&#x6CA1;&#x6709;&#x80FD;&#x591F;&#x5904;&#x7406;<code>&lt;</code>&#x7684;&#x903B;&#x8F91;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x88AB;&#x89E3;&#x6790;&#x6210;<code>Number</code>&#x7684;<code>2</code>&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x8F93;&#x5165;&#x7684;<code>1 &gt; 2 &lt; 3</code>&#xFF0C;&#x771F;&#x6B63;&#x89E3;&#x6790;&#x51FA;&#x6765;&#x7684;&#x5C31;&#x53EA;&#x6709;<code>1 &gt; 2</code>&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4F1A;&#x8FD4;&#x56DE; false &#x3002;</p><p>&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A; San &#x5728;&#x8FD9;&#x91CC;&#x5E94;&#x8BE5;&#x662F;&#x523B;&#x610F;&#x4E3A;&#x4E4B;&#x7684;&#x3002;&#x56E0;&#x4E3A;&#x5BF9;&#x4E8E;<code>1 &gt; 2 &lt; 3</code>&#x8FD9;&#x79CD;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x771F;&#x7684;&#x6CA1;&#x5FC5;&#x8981;&#x4FDD;&#x8BC1;&#x5B83;&#x6309;&#x7167;<code>JavaScript</code>&#x7684;&#x6587;&#x6CD5;&#x6765;&#x89E3;&#x6790;&#x2014;&#x2014;&#x8FD9;&#x79CD;&#x4EE3;&#x7801;&#x5199;&#x51FA;&#x6765;&#x80AF;&#x5B9A;&#x662F;&#x8981;&#x6539;&#x7684;&#xFF0C;&#x6CA1;&#x6709;&#x987E;&#x53CA;&#x5B83;&#x7684;&#x610F;&#x4E49;&#x3002;</p><h2 id="articleHeader10">&#x62D3;&#x5C55;</h2><p>&#x4E86;&#x89E3;&#x4E86; parseExpr &#x662F;&#x5982;&#x4F55;&#x4ECE;&#x6E90;&#x5B57;&#x7B26;&#x4E32;&#x5F97;&#x5230;&#x8868;&#x8FBE;&#x5F0F;&#x5BF9;&#x8C61;&#x4E4B;&#x540E;&#xFF0C;&#x4E5F;&#x5C31;&#x53D1;&#x73B0;&#x5176;&#x5B9E;&#x5F88;&#x591A;&#x5730;&#x65B9;&#x90FD;&#x7528;&#x4E86;&#x7C7B;&#x4F3C;&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x63CF;&#x8FF0;&#x8BED;&#x6CD5;&#x3002;&#x6BD4;&#x5982;<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/linear-gradient#%E5%BD%A2%E5%BC%8F%E8%AF%AD%E6%B3%95" rel="nofollow noreferrer" target="_blank">CSS &#x7EBF;&#x6027;&#x6E10;&#x53D8;</a>&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x7684;&#x94FE;&#x63A5;&#x76F4;&#x63A5;&#x6307;&#x5411;&#x4E86;MDN&#x4E0A;&#x5173;&#x4E8E;&#x7EBF;&#x6027;&#x6E10;&#x53D8;&#x7684;&#x5F62;&#x5F0F;&#x8BED;&#x6CD5;&#xFF08;Formal syntax&#xFF09;&#x90E8;&#x5206;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x8FD9;&#x90E8;&#x5206;&#x5BF9;&#x7EBF;&#x6027;&#x6E10;&#x53D8;&#x8BED;&#x6CD5;&#x7684;&#x63CF;&#x8FF0;&#xFF0C;&#x548C;&#x6211;&#x4E0A;&#x9762;&#x89E3;&#x6790; parseExpr &#x7684;&#x65F6;&#x5019;&#x6240;&#x7528;&#x7684;&#x4EA7;&#x751F;&#x5F0F;&#x5982;&#x51FA;&#x4E00;&#x8F99;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="linear-gradient(
  [ &lt;angle&gt; | to &lt;side-or-corner&gt; ,]? &lt;color-stop&gt; [, &lt;color-stop&gt;]+ )
  \---------------------------------/ \----------------------------/
    Definition of the gradient line        List of color stops

where &lt;side-or-corner&gt; = [left | right] || [top | bottom]
  and &lt;color-stop&gt;     = &lt;color&gt; [ &lt;percentage&gt; | &lt;length&gt; ]?" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livecodeserver"><code>linear-gradient(
  [ &lt;angle&gt; | <span class="hljs-built_in">to</span> &lt;side-<span class="hljs-keyword">or</span>-corner&gt; ,]? &lt;color-<span class="hljs-built_in">stop</span>&gt; [, &lt;color-<span class="hljs-built_in">stop</span>&gt;]+ )
  \<span class="hljs-comment">---------------------------------/ \----------------------------/</span>
    Definition <span class="hljs-keyword">of</span> <span class="hljs-keyword">the</span> gradient <span class="hljs-built_in">line</span>        List <span class="hljs-keyword">of</span> color stops

where &lt;side-<span class="hljs-keyword">or</span>-corner&gt; = [left | <span class="hljs-literal">right</span>] || [top | bottom]
  <span class="hljs-keyword">and</span> &lt;color-<span class="hljs-built_in">stop</span>&gt;     = &lt;color&gt; [ &lt;percentage&gt; | &lt;<span class="hljs-built_in">length</span>&gt; ]?</code></pre><p>&#x8FD9;&#x79CD;&#x8BED;&#x6CD5;&#x5F62;&#x5F0F;&#x662F;MDN&#x5B9A;&#x4E49;&#x7684;<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Value_definition_syntax" rel="nofollow noreferrer" target="_blank">CSS&#x5C5E;&#x6027;&#x503C;&#x5B9A;&#x4E49;&#x8BED;&#x6CD5;</a>&#x3002;</p><p>&#x53C2;&#x7167;&#x6211;&#x4EEC;&#x524D;&#x9762;&#x6240;&#x5199;&#x7684;&#x4EA7;&#x751F;&#x5F0F;&#x4E0E;&#x4E0A;&#x9762;&#x7684;CSS&#x5C5E;&#x6027;&#x503C;&#x5B9A;&#x4E49;&#x8BED;&#x6CD5;&#xFF0C;&#x6211;&#x5199;&#x51FA;&#x4E86;&#x5982;&#x4E0B;&#x7684;&#x4EA7;&#x751F;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="expr ---&gt; gradientLine , colorStopList
        | colorStopList

gradientLine ---&gt; angle | to sideOrCorner
sideOrCorner ---&gt; horizon
                | vertical
                | horizon vertical
                | vertical horizon
horizon ---&gt; left | right
vertical ---&gt; top | bottom

colorStopList ---&gt; colorStopList, color distance
                 | color distance
color ---&gt; hexColor | rgbColor | rgbaColor | literalColor | hslColor    // &#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x90FD;&#x61C2;&#xFF0C;&#x6211;&#x5C31;&#x4E0D;&#x505A;&#x8FDB;&#x4E00;&#x6B65;&#x5C55;&#x5F00;&#x4E86;
distance ---&gt; percentage | length       // &#x540C;&#x4E0A;&#xFF0C;&#x4E0D;&#x505A;&#x8FDB;&#x4E00;&#x6B65;&#x5C55;&#x5F00;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>expr ---&gt; gradientLine , colorStopList
        | <span class="hljs-type">colorStopList</span>

gradientLine ---&gt; angle | <span class="hljs-type">to</span> sideOrCorner
sideOrCorner ---&gt; horizon
                | <span class="hljs-type">vertical</span>
                | <span class="hljs-type">horizon</span> vertical
                | <span class="hljs-type">vertical</span> horizon
horizon ---&gt; <span class="hljs-built_in">left</span> | <span class="hljs-type">right</span>
vertical ---&gt; <span class="hljs-built_in">top</span> | <span class="hljs-type">bottom</span>

colorStopList ---&gt; colorStopList, color distance
                 | <span class="hljs-type">color</span> distance
color ---&gt; hexColor | <span class="hljs-type">rgbColor</span> | <span class="hljs-type">rgbaColor</span> | <span class="hljs-type">literalColor</span> | <span class="hljs-type">hslColor</span>    // &#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x90FD;&#x61C2;&#xFF0C;&#x6211;&#x5C31;&#x4E0D;&#x505A;&#x8FDB;&#x4E00;&#x6B65;&#x5C55;&#x5F00;&#x4E86;
distance ---&gt; percentage | <span class="hljs-type">length</span>       // &#x540C;&#x4E0A;&#xFF0C;&#x4E0D;&#x505A;&#x8FDB;&#x4E00;&#x6B65;&#x5C55;&#x5F00;</code></pre><h2 id="articleHeader11">&#x7ED3;&#x8BED;</h2><p>&#x8FD9;&#x4E00;&#x8D9F;&#x4E0B;&#x6765;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x8865;&#x4E86;&#x4E0D;&#x5C11;&#x8BFE;&#xFF0C;&#x4E5F;&#x63ED;&#x793A;&#x4E86; San &#x4E2D;&#x5185;&#x90E8;&#x539F;&#x7406;&#x7684;&#x4E00;&#x89D2;&#xFF0C;&#x540E;&#x9762;&#x8BA1;&#x5212;&#x628A; <code>evalExpr</code>&#x3001;<code>Data</code>&#x3001;<code>parseTemplate</code>&#x7B49;&#x65B9;&#x6CD5;&#x4E5F;&#x5B66;&#x4E60;&#x4E00;&#x904D;&#xFF0C;&#x8FDB;&#x4E00;&#x6B65;&#x4E86;&#x89E3; San &#x7684;&#x5168;&#x8C8C;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
san.parseExpr 源码学习

## 原文链接
[https://segmentfault.com/a/1190000015321952](https://segmentfault.com/a/1190000015321952)

