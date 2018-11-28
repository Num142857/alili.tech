---
title: 'React优化-记忆化技术-使用闭包提升你的React性能' 
date: 2018-11-28 2:30:10
hidden: true
slug: 6g45qbih40a
categories: [reprint]
---

{{< raw >}}
<h4>&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x4F7F;&#x7528;&#x8BB0;&#x5FC6;&#x6027;&#x6280;&#x672F;&#xFF1F;</h4><p>&#x4F7F;&#x7528;React&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x8BF7;&#x6C42;&#x670D;&#x52A1;&#x5668;&#x62FF;&#x56DE;&#x6765;&#x4E00;&#x4E2A;&#x590D;&#x6742;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x6211;&#x4EEC;&#x5728;render&#x91CC;&#x53BB;&#x5904;&#x7406;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#xFF0C;&#x4F46;&#x662F;state&#x548C;props&#x9891;&#x7E41;&#x4FEE;&#x6539;&#x4F1A;&#x89E6;&#x53D1;render&#xFF0C;&#x6BCF;&#x6B21;&#x89E6;&#x53D1;render&#xFF0C;&#x6570;&#x636E;&#x90FD;&#x8981;&#x53BB;&#x5904;&#x7406;&#x4E00;&#x6B21;&#xFF0C;&#x6BCF;&#x6B21;&#x5904;&#x7406;&#x90FD;&#x662F;&#x5BF9;&#x6027;&#x80FD;&#x7684;&#x635F;&#x8017;</p><p><strong>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;&#x628A;&#x5927;&#x4E8E;18&#x5C81;&#x7684;&#x4EBA;&#x5217;&#x51FA;&#x6765;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Example extends Component {
    ...
    render() {
        const { dataList } = this.props;
        const newDataList = dataList.filter((item) =&gt; item.age &gt; 18);
        return (
            &lt;div&gt;
                {newDataList.map((item, i) =&gt;
                    &lt;p key={i}&gt;{item.name}:{item.age}&#x5C81;&lt;/p&gt;
                )}
            &lt;/div&gt;
        )
    }
    ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Example</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    ...
    render() {
        <span class="hljs-keyword">const</span> { dataList } = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">const</span> newDataList = dataList.filter(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.age &gt; <span class="hljs-number">18</span>);
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                {newDataList.map((item, i) =&gt;
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{i}</span>&gt;</span>{item.name}:{item.age}&#x5C81;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                )}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
    ...
}</code></pre><p>&#x4ECE;&#x4F8B;&#x5B50;&#x4E2D;&#x6211;&#x4EEC;&#x770B;&#x5230;render&#x4E2D;&#x6211;&#x4EEC;&#x5904;&#x7406;&#x6570;&#x636E;&#xFF0C;&#x4F46;&#x662F;&#x6BCF;&#x6B21;state&#x548C;props&#x7684;&#x4FEE;&#x6539;&#x90FD;&#x4F1A;&#x89E6;&#x53D1;render&#xFF0C;&#x90FD;&#x4F1A;&#x53BB;&#x5904;&#x7406;&#x6570;&#x636E;dataList&#xFF0C;&#x751F;&#x6210;&#x65B0;&#x7684;&#x6570;&#x636E;newDataList&#xFF0C;&#x6BCF;&#x6B21;&#x5904;&#x7406;&#x90FD;&#x662F;&#x5BF9;&#x6027;&#x80FD;&#x7684;&#x635F;&#x8017;&#xFF01;</p><h4>&#x4EC0;&#x4E48;&#x53EB;&#x8BB0;&#x5FC6;&#x6027;&#x6280;&#x672F;&#xFF1F;</h4><p>&#x6BCF;&#x6B21;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x628A;&#x4F60;&#x7684;&#x4F20;&#x53C2;&#x548C;&#x7ED3;&#x679C;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;&#xFF0C;&#x9047;&#x5230;&#x76F8;&#x540C;&#x7684;&#x4F20;&#x53C2;&#xFF0C;&#x5C31;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x8BB0;&#x5F55;&#x7F13;&#x5B58;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x4E0D;&#x7528;&#x518D;&#x53BB;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x5904;&#x7406;&#x6570;&#x636E;&#xFF01;</p><h4>memoize-one&#x5B98;&#x65B9;&#x6848;&#x4F8B;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import memoizeOne from &apos;memoize-one&apos;;

const add = (a, b) =&gt; a + b;
const memoizedAdd = memoizeOne(add);

memoizedAdd(1, 2); // 3

memoizedAdd(1, 2); // 3
// Add &#x51FD;&#x6570;&#x5E76;&#x6CA1;&#x6709;&#x6267;&#x884C;: &#x524D;&#x4E00;&#x6B21;&#x6267;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x88AB;&#x8FD4;&#x56DE;

memoizedAdd(2, 3); // 5
// Add &#x51FD;&#x6570;&#x518D;&#x6B21;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x7ED3;&#x679C;

memoizedAdd(2, 3); // 5
// Add &#x51FD;&#x6570;&#x5E76;&#x6CA1;&#x6709;&#x6267;&#x884C;: &#x524D;&#x4E00;&#x6B21;&#x6267;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x88AB;&#x8FD4;&#x56DE;

memoizedAdd(1, 2); // 3
// Add &#x51FD;&#x6570;&#x518D;&#x6B21;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x7ED3;&#x679C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> memoizeOne <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;memoize-one&apos;</span>;

<span class="hljs-keyword">const</span> add = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b;
<span class="hljs-keyword">const</span> memoizedAdd = memoizeOne(add);

memoizedAdd(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>); <span class="hljs-comment">// 3</span>

memoizedAdd(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>); <span class="hljs-comment">// 3</span>
<span class="hljs-comment">// Add &#x51FD;&#x6570;&#x5E76;&#x6CA1;&#x6709;&#x6267;&#x884C;: &#x524D;&#x4E00;&#x6B21;&#x6267;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x88AB;&#x8FD4;&#x56DE;</span>

memoizedAdd(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// 5</span>
<span class="hljs-comment">// Add &#x51FD;&#x6570;&#x518D;&#x6B21;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x7ED3;&#x679C;</span>

memoizedAdd(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// 5</span>
<span class="hljs-comment">// Add &#x51FD;&#x6570;&#x5E76;&#x6CA1;&#x6709;&#x6267;&#x884C;: &#x524D;&#x4E00;&#x6B21;&#x6267;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x88AB;&#x8FD4;&#x56DE;</span>

memoizedAdd(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>); <span class="hljs-comment">// 3</span>
<span class="hljs-comment">// Add &#x51FD;&#x6570;&#x518D;&#x6B21;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x7ED3;&#x679C;</span></code></pre><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x8FDE;&#x7EED;&#x4E24;&#x6B21;&#x76F8;&#x540C;&#x4F20;&#x53C2;&#xFF0C;&#x7B2C;&#x4E8C;&#x6B21;&#x4F1A;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4E0A;&#x6B21;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x6BCF;&#x6B21;&#x4F20;&#x53C2;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5C31;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x4F1A;&#x4E22;&#x5931;&#x4E4B;&#x524D;&#x7684;&#x8BB0;&#x5F55;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x5B8C;&#x5168;&#x8BB0;&#x5FC6;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x4E2A;&#x4E0D;&#x8DB3;&#x70B9;&#xFF01;</p><h4>&#x5728;React&#x4E2D;&#x4F7F;&#x7528;memoize-one</h4><p>&#x6839;&#x636E;&#x4E0A;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;&#x90A3;&#x4E2A;&#x4F8B;&#x5B50;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#xFF0C;&#x4F7F;&#x7528;memoize-one&#x63D0;&#x5347;React&#x7684;&#x6027;&#x80FD;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import memoize from &quot;memoize-one&quot;;

class Example extends Component {
    ...
    filter = memoize((dataList, age) =&gt; dataList.filter((item) =&gt; item.age &gt; age))
    render() {
        const { dataList } = this.props;
        const newDataList = this.filter(dataList, 18)
        return (
            &lt;div&gt;
                ...
                {newDataList.map((item, i) =&gt;
                    &lt;p key={i}&gt;{item.name}:{item.age}&#x5C81;&lt;/p&gt;
                )}
                ...
            &lt;/div&gt;
        )
    }
    ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> memoize <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;memoize-one&quot;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Example</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    ...
    filter = memoize(<span class="hljs-function">(<span class="hljs-params">dataList, age</span>) =&gt;</span> dataList.filter(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.age &gt; age))
    render() {
        <span class="hljs-keyword">const</span> { dataList } = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">const</span> newDataList = <span class="hljs-keyword">this</span>.filter(dataList, <span class="hljs-number">18</span>)
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                ...
                {newDataList.map((item, i) =&gt;
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{i}</span>&gt;</span>{item.name}:{item.age}&#x5C81;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                )}
                ...
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
    ...
}</code></pre><h4>memoize-one&#x6E90;&#x7801;&#x89E3;&#x6790;</h4><p>memoize-one&#x662F;&#x91C7;&#x7528;&#x95ED;&#x5305;&#x6765;&#x7F13;&#x5B58;&#x6570;&#x636E;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type EqualityFn = (a: mixed, b: mixed) =&gt; boolean;

const simpleIsEqual: EqualityFn = (a: mixed, b: mixed): boolean =&gt; a === b;

export default function &lt;ResultFn: (...Array&lt;any&gt;) =&gt; mixed&gt;(resultFn: ResultFn, isEqual?: EqualityFn = simpleIsEqual): ResultFn {
  let lastThis: mixed; // &#x7528;&#x6765;&#x7F13;&#x5B58;&#x4E0A;&#x4E00;&#x6B21;result&#x51FD;&#x6570;&#x5BF9;&#x8C61;
  let lastArgs: Array&lt;mixed&gt; = []; // &#x7528;&#x6765;&#x7F13;&#x5B58;&#x4E0A;&#x4E00;&#x6B21;&#x7684;&#x4F20;&#x53C2;
  let lastResult: mixed; // &#x7528;&#x6765;&#x7F13;&#x5B58;&#x4E0A;&#x4E00;&#x6B21;&#x7684;&#x7ED3;&#x679C;
  let calledOnce: boolean = false; // &#x662F;&#x5426;&#x4E4B;&#x524D;&#x8C03;&#x7528;&#x8FC7;
  // &#x5224;&#x65AD;&#x4E24;&#x6B21;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x7684;&#x53C2;&#x6570;&#x662F;&#x5426;&#x76F8;&#x7B49;
  // &#x8FD9;&#x91CC;&#x7684; `isEqual` &#x662F;&#x4E00;&#x4E2A;&#x62BD;&#x8C61;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x5224;&#x65AD;&#x4E24;&#x4E2A;&#x503C;&#x662F;&#x5426;&#x76F8;&#x7B49;
  const isNewArgEqualToLast = (newArg: mixed, index: number): boolean =&gt; isEqual(newArg, lastArgs[index]);

  const result = function (...newArgs: Array&lt;mixed&gt;) {
    if (calledOnce &amp;&amp;
      lastThis === this &amp;&amp;
      newArgs.length === lastArgs.length &amp;&amp;
      newArgs.every(isNewArgEqualToLast)) {
      // &#x8FD4;&#x56DE;&#x4E4B;&#x524D;&#x7684;&#x7ED3;&#x679C;
      return lastResult;
    }

    calledOnce = true; // &#x6807;&#x8BB0;&#x5DF2;&#x7ECF;&#x8C03;&#x7528;&#x8FC7;
    lastThis = this; // &#x91CD;&#x65B0;&#x7F13;&#x5B58;result&#x5BF9;&#x8C61;
    lastArgs = newArgs; // &#x91CD;&#x65B0;&#x7F13;&#x5B58;&#x53C2;&#x6570;
    lastResult = resultFn.apply(this, newArgs); // &#x91CD;&#x65B0;&#x7F13;&#x5B58;&#x7ED3;&#x679C;
    return lastResult; // &#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x7ED3;&#x679C;
  };

  // &#x8FD4;&#x56DE;&#x95ED;&#x5305;&#x51FD;&#x6570;
  return (result: any);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">type EqualityFn = <span class="hljs-function">(<span class="hljs-params">a: mixed, b: mixed</span>) =&gt;</span> boolean;

<span class="hljs-keyword">const</span> simpleIsEqual: EqualityFn = (a: mixed, <span class="hljs-attr">b</span>: mixed): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> a === b;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> &lt;<span class="hljs-title">ResultFn</span>: (<span class="hljs-params">...Array&lt;any&gt;</span>) =&gt; <span class="hljs-title">mixed</span>&gt;(<span class="hljs-params">resultFn: ResultFn, isEqual?: EqualityFn = simpleIsEqual</span>): <span class="hljs-title">ResultFn</span> </span>{
  <span class="hljs-keyword">let</span> lastThis: mixed; <span class="hljs-comment">// &#x7528;&#x6765;&#x7F13;&#x5B58;&#x4E0A;&#x4E00;&#x6B21;result&#x51FD;&#x6570;&#x5BF9;&#x8C61;</span>
  <span class="hljs-keyword">let</span> lastArgs: <span class="hljs-built_in">Array</span>&lt;mixed&gt; = []; <span class="hljs-comment">// &#x7528;&#x6765;&#x7F13;&#x5B58;&#x4E0A;&#x4E00;&#x6B21;&#x7684;&#x4F20;&#x53C2;</span>
  <span class="hljs-keyword">let</span> lastResult: mixed; <span class="hljs-comment">// &#x7528;&#x6765;&#x7F13;&#x5B58;&#x4E0A;&#x4E00;&#x6B21;&#x7684;&#x7ED3;&#x679C;</span>
  <span class="hljs-keyword">let</span> calledOnce: boolean = <span class="hljs-literal">false</span>; <span class="hljs-comment">// &#x662F;&#x5426;&#x4E4B;&#x524D;&#x8C03;&#x7528;&#x8FC7;</span>
  <span class="hljs-comment">// &#x5224;&#x65AD;&#x4E24;&#x6B21;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x7684;&#x53C2;&#x6570;&#x662F;&#x5426;&#x76F8;&#x7B49;</span>
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7684; `isEqual` &#x662F;&#x4E00;&#x4E2A;&#x62BD;&#x8C61;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x5224;&#x65AD;&#x4E24;&#x4E2A;&#x503C;&#x662F;&#x5426;&#x76F8;&#x7B49;</span>
  <span class="hljs-keyword">const</span> isNewArgEqualToLast = (newArg: mixed, <span class="hljs-attr">index</span>: number): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> isEqual(newArg, lastArgs[index]);

  <span class="hljs-keyword">const</span> result = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">...newArgs: Array&lt;mixed&gt;</span>) </span>{
    <span class="hljs-keyword">if</span> (calledOnce &amp;&amp;
      lastThis === <span class="hljs-keyword">this</span> &amp;&amp;
      newArgs.length === lastArgs.length &amp;&amp;
      newArgs.every(isNewArgEqualToLast)) {
      <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E4B;&#x524D;&#x7684;&#x7ED3;&#x679C;</span>
      <span class="hljs-keyword">return</span> lastResult;
    }

    calledOnce = <span class="hljs-literal">true</span>; <span class="hljs-comment">// &#x6807;&#x8BB0;&#x5DF2;&#x7ECF;&#x8C03;&#x7528;&#x8FC7;</span>
    lastThis = <span class="hljs-keyword">this</span>; <span class="hljs-comment">// &#x91CD;&#x65B0;&#x7F13;&#x5B58;result&#x5BF9;&#x8C61;</span>
    lastArgs = newArgs; <span class="hljs-comment">// &#x91CD;&#x65B0;&#x7F13;&#x5B58;&#x53C2;&#x6570;</span>
    lastResult = resultFn.apply(<span class="hljs-keyword">this</span>, newArgs); <span class="hljs-comment">// &#x91CD;&#x65B0;&#x7F13;&#x5B58;&#x7ED3;&#x679C;</span>
    <span class="hljs-keyword">return</span> lastResult; <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x7ED3;&#x679C;</span>
  };

  <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x95ED;&#x5305;&#x51FD;&#x6570;</span>
  <span class="hljs-keyword">return</span> (result: any);
}</code></pre><h4>&#x5173;&#x4E8E;isEqual&#x51FD;&#x6570;&#xFF08;memoize-one&#x63A8;&#x8350;&#x4F7F;&#x7528;loadsh.isEqual&#xFF09;</h4><p>&#x4E00;&#x822C;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x6BD4;&#x8F83;&#x662F;&#x5426;&#x76F8;&#x7B49;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x80FD;&#x7528;===&#x6216;&#x8005;==&#x6765;&#x5904;&#x7406;&#xFF0C;memoize-one&#x5141;&#x8BB8;&#x7528;&#x6237;&#x81EA;&#x5B9A;&#x4E49;&#x4F20;&#x5165;&#x5224;&#x65AD;&#x662F;&#x5426;&#x76F8;&#x7B49;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;lodash&#x7684;isEqual&#x6765;&#x5224;&#x65AD;&#x4E24;&#x6B21;&#x53C2;&#x6570;&#x662F;&#x5426;&#x76F8;&#x7B49;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import memoizeOne from &apos;memoize-one&apos;;
import deepEqual from &apos;lodash.isEqual&apos;;

const identity = x =&gt; x;

const defaultMemoization = memoizeOne(identity);
const customMemoization = memoizeOne(identity, deepEqual);

const result1 = defaultMemoization({foo: &apos;bar&apos;});
const result2 = defaultMemoization({foo: &apos;bar&apos;});

result1 === result2 // false - &#x7D22;&#x5F15;&#x4E0D;&#x540C;

const result3 = customMemoization({foo: &apos;bar&apos;});
const result4 = customMemoization({foo: &apos;bar&apos;});

result3 === result4 // true - &#x53C2;&#x6570;&#x901A;&#x8FC7;lodash.isEqual&#x5224;&#x65AD;&#x662F;&#x76F8;&#x7B49;&#x7684;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> memoizeOne <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;memoize-one&apos;</span>;
<span class="hljs-keyword">import</span> deepEqual <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;lodash.isEqual&apos;</span>;

<span class="hljs-keyword">const</span> identity = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x;

<span class="hljs-keyword">const</span> defaultMemoization = memoizeOne(identity);
<span class="hljs-keyword">const</span> customMemoization = memoizeOne(identity, deepEqual);

<span class="hljs-keyword">const</span> result1 = defaultMemoization({<span class="hljs-attr">foo</span>: <span class="hljs-string">&apos;bar&apos;</span>});
<span class="hljs-keyword">const</span> result2 = defaultMemoization({<span class="hljs-attr">foo</span>: <span class="hljs-string">&apos;bar&apos;</span>});

result1 === result2 <span class="hljs-comment">// false - &#x7D22;&#x5F15;&#x4E0D;&#x540C;</span>

<span class="hljs-keyword">const</span> result3 = customMemoization({<span class="hljs-attr">foo</span>: <span class="hljs-string">&apos;bar&apos;</span>});
<span class="hljs-keyword">const</span> result4 = customMemoization({<span class="hljs-attr">foo</span>: <span class="hljs-string">&apos;bar&apos;</span>});

result3 === result4 <span class="hljs-comment">// true - &#x53C2;&#x6570;&#x901A;&#x8FC7;lodash.isEqual&#x5224;&#x65AD;&#x662F;&#x76F8;&#x7B49;&#x7684;</span></code></pre><h4>&#x53C2;&#x8003;</h4><p><a href="https://github.com/alexreardon/memoize-one" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/alexreardon/memoize-one" rel="nofollow noreferrer" target="_blank">https://github.com/alexreardo...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React优化-记忆化技术-使用闭包提升你的React性能

## 原文链接
[https://segmentfault.com/a/1190000015301672](https://segmentfault.com/a/1190000015301672)

