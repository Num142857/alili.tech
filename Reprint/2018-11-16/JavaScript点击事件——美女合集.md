---
title: 'JavaScript点击事件——美女合集' 
date: 2018-11-16 2:30:07
hidden: true
slug: vi32h2qgdt
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">Js&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x2014;&#x2014;&#x7F8E;&#x5973;&#x5408;&#x96C6;</h2><h3 id="articleHeader1"><strong>&#x5B9E;&#x4F8B;</strong></h3><p><strong>&#x6548;&#x679C;&#x5982;&#x4E0B;&#x56FE;</strong>&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbflBx?w=833&amp;h=540" src="https://static.alili.tech/img/bVbflBx?w=833&amp;h=540" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;

&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;Js &#x7F8E;&#x5973;&#x5408;&#x96C6;&lt;/title&gt;
    &lt;style&gt;
        * {
            padding: 0;
            margin: 0;
        }
        body{
            background: #000;
        }
        .parent {
            width: 500px;
            margin: 20px auto;
        }
        .parent .pic {
            width: 100%;
            height: 400px;
        }
        .parent .pic img {
            width: 100%;
            height: 100%;
        }
        .box {
            display: flex;
        }
        .box div {
            flex: 1;
            text-align: center;
            line-height: 100px;
            color: #fff;
        }
        .box div input {
            width: 80px;
            height: 30px;
            border-radius: 5px;
        }
        #txt{
            color: red;
            font-size: 24px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
   &lt;div class=&quot;parent&quot;&gt;
        &lt;div class=&quot;pic&quot;&gt;
            &lt;img src=&quot;1.jpg&quot; alt=&quot;&quot; id=&quot;pic&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;box&quot;&gt;
            &lt;div&gt;
                &lt;input type=&quot;button&quot; value=&quot;&#x4E0A;&#x4E00;&#x5F20;&quot; id=&quot;btnLast&quot;&gt;
            &lt;/div&gt;
            &lt;div&gt;
                &#x7B2C; &lt;span id=&quot;txt&quot;&gt;1&lt;/span&gt; &#x5F20;
            &lt;/div&gt;
            &lt;div&gt;
                &lt;input type=&quot;button&quot; value=&quot;&#x4E0B;&#x4E00;&#x5F20;&quot; id=&quot;btnNext&quot;&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;script&gt;
        var index = 1;
        document.getElementById(&quot;btnNext&quot;).onclick = function () {

            if (index &lt; 14) {
                index++;
            }
            document.getElementById(&quot;txt&quot;).innerHTML=index;
            document.getElementById(&quot;pic&quot;).src = index + &quot;.jpg&quot;;
        };
        document.getElementById(&quot;btnLast&quot;).onclick = function () {

            if (index &gt; 1) {
                index--;
            }
            document.getElementById(&quot;txt&quot;).innerHTML=index;
            document.getElementById(&quot;pic&quot;).src = index + &quot;.jpg&quot;;
        };
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Js &#x7F8E;&#x5973;&#x5408;&#x96C6;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        * {
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-tag">body</span>{
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
        }
        <span class="hljs-selector-class">.parent</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
        }
        <span class="hljs-selector-class">.parent</span> <span class="hljs-selector-class">.pic</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
        }
        <span class="hljs-selector-class">.parent</span> <span class="hljs-selector-class">.pic</span> <span class="hljs-selector-tag">img</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        }
        <span class="hljs-selector-class">.box</span> {
            <span class="hljs-attribute">display</span>: flex;
        }
        <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">div</span> {
            <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
            <span class="hljs-attribute">text-align</span>: center;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        }
        <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">input</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
        }
        <span class="hljs-selector-id">#txt</span>{
            <span class="hljs-attribute">color</span>: red;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pic&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;1.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;pic&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;&#x4E0A;&#x4E00;&#x5F20;&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btnLast&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                &#x7B2C; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;txt&quot;</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> &#x5F20;
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;&#x4E0B;&#x4E00;&#x5F20;&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btnNext&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> index = <span class="hljs-number">1</span>;
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;btnNext&quot;</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

            <span class="hljs-keyword">if</span> (index &lt; <span class="hljs-number">14</span>) {
                index++;
            }
            <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;txt&quot;</span>).innerHTML=index;
            <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;pic&quot;</span>).src = index + <span class="hljs-string">&quot;.jpg&quot;</span>;
        };
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;btnLast&quot;</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

            <span class="hljs-keyword">if</span> (index &gt; <span class="hljs-number">1</span>) {
                index--;
            }
            <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;txt&quot;</span>).innerHTML=index;
            <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;pic&quot;</span>).src = index + <span class="hljs-string">&quot;.jpg&quot;</span>;
        };
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><h3 id="articleHeader2"><strong>&#x5B9A;&#x4E49;&#x548C;&#x7528;&#x6CD5;</strong></h3><p>onclick &#x4E8B;&#x4EF6;&#x4F1A;&#x5728;&#x5BF9;&#x8C61;&#x88AB;&#x70B9;&#x51FB;&#x65F6;&#x53D1;&#x751F;&#x3002;</p><p>&#x8BF7;&#x6CE8;&#x610F;&#xFF0C; onclick &#x4E0E; onmousedown &#x4E0D;&#x540C;&#x3002;&#x5355;&#x51FB;&#x4E8B;&#x4EF6;&#x662F;&#x5728;&#x540C;&#x4E00;&#x5143;&#x7D20;&#x4E0A;&#x53D1;&#x751F;&#x4E86;&#x9F20;&#x6807;&#x6309;&#x4E0B;&#x4E8B;&#x4EF6;&#x4E4B;&#x540E;&#x53C8;&#x53D1;&#x751F;&#x4E86;&#x9F20;&#x6807;&#x653E;&#x5F00;&#x4E8B;&#x4EF6;&#x65F6;&#x624D;&#x53D1;&#x751F;&#x7684;&#x3002;</p><h3 id="articleHeader3"><strong>&#x8BED;&#x6CD5;</strong></h3><p><strong>HTML &#x4E2D;:</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;element onclick=&quot;SomeJavaScriptCode&quot;&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">element</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;SomeJavaScriptCode&quot;</span>&gt;</span></code></pre><p>JavaScript &#x4E2D;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="object.onclick=function(){SomeJavaScriptCode};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">object</span>.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span><span class="hljs-comment">{SomeJavaScriptCode}</span>;</span></code></pre><h3 id="articleHeader4"><strong>&#x652F;&#x6301;&#x8BE5;&#x4E8B;&#x4EF6;&#x7684; HTML &#x6807;&#x7B7E;&#xFF1A;</strong></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;a&gt;, &lt;address&gt;, &lt;area&gt;, &lt;b&gt;, &lt;bdo&gt;, &lt;big&gt;, &lt;blockquote&gt;, &lt;body&gt;, &lt;button&gt;, 
&lt;caption&gt;, &lt;cite&gt;, &lt;code&gt;, &lt;dd&gt;, &lt;dfn&gt;, &lt;div&gt;, &lt;dl&gt;, &lt;dt&gt;, &lt;em&gt;, &lt;fieldset&gt;, 
&lt;form&gt;, &lt;h1&gt; to &lt;h6&gt;, &lt;hr&gt;, &lt;i&gt;, &lt;img&gt;, &lt;input&gt;, &lt;kbd&gt;, &lt;label&gt;, &lt;legend&gt;, 
&lt;li&gt;, &lt;map&gt;, &lt;object&gt;, &lt;ol&gt;, &lt;p&gt;, &lt;pre&gt;, &lt;samp&gt;, &lt;select&gt;, &lt;small&gt;, &lt;span&gt;, 
&lt;strong&gt;, &lt;sub&gt;, &lt;sup&gt;, &lt;table&gt;, &lt;tbody&gt;, &lt;td&gt;, &lt;textarea&gt;, &lt;tfoot&gt;, &lt;th&gt;, 
&lt;thead&gt;, &lt;tr&gt;, &lt;tt&gt;, &lt;ul&gt;, &lt;var&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code><span class="hljs-variable">&lt;a&gt;</span>, <span class="hljs-variable">&lt;address&gt;</span>, <span class="hljs-variable">&lt;area&gt;</span>, <span class="hljs-variable">&lt;b&gt;</span>, <span class="hljs-variable">&lt;bdo&gt;</span>, <span class="hljs-variable">&lt;big&gt;</span>, <span class="hljs-variable">&lt;blockquote&gt;</span>, <span class="hljs-variable">&lt;body&gt;</span>, <span class="hljs-variable">&lt;button&gt;</span>, 
<span class="hljs-variable">&lt;caption&gt;</span>, <span class="hljs-variable">&lt;cite&gt;</span>, <span class="hljs-variable">&lt;code&gt;</span>, <span class="hljs-variable">&lt;dd&gt;</span>, <span class="hljs-variable">&lt;dfn&gt;</span>, <span class="hljs-variable">&lt;div&gt;</span>, <span class="hljs-variable">&lt;dl&gt;</span>, <span class="hljs-variable">&lt;dt&gt;</span>, <span class="hljs-variable">&lt;em&gt;</span>, <span class="hljs-variable">&lt;fieldset&gt;</span>, 
<span class="hljs-variable">&lt;form&gt;</span>, <span class="hljs-variable">&lt;h1&gt;</span> <span class="hljs-keyword">to</span> <span class="hljs-variable">&lt;h6&gt;</span>, <span class="hljs-variable">&lt;hr&gt;</span>, <span class="hljs-variable">&lt;i&gt;</span>, <span class="hljs-variable">&lt;img&gt;</span>, <span class="hljs-variable">&lt;input&gt;</span>, <span class="hljs-variable">&lt;kbd&gt;</span>, <span class="hljs-variable">&lt;label&gt;</span>, <span class="hljs-variable">&lt;legend&gt;</span>, 
<span class="hljs-variable">&lt;li&gt;</span>, <span class="hljs-variable">&lt;map&gt;</span>, <span class="hljs-variable">&lt;object&gt;</span>, <span class="hljs-variable">&lt;ol&gt;</span>, <span class="hljs-variable">&lt;p&gt;</span>, <span class="hljs-variable">&lt;pre&gt;</span>, <span class="hljs-variable">&lt;samp&gt;</span>, <span class="hljs-variable">&lt;select&gt;</span>, <span class="hljs-variable">&lt;small&gt;</span>, <span class="hljs-variable">&lt;span&gt;</span>, 
<span class="hljs-variable">&lt;strong&gt;</span>, <span class="hljs-variable">&lt;sub&gt;</span>, <span class="hljs-variable">&lt;sup&gt;</span>, <span class="hljs-variable">&lt;table&gt;</span>, <span class="hljs-variable">&lt;tbody&gt;</span>, <span class="hljs-variable">&lt;td&gt;</span>, <span class="hljs-variable">&lt;textarea&gt;</span>, <span class="hljs-variable">&lt;tfoot&gt;</span>, <span class="hljs-variable">&lt;th&gt;</span>, 
<span class="hljs-variable">&lt;thead&gt;</span>, <span class="hljs-variable">&lt;tr&gt;</span>, <span class="hljs-variable">&lt;tt&gt;</span>, <span class="hljs-variable">&lt;ul&gt;</span>, <span class="hljs-variable">&lt;var&gt;</span></code></pre><h3 id="articleHeader5"><strong>&#x652F;&#x6301;&#x6539;&#x4E8B;&#x4EF6;&#x7684; JavaScript &#x5BF9;&#x8C61;&#xFF1A;</strong></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="button, document, checkbox, link, radio, reset, submit" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs perl"><code style="word-break:break-word;white-space:initial">button, document, checkbox, <span class="hljs-keyword">link</span>, radio, <span class="hljs-keyword">reset</span>, submit</code></pre><h3 id="articleHeader6"><strong>&#x5B9E;&#x4F8B;</strong></h3><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;

&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;Js &#x7F8E;&#x5973;&#x5408;&#x96C6;&lt;/title&gt;
    &lt;style&gt;
        * {
            padding: 0;
            margin: 0;
        }
        body{
            background: #000;
        }
        .parent {
            width: 500px;
            margin: 20px auto;
        }
        .parent .pic {
            width: 100%;
            height: 400px;
        }
        .parent .pic img {
            width: 100%;
            height: 100%;
        }
        .box {
            display: flex;
        }
        .box div {
            flex: 1;
            text-align: center;
            line-height: 100px;
            color: #fff;
        }
        .box div input {
            width: 80px;
            height: 30px;
            border-radius: 5px;
        }
        #txt{
            color: red;
            font-size: 24px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
   &lt;div class=&quot;parent&quot;&gt;
        &lt;div class=&quot;pic&quot;&gt;
            &lt;img src=&quot;1.jpg&quot; alt=&quot;&quot; id=&quot;pic&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;box&quot;&gt;
            &lt;div&gt;
                &lt;input type=&quot;button&quot; value=&quot;&#x4E0A;&#x4E00;&#x5F20;&quot; id=&quot;btnLast&quot;&gt;
            &lt;/div&gt;
            &lt;div&gt;
                &#x7B2C; &lt;span id=&quot;txt&quot;&gt;1&lt;/span&gt; &#x5F20;
            &lt;/div&gt;
            &lt;div&gt;
                &lt;input type=&quot;button&quot; value=&quot;&#x4E0B;&#x4E00;&#x5F20;&quot; id=&quot;btnNext&quot;&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;script&gt;
        var index = 1;
        var txt=document.getElementById(&quot;txt&quot;);
        var pic= document.getElementById(&quot;pic&quot;);
        document.getElementById(&quot;btnNext&quot;).onclick = function () {

            if (index &lt; 14) {
                index++;
            }
            txt.innerHTML=index;
            document.getElementById(&quot;pic&quot;).src = index + &quot;.jpg&quot;;
        };
        document.getElementById(&quot;btnLast&quot;).onclick = function () {

            if (index &gt; 1) {
                index--;
            }
            txt.innerHTML=index;
            pic.src = index + &quot;.jpg&quot;;
        };
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Js &#x7F8E;&#x5973;&#x5408;&#x96C6;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        * {
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-tag">body</span>{
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
        }
        <span class="hljs-selector-class">.parent</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
        }
        <span class="hljs-selector-class">.parent</span> <span class="hljs-selector-class">.pic</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
        }
        <span class="hljs-selector-class">.parent</span> <span class="hljs-selector-class">.pic</span> <span class="hljs-selector-tag">img</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        }
        <span class="hljs-selector-class">.box</span> {
            <span class="hljs-attribute">display</span>: flex;
        }
        <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">div</span> {
            <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
            <span class="hljs-attribute">text-align</span>: center;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        }
        <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">input</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
        }
        <span class="hljs-selector-id">#txt</span>{
            <span class="hljs-attribute">color</span>: red;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pic&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;1.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;pic&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;&#x4E0A;&#x4E00;&#x5F20;&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btnLast&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                &#x7B2C; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;txt&quot;</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> &#x5F20;
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;&#x4E0B;&#x4E00;&#x5F20;&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btnNext&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> index = <span class="hljs-number">1</span>;
        <span class="hljs-keyword">var</span> txt=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;txt&quot;</span>);
        <span class="hljs-keyword">var</span> pic= <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;pic&quot;</span>);
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;btnNext&quot;</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

            <span class="hljs-keyword">if</span> (index &lt; <span class="hljs-number">14</span>) {
                index++;
            }
            txt.innerHTML=index;
            <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;pic&quot;</span>).src = index + <span class="hljs-string">&quot;.jpg&quot;</span>;
        };
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;btnLast&quot;</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

            <span class="hljs-keyword">if</span> (index &gt; <span class="hljs-number">1</span>) {
                index--;
            }
            txt.innerHTML=index;
            pic.src = index + <span class="hljs-string">&quot;.jpg&quot;</span>;
        };
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x8FD0;&#x884C;&#x6548;&#x679C;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p><h2 id="articleHeader7">&#x6301;&#x7EED;&#x66F4;&#x65B0;&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6307;&#x6559;&#xFF01;</h2>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript点击事件——美女合集

## 原文链接
[https://segmentfault.com/a/1190000016011976](https://segmentfault.com/a/1190000016011976)

