---
title: '试着用Proxy 实现一个简单mvvm' 
date: 2018-11-25 2:30:07
hidden: true
slug: 2u7zl8hucyf
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">Proxy&#x3001;Reflect&#x7684;&#x7B80;&#x5355;&#x6982;&#x8FF0;</h3><blockquote>Proxy &#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x6210;&#xFF0C;&#x5728;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x4E4B;&#x524D;&#x67B6;&#x8BBE;&#x4E00;&#x5C42;&#x201C;&#x62E6;&#x622A;&#x201D;&#xFF0C;&#x5916;&#x754C;&#x5BF9;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x8BBF;&#x95EE;&#xFF0C;&#x90FD;&#x5FC5;&#x987B;&#x5148;&#x901A;&#x8FC7;&#x8FD9;&#x5C42;&#x62E6;&#x622A;&#xFF0C;&#x56E0;&#x6B64;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x673A;&#x5236;&#xFF0C;&#x53EF;&#x4EE5;&#x5BF9;&#x5916;&#x754C;&#x7684;&#x8BBF;&#x95EE;&#x8FDB;&#x884C;&#x8FC7;&#x6EE4;&#x548C;&#x6539;&#x5199;&#x3002;Proxy &#x8FD9;&#x4E2A;&#x8BCD;&#x7684;&#x539F;&#x610F;&#x662F;&#x4EE3;&#x7406;&#xFF0C;&#x7528;&#x5728;&#x8FD9;&#x91CC;&#x8868;&#x793A;&#x7531;&#x5B83;&#x6765;&#x201C;&#x4EE3;&#x7406;&#x201D;&#x67D0;&#x4E9B;&#x64CD;&#x4F5C;&#xFF0C;&#x53EF;&#x4EE5;&#x8BD1;&#x4E3A;&#x201C;&#x4EE3;&#x7406;&#x5668;&#x201D;&#x3002;<br>&#x51FA;&#x81EA;&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684;ECMAScript 6 &#x5165;&#x95E8;&#xFF0C;&#x8BE6;&#x7EC6;&#x70B9;&#x51FB;<a href="http://es6.ruanyifeng.com/#docs/proxy" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#docs/proxy</a></blockquote><p>&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>({}, {
  <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target, key, receiver</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`getting <span class="hljs-subst">${key}</span>!`</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.get(target, key, receiver);
  },
  <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target, key, value, receiver</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`setting <span class="hljs-subst">${key}</span>!`</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.set(target, key, value, receiver);
  }
});</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x5BF9;&#x4E00;&#x4E2A;&#x7A7A;&#x5BF9;&#x8C61;&#x67B6;&#x8BBE;&#x4E86;&#x4E00;&#x5C42;&#x62E6;&#x622A;&#xFF0C;&#x91CD;&#x5B9A;&#x4E49;&#x4E86;&#x5C5E;&#x6027;&#x7684;&#x8BFB;&#x53D6;&#xFF08;get&#xFF09;&#x548C;&#x8BBE;&#x7F6E;&#xFF08;set&#xFF09;&#x884C;&#x4E3A;&#x3002;&#x8FD9;&#x91CC;&#x6682;&#x65F6;&#x5148;&#x4E0D;&#x89E3;&#x91CA;&#x5177;&#x4F53;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x53EA;&#x770B;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#x3002;&#x5BF9;&#x8BBE;&#x7F6E;&#x4E86;&#x62E6;&#x622A;&#x884C;&#x4E3A;&#x7684;&#x5BF9;&#x8C61;obj&#xFF0C;&#x53BB;&#x8BFB;&#x5199;&#x5B83;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5C31;&#x4F1A;&#x5F97;&#x5230;&#x4E0B;&#x9762;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>obj<span class="hljs-selector-class">.count</span> = <span class="hljs-number">1</span>
<span class="hljs-comment">//  setting count!</span>
++obj<span class="hljs-selector-class">.count</span>
<span class="hljs-comment">//  getting count!</span>
<span class="hljs-comment">//  setting count!</span>
<span class="hljs-comment">//  2</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var proxy = new Proxy(target, handler);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs aspectj"><code style="word-break:break-word;white-space:initial">var proxy = <span class="hljs-keyword">new</span> Proxy(<span class="hljs-keyword">target</span>, <span class="hljs-keyword">handler</span>);</code></pre><p>&#x8FD9;&#x91CC;&#x6709;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;<code>target</code>&#x53C2;&#x6570;&#x8868;&#x793A;&#x6240;&#x8981;&#x62E6;&#x622A;&#x7684;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF0C;<code>handler</code>&#x53C2;&#x6570;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x7528;&#x6765;&#x5B9A;&#x5236;&#x62E6;&#x622A;&#x884C;&#x4E3A;&#x3002;</p><blockquote>&#x6CE8;&#x610F;&#xFF0C;&#x8981;&#x4F7F;&#x5F97;<code>Proxy</code>&#x8D77;&#x4F5C;&#x7528;&#xFF0C;&#x5FC5;&#x987B;&#x9488;&#x5BF9;<code>Proxy</code>&#x5B9E;&#x4F8B;&#xFF08;&#x4E0A;&#x4F8B;&#x662F;<code>proxy</code>&#x5BF9;&#x8C61;&#xFF09;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x9488;&#x5BF9;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF08;&#x4E0A;&#x4F8B;&#x662F;&#x7A7A;&#x5BF9;&#x8C61;&#xFF09;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x3002;</blockquote><p><code>Reflect&#x5BF9;</code>&#x8C61;&#x4E0E;<code>Proxy</code>&#x5BF9;&#x8C61;&#x4E00;&#x6837;&#xFF0C;&#x4E5F;&#x662F; <code>ES6</code> &#x4E3A;&#x4E86;&#x64CD;&#x4F5C;&#x5BF9;&#x8C61;&#x800C;&#x63D0;&#x4F9B;&#x7684;&#x65B0;<code>API</code>&#x3002;</p><p><code>Reflect</code>&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x4E0E;<code>Proxy</code>&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x4E00;&#x4E00;&#x5BF9;&#x5E94;&#xFF0C;&#x53EA;&#x8981;&#x662F;Proxy&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x80FD;&#x5728;<code>Reflect</code>&#x5BF9;&#x8C61;&#x4E0A;&#x627E;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x8FD9;&#x5C31;&#x8BA9;<code>Proxy</code>&#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x65B9;&#x4FBF;&#x5730;&#x8C03;&#x7528;&#x5BF9;&#x5E94;&#x7684;Reflect&#x65B9;&#x6CD5;&#xFF0C;&#x5B8C;&#x6210;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#xFF0C;&#x4F5C;&#x4E3A;&#x4FEE;&#x6539;&#x884C;&#x4E3A;&#x7684;&#x57FA;&#x7840;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x4E0D;&#x7BA1;<code>Proxy</code>&#x600E;&#x4E48;&#x4FEE;&#x6539;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#xFF0C;&#x4F60;&#x603B;&#x53EF;&#x4EE5;&#x5728;<code>Reflect</code>&#x4E0A;&#x83B7;&#x53D6;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#x3002;</p><p>&#x540C;&#x6837;&#x4E5F;&#x653E;&#x4E0A;&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684;&#x94FE;&#x63A5;<a href="http://es6.ruanyifeng.com/#docs/reflect" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#docs/reflect</a></p><h3 id="articleHeader1">&#x521D;&#x59CB;&#x5316;&#x7ED3;&#x6784;</h3><p>&#x770B;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x5C31;&#x5F53;&#x5927;&#x5BB6;&#x6709;&#x6BD4;&#x8F83;&#x660E;&#x767D;<code>Proxy</code>&#xFF08;&#x4EE3;&#x7406;&#xFF09;&#x662F;&#x505A;&#x4EC0;&#x4E48;&#x7528;&#x7684;&#xFF0C;&#x7136;&#x540E;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x770B;&#x4E0B;&#x8981;&#x505A;&#x6700;&#x7EC8;&#x7684;&#x56FE;&#x9A97;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000015460482?w=564&amp;h=475" src="https://static.alili.tech/img/remote/1460000015460482?w=564&amp;h=475" alt="" title="" style="cursor:pointer"></span></p><p>&#x770B;&#x5230;&#x4E0A;&#x9762;&#x7684;&#x56FE;&#x7247;&#xFF0C;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>index.html</code>&#xFF0C;&#x7136;&#x540E;&#x91CC;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x6EF4;&#x3002;&#x5F88;&#x7B80;&#x5355;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;&#x7B80;&#x5355;&#x7248;mvvm&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;app&quot;&gt;
    &lt;h1&gt;&#x5F00;&#x53D1;&#x8BED;&#x8A00;&#xFF1A;"{{"language"}}"&lt;/h1&gt;
    &lt;h2&gt;&#x7EC4;&#x6210;&#x90E8;&#x5206;&#xFF1A;&lt;/h2&gt;
    &lt;ul&gt;
        &lt;li&gt;"{{"makeUp.one"}}"&lt;/li&gt;
        &lt;li&gt;"{{"makeUp.two"}}"&lt;/li&gt;
        &lt;li&gt;"{{"makeUp.three"}}"&lt;/li&gt;
    &lt;/ul&gt;
    &lt;h2&gt;&#x63CF;&#x8FF0;&#xFF1A;&lt;/h2&gt;
    &lt;p&gt;"{{"describe"}}"&lt;/p&gt;
    &lt;p&gt;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF1A;"{{"sum"}}"&lt;/p&gt;
    &lt;input placeholder=&quot;123&quot; v-module=&quot;language&quot; /&gt;
&lt;/div&gt;
&lt;script&gt;
// &#x5199;&#x6CD5;&#x548C;Vue&#x4E00;&#x6837;
const mvvm = new Mvvm({
    el: &apos;#app&apos;,
    data: {
        language: &apos;Javascript&apos;,
        makeUp: {
            one: &apos;ECMAScript&apos;,
            two: &apos;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x6A21;&#x578B;&#xFF08;DOM&#xFF09;&apos;,
            three: &apos;&#x6D4F;&#x89C8;&#x5668;&#x5BF9;&#x8C61;&#x6A21;&#x578B;&#xFF08;BOM&#xFF09;&apos;
        },
        describe: &apos;&#x6CA1;&#x4EC0;&#x4E48;&#x4EA7;&#x54C1;&#x662F;&#x5199;&#x4E0D;&#x4E86;&#x7684;&apos;,
        a: 1,
        b: 2
    },
    computed: {
        sum() {
        return this.a + this.b
    }
})
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x7B80;&#x5355;&#x7248;mvvm<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x5F00;&#x53D1;&#x8BED;&#x8A00;&#xFF1A;</span><span class="hljs-template-variable">"{{"language"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>&#x7EC4;&#x6210;&#x90E8;&#x5206;&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span></span><span class="hljs-template-variable">"{{"makeUp.one"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span></span><span class="hljs-template-variable">"{{"makeUp.two"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span></span><span class="hljs-template-variable">"{{"makeUp.three"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>&#x63CF;&#x8FF0;&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"describe"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF1A;</span><span class="hljs-template-variable">"{{"sum"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;123&quot;</span> <span class="hljs-attr">v-module</span>=<span class="hljs-string">&quot;language&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
<span class="hljs-comment">// &#x5199;&#x6CD5;&#x548C;Vue&#x4E00;&#x6837;</span>
<span class="hljs-keyword">const</span> mvvm = <span class="hljs-keyword">new</span> Mvvm({
    el: <span class="hljs-string">&apos;#app&apos;</span>,
    data: {
        language: <span class="hljs-string">&apos;Javascript&apos;</span>,
        makeUp: {
            one: <span class="hljs-string">&apos;ECMAScript&apos;</span>,
            two: <span class="hljs-string">&apos;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x6A21;&#x578B;&#xFF08;DOM&#xFF09;&apos;</span>,
            three: <span class="hljs-string">&apos;&#x6D4F;&#x89C8;&#x5668;&#x5BF9;&#x8C61;&#x6A21;&#x578B;&#xFF08;BOM&#xFF09;&apos;</span>
        },
        describe: <span class="hljs-string">&apos;&#x6CA1;&#x4EC0;&#x4E48;&#x4EA7;&#x54C1;&#x662F;&#x5199;&#x4E0D;&#x4E86;&#x7684;&apos;</span>,
        a: <span class="hljs-number">1</span>,
        b: <span class="hljs-number">2</span>
    },
    computed: {
        sum() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + <span class="hljs-keyword">this</span>.b
    }
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</span></code></pre><p>&#x770B;&#x5230;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5927;&#x6982;&#x8DDF;<code>vue</code>&#x957F;&#x5F97;&#x5DEE;&#x4E0D;&#x591A;&#xFF0C;&#x4E0B;&#x9762;&#x53BB;&#x5B9E;&#x73B0;<code>Mvvm</code>&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;</p><h3 id="articleHeader2">&#x5B9E;&#x73B0;Mvvm&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;</h3><p>&#x9996;&#x5148;&#x58F0;&#x660E;&#x4E00;&#x4E2A;<code>Mvvm</code>&#x51FD;&#x6570;&#xFF0C;<code>options</code>&#x5F53;&#x4F5C;&#x53C2;&#x6570;&#x4F20;&#x8FDB;&#x6765;&#xFF0C;<code>options</code>&#x5C31;&#x662F;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x91CC;&#x9762;&#x6709;<code>el</code>&#x3001;<code>data</code>&#x3001;<code>computed</code>~~</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Mvvm(options = {}) {
    // &#x628A;options &#x8D4B;&#x503C;&#x7ED9;this.$options
    this.$options = options
    // &#x628A;options.data&#x8D4B;&#x503C;&#x7ED9;this._data
    let data = this._data = this.$options.data
    let vm = initVm.call(this)
    return this._vm
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>function Mvvm(options = {}) {
    <span class="hljs-comment">// &#x628A;options &#x8D4B;&#x503C;&#x7ED9;this.$options</span>
    <span class="hljs-keyword">this</span>.$options = options
    <span class="hljs-comment">// &#x628A;options.data&#x8D4B;&#x503C;&#x7ED9;this._data</span>
    let <span class="hljs-keyword">data</span> = <span class="hljs-keyword">this</span>._data = <span class="hljs-keyword">this</span>.$options.<span class="hljs-keyword">data</span>
    let vm = initVm.call(<span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._vm
}</code></pre><p>&#x4E0A;&#x9762;Mvvm&#x51FD;&#x6570;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x628A;<code>&#x53C2;&#x6570;options</code> &#x8D4B;&#x503C;&#x7ED9;<code>this.$options</code>&#x3001;&#x628A;<code>options.data</code>&#x8D4B;&#x503C;&#x7ED9;<code>this._data</code>&#x3001;&#x7136;&#x540E;&#x8C03;&#x7528;&#x521D;&#x59CB;&#x5316;<code>initVm</code>&#x51FD;&#x6570;,&#x5E76;&#x7528;<code>call</code>&#x6539;&#x53D8;<code>this</code>&#x7684;&#x6307;&#x5411;&#xFF0C;&#x65B9;&#x4FBF;<code>initVm</code>&#x51FD;&#x64CD;&#x4F5C;&#x3002;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;<code>this._vm</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x662F;&#x5728;<code>initVm</code>&#x51FD;&#x6570;&#x751F;&#x6210;&#x7684;&#x3002;</p><p>&#x4E0B;&#x9762;&#x7EE7;&#x7EED;&#x5199;<code>initVm</code>&#x51FD;&#x6570;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function initVm () {
    this._vm = new Proxy(this, {
        // &#x62E6;&#x622A;get
        get: (target, key, receiver) =&gt; {
            return this[key] || this._data[key] || this._computed[key]
        },
        // &#x62E6;&#x622A;set
        set: (target, key, value) =&gt; {
            return Reflect.set(this._data, key, value)
        }
    })
    return this._vm
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>
function initVm () {
    <span class="hljs-keyword">this</span>._vm = new Proxy(<span class="hljs-keyword">this</span>, {
        <span class="hljs-comment">// &#x62E6;&#x622A;get</span>
        <span class="hljs-keyword">get</span>: (target, key, receiver) =&gt; {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[key] || <span class="hljs-keyword">this</span>._data[key] || <span class="hljs-keyword">this</span>._computed[key]
        },
        <span class="hljs-comment">// &#x62E6;&#x622A;set</span>
        <span class="hljs-keyword">set</span>: (target, key, value) =&gt; {
            <span class="hljs-keyword">return</span> Reflect.<span class="hljs-keyword">set</span>(<span class="hljs-keyword">this</span>._data, key, value)
        }
    })
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._vm
}
</code></pre><p>&#x8FD9;&#x4E2A;<code>init&#x51FD;&#x6570;</code>&#x7528;&#x5230;<code>Proxy</code>&#x62E6;&#x622A;&#x4E86;&#xFF0C;<code>this</code>&#x5BF9;&#x8C61;&#xFF0C;&#x751F;&#x4EA7;<code>Proxy</code>&#x5B9E;&#x4F8B;&#x7684;&#x7136;&#x540E;&#x8D4B;&#x503C;&#x7ED9;<code>this._vm</code>&#xFF0C;&#x6700;&#x540E;&#x8FD4;&#x56DE;<code>this._vm</code>&#xFF0C;</p><blockquote>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x8BF4;&#x4E86;&#xFF0C;&#x8981;&#x4F7F;&#x5F97;<code>Proxy</code>&#x8D77;&#x4F5C;&#x7528;&#xFF0C;&#x5FC5;&#x987B;&#x9488;&#x5BF9;<code>Proxy</code>&#x5B9E;&#x4F8B;&#x3002;</blockquote><p>&#x5728;&#x4EE3;&#x7406;&#x91CC;&#x9762;&#xFF0C;&#x62E6;&#x622A;&#x4E86;<code>get</code>&#x548C;<code>set</code>&#xFF0C;<code>get&#x51FD;&#x6570;</code>&#x91CC;&#x9762;&#xFF0C;&#x8FD4;&#x56DE;<code>this</code>&#x5BF9;&#x8C61;&#x7684;&#x5BF9;&#x5E94;&#x7684;<code>key</code>&#x7684;&#x503C;&#xFF0C;&#x6CA1;&#x6709;&#x5C31;&#x53BB;<code>this._data</code>&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x53D6;&#x5BF9;&#x5E94;&#x7684;<code>key</code>&#xFF0C;&#x518D;&#x6CA1;&#x6709;&#x53BB;<code>this._computed</code>&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x53BB;&#x5BF9;&#x5E94;&#x7684;<code>key</code>&#x503C;&#x3002;<code>set&#x51FD;&#x6570;</code>&#x5C31;&#x662F;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4FEE;&#x6539;<code>this._data</code>&#x5BF9;&#x5E94;<code>key</code>&#x3002;</p><p>&#x505A;&#x597D;&#x8FD9;&#x4E9B;&#x5404;&#x79CD;&#x62E6;&#x622A;&#x5DE5;&#x4F5C;&#x3002;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4ECE;&#x5B9E;&#x529B;&#x4E0A;&#x8BBF;&#x95EE;&#x5230;&#x6211;&#x4EEC;&#x76F8;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#x4E86;&#x3002;&#xFF08;mvvm&#x4F7F;&#x6211;&#x4EEC;&#x7B2C;&#x4E00;&#x5757;&#x4EE3;&#x7801;&#x751F;&#x6210;&#x7684;&#x5B9E;&#x4F8B;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mvvm.b // 2
mvvm.a // 1
mvvm.language // &quot;Javascript&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>mvvm<span class="hljs-selector-class">.b</span> <span class="hljs-comment">// 2</span>
mvvm<span class="hljs-selector-class">.a</span> <span class="hljs-comment">// 1</span>
mvvm<span class="hljs-selector-class">.language</span> <span class="hljs-comment">// &quot;Javascript&quot;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000015460483?w=1150&amp;h=445" src="https://static.alili.tech/img/remote/1460000015460483?w=1150&amp;h=445" alt="" title="" style="cursor:pointer"></span></p><p>&#x5982;&#x4E0A;&#x56FE;&#x770B;&#x63A7;&#x5236;&#x53F0;&#x3002;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x503C;&#xFF0C;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x503C;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x4E0D;&#x662F;&#x54CD;&#x5E94;&#x5F0F;&#x7684;&#x3002;</p><p>&#x6253;&#x5F00;&#x63A7;&#x5236;&#x53F0;&#x770B;&#x4E00;&#x4E0B;<br><span class="img-wrap"><img data-src="/img/remote/1460000015460484?w=2012&amp;h=1032" src="https://static.alili.tech/img/remote/1460000015460484?w=2012&amp;h=1032" alt="" title="" style="cursor:pointer"></span></p><p>&#x53EF;&#x4EE5;&#x8BE6;&#x7EC6;&#x7684;&#x770B;&#x5230;&#x3002;&#x53EA;&#x6709;<code>_vm</code>&#x8FD9;&#x4E2A;&#x662F;<code>proxy</code>&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x662F;&#xFF0C;<code>_data</code>&#x4E0B;&#x9762;&#x6240;&#x6709;&#x6570;&#x636E;&#x90FD;&#x662F;&#x6709;&#x62E6;&#x622A;&#x4EE3;&#x7406;&#x7684;&#xFF1B;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5C31;&#x53BB;&#x5B9E;&#x73B0;&#x5B83;&#x3002;</p><h3 id="articleHeader3">&#x5B9E;&#x73B0;&#x6240;&#x6709;&#x6570;&#x636E;&#x4EE3;&#x7406;&#x62E6;&#x622A;</h3><p>&#x6211;&#x4EEC;&#x9996;&#x5148;&#x5728;<code>Mvvm</code>&#x91CC;&#x9762;&#x52A0;&#x4E00;&#x4E2A;<code>initObserve</code>&#xFF0C;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Mvvm(options = {}) {
    this.$options = options
    let data = this._data = this.$options.data
    let vm = initVm.call(this)
+   initObserve.call(this, data) // &#x521D;&#x59CB;&#x5316;data&#x7684;Observe
    return this._vm
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>function Mvvm(options = {}) {
    <span class="hljs-keyword">this</span>.$options = options
    let <span class="hljs-keyword">data</span> = <span class="hljs-keyword">this</span>._data = <span class="hljs-keyword">this</span>.$options.<span class="hljs-keyword">data</span>
    let vm = initVm.call(<span class="hljs-keyword">this</span>)
+   initObserve.call(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">data</span>) <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;data&#x7684;Observe</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._vm
}</code></pre><p><code>initObserve</code>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x4E3B;&#x8981;&#x662F;&#x628A;&#xFF0C;<code>this._data</code>&#x90FD;&#x52A0;&#x4E0A;&#x4EE3;&#x7406;&#x3002;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function initObserve(data) {
    this._data = observe(data) // &#x628A;&#x6240;&#x6709;observe&#x90FD;&#x8D4B;&#x503C;&#x5230; this._data
}

// &#x5206;&#x5F00;&#x8FD9;&#x4E2A;&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x4E0B;&#x9762;&#x9012;&#x5F52;&#x8C03;&#x7528;
function observe(data) {
    if (!data || typeof data !== &apos;object&apos;) return data // &#x5982;&#x679C;&#x4E0D;&#x662F;&#x5BF9;&#x8C61;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x503C;
    return new Observe(data) // &#x5BF9;&#x8C61;&#x8C03;&#x7528;Observe
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>
function initObserve(<span class="hljs-keyword">data</span>) {
    <span class="hljs-keyword">this</span>._data = observe(<span class="hljs-keyword">data</span>) <span class="hljs-comment">// &#x628A;&#x6240;&#x6709;observe&#x90FD;&#x8D4B;&#x503C;&#x5230; this._data</span>
}

<span class="hljs-comment">// &#x5206;&#x5F00;&#x8FD9;&#x4E2A;&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x4E0B;&#x9762;&#x9012;&#x5F52;&#x8C03;&#x7528;</span>
function observe(<span class="hljs-keyword">data</span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">data</span> || typeof <span class="hljs-keyword">data</span> !== <span class="hljs-string">&apos;object&apos;</span>) <span class="hljs-keyword">return</span> <span class="hljs-keyword">data</span> <span class="hljs-comment">// &#x5982;&#x679C;&#x4E0D;&#x662F;&#x5BF9;&#x8C61;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x503C;</span>
    <span class="hljs-keyword">return</span> new Observe(<span class="hljs-keyword">data</span>) <span class="hljs-comment">// &#x5BF9;&#x8C61;&#x8C03;&#x7528;Observe</span>
}</code></pre><p>&#x4E0B;&#x9762;&#x4E3B;&#x8981;&#x5B9E;&#x73B0;Observe&#x7C7B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Observe&#x7C7B;
class Observe {
    constructor(data) {
        this.dep = new Dep() // &#x8BA2;&#x9605;&#x7C7B;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x4ECB;&#x7ECD;
        for (let key in data) {
            data[key] = observe(data[key]) // &#x9012;&#x5F52;&#x8C03;&#x7528;&#x5B50;&#x5BF9;&#x8C61;
        }
        return this.proxy(data)
    }
    proxy(data) {
      let dep = this.dep
      return new Proxy(data, {
        get: (target, key, receiver) =&gt; {
          return Reflect.get(target, key, receiver)
        },
        set: (target, key, value) =&gt; {
          const result = Reflect.set(target, key, observe(value)) // &#x5BF9;&#x4E8E;&#x65B0;&#x6DFB;&#x52A0;&#x7684;&#x5BF9;&#x8C61;&#x4E5F;&#x8981;&#x8FDB;&#x884C;&#x6DFB;&#x52A0;observe
          return result  
        }
      })
    }
  }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// Observe&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Observe</span> </span>{
    <span class="hljs-keyword">constructor</span>(<span class="hljs-keyword">data</span>) {
        <span class="hljs-keyword">this</span>.dep = new Dep() <span class="hljs-comment">// &#x8BA2;&#x9605;&#x7C7B;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x4ECB;&#x7ECD;</span>
        <span class="hljs-keyword">for</span> (let key <span class="hljs-keyword">in</span> <span class="hljs-keyword">data</span>) {
            <span class="hljs-keyword">data</span>[key] = observe(<span class="hljs-keyword">data</span>[key]) <span class="hljs-comment">// &#x9012;&#x5F52;&#x8C03;&#x7528;&#x5B50;&#x5BF9;&#x8C61;</span>
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.proxy(<span class="hljs-keyword">data</span>)
    }
    proxy(<span class="hljs-keyword">data</span>) {
      let dep = <span class="hljs-keyword">this</span>.dep
      <span class="hljs-keyword">return</span> new Proxy(<span class="hljs-keyword">data</span>, {
        <span class="hljs-keyword">get</span>: (target, key, receiver) =&gt; {
          <span class="hljs-keyword">return</span> Reflect.<span class="hljs-keyword">get</span>(target, key, receiver)
        },
        <span class="hljs-keyword">set</span>: (target, key, value) =&gt; {
          const result = Reflect.<span class="hljs-keyword">set</span>(target, key, observe(value)) <span class="hljs-comment">// &#x5BF9;&#x4E8E;&#x65B0;&#x6DFB;&#x52A0;&#x7684;&#x5BF9;&#x8C61;&#x4E5F;&#x8981;&#x8FDB;&#x884C;&#x6DFB;&#x52A0;observe</span>
          <span class="hljs-keyword">return</span> result  
        }
      })
    }
  }
</code></pre><p>&#x8FD9;&#x6837;&#x5B50;&#xFF0C;&#x901A;&#x8FC7;&#x6211;&#x4EEC;&#x5C42;&#x5C42;&#x9012;&#x5F52;&#x6DFB;&#x52A0;<code>proxy</code>&#xFF0C;&#x628A;&#x6211;&#x4EEC;&#x7684;<code>_data</code>&#x5BF9;&#x8C61;&#x90FD;&#x6DFB;&#x52A0;&#x4E00;&#x904D;&#xFF0C;&#x518D;&#x770B;&#x4E00;&#x4E0B;&#x63A7;&#x5236;&#x53F0;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015460485?w=1678&amp;h=818" src="https://static.alili.tech/img/remote/1460000015460485?w=1678&amp;h=818" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5F88;&#x4E0D;&#x9519;&#xFF0C;<code>_data</code>&#x4E5F;&#x6709;<code>proxy</code>&#x4E86;&#xFF0C;&#x5F88;&#x738B;&#x7956;&#x84DD;&#x5F0F;&#x7684;&#x5B8C;&#x7F8E;&#x3002;</p><p>&#x770B;&#x5230;&#x6211;&#x4EEC;&#x7684;html&#x7684;&#x754C;&#x9762;&#xFF0C;&#x90FD;&#x662F;&#x6CA1;&#x6709;&#x6570;&#x636E;&#x7684;&#xFF0C;&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x628A;&#x6570;&#x636E;&#x90FD;&#x51C6;&#x5907;&#x597D;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5C31;&#x5F00;&#x59CB;&#x628A;&#x6570;&#x636E;&#x7ED3;&#x5408;&#x5230;html&#x7684;&#x754C;&#x9762;&#x4E0A;&#x3002;</p><h3 id="articleHeader4">&#x5957;&#x6570;&#x636E;&#xFF0C;&#x5B9E;&#x73B0;hmtl&#x754C;&#x9762;</h3><p>&#x5148;&#x628A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x8FD9;&#x4E2A;html&#x6CE8;&#x91CA;&#x6389;&#xFF0C;&#x540E;&#x9762;&#x8FDB;&#x884C;&#x5B9E;&#x73B0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- &lt;p&gt;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF1A;"{{"sum"}}"&lt;/p&gt; --&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code style="word-break:break-word;white-space:initial"><span class="xml"><span class="hljs-comment">&lt;!-- &lt;p&gt;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF1A;</span></span><span class="hljs-template-variable">"{{"sum"}}"</span><span class="xml"><span class="hljs-comment">&lt;/p&gt; --&gt;</span></span></code></pre><p>&#x7136;&#x540E;&#x5728;Mvvm&#x51FD;&#x6570;&#x4E2D;&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x7F16;&#x8BD1;&#x51FD;&#x6570;&#xFF0C;&#x2795;&#x53F7;&#x8868;&#x793A;&#x662F;&#x6DFB;&#x52A0;&#x7684;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Mvvm(options = {}) {
    this.$options = options
    let data = this._data = this.$options.data
    let vm = initVm.call(this)
+   new Compile(this.$options.el, vm) // &#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x7F16;&#x8BD1;&#x51FD;&#x6570;
    return this._vm
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>function Mvvm(options = {}) {
    <span class="hljs-keyword">this</span>.$options = options
    let <span class="hljs-keyword">data</span> = <span class="hljs-keyword">this</span>._data = <span class="hljs-keyword">this</span>.$options.<span class="hljs-keyword">data</span>
    let vm = initVm.call(<span class="hljs-keyword">this</span>)
+   new Compile(<span class="hljs-keyword">this</span>.$options.el, vm) <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x7F16;&#x8BD1;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._vm
}</code></pre><p>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;<code>Compile</code>&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;&#x628A;&#x914D;&#x7F6E;&#x7684;<code>el</code>&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x673A;&#x8FDB;&#x6765;&#xFF0C;&#x628A;&#x751F;&#x6210;<code>proxy</code>&#x7684;&#x5B9E;&#x4F8B;<code>vm</code>&#x4E5F;&#x4F20;&#x8FDB;&#x53BB;&#xFF0C;&#x8FD9;&#x6837;&#x5B50;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x62FF;&#x5230;<code>vm</code>&#x4E0B;&#x9762;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5C31;&#x53BB;&#x5B9E;&#x73B0;&#x5B83;&#x3002;&#x987A;&#x5E8F;&#x8BFB;&#x6CE8;&#x91CA;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x5F88;&#x597D;&#x7406;&#x89E3;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7F16;&#x8BD1;&#x7C7B;
class Compile {
    constructor (el, vm) {
        this.vm = vm // &#x628A;&#x4F20;&#x8FDB;&#x6765;&#x7684;vm &#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;vm.a = 1 &#x6CA1;&#x6BDB;&#x75C5;
        let element = document.querySelector(el) // &#x62FF;&#x5230; app &#x8282;&#x70B9;
        let fragment = document.createDocumentFragment() // &#x521B;&#x5EFA;fragment&#x4EE3;&#x7801;&#x7247;&#x6BB5;
        fragment.append(element) // &#x628A;app&#x8282;&#x70B9; &#x6DFB;&#x52A0;&#x5230; &#x521B;&#x5EFA;fragment&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x4E2D;
        this.replace(fragment) // &#x5957;&#x6570;&#x636E;&#x51FD;&#x6570;
        document.body.appendChild(fragment) // &#x6700;&#x540E;&#x6DFB;&#x52A0;&#x5230;body&#x4E2D;
    }
    replace(frag) {
        let vm = this.vm // &#x62FF;&#x5230;&#x4E4B;&#x524D;&#x5B58;&#x8D77;&#x6765;&#x7684;vm
        // &#x5FAA;&#x73AF;frag.childNodes
        Array.from(frag.childNodes).forEach(node =&gt; {
            let txt = node.textContent // &#x62FF;&#x5230;&#x6587;&#x672C; &#x4F8B;&#x5982;&#xFF1A;&quot;&#x5F00;&#x53D1;&#x8BED;&#x8A00;&#xFF1A;"{{"language"}}"&quot;
            let reg = /\{\{(.*?)\}\}/g // &#x5B9A;&#x4E49;&#x5339;&#x914D;&#x6B63;&#x5219;
            if (node.nodeType === 3 &amp;&amp; reg.test(txt)) {
            
                replaceTxt()
                
                function replaceTxt() {
                    // &#x5982;&#x679C;&#x5339;&#x914D;&#x5230;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x66FF;&#x6362;&#x6587;&#x672C;
                    node.textContent = txt.replace(reg, (matched, placeholder) =&gt; {
                        return placeholder.split(&apos;.&apos;).reduce((obj, key) =&gt; {
                            return obj[key] // &#x4F8B;&#x5982;&#xFF1A;&#x53BB;vm.makeUp.one&#x5BF9;&#x8C61;&#x62FF;&#x5230;&#x503C;
                        }, vm)
                    })
                }
            }
            // &#x5982;&#x679C;&#x8FD8;&#x6709;&#x5B57;&#x8282;&#x70B9;&#xFF0C;&#x5E76;&#x4E14;&#x957F;&#x5EA6;&#x4E0D;&#x4E3A;0 
            if (node.childNodes &amp;&amp; node.childNodes.length) {
                // &#x76F4;&#x63A5;&#x9012;&#x5F52;&#x5339;&#x914D;&#x66FF;&#x6362;
                this.replace(node)
            }
        })
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">// &#x7F16;&#x8BD1;&#x7C7B;</span>
<span class="hljs-keyword">class</span> Compile {
    <span class="hljs-keyword">constructor</span> (<span class="hljs-params">el, vm</span>) {
        <span class="hljs-keyword">this</span>.vm = vm <span class="hljs-comment">// &#x628A;&#x4F20;&#x8FDB;&#x6765;&#x7684;vm &#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;vm.a = 1 &#x6CA1;&#x6BDB;&#x75C5;</span>
        <span class="hljs-keyword">let</span> element = <span class="hljs-built_in">document</span>.querySelector(el) <span class="hljs-comment">// &#x62FF;&#x5230; app &#x8282;&#x70B9;</span>
        <span class="hljs-keyword">let</span> fragment = <span class="hljs-built_in">document</span>.createDocumentFragment() <span class="hljs-comment">// &#x521B;&#x5EFA;fragment&#x4EE3;&#x7801;&#x7247;&#x6BB5;</span>
        fragment.append(element) <span class="hljs-comment">// &#x628A;app&#x8282;&#x70B9; &#x6DFB;&#x52A0;&#x5230; &#x521B;&#x5EFA;fragment&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x4E2D;</span>
        <span class="hljs-keyword">this</span>.replace(fragment) <span class="hljs-comment">// &#x5957;&#x6570;&#x636E;&#x51FD;&#x6570;</span>
        <span class="hljs-built_in">document</span>.body.appendChild(fragment) <span class="hljs-comment">// &#x6700;&#x540E;&#x6DFB;&#x52A0;&#x5230;body&#x4E2D;</span>
    }
    replace(frag) {
        <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">this</span>.vm <span class="hljs-comment">// &#x62FF;&#x5230;&#x4E4B;&#x524D;&#x5B58;&#x8D77;&#x6765;&#x7684;vm</span>
        <span class="hljs-comment">// &#x5FAA;&#x73AF;frag.childNodes</span>
        <span class="hljs-built_in">Array</span>.from(frag.childNodes).forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
            <span class="hljs-keyword">let</span> txt = node.textContent <span class="hljs-comment">// &#x62FF;&#x5230;&#x6587;&#x672C; &#x4F8B;&#x5982;&#xFF1A;&quot;&#x5F00;&#x53D1;&#x8BED;&#x8A00;&#xFF1A;"{{"language"}}"&quot;</span>
            <span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\{\{(.*?)\}\}/g</span> <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x5339;&#x914D;&#x6B63;&#x5219;</span>
            <span class="hljs-keyword">if</span> (node.nodeType === <span class="hljs-number">3</span> &amp;&amp; reg.test(txt)) {
            
                replaceTxt()
                
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replaceTxt</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-comment">// &#x5982;&#x679C;&#x5339;&#x914D;&#x5230;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x66FF;&#x6362;&#x6587;&#x672C;</span>
                    node.textContent = txt.replace(reg, <span class="hljs-function">(<span class="hljs-params">matched, placeholder</span>) =&gt;</span> {
                        <span class="hljs-keyword">return</span> placeholder.split(<span class="hljs-string">&apos;.&apos;</span>).reduce(<span class="hljs-function">(<span class="hljs-params">obj, key</span>) =&gt;</span> {
                            <span class="hljs-keyword">return</span> obj[key] <span class="hljs-comment">// &#x4F8B;&#x5982;&#xFF1A;&#x53BB;vm.makeUp.one&#x5BF9;&#x8C61;&#x62FF;&#x5230;&#x503C;</span>
                        }, vm)
                    })
                }
            }
            <span class="hljs-comment">// &#x5982;&#x679C;&#x8FD8;&#x6709;&#x5B57;&#x8282;&#x70B9;&#xFF0C;&#x5E76;&#x4E14;&#x957F;&#x5EA6;&#x4E0D;&#x4E3A;0 </span>
            <span class="hljs-keyword">if</span> (node.childNodes &amp;&amp; node.childNodes.length) {
                <span class="hljs-comment">// &#x76F4;&#x63A5;&#x9012;&#x5F52;&#x5339;&#x914D;&#x66FF;&#x6362;</span>
                <span class="hljs-keyword">this</span>.replace(node)
            }
        })
    }
}
</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x7F16;&#x8BD1;&#x51FD;&#x6570;&#xFF0C;&#x603B;&#x4E4B;&#x5C31;&#x662F;&#x4E00;&#x53E5;&#x8BDD;&#xFF0C;&#x5343;&#x65B9;&#x767E;&#x8BA1;&#x7684;&#x628A;"{{"xxx"}}"&#x7684;&#x5360;&#x4F4D;&#x7B26;&#x901A;&#x8FC7;&#x6B63;&#x5219;&#x66FF;&#x6362;&#x6210;&#x771F;&#x5B9E;&#x7684;&#x6570;&#x636E;&#x3002;</p><p>&#x7136;&#x540E;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x94DB;&#x94DB;&#x6863;&#x94DB;&#x94DB;&#x6863;&#xFF0C;&#x5C31;&#x51FA;&#x73B0;&#x6211;&#x4EEC;&#x8981;&#x7684;&#x6570;&#x636E;&#x4E86;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015460486?w=594&amp;h=448" src="https://static.alili.tech/img/remote/1460000015460486?w=594&amp;h=448" alt="" title="" style="cursor:pointer"></span></p><p>&#x5F88;&#x597D;&#x5F88;&#x597D;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x7684;&#x6570;&#x636E;&#x5E76;&#x4E0D;&#x662F;&#x6539;&#x53D8;&#x4E86; &#x5C31;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x4E86;&#x3002;&#x8FD8;&#x9700;&#x8981;&#x8BA2;&#x9605;&#x53D1;&#x5E03;&#x548C;watcher&#x6765;&#x914D;&#x5408;&#xFF0C;&#x624D;&#x80FD;&#x505A;&#x597D;&#x6539;&#x53D8;&#x6570;&#x636E;&#x5C31;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x4E86;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5148;&#x5B9E;&#x73B0;&#x8BA2;&#x9605;&#x53D1;&#x5E03;&#x3002;</p><h3 id="articleHeader5">&#x5B9E;&#x73B0;&#x8BA2;&#x9605;&#x53D1;&#x5E03;</h3><p>&#x8BA2;&#x9605;&#x53D1;&#x5E03;&#x5176;&#x5B9E;&#x662F;&#x4E00;&#x79CD;&#x5E38;&#x89C1;&#x7684;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#xFF0C;&#x7B80;&#x5355;&#x76F4;&#x767D;&#x6765;&#x8BF4;&#x5C31;&#x662F;:</p><blockquote>&#x628A;&#x51FD;&#x6570;push&#x5230;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x91CC;&#x9762;&#xFF0C;&#x7136;&#x540E;&#x5FAA;&#x73AF;&#x6570;&#x636E;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x3002;</blockquote><p>&#x4F8B;&#x5982;&#xFF1A;&#x4E3E;&#x4E2A;&#x5F88;&#x76F4;&#x767D;&#x7684;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [] 
let a = () =&gt; {console.log(&apos;a&apos;)}

arr.push(a) // &#x8BA2;&#x9605;a&#x51FD;&#x6570;
arr.push(a) // &#x53C8;&#x8BA2;&#x9605;a&#x51FD;&#x6570;
arr.push(a) // &#x53CC;&#x8BA2;&#x9605;a&#x51FD;&#x6570;

arr.forEach(fn =&gt; fn()) // &#x53D1;&#x5E03;&#x6240;&#x6709;

// &#x6B64;&#x65F6;&#x4F1A;&#x6253;&#x5370;&#x4E09;&#x4E2A;a" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-keyword">let</span> arr = [] 
<span class="hljs-keyword">let</span> a = () =&gt; {console.<span class="hljs-built_in">log</span>(&apos;a&apos;)}

arr.<span class="hljs-keyword">push</span>(a) <span class="hljs-comment">// &#x8BA2;&#x9605;a&#x51FD;&#x6570;</span>
arr.<span class="hljs-keyword">push</span>(a) <span class="hljs-comment">// &#x53C8;&#x8BA2;&#x9605;a&#x51FD;&#x6570;</span>
arr.<span class="hljs-keyword">push</span>(a) <span class="hljs-comment">// &#x53CC;&#x8BA2;&#x9605;a&#x51FD;&#x6570;</span>

arr.forEach(<span class="hljs-function"><span class="hljs-keyword">fn</span> =&gt; <span class="hljs-keyword">fn</span><span class="hljs-params">()</span>) <span class="hljs-comment">// &#x53D1;&#x5E03;&#x6240;&#x6709;</span>

<span class="hljs-comment">// &#x6B64;&#x65F6;&#x4F1A;&#x6253;&#x5370;&#x4E09;&#x4E2A;a</span></span></code></pre><p>&#x5F88;&#x7B80;&#x5355;&#x5427;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x53BB;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8BA2;&#x9605;&#x7C7B;
class Dep {
    constructor() {
        this.subs = [] // &#x5B9A;&#x4E49;&#x6570;&#x7EC4;
    }
    // &#x8BA2;&#x9605;&#x51FD;&#x6570;
    addSub(sub) {
        this.subs.push(sub)
    }
    // &#x53D1;&#x5E03;&#x51FD;&#x6570;
    notify() {
        this.subs.filter(item =&gt; typeof item !== &apos;string&apos;).forEach(sub =&gt; sub.update())
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x8BA2;&#x9605;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dep</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.subs = [] <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x6570;&#x7EC4;</span>
    }
    <span class="hljs-comment">// &#x8BA2;&#x9605;&#x51FD;&#x6570;</span>
    addSub(sub) {
        <span class="hljs-keyword">this</span>.subs.push(sub)
    }
    <span class="hljs-comment">// &#x53D1;&#x5E03;&#x51FD;&#x6570;</span>
    notify() {
        <span class="hljs-keyword">this</span>.subs.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-keyword">typeof</span> item !== <span class="hljs-string">&apos;string&apos;</span>).forEach(<span class="hljs-function"><span class="hljs-params">sub</span> =&gt;</span> sub.update())
    }
}</code></pre><p>&#x8BA2;&#x9605;&#x53D1;&#x5E03;&#x662F;&#x5199;&#x597D;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x8BA2;&#x9605;&#xFF0C;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x53D1;&#x5E03;&#xFF1F;&#xFF1F;&#x8FD9;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x5728;&#x6570;&#x636E;&#x83B7;&#x53D6;&#x7684;&#x65F6;&#x5019;&#x8BA2;&#x9605;<code>watcher</code>&#xFF0C;&#x7136;&#x540E;&#x5728;&#x6570;&#x636E;&#x8BBE;&#x7F6E;&#x7684;&#x65F6;&#x5019;&#x53D1;&#x5E03;<code>watcher</code>&#xFF0C;&#x5728;&#x4E0A;&#x9762;&#x7684;<code>Observe</code>&#x7C7B;&#x91CC;&#x9762;&#x91CC;&#x9762;,&#x770B;&#x2795;&#x53F7;&#x7684;&#x4EE3;&#x7801;&#x3002; .</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="... //&#x7701;&#x7565;&#x4EE3;&#x7801;
...
proxy(data) {
    let dep = this.dep
    return new Proxy(data, {
        // &#x62E6;&#x622A;get
        get: (target, prop, receiver) =&gt; {
+           if (Dep.target) {
                // &#x5982;&#x679C;&#x4E4B;&#x524D;&#x662F;push&#x8FC7;&#x7684;&#xFF0C;&#x5C31;&#x4E0D;&#x7528;&#x91CD;&#x590D;push&#x4E86;
                if (!dep.subs.includes(Dep.exp)) {
                    dep.addSub(Dep.exp) // &#x628A;Dep.exp&#x3002;push&#x5230;sub&#x6570;&#x7EC4;&#x91CC;&#x9762;&#xFF0C;&#x8BA2;&#x9605;
                    dep.addSub(Dep.target) // &#x628A;Dep.target&#x3002;push&#x5230;sub&#x6570;&#x7EC4;&#x91CC;&#x9762;&#xFF0C;&#x8BA2;&#x9605;
                }
+           }
            return Reflect.get(target, prop, receiver)
        },
        // &#x62E6;&#x622A;set
        set: (target, prop, value) =&gt; {
            const result = Reflect.set(target, prop, observe(value))
+           dep.notify() // &#x53D1;&#x5E03;
            return result  
        }
    })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>... <span class="hljs-comment">//&#x7701;&#x7565;&#x4EE3;&#x7801;</span>
...
proxy(data) {
    <span class="hljs-keyword">let</span> dep = <span class="hljs-keyword">this</span>.dep
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(data, {
        <span class="hljs-comment">// &#x62E6;&#x622A;get</span>
        get: <span class="hljs-function">(<span class="hljs-params">target, prop, receiver</span>) =&gt;</span> {
+           <span class="hljs-keyword">if</span> (Dep.target) {
                <span class="hljs-comment">// &#x5982;&#x679C;&#x4E4B;&#x524D;&#x662F;push&#x8FC7;&#x7684;&#xFF0C;&#x5C31;&#x4E0D;&#x7528;&#x91CD;&#x590D;push&#x4E86;</span>
                <span class="hljs-keyword">if</span> (!dep.subs.includes(Dep.exp)) {
                    dep.addSub(Dep.exp) <span class="hljs-comment">// &#x628A;Dep.exp&#x3002;push&#x5230;sub&#x6570;&#x7EC4;&#x91CC;&#x9762;&#xFF0C;&#x8BA2;&#x9605;</span>
                    dep.addSub(Dep.target) <span class="hljs-comment">// &#x628A;Dep.target&#x3002;push&#x5230;sub&#x6570;&#x7EC4;&#x91CC;&#x9762;&#xFF0C;&#x8BA2;&#x9605;</span>
                }
+           }
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.get(target, prop, receiver)
        },
        <span class="hljs-comment">// &#x62E6;&#x622A;set</span>
        set: <span class="hljs-function">(<span class="hljs-params">target, prop, value</span>) =&gt;</span> {
            <span class="hljs-keyword">const</span> result = <span class="hljs-built_in">Reflect</span>.set(target, prop, observe(value))
+           dep.notify() <span class="hljs-comment">// &#x53D1;&#x5E03;</span>
            <span class="hljs-keyword">return</span> result  
        }
    })
}</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x8BF4;&#x5230;&#xFF0C;watcher&#x662F;&#x4EC0;&#x4E48;&#x9B3C;&#xFF1F;&#x7136;&#x540E;&#x53D1;&#x5E03;&#x91CC;&#x9762;&#x7684;sub.update()&#x53C8;&#x662F;&#x4EC0;&#x4E48;&#x9B3C;&#xFF1F;&#xFF1F;</p><p>&#x5E26;&#x7740;&#x4E00;&#x5806;&#x7591;&#x95EE;&#x6211;&#x4EEC;&#x6765;&#x5230;&#x4E86;watcher</p><h3 id="articleHeader6">&#x5B9E;&#x73B0;watcher</h3><p>&#x770B;&#x8BE6;&#x7EC6;&#x6CE8;&#x91CA;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Watcher&#x7C7B;
class Watcher {
    constructor (vm, exp, fn) {
        this.fn = fn // &#x4F20;&#x8FDB;&#x6765;&#x7684;fn
        this.vm = vm // &#x4F20;&#x8FDB;&#x6765;&#x7684;vm
        this.exp = exp // &#x4F20;&#x8FDB;&#x6765;&#x7684;&#x5339;&#x914D;&#x5230;exp &#x4F8B;&#x5982;&#xFF1A;&quot;language&quot;&#xFF0C;&quot;makeUp.one&quot;
        Dep.exp = exp // &#x7ED9;Dep&#x7C7B;&#x6302;&#x8F7D;&#x4E00;&#x4E2A;exp
        Dep.target = this // &#x7ED9;Dep&#x7C7B;&#x6302;&#x8F7D;&#x4E00;&#x4E2A;watcher&#x5BF9;&#x8C61;&#xFF0C;&#x8DDF;&#x65B0;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x7528;&#x5230;&#x4E86;
        let arr = exp.split(&apos;.&apos;)
        let val = vm
        arr.forEach(key =&gt; {
            val = val[key] // &#x83B7;&#x53D6;&#x503C;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x4F1A;&#x7C97;&#x53D1;vm.proxy&#x7684;get()&#x51FD;&#x6570;&#xFF0C;get()&#x91CC;&#x9762;&#x5C31;&#x6DFB;&#x52A0;addSub&#x8BA2;&#x9605;&#x51FD;&#x6570;
        })
        Dep.target = null // &#x6DFB;&#x52A0;&#x4E86;&#x8BA2;&#x9605;&#x4E4B;&#x540E;&#xFF0C;&#x628A;Dep.target&#x6E05;&#x7A7A;
    }
    update() {
        // &#x8BBE;&#x7F6E;&#x503C;&#x4F1A;&#x89E6;&#x53D1;vm.proxy.set&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x8C03;&#x7528;&#x53D1;&#x5E03;&#x7684;notify&#xFF0C;
        // &#x6700;&#x540E;&#x8C03;&#x7528;update&#xFF0C;update&#x91CC;&#x9762;&#x7EE7;&#x7EED;&#x8C03;&#x7528;this.fn(val)
        let exp = this.exp
        let arr = exp.split(&apos;.&apos;)
        let val = this.vm
        arr.forEach(key =&gt; {
            val = val[key]
        })
        this.fn(val)
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// Watcher&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watcher</span> </span>{
    <span class="hljs-keyword">constructor</span> (vm, exp, fn) {
        <span class="hljs-keyword">this</span>.fn = fn <span class="hljs-comment">// &#x4F20;&#x8FDB;&#x6765;&#x7684;fn</span>
        <span class="hljs-keyword">this</span>.vm = vm <span class="hljs-comment">// &#x4F20;&#x8FDB;&#x6765;&#x7684;vm</span>
        <span class="hljs-keyword">this</span>.exp = exp <span class="hljs-comment">// &#x4F20;&#x8FDB;&#x6765;&#x7684;&#x5339;&#x914D;&#x5230;exp &#x4F8B;&#x5982;&#xFF1A;&quot;language&quot;&#xFF0C;&quot;makeUp.one&quot;</span>
        Dep.exp = exp <span class="hljs-comment">// &#x7ED9;Dep&#x7C7B;&#x6302;&#x8F7D;&#x4E00;&#x4E2A;exp</span>
        Dep.target = <span class="hljs-keyword">this</span> <span class="hljs-comment">// &#x7ED9;Dep&#x7C7B;&#x6302;&#x8F7D;&#x4E00;&#x4E2A;watcher&#x5BF9;&#x8C61;&#xFF0C;&#x8DDF;&#x65B0;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x7528;&#x5230;&#x4E86;</span>
        let arr = exp.split(<span class="hljs-string">&apos;.&apos;</span>)
        let <span class="hljs-keyword">val</span> = vm
        arr.forEach(key =&gt; {
            <span class="hljs-keyword">val</span> = <span class="hljs-keyword">val</span>[key] <span class="hljs-comment">// &#x83B7;&#x53D6;&#x503C;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x4F1A;&#x7C97;&#x53D1;vm.proxy&#x7684;get()&#x51FD;&#x6570;&#xFF0C;get()&#x91CC;&#x9762;&#x5C31;&#x6DFB;&#x52A0;addSub&#x8BA2;&#x9605;&#x51FD;&#x6570;</span>
        })
        Dep.target = <span class="hljs-literal">null</span> <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x4E86;&#x8BA2;&#x9605;&#x4E4B;&#x540E;&#xFF0C;&#x628A;Dep.target&#x6E05;&#x7A7A;</span>
    }
    update() {
        <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x503C;&#x4F1A;&#x89E6;&#x53D1;vm.proxy.set&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x8C03;&#x7528;&#x53D1;&#x5E03;&#x7684;notify&#xFF0C;</span>
        <span class="hljs-comment">// &#x6700;&#x540E;&#x8C03;&#x7528;update&#xFF0C;update&#x91CC;&#x9762;&#x7EE7;&#x7EED;&#x8C03;&#x7528;this.fn(val)</span>
        let exp = <span class="hljs-keyword">this</span>.exp
        let arr = exp.split(<span class="hljs-string">&apos;.&apos;</span>)
        let <span class="hljs-keyword">val</span> = <span class="hljs-keyword">this</span>.vm
        arr.forEach(key =&gt; {
            <span class="hljs-keyword">val</span> = <span class="hljs-keyword">val</span>[key]
        })
        <span class="hljs-keyword">this</span>.fn(<span class="hljs-keyword">val</span>)
    }
}
</code></pre><p>Watcher&#x7C7B;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x8981;&#x8BA2;&#x9605;&#x7684;watcher&#xFF0C;&#x91CC;&#x9762;&#x6709;&#x56DE;&#x8C03;&#x51FD;&#x6570;fn&#xFF0C;&#x6709;update&#x51FD;&#x6570;&#x8C03;&#x7528;fn&#xFF0C;</p><p>&#x6211;&#x4EEC;&#x90FD;&#x5F04;&#x597D;&#x4E86;&#x3002;&#x4F46;&#x662F;&#x5728;&#x54EA;&#x91CC;&#x6DFB;&#x52A0;watcher&#x5462;&#xFF1F;&#xFF1F;&#x5982;&#x4E0B;&#x4EE3;&#x7801;</p><p>&#x5728;Compile&#x91CC;&#x9762;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
...
function replaceTxt() {
    node.textContent = txt.replace(reg, (matched, placeholder) =&gt; {
+       new Watcher(vm, placeholder, replaceTxt);   // &#x76D1;&#x542C;&#x53D8;&#x5316;&#xFF0C;&#x8FDB;&#x884C;&#x5339;&#x914D;&#x66FF;&#x6362;&#x5185;&#x5BB9;
        return placeholder.split(&apos;.&apos;).reduce((val, key) =&gt; {
            return val[key]
        }, vm)
    })
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>...
...
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replaceTxt</span>(<span class="hljs-params"></span>) </span>{
    node.textContent = txt.replace(reg, <span class="hljs-function">(<span class="hljs-params">matched, placeholder</span>) =&gt;</span> {
+       <span class="hljs-keyword">new</span> Watcher(vm, placeholder, replaceTxt);   <span class="hljs-comment">// &#x76D1;&#x542C;&#x53D8;&#x5316;&#xFF0C;&#x8FDB;&#x884C;&#x5339;&#x914D;&#x66FF;&#x6362;&#x5185;&#x5BB9;</span>
        <span class="hljs-keyword">return</span> placeholder.split(<span class="hljs-string">&apos;.&apos;</span>).reduce(<span class="hljs-function">(<span class="hljs-params">val, key</span>) =&gt;</span> {
            <span class="hljs-keyword">return</span> val[key]
        }, vm)
    })
}
</code></pre><p>&#x6DFB;&#x52A0;&#x597D;&#x6709;&#x6240;&#x7684;&#x4E1C;&#x897F;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;&#x63A7;&#x5236;&#x53F0;&#x3002;&#x4FEE;&#x6539;&#x53D1;&#x73B0;&#x679C;&#x7136;&#x8D77;&#x4F5C;&#x7528;&#x4E86;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015460487?w=1490&amp;h=962" src="https://static.alili.tech/img/remote/1460000015460487?w=1490&amp;h=962" alt="" title="" style="cursor:pointer"></span></p><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x56DE;&#x987E;&#x4E00;&#x4E0B;&#x6240;&#x6709;&#x7684;&#x6D41;&#x7A0B;&#xFF0C;&#x7136;&#x540E;&#x770B;&#x89C1;&#x53E4;&#x8001;(&#x6211;&#x4E5F;&#x662F;&#x522B;&#x7684;&#x5730;&#x65B9;&#x5F04;&#x6765;&#x7684;)&#x7684;&#x4E00;&#x5F20;&#x56FE;&#x3002;</p><p>&#x5E2E;&#x52A9;&#x7406;&#x89E3;&#x561B;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015460488" src="https://static.alili.tech/img/remote/1460000015460488" alt="" title="" style="cursor:pointer"></span></p><p>&#x54CD;&#x5E94;&#x5F0F;&#x7684;&#x6570;&#x636E;&#x6211;&#x4EEC;&#x90FD;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5B8C;&#x6210;&#x4E00;&#x4E0B;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x3002;</p><h3 id="articleHeader7">&#x5B9E;&#x73B0;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;</h3><p>&#x770B;&#x5230;&#x6211;&#x4EEC;html&#x91CC;&#x9762;&#x6709;&#x4E2A;<code>&lt;input placeholder=&quot;123&quot; v-module=&quot;language&quot; /&gt;</code>&#xFF0C;<code>v-module</code>&#x7ED1;&#x5B9A;&#x4E86;&#x4E00;&#x4E2A;<code>language</code>&#xFF0C;&#x7136;&#x540E;&#x5728;<code>Compile&#x7C7B;</code>&#x91CC;&#x9762;&#x7684;<code>replace&#x51FD;&#x6570;</code>&#xFF0C;&#x6211;&#x4EEC;&#x52A0;&#x4E0A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="replace(frag) {
    let vm = this.vm
    Array.from(frag.childNodes).forEach(node =&gt; {
        let txt = node.textContent
        let reg = /\{\{(.*?)\}\}/g
        // &#x5224;&#x65AD;nodeType
+       if (node.nodeType === 1) {
            const nodeAttr = node.attributes // &#x5C5E;&#x6027;&#x96C6;&#x5408;
            Array.from(nodeAttr).forEach(item =&gt; {
                let name = item.name // &#x5C5E;&#x6027;&#x540D;
                let exp = item.value // &#x5C5E;&#x6027;&#x503C;
                // &#x5982;&#x679C;&#x5C5E;&#x6027;&#x6709; v-
                if (name.includes(&apos;v-&apos;)){
                    node.value = vm[exp]
                    node.addEventListener(&apos;input&apos;, e =&gt; {
                        // &#x76F8;&#x5F53;&#x4E8E;&#x7ED9;this.language&#x8D4B;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x503C;
                        // &#x800C;&#x503C;&#x7684;&#x6539;&#x53D8;&#x4F1A;&#x8C03;&#x7528;set&#xFF0C;set&#x4E2D;&#x53C8;&#x4F1A;&#x8C03;&#x7528;notify&#xFF0C;notify&#x4E2D;&#x8C03;&#x7528;watcher&#x7684;update&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x4E86;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;
                        vm[exp] = e.target.value
                    })
                }
            });
+       }
        ...
        ...
    }
  }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>replace(frag) {
    <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">this</span>.vm
    <span class="hljs-built_in">Array</span>.from(frag.childNodes).forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
        <span class="hljs-keyword">let</span> txt = node.textContent
        <span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\{\{(.*?)\}\}/g</span>
        <span class="hljs-comment">// &#x5224;&#x65AD;nodeType</span>
+       <span class="hljs-keyword">if</span> (node.nodeType === <span class="hljs-number">1</span>) {
            <span class="hljs-keyword">const</span> nodeAttr = node.attributes <span class="hljs-comment">// &#x5C5E;&#x6027;&#x96C6;&#x5408;</span>
            <span class="hljs-built_in">Array</span>.from(nodeAttr).forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
                <span class="hljs-keyword">let</span> name = item.name <span class="hljs-comment">// &#x5C5E;&#x6027;&#x540D;</span>
                <span class="hljs-keyword">let</span> exp = item.value <span class="hljs-comment">// &#x5C5E;&#x6027;&#x503C;</span>
                <span class="hljs-comment">// &#x5982;&#x679C;&#x5C5E;&#x6027;&#x6709; v-</span>
                <span class="hljs-keyword">if</span> (name.includes(<span class="hljs-string">&apos;v-&apos;</span>)){
                    node.value = vm[exp]
                    node.addEventListener(<span class="hljs-string">&apos;input&apos;</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
                        <span class="hljs-comment">// &#x76F8;&#x5F53;&#x4E8E;&#x7ED9;this.language&#x8D4B;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x503C;</span>
                        <span class="hljs-comment">// &#x800C;&#x503C;&#x7684;&#x6539;&#x53D8;&#x4F1A;&#x8C03;&#x7528;set&#xFF0C;set&#x4E2D;&#x53C8;&#x4F1A;&#x8C03;&#x7528;notify&#xFF0C;notify&#x4E2D;&#x8C03;&#x7528;watcher&#x7684;update&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x4E86;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;</span>
                        vm[exp] = e.target.value
                    })
                }
            });
+       }
        ...
        ...
    }
  }
</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x7684;<code>input</code>&#x8282;&#x70B9;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;<code>input&#x4E8B;&#x4EF6;</code>&#xFF0C;&#x7136;&#x540E;&#x5F53;<code>input&#x4E8B;&#x4EF6;</code>&#x89E6;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6539;&#x53D8;&#x6211;&#x4EEC;&#x7684;&#x503C;&#xFF0C;&#x800C;&#x503C;&#x7684;&#x6539;&#x53D8;&#x4F1A;&#x8C03;&#x7528;<code>set</code>&#xFF0C;<code>set</code>&#x4E2D;&#x53C8;&#x4F1A;&#x8C03;&#x7528;<code>notify</code>&#xFF0C;<code>notify</code>&#x4E2D;&#x8C03;&#x7528;<code>watcher</code>&#x7684;<code>update</code>&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x4E86;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;&#xFF0C;&#x754C;&#x9762;<br><span class="img-wrap"><img data-src="/img/remote/1460000015460489?w=1304&amp;h=972" src="https://static.alili.tech/img/remote/1460000015460489?w=1304&amp;h=972" alt="" title="" style="cursor:pointer"></span></p><p>&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x6211;&#x4EEC;&#x57FA;&#x672C;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x522B;&#x5FD8;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x4E0A;&#x9762;&#x8FD8;&#x6709;&#x4E2A;&#x6CE8;&#x91CA;&#x6389;&#x7684;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x3002;</p><h3 id="articleHeader8">&#x8BA1;&#x7B97;&#x5C5E;&#x6027;</h3><p>&#x5148;&#x628A;<code>&lt;p&gt;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF1A;"{{"sum"}}"&lt;/p&gt;</code>&#x6CE8;&#x91CA;&#x53BB;&#x6389;&#xFF0C;&#x4EE5;&#x4E3A;&#x4E0A;&#x9762;&#x4E00;&#x5F00;&#x59CB;initVm&#x51FD;&#x6570;&#x91CC;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x52A0;&#x4E86;&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;<code>return this[key] || this._data[key] || this._computed[key]</code>&#xFF0C;&#x5230;&#x8FD9;&#x91CC;&#x5927;&#x5BB6;&#x90FD;&#x660E;&#x767D;&#x4E86;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x628A;this._computed&#x4E5F;&#x52A0;&#x4E00;&#x4E2A;watcher&#x5C31;&#x597D;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Mvvm(options = {}) {
    this.$options = options
    let data = this._data = this.$options.data
    let vm = initVm.call(this)
    initObserve.call(this, data)
+   initComputed.call(this) // &#x6DFB;&#x52A0;&#x8BA1;&#x7B97;&#x51FD;&#x6570;&#xFF0C;&#x6539;&#x53D8;this&#x6307;&#x5411;
    new Compile(this.$options.el, vm)
    return this._vm
}


function initComputed() {
    let vm = this
    let computed = this.$options.computed // &#x62FF;&#x5230;&#x914D;&#x7F6E;&#x7684;computed
    vm._computed = {}
    if (!computed) return // &#x6CA1;&#x6709;&#x8BA1;&#x7B97;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;
    Object.keys(computed).forEach(key =&gt; {
        // &#x76F8;&#x5F53;&#x4E8E;&#x628A;sum&#x91CC;&#x7684;this&#x6307;&#x5411;&#x5230;this._vm&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x62FF;&#x5230;this.a&#x3001;this&#x3001;b
        this._computed[key] = computed[key].call(this._vm)
        // &#x6DFB;&#x52A0;&#x65B0;&#x7684;Watcher
        new Watcher(this._vm, key, val =&gt; {
            // &#x6BCF;&#x6B21;&#x8BBE;&#x7F6E;&#x7684;&#x65F6;&#x5019;&#x90FD;&#x4F1A;&#x8BA1;&#x7B97;
            this._computed[key] = computed[key].call(this._vm)
        })
    })
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>function Mvvm(options = {}) {
    <span class="hljs-keyword">this</span>.$options = options
    let <span class="hljs-keyword">data</span> = <span class="hljs-keyword">this</span>._data = <span class="hljs-keyword">this</span>.$options.<span class="hljs-keyword">data</span>
    let vm = initVm.call(<span class="hljs-keyword">this</span>)
    initObserve.call(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">data</span>)
+   initComputed.call(<span class="hljs-keyword">this</span>) <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x8BA1;&#x7B97;&#x51FD;&#x6570;&#xFF0C;&#x6539;&#x53D8;this&#x6307;&#x5411;</span>
    new Compile(<span class="hljs-keyword">this</span>.$options.el, vm)
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._vm
}


function initComputed() {
    let vm = <span class="hljs-keyword">this</span>
    let computed = <span class="hljs-keyword">this</span>.$options.computed <span class="hljs-comment">// &#x62FF;&#x5230;&#x914D;&#x7F6E;&#x7684;computed</span>
    vm._computed = {}
    <span class="hljs-keyword">if</span> (!computed) <span class="hljs-keyword">return</span> <span class="hljs-comment">// &#x6CA1;&#x6709;&#x8BA1;&#x7B97;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;</span>
    Object.keys(computed).forEach(key =&gt; {
        <span class="hljs-comment">// &#x76F8;&#x5F53;&#x4E8E;&#x628A;sum&#x91CC;&#x7684;this&#x6307;&#x5411;&#x5230;this._vm&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x62FF;&#x5230;this.a&#x3001;this&#x3001;b</span>
        <span class="hljs-keyword">this</span>._computed[key] = computed[key].call(<span class="hljs-keyword">this</span>._vm)
        <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x65B0;&#x7684;Watcher</span>
        new Watcher(<span class="hljs-keyword">this</span>._vm, key, <span class="hljs-keyword">val</span> =&gt; {
            <span class="hljs-comment">// &#x6BCF;&#x6B21;&#x8BBE;&#x7F6E;&#x7684;&#x65F6;&#x5019;&#x90FD;&#x4F1A;&#x8BA1;&#x7B97;</span>
            <span class="hljs-keyword">this</span>._computed[key] = computed[key].call(<span class="hljs-keyword">this</span>._vm)
        })
    })
}
</code></pre><p>&#x4E0A;&#x9762;&#x7684;initComputed &#x5C31;&#x662F;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;watcher&#xFF0C;&#x5927;&#x81F4;&#x6D41;&#x7A0B;&#xFF1A;</p><p>this._vm&#x6539;&#x53D8; ---&gt; vm.set() ---&gt; notify() --&gt;update()--&gt;&#x66F4;&#x65B0;&#x754C;&#x9762;</p><p>&#x6700;&#x540E;&#x770B;&#x770B;&#x56FE;&#x7247;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015460490?w=1238&amp;h=974" src="https://static.alili.tech/img/remote/1460000015460490?w=1238&amp;h=974" alt="" title="" style="cursor:pointer"></span></p><p>&#x4E00;&#x5207;&#x4F3C;&#x4E4E;&#x6CA1;&#x4EC0;&#x4E48;&#x6BDB;&#x75C5;~~~~</p><h3 id="articleHeader9">&#x6DFB;&#x52A0;mounted&#x94A9;&#x5B50;</h3><p>&#x6DFB;&#x52A0;mounted&#x4E5F;&#x5F88;&#x7B80;&#x5355;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5199;&#x6CD5;&#x548C;Vue&#x4E00;&#x6837;
let mvvm = new Mvvm({
    el: &apos;#app&apos;,
    data: {
        ...
        ...
    },
    computed: {
        ...
        ...
    },
    mounted() {
        console.log(&apos;i am mounted&apos;, this.a)
    }
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code><span class="hljs-comment">// &#x5199;&#x6CD5;&#x548C;Vue&#x4E00;&#x6837;</span>
<span class="hljs-keyword">let</span> mvvm = <span class="hljs-literal">new</span> Mvvm({
    el: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-built_in">data</span>: {
        <span class="hljs-params">...</span>
        <span class="hljs-params">...</span>
    },
    computed: {
        <span class="hljs-params">...</span>
        <span class="hljs-params">...</span>
    },
    mounted() {
        console.<span class="hljs-keyword">log</span>(<span class="hljs-string">&apos;i am mounted&apos;</span>, this.a)
    }
})
</code></pre><p>&#x5728;new Mvvm&#x91CC;&#x9762;&#x6DFB;&#x52A0;mounted&#xFF0C;<br>&#x7136;&#x540E;&#x5230;function Mvvm&#x91CC;&#x9762;&#x52A0;&#x4E0A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Mvvm(options = {}) {
    this.$options = options
    let data = this._data = this.$options.data
    let vm = initVm.call(this)
    initObserve.call(this, data)
    initComputed.call(this)
    new Compile(this.$options.el, vm)
+   mounted.call(this._vm) // &#x52A0;&#x4E0A;mounted&#xFF0C;&#x6539;&#x53D8;&#x6307;&#x5411;
    return this._vm
}

// &#x8FD0;&#x884C;mounted
+ function mounted() {
    let mounted = this.$options.mounted
    mounted &amp;&amp; mounted.call(this)
+ }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>function Mvvm(options = {}) {
    <span class="hljs-keyword">this</span>.$options = options
    let <span class="hljs-keyword">data</span> = <span class="hljs-keyword">this</span>._data = <span class="hljs-keyword">this</span>.$options.<span class="hljs-keyword">data</span>
    let vm = initVm.call(<span class="hljs-keyword">this</span>)
    initObserve.call(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">data</span>)
    initComputed.call(<span class="hljs-keyword">this</span>)
    new Compile(<span class="hljs-keyword">this</span>.$options.el, vm)
+   mounted.call(<span class="hljs-keyword">this</span>._vm) <span class="hljs-comment">// &#x52A0;&#x4E0A;mounted&#xFF0C;&#x6539;&#x53D8;&#x6307;&#x5411;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._vm
}

<span class="hljs-comment">// &#x8FD0;&#x884C;mounted</span>
+ function mounted() {
    let mounted = <span class="hljs-keyword">this</span>.$options.mounted
    mounted &amp;&amp; mounted.call(<span class="hljs-keyword">this</span>)
+ }
</code></pre><p>&#x6267;&#x884C;&#x4E4B;&#x540E;&#x4F1A;&#x6253;&#x5370;&#x51FA;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="i am mounted 1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">i</span> am mounted <span class="hljs-number">1</span></code></pre><p>&#x5B8C;&#x7ED3;~~~~&#x6492;&#x82B1;</p><p>ps&#xFF1A;&#x7F16;&#x8BD1;&#x91CC;&#x9762;&#x7684;&#xFF0C;&#x53C2;&#x8003;&#x5230;&#x8FD9;&#x4E2A;&#x5927;&#x795E;&#x7684;&#x64CD;&#x4F5C;&#x3002;@<a href="https://juejin.im/post/5abdd6f6f265da23793c4458" rel="nofollow noreferrer" target="_blank">chenhongdong</a>&#xFF0C;&#x8C22;&#x8C22;&#x5927;&#x4F6C;</p><p>&#x6700;&#x540E;&#x9644;&#x4E0A;&#xFF0C;&#x6E90;&#x4EE3;&#x7801;&#x5730;&#x5740;&#xFF0C;&#x76F4;&#x63A5;&#x4E0B;&#x8F7D;&#x8FD0;&#x884C;&#x5C31;&#x53EF;&#x4EE5;&#x5566;&#x3002;</p><p>&#x6E90;&#x7801;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/naihe138/proxy-mvvm" rel="nofollow noreferrer" target="_blank">https://github.com/naihe138/proxy-mvvm</a></p><p>&#x9884;&#x89C8;&#x5730;&#x5740;&#xFF1A;<a href="http://gitblog.naice.me/proxy-mvvm/index.html" rel="nofollow noreferrer" target="_blank">http://gitblog.naice.me/proxy-mvvm/index.html</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
试着用Proxy 实现一个简单mvvm

## 原文链接
[https://segmentfault.com/a/1190000015460479](https://segmentfault.com/a/1190000015460479)

