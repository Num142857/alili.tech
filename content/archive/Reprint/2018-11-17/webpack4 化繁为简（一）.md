---
title: 'webpack4 化繁为简（一）' 
date: 2018-11-17 2:30:13
hidden: true
slug: 2aty99cpus2
categories: reprint
---

{{< raw >}}
<p>webpack4&#x524D;&#x8A00;&#x80CC;&#x666F;&#x7528;&#x9014;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x4E0A;&#x6765;&#x5C31;&#x5E72;&#x3002;&#x4ECE;&#x6700;&#x7B80;&#x5355;&#x7684;demo&#x5230;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x5B9E;&#x8DF5;&#x3002;(&#x6307;&#x4EE4;&#x662F;window &#x5E73;&#x53F0;&#x4E0B;&#xFF0C;&#x5E76;&#x4E14;&#x4F7F;&#x7528;&#x4E86;cnpm &#x6765;&#x5B89;&#x88C5;&#x5305;&#x7684;&#x4F9D;&#x8D56;.)<br>&#x4E00;.&#x57FA;&#x7840;demo<br>1.&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init -y" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">npm</span> init -y</code></pre><p>&#x4F1A;&#x5728;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x4E0B;&#x521B;&#x5EFA;package.json &#x6587;&#x4EF6;.<br>2.&#x5B89;&#x88C5;webpack webpack-cli</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install webpack webpack-cli --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs q"><code style="word-break:break-word;white-space:initial">cnpm install webpack webpack-cli --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre><p>3.&#x4E0B;&#x9762;&#x6765;&#x5199;&#x6700;&#x7B80;&#x5355;&#x7684;&#x4E00;&#x4E2A;&#x5165;&#x95E8;demo&#x3002;&#x521B;&#x5EFA;src dist &#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5206;&#x522B;&#x7528;&#x6765;&#x653E;&#x6E90;&#x7801;&#x548C;&#x6253;&#x5305;&#x540E;&#x7684;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir src
mkdir dist" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-built_in">mkdir</span> src
<span class="hljs-built_in">mkdir</span> dist</code></pre><p>&#x5728;src &#x624B;&#x52A8;&#x521B;&#x5EFA;entry.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById(&apos;title&apos;).innerHTML=&apos;monkeykg&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;title&apos;</span>).innerHTML=<span class="hljs-string">&apos;monkeykg&apos;</span></code></pre><p>&#x5728;&#x9879;&#x76EE;&#x7684;&#x6839;&#x76EE;&#x5F55;&#x521B;&#x5EFA;webpack.config.js,&#x5185;&#x5BB9;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path=require(&apos;path&apos;);
module.exports={
    mode:&quot;development&quot;,
    entry:[
        path.join(__dirname,&apos;./src/entry.js&apos;)
    ],
    output:{
        path:path.join(__dirname,&apos;dist&apos;),
        filename:&apos;bundle.js&apos;
    },
    // module:{},
    // plugins:[],
    // devServer:{}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>const path=require(<span class="hljs-string">&apos;path&apos;</span>);
module.exports={
    mode:<span class="hljs-string">&quot;development&quot;</span>,
    entry:[
        path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>,<span class="hljs-string">&apos;./src/entry.js&apos;</span>)
    ],
    output:{
        path:path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>,<span class="hljs-string">&apos;dist&apos;</span>),
        filename:<span class="hljs-string">&apos;bundle.js&apos;</span>
    },
    <span class="hljs-comment">// module:{},</span>
    <span class="hljs-comment">// plugins:[],</span>
    <span class="hljs-comment">// devServer:{}</span>
}</code></pre><p>&#x4E3A;&#x4E86;&#x7B80;&#x5316;webpack &#x8FD0;&#x884C;&#x7684;&#x6307;&#x4EE4;&#x8F93;&#x5165;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;package.json&#x6587;&#x4EF6;&#x7684;&#x6DFB;&#x52A0;&#x914D;&#x7F6E;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;build&quot;:&quot;npx webpack --config webpack.config.js&quot;//&#x624B;&#x52A8;&#x6DFB;&#x52A0;
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;test&quot;</span>: <span class="hljs-string">&quot;echo \&quot;</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">&quot; &amp;&amp; exit 1&quot;</span>,
    <span class="hljs-string">&quot;build&quot;</span>:<span class="hljs-string">&quot;npx webpack --config webpack.config.js&quot;</span><span class="hljs-comment">//&#x624B;&#x52A8;&#x6DFB;&#x52A0;</span>
  },</code></pre><p>&#x53EF;&#x4EE5;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x4E2D;&#x8FD0;&#x884C;&#x4E86;&#x3002;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre><p>webpack&#x6700;&#x7B80;&#x5355;&#x7684;&#x4E00;&#x4E2A;demo&#x5B8C;&#x6210;&#xFF0C;&#x5728;dist&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;bundle.js&#x6587;&#x4EF6;&#xFF0C;&#x540C;&#x65F6;&#x624B;&#x52A8;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;index.html&#x5728;dist&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x5185;&#x5BB9;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id=&quot;title&quot;&gt;&lt;/div&gt;
    &lt;script src=&quot;./bundle.js&quot;&gt; &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./bundle.js&quot;</span>&gt;</span><span class="undefined"> </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x6D4F;&#x89C8;&#x5668;&#x8FD0;&#x884C;index.html,&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6253;&#x5305;&#x6587;&#x4EF6;&#x7684;js&#x5DF2;&#x7ECF;&#x751F;&#x6548;&#xFF0C;&#x9875;&#x9762;&#x4E0A;&#x6709; monkeykg &#x663E;&#x793A;&#x3002;<br>&#x9644;&#x4E0A;&#x9879;&#x76EE;&#x7684;demo &#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;<br><span class="img-wrap"><img data-src="/img/bVbfabT?w=247&amp;h=285" src="https://static.alili.tech/img/bVbfabT?w=247&amp;h=285" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x4E8C;.&#x8FDB;&#x9636;<br>1.&#x591A;&#x4E2A;&#x5165;&#x53E3;<br>webpack.config.js&#x4FEE;&#x6539;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path=require(&apos;path&apos;);
module.exports={
    mode:&quot;development&quot;,
    entry:[
        path.join(__dirname,&apos;./src/entry.js&apos;),
        path.join(__dirname,&apos;./src/entry1.js&apos;),//&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5165;&#x53E3;&#x6587;&#x4EF6;
    ],
    output:{
        path:path.join(__dirname,&apos;dist&apos;),
        filename:&apos;[name].js&apos;//&#x51FA;&#x53E3;&#x6587;&#x4EF6;
    },
    // module:{},
    // plugins:[],
    // devServer:{}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>const path=require(<span class="hljs-string">&apos;path&apos;</span>);
module.exports={
    mode:<span class="hljs-string">&quot;development&quot;</span>,
    entry:[
        path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>,<span class="hljs-string">&apos;./src/entry.js&apos;</span>),
        path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>,<span class="hljs-string">&apos;./src/entry1.js&apos;</span>),<span class="hljs-comment">//&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
    ],
    output:{
        path:path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>,<span class="hljs-string">&apos;dist&apos;</span>),
        filename:<span class="hljs-string">&apos;[name].js&apos;</span><span class="hljs-comment">//&#x51FA;&#x53E3;&#x6587;&#x4EF6;</span>
    },
    <span class="hljs-comment">// module:{},</span>
    <span class="hljs-comment">// plugins:[],</span>
    <span class="hljs-comment">// devServer:{}</span>
}</code></pre><p>entry1.js&#x6587;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById(&apos;title&apos;).style.color=&apos;red&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;title&apos;</span>).style.color=<span class="hljs-string">&apos;red&apos;</span>;</code></pre><p>&#x5220;&#x9664;dist&#x7684;bundle.js&#xFF0C;&#x7136;&#x540E;&#x8FD0;&#x884C;npm run build&#xFF0C;&#x6253;&#x5305;&#x751F;&#x6210;&#x4E00;&#x4E2A;main.js&#x6587;&#x4EF6;&#x3002;index.html&#x4FEE;&#x6539;&#x5F15;&#x5165;script&#x7684;&#x8DEF;&#x5F84;&apos;./main.js&apos; ,&#x6D4F;&#x89C8;&#x5668;&#x8FD0;&#x884C;index.html,&#x8F93;&#x51FA;&#x7EA2;&#x8272;&#x7684; monkeykg<br>2.&#x6DFB;&#x52A0;&#x70ED;&#x66F4;&#x65B0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install --save-dev webpack-dev-server" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs q"><code style="word-break:break-word;white-space:initial">cnpm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> webpack-<span class="hljs-built_in">dev</span>-server</code></pre><p>&#x5728;webpack.config.js&#x6DFB;&#x52A0;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF08;&#x9644;&#x56FE;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path=require(&apos;path&apos;);
const webpackDevServer=require(&apos;webpack-dev-server&apos;)
module.exports={
    mode:&quot;development&quot;,
    entry:[
        path.join(__dirname,&apos;./src/entry.js&apos;),
        path.join(__dirname,&apos;./src/entry1.js&apos;),
    ],
    output:{
        path:path.join(__dirname,&apos;dist&apos;),
        filename:&apos;[name].js&apos;
    },
    // module:{},
    // plugins:[],
    devServer:{
        contentBase:path.join(__dirname,&apos;dist&apos;),
        host:&apos;localhost&apos;,
        compress:true,
        port:8888
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>const path=require(<span class="hljs-string">&apos;path&apos;</span>);
const webpackDevServer=require(<span class="hljs-string">&apos;webpack-dev-server&apos;</span>)
module.exports={
    mode:<span class="hljs-string">&quot;development&quot;</span>,
    entry:[
        path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>,<span class="hljs-string">&apos;./src/entry.js&apos;</span>),
        path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>,<span class="hljs-string">&apos;./src/entry1.js&apos;</span>),
    ],
    output:{
        path:path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>,<span class="hljs-string">&apos;dist&apos;</span>),
        filename:<span class="hljs-string">&apos;[name].js&apos;</span>
    },
    <span class="hljs-comment">// module:{},</span>
    <span class="hljs-comment">// plugins:[],</span>
    devServer:{
        contentBase:path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>,<span class="hljs-string">&apos;dist&apos;</span>),
        host:<span class="hljs-string">&apos;localhost&apos;</span>,
        compress:<span class="hljs-literal">true</span>,
        port:<span class="hljs-number">8888</span>
    }
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfag6?w=482&amp;h=444" src="https://static.alili.tech/img/bVbfag6?w=482&amp;h=444" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>package.json &#x6DFB;&#x52A0;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;build&quot;: &quot;npx webpack --config webpack.config.js&quot;,
    &quot;server&quot;:&quot;webpack-dev-server&quot;
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;test&quot;</span>: <span class="hljs-string">&quot;echo \&quot;</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">&quot; &amp;&amp; exit 1&quot;</span>,
    <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;npx webpack --config webpack.config.js&quot;</span>,
    <span class="hljs-string">&quot;server&quot;</span>:<span class="hljs-string">&quot;webpack-dev-server&quot;</span>
  },</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfahq?w=488&amp;h=115" src="https://static.alili.tech/img/bVbfahq?w=488&amp;h=115" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x547D;&#x4EE4;&#x884C;&#x8F93;&#x5165;npm run server &#x7136;&#x540E;&#x518D;&#x6D4F;&#x89C8;&#x5668;&#x6253;&#x5F00;localhost:8888,&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;index.html &#x9875;&#x9762;&#xFF0C;&#x540C;&#x65F6;&#x4FEE;&#x6539;&#x5165;&#x53E3;&#x7684; js&#x4EE3;&#x7801;&#xFF0C;&#x4F1A;&#x5B9E;&#x65F6;&#x7684;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;&#x70ED;&#x66F4;&#x65B0;&#x3002;</p><p>3.&#x6A21;&#x5757;&#x5316;&#x6253;&#x5305;css&#xFF0C;&#x5E76;&#x4E14;&#x5355;&#x72EC;&#x8F93;&#x51FA;css&#x6587;&#x4EF6;<br>&#x5B89;&#x88C5;&#x5305;&#x4F9D;&#x8D56; style-loader css-loader extract-text-webpack-plugin@next</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install --save-dev style-loader css-loader extract-text-webpack-plugin@next" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs q"><code style="word-break:break-word;white-space:initial">cnpm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> style-loader css-loader extract-text-webpack-plugin@<span class="hljs-built_in">next</span></code></pre><p>&#x5728;src &#x65B0;&#x5EFA;index.css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
    background:red;
    color:white;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">background</span>:red;
    <span class="hljs-attribute">color</span>:white;
}</code></pre><p>&#x5E76;&#x4E14;&#x5728;extry.js&#x4E2D;&#x5F15;&#x5165;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import css form &apos;./index.css&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">import css <span class="hljs-selector-tag">form</span> <span class="hljs-string">&apos;./index.css&apos;</span></code></pre><p>webpck.config.js&#x4FEE;&#x6539;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path=require(&apos;path&apos;);
const webpackDevServer=require(&apos;webpack-dev-server&apos;);
const extractTextWebpackPlugin=require(&apos;extract-text-webpack-plugin&apos;);
module.exports={
    mode:&quot;development&quot;,
    entry:[
        path.join(__dirname,&apos;./src/entry.js&apos;),
        path.join(__dirname,&apos;./src/entry1.js&apos;),
    ],
    output:{
        path:path.join(__dirname,&apos;dist&apos;),
        filename:&apos;[name].js&apos;
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:extractTextWebpackPlugin.extract({
                    fallback:&quot;style-loader&quot;,
                    use: [&apos;css-loader&apos;,]
                })
            }
        ]
    },
    plugins:[
        new extractTextWebpackPlugin({
            filename:&apos;index.css&apos;
        })
    ],
    devServer:{
        contentBase:path.join(__dirname,&apos;dist&apos;),
        host:&apos;localhost&apos;,
        compress:true,
        port:8888
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> webpackDevServer=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-dev-server&apos;</span>);
<span class="hljs-keyword">const</span> extractTextWebpackPlugin=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>);
<span class="hljs-built_in">module</span>.exports={
    mode:<span class="hljs-string">&quot;development&quot;</span>,
    entry:[
        path.join(__dirname,<span class="hljs-string">&apos;./src/entry.js&apos;</span>),
        path.join(__dirname,<span class="hljs-string">&apos;./src/entry1.js&apos;</span>),
    ],
    output:{
        path:path.join(__dirname,<span class="hljs-string">&apos;dist&apos;</span>),
        filename:<span class="hljs-string">&apos;[name].js&apos;</span>
    },
    <span class="hljs-keyword">module</span>:{
        rules:[
            {
                test:<span class="hljs-regexp">/\.css$/</span>,
                use:extractTextWebpackPlugin.extract({
                    fallback:<span class="hljs-string">&quot;style-loader&quot;</span>,
                    use: [<span class="hljs-string">&apos;css-loader&apos;</span>,]
                })
            }
        ]
    },
    plugins:[
        <span class="hljs-keyword">new</span> extractTextWebpackPlugin({
            filename:<span class="hljs-string">&apos;index.css&apos;</span>
        })
    ],
    devServer:{
        contentBase:path.join(__dirname,<span class="hljs-string">&apos;dist&apos;</span>),
        host:<span class="hljs-string">&apos;localhost&apos;</span>,
        compress:<span class="hljs-literal">true</span>,
        port:<span class="hljs-number">8888</span>
    }
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfalg?w=646&amp;h=668" src="https://static.alili.tech/img/bVbfalg?w=646&amp;h=668" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x5220;&#x9664;main.js&#xFF0C;&#x547D;&#x4EE4;&#x884C;&#x8FD0;&#x884C; npm run build,&#x5B8C;&#x6210;&#x6253;&#x5305;<br>&#x5728;dist&#x76EE;&#x5F55;&#x4F1A;&#x591A;&#x4E00;&#x4E2A;index.css&#x6587;&#x4EF6;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack4 化繁为简（一）

## 原文链接
[https://segmentfault.com/a/1190000015968706](https://segmentfault.com/a/1190000015968706)

