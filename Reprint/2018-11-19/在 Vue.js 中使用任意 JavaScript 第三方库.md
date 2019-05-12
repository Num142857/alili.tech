---
title: '在 Vue.js 中使用任意 JavaScript 第三方库' 
date: 2018-11-19 2:30:10
hidden: true
slug: htbl7tvgd0f
categories: [reprint]
---

{{< raw >}}
<p>&#x5982;&#x4F55;&#x5728; Vue.js &#x9879;&#x76EE;&#x4E2D; &#x5F15;&#x5165; JavaScript &#x7B2C;&#x4E09;&#x65B9;&#x5E93;</p><hr><p><strong>&#x5168;&#x5C40;&#x53D8;&#x91CF;</strong></p><hr><p>&#x5C06; JavaScript &#x7B2C;&#x4E09;&#x65B9;&#x5E93; &#x6DFB;&#x52A0;&#x5230;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x6700;&#x7B80;&#x5355;&#x7684;&#x529E;&#x6CD5;&#x662F;&#x901A;&#x8FC7;&#x5C06;&#x5176;&#x9644;&#x52A0;&#x5230; window &#x5BF9;&#x8C61;&#x4E0A;&#xFF0C;&#x4EE5;&#x4F7F;&#x5176;&#x6210;&#x4E3A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry.js &#x6587;&#x4EF6;
window._ = require(&apos;lodash&apos;); 
JavaScript &#x4EE3;&#x7801;:
// MyComponent.vue &#x6587;&#x4EF6;
export default {
  created() {
    console.log(_.isEmpty() ? &apos;Lodash everywhere!&apos; : &apos;Uh oh..&apos;);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// entry.js &#x6587;&#x4EF6;</span>
<span class="hljs-built_in">window</span>._ = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;lodash&apos;</span>); 
JavaScript &#x4EE3;&#x7801;:
<span class="hljs-comment">// MyComponent.vue &#x6587;&#x4EF6;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  created() {
    <span class="hljs-built_in">console</span>.log(_.isEmpty() ? <span class="hljs-string">&apos;Lodash everywhere!&apos;</span> : <span class="hljs-string">&apos;Uh oh..&apos;</span>);
  }
}</code></pre><p>&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4F1A;&#x4F7F; window &#x53D8;&#x91CF;&#x4E0D;&#x65AD;&#x589E;&#x957F;&#xFF0C;&#x4F46;&#x662F;&#x6700;&#x5173;&#x952E;&#x7684;&#x662F;&#xFF0C;&#x4ED6;&#x4EEC;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x670D;&#x52A1;&#x5668;&#x6E32;&#x67D3;&#x3002;&#x5F53;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x8FD0;&#x884C;&#x65F6;&#xFF0C;window &#x5BF9;&#x8C61;&#x662F; undefined &#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x5C1D;&#x8BD5;&#x8BBF;&#x95EE; window &#x4E0B;&#x7684;&#x5C5E;&#x6027;&#x5C06;&#x4F1A;&#x629B;&#x51FA;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#x3002;</p><hr><p><strong>&#x5728;&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#x5BFC;&#x5165;</strong></p><hr><p>&#x53E6;&#x4E00;&#x79CD;&#x4E8C;&#x6D41;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x5C06;&#x5E93;&#x5BFC;&#x5165;&#x5230;&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// MyComponent.vue &#x6587;&#x4EF6;
import _ from &apos;lodash&apos;;
export default {
  created() {
    console.log(_.isEmpty() ? &apos;Lodash is available here!&apos; : &apos;Uh oh..&apos;);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// MyComponent.vue &#x6587;&#x4EF6;</span>
<span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;lodash&apos;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  created() {
    <span class="hljs-built_in">console</span>.log(_.isEmpty() ? <span class="hljs-string">&apos;Lodash is available here!&apos;</span> : <span class="hljs-string">&apos;Uh oh..&apos;</span>);
  }
}</code></pre><p>&#x8FD9;&#x662F;&#x6709;&#x6548;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x4F60;&#x9700;&#x8981;&#x91CD;&#x590D;&#x624B;&#x52A8;&#x5BFC;&#x5165;&#x548C;&#x79FB;&#x9664;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x75DB;&#x70B9;&#xFF1A;&#x4F60;&#x5FC5;&#x987B;&#x8BB0;&#x4F4F;&#x5C06;&#x8FD9;&#x4E2A;&#x5E93;&#x5BFC;&#x5165;&#x5230;&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x5F53;&#x4F60;&#x7684;&#x67D0;&#x4E2A;&#x6587;&#x4EF6;&#x4E0D;&#x7528;&#x8FD9;&#x4E2A;&#x5E93;&#x7684;&#x65F6;&#x5019;, &#x8BB0;&#x5F97;&#x8981;&#x5C06;&#x5B83;&#x4ECE;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#x79FB;&#x9664;&#x3002;&#x5982;&#x679C;&#x4F60;&#x6CA1;&#x6709;&#x6B63;&#x786E;&#x5730;&#x8BBE;&#x7F6E;&#x4F60;&#x7684;&#x6784;&#x5EFA;&#x5DE5;&#x5177;&#xFF0C;&#x5219;&#x53EF;&#x80FD;&#x4F1A;&#x6700;&#x7EC8;&#x5BFC;&#x81F4;&#x5728;&#x6784;&#x5EFA;&#x5305;&#x4E2D;&#x5B58;&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x5E93;&#x7684;&#x591A;&#x4E2A;&#x526F;&#x672C;&#x3002;</p><hr><p><strong>&#x4E00;&#x4E2A;&#x66F4;&#x597D;&#x7684;&#x65B9;&#x5F0F;</strong></p><hr><p>&#x5728;Vue&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;Javascript&#x5E93;&#x7684;&#x6700;&#x5E72;&#x51C0;&#xFF0C;&#x6700;&#x5065;&#x58EE;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x5C06;&#x5176;&#x4EE3;&#x7406;&#x4E3A; Vue &#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x6211;&#x4EEC;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x5C06; Moment&#x65E5;&#x671F;&#x548C;&#x65F6;&#x95F4;&#x5E93;&#x6DFB;&#x52A0;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JavaScript &#x4EE3;&#x7801;:
// entry.js &#x6587;&#x4EF6;
import moment from &apos;moment&apos;;
Object.definePrototype(Vue.prototype, &apos;$moment&apos;, { value: moment });
&#x7531;&#x4E8E;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x90FD;&#x4F1A;&#x7EE7;&#x627F; Vue &#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0A;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x5C06;&#x4F7F; Moment &#x81EA;&#x52A8;&#x53EF;&#x7528;&#x4E8E;&#x4EFB;&#x4F55;&#x7EC4;&#x4EF6;&#xFF0C;&#x6CA1;&#x6709;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x6216;&#x4EFB;&#x4F55;&#x9700;&#x8981;&#x624B;&#x52A8;&#x5BFC;&#x5165;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x5B83;&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x4F55; &#x5B9E;&#x4F8B;/&#x7EC4;&#x4EF6; &#x4E2D;&#x7B80;&#x5355;&#x5730;&#x901A;&#x8FC7; this.$moment &#x8BBF;&#x95EE;&#x88AB;&#x8BBF;&#x95EE;&#xFF1A;

JavaScript &#x4EE3;&#x7801;:
// MyComponent.vue &#x6587;&#x4EF6;
export default {
  created() {
    console.log(&apos;The time is &apos; . this.$moment().format(&quot;HH:mm&quot;));
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>JavaScript &#x4EE3;&#x7801;:
<span class="hljs-comment">// entry.js &#x6587;&#x4EF6;</span>
<span class="hljs-keyword">import</span> moment <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;moment&apos;</span>;
<span class="hljs-built_in">Object</span>.definePrototype(Vue.prototype, <span class="hljs-string">&apos;$moment&apos;</span>, { value: moment });
&#x7531;&#x4E8E;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x90FD;&#x4F1A;&#x7EE7;&#x627F; Vue &#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0A;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x5C06;&#x4F7F; Moment &#x81EA;&#x52A8;&#x53EF;&#x7528;&#x4E8E;&#x4EFB;&#x4F55;&#x7EC4;&#x4EF6;&#xFF0C;&#x6CA1;&#x6709;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x6216;&#x4EFB;&#x4F55;&#x9700;&#x8981;&#x624B;&#x52A8;&#x5BFC;&#x5165;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x5B83;&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x4F55; &#x5B9E;&#x4F8B;/&#x7EC4;&#x4EF6; &#x4E2D;&#x7B80;&#x5355;&#x5730;&#x901A;&#x8FC7; <span class="hljs-keyword">this</span>.$moment &#x8BBF;&#x95EE;&#x88AB;&#x8BBF;&#x95EE;&#xFF1A;

JavaScript &#x4EE3;&#x7801;:
<span class="hljs-comment">// MyComponent.vue &#x6587;&#x4EF6;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  created() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;The time is &apos;</span> . <span class="hljs-keyword">this</span>.$moment().format(<span class="hljs-string">&quot;HH:mm&quot;</span>));
  }
}</code></pre><p>&#x73B0;&#x5728;&#x8BA9;&#x6211;&#x4EEC;&#x82B1;&#x70B9;&#x65F6;&#x95F4;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#x8FD9;&#x662F;&#x5982;&#x4F55;&#x5DE5;&#x4F5C;&#x7684;&#x3002;</p><p>Object.defineProperty<br>&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x4F1A;&#x50CF;&#x8FD9;&#x6837;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JavaScript &#x4EE3;&#x7801;:
Vue.prototype.$moment = moment;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code><span class="hljs-type">JavaScript</span> &#x4EE3;&#x7801;:
<span class="hljs-type">Vue</span>.proto<span class="hljs-keyword">type</span>.$moment = moment;</code></pre><p>&#x4F60;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x505A;&#xFF0C;&#x4F46;&#x662F;&#x901A;&#x8FC7;&#x4F7F;&#x7528; Object.defineProperty &#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; &#x63CF;&#x8FF0;&#x7B26; &#x6765;&#x5B9A;&#x4E49;&#x6211;&#x4EEC;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x63CF;&#x8FF0;&#x7B26;&#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x8BBE;&#x7F6E;&#x4E00;&#x4E9B;&#x4F4E;&#x7EA7;&#x7EC6;&#x8282;&#xFF0C;&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x7684;&#x5C5E;&#x6027;&#x662F;&#x5426;&#x53EF;&#x5199;&#xFF0C;&#x4EE5;&#x53CA;&#x5728; for &#x5FAA;&#x73AF;&#x4E2D;&#x679A;&#x4E3E;&#x671F;&#x95F4;&#x662F;&#x5426;&#x663E;&#x793A;&#x3002;</p><p>&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x4E0D;&#x4F1A;&#x5728;&#x65E5;&#x5E38;&#x4F7F;&#x7528; Javascript &#x4E2D;&#x4F7F;&#x7528;&#x5230;&#x63CF;&#x8FF0;&#x7B26;&#xFF0C;&#x56E0;&#x4E3A; 99&#xFF05; &#x7684;&#x65F6;&#x95F4;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x8FD9;&#x4E48;&#x7EC6;&#x81F4;&#x7684;&#x5C5E;&#x6027;&#x5206;&#x914D;&#x3002;&#x4F46;&#x8FD9;&#x91CC;&#x7ED9;&#x6211;&#x4EEC;&#x4E00;&#x4E2A;&#x660E;&#x663E;&#x7684;&#x4F18;&#x52BF;&#xFF1A;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4F7F;&#x7528;&#x63CF;&#x8FF0;&#x7B26;&#x521B;&#x5EFA;&#x7684;&#x5C5E;&#x6027;&#x662F;&#x53EA;&#x8BFB;&#x7684;&#x3002;</p><p>&#x8FD9;&#x610F;&#x5473;&#x7740;&#xFF0C;&#x4E00;&#x4E9B;&#x7CCA;&#x6D82;&#x7684;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#xFF08;&#x53EF;&#x80FD;&#x662F;&#x4F60;&#xFF09;&#x4E0D;&#x80FD;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x53BB;&#x505A;&#x4E00;&#x4E9B;&#x5F88;&#x611A;&#x8822;&#x7684;&#x4E8B;&#x60C5;, &#x5E76;&#x4E14;&#x7834;&#x574F;&#x4E00;&#x5207;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JavaScript &#x4EE3;&#x7801;:
this.$http = &apos;Assign some random thing to the instance method&apos;;
this.$http.get(&apos;/&apos;); // TypeError: this.$http.get is not a function
&#x76F8;&#x53CD;, &#x6211;&#x4EEC;&#x7684;&#x53EA;&#x8BFB;&#x5B9E;&#x4F8B;&#x5219;&#x80FD;&#x5F88;&#x597D;&#x7684;&#x4FDD;&#x62A4;&#x6211;&#x4EEC;&#x7684;&#x5E93;, &#x56E0;&#x4E3A;&#x5982;&#x679C;&#x6709;&#x4EBA;&#x8BD5;&#x56FE;&#x53BB;&#x8986;&#x76D6;&#x5B83;, &#x5C06;&#x4F1A;&#x83B7;&#x5F97;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;:  TypeError: Cannot assign to read only property." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs smali"><code>JavaScript &#x4EE3;&#x7801;:
this.$http = &apos;Assign some random thing to the<span class="hljs-built_in"> instance </span>method&apos;;
this.$http.get(&apos;/&apos;); // TypeError: this.$http.get is<span class="hljs-built_in"> not </span>a function
&#x76F8;&#x53CD;, &#x6211;&#x4EEC;&#x7684;&#x53EA;&#x8BFB;&#x5B9E;&#x4F8B;&#x5219;&#x80FD;&#x5F88;&#x597D;&#x7684;&#x4FDD;&#x62A4;&#x6211;&#x4EEC;&#x7684;&#x5E93;, &#x56E0;&#x4E3A;&#x5982;&#x679C;&#x6709;&#x4EBA;&#x8BD5;&#x56FE;&#x53BB;&#x8986;&#x76D6;&#x5B83;, &#x5C06;&#x4F1A;&#x83B7;&#x5F97;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;:  TypeError: Cannot assign to read only property.</code></pre><hr><p><strong>$</strong></p><hr><p>&#x60A8;&#x4F1A;&#x6CE8;&#x610F;&#x5230;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x5E93;&#x4EE3;&#x7406;&#x4E3A;&#x4EE5;&#x7F8E;&#x5143;&#x7B26;&#x53F7;&#x201C;$&#x201D;&#x4E3A;&#x524D;&#x7F00;&#x7684;&#x5C5E;&#x6027;&#x540D;&#x3002; &#x4F60;&#x53EF;&#x80FD;&#x8FD8;&#x770B;&#x8FC7;&#x5176;&#x4ED6;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x4F8B;&#x5982;&#xFF0C;$refs, $on, $mount&#x7B49;&#x7B49;&#x4E5F;&#x90FD;&#x662F;&#x4EE5;&#x201D;$&#x201D;&#x5F00;&#x5934;&#x3002;</p><p>&#x867D;&#x7136;&#x5C5E;&#x6027;&#x540D;&#x4E0A;&#x6DFB;&#x52A0;&#x524D;&#x7F00;&#x4E0D;&#x662F;&#x5FC5;&#x987B;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x505A;&#x53EF;&#x4EE5;&#x63D0;&#x9192;&#x7CCA;&#x6D82;&#x7684;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#xFF08;&#x53EF;&#x80FD;&#x662F;&#x4F60;&#xFF09;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x516C;&#x5171;API&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;&#xFF0C;&#x6B22;&#x8FCE;&#x4F60;&#x4F7F;&#x7528;&#xFF0C;&#x4E0D;&#x50CF;&#x5176;&#x4ED6;&#x5C5E;&#x6027;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x53EF;&#x80FD;&#x53EA;&#x662F;&#x4E3A;&#x4E86; Vue &#x7684;&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x3002;</p><p>&#x4F5C;&#x4E3A;&#x57FA;&#x4E8E;&#x539F;&#x578B;&#x7684;&#x8BED;&#x8A00;&#xFF0C;Javascript &#x4E2D;&#x6CA1;&#x6709;&#xFF08;&#x771F;&#x6B63;&#x7684;&#xFF09;&#x7C7B;&#xFF0C;&#x56E0;&#x6B64;&#x4E5F;&#x6CA1;&#x6709; &#x201C;&#x79C1;&#x6709;&#x201D; &#x548C; &#x201C;&#x516C;&#x5171;&#x201D; &#x53D8;&#x91CF;&#x6216; &#x201C;&#x9759;&#x6001;&#x201D; &#x65B9;&#x6CD5;&#x3002; &#x8FD9;&#x4E2A;&#x60EF;&#x4F8B;&#x662F;&#x4E00;&#x79CD;&#x5F88;&#x597D;&#x7684;&#x66FF;&#x4EE3;&#x54C1;&#xFF0C;&#x6211;&#x4EEC;&#x8BA4;&#x4E3A;&#x662F;&#x503C;&#x5F97;&#x9075;&#x5B88;&#x7684;&#x7EA6;&#x5B9A;&#x3002;</p><hr><p><strong>this</strong></p><hr><p>&#x4F60;&#x8FD8;&#x4F1A;&#x6CE8;&#x610F;&#x5230;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; this.libraryName &#x6765;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x5E93; &#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x505A;&#x4F1A;&#x6709;&#x4E2A;&#x5C0F;&#x5C0F;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x73B0;&#x5728;&#x662F;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x7136;&#x800C;&#xFF0C;&#x8FD9;&#x6837;&#x505A;&#x7684;&#x7ED3;&#x679C;&#x662F;&#xFF0C;&#x4E0E;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x4E0D;&#x540C;&#xFF0C;&#x60A8;&#x5728;&#x4F7F;&#x7528;&#x5E93;&#x65F6;&#x5FC5;&#x987B;&#x786E;&#x4FDD;&#x5904;&#x4E8E;&#x6B63;&#x786E;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x3002;&#x5185;&#x90E8;&#x7684;&#x56DE;&#x8C03;&#x65B9;&#x6CD5;&#x4E0D;&#x80FD;&#x901A;&#x8FC7; this &#x6765;&#x8BBF;&#x95EE;&#x4F60;&#x7684;&#x5E93;&#x3002;</p><p>&#x5E78;&#x597D;&#xFF0C;ES6&#x4E2D;&#x7684;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x4E0D;&#x9519;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;, &#x5B83;&#x80FD;&#x786E;&#x4FDD;&#x4F60;&#x5728;&#x6B63;&#x786E;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JavaScript &#x4EE3;&#x7801;:
// script.js
this.$http.get(&apos;/&apos;).then(res =&gt; {
  if (res.status !== 200) {
    this.$http.get(&apos;/&apos;) // etc
    // &#x53EA;&#x5728;&#x7BAD;&#x5934;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x8D77;&#x4F5C;&#x7528;&#x3002;&#x611A;&#x4EBA;&#x7801;&#x5934;&#x6CE8;&#xFF1A;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;ES5 &#x7684; bind();
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>JavaScript &#x4EE3;&#x7801;:
<span class="hljs-comment">// script.js</span>
<span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;/&apos;</span>).then(res =&gt; {
  <span class="hljs-keyword">if</span> (res.status !== <span class="hljs-number">200</span>) {
    <span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;/&apos;</span>) <span class="hljs-comment">// etc</span>
    <span class="hljs-comment">// &#x53EA;&#x5728;&#x7BAD;&#x5934;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x8D77;&#x4F5C;&#x7528;&#x3002;&#x611A;&#x4EBA;&#x7801;&#x5934;&#x6CE8;&#xFF1A;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;ES5 &#x7684; bind();</span>
  }
});</code></pre><hr><p><strong>&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x4F7F;&#x5B83;&#x6210;&#x4E3A;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#xFF1F;</strong></p><p>&#x5982;&#x679C;&#x60A8;&#x6253;&#x7B97;&#x5728;&#x591A;&#x4E2A; Vue &#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528; JavaScript &#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#xFF0C;&#x6216;&#x8005;&#x60A8;&#x60F3;&#x4E0E;&#x4E16;&#x754C;&#x5206;&#x4EAB;&#x4F60;&#x7684;&#x5E93;&#xFF0C;&#x60A8;&#x53EF;&#x4EE5;&#x5C06;&#x5176;&#x6784;&#x5EFA;&#x6210;&#x63D2;&#x4EF6;&#xFF01;</p><p>&#x63D2;&#x4EF6;&#x63D0;&#x53D6;&#x590D;&#x6742;&#x6027;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x5141;&#x8BB8;&#x4F60;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x7B80;&#x5355;&#x5730;&#x6267;&#x884C;&#x4EE5;&#x4E0B;&#x64CD;&#x4F5C;&#x6765;&#x6DFB;&#x52A0;&#x4F60;&#x9009;&#x62E9;&#x7684;&#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JavaScript &#x4EE3;&#x7801;:
// script.js
import MyLibraryPlugin from &apos;my-library-plugin&apos;;
Vue.use(MyLibraryPlugin);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>JavaScript &#x4EE3;&#x7801;:
<span class="hljs-comment">// script.js</span>
<span class="hljs-keyword">import</span> MyLibraryPlugin <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;my-library-plugin&apos;</span>;
Vue.use(MyLibraryPlugin);</code></pre><p>&#x4F7F;&#x7528;&#x8FD9;&#x4E24;&#x884C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x4F55;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528; JavaScript &#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#xFF0C;&#x5C31;&#x50CF;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; Vue Router &#xFF0C;Vuex &#x548C;&#x5176;&#x4ED6;&#x4F7F;&#x7528; Vue.use &#x7684;&#x63D2;&#x4EF6;&#x4E00;&#x6837;&#x3002;</p><p>&#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;<br>&#x9996;&#x5148;&#xFF0C;&#x4E3A;&#x60A8;&#x7684;&#x63D2;&#x4EF6;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x3002;&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x6211;&#x5C06;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;&#x5C06; Axios &#x6DFB;&#x52A0;&#x5230;&#x4F60;&#x6240;&#x6709;&#x7684; Vue &#x5B9E;&#x4F8B;&#x548C;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x5C06;&#x8C03;&#x7528;&#x6587;&#x4EF6; axios.js&#x3002;</p><p>&#x8981;&#x4E86;&#x89E3;&#x7684;&#x4E3B;&#x8981;&#x5185;&#x5BB9;&#x662F;&#xFF1A;&#x63D2;&#x4EF6;&#x5FC5;&#x987B;&#x516C;&#x5F00;&#x4E00;&#x4E2A; install &#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x4E14;&#x5C06; Vue &#x6784;&#x9020;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JavaScript &#x4EE3;&#x7801;:
// axios.js
export default {
  install: function(Vue) {
    // Do stuff
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>JavaScript &#x4EE3;&#x7801;:
<span class="hljs-comment">// axios.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">install</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>) </span>{
    <span class="hljs-comment">// Do stuff</span>
  }
}</code></pre><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E4B;&#x524D;&#x4ECB;&#x7ECD;&#x7684;&#x65B9;&#x6CD5;&#x5C06;&#x5E93;&#x6DFB;&#x52A0;&#x5230;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E2D;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JavaScript &#x4EE3;&#x7801;:
// axios.js
import axios from &apos;axios&apos;;
export default {
  install: function(Vue,) {
    Object.defineProperty(Vue.prototype, &apos;$http&apos;, { value: axios });
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>JavaScript &#x4EE3;&#x7801;:
<span class="hljs-comment">// axios.js</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">install</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue,</span>) </span>{
    <span class="hljs-built_in">Object</span>.defineProperty(Vue.prototype, <span class="hljs-string">&apos;$http&apos;</span>, { <span class="hljs-attr">value</span>: axios });
  }
}</code></pre><p>&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x9700;&#x8981;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x662F; use &#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x5C06;&#x6211;&#x4EEC;&#x7684;&#x5E93;&#x6DFB;&#x52A0;&#x5230;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x53EF;&#x4EE5;&#x8F7B;&#x677E;&#x5730;&#x6DFB;&#x52A0; Axios &#x5E93;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JavaScript &#x4EE3;&#x7801;:
// entry.js
import AxiosPlugin from &apos;./axios.js&apos;;
Vue.use(AxiosPlugin);
new Vue({
  created() {
    console.log(this.$http ? &apos;Axios works!&apos; : &apos;Uh oh..&apos;);
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>JavaScript &#x4EE3;&#x7801;:
<span class="hljs-comment">// entry.js</span>
<span class="hljs-keyword">import</span> AxiosPlugin <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./axios.js&apos;</span>;
Vue.use(AxiosPlugin);
<span class="hljs-keyword">new</span> Vue({
  created() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$http ? <span class="hljs-string">&apos;Axios works!&apos;</span> : <span class="hljs-string">&apos;Uh oh..&apos;</span>);
  }
})</code></pre><hr><p><strong>&#x5F69;&#x86CB;: &#x63D2;&#x4EF6;&#x53EF;&#x9009;&#x53C2;&#x6570;</strong></p><hr><p>&#x4F60;&#x63D2;&#x4EF6;&#x91CC;&#x7684; install &#x65B9;&#x6CD5;&#x5141;&#x8BB8;&#x63A5;&#x53D7;&#x53EF;&#x9009;&#x53C2;&#x6570;&#x3002; &#x4E00;&#x4E9B;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x53EF;&#x80FD;&#x4E0D;&#x662F;&#x5F88;&#x559C;&#x6B22;&#x4F7F;&#x7528; axios &#x5B9E;&#x4F8B;&#x7684;&#x65B9;&#x6CD5;&#x540D; $http &#xFF0C;&#x56E0;&#x4E3A; Vue Resource &#x5DF2;&#x7ECF;&#x4F7F;&#x7528;&#x4E86;&#x8FD9;&#x4E2A;&#x540D;&#x5B57;&#xFF0C;&#x6240;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x53EF;&#x9009;&#x53C2;&#x6570;&#x6765;&#x8BA9;&#x5B83;&#x4EEC;&#x53D8;&#x6210;&#x4F60;&#x6240;&#x559C;&#x6B22;&#x7684;&#x65B9;&#x6CD5;&#x540D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JavaScript &#x4EE3;&#x7801;:
// axios.js
import axios from &apos;axios&apos;;
export default {
  install: function(Vue, name = &apos;$http&apos;) {
    Object.defineProperty(Vue.prototype, name, { value: axios });
  }
}
JavaScript &#x4EE3;&#x7801;:
// entry.js
import AxiosPlugin from &apos;./axios.js&apos;;
Vue.use(AxiosPlugin, &apos;$axios&apos;);
new Vue({
  created() {
    console.log(this.$axios ? &apos;Axios works!&apos; : &apos;Uh oh..&apos;);
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>JavaScript &#x4EE3;&#x7801;:
<span class="hljs-comment">// axios.js</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">install</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue, name = <span class="hljs-string">&apos;$http&apos;</span></span>) </span>{
    <span class="hljs-built_in">Object</span>.defineProperty(Vue.prototype, name, { <span class="hljs-attr">value</span>: axios });
  }
}
JavaScript &#x4EE3;&#x7801;:
<span class="hljs-comment">// entry.js</span>
<span class="hljs-keyword">import</span> AxiosPlugin <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./axios.js&apos;</span>;
Vue.use(AxiosPlugin, <span class="hljs-string">&apos;$axios&apos;</span>);
<span class="hljs-keyword">new</span> Vue({
  created() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$axios ? <span class="hljs-string">&apos;Axios works!&apos;</span> : <span class="hljs-string">&apos;Uh oh..&apos;</span>);
  }
})</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Vue.js 中使用任意 JavaScript 第三方库

## 原文链接
[https://segmentfault.com/a/1190000015848611](https://segmentfault.com/a/1190000015848611)

