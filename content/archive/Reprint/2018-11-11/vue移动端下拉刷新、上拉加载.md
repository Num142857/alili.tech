---
title: vue移动端下拉刷新、上拉加载
hidden: true
categories: reprint
slug: 8d66ec23
date: 2018-11-11 02:30:07
---

{{< raw >}}
<p>&#x7531;&#x4E8E;&#x81EA;&#x8EAB;&#x7684;&#x9879;&#x76EE;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x53EA;&#x6709;&#x51E0;&#x4E2A;H5&#x9875;&#x9762;&#xFF0C;&#x7528;&#x6765;&#x5D4C;&#x5165;app&#x4E2D;&#xFF0C;&#x6240;&#x6709;&#x6CA1;&#x6709;&#x5F15;&#x5165;&#x79FB;&#x52A8;&#x7AEF;&#x7684;UI&#x6846;&#x67B6;&#xFF0C;&#x4F46;&#x662F;&#x4ECB;&#x4E8E;&#x80FD;&#x8BA9;&#x7528;&#x6237;&#x5728;&#x6D4F;&#x89C8;H5&#x9875;&#x9762;&#x65F6;&#x6709;&#x4E0B;&#x62C9;&#x5237;&#x65B0;&#x548C;&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#xFF0C;&#x6709;&#x66F4;&#x597D;&#x7684;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#xFF0C;&#x81EA;&#x5DF1;&#x5199;&#x7EC4;&#x4EF6;&#x5B9E;&#x73B0;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016309648?w=375&amp;h=667" src="https://static.alili.tech/img/remote/1460000016309648?w=375&amp;h=667" alt="Refresh&amp;Load" title="Refresh&amp;Load" style="cursor:pointer;display:inline"></span></p><blockquote><strong>1</strong>&#x3001;&#x4E0B;&#x62C9;&#x5237;&#x65B0;<code>DropDownRefresh.vue</code></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template lang=&quot;html&quot;&gt;
    &lt;div class=&quot;refreshMoudle&quot; @touchstart=&quot;touchStart($event)&quot; @touchmove=&quot;touchMove($event)&quot; @touchend=&quot;touchEnd($event)&quot; :style=&quot;{transform: &apos;translate3d(0,&apos; + top + &apos;px, 0)&apos;}&quot;&gt;
      &lt;header class=&quot;pull-refresh&quot;&gt;
        &lt;slot name=&quot;pull-refresh&quot;&gt;
          &lt;div class=&quot;down-tip&quot; v-if=&quot;dropDownState==1&quot;&gt;
            &lt;img v-if=&quot;dropDownStateText.downImg&quot; class=&quot;down-tip-img&quot; :src=&quot;require(&apos;../../assets/images/refreshAndReload/&apos;+dropDownStateText.downImg)&quot;&gt;
            &lt;span class=&quot;down-tip-text&quot;&gt;{{dropDownStateText.downTxt}}&lt;/span&gt;
          &lt;/div&gt;
          &lt;div class=&quot;up-tip&quot; v-if=&quot;dropDownState==2&quot;&gt;
            &lt;img v-if=&quot;dropDownStateText.upImg&quot; class=&quot;up-tip-img&quot; :src=&quot;require(&apos;../../assets/images/refreshAndReload/&apos;+dropDownStateText.upImg)&quot;&gt;
            &lt;span class=&quot;up-tip-text&quot;&gt;{{dropDownStateText.upTxt}}&lt;/span&gt;
          &lt;/div&gt;
          &lt;div class=&quot;refresh-tip&quot; v-if=&quot;dropDownState==3&quot;&gt;
            &lt;img v-if=&quot;dropDownStateText.refreshImg&quot; class=&quot;refresh-tip-img&quot; :src=&quot;require(&apos;../../assets/images/refreshAndReload/&apos;+dropDownStateText.refreshImg)&quot;&gt;
            &lt;span class=&quot;refresh-tip-text&quot;&gt;{{dropDownStateText.refreshTxt}}&lt;/span&gt;
          &lt;/div&gt;
        &lt;/slot&gt;
      &lt;/header&gt;
      &lt;slot&gt;&lt;/slot&gt;
    &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  props: {
    onRefresh: {
      type: Function,
      required: false
    }
  },
  data () {
    return {
      defaultOffset: 100, // &#x9ED8;&#x8BA4;&#x9AD8;&#x5EA6;, &#x76F8;&#x5E94;&#x7684;&#x4FEE;&#x6539;.releshMoudle&#x7684;margin-top&#x548C;.down-tip, .up-tip, .refresh-tip&#x7684;height
      top: 0,
      scrollIsToTop: 0,
      startY: 0,
      isDropDown: false, // &#x662F;&#x5426;&#x4E0B;&#x62C9;
      isRefreshing: false, // &#x662F;&#x5426;&#x6B63;&#x5728;&#x5237;&#x65B0;
      dropDownState: 1, // &#x663E;&#x793A;1:&#x4E0B;&#x62C9;&#x5237;&#x65B0;, 2:&#x677E;&#x5F00;&#x5237;&#x65B0;, 3:&#x5237;&#x65B0;&#x4E2D;&#x2026;&#x2026;
      dropDownStateText: {
        downTxt: &apos;&#x4E0B;&#x62C9;&#x5237;&#x65B0;&apos;,
        downImg: &apos;&apos;,
        upTxt: &apos;&#x677E;&#x5F00;&#x5237;&#x65B0;&apos;,
        upImg: &apos;release.png&apos;,
        refreshTxt: &apos;&#x5237;&#x65B0;&#x4E2D;...&apos;,
        refreshImg: &apos;refresh.gif&apos;
      }
    }
  },
  created () {
    if (document.querySelector(&apos;.down-tip&apos;)) {
      // &#x83B7;&#x53D6;&#x4E0D;&#x540C;&#x624B;&#x673A;&#x7684;&#x7269;&#x7406;&#x50CF;&#x7D20;&#xFF08;dpr&#xFF09;,&#x4EE5;&#x4FBF;&#x9002;&#x914D;rem
      this.defaultOffset = document.querySelector(&apos;.down-tip&apos;).clientHeight || this.defaultOffset
    }
  },
  methods: {
    touchStart (e) {
      this.startY = e.targetTouches[0].pageY
    },
    touchMove (e) {
      this.scrollIsToTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop // safari &#x83B7;&#x53D6;scrollTop&#x7528;window.pageYOffset
      if (e.targetTouches[0].pageY &gt; this.startY) { // &#x4E0B;&#x62C9;
        this.isDropDown = true
        if (this.scrollIsToTop === 0 &amp;&amp; !this.isRefreshing) {
          // &#x62C9;&#x52A8;&#x7684;&#x8DDD;&#x79BB;
          let diff = e.targetTouches[0].pageY - this.startY - this.scrollIsToTop
          this.top = Math.pow(diff, 0.8) + (this.dropDownState === 3 ? this.defaultOffset : 0)
          if (this.top &gt;= this.defaultOffset) {
            this.dropDownState = 2
            e.preventDefault()
          } else {
            this.dropDownState = 1
            e.preventDefault()
          }
        }
      } else {
        this.isDropDown = false
        this.dropDownState = 1
      }
    },
    touchEnd (e) {
      if (this.isDropDown &amp;&amp; !this.isRefreshing) {
        if (this.top &gt;= this.defaultOffset) { // do refresh
          this.refresh()
          this.isRefreshing = true
          console.log(`do refresh`)
        } else { // cancel refresh
          this.isRefreshing = false
          this.isDropDown = false
          this.dropDownState = 1
          this.top = 0
        }
      }
    },
    refresh () {
      this.dropDownState = 3
      this.top = this.defaultOffset
      setTimeout(() =&gt; {
        this.onRefresh(this.refreshDone)
      }, 1200)
    },
    refreshDone () {
      this.isRefreshing = false
      this.isDropDown = false
      this.dropDownState = 1
      this.top = 0
    }
  }
}
&lt;/script&gt;

&lt;!-- Add &quot;scoped&quot; attribute to limit CSS to this component only --&gt;
&lt;style scoped&gt;
.refreshMoudle {
  width: 100%;
  margin-top: -100px;
  -webkit-overflow-scrolling: touch; /* ios5+ */
}
.pull-refresh {
  width: 100%;
  color: #999;
  transition-duration: 200ms;
}
.refreshMoudle .down-tip,
.up-tip,
.refresh-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}
.refreshMoudle .down-tip-img,
.up-tip-img,
.refresh-tip-img {
  width: 35px;
  height: 35px;
  margin-right: 5px;
}
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;html&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;refreshMoudle&quot;</span> @<span class="hljs-attr">touchstart</span>=<span class="hljs-string">&quot;touchStart($event)&quot;</span> @<span class="hljs-attr">touchmove</span>=<span class="hljs-string">&quot;touchMove($event)&quot;</span> @<span class="hljs-attr">touchend</span>=<span class="hljs-string">&quot;touchEnd($event)&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;{transform: &apos;translate3d(0,&apos; + top + &apos;px, 0)&apos;}&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pull-refresh&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;pull-refresh&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;down-tip&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;dropDownState==1&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;dropDownStateText.downImg&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;down-tip-img&quot;</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;require(&apos;../../assets/images/refreshAndReload/&apos;+dropDownStateText.downImg)&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;down-tip-text&quot;</span>&gt;</span>"{{"dropDownStateText.downTxt"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;up-tip&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;dropDownState==2&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;dropDownStateText.upImg&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;up-tip-img&quot;</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;require(&apos;../../assets/images/refreshAndReload/&apos;+dropDownStateText.upImg)&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;up-tip-text&quot;</span>&gt;</span>"{{"dropDownStateText.upTxt"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;refresh-tip&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;dropDownState==3&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;dropDownStateText.refreshImg&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;refresh-tip-img&quot;</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;require(&apos;../../assets/images/refreshAndReload/&apos;+dropDownStateText.refreshImg)&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;refresh-tip-text&quot;</span>&gt;</span>"{{"dropDownStateText.refreshTxt"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">onRefresh</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Function</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">false</span>
    }
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">defaultOffset</span>: <span class="hljs-number">100</span>, <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x9AD8;&#x5EA6;, &#x76F8;&#x5E94;&#x7684;&#x4FEE;&#x6539;.releshMoudle&#x7684;margin-top&#x548C;.down-tip, .up-tip, .refresh-tip&#x7684;height</span>
      top: <span class="hljs-number">0</span>,
      <span class="hljs-attr">scrollIsToTop</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">startY</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">isDropDown</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// &#x662F;&#x5426;&#x4E0B;&#x62C9;</span>
      isRefreshing: <span class="hljs-literal">false</span>, <span class="hljs-comment">// &#x662F;&#x5426;&#x6B63;&#x5728;&#x5237;&#x65B0;</span>
      dropDownState: <span class="hljs-number">1</span>, <span class="hljs-comment">// &#x663E;&#x793A;1:&#x4E0B;&#x62C9;&#x5237;&#x65B0;, 2:&#x677E;&#x5F00;&#x5237;&#x65B0;, 3:&#x5237;&#x65B0;&#x4E2D;&#x2026;&#x2026;</span>
      dropDownStateText: {
        <span class="hljs-attr">downTxt</span>: <span class="hljs-string">&apos;&#x4E0B;&#x62C9;&#x5237;&#x65B0;&apos;</span>,
        <span class="hljs-attr">downImg</span>: <span class="hljs-string">&apos;&apos;</span>,
        <span class="hljs-attr">upTxt</span>: <span class="hljs-string">&apos;&#x677E;&#x5F00;&#x5237;&#x65B0;&apos;</span>,
        <span class="hljs-attr">upImg</span>: <span class="hljs-string">&apos;release.png&apos;</span>,
        <span class="hljs-attr">refreshTxt</span>: <span class="hljs-string">&apos;&#x5237;&#x65B0;&#x4E2D;...&apos;</span>,
        <span class="hljs-attr">refreshImg</span>: <span class="hljs-string">&apos;refresh.gif&apos;</span>
      }
    }
  },
  created () {
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.down-tip&apos;</span>)) {
      <span class="hljs-comment">// &#x83B7;&#x53D6;&#x4E0D;&#x540C;&#x624B;&#x673A;&#x7684;&#x7269;&#x7406;&#x50CF;&#x7D20;&#xFF08;dpr&#xFF09;,&#x4EE5;&#x4FBF;&#x9002;&#x914D;rem</span>
      <span class="hljs-keyword">this</span>.defaultOffset = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.down-tip&apos;</span>).clientHeight || <span class="hljs-keyword">this</span>.defaultOffset
    }
  },
  <span class="hljs-attr">methods</span>: {
    touchStart (e) {
      <span class="hljs-keyword">this</span>.startY = e.targetTouches[<span class="hljs-number">0</span>].pageY
    },
    touchMove (e) {
      <span class="hljs-keyword">this</span>.scrollIsToTop = <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">window</span>.pageYOffset || <span class="hljs-built_in">document</span>.body.scrollTop <span class="hljs-comment">// safari &#x83B7;&#x53D6;scrollTop&#x7528;window.pageYOffset</span>
      <span class="hljs-keyword">if</span> (e.targetTouches[<span class="hljs-number">0</span>].pageY &gt; <span class="hljs-keyword">this</span>.startY) { <span class="hljs-comment">// &#x4E0B;&#x62C9;</span>
        <span class="hljs-keyword">this</span>.isDropDown = <span class="hljs-literal">true</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.scrollIsToTop === <span class="hljs-number">0</span> &amp;&amp; !<span class="hljs-keyword">this</span>.isRefreshing) {
          <span class="hljs-comment">// &#x62C9;&#x52A8;&#x7684;&#x8DDD;&#x79BB;</span>
          <span class="hljs-keyword">let</span> diff = e.targetTouches[<span class="hljs-number">0</span>].pageY - <span class="hljs-keyword">this</span>.startY - <span class="hljs-keyword">this</span>.scrollIsToTop
          <span class="hljs-keyword">this</span>.top = <span class="hljs-built_in">Math</span>.pow(diff, <span class="hljs-number">0.8</span>) + (<span class="hljs-keyword">this</span>.dropDownState === <span class="hljs-number">3</span> ? <span class="hljs-keyword">this</span>.defaultOffset : <span class="hljs-number">0</span>)
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.top &gt;= <span class="hljs-keyword">this</span>.defaultOffset) {
            <span class="hljs-keyword">this</span>.dropDownState = <span class="hljs-number">2</span>
            e.preventDefault()
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.dropDownState = <span class="hljs-number">1</span>
            e.preventDefault()
          }
        }
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.isDropDown = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.dropDownState = <span class="hljs-number">1</span>
      }
    },
    touchEnd (e) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isDropDown &amp;&amp; !<span class="hljs-keyword">this</span>.isRefreshing) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.top &gt;= <span class="hljs-keyword">this</span>.defaultOffset) { <span class="hljs-comment">// do refresh</span>
          <span class="hljs-keyword">this</span>.refresh()
          <span class="hljs-keyword">this</span>.isRefreshing = <span class="hljs-literal">true</span>
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`do refresh`</span>)
        } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// cancel refresh</span>
          <span class="hljs-keyword">this</span>.isRefreshing = <span class="hljs-literal">false</span>
          <span class="hljs-keyword">this</span>.isDropDown = <span class="hljs-literal">false</span>
          <span class="hljs-keyword">this</span>.dropDownState = <span class="hljs-number">1</span>
          <span class="hljs-keyword">this</span>.top = <span class="hljs-number">0</span>
        }
      }
    },
    refresh () {
      <span class="hljs-keyword">this</span>.dropDownState = <span class="hljs-number">3</span>
      <span class="hljs-keyword">this</span>.top = <span class="hljs-keyword">this</span>.defaultOffset
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.onRefresh(<span class="hljs-keyword">this</span>.refreshDone)
      }, <span class="hljs-number">1200</span>)
    },
    refreshDone () {
      <span class="hljs-keyword">this</span>.isRefreshing = <span class="hljs-literal">false</span>
      <span class="hljs-keyword">this</span>.isDropDown = <span class="hljs-literal">false</span>
      <span class="hljs-keyword">this</span>.dropDownState = <span class="hljs-number">1</span>
      <span class="hljs-keyword">this</span>.top = <span class="hljs-number">0</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add &quot;scoped&quot; attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.refreshMoudle</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">-webkit-overflow-scrolling</span>: touch; <span class="hljs-comment">/* ios5+ */</span>
}
<span class="hljs-selector-class">.pull-refresh</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#999</span>;
  <span class="hljs-attribute">transition-duration</span>: <span class="hljs-number">200ms</span>;
}
<span class="hljs-selector-class">.refreshMoudle</span> <span class="hljs-selector-class">.down-tip</span>,
<span class="hljs-selector-class">.up-tip</span>,
<span class="hljs-selector-class">.refresh-tip</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.refreshMoudle</span> <span class="hljs-selector-class">.down-tip-img</span>,
<span class="hljs-selector-class">.up-tip-img</span>,
<span class="hljs-selector-class">.refresh-tip-img</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">5px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><blockquote><strong>2</strong>&#x3001;&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;<code>PullUpReload.vue</code></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template lang=&quot;html&quot;&gt;
  &lt;div class=&quot;loadMoudle&quot; @touchstart=&quot;touchStart($event)&quot; @touchmove=&quot;touchMove($event)&quot; :style=&quot;{transform: &apos;translate3d(0,&apos; + top + &apos;px, 0)&apos;}&quot;&gt;
    &lt;slot&gt;&lt;/slot&gt;
    &lt;footer class=&quot;load-more&quot;&gt;
      &lt;slot name=&quot;load-more&quot;&gt;
        &lt;div class=&quot;moreData-tip&quot; v-if=&quot;pullUpState==1&quot;&gt;
          &lt;span class=&quot;moreData-tip-text&quot;&gt;{{pullUpStateText.moreDataTxt}}&lt;/span&gt;
        &lt;/div&gt;
        &lt;div class=&quot;loadingMoreData-tip&quot; v-if=&quot;pullUpState==2&quot;&gt;
          &lt;span class=&quot;icon-loading&quot;&gt;&lt;/span&gt;
          &lt;span class=&quot;loadingMoreData-tip-text&quot;&gt;{{pullUpStateText.loadingMoreDataTxt}}&lt;/span&gt;
        &lt;/div&gt;
        &lt;div class=&quot;noMoreData-tip&quot; v-if=&quot;pullUpState==3&quot;&gt;
          &lt;span class=&quot;connectingLine&quot;&gt;&lt;/span&gt;
          &lt;span class=&quot;noMoreData-tip-text&quot;&gt;{{pullUpStateText.noMoreDataTxt}}&lt;/span&gt;
          &lt;span class=&quot;connectingLine&quot;&gt;&lt;/span&gt;
        &lt;/div&gt;
      &lt;/slot&gt;
    &lt;/footer&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  props: {
    parentPullUpState: {
      default: 0
    },
    onInfiniteLoad: {
      type: Function,
      require: false
    }
  },
  data () {
    return {
      top: 0,
      startY: 0,
      pullUpState: 0, // 1:&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x66F4;&#x591A;, 2:&#x52A0;&#x8F7D;&#x4E2D;&#x2026;&#x2026;, 3:&#x6211;&#x662F;&#x6709;&#x5E95;&#x7EBF;&#x7684;
      isLoading: false, // &#x662F;&#x5426;&#x6B63;&#x5728;&#x52A0;&#x8F7D;
      pullUpStateText: {
        moreDataTxt: &apos;&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&apos;,
        loadingMoreDataTxt: &apos;&#x52A0;&#x8F7D;&#x4E2D;...&apos;,
        noMoreDataTxt: &apos;&#x6211;&#x662F;&#x6709;&#x5E95;&#x7EBF;&#x7684;&apos;
      }
    }
  },
  methods: {
    touchStart (e) {
      this.startY = e.targetTouches[0].pageY
    },
    touchMove (e) {
      if (e.targetTouches[0].pageY &lt; this.startY) { // &#x4E0A;&#x62C9;
        this.judgeScrollBarToTheEnd()
      }
    },

    // &#x5224;&#x65AD;&#x6EDA;&#x52A8;&#x6761;&#x662F;&#x5426;&#x5230;&#x5E95;
    judgeScrollBarToTheEnd () {
      let innerHeight = document.querySelector(&apos;.loadMoudle&apos;).clientHeight
      // &#x53D8;&#x91CF;scrollTop&#x662F;&#x6EDA;&#x52A8;&#x6761;&#x6EDA;&#x52A8;&#x65F6;&#xFF0C;&#x8DDD;&#x79BB;&#x9876;&#x90E8;&#x7684;&#x8DDD;&#x79BB;
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      // &#x53D8;&#x91CF;scrollHeight&#x662F;&#x6EDA;&#x52A8;&#x6761;&#x7684;&#x603B;&#x9AD8;&#x5EA6;
      let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight
      // &#x6EDA;&#x52A8;&#x6761;&#x5230;&#x5E95;&#x90E8;&#x7684;&#x6761;&#x4EF6;
      if (scrollTop + scrollHeight &gt;= innerHeight) {
        if (this.pullUpState !== 3 &amp;&amp; !this.isLoading) {
          this.pullUpState = 1
          this.infiniteLoad()
          // setTimeout(() =&gt; {
          //   this.infiniteLoad()
          // }, 200)
        }
      }
    },

    infiniteLoad () {
      this.pullUpState = 2
      this.isLoading = true
      setTimeout(() =&gt; {
        this.onInfiniteLoad(this.infiniteLoadDone)
      }, 800)
    },
    infiniteLoadDone () {
      this.pullUpState = 0
      this.isLoading = false
    }
  },
  watch: {
    parentPullUpState (curVal, oldVal) {
      this.pullUpState = curVal
    }
  }
}
&lt;/script&gt;

&lt;!-- Add &quot;scoped&quot; attribute to limit CSS to this component only --&gt;
&lt;style scoped&gt;
.load-more {
  width: 100%;
  color: #c0c0c0;
  background: #f7f7f7;
}
.moreData-tip,
.loadingMoreData-tip,
.noMoreData-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
}
.loadMoudle .icon-loading {
  display: inline-flex;
  width: 35px;
  height: 35px;
  background: url(../../assets/images/refreshAndReload/loading.png) no-repeat;
  background-size: cover;
  margin-right: 5px;
  animation: rotating 2s linear infinite;
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1turn);
  }
}
.connectingLine {
  display: inline-flex;
  width: 150px;
  height: 2px;
  background: #ddd;
  margin-left: 20px;
  margin-right: 20px;
}
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;html&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;loadMoudle&quot;</span> @<span class="hljs-attr">touchstart</span>=<span class="hljs-string">&quot;touchStart($event)&quot;</span> @<span class="hljs-attr">touchmove</span>=<span class="hljs-string">&quot;touchMove($event)&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;{transform: &apos;translate3d(0,&apos; + top + &apos;px, 0)&apos;}&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;load-more&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;load-more&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;moreData-tip&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pullUpState==1&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;moreData-tip-text&quot;</span>&gt;</span>"{{"pullUpStateText.moreDataTxt"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;loadingMoreData-tip&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pullUpState==2&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;icon-loading&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;loadingMoreData-tip-text&quot;</span>&gt;</span>"{{"pullUpStateText.loadingMoreDataTxt"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;noMoreData-tip&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pullUpState==3&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;connectingLine&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;noMoreData-tip-text&quot;</span>&gt;</span>"{{"pullUpStateText.noMoreDataTxt"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;connectingLine&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">parentPullUpState</span>: {
      <span class="hljs-attr">default</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">onInfiniteLoad</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Function</span>,
      <span class="hljs-attr">require</span>: <span class="hljs-literal">false</span>
    }
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">startY</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">pullUpState</span>: <span class="hljs-number">0</span>, <span class="hljs-comment">// 1:&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x66F4;&#x591A;, 2:&#x52A0;&#x8F7D;&#x4E2D;&#x2026;&#x2026;, 3:&#x6211;&#x662F;&#x6709;&#x5E95;&#x7EBF;&#x7684;</span>
      isLoading: <span class="hljs-literal">false</span>, <span class="hljs-comment">// &#x662F;&#x5426;&#x6B63;&#x5728;&#x52A0;&#x8F7D;</span>
      pullUpStateText: {
        <span class="hljs-attr">moreDataTxt</span>: <span class="hljs-string">&apos;&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&apos;</span>,
        <span class="hljs-attr">loadingMoreDataTxt</span>: <span class="hljs-string">&apos;&#x52A0;&#x8F7D;&#x4E2D;...&apos;</span>,
        <span class="hljs-attr">noMoreDataTxt</span>: <span class="hljs-string">&apos;&#x6211;&#x662F;&#x6709;&#x5E95;&#x7EBF;&#x7684;&apos;</span>
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    touchStart (e) {
      <span class="hljs-keyword">this</span>.startY = e.targetTouches[<span class="hljs-number">0</span>].pageY
    },
    touchMove (e) {
      <span class="hljs-keyword">if</span> (e.targetTouches[<span class="hljs-number">0</span>].pageY &lt; <span class="hljs-keyword">this</span>.startY) { <span class="hljs-comment">// &#x4E0A;&#x62C9;</span>
        <span class="hljs-keyword">this</span>.judgeScrollBarToTheEnd()
      }
    },

    <span class="hljs-comment">// &#x5224;&#x65AD;&#x6EDA;&#x52A8;&#x6761;&#x662F;&#x5426;&#x5230;&#x5E95;</span>
    judgeScrollBarToTheEnd () {
      <span class="hljs-keyword">let</span> innerHeight = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.loadMoudle&apos;</span>).clientHeight
      <span class="hljs-comment">// &#x53D8;&#x91CF;scrollTop&#x662F;&#x6EDA;&#x52A8;&#x6761;&#x6EDA;&#x52A8;&#x65F6;&#xFF0C;&#x8DDD;&#x79BB;&#x9876;&#x90E8;&#x7684;&#x8DDD;&#x79BB;</span>
      <span class="hljs-keyword">let</span> scrollTop = <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">window</span>.pageYOffset || <span class="hljs-built_in">document</span>.body.scrollTop
      <span class="hljs-comment">// &#x53D8;&#x91CF;scrollHeight&#x662F;&#x6EDA;&#x52A8;&#x6761;&#x7684;&#x603B;&#x9AD8;&#x5EA6;</span>
      <span class="hljs-keyword">let</span> scrollHeight = <span class="hljs-built_in">document</span>.documentElement.clientHeight || <span class="hljs-built_in">document</span>.body.scrollHeight
      <span class="hljs-comment">// &#x6EDA;&#x52A8;&#x6761;&#x5230;&#x5E95;&#x90E8;&#x7684;&#x6761;&#x4EF6;</span>
      <span class="hljs-keyword">if</span> (scrollTop + scrollHeight &gt;= innerHeight) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pullUpState !== <span class="hljs-number">3</span> &amp;&amp; !<span class="hljs-keyword">this</span>.isLoading) {
          <span class="hljs-keyword">this</span>.pullUpState = <span class="hljs-number">1</span>
          <span class="hljs-keyword">this</span>.infiniteLoad()
          <span class="hljs-comment">// setTimeout(() =&gt; {</span>
          <span class="hljs-comment">//   this.infiniteLoad()</span>
          <span class="hljs-comment">// }, 200)</span>
        }
      }
    },

    infiniteLoad () {
      <span class="hljs-keyword">this</span>.pullUpState = <span class="hljs-number">2</span>
      <span class="hljs-keyword">this</span>.isLoading = <span class="hljs-literal">true</span>
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.onInfiniteLoad(<span class="hljs-keyword">this</span>.infiniteLoadDone)
      }, <span class="hljs-number">800</span>)
    },
    infiniteLoadDone () {
      <span class="hljs-keyword">this</span>.pullUpState = <span class="hljs-number">0</span>
      <span class="hljs-keyword">this</span>.isLoading = <span class="hljs-literal">false</span>
    }
  },
  <span class="hljs-attr">watch</span>: {
    parentPullUpState (curVal, oldVal) {
      <span class="hljs-keyword">this</span>.pullUpState = curVal
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add &quot;scoped&quot; attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.load-more</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#c0c0c0</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#f7f7f7</span>;
}
<span class="hljs-selector-class">.moreData-tip</span>,
<span class="hljs-selector-class">.loadingMoreData-tip</span>,
<span class="hljs-selector-class">.noMoreData-tip</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
}
<span class="hljs-selector-class">.loadMoudle</span> <span class="hljs-selector-class">.icon-loading</span> {
  <span class="hljs-attribute">display</span>: inline-flex;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../../assets/images/refreshAndReload/loading.png) no-repeat;
  <span class="hljs-attribute">background-size</span>: cover;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">animation</span>: rotating <span class="hljs-number">2s</span> linear infinite;
}
@<span class="hljs-keyword">keyframes</span> rotating {
  0% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
  }
  100% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(1turn);
  }
}
<span class="hljs-selector-class">.connectingLine</span> {
  <span class="hljs-attribute">display</span>: inline-flex;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">2px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#ddd</span>;
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><blockquote><strong>3</strong>&#x3001;&#x5BF9;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x4F7F;&#x7528;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;section class=&quot;container&quot;&gt;
    &lt;v-refresh :on-refresh=&quot;onRefresh&quot;&gt;
    &lt;v-reload :on-infinite-load=&quot;onInfiniteLoad&quot; :parent-pull-up-state=&quot;infiniteLoadData.pullUpState&quot;&gt;
    &lt;div class=&quot;bank_lists&quot;&gt;
      &lt;div class=&quot;bank_box&quot;&gt;
        &lt;div class=&quot;bank_list&quot; v-for=&quot;item in bank_list&quot; :key=&quot;item.id&quot;&gt;
          &lt;div class=&quot;bank_icon&quot; :style=&quot;{ &apos;background&apos;: &apos;url(&apos; + require(&apos;../assets/images/56_56/&apos;+item.iconName) + &apos;) no-repeat&apos;, &apos;background-size&apos;: &apos;100%&apos; }&quot; &gt;&lt;/div&gt;
          &lt;span class=&quot;bank_name&quot;&gt;{{item.bankName}}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;hot_box&quot;&gt;
      &lt;div class=&quot;hot_header&quot;&gt;
        &lt;span class=&quot;hot_name&quot;&gt;&#x70ED;&#x95E8;&#x63A8;&#x8350;&lt;/span&gt;
        &lt;div class=&quot;more_box&quot;&gt;
          &lt;span class=&quot;more_text&quot;&gt;&#x67E5;&#x770B;&#x66F4;&#x591A;&lt;/span&gt;
          &lt;span class=&quot;more_icon&quot;&gt;&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class=&quot;hot_centenrt&quot;&gt;
        &lt;div class=&quot;hot_centent_left&quot;&gt;
          &lt;span class=&quot;hot_left_name&quot;&gt;{{hot_centent_left.name}}&lt;/span&gt;
          &lt;span class=&quot;hot_left_desc&quot;&gt;{{hot_centent_left.desc}}&lt;/span&gt;
          &lt;div class=&quot;hot_left_img&quot; :style=&quot;{ &apos;background&apos;: &apos;url(&apos; + require(&apos;../assets/images/bank/&apos;+hot_centent_left.imgName) + &apos;) no-repeat&apos;, &apos;background-size&apos;: &apos;100%&apos; }&quot; &gt;&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;hot_centent_right&quot;&gt;
          &lt;div class=&quot;hot_right_top&quot;&gt;
            &lt;div class=&quot;hot_right_text_box&quot;&gt;
              &lt;span class=&quot;hot_right_name&quot;&gt;{{hot_c_r_one.name}}&lt;/span&gt;
              &lt;span class=&quot;hot_right_desc&quot;&gt;{{hot_c_r_one.desc}}&lt;/span&gt;
            &lt;/div&gt;
            &lt;div class=&quot;hot_right_img&quot; :style=&quot;{ &apos;background&apos;: &apos;url(&apos; + require(&apos;../assets/images/bank/&apos;+hot_c_r_one.imgName) + &apos;) no-repeat&apos;, &apos;background-size&apos;: &apos;100%&apos; }&quot; &gt;&lt;/div&gt;
          &lt;/div&gt;
          &lt;div class=&quot;hot_right_bottom&quot;&gt;
            &lt;div class=&quot;hot_right_text_box2&quot;&gt;
              &lt;span class=&quot;hot_right_name2&quot;&gt;{{hot_c_r_two.name}}&lt;/span&gt;
              &lt;span class=&quot;hot_right_desc2&quot;&gt;{{hot_c_r_two.desc}}&lt;/span&gt;
            &lt;/div&gt;
            &lt;div class=&quot;hot_right_img&quot; :style=&quot;{ &apos;background&apos;: &apos;url(&apos; + require(&apos;../assets/images/bank/&apos;+hot_c_r_two.imgName) + &apos;) no-repeat&apos;, &apos;background-size&apos;: &apos;100%&apos; }&quot; &gt;&lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card_state&quot;&gt;
      &lt;div class=&quot;card_progress border-right&quot;&gt;
        &lt;div class=&quot;progress_icon&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;card_text&quot;&gt;
          &lt;span class=&quot;card_state_name&quot;&gt;{{card_progress.name}}&lt;/span&gt;
          &lt;span class=&quot;card_desc&quot;&gt;{{card_progress.desc}}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class=&quot;card_activation&quot;&gt;
        &lt;div class=&quot;activation_icon&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;card_text&quot;&gt;
          &lt;span class=&quot;card_state_name&quot;&gt;{{card_activation.name}}&lt;/span&gt;
          &lt;span class=&quot;card_desc&quot;&gt;{{card_activation.desc}}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card_order&quot;&gt;
      &lt;div class=&quot;border_bottom card_content_bottom&quot;&gt;
        &lt;div class=&quot;hot_header&quot;&gt;
          &lt;span class=&quot;hot_name&quot;&gt;&#x70ED;&#x5361;&#x6392;&#x884C;&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div slot=&quot;load-more&quot;&gt;
      &lt;li class=&quot;card_list&quot; v-for=&quot;(item,index) in infiniteLoadData.pullUpList&quot; :key=&quot;item.id&quot;&gt;
        &lt;div class=&quot;card_content&quot; :class=&quot;infiniteLoadData.pullUpList.length - 1 != index? &apos;card_content_bottom&apos;:&apos;&apos;&quot;&gt;
          &lt;div class=&quot;card_img&quot; :style=&quot;{ &apos;background&apos;: &apos;url(&apos; + require(&apos;../assets/images/bank/&apos;+item.imgName) + &apos;) no-repeat&apos;, &apos;background-size&apos;: &apos;100%&apos; }&quot; &gt;&lt;/div&gt;
          &lt;div class=&quot;card_list_text&quot;&gt;
            &lt;p class=&quot;card_name&quot;&gt;{{item.cardName}}&lt;/p&gt;
            &lt;p class=&quot;card_title&quot;&gt;{{item.cardTitle}}&lt;/p&gt;
            &lt;div class=&quot;card_words_lists&quot;&gt;
              &lt;div class=&quot;card_words bor_rad_20&quot;&gt;
                &lt;p class=&quot;card_word&quot;&gt;{{item.cardWordOne}}&lt;/p&gt;
              &lt;/div&gt;
              &lt;div v-if=&quot;item.cardWordTwo&quot; class=&quot;card_words card_words_two bor_rad_20&quot;&gt;
                &lt;p class=&quot;card_word&quot;&gt;{{item.cardWordTwo}}&lt;/p&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/li&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;/v-reload&gt;
    &lt;/v-refresh&gt;
  &lt;/section&gt;
&lt;/template&gt;

&lt;script&gt;
import DropDownRefresh from &apos;./common/DropDownRefresh&apos;
import PullUpReload from &apos;./common/PullUpReload&apos;
export default {
  data () {
    return {
      bank_list: [
        {
          iconName: &apos;zhaoshang.png&apos;,
          bankName: &apos;&#x62DB;&#x5546;&#x94F6;&#x884C;&apos;
        },
        {
          iconName: &apos;minsheng.png&apos;,
          bankName: &apos;&#x6C11;&#x751F;&#x94F6;&#x884C;&apos;
        },
        {
          iconName: &apos;pingancar.png&apos;,
          bankName: &apos;&#x5E73;&#x5B89;&#x8054;&#x540D;&apos;
        },
        {
          iconName: &apos;xingye.png&apos;,
          bankName: &apos;&#x5174;&#x4E1A;&#x94F6;&#x884C;&apos;
        },
        {
          iconName: &apos;shanghai.png&apos;,
          bankName: &apos;&#x4E0A;&#x6D77;&#x94F6;&#x884C;&apos;
        },
        {
          iconName: &apos;jiaotong.png&apos;,
          bankName: &apos;&#x4EA4;&#x901A;&#x94F6;&#x884C;&apos;
        },
        {
          iconName: &apos;guangda.png&apos;,
          bankName: &apos;&#x5149;&#x5927;&#x94F6;&#x884C;&apos;
        },
        {
          iconName: &apos;more.png&apos;,
          bankName: &apos;&#x5168;&#x90E8;&#x94F6;&#x884C;&apos;
        }
      ],
      hot_centent_left: {
        bankName: &apos;&#x4EA4;&#x901A;&#x94F6;&#x884C;&apos;,
        name: &apos;&#x4EA4;&#x884C;Y-POWER&#x9ED1;&#x5361;&apos;,
        desc: &apos;&#x989D;&#x5EA6;100%&#x53D6;&#x73B0;&apos;,
        imgName: &apos;jiaohangY-POWER.png&apos;
      },
      hot_c_r_one: {
        bankName: &apos;&#x62DB;&#x5546;&#x94F6;&#x884C;&apos;,
        name: &apos;&#x62DB;&#x884C;YOUNG&#x5361;&apos;,
        desc: &apos;&#x751F;&#x65E5;&#x6708;&#x53CC;&#x500D;&#x79EF;&#x5206;&apos;,
        imgName: &apos;zhaohangYOUNG.png&apos;
      },
      hot_c_r_two: {
        bankName: &apos;&#x5149;&#x5927;&#x94F6;&#x884C;&apos;,
        name: &apos;&#x5149;&#x5927;&#x6DD8;&#x7968;&#x7968;&#x516C;&#x4ED4;&#x8054;&#x540D;&#x5361;&apos;,
        desc: &apos;&#x7535;&#x5F71;&#x8FBE;&#x4EBA;&#x5FC5;&#x5907;&apos;,
        imgName: &apos;guangdalianming.png&apos;
      },
      card_progress: {
        name: &apos;&#x529E;&#x5361;&#x8FDB;&#x5EA6;&apos;,
        desc: &apos;&#x8BA9;&#x7B49;&#x5F85;&#x968F;&#x5904;&#x53EF;&#x89C1;&apos;
      },
      card_activation: {
        name: &apos;&#x529E;&#x5361;&#x6FC0;&#x6D3B;&apos;,
        desc: &apos;&#x8BA9;&#x7B49;&#x5F85;&#x968F;&#x5904;&#x53EF;&#x89C1;&apos;
      },
      card_list: [
        {
          bankName: &apos;&#x5E73;&#x5B89;&#x8054;&#x540D;&apos;,
          imgName: &apos;pinganqiche.png&apos;,
          cardName: &apos;&#x5E73;&#x5B89;&#x94F6;&#x884C;&#x4FE1;&#x7528;&#x5361;&apos;,
          cardTitle: &apos;&#x5E73;&#x5B89;&#x94F6;&#x884C;&#x6C7D;&#x8F66;&#x4E4B;&#x5BB6;&#x8054;&#x540D;&#x5355;&#x5E01;&#x5361;&apos;,
          cardWordOne: &apos;&#x9996;&#x5E74;&#x514D;&#x5E74;&#x8D39;&apos;,
          cardWordTwo: &apos;&#x52A0;&#x6CB9;88&#x6298;&apos;
        },
        {
          bankName: &apos;&#x4E0A;&#x6D77;&#x94F6;&#x884C;&apos;,
          imgName: &apos;shanghaitaobao.png&apos;,
          cardName: &apos;&#x4E0A;&#x6D77;&#x94F6;&#x884C;&#x4FE1;&#x7528;&#x5361;&apos;,
          cardTitle: &apos;&#x6DD8;&#x5B9D;&#x91D1;&#x5361;&apos;,
          cardWordOne: &apos;&#x79EF;&#x5206;&#x62B5;&#x73B0;&apos;,
          cardWordTwo: &apos;&#x9996;&#x5237;&#x6709;&#x793C;&apos;
        },
        {
          bankName: &apos;&#x534E;&#x590F;&#x94F6;&#x884C;&apos;,
          imgName: &apos;huaxiaiqiyi.png&apos;,
          cardName: &apos;&#x534E;&#x590F;&#x94F6;&#x884C;&#x4FE1;&#x7528;&#x5361;&apos;,
          cardTitle: &apos;&#x534E;&#x590F;&#x7231;&#x5947;&#x827A;&#x60A6;&#x770B;&#x5361;&apos;,
          cardWordOne: &apos;&#x9001;&#x7231;&#x5947;&#x827A;&#x4F1A;&#x5458;&apos;,
          cardWordTwo: &apos;&#x5546;&#x57CE;8&#x6298;&apos;
        },
        {
          bankName: &apos;&#x6D66;&#x53D1;&#x94F6;&#x884C;&apos;,
          imgName: &apos;pufajianyue.png&apos;,
          cardName: &apos;&#x6D66;&#x53D1;&#x94F6;&#x884C;&#x4FE1;&#x7528;&#x5361;&apos;,
          cardTitle: &apos;&#x6D66;&#x53D1;&#x94F6;&#x884C;&#x7B80;&#x7EA6;&#x767D;&#x91D1;&#x5361;&apos;,
          cardWordOne: &apos;&#x56E2;&#x8D2D;&#x7ACB;&#x51CF;&apos;,
          cardWordTwo: &apos;&#x9152;&#x5E97;&#x4F18;&#x60E0; &#x514D;&#x5E74;&#x8D39;&apos;
        },
        {
          bankName: &apos;&#x4E2D;&#x4FE1;&#x94F6;&#x884C;&apos;,
          imgName: &apos;zhongxinbaijin.png&apos;,
          cardName: &apos;&#x4E2D;&#x4FE1;&#x94F6;&#x884C;&#x4FE1;&#x7528;&#x5361;&apos;,
          cardTitle: &apos;&#x4E2D;&#x4FE1;&#x94F6;&#x884C;i&#x767D;&#x91D1;&#x4FE1;&#x7528;&#x5361;&apos;,
          cardWordOne: &apos;&#x9996;&#x5237;&#x6709;&#x793C;&apos;,
          cardWordTwo: &apos;&#x53CC;&#x500D;&#x79EF;&#x5206;&apos;
        }
      ],

      // &#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x7684;&#x8BBE;&#x7F6E;
      infiniteLoadData: {
        initialShowNum: 3, // &#x521D;&#x59CB;&#x663E;&#x793A;&#x591A;&#x5C11;&#x6761;
        everyLoadingNum: 3, // &#x6BCF;&#x6B21;&#x52A0;&#x8F7D;&#x7684;&#x4E2A;&#x6570;
        pullUpState: 0, // &#x5B50;&#x7EC4;&#x4EF6;&#x7684;pullUpState&#x72B6;&#x6001;
        pullUpList: [], // &#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#x6570;&#x636E;&#x7684;&#x6570;&#x7EC4;
        showPullUpListLength: this.initialShowNum // &#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x540E;&#x6240;&#x5C55;&#x793A;&#x7684;&#x4E2A;&#x6570;
      }
    }
  },
  mounted () {
    this.getStartPullUpState()
    this.getPullUpDefData()
  },
  methods: {
    // &#x83B7;&#x53D6;&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x7684;&#x521D;&#x59CB;&#x6570;&#x636E;
    getPullUpDefData () {
      this.infiniteLoadData.pullUpList = []
      for (let i = 0; i &lt; this.infiniteLoadData.initialShowNum; i++) {
        this.infiniteLoadData.pullUpList.push(this.card_list[i])
      }
    },

    getStartPullUpState () {
      if (this.card_list.length === this.infiniteLoadData.initialShowNum) {
        // &#x4FEE;&#x6539;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;pullUpState&#x72B6;&#x6001;
        this.infiniteLoadData.pullUpState = 3
      } else {
        this.infiniteLoadData.pullUpState = 0
      }
    },

    // &#x4E0A;&#x62C9;&#x4E00;&#x6B21;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#x7684;&#x6570;&#x636E;
    getPullUpMoreData () {
      this.showPullUpListLength = this.infiniteLoadData.pullUpList.length
      if (this.infiniteLoadData.pullUpList.length + this.infiniteLoadData.everyLoadingNum &gt; this.card_list.length) {
        for (let i = 0; i &lt; this.card_list.length - this.showPullUpListLength; i++) {
          this.infiniteLoadData.pullUpList.push(this.card_list[i + this.showPullUpListLength])
        }
      } else {
        for (let i = 0; i &lt; this.infiniteLoadData.everyLoadingNum; i++) {
          this.infiniteLoadData.pullUpList.push(this.card_list[i + this.showPullUpListLength])
        }
      }
      if (this.card_list.length === this.infiniteLoadData.pullUpList.length) {
        this.infiniteLoadData.pullUpState = 3
      } else {
        this.infiniteLoadData.pullUpState = 0
      }
    },

    // &#x4E0B;&#x62C9;&#x5237;&#x65B0;
    onRefresh (done) {
      // &#x5982;&#x679C;&#x4E0B;&#x62C9;&#x5237;&#x65B0;&#x548C;&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x540C;&#x65F6;&#x4F7F;&#x7528;&#xFF0C;&#x4E0B;&#x62C9;&#x65F6;&#x521D;&#x59CB;&#x5316;&#x4E0A;&#x62C9;&#x7684;&#x6570;&#x636E;
      this.getStartPullUpState()
      this.getPullUpDefData()
      done() // call done
    },

    // &#x4E0A;&#x62C9;&#x52A0;&#x8F7D;
    onInfiniteLoad (done) {
      if (this.infiniteLoadData.pullUpState === 0) {
        this.getPullUpMoreData()
      }
      done()
    }
  },
  components: {
    &apos;v-refresh&apos;: DropDownRefresh,
    &apos;v-reload&apos;: PullUpReload
  }
}
&lt;/script&gt;

&lt;!-- Add &quot;scoped&quot; attribute to limit CSS to this component only --&gt;
&lt;style scoped&gt;
@import &quot;../assets/css/not2rem.css&quot;;
.container {
  display: flex;
  flex-direction: column;
  width: 750px;
  height: 1334px;
  background-color: #f7f7f7;
}

.bank_lists {
  width: 100%;
  height: 320px;
  margin-top: 0px;
  background-color: #fff;
}

.bank_box {
  display: flex;
  flex-wrap: wrap;
  padding: 2px 7px 42px 7px;
}

.bank_list {
  width: 100px;
  height: 98px;
  margin: 40px 42px 0 42px;
}

.bank_icon {
  width: 56px;
  height: 56px;
  margin: 0 22px 18px;
}

.bank_name {
  display: inline-flex;
  width: 110px;
  height: 24px;
  line-height: 24px;
  font-size: 24px;
  color: #333;
}

.hot_box {
  width: 100%;
  height: 420px;
  margin-top: 10px;
  background: #fff;
}

.hot_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 674px;
  height: 80px;
  margin: 0 30px 0 46px;
}

.hot_name {
  display: inline-flex;
  height: 28px;
  line-height: 28px;
  font-size: 28px;
  color: #333;
}

.more_text {
  display: inline-flex;
  height: 24px;
  line-height: 24px;
  font-size: 24px;
  color: #999;
}

.more_icon {
  display: inline-flex;
  margin-left: 20px;
  width: 11px;
  height: 20px;
  background: url(&quot;../assets/images/icon/more.png&quot;) no-repeat;
  background-size: 100%;
}

.hot_centenrt {
  display: flex;
  flex-direction: row;
  width: 710px;
  height: 320px;
  margin: 0 20px 20px 20px;
}

.hot_centent_left {
  flex-direction: column;
  width: 350px;
  height: 320px;
  background: #f7f7f7;
}

.hot_left_name {
  display: inline-flex;
  width: 282px;
  height: 24px;
  margin: 50px 34px 0 34px;
  font-size: 24px;
  line-height: 24px;
  color: #333;
}

.hot_left_desc {
  display: inline-flex;
  width: 282px;
  height: 20px;
  margin: 12px 34px 0 34px;
  font-size: 20px;
  line-height: 20px;
  color: #999;
}

.hot_left_img {
  width: 220px;
  height: 142px;
  margin-left: 34px;
  margin-top: 34px;
}

.hot_centent_right {
  flex-direction: column;
  width: 350px;
  height: 320px;
  margin-left: 10px;
}

.hot_right_top {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 156px;
  background: #f7f7f7;
}

.hot_right_text_box {
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 58px;
  margin: 49px 20px 0 20px;
}

.hot_right_name {
  display: inline-flex;
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 24px;
  color: #333;
}

.hot_right_desc {
  display: inline-flex;
  margin-top: 10px;
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 24px;
  color: #999;
}

.hot_right_img {
  width: 110px;
  height: 70px;
  margin-top: 43px;
}

.hot_right_bottom {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 156px;
  margin-top: 8px;
  background: #f7f7f7;
}

.hot_right_text_box2 {
  display: flex;
  flex-direction: column;
  width: 180px;
  margin: 31px 20px 0 20px;
}

.hot_right_name2 {
  display: inline-flex;
  width: 100%;
  height: 58px;
  line-height: 30px;
  font-size: 24px;
  color: #333;
}

.hot_right_desc2 {
  display: inline-flex;
  margin-top: 12px;
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 24px;
  color: #999;
}

.card_state {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 128px;
  margin-top: 10px;
  background-color: #fff;
}
.card_progress {
  display: inline-flex;
  width: 327px;
  height: 88px;
  margin: 20px 0 20px 48px;
}
.progress_icon {
  width: 48px;
  height: 48px;
  margin: 20px 0;
  background: url(&quot;../assets/images/icon/search.png&quot;) no-repeat;
  background-size: 100%;
}
.activation_icon {
  width: 48px;
  height: 48px;
  margin: 20px 0;
  background: url(&quot;../assets/images/icon/activation.png&quot;) no-repeat;
  background-size: 100%;
}
.card_text {
  width: 228px;
  height: 66px;
  margin: 11px 20px 11px 30px;
}
.card_state_name {
  display: inline-flex;
  width: 100%;
  height: 28px;
  line-height: 28px;
  font-size: 28px;
  color: #333;
}
.card_desc {
  display: inline-flex;
  width: 100%;
  height: 22px;
  line-height: 22px;
  font-size: 22px;
  margin-top: 16px;
  color: #999;
}
.card_activation {
  display: inline-flex;
  width: 326px;
  height: 88px;
  margin: 20px 0 20px 48px;
}

.card_order {
  width: 100%;
  height: auto;
  margin-top: 10px;
  background-color: #fff;
}
.border_bottom {
  width: 100%;
  height: 80px;
}
.card_list {
  width: 100%;
  height: 228px;
  list-style-type: none;
}
.card_content {
  display: flex;
  flex-direction: row;
  width: 700px;
  height: 228px;
  margin-left: 50px;
}
.card_img {
  width: 186px;
  height: 120px;
  margin: 54px 0 54px 20px;
}
.card_list_text {
  flex-direction: column;
  width: 386px;
  height: 124px;
  margin: 52px 34px 52px 74px;
}
.card_name {
  width: 100%;
  height: 28px;
  line-height: 28px;
  font-size: 28px;
  color: #333;
}
.card_title {
  width: 100%;
  height: 24px;
  margin-top: 20px;
  line-height: 24px;
  font-size: 24px;
  color: #666;
}
.card_words_lists {
  display: flex;
  flex-direction: row;
}
.card_words {
  height: 36px;
  margin-top: 16px;
  background-color: #e8ca88;
}
.card_word {
  height: 20px;
  padding: 8px 18px;
  line-height: 20px;
  font-size: 20px;
  color: #4b4b4b;
}
.card_words_two {
  margin-left: 20px;
}
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml"><code class="html">&lt;template&gt;
  &lt;section class=&quot;container&quot;&gt;
    &lt;v-refresh :on-refresh=&quot;onRefresh&quot;&gt;
    &lt;v-reload :on-infinite-load=&quot;onInfiniteLoad&quot; :parent-pull-up-state=&quot;infiniteLoadData.pullUpState&quot;&gt;
    &lt;div class=&quot;bank_lists&quot;&gt;
      &lt;div class=&quot;bank_box&quot;&gt;
        &lt;div class=&quot;bank_list&quot; v-for=&quot;item in bank_list&quot; :key=&quot;item.id&quot;&gt;
          &lt;div class=&quot;bank_icon&quot; :style=&quot;{ &apos;background&apos;: &apos;url(&apos; + require(&apos;../assets/images/56_56/&apos;+item.iconName) + &apos;) no-repeat&apos;, &apos;background-size&apos;: &apos;100%&apos; }&quot; &gt;&lt;/div&gt;
          &lt;span class=&quot;bank_name&quot;&gt;{{item.bankName}}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;hot_box&quot;&gt;
      &lt;div class=&quot;hot_header&quot;&gt;
        &lt;span class=&quot;hot_name&quot;&gt;&#x70ED;&#x95E8;&#x63A8;&#x8350;&lt;/span&gt;
        &lt;div class=&quot;more_box&quot;&gt;
          &lt;span class=&quot;more_text&quot;&gt;&#x67E5;&#x770B;&#x66F4;&#x591A;&lt;/span&gt;
          &lt;span class=&quot;more_icon&quot;&gt;&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class=&quot;hot_centenrt&quot;&gt;
        &lt;div class=&quot;hot_centent_left&quot;&gt;
          &lt;span class=&quot;hot_left_name&quot;&gt;{{hot_centent_left.name}}&lt;/span&gt;
          &lt;span class=&quot;hot_left_desc&quot;&gt;{{hot_centent_left.desc}}&lt;/span&gt;
          &lt;div class=&quot;hot_left_img&quot; :style=&quot;{ &apos;background&apos;: &apos;url(&apos; + require(&apos;../assets/images/bank/&apos;+hot_centent_left.imgName) + &apos;) no-repeat&apos;, &apos;background-size&apos;: &apos;100%&apos; }&quot; &gt;&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;hot_centent_right&quot;&gt;
          &lt;div class=&quot;hot_right_top&quot;&gt;
            &lt;div class=&quot;hot_right_text_box&quot;&gt;
              &lt;span class=&quot;hot_right_name&quot;&gt;{{hot_c_r_one.name}}&lt;/span&gt;
              &lt;span class=&quot;hot_right_desc&quot;&gt;{{hot_c_r_one.desc}}&lt;/span&gt;
            &lt;/div&gt;
            &lt;div class=&quot;hot_right_img&quot; :style=&quot;{ &apos;background&apos;: &apos;url(&apos; + require(&apos;../assets/images/bank/&apos;+hot_c_r_one.imgName) + &apos;) no-repeat&apos;, &apos;background-size&apos;: &apos;100%&apos; }&quot; &gt;&lt;/div&gt;
          &lt;/div&gt;
          &lt;div class=&quot;hot_right_bottom&quot;&gt;
            &lt;div class=&quot;hot_right_text_box2&quot;&gt;
              &lt;span class=&quot;hot_right_name2&quot;&gt;{{hot_c_r_two.name}}&lt;/span&gt;
              &lt;span class=&quot;hot_right_desc2&quot;&gt;{{hot_c_r_two.desc}}&lt;/span&gt;
            &lt;/div&gt;
            &lt;div class=&quot;hot_right_img&quot; :style=&quot;{ &apos;background&apos;: &apos;url(&apos; + require(&apos;../assets/images/bank/&apos;+hot_c_r_two.imgName) + &apos;) no-repeat&apos;, &apos;background-size&apos;: &apos;100%&apos; }&quot; &gt;&lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card_state&quot;&gt;
      &lt;div class=&quot;card_progress border-right&quot;&gt;
        &lt;div class=&quot;progress_icon&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;card_text&quot;&gt;
          &lt;span class=&quot;card_state_name&quot;&gt;{{card_progress.name}}&lt;/span&gt;
          &lt;span class=&quot;card_desc&quot;&gt;{{card_progress.desc}}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class=&quot;card_activation&quot;&gt;
        &lt;div class=&quot;activation_icon&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;card_text&quot;&gt;
          &lt;span class=&quot;card_state_name&quot;&gt;{{card_activation.name}}&lt;/span&gt;
          &lt;span class=&quot;card_desc&quot;&gt;{{card_activation.desc}}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card_order&quot;&gt;
      &lt;div class=&quot;border_bottom card_content_bottom&quot;&gt;
        &lt;div class=&quot;hot_header&quot;&gt;
          &lt;span class=&quot;hot_name&quot;&gt;&#x70ED;&#x5361;&#x6392;&#x884C;&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div slot=&quot;load-more&quot;&gt;
      &lt;li class=&quot;card_list&quot; v-for=&quot;(item,index) in infiniteLoadData.pullUpList&quot; :key=&quot;item.id&quot;&gt;
        &lt;div class=&quot;card_content&quot; :class=&quot;infiniteLoadData.pullUpList.length - 1 != index? &apos;card_content_bottom&apos;:&apos;&apos;&quot;&gt;
          &lt;div class=&quot;card_img&quot; :style=&quot;{ &apos;background&apos;: &apos;url(&apos; + require(&apos;../assets/images/bank/&apos;+item.imgName) + &apos;) no-repeat&apos;, &apos;background-size&apos;: &apos;100%&apos; }&quot; &gt;&lt;/div&gt;
          &lt;div class=&quot;card_list_text&quot;&gt;
            &lt;p class=&quot;card_name&quot;&gt;{{item.cardName}}&lt;/p&gt;
            &lt;p class=&quot;card_title&quot;&gt;{{item.cardTitle}}&lt;/p&gt;
            &lt;div class=&quot;card_words_lists&quot;&gt;
              &lt;div class=&quot;card_words bor_rad_20&quot;&gt;
                &lt;p class=&quot;card_word&quot;&gt;{{item.cardWordOne}}&lt;/p&gt;
              &lt;/div&gt;
              &lt;div v-if=&quot;item.cardWordTwo&quot; class=&quot;card_words card_words_two bor_rad_20&quot;&gt;
                &lt;p class=&quot;card_word&quot;&gt;{{item.cardWordTwo}}&lt;/p&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/li&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;/v-reload&gt;
    &lt;/v-refresh&gt;
  &lt;/section&gt;
&lt;/template&gt;

&lt;script&gt;
import DropDownRefresh from &apos;./common/DropDownRefresh&apos;
import PullUpReload from &apos;./common/PullUpReload&apos;
export default {
  data () {
    return {
      bank_list: [
        {
          iconName: &apos;zhaoshang.png&apos;,
          bankName: &apos;&#x62DB;&#x5546;&#x94F6;&#x884C;&apos;
        },
        {
          iconName: &apos;minsheng.png&apos;,
          bankName: &apos;&#x6C11;&#x751F;&#x94F6;&#x884C;&apos;
        },
        {
          iconName: &apos;pingancar.png&apos;,
          bankName: &apos;&#x5E73;&#x5B89;&#x8054;&#x540D;&apos;
        },
        {
          iconName: &apos;xingye.png&apos;,
          bankName: &apos;&#x5174;&#x4E1A;&#x94F6;&#x884C;&apos;
        },
        {
          iconName: &apos;shanghai.png&apos;,
          bankName: &apos;&#x4E0A;&#x6D77;&#x94F6;&#x884C;&apos;
        },
        {
          iconName: &apos;jiaotong.png&apos;,
          bankName: &apos;&#x4EA4;&#x901A;&#x94F6;&#x884C;&apos;
        },
        {
          iconName: &apos;guangda.png&apos;,
          bankName: &apos;&#x5149;&#x5927;&#x94F6;&#x884C;&apos;
        },
        {
          iconName: &apos;more.png&apos;,
          bankName: &apos;&#x5168;&#x90E8;&#x94F6;&#x884C;&apos;
        }
      ],
      hot_centent_left: {
        bankName: &apos;&#x4EA4;&#x901A;&#x94F6;&#x884C;&apos;,
        name: &apos;&#x4EA4;&#x884C;Y-POWER&#x9ED1;&#x5361;&apos;,
        desc: &apos;&#x989D;&#x5EA6;100%&#x53D6;&#x73B0;&apos;,
        imgName: &apos;jiaohangY-POWER.png&apos;
      },
      hot_c_r_one: {
        bankName: &apos;&#x62DB;&#x5546;&#x94F6;&#x884C;&apos;,
        name: &apos;&#x62DB;&#x884C;YOUNG&#x5361;&apos;,
        desc: &apos;&#x751F;&#x65E5;&#x6708;&#x53CC;&#x500D;&#x79EF;&#x5206;&apos;,
        imgName: &apos;zhaohangYOUNG.png&apos;
      },
      hot_c_r_two: {
        bankName: &apos;&#x5149;&#x5927;&#x94F6;&#x884C;&apos;,
        name: &apos;&#x5149;&#x5927;&#x6DD8;&#x7968;&#x7968;&#x516C;&#x4ED4;&#x8054;&#x540D;&#x5361;&apos;,
        desc: &apos;&#x7535;&#x5F71;&#x8FBE;&#x4EBA;&#x5FC5;&#x5907;&apos;,
        imgName: &apos;guangdalianming.png&apos;
      },
      card_progress: {
        name: &apos;&#x529E;&#x5361;&#x8FDB;&#x5EA6;&apos;,
        desc: &apos;&#x8BA9;&#x7B49;&#x5F85;&#x968F;&#x5904;&#x53EF;&#x89C1;&apos;
      },
      card_activation: {
        name: &apos;&#x529E;&#x5361;&#x6FC0;&#x6D3B;&apos;,
        desc: &apos;&#x8BA9;&#x7B49;&#x5F85;&#x968F;&#x5904;&#x53EF;&#x89C1;&apos;
      },
      card_list: [
        {
          bankName: &apos;&#x5E73;&#x5B89;&#x8054;&#x540D;&apos;,
          imgName: &apos;pinganqiche.png&apos;,
          cardName: &apos;&#x5E73;&#x5B89;&#x94F6;&#x884C;&#x4FE1;&#x7528;&#x5361;&apos;,
          cardTitle: &apos;&#x5E73;&#x5B89;&#x94F6;&#x884C;&#x6C7D;&#x8F66;&#x4E4B;&#x5BB6;&#x8054;&#x540D;&#x5355;&#x5E01;&#x5361;&apos;,
          cardWordOne: &apos;&#x9996;&#x5E74;&#x514D;&#x5E74;&#x8D39;&apos;,
          cardWordTwo: &apos;&#x52A0;&#x6CB9;88&#x6298;&apos;
        },
        {
          bankName: &apos;&#x4E0A;&#x6D77;&#x94F6;&#x884C;&apos;,
          imgName: &apos;shanghaitaobao.png&apos;,
          cardName: &apos;&#x4E0A;&#x6D77;&#x94F6;&#x884C;&#x4FE1;&#x7528;&#x5361;&apos;,
          cardTitle: &apos;&#x6DD8;&#x5B9D;&#x91D1;&#x5361;&apos;,
          cardWordOne: &apos;&#x79EF;&#x5206;&#x62B5;&#x73B0;&apos;,
          cardWordTwo: &apos;&#x9996;&#x5237;&#x6709;&#x793C;&apos;
        },
        {
          bankName: &apos;&#x534E;&#x590F;&#x94F6;&#x884C;&apos;,
          imgName: &apos;huaxiaiqiyi.png&apos;,
          cardName: &apos;&#x534E;&#x590F;&#x94F6;&#x884C;&#x4FE1;&#x7528;&#x5361;&apos;,
          cardTitle: &apos;&#x534E;&#x590F;&#x7231;&#x5947;&#x827A;&#x60A6;&#x770B;&#x5361;&apos;,
          cardWordOne: &apos;&#x9001;&#x7231;&#x5947;&#x827A;&#x4F1A;&#x5458;&apos;,
          cardWordTwo: &apos;&#x5546;&#x57CE;8&#x6298;&apos;
        },
        {
          bankName: &apos;&#x6D66;&#x53D1;&#x94F6;&#x884C;&apos;,
          imgName: &apos;pufajianyue.png&apos;,
          cardName: &apos;&#x6D66;&#x53D1;&#x94F6;&#x884C;&#x4FE1;&#x7528;&#x5361;&apos;,
          cardTitle: &apos;&#x6D66;&#x53D1;&#x94F6;&#x884C;&#x7B80;&#x7EA6;&#x767D;&#x91D1;&#x5361;&apos;,
          cardWordOne: &apos;&#x56E2;&#x8D2D;&#x7ACB;&#x51CF;&apos;,
          cardWordTwo: &apos;&#x9152;&#x5E97;&#x4F18;&#x60E0; &#x514D;&#x5E74;&#x8D39;&apos;
        },
        {
          bankName: &apos;&#x4E2D;&#x4FE1;&#x94F6;&#x884C;&apos;,
          imgName: &apos;zhongxinbaijin.png&apos;,
          cardName: &apos;&#x4E2D;&#x4FE1;&#x94F6;&#x884C;&#x4FE1;&#x7528;&#x5361;&apos;,
          cardTitle: &apos;&#x4E2D;&#x4FE1;&#x94F6;&#x884C;i&#x767D;&#x91D1;&#x4FE1;&#x7528;&#x5361;&apos;,
          cardWordOne: &apos;&#x9996;&#x5237;&#x6709;&#x793C;&apos;,
          cardWordTwo: &apos;&#x53CC;&#x500D;&#x79EF;&#x5206;&apos;
        }
      ],

      // &#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x7684;&#x8BBE;&#x7F6E;
      infiniteLoadData: {
        initialShowNum: 3, // &#x521D;&#x59CB;&#x663E;&#x793A;&#x591A;&#x5C11;&#x6761;
        everyLoadingNum: 3, // &#x6BCF;&#x6B21;&#x52A0;&#x8F7D;&#x7684;&#x4E2A;&#x6570;
        pullUpState: 0, // &#x5B50;&#x7EC4;&#x4EF6;&#x7684;pullUpState&#x72B6;&#x6001;
        pullUpList: [], // &#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#x6570;&#x636E;&#x7684;&#x6570;&#x7EC4;
        showPullUpListLength: this.initialShowNum // &#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x540E;&#x6240;&#x5C55;&#x793A;&#x7684;&#x4E2A;&#x6570;
      }
    }
  },
  mounted () {
    this.getStartPullUpState()
    this.getPullUpDefData()
  },
  methods: {
    // &#x83B7;&#x53D6;&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x7684;&#x521D;&#x59CB;&#x6570;&#x636E;
    getPullUpDefData () {
      this.infiniteLoadData.pullUpList = []
      for (let i = 0; i &lt; this.infiniteLoadData.initialShowNum; i++) {
        this.infiniteLoadData.pullUpList.push(this.card_list[i])
      }
    },

    getStartPullUpState () {
      if (this.card_list.length === this.infiniteLoadData.initialShowNum) {
        // &#x4FEE;&#x6539;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;pullUpState&#x72B6;&#x6001;
        this.infiniteLoadData.pullUpState = 3
      } else {
        this.infiniteLoadData.pullUpState = 0
      }
    },

    // &#x4E0A;&#x62C9;&#x4E00;&#x6B21;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#x7684;&#x6570;&#x636E;
    getPullUpMoreData () {
      this.showPullUpListLength = this.infiniteLoadData.pullUpList.length
      if (this.infiniteLoadData.pullUpList.length + this.infiniteLoadData.everyLoadingNum &gt; this.card_list.length) {
        for (let i = 0; i &lt; this.card_list.length - this.showPullUpListLength; i++) {
          this.infiniteLoadData.pullUpList.push(this.card_list[i + this.showPullUpListLength])
        }
      } else {
        for (let i = 0; i &lt; this.infiniteLoadData.everyLoadingNum; i++) {
          this.infiniteLoadData.pullUpList.push(this.card_list[i + this.showPullUpListLength])
        }
      }
      if (this.card_list.length === this.infiniteLoadData.pullUpList.length) {
        this.infiniteLoadData.pullUpState = 3
      } else {
        this.infiniteLoadData.pullUpState = 0
      }
    },

    // &#x4E0B;&#x62C9;&#x5237;&#x65B0;
    onRefresh (done) {
      // &#x5982;&#x679C;&#x4E0B;&#x62C9;&#x5237;&#x65B0;&#x548C;&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x540C;&#x65F6;&#x4F7F;&#x7528;&#xFF0C;&#x4E0B;&#x62C9;&#x65F6;&#x521D;&#x59CB;&#x5316;&#x4E0A;&#x62C9;&#x7684;&#x6570;&#x636E;
      this.getStartPullUpState()
      this.getPullUpDefData()
      done() // call done
    },

    // &#x4E0A;&#x62C9;&#x52A0;&#x8F7D;
    onInfiniteLoad (done) {
      if (this.infiniteLoadData.pullUpState === 0) {
        this.getPullUpMoreData()
      }
      done()
    }
  },
  components: {
    &apos;v-refresh&apos;: DropDownRefresh,
    &apos;v-reload&apos;: PullUpReload
  }
}
&lt;/script&gt;

&lt;!-- Add &quot;scoped&quot; attribute to limit CSS to this component only --&gt;
&lt;style scoped&gt;
@import &quot;../assets/css/not2rem.css&quot;;
.container {
  display: flex;
  flex-direction: column;
  width: 750px;
  height: 1334px;
  background-color: #f7f7f7;
}

.bank_lists {
  width: 100%;
  height: 320px;
  margin-top: 0px;
  background-color: #fff;
}

.bank_box {
  display: flex;
  flex-wrap: wrap;
  padding: 2px 7px 42px 7px;
}

.bank_list {
  width: 100px;
  height: 98px;
  margin: 40px 42px 0 42px;
}

.bank_icon {
  width: 56px;
  height: 56px;
  margin: 0 22px 18px;
}

.bank_name {
  display: inline-flex;
  width: 110px;
  height: 24px;
  line-height: 24px;
  font-size: 24px;
  color: #333;
}

.hot_box {
  width: 100%;
  height: 420px;
  margin-top: 10px;
  background: #fff;
}

.hot_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 674px;
  height: 80px;
  margin: 0 30px 0 46px;
}

.hot_name {
  display: inline-flex;
  height: 28px;
  line-height: 28px;
  font-size: 28px;
  color: #333;
}

.more_text {
  display: inline-flex;
  height: 24px;
  line-height: 24px;
  font-size: 24px;
  color: #999;
}

.more_icon {
  display: inline-flex;
  margin-left: 20px;
  width: 11px;
  height: 20px;
  background: url(&quot;../assets/images/icon/more.png&quot;) no-repeat;
  background-size: 100%;
}

.hot_centenrt {
  display: flex;
  flex-direction: row;
  width: 710px;
  height: 320px;
  margin: 0 20px 20px 20px;
}

.hot_centent_left {
  flex-direction: column;
  width: 350px;
  height: 320px;
  background: #f7f7f7;
}

.hot_left_name {
  display: inline-flex;
  width: 282px;
  height: 24px;
  margin: 50px 34px 0 34px;
  font-size: 24px;
  line-height: 24px;
  color: #333;
}

.hot_left_desc {
  display: inline-flex;
  width: 282px;
  height: 20px;
  margin: 12px 34px 0 34px;
  font-size: 20px;
  line-height: 20px;
  color: #999;
}

.hot_left_img {
  width: 220px;
  height: 142px;
  margin-left: 34px;
  margin-top: 34px;
}

.hot_centent_right {
  flex-direction: column;
  width: 350px;
  height: 320px;
  margin-left: 10px;
}

.hot_right_top {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 156px;
  background: #f7f7f7;
}

.hot_right_text_box {
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 58px;
  margin: 49px 20px 0 20px;
}

.hot_right_name {
  display: inline-flex;
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 24px;
  color: #333;
}

.hot_right_desc {
  display: inline-flex;
  margin-top: 10px;
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 24px;
  color: #999;
}

.hot_right_img {
  width: 110px;
  height: 70px;
  margin-top: 43px;
}

.hot_right_bottom {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 156px;
  margin-top: 8px;
  background: #f7f7f7;
}

.hot_right_text_box2 {
  display: flex;
  flex-direction: column;
  width: 180px;
  margin: 31px 20px 0 20px;
}

.hot_right_name2 {
  display: inline-flex;
  width: 100%;
  height: 58px;
  line-height: 30px;
  font-size: 24px;
  color: #333;
}

.hot_right_desc2 {
  display: inline-flex;
  margin-top: 12px;
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 24px;
  color: #999;
}

.card_state {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 128px;
  margin-top: 10px;
  background-color: #fff;
}
.card_progress {
  display: inline-flex;
  width: 327px;
  height: 88px;
  margin: 20px 0 20px 48px;
}
.progress_icon {
  width: 48px;
  height: 48px;
  margin: 20px 0;
  background: url(&quot;../assets/images/icon/search.png&quot;) no-repeat;
  background-size: 100%;
}
.activation_icon {
  width: 48px;
  height: 48px;
  margin: 20px 0;
  background: url(&quot;../assets/images/icon/activation.png&quot;) no-repeat;
  background-size: 100%;
}
.card_text {
  width: 228px;
  height: 66px;
  margin: 11px 20px 11px 30px;
}
.card_state_name {
  display: inline-flex;
  width: 100%;
  height: 28px;
  line-height: 28px;
  font-size: 28px;
  color: #333;
}
.card_desc {
  display: inline-flex;
  width: 100%;
  height: 22px;
  line-height: 22px;
  font-size: 22px;
  margin-top: 16px;
  color: #999;
}
.card_activation {
  display: inline-flex;
  width: 326px;
  height: 88px;
  margin: 20px 0 20px 48px;
}

.card_order {
  width: 100%;
  height: auto;
  margin-top: 10px;
  background-color: #fff;
}
.border_bottom {
  width: 100%;
  height: 80px;
}
.card_list {
  width: 100%;
  height: 228px;
  list-style-type: none;
}
.card_content {
  display: flex;
  flex-direction: row;
  width: 700px;
  height: 228px;
  margin-left: 50px;
}
.card_img {
  width: 186px;
  height: 120px;
  margin: 54px 0 54px 20px;
}
.card_list_text {
  flex-direction: column;
  width: 386px;
  height: 124px;
  margin: 52px 34px 52px 74px;
}
.card_name {
  width: 100%;
  height: 28px;
  line-height: 28px;
  font-size: 28px;
  color: #333;
}
.card_title {
  width: 100%;
  height: 24px;
  margin-top: 20px;
  line-height: 24px;
  font-size: 24px;
  color: #666;
}
.card_words_lists {
  display: flex;
  flex-direction: row;
}
.card_words {
  height: 36px;
  margin-top: 16px;
  background-color: #e8ca88;
}
.card_word {
  height: 20px;
  padding: 8px 18px;
  line-height: 20px;
  font-size: 20px;
  color: #4b4b4b;
}
.card_words_two {
  margin-left: 20px;
}
&lt;/style&gt;</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue移动端下拉刷新、上拉加载

## 原文链接
[https://segmentfault.com/a/1190000016309645](https://segmentfault.com/a/1190000016309645)

