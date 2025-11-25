---
title: 'ES6 中可以提升幸福度的小功能' 
date: 2018-11-18 3:32:07
hidden: true
slug: oq8u3var0z
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x53D8;&#x91CF;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x7684;&#x7528;&#x9014;</h2><h4>1&#xFF09;&#x4EA4;&#x6362;&#x53D8;&#x91CF;&#x7684;&#x503C;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x = 1;
let y = 2;
[x, y] = [y, x]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">x</span> = <span class="hljs-number">1</span>;
<span class="hljs-keyword">let</span> <span class="hljs-attr">y</span> = <span class="hljs-number">2</span>;
[x, y] = [y, x]
</code></pre><h4>2&#xFF09;&#x4ECE;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x591A;&#x4E2A;&#x503C;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;
function example(){
    return [1, 2, 4];
}

let [a, b, c] = example() 

// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;
function example(){
    return {
        foo:1,
        bar: 2
    }
}

let {foo, bar} = example(); &#x6216;&#x8005; ( {foo, bar} = example() )
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>];
}

<span class="hljs-keyword">let</span> [a, b, c] = example() 

<span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">example</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">foo</span>:<span class="hljs-number">1</span>,
        <span class="hljs-attr">bar</span>: <span class="hljs-number">2</span>
    }
}

<span class="hljs-keyword">let</span> {foo, bar} = example(); &#x6216;&#x8005; ( {foo, bar} = example() )
</code></pre><h4>3&#xFF09;&#x63D0;&#x53D6;JSON&#x6570;&#x636E;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let jsonData = {
  id:42,
  status: &quot;OK&quot;,
  data: [867, 5309]
};

let { id, status, data: number} = jsonData;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code>let jsonData = {
<span class="hljs-symbol">  id:</span><span class="hljs-number">42</span>,
<span class="hljs-symbol">  status:</span> <span class="hljs-string">&quot;OK&quot;</span>,
<span class="hljs-symbol">  data:</span> [<span class="hljs-number">867</span>, <span class="hljs-number">5309</span>]
};

<span class="hljs-class">let </span>{ id, status, data: number} = jsonData;
</code></pre><h4>4&#xFF09;&#x8F93;&#x5165;&#x6A21;&#x5757;&#x7684;&#x6307;&#x5B9A;&#x65B9;&#x6CD5;</h4><p>&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x65F6;&#xFF0C;&#x5F80;&#x5F80;&#x9700;&#x8981;&#x6307;&#x5B9A;&#x8F93;&#x5165;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x4F7F;&#x5F97;&#x8F93;&#x5165;&#x8BED;&#x53E5;&#x975E;&#x5E38;&#x6E05;&#x6670;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { SourceMapConsumer, SourceNode } = require(&quot;source-map&quot;) 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> { SourceMapConsumer, SourceNode } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;source-map&quot;</span>) 
</code></pre><h4>5) &#x6570;&#x7EC4;&#x590D;&#x5236;&#x7684;&#x529F;&#x80FD;</h4><p>&#x5728;es5&#x4E2D;&#xFF0C;&#x5F00;&#x53D1;&#x8005;&#x7ECF;&#x5E38;&#x4F7F;&#x7528; concat&#xFF08;&#xFF09; &#x65B9;&#x6CD5;&#x514B;&#x9686;&#x6570;&#x7EC4;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5728; es5 &#x4E2D;&#x514B;&#x9686;&#x6570;&#x7EC4;
var colors = [ &apos;red&apos;, &apos;green&apos;, &apos;blue&apos; ];
var clonedColors = colors.concat();

console.log(clonedColors);  // &quot;[red, green, blue]&quot;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x5728; es5 &#x4E2D;&#x514B;&#x9686;&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">var</span> colors = [ <span class="hljs-string">&apos;red&apos;</span>, <span class="hljs-string">&apos;green&apos;</span>, <span class="hljs-string">&apos;blue&apos;</span> ];
<span class="hljs-keyword">var</span> clonedColors = colors.concat();

<span class="hljs-built_in">console</span>.log(clonedColors);  <span class="hljs-comment">// &quot;[red, green, blue]&quot;</span>
</code></pre><p>concat() &#x65B9;&#x6CD5;&#x7684;&#x8BBE;&#x8BA1;&#x521D;&#x8877;&#x662F;&#x8FDE;&#x63A5;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5982;&#x679C;&#x8C03;&#x7528;&#x65F6;&#x4E0D;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x5C31;&#x4F1A;&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x6570;&#x7EC4;&#x7684;&#x526F;&#x672C;&#x3002;&#x5728;es6&#x4E2D;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E0D;&#x5B9A;&#x5143;&#x7D20;&#x7684;&#x8BED;&#x6CD5;&#x6765;&#x5B9E;&#x73B0;&#x76F8;&#x540C;&#x7684;&#x76EE;&#x6807;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let colors = [ &apos;red&apos;, &apos;green&apos;, &apos;blue&apos; ]
let [ ...clonedColors ] = colors;

console.log(clonedColors);  // &quot;[red, green, blue]&quot;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code><span class="hljs-keyword">let</span> colors = [ <span class="hljs-string">&apos;red&apos;</span>, <span class="hljs-string">&apos;green&apos;</span>, <span class="hljs-string">&apos;blue&apos;</span> ]
<span class="hljs-keyword">let</span> [ ...clonedColors ] = colors;

console.log(clonedColors);  <span class="hljs-comment">// &quot;[red, green, blue]&quot;</span>
</code></pre><h4>6) &#x7ED3;&#x5408;Set&#x96C6;&#x5408;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65E0;&#x91CD;&#x590D;&#x5143;&#x7D20;&#x7684;&#x6570;&#x7EC4;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function eliminateDuplicates(items) {
    return [...new Set(items)]
}

let numbers = [1, 2, 3, 3, 3, 4, 5];
let noDuplicates = eliminateDuplicates(numbers );
console.log(noDuplicates );  // [1,2,3,4,5]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eliminateDuplicates</span>(<span class="hljs-params">items</span>) </span>{
    <span class="hljs-keyword">return</span> [...new <span class="hljs-built_in">Set</span>(items)]
}

<span class="hljs-keyword">let</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-keyword">let</span> noDuplicates = eliminateDuplicates(numbers );
<span class="hljs-built_in">console</span>.log(noDuplicates );  <span class="hljs-comment">// [1,2,3,4,5]</span>
</code></pre><h4>7) &#x4F7F;&#x7528;apply &#x628A;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x5408;&#x5E76;&#x6210;&#x4E00;&#x4E2A;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arra1 = [{
  name: &apos;&#x5C0F;&#x667A;&apos;,
  age: 26
}]

var arra2 = [{
  name: &apos;&#x5927;&#x667A;&apos;,
  age: 27
}]

arra1.push.apply(arra1, arra2)
console.log(arra1)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> arra1 = [{
  name: <span class="hljs-string">&apos;&#x5C0F;&#x667A;&apos;</span>,
  age: <span class="hljs-number">26</span>
}]

<span class="hljs-selector-tag">var</span> arra2 = [{
  name: <span class="hljs-string">&apos;&#x5927;&#x667A;&apos;</span>,
  age: <span class="hljs-number">27</span>
}]

arra1<span class="hljs-selector-class">.push</span><span class="hljs-selector-class">.apply</span>(arra1, arra2)
console.log(arra1)
</code></pre><h2 id="articleHeader1">&#x4E8C;&#x3001;&#x51FD;&#x6570;&#x7684;&#x7528;&#x5904;&#xFF08;&#x5E38;&#x89C1;&#x5C31;&#x4E0D;&#x591A;&#x8BF4;&#x4E86;&#xFF09;</h2><h4>1&#xFF09;&#x521B;&#x5EFA;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// es5

let person = function(name) {
  return {
    getName: function() {
      return name;
    }
  }
}(&apos;&#x5C0F;&#x667A;&apos;);

console.log(person.getName());  // &#x5C0F;&#x667A;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// es5</span>

<span class="hljs-keyword">let</span> person = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> name;
    }
  }
}(<span class="hljs-string">&apos;&#x5C0F;&#x667A;&apos;</span>);

<span class="hljs-built_in">console</span>.log(person.getName());  <span class="hljs-comment">// &#x5C0F;&#x667A;</span>
</code></pre><p>&#x5728;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x5305;&#x542B;getName() &#x65B9;&#x6CD5;&#x7684;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x5C06;&#x53C2;&#x6570; name &#x4F5C;&#x4E3A;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x4E00;&#x4E2A;&#x79C1;&#x6709;&#x6210;&#x5458;&#x8FD4;&#x56DE;&#x7ED9;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x8005;&#x3002;</p><p>&#x53EA;&#x8981;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5305;&#x88F9;&#x5728;&#x5C0F;&#x62EC;&#x53F7;&#x91CC;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x7528;&#x5B83;&#x5B9E;&#x73B0;&#x76F8;&#x540C;&#x7684;&#x529F;&#x80FD;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// es6

let person = ((name) =&gt; {
  return {
    getName: function() {
      return name;
    }
  }
})(&apos;&#x5C0F;&#x667A;2&apos;);

console.log(person.getName()); //&#x5C0F;&#x667A;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">// es6</span>

<span class="hljs-keyword">let</span> person = <span class="hljs-function">(<span class="hljs-params">(<span class="hljs-params">name</span>) =&gt; {
  <span class="hljs-keyword">return</span> {
    getName: <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
      <span class="hljs-keyword">return</span> name;
    }
  }
}</span>)(<span class="hljs-params">&apos;&#x5C0F;&#x667A;2&apos;</span>);

<span class="hljs-params">console</span>.<span class="hljs-params">log</span>(<span class="hljs-params">person.getName(<span class="hljs-params"></span>)</span>); //&#x5C0F;&#x667A;

</span></code></pre><h4>2.&#x5229;&#x7528;&#x53C2;&#x6570;&#x9ED8;&#x8BA4;&#x503C;&#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x67D0;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E0D;&#x5F97;&#x7701;&#x7565;&#xFF0C;&#x5982;&#x679C;&#x7701;&#x7565;&#x5C31;&#x629B;&#x51FA;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#x3002;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function throwEmptyError() {
    throw new Error(&apos;&#x53C2;&#x6570;&#x4E0D;&#x80FD;&#x4E3A;&#x7A7A;&apos;);
}

function foo(mustBeParams = throwEmptyError() ){
    return mustBeParams();
}

foo() // &#x53C2;&#x6570;&#x4E0D;&#x80FD;&#x4E3A;&#x7A7A;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throwEmptyError</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;&#x53C2;&#x6570;&#x4E0D;&#x80FD;&#x4E3A;&#x7A7A;&apos;</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">mustBeParams = throwEmptyError(</span>) )</span>{
    <span class="hljs-keyword">return</span> mustBeParams();
}

foo() <span class="hljs-comment">// &#x53C2;&#x6570;&#x4E0D;&#x80FD;&#x4E3A;&#x7A7A;</span>
</code></pre><h2 id="articleHeader2">&#x4E09;&#x3001;&#x6269;&#x5C55;&#x5BF9;&#x8C61;&#x7684;&#x529F;&#x80FD;&#x6027;&#x8BA9;&#x4EE3;&#x7801;&#x66F4;&#x52A0;&#x7B80;&#x6D01;</h2><h4>1) &#x53EF;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x540D;</h4><p>&#x5728;es6&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x62EC;&#x53F7;&#x53EF;&#x4EE5;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x540D;&#x79F0;&#xFF0C;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let lastName =&apos;last name&apos;;
let person = {
    &quot;first name&quot;: &apos;Nicholas&apos;,
    [lastName]: &apos;Zakas&apos;
}

console.log(person[&apos;first name&apos;]); // &quot;Nicholas&quot;
console.log(person[lastName]);  // Zakas
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> lastName =<span class="hljs-string">&apos;last name&apos;</span>;
<span class="hljs-keyword">let</span> person = {
    <span class="hljs-string">&quot;first name&quot;</span>: <span class="hljs-string">&apos;Nicholas&apos;</span>,
    [lastName]: <span class="hljs-string">&apos;Zakas&apos;</span>
}

<span class="hljs-built_in">console</span>.log(person[<span class="hljs-string">&apos;first name&apos;</span>]); <span class="hljs-comment">// &quot;Nicholas&quot;</span>
<span class="hljs-built_in">console</span>.log(person[lastName]);  <span class="hljs-comment">// Zakas</span>
</code></pre><h4>2) &#x5229;&#x7528; Object.assign()&#x5408;&#x5E76;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function request(options) {
  let defaultOptions = {
    port: 8000,
    type: &apos;get&apos;
  }
  Object.assign(options,defaultOptions);
  console.log(options)
}

request({url: &apos;http://www.baidu.com&apos;})


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">let</span> defaultOptions = {
    <span class="hljs-attr">port</span>: <span class="hljs-number">8000</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;get&apos;</span>
  }
  <span class="hljs-built_in">Object</span>.assign(options,defaultOptions);
  <span class="hljs-built_in">console</span>.log(options)
}

request({<span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://www.baidu.com&apos;</span>})


</code></pre><h2 id="articleHeader3">&#x56DB;&#x3001;&#x7ED3;&#x5408;es6&#x7B80;&#x6D01;&#x51FD;&#x6570;&#x5199;&#x6CD5;&#xFF0C;&#x9AD8;&#x9636;&#x51FD;&#x6570;&#x7684;&#x5E94;&#x7528;</h2><h4>1) tab &#x51FD;&#x6570;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6B64;&#x5904;tap&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E00;&#x4E2A; vaule &#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5305;&#x542B;value &#x95ED;&#x5305;&#x51FD;&#x6570;,&#x8BE5;&#x51FD;&#x6570;&#x88AB;&#x6267;&#x884C;
const tap = (value) =&gt; (fn) =&gt; (
  typeof(fn) === &apos;function&apos; &amp;&amp; fn(value),
  console.log(value)
)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-comment">// &#x6B64;&#x5904;tap&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E00;&#x4E2A; vaule &#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5305;&#x542B;value &#x95ED;&#x5305;&#x51FD;&#x6570;,&#x8BE5;&#x51FD;&#x6570;&#x88AB;&#x6267;&#x884C;</span>
<span class="hljs-keyword">const</span> tap = (<span class="hljs-keyword">value</span>) =&gt; (fn) =&gt; (
  <span class="hljs-keyword">typeof</span>(fn) === <span class="hljs-string">&apos;function&apos;</span> &amp;&amp; fn(<span class="hljs-keyword">value</span>),
  console.log(<span class="hljs-keyword">value</span>)
)
</code></pre><p>tab&#x51FD;&#x6570;&#x7528;&#x5904;:&#x5047;&#x8BBE;&#x4F60;&#x5728;&#x904D;&#x5386;&#x4E00;&#x4E2A;&#x6765;&#x81EA;&#x670D;&#x52A1;&#x5668;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x5E76;&#x53D1;&#x73B0;&#x6570;&#x636E;&#x9519;&#x4E86;&#xFF0C;&#x56E0;&#x6B64;&#x4F60;&#x60F3;&#x8C03;&#x8BD5;&#x4E00;&#x4E0B;&#xFF0C;&#x770B;&#x770B;&#x6570;&#x7EC4;&#x5305;&#x542B;&#x4E86;&#x4EC0;&#x4E48;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x7528; tab&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2 ,3, 4].forEach((a) =&gt; {
  tap(a)((a)=&gt; {
    console.log(a)
  })
});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>[<span class="hljs-number">1</span>, <span class="hljs-number">2</span> ,<span class="hljs-number">3</span>, <span class="hljs-number">4</span>].forEach(<span class="hljs-function"><span class="hljs-params">(a)</span> =&gt;</span> {
  tap(a)(<span class="hljs-function"><span class="hljs-params">(a)</span>=&gt;</span> {
    <span class="hljs-built_in">console</span>.log(a)
  })
});
</code></pre><p>#### 2) once &#x51FD;&#x6570;</p><p>&#x5728;&#x5F88;&#x591A;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x8FD0;&#x884C;&#x4E00;&#x6B21;&#x7ED9;&#x5B9A;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x53D1;&#x8D77;&#x4E00;&#x6B21;&#x94F6;&#x884C;&#x652F;&#x4ED8;&#x8BF7;&#x6C42;&#x7B49;&#xFF0C;&#x8FD9;&#x65F6;&#x5C31;&#x53EF;&#x4EE5;&#x7528;&#x5230; once &#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const once = (fn) =&gt; {
    let done = false;
    return function () {
        return done?undefined:((done=true),fn.apply(this,arguments))
    }
}

const doPayment = once(()=&gt;{
  console.log(&apos;payment is done&apos;)
})
doPayment(); // payment is done
console.log(doPayment()); //undefined
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> once = <span class="hljs-function">(<span class="hljs-params">fn</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> done = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> done?<span class="hljs-literal">undefined</span>:((done=<span class="hljs-literal">true</span>),fn.apply(<span class="hljs-keyword">this</span>,<span class="hljs-built_in">arguments</span>))
    }
}

<span class="hljs-keyword">const</span> doPayment = once(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;payment is done&apos;</span>)
})
doPayment(); <span class="hljs-comment">// payment is done</span>
<span class="hljs-built_in">console</span>.log(doPayment()); <span class="hljs-comment">//undefined</span>
</code></pre><p>#### 3) &#x51FD;&#x6570;&#x67EF;&#x91CC;&#x5316;&#x7684;&#x5E94;&#x7528;</p><p>&#x5F00;&#x53D1;&#x8005;&#x7F16;&#x5199;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#x5E94;&#x7528;&#x7684;&#x4E0D;&#x540C;&#x9636;&#x7EA7;&#x7F16;&#x5199;&#x5F88;&#x591A;&#x65E5;&#x5FD7;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x5982;&#x4E0B;&#x7684;&#x65E5;&#x5FD7;&#x51FD;&#x6570;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const loggerHelper = (mode, initialMessage, errorMessage, lineNo) =&gt; {
  if (mode === &apos;DEBUG&apos;) {
    console.debug(initialMessage,errorMessage + &apos;at line:&apos; + lineNo)
  }
  else if (mode === &apos;ERROR&apos;) {
    console.error(initialMessage,errorMessage + &apos;at line:&apos; + lineNo)
  }
  else if (mode === &apos;WARN&apos;) {
    console.warn(initialMessage,errorMessage + &apos;at line:&apos; + lineNo)
  }
  else
    throw &quot;Wrong mode&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>const loggerHelper = <span class="hljs-function"><span class="hljs-params">(mode, initialMessage, errorMessage, lineNo)</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (mode === <span class="hljs-string">&apos;DEBUG&apos;</span>) {
    <span class="hljs-built_in">console</span>.debug(initialMessage,errorMessage + <span class="hljs-string">&apos;at line:&apos;</span> + lineNo)
  }
  <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (mode === <span class="hljs-string">&apos;ERROR&apos;</span>) {
    <span class="hljs-built_in">console</span>.error(initialMessage,errorMessage + <span class="hljs-string">&apos;at line:&apos;</span> + lineNo)
  }
  <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (mode === <span class="hljs-string">&apos;WARN&apos;</span>) {
    <span class="hljs-built_in">console</span>.warn(initialMessage,errorMessage + <span class="hljs-string">&apos;at line:&apos;</span> + lineNo)
  }
  <span class="hljs-keyword">else</span>
    <span class="hljs-keyword">throw</span> <span class="hljs-string">&quot;Wrong mode&quot;</span>
}</code></pre><p>&#x5F53;&#x5F00;&#x53D1;&#x8005;&#x9700;&#x8981;&#x5411;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;Stats.js&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x9519;&#x8BEF;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x5982;&#x4E0B;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loggerHelper(&quot;ERROR&quot;, &quot;ERROR At Stats.js&quot;, &quot;Invalid argument passed&quot;, 23);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">loggerHelper</span>(<span class="hljs-string">&quot;ERROR&quot;</span>, <span class="hljs-string">&quot;ERROR At Stats.js&quot;</span>, <span class="hljs-string">&quot;Invalid argument passed&quot;</span>, <span class="hljs-number">23</span>);</code></pre><p>&#x8FD9;&#x6837;&#x5BF9;&#x4E8E; &#x6211;&#x4EEC;&#x8FFD;&#x6C42;&#x5B8C;&#x7F8E;&#x53EF;&#x8BFB;&#x7684;&#x7A0B;&#x5E8F;&#x5458;&#x6765;&#x8BF4;&#xFF0C;&#x53EF;&#x80FD;&#x662F;&#x4E0D;&#x592A;&#x80FD;&#x63A5;&#x53D7;&#x7684;&#xFF0C;&#x73B0;&#x5728;&#x7528;&#x67EF;&#x91CC;&#x6765;&#x4F18;&#x5316;&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#xFF0C;<br>&#x5148;&#x7B80;&#x8981;&#x8BF4;&#x660E;&#x4EC0;&#x4E48;&#x662F;&#x51FD;&#x6570;&#x67EF;&#x91CC;&#x5316;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x67EF;&#x91CC;&#x5316;&#x662F;&#x628A;&#x4E00;&#x4E2A;&#x591A;&#x53C2;&#x6570;&#x51FD;&#x6570;&#x8F6C;&#x6362;&#x6210;&#x4E00;&#x4E2A;&#x5D4C;&#x5957;&#x7684;&#x4E00;&#x5143;&#x51FD;&#x6570;&#x8FC7;&#x7A0B;&#x3002;   
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs"><code>&#x67EF;&#x91CC;&#x5316;&#x662F;&#x628A;&#x4E00;&#x4E2A;&#x591A;&#x53C2;&#x6570;&#x51FD;&#x6570;&#x8F6C;&#x6362;&#x6210;&#x4E00;&#x4E2A;&#x5D4C;&#x5957;&#x7684;&#x4E00;&#x5143;&#x51FD;&#x6570;&#x8FC7;&#x7A0B;&#x3002;   
</code></pre><p>&#x5C01;&#x88C5;&#x4E00;&#x4E2A;&#x628A;&#x628A;&#x591A;&#x53C2;&#x6570;&#x51FD;&#x6570;&#x8F6C;&#x5236;&#x4E3A;&#x4E00;&#x5143;&#x51FD;&#x6570;&#x7684;curry&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let curry = (fn) =&gt; {
  if (typeof fn !== &apos;function&apos;) {
    throw Error(&apos;No function provided&apos;);
  }
  return function curriedFn(...args) {
    // &#x4F20;&#x5165;&#x53C2;&#x6570;&#x662F;&#x5426;&#x5C0F;&#x4E8E;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x5217;&#x8868;&#x957F;&#x5EA6;&#xFF0C;
    if (args.length &lt; fn.length) {
      return function() {
        return curriedFn.apply(null, args.concat([].slice.call(arguments)));
      }
    }
    return fn.apply(null, args)
  }
} 
let errorLogger = curry(loggerHelper)(&quot;ERROR&quot;)(&quot;ERROR At Stats.js&quot;);
let debugLogger = curry(loggerHelper)(&quot;DEBUG&quot;)(&quot;ERROR&quot;)(&quot;Debug At Stats.js&quot;);
let warnLogger = curry(loggerHelper)(&quot;WARN&quot;)(&quot;Warn&quot;)(&quot;At Stats.js&quot;);
// &#x7528;&#x4E8E;&#x9519;&#x8BEF;
errorLogger(&quot;Error message&quot;, 21)
// &#x7528;&#x4E8E;&#x8C03;&#x8BD5;
debugLogger(&apos;Debug message&apos;, 233)
// &#x7528;&#x4E8E;&#x8B66;&#x544A;
warnLogger(&quot;Warn message&quot;, 34);  
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>let curry = (fn) =&gt; {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> fn !== <span class="hljs-string">&apos;function&apos;</span>) {
    <span class="hljs-keyword">throw</span> Error(<span class="hljs-string">&apos;No function provided&apos;</span>);
  }
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curriedFn</span><span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
    <span class="hljs-comment">// &#x4F20;&#x5165;&#x53C2;&#x6570;&#x662F;&#x5426;&#x5C0F;&#x4E8E;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x5217;&#x8868;&#x957F;&#x5EA6;&#xFF0C;</span>
    <span class="hljs-keyword">if</span> (args.length &lt; fn.length) {
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> curriedFn.apply(<span class="hljs-literal">null</span>, args.concat([].slice.call(arguments)));
      }
    }
    <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-literal">null</span>, args)
  }
} 
let errorLogger = curry(loggerHelper)(<span class="hljs-string">&quot;ERROR&quot;</span>)(<span class="hljs-string">&quot;ERROR At Stats.js&quot;</span>);
let debugLogger = curry(loggerHelper)(<span class="hljs-string">&quot;DEBUG&quot;</span>)(<span class="hljs-string">&quot;ERROR&quot;</span>)(<span class="hljs-string">&quot;Debug At Stats.js&quot;</span>);
let warnLogger = curry(loggerHelper)(<span class="hljs-string">&quot;WARN&quot;</span>)(<span class="hljs-string">&quot;Warn&quot;</span>)(<span class="hljs-string">&quot;At Stats.js&quot;</span>);
<span class="hljs-comment">// &#x7528;&#x4E8E;&#x9519;&#x8BEF;</span>
errorLogger(<span class="hljs-string">&quot;Error message&quot;</span>, <span class="hljs-number">21</span>)
<span class="hljs-comment">// &#x7528;&#x4E8E;&#x8C03;&#x8BD5;</span>
debugLogger(<span class="hljs-string">&apos;Debug message&apos;</span>, <span class="hljs-number">233</span>)
<span class="hljs-comment">// &#x7528;&#x4E8E;&#x8B66;&#x544A;</span>
warnLogger(<span class="hljs-string">&quot;Warn message&quot;</span>, <span class="hljs-number">34</span>);  
</code></pre><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x80FD;&#x591F;&#x8F7B;&#x677E;&#x5F15;&#x7528;&#x4E0A;&#x9762;&#x7684;&#x67EF;&#x91CC;&#x5316;&#x5E76;&#x5728;&#x5404;&#x81EA;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;&#x4F7F;&#x7528;&#x5B83;&#x4EEC;&#x4E86;&#x3002;</p><h2 id="articleHeader4">&#x4E94;:&#x53C2;&#x8003;&#x6587;&#x732E;</h2><ul><li>&#x6DF1;&#x5165;&#x7406;&#x89E3;ES6</li><li>JavaScript ES6&#x51FD;&#x6570;&#x5F0F;&#x7F16;&#x7A0B;&#x5165;&#x95E8;&#x7ECF;&#x5178;</li><li>ES6&#x6807;&#x51C6;&#x5165;&#x95E8;</li><li>JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;</li></ul><blockquote>&#x613F;&#x4F60;&#x6210;&#x4E3A;&#x7EC8;&#x8EAB;&#x5B66;&#x4E60;&#x8005;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 中可以提升幸福度的小功能

## 原文链接
[https://segmentfault.com/a/1190000015895633](https://segmentfault.com/a/1190000015895633)

