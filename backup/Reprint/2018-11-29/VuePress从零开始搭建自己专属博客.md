---
title: 'VuePress从零开始搭建自己专属博客' 
date: 2018-11-29 2:30:09
hidden: true
slug: 2x8vyem6z09
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">VuePress&#x4ECE;&#x96F6;&#x5F00;&#x59CB;&#x642D;&#x5EFA;&#x81EA;&#x5DF1;&#x7684;&#x535A;&#x5BA2;</h1><p>&#x6700;&#x8FD1;&#x5C06;&#x81EA;&#x5DF1;&#x7684;&#x535A;&#x5BA2;&#x4ECE;Hexo&#x8F6C;&#x79FB;&#x5230;VuePress&#x4E2D;&#x6765;&#xFF0C;&#x4F7F;&#x7528;VuePress&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x4E5F;&#x9047;&#x5230;&#x4E86;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x5199;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x6765;&#x8BB0;&#x5F55;&#x4E00;&#x4E0B;&#x642D;&#x5EFA;&#x8FC7;&#x7A0B;&#x548C;&#x8E29;&#x8FC7;&#x7684;&#x5751;&#x3002;</p><h2 id="articleHeader1">VuePress&#x662F;&#x4EC0;&#x4E48;&#xFF1F;</h2><p>VuePress&#x662F;&#x4EE5;Vue&#x9A71;&#x52A8;&#x7684;&#x9759;&#x6001;&#x7F51;&#x7AD9;&#x751F;&#x6210;&#x5668;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x7531;Vue&#x3001;Vue Router&#x548C;webpack&#x9A71;&#x52A8;&#x7684;&#x5355;&#x9875;&#x5E94;&#x7528;&#x3002;&#x5728;VuePress&#x4E2D;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;Markdown&#x7F16;&#x5199;&#x6587;&#x6863;&#xFF0C;&#x7136;&#x540E;&#x751F;&#x6210;&#x7F51;&#x9875;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x7531;VuePress&#x751F;&#x6210;&#x7684;&#x9875;&#x9762;&#x90FD;&#x5E26;&#x6709;&#x9884;&#x6E32;&#x67D3;&#x597D;&#x7684;HTML&#xFF0C;&#x4E5F;&#x56E0;&#x6B64;&#x5177;&#x6709;&#x975E;&#x5E38;&#x597D;&#x7684;&#x52A0;&#x8F7D;&#x6027;&#x80FD;&#x548C;&#x641C;&#x7D22;&#x5F15;&#x64CE;&#x4F18;&#x5316;&#x3002;&#x540C;&#x65F6;&#xFF0C;&#x4E00;&#x65E6;&#x9875;&#x9762;&#x88AB;&#x52A0;&#x8F7D;&#xFF0C;Vue&#x5C06;&#x63A5;&#x7BA1;&#x8FD9;&#x4E9B;&#x9759;&#x6001;&#x5185;&#x5BB9;&#xFF0C;&#x5E76;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x6210;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x5355;&#x9875;&#x5E94;&#x7528;&#xFF0C;&#x5176;&#x4ED6;&#x7684;&#x9875;&#x9762;&#x5219;&#x4F1A;&#x53EA;&#x5728;&#x7528;&#x6237;&#x6D4F;&#x89C8;&#x5230;&#x7684;&#x65F6;&#x5019;&#x624D;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x3002;</p><p>&#x8BE6;&#x60C5;&#x8BF7;&#x770B;<a href="https://vuepress.vuejs.org/zh/" rel="nofollow noreferrer" target="_blank">VuePress&#x5B98;&#x65B9;&#x6587;&#x6863;</a></p><h2 id="articleHeader2">VuePress&#x7279;&#x6027;</h2><ul><li>&#x4E3A;&#x6280;&#x672F;&#x6587;&#x6863;&#x800C;&#x4F18;&#x5316;&#x7684;&#x5185;&#x7F6E;Markdown&#x62D3;&#x5C55;</li><li>&#x5728;Markdown&#x6587;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;Vue&#x7EC4;&#x4EF6;&#x7684;&#x80FD;&#x529B;</li><li>Vue&#x9A71;&#x52A8;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x4E3B;&#x9898;&#x7CFB;&#x7EDF;</li><li>&#x81EA;&#x52A8;&#x751F;&#x6210;Service Worker(&#x652F;&#x6301;PWA)</li><li>Google Analytics&#x96C6;&#x6210;</li><li>&#x57FA;&#x4E8E;Git&#x7684;&quot;&#x6700;&#x540E;&#x66F4;&#x65B0;&#x65F6;&#x95F4;&quot;</li><li>&#x591A;&#x8BED;&#x8A00;&#x652F;&#x6301;</li><li>&#x54CD;&#x5E94;&#x5F0F;&#x5E03;&#x5C40;</li></ul><h2 id="articleHeader3">&#x73AF;&#x5883;&#x642D;&#x5EFA;</h2><h3 id="articleHeader4">&#x5B89;&#x88C5;</h3><p>VuePress&#x652F;&#x6301;&#x4F7F;&#x7528;Yarn&#x548C;npm&#x6765;&#x5B89;&#x88C5;&#xFF0C;Node.js&#x7248;&#x672C;&#x9700;&#x8981;&gt;=8&#x624D;&#x53EF;&#x4EE5;&#x3002;</p><h4>&#x5168;&#x5C40;&#x5B89;&#x88C5;VuePress</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn global add vuepress # &#x6216;&#x8005;&#xFF1A;npm install -g vuepress" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml" style="word-break:break-word;white-space:initial">yarn global add vuepress # &#x6216;&#x8005;&#xFF1A;npm install -g vuepress</code></pre><h4>&#x521B;&#x5EFA;&#x9879;&#x76EE;&#x76EE;&#x5F55;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir project
cd project" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml">mkdir project
cd project</code></pre><h4>&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn init -y # &#x6216;&#x8005; npm init -y" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml" style="word-break:break-word;white-space:initial">yarn init -y # &#x6216;&#x8005; npm init -y</code></pre><h4>&#x65B0;&#x5EFA;docs&#x6587;&#x4EF6;&#x5939;</h4><p>docs&#x6587;&#x4EF6;&#x5939;&#x4F5C;&#x4E3A;&#x9879;&#x76EE;&#x6587;&#x6863;&#x6839;&#x76EE;&#x5F55;&#xFF0C;&#x4E3B;&#x8981;&#x653E;&#x7F6E;Markdown&#x7C7B;&#x578B;&#x7684;&#x6587;&#x7AE0;&#x548C;.vuepress&#x6587;&#x4EF6;&#x5939;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir docs" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml" style="word-break:break-word;white-space:initial">mkdir docs</code></pre><h4>&#x8BBE;&#x7F6E;package.json</h4><p>VuePress&#x4E2D;&#x6709;&#x4E24;&#x4E2A;&#x547D;&#x4EE4;&#xFF0C;vuepress dev docs&#x547D;&#x4EE4;&#x8FD0;&#x884C;&#x672C;&#x5730;&#x670D;&#x52A1;&#xFF0C;&#x901A;&#x8FC7;&#x8BBF;&#x95EE;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080&#x5373;&#x53EF;&#x9884;&#x89C8;&#x7F51;&#x7AD9;&#xFF0C;vuepress build docs&#x547D;&#x4EE4;&#x7528;&#x6765;&#x751F;&#x6210;&#x9759;&#x6001;&#x6587;&#x4EF6;&#xFF0C;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x653E;&#x7F6E;&#x5728;docs/.vuepress/dist&#x76EE;&#x5F55;&#x4E2D;&#xFF0C;&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;docs/.vuepress/config.js&#x4E2D;&#x7684;dest&#x5B57;&#x6BB5;&#x6765;&#x4FEE;&#x6539;&#x9ED8;&#x8BA4;&#x5B58;&#x653E;&#x76EE;&#x5F55;&#x3002;&#x5728;&#x8FD9;&#x91CC;&#x5C06;&#x4E24;&#x4E2A;&#x547D;&#x4EE4;&#x5C01;&#x88C5;&#x6210;&#x811A;&#x672C;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x76F4;&#x63A5;&#x4F7F;&#x7528;npm run docs:dev&#x548C;npm run docs:build&#x5373;&#x53EF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;docs:dev&quot;: &quot;vuepress dev docs&quot;,
    &quot;docs:build&quot;: &quot;vuepress build docs&quot;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml">{
  &quot;scripts&quot;: {
    &quot;docs:dev&quot;: &quot;vuepress dev docs&quot;,
    &quot;docs:build&quot;: &quot;vuepress build docs&quot;
  }
}</code></pre><h4>&#x521B;&#x5EFA;.vuepress&#x76EE;&#x5F55;</h4><p>&#x5728;docs&#x76EE;&#x5F55;&#x4E2D;&#xFF0C;&#x521B;&#x5EFA;.vuepress&#x76EE;&#x5F55;&#xFF0C;.vuepress&#x76EE;&#x5F55;&#x4E3B;&#x8981;&#x7528;&#x4E8E;&#x5B58;&#x653E;VuePress&#x76F8;&#x5173;&#x7684;&#x6587;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir .vuepress" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml" style="word-break:break-word;white-space:initial">mkdir .vuepress</code></pre><h4>&#x521B;&#x5EFA;config.js</h4><p>&#x8FDB;&#x5165;&#x5230;.vuepress&#x76EE;&#x5F55;&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x521B;&#x5EFA;config.js&#xFF0C;config.js&#x662F;VuePress&#x5FC5;&#x8981;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x5B83;&#x5BFC;&#x51FA;y&#x4E00;&#x4E2A;javascript&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch config.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml" style="word-break:break-word;white-space:initial">touch config.js</code></pre><h4>&#x521B;&#x5EFA;public&#x6587;&#x4EF6;&#x5939;</h4><p>&#x8FDB;&#x5165;&#x5230;.vuepress&#x76EE;&#x5F55;&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x521B;&#x5EFA;public&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x6B64;&#x6587;&#x4EF6;&#x5939;&#x4E3B;&#x8981;&#x653E;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x6587;&#x4EF6;&#xFF0C;&#x4F8B;&#x5982;favicons&#x548C; PWA&#x7684;&#x56FE;&#x6807;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir public" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml" style="word-break:break-word;white-space:initial">mkdir public</code></pre><p>&#x6B64;&#x65F6;&#xFF0C;&#x9879;&#x76EE;&#x7684;&#x7ED3;&#x6784;&#x5DEE;&#x4E0D;&#x591A;&#x5C31;&#x51FA;&#x6765;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="project
&#x251C;&#x2500;&#x2500;&#x2500; docs
&#x2502;   &#x251C;&#x2500;&#x2500; README.md
&#x2502;   &#x2514;&#x2500;&#x2500; .vuepress
&#x2502;       &#x251C;&#x2500;&#x2500; public
&#x2502;       &#x2514;&#x2500;&#x2500; config.js
&#x2514;&#x2500;&#x2500; package.json
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml">project
&#x251C;&#x2500;&#x2500;&#x2500; docs
&#x2502;   &#x251C;&#x2500;&#x2500; README.md
&#x2502;   &#x2514;&#x2500;&#x2500; .vuepress
&#x2502;       &#x251C;&#x2500;&#x2500; public
&#x2502;       &#x2514;&#x2500;&#x2500; config.js
&#x2514;&#x2500;&#x2500; package.json
</code></pre><p>&#x4EE5;&#x4E0A;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x4E86;&#x642D;&#x5EFA;&#x4E86;&#x4E00;&#x4E0B;&#x535A;&#x5BA2;&#x7684;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x662F;&#x535A;&#x5BA2;&#x4E3B;&#x8981;&#x7684;&#x57FA;&#x672C;&#x914D;&#x7F6E;config.js&#xFF0C;&#x4E5F;&#x662F;&#x5FC5;&#x987B;&#x8981;&#x505A;&#x7684;&#x3002;</p><h2 id="articleHeader5">&#x57FA;&#x672C;&#x914D;&#x7F6E;</h2><p>&#x4E00;&#x4E2A;config.js&#x7684;&#x4E3B;&#x8981;&#x914D;&#x7F6E;&#x5305;&#x62EC;&#x7F51;&#x7AD9;&#x7684;&#x6807;&#x9898;&#x3001;&#x63CF;&#x8FF0;&#x7B49;&#x57FA;&#x672C;&#x4FE1;&#x606F;&#xFF0C;&#x4EE5;&#x53CA;&#x4E3B;&#x9898;&#x7684;&#x914D;&#x7F6E;&#x3002;&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x7684;&#x5217;&#x4E3E;&#x4E00;&#x4E0B;&#x5E38;&#x7528;&#x914D;&#x7F6E;&#x3002;</p><h3 id="articleHeader6">&#x7F51;&#x7AD9;&#x4FE1;&#x606F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    title: &apos;&#x4E2A;&#x4EBA;&#x4E3B;&#x9875;&apos;, 
    description: &apos;&#x59DC;&#x5E05;&#x6770;&#x7684;&#x535A;&#x5BA2;&apos;,
    head: [
        [&apos;link&apos;, { rel: &apos;icon&apos;, href: &apos;/img/logo.ico&apos; }],
        [&apos;link&apos;, { rel: &apos;manifest&apos;, href: &apos;/manifest.json&apos; }],
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x4E2A;&#x4EBA;&#x4E3B;&#x9875;&apos;</span>, 
    <span class="hljs-attr">description</span>: <span class="hljs-string">&apos;&#x59DC;&#x5E05;&#x6770;&#x7684;&#x535A;&#x5BA2;&apos;</span>,
    <span class="hljs-attr">head</span>: [
        [<span class="hljs-string">&apos;link&apos;</span>, { <span class="hljs-attr">rel</span>: <span class="hljs-string">&apos;icon&apos;</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">&apos;/img/logo.ico&apos;</span> }],
        [<span class="hljs-string">&apos;link&apos;</span>, { <span class="hljs-attr">rel</span>: <span class="hljs-string">&apos;manifest&apos;</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">&apos;/manifest.json&apos;</span> }],
    ]
}</code></pre><ul><li>title&#xFF1A;&#x7F51;&#x7AD9;&#x6807;&#x9898;</li><li>description&#xFF1A;&#x7F51;&#x7AD9;&#x63CF;&#x8FF0;</li><li>head&#xFF1A;&#x989D;&#x5916;&#x7684;&#x9700;&#x8981;&#x88AB;&#x6CE8;&#x5165;&#x5230;&#x5F53;&#x524D;&#x9875;&#x9762;&#x7684;HTML&quot;head&quot;&#x4E2D;&#x7684;&#x6807;&#x7B7E;&#xFF0C;&#x5176;&#x4E2D;&#x8DEF;&#x5F84;&#x7684;&quot;/&quot;&#x5C31;&#x662F;public&#x8D44;&#x6E90;&#x76EE;&#x5F55;&#x3002;</li></ul><p>&#x5177;&#x4F53;&#x914D;&#x7F6E;&#x8BE6;&#x60C5;&#x8BF7;&#x770B;&#x6587;&#x6863;&#xFF1A;<a href="https://vuepress.vuejs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE" rel="nofollow noreferrer" target="_blank">&#x914D;&#x7F6E;</a></p><h3 id="articleHeader7">&#x4E3B;&#x9898;&#x914D;&#x7F6E;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
       themeConfig: {
        nav: [
            { text: &apos;&#x4E3B;&#x9875;&apos;, link: &apos;/&apos; },
            { text: &apos;&#x535A;&#x6587;&apos;,
              items: [
                { text: &apos;Android&apos;, link: &apos;/android/&apos; },
                { text: &apos;ios&apos;, link: &apos;/ios/&apos; },
                { text: &apos;Web&apos;, link: &apos;/web/&apos; }
              ] 
            },
            { text: &apos;&#x5173;&#x4E8E;&apos;, link: &apos;/about/&apos; },
            { text: &apos;Github&apos;, link: &apos;https://www.github.com/codeteenager&apos; },
        ],
        sidebar: {
            &apos;/android/&apos;: [
                        &quot;&quot;,
                        &quot;android1&quot;, 
                         ...
                         ],
                &quot;/ios/&quot;:[
                        &quot;&quot;,
                        &quot;ios1&quot;,
                        ],
                &quot;/web/&quot;:[
                        &quot;&quot;,
                        &quot;web1&quot;,
                        ...
                             ],
            },
        sidebarDepth: 2,
        lastUpdated: &apos;Last Updated&apos;, 
    },
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
       <span class="hljs-attr">themeConfig</span>: {
        <span class="hljs-attr">nav</span>: [
            { <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;&#x4E3B;&#x9875;&apos;</span>, <span class="hljs-attr">link</span>: <span class="hljs-string">&apos;/&apos;</span> },
            { <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;&#x535A;&#x6587;&apos;</span>,
              <span class="hljs-attr">items</span>: [
                { <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;Android&apos;</span>, <span class="hljs-attr">link</span>: <span class="hljs-string">&apos;/android/&apos;</span> },
                { <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;ios&apos;</span>, <span class="hljs-attr">link</span>: <span class="hljs-string">&apos;/ios/&apos;</span> },
                { <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;Web&apos;</span>, <span class="hljs-attr">link</span>: <span class="hljs-string">&apos;/web/&apos;</span> }
              ] 
            },
            { <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;&#x5173;&#x4E8E;&apos;</span>, <span class="hljs-attr">link</span>: <span class="hljs-string">&apos;/about/&apos;</span> },
            { <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;Github&apos;</span>, <span class="hljs-attr">link</span>: <span class="hljs-string">&apos;https://www.github.com/codeteenager&apos;</span> },
        ],
        <span class="hljs-attr">sidebar</span>: {
            <span class="hljs-string">&apos;/android/&apos;</span>: [
                        <span class="hljs-string">&quot;&quot;</span>,
                        <span class="hljs-string">&quot;android1&quot;</span>, 
                         ...
                         ],
                <span class="hljs-string">&quot;/ios/&quot;</span>:[
                        <span class="hljs-string">&quot;&quot;</span>,
                        <span class="hljs-string">&quot;ios1&quot;</span>,
                        ],
                <span class="hljs-string">&quot;/web/&quot;</span>:[
                        <span class="hljs-string">&quot;&quot;</span>,
                        <span class="hljs-string">&quot;web1&quot;</span>,
                        ...
                             ],
            },
        <span class="hljs-attr">sidebarDepth</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">lastUpdated</span>: <span class="hljs-string">&apos;Last Updated&apos;</span>, 
    },
}</code></pre><ul><li>nav&#xFF1A;&#x5BFC;&#x822A;&#x680F;&#x914D;&#x7F6E;&#xFF0C;&#x6B64;&#x914D;&#x7F6E;&#x4E3B;&#x8981;&#x7528;&#x4E8E;&#x914D;&#x7F6E;&#x5BFC;&#x822A;&#x680F;&#x7684;&#x94FE;&#x63A5;&#xFF0C;&#x4F8B;&#x5982;&#x4EE5;&#x4E0A;&#x4E3B;&#x9875;&#x7684;link&#x4E3A;&quot;/&quot;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x7684;README.md&#x3002;&quot;/android/&quot;&#x94FE;&#x63A5;&#x5230;&#x6839;&#x76EE;&#x5F55;docs&#x4E0B;&#x7684;android&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;README.md&#x6587;&#x4EF6;&#x3002;</li><li><p>sidebar&#xFF1A;&#x4FA7;&#x8FB9;&#x680F;&#x914D;&#x7F6E;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x7701;&#x7565;.md&#x62D3;&#x5C55;&#x540D;&#xFF0C;&#x540C;&#x65F6;&#x4EE5;/&#x7ED3;&#x5C3E;&#x7684;&#x8DEF;&#x5F84;&#x5C06;&#x4F1A;&#x88AB;&#x89C6;&#x4E3A; */README.md&#x3002;&apos;/android/&apos;&#x3001;&apos;/ios/&apos;&#x548C;&apos;/web/&apos;&#x662F;&#x901A;&#x8FC7;&#x8DEF;&#x7531;&#x7684;&#x65B9;&#x5F0F;&#x5C06;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x7684;&#x6807;&#x9898;&#x62BD;&#x53D6;&#x51FA;&#x6765;&#x663E;&#x793A;&#x3002;&quot;/android/&quot;&#x662F;&#x6307;&#x6839;&#x76EE;&#x5F55;&#x4E0B;android&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x6BCF;&#x4E2A;&#x8DEF;&#x7531;&#x94FE;&#x63A5;&#x90FD;&#x8981;&#x6709;README.md&#x3002;&#x6240;&#x4EE5;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500;&#x2500; docs
&#x251C;&#x2500;&#x2500; README.md
&#x2514;&#x2500;&#x2500; android
&#x2502;   &#x2514;&#x2500;&#x2500; README.md
&#x2514;&#x2500;&#x2500; ios
   &#x2514;&#x2500;&#x2500; README.md
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml">&#x251C;&#x2500;&#x2500;&#x2500; docs
&#x251C;&#x2500;&#x2500; README.md
&#x2514;&#x2500;&#x2500; android
&#x2502;   &#x2514;&#x2500;&#x2500; README.md
&#x2514;&#x2500;&#x2500; ios
   &#x2514;&#x2500;&#x2500; README.md
</code></pre></li><li>sidebarDepth&#xFF1A;&#x5D4C;&#x5957;&#x7684;&#x6807;&#x9898;&#x94FE;&#x63A5;&#x6DF1;&#x5EA6;&#xFF0C;&#x9ED8;&#x8BA4;&#x7684;&#x6DF1;&#x5EA6;&#x4E3A;1&#x3002;</li><li>lastUpdated&#xFF1A;&#x6700;&#x540E;&#x66F4;&#x65B0;&#x65F6;&#x95F4;&#x3002;</li></ul><p>&#x4FA7;&#x8FB9;&#x680F;&#x5982;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015237355?w=690&amp;h=824" src="https://static.alili.tech/img/remote/1460000015237355?w=690&amp;h=824" alt="" title="" style="cursor:pointer"></span></p><p>&#x5177;&#x4F53;&#x4E3B;&#x9898;&#x914D;&#x7F6E;&#x8BE6;&#x60C5;&#x8BF7;&#x770B;&#x6587;&#x6863;&#xFF1A;<a href="https://vuepress.vuejs.org/zh/default-theme-config/#%E9%A6%96%E9%A1%B5" rel="nofollow noreferrer" target="_blank">&#x4E3B;&#x9898;&#x914D;&#x7F6E;</a></p><h3 id="articleHeader8">PWA&#x914D;&#x7F6E;</h3><p>VuePress&#x9ED8;&#x8BA4;&#x652F;&#x6301;PWA&#x914D;&#x7F6E;&#x7684;&#xFF0C;&#x9700;&#x8981;&#x5728;&#x57FA;&#x672C;&#x914D;&#x7F6E;&#x4E2D;&#x5F00;&#x542F;serviceWorker&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
     serviceWorker: true,
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
     <span class="hljs-attr">serviceWorker</span>: <span class="hljs-literal">true</span>,
}</code></pre><p>&#x7136;&#x540E;&#x518D;&#x6DFB;&#x52A0;icons&#x548C;Manifest&#x914D;&#x7F6E;&#xFF0C;&#x5728;public&#x4E2D;&#x6DFB;&#x52A0;manifest.json&#x914D;&#x7F6E;&#xFF0C;&#x548C;&#x56FE;&#x6807;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x77E5;&#x9053;PWA&#x7684;&#x53EF;&#x4EE5;&#x5230;<a href="https://developer.mozilla.org/en-US/docs/Web/Manifest" rel="nofollow noreferrer" target="_blank">PWA&#x914D;&#x7F6E;</a>&#x67E5;&#x770B;&#x76F8;&#x5173;&#x8D44;&#x6599;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;&#x59DC;&#x5E05;&#x6770;&quot;,
  &quot;short_name&quot;: &quot;&#x59DC;&#x5E05;&#x6770;&quot;,
  &quot;start_url&quot;: &quot;index.html&quot;,
  &quot;display&quot;: &quot;standalone&quot;,
  &quot;background_color&quot;: &quot;#2196f3&quot;,
  &quot;description&quot;: &quot;&#x59DC;&#x5E05;&#x6770;&#x7684;&#x4E2A;&#x4EBA;&#x4E3B;&#x9875;&quot;,
  &quot;theme_color&quot;: &quot;blue&quot;,
  &quot;icons&quot;: [
    {
      &quot;src&quot;: &quot;./logo.png&quot;,
      &quot;sizes&quot;: &quot;144x144&quot;,
      &quot;type&quot;: &quot;image/png&quot;
    }
  ],
  &quot;related_applications&quot;: [
    {
      &quot;platform&quot;: &quot;web&quot;
    },
    {
      &quot;platform&quot;: &quot;play&quot;,
      &quot;url&quot;: &quot;https://play.google.com/store/apps/details?id=cheeaun.hackerweb&quot;
    }
  ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml">{
  &quot;name&quot;: &quot;&#x59DC;&#x5E05;&#x6770;&quot;,
  &quot;short_name&quot;: &quot;&#x59DC;&#x5E05;&#x6770;&quot;,
  &quot;start_url&quot;: &quot;index.html&quot;,
  &quot;display&quot;: &quot;standalone&quot;,
  &quot;background_color&quot;: &quot;#2196f3&quot;,
  &quot;description&quot;: &quot;&#x59DC;&#x5E05;&#x6770;&#x7684;&#x4E2A;&#x4EBA;&#x4E3B;&#x9875;&quot;,
  &quot;theme_color&quot;: &quot;blue&quot;,
  &quot;icons&quot;: [
    {
      &quot;src&quot;: &quot;./logo.png&quot;,
      &quot;sizes&quot;: &quot;144x144&quot;,
      &quot;type&quot;: &quot;image/png&quot;
    }
  ],
  &quot;related_applications&quot;: [
    {
      &quot;platform&quot;: &quot;web&quot;
    },
    {
      &quot;platform&quot;: &quot;play&quot;,
      &quot;url&quot;: &quot;https://play.google.com/store/apps/details?id=cheeaun.hackerweb&quot;
    }
  ]
}</code></pre><p>&#x5728;config.js&#x914D;&#x7F6E;&#x4E2D;&#x6DFB;&#x52A0;manifest.json&#xFF0C;&#x7531;&#x4E8E;iphone11.3&#x4E0D;&#x652F;&#x6301;manifest&#x7684;&#x56FE;&#x6807;&#xFF0C;&#x6240;&#x4EE5;&#x52A0;&#x4E0A;apple-touch-icon&#x56FE;&#x6807;&#x914D;&#x7F6E;&#x5373;&#x53EF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    head: [
            [&apos;link&apos;, { rel: &apos;manifest&apos;, href: &apos;/manifest.json&apos; }],
            [&apos;link&apos;, { rel: &apos;apple-touch-icon&apos;, href: &apos;/img/logo.png&apos; }],
          ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">head</span>: [
            [<span class="hljs-string">&apos;link&apos;</span>, { <span class="hljs-attr">rel</span>: <span class="hljs-string">&apos;manifest&apos;</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">&apos;/manifest.json&apos;</span> }],
            [<span class="hljs-string">&apos;link&apos;</span>, { <span class="hljs-attr">rel</span>: <span class="hljs-string">&apos;apple-touch-icon&apos;</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">&apos;/img/logo.png&apos;</span> }],
          ]
}</code></pre><p>&#x6700;&#x540E;&#x5728;iphone&#x4E2D;&#x8BBF;&#x95EE;&#x7F51;&#x7AD9;&#xFF0C;&#x7136;&#x540E;&#x6DFB;&#x52A0;&#x4E3B;&#x5C4F;&#x5E55;&#x5373;&#x53EF;&#x3002;</p><h3 id="articleHeader9">&#x81EA;&#x5B9A;&#x4E49;&#x9875;&#x9762;</h3><p>&#x9ED8;&#x8BA4;&#x7684;&#x4E3B;&#x9898;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x9996;&#x9875;&#xFF08;Homepage&#xFF09;&#x7684;&#x5E03;&#x5C40;(&#x7528;&#x4E8E;&#x8FD9;&#x4E2A;&#x7F51;&#x7AD9;&#x7684;&#x4E3B;&#x9875;)&#x3002;&#x60F3;&#x8981;&#x4F7F;&#x7528;&#x5B83;&#xFF0C;&#x9700;&#x8981;&#x5728;&#x4F60;&#x7684;&#x6839;&#x7EA7; README.md&#x7684;home: true&#xFF0C;&#x7136;&#x540E;&#x6DFB;&#x52A0;&#x6570;&#x636E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="---
home: true
heroImage: /hero.png
actionText: &#x5FEB;&#x901F;&#x4E0A;&#x624B; &#x2192;
actionLink: /zh/guide/
features:
- title: &#x7B80;&#x6D01;&#x81F3;&#x4E0A;
  details: &#x4EE5; Markdown &#x4E3A;&#x4E2D;&#x5FC3;&#x7684;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#xFF0C;&#x4EE5;&#x6700;&#x5C11;&#x7684;&#x914D;&#x7F6E;&#x5E2E;&#x52A9;&#x4F60;&#x4E13;&#x6CE8;&#x4E8E;&#x5199;&#x4F5C;&#x3002;
- title: Vue&#x9A71;&#x52A8;
  details: &#x4EAB;&#x53D7; Vue + webpack &#x7684;&#x5F00;&#x53D1;&#x4F53;&#x9A8C;&#xFF0C;&#x5728; Markdown &#x4E2D;&#x4F7F;&#x7528; Vue &#x7EC4;&#x4EF6;&#xFF0C;&#x540C;&#x65F6;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; Vue &#x6765;&#x5F00;&#x53D1;&#x81EA;&#x5B9A;&#x4E49;&#x4E3B;&#x9898;&#x3002;
- title: &#x9AD8;&#x6027;&#x80FD;
  details: VuePress &#x4E3A;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x9884;&#x6E32;&#x67D3;&#x751F;&#x6210;&#x9759;&#x6001;&#x7684; HTML&#xFF0C;&#x540C;&#x65F6;&#x5728;&#x9875;&#x9762;&#x88AB;&#x52A0;&#x8F7D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C06;&#x4F5C;&#x4E3A; SPA &#x8FD0;&#x884C;&#x3002;
footer: MIT Licensed | Copyright &#xA9; 2018-present Evan You
---" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml">---
home: true
heroImage: /hero.png
actionText: &#x5FEB;&#x901F;&#x4E0A;&#x624B; &#x2192;
actionLink: /zh/guide/
features:
- title: &#x7B80;&#x6D01;&#x81F3;&#x4E0A;
  details: &#x4EE5; Markdown &#x4E3A;&#x4E2D;&#x5FC3;&#x7684;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#xFF0C;&#x4EE5;&#x6700;&#x5C11;&#x7684;&#x914D;&#x7F6E;&#x5E2E;&#x52A9;&#x4F60;&#x4E13;&#x6CE8;&#x4E8E;&#x5199;&#x4F5C;&#x3002;
- title: Vue&#x9A71;&#x52A8;
  details: &#x4EAB;&#x53D7; Vue + webpack &#x7684;&#x5F00;&#x53D1;&#x4F53;&#x9A8C;&#xFF0C;&#x5728; Markdown &#x4E2D;&#x4F7F;&#x7528; Vue &#x7EC4;&#x4EF6;&#xFF0C;&#x540C;&#x65F6;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; Vue &#x6765;&#x5F00;&#x53D1;&#x81EA;&#x5B9A;&#x4E49;&#x4E3B;&#x9898;&#x3002;
- title: &#x9AD8;&#x6027;&#x80FD;
  details: VuePress &#x4E3A;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x9884;&#x6E32;&#x67D3;&#x751F;&#x6210;&#x9759;&#x6001;&#x7684; HTML&#xFF0C;&#x540C;&#x65F6;&#x5728;&#x9875;&#x9762;&#x88AB;&#x52A0;&#x8F7D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C06;&#x4F5C;&#x4E3A; SPA &#x8FD0;&#x884C;&#x3002;
footer: MIT Licensed | Copyright &#xA9; 2018-present Evan You
---</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015237356" src="https://static.alili.tech/img/remote/1460000015237356" alt="" title="" style="cursor:pointer"></span></p><p>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x81EA;&#x5B9A;&#x4E49;&#x9996;&#x9875;&#x6216;&#x8005;&#x5176;&#x4ED6;&#x9875;&#x9762;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x9875;&#x9762;&#x7684;md&#x6587;&#x4EF6;&#x4E2D;&#x6DFB;&#x52A0;&#x9875;&#x9762;Vue&#x6587;&#x4EF6;&#x3002;Vue&#x6587;&#x4EF6;&#x653E;&#x7F6E;&#x5728;docs/.vuepress/components&#x76EE;&#x5F55;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="---
layout: HomeLayout
---" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml">---
layout: HomeLayout
---</code></pre><p>&#x4F8B;&#x5982;&#x6211;&#x535A;&#x5BA2;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x9996;&#x9875;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015237357?w=1420&amp;h=1146" src="https://static.alili.tech/img/remote/1460000015237357?w=1420&amp;h=1146" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader10">&#x90E8;&#x7F72;&#x4E0A;&#x7EBF;</h2><p>&#x7531;&#x4E8E;&#x6784;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#x751F;&#x6210;&#x9759;&#x6001;&#x9875;&#x9762;&#xFF0C;&#x6240;&#x4EE5;&#x5C06;dist&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x7684;&#x5185;&#x5BB9;&#x53EF;&#x4EE5;&#x90E8;&#x7F72;&#x5728;gitHub&#x7684;pages&#x6216;&#x8005;coding&#x7684;pages&#x90FD;&#x53EF;&#x4EE5;&#x3002;&#x5982;&#x679C;&#x4F7F;&#x7528;git&#x4E0A;&#x4F20;&#x5230;github&#x4E0A;&#xFF0C;&#x64CD;&#x4F5C;&#x6BD4;&#x8F83;&#x7E41;&#x7410;&#xFF0C;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x811A;&#x672C;&#x7684;&#x65B9;&#x5F0F;&#x81EA;&#x52A8;&#x90E8;&#x7F72;&#x5230;github&#x4E0A;&#x3002;</p><h3 id="articleHeader11">&#x521B;&#x5EFA;&#x4E00;&#x4E2A;deploy.sh</h3><p>&#x5728;project&#x4E0B;&#x521B;&#x5EFA;deploy.sh&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch deploy.sh" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="xml" style="word-break:break-word;white-space:initial">touch deploy.sh</code></pre><h3 id="articleHeader12">&#x7F16;&#x5199;&#x811A;&#x672C;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env sh

# &#x786E;&#x4FDD;&#x811A;&#x672C;&#x629B;&#x51FA;&#x9047;&#x5230;&#x7684;&#x9519;&#x8BEF;
set -e

# &#x751F;&#x6210;&#x9759;&#x6001;&#x6587;&#x4EF6;
npm run docs:build

# &#x8FDB;&#x5165;&#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x5939;
cd docs/.vuepress/dist

# &#x5982;&#x679C;&#x662F;&#x53D1;&#x5E03;&#x5230;&#x81EA;&#x5B9A;&#x4E49;&#x57DF;&#x540D;
# echo &apos;www.example.com&apos; &gt; CNAME

git init
git add -A
git commit -m &apos;deploy&apos;

# &#x5982;&#x679C;&#x53D1;&#x5E03;&#x5230; https://&lt;USERNAME&gt;.github.io
# git push -f git@github.com:&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io.git master

# &#x5982;&#x679C;&#x53D1;&#x5E03;&#x5230; https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;
# git push -f git@github.com:&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages

cd -" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">#!/usr/bin/env sh</span>

# &#x786E;&#x4FDD;&#x811A;&#x672C;&#x629B;&#x51FA;&#x9047;&#x5230;&#x7684;&#x9519;&#x8BEF;
set -e

# &#x751F;&#x6210;&#x9759;&#x6001;&#x6587;&#x4EF6;
npm run docs:build

# &#x8FDB;&#x5165;&#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x5939;
cd docs/.vuepress/dist

# &#x5982;&#x679C;&#x662F;&#x53D1;&#x5E03;&#x5230;&#x81EA;&#x5B9A;&#x4E49;&#x57DF;&#x540D;
# echo <span class="hljs-string">&apos;www.example.com&apos;</span> &gt; CNAME

git init
git add -A
git commit -m <span class="hljs-string">&apos;deploy&apos;</span>

# &#x5982;&#x679C;&#x53D1;&#x5E03;&#x5230; https:<span class="hljs-comment">//&lt;USERNAME&gt;.github.io</span>
# git push -f git@github.com:&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io.git master

# &#x5982;&#x679C;&#x53D1;&#x5E03;&#x5230; https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;
# git push -f git@github.com:&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages

cd -</code></pre><h3 id="articleHeader13">&#x8BBE;&#x7F6E;package.json</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;scripts&quot;: {
        &quot;deploy&quot;: &quot;bash deploy.sh&quot;
      },
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">&quot;scripts&quot;</span>: {
        <span class="hljs-string">&quot;deploy&quot;</span>: <span class="hljs-string">&quot;bash deploy.sh&quot;</span>
      },
}</code></pre><p>&#x8FD0;&#x884C;npm run deploy &#x5373;&#x53EF;&#x81EA;&#x52A8;&#x6784;&#x5EFA;&#x90E8;&#x7F72;&#x5230;github&#x4E0A;&#x3002;</p><p>&#x8BE6;&#x60C5;&#x8BF7;&#x770B;&#xFF0C;<a href="https://vuepress.vuejs.org/zh/guide/deploy.html" rel="nofollow noreferrer" target="_blank">&#x90E8;&#x7F72;</a></p><p>&#x793A;&#x4F8B;&#xFF1A;<a href="https://www.jiangshuaijie.com" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7684;&#x535A;&#x5BA2;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VuePress从零开始搭建自己专属博客

## 原文链接
[https://segmentfault.com/a/1190000015237352](https://segmentfault.com/a/1190000015237352)

