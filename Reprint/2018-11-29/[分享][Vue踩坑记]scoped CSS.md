---
title: '[分享][Vue踩坑记]scoped CSS' 
date: 2018-11-29 2:30:09
hidden: true
slug: oou2fi62gpj
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">what&apos;s scoped CSS ?</h2><p><code>&#x5F53; &lt;style&gt; &#x6807;&#x7B7E;&#x6709; scoped &#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x5B83;&#x7684; CSS &#x53EA;&#x4F5C;&#x7528;&#x4E8E;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x3002;</code></p><h2 id="articleHeader1">&#x573A;&#x666F;&#x4E00;:</h2><p><code>&#x5728; scoped CSS &#x4E0B; &#x6539;&#x4E0D;&#x52A8;&#x6837;&#x5F0F;!!!</code></p><p><strong>&#x4F8B;: (&#x6211;&#x4EEC;&#x5C1D;&#x8BD5;&#x4FEE;&#x6539; element-ui &#x7684; input &#x7EC4;&#x4EF6;&#x7684;&#x6837;&#x5F0F;&#x5E76;&#x53EA;&#x5728; app.vue &#x4E0B;&#x751F;&#x6548;)</strong></p><p><strong>ok...&#x62FF;&#x8D77;&#x952E;&#x76D8;...</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div id=&quot;app&quot;&gt;
    &lt;el-input  class=&quot;text-box&quot; v-model=&quot;text&quot;&gt;&lt;/el-input&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: &apos;App&apos;,
  data() {
    return {
      text: &apos;hello&apos;
    };
  }
};
&lt;/script&gt;

&lt;style lang=&quot;less&quot; scoped&gt;
.text-box {
   input {
    width: 166px;
    text-align: center;
  }
}
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-box&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;text&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

&lt;script&gt;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;App&apos;</span>,
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;hello&apos;</span>
    };
  }
};
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;style lang=<span class="hljs-string">&quot;less&quot;</span> scoped&gt;
.text-box {
   input {
    <span class="hljs-attr">width</span>: <span class="hljs-number">166</span>px;
    text-align: center;
  }
}
&lt;<span class="hljs-regexp">/style&gt;</span></code></pre><p><strong>&#x55D6;&#x55D6;&#x4E00;&#x987F;&#x6572;...</strong></p><p><strong>&#x6EE1;&#x6000;&#x671F;&#x5F85;&#x7684;&#x770B;&#x5411;&#x6D4F;&#x89C8;&#x5668;...</strong></p><p><strong>WC.. &#x6CA1;&#x6548;&#x679C;???</strong></p><h2 id="articleHeader2">&#x539F;&#x56E0;:</h2><p><code>&#x4F7F;&#x7528; scoped &#x540E;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6837;&#x5F0F;&#x5C06;&#x4E0D;&#x4F1A;&#x6E17;&#x900F;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x3002;</code></p><h2 id="articleHeader3">&#x89E3;&#x51B3;&#x65B9;&#x6CD5;:</h2><p><code>&#x4F7F;&#x7528;&#x6DF1;&#x5EA6;&#x4F5C;&#x7528;&#x9009;&#x62E9;&#x5668; /deep/</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div id=&quot;app&quot;&gt;
    &lt;el-input v-model=&quot;text&quot; class=&quot;text-box&quot;&gt;&lt;/el-input&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: &apos;App&apos;,
  data() {
    return {
      text: &apos;hello&apos;
    };
  }
};
&lt;/script&gt;

&lt;style lang=&quot;less&quot; scoped&gt;
.text-box {
  /deep/ input {
    width: 166px;
    text-align: center;
  }
}
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-box&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

&lt;script&gt;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;App&apos;</span>,
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;hello&apos;</span>
    };
  }
};
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;style lang=<span class="hljs-string">&quot;less&quot;</span> scoped&gt;
.text-box {
  /deep/ input {
    <span class="hljs-attr">width</span>: <span class="hljs-number">166</span>px;
    text-align: center;
  }
}
&lt;<span class="hljs-regexp">/style&gt;</span></code></pre><p><strong>&#x5927;&#x529F;&#x544A;&#x6210;</strong></p><h2 id="articleHeader4">&#x573A;&#x666F;&#x4E8C;:</h2><p><code>&#x52A8;&#x6001;&#x751F;&#x6210;&#x7684;DOM&#x7C7B;&#x540D;&#x6837;&#x5F0F;&#x4E0D;&#x4F5C;&#x7528;!</code></p><h2 id="articleHeader5">&#x89E3;&#x51B3;&#x65B9;&#x6CD5;:</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div id=&quot;app&quot;&gt;
    &lt;div v-html=&quot;text&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: &apos;App&apos;,
  data() {
    return {
      text: &apos;&lt;span class=&quot;red&quot;&gt;&#x7EA2;&#x8272;&lt;span&gt;&apos;
    };
  }
};
&lt;/script&gt;

&lt;style lang=&quot;less&quot; scoped&gt;
/deep/ .red {
  color: #f33;
}
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">&quot;text&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
export default {
  name: &apos;App&apos;,
  data() {
    return {
      text: &apos;&lt;span class=&quot;red&quot;&gt;&#x7EA2;&#x8272;&lt;span&gt;&apos;
    };
  }
};
&lt;/</span>script&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;less&quot;</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
/deep/ .red {
  color: #f33;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre><p><a href="https://vue-loader.vuejs.org/zh/guide/scoped-css.html" rel="nofollow noreferrer" target="_blank">&#x53C2;&#x8003;&#x6587;&#x6863;</a></p><p><strong>&#x4E4B;&#x540E;&#x4F1A;&#x6301;&#x7EED;&#x5206;&#x4EAB;&#x5728;Vue&#x4E2D;&#x9047;&#x5230;&#x7684;&#x4E00;&#x4E9B;&#x5751;&#x54C8;~</strong></p><p><strong>&#x5982;&#x679C;&#x6709;&#x5E2E;&#x52A9;&#x5230;&#x4F60;,&#x8BF7;&#x7ED9;&#x6211;</strong> <a href="https://github.com/webfansplz/vue-note/issues/4" rel="nofollow noreferrer" target="_blank">star</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[分享][Vue踩坑记]scoped CSS

## 原文链接
[https://segmentfault.com/a/1190000015226237](https://segmentfault.com/a/1190000015226237)

