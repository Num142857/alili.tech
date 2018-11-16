---
title: 用vue从零开发和部署一款移动端pwa单页应用
hidden: true
categories: [reprint]
slug: 440321a9
date: 2018-11-06 02:30:12
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x6700;&#x8FD1;&#x79CB;&#x62DB;&#x4E4B;&#x4F59;&#x7A7A;&#x51FA;&#x65F6;&#x95F4;&#x6765;&#x6309;&#x81EA;&#x5DF1;&#x7684;&#x5174;&#x8DA3;&#x52A8;&#x624B;&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#xFF0C;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;<code>vue-cli3.0, vue&#xFF0C;typescript</code>&#x7684;&#x79FB;&#x52A8;&#x7AEF;pwa&#xFF0C;&#x73B0;&#x5728;&#x8D81;&#x70ED;&#x6253;&#x94C1;&#xFF0C;&#x5C06;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x4ECE;&#x5F00;&#x53D1;&#x5230;&#x90E8;&#x7F72;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;&#xFF0C;&#x5E76;&#x5C06;&#x4ECE;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x4E2D;&#x5B66;&#x4E60;&#x5230;&#x7684;&#x4E1C;&#x897F;&#x5206;&#x4EAB;&#x51FA;&#x6765;&#xFF0C;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x6709;&#x4EC0;&#x4E48;&#x610F;&#x89C1;&#x6216;&#x8865;&#x5145;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x8BC4;&#x8BBA;&#x533A;&#x63D0;&#x51FA;&#x3002;&#x5148;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;</p><h2 id="articleHeader1">&#x9879;&#x76EE;&#x4ECB;&#x7ECD;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000016477427?w=714&amp;h=292" src="https://static.alili.tech/img/remote/1460000016477427?w=714&amp;h=292" alt="browseexp" title="browseexp" style="cursor:pointer;display:inline"></span></p><p>&#x57FA;&#x4E8E;vue&#xFF0C;typescript&#xFF0C;pwa&#x7684;&#x4E00;&#x4E2A;&#x79FB;&#x52A8;&#x7AEF;webapp&#xFF0C;&#x53D6;&#x540D;&#x53EB;browseExp&#xFF0C;&#x4E3B;&#x8981;&#x529F;&#x80FD;&#x662F;&#x6D4F;&#x89C8;&#x5B66;&#x6821;&#x5FC3;&#x7406;&#x5B66;&#x9662;&#x90E8;&#x5206;&#x5B9E;&#x9A8C;&#x4FE1;&#x606F;&#x3002;&#xFF08;&#x4E0A;&#x56FE;&#x662F;&#x6DFB;&#x52A0;&#x5230;&#x684C;&#x9762;&#x7684;&#x4E00;&#x7EA7;&#x5165;&#x53E3;&#xFF09;&#x3002;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x5DF2;&#x7ECF;&#x90E8;&#x7F72;&#x5230;&#x4E86;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;&#x9879;&#x76EE;&#x6700;&#x7EC8;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x8FD0;&#x884C;&#x7684;&#x6837;&#x5B50;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016477428?w=300&amp;h=519" src="https://static.alili.tech/img/remote/1460000016477428?w=300&amp;h=519" alt="show" title="show" style="cursor:pointer"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6211;&#x901A;&#x8FC7;&#x684C;&#x9762;&#x4E0A;&#x7684;&#x4E00;&#x7EA7;&#x5165;&#x53E3;&#xFF0C;&#x8FDB;&#x5165;&#x4E86;&#x6211;&#x4EEC;&#x7684;webapp&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x65AD;&#x7F51;&#x7684;&#x6761;&#x4EF6;&#x4E0B;&#x8FDB;&#x884C;&#x3002;&#x8FD9;&#x5C31;&#x662F;pwa&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x4E0B;&#x9762;&#x5F00;&#x59CB;&#x5206;&#x4EAB;&#x8FD9;&#x6B21;&#x7684;&#x5F00;&#x53D1;&#x5230;&#x90E8;&#x7F72;&#x7684;&#x8FC7;&#x7A0B;&#x3002;</p><h2 id="articleHeader2">&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x505A;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x5462;&#xFF1F;</h2><ol><li>pwa &#x5728;&#x56FD;&#x5185;&#x5DF2;&#x7ECF;&#x706B;&#x8FC7;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x81EA;&#x5DF1;&#x8FD8;&#x6CA1;&#x505A;&#x8FC7;&#x4E00;&#x6B3E;pwa&#x5E94;&#x7528;&#x3002;</li><li>vue-cli 3.0 &#x589E;&#x52A0;&#x4E86;&#x5BF9;pwa&#x7684;&#x652F;&#x6301;</li><li>vue2.5&#x540E;&#x589E;&#x52A0;&#x4E86;&#x5BF9;ts&#x7684;&#x652F;&#x6301;</li><li>&#x60F3;&#x641E;&#x4E8B;&#x60C5;&#xFF01;</li></ol><h2 id="articleHeader3">&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;</h2><p>&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x5730;&#x5740;&#x4E3A;: <a href="https://github.com/HolyZheng/BrowseExp" rel="nofollow noreferrer" target="_blank">browseExp pwa</a>&#xFF0C;&#x60F3;&#x8981;&#x67E5;&#x770B;&#x4EE3;&#x7801;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x770B;&#x4E00;&#x4E0B;&#x3002;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x70B9;&#x4E3B;&#x8981;&#x662F;&#xFF1A;</p><ul><li>&#x5728;vue&#x4E2D;&#x4F7F;&#x7528;ts</li><li>&#x7B80;&#x5355;&#x9AA8;&#x67B6;&#x5C4F;&#x7684;&#x8FD0;&#x7528;</li><li>&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;&#x548C;seo&#x7684;&#x4F18;&#x5316;</li><li>pwa&#x76F8;&#x5173;&#x7279;&#x6027;&#x7684;&#x5B9E;&#x73B0;</li><li>&#x79FB;&#x52A8;&#x7AEF;&#x7684;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#x89E3;&#x51B3;</li><li>&#x5982;&#x4F55;&#x90E8;&#x7F72;&#x9879;&#x76EE;</li></ul><p>&#x540E;&#x9762;&#x7684;&#x5185;&#x5BB9;&#x4E5F;&#x56F4;&#x7ED5;&#x7740;&#x8FD9;&#x4E9B;&#x70B9;&#x6765;&#x5C55;&#x5F00;&#x3002;</p><h3 id="articleHeader4">vue&#x4E2D;&#x4F7F;&#x7528;ts</h3><p>&#x4F7F;&#x7528;ts&#x4E3B;&#x8981;&#x662F;&#x56E0;&#x4E3A;ts&#x7ED9;&#x6211;&#x4EEC;&#x5E26;&#x6765;&#x4E86;&#x7C7B;&#x578B;&#x7CFB;&#x7EDF;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x5199;&#x51FA;&#x5065;&#x58EE;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5B83;&#x7684;&#x4F5C;&#x7528;&#x5728;&#x5927;&#x578B;&#x9879;&#x76EE;&#x4E2D;&#x5C24;&#x5176;&#x7A81;&#x51FA;&#xFF0C;&#x6240;&#x4EE5;&#x8FD8;&#x662F;&#x975E;&#x5E38;&#x9F13;&#x52B1;&#x5927;&#x5BB6;&#x53BB;&#x4F7F;&#x7528;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;ts&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x4E00;&#x822C;&#x662F;&#x7F16;&#x5199;&#x57FA;&#x4E8E;&#x7C7B;&#x7684;vue&#x7EC4;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5B98;&#x65B9;&#x7EF4;&#x62A4;&#x7684;<a href="https://github.com/vuejs/vue-class-component" rel="nofollow noreferrer" target="_blank">vue-class-component</a>&#x6216;&#x8005;<a href="https://github.com/kaorun343/vue-property-decorator" rel="nofollow noreferrer" target="_blank">vue-property-decorator</a>&#xFF0C;vue-cli3.0&#x4E5F;&#x7ED9;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86;&#x5F00;&#x7BB1;&#x5373;&#x7528;&#x7684;typescript&#x652F;&#x6301;&#xFF0C;&#x5F00;&#x53D1;&#x4F53;&#x9A8C;&#x8FD8;&#x662F;&#x76F8;&#x5F53;&#x53CB;&#x597D;&#x7684;&#x3002;&#x4E00;&#x4E2A;vue&#x7EC4;&#x4EF6;demo&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, Vue, Prop } from &apos;vue-property-decorator&apos;;
@Component
export default class Name extends Vue {
  @Prop() private name!: string;
  private complete!: boolean;
  private data() {
    return {
      complete: false,
    };
  }
  private myMethod() {
    // ...
  }
  private created() {
    // ...
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> { <span class="hljs-type">Component</span>, <span class="hljs-type">Vue</span>, <span class="hljs-type">Prop</span> } from <span class="hljs-symbol">&apos;vue</span>-property-decorator&apos;;
<span class="hljs-meta">@Component</span>
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Name</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
  <span class="hljs-meta">@Prop</span>() <span class="hljs-keyword">private</span> name!: string;
  <span class="hljs-keyword">private</span> complete!: boolean;
  <span class="hljs-keyword">private</span> data() {
    <span class="hljs-keyword">return</span> {
      complete: <span class="hljs-literal">false</span>,
    };
  }
  <span class="hljs-keyword">private</span> myMethod() {
    <span class="hljs-comment">// ...</span>
  }
  <span class="hljs-keyword">private</span> created() {
    <span class="hljs-comment">// ...</span>
  }
}</code></pre><p>&#x53E6;&#x5916;&#xFF0C;&#x5728;vue-cli3.0&#x63D0;&#x4F9B;&#x7684;&#x811A;&#x624B;&#x67B6;&#x4E0B;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;<code>shims-tsx.d.ts</code>&#x6587;&#x4EF6;&#x4E0B;&#x6DFB;&#x52A0;&#x5168;&#x5C40;&#x63A5;&#x53E3;&#x6216;&#x53D8;&#x91CF;&#x7B49;&#xFF0C;&#x5728;<code>shims-vue.d.ts</code>&#x5B9A;&#x4E49;&#x7B2C;&#x4E09;&#x65B9;&#x5305;&#x7684;&#x7C7B;&#x578B;&#x58F0;&#x660E;&#x3002;</p><h3 id="articleHeader5">&#x9AA8;&#x67B6;&#x5C4F;&#x7684;&#x7B80;&#x5355;&#x8FD0;&#x7528;</h3><p>&#x9AA8;&#x67B6;&#x5C4F;&#xFF08;skeleton screen&#xFF09;&#x5DF2;&#x7ECF;&#x4E0D;&#x662F;&#x4EC0;&#x4E48;&#x65B0;&#x5947;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x4ED6;&#x7684;&#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x7528;&#x6765;&#x8FC7;&#x6E21;&#x9875;&#x9762;&#x7684;&#x7A7A;&#x767D;&#x72B6;&#x6001;&#xFF0C;&#x63D0;&#x5347;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#xFF0C;&#x6BD4;&#x5982;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#x7B49;&#x5F85;&#xFF0C;&#x6570;&#x636E;&#x52A0;&#x8F7D;&#x7B49;&#x5F85;&#x7B49;&#xFF0C;&#x4F20;&#x7EDF;&#x7684;&#x9AA8;&#x67B6;&#x5E73;&#x5B9E;&#x73B0;&#x65B9;&#x6848;&#x6709; &#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x548C;&#x9884;&#x6E32;&#x67D3;&#x7B49;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x4E2D;&#x5F15;&#x5165;&#x9AA8;&#x67B6;&#x5C4F;&#x4E3B;&#x8981;&#x662F;&#x60F3;&#x8FC7;&#x6E21;&#x6570;&#x636E;&#x52A0;&#x8F7D;&#x65F6;&#x9875;&#x9762;&#x7684;&#x5C40;&#x90E8;&#x7A7A;&#x767D;&#x72B6;&#x6001;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x76F4;&#x63A5;&#x91C7;&#x7528;&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x9AA8;&#x67B6;&#x5C4F;&#x7EC4;&#x4EF6;<a href="https://github.com/HolyZheng/BrowseExp/blob/master/src/components/Skeleton/SkeletonExp.vue" rel="nofollow noreferrer" target="_blank">SkeletonExp.vue</a>&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x8FC7;&#x6E21;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016477429?w=305&amp;h=441" src="https://static.alili.tech/img/remote/1460000016477429?w=305&amp;h=441" alt="skeletonOne" title="skeletonOne" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000016477430?w=308&amp;h=539" src="https://static.alili.tech/img/remote/1460000016477430?w=308&amp;h=539" alt="skeletonOne" title="skeletonOne" style="cursor:pointer;display:inline"></span></p><p>&#x5982;&#x679C;&#x4F60;&#x5BF9;&#x9AA8;&#x67B6;&#x5C4F;&#x6709;&#x66F4;&#x5927;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x7F51;&#x4E0A;&#x641C;&#x5230;&#x66F4;&#x591A;&#x7684;&#x6559;&#x7A0B;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x5217;&#x4E3E;&#x4E86;&#x3002;</p><h3 id="articleHeader6">&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;&#x548C;seo&#x7684;&#x4F18;&#x5316;</h3><p>&#x5355;&#x9875;&#x5E94;&#x7528;&#xFF08;single page web application&#xFF0C;SPA&#xFF09;&#x4E00;&#x4E2A;&#x7F3A;&#x70B9;&#x5C31;&#x662F;&#x9996;&#x6B21;&#x52A0;&#x8F7D;&#x9700;&#x8981;&#x52A0;&#x8F7D;&#x8F83;&#x591A;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x6240;&#x4EE5;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;&#x5C31;&#x4F1A;&#x6BD4;&#x8F83;&#x957F;&#x3002;&#x53E6;&#x5916;&#xFF0C;&#x5355;&#x9875;&#x5E94;&#x7528;&#x56E0;&#x4E3A;&#x6570;&#x636E;&#x524D;&#x7F6E;&#x5230;&#x4E86;&#x524D;&#x7AEF;&#xFF0C;&#x4E0D;&#x5229;&#x4E8E;&#x641C;&#x7D22;&#x5F15;&#x64CE;&#x7684;&#x6293;&#x53D6;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9;&#x81EA;&#x5DF1;&#x7684;&#x5355;&#x9875;&#x5E94;&#x7528;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x4F18;&#x5316;&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E86;<code>prerender-spa-plugin</code>&#x8FD9;&#x4E2A;webpack&#x63D2;&#x4EF6;&#xFF0C;&#x4ED6;&#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x5C06;&#x6211;&#x4EEC;&#x6307;&#x5B9A;&#x7684;&#x8DEF;&#x7531;&#x8FDB;&#x884C;&#x9884;&#x6E32;&#x67D3;&#x5230;html&#xFF0C;&#x8FDB;&#x800C;&#x89E3;&#x51B3;&#x9996;&#x6B21;&#x52A0;&#x8F7D;&#x767D;&#x5C4F;&#x65F6;&#x95F4;&#x957F;&#x95EE;&#x9898;&#xFF0C;&#x4EE5;&#x53CA;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x4E0A;&#x89E3;&#x51B3;seo&#x95EE;&#x9898;&#x3002;&#x5728;vue-cli3.0&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x76F8;&#x5173;&#x914D;&#x7F6E;&#x662F;&#x88AB;&#x9690;&#x85CF;&#x8D77;&#x6765;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;vue.config.js&#x6765;&#x5C06;&#x6211;&#x4EEC;&#x7684;&#x914D;&#x7F6E;&#x5408;&#x5E76;&#x5230;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// vue.config.js

const path = require(&apos;path&apos;)
const PrerenderSPAPlugin = require(&apos;prerender-spa-plugin&apos;)

module.exports = {
  configureWebpack(config) {
    if (process.env.NODE_ENV !== &apos;production&apos;) return;
    return  {
      plugins: [
        new PrerenderSPAPlugin({
          // Required - The path to the webpack-outputted app to prerender.
          staticDir: path.join(__dirname, &apos;dist&apos;),
          // Required - Routes to render.
          routes: [&apos;/&apos;],
        })
      ]
    }
  },
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-comment">// vue.config.js</span>

<span class="hljs-keyword">const</span> path = require(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> PrerenderSPAPlugin = require(<span class="hljs-string">&apos;prerender-spa-plugin&apos;</span>)

<span class="hljs-keyword">module</span>.exports = {
  configureWebpack(<span class="hljs-built_in">config</span>) {
    <span class="hljs-built_in">if</span> (<span class="hljs-built_in">process</span>.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span>) <span class="hljs-built_in">return</span>;
    <span class="hljs-built_in">return</span>  {
      plugins: [
        <span class="hljs-keyword">new</span> PrerenderSPAPlugin({
          <span class="hljs-comment">// Required - The path to the webpack-outputted app to prerender.</span>
          staticDir: path.join(__dirname, <span class="hljs-string">&apos;dist&apos;</span>),
          <span class="hljs-comment">// Required - Routes to render.</span>
          routes: [<span class="hljs-string">&apos;/&apos;</span>],
        })
      ]
    }
  },
}</code></pre><p>&#x6548;&#x679C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000016477431?w=331&amp;h=556" src="https://static.alili.tech/img/remote/1460000016477431?w=331&amp;h=556" alt="prerender" title="prerender" style="cursor:pointer"></span></p><p>&#x4E0A;&#x56FE;&#x662F;&#x8BE5;app&#x5728;&#x7F51;&#x7EDC;&#x73AF;&#x5883;&#x4E3A;<code>slow 3G</code>&#x4E0B;&#x9996;&#x6B21;&#x6253;&#x5F00;&#x65F6;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF0C;&#x5148;&#x7531;&#x8C37;&#x6B4C;&#x9875;&#x9762;&#x8DF3;&#x81F3;browseExp&#xFF0C;&#x9996;&#x5148;&#x5F15;&#x5165;&#x773C;&#x5E18;&#x7684;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x9884;&#x6E32;&#x67D3;&#x9875;&#x9762;&#xFF0C;&#x5B83;&#x4EE3;&#x66FF;&#x6211;&#x7F51;&#x5740;&#x8DF3;&#x8F6C;&#x540E;&#x5E94;&#x7528;&#x52A0;&#x8F7D;&#x7684;&#x767D;&#x5C4F;&#x65F6;&#x95F4;&#xFF0C;&#xFF08;&#x524D;&#x9762;&#x7684;&#x5C0F;&#x6BB5;&#x767D;&#x5C4F;&#x662F;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#x7684;&#x767D;&#x5C4F;&#xFF0C;&#x4E0D;&#x662F;&#x5E94;&#x7528;&#x52A0;&#x8F7D;&#x7684;&#x767D;&#x5C4F;&#xFF09;&#x7136;&#x540E;&#x52A0;&#x8F7D;&#x5B8C;&#x6BD5;&#x540E;&#x5C31;&#x4F1A;&#x53BB;&#x8BF7;&#x6C42;&#x6211;&#x4EEC;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x9AA8;&#x67B6;&#x5C4F;&#x5C31;&#x51FA;&#x73B0;&#x4E86;&#xFF0C;&#x8FC7;&#x6E21;&#x8FD9;&#x6BB5;&#x9875;&#x9762;&#x5C40;&#x90E8;&#x767D;&#x5C4F;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x6700;&#x540E;&#x4E3A;&#x771F;&#x5B9E;&#x7684;&#x9875;&#x9762;&#x3002;<br><strong>&#x9884;&#x6E32;&#x67D3;&#x4E5F;&#x6709;&#x5B83;&#x7684;&#x7F3A;&#x70B9;</strong>&#xFF1A;&#x90A3;&#x5C31;&#x662F;&#x9884;&#x6E32;&#x67D3;&#x7684;&#x9875;&#x9762;&#x5185;&#x5BB9;&#x53EF;&#x80FD;&#x4E0E;&#x771F;&#x5B9E;&#x5185;&#x5BB9;&#x7531;&#x4E00;&#x5B9A;&#x51FA;&#x5165;&#xFF0C;&#x800C;&#x4E14;&#x8FD8;&#x65E0;&#x6CD5;&#x4EA4;&#x4E92;&#x3002;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x5E94;&#x7528;&#x7684;&#x5185;&#x5BB9;&#x5177;&#x6709;&#x5F88;&#x5F3A;&#x7684;&#x5B9E;&#x65F6;&#x6027;&#x548C;&#x4EA4;&#x4E92;&#x6027;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x8003;&#x8651;&#x91C7;&#x7528;&#x9AA8;&#x67B6;&#x5C4F;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x8FDB;&#x884C;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x7684;&#x767D;&#x5C4F;&#x8FC7;&#x6E21;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x5C31;&#x65E0;&#x6CD5;&#x4F18;&#x5316;seo&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x6309;&#x81EA;&#x5DF1;&#x7684;&#x5B9E;&#x9645;&#x573A;&#x666F;&#x6765;&#x505A;&#x9009;&#x62E9;&#x3002;</p><p><strong>&#x53E6;&#x5916;</strong>&#x5BF9;&#x4E8E;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;&#x8FD8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<strong>&#x7EC4;&#x4EF6;&#x61D2;&#x52A0;&#x8F7D;</strong>&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5BF9;&#x7EC4;&#x4EF6;&#x8FDB;&#x884C;&#x61D2;&#x52A0;&#x8F7D;&#xFF0C;&#x53EA;&#x6709;&#x5F53;&#x9700;&#x8981;&#x9ED8;&#x5199;&#x7EC4;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#x624D;&#x53BB;&#x52A0;&#x8F7D;&#x4ED6;&#x4EEC;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x51CF;&#x5C11;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x9700;&#x8981;&#x52A0;&#x8F7D;&#x7684;&#x6587;&#x4EF6;&#x5927;&#x5C0F;&#xFF0C;&#x63D0;&#x9AD8;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;&#xFF0C;&#x4E5F;&#x6709;&#x5229;&#x4E8E;service worker&#x5BF9;app shell&#x8FDB;&#x884C;&#x9897;&#x7C92;&#x5EA6;&#x66F4;&#x5C0F;&#x7684;&#x7F13;&#x5B58;&#x3002;&#x7ED3;&#x5408;Vue&#x7684;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x548C;webpack&#x7684;&#x4EE3;&#x7801;&#x5206;&#x5272;&#x529F;&#x80FD;&#xFF0C;&#x8F7B;&#x677E;&#x5B9E;&#x73B0;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x7684;&#x61D2;&#x52A0;&#x8F7D;&#xFF0C;&#x4F8B;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// router.js&#x901A;&#x8FC7;&#x52A8;&#x6001;import&#x6765;&#x5F15;&#x5165;&#x7EC4;&#x4EF6;&#xFF0C;&#x5176;&#x4ED6;
import Vue from &apos;vue&apos;;
import Router from &apos;vue-router&apos;;
//&#x8FD9;&#x91CC;&#x7528;home&#x7EC4;&#x4EF6;&#x505A;&#x4F8B;&#x5B50;
const Home = () =&gt; import(&apos;./views/Home/Home.vue&apos;);

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: &apos;/&apos;,
      name: &apos;Home&apos;,
      component: Home,
  ],
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JS"><span class="hljs-comment">// router.js&#x901A;&#x8FC7;&#x52A8;&#x6001;import&#x6765;&#x5F15;&#x5165;&#x7EC4;&#x4EF6;&#xFF0C;&#x5176;&#x4ED6;</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-router&apos;</span>;
<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x7528;home&#x7EC4;&#x4EF6;&#x505A;&#x4F8B;&#x5B50;</span>
<span class="hljs-keyword">const</span> Home = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;./views/Home/Home.vue&apos;</span>);

Vue.use(Router);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/&apos;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Home&apos;</span>,
      <span class="hljs-attr">component</span>: Home,
  ],
});</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x5BF9;&#x6211;&#x4EEC;&#x7684;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x8FDB;&#x884C;&#x61D2;&#x52A0;&#x8F7D;&#x4E86;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x4F1A;&#x6309;&#x7EC4;&#x4EF6;&#x4E3A;&#x5355;&#x4F4D;&#x6253;&#x5305;&#x6210;&#x4E86;&#x591A;&#x4E2A;js&#x6587;&#x4EF6;&#x3002;</p><h2 id="articleHeader7">&#x5C06;&#x9879;&#x76EE;&#x5347;&#x7EA7;&#x4E3A; pwa</h2><p>&#x5728;&#x6211;&#x4EEC;&#x7684;&#x9879;&#x76EE;&#x57FA;&#x672C;&#x6210;&#x578B;&#x4E4B;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x8003;&#x8651;&#x5C06;&#x5176;&#x5347;&#x7EA7;&#x4E3A;pwa&#x4E86;&#x3002;&#x5173;&#x4E8E;pwa&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x6211;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x90FD;&#x77E5;&#x9053;&#xFF0C;&#x8FD9;&#x73A9;&#x610F;&#x5728;&#x56FD;&#x5916;&#x5DF2;&#x7ECF;&#x706B;&#x4E86;&#x51E0;&#x767E;&#x5E74;&#x4E86;&#xFF0C;&#x4F46;&#x56FD;&#x5185;&#x9664;&#x4E86;&#x51E0;&#x5BB6;&#x5927;&#x516C;&#x53F8;&#xFF0C;&#x8C8C;&#x4F3C;&#x6CA1;&#x591A;&#x5C11;&#x4EBA;&#x53BB;&#x5C1D;&#x8BD5;&#x5B83;&#xFF0C;&#x4E0D;&#x8FC7;&#x5728;&#x4E0A;&#x4E00;&#x5E74;&#x5F00;&#x59CB;&#xFF0C;pwa&#x5728;&#x56FD;&#x5185;&#x8FD8;&#x662F;&#x70ED;&#x4E86;&#x4E00;&#x4E0B;&#x7684;&#x3002;pwa&#x662F;&#x6211;&#x4EEC;&#x5728;&#x8FFD;&#x6C42;webapp&#x4FBF;&#x6377;&#x548C;&#x539F;&#x751F;&#x5E94;&#x7528;&#x826F;&#x597D;&#x4F53;&#x9A8C;&#x7ED3;&#x5408;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x4EA7;&#x7269;&#xFF0C;&#x76EE;&#x524D;&#x517C;&#x5BB9;&#x6027;&#x662F;&#x6700;&#x5927;&#x969C;&#x788D;&#xFF0C;&#x4F46;&#x76F8;&#x4FE1;&#x5B83;&#x5728;&#x56FD;&#x5185;&#x7684;&#x524D;&#x666F;&#x8FD8;&#x662F;&#x660E;&#x6717;&#x7684;&#x3002;pwa&#x7684;&#x7279;&#x6027;&#x6709;&#x53EF;&#x79BB;&#x7EBF;&#x3001;&#x6DFB;&#x52A0;&#x5230;&#x684C;&#x9762;&#xFF08;&#x4E00;&#x7EA7;&#x5165;&#x53E3;&#xFF09;&#x3001;&#x540E;&#x53F0;&#x540C;&#x6B65;&#x3001;&#x670D;&#x52A1;&#x7AEF;&#x63A8;&#x9001;&#x7B49;&#x7B49;&#xFF0C;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x8BDD;&#x5B9E;&#x73B0;&#x4E86;&#x53EF;&#x79BB;&#x7EBF;&#x548C;&#x6DFB;&#x52A0;&#x5230;&#x684C;&#x9762;&#x8FD9;&#x4E24;&#x4E2A;&#x529F;&#x80FD;&#x3002;&#x8D77;&#x521D;&#x542C;&#x95FB;pwa&#x65F6;&#x4EE5;&#x4E3A;&#x4F1A;&#x5F88;&#x590D;&#x6742;&#xFF0C;&#x5B9E;&#x8DF5;&#x540E;&#x53D1;&#x73B0;&#x5F88;&#x7B80;&#x5355;&#x3002;</p><p>ps: &#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x7684;Application&#x4E2D;&#x53EF;&#x8C03;&#x8BD5;&#x5BF9;&#x5E94;&#x5185;&#x5BB9;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016477432?w=688&amp;h=403" src="https://static.alili.tech/img/remote/1460000016477432?w=688&amp;h=403" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader8">workbox</h3><p><a href="https://developers.google.com/web/tools/workbox/" rel="nofollow noreferrer" target="_blank">workbox</a> &#x662F;pwa&#x7684;&#x4E00;&#x4E2A;&#x5DE5;&#x5177;&#x96C6;&#x5408;&#xFF0C;&#x56F4;&#x7ED5;&#x5B83;&#x7684;&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x5217;&#x5DE5;&#x5177;&#xFF0C;&#x5982; workbox-cli&#x3001;gulp-workbox&#x3001;workbox-webpack-plagin &#x7B49;&#x7B49;&#xFF0C;workbox&#x672C;&#x8EAB;&#x76F8;&#x5F53;&#x4E8E;<a href="https://developers.google.com/web/fundamentals/primers/service-workers/" rel="nofollow noreferrer" target="_blank">service worker</a>&#x7684;&#x4E00;&#x4E2A;&#x6846;&#x67B6;&#xFF0C;&#x5C01;&#x88C5;&#x4E86;&#x5404;&#x79CD;api&#xFF0C;&#x548C;&#x7F13;&#x5B58;&#x7B56;&#x7565;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x66F4;&#x52A0;&#x4FBF;&#x6377;&#x7684;&#x4F7F;&#x7528;service worker&#x3002;vue-cli3.0&#x96C6;&#x6210;&#x7684;&#x662F;workbox-webpack-plagin&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;vue.config.js&#x7684;pwa&#x914D;&#x7F6E;&#x9879;&#x8FDB;&#x884C;&#x914D;&#x7F6E;<br>&#x9996;&#x5148;&#xFF0C;&#x5728;vue.config.js&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#xFF0C;&#x66F4;&#x8BE6;&#x7EC6;&#x7684;<a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" rel="nofollow noreferrer" target="_blank">&#x914D;&#x7F6E;&#x9879;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// vue.config.js

module.exports = {
  pwa: {
    // &#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x914D;&#x7F6E;
    name: &apos;Browsing-Exp&apos;,
    themeColor: &apos;#6476DB&apos;,
    msTileColor: &apos;#000000&apos;,
    appleMobileWebAppCapable: &apos;yes&apos;,
    appleMobileWebAppStatusBarStyle: &apos;black&apos;,

/*
* &#x4E24;&#x4E2A;&#x6A21;&#x5F0F;&#xFF0C;GenerateSW&#xFF08;&#x9ED8;&#x8BA4;&#xFF09;&#x548C; InjectManifest
* GenerateSW &#x5728;&#x6211;&#x4EEC;build&#x9879;&#x76EE;&#x65F6;&#x5019;&#xFF0C;&#x6BCF;&#x6B21;&#x90FD;&#x4F1A;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;service worker&#x6587;&#x4EF6;
* InjectManifest &#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x7F16;&#x8F91;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;service worker&#x6587;&#x4EF6;&#xFF0C;&#x5B9E;&#x73B0;&#x66F4;&#x591A;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;
* &#x62FF;&#x5230;&#x9884;&#x7F13;&#x5B58;&#x5217;&#x8868;
*/
    workboxPluginMode: &apos;InjectManifest&apos;,
    workboxOptions: {
      // &#x81EA;&#x5B9A;&#x4E49;&#x7684;service worker&#x6587;&#x4EF6;&#x7684;&#x4F4D;&#x7F6E;
      swSrc: &apos;src/service-worker.js&apos;,
      // ...other Workbox options...
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs java"><code><span class="hljs-comment">// vue.config.js</span>

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  pwa: {
    <span class="hljs-comment">// &#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x914D;&#x7F6E;</span>
    name: <span class="hljs-string">&apos;Browsing-Exp&apos;</span>,
    themeColor: <span class="hljs-string">&apos;#6476DB&apos;</span>,
    msTileColor: <span class="hljs-string">&apos;#000000&apos;</span>,
    appleMobileWebAppCapable: <span class="hljs-string">&apos;yes&apos;</span>,
    appleMobileWebAppStatusBarStyle: <span class="hljs-string">&apos;black&apos;</span>,

<span class="hljs-comment">/*
* &#x4E24;&#x4E2A;&#x6A21;&#x5F0F;&#xFF0C;GenerateSW&#xFF08;&#x9ED8;&#x8BA4;&#xFF09;&#x548C; InjectManifest
* GenerateSW &#x5728;&#x6211;&#x4EEC;build&#x9879;&#x76EE;&#x65F6;&#x5019;&#xFF0C;&#x6BCF;&#x6B21;&#x90FD;&#x4F1A;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;service worker&#x6587;&#x4EF6;
* InjectManifest &#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x7F16;&#x8F91;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;service worker&#x6587;&#x4EF6;&#xFF0C;&#x5B9E;&#x73B0;&#x66F4;&#x591A;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;
* &#x62FF;&#x5230;&#x9884;&#x7F13;&#x5B58;&#x5217;&#x8868;
*/</span>
    workboxPluginMode: <span class="hljs-string">&apos;InjectManifest&apos;</span>,
    workboxOptions: {
      <span class="hljs-comment">// &#x81EA;&#x5B9A;&#x4E49;&#x7684;service worker&#x6587;&#x4EF6;&#x7684;&#x4F4D;&#x7F6E;</span>
      swSrc: <span class="hljs-string">&apos;src/service-worker.js&apos;</span>,
      <span class="hljs-comment">// ...other Workbox options...</span>
    }
}</code></pre><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;src&#x6587;&#x4EF6;&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;service-worker.js&#xFF0C;&#x8FD9;&#x91CC;&#x62FF;&#x6B64;&#x9879;&#x76EE;&#x505A;&#x4F8B;&#x5B50;&#xFF0C;workbox&#x7684;&#x5E38;&#x7528;&#x63A5;&#x53E3;&#x6709;&#xFF1A;</p><ul><li>workbox.precaching &#x5BF9;&#x9759;&#x6001;&#x652F;&#x63F4;&#x8FDB;&#x884C;&#x7F13;&#x5B58;</li><li>workbox.routing &#x8FDB;&#x884C;&#x8DEF;&#x7531;&#x63A7;&#x5236;</li><li>workbox.strategies &#x63D0;&#x4F9B;&#x7F13;&#x5B58;&#x7B56;&#x7565;</li><li>&#x7B49;&#x7B49;</li></ul><p>&#x66F4;&#x8BE6;&#x7EC6;&#x7684; <a href="https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin" rel="nofollow noreferrer" target="_blank">&#x63A5;&#x53E3;&#x548C;&#x914D;&#x7F6E;&#x6559;&#x7A0B;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/service-worker.js

// &#x8BBE;&#x7F6E;&#x76F8;&#x5E94;&#x7F13;&#x5B58;&#x7684;&#x540D;&#x5B57;&#x7684;&#x524D;&#x7F00;&#x548C;&#x540E;&#x7F00;
workbox.core.setCacheNameDetails({
  prefix: &apos;browse-exp&apos;,
  suffix: &apos;v1.0.0&apos;,
});
// &#x8BA9;&#x6211;&#x4EEC;&#x7684;service worker&#x5C3D;&#x5FEB;&#x7684;&#x5F97;&#x5230;&#x66F4;&#x65B0;&#x548C;&#x83B7;&#x53D6;&#x9875;&#x9762;&#x7684;&#x63A7;&#x5236;&#x6743;
workbox.skipWaiting();
workbox.clientsClaim();

/*
* vue-cli3.0&#x901A;&#x8FC7;workbox-webpack-plagin &#x6765;&#x5B9E;&#x73B0;&#x76F8;&#x5173;&#x529F;&#x80FD;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x52A0;&#x5165;
* &#x4EE5;&#x4E0B;&#x8BED;&#x53E5;&#x6765;&#x83B7;&#x53D6;&#x9884;&#x7F13;&#x5B58;&#x5217;&#x8868;&#x548C;&#x9884;&#x7F13;&#x5B58;&#x4ED6;&#x4EEC;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6253;&#x5305;&#x9879;&#x76EE;&#x540E;&#x751F;&#x4EA7;&#x7684;html&#xFF0C;js&#xFF0C;css&#x7B49;* &#x9759;&#x6001;&#x6587;&#x4EF6;
*/
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// &#x5BF9;&#x6211;&#x4EEC;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x7F13;&#x5B58;&#xFF0C;&#x8FD9;&#x91CC;&#x91C7;&#x7528; networkFirst &#x7B56;&#x7565;
workbox.routing.registerRoute(
  new RegExp(&apos;.*experiments\?.*&apos;), 
  workbox.strategies.networkFirst()
);
workbox.routing.registerRoute(
  new RegExp(&apos;.*experiments/\\d&apos;),
  workbox.strategies.networkFirst()  
)
workbox.routing.registerRoute(
  new RegExp(&apos;.*experiment_types.*&apos;),
  workbox.strategies.networkFirst()
)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-comment">// src/service-worker.js</span>

<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x76F8;&#x5E94;&#x7F13;&#x5B58;&#x7684;&#x540D;&#x5B57;&#x7684;&#x524D;&#x7F00;&#x548C;&#x540E;&#x7F00;</span>
<span class="hljs-selector-tag">workbox</span><span class="hljs-selector-class">.core</span><span class="hljs-selector-class">.setCacheNameDetails</span>({
  <span class="hljs-attribute">prefix</span>: <span class="hljs-string">&apos;browse-exp&apos;</span>,
  <span class="hljs-attribute">suffix</span>: <span class="hljs-string">&apos;v1.0.0&apos;</span>,
});
<span class="hljs-comment">// &#x8BA9;&#x6211;&#x4EEC;&#x7684;service worker&#x5C3D;&#x5FEB;&#x7684;&#x5F97;&#x5230;&#x66F4;&#x65B0;&#x548C;&#x83B7;&#x53D6;&#x9875;&#x9762;&#x7684;&#x63A7;&#x5236;&#x6743;</span>
<span class="hljs-selector-tag">workbox</span><span class="hljs-selector-class">.skipWaiting</span>();
<span class="hljs-selector-tag">workbox</span><span class="hljs-selector-class">.clientsClaim</span>();

<span class="hljs-comment">/*
* vue-cli3.0&#x901A;&#x8FC7;workbox-webpack-plagin &#x6765;&#x5B9E;&#x73B0;&#x76F8;&#x5173;&#x529F;&#x80FD;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x52A0;&#x5165;
* &#x4EE5;&#x4E0B;&#x8BED;&#x53E5;&#x6765;&#x83B7;&#x53D6;&#x9884;&#x7F13;&#x5B58;&#x5217;&#x8868;&#x548C;&#x9884;&#x7F13;&#x5B58;&#x4ED6;&#x4EEC;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6253;&#x5305;&#x9879;&#x76EE;&#x540E;&#x751F;&#x4EA7;&#x7684;html&#xFF0C;js&#xFF0C;css&#x7B49;* &#x9759;&#x6001;&#x6587;&#x4EF6;
*/</span>
<span class="hljs-selector-tag">workbox</span><span class="hljs-selector-class">.precaching</span><span class="hljs-selector-class">.precacheAndRoute</span>(self.__precacheManifest || []);

<span class="hljs-comment">// &#x5BF9;&#x6211;&#x4EEC;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x7F13;&#x5B58;&#xFF0C;&#x8FD9;&#x91CC;&#x91C7;&#x7528; networkFirst &#x7B56;&#x7565;</span>
<span class="hljs-selector-tag">workbox</span><span class="hljs-selector-class">.routing</span><span class="hljs-selector-class">.registerRoute</span>(
  new RegExp(<span class="hljs-string">&apos;.*experiments\?.*&apos;</span>), 
  workbox.strategies.networkFirst()
);
<span class="hljs-selector-tag">workbox</span><span class="hljs-selector-class">.routing</span><span class="hljs-selector-class">.registerRoute</span>(
  new RegExp(<span class="hljs-string">&apos;.*experiments/\\d&apos;</span>),
  workbox.strategies.networkFirst()  
)
<span class="hljs-selector-tag">workbox</span><span class="hljs-selector-class">.routing</span><span class="hljs-selector-class">.registerRoute</span>(
  new RegExp(<span class="hljs-string">&apos;.*experiment_types.*&apos;</span>),
  workbox.strategies.networkFirst()
)
</code></pre><p>&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x9996;&#x5148;&#x901A;&#x8FC7;<code>workbox.precaching.precacheAndRoute</code>&#x914D;&#x7F6E;app shell&#x7684;&#x9884;&#x7F13;&#x5B58;&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x662F;&#x901A;&#x8FC7;<code>workbox.routing.registerRoute</code>&#x5BF9;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x7684;&#x7F13;&#x5B58;&#xFF0C;&#x56E0;&#x4E3A;&#x5BF9;&#x4E8E;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;&#x6709;&#x4E00;&#x5B9A;&#x7684;&#x5B9E;&#x65F6;&#x6027;&#x8981;&#x6C42;&#xFF0C;&#x6240;&#x4EE5;&#x91C7;&#x7528;&#x7F51;&#x7EDC;&#x4F18;&#x5148;&#x7B56;&#x7565; networkFirst &#xFF0C;&#x8FD9;&#x91CC;&#x968F;&#x4FBF;&#x63D0;&#x4E00;&#x4E0B;&#x76F8;&#x5173;&#x7684;&#x7B56;&#x7565;&#xFF1A;</p><h4>networkFirst</h4><p>&#x7F51;&#x7EDC;&#x4F18;&#x5148;&#x7B56;&#x7565;&#xFF0C;&#x4F18;&#x5148;&#x5C1D;&#x8BD5;&#x901A;&#x8FC7;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x6765;&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x62FF;&#x5230;&#x6570;&#x636E;&#x540E;&#x5C06;&#x6570;&#x636E;&#x8FD4;&#x56DE;&#x7ED9;&#x7528;&#x6237;&#xFF0C;&#x5E76;&#x66F4;&#x65B0;&#x7F13;&#x5B58;&#xFF0C;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x5931;&#x8D25;&#x5C31;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x3002;</p><h4>cacheFirst</h4><p>&#x7F13;&#x5B58;&#x4F18;&#x5148;&#x7B56;&#x7565;&#xFF0C;&#x4F18;&#x5148;&#x83B7;&#x53D6;&#x7F13;&#x5B58;&#x4E2D;&#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x5982;&#x679C;&#x7F13;&#x5B58;&#x4E2D;&#x6CA1;&#x6709;&#x76F8;&#x5173;&#x8D44;&#x6E90;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x53D1;&#x8D77;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x3002;</p><h4>networkOnly</h4><p>&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF0C;&#x53EA;&#x4F7F;&#x7528;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x83B7;&#x53D6;&#x7684;&#x8D44;&#x6E90;</p><h4>cacheOnly</h4><p>&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF0C;&#x53EA;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x4E2D;&#x7684;&#x8D44;&#x6E90;</p><h4>stateWhileRevalidate</h4><p>&#x6B64;&#x7B56;&#x7565;&#x4F1A;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x7F13;&#x5B58;&#x4E2D;&#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x786E;&#x4FDD;&#x83B7;&#x53D6;&#x8D44;&#x6E90;&#x7684;&#x901F;&#x5EA6;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x53D1;&#x8D77;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x53BB;&#x66F4;&#x65B0;&#x7F13;&#x5B58;&#x4E2D;&#x7684;&#x8D44;&#x6E90;&#x3002;&#x5982;&#x679C;&#x7F13;&#x5B58;&#x4E2D;&#x6CA1;&#x6709;&#x5BF9;&#x5E94;&#x8D44;&#x6E90;&#x7684;&#x8BDD;&#x5C31;&#x4F1A;&#x53D1;&#x8D77;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF0C;&#x5E76;&#x7F13;&#x5B58;&#x8D44;&#x6E90;&#x3002;</p><h3 id="articleHeader9">&#x5982;&#x4F55;&#x67E5;&#x770B;&#x6548;&#x679C;&#x5462;</h3><p>&#x8FD9;&#x4E9B;&#x914D;&#x7F6E;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x7684;&#x5F97;&#x4EE5;&#x5728;&#x79BB;&#x7EBF;&#x73AF;&#x5883;&#x4E0B;&#x8FD0;&#x884C;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x4E9B;&#x914D;&#x7F6E;&#x90FD;&#x662F;&#x76F8;&#x5BF9;&#x4E8E;&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684;&#x9879;&#x76EE;&#x6587;&#x4EF6;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;dist&#x6587;&#x4EF6;&#x91CC;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x6211;&#x4EEC;&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x7684;dev&#x6A21;&#x5F0F;&#x662F;&#x4F53;&#x9A8C;&#x4E0D;&#x5230;&#x6548;&#x679C;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x600E;&#x4E48;&#x67E5;&#x770B;&#x6548;&#x679C;&#x5462;&#xFF1F;</p><ul><li>&#x65B9;&#x6848;1&#xFF1A;&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x540E;&#x53F0;&#x670D;&#x52A1;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;node.js&#x7B49;&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x540E;&#x53F0;&#x670D;&#x52A1;&#x53BB;&#x8BBF;&#x95EE;&#x6211;&#x4EEC;&#x7684;&#x5E94;&#x7528;&#xFF0C;service worker&#x672C;&#x6765;&#x9700;&#x8981;&#x5728;https&#x73AF;&#x5883;&#x4E0B;&#x8FD0;&#x884C;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x662F;&#x672C;&#x5730; localhost &#x73AF;&#x5883;&#x7684;&#x8BDD;&#xFF0C;service worker&#x53EF;&#x4EE5;&#x5728;http&#x534F;&#x8BAE;&#x4E0A;&#x8FD0;&#x884C;&#x3002;</li><li>&#x65B9;&#x6848;2&#xFF1A;&#x501F;&#x52A9;google&#x63D0;&#x4F9B;&#x7684;chrome&#x6269;&#x5C55;&#x5E94;&#x7528;<a href="https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb" rel="nofollow noreferrer" target="_blank">Web Server for Chrome</a>&#x4E3A;&#x6211;&#x4EEC;&#x7684;&#x5E94;&#x7528;&#x542F;&#x52A8;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#xFF0C;&#x6BD4;&#x8F83;&#x7075;&#x6D3B;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x91C7;&#x7528;&#x4E86;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x3002;</li></ul><h4>Web Server for Chrome</h4><p>&#x70B9;&#x51FB;<code>choose foloer</code>&#x9009;&#x62E9;&#x6211;&#x4EEC;&#x7684;dist&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x52FE;&#x9009;<code>Automatically show index.html</code>&#x5F00;&#x542F;&#x670D;&#x52A1;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E0B;&#x9762;&#x7684;&#x94FE;&#x63A5;&#x8BBF;&#x95EE;&#x5E94;&#x7528;&#x4E86;&#xFF0C;&#x901A;&#x8FC7;&#x52FE;&#x9009;<code>Accessible on local network</code>&#x8FD8;&#x53EF;&#x4EE5;&#x751F;&#x6210;&#x53E6;&#x4E00;&#x4E2A;&#x5730;&#x5740;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x5728;&#x624B;&#x673A;&#x7AEF;&#x8BBF;&#x95EE;&#x5E94;&#x7528;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000016477433?w=214&amp;h=207" src="https://static.alili.tech/img/remote/1460000016477433?w=214&amp;h=207" alt="webserver1" title="webserver1" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016477434?w=284&amp;h=565" src="https://static.alili.tech/img/remote/1460000016477434?w=284&amp;h=565" alt="webserver2" title="webserver2" style="cursor:pointer"></span></p><h3 id="articleHeader10">manifest.json &#x7F51;&#x7EDC;&#x5E94;&#x7528;&#x6E05;&#x5355;</h3><p>manifest.json &#x63D0;&#x4F9B;&#x4E86;&#x5C06;webapp &#x6DFB;&#x52A0;&#x5230;&#x8BBE;&#x5907;&#x4E3B;&#x5C4F;&#x5E55;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x66F4;&#x8BE6;&#x7EC6;&#x7684;<a href="https://developers.google.com/web/fundamentals/web-app-manifest/" rel="nofollow noreferrer" target="_blank">&#x914D;&#x7F6E;&#x5185;&#x5BB9;</a>&#x5728;&#x6B64;&#x67E5;&#x770B;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5B83;&#x7ED9;&#x6211;&#x4EEC;&#x7684;&#x5E94;&#x7528;&#x8BBE;&#x7F6E;&#x56FE;&#x6807;&#xFF0C;&#x542F;&#x52A8;&#x52A8;&#x753B;&#xFF0C;&#x80CC;&#x666F;&#x989C;&#x8272;&#x7B49;&#x7B49;&#x3002;&#x5B83;&#x5728;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x7684;public&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// public/manifest.json
// &#x6700;&#x57FA;&#x672C;&#x7684;&#x914D;&#x7F6E;&#x5185;&#x5BB9;

{
  &quot;name&quot;: &quot;&#x6D4F;&#x89C8;&#x6211;&#x4EEC;&#x7684;&#x5B9E;&#x9A8C;&#x5427;&#xFF01;&quot;,
  &quot;short_name&quot;: &quot;BrowseExp&quot;,
  &quot;icons&quot;: [
    {
      &quot;src&quot;: &quot;/img/icons/icon-192x192.png&quot;,
      &quot;sizes&quot;: &quot;192x192&quot;,
      &quot;type&quot;: &quot;image/png&quot;
    },
    {
      &quot;src&quot;: &quot;/img/icons/icon-512x512.png&quot;,
      &quot;sizes&quot;: &quot;512x512&quot;,
      &quot;type&quot;: &quot;image/png&quot;
    }
  ],
  &quot;start_url&quot;: &quot;/index.html&quot;,
  &quot;display&quot;: &quot;standalone&quot;,
  &quot;background_color&quot;: &quot;#000000&quot;,
  &quot;theme_color&quot;: &quot;#4DBA87&quot;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="JSON">// public/manifest.json
// &#x6700;&#x57FA;&#x672C;&#x7684;&#x914D;&#x7F6E;&#x5185;&#x5BB9;

{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;&#x6D4F;&#x89C8;&#x6211;&#x4EEC;&#x7684;&#x5B9E;&#x9A8C;&#x5427;&#xFF01;&quot;</span>,
  <span class="hljs-attr">&quot;short_name&quot;</span>: <span class="hljs-string">&quot;BrowseExp&quot;</span>,
  <span class="hljs-attr">&quot;icons&quot;</span>: [
    {
      <span class="hljs-attr">&quot;src&quot;</span>: <span class="hljs-string">&quot;/img/icons/icon-192x192.png&quot;</span>,
      <span class="hljs-attr">&quot;sizes&quot;</span>: <span class="hljs-string">&quot;192x192&quot;</span>,
      <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;image/png&quot;</span>
    },
    {
      <span class="hljs-attr">&quot;src&quot;</span>: <span class="hljs-string">&quot;/img/icons/icon-512x512.png&quot;</span>,
      <span class="hljs-attr">&quot;sizes&quot;</span>: <span class="hljs-string">&quot;512x512&quot;</span>,
      <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;image/png&quot;</span>
    }
  ],
  <span class="hljs-attr">&quot;start_url&quot;</span>: <span class="hljs-string">&quot;/index.html&quot;</span>,
  <span class="hljs-attr">&quot;display&quot;</span>: <span class="hljs-string">&quot;standalone&quot;</span>,
  <span class="hljs-attr">&quot;background_color&quot;</span>: <span class="hljs-string">&quot;#000000&quot;</span>,
  <span class="hljs-attr">&quot;theme_color&quot;</span>: <span class="hljs-string">&quot;#4DBA87&quot;</span>
}
</code></pre><p>&#x5F53;&#x6D4F;&#x89C8;&#x5668;&#xFF08;&#x652F;&#x6301;&#x6B64;&#x529F;&#x80FD;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF09;&#x68C0;&#x6D4B;&#x5230;&#x76EE;&#x5F55;&#x4E2D;&#x7684;manifest.json&#x6587;&#x4EF6;&#x65F6;&#xFF0C;&#x5C31;&#x4F1A;&#x8BFB;&#x53D6;&#x5176;&#x4E2D;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x5728;&#x9002;&#x5F53;&#x7684;&#x65F6;&#x673A;&#x5F39;&#x51FA;&#x8BE2;&#x95EE;&#x6846;&#xFF0C;&#x8BE2;&#x95EE;&#x662F;&#x5426;&#x5C06;&#x5E94;&#x7528;&#x6DFB;&#x52A0;&#x5230;&#x684C;&#x9762;&#x3002;&#x6CE8;&#x610F;&#x5B83;&#x4E0D;&#x4F1A;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8BBF;&#x95EE;&#x5C31;&#x5F39;&#x51FA;&#xFF0C;&#x800C;&#x662F;&#x53D1;&#x73B0;&#x7528;&#x6237;&#x5728;&#x4E00;&#x5B9A;&#x65F6;&#x95F4;&#x5185;&#x591A;&#x6B21;&#x8BBF;&#x95EE;&#x8BE5;&#x7F51;&#x7AD9;&#x65F6;&#x624D;&#x4F1A;&#x5F39;&#x51FA;&#x3002;&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x70B9;&#x51FB;Application -&gt; Manifest -&gt; Add to homescreen &#x89E6;&#x53D1;&#x5F39;&#x6846;&#x5F39;&#x51FA;&#x3002;</p><h2 id="articleHeader11">&#x79FB;&#x52A8;&#x7AEF;&#x5176;&#x4ED6;&#x5C0F;&#x95EE;&#x9898;</h2><p>&#x4F5C;&#x4E3A;&#x79FB;&#x52A8;&#x7AEF;web app&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x89E3;&#x51B3;&#x4E00;&#x4E9B;&#x5E38;&#x89C1;&#x7684;&#x5C0F;&#x95EE;&#x9898;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;</p><ul><li>&#x5404;&#x6D4F;&#x89C8;&#x5668;&#x95F4;&#x6837;&#x5F0F;&#x7EDF;&#x4E00;&#x95EE;&#x9898;</li><li>&#x79FB;&#x52A8;&#x7AEF;&#x70B9;&#x51FB;300ms&#x5EF6;&#x8FDF;&#x95EE;&#x9898;</li><li>&#x70B9;&#x900F;&#x4E8B;&#x4EF6;</li><li>rem&#x7684;&#x8FD0;&#x7528;</li></ul><h4>1.&#x5404;&#x6D4F;&#x89C8;&#x5668;&#x95F4;&#x6837;&#x5F0F;&#x7EDF;&#x4E00;&#x95EE;&#x9898;</h4><p>&#x5E38;&#x89C1;&#x505A;&#x6CD5;&#x5C31;&#x662F;&#x5F15;&#x5165;<code>normalize.css</code>&#x91CD;&#x7F6E;&#x6211;&#x4EEC;&#x8BBE;&#x5907;&#x7684;&#x9ED8;&#x8BA4;&#x6837;&#x5F0F;&#xFF0C;&#x4F7F;&#x5F97;&#x5404;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x9ED8;&#x8BA4;&#x6837;&#x5F0F;&#x9AD8;&#x5EA6;&#x4E00;&#x81F4;&#xFF0C;&#x907F;&#x514D;&#x6211;&#x4EEC;&#x7684;&#x5E03;&#x5C40;&#x51FA;&#x73B0;&#x610F;&#x60F3;&#x4E0D;&#x5230;&#x7684;&#x60C5;&#x51B5;&#x3002;</p><h4>2.&#x70B9;&#x51FB;300ms&#x5EF6;&#x8FDF;&#x548C;&#x70B9;&#x900F;&#x4E8B;&#x4EF6;</h4><p>&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x7684;&#x79FB;&#x52A8;&#x7AEF;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x9700;&#x8981;&#x5224;&#x65AD;&#x7528;&#x6237;&#x662F;&#x5426;&#x60F3;&#x8981;&#x53CC;&#x51FB;&#x653E;&#x5927;&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;300ms&#x7684;&#x5EF6;&#x8FDF;&#x6765;&#x67E5;&#x770B;&#x7528;&#x6237;&#x662F;&#x5426;&#x53CC;&#x51FB;&#x5C4F;&#x5E55;&#xFF1B;&#x70B9;&#x900F;&#x4E8B;&#x4EF6;&#x5C31;&#x662F;&#x5F53;&#x6211;&#x4EEC;&#x6DF7;&#x7528;touch&#x548C;click&#x4E8B;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5728;touch&#x4E8B;&#x4EF6;&#x54CD;&#x5E94;&#x540E;&#xFF0C;&#x5982;&#x679C;&#x8BE5;&#x5143;&#x7D20;&#x9690;&#x85CF;&#x6389;&#xFF0C;&#x90A3;&#x4E48;300ms&#x540E;&#x540C;&#x4E00;&#x4F4D;&#x7F6E;&#x7684;&#x5E95;&#x5C42;&#x5143;&#x7D20;&#x7684;click&#x4E8B;&#x4EF6;&#x5C31;&#x4F1A;&#x88AB;&#x89E6;&#x53D1;&#x3002;&#x5BF9;&#x4E8E;&#x5B83;&#x4EEC;&#x5E38;&#x7528;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x5F15;&#x5165; <code>fastclick.js</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x5E93;&#x7684;&#x539F;&#x7406;&#x5C31;&#x662F;&#xFF1A;&#x4FEE;&#x6539;&#x6D4F;&#x89C8;&#x5668;&#x7684;touch&#x4E8B;&#x4EF6;&#x6765;&#x6A21;&#x62DF;&#x4E00;&#x4E2A;click&#x4E8B;&#x4EF6;&#xFF0C;&#x5E76;&#x628A;&#x6D4F;&#x89C8;&#x5668;&#x5728;300ms&#x4E4B;&#x540E;&#x7684;click&#x4E8B;&#x4EF6;&#x963B;&#x6B62;&#x6389;&#x3002;&#x8BA9;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x53EF;&#x4EE5;&#x4EE5;&#x719F;&#x6089;&#x7684;click&#x6765;&#x4E66;&#x5199;&#x4EE3;&#x7801;</p><h4>3.rem&#x7684;&#x8FD0;&#x7528;</h4><p>&#x79FB;&#x52A8;&#x7AEF;&#x6211;&#x4EEC;&#x5E38;&#x5E38;&#x4F1A;&#x4F7F;&#x7528;&#x5230;rem&#x6765;&#x8FDB;&#x884C;&#x54CD;&#x5E94;&#x5F0F;&#x7684;&#x5E03;&#x5C40;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x4F1A;&#x5C06;<code>html</code>&#x7684;<code>font-size</code>&#x8BBE;&#x7F6E;&#x4E3A; <code>62.5%</code>&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x7684; 1rem = 10px&#xFF0C;&#x4FBF;&#x4E8E;&#x6211;&#x4EEC;&#x7684;&#x5355;&#x4F4D;&#x8F6C;&#x6362;&#x3002;</p><h2 id="articleHeader12">&#x9879;&#x76EE;&#x90E8;&#x7F72;</h2><p>&#x5F00;&#x53D1;&#x5B8C;&#x6BD5;&#x540E;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x628A;&#x6211;&#x4EEC;&#x7684;&#x9879;&#x76EE;&#x90E8;&#x7F72;&#x5230;&#x81EA;&#x5DF1;&#x7684;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x9762;&#x53BB;</p><h3 id="articleHeader13">&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x670D;&#x52A1;</h3><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x540E;&#x7AEF;&#x670D;&#x52A1;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x9879;&#x76EE;&#x7684;index.html&#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x91CC;&#x91C7;&#x7528;express&#x8D77;&#x4E2A;&#x670D;&#x52A1;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// browse-exp.js
const fs = require(&apos;fs&apos;)
const path = require(&apos;path&apos;)
const express = require(&apos;express&apos;)

const app = express();

app.use(express.static(path.resolve(__dirname, &apos;./dist&apos;)))
app.get(&apos;*&apos;, function(req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, &apos;./dist/index.html&apos;), &apos;utf-8&apos;)
  res.send(html)
})

app.listen(3002, function() {
  console.log(&apos;server listening on port 3002!&apos;)
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-comment">// browse-exp.js</span>
<span class="hljs-keyword">const</span> fs = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express&apos;</span>)

<span class="hljs-keyword">const</span> app = express();

app.<span class="hljs-keyword">use</span>(express.<span class="hljs-keyword">static</span>(path.resolve(__dirname, <span class="hljs-string">&apos;./dist&apos;</span>)))
app.get(<span class="hljs-string">&apos;*&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{
  <span class="hljs-keyword">const</span> html = fs.readFileSync(path.resolve(__dirname, <span class="hljs-string">&apos;./dist/index.html&apos;</span>), <span class="hljs-string">&apos;utf-8&apos;</span>)
  res.send(html)
})

app.listen(<span class="hljs-number">3002</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  console.log(<span class="hljs-string">&apos;server listening on port 3002!&apos;</span>)
})
</code></pre><p>&#x7136;&#x540E;&#x5C06;&#x9879;&#x76EE;&#x901A;&#x8FC7;&#x6BD4;&#x5982;ftp&#x7B49;&#x5DE5;&#x5177;&#x4E0A;&#x4F20;&#x5230;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x6211;&#x7528;&#x7684;&#x670D;&#x52A1;&#x5668;&#x662F;nginx&#xFF0C;&#x5B83;&#x7684;&#x7279;&#x70B9;&#x5C31;&#x662F;&#x8F7B;&#x91CF;&#x7EA7;&#xFF0C;&#x9AD8;&#x5E76;&#x53D1;&#xFF0C;&#x53EF;&#x914D;&#x7F6E;&#x53CD;&#x5411;&#x4EE3;&#x7406;&#x3002;&#x7136;&#x540E;&#x9700;&#x8981;&#x914D;&#x7F6E;&#x4E2A;&#x4EE3;&#x7406;&#x5C06;&#x6211;&#x4EEC;&#x5BF9;&#x670D;&#x52A1;&#x5668;&#x7684;&#x8BBF;&#x95EE;&#x4EE3;&#x7406;&#x5230;&#x8BE5;&#x9879;&#x76EE;&#x3002;&#x5728;<code>etc/nginx/conf.d</code>&#x76EE;&#x5F55;&#x4E0B;&#x521B;&#x5EFA;&#x6211;&#x4EEC;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6; <code>holyzheng-top-3002.conf</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# etc/nginx/conf.d/holyzheng-top-3002.conf

# &#x5B9E;&#x4F8B;&#xFF0C;&#x4EE3;&#x8868;&#x6211;&#x4EEC;&#x7684;&#x5E94;&#x7528;
upstream browseexp {
  server 127.0.0.1:3002; 
}
# &#x5C06;&#x4EE5;http&#x534F;&#x8BAE;&#x5BF9;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x7684;&#x8BBF;&#x95EE;&#x8F6C;&#x5230;https&#x534F;&#x8BAE;
server {
  listen 80; # http&#x76D1;&#x542C;&#x7684;&#x7AEF;&#x53E3;
  server_name browseexp.holyzheng.top; # &#x6211;&#x8981;&#x4F7F;&#x7528;&#x7684;ip&#x57DF;&#x540D;
  error_page 405 =200 @405; # &#x5141;&#x8BB8;&#x5BF9;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x8FDB;&#x884C;POST&#x8BF7;&#x6C42;
  location @405 {
    proxy_pass http://browseexp;
  }
  rewrite ^(.*) https://$host$1 permanent;
}

# &#x914D;&#x7F6E;&#x4EE3;&#x7406;&#xFF0C;&#x5C06;&#x5BF9;&#x57DF;&#x540D;browseexp.holyzheng.top&#x7684;&#x8BBF;&#x95EE;&#x4EE3;&#x7406;&#x5230;&#x670D;&#x52A1;&#x7AEF;&#x7684;127.0.0.1:3002
# &#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x5E94;&#x7528;
server {
  listen 443;
  server_name browseexp.holyzheng.top;
# &#x8DDF;&#x8BC1;&#x4E66;&#x6709;&#x5173;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x5728;&#x7533;&#x8BF7;&#x8BC1;&#x4E66;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x6709;&#x63D0;&#x793A;&#x8FD9;&#x90E8;&#x5206;&#x914D;&#x7F6E;
  ssl on;
  ssl_certificate /etc/nginx/cert/1538045542271.pem;
  ssl_certificate_key /etc/nginx/cert/1538045542271.key;
  ssl_session_timeout 5m;
  ssl_protocols SSLv2 SSLv3 TLSv1;
  ssl_ciphers ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
  ssl_prefer_server_ciphers on;

  if ($ssl_protocol = &quot;&quot;) { # &#x5224;&#x65AD;&#x7528;&#x6237;&#x662F;&#x5426;&#x8F93;&#x5165;&#x534F;&#x8BAE;
    rewrite ^(.*) https://$host$1 permanent;
  }

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;

    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;

    proxy_pass http://browseexp; # &#x8981;&#x4EE3;&#x7406;&#x7684;&#x5B9E;&#x4F8B;
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nginx"><code><span class="hljs-comment"># etc/nginx/conf.d/holyzheng-top-3002.conf</span>

<span class="hljs-comment"># &#x5B9E;&#x4F8B;&#xFF0C;&#x4EE3;&#x8868;&#x6211;&#x4EEC;&#x7684;&#x5E94;&#x7528;</span>
<span class="hljs-attribute">upstream</span> browseexp {
  <span class="hljs-attribute">server</span> <span class="hljs-number">127.0.0.1:3002</span>; 
}
<span class="hljs-comment"># &#x5C06;&#x4EE5;http&#x534F;&#x8BAE;&#x5BF9;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x7684;&#x8BBF;&#x95EE;&#x8F6C;&#x5230;https&#x534F;&#x8BAE;</span>
<span class="hljs-section">server</span> {
  <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>; <span class="hljs-comment"># http&#x76D1;&#x542C;&#x7684;&#x7AEF;&#x53E3;</span>
  <span class="hljs-attribute">server_name</span> browseexp.holyzheng.top; <span class="hljs-comment"># &#x6211;&#x8981;&#x4F7F;&#x7528;&#x7684;ip&#x57DF;&#x540D;</span>
  <span class="hljs-attribute">error_page</span> <span class="hljs-number">405</span> =<span class="hljs-number">200</span> @<span class="hljs-number">405</span>; <span class="hljs-comment"># &#x5141;&#x8BB8;&#x5BF9;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x8FDB;&#x884C;POST&#x8BF7;&#x6C42;</span>
  <span class="hljs-attribute">location</span> @<span class="hljs-number">405</span> {
    <span class="hljs-attribute">proxy_pass</span> http://browseexp;
  }
  <span class="hljs-attribute">rewrite</span><span class="hljs-regexp"> ^(.*)</span> https://<span class="hljs-variable">$host</span><span class="hljs-variable">$1</span> <span class="hljs-literal">permanent</span>;
}

<span class="hljs-comment"># &#x914D;&#x7F6E;&#x4EE3;&#x7406;&#xFF0C;&#x5C06;&#x5BF9;&#x57DF;&#x540D;browseexp.holyzheng.top&#x7684;&#x8BBF;&#x95EE;&#x4EE3;&#x7406;&#x5230;&#x670D;&#x52A1;&#x7AEF;&#x7684;127.0.0.1:3002</span>
<span class="hljs-comment"># &#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x5E94;&#x7528;</span>
<span class="hljs-section">server</span> {
  <span class="hljs-attribute">listen</span> <span class="hljs-number">443</span>;
  <span class="hljs-attribute">server_name</span> browseexp.holyzheng.top;
<span class="hljs-comment"># &#x8DDF;&#x8BC1;&#x4E66;&#x6709;&#x5173;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x5728;&#x7533;&#x8BF7;&#x8BC1;&#x4E66;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x6709;&#x63D0;&#x793A;&#x8FD9;&#x90E8;&#x5206;&#x914D;&#x7F6E;</span>
  <span class="hljs-attribute">ssl</span> <span class="hljs-literal">on</span>;
  <span class="hljs-attribute">ssl_certificate</span> /etc/nginx/cert/<span class="hljs-number">1538045542271</span>.pem;
  <span class="hljs-attribute">ssl_certificate_key</span> /etc/nginx/cert/<span class="hljs-number">1538045542271</span>.key;
  <span class="hljs-attribute">ssl_session_timeout</span> <span class="hljs-number">5m</span>;
  <span class="hljs-attribute">ssl_protocols</span> SSLv2 SSLv3 TLSv1;
  <span class="hljs-attribute">ssl_ciphers</span> ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
  <span class="hljs-attribute">ssl_prefer_server_ciphers</span> <span class="hljs-literal">on</span>;

  <span class="hljs-attribute">if</span> (<span class="hljs-variable">$ssl_protocol</span> = <span class="hljs-string">&quot;&quot;</span>) { <span class="hljs-comment"># &#x5224;&#x65AD;&#x7528;&#x6237;&#x662F;&#x5426;&#x8F93;&#x5165;&#x534F;&#x8BAE;</span>
    <span class="hljs-attribute">rewrite</span><span class="hljs-regexp"> ^(.*)</span> https://<span class="hljs-variable">$host</span><span class="hljs-variable">$1</span> <span class="hljs-literal">permanent</span>;
  }

  <span class="hljs-attribute">location</span> / {
    <span class="hljs-attribute">proxy_set_header</span> X-Real-IP <span class="hljs-variable">$remote_addr</span>;
    <span class="hljs-attribute">proxy_set_header</span> X-Forward-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;

    <span class="hljs-attribute">proxy_set_header</span> Host <span class="hljs-variable">$http_host</span>;
    <span class="hljs-attribute">proxy_set_header</span> X-Nginx-Proxy <span class="hljs-literal">true</span>;

    <span class="hljs-attribute">proxy_pass</span> http://browseexp; <span class="hljs-comment"># &#x8981;&#x4EE3;&#x7406;&#x7684;&#x5B9E;&#x4F8B;</span>
  }
}
</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5BF9;&#x4E8E;&#x57DF;&#x540D;&#x6765;&#x8BBF;&#x95EE;&#x4E86;&#x6765;&#x8BBF;&#x95EE;&#x8BE5;&#x9879;&#x76EE;&#x4E86;&#x3002;&#x8FD9;&#x91CC;&#x7ED9;&#x51FA;&#x5BF9;&#x5E94;&#x4E8C;&#x7EF4;&#x7801;&#xFF0C;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x8BBF;&#x95EE;&#x67E5;&#x770B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016477435?w=260&amp;h=260" src="https://static.alili.tech/img/remote/1460000016477435?w=260&amp;h=260" alt="qrcore" title="qrcore" style="cursor:pointer;display:inline"></span></p><p>&#x4E0B;&#x9762;&#x662F;&#x5728;&#x5B89;&#x5353;&#x7AEF;UC&#x6D4F;&#x89C8;&#x5668;&#x8BBF;&#x95EE;&#x7684;&#x7ED3;&#x679C;&#xFF08;&#x56E0;&#x4E3A;UC&#x5BF9;pwa&#x7684;&#x652F;&#x6301;&#x5341;&#x5206;&#x597D;&#xFF09;&#xFF0C;&#x5728;&#x51E0;&#x6B21;&#x8BBF;&#x95EE;&#x6211;&#x4EEC;&#x7684;&#x5E94;&#x7528;&#x540E;&#x5C31;&#x5F39;&#x51FA;&#x4E86;&#x76F8;&#x5173;&#x7684;&#x63D0;&#x793A;&#xFF0C;&#x70B9;&#x51FB;&#x201C;&#x597D;&#x7684;&#x201D;&#x5C31;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x5230;&#x4E3B;&#x5C4F;&#x5E55;&#x4E86;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016477436?w=297&amp;h=524" src="https://static.alili.tech/img/remote/1460000016477436?w=297&amp;h=524" alt="pwademo1" title="pwademo1" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader14">&#x7ED3;&#x8BED;</h2><p>&#x6211;&#x975E;&#x5E38;&#x4EAB;&#x53D7;&#x5C1D;&#x8BD5;&#x65B0;&#x4E8B;&#x7269;&#xFF08;&#x81EA;&#x5DF1;&#x6CA1;&#x505A;&#x8FC7;&#xFF09;&#x7684;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF0C;&#x8FD9;&#x6B21;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;&#x5E76;&#x5206;&#x4EAB;&#x7ED9;&#x5927;&#x5BB6;&#xFF0C;&#x5E0C;&#x671B;&#x5BF9;&#x5927;&#x5BB6;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x770B;&#x540E;&#x6709;&#x4EC0;&#x4E48;&#x8865;&#x5145;&#x6216;&#x610F;&#x89C1;&#x7684;&#x8BDD;&#xFF0C;&#x6B22;&#x8FCE;&#x8BC4;&#x8BBA;&#x533A;&#x63D0;&#x51FA;&#x3002;&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/HolyZheng/BrowseExp" rel="nofollow noreferrer" target="_blank">browse-Exp</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue从零开发和部署一款移动端pwa单页应用

## 原文链接
[https://segmentfault.com/a/1190000016580002](https://segmentfault.com/a/1190000016580002)

