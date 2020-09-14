---
title: 'vue 实现数字滚动增加效果' 
date: 2018-11-24 2:30:10
hidden: true
slug: 6n6865e08mx
categories: [reprint]
---

{{< raw >}}
<p>&#x9879;&#x76EE;&#x4E2D;&#x9700;&#x8981;&#x505A;&#x6570;&#x5B57;&#x6EDA;&#x52A8;&#x589E;&#x52A0;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x4E00;&#x5F00;&#x59CB;&#x5F88;&#x61F5;&#xFF0C;&#x7814;&#x7A76;&#x4E86;&#x4E00;&#x4E0B;&#x539F;&#x7406;&#xFF0C;&#x53D1;&#x73B0;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x8D34;&#x51FA;&#x6765;&#x5206;&#x4EAB;&#x4E00;&#x4E0B; ^_^</p><p>&#x6570;&#x5B57;&#x6EDA;&#x52A8;&#x7EC4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
&lt;div class=&quot;number-grow-warp&quot;&gt;
  &lt;span ref=&quot;numberGrow&quot; :data-time=&quot;time&quot; class=&quot;number-grow&quot; :data-value=&quot;value&quot;&gt;0&lt;/span&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  props: {
    time: {
      type: Number,
      default: 2
    },
    value: {
      type: Number,
      default: 720000
    }
  },
  methods: {
    numberGrow (ele) {
      let _this = this

      let step = (_this.value * 10) / (_this.time * 1000)
      let current = 0
      let start = 0
      let t = setInterval(function () {
        start += step
        if (start &gt; _this.value) {
          clearInterval(t)
          start = _this.value
          t = null
        }
        if (current === start) {
          return
        }
        current = start
        ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, &apos;$1,&apos;)
      }, 10)
    }
  },
  mounted () {
    this.numberGrow(this.$refs.numberGrow)
  }
}
&lt;/script&gt;

&lt;style&gt;
.number-grow-warp{
  transform: translateZ(0);
}
.number-grow {
  font-family: Arial-BoldMT;
  font-size: 64px;
  color: #ffaf00;
  letter-spacing: 2.67px;
  margin:110px 0 20px;
  display: block;
  line-height:64px;
}
&lt;/style&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;number-grow-warp&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;numberGrow&quot;</span> <span class="hljs-attr">:data-time</span>=<span class="hljs-string">&quot;time&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;number-grow&quot;</span> <span class="hljs-attr">:data-value</span>=<span class="hljs-string">&quot;value&quot;</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">time</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-number">2</span>
    },
    <span class="hljs-attr">value</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-number">720000</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    numberGrow (ele) {
      <span class="hljs-keyword">let</span> _this = <span class="hljs-keyword">this</span>

      <span class="hljs-keyword">let</span> step = (_this.value * <span class="hljs-number">10</span>) / (_this.time * <span class="hljs-number">1000</span>)
      <span class="hljs-keyword">let</span> current = <span class="hljs-number">0</span>
      <span class="hljs-keyword">let</span> start = <span class="hljs-number">0</span>
      <span class="hljs-keyword">let</span> t = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        start += step
        <span class="hljs-keyword">if</span> (start &gt; _this.value) {
          clearInterval(t)
          start = _this.value
          t = <span class="hljs-literal">null</span>
        }
        <span class="hljs-keyword">if</span> (current === start) {
          <span class="hljs-keyword">return</span>
        }
        current = start
        ele.innerHTML = current.toString().replace(<span class="hljs-regexp">/(\d)(?=(?:\d{3}[+]?)+$)/g</span>, <span class="hljs-string">&apos;$1,&apos;</span>)
      }, <span class="hljs-number">10</span>)
    }
  },
  mounted () {
    <span class="hljs-keyword">this</span>.numberGrow(<span class="hljs-keyword">this</span>.$refs.numberGrow)
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.number-grow-warp</span>{
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(0);
}
<span class="hljs-selector-class">.number-grow</span> {
  <span class="hljs-attribute">font-family</span>: Arial-BoldMT;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">64px</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#ffaf00</span>;
  <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">2.67px</span>;
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">110px</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">line-height</span>:<span class="hljs-number">64px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre><p>&#x8C03;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;NumberGrow :value=&quot;720000&quot;&gt;&lt;/NumberGrow&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elixir"><code style="word-break:break-word;white-space:initial">&lt;NumberGrow <span class="hljs-symbol">:value=<span class="hljs-string">&quot;720000&quot;</span>&gt;&lt;/NumberGrow&gt;</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 实现数字滚动增加效果

## 原文链接
[https://segmentfault.com/a/1190000015496498](https://segmentfault.com/a/1190000015496498)

