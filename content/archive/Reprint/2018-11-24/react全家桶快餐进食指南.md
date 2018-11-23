---
title: 'react全家桶快餐进食指南' 
date: 2018-11-24 2:30:10
hidden: true
slug: hh4mdwf6wbl
categories: [reprint]
---

{{< raw >}}
<p>emmmmm&#x3002;&#x3002;&#x3002;&#x3002;&#x3002;&#x3002;&#x3002;&#x3002;&#x3002;&#x3002;</p><p>&#x5982;&#x679C;&#x6709;&#x4EC0;&#x4E48;&#x8BF4;&#x7684;&#x4E0D;&#x5BF9;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6B22;&#x8FCE;&#x8BC4;&#x8BBA;&#x544A;&#x77E5;&#x3002;</p><p>=3333333=</p><p>&#x5148;&#x4ECE;&#x6700;&#x57FA;&#x7840;&#x7684;react&#x8BF4;&#x8D77;&#x5427;&#xFF0C;&#x76EE;&#x524D;&#x6846;&#x67B6;&#x90FD;&#x5C5E;&#x4E8E;&#x7EC4;&#x4EF6;&#x5316;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x66F4;&#x4E3B;&#x8981;&#x7684;&#x76EE;&#x7684;&#x662F;&#x4E3A;&#x4E86;&#x8BA9;&#x524D;&#x7AEF;&#x56F4;&#x7ED5;&#x7740;&#x6570;&#x636E;&#x903B;&#x8F91;&#x6765;&#x505A;&#x9875;&#x9762;&#x800C;&#x5E76;&#x975E;&#x539F;&#x5148;&#x7684;&#x53BB;&#x64CD;&#x4F5C;dom&#x7684;&#x601D;&#x60F3;&#xFF0C;&#x4E09;&#x5927;&#x6846;&#x67B6;&#x76EE;&#x524D;&#x90FD;&#x662F;&#x5F80;&#x4E00;&#x4E2A;&#x65B9;&#x5411;&#x53BB;&#x3002;&#x4E0D;&#x8FC7;&#x76F8;&#x6BD4;&#x5176;&#x4ED6;&#xFF0C;react&#x4E3B;&#x6253;&#x662F;diff&#x7B97;&#x6CD5;&#x5904;&#x7406;dom&#xFF0C;&#x6240;&#x4EE5;&#x638C;&#x63E1;&#x4ED6;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x53BB;&#x5904;&#x7406;&#x597D;&#x6570;&#x636E;&#x624D;&#x662F;&#x6211;&#x4EEC;&#x6700;&#x521D;&#x5E94;&#x8BE5;&#x5B66;&#x4E60;&#x7684;&#x4E1C;&#x897F;&#x3002;</p><h1 id="articleHeader0">react</h1><p>&#x6700;&#x5E38;&#x7528;&#x7684;&#x5C31;&#x662F;react.Component<br>&#x8C08;&#x4E00;&#x4E0B;&#x4ED6;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x5427;&#x3002;<br>&#x5047;&#x5982;&#x6211;&#x9875;&#x9762;&#x6709;&#x4E00;&#x4E2A;&#x9996;&#x9875;&#xFF0C;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x8981;&#x505A;&#x9876;&#x90E8;&#x7684;<strong>&#x5BFC;&#x822A;&#x680F;</strong>&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x53BB;&#x5199;&#x4E00;&#x4E2A;&#x9876;&#x90E8;&#x5BFC;&#x822A;&#x7684;&#x7EC4;&#x4EF6;&#x3002;<br>&#x5047;&#x8BBE;&#x8FD9;&#x4E2A;&#x9876;&#x90E8;&#x7684;&#x5BFC;&#x822A;&#xFF0C;&#x6BCF;&#x4E2A;&#x4EBA;&#x6743;&#x9650;&#x4E0D;&#x540C;&#xFF0C;&#x770B;&#x5230;&#x7684;&#x4E1C;&#x897F;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x5BFC;&#x822A;&#x662F;&#x901A;&#x8FC7;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x6765;&#x5B9E;&#x73B0;&#x7684;&#x3002;</p><p>&#x6765;&#xFF0C;&#x5148;&#x719F;&#x6089;</p><h3 id="articleHeader1">&#x751F;&#x547D;&#x5468;&#x671F;&#x3002;</h3><p><strong>&#x6302;&#x8F7D;</strong>&#x65F6;&#x671F;&#x4F1A;&#x6267;&#x884C;&#x7684;&#xFF08;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E22;&#x5230;&#x9875;&#x9762;&#x65F6;&#x5019;&#x4F1A;&#x6267;&#x884C;&#xFF0C;&#x5E76;&#x4E14;&#x53EA;&#x6267;&#x884C;&#x4E00;&#x6B21;&#x7684;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor() // &#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x4E00;&#x822C;&#x6211;&#x4F1A;&#x5728;&#x8FD9;&#x91CC;&#x53BB;&#x5B9A;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x7684;state&#x521D;&#x59CB;&#x5316;

componentWillMount() // &#x6302;&#x8F7D;&#x4E4B;&#x524D;&#xFF0C;&#x5728;17&#x4E4B;&#x540E;&#x6539;&#x540D;&#x4E0B;&#x9762;&#x4E00;&#x6761;

UNSAFE_componentWillMount() // &#x4E0A;&#x9762;&#x6302;&#x8F7D;&#x524D;&#x9A6C;&#x4E0A;&#x8981;&#x66F4;&#x6539;&#x7684;&#x540D;&#x5B57;&#x3002;
//&#x8FD9;&#x4E2A;&#x662F;&#x552F;&#x4E00;&#x4F1A;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x8C03;&#x7528;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x8BBE;&#x7F6E;&#x4E00;&#x4E9B;&#x4E1C;&#x897F;&#x4E0D;&#x4F1A;&#x5BFC;&#x81F4;&#x7EC4;&#x4EF6;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;
//&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x6700;&#x597D;&#x4E0D;&#x8981;&#x968F;&#x610F;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x6570;&#x636E;&#x7684;&#x8BF7;&#x6C42;&#x3002;

render() // &#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x8F93;&#x51FA;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x6309;&#x9053;&#x7406;&#x6765;&#x8BF4;&#x90FD;&#x662F;&#x4E00;&#x4E9B;jsx&#x4E4B;&#x7C7B;&#x7684;&#xFF0C;
//&#x5982;&#x679C;&#x4F60;&#x8F93;&#x51FA;&#x7684;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x548C;&#x6570;&#x5B57;&#xFF0C;&#x5219;&#x4F1A;&#x53D8;&#x6210;text node&#xFF0C; 
//&#x5982;&#x679C;&#x8F93;&#x51FA;&#x7684;&#x662F;&#x5E03;&#x5C14;&#x503C;&#x7684;false&#xFF0C;&#x6216;&#x8005;null&#xFF0C;&#x5C31;&#x4F1A;&#x4E0D;&#x8FDB;&#x884C;&#x6E32;&#x67D3;&#x3002;

componentDidMount() // &#x8FD9;&#x91CC;&#x5C31;&#x662F;&#x7EC4;&#x4EF6;&#x6302;&#x8F7D;&#x65F6;&#x5019;&#x6700;&#x540E;&#x89E6;&#x53D1;&#x7684;&#x4E00;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x4E86;&#x3002;
// &#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x91CC;&#x9762;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x4F1A;&#x8BA9;&#x7EC4;&#x4EF6;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x6240;&#x4EE5;&#x4E00;&#x822C;&#x6570;&#x636E;&#x653E;&#x5728;&#x8FD9;&#x91CC;&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x3002;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">()</span> <span class="hljs-comment">// &#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x4E00;&#x822C;&#x6211;&#x4F1A;&#x5728;&#x8FD9;&#x91CC;&#x53BB;&#x5B9A;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x7684;state&#x521D;&#x59CB;&#x5316;</span>

<span class="hljs-title">componentWillMount</span><span class="hljs-params">()</span> <span class="hljs-comment">// &#x6302;&#x8F7D;&#x4E4B;&#x524D;&#xFF0C;&#x5728;17&#x4E4B;&#x540E;&#x6539;&#x540D;&#x4E0B;&#x9762;&#x4E00;&#x6761;</span>

<span class="hljs-title">UNSAFE_componentWillMount</span><span class="hljs-params">()</span> <span class="hljs-comment">// &#x4E0A;&#x9762;&#x6302;&#x8F7D;&#x524D;&#x9A6C;&#x4E0A;&#x8981;&#x66F4;&#x6539;&#x7684;&#x540D;&#x5B57;&#x3002;</span>
<span class="hljs-comment">//&#x8FD9;&#x4E2A;&#x662F;&#x552F;&#x4E00;&#x4F1A;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x8C03;&#x7528;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x8BBE;&#x7F6E;&#x4E00;&#x4E9B;&#x4E1C;&#x897F;&#x4E0D;&#x4F1A;&#x5BFC;&#x81F4;&#x7EC4;&#x4EF6;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;</span>
<span class="hljs-comment">//&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x6700;&#x597D;&#x4E0D;&#x8981;&#x968F;&#x610F;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x6570;&#x636E;&#x7684;&#x8BF7;&#x6C42;&#x3002;</span>

<span class="hljs-title">render</span><span class="hljs-params">()</span> <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x8F93;&#x51FA;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x6309;&#x9053;&#x7406;&#x6765;&#x8BF4;&#x90FD;&#x662F;&#x4E00;&#x4E9B;jsx&#x4E4B;&#x7C7B;&#x7684;&#xFF0C;</span>
<span class="hljs-comment">//&#x5982;&#x679C;&#x4F60;&#x8F93;&#x51FA;&#x7684;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x548C;&#x6570;&#x5B57;&#xFF0C;&#x5219;&#x4F1A;&#x53D8;&#x6210;text node&#xFF0C; </span>
<span class="hljs-comment">//&#x5982;&#x679C;&#x8F93;&#x51FA;&#x7684;&#x662F;&#x5E03;&#x5C14;&#x503C;&#x7684;false&#xFF0C;&#x6216;&#x8005;null&#xFF0C;&#x5C31;&#x4F1A;&#x4E0D;&#x8FDB;&#x884C;&#x6E32;&#x67D3;&#x3002;</span>

<span class="hljs-title">componentDidMount</span><span class="hljs-params">()</span> <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5C31;&#x662F;&#x7EC4;&#x4EF6;&#x6302;&#x8F7D;&#x65F6;&#x5019;&#x6700;&#x540E;&#x89E6;&#x53D1;&#x7684;&#x4E00;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x4E86;&#x3002;</span>
<span class="hljs-comment">// &#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x91CC;&#x9762;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x4F1A;&#x8BA9;&#x7EC4;&#x4EF6;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x6240;&#x4EE5;&#x4E00;&#x822C;&#x6570;&#x636E;&#x653E;&#x5728;&#x8FD9;&#x91CC;&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x3002;</span>

</span></code></pre><p>&#x7136;&#x540E;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x56E0;&#x4E3A;&#x6570;&#x636E;&#x53D8;&#x5316;&#x4E5F;&#x4F1A;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x4E00;&#x79CD;&#x662F;props&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#xFF08;&#x6216;&#x8005;&#x7236;&#x7EC4;&#x4EF6;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#xFF09;&#xFF0C;&#x4E00;&#x79CD;&#x662F;&#x81EA;&#x5DF1;&#x7684;state&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x3002;</p><p><strong>props</strong>&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x6267;&#x884C;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="UNSAFE_componentWillReceiveProps(nextProps) // &#x8FD9;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x5728;17&#x7248;&#x4E4B;&#x524D;&#x53EB;componentWillReceiveProps
// &#x4E00;&#x822C;&#x662F;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x66F4;&#x65B0;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6216;&#x8005;props&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1;&#x7684;&#xFF0C;&#x7528;&#x6765;&#x6839;&#x636E;props&#x66F4;&#x6539;&#x800C;&#x6539;&#x672C;&#x7EC4;&#x4EF6;state&#x7528;&#x7684;
// &#x5B98;&#x65B9;&#x76EE;&#x524D;&#x63A8;&#x8350;&#x7528;&#x4E0B;&#x4E00;&#x6761;&#x53BB;&#x66FF;&#x6362;&#x4ED6;

static getDerivedStateFromProps(nextProps, prevState) // &#x63A5;&#x6536;&#x5230;&#x65B0;&#x7684;props&#x6216;&#x8005;&#x7236;&#x7EC4;&#x4EF6;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x90FD;&#x4F1A;&#x8C03;&#x7528;&#x3002;
// &#x5982;&#x679C;&#x4F60;&#x53EA;&#x60F3;&#x5904;&#x7406;&#x53D8;&#x5316;&#xFF0C;&#x5C31;&#x8981;&#x6BD4;&#x8F83;&#x65B0;&#x65E7;&#x503C;
// &#x4F5C;&#x7528;&#x8DDF;&#x4E0A;&#x9762;&#x4E00;&#x6761;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;props&#x6539;&#x53D8;&#x65F6;&#x5019;&#x8981;&#x6539;state&#x5C31;&#x5728;&#x8FD9;&#x91CC;&#x505A;

shouldComponentUpdate(nextProps, nextState) // &#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD4;&#x56DE;false&#xFF0C;&#x6765;&#x963B;&#x6B62;&#x91CD;&#x65B0;&#x6E32;&#x67D3;
// &#x9ED8;&#x8BA4;&#x4E3A;true&#xFF0C;&#x82E5;shouldComponentUpdate()&#x8FD4;&#x56DE;false&#xFF0C;
//&#x800C;&#x540E;UNSAFE_componentWillUpdate()&#xFF0C;render()&#xFF0C; &#x548C; componentDidUpdate()&#x5C06;&#x4E0D;&#x4F1A;&#x88AB;&#x8C03;&#x7528;

UNSAFE_componentWillUpdate() // 17&#x7248;&#x4EE5;&#x524D;&#x53EB;componentWillUpdate
// &#x5728;&#x6536;&#x5230;&#x65B0;&#x7684;state&#x6216;&#x8005;props&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6E32;&#x67D3;&#x524D;&#x88AB;&#x7ACB;&#x5373;&#x8C03;&#x7528;
//&#x4E0D;&#x8981;&#x5728;&#x8FD9;&#x91CC;setState&#xFF0C;&#x4E0D;&#x8981;&#x5728;&#x8FD9;&#x91CC;setState&#xFF0C;&#x4E0D;&#x8981;&#x5728;&#x8FD9;&#x91CC;setState&#xFF0C;

render() // &#x5F53;&#x7136;&#x5C11;&#x4E0D;&#x4E86;&#x8F93;&#x51FA;&#x9700;&#x8981;&#x663E;&#x793A;&#x7684;&#x4E1C;&#x897F;&#x5566;

getSnapshotBeforeUpdate() // &#x5728;&#x6700;&#x65B0;&#x7684;&#x6E32;&#x67D3;&#x8F93;&#x51FA;&#x63D0;&#x4EA4;&#x7ED9;DOM&#x524D;&#x5C06;&#x4F1A;&#x7ACB;&#x5373;&#x8C03;&#x7528;
// &#x4E3A;&#x4E86;&#x652F;&#x6301;&#x5F02;&#x6B65;&#x6E32;&#x67D3;&#xFF0C;&#x5982;&#x679C;&#x5728;componentWillUpdate&#x5904;&#x7406;&#x7684;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x5EF6;&#x8FDF;&#x6EDE;&#x540E;
// &#x8FD9;&#x4E00;&#x751F;&#x547D;&#x5468;&#x671F;&#x8FD4;&#x56DE;&#x7684;&#x4EFB;&#x4F55;&#x503C;&#x5C06;&#x4F1A; &#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x88AB;&#x4F20;&#x9012;&#x7ED9;componentDidUpdate()&#x3002;

componentDidUpdate(prevProps, prevState) // &#x7EC8;&#x4E8E;&#x8BF4;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x4E86;&#xFF0C;&#x6211;&#x64E6;&#x5566;
// &#x66F4;&#x65B0;&#x53D1;&#x751F;&#x540E;&#x7ACB;&#x5373;&#x88AB;&#x8C03;&#x7528;
// &#x8FD9;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x9002;&#x5408;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8981;&#x662F;&#x4F60;&#x5BF9;&#x6BD4;&#x4E86;&#x5F53;&#x524D;&#x5C5E;&#x6027;&#x548C;&#x4E4B;&#x524D;&#x5C5E;&#x6027;&#xFF08;&#x4F8B;&#x5982;&#xFF0C;&#x5982;&#x679C;&#x5C5E;&#x6027;&#x6CA1;&#x6709;&#x6539;&#x53D8;&#x90A3;&#x4E48;&#x8BF7;&#x6C42;&#x4E5F;&#x5C31;&#x6CA1;&#x5FC5;&#x8981;&#x4E86;&#xFF09;&#xFF0C;&#x4E0D;&#x7136;&#x5C31;&#x5FAA;&#x73AF;&#x7ED9;&#x4F60;&#x770B;&#xFF0C;&#x563F;&#x563F;&#x563F;&#x563F;&#x563F;&#x563F;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">UNSAFE_componentWillReceiveProps</span><span class="hljs-params">(nextProps)</span></span> <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x5728;17&#x7248;&#x4E4B;&#x524D;&#x53EB;componentWillReceiveProps</span>
<span class="hljs-comment">// &#x4E00;&#x822C;&#x662F;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x66F4;&#x65B0;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6216;&#x8005;props&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1;&#x7684;&#xFF0C;&#x7528;&#x6765;&#x6839;&#x636E;props&#x66F4;&#x6539;&#x800C;&#x6539;&#x672C;&#x7EC4;&#x4EF6;state&#x7528;&#x7684;</span>
<span class="hljs-comment">// &#x5B98;&#x65B9;&#x76EE;&#x524D;&#x63A8;&#x8350;&#x7528;&#x4E0B;&#x4E00;&#x6761;&#x53BB;&#x66FF;&#x6362;&#x4ED6;</span>

static getDerivedStateFromProps(nextProps, prevState) <span class="hljs-comment">// &#x63A5;&#x6536;&#x5230;&#x65B0;&#x7684;props&#x6216;&#x8005;&#x7236;&#x7EC4;&#x4EF6;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x90FD;&#x4F1A;&#x8C03;&#x7528;&#x3002;</span>
<span class="hljs-comment">// &#x5982;&#x679C;&#x4F60;&#x53EA;&#x60F3;&#x5904;&#x7406;&#x53D8;&#x5316;&#xFF0C;&#x5C31;&#x8981;&#x6BD4;&#x8F83;&#x65B0;&#x65E7;&#x503C;</span>
<span class="hljs-comment">// &#x4F5C;&#x7528;&#x8DDF;&#x4E0A;&#x9762;&#x4E00;&#x6761;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;props&#x6539;&#x53D8;&#x65F6;&#x5019;&#x8981;&#x6539;state&#x5C31;&#x5728;&#x8FD9;&#x91CC;&#x505A;</span>

<span class="hljs-function"><span class="hljs-title">shouldComponentUpdate</span><span class="hljs-params">(nextProps, nextState)</span></span> <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD4;&#x56DE;false&#xFF0C;&#x6765;&#x963B;&#x6B62;&#x91CD;&#x65B0;&#x6E32;&#x67D3;</span>
<span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x4E3A;true&#xFF0C;&#x82E5;shouldComponentUpdate()&#x8FD4;&#x56DE;false&#xFF0C;</span>
<span class="hljs-comment">//&#x800C;&#x540E;UNSAFE_componentWillUpdate()&#xFF0C;render()&#xFF0C; &#x548C; componentDidUpdate()&#x5C06;&#x4E0D;&#x4F1A;&#x88AB;&#x8C03;&#x7528;</span>

<span class="hljs-function"><span class="hljs-title">UNSAFE_componentWillUpdate</span><span class="hljs-params">()</span></span> <span class="hljs-comment">// 17&#x7248;&#x4EE5;&#x524D;&#x53EB;componentWillUpdate</span>
<span class="hljs-comment">// &#x5728;&#x6536;&#x5230;&#x65B0;&#x7684;state&#x6216;&#x8005;props&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6E32;&#x67D3;&#x524D;&#x88AB;&#x7ACB;&#x5373;&#x8C03;&#x7528;</span>
<span class="hljs-comment">//&#x4E0D;&#x8981;&#x5728;&#x8FD9;&#x91CC;setState&#xFF0C;&#x4E0D;&#x8981;&#x5728;&#x8FD9;&#x91CC;setState&#xFF0C;&#x4E0D;&#x8981;&#x5728;&#x8FD9;&#x91CC;setState&#xFF0C;</span>

<span class="hljs-function"><span class="hljs-title">render</span><span class="hljs-params">()</span></span> <span class="hljs-comment">// &#x5F53;&#x7136;&#x5C11;&#x4E0D;&#x4E86;&#x8F93;&#x51FA;&#x9700;&#x8981;&#x663E;&#x793A;&#x7684;&#x4E1C;&#x897F;&#x5566;</span>

<span class="hljs-function"><span class="hljs-title">getSnapshotBeforeUpdate</span><span class="hljs-params">()</span></span> <span class="hljs-comment">// &#x5728;&#x6700;&#x65B0;&#x7684;&#x6E32;&#x67D3;&#x8F93;&#x51FA;&#x63D0;&#x4EA4;&#x7ED9;DOM&#x524D;&#x5C06;&#x4F1A;&#x7ACB;&#x5373;&#x8C03;&#x7528;</span>
<span class="hljs-comment">// &#x4E3A;&#x4E86;&#x652F;&#x6301;&#x5F02;&#x6B65;&#x6E32;&#x67D3;&#xFF0C;&#x5982;&#x679C;&#x5728;componentWillUpdate&#x5904;&#x7406;&#x7684;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x5EF6;&#x8FDF;&#x6EDE;&#x540E;</span>
<span class="hljs-comment">// &#x8FD9;&#x4E00;&#x751F;&#x547D;&#x5468;&#x671F;&#x8FD4;&#x56DE;&#x7684;&#x4EFB;&#x4F55;&#x503C;&#x5C06;&#x4F1A; &#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x88AB;&#x4F20;&#x9012;&#x7ED9;componentDidUpdate()&#x3002;</span>

<span class="hljs-function"><span class="hljs-title">componentDidUpdate</span><span class="hljs-params">(prevProps, prevState)</span></span> <span class="hljs-comment">// &#x7EC8;&#x4E8E;&#x8BF4;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x4E86;&#xFF0C;&#x6211;&#x64E6;&#x5566;</span>
<span class="hljs-comment">// &#x66F4;&#x65B0;&#x53D1;&#x751F;&#x540E;&#x7ACB;&#x5373;&#x88AB;&#x8C03;&#x7528;</span>
<span class="hljs-comment">// &#x8FD9;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x9002;&#x5408;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8981;&#x662F;&#x4F60;&#x5BF9;&#x6BD4;&#x4E86;&#x5F53;&#x524D;&#x5C5E;&#x6027;&#x548C;&#x4E4B;&#x524D;&#x5C5E;&#x6027;&#xFF08;&#x4F8B;&#x5982;&#xFF0C;&#x5982;&#x679C;&#x5C5E;&#x6027;&#x6CA1;&#x6709;&#x6539;&#x53D8;&#x90A3;&#x4E48;&#x8BF7;&#x6C42;&#x4E5F;&#x5C31;&#x6CA1;&#x5FC5;&#x8981;&#x4E86;&#xFF09;&#xFF0C;&#x4E0D;&#x7136;&#x5C31;&#x5FAA;&#x73AF;&#x7ED9;&#x4F60;&#x770B;&#xFF0C;&#x563F;&#x563F;&#x563F;&#x563F;&#x563F;&#x563F;</span>

</code></pre><p>&#x7136;&#x540E;&#x5C31;&#x662F;state&#x66F4;&#x6539;&#x7684;&#x65F6;&#x5019;&#x4E86;&#xFF0C;&#x61D2;&#x5F97;&#x6253;&#x4E86;&#xFF0C;&#x5C31;&#x662F;&#x4E0A;&#x9762;props&#x66F4;&#x6539;&#x65F6;&#x5019;&#x7684;&#x4E00;&#x4E9B;&#x751F;&#x547D;&#x5468;&#x671F;&#x53BB;&#x6389;UNSAFE_componentWillReceiveProps(nextProps)&#x6216;&#x8005;static getDerivedStateFromProps(nextProps, prevState)&#xFF0C;&#x76F4;&#x63A5;&#x4ECE;shouldComponentUpdate&#x5F00;&#x59CB;&#x3002;</p><p>&#x6700;&#x540E;&#x7EC4;&#x4EF6;&#x51C6;&#x5907;&#x88AB;<strong>&#x79FB;&#x9664;</strong>&#x7684;&#x65F6;&#x5019;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillUnmount()
// &#x5728;&#x7EC4;&#x4EF6;&#x88AB;&#x5378;&#x8F7D;&#x548C;&#x9500;&#x6BC1;&#x4E4B;&#x524D;&#x7ACB;&#x523B;&#x8C03;&#x7528;&#x3002;&#x53EF;&#x4EE5;&#x5728;&#x8BE5;&#x65B9;&#x6CD5;&#x91CC;&#x5904;&#x7406;&#x4EFB;&#x4F55;&#x5FC5;&#x8981;&#x7684;&#x6E05;&#x7406;&#x5DE5;&#x4F5C;
// &#x4F8B;&#x5982;&#x89E3;&#x7ED1;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x53D6;&#x6D88;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF0C;&#x6E05;&#x7406;&#x4EFB;&#x4F55;&#x5728;componentDidMount&#x73AF;&#x8282;&#x521B;&#x5EFA;&#x7684;DOM&#x5143;&#x7D20;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">componentWillUnmount</span><span class="hljs-params">()</span></span>
<span class="hljs-comment">// &#x5728;&#x7EC4;&#x4EF6;&#x88AB;&#x5378;&#x8F7D;&#x548C;&#x9500;&#x6BC1;&#x4E4B;&#x524D;&#x7ACB;&#x523B;&#x8C03;&#x7528;&#x3002;&#x53EF;&#x4EE5;&#x5728;&#x8BE5;&#x65B9;&#x6CD5;&#x91CC;&#x5904;&#x7406;&#x4EFB;&#x4F55;&#x5FC5;&#x8981;&#x7684;&#x6E05;&#x7406;&#x5DE5;&#x4F5C;</span>
<span class="hljs-comment">// &#x4F8B;&#x5982;&#x89E3;&#x7ED1;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x53D6;&#x6D88;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF0C;&#x6E05;&#x7406;&#x4EFB;&#x4F55;&#x5728;componentDidMount&#x73AF;&#x8282;&#x521B;&#x5EFA;&#x7684;DOM&#x5143;&#x7D20;&#x3002;</span>
</code></pre><p><strong>&#x6355;&#x6349;&#x9519;&#x8BEF;</strong>&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidCatch(error, info)
// &#x6253;&#x5370;&#x5B83;&#x4EEC;&#x4E4B;&#x4E0B;&#x7EC4;&#x4EF6;&#x91CC;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x4E0D;&#x80FD;&#x6355;&#x6349;&#x5B83;&#x81EA;&#x5DF1;&#x5185;&#x90E8;&#x7684;&#x9519;&#x8BEF;&#x3002;
// &#x5728;&#x8FD9;&#x91CC;&#x662F;&#x7528;&#x6765;&#x5904;&#x7406;&#x9519;&#x8BEF;&#x7684;&#xFF0C;&#x4E0D;&#x8981;&#x5C1D;&#x8BD5;&#x7528;&#x8FD9;&#x4E2A;&#x53BB;&#x5904;&#x7406;&#x6570;&#x636E;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">componentDidCatch</span><span class="hljs-params">(error, info)</span></span>
<span class="hljs-comment">// &#x6253;&#x5370;&#x5B83;&#x4EEC;&#x4E4B;&#x4E0B;&#x7EC4;&#x4EF6;&#x91CC;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x4E0D;&#x80FD;&#x6355;&#x6349;&#x5B83;&#x81EA;&#x5DF1;&#x5185;&#x90E8;&#x7684;&#x9519;&#x8BEF;&#x3002;</span>
<span class="hljs-comment">// &#x5728;&#x8FD9;&#x91CC;&#x662F;&#x7528;&#x6765;&#x5904;&#x7406;&#x9519;&#x8BEF;&#x7684;&#xFF0C;&#x4E0D;&#x8981;&#x5C1D;&#x8BD5;&#x7528;&#x8FD9;&#x4E2A;&#x53BB;&#x5904;&#x7406;&#x6570;&#x636E;</span>

</code></pre><p>&#x597D;&#x4E86;&#xFF0C;&#x751F;&#x547D;&#x5468;&#x671F;&#x5927;&#x81F4;&#x5C31;&#x662F;&#x8FD9;&#x4E9B;&#xFF0C;&#x4F30;&#x8BA1;&#x770B;&#x5B8C;&#x4E5F;&#x56F0;&#x4E86;&#x3002;<br>&#x6211;&#x4EEC;&#x5047;&#x5982;&#x8981;&#x505A;&#x4E00;&#x4E2A;&#x9876;&#x90E8;&#x5BFC;&#x822A;&#xFF0C;&#x90A3;&#x4E48;&#xFF08;&#x6572;&#x9ED1;&#x677F;&#xFF09;&#x91CD;&#x70B9;&#x5C31;&#x5728;&#x4E8E;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x600E;&#x4E48;&#x8BF7;&#x6C42;&#xFF0C;&#x8BF7;&#x6C42;&#x5B8C;&#x4E86;&#x5565;&#x65F6;&#x5019;&#x5F80;&#x91CC;&#x9762;&#x4E22;&#xFF0C;&#x9875;&#x9762;&#x600E;&#x4E48;&#x5904;&#x7406;&#x4E4B;&#x7C7B;&#x7684;&#x3002;</p><p>&#x5176;&#x5B9E;&#x603B;&#x7ED3;&#x8D77;&#x6765;&#x4E5F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x6B65;&#x9AA4;&#x5982;&#x4E0B;</p><ol><li>constructor() &#x5B9A;&#x521D;&#x59CB;&#x5316;&#x7684;state&#xFF0C;&#x91CC;&#x9762;&#x6709;&#x4E00;&#x4E2A;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5FAA;&#x73AF;&#x5C55;&#x793A;&#x51FA;&#x6765;&#x7684;list&#x7528;&#x6765;&#x50A8;&#x5B58;&#x5BFC;&#x822A;</li><li>render() &#x91CC;&#x9762;&#x5199;&#x597D;&#x5FAA;&#x73AF;state&#x91CC;&#x9762;&#x7684;list&#x7B49;&#x5C55;&#x793A;&#x6548;&#x679C;</li><li>componentDidMount() &#x6839;&#x636E;&#x5F53;&#x524D;&#x7528;&#x6237;&#x7684;&#x4E00;&#x4E9B;&#x4FE1;&#x606F;&#x53BB;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF0C;&#x5E76;&#x4E14;&#x5904;&#x7406;&#x5B8C;setState&#x585E;&#x5165;list&#x91CC;&#x9762;</li><li>shouldComponentUpdate() &#x5982;&#x679C;&#x4ED6;&#x7684;&#x7236;&#x7EC4;&#x4EF6;&#x4F1A;&#x66F4;&#x65B0;&#xFF0C;&#x4F46;&#x662F;&#x4ED6;&#x4E0D;&#x9700;&#x8981;&#x505A;&#x8FC7;&#x591A;&#x7684;&#x91CD;&#x590D;&#x6E32;&#x67D3;&#xFF0C;&#x5219;&#x5728;&#x8FD9;&#x91CC;&#x5224;&#x65AD;&#x65B0;&#x65E7;&#x503C;&#xFF0C;&#x8003;&#x8651;&#x662F;&#x5426;&#x8981;&#x91CD;&#x65B0;&#x6E32;&#x67D3;</li></ol><p>&#x53E6;&#x5916;&#x6709;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x8BF4;&#xFF0C;<strong>React.PureComponent</strong>&#x53EF;&#x4EE5;&#x5E2E;&#x4F60;&#x5904;&#x7406;&#x4E00;&#x4E9B; shouldComponentUpate()&#x65B0;&#x65E7;&#x503C;&#x7684;&#x5224;&#x65AD;<strong>&#x662F;&#x5426;&#x8981;&#x91CD;&#x65B0;&#x6E32;&#x67D3;</strong>&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x4E2A;&#x53EA;&#x4F1A;&#x5BF9;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;<strong>&#x6D45;&#x5BF9;&#x6BD4;</strong>&#x3002;<br>&#x5982;&#x679C;&#x5BF9;&#x8C61;&#x5305;&#x542B;&#x590D;&#x6742;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x80FD;&#x4F1A;&#x5BFC;&#x81F4;&#x4ED6;<strong>&#x65E0;&#x6CD5;&#x6E32;&#x67D3;</strong>&#x51FA;&#x4F60;&#x8981;&#x7684;&#x6700;&#x65B0;&#x7684;&#x6570;&#x636E;&#xFF0C;React.PureComponent &#x7684; shouldComponentUpate() &#x4F1A;&#x5FFD;&#x7565;<strong>&#x6574;&#x4E2A;&#x7EC4;&#x4EF6;</strong>&#x7684;&#x5B50;&#x7EA7;&#x3002;&#x8BF7;&#x786E;&#x4FDD;&#x6240;&#x6709;&#x7684;&#x5B50;&#x7EA7;&#x7EC4;&#x4EF6;&#x4E5F;&#x662F;&#x201D;Pure&#x201D;&#x7684;&#x3002;</p><hr><h1 id="articleHeader2">&#x5173;&#x4E8E;redux&#x7684;&#x6570;&#x636E;&#x6D41;</h1><p>&#x8BF4;&#x7B80;&#x5355;&#x4E00;&#x70B9;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;</p><ol><li>&#x6211;&#x5F80;&#x9879;&#x76EE;&#x6839;&#x90E8;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;store&#xFF08;&#x50A8;&#x5B58;&#x6570;&#x636E;&#x7684;&#x4E1C;&#x897F;&#xFF09;</li><li>&#x89E6;&#x53D1;action</li><li>action&#x544A;&#x8BC9;reducer&#x6211;&#x8981;&#x6539;&#x6570;&#x636E;&#x4E86;&#xFF01;</li><li>reducer&#x6539;&#x5B8C;&#x4E86;&#x6570;&#x636E;&#x9875;&#x9762;&#x4E5F;&#x540C;&#x65F6;&#x62FF;&#x5230;&#x4E86;</li></ol><p>action =&gt; reducer =&gt; store</p><p>&#x4E0D;&#x8FC7;&#x56E0;&#x4E3A;redux&#x4E0D;&#x5E0C;&#x671B;&#x6709;&#x4E00;&#x4E9B;&#x526F;&#x4F5C;&#x7528;&#x7684;&#x6570;&#x636E;&#x4EA7;&#x751F;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8981;&#x5728;&#x8FD9;&#x91CC;&#x9762;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x4E00;&#x4E9B;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;<br>&#x76EE;&#x524D;&#x6BD4;&#x8F83;&#x5927;&#x4F17;&#x7684;&#x6709;&#x4FE9;&#x3002;<br>redux-saga&#x548C;redux-thunk</p><p>&#x5148;&#x5927;&#x81F4;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;</p><h3 id="articleHeader3">redux-thunk</h3><p>&#x8BF4;&#x7B80;&#x5355;&#x4E00;&#x4E9B;&#xFF0C;&#x5C31;&#x662F;&#x8BA9;action&#x4E2D;&#x53EF;&#x4EE5;&#x8BF7;&#x6C42;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x8BF7;&#x6C42;&#x5230;&#x4E86;&#x6570;&#x636E;&#x518D;&#x6267;&#x884C;reducer&#x5B58;&#x5165;store&#x91CC;&#x9762;&#x3002;</p><p>&#x5F15;&#x5165;&#x65B9;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import thunkMiddleware from &apos;redux-thunk&apos;
import { Provider } from &apos;react-redux&apos;
import { createStore, applyMiddleware } from &apos;redux&apos;
import { Reduces } from &apos;./store/index.js&apos; // &#x5F15;&#x5165;&#x6240;&#x6709;&#x7684;reduces

const store = createStore(
  Reduces,
  applyMiddleware(
    thunkMiddleware // &#x5141;&#x8BB8; dispatch() &#x51FD;&#x6570;
  )
)

&lt;Provider store={store}&gt; // &#x4E22;&#x5230;&#x91CC;&#x9762;&#x53BB;
    &lt;Router&gt;
    &lt;/Router&gt;
 &lt;/Provider&gt;


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> thunkMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-thunk&apos;</span>
<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-redux&apos;</span>
<span class="hljs-keyword">import</span> { createStore, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux&apos;</span>
<span class="hljs-keyword">import</span> { Reduces } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./store/index.js&apos;</span> <span class="hljs-comment">// &#x5F15;&#x5165;&#x6240;&#x6709;&#x7684;reduces</span>

const store = createStore(
  Reduces,
  applyMiddleware(
    thunkMiddleware <span class="hljs-comment">// &#x5141;&#x8BB8; dispatch() &#x51FD;&#x6570;</span>
  )
)

&lt;Provider store={store}&gt; <span class="hljs-comment">// &#x4E22;&#x5230;&#x91CC;&#x9762;&#x53BB;</span>
    &lt;Router&gt;
    &lt;/Router&gt;
 &lt;/Provider&gt;


</code></pre><p>&#x7136;&#x540E;&#x5728;action&#x91CC;&#x9762;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  /**
   * &#x83B7;&#x53D6;&#x7528;&#x6237;&#x8BA2;&#x5355;&#x4FE1;&#x606F;
   * @param {String} type &#x7528;&#x6237;&#x8BA2;&#x5355;&#x7684;&#x8BF7;&#x6C42;&#x7C7B;&#x578B;
   * @return {dispatch} dispatch &#x8FD4;&#x56DE;&#x8C03;&#x7528;&#x65B0;&#x7684;action&#x65B9;&#x6CD5;
   */
  getUserOrderList(type) {
    return dispatch =&gt; {
    // &#x8FD9;&#x4E2A;OrderModel&#x662F;&#x6211;&#x81EA;&#x5DF1;&#x9879;&#x76EE;&#x6240;&#x6709;&#x8BA2;&#x5355;&#x8BF7;&#x6C42;&#x90FD;&#x653E;&#x5728;&#x91CC;&#x9762;&#x7684;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x76F8;&#x5F53;&#x4E0E;&#x5199;&#x4E00;&#x4E2A;fetch&#xFF0C;&#x7136;&#x540E;then&#x7684;&#x5904;&#x7406;&#x4ED6;
      return OrderModel.orderlist({
        status: type
      }).then(response =&gt; {
        // &#x8FD9;&#x91CC;&#x5728;&#x5B58;&#x5165;store&#x91CC;&#x9762;&#x53BB;,&#x8FD9;&#x91CC;&#x4E00;&#x822C;&#x6211;&#x4F1A;&#x5199;&#x4E00;&#x4E2A;&#x516C;&#x7528;&#x7684;dispatch&#x7684;&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x4E22;&#x5165;
      })
    }
  }

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>  <span class="hljs-comment">/**
   * &#x83B7;&#x53D6;&#x7528;&#x6237;&#x8BA2;&#x5355;&#x4FE1;&#x606F;
   * @param {String} type &#x7528;&#x6237;&#x8BA2;&#x5355;&#x7684;&#x8BF7;&#x6C42;&#x7C7B;&#x578B;
   * @return {dispatch} dispatch &#x8FD4;&#x56DE;&#x8C03;&#x7528;&#x65B0;&#x7684;action&#x65B9;&#x6CD5;
   */</span>
  getUserOrderList(<span class="hljs-keyword">type</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> {
    <span class="hljs-comment">// &#x8FD9;&#x4E2A;OrderModel&#x662F;&#x6211;&#x81EA;&#x5DF1;&#x9879;&#x76EE;&#x6240;&#x6709;&#x8BA2;&#x5355;&#x8BF7;&#x6C42;&#x90FD;&#x653E;&#x5728;&#x91CC;&#x9762;&#x7684;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x76F8;&#x5F53;&#x4E0E;&#x5199;&#x4E00;&#x4E2A;fetch&#xFF0C;&#x7136;&#x540E;then&#x7684;&#x5904;&#x7406;&#x4ED6;</span>
      <span class="hljs-keyword">return</span> OrderModel.orderlist({
        status: <span class="hljs-keyword">type</span>
      }).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5728;&#x5B58;&#x5165;store&#x91CC;&#x9762;&#x53BB;,&#x8FD9;&#x91CC;&#x4E00;&#x822C;&#x6211;&#x4F1A;&#x5199;&#x4E00;&#x4E2A;&#x516C;&#x7528;&#x7684;dispatch&#x7684;&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x4E22;&#x5165;</span>
      })
    }
  }

</code></pre><p>&#x7136;&#x540E;&#x7528;dva&#x7684;&#x670B;&#x53CB;&#x4E00;&#x822C;&#x7528;&#x7684;&#x90FD;&#x662F;</p><h3 id="articleHeader4">redux-saga</h3><p>&#x8FD9;&#x4E2A;&#x5176;&#x5B9E;&#x6211;&#x4E86;&#x89E3;&#x7684;&#x5E76;&#x4E0D;&#x6DF1;&#xFF0C;&#x5C31;&#x62FF;&#x5B98;&#x7F51;&#x7684;&#x4E8B;&#x4F8B;&#x6765;&#x7528;&#x4E00;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { call, put, takeEvery, takeLatest } from &apos;redux-saga/effects&apos;
import Api from &apos;...&apos;

// worker Saga : &#x5C06;&#x5728; USER_FETCH_REQUESTED action &#x88AB; dispatch &#x65F6;&#x8C03;&#x7528;
function* fetchUser(action) {
   try {
       // call&#x8FD9;&#x91CC;&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF0C;&#x62FF;&#x5230;&#x7684;&#x6570;&#x636E;&#x4E22;&#x5230;user&#x91CC;&#x9762;
      const user = yield call(Api.fetchUser, action.payload.userId);
      // &#x5F00;&#x59CB;&#x5339;&#x914D;type&#xFF0C;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x66F4;&#x6539;&#x5728;&#x8FD9;&#x91CC;
      yield put({type: &quot;USER_FETCH_SUCCEEDED&quot;, user: user});
   } catch (e) {
      yield put({type: &quot;USER_FETCH_FAILED&quot;, message: e.message});
   }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { call, put, takeEvery, takeLatest } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-saga/effects&apos;</span>
<span class="hljs-keyword">import</span> Api <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;...&apos;</span>

<span class="hljs-comment">// worker Saga : &#x5C06;&#x5728; USER_FETCH_REQUESTED action &#x88AB; dispatch &#x65F6;&#x8C03;&#x7528;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">fetchUser</span>(<span class="hljs-params">action</span>) </span>{
   <span class="hljs-keyword">try</span> {
       <span class="hljs-comment">// call&#x8FD9;&#x91CC;&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF0C;&#x62FF;&#x5230;&#x7684;&#x6570;&#x636E;&#x4E22;&#x5230;user&#x91CC;&#x9762;</span>
      <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">yield</span> call(Api.fetchUser, action.payload.userId);
      <span class="hljs-comment">// &#x5F00;&#x59CB;&#x5339;&#x914D;type&#xFF0C;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x66F4;&#x6539;&#x5728;&#x8FD9;&#x91CC;</span>
      <span class="hljs-keyword">yield</span> put({<span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;USER_FETCH_SUCCEEDED&quot;</span>, user: user});
   } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-keyword">yield</span> put({<span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;USER_FETCH_FAILED&quot;</span>, message: e.message});
   }
}
</code></pre><p>&#x8FD9;&#x91CC;&#x653E;&#x4E0A;&#x4E24;&#x4E2A;&#x6587;&#x6863;&#x4F9B;&#x53C2;&#x8003;</p><p><a href="https://redux-saga-in-chinese.js.org/" rel="nofollow noreferrer" target="_blank">redux-saga</a><br><a href="http://www.redux.org.cn/" rel="nofollow noreferrer" target="_blank">redux-thunk</a></p><h2 id="articleHeader5">bug</h2><p>&#x4E00;&#x822C;&#x73A9;react&#x6700;&#x5BB9;&#x6613;&#x9047;&#x5230;&#x7684;&#x5751;&#xFF0C;&#x5C31;&#x662F;&#x5982;&#x4F55;&#x5904;&#x7406;&#x597D;&#x6570;&#x636E;&#xFF0C;&#x642D;&#x914D;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x521A;&#x5F00;&#x59CB;&#x53EF;&#x80FD;&#x4F1A;&#x56E0;&#x4E3A;&#x6CA1;&#x5904;&#x7406;&#x597D;&#x6570;&#x636E;&#xFF0C;&#x5BFC;&#x81F4;&#x7EC4;&#x4EF6;&#x65E0;&#x5185;&#x5BB9;&#x62A5;&#x9519;&#xFF0C;&#x4E5F;&#x6709;&#x5FAA;&#x73AF;&#x4E0D;&#x52A0;key&#x7B49;&#x3002;</p><p>&#x611F;&#x89C9;&#x62A5;&#x9519;&#x6700;&#x591A;&#x7684;&#x53EF;&#x80FD;&#x6027;&#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x4E2A;key&#x4E86;&#x3002;<br>&#x5F53;&#x5FAA;&#x73AF;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6216;&#x8005;&#x4F7F;&#x7528;table&#x8868;&#x5355;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7279;&#x522B;&#x662F;antd&#x91CC;&#x9762;&#x7684;table&#xFF0C;&#x8981;&#x4ED4;&#x7EC6;&#x770B;&#x6587;&#x6863;&#xFF0C;&#x9700;&#x8981;key&#x7684;&#x65F6;&#x5019;&#x4E00;&#x5B9A;&#x8981;&#x52A0;&#x4E0A;&#x3002;</p><h1 id="articleHeader6">route</h1><p>route&#x76EE;&#x524D;&#x7528;&#x7684;&#x6BD4;&#x8F83;&#x591A;&#x7684;&#x662F;&#x4E24;&#x79CD;<br>BrowserRouter&#x548C;HashRouter</p><h3 id="articleHeader7">HashRouter</h3><p>&#x8FD9;&#x4E2A;&#x5C31;&#x6BD4;&#x8F83;&#x4E11;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x8DEF;&#x7531;&#x90FD;&#x5728;&#x524D;&#x7AEF;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x9875;&#x9762;&#x90FD;&#x662F;&#x7528;#&#x540E;&#x9762;&#x5E26;&#x4E0A;&#x4E00;&#x4E9B;&#x4E1C;&#x897F;&#xFF0C;&#x524D;&#x7AEF;&#x81EA;&#x5DF1;&#x505A;&#x7BA1;&#x7406;&#x5C31;&#x597D;&#x4E86;&#x3002;<br>HashRouter &#x4F7F;&#x7528; URL &#x7684; hash (&#x4F8B;&#x5982;&#xFF1A;window.location.hash) &#x6765;&#x4FDD;&#x6301; UI &#x548C; URL &#x7684;&#x540C;&#x6B65;&#x3002;<br>&#x4E0D;&#x8FC7;&#x50CF;&#x63CF;&#x70B9;&#x5C31;&#x4E0D;&#x8981;&#x60F3;&#x5566;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { HashRouter } from &apos;react-router-dom&apos;

&lt;HashRouter&gt;
  &lt;App/&gt;
&lt;/HashRouter&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml">import </span><span class="hljs-template-variable">{ HashRouter }</span><span class="xml"> from &apos;react-router-dom&apos;

<span class="hljs-tag">&lt;<span class="hljs-name">HashRouter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">App</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">HashRouter</span>&gt;</span>

</span></code></pre><h3 id="articleHeader8">BrowserRouter</h3><p>&#x8FD9;&#x4E2A;&#x5C31;&#x662F;&#x4F7F;&#x7528; HTML5 &#x63D0;&#x4F9B;&#x7684; history API &#x6765;&#x5904;&#x7406;&#x8DEF;&#x7531;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x9875;&#x9762;&#x90FD;&#x662F;&#x771F;&#x5B9E;&#x8DEF;&#x5F84;&#xFF0C;&#x9700;&#x8981;&#x540E;&#x7AEF;&#x914D;&#x7F6E;&#x6240;&#x6709;&#x8BF7;&#x6C42;&#x9875;&#x9762;&#x90FD;&#x6307;&#x5411;&#x6211;&#x4EEC;&#x7684;&#x4E3B;&#x9875;&#x9762;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { BrowserRouter } from &apos;react-router-dom&apos;

&lt;BrowserRouter&gt;
  &lt;App/&gt;
&lt;/BrowserRouter&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml">import </span><span class="hljs-template-variable">{ BrowserRouter }</span><span class="xml"> from &apos;react-router-dom&apos;

<span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">App</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span>
</span></code></pre><p>&#x8DF3;&#x8F6C;&#x8DEF;&#x7531;&#x76F4;&#x63A5;&#x9875;&#x9762;&#x91CC;&#x9762;&#x8DF3;&#x8F6C;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x4E0B;&#x9762;&#x7684;&#x65B9;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Link } from &apos;react-router-dom&apos;

&lt;Link to=&quot;/about&quot;&gt;&#x5173;&#x4E8E;&lt;/Link&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code><span class="hljs-keyword">import</span> { <span class="hljs-keyword">Link</span> } from <span class="hljs-string">&apos;react-router-dom&apos;</span>

&lt;<span class="hljs-keyword">Link</span> <span class="hljs-keyword">to</span>=<span class="hljs-string">&quot;/about&quot;</span>&gt;&#x5173;&#x4E8E;&lt;/<span class="hljs-keyword">Link</span>&gt;

</code></pre><p>&#x5982;&#x679C;&#x662F;&#x5728;js&#x91CC;&#x9762;&#x60F3;&#x8DF3;&#x8F6C;&#xFF0C;&#x5219;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.props.history.push() // &#x6216;&#x8005;replace&#xFF0C;&#x8FC7;&#x7740;go()&#x5565;&#x7684;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.history</span><span class="hljs-selector-class">.push</span>() <span class="hljs-comment">// &#x6216;&#x8005;replace&#xFF0C;&#x8FC7;&#x7740;go()&#x5565;&#x7684;</span>

</code></pre><p>&#x5C31;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x8DF3;&#x8F6C;&#x4E86;&#xFF0C;&#x4E0D;&#x8FC7;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x8981;&#x62FF;&#x5230;&#x7236;&#x7EC4;&#x4EF6;&#x7684;props&#x9700;&#x8981;&#x7EE7;&#x627F;&#x4E00;&#x4E0B;</p><p>&#x6BD4;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;&#x5B50;&#x7EC4;&#x4EF6; {...this.props}&gt;&lt;/&#x5B50;&#x7EC4;&#x4EF6;&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">&#x5B50;&#x7EC4;&#x4EF6;</span> </span></span><span class="hljs-template-variable">{...this.props}</span><span class="xml"><span class="hljs-tag">&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">&#x5B50;&#x7EC4;&#x4EF6;</span>&gt;</span>
</span></code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x628A;&#x7236;&#x7EC4;&#x4EF6;&#x7684;props&#x5168;&#x90E8;&#x4E22;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x53BB; =3=</p><p>&#x6700;&#x540E;&#x628A;&#x9879;&#x76EE;&#x7684;&#x4E00;&#x4E9B;&#x9700;&#x8981;&#x7684;&#x6587;&#x6863;&#x6574;&#x7406;&#x4E86;&#x4E00;&#x4E0B;</p><ul><li><a href="https://mobile.ant.design/docs/react/introduce-cn" rel="nofollow noreferrer" target="_blank">antd-mobile</a></li><li><a href="https://reactjs.org/docs/react-api.html" rel="nofollow noreferrer" target="_blank">react</a></li><li><a href="http://reacttraining.cn/web/example/basic" rel="nofollow noreferrer" target="_blank">reatc-route</a></li><li><a href="http://www.redux.org.cn/docs/api/" rel="nofollow noreferrer" target="_blank">react-redux</a></li><li><a href="http://lesscss.cn/" rel="nofollow noreferrer" target="_blank">less</a></li><li><a href="https://github.github.io/fetch/" rel="nofollow noreferrer" target="_blank">fetch</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react全家桶快餐进食指南

## 原文链接
[https://segmentfault.com/a/1190000015553237](https://segmentfault.com/a/1190000015553237)

