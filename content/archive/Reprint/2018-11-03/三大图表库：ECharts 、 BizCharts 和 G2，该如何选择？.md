---
title: 三大图表库：ECharts 、 BizCharts 和 G2，该如何选择？
hidden: true
categories: reprint
slug: 3f1b4baf
date: 2018-11-03 02:30:13
---

{{< raw >}}
<p>&#x6700;&#x8FD1;&#x963F;&#x91CC;&#x6B63;&#x5F0F;&#x5F00;&#x6E90;&#x7684;BizCharts&#x56FE;&#x8868;&#x5E93;&#x57FA;&#x4E8E;React&#x6280;&#x672F;&#x6808;&#xFF0C;&#x5404;&#x4E2A;&#x56FE;&#x8868;&#x9879;&#x7686;&#x91C7;&#x7528;&#x4E86;&#x7EC4;&#x4EF6;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x8D34;&#x8FD1;React&#x7684;&#x4F7F;&#x7528;&#x7279;&#x70B9;&#x3002;&#x540C;&#x65F6;BizCharts&#x57FA;&#x4E8E;G2&#x8FDB;&#x884C;&#x5C01;&#x88C5;&#xFF0C;Bizcharts&#x4E5F;&#x7EE7;&#x627F;&#x4E86;G2&#x76F8;&#x5173;&#x7279;&#x6027;&#x3002;&#x516C;&#x53F8;&#x76EE;&#x524D;&#x7EDF;&#x4E00;&#x4F7F;&#x7528;&#x7684;&#x662F;ECharts&#x56FE;&#x8868;&#x5E93;&#xFF0C;&#x4E0B;&#x6587;&#x5C06;&#x5BF9;3&#x79CD;&#x56FE;&#x8868;&#x5E93;&#x8FDB;&#x884C;&#x5206;&#x6790;&#x6BD4;&#x5BF9;&#x3002;</p><h2 id="articleHeader0">BizCharts</h2><p>&#x6587;&#x6863;&#x5730;&#x5740;&#xFF1A;<a href="http://bizcharts.net/index" rel="nofollow noreferrer" target="_blank">BizCharts</a></p><h3 id="articleHeader1">&#x4E00;&#x3001;&#x5B89;&#x88C5;</h3><p>&#x901A;&#x8FC7; npm/yarn &#x5F15;&#x5165;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install bizcharts --save

yarn add bizcharts  --save

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>npm <span class="hljs-keyword">install </span><span class="hljs-keyword">bizcharts </span>--save

yarn <span class="hljs-keyword">add </span><span class="hljs-keyword">bizcharts </span> --save

</code></pre><h3 id="articleHeader2">&#x4E8C;&#x3001;&#x5F15;&#x7528;</h3><p>&#x6210;&#x529F;&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#xFF0C;&#x5373;&#x53EF;&#x4F7F;&#x7528; import &#x6216; require &#x8FDB;&#x884C;&#x5F15;&#x7528;&#x3002;</p><p>&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Chart, Geom, Axis, Tooltip, Legend } from &apos;bizcharts&apos;;
import chartConfig from &apos;./assets/js/chartConfig&apos;;

&lt;div className=&quot;App&quot;&gt;
    &lt;Chart width={600} height={400} data={chartConfig.chartData} scale={chartConfig.cols}&gt;
      &lt;Axis name=&quot;genre&quot; title={chartConfig.title}/&gt;
      &lt;Axis name=&quot;sold&quot; title={chartConfig.title}/&gt;
      &lt;Legend position=&quot;top&quot; dy={-20} /&gt;
      &lt;Tooltip /&gt;
      &lt;Geom type=&quot;interval&quot; position=&quot;genre*sold&quot; color=&quot;genre&quot; /&gt;
    &lt;/Chart&gt;
&lt;/div&gt;


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml">import </span><span class="hljs-template-variable">{ Chart, Geom, Axis, Tooltip, Legend }</span><span class="xml"> from &apos;bizcharts&apos;;
import chartConfig from &apos;./assets/js/chartConfig&apos;;

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;App&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> <span class="hljs-attr">width</span>=</span></span><span class="hljs-template-variable">{600}</span><span class="xml"><span class="hljs-tag"> <span class="hljs-attr">height</span>=</span></span><span class="hljs-template-variable">{400}</span><span class="xml"><span class="hljs-tag"> <span class="hljs-attr">data</span>=</span></span><span class="hljs-template-variable">{chartConfig.chartData}</span><span class="xml"><span class="hljs-tag"> <span class="hljs-attr">scale</span>=</span></span><span class="hljs-template-variable">{chartConfig.cols}</span><span class="xml"><span class="hljs-tag">&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Axis</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;genre&quot;</span> <span class="hljs-attr">title</span>=</span></span><span class="hljs-template-variable">{chartConfig.title}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Axis</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;sold&quot;</span> <span class="hljs-attr">title</span>=</span></span><span class="hljs-template-variable">{chartConfig.title}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Legend</span> <span class="hljs-attr">position</span>=<span class="hljs-string">&quot;top&quot;</span> <span class="hljs-attr">dy</span>=</span></span><span class="hljs-template-variable">{-20}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Tooltip</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Geom</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;interval&quot;</span> <span class="hljs-attr">position</span>=<span class="hljs-string">&quot;genre*sold&quot;</span> <span class="hljs-attr">color</span>=<span class="hljs-string">&quot;genre&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Chart</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


</span></code></pre><p>&#x8BE5;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;&#x56FE;&#x8868;&#x7684;&#x6570;&#x636E;&#x914D;&#x7F6E;&#x5355;&#x72EC;&#x5B58;&#x5165;&#x4E86;&#x5176;&#x4ED6;js&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x907F;&#x514D;&#x9875;&#x9762;&#x592A;&#x8FC7;&#x5197;&#x6742;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    chartData : [
        { genre: &apos;Sports&apos;, sold: 275, income: 2300 },
        { genre: &apos;Strategy&apos;, sold: 115, income: 667 },
        { genre: &apos;Action&apos;, sold: 120, income: 982 },
        { genre: &apos;Shooter&apos;, sold: 350, income: 5271 },
        { genre: &apos;Other&apos;, sold: 150, income: 3710 }
    ],
    // &#x5B9A;&#x4E49;&#x5EA6;&#x91CF;
    cols : {
        sold: { alias: &apos;&#x9500;&#x552E;&#x91CF;&apos; }, // &#x6570;&#x636E;&#x5B57;&#x6BB5;&#x522B;&#x540D;&#x6620;&#x5C04;
        genre: { alias: &apos;&#x6E38;&#x620F;&#x79CD;&#x7C7B;&apos; }
    },
    title : {
        autoRotate: true, // &#x662F;&#x5426;&#x9700;&#x8981;&#x81EA;&#x52A8;&#x65CB;&#x8F6C;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; true
        textStyle: {
          fontSize: &apos;12&apos;,
          textAlign: &apos;center&apos;,
          fill: &apos;#999&apos;,
          fontWeight: &apos;bold&apos;,
          rotate: 30
        }, // &#x5750;&#x6807;&#x8F74;&#x6587;&#x672C;&#x5C5E;&#x6027;&#x914D;&#x7F6E;
        position:&apos;center&apos;, // &#x6807;&#x9898;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;**&#x65B0;&#x589E;**
    }
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>module.exports = {
    <span class="hljs-string">chartData :</span> [
        { <span class="hljs-string">genre:</span> <span class="hljs-string">&apos;Sports&apos;</span>, <span class="hljs-string">sold:</span> <span class="hljs-number">275</span>, <span class="hljs-string">income:</span> <span class="hljs-number">2300</span> },
        { <span class="hljs-string">genre:</span> <span class="hljs-string">&apos;Strategy&apos;</span>, <span class="hljs-string">sold:</span> <span class="hljs-number">115</span>, <span class="hljs-string">income:</span> <span class="hljs-number">667</span> },
        { <span class="hljs-string">genre:</span> <span class="hljs-string">&apos;Action&apos;</span>, <span class="hljs-string">sold:</span> <span class="hljs-number">120</span>, <span class="hljs-string">income:</span> <span class="hljs-number">982</span> },
        { <span class="hljs-string">genre:</span> <span class="hljs-string">&apos;Shooter&apos;</span>, <span class="hljs-string">sold:</span> <span class="hljs-number">350</span>, <span class="hljs-string">income:</span> <span class="hljs-number">5271</span> },
        { <span class="hljs-string">genre:</span> <span class="hljs-string">&apos;Other&apos;</span>, <span class="hljs-string">sold:</span> <span class="hljs-number">150</span>, <span class="hljs-string">income:</span> <span class="hljs-number">3710</span> }
    ],
    <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x5EA6;&#x91CF;</span>
    <span class="hljs-string">cols :</span> {
<span class="hljs-symbol">        sold:</span> { <span class="hljs-string">alias:</span> <span class="hljs-string">&apos;&#x9500;&#x552E;&#x91CF;&apos;</span> }, <span class="hljs-comment">// &#x6570;&#x636E;&#x5B57;&#x6BB5;&#x522B;&#x540D;&#x6620;&#x5C04;</span>
<span class="hljs-symbol">        genre:</span> { <span class="hljs-string">alias:</span> <span class="hljs-string">&apos;&#x6E38;&#x620F;&#x79CD;&#x7C7B;&apos;</span> }
    },
    <span class="hljs-string">title :</span> {
<span class="hljs-symbol">        autoRotate:</span> <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x662F;&#x5426;&#x9700;&#x8981;&#x81EA;&#x52A8;&#x65CB;&#x8F6C;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; true</span>
<span class="hljs-symbol">        textStyle:</span> {
<span class="hljs-symbol">          fontSize:</span> <span class="hljs-string">&apos;12&apos;</span>,
<span class="hljs-symbol">          textAlign:</span> <span class="hljs-string">&apos;center&apos;</span>,
<span class="hljs-symbol">          fill:</span> <span class="hljs-string">&apos;#999&apos;</span>,
<span class="hljs-symbol">          fontWeight:</span> <span class="hljs-string">&apos;bold&apos;</span>,
<span class="hljs-symbol">          rotate:</span> <span class="hljs-number">30</span>
        }, <span class="hljs-comment">// &#x5750;&#x6807;&#x8F74;&#x6587;&#x672C;&#x5C5E;&#x6027;&#x914D;&#x7F6E;</span>
<span class="hljs-symbol">        position:</span><span class="hljs-string">&apos;center&apos;</span>, <span class="hljs-comment">// &#x6807;&#x9898;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;**&#x65B0;&#x589E;**</span>
    }
}

</code></pre><p>&#x6548;&#x679C;&#x9884;&#x89C8;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000016469962?w=673&amp;h=389" src="https://static.alili.tech/img/remote/1460000016469962?w=673&amp;h=389" alt="BizCharts&#x793A;&#x4F8B;" title="BizCharts&#x793A;&#x4F8B;" style="cursor:pointer"></span></p><h3 id="articleHeader3">&#x4E09;&#x3001;DataSet</h3><p>BizCharts&#x4E2D;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;dataset(&#x6570;&#x636E;&#x5904;&#x7406;&#x6A21;&#x5757;)&#x6765;&#x5BF9;&#x56FE;&#x6807;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x7EE7;&#x627F;&#x81EA;G2&#xFF0C;&#x5728;&#x4E0B;&#x6587;&#x4E2D;&#x5C06;&#x5BF9;&#x6B64;&#x8FDB;&#x884C;&#x8BE6;&#x7EC6;&#x5206;&#x6790;&#x3002;</p><p><a href="#Mark">&#x5FEB;&#x901F;&#x8DF3;&#x8F6C;</a></p><h2 id="articleHeader4">G2</h2><p>BizCharts&#x57FA;&#x4E8E;G2&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#xFF0C;&#x5728;&#x7814;&#x7A76;BizCharts&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x4E5F;&#x4E00;&#x8D77;&#x5BF9;G2&#x8FDB;&#x884C;&#x4E86;&#x5B9E;&#x8DF5;&#x3002;</p><h3 id="articleHeader5">&#x4E00;&#x3001;&#x5B89;&#x88C5;</h3><p>&#x548C;BizCharts&#x4E00;&#x6837;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; npm/yarn &#x5F15;&#x5165;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install @antv/g2 --save

yarn add @antv/g2 --save
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs moonscript"><code>npm install @antv/g2 <span class="hljs-comment">--save</span>

yarn add @antv/g2 <span class="hljs-comment">--save</span>
</code></pre><p>&#x4E0E;BizCharts&#x4E0D;&#x540C;&#xFF0C;G2&#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;&#x5E76;&#x975E;&#x4EE5;&#x7EC4;&#x4EF6;&#x7684;&#x5F62;&#x5F0F;&#x5F15;&#x5165;&#xFF0C;&#x800C;&#x662F;&#x9700;&#x8981;&#x83B7;&#x53D6;&#x9700;&#x8981;&#x5728;&#x67D0;&#x4E2A;DOM&#x4E0B;&#x521D;&#x59CB;&#x5316;&#x56FE;&#x8868;&#x3002;&#x83B7;&#x53D6;&#x8BE5;DOM&#x7684;&#x552F;&#x4E00;&#x5C5E;&#x6027;id&#x4E4B;&#x540E;&#xFF0C;&#x901A;&#x8FC7;chart()&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#x3002;</p><h3 id="articleHeader6">&#x4E8C;&#x3001;&#x5F15;&#x7528;</h3><p>&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import G2 from &apos;@antv/g2&apos;;
    class g2 extends React.Component {constructor(props) {
        super(props);
        this.state = {
          data :[
            { genre: &apos;Sports&apos;, sold: 275 },
            { genre: &apos;Strategy&apos;, sold: 115 },
            { genre: &apos;Action&apos;, sold: 120 },
            { genre: &apos;Shooter&apos;, sold: 350 },
            { genre: &apos;Other&apos;, sold: 150 }
          ]
        };
    }

    componentDidMount() {
        const chart = new G2.Chart({
          container: &apos;c1&apos;, // &#x6307;&#x5B9A;&#x56FE;&#x8868;&#x5BB9;&#x5668; ID
          width: 600, // &#x6307;&#x5B9A;&#x56FE;&#x8868;&#x5BBD;&#x5EA6;
          height: 300 // &#x6307;&#x5B9A;&#x56FE;&#x8868;&#x9AD8;&#x5EA6;
        });
        chart.source(this.state.data);
        chart.interval().position(&apos;genre*sold&apos;).color(&apos;genre&apos;);
        chart.render();
    }
    render() {
        return (
          &lt;div id=&quot;c1&quot; className=&quot;charts&quot;&gt;
          &lt;/div&gt;
        );
    }
}
export default g2;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> G2 <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@antv/g2&apos;</span>;
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">g2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{<span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
          <span class="hljs-attr">data</span> :[
            { <span class="hljs-attr">genre</span>: <span class="hljs-string">&apos;Sports&apos;</span>, <span class="hljs-attr">sold</span>: <span class="hljs-number">275</span> },
            { <span class="hljs-attr">genre</span>: <span class="hljs-string">&apos;Strategy&apos;</span>, <span class="hljs-attr">sold</span>: <span class="hljs-number">115</span> },
            { <span class="hljs-attr">genre</span>: <span class="hljs-string">&apos;Action&apos;</span>, <span class="hljs-attr">sold</span>: <span class="hljs-number">120</span> },
            { <span class="hljs-attr">genre</span>: <span class="hljs-string">&apos;Shooter&apos;</span>, <span class="hljs-attr">sold</span>: <span class="hljs-number">350</span> },
            { <span class="hljs-attr">genre</span>: <span class="hljs-string">&apos;Other&apos;</span>, <span class="hljs-attr">sold</span>: <span class="hljs-number">150</span> }
          ]
        };
    }

    componentDidMount() {
        <span class="hljs-keyword">const</span> chart = <span class="hljs-keyword">new</span> G2.Chart({
          <span class="hljs-attr">container</span>: <span class="hljs-string">&apos;c1&apos;</span>, <span class="hljs-comment">// &#x6307;&#x5B9A;&#x56FE;&#x8868;&#x5BB9;&#x5668; ID</span>
          width: <span class="hljs-number">600</span>, <span class="hljs-comment">// &#x6307;&#x5B9A;&#x56FE;&#x8868;&#x5BBD;&#x5EA6;</span>
          height: <span class="hljs-number">300</span> <span class="hljs-comment">// &#x6307;&#x5B9A;&#x56FE;&#x8868;&#x9AD8;&#x5EA6;</span>
        });
        chart.source(<span class="hljs-keyword">this</span>.state.data);
        chart.interval().position(<span class="hljs-string">&apos;genre*sold&apos;</span>).color(<span class="hljs-string">&apos;genre&apos;</span>);
        chart.render();
    }
    render() {
        <span class="hljs-keyword">return</span> (
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;c1&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;charts&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> g2;
</code></pre><p>&#x6548;&#x679C;&#x56FE;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000016469963?w=566&amp;h=280" src="https://static.alili.tech/img/remote/1460000016469963?w=566&amp;h=280" alt="G2&#x793A;&#x4F8B;" title="G2&#x793A;&#x4F8B;" style="cursor:pointer"></span></p><h3 id="articleHeader7">&#x4E09;&#x3001;DataSet</h3><p>DataSet &#x4E3B;&#x8981;&#x6709;&#x4E24;&#x65B9;&#x9762;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x89E3;&#x6790;&#x6570;&#x636E;&#xFF08;Connector&#xFF09;&amp;&#x52A0;&#x5DE5;&#x6570;&#x636E;&#xFF08;Transform&#xFF09;&#x3002;</p><p>&#x5B98;&#x65B9;&#x6587;&#x6863;&#x63CF;&#x8FF0;&#x5F97;&#x6BD4;&#x8F83;&#x8BE6;&#x7EC6;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x5B98;&#x7F51;&#x7684;&#x5206;&#x7C7B;&#xFF1A;</p><blockquote>&#x6E90;&#x6570;&#x636E;&#x7684;&#x89E3;&#x6790;&#xFF0C;&#x5C06;csv, dsv,geojson &#x8F6C;&#x6210;&#x6807;&#x51C6;&#x7684;JSON&#xFF0C;&#x67E5;&#x770B;<a href="https://antv.alipay.com/zh-cn/g2/3.x/api/connector.html" rel="nofollow noreferrer" target="_blank">Connector</a><br>&#x52A0;&#x5DE5;&#x6570;&#x636E;&#xFF0C;&#x5305;&#x62EC; filter,map,fold(&#x8865;&#x6570;&#x636E;) &#x7B49;&#x64CD;&#x4F5C;&#xFF0C;&#x67E5;&#x770B;<a href="https://antv.alipay.com/zh-cn/g2/3.x/api/transform.html" rel="nofollow noreferrer" target="_blank">Transform</a><br>&#x7EDF;&#x8BA1;&#x51FD;&#x6570;&#xFF0C;&#x6C47;&#x603B;&#x7EDF;&#x8BA1;&#x3001;&#x767E;&#x5206;&#x6BD4;&#x3001;&#x5C01;&#x7BB1; &#x7B49;&#x7EDF;&#x8BA1;&#x51FD;&#x6570;&#xFF0C;&#x67E5;&#x770B; <a href="https://antv.alipay.com/zh-cn/g2/3.x/api/transform.html" rel="nofollow noreferrer" target="_blank">Transform</a><br>&#x7279;&#x6B8A;&#x6570;&#x636E;&#x5904;&#x7406;&#xFF0C;&#x5305;&#x62EC; &#x5730;&#x7406;&#x6570;&#x636E;&#x3001;&#x77E9;&#x5F62;&#x6811;&#x56FE;&#x3001;&#x6851;&#x57FA;&#x56FE;&#x3001;&#x6587;&#x5B57;&#x4E91; &#x7684;&#x6570;&#x636E;&#x5904;&#x7406;&#xFF0C;&#x67E5;&#x770B; <a href="https://antv.alipay.com/zh-cn/g2/3.x/api/transform.html" rel="nofollow noreferrer" target="_blank">Transform</a></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// step1 &#x521B;&#x5EFA; dataset &#x6307;&#x5B9A;&#x72B6;&#x6001;&#x91CF;
const ds = new DataSet({
 state: {
    year: &apos;2010&apos;
 }
});

// step2 &#x521B;&#x5EFA; DataView
const dv = ds.createView().source(data);

dv.transform({
 type: &apos;filter&apos;,
 callback(row) {
    return row.year === ds.state.year;
 }
});

// step3 &#x5F15;&#x7528; DataView
chart.source(dv);
// step4 &#x66F4;&#x65B0;&#x72B6;&#x6001;&#x91CF;
ds.setState(&apos;year&apos;, &apos;2012&apos;);

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code><span class="hljs-comment">// step1 &#x521B;&#x5EFA; dataset &#x6307;&#x5B9A;&#x72B6;&#x6001;&#x91CF;</span>
<span class="hljs-keyword">const</span> ds = <span class="hljs-keyword">new</span> DataSet({
 state: {
    <span class="hljs-built_in">year</span>: <span class="hljs-string">&apos;2010&apos;</span>
 }
});

<span class="hljs-comment">// step2 &#x521B;&#x5EFA; DataView</span>
<span class="hljs-keyword">const</span> dv = ds.createView().source(data);

dv.transform({
 type: <span class="hljs-string">&apos;filter&apos;</span>,
 callback(row) {
    <span class="hljs-keyword">return</span> row.<span class="hljs-built_in">year</span> === ds.state.<span class="hljs-built_in">year</span>;
 }
});

<span class="hljs-comment">// step3 &#x5F15;&#x7528; DataView</span>
chart.source(dv);
<span class="hljs-comment">// step4 &#x66F4;&#x65B0;&#x72B6;&#x6001;&#x91CF;</span>
ds.setState(<span class="hljs-string">&apos;year&apos;</span>, <span class="hljs-string">&apos;2012&apos;</span>);

</code></pre><p><strong>&#x4EE5;&#x4E0B;&#x91C7;&#x7528;&#x5B98;&#x7F51;&#x6587;&#x6863;&#x7ED9;&#x51FA;&#x7684;&#x793A;&#x4F8B;&#x8FDB;&#x884C;&#x5206;&#x6790;</strong></p><p><strong>&#x793A;&#x4F8B;&#x4E00;</strong></p><p>&#x8BE5;&#x8868;&#x683C;&#x91CC;&#x9762;&#x7684;&#x6570;&#x636E;&#x662F;&#x7F8E;&#x56FD;&#x5404;&#x4E2A;&#x5DDE;&#x4E0D;&#x540C;&#x5E74;&#x9F84;&#x6BB5;&#x7684;&#x4EBA;&#x53E3;&#x6570;&#x91CF;&#xFF0C;&#x8868;&#x683C;&#x6570;&#x636E;&#x5B58;&#x653E;&#x5728;&#x7C7B;&#x578B;&#x4E3A;CVS&#x7684;&#x6587;&#x4EF6;&#x4E2D;<br><a href="https://antv.alipay.com/assets/data/population-by-age.json" rel="nofollow noreferrer" target="_blank">&#x6570;&#x636E;&#x94FE;&#x63A5;&#xFF08;&#x8BE5;&#x94FE;&#x63A5;&#x4E2D;&#x4E3A;json&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#xFF09;</a></p><table><thead><tr><th align="center">State</th><th align="center">&#x5C0F;&#x4E8E;5&#x5C81;</th><th align="center">5&#x81F3;13&#x5C81;</th><th align="center">14&#x81F3;17&#x5C81;</th><th align="center">18&#x81F3;24&#x5C81;</th><th align="center">25&#x81F3;44&#x5C81;</th><th align="center">45&#x81F3;64&#x5C81;</th><th align="center">65&#x5C81;&#x53CA;&#x4EE5;&#x4E0A;</th></tr></thead><tbody><tr><td align="center">WY</td><td align="center">38253</td><td align="center">60890</td><td align="center">29314</td><td align="center">53980</td><td align="center">137338</td><td align="center">147279</td><td align="center">65614</td></tr><tr><td align="center">DC</td><td align="center">36352</td><td align="center">50439</td><td align="center">25225</td><td align="center">75569</td><td align="center">193557</td><td align="center">140043</td><td align="center">70648</td></tr><tr><td align="center">VT</td><td align="center">32635</td><td align="center">62538</td><td align="center">33757</td><td align="center">61679</td><td align="center">155419</td><td align="center">188593</td><td align="center">86649</td></tr><tr><td align="center">...</td><td align="center">...</td><td align="center">...</td><td align="center">...</td><td align="center">...</td><td align="center">...</td><td align="center">...</td><td align="center">...</td></tr></tbody></table><p>&#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;&#x5904;&#x7406;&#x6A21;&#x5757;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import DataSet from &apos;@antv/data-set&apos;;

const ds = new DataSet({
//state&#x8868;&#x793A;&#x521B;&#x5EFA;dataSet&#x7684;&#x72B6;&#x6001;&#x91CF;&#xFF0C;&#x53EF;&#x4EE5;&#x4E0D;&#x8FDB;&#x884C;&#x8BBE;&#x7F6E;
 state: {
    currentState: &apos;WY&apos;
    }
});

const dvForAll = ds
// &#x5728; DataSet &#x5B9E;&#x4F8B;&#x4E0B;&#x521B;&#x5EFA;&#x540D;&#x4E3A; populationByAge &#x7684;&#x6570;&#x636E;&#x89C6;&#x56FE;
    .createView(&apos;populationByAge&apos;) 
// source&#x521D;&#x59CB;&#x5316;&#x56FE;&#x8868;&#x6570;&#x636E;&#xFF0C;data&#x53EF;&#x4E3A;http&#x8BF7;&#x6C42;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x679C;
    .source(data, {
      type: &apos;csv&apos;, // &#x4F7F;&#x7528; CSV &#x7C7B;&#x578B;&#x7684; Connector &#x88C5;&#x8F7D; data&#xFF0C;&#x5982;&#x679C;&#x662F;json&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x53EF;&#x4EE5;&#x4E0D;&#x8FDB;&#x884C;&#x8BBE;&#x7F6E;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;json&#x7C7B;&#x578B;
});

/**
trnasform&#x5BF9;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x52A0;&#x5DE5;&#x5904;&#x7406;&#xFF0C;&#x53EF;&#x901A;&#x8FC7;type&#x8BBE;&#x7F6E;&#x52A0;&#x5DE5;&#x7C7B;&#x578B;&#xFF0C;&#x5177;&#x4F53;&#x53C2;&#x8003;&#x4E0A;&#x6587;api&#x6587;&#x6863;
&#x52A0;&#x5DE5;&#x8FC7;&#x540E;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x4E3A;
[
{state:&apos;WY&apos;,key:&apos;&#x5C0F;&#x4E8E;5&#x5C81;&apos;&#xFF0C;value:38253},
{state:&apos;WY&apos;,key:&apos;5&#x81F3;13&#x5C81;&apos;&#xFF0C;value:60890},
]
*/ 
dvForAll.transform({
    type: &apos;fold&apos;,
    fields: [ &apos;&#x5C0F;&#x4E8E;5&#x5C81;&apos;,&apos;5&#x81F3;13&#x5C81;&apos;,&apos;14&#x81F3;17&#x5C81;&apos;,&apos;18&#x81F3;24&#x5C81;&apos;,&apos;25&#x81F3;44&#x5C81;&apos;,&apos;45&#x81F3;64&#x5C81;&apos;,&apos;65&#x5C81;&#x53CA;&#x4EE5;&#x4E0A;&apos; ],
    key: &apos;age&apos;,
     value: &apos;population&apos;
});

//&#x5176;&#x4F59;transform&#x64CD;&#x4F5C;
const dvForOneState = ds
    .createView(&apos;populationOfOneState&apos;)
    .source(dvForAll); // &#x4ECE;&#x5168;&#x91CF;&#x6570;&#x636E;&#x7EE7;&#x627F;&#xFF0C;&#x5199;&#x6CD5;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;.source(&apos;populationByAge&apos;)
 dvForOneState
     .transform({ // &#x8FC7;&#x6EE4;&#x6570;&#x636E;&#xFF0C;&#x7B5B;&#x9009;&#x51FA;state&#x7B26;&#x5408;&#x7684;&#x5730;&#x533A;&#x6570;&#x636E;
    type: &apos;filter&apos;,
    callback(row) {
      return row.state === ds.state.currentState;
    }
})
 .transform({
    type: &apos;percent&apos;,
    field: &apos;population&apos;,
    dimension: &apos;age&apos;,
    as: &apos;percent&apos;
    });
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> DataSet <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@antv/data-set&apos;</span>;

<span class="hljs-keyword">const</span> ds = <span class="hljs-keyword">new</span> DataSet({
<span class="hljs-comment">//state&#x8868;&#x793A;&#x521B;&#x5EFA;dataSet&#x7684;&#x72B6;&#x6001;&#x91CF;&#xFF0C;&#x53EF;&#x4EE5;&#x4E0D;&#x8FDB;&#x884C;&#x8BBE;&#x7F6E;</span>
 state: {
    currentState: <span class="hljs-string">&apos;WY&apos;</span>
    }
});

<span class="hljs-keyword">const</span> dvForAll = ds
<span class="hljs-comment">// &#x5728; DataSet &#x5B9E;&#x4F8B;&#x4E0B;&#x521B;&#x5EFA;&#x540D;&#x4E3A; populationByAge &#x7684;&#x6570;&#x636E;&#x89C6;&#x56FE;</span>
    .createView(<span class="hljs-string">&apos;populationByAge&apos;</span>) 
<span class="hljs-comment">// source&#x521D;&#x59CB;&#x5316;&#x56FE;&#x8868;&#x6570;&#x636E;&#xFF0C;data&#x53EF;&#x4E3A;http&#x8BF7;&#x6C42;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x679C;</span>
    .source(data, {
      <span class="hljs-keyword">type</span>: <span class="hljs-string">&apos;csv&apos;</span>, <span class="hljs-comment">// &#x4F7F;&#x7528; CSV &#x7C7B;&#x578B;&#x7684; Connector &#x88C5;&#x8F7D; data&#xFF0C;&#x5982;&#x679C;&#x662F;json&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x53EF;&#x4EE5;&#x4E0D;&#x8FDB;&#x884C;&#x8BBE;&#x7F6E;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;json&#x7C7B;&#x578B;</span>
});

<span class="hljs-comment">/**
trnasform&#x5BF9;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x52A0;&#x5DE5;&#x5904;&#x7406;&#xFF0C;&#x53EF;&#x901A;&#x8FC7;type&#x8BBE;&#x7F6E;&#x52A0;&#x5DE5;&#x7C7B;&#x578B;&#xFF0C;&#x5177;&#x4F53;&#x53C2;&#x8003;&#x4E0A;&#x6587;api&#x6587;&#x6863;
&#x52A0;&#x5DE5;&#x8FC7;&#x540E;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x4E3A;
[
{state:&apos;WY&apos;,key:&apos;&#x5C0F;&#x4E8E;5&#x5C81;&apos;&#xFF0C;value:38253},
{state:&apos;WY&apos;,key:&apos;5&#x81F3;13&#x5C81;&apos;&#xFF0C;value:60890},
]
*/</span> 
dvForAll.transform({
    <span class="hljs-keyword">type</span>: <span class="hljs-string">&apos;fold&apos;</span>,
    fields: [ <span class="hljs-string">&apos;&#x5C0F;&#x4E8E;5&#x5C81;&apos;</span>,<span class="hljs-string">&apos;5&#x81F3;13&#x5C81;&apos;</span>,<span class="hljs-string">&apos;14&#x81F3;17&#x5C81;&apos;</span>,<span class="hljs-string">&apos;18&#x81F3;24&#x5C81;&apos;</span>,<span class="hljs-string">&apos;25&#x81F3;44&#x5C81;&apos;</span>,<span class="hljs-string">&apos;45&#x81F3;64&#x5C81;&apos;</span>,<span class="hljs-string">&apos;65&#x5C81;&#x53CA;&#x4EE5;&#x4E0A;&apos;</span> ],
    key: <span class="hljs-string">&apos;age&apos;</span>,
     value: <span class="hljs-string">&apos;population&apos;</span>
});

<span class="hljs-comment">//&#x5176;&#x4F59;transform&#x64CD;&#x4F5C;</span>
<span class="hljs-keyword">const</span> dvForOneState = ds
    .createView(<span class="hljs-string">&apos;populationOfOneState&apos;</span>)
    .source(dvForAll); <span class="hljs-comment">// &#x4ECE;&#x5168;&#x91CF;&#x6570;&#x636E;&#x7EE7;&#x627F;&#xFF0C;&#x5199;&#x6CD5;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;.source(&apos;populationByAge&apos;)</span>
 dvForOneState
     .transform({ <span class="hljs-comment">// &#x8FC7;&#x6EE4;&#x6570;&#x636E;&#xFF0C;&#x7B5B;&#x9009;&#x51FA;state&#x7B26;&#x5408;&#x7684;&#x5730;&#x533A;&#x6570;&#x636E;</span>
    <span class="hljs-keyword">type</span>: <span class="hljs-string">&apos;filter&apos;</span>,
    callback(row) {
      <span class="hljs-keyword">return</span> row.state === ds.state.currentState;
    }
})
 .transform({
    <span class="hljs-keyword">type</span>: <span class="hljs-string">&apos;percent&apos;</span>,
    field: <span class="hljs-string">&apos;population&apos;</span>,
    dimension: <span class="hljs-string">&apos;age&apos;</span>,
    <span class="hljs-keyword">as</span>: <span class="hljs-string">&apos;percent&apos;</span>
    });
</code></pre><p>&#x4F7F;&#x7528;G2&#x7ED8;&#x56FE;<br><a href="https://antv.alipay.com/zh-cn/g2/3.x/api/chart.html" rel="nofollow noreferrer" target="_blank">G2-chart Api&#x6587;&#x6863;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import G2 from &apos;@antv/g2&apos;;

// &#x521D;&#x59CB;&#x5316;&#x56FE;&#x8868;&#xFF0C;id&#x6307;&#x5B9A;&#x4E86;&#x56FE;&#x8868;&#x8981;&#x63D2;&#x5165;&#x7684;dom&#xFF0C;&#x5176;&#x4ED6;&#x5C5E;&#x6027;&#x8BBE;&#x7F6E;&#x4E86;&#x56FE;&#x8868;&#x6240;&#x5360;&#x7684;&#x5BBD;&#x9AD8;
const c1 = new G2.Chart({
  id: &apos;c1&apos;,
  forceFit: true,
  height: 400,
});

// chart&#x521D;&#x59CB;&#x5316;&#x52A0;&#x5DE5;&#x8FC7;&#x7684;&#x6570;&#x636E;dvForAll
c1.source(dvForAll);

// &#x914D;&#x7F6E;&#x56FE;&#x8868;&#x56FE;&#x4F8B;
c1.legend({
  position: &apos;top&apos;,
});

// &#x8BBE;&#x7F6E;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE; chart &#x5BF9;&#x8C61;&#xFF0C;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x8868;&#x793A;&#x5C06;&#x5750;&#x6807;&#x8F74;&#x5C5E;&#x6027;&#x4E3A;&#x4EBA;&#x53E3;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x8F6C;&#x6362;&#x4E3A;M&#x4E3A;&#x5355;&#x4F4D;&#x7684;&#x6570;&#x636E;
c1.axis(&apos;population&apos;, {
  label: {
    formatter: val =&gt; {
      return val / 1000000 + &apos;M&apos;;
    }
  }
});

c1.intervalStack()
  .position(&apos;state*population&apos;)
  .color(&apos;age&apos;)
  .select(true, {
    mode: &apos;single&apos;,
    style: {
      stroke: &apos;red&apos;,
      strokeWidth: 5
    }
  });
  
//&#x5F53;tooltip&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;,&#x4FEE;&#x6539;ds&#x7684;state&#x72B6;&#x6001;&#x91CF;&#xFF0C;&#x4E00;&#x65E6;&#x72B6;&#x6001;&#x91CF;&#x6539;&#x53D8;&#xFF0C;&#x5C31;&#x4F1A;&#x89E6;&#x53D1;&#x56FE;&#x8868;&#x7684;&#x66F4;&#x65B0;&#xFF0C;&#x6240;&#x4EE5;c2&#x997C;&#x56FE;&#x4F1A;&#x89E6;&#x53D1;&#x6539;&#x53D8;
c1.on(&apos;tooltip:change&apos;, function(evt) {
  const items = evt.items || [];
  if (items[0]) {
  //&#x4FEE;&#x6539;&#x7684;currentState&#x4E3A;&#x9F20;&#x6807;&#x6240;&#x89E6;&#x53CA;&#x7684;tooltip&#x7684;&#x5730;&#x533A;
    ds.setState(&apos;currentState&apos;, items[0].title);
  }
});

// &#x7ED8;&#x5236;&#x997C;&#x56FE;
const c2 = new G2.Chart({
  id: &apos;c2&apos;,
  forceFit: true,
  height: 300,
  padding: 0,
});
c2.source(dvForOneState);
c2.coord(&apos;theta&apos;, {
  radius: 0.8 // &#x8BBE;&#x7F6E;&#x997C;&#x56FE;&#x7684;&#x5927;&#x5C0F;
});
c2.legend(false);
c2.intervalStack()
  .position(&apos;percent&apos;)
  .color(&apos;age&apos;)
  .label(&apos;age*percent&apos;,function(age, percent) {
    percent = (percent * 100).toFixed(2) + &apos;%&apos;;
    return age + &apos; &apos; + percent;
  });

c1.render();
c2.render();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> G2 <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@antv/g2&apos;</span>;

<span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x56FE;&#x8868;&#xFF0C;id&#x6307;&#x5B9A;&#x4E86;&#x56FE;&#x8868;&#x8981;&#x63D2;&#x5165;&#x7684;dom&#xFF0C;&#x5176;&#x4ED6;&#x5C5E;&#x6027;&#x8BBE;&#x7F6E;&#x4E86;&#x56FE;&#x8868;&#x6240;&#x5360;&#x7684;&#x5BBD;&#x9AD8;</span>
<span class="hljs-keyword">const</span> c1 = <span class="hljs-keyword">new</span> G2.Chart({
  <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;c1&apos;</span>,
  <span class="hljs-attr">forceFit</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">height</span>: <span class="hljs-number">400</span>,
});

<span class="hljs-comment">// chart&#x521D;&#x59CB;&#x5316;&#x52A0;&#x5DE5;&#x8FC7;&#x7684;&#x6570;&#x636E;dvForAll</span>
c1.source(dvForAll);

<span class="hljs-comment">// &#x914D;&#x7F6E;&#x56FE;&#x8868;&#x56FE;&#x4F8B;</span>
c1.legend({
  <span class="hljs-attr">position</span>: <span class="hljs-string">&apos;top&apos;</span>,
});

<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE; chart &#x5BF9;&#x8C61;&#xFF0C;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x8868;&#x793A;&#x5C06;&#x5750;&#x6807;&#x8F74;&#x5C5E;&#x6027;&#x4E3A;&#x4EBA;&#x53E3;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x8F6C;&#x6362;&#x4E3A;M&#x4E3A;&#x5355;&#x4F4D;&#x7684;&#x6570;&#x636E;</span>
c1.axis(<span class="hljs-string">&apos;population&apos;</span>, {
  <span class="hljs-attr">label</span>: {
    <span class="hljs-attr">formatter</span>: <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> val / <span class="hljs-number">1000000</span> + <span class="hljs-string">&apos;M&apos;</span>;
    }
  }
});

c1.intervalStack()
  .position(<span class="hljs-string">&apos;state*population&apos;</span>)
  .color(<span class="hljs-string">&apos;age&apos;</span>)
  .select(<span class="hljs-literal">true</span>, {
    <span class="hljs-attr">mode</span>: <span class="hljs-string">&apos;single&apos;</span>,
    <span class="hljs-attr">style</span>: {
      <span class="hljs-attr">stroke</span>: <span class="hljs-string">&apos;red&apos;</span>,
      <span class="hljs-attr">strokeWidth</span>: <span class="hljs-number">5</span>
    }
  });
  
<span class="hljs-comment">//&#x5F53;tooltip&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;,&#x4FEE;&#x6539;ds&#x7684;state&#x72B6;&#x6001;&#x91CF;&#xFF0C;&#x4E00;&#x65E6;&#x72B6;&#x6001;&#x91CF;&#x6539;&#x53D8;&#xFF0C;&#x5C31;&#x4F1A;&#x89E6;&#x53D1;&#x56FE;&#x8868;&#x7684;&#x66F4;&#x65B0;&#xFF0C;&#x6240;&#x4EE5;c2&#x997C;&#x56FE;&#x4F1A;&#x89E6;&#x53D1;&#x6539;&#x53D8;</span>
c1.on(<span class="hljs-string">&apos;tooltip:change&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>) </span>{
  <span class="hljs-keyword">const</span> items = evt.items || [];
  <span class="hljs-keyword">if</span> (items[<span class="hljs-number">0</span>]) {
  <span class="hljs-comment">//&#x4FEE;&#x6539;&#x7684;currentState&#x4E3A;&#x9F20;&#x6807;&#x6240;&#x89E6;&#x53CA;&#x7684;tooltip&#x7684;&#x5730;&#x533A;</span>
    ds.setState(<span class="hljs-string">&apos;currentState&apos;</span>, items[<span class="hljs-number">0</span>].title);
  }
});

<span class="hljs-comment">// &#x7ED8;&#x5236;&#x997C;&#x56FE;</span>
<span class="hljs-keyword">const</span> c2 = <span class="hljs-keyword">new</span> G2.Chart({
  <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;c2&apos;</span>,
  <span class="hljs-attr">forceFit</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">height</span>: <span class="hljs-number">300</span>,
  <span class="hljs-attr">padding</span>: <span class="hljs-number">0</span>,
});
c2.source(dvForOneState);
c2.coord(<span class="hljs-string">&apos;theta&apos;</span>, {
  <span class="hljs-attr">radius</span>: <span class="hljs-number">0.8</span> <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x997C;&#x56FE;&#x7684;&#x5927;&#x5C0F;</span>
});
c2.legend(<span class="hljs-literal">false</span>);
c2.intervalStack()
  .position(<span class="hljs-string">&apos;percent&apos;</span>)
  .color(<span class="hljs-string">&apos;age&apos;</span>)
  .label(<span class="hljs-string">&apos;age*percent&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">age, percent</span>) </span>{
    percent = (percent * <span class="hljs-number">100</span>).toFixed(<span class="hljs-number">2</span>) + <span class="hljs-string">&apos;%&apos;</span>;
    <span class="hljs-keyword">return</span> age + <span class="hljs-string">&apos; &apos;</span> + percent;
  });

c1.render();
c2.render();</code></pre><h2 id="articleHeader8">ECharts</h2><p>ECharts&#x662F;&#x4E00;&#x4E2A;&#x6210;&#x719F;&#x7684;&#x56FE;&#x8868;&#x5E93;&#xFF0C; &#x4F7F;&#x7528;&#x65B9;&#x4FBF;&#x3001;&#x56FE;&#x8868;&#x79CD;&#x7C7B;&#x591A;&#x3001;&#x5BB9;&#x6613;&#x4E0A;&#x624B;&#x3002;&#x6587;&#x6863;&#x8D44;&#x6E90;&#x4E5F;&#x6BD4;&#x8F83;&#x4E30;&#x5BCC;&#xFF0C;&#x5728;&#x6B64;&#x4E0D;&#x505A;&#x8D58;&#x8FF0;&#x3002;<br><a href="http://echarts.baidu.com/" rel="nofollow noreferrer" target="_blank">ECharts&#x6587;&#x6863;</a></p><h2 id="articleHeader9">ECharts &amp; BizCharts &amp; G2 &#x5BF9;&#x6BD4;</h2><p>&#x5BF9;&#x6BD4;BizCharts&#x548C;G2&#x4E24;&#x79CD;&#x56FE;&#x8868;&#x5E93;&#xFF0C;BizCharts&#x4E3B;&#x8981;&#x662F;&#x8FDB;&#x884C;&#x4E86;&#x4E00;&#x5C42;&#x5C01;&#x88C5;&#xFF0C;&#x4F7F;&#x5F97;&#x56FE;&#x8868;&#x53EF;&#x4EE5;&#x4EE5;&#x7EC4;&#x4EF6;&#x7684;&#x5F62;&#x5F0F;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#xFF0C;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#xFF0C;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x66F4;&#x52A0;&#x65B9;&#x4FBF;&#x3002;<br>&#x7B80;&#x5355;&#x5BF9;&#x6BD4;&#x4E00;&#x4E0B;&#x4E09;&#x4E2A;&#x56FE;&#x8868;&#x5E93;&#x7684;&#x533A;&#x522B;&#xFF1A;</p><p><strong>&#x521D;&#x59CB;&#x5316;&#x56FE;&#x8868;&#xFF1A;</strong><br>ECharts&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x57FA;&#x4E8E;&#x51C6;&#x5907;&#x597D;&#x7684;dom&#xFF0C;&#x521D;&#x59CB;&#x5316;ECharts&#x5B9E;&#x4F8B;
var myChart = echarts.init(document.getElementById(&apos;main&apos;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-comment">// &#x57FA;&#x4E8E;&#x51C6;&#x5907;&#x597D;&#x7684;dom&#xFF0C;&#x521D;&#x59CB;&#x5316;ECharts&#x5B9E;&#x4F8B;</span>
<span class="hljs-keyword">var</span> myChart = echarts.init(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;main&apos;</span>));</code></pre><p>BizCharts&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4EE5;&#x7EC4;&#x4EF6;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x7EC4;&#x5408;&#x8C03;&#x7528;
import { Chart, Geom, Axis, ... } from &apos;bizcharts&apos;;

&lt;Chart width={600} height={400} data={data}&gt;
    ...
&lt;/Chart&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x4EE5;&#x7EC4;&#x4EF6;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x7EC4;&#x5408;&#x8C03;&#x7528;</span>
<span class="hljs-keyword">import</span> { Chart, Geom, Axis, ... } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;bizcharts&apos;</span>;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> <span class="hljs-attr">width</span>=<span class="hljs-string">{600}</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{400}</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span>&gt;</span>
    ...
<span class="hljs-tag">&lt;/<span class="hljs-name">Chart</span>&gt;</span></span></code></pre><p>G2&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x57FA;&#x4E8E;&#x51C6;&#x5907;&#x597D;&#x7684;dom&#xFF0C;&#x914D;&#x7F6E;&#x4E4B;&#x540E;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;
const chart = new G2.Chart({
    container: &apos;c1&apos;, // &#x6307;&#x5B9A;&#x56FE;&#x8868;&#x5BB9;&#x5668; ID
    width: 600, // &#x6307;&#x5B9A;&#x56FE;&#x8868;&#x5BBD;&#x5EA6;
    height: 300 // &#x6307;&#x5B9A;&#x56FE;&#x8868;&#x9AD8;&#x5EA6;
});
chart.source(data);
chart.render();
 
&lt;div id=&quot;c1&quot; className=&quot;charts&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x57FA;&#x4E8E;&#x51C6;&#x5907;&#x597D;&#x7684;dom&#xFF0C;&#x914D;&#x7F6E;&#x4E4B;&#x540E;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;</span>
<span class="hljs-keyword">const</span> chart = <span class="hljs-keyword">new</span> G2.Chart({
    <span class="hljs-attr">container</span>: <span class="hljs-string">&apos;c1&apos;</span>, <span class="hljs-comment">// &#x6307;&#x5B9A;&#x56FE;&#x8868;&#x5BB9;&#x5668; ID</span>
    width: <span class="hljs-number">600</span>, <span class="hljs-comment">// &#x6307;&#x5B9A;&#x56FE;&#x8868;&#x5BBD;&#x5EA6;</span>
    height: <span class="hljs-number">300</span> <span class="hljs-comment">// &#x6307;&#x5B9A;&#x56FE;&#x8868;&#x9AD8;&#x5EA6;</span>
});
chart.source(data);
chart.render();
 
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;c1&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;charts&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><p><strong>&#x914D;&#x7F6E;&#xFF1A;</strong></p><p>ECharts&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x96C6;&#x4E2D;&#x5728;options&#x4E2D;&#x8FDB;&#x884C;&#x914D;&#x7F6E;
myChart.setOption({
    title: {
        ...
    },
    tooltip: {},
    xAxis: {
        data: [...]
    },
    yAxis: {},
    series: [{
        ...
    }]
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-comment">// &#x96C6;&#x4E2D;&#x5728;options&#x4E2D;&#x8FDB;&#x884C;&#x914D;&#x7F6E;</span>
<span class="hljs-selector-tag">myChart</span><span class="hljs-selector-class">.setOption</span>({
    <span class="hljs-attribute">title</span>: {
        ...
    },
    <span class="hljs-attribute">tooltip</span>: {},
    <span class="hljs-attribute">xAxis</span>: {
        <span class="hljs-attribute">data</span>: [...]
    },
    <span class="hljs-attribute">yAxis</span>: {},
    <span class="hljs-attribute">series</span>: [{
        ...
    }]
});</code></pre><p>BizCharts&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6839;&#x636E;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#xFF0C;&#x914D;&#x7F6E;&#x53C2;&#x6570;&#x4E4B;&#x540E;&#x8FDB;&#x884C;&#x8D4B;&#x503C;
const cols = {...};
const data = {...};
&lt;Chart width={600} height={400} data={data} sca`enter code here`le={cols}&gt;
    ...
&lt;/Chart&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nimrod"><code>// &#x6839;&#x636E;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#xFF0C;&#x914D;&#x7F6E;&#x53C2;&#x6570;&#x4E4B;&#x540E;&#x8FDB;&#x884C;&#x8D4B;&#x503C;
<span class="hljs-keyword">const</span> cols = <span class="hljs-meta">{...}</span>;
<span class="hljs-keyword">const</span> data = <span class="hljs-meta">{...}</span>;
&lt;<span class="hljs-type">Chart</span> width={<span class="hljs-number">600</span>} height={<span class="hljs-number">400</span>} data={data} sca`enter code here`le={cols}&gt;
    ...
&lt;/<span class="hljs-type">Chart</span>&gt;
</code></pre><p>G2:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chart.tooltip({
  triggerOn: &apos;...&apos;
  showTitle: {boolean}, // &#x662F;&#x5426;&#x5C55;&#x793A; title&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; true
  crosshairs: {
    ...
    style: {
      ...
    }
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">chart</span><span class="hljs-selector-class">.tooltip</span>({
  <span class="hljs-attribute">triggerOn</span>: <span class="hljs-string">&apos;...&apos;</span>
  <span class="hljs-attribute">showTitle</span>: {boolean}, <span class="hljs-comment">// &#x662F;&#x5426;&#x5C55;&#x793A; title&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; true</span>
  <span class="hljs-attribute">crosshairs</span>: {
    ...
    <span class="hljs-attribute">style</span>: {
      ...
    }
  }
});</code></pre><p><strong>&#x4E8B;&#x4EF6;&#xFF1A;</strong></p><p>ECharts:<a href="http://echarts.baidu.com/api.html#events" rel="nofollow noreferrer" target="_blank">&#x4E8B;&#x4EF6; api&#x6587;&#x6863;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myChart.on(&apos;click&apos;, function (params) {
    console.log(params);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code>myChart.<span class="hljs-keyword">on</span>(<span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(params)</span> <span class="hljs-comment">{
    console.log(params);
}</span>);</span></code></pre><p>BizCharts:<a href="http://bizcharts.net/products/bizCharts/api/chart#event" rel="nofollow noreferrer" target="_blank">&#x4E8B;&#x4EF6; api&#x6587;&#x6863;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;chart
  onEvent={e =&gt; {
    //do something
  }}
/&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>&lt;chart
  onEvent={<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
    <span class="hljs-comment">//do something</span>
  }}
/&gt;</code></pre><p>G2: <a href="https://antv.alipay.com/zh-cn/g2/3.x/api/chart.html#_%E4%BA%8B%E4%BB%B6" rel="nofollow noreferrer" target="_blank">&#x4E8B;&#x4EF6; api&#x6587;&#x6863;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chart.on(&apos;mousedown&apos;, ev =&gt; {});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">chart</span><span class="hljs-selector-class">.on</span>(<span class="hljs-string">&apos;mousedown&apos;</span>, ev =&gt; {});</code></pre><h2 id="articleHeader10">&#x603B;&#x7ED3;</h2><p>&#x5BF9;&#x6BD4;&#x4EE5;&#x4E0A;3&#x79CD;&#x56FE;&#x8868;&#xFF0C;ECharts&#x548C;BizCharts&#x76F8;&#x5BF9;&#x5BB9;&#x6613;&#x4F7F;&#x7528;&#xFF0C;&#x5C24;&#x5176;ECharts&#x7684;&#x914D;&#x7F6E;&#x975E;&#x5E38;&#x6E05;&#x6670;&#xFF0C;BizCharts&#x4E0E;&#x5176;&#x4E5F;&#x6709;&#x4E00;&#x5B9A;&#x76F8;&#x4F3C;&#x4E4B;&#x5904;&#x3002;BizCharts&#x4F18;&#x52BF;&#x5728;&#x4E8E;&#x7EC4;&#x4EF6;&#x5316;&#x7684;&#x5F62;&#x5F0F;&#x4F7F;&#x5F97;dom&#x7ED3;&#x6784;&#x76F8;&#x5BF9;&#x6E05;&#x6670;&#xFF0C;&#x6309;&#x9700;&#x5F15;&#x7528;&#x3002;G2&#x6BD4;&#x8F83;&#x9002;&#x5408;&#x9700;&#x8981;&#x5927;&#x91CF;&#x56FE;&#x8868;&#x4EA4;&#x4E92;&#x65F6;&#x5F15;&#x7528;&#xFF0C;&#x5176;&#x4E30;&#x5BCC;&#x7684;api&#x5904;&#x7406;&#x4EA4;&#x4E92;&#x903B;&#x8F91;&#x76F8;&#x5BF9;&#x66F4;&#x6709;&#x4F18;&#x52BF;&#x3002;</p><h1 id="articleHeader11">&#x5E7F;&#x800C;&#x544A;&#x4E4B;</h1><p>&#x672C;&#x6587;&#x53D1;&#x5E03;&#x4E8E;<a href="https://github.com/BooheeFE/weekly" rel="nofollow noreferrer" target="_blank">&#x8584;&#x8377;&#x524D;&#x7AEF;&#x5468;&#x520A;</a>&#xFF0C;&#x6B22;&#x8FCE;Watch &amp; Star &#x2605;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;&#x3002;</p><h2 id="articleHeader12">&#x6B22;&#x8FCE;&#x8BA8;&#x8BBA;&#xFF0C;&#x70B9;&#x4E2A;&#x8D5E;&#x518D;&#x8D70;&#x5427; &#xFF61;&#x25D5;&#x203F;&#x25D5;&#xFF61; &#xFF5E;</h2>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
三大图表库：ECharts 、 BizCharts 和 G2，该如何选择？

## 原文链接
[https://segmentfault.com/a/1190000016469959](https://segmentfault.com/a/1190000016469959)

