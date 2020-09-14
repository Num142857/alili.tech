---
title: 'react-native踩坑记录' 
date: 2018-11-26 2:30:09
hidden: true
slug: koz60sum0k
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x952E;&#x76D8;&#x906E;&#x6321;</h2><h3 id="articleHeader1">&#x63CF;&#x8FF0;</h3><p>ios&#x9760;&#x8FD1;&#x624B;&#x673A;&#x5C4F;&#x5E55;&#x4E0B;&#x65B9;&#x7684;&#x8F93;&#x5165;&#x6846;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x65F6;&#xFF0C;&#x952E;&#x76D8;&#x5F39;&#x51FA;&#xFF0C;&#x4F46;&#x662F;&#x8F93;&#x5165;&#x6846;&#x5E76;&#x6CA1;&#x6709;&#x5F80;&#x4E0A;&#x79FB;&#x3002;&#x610F;&#x5473;&#x7740;&#x6BD4;&#x952E;&#x76D8;&#x4F4E;&#x7684;&#x5185;&#x5BB9;&#x90FD;&#x4F1A;&#x88AB;&#x906E;&#x6321;&#xFF0C;&#x800C;&#x4E14;&#x4F60;&#x6CA1;&#x529E;&#x6CD5;&#x624B;&#x52A8;&#x5F80;&#x4E0A;&#x79FB;&#x3002;&#x7ED3;&#x679C;&#x5C31;&#x662F;&#x5728;&#x952E;&#x76D8;&#x6D88;&#x5931;&#x4E4B;&#x524D;&#xFF0C;&#x4F60;&#x6839;&#x672C;&#x770B;&#x4E0D;&#x5230;&#x81EA;&#x5DF1;&#x8F93;&#x5165;&#x4E86;&#x4EC0;&#x4E48;&#x9B3C;&#x5185;&#x5BB9;&#x3002;</p><h3 id="articleHeader2">&#x89E3;&#x51B3;</h3><p>&#x4F7F;&#x7528;&#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install react-native-keyboard-aware-scroll-view --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install react-native-keyboard-aware-scroll-view --save</code></pre><p>&#x4EE3;&#x66FF;&#x539F;&#x6765;&#x7684;ScrollView&#x7EC4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// import {ScrollView} from &apos;react-native&apos;;
import {KeyboardAwareScrollView} from &apos;react-native-keyboard-aware-scroll-view&apos;;

class App extends Component {
  render() {
    return (
      &lt;KeyboardAwareScrollView&gt;
        &lt;TextInput /&gt;
      &lt;/KeyboardAwareScrollView&gt;
    );
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// import {ScrollView} from &apos;react-native&apos;;</span>
<span class="hljs-keyword">import</span> {KeyboardAwareScrollView} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-native-keyboard-aware-scroll-view&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">KeyboardAwareScrollView</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">TextInput</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">KeyboardAwareScrollView</span>&gt;</span></span>
    );
  }
}</code></pre><p>&#x5B8C;&#x7F8E;&#x89E3;&#x51B3;&#x3002;&#x66F4;&#x591A;&#x9AD8;&#x7EA7;&#x7528;&#x6CD5;&#x8BF7;<a href="https://github.com/APSL/react-native-keyboard-aware-scroll-view" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x8FD9;&#x91CC;</a>&#x770B;github&#x3002;</p><h2 id="articleHeader3">&#x6587;&#x5B57;&#x4E0D;&#x7EDF;&#x4E00;</h2><h3 id="articleHeader4">&#x63CF;&#x8FF0;</h3><p>&#x5982;&#x679C;&#x76F4;&#x63A5;&#x4F7F;&#x7528;<code>&lt;Text&gt;&#x539F;&#x7F6A;&lt;/Text&gt;</code>&#x6E32;&#x67D3;&#x6587;&#x5B57;&#xFF0C;&#x90A3;&#x4E48;android&#x548C;ios&#x7684;&#x5B57;&#x4F53;&#x7C97;&#x7EC6;&#x548C;&#x989C;&#x8272;&#x662F;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x3002;ios&#x4E0B;&#x5B57;&#x4F53;&#x8F83;&#x7C97;&#x8F83;&#x9ED1;&#xFF0C;android&#x4E0B;&#x5B57;&#x4F53;&#x6BD4;&#x8F83;&#x6B63;&#x5E38;&#x3002;</p><h3 id="articleHeader5">&#x89E3;&#x51B3;</h3><p>&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x4E00;&#x4E2A;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const TextUI = ({style, children, ...props}) =&gt; {
  return (
    &lt;Text
      {...props}
      style={[
        {
          color: &apos;#555555&apos;,
          fontSize: 14,
          fontWeight: &apos;100&apos;,
        },
        style,
      ]}
    &gt;
      {children}
    &lt;/Text&gt;
  );
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> TextUI = <span class="hljs-function">(<span class="hljs-params">{style, children, ...props}</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Text</span>
      {<span class="hljs-attr">...props</span>}
      <span class="hljs-attr">style</span>=<span class="hljs-string">{[</span>
        {
          <span class="hljs-attr">color:</span> &apos;#<span class="hljs-attr">555555</span>&apos;,
          <span class="hljs-attr">fontSize:</span> <span class="hljs-attr">14</span>,
          <span class="hljs-attr">fontWeight:</span> &apos;<span class="hljs-attr">100</span>&apos;,
        },
        <span class="hljs-attr">style</span>,
      ]}
    &gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span></span>
  );
};
</code></pre><p>&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x65F6;&#xFF0C;&#x6709;&#x627E;&#x8FC7;&#x6587;&#x732E;&#xFF0C;&#x6709;&#x7684;&#x662F;&#x6269;&#x5C55;<code>Text.prototype.render</code>&#x6765;&#x6DFB;&#x52A0;style&#xFF0C;<a href="https://reactnative.cn/blog.html" rel="nofollow noreferrer" target="_blank">&#x4F20;&#x9001;&#x95E8;</a>&#x3002;&#x4F46;&#x662F;&#x7B14;&#x8005;&#x5C1D;&#x8BD5;&#x65F6;&#xFF0C;android&#x673A;&#x662F;&#x76F4;&#x63A5;&#x62A5;&#x9519;&#x4E86;&#xFF0C;ios&#x53EF;&#x7528;&#x3002;&#x7B14;&#x8005;RN&#x7248;&#x672C;&#xFF1A;<strong>0.55.4</strong></p><h2 id="articleHeader6">ios&#x6A21;&#x62DF;&#x5668;&#x52A8;&#x753B;</h2><h3 id="articleHeader7">&#x63CF;&#x8FF0;</h3><p>&#x521A;&#x521D;&#x59CB;&#x5316;&#x7684;iphone&#x6A21;&#x62DF;&#x5668;&#xFF0C;&#x5F53;&#x4F60;&#x5F39;&#x4E00;&#x4E2A;alert&#x51FA;&#x6765;&#xFF0C;&#x4F30;&#x8BA1;&#x662F;&#x6162;&#x7684;&#x4E0D;&#x8981;&#x4E0D;&#x8981;&#x7684;&#x3002;&#x91CD;&#x70B9;&#x5F39;&#x51FA;&#x6765;&#x540E;&#xFF0C;&#x70B9;&#x51FB;&#x786E;&#x5B9A;&#x6309;&#x94AE;&#x8FD8;&#x4E0D;&#x4E00;&#x5B9A;&#x4F1A;&#x54CD;&#x5E94;(T_T)&#xFF0C;&#x4F60;&#x8981;&#x7B49;&#x4E2A;&#x51E0;&#x5341;&#x79D2;&#x624D;&#x6709;&#x53CD;&#x5E94;&#x3002;&#x5F88;&#x663E;&#x7136;&#xFF0C;&#x8FD9;&#x5DF2;&#x7ECF;&#x5F71;&#x54CD;&#x5230;&#x5404;&#x4F4D;&#x770B;&#x5B98;&#x7684;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x4E86;&#x3002;</p><h3 id="articleHeader8">&#x89E3;&#x51B3;</h3><p>&#x6A21;&#x62DF;&#x5668;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x9876;&#x90E8;&#x72B6;&#x6001;&#x680F;&#x4E2D;&#x627E;&#x5230; <strong>Debug -&gt; showAnimations</strong> &#x7684;&#x52FE;&#x9009;&#x53D6;&#x6D88;&#x6389;&#x5373;&#x53EF;&#x3002;</p><h2 id="articleHeader9">ios&#x4E0A;&#x4F20;&#x5230;appStore&#x5931;&#x8D25;</h2><h3 id="articleHeader10">&#x63CF;&#x8FF0;</h3><p>&#x5C31;&#x662F;&#x4E0A;&#x4F20;&#x4E00;&#x76F4;&#x5361;&#x5728;&#x90A3;&#x8FB9;&#x4E0D;&#x52A8;&#xFF0C;&#x6700;&#x540E;&#x4E5F;&#x4E0D;&#x6210;&#x529F;</p><h3 id="articleHeader11">&#x89E3;&#x51B3;</h3><p>&#x5220;&#x9664;&#x4E34;&#x65F6;&#x76EE;&#x5F55;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mv ~/.itmstransporter/ ~/.old_itmstransporter/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">mv ~/.itmstransporter/ ~/.old_itmstransporter/</code></pre><hr><p>&#x672A;&#x5B8C;&#x5F85;&#x7EED;...</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react-native踩坑记录

## 原文链接
[https://segmentfault.com/a/1190000015402712](https://segmentfault.com/a/1190000015402712)

