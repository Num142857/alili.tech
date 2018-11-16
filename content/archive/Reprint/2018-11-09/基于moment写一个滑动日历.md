---
title: 基于moment写一个滑动日历
hidden: true
categories: [reprint]
slug: 177bd834
date: 2018-11-09 02:30:06
---

{{< raw >}}
<p>&#x6548;&#x679C;&#x5982;&#x56FE;&#xFF08;&#x65E5;&#x671F;&#x53EF;&#x5DE6;&#x53F3;&#x6ED1;&#x52A8;&#xFF09;<br><span class="img-wrap"><img data-src="/img/bVbghzo?w=321&amp;h=112" src="https://static.alili.tech/img/bVbghzo?w=321&amp;h=112" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x601D;&#x8DEF;&#xFF1A;<br>1&#x3001;&#x5148;&#x5F97;&#x5230;&#x76F8;&#x90BB;&#x4E09;&#x4E2A;&#x5468;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x5BB9;&#x5668;&#x5411;&#x5DE6;&#x79FB;&#x52A8;&#x4E00;&#x4E2A;&#x89C6;&#x53E3;&#x7684;&#x8DDD;&#x79BB;&#xFF0C;&#x786E;&#x4FDD;&#x4E2D;&#x95F4;&#x5468;&#x5728;&#x53EF;&#x89C6;&#x8303;&#x56F4;&#xFF08;&#x5728;&#x53EF;&#x89C6;&#x8303;&#x56F4;&#x7684;&#x7D22;&#x5F15;&#x4E3A;1&#xFF09;<br>2&#x3001;&#x89E6;&#x6478;&#x79FB;&#x52A8;&#x9636;&#x6BB5;&#xFF0C;&#x6BD4;&#x5982;&#x5411;&#x5DE6;&#x79FB;&#x52A8;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x6539;&#x53D8;&#x53EF;&#x662F;&#x8303;&#x56F4;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;2&#xFF0C;&#x5373;&#x5411;&#x5DE6;&#x79FB;&#x52A8;&#x8FC7;&#x4E24;&#x4E2A;&#x89C6;&#x53E3;&#x7684;&#x8303;&#x56F4;<br>3&#x3001;&#x79FB;&#x52A8;&#x7ED3;&#x675F;&#xFF0C;&#x8FD9;&#x65F6;&#x53F3;&#x8FB9;&#x5DF2;&#x7ECF;&#x6CA1;&#x6709;&#x5F85;&#x663E;&#x793A;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x9700;&#x8981;&#x91CD;&#x7EC4;&#x6570;&#x636E;&#xFF0C;&#x518D;&#x5411;&#x540E;&#x52A0;&#x4E00;&#x5468;&#xFF0C;&#x4F7F;&#x5F53;&#x524D;&#x663E;&#x793A;&#x7684;&#x5468;&#x5728;&#x4E2D;&#x95F4;&#xFF0C;&#x540C;&#x65F6;&#x9700;&#x8981;&#x6539;&#x53D8;&#x663E;&#x793A;&#x7684;&#x7D22;&#x5F15;&#x4E3A;1</p><h2 id="articleHeader0">1&#x3001;&#x7528;<a href="http://momentjs.cn/docs/" rel="nofollow noreferrer" target="_blank">moment</a>&#x5904;&#x7406;&#x65E5;&#x671F;&#x6570;&#x636E;</h2><p>&#x5728;&#x5F53;&#x524D;&#x89C6;&#x53E3;&#x5185;&#x663E;&#x793A;&#x672C;&#x5468;&#x7684;7&#x5929;&#xFF0C;&#x7531;&#x4E8E;&#x9700;&#x8981;&#x6ED1;&#x52A8;&#xFF0C;&#x6240;&#x4EE5;&#x4E8B;&#x5148;&#x8FD8;&#x9700;&#x8981;&#x628A;&#x4ECA;&#x5929;&#x4EE5;&#x524D;&#x7684;&#x4E00;&#x5468;&#x548C;&#x4EE5;&#x540E;&#x7684;&#x4E00;&#x5468;&#x51C6;&#x5907;&#x597D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let today = moment().format(&apos;YYYY-MM-DD&apos;) // &#x5F53;&#x524D;&#x65E5;&#x671F;&#xFF1A;&quot;2018-09-14&quot;
moment(today).subtract(7, &apos;d&apos;).format(&apos;YYYY-MM-DD&apos;) // &#x4E0A;&#x4E00;&#x5468;&#x7684;&#x4ECA;&#x5929;&#xFF1A;&quot;2018-09-07&quot;
moment(today).add(7, &apos;d&apos;).format(&apos;YYYY-MM-DD&apos;) // &#x4E0B;&#x4E00;&#x5468;&#x7684;&#x4ECA;&#x5929;&#xFF1A;&quot;2018-09-21&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>let today = moment().format(<span class="hljs-string">&apos;YYYY-MM-DD&apos;</span>) <span class="hljs-comment">// &#x5F53;&#x524D;&#x65E5;&#x671F;&#xFF1A;&quot;2018-09-14&quot;</span>
<span class="hljs-function"><span class="hljs-title">moment</span><span class="hljs-params">(today)</span></span>.subtract(<span class="hljs-number">7</span>, <span class="hljs-string">&apos;d&apos;</span>).format(<span class="hljs-string">&apos;YYYY-MM-DD&apos;</span>) <span class="hljs-comment">// &#x4E0A;&#x4E00;&#x5468;&#x7684;&#x4ECA;&#x5929;&#xFF1A;&quot;2018-09-07&quot;</span>
<span class="hljs-function"><span class="hljs-title">moment</span><span class="hljs-params">(today)</span></span>.add(<span class="hljs-number">7</span>, <span class="hljs-string">&apos;d&apos;</span>).format(<span class="hljs-string">&apos;YYYY-MM-DD&apos;</span>) <span class="hljs-comment">// &#x4E0B;&#x4E00;&#x5468;&#x7684;&#x4ECA;&#x5929;&#xFF1A;&quot;2018-09-21&quot;</span></code></pre><p>&#x5F97;&#x5230;&#x6570;&#x7EC4;: dates<br><span class="img-wrap"><img data-src="/img/bVbgXfq?w=424&amp;h=361" src="https://static.alili.tech/img/bVbgXfq?w=424&amp;h=361" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x7531;&#x6B64;&#x6570;&#x636E;&#x53EF;&#x4EE5;&#x751F;&#x6210;&#x4E09;&#x4E2A;&#x6A21;&#x677F;&#xFF0C;&#x5206;&#x522B;&#x8868;&#x793A;&#x4E0A;&#x5468;&#xFF0C;&#x672C;&#x5468;&#x548C;&#x4E0B;&#x5468;&#xFF0C;&#x518D;&#x6839;&#x636E;&#x6B64;&#x6570;&#x636E;&#xFF0C;&#x8BA1;&#x7B97;&#x4E0A;&#x5468;&#xFF0C;&#x672C;&#x5468;&#x548C;&#x4E0B;&#x5468;&#x7684;&#x8BE6;&#x60C5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      getDays: function (day) {
        let arr = []
        /* &#x8BA1;&#x7B97;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x65E5;&#x671F;&#x4E3A;&#x661F;&#x671F;&#x51E0; */
        let weekOfDate = Number(moment(day).format(&apos;E&apos;))
        // &#x63D0;&#x524D;&#x5B9A;&#x4E49;&#x597D;&#x7684;&#xFF1A; this.week = [&apos;&#x4E00;&apos;, &apos;&#x4E8C;&apos;, &apos;&#x4E09;&apos;, &apos;&#x56DB;&apos;, &apos;&#x4E94;&apos;, &apos;&#x516D;&apos;, &apos;&#x65E5;&apos;]
        for (let i = 0; i &lt; this.week.length; i++) {
          arr.push(
            {
              date: moment(day).subtract(weekOfDate - i - 1, &apos;d&apos;).format(&apos;YYYY-MM-DD&apos;),
              week: this.week[i]
            }
          )
        }
        return arr
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs bash"><code>      getDays: <span class="hljs-keyword">function</span> (day) {
        <span class="hljs-built_in">let</span> arr = []
        /* &#x8BA1;&#x7B97;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x65E5;&#x671F;&#x4E3A;&#x661F;&#x671F;&#x51E0; */
        <span class="hljs-built_in">let</span> weekOfDate = Number(moment(day).format(<span class="hljs-string">&apos;E&apos;</span>))
        // &#x63D0;&#x524D;&#x5B9A;&#x4E49;&#x597D;&#x7684;&#xFF1A; this.week = [<span class="hljs-string">&apos;&#x4E00;&apos;</span>, <span class="hljs-string">&apos;&#x4E8C;&apos;</span>, <span class="hljs-string">&apos;&#x4E09;&apos;</span>, <span class="hljs-string">&apos;&#x56DB;&apos;</span>, <span class="hljs-string">&apos;&#x4E94;&apos;</span>, <span class="hljs-string">&apos;&#x516D;&apos;</span>, <span class="hljs-string">&apos;&#x65E5;&apos;</span>]
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">let</span> i = 0; i &lt; this.week.length; i++) {
          arr.push(
            {
              date: moment(day).subtract(weekOfDate - i - 1, <span class="hljs-string">&apos;d&apos;</span>).format(<span class="hljs-string">&apos;YYYY-MM-DD&apos;</span>),
              week: this.week[i]
            }
          )
        }
        <span class="hljs-built_in">return</span> arr
      }</code></pre><p>&#x904D;&#x5386;&#x6570;&#x7EC4;dates&#x3002;&#x5206;&#x522B;&#x4F20;&#x8FDB;getDays&#x53EF;&#x7684;&#x5230;&#x4E09;&#x5468;&#x7684;&#x8BE6;&#x60C5;</p><p><span class="img-wrap"><img data-src="/img/bVbgXiJ?w=307&amp;h=495" src="https://static.alili.tech/img/bVbgXiJ?w=307&amp;h=495" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x7136;&#x540E;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x9875;&#x9762;&#x6E32;&#x67D3;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            &lt;template v-for=&quot;(item, index) in dates&quot;&gt;
                &lt;div class=&quot;slider&quot;&gt;
                    &lt;div class=&quot;day&quot; v-for=&quot;(day, dayIndex) in getDays(item.date)&quot;&gt;
                        &lt;div :class=&quot;{today: day.date === defaultDate}&quot;&gt;{{day.date.split(&apos;-&apos;)[2]}}&lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>            &lt;template v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;(item, index) in dates&quot;</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;slider&quot;</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;day&quot;</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;(day, dayIndex) in getDays(item.date)&quot;</span>&gt;
                        &lt;<span class="hljs-keyword">div</span> :<span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;{today: day.date === defaultDate}&quot;</span>&gt;"{{"<span class="hljs-built_in">day</span>.<span class="hljs-built_in">date</span>.split(&apos;-&apos;)[<span class="hljs-number">2</span>]}}&lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/template&gt;</code></pre><p>&#x8FD9;&#x91CC;&#xFF0C;&#x9759;&#x6001;&#x663E;&#x793A;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;</p><h2 id="articleHeader1">&#x4E3A;&#x7EC4;&#x4EF6;&#x6DFB;&#x52A0;&#x6ED1;&#x52A8;&#x529F;&#x80FD;</h2><p>&#x6539;&#x5199;&#x4E0A;&#x65B9;&#x7684;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   &lt;div class=&quot;week-slider&quot;&gt;
        &lt;div
            class=&quot;sliders&quot;
            ref=&quot;sliders&quot;
            @touchstart=&quot;touchStart&quot;
            @touchmove=&quot;touchmove&quot;
            // &#x521D;&#x59CB;&#x6837;&#x5F0F;&#xFF0C;&#x5E94;&#x8BE5;&#x5411;&#x9970;&#x6263;&#x5DE6;&#x65B9;&#x79FB;&#x52A8;&#x4E00;&#x4E2A;&#x89C6;&#x53E3;&#x7684;&#x8DDD;&#x79BB;&#xFF0C;&#x786E;&#x4FDD;&#x5F53;&#x524D;&#x5468;&#x5728;&#x4E2D;&#x95F4;
            :style=&quot;getTransform&quot; 
            @touchend=&quot;touchend&quot;
            @webkit-transition-end=&quot;transitionEnd&quot;
            @transitionend=&quot;transitionEnd&quot;&gt;
            &lt;template v-for=&quot;(item, index) in dates&quot;&gt;
                &lt;div class=&quot;slider&quot;&gt;
                    &lt;div class=&quot;day&quot; v-for=&quot;(day, dayIndex) in getDays(item.date)&quot;&gt;
                        &lt;div :class=&quot;{today: day.date === defaultDate}&quot;&gt;{{day.date.split(&apos;-&apos;)[2]}}&lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/template&gt;
        &lt;/div&gt;
    &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code>   &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;week-slider&quot;</span>&gt;
        &lt;div
            <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;sliders&quot;</span>
            ref=<span class="hljs-string">&quot;sliders&quot;</span>
            <span class="hljs-meta">@touchstart</span>=<span class="hljs-string">&quot;touchStart&quot;</span>
            <span class="hljs-meta">@touchmove</span>=<span class="hljs-string">&quot;touchmove&quot;</span>
            <span class="hljs-comment">// &#x521D;&#x59CB;&#x6837;&#x5F0F;&#xFF0C;&#x5E94;&#x8BE5;&#x5411;&#x9970;&#x6263;&#x5DE6;&#x65B9;&#x79FB;&#x52A8;&#x4E00;&#x4E2A;&#x89C6;&#x53E3;&#x7684;&#x8DDD;&#x79BB;&#xFF0C;&#x786E;&#x4FDD;&#x5F53;&#x524D;&#x5468;&#x5728;&#x4E2D;&#x95F4;</span>
            :style=<span class="hljs-string">&quot;getTransform&quot;</span> 
            <span class="hljs-meta">@touchend</span>=<span class="hljs-string">&quot;touchend&quot;</span>
            <span class="hljs-meta">@webkit</span>-transition-end=<span class="hljs-string">&quot;transitionEnd&quot;</span>
            <span class="hljs-meta">@transitionend</span>=<span class="hljs-string">&quot;transitionEnd&quot;</span>&gt;
            &lt;template v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;(item, index) in dates&quot;</span>&gt;
                &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;slider&quot;</span>&gt;
                    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;day&quot;</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;(day, dayIndex) in getDays(item.date)&quot;</span>&gt;
                        &lt;div :<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;{today: day.date === defaultDate}&quot;</span>&gt;{{day.date.split(&apos;-&apos;)[<span class="hljs-number">2</span>]}}&lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/template&gt;
        &lt;/div&gt;
    &lt;/div&gt;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     // actIndex: &#x5F53;&#x524D;&#x6D3B;&#x52A8;&#x89C6;&#x56FE;&#x7684;&#x7F29;&#x5F71;&#xFF0C;&#x521D;&#x59CB;&#x4E3A;1&#xFF0C;sliderWidth&#xFF1A;&#x89C6;&#x53E3;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C; distan&#xFF1A; {x:0, y: 0}: &#x89E6;&#x6478;&#x79FB;&#x52A8;&#x7684;&#x8DDD;&#x79BB;
     // 
     getTransform: function () {
        this.endx = (-this.actIndex * this.sliderWidth)  + this.distan.x
        let style = {}
        style[&apos;transform&apos;] = &apos;translateX(&apos; + this.endx + &apos;px)&apos;
        // &#x8FD9;&#x4E00;&#x6761;&#x5FC5;&#x987B;&#x5199;&#xFF0C;&#x56E0;&#x4E3A;&#x89E6;&#x6478;&#x79FB;&#x52A8;&#x7684;&#x65F6;&#x5019;&#x9700;&#x8981;&#x8FC7;&#x6E21;&#x52A8;&#x753B;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x52A8;&#x753B;&#x7ED3;&#x675F;&#x91CD;&#x7EC4;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#x9700;&#x8981;&#x77AC;&#x95F4;&#x56DE;&#x5230;&#x8BE5;&#x53BB;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4E0D;&#x80FD;&#x8981;&#x8FC7;&#x6E21;&#x52A8;&#x753B;
        style[&apos;transition&apos;] = this.isAnimation ? &apos;transform .5s ease-out&apos; : &apos;none&apos;
        return style
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>     <span class="hljs-comment">// actIndex: &#x5F53;&#x524D;&#x6D3B;&#x52A8;&#x89C6;&#x56FE;&#x7684;&#x7F29;&#x5F71;&#xFF0C;&#x521D;&#x59CB;&#x4E3A;1&#xFF0C;sliderWidth&#xFF1A;&#x89C6;&#x53E3;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C; distan&#xFF1A; {x:0, y: 0}: &#x89E6;&#x6478;&#x79FB;&#x52A8;&#x7684;&#x8DDD;&#x79BB;</span>
     <span class="hljs-comment">// </span>
     getTransform: function () {
        <span class="hljs-keyword">this</span>.endx = (-<span class="hljs-keyword">this</span>.actIndex * <span class="hljs-keyword">this</span>.sliderWidth)  + <span class="hljs-keyword">this</span>.distan.x
        let style = {}
        style[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translateX(&apos;</span> + <span class="hljs-keyword">this</span>.endx + <span class="hljs-string">&apos;px)&apos;</span>
        <span class="hljs-comment">// &#x8FD9;&#x4E00;&#x6761;&#x5FC5;&#x987B;&#x5199;&#xFF0C;&#x56E0;&#x4E3A;&#x89E6;&#x6478;&#x79FB;&#x52A8;&#x7684;&#x65F6;&#x5019;&#x9700;&#x8981;&#x8FC7;&#x6E21;&#x52A8;&#x753B;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x52A8;&#x753B;&#x7ED3;&#x675F;&#x91CD;&#x7EC4;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#x9700;&#x8981;&#x77AC;&#x95F4;&#x56DE;&#x5230;&#x8BE5;&#x53BB;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x4E0D;&#x80FD;&#x8981;&#x8FC7;&#x6E21;&#x52A8;&#x753B;</span>
        style[<span class="hljs-string">&apos;transition&apos;</span>] = <span class="hljs-keyword">this</span>.isAnimation ? <span class="hljs-string">&apos;transform .5s ease-out&apos;</span> : <span class="hljs-string">&apos;none&apos;</span>
        <span class="hljs-keyword">return</span> style
      }</code></pre><p>&#x6700;&#x540E;&#x89E6;&#x6478;&#x65F6;&#x95F4;&#x5904;&#x7406;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      touchStart: function (e) {
        this.start.x = e.touches[0].pageX
      },
      touchmove: function (e) {
        // &#x8FD9;&#x91CC;&#x9700;&#x8981;&#x8FC7;&#x6E21;&#x52A8;&#x753B;
        this.isAnimation = true
        this.distan.x = e.touches[0].pageX - this.start.x
        // &#x9700;&#x8981;&#x79FB;&#x52A8;&#x7684;&#x5BB9;&#x5668;
        let dom = this.$refs.sliders
        // &#x5411;&#x5DE6;
        this.endx = this.endx + this.distan.x
        dom.style[&apos;transform&apos;] = &apos;translateX(&apos;+ this.endx + &apos;px)&apos;
      },
      touchend: function (e) {
        this.isAnimation = true
        this.distan.x = e.changedTouches[0].pageX - this.start.x
        // &#x5411;&#x53F3;
        if (this.distan.x &gt; 0) {
          this.direction = &apos;right&apos;
          this.actIndex = 0
        } else if (this.distan.x &lt; 0) {
          this.direction = &apos;left&apos;
          this.actIndex = 2
        }
        this.distan.x = 0
      }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>      touchStart: function (e) {
        this<span class="hljs-selector-class">.start</span><span class="hljs-selector-class">.x</span> = e<span class="hljs-selector-class">.touches</span>[<span class="hljs-number">0</span>]<span class="hljs-selector-class">.pageX</span>
      },
      touchmove: function (e) {
        <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x9700;&#x8981;&#x8FC7;&#x6E21;&#x52A8;&#x753B;</span>
        this<span class="hljs-selector-class">.isAnimation</span> = true
        this<span class="hljs-selector-class">.distan</span><span class="hljs-selector-class">.x</span> = e<span class="hljs-selector-class">.touches</span>[<span class="hljs-number">0</span>]<span class="hljs-selector-class">.pageX</span> - this<span class="hljs-selector-class">.start</span><span class="hljs-selector-class">.x</span>
        <span class="hljs-comment">// &#x9700;&#x8981;&#x79FB;&#x52A8;&#x7684;&#x5BB9;&#x5668;</span>
        let dom = this.<span class="hljs-variable">$refs</span><span class="hljs-selector-class">.sliders</span>
        <span class="hljs-comment">// &#x5411;&#x5DE6;</span>
        this<span class="hljs-selector-class">.endx</span> = this<span class="hljs-selector-class">.endx</span> + this<span class="hljs-selector-class">.distan</span><span class="hljs-selector-class">.x</span>
        dom<span class="hljs-selector-class">.style</span>[<span class="hljs-string">&apos;transform&apos;</span>] = <span class="hljs-string">&apos;translateX(&apos;</span>+ this<span class="hljs-selector-class">.endx</span> + <span class="hljs-string">&apos;px)&apos;</span>
      },
      touchend: function (e) {
        this<span class="hljs-selector-class">.isAnimation</span> = true
        this<span class="hljs-selector-class">.distan</span><span class="hljs-selector-class">.x</span> = e<span class="hljs-selector-class">.changedTouches</span>[<span class="hljs-number">0</span>]<span class="hljs-selector-class">.pageX</span> - this<span class="hljs-selector-class">.start</span><span class="hljs-selector-class">.x</span>
        <span class="hljs-comment">// &#x5411;&#x53F3;</span>
        <span class="hljs-keyword">if</span> (this<span class="hljs-selector-class">.distan</span><span class="hljs-selector-class">.x</span> &gt; <span class="hljs-number">0</span>) {
          this<span class="hljs-selector-class">.direction</span> = <span class="hljs-string">&apos;right&apos;</span>
          this<span class="hljs-selector-class">.actIndex</span> = <span class="hljs-number">0</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (this<span class="hljs-selector-class">.distan</span><span class="hljs-selector-class">.x</span> &lt; <span class="hljs-number">0</span>) {
          this<span class="hljs-selector-class">.direction</span> = <span class="hljs-string">&apos;left&apos;</span>
          this<span class="hljs-selector-class">.actIndex</span> = <span class="hljs-number">2</span>
        }
        this<span class="hljs-selector-class">.distan</span><span class="hljs-selector-class">.x</span> = <span class="hljs-number">0</span>
      },</code></pre><p>&#x8FC7;&#x6E21;&#x7ED3;&#x675F;&#x540E;&#x91CD;&#x7F6E;&#x5BB9;&#x5668;&#x4F4D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8FC7;&#x6E21;&#x7ED3;&#x675F;
      transitionEnd: function () {
        this.isAnimation = false
        if (this.actIndex === 2) {
            this.dates.push({
                date: moment(this.dates[this.actIndex].date).add(7, &apos;d&apos;).format(&apos;YYYY-MM-DD&apos;)
            })
            this.dates.shift()
            this.actIndex = 1
        }else if (this.actIndex === 0) {
            this.dates.unshift({
                date: moment(this.dates[this.actIndex].date).subtract(7, &apos;d&apos;).format(&apos;YYYY-MM-DD&apos;)
            })
            this.dates.pop()
            this.actIndex = 1
        }
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// &#x8FC7;&#x6E21;&#x7ED3;&#x675F;</span>
      transitionEnd: function () {
        <span class="hljs-keyword">this</span>.isAnimation = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.actIndex === <span class="hljs-number">2</span>) {
            <span class="hljs-keyword">this</span>.dates.push({
                date: moment(<span class="hljs-keyword">this</span>.dates[<span class="hljs-keyword">this</span>.actIndex].date).add(<span class="hljs-number">7</span>, <span class="hljs-string">&apos;d&apos;</span>).format(<span class="hljs-string">&apos;YYYY-MM-DD&apos;</span>)
            })
            <span class="hljs-keyword">this</span>.dates.shift()
            <span class="hljs-keyword">this</span>.actIndex = <span class="hljs-number">1</span>
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.actIndex === <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">this</span>.dates.unshift({
                date: moment(<span class="hljs-keyword">this</span>.dates[<span class="hljs-keyword">this</span>.actIndex].date).subtract(<span class="hljs-number">7</span>, <span class="hljs-string">&apos;d&apos;</span>).format(<span class="hljs-string">&apos;YYYY-MM-DD&apos;</span>)
            })
            <span class="hljs-keyword">this</span>.dates.pop()
            <span class="hljs-keyword">this</span>.actIndex = <span class="hljs-number">1</span>
        }
      }</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于moment写一个滑动日历

## 原文链接
[https://segmentfault.com/a/1190000016401628](https://segmentfault.com/a/1190000016401628)

