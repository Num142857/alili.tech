---
title: 来聊聊怎么写react-native上的样式吧
hidden: true
categories: [reprint]
slug: 3c881185
date: 2018-11-02 02:30:11
---

{{< raw >}}
<h2 id="articleHeader0">&#x6211;&#x9047;&#x5230;&#x4E86;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#xFF1F;</h2><p>&#x4E0D;&#x4E45;&#x4E4B;&#x524D;&#x6211;&#x91CD;&#x6784;&#x4E86;&#x4E00;&#x4E2A;&#x53E4;&#x8001;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x603B;&#x7ED3;&#x4E86;&#x4E00;&#x4E9B;js&#x65B9;&#x9762;&#x7684;&#x60F3;&#x6CD5;&#xFF0C;&#x4E0D;&#x8FC7;&#x5BF9;&#x4E8E;&#x4E00;&#x4E2A;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x800C;&#x8A00;&#x4E0D;&#x4EC5;&#x4EC5;&#x53EA;&#x7531;js&#x7EC4;&#x6210;&#x7684;&#x561B;&#xFF0C;&#x4E0A;&#x5B66;&#x7684;&#x65F6;&#x5019;&#x8001;&#x5E08;&#x548C;&#x6211;&#x8BF4;HTML+CSS+JS&#x5BF9;&#x5E94;&#x7684;&#x662F;&#x9875;&#x9762;&#x7684;&#x9AA8;&#x67B6;&#x3001;&#x76AE;&#x80A4;&#x548C;&#x808C;&#x8089;&#x3002;&#x65E2;&#x7136;&#x9AA8;&#x67B6;&#x6211;&#x4EEC;&#x6709;&#x4E86;&#xFF0C;&#x808C;&#x8089;&#x4E5F;&#x804A;&#x5B8C;&#x4E86;&#xFF0C;&#x4ECA;&#x5929;&#x6211;&#x4EEC;&#x5C31;&#x6765;&#x804A;&#x804A;&#x201C;&#x76AE;&#x80A4;&#x201D;&#x5427;&#x3002;</p><p>&#x7531;&#x4E8E;&#x6211;&#x91CD;&#x6784;&#x7684;&#x662F;&#x4E00;&#x4E2A;react-native&#x9879;&#x76EE;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x8BF4;&#x8BF4;&#x5728;react-native&#x4E0A;&#x662F;&#x600E;&#x4E48;&#x5199;&#x6837;&#x5F0F;&#x7684;&#x5427;&#xFF0C;&#x548C;&#x4F20;&#x7EDF;&#x7684;web&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x662F;&#xFF0C;&#x5728;react-native&#x4E0A;&#x9762;&#x662F;&#x6CA1;&#x6709;css&#x4EE3;&#x7801;&#xFF0C;&#x4E0D;&#x8FC7;&#x5F97;&#x76CA;&#x4E8E;<a href="https://yogalayout.com/" rel="nofollow noreferrer" target="_blank">Yoga</a>&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x4E0A;&#x50CF;&#x5199;css&#x4E00;&#x6837;&#x7684;&#x53BB;&#x4E66;&#x5199;&#x6211;&#x4EEC;&#x7684;&#x6837;&#x5F0F;&#x3002;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;react-native&#x6587;&#x6863;&#x4E0A;&#x662F;&#x600E;&#x4E48;&#x8BF4;&#x7684;&#x5427;&#xFF1A;</p><blockquote>&#x5728;React Native&#x4E2D;&#xFF0C;&#x4F60;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x5B66;&#x4E60;&#x4EC0;&#x4E48;&#x7279;&#x6B8A;&#x7684;&#x8BED;&#x6CD5;&#x6765;&#x5B9A;&#x4E49;&#x6837;&#x5F0F;&#x3002;&#x6211;&#x4EEC;&#x4ECD;&#x7136;&#x662F;&#x4F7F;&#x7528;JavaScript&#x6765;&#x5199;&#x6837;&#x5F0F;&#x3002;&#x6240;&#x6709;&#x7684;&#x6838;&#x5FC3;&#x7EC4;&#x4EF6;&#x90FD;&#x63A5;&#x53D7;&#x540D;&#x4E3A;style&#x7684;&#x5C5E;&#x6027;&#x3002;&#x8FD9;&#x4E9B;&#x6837;&#x5F0F;&#x540D;&#x57FA;&#x672C;&#x4E0A;&#x662F;&#x9075;&#x5FAA;&#x4E86;web&#x4E0A;&#x7684;CSS&#x7684;&#x547D;&#x540D;&#xFF0C;&#x53EA;&#x662F;&#x6309;&#x7167;JS&#x7684;&#x8BED;&#x6CD5;&#x8981;&#x6C42;&#x4F7F;&#x7528;&#x4E86;&#x9A7C;&#x5CF0;&#x547D;&#x540D;&#x6CD5;&#xFF0C;&#x4F8B;&#x5982;&#x5C06;background-color&#x6539;&#x4E3A;backgroundColor&#x3002;<p>style&#x5C5E;&#x6027;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684;JavaScript&#x5BF9;&#x8C61;&#x3002;&#x8FD9;&#x662F;&#x6700;&#x7B80;&#x5355;&#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x56E0;&#x800C;&#x5728;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x4E2D;&#x5F88;&#x5E38;&#x89C1;&#x3002;&#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x2014;&#x2014;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x4F4D;&#x7F6E;&#x5C45;&#x540E;&#x7684;&#x6837;&#x5F0F;&#x5BF9;&#x8C61;&#x6BD4;&#x5C45;&#x524D;&#x7684;&#x4F18;&#x5148;&#x7EA7;&#x66F4;&#x9AD8;&#xFF0C;&#x8FD9;&#x6837;&#x4F60;&#x53EF;&#x4EE5;&#x95F4;&#x63A5;&#x5B9E;&#x73B0;&#x6837;&#x5F0F;&#x7684;&#x7EE7;&#x627F;&#x3002;</p></blockquote><p>&#x6CA1;&#x9519;&#xFF0C;&#x4F60;&#x51E0;&#x4E4E;&#x4E0D;&#x9700;&#x8981;&#x4EC0;&#x4E48;&#x6210;&#x672C;&#x5C31;&#x53EF;&#x4EE5;&#x6309;&#x7167;&#x5199;css&#x4E00;&#x6837;&#x7684;&#x5199;&#x6CD5;&#x53BB;&#x5199;&#x6211;&#x4EEC;&#x7684;rn&#x6837;&#x5F0F;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x6587;&#x6863;&#x4E2D;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
import { AppRegistry, StyleSheet, Text, View } from &apos;react-native&apos;;

export default class LotsOfStyles extends Component {
  render() {
    return (
      &lt;View&gt;
        &lt;Text style={styles.red}&gt;just red&lt;/Text&gt;
        &lt;Text style={{
            color: &apos;blue&apos;,
            fontWeight: &apos;bold&apos;,
            fontSize: 30,
        }}&gt;just bigblue&lt;/Text&gt;
        &lt;Text style={[styles.bigblue, styles.red]}&gt;bigblue, then red&lt;/Text&gt;
        &lt;Text style={[styles.red, styles.bigblue]}&gt;red, then bigblue&lt;/Text&gt;
      &lt;/View&gt;
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: &apos;blue&apos;,
    fontWeight: &apos;bold&apos;,
    fontSize: 30,
  },
  red: {
    color: &apos;red&apos;,
  },
});

AppRegistry.registerComponent(&apos;LotsOfStyles&apos;, () =&gt; LotsOfStyles);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> { AppRegistry, StyleSheet, Text, View } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-native&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LotsOfStyles</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Text</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.red}</span>&gt;</span>just red<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Text</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span>
            <span class="hljs-attr">color:</span> &apos;<span class="hljs-attr">blue</span>&apos;,
            <span class="hljs-attr">fontWeight:</span> &apos;<span class="hljs-attr">bold</span>&apos;,
            <span class="hljs-attr">fontSize:</span> <span class="hljs-attr">30</span>,
        }}&gt;</span>just bigblue<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Text</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{[styles.bigblue,</span> <span class="hljs-attr">styles.red</span>]}&gt;</span>bigblue, then red<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Text</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{[styles.red,</span> <span class="hljs-attr">styles.bigblue</span>]}&gt;</span>red, then bigblue<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">const</span> styles = StyleSheet.create({
  <span class="hljs-attr">bigblue</span>: {
    <span class="hljs-attr">color</span>: <span class="hljs-string">&apos;blue&apos;</span>,
    <span class="hljs-attr">fontWeight</span>: <span class="hljs-string">&apos;bold&apos;</span>,
    <span class="hljs-attr">fontSize</span>: <span class="hljs-number">30</span>,
  },
  <span class="hljs-attr">red</span>: {
    <span class="hljs-attr">color</span>: <span class="hljs-string">&apos;red&apos;</span>,
  },
});

AppRegistry.registerComponent(<span class="hljs-string">&apos;LotsOfStyles&apos;</span>, () =&gt; LotsOfStyles);</code></pre><p>&#x5728;&#x4E0A;&#x9762;&#x7684;demo&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x53BB;&#x5199;&#x6211;&#x4EEC;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x5B83;&#x548C;&#x6211;&#x4EEC;&#x5728;&#x5199;css&#x65F6;&#x5019;&#x9047;&#x5230;&#x7684;&#x5916;&#x8054;&#x5F0F;&#x6837;&#x5F0F;&#x3001;&#x5185;&#x8054;&#x5F0F;&#x6837;&#x5F0F;&#x5F88;&#x76F8;&#x4F3C;&#xFF0C;&#x800C;&#x9879;&#x76EE;&#x4E2D;&#x6211;&#x4EEC;&#x603B;&#x662F;&#x4E60;&#x60EF;&#x5C06;&#x6837;&#x5F0F;&#x548C;&#x9875;&#x9762;&#x5206;&#x79BB;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x4ED6;&#x4EEC;&#x90FD;&#x653E;&#x5728;&#x53E6;&#x5916;&#x4E00;&#x4E2A;style.js&#x6587;&#x4EF6;&#x4E2D;&#x3002;&#x8FD9;&#x662F;&#x4E2A;&#x975E;&#x5E38;&#x4E0D;&#x9519;&#x7684;&#x4E60;&#x60EF;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x9020;&#x6210;&#x4E86;&#x4E00;&#x4E9B;&#x56F0;&#x6270;&#x3002;</p><p>&#x9762;&#x5BF9;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x6211;&#x8BE5;&#x600E;&#x4E48;&#x53BB;&#x6A21;&#x5757;&#x5316;&#x5B83;&#x7684;&#x6837;&#x5F0F;&#x5462;&#xFF1F;&#x5728;&#x4E4B;&#x524D;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#x867D;&#x7136;&#x505A;&#x5230;&#x4E86;&#x6837;&#x5F0F;&#x548C;&#x9875;&#x9762;&#x7684;&#x5206;&#x79BB;&#xFF0C;&#x8BA9;&#x9875;&#x9762;&#x201C;&#x770B;&#x8D77;&#x6765;&#x201D;&#x5E72;&#x51C0;&#x4E86;&#x5F88;&#x591A;&#xFF0C;&#x4F46;&#x662F;&#x5728; style.js &#x6587;&#x4EF6;&#x4E2D;&#x4ECD;&#x7136;&#x662F;&#x6742;&#x4E71;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5927;&#x91CF;&#x91CD;&#x590D;&#x7684;&#x53D8;&#x91CF;&#x3001;&#x91CD;&#x590D;&#x7684;&#x5185;&#x5BB9;&#x3001;&#x91CD;&#x590D;&#x7684;&#x58F0;&#x660E;&#x3002;&#x3002;&#x3002;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x53C8;&#x6709;&#x540C;&#x5B66;&#x8BF4;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;&#x8FD9;&#x4E9B;&#x516C;&#x5171;&#x7684;&#x53D8;&#x91CF;&#x3001;&#x4EE3;&#x7801;&#x5206;&#x79BB;&#x51FA;&#x6765;&#x653E;&#x5230;&#x4E00;&#x4E2A;&#x4E3B;&#x9898;&#x6587;&#x4EF6;&#x4E2D;&#x5440;&#xFF0C;&#x4E8E;&#x662F;&#x9879;&#x76EE;&#x4E2D;&#x9664;&#x4E86;&#x5404;&#x4E2A;&#x9875;&#x9762;&#x7684;style.js&#x4E4B;&#x5916;&#x53C8;&#x5728;&#x5168;&#x5C40;&#x51FA;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;theme.js&#x6587;&#x4EF6;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x5927;&#x5BB6;&#x6109;&#x5FEB;&#x7684;&#x628A;&#x8BF8;&#x5982;&#x989C;&#x8272;&#x3001;&#x5927;&#x5C0F;&#x3001;&#x5E03;&#x5C40;&#x7B49;&#x516C;&#x5171;&#x7684;&#x4EE3;&#x7801;&#x653E;&#x4E86;&#x8FDB;&#x6765;&#x3002;</p><p>&#x8FD9;&#x770B;&#x4F3C;&#x89E3;&#x51B3;&#x4E86;style.js&#x91CC;&#x91CD;&#x590D;&#x5197;&#x4F59;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x4F1A;&#x8BA9;&#x6211;&#x7684;import&#x53D8;&#x5F97;&#x6DF7;&#x4E71;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { StyleSheet } from &apos;react-native&apos;;
import {
  px,
  COLOR_BG_RED,
  COLOR_BG_GREEN,
  STYLE_FR_VC_HSB,
  STYLE_FR_VC_HC,
  STYLE_FR_VC_HFS,
} from &apos;MyStyle&apos;;

export default StyleSheet.create({
    // TODO
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { StyleSheet } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-native&apos;</span>;
<span class="hljs-keyword">import</span> {
  px,
  COLOR_BG_RED,
  COLOR_BG_GREEN,
  STYLE_FR_VC_HSB,
  STYLE_FR_VC_HC,
  STYLE_FR_VC_HFS,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;MyStyle&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> StyleSheet.create({
    <span class="hljs-comment">// TODO</span>
});</code></pre><p>&#x770B;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x60F3;&#x4F60;&#x9664;&#x4E86;&#x77E5;&#x9053;&#x6211;import&#x8FDB;&#x6765;&#x4E86;&#x4E24;&#x4E2A;&#x989C;&#x8272;&#x4E4B;&#x5916;&#xFF0C;&#x5BF9;&#x4E8E;&#x5176;&#x5B83;&#x53D8;&#x91CF;&#x4F1A;&#x4E00;&#x5934;&#x96FE;&#x6C34;&#x5427;&#xFF0C;&#x9664;&#x975E;&#x4F60;&#x53BB;MyStyle&#x6A21;&#x5757;&#x91CC;&#x9762;&#x4EB2;&#x773C;&#x770B;&#x4E00;&#x4E0B;&#x624D;&#x4F1A;&#x77E5;&#x9053;&#x771F;&#x6B63;&#x5F15;&#x5165;&#x8FDB;&#x6765;&#x7684;&#x662F;&#x4E9B;&#x4EC0;&#x4E48;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x91CC;&#x7684;&#x6837;&#x5F0F;&#x7279;&#x522B;&#x7684;&#x591A;&#x7684;&#x8BDD;&#xFF0C;&#x9664;&#x4E86;&#x518D;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;sytle.js&#x4E4B;&#x5916;&#xFF0C;&#x4F60;&#x5C31;&#x53EA;&#x80FD;&#x6BCF;&#x6B21;&#x56DE;&#x5230;&#x5934;&#x90E8;&#x53BB;&#x770B;&#x770B;&#x81EA;&#x5DF1;&#x5F15;&#x5165;&#x4E86;&#x4E9B;&#x4EC0;&#x4E48;&#x3002;&#x8FD9;&#x662F;&#x6211;&#x4E0D;&#x80FD;&#x5FCD;&#x53D7;&#x7684;&#x3002;&#x3002;&#x3002;</p><h2 id="articleHeader1">&#x4E3A;&#x4F60;&#x7684;&#x6837;&#x5F0F;&#x5206;&#x7C7B;</h2><p>&#x9664;&#x4E86;&#x7531;&#x4E8E;&#x4E00;&#x6B21;&#x6027;&#x5F15;&#x5165;&#x592A;&#x591A;&#x7684;&#x516C;&#x5171;&#x6837;&#x5F0F;&#x5BFC;&#x81F4;&#x6211;&#x8981;&#x6765;&#x56DE;&#x6ED1;&#x52A8;&#x4E4B;&#x5916;&#xFF0C;&#x5F53;&#x6211;&#x518D;&#x53BB;&#x5199;&#x4E00;&#x4E2A;&#x65B0;&#x7684;styel.js&#x6587;&#x4EF6;&#x65F6;&#xFF0C;&#x590D;&#x5236;&#x8FD9;&#x4E48;&#x591A;&#x5F15;&#x5165;&#x4E5F;&#x662F;&#x4E00;&#x4EF6;&#x5934;&#x75BC;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x80FD;&#x4E0D;&#x80FD;&#x6BCF;&#x6B21;&#x53EA;&#x9700;&#x8981;&#x5199;&#x4E00;&#x884C;import&#x5462;&#xFF1F;&#x5982;&#x679C;&#x6211;&#x7684;&#x6837;&#x5F0F;&#x90FD;&#x662F;&#x6309;&#x56FA;&#x5B9A;&#x89C4;&#x5219;&#x5206;&#x7C7B;&#x653E;&#x597D;&#x7684;&#x662F;&#x4E0D;&#x662F;&#x6BCF;&#x6B21;&#x5C31;&#x53EF;&#x4EE5;&#x53EA;import&#x8FD9;&#x51E0;&#x4E2A;&#x7C7B;&#x4E86;&#x5462;&#xFF1F;</p><p>&#x7ECF;&#x5E38;&#x5199;css&#x7684;&#x540C;&#x5B66;&#x4E00;&#x5B9A;&#x6CE8;&#x610F;&#x8FC7;&#x6837;&#x5F0F;&#x7684;&#x4E66;&#x5199;&#x987A;&#x5E8F;&#xFF0C;&#x67D0;&#x4E00;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x5199;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x867D;&#x7136;&#x5728;web&#x4E2D;&#xFF0C;&#x8FD9;&#x6837;&#x5199;&#x662F;&#x4E3A;&#x4E86;&#x4F18;&#x5316;css&#x5F15;&#x64CE;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x4E5F;&#x4F53;&#x73B0;&#x51FA;&#x4E86;&#x6837;&#x5F0F;&#x662F;&#x6709;&#x4E00;&#x5B9A;&#x7C7B;&#x578B;&#x7684;&#xFF0C;&#x63A7;&#x5236;&#x989C;&#x8272;&#x7684;&#x3001;&#x63A7;&#x5236;&#x8FB9;&#x8DDD;&#x7684;&#x3001;&#x63A7;&#x5236;&#x5E03;&#x5C40;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x7684;&#x516C;&#x5171;&#x53D8;&#x91CF;&#x662F;&#x4E0D;&#x662F;&#x4E5F;&#x53EF;&#x4EE5;&#x6309;&#x7167;&#x8FD9;&#x6837;&#x7684;&#x89C4;&#x5219;&#x6765;&#x58F0;&#x660E;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { color, size, layout } from &apos;MyStyle&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> { color, <span class="hljs-keyword">size</span>, layout } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;MyStyle&apos;</span>;</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x6587;&#x4EF6;&#x7684;&#x5934;&#x90E8;&#x662F;&#x4E0D;&#x662F;&#x5C31;&#x6E05;&#x6670;&#x591A;&#x4E86;&#x5462;&#xFF1F;&#x5728;&#x5199;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E5F;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x5173;&#x5FC3;&#x6211;&#x4E4B;&#x524D;&#x5F15;&#x5165;&#x4E86;&#x4E9B;&#x4EC0;&#x4E48;&#x4E86;&#xFF0C;&#x53EA;&#x8981;&#x53EA;&#x8981;&#x5173;&#x6CE8;&#x6211;&#x4EEC;&#x8981;&#x5199;&#x4EC0;&#x4E48;&#x5C31;&#x884C;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default StyleSheet.create({
    lines: {
      height: px(88),
      backgroundColor: color.background,
      borderLeftWidth: size.border,
      borderRightWidth: size.border,
      borderBottomWidth: size.border,
      borderColor: color.border,
      // &#x5B50;&#x5143;&#x7D20;&#x6A2A;&#x5411;&#x6392;&#x5217;&#xFF0C;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#xFF0C;&#x6C34;&#x5E73;&#x5206;&#x5E03;&#xFF0C;&#x4E2D;&#x95F4;&#x7528;&#x7A7A;&#x683C;&#x586B;&#x6EE1;&#xFF0C;&#x6700;&#x4E24;&#x8FB9;&#x5143;&#x7D20;&#x5404;&#x81EA;&#x9760;&#x8FB9;
      ...layout.flex.vchbs,
    },
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">StyleSheet</span><span class="hljs-selector-class">.create</span>({
    <span class="hljs-attribute">lines</span>: {
      <span class="hljs-attribute">height</span>: px(<span class="hljs-number">88</span>),
      <span class="hljs-attribute">backgroundColor</span>: color.background,
      <span class="hljs-attribute">borderLeftWidth</span>: size.border,
      <span class="hljs-attribute">borderRightWidth</span>: size.border,
      <span class="hljs-attribute">borderBottomWidth</span>: size.border,
      <span class="hljs-attribute">borderColor</span>: color.border,
      <span class="hljs-comment">// &#x5B50;&#x5143;&#x7D20;&#x6A2A;&#x5411;&#x6392;&#x5217;&#xFF0C;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#xFF0C;&#x6C34;&#x5E73;&#x5206;&#x5E03;&#xFF0C;&#x4E2D;&#x95F4;&#x7528;&#x7A7A;&#x683C;&#x586B;&#x6EE1;&#xFF0C;&#x6700;&#x4E24;&#x8FB9;&#x5143;&#x7D20;&#x5404;&#x81EA;&#x9760;&#x8FB9;</span>
      ...layout.flex.vchbs,
    },
});</code></pre><p>&#x5728;&#x6211;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#x9ED8;&#x8BA4;&#x8FB9;&#x6846;&#x7684;&#x5927;&#x5C0F;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x50CF;&#x7D20;(1px)&#xFF0C;&#x90A3;&#x4E48;&#x53EA;&#x8981;&#x5728;&#x6700;&#x5916;&#x5C42;&#x58F0;&#x660E;&#x4E86; <code>size.border</code>&#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x540E;&#x9762;&#x5199;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x53EF;&#x4EE5;&#x7545;&#x884C;&#x65E0;&#x963B;&#x7684;&#x4E66;&#x5199;&#x4E0B;&#x53BB;&#x4E86;&#xFF0C;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x6A21;&#x5757;&#x5316;&#x4E86;&#xFF0C;&#x53EA;&#x662F;&#x6211;&#x4EEC;&#x8FD8;&#x4E0D;&#x591F;&#x5F7B;&#x5E95;&#xFF0C;&#x4E0D;&#x5F7B;&#x5E95;&#x5C31;&#x4EE3;&#x8868;&#x7740;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x4E0D;&#x5B8C;&#x7F8E;&#xFF0C;&#x800C;&#x4E14;&#x53EF;&#x590D;&#x7528;&#x6027;&#x5DEE;&#xFF0C;&#x5C31;&#x5982;&#x4E0A;&#x9762;&#x7684;demo&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x4E09;&#x9762;&#x7684;&#x8FB9;&#x6846;&#xFF0C;&#x90A3;&#x4E48;&#x5176;&#x5B83;&#x7EC4;&#x4EF6;&#x9700;&#x4E0D;&#x9700;&#x8981;&#x5462;&#xFF1F;&#x5982;&#x679C;&#x9700;&#x8981;&#x7684;&#x8BDD;&#x662F;&#x4E0D;&#x662F;&#x4E5F;&#x53EF;&#x4EE5;&#x50CF;&#x6211;&#x8FD9;&#x6837;&#x5199;&#x5462;&#xFF1F;</p><p>&#x5F53;&#x7136;&#x662F;&#x4E0D;&#x53EF;&#x4EE5;&#xFF01;&#x4E3A;&#x4EC0;&#x4E48;&#xFF1F;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x662F;&#x5728;&#x590D;&#x7528;&#x8FD9;&#x4E2A;&#x8FB9;&#x6846;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5C31;&#x4E0D;&#x8BE5;&#x518D;&#x5199;&#x4E00;&#x4EFD;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x4E86;&#xFF0C;&#x800C;&#x662F;&#x5E94;&#x8BE5;&#x5199;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default StyleSheet.create({
    lines: {
      height: px(88),
      backgroundColor: color.background,
      // &#x4E00;&#x4E2A;&#x8FB9;&#x6846;&#x7C97;&#x7EC6;&#x4E3A;1px&#x7684;&#x7EA2;&#x8272;&#x8FB9;&#x6846;
      ...layout.border
      // &#x5B50;&#x5143;&#x7D20;&#x6A2A;&#x5411;&#x6392;&#x5217;&#xFF0C;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#xFF0C;&#x6C34;&#x5E73;&#x5206;&#x5E03;&#xFF0C;&#x4E2D;&#x95F4;&#x7528;&#x7A7A;&#x683C;&#x586B;&#x6EE1;&#xFF0C;&#x6700;&#x4E24;&#x8FB9;&#x5143;&#x7D20;&#x5404;&#x81EA;&#x9760;&#x8FB9;
      ...layout.flex.vchbs,
    },
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">StyleSheet</span><span class="hljs-selector-class">.create</span>({
    <span class="hljs-attribute">lines</span>: {
      height: <span class="hljs-built_in">px</span>(88),
      backgroundColor: color.background,
      // &#x4E00;&#x4E2A;&#x8FB9;&#x6846;&#x7C97;&#x7EC6;&#x4E3A;<span class="hljs-number">1px</span>&#x7684;&#x7EA2;&#x8272;&#x8FB9;&#x6846;
      ...layout.border
      // &#x5B50;&#x5143;&#x7D20;&#x6A2A;&#x5411;&#x6392;&#x5217;&#xFF0C;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#xFF0C;&#x6C34;&#x5E73;&#x5206;&#x5E03;&#xFF0C;&#x4E2D;&#x95F4;&#x7528;&#x7A7A;&#x683C;&#x586B;&#x6EE1;&#xFF0C;&#x6700;&#x4E24;&#x8FB9;&#x5143;&#x7D20;&#x5404;&#x81EA;&#x9760;&#x8FB9;
      ...layout.flex.vchbs,
    },
});</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x4E0D;&#x4EC5;&#x5C11;&#x4E86;&#x5F88;&#x591A;&#xFF0C;&#x7ED3;&#x6784;&#x4E5F;&#x6E05;&#x695A;&#x4E86;&#xFF0C;&#x800C;&#x4E14;&#x5230;&#x65F6;&#x5019;&#x66FF;&#x6362;&#x6216;&#x8005;&#x4FEE;&#x6539;&#x7684;&#x65F6;&#x5019;&#x4E5F;&#x5BB9;&#x6613;&#x4E00;&#x4E9B;&#x4E86;&#xFF0C;&#x4E0D;&#x8FC7;&#x5199;&#x6210;&#x8FD9;&#x6837;&#x5C31;&#x7ED3;&#x675F;&#x4E86;&#x561B;&#xFF1F;&#x5F53;&#x7136;&#x4E0D;&#x662F;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x6709;&#x4E00;&#x4E2A;&#x7EA2;&#x8272;&#x7684;&#x8FB9;&#x6846;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5728;layout&#x6A21;&#x5757;&#x4E0B;&#x65B0;&#x589E;&#x4E86;&#x4E00;&#x4E2A;border&#x5C5E;&#x6027;&#xFF0C;&#x90A3;&#x4E48;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x84DD;&#x8272;&#x7684;&#x8FB9;&#x6846;&#x5462;&#xFF1F;&#x4E00;&#x4E2A;&#x7EFF;&#x8272;&#x7684;&#x7C97;&#x8FB9;&#x6846;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x4F1A;&#x4E00;&#x76F4;&#x5F80;layout&#x6A21;&#x5757;&#x4E0A;&#x65B0;&#x589E;&#x5C5E;&#x6027;&#x561B;&#xFF1F;&#x90A3;&#x6700;&#x540E;&#x4F60;&#x77E5;&#x9053;layout&#x4E0A;&#x9762;&#x7A76;&#x7ADF;&#x6709;&#x591A;&#x5C11;&#x5C5E;&#x6027;&#x561B;&#xFF1F;&#x90A3;&#x4E0D;&#x5C31;&#x53C8;&#x56DE;&#x5230;&#x4E00;&#x5F00;&#x59CB;&#x4E86;&#x561B;&#x3002;&#x3002;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x7684;&#x5EFA;&#x8BAE;&#x662F;&#xFF0C;&#x5904;&#x4E8E;&#x6839;&#x8282;&#x70B9;&#x7684;&#x6A21;&#x5757;&#x6700;&#x597D;&#x63A7;&#x5236;&#x5728;3&#x4E2A;&#x5DE6;&#x53F3;&#xFF1A;</p><ul><li><strong>color</strong>&#xFF1A;&#x7528;&#x4E8E;&#x5B58;&#x653E;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x5168;&#x90E8;&#x989C;&#x8272;&#xFF0C;&#x8FD9;&#x4E5F;&#x4EE3;&#x8868;&#x7740;&#xFF0C;&#x5728;&#x7EC4;&#x4EF6;&#x7684;style&#x5185;&#x90E8;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x5E94;&#x8BE5;&#x518D;&#x663E;&#x793A;&#x7684;&#x4E66;&#x5199;&#x8BF8;&#x5982;<code>backgroundColor: &apos;#fff&apos;</code>&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x4E86;&#x3002;</li><li><strong>size</strong>&#xFF1A;&#x7528;&#x4E8E;&#x5B58;&#x653E;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x901A;&#x7528;&#x5927;&#x5C0F;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;&#x884C;&#x9AD8;&#x3001;&#x95F4;&#x8DDD;&#x3001;&#x5B57;&#x4F53;&#x5927;&#x5C0F;&#x7B49;&#x516C;&#x5171;&#x7684;&#x6570;&#x503C;&#x53C2;&#x6570;&#x3002;</li><li><strong>layout</strong>&#xFF1A;&#x7528;&#x4E8E;&#x5B58;&#x653E;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x516C;&#x5171;&#x5E03;&#x5C40;&#xFF0C;&#x4F8B;&#x5982;&#x63A7;&#x5236;&#x5E03;&#x5C40;&#x7684;flex&#x5C5E;&#x6027;&#x3001;&#x901A;&#x7528;&#x7684;padding&#x3001;margin&#x3001;position&#x5B9A;&#x4F4D;&#x3002;</li></ul><p>&#x90A3;&#x4E48;&#x7B2C;&#x4E8C;&#x7EA7;&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x6211;&#x4E5F;&#x5EFA;&#x8BAE;&#x63A7;&#x5236;&#x5728;5&#x4E2A;&#x5DE6;&#x53F3;&#xFF1A;</p><ul><li>&#x989C;&#x8272;&#xFF1A;&#x8FB9;&#x6846;&#x989C;&#x8272;&#x3001;&#x80CC;&#x666F;&#x989C;&#x8272;&#x3001;&#x5B57;&#x4F53;&#x989C;&#x8272;&#x3002;&#x3002;&#x3002;</li><li>&#x5927;&#x5C0F;&#xFF1A;&#x8FB9;&#x6846;&#x5927;&#x5C0F;&#x3001;&#x95F4;&#x8DDD;&#x5927;&#x5C0F;&#x3001;&#x5B57;&#x4F53;&#x5927;&#x5C0F;&#x3002;&#x3002;&#x3002;</li><li>&#x5E03;&#x5C40;&#xFF1A;flex&#x5E03;&#x5C40;&#x3001;position&#x5B9A;&#x4F4D;&#x3002;&#x3002;&#x3002;</li></ul><p>&#x8FD9;&#x6837;&#x867D;&#x7136;&#x589E;&#x52A0;&#x4E86;&#x6DF1;&#x5EA6;&#xFF0C;&#x4F46;&#x662F;&#x5206;&#x7C7B;&#x6E05;&#x6670;&#xFF0C;&#x7ED3;&#x6784;&#x660E;&#x786E;&#xFF0C;&#x590D;&#x7528;&#x6027;&#x4E5F;&#x6BD4;&#x8F83;&#x9AD8;&#x3002;&#x867D;&#x7136;&#x53EF;&#x80FD;&#x4F1A;&#x589E;&#x52A0;&#x9879;&#x76EE;&#x65B0;&#x5EFA;&#x65F6;&#x7684;&#x6210;&#x672C;&#xFF08;&#x521B;&#x5EFA;&#x5404;&#x79CD;&#x5206;&#x7C7B;&#xFF09;&#xFF0C;&#x4F46;&#x662F;&#x4F1A;&#x7ED9;&#x540E;&#x7EED;&#x7684;&#x5F00;&#x53D1;&#x3001;&#x8FC1;&#x79FB;&#x3001;&#x91CD;&#x6784;&#x3001;&#x590D;&#x7528;&#x7B49;&#x5E26;&#x6765;&#x6781;&#x5927;&#x7684;&#x4FBF;&#x6377;&#x3002;&#x4F46;&#x8FD9;&#x5C31;&#x7ED3;&#x675F;&#x4E86;&#x561B;&#xFF1F;&#x6709;&#x7684;&#x540C;&#x5B66;&#x548C;&#x6211;&#x8BF4;&#xFF0C;&#x6211;&#x6709;&#x5F88;&#x591A;&#x7684;&#x8FB9;&#x6846;&#x554A;&#xFF0C;&#x6211;&#x6709;&#x5F88;&#x591A;&#x6837;&#x5F0F;&#x8981;&#x590D;&#x7528;&#x554A;&#xFF0C;&#x5230;&#x6700;&#x540E;&#x6211;&#x7684;layout&#x4E5F;&#x4F1A;&#x5927;&#x5230;&#x770B;&#x4E0D;&#x61C2;&#x554A;&#x3002;&#x3002;&#x3002;&#x8FD8;&#x6709;&#x7684;&#x540C;&#x5B66;&#x8BF4;&#x6211;&#x6CA1;&#x6709;&#x90A3;&#x4E48;&#x591A;&#x53EF;&#x590D;&#x7528;&#x7684;&#x6837;&#x5F0F;&#x554A;&#xFF0C;&#x90A3;&#x662F;&#x4E0D;&#x662F;&#x4F60;&#x603B;&#x7ED3;&#x7684;&#x601D;&#x8DEF;&#x5C31;&#x7528;&#x4E0D;&#x4E0A;&#x4E86;&#x554A;&#x3002;&#x5F53;&#x7136;&#x4E0D;&#x662F;&#x54AF;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x5B8C;&#x6210;&#x4E86;&#x6837;&#x5F0F;&#x6A21;&#x5757;&#x5316;&#x7684;&#x7B2C;&#x4E00;&#x6B65;(&#x62BD;&#x79BB;&#x6837;&#x5F0F;)&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5F00;&#x59CB;&#x7B2C;&#x4E8C;&#x6B65;&#x3002;</p><h2 id="articleHeader2">&#x8BE5;&#x600E;&#x4E48;&#x66F4;&#x4FBF;&#x6377;&#x7684;&#x5199;&#x6837;&#x5F0F;&#xFF1F;</h2><p>&#x73B0;&#x5728;&#x5F88;&#x591A;web&#x5F00;&#x53D1;&#x8005;&#x5728;&#x4E66;&#x5199;css&#x7684;&#x65F6;&#x5019;&#x5DF2;&#x7ECF;&#x4E0D;&#x518D;&#x53BB;&#x5199;&#x539F;&#x751F;&#x7684;css&#x4E86;&#x5427;&#xFF0C;&#x800C;&#x662F;&#x91C7;&#x7528;&#x4F8B;&#x5982;scss&#x3001;less&#x8FD9;&#x6837;&#x7684;&#x9884;&#x7F16;&#x8BD1;&#x8BED;&#x8A00;&#x53BB;&#x5199;&#x6837;&#x5F0F;&#x4E86;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E9B;&#x9884;&#x7F16;&#x8BD1;&#x8BED;&#x8A00;&#x7ED9;&#x6211;&#x4EEC;&#x5E26;&#x6765;&#x4E86;&#x54EA;&#x4E9B;&#x65B9;&#x4FBF;&#x5462;&#xFF1F;&#x6211;&#x60F3;&#x5927;&#x591A;&#x6570;&#x540C;&#x5B66;&#x7B2C;&#x4E00;&#x65F6;&#x95F4;&#x90FD;&#x4F1A;&#x60F3;&#x5230;<strong>Mixin</strong>&#x3002;</p><blockquote>&#x5229;&#x7528;&#x6DF7;&#x5408;&#x5668;&#xFF0C;&#x53EF;&#x4EE5;&#x5F88;&#x5BB9;&#x6613;&#x5730;&#x5728;&#x6837;&#x5F0F;&#x8868;&#x7684;&#x4E0D;&#x540C;&#x5730;&#x65B9;&#x5171;&#x4EAB;&#x6837;&#x5F0F;&#x3002;&#x5982;&#x679C;&#x4F60;&#x53D1;&#x73B0;&#x81EA;&#x5DF1;&#x5728;&#x4E0D;&#x505C;&#x5730;&#x91CD;&#x590D;&#x4E00;&#x6BB5;&#x6837;&#x5F0F;&#xFF0C;&#x90A3;&#x5C31;&#x5E94;&#x8BE5;&#x628A;&#x8FD9;&#x6BB5;&#x6837;&#x5F0F;&#x6784;&#x9020;&#x6210;&#x4F18;&#x826F;&#x7684;&#x6DF7;&#x5408;&#x5668;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x8FD9;&#x6BB5;&#x6837;&#x5F0F;&#x672C;&#x8EAB;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x903B;&#x8F91;&#x5355;&#x5143;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;&#x662F;&#x4E00;&#x7EC4;&#x653E;&#x5728;&#x4E00;&#x8D77;&#x6709;&#x610F;&#x4E49;&#x7684;&#x5C5E;&#x6027;&#x3002;</blockquote><p>&#x5728;react-native&#x4E0A;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x6837;&#x5F0F;&#x4EE3;&#x7801;&#x662F;js&#x4EE3;&#x7801;&#xFF0C;&#x6240;&#x4EE5;&#x5F88;&#x5929;&#x7136;&#x7684;&#x5C31;&#x81EA;&#x5E26;&#x9884;&#x7F16;&#x8BD1;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x5176;&#x5B83;&#x989D;&#x5916;&#x7684;&#x8BED;&#x8A00;&#x53BB;&#x5904;&#x7406;&#x5B83;&#xFF0C;&#x8981;&#x505A;&#x7684;&#x53EA;&#x662F;&#x5224;&#x65AD;&#x4F60;&#x7684;&#x5C5E;&#x6027;&#x662F;&#x5426;&#x9700;&#x8981;&#x4E00;&#x4E2A;Mixin&#x3002;</p><blockquote>&#x5224;&#x65AD;&#x4E00;&#x7EC4;&#x5C5E;&#x6027;&#x662F;&#x5426;&#x5E94;&#x8BE5;&#x7EC4;&#x5408;&#x6210;&#x4E00;&#x4E2A;&#x6DF7;&#x5408;&#x5668;&#xFF0C;&#x4E00;&#x6761;&#x7ECF;&#x9A8C;&#x6CD5;&#x5219;&#x5C31;&#x662F;&#x4F60;&#x80FD;&#x5426;&#x4E3A;&#x8FD9;&#x4E2A;&#x6DF7;&#x5408;&#x5668;&#x60F3;&#x51FA;&#x4E00;&#x4E2A;&#x597D;&#x7684;&#x540D;&#x5B57;&#x3002;&#x5982;&#x679C;&#x4F60;&#x80FD;&#x627E;&#x5230;&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7684;&#x77ED;&#x540D;&#x5B57;&#x6765;&#x63CF;&#x8FF0;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#x4FEE;&#x9970;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x6BD4;&#x5982;rounded-cornersfancy-font&#x6216;&#x8005;no-bullets&#xFF0C;&#x90A3;&#x4E48;&#x5F80;&#x5F80;&#x80FD;&#x591F;&#x6784;&#x9020;&#x4E00;&#x4E2A;&#x5408;&#x9002;&#x7684;&#x6DF7;&#x5408;&#x5668;&#x3002;&#x5982;&#x679C;&#x4F60;&#x627E;&#x4E0D;&#x5230;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x6784;&#x9020;&#x4E00;&#x4E2A;&#x6DF7;&#x5408;&#x5668;&#x53EF;&#x80FD;&#x5E76;&#x4E0D;&#x5408;&#x9002;&#x3002;</blockquote><p>&#x90A3;&#x4E48;&#x5728;js&#x4E0A;&#x9762;&#xFF0C;&#x6211;&#x8BE5;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;Mixin&#x5462;&#xFF1F;&#x592A;&#x7B80;&#x5355;&#x4E86;&#xFF01;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x6CA1;&#x9519;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#x7684;&#x51FD;&#x6570;&#x5C31;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#x8FD9;&#x6837;&#x7684;&#x6548;&#x679C;&#x4E86;&#xFF0C;&#x52A0;&#x4E0A;ES7&#x7684;&#x62D3;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#x4E00;&#x4E2A;&#x6DF7;&#x5408;&#x5668;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default StyleSheet.create({
    lines: {
      height: px(88),
      backgroundColor: color.background,
      ...layout.border(1px, &apos;#fff&apos;)
    },
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">StyleSheet</span><span class="hljs-selector-class">.create</span>({
    <span class="hljs-attribute">lines</span>: {
      height: <span class="hljs-built_in">px</span>(88),
      backgroundColor: color.background,
      ...layout.<span class="hljs-built_in">border</span>(1px, <span class="hljs-string">&apos;#fff&apos;</span>)
    },
});</code></pre><p>&#x5E38;&#x5199;react-native&#x7684;&#x540C;&#x5B66;&#x4E00;&#x5B9A;&#x90FD;&#x5934;&#x75BC;&#x8FC7;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#x5427;&#xFF0C;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x80FD;&#x50CF;&#x5199;css&#x6837;&#x5F0F;&#x4E00;&#x6837;&#x5728;&#x4E00;&#x884C;&#x4E2D;&#x628A;&#x6240;&#x6709;&#x7684;&#x5C5E;&#x6027;&#x90FD;&#x5199;&#x5B8C;&#xFF0C;&#x5728;css&#x4E2D;&#x6211;&#x4EEC;&#x5982;&#x679C;&#x60F3;&#x8981;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x56DB;&#x9762;&#x8FB9;&#x6846;&#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".border {
    border: 10px 5px 10px 5px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.border</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">10px</span> <span class="hljs-number">5px</span> <span class="hljs-number">10px</span> <span class="hljs-number">5px</span>;
}</code></pre><p>&#x90A3;&#x4E48;&#x5728;&#x6211;&#x4EEC;&#x5199;&#x6837;&#x5F0F;&#x7684;&#x65F6;&#x5019;&#x662F;&#x4E0D;&#x662F;&#x4E5F;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default StyleSheet.create({
    lines: {
      height: px(88),
      backgroundColor: color.background,
      ...layout.border(10px, 5px, 10px, 5px),
    },
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">StyleSheet</span><span class="hljs-selector-class">.create</span>({
    <span class="hljs-attribute">lines</span>: {
      height: <span class="hljs-built_in">px</span>(88),
      backgroundColor: color.background,
      ...layout.<span class="hljs-built_in">border</span>(10px, 5px, 10px, 5px),
    },
});</code></pre><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x51FD;&#x6570;&#x7684;&#x4E0D;&#x540C;&#x6570;&#x91CF;&#x7684;&#x53C2;&#x6570;&#x6765;&#x6A21;&#x62DF;&#x4F20;&#x7EDF;css&#x5F00;&#x53D1;&#x7684;<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Shorthand_properties" rel="nofollow noreferrer" target="_blank">&#x7B80;&#x5199;&#x5C5E;&#x6027;</a>&#xFF0C;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x66F4;&#x4E60;&#x60EF;&#x5728;View&#x4E0A;&#x9762;&#x53BB;&#x505A;&#x6837;&#x5F0F;&#x7684;&#x8FD0;&#x7B97;&#xFF0C;&#x5229;&#x7528;react-native&#x6837;&#x5F0F;&#x7684;&#x8986;&#x76D6;&#x6570;&#x7EC4;&#x53BB;&#x4E0D;&#x65AD;&#x7684;&#x8986;&#x76D6;&#x4E4B;&#x524D;&#x7684;&#x6837;&#x5F0F;&#x6765;&#x8FBE;&#x5230;&#x8FD0;&#x7B97;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x8FD9;&#x5C31;&#x5BFC;&#x81F4;View&#x4E2D;&#x9664;&#x4E86;&#x9700;&#x8981;&#x8BA1;&#x7B97;&#x4F60;&#x7684;&#x7EC4;&#x4EF6;&#x8981;&#x4E0D;&#x8981;&#x5C55;&#x793A;&#x3001;&#x5982;&#x4F55;&#x5C55;&#x793A;&#x4E4B;&#x5916;&#xFF0C;&#x8FD8;&#x8981;&#x53BB;&#x8BA1;&#x7B97;&#x6837;&#x5F0F;&#x8BE5;&#x5982;&#x4F55;&#x5199;&#xFF0C;&#x65E2;&#x7136;&#x6211;&#x4EEC;&#x8981;&#x505A;&#x6837;&#x5F0F;&#x548C;&#x9875;&#x9762;&#x7684;&#x5206;&#x79BB;&#xFF0C;&#x90A3;&#x5C31;&#x5E94;&#x8BE5;&#x505A;&#x5F7B;&#x5E95;&#x4E00;&#x4E9B;&#xFF0C;&#x5C06;&#x6837;&#x5F0F;&#x7684;&#x8BA1;&#x7B97;&#x4E5F;&#x653E;&#x5728;style.js&#x4E2D;&#x3002;</p><h2 id="articleHeader3">&#x603B;&#x7ED3;</h2><p>&#x6700;&#x540E;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#x6211;&#x4EEC;&#x6240;&#x505A;&#x7684;&#xFF1A;</p><ul><li>&#x5206;&#x79BB;&#x6837;&#x5F0F;&#x548C;&#x9875;&#x9762;</li><li>&#x63D0;&#x53D6;&#x9879;&#x76EE;&#x7EA7;&#x7684;&#x516C;&#x5171;&#x5C5E;&#x6027;</li><li>&#x5F52;&#x7C7B;&#x63D0;&#x53D6;&#x7684;&#x516C;&#x5171;&#x6837;&#x5F0F;</li><li>&#x901A;&#x8FC7;&#x6DF7;&#x5408;&#x5668;&#x53BB;&#x521B;&#x9020;&#x6A21;&#x677F;&#x6837;&#x5F0F;</li></ul><p>&#x6211;&#x5EFA;&#x8BAE;&#x65E0;&#x8BBA;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x591A;&#x5927;&#xFF0C;&#x4EE3;&#x7801;&#x591A;&#x5C11;&#xFF0C;&#x524D;&#x4E09;&#x6B65;&#x90FD;&#x5E94;&#x8BE5;&#x662F;&#x4E00;&#x4E2A;&#x5FC5;&#x5907;&#x7684;&#x73AF;&#x8282;&#xFF0C;&#x53EF;&#x80FD;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x4E0D;&#x590D;&#x6742;&#xFF0C;&#x6682;&#x65F6;&#x7528;&#x4E0D;&#x5230;&#x7B2C;&#x56DB;&#x70B9;&#xFF0C;&#x4F46;&#x524D;&#x4E09;&#x6761;&#x65E0;&#x8BBA;&#x5982;&#x4F55;&#x90FD;&#x5E94;&#x8BE5;&#x5C3D;&#x65E9;&#x7684;&#x53BB;&#x5B8C;&#x5584;&#xFF0C;&#x8FD9;&#x4E0D;&#x4EC5;&#x4EC5;&#x80FD;&#x5E2E;&#x52A9;&#x4F60;&#x5B9E;&#x73B0;&#x540E;&#x7EED;&#x7684;&#x8FED;&#x4EE3;&#xFF0C;&#x4E5F;&#x80FD;&#x5728;&#x4F60;&#x7684;&#x8111;&#x4E2D;&#x4FDD;&#x7559;&#x51FA;&#x4E00;&#x4E2A;&#x5BF9;&#x4E8E;&#x9879;&#x76EE;&#x5B8C;&#x6574;&#x7ED3;&#x6784;&#x7684;&#x5370;&#x8C61;&#xFF0C;&#x8981;&#x77E5;&#x9053;&#x6837;&#x5F0F;&#x662F;&#x5BC4;&#x751F;&#x4E8E;&#x9875;&#x9762;&#x7684;&#xFF0C;&#x6E05;&#x695A;&#x4E86;&#x6837;&#x5F0F;&#xFF0C;&#x90A3;&#x4E48;&#x9875;&#x9762;&#x5982;&#x4F55;&#x4F60;&#x4E5F;&#x591A;&#x5C11;&#x4F1A;&#x70C2;&#x719F;&#x4E8E;&#x5FC3;&#x4E86;&#x3002;&#x800C;&#x76F8;&#x6BD4;&#x4E8E;&#x901A;&#x8FC7;&#x68B3;&#x7406;js&#x7684;&#x903B;&#x8F91;&#x53BB;&#x4E86;&#x89E3;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#xFF0C;&#x6211;&#x60F3;&#x901A;&#x8FC7;&#x9875;&#x9762;&#x4E5F;&#x8BB8;&#x4F1A;&#x66F4;&#x5FEB;&#x5427;&#xFF0C;&#x8FD9;&#x5BF9;&#x521A;&#x521A;&#x63A5;&#x624B;&#x9879;&#x76EE;&#x7684;&#x65B0;&#x540C;&#x5B66;&#x6765;&#x8BF4;&#xFF0C;&#x662F;&#x975E;&#x5E38;&#x53CB;&#x5584;&#x7684;&#x3002;</p><h2 id="articleHeader4">&#x6700;&#x540E;&#x7684;&#x6700;&#x540E;</h2><p>&#x4E00;&#x822C;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x5C31;&#x8BE5;&#x653E;&#x4E0A;&#x81EA;&#x5DF1;&#x5F00;&#x6E90;&#x7684;&#x9879;&#x76EE;&#x5730;&#x5740;&#x6216;&#x8005;&#x5B89;&#x5229;&#x4E00;&#x6CE2;&#x4F5C;&#x8005;&#x5199;&#x7684;&#x5E93;&#x4E86;&#xFF0C;&#x4E0D;&#x8FC7;&#x548C;&#x4E0A;&#x4E00;&#x7BC7;&#x4E00;&#x6837;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x53EA;&#x8BA8;&#x8BBA;&#x601D;&#x8DEF;&#xFF0C;&#x8868;&#x8FF0;&#x60F3;&#x6CD5;&#xFF0C;&#x800C;&#x5177;&#x4F53;&#x7684;&#x5B9E;&#x8DF5;&#x548C;&#x4EE3;&#x7801;&#x8FD8;&#x662F;&#x8981;&#x9760;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x4E0D;&#x65AD;&#x7684;&#x603B;&#x7ED3;&#x548C;&#x79EF;&#x7D2F;~</p><p>&#x6211;&#x76F8;&#x4FE1;&#x5F88;&#x591A;&#x540C;&#x5B66;&#x5BF9;&#x4E8E;&#x6211;&#x63D0;&#x5230;&#x7684;&#x524D;&#x4E09;&#x70B9;&#x90FD;&#x4F1A;&#x5F88;&#x5FEB;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x800C;&#x5BF9;&#x4E8E;&#x7B2C;&#x56DB;&#x70B9;&#x53EF;&#x80FD;&#x5C31;&#x6709;&#x4E9B;&#x61F5;&#x4E86;&#xFF0C;&#x8BE5;&#x600E;&#x4E48;&#x53BB;&#x7406;&#x89E3;&#x8FD9;&#x4E2A;&#x6DF7;&#x5408;&#x5668;&#x5462;&#xFF1F;&#x6211;&#x8BE5;&#x600E;&#x4E48;&#x7528;js&#x53BB;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x5462;&#xFF1F;&#x4E0B;&#x9762;&#x6211;&#x5C31;&#x7528;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#x6765;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x8BE5;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;Mixin&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const layout = {
  // &#x8FD9;&#x91CC;&#x7684;&#x5F62;&#x53C2;&#x987A;&#x5E8F;&#x9075;&#x5FAA;css&#x4E2D;&#x7684; &#x201C;&#x4E0A;&#x3001;&#x53F3;&#x3001;&#x4E0B;&#x3001;&#x5DE6;&#x201D;
  margin(...arg) {
    let margin = {};
    switch (arg.length) {
      case 1:
        margin = {
          marginTop: arg[0],
          marginRight: arg[0],
          marginBottom: arg[0],
          marginLeft: arg[0],
        };
        break;
      case 2:
        margin = {
          marginVertical: arg[0],
          marginHorizontal: arg[1],
        };
        break;
      case 3:
        margin = {
          marginTop: arg[0],
          marginHorizontal: arg[1],
          marginBottom: arg[2],
        };
        break;
      case 4:
        margin = {
          marginTop: arg[0],
          marginRight: arg[1],
          marginBottom: arg[2],
          marginLeft: arg[3],
        };
        break;
      default:
        break;
    }
    return margin;
  },
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> layout = {
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7684;&#x5F62;&#x53C2;&#x987A;&#x5E8F;&#x9075;&#x5FAA;css&#x4E2D;&#x7684; &#x201C;&#x4E0A;&#x3001;&#x53F3;&#x3001;&#x4E0B;&#x3001;&#x5DE6;&#x201D;</span>
  margin(...arg) {
    <span class="hljs-keyword">let</span> margin = {};
    <span class="hljs-keyword">switch</span> (arg.length) {
      <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
        margin = {
          <span class="hljs-attr">marginTop</span>: arg[<span class="hljs-number">0</span>],
          <span class="hljs-attr">marginRight</span>: arg[<span class="hljs-number">0</span>],
          <span class="hljs-attr">marginBottom</span>: arg[<span class="hljs-number">0</span>],
          <span class="hljs-attr">marginLeft</span>: arg[<span class="hljs-number">0</span>],
        };
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
        margin = {
          <span class="hljs-attr">marginVertical</span>: arg[<span class="hljs-number">0</span>],
          <span class="hljs-attr">marginHorizontal</span>: arg[<span class="hljs-number">1</span>],
        };
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
        margin = {
          <span class="hljs-attr">marginTop</span>: arg[<span class="hljs-number">0</span>],
          <span class="hljs-attr">marginHorizontal</span>: arg[<span class="hljs-number">1</span>],
          <span class="hljs-attr">marginBottom</span>: arg[<span class="hljs-number">2</span>],
        };
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:
        margin = {
          <span class="hljs-attr">marginTop</span>: arg[<span class="hljs-number">0</span>],
          <span class="hljs-attr">marginRight</span>: arg[<span class="hljs-number">1</span>],
          <span class="hljs-attr">marginBottom</span>: arg[<span class="hljs-number">2</span>],
          <span class="hljs-attr">marginLeft</span>: arg[<span class="hljs-number">3</span>],
        };
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">default</span>:
        <span class="hljs-keyword">break</span>;
    }
    <span class="hljs-keyword">return</span> margin;
  },
};</code></pre><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x6613;&#x7684;Mixin&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x4F60;&#x7684;&#x9700;&#x6C42;&#x53BB;&#x5199;&#x66F4;&#x591A;&#x8FD9;&#x6837;&#x7684;Mixin&#xFF0C;&#x5176;&#x5B9E;&#x6211;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x5728;&#x9879;&#x76EE;&#x4E00;&#x5F00;&#x59CB;&#x7684;&#x65F6;&#x5019;&#x662F;&#x4E0D;&#x4E00;&#x5B9A;&#x9700;&#x8981;&#x8FD9;&#x4E2A;&#x7684;&#xFF0C;&#x8FD9;&#x4E2A;&#x5B58;&#x5728;&#x7684;&#x610F;&#x4E49;&#x662F;&#x5BF9;&#x4E8E;&#x590D;&#x6742;&#x6837;&#x5F0F;&#x4E66;&#x5199;&#x7684;&#xFF0C;&#x66F4;&#x591A;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x53EA;&#x8981;&#x505A;&#x5230;&#x4E86;&#x524D;&#x4E09;&#x70B9;&#xFF0C;&#x5728;&#x6837;&#x5F0F;&#x8FD9;&#x4E00;&#x5757;&#x5C31;&#x5DF2;&#x7ECF;&#x975E;&#x5E38;&#x7684;&#x6574;&#x6D01;&#x3001;&#x5B8C;&#x5584;&#x4E86;&#xFF0C;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#x4F60;&#x4E0D;&#x9700;&#x8981;Mixin&#x5C31;&#x80FD;&#x7EC4;&#x7EC7;&#x597D;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x597D;&#x4E86;&#xFF0C;&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x8FD9;&#x6B21;&#x6211;&#x60F3;&#x548C;&#x5927;&#x5BB6;&#x804A;&#x7684;&#x5173;&#x4E8E;react-native&#x4E2D;&#x6837;&#x5F0F;&#x7684;&#x8BDD;&#x9898;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x4E0B;&#x6B21;&#x89C1;~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
来聊聊怎么写react-native上的样式吧

## 原文链接
[https://segmentfault.com/a/1190000013332489](https://segmentfault.com/a/1190000013332489)

