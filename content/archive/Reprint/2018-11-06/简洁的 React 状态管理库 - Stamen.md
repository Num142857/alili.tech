---
title: 简洁的 React 状态管理库 - Stamen
hidden: true
categories: reprint
slug: d3ac19ce
date: 2018-11-06 02:30:12
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbhI3j?w=670&amp;h=551" src="https://static.alili.tech/img/bVbhI3j?w=670&amp;h=551" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x8BF4;&#x5230; React &#x72B6;&#x6001;&#x7BA1;&#x7406;&#xFF0C;&#x5FC5;&#x63D0;&#x7684;&#x80AF;&#x5B9A;&#x662F; Redux &#x4E0E; MobX&#xFF0C;2018 &#x5E74;&#x5FEB;&#x8FC7;&#x53BB;&#x4E86;&#xFF0C;&#x5B83;&#x4EEC;&#x4F9D;&#x7136;&#x662F;&#x6700;&#x706B;&#x70ED;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#xFF0C;&#x4E5F;&#x6709;&#x4E00;&#x4E9B;&#x57FA;&#x4E8E; Redux &#x7684;&#xFF0C;&#x5982; dva&#x3001;rematch &#x7B49;&#xFF0C;&#x4E5F;&#x6709;&#x65B0;&#x7684;&#xFF0C;&#x5982; mobx-state-tree&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x5BF9;&#x5404;&#x4E2A;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x4F5C;&#x8BC4;&#x4EF7;&#x3002;</p><p>&#x4F46;&#x8FD8;&#x662F;&#x60F3;&#x5410;&#x69FD;:</p><p>&#x4EC0;&#x4E48; provider, connections, actions, reducers, effects, dispatch, put, call, payload, @observable, @computed, @observer, @inject...</p><p>&#x4E00;&#x5806;&#x6A21;&#x677F;&#x4EE3;&#x7801;&#x3001;&#x5404;&#x79CD;&#x6982;&#x5FF5;&#x3001;&#x4EC0;&#x4E48;&#x54F2;&#x5B66;&#x539F;&#x5219;... &#x8FD8;&#x6709;&#x5404;&#x79CD;&#x591A;&#x5982;&#x725B;&#x6BDB;&#x7684; Api&#x3002;</p><p>&#x6211;&#x53EA;&#x662F;&#x60F3;&#x65E9;&#x70B9;&#x7801;&#x5B8C;&#x9875;&#x9762;&#x4E0B;&#x73ED;&#xFF0C;&#x65E9;&#x70B9;&#x4E0B;&#x73ED;&#x5065;&#x8EAB;&#x3001;&#x966A;&#x59B9;&#x5B50;...</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x60F3;&#x8981;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5E93;&#xFF1A;</p><ul><li><strong>&#x8F7B;&#x91CF;</strong> &#x4E2A;&#x4EBA;&#x505A;&#x79FB;&#x52A8;&#x7AEF;&#x5F00;&#x53D1;&#x6BD4;&#x8F83;&#x591A;</li><li><strong>&#x7B80;&#x6D01;</strong> &#x6CA1;&#x6A21;&#x677F;&#x4EE3;&#x7801;, &#x5C3D;&#x91CF;&#x5C11;&#x7684; Api</li><li><strong>&#x7B26;&#x5408;&#x76F4;&#x89C9;</strong> &#x6CA1;&#x590D;&#x6742;&#x7684;&#x6982;&#x5FF5;&#xFF0C; &#x7ED9;&#x4E2A; action &#x6539; state &#x5C31;&#x597D;</li><li><strong>&#x6E05;&#x6670;</strong> &#x66F4;&#x6613;&#x5199;&#x51FA;&#x53EF;&#x7EF4;&#x62A4;&#x548C;&#x53EF;&#x8BFB;&#x6027;&#x597D;&#x7684;&#x4EE3;&#x7801;</li><li><strong>&#x9AD8;&#x6548;</strong> &#x66F4;&#x9AD8;&#x7684;&#x5F00;&#x53D1;&#x6548;&#x7387;&#xFF0C;&#x8FD9;&#x5F88;&#x91CD;&#x8981;</li><li><strong>Typescript</strong> state &#x548C; action &#x9AD8;&#x5EA6;&#x652F;&#x6301;&#x667A;&#x80FD;&#x63D0;&#x793A;</li></ul><p>&#x6211;&#x662F;&#x4E2A;<strong>&#x5B9E;&#x7528;&#x4E3B;&#x4E49;&#x8005;</strong>&#xFF0C;<strong>&#x5F00;&#x53D1;&#x6548;&#x7387;</strong>&#x3001;<strong>&#x4EE3;&#x7801;&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x548C;&#x53EF;&#x8BFB;&#x6027;</strong>&#x3001;<strong>&#x5F00;&#x53D1;&#x4F53;&#x9A8C;</strong>&#x5927;&#x4E8E;&#x5404;&#x79CD;&#x4EC0;&#x4E48;&#x8303;&#x5F0F;&#x3001;&#x5404;&#x79CD;&#x7406;&#x8BBA;&#xFF0C;&#x4E5F;&#x4E0D;&#x9700;&#x8981;&#x88C5;&#x7EAF;&#xFF0C;&#x91CD;&#x8981;&#x7684;&#x662F;&#x53EF;&#x4EE5;&#x5FEB;&#x901F;&#x5904;&#x7406;&#x4E1A;&#x52A1;&#xFF0C;&#x4EA7;&#x751F;&#x4EF7;&#x503C;&#xFF0C;&#x65E9;&#x70B9;&#x4E0B;&#x73ED;&#x6253;&#x738B;&#x8005;&#x3002;</p><p>&#x6709;&#x4E00;&#x5929;&#xFF0C;&#x6211;&#x770B;&#x5230;&#x4E86; mobx &#x4F5C;&#x8005;&#x7684; immer, &#x6211;&#x611F;&#x89C9;&#x4F7F;&#x7528; immer, &#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x6211;&#x7406;&#x60F3;&#x4E2D;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x9020;&#x4E86;&#x4E00;&#x4E2A;&#x8F6E;&#x5B50;&#xFF0C;&#x53EB; <a href="https://github.com/forsigner/stamen" rel="nofollow noreferrer" target="_blank">stamen</a>, &#x4ED6;&#x6709;&#x4EC0;&#x4E48;&#x7279;&#x70B9;&#x5462;&#xFF0C;Show you the code: <a href="https://github.com/forsigner/stamen" rel="nofollow noreferrer" target="_blank">stamen</a>&#x3002;</p><p>&#x5982;&#x679C;&#x6709;&#x4EC0;&#x4E48;<strong>&#x6838;&#x5FC3;&#x7279;&#x70B9;</strong>&#x7684;&#x8BDD;&#xFF0C;&#x90A3;&#x5E94;&#x8BE5;&#x662F; &quot;<strong>&#x7B80;&#x6D01;</strong>&quot;&#xFF0C;&#x8FD9;&#x91CC;&#x6307;&#x7684;&#x662F;&#x4F7F;&#x7528;&#x8005;&#x5199;&#x4EE3;&#x7801;&#x65F6;&#x7B80;&#x6D01;&#xFF0C;&#x53EF;&#x4EE5;&#x4E13;&#x6CE8;&#x4E8E;&#x4E1A;&#x52A1;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x81EA;&#x8EAB;&#x6E90;&#x4EE3;&#x7801;&#x7B80;&#x6D01;&#xFF0C;&#x628A;&#x95EE;&#x9898;&#x7559;&#x7ED9;&#x4F7F;&#x7528;&#x8005;&#x3002;</p><p>CodeSandbox&#x4E0A;&#x7684;&#x4F8B;&#x5B50;: <a href="https://codesandbox.io/s/0vrrlkjx5w" rel="nofollow noreferrer" target="_blank">Basic</a> | <a href="https://codesandbox.io/s/kmq65p3l97" rel="nofollow noreferrer" target="_blank">Async</a></p><p><strong>&#x7528;&#x6CD5;&#x6BD4;&#x8F83;&#x7B80;&#x5355;:</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import { render } from &apos;react-dom&apos;;
import { createStore } from &apos;stamen&apos;;

const { consume, mutate } = createStore({ count: 1 });

const App = () =&gt; (
  &lt;div&gt;
    &lt;span&gt;{consume(state =&gt; state.count)}&lt;/span&gt;
    &lt;button onClick={() =&gt; mutate(state =&gt; state.count--)}&gt;-&lt;/button&gt;
    &lt;button onClick={() =&gt; mutate(state =&gt; state.count++)}&gt;+&lt;/button&gt;
  &lt;/div&gt;
);

render(&lt;App /&gt;, document.getElementById(&apos;root&apos;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>;
<span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;stamen&apos;</span>;

<span class="hljs-keyword">const</span> { consume, mutate } = createStore({ <span class="hljs-attr">count</span>: <span class="hljs-number">1</span> });

<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{consume(state =&gt; state.count)}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> mutate(state =&gt; state.count--)}&gt;-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> mutate(state =&gt; state.count++)}&gt;+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);

render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, document.getElementById(&apos;root&apos;));</span></code></pre><p>&#x53EA;&#x6709; state &#x548C; action &#xFF0C;&#x6CA1;&#x6709;&#x5176;&#x5B83;&#x6982;&#x5FF5;&#xFF0C;&#x53EA;&#x6709;&#x4E00;&#x4E2A; api:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { consume, mutate } = createStore({ count: 1 });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> { consume, mutate } = createStore({ <span class="hljs-attr">count</span>: <span class="hljs-number">1</span> });</code></pre><p><code>Stamen</code> &#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x53EA;&#x6709;40&#x884C;&#xFF0C;&#x5BF9;&#x4E8E;&#x5927;&#x90E8;&#x5206;&#x9879;&#x76EE;&#x6765;&#x8BF4;&#xFF0C;&#x8FD9;40&#x884C;&#x4EE3;&#x7801;&#x6240;&#x5305;&#x542B;&#x7684;&#x529F;&#x80FD;&#x5DF2;&#x7136;&#x8DB3;&#x591F;&#x3002;</p><p><strong>&#x66F4;&#x591A;&#x7528;&#x6CD5;&#x53EF;&#x4EE5;&#x770B;&#xFF1A;</strong></p><p>Github: <a href="https://github.com/forsigner/stamen" rel="nofollow noreferrer" target="_blank">https://github.com/forsigner/...</a><br>&#x6587;&#x6863;: <a href="http://forsigner.com/stamen-zh-cn" rel="nofollow noreferrer" target="_blank">http://forsigner.com/stamen-z...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简洁的 React 状态管理库 - Stamen

## 原文链接
[https://segmentfault.com/a/1190000016578634](https://segmentfault.com/a/1190000016578634)

