---
title: Docz 用 MDX 写 React UI 组件文档
hidden: true
categories: reprint
slug: '6e968326'
date: 2018-11-09 02:30:06
---

{{< raw >}}
<h4>&#x524D;&#x8A00;</h4><p>&#x4E3A;&#x4E86;&#x63D0;&#x5347;&#x5F00;&#x53D1;&#x6548;&#x7387;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x5957; UI &#x7EC4;&#x4EF6;&#x5E93;&#x662F;&#x4E00;&#x79CD;&#x8F83;&#x4E3A;&#x6709;&#x6548;&#x7684;&#x65B9;&#x5F0F;&#x4E4B;&#x4E00;&#xFF1A;&#x53EF;&#x4EE5;&#x51CF;&#x5C11;&#x91CD;&#x590D;&#x5DE5;&#x4F5C;&#x3001;&#x63D0;&#x9AD8;&#x53EF;&#x590D;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x73B0;&#x5728;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#x56E2;&#x961F;&#x5F00;&#x59CB;&#x521B;&#x5EFA;&#x81EA;&#x5DF1;&#x7684; UI &#x7EC4;&#x4EF6;&#x5E93;&#x3002;&#x8F83;&#x65E9;&#x7684; Twitter &#x7684; <a href="http://getbootstrap.com/" rel="nofollow noreferrer" target="_blank">Bootstrap</a> &#x867D;&#x7136;&#x53EA;&#x80FD;&#x79F0;&#x4E3A; UI &#x5E93;&#xFF0C;&#x4F46;&#x4E5F;&#x5927;&#x5927;&#x63D0;&#x5347;&#x4E86;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;&#x540E;&#x9762; <code>MVVM</code> &#x5927;&#x884C;&#x5176;&#x9053; &#xFF0C;&#x524D;&#x7AEF;&#x7EC8;&#x4E8E;&#x53EF;&#x4EE5;&#x628A; HTML&#x3001;CSS&#x3001;JS &#x653E;&#x5728;&#x4E00;&#x8D77;&#x5F00;&#x53D1;&#x5305;&#x542B; UI &#x3001;&#x4EA4;&#x4E92;&#x771F;&#x6B63;&#x610F;&#x4E49;&#x4E0A;&#x7684;&#x7EC4;&#x4EF6;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x6709;&#x57FA;&#x4E8E; <code>React</code> &#x7684; <a href="https://material-ui.com/demos/app-bar/" rel="nofollow noreferrer" target="_blank">Material-UI</a>&#x3001;&#x56FD;&#x5185;&#x963F;&#x91CC;&#x91D1;&#x670D;&#x57FA;&#x4E8E; <code>React</code> &#x7684; <a href="https://ant.design/docs/react/introduce-cn" rel="nofollow noreferrer" target="_blank">Ant Design</a>&#x3001;&#x997F;&#x4E86;&#x4E48;&#x57FA;&#x4E8E; <code>Vue.js</code> &#x7684; <a href="https://element.eleme.io/" rel="nofollow noreferrer" target="_blank">Element</a>&#x3001;TalkingData &#x57FA;&#x4E8E; <code>Vue.js</code> &#x7684; <a href="https://iviewui.com/" rel="nofollow noreferrer" target="_blank">iView</a> &#x7B49;&#x3002;&#x6709;&#x4E86;&#x8FD9;&#x4E9B; UI &#x7EC4;&#x4EF6;&#xFF0C;&#x8BA9;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x53D8;&#x5F97;&#x524D;&#x6240;&#x672A;&#x6709;&#x7684;&#x65B9;&#x4FBF;&#xFF0C;&#x5B8C;&#x6210;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x5C31;&#x50CF;&#x662F;&#x62FF;&#x4E00;&#x5757;&#x5757;&#x7684;&#x79EF;&#x6728;(&#x7EC4;&#x4EF6;)&#x5806;&#x6210;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x9879;&#x76EE;&#x3002;</p><p>&#x8003;&#x8651;&#x5230;&#x524D;&#x671F;&#x5F00;&#x53D1; UI &#x7EC4;&#x4EF6;&#x7684;&#x5DE5;&#x4F5C;&#x91CF;&#x53CA;&#x540E;&#x671F;&#x7EF4;&#x62A4;&#x6210;&#x672C;&#xFF0C;&#x6211;&#x8BA4;&#x4E3A;&#x5728;&#x5927;&#x5382;&#x5F00;&#x6E90; UI &#x7EC4;&#x4EF6;&#x5E93;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x4E2A;&#x6027;&#x5316;&#x8272;&#x5F69;&#xFF08;&#x4E00;&#x822C;&#x90FD;&#x63D0;&#x4F9B;&#x989C;&#x8272;&#x5B9A;&#x5236;&#xFF09;&#x3001;&#x589E;&#x52A0;&#x56E2;&#x961F;&#x7684;&#x4E2A;&#x6027;&#x5316;&#x9700;&#x6C42;&#x7EC4;&#x4EF6;&#x3001;&#x51CF;&#x5C11;&#x4E0D;&#x9700;&#x8981;&#x7684;&#x7EC4;&#x4EF6;&#x662F;&#x4E2A;&#x4E0D;&#x9519;&#x7684;&#x4E3B;&#x610F;&#x3002;</p><p>&#x6709;&#x4E86;&#x56E2;&#x961F;&#x7684; UI &#x7EC4;&#x4EF6;&#x5E93;&#x5C31;&#x5C11;&#x4E0D;&#x4E86;&#x4F7F;&#x7528;&#x6587;&#x6863;&#xFF0C;&#x6BD5;&#x7ADF;&#x6587;&#x6863;&#x8FD8;&#x662F;&#x6BD4;&#x53E3;&#x53E3;&#x76F8;&#x4F20;&#x8981;&#x9760;&#x8C31;&#x7684;&#x591A;&#x3002;&#x8FD9;&#x91CC;&#x4ECB;&#x7ECD;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x5FEB;&#x901F;&#x521B;&#x5EFA; React UI &#x7EC4;&#x4EF6;&#x5E93;&#x4F7F;&#x7528;&#x3001;&#x6F14;&#x793A;&#x6587;&#x6863;&#x7684;&#x9879;&#x76EE;&#xFF1A;<a href="https://github.com/pedronauck/docz" rel="nofollow noreferrer" target="_blank">Docz</a>&#x3002;<a href="https://github.com/pedronauck/docz" rel="nofollow noreferrer" target="_blank">Docz</a> &#x7684;&#x7279;&#x8272;&#x662F;&#x96F6;&#x914D;&#x7F6E;&#x3001;&#x7B80;&#x5355;&#x3001;&#x5FEB;&#x901F;&#xFF0C;&#x5B83;&#x4F7F;&#x7528; <code>Markdown</code> &#x8BED;&#x6CD5;&#x7684;&#x6269;&#x5C55; <a href="https://github.com/mdx-js/mdx" rel="nofollow noreferrer" target="_blank">MDX</a> (&#x5728; Markdown &#x91CC;&#x5F15;&#x5165; React &#x7EC4;&#x4EF6;&#x5E76;&#x6E32;&#x67D3;&#x51FA;&#x7EC4;&#x4EF6;)&#x6765;&#x4E66;&#x5199;&#x6587;&#x6863;&#xFF0C;&#x5BF9;&#x4E8E;&#x719F;&#x6089; <code>Markdown</code> &#x7684;&#x5F00;&#x53D1;&#x8005;&#x662F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4E0A;&#x624B;&#x7684;&#x3002;&#x4E0B;&#x9762;&#x8D34;&#x4E00;&#x5F20;&#x5B98;&#x65B9;&#x7684;&#x56FE;&#x770B;&#x770B;&#x6709;&#x591A;&#x7B80;&#x5355;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000016414374?w=1634&amp;h=938" src="https://static.alili.tech/img/remote/1460000016414374?w=1634&amp;h=938" alt="Docz" title="Docz" style="cursor:pointer;display:inline"></span></p><blockquote>&#x5DE6;&#x8FB9;&#x662F;&#x521B;&#x5EFA;&#x7684; <code>MDX</code> &#x6587;&#x6863;&#xFF0C;&#x53F3;&#x8FB9;&#x662F; Docz &#x6E32;&#x67D3;&#x51FA;&#x7684;&#x7EC4;&#x4EF6;&#x53CA;&#x7EC4;&#x4EF6;&#x4EE3;&#x7801;&#x3002;</blockquote><p>&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x65B9;&#x4FBF;&#xFF1F;&#x90A3;&#x4E0B;&#x9762;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x4F7F;&#x7528;&#x6B65;&#x9AA4;&#x3002;</p><h4>&#x4F7F;&#x7528;</h4><h5>1. &#x5728;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x91CC;&#x5B89;&#x88C5; Docz&#xFF1A;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add docz --dev &#x6216;&#x8005; npm install docz --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs q"><code style="word-break:break-word;white-space:initial">yarn add docz --<span class="hljs-built_in">dev</span> &#x6216;&#x8005; npm install docz --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre><h5>2. &#x521B;&#x5EFA; <code>.mdx</code> &#x6587;&#x4EF6;&#x5E76;&#x8F93;&#x5165;&#xFF1A;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="---
name: Button
---

import { Playground, PropsTable } from &apos;docz&apos;
import Button from &apos;./&apos;

# Button

&lt;PropsTable of={Button} /&gt;

## Basic usage

&lt;Playground&gt;
 &lt;Button&gt;Click me&lt;/Button&gt;
 &lt;Button kind=&quot;secondary&quot;&gt;Click me&lt;/Button&gt;
&lt;/Playground&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">---
name: Button
---

<span class="hljs-keyword">import</span> { Playground, PropsTable } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;docz&apos;</span>
<span class="hljs-keyword">import</span> Button <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./&apos;</span>

# Button

&lt;PropsTable <span class="hljs-keyword">of</span>={Button} /&gt;

## Basic usage

&lt;Playground&gt;
 <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
 &lt;Button kind=<span class="hljs-string">&quot;secondary&quot;</span>&gt;Click me&lt;<span class="hljs-regexp">/Button&gt;
&lt;/</span>Playground&gt;</code></pre><h5>3. &#x8FD0;&#x884C;&#xFF1A;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn docz dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">yarn docz dev</span></code></pre><p>&#x7136;&#x540E;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684; Button &#x7EC4;&#x4EF6;&#x7684;&#x6F14;&#x793A;&#x3001;&#x4F7F;&#x7528;&#x6587;&#x6863;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000016414375" src="https://static.alili.tech/img/remote/1460000016414375" alt="" title="" style="cursor:pointer;display:inline"></span></p><blockquote>&#x66F4;&#x591A;&#x8BE6;&#x60C5;&#xFF1A;<a href="http://www.docz.site/introduction/getting-started" rel="nofollow noreferrer" target="_blank">http://www.docz.site/introduc...</a></blockquote><h4>&#x914D;&#x7F6E;</h4><p>&#x96F6;&#x914D;&#x7F6E;&#x65B9;&#x4FBF;&#x662F;&#x65B9;&#x4FBF;&#xFF0C;&#x4F46;&#x6709;&#x65F6;&#x60F3;&#x754C;&#x9762;&#x4E2A;&#x6027;&#x5316;&#x70B9;&#x8FD8;&#x662F;&#x5F88;&#x8D39;&#x4E8B;&#x7684;(&#x5B98;&#x65B9;&#x63D0;&#x4F9B; Themes &#x652F;&#x6301;&#xFF0C;&#x4F46;&#x73B0;&#x4EC5;&#x6709;&#x4E00;&#x5957;&#x5B98;&#x65B9;&#x7684;&#x9ED8;&#x8BA4;&#x4E3B;&#x9898;)&#xFF0C;&#x4E0B;&#x9762;&#x5206;&#x4EAB;&#x4E00;&#x4E2A;&#x901A;&#x8FC7;&#x5F15;&#x5165;&#x672C;&#x5730; CSS &#x7684;&#x65B9;&#x5F0F;&#x6765;&#x6539;&#x53D8;&#x9ED8;&#x8BA4;&#x4E3B;&#x9898;&#x7684;&#x914D;&#x7F6E;&#x3002;</p><h5>1. &#x521B;&#x5EFA;&#x914D;&#x7F6E;&#x6587;&#x4EF6; <code>doczrc.js</code>&#xFF0C;&#x589E;&#x52A0; htmlContext &#x5185;&#x5BB9;&#x3002;</h5><blockquote>&#x66F4;&#x591A;&#x914D;&#x7F6E;&#xFF1A;<a href="https://www.docz.site/documentation/project-configuration" rel="nofollow noreferrer" target="_blank">https://www.docz.site/documen...</a></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  htmlContext: {
    head: {
      links: [
        { rel: &apos;stylesheet&apos;, href: &apos;/base.css&apos; }
      ]
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
  <span class="hljs-attribute">htmlContext</span>: {
    <span class="hljs-attribute">head</span>: {
      <span class="hljs-attribute">links</span>: [
        { <span class="hljs-attribute">rel</span>: <span class="hljs-string">&apos;stylesheet&apos;</span>, <span class="hljs-attribute">href</span>: <span class="hljs-string">&apos;/base.css&apos;</span> }
      ]
    }
  }
}</code></pre><h5>2. <code>.docz</code> &#x76EE;&#x5F55;&#x4E0B;&#x521B;&#x5EFA; <code>public</code> &#x6587;&#x4EF6;&#x5939;&#x5E76;&#x521B;&#x5EFA; <code>base.css</code>&#xFF0C;&#x5728; <code>base.css</code> &#x91CC;&#x5199;&#x81EA;&#x5DF1;&#x7684;&#x6837;&#x5F0F;&#x8986;&#x76D6;&#x9ED8;&#x8BA4;&#x7684;&#x5373;&#x53EF;&#x3002;</h5><h4>&#x6700;&#x540E;</h4><ul><li>Docz &#x7B80;&#x5355;&#x597D;&#x7528;&#xFF0C;&#x4F46;&#x73B0;&#x5728;&#x53EA;&#x652F;&#x6301; React&#x3002;</li><li><p><a href="https://github.com/storybooks/storybook" rel="nofollow noreferrer" target="_blank">Storybook</a> &#x662F;&#x4E00;&#x4E2A;&#x66F4;&#x5F3A;&#x5927;&#x7684;&#x96C6;&#x7EC4;&#x4EF6;&#x5F00;&#x53D1;&#x3001;&#x67E5;&#x770B;&#x3001;&#x6D4B;&#x8BD5;&#x7684;&#x6587;&#x6863;&#x5DE5;&#x5177;&#xFF0C;&#x652F;&#x6301;&#xFF1A;</p><ul><li>React</li><li>React Native</li><li>Vue</li><li>Angular</li><li>Polymer</li><li>Mithril</li><li>Marko</li><li>HTML</li><li>Svelte</li><li>Riot</li></ul></li><li><a href="https://github.com/docsifyjs/docsify" rel="nofollow noreferrer" target="_blank">Docsify</a>&#xFF1A;<a href="https://docsify.js.org/#/zh-cn/vue?id=%E6%90%AD%E9%85%8D-vuep-%E5%86%99-playground" rel="nofollow noreferrer" target="_blank">&#x642D;&#x914D; Vuep &#x5199; Playground</a>&#x3002;</li></ul><h5>&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;&#xFF1A; <a href="https://blog.givebest.cn/other/2018/09/15/react-ui-component-docz-mdx.html" rel="nofollow noreferrer" target="_blank">https://blog.givebest.cn/other/2018/09/15/react-ui-component-docz-mdx.html</a></h5>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Docz 用 MDX 写 React UI 组件文档

## 原文链接
[https://segmentfault.com/a/1190000016414371](https://segmentfault.com/a/1190000016414371)

