---
title: 'vue antV G2-3.X组件化' 
date: 2018-11-25 2:30:07
hidden: true
slug: rmvuilbtqbk
categories: [reprint]
---

{{< raw >}}
<p>&#x4ECE;&#x7F51;&#x4E0A;&#x770B;&#x5230; &#x963F;&#x91CC;&#x7CFB;&#x7684;&#x56FE;&#x8868; <a href="https://antv.alipay.com/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">antv</a> &#x89C9;&#x5F97;&#x975E;&#x5E38;&#x4E0D;&#x9519;&#xFF0C;&#x5C31;&#x60F3;&#x6574;&#x5408;&#x5230;vue&#x4E2D;&#x4F7F;&#x7528;&#x3002;&#x53C2;&#x8003;&#x4E86;<a href="https://segmentfault.com/a/1190000008348488">Vuejs2.X&#x7EC4;&#x4EF6;&#x5316;-&#x963F;&#x91CC;&#x7684;G2&#x56FE;&#x8868;&#x7EC4;&#x4EF6;</a></p><p><strong>&#x5B89;&#x88C5;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install @antv/g2 --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">npm</span> install @antv/g2 --save</code></pre><p><strong>&#x521B;&#x5EFA;vue&#x7EC4;&#x4EF6; components/G2Line.vue</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div :id=&quot;id&quot;&gt;&lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import G2 from &apos;@antv/g2&apos;
export default {
  data () {
    return {
      chart: null
    }
  },
  props: {
    charData: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    id: String
  },
  // mounted () {
    // this.drawChart()
  // },
  // &#x76D1;&#x542C;API&#x63A5;&#x53E3;&#x4F20;&#x8FC7;&#x6765;&#x7684;&#x6570;&#x636E;  2018-08-21&#x66F4;&#x65B0;
  watch: {
    charData: function (val, oldVal) {    // &#x76D1;&#x542C;charData&#xFF0C;&#x5F53;&#x653E;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7ED8;&#x5236;&#x56FE;&#x8868;
      console.log(&apos;new: %s, old: %s&apos;, val, oldVal);
      this.drawChart(val);
    }
  },
  methods: {
    drawChart: function () {
      this.chart &amp;&amp; this.chart.destory()
      this.chart = new G2.Chart({
        container: this.id,
        width: 600,
        height: 300
      })
      this.chart.source(this.charData)
      this.chart.scale(&apos;value&apos;, {
        min: 0
      })
      this.chart.scale(&apos;year&apos;, {
        range: [0, 1]
      })
      this.chart.tooltip({
        crosshairs: {
          type: &apos;line&apos;
        }
      })
      this.chart.line().position(&apos;year*value&apos;)
      this.chart.point().position(&apos;year*value&apos;).size(4).shape(&apos;circle&apos;).style({
        stroke: &apos;#fff&apos;,
        lineWidth: 1
      })
      this.chart.render()
    }
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:id</span>=<span class="hljs-string">&quot;id&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> G2 <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@antv/g2&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">chart</span>: <span class="hljs-literal">null</span>
    }
  },
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">charData</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Array</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">data</span>: []
        }
      }
    },
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">String</span>
  },
  <span class="hljs-comment">// mounted () {</span>
    <span class="hljs-comment">// this.drawChart()</span>
  <span class="hljs-comment">// },</span>
  <span class="hljs-comment">// &#x76D1;&#x542C;API&#x63A5;&#x53E3;&#x4F20;&#x8FC7;&#x6765;&#x7684;&#x6570;&#x636E;  2018-08-21&#x66F4;&#x65B0;</span>
  watch: {
    <span class="hljs-attr">charData</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val, oldVal</span>) </span>{    <span class="hljs-comment">// &#x76D1;&#x542C;charData&#xFF0C;&#x5F53;&#x653E;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7ED8;&#x5236;&#x56FE;&#x8868;</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;new: %s, old: %s&apos;</span>, val, oldVal);
      <span class="hljs-keyword">this</span>.drawChart(val);
    }
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-attr">drawChart</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">this</span>.chart &amp;&amp; <span class="hljs-keyword">this</span>.chart.destory()
      <span class="hljs-keyword">this</span>.chart = <span class="hljs-keyword">new</span> G2.Chart({
        <span class="hljs-attr">container</span>: <span class="hljs-keyword">this</span>.id,
        <span class="hljs-attr">width</span>: <span class="hljs-number">600</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-number">300</span>
      })
      <span class="hljs-keyword">this</span>.chart.source(<span class="hljs-keyword">this</span>.charData)
      <span class="hljs-keyword">this</span>.chart.scale(<span class="hljs-string">&apos;value&apos;</span>, {
        <span class="hljs-attr">min</span>: <span class="hljs-number">0</span>
      })
      <span class="hljs-keyword">this</span>.chart.scale(<span class="hljs-string">&apos;year&apos;</span>, {
        <span class="hljs-attr">range</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>]
      })
      <span class="hljs-keyword">this</span>.chart.tooltip({
        <span class="hljs-attr">crosshairs</span>: {
          <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;line&apos;</span>
        }
      })
      <span class="hljs-keyword">this</span>.chart.line().position(<span class="hljs-string">&apos;year*value&apos;</span>)
      <span class="hljs-keyword">this</span>.chart.point().position(<span class="hljs-string">&apos;year*value&apos;</span>).size(<span class="hljs-number">4</span>).shape(<span class="hljs-string">&apos;circle&apos;</span>).style({
        <span class="hljs-attr">stroke</span>: <span class="hljs-string">&apos;#fff&apos;</span>,
        <span class="hljs-attr">lineWidth</span>: <span class="hljs-number">1</span>
      })
      <span class="hljs-keyword">this</span>.chart.render()
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p><strong>&#x4FEE;&#x6539;HelloWorld.vue &#x5F15;&#x7528;&#x7EC4;&#x4EF6;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    &lt;g2-line :charData=&quot;serverData&quot; :id=&quot;&apos;c1&apos;&quot;&gt;&lt;/g2-line&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import G2Line from &apos;./G2Line.vue&apos;
export default {
  components: {
    G2Line
  },
  data () {
    return {
      serverData: [{
        year: &apos;2010&apos;,
        value: 3
      }, {
        year: &apos;2011&apos;,
        value: 4
      }, {
        year: &apos;2012&apos;,
        value: 3.5
      }, {
        year: &apos;2013&apos;,
        value: 5
      }, {
        year: &apos;2014&apos;,
        value: 4.9
      }, {
        year: &apos;2015&apos;,
        value: 6
      }, {
        year: &apos;2016&apos;,
        value: 7
      }, {
        year: &apos;2017&apos;,
        value: 9
      }, {
        year: &apos;2018&apos;,
        value: 13
      }]
    }
  },
  methods: {
    // &#x6B64;&#x5904;&#x7701;&#x7565;&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x5E76;&#x4E14;&#x8D4B;&#x503C;&#x7ED9;this.serverData
    // &#x63A8;&#x8350;&#x4F7F;&#x7528;axios&#x8BF7;&#x6C42;&#x63A5;&#x53E3;
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">g2-line</span> <span class="hljs-attr">:charData</span>=<span class="hljs-string">&quot;serverData&quot;</span> <span class="hljs-attr">:id</span>=<span class="hljs-string">&quot;&apos;c1&apos;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">g2-line</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> G2Line <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./G2Line.vue&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    G2Line
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">serverData</span>: [{
        <span class="hljs-attr">year</span>: <span class="hljs-string">&apos;2010&apos;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-number">3</span>
      }, {
        <span class="hljs-attr">year</span>: <span class="hljs-string">&apos;2011&apos;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-number">4</span>
      }, {
        <span class="hljs-attr">year</span>: <span class="hljs-string">&apos;2012&apos;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-number">3.5</span>
      }, {
        <span class="hljs-attr">year</span>: <span class="hljs-string">&apos;2013&apos;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-number">5</span>
      }, {
        <span class="hljs-attr">year</span>: <span class="hljs-string">&apos;2014&apos;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-number">4.9</span>
      }, {
        <span class="hljs-attr">year</span>: <span class="hljs-string">&apos;2015&apos;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-number">6</span>
      }, {
        <span class="hljs-attr">year</span>: <span class="hljs-string">&apos;2016&apos;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-number">7</span>
      }, {
        <span class="hljs-attr">year</span>: <span class="hljs-string">&apos;2017&apos;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-number">9</span>
      }, {
        <span class="hljs-attr">year</span>: <span class="hljs-string">&apos;2018&apos;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-number">13</span>
      }]
    }
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">// &#x6B64;&#x5904;&#x7701;&#x7565;&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x5E76;&#x4E14;&#x8D4B;&#x503C;&#x7ED9;this.serverData</span>
    <span class="hljs-comment">// &#x63A8;&#x8350;&#x4F7F;&#x7528;axios&#x8BF7;&#x6C42;&#x63A5;&#x53E3;</span>
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p><strong>&#x6548;&#x679C;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbcX57?w=1216&amp;h=544" src="https://static.alili.tech/img/bVbcX57?w=1216&amp;h=544" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue antV G2-3.X组件化

## 原文链接
[https://segmentfault.com/a/1190000015444959](https://segmentfault.com/a/1190000015444959)

