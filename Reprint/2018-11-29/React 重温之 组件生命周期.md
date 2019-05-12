---
title: 'React 重温之 组件生命周期' 
date: 2018-11-29 9:33:05
hidden: true
slug: hlqokgrpyy9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x751F;&#x547D;&#x5468;&#x671F;</h2>
<p>&#x4EFB;&#x4F55;&#x4E8B;&#x7269;&#x90FD;&#x4E0D;&#x4F1A;&#x51ED;&#x7A7A;&#x4EA7;&#x751F;&#xFF0C;&#x4E5F;&#x4E0D;&#x4F1A;&#x65E0;&#x6545;&#x6D88;&#x4EA1;&#x3002;&#x4E00;&#x4E2A;&#x4E8B;&#x7269;&#x4ECE;&#x4EA7;&#x751F;&#x5230;&#x6D88;&#x4EA1;&#x7ECF;&#x7406;&#x7684;&#x5404;&#x4E2A;&#x9636;&#x6BB5;&#xFF0C;&#x6211;&#x4EEC;&#x79F0;&#x4E4B;&#x4E3A; &#x751F;&#x547D;&#x5468;&#x671F;&#x3002;</p>
<p>&#x5177;&#x4F53;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x524D;&#x7AEF;&#x7EC4;&#x4EF6;&#x4E0A;&#x6765;&#xFF0C;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x53EF;&#x4EE5;&#x5927;&#x4F53;&#x5206;&#x4E3A;&#x521B;&#x5EFA;&#x3001;&#x66F4;&#x65B0;&#x3001;&#x9500;&#x6BC1;&#x8FD9;&#x4E2A;&#x4E09;&#x4E2A;&#x9636;&#x6BB5;&#x3002;</p>
<p>&#x672C;&#x6587;&#x4E3B;&#x8981;&#x4ECB;&#x7ECD;React &#x7684;&#x7EC4;&#x4EF6;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x5E76;&#x4EE5;&#x6700;&#x65B0;&#x53D1;&#x5E03;&#x7684;v16&#x4E3A;&#x5206;&#x6C34;&#x5CAD;&#xFF0C;&#x4ECB;&#x7ECD;&#x524D;&#x540E;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#x7684;&#x53D8;&#x5316;&#x3002;</p>
<h2 id="articleHeader1">&#x7EC4;&#x4EF6;&#x751F;&#x547D;&#x5468;&#x671F;</h2>
<p>&#x5728;React&#x4EE3;&#x7801;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x901A;&#x8FC7;&#x7EE7;&#x627F;React.Component&#x8FD9;&#x4E2A;&#x62BD;&#x8C61;&#x57FA;&#x7840;&#x7C7B;&#x6765;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x6709;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#x7684;&#x7EC4;&#x4EF6;&#xFF08;&#x51FD;&#x6570;&#x5F0F;&#x751F;&#x547D;&#x65E0;&#x6CD5;&#x81EA;&#x5B9A;&#x4E49;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#xFF09;&#xFF0C;react&#x5B98;&#x65B9;&#x5C06;&#x5176;&#x751F;&#x547D;&#x5468;&#x671F;&#x5206;&#x4E3A;&#x4EE5;&#x4E0B;&#x4E09;&#x4E2A;&#x9636;&#x6BB5;&#xFF1A;</p>
<h3 id="articleHeader2">&#x88C5;&#x8F7D;</h3>
<p>&#x8FD9;&#x4E2A;&#x9636;&#x6BB5;&#x662F;&#x6307;&#x7EC4;&#x4EF6;&#x521D;&#x59CB;&#x5316;&#x5E76;&#x63D2;&#x5165;DOM&#x4E2D;&#xFF0C;&#x4E3B;&#x8981;&#x5305;&#x542B;&#x4EE5;&#x4E0B;&#x51FD;&#x6570;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor()
static getDerivedStateFromProps()
componentWillMount() / UNSAFE_componentWillMount()
render()
componentDidMount()" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">()</span>
<span class="hljs-title">static</span> <span class="hljs-title">getDerivedStateFromProps</span><span class="hljs-params">()</span>
<span class="hljs-title">componentWillMount</span><span class="hljs-params">()</span> / <span class="hljs-title">UNSAFE_componentWillMount</span><span class="hljs-params">()</span>
<span class="hljs-title">render</span><span class="hljs-params">()</span>
<span class="hljs-title">componentDidMount</span><span class="hljs-params">()</span></span></code></pre>
<h3 id="articleHeader3">&#x66F4;&#x65B0;</h3>
<p>&#x5F53;&#x7EC4;&#x4EF6;&#x72B6;&#x6001;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#x66F4;&#x65B0;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillReceiveProps() / UNSAFE_componentWillReceiveProps()
static getDerivedStateFromProps()
shouldComponentUpdate()
componentWillUpdate() / UNSAFE_componentWillUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate()
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">componentWillReceiveProps</span><span class="hljs-params">()</span></span> / UNSAFE_componentWillReceiveProps()
static getDerivedStateFromProps()
<span class="hljs-function"><span class="hljs-title">shouldComponentUpdate</span><span class="hljs-params">()</span></span>
<span class="hljs-function"><span class="hljs-title">componentWillUpdate</span><span class="hljs-params">()</span></span> / UNSAFE_componentWillUpdate()
<span class="hljs-function"><span class="hljs-title">render</span><span class="hljs-params">()</span></span>
<span class="hljs-function"><span class="hljs-title">getSnapshotBeforeUpdate</span><span class="hljs-params">()</span></span>
<span class="hljs-function"><span class="hljs-title">componentDidUpdate</span><span class="hljs-params">()</span></span>
</code></pre>
<h3 id="articleHeader4">&#x9500;&#x6BC1;</h3>
<p>&#x5F53;&#x7EC4;&#x4EF6;&#x4ECE;DOM&#x4E2D;&#x79FB;&#x9664;&#x65F6;&#xFF0C;&#x542F;&#x52A8;&#x9500;&#x6BC1;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillUnmount()" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">componentWillUnmount</span><span class="hljs-params">()</span></span></code></pre>
<p>&#x5177;&#x4F53;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbmfE?w=960&amp;h=959" src="https://static.alili.tech/img/bVbbmfE?w=960&amp;h=959" alt="React &#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;" title="React &#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x5982;&#x4E0A;&#x56FE;&#x6240;&#x793A;&#xFF0C;&#x7EFF;&#x8272;&#x80CC;&#x666F;&#x4E3A;v16&#x7248;&#x672C;&#x65B0;&#x589E;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#xFF0C;&#x9EC4;&#x8272;&#x80CC;&#x666F;&#x7684;&#x7684;&#x4E3A;v16&#x7248;&#x672C;&#x5EFA;&#x8BAE;&#x5F03;&#x7528;&#xFF0C;&#x5E76;&#x5728;&#x540E;&#x7EED;&#x7248;&#x672C;&#x4E2D;&#x4F1A;&#x5220;&#x9664;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#x3002;</p>
<p>&#x5176;&#x4E2D;getDerivedStateFromProps&#x662F;&#x4E00;&#x4E2A;&#x9759;&#x6001;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x66FF;&#x6362;&#x539F;&#x6765;&#x7684;componentWillMount&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x8FD9;&#x4E2A;&#x9759;&#x6001;&#x51FD;&#x6570;&#x4E2D;&#x5C06;props&#x91CC;&#x7684;&#x5C5E;&#x6027;&#x6DFB;&#x52A0;&#x5230;state&#x4E2D;&#x53BB;&#xFF0C;&#x8FD9;&#x91CC;&#x5E94;&#x8BE5;&#x662F;&#x4E00;&#x4E2A;&#x7EAF;&#x51FD;&#x6570;&#x3002;</p>
<p>getSnapshotBeforeUpdate&#x7528;&#x6765;&#x505A;&#x4E00;&#x4E9B;&#x5FC5;&#x987B;&#x8981;&#x4FEE;&#x6539;&#x771F;&#x5B9E;DOM&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x867D;&#x7136;&#x4E0D;&#x5EFA;&#x8BAE;&#x8FD9;&#x4E48;&#x505A;&#x3002;</p>
<h2 id="articleHeader5">One more thing</h2>
<p>React &#x540C;&#x65F6;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;componentDidCatch&#x51FD;&#x6570;&#xFF0C;&#x6765;&#x8868;&#x660E;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x662F;&#x4E00;&#x4E2A;&#x8FB9;&#x754C;&#x9519;&#x8BEF;&#x5904;&#x7406;&#x7EC4;&#x4EF6;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x53C2;&#x8003;<a href="https://segmentfault.com/a/1190000015007566">&#x9519;&#x8BEF;&#x8FB9;&#x754C;</a></p>
<p><a href="https://doc.react-china.org/docs/react-component.html" rel="nofollow noreferrer" target="_blank">&#x53C2;&#x8003;&#x94FE;&#x63A5;</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 重温之 组件生命周期

## 原文链接
[https://segmentfault.com/a/1190000015072134](https://segmentfault.com/a/1190000015072134)

