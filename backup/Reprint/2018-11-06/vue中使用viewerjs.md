---
title: vue中使用viewerjs
hidden: true
categories: [reprint]
slug: 5ca6fcf0
date: 2018-11-06 02:30:12
---

{{< raw >}}
<h2 id="articleHeader0">&#x9879;&#x76EE;&#x521B;&#x5EFA;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack mytest001" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nginx"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">vue</span> init webpack mytest001</code></pre><h2 id="articleHeader1">&#x5B89;&#x88C5;viewerjs</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install viewerjs" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> viewerjs</code></pre><p>&#x5220;&#x6389;&#x751F;&#x6210;&#x7684;&#x9879;&#x76EE;&#x91CC;&#x9762;&#x7684;helloWord.vue &#x4FEE;&#x6539;&#x8DEF;&#x7531; &#x521B;&#x5EFA;&#x4E00;&#x4E2A;index.vue</p><p>index.vue&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div id=&quot;index&quot;&gt;
    &lt;ul&gt;
      &lt;li v-for=&quot;(item,index) of imgArr&quot;&gt;&lt;img :src=&quot;item&quot; alt=&quot;&#x56FE;&#x7247;&#x63CF;&#x8FF0;&quot;&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import Viewer from &apos;viewerjs&apos;;
  import &apos;viewerjs/dist/viewer.css&apos;;

  export default {
    name: &apos;HelloWorld&apos;,
    data() {
      return {
        imgArr:[
          &apos;https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3472263623,506218584&amp;fm=26&amp;gp=0.jpg&apos;,
          &apos;http://www.sinaimg.cn/dy/slidenews/21_img/2015_17/2236_4146071_705561.jpg&apos;,
          &apos;http://www.sinaimg.cn/dy/slidenews/21_img/2015_17/2236_4146072_346494.jpg&apos;
        ]
      }
    },
    mounted(){
      const ViewerDom = document.getElementById(&apos;index&apos;);
      const viewer = new Viewer(ViewerDom, {
        // &#x76F8;&#x5173;&#x914D;&#x7F6E;&#x9879;,&#x8BE6;&#x60C5;&#x89C1;&#x4E0B;&#x9762;
      });
    }
  }
&lt;/script&gt;

&lt;style&gt;
  *{
    padding:0;
    margin: 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  ul li{
    width:265px;
    height: 180px;
    list-style: none;
    border:2px solid #CCC;
    border-radius: 3px;
    padding: 1px;
    margin: 10px;
    cursor: pointer;
  }
  ul li img{
    width:100%;
    height: 100%;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;index&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item,index) of imgArr&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;item&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&#x56FE;&#x7247;&#x63CF;&#x8FF0;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Viewer <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;viewerjs&apos;</span>;
  <span class="hljs-keyword">import</span> <span class="hljs-string">&apos;viewerjs/dist/viewer.css&apos;</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;HelloWorld&apos;</span>,
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">imgArr</span>:[
          <span class="hljs-string">&apos;https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3472263623,506218584&amp;fm=26&amp;gp=0.jpg&apos;</span>,
          <span class="hljs-string">&apos;http://www.sinaimg.cn/dy/slidenews/21_img/2015_17/2236_4146071_705561.jpg&apos;</span>,
          <span class="hljs-string">&apos;http://www.sinaimg.cn/dy/slidenews/21_img/2015_17/2236_4146072_346494.jpg&apos;</span>
        ]
      }
    },
    mounted(){
      <span class="hljs-keyword">const</span> ViewerDom = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;index&apos;</span>);
      <span class="hljs-keyword">const</span> viewer = <span class="hljs-keyword">new</span> Viewer(ViewerDom, {
        <span class="hljs-comment">// &#x76F8;&#x5173;&#x914D;&#x7F6E;&#x9879;,&#x8BE6;&#x60C5;&#x89C1;&#x4E0B;&#x9762;</span>
      });
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  *{
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  }
  <span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-wrap</span>: wrap;
  }
  <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">265px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">180px</span>;
    <span class="hljs-attribute">list-style</span>: none;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#CCC</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">1px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
  }
  <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><h2 id="articleHeader2">&#x952E;&#x76D8;&#x4E8B;&#x4EF6;</h2><p>&#x4EC5;&#x5728;modal mode&#x4E0B;&#x53EF;&#x7528;<br><code>ESC</code> &#x952E;: &#x9000;&#x51FA;&#x5168;&#x5C4F;/&#x5173;&#x95ED;/&#x9000;&#x51FA;/&#x505C;&#x6B62;&#x64AD;&#x653E;;<br><code>Space</code> &#x952E;: &#x505C;&#x6B62;/&#x64AD;&#x653E;;<br><code>&#x2190;</code>&#x952E;: &#x67E5;&#x770B;&#x4E0A;&#x4E00;&#x5F20;&#x56FE;&#x7247;;<br><code>&#x2192;</code>&#x952E;: &#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#x56FE;&#x7247;;<br><code>&#x2191;</code>&#x952E;: &#x653E;&#x5927;&#x56FE;&#x7247;;<br><code>&#x2193;</code>&#x952E;: &#x7F29;&#x5C0F;&#x56FE;&#x7247;;<br><code>Ctrl + 0</code> &#x7EC4;&#x5408;&#x952E;: &#x7F29;&#x5C0F;&#x5230;&#x521D;&#x59CB;&#x5927;&#x5C0F;;<br><code>Ctrl + 1</code> &#x7EC4;&#x5408;&#x952E;: &#x653E;&#x5927;&#x5230;&#x539F;&#x59CB;&#x5927;&#x5C0F;;</p><h2 id="articleHeader3">&#x914D;&#x7F6E;&#x53C2;&#x6570;</h2><p>&#x5982;&#x679C;&#x8981;&#x66F4;&#x6539;&#x5168;&#x5C40;&#x9ED8;&#x8BA4;&#x9009;&#x9879;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;view . setdefaults(&#x9009;&#x9879;)</p><table><thead><tr><th align="left">&#x53C2;&#x6570;&#x540D;&#x79F0;</th><th align="left">&#x53C2;&#x6570;&#x7C7B;&#x578B;</th><th align="left">&#x9ED8;&#x8BA4;&#x503C;</th><th align="left">&#x8BF4;&#x660E;</th></tr></thead><tbody><tr><td align="left">initialViewIndex</td><td align="left">Number</td><td align="left">0</td><td align="left">&#x5B9A;&#x4E49;&#x7528;&#x4E8E;&#x67E5;&#x770B;&#x7684;&#x56FE;&#x50CF;&#x7684;&#x521D;&#x59CB;&#x7D22;&#x5F15;</td></tr><tr><td align="left">inline</td><td align="left">Boolean</td><td align="left">false</td><td align="left">&#x652F;&#x6301; inline mode</td></tr><tr><td align="left">button</td><td align="left">Boolean</td><td align="left">true</td><td align="left">&#x662F;&#x5426;&#x663E;&#x793A;&#x67E5;&#x770B;&#x56FE;&#x7247;&#x65F6;&#x53F3;&#x4E0A;&#x89D2;&#x7684;&#x5173;&#x95ED;&#x6309;&#x94AE;</td></tr><tr><td align="left">navbar</td><td align="left">Boolean / Number</td><td align="left">true</td><td align="left">&#x662F;&#x5426;&#x663E;&#x793A;&#x5E95;&#x90E8;&#x5BFC;&#x822A;&#x680F;<br><code>0</code> &#x6216;&#x8005; <code>false</code> :&#x4E0D;&#x663E;&#x793A;<br><code>1</code> &#x6216;&#x8005; <code>true</code> :&#x663E;&#x793A;<br><code>2</code>:&#x5F53;&#x5C4F;&#x5E55;&#x5BBD;&#x5EA6;&#x5927;&#x4E8E;768px&#x65F6;&#x663E;&#x793A;<br><code>3</code>:&#x5F53;&#x5C4F;&#x5E55;&#x5BBD;&#x5EA6;&#x5927;&#x4E8E;992px&#x65F6;&#x663E;&#x793A;<br><code>4</code>:&#x5F53;&#x5C4F;&#x5E55;&#x5BBD;&#x5EA6;&#x5927;&#x4E8E;1200px&#x65F6;&#x663E;&#x793A;</td></tr><tr><td align="left">title</td><td align="left">Boolean / Number /<br>Function / Array</td><td align="left">true</td><td align="left"><code>0</code> &#x6216;&#x8005; <code>false</code> &#x65F6;&#x4E0D;&#x663E;&#x793A;<br><code>1</code>&#x6216;&#x8005;<code>true</code>&#x6216;&#x8005;<code>function</code>&#x6216;&#x8005;<code>array</code>&#x65F6;&#x663E;&#x793A;<br><code>2</code>:&#x5F53;&#x5C4F;&#x5E55;&#x5BBD;&#x5EA6;&#x5927;&#x4E8E;768px&#x65F6;&#x663E;&#x793A;<br><code>3</code>:&#x5F53;&#x5C4F;&#x5E55;&#x5BBD;&#x5EA6;&#x5927;&#x4E8E;992px&#x65F6;&#x663E;&#x793A;<br><code>4</code>:&#x5F53;&#x5C4F;&#x5E55;&#x5BBD;&#x5EA6;&#x5927;&#x4E8E;1200px&#x65F6;&#x663E;&#x793A;<br><code>function</code> &#x5728;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x8FD4;&#x56DE;&#x6807;&#x9898;<br><code>array</code> &#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x8868;&#x793A;&#x53EF;&#x89C1;&#x6027;(0-4) &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x5C31;&#x662F;&#x6807;&#x9898;</td></tr><tr><td align="left">toolbar</td><td align="left">Boolean / Number / Object</td><td align="left">true</td><td align="left">&#x6807;&#x9898;&#x680F;&#x662F;&#x5426;&#x663E;&#x793A;&#x548C;&#x5E03;&#x5C40;<br><code>0</code> &#x6216;&#x8005; <code>false</code> &#x65F6;&#x4E0D;&#x663E;&#x793A;<br><code>1</code>&#x6216;&#x8005;<code>true</code>&#x6216;&#x8005;&#x65F6;&#x663E;&#x793A;<br><code>2</code>:&#x5F53;&#x5C4F;&#x5E55;&#x5BBD;&#x5EA6;&#x5927;&#x4E8E;768px&#x65F6;&#x663E;&#x793A;<br><code>3</code>:&#x5F53;&#x5C4F;&#x5E55;&#x5BBD;&#x5EA6;&#x5927;&#x4E8E;992px&#x65F6;&#x663E;&#x793A;<br><code>4</code>:&#x5F53;&#x5C4F;&#x5E55;&#x5BBD;&#x5EA6;&#x5927;&#x4E8E;1200px&#x65F6;&#x663E;&#x793A;<br><code>Object</code> : <a href="#articleHeader2">Object&#x7C7B;&#x578B;&#x8BE6;&#x89E3;</a></td></tr><tr><td align="left">tooltip</td><td align="left">Boolean</td><td align="left">true</td><td align="left">&#x653E;&#x5927;&#x6216;&#x7F29;&#x5C0F;&#x65F6;&#x663E;&#x793A;&#x7684;&#x767E;&#x5206;&#x6BD4;&#x7684;&#x6587;&#x5B57;&#x63D0;&#x793A;<br><code>true</code> : &#x663E;&#x793A;<br><code>false</code> : &#x4E0D;&#x663E;&#x793A;</td></tr><tr><td align="left">movable</td><td align="left">Boolean</td><td align="left">true</td><td align="left">&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x62D6;&#x52A8;&#x56FE;&#x7247;</td></tr><tr><td align="left">zoomable</td><td align="left">Boolean</td><td align="left">true</td><td align="left">&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x7F29;&#x653E;&#x56FE;&#x7247;</td></tr><tr><td align="left">rotatable</td><td align="left">Boolean</td><td align="left">true</td><td align="left">&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x65CB;&#x8F6C;&#x56FE;&#x7247;</td></tr><tr><td align="left">scalable</td><td align="left">Boolean</td><td align="left">true</td><td align="left">&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x7F29;&#x653E;&#x56FE;&#x7247;</td></tr><tr><td align="left">transition</td><td align="left">Boolean</td><td align="left">true</td><td align="left">&#x4E3A;&#x4E00;&#x4E9B;&#x7279;&#x6B8A;&#x5143;&#x7D20;&#x542F;&#x7528;CSS3&#x8F6C;&#x6362;&#x3002;</td></tr><tr><td align="left">fullscreen</td><td align="left">Boolean</td><td align="left">true</td><td align="left">&#x5141;&#x8BB8;&#x5168;&#x5C4F;&#x64AD;&#x653E;</td></tr><tr><td align="left">keyboard</td><td align="left">Boolean</td><td align="left">true</td><td align="left">&#x542F;&#x7528;&#x952E;&#x76D8;&#x652F;&#x6301;</td></tr><tr><td align="left">backdrop</td><td align="left">Boolean / String</td><td align="left">true</td><td align="left">&#x542F;&#x7528; modal &#x4E3A;false&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x652F;&#x6301;&#x70B9;&#x51FB;&#x80CC;&#x666F;&#x5173;&#x95ED;</td></tr><tr><td align="left">loading</td><td align="left">Boolean</td><td align="left">true</td><td align="left">&#x52A0;&#x8F7D;&#x56FE;&#x7247;&#x7684;&#x65F6;&#x5019;&#x7684;loading&#x56FE;&#x6807;</td></tr><tr><td align="left">loop</td><td align="left">Boolean</td><td align="left">true</td><td align="left">&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x5FAA;&#x73AF;&#x67E5;&#x770B;&#x56FE;&#x7247;</td></tr><tr><td align="left">interval</td><td align="left">Number</td><td align="left">5000</td><td align="left">&#x5B9A;&#x4E49;&#x56FE;&#x7247;&#x67E5;&#x770B;&#x5668;&#x7684;&#x6700;&#x5C0F;&#x7684;&#x5BBD;&#x5EA6;</td></tr><tr><td align="left">minWidth</td><td align="left">Number</td><td align="left">200</td><td align="left">&#x5B9A;&#x4E49;&#x56FE;&#x7247;&#x67E5;&#x770B;&#x5668;&#x7684;&#x6700;&#x5C0F;&#x7684;&#x9AD8;&#x5EA6;</td></tr><tr><td align="left">minHeight</td><td align="left">Number</td><td align="left">100</td><td align="left">&#x64AD;&#x653E;&#x56FE;&#x7247;&#x65F6; &#x8DDD;&#x79BB;&#x4E0B;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#x7684;&#x95F4;&#x9694;&#x65F6;&#x95F4;</td></tr><tr><td align="left">zoomRatio</td><td align="left">Number</td><td align="left">0.1</td><td align="left">&#x5229;&#x7528;&#x9F20;&#x6807;&#x6EDA;&#x8F6E;&#x7F29;&#x653E;&#x56FE;&#x7247;&#x65F6;&#x7684;&#x6BD4;&#x4F8B;</td></tr><tr><td align="left">minZoomRatio</td><td align="left">Number</td><td align="left">0.01</td><td align="left">&#x7F29;&#x5C0F;&#x56FE;&#x7247;&#x7684;&#x6700;&#x5C0F;&#x6BD4;&#x4F8B;</td></tr><tr><td align="left">maxZoomRatio</td><td align="left">Number</td><td align="left">100</td><td align="left">&#x653E;&#x5927;&#x56FE;&#x7247;&#x7684;&#x653E;&#x5927;&#x6BD4;&#x4F8B;</td></tr><tr><td align="left">zIndex</td><td align="left">Number</td><td align="left">2015</td><td align="left">&#x5B9A;&#x4E49;&#x67E5;&#x770B;&#x5668;&#x7684;CSS z-index&#x503C; modal &#x6A21;&#x5F0F;&#x4E0B;</td></tr><tr><td align="left">zIndexInline</td><td align="left">Number</td><td align="left">0</td><td align="left">&#x5B9A;&#x4E49;&#x67E5;&#x770B;&#x5668;&#x7684;CSS z-index&#x503C; inline &#x6A21;&#x5F0F;&#x4E0B;</td></tr><tr><td align="left">url</td><td align="left">String / Function</td><td align="left">src</td><td align="left">&#x539F;&#x59CB;&#x56FE;&#x50CF;URL<br>&#x5982;&#x679C;&#x662F;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5E94;&#x8BE5;&#x56FE;&#x50CF;&#x5143;&#x7D20;&#x7684;&#x5C5E;&#x6027;&#x4E4B;&#x4E00;<br>&#x5982;&#x679C;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5E94;&#x8BE5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6709;&#x6548;&#x7684;&#x56FE;&#x50CF;URL</td></tr><tr><td align="left">container</td><td align="left">Element / String</td><td align="left">body</td><td align="left">&#x5C06;&#x67E5;&#x770B;&#x5668;&#x7F6E;&#x4E8E;modal&#x6A21;&#x5F0F;&#x7684;&#x5BB9;&#x5668;<br>&#x53EA;&#x6709;&#x5728; inline&#x4E3A; false&#x7684;&#x65F6;&#x5019;&#x624D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;</td></tr><tr><td align="left">filter</td><td align="left">Function</td><td align="left">null</td><td align="left">&#x8FC7;&#x6EE4;&#x56FE;&#x50CF;&#x4EE5;&#x4FBF;&#x67E5;&#x770B;(&#x5982;&#x679C;&#x56FE;&#x50CF;&#x662F;&#x53EF;&#x89C1;&#x7684;&#xFF0C;&#x5E94;&#x8BE5;&#x8FD4;&#x56DE;true)</td></tr><tr><td align="left">toggleOnDblclick</td><td align="left">Boolean</td><td align="left">true</td><td align="left">&#x5F53;&#x4F60;&#x653E;&#x5927;&#x6216;&#x8005;&#x7F29;&#x5C0F;&#x56FE;&#x7247;&#x65F6; &#x53CC;&#x51FB;&#x8FD8;&#x539F;</td></tr><tr><td align="left">ready</td><td align="left">Function</td><td align="left">null</td><td align="left">&#x5F53;&#x67E5;&#x770B;&#x56FE;&#x7247;&#x65F6;&#x88AB;&#x89E6;&#x53D1;&#x7684;&#x51FD;&#x6570; &#x53EA;&#x4F1A;&#x89E6;&#x53D1;&#x4E00;&#x6B21;</td></tr><tr><td align="left">show</td><td align="left">Function</td><td align="left">null</td><td align="left">&#x5F53;&#x67E5;&#x770B;&#x56FE;&#x7247;&#x65F6;&#x88AB;&#x89E6;&#x53D1;&#x7684;&#x51FD;&#x6570; &#x6BCF;&#x6B21;&#x67E5;&#x770B;&#x90FD;&#x4F1A;&#x89E6;&#x53D1;</td></tr><tr><td align="left">shown</td><td align="left">Function</td><td align="left">null</td><td align="left">&#x5F53;&#x67E5;&#x770B;&#x56FE;&#x7247;&#x65F6;&#x88AB;&#x89E6;&#x53D1;&#x7684;&#x51FD;&#x6570; &#x6BCF;&#x6B21;&#x67E5;&#x770B;&#x90FD;&#x4F1A;&#x89E6;&#x53D1; &#x5728;show&#x4E4B;&#x540E;</td></tr><tr><td align="left">hide</td><td align="left">Function</td><td align="left">null</td><td align="left">&#x5F53;&#x5173;&#x95ED;&#x56FE;&#x7247;&#x67E5;&#x770B;&#x5668;&#x65F6;&#x88AB;&#x89E6;&#x53D1;&#x7684;&#x51FD;&#x6570; &#x6BCF;&#x6B21;&#x5173;&#x95ED;&#x90FD;&#x4F1A;&#x89E6;&#x53D1;</td></tr><tr><td align="left">hidden</td><td align="left">Function</td><td align="left">null</td><td align="left">&#x5F53;&#x5173;&#x95ED;&#x56FE;&#x7247;&#x67E5;&#x770B;&#x5668;&#x65F6;&#x88AB;&#x89E6;&#x53D1;&#x7684;&#x51FD;&#x6570; &#x6BCF;&#x6B21;&#x5173;&#x95ED;&#x90FD;&#x4F1A;&#x89E6;&#x53D1; &#x5728;hide&#x4E4B;&#x540E;</td></tr><tr><td align="left">view</td><td align="left">Function</td><td align="left">null</td><td align="left">&#x5F53;&#x67E5;&#x770B;&#x56FE;&#x7247;&#x65F6;&#x88AB;&#x89E6;&#x53D1;&#x7684;&#x51FD;&#x6570; &#x6BCF;&#x6B21;&#x67E5;&#x770B;&#x90FD;&#x4F1A;&#x89E6;&#x53D1; &#x5728;shown&#x4E4B;&#x540E;</td></tr><tr><td align="left">viewed</td><td align="left">Function</td><td align="left">null</td><td align="left">&#x5F53;&#x67E5;&#x770B;&#x56FE;&#x7247;&#x65F6;&#x88AB;&#x89E6;&#x53D1;&#x7684;&#x51FD;&#x6570; &#x6BCF;&#x6B21;&#x67E5;&#x770B;&#x90FD;&#x4F1A;&#x89E6;&#x53D1; &#x5728;view&#x4E4B;&#x540E;</td></tr><tr><td align="left">zoom</td><td align="left">Function</td><td align="left">null</td><td align="left">&#x5728;&#x56FE;&#x7247;&#x7F29;&#x653E;&#x65F6;&#x89E6;&#x53D1;</td></tr><tr><td align="left">zoomed</td><td align="left">Function</td><td align="left">null</td><td align="left">&#x5728;&#x56FE;&#x7247;&#x7F29;&#x653E;&#x65F6;&#x89E6;&#x53D1; &#x5728; zoom&#x4E4B;&#x540E;</td></tr></tbody></table><h2 id="articleHeader4">toolbar Object&#x8BE6;&#x89E3;</h2><p>key&#x503C;&#x5217;&#x8868;: &quot;zoomIn&quot;, &quot;zoomOut&quot;, &quot;oneToOne&quot;, &quot;reset&quot;, &quot;prev&quot;, &quot;play&quot;, &quot;next&quot;, &quot;rotateLeft&quot;, &quot;rotateRight&quot;, &quot;flipHorizontal&quot;, &quot;flipVertical&quot;</p><table><thead><tr><th align="left">key&#x503C;&#x540D;&#x79F0;</th><th align="left">&#x8BF4;&#x660E;</th></tr></thead><tbody><tr><td align="left">zoomIn</td><td align="left">&#x653E;&#x5927;&#x56FE;&#x7247;&#x7684;&#x6309;&#x94AE;</td></tr><tr><td align="left">zoomOut</td><td align="left">&#x7F29;&#x5C0F;&#x56FE;&#x7247;&#x7684;&#x6309;&#x94AE;</td></tr><tr><td align="left">reset</td><td align="left">&#x91CD;&#x7F6E;&#x56FE;&#x7247;&#x5927;&#x5C0F;&#x7684;&#x6309;&#x94AE;</td></tr><tr><td align="left">prev</td><td align="left">&#x67E5;&#x770B;&#x4E0A;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#x7684;&#x6309;&#x94AE;</td></tr><tr><td align="left">next</td><td align="left">&#x67E5;&#x770B;&#x4E0A;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#x7684;&#x6309;&#x94AE;</td></tr><tr><td align="left">play</td><td align="left">&#x64AD;&#x653E;&#x56FE;&#x7247;&#x7684;&#x6309;&#x94AE;</td></tr><tr><td align="left">rotateLeft</td><td align="left">&#x5411;&#x5DE6;&#x65CB;&#x8F6C;&#x56FE;&#x7247;&#x7684;&#x6309;&#x94AE;</td></tr><tr><td align="left">rotateRight</td><td align="left">&#x5411;&#x53F3;&#x65CB;&#x8F6C;&#x56FE;&#x7247;&#x7684;&#x6309;&#x94AE;</td></tr><tr><td align="left">flipHorizontal</td><td align="left">&#x56FE;&#x7247;&#x5DE6;&#x53F3;&#x7FFB;&#x8F6C;&#x7684;&#x6309;&#x94AE;</td></tr><tr><td align="left">flipVertical</td><td align="left">&#x56FE;&#x7247;&#x4E0A;&#x4E0B;&#x7FFB;&#x8F6C;&#x7684;&#x6309;&#x94AE;</td></tr></tbody></table><p>{key:number|Boolean} &#x663E;&#x793A;&#x6216;&#x8005;&#x9690;&#x85CF;&#x5BF9;&#x5E94;key&#x7684;&#x6309;&#x94AE; &#x4E3A;Number&#x7684;&#x65F6;&#x5019;&#x4E3A;&#x53EF;&#x89C1;&#x6027;<br>{key: String } &#x81EA;&#x5B9A;&#x4E49;&#x6309;&#x94AE;&#x7684;&#x5927;&#x5C0F;<br>{ key: Function } &#x81EA;&#x5B9A;&#x4E49;&#x6309;&#x94AE;&#x70B9;&#x51FB;&#x7684;&#x5904;&#x7406;<br>{ key: { show: Boolean | Number, size: String, click: Function } &#x81EA;&#x5B9A;&#x4E49;&#x6309;&#x94AE;&#x7684;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;</p><p>size&#x7684;&#x53D6;&#x503C;&#x8303;&#x56F4;: small medium default large</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue中使用viewerjs

## 原文链接
[https://segmentfault.com/a/1190000016584946](https://segmentfault.com/a/1190000016584946)

