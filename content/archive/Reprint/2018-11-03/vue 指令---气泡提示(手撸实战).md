---
title: vue 指令---气泡提示(手撸实战)
reprint: true
categories: reprint
abbrlink: 82bb16b
date: 2018-11-03 10:03:44
---

{{% raw %}}
<hr><p><strong>&#x83DC;&#x9E1F;&#x5B66;&#x4E60;&#x4E4B;&#x8DEF;</strong><br>//L6zt github<br>&#x81EA;&#x5DF1; &#x5728;&#x9020;&#x7EC4;&#x4EF6;&#x8F6E;&#x5B50;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x778E;&#x641E;&#x3002;<br>&#x81EA;&#x5DF1;&#x5199;&#x4E86;&#x4E2A;slider&#x7EC4;&#x4EF6;&#xFF0C;&#x60F3;&#x52A0;&#x4E2A;&#x6C14;&#x6CE1;&#x63D0;&#x793A;&#x3002;&#x4E3A;&#x4E86;&#x590D;&#x7528;&#x548C;&#x7701;&#x4E8B;&#x7279;&#x6B64;&#x5199;&#x4E86;&#x4E2A;&#x6307;&#x4EE4;&#x6765;&#x89E3;&#x51B3;&#x3002;<br><a href="http://vuecompoents.jcmark.cn/slider" rel="nofollow noreferrer" target="_blank">&#x9884;&#x89C8;&#x5730;&#x5740;</a><br><a href="https://github.com/L6zt/components" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x5730;&#x5740;</a> github &#x6211;&#x53EB;&#x7ED9;&#x5B83;&#x80E1;&#x535A;<br><span class="img-wrap"><img data-src="/img/bVbijKd?w=774&amp;h=208" src="https://static.alili.tech/img/bVbijKd?w=774&amp;h=208" alt="&#x6548;&#x679C;&#x56FE;&#x7247;" title="&#x6548;&#x679C;&#x56FE;&#x7247;" style="cursor:pointer;display:inline"></span></p><hr><p><strong>&#x6211;&#x5BF9;&#x6307;&#x4EE4;&#x7684;&#x7406;&#x89E3;:</strong> &#x524D;&#x4E0D;&#x4E45;&#x770B;&#x8FC7; &#x4E00;&#x90E8;&#x5206;vnode&#x5B9E;&#x73B0;&#x6E90;&#x7801;&#xFF0C;&#x5948;&#x4F55;&#x8D44;&#x8D28;&#x6709;&#x9650;...&#x770B;&#x4E0D;&#x61C2;&#x3002;<br>vnode&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;-----&gt; &#x751F;&#x6210;&#x524D;&#x3001;&#x751F;&#x6210;&#x540E;&#x3001;&#x751F;&#x6210;&#x771F;&#x6B63;dom&#x3001;&#x66F4;&#x65B0; vnode&#x3001;&#x66F4;&#x65B0;dom &#x3001; &#x9500;&#x6BC1;&#x3002;<br>&#x800C;Vue&#x7684;&#x6307;&#x4EE4;&#x5219;&#x662F;&#x4F9D;&#x8D56;&#x4E8E;vnode &#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C; &#x65E0;&#x975E;&#x4E5F;&#x662F;&#x6709;&#x4EE5;&#x4E0A;&#x7C7B;&#x4F3C;&#x7684;&#x94A9;&#x5B50;&#x3002;<br><strong>&#x4EE3;&#x7801;&#x6548;&#x679C;</strong><br>&#x6307;&#x4EE4;&#x6302;A&#x5143;&#x7D20;&#x4E0A;&#xFF0C;&#x9ED8;&#x8BA4;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x6C14;&#x6CE1;&#x5BB9;&#x5668;B&#x63D2;&#x5165;&#x5230; body &#x91CC;&#x9762;&#xFF0C;B &#x4F1A;&#x83B7;&#x53D6; &#x5143;&#x7D20; A &#x7684;&#x4F4D;&#x7F6E;&#x4FE1;&#x606F; &#x548C; &#x81EA;&#x5DF1;&#x7684;<br>&#x5927;&#x5C0F;&#x4FE1;&#x606F;&#xFF0C;&#x7ECF;&#x8FC7; &#x4E00;&#x4E9B;&#x5217;&#x7684;&#x8FD0;&#x7B97;&#xFF0C;B &#x5143;&#x7D20;&#x4F1A;&#x5B9A;&#x4F4D;&#x5230; A &#x7684; &#x4E2D;&#x95F4; &#x4E0A; &#x4F4D;&#x7F6E;&#x3002; &#x5F53;&#x9F20;&#x6807;&#x653E;&#x5230; A &#x4E0A; B &#x5C31;&#x4F1A;&#x663E;&#x793A;&#x51FA;&#x6765;&#xFF0C;&#x79BB;&#x5F00;&#x5C31;&#x4F1A;&#x6D88;&#x5931;&#x3002;</p><h2 id="articleHeader0">&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;</h2><p><strong>&#x6C14;&#x6CE1;&#x6307;&#x4EE4;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { on , off , once, contains, elemOffset, position, addClass, removeClass } from &apos;../utils/dom&apos;;
import Vue from &apos;vue&apos;
const global = window;
const doc = global.document;
const top = 15;
export default {
  name : &apos;jc-tips&apos; ,
  bind (el , binding , vnode) {
    // &#x786E;&#x5B9A;el &#x5DF2;&#x7ECF;&#x5728;&#x9875;&#x9762;&#x91CC; &#x4E3A;&#x4E86;&#x83B7;&#x53D6;el &#x4F4D;&#x7F6E;&#x4FE1;&#x4FE1; 
    Vue.nextTick(() =&gt; {
      const { context } = vnode;
      const { expression } = binding;
      // &#x6C14;&#x6CE1;&#x5143;&#x7D20;&#x6839;&#x7ED3;&#x70B9;
      const fWarpElm = doc.createElement(&apos;div&apos;);
      // handleFn &#x6C14;&#x6CE1;&#x91CC;&#x7684;&#x5B50;&#x5143;&#x7D20;&#xFF08;&#x81EA;&#x5B9A;&#x4E49;&#xFF09;
      const handleFn = binding.expression &amp;&amp; context[expression] || (() =&gt; &apos;&apos;);
      const createElm = handleFn();
      fWarpElm.className = &apos;hide jc-tips-warp&apos;;
      fWarpElm.appendChild(createElm);
      doc.body.appendChild(fWarpElm);
      // &#x7ED9;el &#x7ED1;&#x5B9A;&#x5143;&#x7D20;&#x5F85;&#x5176;&#x4ED6;&#x64CD;&#x4F5C;&#x7528;
      el._tipElm = fWarpElm;
      el._createElm = createElm;
      // &#x9F20;&#x6807;&#x653E;&#x4E0A;&#x53BB;&#x7684; &#x56DE;&#x8C03;&#x51FD;&#x6570;
      el._tip_hover_fn = function(e) {
        // &#x5220;&#x9664;&#x8282;&#x70B9;&#x51FD;&#x6570;
          removeClass(fWarpElm, &apos;hide&apos;);
          fWarpElm.style.opacity = 0;
          // &#x4E0D;&#x52A0;&#x5EF6;&#x8FDF; fWarpElm&#x7684;&#x5927;&#x5C0F;&#x4FE1;&#x606F; &#xFF08;&#x5143;&#x7D20;&#x5927;&#x5C0F;&#x662F; 0 0&#xFF09;---&gt; &#x5220;&#x9664; class &#x4E0D;&#x662F;&#x7ACB;&#x5373;&#x6E32;&#x67D3;
          setTimeout(() =&gt; {
            const offset = elemOffset(fWarpElm);
            const location = position(el);
            fWarpElm.style.cssText =  `left: ${location.left  - offset.width / 2}px; top: ${location.top - top - offset.height}px;`;
            fWarpElm.style.opacity = 1;
          }, 16);
      };
      //&#x9F20;&#x6807;&#x79BB;&#x5F00; &#x5143;&#x7D20; &#x9690;&#x85CF; &#x6C14;&#x6CE1;
      const handleLeave = function (e) {
        fWarpElm.style.opacity = 0;
        // transitionEnd &#x4E0D;&#x592A;&#x597D;&#x5E94;&#x8BE5;&#x52A0;&#x5165;&#x517C;&#x5BB9;
        once({
          el,
          type: &apos;transitionEnd&apos;,
          fn: function() {
            console.log(&apos;hide&apos;);
            addClass(fWarpElm, &apos;hide&apos;);
          }
        })
      };
      el._tip_leave_fn =  handleLeave;
      // &#x89E3;&#x51B3; slider &#x79FB;&#x52A8;&#x7ED3;&#x675F; &#x63D0;&#x793A;&#x4E0D;&#x6D88;&#x5931;
      el._tip_mouse_up_fn = function (e) {
        const target = e.target;
        console.log(target);
        if (!contains(fWarpElm, target) &amp;&amp; el !== target) {
          handleLeave(e)
        }
      };
      on({
        el,
        type: &apos;mouseenter&apos;,
        fn: el._tip_hover_fn
      });
      on({
        el,
        type: &apos;mouseleave&apos;,
        fn: el._tip_leave_fn
      });
      on({
        el: doc.body,
        type: &apos;mouseup&apos;,
        fn: el._tip_mouse_up_fn
      })
    });
  } ,
  // &#x6C14;&#x6CE1;&#x7684;&#x6570;&#x636E;&#x53D8;&#x5316; &#x4F9D;&#x8D56;&#x4E8E; context[expression] &#x8FD4;&#x56DE;&#x7684;&#x503C;
  componentUpdated(el , binding , vnode) {
    const { context } = vnode;
    const { expression } = binding;
    const handleFn = expression &amp;&amp; context[expression] || (() =&gt; &apos;&apos;);
    Vue.nextTick( () =&gt; {
      const createNode = handleFn();
      const fWarpElm = el._tipElm;
      if (fWarpElm) {
        fWarpElm.replaceChild(createNode, el._createElm);
        el._createElm = createNode;
        const offset = elemOffset(fWarpElm);
        const location = position(el);
        fWarpElm.style.cssText =  `left: ${location.left  - offset.width / 2}px; top: ${location.top - top - offset.height}px;`;
      }
    })
  },
 // &#x5220;&#x9664; &#x4E8B;&#x4EF6;
  unbind (el , bind , vnode) {
    off({
      el: dov.body,
      type: &apos;mouseup&apos;,
      fn: el._tip_mouse_up_fn
    });
    el = null;
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { on , off , once, contains, elemOffset, position, addClass, removeClass } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../utils/dom&apos;</span>;
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">const</span> global = <span class="hljs-built_in">window</span>;
<span class="hljs-keyword">const</span> doc = global.document;
<span class="hljs-keyword">const</span> top = <span class="hljs-number">15</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  name : <span class="hljs-string">&apos;jc-tips&apos;</span> ,
  bind (el , binding , vnode) {
    <span class="hljs-comment">// &#x786E;&#x5B9A;el &#x5DF2;&#x7ECF;&#x5728;&#x9875;&#x9762;&#x91CC; &#x4E3A;&#x4E86;&#x83B7;&#x53D6;el &#x4F4D;&#x7F6E;&#x4FE1;&#x4FE1; </span>
    Vue.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> { context } = vnode;
      <span class="hljs-keyword">const</span> { expression } = binding;
      <span class="hljs-comment">// &#x6C14;&#x6CE1;&#x5143;&#x7D20;&#x6839;&#x7ED3;&#x70B9;</span>
      <span class="hljs-keyword">const</span> fWarpElm = doc.createElement(<span class="hljs-string">&apos;div&apos;</span>);
      <span class="hljs-comment">// handleFn &#x6C14;&#x6CE1;&#x91CC;&#x7684;&#x5B50;&#x5143;&#x7D20;&#xFF08;&#x81EA;&#x5B9A;&#x4E49;&#xFF09;</span>
      <span class="hljs-keyword">const</span> handleFn = binding.expression &amp;&amp; context[expression] || <span class="hljs-function">(<span class="hljs-params">(<span class="hljs-params"></span>) =&gt; &apos;&apos;</span>);
      <span class="hljs-params">const</span> <span class="hljs-params">createElm</span> = <span class="hljs-params">handleFn</span><span class="hljs-params">()</span>;
      <span class="hljs-params">fWarpElm</span>.<span class="hljs-params">className</span> = &apos;<span class="hljs-params">hide</span> <span class="hljs-params">jc</span>-<span class="hljs-params">tips</span>-<span class="hljs-params">warp</span>&apos;;
      <span class="hljs-params">fWarpElm</span>.<span class="hljs-params">appendChild</span>(<span class="hljs-params">createElm</span>);
      <span class="hljs-params">doc</span>.<span class="hljs-params">body</span>.<span class="hljs-params">appendChild</span>(<span class="hljs-params">fWarpElm</span>);
      // &#x7ED9;<span class="hljs-params">el</span> &#x7ED1;&#x5B9A;&#x5143;&#x7D20;&#x5F85;&#x5176;&#x4ED6;&#x64CD;&#x4F5C;&#x7528;
      <span class="hljs-params">el</span>._<span class="hljs-params">tipElm</span> = <span class="hljs-params">fWarpElm</span>;
      <span class="hljs-params">el</span>._<span class="hljs-params">createElm</span> = <span class="hljs-params">createElm</span>;
      // &#x9F20;&#x6807;&#x653E;&#x4E0A;&#x53BB;&#x7684; &#x56DE;&#x8C03;&#x51FD;&#x6570;
      <span class="hljs-params">el</span>._<span class="hljs-params">tip_hover_fn</span> = <span class="hljs-params">function</span>(<span class="hljs-params">e</span>) {
        // &#x5220;&#x9664;&#x8282;&#x70B9;&#x51FD;&#x6570;
          <span class="hljs-params">removeClass</span>(<span class="hljs-params">fWarpElm, &apos;hide&apos;</span>);
          <span class="hljs-params">fWarpElm</span>.<span class="hljs-params">style</span>.<span class="hljs-params">opacity</span> = 0;
          // &#x4E0D;&#x52A0;&#x5EF6;&#x8FDF; <span class="hljs-params">fWarpElm</span>&#x7684;&#x5927;&#x5C0F;&#x4FE1;&#x606F; &#xFF08;&#x5143;&#x7D20;&#x5927;&#x5C0F;&#x662F; 0 0&#xFF09;---&gt; &#x5220;&#x9664; <span class="hljs-params">class</span> &#x4E0D;&#x662F;&#x7ACB;&#x5373;&#x6E32;&#x67D3;
          <span class="hljs-params">setTimeout</span>(<span class="hljs-params">(<span class="hljs-params"></span>) =&gt; {
            <span class="hljs-keyword">const</span> offset = elemOffset(<span class="hljs-params">fWarpElm</span>);
            <span class="hljs-keyword">const</span> location = position(<span class="hljs-params">el</span>);
            fWarpElm.style.cssText =  `left: ${location.left  - offset.width / 2}px; top: ${location.top - top - offset.height}px;`;
            fWarpElm.style.opacity = 1;
          }, 16</span>);
      };
      //&#x9F20;&#x6807;&#x79BB;&#x5F00; &#x5143;&#x7D20; &#x9690;&#x85CF; &#x6C14;&#x6CE1;
      <span class="hljs-params">const</span> <span class="hljs-params">handleLeave</span> = <span class="hljs-params">function</span> (<span class="hljs-params">e</span>) {
        <span class="hljs-params">fWarpElm</span>.<span class="hljs-params">style</span>.<span class="hljs-params">opacity</span> = 0;
        // <span class="hljs-params">transitionEnd</span> &#x4E0D;&#x592A;&#x597D;&#x5E94;&#x8BE5;&#x52A0;&#x5165;&#x517C;&#x5BB9;
        <span class="hljs-params">once</span>(<span class="hljs-params">{
          el,
          <span class="hljs-keyword">type</span>: &apos;transitionEnd&apos;,
          fn: <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-params">&apos;hide&apos;</span>);
            addClass(<span class="hljs-params">fWarpElm, &apos;hide&apos;</span>);
          }
        }</span>)
      };
      <span class="hljs-params">el</span>._<span class="hljs-params">tip_leave_fn</span> =  <span class="hljs-params">handleLeave</span>;
      // &#x89E3;&#x51B3; <span class="hljs-params">slider</span> &#x79FB;&#x52A8;&#x7ED3;&#x675F; &#x63D0;&#x793A;&#x4E0D;&#x6D88;&#x5931;
      <span class="hljs-params">el</span>._<span class="hljs-params">tip_mouse_up_fn</span> = <span class="hljs-params">function</span> (<span class="hljs-params">e</span>) {
        <span class="hljs-params">const</span> <span class="hljs-params">target</span> = <span class="hljs-params">e</span>.<span class="hljs-params">target</span>;
        <span class="hljs-params">console</span>.<span class="hljs-params">log</span>(<span class="hljs-params">target</span>);
        <span class="hljs-params">if</span> (<span class="hljs-params">!contains(<span class="hljs-params">fWarpElm, target</span>) &amp;&amp; el !== target</span>) {
          <span class="hljs-params">handleLeave</span>(<span class="hljs-params">e</span>)
        }
      };
      <span class="hljs-params">on</span>(<span class="hljs-params">{
        el,
        <span class="hljs-keyword">type</span>: &apos;mouseenter&apos;,
        fn: el._tip_hover_fn
      }</span>);
      <span class="hljs-params">on</span>(<span class="hljs-params">{
        el,
        <span class="hljs-keyword">type</span>: &apos;mouseleave&apos;,
        fn: el._tip_leave_fn
      }</span>);
      <span class="hljs-params">on</span>(<span class="hljs-params">{
        el: doc.body,
        <span class="hljs-keyword">type</span>: &apos;mouseup&apos;,
        fn: el._tip_mouse_up_fn
      }</span>)
    });
  } ,
  // &#x6C14;&#x6CE1;&#x7684;&#x6570;&#x636E;&#x53D8;&#x5316; &#x4F9D;&#x8D56;&#x4E8E; <span class="hljs-params">context</span>[<span class="hljs-params">expression</span>] &#x8FD4;&#x56DE;&#x7684;&#x503C;
  <span class="hljs-params">componentUpdated</span>(<span class="hljs-params">el , binding , vnode</span>) {
    <span class="hljs-params">const</span> { <span class="hljs-params">context</span> } = <span class="hljs-params">vnode</span>;
    <span class="hljs-params">const</span> { <span class="hljs-params">expression</span> } = <span class="hljs-params">binding</span>;
    <span class="hljs-params">const</span> <span class="hljs-params">handleFn</span> = <span class="hljs-params">expression</span> &amp;&amp; <span class="hljs-params">context</span>[<span class="hljs-params">expression</span>] || (<span class="hljs-params">(<span class="hljs-params"></span>) =&gt; &apos;&apos;</span>);
    <span class="hljs-params">Vue</span>.<span class="hljs-params">nextTick</span>(<span class="hljs-params"> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">const</span> createNode = handleFn(<span class="hljs-params"></span>);
      <span class="hljs-keyword">const</span> fWarpElm = el._tipElm;
      <span class="hljs-keyword">if</span> (<span class="hljs-params">fWarpElm</span>) {
        fWarpElm.replaceChild(<span class="hljs-params">createNode, el._createElm</span>);
        el._createElm = createNode;
        <span class="hljs-keyword">const</span> offset = elemOffset(<span class="hljs-params">fWarpElm</span>);
        <span class="hljs-keyword">const</span> location = position(<span class="hljs-params">el</span>);
        fWarpElm.style.cssText =  `left: ${location.left  - offset.width / 2}px; top: ${location.top - top - offset.height}px;`;
      }
    }</span>)
  },
 // &#x5220;&#x9664; &#x4E8B;&#x4EF6;
  <span class="hljs-params">unbind</span> (<span class="hljs-params">el , bind , vnode</span>) {
    <span class="hljs-params">off</span>(<span class="hljs-params">{
      el: dov.body,
      <span class="hljs-keyword">type</span>: &apos;mouseup&apos;,
      fn: el._tip_mouse_up_fn
    }</span>);
    <span class="hljs-params">el</span> = <span class="hljs-params">null</span>;
  }
}
</span></code></pre><p><strong>slider &#x7EC4;&#x4EF6;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;div class=&quot;jc-slider-cmp&quot;&gt;
        &lt;section
                class=&quot;slider-active-bg&quot;
                :style=&quot;{width: `${left}px`}&quot;
            &gt;
        &lt;/section&gt;
            &lt;i
                    class=&quot;jc-slider-dot&quot;
                    :style=&quot;{left: `${left}px`}&quot;
                    ref=&quot;dot&quot;
                    @mousedown=&quot;moveStart&quot;
                    v-jc-tips=&quot;createNode&quot;
            &gt;
            &lt;/i&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import {elemOffset, on, off, once} from &quot;../../utils/dom&quot;;
  const global = window;
  const doc = global.document;
  export default {
    props: {
      step: {
        type: [Number],
        default: 0
      },
      rangeEnd: {
        type: [Number],
        required: true
      },
      value: {
        type: [Number],
        required: true
      },
      minValue: {
        type: [Number],
        required: true
      },
      maxValue: {
        type: [Number],
        required: true
      }
    },
    data () {
      return {
        startX: null,
        width: null,
        curValue: 0,
        curStep: 0,
        left: 0,
        tempLeft: 0
      }
    },
    computed: {
      wTov () {
        let step = this.step;
        let width = this.width;
        let rangeEnd = this.rangeEnd;
        if (width) {
          if (step) {
            return width / (rangeEnd / step)
          }
          return width / rangeEnd
        }
        return null
      },
      postValue () {
        let value = null;
        if (this.step) {
          value =  this.step * this.curStep;
        } else {
          value = this.left / this.wTov;
        }
        return value;
      }
    },
    watch: {
       value: {
         handler (value) {
           this.$nextTick(() =&gt; {
             let step = this.step;
             let wTov = this.wTov;
             if (step) {
               this.left = value / step * wTov;
             } else {
                this.left = value * wTov;
             }
           })
         },
         immediate: true
       }
    },
    methods: {
      moveStart (e) {
        e.preventDefault();
        const body = window.document.body;
        const _this = this;
        this.startX = e.pageX;
        this.tempLeft = this.left;
        on({
          el: body,
          type: &apos;mousemove&apos;,
          fn: this.moving
        });
        once({
          el: body,
          type: &apos;mouseup&apos;,
          fn: function() {
            console.log(&apos;end&apos;);
            _this.$emit(&apos;input&apos;, _this.postValue);
            off({
              el: body,
              type: &apos;mousemove&apos;,
              fn: _this.moving
            })
          }
        })
      },
      moving(e) {
        let curX = e.pageX;
        let step = this.step;
        let rangeEnd = this.rangeEnd;
        let width = this.width;
        let tempLeft = this.tempLeft;
        let startX = this.startX;
        let wTov = this.wTov;
        if (step !== 0) {
          let all = parseInt(rangeEnd / step);
          let curStep = (tempLeft + curX - startX) / wTov;
          curStep &gt; all &amp;&amp; (curStep = all);
          curStep &lt; 0 &amp;&amp; (curStep = 0);
          curStep = Math.round(curStep);
          this.curStep = curStep;
          this.left = curStep * wTov;
        } else {
          let left = tempLeft + curX - startX;
          left &lt; 0 &amp;&amp; (left = 0);
          left &gt; width &amp;&amp; (left = width);
          this.left = left;
        }
      },
      createNode () {
        const fElem = document.createElement(&apos;i&apos;);
        const textNode = document.createTextNode(this.postValue.toFixed(2));
        fElem.appendChild(textNode);
       return fElem;
      }
    },
    mounted () {
      this.width = elemOffset(this.$el).width;
    }
  };
&lt;/script&gt;

&lt;style lang=&quot;scss&quot;&gt;
    .jc-slider-cmp {
        position: relative;
        display: inline-block;
        width: 100%;
        border-radius: 4px;
        height: 8px;
        background: #ccc;
        .jc-slider-dot {
            position: absolute;
            display: inline-block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            left: 0;
            top: 50%;
            transform: translate(-50%, -50%);
            background: #333;
            cursor: pointer;
        }
        .slider-active-bg {
            position: relative;
            height: 100%;
            border-radius: 4px;
            background: red;
        }
    }
&lt;/style&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;jc-slider-cmp&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>
                <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;slider-active-bg&quot;</span>
                <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;{width: `${left}px`}&quot;</span>
            &gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span>
                    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;jc-slider-dot&quot;</span>
                    <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;{left: `${left}px`}&quot;</span>
                    <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;dot&quot;</span>
                    @<span class="hljs-attr">mousedown</span>=<span class="hljs-string">&quot;moveStart&quot;</span>
                    <span class="hljs-attr">v-jc-tips</span>=<span class="hljs-string">&quot;createNode&quot;</span>
            &gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> {elemOffset, on, off, once} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../../utils/dom&quot;</span>;
  <span class="hljs-keyword">const</span> global = <span class="hljs-built_in">window</span>;
  <span class="hljs-keyword">const</span> doc = global.document;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">step</span>: {
        <span class="hljs-attr">type</span>: [<span class="hljs-built_in">Number</span>],
        <span class="hljs-attr">default</span>: <span class="hljs-number">0</span>
      },
      <span class="hljs-attr">rangeEnd</span>: {
        <span class="hljs-attr">type</span>: [<span class="hljs-built_in">Number</span>],
        <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
      },
      <span class="hljs-attr">value</span>: {
        <span class="hljs-attr">type</span>: [<span class="hljs-built_in">Number</span>],
        <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
      },
      <span class="hljs-attr">minValue</span>: {
        <span class="hljs-attr">type</span>: [<span class="hljs-built_in">Number</span>],
        <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
      },
      <span class="hljs-attr">maxValue</span>: {
        <span class="hljs-attr">type</span>: [<span class="hljs-built_in">Number</span>],
        <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
      }
    },
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">startX</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">width</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">curValue</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">curStep</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">left</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">tempLeft</span>: <span class="hljs-number">0</span>
      }
    },
    <span class="hljs-attr">computed</span>: {
      wTov () {
        <span class="hljs-keyword">let</span> step = <span class="hljs-keyword">this</span>.step;
        <span class="hljs-keyword">let</span> width = <span class="hljs-keyword">this</span>.width;
        <span class="hljs-keyword">let</span> rangeEnd = <span class="hljs-keyword">this</span>.rangeEnd;
        <span class="hljs-keyword">if</span> (width) {
          <span class="hljs-keyword">if</span> (step) {
            <span class="hljs-keyword">return</span> width / (rangeEnd / step)
          }
          <span class="hljs-keyword">return</span> width / rangeEnd
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
      },
      postValue () {
        <span class="hljs-keyword">let</span> value = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.step) {
          value =  <span class="hljs-keyword">this</span>.step * <span class="hljs-keyword">this</span>.curStep;
        } <span class="hljs-keyword">else</span> {
          value = <span class="hljs-keyword">this</span>.left / <span class="hljs-keyword">this</span>.wTov;
        }
        <span class="hljs-keyword">return</span> value;
      }
    },
    <span class="hljs-attr">watch</span>: {
       <span class="hljs-attr">value</span>: {
         handler (value) {
           <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
             <span class="hljs-keyword">let</span> step = <span class="hljs-keyword">this</span>.step;
             <span class="hljs-keyword">let</span> wTov = <span class="hljs-keyword">this</span>.wTov;
             <span class="hljs-keyword">if</span> (step) {
               <span class="hljs-keyword">this</span>.left = value / step * wTov;
             } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">this</span>.left = value * wTov;
             }
           })
         },
         <span class="hljs-attr">immediate</span>: <span class="hljs-literal">true</span>
       }
    },
    <span class="hljs-attr">methods</span>: {
      moveStart (e) {
        e.preventDefault();
        <span class="hljs-keyword">const</span> body = <span class="hljs-built_in">window</span>.document.body;
        <span class="hljs-keyword">const</span> _this = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">this</span>.startX = e.pageX;
        <span class="hljs-keyword">this</span>.tempLeft = <span class="hljs-keyword">this</span>.left;
        on({
          <span class="hljs-attr">el</span>: body,
          <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;mousemove&apos;</span>,
          <span class="hljs-attr">fn</span>: <span class="hljs-keyword">this</span>.moving
        });
        once({
          <span class="hljs-attr">el</span>: body,
          <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;mouseup&apos;</span>,
          <span class="hljs-attr">fn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;end&apos;</span>);
            _this.$emit(<span class="hljs-string">&apos;input&apos;</span>, _this.postValue);
            off({
              <span class="hljs-attr">el</span>: body,
              <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;mousemove&apos;</span>,
              <span class="hljs-attr">fn</span>: _this.moving
            })
          }
        })
      },
      moving(e) {
        <span class="hljs-keyword">let</span> curX = e.pageX;
        <span class="hljs-keyword">let</span> step = <span class="hljs-keyword">this</span>.step;
        <span class="hljs-keyword">let</span> rangeEnd = <span class="hljs-keyword">this</span>.rangeEnd;
        <span class="hljs-keyword">let</span> width = <span class="hljs-keyword">this</span>.width;
        <span class="hljs-keyword">let</span> tempLeft = <span class="hljs-keyword">this</span>.tempLeft;
        <span class="hljs-keyword">let</span> startX = <span class="hljs-keyword">this</span>.startX;
        <span class="hljs-keyword">let</span> wTov = <span class="hljs-keyword">this</span>.wTov;
        <span class="hljs-keyword">if</span> (step !== <span class="hljs-number">0</span>) {
          <span class="hljs-keyword">let</span> all = <span class="hljs-built_in">parseInt</span>(rangeEnd / step);
          <span class="hljs-keyword">let</span> curStep = (tempLeft + curX - startX) / wTov;
          curStep &gt; all &amp;&amp; (curStep = all);
          curStep &lt; <span class="hljs-number">0</span> &amp;&amp; (curStep = <span class="hljs-number">0</span>);
          curStep = <span class="hljs-built_in">Math</span>.round(curStep);
          <span class="hljs-keyword">this</span>.curStep = curStep;
          <span class="hljs-keyword">this</span>.left = curStep * wTov;
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">let</span> left = tempLeft + curX - startX;
          left &lt; <span class="hljs-number">0</span> &amp;&amp; (left = <span class="hljs-number">0</span>);
          left &gt; width &amp;&amp; (left = width);
          <span class="hljs-keyword">this</span>.left = left;
        }
      },
      createNode () {
        <span class="hljs-keyword">const</span> fElem = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;i&apos;</span>);
        <span class="hljs-keyword">const</span> textNode = <span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-keyword">this</span>.postValue.toFixed(<span class="hljs-number">2</span>));
        fElem.appendChild(textNode);
       <span class="hljs-keyword">return</span> fElem;
      }
    },
    mounted () {
      <span class="hljs-keyword">this</span>.width = elemOffset(<span class="hljs-keyword">this</span>.$el).width;
    }
  };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;scss&quot;</span>&gt;</span><span class="undefined">
    .jc-slider-cmp {
        position: relative;
        display: inline-block;
        width: 100%;
        border-radius: 4px;
        height: 8px;
        background: #ccc;
        .jc-slider-dot {
            position: absolute;
            display: inline-block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            left: 0;
            top: 50%;
            transform: translate(-50%, -50%);
            background: #333;
            cursor: pointer;
        }
        .slider-active-bg {
            position: relative;
            height: 100%;
            border-radius: 4px;
            background: red;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre><p><strong>../utils/dom</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const global = window;
export const on = ({el, type, fn}) =&gt; {
         if (typeof global) {
             if (global.addEventListener) {
                 el.addEventListener(type, fn, false)
            } else {
                 el.attachEvent(`on${type}`, fn)
            }
         }
    };
    export const off = ({el, type, fn}) =&gt; {
        if (typeof global) {
            if (global.removeEventListener) {
                el.removeEventListener(type, fn)
            } else {
                el.detachEvent(`on${type}`, fn)
            }
        }
    };
    export const once = ({el, type, fn}) =&gt; {
        const hyFn = (event) =&gt; {
            try {
                fn(event)
            }
             finally  {
                off({el, type, fn: hyFn})
            }
        }
        on({el, type, fn: hyFn})
    };
    // &#x6700;&#x540E;&#x4E00;&#x4E2A;
    export const fbTwice = ({fn, time = 300}) =&gt; {
        let [cTime, k] = [null, null]
        // &#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65F6;&#x95F4;
        const getTime = () =&gt; new Date().getTime()
        // &#x6DF7;&#x5408;&#x51FD;&#x6570;
        const hyFn = () =&gt; {
            const ags = argments
            return () =&gt; {
                clearTimeout(k)
                k = cTime =  null
                fn(...ags)
            }
        };
        return () =&gt; {
            if (cTime == null) {
                k = setTimeout(hyFn(...arguments), time)
                cTime = getTime()
            } else {
                if ( getTime() - cTime &lt; 0) {
                    // &#x6E05;&#x9664;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;&#x5806; ---- &#x91CD;&#x65B0;&#x8BB0;&#x5F55;
                    clearTimeout(k)
                    k = null
                    cTime = getTime()
                    k = setTimeout(hyFn(...arguments), time)
                }
            }}
    };
    export  const contains = function(parentNode, childNode) {
        if (parentNode.contains) {
            return parentNode !== childNode &amp;&amp; parentNode.contains(childNode)
        } else {
            // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/compareDocumentPosition
            return (parentNode.compareDocumentPosition(childNode) === 16)
        }
    };
    export const addClass = function (el, className) {
        if (typeof el !== &quot;object&quot;) {
            return null
        }
        let  classList = el[&apos;className&apos;]
        classList = classList === &apos;&apos; ? [] : classList.split(/\s+/)
        if (classList.indexOf(className) === -1) {
            classList.push(className)
            el.className = classList.join(&apos; &apos;)
        }
    };
    export const removeClass = function (el, className) {
        let classList = el[&apos;className&apos;]
        classList = classList === &apos;&apos; ? [] : classList.split(/\s+/)
        classList = classList.filter(item =&gt; {
            return item !== className
        })
        el.className =     classList.join(&apos; &apos;)
    };
    export const delay = ({fn, time}) =&gt; {
        let oT = null
        let k = null
        return () =&gt; {
            // &#x5F53;&#x524D;&#x65F6;&#x95F4;
            let cT = new Date().getTime()
            const fixFn = () =&gt; {
                k = oT = null
                fn()
            }
            if (k === null) {
                oT = cT
                k = setTimeout(fixFn, time)
                return
            }
            if (cT - oT &lt; time) {
                oT = cT
                clearTimeout(k)
                k = setTimeout(fixFn, time)
            }
        
        }
    };
    export const position = (son, parent = global.document.body) =&gt; {
        let top  = 0;
        let left = 0;
        let offsetParent = son;
        while (offsetParent !== parent) {
            let dx = offsetParent.offsetLeft;
            let dy = offsetParent.offsetTop;
            let old = offsetParent;
            if (dx === null) {
                return {
                    flag: false
                }
            }
            left += dx;
            top += dy;
      offsetParent = offsetParent.offsetParent;
            if (offsetParent === null &amp;&amp; old !== global.document.body) {
                return {
                    flag: false
                }
            }
        }
        return  {
            flag: true,
            top,
            left
        }
    };
    export  const getElem = (filter) =&gt; {
        return Array.from(global.document.querySelectorAll(filter));
    };
    export const elemOffset = (elem) =&gt; {
        return {
            width: elem.offsetWidth,
            height: elem.offsetHeight
        }
    };
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> global = <span class="hljs-built_in">window</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> on = <span class="hljs-function">(<span class="hljs-params">{el, <span class="hljs-keyword">type</span>, fn}</span>) =&gt;</span> {
         <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> global) {
             <span class="hljs-keyword">if</span> (global.addEventListener) {
                 el.addEventListener(<span class="hljs-keyword">type</span>, fn, <span class="hljs-literal">false</span>)
            } <span class="hljs-keyword">else</span> {
                 el.attachEvent(<span class="hljs-string">`on<span class="hljs-subst">${type}</span>`</span>, fn)
            }
         }
    };
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> off = <span class="hljs-function">(<span class="hljs-params">{el, <span class="hljs-keyword">type</span>, fn}</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> global) {
            <span class="hljs-keyword">if</span> (global.removeEventListener) {
                el.removeEventListener(<span class="hljs-keyword">type</span>, fn)
            } <span class="hljs-keyword">else</span> {
                el.detachEvent(<span class="hljs-string">`on<span class="hljs-subst">${type}</span>`</span>, fn)
            }
        }
    };
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> once = <span class="hljs-function">(<span class="hljs-params">{el, <span class="hljs-keyword">type</span>, fn}</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> hyFn = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
            <span class="hljs-keyword">try</span> {
                fn(event)
            }
             <span class="hljs-keyword">finally</span>  {
                off({el, <span class="hljs-keyword">type</span>, fn: hyFn})
            }
        }
        on({el, <span class="hljs-keyword">type</span>, fn: hyFn})
    };
    <span class="hljs-comment">// &#x6700;&#x540E;&#x4E00;&#x4E2A;</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fbTwice = <span class="hljs-function">(<span class="hljs-params">{fn, time = 300}</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> [cTime, k] = [<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>]
        <span class="hljs-comment">// &#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65F6;&#x95F4;</span>
        <span class="hljs-keyword">const</span> getTime = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
        <span class="hljs-comment">// &#x6DF7;&#x5408;&#x51FD;&#x6570;</span>
        <span class="hljs-keyword">const</span> hyFn = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">const</span> ags = argments
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                clearTimeout(k)
                k = cTime =  <span class="hljs-literal">null</span>
                fn(...ags)
            }
        };
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (cTime == <span class="hljs-literal">null</span>) {
                k = setTimeout(hyFn(...arguments), time)
                cTime = getTime()
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">if</span> ( getTime() - cTime &lt; <span class="hljs-number">0</span>) {
                    <span class="hljs-comment">// &#x6E05;&#x9664;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;&#x5806; ---- &#x91CD;&#x65B0;&#x8BB0;&#x5F55;</span>
                    clearTimeout(k)
                    k = <span class="hljs-literal">null</span>
                    cTime = getTime()
                    k = setTimeout(hyFn(...arguments), time)
                }
            }}
    };
    <span class="hljs-keyword">export</span>  <span class="hljs-keyword">const</span> contains = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">parentNode, childNode</span>) </span>{
        <span class="hljs-keyword">if</span> (parentNode.contains) {
            <span class="hljs-keyword">return</span> parentNode !== childNode &amp;&amp; parentNode.contains(childNode)
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// https://developer.mozilla.org/zh-CN/docs/Web/API/Node/compareDocumentPosition</span>
            <span class="hljs-keyword">return</span> (parentNode.compareDocumentPosition(childNode) === <span class="hljs-number">16</span>)
        }
    };
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> addClass = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el, className</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> el !== <span class="hljs-string">&quot;object&quot;</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
        }
        <span class="hljs-keyword">let</span>  classList = el[<span class="hljs-string">&apos;className&apos;</span>]
        classList = classList === <span class="hljs-string">&apos;&apos;</span> ? [] : classList.split(<span class="hljs-regexp">/\s+/</span>)
        <span class="hljs-keyword">if</span> (classList.indexOf(className) === <span class="hljs-number">-1</span>) {
            classList.push(className)
            el.className = classList.join(<span class="hljs-string">&apos; &apos;</span>)
        }
    };
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> removeClass = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el, className</span>) </span>{
        <span class="hljs-keyword">let</span> classList = el[<span class="hljs-string">&apos;className&apos;</span>]
        classList = classList === <span class="hljs-string">&apos;&apos;</span> ? [] : classList.split(<span class="hljs-regexp">/\s+/</span>)
        classList = classList.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
            <span class="hljs-keyword">return</span> item !== className
        })
        el.className =     classList.join(<span class="hljs-string">&apos; &apos;</span>)
    };
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> delay = <span class="hljs-function">(<span class="hljs-params">{fn, time}</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> oT = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">let</span> k = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">// &#x5F53;&#x524D;&#x65F6;&#x95F4;</span>
            <span class="hljs-keyword">let</span> cT = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
            <span class="hljs-keyword">const</span> fixFn = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                k = oT = <span class="hljs-literal">null</span>
                fn()
            }
            <span class="hljs-keyword">if</span> (k === <span class="hljs-literal">null</span>) {
                oT = cT
                k = setTimeout(fixFn, time)
                <span class="hljs-keyword">return</span>
            }
            <span class="hljs-keyword">if</span> (cT - oT &lt; time) {
                oT = cT
                clearTimeout(k)
                k = setTimeout(fixFn, time)
            }
        
        }
    };
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> position = <span class="hljs-function">(<span class="hljs-params">son, parent = global.<span class="hljs-built_in">document</span>.body</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> top  = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">let</span> left = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">let</span> offsetParent = son;
        <span class="hljs-keyword">while</span> (offsetParent !== parent) {
            <span class="hljs-keyword">let</span> dx = offsetParent.offsetLeft;
            <span class="hljs-keyword">let</span> dy = offsetParent.offsetTop;
            <span class="hljs-keyword">let</span> old = offsetParent;
            <span class="hljs-keyword">if</span> (dx === <span class="hljs-literal">null</span>) {
                <span class="hljs-keyword">return</span> {
                    flag: <span class="hljs-literal">false</span>
                }
            }
            left += dx;
            top += dy;
      offsetParent = offsetParent.offsetParent;
            <span class="hljs-keyword">if</span> (offsetParent === <span class="hljs-literal">null</span> &amp;&amp; old !== global.document.body) {
                <span class="hljs-keyword">return</span> {
                    flag: <span class="hljs-literal">false</span>
                }
            }
        }
        <span class="hljs-keyword">return</span>  {
            flag: <span class="hljs-literal">true</span>,
            top,
            left
        }
    };
    <span class="hljs-keyword">export</span>  <span class="hljs-keyword">const</span> getElem = <span class="hljs-function">(<span class="hljs-params">filter</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(global.document.querySelectorAll(filter));
    };
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> elemOffset = <span class="hljs-function">(<span class="hljs-params">elem</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> {
            width: elem.offsetWidth,
            height: elem.offsetHeight
        }
    };
</code></pre>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 指令---气泡提示(手撸实战)

## 原文链接
[https://segmentfault.com/a/1190000016719995](https://segmentfault.com/a/1190000016719995)

