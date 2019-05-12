---
title: '鼠标移入移出效果 -- jQuery/Vue版' 
date: 2018-11-27 2:30:12
hidden: true
slug: 4qjaragj8os
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x5143;&#x7D20;&#x5185;&#x906E;&#x7F69;&#x5C42;&#x6839;&#x636E;&#x9F20;&#x6807;&#x65B9;&#x5411;&#x663E;&#x793A;&#x7684;&#x6548;&#x679C;&#x6BD4;&#x8F83;&#x5E38;&#x89C1;&#xFF0C;&#x6BD4;&#x5982;&#x767E;&#x5EA6;&#x56FE;&#x7247;&#x91CC;&#x7684;&#x56FE;&#x7247;&#x4FE1;&#x606F;&#x5C55;&#x793A;&#x3002;&#x81EA;&#x5DF1;&#x52A8;&#x624B;&#x5B9E;&#x73B0;jQuery&#x63D2;&#x4EF6;&#x7248;&#x548C;Vue&#x7EC4;&#x4EF6;&#x7248;&#x6548;&#x679C;&#x3002;</blockquote><p><a href="http://www.bestvist.com/p/56" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;&#x94FE;&#x63A5;</a></p><h1 id="articleHeader0">&#x5B9E;&#x73B0;&#x601D;&#x8DEF;</h1><p>1&#x3001;&#x6839;&#x636E;&#x9F20;&#x6807;&#x7684;&#x4F4D;&#x7F6E;&#x5B9A;&#x4F4D;&#x5728;&#x5143;&#x7D20;&#x5185;&#x51FA;&#x73B0;&#x7684;&#x65B9;&#x5411;<br>2&#x3001;&#x6839;&#x636E;&#x65B9;&#x5411;&#x52A8;&#x6001;&#x8BBE;&#x7F6E;&#x906E;&#x7F69;&#x5C42;&#x6837;&#x5F0F;<br>3&#x3001;&#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x79FB;&#x52A8;&#x906E;&#x7F69;&#x5C42;</p><h1 id="articleHeader1">jQuery&#x7248;</h1><p>jQuery&#x63D2;&#x4EF6;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;$.fn.extend&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x62D3;&#x5C55;&#x3002;</p><h2 id="articleHeader2">html</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;content&quot; style=&quot;background:aqua&quot;&gt;
        &lt;div class=&quot;shade&quot;&gt;
            &lt;p&gt;mouse hover&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;div class=&quot;content&quot; style=&quot;background:bisque&quot;&gt;
        &lt;div class=&quot;shade&quot;&gt;
            &lt;p&gt;mouse hover&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;div class=&quot;content&quot; style=&quot;background:cadetblue&quot;&gt;
        &lt;div class=&quot;shade&quot;&gt;
            &lt;p&gt;mouse hover&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;div class=&quot;content&quot; style=&quot;background:chocolate&quot;&gt;
        &lt;div class=&quot;shade&quot;&gt;
            &lt;p&gt;mouse hover&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;div class=&quot;content&quot; style=&quot;background:cornflowerblue&quot;&gt;
        &lt;div class=&quot;shade&quot;&gt;
            &lt;p&gt;mouse hover&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;content&quot; style=&quot;background:darkkhaki&quot;&gt;
        &lt;div class=&quot;shade&quot;&gt;
            &lt;p&gt;mouse hover&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;content&quot;</span> style=<span class="hljs-string">&quot;background:aqua&quot;</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;shade&quot;</span>&gt;
            &lt;p&gt;mouse hover&lt;/p&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;

    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;content&quot;</span> style=<span class="hljs-string">&quot;background:bisque&quot;</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;shade&quot;</span>&gt;
            &lt;p&gt;mouse hover&lt;/p&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;

    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;content&quot;</span> style=<span class="hljs-string">&quot;background:cadetblue&quot;</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;shade&quot;</span>&gt;
            &lt;p&gt;mouse hover&lt;/p&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;

    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;content&quot;</span> style=<span class="hljs-string">&quot;background:chocolate&quot;</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;shade&quot;</span>&gt;
            &lt;p&gt;mouse hover&lt;/p&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;

    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;content&quot;</span> style=<span class="hljs-string">&quot;background:cornflowerblue&quot;</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;shade&quot;</span>&gt;
            &lt;p&gt;mouse hover&lt;/p&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;content&quot;</span> style=<span class="hljs-string">&quot;background:darkkhaki&quot;</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;shade&quot;</span>&gt;
            &lt;p&gt;mouse hover&lt;/p&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><h2 id="articleHeader3">css</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    width: 600px;
    margin: auto;
    margin-top: 100px;
}

.content {
    float: left;
    position: relative;
    height: 150px;
    width: 150px;
    margin: 20px;
    overflow: hidden;
    background: #ccc;
}

.content .shade {
    position: absolute;
    top: 0;
    display: none;
    width: 100%;
    height: 100%;
    line-height: 100px;
    color: #fff;
    background: rgba(0, 0, 0, 0.7);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
    <span class="hljs-attribute">margin</span>: auto;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">100px</span>;
}

<span class="hljs-selector-class">.content</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
}

<span class="hljs-selector-class">.content</span> <span class="hljs-selector-class">.shade</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">display</span>: none;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.7);
}</code></pre><h2 id="articleHeader4">js</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    (function ($) {
        $.fn.extend({
            &quot;mouseMove&quot;: function (child) {
                $(this).hover(function (e) {
                    $this = $(this);
                    var ele = $this.find(child);
                    var clientX = e.clientX;
                    var clientY = e.clientY;
                    var top = parseInt($this.offset().top);
                    var bottom = parseInt(top + $this.height());
                    var left = parseInt($this.offset().left);
                    var right = parseInt(left + $this.width());
                    var absTop = Math.abs(clientY - top);
                    var absBottom = Math.abs(clientY - bottom);
                    var absLeft = Math.abs(clientX - left);
                    var absRight = Math.abs(clientX - right);
                    var min = Math.min(absTop, absBottom, absLeft, absRight);
                    var eventType = e.type;
                    switch (min) {
                        case absTop:
                            animate(&quot;top&quot;, eventType, ele);
                            break;
                        case absBottom:
                            animate(&quot;bottom&quot;, eventType, ele);
                            break;
                        case absLeft:
                            animate(&quot;left&quot;, eventType, ele);
                            break;
                        case absRight:
                            animate(&quot;right&quot;, eventType, ele)
                    }
                })
            }
        });

        function animate(direction, type, ele) {
            var timer = 200;
            var $target = $(ele);
            if (type == &quot;mouseenter&quot;) {
                $target.stop(true, true);
            }
            if (direction == &quot;top&quot;) {
                if (type == &quot;mouseenter&quot;) {
                    $target.css({
                        display: &quot;block&quot;,
                        top: &quot;-100%&quot;,
                        left: &quot;0&quot;
                    }).animate({
                        top: 0,
                        left: 0
                    }, timer)
                } else {
                    $target.animate({
                        display: &quot;block&quot;,
                        top: &quot;-100%&quot;,
                        left: &quot;0&quot;
                    }, timer)
                }
            } else if (direction == &quot;left&quot;) {
                if (type == &quot;mouseenter&quot;) {
                    $target.css({
                        display: &quot;block&quot;,
                        top: &quot;0&quot;,
                        left: &quot;-100%&quot;
                    }).animate({
                        left: 0,
                        top: 0
                    }, timer)
                } else {
                    $target.animate({
                        display: &quot;block&quot;,
                        left: &quot;-100%&quot;
                    }, timer)
                }
            } else if (direction == &quot;bottom&quot;) {
                if (type == &quot;mouseenter&quot;) {
                    $target.css({
                        display: &quot;block&quot;,
                        top: &quot;100%&quot;,
                        left: &quot;0&quot;
                    }).animate({
                        top: 0,
                        left: 0
                    }, timer)
                } else {
                    $target.animate({
                        display: &quot;block&quot;,
                        top: &quot;100%&quot;,
                        left: &quot;0&quot;
                    }, timer)
                }
            } else if (direction == &quot;right&quot;) {
                if (type == &quot;mouseenter&quot;) {
                    $target.css({
                        display: &quot;block&quot;,
                        top: 0,
                        left: &quot;100%&quot;
                    }).animate({
                        left: &quot;0%&quot;,
                        top: 0
                    }, timer)
                } else {
                    $target.animate({
                        display: &quot;block&quot;,
                        left: &quot;100%&quot;
                    }, timer)
                }
            }
        }

        $(&apos;.content&apos;).mouseMove(&apos;.shade&apos;)
    })(window.jQuery);
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">$</span>) </span>{
        $.fn.extend({
            <span class="hljs-string">&quot;mouseMove&quot;</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">child</span>) </span>{
                $(<span class="hljs-keyword">this</span>).hover(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                    $<span class="hljs-keyword">this</span> = $(<span class="hljs-keyword">this</span>);
                    <span class="hljs-keyword">var</span> ele = $<span class="hljs-keyword">this</span>.find(child);
                    <span class="hljs-keyword">var</span> clientX = e.clientX;
                    <span class="hljs-keyword">var</span> clientY = e.clientY;
                    <span class="hljs-keyword">var</span> top = <span class="hljs-built_in">parseInt</span>($<span class="hljs-keyword">this</span>.offset().top);
                    <span class="hljs-keyword">var</span> bottom = <span class="hljs-built_in">parseInt</span>(top + $<span class="hljs-keyword">this</span>.height());
                    <span class="hljs-keyword">var</span> left = <span class="hljs-built_in">parseInt</span>($<span class="hljs-keyword">this</span>.offset().left);
                    <span class="hljs-keyword">var</span> right = <span class="hljs-built_in">parseInt</span>(left + $<span class="hljs-keyword">this</span>.width());
                    <span class="hljs-keyword">var</span> absTop = <span class="hljs-built_in">Math</span>.abs(clientY - top);
                    <span class="hljs-keyword">var</span> absBottom = <span class="hljs-built_in">Math</span>.abs(clientY - bottom);
                    <span class="hljs-keyword">var</span> absLeft = <span class="hljs-built_in">Math</span>.abs(clientX - left);
                    <span class="hljs-keyword">var</span> absRight = <span class="hljs-built_in">Math</span>.abs(clientX - right);
                    <span class="hljs-keyword">var</span> min = <span class="hljs-built_in">Math</span>.min(absTop, absBottom, absLeft, absRight);
                    <span class="hljs-keyword">var</span> eventType = e.type;
                    <span class="hljs-keyword">switch</span> (min) {
                        <span class="hljs-keyword">case</span> absTop:
                            animate(<span class="hljs-string">&quot;top&quot;</span>, eventType, ele);
                            <span class="hljs-keyword">break</span>;
                        <span class="hljs-keyword">case</span> absBottom:
                            animate(<span class="hljs-string">&quot;bottom&quot;</span>, eventType, ele);
                            <span class="hljs-keyword">break</span>;
                        <span class="hljs-keyword">case</span> absLeft:
                            animate(<span class="hljs-string">&quot;left&quot;</span>, eventType, ele);
                            <span class="hljs-keyword">break</span>;
                        <span class="hljs-keyword">case</span> absRight:
                            animate(<span class="hljs-string">&quot;right&quot;</span>, eventType, ele)
                    }
                })
            }
        });

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span>(<span class="hljs-params">direction, type, ele</span>) </span>{
            <span class="hljs-keyword">var</span> timer = <span class="hljs-number">200</span>;
            <span class="hljs-keyword">var</span> $target = $(ele);
            <span class="hljs-keyword">if</span> (type == <span class="hljs-string">&quot;mouseenter&quot;</span>) {
                $target.stop(<span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>);
            }
            <span class="hljs-keyword">if</span> (direction == <span class="hljs-string">&quot;top&quot;</span>) {
                <span class="hljs-keyword">if</span> (type == <span class="hljs-string">&quot;mouseenter&quot;</span>) {
                    $target.css({
                        <span class="hljs-attr">display</span>: <span class="hljs-string">&quot;block&quot;</span>,
                        <span class="hljs-attr">top</span>: <span class="hljs-string">&quot;-100%&quot;</span>,
                        <span class="hljs-attr">left</span>: <span class="hljs-string">&quot;0&quot;</span>
                    }).animate({
                        <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>,
                        <span class="hljs-attr">left</span>: <span class="hljs-number">0</span>
                    }, timer)
                } <span class="hljs-keyword">else</span> {
                    $target.animate({
                        <span class="hljs-attr">display</span>: <span class="hljs-string">&quot;block&quot;</span>,
                        <span class="hljs-attr">top</span>: <span class="hljs-string">&quot;-100%&quot;</span>,
                        <span class="hljs-attr">left</span>: <span class="hljs-string">&quot;0&quot;</span>
                    }, timer)
                }
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (direction == <span class="hljs-string">&quot;left&quot;</span>) {
                <span class="hljs-keyword">if</span> (type == <span class="hljs-string">&quot;mouseenter&quot;</span>) {
                    $target.css({
                        <span class="hljs-attr">display</span>: <span class="hljs-string">&quot;block&quot;</span>,
                        <span class="hljs-attr">top</span>: <span class="hljs-string">&quot;0&quot;</span>,
                        <span class="hljs-attr">left</span>: <span class="hljs-string">&quot;-100%&quot;</span>
                    }).animate({
                        <span class="hljs-attr">left</span>: <span class="hljs-number">0</span>,
                        <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>
                    }, timer)
                } <span class="hljs-keyword">else</span> {
                    $target.animate({
                        <span class="hljs-attr">display</span>: <span class="hljs-string">&quot;block&quot;</span>,
                        <span class="hljs-attr">left</span>: <span class="hljs-string">&quot;-100%&quot;</span>
                    }, timer)
                }
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (direction == <span class="hljs-string">&quot;bottom&quot;</span>) {
                <span class="hljs-keyword">if</span> (type == <span class="hljs-string">&quot;mouseenter&quot;</span>) {
                    $target.css({
                        <span class="hljs-attr">display</span>: <span class="hljs-string">&quot;block&quot;</span>,
                        <span class="hljs-attr">top</span>: <span class="hljs-string">&quot;100%&quot;</span>,
                        <span class="hljs-attr">left</span>: <span class="hljs-string">&quot;0&quot;</span>
                    }).animate({
                        <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>,
                        <span class="hljs-attr">left</span>: <span class="hljs-number">0</span>
                    }, timer)
                } <span class="hljs-keyword">else</span> {
                    $target.animate({
                        <span class="hljs-attr">display</span>: <span class="hljs-string">&quot;block&quot;</span>,
                        <span class="hljs-attr">top</span>: <span class="hljs-string">&quot;100%&quot;</span>,
                        <span class="hljs-attr">left</span>: <span class="hljs-string">&quot;0&quot;</span>
                    }, timer)
                }
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (direction == <span class="hljs-string">&quot;right&quot;</span>) {
                <span class="hljs-keyword">if</span> (type == <span class="hljs-string">&quot;mouseenter&quot;</span>) {
                    $target.css({
                        <span class="hljs-attr">display</span>: <span class="hljs-string">&quot;block&quot;</span>,
                        <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>,
                        <span class="hljs-attr">left</span>: <span class="hljs-string">&quot;100%&quot;</span>
                    }).animate({
                        <span class="hljs-attr">left</span>: <span class="hljs-string">&quot;0%&quot;</span>,
                        <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>
                    }, timer)
                } <span class="hljs-keyword">else</span> {
                    $target.animate({
                        <span class="hljs-attr">display</span>: <span class="hljs-string">&quot;block&quot;</span>,
                        <span class="hljs-attr">left</span>: <span class="hljs-string">&quot;100%&quot;</span>
                    }, timer)
                }
            }
        }

        $(<span class="hljs-string">&apos;.content&apos;</span>).mouseMove(<span class="hljs-string">&apos;.shade&apos;</span>)
    })(<span class="hljs-built_in">window</span>.jQuery);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h1 id="articleHeader5">Vue&#x7248;</h1><p>&#x901A;&#x7528;Vue&#x7684;&#x7EC4;&#x4EF6;&#x5B9E;&#x73B0;&#x5224;&#x65AD;&#x5143;&#x7D20;&#x5185;&#x9F20;&#x6807;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x5229;&#x7528;&#x63D2;&#x69FD;&#x7684;&#x65B9;&#x5F0F;&#x663E;&#x793A;&#x906E;&#x7F69;&#x5C42;&#x5185;&#x5BB9;&#x3002;</p><h2 id="articleHeader6">html</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
        &lt;mouse-hover style=&quot;background:aqua&quot;&gt;
                &lt;div slot&gt;mouse hover&lt;/div&gt;
        &lt;/mouse-hover&gt;
        &lt;mouse-hover style=&quot;background:bisque&quot;&gt;
                &lt;div slot&gt;mouse hover&lt;/div&gt;
        &lt;/mouse-hover&gt;
        &lt;mouse-hover style=&quot;background:cadetblue&quot;&gt;
                &lt;div slot&gt;mouse hover&lt;/div&gt;
        &lt;/mouse-hover&gt;
        &lt;mouse-hover style=&quot;background:chocolate&quot;&gt;
                &lt;div slot&gt;mouse hover&lt;/div&gt;
        &lt;/mouse-hover&gt;
        &lt;mouse-hover style=&quot;background:cornflowerblue&quot;&gt;
                &lt;div slot&gt;mouse hover&lt;/div&gt;
        &lt;/mouse-hover&gt;
        &lt;mouse-hover style=&quot;background:darkkhaki&quot;&gt;
                &lt;div slot&gt;mouse hover&lt;/div&gt;
        &lt;/mouse-hover&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mouse-hover</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background:aqua&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>&gt;</span>mouse hover<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mouse-hover</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mouse-hover</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background:bisque&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>&gt;</span>mouse hover<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mouse-hover</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mouse-hover</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background:cadetblue&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>&gt;</span>mouse hover<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mouse-hover</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mouse-hover</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background:chocolate&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>&gt;</span>mouse hover<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mouse-hover</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mouse-hover</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background:cornflowerblue&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>&gt;</span>mouse hover<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mouse-hover</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mouse-hover</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background:darkkhaki&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>&gt;</span>mouse hover<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mouse-hover</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><h2 id="articleHeader7">css</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
        html,
        body {
                text-align: center;
                color: #000;
                background-color: #353535;
        }

        * {
                box-sizing: border-box;
        }

        #app {
                width: 600px;
                margin: auto;
                margin-top: 100px;
        }

        .content {
                float: left;
                position: relative;
                height: 150px;
                width: 150px;
                margin: 20px;
                overflow: hidden;
                background: #ccc;
        }

        .content .shade {
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                line-height: 100px;
                color: #fff;
                background: rgba(0, 0, 0, 0.7);
        }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">html</span>,
        <span class="hljs-selector-tag">body</span> {
                <span class="hljs-attribute">text-align</span>: center;
                <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
                <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#353535</span>;
        }

        * {
                <span class="hljs-attribute">box-sizing</span>: border-box;
        }

        <span class="hljs-selector-id">#app</span> {
                <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
                <span class="hljs-attribute">margin</span>: auto;
                <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">100px</span>;
        }

        <span class="hljs-selector-class">.content</span> {
                <span class="hljs-attribute">float</span>: left;
                <span class="hljs-attribute">position</span>: relative;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
                <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
                <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span>;
                <span class="hljs-attribute">overflow</span>: hidden;
                <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
        }

        <span class="hljs-selector-class">.content</span> <span class="hljs-selector-class">.shade</span> {
                <span class="hljs-attribute">position</span>: absolute;
                <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
                <span class="hljs-attribute">left</span>: -<span class="hljs-number">100%</span>;
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
                <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
                <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
                <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.7);
        }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><h2 id="articleHeader8">js</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
        (function () {
                const mouseHover = {
                        name: &apos;mouseHover&apos;,
                        template: `
                        &lt;div class=&quot;content&quot; @mouseenter=&quot;handleIn&quot; @mouseleave=&quot;handleOut&quot;&gt;
                                &lt;div class=&quot;shade&quot; ref=&quot;shade&quot;&gt;
                                        &lt;slot&gt;&lt;/slot&gt;
                                &lt;/div&gt;
                        &lt;/div&gt;
                        `,
                        data: () =&gt; {
                                return {}
                        },
                        methods: {
                                handleIn: function (e) {
                                        const direction = this.direction(e);
                                        this.animate(direction, &apos;in&apos;);
                                },
                                handleOut: function (e) {
                                        const direction = this.direction(e);
                                        this.animate(direction, &apos;out&apos;);
                                },
                                direction: function (e, type) {
                                        const clientX = e.clientX;
                                        const clientY = e.clientY;
                                        const top = e.target.offsetTop;
                                        const bottom = parseInt(top + e.target.offsetHeight);
                                        const left = e.target.offsetLeft;
                                        const right = parseInt(left + e.target.offsetWidth);
                                        const absTop = Math.abs(clientY - top);
                                        const absBottom = Math.abs(clientY - bottom);
                                        const absLeft = Math.abs(clientX - left);
                                        const absRight = Math.abs(clientX - right);
                                        const min = Math.min(absTop, absBottom, absLeft, absRight);
                                        let direction;
                                        switch (min) {
                                                case absTop:
                                                        direction = &quot;top&quot;;
                                                        break;
                                                case absBottom:
                                                        direction = &quot;bottom&quot;;
                                                        break;
                                                case absLeft:
                                                        direction = &quot;left&quot;;
                                                        break;
                                                case absRight:
                                                        direction = &quot;right&quot;;
                                                        break;
                                        };
                                        return direction;
                                },
                                animate: function (direction, type) {
                                        let top = 0,
                                                left = 0;
                                        if (type == &apos;in&apos;) {
                                                this.$refs.shade.style.transition = &apos;none&apos;;
                                                if (direction == &apos;top&apos;) {
                                                        top = &apos;-100%&apos;;
                                                        left = 0;
                                                } else if (direction == &apos;right&apos;) {
                                                        top = 0;
                                                        left = &apos;100%&apos;;
                                                } else if (direction == &apos;bottom&apos;) {
                                                        top = &apos;100%&apos;;
                                                        left = 0;
                                                } else if (direction == &apos;left&apos;) {
                                                        top = 0;
                                                        left = &apos;-100%&apos;;
                                                }
                                                this.$refs.shade.style.top = top;
                                                this.$refs.shade.style.left = left;
                                                setTimeout(() =&gt; {
                                                        this.$refs.shade.style.transition = &apos;all .2s ease 0s&apos;;
                                                        this.$refs.shade.style.top = 0;
                                                        this.$refs.shade.style.left = 0;
                                                }, 0)

                                        } else if (type == &apos;out&apos;) {
                                                if (direction == &apos;top&apos;) {
                                                        top = &apos;-100%&apos;;
                                                        left = 0;
                                                } else if (direction == &apos;right&apos;) {
                                                        top = 0;
                                                        left = &apos;100%&apos;;
                                                } else if (direction == &apos;bottom&apos;) {
                                                        top = &apos;100%&apos;;
                                                        left = 0;
                                                } else if (direction == &apos;left&apos;) {
                                                        top = 0;
                                                        left = &apos;-100%&apos;;
                                                }
                                                this.$refs.shade.style.top = top;
                                                this.$refs.shade.style.left = left;
                                        }
                                }
                        }
                }
                Vue.component(mouseHover.name, mouseHover)
                new Vue({
                        el: &apos;#app&apos;
                })
        })();
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">const</span> mouseHover = {
                        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;mouseHover&apos;</span>,
                        <span class="hljs-attr">template</span>: <span class="hljs-string">`
                        &lt;div class=&quot;content&quot; @mouseenter=&quot;handleIn&quot; @mouseleave=&quot;handleOut&quot;&gt;
                                &lt;div class=&quot;shade&quot; ref=&quot;shade&quot;&gt;
                                        &lt;slot&gt;&lt;/slot&gt;
                                &lt;/div&gt;
                        &lt;/div&gt;
                        `</span>,
                        <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                                <span class="hljs-keyword">return</span> {}
                        },
                        <span class="hljs-attr">methods</span>: {
                                <span class="hljs-attr">handleIn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                                        <span class="hljs-keyword">const</span> direction = <span class="hljs-keyword">this</span>.direction(e);
                                        <span class="hljs-keyword">this</span>.animate(direction, <span class="hljs-string">&apos;in&apos;</span>);
                                },
                                <span class="hljs-attr">handleOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                                        <span class="hljs-keyword">const</span> direction = <span class="hljs-keyword">this</span>.direction(e);
                                        <span class="hljs-keyword">this</span>.animate(direction, <span class="hljs-string">&apos;out&apos;</span>);
                                },
                                <span class="hljs-attr">direction</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e, type</span>) </span>{
                                        <span class="hljs-keyword">const</span> clientX = e.clientX;
                                        <span class="hljs-keyword">const</span> clientY = e.clientY;
                                        <span class="hljs-keyword">const</span> top = e.target.offsetTop;
                                        <span class="hljs-keyword">const</span> bottom = <span class="hljs-built_in">parseInt</span>(top + e.target.offsetHeight);
                                        <span class="hljs-keyword">const</span> left = e.target.offsetLeft;
                                        <span class="hljs-keyword">const</span> right = <span class="hljs-built_in">parseInt</span>(left + e.target.offsetWidth);
                                        <span class="hljs-keyword">const</span> absTop = <span class="hljs-built_in">Math</span>.abs(clientY - top);
                                        <span class="hljs-keyword">const</span> absBottom = <span class="hljs-built_in">Math</span>.abs(clientY - bottom);
                                        <span class="hljs-keyword">const</span> absLeft = <span class="hljs-built_in">Math</span>.abs(clientX - left);
                                        <span class="hljs-keyword">const</span> absRight = <span class="hljs-built_in">Math</span>.abs(clientX - right);
                                        <span class="hljs-keyword">const</span> min = <span class="hljs-built_in">Math</span>.min(absTop, absBottom, absLeft, absRight);
                                        <span class="hljs-keyword">let</span> direction;
                                        <span class="hljs-keyword">switch</span> (min) {
                                                <span class="hljs-keyword">case</span> absTop:
                                                        direction = <span class="hljs-string">&quot;top&quot;</span>;
                                                        <span class="hljs-keyword">break</span>;
                                                <span class="hljs-keyword">case</span> absBottom:
                                                        direction = <span class="hljs-string">&quot;bottom&quot;</span>;
                                                        <span class="hljs-keyword">break</span>;
                                                <span class="hljs-keyword">case</span> absLeft:
                                                        direction = <span class="hljs-string">&quot;left&quot;</span>;
                                                        <span class="hljs-keyword">break</span>;
                                                <span class="hljs-keyword">case</span> absRight:
                                                        direction = <span class="hljs-string">&quot;right&quot;</span>;
                                                        <span class="hljs-keyword">break</span>;
                                        };
                                        <span class="hljs-keyword">return</span> direction;
                                },
                                <span class="hljs-attr">animate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">direction, type</span>) </span>{
                                        <span class="hljs-keyword">let</span> top = <span class="hljs-number">0</span>,
                                                left = <span class="hljs-number">0</span>;
                                        <span class="hljs-keyword">if</span> (type == <span class="hljs-string">&apos;in&apos;</span>) {
                                                <span class="hljs-keyword">this</span>.$refs.shade.style.transition = <span class="hljs-string">&apos;none&apos;</span>;
                                                <span class="hljs-keyword">if</span> (direction == <span class="hljs-string">&apos;top&apos;</span>) {
                                                        top = <span class="hljs-string">&apos;-100%&apos;</span>;
                                                        left = <span class="hljs-number">0</span>;
                                                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (direction == <span class="hljs-string">&apos;right&apos;</span>) {
                                                        top = <span class="hljs-number">0</span>;
                                                        left = <span class="hljs-string">&apos;100%&apos;</span>;
                                                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (direction == <span class="hljs-string">&apos;bottom&apos;</span>) {
                                                        top = <span class="hljs-string">&apos;100%&apos;</span>;
                                                        left = <span class="hljs-number">0</span>;
                                                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (direction == <span class="hljs-string">&apos;left&apos;</span>) {
                                                        top = <span class="hljs-number">0</span>;
                                                        left = <span class="hljs-string">&apos;-100%&apos;</span>;
                                                }
                                                <span class="hljs-keyword">this</span>.$refs.shade.style.top = top;
                                                <span class="hljs-keyword">this</span>.$refs.shade.style.left = left;
                                                setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                                                        <span class="hljs-keyword">this</span>.$refs.shade.style.transition = <span class="hljs-string">&apos;all .2s ease 0s&apos;</span>;
                                                        <span class="hljs-keyword">this</span>.$refs.shade.style.top = <span class="hljs-number">0</span>;
                                                        <span class="hljs-keyword">this</span>.$refs.shade.style.left = <span class="hljs-number">0</span>;
                                                }, <span class="hljs-number">0</span>)

                                        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (type == <span class="hljs-string">&apos;out&apos;</span>) {
                                                <span class="hljs-keyword">if</span> (direction == <span class="hljs-string">&apos;top&apos;</span>) {
                                                        top = <span class="hljs-string">&apos;-100%&apos;</span>;
                                                        left = <span class="hljs-number">0</span>;
                                                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (direction == <span class="hljs-string">&apos;right&apos;</span>) {
                                                        top = <span class="hljs-number">0</span>;
                                                        left = <span class="hljs-string">&apos;100%&apos;</span>;
                                                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (direction == <span class="hljs-string">&apos;bottom&apos;</span>) {
                                                        top = <span class="hljs-string">&apos;100%&apos;</span>;
                                                        left = <span class="hljs-number">0</span>;
                                                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (direction == <span class="hljs-string">&apos;left&apos;</span>) {
                                                        top = <span class="hljs-number">0</span>;
                                                        left = <span class="hljs-string">&apos;-100%&apos;</span>;
                                                }
                                                <span class="hljs-keyword">this</span>.$refs.shade.style.top = top;
                                                <span class="hljs-keyword">this</span>.$refs.shade.style.left = left;
                                        }
                                }
                        }
                }
                Vue.component(mouseHover.name, mouseHover)
                <span class="hljs-keyword">new</span> Vue({
                        <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>
                })
        })();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h1 id="articleHeader9">&#x6548;&#x679C;</h1><p><span class="img-wrap"><img data-src="/img/remote/1460000015351982?w=420&amp;h=253" src="https://static.alili.tech/img/remote/1460000015351982?w=420&amp;h=253" alt="" title="" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
鼠标移入移出效果 -- jQuery/Vue版

## 原文链接
[https://segmentfault.com/a/1190000015351979](https://segmentfault.com/a/1190000015351979)

