---
title: vue组件从开发到发布
hidden: true
categories: [reprint]
slug: 5c197dc4
date: 2018-11-04 02:30:10
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000016693219?w=568&amp;h=500" src="https://static.alili.tech/img/remote/1460000016693219?w=568&amp;h=500" alt="" title="" style="cursor:pointer;display:inline"></span><br>&#x7EC4;&#x4EF6;&#x5316;&#x662F;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x975E;&#x5E38;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x4ECE;&#x4E1A;&#x52A1;&#x4E2D;&#x89E3;&#x8026;&#x51FA;&#x6765;&#xFF0C;&#x53EF;&#x4EE5;&#x63D0;&#x9AD8;&#x9879;&#x76EE;&#x7684;&#x4EE3;&#x7801;&#x590D;&#x7528;&#x7387;&#x3002;&#x66F4;&#x91CD;&#x8981;&#x7684;&#x662F;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x6253;&#x5305;&#x53D1;&#x5E03;&#xFF0C;&#x4FD7;&#x8BDD;&#x8BF4;&#x96C6;&#x4F53;&#x7684;&#x529B;&#x91CF;&#x662F;&#x4F1F;&#x5927;&#x7684;&#xFF0C;&#x6B63;&#x56E0;&#x4E3A;&#x6709;&#x8BB8;&#x8BB8;&#x591A;&#x591A;&#x7684;&#x5F00;&#x6E90;&#x8D21;&#x732E;&#x8005;&#xFF0C;&#x624D;&#x6709;&#x4E86;&#x73B0;&#x5728;&#x7684;&#x4E16;&#x754C;&#x3002;</p><p><strong>&#x4E0D;&#x60F3;&#x9020;&#x8F6E;&#x5B50;&#x7684;&#x5DE5;&#x7A0B;&#x5E08;&#xFF0C;&#x5F53;&#x4E0D;&#x4E86;&#x5408;&#x683C;&#x7684;&#x642C;&#x8FD0;&#x5DE5;</strong> &#x3002;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;vue&#x7EC4;&#x4EF6;&#x4ECE;&#x5F00;&#x53D1;&#x5230;&#x6253;&#x5305;&#x53D1;&#x5E03;&#x6D41;&#x7A0B;&#xFF0C;&#x5E76;&#x914D;&#x7F6E;Github&#x4E3B;&#x9875;&#x3002;</p><blockquote>&#x672C;&#x6587;&#x4EE5; vue-clock2 &#x7EC4;&#x4EF6;&#x4E3A;&#x4F8B;&#xFF0C;&#x6B22;&#x8FCE;star^_^~~ <a href="https://github.com/bestvist/vue-clock2" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x5730;&#x5740;</a></blockquote><ul><li>&#x76EE;&#x6807;&#x6846;&#x67B6;&#xFF1A;vue</li><li>&#x6253;&#x5305;&#x5DE5;&#x5177;&#xFF1A;webpack</li><li>&#x53D1;&#x5E03;&#x6E90;&#xFF1A;npm</li><li>&#x4EE3;&#x7801;&#x6258;&#x7BA1;&#xFF1A;github</li></ul><h1 id="articleHeader0">&#x9879;&#x76EE;&#x7ED3;&#x6784;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-- node_modules
|-- src
| |-- index.js
| |-- vue-clock.vue
|-- docs
| |-- index.html
| |-- index.css
|-- dist" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gherkin"><code>|<span class="hljs-string">-- node_modules
</span>|<span class="hljs-string">-- src
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">-- index.js
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">-- vue-clock.vue
</span>|<span class="hljs-string">-- docs
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">-- index.html
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">-- index.css
</span>|<span class="hljs-string">-- dist</span></code></pre><ul><li>src: &#x7EC4;&#x4EF6;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x3002;</li><li>node_modules: &#x7EC4;&#x4EF6;&#x4F9D;&#x8D56;&#x5305;&#x3002;</li><li>docs: &#x8BF4;&#x660E;&#x6587;&#x6863;&#xFF0C;&#x7EC4;&#x4EF6;&#x7B80;&#x5355;&#x7684;&#x53EF;&#x4EE5;&#x5355;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<a href="https://www.vuepress.cn/" rel="nofollow noreferrer" target="_blank">vuepress</a>&#x3002;</li><li>dist: &#x6253;&#x5305;&#x540E;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&#xFF0C;&#x4E00;&#x822C; package.json &#x7684; main &#x5165;&#x53E3;&#x6307;&#x5411;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x91CC;&#x7684;&#x6587;&#x4EF6;&#x3002;</li></ul><h1 id="articleHeader1">&#x7EC4;&#x4EF6;&#x5F00;&#x53D1;</h1><p>vue&#x7EC4;&#x4EF6;&#x5F00;&#x53D1;&#x76F8;&#x5BF9;&#x6765;&#x8BB2;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x5BB9;&#x6613;&#x7684;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; <code>vue-clock.vue</code> &#x6587;&#x4EF6;&#xFF0C;&#x7EC4;&#x4EF6;&#x7684;&#x76F8;&#x5173;&#x903B;&#x8F91;&#x5B9E;&#x73B0;&#x3002;</p><p>&#x8BE5;&#x7EC4;&#x4EF6;&#x4E3B;&#x8981;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E; <code>time</code> &#x5C5E;&#x6027;&#x8F93;&#x5165;&#xFF0C;&#x663E;&#x793A;&#x5BF9;&#x5E94;&#x65F6;&#x95F4;&#x7684;&#x949F;&#x8868;&#x6837;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div class=&quot;clock&quot;&gt;
        &lt;div class=&quot;clock-circle&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;clock-hour&quot; :style=&quot;{transform:hourRotate}&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;clock-minute&quot; :style=&quot;{transform:minuteRotate}&quot;&gt;&lt;/div&gt;
        &lt;b class=&quot;hour&quot; v-for=&quot;h in timeList&quot; :key=&quot;h&quot;&gt;
            &lt;span&gt;{{h}}&lt;/span&gt;
        &lt;/b&gt;
    &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clock&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clock-circle&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clock-hour&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{transform:hourRotate}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clock-minute&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{transform:minuteRotate}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">b</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;hour&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;h in timeList&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;h&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"h}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><p>&#x901A;&#x8FC7;&#x5143;&#x7D20;&#x753B;&#x51FA;&#x949F;&#x8868;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x57FA;&#x4E8E; <code>css3&#x7684;transform</code> &#x5C5E;&#x6027;&#x65CB;&#x8F6C;&#x51FA;&#x6BCF;&#x4E2A;&#x65F6;&#x95F4;&#x70B9;&#x3002;<br>&#x56E0;&#x4E3A;&#x949F;&#x8868;&#x7684;&#x65F6;&#x9488;&#x5E76;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x8DF3;&#x5230;&#x4E0B;&#x4E00;&#x4E2A;&#x70B9;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x8BA1;&#x7B97;&#x51FA;&#x4E0D;&#x540C;&#x5206;&#x949F;&#x65F6;&#xFF0C;&#x65F6;&#x949F;&#x6307;&#x9488;&#x7684;&#x65CB;&#x8F6C;&#x89D2;&#x5EA6;&#x3002;<br>&#x540E;&#x7EED;&#x589E;&#x52A0;&#x4E86;&#x4E0D;&#x6307;&#x5B9A;&#x65F6;&#x95F4;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x663E;&#x793A;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x5E76;&#x6BCF;&#x5206;&#x949F;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    data() {
        return {
            timeList: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            hourRotate: &quot;rotatez(0deg)&quot;,
            minuteRotate: &quot;rotatez(0deg)&quot;
        };
    },
    props: [&quot;time&quot;],
    watch: {
        time() {
            this.show();
        }
    },
    methods: {
        show() {
            this.showTime();
            if (this._timer) clearInterval(this._timer);
            if (!this.time) {
                this._timer = setInterval(() =&gt; {
                    this.showTime();
                }, 60 * 1000);
            }
        },
        showTime() {
            let times;
            if (this.time) {
                times = this.time.split(&quot;:&quot;);
            } else {
                const now = new Date();
                times = [now.getHours(), now.getMinutes()];
            }

            let hour = +times[0];
            hour = hour &gt; 11 ? hour - 12 : hour;
            let minute = +times[1];
            let hourAngle = hour * 30 + minute * 6 / 360 * 30;
            let minuteAngle = minute * 6;
            this.hourRotate = `rotatez(${hourAngle}deg)`;
            this.minuteRotate = `rotatez(${minuteAngle}deg)`;
        }
    },
    mounted() {
        this.show();
    },
    destroyed() {
        if (this._timer) clearInterval(this._timer);
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>export <span class="hljs-keyword">default</span> {
    <span class="hljs-keyword">data</span>() {
        <span class="hljs-keyword">return</span> {
            timeList: [<span class="hljs-number">12</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">11</span>],
            hourRotate: <span class="hljs-string">&quot;rotatez(0deg)&quot;</span>,
            minuteRotate: <span class="hljs-string">&quot;rotatez(0deg)&quot;</span>
        };
    },
    props: [<span class="hljs-string">&quot;time&quot;</span>],
    watch: {
        time() {
            <span class="hljs-keyword">this</span>.show();
        }
    },
    methods: {
        show() {
            <span class="hljs-keyword">this</span>.showTime();
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._timer) clearInterval(<span class="hljs-keyword">this</span>._timer);
            <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.time) {
                <span class="hljs-keyword">this</span>._timer = setInterval(() =&gt; {
                    <span class="hljs-keyword">this</span>.showTime();
                }, <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>);
            }
        },
        showTime() {
            let times;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.time) {
                times = <span class="hljs-keyword">this</span>.time.split(<span class="hljs-string">&quot;:&quot;</span>);
            } <span class="hljs-keyword">else</span> {
                const now = new Date();
                times = [now.getHours(), now.getMinutes()];
            }

            let hour = +times[<span class="hljs-number">0</span>];
            hour = hour &gt; <span class="hljs-number">11</span> ? hour - <span class="hljs-number">12</span> : hour;
            let minute = +times[<span class="hljs-number">1</span>];
            let hourAngle = hour * <span class="hljs-number">30</span> + minute * <span class="hljs-number">6</span> / <span class="hljs-number">360</span> * <span class="hljs-number">30</span>;
            let minuteAngle = minute * <span class="hljs-number">6</span>;
            <span class="hljs-keyword">this</span>.hourRotate = `rotatez(${hourAngle}deg)`;
            <span class="hljs-keyword">this</span>.minuteRotate = `rotatez(${minuteAngle}deg)`;
        }
    },
    mounted() {
        <span class="hljs-keyword">this</span>.show();
    },
    destroyed() {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._timer) clearInterval(<span class="hljs-keyword">this</span>._timer);
    }
};</code></pre><p>&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x949F;&#x8868;&#x7684;&#x5E03;&#x5C40;&#x6837;&#x5F0F;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5728;&#x9879;&#x76EE;&#x91CC;&#x67E5;&#x770B;&#x3002;<a href="https://github.com/bestvist/vue-clock2/blob/master/src/vue-clock.vue" rel="nofollow noreferrer" target="_blank">vue-clock.vue</a></p><p>&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x629B;&#x51FA;&#x7EC4;&#x4EF6;&#xFF0C;&#x4EE5;&#x4FBF;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x5F15;&#x5165;&#x4F7F;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // src/index.js
    import Clock from &apos;./vue-clock.vue&apos;;
    export default Clock;
    if (typeof window !== &apos;undefined&apos; &amp;&amp; window.Vue) {
        window.Vue.component(&apos;clock&apos;, Clock);
    }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-comment">// src/index.js</span>
    <span class="hljs-keyword">import</span> Clock <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./vue-clock.vue&apos;</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Clock;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">&apos;undefined&apos;</span> &amp;&amp; <span class="hljs-built_in">window</span>.Vue) {
        <span class="hljs-built_in">window</span>.Vue.component(<span class="hljs-string">&apos;clock&apos;</span>, Clock);
    }
</code></pre><p>&#x8FD9;&#x91CC;&#xFF0C;&#x7EC4;&#x4EF6;&#x5F00;&#x53D1;&#x7684;&#x90E8;&#x5206;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x559D;&#x676F;&#x5496;&#x5561;&#xFF0C;check&#x4E00;&#x4E0B;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x628A;&#x5B83;&#x6253;&#x5305;&#x53D1;&#x5E03;&#x5230;npm&#x4E0A;&#x3002;</p><h1 id="articleHeader2">&#x6253;&#x5305;&#x53D1;&#x5E03;</h1><p>&#x6253;&#x5305;&#x524D;&#x786E;&#x8BA4;&#x4E00;&#x4E0B; <code>webpack</code> &#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x8F93;&#x51FA;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  output: {
    path: path.resolve(__dirname, &apos;./dist&apos;),
    publicPath: &apos;/dist/&apos;,
    filename: &apos;vue-clock.min.js&apos;,
    library: &apos;Clock&apos;,
    libraryTarget: &apos;umd&apos;,
    umdNamedDefine: true
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>  <span class="hljs-selector-tag">output</span>: {
    <span class="hljs-attribute">path</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">&apos;./dist&apos;</span>),
    publicPath: <span class="hljs-string">&apos;/dist/&apos;</span>,
    filename: <span class="hljs-string">&apos;vue-clock.min.js&apos;</span>,
    library: <span class="hljs-string">&apos;Clock&apos;</span>,
    libraryTarget: <span class="hljs-string">&apos;umd&apos;</span>,
    umdNamedDefine: true
  }</code></pre><p>&#x6253;&#x5305;&#x7EC4;&#x4EF6;&#x6587;&#x4EF6;&#x5230; <code>dist</code> &#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre><h2 id="articleHeader3">npm&#x53D1;&#x5E03;</h2><h3 id="articleHeader4">&#x914D;&#x7F6E;package.json</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;vue-clock2&quot;,
  &quot;description&quot;: &quot;Vue component with clock&quot;,
  &quot;version&quot;: &quot;1.1.2&quot;,
  &quot;author&quot;: &quot;bestvist&quot;,
  &quot;keywords&quot;: [
    &quot;vue&quot;,
    &quot;component&quot;,
    &quot;clock&quot;,
    &quot;time&quot;
  ],
  &quot;main&quot;: &quot;dist/vue-clock.min.js&quot;,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;homepage&quot;: &quot;https://bestvist.github.io/vue-clock2/&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;vue-clock2&quot;</span>,
  <span class="hljs-attr">&quot;description&quot;</span>: <span class="hljs-string">&quot;Vue component with clock&quot;</span>,
  <span class="hljs-attr">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.1.2&quot;</span>,
  <span class="hljs-attr">&quot;author&quot;</span>: <span class="hljs-string">&quot;bestvist&quot;</span>,
  <span class="hljs-attr">&quot;keywords&quot;</span>: [
    <span class="hljs-string">&quot;vue&quot;</span>,
    <span class="hljs-string">&quot;component&quot;</span>,
    <span class="hljs-string">&quot;clock&quot;</span>,
    <span class="hljs-string">&quot;time&quot;</span>
  ],
  <span class="hljs-attr">&quot;main&quot;</span>: <span class="hljs-string">&quot;dist/vue-clock.min.js&quot;</span>,
  <span class="hljs-attr">&quot;license&quot;</span>: <span class="hljs-string">&quot;MIT&quot;</span>,
  <span class="hljs-attr">&quot;homepage&quot;</span>: <span class="hljs-string">&quot;https://bestvist.github.io/vue-clock2/&quot;</span>
}</code></pre><h3 id="articleHeader5">&#x767B;&#x5F55;npm</h3><p>&#x5982;&#x679C;&#x4F7F;&#x7528;&#x6DD8;&#x5B9D;&#x955C;&#x50CF;&#x7684;&#xFF0C;&#x9700;&#x8981;&#x5148;&#x4FEE;&#x6B63;&#x4E00;&#x4E0B;&#x955C;&#x50CF;&#x6E90;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set registry https://registry.npmjs.org/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs tcl"><code style="word-break:break-word;white-space:initial">npm config <span class="hljs-keyword">set</span> <span class="hljs-keyword">registry</span> https://<span class="hljs-keyword">registry</span>.npmjs.org/</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x67E5;&#x770B;&#x767B;&#x5F55;&#x4EBA;
npm whoami
// &#x767B;&#x5F55;
npm login

// &#x53D1;&#x5E03;
npm publish" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-comment">// &#x67E5;&#x770B;&#x767B;&#x5F55;&#x4EBA;</span>
npm whoami
<span class="hljs-comment">// &#x767B;&#x5F55;</span>
npm login

<span class="hljs-comment">// &#x53D1;&#x5E03;</span>
npm publish</code></pre><p>&#x5982;&#x679C;&#x770B;&#x5230;&#x7C7B;&#x4F3C;&#x4FE1;&#x606F;&#xFF0C;&#x8BF4;&#x660E;&#x53D1;&#x5E03;&#x6210;&#x529F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm notice
+ vue-clock2@1.1.2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">npm</span> <span class="hljs-selector-tag">notice</span>
+ <span class="hljs-selector-tag">vue-clock2</span>@<span class="hljs-keyword">1</span>.<span class="hljs-keyword">1</span>.<span class="hljs-keyword">2</span></code></pre><h1 id="articleHeader6">Github&#x4E3B;&#x9875;</h1><p>&#x628A;&#x9879;&#x76EE;&#x4E0A;&#x4F20;&#x5230;github&#x6258;&#x7BA1;&#xFF0C;&#x914D;&#x7F6E;&#x4E00;&#x4EFD;&#x57FA;&#x672C; <code>README.md</code> &#x8BF4;&#x660E;&#x6587;&#x6863;&#x3002;<br>&#x56E0;&#x4E3A;&#x7EC4;&#x4EF6;&#x5DF2;&#x7ECF;&#x53D1;&#x5E03;&#x5230;npm&#x4E0A;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x914D;&#x7F6E;&#x51E0;&#x4E2A;&#x5FBD;&#x7AE0;&#x5728;README&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// npm &#x7248;&#x672C;
[npm version](https://img.shields.io/npm/v/vue-clock2.svg)

// npm &#x4E0B;&#x8F7D;&#x91CF;
[npm download](https://img.shields.io/npm/dt/vue-clock2.svg)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code>// npm &#x7248;&#x672C;
[<span class="hljs-string">npm version</span>](<span class="hljs-link">https://img.shields.io/npm/v/vue-clock2.svg</span>)

// npm &#x4E0B;&#x8F7D;&#x91CF;
[<span class="hljs-string">npm download</span>](<span class="hljs-link">https://img.shields.io/npm/dt/vue-clock2.svg</span>)</code></pre><p>&#x66F4;&#x591A;&#x7684;&#x5FBD;&#x7AE0;&#x914D;&#x7F6E;&#x53EF;&#x4EE5;&#x67E5;&#x770B;<a href="https://shields.io/#/" rel="nofollow noreferrer" target="_blank">shields</a></p><p>&#x63A5;&#x7740;&#x63CF;&#x8FF0;&#x4E00;&#x4E0B;&#x7EC4;&#x4EF6;&#x7684;&#x5F15;&#x5165;&#x548C;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5B89;&#x88C5;&#xFF1A;
npm install vue-clock2

&#x4F7F;&#x7528;&#xFF1A;
&lt;template&gt;
  &lt;clock :time=&quot;time&quot;&gt;&lt;/clock&gt;
&lt;/template&gt;

&lt;script&gt;
  import Clock from &apos;vue-clock2&apos;;
  export default {
    components: { Clock },
    data () {
      return {
          time: &apos;10:40&apos;
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>&#x5B89;&#x88C5;&#xFF1A;
npm install vue-clock2

&#x4F7F;&#x7528;&#xFF1A;
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">clock</span> <span class="hljs-attr">:time</span>=<span class="hljs-string">&quot;time&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">clock</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Clock <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-clock2&apos;</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: { Clock },
    data () {
      <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">time</span>: <span class="hljs-string">&apos;10:40&apos;</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x66F4;&#x8BE6;&#x7EC6;&#x7684;&#x4EA4;&#x4E92;&#x6216;&#x662F;&#x5C5E;&#x6027;&#x8BF4;&#x660E;&#x5C31;&#x4EA4;&#x7ED9;&#x6587;&#x6863;&#x6765;&#x89E3;&#x51B3;&#x4E86;&#x3002;<br>&#x5728; github &#x9879;&#x76EE;&#x4E0A;&#x901A;&#x8FC7; <code>settings</code> &#x6307;&#x5B9A; <code>GitHub Pages</code></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016693220?w=1528&amp;h=862" src="https://static.alili.tech/img/remote/1460000016693220?w=1528&amp;h=862" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x7EC4;&#x4EF6;&#x6587;&#x6863;&#x8BF4;&#x660E;&#x5E94;&#x5305;&#x62EC;&#xFF1A;</p><ul><li>&#x7EC4;&#x4EF6;&#x5F15;&#x5165;&#x65B9;&#x6CD5;</li><li>&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;</li><li>&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;</li><li>&#x7EC4;&#x4EF6;&#x5C5E;&#x6027;&#x63CF;&#x8FF0;&#x8BF4;&#x660E;</li></ul><h1 id="articleHeader7">&#x603B;&#x7ED3;</h1><blockquote>&#x5F00;&#x53D1; -&gt; &#x53D1;&#x5E03; -&gt; &#x6258;&#x7BA1;</blockquote><p>&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x8F6E;&#x5B50;&#x7684;&#x5236;&#x4F5C;&#x6D41;&#x7A0B;&#x5927;&#x81F4;&#x4ECB;&#x7ECD;&#x5B8C;&#x4E86;&#xFF0C;&#x5E0C;&#x671B;&#x672C;&#x6587;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x5230;&#x60A8;&#x3002;</p><p><strong><a href="http://www.bestvist.com/p/60" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;&#x94FE;&#x63A5;</a></strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue组件从开发到发布

## 原文链接
[https://segmentfault.com/a/1190000016693216](https://segmentfault.com/a/1190000016693216)

