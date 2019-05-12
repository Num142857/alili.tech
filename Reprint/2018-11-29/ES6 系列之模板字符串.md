---
title: 'ES6 系列之模板字符串' 
date: 2018-11-29 9:33:05
hidden: true
slug: 07mbbfo419yu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x57FA;&#x7840;&#x7528;&#x6CD5;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let message = `Hello World`;
console.log(message);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> message = <span class="hljs-string">`Hello World`</span>;
<span class="hljs-built_in">console</span>.log(message);</code></pre>
<p>&#x5982;&#x679C;&#x4F60;&#x78B0;&#x5DE7;&#x8981;&#x5728;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x4F7F;&#x7528;&#x53CD;&#x6487;&#x53F7;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x53CD;&#x659C;&#x6760;&#x8F6C;&#x4E49;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let message = `Hello \` World`;
console.log(message);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> message = <span class="hljs-string">`Hello \` World`</span>;
<span class="hljs-built_in">console</span>.log(message);</code></pre>
<p>&#x503C;&#x5F97;&#x4E00;&#x63D0;&#x7684;&#x662F;&#xFF0C;&#x5728;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#xFF0C;&#x7A7A;&#x683C;&#x3001;&#x7F29;&#x8FDB;&#x3001;&#x6362;&#x884C;&#x90FD;&#x4F1A;&#x88AB;&#x4FDD;&#x7559;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let message = `
    &lt;ul&gt;
        &lt;li&gt;1&lt;/li&gt;
        &lt;li&gt;2&lt;/li&gt;
    &lt;/ul&gt;
`;
console.log(message);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> message = <span class="hljs-string">`
    &lt;ul&gt;
        &lt;li&gt;1&lt;/li&gt;
        &lt;li&gt;2&lt;/li&gt;
    &lt;/ul&gt;
`</span>;
<span class="hljs-built_in">console</span>.log(message);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015094998?w=1358&amp;h=350" src="https://static.alili.tech/img/remote/1460000015094998?w=1358&amp;h=350" alt="string" title="string" style="cursor: pointer; display: inline;"></span></p>
<p>&#x6CE8;&#x610F;&#xFF0C;&#x6253;&#x5370;&#x7684;&#x7ED3;&#x679C;&#x4E2D;&#x7B2C;&#x4E00;&#x884C;&#x662F;&#x4E00;&#x4E2A;&#x6362;&#x884C;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; trim &#x51FD;&#x6570;&#x6D88;&#x9664;&#x6362;&#x884C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let message = `
    &lt;ul&gt;
        &lt;li&gt;1&lt;/li&gt;
        &lt;li&gt;2&lt;/li&gt;
    &lt;/ul&gt;
`.trim();
console.log(message);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> message = <span class="hljs-string">`
    &lt;ul&gt;
        &lt;li&gt;1&lt;/li&gt;
        &lt;li&gt;2&lt;/li&gt;
    &lt;/ul&gt;
`</span>.trim();
<span class="hljs-built_in">console</span>.log(message);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015094999" src="https://static.alili.tech/img/remote/1460000015094999" alt="string" title="string" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">&#x5D4C;&#x5165;&#x53D8;&#x91CF;</h2>
<p>&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x652F;&#x6301;&#x5D4C;&#x5165;&#x53D8;&#x91CF;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5C06;&#x53D8;&#x91CF;&#x540D;&#x5199;&#x5728; ${} &#x4E4B;&#x4E2D;&#xFF0C;&#x5176;&#x5B9E;&#x4E0D;&#x6B62;&#x53D8;&#x91CF;&#xFF0C;&#x4EFB;&#x610F;&#x7684; JavaScript &#x8868;&#x8FBE;&#x5F0F;&#x90FD;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x = 1, y = 2;
let message = `&lt;ul&gt;&lt;li&gt;${x}&lt;/li&gt;&lt;li&gt;${x + y}&lt;/li&gt;&lt;/ul&gt;`;
console.log(message); // &lt;ul&gt;&lt;li&gt;1&lt;/li&gt;&lt;li&gt;3&lt;/li&gt;&lt;/ul&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> x = <span class="hljs-number">1</span>, y = <span class="hljs-number">2</span>;
<span class="hljs-keyword">let</span> message = <span class="hljs-string">`&lt;ul&gt;&lt;li&gt;<span class="hljs-subst">${x}</span>&lt;/li&gt;&lt;li&gt;<span class="hljs-subst">${x + y}</span>&lt;/li&gt;&lt;/ul&gt;`</span>;
<span class="hljs-built_in">console</span>.log(message); <span class="hljs-comment">// &lt;ul&gt;&lt;li&gt;1&lt;/li&gt;&lt;li&gt;3&lt;/li&gt;&lt;/ul&gt;</span></code></pre>
<p>&#x503C;&#x5F97;&#x4E00;&#x63D0;&#x7684;&#x662F;&#xFF0C;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x652F;&#x6301;&#x5D4C;&#x5957;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [{value: 1}, {value: 2}];
let message = `
    &lt;ul&gt;
        ${arr.map((item) =&gt; {
            return `
                &lt;li&gt;${item.value}&lt;/li&gt;
            `
        })}
    &lt;/ul&gt;
`;
console.log(message);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> arr = [{<span class="hljs-attr">value</span>: <span class="hljs-number">1</span>}, {<span class="hljs-attr">value</span>: <span class="hljs-number">2</span>}];
<span class="hljs-keyword">let</span> message = <span class="hljs-string">`
    &lt;ul&gt;
        <span class="hljs-subst">${arr.map((item) =&gt; {
            <span class="hljs-keyword">return</span> <span class="hljs-string">`
                &lt;li&gt;<span class="hljs-subst">${item.value}</span>&lt;/li&gt;
            `</span>
        }</span>)}
    &lt;/ul&gt;
`</span>;
<span class="hljs-built_in">console</span>.log(message);</code></pre>
<p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015095000?w=1344&amp;h=556" src="https://static.alili.tech/img/remote/1460000015095000?w=1344&amp;h=556" alt="string" title="string" style="cursor: pointer;"></span></p>
<p>&#x6CE8;&#x610F;&#xFF0C;&#x5728; li &#x6807;&#x7B7E;&#x4E2D;&#x95F4;&#x591A;&#x4E86;&#x4E00;&#x4E2A;&#x9017;&#x53F7;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x5F53;&#x5927;&#x62EC;&#x53F7;&#x4E2D;&#x7684;&#x503C;&#x4E0D;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x65F6;&#xFF0C;&#x4F1A;&#x5C06;&#x5176;&#x8F6C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x6BD4;&#x5982;&#x4E00;&#x4E2A;&#x6570;&#x7EC4; [1, 2, 3] &#x5C31;&#x4F1A;&#x88AB;&#x8F6C;&#x4E3A; 1,2,3&#xFF0C;&#x9017;&#x53F7;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x4EA7;&#x751F;&#x7684;&#x3002;</p>
<p>&#x5982;&#x679C;&#x4F60;&#x8981;&#x6D88;&#x9664;&#x8FD9;&#x4E2A;&#x9017;&#x53F7;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5148; join &#x4E00;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [{value: 1}, {value: 2}];
let message = `
    &lt;ul&gt;
        ${arr.map((item) =&gt; {
            return `
                &lt;li&gt;${item.value}&lt;/li&gt;
            `
        }).join(&apos;&apos;)}
    &lt;/ul&gt;
`;
console.log(message);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> arr = [{<span class="hljs-attr">value</span>: <span class="hljs-number">1</span>}, {<span class="hljs-attr">value</span>: <span class="hljs-number">2</span>}];
<span class="hljs-keyword">let</span> message = <span class="hljs-string">`
    &lt;ul&gt;
        <span class="hljs-subst">${arr.map((item) =&gt; {
            <span class="hljs-keyword">return</span> <span class="hljs-string">`
                &lt;li&gt;<span class="hljs-subst">${item.value}</span>&lt;/li&gt;
            `</span>
        }</span>).join(&apos;&apos;)}
    &lt;/ul&gt;
`</span>;
<span class="hljs-built_in">console</span>.log(message);</code></pre>
<p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015095001?w=1280&amp;h=552" src="https://static.alili.tech/img/remote/1460000015095001?w=1280&amp;h=552" alt="string" title="string" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">&#x6807;&#x7B7E;&#x6A21;&#x677F;</h2>
<p>&#x6A21;&#x677F;&#x6807;&#x7B7E;&#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x91CD;&#x8981;&#x7684;&#x80FD;&#x529B;&#xFF0C;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x53EF;&#x4EE5;&#x7D27;&#x8DDF;&#x5728;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x540D;&#x540E;&#x9762;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x5C06;&#x88AB;&#x8C03;&#x7528;&#x6765;&#x5904;&#x7406;&#x8FD9;&#x4E2A;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x = &apos;Hi&apos;, y = &apos;Kevin&apos;;
var res = message`${x}, I am ${y}`;
console.log(res);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> x = <span class="hljs-string">&apos;Hi&apos;</span>, y = <span class="hljs-string">&apos;Kevin&apos;</span>;
<span class="hljs-keyword">var</span> res = message<span class="hljs-string">`<span class="hljs-subst">${x}</span>, I am <span class="hljs-subst">${y}</span>`</span>;
<span class="hljs-built_in">console</span>.log(res);</code></pre>
<p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49; message &#x51FD;&#x6570;&#x6765;&#x5904;&#x7406;&#x8FD4;&#x56DE;&#x7684;&#x5B57;&#x7B26;&#x4E32;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// literals &#x6587;&#x5B57;
// &#x6CE8;&#x610F;&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D; literals &#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x548C;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x662F;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;
function message(literals, value1, value2) {
    console.log(literals); // [ &quot;&quot;, &quot;, I am &quot;, &quot;&quot; ]
    console.log(value1); // Hi
    console.log(value2); // Kevin
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// literals &#x6587;&#x5B57;</span>
<span class="hljs-comment">// &#x6CE8;&#x610F;&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D; literals &#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x548C;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x662F;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">message</span>(<span class="hljs-params">literals, value1, value2</span>) </span>{
    <span class="hljs-built_in">console</span>.log(literals); <span class="hljs-comment">// [ &quot;&quot;, &quot;, I am &quot;, &quot;&quot; ]</span>
    <span class="hljs-built_in">console</span>.log(value1); <span class="hljs-comment">// Hi</span>
    <span class="hljs-built_in">console</span>.log(value2); <span class="hljs-comment">// Kevin</span>
}</code></pre>
<p>&#x6211;&#x4EEC;&#x5229;&#x7528;&#x8FD9;&#x4E9B;&#x53C2;&#x6570;&#x5C06;&#x5176;&#x62FC;&#x5408;&#x56DE;&#x53BB;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function message(literals, ...values) {
    let result = &apos;&apos;;

    for (let i = 0; i &lt; values.length; i++) {
        result += literals[i];
        result += values[i];
    }

    result += literals[literals.length - 1];

    return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">message</span>(<span class="hljs-params">literals, ...values</span>) </span>{
    <span class="hljs-keyword">let</span> result = <span class="hljs-string">&apos;&apos;</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; values.length; i++) {
        result += literals[i];
        result += values[i];
    }

    result += literals[literals.length - <span class="hljs-number">1</span>];

    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5199;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function message(literals, ...values) {
    let result = literals.reduce((prev, next, i) =&gt; {
        let value = values[i - 1];
        return prev + value + next;
    });

    return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">message</span>(<span class="hljs-params">literals, ...values</span>) </span>{
    <span class="hljs-keyword">let</span> result = literals.reduce(<span class="hljs-function">(<span class="hljs-params">prev, next, i</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> value = values[i - <span class="hljs-number">1</span>];
        <span class="hljs-keyword">return</span> prev + value + next;
    });

    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>&#x5B66;&#x7740;&#x62FC;&#x5408;&#x56DE;&#x53BB;&#x662F;&#x4E00;&#x4EF6;&#x975E;&#x5E38;&#x91CD;&#x8981;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x7ECF;&#x8FC7;&#x5404;&#x79CD;&#x5904;&#x7406;&#xFF0C;&#x6700;&#x7EC8;&#x90FD;&#x8FD8;&#x662F;&#x8981;&#x62FC;&#x56DE;&#x53BB;&#x7684;&#x2026;&#x2026;</p>
<h3 id="articleHeader3">oneLine</h3>
<p>&#x8BB2;&#x5B8C;&#x4E86;&#x57FA;&#x7840;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6765;&#x770B;&#x4E00;&#x4E9B;&#x5B9E;&#x9645;&#x7684;&#x9700;&#x6C42;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let message = `
    Hi,
    Daisy!
    I am
    Kevin.
`;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> message = <span class="hljs-string">`
    Hi,
    Daisy!
    I am
    Kevin.
`</span>;</code></pre>
<p>&#x51FA;&#x4E8E;&#x53EF;&#x8BFB;&#x6027;&#x6216;&#x8005;&#x5176;&#x4ED6;&#x539F;&#x56E0;&#xFF0C;&#x6211;&#x5E0C;&#x671B;&#x4E66;&#x5199;&#x7684;&#x65F6;&#x5019;&#x662F;&#x6362;&#x884C;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#x7684;&#x5B57;&#x7B26;&#x662F;&#x5728;&#x4E00;&#x884C;&#xFF0C;&#x8FD9;&#x5C31;&#x9700;&#x8981;&#x501F;&#x52A9;&#x6A21;&#x677F;&#x6807;&#x7B7E;&#x6765;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x5C1D;&#x8BD5;&#x5199;&#x4E00;&#x4E2A;&#x8FD9;&#x6837;&#x7684;&#x51FD;&#x6570;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// oneLine &#x7B2C;&#x4E00;&#x7248;
function oneLine(template, ...expressions) {
    let result = template.reduce((prev, next, i) =&gt; {
        let expression = expressions[i - 1];
        return prev + expression + next;
    });

    result = result.replace(/(\s+)/g, &quot; &quot;);
    result = result.trim();

    return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// oneLine &#x7B2C;&#x4E00;&#x7248;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">oneLine</span>(<span class="hljs-params">template, ...expressions</span>) </span>{
    <span class="hljs-keyword">let</span> result = template.reduce(<span class="hljs-function">(<span class="hljs-params">prev, next, i</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> expression = expressions[i - <span class="hljs-number">1</span>];
        <span class="hljs-keyword">return</span> prev + expression + next;
    });

    result = result.replace(<span class="hljs-regexp">/(\s+)/g</span>, <span class="hljs-string">&quot; &quot;</span>);
    result = result.trim();

    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x62FC;&#x5408;&#x56DE;&#x53BB;&#x7136;&#x540E;&#x5C06;&#x591A;&#x4E2A;&#x7A7A;&#x767D;&#x7B26;&#x5982;&#x6362;&#x884C;&#x7B26;&#x3001;&#x7A7A;&#x683C;&#x7B49;&#x66FF;&#x6362;&#x6210;&#x4E00;&#x4E2A;&#x7A7A;&#x683C;&#x3002;</p>
<p>&#x4F7F;&#x7528;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let message = oneLine `
    Hi,
    Daisy!
    I am
    Kevin.
`;
console.log(message); // Hi, Daisy! I am Kevin." title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> message = oneLine <span class="hljs-string">`
    Hi,
    Daisy!
    I am
    Kevin.
`</span>;
<span class="hljs-built_in">console</span>.log(message); <span class="hljs-comment">// Hi, Daisy! I am Kevin.</span></code></pre>
<p>&#x4E0D;&#x8FC7;&#x4F60;&#x518D;&#x7528;&#x4E0B;&#x53BB;&#x5C31;&#x4F1A;&#x53D1;&#x73B0;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5982;&#x679C;&#x5B57;&#x7B26;&#x95F4;&#x5C31;&#x5305;&#x62EC;&#x591A;&#x4E2A;&#x7A7A;&#x683C;&#x5462;&#xFF1F;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let message = oneLine`
  Preserve eg sentences.  Double
  spaces within input lines.
`;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> message = oneLine<span class="hljs-string">`
  Preserve eg sentences.  Double
  spaces within input lines.
`</span>;</code></pre>
<p>&#x5982;&#x679C;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x5339;&#x914D;&#x65B9;&#x5F0F;&#xFF0C;<code>sentences.</code> &#x4E0E; <code>Double</code> &#x4E4B;&#x95F4;&#x7684;&#x4E24;&#x4E2A;&#x7A7A;&#x683C;&#x4E5F;&#x4F1A;&#x88AB;&#x66FF;&#x6362;&#x6210;&#x4E00;&#x4E2A;&#x7A7A;&#x683C;&#x3002;</p>
<p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x518D;&#x4F18;&#x5316;&#x4E00;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x6548;&#x679C;&#x662F;&#x5C06;&#x6BCF;&#x884C;&#x524D;&#x9762;&#x7684;&#x591A;&#x4E2A;&#x7A7A;&#x683C;&#x66FF;&#x6362;&#x6210;&#x4E00;&#x4E2A;&#x7A7A;&#x683C;&#xFF0C;&#x5176;&#x5B9E;&#x5E94;&#x8BE5;&#x5339;&#x914D;&#x7684;&#x662F;&#x6362;&#x884C;&#x7B26;&#x4EE5;&#x53CA;&#x6362;&#x884C;&#x7B26;&#x540E;&#x9762;&#x7684;&#x591A;&#x4E2A;&#x7A7A;&#x683C;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x5176;&#x66FF;&#x6362;&#x6210;&#x4E00;&#x4E2A;&#x7A7A;&#x683C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#x6B63;&#x5219;&#x6539;&#x6210;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result = result.replace(/(\n\s*)/g, &quot; &quot;);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">result = result.replace(<span class="hljs-regexp">/(\n\s*)/g</span>, <span class="hljs-string">&quot; &quot;</span>);</code></pre>
<p>&#x5C31;&#x53EF;&#x4EE5;&#x6B63;&#x786E;&#x7684;&#x5339;&#x914D;&#x4EE3;&#x7801;&#x3002;&#x6700;&#x7EC8;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// oneLine &#x7B2C;&#x4E8C;&#x7248;
function oneLine(template, ...expressions) {
    let result = template.reduce((prev, next, i) =&gt; {
        let expression = expressions[i - 1];
        return prev + expression + next;
    });

    result = result.replace(/(\n\s*)/g, &quot; &quot;);
    result = result.trim();

    return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// oneLine &#x7B2C;&#x4E8C;&#x7248;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">oneLine</span>(<span class="hljs-params">template, ...expressions</span>) </span>{
    <span class="hljs-keyword">let</span> result = template.reduce(<span class="hljs-function">(<span class="hljs-params">prev, next, i</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> expression = expressions[i - <span class="hljs-number">1</span>];
        <span class="hljs-keyword">return</span> prev + expression + next;
    });

    result = result.replace(<span class="hljs-regexp">/(\n\s*)/g</span>, <span class="hljs-string">&quot; &quot;</span>);
    result = result.trim();

    <span class="hljs-keyword">return</span> result;
}</code></pre>
<h3 id="articleHeader4">stripIndents</h3>
<p>&#x5047;&#x8BBE;&#x6709;&#x8FD9;&#x6837;&#x4E00;&#x6BB5; HTML&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let html = `
    &lt;span&gt;1&lt;span&gt;
    &lt;span&gt;2&lt;span&gt;
        &lt;span&gt;3&lt;span&gt;
`;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> html = <span class="hljs-string">`
    &lt;span&gt;1&lt;span&gt;
    &lt;span&gt;2&lt;span&gt;
        &lt;span&gt;3&lt;span&gt;
`</span>;</code></pre>
<p>&#x4E3A;&#x4E86;&#x4FDD;&#x6301;&#x53EF;&#x8BFB;&#x6027;&#xFF0C;&#x6211;&#x5E0C;&#x671B;&#x6700;&#x7EC8;&#x8F93;&#x5165;&#x7684;&#x6837;&#x5F0F;&#x4E3A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span&gt;1&lt;span&gt;
&lt;span&gt;2&lt;span&gt;
&lt;span&gt;3&lt;span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;span&gt;<span class="hljs-number">1</span>&lt;span&gt;
&lt;span&gt;2&lt;span&gt;
&lt;span&gt;3&lt;span&gt;</code></pre>
<p>&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5339;&#x914D;&#x6BCF;&#x884C;&#x524D;&#x9762;&#x7684;&#x7A7A;&#x683C;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x5176;&#x66FF;&#x6362;&#x4E3A;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// stripIndents &#x7B2C;&#x4E00;&#x7248;
function stripIndents(template, ...expressions) {
    let result = template.reduce((prev, next, i) =&gt; {
        let expression = expressions[i - 1];
        return prev + expression + next;
    });


    result = result.replace(/\n[^\S\n]*/g, &apos;\n&apos;);
    result = result.trim();

    return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// stripIndents &#x7B2C;&#x4E00;&#x7248;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stripIndents</span>(<span class="hljs-params">template, ...expressions</span>) </span>{
    <span class="hljs-keyword">let</span> result = template.reduce(<span class="hljs-function">(<span class="hljs-params">prev, next, i</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> expression = expressions[i - <span class="hljs-number">1</span>];
        <span class="hljs-keyword">return</span> prev + expression + next;
    });


    result = result.replace(<span class="hljs-regexp">/\n[^\S\n]*/g</span>, <span class="hljs-string">&apos;\n&apos;</span>);
    result = result.trim();

    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>&#x6700;&#x96BE;&#x7684;&#x6216;&#x8BB8;&#x5C31;&#x662F;&#x8FD9;&#x4E2A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result = result.replace(/\n[^\S\n]*/g, &apos;\n&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">result = result.replace(<span class="hljs-regexp">/\n[^\S\n]*/g</span>, <span class="hljs-string">&apos;\n&apos;</span>);</code></pre>
<p><code>\S</code> &#x8868;&#x793A;&#x5339;&#x914D;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x767D;&#x5B57;&#x7B26;</p>
<p><code>[^\S\n]</code> &#x8868;&#x793A;&#x5339;&#x914D;<code>&#x975E;&#x7A7A;&#x767D;&#x5B57;&#x7B26;</code>&#x548C;<code>&#x6362;&#x884C;&#x7B26;</code>&#x4E4B;&#x5916;&#x7684;&#x5B57;&#x7B26;&#xFF0C;&#x5176;&#x5B9E;&#x4E5F;&#x5C31;&#x662F;&#x7A7A;&#x767D;&#x5B57;&#x7B26;&#x53BB;&#x9664;&#x6362;&#x884C;&#x7B26;</p>
<p><code>\n[^\S\n]*</code> &#x8868;&#x793A;&#x5339;&#x914D;&#x6362;&#x884C;&#x7B26;&#x4EE5;&#x53CA;&#x6362;&#x884C;&#x7B26;&#x540E;&#x7684;&#x591A;&#x4E2A;&#x4E0D;&#x5305;&#x542B;&#x6362;&#x884C;&#x7B26;&#x7684;&#x7A7A;&#x767D;&#x5B57;&#x7B26;</p>
<p><code>replace(/\n[^\S\n]*/g, &apos;\n&apos;)</code> &#x8868;&#x793A;&#x5C06;&#x4E00;&#x4E2A;&#x6362;&#x884C;&#x7B26;&#x4EE5;&#x53CA;&#x6362;&#x884C;&#x7B26;&#x540E;&#x7684;&#x591A;&#x4E2A;&#x4E0D;&#x5305;&#x542B;&#x6362;&#x884C;&#x7B26;&#x7684;&#x7A7A;&#x767D;&#x5B57;&#x7B26;&#x66FF;&#x6362;&#x6210;&#x4E00;&#x4E2A;&#x6362;&#x884C;&#x7B26;&#xFF0C;&#x5176;&#x5B9E;&#x4E5F;&#x5C31;&#x662F;&#x5C06;&#x6362;&#x884C;&#x7B26;&#x540E;&#x9762;&#x7684;&#x7A7A;&#x767D;&#x5B57;&#x7B26;&#x6D88;&#x6389;&#x7684;&#x610F;&#x601D;</p>
<p>&#x5176;&#x5B9E;&#x5427;&#xFF0C;&#x4E0D;&#x7528;&#x5199;&#x7684;&#x8FD9;&#x4E48;&#x9EBB;&#x70E6;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5199;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result = result.replace(/^[^\S\n]+/gm, &apos;&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">result = result.replace(<span class="hljs-regexp">/^[^\S\n]+/gm</span>, <span class="hljs-string">&apos;&apos;</span>);</code></pre>
<p>&#x770B;&#x4F3C;&#x7B80;&#x5355;&#x4E86;&#x4E00;&#x70B9;&#xFF0C;&#x4E4B;&#x6240;&#x4EE5;&#x80FD;&#x8FD9;&#x6837;&#x5199;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x5339;&#x914D;&#x6A21;&#x5F0F;&#x7684;&#x7F18;&#x6545;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x8FD9;&#x6B21;&#x9664;&#x4E86;&#x5339;&#x914D;&#x5168;&#x5C40;&#x4E4B;&#x5916;&#xFF0C;&#x8FD9;&#x6B21;&#x6211;&#x4EEC;&#x8FD8;&#x5339;&#x914D;&#x4E86;&#x591A;&#x884C;&#xFF0C;m &#x6807;&#x5FD7;&#x7528;&#x4E8E;&#x6307;&#x5B9A;&#x591A;&#x884C;&#x8F93;&#x5165;&#x5B57;&#x7B26;&#x4E32;&#x65F6;&#x5E94;&#x8BE5;&#x88AB;&#x89C6;&#x4E3A;&#x591A;&#x4E2A;&#x884C;&#xFF0C;&#x800C;&#x4E14;&#x5982;&#x679C;&#x4F7F;&#x7528; m &#x6807;&#x5FD7;&#xFF0C;^ &#x548C; $ &#x5339;&#x914D;&#x7684;&#x5F00;&#x59CB;&#x6216;&#x7ED3;&#x675F;&#x662F;&#x8F93;&#x5165;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x884C;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6574;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5F00;&#x59CB;&#x6216;&#x7ED3;&#x675F;&#x3002;</p>
<p><sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup> &#x8868;&#x793A;&#x5339;&#x914D;&#x7A7A;&#x767D;&#x5B57;&#x7B26;&#x53BB;&#x9664;&#x6362;&#x884C;&#x7B26;</p>
<p>^<sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup>+ &#x8868;&#x793A;&#x5339;&#x914D;&#x4EE5;<code>&#x53BB;&#x9664;&#x6362;&#x884C;&#x7B26;&#x7684;&#x7A7A;&#x767D;&#x5B57;&#x7B26;</code>&#x4E3A;&#x5F00;&#x5934;&#x7684;&#x4E00;&#x4E2A;&#x6216;&#x8005;&#x591A;&#x4E2A;&#x5B57;&#x7B26;</p>
<p>result.replace(/^<sup id="fnref-3"><a href="#fn-3" class="footnote-ref">3</a></sup>+/gm, &apos;&apos;) &#x8868;&#x793A;&#x5C06;&#x6BCF;&#x884C;&#x5F00;&#x5934;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;<code>&#x53BB;&#x9664;&#x6362;&#x884C;&#x7B26;&#x7684;&#x7A7A;&#x767D;&#x5B57;&#x7B26;</code>&#x66FF;&#x6362;&#x6210;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x4E5F;&#x540C;&#x6837;&#x8FBE;&#x5230;&#x4E86;&#x76EE;&#x7684;&#x3002;</p>
<p>&#x6700;&#x7EC8;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// stripIndents &#x7B2C;&#x4E8C;&#x7248;
function stripIndents(template, ...expressions) {
    let result = template.reduce((prev, next, i) =&gt; {
        let expression = expressions[i - 1];
        return prev + expression + next;
    });


    result = result.replace(/^[^\S\n]+/gm, &apos;&apos;);
    result = result.trim();

    return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// stripIndents &#x7B2C;&#x4E8C;&#x7248;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stripIndents</span>(<span class="hljs-params">template, ...expressions</span>) </span>{
    <span class="hljs-keyword">let</span> result = template.reduce(<span class="hljs-function">(<span class="hljs-params">prev, next, i</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> expression = expressions[i - <span class="hljs-number">1</span>];
        <span class="hljs-keyword">return</span> prev + expression + next;
    });


    result = result.replace(<span class="hljs-regexp">/^[^\S\n]+/gm</span>, <span class="hljs-string">&apos;&apos;</span>);
    result = result.trim();

    <span class="hljs-keyword">return</span> result;
}</code></pre>
<h3 id="articleHeader5">stripIndent</h3>
<p>&#x6CE8;&#x610F;&#xFF0C;&#x8FD9;&#x6B21;&#x7684; stripIndent &#x76F8;&#x6BD4;&#x4E0A;&#x9762;&#x4E00;&#x8282;&#x7684;&#x6807;&#x9898;&#x5C11;&#x4E86;&#x4E00;&#x4E2A;&#x5B57;&#x6BCD; s&#xFF0C;&#x800C;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x529F;&#x80FD;&#x662F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let html = `
    &lt;ul&gt;
        &lt;li&gt;1&lt;/li&gt;
        &lt;li&gt;2&lt;/li&gt;
        &lt;li&gt;3&lt;/li&gt;
    &lt;ul&gt;
`;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> html = <span class="hljs-string">`
    &lt;ul&gt;
        &lt;li&gt;1&lt;/li&gt;
        &lt;li&gt;2&lt;/li&gt;
        &lt;li&gt;3&lt;/li&gt;
    &lt;ul&gt;
`</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015095002" src="https://static.alili.tech/img/remote/1460000015095002" alt="string" title="string" style="cursor: pointer; display: inline;"></span></p>
<p>&#x5176;&#x5B9E;&#x4E5F;&#x5C31;&#x662F;&#x53BB;&#x9664;&#x7B2C;&#x4E00;&#x884C;&#x7684;&#x6362;&#x884C;&#x4EE5;&#x53CA;&#x6BCF;&#x4E00;&#x884C;&#x7684;&#x90E8;&#x5206;&#x7F29;&#x8FDB;&#x3002;</p>
<p>&#x8FD9;&#x4E2A;&#x5B9E;&#x73B0;&#x5C31;&#x7A0D;&#x5FAE;&#x9EBB;&#x70E6;&#x4E86;&#x4E00;&#x70B9;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x8981;&#x8BA1;&#x7B97;&#x51FA;&#x6BCF;&#x4E00;&#x884C;&#x5230;&#x5E95;&#x8981;&#x53BB;&#x9664;&#x591A;&#x5C11;&#x4E2A;&#x7A7A;&#x767D;&#x5B57;&#x7B26;&#x3002;</p>
<p>&#x5B9E;&#x73B0;&#x7684;&#x601D;&#x8DEF;&#x5982;&#x4E0B;&#xFF1A;</p>
<ol>
<li>&#x4F7F;&#x7528; match &#x51FD;&#x6570;&#xFF0C;&#x5339;&#x914D;&#x6BCF;&#x4E00;&#x884C;&#x7684;&#x7A7A;&#x767D;&#x5B57;&#x7B26;&#xFF0C;&#x5F97;&#x5230;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x6BCF;&#x4E00;&#x884C;&#x7A7A;&#x767D;&#x5B57;&#x7B26;&#x7684;&#x6570;&#x7EC4;</li>
<li>&#x6570;&#x7EC4;&#x904D;&#x5386;&#x6BD4;&#x8F83;&#xFF0C;&#x5F97;&#x5230;&#x6700;&#x5C0F;&#x7684;&#x7A7A;&#x767D;&#x5B57;&#x7B26;&#x957F;&#x5EA6;</li>
<li>&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x7136;&#x540E;&#x6BCF;&#x4E00;&#x884C;&#x90FD;&#x66FF;&#x6362;&#x6389;&#x6700;&#x5C0F;&#x957F;&#x5EA6;&#x7684;&#x7A7A;&#x767D;&#x5B57;&#x7B26;</li>
</ol>
<p>&#x5B9E;&#x73B0;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let html = `
    &lt;ul&gt;
        &lt;li&gt;1&lt;/li&gt;
        &lt;li&gt;2&lt;/li&gt;
        &lt;li&gt;3&lt;/li&gt;
    &lt;ul&gt;
`;


function stripIndent(template, ...expressions) {
    let result = template.reduce((prev, next, i) =&gt; {
        let expression = expressions[i - 1];
        return prev + expression + next;
    });

    const match = result.match(/^[^\S\n]*(?=\S)/gm);
    console.log(match); // Array [ &quot;    &quot;, &quot;        &quot;, &quot;        &quot;, &quot;        &quot;, &quot;    &quot; ]

    const indent = match &amp;&amp; Math.min(...match.map(el =&gt; el.length));
    console.log(indent); // 4

    if (indent) {
        const regexp = new RegExp(`^.{${indent"}}"`, &apos;gm&apos;);
        console.log(regexp); // /^.{4}/gm

        result =  result.replace(regexp, &apos;&apos;);
    }

    result = result.trim();

    return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> html = <span class="hljs-string">`
    &lt;ul&gt;
        &lt;li&gt;1&lt;/li&gt;
        &lt;li&gt;2&lt;/li&gt;
        &lt;li&gt;3&lt;/li&gt;
    &lt;ul&gt;
`</span>;


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stripIndent</span>(<span class="hljs-params">template, ...expressions</span>) </span>{
    <span class="hljs-keyword">let</span> result = template.reduce(<span class="hljs-function">(<span class="hljs-params">prev, next, i</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> expression = expressions[i - <span class="hljs-number">1</span>];
        <span class="hljs-keyword">return</span> prev + expression + next;
    });

    <span class="hljs-keyword">const</span> match = result.match(<span class="hljs-regexp">/^[^\S\n]*(?=\S)/gm</span>);
    <span class="hljs-built_in">console</span>.log(match); <span class="hljs-comment">// Array [ &quot;    &quot;, &quot;        &quot;, &quot;        &quot;, &quot;        &quot;, &quot;    &quot; ]</span>

    <span class="hljs-keyword">const</span> indent = match &amp;&amp; <span class="hljs-built_in">Math</span>.min(...match.map(<span class="hljs-function"><span class="hljs-params">el</span> =&gt;</span> el.length));
    <span class="hljs-built_in">console</span>.log(indent); <span class="hljs-comment">// 4</span>

    <span class="hljs-keyword">if</span> (indent) {
        <span class="hljs-keyword">const</span> regexp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">`^.{<span class="hljs-subst">${indent}</span>}`</span>, <span class="hljs-string">&apos;gm&apos;</span>);
        <span class="hljs-built_in">console</span>.log(regexp); <span class="hljs-comment">// /^.{4}/gm</span>

        result =  result.replace(regexp, <span class="hljs-string">&apos;&apos;</span>);
    }

    result = result.trim();

    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>&#x503C;&#x5F97;&#x4E00;&#x63D0;&#x7684;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x4F1A;&#x4EE5;&#x4E3A;&#x6B63;&#x5219;&#x4E2D; <code>.</code> &#x8868;&#x793A;&#x5339;&#x914D;&#x4EFB;&#x610F;&#x5B57;&#x7B26;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x5339;&#x914D;&#x9664;&#x6362;&#x884C;&#x7B26;&#x4E4B;&#x5916;&#x7684;&#x4EFB;&#x4F55;&#x5355;&#x4E2A;&#x5B57;&#x7B26;&#x3002;</p>
<p>&#x6700;&#x7EC8;&#x7CBE;&#x7B80;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function stripIndent(template, ...expressions) {
    let result = template.reduce((prev, next, i) =&gt; {
        let expression = expressions[i - 1];
        return prev + expression + next;
    });

    const match = result.match(/^[^\S\n]*(?=\S)/gm);
    const indent = match &amp;&amp; Math.min(...match.map(el =&gt; el.length));

    if (indent) {
        const regexp = new RegExp(`^.{${indent"}}"`, &apos;gm&apos;);
        result =  result.replace(regexp, &apos;&apos;);
    }

    result = result.trim();

    return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stripIndent</span>(<span class="hljs-params">template, ...expressions</span>) </span>{
    <span class="hljs-keyword">let</span> result = template.reduce(<span class="hljs-function">(<span class="hljs-params">prev, next, i</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> expression = expressions[i - <span class="hljs-number">1</span>];
        <span class="hljs-keyword">return</span> prev + expression + next;
    });

    <span class="hljs-keyword">const</span> match = result.match(<span class="hljs-regexp">/^[^\S\n]*(?=\S)/gm</span>);
    <span class="hljs-keyword">const</span> indent = match &amp;&amp; <span class="hljs-built_in">Math</span>.min(...match.map(<span class="hljs-function"><span class="hljs-params">el</span> =&gt;</span> el.length));

    <span class="hljs-keyword">if</span> (indent) {
        <span class="hljs-keyword">const</span> regexp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">`^.{<span class="hljs-subst">${indent}</span>}`</span>, <span class="hljs-string">&apos;gm&apos;</span>);
        result =  result.replace(regexp, <span class="hljs-string">&apos;&apos;</span>);
    }

    result = result.trim();

    <span class="hljs-keyword">return</span> result;
}</code></pre>
<h3 id="articleHeader6">includeArrays</h3>
<p>&#x524D;&#x9762;&#x6211;&#x4EEC;&#x8BB2;&#x5230;&#x4E3A;&#x4E86;&#x907F;&#x514D; ${} &#x8868;&#x8FBE;&#x5F0F;&#x4E2D;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x81EA;&#x52A8;&#x8F6C;&#x6362;&#x4F1A;&#x5BFC;&#x81F4;&#x591A;&#x4E2A;&#x9017;&#x53F7;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x9700;&#x8981;&#x6BCF;&#x6B21;&#x90FD;&#x5C06;&#x6570;&#x7EC4;&#x6700;&#x540E;&#x518D; join(&apos;&apos;) &#x4E00;&#x4E0B;&#xFF0C;&#x518D;&#x770B;&#x4E00;&#x904D;&#x4F8B;&#x5B50;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [{value: 1}, {value: 2}];
let message = `
    &lt;ul&gt;
        ${arr.map((item) =&gt; {
            return `
                &lt;li&gt;${item.value}&lt;/li&gt;
            `
        }).join(&apos;&apos;)}
    &lt;/ul&gt;
`;
console.log(message);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> arr = [{<span class="hljs-attr">value</span>: <span class="hljs-number">1</span>}, {<span class="hljs-attr">value</span>: <span class="hljs-number">2</span>}];
<span class="hljs-keyword">let</span> message = <span class="hljs-string">`
    &lt;ul&gt;
        <span class="hljs-subst">${arr.map((item) =&gt; {
            <span class="hljs-keyword">return</span> <span class="hljs-string">`
                &lt;li&gt;<span class="hljs-subst">${item.value}</span>&lt;/li&gt;
            `</span>
        }</span>).join(&apos;&apos;)}
    &lt;/ul&gt;
`</span>;
<span class="hljs-built_in">console</span>.log(message);</code></pre>
<p>&#x5229;&#x7528;&#x6807;&#x7B7E;&#x6A21;&#x677F;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8F7B;&#x677E;&#x7684;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function includeArrays(template, ...expressions) {
    let result = template.reduce((prev, next, i) =&gt; {

        let expression = expressions[i - 1];

        if (Array.isArray(expression)) {
            expression = expression.join(&apos;&apos;);
        }

        return prev + expression + next;
    });

    result = result.trim();

    return result;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">includeArrays</span>(<span class="hljs-params">template, ...expressions</span>) </span>{
    <span class="hljs-keyword">let</span> result = template.reduce(<span class="hljs-function">(<span class="hljs-params">prev, next, i</span>) =&gt;</span> {

        <span class="hljs-keyword">let</span> expression = expressions[i - <span class="hljs-number">1</span>];

        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(expression)) {
            expression = expression.join(<span class="hljs-string">&apos;&apos;</span>);
        }

        <span class="hljs-keyword">return</span> prev + expression + next;
    });

    result = result.trim();

    <span class="hljs-keyword">return</span> result;
}</code></pre>
<h2 id="articleHeader7">&#x6700;&#x540E;</h2>
<p>&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x4EE5;&#x4E0A;&#x8FD9;&#x4E9B;&#x51FD;&#x6570;&#x62FC;&#x5408;&#x7684;&#x90E8;&#x5206;&#x90FD;&#x662F;&#x91CD;&#x590D;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x5C06;&#x5176;&#x5C01;&#x88C5;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x914D;&#x7F6E;&#x5B9E;&#x73B0;&#x4E0D;&#x80FD;&#x7684;&#x529F;&#x80FD;&#x3002;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x4E00;&#x4E2A;&#x6216;&#x8005;&#x76F4;&#x63A5;&#x4F7F;&#x7528; <a href="https://github.com/declandewet/common-tags" rel="nofollow noreferrer" target="_blank">common-tags</a>&#x3002;</p>
<h2 id="articleHeader8">ES6 &#x7CFB;&#x5217;</h2>
<p>ES6 &#x7CFB;&#x5217;&#x76EE;&#x5F55;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfen...</a>&#x3002;</p>
<p>ES6 &#x7CFB;&#x5217;&#x9884;&#x8BA1;&#x5199;&#x4E8C;&#x5341;&#x7BC7;&#x5DE6;&#x53F3;&#xFF0C;&#x65E8;&#x5728;&#x52A0;&#x6DF1; ES6 &#x90E8;&#x5206;&#x77E5;&#x8BC6;&#x70B9;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x91CD;&#x70B9;&#x8BB2;&#x89E3;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x3001;&#x6807;&#x7B7E;&#x6A21;&#x677F;&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3001;Symbol&#x3001;Set&#x3001;Map &#x4EE5;&#x53CA; Promise &#x7684;&#x6A21;&#x62DF;&#x5B9E;&#x73B0;&#x3001;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x65B9;&#x6848;&#x3001;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x7B49;&#x5185;&#x5BB9;&#x3002;</p>
<p>&#x5982;&#x679C;&#x6709;&#x9519;&#x8BEF;&#x6216;&#x8005;&#x4E0D;&#x4E25;&#x8C28;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8BF7;&#x52A1;&#x5FC5;&#x7ED9;&#x4E88;&#x6307;&#x6B63;&#xFF0C;&#x5341;&#x5206;&#x611F;&#x8C22;&#x3002;&#x5982;&#x679C;&#x559C;&#x6B22;&#x6216;&#x8005;&#x6709;&#x6240;&#x542F;&#x53D1;&#xFF0C;&#x6B22;&#x8FCE;star&#xFF0C;&#x5BF9;&#x4F5C;&#x8005;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x9F13;&#x52B1;&#x3002;</p>
<hr>
<ol>
<li id="fn-1">Sn <a href="#fnref-1" class="footnote-backref">&#x21A9;</a>
</li>
<li id="fn-2">Sn <a href="#fnref-2" class="footnote-backref">&#x21A9;</a>
</li>
<li id="fn-3">Sn <a href="#fnref-3" class="footnote-backref">&#x21A9;</a>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 系列之模板字符串

## 原文链接
[https://segmentfault.com/a/1190000015094993](https://segmentfault.com/a/1190000015094993)

