---
title: 浮动的label
reprint: true
categories: reprint
abbrlink: 7a1c0c7f
date: 2018-11-04 02:30:10
---

{{% raw %}}
<p>&#x5728;web&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x6709;&#x4E00;&#x4E2A;&#x5F88;&#x91CD;&#x7684;&#x6A21;&#x5757;&#x5C31;&#x662F;&#x767B;&#x9646;/&#x6CE8;&#x518C;&#x6A21;&#x5757;&#xFF0C;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x4E3B;&#x4F53;&#x90E8;&#x5206;&#x5C31;&#x662F;&#x4E00;&#x4E2A;form&#x8868;&#x5355;&#xFF0C;&#x8FD9;&#x4E2A;form&#x8868;&#x5355;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#x91CD;&#x8981;input&#x7EC4;&#xFF08;&#x7528;&#x6237;&#x540D;/&#x5BC6;&#x7801;&#xFF09;&#xFF0C;&#x6BCF;&#x4E2A;input&#x7EC4;&#x90FD;&#x5305;&#x542B;label&#x548C;input&#xFF0C;&#x800C;&#x5173;&#x4E8E; <code>label+input</code> &#x7684;&#x5E03;&#x5C40;&#x65B9;&#x6848;&#x591A;&#x79CD;&#x591A;&#x6837;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x8BBE;&#x8BA1;&#x5E08;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x8BBE;&#x8BA1;&#x98CE;&#x683C;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#x53C8;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x3002;&#x901A;&#x8FC7;&#x5BF9;&#x6BD4;&#x53D1;&#x73B0;&#xFF0C;&#x73B0;&#x5728;&#x7684;&#x65B9;&#x6848;&#x662F;&#x65E2;&#x6CE8;&#x91CD;&#x7F8E;&#x89C2;&#xFF0C;&#x53C8;&#x6CE8;&#x91CD;&#x6027;&#x80FD;&#x3002;</p><p>&#x90A3;&#x4E48;&#xFF0C;&#x5173;&#x4E8E;label&#x548C;input&#x90FD;&#x6709;&#x54EA;&#x4E9B;&#x5E03;&#x5C40;&#x65B9;&#x6848;&#x5462;?</p><h3 id="articleHeader0">label+input&#x7684;&#x5E03;&#x5C40;&#x65B9;&#x6848;</h3><ol><li>&#x5C06;label&#x548C;input&#xFF08;palcholder&#x5173;&#x952E;&#x5B57;&#x63D0;&#x793A;&#xFF09;&#x5206;&#x4E3A;&#x4E0A;&#x4E0B;&#x4E24;&#x90E8;&#x5206;; // &#x5F88;&#x4E45;&#x4EE5;&#x524D;&#x91C7;&#x7528;&#xFF0C;&#x73B0;&#x5728;&#x5076;&#x5C14;&#x4F7F;&#x7528;</li><li>&#x5C06;label&#x548C;input&#xFF08;palcholder&#x5173;&#x952E;&#x5B57;&#x63D0;&#x793A;&#xFF09;&#x5206;&#x4E3A;&#x5DE6;&#x53F3;&#x4E24;&#x90E8;&#x5206;&#xFF08;label&#x5360;&#x636E;&#x4E00;&#x5B9A;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x800C;label&#x4E2D;&#x7684;&#x5B57;&#x4F53;&#x91C7;&#x7528;&#x5DE6;&#x5BF9;&#x9F50;&#xFF0C;&#x53F3;&#x5BF9;&#x9F50;&#xFF0C;&#x4E24;&#x7AEF;&#x5BF9;&#x9F50;&#x8FD9;&#x4E09;&#x79CD;&#x5E38;&#x89C1;&#x7684;&#x65B9;&#x6848;&#xFF09;; // &#x6848;&#x4F8B;&#xFF1A;&#x5FAE;&#x535A;&#x767B;&#x9646;&#xFF0C;jd wap&#x767B;&#x9646;&#x9875;&#x9762;&#x7B49;</li><li>label&#x548C;input&#xFF08;palcholder&#x5173;&#x952E;&#x5B57;&#x63D0;&#x793A;&#xFF09;&#x8FD8;&#x662F;&#x5206;&#x4E3A;&#x5DE6;&#x53F3;&#x4E24;&#x90E8;&#x5206;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x662F;label&#x4E2D;&#x7684;&#x5B57;&#x4F53;&#x4F7F;&#x7528;&#x56FE;&#x6807;&#x4EE3;&#x66FF;; // &#x6848;&#x4F8B;&#xFF1A;segment fault&#x793E;&#x533A;&#x767B;&#x9646;&#x9875;&#x9762;&#x7B49;</li><li>&#x53EA;&#x5305;&#x542B;input&#xFF08;palcholder&#x5173;&#x952E;&#x5B57;&#x63D0;&#x793A;&#xFF09;; // &#x6848;&#x4F8B;&#xFF1A;&#x624B;&#x6DD8;&#x7684;&#x767B;&#x9646;&#x9875;&#x9762;&#xFF0C;&#x6398;&#x91D1;&#x5F00;&#x53D1;&#x793E;&#x533A;&#x7684;&#x767B;&#x9646;&#x9875;&#x9762;&#x7B49;</li><li>&#x53EA;&#x663E;&#x793A;input&#xFF08;palcholder&#x5173;&#x952E;&#x5B57;&#x63D0;&#x793A;&#xFF09;&#xFF0C;&#x800C;label&#x91C7;&#x7528;&#x6D6E;&#x52A8;&#x5E76;&#x9690;&#x85CF;&#xFF0C;&#x5F53;&#x89E6;&#x53D1;input&#x7684;&#x7126;&#x70B9;&#x4E8B;&#x4EF6;&#x65F6;label&#x663E;&#x793A;&#x3002; // &#x6848;&#x4F8B;&#xFF1A;&#x624B;&#x6DD8;&#x7684;&#x4E4B;&#x524D;&#x767B;&#x9646;&#x9875;&#x9762;&#xFF0C;&#x6216;&#x8005;&#x53C2;&#x8003;<a href="https://github.com/jverdi/JVFloatLabeledTextField" rel="nofollow noreferrer" target="_blank">JVFloatLabeledTextField</a>&#x7B49;</li></ol><p>&#x8FD9;&#x51E0;&#x79CD;&#x65B9;&#x6848;&#x5404;&#x6709;&#x4F18;&#x52A3;&#xFF0C;&#x4F7F;&#x7528;label&#x5B57;&#x4F53;&#x7528;&#x56FE;&#x6807;&#x4EE3;&#x66FF;&#x66F4;&#x5F62;&#x8C61;&#xFF0C;&#x4F46;&#x662F;&#x589E;&#x52A0;&#x4E86;&#x56FE;&#x6807;&#x7684;url&#x8BBF;&#x95EE;&#xFF1B;label&#x7684;&#x4E2D;&#x7684;&#x5B57;&#x4F53;&#x4E2A;&#x6570;&#x4E0D;&#x4E00;&#x81F4;&#xFF0C;&#x770B;&#x8D77;&#x6765;&#x4E0D;&#x7F8E;&#x89C2;&#xFF0C;&#x5B57;&#x6570;&#x76F8;&#x540C;&#xFF0C;&#x8FD9;&#x79CD;&#x65B9;&#x6848;&#x53EA;&#x80FD;&#x8BF4;&#x4E2D;&#x89C4;&#x4E2D;&#x77E9;&#xFF1B;&#x800C;&#x76F4;&#x63A5;&#x4E22;&#x5F03;label&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x754C;&#x9762;&#x7B80;&#x6D01;&#x7F8E;&#x89C2;&#xFF0C;&#x4F46;&#x662F;label&#x6709;label&#x7684;&#x4F5C;&#x7528;&#xFF08;&#x4E0B;&#x9762;&#x4F1A;&#x8BE6;&#x7EC6;&#x8BF4;label&#x548C;placeholder&#x7684;&#x4F5C;&#x7528;&#xFF09;&#xFF1B;&#x4F7F;&#x7528;&#x6D6E;&#x52A8;&#x7684;label&#xFF0C;&#x589E;&#x52A0;&#x4E86;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x4F46;&#x9700;&#x8981;&#x5F15;&#x5165;js&#xFF0C;&#x8FD9;&#x79CD;&#x65B9;&#x6848;&#x6027;&#x80FD;&#xFF0C;&#x6BD4;&#x8D77;&#x4E0D;&#x4F7F;&#x7528;js&#x7684;&#x660E;&#x663E;&#x8981;&#x9AD8;&#xFF08;&#x6709;&#x4E00;&#x79CD;&#x4E0D;&#x7528;js&#xFF0C;&#x4F46;&#x517C;&#x5BB9;&#x6027;&#x4E0D;&#x662F;&#x592A;&#x597D;&#x7684;&#x65B9;&#x6848;&#xFF09;&#x3002;</p><h3 id="articleHeader1">label vs placholder</h3><p>label: &#x63CF;&#x8FF0;&#x8868;&#x5355;&#x5143;&#x7D20;&#x7684;&#x89D2;&#x8272;&#xFF0C;&#x7528;&#x6765;&#x6307;&#x5B9A;input&#x7684;&#x662F;&#x552F;&#x4E00;&#x5B57;&#x6BB5;&#x540D;&#x79F0;</p><p>placeholder: &#x5B83;&#x63D0;&#x793A;&#x7528;&#x6237;&#x8F93;&#x5165;&#x5185;&#x5BB9;&#x7684;&#x683C;&#x5F0F;</p><p>&#x5B83;&#x4EEC;&#x4E24;&#x4E2A;&#x770B;&#x4F3C;&#x7C7B;&#x4F3C;&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x4EEC;&#x7684;&#x804C;&#x8D23;&#x4E0D;&#x540C;&#xFF0C;&#x5F88;&#x591A;&#x540C;&#x5B66;&#x5728;&#x8FD9;&#x91CC;&#x72AF;&#x4E86;&#x6BD4;&#x8F83;&#x5927;&#x7684;&#x9519;&#x8BEF;&#x3002;</p><p>&#x5982;&#x679C;&#x9700;&#x8981;&#x77E5;&#x9053;&#x5B83;&#x4EEC;&#x66F4;&#x591A;&#x7684;&#x5185;&#x5BB9;&#x53EF;&#x53C2;&#x8003;<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#The_%3Clabel%3E_element" rel="nofollow noreferrer" target="_blank">MDN</a></p><h3 id="articleHeader2">&#x5E26;&#x52A8;&#x753B;&#x7684;label(no-js)</h3><p>&#x5728;&#x505A;&#x7528;&#x6237;&#x4EA4;&#x4E92;&#x7684;&#x9875;&#x9762;&#x65F6;&#xFF0C;&#x5E26;&#x4E0A;&#x52A8;&#x753B;&#x7684;&#x7528;&#x6237;&#x4EA4;&#x4E92;&#xFF0C;&#x5F80;&#x5F80;&#x66F4;&#x5BB9;&#x6613;&#x6253;&#x52A8;&#x7528;&#x6237;&#x3002;&#x4E0B;&#x9762;&#x5C31;&#x4ECB;&#x7ECD;&#x4E00;&#x4E2A;&#x7528;&#x4F2A;&#x7C7B;&#x5B9E;&#x73B0;&#x7684;&#x6D6E;&#x52A8;label&#x3002;</p><p>HTML&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;input-group&quot;&gt;
    &lt;input type=&quot;text&quot; id=&quot;userName&quot; placeholder=&quot;&#x7528;&#x6237;&#x540D;/&#x90AE;&#x7BB1;/&#x5361;&#x53F7;&quot;&gt;
    &lt;label for=&quot;userName&quot;&gt;&#x8D26;&#x53F7;&lt;/label&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;input-group&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;userName&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;&#x7528;&#x6237;&#x540D;/&#x90AE;&#x7BB1;/&#x5361;&#x53F7;&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;userName&quot;</span>&gt;</span>&#x8D26;&#x53F7;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><p>&#x57FA;&#x672C;&#x5E03;&#x5C40;css&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".input-group {
    position: relative;
    margin: 100px 20px;
    font-size: 16px;
}

.input-group&gt;input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 16px;
    font-size: 16px;
    line-height: 1.0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    border-radius: 0.4em;

    transition: box-shadow 0.3s;
}

.input-group input::placeholder {
  color: #cdcdcd;
}

.input-group&gt;input:focus {
    outline: none;
    box-shadow: 0.2em 0.8em 1.6em #cdcdcd;
}

.input-group&gt;label {
    position: absolute;
    bottom: 50%;
    left: 0;
    z-index: -1;
    
    visibility: hidden;
    color: #050505;
    opacity: 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.input-group</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
}

<span class="hljs-selector-class">.input-group</span>&gt;<span class="hljs-selector-tag">input</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.0</span>;
    <span class="hljs-attribute">border</span>: none;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#cdcdcd</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.4em</span>;

    <span class="hljs-attribute">transition</span>: box-shadow <span class="hljs-number">0.3s</span>;
}

<span class="hljs-selector-class">.input-group</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">::placeholder</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#cdcdcd</span>;
}

<span class="hljs-selector-class">.input-group</span>&gt;<span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:focus</span> {
    <span class="hljs-attribute">outline</span>: none;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0.2em</span> <span class="hljs-number">0.8em</span> <span class="hljs-number">1.6em</span> <span class="hljs-number">#cdcdcd</span>;
}

<span class="hljs-selector-class">.input-group</span>&gt;<span class="hljs-selector-tag">label</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
    
    <span class="hljs-attribute">visibility</span>: hidden;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#050505</span>;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}</code></pre><p>&#x9996;&#x5148;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E86; <code>label</code> &#x7684;&#x4F4D;&#x7F6E;&#xFF08;posiion: absolute&#xFF09;&#xFF0C;&#x5E76;&#x5B9A;&#x4E49;&#x4E86;&#x5B83;&#x7684;&#x5C42;&#x7EA7;&#xFF08;z-index: -1&#xFF09;&#xFF0C; &#x663E;&#x9690;&#x6027;&#x4E3A;&#xFF08;visibility: hidden&#xFF09;&#xFF0C;&#x900F;&#x660E;&#x5EA6;&#xFF08;opacity: 0&#xFF09;;</p><p>&#x7136;&#x540E;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E86;input&#x7684; <code>placeholder</code>&#x6837;&#x5F0F;&#xFF0C;&#x53EF;&#x4F7F;&#x7528;&#x4F2A;&#x5143;&#x7D20; <code>::placeholder</code> &#x8BBE;&#x7F6E;&#x5176;&#x6837;&#x5F0F;&#xFF1B;</p><p>&#x6700;&#x540E;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E86;&#x4E00;&#x4E2A;&#x8FC7;&#x6E21;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x5F53;input&#x5143;&#x7D20;&#x6807;&#x7B7E;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x65F6;&#xFF0C;&#x4F7F;&#x7528;&#x4F2A;&#x7C7B; <code>:focus</code> &#x5B9A;&#x4E49;&#x4E86;input&#x5143;&#x7D20;&#x6807;&#x7B7E;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x65F6;&#x7684;&#x9634;&#x5F71;&#x6837;&#x5F0F;&#xFF08;box-shadow&#xFF09;&#x548C;&#x8F6E;&#x5ED3;&#x6837;&#x5F0F;&#xFF08;outline&#xFF09;&#x3002;</p><p>label&#x6D6E;&#x52A8;&#x6548;&#x679C;&#x6837;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" .input-group&gt;label {
      ...

      -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
      -webkit-transform: translate3d(0, 0, 0) scale(0);
              transform: translate3d(0, 0, 0) scale(0);
      -webkit-transition:
          opacity 0.3s,
          visibility 0.3s,
          transform 0.3s,
          z-index 0.3s;
          
              transition:
                  opacity 0.3s,
                  visibility 0.3s,
                  transform 0.3s,
                  z-index 0.3s;
 }

.input-group&gt;input:focus ~ label {
    z-index: 1;
    visibility: visible;
    opacity: 1;
    -webkit-transform: translate3d(0, -36px, 0) scale(1);
        transform: translate3d(0, -36px, 0) scale(1);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code> .input-group&gt;<span class="hljs-selector-tag">label</span> {
      ...

      -webkit-<span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
              <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
      -webkit-<span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>) scale(<span class="hljs-number">0</span>);
              <span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>) scale(<span class="hljs-number">0</span>);
      -webkit-<span class="hljs-attribute">transition</span>:
          <span class="hljs-attribute">opacity</span> <span class="hljs-number">0.3s</span>,
          <span class="hljs-attribute">visibility</span> <span class="hljs-number">0.3s</span>,
          <span class="hljs-attribute">transform</span> <span class="hljs-number">0.3s</span>,
          <span class="hljs-attribute">z-index</span> <span class="hljs-number">0.3s</span>;
          
              <span class="hljs-attribute">transition</span>:
                  <span class="hljs-attribute">opacity</span> <span class="hljs-number">0.3s</span>,
                  <span class="hljs-attribute">visibility</span> <span class="hljs-number">0.3s</span>,
                  <span class="hljs-attribute">transform</span> <span class="hljs-number">0.3s</span>,
                  <span class="hljs-attribute">z-index</span> <span class="hljs-number">0.3s</span>;
 }

.input-group&gt;<span class="hljs-selector-tag">input</span>:focus ~ <span class="hljs-selector-tag">label</span> {
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">visibility</span>: visible;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    -webkit-<span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">0</span>, -<span class="hljs-number">36px</span>, <span class="hljs-number">0</span>) scale(<span class="hljs-number">1</span>);
        <span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">0</span>, -<span class="hljs-number">36px</span>, <span class="hljs-number">0</span>) scale(<span class="hljs-number">1</span>);
}</code></pre><p>&#x5728;&#x5B9A;&#x4E49; <code>label</code> &#x6837;&#x5F0F;&#x7684;&#x96C6;&#x5408;&#x5185;&#xFF0C;&#x6DFB;&#x52A0;&#x5B83;&#x7684;&#x521D;&#x59CB; <code>transform</code> &#x5F62;&#x53D8;&#x6548;&#x679C;&#xFF0C;&#x540C;&#x65F6;&#x8BBE;&#x7F6E; <code>transition</code> &#x8FC7;&#x6E21;&#x6548;&#x679C;&#x6837;&#x5F0F; &#xFF0C;&#x7136;&#x540E;&#x5B9A;&#x4E49;&#x5F53; <code>input</code> &#x83B7;&#x5F97;&#x7126;&#x70B9;&#x65F6;&#xFF0C;&#x5B83;&#x7684;&#x5144;&#x5F1F;&#x5143;&#x7D20; <code>label</code> &#x7684;&#x6837;&#x5F0F;&#x5373;&#x53EF;&#x3002;</p><p>&#x8FD9;&#x79CD;label&#x6D6E;&#x52A8;&#x7684;&#x6548;&#x679C;&#x548C;<a href="https://github.com/jverdi/JVFloatLabeledTextField" rel="nofollow noreferrer" target="_blank">JVFloatLabeledTextField</a>&#x7684;&#x6548;&#x679C;&#x4E0D;&#x540C;&#xFF0C;&#x524D;&#x8005;&#x662F;&#x83B7;&#x53D6;&#x5230;&#x7126;&#x70B9;&#xFF0C;label&#x7ACB;&#x9A6C;&#x5F00;&#x59CB;&#x6D6E;&#x52A8;&#xFF0C;&#x800C;&#x540E;&#x8005;&#x662F;&#x5F53;&#x7528;&#x6237;&#x8F93;&#x5165;&#x5185;&#x5BB9;&#x65F6;&#xFF08;&#x4E5F;&#x5C31;&#x662F;placeholder&#x6D88;&#x5931;&#x65F6;&#xFF09;&#xFF0C;label&#x5F00;&#x59CB;&#x6D6E;&#x52A8;&#x3002;&#x8981;&#x4F7F;&#x4E24;&#x8005;&#x7684;&#x6548;&#x679C;&#x76F8;&#x540C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4F2A;&#x7C7B;&#x53EF;&#x4EE5;&#x5D4C;&#x5957;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x4FEE;&#x6539; <code>.input-group&gt;input:focus ~ label</code> &#x4E3A; <code>.input-group&gt;input:focus:not(:placeholder-shown) ~ label</code> &#xFF0C;&#x8FD9;&#x91CC;&#x7684; <code>:placeholder-shown</code> &#x53EF;&#x4EE5;&#x5B9A;&#x4E49; <code>placeholder</code> &#x7684;&#x663E;&#x9690;&#x6548;&#x679C;&#xFF0C;&#x4F46;&#x5B83;&#x7684;&#x517C;&#x5BB9;&#x6027;&#x4E0D;&#x592A;&#x597D;&#xFF0C;ie/edge &#x538B;&#x6839;&#x4E0D;&#x652F;&#x6301;&#xFF0C;chrome&#x548C;safari&#xFF0C;&#x4EE5;&#x53CA;Firefox&#x8FD8;&#x53EF;&#x4EE5;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x53C2;&#x8003;<a href="https://caniuse.com/#search=placeholder" rel="nofollow noreferrer" target="_blank">can i use</a>&#x3002;&#x66F4;&#x591A;&#x4F2A;&#x7C7B;&#x548C;&#x4F2A;&#x5143;&#x7D20;&#x77E5;&#x8BC6;&#x70B9;&#x603B;&#x7ED3;&#xFF0C;&#x53EF;&#x53C2;&#x8003;<a href="https://github.com/lvzhenbang/pseudo" rel="nofollow noreferrer" target="_blank">pseudo</a></p><h3 id="articleHeader3">&#x6848;&#x4F8B;&#x5C55;&#x793A;</h3><p><a href="https://codepen.io/lvzhenbang/pen/yRowVE" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="lvzhenbang/pen/yRowVE" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h3 id="articleHeader4">&#x5176;&#x4ED6;</h3><p><a href="https://github.com/lvzhenbang/article/blob/master/README.md#html-layout" rel="nofollow noreferrer" target="_blank">&#x66F4;&#x591A;&#x5173;&#x4E8E;html layout&#x6587;&#x7AE0;</a></p><p><a href="https://github.com/lvzhenbang/css3-animate" rel="nofollow noreferrer" target="_blank">css3 &#x52A8;&#x753B;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浮动的label

## 原文链接
[https://segmentfault.com/a/1190000016675704](https://segmentfault.com/a/1190000016675704)

