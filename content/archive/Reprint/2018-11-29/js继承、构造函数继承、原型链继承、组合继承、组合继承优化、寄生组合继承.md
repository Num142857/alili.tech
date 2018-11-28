---
title: 'js继承、构造函数继承、原型链继承、组合继承、组合继承优化、寄生组合继承' 
date: 2018-11-29 2:30:09
hidden: true
slug: vwpnmd0vy2
categories: [reprint]
---

{{< raw >}}
<p>2018.06.03</p><h2 id="articleHeader0">&#x7B2C;&#x4E00;&#x90E8;&#x5206;&#xFF1A;&#x5BFC;&#x5165;</h2><h3 id="articleHeader1">1&#x3001;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5C5E;&#x6027;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="funcion A(name) {
    this.name = name; // &#x5B9E;&#x4F8B;&#x57FA;&#x672C;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)
    this.arr = [1]; // &#x5B9E;&#x4F8B;&#x5F15;&#x7528;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x7528;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)
    this.say = function() { // &#x5B9E;&#x4F8B;&#x5F15;&#x7528;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x590D;&#x7528;&#xFF0C;&#x9700;&#x8981;&#x5171;&#x4EAB;)
        console.log(&apos;hello&apos;)
    }
}
&#x6CE8;&#x610F;&#xFF1A;&#x6570;&#x7EC4;&#x548C;&#x65B9;&#x6CD5;&#x90FD;&#x5C5E;&#x4E8E;&#x2018;&#x5B9E;&#x4F8B;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x2019;&#xFF0C;&#x4F46;&#x662F;&#x6570;&#x7EC4;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#x3001;&#x4E0D;&#x5171;&#x4EAB;&#x7684;&#x3002;&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x590D;&#x7528;&#x3001;&#x5171;&#x4EAB;&#x3002;

&#x6CE8;&#x610F;&#xFF1A;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x4E00;&#x822C;&#x5F88;&#x5C11;&#x6709;&#x6570;&#x7EC4;&#x5F62;&#x5F0F;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#xFF0C;&#x5927;&#x90E8;&#x5206;&#x60C5;&#x51B5;&#x90FD;&#x662F;&#xFF1A;&#x57FA;&#x672C;&#x5C5E;&#x6027; + &#x65B9;&#x6CD5;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>funcion A(name) {
    <span class="hljs-keyword">this</span>.name = name; <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x57FA;&#x672C;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)</span>
    <span class="hljs-keyword">this</span>.arr = [<span class="hljs-number">1</span>]; <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x5F15;&#x7528;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x7528;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)</span>
    <span class="hljs-keyword">this</span>.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x5F15;&#x7528;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x590D;&#x7528;&#xFF0C;&#x9700;&#x8981;&#x5171;&#x4EAB;)</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hello&apos;</span>)
    }
}
&#x6CE8;&#x610F;&#xFF1A;&#x6570;&#x7EC4;&#x548C;&#x65B9;&#x6CD5;&#x90FD;&#x5C5E;&#x4E8E;&#x2018;&#x5B9E;&#x4F8B;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x2019;&#xFF0C;&#x4F46;&#x662F;&#x6570;&#x7EC4;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#x3001;&#x4E0D;&#x5171;&#x4EAB;&#x7684;&#x3002;&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x590D;&#x7528;&#x3001;&#x5171;&#x4EAB;&#x3002;

&#x6CE8;&#x610F;&#xFF1A;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x4E00;&#x822C;&#x5F88;&#x5C11;&#x6709;&#x6570;&#x7EC4;&#x5F62;&#x5F0F;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#xFF0C;&#x5927;&#x90E8;&#x5206;&#x60C5;&#x51B5;&#x90FD;&#x662F;&#xFF1A;&#x57FA;&#x672C;&#x5C5E;&#x6027; + &#x65B9;&#x6CD5;&#x3002;</code></pre><h3 id="articleHeader2">2&#x3001;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x4F5C;&#x7528;</h3><blockquote>&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x7528;&#x9014;&#x662F;&#x4E3A;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x5B58;&#x50A8;&#x5171;&#x4EAB;&#x7684;&#x65B9;&#x6CD5;&#x548C;&#x5C5E;&#x6027;&#xFF0C;&#x5B83;&#x4EC5;&#x4EC5;&#x662F;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x5BF9;&#x8C61;&#x800C;&#x5DF2;&#x3002;&#x5E76;&#x4E14;&#x6240;&#x6709;&#x7684;&#x5B9E;&#x4F8B;&#x662F;&#x5171;&#x4EAB;&#x540C;&#x4E00;&#x4E2A;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x6B64;&#x6709;&#x522B;&#x4E8E;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x6216;&#x5C5E;&#x6027;&#xFF0C;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4EC5;&#x6709;&#x4E00;&#x4EFD;&#x3002;&#x800C;&#x5B9E;&#x4F8B;&#x6709;&#x5F88;&#x591A;&#x4EFD;&#xFF0C;&#x4E14;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x662F;&#x72EC;&#x7ACB;&#x7684;&#x3002;<p>&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#xFF1A;&#x4E3A;&#x4E86;&#x5C5E;&#x6027;(&#x5B9E;&#x4F8B;&#x57FA;&#x672C;&#x5C5E;&#x6027;)&#x7684;&#x79C1;&#x6709;&#x6027;&#x3001;&#x4EE5;&#x53CA;&#x65B9;&#x6CD5;(&#x5B9E;&#x4F8B;&#x5F15;&#x7528;&#x5C5E;&#x6027;)&#x7684;&#x590D;&#x7528;&#x3001;&#x5171;&#x4EAB;&#x3002;&#x6211;&#x4EEC;&#x63D0;&#x5021;&#xFF1A;</p></blockquote><ul><li>&#x5C06;&#x5C5E;&#x6027;&#x5C01;&#x88C5;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;</li><li>&#x5C06;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="funcion A(name) {
    this.name = name; // (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)
}
A.prototype.say = function() { // &#x5B9A;&#x4E49;&#x5728;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x65B9;&#x6CD5; (&#x5F3A;&#x8C03;&#x590D;&#x7528;&#xFF0C;&#x9700;&#x8981;&#x5171;&#x4EAB;)
        console.log(&apos;hello&apos;)
}

// &#x4E0D;&#x63A8;&#x8350;&#x7684;&#x5199;&#x6CD5;&#xFF1A;[&#x539F;&#x56E0;](https://blog.csdn.net/kkkkkxiaofei/article/details/46474303)
A.prototype = {
    say: function() { 
        console.log(&apos;hello&apos;)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>funcion A(name) {
    <span class="hljs-keyword">this</span>.name = name; <span class="hljs-comment">// (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)</span>
}
A.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x5728;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x65B9;&#x6CD5; (&#x5F3A;&#x8C03;&#x590D;&#x7528;&#xFF0C;&#x9700;&#x8981;&#x5171;&#x4EAB;)</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hello&apos;</span>)
}

<span class="hljs-comment">// &#x4E0D;&#x63A8;&#x8350;&#x7684;&#x5199;&#x6CD5;&#xFF1A;[&#x539F;&#x56E0;](https://blog.csdn.net/kkkkkxiaofei/article/details/46474303)</span>
A.prototype = {
    <span class="hljs-attr">say</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ 
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hello&apos;</span>)
    }
}</code></pre><h2 id="articleHeader3">&#x7B2C;&#x4E8C;&#x90E8;&#x5206;&#xFF1A;js &#x7EE7;&#x627F;---&#x5404;&#x79CD;&#x65B9;&#x5F0F;&#x7684;&#x4F18;&#x7F3A;&#x70B9;</h2><h3 id="articleHeader4">&#x65B9;&#x5F0F;1&#x3001;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;</h3><ul><li>&#x6838;&#x5FC3;&#xFF1A;&#x5C06;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x5B50;&#x7C7B;&#x539F;&#x578B;</li><li><p>&#x4F18;&#x70B9;&#xFF1A;&#x65B9;&#x6CD5;&#x590D;&#x7528;</p><ul><li>&#x7531;&#x4E8E;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x4E0A;&#xFF0C;&#x590D;&#x7528;&#x4E86;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x6BD4;&#x5982;say&#x65B9;&#x6CD5;&#x3002;</li></ul></li><li><p>&#x7F3A;&#x70B9;&#xFF1A;</p><ul><li>&#x521B;&#x5EFA;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E0D;&#x80FD;&#x4F20;&#x53C2;&#x6570;&#x3002;</li><li>&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5171;&#x4EAB;&#x4E86;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#xFF0C;&#x6BD4;&#x5982;arr&#x5C5E;&#x6027;&#x3002;</li></ul></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent() {
    this.name = &apos;&#x7236;&#x4EB2;&apos;; // &#x5B9E;&#x4F8B;&#x57FA;&#x672C;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)
    this.arr = [1]; // (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;)
}
Parent.prototype.say = function() { // -- &#x5C06;&#x9700;&#x8981;&#x590D;&#x7528;&#x3001;&#x5171;&#x4EAB;&#x7684;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A; 
    console.log(&apos;hello&apos;)
}
function Child(like) {
    this.like = like;
}
Child.prototype = new Parent() // &#x6838;&#x5FC3;

let boy1 = new Child()
let boy2 = new Child()

// &#x4F18;&#x70B9;&#xFF1A;&#x5171;&#x4EAB;&#x4E86;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;say&#x65B9;&#x6CD5;
console.log(boy1.say(), boy2.say(), boy1.say === boy2.say); // hello , hello , true

// &#x7F3A;&#x70B9;1&#xFF1A;&#x4E0D;&#x80FD;&#x4F20;&#x53C2;&#x6570;
// &#x7F3A;&#x70B9;2&#xFF1A;
console.log(boy1.name, boy2.name, boy1.name===boy2.name); // &#x7236;&#x4EB2;&#xFF0C;&#x7236;&#x4EB2;&#xFF0C;true

boy1.arr.push(2); // &#x4FEE;&#x6539;&#x4E86;boy1&#x7684;arr&#x5C5E;&#x6027;&#xFF0C;boy2&#x7684;arr&#x5C5E;&#x6027;&#xFF0C;&#x4E5F;&#x4F1A;&#x53D8;&#x5316;&#xFF0C;&#x56E0;&#x4E3A;&#x4E24;&#x4E2A;&#x5B9E;&#x4F8B;&#x7684;&#x539F;&#x578B;&#x4E0A;(Child.prototype)&#x6709;&#x4E86;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;arr&#xFF1B;&#x6240;&#x4EE5;&#x53EA;&#x8981;&#x4FEE;&#x6539;&#x4E86;boy1.arr,boy2.arr&#x7684;&#x5C5E;&#x6027;&#x4E5F;&#x4F1A;&#x53D8;&#x5316;&#x3002;  ----  &#x539F;&#x578B;&#x4E0A;&#x7684;arr&#x5C5E;&#x6027;&#x662F;&#x5171;&#x4EAB;&#x7684;&#x3002;
console.log(boy2.arr); // [1,2]

&#x6CE8;&#x610F;&#xFF1A;&#x4FEE;&#x6539;boy1&#x7684;name&#x5C5E;&#x6027;&#xFF0C;&#x662F;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230;boy2.name&#x3002;&#x56E0;&#x4E3A;name&#x662F;&#x57FA;&#x672C;&#x5C5E;&#x6027;&#xFF0C;&#x4E0D;&#x662F;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;&#x7236;&#x4EB2;&apos;</span>; <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x57FA;&#x672C;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)</span>
    <span class="hljs-keyword">this</span>.arr = [<span class="hljs-number">1</span>]; <span class="hljs-comment">// (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;)</span>
}
Parent.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// -- &#x5C06;&#x9700;&#x8981;&#x590D;&#x7528;&#x3001;&#x5171;&#x4EAB;&#x7684;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A; </span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hello&apos;</span>)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params">like</span>) </span>{
    <span class="hljs-keyword">this</span>.like = like;
}
Child.prototype = <span class="hljs-keyword">new</span> Parent() <span class="hljs-comment">// &#x6838;&#x5FC3;</span>

<span class="hljs-keyword">let</span> boy1 = <span class="hljs-keyword">new</span> Child()
<span class="hljs-keyword">let</span> boy2 = <span class="hljs-keyword">new</span> Child()

<span class="hljs-comment">// &#x4F18;&#x70B9;&#xFF1A;&#x5171;&#x4EAB;&#x4E86;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;say&#x65B9;&#x6CD5;</span>
<span class="hljs-built_in">console</span>.log(boy1.say(), boy2.say(), boy1.say === boy2.say); <span class="hljs-comment">// hello , hello , true</span>

<span class="hljs-comment">// &#x7F3A;&#x70B9;1&#xFF1A;&#x4E0D;&#x80FD;&#x4F20;&#x53C2;&#x6570;</span>
<span class="hljs-comment">// &#x7F3A;&#x70B9;2&#xFF1A;</span>
<span class="hljs-built_in">console</span>.log(boy1.name, boy2.name, boy1.name===boy2.name); <span class="hljs-comment">// &#x7236;&#x4EB2;&#xFF0C;&#x7236;&#x4EB2;&#xFF0C;true</span>

boy1.arr.push(<span class="hljs-number">2</span>); <span class="hljs-comment">// &#x4FEE;&#x6539;&#x4E86;boy1&#x7684;arr&#x5C5E;&#x6027;&#xFF0C;boy2&#x7684;arr&#x5C5E;&#x6027;&#xFF0C;&#x4E5F;&#x4F1A;&#x53D8;&#x5316;&#xFF0C;&#x56E0;&#x4E3A;&#x4E24;&#x4E2A;&#x5B9E;&#x4F8B;&#x7684;&#x539F;&#x578B;&#x4E0A;(Child.prototype)&#x6709;&#x4E86;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;arr&#xFF1B;&#x6240;&#x4EE5;&#x53EA;&#x8981;&#x4FEE;&#x6539;&#x4E86;boy1.arr,boy2.arr&#x7684;&#x5C5E;&#x6027;&#x4E5F;&#x4F1A;&#x53D8;&#x5316;&#x3002;  ----  &#x539F;&#x578B;&#x4E0A;&#x7684;arr&#x5C5E;&#x6027;&#x662F;&#x5171;&#x4EAB;&#x7684;&#x3002;</span>
<span class="hljs-built_in">console</span>.log(boy2.arr); <span class="hljs-comment">// [1,2]</span>

&#x6CE8;&#x610F;&#xFF1A;&#x4FEE;&#x6539;boy1&#x7684;name&#x5C5E;&#x6027;&#xFF0C;&#x662F;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230;boy2.name&#x3002;&#x56E0;&#x4E3A;name&#x662F;&#x57FA;&#x672C;&#x5C5E;&#x6027;&#xFF0C;&#x4E0D;&#x662F;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x3002;</code></pre><h3 id="articleHeader5">&#x65B9;&#x5F0F;2&#x3001;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;</h3><ul><li>&#x6838;&#x5FC3;&#xFF1A;&#x501F;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x589E;&#x5F3A;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#xFF0C;&#x7B49;&#x4E8E;&#x662F;&#x590D;&#x5236;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x7ED9;&#x5B50;&#x7C7B;&#x3002;</li><li><p>&#x4F18;&#x70B9;&#xFF1A;&#x5B9E;&#x4F8B;&#x4E4B;&#x95F4;&#x72EC;&#x7ACB;&#x3002;</p><ul><li>&#x521B;&#x5EFA;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#xFF0C;&#x53EF;&#x4EE5;&#x5411;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x53C2;&#x6570;&#x3002;</li><li>&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x4E0D;&#x5171;&#x4EAB;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x3002;&#x5982;arr&#x5C5E;&#x6027;</li></ul></li><li><p>&#x7F3A;&#x70B9;&#xFF1A;</p><ul><li>&#x7236;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&#x4E0D;&#x80FD;&#x590D;&#x7528;</li></ul><blockquote>&#x7531;&#x4E8E;&#x65B9;&#x6CD5;&#x5728;&#x7236;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x5B9A;&#x4E49;&#xFF0C;&#x5BFC;&#x81F4;&#x65B9;&#x6CD5;&#x4E0D;&#x80FD;&#x590D;&#x7528;(&#x56E0;&#x4E3A;&#x6BCF;&#x6B21;&#x521B;&#x5EFA;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x90FD;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x904D;&#x65B9;&#x6CD5;)&#x3002;&#x6BD4;&#x5982;say&#x65B9;&#x6CD5;&#x3002;(&#x65B9;&#x6CD5;&#x5E94;&#x8BE5;&#x8981;&#x590D;&#x7528;&#x3001;&#x5171;&#x4EAB;)</blockquote><ul><li>&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#xFF0C;&#x7EE7;&#x627F;&#x4E0D;&#x4E86;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#x3002;(&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x7528;&#x5230;&#x539F;&#x578B;)</li></ul></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent(name) {
    this.name = name; // &#x5B9E;&#x4F8B;&#x57FA;&#x672C;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)
     this.arr = [1]; // (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;)
    this.say = function() { // &#x5B9E;&#x4F8B;&#x5F15;&#x7528;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x590D;&#x7528;&#xFF0C;&#x9700;&#x8981;&#x5171;&#x4EAB;)
        console.log(&apos;hello&apos;)
    }
}
function Child(name,like) {
    Parent.call(this,name);  // &#x6838;&#x5FC3;
    this.like = like;
}
let boy1 = new Child(&apos;&#x5C0F;&#x7EA2;&apos;,&apos;apple&apos;);
let boy2 = new Child(&apos;&#x5C0F;&#x660E;&apos;, &apos;orange &apos;);

// &#x4F18;&#x70B9;1&#xFF1A;&#x53EF;&#x4F20;&#x53C2;
console.log(boy1.name, boy2.name); // &#x5C0F;&#x7EA2;&#xFF0C; &#x5C0F;&#x660E;

// &#x4F18;&#x70B9;2&#xFF1A;&#x4E0D;&#x5171;&#x4EAB;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;
boy1.arr.push(2);
console.log(boy1.arr,boy2.arr);// [1,2] [1]

// &#x7F3A;&#x70B9;1&#xFF1A;&#x65B9;&#x6CD5;&#x4E0D;&#x80FD;&#x590D;&#x7528;
console.log(boy1.say === boy2.say) // false (&#x8BF4;&#x660E;&#xFF0C;boy1&#x548C;boy2 
&#x7684;say&#x65B9;&#x6CD5;&#x662F;&#x72EC;&#x7ACB;&#xFF0C;&#x4E0D;&#x662F;&#x5171;&#x4EAB;&#x7684;)

// &#x7F3A;&#x70B9;2&#xFF1A;&#x4E0D;&#x80FD;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;
Parent.prototype.walk = function () {   // &#x5728;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0A;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;walk&#x65B9;&#x6CD5;&#x3002;
    console.log(&apos;&#x6211;&#x4F1A;&#x8D70;&#x8DEF;&apos;)
}
boy1.walk;  // undefined (&#x8BF4;&#x660E;&#x5B9E;&#x4F8B;&#xFF0C;&#x4E0D;&#x80FD;&#x83B7;&#x5F97;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name; <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x57FA;&#x672C;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)</span>
     <span class="hljs-keyword">this</span>.arr = [<span class="hljs-number">1</span>]; <span class="hljs-comment">// (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;)</span>
    <span class="hljs-keyword">this</span>.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x5F15;&#x7528;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x590D;&#x7528;&#xFF0C;&#x9700;&#x8981;&#x5171;&#x4EAB;)</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hello&apos;</span>)
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params">name,like</span>) </span>{
    Parent.call(<span class="hljs-keyword">this</span>,name);  <span class="hljs-comment">// &#x6838;&#x5FC3;</span>
    <span class="hljs-keyword">this</span>.like = like;
}
<span class="hljs-keyword">let</span> boy1 = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&apos;&#x5C0F;&#x7EA2;&apos;</span>,<span class="hljs-string">&apos;apple&apos;</span>);
<span class="hljs-keyword">let</span> boy2 = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&apos;&#x5C0F;&#x660E;&apos;</span>, <span class="hljs-string">&apos;orange &apos;</span>);

<span class="hljs-comment">// &#x4F18;&#x70B9;1&#xFF1A;&#x53EF;&#x4F20;&#x53C2;</span>
<span class="hljs-built_in">console</span>.log(boy1.name, boy2.name); <span class="hljs-comment">// &#x5C0F;&#x7EA2;&#xFF0C; &#x5C0F;&#x660E;</span>

<span class="hljs-comment">// &#x4F18;&#x70B9;2&#xFF1A;&#x4E0D;&#x5171;&#x4EAB;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;</span>
boy1.arr.push(<span class="hljs-number">2</span>);
<span class="hljs-built_in">console</span>.log(boy1.arr,boy2.arr);<span class="hljs-comment">// [1,2] [1]</span>

<span class="hljs-comment">// &#x7F3A;&#x70B9;1&#xFF1A;&#x65B9;&#x6CD5;&#x4E0D;&#x80FD;&#x590D;&#x7528;</span>
<span class="hljs-built_in">console</span>.log(boy1.say === boy2.say) <span class="hljs-comment">// false (&#x8BF4;&#x660E;&#xFF0C;boy1&#x548C;boy2 </span>
&#x7684;say&#x65B9;&#x6CD5;&#x662F;&#x72EC;&#x7ACB;&#xFF0C;&#x4E0D;&#x662F;&#x5171;&#x4EAB;&#x7684;)

<span class="hljs-comment">// &#x7F3A;&#x70B9;2&#xFF1A;&#x4E0D;&#x80FD;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;</span>
Parent.prototype.walk = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{   <span class="hljs-comment">// &#x5728;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0A;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;walk&#x65B9;&#x6CD5;&#x3002;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6211;&#x4F1A;&#x8D70;&#x8DEF;&apos;</span>)
}
boy1.walk;  <span class="hljs-comment">// undefined (&#x8BF4;&#x660E;&#x5B9E;&#x4F8B;&#xFF0C;&#x4E0D;&#x80FD;&#x83B7;&#x5F97;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;)</span></code></pre><h3 id="articleHeader6">&#x65B9;&#x5F0F;3&#x3001;&#x7EC4;&#x5408;&#x7EE7;&#x627F;</h3><ul><li>&#x6838;&#x5FC3;&#xFF1A;&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x5E76;&#x4FDD;&#x7559;&#x4F20;&#x53C2;&#x7684;&#x4F18;&#x70B9;&#xFF1B;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x5C06;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x5B50;&#x7C7B;&#x539F;&#x578B;&#xFF0C;&#x5B9E;&#x73B0;&#x51FD;&#x6570;&#x590D;&#x7528;&#x3002;</li><li><p>&#x4F18;&#x70B9;&#xFF1A;</p><ul><li>&#x4FDD;&#x7559;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x4F18;&#x70B9;&#xFF1A;&#x521B;&#x5EFA;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#xFF0C;&#x53EF;&#x4EE5;&#x5411;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x53C2;&#x6570;&#x3002;</li><li>&#x4FDD;&#x7559;&#x539F;&#x578B;&#x94FE;&#x7684;&#x4F18;&#x70B9;&#xFF1A;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0A;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x590D;&#x7528;&#x3002;</li><li>&#x4E0D;&#x5171;&#x4EAB;&#x7236;&#x7C7B;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#x3002;&#x6BD4;&#x5982;arr&#x5C5E;&#x6027;</li></ul></li><li><p>&#x7F3A;&#x70B9;&#xFF1A;</p><ul><li>&#x7531;&#x4E8E;&#x8C03;&#x7528;&#x4E86;2&#x6B21;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x65B9;&#x6CD5;&#xFF0C;&#x4F1A;&#x5B58;&#x5728;&#x4E00;&#x4EFD;&#x591A;&#x4F59;&#x7684;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#xFF0C;&#x5177;&#x4F53;&#x539F;&#x56E0;&#x89C1;&#x6587;&#x672B;&#x3002;</li></ul></li><li>&#x6CE8;&#x610F;&#xFF1A;&apos;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&apos;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x8981;&#x8BB0;&#x5F97;&#x4FEE;&#x590D;Child.prototype.constructor&#x6307;&#x5411;</li></ul><blockquote>&#x7B2C;&#x4E00;&#x6B21;Parent.call(this);&#x4ECE;&#x7236;&#x7C7B;&#x62F7;&#x8D1D;&#x4E00;&#x4EFD;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#xFF0C;&#x4F5C;&#x4E3A;&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#xFF0C;<p>&#x7B2C;&#x4E8C;&#x6B21;Child.prototype = new Parent();&#x521B;&#x5EFA;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x5B50;&#x7C7B;&#x539F;&#x578B;&#xFF0C;&#x6B64;&#x65F6;&#x8FD9;&#x4E2A;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x5C31;&#x53C8;&#x6709;&#x4E86;&#x4E00;&#x4EFD;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#xFF0C;&#x4F46;&#x8FD9;&#x4EFD;&#x4F1A;&#x88AB;&#x7B2C;&#x4E00;&#x6B21;&#x62F7;&#x8D1D;&#x6765;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x5C4F;&#x853D;&#x6389;&#xFF0C;&#x6240;&#x4EE5;&#x591A;&#x4F59;&#x3002;</p><p>&#x4E3A;&#x5565;&#x662F;&#x4E24;&#x6B21;&#xFF1F;&#x5982;&#x679C;&#x8FD8;&#x662F;&#xFF0C;&#x4E0D;&#x6E05;&#x695A;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x6587;&#x672B;&#xFF0C;&#x6211;&#x4F1A;&#x8BE6;&#x7EC6;&#x8BB2;&#x89E3;&#xFF01;</p></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent(name) {
    this.name = name; // &#x5B9E;&#x4F8B;&#x57FA;&#x672C;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)
    this.arr = [1]; // (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;)
}
Parent.prototype.say = function() { // --- &#x5C06;&#x9700;&#x8981;&#x590D;&#x7528;&#x3001;&#x5171;&#x4EAB;&#x7684;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A; 
    console.log(&apos;hello&apos;)
}
function Child(name,like) {
    Parent.call(this,name,like) // &#x6838;&#x5FC3;   &#x7B2C;&#x4E8C;&#x6B21;
    this.like = like;
}
Child.prototype = new Parent() // &#x6838;&#x5FC3;   &#x7B2C;&#x4E00;&#x6B21;

&lt;!--&#x8FD9;&#x91CC;&#x662F;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#x7684;&#x4EE3;&#x7801;--&gt;

let boy1 = new Child(&apos;&#x5C0F;&#x7EA2;&apos;,&apos;apple&apos;)
let boy2 = new Child(&apos;&#x5C0F;&#x660E;&apos;,&apos;orange&apos;)

// &#x4F18;&#x70B9;1&#xFF1A;&#x53EF;&#x4EE5;&#x4F20;&#x53C2;&#x6570;
console.log(boy1.name,boy1.like); // &#x5C0F;&#x7EA2;&#xFF0C;apple

// &#x4F18;&#x70B9;2&#xFF1A;&#x53EF;&#x590D;&#x7528;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;
console.log(boy1.say === boy2.say) // true

// &#x4F18;&#x70B9;3&#xFF1A;&#x4E0D;&#x5171;&#x4EAB;&#x7236;&#x7C7B;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#xFF0C;&#x5982;arr&#x5C5E;&#x6027;
boy1.arr.push(2)
console.log(boy1.arr,boy2.arr); // [1,2] [1] &#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x6CA1;&#x6709;&#x5171;&#x4EAB;arr&#x5C5E;&#x6027;&#x3002;

&#x6CE8;&#x610F;&#xFF1A;&#x4E3A;&#x5565;&#x8981;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6307;&#x5411;&#xFF1F;
console.log(boy1.constructor); // Parent &#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x5B9E;&#x4F8B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5C45;&#x7136;&#x662F;Parent&#x3002;
&#x800C;&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x662F;Child,&#x6240;&#x4EE5;&#x8981;&#x8BB0;&#x5F97;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#x3002;&#x4FEE;&#x590D;&#x5982;&#x4E0B;
Child.prototype.constructor = Child;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name; <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x57FA;&#x672C;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)</span>
    <span class="hljs-keyword">this</span>.arr = [<span class="hljs-number">1</span>]; <span class="hljs-comment">// (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;)</span>
}
Parent.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// --- &#x5C06;&#x9700;&#x8981;&#x590D;&#x7528;&#x3001;&#x5171;&#x4EAB;&#x7684;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A; </span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hello&apos;</span>)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params">name,like</span>) </span>{
    Parent.call(<span class="hljs-keyword">this</span>,name,like) <span class="hljs-comment">// &#x6838;&#x5FC3;   &#x7B2C;&#x4E8C;&#x6B21;</span>
    <span class="hljs-keyword">this</span>.like = like;
}
Child.prototype = <span class="hljs-keyword">new</span> Parent() <span class="hljs-comment">// &#x6838;&#x5FC3;   &#x7B2C;&#x4E00;&#x6B21;</span>

&lt;!--&#x8FD9;&#x91CC;&#x662F;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#x7684;&#x4EE3;&#x7801;--&gt;

<span class="hljs-keyword">let</span> boy1 = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&apos;&#x5C0F;&#x7EA2;&apos;</span>,<span class="hljs-string">&apos;apple&apos;</span>)
<span class="hljs-keyword">let</span> boy2 = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&apos;&#x5C0F;&#x660E;&apos;</span>,<span class="hljs-string">&apos;orange&apos;</span>)

<span class="hljs-comment">// &#x4F18;&#x70B9;1&#xFF1A;&#x53EF;&#x4EE5;&#x4F20;&#x53C2;&#x6570;</span>
<span class="hljs-built_in">console</span>.log(boy1.name,boy1.like); <span class="hljs-comment">// &#x5C0F;&#x7EA2;&#xFF0C;apple</span>

<span class="hljs-comment">// &#x4F18;&#x70B9;2&#xFF1A;&#x53EF;&#x590D;&#x7528;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;</span>
<span class="hljs-built_in">console</span>.log(boy1.say === boy2.say) <span class="hljs-comment">// true</span>

<span class="hljs-comment">// &#x4F18;&#x70B9;3&#xFF1A;&#x4E0D;&#x5171;&#x4EAB;&#x7236;&#x7C7B;&#x7684;&#x5F15;&#x7528;&#x5C5E;&#x6027;&#xFF0C;&#x5982;arr&#x5C5E;&#x6027;</span>
boy1.arr.push(<span class="hljs-number">2</span>)
<span class="hljs-built_in">console</span>.log(boy1.arr,boy2.arr); <span class="hljs-comment">// [1,2] [1] &#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x6CA1;&#x6709;&#x5171;&#x4EAB;arr&#x5C5E;&#x6027;&#x3002;</span>

&#x6CE8;&#x610F;&#xFF1A;&#x4E3A;&#x5565;&#x8981;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6307;&#x5411;&#xFF1F;
<span class="hljs-built_in">console</span>.log(boy1.constructor); <span class="hljs-comment">// Parent &#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x5B9E;&#x4F8B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5C45;&#x7136;&#x662F;Parent&#x3002;</span>
&#x800C;&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x662F;Child,&#x6240;&#x4EE5;&#x8981;&#x8BB0;&#x5F97;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#x3002;&#x4FEE;&#x590D;&#x5982;&#x4E0B;
Child.prototype.constructor = Child;</code></pre><blockquote>&#x5176;&#x5B9E;Child.prototype = new Parent()<p>console.log(Child.prototype.__proto__ === Parten.prototype); // true</p></blockquote><h3 id="articleHeader7">&#x65B9;&#x5F0F;4&#x3001;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x4F18;&#x5316;1</h3><ul><li>&#x6838;&#x5FC3;&#xFF1A;</li></ul><blockquote>&#x901A;&#x8FC7;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x780D;&#x6389;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x6837;&#x5728;&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x4E0D;&#x4F1A;&#x521D;&#x59CB;&#x5316;&#x4E24;&#x6B21;&#x5B9E;&#x4F8B;&#xFF0C;&#x907F;&#x514D;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x7684;&#x7F3A;&#x70B9;&#x3002;</blockquote><ul><li><p>&#x4F18;&#x70B9;&#xFF1A;</p><ul><li>&#x53EA;&#x8C03;&#x7528;&#x4E00;&#x6B21;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</li><li>&#x4FDD;&#x7559;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x4F18;&#x70B9;&#xFF1A;&#x521B;&#x5EFA;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#xFF0C;&#x53EF;&#x4EE5;&#x5411;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F20;&#x53C2;&#x6570;&#x3002;</li><li>&#x4FDD;&#x7559;&#x539F;&#x578B;&#x94FE;&#x7684;&#x4F18;&#x70B9;&#xFF1A;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0A;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x590D;&#x7528;&#x3002;</li></ul></li><li><p>&#x7F3A;&#x70B9;&#xFF1A;</p><ul><li>&#x4FEE;&#x6B63;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6307;&#x5411;&#x4E4B;&#x540E;&#xFF0C;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x53D1;&#x751F;&#x53D8;&#x5316;(&#x8FD9;&#x662F;&#x6211;&#x4EEC;&#x4E0D;&#x5E0C;&#x671B;&#x7684;)</li></ul></li><li>&#x6CE8;&#x610F;&#xFF1A;&apos;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x4F18;&#x5316;1&apos;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x8981;&#x8BB0;&#x5F97;&#x4FEE;&#x590D;Child.prototype.constructor&#x6307;&#x5411;</li></ul><blockquote>&#x539F;&#x56E0;&#x662F;&#xFF1A;&#x4E0D;&#x80FD;&#x5224;&#x65AD;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;&#x76F4;&#x63A5;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5230;&#x5E95;&#x662F;&#x5B50;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x8FD8;&#x662F;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent(name) {
    this.name = name; // &#x5B9E;&#x4F8B;&#x57FA;&#x672C;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)
    this.arr = [1]; // (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;)
}
Parent.prototype.say = function() { // --- &#x5C06;&#x9700;&#x8981;&#x590D;&#x7528;&#x3001;&#x5171;&#x4EAB;&#x7684;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A; 
    console.log(&apos;hello&apos;)
}
function Child(name,like) {
    Parent.call(this,name,like) // &#x6838;&#x5FC3;  
    this.like = like;
}
Child.prototype = Parent.prototype // &#x6838;&#x5FC3;  &#x5B50;&#x7C7B;&#x539F;&#x578B;&#x548C;&#x7236;&#x7C7B;&#x539F;&#x578B;&#xFF0C;&#x5B9E;&#x8D28;&#x4E0A;&#x662F;&#x540C;&#x4E00;&#x4E2A;

&lt;!--&#x8FD9;&#x91CC;&#x662F;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#x7684;&#x4EE3;&#x7801;--&gt;

let boy1 = new Child(&apos;&#x5C0F;&#x7EA2;&apos;,&apos;apple&apos;)
let boy2 = new Child(&apos;&#x5C0F;&#x660E;&apos;,&apos;orange&apos;)
let p1 = new Parent(&apos;&#x5C0F;&#x7238;&#x7238;&apos;)

// &#x4F18;&#x70B9;1&#xFF1A;&#x53EF;&#x4EE5;&#x4F20;&#x53C2;&#x6570;
console.log(boy1.name,boy1.like); // &#x5C0F;&#x7EA2;&#xFF0C;apple
// &#x4F18;&#x70B9;2&#xFF1A;
console.log(boy1.say === boy2.say) // true

// &#x7F3A;&#x70B9;1&#xFF1A;&#x5F53;&#x4FEE;&#x590D;&#x5B50;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6307;&#x5411;&#x540E;&#xFF0C;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#x4E5F;&#x4F1A;&#x8DDF;&#x7740;&#x53D8;&#x4E86;&#x3002;
&#x5177;&#x4F53;&#x539F;&#x56E0;&#xFF1A;&#x56E0;&#x4E3A;&#x662F;&#x901A;&#x8FC7;&#x539F;&#x578B;&#x6765;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x7684;&#xFF0C;Child.prototype&#x7684;&#x4E0A;&#x9762;&#x662F;&#x6CA1;&#x6709;constructor&#x5C5E;&#x6027;&#x7684;&#xFF0C;&#x5C31;&#x4F1A;&#x5F80;&#x4E0A;&#x627E;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x627E;&#x5230;&#x4E86;Parent.prototype&#x4E0A;&#x9762;&#x7684;constructor&#x5C5E;&#x6027;&#xFF1B;&#x5F53;&#x4F60;&#x4FEE;&#x6539;&#x4E86;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;construtor&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x6709;&#x7684;constructor&#x7684;&#x6307;&#x5411;&#x90FD;&#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x3002;

&#x6CA1;&#x4FEE;&#x590D;&#x4E4B;&#x524D;&#xFF1A;console.log(boy1.constructor); // Parent
&#x4FEE;&#x590D;&#x4EE3;&#x7801;&#xFF1A;Child.prototype.constructor = Child
&#x4FEE;&#x590D;&#x4E4B;&#x540E;&#xFF1A;console.log(boy1.constructor); // Child
          console.log(p1.constructor);// Child &#x8FD9;&#x91CC;&#x5C31;&#x662F;&#x5B58;&#x5728;&#x7684;&#x95EE;&#x9898;(&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x662F;Parent)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span><span class="hljs-params">(<span class="hljs-keyword">name</span>)</span> <span class="hljs-comment">{
    this.name = name; // &#x5B9E;&#x4F8B;&#x57FA;&#x672C;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)
    this.arr = [1]; // (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;)
}</span>
<span class="hljs-title">Parent</span>.<span class="hljs-title">prototype</span>.<span class="hljs-title">say</span> = <span class="hljs-title">function</span><span class="hljs-params">()</span> <span class="hljs-comment">{ // --- &#x5C06;&#x9700;&#x8981;&#x590D;&#x7528;&#x3001;&#x5171;&#x4EAB;&#x7684;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A; 
    console.log(&apos;hello&apos;)
}</span>
<span class="hljs-title">function</span> <span class="hljs-title">Child</span><span class="hljs-params">(<span class="hljs-keyword">name</span>,like)</span> <span class="hljs-comment">{
    Parent.call(this,name,like) // &#x6838;&#x5FC3;  
    this.like = like;
}</span>
<span class="hljs-title">Child</span>.<span class="hljs-title">prototype</span> = <span class="hljs-title">Parent</span>.<span class="hljs-title">prototype</span> <span class="hljs-comment">// &#x6838;&#x5FC3;  &#x5B50;&#x7C7B;&#x539F;&#x578B;&#x548C;&#x7236;&#x7C7B;&#x539F;&#x578B;&#xFF0C;&#x5B9E;&#x8D28;&#x4E0A;&#x662F;&#x540C;&#x4E00;&#x4E2A;</span>

&lt;!--&#x8FD9;&#x91CC;&#x662F;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#x7684;&#x4EE3;&#x7801;--&gt;

<span class="hljs-title">let</span> <span class="hljs-title">boy1</span> = <span class="hljs-title">new</span> <span class="hljs-title">Child</span><span class="hljs-params">(<span class="hljs-string">&apos;&#x5C0F;&#x7EA2;&apos;</span>,<span class="hljs-string">&apos;apple&apos;</span>)</span>
<span class="hljs-title">let</span> <span class="hljs-title">boy2</span> = <span class="hljs-title">new</span> <span class="hljs-title">Child</span><span class="hljs-params">(<span class="hljs-string">&apos;&#x5C0F;&#x660E;&apos;</span>,<span class="hljs-string">&apos;orange&apos;</span>)</span>
<span class="hljs-title">let</span> <span class="hljs-title">p1</span> = <span class="hljs-title">new</span> <span class="hljs-title">Parent</span><span class="hljs-params">(<span class="hljs-string">&apos;&#x5C0F;&#x7238;&#x7238;&apos;</span>)</span>

<span class="hljs-comment">// &#x4F18;&#x70B9;1&#xFF1A;&#x53EF;&#x4EE5;&#x4F20;&#x53C2;&#x6570;</span>
<span class="hljs-title">console</span>.<span class="hljs-title">log</span><span class="hljs-params">(boy1.<span class="hljs-keyword">name</span>,boy1.like)</span>;</span> <span class="hljs-comment">// &#x5C0F;&#x7EA2;&#xFF0C;apple</span>
<span class="hljs-comment">// &#x4F18;&#x70B9;2&#xFF1A;</span>
console.log(boy1.say === boy2.say) <span class="hljs-comment">// true</span>

<span class="hljs-comment">// &#x7F3A;&#x70B9;1&#xFF1A;&#x5F53;&#x4FEE;&#x590D;&#x5B50;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6307;&#x5411;&#x540E;&#xFF0C;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#x4E5F;&#x4F1A;&#x8DDF;&#x7740;&#x53D8;&#x4E86;&#x3002;</span>
&#x5177;&#x4F53;&#x539F;&#x56E0;&#xFF1A;&#x56E0;&#x4E3A;&#x662F;&#x901A;&#x8FC7;&#x539F;&#x578B;&#x6765;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x7684;&#xFF0C;Child.prototype&#x7684;&#x4E0A;&#x9762;&#x662F;&#x6CA1;&#x6709;<span class="hljs-function"><span class="hljs-keyword">constructor</span>&#x5C5E;&#x6027;&#x7684;&#xFF0C;&#x5C31;&#x4F1A;&#x5F80;&#x4E0A;&#x627E;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x627E;&#x5230;&#x4E86;<span class="hljs-title">Parent</span>.<span class="hljs-title">prototype</span>&#x4E0A;&#x9762;&#x7684;<span class="hljs-title">constructor</span>&#x5C5E;&#x6027;&#xFF1B;&#x5F53;&#x4F60;&#x4FEE;&#x6539;&#x4E86;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x7684;<span class="hljs-title">construtor</span>&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x6709;&#x7684;<span class="hljs-title">constructor</span>&#x7684;&#x6307;&#x5411;&#x90FD;&#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x3002;

&#x6CA1;&#x4FEE;&#x590D;&#x4E4B;&#x524D;&#xFF1A;<span class="hljs-title">console</span>.<span class="hljs-title">log</span><span class="hljs-params">(boy1.<span class="hljs-keyword">constructor</span>)</span>;</span> <span class="hljs-comment">// Parent</span>
&#x4FEE;&#x590D;&#x4EE3;&#x7801;&#xFF1A;Child.prototype.<span class="hljs-keyword">constructor</span> = Child
&#x4FEE;&#x590D;&#x4E4B;&#x540E;&#xFF1A;console.log(boy1.<span class="hljs-keyword">constructor</span>); <span class="hljs-comment">// Child</span>
          console.log(p1.<span class="hljs-keyword">constructor</span>);<span class="hljs-comment">// Child &#x8FD9;&#x91CC;&#x5C31;&#x662F;&#x5B58;&#x5728;&#x7684;&#x95EE;&#x9898;(&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x662F;Parent)</span></code></pre><h3 id="articleHeader8">&#x65B9;&#x5F0F;5&#x3001;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x4F18;&#x5316;2 &#x53C8;&#x79F0; &#x5BC4;&#x751F;&#x7EC4;&#x5408;&#x7EE7;&#x627F; --- &#x5B8C;&#x7F8E;&#x65B9;&#x5F0F;</h3><ul><li>&#x6838;&#x5FC3;&#xFF1A;</li><li>&#x4F18;&#x70B9;&#xFF1A;&#x5B8C;&#x7F8E;i</li><li>&#x7F3A;&#x70B9;&#xFF1A;---</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent(name) {
    this.name = name; // &#x5B9E;&#x4F8B;&#x57FA;&#x672C;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)
    this.arr = [1]; // (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;)
}
Parent.prototype.say = function() { // --- &#x5C06;&#x9700;&#x8981;&#x590D;&#x7528;&#x3001;&#x5171;&#x4EAB;&#x7684;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A; 
    console.log(&apos;hello&apos;)
}
function Child(name,like) {
    Parent.call(this,name,like) // &#x6838;&#x5FC3;  
    this.like = like;
}
Child.prototype = Object.create(Parent.prototype) // &#x6838;&#x5FC3;  &#x901A;&#x8FC7;&#x521B;&#x5EFA;&#x4E2D;&#x95F4;&#x5BF9;&#x8C61;&#xFF0C;&#x5B50;&#x7C7B;&#x539F;&#x578B;&#x548C;&#x7236;&#x7C7B;&#x539F;&#x578B;&#xFF0C;&#x5C31;&#x4F1A;&#x9694;&#x79BB;&#x5F00;&#x3002;&#x4E0D;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x5566;&#xFF0C;&#x6709;&#x6548;&#x907F;&#x514D;&#x4E86;&#x65B9;&#x5F0F;4&#x7684;&#x7F3A;&#x70B9;&#x3002;

&lt;!--&#x8FD9;&#x91CC;&#x662F;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#x7684;&#x4EE3;&#x7801;--&gt;
Child.prototype.constructor = Child

let boy1 = new Child(&apos;&#x5C0F;&#x7EA2;&apos;,&apos;apple&apos;)
let boy2 = new Child(&apos;&#x5C0F;&#x660E;&apos;,&apos;orange&apos;)
let p1 = new Parent(&apos;&#x5C0F;&#x7238;&#x7238;&apos;)


&#x6CE8;&#x610F;&#xFF1A;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x4E5F;&#x8981;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;
&#x4FEE;&#x590D;&#x4EE3;&#x7801;&#xFF1A;Child.prototype.constructor = Child
&#x4FEE;&#x590D;&#x4E4B;&#x540E;&#xFF1A;console.log(boy1.constructor); // Child
          console.log(p1.constructor);// Parent  &#x5B8C;&#x7F8E;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name; <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x57FA;&#x672C;&#x5C5E;&#x6027; (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;&#xFF0C;&#x4E0D;&#x5171;&#x4EAB;)</span>
    <span class="hljs-keyword">this</span>.arr = [<span class="hljs-number">1</span>]; <span class="hljs-comment">// (&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x5F3A;&#x8C03;&#x79C1;&#x6709;)</span>
}
Parent.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// --- &#x5C06;&#x9700;&#x8981;&#x590D;&#x7528;&#x3001;&#x5171;&#x4EAB;&#x7684;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x7236;&#x7C7B;&#x539F;&#x578B;&#x4E0A; </span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hello&apos;</span>)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params">name,like</span>) </span>{
    Parent.call(<span class="hljs-keyword">this</span>,name,like) <span class="hljs-comment">// &#x6838;&#x5FC3;  </span>
    <span class="hljs-keyword">this</span>.like = like;
}
Child.prototype = <span class="hljs-built_in">Object</span>.create(Parent.prototype) <span class="hljs-comment">// &#x6838;&#x5FC3;  &#x901A;&#x8FC7;&#x521B;&#x5EFA;&#x4E2D;&#x95F4;&#x5BF9;&#x8C61;&#xFF0C;&#x5B50;&#x7C7B;&#x539F;&#x578B;&#x548C;&#x7236;&#x7C7B;&#x539F;&#x578B;&#xFF0C;&#x5C31;&#x4F1A;&#x9694;&#x79BB;&#x5F00;&#x3002;&#x4E0D;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x5566;&#xFF0C;&#x6709;&#x6548;&#x907F;&#x514D;&#x4E86;&#x65B9;&#x5F0F;4&#x7684;&#x7F3A;&#x70B9;&#x3002;</span>

&lt;!--&#x8FD9;&#x91CC;&#x662F;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6307;&#x5411;&#x7684;&#x4EE3;&#x7801;--&gt;
Child.prototype.constructor = Child

<span class="hljs-keyword">let</span> boy1 = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&apos;&#x5C0F;&#x7EA2;&apos;</span>,<span class="hljs-string">&apos;apple&apos;</span>)
<span class="hljs-keyword">let</span> boy2 = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&apos;&#x5C0F;&#x660E;&apos;</span>,<span class="hljs-string">&apos;orange&apos;</span>)
<span class="hljs-keyword">let</span> p1 = <span class="hljs-keyword">new</span> Parent(<span class="hljs-string">&apos;&#x5C0F;&#x7238;&#x7238;&apos;</span>)


&#x6CE8;&#x610F;&#xFF1A;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x4E5F;&#x8981;&#x4FEE;&#x590D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;
&#x4FEE;&#x590D;&#x4EE3;&#x7801;&#xFF1A;Child.prototype.constructor = Child
&#x4FEE;&#x590D;&#x4E4B;&#x540E;&#xFF1A;<span class="hljs-built_in">console</span>.log(boy1.constructor); <span class="hljs-comment">// Child</span>
          <span class="hljs-built_in">console</span>.log(p1.constructor);<span class="hljs-comment">// Parent  &#x5B8C;&#x7F8E;</span></code></pre><h2 id="articleHeader9">&#x7B2C;&#x4E09;&#x90E8;&#x5206;&#xFF1A;&#x5176;&#x4ED6; + &#x76F8;&#x5173;&#x95EE;&#x9898;&#x89E3;&#x7B54;</h2><h3 id="articleHeader10">1&#x3001;Object.create() &#x6216; Object.create(object, [,propertiesObject])</h3><blockquote>Object.create() &#x7684;&#x7B2C;&#x4E8C;&#x53C2;&#x6570;&#xFF0C;&#x662F;&#x53EF;&#x9009;&#x7684;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- Object.create() &#x7684;&#x5185;&#x90E8;&#x539F;&#x7406;&#xFF1A;
// &#x5176;&#x4E2D;&#xFF0C;o &#x662F;&#x65B0;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;(&#x5BF9;&#x8C61;)
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}
&#x6CE8;&#x610F;&#xFF1A;&#x4E4B;&#x524D;&#xFF0C;Object.create()&#x6CA1;&#x6709;&#x51FA;&#x73B0;&#x4E4B;&#x524D;&#xFF0C;&#x5C31;&#x662F;&#x91C7;&#x7528;&#x7684;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x3002;
&#x53C2;&#x89C1;&#x300A;js&#x9AD8;&#x7EA7;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x300B;P170" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>- <span class="hljs-built_in">Object</span>.create() &#x7684;&#x5185;&#x90E8;&#x539F;&#x7406;&#xFF1A;
<span class="hljs-comment">// &#x5176;&#x4E2D;&#xFF0C;o &#x662F;&#x65B0;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;(&#x5BF9;&#x8C61;)</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">object</span>(<span class="hljs-params">o</span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{}
    F.prototype = o
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F()
}
&#x6CE8;&#x610F;&#xFF1A;&#x4E4B;&#x524D;&#xFF0C;<span class="hljs-built_in">Object</span>.create()&#x6CA1;&#x6709;&#x51FA;&#x73B0;&#x4E4B;&#x524D;&#xFF0C;&#x5C31;&#x662F;&#x91C7;&#x7528;&#x7684;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x3002;
&#x53C2;&#x89C1;&#x300A;js&#x9AD8;&#x7EA7;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x300B;P170</code></pre><ul><li>Object.create() &#x505A;&#x4E86;&#x54EA;&#x51E0;&#x4EF6;&#x4E8B;&#x60C5;&#xFF1F;</li></ul><ol><li>&#x521B;&#x5EFA;&#x7A7A;&#x5BF9;&#x8C61;{}</li><li>&#x6307;&#x5B9A;&#x7A7A;&#x5BF9;&#x8C61;{}&#x7684;&#x539F;&#x578B;&#x4E3A;Object.create()&#x7684;&#x53C2;&#x6570;&#x3002;</li></ol><ul><li>new &#x4E0E; Object.create() &#x7684;&#x533A;&#x522B;&#xFF1F;</li></ul><blockquote>&#x4EE5;&#x4E0B;&#x662F;&#x6211;&#x7684;&#x4E2A;&#x4EBA;&#x89C1;&#x89E3;&#xFF0C;(&#x5982;&#x6709;&#x4E0D;&#x5BF9;&#xFF0C;&#x8FD8;&#x8BF7;&#x6307;&#x6B63;)&#xFF1A;<p>new &#x4EA7;&#x751F;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x4F18;&#x5148;&#x83B7;&#x53D6;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#xFF1B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E0A;&#x6CA1;&#x6709;&#x5BF9;&#x5E94;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x624D;&#x4F1A;&#x53BB;&#x539F;&#x578B;&#x4E0A;&#x67E5;&#x627E;&#xFF1B;&#x5982;&#x679C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x4EE5;&#x53CA;&#x539F;&#x578B;&#x4E2D;&#x90FD;&#x6CA1;&#x6709;&#x5BF9;&#x5E94;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5C31;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><p>Object.create() &#x4EA7;&#x751F;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x53EA;&#x4F1A;&#x5728;&#x539F;&#x578B;&#x4E0A;&#x8FDB;&#x884C;&#x67E5;&#x627E;&#x5C5E;&#x6027;&#xFF0C;&#x539F;&#x578B;&#x4E0A;&#x6CA1;&#x6709;&#x5BF9;&#x5E94;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5C31;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let Base1 = function() {
  this.a = 1
}
let o1 = new Base1()
let o2 = Object.create(Base1.prototype)
console.log(o1.a); // 1
console.log(o2.a); // undefined



let Base2 = function() {}
Base2.prototype.a = &apos;aa&apos;
let o3 = new Base2()
let o4 = Object.create(Base2.prototype)
console.log(o3.a); // aa
console.log(o4.a); // aa



let Base3 = function() {
  this.a = 1
}
Base3.prototype.a = &apos;aa&apos;
let o5 = new Base3()
let o6 = Object.create(Base3.prototype)
console.log(o5.a); // 1
console.log(o6.a); // aa" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> Base1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.a = <span class="hljs-number">1</span>
}
<span class="hljs-keyword">let</span> o1 = <span class="hljs-keyword">new</span> Base1()
<span class="hljs-keyword">let</span> o2 = <span class="hljs-built_in">Object</span>.create(Base1.prototype)
<span class="hljs-built_in">console</span>.log(o1.a); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(o2.a); <span class="hljs-comment">// undefined</span>



<span class="hljs-keyword">let</span> Base2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
Base2.prototype.a = <span class="hljs-string">&apos;aa&apos;</span>
<span class="hljs-keyword">let</span> o3 = <span class="hljs-keyword">new</span> Base2()
<span class="hljs-keyword">let</span> o4 = <span class="hljs-built_in">Object</span>.create(Base2.prototype)
<span class="hljs-built_in">console</span>.log(o3.a); <span class="hljs-comment">// aa</span>
<span class="hljs-built_in">console</span>.log(o4.a); <span class="hljs-comment">// aa</span>



<span class="hljs-keyword">let</span> Base3 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.a = <span class="hljs-number">1</span>
}
Base3.prototype.a = <span class="hljs-string">&apos;aa&apos;</span>
<span class="hljs-keyword">let</span> o5 = <span class="hljs-keyword">new</span> Base3()
<span class="hljs-keyword">let</span> o6 = <span class="hljs-built_in">Object</span>.create(Base3.prototype)
<span class="hljs-built_in">console</span>.log(o5.a); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(o6.a); <span class="hljs-comment">// aa</span></code></pre><h3 id="articleHeader11">2&#x3001;new &#x7684;&#x8FC7;&#x7A0B;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="funciton Func(name) {
    this.name = name
}
let p = new Func(&apos;&#x5C0F;&#x7EA2;&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code>funciton <span class="hljs-function"><span class="hljs-keyword">Func</span><span class="hljs-params">(name)</span> {</span>
    this.name = name
}
let p = new <span class="hljs-function"><span class="hljs-keyword">Func</span><span class="hljs-params">(<span class="hljs-string">&apos;&#x5C0F;&#x7EA2;&apos;</span>)</span></span></code></pre><p>new &#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x505A;&#x4E86;&#x5565;&#xFF1F;&#x505A;&#x4E86;&#x56DB;&#x4EF6;&#x4E8B;&#x3002;</p><ul><li>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7A7A;&#x5BF9;&#x8C61;obj&#xFF1A;let obj = new Object()</li><li>&#x8BBE;&#x7F6E;&#x539F;&#x578B;&#x94FE;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj.__proto__ = Func.prototype
&#x5C31;&#x662F;&#xFF1A;&#x5C06;&#x65B0;&#x5BF9;&#x8C61;&#x7684;__proto__ &#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;prototype" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code><span class="hljs-title">obj</span>.__proto__ = <span class="hljs-type">Func</span>.proto<span class="hljs-keyword">type</span>
&#x5C31;&#x662F;&#xFF1A;&#x5C06;&#x65B0;&#x5BF9;&#x8C61;&#x7684;__proto__ &#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;proto<span class="hljs-keyword">type</span></code></pre><ul><li>&#x5C06;&#x6784;&#x9020;&#x51FD;&#x6570;Func&#x7684;this&#x6307;&#x5411;obj,&#x5E76;&#x6267;&#x884C;&#x6784;&#x9020;&#x51FD;&#x6570;Func</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let result = Func.call(obj)
&#x5C31;&#x662F;&#xFF1A;&#x4F7F;&#x7528;call&#x6216;apply,&#x5C06;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;this&#x7ED1;&#x5B9A;&#x5230;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x6267;&#x884C;&#x6784;&#x9020;&#x51FD;&#x6570;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code>let result = <span class="hljs-function"><span class="hljs-keyword">Func</span>.<span class="hljs-title">call</span><span class="hljs-params">(obj)</span></span>
&#x5C31;&#x662F;&#xFF1A;&#x4F7F;&#x7528;<span class="hljs-built_in">call</span>&#x6216;apply,&#x5C06;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;this&#x7ED1;&#x5B9A;&#x5230;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x6267;&#x884C;&#x6784;&#x9020;&#x51FD;&#x6570;</code></pre><ul><li>&#x5224;&#x65AD;&#x6784;&#x9020;&#x51FD;&#x6570;Func&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x7C7B;&#x578B;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5982;&#x679C;&#x662F;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF0C;&#x5C31;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x5982;&#x679C;&#x662F;&#x503C;&#x7C7B;&#x578B;&#x6216;&#x6CA1;&#x6709;return&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x7A7A;&#x5BF9;&#x8C61;obj&#x3002;
if (typeof(result) === &quot;object&quot;){  
  func=result;  
}  
else{  
   func=obj; // &#x9ED8;&#x8BA4;&#x8FD4;&#x56DE;
}
&#x6CE8;&#x610F;&#xFF1A;js&#x4E2D;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x9ED8;&#x8BA4;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x65B0;&#x521B;&#x5EFA;&#x7684;&#x7A7A;&#x5BF9;&#x8C61;obj" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code>&#x5982;&#x679C;&#x662F;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF0C;&#x5C31;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x5982;&#x679C;&#x662F;&#x503C;&#x7C7B;&#x578B;&#x6216;&#x6CA1;&#x6709;<span class="hljs-keyword">return</span>&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x7A7A;&#x5BF9;&#x8C61;obj&#x3002;
<span class="hljs-keyword">if</span> (typeof(result) === <span class="hljs-string">&quot;object&quot;</span>){  
  <span class="hljs-function"><span class="hljs-keyword">func</span>=<span class="hljs-title">result</span>;  </span>
}  
<span class="hljs-keyword">else</span>{  
   <span class="hljs-function"><span class="hljs-keyword">func</span>=<span class="hljs-title">obj</span>; // &#x9ED8;&#x8BA4;&#x8FD4;&#x56DE;</span>
}
&#x6CE8;&#x610F;&#xFF1A;js&#x4E2D;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x9ED8;&#x8BA4;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x65B0;&#x521B;&#x5EFA;&#x7684;&#x7A7A;&#x5BF9;&#x8C61;obj</code></pre><h3 id="articleHeader12">3&#x3001;&#x4E3A;&#x5565;&#x2018;&#x7EC4;&#x5408;&#x7EE7;&#x627F;&#x2019;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x4F1A;&#x6267;&#x884C;&#x4E24;&#x6B21;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF1F;&#xFF1F;</h3><ul><li>&#x7B2C;&#x4E00;&#x6B21;&#xFF1A;Child.prototype = new Parent()</li></ul><blockquote>&#x2018;new &#x7684;&#x8FC7;&#x7A0B;&#x2019;&#x7684;&#x7B2C;&#x4E09;&#x6B65;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x6267;&#x884C;&#x4E86;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</blockquote><ul><li>&#x7B2C;&#x4E8C;&#x6B21;&#xFF1A;Parent.call(this,name,like)</li></ul><blockquote>call&#x7684;&#x4F5C;&#x7528;&#x662F;&#x6539;&#x53D8;&#x51FD;&#x6570;&#x6267;&#x884C;&#x65F6;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x3002;&#x6BD4;&#x5982;&#xFF1A;A.call(B)&#x3002;&#x5176;&#x5B9E;&#xFF0C;&#x6700;&#x7EC8;&#x6267;&#x884C;&#x7684;&#x8FD8;&#x662F;A&#x51FD;&#x6570;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x662F;&#x7528;B&#x6765;&#x8C03;&#x7528;&#x800C;&#x5DF2;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x4F60;&#x5C31;&#x61C2;&#x4E86;Parent.call(this,name,like) ,&#x4E5F;&#x5C31;&#x662F;&#x6267;&#x884C;&#x4E86;&#x7236;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</blockquote><h2 id="articleHeader13">&#x7B2C;&#x56DB;&#x90E8;&#x5206;&#xFF1A;&#x53C2;&#x8003;&#x94FE;&#x63A5;</h2><ul><li><a href="https://blog.csdn.net/lxcao/article/details/52792466" rel="nofollow noreferrer" target="_blank">new&#x64CD;&#x4F5C;&#x7B26;&#x5177;&#x4F53;&#x5E72;&#x4E86;&#x4EC0;&#x4E48;&#x5462;?</a></li><li><a href="http://www.cnblogs.com/huaan011/p/4570384.html" rel="nofollow noreferrer" target="_blank">new&#x7684;&#x8FC7;&#x7A0B;</a></li><li><a href="https://blog.csdn.net/blueblueskyhua/article/details/73135938" rel="nofollow noreferrer" target="_blank">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;javascript&#x4E4B;Object.create &#x548C;new&#x533A;&#x522B;</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js继承、构造函数继承、原型链继承、组合继承、组合继承优化、寄生组合继承

## 原文链接
[https://segmentfault.com/a/1190000015216289](https://segmentfault.com/a/1190000015216289)

