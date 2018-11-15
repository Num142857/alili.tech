---
title: 理解vue中的组件（二）
reprint: true
categories: reprint
abbrlink: ab1752ee
date: 2018-11-06 15:28:30
---

{{% raw %}}
<p>&#x4E0A;&#x8282;&#x8BF4;&#x5230;&#x7EC4;&#x4EF6;<a href="https://segmentfault.com/a/1190000009236700">https://segmentfault.com/a/1190000009236700</a>&#xFF0C;&#x8FD9;&#x4E00;&#x8282;&#x7EE7;&#x7EED;&#x6765;&#x5B66;&#x4E60;&#x7EC4;&#x4EF6;&#xFF1A;</p><blockquote>&#x539F;&#x6587;&#x535A;&#x5BA2;&#x5730;&#x5740;&#xFF0C;&#x6B22;&#x8FCE;&#x5B66;&#x4E60;&#x4EA4;&#x6D41;:<a href="http://blog.wykiss.cn/2018/09/29/%E7%90%86%E8%A7%A3vue%E4%B8%AD%E7%9A%84%E7%BB%84%E4%BB%B6%EF%BC%88%E4%BA%8C%EF%BC%89/" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x9884;&#x89C8;</a><br>&#x4ECE;github&#x4E0A;&#x83B7;&#x53D6;&#x672C;&#x6587;&#x4EE3;&#x7801;&#xFF1A;<a href="https://github.com/WYseven/vue2-basic-demo/tree/master/vue-demo/components/%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81" rel="nofollow noreferrer" target="_blank">&#x793A;&#x4F8B;&#x4EE3;&#x7801;</a></blockquote><p>&#x5C01;&#x88C5;&#x7684;&#x7EC4;&#x4EF6;&#x8981;&#x5177;&#x5907;&#x590D;&#x7528;&#x6027;&#x548C;&#x901A;&#x7528;&#x6027;&#x3002;</p><p>&#x5148;&#x6765;&#x8BF4;&#x590D;&#x7528;&#xFF0C;&#x590D;&#x7528;&#x4E3B;&#x8981;&#x662F;&#x590D;&#x7528; HTML &#x7ED3;&#x6784;&#xFF0C;&#x5916;&#x52A0;&#x8FD9;&#x5757;&#x7ED3;&#x6784;&#x4E2D;&#x7684;&#x4EA4;&#x4E92; js&#xFF0C;&#x548C;&#x9488;&#x5BF9;&#x8FD9;&#x4E00;&#x5757;&#x8BBE;&#x7F6E;&#x7684; css&#x3002; &#x8FD9;&#x4E09;&#x8005;&#x662F;&#x6784;&#x6210;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x6700;&#x57FA;&#x672C;&#x7684;&#x8981;&#x7D20;&#xFF0C;&#x8FD9;&#x4E09;&#x8005;&#x76F8;&#x4E92;&#x9694;&#x79BB;&#x6709;&#x76F8;&#x4E92;&#x4F5C;&#x7528;&#xFF0C;&#x5C06;&#x4E09;&#x8005;&#x805A;&#x5408;&#x8D77;&#x6765;&#xFF0C;&#x5728;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF08;&#x6807;&#x7B7E;&#x5BF9;&#xFF09;&#x4E00;&#x6837;&#xFF0C;&#x4F1A;&#x5F15;&#x7528;&#x8FD9;&#x4E00;&#x5757;&#x7684;&#x6240;&#x6709;&#x529F;&#x80FD;&#xFF0C;&#x53EF;&#x4EE5;&#x591A;&#x6B21;&#x4F7F;&#x7528;&#x3002;</p><p>&#x5728; vue &#x4E2D;&#x63D0;&#x4F9B;&#x4E86;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FD9;&#x6837;&#x628A;&#x7EC4;&#x4EF6;&#x6A21;&#x5757;&#x5316;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x8BA9;&#x5F00;&#x53D1;&#x8005;&#x66F4;&#x65B9;&#x4FBF;&#x7684;&#x5229;&#x7528;&#x7EC4;&#x4EF6;&#x5806;&#x79EF;&#x9875;&#x9762;&#x3002;&#x5C06;&#x4E09;&#x8005;&#x805A;&#x5408;&#x5728;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5B64;&#x7ACB;&#x7684;&#x5B58;&#x5728;&#xFF0C;&#x51CF;&#x5C11;&#x4E86;&#x6539;&#x52A8;&#x7EC4;&#x4EF6;&#x800C;&#x5F71;&#x54CD;&#x5916;&#x754C;&#x7684;&#x98CE;&#x9669;&#xFF0C;&#x6781;&#x5927;&#x7684;&#x63D0;&#x9AD8;&#x4E86;&#x4EE3;&#x7801;&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x3002;</p><p>&#x518D;&#x8BF4;&#x901A;&#x7528;&#x6027;&#xFF0C;&#x5728;&#x8BA8;&#x8BBA;&#x901A;&#x7528;&#x6027;&#x8FD9;&#x70B9;&#x4E0A;&#xFF0C;&#x8981;&#x5411;&#x4E24;&#x4E2A;&#x65B9;&#x9762;&#x601D;&#x8003;&#xFF1A;</p><ol><li>&#x5916;&#x754C;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#xFF0C;&#x5BF9;&#x7EC4;&#x4EF6;&#x6240;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5B9A;&#x5236;&#xFF0C;&#x7531;&#x5916;&#x754C;&#x4F20;&#x9012;&#x8FDB;&#x6765;&#xFF08;&#x5185;&#x90E8;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x503C;&#xFF09;</li><li>&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x7684;&#x4EA4;&#x4E92;&#x8981;&#x901A;&#x77E5;&#x7ED9;&#x5916;&#x754C;&#xFF0C;&#x5E76;&#x5728;&#x5916;&#x754C;&#x7684;&#x63A7;&#x5236;&#x4E0B;&#x4EA7;&#x751F;&#x5F71;&#x54CD;&#xFF0C;&#x505A;&#x4E0D;&#x540C;&#x4E8B;&#x60C5;&#x3002;</li></ol><p>&#x7EC4;&#x4EF6;&#x8FBE;&#x5230;&#x590D;&#x7528;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x591A;&#x4E2A;&#x5730;&#x65B9;&#x4F7F;&#x7528;&#xFF0C;&#x800C;&#x4F7F;&#x7528;&#x7684;&#x4F4D;&#x7F6E;&#x4E0D;&#x540C;&#xFF0C;&#x9700;&#x8981;&#x5C55;&#x793A;&#x7684;&#x6570;&#x636E;&#x4E5F;&#x4E0D;&#x540C;&#xFF0C;&#x6B64;&#x65F6;&#x5C01;&#x88C5;&#x7684;&#x7EC4;&#x4EF6;&#x8981;&#x5177;&#x6709;&#x901A;&#x7528;&#x6027;&#xFF0C;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x5219;&#x7531;&#x5916;&#x754C;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x65F6;&#x6765;&#x51B3;&#x5B9A;&#x5C06;&#x8981;&#x663E;&#x793A;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x9700;&#x8981;&#x5C06;&#x6570;&#x636E;&#x4F20;&#x9012;&#x7ED9;&#x7EC4;&#x4EF6;&#x3002;</p><p>&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x90E8;&#x9664;&#x4E86;&#x9700;&#x8981;&#x6570;&#x636E;&#x5916;&#xFF0C;&#x4E0D;&#x53EF;&#x907F;&#x514D;&#x7684;&#x8FD8;&#x6709;&#x4EA4;&#x4E92;&#xFF0C;&#x5F53;&#x5B8C;&#x6210;&#x4E00;&#x4E2A;&#x4EA4;&#x4E92;&#x540E;&#xFF0C;&#x9700;&#x8981;&#x5BF9;&#x5916;&#x754C;&#x4EA7;&#x751F;&#x5F71;&#x54CD;&#xFF0C;&#x8FD9;&#x4E0D;&#x80FD;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x505A;&#x5177;&#x4F53;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x56E0;&#x4E3A;&#x4F7F;&#x7528;&#x7684;&#x4F4D;&#x7F6E;&#x4E0D;&#x540C;&#xFF0C;&#x6240;&#x4EA7;&#x751F;&#x7684;&#x6548;&#x679C;&#x4E5F;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x800C;&#x5B8C;&#x6210;&#x8FD9;&#x4E00;&#x7CFB;&#x5217;&#x4E8B;&#x60C5;&#x5219;&#x4EA4;&#x7ED9;&#x5916;&#x754C;&#x6765;&#x51B3;&#x5B9A;&#xFF0C;&#x9700;&#x8981;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x901A;&#x4FE1;&#x7ED9;&#x5916;&#x754C;&#xFF0C;&#x544A;&#x8BC9;&#x5916;&#x754C;&#xFF0C;&#x5185;&#x90E8;&#x5B8C;&#x6210;&#x4E86;&#x4E00;&#x6B21;&#x4EA4;&#x4E92;&#x3002;</p><h2 id="articleHeader0">&#x6CE8;&#x518C;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;</h2><p>&#x4ECE;&#x5C01;&#x88C5;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x4E0B;&#x62C9;&#x6846; <strong>custom-select</strong> &#x7EC4;&#x4EF6;&#x5F00;&#x59CB;&#x3002;</p><p>&#x8981;&#x8FBE;&#x5230;&#x5C01;&#x88C5;&#x6027;&#x597D;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x5199;&#x591A;&#x79CD;&#x529F;&#x80FD;&#x7684;&#x4EE3;&#x7801;&#x5757;&#xFF0C;&#x90A3;&#x4E48;&#x7EC4;&#x4EF6;&#x672C;&#x8EAB;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6216;&#x8005;&#x7C7B;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528; <strong>Vue.extend( options )</strong> &#x6765;&#x521B;&#x5EFA;&#x6784;&#x9020;&#x5668;&#xFF0C;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x5668;&#x53EF;&#x4EE5;&#x7531;&#x5F00;&#x53D1;&#x8005;&#x81EA;&#x5DF1;&#x624B;&#x52A8;&#x521D;&#x59CB;&#x5316;&#x6302;&#x8F7D;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x6CE8;&#x518C;&#x6210;&#x7EC4;&#x4EF6;&#x5728;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x4E2D;&#x4F7F;&#x7528;&#x3002;</p><p>&#x5728; body &#x4E2D;&#x653E;&#x7F6E;&#x6302;&#x8F7D;&#x70B9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684;&#x6784;&#x9020;&#x5668;&#xFF0C;&#x5E76;&#x624B;&#x52A8;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x624B;&#x52A8;&#x6302;&#x8F7D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let customeSelect = Vue.extend({
    template: `
        &lt;div class=&quot;select&quot;&gt;
            &lt;h2&gt;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5B9A;&#x4E49;&#x7684;&#x4E0B;&#x62C9;&#x6846;&lt;/h2&gt;
            &lt;p&gt;&#x8BF7;&#x9009;&#x62E9;&#xFF1A;&#x5317;&#x4EAC;&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;&#x5317;&#x4EAC;&lt;/li&gt;
                &lt;li&gt;&#x4E0A;&#x6D77;&lt;/li&gt;
                &lt;li&gt;&#x676D;&#x5DDE;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    `
})
// &#x624B;&#x52A8;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x6302;&#x8F7D;&#x5230;&#x9875;&#x9762;&#x7684;&#x6302;&#x8F7D;&#x70B9;&#x4E0A;
new customeSelect().$mount(&apos;#app&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>let customeSelect = Vue.extend({
    template: `<span class="javascript">
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;select&quot;</span>&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5B9A;&#x4E49;&#x7684;&#x4E0B;&#x62C9;&#x6846;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
            &lt;p&gt;&#x8BF7;&#x9009;&#x62E9;&#xFF1A;&#x5317;&#x4EAC;&lt;<span class="hljs-regexp">/p&gt;
            &lt;ul&gt;
                &lt;li&gt;&#x5317;&#x4EAC;&lt;/</span>li&gt;
                <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x4E0A;&#x6D77;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
                &lt;li&gt;&#x676D;&#x5DDE;&lt;<span class="hljs-regexp">/li&gt;
            &lt;/u</span>l&gt;
        <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    </span>`
})
<span class="hljs-regexp">//</span> &#x624B;&#x52A8;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x6302;&#x8F7D;&#x5230;&#x9875;&#x9762;&#x7684;&#x6302;&#x8F7D;&#x70B9;&#x4E0A;
<span class="hljs-keyword">new</span> customeSelect().$mount(<span class="hljs-string">&apos;#app&apos;</span>);</code></pre><p>&#x9009;&#x62E9;&#x624B;&#x52A8;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x8C03;&#x7528;&#x5185;&#x7F6E;&#x65B9;&#x6CD5; <strong>$mount</strong> &#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x6302;&#x8F7D;&#xFF0C;&#x968F;&#x540E;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x8FDB;&#x884C;&#x7F16;&#x8BD1;&#xFF0C;&#x66FF;&#x6362;&#x6389;&#x6302;&#x8F7D;&#x70B9;&#xFF0C;&#x6E32;&#x67D3;&#x5728;&#x9875;&#x9762;&#x4E2D;&#x3002;</p><p>&#x5F80;&#x5F80;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684;&#x6784;&#x9020;&#x5668;&#x540E;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x624B;&#x52A8;&#x7684;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x4E2D;&#x5F53;&#x6210;&#x6807;&#x7B7E;&#x6765;&#x4F7F;&#x7528;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x9700;&#x8981;&#x8C03;&#x7528; <strong>Vue.component( id, [definition] )</strong> &#x6CE8;&#x518C;&#x6210;&#x7EC4;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x6269;&#x5C55;&#x8FC7;&#x7684;&#x6784;&#x9020;&#x5668;
Vue.component(&apos;my-component&apos;, Vue.extend({ /* ... */ }))

// &#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x9009;&#x9879;&#x5BF9;&#x8C61; (&#x81EA;&#x52A8;&#x8C03;&#x7528; Vue.extend)
Vue.component(&apos;my-component&apos;, { /* ... */ })

// &#x83B7;&#x53D6;&#x6CE8;&#x518C;&#x7684;&#x7EC4;&#x4EF6; (&#x59CB;&#x7EC8;&#x8FD4;&#x56DE;&#x6784;&#x9020;&#x5668;)
var MyComponent = Vue.component(&apos;my-component&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-comment">// &#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x6269;&#x5C55;&#x8FC7;&#x7684;&#x6784;&#x9020;&#x5668;</span>
Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, Vue.extend({ <span class="hljs-comment">/* ... */</span> }))

<span class="hljs-comment">// &#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x9009;&#x9879;&#x5BF9;&#x8C61; (&#x81EA;&#x52A8;&#x8C03;&#x7528; Vue.extend)</span>
Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, { <span class="hljs-comment">/* ... */</span> })

<span class="hljs-comment">// &#x83B7;&#x53D6;&#x6CE8;&#x518C;&#x7684;&#x7EC4;&#x4EF6; (&#x59CB;&#x7EC8;&#x8FD4;&#x56DE;&#x6784;&#x9020;&#x5668;)</span>
<span class="hljs-selector-tag">var</span> MyComponent = Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>)</code></pre><p>&#x6839;&#x636E;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x53EF;&#x4EE5;&#x7701;&#x7565;&#x8C03;&#x7528; <strong>Vue.extend</strong> &#x8FD9;&#x4E00;&#x6B65;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x4F20;&#x5165; &#x9009;&#x9879;&#x5BF9;&#x8C61;&#x5373;&#x53EF;&#xFF0C;&#x5185;&#x90E8;&#x4F1A;&#x81EA;&#x5B9A;&#x8C03;&#x7528; <strong>Vue.extend</strong> &#xFF0C;&#x6240;&#x4EE5;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x53D8;&#x6210;&#x4E86;&#x8FD9;&#x6837;&#x7684;&#x7B80;&#x5199;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;custome-select&apos;,{
    template: `
        &lt;div class=&quot;select&quot;&gt;
            &lt;h2&gt;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5B9A;&#x4E49;&#x7684;&#x4E0B;&#x62C9;&#x6846;&lt;/h2&gt;
            &lt;p&gt;&#x8BF7;&#x9009;&#x62E9;&#xFF1A;&#x5317;&#x4EAC;&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;&#x5317;&#x4EAC;&lt;/li&gt;
                &lt;li&gt;&#x4E0A;&#x6D77;&lt;/li&gt;
                &lt;li&gt;&#x676D;&#x5DDE;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    `
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>Vue.component(&apos;custome-select&apos;,{
    template: `
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;select&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5B9A;&#x4E49;&#x7684;&#x4E0B;&#x62C9;&#x6846;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x8BF7;&#x9009;&#x62E9;&#xFF1A;&#x5317;&#x4EAC;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x5317;&#x4EAC;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x4E0A;&#x6D77;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x676D;&#x5DDE;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    `
})</code></pre><p>&#x5C06;&#x6765; <strong>custome-select</strong> &#x5C31;&#x5F53;&#x6210;&#x4E86;&#x6807;&#x7B7E;&#x4F7F;&#x7528;&#x5728;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x4E2D; <strong>&lt; custome-select&gt;&lt; /custome-select&gt;</strong>&#xFF0C;Vue&#x5728;&#x7F16;&#x8BD1;&#x6A21;&#x677F;&#x65F6;&#xFF0C;&#x5C31;&#x56DE;&#x53BB;&#x627E;&#x8FD9;&#x79CD;&#x81EA;&#x5B9A;&#x4E49;&#x6807;&#x7B7E;&#x662F;&#x5426;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x6CE8;&#x518C;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x4F1A;&#x628A;&#x6CE8;&#x518C;&#x7684;&#x6784;&#x9020;&#x5668;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x7F16;&#x8BD1;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#xFF0C;&#x6700;&#x7EC8;&#x5C06;&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x6A21;&#x677F;&#x66FF;&#x6362;&#x6389;&#x81EA;&#x5B9A;&#x4E49;&#x6807;&#x7B7E;&#x7684;&#x4F4D;&#x7F6E;&#x3002;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x6CE8;&#x518C;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#xFF0C;&#x5219;&#x4F1A;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#x3002;</p><p>&#x5173;&#x4E8E;&#x7EC4;&#x4EF6;&#x540D;&#x79F0;&#x7684;&#x547D;&#x540D;:</p><ul><li>&#x91C7;&#x7528;&#x70E4;&#x4E32;&#xFF08;kebab-case&#xFF09;&#x547D;&#x540D;&#xFF0C;<strong>custome-select</strong></li><li>&#x91C7;&#x7528;&#x9A7C;&#x5CF0;&#x547D;&#x540D;&#xFF08; PascalCase&#xFF09;&#xFF0C; <strong>customeSelect</strong></li><li>&#x540D;&#x79F0;&#x4E0D;&#x80FD;&#x662F;HTML&#x89C4;&#x5B9A;&#x7684;&#x6807;&#x7B7E;&#x540D;&#xFF0C;&#x6BD4;&#x5982;div&#x3001;span&#x3001;header&#x3001;footer&#x7B49;&#x7B49;&#x3002;&#x3002;&#x3002;</li></ul><blockquote>&#x6CE8;&#x610F;&#xFF1A;&#x6CE8;&#x518C;&#x65F6;&#x968F;&#x4FBF;&#x4F7F;&#x7528;&#x4E24;&#x79CD;&#x547D;&#x540D;&#x65B9;&#x5F0F;&#x7684;&#x4EFB;&#x4F55;&#x4E00;&#x79CD;&#xFF0C;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x4E00;&#x5F8B;&#x91C7;&#x7528;&#x70E4;&#x4E32;&#x547D;&#x540D;&#x624D;&#x6709;&#x6548;&#x3002;</blockquote><p>&#x5B9A;&#x4E49;&#x6302;&#x8F7D;&#x70B9;&#xFF0C;&#x5E76;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;custome-select&gt;&lt;/custome-select&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">custome-select</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">custome-select</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x542F;&#x52A8;&#x5E94;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: &apos;#app&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
    <span class="hljs-attribute">el</span>: <span class="hljs-string">&apos;#app&apos;</span>
})</code></pre><p>&#x6700;&#x7EC8;&#x6E32;&#x67D3;&#x540E;&#x7684;&#x7ED3;&#x6784;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;!--&#x4EE5;&#x4E0B;&#x66FF;&#x6362;&#x4E86;&#x539F;&#x6765; &lt;custome-select&gt;&lt;/custome-select&gt; &#x6807;&#x7B7E;&#x4F4D;&#x7F6E;--&gt;
    &lt;div class=&quot;select&quot;&gt;
        &lt;h2&gt;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5B9A;&#x4E49;&#x7684;&#x4E0B;&#x62C9;&#x6846;&lt;/h2&gt;
        &lt;p&gt;&#x8BF7;&#x9009;&#x62E9;&#xFF1A;&#x5317;&#x4EAC;&lt;/p&gt;
        &lt;ul&gt;
            &lt;li&gt;&#x5317;&#x4EAC;&lt;/li&gt;
            &lt;li&gt;&#x4E0A;&#x6D77;&lt;/li&gt;
            &lt;li&gt;&#x676D;&#x5DDE;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!--&#x4EE5;&#x4E0B;&#x66FF;&#x6362;&#x4E86;&#x539F;&#x6765; &lt;custome-select&gt;&lt;/custome-select&gt; &#x6807;&#x7B7E;&#x4F4D;&#x7F6E;--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;select&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5B9A;&#x4E49;&#x7684;&#x4E0B;&#x62C9;&#x6846;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x8BF7;&#x9009;&#x62E9;&#xFF1A;&#x5317;&#x4EAC;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x5317;&#x4EAC;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x4E0A;&#x6D77;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x676D;&#x5DDE;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><h2 id="articleHeader1">&#x7ED9;&#x7EC4;&#x4EF6;&#x5B9A;&#x5236;&#x6570;&#x636E;&#x4F20;&#x9012;props</h2><p>&#x76EE;&#x524D; HTML &#x8FBE;&#x5230;&#x4E86;&#x590D;&#x7528;&#x7684;&#x76EE;&#x7684;&#xFF0C;&#x4F46;&#x4F7F;&#x7528;&#x591A;&#x6B21;&#x4F9D;&#x7136;&#x663E;&#x793A;&#x7684;&#x662F;&#x5199;&#x6B7B;&#x7684;&#x6570;&#x636E;&#x3002;&#x4F5C;&#x4E3A;&#x663E;&#x793A;&#x6570;&#x636E;&#x7684; HTML &#x7ED3;&#x6784;&#xFF0C;&#x5728;&#x4E0D;&#x540C;&#x5730;&#x65B9;&#x4F7F;&#x7528;&#xFF0C;&#x6240;&#x8981;&#x5C55;&#x793A;&#x7684;&#x6570;&#x636E;&#x7531;&#x5916;&#x754C;&#x6765;&#x51B3;&#x5B9A;&#xFF0C;&#x8FD9;&#x5C31;&#x9700;&#x8981;&#x7ED9;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;!-- &#x57CE;&#x5E02;&#x7684;&#x4E0B;&#x62C9; --&gt;
    &lt;custome-select&gt;&lt;/custome-select&gt;
    &lt;!-- &#x7528;&#x6237;&#x7684;&#x4E0B;&#x62C9; --&gt;
    &lt;custome-select&gt;&lt;/custome-select&gt;
    &lt;!-- &#x65E5;&#x671F;&#x7684;&#x4E0B;&#x62C9; --&gt;
    &lt;custome-select&gt;&lt;/custome-select&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x57CE;&#x5E02;&#x7684;&#x4E0B;&#x62C9; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">custome-select</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">custome-select</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x7528;&#x6237;&#x7684;&#x4E0B;&#x62C9; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">custome-select</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">custome-select</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x65E5;&#x671F;&#x7684;&#x4E0B;&#x62C9; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">custome-select</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">custome-select</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x800C;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;&#x7ED9;&#x7EC4;&#x4EF6;&#x7684;&#x6784;&#x9020;&#x5668;&#x4F20;&#x9012;&#x53C2;&#x6570;&#xFF0C;&#x672C;&#x8D28;&#x4E0A;&#x5C31;&#x662F;&#x7ED9;&#x51FD;&#x6570;&#x4F20;&#x53C2;&#x3002;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x5206;&#x4E3A;&#x5B9E;&#x53C2;&#x548C;&#x5F62;&#x53C2;&#x4E24;&#x4E2A;&#x90E8;&#x5206;&#xFF1A;</p><ul><li>&#x5B9E;&#x53C2;&#x662F;&#x5B9E;&#x9645;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;</li><li>&#x5F62;&#x53C2;&#x662F;&#x7528;&#x6765;&#x63A5;&#x6536;&#x6570;&#x636E;&#x6240;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;</li></ul><p>&#x73B0;&#x5728;&#x7EC4;&#x4EF6;&#x5199;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x4EE5;&#x6807;&#x7B7E;&#x5BF9;&#x7684;&#x5F62;&#x5F0F;&#x5448;&#x73B0;&#xFF0C;&#x9700;&#x8981;&#x4F20;&#x9012;&#x5B9E;&#x9645;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x552F;&#x4E00;&#x7684;&#x5730;&#x65B9;&#x5C31;&#x662F;&#x5199;&#x5728;&#x884C;&#x95F4;&#x4F5C;&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x4F20;&#x9012;&#x7684;&#x53C2;&#x6570;&#x4F1A;&#x6709;&#x5F88;&#x591A;&#x4E2A;&#xFF0C;&#x6700;&#x597D;&#x8868;&#x660E;&#x5177;&#x4F53;&#x7684;&#x542B;&#x4E49;&#xFF0C;&#x9700;&#x8981;&#x548C;&#x7EC4;&#x4EF6;&#x7EA6;&#x5B9A;&#x597D;&#x5C5E;&#x6027;&#x540D;&#xFF0C;&#x4F20;&#x9012;&#x53C2;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;!-- &#x57CE;&#x5E02;&#x7684;&#x4E0B;&#x62C9; --&gt;
    &lt;custome-select title=&quot;&#x8BF7;&#x9009;&#x62E9;&#x57CE;&#x5E02;&quot; :list=&quot;[&apos;&#x5317;&#x4EAC;&apos;,&apos;&#x4E0A;&#x6D77;&apos;,&apos;&#x676D;&#x5DDE;&apos;]&quot;&gt;&lt;/custome-select&gt;
    &lt;!-- &#x7528;&#x6237;&#x7684;&#x4E0B;&#x62C9; --&gt;
    &lt;custome-select title=&quot;&#x8BF7;&#x9009;&#x62E9;&#x7528;&#x6237;&quot; :list=&quot;[&apos;&#x5F20;&#x4E09;&apos;,&apos;&#x674E;&#x56DB;&apos;,&apos;&#x738B;&#x4E94;&apos;]&quot;&gt;&lt;/custome-select&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x57CE;&#x5E02;&#x7684;&#x4E0B;&#x62C9; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">custome-select</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;&#x8BF7;&#x9009;&#x62E9;&#x57CE;&#x5E02;&quot;</span> <span class="hljs-attr">:list</span>=<span class="hljs-string">&quot;[&apos;&#x5317;&#x4EAC;&apos;,&apos;&#x4E0A;&#x6D77;&apos;,&apos;&#x676D;&#x5DDE;&apos;]&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">custome-select</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x7528;&#x6237;&#x7684;&#x4E0B;&#x62C9; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">custome-select</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;&#x8BF7;&#x9009;&#x62E9;&#x7528;&#x6237;&quot;</span> <span class="hljs-attr">:list</span>=<span class="hljs-string">&quot;[&apos;&#x5F20;&#x4E09;&apos;,&apos;&#x674E;&#x56DB;&apos;,&apos;&#x738B;&#x4E94;&apos;]&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">custome-select</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x9700;&#x8981;&#x663E;&#x793A;&#x7684;&#x7528; <strong>props</strong> &#x63A5;&#x6536;&#x4F20;&#x9012;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x597D;&#x5904;&#x5C31;&#x662F;&#x4E00;&#x65E6;&#x770B;&#x5230;&#x7EC4;&#x4EF6;&#xFF0C;&#x5C31;&#x4F1A;&#x5F88;&#x6E05;&#x6670;&#x5FEB;&#x901F;&#x7684;&#x4E86;&#x89E3;&#x5230;&#x7EC4;&#x4EF6;&#x6240;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#x3002;</p><blockquote>&#x6CE8;&#x610F;&#xFF1A; &#x5728;&#x884C;&#x95F4;&#x5199;&#x4E0A;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#xFF0C;&#x8981;&#x89E3;&#x6790;&#x4E3A;&#x6570;&#x7EC4;&#xFF0C;&#x5728;&#x5C5E;&#x6027;&#x540D;&#x524D;&#x52A0;&#x4E0A; v-bind&#xFF0C;&#x89E3;&#x6790;&#x4E3A; javascript &#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x5426;&#x5219;&#x53EA;&#x80FD;&#x5F53;&#x6210;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x3002;</blockquote><p>&#x5177;&#x4F53;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;custome-select&apos;,{
    // &#x5173;&#x4E8E;props&#x5177;&#x4F53;&#x53C2;&#x8003;&#xFF1A;
    // https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E7%B1%BB%E5%9E%8B
    // https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81
    props:{
        title: {
            type: String,
            default: &apos;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5B9A;&#x4E49;&#x7684;&#x4E0B;&#x62C9;&#x6846;&apos;
        },
        list:{
            type: Array,
            default(){return []}
        },
        selectIndex:{
            type: Number,
            default:0
        }
    },
    template: `
        &lt;div class=&quot;select&quot;&gt;
            &lt;h2&gt;{{title}}&lt;/h2&gt;
            &lt;p&gt;&#x8BF7;&#x9009;&#x62E9;&#xFF1A;{{list[selectIndex]}}&lt;/p&gt;
            &lt;ul&gt;
                &lt;li 
                    v-for=&quot;item,index in list&quot;
                    :key=&quot;index&quot;
                &gt;
                    {{item}}
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    `
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>Vue.component(<span class="hljs-string">&apos;custome-select&apos;</span>,{
    // &#x5173;&#x4E8E;props&#x5177;&#x4F53;&#x53C2;&#x8003;&#xFF1A;
    // https://cn.vuejs.org/v2/guide/components-props.html#Prop-<span class="hljs-meta">%E7</span><span class="hljs-meta">%B1</span><span class="hljs-meta">%BB</span><span class="hljs-meta">%E5</span><span class="hljs-meta">%9E</span><span class="hljs-meta">%8B</span>
    // https://cn.vuejs.org/v2/guide/components-props.html#Prop-<span class="hljs-meta">%E9</span><span class="hljs-meta">%AA</span><span class="hljs-meta">%8C</span><span class="hljs-meta">%E8</span><span class="hljs-meta">%AF</span><span class="hljs-meta">%81</span>
    props:{
        title: {
            type: String,
            default: <span class="hljs-string">&apos;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5B9A;&#x4E49;&#x7684;&#x4E0B;&#x62C9;&#x6846;&apos;</span>
        },
        list:{
            type: Array,
            default(){return []}
        },
        selectIndex:{
            type: Number,
            default:<span class="hljs-number">0</span>
        }
    },
    template: `
        &lt;div class=<span class="hljs-string">&quot;select&quot;</span>&gt;
            &lt;h2&gt;{{title}}&lt;/h2&gt;
            &lt;p&gt;&#x8BF7;&#x9009;&#x62E9;&#xFF1A;{{list[selectIndex]}}&lt;/p&gt;
            &lt;ul&gt;
                &lt;li 
                    v-for=<span class="hljs-string">&quot;item,index in list&quot;</span>
                    :key=<span class="hljs-string">&quot;index&quot;</span>
                &gt;
                    {{item}}
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    `
})</code></pre><p>&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x7EA6;&#x5B9A;&#x4E86;&#x4E09;&#x4E2A;&#x9700;&#x8981;&#x63A5;&#x6536;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x5206;&#x522B;&#x5199;&#x51FA;&#x4E86;&#x63A5;&#x53D7;&#x7684;&#x7C7B;&#x578B;&#x548C;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;props&#x53C2;&#x6570;&#x6587;&#x6863;&#x5982;&#x4E0B;&#xFF1A;</p><table><thead><tr><th align="center">&#x5C5E;&#x6027;</th><th align="center">&#x8BF4;&#x660E;</th><th align="center">&#x7C7B;&#x578B;</th><th align="center">&#x9ED8;&#x8BA4;&#x503C;</th></tr></thead><tbody><tr><td align="center">title</td><td align="center">&#x5B9A;&#x5236;&#x7EC4;&#x4EF6;&#x7684;&#x6807;&#x9898;</td><td align="center">String</td><td align="center">&apos;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5B9A;&#x4E49;&#x7684;&#x4E0B;&#x62C9;&#x6846;&apos;&apos;</td></tr><tr><td align="center">list</td><td align="center">&#x5B9A;&#x5236;&#x7EC4;&#x4EF6;&#x7684;&#x4E0B;&#x62C9;&#x5217;&#x8868;</td><td align="center">Array</td><td align="center">[]</td></tr><tr><td align="center">selectIndex</td><td align="center">&#x9009;&#x62E9;&#x8981;&#x5C55;&#x793A;&#x7684;&#x4E00;&#x9879;</td><td align="center">String</td><td align="center">0</td></tr></tbody></table><p>&#x6709;&#x4E86;&#x6587;&#x6863;&#xFF0C;&#x5F88;&#x6E05;&#x6670;&#x7684;&#x77E5;&#x9053;&#x6BCF;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x4EE3;&#x8868;&#x7684;&#x610F;&#x601D;&#xFF0C;&#x4F20;&#x5165;&#x54CD;&#x5E94;&#x7684;&#x53C2;&#x6570;&#x540E;&#xFF0C;&#x5C31;&#x4F1A;&#x8FBE;&#x5230;&#x9884;&#x671F;&#x7684;&#x6548;&#x679C;&#x3002;</p><h2 id="articleHeader2">&#x7EC4;&#x4EF6;&#x81EA;&#x8EAB;&#x72B6;&#x6001;data</h2><p>&#x4EE5;&#x4E0A;&#x6E32;&#x67D3;&#x540E;&#x76F4;&#x63A5;&#x628A;&#x4E0B;&#x62C9;&#x6846;&#x663E;&#x793A;&#x4E86;&#x51FA;&#x6765;&#xFF0C;&#x4E0B;&#x62C9;&#x6846;&#x5E94;&#x8BE5;&#x662F;&#x5728;&#x70B9;&#x51FB; <strong>p</strong> &#x6807;&#x7B7E;&#x65F6;&#x5019;&#x624D;&#x80FD;&#x663E;&#x793A;&#xFF0C;&#x518D;&#x6B21;&#x70B9;&#x51FB;&#x5C31;&#x9690;&#x85CF;&#x6389;&#xFF0C;&#x8981;&#x5B9E;&#x73B0;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x663E;&#x793A;&#x9690;&#x85CF;&#x5207;&#x6362;&#x529F;&#x80FD;&#x3002;</p><p>&#x5728; <strong>Vue</strong> &#x4E2D;&#x4E0D;&#x63D0;&#x5021;&#x76F4;&#x63A5;&#x64CD;&#x4F5C; <strong>DOM</strong>&#xFF0C;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x6765;&#x786E;&#x5B9A; <strong>DOM</strong> &#x7684;&#x72B6;&#x6001;&#xFF0C;&#x5F53;&#x9700;&#x8981;&#x6539;&#x53D8; <strong>DOM</strong> &#x65F6;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x6539;&#x53D8;&#x8BBE;&#x7F6E;&#x597D;&#x7684;&#x72B6;&#x6001;&#x5373;&#x53EF;&#xFF0C;&#x628A;&#x6211;&#x4EEC;&#x7684;&#x5173;&#x6CE8;&#x70B9;&#x653E;&#x5728;&#x72B6;&#x6001;&#x7684;&#x7EF4;&#x62A4;&#x4E0A;&#xFF0C;&#x800C;&#x65E0;&#x9700;&#x624B;&#x52A8;&#x64CD;&#x4F5C; <strong>DOM</strong> &#x6539;&#x53D8;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x72B6;&#x6001;&#x4E0D;&#x53D7;&#x5916;&#x754C;&#x7684;&#x5F71;&#x54CD;&#xFF0C;&#x5C5E;&#x4E8E;&#x662F;&#x7EC4;&#x4EF6;&#x81EA;&#x8EAB;&#x7684;&#x72B6;&#x6001;&#x53D8;&#x5316;&#xFF0C;&#x5B9A;&#x4E49;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#xFF0C;&#x5E76;&#x4E14;&#x6539;&#x53D8;&#x65F6;&#x53EA;&#x80FD;&#x7531;&#x7EC4;&#x4EF6;&#x81EA;&#x8EAB;&#x66F4;&#x6539;&#x3002;</p><p>&#x5177;&#x4F53;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;custome-select&apos;,{
    ... &#x7701;&#x7565;&#x4E86;props&#x8BBE;&#x7F6E;
    data(){
        return {
            show: false  // &#x4E00;&#x5F00;&#x59CB;&#x72B6;&#x6001;&#x4E3A;false&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E0D;&#x663E;&#x793A;&#x4E0B;&#x62C9;&#x5217;&#x8868;
        }
    },
    template: `
        &lt;div class=&quot;select&quot;&gt;
            &lt;h2&gt;{{title}}&lt;/h2&gt;
            &lt;p @click=&quot;toggleShow&quot;&gt;&#x8BF7;&#x9009;&#x62E9;&#xFF1A;{{list[selectIndex]}}&lt;/p&gt;
            &lt;ul v-show=&quot;show&quot;&gt;
                &lt;li 
                    v-for=&quot;item,index in list&quot;
                    :key=&quot;index&quot;
                &gt;
                    {{item}}
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    `,
    methods:{
        toggleShow(){
            this.show = !this.show;
        }
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml">Vue.component(&apos;custome-select&apos;,{
    ... &#x7701;&#x7565;&#x4E86;props&#x8BBE;&#x7F6E;
    data(){
        return {
            show: false  // &#x4E00;&#x5F00;&#x59CB;&#x72B6;&#x6001;&#x4E3A;false&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E0D;&#x663E;&#x793A;&#x4E0B;&#x62C9;&#x5217;&#x8868;
        }
    },
    template: `
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;select&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span></span><span class="hljs-template-variable">{{title}}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;toggleShow&quot;</span>&gt;</span>&#x8BF7;&#x9009;&#x62E9;&#xFF1A;</span><span class="hljs-template-variable">{{list[selectIndex]}}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">&quot;show&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> 
                    <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;item,index in list&quot;</span>
                    <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;index&quot;</span>
                &gt;</span>
                    </span><span class="hljs-template-variable">{{item}}</span><span class="xml">
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    `,
    methods:{
        toggleShow(){
            this.show = !this.show;
        }
    }
})</span></code></pre><p>&#x4EE5;&#x4E0A;&#x505A;&#x4E86;&#x4E09;&#x4EF6;&#x4E8B;&#x60C5;&#xFF1A;</p><ol><li>&#x5728; <strong>data</strong> &#x4E2D;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x4E3A; <strong>show</strong>&#xFF0C;&#x521D;&#x59CB;&#x503C;&#x4E3A; false&#xFF0C;&#x6765;&#x8868;&#x793A;&#x4E0B;&#x62C9;&#x5217;&#x8868;&#x4E3A;&#x9690;&#x85CF;&#x72B6;&#x6001;</li><li>&#x5728;&#x6A21;&#x677F;&#x4E0A;&#x4F7F;&#x7528;&#x6307;&#x4EE4; <strong>v-show=&quot;show&quot;</strong> &#x63A7;&#x5236; <strong>DOM</strong> &#x7684;&#x663E;&#x793A;&#x9690;&#x85CF;</li><li>&#x7ED9; <strong>p</strong> &#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#xFF0C;&#x5207;&#x6362; <strong>show</strong> &#x7684;&#x503C;&#xFF0C;&#x4E00;&#x65E6;&#x6539;&#x53D8;&#xFF0C;&#x81EA;&#x52A8;&#x66F4;&#x65B0; <strong>DOM</strong> &#x5230;&#x5BF9;&#x5E94;&#x72B6;&#x6001;&#x4E0A;&#xFF0C;&#x4E5F;&#x5C31;&#x662F; true &#x663E;&#x793A;&#xFF0C;false &#x9690;&#x85CF;</li></ol><p><strong>Vuejs</strong> &#x8FD9;&#x4E2A;&#x6846;&#x67B6;&#x8981;&#x505A;&#x7684;&#x5C31;&#x662F;&#x72B6;&#x6001;&#x548C;UI&#x4FDD;&#x6301;&#x540C;&#x6B65;&#x3002;</p><h2 id="articleHeader3">&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;</h2><p>&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x987E;&#x540D;&#x601D;&#x4E49;&#x5C31;&#x662F;&#x5355;&#x65B9;&#x5411;&#x7684;&#x6570;&#x636E;&#x6D41;&#x5411;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6570;&#x636E;&#x53EA;&#x80FD;&#x4ECE;&#x4E00;&#x8FB9;&#x6D41;&#x5411;&#x53E6;&#x4E00;&#x8FB9;&#xFF0C;&#x53CD;&#x8FC7;&#x6765;&#x5219;&#x4E0D;&#x884C;&#xFF0C;&#x5982;&#x9EC4;&#x6CB3;&#x4E4B;&#x6C34;&#x4ECE;&#x5929;&#x4E0A;&#x6765;&#xFF0C;&#x5374;&#x4E0D;&#x80FD;&#x518D;&#x6D41;&#x56DE;&#x5230;&#x5929;&#x4E0A;&#x53BB;&#x3002;&#x5177;&#x4F53;&#x5230;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x5C31;&#x662F;&#xFF1A;&#x7236;&#x5B50; prop &#x4E4B;&#x95F4;&#x5F62;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x5355;&#x5411;&#x4E0B;&#x884C;&#x7ED1;&#x5B9A;&#xFF1A;&#x7236;&#x7EA7; prop &#x7684;&#x66F4;&#x65B0;&#x4F1A;&#x5411;&#x4E0B;&#x6D41;&#x52A8;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x6539;&#x53D8;&#x4E0D;&#x80FD;&#x6539;&#x53D8;&#x7236;&#x7EC4;&#x4EF6;&#x3002;&#x8FD9;&#x6837;&#x8BBE;&#x8BA1;&#x7684;&#x76EE;&#x7684;&#x662F;&#x9632;&#x6B62;&#x4ECE;&#x5B50;&#x7EC4;&#x4EF6;&#x610F;&#x5916;&#x6539;&#x53D8;&#x7236;&#x7EA7;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x4ECE;&#x800C;&#x5BFC;&#x81F4;&#x5E94;&#x7528;&#x7684;&#x6570;&#x636E;&#x6D41;&#x5411;&#x96BE;&#x4EE5;&#x7406;&#x89E3;&#x3002;</p><p>&#x4E0E;&#x4E4B;&#x5BF9;&#x5E94;&#x7684;&#x5C31;&#x662F;&#x53CC;&#x5411;&#x6570;&#x636E;&#x6D41;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x5B50;&#x7EC4;&#x4EF6;&#x90FD;&#x53EF;&#x4EE5;&#x4EFB;&#x610F;&#x4FEE;&#x6539;&#xFF0C;&#x4E92;&#x76F8;&#x4EA7;&#x751F;&#x5F71;&#x54CD;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#x4F7F;&#x7528;&#x8FD9;&#x5957;&#x6570;&#x636E;&#x7684;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#x4E5F;&#x4F1A;&#x8DDF;&#x7740;&#x53D8;&#x5316;&#xFF0C;&#x53D8;&#x5F97;&#x975E;&#x5E38;&#x7684;&#x8BE1;&#x5F02;&#x3002;</p><p>&#x5728;&#x590D;&#x6742;&#x7684;&#x5E94;&#x7528;&#x4E2D;&#xFF0C;&#x63A7;&#x5236;&#x6570;&#x636E;&#x6709;&#x89C4;&#x5219;&#x7684;&#x6539;&#x53D8;&#x548C;&#x4F20;&#x9012;&#x975E;&#x5E38;&#x91CD;&#x8981;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x662F;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x7684;&#x9650;&#x5236;&#xFF0C;&#x4EFB;&#x4F55;&#x7EC4;&#x4EF6;&#x90FD;&#x80FD;&#x4FEE;&#x6539;&#x6570;&#x636E;&#xFF0C;&#x5C31;&#x8DDF;&#x5B9A;&#x4E49;&#x5168;&#x5C40;&#x7684;&#x6570;&#x636E;&#x5728;&#x4EFB;&#x4F55;&#x7A0B;&#x5E8F;&#x90FD;&#x80FD;&#x4FEE;&#x6539;&#x4E00;&#x6837;&#xFF0C;&#x6700;&#x7EC8;&#x7ECF;&#x8FC7;&#x591A;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x4FEE;&#x6539;&#x540E;&#xFF0C;&#x51FA;&#x73B0;&#x4E86;&#x95EE;&#x9898;&#xFF0C;&#x4E0D;&#x80FD;&#x51C6;&#x786E;&#x7684;&#x5B9A;&#x4F4D;&#x5230;&#x5177;&#x4F53;&#x7684;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x6392;&#x67E5;&#x95EE;&#x9898;&#x4F1A;&#x53D8;&#x7684;&#x975E;&#x5E38;&#x7684;&#x56F0;&#x96BE;&#x3002;</p><p>&#x6BCF;&#x6B21;&#x7236;&#x7EA7;&#x7EC4;&#x4EF6;&#x53D1;&#x751F;&#x66F4;&#x65B0;&#x65F6;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x6240;&#x6709;&#x7684; prop &#x90FD;&#x5C06;&#x4F1A;&#x5237;&#x65B0;&#x4E3A;&#x6700;&#x65B0;&#x7684;&#x503C;&#x3002;&#x7531;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x4E0D;&#x80FD;&#x6539;&#x53D8; prop&#x3002;&#x5982;&#x679C;&#x4F60;&#x8FD9;&#x6837;&#x505A;&#x4E86;&#xFF0C;Vue &#x4F1A;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x63A7;&#x5236;&#x53F0;&#x4E2D;&#x53D1;&#x51FA;&#x8B66;&#x544A;&#x3002;</p><p>&#x6765;&#x4E2A;&#x4F8B;&#x5B50;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;&#x3002;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x9700;&#x8981;&#x5728;&#x4E0B;&#x62C9;&#x6846;&#x4E2D;&#x9009;&#x62E9;&#x5177;&#x4F53;&#x7684;&#x7684;&#x4E00;&#x9879;&#xFF0C;&#x663E;&#x793A;&#x5728; <strong>p</strong>&#x6807;&#x7B7E;&#x4E2D;&#xFF0C;&#x8981;&#x663E;&#x793A;&#x7684;&#x6570;&#x636E;&#x662F;&#x901A;&#x8FC7;&#x5916;&#x754C;&#x4F20;&#x9012;&#x7684; <strong>selectIndex</strong> &#x6765;&#x51B3;&#x5B9A;&#x4ECE; <strong>list</strong> &#x4E2D;&#x9009;&#x53D6;&#x54EA;&#x4E00;&#x9879;&#x3002;&#x90A3;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x6765;&#x505A;&#xFF0C;&#x5728;&#x70B9;&#x51FB;&#x4E0B;&#x62C9;&#x6846;&#x7684;&#x67D0;&#x4E00;&#x9879;&#x65F6;&#xFF0C;&#x6539;&#x53D8; <strong>selectIndex</strong> &#x4E3A;&#x70B9;&#x51FB;&#x7684;&#x4E00;&#x9879;&#x7684;&#x4E0B;&#x6807;&#x5373;&#x53EF;&#xFF0C;&#x5177;&#x4F53;&#x5982;&#x4E0B;&#xFF1A;</p><p>HTML &#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;!-- &#x57CE;&#x5E02;&#x7684;&#x4E0B;&#x62C9; --&gt;
    &lt;custome-select 
        title=&quot;&#x8BF7;&#x9009;&#x62E9;&#x57CE;&#x5E02;&quot; 
        :list=&quot;[&apos;&#x5317;&#x4EAC;&apos;,&apos;&#x4E0A;&#x6D77;&apos;,&apos;&#x676D;&#x5DDE;&apos;]&quot; 
        :select-index=&quot;0&quot;
    &gt;&lt;/custome-select&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x57CE;&#x5E02;&#x7684;&#x4E0B;&#x62C9; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">custome-select</span> 
        <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;&#x8BF7;&#x9009;&#x62E9;&#x57CE;&#x5E02;&quot;</span> 
        <span class="hljs-attr">:list</span>=<span class="hljs-string">&quot;[&apos;&#x5317;&#x4EAC;&apos;,&apos;&#x4E0A;&#x6D77;&apos;,&apos;&#x676D;&#x5DDE;&apos;]&quot;</span> 
        <span class="hljs-attr">:select-index</span>=<span class="hljs-string">&quot;0&quot;</span>
    &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">custome-select</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre><p>JavaScript&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;custome-select&apos;,{
    props:{
        // &#x7701;&#x7565;&#x4E86;title&#x548C;list....
        selectIndex:{
            type: Number,
            default:0
        }
    },
    data(){
        return {
            show: false  // &#x4E00;&#x5F00;&#x59CB;&#x72B6;&#x6001;&#x4E3A;false&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E0D;&#x663E;&#x793A;&#x4E0B;&#x62C9;&#x5217;&#x8868;
        }
    },
    template: `
        &lt;div class=&quot;select&quot;&gt;
            &lt;h2&gt;{{title}}&lt;/h2&gt;
            &lt;p @click=&quot;toggleShow&quot;&gt;&#x8BF7;&#x9009;&#x62E9;&#xFF1A;{{list[selectIndex]}}&lt;/p&gt;
            &lt;ul v-show=&quot;show&quot;&gt;
                &lt;li 
                    v-for=&quot;item,index in list&quot;
                    :key=&quot;index&quot;
                    @click=&quot;changeIndex(index)&quot;
                &gt;
                    {{item}}
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    `,
    methods:{
        toggleShow(){
            this.show = !this.show;
        },
        changeIndex(index){
            // &#x6539;&#x53D8;&#x4E3A;&#x9009;&#x4E2D;&#x7684;&#x4E0B;&#x6807;&#xFF0C;&#x6B64;&#x65F6;&#x4F1A;&#x62A5;&#x9519;
            this.selectIndex = index;
        }
    }
})

new Vue({
    el: &apos;#app&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>Vue.component(<span class="hljs-string">&apos;custome-select&apos;</span>,{
    props:{
        <span class="hljs-comment">// &#x7701;&#x7565;&#x4E86;title&#x548C;list....</span>
        selectIndex:{
            type: Number,
            <span class="hljs-keyword">default</span>:<span class="hljs-number">0</span>
        }
    },
    <span class="hljs-keyword">data</span>(){
        <span class="hljs-keyword">return</span> {
            show: <span class="hljs-literal">false</span>  <span class="hljs-comment">// &#x4E00;&#x5F00;&#x59CB;&#x72B6;&#x6001;&#x4E3A;false&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E0D;&#x663E;&#x793A;&#x4E0B;&#x62C9;&#x5217;&#x8868;</span>
        }
    },
    template: `
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>=&quot;<span class="hljs-title">select</span>&quot;&gt;</span>
            &lt;h2&gt;{{title}}&lt;/h2&gt;
            &lt;p <span class="hljs-meta">@click</span>=<span class="hljs-string">&quot;toggleShow&quot;</span>&gt;&#x8BF7;&#x9009;&#x62E9;&#xFF1A;{{list[selectIndex]}}&lt;/p&gt;
            &lt;ul v-show=<span class="hljs-string">&quot;show&quot;</span>&gt;
                &lt;li 
                    v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;item,index in list&quot;</span>
                    :key=<span class="hljs-string">&quot;index&quot;</span>
                    <span class="hljs-meta">@click</span>=<span class="hljs-string">&quot;changeIndex(index)&quot;</span>
                &gt;
                    {{item}}
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    `,
    methods:{
        toggleShow(){
            <span class="hljs-keyword">this</span>.show = !<span class="hljs-keyword">this</span>.show;
        },
        changeIndex(index){
            <span class="hljs-comment">// &#x6539;&#x53D8;&#x4E3A;&#x9009;&#x4E2D;&#x7684;&#x4E0B;&#x6807;&#xFF0C;&#x6B64;&#x65F6;&#x4F1A;&#x62A5;&#x9519;</span>
            <span class="hljs-keyword">this</span>.selectIndex = index;
        }
    }
})

new Vue({
    el: <span class="hljs-string">&apos;#app&apos;</span>
})</code></pre><p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#xFF1A;</p><ol><li>&#x63A5;&#x6536;&#x5916;&#x754C;&#x4F20;&#x5165;&#x7684; selecteIndex&#xFF0C;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x9009;&#x62E9;&#x5BF9;&#x5E94;&#x7684;&#x503C;{{list[selectIndex]}}</li><li>&#x7ED9;&#x4E0B;&#x62C9;&#x6846;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#xFF0C;&#x5E76;&#x4F20;&#x9012;&#x5404;&#x81EA;&#x7684;&#x4E0B;&#x6807;</li><li>&#x4F20;&#x9012;&#x4E0B;&#x6807;&#x7ED9;&#x5230; <strong>changeIndex</strong> &#x51FD;&#x6570;&#xFF0C;&#x6539;&#x53D8;selectIndex&#x7684;&#x503C;</li><li>&#x63A7;&#x5236;&#x53F0;&#x62A5;&#x9519;&#xFF1A;[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop&apos;s value. Prop being mutated: &quot;selectIndex&quot;&#x5927;&#x81F4;&#x7684;&#x610F;&#x601D;&#x662F;&#xFF1A;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x7EC4;&#x4EF6;&#x7684;props&#x503C;&#xFF0C;&#x5F53;&#x7236;&#x7EC4;&#x4EF6;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x65F6;&#x5019;&#x4F1A;&#x91CD;&#x5199;&#x8FD9;&#x4E2A;&#x3002;&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;data&#x6216;&#x8005;computed&#x5C5E;&#x6027;&#x6765;&#x4EE3;&#x66FF;&#x4FEE;&#x6539;prop&#x7684;&#x503C;&#x3002;</li></ol><p>&#x4EE5;&#x4E0A;&#x7684;&#x62A5;&#x9519;&#x5DF2;&#x7ECF;&#x8B66;&#x544A;&#x4E86;&#xFF0C;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x4FEE;&#x6539;props&#x7684;&#x503C;&#xFF0C;&#x4F46;&#x662F;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x662F;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x6570;&#x636E; data &#xFF0C;&#x6240;&#x4EE5;&#x4FEE;&#x6539;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5176;&#x4ED6;&#x4EE3;&#x7801;&#x7701;&#x7565;
Vue.component(&apos;custome-select&apos;,{
    data(){
        return {
            currentIndex: this.selectIndex // &#x628A;selectIndex&#x4F5C;&#x4E3A;currentIndex&#x7684;&#x521D;&#x59CB;&#x503C;
        }
    },
    template: `
        &lt;div class=&quot;select&quot;&gt;
            &lt;h2&gt;{{title}}&lt;/h2&gt;
            &lt;p @click=&quot;toggleShow&quot;&gt;&#x8BF7;&#x9009;&#x62E9;&#xFF1A;{{list[currentIndex]}}&lt;/p&gt;
            &lt;ul v-show=&quot;show&quot;&gt;
                &lt;li 
                    v-for=&quot;item,index in list&quot;
                    :key=&quot;index&quot;
                    @click=&quot;changeIndex(index)&quot;
                &gt;
                    {{item}}
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    `,
    methods:{
        changeIndex(index){
            // &#x6539;&#x53D8;&#x81EA;&#x5DF1;&#x5185;&#x90E8;&#x72B6;&#x6001;currentIndex
            this.currentIndex = index;
        }
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// &#x5176;&#x4ED6;&#x4EE3;&#x7801;&#x7701;&#x7565;</span>
Vue.component(<span class="hljs-string">&apos;custome-select&apos;</span>,{
    <span class="hljs-keyword">data</span>(){
        <span class="hljs-keyword">return</span> {
            currentIndex: <span class="hljs-keyword">this</span>.selectIndex <span class="hljs-comment">// &#x628A;selectIndex&#x4F5C;&#x4E3A;currentIndex&#x7684;&#x521D;&#x59CB;&#x503C;</span>
        }
    },
    template: `
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>=&quot;<span class="hljs-title">select</span>&quot;&gt;</span>
            &lt;h2&gt;{{title}}&lt;/h2&gt;
            &lt;p <span class="hljs-meta">@click</span>=<span class="hljs-string">&quot;toggleShow&quot;</span>&gt;&#x8BF7;&#x9009;&#x62E9;&#xFF1A;{{list[currentIndex]}}&lt;/p&gt;
            &lt;ul v-show=<span class="hljs-string">&quot;show&quot;</span>&gt;
                &lt;li 
                    v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;item,index in list&quot;</span>
                    :key=<span class="hljs-string">&quot;index&quot;</span>
                    <span class="hljs-meta">@click</span>=<span class="hljs-string">&quot;changeIndex(index)&quot;</span>
                &gt;
                    {{item}}
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    `,
    methods:{
        changeIndex(index){
            <span class="hljs-comment">// &#x6539;&#x53D8;&#x81EA;&#x5DF1;&#x5185;&#x90E8;&#x72B6;&#x6001;currentIndex</span>
            <span class="hljs-keyword">this</span>.currentIndex = index;
        }
    }
})</code></pre><p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x5206;&#x6790;&#xFF1A;</p><ol><li>&#x5728; data &#x4E2D;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x72B6;&#x6001;currentIndex&#xFF0C;&#x5C06;props&#x4E2D;&#x7684;selectIndex&#x7684;&#x503C;&#xFF0C;&#x4F5C;&#x4E3A;currentIndex&#x7684;&#x521D;&#x59CB;&#x503C;</li><li>&#x4FEE;&#x6539;&#x6A21;&#x677F;&#x4E2D;&#x53D6;&#x503C;&#x7684;selectIndex&#x4E3A;currentIndex</li><li>&#x70B9;&#x51FB;&#x6539;&#x53D8;currentIndex&#xFF0C;&#x6B64;&#x65F6;&#x4FEE;&#x6539;&#x7684;&#x662F;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x72B6;&#x6001;&#xFF0C;&#x4E0D;&#x662F;props&#x7684;&#x503C;&#xFF0C;&#x4FEE;&#x6539;&#x6210;&#x529F;</li></ol><p>&#x4ECE;&#x4EE5;&#x4E0A;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x6765;&#xFF0C;<strong>data</strong> &#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x5C31;&#x662F;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x72B6;&#x6001;&#xFF0C;&#x53EA;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x66F4;&#x6539;&#xFF0C;&#x800C;&#x4F20;&#x9012;&#x7684; <strong>props</strong> &#x4E0D;&#x80FD;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x4FEE;&#x6539;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8D4B;&#x503C;&#x7ED9;<strong>data</strong>&#xFF0C;&#x4FEE;&#x6539;<strong>data</strong>&#x7684;&#x503C;&#x6765;&#x66F4;&#x65B0;&#x7EC4;&#x4EF6;&#x81EA;&#x8EAB;&#x7684;&#x72B6;&#x6001;&#x3002;</p><h2 id="articleHeader4">&#x7236;&#x7EC4;&#x4EF6;&#x76D1;&#x542C;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x53D1;&#x5E03;</h2><p>&#x4E0A;&#x9762;&#x8BF4;&#x7684;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9A;&#x5236;&#x6570;&#x636E;&#x4F20;&#x9012; props&#xFF0C;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x4F1A;&#x4EA7;&#x751F;&#x4E00;&#x4E9B;&#x4EA4;&#x4E92;&#x3002;</p><p>&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x4EA4;&#x4E92;&#x4E00;&#x65E6;&#x53D1;&#x751F;&#x540E;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x662F;&#x9700;&#x8981;&#x6839;&#x636E;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x4EA4;&#x4E92;&#x4F1A;&#x4EA7;&#x751F;&#x4E00;&#x4E9B;&#x5F71;&#x54CD;&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x53D8;&#x989C;&#x8272;&#xFF0C;&#x663E;&#x793A;&#x6587;&#x5B57;&#x7B49;&#x3002;&#x7236;&#x7EC4;&#x4EF6;&#x8FD9;&#x4E9B;&#x53D8;&#x6362;&#x53C8;&#x4E0D;&#x80FD;&#x5199;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x4EA4;&#x4E92;&#x4E2D;&#xFF0C;&#x56E0;&#x4E3A;&#x5B50;&#x7EC4;&#x4EF6;&#x662F;&#x901A;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x4E00;&#x65E6;&#x5199;&#x4E86;&#x67D0;&#x4E2A;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#xFF0C;&#x53EA;&#x80FD;&#x548C;&#x8FD9;&#x4E2A;&#x7236;&#x7EC4;&#x4EF6;&#x7ED1;&#x5B9A;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x5728;&#x522B;&#x7684;&#x5730;&#x65B9;&#x4E86;&#x4E86;&#xFF0C;&#x6B64;&#x65F6;&#x7EC4;&#x4EF6;&#x4E0D;&#x80FD;&#x8FBE;&#x5230;&#x901A;&#x7528;&#x7684;&#x76EE;&#x7684;&#x3002;</p><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;<br>&#x4EE5;&#x4E0B;&#x4F7F;&#x7528;&#x4E86;&#x4E24;&#x6B21; <strong>custome-select</strong> &#x7EC4;&#x4EF6;&#xFF0C;&#x5F53;&#x70B9;&#x51FB;&#x7B2C;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x4E0B;&#x62C9;&#x6846;&#x67D0;&#x4E00;&#x9879;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x6539;&#x53D8; class &#x4E3A; test1 &#x7684;div &#x6837;&#x5F0F;&#x4E3A; red &#x8272;&#x3002;&#x5F53;&#x70B9;&#x51FB;&#x7B2C;&#x4E8C;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x4E0B;&#x62C9;&#x6846;&#x67D0;&#x4E00;&#x9879;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x6539;&#x53D8; class &#x4E3A; test2 &#x7684;div &#x6837;&#x5F0F;&#x4E3A; blue &#x8272;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;!-- &#x57CE;&#x5E02;&#x7684;&#x4E0B;&#x62C9; --&gt;
    &lt;div class=&quot;test1&quot; :style=&quot;{color: color1}&quot;&gt;&#x7B2C;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&lt;/div&gt;
    &lt;custome-select 
        title=&quot;&#x8BF7;&#x9009;&#x62E9;&#x57CE;&#x5E02;&quot; 
        :list=&quot;[&apos;&#x5317;&#x4EAC;&apos;,&apos;&#x4E0A;&#x6D77;&apos;,&apos;&#x676D;&#x5DDE;&apos;]&quot; 
        :select-index=&quot;0&quot;&gt;
    &lt;/custome-select&gt;
    &lt;!-- &#x7528;&#x6237;&#x7684;&#x4E0B;&#x62C9; --&gt;
    &lt;div class=&quot;test2&quot; :style=&quot;{color: color2}&quot;&gt;&#x7B2C;&#x4E8C;&#x4E2A;&#x9700;&#x6C42;&lt;/div&gt;
    &lt;custome-select 
        title=&quot;&#x8BF7;&#x9009;&#x62E9;&#x7528;&#x6237;&quot; 
        :list=&quot;[&apos;&#x5F20;&#x4E09;&apos;,&apos;&#x674E;&#x56DB;&apos;,&apos;&#x738B;&#x4E94;&apos;]&quot; 
        :select-index=&quot;1&quot;&gt;
    &lt;/custome-select&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x57CE;&#x5E02;&#x7684;&#x4E0B;&#x62C9; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;test1&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{color: color1}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span>&#x7B2C;&#x4E00;&#x4E2A;&#x9700;&#x6C42;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">custome-select</span> 
        <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;&#x8BF7;&#x9009;&#x62E9;&#x57CE;&#x5E02;&quot;</span> 
        <span class="hljs-attr">:list</span>=<span class="hljs-string">&quot;[&apos;&#x5317;&#x4EAC;&apos;,&apos;&#x4E0A;&#x6D77;&apos;,&apos;&#x676D;&#x5DDE;&apos;]&quot;</span> 
        <span class="hljs-attr">:select-index</span>=<span class="hljs-string">&quot;0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">custome-select</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x7528;&#x6237;&#x7684;&#x4E0B;&#x62C9; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;test2&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{color: color2}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span>&#x7B2C;&#x4E8C;&#x4E2A;&#x9700;&#x6C42;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">custome-select</span> 
        <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;&#x8BF7;&#x9009;&#x62E9;&#x7528;&#x6237;&quot;</span> 
        <span class="hljs-attr">:list</span>=<span class="hljs-string">&quot;[&apos;&#x5F20;&#x4E09;&apos;,&apos;&#x674E;&#x56DB;&apos;,&apos;&#x738B;&#x4E94;&apos;]&quot;</span> 
        <span class="hljs-attr">:select-index</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">custome-select</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><p>&#x4F7F;&#x7528;&#x4E86;&#x4E24;&#x6B21;&#x7EC4;&#x4EF6;&#xFF0C;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x70B9;&#x51FB;&#x4E0B;&#x62C9;&#x6846;&#x65F6;&#x4E0D;&#x80FD;&#x5199;&#x5177;&#x4F53;&#x7684;&#x5904;&#x7406;&#x7B2C;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#x8FD8;&#x662F;&#x7B2C;&#x4E8C;&#x4E2A;&#x9700;&#x6C42;&#x3002;&#x800C;&#x662F;&#x4EA4;&#x5230;&#x5916;&#x90E8;&#x7684;&#x7236;&#x7EC4;&#x4EF6;&#x6765;&#x51B3;&#x5B9A;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x7236;&#x7EC4;&#x4EF6;&#x5C31;&#x9700;&#x8981;&#x77E5;&#x9053;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x662F;&#x5426;&#x70B9;&#x51FB;&#x4E86;&#x4E0B;&#x62C9;&#x6846;&#x3002;&#x800C;&#x70B9;&#x51FB;&#x4E0B;&#x62C9;&#x6846;&#x8FD9;&#x4E2A;&#x52A8;&#x4F5C;&#x662F;&#x7531;&#x7528;&#x6237;&#x89E6;&#x53D1;&#x7684;&#xFF0C;&#x4E0D;&#x77E5;&#x4F55;&#x65F6;&#x4F1A;&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#xFF0C;&#x90A3;&#x600E;&#x4E48;&#x529E;&#x5462;&#xFF1F;<br>&#x8DDF;&#x539F;&#x751F;&#x7684;&#x5143;&#x7D20;&#x5904;&#x7406;&#x601D;&#x8DEF;&#x4E00;&#x6837;&#xFF0C;&#x5047;&#x5B9A;&#x4EE5;&#x540E;&#x7528;&#x6237;&#x70B9;&#x51FB;&#x4E86;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x540E;&#xFF0C;&#x9700;&#x8981;&#x6539;&#x53D8;&#x9875;&#x9762;&#x4E2D;&#x6837;&#x5F0F;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x9700;&#x8981;&#x76D1;&#x63A7;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF0C;&#x53EA;&#x8981;&#x7528;&#x6237;&#x70B9;&#x51FB;&#x4E86;&#xFF0C;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x5199;&#x5177;&#x4F53;&#x6539;&#x53D8;&#x6837;&#x5F0F;&#x8FD9;&#x4E2A;&#x52A8;&#x4F5C;&#x3002;<br>HTML&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;button onclick=&quot;handle()&quot;&gt;&#x6309;&#x94AE;&lt;/button&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs hsp"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-keyword">button</span> <span class="hljs-keyword">onclick</span>=<span class="hljs-string">&quot;handle()&quot;</span>&gt;&#x6309;&#x94AE;&lt;/<span class="hljs-keyword">button</span>&gt;</code></pre><p>JavaScript&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    // &#x5168;&#x5C40;&#x8BBE;&#x7F6E;&#x51FD;&#x6570;
    function handle(){
        document.body.style.background = &apos;red&apos;    
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// &#x5168;&#x5C40;&#x8BBE;&#x7F6E;&#x51FD;&#x6570;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">document</span>.body.style.background = <span class="hljs-string">&apos;red&apos;</span>    
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x662F; <strong>DOM0</strong> &#x7EA7;&#x65F6;&#x4EE3;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x76F4;&#x63A5;&#x5728;&#x884C;&#x95F4;&#x5199;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#xFF0C;&#x8FD9;&#x6837;&#x5199;&#x66F4;&#x76F4;&#x89C2;&#x3002;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x5F53;&#x6709;&#x7528;&#x6237;&#x70B9;&#x51FB;&#x4E86;&#x6309;&#x94AE;&#x4E00;&#x4E0B;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5185;&#x90E8;&#x5C31;&#x4F1A;&#x53D1;&#x5E03;&#x4E00;&#x4E2A; <strong>click</strong> &#x4E8B;&#x4EF6;&#xFF0C;&#x800C;&#x6B63;&#x597D;&#x6211;&#x4EEC;&#x5728;&#x5143;&#x7D20;&#x4E0A;&#x76D1;&#x542C;&#x4E86; <strong>click</strong> &#x4E8B;&#x4EF6;&#xFF0C;&#x5C31;&#x4F1A;&#x628A;&#x5BF9;&#x5E94;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#x89E6;&#x53D1;&#xFF0C;&#x4ECE;&#x800C;&#x8FBE;&#x5230;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x76EE;&#x7684;&#xFF0C;&#x5BF9;&#x9875;&#x9762;&#x505A;&#x51FA;&#x4E00;&#x4E9B;&#x53D8;&#x5316;&#x3002;</p><p>&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x4F7F;&#x7528;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#xFF0C;&#x6B64;&#x65F6;&#x5916;&#x754C;&#x9700;&#x8981;&#x77E5;&#x9053;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x53D1;&#x751F;&#x4E86;&#x7684;&#x4EA4;&#x4E92;&#xFF0C;&#x90A3;&#x4E48;&#x601D;&#x8DEF;&#x4E00;&#x81F4;&#xFF0C;&#x4E5F;&#x9700;&#x8981;&#x5728;&#x884C;&#x95F4;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#xFF0C;&#x4E0D;&#x8FC7;&#x6B64;&#x4E8B;&#x4EF6;&#x540D;&#x5B57;&#x4E0D;&#x9650;&#x4E8E;&#x662F; <strong>w3c</strong> &#x89C4;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;&#x540D;&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x540D;&#xFF0C;&#x7ED3;&#x5408; <strong>Vue</strong> &#x4E2D;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;!-- &#x57CE;&#x5E02;&#x7684;&#x4E0B;&#x62C9; --&gt;
    &lt;div class=&quot;test1&quot; :style=&quot;{color: color1}&quot;&gt;&#x7B2C;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&lt;/div&gt;
    &lt;custome-select 
        title=&quot;&#x8BF7;&#x9009;&#x62E9;&#x57CE;&#x5E02;&quot; 
        :list=&quot;[&apos;&#x5317;&#x4EAC;&apos;,&apos;&#x4E0A;&#x6D77;&apos;,&apos;&#x676D;&#x5DDE;&apos;]&quot; 
        :select-index=&quot;0&quot;
        @click-option=&quot;changeTest1Handle&quot;
    &gt;
    &lt;/custome-select&gt;
    &lt;!-- &#x7528;&#x6237;&#x7684;&#x4E0B;&#x62C9; --&gt;
    &lt;div class=&quot;test2&quot; :style=&quot;{color: color2}&quot;&gt;&#x7B2C;&#x4E8C;&#x4E2A;&#x9700;&#x6C42;&lt;/div&gt;
    &lt;custome-select 
        title=&quot;&#x8BF7;&#x9009;&#x62E9;&#x7528;&#x6237;&quot; 
        :list=&quot;[&apos;&#x5F20;&#x4E09;&apos;,&apos;&#x674E;&#x56DB;&apos;,&apos;&#x738B;&#x4E94;&apos;]&quot; 
        :select-index=&quot;1&quot;
        @click-option=&quot;changeTest2Handle&quot;
    &gt;
    &lt;/custome-select&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x57CE;&#x5E02;&#x7684;&#x4E0B;&#x62C9; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;test1&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{color: color1}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span>&#x7B2C;&#x4E00;&#x4E2A;&#x9700;&#x6C42;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">custome-select</span> 
        <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;&#x8BF7;&#x9009;&#x62E9;&#x57CE;&#x5E02;&quot;</span> 
        <span class="hljs-attr">:list</span>=<span class="hljs-string">&quot;[&apos;&#x5317;&#x4EAC;&apos;,&apos;&#x4E0A;&#x6D77;&apos;,&apos;&#x676D;&#x5DDE;&apos;]&quot;</span> 
        <span class="hljs-attr">:select-index</span>=<span class="hljs-string">&quot;0&quot;</span>
        @<span class="hljs-attr">click-option</span>=<span class="hljs-string">&quot;changeTest1Handle&quot;</span>
    &gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">custome-select</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x7528;&#x6237;&#x7684;&#x4E0B;&#x62C9; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;test2&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{color: color2}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span>&#x7B2C;&#x4E8C;&#x4E2A;&#x9700;&#x6C42;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">custome-select</span> 
        <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;&#x8BF7;&#x9009;&#x62E9;&#x7528;&#x6237;&quot;</span> 
        <span class="hljs-attr">:list</span>=<span class="hljs-string">&quot;[&apos;&#x5F20;&#x4E09;&apos;,&apos;&#x674E;&#x56DB;&apos;,&apos;&#x738B;&#x4E94;&apos;]&quot;</span> 
        <span class="hljs-attr">:select-index</span>=<span class="hljs-string">&quot;1&quot;</span>
        @<span class="hljs-attr">click-option</span>=<span class="hljs-string">&quot;changeTest2Handle&quot;</span>
    &gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">custome-select</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><p>&#x628A;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#x5199;&#x5728;&#x9009;&#x9879;&#x5BF9;&#x8C61;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: &apos;#app&apos;,
    data: {
        color1: &apos;&apos;,
        color2: &apos;&apos;
    },
    methods: {
        // &#x7B2C;&#x4E00;&#x4E2A;&#x9700;&#x6C42;
        changeTest1Handle(){
            this.color1 = &apos;red&apos;;
        },
        // &#x7B2C;&#x4E8C;&#x4E2A;&#x9700;&#x6C42;
        changeTest2Handle(){
            this.color2 = &apos;blue&apos;;
        }
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>new Vue({
    el: <span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-keyword">data</span>: {
        color1: <span class="hljs-string">&apos;&apos;</span>,
        color2: <span class="hljs-string">&apos;&apos;</span>
    },
    methods: {
        <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x4E2A;&#x9700;&#x6C42;</span>
        changeTest1Handle(){
            <span class="hljs-keyword">this</span>.color1 = <span class="hljs-string">&apos;red&apos;</span>;
        },
        <span class="hljs-comment">// &#x7B2C;&#x4E8C;&#x4E2A;&#x9700;&#x6C42;</span>
        changeTest2Handle(){
            <span class="hljs-keyword">this</span>.color2 = <span class="hljs-string">&apos;blue&apos;</span>;
        }
    }
})</code></pre><p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x51C6;&#x5907;&#x5B8C;&#x6BD5;&#xFF0C;&#x53BB;&#x70B9;&#x51FB;&#x4E0B;&#x62C9;&#x9009;&#x9879;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x89E6;&#x53D1;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x5B8C;&#x6210;&#x9700;&#x6C42;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;<br>&#x5728;&#x539F;&#x751F;&#x5143;&#x7D20;&#x4E0A;&#x5728;&#x884C;&#x95F4;&#x76D1;&#x63A7;&#x4E8B;&#x4EF6;&#xFF0C;&#x7528;&#x6237;&#x70B9;&#x51FB;&#x5143;&#x7D20;&#x540E;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x53D1;&#x5E03; <strong>click</strong> &#x4E8B;&#x4EF6;&#x3002;&#x800C;&#x73B0;&#x5728;&#x6362;&#x505A;&#x662F;&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x6765;&#x76D1;&#x63A7;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x4EA7;&#x751F;&#x7684;&#x4EA4;&#x4E92;&#xFF0C;&#x8FD9;&#x5C31;&#x9700;&#x8981;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x81EA;&#x5DF1;&#x53D1;&#x5E03;&#x8FD9;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x5426;&#x5219;&#x76D1;&#x63A7;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x662F;&#x65E0;&#x6548;&#x7684;&#x3002;</p><p>&#x90A3;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x53D1;&#x5E03;&#x4E8B;&#x4EF6;&#x5462;&#xFF1F;&#x5C31;&#x662F;&#x5728;&#x7528;&#x6237;&#x70B9;&#x51FB;&#x4E86;&#x4E0B;&#x62C9;&#x6846;&#x7684;&#x9009;&#x9879;&#x65F6;&#x5019;&#x53D1;&#x5E03;&#x8FD9;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x5373;&#x53EF;&#x3002;</p><p>&#x4F60;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x6765;&#x7406;&#x89E3;&#xFF0C;&#x76D1;&#x542C;&#x539F;&#x751F;&#x4E8B;&#x4EF6; <strong>click</strong> &#xFF0C;&#x53EA;&#x9700;&#x8981;&#x76D1;&#x542C;&#xFF0C;&#x5F00;&#x53D1;&#x8005;&#x65E0;&#x9700;&#x624B;&#x52A8;&#x7684;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x5185;&#x90E8;&#x5199;&#x53D1;&#x5E03;&#x4E8B;&#x4EF6;&#xFF0C;<strong>click</strong> &#x4E8B;&#x4EF6;&#x540D;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x7ED9;&#x5F00;&#x53D1;&#x8005;&#x7EA6;&#x5B9A;&#x7684;&#x540D;&#x5B57;&#x3002;&#x800C;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x8BBE;&#x8BA1;&#x5B50;&#x7EC4;&#x4EF6;&#x53D1;&#x5E03;&#x4E8B;&#x4EF6;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x76D1;&#x542C;&#x8FD9;&#x6837;&#x7684;&#x673A;&#x5236;&#x3002;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x5F00;&#x53D1;&#x8005;&#x81EA;&#x5DF1;&#x7EA6;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x540D;&#x5B57;&#x548C;&#x624B;&#x52A8;&#x7684;&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x53D1;&#x5E03;&#x4E8B;&#x4EF6;&#x3002;&#x5728; <strong>Vue</strong> &#x4E2D;&#x8FD9;&#x6837;&#x7684;&#x8BA2;&#x9605;/&#x53D1;&#x5E03;&#x6A21;&#x5F0F;&#x5DF2;&#x7ECF;&#x5199;&#x597D;&#xFF0C;&#x5F00;&#x53D1;&#x8005;&#x53EA;&#x9700;&#x8981;&#x8C03;&#x7528;&#x5373;&#x53EF;&#x3002;</p><p>&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x53D1;&#x5E03;&#x4E8B;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5176;&#x4ED6;&#x4EE3;&#x7801;&#x7701;&#x7565;
methods:{
    changeIndex(index){
        this.currentIndex = index;
        // &#x5728;&#x70B9;&#x51FB;&#x9009;&#x9879;&#x65F6;&#x5019;&#x4EA7;&#x751F;&#x4EA4;&#x4E92;&#xFF0C;&#x624B;&#x52A8;&#x53D1;&#x5E03;&#x4E8B;&#x4EF6;&#xFF0C;&#x901A;&#x77E5;&#x7236;&#x7EC4;&#x4EF6;
        this.$emit(&apos;click-option&apos;)&#xFF1B;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs axapta"><code><span class="hljs-comment">// &#x5176;&#x4ED6;&#x4EE3;&#x7801;&#x7701;&#x7565;</span>
methods:{
    changeIndex(<span class="hljs-keyword">index</span>){
        <span class="hljs-keyword">this</span>.currentIndex = <span class="hljs-keyword">index</span>;
        <span class="hljs-comment">// &#x5728;&#x70B9;&#x51FB;&#x9009;&#x9879;&#x65F6;&#x5019;&#x4EA7;&#x751F;&#x4EA4;&#x4E92;&#xFF0C;&#x624B;&#x52A8;&#x53D1;&#x5E03;&#x4E8B;&#x4EF6;&#xFF0C;&#x901A;&#x77E5;&#x7236;&#x7EC4;&#x4EF6;</span>
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;click-option&apos;</span>)&#xFF1B;
    }
}</code></pre><p>&#x5F53;&#x70B9;&#x51FB;&#x9009;&#x9879;&#x65F6;&#x5019;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F1A;&#x5B8C;&#x6210;&#x4E0D;&#x540C;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x6539;&#x53D8;&#x4E0D;&#x540C;&#x5143;&#x7D20;&#x7684;&#x989C;&#x8272;&#x3002;</p><p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x5B8C;&#x5168;&#x7684;&#x89E3;&#x8026;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x4E0D;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F9D;&#x7136;&#x53EF;&#x4EE5;&#x5DE5;&#x4F5C;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x4E0D;&#x4F7F;&#x7528;&#x5728;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5728;&#x4EFB;&#x610F;&#x5176;&#x4ED6;&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#x3002;&#x5982;&#x679C;&#x7236;&#x7EC4;&#x4EF6;&#x5173;&#x7CFB;&#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x9009;&#x4E2D;&#x4E0B;&#x62C9;&#x6846;&#x4E00;&#x9879;&#x8FD9;&#x4E2A;&#x4EA4;&#x4E92;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x76D1;&#x542C; <strong>click-option</strong>&#x8FD9;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#xFF0C;&#x4E0D;&#x5173;&#x5FC3;&#x5219;&#x4E0D;&#x76D1;&#x542C;&#x3002;</p><h2 id="articleHeader5">&#x603B;&#x7ED3;</h2><p>&#x4EE5;&#x4E0A;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x7684;&#x6765;&#x6E90;&#x6709;&#x4E24;&#x4E2A;&#xFF1A;</p><ul><li>&#x7EC4;&#x4EF6;&#x81EA;&#x8EAB;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5199;&#x5728; data &#x4E2D;</li><li>&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5199;&#x5728;props&#x4E2D;</li></ul><p>&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x901A;&#x4FE1;&#xFF1A;</p><ul><li>&#x7236; ---&gt; &#x5B50;&#xFF0C;&#x4F7F;&#x7528; props</li><li>&#x5B50; ---&gt; &#x7236;&#xFF0C;&#x8BA2;&#x9605;&#x53D1;&#x5E03;&#x6A21;&#x5F0F;</li></ul><p>&#x4EE5;&#x4E0A;&#x5C5E;&#x4E8E;&#x4E2A;&#x4EBA;&#x7406;&#x89E3;&#xFF0C;&#x5982;&#x6709;&#x504F;&#x5DEE;&#x6B22;&#x8FCE;&#x6307;&#x6B63;&#x5B66;&#x4E60;&#xFF0C;&#x8C22;&#x8C22;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解vue中的组件（二）

## 原文链接
[https://segmentfault.com/a/1190000016561020](https://segmentfault.com/a/1190000016561020)

