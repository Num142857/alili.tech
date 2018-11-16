---
title: css&html面试知识点
hidden: true
categories: [reprint]
slug: 79585ecb
date: 2018-11-04 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">CSS&#x4F18;&#x5148;&#x7EA7;&#x7B97;&#x6CD5;</h2><p>&#x53C2;&#x8003;&#xFF1A;<a href="http://www.bslxx.com/a/mianshiti/tiku/2017/1218/1519.html" rel="nofollow noreferrer" target="_blank">http://www.bslxx.com/a/miansh...</a><br><a href="http://www.bslxx.com/a/mianshiti/tiku/2017/1218/1521.html" rel="nofollow noreferrer" target="_blank">http://www.bslxx.com/a/miansh...</a><br><a href="http://www.bslxx.com/a/mianshiti/tiku/2017/1218/1520.html" rel="nofollow noreferrer" target="_blank">http://www.bslxx.com/a/miansh...</a><br><a href="http://www.bslxx.com/a/mianshiti/tiku/2017/1031/1223.html" rel="nofollow noreferrer" target="_blank">http://www.bslxx.com/a/miansh...</a></p><p>&#x4F18;&#x5148;&#x7EA7;&#x5C31;&#x8FD1;&#x539F;&#x5219;&#xFF0C;&#x540C;&#x6743;&#x91CD;&#x60C5;&#x51B5;&#x4E0B;&#x6837;&#x5F0F;&#x5B9A;&#x4E49;&#x6700;&#x8FD1;&#x8005;&#x4E3A;&#x51C6;<br>&#x8F7D;&#x5165;&#x6837;&#x5F0F;&#x4EE5;&#x6700;&#x540E;&#x8F7D;&#x5165;&#x7684;&#x5B9A;&#x4F4D;&#x4E3A;&#x51C6;<br>&#x4F18;&#x5148;&#x7EA7;&#x4E3A;: !important &gt; id &gt; class &gt; tag important &#x6BD4; &#x5185;&#x8054;&#x4F18;&#x5148;&#x7EA7;&#x9AD8;<br>important&#x58F0;&#x660E;&#x6BD4;js&#x7684;&#x4F18;&#x5148;&#x7EA7;&#x8981;&#x9AD8;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x7B2C;&#x4E00;&#x7B49;&#xFF1A;&#x4EE3;&#x8868;&#x5185;&#x8054;&#x6837;&#x5F0F;&#xFF0C;&#x5982;: style=&#x201D;&#x201D;&#xFF0C;&#x6743;&#x503C;&#x4E3A;1000&#x3002;
&#x7B2C;&#x4E8C;&#x7B49;&#xFF1A;&#x4EE3;&#x8868;ID&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x5982;&#xFF1A;#content&#xFF0C;&#x6743;&#x503C;&#x4E3A;0100&#x3002;
&#x7B2C;&#x4E09;&#x7B49;&#xFF1A;&#x4EE3;&#x8868;&#x7C7B;&#xFF0C;&#x4F2A;&#x7C7B;&#x548C;&#x5C5E;&#x6027;&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x5982;.content&#xFF0C;&#x6743;&#x503C;&#x4E3A;0010&#x3002;
&#x7B2C;&#x56DB;&#x7B49;&#xFF1A;&#x4EE3;&#x8868;&#x7C7B;&#x578B;&#x9009;&#x62E9;&#x5668;&#x548C;&#x4F2A;&#x5143;&#x7D20;&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x5982;div p&#xFF0C;&#x6743;&#x503C;&#x4E3A;0001&#x3002;
&#x901A;&#x914D;&#x7B26;&#x3001;&#x5B50;&#x9009;&#x62E9;&#x5668;&#x3001;&#x76F8;&#x90BB;&#x9009;&#x62E9;&#x5668;&#x7B49;&#x7684;&#x3002;&#x5982;*&#x3001;&gt;&#x3001;+,&#x6743;&#x503C;&#x4E3A;0000&#x3002;
&#x7EE7;&#x627F;&#x7684;&#x6837;&#x5F0F;&#x6CA1;&#x6709;&#x6743;&#x503C;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&#x7B2C;&#x4E00;&#x7B49;&#xFF1A;&#x4EE3;&#x8868;&#x5185;&#x8054;&#x6837;&#x5F0F;&#xFF0C;&#x5982;: style=&#x201D;&#x201D;&#xFF0C;&#x6743;&#x503C;&#x4E3A;<span class="hljs-number">1000</span>&#x3002;
&#x7B2C;&#x4E8C;&#x7B49;&#xFF1A;&#x4EE3;&#x8868;ID&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x5982;&#xFF1A;#<span class="hljs-attribute">content</span>&#xFF0C;&#x6743;&#x503C;&#x4E3A;<span class="hljs-number">0100</span>&#x3002;
&#x7B2C;&#x4E09;&#x7B49;&#xFF1A;&#x4EE3;&#x8868;&#x7C7B;&#xFF0C;&#x4F2A;&#x7C7B;&#x548C;&#x5C5E;&#x6027;&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x5982;.<span class="hljs-attribute">content</span>&#xFF0C;&#x6743;&#x503C;&#x4E3A;<span class="hljs-number">0010</span>&#x3002;
&#x7B2C;&#x56DB;&#x7B49;&#xFF1A;&#x4EE3;&#x8868;&#x7C7B;&#x578B;&#x9009;&#x62E9;&#x5668;&#x548C;&#x4F2A;&#x5143;&#x7D20;&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x5982;<span class="hljs-selector-tag">div</span> p&#xFF0C;&#x6743;&#x503C;&#x4E3A;<span class="hljs-number">0001</span>&#x3002;
&#x901A;&#x914D;&#x7B26;&#x3001;&#x5B50;&#x9009;&#x62E9;&#x5668;&#x3001;&#x76F8;&#x90BB;&#x9009;&#x62E9;&#x5668;&#x7B49;&#x7684;&#x3002;&#x5982;*&#x3001;&gt;&#x3001;+,&#x6743;&#x503C;&#x4E3A;<span class="hljs-number">0000</span>&#x3002;
&#x7EE7;&#x627F;&#x7684;&#x6837;&#x5F0F;&#x6CA1;&#x6709;&#x6743;&#x503C;&#x3002;</code></pre><h2 id="articleHeader1">css&#x5B9A;&#x4E49;&#x7684;&#x6743;&#x91CD;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/ &#x4EE5;&#x4E0B;&#x662F;&#x6743;&#x91CD;&#x7684;&#x89C4;&#x5219;&#xFF1A;&#x6807;&#x7B7E;&#x7684;&#x6743;&#x91CD;&#x4E3A;1&#xFF0C;class&#x7684;&#x6743;&#x91CD;&#x4E3A;10&#xFF0C;id&#x7684;&#x6743;&#x91CD;&#x4E3A;100&#xFF0C;&#x4EE5;&#x4E0B;/// &#x4F8B;&#x5B50;&#x662F;&#x6F14;&#x793A;&#x5404;&#x79CD;&#x5B9A;&#x4E49;&#x7684;&#x6743;&#x91CD;&#x503C;&#xFF1A;

/*&#x6743;&#x91CD;&#x4E3A;1*/
div{
}
/*&#x6743;&#x91CD;&#x4E3A;10*/
.class1{
}
/*&#x6743;&#x91CD;&#x4E3A;100*/
#id1{
}
/*&#x6743;&#x91CD;&#x4E3A;100+1=101*/
#id1 div{
}
/*&#x6743;&#x91CD;&#x4E3A;10+1=11*/
.class1 div{
}
/*&#x6743;&#x91CD;&#x4E3A;10+10+1=21*/
.class1 .class2 div{
}

// &#x5982;&#x679C;&#x6743;&#x91CD;&#x76F8;&#x540C;&#xFF0C;&#x5219;&#x6700;&#x540E;&#x5B9A;&#x4E49;&#x7684;&#x6837;&#x5F0F;&#x4F1A;&#x8D77;&#x4F5C;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x5E94;&#x8BE5;&#x907F;&#x514D;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x51FA;&#x73B0;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>/ &#x4EE5;&#x4E0B;&#x662F;&#x6743;&#x91CD;&#x7684;&#x89C4;&#x5219;&#xFF1A;&#x6807;&#x7B7E;&#x7684;&#x6743;&#x91CD;&#x4E3A;<span class="hljs-number">1</span>&#xFF0C;class&#x7684;&#x6743;&#x91CD;&#x4E3A;<span class="hljs-number">10</span>&#xFF0C;id&#x7684;&#x6743;&#x91CD;&#x4E3A;<span class="hljs-number">100</span>&#xFF0C;&#x4EE5;&#x4E0B;<span class="hljs-comment">/// &#x4F8B;&#x5B50;&#x662F;&#x6F14;&#x793A;&#x5404;&#x79CD;&#x5B9A;&#x4E49;&#x7684;&#x6743;&#x91CD;&#x503C;&#xFF1A;</span>

<span class="hljs-comment">/*&#x6743;&#x91CD;&#x4E3A;1*/</span>
div{
}
<span class="hljs-comment">/*&#x6743;&#x91CD;&#x4E3A;10*/</span>
.class1{
}
<span class="hljs-comment">/*&#x6743;&#x91CD;&#x4E3A;100*/</span>
#id1{
}
<span class="hljs-comment">/*&#x6743;&#x91CD;&#x4E3A;100+1=101*/</span>
<span class="hljs-selector-id">#id1</span> div{
}
<span class="hljs-comment">/*&#x6743;&#x91CD;&#x4E3A;10+1=11*/</span>
<span class="hljs-selector-class">.class1</span> div{
}
<span class="hljs-comment">/*&#x6743;&#x91CD;&#x4E3A;10+10+1=21*/</span>
<span class="hljs-selector-class">.class1</span> <span class="hljs-selector-class">.class2</span> div{
}

<span class="hljs-comment">// &#x5982;&#x679C;&#x6743;&#x91CD;&#x76F8;&#x540C;&#xFF0C;&#x5219;&#x6700;&#x540E;&#x5B9A;&#x4E49;&#x7684;&#x6837;&#x5F0F;&#x4F1A;&#x8D77;&#x4F5C;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x5E94;&#x8BE5;&#x907F;&#x514D;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x51FA;&#x73B0;</span></code></pre><h2 id="articleHeader2">CSS3&#x65B0;&#x589E;&#x4F2A;&#x7C7B;</h2><p>p:first-of-type &#x9009;&#x62E9;&#x5C5E;&#x4E8E;&#x5176;&#x7236;&#x5143;&#x7D20;&#x7684;&#x9996;&#x4E2A; &lt;p&gt; &#x5143;&#x7D20;&#x7684;&#x6BCF;&#x4E2A; &lt;p&gt; &#x5143;&#x7D20;&#x3002;<br>p:last-of-type &#x9009;&#x62E9;&#x5C5E;&#x4E8E;&#x5176;&#x7236;&#x5143;&#x7D20;&#x7684;&#x6700;&#x540E; &lt;p&gt; &#x5143;&#x7D20;&#x7684;&#x6BCF;&#x4E2A; &lt;p&gt; &#x5143;&#x7D20;&#x3002;<br>p:only-of-type &#x9009;&#x62E9;&#x5C5E;&#x4E8E;&#x5176;&#x7236;&#x5143;&#x7D20;&#x552F;&#x4E00;&#x7684; &lt;p&gt; &#x5143;&#x7D20;&#x7684;&#x6BCF;&#x4E2A; &lt;p&gt; &#x5143;&#x7D20;&#x3002;<br>p:only-child &#x9009;&#x62E9;&#x5C5E;&#x4E8E;&#x5176;&#x7236;&#x5143;&#x7D20;&#x7684;&#x552F;&#x4E00;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x6BCF;&#x4E2A; &lt;p&gt; &#x5143;&#x7D20;&#x3002;<br>p:nth-child(2) &#x9009;&#x62E9;&#x5C5E;&#x4E8E;&#x5176;&#x7236;&#x5143;&#x7D20;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x6BCF;&#x4E2A; &lt;p&gt; &#x5143;&#x7D20;&#x3002;</p><p>:after &#x5728;&#x5143;&#x7D20;&#x4E4B;&#x524D;&#x6DFB;&#x52A0;&#x5185;&#x5BB9;,&#x4E5F;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x505A;&#x6E05;&#x9664;&#x6D6E;&#x52A8;&#x3002;<br>:before &#x5728;&#x5143;&#x7D20;&#x4E4B;&#x540E;&#x6DFB;&#x52A0;&#x5185;&#x5BB9;<br>:enabled<br>:disabled &#x63A7;&#x5236;&#x8868;&#x5355;&#x63A7;&#x4EF6;&#x7684;&#x7981;&#x7528;&#x72B6;&#x6001;&#x3002;<br>:checked &#x5355;&#x9009;&#x6846;&#x6216;&#x590D;&#x9009;&#x6846;&#x88AB;&#x9009;&#x4E2D;</p><h2 id="articleHeader3">&#x5C45;&#x4E2D;&#x4E00;&#x4E2A;&#x6D6E;&#x52A8;&#x5143;&#x7D20;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x7ED9;div&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5BBD;&#x5EA6;&#xFF0C;&#x7136;&#x540E;&#x6DFB;&#x52A0;margin:0 auto&#x5C5E;&#x6027;

div{
    width:200px;
    margin:0 auto;
 }

//&#x786E;&#x5B9A;&#x5BB9;&#x5668;&#x7684;&#x5BBD;&#x9AD8; &#x5BBD;500 &#x9AD8; 300 &#x7684;&#x5C42;
//&#x8BBE;&#x7F6E;&#x5C42;&#x7684;&#x5916;&#x8FB9;&#x8DDD;

 .div {
      width:500px ; height:300px;//&#x9AD8;&#x5EA6;&#x53EF;&#x4EE5;&#x4E0D;&#x8BBE;
      margin: -150px 0 0 -250px;
      position:relative;         //&#x76F8;&#x5BF9;&#x5B9A;&#x4F4D;
      background-color:pink;     //&#x65B9;&#x4FBF;&#x770B;&#x6548;&#x679C;
      left:50%;
      top:50%;
 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code>&#x7ED9;<span class="hljs-selector-tag">div</span>&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5BBD;&#x5EA6;&#xFF0C;&#x7136;&#x540E;&#x6DFB;&#x52A0;<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto&#x5C5E;&#x6027;

div{
    width:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
 }

<span class="hljs-comment">//&#x786E;&#x5B9A;&#x5BB9;&#x5668;&#x7684;&#x5BBD;&#x9AD8; &#x5BBD;500 &#x9AD8; 300 &#x7684;&#x5C42;</span>
<span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x5C42;&#x7684;&#x5916;&#x8FB9;&#x8DDD;</span>

 <span class="hljs-selector-class">.div</span> {
      <span class="hljs-attribute">width</span>:<span class="hljs-number">500px</span> ; <span class="hljs-attribute">height</span>:<span class="hljs-number">300px</span>;<span class="hljs-comment">//&#x9AD8;&#x5EA6;&#x53EF;&#x4EE5;&#x4E0D;&#x8BBE;</span>
      <span class="hljs-attribute">margin</span>: -<span class="hljs-number">150px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> -<span class="hljs-number">250px</span>;
      <span class="hljs-attribute">position</span>:relative;         <span class="hljs-comment">//&#x76F8;&#x5BF9;&#x5B9A;&#x4F4D;</span>
      <span class="hljs-attribute">background-color</span>:pink;     <span class="hljs-comment">//&#x65B9;&#x4FBF;&#x770B;&#x6548;&#x679C;</span>
      <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
      <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
 }</code></pre><p>&#x8BA9;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x7684;div&#x5C45;&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  position: absolute;
  width: 1200px;
  background: none;
  margin: 0 auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code>  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">1200px</span>;
  <span class="hljs-attribute">background</span>: none;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;</code></pre><h2 id="articleHeader4">CSS3&#x6709;&#x65B0;&#x7279;&#x6027;</h2><p>&#x65B0;&#x589E;&#x5404;&#x79CD;CSS&#x9009;&#x62E9;&#x5668; &#xFF08;: not(.input)&#xFF1A;&#x6240;&#x6709; class &#x4E0D;&#x662F;&#x201C;input&#x201D;&#x7684;&#x8282;&#x70B9;&#xFF09;<br>&#x5706;&#x89D2; &#xFF08;border-radius:8px&#xFF09;<br>&#x591A;&#x5217;&#x5E03;&#x5C40; &#xFF08;multi-column layout&#xFF09;<br>&#x9634;&#x5F71;&#x548C;&#x53CD;&#x5C04; &#xFF08;ShadowReflect&#xFF09;<br>&#x6587;&#x5B57;&#x7279;&#x6548; &#xFF08;text-shadow&#x3001;&#xFF09;<br>&#x6587;&#x5B57;&#x6E32;&#x67D3; &#xFF08;Text-decoration&#xFF09;<br>&#x7EBF;&#x6027;&#x6E10;&#x53D8; &#xFF08;gradient&#xFF09;<br>&#x65CB;&#x8F6C; &#xFF08;transform&#xFF09;<br>&#x589E;&#x52A0;&#x4E86;&#x65CB;&#x8F6C;,&#x7F29;&#x653E;,&#x5B9A;&#x4F4D;,&#x503E;&#x659C;,&#x52A8;&#x753B;&#xFF0C;&#x591A;&#x80CC;&#x666F;<br>transform:scale(0.85,0.90) translate(0px,-30px) skew(-9deg,0deg)Animation:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x65B0;&#x589E;&#x9009;&#x62E9;&#x5668; p:nth-child(n){color: rgba(255, 0, 0, 0.75)}
&#x5F39;&#x6027;&#x76D2;&#x6A21;&#x578B; display: flex;
&#x591A;&#x5217;&#x5E03;&#x5C40; column-count: 5;
&#x5A92;&#x4F53;&#x67E5;&#x8BE2; @media (max-width: 480px) {.box: {column-count: 1;}}
&#x4E2A;&#x6027;&#x5316;&#x5B57;&#x4F53; @font-face{font-family: BorderWeb; src:url(BORDERW0.eot);}
&#x989C;&#x8272;&#x900F;&#x660E;&#x5EA6; color: rgba(255, 0, 0, 0.75);
&#x5706;&#x89D2; border-radius: 5px;
&#x6E10;&#x53D8; background:linear-gradient(red, green, blue);
&#x9634;&#x5F71; box-shadow:3px 3px 3px rgba(0, 64, 128, 0.3);
&#x5012;&#x5F71; box-reflect: below 2px;
&#x6587;&#x5B57;&#x88C5;&#x9970; text-stroke-color: red;
&#x6587;&#x5B57;&#x6EA2;&#x51FA; text-overflow:ellipsis;
&#x80CC;&#x666F;&#x6548;&#x679C; background-size: 100px 100px;
&#x8FB9;&#x6846;&#x6548;&#x679C; border-image:url(bt_blue.png) 0 10;
&#x8F6C;&#x6362;
    &#x65CB;&#x8F6C; transform: rotate(20deg);
    &#x503E;&#x659C; transform: skew(150deg, -10deg);
    &#x4F4D;&#x79FB; transform: translate(20px, 20px);
    &#x7F29;&#x653E; transform: scale(.5);
&#x5E73;&#x6ED1;&#x8FC7;&#x6E21; transition: all .3s ease-in .1s;
&#x52A8;&#x753B; @keyframes anim-1 {50% {border-radius: 50%;}} animation: anim-1 1s;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code>&#x65B0;&#x589E;&#x9009;&#x62E9;&#x5668; <span class="hljs-selector-tag">p</span>:nth-child(n){<span class="hljs-attribute">color</span>: rgba(<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.75</span>)}
&#x5F39;&#x6027;&#x76D2;&#x6A21;&#x578B; display: flex;
&#x591A;&#x5217;&#x5E03;&#x5C40; <span class="hljs-attribute">column-count</span>: <span class="hljs-number">5</span>;
&#x5A92;&#x4F53;&#x67E5;&#x8BE2; @<span class="hljs-keyword">media</span> (max-width: 480px) {<span class="hljs-selector-class">.box</span>: {column-count: <span class="hljs-number">1</span>;}}
&#x4E2A;&#x6027;&#x5316;&#x5B57;&#x4F53; @font-face{<span class="hljs-attribute">font-family</span>: BorderWeb; src:url(BORDERW0.eot);}
&#x989C;&#x8272;&#x900F;&#x660E;&#x5EA6; <span class="hljs-attribute">color</span>: rgba(<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.75</span>);
&#x5706;&#x89D2; <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
&#x6E10;&#x53D8; <span class="hljs-attribute">background</span>:linear-gradient(red, green, blue);
&#x9634;&#x5F71; <span class="hljs-attribute">box-shadow</span>:<span class="hljs-number">3px</span> <span class="hljs-number">3px</span> <span class="hljs-number">3px</span> rgba(<span class="hljs-number">0</span>, <span class="hljs-number">64</span>, <span class="hljs-number">128</span>, <span class="hljs-number">0.3</span>);
&#x5012;&#x5F71; box-reflect: below <span class="hljs-number">2px</span>;
&#x6587;&#x5B57;&#x88C5;&#x9970; text-stroke-<span class="hljs-attribute">color</span>: red;
&#x6587;&#x5B57;&#x6EA2;&#x51FA; <span class="hljs-attribute">text-overflow</span>:ellipsis;
&#x80CC;&#x666F;&#x6548;&#x679C; <span class="hljs-attribute">background-size</span>: <span class="hljs-number">100px</span> <span class="hljs-number">100px</span>;
&#x8FB9;&#x6846;&#x6548;&#x679C; <span class="hljs-attribute">border-image</span>:url(bt_blue.png) <span class="hljs-number">0</span> <span class="hljs-number">10</span>;
&#x8F6C;&#x6362;
    &#x65CB;&#x8F6C; <span class="hljs-attribute">transform</span>: rotate(<span class="hljs-number">20deg</span>);
    &#x503E;&#x659C; <span class="hljs-attribute">transform</span>: skew(<span class="hljs-number">150deg</span>, -<span class="hljs-number">10deg</span>);
    &#x4F4D;&#x79FB; <span class="hljs-attribute">transform</span>: translate(<span class="hljs-number">20px</span>, <span class="hljs-number">20px</span>);
    &#x7F29;&#x653E; <span class="hljs-attribute">transform</span>: scale(.<span class="hljs-number">5</span>);
&#x5E73;&#x6ED1;&#x8FC7;&#x6E21; <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span> ease-in .<span class="hljs-number">1s</span>;
&#x52A8;&#x753B; @keyframes anim-1 {50% {<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;}} <span class="hljs-attribute">animation</span>: anim-<span class="hljs-number">1</span> <span class="hljs-number">1s</span>;
</code></pre><h2 id="articleHeader5">&#x7528;&#x7EAF;CSS&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4E09;&#x89D2;&#x5F62;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x628A;&#x4E0A;&#x3001;&#x5DE6;&#x3001;&#x53F3;&#x4E09;&#x6761;&#x8FB9;&#x9690;&#x85CF;&#x6389;&#xFF08;&#x989C;&#x8272;&#x8BBE;&#x4E3A; transparent&#xFF09;
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>// &#x628A;&#x4E0A;&#x3001;&#x5DE6;&#x3001;&#x53F3;&#x4E09;&#x6761;&#x8FB9;&#x9690;&#x85CF;&#x6389;&#xFF08;&#x989C;&#x8272;&#x8BBE;&#x4E3A; <span class="hljs-built_in">transparent</span>&#xFF09;
#<span class="hljs-built_in">demo</span> {
  <span class="hljs-built_in">width</span>: <span class="hljs-number">0</span>;
  <span class="hljs-built_in">height</span>: <span class="hljs-number">0</span>;
  <span class="hljs-built_in">border</span>-<span class="hljs-built_in">width</span>: 20px;
  <span class="hljs-built_in">border</span>-<span class="hljs-built_in">style</span>: solid;
  <span class="hljs-built_in">border</span>-<span class="hljs-built_in">color</span>: <span class="hljs-built_in">transparent</span> <span class="hljs-built_in">transparent</span> red <span class="hljs-built_in">transparent</span>;
}</code></pre><h2 id="articleHeader6">&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x517C;&#x5BB9;&#x6027;</h2><ol><li>png24&#x4F4D;&#x7684;&#x56FE;&#x7247;&#x5728;iE6&#x6D4F;&#x89C8;&#x5668;&#x4E0A;&#x51FA;&#x73B0;&#x80CC;&#x666F;&#xFF0C;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x662F;&#x505A;&#x6210;PNG8.</li><li>&#x6D4F;&#x89C8;&#x5668;&#x9ED8;&#x8BA4;&#x7684;margin&#x548C;padding&#x4E0D;&#x540C;&#x3002;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x662F;&#x52A0;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x7684;*{margin:0;padding:0;}&#x6765;&#x7EDF;&#x4E00;</li><li>IE&#x4E0B;,&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x83B7;&#x53D6;&#x5E38;&#x89C4;&#x5C5E;&#x6027;&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x83B7;&#x53D6;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;,&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;getAttribute()&#x83B7;&#x53D6;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;;Firefox&#x4E0B;,&#x53EA;&#x80FD;&#x4F7F;&#x7528;getAttribute()&#x83B7;&#x53D6;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#x3002;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;:&#x7EDF;&#x4E00;&#x901A;&#x8FC7;getAttribute()&#x83B7;&#x53D6;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;</li><li>IE&#x4E0B;,even&#x5BF9;&#x8C61;&#x6709;x,y&#x5C5E;&#x6027;,&#x4F46;&#x662F;&#x6CA1;&#x6709;pageX,pageY&#x5C5E;&#x6027;.Firefox&#x4E0B;,event&#x5BF9;&#x8C61;&#x6709;pageX,pageY&#x5C5E;&#x6027;,&#x4F46;&#x662F;&#x6CA1;&#x6709;x,y&#x5C5E;&#x6027;</li></ol><h2 id="articleHeader7">BFC</h2><p>&#x5757;&#x7EA7;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;&#xFF08;&#x5185;&#x90E8;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5916;&#x90E8;&#x5143;&#x7D20;&#xFF09;</p><p>&#x6E32;&#x67D3;&#x89C4;&#x5219;&#xFF1A;<br>1.bfc&#x5143;&#x7D20;&#x7684;&#x5782;&#x76F4;&#x65B9;&#x5411;&#x8FB9;&#x8DDD;&#x53D1;&#x751F;&#x91CD;&#x53E0;<br>2.bfc&#x533A;&#x57DF;&#x4E0D;&#x4F1A;&#x4E0E;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x91CD;&#x53E0;<br>3.&#x72EC;&#x7ACB;&#x5BB9;&#x5668;<br>4.&#x8BA1;&#x7B97;bfc&#x9AD8;&#x5EA6;&#x65F6;&#xFF0C;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x4E5F;&#x4F1A;&#x53C2;&#x4E0E;&#x8BA1;&#x7B97;</p><p>&#x521B;&#x5EFA;bfc&#xFF1A;<br>1.overflow<br>2.&#x6D6E;&#x52A8;&#x4E0D;&#x4E3A;none<br>3.position&#x4E0D;&#x662F;static<br>4.display&#x4E0E;table&#x6709;&#x5173;</p><h2 id="articleHeader8">display:inline-block &#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x4F1A;&#x663E;&#x793A;&#x95F4;&#x9699;</h2><p>&#x79FB;&#x9664;&#x7A7A;&#x683C;&#x3001;&#x4F7F;&#x7528;margin&#x8D1F;&#x503C;&#x3001;&#x4F7F;&#x7528;font-size:0&#x3001;letter-spacing&#x3001;word-spacing</p><h2 id="articleHeader9">&#x6E05;&#x9664;&#x6D6E;&#x52A8;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: &quot; &quot;;
  clear: both;
  height: 0;
}

1.&#x53EF;&#x7528;a&#x6807;&#x7B7E; &#x8BBE;&#x7F6E;display&#xFF1A;inline-block&#xFF1B;width&#xFF1A;100%&#xFF0C; &#x628A;&#x542B;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;div&#x6491;&#x8D77;&#x6765;&#xFF08;div&#x4E0D;&#x7528;&#x8BBE;&#x8BA1;&#x9AD8;&#x5EA6;&#xFF09;
2.overflow&#xFF1A;hidden(BFC)
3.&#x53EF;&#x7528;a&#x6807;&#x7B7E; &#x8BBE;&#x7F6E;display&#xFF1A;block&#xFF1B;width&#xFF1A;100%&#xFF0C;clear&#xFF1A;both
4.div=&#x300B;display&#xFF1A;table

5.div=&#x300B;display&#xFF1A;table-cell

6.div=&#x300B;display&#xFF1A;flow-root&#xFF08;&#x89E6;&#x53D1;BFC&#xFF09;

7.div::after&#x4EE3;&#x66FF;a&#x6807;&#x7B7E;=&#x300B;content:&#x2019;&#x2019; display:block; clear:both;(&#x6700;&#x4E0B;&#x65B9;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#x9AD8;&#x5EA6;&#x7684;&#x5143;&#x7D20;)

8.&#x4F7F;&#x7528;.clearfix:after{content:&#x2019;&#x2019; display:block; clear:both;}

9.&#x8BA9;div&#x4E5F;&#x6D6E;&#x52A8;&#xFF08;BFC&#xFF09;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-class">.clearfix</span>:after {
  <span class="hljs-attribute">visibility</span>: hidden;
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot; &quot;</span>;
  <span class="hljs-attribute">clear</span>: both;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-number">1</span>.&#x53EF;&#x7528;a&#x6807;&#x7B7E; &#x8BBE;&#x7F6E;<span class="hljs-attribute">display</span>&#xFF1A;inline-block&#xFF1B;width&#xFF1A;<span class="hljs-number">100%</span>&#xFF0C; &#x628A;&#x542B;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;div&#x6491;&#x8D77;&#x6765;&#xFF08;div&#x4E0D;&#x7528;&#x8BBE;&#x8BA1;&#x9AD8;&#x5EA6;&#xFF09;
<span class="hljs-number">2</span>.<span class="hljs-attribute">overflow</span>&#xFF1A;hidden(BFC)
<span class="hljs-number">3</span>.&#x53EF;&#x7528;a&#x6807;&#x7B7E; &#x8BBE;&#x7F6E;<span class="hljs-attribute">display</span>&#xFF1A;block&#xFF1B;width&#xFF1A;<span class="hljs-number">100%</span>&#xFF0C;clear&#xFF1A;both
<span class="hljs-number">4</span>.div=&#x300B;<span class="hljs-attribute">display</span>&#xFF1A;table

<span class="hljs-number">5</span>.div=&#x300B;<span class="hljs-attribute">display</span>&#xFF1A;table-cell

<span class="hljs-number">6</span>.div=&#x300B;<span class="hljs-attribute">display</span>&#xFF1A;flow-root&#xFF08;&#x89E6;&#x53D1;BFC&#xFF09;

<span class="hljs-number">7</span><span class="hljs-selector-class">.div</span>::after&#x4EE3;&#x66FF;a&#x6807;&#x7B7E;=&#x300B;<span class="hljs-attribute">content</span>:&#x2019;&#x2019; display:block; <span class="hljs-attribute">clear</span>:both;(&#x6700;&#x4E0B;&#x65B9;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#x9AD8;&#x5EA6;&#x7684;&#x5143;&#x7D20;)

<span class="hljs-number">8</span>.&#x4F7F;&#x7528;<span class="hljs-selector-class">.clearfix</span>:after{<span class="hljs-attribute">content</span>:&#x2019;&#x2019; display:block; <span class="hljs-attribute">clear</span>:both;}

<span class="hljs-number">9</span>.&#x8BA9;div&#x4E5F;&#x6D6E;&#x52A8;&#xFF08;BFC&#xFF09;</code></pre><h2 id="articleHeader10">&#x76D2;&#x5B50;&#x6A21;&#x578B;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x76D2;&#x5B50;&#x6A21;&#x578B;&#x6784;&#x6210;&#xFF1A;&#x5185;&#x5BB9;(content)&#x3001;&#x5185;&#x586B;&#x5145;(padding)&#x3001; &#x8FB9;&#x6846;(border)&#x3001;&#x5916;&#x8FB9;&#x8DDD;(margin)
IE8&#x53CA;&#x5176;&#x4EE5;&#x4E0B;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x672A;&#x58F0;&#x660E; DOCTYPE&#xFF0C;&#x5185;&#x5BB9;&#x5BBD;&#x9AD8;&#x4F1A;&#x5305;&#x542B;&#x5185;&#x586B;&#x5145;&#x548C;&#x8FB9;&#x6846;&#xFF0C;&#x79F0;&#x4E3A;&#x602A;&#x5F02;&#x76D2;&#x6A21;&#x578B;(IE&#x76D2;&#x6A21;&#x578B;)
&#x6807;&#x51C6;(W3C)&#x76D2;&#x6A21;&#x578B;&#xFF1A;&#x5143;&#x7D20;&#x5BBD;&#x5EA6; = width + padding + border + margin
&#x602A;&#x5F02;(IE)&#x76D2;&#x6A21;&#x578B;&#xFF1A;&#x5143;&#x7D20;&#x5BBD;&#x5EA6; = width + margin
&#x6807;&#x51C6;&#x6D4F;&#x89C8;&#x5668;&#x901A;&#x8FC7;&#x8BBE;&#x7F6E; css3 &#x7684; box-sizing: border-box &#x5C5E;&#x6027;&#xFF0C;&#x89E6;&#x53D1;&#x201C;&#x602A;&#x5F02;&#x6A21;&#x5F0F;&#x201D;&#x89E3;&#x6790;&#x8BA1;&#x7B97;&#x5BBD;&#x9AD8;

box-sizing: content-box; // &#x9ED8;&#x8BA4;&#x7684;&#x6807;&#x51C6;(W3C)&#x76D2;&#x6A21;&#x578B;&#x5143;&#x7D20;&#x6548;&#x679C;
box-sizing: border-box; // &#x89E6;&#x53D1;&#x602A;&#x5F02;(IE)&#x76D2;&#x6A21;&#x578B;&#x5143;&#x7D20;&#x7684;&#x6548;&#x679C;
box-sizing: inherit; // &#x7EE7;&#x627F;&#x7236;&#x5143;&#x7D20; box-sizing &#x5C5E;&#x6027;&#x7684;&#x503C;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>&#x76D2;&#x5B50;&#x6A21;&#x578B;&#x6784;&#x6210;&#xFF1A;&#x5185;&#x5BB9;(<span class="hljs-built_in">content</span>)&#x3001;&#x5185;&#x586B;&#x5145;(padding)&#x3001; &#x8FB9;&#x6846;(<span class="hljs-built_in">border</span>)&#x3001;&#x5916;&#x8FB9;&#x8DDD;(margin)
IE8&#x53CA;&#x5176;&#x4EE5;&#x4E0B;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x672A;&#x58F0;&#x660E; DOCTYPE&#xFF0C;&#x5185;&#x5BB9;&#x5BBD;&#x9AD8;&#x4F1A;&#x5305;&#x542B;&#x5185;&#x586B;&#x5145;&#x548C;&#x8FB9;&#x6846;&#xFF0C;&#x79F0;&#x4E3A;&#x602A;&#x5F02;&#x76D2;&#x6A21;&#x578B;(IE&#x76D2;&#x6A21;&#x578B;)
&#x6807;&#x51C6;(W3C)&#x76D2;&#x6A21;&#x578B;&#xFF1A;&#x5143;&#x7D20;&#x5BBD;&#x5EA6; = <span class="hljs-built_in">width</span> + padding + <span class="hljs-built_in">border</span> + margin
&#x602A;&#x5F02;(IE)&#x76D2;&#x6A21;&#x578B;&#xFF1A;&#x5143;&#x7D20;&#x5BBD;&#x5EA6; = <span class="hljs-built_in">width</span> + margin
&#x6807;&#x51C6;&#x6D4F;&#x89C8;&#x5668;&#x901A;&#x8FC7;&#x8BBE;&#x7F6E; css3 &#x7684; <span class="hljs-built_in">box</span>-sizing: <span class="hljs-built_in">border</span>-<span class="hljs-built_in">box</span> &#x5C5E;&#x6027;&#xFF0C;&#x89E6;&#x53D1;&#x201C;&#x602A;&#x5F02;&#x6A21;&#x5F0F;&#x201D;&#x89E3;&#x6790;&#x8BA1;&#x7B97;&#x5BBD;&#x9AD8;

<span class="hljs-built_in">box</span>-sizing: <span class="hljs-built_in">content</span>-<span class="hljs-built_in">box</span>; // &#x9ED8;&#x8BA4;&#x7684;&#x6807;&#x51C6;(W3C)&#x76D2;&#x6A21;&#x578B;&#x5143;&#x7D20;&#x6548;&#x679C;
<span class="hljs-built_in">box</span>-sizing: <span class="hljs-built_in">border</span>-<span class="hljs-built_in">box</span>; // &#x89E6;&#x53D1;&#x602A;&#x5F02;(IE)&#x76D2;&#x6A21;&#x578B;&#x5143;&#x7D20;&#x7684;&#x6548;&#x679C;
<span class="hljs-built_in">box</span>-sizing: inherit; // &#x7EE7;&#x627F;&#x7236;&#x5143;&#x7D20; <span class="hljs-built_in">box</span>-sizing &#x5C5E;&#x6027;&#x7684;&#x503C;
</code></pre><h2 id="articleHeader11">&#x7EE7;&#x627F;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x53EF;&#x4EE5;&#x7EE7;&#x627F;&#x7684;&#x6837;&#x5F0F;&#xFF1A;font-size&#x3001;font-family&#x3001;color&#x3001;list-style&#x3001;cursor
&#x4E0D;&#x53EF;&#x7EE7;&#x627F;&#x7684;&#x6837;&#x5F0F;&#xFF1A;width&#x3001;height&#x3001;border&#x3001;padding&#x3001;margin&#x3001;background" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code>&#x53EF;&#x4EE5;&#x7EE7;&#x627F;&#x7684;&#x6837;&#x5F0F;&#xFF1A;<span class="hljs-attribute">font-size</span>&#x3001;<span class="hljs-attribute">font-family</span>&#x3001;<span class="hljs-attribute">color</span>&#x3001;<span class="hljs-attribute">list-style</span>&#x3001;<span class="hljs-attribute">cursor</span>
&#x4E0D;&#x53EF;&#x7EE7;&#x627F;&#x7684;&#x6837;&#x5F0F;&#xFF1A;<span class="hljs-attribute">width</span>&#x3001;<span class="hljs-attribute">height</span>&#x3001;<span class="hljs-attribute">border</span>&#x3001;<span class="hljs-attribute">padding</span>&#x3001;<span class="hljs-attribute">margin</span>&#x3001;<span class="hljs-attribute">background</span></code></pre><h2 id="articleHeader12">&#x9690;&#x85CF;&#x5143;&#x7D20;&#x7684;&#x65B9;&#x6CD5;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="visibility: hidden; &#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x7684;&#x9690;&#x85CF;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x4F46;&#x662F;&#x5143;&#x7D20;&#x5360;&#x7528;&#x7684;&#x7A7A;&#x95F4;&#x4EFB;&#x7136;&#x5B58;&#x5728;
opacity: 0; CSS3&#x5C5E;&#x6027;&#xFF0C;&#x8BBE;&#x7F6E;0&#x53EF;&#x4EE5;&#x4F7F;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5B8C;&#x5168;&#x900F;&#x660E;
position: absolute; &#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5F88;&#x5927;&#x7684; left &#x8D1F;&#x503C;&#x5B9A;&#x4F4D;&#xFF0C;&#x4F7F;&#x5143;&#x7D20;&#x5B9A;&#x4F4D;&#x5728;&#x53EF;&#x89C1;&#x533A;&#x57DF;&#x4E4B;&#x5916;
display: none; &#x5143;&#x7D20;&#x4F1A;&#x53D8;&#x5F97;&#x4E0D;&#x53EF;&#x89C1;&#xFF0C;&#x5E76;&#x4E14;&#x4E0D;&#x4F1A;&#x518D;&#x5360;&#x7528;&#x6587;&#x6863;&#x7684;&#x7A7A;&#x95F4;&#x3002;
transform: scale(0); &#x5C06;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E3A;&#x7F29;&#x653E;&#x65E0;&#x9650;&#x5C0F;&#xFF0C;&#x5143;&#x7D20;&#x5C06;&#x4E0D;&#x53EF;&#x89C1;&#xFF0C;&#x5143;&#x7D20;&#x539F;&#x6765;&#x6240;&#x5728;&#x7684;&#x4F4D;&#x7F6E;&#x5C06;&#x88AB;&#x4FDD;&#x7559;
&lt;div hidden=&quot;hidden&quot;&gt; HTML5&#x5C5E;&#x6027;,&#x6548;&#x679C;&#x548C;display:none;&#x76F8;&#x540C;&#xFF0C;&#x4F46;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x7528;&#x4E8E;&#x8BB0;&#x5F55;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x72B6;&#x6001;
height: 0; &#x5C06;&#x5143;&#x7D20;&#x9AD8;&#x5EA6;&#x8BBE;&#x4E3A; 0 &#xFF0C;&#x5E76;&#x6D88;&#x9664;&#x8FB9;&#x6846;
filter: blur(0); CSS3&#x5C5E;&#x6027;&#xFF0C;&#x5C06;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x6A21;&#x7CCA;&#x5EA6;&#x8BBE;&#x7F6E;&#x4E3A;0&#xFF0C;&#x4ECE;&#x800C;&#x4F7F;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x201C;&#x6D88;&#x5931;&#x201D;&#x5728;&#x9875;&#x9762;&#x4E2D;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-attribute">visibility</span>: hidden; &#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x7684;&#x9690;&#x85CF;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x4F46;&#x662F;&#x5143;&#x7D20;&#x5360;&#x7528;&#x7684;&#x7A7A;&#x95F4;&#x4EFB;&#x7136;&#x5B58;&#x5728;
<span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>; CSS3&#x5C5E;&#x6027;&#xFF0C;&#x8BBE;&#x7F6E;<span class="hljs-number">0</span>&#x53EF;&#x4EE5;&#x4F7F;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5B8C;&#x5168;&#x900F;&#x660E;
<span class="hljs-attribute">position</span>: absolute; &#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5F88;&#x5927;&#x7684; <span class="hljs-attribute">left</span> &#x8D1F;&#x503C;&#x5B9A;&#x4F4D;&#xFF0C;&#x4F7F;&#x5143;&#x7D20;&#x5B9A;&#x4F4D;&#x5728;&#x53EF;&#x89C1;&#x533A;&#x57DF;&#x4E4B;&#x5916;
<span class="hljs-attribute">display</span>: none; &#x5143;&#x7D20;&#x4F1A;&#x53D8;&#x5F97;&#x4E0D;&#x53EF;&#x89C1;&#xFF0C;&#x5E76;&#x4E14;&#x4E0D;&#x4F1A;&#x518D;&#x5360;&#x7528;&#x6587;&#x6863;&#x7684;&#x7A7A;&#x95F4;&#x3002;
<span class="hljs-attribute">transform</span>: scale(<span class="hljs-number">0</span>); &#x5C06;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E3A;&#x7F29;&#x653E;&#x65E0;&#x9650;&#x5C0F;&#xFF0C;&#x5143;&#x7D20;&#x5C06;&#x4E0D;&#x53EF;&#x89C1;&#xFF0C;&#x5143;&#x7D20;&#x539F;&#x6765;&#x6240;&#x5728;&#x7684;&#x4F4D;&#x7F6E;&#x5C06;&#x88AB;&#x4FDD;&#x7559;
&lt;<span class="hljs-selector-tag">div</span> hidden=<span class="hljs-string">&quot;hidden&quot;</span>&gt; HTML5&#x5C5E;&#x6027;,&#x6548;&#x679C;&#x548C;<span class="hljs-attribute">display</span>:none;&#x76F8;&#x540C;&#xFF0C;&#x4F46;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x7528;&#x4E8E;&#x8BB0;&#x5F55;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x72B6;&#x6001;
<span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>; &#x5C06;&#x5143;&#x7D20;&#x9AD8;&#x5EA6;&#x8BBE;&#x4E3A; <span class="hljs-number">0</span> &#xFF0C;&#x5E76;&#x6D88;&#x9664;&#x8FB9;&#x6846;
<span class="hljs-attribute">filter</span>: blur(<span class="hljs-number">0</span>); CSS3&#x5C5E;&#x6027;&#xFF0C;&#x5C06;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x6A21;&#x7CCA;&#x5EA6;&#x8BBE;&#x7F6E;&#x4E3A;<span class="hljs-number">0</span>&#xFF0C;&#x4ECE;&#x800C;&#x4F7F;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x201C;&#x6D88;&#x5931;&#x201D;&#x5728;&#x9875;&#x9762;&#x4E2D;
</code></pre><h2 id="articleHeader13">rgba() &#x548C; opacity</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="opacity &#x4F5C;&#x7528;&#x4E8E;&#x5143;&#x7D20;&#x4EE5;&#x53CA;&#x5143;&#x7D20;&#x5185;&#x7684;&#x6240;&#x6709;&#x5185;&#x5BB9;&#xFF08;&#x5305;&#x62EC;&#x6587;&#x5B57;&#xFF09;&#x7684;&#x900F;&#x660E;&#x5EA6;
rgba() &#x53EA;&#x4F5C;&#x7528;&#x4E8E;&#x5143;&#x7D20;&#x81EA;&#x8EAB;&#x7684;&#x989C;&#x8272;&#x6216;&#x5176;&#x80CC;&#x666F;&#x8272;&#xFF0C;&#x5B50;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x7EE7;&#x627F;&#x900F;&#x660E;&#x6548;&#x679C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-attribute">opacity</span> &#x4F5C;&#x7528;&#x4E8E;&#x5143;&#x7D20;&#x4EE5;&#x53CA;&#x5143;&#x7D20;&#x5185;&#x7684;&#x6240;&#x6709;&#x5185;&#x5BB9;&#xFF08;&#x5305;&#x62EC;&#x6587;&#x5B57;&#xFF09;&#x7684;&#x900F;&#x660E;&#x5EA6;
<span class="hljs-function"><span class="hljs-title">rgba</span><span class="hljs-params">()</span></span> &#x53EA;&#x4F5C;&#x7528;&#x4E8E;&#x5143;&#x7D20;&#x81EA;&#x8EAB;&#x7684;&#x989C;&#x8272;&#x6216;&#x5176;&#x80CC;&#x666F;&#x8272;&#xFF0C;&#x5B50;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x7EE7;&#x627F;&#x900F;&#x660E;&#x6548;&#x679C;</code></pre><p>## &#x6D4F;&#x89C8;&#x5668;&#x7684;JS&#x517C;&#x5BB9;&#x6027; ##</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5F53;&#x524D;&#x6837;&#x5F0F;&#xFF1A;getComputedStyle(el, null) VS el.currentStyle
&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#xFF1A;e VS window.event
&#x9F20;&#x6807;&#x5750;&#x6807;&#xFF1A;e.pageX, e.pageY VS window.event.x, window.event.y
&#x6309;&#x952E;&#x7801;&#xFF1A;e.which VS event.keyCode
&#x6587;&#x672C;&#x8282;&#x70B9;&#xFF1A;el.textContent VS el.innerText" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&#x5F53;&#x524D;&#x6837;&#x5F0F;&#xFF1A;getComputedStyle(el, null) VS el<span class="hljs-selector-class">.currentStyle</span>
&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#xFF1A;e VS window<span class="hljs-selector-class">.event</span>
&#x9F20;&#x6807;&#x5750;&#x6807;&#xFF1A;e<span class="hljs-selector-class">.pageX</span>, e<span class="hljs-selector-class">.pageY</span> VS window<span class="hljs-selector-class">.event</span><span class="hljs-selector-class">.x</span>, window<span class="hljs-selector-class">.event</span><span class="hljs-selector-class">.y</span>
&#x6309;&#x952E;&#x7801;&#xFF1A;e<span class="hljs-selector-class">.which</span> VS event<span class="hljs-selector-class">.keyCode</span>
&#x6587;&#x672C;&#x8282;&#x70B9;&#xFF1A;el<span class="hljs-selector-class">.textContent</span> VS el.innerText</code></pre><h2 id="articleHeader14">li&#x4E0E;li&#x4E4B;&#x95F4;&#x6709;&#x770B;&#x4E0D;&#x89C1;&#x7684;&#x7A7A;&#x767D;&#x95F4;&#x9694;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="li&#x6392;&#x5217;&#x53D7;&#x5230;&#x4E2D;&#x95F4;&#x7A7A;&#x767D;(&#x56DE;&#x8F66;/&#x7A7A;&#x683C;)&#x7B49;&#x7684;&#x5F71;&#x54CD;&#xFF0C;&#x56E0;&#x4E3A;&#x7A7A;&#x767D;&#x4E5F;&#x5C5E;&#x4E8E;&#x5B57;&#x7B26;&#xFF0C;&#x4F1A;&#x88AB;&#x5E94;&#x7528;&#x6837;&#x5F0F;&#x5360;&#x636E;&#x7A7A;&#x95F4;&#xFF0C;&#x4EA7;&#x751F;&#x95F4;&#x9694;
&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;&#x5728;ul&#x8BBE;&#x7F6E;&#x8BBE;&#x7F6E;font-size=0,&#x5728;li&#x4E0A;&#x8BBE;&#x7F6E;&#x9700;&#x8981;&#x7684;&#x6587;&#x5B57;&#x5927;&#x5C0F;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">li</span>&#x6392;&#x5217;&#x53D7;&#x5230;&#x4E2D;&#x95F4;&#x7A7A;&#x767D;(&#x56DE;&#x8F66;/&#x7A7A;&#x683C;)&#x7B49;&#x7684;&#x5F71;&#x54CD;&#xFF0C;&#x56E0;&#x4E3A;&#x7A7A;&#x767D;&#x4E5F;&#x5C5E;&#x4E8E;&#x5B57;&#x7B26;&#xFF0C;&#x4F1A;&#x88AB;&#x5E94;&#x7528;&#x6837;&#x5F0F;&#x5360;&#x636E;&#x7A7A;&#x95F4;&#xFF0C;&#x4EA7;&#x751F;&#x95F4;&#x9694;
&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;&#x5728;ul&#x8BBE;&#x7F6E;&#x8BBE;&#x7F6E;<span class="hljs-built_in">font</span>-size=<span class="hljs-number">0</span>,&#x5728;<span class="hljs-built_in">li</span>&#x4E0A;&#x8BBE;&#x7F6E;&#x9700;&#x8981;&#x7684;&#x6587;&#x5B57;&#x5927;&#x5C0F;</code></pre><h2 id="articleHeader15">px&#x3001;em</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="px &#x76F8;&#x5BF9;&#x4E8E;&#x663E;&#x793A;&#x5668;&#x5C4F;&#x5E55;&#x5206;&#x8FA8;&#x7387;&#xFF0C;&#x65E0;&#x6CD5;&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x5B57;&#x4F53;&#x653E;&#x5927;&#x529F;&#x80FD;
em &#x503C;&#x5E76;&#x4E0D;&#x662F;&#x56FA;&#x5B9A;&#x7684;&#xFF0C;&#x4F1A;&#x7EE7;&#x627F;&#x7236;&#x7EA7;&#x7684;&#x5B57;&#x4F53;&#x5927;&#x5C0F;&#xFF1A; em = &#x50CF;&#x7D20;&#x503C; / &#x7236;&#x7EA7;font-size" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>px &#x76F8;&#x5BF9;&#x4E8E;&#x663E;&#x793A;&#x5668;&#x5C4F;&#x5E55;&#x5206;&#x8FA8;&#x7387;&#xFF0C;&#x65E0;&#x6CD5;&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x5B57;&#x4F53;&#x653E;&#x5927;&#x529F;&#x80FD;
<span class="hljs-selector-tag">em</span> &#x503C;&#x5E76;&#x4E0D;&#x662F;&#x56FA;&#x5B9A;&#x7684;&#xFF0C;&#x4F1A;&#x7EE7;&#x627F;&#x7236;&#x7EA7;&#x7684;&#x5B57;&#x4F53;&#x5927;&#x5C0F;&#xFF1A; <span class="hljs-selector-tag">em</span> = &#x50CF;&#x7D20;&#x503C; / &#x7236;&#x7EA7;<span class="hljs-attribute">font-size</span></code></pre><h2 id="articleHeader16">FOUC(Flash of Unstyled Content)</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5F53;&#x4F7F;&#x7528; @import &#x5BFC;&#x5165; CSS &#x65F6;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x67D0;&#x4E9B;&#x9875;&#x9762;&#x5728; IE &#x51FA;&#x73B0;&#x5947;&#x602A;&#x7684;&#x73B0;&#x8C61;&#xFF1A; &#x6CA1;&#x6709;&#x6837;&#x5F0F;&#x7684;&#x9875;&#x9762;&#x5185;&#x5BB9;&#x663E;&#x793A;&#x77AC;&#x95F4;&#x95EA;&#x70C1;&#xFF0C;&#x8FD9;&#x79CD;&#x73B0;&#x8C61;&#x79F0;&#x4E3A;&#x201C;&#x6587;&#x6863;&#x6837;&#x5F0F;&#x77ED;&#x6682;&#x5931;&#x6548;&#x201D;&#xFF0C;&#x7B80;&#x79F0;&#x4E3A;FOUC
&#x4EA7;&#x751F;&#x539F;&#x56E0;&#xFF1A;&#x5F53;&#x6837;&#x5F0F;&#x8868;&#x665A;&#x4E8E;&#x7ED3;&#x6784;&#x6027;html&#x52A0;&#x8F7D;&#x65F6;&#xFF0C;&#x52A0;&#x8F7D;&#x5230;&#x6B64;&#x6837;&#x5F0F;&#x8868;&#x65F6;&#xFF0C;&#x9875;&#x9762;&#x5C06;&#x505C;&#x6B62;&#x4E4B;&#x524D;&#x7684;&#x6E32;&#x67D3;&#x3002;
&#x7B49;&#x5F85;&#x6B64;&#x6837;&#x5F0F;&#x8868;&#x88AB;&#x4E0B;&#x8F7D;&#x548C;&#x89E3;&#x6790;&#x540E;&#xFF0C;&#x518D;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x9875;&#x9762;&#xFF0C;&#x671F;&#x95F4;&#x5BFC;&#x81F4;&#x77ED;&#x6682;&#x7684;&#x82B1;&#x5C4F;&#x73B0;&#x8C61;&#x3002;
&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#xFF1A;&#x4F7F;&#x7528; link &#x6807;&#x7B7E;&#x5C06;&#x6837;&#x5F0F;&#x8868;&#x653E;&#x5728;&#x6587;&#x6863; head" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code>&#x5F53;&#x4F7F;&#x7528; @<span class="hljs-keyword">import</span> &#x5BFC;&#x5165; CSS &#x65F6;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x67D0;&#x4E9B;&#x9875;&#x9762;&#x5728; IE &#x51FA;&#x73B0;&#x5947;&#x602A;&#x7684;&#x73B0;&#x8C61;&#xFF1A; &#x6CA1;&#x6709;&#x6837;&#x5F0F;&#x7684;&#x9875;&#x9762;&#x5185;&#x5BB9;&#x663E;&#x793A;&#x77AC;&#x95F4;&#x95EA;&#x70C1;&#xFF0C;&#x8FD9;&#x79CD;&#x73B0;&#x8C61;&#x79F0;&#x4E3A;&#x201C;&#x6587;&#x6863;&#x6837;&#x5F0F;&#x77ED;&#x6682;&#x5931;&#x6548;&#x201D;&#xFF0C;&#x7B80;&#x79F0;&#x4E3A;FOUC
&#x4EA7;&#x751F;&#x539F;&#x56E0;&#xFF1A;&#x5F53;&#x6837;&#x5F0F;&#x8868;&#x665A;&#x4E8E;&#x7ED3;&#x6784;&#x6027;html&#x52A0;&#x8F7D;&#x65F6;&#xFF0C;&#x52A0;&#x8F7D;&#x5230;&#x6B64;&#x6837;&#x5F0F;&#x8868;&#x65F6;&#xFF0C;&#x9875;&#x9762;&#x5C06;&#x505C;&#x6B62;&#x4E4B;&#x524D;&#x7684;&#x6E32;&#x67D3;&#x3002;
&#x7B49;&#x5F85;&#x6B64;&#x6837;&#x5F0F;&#x8868;&#x88AB;&#x4E0B;&#x8F7D;&#x548C;&#x89E3;&#x6790;&#x540E;&#xFF0C;&#x518D;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x9875;&#x9762;&#xFF0C;&#x671F;&#x95F4;&#x5BFC;&#x81F4;&#x77ED;&#x6682;&#x7684;&#x82B1;&#x5C4F;&#x73B0;&#x8C61;&#x3002;
&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#xFF1A;&#x4F7F;&#x7528; link &#x6807;&#x7B7E;&#x5C06;&#x6837;&#x5F0F;&#x8868;&#x653E;&#x5728;&#x6587;&#x6863; head</code></pre><h2 id="articleHeader17">CSS&#x4F18;&#x5316;&#x3001;&#x63D0;&#x9AD8;&#x6027;&#x80FD;</h2><p>&#x591A;&#x4E2A;css&#x5408;&#x5E76;&#xFF0C;&#x5C3D;&#x91CF;&#x51CF;&#x5C11;HTTP&#x8BF7;&#x6C42;<br>&#x5C06;css&#x6587;&#x4EF6;&#x653E;&#x5728;&#x9875;&#x9762;&#x6700;&#x4E0A;&#x9762;<br>&#x79FB;&#x9664;&#x7A7A;&#x7684;css&#x89C4;&#x5219;<br>&#x907F;&#x514D;&#x4F7F;&#x7528;CSS&#x8868;&#x8FBE;&#x5F0F;<br>&#x9009;&#x62E9;&#x5668;&#x4F18;&#x5316;&#x5D4C;&#x5957;&#xFF0C;&#x5C3D;&#x91CF;&#x907F;&#x514D;&#x5C42;&#x7EA7;&#x8FC7;&#x6DF1;<br>&#x5145;&#x5206;&#x5229;&#x7528;css&#x7EE7;&#x627F;&#x5C5E;&#x6027;&#xFF0C;&#x51CF;&#x5C11;&#x4EE3;&#x7801;&#x91CF;<br>&#x62BD;&#x8C61;&#x63D0;&#x53D6;&#x516C;&#x5171;&#x6837;&#x5F0F;&#xFF0C;&#x51CF;&#x5C11;&#x4EE3;&#x7801;&#x91CF;<br>&#x5C5E;&#x6027;&#x503C;&#x4E3A;0&#x65F6;&#xFF0C;&#x4E0D;&#x52A0;&#x5355;&#x4F4D;<br>&#x5C5E;&#x6027;&#x503C;&#x4E3A;&#x5C0F;&#x4E8E;1&#x7684;&#x5C0F;&#x6570;&#x65F6;&#xFF0C;&#x7701;&#x7565;&#x5C0F;&#x6570;&#x70B9;&#x524D;&#x9762;&#x7684;0<br>css&#x96EA;&#x78A7;&#x56FE;</p><h2 id="articleHeader18">&#x5168;&#x5C4F;&#x6EDA;&#x52A8;</h2><p>&#x539F;&#x7406;&#x7C7B;&#x4F3C;&#x56FE;&#x7247;&#x8F6E;&#x64AD;&#x539F;&#x7406;&#xFF0C;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x90E8;&#x5206;&#xFF0C;&#x6EDA;&#x52A8;&#x65F6;&#x663E;&#x793A;<br>&#x53EF;&#x80FD;&#x7528;&#x5230;&#x7684;CSS&#x5C5E;&#x6027;&#xFF1A;overflow:hidden; transform:translate(100%, 100%); display:none;</p><h2 id="articleHeader19">&#x54CD;&#x5E94;&#x5F0F;&#x8BBE;&#x8BA1;ie</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(window).resize(function () {
  screenRespond();
});
screenRespond();
function screenRespond(){
var screenWidth = $(window).width();
if(screenWidth &lt;= 1800){
  $(&quot;body&quot;).attr(&quot;class&quot;, &quot;w1800&quot;);
}
if(screenWidth &lt;= 1400){
  $(&quot;body&quot;).attr(&quot;class&quot;, &quot;w1400&quot;);
}
if(screenWidth &gt; 1800){
  $(&quot;body&quot;).attr(&quot;class&quot;, &quot;&quot;);
}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">window</span>).resize(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  screenRespond();
});
screenRespond();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">screenRespond</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-keyword">var</span> screenWidth = $(<span class="hljs-built_in">window</span>).width();
<span class="hljs-keyword">if</span>(screenWidth &lt;= <span class="hljs-number">1800</span>){
  $(<span class="hljs-string">&quot;body&quot;</span>).attr(<span class="hljs-string">&quot;class&quot;</span>, <span class="hljs-string">&quot;w1800&quot;</span>);
}
<span class="hljs-keyword">if</span>(screenWidth &lt;= <span class="hljs-number">1400</span>){
  $(<span class="hljs-string">&quot;body&quot;</span>).attr(<span class="hljs-string">&quot;class&quot;</span>, <span class="hljs-string">&quot;w1400&quot;</span>);
}
<span class="hljs-keyword">if</span>(screenWidth &gt; <span class="hljs-number">1800</span>){
  $(<span class="hljs-string">&quot;body&quot;</span>).attr(<span class="hljs-string">&quot;class&quot;</span>, <span class="hljs-string">&quot;&quot;</span>);
}
}</code></pre><h2 id="articleHeader20">a&#x6807;&#x7B7E;&#x4E0A;&#x56DB;&#x4E2A;&#x4F2A;&#x7C7B;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;</h2><p>link &gt; visited &gt; hover &gt; active</p><h2 id="articleHeader21">Chrome&#x652F;&#x6301;&#x5C0F;&#x4E8E;12px &#x7684;&#x6587;&#x5B57;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".shrink{
    -webkit-transform:scale(0.8);
    -o-transform:scale(1);
    display:inline-block;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.shrink</span>{
    <span class="hljs-attribute">-webkit-transform</span>:<span class="hljs-built_in">scale</span>(0.8);
    <span class="hljs-attribute">-o-transform</span>:<span class="hljs-built_in">scale</span>(1);
    <span class="hljs-attribute">display</span>:inline-block;
  }</code></pre><h2 id="articleHeader22">TCP&#x4F20;&#x8F93;&#x7684;&#x4E09;&#x6B21;&#x63E1;&#x624B;&#x56DB;&#x6B21;&#x6325;&#x624B;&#x7B56;&#x7565;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4E3A;&#x4E86;&#x51C6;&#x786E;&#x65E0;&#x8BEF;&#x5730;&#x628A;&#x6570;&#x636E;&#x9001;&#x8FBE;&#x76EE;&#x6807;&#x5904;&#xFF0C;TCP&#x534F;&#x8BAE;&#x91C7;&#x7528;&#x4E86;&#x4E09;&#x6B21;&#x63E1;&#x624B;&#x7B56;&#x7565;&#x3002;&#x7528;TCP&#x534F;&#x8BAE;&#x628A;&#x6570;&#x636E;&#x5305;&#x9001;&#x51FA;&#x53BB;&#x540E;&#xFF0C;TCP&#x4E0D;&#x4F1A;&#x5BF9;&#x4F20;&#x9001; &#x540E;&#x7684;&#x60C5;&#x51B5;&#x7F6E;&#x4E4B;&#x4E0D;&#x7406;&#xFF0C;&#x5B83;&#x4E00;&#x5B9A;&#x4F1A;&#x5411;&#x5BF9;&#x65B9;&#x786E;&#x8BA4;&#x662F;&#x5426;&#x6210;&#x529F;&#x9001;&#x8FBE;&#x3002;&#x63E1;&#x624B;&#x8FC7;&#x7A0B;&#x4E2D;&#x4F7F;&#x7528;&#x4E86;TCP&#x7684;&#x6807;&#x5FD7;&#xFF1A;SYN&#x548C;ACK

&#x53D1;&#x9001;&#x7AEF;&#x9996;&#x5148;&#x53D1;&#x9001;&#x4E00;&#x4E2A;&#x5E26;SYN&#x6807;&#x5FD7;&#x7684;&#x6570;&#x636E;&#x5305;&#x7ED9;&#x5BF9;&#x65B9;&#x3002;&#x63A5;&#x6536;&#x7AEF;&#x6536;&#x5230;&#x540E;&#xFF0C;&#x56DE;&#x4F20;&#x4E00;&#x4E2A;&#x5E26;&#x6709;SYN/ACK&#x6807;&#x5FD7;&#x7684;&#x6570;&#x636E;&#x5305;&#x4EE5;&#x793A;&#x4F20;&#x8FBE;&#x786E;&#x8BA4;&#x4FE1;&#x606F;&#x3002; &#x6700;&#x540E;&#xFF0C;&#x53D1;&#x9001;&#x7AEF;&#x518D;&#x56DE;&#x4F20;&#x4E00;&#x4E2A;&#x5E26;ACK&#x6807;&#x5FD7;&#x7684;&#x6570;&#x636E;&#x5305;&#xFF0C;&#x4EE3;&#x8868;&#x201C;&#x63E1;&#x624B;&#x201D;&#x7ED3;&#x675F;&#x3002; &#x82E5;&#x5728;&#x63E1;&#x624B;&#x8FC7;&#x7A0B;&#x4E2D;&#x67D0;&#x4E2A;&#x9636;&#x6BB5;&#x83AB;&#x540D;&#x4E2D;&#x65AD;&#xFF0C;TCP&#x534F;&#x8BAE;&#x4F1A;&#x518D;&#x6B21;&#x4EE5;&#x76F8;&#x540C;&#x7684;&#x987A;&#x5E8F;&#x53D1;&#x9001;&#x76F8;&#x540C;&#x7684;&#x6570;&#x636E;&#x5305;



&#x65AD;&#x5F00;&#x4E00;&#x4E2A;TCP&#x8FDE;&#x63A5;&#x5219;&#x9700;&#x8981;&#x201C;&#x56DB;&#x6B21;&#x63E1;&#x624B;&#x201D;&#xFF1A;

&#x7B2C;&#x4E00;&#x6B21;&#x6325;&#x624B;&#xFF1A;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x53D1;&#x9001;&#x4E00;&#x4E2A;FIN&#xFF0C;&#x7528;&#x6765;&#x5173;&#x95ED;&#x4E3B;&#x52A8;&#x65B9;&#x5230;&#x88AB;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9001;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x544A;&#x8BC9;&#x88AB;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#xFF1A;&#x6211;&#x5DF2;&#x7ECF;&#x4E0D; &#x4F1A;&#x518D;&#x7ED9;&#x4F60;&#x53D1;&#x6570;&#x636E;&#x4E86;(&#x5F53;&#x7136;&#xFF0C;&#x5728;fin&#x5305;&#x4E4B;&#x524D;&#x53D1;&#x9001;&#x51FA;&#x53BB;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x6536;&#x5230;&#x5BF9;&#x5E94;&#x7684;ack&#x786E;&#x8BA4;&#x62A5;&#x6587;&#xFF0C;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x4F9D;&#x7136;&#x4F1A;&#x91CD;&#x53D1;&#x8FD9;&#x4E9B;&#x6570;&#x636E;)&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x6B64;&#x65F6;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x8FD8;&#x53EF; &#x4EE5;&#x63A5;&#x53D7;&#x6570;&#x636E;&#x3002;

&#x7B2C;&#x4E8C;&#x6B21;&#x6325;&#x624B;&#xFF1A;&#x88AB;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x6536;&#x5230;FIN&#x5305;&#x540E;&#xFF0C;&#x53D1;&#x9001;&#x4E00;&#x4E2A;ACK&#x7ED9;&#x5BF9;&#x65B9;&#xFF0C;&#x786E;&#x8BA4;&#x5E8F;&#x53F7;&#x4E3A;&#x6536;&#x5230;&#x5E8F;&#x53F7;+1&#xFF08;&#x4E0E;SYN&#x76F8;&#x540C;&#xFF0C;&#x4E00;&#x4E2A;FIN&#x5360;&#x7528;&#x4E00;&#x4E2A;&#x5E8F;&#x53F7;&#xFF09;&#x3002;

&#x7B2C;&#x4E09;&#x6B21;&#x6325;&#x624B;&#xFF1A;&#x88AB;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x53D1;&#x9001;&#x4E00;&#x4E2A;FIN&#xFF0C;&#x7528;&#x6765;&#x5173;&#x95ED;&#x88AB;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x5230;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9001;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x544A;&#x8BC9;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#xFF0C;&#x6211;&#x7684;&#x6570;&#x636E;&#x4E5F;&#x53D1;&#x9001;&#x5B8C;&#x4E86;&#xFF0C;&#x4E0D;&#x4F1A;&#x518D;&#x7ED9;&#x4F60;&#x53D1;&#x6570;&#x636E;&#x4E86;&#x3002;

&#x7B2C;&#x56DB;&#x6B21;&#x6325;&#x624B;&#xFF1A;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x6536;&#x5230;FIN&#x540E;&#xFF0C;&#x53D1;&#x9001;&#x4E00;&#x4E2A;ACK&#x7ED9;&#x88AB;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#xFF0C;&#x786E;&#x8BA4;&#x5E8F;&#x53F7;&#x4E3A;&#x6536;&#x5230;&#x5E8F;&#x53F7;+1&#xFF0C;&#x81F3;&#x6B64;&#xFF0C;&#x5B8C;&#x6210;&#x56DB;&#x6B21;&#x6325;&#x624B;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>&#x4E3A;&#x4E86;&#x51C6;&#x786E;&#x65E0;&#x8BEF;&#x5730;&#x628A;&#x6570;&#x636E;&#x9001;&#x8FBE;&#x76EE;&#x6807;&#x5904;&#xFF0C;TCP&#x534F;&#x8BAE;&#x91C7;&#x7528;&#x4E86;&#x4E09;&#x6B21;&#x63E1;&#x624B;&#x7B56;&#x7565;&#x3002;&#x7528;TCP&#x534F;&#x8BAE;&#x628A;&#x6570;&#x636E;&#x5305;&#x9001;&#x51FA;&#x53BB;&#x540E;&#xFF0C;TCP&#x4E0D;&#x4F1A;&#x5BF9;&#x4F20;&#x9001; &#x540E;&#x7684;&#x60C5;&#x51B5;&#x7F6E;&#x4E4B;&#x4E0D;&#x7406;&#xFF0C;&#x5B83;&#x4E00;&#x5B9A;&#x4F1A;&#x5411;&#x5BF9;&#x65B9;&#x786E;&#x8BA4;&#x662F;&#x5426;&#x6210;&#x529F;&#x9001;&#x8FBE;&#x3002;&#x63E1;&#x624B;&#x8FC7;&#x7A0B;&#x4E2D;&#x4F7F;&#x7528;&#x4E86;TCP&#x7684;&#x6807;&#x5FD7;&#xFF1A;SYN&#x548C;ACK

&#x53D1;&#x9001;&#x7AEF;&#x9996;&#x5148;&#x53D1;&#x9001;&#x4E00;&#x4E2A;&#x5E26;SYN&#x6807;&#x5FD7;&#x7684;&#x6570;&#x636E;&#x5305;&#x7ED9;&#x5BF9;&#x65B9;&#x3002;&#x63A5;&#x6536;&#x7AEF;&#x6536;&#x5230;&#x540E;&#xFF0C;&#x56DE;&#x4F20;&#x4E00;&#x4E2A;&#x5E26;&#x6709;SYN/ACK&#x6807;&#x5FD7;&#x7684;&#x6570;&#x636E;&#x5305;&#x4EE5;&#x793A;&#x4F20;&#x8FBE;&#x786E;&#x8BA4;&#x4FE1;&#x606F;&#x3002; &#x6700;&#x540E;&#xFF0C;&#x53D1;&#x9001;&#x7AEF;&#x518D;&#x56DE;&#x4F20;&#x4E00;&#x4E2A;&#x5E26;ACK&#x6807;&#x5FD7;&#x7684;&#x6570;&#x636E;&#x5305;&#xFF0C;&#x4EE3;&#x8868;&#x201C;&#x63E1;&#x624B;&#x201D;&#x7ED3;&#x675F;&#x3002; &#x82E5;&#x5728;&#x63E1;&#x624B;&#x8FC7;&#x7A0B;&#x4E2D;&#x67D0;&#x4E2A;&#x9636;&#x6BB5;&#x83AB;&#x540D;&#x4E2D;&#x65AD;&#xFF0C;TCP&#x534F;&#x8BAE;&#x4F1A;&#x518D;&#x6B21;&#x4EE5;&#x76F8;&#x540C;&#x7684;&#x987A;&#x5E8F;&#x53D1;&#x9001;&#x76F8;&#x540C;&#x7684;&#x6570;&#x636E;&#x5305;



&#x65AD;&#x5F00;&#x4E00;&#x4E2A;TCP&#x8FDE;&#x63A5;&#x5219;&#x9700;&#x8981;&#x201C;&#x56DB;&#x6B21;&#x63E1;&#x624B;&#x201D;&#xFF1A;

&#x7B2C;&#x4E00;&#x6B21;&#x6325;&#x624B;&#xFF1A;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x53D1;&#x9001;&#x4E00;&#x4E2A;FIN&#xFF0C;&#x7528;&#x6765;&#x5173;&#x95ED;&#x4E3B;&#x52A8;&#x65B9;&#x5230;&#x88AB;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9001;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x544A;&#x8BC9;&#x88AB;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#xFF1A;&#x6211;&#x5DF2;&#x7ECF;&#x4E0D; &#x4F1A;&#x518D;&#x7ED9;&#x4F60;&#x53D1;&#x6570;&#x636E;&#x4E86;(&#x5F53;&#x7136;&#xFF0C;&#x5728;fin&#x5305;&#x4E4B;&#x524D;&#x53D1;&#x9001;&#x51FA;&#x53BB;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x6536;&#x5230;&#x5BF9;&#x5E94;&#x7684;ack&#x786E;&#x8BA4;&#x62A5;&#x6587;&#xFF0C;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x4F9D;&#x7136;&#x4F1A;&#x91CD;&#x53D1;&#x8FD9;&#x4E9B;&#x6570;&#x636E;)&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x6B64;&#x65F6;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x8FD8;&#x53EF; &#x4EE5;&#x63A5;&#x53D7;&#x6570;&#x636E;&#x3002;

&#x7B2C;&#x4E8C;&#x6B21;&#x6325;&#x624B;&#xFF1A;&#x88AB;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x6536;&#x5230;FIN&#x5305;&#x540E;&#xFF0C;&#x53D1;&#x9001;&#x4E00;&#x4E2A;ACK&#x7ED9;&#x5BF9;&#x65B9;&#xFF0C;&#x786E;&#x8BA4;&#x5E8F;&#x53F7;&#x4E3A;&#x6536;&#x5230;&#x5E8F;&#x53F7;+<span class="hljs-number">1</span>&#xFF08;&#x4E0E;SYN&#x76F8;&#x540C;&#xFF0C;&#x4E00;&#x4E2A;FIN&#x5360;&#x7528;&#x4E00;&#x4E2A;&#x5E8F;&#x53F7;&#xFF09;&#x3002;

&#x7B2C;&#x4E09;&#x6B21;&#x6325;&#x624B;&#xFF1A;&#x88AB;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x53D1;&#x9001;&#x4E00;&#x4E2A;FIN&#xFF0C;&#x7528;&#x6765;&#x5173;&#x95ED;&#x88AB;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x5230;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9001;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x544A;&#x8BC9;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#xFF0C;&#x6211;&#x7684;&#x6570;&#x636E;&#x4E5F;&#x53D1;&#x9001;&#x5B8C;&#x4E86;&#xFF0C;&#x4E0D;&#x4F1A;&#x518D;&#x7ED9;&#x4F60;&#x53D1;&#x6570;&#x636E;&#x4E86;&#x3002;

&#x7B2C;&#x56DB;&#x6B21;&#x6325;&#x624B;&#xFF1A;&#x4E3B;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#x6536;&#x5230;FIN&#x540E;&#xFF0C;&#x53D1;&#x9001;&#x4E00;&#x4E2A;ACK&#x7ED9;&#x88AB;&#x52A8;&#x5173;&#x95ED;&#x65B9;&#xFF0C;&#x786E;&#x8BA4;&#x5E8F;&#x53F7;&#x4E3A;&#x6536;&#x5230;&#x5E8F;&#x53F7;+<span class="hljs-number">1</span>&#xFF0C;&#x81F3;&#x6B64;&#xFF0C;&#x5B8C;&#x6210;&#x56DB;&#x6B21;&#x6325;&#x624B;&#x3002;</code></pre><h2 id="articleHeader23">HTTP&#x548C;HTTPS</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP&#x534F;&#x8BAE;&#x901A;&#x5E38;&#x627F;&#x8F7D;&#x4E8E;TCP&#x534F;&#x8BAE;&#x4E4B;&#x4E0A;&#xFF0C;&#x5728;HTTP&#x548C;TCP&#x4E4B;&#x95F4;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5B89;&#x5168;&#x534F;&#x8BAE;&#x5C42;&#xFF08;SSL&#x6216;TSL&#xFF09;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x6210;&#x4E86;&#x6211;&#x4EEC;&#x5E38;&#x8BF4;&#x7684;HTTPS
&#x9ED8;&#x8BA4;HTTP&#x7684;&#x7AEF;&#x53E3;&#x53F7;&#x4E3A;80&#xFF0C;HTTPS&#x7684;&#x7AEF;&#x53E3;&#x53F7;&#x4E3A;443
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>HTTP&#x534F;&#x8BAE;&#x901A;&#x5E38;&#x627F;&#x8F7D;&#x4E8E;TCP&#x534F;&#x8BAE;&#x4E4B;&#x4E0A;&#xFF0C;&#x5728;HTTP&#x548C;TCP&#x4E4B;&#x95F4;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5B89;&#x5168;&#x534F;&#x8BAE;&#x5C42;&#xFF08;SSL&#x6216;TSL&#xFF09;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x6210;&#x4E86;&#x6211;&#x4EEC;&#x5E38;&#x8BF4;&#x7684;HTTPS
&#x9ED8;&#x8BA4;HTTP&#x7684;&#x7AEF;&#x53E3;&#x53F7;&#x4E3A;<span class="hljs-number">80</span>&#xFF0C;HTTPS&#x7684;&#x7AEF;&#x53E3;&#x53F7;&#x4E3A;<span class="hljs-number">443</span>
</code></pre><p><strong>HTTPS&#x5B89;&#x5168;</strong><br>&#x56E0;&#x4E3A;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x9700;&#x8981;&#x4E2D;&#x95F4;&#x6709;&#x5F88;&#x591A;&#x7684;&#x670D;&#x52A1;&#x5668;&#x8DEF;&#x7531;&#x5668;&#x7684;&#x8F6C;&#x53D1;&#x3002;&#x4E2D;&#x95F4;&#x7684;&#x8282;&#x70B9;&#x90FD;&#x53EF;&#x80FD;&#x7BE1;&#x6539;&#x4FE1;&#x606F;&#xFF0C;&#x800C;&#x5982;&#x679C;&#x4F7F;&#x7528;HTTPS&#xFF0C;&#x5BC6;&#x94A5;&#x5728;&#x4F60;&#x548C;&#x7EC8;&#x70B9;&#x7AD9;&#x624D;&#x6709;&#x3002;https&#x4E4B;&#x6240;&#x4EE5;&#x6BD4;http&#x5B89;&#x5168;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x4ED6;&#x5229;&#x7528;ssl/tls&#x534F;&#x8BAE;&#x4F20;&#x8F93;&#x3002;&#x5B83;&#x5305;&#x542B;&#x8BC1;&#x4E66;&#xFF0C;&#x5378;&#x8F7D;&#xFF0C;&#x6D41;&#x91CF;&#x8F6C;&#x53D1;&#xFF0C;&#x8D1F;&#x8F7D;&#x5747;&#x8861;&#xFF0C;&#x9875;&#x9762;&#x9002;&#x914D;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x9002;&#x914D;&#xFF0C;refer&#x4F20;&#x9012;&#x7B49;&#x3002;&#x4FDD;&#x969C;&#x4E86;&#x4F20;&#x8F93;&#x8FC7;&#x7A0B;&#x7684;&#x5B89;&#x5168;&#x6027;</p><h2 id="articleHeader24">GET&#x548C;POST&#x7684;&#x533A;&#x522B;&#xFF0C;&#x4F55;&#x65F6;&#x4F7F;&#x7528;POST</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET&#xFF1A;&#x4E00;&#x822C;&#x7528;&#x4E8E;&#x4FE1;&#x606F;&#x83B7;&#x53D6;&#xFF0C;&#x4F7F;&#x7528;URL&#x4F20;&#x9012;&#x53C2;&#x6570;&#xFF0C;&#x5BF9;&#x6240;&#x53D1;&#x9001;&#x4FE1;&#x606F;&#x7684;&#x6570;&#x91CF;&#x4E5F;&#x6709;&#x9650;&#x5236;&#xFF0C;&#x4E00;&#x822C;&#x5728;2000&#x4E2A;&#x5B57;&#x7B26;
POST&#xFF1A;&#x4E00;&#x822C;&#x7528;&#x4E8E;&#x4FEE;&#x6539;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x5BF9;&#x6240;&#x53D1;&#x9001;&#x7684;&#x4FE1;&#x606F;&#x6CA1;&#x6709;&#x9650;&#x5236;&#x3002;
GET&#x65B9;&#x5F0F;&#x9700;&#x8981;&#x4F7F;&#x7528;Request.QueryString&#x6765;&#x53D6;&#x5F97;&#x53D8;&#x91CF;&#x7684;&#x503C;&#xFF0C;&#x800C;POST&#x65B9;&#x5F0F;&#x901A;&#x8FC7;Request.Form&#x6765;&#x83B7;&#x53D6;&#x53D8;&#x91CF;&#x7684;&#x503C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;Get&#x662F;&#x901A;&#x8FC7;&#x5730;&#x5740;&#x680F;&#x6765;&#x4F20;&#x503C;&#xFF0C;&#x800C;Post&#x662F;&#x901A;&#x8FC7;&#x63D0;&#x4EA4;&#x8868;&#x5355;&#x6765;&#x4F20;&#x503C;&#x3002;
&#x7136;&#x800C;&#xFF0C;&#x5728;&#x4EE5;&#x4E0B;&#x60C5;&#x51B5;&#x4E2D;&#xFF0C;&#x8BF7;&#x4F7F;&#x7528; POST &#x8BF7;&#x6C42;&#xFF1A;

    &#x65E0;&#x6CD5;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x6587;&#x4EF6;&#xFF08;&#x66F4;&#x65B0;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x7684;&#x6587;&#x4EF6;&#x6216;&#x6570;&#x636E;&#x5E93;&#xFF09;

    &#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x5927;&#x91CF;&#x6570;&#x636E;&#xFF08;POST &#x6CA1;&#x6709;&#x6570;&#x636E;&#x91CF;&#x9650;&#x5236;&#xFF09;

    &#x53D1;&#x9001;&#x5305;&#x542B;&#x672A;&#x77E5;&#x5B57;&#x7B26;&#x7684;&#x7528;&#x6237;&#x8F93;&#x5165;&#x65F6;&#xFF0C;POST &#x6BD4; GET &#x66F4;&#x7A33;&#x5B9A;&#x4E5F;&#x66F4;&#x53EF;&#x9760;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>GET&#xFF1A;&#x4E00;&#x822C;&#x7528;&#x4E8E;&#x4FE1;&#x606F;&#x83B7;&#x53D6;&#xFF0C;&#x4F7F;&#x7528;URL&#x4F20;&#x9012;&#x53C2;&#x6570;&#xFF0C;&#x5BF9;&#x6240;&#x53D1;&#x9001;&#x4FE1;&#x606F;&#x7684;&#x6570;&#x91CF;&#x4E5F;&#x6709;&#x9650;&#x5236;&#xFF0C;&#x4E00;&#x822C;&#x5728;2000&#x4E2A;&#x5B57;&#x7B26;
<span class="hljs-keyword">POST</span>&#xFF1A;&#x4E00;&#x822C;&#x7528;&#x4E8E;&#x4FEE;&#x6539;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x5BF9;&#x6240;&#x53D1;&#x9001;&#x7684;&#x4FE1;&#x606F;&#x6CA1;&#x6709;&#x9650;&#x5236;&#x3002;
GET&#x65B9;&#x5F0F;&#x9700;&#x8981;&#x4F7F;&#x7528;Request.QueryString&#x6765;&#x53D6;&#x5F97;&#x53D8;&#x91CF;&#x7684;&#x503C;&#xFF0C;&#x800C;<span class="hljs-keyword">POST</span>&#x65B9;&#x5F0F;&#x901A;&#x8FC7;Request.<span class="hljs-keyword">Form</span>&#x6765;&#x83B7;&#x53D6;&#x53D8;&#x91CF;&#x7684;&#x503C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;Get&#x662F;&#x901A;&#x8FC7;&#x5730;&#x5740;&#x680F;&#x6765;&#x4F20;&#x503C;&#xFF0C;&#x800C;<span class="hljs-keyword">Post</span>&#x662F;&#x901A;&#x8FC7;&#x63D0;&#x4EA4;&#x8868;&#x5355;&#x6765;&#x4F20;&#x503C;&#x3002;
&#x7136;&#x800C;&#xFF0C;&#x5728;&#x4EE5;&#x4E0B;&#x60C5;&#x51B5;&#x4E2D;&#xFF0C;&#x8BF7;&#x4F7F;&#x7528; <span class="hljs-keyword">POST</span> &#x8BF7;&#x6C42;&#xFF1A;

    &#x65E0;&#x6CD5;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x6587;&#x4EF6;&#xFF08;&#x66F4;&#x65B0;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x7684;&#x6587;&#x4EF6;&#x6216;&#x6570;&#x636E;&#x5E93;&#xFF09;

    &#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x5927;&#x91CF;&#x6570;&#x636E;&#xFF08;<span class="hljs-keyword">POST</span> &#x6CA1;&#x6709;&#x6570;&#x636E;&#x91CF;&#x9650;&#x5236;&#xFF09;

    &#x53D1;&#x9001;&#x5305;&#x542B;&#x672A;&#x77E5;&#x5B57;&#x7B26;&#x7684;&#x7528;&#x6237;&#x8F93;&#x5165;&#x65F6;&#xFF0C;<span class="hljs-keyword">POST</span> &#x6BD4; GET &#x66F4;&#x7A33;&#x5B9A;&#x4E5F;&#x66F4;&#x53EF;&#x9760;</code></pre><h2 id="articleHeader25">&#x4E03;&#x5C42;&#x6A21;&#x578B;</h2>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css&html面试知识点

## 原文链接
[https://segmentfault.com/a/1190000016691028](https://segmentfault.com/a/1190000016691028)

