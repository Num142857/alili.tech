---
title: React-Keeper 前端路由缓存 存储状态（大部分转）
hidden: true
categories: [reprint]
slug: cf6653f8
date: 2018-11-05 02:30:11
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x63A5;&#x89E6;react&#x4E5F;&#x6709;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x4E86;&#xFF0C;&#x4E00;&#x76F4;&#x5728;&#x505A;&#x5173;&#x4E8E;react&#x524D;&#x7AEF;&#x67B6;&#x6784;&#x76F8;&#x5173;&#x7684;&#x7814;&#x7A76;&#xFF0C;&#x7531;&#x4E8E;&#x5DE5;&#x4F5C;&#x6027;&#x8D28;&#xFF0C;&#x6709;&#x4E9B;&#x5E72;&#x8D27;&#x53EA;&#x80FD;&#x81EA;&#x5DF1;&#x7814;&#x7A76;&#x4E86;&#xFF0C;&#x4ECA;&#x5929;&#x9047;&#x89C1;&#x4E86;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#xFF1A;&#x5728;&#x505A;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x9879;&#x76EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4EA7;&#x54C1;&#x7ECF;&#x7406;&#x63D0;&#x51FA;&#xFF1A;&#x4ECE;&#x5217;&#x8868;&#x9875;&#x586B;&#x5199;&#x67E5;&#x8BE2;&#x6761;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x67E5;&#x8BE2;&#x51FA;&#x7ED3;&#x679C;&#xFF0C;&#x70B9;&#x51FB;&#x67D0;&#x4E00;&#x6761;&#x7ED3;&#x679C;&#x8FDB;&#x5165;&#x7F16;&#x8F91;&#x9875;&#x9762;&#xFF0C;&#x7F16;&#x8F91;&#x5B8C;&#x4E86;&#x4E4B;&#x540E;&#x8FD4;&#x56DE;&#x5217;&#x8868;&#x9875;&#xFF0C;&#x8FD8;&#x60F3;&#x770B;&#x5230;&#x4E4B;&#x524D;&#x67E5;&#x8BE2;&#x7684;&#x6761;&#x4EF6;&#x548C;&#x67E5;&#x8BE2;&#x7684;&#x7ED3;&#x679C;&#xFF1B;&#xFF08;&#x76EE;&#x524D;&#x662F;&#x8FD4;&#x56DE;&#x76F4;&#x63A5;&#x5237;&#x65B0;&#x9875;&#x9762;&#xFF0C;&#x7B49;&#x4E8E;&#x67E5;&#x8BE2;&#x6761;&#x4EF6;&#x4E3A;&#x7A7A;&#xFF09;&#x3002;</p><p>&#x90A3;&#x4E48;&#x56E2;&#x961F;&#x7684;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#x662F;&#xFF0C;&#x5728;&#x8DF3;&#x8F6C;&#x5230;&#x7F16;&#x8F91;&#x9875;&#x9762;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x6253;&#x5F00;&#x65B0;&#x7684;&#x6807;&#x7B7E;&#xFF08;&#x4E0D;&#x8FC7;&#x7ED3;&#x5408;&#x4E4B;&#x524D;&#x7684;&#x67B6;&#x6784;&#xFF08;&#x6709;&#x70B9;&#x8001;&#xFF09;&#xFF0C;&#x8FD9;&#x4E2A;&#x867D;&#x7136;&#x3002;&#x3002;&#x4F46;&#x662F;&#x4E5F;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#xFF09;</p><p>&#x63A5;&#x89E6;&#x8FC7;vue&#x7684;&#x540C;&#x5B66;&#x77E5;&#x9053; vue&#x6709;&#x4E00;&#x4E2A;keep-alive&#x53EF;&#x4EE5;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6;&#x72B6;&#x6001;&#xFF0C;&#x5728;&#x505A;&#x79FB;&#x52A8;&#x7AEF;&#x5E94;&#x7528;&#x7684;&#x65F6;&#x5019;&#x975E;&#x5E38;&#x65B9;&#x4FBF;&#xFF0C;&#x63D0;&#x9AD8;&#x6027;&#x80FD;&#xFF1B;&#x90A3;&#x4E48;react&#x6709;&#x6CA1;&#x6709;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x4E1C;&#x897F;&#x5462;&#xFF1F;&#x5F53;&#x7136;&#x6709;&#xFF0C;&#x90A3;&#x5C31;&#x662F;React-Keeper&#x4E86;</p><p>github&#x5730;&#x5740; <a href="https://github.com/vifird/react-keeper" rel="nofollow noreferrer" target="_blank">https://github.com/vifird/rea...</a></p><p>&#x4E0B;&#x9762;&#x5C31;&#x662F;&#x8F6C;&#x8F7D;&#x7684;&#x5185;&#x5BB9;&#x4E86;</p><p>&#x4E86;&#x89E3;React&#x7684;&#x540C;&#x5B66;&#x4E00;&#x5B9A;&#x4E86;&#x89E3;React-Router&#xFF0C;&#x8FD9;&#x4E2A;&#x51E0;&#x4E4E;&#x662F;React&#x5355;&#x9875;&#x9762;&#x5E94;&#x7528;&#x5FC5;&#x5907;&#x7684;&#x8DEF;&#x7531;&#x6846;&#x67B6;&#x3002;&#x5982;&#x679C;&#x6709;&#x8DB3;&#x591F;&#x591A;&#x7684;&#x5F00;&#x53D1;&#x7ECF;&#x9A8C;&#xFF0C;&#x4F60;&#x4E00;&#x5B9A;&#x4F1A;&#x53D1;&#x73B0;React-Router&#x7684;&#x5F88;&#x591A;&#x95EE;&#x9898;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;&#x6CA1;&#x6709;&#x9875;&#x9762;&#x7F13;&#x5B58;&#x3001;&#x4E0D;&#x80FD;&#x4F20;&#x9012;&#x5C5E;&#x6027;&#x3001;&#x8131;&#x79BB;JSX&#x7684;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x548C;&#x8FC7;&#x6EE4;&#x5668;&#x5B9E;&#x73B0;&#x7B49;&#xFF0C;&#x8FD9;&#x4E9B;&#x95EE;&#x9898;&#x5C24;&#x5176;&#x5728;&#x79FB;&#x52A8;&#x7AEF;&#x8868;&#x73B0;&#x95EE;&#x9898;&#x66F4;&#x591A;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x6765;&#x63A8;&#x8350;&#x4E00;&#x6B3E;&#x66F4;&#x5F3A;&#x5927;&#x7684;React&#x8DEF;&#x7531;&#x5668;&#xFF1A;React-Keeper&#xFF0C;&#x4E00;&#x4E2A;&#x6BD4;React-Router&#x66F4;&#x7075;&#x6D3B;&#x3001;&#x66F4;&#x9002;&#x7528;&#x4E8E;&#x79FB;&#x52A8;&#x7AEF;&#x3001;&#x8DEF;&#x7531;&#x529F;&#x80FD;&#x66F4;&#x5065;&#x58EE;&#x7684;&#x6846;&#x67B6;&#xFF0C;React-Keeper&#x9664;&#x4E86;&#x57FA;&#x7840;&#x529F;&#x80FD;&#x66F4;&#x5F3A;&#x5927;&#x4EE5;&#x5916;&#xFF0C;&#x7279;&#x522B;&#x5BF9;&#x79FB;&#x52A8;APP&#x7684;&#x8DEF;&#x7531;&#x505A;&#x4E86;&#x589E;&#x5F3A;&#xFF0C;&#x80FD;&#x591F;&#x6EE1;&#x8DB3;&#x66F4;&#x4E30;&#x5BCC;&#x7684;&#x79FB;&#x52A8;&#x7AEF;&#x573A;&#x666F;&#x3002;</p><p>React-Keeper&#x5438;&#x6536;&#x4E86;React-Router&#x7684;&#x601D;&#x60F3;&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x4E0E;React-Router&#x76F8;&#x4F3C;&#x5EA6;&#x5F88;&#x5927;&#xFF0C;&#x90FD;&#x63D0;&#x4F9B;&#x4E86;Route&#x7EC4;&#x4EF6;&#x548C;Link&#x7EC4;&#x4EF6;&#xFF0C;&#x57FA;&#x672C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;React-Router&#x7684;&#x5E73;&#x6ED1;&#x8FC1;&#x79FB;&#x3002;React-Keeper&#x7684;&#x57FA;&#x7840;&#x6559;&#x7A0B;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x5176;Github &#xFF1A; Github [React-Keeper]&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x91CD;&#x70B9;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;React-Keeper&#x7684;&#x7279;&#x6027;&#x3002;</p><h2 id="articleHeader1">&#x7279;&#x6027;&#x4ECB;&#x7ECD;</h2><h2 id="articleHeader2">1.&#x53EF;&#x6269;&#x5C55;&#x8DEF;&#x7531;</h2><p>&#x5141;&#x8BB8;&#x4F60;&#x5728;&#x4EFB;&#x4F55;&#x65F6;&#x95F4;&#x3001;&#x4EFB;&#x4F55;&#x7EC4;&#x4EF6;&#x5185;&#x6DFB;&#x52A0;&#x8DEF;&#x7531;&#x914D;&#x7F6E;&#x3002;&#x5982;&#x4E0B;&#x9762;&#xFF1A;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x8DEF;&#x7531;&#x5339;&#x914D;&#x7684;&#x7684;&#x7EC4;&#x4EF6;Products&#x4E2D;&#x518D;&#x6DFB;&#x52A0;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x3002;&#x8FD9;&#x79CD;&#x7279;&#x6027;&#xFF0C;&#x5BF9;&#x56E2;&#x961F;&#x5408;&#x4F5C;&#x5F00;&#x53D1;&#x5F88;&#x53CB;&#x597D;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x8DEF;&#x7531;&#x914D;&#x7F6E;&#x4E5F;&#x6309;&#x6A21;&#x5757;&#x5316;&#x7684;&#x5207;&#x5206;&#xFF1B;&#x4E5F;&#x975E;&#x5E38;&#x9002;&#x7528;&#x4E8E;&#x6709;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x9700;&#x6C42;&#x7684;&#x5927;&#x578B;&#x7F51;&#x7AD9;&#x3002;&#xFF08;&#x8FD9;&#x4E2A;&#x7279;&#x6027;&#x5728;React-Router&#x6700;&#x65B0;&#x7248;&#x4E2D;&#x4E5F;&#x5DF2;&#x7ECF;&#x5F97;&#x5230;&#x4E86;&#x652F;&#x6301;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const App = ()=&gt; {
    return (
      &lt;HashRouter&gt;
        &lt;div&gt;
          &lt;Route component={ Home } path=&quot;/&quot;/&gt;
          &lt;Route component={ Products } path=&quot;/products&quot;/&gt;
        &lt;/div&gt;
      &lt;/HashRouter&gt;
    )
  }
 
  const Products = ()=&gt; {
    return (
      &lt;div&gt;
        &lt;Route component={ ScienceProducts } path=&quot;/sci&quot; /&gt;
        &lt;Route component={ DailiUseProducts } path=&quot;/dai&quot; /&gt;
      &lt;/div&gt;
    )
  }
 
  ReactDOM.render(&lt;App/&gt;, document.getElementById(&apos;root&apos;))

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>const App = ()=&gt; {
    return (
      <span class="hljs-tag">&lt;<span class="hljs-name">HashRouter</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{</span> <span class="hljs-attr">Home</span> } <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/&quot;</span>/&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{</span> <span class="hljs-attr">Products</span> } <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/products&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">HashRouter</span>&gt;</span>
    )
  }
 
  const Products = ()=&gt; {
    return (
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{</span> <span class="hljs-attr">ScienceProducts</span> } <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/sci&quot;</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{</span> <span class="hljs-attr">DailiUseProducts</span> } <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/dai&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
 
  ReactDOM.render(<span class="hljs-tag">&lt;<span class="hljs-name">App</span>/&gt;</span>, document.getElementById(&apos;root&apos;))

</code></pre><h2 id="articleHeader3">2.&#x9875;&#x9762;&#x7F13;&#x5B58;</h2><p>&#x5728;&#x79FB;&#x52A8;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x7ECF;&#x5E38;&#x4F1A;&#x9047;&#x5230;&#x8FD9;&#x6837;&#x7684;&#x573A;&#x666F;&#xFF1A;&#x5728;&#x4E00;&#x4E2A;&#x5217;&#x8868;&#x9875;&#x6D4F;&#x89C8;&#x4E86;&#x5F88;&#x4E45;&#xFF0C;&#x70B9;&#x51FB;&#x4E00;&#x9879;&#x8FDB;&#x5165;&#x8BE6;&#x60C5;&#x9875;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x8FD4;&#x56DE;&#x5230;&#x5217;&#x8868;&#x9875;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x5217;&#x8868;&#x9875;&#x80FD;&#x4FDD;&#x7559;&#x5728;&#x4E4B;&#x524D;&#x7684;&#x72B6;&#x6001;&#xFF08;&#x6EDA;&#x52A8;&#x4F4D;&#x7F6E;&#x3001;&#x4E34;&#x65F6;&#x64CD;&#x4F5C;&#x7B49;&#xFF09;&#xFF0C;React-Router&#x65E0;&#x6CD5;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5728;&#x8FD4;&#x56DE;&#x540E;&#x5217;&#x8868;&#x9875;&#x7684;DOM&#x8981;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x4E0D;&#x5F97;&#x4E0D;&#x91CD;&#x65B0;&#x624B;&#x52A8;&#x627E;&#x56DE;&#x4E4B;&#x524D;&#x7684;&#x72B6;&#x6001;&#xFF08;&#x6EDA;&#x52A8;&#x5230;&#x4E4B;&#x524D;&#x7684;&#x4F4D;&#x7F6E;&#xFF09;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x7F13;&#x5B58;&#x673A;&#x5236;&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;&#x6240;&#x8C13;&#x9875;&#x9762;&#x7F13;&#x5B58;&#xFF0C;&#x5373;&#x5F53;&#x5730;&#x5740;&#x4E0E;&#x8DEF;&#x7531;&#x4E0D;&#x5339;&#x914D;&#x65F6;&#xFF0C;&#x81EA;&#x52A8;&#x7F13;&#x5B58;&#x9875;&#x9762;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x5F53;&#x5339;&#x914D;&#x65F6;&#xFF0C;&#x518D;&#x5BF9;&#x9875;&#x9762;&#x8FDB;&#x884C;&#x8FD8;&#x539F;&#x3002;</p><p>&#x9875;&#x9762;&#x7F13;&#x5B58;&#x662F;React-Keeper&#x7684;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x7279;&#x6027;&#xFF0C;&#x5176;&#x5185;&#x90E8;&#x96C6;&#x6210;&#x4E86;&#x7F13;&#x5B58;&#x7BA1;&#x7406;&#x5668;&#xFF0C;&#x53EF;&#x4EE5;&#x5BF9;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x7684;&#x7ED1;&#x5B9A;&#x4E0E;&#x89E3;&#x7ED1;&#x8FDB;&#x884C;&#x4EE3;&#x7406;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x4E86;&#x9875;&#x9762;&#x7F13;&#x5B58;&#x3002;React-Keeper&#x63D0;&#x4F9B;&#x4E86;3&#x79CD;&#x9875;&#x9762;&#x7F13;&#x5B58;&#x65B9;&#x5F0F;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x5206;&#x522B;&#x8FDB;&#x884C;&#x4ECB;&#x7ECD;&#x3002;</p><h2 id="articleHeader4">2.1 cache&#x5C5E;&#x6027;</h2><p>&#x6240;&#x6709;&#x6DFB;&#x52A0;&#x4E86;cache&#x5C5E;&#x6027;&#x7684;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#xFF0C;React-Keeper&#x7F13;&#x5B58;&#x7BA1;&#x7406;&#x5668;&#x90FD;&#x4F1A;&#x9875;&#x9762;&#x8FDB;&#x884C;&#x4EE3;&#x7406;&#x3002;&#x5728;&#x4E0B;&#x9762;&#x7684;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;Home&#x3001;AboutUs&#x9875;&#x9762;&#x4F1A;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x4EE3;&#x7406;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends React.Component {
 
  render() {
 
    return (
      &lt;HashRouter&gt;
        &lt;div&gt;
          &lt;Route cache component={Home} path=&apos;/&apos;/&gt;
 
          &lt;Route component={Host} path=&apos;/host&apos; /&gt;
 
          &lt;Route cache=&apos;parent&apos; path=&apos;/aboutus&apos; component={AboutUs}/&gt;
 
        &lt;/div&gt;
      &lt;/HashRouter&gt;
    )
  }
}
 
ReactDOM.render(&lt;App/&gt;, document.getElementById(&apos;root&apos;))
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
 
  render() {
 
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">HashRouter</span>&gt;
        &lt;div&gt;
          &lt;<span class="hljs-type">Route</span> cache component={<span class="hljs-type">Home</span>} path=&apos;/&apos;/&gt;
 
          &lt;<span class="hljs-type">Route</span> component={<span class="hljs-type">Host</span>} path=&apos;/host&apos; /&gt;
 
          &lt;<span class="hljs-type">Route</span> cache=<span class="hljs-symbol">&apos;paren</span>t&apos; path=&apos;/aboutus&apos; component={<span class="hljs-type">AboutUs</span>}/&gt;
 
        &lt;/div&gt;
      &lt;/<span class="hljs-type">HashRouter</span>&gt;
    )
  }
}
 
<span class="hljs-type">ReactDOM</span>.render(&lt;<span class="hljs-type">App</span>/&gt;, document.getElementById(<span class="hljs-symbol">&apos;roo</span>t&apos;))
</code></pre><p>cache&#x5C5E;&#x6027;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;&#x503C;&#xFF0C;React-Keeper&#x652F;&#x6301;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x6709;root&#xFF08;default&#xFF09;&#x3001;parent&#x3002;</p><p>cache=&apos;root&apos;&#xFF08;&#x6216;cache&#xFF09;&#x4E3A;&#x6C38;&#x4E45;&#x7F13;&#x5B58;&#xFF0C;&#x53EA;&#x8981;&#x6839;&#x7EC4;&#x4EF6;&#x4E0D;&#x89E3;&#x7ED1;&#xFF0C;&#x9875;&#x9762;&#x5C06;&#x6C38;&#x4E45;&#x7F13;&#x5B58;&#x3002;</p><p>cache=&apos;parent&apos;&#x4E3A;&#x7236;&#x7EC4;&#x4EF6;&#x7F13;&#x5B58;&#xFF0C;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E0D;&#x89E3;&#x7ED1;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x4F1A;&#x7EF4;&#x6301;&#x7F13;&#x5B58;&#x72B6;&#x6001;&#x3002;</p><h2 id="articleHeader5">2.2 CacheLink&#x7EC4;&#x4EF6;</h2><p>React-Keeper&#x989D;&#x5916;&#x63D0;&#x4F9B;&#x4E86;CacheLink&#x7EC4;&#x4EF6;&#xFF0C;&#x7EE7;&#x627F;&#x81EA;Link&#xFF0C;&#x6545;&#x6709;Link&#x7EC4;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x7279;&#x6027;&#xFF0C;&#x6B64;&#x5916;&#xFF0C;&#x5176;&#x5185;&#x90E8;&#x5BF9;&#x63A5;&#x4E86;&#x7F13;&#x5B58;&#x7BA1;&#x7406;&#x5668;&#xFF0C;&#x53EF;&#x4EE5;&#x5BF9;&#x94FE;&#x63A5;&#x8DF3;&#x8F6C;&#x73AF;&#x8282;&#x8FDB;&#x884C;&#x4EE3;&#x7406;&#x3002;</p><p>CacheLink&#x7F13;&#x5B58;&#x4E3A;&#x4E34;&#x65F6;&#x7F13;&#x5B58;&#xFF0C;&#x5F53;&#x4F7F;&#x7528;&#x5176;&#x65B0;&#x6253;&#x5F00;&#x9875;&#x9762;&#x65F6;&#xFF0C;&#x7F13;&#x5B58;&#x7BA1;&#x7406;&#x5668;&#x4F1A;&#x4E34;&#x65F6;&#x7F13;&#x5B58;&#x94FE;&#x63A5;&#x7684;&#x6765;&#x6E90;&#x9875;&#x9762;&#xFF0C;&#x5F53;&#x8FD4;&#x56DE;&#x65F6;&#x81F3;&#x4E4B;&#x524D;&#x9875;&#x9762;&#xFF08;&#x6216;&#x8DEF;&#x7531;&#x72B6;&#x6001;&#x53D8;&#x66F4;&#xFF09;&#x65F6;&#xFF0C;&#x63D0;&#x53D6;&#x7F13;&#x5B58;&#x9875;&#x9762;&#x4EE5;&#x5C55;&#x793A;&#xFF0C;&#x5E76;&#x6E05;&#x9664;&#x7F13;&#x5B58;&#x3002;</p><p>&#x8FD9;&#x79CD;&#x7279;&#x6027;&#x9002;&#x7528;&#x4E8E;&#x975E;&#x5E38;&#x7528;&#x5217;&#x8868;&#x9875;&#x7684;&#x7F13;&#x5B58;&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;<br>&lt;ul className=&apos;nav navbar-nav&apos;&gt;<br>&lt;li&gt;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Link to=&apos;/&apos;&gt;Home&lt;/Link&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-keyword">Link</span> <span class="hljs-keyword">to</span>=<span class="hljs-string">&apos;/&apos;</span>&gt;Home&lt;/<span class="hljs-keyword">Link</span>&gt;</code></pre><p>&lt;/li&gt;<br>&lt;li&gt;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;CacheLink to=&apos;/product/ASDFADF&apos;&gt;Detail&lt;/CacheLink&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">CacheLink</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&apos;/product/ASDFADF&apos;</span>&gt;</span>Detail<span class="hljs-tag">&lt;/<span class="hljs-name">CacheLink</span>&gt;</span></code></pre><p>&lt;/li&gt;<br>&lt;/ul&gt;</p><h2 id="articleHeader6">3.&#x6807;&#x7B7E;&#x5316;&#x8FC7;&#x6EE4;&#x5668;</h2><p>&#x5728;React-Keeper&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E3A;&#x6BCF;&#x4E00;&#x4E2A;Route&#x7EC4;&#x4EF6;&#x5355;&#x72EC;&#x5B9A;&#x4E49;&#x591A;&#x4E2A;&#x8FC7;&#x6EE4;&#x5668;&#xFF0C;&#x5F53;&#x8FC7;&#x6EE4;&#x5668;&#x9A8C;&#x8BC1;&#x901A;&#x8FC7;&#x540E;&#x624D;&#x80FD;&#x8FDB;&#x884C;&#x4E0B;&#x9762;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;Route&#x652F;&#x6301;&#x4E24;&#x7C7B;&#x8FC7;&#x6EE4;&#x5668;&#xFF1A;&#x7ED1;&#x5B9A;&#x8FC7;&#x6EE4;&#x5668;&#x3001;&#x89E3;&#x7ED1;&#x8FC7;&#x6EE4;&#x5668;&#x3002;</p><p>&#x8FC7;&#x6EE4;&#x5668;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x6700;&#x5E38;&#x7528;&#x7684;&#x5E94;&#x8BE5;&#x5C31;&#x662F;&#x767B;&#x5F55;&#x9A8C;&#x8BC1;&#xFF0C;&#x5BF9;&#x4E8E;&#x67D0;&#x4E9B;&#x9700;&#x8981;&#x767B;&#x5F55;&#x540E;&#x624D;&#x80FD;&#x8BBF;&#x95EE;&#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x767B;&#x5F55;&#x68C0;&#x6D4B;&#x901A;&#x8FC7;&#x540E;&#x518D;&#x8FDB;&#x884C;&#x9875;&#x9762;&#x7ED1;&#x5B9A;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5148;&#x8DF3;&#x8F6C;&#x9875;&#x9762;&#x518D;&#x8FDB;&#x884C;&#x9A8C;&#x8BC1;&#x3002;&#x4E0B;&#x9762;&#x662F;React-Keeper&#x5B98;&#x7F51;&#x767B;&#x5F55;&#x8FC7;&#x6EE4;&#x7684;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Define a fllter, and run over it or not.
 
// receive &apos;props&apos;
const loginFilter = (callback, props)=&gt; {
  
  if(!props.host) {
 
    // dynamicly request data (use jQuery ajax)
    $.ajax({
      url: &apos;host/login.do&apos;,
      data: {},
      succeed: function(data){
        if(data.host){
 
          // run &apos;callback&apos; function to enter next step (render component or next filter)
          callback()            
        }
      },
      error: function(){
 
      },
      dataType: &apos;json&apos;
    })
  }
}
 
// Added to Route Component
// Single Filter
&lt;HashRouter&gt;
  &lt;Route path=&apos;/user&apos; component={User}, enterFilter={ loginFilter } /&gt;
&lt;/HashRouter&gt;
 
// Multiple Filters
&lt;HashRouter&gt;
  &lt;Route path=&apos;/user&apos; component={User}, enterFilter={[ loginFilter, permitFilter1, permitFilter2 ] } /&gt;
&lt;/HashRouter&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// Define a fllter, and run over it or not.</span>
 
<span class="hljs-comment">// receive &apos;props&apos;</span>
<span class="hljs-keyword">const</span> loginFilter = <span class="hljs-function">(<span class="hljs-params">callback, props</span>)=&gt;</span> {
  
  <span class="hljs-keyword">if</span>(!props.host) {
 
    <span class="hljs-comment">// dynamicly request data (use jQuery ajax)</span>
    $.ajax({
      <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;host/login.do&apos;</span>,
      <span class="hljs-attr">data</span>: {},
      <span class="hljs-attr">succeed</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-keyword">if</span>(data.host){
 
          <span class="hljs-comment">// run &apos;callback&apos; function to enter next step (render component or next filter)</span>
          callback()            
        }
      },
      <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 
      },
      <span class="hljs-attr">dataType</span>: <span class="hljs-string">&apos;json&apos;</span>
    })
  }
}
 
<span class="hljs-comment">// Added to Route Component</span>
<span class="hljs-comment">// Single Filter</span>
&lt;HashRouter&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/user&apos;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{User},</span> <span class="hljs-attr">enterFilter</span>=<span class="hljs-string">{</span> <span class="hljs-attr">loginFilter</span> } /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">HashRouter</span>&gt;</span></span>
 
<span class="hljs-comment">// Multiple Filters</span>
&lt;HashRouter&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/user&apos;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{User},</span> <span class="hljs-attr">enterFilter</span>=<span class="hljs-string">{[</span> <span class="hljs-attr">loginFilter</span>, <span class="hljs-attr">permitFilter1</span>, <span class="hljs-attr">permitFilter2</span> ] } /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">HashRouter</span>&gt;</span></span>
</code></pre><h2 id="articleHeader7">4.&#x6807;&#x7B7E;&#x5316;&#x52A8;&#x6001;&#x52A0;&#x8F7D;</h2><p>React-Keeper&#x652F;&#x6301;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#x52A0;&#x8F7D;&#xFF0C;&#x800C;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x4E5F;&#x662F;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5728;Route&#x7EC4;&#x4EF6;&#x884C;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x3002;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Route loadComponent={ (callback)=&gt;{
  System.import(&apos;../Products.js&apos;).then((Products)=&gt;{
      callback(Products)
    })
  } } path=&apos;/products&apos;&gt; 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>&lt;Route loadComponent={ (callback)=&gt;{
  System.<span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;../Products.js&apos;</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(Products)</span>=&gt;</span>{
      callback(Products)
    })
  } } path=<span class="hljs-string">&apos;/products&apos;</span>&gt; 
</code></pre><p>&#x5728;React-Keeper&#x7684;&#x5185;&#x90E8;&#x5904;&#x7406;&#x4E2D;&#xFF0C;&#x5F53;path&#x5339;&#x914D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x624D;&#x4F1A;&#x8FDB;&#x884C;&#x6587;&#x4EF6;&#x7684;&#x52A0;&#x8F7D;&#xFF0C;&#x8FD9;&#x5BF9;&#x4E8E;&#x5927;&#x578B;&#x7684;WEB&#x5E94;&#x7528;&#x65E0;&#x7591;&#x662F;&#x975E;&#x5E38;&#x5FC5;&#x8981;&#x7684;&#x3002;</p><p>&#x6CE8;&#x610F;&#xFF1A;&#x8FC7;&#x6EE4;&#x5668;&#x7684;&#x8FD0;&#x884C;&#xFF0C;&#x5728;&#x52A8;&#x6001;&#x6587;&#x4EF6;&#x52A0;&#x8F7D;&#x4E4B;&#x540E;&#x3002;</p><h2 id="articleHeader8">5.&#x7075;&#x6D3B;&#x7684;&#x914D;&#x7F6E;</h2><ol><li>React-Keeper&#x7684;Route&#x7EC4;&#x4EF6;&#x652F;&#x6301;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x4F1A;&#x5C06;&#x6240;&#x6709;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5C5E;&#x6027;&#x4F20;&#x9012;&#x7ED9;&#x8981;&#x6E32;&#x67D3;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</li><li><p>React-Keeper&#x7684;&#x914D;&#x7F6E;&#x76F8;&#x5F53;&#x7075;&#x6D3B;&#xFF0C;&#x53EF;&#x4EE5;&#x5168;&#x90E8;&#x91C7;&#x7528;&#x7EC4;&#x4EF6;&#x5C5E;&#x6027;&#x5316;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x6BD4;&#x5982;index&#x3001;cache&#x3001;miss&#x7B49;&#xFF0C;&#x4EE5;&#x4E0B;&#x662F;Route&#x7EC4;&#x4EF6;&#x6240;&#x6709;&#x7684;&#x4FDD;&#x7559;&#x8BCD;&#xFF1A;</p><p>index : &#x5165;&#x53E3;&#x7EC4;&#x4EF6;</p><p>miss : &#x5730;&#x5740;&#x4E0D;&#x5339;&#x914D;&#x65F6;&#x6E32;&#x67D3;&#x7684;&#x7EC4;&#x4EF6;</p><p>cache : &#x7F13;&#x5B58;&#x6807;&#x8BB0;</p><p>redirect : &#x91CD;&#x5B9A;&#x5411;&#x5730;&#x5740; (&#x5F53;&#x7EC4;&#x4EF6;&#x6EE1;&#x8DB3;&#x6E32;&#x67D3;&#x6761;&#x4EF6;&#x65F6;&#x624D;&#x4F1A;&#x6267;&#x884C;)</p><p>path : &#x5339;&#x914D;&#x5730;&#x5740;&#x89C4;&#x5219;</p><p>component &#xFF1A;&#x8981;&#x5339;&#x914D;&#x7684;&#x7EC4;&#x4EF6;</p><p>loadComponent : &#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;</p><p>enterFilter : &#x6302;&#x8F7D;&#x8FC7;&#x6EE4;&#x5668;</p><p>leaveFilter : &#x5378;&#x8F7D;&#x8FC7;&#x6EE4;&#x5668;</p><p>offDirtyCheck : &#x5173;&#x95ED;&#x810F;&#x68C0;&#x67E5;&#x3002;React-Keep&#x4F1A;&#x9ED8;&#x8BA4;&#x542F;&#x7528;&#x810F;&#x68C0;&#x67E5;&#xFF0C;&#x4EE5;&#x907F;&#x514D;&#x5730;&#x5740;&#x53D8;&#x66F4;&#x65F6;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x6E32;&#x67D3;</p><p>&lt;HashRouter&gt;<br>&lt;div&gt;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Route index component={Home} path=&apos;/&apos;/&gt;

&lt;Route cache component={Host} path=&apos;/host&apos; /&gt;

&lt;Route miss path=&apos;/aboutus&apos; component={AboutUs}/&gt;

&lt;Route path=&apos;/other&apos; redirect=&apos;/redirect&apos;/&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">index</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/&apos;</span>/&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">cache</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Host}</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/host&apos;</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">miss</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/aboutus&apos;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{AboutUs}/</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/other&apos;</span> <span class="hljs-attr">redirect</span>=<span class="hljs-string">&apos;/redirect&apos;</span>/&gt;</span>
</code></pre><p>&lt;/div&gt;<br>&lt;/HashRouter&gt;</p></li></ol><h2 id="articleHeader9">&#x5199;&#x5728;&#x6700;&#x540E;</h2><p>&#x8BFB;React-Keeper&#x6E90;&#x7801;&#xFF0C;&#x53D1;&#x73B0;&#x5185;&#x90E8;&#x6709;&#x51E0;&#x70B9;&#x503C;&#x5F97;React&#x5F00;&#x53D1;&#x8005;&#x501F;&#x9274;&#x7684;&#x5730;&#x65B9;&#xFF1A;</p><ol><li>&#x53EF;&#x6269;&#x5C55;&#x8DEF;&#x7531;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x91C7;&#x7528;&#x4E86;&#x8BA2;&#x9605;&#x6A21;&#x5F0F;&#xFF0C;&#x8FDB;&#x884C;Route&#x7684;&#x96C6;&#x4E2D;&#x7BA1;&#x7406;&#xFF0C;&#x901A;&#x8FC7;&#x51CF;&#x5C11;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x4FDD;&#x8BC1;&#x4E86;&#x8DEF;&#x7531;&#x7BA1;&#x7406;&#x7684;&#x6548;&#x7387;&#x3002;</li><li>&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;&#x6570;&#x636E;&#x810F;&#x68C0;&#x67E5;&#xFF0C;&#x907F;&#x514D;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x6E32;&#x67D3;&#x3002;</li><li>&#x7F13;&#x5B58;&#x7BA1;&#x7406;&#x662F;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x4E2A;&#x6838;&#x5FC3;&#x529F;&#x80FD;&#xFF0C;React-Keeper&#x5185;&#x90E8;&#x96C6;&#x6210;&#x4E86;&#x4E24;&#x4E2A;&#x7F13;&#x5B58;&#x7BA1;&#x7406;&#x5668;&#xFF0C;&#x5E76;&#x5728;&#x6BCF;&#x6B21;&#x5730;&#x5740;&#x53D8;&#x66F4;&#x65F6;&#x5BF9;&#x7F13;&#x5B58;&#x8FDB;&#x884C;&#x6E05;&#x7406;&#x3002;</li><li>&#x96C6;&#x6210;&#x4E86;&#x5730;&#x5740;&#x5339;&#x914D;&#x7F13;&#x5B58;&#x4EE5;&#x63D0;&#x9AD8;&#x5339;&#x914D;&#x7684;&#x6548;&#x7387;&#x3002;</li><li>&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;(Stateless Component)&#x7684;&#x7BA1;&#x7406;&#xFF0C;&#x4F7F;&#x7528;react-funtional&#x5E93;&#x5C06;&#x7EC4;&#x4EF6;&#x8F6C;&#x6362;&#x4E3A;&#x6709;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;&#x3002;</li></ol><p>React-Keeper&#x8FD8;&#x662F;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x65B0;&#x7684;&#x6846;&#x67B6;&#xFF0C;&#x56FD;&#x5185;&#x5916;&#x5B9E;&#x8DF5;&#x7684;&#x4EBA;&#x8FD8;&#x6BD4;&#x8F83;&#x5C11;&#x3002;&#x4ECE;&#x6E90;&#x7801;&#x7EA7;&#x522B;&#x770B;&#x5176;&#x5B9E;&#x73B0;&#xFF0C;&#x5728;&#x524D;&#x7AEF;&#x4E16;&#x754C;&#x4F17;&#x591A;&#x800C;&#x6742;&#x4E71;&#x7684;&#x5F00;&#x6E90;&#x6846;&#x67B6;&#x4E2D;&#xFF0C;&#x7B97;&#x662F;&#x8D28;&#x91CF;&#x5F88;&#x9AD8;&#x7684;&#x4E00;&#x4E2A;&#x3002;</p><p>&#x9644;&#x5F55;<br>Github : <a href="https://github.com/vifird/react-keeper" rel="nofollow noreferrer" target="_blank">https://github.com/vifird/rea...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React-Keeper 前端路由缓存 存储状态（大部分转）

## 原文链接
[https://segmentfault.com/a/1190000016621746](https://segmentfault.com/a/1190000016621746)

