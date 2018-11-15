---
title: 从 1 到完美，用 js 和 react-native 写一个 APP
hidden: true
categories: reprint
slug: 16dff42a
date: 2018-11-12 02:30:05
---

{{< raw >}}
<h1>&#x4ECE; 1 &#x5230;&#x5B8C;&#x7F8E;&#xFF0C;&#x7528; js &#x548C; react-native &#x5199;&#x4E00;&#x4E2A; APP</h1><p><a href="https://www.facebook.com/" rel="nofollow noreferrer">facebook</a> &#x5728; 2013 &#x5E74;&#x5F00;&#x6E90;&#x4E86; <a href="https://github.com/facebook/react" rel="nofollow noreferrer">react</a> &#x540E;&#xFF0C;&#x7D27;&#x63A5;&#x7740;&#x5728; 2015 &#x5E74;&#x5C31;&#x53C8;&#x5F00;&#x6E90;&#x4E86; <a href="https://github.com/facebook/react-native" rel="nofollow noreferrer">react-native</a>&#xFF0C;&#x5C31;&#x6B64;&#x6253;&#x5F00;&#x4E86;&#x7528; <code>js</code> &#x548C;&#x524D;&#x7AEF;&#x6280;&#x672F;&#x5199;&#x539F;&#x751F; <code>android&amp;ios</code> APP &#x4E4B;&#x8DEF;&#x3002;&#x5C3D;&#x7BA1;&#x5230;&#x76EE;&#x524D;&#x4E3A;&#x6B62; <a href="https://github.com/facebook/react-native" rel="nofollow noreferrer">react-native</a> &#x6700;&#x65B0;&#x7248;&#x672C;&#x662F; <code>0.56.0</code>&#xFF0C;&#x8FD8;&#x6CA1;&#x6709;&#x53D1;&#x5E03;&#x6B63;&#x5F0F; <code>1.0</code> &#x7248;&#xFF0C;&#x4F46;&#x4F7F;&#x7528; <code>react-native</code> &#x5F00;&#x53D1;&#x539F;&#x751F; APP &#x7684;&#x6280;&#x672F;&#x5DF2;&#x7ECF;&#x6BD4;&#x8F83;&#x6210;&#x719F;&#x4E86;&#xFF0C;&#x5F88;&#x591A;&#x5546;&#x4E1A;&#x516C;&#x53F8;&#x548C;&#x5546;&#x4E1A;&#x8F6F;&#x4EF6;&#x90FD;&#x5728;&#x7528; <code>react-native</code> &#x505A;&#x5F00;&#x53D1;&#xFF0C;&#x6BD4;&#x5982; <a href="https://www.facebook.com/" rel="nofollow noreferrer">facebook</a>, <a href="https://www.airbnb.com/" rel="nofollow noreferrer">airbnb</a>, <a href="https://www.uber.com/" rel="nofollow noreferrer">uber</a>, <a href="https://www.skype.com/" rel="nofollow noreferrer">skype</a> &#x7B49;&#x3002;</p><p>&#x53E6;&#x5916;&#xFF0C;&#x9664;&#x4E86; <a href="https://github.com/facebook/react" rel="nofollow noreferrer">react</a> &#x5728;&#x505A;&#x5199;&#x539F;&#x751F; APP &#x7684;&#x5C1D;&#x8BD5;&#x4E4B;&#x5916;&#xFF0C;<a href="https://github.com/vuejs/vue" rel="nofollow noreferrer">vue</a> &#x4E5F;&#x5728;&#x5C1D;&#x8BD5;&#xFF0C;&#x8BE6;&#x89C1; <a href="https://vue-native.io/" rel="nofollow noreferrer">vue-native</a>&#x3002;</p><h2>1. &#x524D;&#x8A00;</h2><ol><li>&#x5F00;&#x53D1;&#x65F6;&#x5EFA;&#x8BAE;&#x7528; mac&#xFF0C;&#x56E0;&#x4E3A; mac &#x4E0A;&#x7684; ios &#x6A21;&#x62DF;&#x5668;&#x80FD;&#x5728;&#x5F00;&#x53D1;&#x65F6;&#xFF0C;&#x5FEB;&#x901F;&#x7684;&#x91CD;&#x8F7D;&#x5E94;&#x7528;&#xFF0C;&#x800C; android &#x5C31;&#x6162;&#x5F88;&#x591A;&#x4E86;</li><li><p>&#x5F00;&#x53D1;&#x65F6;&#x5EFA;&#x8BAE;&#x7528; <a href="https://github.com/yarnpkg/yarn" rel="nofollow noreferrer">yarn</a>, &#x5982;&#x679C;&#x975E;&#x8981;&#x7528; npm, &#x52A1;&#x5FC5;&#x4F7F;&#x7528; npm &lt; 5 &#x7248;&#x672C;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x53EF;&#x80FD;&#x9047;&#x5230;&#x4EE5;&#x4E0B;&#x7684;&#x95EE;&#x9898;&#xFF08;&#x627E;&#x4E0D;&#x5230; <code>node_modules</code> &#x4E0B;&#x9762;&#x7684;&#x6587;&#x4EF6;&#xFF09;&#xFF1A;</p><ul><li><code>Cannot find entry file node_modules/react-native-scripts/build/bin/crna-entry.js</code></li><li><code>Unable to resolve &quot;react-navigation&quot; from &quot;App.js&quot;</code></li><li>expo xde &#x4E2D;: <code>Metro Bundler failed to start. (code: EMFILE)</code></li><li>expo xde &#x4E2D;: <code>Metro Bundler failed to start. (code: EAGAIN)</code></li></ul></li></ol><h2>2. &#x5B9E;&#x73B0;&#x539F;&#x7406;</h2><p><code>react-native</code> &#x5728; APP &#x5185;&#x542F;&#x52A8;&#x5E76;&#x7EF4;&#x62A4;&#x4E86;&#x4E00;&#x4E2A; <code>js</code> UI &#x8FDB;&#x7A0B;&#xFF08;&#x6709;&#x53EF;&#x80FD;&#x8FD8;&#x6709; <code>js</code> background &#x8FDB;&#x7A0B;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x628A; <code>js</code> UI &#x8FDB;&#x7A0B;&#x4E2D;&#x7684;&#x7EC4;&#x4EF6;&#x53CA;&#x5176;&#x6837;&#x5F0F;&#x6620;&#x5C04;&#x5230; APP &#x7684;&#x539F;&#x751F; UI &#x5C42;&#xFF0C;&#x8FD9;&#x6837; <code>js</code> UI &#x8FDB;&#x7A0B;&#x4E2D;&#x7EC4;&#x4EF6;&#x7684;&#x66F4;&#x65B0;&#x5C31;&#x7ACB;&#x523B;&#x53CD;&#x5E94;&#x5230; APP UI &#x8FDB;&#x7A0B;&#x4E2D;&#xFF0C;&#x800C;&#x5176;&#x4ED6;&#x903B;&#x8F91;&#x548C;&#x6570;&#x636E;&#x7B49;&#x7684;&#x72B6;&#x6001;&#x90FD;&#x7EF4;&#x6301;&#x5728; <code>js</code> UI &#x8FDB;&#x7A0B;&#x4E2D;&#x3002;&#x8FD9;&#x6837;&#x4FBF;&#x8FBE;&#x5230;&#x4E86;&#x7528; <code>js</code> &#x548C;&#x524D;&#x7AEF;&#x6280;&#x672F;&#x5199;&#x539F;&#x751F; APP &#x7684;&#x529F;&#x80FD;&#x3002;</p><p>&#x5BF9;&#x5E94; <code>web</code> &#x6765;&#x770B;&#xFF0C;<code>react-native</code> &#x7A0B;&#x5E8F;&#x53EA;&#x6709;&#x4E24;&#x4E2A;&#x90E8;&#x5206;&#xFF0C;<code>style</code> &#x548C; <code>js</code>&#xFF0C;&#x800C; <code>js</code> &#x90E8;&#x5206;&#x5219;&#x5206;&#x4E3A;&#x7EC4;&#x4EF6;&#x548C; <code>api</code>&#x3002;</p><pre><code>|-- react-native
    |-- style &#x6837;&#x5F0F;&#x90E8;&#x5206;&#xFF0C;&#x5BF9;&#x5E94; web &#x7684; css &#x90E8;&#x5206;
    |-- js &#x90E8;&#x5206;
        |-- &#x7EC4;&#x4EF6; &#x9884;&#x5B9A;&#x4E49;&#x57FA;&#x7840;&#x5BB9;&#x5668;
        |-- api &#x5BF9;&#x539F;&#x751F;&#x63A5;&#x53E3;&#x7684;&#x5C01;&#x88C5;</code></pre><h3>2.1 style</h3><p><code>react-native</code> &#x7684; <code>style</code> &#x7528;&#x6765;&#x63CF;&#x8FF0;&#x7EC4;&#x4EF6;&#x7684;&#x6837;&#x5F0F;&#x3001;&#x5E03;&#x5C40;&#x7B49;&#xFF0C;&#x7528; <code>js</code> &#x4E66;&#x5199;&#x3002;&#x5B83;&#x501F;&#x9274;&#x4E86; <code>css</code> &#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x4F46;&#x53EA;&#x652F;&#x6301;&#x90E8;&#x5206;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x5E76;&#x4E14;&#x4E66;&#x5199;&#x65B9;&#x5F0F;&#x548C;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x90FD;&#x6709;&#x5F88;&#x5927;&#x7684;&#x4E0D;&#x540C;&#xFF1A;</p><ul><li>&#x6CA1;&#x6709; <code>class, id</code> &#x7B49;&#x4E4B;&#x7C7B;&#x7684; css &#x9009;&#x62E9;&#x5668;</li><li>&#x6CA1;&#x6709; <code>px, em</code> &#x7B49;&#x4E4B;&#x7C7B;&#x7684; css &#x5C3A;&#x5BF8;&#x5355;&#x4F4D;</li><li>&#x5C5E;&#x6027;&#x540D;&#x4F7F;&#x7528; <a href="http://www.w3school.com.cn/jsref/dom_obj_style.asp" rel="nofollow noreferrer">HTML DOM Style &#x5BF9;&#x8C61;</a> &#x7684;&#x8BED;&#x6CD5;</li><li>&#x4F7F;&#x7528;&#x6837;&#x5F0F;&#x65F6;&#x53EA;&#x6709;&#x7C7B;&#x4F3C;&#x4E8E; css &#x7684;&#x884C;&#x5185;&#x6837;&#x5F0F;&#x8FD9;&#x6837;&#x7684;&#x5199;&#x6CD5;</li></ul><p>&#x6BD4;&#x5982;&#xFF1A;</p><pre><code>import React, { Component } from &apos;react&apos;;
import { StyleSheet, Text, View } from &apos;react-native&apos;;

export default class LotsOfStyles extends Component {
  render() {
    return (
      &lt;View&gt;
        &lt;Text style={styles.red}&gt;just red&lt;/Text&gt;
        &lt;Text style={styles.bigblue}&gt;just bigblue&lt;/Text&gt;
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
});</code></pre><p>&#x8BE6;&#x89C1; <a href="https://facebook.github.io/react-native/docs/0.56/style" rel="nofollow noreferrer">Style</a>, <a href="https://facebook.github.io/react-native/docs/0.56/stylesheet" rel="nofollow noreferrer">StyleSheet</a>, <a href="https://facebook.github.io/react-native/docs/0.56/view-style-props" rel="nofollow noreferrer">View Style Props</a>, <a href="https://facebook.github.io/react-native/docs/0.56/text-style-props" rel="nofollow noreferrer">Text Style Props</a>, <a href="https://facebook.github.io/react-native/docs/0.56/image-style-props" rel="nofollow noreferrer">Image Style Props</a></p><h3>2.2 js</h3><p><code>react-native</code> &#x7684; <code>js</code> &#x4E0E; <code>web</code> &#x7684; <code>js</code> &#x90FD;&#x662F; <code>javascript</code>&#xFF0C;&#x8FD9;&#x70B9;&#x6CA1;&#x533A;&#x522B;&#xFF1B;&#x4F46; <code>react-native</code> &#x7684; <code>js</code> &#x53EA;&#x662F;&#x7EAF; <code>js</code>&#xFF0C;&#x5E76;&#x4E0D;&#x8FD0;&#x884C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;&#x4E2D;&#xFF0C;&#x4E5F;&#x5C31;&#x6CA1;&#x6709; DOM&#xFF0C;&#x4E00;&#x5207;&#x4E0E; DOM &#x76F8;&#x5173;&#x7684;&#x8BED;&#x6CD5;&#x90FD;&#x4E0D;&#x53EF;&#x7528;&#xFF0C;&#x5982; <code>window, document</code> &#x7B49;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x5728; <code>web</code> &#x7AEF;&#x7684;&#x7EAF; <code>js</code> &#x5E93;&#xFF08;&#x65E0; DOM&#xFF09;&#x5728; <code>react-native</code> &#x4E2D;&#x540C;&#x6837;&#x9002;&#x7528;&#xFF0C;&#x5982; <a href="https://github.com/reduxjs/redux" rel="nofollow noreferrer">redux</a>, <a href="https://github.com/lodash/lodash" rel="nofollow noreferrer">lodash</a>, <a href="https://github.com/facebook/immutable-js" rel="nofollow noreferrer">immutable-js</a> &#x7B49;&#x3002;</p><p><code>react-native</code> &#x7684; <code>js</code> &#x5206;&#x4E3A;&#x7EC4;&#x4EF6;&#x548C;&#x63A5;&#x53E3;&#x3002;</p><p>&#x7EC4;&#x4EF6;&#x662F;&#x7531; <code>react-native</code> &#x5B9A;&#x4E49;&#x597D;&#x7684;&#x57FA;&#x7840;&#x5BB9;&#x5668;&#xFF0C;&#x5C31;&#x50CF; <code>html</code> &#x7684;&#x6807;&#x7B7E;&#x4E00;&#x6837;&#xFF0C;&#x5982; <code>View, Text, Image, WebView</code> &#x7B49;&#x3002;</p><p>&#x63A5;&#x53E3;&#x662F; <code>react-native</code> &#x5C01;&#x88C5;&#x597D;&#x7684;&#x539F;&#x751F; APP &#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5982;&#x76F8;&#x673A;&#x3001;&#x5B58;&#x50A8;&#x3001;&#x7CFB;&#x7EDF;&#x4FE1;&#x606F;&#x7B49;&#x3002;</p><h2>3. &#x51B3;&#x5B9A;&#x662F;&#x5426;&#x4F7F;&#x7528; <code>react-native</code></h2><p>&#x5C3D;&#x7BA1; <code>react-native</code> &#x63D0;&#x4F9B;&#x4E86;&#x4F7F;&#x7528; <code>js</code> &#x548C;&#x524D;&#x7AEF;&#x6280;&#x672F;&#x5199;&#x539F;&#x751F; APP &#x7684;&#x5F3A;&#x5927;&#x529F;&#x80FD;&#xFF0C;&#x4F46;&#x5E76;&#x4E0D;&#x662F;&#x8BF4;&#x5C31;&#x53EF;&#x4EE5;&#x7528; <code>react-native</code> &#x4EE3;&#x66FF; <code>java, kotlin</code> &#x5199; <code>android</code> APP&#x3001;<code>objective-c, swift</code> &#x5199; <code>ios</code> APP &#x4E86;&#xFF0C;&#x5B83;&#x53EA;&#x662F;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x9009;&#x62E9;&#x3002;</p><p>&#x5176;&#x5B9E;&#xFF0C;&#x4ECE;&#x4E0A;&#x9762;&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x4E2D;&#xFF0C;&#x57FA;&#x672C;&#x4E0A;&#x53EF;&#x4EE5;&#x770B;&#x51FA; <code>react-native</code> APP &#x662F;&#x6709;&#x5F88;&#x660E;&#x663E;&#x7684;&#x52A3;&#x52BF;&#x7684;&#xFF1A;</p><ul><li>&#x6027;&#x80FD;&#x4E0D;&#x53CA;&#x539F;&#x751F;&#x7684; APP</li><li>&#x81EA;&#x7531;&#x5EA6;&#x4E5F;&#x4E0D;&#x53CA;&#x539F;&#x6765;&#x7684; APP&#xFF0C;&#x56E0;&#x4E3A;&#x88AB;&#x7EA6;&#x675F;&#x7684; <code>react-native</code> &#x6A21;&#x5F0F;&#x4E2D;</li><li><code>apk, ipa</code> &#x6587;&#x4EF6;&#x53D8;&#x5927;&#x4E86;</li></ul><p>&#x4F46; <code>react-native</code> &#x4E5F;&#x6709;&#x5F88;&#x5F3A;&#x5927;&#x7684;&#x4F18;&#x52BF;&#xFF1A;</p><ul><li>&#x5F00;&#x53D1;&#x7B80;&#x5355;&#x3001;&#x5FEB;&#x901F;&#xFF0C;&#x5165;&#x95E8;&#x574E;&#x6BD4;&#x8F83;&#x4F4E;</li><li>&#x8DE8;&#x5E73;&#x53F0;&#xFF0C;&#x4E00;&#x5957;&#x4EE3;&#x7801;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x591A;&#x4E2A;&#x5E73;&#x53F0;&#x4E0A;&#x8FD0;&#x884C;</li></ul><p>&#x6240;&#x4EE5;&#xFF0C;&#x4E00;&#x79CD;&#x4E0D;&#x9519;&#x7684;&#x9009;&#x62E9;&#x662F;&#xFF1A;</p><ol><li>&#x5982;&#x679C;&#x8FFD;&#x6C42;&#x5B8C;&#x7F8E;&#x6027;&#x80FD;&#x548C;&#x4F53;&#x9A8C;&#x7684; APP&#xFF0C;&#x7528;&#x539F;&#x751F;&#x7684;&#x65B9;&#x5F0F;&#xFF08;<code>androi: java, kotlin</code>, <code>ios: objective-c, swift</code>&#xFF09;&#x5F00;&#x53D1;</li><li>&#x5BF9;&#x6027;&#x80FD;&#x548C;&#x4F53;&#x9A8C;&#x4E0D;&#x654F;&#x611F;&#xFF0C;&#x4F46;&#x5BF9;&#x4EBA;&#x529B;&#x6210;&#x672C;&#x654F;&#x611F;&#xFF0C;&#x5E76;&#x4E14;&#x9700;&#x8981;&#x5FEB;&#x901F;&#x5F00;&#x53D1;&#x7684;&#xFF0C;&#x7528; <code>react-native</code> &#x5F00;&#x53D1;</li><li>&#x4E24;&#x8005;&#x53EF;&#x4EE5;&#x6DF7;&#x5408;&#x5F00;&#x53D1;&#xFF0C;&#x5BF9;&#x6027;&#x80FD;&#x548C;&#x4F53;&#x9A8C;&#x654F;&#x611F;&#x7684;&#x7528;&#x539F;&#x751F;&#x7684;&#x65B9;&#x5F0F;&#x5F00;&#x53D1;&#xFF0C;&#x5BF9;&#x4EBA;&#x529B;&#x6210;&#x672C;&#x548C;&#x65F6;&#x95F4;&#x6210;&#x672C;&#x654F;&#x611F;&#x7684;&#x7528; <code>react-native</code> &#x5F00;&#x53D1;</li></ol><h2>4. &#x51B3;&#x5B9A;&#x4F7F;&#x7528;&#x4F55;&#x79CD;&#x6784;&#x5EFA;&#x65B9;&#x5F0F;</h2><p>&#x76EE;&#x524D; <code>react-native</code> APP &#x7684;&#x6784;&#x5EFA;&#x65B9;&#x5F0F;&#x6709;&#x4E24;&#x79CD;&#xFF1A;</p><ol><li>&#x4F7F;&#x7528; Android Studio &#x6216; Xcode &#x5F00;&#x53D1;</li><li>&#x4F7F;&#x7528; <a href="https://expo.io/" rel="nofollow noreferrer">expo</a> &#x65B9;&#x5F0F;&#x5F00;&#x53D1;</li></ol><h3>4.1 &#x4F7F;&#x7528; Android Studio &#x6216; Xcode &#x5F00;&#x53D1;</h3><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x662F;&#x76EE;&#x524D;&#x4F7F;&#x7528;&#x6BD4;&#x8F83;&#x591A;&#x7684;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x4E0D;&#x7BA1;&#x662F;&#x7EAF; <code>react-native</code> APP &#x8FD8;&#x662F;&#x6DF7;&#x5408;&#x578B; APP&#xFF08;&#x539F;&#x751F;&#x4E0E; <code>react-native</code> &#x6DF7;&#x5408;&#x5F00;&#x53D1;&#xFF09;&#xFF0C;&#x90FD;&#x662F;&#x9002;&#x7528;&#x7684;&#x3002;</p><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x7684;&#x597D;&#x5904;&#x662F;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x539F;&#x751F;&#x5F00;&#x53D1;&#x3001;&#x81EA;&#x5B9A;&#x4E49;&#x6253;&#x5305;&#xFF0C;&#x4F46;&#x5BF9;&#x5927;&#x90E8;&#x5206;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x6765;&#x8BF4;&#xFF0C;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5BF9;&#x73AF;&#x5883;&#x7684;&#x8981;&#x6C42;&#x6BD4;&#x8F83;&#x9AD8;&#xFF0C;&#x9700;&#x8981; Android Studio &#x6216; Xcode&#xFF0C;&#x5E76;&#x4E14;&#x914D;&#x7F6E;&#x590D;&#x6742;&#xFF0C;&#x5165;&#x95E8;&#x574E;&#x5F88;&#x9AD8;&#x3002;</p><h4>&#x521D;&#x59CB;&#x5316;</h4><pre><code># &#x5B89;&#x88C5; react-native-cli
npm install -g react-native-cli

# &#x65B0;&#x5EFA;&#x9879;&#x76EE;
react-native init demo

# &#x5207;&#x6362;&#x5230;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;
cd demo</code></pre><h4>&#x5F00;&#x53D1;</h4><pre><code># &#x5F00;&#x542F;&#x672C;&#x5730; `js` UI &#x8FDB;&#x7A0B;&#x670D;&#x52A1;&#xFF08;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#xFF09;
npm run start

# &#x8FD0;&#x884C; ios &#x7A0B;&#x5E8F;
react-native run-ios

# &#x8FD0;&#x884C; android &#x7A0B;&#x5E8F;
react-native run-android</code></pre><h4>&#x6253;&#x5305; <code>apk, ipa</code></h4><pre><code># &#x6253;&#x5305; android APP &#x6240;&#x9700;&#x7684; js bundle &#x6587;&#x4EF6;
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ 

# &#x6253;&#x5305; apk
# &#x6309;&#x7167;&#x6B63;&#x5E38;&#x7684; android &#x6253;&#x5305;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;


# &#x6253;&#x5305; ios APP &#x6240;&#x9700;&#x7684; js bundle &#x6587;&#x4EF6;
react-native bundle --platform ios --dev false --entry-file index.js --bundle-output ios/bundle/index.ios.jsbundle --assets-dest ios/bundle

# &#x6253;&#x5305; ipa
# &#x6309;&#x7167;&#x6B63;&#x5E38;&#x7684; ios &#x6253;&#x5305;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;</code></pre><h3>4.2 &#x4F7F;&#x7528; <a href="https://expo.io/" rel="nofollow noreferrer">expo</a> &#x65B9;&#x5F0F;&#x5F00;&#x53D1;</h3><p><a href="https://expo.io/" rel="nofollow noreferrer">expo</a> &#x662F; facebook &#x4E0E; expo &#x5408;&#x4F5C;&#x4E13;&#x95E8;&#x4E3A; <code>react-native</code> &#x5F00;&#x53D1;&#x7684;&#x4E00;&#x5957;&#x5DE5;&#x5177;&#xFF0C;&#x5B83;&#x8BA9; <code>react-native</code> &#x5F00;&#x53D1;&#x4ECE; Android Studio &#x548C; Xcode &#x4E2D;&#x89E3;&#x653E;&#x51FA;&#x6765;&#xFF0C;&#x4F7F;&#x5F00;&#x53D1;&#x8005;&#x53EA;&#x5173;&#x6CE8; <code>react-native</code> &#x5F00;&#x53D1;&#x90E8;&#x5206;&#xFF0C;&#x800C;&#x4E0D;&#x7406;&#x4F1A;&#x590D;&#x6742;&#x7684;&#x539F;&#x751F;&#x5F00;&#x53D1;&#x3002;</p><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x662F;&#x76EE;&#x524D;&#x7EAF; <code>react-native</code> APP &#x5F00;&#x53D1;&#x7684;&#x63A8;&#x8350;&#x65B9;&#x5F0F;&#x3002;</p><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x7684;&#x597D;&#x5904;&#x662F;&#x4E0D;&#x9700;&#x8981; Android Studio &#x6216; Xcode&#xFF08;&#x5305;&#x62EC;&#x5F00;&#x53D1;&#x548C;&#x6253;&#x5305;&#xFF09;&#xFF0C;&#x5BF9;&#x73AF;&#x5883;&#x7684;&#x8981;&#x6C42;&#x4F4E;&#xFF0C;&#x914D;&#x7F6E;&#x7B80;&#x5355;&#xFF0C;&#x5165;&#x95E8;&#x574E;&#x4F4E;&#xFF0C;&#x4F46;&#x4E0D;&#x80FD;&#x8FDB;&#x884C;&#x539F;&#x751F;&#x5F00;&#x53D1;&#x3001;&#x81EA;&#x5B9A;&#x4E49;&#x6253;&#x5305;&#x3002;</p><h4>&#x521D;&#x59CB;&#x5316;</h4><pre><code># &#x5B89;&#x88C5; create-react-native-app
npm install -g create-react-native-app

# &#x65B0;&#x5EFA;&#x9879;&#x76EE;
create-react-native-app demo

# &#x5207;&#x6362;&#x5230;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;
cd demo</code></pre><p>&#x6216;&#x8005;</p><pre><code># &#x5B89;&#x88C5; expo
npm install -g expo-cli

# &#x65B0;&#x5EFA;&#x9879;&#x76EE;
expo init

# &#x5207;&#x6362;&#x5230;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;
cd demo</code></pre><h4>&#x5F00;&#x53D1;</h4><pre><code># &#x8FD0;&#x884C; ios &#x7A0B;&#x5E8F;
npm run ios

# &#x8FD0;&#x884C; android &#x7A0B;&#x5E8F;
npm run android</code></pre><p>&#x6216;&#x8005;</p><pre><code># &#x624B;&#x673A;&#x4E0A;&#x5B89;&#x88C5; expo &#x5BA2;&#x6237;&#x7AEF;

# &#x5F00;&#x542F;&#x672C;&#x5730; `js` UI &#x8FDB;&#x7A0B;&#x670D;&#x52A1;&#xFF08;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#xFF09;
expo start

# &#x8FD0;&#x884C; ios &#x7A0B;&#x5E8F;
# &#x7528; expo &#x5BA2;&#x6237;&#x7AEF;&#x626B;&#x63CF;&#x4E8C;&#x7EF4;&#x7801;

# &#x8FD0;&#x884C; android &#x7A0B;&#x5E8F;
# &#x7528; expo &#x5BA2;&#x6237;&#x7AEF;&#x626B;&#x63CF;&#x4E8C;&#x7EF4;&#x7801;</code></pre><h4>&#x6253;&#x5305; <code>apk, ipa</code></h4><pre><code># &#x6253;&#x5305; apk
expo build:android

# &#x6253;&#x5305; ipa
expo build:ios</code></pre><h4>&#x53EF;&#x80FD;&#x9047;&#x5230;&#x7684;&#x95EE;&#x9898;</h4><ol><li>&#x5982;&#x679C;&#x6784;&#x5EFA;&#x51FA;&#x9519;&#xFF0C;&#x5C1D;&#x8BD5;&#x5220;&#x9664;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x7684; <code>.expo</code> &#x6587;&#x4EF6;&#x5939;&#x4E4B;&#x540E;&#xFF0C;&#x518D;&#x8BD5;</li><li><code>Packager is not running at ...</code>: &#x5C1D;&#x8BD5;&#x91CD;&#x65B0;&#x6253;&#x5F00;&#x4E00;&#x4E2A;&#x7EC8;&#x7AEF;&#xFF0C;&#x5E76;&#x5C1D;&#x8BD5;&#x5220;&#x9664;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x7684; <code>.expo</code> &#x6587;&#x4EF6;&#x5939;&#x4E4B;&#x540E;&#xFF0C;&#x518D;&#x8BD5;</li></ol><h2>5. &#x9009;&#x62E9;&#x5408;&#x9002;&#x7684;&#x7EC4;&#x4EF6;&#x5E93;</h2><ul><li><a href="https://github.com/react-navigation/react-navigation" rel="nofollow noreferrer">react-navigation</a>: &#x5E94;&#x7528;&#x5BFC;&#x822A;&#x7EC4;&#x4EF6;</li><li><a href="https://github.com/react-native-training/react-native-elements" rel="nofollow noreferrer">react-native-elements</a>: UI &#x7EC4;&#x4EF6;&#x5E93;</li><li><a href="https://github.com/GeekyAnts/NativeBase" rel="nofollow noreferrer">NativeBase</a>: UI &#x7EC4;&#x4EF6;&#x5E93;</li><li><a href="https://github.com/oblador/react-native-vector-icons" rel="nofollow noreferrer">react-native-vector-icons</a>: &#x56FE;&#x6807;&#x5E93;</li><li><a href="https://github.com/leecade/react-native-swiper" rel="nofollow noreferrer">react-native-swiper</a>: swiper &#x7EC4;&#x4EF6;</li><li><a href="https://github.com/react-community/lottie-react-native" rel="nofollow noreferrer">lottie-react-native</a>: airbnb lottie &#x7EC4;&#x4EF6;</li><li><a href="https://github.com/oblador/react-native-animatable" rel="nofollow noreferrer">react-native-animatable</a>: &#x52A8;&#x753B;&#x7EC4;&#x4EF6;</li><li><a href="https://github.com/happypancake/react-native-scrollable-tab-view" rel="nofollow noreferrer">react-native-scrollable-tab-view</a>: tab &#x7EC4;&#x4EF6;</li></ul><h2>6. &#x9009;&#x62E9;&#x5408;&#x9002;&#x7684;&#x6A21;&#x677F;</h2><p>&#x4F7F;&#x7528; <code>react-native init</code> &#x6216; <code>create-react-native-app</code> &#x521D;&#x59CB;&#x5316;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x53EA;&#x662F;&#x642D;&#x5EFA;&#x597D;&#x4E86;&#x57FA;&#x7840;&#x7684;&#x9AA8;&#x67B6;&#xFF0C;&#x9879;&#x76EE;&#x7684;&#x5176;&#x4ED6;&#x90E8;&#x5206;&#x9700;&#x8981;&#x5F00;&#x53D1;&#x8005;&#x81EA;&#x5DF1;&#x53BB;&#x642D;&#x5EFA;&#xFF0C;&#x5982; <a href="https://github.com/storybooks/storybook" rel="nofollow noreferrer">storybook</a> &#x7EC4;&#x4EF6;&#x9884;&#x89C8;&#x3001;<a href="https://github.com/airbnb/enzyme" rel="nofollow noreferrer">enzyme</a> + <a href="https://github.com/facebook/jest" rel="nofollow noreferrer">jest</a> &#x6D4B;&#x8BD5;&#x3001;<a href="https://github.com/eslint/eslint" rel="nofollow noreferrer">eslint</a> + <a href="https://github.com/prettier/prettier" rel="nofollow noreferrer">prettier</a> &#x4EE3;&#x7801;&#x77EB;&#x6B63;&#x4E0E;&#x4F18;&#x5316;&#x7B49;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x9009;&#x62E9;&#x4E00;&#x4E2A;&#x5408;&#x9002;&#x7684;&#x3001;&#x5DF2;&#x7ECF;&#x642D;&#x5EFA;&#x597D;&#x5927;&#x90E8;&#x5206;&#x67B6;&#x5B50;&#x7684;&#x6A21;&#x677F;&#x5C31;&#x5F88;&#x53D7;&#x7528;&#x4E86;&#xFF1A;</p><ul><li><a href="https://github.com/infinitered/ignite" rel="nofollow noreferrer">ignite</a>: &#x5185;&#x7F6E;&#x4E86; <a href="https://github.com/reduxjs/redux" rel="nofollow noreferrer">redux</a>&#x3001;<a href="https://github.com/redux-saga/redux-saga" rel="nofollow noreferrer">redux-saga</a>&#x3001;<a href="https://github.com/storybooks/storybook" rel="nofollow noreferrer">storybook</a>&#x3001;<a href="https://github.com/airbnb/enzyme" rel="nofollow noreferrer">enzyme</a>&#x3001;<a href="https://github.com/facebook/jest" rel="nofollow noreferrer">jest</a>&#x3001;<a href="https://github.com/standard/standard" rel="nofollow noreferrer">standard</a></li><li><a href="https://github.com/bartonhammond/snowflake" rel="nofollow noreferrer">snowflake</a>: &#x5185;&#x7F6E;&#x4E86; <a href="https://github.com/reduxjs/redux" rel="nofollow noreferrer">redux</a>&#x3001;<a href="https://github.com/reduxjs/redux-thunk" rel="nofollow noreferrer">redux-thunk</a>&#x3001;<a href="https://github.com/facebook/jest" rel="nofollow noreferrer">jest</a>&#x3001;<a href="https://github.com/eslint/eslint" rel="nofollow noreferrer">eslint</a></li><li><a href="https://github.com/futurice/pepperoni-app-kit" rel="nofollow noreferrer">pepperoni-app-kit</a>: &#x7528;&#x7684;&#x4E0D;&#x591A;</li></ul><p>&#x4EE5; <a href="https://github.com/infinitered/ignite" rel="nofollow noreferrer">ignite</a> &#x4E3E;&#x4F8B;&#xFF1A;</p><pre><code># &#x5B89;&#x88C5; ignite-cli
npm install -g ignite-cli

# &#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;
ignite new demo

# &#x5207;&#x6362;&#x76EE;&#x5F55;
cd demo

# &#x73B0;&#x5728;&#x5C31;&#x53EF;&#x4EE5;&#x5BF9;&#x9879;&#x76EE;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x4E86;&#xFF0C;&#x5982;&#x6DFB;&#x52A0; screen&#xFF0C;&#x8FD0;&#x884C;&#x7A0B;&#x5E8F;&#x7B49;

# &#x8FD0;&#x884C; storybook &#x7EC4;&#x4EF6;&#x9884;&#x89C8;
npm run storybook

# &#x5F00;&#x542F;&#x672C;&#x5730; `js` UI &#x8FDB;&#x7A0B;&#x670D;&#x52A1;&#xFF08;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#xFF09;
npm run start

# android &#x6253;&#x5305;
npm run android:build

# ios &#x6253;&#x5305;&#x9700;&#x8981;&#x7528; Xcode</code></pre><h2>7. &#x5F00;&#x53D1;&#x5E94;&#x7528;</h2><p>&#x9664;&#x4E86; <code>style</code> &#x4E0E; <code>css</code> &#x7684;&#x533A;&#x522B;&#x548C; <code>js</code> &#x65E0; <code>DOM</code> &#x5916;&#xFF0C;&#x5176;&#x4ED6;&#x4E0E;&#x5F00;&#x53D1; <code>web</code> &#x9879;&#x76EE;&#x4E00;&#x81F4;&#x3002;</p><h2>8. &#x5E94;&#x7528;&#x5B9E;&#x4F8B;</h2><p><a href="https://github.com/senntyou/diary" rel="nofollow noreferrer">diary</a> &#x4FBF;&#x662F;&#x4F7F;&#x7528; <a href="https://expo.io/" rel="nofollow noreferrer">expo</a> &#x5F00;&#x53D1;&#x7684;&#x4E00;&#x4E2A;&#x65E5;&#x8BB0; APP&#x3002;</p><h2>9. &#x540E;&#x7EED;</h2><p>&#x66F4;&#x591A;&#x535A;&#x5BA2;&#xFF0C;&#x67E5;&#x770B; <a href="https://github.com/senntyou/blogs" rel="nofollow noreferrer">https://github.com/senntyou/blogs</a></p><p>&#x4F5C;&#x8005;&#xFF1A;<a href="https://github.com/senntyou" rel="nofollow noreferrer">&#x6DF1;&#x4E88;&#x4E4B; (@senntyou)</a></p><p>&#x7248;&#x6743;&#x58F0;&#x660E;&#xFF1A;&#x81EA;&#x7531;&#x8F6C;&#x8F7D;-&#x975E;&#x5546;&#x7528;-&#x975E;&#x884D;&#x751F;-&#x4FDD;&#x6301;&#x7F72;&#x540D;&#xFF08;<a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" rel="nofollow noreferrer">&#x521B;&#x610F;&#x5171;&#x4EAB;3.0&#x8BB8;&#x53EF;&#x8BC1;</a>&#xFF09;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 1 到完美，用 js 和 react-native 写一个 APP

## 原文链接
[https://segmentfault.com/a/1190000016272845](https://segmentfault.com/a/1190000016272845)

