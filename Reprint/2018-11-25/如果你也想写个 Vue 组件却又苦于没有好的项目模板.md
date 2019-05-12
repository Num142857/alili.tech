---
title: '如果你也想写个 Vue 组件却又苦于没有好的项目模板' 
date: 2018-11-25 2:30:06
hidden: true
slug: oukmw07imna
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbc7iT?w=800&amp;h=600" src="https://static.alili.tech/img/bVbc7iT?w=800&amp;h=600" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><br></p><p><strong>&#x9996;&#x5148;&#xFF0C;&#x8FD9;&#x4E0D;&#x662F;&#x4E00;&#x7BC7;&#x6280;&#x672F;&#x6587;&#x7AE0;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x7B3C;&#x7EDF;&#x7684; guide&#xFF0C;&#x5173;&#x4E8E;&#x5199;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684; guide&#xFF0C;&#x66F4;&#x662F;&#x4E2A;&#x5E7F;&#x544A;&#xFF0C;&#x76EE;&#x7684;&#x662F;&#x8BA9;&#x66F4;&#x591A;&#x4EBA;&#x7528;&#x4F60;&#x7684;&#x5E93;</strong></p><p>&#x6700;&#x5F00;&#x59CB;&#x60F3;&#x8981;&#x81EA;&#x5DF1;&#x5199;&#x4E00;&#x4E2A;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x60F3;&#x7740;&#x53BB;&#x6284;&#x73B0;&#x6709;&#x4F18;&#x79C0;&#x5E93;&#x7684;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x4E4B;&#x7C7B;&#x7684;&#xFF0C;&#x901A;&#x5E38;&#x5728;&#x8FD9;&#x4E0A;&#x9762;&#x5C31;&#x4F1A;&#x82B1;&#x4E0D;&#x5C11;&#x65F6;&#x95F4;&#xFF0C;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x6765;&#x6316;&#x6398;&#x4E0B;</p><h2 id="articleHeader0">1.&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x7EC4;&#x4EF6;&#x9879;&#x76EE;&#x9700;&#x8981;&#x4EC0;&#x4E48;&#xFF1F;</h2><h4>&#x5FC5;&#x8981;&#x7684;&#xFF1A;</h4><ul><li>&#x7EC4;&#x4EF6;&#x6784;&#x5EFA;&#x65B9;&#x5F0F; ( webpack / rollup &#x4E4B;&#x7C7B; )&#xFF0C;&#x5E76;&#x63D0;&#x4F9B;&#x81F3;&#x5C11;&#x4E00;&#x4E2A;&#x4E3B;&#x6D41;&#x7684;&#x8F93;&#x51FA;&#x683C;&#x5F0F; (ESModule)</li><li>Demo &#x53CA; Demo &#x6E90;&#x7801;</li><li>&#x6587;&#x6863;&#xFF0C;&#x53EF;&#x4EE5;&#x662F; <a href="https://github.com/docsifyjs/docsify" rel="nofollow noreferrer" target="_blank">docsify </a>&#x4E4B;&#x7C7B;&#x7684;&#x751F;&#x6210;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x61D2;&#x70B9;&#x5C31;&#x5185;&#x5D4C;&#x5728; README &#x91CC;&#x4E86;</li></ul><p>&#x5176;&#x5B9E;&#x4E0A;&#x9762;&#x7684;&#x9664;&#x4E86;&#x6587;&#x6863;&#x90FD;&#x6BD4;&#x8F83;&#x5BB9;&#x6613;&#x505A;&#x5230;&#xFF0C;&#x9664;&#x4E86;&#x53EF;&#x80FD;&#x4F1A;&#x5728;&#x6784;&#x5EFA;&#x4E0A;&#x8E29;&#x5751;&#x5916;&#x3002;&#x90A3;&#x4E48;&#x505A;&#x5230;&#x4E86;&#x8FD9;&#x4E9B;&#x53EF;&#x4EE5;&#x4E0A;&#x7EBF;&#x4E86;&#x5417;&#xFF1F;&#x662F;&#x7684;&#x3002;&#x4E0D;&#x8FC7;&#x770B;&#x4E00;&#x4E9B;&#x4F18;&#x79C0;&#x7684;&#x5E93;&#x5176;&#x5B9E;&#x8FD8;&#x53EF;&#x4EE5;&#x505A;&#x66F4;&#x591A;&#x7684;&#xFF0C;&#x4F8B;&#x5982;&#x4E0B;&#x9762;&#x7684;&#x8FD9;&#x4E9B;&#xFF1A;</p><h4>&#x6709;&#x5C31;&#x66F4;&#x597D;&#x4E86;&#xFF1A;</h4><ul><li>&#x4E00;&#x4E2A;&#x6E05;&#x6670;&#x5730; <code>README.md</code></li><li>&#x63D0;&#x4F9B;&#x591A;&#x79CD;&#x6784;&#x5EFA;&#x65B9;&#x5F0F; <code>es/cjs/umd</code> &#x7B49;&#x591A;&#x79CD;&#x683C;&#x5F0F;&#x7684;&#x5305;</li><li>&#x4E00;&#x4E2A;&#x4E0D;&#x4E11;&#x7684; <code>Logo</code></li><li>&#x7EC4;&#x4EF6;<code>&#x622A;&#x56FE;</code>&#xFF08;&#x6CA1; *8 &#x8BF4;&#x4E2A;&#x56FE;&#xFF09;&#xFF0C;&#x6709;&#x5177;&#x4F53;&#x4EA4;&#x4E92;&#x7684;&#x6700;&#x597D;&#x8FD8;&#x80FD;&#x662F;&#x52A8;&#x56FE;</li><li><code>package.json</code> &#x4E0D;&#x8981;&#x6709;&#x591A;&#x4F59;&#x7684; dependencies&#xFF0C;&#x5C3D;&#x91CF;&#x90FD;&#x5728; <code>peerDependencies</code> &#x548C; <code>devDependencies</code> &#x91CC;</li><li>&#x5728; Readme &#x91CC;&#x51E0;&#x53E5;&#x8BDD;&#x4ECB;&#x7ECD;&#x6E05;&#x695A;&#x7EC4;&#x4EF6;&#x7684;&#x529F;&#x80FD;</li></ul><p>&#x5BF9;&#x7684;&#xFF0C;&#x4EE5;&#x4E0A;&#x51E0;&#x6761;&#x8BF4;&#x8D77;&#x6765;&#x5F88;&#x5BB9;&#x6613;&#xFF0C;&#x5C31;&#x50CF;&#x5199;&#x516C;&#x53F8;&#x5185;&#x90E8;&#x7CFB;&#x7EDF;&#x65F6;&#x4E00;&#x6837;&#xFF0C;&#x60F3;&#x8981;&#x4EC0;&#x4E48;&#x4EC0;&#x4E48;&#x4EA4;&#x4E92;&#x7684;&#x60F3;&#x6CD5;&#x5F88;&#x7F8E;&#x597D;&#xFF0C;&#x4F46;&#x662F;&#x8EAB;&#x4F53;&#x529B;&#x884C;&#x603B;&#x529B;&#x4E0D;&#x4ECE;&#x5FC3;</p><blockquote>&#x65F6;&#x95F4;&#x5F88;&#x5B9D;&#x8D35;&#x7684;&#xFF0C;&#x80FD;&#x7528;&#x5C31;&#x884C;&#x4E86;&#x561B;&#xFF0C;&#x8981;&#x505A;&#x597D;&#x8C01;&#x4E0D;&#x4F1A;&#xFF0C;&#x6211;&#x5FD9;...</blockquote><p>&#x597D;&#x4E86;&#xFF0C;&#x5199;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x76EE;&#x7684;&#x6765;&#x4E86;</p><h2 id="articleHeader1">2.&#x90A3;&#x4E48;&#xFF0C;&#x6709;&#x6CA1;&#x6709;...</h2><p>&#x6709;&#x6CA1;&#x6709;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x6A21;&#x677F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x62FF;&#x6765;&#x7528;&#xFF0C;&#x6211;&#x53EA;&#x8981;&#x5173;&#x5FC3;&#x600E;&#x4E48;&#x5199;&#x7EC4;&#x4EF6;&#x5C31;&#x884C;&#x4E86;&#x5462;&#xFF0C;&#x90A3;&#x662F;&#x5F53;&#x7136;&#x5566;&#xFF01;</p><p><a href="https://github.com/waynecz/vue-component-boilerplate" rel="nofollow noreferrer" target="_blank">vue-component-boilerplate</a> &#x5C31;&#x662F;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x81F4;&#x529B;&#x4E8E;&#x8BA9;&#x5E7F;&#x5927;&#x4EBA;&#x6C11;&#x7FA4;&#x4F17;<strong>&#x7B80;&#x5355;&#x70B9;&#xFF0C;&#x5199;&#x7EC4;&#x4EF6;&#x9879;&#x76EE;&#x66F4;&#x7B80;&#x5355;</strong> &#x7684;&#x70B9;&#x7684;&#x4ED3;&#x5E93;&#xFF0C;&#x5185;&#x542B;:</p><ul><li>&#x7EC4;&#x4EF6;&#x3001;&#x6587;&#x6863;&#x3001;demo &#x5168;&#x65B9;&#x4F4D;&#x4E00;&#x4F53;&#xFF0C;&#x5F00;&#x7BB1;&#x5373;&#x7528;</li><li>&#x4F18;&#x7F8E;&#x7684; <code>Readme</code> &#xFF0C;&#x7ED3;&#x6784;&#x6E05;&#x6670;&#x5B9E;&#x7528;&#xFF01;&#x5185;&#x8054;<strong>&#x6298;&#x53E0;&#x683C;&#x5F0F;</strong>&#x7684; API &#x6587;&#x6863;</li><li>Vue &#x7EC4;&#x4EF6;&#x652F;&#x6301;&#x591A;&#x79CD;&#x6253;&#x5305;&#x65B9;&#x5F0F;&#xFF0C;&#x91C7;&#x7528; <a href="https://github.com/egoist/bili" rel="nofollow noreferrer" target="_blank">Bili</a> &#x6784;&#x5EFA;&#xFF0C;&#x57FA;&#x4E8E; rollup&#xFF0C;&#x8F93;&#x51FA; <code>es/cjs/umd</code>&#x4E09;&#x79CD;&#x683C;&#x5F0F;</li><li>Demo &#x91C7;&#x7528; <a href="https://github.com/egoist/poi" rel="nofollow noreferrer" target="_blank">poi</a> &#x6253;&#x5305;</li></ul><h4>&#x4E0A;&#x4E2A;&#x56FE;</h4><p><span class="img-wrap"><img data-src="/img/bVbc7gT?w=1018&amp;h=599" src="https://static.alili.tech/img/bVbc7gT?w=1018&amp;h=599" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">3.&#x4F7F;&#x7528;&#x65B9;&#x6CD5;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x514B;&#x9686;&#x9879;&#x76EE;
git clone https://github.com/waynecz/vue-component-boilerplate.git example-name

cd example-name

# &#x5220;&#x9664;&#x539F;&#x6765;&#x7684; git &#x4FE1;&#x606F;
rm -rf .git
# git &#x5230;&#x4F60;&#x81EA;&#x5DF1;&#x7684;&#x4ED3;&#x5E93;
git init &amp;&amp; git remote add origin {your repo address}
# &#x5B89;&#x88C5;&#x4F9D;&#x8D56;
yarn" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># &#x514B;&#x9686;&#x9879;&#x76EE;</span>
git <span class="hljs-built_in">clone</span> https://github.com/waynecz/vue-component-boilerplate.git example-name

<span class="hljs-built_in">cd</span> example-name

<span class="hljs-comment"># &#x5220;&#x9664;&#x539F;&#x6765;&#x7684; git &#x4FE1;&#x606F;</span>
rm -rf .git
<span class="hljs-comment"># git &#x5230;&#x4F60;&#x81EA;&#x5DF1;&#x7684;&#x4ED3;&#x5E93;</span>
git init &amp;&amp; git remote add origin {your repo address}
<span class="hljs-comment"># &#x5B89;&#x88C5;&#x4F9D;&#x8D56;</span>
yarn</code></pre><ol><li>&#x5C06; <code>package.json</code> &#x5185;&#x7684;&#x4E00;&#x4E9B;&#x5FC5;&#x8981;&#x4FE1;&#x606F;&#x66FF;&#x6362;&#x6210;&#x4F60;&#x81EA;&#x5DF1;&#x7684;</li><li><p>&#x5F00;&#x59CB;&#x5199;&#x7EC4;&#x4EF6;&#x5427;&#xFF01;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x5F00;&#x53D1;
npm run dev

# &#x7EC4;&#x4EF6;&#x6253;&#x5305;
npm run build

# &#x6253;&#x5305; demo
npm run build:demo" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># &#x5F00;&#x53D1;</span>
npm run dev

<span class="hljs-comment"># &#x7EC4;&#x4EF6;&#x6253;&#x5305;</span>
npm run build

<span class="hljs-comment"># &#x6253;&#x5305; demo</span>
npm run build:demo</code></pre></li></ol><h2 id="articleHeader3">4.&#x53D1;&#x5E03;&#x7EC4;&#x4EF6;</h2><p>&#x4F60;&#x90FD;&#x5F00;&#x53D1;&#x5B8C;&#x540E;&#xFF0C;&#x9700;&#x8981;&#x53D1;&#x5E03;&#x7EC4;&#x4EF6;&#x4E86;&#xFF0C;&#x8FD9;&#x91CC;&#x8D34;&#x4E2A;&#x7B80;&#x5355;&#x7684; <a href="https://segmentfault.com/a/1190000010224751">npm &#x53D1;&#x5E03;&#x6559;&#x7A0B;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如果你也想写个 Vue 组件却又苦于没有好的项目模板

## 原文链接
[https://segmentfault.com/a/1190000015480342](https://segmentfault.com/a/1190000015480342)

