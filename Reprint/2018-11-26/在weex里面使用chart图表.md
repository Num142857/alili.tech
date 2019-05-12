---
title: '在weex里面使用chart图表' 
date: 2018-11-26 2:30:09
hidden: true
slug: fakxg3ix29s
categories: [reprint]
---

{{< raw >}}
<div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="weex web&#x7AEF;&#x4F7F;&#x7528;chart&#x56FE;&#x8868;&#x7B80;&#x5355;&#xFF0C;&#x4F46;&#x539F;&#x751F;&#x7AEF;&#x4F7F;&#x7528;&#x8D77;&#x6BD4;&#x8F83;&#x5751;&#xFF0C;&#x539F;&#x751F;&#x6CA1;&#x6709;dom&#x7B49;&#x95EE;&#x9898;&#xFF0C;echart&#x6CA1;&#x529E;&#x6CD5;&#x5728;weex&#x91CC;&#x9762;&#x663E;&#x793A;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nginx"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">weex</span> web&#x7AEF;&#x4F7F;&#x7528;chart&#x56FE;&#x8868;&#x7B80;&#x5355;&#xFF0C;&#x4F46;&#x539F;&#x751F;&#x7AEF;&#x4F7F;&#x7528;&#x8D77;&#x6BD4;&#x8F83;&#x5751;&#xFF0C;&#x539F;&#x751F;&#x6CA1;&#x6709;dom&#x7B49;&#x95EE;&#x9898;&#xFF0C;echart&#x6CA1;&#x529E;&#x6CD5;&#x5728;weex&#x91CC;&#x9762;&#x663E;&#x793A;&#x3002;</code></pre><p>&#x6700;&#x8FD1;&#x770B;&#x5230;&#x4E00;&#x7BC7;&#x6587;&#x7AE0; <a href="https://yuque.com/antv/blog/bg9sxf" rel="nofollow noreferrer" target="_blank">&#x300A;&#x804A;&#x4E00;&#x804A; F2 &#x4E0E;&#x5C0F;&#x7A0B;&#x5E8F;&#x300B;</a>&#xFF0C;&#x91CC;&#x9762;&#x5C01;&#x88C5;&#x7684;&#x601D;&#x8DEF;&#x7ED9;&#x4E86;&#x542F;&#x53D1;&#xFF0C;&#x6253;&#x7B97;&#x4F7F;&#x7528; @antv f2 + gcanvas &#x5728;weex&#x91CC;&#x9762;&#x4F7F;&#x7528;chart&#x56FE;&#x8868;&#x3002;</p><p>1.&#x9996;&#x5148;&#x4F7F;&#x7528;weex-toolkit&#x65B0;&#x5EFA;&#x9879;&#x76EE;&#xFF0C;&#x5982;&#x679C;&#x9879;&#x76EE;&#x5B58;&#x5728;&#x8DF3;&#x8FC7;&#x6B21;&#x6B65;&#x9AA4;&#x3002;</p><p>2.&#x9700;&#x8981;npm&#x4E09;&#x4E2A;&#x5305;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install @antv/f2 -s" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">npm</span> install @antv/f2 -s</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install wolfy87-eventemitter -s" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs bash"><code style="word-break:break-word;white-space:initial">npm install wolfy87-eventemitter <span class="hljs-_">-s</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install gcanvas.js -s" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install </span>gcanvas.<span class="hljs-keyword">js </span>-s</code></pre><p><a href="https://github.com/alibaba/GCanvas/tree/master/GCanvas/js" rel="nofollow noreferrer" target="_blank">gcanvas.js</a> &#x662F;&#x7C7B;&#x4F3C;&#x4E8E; H5 Canvas &#x6807;&#x51C6;&#x7684; JavaScript API</p><hr><p>3.F2 &#x9ED8;&#x8BA4;&#x7684;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x662F; HTML5&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528; &lt;canvas&gt; &#x6807;&#x7B7E;&#xFF0C;GCanvas &#x548C; canvas &#x5B8C;&#x5168;&#x662F;&#x5339;&#x914D;&#x7684;&#x3002;<br>&#x6309;&#x7167;&#x5C01;&#x88C5;&#x7684;&#x601D;&#x8DEF;&#x65B0;&#x5EFA;<a href="https://github.com/zouyn/weex-F2-demo/blob/master/src/components/renderer.js" rel="nofollow noreferrer" target="_blank">renderer.js</a>&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import EventEmitter from &apos;wolfy87-eventemitter&apos;;

export default class Renderer extends EventEmitter {
  constructor(myCtx) {
    super();
    const self = this;
    self.ctx = myCtx;
    self.style = {}; // just mock
    // self._initContext(myCtx);
  }
  getContext(type) {
    if (type === &apos;2d&apos;) {
      return this.ctx;
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">EventEmitter</span> from <span class="hljs-symbol">&apos;wolfy87</span>-eventemitter&apos;;

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Renderer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">EventEmitter</span> </span>{
  constructor(myCtx) {
    <span class="hljs-keyword">super</span>();
    const self = <span class="hljs-keyword">this</span>;
    self.ctx = myCtx;
    self.style = {}; <span class="hljs-comment">// just mock</span>
    <span class="hljs-comment">// self._initContext(myCtx);</span>
  }
  getContext(<span class="hljs-class"><span class="hljs-keyword">type</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">===</span> &apos;2<span class="hljs-title">d</span>&apos;) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.ctx;
    }
  }
}</code></pre><hr><p>4.&#x518D;&#x65B0;&#x5EFA;&#x4E2A;chart.js&#xFF0C;&#x5BF9;&#x7F3A;&#x5931;&#x7684;API&#x8FDB;&#x884C;mock</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Renderer from &apos;./renderer&apos;;
import F2 from &apos;@antv/f2&apos;;

function strLen(str) {
  let len = 0;
  for (let i = 0; i &lt; str.length; i++) {
    if (str.charCodeAt(i) &gt; 0 &amp;&amp; str.charCodeAt(i) &lt; 128) {
      len++;
    } else {
      len += 2;
    }
  }

  return len;
}
// &#x7531;&#x4E8E;GCanvas&#x4E0D;&#x652F;&#x6301; measureText &#x65B9;&#x6CD5;&#xFF0C;&#x6545;&#x7528;&#x6B64;&#x65B9;&#x6CD5; mock
F2.Util.measureText = function (text, font) {
  let fontSize = 12;
  if (font) {
    fontSize = parseInt(font.split(&apos; &apos;)[3], 10);
  }
  fontSize /= 2;
  return {
    width: strLen(text) * fontSize
  };
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Renderer <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./renderer&apos;</span>;
<span class="hljs-keyword">import</span> F2 <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@antv/f2&apos;</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">strLen</span>(<span class="hljs-params">str</span>) </span>{
  <span class="hljs-keyword">let</span> len = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; str.length; i++) {
    <span class="hljs-keyword">if</span> (str.charCodeAt(i) &gt; <span class="hljs-number">0</span> &amp;&amp; str.charCodeAt(i) &lt; <span class="hljs-number">128</span>) {
      len++;
    } <span class="hljs-keyword">else</span> {
      len += <span class="hljs-number">2</span>;
    }
  }

  <span class="hljs-keyword">return</span> len;
}
<span class="hljs-comment">// &#x7531;&#x4E8E;GCanvas&#x4E0D;&#x652F;&#x6301; measureText &#x65B9;&#x6CD5;&#xFF0C;&#x6545;&#x7528;&#x6B64;&#x65B9;&#x6CD5; mock</span>
F2.Util.measureText = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">text, font</span>) </span>{
  <span class="hljs-keyword">let</span> fontSize = <span class="hljs-number">12</span>;
  <span class="hljs-keyword">if</span> (font) {
    fontSize = <span class="hljs-built_in">parseInt</span>(font.split(<span class="hljs-string">&apos; &apos;</span>)[<span class="hljs-number">3</span>], <span class="hljs-number">10</span>);
  }
  fontSize /= <span class="hljs-number">2</span>;
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">width</span>: strLen(text) * fontSize
  };
};</code></pre><hr><p>&#x7531;&#x4E8E;weex&#x7684;&#x624B;&#x52BF;&#x7684;&#x56DE;&#x8C03;&#x662F;<a href="http://weex.apache.org/cn/wiki/gestures.html#changedtouches" rel="nofollow noreferrer" target="_blank">changedTouches</a>&#xFF0C;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x4E0B;createEvent&#x6765;&#x5904;&#x7406;&#x5750;&#x6807;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="F2.Util.createEvent = function (event, chart) {
  const pixelRatio = chart.get(&apos;pixelRatio&apos;) || 1;
  const type = event.type;
  let x = 0;
  let y = 0;
  const touches = event.changedTouches;
  if (touches &amp;&amp; touches.length &gt; 0) {
    x = touches[0].pageX;
    y = touches[0].pageY;
  }

  return {
    type,
    chart,
    x: x * pixelRatio,
    y: y * pixelRatio
  };
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs verilog"><code>F2<span class="hljs-variable">.Util</span><span class="hljs-variable">.createEvent</span> = <span class="hljs-keyword">function</span> (<span class="hljs-keyword">event</span>, chart) {
  <span class="hljs-keyword">const</span> pixelRatio = chart<span class="hljs-variable">.get</span>(&apos;pixelRatio&apos;) || <span class="hljs-number">1</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-keyword">type</span> = <span class="hljs-keyword">event</span><span class="hljs-variable">.type</span>;
  <span class="hljs-keyword">let</span> x = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">let</span> y = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">const</span> touches = <span class="hljs-keyword">event</span><span class="hljs-variable">.changedTouches</span>;
  <span class="hljs-keyword">if</span> (touches &amp;&amp; touches<span class="hljs-variable">.length</span> &gt; <span class="hljs-number">0</span>) {
    x = touches[<span class="hljs-number">0</span>]<span class="hljs-variable">.pageX</span>;
    y = touches[<span class="hljs-number">0</span>]<span class="hljs-variable">.pageY</span>;
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-keyword">type</span>,
    chart,
    x: x * pixelRatio,
    y: y * pixelRatio
  };
};</code></pre><p>&#x53E6;&#x5916;weex&#x7684;&#x50CF;&#x7D20;&#x6BD4;&#x548C;H5&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5728;weex&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x7684;&#x5B57;&#x4F53;&#x548C;&#x7EBF;&#x6761;&#x975E;&#x5E38;&#x5C0F;&#xFF0C;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x6574;&#x4F53;&#x7684;&#x6837;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const color1 = &apos;#E8E8E8&apos;; // &#x5750;&#x6807;&#x8F74;&#x7EBF;&#x3001;&#x5750;&#x6807;&#x8F74;&#x7F51;&#x683C;&#x7EBF;&#x7684;&#x989C;&#x8272;
const color2 = &apos;#333333&apos;; // &#x5B57;&#x4F53;&#x989C;&#x8272;
// &#x5750;&#x6807;&#x8F74;&#x7684;&#x9ED8;&#x8BA4;&#x6837;&#x5F0F;&#x914D;&#x7F6E;
const defaultAxis = {
  label: {
    fill: color2,
    fontSize: 24
  }, // &#x5750;&#x6807;&#x8F74;&#x6587;&#x672C;&#x7684;&#x6837;&#x5F0F;
  line: {
    stroke: color1,
    lineWidth: 1,
    top: true
  }, // &#x5750;&#x6807;&#x8F74;&#x7EBF;&#x7684;&#x6837;&#x5F0F;
  grid: {
    stroke: color1,
    lineWidth: 1,
    lineDash: [ 2 ]
  }, // &#x5750;&#x6807;&#x8F74;&#x7F51;&#x683C;&#x7EBF;&#x7684;&#x6837;&#x5F0F;
  tickLine: null, // &#x5750;&#x6807;&#x8F74;&#x523B;&#x5EA6;&#x7EBF;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E0D;&#x5C55;&#x793A;
  labelOffset: 7.5 // &#x5750;&#x6807;&#x8F74;&#x6587;&#x672C;&#x8DDD;&#x79BB;&#x5750;&#x6807;&#x8F74;&#x7EBF;&#x7684;&#x8DDD;&#x79BB;
};

const DEFAULT_CFG = {
  itemMarginBottom: 12,
  itemGap: 10,
  showTitle: false,
  titleStyle: {
    fontSize: 26,
    fill: color2,
    textAlign: &apos;start&apos;,
    textBaseline: &apos;top&apos;
  },
  nameStyle: {
    fill: color2,
    fontSize: 24,
    textAlign: &apos;start&apos;,
    textBaseline: &apos;middle&apos;
  },
  valueStyle: {
    fill: color2,
    fontSize: 24,
    textAlign: &apos;start&apos;,
    textBaseline: &apos;middle&apos;
  },
  unCheckStyle: {
    fill: &apos;#bfbfbf&apos;
  },
  itemWidth: &apos;auto&apos;,
  wordSpace: 6,
  selectedMode: &apos;multiple&apos; // &apos;multiple&apos; or &apos;single&apos;
};

const Theme = {
  fontFamily: &apos;&quot;Helvetica Neue&quot;, &quot;San Francisco&quot;, Helvetica, Tahoma, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Heiti SC&quot;, &quot;Microsoft YaHei&quot;, sans-serif&apos;, // &#x9ED8;&#x8BA4;&#x5B57;&#x4F53;
  defaultColor: &apos;#1890FF&apos;, // &#x9ED8;&#x8BA4;&#x989C;&#x8272;
  pixelRatio: 1, // &#x9ED8;&#x8BA4;&#x50CF;&#x7D20;&#x6BD4;&#xFF0C;&#x5177;&#x4F53;&#x53C2;&#x6570;&#x7531;&#x7528;&#x6237;&#x81EA;&#x5DF1;&#x8BBE;&#x7F6E;
  padding: &apos;auto&apos;, // &#x56FE;&#x8868;&#x8FB9;&#x8DDD;&#xFF0C;&#x9ED8;&#x8BA4;&#x81EA;&#x52A8;&#x8BA1;&#x7B97;
  appendPadding: 18, // &#x9ED8;&#x8BA4;&#x7559;&#x767D;&#xFF0C;15 &#x50CF;&#x7D20;
  colors: [
    &apos;#1890FF&apos;,
    &apos;#2FC25B&apos;,
    &apos;#FACC14&apos;,
    &apos;#223273&apos;,
    &apos;#8543E0&apos;,
    &apos;#13C2C2&apos;,
    &apos;#3436C7&apos;,
    &apos;#F04864&apos;
  ], // &#x9ED8;&#x8BA4;&#x8272;&#x7CFB;
  shapes: {
    line: [ &apos;line&apos;, &apos;dash&apos; ],
    point: [ &apos;circle&apos;, &apos;hollowCircle&apos; ]
  },
  sizes: [ 4, 10 ], // &#x9ED8;&#x8BA4;&#x7684;&#x5927;&#x5C0F;&#x8303;&#x56F4;
  axis: {
    bottom: F2.Util.mix({}, defaultAxis, {
      grid: null
    }), // &#x5E95;&#x90E8;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;
    left: F2.Util.mix({}, defaultAxis, {
      line: null
    }), // &#x5DE6;&#x4FA7;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;
    right: F2.Util.mix({}, defaultAxis, {
      line: null
    }), // &#x53F3;&#x4FA7;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;
    circle: F2.Util.mix({}, defaultAxis, {
      line: null
    }), // &#x6781;&#x5750;&#x6807;&#x4E0B;&#x7684;&#x5706;&#x5F27;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;
    radius: F2.Util.mix({}, defaultAxis, {
      labelOffset: 4
    }) // &#x6781;&#x5750;&#x6807;&#x4E0B;&#x7684;&#x534A;&#x5F84;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;
  }, // &#x5404;&#x79CD;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;
  shape: {
    line: {
      lineWidth: 2, // &#x7EBF;&#x7684;&#x9ED8;&#x8BA4;&#x5BBD;&#x5EA6;
      lineJoin: &apos;round&apos;,
      lineCap: &apos;round&apos;
    }, // &#x7EBF;&#x56FE;&#x6837;&#x5F0F;&#x914D;&#x7F6E;
    point: {
      lineWidth: 0,
      size: 3 // &#x5706;&#x7684;&#x9ED8;&#x8BA4;&#x534A;&#x5F84;
    }, // &#x70B9;&#x56FE;&#x6837;&#x5F0F;&#x914D;&#x7F6E;
    area: {
      fillOpacity: 0.1
    } // &#x533A;&#x57DF;&#x56FE;&#x6837;&#x5F0F;&#x914D;&#x7F6E;
  },
  legend: {
    right: F2.Util.mix({}, DEFAULT_CFG),
    left: F2.Util.mix({}, DEFAULT_CFG),
    top: F2.Util.mix({}, DEFAULT_CFG),
    bottom: F2.Util.mix({}, DEFAULT_CFG),
    marker: {
      symbol: &apos;circle&apos;, // marker &#x7684;&#x5F62;&#x72B6;
      radius: 10 // &#x534A;&#x5F84;&#x5927;&#x5C0F;
    }
  },
  tooltip: {
    triggerOn: [ &apos;touchstart&apos;, &apos;touchmove&apos; ],
    // triggerOff: &apos;touchend&apos;,
    showTitle: false,
    showCrosshairs: false,
    crosshairsStyle: {
      stroke: &apos;rgba(0, 0, 0, 0.25)&apos;,
      lineWidth: 2
    },
    showTooltipMarker: true,
    background: {
      radius: 1,
      fill: &apos;rgba(0, 0, 0, 0.65)&apos;,
      padding: [ 3, 5 ]
    },
    titleStyle: {
      fontSize: 26,
      fill: &apos;#fff&apos;,
      textAlign: &apos;start&apos;,
      textBaseline: &apos;top&apos;
    },
    nameStyle: {
      fontSize: 26,
      fill: &apos;rgba(255, 255, 255, 0.65)&apos;,
      textAlign: &apos;start&apos;,
      textBaseline: &apos;middle&apos;
    },
    valueStyle: {
      fontSize: 26,
      fill: &apos;#fff&apos;,
      textAlign: &apos;start&apos;,
      textBaseline: &apos;middle&apos;
    },
    showItemMarker: true,
    itemMarkerStyle: {
      radius: 5,
      symbol: &apos;circle&apos;,
      lineWidth: 1,
      stroke: &apos;#fff&apos;
    },
    layout: &apos;horizontal&apos;
  },
  _defaultAxis: defaultAxis // &#x7528;&#x4E8E;&#x83B7;&#x53D6;&#x9ED8;&#x8BA4;&#x7684;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;
};

F2.Global.setTheme(Theme);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">color1</span> <span class="hljs-string">=</span> <span class="hljs-string">&apos;#E8E8E8&apos;</span><span class="hljs-string">;</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x5750;&#x6807;&#x8F74;&#x7EBF;&#x3001;&#x5750;&#x6807;&#x8F74;&#x7F51;&#x683C;&#x7EBF;&#x7684;&#x989C;&#x8272;</span>
<span class="hljs-string">const</span> <span class="hljs-string">color2</span> <span class="hljs-string">=</span> <span class="hljs-string">&apos;#333333&apos;</span><span class="hljs-string">;</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x5B57;&#x4F53;&#x989C;&#x8272;</span>
<span class="hljs-string">//</span> <span class="hljs-string">&#x5750;&#x6807;&#x8F74;&#x7684;&#x9ED8;&#x8BA4;&#x6837;&#x5F0F;&#x914D;&#x7F6E;</span>
<span class="hljs-string">const</span> <span class="hljs-string">defaultAxis</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  label:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    fill:</span> <span class="hljs-string">color2,</span>
<span class="hljs-attr">    fontSize:</span> <span class="hljs-number">24</span>
  <span class="hljs-string">},</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x5750;&#x6807;&#x8F74;&#x6587;&#x672C;&#x7684;&#x6837;&#x5F0F;</span>
<span class="hljs-attr">  line:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    stroke:</span> <span class="hljs-string">color1,</span>
<span class="hljs-attr">    lineWidth:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">    top:</span> <span class="hljs-literal">true</span>
  <span class="hljs-string">},</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x5750;&#x6807;&#x8F74;&#x7EBF;&#x7684;&#x6837;&#x5F0F;</span>
<span class="hljs-attr">  grid:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    stroke:</span> <span class="hljs-string">color1,</span>
<span class="hljs-attr">    lineWidth:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">    lineDash:</span> <span class="hljs-string">[</span> <span class="hljs-number">2</span> <span class="hljs-string">]</span>
  <span class="hljs-string">},</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x5750;&#x6807;&#x8F74;&#x7F51;&#x683C;&#x7EBF;&#x7684;&#x6837;&#x5F0F;</span>
<span class="hljs-attr">  tickLine:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x5750;&#x6807;&#x8F74;&#x523B;&#x5EA6;&#x7EBF;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E0D;&#x5C55;&#x793A;</span>
<span class="hljs-attr">  labelOffset:</span> <span class="hljs-number">7.5</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x5750;&#x6807;&#x8F74;&#x6587;&#x672C;&#x8DDD;&#x79BB;&#x5750;&#x6807;&#x8F74;&#x7EBF;&#x7684;&#x8DDD;&#x79BB;</span>
<span class="hljs-string">};</span>

<span class="hljs-string">const</span> <span class="hljs-string">DEFAULT_CFG</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  itemMarginBottom:</span> <span class="hljs-number">12</span><span class="hljs-string">,</span>
<span class="hljs-attr">  itemGap:</span> <span class="hljs-number">10</span><span class="hljs-string">,</span>
<span class="hljs-attr">  showTitle:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">  titleStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    fontSize:</span> <span class="hljs-number">26</span><span class="hljs-string">,</span>
<span class="hljs-attr">    fill:</span> <span class="hljs-string">color2,</span>
<span class="hljs-attr">    textAlign:</span> <span class="hljs-string">&apos;start&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">    textBaseline:</span> <span class="hljs-string">&apos;top&apos;</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  nameStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    fill:</span> <span class="hljs-string">color2,</span>
<span class="hljs-attr">    fontSize:</span> <span class="hljs-number">24</span><span class="hljs-string">,</span>
<span class="hljs-attr">    textAlign:</span> <span class="hljs-string">&apos;start&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">    textBaseline:</span> <span class="hljs-string">&apos;middle&apos;</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  valueStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    fill:</span> <span class="hljs-string">color2,</span>
<span class="hljs-attr">    fontSize:</span> <span class="hljs-number">24</span><span class="hljs-string">,</span>
<span class="hljs-attr">    textAlign:</span> <span class="hljs-string">&apos;start&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">    textBaseline:</span> <span class="hljs-string">&apos;middle&apos;</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  unCheckStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    fill:</span> <span class="hljs-string">&apos;#bfbfbf&apos;</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  itemWidth:</span> <span class="hljs-string">&apos;auto&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">  wordSpace:</span> <span class="hljs-number">6</span><span class="hljs-string">,</span>
<span class="hljs-attr">  selectedMode:</span> <span class="hljs-string">&apos;multiple&apos;</span> <span class="hljs-string">//</span> <span class="hljs-string">&apos;multiple&apos;</span> <span class="hljs-string">or</span> <span class="hljs-string">&apos;single&apos;</span>
<span class="hljs-string">};</span>

<span class="hljs-string">const</span> <span class="hljs-string">Theme</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  fontFamily:</span> <span class="hljs-string">&apos;&quot;Helvetica Neue&quot;, &quot;San Francisco&quot;, Helvetica, Tahoma, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Heiti SC&quot;, &quot;Microsoft YaHei&quot;, sans-serif&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x9ED8;&#x8BA4;&#x5B57;&#x4F53;</span>
<span class="hljs-attr">  defaultColor:</span> <span class="hljs-string">&apos;#1890FF&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x9ED8;&#x8BA4;&#x989C;&#x8272;</span>
<span class="hljs-attr">  pixelRatio:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x9ED8;&#x8BA4;&#x50CF;&#x7D20;&#x6BD4;&#xFF0C;&#x5177;&#x4F53;&#x53C2;&#x6570;&#x7531;&#x7528;&#x6237;&#x81EA;&#x5DF1;&#x8BBE;&#x7F6E;</span>
<span class="hljs-attr">  padding:</span> <span class="hljs-string">&apos;auto&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x56FE;&#x8868;&#x8FB9;&#x8DDD;&#xFF0C;&#x9ED8;&#x8BA4;&#x81EA;&#x52A8;&#x8BA1;&#x7B97;</span>
<span class="hljs-attr">  appendPadding:</span> <span class="hljs-number">18</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x9ED8;&#x8BA4;&#x7559;&#x767D;&#xFF0C;15</span> <span class="hljs-string">&#x50CF;&#x7D20;</span>
<span class="hljs-attr">  colors:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">&apos;#1890FF&apos;</span><span class="hljs-string">,</span>
    <span class="hljs-string">&apos;#2FC25B&apos;</span><span class="hljs-string">,</span>
    <span class="hljs-string">&apos;#FACC14&apos;</span><span class="hljs-string">,</span>
    <span class="hljs-string">&apos;#223273&apos;</span><span class="hljs-string">,</span>
    <span class="hljs-string">&apos;#8543E0&apos;</span><span class="hljs-string">,</span>
    <span class="hljs-string">&apos;#13C2C2&apos;</span><span class="hljs-string">,</span>
    <span class="hljs-string">&apos;#3436C7&apos;</span><span class="hljs-string">,</span>
    <span class="hljs-string">&apos;#F04864&apos;</span>
  <span class="hljs-string">],</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x9ED8;&#x8BA4;&#x8272;&#x7CFB;</span>
<span class="hljs-attr">  shapes:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    line:</span> <span class="hljs-string">[</span> <span class="hljs-string">&apos;line&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;dash&apos;</span> <span class="hljs-string">],</span>
<span class="hljs-attr">    point:</span> <span class="hljs-string">[</span> <span class="hljs-string">&apos;circle&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;hollowCircle&apos;</span> <span class="hljs-string">]</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  sizes:</span> <span class="hljs-string">[</span> <span class="hljs-number">4</span><span class="hljs-string">,</span> <span class="hljs-number">10</span> <span class="hljs-string">],</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x9ED8;&#x8BA4;&#x7684;&#x5927;&#x5C0F;&#x8303;&#x56F4;</span>
<span class="hljs-attr">  axis:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    bottom:</span> <span class="hljs-string">F2.Util.mix({},</span> <span class="hljs-string">defaultAxis,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      grid:</span> <span class="hljs-literal">null</span>
    <span class="hljs-string">}),</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x5E95;&#x90E8;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;</span>
<span class="hljs-attr">    left:</span> <span class="hljs-string">F2.Util.mix({},</span> <span class="hljs-string">defaultAxis,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      line:</span> <span class="hljs-literal">null</span>
    <span class="hljs-string">}),</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x5DE6;&#x4FA7;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;</span>
<span class="hljs-attr">    right:</span> <span class="hljs-string">F2.Util.mix({},</span> <span class="hljs-string">defaultAxis,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      line:</span> <span class="hljs-literal">null</span>
    <span class="hljs-string">}),</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x53F3;&#x4FA7;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;</span>
<span class="hljs-attr">    circle:</span> <span class="hljs-string">F2.Util.mix({},</span> <span class="hljs-string">defaultAxis,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      line:</span> <span class="hljs-literal">null</span>
    <span class="hljs-string">}),</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x6781;&#x5750;&#x6807;&#x4E0B;&#x7684;&#x5706;&#x5F27;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;</span>
<span class="hljs-attr">    radius:</span> <span class="hljs-string">F2.Util.mix({},</span> <span class="hljs-string">defaultAxis,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      labelOffset:</span> <span class="hljs-number">4</span>
    <span class="hljs-string">})</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x6781;&#x5750;&#x6807;&#x4E0B;&#x7684;&#x534A;&#x5F84;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;</span>
  <span class="hljs-string">},</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x5404;&#x79CD;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;</span>
<span class="hljs-attr">  shape:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    line:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      lineWidth:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x7EBF;&#x7684;&#x9ED8;&#x8BA4;&#x5BBD;&#x5EA6;</span>
<span class="hljs-attr">      lineJoin:</span> <span class="hljs-string">&apos;round&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      lineCap:</span> <span class="hljs-string">&apos;round&apos;</span>
    <span class="hljs-string">},</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x7EBF;&#x56FE;&#x6837;&#x5F0F;&#x914D;&#x7F6E;</span>
<span class="hljs-attr">    point:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      lineWidth:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">      size:</span> <span class="hljs-number">3</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x5706;&#x7684;&#x9ED8;&#x8BA4;&#x534A;&#x5F84;</span>
    <span class="hljs-string">},</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x70B9;&#x56FE;&#x6837;&#x5F0F;&#x914D;&#x7F6E;</span>
<span class="hljs-attr">    area:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      fillOpacity:</span> <span class="hljs-number">0.1</span>
    <span class="hljs-string">}</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x533A;&#x57DF;&#x56FE;&#x6837;&#x5F0F;&#x914D;&#x7F6E;</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  legend:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    right:</span> <span class="hljs-string">F2.Util.mix({},</span> <span class="hljs-string">DEFAULT_CFG),</span>
<span class="hljs-attr">    left:</span> <span class="hljs-string">F2.Util.mix({},</span> <span class="hljs-string">DEFAULT_CFG),</span>
<span class="hljs-attr">    top:</span> <span class="hljs-string">F2.Util.mix({},</span> <span class="hljs-string">DEFAULT_CFG),</span>
<span class="hljs-attr">    bottom:</span> <span class="hljs-string">F2.Util.mix({},</span> <span class="hljs-string">DEFAULT_CFG),</span>
<span class="hljs-attr">    marker:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      symbol:</span> <span class="hljs-string">&apos;circle&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">marker</span> <span class="hljs-string">&#x7684;&#x5F62;&#x72B6;</span>
<span class="hljs-attr">      radius:</span> <span class="hljs-number">10</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x534A;&#x5F84;&#x5927;&#x5C0F;</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  tooltip:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    triggerOn:</span> <span class="hljs-string">[</span> <span class="hljs-string">&apos;touchstart&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;touchmove&apos;</span> <span class="hljs-string">],</span>
    <span class="hljs-string">//</span> <span class="hljs-attr">triggerOff:</span> <span class="hljs-string">&apos;touchend&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">    showTitle:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    showCrosshairs:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    crosshairsStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      stroke:</span> <span class="hljs-string">&apos;rgba(0, 0, 0, 0.25)&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      lineWidth:</span> <span class="hljs-number">2</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    showTooltipMarker:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    background:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      radius:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">      fill:</span> <span class="hljs-string">&apos;rgba(0, 0, 0, 0.65)&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      padding:</span> <span class="hljs-string">[</span> <span class="hljs-number">3</span><span class="hljs-string">,</span> <span class="hljs-number">5</span> <span class="hljs-string">]</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    titleStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      fontSize:</span> <span class="hljs-number">26</span><span class="hljs-string">,</span>
<span class="hljs-attr">      fill:</span> <span class="hljs-string">&apos;#fff&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      textAlign:</span> <span class="hljs-string">&apos;start&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      textBaseline:</span> <span class="hljs-string">&apos;top&apos;</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    nameStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      fontSize:</span> <span class="hljs-number">26</span><span class="hljs-string">,</span>
<span class="hljs-attr">      fill:</span> <span class="hljs-string">&apos;rgba(255, 255, 255, 0.65)&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      textAlign:</span> <span class="hljs-string">&apos;start&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      textBaseline:</span> <span class="hljs-string">&apos;middle&apos;</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    valueStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      fontSize:</span> <span class="hljs-number">26</span><span class="hljs-string">,</span>
<span class="hljs-attr">      fill:</span> <span class="hljs-string">&apos;#fff&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      textAlign:</span> <span class="hljs-string">&apos;start&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      textBaseline:</span> <span class="hljs-string">&apos;middle&apos;</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    showItemMarker:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    itemMarkerStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      radius:</span> <span class="hljs-number">5</span><span class="hljs-string">,</span>
<span class="hljs-attr">      symbol:</span> <span class="hljs-string">&apos;circle&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      lineWidth:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">      stroke:</span> <span class="hljs-string">&apos;#fff&apos;</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    layout:</span> <span class="hljs-string">&apos;horizontal&apos;</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  _defaultAxis:</span> <span class="hljs-string">defaultAxis</span> <span class="hljs-string">//</span> <span class="hljs-string">&#x7528;&#x4E8E;&#x83B7;&#x53D6;&#x9ED8;&#x8BA4;&#x7684;&#x5750;&#x6807;&#x8F74;&#x914D;&#x7F6E;</span>
<span class="hljs-string">};</span>

<span class="hljs-string">F2.Global.setTheme(Theme);</span></code></pre><p>&#x6700;&#x540E;&#x4E3A;F2&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;Renderer&#x7C7B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="F2.Renderer = Renderer;
export default F2;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code>F2.Renderer = Renderer<span class="hljs-comment">;</span>
export default F2<span class="hljs-comment">;</span></code></pre><hr><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5199;&#x4E2A;DEMO&#x628A;&#x56FE;&#x8868;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;gcanvas ref=&quot;canvas_1&quot; style=&quot;width:750px;height:400px;&quot;&gt;&lt;/gcanvas&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">gcanvas</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;canvas_1&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;width:750px;height:400px;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">gcanvas</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {enable, WeexBridge, Image as GImage} from &quot;gcanvas.js&quot;;
import F2 from &apos;./chart&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> {enable, WeexBridge, Image <span class="hljs-keyword">as</span> GImage} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;gcanvas.js&quot;</span>;
<span class="hljs-keyword">import</span> F2 <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./chart&apos;</span>;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setBarChart() {
  let ref = this.$refs.canvas_1;
  ref = enable(ref, {bridge: WeexBridge});
  let ctx = ref.getContext(&quot;2d&quot;);
  const canvas = new F2.Renderer(ctx); //&#x4F7F;&#x7528;&#x5C01;&#x88C5;&#x597D;&#x7684;Renderer&#x7C7B;&#x5339;&#x914D;canvas&#x4E0A;&#x4E0B;&#x6587;
  const chart = new F2.Chart({
    el: canvas, // &#x5C06;&#x7B2C;&#x4E09;&#x6B65;&#x521B;&#x5EFA;&#x7684; canvas &#x5BF9;&#x8C61;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x4F20;&#x5165;
    width: 750, // &#x5FC5;&#x9009;&#xFF0C;&#x56FE;&#x8868;&#x5BBD;&#x5EA6;&#xFF0C;&#x540C; canvas &#x7684;&#x5BBD;&#x5EA6;&#x76F8;&#x540C;
    height: 400 // &#x5FC5;&#x9009;&#xFF0C;&#x56FE;&#x8868;&#x9AD8;&#x5EA6;&#xFF0C;&#x540C; canvas &#x7684;&#x9AD8;&#x5EA6;&#x76F8;&#x540C;
  });
  chart.source(data1);
  // Step 3&#xFF1A;&#x521B;&#x5EFA;&#x56FE;&#x5F62;&#x8BED;&#x6CD5;&#xFF0C;&#x7ED8;&#x5236;&#x67F1;&#x72B6;&#x56FE;&#xFF0C;&#x7531; genre &#x548C; sold &#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x51B3;&#x5B9A;&#x56FE;&#x5F62;&#x4F4D;&#x7F6E;&#xFF0C;genre &#x6620;&#x5C04;&#x81F3; x &#x8F74;&#xFF0C;sold &#x6620;&#x5C04;&#x81F3; y &#x8F74;
  chart.interval().position(&apos;genre*sold&apos;).color(&apos;genre&apos;);
  chart.legend(&apos;genre&apos;, {
    marker: {
      radius: 6 // &#x534A;&#x5F84;&#x5927;&#x5C0F;
    }
  });
  // Step 4: &#x6E32;&#x67D3;&#x56FE;&#x8868;
  chart.render();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>setBarChart() {
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">ref</span> = <span class="hljs-keyword">this</span>.$refs.canvas_1;
  <span class="hljs-keyword">ref</span> = enable(<span class="hljs-keyword">ref</span>, {bridge: WeexBridge});
  <span class="hljs-keyword">let</span> ctx = <span class="hljs-keyword">ref</span>.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-keyword">new</span> F2.Renderer(ctx); <span class="hljs-comment">//&#x4F7F;&#x7528;&#x5C01;&#x88C5;&#x597D;&#x7684;Renderer&#x7C7B;&#x5339;&#x914D;canvas&#x4E0A;&#x4E0B;&#x6587;</span>
  <span class="hljs-keyword">const</span> chart = <span class="hljs-keyword">new</span> F2.Chart({
    el: canvas, <span class="hljs-comment">// &#x5C06;&#x7B2C;&#x4E09;&#x6B65;&#x521B;&#x5EFA;&#x7684; canvas &#x5BF9;&#x8C61;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x4F20;&#x5165;</span>
    width: <span class="hljs-number">750</span>, <span class="hljs-comment">// &#x5FC5;&#x9009;&#xFF0C;&#x56FE;&#x8868;&#x5BBD;&#x5EA6;&#xFF0C;&#x540C; canvas &#x7684;&#x5BBD;&#x5EA6;&#x76F8;&#x540C;</span>
    height: <span class="hljs-number">400</span> <span class="hljs-comment">// &#x5FC5;&#x9009;&#xFF0C;&#x56FE;&#x8868;&#x9AD8;&#x5EA6;&#xFF0C;&#x540C; canvas &#x7684;&#x9AD8;&#x5EA6;&#x76F8;&#x540C;</span>
  });
  chart.source(data1);
  <span class="hljs-comment">// Step 3&#xFF1A;&#x521B;&#x5EFA;&#x56FE;&#x5F62;&#x8BED;&#x6CD5;&#xFF0C;&#x7ED8;&#x5236;&#x67F1;&#x72B6;&#x56FE;&#xFF0C;&#x7531; genre &#x548C; sold &#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x51B3;&#x5B9A;&#x56FE;&#x5F62;&#x4F4D;&#x7F6E;&#xFF0C;genre &#x6620;&#x5C04;&#x81F3; x &#x8F74;&#xFF0C;sold &#x6620;&#x5C04;&#x81F3; y &#x8F74;</span>
  chart.interval().position(<span class="hljs-string">&apos;genre*sold&apos;</span>).color(<span class="hljs-string">&apos;genre&apos;</span>);
  chart.legend(<span class="hljs-string">&apos;genre&apos;</span>, {
    marker: {
      radius: <span class="hljs-number">6</span> <span class="hljs-comment">// &#x534A;&#x5F84;&#x5927;&#x5C0F;</span>
    }
  });
  <span class="hljs-comment">// Step 4: &#x6E32;&#x67D3;&#x56FE;&#x8868;</span>
  chart.render();
}</code></pre><p>&#x542F;&#x8D77;&#x6765;&#x540E;&#x7528;palyground&#x626B;&#x63CF;&#x4E00;&#x4E0B;&#x5C31;&#x80FD;&#x770B;&#x6548;&#x679C;&#x4E86;&#x3002;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;palyground&#x5DF2;&#x7ECF;&#x96C6;&#x6210;GCanvas sdk&#x4E86;&#x3002;&#x5982;&#x679C;&#x4F60;&#x7684;weex&#x5E94;&#x7528;&#x6CA1;&#x6709;&#x96C6;&#x6210;GCanvas sdk&#xFF0C;&#x4E5F;&#x662F;&#x6E32;&#x67D3;&#x4E0D;&#x4E86;&#x7684;&#xFF0C;&#x96C6;&#x6210;&#x65B9;&#x6CD5;&#x5728;&#x8FD9;&#x91CC;<a href="https://alibaba.github.io/GCanvas/docs/Integrate%20GCanvas%20on%20Weex.html" rel="nofollow noreferrer" target="_blank">GCanvas</a></p><p><span class="img-wrap"><img data-src="/img/bVbcQ3G?w=750&amp;h=1334" src="https://static.alili.tech/img/bVbcQ3G?w=750&amp;h=1334" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x56FE;&#x8868;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x53C2;&#x8003;<a href="http://antv.alipay.com/zh-cn/f2/3.x/index.html" rel="nofollow noreferrer" target="_blank">@antv F2</a>&#xFF0C;&#x57FA;&#x672C;&#x4E0A;H5&#x80FD;&#x753B;&#x7684;&#x56FE;&#x8868;&#xFF0C;weex&#x90FD;&#x80FD;&#x753B;&#xFF0C;&#x53EA;&#x662F;&#x4E00;&#x4E9B;&#x4F7F;&#x7528;Dom&#x7684;&#x529F;&#x80FD;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;tooltip &#xFF0C;&#x6240;&#x4EE5;&#x5199;&#x4E86; tooltip &#x65B9;&#x6CD5;&#x53BB;touchstart</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touchstart(ev) {
                const plot = this.chart.get(&apos;plotRange&apos;);
                const { x, y } = F2.Util.createEvent(ev, this.chart);
                /*if (!(x &gt;= plot.tl.x &amp;&amp; x &lt;= plot.tr.x &amp;&amp; y &gt;= plot.tl.y &amp;&amp; y &lt;= plot.br.y)) { // not in chart plot
                  this.chart.hideTooltip();
                  return;
                }*/
                const lastTimeStamp = this.timeStamp;
                const timeStamp = +new Date();
                if ((timeStamp - lastTimeStamp) &gt; 16) {
                    this.chart.showTooltip({ x, y });
                    this.timeStamp = timeStamp;
                }
            },
            touchend(ev){
                this.chart.hideTooltip();
            }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>touchstart(ev) {
                const plot = <span class="hljs-keyword">this</span>.chart.<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;plotRange&apos;</span>);
                const { x, y } = F2.Util.createEvent(ev, <span class="hljs-keyword">this</span>.chart);
                <span class="hljs-comment">/*if (!(x &gt;= plot.tl.x &amp;&amp; x &lt;= plot.tr.x &amp;&amp; y &gt;= plot.tl.y &amp;&amp; y &lt;= plot.br.y)) { // not in chart plot
                  this.chart.hideTooltip();
                  return;
                }*/</span>
                const lastTimeStamp = <span class="hljs-keyword">this</span>.timeStamp;
                const timeStamp = +new Date();
                <span class="hljs-keyword">if</span> ((timeStamp - lastTimeStamp) &gt; <span class="hljs-number">16</span>) {
                    <span class="hljs-keyword">this</span>.chart.showTooltip({ x, y });
                    <span class="hljs-keyword">this</span>.timeStamp = timeStamp;
                }
            },
            touchend(ev){
                <span class="hljs-keyword">this</span>.chart.hideTooltip();
            }</code></pre><hr><h1 id="articleHeader0">&#x8BE6;&#x7EC6;&#x7684;<a href="https://github.com/zouyn/weex-F2-demo" rel="nofollow noreferrer" target="_blank">demo</a>&#x5728;&#x6B64;&#xFF0C;</h1><p>&#x5C01;&#x88C5;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x4E3B;&#x8981;&#x8FD8;&#x662F;F2&#x591A;&#x7AEF;&#x652F;&#x6301;&#x4E0D;&#x9519;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在weex里面使用chart图表

## 原文链接
[https://segmentfault.com/a/1190000015418640](https://segmentfault.com/a/1190000015418640)

