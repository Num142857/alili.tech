---
title: flex几种多列布局
hidden: true
categories: reprint
slug: 25fe6634
date: 2018-11-03 10:03:44
---

{{< raw >}}
<h2 id="articleHeader0">&#x57FA;&#x672C;&#x7684;&#x7B49;&#x5206;&#x4E09;&#x5217;&#x5E03;&#x5C40;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
        display: flex;
        width: 500px;
        height: 200px;
    }
    .left{
        flex:1;
        background: red;
    }
    .middle{
        flex:1;
        background: green;
    }
    .right{
        flex:1;
        background: blue;
    }
&lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;middle&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;
&lt;/div&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>.container{
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    }
    .<span class="hljs-attribute">left</span>{
        <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
        <span class="hljs-attribute">background</span>: red;
    }
    .middle{
        <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
        <span class="hljs-attribute">background</span>: green;
    }
    .<span class="hljs-attribute">right</span>{
        <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
        <span class="hljs-attribute">background</span>: blue;
    }
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;container&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;left&quot;</span>&gt;&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;middle&quot;</span>&gt;&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;right&quot;</span>&gt;&lt;/div&gt;
&lt;/div&gt;

</code></pre><p><span class="img-wrap"><img data-src="/img/bVbigxd?w=502&amp;h=199" src="https://static.alili.tech/img/bVbigxd?w=502&amp;h=199" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x4E09;&#x5217; &#x5DE6;&#x4E2D;&#x5B9A;&#x5BBD; &#x53F3;&#x4FA7;&#x81EA;&#x9002;&#x5E94;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .container{
        display: flex;
        height: 300px;
    }
    .left{
        flex: 0 0 100px;
        background-color: red;
    }
    .middle{
        flex: 0 0 100px;
        background-color: green;
    }
    .right{
        flex:1;
        background-color: blue;
    }
  &lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;left&quot;&gt;qqq&lt;/div&gt;
    &lt;div class=&quot;middle&quot;&gt;qqq&lt;/div&gt;
    &lt;div class=&quot;right&quot;&gt;wwww&lt;/div&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>    .container{
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    }
    .<span class="hljs-attribute">left</span>{
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background-color</span>: red;
    }
    .middle{
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background-color</span>: green;
    }
    .<span class="hljs-attribute">right</span>{
        <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
        <span class="hljs-attribute">background-color</span>: blue;
    }
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;container&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;left&quot;</span>&gt;qqq&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;middle&quot;</span>&gt;qqq&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;right&quot;</span>&gt;wwww&lt;/div&gt;
&lt;/div&gt;
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbigxH?w=1353&amp;h=296" src="https://static.alili.tech/img/bVbigxH?w=1353&amp;h=296" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>&#x7F29;&#x5C0F;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x540E;<br><span class="img-wrap"><img data-src="/img/bVbigxL?w=443&amp;h=300" src="https://static.alili.tech/img/bVbigxL?w=443&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">&#x5DE6;&#x53F3;&#x56FA;&#x5B9A;&#xFF0C;&#x4E2D;&#x95F4;&#x81EA;&#x9002;&#x5E94;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .container{
        display: flex;
        height: 300px;
    }
    .left{
        width: 100px;
        background-color: red;
    }
    .middle{
        flex: 1;
        background-color: green;
    }
    .right{
       width: 100px;
        background-color: blue;
    }
   &lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;left&quot;&gt;qqq&lt;/div&gt;
    &lt;div class=&quot;middle&quot;&gt;qqq&lt;/div&gt;
    &lt;div class=&quot;right&quot;&gt;wwww&lt;/div&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>    .container{
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    }
    .<span class="hljs-attribute">left</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background-color</span>: red;
    }
    .middle{
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">background-color</span>: green;
    }
    .<span class="hljs-attribute">right</span>{
       <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background-color</span>: blue;
    }
   &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;container&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;left&quot;</span>&gt;qqq&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;middle&quot;</span>&gt;qqq&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;right&quot;</span>&gt;wwww&lt;/div&gt;
&lt;/div&gt;
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbigxM?w=1351&amp;h=301" src="https://static.alili.tech/img/bVbigxM?w=1351&amp;h=301" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>&#x7F29;&#x5C0F;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x540E;</p><p><span class="img-wrap"><img data-src="/img/bVbigxN?w=443&amp;h=301" src="https://static.alili.tech/img/bVbigxN?w=443&amp;h=301" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader3">&#x4E5D;&#x5BAB;&#x683C;&#x5E03;&#x5C40;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .container{
        display: flex;
        height: 300px;
        width: 300px;
        flex-direction: column;
    }
    .row{
        display: flex;
        height: 100px;
    }
    .left{
        flex: 1;
        height: 100px;
        border: 1px solid red;
    }
    .middle{
        flex: 1;
        height: 100px;
        border: 1px solid green;
    }
    .right{
        flex: 1;
        height: 100px;
        border: 1px solid blue;
    }
    &lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;row&quot;&gt;
        &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;middle&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;row&quot;&gt;
        &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;middle&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;row&quot;&gt;
        &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;middle&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>    .container{
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">flex-direction</span>: column;
    }
    .row{
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    }
    .<span class="hljs-attribute">left</span>{
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
    }
    .middle{
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid green;
    }
    .<span class="hljs-attribute">right</span>{
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid blue;
    }
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;container&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;row&quot;</span>&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;left&quot;</span>&gt;&lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;middle&quot;</span>&gt;&lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;right&quot;</span>&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;row&quot;</span>&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;left&quot;</span>&gt;&lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;middle&quot;</span>&gt;&lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;right&quot;</span>&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;row&quot;</span>&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;left&quot;</span>&gt;&lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;middle&quot;</span>&gt;&lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;right&quot;</span>&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

</code></pre><p><span class="img-wrap"><img data-src="/img/bVbigyi?w=317&amp;h=316" src="https://static.alili.tech/img/bVbigyi?w=317&amp;h=316" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader4">&#x5723;&#x676F;&#x5E03;&#x5C40;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    *{
        margin:0;
        padding:0;
    }
    .container{
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content: space-between;
    }
    .header{
        background: red;
        flex: 0 0 100px;
    }
    .content{
        display: flex;
        flex:1;
    }
    .content-left{
        flex: 0 0 100px;
        background: green;
    }
    .content-right{
        flex: 0 0 100px;
        background: pink;
    }
    .content-middle{
        flex:1;
    }
    .footer{
        background: yellow;
        flex: 0 0 100px;
    }
    &lt;div class=&quot;container&quot;&gt;
    &lt;div class=&quot;header&quot;&gt;Header&lt;/div&gt;
    &lt;div class=&quot;content&quot;&gt;
        &lt;div class=&quot;content-left&quot;&gt;Left&lt;/div&gt;
        &lt;div class=&quot;content-middle&quot;&gt;Center&lt;/div&gt;
        &lt;div class=&quot;content-right&quot;&gt;Right&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;footer&quot;&gt;Footer&lt;/div&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>    *{
        <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
    }
    .container{
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">flex-direction</span>: column;
        <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>;
        <span class="hljs-attribute">justify-content</span>: space-between;
    }
    .header{
        <span class="hljs-attribute">background</span>: red;
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100px</span>;
    }
    .<span class="hljs-attribute">content</span>{
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
    }
    .<span class="hljs-attribute">content</span>-left{
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background</span>: green;
    }
    .<span class="hljs-attribute">content</span>-right{
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background</span>: pink;
    }
    .<span class="hljs-attribute">content</span>-middle{
        <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
    }
    .footer{
        <span class="hljs-attribute">background</span>: yellow;
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100px</span>;
    }
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;container&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;header&quot;</span>&gt;Header&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;content&quot;</span>&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;content-left&quot;</span>&gt;Left&lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;content-middle&quot;</span>&gt;Center&lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;content-right&quot;</span>&gt;Right&lt;/div&gt;
    &lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;footer&quot;</span>&gt;Footer&lt;/div&gt;
&lt;/div&gt;
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbigyd?w=1366&amp;h=662" src="https://static.alili.tech/img/bVbigyd?w=1366&amp;h=662" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>&#x7F29;&#x5C0F;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x4E4B;&#x540E;</p><p><span class="img-wrap"><img data-src="/img/bVbigye?w=681&amp;h=499" src="https://static.alili.tech/img/bVbigye?w=681&amp;h=499" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
flex几种多列布局

## 原文链接
[https://segmentfault.com/a/1190000016707517](https://segmentfault.com/a/1190000016707517)

