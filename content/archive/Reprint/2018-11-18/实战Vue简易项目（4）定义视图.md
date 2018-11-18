---
title: '实战Vue简易项目（4）定义视图' 
date: 2018-11-18 3:32:07
hidden: true
slug: kqupt7hoet
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x89C6;&#x56FE;</h2><p>&#x5305;&#x542B;&#x5185;&#x5BB9;<code>#NavigationBar</code>&#x3001;<code>#TabBar</code>&#x3001;<code>#MainContext</code>&#xFF1B;</p><p>&#x4E3A;&#x4EC0;&#x4E48;<code>#NavigationBar</code>&#x3001;<code>#TabBar</code>&#x5206;&#x5728;<code>Layout</code>&#x4E2D;&#xFF0C;&#x800C;&#x4E0D;&#x662F;<code>components</code>&#x4E2D;&#xFF1F;</p><p>&#x4EE3;&#x7801;&#x4E0A;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x6CA1;&#x6709;&#x5DEE;&#x522B;&#x7684;&#xFF0C;&#x53EA;&#x662F;&#x8BA4;&#x4E3A;<code>#NavigationBar</code>&#x3001;<code>#TabBar</code>&#x662F;&#x52A0;&#x8F7D;&#x4E00;&#x6B21;&#x7684;&#xFF0C;&#x800C;&#x975E;&#x590D;&#x7528;&#xFF0C;&#x4E14;&#x5C5E;&#x4E8E;&#x9875;&#x9762;&#x5E03;&#x5C40;&#x5185;&#x5BB9;&#x3002;</p><h2 id="articleHeader1">App.vue</h2><p>Vue&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x6839;&#x7EC4;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x91CC;&#x8FDB;&#x884C;&#x5E03;&#x5C40;&#xFF1A;</p><p><code>src/App.vue</code>&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div id=&quot;app&quot;&gt;
    &lt;navigation-bar&gt;&lt;/navigation-bar&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
    &lt;tab-bar&gt;&lt;/tab-bar&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
import TabBar from &quot;@/views/layout/TabBar&quot;;
import NavigationBar from &quot;@/views/layout/NavigationBar&quot;;
export default {
  name: &apos;App&apos;,
  components: {
    &apos;navigation-bar&apos;: NavigationBar,
    &apos;tab-bar&apos;:TabBar,
  }
}
&lt;/script&gt;
&lt;style&gt;
 ...//&#x672A;&#x52A8;&#x539F;&#x6709;&#x6837;&#x5F0F;&#xFF1B;
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">navigation-bar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navigation-bar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab-bar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab-bar</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> TabBar <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/views/layout/TabBar&quot;</span>;
<span class="hljs-keyword">import</span> NavigationBar <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/views/layout/NavigationBar&quot;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;App&apos;</span>,
  <span class="hljs-attr">components</span>: {
    <span class="hljs-string">&apos;navigation-bar&apos;</span>: NavigationBar,
    <span class="hljs-string">&apos;tab-bar&apos;</span>:TabBar,
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
 ...//&#x672A;&#x52A8;&#x539F;&#x6709;&#x6837;&#x5F0F;&#xFF1B;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li>&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;<code>&lt;template /&gt;</code>&#x6807;&#x8BC6; &#x5176;&#x5185;&#x90E8;&#x7684;HTML&#x4E3A;Vue Template&#x3002;</li><li><code>&lt;template /&gt;</code>&#x5185;&#x90E8;<strong>&#x5FC5;&#x6709;&#x4E00;&#x4E2A;&#x4E14;&#x552F;&#x4E00;</strong>&#x7684;&#x8282;&#x70B9;&#xFF08;&#x8FD9;&#x91CC;&#x662F;<code>div#app</code>&#xFF09;&#x5305;&#x88F9;&#x5185;&#x5BB9;&#xFF08;&#x5373;&#x4F7F;&#x53EA;&#x662F;&#x4E00;&#x4E32;&#x5B57;&#x7B26;&#xFF09;--&gt;&#x82E5;&#x5B58;&#x5728;&#x540C;&#x7EA7;&#x8282;&#x70B9;&#xFF0C;&#x5219;&#x4F1A;&#x62A5;&#x9519;&#xFF08;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;VNode&#x4F1A;&#x901A;&#x8FC7;createElement(&apos;div&apos;)&#x6765;&#x521B;&#x5EFA;&#x771F;&#x5B9E;&#x8282;&#x70B9;&#xFF0C;&#x53EA;&#x80FD;&#x662F;&#x5355;&#x4E2A;&#x5143;&#x7D20;&#xFF09;&#xFF1B;</li><li>&#x901A;&#x8FC7;<code>components</code>&#x5C5E;&#x6027;&#x4EE5;&#x952E;&#x503C;&#x5BF9;&#x7684;&#x5F62;&#x5F0F;&#x5F15;&#x5165;&#x7EC4;&#x4EF6;&#xFF0C;&#x6A21;&#x677F;&#xFF08;HTML&#xFF09;&#x4E2D;&#x4F7F;&#x7528;&#x7684;<strong>&#x6807;&#x7B7E;&#x540D;</strong>&#x4E3A;<strong>&#x952E;&#x540D;</strong>&#xFF08;&#x81EA;&#x5B9A;&#x4E49;&#x5143;&#x7D20;VNode&#xFF09;&#xFF0C;&#x503C;&#x4E3A;&#x5BFC;&#x5165;&#x7684;&#x7EC4;&#x4EF6;&#x6A21;&#x5757;&#xFF1B;</li><li>&#x901A;&#x8FC7;<code>components</code>&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x9650;&#x5236;&#x4E86;&#x7EC4;&#x4EF6;&#x5E94;&#x7528;&#x7684;&#x8303;&#x56F4;&#x3002;&#x5373;&#xFF1A;&#x5982;&#x679C;&#x4F60;&#x5728;&#x5176;&#x5B83;&#x6587;&#x4EF6;<strong>&#x76F4;&#x63A5;</strong>&#x4F7F;&#x7528;<code>&lt;navigation-bar&gt;&lt;/navigation-bar&gt;</code>&#xFF0C;&#x63A7;&#x5236;&#x53F0;&#x4F1A;&#x62A5;&#x9519;&#xFF1A;&#x7EC4;&#x4EF6;&#x672A;&#x6CE8;&#x518C;--&gt;&#x8FD9;&#x5C31;&#x662F;<strong>&#x7EC4;&#x4EF6;&#x7684;&#x5C40;&#x90E8;&#x6CE8;&#x518C;</strong>&#x3002;</li><li><strong>&#x5C40;&#x90E8;&#x6CE8;&#x518C;</strong>&#x7684;&#x7EC4;&#x4EF6;&#x8981;&#x6C42;&#xFF1A;&#x5982;&#x679C;&#x5728;&#x67D0;&#x4E00;&#x6587;&#x4EF6;&#x4E2D;&#x5E94;&#x7528;&#x8BE5;&#x7EC4;&#x4EF6;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x4F7F;&#x7528;<code>components</code>&#x6CE8;&#x518C;&#x4E00;&#x6B21;&#x3002;</li><li>&#x5BFC;&#x5165;&#x7EC4;&#x4EF6;<code>import TabBar from &quot;@/views/layout/TabBar&quot;;</code>&#x8DEF;&#x5F84;&#x4EE5;<code>@</code>&#x8D77;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;<code>build/webpack.base.conf.js</code>&#x4E2D;&#x914D;&#x7F6E;&#x7684;&#x8DEF;&#x5F84;&#x522B;&#x540D;<code>&apos;@&apos; === &quot;resolve(&apos;src&apos;)&quot;</code>&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  resolve: {
    extensions: [&apos;.js&apos;, &apos;.vue&apos;, &apos;.json&apos;],
    alias: {
      &apos;vue$&apos;: &apos;vue/dist/vue.esm.js&apos;,
      &apos;@&apos;: resolve(&apos;src&apos;), //&#x53EF;&#x4EE5;&#x8FFD;&#x52A0;&#x5F53;&#x524D;&#x9879;&#x76EE;&#x4E0B;&#xFF0C;&#x60F3;&#x5FEB;&#x6377;&#x8BBF;&#x95EE;&#x7684;&#x6587;&#x4EF6;&#x76EE;&#x5F55;
    }
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>  <span class="hljs-selector-tag">resolve</span>: {
    <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.vue&apos;</span>, <span class="hljs-string">&apos;.json&apos;</span>],
    alias: {
      <span class="hljs-string">&apos;vue$&apos;</span>: <span class="hljs-string">&apos;vue/dist/vue.esm.js&apos;</span>,
      <span class="hljs-string">&apos;@&apos;</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">&apos;src&apos;</span>), //&#x53EF;&#x4EE5;&#x8FFD;&#x52A0;&#x5F53;&#x524D;&#x9879;&#x76EE;&#x4E0B;&#xFF0C;&#x60F3;&#x5FEB;&#x6377;&#x8BBF;&#x95EE;&#x7684;&#x6587;&#x4EF6;&#x76EE;&#x5F55;
    }
  },</code></pre><hr><p><strong>&#x4E34;&#x65F6;</strong>&#x5B9A;&#x4E49;&#x7684;&#x7EC4;&#x4EF6;&#x6587;&#x4EF6;&#xFF1A;</p><p><code>src/views/layout/NavigationBar.vue</code>&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;header&gt;NavigationBar&lt;/header&gt;
&lt;/template&gt;
&lt;style scoped&gt;
  header{
    border-bottom: 4px solid #821910;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>NavigationBar<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">header</span>{
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">4px</span> solid <span class="hljs-number">#821910</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li>&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;<code>style[scoped]</code>&#x5B9A;&#x4E49;&#x4E00;&#x4EFD;&#x6837;&#x5F0F;&#xFF0C;&#x5176;&#x4F5C;&#x7528;&#x8303;&#x56F4;&#x4EC5;&#x9650;&#x4E8E;&#x5F53;&#x524D;&#x6587;&#x4EF6;&#xFF08;&#x53C8;&#x53EF;&#x79F0;&#x6A21;&#x5757;&#xFF09;&#x6A21;&#x677F;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x3002;</li><li>&#x50CF;&#x4E0B;&#x8FB9;&#xFF0C;&#x5728;<code>TabBar.vue</code>&#x4E2D;&#x7684;<code>header</code>&#x5143;&#x7D20;&#x5C31;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x5230;&#x8BE5;&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x5BF9;&#x5E94;&#x6837;&#x5F0F;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;<strong>&#x5C40;&#x90E8;&#x4F5C;&#x7528;&#x57DF;</strong>&#x7684;&#x6837;&#x5F0F;&#x3002;</li><li>&#x5C40;&#x90E8;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x6837;&#x5F0F;&#x53EA;&#x5BF9;<strong>&#x5F53;&#x524D;&#x6587;&#x4EF6;<code>&lt;template/&gt;</code></strong>&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x8D77;&#x4F5C;&#x7528;&#xFF0C;&#x60F3;&#x6539;&#x53D8;<code>body</code>&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x4E0D;&#x597D;&#x610F;&#x601D;&#xFF0C;&#x8BF7;&#x5168;&#x5C40;&#x5BFC;&#x5165;&#x6216;&#x4E0D;&#x4F7F;&#x7528;&#x5C40;&#x90E8;&#x4F5C;&#x7528;&#x57DF;&#x3002;</li></ul><p><code>src/views/layout/TabBar.vue</code>&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    &lt;header&gt;&#x6D4B;&#x8BD5;&#x662F;&#x5426;&#x548C;NavigationBar&#x4E00;&#x6837;&#x7684;&#x6548;&#x679C;&lt;/header&gt;
    &lt;footer&gt;TabBar&lt;/footer&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;style scoped&gt;
  footer{
    border-bottom: 4px solid #07776e;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>&#x6D4B;&#x8BD5;&#x662F;&#x5426;&#x548C;NavigationBar&#x4E00;&#x6837;&#x7684;&#x6548;&#x679C;<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>TabBar<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">footer</span>{
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">4px</span> solid <span class="hljs-number">#07776e</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><h3 id="articleHeader2">&#x663E;&#x793A;&#x6548;&#x679C;&#xFF1A;</h3><p><span class="img-wrap"><img data-src="/img/bVbeCm1?w=557&amp;h=420" src="https://static.alili.tech/img/bVbeCm1?w=557&amp;h=420" alt="App" title="App" style="cursor:pointer"></span></p><h2 id="articleHeader3">NavigationBar</h2><p><code>#NavigationBar</code>&#x4E2D;&#x5206;&#x5DE6;&#x53F3;&#x7ED3;&#x6784;&#xFF0C;&#x5DE6;&#x8FB9;&#x6309;&#x94AE;&#x540E;&#x9000;&#xFF0C;&#x53F3;&#x8FB9;&#x6309;&#x94AE;&#x66F4;&#x65B0;&#x9875;&#x9762;&#x3002;</p><p>&#x66F4;&#x65B0;&#x9875;&#x9762;&#x53EA;&#x662F;&#x66F4;&#x65B0;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6574;&#x4E2A;&#x9875;&#x9762;&#x7684;&#x5237;&#x65B0;&#xFF0C;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x66F4;&#x65B0;&#x6570;&#x636E;&#x7684;&#x63A5;&#x53E3;&#x4E0D;&#x540C;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x8981;&#x4F5C;&#x4E3A;&#x7EC4;&#x4EF6;&#x5C5E;&#x6027;&#x4F20;&#x5165;&#x3002;</p><p>&#x5728;<code>src/views/layout/navigationBar.vue</code>&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;header class=&quot;navigation_bar&quot;&gt;
    &lt;button @click=&quot;goBack&quot; class=&quot;navigation_back&quot;&gt;
      &lt;i class=&quot;arrow&quot;&gt;&lt;/i&gt;
      &lt;span class=&quot;back_tip&quot;&gt;&#x5173;&#x95ED;&lt;/span&gt;
    &lt;/button&gt;
    &lt;h2 v-if=&quot;hasTitle&quot; class=&quot;navigation_title&quot;&gt;"{{"title"}}"&lt;/h2&gt;
    &lt;button class=&quot;refresh&quot; @click=&quot;onRefresh&quot;&gt;&#x5237;&#x65B0;&lt;/button&gt;
  &lt;/header&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;navigation_bar&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;goBack&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;navigation_back&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;arrow&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;back_tip&quot;</span>&gt;</span>&#x5173;&#x95ED;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;hasTitle&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;navigation_title&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;refresh&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;onRefresh&quot;</span>&gt;</span>&#x5237;&#x65B0;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre><ul><li>&#x8BE5;&#x90E8;&#x5206;&#x4E3A;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;<code>#NavigationBar</code>&#x7684;Template&#x90E8;&#x5206;&#x3002;</li><li><code>@click</code>&#x662F;<code>v-on:click</code>&#x7684;&#x7B80;&#x5199;&#xFF0C;&#x7528;&#x4E8E;&#x7ED1;&#x5B9A;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x3002;</li><li><code>v-if</code>&#x662F;<code>Vue</code>&#x4E2D;&#x7684;&#x6761;&#x4EF6;&#x6307;&#x4EE4;&#xFF0C;&#x6839;&#x636E;&#x8FD4;&#x56DE;&#x7684;&#x5E03;&#x5C14;&#x503C;&#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x6216;&#x79FB;&#x9664;DOM&#x5143;&#x7D20;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
  /**
   * @title&#xFF1A;&#x5934;&#x90E8;&#x6807;&#x9898;&#xFF1B;
   * @refresh&#xFF1A;&#x5237;&#x65B0;&#x5904;&#x7406;&#x51FD;&#x6570;&#xFF1B;
   */
  export default {
    props: [&apos;title&apos;, &apos;refresh&apos;],
    computed: {
      hasTitle() {
        return this.title &amp;&amp; this.title.trim();
      },
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      onRefresh() {
        this.refresh();
      },
    },
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>&lt;script&gt;
  <span class="hljs-comment">/**
   * <span class="hljs-doctag">@title</span>&#xFF1A;&#x5934;&#x90E8;&#x6807;&#x9898;&#xFF1B;
   * <span class="hljs-doctag">@refresh</span>&#xFF1A;&#x5237;&#x65B0;&#x5904;&#x7406;&#x51FD;&#x6570;&#xFF1B;
   */</span>
  export <span class="hljs-keyword">default</span> {
    props: [<span class="hljs-string">&apos;title&apos;</span>, <span class="hljs-string">&apos;refresh&apos;</span>],
    computed: {
      hasTitle() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.title &amp;&amp; <span class="hljs-keyword">this</span>.title.trim();
      },
    },
    methods: {
      goBack() {
        <span class="hljs-keyword">this</span>.$router.back()
      },
      onRefresh() {
        <span class="hljs-keyword">this</span>.refresh();
      },
    },
  }
&lt;/script&gt;</code></pre><ul><li>&#x8BE5;&#x90E8;&#x5206;&#x4E3A;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;<code>#NavigationBar</code>&#x7684;&#x7EC4;&#x4EF6;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x3002;</li><li><p><code>props</code>&#x4E3A;&#x7236;&#x7EA7;&#xFF08;&#x8C03;&#x7528;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x7EC4;&#x4EF6;&#xFF09;&#x4F20;&#x8FC7;&#x6765;&#x7684;&#x5C5E;&#x6027;&#x3002;</p><ul><li><p>&#x4F20;&#x503C;&#x65B9;&#x5F0F;<code>&lt;navigation-bar title=&quot;&#x6211;&#x662F;&#x6807;&#x9898;&quot; :refresh=&quot;refresh&quot;&gt;&lt;/navigation-bar&gt;</code>&#xFF08;&#x9700;&#x8981;&#x5728;<code>src/App.vue</code>&#x4E2D;&#x5B9A;&#x4E49;<code>refresh</code>&#x51FD;&#x6570;&#xFF09;</p><ul><li><code>title</code>&#x4F20;&#x7684;&#x503C;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x4E0D;&#x9700;&#x8981;<code>:</code>&#x524D;&#x7F00;&#xFF1B;</li><li><code>:refresh</code>&#x4F20;&#x7684;&#x503C;&#x4E3A;&#x975E;&#x5B57;&#x7B26;&#x4E32;&#xFF08;&#x6570;&#x5B57;&#x3001;&#x5E03;&#x5C14;&#x503C;&#x3001;&#x51FD;&#x6570;&#x3001;&#x6570;&#x7EC4;&#x3001;&#x5BF9;&#x8C61;...&#xFF09;&#xFF0C;<code>:</code>&#x4E3A;&#x524D;&#x7F00;&#xFF0C;&#x503C;&#x4E3A;Javascript&#x8868;&#x8FBE;&#x5F0F;&#x8BA1;&#x7B97;&#x7ED3;&#x679C;&#xFF1B;</li></ul></li><li>&#x5728;&#x7A0B;&#x5E8F;&#x4E2D;&#xFF0C;&#x5982;<code>this.title</code>&#x5F15;&#x7528;<code>props</code>&#x7684;&#x503C;&#x3002;</li><li>&#x5728;&#x6A21;&#x677F;&#x4E2D;&#xFF0C;&#x4F5C;&#x5143;&#x7D20;&#x7684;innerHTML&#x5185;&#x5BB9;&#x65F6;&#xFF0C;&#x5982;<code>"{{"title"}}"</code>&#x5F15;&#x7528;&#x3002;</li></ul></li><li><p><code>methods</code>&#x4E3A;&#x8BE5;&#x7EC4;&#x4EF6;&#x5185;&#xFF0C;&#x5143;&#x7D20;&#x7ED1;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#x3002;</p><ul><li>&#x5728;&#x7A0B;&#x5E8F;&#x4E2D;&#xFF0C;&#x5982;<code>this.refresh()</code>&#x5F15;&#x7528;&#x3002;</li><li>&#x5728;&#x6A21;&#x677F;&#x4E2D;&#xFF0C;&#x5982;<code>@click=&quot;onRefresh&quot;</code>&#x8C03;&#x7528;&#xFF0C;&#x4F20;&#x5165;&#x7684;&#x662F;&#x51FD;&#x6570;&#x5E94;&#x7528;&#xFF1B;&#x82E5;&#x4F20;&#x53C2;&#xFF0C;&#x5982;<code>@click=&quot;onRefresh(param)&quot;</code>&#x8C03;&#x7528;&#x3002;</li></ul></li><li><p><code>computed</code>&#x672C;&#x8EAB;&#x5199;&#x6CD5;&#x548C;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x4E00;&#x81F4;&#xFF0C;&#x7136;&#x800C;&#xFF0C;&#x5176;&#x672C;&#x8EAB;&#x662F;&#x4E00;&#x4E2A;<code>data</code>&#xFF08;&#x6570;&#x636E;&#x6E90;&#xFF09;&#xFF0C;&#x5B57;&#x6BB5;&#x540D;&#x4E3A;&#x51FD;&#x6570;&#x540D;&#xFF0C;&#x503C;&#x4E3A;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;</p><ul><li>&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x4E0E;<code>props</code>&#x4E00;&#x81F4;&#x3002;</li></ul></li></ul><table><thead><tr><th>&#x533A;&#x522B;</th><th align="left">method</th><th align="left">computed</th></tr></thead><tbody><tr><td>&#x7C7B;&#x578B;</td><td align="left">&#x51FD;&#x6570;</td><td align="left">&#x6570;&#x636E;&#x53D8;&#x91CF;</td></tr><tr><td>&#x53C2;&#x6570;</td><td align="left">&#x53EF;&#x4EE5;&#x5E26;&#x53C2;</td><td align="left">&#x4E0D;&#x5E26;&#x53C2;&#xFF08;&#x975E;&#x51FD;&#xFF09;</td></tr><tr><td>&#x89E6;&#x53D1;</td><td align="left">&#x4EA4;&#x4E92;&#x65F6;&#x89E6;&#x53D1;</td><td align="left">&#x58F0;&#x660E;&#x5185;&#x90E8;&#x7684;this&#x5C5E;&#x6027;&#x7684;&#x503C;&#x53D8;&#x5316;&#x65F6;&#x6267;&#x884C;</td></tr></tbody></table><h3 id="articleHeader4">&#x663E;&#x793A;&#x6548;&#x679C;</h3><p>&#x8FD9;&#x91CC;&#x6837;&#x5F0F;&#x8BF7;&#x5927;&#x5BB6;&#x968F;&#x610F;&#x8BBE;&#x5B9A;&#xFF0C;&#x6211;&#x4F7F;&#x7528;&#x7684;&#x662F;flexBox&#x5E03;&#x5C40;&#x3002;</p><p>&#x70B9;&#x51FB;&#x5237;&#x65B0;&#xFF0C;&#x6211;&#x5B9A;&#x4E49;&#x4E86;<code>console.log(&apos;refresh success&apos;)</code>&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbeKam?w=692&amp;h=287" src="https://static.alili.tech/img/bVbeKam?w=692&amp;h=287" alt="Navigation" title="Navigation" style="cursor:pointer"></span></p><h2 id="articleHeader5">TabBar</h2><p><code>#TabBar</code>&#x5206;&#x4EE5;&#x4E0B;&#x60C5;&#x51B5;&#xFF1A;</p><ul><li>&#x65E0;</li><li>&#x4E00;&#x4E2A;&#x6309;&#x94AE;</li><li>&#x4E24;&#x4E2A;&#x6309;&#x94AE;</li></ul><p>&#x6BCF;&#x4E2A;&#x89C6;&#x56FE;&#x4E2D;<code>#TabBar</code>&#x6309;&#x94AE;&#x662F;&#x4E0D;&#x540C;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x6309;&#x94AE;&#x7684;&#x914D;&#x7F6E;&#x8981;&#x5F53;&#x4F5C;&#x7EC4;&#x4EF6;&#x5C5E;&#x6027;&#x4F20;&#x5165;&#xFF08;&#x63A7;&#x5236;&#x53D8;&#x5316;&#x7684;&#x91CF;&#xFF09;&#x3002;</p><h3 id="articleHeader6">&#x6D4B;&#x8BD5;&#x6570;&#x636E;&#x6E90;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const tabBars = [
  {
    label: &apos;&#x63D0;&#x4EA4;&apos;,
    eventType: &apos;click&apos;,
    disabled: false,
    callBack(vm) {
      console.log(&apos;&#x5355;&#x51FB;&#xFF0C;&#x63D0;&#x4EA4;&apos;);
    }
  },
  {
    label: &apos;&#x53D6;&#x6D88;&apos;,
    eventType: &apos;dblclick&apos;, //&#x8BE5;&#x4E8B;&#x4EF6;&#x5728;&#x624B;&#x673A;&#x6A21;&#x5F0F;&#x4E0B;&#x65E0;&#x6CD5;&#x54CD;&#x5E94;&#x5462;&#xFF0C;&#x53EA;&#x80FD;&#x5728;PC&#x6A21;&#x5F0F;&#x4E0B;&#x8C03;&#x8BD5;
    disabled: false,
    callBack(vm) {
      console.log(&apos;&#x53CC;&#x51FB;&#xFF0C;&#x53D6;&#x6D88;&apos;);
    }
  }
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>const tabBars = [
  {
    <span class="hljs-keyword">label</span><span class="bash">: <span class="hljs-string">&apos;&#x63D0;&#x4EA4;&apos;</span>,
</span>    eventType: <span class="hljs-string">&apos;click&apos;</span>,
    disabled: false,
    callBack(vm) {
      console.log(<span class="hljs-string">&apos;&#x5355;&#x51FB;&#xFF0C;&#x63D0;&#x4EA4;&apos;</span>);
    }
  },
  {
    <span class="hljs-keyword">label</span><span class="bash">: <span class="hljs-string">&apos;&#x53D6;&#x6D88;&apos;</span>,
</span>    eventType: <span class="hljs-string">&apos;dblclick&apos;</span>, //&#x8BE5;&#x4E8B;&#x4EF6;&#x5728;&#x624B;&#x673A;&#x6A21;&#x5F0F;&#x4E0B;&#x65E0;&#x6CD5;&#x54CD;&#x5E94;&#x5462;&#xFF0C;&#x53EA;&#x80FD;&#x5728;PC&#x6A21;&#x5F0F;&#x4E0B;&#x8C03;&#x8BD5;
    disabled: false,
    callBack(vm) {
      console.log(<span class="hljs-string">&apos;&#x53CC;&#x51FB;&#xFF0C;&#x53D6;&#x6D88;&apos;</span>);
    }
  }
]</code></pre><p><code>src/views/layout/TabBar.vue</code>&#x7684;&#x6A21;&#x677F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;footer class=&quot;tab-bar&quot; v-if=&quot;isRender&quot;&gt;
    &lt;div class=&quot;tab-button&quot; v-for=&quot;tab in tabBars&quot; :key=&quot;tab.label&quot;&gt;
      &lt;template&gt;
        &lt;tab-button :el=&quot;$parent&quot; :disabled=&quot;tab.disabled&quot; :event=&quot;tab.eventType&quot; :callBack=&quot;tab.callBack&quot;&gt;
          &lt;span&gt;"{{"tab.label"}}"&lt;/span&gt;
        &lt;/tab-button&gt;
      &lt;/template&gt;
    &lt;/div&gt;
  &lt;/footer&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tab-bar&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;isRender&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tab-button&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;tab in tabBars&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;tab.label&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tab-button</span> <span class="hljs-attr">:el</span>=<span class="hljs-string">&quot;$parent&quot;</span> <span class="hljs-attr">:disabled</span>=<span class="hljs-string">&quot;tab.disabled&quot;</span> <span class="hljs-attr">:event</span>=<span class="hljs-string">&quot;tab.eventType&quot;</span> <span class="hljs-attr">:callBack</span>=<span class="hljs-string">&quot;tab.callBack&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"tab.label"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tab-button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre><ul><li><p><code>v-for=&quot;tab in tabBars&quot;</code>&#x662F;<code>Vue</code>&#x4E2D;&#x7684;&#x5FAA;&#x73AF;&#x7ED3;&#x6784;&#xFF0C;&#x642D;&#x914D;<code>:key</code>&#x4F7F;&#x7528;&#xFF0C;&#x4F18;&#x5316;<code>Vue</code>&#x7684;&#x6E32;&#x67D3;&#x673A;&#x5236;&#xFF1B;</p><ul><li>&#x5BF9;<code>tabBars</code>&#x8FDB;&#x884C;&#x904D;&#x5386;&#xFF0C;<code>tab</code>&#x4E3A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x3002;</li><li>&#x540C;&#x6837;<code>key</code>&#x503C;&#xFF0C;&#x5728;&#x66F4;&#x65B0;&#x65F6;&#xFF0C;&#x4F1A;&#x590D;&#x7528;&#x7EC4;&#x4EF6;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x9500;&#x6BC1;&#x540E;&#xFF0C;&#x518D;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</li></ul></li><li><p><code>&lt;tab-button :el=&quot;$parent&quot; :disabled=&quot;tab.disabled&quot; :event=&quot;tab.eventType&quot; :callBack=&quot;tab.callBack&quot;&gt;</code>&#x8FD9;&#x662F;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x7EC4;&#x4EF6;&#x7684;&#x5F15;&#x7528;&#x3002;</p><ul><li><code>$parent</code>&#x662F;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;<code>#TabBar</code>&#x7684;&#x7236;&#x5B9E;&#x4F8B;&#xFF08;<code>#App</code>&#xFF09;&#x3002;</li></ul></li></ul><p><code>src/views/layout/TabBar.vue</code>&#x7EC4;&#x4EF6;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
  const tabButton = {
    render(createElement) {
      return createElement(
        &apos;button&apos;,
        {
          &quot;class&quot;: this.className,
          on: {
            [this.event]: this.tabClick,
          },
        },
        this.$slots.default, //&#x6307;&#x4EE3;&lt;span&gt;"{{"tab.label"}}"&lt;/span&gt;
      )
    },
    props: [&apos;event&apos;, &apos;callBack&apos;, &apos;disabled&apos;,&apos;el&apos;],
    computed: {
      className() {
        return this.disabled ? &apos;tab-label disabled&apos; : &apos;tab-label&apos;;
      }
    },
    methods: {
      tabClick() {
        if (this.disabled) return;
        this.callBack &amp;&amp; this.callBack(this.el)
      }
    }
  }
  export default {
    components: {
      &apos;tab-button&apos;: tabButton
    },
    props: [&apos;tabBars&apos;],
    computed: {
      isRender() {
        const isRender = _.isArray(this.tabBars) &amp;&amp; this.tabBars.length !== 0;
        return isRender;
      },
    },
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>&lt;script&gt;
  const tabButton = {
    render(createElement) {
      <span class="hljs-keyword">return</span> createElement(
        <span class="hljs-string">&apos;button&apos;</span>,
        {
          <span class="hljs-string">&quot;class&quot;</span>: <span class="hljs-keyword">this</span>.className,
          on: {
            [<span class="hljs-keyword">this</span>.event]: <span class="hljs-keyword">this</span>.tabClick,
          },
        },
        <span class="hljs-keyword">this</span>.$slots.<span class="hljs-keyword">default</span>, <span class="hljs-comment">//&#x6307;&#x4EE3;&lt;span&gt;"{{"tab.label"}}"&lt;/span&gt;</span>
      )
    },
    props: [<span class="hljs-string">&apos;event&apos;</span>, <span class="hljs-string">&apos;callBack&apos;</span>, <span class="hljs-string">&apos;disabled&apos;</span>,<span class="hljs-string">&apos;el&apos;</span>],
    computed: {
      className() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.disabled ? <span class="hljs-string">&apos;tab-label disabled&apos;</span> : <span class="hljs-string">&apos;tab-label&apos;</span>;
      }
    },
    methods: {
      tabClick() {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.disabled) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">this</span>.callBack &amp;&amp; <span class="hljs-keyword">this</span>.callBack(<span class="hljs-keyword">this</span>.el)
      }
    }
  }
  export <span class="hljs-keyword">default</span> {
    components: {
      <span class="hljs-string">&apos;tab-button&apos;</span>: tabButton
    },
    props: [<span class="hljs-string">&apos;tabBars&apos;</span>],
    computed: {
      isRender() {
        const isRender = _.isArray(<span class="hljs-keyword">this</span>.tabBars) &amp;&amp; <span class="hljs-keyword">this</span>.tabBars.length !== <span class="hljs-number">0</span>;
        <span class="hljs-keyword">return</span> isRender;
      },
    },
  }
&lt;/script&gt;</code></pre><ul><li><p>&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86;&#x53E6;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;<code>tabButton</code>&#xFF0C;&#x5176;&#x4E0E; &#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6; &#x7684;&#x533A;&#x522B;&#x4EC5;&#x4EC5;&#x5728;&#x4E8E;<strong>&#x4F7F;&#x7528;<code>render</code>&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x6A21;&#x677F;</strong>&#x3002;</p><ul><li><p><strong>&#x4F18;&#x52BF;&#xFF1A;</strong>&#x5B9A;&#x4E49;&#x51FA;&#x6765;&#x7684;&#x7EC4;&#x4EF6;&#x66F4;&#x5177;&#x6709;&#x7075;&#x6D3B;&#x6027;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;<code>on</code>&#x5C5E;&#x6027;&#x53EF;&#x4EE5;<strong>&#x52A8;&#x6001;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;</strong>&#x3002;</p><ul><li><strong>&#x6CE8;&#x610F;&#xFF1A;</strong>&#x8FD9;&#x91CC;&#x7684;&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;<code>[this.event]</code>&#x662F;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x5462;&#xFF01;</li></ul></li><li>&#x7EC4;&#x4EF6;<strong>&#x672C;&#x8D28;&#x4E0A;&#x53EA;&#x662F;&#x4E00;&#x4E2A;JavaScript&#x5BF9;&#x8C61;</strong>&#xFF08;&#x865A;&#x62DF;DOM&#xFF09;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x6309;<code>Vue</code>&#x89C4;&#x5B9A;&#x7684;&#x6210;&#x5458;&#x5C5E;&#x6027;&#x6784;&#x5EFA;&#xFF0C;&#x533A;&#x522B;&#x53EA;&#x5728;&#x4E8E;<code>Template</code>&#x7684;&#x5199;&#x4F5C;&#x6A21;&#x5F0F;&#x3002;</li></ul></li><li>&#x8FD9;&#x91CC;&#x5E94;&#x7528;&#x4E86;<a href="https://segmentfault.com/a/1190000005631139">Slot</a>&#xFF0C;&#x6307;&#x4EE3;&#x8BE5;&#x7EC4;&#x4EF6;&#x5D4C;&#x5957;&#x7684;&#x5B50;&#x8282;&#x70B9;&#x3002;</li><li>&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86;<code>underscore.js</code>&#xFF08;<code>_.isArray</code>&#xFF09;&#xFF0C;&#x9700;&#x8981;&#x5728;<code>build/webpack.base.conf.js</code>&#x4E2D;&#x914D;&#x7F6E;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require(&apos;webpack&apos;);
...
module.exports = {
  ...
  module:{
    ...
  },
  plugins:[
    new webpack.ProvidePlugin({
      _: &apos;underscore&apos;,
    }),
  ],
  ..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>const webpack = require(<span class="hljs-string">&apos;webpack&apos;</span>);
...
<span class="hljs-keyword">module</span>.exports = {
  ...
  <span class="hljs-keyword">module</span>:{
    ...
  },
  plugins:[
    new webpack.ProvidePlugin({
      _: <span class="hljs-string">&apos;underscore&apos;</span>,
    }),
  ],
  ...</code></pre><p>&#x7136;&#x540E;&#xFF0C;<code>underscore</code>&#x5728;&#x5168;&#x5C40;&#x53EF;&#x7528;&#x3002;</p><p>&#x56E0;&#x4E3A;&#x8FD9;&#x91CC;&#x7684;&#x914D;&#x7F6E;&#x5BF9;<code>dev</code>&#x548C;<code>prod</code>&#x73AF;&#x5883;&#x662F;&#x4E00;&#x81F4;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x76F4;&#x63A5;&#x5728;<code>build/webpack.base.conf.js</code>&#x4E2D;&#x914D;&#x7F6E;&#x4E86;&#x3002;</p><h3 id="articleHeader7">&#x663E;&#x793A;&#x6548;&#x679C;</h3><p><span class="img-wrap"><img data-src="/img/bVbeNAJ?w=637&amp;h=321" src="https://static.alili.tech/img/bVbeNAJ?w=637&amp;h=321" alt="tabBars" title="tabBars" style="cursor:pointer"></span></p><h2 id="articleHeader8">&#x6574;&#x4F53;Layout&#x5E03;&#x5C40;</h2><p>&#x6700;&#x7EC8;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x505A;&#x4E00;&#x4E2A;&#x9876;&#x5929;&#x7ACB;&#x5730;&#x7684;&#x5185;&#x6EDA;&#x52A8;&#x7ED3;&#x6784;&#xFF08;&#x4F7F;&#x7528;flexBox&#x5E03;&#x5C40;&#x5373;&#x53EF;&#xFF09;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbeNBz?w=797&amp;h=603" src="https://static.alili.tech/img/bVbeNBz?w=797&amp;h=603" alt="&#x5185;&#x6EDA;&#x52A8;&#x7ED3;&#x6784;" title="&#x5185;&#x6EDA;&#x52A8;&#x7ED3;&#x6784;" style="cursor:pointer"></span></p><p><code>src/App.vue</code>&#x6837;&#x5F0F;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style lang=&quot;scss&quot; scoped&gt;
@import &quot;@/styles/mixins.scss&quot;;

#app {
  @include flex($direction: column);
}

.main-context {
  flex-grow: 1;
  overflow: hidden;
  overflow-y: auto;
}
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code>&lt;style lang=<span class="hljs-string">&quot;scss&quot;</span> scoped&gt;
@<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;@/styles/mixins.scss&quot;</span>;

<span class="hljs-meta">#app {</span>
  @include flex($direction: column);
}

.main-context {
  flex-grow: <span class="hljs-number">1</span>;
  <span class="hljs-built_in">overflow</span>: hidden;
  <span class="hljs-built_in">overflow</span>-y: <span class="hljs-keyword">auto</span>;
}
&lt;/style&gt;</code></pre><p>&#x5176;&#x4E2D;<code>src/styles/mixins.scss</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@mixin flex($direction:row, $alignItems: stretch, $justifyContent: space-between, $basis: auto,$wrap:nowrap) {
  display: flex;
  flex-direction: $direction;
  align-items: $alignItems;
  justify-content: $justifyContent;
  flex-basis: $basis;
  flex-wrap: $wrap;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code>@<span class="hljs-keyword">mixin</span> flex(<span class="hljs-variable">$direction</span>:row, <span class="hljs-variable">$alignItems</span>: stretch, <span class="hljs-variable">$justifyContent</span>: space-between, <span class="hljs-variable">$basis</span>: auto,<span class="hljs-variable">$wrap</span>:nowrap) {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: <span class="hljs-variable">$direction</span>;
  <span class="hljs-attribute">align-items</span>: <span class="hljs-variable">$alignItems</span>;
  <span class="hljs-attribute">justify-content</span>: <span class="hljs-variable">$justifyContent</span>;
  <span class="hljs-attribute">flex-basis</span>: <span class="hljs-variable">$basis</span>;
  <span class="hljs-attribute">flex-wrap</span>: <span class="hljs-variable">$wrap</span>;
}</code></pre><h2 id="articleHeader9">&#x7AE0;&#x8282;&#x56DE;&#x987E;</h2><ul><li>&#x6211;&#x8FD9;&#x91CC;&#x9762;&#x7701;&#x7565;&#x4E86;&#x5C06;&#x5199;&#x597D;&#x7684;<code>#NavigationBar</code>&#x3001;<code>#TabBar</code>&#x66FF;&#x6362;&#x539F;&#x4E34;&#x65F6;&#x642D;&#x5EFA;&#x7684;&#x5BF9;&#x5E94;&#x7EC4;&#x4EF6;&#xFF0C;&#x6211;&#x76F8;&#x4FE1;&#x4F60;&#x80FD;&#x5904;&#x7406;&#x597D;&#xFF0C;&#x5BF9;&#x5427;&#xFF1F;&#xFF01;</li><li><code>#App</code>&#x5C0F;&#x8282;&#x4E2D;&#xFF0C;&#x662F;&#x600E;&#x6837;&#x6CE8;&#x518C;&#x5C40;&#x90E8;&#x7EC4;&#x4EF6;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x8981;&#x5728;&#x9879;&#x76EE;&#x6240;&#x6709;&#x6A21;&#x677F;&#x4E2D;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x6807;&#x7B7E;&#x540D;&#x6765;&#x5E94;&#x7528;&#x7EC4;&#x4EF6;&#xFF0C;&#x8BE5;&#x600E;&#x4E48;&#x5904;&#x7406;&#x5462;&#xFF1F;</li><li><code>#App</code>&#x5C0F;&#x8282;&#x4E2D;&#xFF0C;&#x5982;&#x4F55;&#x5B9A;&#x4E49;&#x5C40;&#x90E8;&#x6837;&#x5F0F;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x8BA9;<code>app.vue</code>&#x4E2D;header&#x7684;&#x6837;&#x5F0F;&#x5168;&#x5C40;&#x53EF;&#x7528;&#xFF0C;&#x8BE5;&#x600E;&#x4E48;&#x5904;&#x7406;&#x5462;&#xFF1F;</li><li>&#x7236;&#x7EC4;&#x4EF6;&#x5982;&#x4F55;&#x4F20;&#x503C;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x82E5;&#x60F3;&#x4F20;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8BE5;&#x5982;&#x4F55;&#x64CD;&#x4F5C;&#xFF1F;</li><li><code>render</code>&#x51FD;&#x6570;&#x5982;&#x4F55;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#xFF0C;&#x4F7F;&#x7528;&#x8BE5;&#x65B9;&#x6CD5;&#x5982;&#x4F55;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#xFF1F;</li><li><code>slot</code>&#x7528;&#x4E8E;&#x4EC0;&#x4E48;&#x60C5;&#x51B5;&#x4E0B;&#x5462;&#xFF0C;&#x6709;&#x4EC0;&#x4E48;&#x597D;&#x5904;&#xFF1F;</li></ul><h2 id="articleHeader10">&#x601D;&#x8003;</h2><ul><li>&#x63A5;&#x4E0B;&#x6765;&#x8981;&#x5B9E;&#x73B0;&#x5217;&#x8868;&#x4E86;&#x5462;&#xFF0C;&#x600E;&#x4E48;&#x505A;&#x5217;&#x8868;&#x6570;&#x636E;&#x5462;&#xFF1F;</li></ul><h2 id="articleHeader11">&#x756A;&#x5916;</h2><ul><li><a href="https://segmentfault.com/a/1190000005631139" target="_blank">Vue Slot&#x5E94;&#x7528;</a></li><li><a href="https://segmentfault.com/a/1190000015882730">&#x7EC4;&#x4EF6;&#x5B9A;&#x4E49;</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实战Vue简易项目（4）定义视图

## 原文链接
[https://segmentfault.com/a/1190000015838078](https://segmentfault.com/a/1190000015838078)

