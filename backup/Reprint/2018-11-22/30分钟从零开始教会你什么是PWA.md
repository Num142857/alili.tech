---
title: '30分钟从零开始教会你什么是PWA' 
date: 2018-11-22 2:30:10
hidden: true
slug: mkkye92qi6
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbd3uj?w=1850&amp;h=1042" src="https://static.alili.tech/img/bVbd3uj?w=1850&amp;h=1042" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x524D;&#x7F6E;&#x77E5;&#x8BC6;&#x50A8;&#x5907;</h2><p>PWA ( Progressive Web Apps )&#x662F;&#x7F51;&#x7EDC;&#x4E0A;&#x8C08;&#x8BBA;&#x6700;&#x591A;&#x7684;&#x6280;&#x672F;&#x53D8;&#x9769;&#x4E4B;&#x4E00;&#xFF0C;&#x5728;IT&#x754C;&#x4ECE;&#x4E1A;&#x8005;&#x4E2D;&#x83B7;&#x5F97;&#x4E86;&#x524D;&#x6240;&#x672A;&#x6709;&#x7684;&#x52BF;&#x5934;&#x3002;&#x5982;&#x679C;&#x4F60;&#x662F;&#x4E3A;web&#x6784;&#x5EFA;&#x7684;&#xFF0C;&#x6211;&#x76F8;&#x4FE1;PWA&#x662F;&#x6DFB;&#x52A0;&#x5230;&#x4F60;&#x7684;&#x5DE5;&#x4F5C;&#x8BCD;&#x6C47;&#x4E2D;&#x7684;&#x6700;&#x65B0;&#x201C;&#x6D41;&#x884C;&#x8BED;&#x201D;&#x3002;&#x8FD9;&#x5E76;&#x4E0D;&#x5947;&#x602A;&#xFF0C;&#x56E0;&#x4E3A;PWA&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#x5728;&#x624B;&#x673A;&#x4E0A;&#x5B89;&#x88C5;web&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684;&#x9065;&#x4E0D;&#x53EF;&#x53CA;&#x7684;&#x68A6;&#x60F3;&#x3002;</p><p>&#x5173;&#x4E8E;PWA&#x7684;&#x5EFA;&#x8BBE;&#x548C;&#x5B83;&#x7684;&#x4F18;&#x52BF;&#xFF0C;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x5F88;&#x591A;&#x7684;&#x7126;&#x70B9;&#x548C;&#x201C;&#x6781;&#x5BA2;&#x4E4B;&#x8C08;&#x201D;&#x3002;&#x5927;&#x591A;&#x6570;&#x4ECB;&#x7ECD;PWA&#x7684;&#x5C1D;&#x8BD5;&#xFF0C;&#x7279;&#x522B;&#x662F;&#x5BF9;&#x65B0;&#x624B;&#x6765;&#x8BF4;&#xFF0C;&#x4F3C;&#x4E4E;&#x90FD;&#x662F;&#x884C;&#x8BDD;&#xFF0C;&#x6216;&#x8005;&#x4EE3;&#x7801;&#x592A;&#x591A;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x4F7F;&#x4ED6;&#x4EEC;&#x4E0D;&#x6562;&#x8FC8;&#x51FA;&#x7B2C;&#x4E00;&#x6B65;&#x3002;&#x5728;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#xFF0C;&#x6211;&#x60F3;&#x8981;&#x4EE5;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x6848;&#x4F8B;&#x6765;&#x6559;&#x4F1A;&#x5404;&#x4F4D;&#x5982;&#x4F55;&#x8D77;&#x6B65;&#x3002;</p><p>&#x5173;&#x4E8E;PWA&#x7684;&#x6982;&#x5FF5;&#x4EE5;&#x53CA;&#x524D;&#x4E16;&#x4ECA;&#x751F;&#x6211;&#x8FD9;&#x8FB9;&#x4E0D;&#x4F1A;&#x8FC7;&#x591A;&#x8D58;&#x8FF0;&#xFF0C;&#x7F51;&#x7EDC;&#x4E0A;&#x6709;&#x5F88;&#x591A;&#x66F4;&#x52A0;&#x4E13;&#x4E1A;&#x7684;&#x6587;&#x7AE0;&#x4F9B;&#x4F60;&#x5B66;&#x4E60;&#xFF0C;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x53EA;&#x8D1F;&#x8D23;&#x6559;&#x4F1A;&#x4F60;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x5B83;&#x3002;</p><p>&#x6BD4;&#x8D77;&#x7528;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x6253;&#x6D88;&#x4F60;&#x7684;&#x6240;&#x6709;&#x5173;&#x4E8E;PWA&#x7684;&#x56F0;&#x60D1;&#x6765;&#x8BF4;&#x6211;&#x66F4;&#x5E0C;&#x671B;&#x4F60;&#x80FD;&#x7B80;&#x5355;&#x4E86;&#x89E3;&#x6982;&#x5FF5;&#x4E4B;&#x540E;&#x5C06;&#x6211;&#x7684;&#x6848;&#x4F8B;&#x6572;&#x6253;&#x4E00;&#x904D;&#x540E;&#x518D;&#x56DE;&#x8FC7;&#x5934;&#x53BB;&#x6DF1;&#x5165;&#x4E86;&#x89E3;PWA&#x3002;</p><p><a href="https://lavas.baidu.com/pwa/README" rel="nofollow noreferrer" target="_blank">&#x4EC0;&#x4E48;&#x662F;PWA</a><br><a href="https://huangxuan.me/2017/02/09/nextgen-web-pwa/" rel="nofollow noreferrer" target="_blank">&#x4E0B;&#x4E00;&#x4EE3; Web &#x5E94;&#x7528;&#x6A21;&#x578B; &#x2014;&#x2014; Progressive Web App</a><br><a href="https://developers.google.com/web/progressive-web-apps/" rel="nofollow noreferrer" target="_blank">PWA&#x5B98;&#x7F51;</a></p><h2 id="articleHeader1">&#x8D77;&#x6B65;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x9879;&#x76EE;

mkdir pwa-project
cd pwa-project
touch index.html
touch app.js
touch style.css" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x9879;&#x76EE;

mkdir pwa-project
<span class="hljs-built_in">cd</span> pwa-project
touch index.html
touch app.js
touch style.css</code></pre><p><strong>&#x76F8;&#x4FE1;&#x5404;&#x4F4D;&#x90FD;&#x662F;&#x4F7F;&#x7528;chrome&#x6700;&#x65B0;&#x7248;&#x7684;&#x9AD8;&#x7AEF;&#x6280;&#x672F;&#x4EBA;&#x624D;&#xFF0C;&#x8FD9;&#x91CC;&#x4E3A;&#x4E86;&#x7701;&#x7565;webpack&#x4E00;&#x4E9B;&#x7E41;&#x7410;&#x7684;&#x914D;&#x7F6E;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x7F16;&#x5199;es6&#x4EE3;&#x7801;&#x8FD0;&#x884C;&#x5728;chrome&#x5373;&#x53EF;</strong></p><h2 id="articleHeader2">&#x7F16;&#x5199;&#x4EE3;&#x7801;</h2><blockquote>&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x65B0;&#x95FB;&#x7AD9;&#x70B9;&#xFF0C;&#x9700;&#x8981;&#x5C55;&#x793A;&#x6807;&#x9898;&#xFF0C;&#x56FE;&#x7247;&#xFF0C;&#x6587;&#x7AE0;&#xFF0C;&#x5E76;&#x4E14;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x6765;&#x6E90;&#x5207;&#x6362;&#x5185;&#x5BB9;<br>&#x6839;&#x636E;&#x8FD9;&#x4E2A;&#x8981;&#x6C42;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7F16;&#x5199;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.html

&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;News&lt;/title&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;./style.css&quot;&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;
        &lt;h1&gt;News&lt;/h1&gt;
        &lt;select id=&quot;sourceSelector&quot;&gt;&lt;/select&gt;
    &lt;/header&gt;

    &lt;main&gt;&lt;/main&gt;

    &lt;script src=&quot;./app.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">// index.html

<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>News<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;./style.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>News<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;sourceSelector&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./app.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// style.css

html {
    line-height: 1.15;
    /* 1 */
    -webkit-text-size-adjust: 100%;
    /* 2 */
}

body {
    margin: 0;
}

h1 {
    font-size: 2em;
    margin: 0.67em 0;
}

a {
    background-color: transparent;
    text-decoration: none;
}

button,
select {
    text-transform: none;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">// <span class="hljs-selector-tag">style</span><span class="hljs-selector-class">.css</span>

<span class="hljs-selector-tag">html</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.15</span>;
    <span class="hljs-comment">/* 1 */</span>
    <span class="hljs-attribute">-webkit-text-size-adjust</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">h1</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0.67em</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">background-color</span>: transparent;
    <span class="hljs-attribute">text-decoration</span>: none;
}

<span class="hljs-selector-tag">button</span>,
<span class="hljs-selector-tag">select</span> {
    <span class="hljs-attribute">text-transform</span>: none;
}
</code></pre><p><strong>&#x8FD9;&#x91CC;&#x4E3A;&#x4E86;&#x6A21;&#x62DF;&#x771F;&#x5B9E;&#x7528;&#x6237;&#x6570;&#x636E;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x53BB;<a href="https://newsapi.org/" rel="nofollow noreferrer" target="_blank"><span style="font-weight:400">&#x1F447;</span>&#x8FD9;&#x91CC;</a>&#x7533;&#x8BF7;apikey&#x83B7;&#x53D6;&#x4E00;&#x4E9B;&#x771F;&#x5B9E;&#x6570;&#x636E;</strong><br>&#x5404;&#x4F4D;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;copy&#x4EE3;&#x7801;&#x6765;&#x5B66;&#x4E60;&#xFF0C;&#x4EE3;&#x7801;&#x903B;&#x8F91;&#x5F88;&#x7B80;&#x5355;&#x8FD9;&#x91CC;&#x4E0D;&#x505A;&#x8BB2;&#x89E3;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js

const apiKey = &apos;fa35a325ddfa4c4798102ebb76809bbb&apos;;
const main = document.querySelector(&apos;main&apos;);
const sourceSelector = document.querySelector(&apos;#sourceSelector&apos;);
const defaultSource = &apos;techcrunch&apos;

// &#x9875;&#x9762;&#x52A0;&#x8F7D;&#x540E;&#x6267;&#x884C;&#x903B;&#x8F91;
window.addEventListener(&apos;load&apos;, async e =&gt; {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener(&apos;change&apos;, e =&gt; {
        updateNews(e.target.value);
    });
    
    // &#x5224;&#x65AD;&#x6D4F;&#x89C8;&#x5668;&#x662F;&#x5426;&#x652F;&#x6301;serviceWorker
    if (&apos;serviceWorker&apos; in navigator) {
        try {
            // &#x5C1D;&#x8BD5;&#x6CE8;&#x518C;serviceWorker&#x5230;sw.js&#x6587;&#x4EF6;&#x4E2D;
            navigator.serviceWorker.register(&apos;sw.js&apos;);
            console.log(&apos;SW registered&apos;);
        } catch (error) {
            console.log(&apos;SW reg failed&apos;);
        }
    }
});

// &#x83B7;&#x53D6;&#x65B0;&#x95FB;&#x6765;&#x6E90;
async function updateSources() {
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
    const json = await res.json();

    sourceSelector.innerHTML = json.sources
        .map(src =&gt; `&lt;option value=&quot;${src.id}&quot;&gt;${src.name}&lt;/option&gt;`)
        .join(&apos;\n&apos;);
}

// &#x6839;&#x636E;&#x6765;&#x6E90;&#x83B7;&#x53D6;&#x65B0;&#x95FB;&#x6570;&#x636E;
async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&amp;apiKey=${apiKey}`);
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join(&apos;\n&apos;);
}

// &#x521B;&#x5EFA;&#x6587;&#x7AE0;
function createArticle(article) {
    return `
        &lt;div class=&quot;article&quot;&gt;
            &lt;a href=&quot;${article.url}&quot;&gt;
                &lt;h2&gt;${article.title}&lt;/h2&gt;
            &lt;/a&gt;
            &lt;img src=&quot;${article.urlToImage}&quot; /&gt;
            &lt;p&gt;${article.description}&lt;/p&gt;
        &lt;/div&gt;
    `;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// app.js</span>

<span class="hljs-keyword">const</span> apiKey = <span class="hljs-string">&apos;fa35a325ddfa4c4798102ebb76809bbb&apos;</span>;
<span class="hljs-keyword">const</span> main = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;main&apos;</span>);
<span class="hljs-keyword">const</span> sourceSelector = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#sourceSelector&apos;</span>);
<span class="hljs-keyword">const</span> defaultSource = <span class="hljs-string">&apos;techcrunch&apos;</span>

<span class="hljs-comment">// &#x9875;&#x9762;&#x52A0;&#x8F7D;&#x540E;&#x6267;&#x884C;&#x903B;&#x8F91;</span>
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&apos;load&apos;</span>, <span class="hljs-keyword">async</span> e =&gt; {
    updateNews();
    <span class="hljs-keyword">await</span> updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener(<span class="hljs-string">&apos;change&apos;</span>, e =&gt; {
        updateNews(e.target.value);
    });
    
    <span class="hljs-comment">// &#x5224;&#x65AD;&#x6D4F;&#x89C8;&#x5668;&#x662F;&#x5426;&#x652F;&#x6301;serviceWorker</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-string">&apos;serviceWorker&apos;</span> <span class="hljs-keyword">in</span> navigator) {
        <span class="hljs-keyword">try</span> {
            <span class="hljs-comment">// &#x5C1D;&#x8BD5;&#x6CE8;&#x518C;serviceWorker&#x5230;sw.js&#x6587;&#x4EF6;&#x4E2D;</span>
            navigator.serviceWorker.register(<span class="hljs-string">&apos;sw.js&apos;</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;SW registered&apos;</span>);
        } <span class="hljs-keyword">catch</span> (error) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;SW reg failed&apos;</span>);
        }
    }
});

<span class="hljs-comment">// &#x83B7;&#x53D6;&#x65B0;&#x95FB;&#x6765;&#x6E90;</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateSources</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">`https://newsapi.org/v2/sources?apiKey=<span class="hljs-subst">${apiKey}</span>`</span>);
    <span class="hljs-keyword">const</span> json = <span class="hljs-keyword">await</span> res.json();

    sourceSelector.innerHTML = json.sources
        .map(<span class="hljs-function"><span class="hljs-params">src</span> =&gt;</span> <span class="hljs-string">`&lt;option value=&quot;<span class="hljs-subst">${src.id}</span>&quot;&gt;<span class="hljs-subst">${src.name}</span>&lt;/option&gt;`</span>)
        .join(<span class="hljs-string">&apos;\n&apos;</span>);
}

<span class="hljs-comment">// &#x6839;&#x636E;&#x6765;&#x6E90;&#x83B7;&#x53D6;&#x65B0;&#x95FB;&#x6570;&#x636E;</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateNews</span>(<span class="hljs-params">source = defaultSource</span>) </span>{
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">`https://newsapi.org/v2/top-headlines?sources=<span class="hljs-subst">${source}</span>&amp;apiKey=<span class="hljs-subst">${apiKey}</span>`</span>);
    <span class="hljs-keyword">const</span> json = <span class="hljs-keyword">await</span> res.json();

    main.innerHTML = json.articles.map(createArticle).join(<span class="hljs-string">&apos;\n&apos;</span>);
}

<span class="hljs-comment">// &#x521B;&#x5EFA;&#x6587;&#x7AE0;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createArticle</span>(<span class="hljs-params">article</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">`
        &lt;div class=&quot;article&quot;&gt;
            &lt;a href=&quot;<span class="hljs-subst">${article.url}</span>&quot;&gt;
                &lt;h2&gt;<span class="hljs-subst">${article.title}</span>&lt;/h2&gt;
            &lt;/a&gt;
            &lt;img src=&quot;<span class="hljs-subst">${article.urlToImage}</span>&quot; /&gt;
            &lt;p&gt;<span class="hljs-subst">${article.description}</span>&lt;/p&gt;
        &lt;/div&gt;
    `</span>;
}</code></pre><h2 id="articleHeader3">&#x542F;&#x52A8;</h2><p>&#x73B0;&#x5728;&#x542F;&#x52A8;&#x6211;&#x4EEC;&#x7684;&#x9879;&#x76EE;<br>&#x6267;&#x884C;<code>npx http-server</code>&#x6253;&#x5F00;&#x6211;&#x4EEC;&#x7684;<code>localhost:8080</code>&#x7AEF;&#x53E3;(&#x7AEF;&#x53E3;&#x53F7;&#x6839;&#x636E;&#x5177;&#x4F53;&#x60C5;&#x51B5;&#x800C;&#x5B9A;)</p><p>&#x6211;&#x4EEC;&#x70B9;&#x5F00;&#x63A7;&#x5236;&#x53F0;&#x770B;&#x770B;&#x662F;&#x4E0D;&#x662F;&#x62A5;&#x9519;&#x4E86;&#xFF1F;</p><p><span class="img-wrap"><img data-src="/img/bVbd3AK?w=633&amp;h=33" src="https://static.alili.tech/img/bVbd3AK?w=633&amp;h=33" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x5728;&#x70B9;&#x5F00;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x627E;&#x4E0D;&#x5230;sw.js&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x6839;&#x672C;&#x6CA1;&#x6709;&#x561B;&#xFF01;&#x1F602;</p><p><span class="img-wrap"><img data-src="/img/bVbd3Be?w=769&amp;h=346" src="https://static.alili.tech/img/bVbd3Be?w=769&amp;h=346" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x65E2;&#x7136;&#x6CA1;&#x6709;&#x90A3;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x4E2A;&#x4E0D;&#x5C31;&#x597D;&#x4E86;-_-!!</p><h2 id="articleHeader4">&#x7F16;&#x5199;sw.js</h2><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x5199;&#xFF0C;&#x76F4;&#x63A5;&#x521B;&#x5EFA;sw.js&#x6587;&#x4EF6;&#x5230;&#x9879;&#x76EE;&#x4E2D;&#x5C31;&#x4E0D;&#x4F1A;&#x62A5;&#x9519;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x4EC0;&#x4E48;&#x90FD;&#x6CA1;&#x5199;&#x5C31;&#x610F;&#x5473;&#x7740;&#x4F60;&#x4EC0;&#x4E48;&#x90FD;&#x6CA1;&#x6709;&#x505A;&#x3002;<br>&#x90A3;&#x6211;&#x4EEC;&#x5230;&#x5E95;&#x53EF;&#x4EE5;&#x7528;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x505A;&#x4EC0;&#x4E48;&#x4E8B;&#x5462;&#xFF1F;</p><h3 id="articleHeader5">&#x7F13;&#x5B58;&#x6211;&#x4EEC;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x6587;&#x4EF6;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// sw.js

const staticAssets = [
    &apos;./&apos;,
    &apos;./style.css&apos;,
    &apos;./app.js&apos;
];

// sw.js&#x9996;&#x6B21;&#x88AB;&#x6CE8;&#x518C;&#x65F6;&#x5019;&#x89E6;&#x53D1;
self.addEventListener(&apos;install&apos;, async event =&gt; {
    const cache = await caches.open(&apos;news-static&apos;);
    cache.addAll(staticAssets);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// sw.js</span>

<span class="hljs-keyword">const</span> staticAssets = [
    <span class="hljs-string">&apos;./&apos;</span>,
    <span class="hljs-string">&apos;./style.css&apos;</span>,
    <span class="hljs-string">&apos;./app.js&apos;</span>
];

<span class="hljs-comment">// sw.js&#x9996;&#x6B21;&#x88AB;&#x6CE8;&#x518C;&#x65F6;&#x5019;&#x89E6;&#x53D1;</span>
self.addEventListener(<span class="hljs-string">&apos;install&apos;</span>, <span class="hljs-keyword">async</span> event =&gt; {
    <span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">await</span> caches.open(<span class="hljs-string">&apos;news-static&apos;</span>);
    cache.addAll(staticAssets);
})</code></pre><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x518D;&#x6B21;&#x5237;&#x65B0;&#x9875;&#x9762;&#xFF08;&#x8BB0;&#x5F97;&#x6E05;&#x7406;&#x7F13;&#x5B58;&#x54C8;&#xFF09;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x90FD;&#x88AB;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#x4E86;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbd4S6?w=881&amp;h=461" src="https://static.alili.tech/img/bVbd4S6?w=881&amp;h=461" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4EC0;&#x4E48;&#xFF1F;&#x6CA1;&#x6709;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#xFF1F;<br>&#x90A3;&#x4F60;&#x80AF;&#x5B9A;&#x662F;&#x6CA1;&#x6709;&#x544A;&#x8BC9;&#x6D4F;&#x89C8;&#x5668;&#x5237;&#x65B0;&#x65F6;&#x5019;&#x8981;&#x66F4;&#x65B0;&#x4F60;&#x7684;<code>sw.js</code>&#x6587;&#x4EF6;&#x3002;&#x53EF;&#x4EE5;&#x52FE;&#x9009;&#x8FD9;&#x91CC;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x6B21;&#x5237;&#x65B0;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbd3ES?w=776&amp;h=352" src="https://static.alili.tech/img/bVbd3ES?w=776&amp;h=352" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4F46;&#x662F;&#x7F13;&#x5B58;&#x662F;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x662F;&#x4E0D;&#x62FF;&#x6765;&#x7528;&#x90A3;&#x4E5F;&#x6CA1;&#x5565;&#x5375;&#x7528;&#x3002;<br>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8981;&#x62E6;&#x622A;&#x8BF7;&#x6C42;&#x5E76;&#x544A;&#x8BC9;&#x6D4F;&#x89C8;&#x5668;&#x6211;&#x4EEC;&#x8981;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B;&#x7F13;&#x5B58;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// sw.js (&#x6DFB;&#x52A0;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;)

// sw&#x76D1;&#x542C;&#x5230;fetch&#x4E8B;&#x4EF6;&#x65F6;&#x5019;&#x89E6;&#x53D1;
self.addEventListener(&apos;fetch&apos;, event =&gt; {
    const req = event.request;

    event.respondWith(cacheFirst(req));
});

// &#x4F7F;&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x7F13;&#x5B58;
async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// sw.js (&#x6DFB;&#x52A0;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;)</span>

<span class="hljs-comment">// sw&#x76D1;&#x542C;&#x5230;fetch&#x4E8B;&#x4EF6;&#x65F6;&#x5019;&#x89E6;&#x53D1;</span>
self.addEventListener(<span class="hljs-string">&apos;fetch&apos;</span>, event =&gt; {
    <span class="hljs-keyword">const</span> req = event.request;

    event.respondWith(cacheFirst(req));
});

<span class="hljs-comment">// &#x4F7F;&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x7F13;&#x5B58;</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cacheFirst</span>(<span class="hljs-params">req</span>) </span>{
    <span class="hljs-keyword">const</span> cachedResponse = <span class="hljs-keyword">await</span> caches.match(req);
    <span class="hljs-keyword">return</span> cachedResponse || fetch(req);
}</code></pre><p>&#x7F16;&#x5199;&#x5B8C;&#x8FD9;&#x4E9B;&#x4E4B;&#x540E;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5148;&#x52FE;&#x9009;<code>offline</code>&#x6309;&#x94AE;&#xFF0C;&#x4E4B;&#x540E;&#x5237;&#x65B0;&#x9875;&#x9762;&#xFF0C;&#x53D1;&#x73B0;&#x6211;&#x4EEC;&#x7684;&#x7AD9;&#x70B9;&#x4F9D;&#x7136;&#x6709;&#x6570;&#x636E;&#x3002;</p><p>&#x6211;&#x4EEC;&#x70B9;&#x5F00;<code>network</code>&#x770B;&#x770B;&#x8BF7;&#x6C42;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbd3Iy?w=780&amp;h=533" src="https://static.alili.tech/img/bVbd3Iy?w=780&amp;h=533" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x6211;&#x4EEC;&#x62E6;&#x622A;&#x4E86;http&#x8BF7;&#x6C42;&#x5E76;&#x4E14;&#x5C06;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x7F13;&#x5B58;&#x6570;&#x636E;&#x8FD4;&#x56DE;&#x56DE;&#x53BB;&#x4E86;&#xFF01;</p><p>&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x795E;&#x5947;&#x1F60A;!</p><p>&#x5230;&#x8FD9;&#x4E00;&#x6B65;&#xFF0C;&#x76F8;&#x4FE1;&#x4F60;&#x5DF2;&#x7ECF;&#x89C1;&#x8BC6;&#x5230;&#x4E86;PWA&#x7684;&#x4E00;&#x4E9B;&#x80FD;&#x529B;&#x4E86;&#x3002;</p><h3 id="articleHeader6">&#x6B63;&#x786E;&#x4F7F;&#x7528;&#x7F13;&#x5B58;</h3><p>&#x5728;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x5176;&#x5B9E;&#x662F;&#x6709;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x79BB;&#x7EBF;&#x72B6;&#x6001;&#x4E0B;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x662F;ok&#x7684;&#xFF0C;&#x53EF;&#x662F;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5904;&#x4E8E;&#x8054;&#x7F51;&#x72B6;&#x6001;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x8FD4;&#x56DE;&#x7F13;&#x5B58;&#x5417;&#xFF1F;&#x5F53;&#x7136;&#x4E0D;&#x9700;&#x8981;&#xFF0C;&#x4E0D;&#x4EC5;&#x4E0D;&#x9700;&#x8981;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x5E94;&#x8BE5;&#x7528;&#x670D;&#x52A1;&#x5668;&#x7684;&#x6700;&#x65B0;&#x6570;&#x636E;&#x66F4;&#x65B0;&#x6211;&#x4EEC;&#x7684;&#x7F13;&#x5B58;&#x3002;</p><p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8981;&#x6839;&#x636E;&#x7F51;&#x7EDC;&#x4F18;&#x5148;&#x7684;&#x539F;&#x5219;&#x4FEE;&#x6539;&#x4E0B;sw&#x903B;&#x8F91;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="self.addEventListener(&apos;fetch&apos;, event =&gt; {
    const req = event.request;
    const url = new URL(req.url);
    
    // &#x5F53;&#x672C;&#x5730;&#x5F00;&#x53D1;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x914D;&#x7F6E;
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req));
    } else if ((req.url.indexOf(&apos;http&apos;) !== -1)) {
        // chrome&#x7684;https&#x534F;&#x8BAE;&#x9650;&#x5236;&#xFF0C;&#x63A5;&#x53E3;&#x5FC5;&#x987B;&#x6EE1;&#x8DB3;https
        event.respondWith(networkFirst(req));
    }
});

// &#x7F13;&#x5B58;&#x4F18;&#x5148;
async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

// &#x7F51;&#x7EDC;&#x4F18;&#x5148;
async function networkFirst(req) {
    // &#x5C06;&#x8BF7;&#x6C42;&#x5230;&#x7684;&#x6570;&#x636E;&#x7F13;&#x5B58;&#x5728;id&#x4E3A;news-dynamic&#x4E2D;
    const cache = await caches.open(&apos;news-dynamic&apos;);

    try {
        const res = await fetch(req); // &#x83B7;&#x53D6;&#x6570;&#x636E;
        cache.put(req, res.clone()); // &#x66F4;&#x65B0;&#x7F13;&#x5B58;
        return res;
    } catch (error) {
        return await cache.match(req); // &#x62A5;&#x9519;&#x5219;&#x4F7F;&#x7528;&#x7F13;&#x5B58;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">self.addEventListener(<span class="hljs-string">&apos;fetch&apos;</span>, event =&gt; {
    <span class="hljs-keyword">const</span> req = event.request;
    <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> URL(req.url);
    
    <span class="hljs-comment">// &#x5F53;&#x672C;&#x5730;&#x5F00;&#x53D1;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x914D;&#x7F6E;</span>
    <span class="hljs-keyword">if</span> (url.origin === location.origin) {
        event.respondWith(cacheFirst(req));
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ((req.url.indexOf(<span class="hljs-string">&apos;http&apos;</span>) !== <span class="hljs-number">-1</span>)) {
        <span class="hljs-comment">// chrome&#x7684;https&#x534F;&#x8BAE;&#x9650;&#x5236;&#xFF0C;&#x63A5;&#x53E3;&#x5FC5;&#x987B;&#x6EE1;&#x8DB3;https</span>
        event.respondWith(networkFirst(req));
    }
});

<span class="hljs-comment">// &#x7F13;&#x5B58;&#x4F18;&#x5148;</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cacheFirst</span>(<span class="hljs-params">req</span>) </span>{
    <span class="hljs-keyword">const</span> cachedResponse = <span class="hljs-keyword">await</span> caches.match(req);
    <span class="hljs-keyword">return</span> cachedResponse || fetch(req);
}

<span class="hljs-comment">// &#x7F51;&#x7EDC;&#x4F18;&#x5148;</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">networkFirst</span>(<span class="hljs-params">req</span>) </span>{
    <span class="hljs-comment">// &#x5C06;&#x8BF7;&#x6C42;&#x5230;&#x7684;&#x6570;&#x636E;&#x7F13;&#x5B58;&#x5728;id&#x4E3A;news-dynamic&#x4E2D;</span>
    <span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">await</span> caches.open(<span class="hljs-string">&apos;news-dynamic&apos;</span>);

    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(req); <span class="hljs-comment">// &#x83B7;&#x53D6;&#x6570;&#x636E;</span>
        cache.put(req, res.clone()); <span class="hljs-comment">// &#x66F4;&#x65B0;&#x7F13;&#x5B58;</span>
        <span class="hljs-keyword">return</span> res;
    } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> cache.match(req); <span class="hljs-comment">// &#x62A5;&#x9519;&#x5219;&#x4F7F;&#x7528;&#x7F13;&#x5B58;</span>
    }
}</code></pre><p>&#x81F3;&#x6B64;&#x6211;&#x4EEC;&#x7684;&#x6848;&#x4F8B;&#x57FA;&#x672C;&#x4E0A;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x662F;&#x53EF;&#x4EE5;&#x518D;&#x6B21;&#x4F18;&#x5316;&#x4E00;&#x4E0B;&#x3002;</p><p>&#x5047;&#x8BBE;&#x7528;&#x6237;&#x8FD8;&#x6CA1;&#x6709;&#x67E5;&#x770B;&#x8FC7;&#x6211;&#x4EEC;&#x7684;&#x7AD9;&#x70B9;&#x9875;&#x9762;&#x5176;&#x4ED6;&#x5185;&#x5BB9;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x6211;&#x4EEC;&#x7684;&#x7F13;&#x5B58;&#x4E0D;&#x5B8C;&#x6574;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;mock&#x6570;&#x636E;&#x63D0;&#x793A;&#x7528;&#x6237;&#x7B49;&#x5F85;&#x53EF;&#x4EE5;&#x8054;&#x7F51;&#x7684;&#x65F6;&#x5019;&#x518D;&#x6765;&#x67E5;&#x770B;&#x5F53;&#x524D;&#x9875;&#x9762;&#x3002;(&#x5177;&#x4F53;&#x6587;&#x4EF6;&#x53EF;&#x4EE5;&#x4ECE;<a href="https://github.com/HQ-Lin/simple-pwa-project" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7684;github&#x4ED3;&#x5E93;</a>&#x4E2D;&#x83B7;&#x53D6;)</p><h2 id="articleHeader7">PWA&#x5C31;&#x8FD9;&#x4E48;&#x70B9;&#x80FD;&#x529B;&#x5417;&#xFF1F;</h2><p>&#x5176;&#x5B9E;PWA&#x8FD8;&#x63D0;&#x4F9B;&#x7ED9;&#x6211;&#x4EEC;&#x5C06;web&#x7AD9;&#x70B9;&#x4EE5;app&#x56FE;&#x6807;&#x5F62;&#x5F0F;&#x653E;&#x7F6E;&#x5728;&#x684C;&#x9762;&#x4EE5;&#x53CA;&#x79FB;&#x52A8;&#x624B;&#x673A;&#x4E2D;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x4E0E;&#x7F16;&#x5199;&#x6D4F;&#x89C8;&#x5668;&#x63D2;&#x4EF6;&#x8FC7;&#x7A0B;&#x6709;&#x70B9;&#x7C7B;&#x4F3C;&#x3002;</p><p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E2A;<code>manifest.json</code>&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x5728;<code>index.html</code>&#x4E2D;&#x5F15;&#x5165;&#x3002;</p><p><code>manifest.json</code>&#x53EF;&#x4EE5;&#x5728;<a href="https://app-manifest.firebaseapp.com/" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x4E2A;&#x7AD9;&#x70B9;</a>&#x4E2D;&#x751F;&#x6210;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// html&#x6587;&#x4EF6;&#x9700;&#x8981;&#x5F15;&#x5165;&#x4E00;&#x884C;&#x4EE3;&#x7801;

&lt;link rel=&quot;manifest&quot; href=&quot;manifest.json&quot;&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">// html&#x6587;&#x4EF6;&#x9700;&#x8981;&#x5F15;&#x5165;&#x4E00;&#x884C;&#x4EE3;&#x7801;

<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;manifest&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;manifest.json&quot;</span>&gt;</span></code></pre><p>&#x914D;&#x7F6E;&#x6210;&#x529F;&#x540E;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x4E2D;&#x67E5;&#x770B;</p><p><span class="img-wrap"><img data-src="/img/bVbd3NU?w=775&amp;h=647" src="https://static.alili.tech/img/bVbd3NU?w=775&amp;h=647" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6709;&#x4E86;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x548C;&#x76F8;&#x5E94;&#x56FE;&#x6807;&#x540E;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x81F3;&#x684C;&#x9762;&#x7AEF;&#x4E86;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x9177;&#x70AB;&#xFF5E;</p><h2 id="articleHeader8">&#x672A;&#x5B8C;&#x5F85;&#x7EED;</h2><p>&#x622A;&#x6B62;&#x9879;&#x76EE;&#x4EE3;&#x7801;&#x53EF;&#x5728;<a href="https://github.com/HQ-Lin/simple-pwa-project" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7684;&#x4ED3;&#x5E93;</a>&#x4E2D;&#x83B7;&#x53D6;&#x3002;(&#x80FD;&#x5426;&#x7ED9;&#x4E2A;&#x5C0F;&#x661F;&#x661F;&#x9F13;&#x52B1;&#x4E0B;&#x5462;&#x1F602;)</p><p>&#x540E;&#x7EED;&#x4F1A;&#x8865;&#x5145;&#x5728;&#x5177;&#x4F53;&#x9879;&#x76EE;&#x4E2D;&#x5E94;&#x8BE5;&#x600E;&#x4E48;&#x96C6;&#x6210;pwa&#xFF0C;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x53EA;&#x5206;&#x6790;&#x4E86;pwa&#x7684;&#x6838;&#x5FC3;&#x4EE3;&#x7801;&#xFF5E;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
30分钟从零开始教会你什么是PWA

## 原文链接
[https://segmentfault.com/a/1190000015705532](https://segmentfault.com/a/1190000015705532)

