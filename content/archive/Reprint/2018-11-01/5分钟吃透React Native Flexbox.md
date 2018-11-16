---
title: 5分钟吃透React Native Flexbox
hidden: true
categories: [reprint]
slug: 22a7161a
date: 2018-11-01 02:30:09
---

{{< raw >}}
<p>&#x4ECA;&#x5929;&#x6211;&#x4EEC;&#x6765;&#x804A;&#x804A;Flexbox&#xFF0C;&#x5B83;&#x662F;&#x524D;&#x7AEF;&#x7684;&#x4E00;&#x4E2A;&#x5E03;&#x5C40;&#x65B9;&#x5F0F;&#x3002;&#x5728;React Native&#x4E2D;&#x662F;&#x4E3B;&#x6D41;&#x5E03;&#x5C40;&#x65B9;&#x5F0F;&#x3002;&#x5982;&#x679C;&#x4F60;&#x521A;&#x521A;&#x5165;&#x95E8;React Native&#xFF0C;&#x6216;&#x8005;&#x6CA1;&#x6709;&#x591A;&#x5C11;&#x524D;&#x7AEF;&#x7684;&#x6280;&#x672F;&#x7ECF;&#x9A8C;&#xFF0C;&#x4EA6;&#x6216;&#x8005;&#x5BF9;&#x5176;&#x534A;&#x77E5;&#x534A;&#x89E3;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x5C06;&#x5F88;&#x597D;&#x7684;&#x5E2E;&#x52A9;&#x4F60;&#x53C2;&#x900F;Flexbox&#x7684;&#x6574;&#x4E2A;&#x5168;&#x8C8C;&#x3002;</p><h2 id="articleHeader0">purpose</h2><p>&#x901A;&#x8FC7;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4F60;&#x5C06;&#x5FEB;&#x901F;&#x5403;&#x900F;&#x6574;&#x4E2A;Flexbox&#xFF0C;&#x56E0;&#x4E3A;&#x5BF9;&#x4E8E;Flexbox&#x4F60;&#x53EA;&#x9700;&#x638C;&#x63E1;&#x4EE5;&#x4E0B;&#x51E0;&#x70B9;&#x5C5E;&#x6027;&#x5373;&#x53EF;&#x3002;</p><ul><li>flex</li><li>flexDirection</li><li>justifyContent</li><li>alignItems</li><li>flexWrap</li><li>alignSelf</li></ul><h2 id="articleHeader1">flex</h2><p>Flexbox&#x4F7F;&#x7528;&#x7684;&#x662F;&#x5F39;&#x6027;&#x5E03;&#x5C40;&#xFF0C;&#x5B83;&#x6709;&#x4E2A;&#x5C5E;&#x6027;flex&#x7528;&#x6765;&#x63A7;&#x5236;&#x5B83;&#x7684;&#x5F39;&#x6027;&#x3002;&#x6709;&#x70B9;&#x7C7B;&#x4F3C;&#x4E0E;Android&#x5E03;&#x5C40;&#x4E2D;&#x7684;weight&#x5C5E;&#x6027;&#x3002;&#x5F53;&#x7136;&#x4E0E;&#x524D;&#x7AEF;&#x7684;css&#x4E2D;&#x7684;flex&#x4E5F;&#x6709;&#x6240;&#x4E0D;&#x540C;&#xFF0C;&#x5B83;&#x652F;&#x6301;&#x7684;&#x7C7B;&#x578B;&#x662F;number&#x4E0D;&#x662F;string&#x3002;&#x5B83;&#x6709;&#x4E09;&#x79CD;&#x72B6;&#x6001;&#xFF1A;&#x6B63;&#x6570;&#x3001;&#x96F6;&#x4E0E;&#x8D1F;&#x6570;&#x3002;&#x76F4;&#x63A5;&#x770B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from &apos;react&apos;;
import {StyleSheet, Text, View} from &apos;react-native&apos;;
 
export default class App extends Component&lt;Props&gt; {
  render() {
    return (
      &lt;View style={styles.container}&gt;
          &lt;View style={styles.red}/&gt;
          &lt;View style={styles.blue}/&gt;
          &lt;View style={styles.orange}/&gt;
      &lt;/View&gt;
    );
  }
}
   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: &apos;center&apos;,
    alignItems: &apos;center&apos;,
    backgroundColor: &apos;#F5FCFF&apos;,
  },
  red: {
      flex: 1,
      width: 100,
      backgroundColor: &apos;red&apos;
  },
  blue: {
      flex: 2,
      width: 100,
      backgroundColor: &apos;blue&apos;
  },
  orange: {
      width: 100,
      height: 100,
      backgroundColor: &apos;orange&apos;
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, {<span class="hljs-type">Component</span>} from <span class="hljs-symbol">&apos;reac</span>t&apos;;
<span class="hljs-keyword">import</span> {<span class="hljs-type">StyleSheet</span>, <span class="hljs-type">Text</span>, <span class="hljs-type">View</span>} from <span class="hljs-symbol">&apos;react</span>-native&apos;;
 
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component&lt;Props&gt;</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">View</span> style={styles.container}&gt;
          &lt;<span class="hljs-type">View</span> style={styles.red}/&gt;
          &lt;<span class="hljs-type">View</span> style={styles.blue}/&gt;
          &lt;<span class="hljs-type">View</span> style={styles.orange}/&gt;
      &lt;/<span class="hljs-type">View</span>&gt;
    );
  }
}
   
const styles = <span class="hljs-type">StyleSheet</span>.create({
  container: {
    flex: <span class="hljs-number">1</span>,
    justifyContent: <span class="hljs-symbol">&apos;cente</span>r&apos;,
    alignItems: <span class="hljs-symbol">&apos;cente</span>r&apos;,
    backgroundColor: &apos;#<span class="hljs-type">F5FCFF</span>&apos;,
  },
  red: {
      flex: <span class="hljs-number">1</span>,
      width: <span class="hljs-number">100</span>,
      backgroundColor: <span class="hljs-symbol">&apos;re</span>d&apos;
  },
  blue: {
      flex: <span class="hljs-number">2</span>,
      width: <span class="hljs-number">100</span>,
      backgroundColor: <span class="hljs-symbol">&apos;blu</span>e&apos;
  },
  orange: {
      width: <span class="hljs-number">100</span>,
      height: <span class="hljs-number">100</span>,
      backgroundColor: <span class="hljs-symbol">&apos;orang</span>e&apos;
  }
});</code></pre><p>&#x7236;&#x5BB9;&#x5668;&#x4F7F;&#x7528;flex:1&#x6765;&#x6491;&#x6EE1;&#x6574;&#x4E2A;&#x5C4F;&#x5E55;&#xFF0C;orange&#x662F;&#x56FA;&#x5B9A;&#x7684;&#x4E00;&#x4E2A;view&#xFF0C;&#x800C;red&#x4E0E;blue&#x4F7F;&#x7528;flex&#xFF0C;&#x901A;&#x8FC7;flex&#x7684;&#x503C;&#x8FDB;&#x884C;&#x7B49;&#x6BD4;(1:2)&#x5206;&#x644A;&#x5269;&#x4F59;&#x7684;&#x7A7A;&#x95F4;&#x3002;&#x6765;&#x770B;&#x4E0B;&#x8FD0;&#x884C;&#x6548;&#x679C;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbfVsV?w=340&amp;h=509" src="https://static.alili.tech/img/bVbfVsV?w=340&amp;h=509" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x662F;&#x4E3A;&#x6B63;&#x6570;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x5982;&#x679C;flex:0&#xFF0C;&#x63A7;&#x4EF6;&#x7684;&#x5927;&#x5C0F;&#x5C31;&#x4F1A;&#x6839;&#x636E;&#x8BBE;&#x7F6E;&#x7684;width&#x4E0E;height&#x6765;&#x56FA;&#x5B9A;&#x663E;&#x793A;&#x3002;</p><p>&#x5982;&#x679C;flex:-1&#xFF0C;&#x5982;&#x679C;&#x7A7A;&#x95F4;&#x8DB3;&#x591F;&#xFF0C;&#x63A7;&#x4EF6;&#x7684;&#x5927;&#x5C0F;&#x4E5F;&#x4F1A;&#x6839;&#x636E;width&#x4E0E;height&#x6765;&#x5C55;&#x793A;&#xFF1B;&#x5982;&#x679C;&#x7A7A;&#x95F4;&#x4E0D;&#x8DB3;&#xFF0C;&#x4F1A;&#x6839;&#x636E;minWidth&#x4E0E;minHeight&#x6765;&#x5C55;&#x793A;&#x3002;</p><blockquote>&#x4E00;&#x822C;&#x90FD;&#x4E0D;&#x4F1A;&#x4F7F;&#x7528;flex:-1&#xFF0C;&#x800C;&#x4E14;&#x7ECF;&#x8FC7;&#x6D4B;&#x8BD5;&#xFF0C;&#x7A7A;&#x95F4;&#x4E0D;&#x8DB3;&#x65F6;minWidth&#x4E0E;minHeight&#x5E76;&#x4E0D;&#x4F1A;&#x751F;&#x6548;&#x3002;&#x5982;&#x679C;&#x53D1;&#x73B0;&#x751F;&#x6548;&#x7684;&#x65B9;&#x5F0F;&#x8BF7;&#x52A1;&#x5FC5;&#x544A;&#x77E5;&#x3002;</blockquote><h2 id="articleHeader2">flexDirection</h2><p>&#x5728;Flexbox&#x4E2D;&#x6709;&#x4E3B;&#x8F74;&#x4E0E;&#x526F;&#x8F74;&#x4E4B;&#x5206;&#xFF0C;&#x4E3B;&#x8F74;&#x63A7;&#x5236;child&#x7684;&#x6392;&#x5217;&#x65B9;&#x5411;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;column&#x3002;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;flexDirection&#x5C5E;&#x6027;&#x6539;&#x53D8;&#x4E3B;&#x8F74;&#x65B9;&#x5411;&#x3002;&#x5B83;&#x6709;&#x56DB;&#x4E2A;&#x53EF;&#x9009;&#x503C;&#x5206;&#x522B;&#x4E3A;</p><ul><li>row: child&#x6C34;&#x5E73;&#x65B9;&#x5411;&#x6392;&#x5217;</li><li>column: child&#x7AD6;&#x76F4;&#x65B9;&#x5411;&#x6392;&#x5217;(&#x9ED8;&#x8BA4;)</li><li>row-reverse: child&#x6C34;&#x5E73;&#x65B9;&#x5411;&#x53CD;&#x5411;&#x6392;&#x5217;</li><li>column-reverse: child&#x7AD6;&#x76F4;&#x65B9;&#x5411;&#x53CD;&#x5411;&#x6392;&#x5217;</li></ul><p>&#x5728;&#x4E0A;&#x9762;&#x7684;demo&#x57FA;&#x7840;&#x4E0A;&#x6539;&#x53D8;style&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: &apos;row&apos;,
    justifyContent: &apos;center&apos;,
    alignItems: &apos;center&apos;,
    backgroundColor: &apos;#F5FCFF&apos;,
  },
  red: {
      height: 100,
      width: 100,
      backgroundColor: &apos;red&apos;
  },
  blue: {
      width: 100,
      height: 100,
      backgroundColor: &apos;blue&apos;
  },
  orange: {
      width: 100,
      height: 100,
      backgroundColor: &apos;orange&apos;
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">styles</span> <span class="hljs-string">=</span> <span class="hljs-string">StyleSheet.create({</span>
<span class="hljs-attr">  container:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    flex:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">    flexDirection:</span> <span class="hljs-string">&apos;row&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">    justifyContent:</span> <span class="hljs-string">&apos;center&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">    alignItems:</span> <span class="hljs-string">&apos;center&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">    backgroundColor:</span> <span class="hljs-string">&apos;#F5FCFF&apos;</span><span class="hljs-string">,</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  red:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      height:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">      width:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">      backgroundColor:</span> <span class="hljs-string">&apos;red&apos;</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  blue:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      width:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">      height:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">      backgroundColor:</span> <span class="hljs-string">&apos;blue&apos;</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  orange:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      width:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">      height:</span> <span class="hljs-number">100</span><span class="hljs-string">,</span>
<span class="hljs-attr">      backgroundColor:</span> <span class="hljs-string">&apos;orange&apos;</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">});</span></code></pre><p>&#x5206;&#x522B;&#x6539;&#x53D8;container&#x4E2D;flexDirection&#x7684;&#x503C;&#xFF1A;row&#x3001;row-reverse&#x3001;column&#x3001;column-reverse</p><p><span class="img-wrap"><img data-src="/img/bVbfVsZ?w=800&amp;h=600" src="https://static.alili.tech/img/bVbfVsZ?w=800&amp;h=600" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader3">justifyContent</h2><p>&#x56FA;&#x5B9A;&#x597D;&#x4E3B;&#x8F74;&#x4E4B;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;justifyContent&#x6765;&#x6307;&#x5B9A;&#x4E3B;&#x8F74;&#x65B9;&#x5411;child&#x7684;&#x6392;&#x5217;&#x65B9;&#x5F0F;&#xFF0C;&#x5B83;&#x6709;&#x516D;&#x4E2A;&#x53EF;&#x9009;&#x503C;</p><ul><li>flex-start: child&#x5BF9;&#x9F50;&#x4E3B;&#x8F74;&#x7684;&#x8D77;&#x70B9;(&#x9ED8;&#x8BA4;)</li><li>flex-end: child&#x5BF9;&#x9F50;&#x4E3B;&#x8F74;&#x7684;&#x7EC8;&#x70B9;</li><li>center: child&#x5C45;&#x4E2D;&#x5BF9;&#x9F50;&#x4E3B;&#x8F74;</li><li>space-between: child&#x5728;&#x4E3B;&#x8F74;&#x65B9;&#x5411;&#x76F8;&#x90BB;child&#x7B49;&#x95F4;&#x8DDD;&#x5BF9;&#x9F50;&#xFF0C;&#x9996;&#x5C3E;child&#x4E0E;&#x7236;&#x5BB9;&#x5668;&#x5BF9;&#x9F50;</li><li>space-around: child&#x5728;&#x4E3B;&#x8F74;&#x65B9;&#x5411;&#x76F8;&#x90BB;child&#x7B49;&#x95F4;&#x8DDD;&#x5BF9;&#x9F50;&#xFF0C;&#x9996;&#x5C3E;child&#x4E0E;&#x7236;&#x5BB9;&#x5668;&#x7684;&#x95F4;&#x8DDD;&#x76F8;&#x7B49;&#x4E14;&#x4E3A;&#x76F8;&#x90BB;child&#x95F4;&#x8DDD;&#x7684;&#x4E00;&#x534A;</li><li>space-evenly: child&#x5728;&#x4E3B;&#x8F74;&#x65B9;&#x5411;&#x5747;&#x5300;&#x5206;&#x5E03;&#x3002;&#x76F8;&#x90BB;&#x95F4;&#x8DDD;&#x4E0E;&#x9996;&#x5C3E;&#x95F4;&#x8DDD;&#x76F8;&#x7B49;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  container: {
    flex: 1,
    flexDirection: &apos;row&apos;,
    justifyContent: &apos;flex-start&apos;,
    backgroundColor: &apos;#F5FCFF&apos;,
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>  <span class="hljs-attribute">container</span>: {
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attribute">flexDirection</span>: <span class="hljs-string">&apos;row&apos;</span>,
    <span class="hljs-attribute">justifyContent</span>: <span class="hljs-string">&apos;flex-start&apos;</span>,
    <span class="hljs-attribute">backgroundColor</span>: <span class="hljs-string">&apos;#F5FCFF&apos;</span>,
  }</code></pre><p>&#x4F9D;&#x6B21;&#x6539;&#x53D8;container&#x4E2D;&#x7684;justifyContent&#xFF1A;flex-start&#x3001;flex-end&#x3001;center&#x3001;space-between&#x3001;space-around&#x4E0E;space-evenly</p><p><span class="img-wrap"><img data-src="/img/bVbfVs1?w=800&amp;h=600" src="https://static.alili.tech/img/bVbfVs1?w=800&amp;h=600" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/bVbfVs2?w=800&amp;h=600" src="https://static.alili.tech/img/bVbfVs2?w=800&amp;h=600" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br><span class="img-wrap"><img data-src="/img/bVbfVs3?w=800&amp;h=600" src="https://static.alili.tech/img/bVbfVs3?w=800&amp;h=600" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader4">alignItems</h2><p>&#x4E3B;&#x8F74;&#x56FA;&#x5B9A;&#x4E4B;&#x540E;&#xFF0C;&#x5269;&#x4E0B;&#x7684;&#x5C31;&#x662F;&#x526F;&#x8F74;&#xFF0C;alignItems&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x63A7;&#x5236;&#x526F;&#x8F74;&#x4E0A;&#x7684;child&#x6392;&#x5217;&#x65B9;&#x5F0F;&#x3002;&#x5B83;&#x6709;&#x4E94;&#x4E2A;&#x53EF;&#x9009;&#x9879;&#x5206;&#x522B;&#x4E3A;</p><ul><li>flex-start: child&#x5BF9;&#x9F50;&#x526F;&#x8F74;&#x8D77;&#x70B9;(&#x9ED8;&#x8BA4;)</li><li>flex-end: child&#x5BF9;&#x9F50;&#x526F;&#x8F74;&#x7EC8;&#x70B9;</li><li>center: child&#x5C45;&#x4E2D;&#x5BF9;&#x9F50;&#x526F;&#x8F74;</li><li>stretch: child&#x4E3A;&#x5F39;&#x6027;&#x5E03;&#x5C40;&#x65F6;(&#x672A;&#x8BBE;&#x7F6E;&#x526F;&#x8F74;&#x65B9;&#x5411;&#x7684;&#x5927;&#x5C0F;&#x6216;&#x8005;&#x4E3A;auto)&#xFF0C;&#x62C9;&#x4F38;&#x5BF9;&#x9F50;&#x526F;&#x8F74;</li><li>baseline: &#x6709;&#x6587;&#x672C;&#x5B58;&#x5728;&#x65F6;&#xFF0C;child&#x5728;&#x526F;&#x8F74;&#x65B9;&#x5411;&#x57FA;&#x4E8E;&#x7B2C;&#x4E00;&#x4E2A;&#x6587;&#x672C;&#x57FA;&#x7EBF;&#x5BF9;&#x9F50;</li></ul><p>&#x6539;&#x53D8;container&#x7684;style&#xFF0C;&#x4E3B;&#x8F74;&#x8BBE;&#x7F6E;&#x4E3A;row&#xFF0C;&#x4F9D;&#x6B21;&#x6539;&#x53D8;alignItems&#xFF1A;flex-start&#x3001;flex-end&#x3001;center</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  container: {
    flex: 1,
    flexDirection: &apos;row&apos;,
    alignItems: &apos;flex-start&apos;,
    backgroundColor: &apos;#F5FCFF&apos;,
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>  <span class="hljs-attribute">container</span>: {
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attribute">flexDirection</span>: <span class="hljs-string">&apos;row&apos;</span>,
    <span class="hljs-attribute">alignItems</span>: <span class="hljs-string">&apos;flex-start&apos;</span>,
    <span class="hljs-attribute">backgroundColor</span>: <span class="hljs-string">&apos;#F5FCFF&apos;</span>,
  }</code></pre><p>&#x6700;&#x540E;&#x5C06;alignItems&#x8BBE;&#x7F6E;&#x4E3A;stretch&#xFF0C;&#x5E76;&#x4E14;&#x6539;&#x53D8;red&#x7684;height&#xFF0C;red&#x4F1A;&#x88AB;&#x62C9;&#x4F38;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  container: {
    flex: 1,
    flexDirection: &apos;row&apos;,
    alignItems: &apos;stretch&apos;,
    backgroundColor: &apos;#F5FCFF&apos;,
  },
  red: {
      width: 100,
      height: &apos;auto&apos;,
      backgroundColor: &apos;red&apos;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>  <span class="hljs-attribute">container</span>: {
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attribute">flexDirection</span>: <span class="hljs-string">&apos;row&apos;</span>,
    <span class="hljs-attribute">alignItems</span>: <span class="hljs-string">&apos;stretch&apos;</span>,
    <span class="hljs-attribute">backgroundColor</span>: <span class="hljs-string">&apos;#F5FCFF&apos;</span>,
  },
  <span class="hljs-attribute">red</span>: {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100</span>,
      <span class="hljs-attribute">height</span>: <span class="hljs-string">&apos;auto&apos;</span>,
      <span class="hljs-attribute">backgroundColor</span>: <span class="hljs-string">&apos;red&apos;</span>
  }</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfVs6?w=800&amp;h=600" src="https://static.alili.tech/img/bVbfVs6?w=800&amp;h=600" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/bVbfVs7?w=800&amp;h=600" src="https://static.alili.tech/img/bVbfVs7?w=800&amp;h=600" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>alignItems: baseline&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x6587;&#x672C;&#x7684;&#x6B63;&#x4E2D;&#x5FC3;&#xFF0C;&#x800C;&#x662F;&#x6587;&#x672C;View&#x7684;&#x5BB9;&#x5668;&#x5E95;&#x90E8;&#x3002;&#x5728;&#x4E0A;&#x9762;&#x57FA;&#x7840;&#x4E0A;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;Text&#xFF0C;&#x8BA9;&#x6587;&#x672C;&#x81EA;&#x8EAB;&#x5C45;&#x4E2D;&#x5C55;&#x793A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  container: {
    flex: 1,
    flexDirection: &apos;row&apos;,
    alignItems: &apos;baseline&apos;,
    backgroundColor: &apos;#F5FCFF&apos;,
  },
  text: {
      width: 80,
      height: 80,
      fontSize: 20,
      color: &apos;white&apos;,
      marginTop: 110,
      backgroundColor: &apos;black&apos;,
      textAlign: &apos;center&apos;,
      textAlignVertical: &apos;center&apos;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>  <span class="hljs-attribute">container</span>: {
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attribute">flexDirection</span>: <span class="hljs-string">&apos;row&apos;</span>,
    <span class="hljs-attribute">alignItems</span>: <span class="hljs-string">&apos;baseline&apos;</span>,
    <span class="hljs-attribute">backgroundColor</span>: <span class="hljs-string">&apos;#F5FCFF&apos;</span>,
  },
  <span class="hljs-attribute">text</span>: {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">80</span>,
      <span class="hljs-attribute">height</span>: <span class="hljs-number">80</span>,
      <span class="hljs-attribute">fontSize</span>: <span class="hljs-number">20</span>,
      <span class="hljs-attribute">color</span>: <span class="hljs-string">&apos;white&apos;</span>,
      <span class="hljs-attribute">marginTop</span>: <span class="hljs-number">110</span>,
      <span class="hljs-attribute">backgroundColor</span>: <span class="hljs-string">&apos;black&apos;</span>,
      <span class="hljs-attribute">textAlign</span>: <span class="hljs-string">&apos;center&apos;</span>,
      <span class="hljs-attribute">textAlignVertical</span>: <span class="hljs-string">&apos;center&apos;</span>
  }</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfVs8?w=340&amp;h=509" src="https://static.alili.tech/img/bVbfVs8?w=340&amp;h=509" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader5">flexWrap</h2><p>&#x5982;&#x679C;&#x518D;&#x589E;&#x52A0;&#x4E00;&#x4E2A;View&#xFF0C;&#x7531;&#x4E8E;&#x7A7A;&#x95F4;&#x4E0D;&#x8DB3;&#x5B83;&#x4F1A;&#x5C55;&#x793A;&#x4E0D;&#x5168;&#x3002;&#x8FD9;&#x65F6;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;flexWrap&#x5C5E;&#x6027;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x652F;&#x6301;&#x81EA;&#x52A8;&#x6362;&#x884C;&#x5C55;&#x793A;&#x3002;</p><ul><li>nowrap: &#x4E0D;&#x6362;&#x884C;(&#x9ED8;&#x8BA4;)</li><li>wrap: &#x81EA;&#x52A8;&#x6362;&#x884C;</li></ul><p>&#x5728;container&#x4E2D;&#x6DFB;&#x52A0;flexWrap&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x4E14;&#x518D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;green view</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  container: {
    flex: 1,
    flexDirection: &apos;row&apos;,
    flexWrap: &apos;wrap&apos;,
    justifyContent: &apos;flex-start&apos;,
    backgroundColor: &apos;#F5FCFF&apos;,
  },
  green: {
      width: 100,
      height: 100,
      backgroundColor: &apos;green&apos;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>  <span class="hljs-attribute">container</span>: {
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attribute">flexDirection</span>: <span class="hljs-string">&apos;row&apos;</span>,
    <span class="hljs-attribute">flexWrap</span>: <span class="hljs-string">&apos;wrap&apos;</span>,
    <span class="hljs-attribute">justifyContent</span>: <span class="hljs-string">&apos;flex-start&apos;</span>,
    <span class="hljs-attribute">backgroundColor</span>: <span class="hljs-string">&apos;#F5FCFF&apos;</span>,
  },
  <span class="hljs-attribute">green</span>: {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100</span>,
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100</span>,
      <span class="hljs-attribute">backgroundColor</span>: <span class="hljs-string">&apos;green&apos;</span>
  }</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfVta?w=340&amp;h=509" src="https://static.alili.tech/img/bVbfVta?w=340&amp;h=509" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader6">alignSelf</h2><p>alignSelf&#x5C5E;&#x6027;&#x7C7B;&#x4F3C;&#x4E8E;alignItems&#xFF0C;&#x5B83;&#x4E5F;&#x662F;&#x63A7;&#x5236;&#x526F;&#x8F74;&#x4E0A;&#x7684;&#x6392;&#x5217;&#x89C4;&#x5219;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x662F;&#x5B83;&#x4F7F;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#x662F;child&#x81EA;&#x5DF1;&#x3002;&#x5B83;&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x7236;&#x5BB9;&#x5668;alignItems&#x7684;&#x5C5E;&#x6027;&#x63A7;&#x5236;&#x7684;child&#x6392;&#x5217;&#x89C4;&#x5219;&#xFF0C;&#x5728;&#x526F;&#x8F74;&#x4E0A;&#x5B9E;&#x73B0;&#x81EA;&#x5DF1;&#x7684;&#x6392;&#x5217;&#x89C4;&#x5219;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;auto&#xFF0C;&#x7EE7;&#x627F;&#x7236;&#x5BB9;&#x5668;&#x7684;alignItems&#x5C5E;&#x6027;&#x3002;&#x56E0;&#x6B64;&#x5B83;&#x4E5F;&#x6709;&#x4E94;&#x4E2A;&#x53EF;&#x9009;&#x503C;&#xFF1A;flex-start&#x3001;flex-end&#x3001;center&#x3001;stretch&#x4E0E;baseline&#x3002;&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x4E3A;range&#x6DFB;&#x52A0;alignSelf&#xFF0C;&#x5176;&#x5B83;&#x7684;child&#x4E0D;&#x53D8;&#xFF0C;&#x90FD;&#x7EE7;&#x627F;&#x7236;&#x5BB9;&#x5668;&#x7684;alignItems: flex-start</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  orange: {
      width: 100,
      height: 100,
      backgroundColor: &apos;orange&apos;,
      alignSelf: &apos;flex-end&apos;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>  <span class="hljs-attribute">orange</span>: {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100</span>,
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100</span>,
      <span class="hljs-attribute">backgroundColor</span>: <span class="hljs-string">&apos;orange&apos;</span>,
      <span class="hljs-attribute">alignSelf</span>: <span class="hljs-string">&apos;flex-end&apos;</span>
  }</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfVtb?w=340&amp;h=509" src="https://static.alili.tech/img/bVbfVtb?w=340&amp;h=509" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><blockquote>&#x5176;&#x5B83;&#x7684;&#x53EF;&#x9009;&#x503C;&#x5C31;&#x4E0D;&#x4E00;&#x4E00;&#x8BF4;&#x660E;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;alignItems</blockquote><h2 id="articleHeader7">other</h2><p>&#x6700;&#x540E;&#x8FD8;&#x6709;&#x4E09;&#x4E2A;&#x6BD4;&#x8F83;&#x51B7;&#x95E8;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8BE6;&#x7EC6;&#x4E00;&#x4E00;&#x4EE3;&#x7801;&#x4E0E;&#x8D34;&#x56FE;&#xFF0C;&#x7B80;&#x5355;&#x7684;&#x8BF4;&#x4E0B;&#x5B83;&#x4EEC;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x76F8;&#x540C;&#x70B9;&#x662F;&#x5B83;&#x4EEC;&#x90FD;&#x662F;&#x5728;child&#x4E2D;&#x4F7F;&#x7528;&#xFF0C;&#x4E0E;alignSelf&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E00;&#x6837;&#x3002;</p><ul><li>flexBasis: &#x8BBE;&#x7F6E;&#x4E3B;&#x8F74;&#x65B9;&#x5411;&#x4E0A;&#x7684;&#x521D;&#x59CB;&#x503C;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;auto&#x3002;&#x5982;&#x679C;&#x4E0E;width&#x6216;&#x8005;height&#x540C;&#x65F6;&#x5B58;&#x5728;&#xFF0C;&#x5219;&#x4F1A;&#x8986;&#x76D6;&#x5B83;&#x4EEC;&#x7684;&#x503C;</li><li>flexGrow: &#x8BBE;&#x7F6E;chid&#x7684;&#x653E;&#x5927;&#x6BD4;&#x4F8B;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E8E;flex&#xFF0C;&#x7A7A;&#x95F4;&#x5145;&#x8DB3;&#x65F6;&#x81EA;&#x52A8;&#x6309;&#x6BD4;&#x4F8B;&#x653E;&#x5927;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;0</li><li>flexShrink: &#x8BBE;&#x7F6E;chid&#x7684;&#x7F29;&#x5C0F;&#x6BD4;&#x4F8B;&#x3002;&#x7A7A;&#x95F4;&#x4E0D;&#x8DB3;&#x65F6;&#x81EA;&#x52A8;&#x6309;&#x6BD4;&#x4F8B;&#x7F29;&#x5C0F;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;0</li></ul><p>&#x6709;&#x5173;Flexbox&#xFF0C;&#x7EB5;&#x89C2;&#x5168;&#x6587;&#x53EA;&#x9700;&#x638C;&#x63E1;&#x5F00;&#x5934;&#x6240;&#x5217;&#x7684;&#x516D;&#x79CD;&#x5C5E;&#x6027;&#xFF0C;React Native&#x4E2D;&#x7684;&#x7EDD;&#x5927;&#x591A;&#x6570;&#x5E03;&#x5C40;&#x4E5F;&#x5C31;&#x4E0D;&#x6210;&#x95EE;&#x9898;&#x3002;&#x73B0;&#x5728;&#x5BF9;&#x4E8E;Flexbox&#x662F;&#x5426;&#x6E05;&#x6670;&#x4E86;&#x8BB8;&#x591A;&#x5462;&#xFF1F;&#x8D76;&#x7D27;&#x4EB2;&#x81EA;&#x53BB;&#x8BD5;&#x8BD5;&#x5427;~</p><h2 id="articleHeader8">&#x7CBE;&#x9009;&#x6587;&#x7AE0;</h2><p><a href="https://segmentfault.com/a/1190000016128693">ViewDragHelper&#x4E4B;&#x624B;&#x52BF;&#x64CD;&#x4F5C;&#x795E;&#x5668;</a></p><p><a href="https://segmentfault.com/a/1190000015221533" target="_blank">Android Architecture Components Part1:Room</a></p><p><a href="https://segmentfault.com/a/1190000015468666">&#x81EA;&#x5B9A;&#x4E49;Android&#x6CE8;&#x89E3;Part1:&#x6CE8;&#x89E3;&#x53D8;&#x91CF;</a></p><p><a href="https://segmentfault.com/a/1190000011994447" target="_blank">tensorflow-&#x68AF;&#x5EA6;&#x4E0B;&#x964D;,&#x6709;&#x8FD9;&#x4E00;&#x7BC7;&#x5C31;&#x8DB3;&#x591F;&#x4E86;</a></p><hr><p>&#x611F;&#x89C9;&#x4E0D;&#x9519;&#x7684;&#x53EF;&#x4EE5;&#x6765;&#x4E00;&#x6CE2;&#x5173;&#x6CE8;&#xFF0C;&#x626B;&#x63CF;&#x4E0B;&#x65B9;&#x4E8C;&#x7EF4;&#x7801;&#xFF0C;&#x5173;&#x6CE8;&#x516C;&#x4F17;&#x53F7;&#xFF0C;&#x53CA;&#x65F6;&#x83B7;&#x53D6;&#x6700;&#x65B0;&#x77E5;&#x8BC6;&#x6280;&#x5DE7;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbfPXQ?w=600&amp;h=600" src="https://static.alili.tech/img/bVbfPXQ?w=600&amp;h=600" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
5分钟吃透React Native Flexbox

## 原文链接
[https://segmentfault.com/a/1190000016149881](https://segmentfault.com/a/1190000016149881)

