---
title: '[翻译]React组件模式' 
date: 2018-11-22 2:30:10
hidden: true
slug: h411n2vaqzj
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x539F;&#x6587;&#x5730;&#x5740;&#xFF1A;<a href="https://medium.com/teamsubchannel/react-component-patterns-e7fb75be7bb0" rel="nofollow noreferrer" target="_blank">https://medium.com/teamsubchannel/react-component-patterns-e7fb75be7bb0</a><br>&#x4F5C;&#x8005;&#xFF1A;<a href="https://medium.com/@wwwhatley" rel="nofollow noreferrer" target="_blank">William Whatley</a><br>&#x6458;&#x8981;&#xFF1A;&#x672C;&#x6587;&#x4ECB;&#x7ECD;&#x4E86;4&#x79CD;&#x7EC4;&#x4EF6;&#x7C7B;&#x578B;&#xFF1A;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x3001;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#x3001;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x548C;&#x6E32;&#x67D3;&#x56DE;&#x8C03;&#x3002;</blockquote><p><span class="img-wrap"><img data-src="/img/remote/1460000015710312?w=2000&amp;h=1125" src="https://static.alili.tech/img/remote/1460000015710312?w=2000&amp;h=1125" alt="&#x5C01;&#x9762;&#x56FE;" title="&#x5C01;&#x9762;&#x56FE;" style="cursor:pointer;display:inline"></span></p><p>&#x4ECA;&#x5929;&#xFF0C;&#x6211;&#x60F3;&#x82B1;&#x4E00;&#x70B9;&#x65F6;&#x95F4;&#x6765;&#x5206;&#x4EAB;&#x6211;&#x5B66;&#x4E60;React&#x7EC4;&#x4EF6;&#x6A21;&#x5F0F;&#x7684;&#x7ECF;&#x9A8C;&#x3002;&#x8FD9;&#x4E2A;&#x60F3;&#x6CD5;&#x6765;&#x6E90;&#x4E8E;&#x4E00;&#x6B21;&#x805A;&#x4F1A;&#x65F6;&#x7684;&#x6280;&#x672F;&#x4EA4;&#x6D41;&#x3002;&#x7EC4;&#x4EF6;&#x662F;React&#x7684;&#x6838;&#x5FC3;&#xFF0C;&#x56E0;&#x6B64;&#x6709;&#x5FC5;&#x8981;&#x53BB;&#x7406;&#x89E3;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x5B83;&#x4EEC;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x7684;&#x4F8B;&#x5B50;&#x90FD;&#x8131;&#x80CE;&#x4E8E;<a href="https://www.youtube.com/watch?v=YaZg8wg39QQ&amp;t=662s" rel="nofollow noreferrer" target="_blank">Michael Chan gave on React component patterns</a>&#x8FD9;&#x4E2A;&#x89C6;&#x9891;&#x7684;&#x601D;&#x60F3;&#x3002;&#x6211;&#x975E;&#x5E38;&#x63A8;&#x8350;&#x4F60;&#x4EEC;&#x770B;&#x4E00;&#x770B;&#x3002;</p><h1 id="articleHeader0">&#x4EC0;&#x4E48;&#x662F;&#x7EC4;&#x4EF6;&#xFF1F;</h1><p><a>reactjs.org</a>&#x4E0A;&#x8BF4;&#xFF1A;&#x201C;&#x7EC4;&#x4EF6;&#x80FD;&#x591F;&#x5C06;&#x4F60;&#x7684;&#x754C;&#x9762;&#x5206;&#x5272;&#x6210;&#x72EC;&#x7ACB;&#x4E14;&#x53EF;&#x590D;&#x7528;&#x7684;&#x5C0F;&#x5757;&#xFF0C;&#x800C;&#x8FD9;&#x4E9B;&#x5C0F;&#x7EC4;&#x4EF6;&#x90FD;&#x662F;&#x4E92;&#x76F8;&#x72EC;&#x7ACB;&#x7684;&#x3002;&#x201D;</p><p>&#x5F53;&#x4F60;&#x7B2C;&#x4E00;&#x6B21;&#x6267;&#x884C;<code>npm install react</code>&#x547D;&#x4EE4;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F60;&#x5F97;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x4EE5;&#x53CA;&#x76F8;&#x5173;&#x7684;API&#x3002;&#x4E0E;JS&#x7684;&#x51FD;&#x6570;&#x7C7B;&#x4F3C;&#xFF0C;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x63A5;&#x6536;&#x8F93;&#x5165;&#xFF0C;&#x53EB;&#x505A;<code>props</code>&#x3002;&#x7136;&#x540E;&#x8FD4;&#x56DE;React&#x5143;&#x7D20;&#xFF0C;&#x4F5C;&#x7528;&#x662F;&#x63CF;&#x8FF0;UI&#x754C;&#x9762;&#x7684;&#x6837;&#x5F0F;&#x3002;&#x8FD9;&#x5C31;&#x662F;React&#x4F5C;&#x4E3A;&#x58F0;&#x660E;&#x5F0F;API&#x7684;&#x8868;&#x73B0;&#x5F62;&#x5F0F;&#xFF0C;&#x56E0;&#x4E3A;&#x4F60;&#x53EA;&#x9700;&#x8981;&#x544A;&#x8BC9;&#x5B83;&#x4F60;&#x60F3;&#x8981;&#x5C55;&#x793A;&#x7684;UI&#xFF0C;&#x5269;&#x4E0B;&#x7684;React&#x90FD;&#x4F1A;&#x5E2E;&#x4F60;&#x5B8C;&#x6210;&#x3002;</p><p>&#x5BF9;&#x4E8E;&#x58F0;&#x660E;&#x5F0F;API&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x60F3;&#x8C61;&#x6210;&#x6EF4;&#x6EF4;&#x6253;&#x8F66;&#x7684;&#x573A;&#x666F;&#x2014;&#x2014;&#x544A;&#x8BC9;&#x53F8;&#x673A;&#x4F60;&#x7684;&#x76EE;&#x7684;&#x5730;&#xFF0C;&#x63A5;&#x7740;&#x8BA9;&#x4ED6;&#x6765;&#x5B8C;&#x6210;&#x5F00;&#x8F66;&#x7684;&#x5DE5;&#x4F5C;&#x3002;&#x800C;&#x547D;&#x4EE4;&#x5F0F;API&#x4E0D;&#x540C;&#xFF0C;&#x4F60;&#x5C06;&#x5B8C;&#x6210;&#x6240;&#x6709;&#x4EFB;&#x52A1;&#xFF0C;&#x65E2;&#x662F;&#x4E58;&#x5BA2;&#xFF0C;&#x4E5F;&#x662F;&#x53F8;&#x673A;&#x3002;</p><h1 id="articleHeader1">&#x7EC4;&#x4EF6;API</h1><p>&#x5F53;&#x4F60;&#x5728;&#x5B89;&#x88C5;&#x597D;React&#x540E;&#xFF0C;&#x5F97;&#x5230;&#x4E86;5&#x7C7B;API&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015710313" src="https://static.alili.tech/img/remote/1460000015710313" alt="api&#x7C7B;&#x578B;" title="api&#x7C7B;&#x578B;" style="cursor:pointer"></span></p><ul><li>render</li><li>state</li><li>props</li><li>context</li><li>lifecycle events</li></ul><p>&#x5C3D;&#x7BA1;&#x5199;&#x7EC4;&#x4EF6;&#x65F6;&#x53EF;&#x4EE5;&#x628A;&#x4E0A;&#x9762;&#x6240;&#x6709;&#x7684;API&#x90FD;&#x4F7F;&#x7528;&#x4E00;&#x904D;&#xFF0C;&#x4F46;&#x662F;&#x4F60;&#x5F88;&#x5FEB;&#x4F1A;&#x53D1;&#x73B0;&#x4E00;&#x4E9B;&#x7EC4;&#x4EF6;&#x53EA;&#x9700;&#x8981;&#x7528;&#x5230;&#x67D0;&#x4E9B;API&#xFF0C;&#x800C;&#x53E6;&#x4E00;&#x4E9B;&#x7EC4;&#x4EF6;&#x4E5F;&#x53EA;&#x4F1A;&#x4F7F;&#x7528;&#x53E6;&#x4E00;&#x4E9B;&#x7279;&#x5B9A;&#x7684;API&#x3002;&#x800C;&#x8FD9;&#x4E24;&#x7C7B;&#x7EC4;&#x4EF6;&#x5F80;&#x5F80;&#x88AB;&#x5212;&#x5206;&#x4E3A;&#x6709;&#x72B6;&#x6001;&#x4E0E;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x4E24;&#x5927;&#x7C7B;&#x3002;&#x6709;&#x72B6;&#x6001;&#x7684;&#x7EC4;&#x4EF6;&#x4F1A;&#x6709;&#x4EE3;&#x8868;&#x6027;&#x5730;&#x4F7F;&#x7528;&#x6709;&#x72B6;&#x6001;API&#xFF1A;render&#x3001;state&#x548C;&#x751F;&#x547D;&#x5468;&#x671F;&#x3002;&#x4F46;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x53EA;&#x4F1A;&#x4F7F;&#x7528;render&#x3001;props&#x548C;context&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000015710314" src="https://static.alili.tech/img/remote/1460000015710314" alt="&#x6709;&#x72B6;&#x6001;&#x4E0E;&#x65E0;&#x72B6;&#x6001;" title="&#x6709;&#x72B6;&#x6001;&#x4E0E;&#x65E0;&#x72B6;&#x6001;" style="cursor:pointer;display:inline"></span></p><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x5728;&#x4ECB;&#x7ECD;&#x7EC4;&#x4EF6;&#x6A21;&#x5F0F;&#x524D;&#x6240;&#x9700;&#x8981;&#x7684;&#x77E5;&#x8BC6;&#x94FA;&#x57AB;&#x3002;&#x7EC4;&#x4EF6;&#x6A21;&#x5F0F;&#x662F;&#x8BBE;&#x8BA1;&#x7EC4;&#x4EF6;&#x7684;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#xFF0C;&#x6700;&#x521D;&#x662F;&#x628A;&#x7EC4;&#x4EF6;&#x5207;&#x5272;&#x6210;&#x6570;&#x636E;/&#x903B;&#x8F91;&#x5C42;&#x548C;UI/&#x5C55;&#x793A;&#x5C42;&#x3002;&#x901A;&#x8FC7;&#x62C6;&#x5206;&#x7EC4;&#x4EF6;&#x7684;&#x804C;&#x8D23;&#xFF0C;&#x80FD;&#x591F;&#x8BBE;&#x8BA1;&#x51FA;&#x66F4;&#x5BB9;&#x6613;&#x590D;&#x7528;&#x3001;&#x66F4;&#x5185;&#x805A;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x4ECE;&#x800C;&#x7EC4;&#x88C5;&#x6210;&#x590D;&#x6742;&#x7684;UI&#x754C;&#x9762;&#x3002;&#x8FD9;&#x4E2A;&#x7279;&#x6027;&#x5BF9;&#x4E8E;&#x6784;&#x5EFA;&#x53EF;&#x6269;&#x5C55;&#x7684;&#x5E94;&#x7528;&#x65F6;&#x662F;&#x975E;&#x5E38;&#x91CD;&#x8981;&#x7684;&#x3002;</p><h1 id="articleHeader2">&#x7EC4;&#x4EF6;&#x6A21;&#x5F0F;</h1><p>&#x5E38;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x6A21;&#x5F0F;&#x6709;&#xFF1A;</p><ul><li>&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;</li><li>&#x5C55;&#x793A;&#x7EC4;&#x4EF6;</li><li>&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;HOC</li><li>&#x6E32;&#x67D3;&#x56DE;&#x8C03;</li></ul><h2 id="articleHeader3">&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;</h2><p>&#x201C;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x548C;&#x6E32;&#x67D3;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;&#x201D;&#x2014;&#x2014;Jason Bonta<br><span class="img-wrap"><img data-src="/img/remote/1460000015710315" src="https://static.alili.tech/img/remote/1460000015710315" alt="&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;" title="&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;" style="cursor:pointer"></span></p><blockquote>&#x84DD;&#x8272;&#x4EE3;&#x8868;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#xFF0C;&#x7070;&#x8272;&#x4EE3;&#x8868;&#x5C55;&#x793A;&#x7528;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;</blockquote><p>&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;&#x4E86;&#x6709;&#x72B6;&#x6001;&#x7684;API&#xFF0C;&#x5C01;&#x88C5;&#x4E86;&#x6570;&#x636E;&#x903B;&#x8F91;&#x5C42;&#x3002;&#x901A;&#x8FC7;&#x4F7F;&#x7528;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x8FDE;&#x63A5;Redux&#x6216;Flux&#x7B49;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5E93;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x6570;&#x636E;&#x548C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5F53;&#x4F5C;props&#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;&#x5728;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x7684;render&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x7528;&#x5B50;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#x6765;&#x62FC;&#x88C5;UI&#x754C;&#x9762;&#x3002;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x5F80;&#x5F80;&#x90FD;&#x8BBE;&#x8BA1;&#x6210;&#x4E00;&#x4E2A;&#x7C7B;&#x7EC4;&#x4EF6;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x7EAF;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E3A;&#x7684;&#x5C31;&#x662F;&#x80FD;&#x591F;&#x4F7F;&#x7528;&#x6240;&#x6709;&#x6709;&#x72B6;&#x6001;&#x7684;API&#x3002;</p><p>&#x5728;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;Greeting&#x7684;&#x6709;&#x72B6;&#x6001;&#x7684;&#x7C7B;&#x7EC4;&#x4EF6;&#xFF0C;&#x5305;&#x62EC;<code>componentDidMount()</code>&#x548C;<code>render</code>&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Greeting extends React.Component {
  constructor() {
    super();
    this.state = {
      name: &quot;&quot;,
    };
  }

  componentDidMount() {
    // AJAX
    this.setState(() =&gt; {
      return {
        name: &quot;William&quot;,
      };
    });
  }

  render() {
    return (
      &lt;div&gt;
        &lt;h1&gt;Hello! {this.state.name}&lt;/h1&gt;
      &lt;/div&gt;
    );
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Greeting</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = {
      name: <span class="hljs-string">&quot;&quot;</span>,
    };
  }

  componentDidMount() {
    <span class="hljs-comment">// AJAX</span>
    <span class="hljs-keyword">this</span>.setState(() =&gt; {
      <span class="hljs-keyword">return</span> {
        name: <span class="hljs-string">&quot;William&quot;</span>,
      };
    });
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;h1&gt;<span class="hljs-type">Hello</span>! {<span class="hljs-keyword">this</span>.state.name}&lt;/h1&gt;
      &lt;/div&gt;
    );
  }
}</code></pre><p>&#x8FD9;&#x65F6;&#xFF0C;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x4EC5;&#x4EC5;&#x662F;&#x4E00;&#x4E2A;&#x6709;&#x72B6;&#x6001;&#x7684;&#x7C7B;&#x7EC4;&#x4EF6;&#x3002;&#x4E3A;&#x4E86;&#x8BA9;&#x5B83;&#x6210;&#x4E3A;&#x4E00;&#x4E2A;&#x771F;&#x6B63;&#x7684;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x628A;UI&#x90E8;&#x5206;&#x653E;&#x8FDB;&#x4E00;&#x4E2A;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#x4E2D;&#x3002;&#x4E0B;&#x9762;&#x5C31;&#x6765;&#x8BB2;&#x8BB2;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#x3002;</p><h2 id="articleHeader4">&#x5C55;&#x793A;&#x7EC4;&#x4EF6;</h2><p>&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;&#x5230;props&#x3001;render&#x548C;context&#x8FD9;&#x4E9B;&#x65E0;&#x72B6;&#x6001;API&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x5199;&#x6210;&#x66F4;&#x7B80;&#x6D01;&#x4F18;&#x96C5;&#x7684;&#x51FD;&#x6570;&#x5F0F;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const GreetingCard = (props) =&gt; {
  return (
    &lt;div&gt;
      &lt;h1&gt;Hello! {props.name}&lt;/h1&gt;
    &lt;/div&gt;
  )
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> GreetingCard = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello! {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}</code></pre><p>&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#x53EA;&#x80FD;&#x4ECE;&#x7236;&#x7EA7;&#x7EC4;&#x4EF6;&#x6216;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x4F20;&#x6765;&#x7684;props&#x4E2D;&#x63A5;&#x6536;&#x6570;&#x636E;&#x548C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000015710316" src="https://static.alili.tech/img/remote/1460000015710316" alt="&#x5C55;&#x793A;&#x7EC4;&#x4EF6;" title="&#x5C55;&#x793A;&#x7EC4;&#x4EF6;" style="cursor:pointer"></span></p><blockquote>&#x84DD;&#x8272;&#x4EE3;&#x8868;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#xFF0C;&#x800C;&#x7070;&#x8272;&#x4EE3;&#x8868;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x3002;</blockquote><p>&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x548C;&#x5C55;&#x793A;&#x7EC4;&#x4EF6;&#x5408;&#x5E76;&#x8D77;&#x6765;&#x540E;&#xFF0C;&#x5C01;&#x88C5;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x771F;&#x6B63;&#x88AB;&#x4F7F;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const GreetingCard = (props) =&gt; {
  return (
    &lt;div&gt;
      &lt;h1&gt;{props.name}&lt;/h1&gt;
    &lt;/div&gt;
  )
}

class Greeting extends React.Component {
  constructor() {
    super();
    this.state = {
      name: &quot;&quot;,
    };
  }

  componentDidMount() {
    // AJAX
    this.setState(() =&gt; {
      return {
        name: &quot;William&quot;,
      };
    });
  }

  render() {
    return (
      &lt;div&gt;
       &lt;GreetingCard name={this.state.name} /&gt;
      &lt;/div&gt;
    );
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
<span class="hljs-keyword">const</span> GreetingCard = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Greeting</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;&quot;</span>,
    };
  }

  componentDidMount() {
    <span class="hljs-comment">// AJAX</span>
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;William&quot;</span>,
      };
    });
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">GreetingCard</span> <span class="hljs-attr">name</span>=<span class="hljs-string">{this.state.name}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}</span></code></pre><p>&#x5982;&#x4F60;&#x6240;&#x89C1;&#xFF0C;&#x6211;&#x628A;Greeting&#x7C7B;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;UI&#x90E8;&#x5206;&#x79FB;&#x9664;&#xFF0C;&#x653E;&#x5165;&#x4E00;&#x4E2A;&#x65E0;&#x72B6;&#x6001;&#x7684;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#x4E2D;&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x8FD9;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x4F46;&#x5BF9;&#x4E8E;&#x590D;&#x6742;&#x7684;&#x5E94;&#x7528;&#x6765;&#x8BF4;&#xFF0C;&#x8FD9;&#x662F;&#x6700;&#x57FA;&#x672C;&#x7684;&#x505A;&#x6CD5;&#x3002;</p><h2 id="articleHeader5">&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF08;HOC&#xFF09;</h2><p>&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x628A;&#x7EC4;&#x4EF6;&#x5F53;&#x4F5C;&#x53C2;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x8FD4;&#x56DE;&#x65B0;&#x7EC4;&#x4EF6;&#x7684;&#x51FD;&#x6570;&#x3002;</p><p>&#x5B83;&#x7684;&#x5F3A;&#x5927;&#x4E4B;&#x5904;&#x5728;&#x4E8E;&#x80FD;&#x591F;&#x7ED9;&#x4EFB;&#x610F;&#x6570;&#x91CF;&#x7684;&#x7EC4;&#x4EF6;&#x63D0;&#x4F9B;&#x6570;&#x636E;&#x6E90;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x88AB;&#x7528;&#x6765;&#x5B9E;&#x73B0;&#x903B;&#x8F91;&#x590D;&#x7528;&#x3002;&#x7528;react-router-v4&#x6216;Redux&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#x3002;&#x4F7F;&#x7528;react-router-v4&#x65F6;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>withRouter()</code>&#x6765;&#x7EE7;&#x627F;&#x4F20;&#x7ED9;&#x7EC4;&#x4EF6;&#x7684;props&#x3002;&#x800C;&#x4F7F;&#x7528;Redux&#x65F6;&#xFF0C;&#x4F60;&#x901A;&#x8FC7;&#x4F7F;&#x7528;<code>connect({})()</code>&#x6765;&#x628A;actions&#x5F53;&#x4F5C;props&#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000015710317" src="https://static.alili.tech/img/remote/1460000015710317" alt="HOC" title="HOC" style="cursor:pointer"></span></p><blockquote>&#x865A;&#x7EBF;&#x8868;&#x793A;&#x7684;&#x662F;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B83;&#x80FD;&#x591F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</blockquote><p>&#x770B;&#x770B;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {withRouter} from &apos;react-router-dom&apos;;

class App extends React.Component {
  constructor() {
    super();
    this.state = {path: &apos;&apos;}
  }
  
  componentDidMount() {
    let pathName = this.props.location.pathname;
    this.setState(() =&gt; {
      return {
        path: pathName,
      }
    })
  }
  
  render() {
    return (
      &lt;div&gt;
        &lt;h1&gt;Hi! I&apos;m being rendered at: {this.state.path}&lt;/h1&gt;
      &lt;/div&gt;
    )
  }
}

export default withRouter(App);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> {withRouter} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-router-dom&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">path</span>: <span class="hljs-string">&apos;&apos;</span>}
  }
  
  componentDidMount() {
    <span class="hljs-keyword">let</span> pathName = <span class="hljs-keyword">this</span>.props.location.pathname;
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">path</span>: pathName,
      }
    })
  }
  
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hi! I&apos;m being rendered at: {this.state.path}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withRouter(App);</code></pre><p>&#x5F53;&#x5BFC;&#x51FA;&#x6211;&#x7684;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x6211;&#x4F7F;&#x7528;react-router-v4&#x63D0;&#x4F9B;&#x7684;<code>withRouter()</code>&#x65B9;&#x6CD5;&#x628A;&#x5B83;&#x5305;&#x88F9;&#x8D77;&#x6765;&#x3002;&#x800C;&#x5728;App&#x7684;<code>componentDidMount()</code>&#x751F;&#x547D;&#x5468;&#x671F;&#x4E2D;&#xFF0C;&#x6211;&#x901A;&#x8FC7;<code>this.props.location.pathname</code>&#x6765;&#x66F4;&#x65B0;&#x72B6;&#x6001;&#x3002;&#x5728;&#x88AB;<code>withRouter()</code>&#x5305;&#x88F9;&#x540E;&#xFF0C;&#x6211;&#x7684;&#x7C7B;&#x7EC4;&#x4EF6;&#x73B0;&#x5728;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;props&#x8BBF;&#x95EE;react-router-v4&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x50CF;<code>this.props.location.pathname</code>&#x3002;&#x50CF;&#x8FD9;&#x6837;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x5B9E;&#x5728;&#x662F;&#x4E0D;&#x80DC;&#x679A;&#x4E3E;&#x3002;</p><h2 id="articleHeader6">&#x6E32;&#x67D3;&#x56DE;&#x8C03;&#xFF08;render callbacks&#xFF09;</h2><p>&#x4E0E;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x7C7B;&#x4F3C;&#xFF0C;&#x6E32;&#x67D3;&#x56DE;&#x8C03;&#x6216;&#x8005;&#x8BF4;&#x6E32;&#x67D3;props&#x90FD;&#x662F;&#x7528;&#x6765;&#x5B9E;&#x73B0;&#x7EC4;&#x4EF6;&#x903B;&#x8F91;&#x590D;&#x7528;&#x529F;&#x80FD;&#x3002;&#x76F8;&#x6BD4;&#x8F83;&#x4E8E;&#x5927;&#x591A;&#x6570;&#x5F00;&#x53D1;&#x8005;&#x4F7F;&#x7528;&#x7684;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF0C;&#x6E32;&#x67D3;&#x56DE;&#x8C03;&#x4E5F;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x4F18;&#x52BF;&#x3002;&#x5177;&#x4F53;&#x4F18;&#x52BF;&#x53EF;&#x4EE5;&#x9605;&#x8BFB;Michael Jackson&#x6240;&#x5199;&#x7684;&#x8FD9;&#x4E2A;&#x89C6;&#x9891;&#x2014;&#x2014;<a href="https://www.youtube.com/watch?v=BcVAq3YFiuc" rel="nofollow noreferrer" target="_blank">&#x300A;Never write another HOC.&#x300B;</a>&#x3002;&#x89C6;&#x9891;&#x4E2D;&#x6240;&#x8BB2;&#x7684;&#x5173;&#x952E;&#x70B9;&#x5C31;&#x662F;&#x6E32;&#x67D3;&#x56DE;&#x8C03;&#x80FD;&#x591F;&#x51CF;&#x5C11;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x7684;&#x51B2;&#x7A81;&#x5E76;&#x4E14;&#x89E3;&#x91CA;&#x903B;&#x8F91;&#x7684;&#x6765;&#x6E90;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000015710318" src="https://static.alili.tech/img/remote/1460000015710318" alt="&#x6E32;&#x67D3;&#x56DE;&#x8C03;" title="&#x6E32;&#x67D3;&#x56DE;&#x8C03;" style="cursor:pointer"></span></p><blockquote>&#x84DD;&#x8272;&#x865A;&#x7EBF;&#x4EE3;&#x8868;&#x6E32;&#x67D3;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment = () =&gt; {
    this.setState(prevState =&gt; {
      return {
        count: prevState.count + 1,
      };
    });
  };

  render() {
    return (
      &lt;div onClick={this.increment}&gt;{this.props.children(this.state)}&lt;/div&gt;
    );
  }
}

class App extends React.Component {
  render() {
    return (
      &lt;Counter&gt;
        {state =&gt; (
          &lt;div&gt;
            &lt;h1&gt;The count is: {state.count}&lt;/h1&gt;
          &lt;/div&gt;
        )}
      &lt;/Counter&gt;
    );
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      count: <span class="hljs-number">0</span>,
    };
  }

  increment = () =&gt; {
    <span class="hljs-keyword">this</span>.setState(prevState =&gt; {
      <span class="hljs-keyword">return</span> {
        count: prevState.count + <span class="hljs-number">1</span>,
      };
    });
  };

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div onClick={<span class="hljs-keyword">this</span>.increment}&gt;{<span class="hljs-keyword">this</span>.props.children(<span class="hljs-keyword">this</span>.state)}&lt;/div&gt;
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">Counter</span>&gt;
        {state =&gt; (
          &lt;div&gt;
            &lt;h1&gt;<span class="hljs-type">The</span> count is: {state.count}&lt;/h1&gt;
          &lt;/div&gt;
        )}
      &lt;/<span class="hljs-type">Counter</span>&gt;
    );
  }
}</code></pre><p>&#x5728;&#x4E0A;&#x9762;&#x7684;Counter&#x7C7B;&#x4E2D;&#xFF0C;&#x6211;&#x5728;<code>render</code>&#x91CC;&#x4F7F;&#x7528;&#x4E86;<code>this.props.children</code>&#xFF0C;&#x7136;&#x540E;&#x628A;<code>this.state</code>&#x5F53;&#x4F5C;&#x53C2;&#x6570;&#x4F20;&#x7ED9;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;&#x4E4B;&#x540E;&#x5728;App&#x7C7B;&#x4E2D;&#xFF0C;&#x6211;&#x628A;&#x60F3;&#x8981;&#x5C55;&#x793A;&#x7684;&#x7EC4;&#x4EF6;&#x7528;Counter&#x7EC4;&#x4EF6;&#x5305;&#x88F9;&#x8D77;&#x6765;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x80FD;&#x4F7F;&#x7528;Counter&#x7684;&#x4EE3;&#x7801;&#x903B;&#x8F91;&#x4E86;&#x3002;<code>render</code>&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x662F;&#x4EE3;&#x7801;28&#x884C;&#xFF0C;&#x5728;&#x90A3;&#x91CC;&#x6211;&#x901A;&#x8FC7;<code>{state =&gt; ()}</code>&#x81EA;&#x52A8;&#x83B7;&#x53D6;&#x5230;Counter&#x7684;state&#x3002;</p><h1 id="articleHeader7">&#x611F;&#x8C22;&#x60A8;&#x7684;&#x9605;&#x8BFB;</h1><p>&#x6211;&#x5F88;&#x4E50;&#x610F;&#x63A5;&#x53D7;&#x5927;&#x5BB6;&#x7684;&#x610F;&#x89C1;&#x6765;&#x4F7F;&#x6211;&#x6210;&#x957F;&#x3002;&#x6211;&#x5BF9;React&#x7EC4;&#x4EF6;&#x6A21;&#x5F0F;&#x7684;&#x89C1;&#x89E3;&#x8FD8;&#x4E0D;&#x591F;&#x6210;&#x719F;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4E5F;&#x7B97;&#x662F;&#x5728;&#x5199;&#x4F5C;&#x4E2D;&#x5B66;&#x4E60;&#x5427;&#x3002;</p><blockquote>&#x67E5;&#x770B;&#x66F4;&#x591A;&#x6211;&#x7FFB;&#x8BD1;&#x7684;Medium&#x6587;&#x7AE0;&#x8BF7;&#x8BBF;&#x95EE;&#xFF1A;<br>&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/WhiteYin/translation/tree/master" rel="nofollow noreferrer" target="_blank">https://github.com/WhiteYin/translation</a><br>SF&#x4E13;&#x680F;&#xFF1A;<a href="https://segmentfault.com/blog/yin-translation">https://segmentfault.com/blog/yin-translation</a></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[翻译]React组件模式

## 原文链接
[https://segmentfault.com/a/1190000015710309](https://segmentfault.com/a/1190000015710309)

