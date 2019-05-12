---
title: '使用Next.js构建React服务端渲染应用' 
date: 2018-11-24 2:30:09
hidden: true
slug: yoihutf1uwg
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">next.js&#x7B80;&#x4ECB;</h3><p>&#x6700;&#x8FD1;&#x5728;&#x5B66;React.js&#xFF0C;React&#x5B98;&#x65B9;&#x63A8;&#x8350;&#x4F7F;&#x7528;next.js&#x6846;&#x67B6;&#x4F5C;&#x4E3A;&#x6784;&#x5EFA;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x7F51;&#x7AD9;&#xFF0C;&#x6240;&#x4EE5;&#x4ECA;&#x5929;&#x6765;&#x7814;&#x7A76;&#x4E00;&#x4E0B;next.js&#x7684;&#x4F7F;&#x7528;&#x3002;</p><p>next.js&#x4F5C;&#x4E3A;&#x4E00;&#x6B3E;&#x8F7B;&#x91CF;&#x7EA7;&#x7684;&#x5E94;&#x7528;&#x6846;&#x67B6;&#xFF0C;&#x4E3B;&#x8981;&#x7528;&#x4E8E;&#x6784;&#x5EFA;&#x9759;&#x6001;&#x7F51;&#x7AD9;&#x548C;&#x540E;&#x7AEF;&#x6E32;&#x67D3;&#x7F51;&#x7AD9;&#x3002;</p><h4>&#x6846;&#x67B6;&#x7279;&#x70B9;</h4><ul><li>&#x4F7F;&#x7528;&#x540E;&#x7AEF;&#x6E32;&#x67D3;</li><li>&#x81EA;&#x52A8;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x5206;&#x5272;&#xFF08;code splitting&#xFF09;&#xFF0C;&#x4EE5;&#x83B7;&#x5F97;&#x66F4;&#x5FEB;&#x7684;&#x7F51;&#x9875;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;</li><li>&#x7B80;&#x6D01;&#x7684;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x5B9E;&#x73B0;</li><li>&#x4F7F;&#x7528;webpack&#x8FDB;&#x884C;&#x6784;&#x5EFA;&#xFF0C;&#x652F;&#x6301;&#x6A21;&#x5757;&#x70ED;&#x66F4;&#x65B0;&#xFF08;Hot Module Replacement&#xFF09;</li><li>&#x53EF;&#x4E0E;&#x4E3B;&#x6D41;Node&#x670D;&#x52A1;&#x5668;&#x8FDB;&#x884C;&#x5BF9;&#x63A5;&#xFF08;&#x5982;express&#xFF09;</li><li>&#x53EF;&#x81EA;&#x5B9A;&#x4E49;babel&#x548C;webpack&#x7684;&#x914D;&#x7F6E;</li></ul><h3 id="articleHeader1">&#x4F7F;&#x7528;&#x65B9;&#x6CD5;</h3><h4>&#x521B;&#x5EFA;&#x9879;&#x76EE;&#x5E76;&#x521D;&#x59CB;&#x5316;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir server-rendered-website
cd server-rendered-website
npm init -y" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-keyword">mkdir</span> server-rendered-website
<span class="hljs-keyword">cd</span> server-rendered-website
npm init -<span class="hljs-built_in">y</span></code></pre><h4>&#x5B89;&#x88C5;next.js</h4><p>&#x4F7F;&#x7528;npm&#x6216;&#x8005;yarn&#x5B89;&#x88C5;&#xFF0C;&#x56E0;&#x4E3A;&#x662F;&#x521B;&#x5EFA;React&#x5E94;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x540C;&#x65F6;&#x5B89;&#x88C5;react&#x548C;react-dom</p><h6>npm&#xFF1A;</h6><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save react react-dom next" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs q"><code style="word-break:break-word;white-space:initial">npm install --<span class="hljs-built_in">save</span> react react-dom <span class="hljs-built_in">next</span></code></pre><h6>yarn&#xFF1A;</h6><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add react react-dom next" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code style="word-break:break-word;white-space:initial">yarn <span class="hljs-keyword">add</span><span class="bash"> react react-dom next</span></code></pre><p>&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x6DFB;&#x52A0;&#x6587;&#x4EF6;&#x5939;<strong>pages</strong>&#xFF08;&#x4E00;&#x5B9A;&#x8981;&#x547D;&#x540D;&#x4E3A;pages&#xFF0C;&#x8FD9;&#x662F;next&#x7684;&#x5F3A;&#x5236;&#x7EA6;&#x5B9A;&#xFF0C;&#x4E0D;&#x7136;&#x4F1A;&#x5BFC;&#x81F4;&#x627E;&#x4E0D;&#x5230;&#x9875;&#x9762;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x5728;package.json&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x6DFB;&#x52A0;script&#x7528;&#x4E8E;&#x542F;&#x52A8;&#x9879;&#x76EE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;next&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;next&quot;</span>
}</code></pre><p>&#x5982;&#x4E0B;&#x56FE;<span class="img-wrap"><img data-src="/img/remote/1460000015578806?w=1250&amp;h=718" src="https://static.alili.tech/img/remote/1460000015578806?w=1250&amp;h=718" alt="image" title="image" style="cursor:pointer"></span></p><h4>&#x521B;&#x5EFA;&#x89C6;&#x56FE;</h4><p>&#x5728;pages&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x521B;&#x5EFA;index.js&#x6587;&#x4EF6;&#xFF0C;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Index = () =&gt; (
  &lt;div&gt;
    &lt;p&gt;Hello next.js&lt;/p&gt;
  &lt;/div&gt;
)

export default Index" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Index = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello next.js<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Index</code></pre><h4>&#x8FD0;&#x884C;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run next" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-built_in">run</span> <span class="hljs-keyword">next</span></code></pre><p>&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x6253;&#x5F00;<a href="http://localhost:3000/" rel="nofollow noreferrer" target="_blank">http://localhost:3000/</a>&#xFF0C;&#x7F51;&#x9875;&#x663E;&#x793A;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015578807?w=754&amp;h=412" src="https://static.alili.tech/img/remote/1460000015578807?w=754&amp;h=412" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x6837;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684;next&#x7F51;&#x7AD9;&#x3002;</p><h3 id="articleHeader2">&#x524D;&#x7AEF;&#x8DEF;&#x7531;</h3><p>next.js&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x589E;&#x52A0;&#x4E00;&#x4E2A;page&#xFF0C;&#x53EB;about&#xFF0C;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const About = () =&gt; (
    &lt;div&gt;
        &lt;p&gt;This is About page&lt;/p&gt;
    &lt;/div&gt;
)

export default About;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> About = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This is About page<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> About;</code></pre><p>&#x5F53;&#x6211;&#x4EEC;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x8BF7;&#x6C42;<a href="https://localhost:3000/about" rel="nofollow noreferrer" target="_blank">https://localhost:3000/about</a>&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x9875;&#x9762;&#x5C55;&#x793A;&#x5BF9;&#x5E94;&#x5185;&#x5BB9;&#x3002;&#xFF08;==&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x6CE8;&#x610F;&#xFF1A;&#x8BF7;&#x6C42;url&#x7684;path&#x5FC5;&#x987B;&#x548C;page&#x7684;&#x6587;&#x4EF6;&#x540D;&#x5927;&#x5C0F;&#x5199;&#x4E00;&#x81F4;&#x624D;&#x80FD;&#x8BBF;&#x95EE;&#xFF0C;&#x5982;&#x679C;&#x8BBF;&#x95EE;localhost:3000/About&#x7684;&#x8BDD;&#x662F;&#x627E;&#x4E0D;&#x5230;about&#x9875;&#x9762;&#x7684;&#x3002;==&#xFF09;</p><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4F20;&#x7EDF;&#x7684;a&#x6807;&#x7B7E;&#x5728;&#x9875;&#x9762;&#x4E4B;&#x95F4;&#x8FDB;&#x884C;&#x8DF3;&#x8F6C;&#xFF0C;&#x4F46;&#x6BCF;&#x8DF3;&#x8F6C;&#x4E00;&#x6B21;&#xFF0C;&#x90FD;&#x9700;&#x8981;&#x53BB;&#x670D;&#x52A1;&#x7AEF;&#x8BF7;&#x6C42;&#x4E00;&#x6B21;&#x3002;&#x4E3A;&#x4E86;&#x589E;&#x52A0;&#x9875;&#x9762;&#x7684;&#x8BBF;&#x95EE;&#x901F;&#x5EA6;&#xFF0C;&#x63A8;&#x8350;&#x4F7F;&#x7528;next.js&#x7684;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x673A;&#x5236;&#x8FDB;&#x884C;&#x8DF3;&#x8F6C;&#x3002;</p><p>next.js&#x4F7F;&#x7528;next/link&#x5B9E;&#x73B0;&#x9875;&#x9762;&#x4E4B;&#x95F4;&#x7684;&#x8DF3;&#x8F6C;&#xFF0C;&#x7528;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Link from &apos;next/link&apos;

const Index = () =&gt; (
  &lt;div&gt;
    &lt;Link href=&quot;/about&quot;&gt;
      &lt;a&gt;About Page&lt;/a&gt;
    &lt;/Link&gt;
    &lt;p&gt;Hello next.js&lt;/p&gt;
  &lt;/div&gt;
)

export default Index" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;next/link&apos;</span>

<span class="hljs-keyword">const</span> Index = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/about&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>About Page<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello next.js<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Index</code></pre><p>&#x8FD9;&#x6837;&#x70B9;&#x51FB;index&#x9875;&#x9762;&#x7684;AboutPage&#x94FE;&#x63A5;&#x5C31;&#x80FD;&#x8DF3;&#x8F6C;&#x5230;about&#x9875;&#x9762;&#xFF0C;&#x800C;&#x70B9;&#x51FB;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x8FD4;&#x56DE;&#x6309;&#x94AE;&#x4E5F;&#x662F;&#x901A;&#x8FC7;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x8FDB;&#x884C;&#x8DF3;&#x8F6C;&#x7684;&#x3002; <strong>&#x5B98;&#x65B9;&#x6587;&#x6863;&#x8BF4;&#x7528;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x662F;&#x4E0D;&#x4F1A;&#x6709;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x7684;&#xFF0C;&#x5B9E;&#x9645;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x5BF9;about.js&#x6587;&#x4EF6;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;&#x8BF7;&#x6C42;&#x6765;&#x81EA;&#x4E8E;&#x9875;&#x9762;&#x5185;&#x52A8;&#x6001;&#x63D2;&#x5165;&#x7684;script&#x6807;&#x7B7E;&#x3002;&#x4F46;&#x662F;about.js&#x53EA;&#x4F1A;&#x8BF7;&#x6C42;&#x4E00;&#x6B21;&#xFF0C;&#x4E4B;&#x540E;&#x518D;&#x8BBF;&#x95EE;&#x662F;&#x4E0D;&#x4F1A;&#x8BF7;&#x6C42;&#x7684;&#xFF0C;&#x6BD5;&#x7ADF;&#x76F8;&#x540C;&#x7684;script&#x6807;&#x7B7E;&#x662F;&#x4E0D;&#x4F1A;&#x91CD;&#x590D;&#x63D2;&#x5165;&#x7684;&#x3002;</strong> &#x4F46;&#x662F;&#x60F3;&#x6BD4;&#x4E8E;&#x540E;&#x7AEF;&#x8DEF;&#x7531;&#x8FD8;&#x662F;&#x5927;&#x5927;&#x8282;&#x7701;&#x4E86;&#x8BF7;&#x6C42;&#x6B21;&#x6570;&#x548C;&#x7F51;&#x7EDC;&#x6D41;&#x91CF;&#x3002;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x548C;&#x540E;&#x7AEF;&#x8DEF;&#x7531;&#x7684;&#x8BF7;&#x6C42;&#x5BF9;&#x6BD4;&#x5982;&#x4E0B;&#xFF1A;</p><h6>&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#xFF1A;</h6><p><span class="img-wrap"><img data-src="/img/remote/1460000015578808?w=1336&amp;h=886" src="https://static.alili.tech/img/remote/1460000015578808?w=1336&amp;h=886" alt="image" title="image" style="cursor:pointer"></span></p><h6>&#x540E;&#x7AEF;&#x8DEF;&#x7531;&#xFF1A;</h6><p><span class="img-wrap"><img data-src="/img/remote/1460000015578809?w=1336&amp;h=1048" src="https://static.alili.tech/img/remote/1460000015578809?w=1336&amp;h=1048" alt="image" title="image" style="cursor:pointer"></span></p><p><strong>Link&#x6807;&#x7B7E;&#x652F;&#x6301;&#x4EFB;&#x610F;react&#x7EC4;&#x4EF6;&#x4F5C;&#x4E3A;&#x5176;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x4E0D;&#x4E00;&#x5B9A;&#x8981;&#x7528;a&#x6807;&#x7B7E;&#xFF0C;&#x53EA;&#x8981;&#x8BE5;&#x5B50;&#x5143;&#x7D20;&#x80FD;&#x54CD;&#x5E94;onClick&#x4E8B;&#x4EF6;</strong>&#xFF0C;&#x5C31;&#x50CF;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Link href=&quot;/about&quot;&gt;
    &lt;div&gt;Go about page&lt;/div&gt;
&lt;/Link&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/about&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Go about page<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></code></pre><p><strong>Link&#x6807;&#x7B7E;&#x4E0D;&#x652F;&#x6301;&#x6DFB;&#x52A0;style&#x548C;className&#x7B49;&#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x7ED9;&#x94FE;&#x63A5;&#x589E;&#x52A0;&#x6837;&#x5F0F;&#xFF0C;&#x9700;&#x8981;&#x5728;&#x5B50;&#x5143;&#x7D20;&#x4E0A;&#x6DFB;&#x52A0;</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Link href=&quot;/about&quot;&gt;
    &lt;a className=&quot;about-link&quot; style="{{"color:&apos;#ff0000&apos;"}}"&gt;Go about page&lt;/a&gt;
&lt;/Link&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/about&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;about-link&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"color:</span>&apos;#<span class="hljs-attr">ff0000</span>&apos;"}}"&gt;</span>Go about page<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></code></pre><h3 id="articleHeader3">Layout</h3><p>&#x6240;&#x8C13;&#x7684;layout&#x5C31;&#x662F;&#x5C31;&#x662F;&#x7ED9;&#x4E0D;&#x540C;&#x7684;&#x9875;&#x9762;&#x6DFB;&#x52A0;&#x76F8;&#x540C;&#x7684;header&#xFF0C;footer&#xFF0C;navbar&#x7B49;&#x901A;&#x7528;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x540C;&#x65F6;&#x53C8;&#x4E0D;&#x9700;&#x8981;&#x5199;&#x91CD;&#x590D;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x5728;next.js&#x4E2D;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5171;&#x4EAB;&#x67D0;&#x4E9B;&#x7EC4;&#x4EF6;&#x5B9E;&#x73B0;layout&#x3002;</p><p>&#x6211;&#x4EEC;&#x5148;&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x516C;&#x5171;&#x7684;header&#x7EC4;&#x4EF6;&#xFF0C;&#x653E;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x7684;components&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x9762;&#xFF08;&#x9875;&#x9762;&#x7EA7;&#x7684;&#x7EC4;&#x4EF6;&#x653E;pages&#x4E2D;&#xFF0C;&#x516C;&#x5171;&#x7EC4;&#x4EF6;&#x653E;components&#x4E2D;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Link from &apos;next/link&apos;;

const linkStyle = {
    marginRight: 15
}

const Header = () =&gt; (
    &lt;div&gt;
        &lt;Link href=&quot;/&quot;&gt;
            &lt;a style={linkStyle}&gt;Home&lt;/a&gt;
        &lt;/Link&gt;
        &lt;Link href=&quot;/about&quot;&gt;
            &lt;a style={linkStyle}&gt;About&lt;/a&gt;
        &lt;/Link&gt;
    &lt;/div&gt;
)

export default Header;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;next/link&apos;</span>;

<span class="hljs-keyword">const</span> linkStyle = {
    <span class="hljs-attr">marginRight</span>: <span class="hljs-number">15</span>
}

<span class="hljs-keyword">const</span> Header = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{linkStyle}</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/about&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{linkStyle}</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Header;</code></pre><p>&#x7136;&#x540E;&#x5728;index&#x548C;about&#x9875;&#x9762;&#x4E2D;&#x5F15;&#x5165;header&#x7EC4;&#x4EF6;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;&#x516C;&#x5171;&#x7684;layout&#x7684;header&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Header from &apos;../components/Header&apos;;

const Index = () =&gt; (
    &lt;div&gt;
        &lt;Header /&gt;
        &lt;p&gt;Hello next.js&lt;/p&gt;
    &lt;/div&gt;
)

export default Index;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../components/Header&apos;</span>;

<span class="hljs-keyword">const</span> Index = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello next.js<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Index;
</code></pre><p>&#x5982;&#x679C;&#x8981;&#x589E;&#x52A0;footer&#x4E5F;&#x53EF;&#x4EE5;&#x6309;&#x7167;header&#x7684;&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x3002;<br>&#x9664;&#x4E86;&#x5F15;&#x5165;&#x591A;&#x4E2A;header&#x3001;footer&#x7EC4;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x6574;&#x4F53;&#x7684;Layout&#x7EC4;&#x4EF6;&#xFF0C;&#x907F;&#x514D;&#x5F15;&#x5165;&#x591A;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x9EBB;&#x70E6;&#xFF0C;&#x540C;&#x6837;&#x5728;components&#x4E2D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;Layout.js&#x6587;&#x4EF6;&#xFF0C;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Header from &apos;./Header&apos;;

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: &apos;1px solid #DDD&apos;
}

const Layout = (props) =&gt; (
    &lt;div style={layoutStyle}&gt;
        &lt;Header /&gt;
        {props.children}
    &lt;/div&gt;
)

export default Layout" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./Header&apos;</span>;

<span class="hljs-keyword">const</span> layoutStyle = {
    <span class="hljs-attr">margin</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">padding</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">border</span>: <span class="hljs-string">&apos;1px solid #DDD&apos;</span>
}

<span class="hljs-keyword">const</span> Layout = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{layoutStyle}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
        {props.children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Layout</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x5728;&#x9875;&#x9762;&#x4E2D;&#x5F15;&#x5165;Layout&#x7EC4;&#x4EF6;&#x5C31;&#x53EF;&#x4EE5;&#x8FBE;&#x5230;&#x5E03;&#x5C40;&#x7684;&#x76EE;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Layout from &apos;../components/Layout&apos;;

const Index = () =&gt; (
    &lt;Layout&gt;
        &lt;p&gt;Hello next.js&lt;/p&gt;
    &lt;/Layout&gt;
)

export default Index;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../components/Layout&apos;</span>;

<span class="hljs-keyword">const</span> Index = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello next.js<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Index;</code></pre><h3 id="articleHeader4">&#x9875;&#x9762;&#x95F4;&#x4F20;&#x503C;</h3><h4>&#x901A;&#x8FC7;url&#x53C2;&#x6570;&#xFF08;query string&#xFF09;</h4><p>next&#x4E2D;&#x7684;&#x9875;&#x9762;&#x95F4;&#x4F20;&#x503C;&#x65B9;&#x5F0F;&#x548C;&#x4F20;&#x7EDF;&#x7F51;&#x9875;&#x4E00;&#x6837;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;url&#x53C2;&#x6570;&#x5B9E;&#x73B0;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x505A;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x535A;&#x5BA2;&#x5E94;&#x7528;&#xFF1A;</p><p>&#x9996;&#x5148;&#x5C06;index.js&#x7684;&#x5185;&#x5BB9;&#x66FF;&#x6362;&#x6210;&#x5982;&#x4E0B;&#x6765;&#x5C55;&#x793A;&#x535A;&#x5BA2;&#x5217;&#x8868;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Link from &apos;next/link&apos;;
import Layout from &apos;../components/Layout&apos;;

const PostLink = (props) =&gt; (
    &lt;li&gt;
        &lt;Link href={`/post?title=${props.title}`}&gt;
            &lt;a&gt;{props.title}&lt;/a&gt;
        &lt;/Link&gt;
    &lt;/li&gt;
);

export default () =&gt; (
    &lt;Layout&gt;
        &lt;h1&gt;My Blog&lt;/h1&gt;
        &lt;ul&gt;
            &lt;PostLink title=&quot;Hello next.js&quot; /&gt;
            &lt;PostLink title=&quot;next.js is awesome&quot; /&gt;
            &lt;PostLink title=&quot;Deploy apps with Zeit&quot; /&gt;
        &lt;/ul&gt;
    &lt;/Layout&gt;
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>import Link from &apos;next/link&apos;;
import Layout from &apos;../components/Layout&apos;;

const PostLink = (props) =&gt; (
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">post</span>?<span class="hljs-attr">title</span>=<span class="hljs-string">${props.title}</span>`}&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>{props.title}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
);

export default () =&gt; (
    <span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>My Blog<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">PostLink</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Hello next.js&quot;</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">PostLink</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;next.js is awesome&quot;</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">PostLink</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Deploy apps with Zeit&quot;</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span>
);</code></pre><p>&#x901A;&#x8FC7;&#x5728;Link&#x7684;href&#x4E2D;&#x6DFB;&#x52A0;<code>title</code>&#x53C2;&#x6570;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4F20;&#x503C;&#x3002;</p><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x518D;&#x6DFB;&#x52A0;&#x535A;&#x5BA2;&#x7684;&#x8BE6;&#x60C5;&#x9875;<code>post.js</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { withRouter } from &apos;next/router&apos;;
import Layout from &apos;../components/Layout&apos;;

const Post = withRouter((props) =&gt; (
    &lt;Layout&gt;
        &lt;h1&gt;{props.router.query.title}&lt;/h1&gt;
        &lt;p&gt;This is the blog post content.&lt;/p&gt;
    &lt;/Layout&gt;
));

export default Post;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { withRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;next/router&apos;</span>;
<span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../components/Layout&apos;</span>;

<span class="hljs-keyword">const</span> Post = withRouter(<span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{props.router.query.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This is the blog post content.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
));

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Post;
</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x901A;&#x8FC7;withRouter&#x5C06;next&#x7684;router&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;prop&#x6CE8;&#x5165;&#x5230;component&#x4E2D;&#xFF0C;&#x5B9E;&#x73B0;&#x5BF9;url&#x53C2;&#x6570;&#x7684;&#x8BBF;&#x95EE;&#x3002;</p><p>&#x8FD0;&#x884C;&#x540E;&#x663E;&#x793A;&#x5982;&#x56FE;&#xFF1A;</p><h6>&#x5217;&#x8868;&#x9875;</h6><p><span class="img-wrap"><img data-src="/img/remote/1460000015578810?w=1558&amp;h=620" src="https://static.alili.tech/img/remote/1460000015578810?w=1558&amp;h=620" alt="image" title="image" style="cursor:pointer"></span></p><h6>&#x70B9;&#x51FB;&#x8FDB;&#x5165;&#x8BE6;&#x60C5;&#x9875;&#xFF1A;</h6><p><span class="img-wrap"><img data-src="/img/remote/1460000015578811?w=1572&amp;h=604" src="https://static.alili.tech/img/remote/1460000015578811?w=1572&amp;h=604" alt="image" title="image" style="cursor:pointer"></span></p><p>&#x4F7F;&#x7528;query string&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x9875;&#x9762;&#x95F4;&#x7684;&#x4F20;&#x503C;&#xFF0C;&#x4F46;&#x662F;&#x4F1A;&#x5BFC;&#x81F4;&#x9875;&#x9762;&#x7684;url&#x4E0D;&#x592A;&#x7B80;&#x6D01;&#x7F8E;&#x89C2;&#xFF0C;&#x5C24;&#x5176;&#x5F53;&#x8981;&#x4F20;&#x8F93;&#x7684;&#x503C;&#x591A;&#x4E86;&#x4E4B;&#x540E;&#x3002;&#x6240;&#x4EE5;next.js&#x63D0;&#x4F9B;&#x4E86;Route Masking&#x8FD9;&#x4E2A;&#x7279;&#x6027;&#x7528;&#x4E8E;&#x8DEF;&#x7531;&#x7684;&#x7F8E;&#x5316;&#x3002;</p><h3 id="articleHeader5">&#x8DEF;&#x7531;&#x4F2A;&#x88C5;&#xFF08;Route Masking&#xFF09;</h3><p>&#x8FD9;&#x9879;&#x7279;&#x6027;&#x7684;&#x5B98;&#x65B9;&#x540D;&#x5B57;&#x53EB;Route Masking&#xFF0C;&#x6CA1;&#x6709;&#x627E;&#x5230;&#x5B98;&#x65B9;&#x7684;&#x4E2D;&#x6587;&#x540D;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x6839;&#x636E;&#x5B57;&#x9762;&#x610F;&#x601D;&#x6682;&#x4E14;&#x7FFB;&#x8BD1;&#x6210;&#x8DEF;&#x7531;&#x4F2A;&#x88C5;&#x3002;&#x6240;&#x8C13;&#x7684;&#x8DEF;&#x7531;&#x4F2A;&#x88C5;&#x5373;&#x8BA9;&#x6D4F;&#x89C8;&#x5668;&#x5730;&#x5740;&#x680F;&#x663E;&#x793A;&#x7684;url&#x548C;&#x9875;&#x9762;&#x5B9E;&#x9645;&#x8BBF;&#x95EE;&#x7684;url&#x4E0D;&#x4E00;&#x6837;&#x3002;&#x5B9E;&#x73B0;&#x8DEF;&#x7531;&#x4F2A;&#x88C5;&#x7684;&#x65B9;&#x6CD5;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x901A;&#x8FC7;<code>Link</code>&#x7EC4;&#x4EF6;&#x7684;<code>as</code>&#x5C5E;&#x6027;&#x544A;&#x8BC9;&#x6D4F;&#x89C8;&#x5668;href&#x5BF9;&#x5E94;&#x663E;&#x793A;&#x4E3A;&#x4EC0;&#x4E48;url&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;index.js&#x4EE3;&#x7801;&#x4FEE;&#x6539;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Link from &apos;next/link&apos;;
import Layout from &apos;../components/Layout&apos;;

const PostLink = (props) =&gt; (
    &lt;li&gt;
        &lt;Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}&gt;
            &lt;a&gt;{props.title}&lt;/a&gt;
        &lt;/Link&gt;
    &lt;/li&gt;
);

export default () =&gt; (
    &lt;Layout&gt;
        &lt;h1&gt;My Blog&lt;/h1&gt;
        &lt;ul&gt;
            &lt;PostLink id=&quot;hello-nextjs&quot; title=&quot;Hello next.js&quot; /&gt;
            &lt;PostLink id=&quot;learn-nextjs&quot; title=&quot;next.js is awesome&quot; /&gt;
            &lt;PostLink id=&quot;deploy-nextjs&quot; title=&quot;Deploy apps with Zeit&quot; /&gt;
        &lt;/ul&gt;
    &lt;/Layout&gt;
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>import Link from &apos;next/link&apos;;
import Layout from &apos;../components/Layout&apos;;

const PostLink = (props) =&gt; (
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">as</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">p</span>/${<span class="hljs-attr">props.id</span>}`} <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">post</span>?<span class="hljs-attr">title</span>=<span class="hljs-string">${props.title}</span>`}&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>{props.title}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
);

export default () =&gt; (
    <span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>My Blog<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">PostLink</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;hello-nextjs&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Hello next.js&quot;</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">PostLink</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;learn-nextjs&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;next.js is awesome&quot;</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">PostLink</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;deploy-nextjs&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Deploy apps with Zeit&quot;</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span>
);</code></pre><p>&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015578812?w=1438&amp;h=466" src="https://static.alili.tech/img/remote/1460000015578812?w=1438&amp;h=466" alt="image" title="image" style="cursor:pointer"></span></p><p>&#x6D4F;&#x89C8;&#x5668;&#x7684;url&#x5DF2;&#x7ECF;&#x88AB;&#x5982;&#x671F;&#x4FEE;&#x6539;&#x4E86;&#xFF0C;&#x8FD9;&#x6837;&#x770B;&#x8D77;&#x6765;&#x8212;&#x670D;&#x591A;&#x4E86;&#x3002;&#x800C;&#x4E14;&#x8DEF;&#x7531;&#x4F2A;&#x88C5;&#x5BF9;history&#x4E5F;&#x5F88;&#x53CB;&#x597D;&#xFF0C;&#x70B9;&#x51FB;&#x8FD4;&#x56DE;&#x518D;&#x524D;&#x8FDB;&#x8FD8;&#x662F;&#x80FD;&#x591F;&#x6B63;&#x5E38;&#x6253;&#x5F00;&#x8BE6;&#x60C5;&#x9875;&#x9762;&#x3002;&#x4F46;&#x662F;&#x5982;&#x679C;&#x4F60;&#x5237;&#x65B0;&#x8BE6;&#x60C5;&#x9875;&#xFF0C;&#x786E;&#x62A5;404&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x5982;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015578813?w=1716&amp;h=544" src="https://static.alili.tech/img/remote/1460000015578813?w=1716&amp;h=544" alt="image" title="image" style="cursor:pointer"></span></p><p>&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x5237;&#x65B0;&#x9875;&#x9762;&#x4F1A;&#x76F4;&#x63A5;&#x5411;&#x670D;&#x52A1;&#x5668;&#x8BF7;&#x6C42;&#x8FD9;&#x4E2A;url&#xFF0C;&#x800C;&#x670D;&#x52A1;&#x7AEF;&#x5E76;&#x6CA1;&#x6709;&#x8BE5;url&#x5BF9;&#x5E94;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x6240;&#x4EE5;&#x62A5;&#x9519;&#x3002;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x9700;&#x8981;&#x7528;&#x5230;next.js&#x63D0;&#x4F9B;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x670D;&#x52A1;&#x63A5;&#x53E3;&#xFF08;custom server API&#xFF09;&#x3002;</p><h3 id="articleHeader6">&#x81EA;&#x5B9A;&#x4E49;&#x670D;&#x52A1;&#x63A5;&#x53E3;</h3><p>&#x81EA;&#x5B9A;&#x4E49;&#x670D;&#x52A1;&#x63A5;&#x53E3;&#x524D;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x5B89;&#x88C5;Express:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save express" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code style="word-break:break-word;white-space:initial">npm install --<span class="hljs-built_in">save</span> <span class="hljs-built_in">express</span></code></pre><p>&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x521B;&#x5EFA;server.js &#x6587;&#x4EF6;&#xFF0C;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require(&apos;express&apos;);
const next = require(&apos;next&apos;);

const dev = process.env.NODE_ENV !== &apos;production&apos;;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() =&gt; {
        const server = express();
        server.get(&apos;*&apos;, (req, res) =&gt; {
            return handle(req, res);
        });
        server.listen(3000, (err) =&gt; {
            if (err) throw err;
            console.log(&apos;&gt; Ready on http://localhost:3000&apos;);
        });
    })
    .catch((ex) =&gt; {
        console.error(ex.stack);
        process.exit(1);
    });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>const express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
const next = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;next&apos;</span>);

const dev = process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span>;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        const server = express();
        server.get(<span class="hljs-string">&apos;*&apos;</span>, <span class="hljs-function"><span class="hljs-params">(req, res)</span> =&gt;</span> {
            <span class="hljs-keyword">return</span> handle(req, res);
        });
        server.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-params">(err)</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&gt; Ready on http://localhost:3000&apos;</span>);
        });
    })
    .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(ex)</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.error(ex.stack);
        process.exit(<span class="hljs-number">1</span>);
    });</code></pre><p>&#x7136;&#x540E;&#x5C06;package.json&#x91CC;&#x9762;&#x7684;dev script&#x6539;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node server.js&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;node server.js&quot;</span>
}</code></pre><p>&#x8FD0;&#x884C;<code>npm run dev</code>&#x540E;&#x9879;&#x76EE;&#x548C;&#x4E4B;&#x524D;&#x4E00;&#x6837;&#x53EF;&#x4EE5;&#x8FD0;&#x884C;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x8DEF;&#x7531;&#x5C06;&#x88AB;&#x4F2A;&#x88C5;&#x8FC7;&#x7684;url&#x548C;&#x771F;&#x5B9E;&#x7684;url&#x5339;&#x914D;&#x8D77;&#x6765;&#xFF0C;&#x5728;server.js&#x4E2D;&#x6DFB;&#x52A0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="......
const server = express();
server.get(&apos;/p/:id&apos;, (req, res) =&gt; {
    const actualPage = &apos;/post&apos;;
    const queryParams = { title: req.params.id };
    app.render(req, res, actualPage, queryParams);
});
......" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs asciidoc"><code><span class="hljs-code">......
const server = express();
server.get(&apos;/p/:id&apos;, (req, res) =&gt; {
    const actualPage = &apos;/post&apos;;
    const queryParams = { title: req.params.id };
    app.render(req, res, actualPage, queryParams);
});
......</span></code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x628A;&#x88AB;&#x4F2A;&#x88C5;&#x8FC7;&#x7684;url&#x548C;&#x771F;&#x5B9E;&#x7684;url&#x6620;&#x5C04;&#x8D77;&#x6765;&#xFF0C;&#x5E76;&#x4E14;query&#x53C2;&#x6570;&#x4E5F;&#x8FDB;&#x884C;&#x4E86;&#x6620;&#x5C04;&#x3002;&#x91CD;&#x542F;&#x9879;&#x76EE;&#x4E4B;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5237;&#x65B0;&#x8BE6;&#x60C5;&#x9875;&#x800C;&#x4E0D;&#x4F1A;&#x62A5;&#x9519;&#x4E86;&#x3002;&#x4F46;&#x662F;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x95EE;&#x9898;&#xFF0C;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x6253;&#x5F00;&#x7684;&#x9875;&#x9762;&#x548C;&#x540E;&#x7AEF;&#x8DEF;&#x7531;&#x6253;&#x5F00;&#x7684;&#x9875;&#x9762;title&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x540E;&#x7AEF;&#x8DEF;&#x7531;&#x4F20;&#x8FC7;&#x53BB;&#x7684;&#x662F;id&#xFF0C;&#x800C;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x9875;&#x9762;&#x663E;&#x793A;&#x7684;&#x662F;title&#x3002;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x4E2D;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x4E2D;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x4F1A;&#x901A;&#x8FC7;id&#x83B7;&#x53D6;&#x5230;title&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5C55;&#x793A;&#x3002;&#x4F5C;&#x4E3A;Demo&#x6211;&#x4EEC;&#x5077;&#x4E2A;&#x5C0F;&#x61D2;&#xFF0C;&#x76F4;&#x63A5;&#x5C06;id&#x4F5C;&#x4E3A;&#x540E;&#x7AEF;&#x8DEF;&#x7531;&#x9875;&#x9762;&#x7684;title&#x3002;</p><p>&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x7684;&#x5C55;&#x793A;&#x6570;&#x636E;&#x90FD;&#x662F;&#x9759;&#x6001;&#x7684;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4ECE;&#x8FDC;&#x7A0B;&#x670D;&#x52A1;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x5E76;&#x5C55;&#x793A;&#x3002;</p><h3 id="articleHeader7">&#x8FDC;&#x7A0B;&#x6570;&#x636E;&#x83B7;&#x53D6;</h3><p>next.js&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x6807;&#x51C6;&#x7684;&#x83B7;&#x53D6;&#x8FDC;&#x7A0B;&#x6570;&#x636E;&#x7684;&#x63A5;&#x53E3;:<code>getInitialProps</code>&#xFF0C;&#x901A;&#x8FC7;<code>getInitialProps</code>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x5230;&#x8FDC;&#x7A0B;&#x6570;&#x636E;&#x5E76;&#x8D4B;&#x503C;&#x7ED9;&#x9875;&#x9762;&#x7684;props&#x3002;<code>getInitialProps</code>&#x5373;&#x53EF;&#x4EE5;&#x7528;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;&#x5728;&#x524D;&#x7AEF;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5199;&#x4E2A;&#x5C0F;Demo&#x5C55;&#x793A;&#x5B83;&#x7684;&#x7528;&#x6CD5;&#x3002;&#x6211;&#x4EEC;&#x6253;&#x7B97;&#x4ECE;<a href="http://www.tvmaze.com/api" rel="nofollow noreferrer" target="_blank">TVMaze API </a>&#x83B7;&#x53D6;&#x5230;&#x4E00;&#x4E9B;&#x7535;&#x89C6;&#x8282;&#x76EE;&#x7684;&#x4FE1;&#x606F;&#x5E76;&#x5C55;&#x793A;&#x5230;&#x6211;&#x7684;&#x7F51;&#x7AD9;&#x4E0A;&#x3002;&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x5B89;&#x88C5;<a href="https://github.com/developit/unfetch" rel="nofollow noreferrer" target="_blank">isomorphic-unfetch</a>&#xFF0C;&#x5B83;&#x662F;&#x57FA;&#x4E8E;fetch&#x5B9E;&#x73B0;&#x7684;&#x4E00;&#x4E2A;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save isomorphic-unfetch" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save isomorphic-unfetch</span></code></pre><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x4FEE;&#x6539;index.js&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Link from &apos;next/link&apos;;
import Layout from &apos;../components/Layout&apos;;
import fetch from &apos;isomorphic-unfetch&apos;;

const Index = (props) =&gt; (
    &lt;Layout&gt;
        &lt;h1&gt;Marvel TV Shows&lt;/h1&gt;
        &lt;ul&gt;
            {props.shows.map(({ show }) =&gt; {
                return (
                    &lt;li key={show.id}&gt;
                        &lt;Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}&gt;
                            &lt;a&gt;{show.name}&lt;/a&gt;
                        &lt;/Link&gt;
                    &lt;/li&gt;
                );
            })}
        &lt;/ul&gt;
    &lt;/Layout&gt;
);

Index.getInitialProps = async function () {
    const res = await fetch(&apos;https://api.tvmaze.com/search/shows?q=marvel&apos;);
    const data = await res.json();
    return {
        shows: data
    }
}

export default Index;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;next/link&apos;</span>;
<span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../components/Layout&apos;</span>;
<span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;isomorphic-unfetch&apos;</span>;

<span class="hljs-keyword">const</span> Index = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Marvel TV Shows<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            {props.shows.map(({ show }) =&gt; {
                return (
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{show.id}</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">as</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">p</span>/${<span class="hljs-attr">show.id</span>}`} <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">post</span>?<span class="hljs-attr">id</span>=<span class="hljs-string">${show.id}</span>`}&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>{show.name}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                );
            })}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
);

Index.getInitialProps = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">&apos;https://api.tvmaze.com/search/shows?q=marvel&apos;</span>);
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> res.json();
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">shows</span>: data
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Index;</code></pre><p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x7684;&#x903B;&#x8F91;&#x5E94;&#x8BE5;&#x5F88;&#x6E05;&#x6670;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x5728;<code>getInitialProps</code>&#x4E2D;&#x83B7;&#x53D6;&#x5230;&#x7535;&#x89C6;&#x8282;&#x76EE;&#x7684;&#x6570;&#x636E;&#x5E76;&#x8FD4;&#x56DE;&#xFF0C;&#x8FD9;&#x6837;&#x5728;Index&#x7684;props&#x5C31;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x5230;&#x8282;&#x76EE;&#x6570;&#x636E;&#xFF0C;&#x518D;&#x904D;&#x5386;&#x6E32;&#x67D3;&#x6210;&#x8282;&#x76EE;&#x5217;&#x8868;&#x3002;</p><p>&#x8FD0;&#x884C;&#x9879;&#x76EE;&#x4E4B;&#x540E;&#xFF0C;&#x9875;&#x9762;&#x5B8C;&#x7F8E;&#x5C55;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015578814?w=1708&amp;h=822" src="https://static.alili.tech/img/remote/1460000015578814?w=1708&amp;h=822" alt="image" title="image" style="cursor:pointer"></span></p><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x6765;&#x5B9E;&#x73B0;&#x8BE6;&#x60C5;&#x9875;&#xFF0C;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x628A;<code>/p/:id</code>&#x7684;&#x8DEF;&#x7531;&#x4FEE;&#x6539;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
server.get(&apos;/p/:id&apos;, (req, res) =&gt; {
    const actualPage = &apos;/post&apos;;
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
});
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>...
server.<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;/p/:id&apos;</span>, (req, res) =&gt; {
    <span class="hljs-keyword">const</span> actualPage = <span class="hljs-string">&apos;/post&apos;</span>;
    <span class="hljs-keyword">const</span> queryParams = { id: req.<span class="hljs-keyword">params</span>.id };
    app.render(req, res, actualPage, queryParams);
});
...</code></pre><p>&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x5C06;id&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x53BB;&#x83B7;&#x53D6;&#x7535;&#x89C6;&#x8282;&#x76EE;&#x7684;&#x8BE6;&#x7EC6;&#x5185;&#x5BB9;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x4FEE;&#x6539;post.js&#x7684;&#x5185;&#x5BB9;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import fetch from &apos;isomorphic-unfetch&apos;;
import Layout from &apos;../components/Layout&apos;;

const Post = (props) =&gt; (
    &lt;Layout&gt;
        &lt;h1&gt;{props.show.name}&lt;/h1&gt;
        &lt;p&gt;{props.show.summary.replace(/&lt;[/]?p&gt;/g, &apos;&apos;)}&lt;/p&gt;
        &lt;img src={props.show.image.medium} /&gt;
    &lt;/Layout&gt;
);

Post.getInitialProps = async function (context) {
    const { id } = context.query;
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await res.json();
    return { show };
}

export default Post;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;isomorphic-unfetch&apos;</span>;
<span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../components/Layout&apos;</span>;

const Post = <span class="hljs-function"><span class="hljs-params">(props)</span> =&gt;</span> (
    &lt;Layout&gt;
        &lt;h1&gt;{props.show.name}&lt;/h1&gt;
        &lt;p&gt;{props.show.summary.replace(<span class="hljs-regexp">/&lt;[/</span>]?p&gt;/g, <span class="hljs-string">&apos;&apos;</span>)}&lt;/p&gt;
        &lt;img src={props.show.image.medium} /&gt;
    &lt;/Layout&gt;
);

Post.getInitialProps = async function (context) {
    const { id } = context.query;
    const res = <span class="hljs-keyword">await</span> fetch(`<span class="javascript">https:<span class="hljs-comment">//api.tvmaze.com/shows/${id}</span></span>`);
    const show = <span class="hljs-keyword">await</span> res.json();
    <span class="hljs-keyword">return</span> { show };
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Post;
</code></pre><p>&#x91CD;&#x542F;&#x9879;&#x76EE;&#xFF08;&#x4FEE;&#x6539;&#x4E86;server.js&#x7684;&#x5185;&#x5BB9;&#x9700;&#x8981;&#x91CD;&#x542F;&#xFF09;&#xFF0C;&#x4ECE;&#x5217;&#x8868;&#x9875;&#x8FDB;&#x5165;&#x8BE6;&#x60C5;&#x9875;&#xFF0C;&#x5DF2;&#x7ECF;&#x6210;&#x529F;&#x7684;&#x83B7;&#x53D6;&#x5230;&#x7535;&#x89C6;&#x8282;&#x76EE;&#x7684;&#x8BE6;&#x60C5;&#x5E76;&#x5C55;&#x793A;&#x51FA;&#x6765;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015578815?w=1604&amp;h=1206" src="https://static.alili.tech/img/remote/1460000015578815?w=1604&amp;h=1206" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader8">&#x589E;&#x52A0;&#x6837;&#x5F0F;</h3><p>&#x5230;&#x76EE;&#x524D;&#x4E3A;&#x6B62;&#xFF0C;&#x54B1;&#x4EEC;&#x505A;&#x7684;&#x7F51;&#x9875;&#x90FD;&#x592A;&#x5E73;&#x6DE1;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x63A5;&#x4E0B;&#x6765;&#x54B1;&#x4EEC;&#x7ED9;&#x7F51;&#x7AD9;&#x589E;&#x52A0;&#x4E00;&#x4E9B;&#x6837;&#x5F0F;&#xFF0C;&#x8BA9;&#x5B83;&#x53D8;&#x5F97;&#x6F02;&#x4EAE;&#x3002;</p><p>&#x5BF9;&#x4E8E;React&#x5E94;&#x7528;&#xFF0C;&#x6709;&#x591A;&#x79CD;&#x65B9;&#x5F0F;&#x53EF;&#x4EE5;&#x589E;&#x52A0;&#x6837;&#x5F0F;&#x3002;&#x4E3B;&#x8981;&#x5206;&#x4E3A;&#x4E24;&#x79CD;&#xFF1A;</p><ol><li>&#x4F7F;&#x7528;&#x4F20;&#x7EDF;CSS&#x6587;&#x4EF6;&#xFF08;&#x5305;&#x62EC;SASS&#xFF0C;PostCSS&#x7B49;&#xFF09;</li><li>&#x5728;JS&#x6587;&#x4EF6;&#x4E2D;&#x63D2;&#x5165;CSS</li></ol><p>&#x4F7F;&#x7528;&#x4F20;&#x7EDF;CSS&#x6587;&#x4EF6;&#x5728;&#x5B9E;&#x9645;&#x4F7F;&#x7528;&#x4E2D;&#x4F1A;&#x7528;&#x5230;&#x633A;&#x591A;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6240;&#x4EE5;next.js&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x5F0F;&#x3002;next.js&#x5185;&#x90E8;&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;<a href="https://github.com/zeit/styled-jsx" rel="nofollow noreferrer" target="_blank">styled-jsx</a>&#x6846;&#x67B6;&#x5411;js&#x6587;&#x4EF6;&#x4E2D;&#x63D2;&#x5165;CSS&#x3002;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5F15;&#x5165;&#x7684;&#x6837;&#x5F0F;&#x5728;&#x4E0D;&#x540C;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x4E0D;&#x4F1A;&#x76F8;&#x4E92;&#x5F71;&#x54CD;&#xFF0C;&#x751A;&#x81F3;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x90FD;&#x4E0D;&#x4F1A;&#x76F8;&#x4E92;&#x5F71;&#x54CD;&#x3002;</p><h4>styled-jsx</h4><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;&#x5982;&#x4F55;&#x4F7F;&#x7528;styled-jsx&#x3002;&#x5C06;index.js&#x7684;&#x5185;&#x5BB9;&#x66FF;&#x6362;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Link from &apos;next/link&apos;;
import Layout from &apos;../components/Layout&apos;;
import fetch from &apos;isomorphic-unfetch&apos;;

const Index = (props) =&gt; (
    &lt;Layout&gt;
        &lt;h1&gt;Marvel TV Shows&lt;/h1&gt;
        &lt;ul&gt;
            {props.shows.map(({ show }) =&gt; {
                return (
                    &lt;li key={show.id}&gt;
                        &lt;Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}&gt;
                            &lt;a className=&quot;show-link&quot;&gt;{show.name}&lt;/a&gt;
                        &lt;/Link&gt;
                    &lt;/li&gt;
                );
            })}
        &lt;/ul&gt;
        &lt;style jsx&gt;
        {`
            *{
                margin:0;
                padding:0;
            }
            h1,a{
                font-family:&apos;Arial&apos;;
            }
            h1{
                margin-top:20px;
                background-color:#EF141F;
                color:#fff;
                font-size:50px;
                line-height:66px;
                text-transform: uppercase;
                text-align:center;
            }    
            ul{
                margin-top:20px;
                padding:20px;
                background-color:#000;
            }
            li{
                list-style:none;
                margin:5px 0;
            }
            a{
                text-decoration:none;
                color:#B4B5B4;
                font-size:24px;
            }
            a:hover{
                opacity:0.6;
            }
        `}
        &lt;/style&gt;
    &lt;/Layout&gt;
);

Index.getInitialProps = async function () {
    const res = await fetch(&apos;https://api.tvmaze.com/search/shows?q=marvel&apos;);
    const data = await res.json();
    console.log(`Show data fetched. Count: ${data.length}`);
    return {
        shows: data
    }
}

export default Index;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;next/link&apos;</span>;
<span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../components/Layout&apos;</span>;
<span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;isomorphic-unfetch&apos;</span>;

<span class="hljs-keyword">const</span> Index = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Marvel TV Shows<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            {props.shows.map(({ show }) =&gt; {
                return (
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{show.id}</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">as</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">p</span>/${<span class="hljs-attr">show.id</span>}`} <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">post</span>?<span class="hljs-attr">id</span>=<span class="hljs-string">${show.id}</span>`}&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;show-link&quot;</span>&gt;</span>{show.name}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                );
            })}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">jsx</span>&gt;</span><span class="undefined">
        {`
            *{
                margin:0;
                padding:0;
            }
            h1,a{
                font-family:&apos;Arial&apos;;
            }
            h1{
                margin-top:20px;
                background-color:#EF141F;
                color:#fff;
                font-size:50px;
                line-height:66px;
                text-transform: uppercase;
                text-align:center;
            }    
            ul{
                margin-top:20px;
                padding:20px;
                background-color:#000;
            }
            li{
                list-style:none;
                margin:5px 0;
            }
            a{
                text-decoration:none;
                color:#B4B5B4;
                font-size:24px;
            }
            a:hover{
                opacity:0.6;
            }
        `}
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
);

Index.getInitialProps = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">&apos;https://api.tvmaze.com/search/shows?q=marvel&apos;</span>);
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> res.json();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Show data fetched. Count: <span class="hljs-subst">${data.length}</span>`</span>);
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">shows</span>: data
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Index;</code></pre><p>&#x8FD0;&#x884C;&#x9879;&#x76EE;&#xFF0C;&#x9996;&#x9875;&#x53D8;&#x6210;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015578816?w=1490&amp;h=1104" src="https://static.alili.tech/img/remote/1460000015578816?w=1490&amp;h=1104" alt="image" title="image" style="cursor:pointer"></span></p><p>&#x589E;&#x52A0;&#x4E86;&#x4E00;&#x70B9;&#x6837;&#x5F0F;&#x4E4B;&#x540E;&#x6BD4;&#x4E4B;&#x524D;&#x597D;&#x770B;&#x4E86;&#x4E00;&#x70B9;&#x70B9;&#x3002;&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x5BFC;&#x822A;&#x680F;&#x7684;&#x6837;&#x5F0F;&#x5E76;&#x6CA1;&#x6709;&#x53D8;&#x3002;&#x56E0;&#x4E3A;Header&#x662F;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x7684;component&#xFF0C;component&#x4E4B;&#x95F4;&#x7684;&#x6837;&#x5F0F;&#x4E0D;&#x4F1A;&#x76F8;&#x4E92;&#x5F71;&#x54CD;&#x3002;&#x5982;&#x679C;&#x9700;&#x8981;&#x4E3A;&#x5BFC;&#x822A;&#x589E;&#x52A0;&#x6837;&#x5F0F;&#xFF0C;&#x9700;&#x8981;&#x4FEE;&#x6539;Header.js&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Link from &apos;next/link&apos;;

const Header = () =&gt; (
    &lt;div&gt;
        &lt;Link href=&quot;/&quot;&gt;
            &lt;a&gt;Home&lt;/a&gt;
        &lt;/Link&gt;
        &lt;Link href=&quot;/about&quot;&gt;
            &lt;a&gt;About&lt;/a&gt;
        &lt;/Link&gt;
        &lt;style jsx&gt;
            {`
                a{
                    color:#EF141F;
                    font-size:26px;
                    line-height:40px;
                    text-decoration:none;
                    padding:0 10px;
                    text-transform:uppercase;
                }
                a:hover{
                    opacity:0.8;
                }
            `}
        &lt;/style&gt;
    &lt;/div&gt;
)

export default Header;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;next/link&apos;</span>;

<span class="hljs-keyword">const</span> Header = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/about&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">jsx</span>&gt;</span><span class="undefined">
            {`
                a{
                    color:#EF141F;
                    font-size:26px;
                    line-height:40px;
                    text-decoration:none;
                    padding:0 10px;
                    text-transform:uppercase;
                }
                a:hover{
                    opacity:0.8;
                }
            `}
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Header;</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015578817?w=1536&amp;h=1150" src="https://static.alili.tech/img/remote/1460000015578817?w=1536&amp;h=1150" alt="image" title="image" style="cursor:pointer"></span></p><h4>&#x5168;&#x5C40;&#x6837;&#x5F0F;</h4><p>&#x5F53;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x5168;&#x5C40;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x6BD4;&#x5982;rest.css&#x6216;&#x8005;&#x9F20;&#x6807;&#x60AC;&#x6D6E;&#x5728;a&#x6807;&#x7B7E;&#x4E0A;&#x65F6;&#x51FA;&#x73B0;&#x4E0B;&#x5212;&#x7EBF;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x5728;<code>style-jsx</code>&#x6807;&#x7B7E;&#x4E0A;&#x589E;&#x52A0;<code>global</code>&#x5173;&#x952E;&#x8BCD;&#x5C31;&#x884C;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x4FEE;&#x6539;Layout.js&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Header from &apos;./Header&apos;;

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: &apos;1px solid #DDD&apos;
}

const Layout = (props) =&gt; (
    &lt;div style={layoutStyle}&gt;
        &lt;Header /&gt;
        {props.children}
        &lt;style jsx global&gt;
            {`
                a:hover{
                    text-decoration:underline;
                }
            `}
        &lt;/style&gt;
    &lt;/div&gt;
)

export default Layout" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./Header&apos;</span>;

<span class="hljs-keyword">const</span> layoutStyle = {
    <span class="hljs-attr">margin</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">padding</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">border</span>: <span class="hljs-string">&apos;1px solid #DDD&apos;</span>
}

<span class="hljs-keyword">const</span> Layout = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{layoutStyle}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
        {props.children}
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">jsx</span> <span class="hljs-attr">global</span>&gt;</span><span class="undefined">
            {`
                a:hover{
                    text-decoration:underline;
                }
            `}
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Layout</code></pre><p>&#x8FD9;&#x6837;&#x9F20;&#x6807;&#x60AC;&#x6D6E;&#x5728;&#x6240;&#x6709;&#x7684;a&#x6807;&#x7B7E;&#x4E0A;&#x65F6;&#x4F1A;&#x51FA;&#x73B0;&#x4E0B;&#x5212;&#x7EBF;&#x3002;</p><h3 id="articleHeader9">&#x90E8;&#x7F72;next.js&#x5E94;&#x7528;</h3><h4>Build</h4><p>&#x90E8;&#x7F72;&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x9700;&#x8981;&#x80FD;&#x4E3A;&#x751F;&#x4EA7;&#x73AF;&#x5883;build&#x9879;&#x76EE;&#xFF0C;&#x5728;package.json&#x4E2D;&#x6DFB;&#x52A0;script&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;build&quot;: &quot;next build&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code style="word-break:break-word;white-space:initial"><span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;next build&quot;</span></code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x80FD;&#x542F;&#x52A8;&#x9879;&#x76EE;&#x6765;serve&#x6211;&#x4EEC;build&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5728;package.json&#x4E2D;&#x6DFB;&#x52A0;script&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;start&quot;: &quot;next start&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">&quot;<span class="hljs-keyword">start</span><span class="hljs-string">&quot;: &quot;</span><span class="hljs-keyword">next</span> <span class="hljs-keyword">start</span><span class="hljs-string">&quot;</span></code></pre><p>&#x7136;&#x540E;&#x4F9D;&#x6B21;&#x6267;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build
npm run start" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> build
</span>npm <span class="hljs-keyword">run</span><span class="bash"> start</span></code></pre><p>build&#x5B8C;&#x6210;&#x7684;&#x5185;&#x5BB9;&#x4F1A;&#x751F;&#x6210;&#x5230;<code>.next</code>&#x6587;&#x4EF6;&#x5939;&#x5185;&#xFF0C;<code>npm run start</code>&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x8BBF;&#x95EE;&#x7684;&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;<code>.next</code>&#x6587;&#x4EF6;&#x5939;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><h4>&#x8FD0;&#x884C;&#x591A;&#x4E2A;&#x5B9E;&#x4F8B;</h4><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x6A2A;&#x5411;&#x6269;&#x5C55;&#xFF08; <a href="https://stackoverflow.com/questions/11707879/difference-between-scaling-horizontally-and-vertically-for-databases" rel="nofollow noreferrer" target="_blank">Horizontal Scale</a>&#xFF09;&#x4EE5;&#x63D0;&#x9AD8;&#x7F51;&#x7AD9;&#x7684;&#x8BBF;&#x95EE;&#x901F;&#x5EA6;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8FD0;&#x884C;&#x591A;&#x4E2A;&#x7F51;&#x7AD9;&#x7684;&#x5B9E;&#x4F8B;&#x3002;&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x4FEE;&#x6539;package.json&#x7684;start script&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;start&quot;: &quot;next start -p $PORT&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">&quot;<span class="hljs-keyword">start</span><span class="hljs-string">&quot;: &quot;</span><span class="hljs-keyword">next</span> <span class="hljs-keyword">start</span> -p $PORT<span class="hljs-string">&quot;</span></code></pre><p>&#x5982;&#x679C;&#x662F;windows&#x7CFB;&#x7EDF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;start&quot;: &quot;next start -p %PORT%&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">&quot;<span class="hljs-keyword">start</span><span class="hljs-string">&quot;: &quot;</span><span class="hljs-keyword">next</span> <span class="hljs-keyword">start</span> -p %PORT%<span class="hljs-string">&quot;</span></code></pre><p>&#x7136;&#x540E;&#x8FD0;&#x884C;build: <code>npm run build</code>&#xFF0C;&#x7136;&#x540E;&#x6253;&#x5F00;&#x4E24;&#x4E2A;&#x547D;&#x4EE4;&#x884C;&#x5E76;&#x5B9A;&#x4F4D;&#x5230;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#xFF0C;&#x5206;&#x522B;&#x8FD0;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="PORT=8000 npm start
PORT=9000 npm start" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ini"><code><span class="hljs-attr">PORT</span>=<span class="hljs-number">8000</span> npm start
<span class="hljs-attr">PORT</span>=<span class="hljs-number">9000</span> npm start</code></pre><p>&#x8FD0;&#x884C;&#x5B8C;&#x6210;&#x540E;&#x6253;&#x5F00;<a>localhost:8000</a>&#x548C;<a>localhost:9000</a>&#x90FD;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x8BBF;&#x95EE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015578818?w=1666&amp;h=1522" src="https://static.alili.tech/img/remote/1460000015578818?w=1666&amp;h=1522" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><p>&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x65B9;&#x6CD5;&#x867D;&#x7136;&#x80FD;&#x591F;&#x6253;&#x5305;&#x5E76;&#x90E8;&#x7F72;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x670D;&#x52A1;server.js&#x5E76;&#x6CA1;&#x6709;&#x8FD0;&#x884C;&#xFF0C;&#x5BFC;&#x81F4;&#x5728;&#x8BE6;&#x60C5;&#x9875;&#x5237;&#x65B0;&#x7684;&#x65F6;&#x5019;&#x4F9D;&#x7136;&#x4F1A;&#x51FA;&#x73B0;404&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x628A;&#x81EA;&#x5B9A;&#x4E49;&#x670D;&#x52A1;&#x52A0;&#x5165;app&#x7684;&#x903B;&#x8F91;&#x4E2D;&#x3002;</p><h4>&#x90E8;&#x7F72;&#x5E76;&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x670D;&#x52A1;</h4><p>&#x6211;&#x4EEC;&#x5C06;start script&#x4FEE;&#x6539;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;start&quot;: &quot;NODE_ENV=production node server.js&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code style="word-break:break-word;white-space:initial"><span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;NODE_ENV=production node server.js&quot;</span></code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x89E3;&#x51B3;&#x4E86;&#x81EA;&#x5B9A;&#x4E49;&#x670D;&#x52A1;&#x7684;&#x90E8;&#x7F72;&#x3002;&#x91CD;&#x542F;&#x9879;&#x76EE;&#x540E;&#x5237;&#x65B0;&#x8BE6;&#x60C5;&#x9875;&#x4E5F;&#x80FD;&#x591F;&#x6B63;&#x5E38;&#x8BBF;&#x95EE;&#x4E86;&#x3002;</p><p>&#x5230;&#x6B64;&#x4E3A;&#x6B62;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x4E86;&#x89E3;&#x4E86;next.js&#x7684;&#x5927;&#x90E8;&#x5206;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x7591;&#x95EE;&#x53EF;&#x4EE5;&#x67E5;&#x770B;next.js&#x5B98;&#x65B9;&#x6587;&#x6863;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7ED9;&#x6211;&#x7559;&#x8A00;&#x8BA8;&#x8BBA;&#x3002;</p><ul><li>&#x672C;&#x6587;Demo&#x6E90;&#x7801;&#xFF1A;<a href="https://github.com/MudOnTire/ReactBoilerplates/tree/master/server-rendered-website" rel="nofollow noreferrer" target="_blank">Github &#x6E90;&#x7801;</a></li><li>next.js&#x5B98;&#x7F51;&#xFF1A;<a href="https://nextjs.org/" rel="nofollow noreferrer" target="_blank">https://nextjs.org/</a></li><li>next.js&#x5B98;&#x65B9;&#x6559;&#x7A0B;&#xFF1A;<a href="https://nextjs.org/learn" rel="nofollow noreferrer" target="_blank">https://nextjs.org/learn</a></li><li>next.js Github&#xFF1A;<a href="https://github.com/zeit/next.js" rel="nofollow noreferrer" target="_blank">https://github.com/zeit/next.js</a></li></ul><p>&#x611F;&#x8C22;&#x5927;&#x5BB6;&#x9605;&#x8BFB;&#xFF0C;&#x53E6;&#x5916;&#xFF0C;&#x5728;&#x8FD9;&#x8FB9;&#x5E2E;&#x670B;&#x53CB;&#x63A8;&#x4E00;&#x4E2A;&#x7231;&#x5FC3;&#x4F17;&#x7B79;&#xFF0C;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x80FD;&#x591F;&#x5949;&#x732E;&#x70B9;&#x7231;&#x5FC3;&#xFF0C;&#x670B;&#x53CB;&#x6BCD;&#x4EB2;&#xFF0C;&#x8EAB;&#x60A3;&#x76F4;&#x80A0;&#x764C;&#xFF0C;&#x76EE;&#x524D;&#x5728;&#x5317;&#x4EAC;&#x6B66;&#x8B66;&#x603B;&#x533B;&#x9662;&#x63A5;&#x6536;&#x6CBB;&#x7597;&#xFF0C;&#x53EF;&#x7559;&#x8A00;&#x7559;&#x4E0B;&#x60A8;&#x7684;&#x8054;&#x7CFB;&#x65B9;&#x5F0F;&#xFF0C;&#x65E5;&#x540E;&#x611F;&#x6FC0;&#x5927;&#x5BB6;&#xFF01;</p><p><span class="img-wrap"><img data-src="/img/bVbhrRA?w=670&amp;h=1030" src="https://static.alili.tech/img/bVbhrRA?w=670&amp;h=1030" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Next.js构建React服务端渲染应用

## 原文链接
[https://segmentfault.com/a/1190000015578803](https://segmentfault.com/a/1190000015578803)

