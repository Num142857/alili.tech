---
title: vue-sticky组件详解
reprint: true
categories: reprint
abbrlink: 953cb153
date: 2018-11-06 02:30:12
---

{{% raw %}}
<h3 id="articleHeader0">sticky&#x7B80;&#x4ECB;</h3><ul><li>sticky&#x7684;&#x672C;&#x610F;&#x662F;&#x7C98;&#x7684;&#xFF0C;&#x7C98;&#x6027;&#x7684;&#xFF0C;&#x4F7F;&#x7528;&#x5176;&#x8FDB;&#x884C;&#x7684;&#x5E03;&#x5C40;&#x88AB;&#x79F0;&#x4E3A;&#x7C98;&#x6027;&#x5E03;&#x5C40;&#x3002;</li><li>sticky&#x662F;position&#x5C5E;&#x6027;&#x65B0;&#x63A8;&#x51FA;&#x7684;&#x503C;&#xFF0C;&#x5C5E;&#x4E8E;CSS3&#x7684;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x5E38;&#x7528;&#x4E0E;&#x5B9E;&#x73B0;&#x5438;&#x9644;&#x6548;&#x679C;&#x3002;</li><li>&#x8BBE;&#x7F6E;&#x4E86;sticky&#x5E03;&#x5C40;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5728;&#x89C6;&#x56FE;&#x7A97;&#x53E3;&#x65F6;&#xFF0C;&#x4E0E;&#x9759;&#x6001;&#x5E03;&#x5C40;&#x7684;&#x8868;&#x73B0;&#x4E00;&#x81F4;&#x3002;</li><li>&#x4F46;&#x5F53;&#x8BE5;&#x5143;&#x7D20;&#x7684;&#x4F4D;&#x7F6E;&#x79FB;&#x51FA;&#x8BBE;&#x7F6E;&#x7684;&#x89C6;&#x56FE;&#x8303;&#x56F4;&#x65F6;&#xFF0C;&#x5176;&#x5B9A;&#x4F4D;&#x6548;&#x679C;&#x5C06;&#x53D8;&#x6210;fixed&#xFF0C;&#x5E76;&#x6839;&#x636E;&#x8BBE;&#x7F6E;&#x7684;left&#x3001;top&#x7B49;&#x4F5C;&#x4E3A;&#x5176;&#x5B9A;&#x4F4D;&#x53C2;&#x6570;&#x3002;</li><li>&#x5177;&#x4F53;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF0C;&#x5F53;&#x9875;&#x9762;&#x6EDA;&#x52A8;&#x81F3;&#x4E0B;&#x65B9;&#xFF0C;&#x539F;&#x672C;&#x9759;&#x6001;&#x5E03;&#x5C40;&#x7684;&#x300C;&#x6F14;&#x804C;&#x5458;&#x8868;&#x300D;&#x5C06;&#x53D8;&#x4E3A;fixed&#x5E03;&#x5C40;&#xFF0C;&#x56FA;&#x5B9A;&#x5728;&#x9875;&#x9762;&#x9876;&#x90E8;&#x3002;<p><span class="img-wrap"><img data-src="/img/remote/1460000016587227?w=420&amp;h=404" src="https://static.alili.tech/img/remote/1460000016587227?w=420&amp;h=404" alt="sticky&#x6548;&#x679C;&#x56FE;" title="sticky&#x6548;&#x679C;&#x56FE;" style="cursor:pointer;display:inline"></span></p></li></ul><h3 id="articleHeader1">sticky&#x517C;&#x5BB9;&#x6027;</h3><p>&#x4E0B;&#x56FE;&#x53EF;&#x89C1;&#xFF0C;&#x9664;&#x4E86;IE&#x4EE5;&#x5916;&#xFF0C;&#x76EE;&#x524D;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x6D4F;&#x89C8;&#x5668;&#x90FD;&#x662F;&#x652F;&#x6301;sticky&#x5E03;&#x5C40;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016587228?w=1269&amp;h=524" src="https://static.alili.tech/img/remote/1460000016587228?w=1269&amp;h=524" alt="sticky&#x517C;&#x5BB9;&#x6027;" title="sticky&#x517C;&#x5BB9;&#x6027;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader2">&#x9700;&#x6C42;&#x80CC;&#x666F;</h3><ul><li>&#x4F46;&#x662F;&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#x5E76;&#x4E0D;&#x5982;&#x4E0A;&#x56FE;&#x5C55;&#x793A;&#x7684;&#x90A3;&#x4E48;&#x7F8E;&#x597D;&#xFF0C;&#x5728;360&#x5B89;&#x5168;&#x6D4F;&#x89C8;&#x5668;&#x4E0A;&#xFF0C;&#x5E76;&#x4E0D;&#x652F;&#x6301;sticky&#x5E03;&#x5C40;&#xFF0C;&#x5373;&#x4F7F;&#x4F7F;&#x7528;&#x6781;&#x901F;&#x6A21;&#x5F0F;&#xFF08;&#x4F7F;&#x7528;chrome&#x5185;&#x6838;&#x8FD0;&#x884C;&#xFF09;&#x4E5F;&#x4E0D;&#x652F;&#x6301;&#x3002;</li><li>&#x53E6;&#x5916;&#xFF0C;&#x7B14;&#x8005;&#x5728;&#x7F51;&#x4E0A;&#x627E;&#x8FC7;&#x76F8;&#x5173;&#x7684;vue-sticky&#x7EC4;&#x4EF6;&#x3002;&#x4F46;&#x662F;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x5E76;&#x4E0D;&#x662F;&#x90A3;&#x4E48;&#x987A;&#x624B;&#xFF0C;&#x800C;&#x4E14;&#x770B;&#x5176;&#x6E90;&#x7801;&#x4E5F;&#x662F;&#x4E00;&#x5934;&#x96FE;&#x6C34;&#xFF0C;&#x7528;&#x7740;&#x4E0D;&#x8E0F;&#x5B9E;&#x3002;</li><li>&#x6240;&#x4EE5;&#x81EA;&#x5DF1;&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#xFF0C;&#x5E0C;&#x671B;&#x901A;&#x8FC7;&#x672C;&#x6587;&#x80FD;&#x5C06;&#x7EC4;&#x4EF6;&#x5206;&#x4EAB;&#x51FA;&#x53BB;&#xFF0C;&#x4E5F;&#x5E0C;&#x671B;&#x5C06;&#x672C;&#x7EC4;&#x4EF6;&#x7684;&#x539F;&#x7406;&#x8BB2;&#x6E05;&#x695A;&#x3002;&#x8BA9;&#x5176;&#x4ED6;&#x540C;&#x5B66;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x80FD;&#x66F4;&#x8E0F;&#x5B9E;&#x4E00;&#x4E9B;&#x3002;&#x9047;&#x5230;&#x5751;&#x4E5F;&#x77E5;&#x9053;&#x8BE5;&#x600E;&#x4E48;&#x53BB;&#x586B;&#x3002;&#x5E0C;&#x671B;&#x80FD;&#x5E2E;&#x5230;&#x5927;&#x5BB6;&#x3002;<p><span class="img-wrap"><img data-src="/img/remote/1460000016587229?w=561&amp;h=300" src="https://static.alili.tech/img/remote/1460000016587229?w=561&amp;h=300" alt="&#x5E0C;&#x671B;&#x80FD;&#x5E2E;&#x5230;&#x5927;&#x5BB6;" title="&#x5E0C;&#x671B;&#x80FD;&#x5E2E;&#x5230;&#x5927;&#x5BB6;" style="cursor:pointer;display:inline"></span></p></li></ul><h3 id="articleHeader3">&#x9762;&#x5411;&#x4EBA;&#x7FA4;</h3><ul><li>&#x6025;&#x4E8E;&#x4F7F;&#x7528;vue-sticky&#x7EC4;&#x4EF6;&#x7684;&#x540C;&#x5B66;&#x3002;&#x76F4;&#x63A5;&#x4E0B;&#x8F7D;&#x6587;&#x4EF6;&#xFF0C;&#x62F7;&#x8D1D;&#x4EE3;&#x7801;&#x5373;&#x53EF;&#x8FD0;&#x884C;&#x3002;</li><li>&#x559C;&#x6B22;&#x770B;&#x6E90;&#x7801;&#xFF0C;&#x5E0C;&#x671B;&#x4E86;&#x89E3;&#x7EC4;&#x4EF6;&#x80CC;&#x540E;&#x539F;&#x7406;&#x7684;&#x540C;&#x5B66;&#x3002;<br>&#x5176;&#x5B9E;&#x672C;sticky&#x7EC4;&#x4EF6;&#x539F;&#x7406;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x770B;&#x5B8C;&#x672C;&#x6587;&#xFF0C;&#x76F8;&#x4FE1;&#x4F60;&#x4E00;&#x5B9A;&#x80FD;&#x628A;&#x80CC;&#x540E;&#x539F;&#x7406;&#x770B;&#x61C2;&#x3002;<br>&#x521A;&#x63A5;&#x89E6;&#x524D;&#x7AEF;&#x7684;&#x540C;&#x5B66;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x672C;&#x6587;&#x7AE0;&#x517B;&#x6210;&#x770B;&#x6E90;&#x7801;&#x7684;&#x4E60;&#x60EF;&#x3002;&#x6253;&#x7834;&#x5BF9;&#x6E90;&#x7801;&#x7684;&#x6050;&#x60E7;&#xFF0C;&#x76F8;&#x4FE1;&#x81EA;&#x5DF1;&#xFF0C;&#x5176;&#x5B9E;&#x770B;&#x6E90;&#x7801;&#x5E76;&#x6CA1;&#x6709;&#x60F3;&#x8C61;&#x4E2D;&#x7684;&#x90A3;&#x4E48;&#x56F0;&#x96BE;<p><span class="img-wrap"><img data-src="/img/remote/1460000016587230?w=580&amp;h=348" src="https://static.alili.tech/img/remote/1460000016587230?w=580&amp;h=348" alt="&#x539F;&#x6765;&#x5982;&#x6B64;" title="&#x539F;&#x6765;&#x5982;&#x6B64;" style="cursor:pointer;display:inline"></span></p></li></ul><h3 id="articleHeader4">&#x7EC4;&#x4EF6;&#x5B8C;&#x6574;&#x6E90;&#x7801;&#x5982;&#x4E0B;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!--sticky&#x7EC4;&#x4EF6;--&gt;
&lt;template&gt;
  &lt;!--&#x76D2;&#x5B50;&#x5BB9;&#x5668;--&gt;
  &lt;section ref=&quot;$box&quot; class=&quot;c-sticky-box&quot; :style=&quot;boxStyle&quot;&gt;
    &lt;!--&#x5185;&#x5BB9;&#x5BB9;&#x5668;--&gt;
    &lt;div ref=&quot;$content&quot; class=&quot;content&quot; :style=&quot;contentStyle&quot;&gt;
      &lt;slot&gt;&lt;/slot&gt;
    &lt;/div&gt;
  &lt;/section&gt;
&lt;/template&gt;

&lt;script&gt;

export default {
  props: {
    top: {
      type: [String],
      default: &apos;unset&apos;,
    },
    left: {
      type: [String],
      default: &apos;unset&apos;,
    },
  },

  data() {
    return {
      boxStyle: {
        position: &apos;static&apos;,
        top: 0,
        left: 0,
        width: &apos;auto&apos;, // &#x5360;&#x4F4D;&#xFF0C;&#x4E3A;&#x4E86;&#x5F62;&#x6210;&#x6570;&#x636E;&#x7ED1;&#x5B9A;
        height: &apos;auto&apos;,
      },
      contentStyle: {
        position: &apos;static&apos;,
        top: 0,
        left: 0,
        width: &apos;auto&apos;,
        height: &apos;auto&apos;,
      },
      isFixedX: false, // &#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x8BBE;&#x7F6E;&#x4E3A;fixed&#x5E03;&#x5C40;&#xFF0C;&#x7528;&#x4E8E;&#x4F18;&#x5316;&#x6027;&#x80FD;&#xFF0C;&#x9632;&#x6B62;&#x591A;&#x6B21;&#x8BBE;&#x7F6E;
      isFixedY: false, // &#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x8BBE;&#x7F6E;&#x4E3A;fixed&#x5E03;&#x5C40;&#xFF0C;&#x7528;&#x4E8E;&#x4F18;&#x5316;&#x6027;&#x80FD;&#xFF0C;&#x9632;&#x6B62;&#x591A;&#x6B21;&#x8BBE;&#x7F6E;
      isSupport: this.cssSupport(&apos;position&apos;, &apos;sticky&apos;),
      // isSupport: false,
    }
  },

  mounted() {
    if (!this.isSupport) { // &#x4E0D;&#x652F;&#x6301;sticky
      this.getContentSize() // &#x83B7;&#x53D6;&#x5185;&#x5BB9;&#x5BBD;&#x9AD8;
      this.scrollHandler() // &#x4E3B;&#x52A8;&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#x4F4D;&#x7F6E;&#x8BBE;&#x7F6E;&#x64CD;&#x4F5C;
      window.addEventListener(&apos;resize&apos;, this.onResize)
      window.addEventListener(&apos;scroll&apos;, this.scrollHandler, true)
    } else {
      this.boxStyle = {
        position: &apos;sticky&apos;,
        top: this.top,
        left: this.left,
      }
    }
  },

  beforeDestroy() {
    if (!this.isSupport) {
      window.removeEventListener(&apos;resize&apos;, this.onResize)
      window.removeEventListener(&apos;scroll&apos;, this.scrollHandler, true)
    }
  },

  methods: {
    // &#x5224;&#x65AD;&#x662F;&#x5426;&#x652F;&#x6301;&#x67D0;&#x6837;&#x5F0F;&#x7684;&#x51FD;&#x6570;
    cssSupport(attr, value) {
      let element = document.createElement(&apos;div&apos;)
      if (attr in element.style) {
        element.style[attr] = value
        return element.style[attr] === value
      } else {
        return false
      }
    },

    // &#x83B7;&#x53D6;dom&#x6570;&#x636E;
    getContentSize() {
      // &#x83B7;&#x53D6;&#x5185;&#x5BB9;&#x5BB9;&#x5668;&#x5BBD;&#x9AD8;&#x4FE1;&#x606F;
      const style = window.getComputedStyle(this.$refs.$content)

      // &#x8BBE;&#x7F6E;&#x76D2;&#x5B50;&#x5BB9;&#x5668;&#x7684;&#x5BBD;&#x9AD8;&#xFF0C;&#x4E3A;&#x4E86;&#x540E;&#x7EED;&#x5360;&#x4F4D;
      this.boxStyle.width = style.width
      this.boxStyle.height = style.height
    },

    // &#x9875;&#x9762;&#x7F29;&#x653E;&#x91CD;&#x7F6E;&#x5927;&#x5C0F;&#x65F6;&#xFF0C;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#x5176;&#x4F4D;&#x7F6E;
    onResize() {
      const { $box } = this.$refs
      const { contentStyle } = this
      const boxTop = $box.getBoundingClientRect().top
      const boxLeft = $box.getBoundingClientRect().left

      if (contentStyle.position === &apos;fixed&apos;) {
        contentStyle.top = this.top === &apos;unset&apos; ? `${boxTop}px` : this.top
        contentStyle.left = this.left === &apos;unset&apos; ? `${boxLeft}px` : this.left
      }
    },

    scrollHandler() {
      const { $content, $box } = this.$refs
      const { contentStyle } = this
      const boxTop = $box.getBoundingClientRect().top
      const boxLeft = $box.getBoundingClientRect().left
      const contentTop = $content.getBoundingClientRect().top
      const contentLeft = $content.getBoundingClientRect().left

      if (this.top !== &apos;unset&apos;) {
        if (boxTop &gt; parseInt(this.top) &amp;&amp; this.isFixedY) {
          this.isFixedY = false
          contentStyle.position = &apos;static&apos;
        } else if (boxTop &lt; parseInt(this.top) &amp;&amp; !this.isFixedY) {
          this.isFixedY = true
          contentStyle.position = &apos;fixed&apos;
          this.onResize()
        }

        // &#x5F53;&#x4F4D;&#x7F6E;&#x8DDD;&#x5DE6;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x65F6;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;fixed&#x5BF9;&#x8C61;left&#x7684;&#x503C;&#xFF0C;&#x9632;&#x6B62;&#x5DE6;&#x53F3;&#x6EDA;&#x52A8;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x95EE;&#x9898;
        if (contentLeft !== boxLeft &amp;&amp; this.left === &apos;unset&apos;) {
          this.onResize()
        }
      }

      if (this.left !== &apos;unset&apos;) {
        if (boxLeft &gt; parseInt(this.left) &amp;&amp; this.isFixedX) {
          this.isFixedX = false
          contentStyle.position = &apos;static&apos;
        } else if (boxLeft &lt; parseInt(this.left) &amp;&amp; !this.isFixedX) {
          this.isFixedX = true
          contentStyle.position = &apos;fixed&apos;
          this.onResize()
        }

        // &#x5F53;&#x4F4D;&#x7F6E;&#x8DDD;&#x5DE6;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x65F6;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;fixed&#x5BF9;&#x8C61;left&#x7684;&#x503C;&#xFF0C;&#x9632;&#x6B62;&#x5DE6;&#x53F3;&#x6EDA;&#x52A8;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x95EE;&#x9898;
        if (contentTop !== boxTop &amp;&amp; this.top === &apos;unset&apos;) {
          this.onResize()
        }
      }
    },
  },

}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--sticky&#x7EC4;&#x4EF6;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-comment">&lt;!--&#x76D2;&#x5B50;&#x5BB9;&#x5668;--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;$box&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;c-sticky-box&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;boxStyle&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!--&#x5185;&#x5BB9;&#x5BB9;&#x5668;--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;$content&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;content&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;contentStyle&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">top</span>: {
      <span class="hljs-attr">type</span>: [<span class="hljs-built_in">String</span>],
      <span class="hljs-attr">default</span>: <span class="hljs-string">&apos;unset&apos;</span>,
    },
    <span class="hljs-attr">left</span>: {
      <span class="hljs-attr">type</span>: [<span class="hljs-built_in">String</span>],
      <span class="hljs-attr">default</span>: <span class="hljs-string">&apos;unset&apos;</span>,
    },
  },

  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">boxStyle</span>: {
        <span class="hljs-attr">position</span>: <span class="hljs-string">&apos;static&apos;</span>,
        <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">left</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">width</span>: <span class="hljs-string">&apos;auto&apos;</span>, <span class="hljs-comment">// &#x5360;&#x4F4D;&#xFF0C;&#x4E3A;&#x4E86;&#x5F62;&#x6210;&#x6570;&#x636E;&#x7ED1;&#x5B9A;</span>
        height: <span class="hljs-string">&apos;auto&apos;</span>,
      },
      <span class="hljs-attr">contentStyle</span>: {
        <span class="hljs-attr">position</span>: <span class="hljs-string">&apos;static&apos;</span>,
        <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">left</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">width</span>: <span class="hljs-string">&apos;auto&apos;</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-string">&apos;auto&apos;</span>,
      },
      <span class="hljs-attr">isFixedX</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// &#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x8BBE;&#x7F6E;&#x4E3A;fixed&#x5E03;&#x5C40;&#xFF0C;&#x7528;&#x4E8E;&#x4F18;&#x5316;&#x6027;&#x80FD;&#xFF0C;&#x9632;&#x6B62;&#x591A;&#x6B21;&#x8BBE;&#x7F6E;</span>
      isFixedY: <span class="hljs-literal">false</span>, <span class="hljs-comment">// &#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x8BBE;&#x7F6E;&#x4E3A;fixed&#x5E03;&#x5C40;&#xFF0C;&#x7528;&#x4E8E;&#x4F18;&#x5316;&#x6027;&#x80FD;&#xFF0C;&#x9632;&#x6B62;&#x591A;&#x6B21;&#x8BBE;&#x7F6E;</span>
      isSupport: <span class="hljs-keyword">this</span>.cssSupport(<span class="hljs-string">&apos;position&apos;</span>, <span class="hljs-string">&apos;sticky&apos;</span>),
      <span class="hljs-comment">// isSupport: false,</span>
    }
  },

  mounted() {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.isSupport) { <span class="hljs-comment">// &#x4E0D;&#x652F;&#x6301;sticky</span>
      <span class="hljs-keyword">this</span>.getContentSize() <span class="hljs-comment">// &#x83B7;&#x53D6;&#x5185;&#x5BB9;&#x5BBD;&#x9AD8;</span>
      <span class="hljs-keyword">this</span>.scrollHandler() <span class="hljs-comment">// &#x4E3B;&#x52A8;&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#x4F4D;&#x7F6E;&#x8BBE;&#x7F6E;&#x64CD;&#x4F5C;</span>
      <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&apos;resize&apos;</span>, <span class="hljs-keyword">this</span>.onResize)
      <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&apos;scroll&apos;</span>, <span class="hljs-keyword">this</span>.scrollHandler, <span class="hljs-literal">true</span>)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.boxStyle = {
        <span class="hljs-attr">position</span>: <span class="hljs-string">&apos;sticky&apos;</span>,
        <span class="hljs-attr">top</span>: <span class="hljs-keyword">this</span>.top,
        <span class="hljs-attr">left</span>: <span class="hljs-keyword">this</span>.left,
      }
    }
  },

  beforeDestroy() {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.isSupport) {
      <span class="hljs-built_in">window</span>.removeEventListener(<span class="hljs-string">&apos;resize&apos;</span>, <span class="hljs-keyword">this</span>.onResize)
      <span class="hljs-built_in">window</span>.removeEventListener(<span class="hljs-string">&apos;scroll&apos;</span>, <span class="hljs-keyword">this</span>.scrollHandler, <span class="hljs-literal">true</span>)
    }
  },

  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">// &#x5224;&#x65AD;&#x662F;&#x5426;&#x652F;&#x6301;&#x67D0;&#x6837;&#x5F0F;&#x7684;&#x51FD;&#x6570;</span>
    cssSupport(attr, value) {
      <span class="hljs-keyword">let</span> element = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;div&apos;</span>)
      <span class="hljs-keyword">if</span> (attr <span class="hljs-keyword">in</span> element.style) {
        element.style[attr] = value
        <span class="hljs-keyword">return</span> element.style[attr] === value
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
      }
    },

    <span class="hljs-comment">// &#x83B7;&#x53D6;dom&#x6570;&#x636E;</span>
    getContentSize() {
      <span class="hljs-comment">// &#x83B7;&#x53D6;&#x5185;&#x5BB9;&#x5BB9;&#x5668;&#x5BBD;&#x9AD8;&#x4FE1;&#x606F;</span>
      <span class="hljs-keyword">const</span> style = <span class="hljs-built_in">window</span>.getComputedStyle(<span class="hljs-keyword">this</span>.$refs.$content)

      <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x76D2;&#x5B50;&#x5BB9;&#x5668;&#x7684;&#x5BBD;&#x9AD8;&#xFF0C;&#x4E3A;&#x4E86;&#x540E;&#x7EED;&#x5360;&#x4F4D;</span>
      <span class="hljs-keyword">this</span>.boxStyle.width = style.width
      <span class="hljs-keyword">this</span>.boxStyle.height = style.height
    },

    <span class="hljs-comment">// &#x9875;&#x9762;&#x7F29;&#x653E;&#x91CD;&#x7F6E;&#x5927;&#x5C0F;&#x65F6;&#xFF0C;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#x5176;&#x4F4D;&#x7F6E;</span>
    onResize() {
      <span class="hljs-keyword">const</span> { $box } = <span class="hljs-keyword">this</span>.$refs
      <span class="hljs-keyword">const</span> { contentStyle } = <span class="hljs-keyword">this</span>
      <span class="hljs-keyword">const</span> boxTop = $box.getBoundingClientRect().top
      <span class="hljs-keyword">const</span> boxLeft = $box.getBoundingClientRect().left

      <span class="hljs-keyword">if</span> (contentStyle.position === <span class="hljs-string">&apos;fixed&apos;</span>) {
        contentStyle.top = <span class="hljs-keyword">this</span>.top === <span class="hljs-string">&apos;unset&apos;</span> ? <span class="hljs-string">`<span class="hljs-subst">${boxTop}</span>px`</span> : <span class="hljs-keyword">this</span>.top
        contentStyle.left = <span class="hljs-keyword">this</span>.left === <span class="hljs-string">&apos;unset&apos;</span> ? <span class="hljs-string">`<span class="hljs-subst">${boxLeft}</span>px`</span> : <span class="hljs-keyword">this</span>.left
      }
    },

    scrollHandler() {
      <span class="hljs-keyword">const</span> { $content, $box } = <span class="hljs-keyword">this</span>.$refs
      <span class="hljs-keyword">const</span> { contentStyle } = <span class="hljs-keyword">this</span>
      <span class="hljs-keyword">const</span> boxTop = $box.getBoundingClientRect().top
      <span class="hljs-keyword">const</span> boxLeft = $box.getBoundingClientRect().left
      <span class="hljs-keyword">const</span> contentTop = $content.getBoundingClientRect().top
      <span class="hljs-keyword">const</span> contentLeft = $content.getBoundingClientRect().left

      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.top !== <span class="hljs-string">&apos;unset&apos;</span>) {
        <span class="hljs-keyword">if</span> (boxTop &gt; <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">this</span>.top) &amp;&amp; <span class="hljs-keyword">this</span>.isFixedY) {
          <span class="hljs-keyword">this</span>.isFixedY = <span class="hljs-literal">false</span>
          contentStyle.position = <span class="hljs-string">&apos;static&apos;</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (boxTop &lt; <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">this</span>.top) &amp;&amp; !<span class="hljs-keyword">this</span>.isFixedY) {
          <span class="hljs-keyword">this</span>.isFixedY = <span class="hljs-literal">true</span>
          contentStyle.position = <span class="hljs-string">&apos;fixed&apos;</span>
          <span class="hljs-keyword">this</span>.onResize()
        }

        <span class="hljs-comment">// &#x5F53;&#x4F4D;&#x7F6E;&#x8DDD;&#x5DE6;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x65F6;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;fixed&#x5BF9;&#x8C61;left&#x7684;&#x503C;&#xFF0C;&#x9632;&#x6B62;&#x5DE6;&#x53F3;&#x6EDA;&#x52A8;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x95EE;&#x9898;</span>
        <span class="hljs-keyword">if</span> (contentLeft !== boxLeft &amp;&amp; <span class="hljs-keyword">this</span>.left === <span class="hljs-string">&apos;unset&apos;</span>) {
          <span class="hljs-keyword">this</span>.onResize()
        }
      }

      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.left !== <span class="hljs-string">&apos;unset&apos;</span>) {
        <span class="hljs-keyword">if</span> (boxLeft &gt; <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">this</span>.left) &amp;&amp; <span class="hljs-keyword">this</span>.isFixedX) {
          <span class="hljs-keyword">this</span>.isFixedX = <span class="hljs-literal">false</span>
          contentStyle.position = <span class="hljs-string">&apos;static&apos;</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (boxLeft &lt; <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">this</span>.left) &amp;&amp; !<span class="hljs-keyword">this</span>.isFixedX) {
          <span class="hljs-keyword">this</span>.isFixedX = <span class="hljs-literal">true</span>
          contentStyle.position = <span class="hljs-string">&apos;fixed&apos;</span>
          <span class="hljs-keyword">this</span>.onResize()
        }

        <span class="hljs-comment">// &#x5F53;&#x4F4D;&#x7F6E;&#x8DDD;&#x5DE6;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x65F6;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;fixed&#x5BF9;&#x8C61;left&#x7684;&#x503C;&#xFF0C;&#x9632;&#x6B62;&#x5DE6;&#x53F3;&#x6EDA;&#x52A8;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x95EE;&#x9898;</span>
        <span class="hljs-keyword">if</span> (contentTop !== boxTop &amp;&amp; <span class="hljs-keyword">this</span>.top === <span class="hljs-string">&apos;unset&apos;</span>) {
          <span class="hljs-keyword">this</span>.onResize()
        }
      }
    },
  },

}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h3 id="articleHeader5">&#x6280;&#x672F;&#x96BE;&#x70B9;</h3><p>sticky&#x6548;&#x679C;&#x9700;&#x8981;&#x89E3;&#x51B3;&#x8FD9;&#x4E48;&#x51E0;&#x4E2A;&#x95EE;&#x9898;</p><ul><li>&#x5360;&#x4F4D;&#x95EE;&#x9898;&#xFF0C;sticky&#x5B9E;&#x73B0;&#x539F;&#x7406;&#xFF0C;&#x65E0;&#x975E;&#x662F;&#x5728;&#x7279;&#x5B9A;&#x8D85;&#x51FA;&#x89C6;&#x56FE;&#x65F6;&#xFF0C;&#x5C06;&#x5185;&#x5BB9;&#x7684;&#x5E03;&#x5C40;&#x8BBE;&#x4E3A;fixed&#x3002;&#x4F46;&#x5C06;&#x5185;&#x5BB9;&#x8BBE;&#x7F6E;&#x4E3A;fixed&#x5E03;&#x5C40;&#x65F6;&#xFF0C;&#x5185;&#x5BB9;&#x5C06;&#x8131;&#x79BB;&#x6587;&#x6863;&#x6D41;&#xFF0C;&#x539F;&#x672C;&#x5360;&#x636E;&#x7684;&#x7A7A;&#x95F4;&#x5C06;&#x88AB;&#x91CA;&#x653E;&#x6389;&#xFF0C;&#x8FD9;&#x5C06;&#x5BFC;&#x81F4;&#x9875;&#x9762;&#x7A7A;&#x4E86;&#x4E00;&#x5757;&#x540E;&#x5176;&#x4ED6;&#x5185;&#x5BB9;&#x53D1;&#x751F;&#x4F4D;&#x79FB;&#x3002;</li><li>&#x9875;&#x9762;resize&#x540E;&#x4F4D;&#x7F6E;&#x95EE;&#x9898;&#x3002;&#x5F53;&#x4F7F;&#x7528;fixed&#x5B9A;&#x4F4D;&#x65F6;&#xFF0C;&#x5176;&#x5B9A;&#x4F4D;&#x5C06;&#x6839;&#x636E;&#x9875;&#x9762;&#x8FDB;&#x884C;&#x3002;&#x82E5;&#x9875;&#x9762;&#x5927;&#x5C0F;&#x53D1;&#x73B0;&#x53D8;&#x5316;&#xFF0C;&#x539F;&#x663E;&#x793A;&#x7684;&#x4F4D;&#x7F6E;&#x53EF;&#x80FD;&#x4E0E;&#x9875;&#x9762;&#x53D8;&#x5316;&#x540E;&#x7684;&#x4E0D;&#x4E00;&#x81F4;&#x3002;&#x8FD9;&#x65F6;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;&#x3002;</li><li>&#x6A2A;&#x5411;&#x6EDA;&#x52A8;&#x6761;&#x95EE;&#x9898;&#x3002;&#x672C;&#x8D28;&#x4E0A;&#x548C;resize&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x9700;&#x8981;&#x76D1;&#x542C;scroll&#x4E8B;&#x4EF6;&#xFF0C;&#x5F53;&#x9875;&#x9762;&#x53D1;&#x9001;&#x65E0;&#x76F8;&#x5173;&#x65B9;&#x5411;&#x7684;&#x4F4D;&#x79FB;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#x5176;&#x4F4D;&#x7F6E;&#xFF0C;&#x4F8B;&#x5982;&#x524D;&#x9762;&#x7684;sticky&#x6548;&#x679C;&#x793A;&#x4F8B;&#x4E2D;&#x8BBE;&#x7F6E;&#x4E86;&#x300C;&#x6F14;&#x804C;&#x5458;&#x8868;&#x300D;&#x7684;top&#x503C;&#xFF0C;&#x5F53;&#x5176;fixed&#x540E;&#xFF0C;&#x6EDA;&#x52A8;X&#x8F74;&#xFF0C;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;fixed&#x7684;left&#x53C2;&#x6570;&#x3002;&#x8BA9;&#x5143;&#x7D20;&#x59CB;&#x7EC8;&#x4F4D;&#x4E8E;&#x9875;&#x9762;&#x76F8;&#x540C;&#x4F4D;&#x7F6E;<p><span class="img-wrap"><img data-src="/img/remote/1460000016587231?w=400&amp;h=225" src="https://static.alili.tech/img/remote/1460000016587231?w=400&amp;h=225" alt="&#x6280;&#x672F;&#x96BE;&#x70B9;" title="&#x6280;&#x672F;&#x96BE;&#x70B9;" style="cursor:pointer"></span></p></li></ul><h3 id="articleHeader6">&#x5B9E;&#x73B0;&#x601D;&#x8DEF;</h3><ul><li><p>&#x7EC4;&#x4EF6;&#x6709;&#x4E24;&#x5C42;&#x5BB9;&#x5668;</p><ul><li>&#x4E00;&#x4E2A;&#x662F;&#x5185;&#x5BB9;slot&#x7684;&#x5BB9;&#x5668;$content</li><li>&#x4E00;&#x4E2A;&#x662F;&#x5185;&#x5BB9;&#x5BB9;&#x5668;$content&#x7684;sticky&#x76D2;&#x5B50;&#x5BB9;&#x5668;$box</li><li>&#x5373;&#x5305;&#x56F4;&#x5173;&#x7CFB;&#x4E3A;$sticky-box($content(slot))</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;section ref=&quot;$box&quot; class=&quot;c-sticky-box&quot; :style=&quot;boxStyle&quot;&gt;
  &lt;div ref=&quot;$content&quot; class=&quot;content&quot; :style=&quot;contentStyle&quot;&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/div&gt;
&lt;/section&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;section ref=<span class="hljs-string">&quot;$box&quot;</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;c-sticky-box&quot;</span> :style=<span class="hljs-string">&quot;boxStyle&quot;</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;$content&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;content&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;contentStyle&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/section&gt;</span></code></pre></li><li><p>&#x76D1;&#x542C;vue&#x7684;mounted&#x4E8B;&#x4EF6;</p><ul><li>&#x8FD9;&#x65F6;&#x5185;&#x5BB9;slot&#x5DF2;&#x7ECF;&#x88AB;&#x6E32;&#x67D3;&#x51FA;&#x6765;</li><li>&#x83B7;&#x53D6;slot&#x5BB9;&#x5668;$content&#x7684;&#x5BBD;&#x9AD8;&#xFF0C;&#x8BBE;&#x7F6E;&#x5230;$box&#x5BB9;&#x5668;&#x4E0A;</li><li>&#x8BBE;&#x7F6E;$box&#x5BB9;&#x5668;&#x5BBD;&#x9AD8;&#x662F;&#x4E3A;&#x4E86;&#x5F53;&#x540E;&#x7EED;$content&#x5BB9;&#x5668;Fixed&#x540E;&#xFF0C;$box&#x5BB9;&#x5668;&#x4ECD;&#x5728;&#x9875;&#x9762;&#x4E2D;&#x5360;&#x636E;&#x7A7A;&#x95F4;&#x3002;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const style = window.getComputedStyle(this.$refs.$content)
this.boxStyle.width = style.width
this.boxStyle.height = style.height" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>const style = window.getComputedStyle(this.<span class="hljs-variable">$refs</span>.<span class="hljs-variable">$content</span>)
this<span class="hljs-selector-class">.boxStyle</span><span class="hljs-selector-class">.width</span> = style<span class="hljs-selector-class">.width</span>
this<span class="hljs-selector-class">.boxStyle</span><span class="hljs-selector-class">.height</span> = style.<span class="hljs-attribute">height</span></code></pre></li><li><p>&#x76D1;&#x542C;scroll&#x4E8B;&#x4EF6;</p><ul><li>&#x5728;&#x4E8B;&#x4EF6;&#x4E2D;&#x83B7;&#x53D6;&#x5BB9;&#x5668;$content&#x5728;&#x9875;&#x9762;&#x4E2D;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x5E76;&#x5C06;&#x5176;&#x4E0E;&#x9884;&#x8BBE;&#x503C;&#x8FDB;&#x884C;&#x5927;&#x5C0F;&#x6BD4;&#x8F83;&#xFF0C;&#x5224;&#x65AD;$content&#x662F;&#x5426;&#x5E94;&#x8BE5;fixed</li><li>&#x600E;&#x4E48;&#x4FBF;&#x6377;&#x5730;&#x83B7;&#x53D6;$content&#x5728;&#x9875;&#x9762;&#x4E2D;&#x7684;&#x4F4D;&#x7F6E;&#x5462;&#xFF1F;&#x76F4;&#x63A5;&#x4F7F;&#x7528;Element.getBoundingClientRect()&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x5C06;&#x8FD4;&#x56DE;{left&#xFF0C;top}&#x5206;&#x522B;&#x8868;&#x793A;dom&#x5143;&#x7D20;&#x8DDD;&#x79BB;&#x7A97;&#x53E3;&#x7684;&#x8DDD;&#x79BB;&#x3002;&#x8BE6;&#x7EC6;&#x53EF;&#x53C2;&#x770B;<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect" rel="nofollow noreferrer" target="_blank">MDN&#x6587;&#x6863;</a></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { $content, $box } = this.$refs
const { contentStyle } = this
const boxTop = $box.getBoundingClientRect().top
const boxLeft = $box.getBoundingClientRect().left
const contentTop = $content.getBoundingClientRect().top
const contentLeft = $content.getBoundingClientRect().left" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>const { <span class="hljs-variable">$content</span>, <span class="hljs-variable">$box</span> } = this.<span class="hljs-variable">$refs</span>
const { contentStyle } = this
const boxTop = <span class="hljs-variable">$box</span>.getBoundingClientRect()<span class="hljs-selector-class">.top</span>
const boxLeft = <span class="hljs-variable">$box</span>.getBoundingClientRect()<span class="hljs-selector-class">.left</span>
const contentTop = <span class="hljs-variable">$content</span>.getBoundingClientRect()<span class="hljs-selector-class">.top</span>
const contentLeft = <span class="hljs-variable">$content</span>.getBoundingClientRect().<span class="hljs-attribute">left</span></code></pre><ul><li>&#x6BD4;&#x8F83;boxTop&#x4E0E;&#x9884;&#x8BBE;&#x503C;top&#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x5F53;boxTop&#x6BD4;&#x9884;&#x8BBE;&#x503C;&#x503C;&#x8981;&#x5C0F;&#x65F6;&#xFF0C;&#x5373;&#x5185;&#x5BB9;&#x5373;&#x5C06;&#x79FB;&#x51FA;&#x89C4;&#x5B9A;&#x7684;&#x89C6;&#x56FE;&#x8303;&#x56F4;&#x3002;&#x8FD9;&#x65F6;&#x5C06;&#x5185;&#x5BB9;&#x5BB9;&#x5668;$content&#x8BBE;&#x7F6E;&#x4E3A;fixed&#x3002;&#x5E76;&#x8BBE;&#x7F6E;&#x5176;top&#x503C;&#xFF08;&#x5373;&#x9884;&#x8BBE;&#x7684;top&#x503C;&#xFF0C;&#x5438;&#x9876;&#x8DDD;&#x79BB;&#xFF09;&#xFF0C;left&#x503C;&#x4E0E;&#x76D2;&#x5B50;&#x4F4D;&#x7F6E;&#x76F8;&#x540C;&#xFF0C;&#x6545;&#x8BBE;&#x7F6E;&#x4E3A;&#x76D2;&#x5B50;&#x8DDD;&#x79BB;&#x7684;left&#x503C;</li><li>&#x5F53;boxTop&#x6BD4;&#x9884;&#x8BBE;&#x503C;&#x503C;&#x8981;&#x5927;&#x65F6;&#xFF0C;&#x5373;&#x5185;&#x5BB9;&#x91CD;&#x65B0;&#x8FD4;&#x56DE;&#x7684;&#x89C6;&#x56FE;&#x8303;&#x56F4;&#x3002;&#x5219;&#x5C06;&#x5185;&#x5BB9;&#x5BB9;&#x5668;$content&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;&#x4F1A;&#x9759;&#x6001;&#x5E03;&#x5C40;&#xFF0C;&#x8BA9;&#x5176;&#x91CD;&#x65B0;&#x56DE;&#x5230;&#x76D2;&#x5B50;&#x5E03;&#x5C40;&#x5185;&#x90E8;&#x3002;&#x7531;&#x4E8E;&#x9759;&#x6001;&#x5E03;&#x5C40;&#x4E0D;&#x53D7;left&#x548C;top&#x7684;&#x5F71;&#x54CD;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x9700;&#x8981;&#x8BBE;&#x7F6E;left&#x548C;top</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (boxTop &gt; parseInt(this.top) &amp;&amp; this.isFixedY) {
  contentStyle.position = &apos;static&apos;
} else if (boxTop &lt; parseInt(this.topI) &amp;&amp; !this.isFixedY) {
  contentStyle.position = &apos;fixed&apos;
  contentStyle.top = this.top
  contentStyle.left = `${boxLeft}px`
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-keyword">if</span> (boxTop &gt; parseInt(<span class="hljs-keyword">this</span>.top) &amp;&amp; <span class="hljs-keyword">this</span>.isFixedY) {
  contentStyle.position = <span class="hljs-string">&apos;static&apos;</span>
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (boxTop &lt; parseInt(<span class="hljs-keyword">this</span>.topI) &amp;&amp; !<span class="hljs-keyword">this</span>.isFixedY) {
  contentStyle.position = <span class="hljs-string">&apos;fixed&apos;</span>
  contentStyle.top = <span class="hljs-keyword">this</span>.top
  contentStyle.left = `${boxLeft}px`
}</code></pre><ul><li>&#x5728;scroll&#x4E8B;&#x4EF6;&#x4E2D;&#xFF0C;&#x9664;&#x4E86;Y&#x8F74;&#x65B9;&#x5411;&#x4E0A;&#x7684;&#x6EDA;&#x52A8;&#xFF0C;&#x8FD8;&#x53EF;&#x80FD;&#x53D1;&#x751F;X&#x8F74;&#x65B9;&#x5411;&#x7684;&#x6EDA;&#x52A8;&#x3002;&#x8FD9;&#x4E9B;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;fixed&#x5143;&#x7D20;&#x7684;left&#x503C;&#xFF0C;&#x8BA9;&#x5176;&#x4E0E;&#x76D2;&#x5B50;&#x5BB9;&#x5668;&#x7684;left&#x503C;&#x4E00;&#x81F4;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5F53;&#x4F4D;&#x7F6E;&#x8DDD;&#x5DE6;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x65F6;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;fixed&#x5BF9;&#x8C61;left&#x7684;&#x503C;&#xFF0C;&#x9632;&#x6B62;&#x5DE6;&#x53F3;&#x6EDA;&#x52A8;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x95EE;&#x9898;
if (contentLeft !== boxLeft &amp;&amp; this.left === &apos;unset&apos;) {
  const { $box } = this.$refs
  const { contentStyle } = this
  const boxTop = $box.getBoundingClientRect().top
  const boxLeft = $box.getBoundingClientRect().left
  if (contentStyle.position === &apos;fixed&apos;) {
    contentStyle.top = this.top
    contentStyle.left = `${boxLeft}px`
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code><span class="hljs-comment">// &#x5F53;&#x4F4D;&#x7F6E;&#x8DDD;&#x5DE6;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x65F6;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;fixed&#x5BF9;&#x8C61;left&#x7684;&#x503C;&#xFF0C;&#x9632;&#x6B62;&#x5DE6;&#x53F3;&#x6EDA;&#x52A8;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x95EE;&#x9898;</span>
<span class="hljs-keyword">if</span> (contentLeft !== boxLeft &amp;&amp; <span class="hljs-keyword">this</span>.left === <span class="hljs-string">&apos;unset&apos;</span>) {
  <span class="hljs-keyword">const</span> { $<span class="hljs-built_in">box</span> } = <span class="hljs-keyword">this</span>.$refs
  <span class="hljs-keyword">const</span> { contentStyle } = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">const</span> boxTop = $<span class="hljs-built_in">box</span>.getBoundingClientRect().top
  <span class="hljs-keyword">const</span> boxLeft = $<span class="hljs-built_in">box</span>.getBoundingClientRect().left
  <span class="hljs-keyword">if</span> (contentStyle.position === <span class="hljs-string">&apos;fixed&apos;</span>) {
    contentStyle.top = <span class="hljs-keyword">this</span>.top
    contentStyle.left = `${boxLeft}px`
  }
}</code></pre></li><li><p>&#x6700;&#x540E;&#xFF0C;&#x662F;&#x76D1;&#x542C;&#x9875;&#x9762;&#x7684;resize&#x4E8B;&#x4EF6;&#xFF0C;&#x9632;&#x6B62;&#x9875;&#x9762;&#x5927;&#x5C0F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;fixed&#x76F8;&#x5BF9;&#x9875;&#x9762;&#x7684;&#x53D8;&#x5316;&#x3002;&#x540C;&#x6837;&#x7684;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;left&#x503C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5F53;&#x4F4D;&#x7F6E;&#x8DDD;&#x5DE6;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x65F6;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;fixed&#x5BF9;&#x8C61;left&#x7684;&#x503C;&#xFF0C;&#x9632;&#x6B62;&#x5DE6;&#x53F3;&#x6EDA;&#x52A8;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x95EE;&#x9898;
const { $box } = this.$refs
const { contentStyle } = this
const boxTop = $box.getBoundingClientRect().top
const boxLeft = $box.getBoundingClientRect().left

if (contentStyle.position === &apos;fixed&apos;) {
  contentStyle.top = this.top === &apos;unset&apos; ? `${boxTop}px` : this.top
  contentStyle.left = this.left === &apos;unset&apos; ? `${boxLeft}px` : this.left
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nsis"><code>// &#x5F53;&#x4F4D;&#x7F6E;&#x8DDD;&#x5DE6;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x65F6;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;fixed&#x5BF9;&#x8C61;<span class="hljs-literal">left</span>&#x7684;&#x503C;&#xFF0C;&#x9632;&#x6B62;&#x5DE6;&#x53F3;&#x6EDA;&#x52A8;&#x4F4D;&#x7F6E;&#x4E0D;&#x5BF9;&#x95EE;&#x9898;
const { <span class="hljs-variable">$box</span> } = this.<span class="hljs-variable">$refs</span>
const { contentStyle } = this
const boxTop = <span class="hljs-variable">$box</span>.getBoundingClientRect().<span class="hljs-literal">top</span>
const boxLeft = <span class="hljs-variable">$box</span>.getBoundingClientRect().<span class="hljs-literal">left</span>

if (contentStyle.position === <span class="hljs-string">&apos;fixed&apos;</span>) {
  contentStyle.<span class="hljs-literal">top</span> = this.<span class="hljs-literal">top</span> === <span class="hljs-string">&apos;unset&apos;</span> ? <span class="hljs-string">`<span class="hljs-variable">${boxTop}</span>px`</span> : this.<span class="hljs-literal">top</span>
  contentStyle.<span class="hljs-literal">left</span> = this.<span class="hljs-literal">left</span> === <span class="hljs-string">&apos;unset&apos;</span> ? <span class="hljs-string">`<span class="hljs-variable">${boxLeft}</span>px`</span> : this.<span class="hljs-literal">left</span>
}</code></pre></li></ul><h3 id="articleHeader7">&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5730;&#x65B9;</h3><ul><li>&#x76EE;&#x524D;&#x4EC5;&#x652F;&#x6301;top&#x4E0E;left&#x503C;&#x7684;&#x5355;&#x72EC;&#x4F7F;&#x7528;&#xFF0C;&#x6682;&#x4E0D;&#x652F;&#x6301;&#x540C;&#x65F6;&#x8BBE;&#x7F6E;</li><li>&#x76EE;&#x524D;&#x4EC5;&#x652F;&#x6301;px&#x5355;&#x4F4D;&#xFF0C;&#x6682;&#x4E0D;&#x652F;&#x6301;rem&#x53CA;&#x767E;&#x5206;&#x6BD4;&#x5355;&#x4F4D;</li><li><p>&#x8BBE;&#x7F6E;&#x5185;&#x5BB9;&#x6837;&#x5F0F;&#x65F6;&#x9700;&#x8981;&#x6CE8;&#x610F;&#xFF0C;&#x8BBE;&#x7F6E;&#x5B9A;&#x4F4D;&#x76F8;&#x5173;&#x5C5E;&#x6027;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x5728;box&#x5BB9;&#x5668;&#x4E0A;&#xFF0C;&#x4F8B;&#x5982;&#x8BBE;&#x7F6E;&apos;displCy: inline-block;&apos;,&apos;verticCl-Clign: top;&apos;&#xFF0C;&apos;margin&apos;</p><ul><li>&#x8BBE;&#x7F6E;&#x5916;&#x89C2;&#x6837;&#x5F0F;&#xFF0C;&#x5982;&#x80CC;&#x666F;&#xFF0C;&#x8FB9;&#x6846;&#x7B49;&#xFF0C;&#x5219;&#x8BBE;&#x7F6E;&#x5728;slot&#x5185;&#x5BB9;&#x4E2D;</li><li>&#x5373;&#x5185;&#x5BB9;content-box&#x4EE5;&#x5916;&#x7684;&#x8BBE;&#x7F6E;&#x5728;box&#x5BB9;&#x5668;&#x4E2D;&#xFF0C;content-box&#x4EE5;&#x5185;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x5219;&#x8BBE;&#x7F6E;&#x5728;slot&#x5185;&#x5BB9;&#x4E2D;</li></ul></li><li>&#x76D2;&#x5B50;&#x5BB9;&#x5668;&#x4E0D;&#x9700;&#x8981;&#x8BBE;&#x7F6E;position&#x5C5E;&#x6027;&#xFF0C;&#x5373;&#x4F7F;&#x6709;&#x4E5F;&#x4F1A;&#x88AB;&#x51B2;&#x5237;&#x6389;&#x3002;&#x56E0;&#x4E3A;&#x7A0B;&#x5E8F;&#x5C06;&#x5185;&#x90E8;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;position&#x7684;&#x503C;</li><li>&#x540C;&#x6837;&#x7684;&#xFF0C;&#x5728;&#x6837;&#x5F0F;&#x4E2D;&#x8BBE;&#x7F6E;&#x76D2;&#x5B50;&#x5BB9;&#x5668;&#x7684;left&#x548C;top&#x503C;&#x4E5F;&#x662F;&#x65E0;&#x6548;&#x7684;&#xFF0C;&#x4F1A;&#x88AB;&#x7A0B;&#x5E8F;&#x5185;&#x90E8;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;&#x3002;&#x53EA;&#x80FD;&#x901A;&#x8FC7;dom&#x5C5E;&#x6027;&#x503C;&#x4F20;&#x9012;&#x5230;&#x7EC4;&#x4EF6;&#x4E2D;&#x8FDB;&#x884C;&#x8BBE;&#x7F6E;<p><span class="img-wrap"><img data-src="/img/remote/1460000016587232?w=145&amp;h=105" src="https://static.alili.tech/img/remote/1460000016587232?w=145&amp;h=105" alt="&#x6280;&#x672F;&#x96BE;&#x70B9;" title="&#x6280;&#x672F;&#x96BE;&#x70B9;" style="cursor:pointer"></span></p></li></ul><h3 id="articleHeader8">&#x540E;&#x7EED;&#x4F18;&#x5316;</h3><p>&#x76EE;&#x524D;&#x672C;&#x7EC4;&#x4EF6;&#x4EC5;&#x5B9E;&#x73B0;&#x4E86;&#x57FA;&#x672C;&#x529F;&#x80FD;&#xFF0C;&#x540E;&#x7EED;&#x8FD8;&#x5C06;&#x7EE7;&#x7EED;&#x4F18;&#x5316;&#x4EE5;&#x4E0B;&#x529F;&#x80FD;</p><ul><li><p>slot&#x5185;&#x5BB9;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x56FE;&#x7247;&#xFF0C;&#x5982;&#x679C;&#x83B7;&#x53D6;&#x8BBE;&#x7F6E;&#x5BBD;&#x9AD8;&#xFF0C;&#xFF08;&#x76D1;&#x542C;&#x6240;&#x6709;&#x56FE;&#x7247;&#x7684;load&#x4E8B;&#x4EF6;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;&#x5BB9;&#x5668;&#x7684;&#x9AD8;&#x5BBD;&#xFF09;</p><ul><li>&#x76EE;&#x524D;&#x4EC5;&#x5728;mounted&#x4E2D;&#x83B7;&#x53D6;slot&#x7684;&#x5BBD;&#x9AD8;&#xFF0C;&#x8FD9;&#x4EC5;&#x4EC5;&#x662F;dom&#x5143;&#x7D20;&#x88AB;&#x6E32;&#x67D3;&#xFF0C;&#x4F46;&#x662F;dom&#x5185;&#x5BB9;&#x662F;&#x5426;&#x52A0;&#x8F7D;&#x5B8C;&#x6BD5;&#x5E76;&#x4E0D;&#x77E5;&#x9053;&#x7684;&#xFF0C;&#x5982;img&#x6807;&#x7B7E;&#xFF0C;&#x540E;&#x7EED;&#x5728;slot&#x4E2D;&#xFF0C;&#x76D1;&#x542C;&#x6240;&#x6709;img&#x6807;&#x7B7E;&#x7684;load&#x4E8B;&#x4EF6;&#xFF0C;load&#x4E2D;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;&#x7EC4;&#x4EF6;&#x5BB9;&#x5668;&#x7684;&#x5927;&#x5C0F;</li></ul></li><li><p>slot&#x5185;&#x5BB9;&#x6709;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x8BBE;&#x7F6E;&#x5BB9;&#x5668;</p><ul><li>&#x540C;&#x6837;&#x7684;&#xFF0C;&#x5F53;slot&#x5185;&#x5BB9;&#x53D8;&#x5316;&#x540E;&#xFF0C;&#x91CD;&#x65B0;&#x8BBE;&#x7F6E;$content&#x7684;&#x5BBD;&#x9AD8;</li><li>&#x5177;&#x4F53;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#xFF0C;&#x6682;&#x65F6;&#x8FD8;&#x6CA1;&#x6709;&#x5934;&#x7EEA;</li></ul></li><li><p>&#x79FB;&#x52A8;&#x7AEF;&#x9002;&#x914D;</p><ul><li>&#x76EE;&#x524D;&#x53EA;&#x6D4B;&#x8BD5;&#x4E86;&#x5728;PC&#x4E2D;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x6682;&#x672A;&#x5728;&#x79FB;&#x52A8;&#x7AEF;&#x505A;&#x6D4B;&#x8BD5;&#x3002;&#x4E0D;&#x6392;&#x9664;&#x79FB;&#x52A8;&#x7AEF;&#x4F7F;&#x7528;&#x5B58;&#x5728;&#x5751;</li></ul></li><li><p>&#x5355;&#x4F4D;&#x9002;&#x914D;</p><ul><li>&#x76EE;&#x524D;&#x53EA;&#x652F;&#x6301;PX&#x5355;&#x4F4D;&#xFF0C;&#x672A;&#x652F;&#x6301;rem&#xFF0C;&#x767E;&#x5206;&#x767E;&#x7B49;&#x5355;&#x4F4D;</li></ul></li><li>left&#x548C;top&#x503C;&#x7684;&#x6DF7;&#x5408;&#x4F7F;&#x7528;&#xFF0C;&#x76EE;&#x524D;&#x53EA;&#x652F;&#x6301;&#x5355;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x6682;&#x4E0D;&#x652F;&#x6301;&#x540C;&#x65F6;&#x8BBE;&#x7F6E;</li></ul><h3 id="articleHeader9"><a href="https://github.com/Momo707577045/vue-sticky-box" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x6E90;&#x7801;&#x53CA;&#x793A;&#x4F8B;</a></h3><h3 id="articleHeader10">&#x7B2C;&#x4E00;&#x7A3F;&#x5199;&#x5B8C;&#x4E86;&#xFF0C;&#x6492;&#x82B1;&#x82B1;</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000016587233?w=354&amp;h=291" src="https://static.alili.tech/img/remote/1460000016587233?w=354&amp;h=291" alt="&#x6492;&#x82B1;&#x82B1;" title="&#x6492;&#x82B1;&#x82B1;" style="cursor:pointer;display:inline"></span></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-sticky组件详解

## 原文链接
[https://segmentfault.com/a/1190000016587224](https://segmentfault.com/a/1190000016587224)

