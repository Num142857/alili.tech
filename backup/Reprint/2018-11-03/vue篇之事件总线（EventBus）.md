---
title: vue篇之事件总线（EventBus）
hidden: true
categories: [reprint]
slug: 308ed43a
date: 2018-11-03 10:03:44
---

{{< raw >}}
<p>&#x8BB8;&#x591A;&#x73B0;&#x4EE3;JavaScript&#x6846;&#x67B6;&#x548C;&#x5E93;&#x7684;&#x6838;&#x5FC3;&#x6982;&#x5FF5;&#x662F;&#x80FD;&#x591F;&#x5C06;&#x6570;&#x636E;&#x548C;UI&#x5C01;&#x88C5;&#x5728;&#x6A21;&#x5757;&#x5316;&#x3001;&#x53EF;&#x91CD;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#x3002;&#x8FD9;&#x5BF9;&#x4E8E;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x53EF;&#x4EE5;&#x5728;&#x5F00;&#x53D1;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x65F6;&#x907F;&#x514D;&#x4F7F;&#x7528;&#x7F16;&#x5199;&#x5927;&#x91CF;&#x91CD;&#x590D;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x867D;&#x7136;&#x8FD9;&#x6837;&#x505A;&#x975E;&#x5E38;&#x6709;&#x7528;&#xFF0C;&#x4F46;&#x4E5F;&#x6D89;&#x53CA;&#x5230;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x901A;&#x8BAF;&#x3002;&#x5728;Vue&#x4E2D;&#x540C;&#x6837;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x6982;&#x5FF5;&#x5B58;&#x5728;&#x3002;&#x901A;&#x8FC7;&#x524D;&#x9762;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x7684;&#x5B66;&#x4E60;&#xFF0C;Vue&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x901A;&#x8BAF;&#x5E38;&#x5E38;&#x4F1A;&#x6709;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x901A;&#x8BAF;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x5728;Vue&#x4E2D;&#x7EC4;&#x4EF6;&#x901A;&#x8BAF;&#x6709;&#x4E00;&#x5B9A;&#x7684;&#x539F;&#x5219;&#x3002;</p><h2 id="articleHeader0">&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x8BAF;&#x539F;&#x5219;</h2><p>&#x4E3A;&#x4E86;&#x63D0;&#x9AD8;&#x7EC4;&#x4EF6;&#x7684;&#x72EC;&#x7ACB;&#x6027;&#x4E0E;&#x91CD;&#x7528;&#x6027;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x4F1A;&#x901A;&#x8FC7;&#xA0;<code>props</code>&#xA0;&#x5411;&#x4E0B;&#x4F20;&#x6570;&#x636E;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x5F53;&#x5B50;&#x7EC4;&#x4EF6;&#x6709;&#x4E8B;&#x60C5;&#x8981;&#x544A;&#x8BC9;&#x7236;&#x7EC4;&#x4EF6;&#x65F6;&#x4F1A;&#x901A;&#x8FC7;&#xA0;<code>$emit</code>&#xA0;&#x4E8B;&#x4EF6;&#x544A;&#x8BC9;&#x7236;&#x7EC4;&#x4EF6;&#x3002;&#x5982;&#x6B64;&#x786E;&#x4FDD;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x90FD;&#x662F;&#x72EC;&#x7ACB;&#x5728;&#x76F8;&#x5BF9;&#x9694;&#x79BB;&#x7684;&#x73AF;&#x5883;&#x4E2D;&#x8FD0;&#x884C;&#xFF0C;&#x53EF;&#x4EE5;&#x5927;&#x5E45;&#x63D0;&#x9AD8;&#x7EC4;&#x4EF6;&#x7684;&#x7EF4;&#x62A4;&#x6027;&#x3002;</p><p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/13341631-cb2bbed4c7ccb92d.png!web?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/13341631-cb2bbed4c7ccb92d.png!web?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5728;&#x300A;Vue&#x7EC4;&#x4EF6;&#x901A;&#x8BAF;&#x300B;&#x4E00;&#x6587;&#x4E2D;&#x6709;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x8FC7;&#x8FD9;&#x90E8;&#x5206;&#x3002;&#x4F46;&#x8FD9;&#x5957;&#x901A;&#x8BAF;&#x539F;&#x5219;&#x5BF9;&#x4E8E;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x901A;&#x8BAF;&#x5C31;&#x6709;&#x4E00;&#x5B9A;&#x7684;&#x8BDF;&#x75C5;&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x5728;Vue&#x4E2D;&#x6709;&#x5176;&#x4ED6;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5904;&#x7406;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x901A;&#x8BAF;&#xFF0C;&#x6BD4;&#x5982;Vuex&#x8FD9;&#x6837;&#x7684;&#x5E93;&#x3002;&#x4F46;&#x5728;&#x5F88;&#x591A;&#x60C5;&#x51B5;&#x4E4B;&#x4E0B;&#xFF0C;&#x54B1;&#x4EEC;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x4E0D;&#x9700;&#x8981;&#x7C7B;&#x4F3C;Vuex&#x8FD9;&#x6837;&#x7684;&#x5E93;&#x6765;&#x5904;&#x7406;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x901A;&#x8BAF;&#xFF0C;&#x800C;&#x53EF;&#x4EE5;&#x8003;&#x8651;Vue&#x4E2D;&#x7684;&#xA0;<strong>&#x4E8B;&#x4EF6;&#x603B;&#x7EBF;</strong>&#xA0;&#xFF0C;&#x5373;&#xA0;<strong><code>EventBus</code>&#xA0;</strong>&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5C31;&#x662F;&#x6765;&#x4E00;&#x8D77;&#x5B66;&#x4E60;Vue&#x4E2D;&#x7684;&#xA0;<code>EventBus</code>&#xA0;&#x76F8;&#x5173;&#x7684;&#x77E5;&#x8BC6;&#x70B9;&#x3002;</p><h2 id="articleHeader1">EventBus&#x7684;&#x7B80;&#x4ECB;</h2><p><code>EventBus</code>&#xA0;&#x53C8;&#x79F0;&#x4E3A;&#x4E8B;&#x4EF6;&#x603B;&#x7EBF;&#x3002;&#x5728;Vue&#x4E2D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#xA0;<code>EventBus</code>&#xA0;&#x6765;&#x4F5C;&#x4E3A;&#x6C9F;&#x901A;&#x6865;&#x6881;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x5C31;&#x50CF;&#x662F;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x5171;&#x7528;&#x76F8;&#x540C;&#x7684;&#x4E8B;&#x4EF6;&#x4E2D;&#x5FC3;&#xFF0C;&#x53EF;&#x4EE5;&#x5411;&#x8BE5;&#x4E2D;&#x5FC3;&#x6CE8;&#x518C;&#x53D1;&#x9001;&#x4E8B;&#x4EF6;&#x6216;&#x63A5;&#x6536;&#x4E8B;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x7EC4;&#x4EF6;&#x90FD;&#x53EF;&#x4EE5;&#x4E0A;&#x4E0B;&#x5E73;&#x884C;&#x5730;&#x901A;&#x77E5;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F46;&#x4E5F;&#x5C31;&#x662F;&#x592A;&#x65B9;&#x4FBF;&#x6240;&#x4EE5;&#x82E5;&#x4F7F;&#x7528;&#x4E0D;&#x614E;&#xFF0C;&#x5C31;&#x4F1A;&#x9020;&#x6210;&#x96BE;&#x4EE5;&#x7EF4;&#x62A4;&#x7684;&#x707E;&#x96BE;&#xFF0C;&#x56E0;&#x6B64;&#x624D;&#x9700;&#x8981;&#x66F4;&#x5B8C;&#x5584;&#x7684;Vuex&#x4F5C;&#x4E3A;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x4E2D;&#x5FC3;&#xFF0C;&#x5C06;&#x901A;&#x77E5;&#x7684;&#x6982;&#x5FF5;&#x4E0A;&#x5347;&#x5230;&#x5171;&#x4EAB;&#x72B6;&#x6001;&#x5C42;&#x6B21;&#x3002;</p><h2 id="articleHeader2">&#x5982;&#x4F55;&#x4F7F;&#x7528;EventBus</h2><p>&#x5728;Vue&#x7684;&#x9879;&#x76EE;&#x4E2D;&#x600E;&#x4E48;&#x4F7F;&#x7528;&#xA0;<code>EventBus</code>&#xA0;&#x6765;&#x5B9E;&#x73B0;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x901A;&#x8BAF;&#x5462;&#xFF1F;&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E0B;&#x9762;&#x51E0;&#x4E2A;&#x6B65;&#x9AA4;&#x6765;&#x5B8C;&#x6210;&#x3002;</p><h3 id="articleHeader3">&#x521D;&#x59CB;&#x5316;</h3><p>&#x9996;&#x5148;&#x4F60;&#x9700;&#x8981;&#x505A;&#x7684;&#x662F;&#x521B;&#x5EFA;&#x4E8B;&#x4EF6;&#x603B;&#x7EBF;&#x5E76;&#x5C06;&#x5176;&#x5BFC;&#x51FA;&#xFF0C;&#x4EE5;&#x4FBF;&#x5176;&#x5B83;&#x6A21;&#x5757;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6216;&#x8005;&#x76D1;&#x542C;&#x5B83;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x6765;&#x5904;&#x7406;&#x3002;&#x5148;&#x6765;&#x770B;&#x7B2C;&#x4E00;&#x79CD;&#xFF0C;&#x65B0;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#xA0;<code>.js</code>&#xA0;&#x6587;&#x4EF6;&#xFF0C;&#x6BD4;&#x5982;&#xA0;<code>event-bus.js</code>&#xA0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// event-bus.js


import Vue from &apos;vue&apos;
export const EventBus = new Vue()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// event-bus.js</span>


<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> EventBus = <span class="hljs-keyword">new</span> Vue()</code></pre><p>&#x4F60;&#x9700;&#x8981;&#x505A;&#x7684;&#x53EA;&#x662F;&#x5F15;&#x5165; Vue &#x5E76;&#x5BFC;&#x51FA;&#x5B83;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#xFF08;&#x5728;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x79F0;&#x5B83;&#x4E3A;&#xA0;<code>EventBus</code>&#xA0;&#xFF09;&#x3002;&#x5B9E;&#x8D28;&#x4E0A;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x4E0D;&#x5177;&#x5907; DOM &#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B83;&#x5177;&#x6709;&#x7684;&#x4EC5;&#x4EC5;&#x53EA;&#x662F;&#x5B83;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x800C;&#x5DF2;&#xFF0C;&#x56E0;&#x6B64;&#x5B83;&#x975E;&#x5E38;&#x7684;&#x8F7B;&#x4FBF;&#x3002;</p><p>&#x53E6;&#x5916;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#xA0;<code>main.js</code>&#xA0;&#x521D;&#x59CB;&#x5316;&#xA0;<code>EventBus</code>&#xA0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
Vue.prototype.$EventBus = new Vue()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-comment">// main.js</span>
Vue<span class="hljs-selector-class">.prototype</span>.<span class="hljs-variable">$EventBus</span> = new Vue()</code></pre><p>&#x6CE8;&#x610F;&#xFF0C;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x521D;&#x59CB;&#x5316;&#x7684;&#xA0;<code>EventBus</code>&#xA0;&#x662F;&#x4E00;&#x4E2A;&#xA0;<strong>&#x5168;&#x5C40;&#x7684;&#x4E8B;&#x4EF6;&#x603B;&#x7EBF;</strong>&#xA0;&#x3002;&#x7A0D;&#x540E;&#x6211;&#x4EEC;&#x4F1A;&#x82B1;&#x70B9;&#x65F6;&#x95F4;&#x4E13;&#x95E8;&#x804A;&#x4E00;&#x804A;&#x5168;&#x5C40;&#x7684;&#x4E8B;&#x4EF6;&#x603B;&#x7EBF;&#x3002;</p><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x521B;&#x5EFA;&#x4E86;&#xA0;<code>EventBus</code>&#xA0;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x4F60;&#x9700;&#x8981;&#x505A;&#x5230;&#x7684;&#x5C31;&#x662F;&#x5728;&#x4F60;&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#x52A0;&#x8F7D;&#x5B83;&#xFF0C;&#x5E76;&#x4E14;&#x8C03;&#x7528;&#x540C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x5982;&#x4F60;&#x5728;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x4E92;&#x76F8;&#x4F20;&#x9012;&#x6D88;&#x606F;&#x4E00;&#x6837;&#x3002;</p><h3 id="articleHeader4">&#x53D1;&#x9001;&#x4E8B;&#x4EF6;</h3><p>&#x5047;&#x8BBE;&#x4F60;&#x6709;&#x4E24;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#xFF1A;&#xA0;<code>DecreaseCount</code>&#xA0;&#x548C;&#xA0;<code>IncrementCount</code>&#xA0;&#xFF0C;&#x5206;&#x522B;&#x5728;&#x6309;&#x94AE;&#x4E2D;&#x7ED1;&#x5B9A;&#x4E86;&#xA0;<code>decrease()</code>&#x548C;&#xA0;<code>increment()</code>&#xA0;&#x65B9;&#x6CD5;&#x3002;&#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x6570;&#x503C;&#x9012;&#x51CF;&#xFF08;&#x589E;&#xFF09;&#xA0;<code>1</code>&#xA0;&#xFF0C;&#x4EE5;&#x53CA;&#x89D2;&#x5EA6;&#x503C;&#x9012;&#x51CF;&#xFF08;&#x589E;&#xFF09;&#xA0;<code>180</code>&#xA0;&#x3002;&#x5728;&#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;&#xA0;<code>EventBus.$emit(channel: string, callback(payload1,&#x2026;))</code>&#xA0;&#x76D1;&#x542C;&#xA0;<code>decreased</code>&#xA0;&#xFF08;&#x548C;&#xA0;<code>incremented</code>&#xA0;&#xFF09;&#x9891;&#x9053;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- DecreaseCount.vue --&gt;
&lt;template&gt;
    &lt;button @click=&quot;decrease()&quot;&gt;-&lt;/button&gt;
&lt;/template&gt;

&lt;script&gt; import { EventBus } from &quot;../event-bus.js&quot;;
    export default {
        name: &quot;DecreaseCount&quot;,
        data() {
            return {
                num: 1,
                deg:180
            };
        },
        methods: {
            decrease() {
                EventBus.$emit(&quot;decreased&quot;, {
                    num:this.num,
                    deg:this.deg
                });
            }
        }
    }; 
&lt;/script&gt;

&lt;!-- IncrementCount.vue --&gt;
&lt;template&gt;
    &lt;button @click=&quot;increment()&quot;&gt;+&lt;/button&gt;
&lt;/template&gt;

&lt;script&gt; import { EventBus } from &quot;../event-bus.js&quot;;
    export default {
        name: &quot;IncrementCount&quot;,
        data() {
            return {
                num: 1,
                deg:180
            };
        },
        methods: {
            increment() {
                EventBus.$emit(&quot;incremented&quot;, {
                    num:this.num,
                    deg:this.deg
                });
            }
        }
    };
 &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- DecreaseCount.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;decrease()&quot;</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"> <span class="hljs-keyword">import</span> { EventBus } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../event-bus.js&quot;</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;DecreaseCount&quot;</span>,
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">num</span>: <span class="hljs-number">1</span>,
                <span class="hljs-attr">deg</span>:<span class="hljs-number">180</span>
            };
        },
        <span class="hljs-attr">methods</span>: {
            decrease() {
                EventBus.$emit(<span class="hljs-string">&quot;decreased&quot;</span>, {
                    <span class="hljs-attr">num</span>:<span class="hljs-keyword">this</span>.num,
                    <span class="hljs-attr">deg</span>:<span class="hljs-keyword">this</span>.deg
                });
            }
        }
    }; 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- IncrementCount.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;increment()&quot;</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"> <span class="hljs-keyword">import</span> { EventBus } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../event-bus.js&quot;</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;IncrementCount&quot;</span>,
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">num</span>: <span class="hljs-number">1</span>,
                <span class="hljs-attr">deg</span>:<span class="hljs-number">180</span>
            };
        },
        <span class="hljs-attr">methods</span>: {
            increment() {
                EventBus.$emit(<span class="hljs-string">&quot;incremented&quot;</span>, {
                    <span class="hljs-attr">num</span>:<span class="hljs-keyword">this</span>.num,
                    <span class="hljs-attr">deg</span>:<span class="hljs-keyword">this</span>.deg
                });
            }
        }
    };
 </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x5728;&#xA0;<code>DecreaseCount</code>&#xA0;&#x548C;&#xA0;<code>IncrementCount</code>&#xA0;&#x5206;&#x522B;&#x53D1;&#x9001;&#x51FA;&#x4E86;&#xA0;<code>decreased</code>&#xA0;&#x548C;&#xA0;<code>incremented</code>&#x9891;&#x9053;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x53E6;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E2D;&#x63A5;&#x6536;&#x8FD9;&#x4E24;&#x4E2A;&#x4E8B;&#x4EF6;&#xFF0C;&#x4FDD;&#x6301;&#x6570;&#x636E;&#x5728;&#x5404;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x8BAF;&#x3002;</p><h3 id="articleHeader5">&#x63A5;&#x6536;&#x4E8B;&#x4EF6;</h3><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x7EC4;&#x4EF6;&#xA0;<code>App.vue</code>&#xA0;&#x4E2D;&#x4F7F;&#x7528;&#xA0;<code>EventBus.$on(channel: string, callback(payload1,&#x2026;))</code>&#x76D1;&#x542C;&#xA0;<code>DecreaseCount</code>&#xA0;&#x548C;&#xA0;<code>IncrementCount</code>&#xA0;&#x5206;&#x522B;&#x53D1;&#x9001;&#x51FA;&#x4E86;&#xA0;<code>decreased</code>&#xA0;&#x548C;&#xA0;<code>incremented</code>&#xA0;&#x9891;&#x9053;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- App.vue --&gt;
&lt;template&gt;
    &lt;div id=&quot;app&quot;&gt;
        &lt;div class=&quot;container&quot; :style=&quot;{transform: &apos;rotateY(&apos; + degValue + &apos;deg)&apos;}&quot;&gt;
            &lt;div class=&quot;front&quot;&gt;
                &lt;div class=&quot;increment&quot;&gt;
                    &lt;IncrementCount /&gt;
                &lt;/div&gt;
                &lt;div class=&quot;show-front&quot;&gt; {{fontCount}} &lt;/div&gt;
                &lt;div class=&quot;decrement&quot;&gt;
                    &lt;DecreaseCount /&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;div class=&quot;back&quot;&gt;
                &lt;div class=&quot;increment&quot;&gt;
                    &lt;IncrementCount /&gt;
                &lt;/div&gt;
                &lt;div class=&quot;show-back&quot;&gt; {{backCount}} &lt;/div&gt;
                &lt;div class=&quot;decrement&quot;&gt;
                    &lt;DecreaseCount /&gt;
                &lt;/div&gt;
            &lt;/div&gt; 
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
    import IncrementCount from &quot;./components/IncrementCount&quot;;
    import DecreaseCount from &quot;./components/DecreaseCount&quot;;
    import { EventBus } from &quot;./event-bus.js&quot;;
    export default {
        name: &quot;App&quot;,
        components: {
            IncrementCount,
            DecreaseCount
        },
        data() {
            return {
                degValue:0,
                fontCount:0,
                backCount:0
            };
        },
        mounted() {
            EventBus.$on(&quot;incremented&quot;, ({num,deg}) =&gt; {
                this.fontCount += num
                this.$nextTick(()=&gt;{
                    this.backCount += num
                    this.degValue += deg;
                })
            });
            EventBus.$on(&quot;decreased&quot;, ({num,deg}) =&gt; {
                this.fontCount -= num
                this.$nextTick(()=&gt;{
                    this.backCount -= num
                    this.degValue -= deg;
                })
            });
        }
    }; 
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- App.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;{transform: &apos;rotateY(&apos; + degValue + &apos;deg)&apos;}&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;front&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;increment&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">IncrementCount</span> /&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;show-front&quot;</span>&gt;</span> </span><span class="hljs-template-variable">"{{"fontCount"}}"</span><span class="xml"> <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;decrement&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">DecreaseCount</span> /&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;back&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;increment&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">IncrementCount</span> /&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;show-back&quot;</span>&gt;</span> </span><span class="hljs-template-variable">"{{"backCount"}}"</span><span class="xml"> <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;decrement&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">DecreaseCount</span> /&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> IncrementCount <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/IncrementCount&quot;</span>;
    <span class="hljs-keyword">import</span> DecreaseCount <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./components/DecreaseCount&quot;</span>;
    <span class="hljs-keyword">import</span> { EventBus } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./event-bus.js&quot;</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;App&quot;</span>,
        <span class="hljs-attr">components</span>: {
            IncrementCount,
            DecreaseCount
        },
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">degValue</span>:<span class="hljs-number">0</span>,
                <span class="hljs-attr">fontCount</span>:<span class="hljs-number">0</span>,
                <span class="hljs-attr">backCount</span>:<span class="hljs-number">0</span>
            };
        },
        mounted() {
            EventBus.$on(<span class="hljs-string">&quot;incremented&quot;</span>, ({num,deg}) =&gt; {
                <span class="hljs-keyword">this</span>.fontCount += num
                <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                    <span class="hljs-keyword">this</span>.backCount += num
                    <span class="hljs-keyword">this</span>.degValue += deg;
                })
            });
            EventBus.$on(<span class="hljs-string">&quot;decreased&quot;</span>, ({num,deg}) =&gt; {
                <span class="hljs-keyword">this</span>.fontCount -= num
                <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                    <span class="hljs-keyword">this</span>.backCount -= num
                    <span class="hljs-keyword">this</span>.degValue -= deg;
                })
            });
        }
    }; 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x6700;&#x7EC8;&#x5F97;&#x5230;&#x7684;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p>&#x6700;&#x540E;&#x7528;&#x4E00;&#x5F20;&#x56FE;&#x6765;&#x63CF;&#x8FF0;&#x793A;&#x4F8B;&#x4E2D;&#x7528;&#x5230;&#x7684;&#xA0;<code>EventBus</code>&#xA0;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#xFF1A;</p><p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/13341631-f03169d19423387e.png!web?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/13341631-f03169d19423387e.png!web?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5982;&#x679C;&#x4F60;&#x53EA;&#x60F3;&#x76D1;&#x542C;&#x4E00;&#x6B21;&#x4E8B;&#x4EF6;&#x7684;&#x53D1;&#x751F;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#xA0;<code>EventBus.$once(channel: string, callback(payload1,&#x2026;))</code>&#xA0;&#x3002;</p><h3 id="articleHeader6">&#x79FB;&#x9664;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x8005;</h3><p>&#x5982;&#x679C;&#x60F3;&#x79FB;&#x9664;&#x4E8B;&#x4EF6;&#x7684;&#x76D1;&#x542C;&#xFF0C;&#x53EF;&#x4EE5;&#x50CF;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x64CD;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { eventBus } from &apos;./event-bus.js&apos;
EventBus.$off(&apos;decreased&apos;, {})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-keyword">import</span> { eventBus } from <span class="hljs-string">&apos;./event-bus.js&apos;</span>
EventBus.$off(<span class="hljs-string">&apos;decreased&apos;</span>, {})</code></pre><p>&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#xA0;<code>EventBus.$off(&#x2018;decreased&#x2019;)</code>&#xA0;&#x6765;&#x79FB;&#x9664;&#x5E94;&#x7528;&#x5185;&#x6240;&#x6709;&#x5BF9;&#x6B64;&#x4E8B;&#x4EF6;&#x7684;&#x76D1;&#x542C;&#x3002;&#x6216;&#x8005;&#x76F4;&#x63A5;&#x8C03;&#x7528;<code>EventBus.$off()</code>&#xA0;&#x6765;&#x79FB;&#x9664;&#x6240;&#x6709;&#x4E8B;&#x4EF6;&#x9891;&#x9053;&#xFF0C;&#xA0;<strong>&#x6CE8;&#x610F;&#x4E0D;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x4EFB;&#x4F55;&#x53C2;&#x6570;</strong>&#xA0;&#x3002;</p><p>&#x4E0A;&#x9762;&#x5C31;&#x662F;&#xA0;<code>EventBus</code>&#xA0;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x7B80;&#x5355;&#x3002;&#x4E0A;&#x9762;&#x7684;&#x793A;&#x4F8B;&#x4E2D;&#x6211;&#x4EEC;&#x4E5F;&#x770B;&#x5230;&#x4E86;&#xFF0C;&#x6BCF;&#x6B21;&#x4F7F;&#x7528;&#xA0;<code>EventBus</code>&#xA0;&#x65F6;&#x90FD;&#x9700;&#x8981;&#x5728;&#x5404;&#x7EC4;&#x4EF6;&#x4E2D;&#x5F15;&#x5165;&#xA0;<code>event-bus.js</code>&#xA0;&#x3002;&#x4E8B;&#x5B9E;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x522B;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x8BA9;&#x4E8B;&#x60C5;&#x53D8;&#x5F97;&#x7B80;&#x5355;&#x4E00;&#x4E9B;&#x3002;&#x90A3;&#x5C31;&#x662F;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x7684;&#xA0;<code>EventBus</code>&#xA0;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x793A;&#x4F8B;&#x5411;&#x5927;&#x5BB6;&#x6F14;&#x793A;&#x5982;&#x4F55;&#x5728;Vue&#x9879;&#x76EE;&#x4E2D;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x7684;&#xA0;<code>EventBus</code>&#xA0;&#x3002;</p><h2 id="articleHeader7">&#x5168;&#x5C40;EventBus</h2><p>&#x5168;&#x5C40;EventBus&#xFF0C;&#x867D;&#x7136;&#x5728;&#x67D0;&#x4E9B;&#x793A;&#x4F8B;&#x4E2D;&#x4E0D;&#x63D0;&#x5021;&#x4F7F;&#x7528;&#xFF0C;&#x4F46;&#x5B83;&#x662F;&#x4E00;&#x79CD;&#x975E;&#x5E38;&#x6F02;&#x4EAE;&#x4E14;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x8DE8;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x5171;&#x4EAB;&#x6570;&#x636E;&#x3002;</p><p>&#x5B83;&#x7684;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#x662F;&#x53D1;&#x5E03;/&#x8BA2;&#x9605;&#x65B9;&#x6CD5;&#xFF0C;&#x901A;&#x5E38;&#x79F0;&#x4E3A;&#xA0;<code>Pub/Sub</code>&#xA0;&#x3002;</p><p>&#x8FD9;&#x6574;&#x4E2A;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x662F;&#x4E00;&#x79CD;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#xFF0C;&#x56E0;&#x4E3A;&#x5982;&#x679C;&#x4F60;&#x67E5;&#x770B;&#x5B83;&#x5468;&#x56F4;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x5B83;&#x66F4;&#x50CF;&#x662F;&#x4E00;&#x79CD;&#x4F53;&#x7CFB;&#x7ED3;&#x6784;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002;&#x6211;&#x4EEC;&#x5C06;&#x4F7F;&#x7528;&#x666E;&#x901A;&#x7684;JavaScript&#xFF0C;&#x5E76;&#x521B;&#x5EFA;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x5E76;&#x6F14;&#x793A;EventBus&#x7684;&#x5DE5;&#x4F5C;&#x65B9;&#x5F0F;&#x3002;</p><p>&#x8BA9;&#x6211;&#x4EEC;&#x770B;&#x770B;&#x4E0B;&#x56FE;&#xFF0C;&#x5E76;&#x8BD5;&#x7740;&#x4E86;&#x89E3;&#x5728;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x7A76;&#x7ADF;&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#x3002;</p><p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/13341631-40d2629faddb7b76.png!web?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/13341631-40d2629faddb7b76.png!web?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x6211;&#x4EEC;&#x4ECE;&#x4E0A;&#x56FE;&#x4E2D;&#x53EF;&#x4EE5;&#x5F97;&#x51FA;&#x4EE5;&#x4E0B;&#x51E0;&#x70B9;&#xFF1A;</p><ul><li>&#x6709;&#x4E00;&#x4E2A;&#x5168;&#x5C40;EventBus</li><li>&#x6240;&#x6709;&#x4E8B;&#x4EF6;&#x90FD;&#x8BA2;&#x9605;&#x5B83;</li><li>&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x4E5F;&#x53D1;&#x5E03;&#x5230;&#x5B83;&#xFF0C;&#x8BA2;&#x9605;&#x7EC4;&#x4EF6;&#x83B7;&#x5F97;&#x66F4;&#x65B0;</li><li>&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#x3002;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x90FD;&#x80FD;&#x591F;&#x5C06;&#x4E8B;&#x4EF6;&#x53D1;&#x5E03;&#x5230;&#x603B;&#x7EBF;&#xFF0C;&#x7136;&#x540E;&#x603B;&#x7EBF;&#x7531;&#x53E6;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x8BA2;&#x9605;&#xFF0C;&#x7136;&#x540E;&#x8BA2;&#x9605;&#x5B83;&#x7684;&#x7EC4;&#x4EF6;&#x5C06;&#x5F97;&#x5230;&#x66F4;&#x65B0;</li></ul><p>&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x4FDD;&#x6301;&#x5B83;&#x975E;&#x5E38;&#x5C0F;&#x5DE7;&#x548C;&#x7B80;&#x6D01;&#x3002;&#x6211;&#x4EEC;&#x5C06;&#x5B83;&#x5206;&#x4E3A;&#x4E24;&#x90E8;&#x5206;&#xFF0C;&#x5C06;&#x5C55;&#x793A;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x4EE5;&#x53CA;&#x751F;&#x6210;&#x4E8B;&#x4EF6;&#x603B;&#x7EBF;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><h3 id="articleHeader8">&#x521B;&#x5EFA;&#x5168;&#x5C40;EventBus</h3><p>&#x5168;&#x5C40;&#x4E8B;&#x4EF6;&#x603B;&#x7EBF;&#x53EA;&#x4E0D;&#x8FC7;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#xA0;<code>vue</code>&#xA0;&#x7EC4;&#x4EF6;&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus
        }
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> EventBus = <span class="hljs-keyword">new</span> Vue();

Object.defineProperties(Vue.prototype, {
    $bus: {
        <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> EventBus
        }
    }
})</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x8FD9;&#x4E2A;&#x7279;&#x5B9A;&#x7684;&#x603B;&#x7EBF;&#x4F7F;&#x7528;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#xA0;<code>$on</code>&#xA0;&#x548C;&#xA0;<code>$emit</code>&#xA0;&#x3002;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x521B;&#x5EFA;&#x53D1;&#x51FA;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x5B83;&#x5C31;&#x662F;<code>$emit</code>&#xA0;&#xFF1B;&#x53E6;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x8BA2;&#x9605;&#xA0;<code>$on</code>&#xA0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var EventBus = new Vue();

this.$bus.$emit(&apos;nameOfEvent&apos;,{ ... pass some event data ...});

this.$bus.$on(&apos;nameOfEvent&apos;,($event) =&gt; {
    // ...
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> EventBus = <span class="hljs-literal">new</span> Vue();

this.$bus.$emit(<span class="hljs-string">&apos;nameOfEvent&apos;</span>,{ <span class="hljs-params">...</span> pass some event <span class="hljs-built_in">data</span> <span class="hljs-params">...</span>});

this.$bus.$on(<span class="hljs-string">&apos;nameOfEvent&apos;</span>,($event) =&gt; {
    <span class="hljs-comment">// ...</span>
})</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E24;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x4EE5;&#x4FBF;&#x6700;&#x7EC8;&#x5F97;&#x51FA;&#x7ED3;&#x8BBA;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x8FD9;&#x4E2A;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#xA0;<code>ShowMessage</code>&#xA0;&#x7684;&#x7EC4;&#x4EF6;&#x7528;&#x6765;&#x663E;&#x793A;&#x4FE1;&#x606F;&#xFF0C;&#x53E6;&#x5916;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#xA0;<code>UpdateMessage</code>&#xA0;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x7528;&#x6765;&#x66F4;&#x65B0;&#x4FE1;&#x606F;&#x3002;</p><p>&#x5728;&#xA0;<code>UpdateMessage</code>&#xA0;&#x7EC4;&#x4EF6;&#x4E2D;&#x89E6;&#x53D1;&#x9700;&#x8981;&#x7684;&#x4E8B;&#x4EF6;&#x3002;&#x5728;&#x8FD9;&#x4E2A;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;&#x5C06;&#x89E6;&#x53D1;&#x4E00;&#x4E2A;&#xA0;<code>updateMessage</code>&#xA0;&#x4E8B;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x53D1;&#x9001;&#x4E86;&#xA0;<code>updateMessage</code>&#xA0;&#x7684;&#x9891;&#x9053;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- UpdateMessage.vue --&gt;
&lt;template&gt;
    &lt;div class=&quot;form&quot;&gt;
        &lt;div class=&quot;form-control&quot;&gt;
            &lt;input v-model=&quot;message&quot; &gt;
            &lt;button @click=&quot;updateMessage()&quot;&gt;&#x66F4;&#x65B0;&#x6D88;&#x606F;&lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
        name: &quot;UpdateMessage&quot;,
        data() {
            return {
                message: &quot;&#x8FD9;&#x662F;&#x4E00;&#x6761;&#x6D88;&#x606F;&quot;
            };
        },
        methods: {
            updateMessage() {
                this.$bus.$emit(&quot;updateMessage&quot;, this.message);
            }
        },
        beforeDestroy () {
            $this.$bus.$off(&apos;updateMessage&apos;)
        }
    };
 &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- UpdateMessage.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;form&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;form-control&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;message&quot;</span> &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;updateMessage()&quot;</span>&gt;</span>&#x66F4;&#x65B0;&#x6D88;&#x606F;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;UpdateMessage&quot;</span>,
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;&#x8FD9;&#x662F;&#x4E00;&#x6761;&#x6D88;&#x606F;&quot;</span>
            };
        },
        <span class="hljs-attr">methods</span>: {
            updateMessage() {
                <span class="hljs-keyword">this</span>.$bus.$emit(<span class="hljs-string">&quot;updateMessage&quot;</span>, <span class="hljs-keyword">this</span>.message);
            }
        },
        beforeDestroy () {
            $<span class="hljs-keyword">this</span>.$bus.$off(<span class="hljs-string">&apos;updateMessage&apos;</span>)
        }
    };
 </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x540C;&#x65F6;&#x5728;&#xA0;<code>ShowMessage</code>&#xA0;&#x7EC4;&#x4EF6;&#x4E2D;&#x76D1;&#x542C;&#x8BE5;&#x4E8B;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- ShowMessage.vue --&gt;
&lt;template&gt;
    &lt;div class=&quot;message&quot;&gt;
        &lt;h1&gt;{{ message }}&lt;/h1&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt; 
export default {
        name: &quot;ShowMessage&quot;,
        data() {
            return {
                message: &quot;&#x6211;&#x662F;&#x4E00;&#x6761;&#x6D88;&#x606F;&quot;
            };
        },
        created() {
            var self = this
            this.$bus.$on(&apos;updateMessage&apos;, function(value) {
                self.updateMessage(value);
            })
        },
        methods: {
            updateMessage(value) {
                this.message = value
            }
        }
    }; 
&lt;/script&gt;&lt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- ShowMessage.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;message&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{" message "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"> 
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;ShowMessage&quot;</span>,
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;&#x6211;&#x662F;&#x4E00;&#x6761;&#x6D88;&#x606F;&quot;</span>
            };
        },
        created() {
            <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>
            <span class="hljs-keyword">this</span>.$bus.$on(<span class="hljs-string">&apos;updateMessage&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
                self.updateMessage(value);
            })
        },
        <span class="hljs-attr">methods</span>: {
            updateMessage(value) {
                <span class="hljs-keyword">this</span>.message = value
            }
        }
    }; 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><span class="hljs-tag">&lt;</span></span></code></pre><p>&#x6700;&#x7EC8;&#x7684;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p>&#x4ECE;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xA0;<code>ShowMessage</code>&#xA0;&#x7EC4;&#x4EF6;&#x4FA6;&#x542C;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;&#xA0;<code>updateMessage</code>&#xA0;&#x7684;&#x7279;&#x5B9A;&#x4E8B;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x5728;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x5316;&#x65F6;&#x88AB;&#x89E6;&#x53D1;&#xFF0C;&#x6216;&#x8005;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x65F6;&#x89E6;&#x53D1;&#x3002;&#x53E6;&#x4E00;&#x65B9;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x53E6;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;<code>UpdateMessage</code>&#xA0;&#xFF0C;&#x5B83;&#x6709;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;&#x5F53;&#x6709;&#x4EBA;&#x70B9;&#x51FB;&#x5B83;&#x65F6;&#x4F1A;&#x53D1;&#x51FA;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x3002;&#x8FD9;&#x5BFC;&#x81F4;&#x8BA2;&#x9605;&#x7EC4;&#x4EF6;&#x4FA6;&#x542C;&#x53D1;&#x51FA;&#x7684;&#x4E8B;&#x4EF6;&#x3002;&#x8FD9;&#x4EA7;&#x751F;&#x4E86;&#xA0;<code>Pub/Sub</code>&#xA0;&#x6A21;&#x578B;&#xFF0C;&#x8BE5;&#x6A21;&#x578B;&#x5728;&#x5144;&#x5F1F;&#x59D0;&#x59B9;&#x4E4B;&#x95F4;&#x6301;&#x7EED;&#x5B58;&#x5728;&#x5E76;&#x4E14;&#x975E;&#x5E38;&#x5BB9;&#x6613;&#x5B9E;&#x73B0;&#x3002;</p><h2 id="articleHeader9">&#x603B;&#x7ED3;</h2><p>&#x672C;&#x6587;&#x4E3B;&#x8981;&#x901A;&#x8FC7;&#x4E24;&#x4E2A;&#x5B9E;&#x4F8B;&#x5B66;&#x4E60;&#x4E86;Vue&#x4E2D;&#x6709;&#x5173;&#x4E8E;&#xA0;<code>EventBus</code>&#xA0;&#x76F8;&#x5173;&#x7684;&#x77E5;&#x8BC6;&#x70B9;&#x3002;&#x4E3B;&#x8981;&#x6D89;&#x53CA;&#x4E86;&#xA0;<code>EventBus</code>&#xA0;&#x5982;&#x4F55;&#x5B9E;&#x4F8B;&#x5316;&#xFF0C;&#x53C8;&#x662F;&#x600E;&#x4E48;&#x901A;&#x8FC7;&#xA0;<code>$emit</code>&#xA0;&#x53D1;&#x9001;&#x9891;&#x9053;&#x4FE1;&#x53F7;&#xFF0C;&#x53C8;&#x662F;&#x5982;&#x4F55;&#x901A;&#x8FC7;&#xA0;<code>$on</code>&#xA0;&#x6765;&#x63A5;&#x6536;&#x9891;&#x9053;&#x4FE1;&#x53F7;&#x3002;&#x6700;&#x540E;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;&#x4E86;&#x600E;&#x4E48;&#x521B;&#x5EFA;&#x5168;&#x5C40;&#x7684;&#xA0;<code>EventBus</code>&#xA0;&#x3002;&#x4ECE;&#x5B9E;&#x4F8B;&#x4E2D;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E86;&#x89E3;&#x5230;&#xFF0C;&#xA0;<code>EventBus</code>&#xA0;&#x53EF;&#x4EE5;&#x8F83;&#x597D;&#x7684;&#x5B9E;&#x73B0;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x901A;&#x8BAF;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue篇之事件总线（EventBus）

## 原文链接
[https://segmentfault.com/a/1190000016638913](https://segmentfault.com/a/1190000016638913)

