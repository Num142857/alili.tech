---
title: 'CSS魔法堂：Transition就这么好玩' 
date: 2018-11-29 9:27:38
hidden: true
slug: 5u3w1g3eoa3
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2>
<p>&#x2003;&#x4EE5;&#x524D;&#x8BF4;&#x8D77;&#x524D;&#x7AEF;&#x52A8;&#x753B;&#x5FC5;&#x987B;&#x4F7F;&#x7528;JS&#xFF0C;&#x800C;CSS3&#x4E3A;&#x6211;&#x4EEC;&#x5E26;&#x6765;transition&#x548C;@keyframes&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4EE5;&#x66F4;&#x7B80;&#x5355;&#xFF08;&#x58F0;&#x660E;&#x5F0F;&#x4EE3;&#x66FF;&#x547D;&#x4EE4;&#x5F0F;&#xFF09;&#x548C;&#x66F4;&#x9AD8;&#x6548;&#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;UI&#x72B6;&#x6001;&#x95F4;&#x7684;&#x8865;&#x95F4;&#x52A8;&#x753B;&#x3002;&#x672C;&#x6587;&#x4E3A;&#x8FD1;&#x671F;&#x5BF9;Transition&#x7684;&#x5B66;&#x4E60;&#x603B;&#x7ED3;&#xFF0C;&#x6B22;&#x8FCE;&#x5404;&#x4F4D;&#x62CD;&#x7816;&#x3002;</p>
<h2 id="articleHeader1">&#x5C5E;&#x6027;&#x4ECB;&#x7ECD;</h2>
<p>&#x2003;&#x9996;&#x5148;&#x5148;&#x6211;&#x4EEC;&#x7B80;&#x5355;&#x7C97;&#x66B4;&#x4E86;&#x89E3;<code>transition</code>&#x5C5E;&#x6027;&#x5427;&#xFF01;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transition: &lt;transition-property&gt; &lt;transition-duration&gt; &lt;transition-timing-function&gt; &lt;transition-delay&gt;;

/* &#x8BBE;&#x7F6E;&#x542F;&#x7528;Transition&#x6548;&#x679C;&#x7684;CSS&#x5C5E;&#x6027;
 * &#x6CE8;&#x610F;&#xFF1A;&#x4EC5;&#x4F1A;&#x5F15;&#x53D1;repaint&#x6216;reflow&#x7684;&#x5C5E;&#x6027;&#x53EF;&#x542F;&#x7528;Transition&#x6548;&#x679C;
 *       [CSS_animated_properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)
 */
&lt;transition-property&gt;: all | none | &lt;property&gt; [,&lt;property&gt;]*

/* &#x8BBE;&#x7F6E;&#x8FC7;&#x6E21;&#x52A8;&#x753B;&#x6301;&#x7EED;&#x65F6;&#x95F4;&#xFF0C;&#x5355;&#x4F4D;&#x4E3A;s&#x6216;ms
 */
&lt;transition-duration&gt;: 0s | &lt;time&gt; [, &lt;time&gt;]*

/* &#x8BBE;&#x7F6E;&#x8FC7;&#x6E21;&#x52A8;&#x753B;&#x7684;&#x7F13;&#x52A8;&#x51FD;&#x6570;
 * cubic-bezier&#x7684;&#x503C;&#x4ECE;0&#x5230;1
 * [&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7528;&#x7684;cubic-bezier&#x914D;&#x7F6E;&#x5DE5;&#x5177;](http://cubic-bezier.com)
 */
&lt;transition-timing-function&gt;: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n)

/* &#x8BBE;&#x7F6E;&#x8FC7;&#x6E21;&#x52A8;&#x753B;&#x7684;&#x5EF6;&#x65F6;&#xFF0C;&#x5355;&#x4F4D;&#x4E3A;s&#x6216;ms
 */
&lt;transition-delay&gt;: 0s | &lt;time&gt; [, &lt;time&gt;]" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-attribute">transition</span>: &lt;transition-property&gt; &lt;transition-duration&gt; &lt;transition-timing-function&gt; &lt;transition-delay&gt;;

<span class="markdown">/* &#x8BBE;&#x7F6E;&#x542F;&#x7528;Transition&#x6548;&#x679C;&#x7684;CSS&#x5C5E;&#x6027;
 * &#x6CE8;&#x610F;&#xFF1A;&#x4EC5;&#x4F1A;&#x5F15;&#x53D1;repaint&#x6216;reflow&#x7684;&#x5C5E;&#x6027;&#x53EF;&#x542F;&#x7528;Transition&#x6548;&#x679C;
 *       [<span class="hljs-string">CSS_animated_properties</span>](<span class="hljs-link">https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties</span>)
 */
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">transition-property</span>&gt;</span></span>: all | none | <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span></span> [,<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">property</span>&gt;</span></span>]*

/* &#x8BBE;&#x7F6E;&#x8FC7;&#x6E21;&#x52A8;&#x753B;&#x6301;&#x7EED;&#x65F6;&#x95F4;&#xFF0C;&#x5355;&#x4F4D;&#x4E3A;s&#x6216;ms
 */
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">transition-duration</span>&gt;</span></span>: 0s | <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">time</span>&gt;</span></span> [, <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">time</span>&gt;</span></span>]*

/* &#x8BBE;&#x7F6E;&#x8FC7;&#x6E21;&#x52A8;&#x753B;&#x7684;&#x7F13;&#x52A8;&#x51FD;&#x6570;
 * cubic-bezier&#x7684;&#x503C;&#x4ECE;0&#x5230;1
 * [<span class="hljs-string">&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7528;&#x7684;cubic-bezier&#x914D;&#x7F6E;&#x5DE5;&#x5177;</span>](<span class="hljs-link">http://cubic-bezier.com</span>)
 */
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">transition-timing-function</span>&gt;</span></span>: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n)

/* &#x8BBE;&#x7F6E;&#x8FC7;&#x6E21;&#x52A8;&#x753B;&#x7684;&#x5EF6;&#x65F6;&#xFF0C;&#x5355;&#x4F4D;&#x4E3A;s&#x6216;ms
 */
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">transition-delay</span>&gt;</span></span>: 0s | <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">time</span>&gt;</span></span> [, <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">time</span>&gt;</span></span>]</span></code></pre>
<p>&#x2003;&#x53E6;&#x5916;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E00;&#x6B21;&#x6027;&#x4E3A;&#x591A;&#x4E2A;CSS&#x5C5E;&#x6027;&#x542F;&#x52A8;Transition&#x6548;&#x679C;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transition: width 1s ease .6s,
            color .5s linear,
            background 2s ease-in-out;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs maxima"><code>transition: <span class="hljs-built_in">width</span> 1s ease .6s,
            <span class="hljs-built_in">color</span> .5s <span class="hljs-built_in">linear</span>,
            <span class="hljs-built_in">background</span> 2s ease-<span class="hljs-keyword">in</span>-out;</code></pre>
<h2 id="articleHeader2">&#x89E6;&#x53D1;&#x65B9;&#x5F0F;</h2>
<p>&#x2003;&#x65E2;&#x7136;Transition&#x662F;UI&#x72B6;&#x6001;&#x95F4;&#x7684;&#x8865;&#x95F4;&#x52A8;&#x753B;&#xFF0C;&#x90A3;&#x4E48;&#x6709;&#x4E14;&#x4EC5;&#x6709;&#x4FEE;&#x6539;UI&#x72B6;&#x6001;&#x65F6;&#x624D;&#x80FD;&#x8BA9;&#x52A8;&#x753B;&#x52A8;&#x8D77;&#x6765;&#x3002;&#x90A3;&#x4E48;&#x5C31;&#x6709;3&#x79CD;&#x65B9;&#x5F0F;&#x4E86;&#xFF1A;</p>
<ol>
<li>&#x4F2A;&#x7C7B;.<code>:link</code>,<code>:visited</code>,<code>:hover</code>,<code>:active</code>&#x548C;<code>:focus</code>
</li>
<li>&#x901A;&#x8FC7;JS&#x4FEE;&#x6539;CSS&#x5C5E;&#x6027;&#x503C;</li>
<li>&#x901A;&#x8FC7;JS&#x4FEE;&#x6539;className&#x503C;</li>
</ol>
<h2 id="articleHeader3">TransitionEnd&#x4E8B;&#x4EF6;&#x8BE6;&#x89E3;</h2>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/Events/transitionend" rel="nofollow noreferrer" target="_blank">TransitionEnd Event</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el.addEventListener(&quot;transitionend&quot;
  , e =&gt; 
    {
      const pseudoElement = e.pseudoElement // &#x89E6;&#x53D1;&#x52A8;&#x753B;&#x7684;&#x4F2A;&#x7C7B;
          , propertyName = e.propertyName   // &#x53D1;&#x751F;&#x52A8;&#x753B;&#x7684;CSS&#x5C5E;&#x6027;
          , elapsedTime = e.elapsedTime     // &#x52A8;&#x753B;&#x7684;&#x6301;&#x7EED;&#x65F6;&#x95F4;
      // ..................
    })" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>el.addEventListener(<span class="hljs-string">&quot;transitionend&quot;</span>
  , e =&gt; 
    {
      const pseudoElement = e<span class="hljs-selector-class">.pseudoElement</span> <span class="hljs-comment">// &#x89E6;&#x53D1;&#x52A8;&#x753B;&#x7684;&#x4F2A;&#x7C7B;</span>
          , propertyName = e<span class="hljs-selector-class">.propertyName</span>   <span class="hljs-comment">// &#x53D1;&#x751F;&#x52A8;&#x753B;&#x7684;CSS&#x5C5E;&#x6027;</span>
          , elapsedTime = e<span class="hljs-selector-class">.elapsedTime</span>     <span class="hljs-comment">// &#x52A8;&#x753B;&#x7684;&#x6301;&#x7EED;&#x65F6;&#x95F4;</span>
      <span class="hljs-comment">// ..................</span>
    })</code></pre>
<p>&#x6CE8;&#x610F;&#xFF1A;&#x6BCF;&#x4E2A;&#x542F;&#x7528;TransitionCSS&#x5C5E;&#x6027;&#x7684;&#x5206;&#x522B;&#x5BF9;&#x5E94;&#x72EC;&#x7ACB;&#x7684;<code>transitionend</code>&#x4E8B;&#x4EF6;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x89E6;&#x53D1;3&#x4E2A;transitionend&#x4E8B;&#x4EF6; */
transition: width 1s ease .6s,
            color .5s linear,
            background 2s ease-in-out;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-comment">/* &#x89E6;&#x53D1;3&#x4E2A;transitionend&#x4E8B;&#x4EF6; */</span>
transition: <span class="hljs-built_in">width</span> 1s ease .6s,
            <span class="hljs-built_in">color</span> .5s <span class="hljs-built_in">linear</span>,
            <span class="hljs-built_in">background</span> 2s ease-<span class="hljs-keyword">in</span>-out;</code></pre>
<h2 id="articleHeader4">Visibility&#x4E5F;&#x80FD;transition&#xFF1F;</h2>
<p>&#x2003;&#x5728;&#x53EF;&#x542F;&#x7528;Transition&#x7684;CSS&#x5C5E;&#x6027;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x5230;&#x4E00;&#x4E2A;&#x5F88;&#x7279;&#x522B;&#x7684;CSS&#x5C5E;&#x6027;&#x2014;&#x2014;<code>visibility</code>&#x3002;<code>visibility</code>&#x5E38;&#x4E0E;<code>display</code>&#x76F8;&#x63D0;&#x5E76;&#x8BBA;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5B83;&#x51ED;&#x4EC0;&#x4E48;&#x80FD;&#x542F;&#x7528;Transition&#xFF0C;&#x800C;<code>display</code>&#x4E0D;&#x884C;&#x5462;&#xFF1F;&#x8FD9;&#x4E2A;&#x6211;&#x771F;&#x5FC3;&#x4E0D;&#x6E05;&#x695A;&#xFF0C;&#x4E0D;&#x8FC7;&#x6211;&#x4EEC;&#x8FD8;&#x662F;&#x4E86;&#x89E3;&#x542F;&#x7528;transition&#x7684;<code>visibility</code>&#x5148;&#x5427;&#xFF01;<br>&#x2003;<code>visibility</code>&#x662F;&#x79BB;&#x6563;&#x503C;&#xFF0C;0(<code>hidden</code>)&#x8868;&#x793A;&#x9690;&#x85CF;&#xFF0C;1(<code>visible</code>)&#x8868;&#x793A;&#x5B8C;&#x5168;&#x663E;&#x793A;&#xFF0C;&#x975E;0&#x8868;&#x793A;&#x663E;&#x793A;&#x3002;&#x90A3;&#x4E48;<code>visibility</code>&#x72B6;&#x6001;&#x53D8;&#x5316;&#x5C31;&#x5B58;&#x5728;&#x4E24;&#x4E2A;&#x65B9;&#x5411;&#x7684;&#x5DEE;&#x5F02;&#x4E86;&#xFF1A;</p>
<ol>
<li>&#x4ECE;<strong>&#x9690;&#x85CF;</strong>&#x5230;<strong>&#x663E;&#x793A;</strong>&#xFF0C;&#x7531;&#x4E8E;&#x975E;0&#x5C31;&#x662F;&#x663E;&#x793A;&#xFF0C;&#x90A3;&#x4E48;&#x4ECE;&#x503C;&#x4ECE;0&#x5230;1&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x4ECE;&#x9690;&#x85CF;&#x76F4;&#x63A5;&#x5207;&#x6362;&#x5230;&#x663E;&#x793A;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x56E0;&#x6B64;&#x5E76;&#x6CA1;&#x6709;&#x6240;&#x8C13;&#x7684;&#x53D8;&#x5316;&#x8FC7;&#x7A0B;&#xFF1B;</li>
<li>&#x4ECE;<strong>&#x663E;&#x793A;</strong>&#x5230;<strong>&#x9690;&#x85CF;</strong>&#xFF0C;&#x4ECE;1&#x5230;0&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5B58;&#x5728;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x4FDD;&#x6301;&#x5728;&#x663E;&#x793A;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x7136;&#x540E;&#x6700;&#x540E;&#x4E00;&#x77AC;&#x95F4;&#x5207;&#x6362;&#x5230;&#x9690;&#x85CF;&#xFF0C;&#x56E0;&#x6B64;&#x6548;&#x679C;&#x4E0A;&#x662F;&#x53D8;&#x5316;&#x5EF6;&#x8FDF;&#xFF0C;&#x4F9D;&#x7136;&#x6CA1;&#x6709;&#x53D8;&#x5316;&#x8FC7;&#x7A0B;&#x3002;</li>
</ol>
<p>&#x2003;&#x4E0A;&#x8FF0;&#x8868;&#x660E;&#x542F;&#x7528;transition&#x7684;<code>visibility</code>&#x5E76;&#x6CA1;&#x6709;&#x8865;&#x95F4;&#x52A8;&#x753B;&#x7684;&#x89C6;&#x89C9;&#x6548;&#x679C;&#xFF0C;&#x90A3;&#x4E48;&#x5230;&#x5E95;&#x6709;&#x4EC0;&#x4E48;&#x4F5C;&#x7528;&#x5462;&#xFF1F;&#x7B54;&#x6848;&#x5C31;&#x662F;&#x4E0D;&#x5F71;&#x54CD;/&#x8F85;&#x52A9;&#x5176;&#x4ED6;CSS&#x5C5E;&#x6027;&#x7684;&#x8865;&#x95F4;&#x52A8;&#x753B;&#x3002;&#x5176;&#x4E2D;&#x6700;&#x660E;&#x663E;&#x7684;&#x4F8B;&#x5B50;&#x5C31;&#x662F;&#x8F85;&#x52A9;<code>opacity</code>&#x5C5E;&#x6027;&#x5B9E;&#x73B0;&#x9690;&#x85CF;&#x663E;&#x793A;&#x7684;&#x8865;&#x95F4;&#x52A8;&#x753B;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
.form-input{
    display: inline-flex;
    line-height: 2;
    border: solid 1px rgba(0,0,0,0.3);
}
.form-input:hover{
        border: solid 1px rgba(0,0,0,0.4);
}
.form-addon{
    font-style: normal;
    color: #666;
    background: #ddd;
    padding-left: 10px;
    padding-right: 10px;
    border-right: solid 1px rgba(0,0,0,0.3);
}
.form-addon-after{
    border-left: solid 1px rgba(0,0,0,0.3);
    border-right: none 0;
}
.form-control{
    border:none 0;
    outline-color: transparent;
    padding: 5px;
    caret-color: #888;
    font-size: 16px;
}
.tips-host{
    position: relative;
}
.tips{
    cursor: default;
    z-index: 999;
    position: absolute;
    top: 120%;
    font-size: 12px;
    color: #444;
    background: #ccc;
    padding: .5em;
    box-shadow: 2px 2px 10px #999;
    transition: box-shadow .2s,
                       opacity 1s,
                       visibility .8s;
    visibility: hidden;
    opacity: 0;
}
.tips:hover{
    box-shadow: 2px 2px 5px #999;
}
.tips::before{
    content: &quot;&quot;;
    border: solid 10px transparent;
    border-bottom: solid 10px #ccc;
    position:  absolute;
    transform: translate(0, -100%);
}
.form-control:focus + .tips{
    visibility: visible;
    opacity: 1;
}
&lt;/style&gt;
&lt;div class=&quot;form-input tips-host&quot; &gt;
    &lt;i class=&quot;form-addon&quot;&gt;Amount&lt;/i&gt;
    &lt;input class=&quot;form-control&quot;&gt;
    &lt;div class=&quot;tips&quot;&gt;
        Starts with alphabet, then anything you would like.
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.form-input</span>{
    <span class="hljs-attribute">display</span>: inline-flex;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.3);
}
<span class="hljs-selector-class">.form-input</span><span class="hljs-selector-pseudo">:hover</span>{
        <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.4);
}
<span class="hljs-selector-class">.form-addon</span>{
    <span class="hljs-attribute">font-style</span>: normal;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#666</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ddd</span>;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border-right</span>: solid <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.3);
}
<span class="hljs-selector-class">.form-addon-after</span>{
    <span class="hljs-attribute">border-left</span>: solid <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.3);
    <span class="hljs-attribute">border-right</span>: none <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.form-control</span>{
    <span class="hljs-attribute">border</span>:none <span class="hljs-number">0</span>;
    <span class="hljs-attribute">outline-color</span>: transparent;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">caret-color</span>: <span class="hljs-number">#888</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
}
<span class="hljs-selector-class">.tips-host</span>{
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.tips</span>{
    <span class="hljs-attribute">cursor</span>: default;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">999</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">120%</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#444</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">padding</span>: .<span class="hljs-number">5em</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">10px</span> <span class="hljs-number">#999</span>;
    <span class="hljs-attribute">transition</span>: box-shadow .<span class="hljs-number">2s</span>,
                       opacity <span class="hljs-number">1s</span>,
                       visibility .<span class="hljs-number">8s</span>;
    <span class="hljs-attribute">visibility</span>: hidden;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.tips</span><span class="hljs-selector-pseudo">:hover</span>{
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">5px</span> <span class="hljs-number">#999</span>;
}
<span class="hljs-selector-class">.tips</span><span class="hljs-selector-pseudo">::before</span>{
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
    <span class="hljs-attribute">border</span>: solid <span class="hljs-number">10px</span> transparent;
    <span class="hljs-attribute">border-bottom</span>: solid <span class="hljs-number">10px</span> <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">position</span>:  absolute;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0, -100%);
}
<span class="hljs-selector-class">.form-control</span><span class="hljs-selector-pseudo">:focus</span> + <span class="hljs-selector-class">.tips</span>{
    <span class="hljs-attribute">visibility</span>: visible;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;form-input tips-host&quot;</span> &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;form-addon&quot;</span>&gt;</span>Amount<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;form-control&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tips&quot;</span>&gt;</span>
        Starts with alphabet, then anything you would like.
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015192050" src="https://static.alili.tech/img/remote/1460000015192050" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>&#x2003;&#x5F53;<code>opacity:0</code>&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x5143;&#x7D20;&#x9690;&#x85CF;&#x4E86;&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x5B83;&#x4ECD;&#x7136;&#x4F4D;&#x4E8E;&#x539F;&#x6765;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x800C;&#x4E14;&#x53EF;&#x4EE5;&#x62E6;&#x622A;&#x548C;&#x54CD;&#x5E94;&#x9F20;&#x6807;&#x4E8B;&#x4EF6;&#xFF0C;&#x5F53;&#x51FA;&#x73B0;&#x5143;&#x7D20;&#x91CD;&#x53E0;&#x65F6;&#x5219;&#x4F1A;&#x5BFC;&#x81F4;&#x5E95;&#x5C42;&#x5143;&#x7D20;&#x5931;&#x6548;&#x3002;&#x800C;&#x7531;&#x4E8E;<code>visibility:hidden</code>&#x65F6;&#xFF0C;&#x5143;&#x7D20;&#x4E0D;&#x663E;&#x793A;&#x4E14;&#x4E0D;&#x62E6;&#x622A;&#x9F20;&#x6807;&#x4E8B;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x8865;&#x95F4;&#x52A8;&#x753B;&#x7684;&#x6700;&#x540E;&#x8BBE;&#x7F6E;<code>visibility:hidden</code>&#x4E3A;&#x4E0D;&#x4FD7;&#x7684;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#x3002;</p>
<h2 id="articleHeader5">
<code>display:none</code>&#x8BA9;transition&#x5931;&#x6548;&#x7684;&#x8865;&#x6551;&#x63AA;&#x65BD;</h2>
<p>&#x2003;&#x867D;&#x7136;&#x4FEE;&#x6539;<code>display</code>&#x6709;&#x53EF;&#x80FD;&#x4F1A;&#x5F15;&#x53D1;reflow&#xFF0C;&#x4F46;&#x5B83;&#x4F9D;&#x7136;&#x4E0D;&#x80FD;&#x542F;&#x7528;Transition&#xFF0C;&#x8FD9;&#x70B9;&#x771F;&#x5FC3;&#x8981;&#x95EE;&#x95EE;&#x59D4;&#x5458;&#x4F1A;&#x4E86;&#x3002;&#x66F4;&#x8BA9;&#x4EBA;&#x7591;&#x60D1;&#x7684;&#x662F;&#xFF0C;&#x5B83;&#x4E0D;&#x5355;&#x4E0D;&#x652F;&#x6301;&#x542F;&#x7528;Transition&#xFF0C;&#x800C;&#x4E14;&#x5F53;&#x8BBE;&#x7F6E;<code>display:none</code>&#x65F6;&#x5176;&#x4F59;CSS&#x5C5E;&#x6027;&#x7684;Transition&#x5747;&#x5931;&#x6548;&#x3002;&#x96BE;&#x5230;&#x8FD9;&#x662F;&#x8BA9;&#x5143;&#x7D20;&#x8131;&#x79BB;&#x6E32;&#x67D3;&#x6811;&#x7684;&#x540E;&#x679C;&#xFF1F;&#xFF1F;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
.box{
  display: none;
  background: red;
  height: 20px;
}
&lt;/style&gt;
&lt;div class=&quot;box&quot;&gt;&lt;/div&gt;
&lt;button id=&quot;btn1&quot;&gt;Transition has no effect&lt;/button&gt;
&lt;button id=&quot;btn2&quot;&gt;Transition takes effect&lt;/button&gt;
&lt;script&gt;
const box = document.querySelector(&quot;.box&quot;)
    , btn1 = document.querySelector(&quot;#btn1&quot;)
    , btn2 = document.querySelector(&quot;#btn2&quot;)
btn1.addEventListener(&quot;click&quot;, e =&gt; {
  box.style.display = &quot;block&quot;
  box.style.background = &quot;blue&quot;
})
btn2.addEventListener(&quot;click&quot;, e =&gt; {
  box.style.display = &quot;block&quot;
  box.offsetWidth              // &#x5F3A;&#x5236;&#x6267;&#x884C;reflow
  box.style.background = &quot;blue&quot;
})
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.box</span>{
  <span class="hljs-attribute">display</span>: none;
  <span class="hljs-attribute">background</span>: red;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btn1&quot;</span>&gt;</span>Transition has no effect<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btn2&quot;</span>&gt;</span>Transition takes effect<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">const</span> box = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;.box&quot;</span>)
    , btn1 = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;#btn1&quot;</span>)
    , btn2 = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;#btn2&quot;</span>)
btn1.addEventListener(<span class="hljs-string">&quot;click&quot;</span>, e =&gt; {
  box.style.display = <span class="hljs-string">&quot;block&quot;</span>
  box.style.background = <span class="hljs-string">&quot;blue&quot;</span>
})
btn2.addEventListener(<span class="hljs-string">&quot;click&quot;</span>, e =&gt; {
  box.style.display = <span class="hljs-string">&quot;block&quot;</span>
  box.offsetWidth              <span class="hljs-comment">// &#x5F3A;&#x5236;&#x6267;&#x884C;reflow</span>
  box.style.background = <span class="hljs-string">&quot;blue&quot;</span>
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x70B9;&#x51FB;btn1&#x65F6;&#x80CC;&#x666F;&#x8272;&#x7684;transition&#x5931;&#x6548;&#xFF0C;&#x800C;&#x70B9;&#x51FB;btn2&#x5219;&#x751F;&#x6548;&#xFF0C;&#x5173;&#x952E;&#x533A;&#x522B;&#x5C31;&#x662F;&#x901A;&#x8FC7;<code>box.offsetWidth</code>&#x5F3A;&#x5236;&#x6267;&#x884C;reflow&#xFF0C;&#x8BA9;&#x5143;&#x7D20;&#x5148;&#x52A0;&#x5165;&#x6E32;&#x67D3;&#x6811;&#x8FDB;&#x884C;&#x6E32;&#x67D3;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x4FEE;&#x6539;&#x80CC;&#x666F;&#x8272;&#x6267;&#x884C;repaint&#x3002;<br>&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x7684;&#x8865;&#x6551;&#x63AA;&#x65BD;&#x5C31;&#x662F;&#x2014;&#x2014;&#x5F3A;&#x5236;&#x6267;&#x884C;reflow&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x64CD;&#x4F5C;&#x5747;&#x53EF;&#x5F3A;&#x5236;&#x6267;&#x884C;reflow(&#x6CE8;&#x610F;&#xFF1A;&#x4F1A;&#x5F71;&#x54CD;&#x6027;&#x80FD;&#x54E6;&#xFF01;)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="offsetWidth, offsetHeight, offsetTop, offsetLeft
scrollWidth, scrollHeight, scrollTop, scrollLeft
clientWidth, clientHeight, clientTop, clientLeft
getComputeStyle(), currentStyle()" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>offsetWidth, offsetHeight, offsetTop, offsetLeft
<span class="hljs-keyword">scrollWidth, </span><span class="hljs-keyword">scrollHeight, </span><span class="hljs-keyword">scrollTop, </span><span class="hljs-keyword">scrollLeft
</span>clientWidth, clientHeight, clientTop, clientLeft
getComputeStyle(), currentStyle()</code></pre>
<h2 id="articleHeader6">&#x603B;&#x7ED3;</h2>
<p>&#x5C0A;&#x91CD;&#x539F;&#x521B;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x8F6C;&#x81EA;&#xFF1A;<a href="https://www.cnblogs.com/fsjohnhuang/p/9143035.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/fsjoh...</a> ^_^&#x80A5;&#x4ED4;John</p>
<h2 id="articleHeader7">&#x53C2;&#x8003;</h2>
<p><a href="http://www.zhangxinxu.com/wordpress/2013/05/transition-visibility-show-hide/" rel="nofollow noreferrer" target="_blank">&#x5C0F;tip: transition&#x4E0E;visibility</a><br><a href="https://www.cnblogs.com/surfaces/p/4324044.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/surfa...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS魔法堂：Transition就这么好玩

## 原文链接
[https://segmentfault.com/a/1190000015192045](https://segmentfault.com/a/1190000015192045)

