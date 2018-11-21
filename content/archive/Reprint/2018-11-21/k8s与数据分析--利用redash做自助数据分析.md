---
title: 'k8s与数据分析--利用redash做自助数据分析' 
date: 2018-11-21 2:30:10
hidden: true
slug: dyff6hsxti
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x5728;&#x4E4B;&#x524D;&#x6587;&#x7AE0;&#x4E2D;&#xFF0C;&#x4E00;&#x76F4;&#x8BB2;prometheus&#x7684;metrics&#x4EE5;&#x53CA;apm&#x7684;&#x6307;&#x6807;&#x7684;&#x91CD;&#x8981;&#x6027;&#xFF0C;&#x591A;&#x4FA7;&#x91CD;&#x4E8E;&#x6536;&#x636E;&#x7684;&#x6536;&#x96C6;&#x548C;&#x5B58;&#x50A8;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x5BF9;&#x8FD9;&#x4E9B;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x5206;&#x6790;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x6CA1;&#x6709;&#x6536;&#x96C6;&#x7684;&#x610F;&#x4E49;&#x4E86;&#x3002;&#x901A;&#x8FC7;&#x6570;&#x636E;&#x5206;&#x6790;&#x548C;&#x6316;&#x6398;&#xFF0C;&#x8BA9;&#x6570;&#x636E;&#x4EA7;&#x751F;&#x4EF7;&#x503C;&#x3002;&#x4E00;&#x76F4;&#x4EE5;&#x6765;&#x6211;&#x8BA4;&#x4E3A;devops&#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;&#x95ED;&#x73AF;&#xFF0C;&#x5373;apm&#xFF0C;&#x65E5;&#x5FD7;&#xFF0C;&#x76D1;&#x63A7;&#x7740;&#x4E09;&#x5927;&#x7CFB;&#x7EDF;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5FC5;&#x987B;&#x7ECF;&#x8FC7;&#x5206;&#x6790;&#x5BF9;dev&#x548C;ops&#x6709;&#x4EF7;&#x503C;&#x3002;<br>&#x6570;&#x636E;&#x53EF;&#x89C6;&#x5316;&#x662F;&#x5927;&#x6570;&#x636E;&#x7684;&#x300E;&#x6700;&#x540E;&#x4E00;&#x516C;&#x91CC;&#x300F;&#xFF0C;&#x505A;&#x597D;&#x53EF;&#x89C6;&#x5316;&#x662F;&#x5BF9;&#x4E8E;&#x6570;&#x636E;&#x5206;&#x6790;&#x662F;&#x91CD;&#x8981;&#x7684;&#x3002;<br>&#x4ECA;&#x5929;&#xFF0C;&#x4E3B;&#x8981;&#x4ECB;&#x7ECD;<a href="https://redash.io/" rel="nofollow noreferrer" target="_blank">redash</a>&#x8FD9;&#x6B3E;&#x6570;&#x636E;&#x5206;&#x6790;&#x7684;&#x5229;&#x5668;&#x3002;</p><h2 id="articleHeader1">redash&#x7B80;&#x4ECB;</h2><p>redash&#x662F;&#x4E00;&#x6B3E;&#x5F00;&#x6E90;&#x7684;BI&#x5DE5;&#x5177;&#xFF0C;&#x63D0;&#x4F9B;&#x4E86;&#x57FA;&#x4E8E;web&#x7684;&#x6570;&#x636E;&#x5E93;&#x67E5;&#x8BE2;&#x548C;&#x6570;&#x636E;&#x53EF;&#x89C6;&#x5316;&#x529F;&#x80FD;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbefDl?w=1500&amp;h=1000" src="https://static.alili.tech/img/bVbefDl?w=1500&amp;h=1000" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><ul><li>&#x652F;&#x6301; SQL, NoSQL, Big Data and API data&#x7B49;20&#x51E0;&#x79CD;&#x5E38;&#x89C1;&#x7684;&#x6570;&#x636E;&#x6E90;&#xFF1A;</li></ul><p><span class="img-wrap"><img data-src="/img/bVbefI5?w=2264&amp;h=1286" src="https://static.alili.tech/img/bVbefI5?w=2264&amp;h=1286" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x57FA;&#x672C;&#x4E0A;&#x6EE1;&#x8DB3;&#x4E86;&#x5927;&#x591A;&#x6570;&#x7684;&#x573A;&#x666F;&#x3002;&#x76F8;&#x6BD4;<br>superset,&#x9664;&#x4E86;&#x4E0A;&#x624B;&#x7B80;&#x5355;&#xFF0C;&#x652F;&#x6301;influxdb&#x7B49;&#x65F6;&#x5E8F;&#x6570;&#x636E;&#x5E93;&#x3002;&#x8FD9;&#x70B9;&#x5BF9;&#x4E8E;&#x76D1;&#x63A7;&#x6570;&#x636E;&#x5206;&#x6790;&#x5F88;&#x6709;&#x4F18;&#x52BF;&#x3002;</p><ul><li>sql&#x53CB;&#x597D;&#x7684;SQL editor&#xFF0C;&#x66F4;&#x52A0;&#x9AD8;&#x6548;&#x7684;&#x7F16;&#x5199;&#x590D;&#x6742;&#x7684;sql</li></ul><p><span class="img-wrap"><img data-src="/img/bVbefyG?w=2836&amp;h=952" src="https://static.alili.tech/img/bVbefyG?w=2836&amp;h=952" alt="sql editor" title="sql editor" style="cursor:pointer"></span></p><p>&#x968F;&#x65F6;&#x5199;&#xFF0C;&#x968F;&#x65F6;&#x67E5;&#xFF0C;&#x5B9E;&#x65F6;&#x770B;&#x5230;&#x67E5;&#x8BE2;&#x7684;&#x6548;&#x679C;</p><ul><li><p>&#x652F;&#x6301;&#x4E30;&#x5BCC;&#x7684;&#x53EF;&#x89C6;&#x5316;&#x5C55;&#x793A;&#x5F62;&#x5F0F;</p><ul><li>Boxplot</li><li>Chart - Line, Bar, Area, Pie, Scatter</li><li>Cohort</li><li>Counter</li><li>Funnel</li><li>Map</li><li>Pivot Table</li><li>Sankey</li><li>Sunburst</li><li>Word Cloud</li></ul></li></ul><p><span class="img-wrap"><img data-src="/img/bVbefB9?w=1260&amp;h=841" src="https://static.alili.tech/img/bVbefB9?w=1260&amp;h=841" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><ul><li>&#x89D2;&#x8272;&#x6743;&#x9650;&#x76F8;&#x5173;&#xFF0C;&#x652F;&#x6301;ldap&#x7B49;&#xFF0C;&#x65B9;&#x4FBF;&#x4E0E;&#x4F01;&#x4E1A;&#x5185;&#x90E8;&#x7684;&#x7528;&#x6237;&#x4F53;&#x7CFB;&#x6253;&#x901A;&#x3002;</li></ul><h2 id="articleHeader2">&#x5B89;&#x88C5;&#x548C;&#x7B80;&#x5355;&#x4F7F;&#x7528;</h2><h3 id="articleHeader3">&#x5B89;&#x88C5;</h3><p>&#x5982;&#x679C;&#x662F;&#x60F3;&#x76F4;&#x63A5;&#x4F53;&#x9A8C;&#x7684;&#x8BDD;&#xFF0C;docker-compose&#x90E8;&#x7F72;&#x6700;&#x7B80;&#x5355;&#xFF0C;<a href="https://github.com/getredash/redash" rel="nofollow noreferrer" target="_blank">redash</a>github&#x4ED3;&#x5E93;&#x4E2D;&#x76F4;&#x63A5;&#x63D0;&#x4F9B;&#x4E86;docker-compose.production.yml&#x6587;&#x4EF6;&#xFF0C;&#x76F4;&#x63A5;docker-compose up -d &#x5373;&#x53EF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# This is an example configuration for Docker Compose. Make sure to atleast update
# the cookie secret &amp; postgres database password.
#
# Some other recommendations:
# 1. To persist Postgres data, assign it a volume host location.
# 2. Split the worker service to adhoc workers and scheduled queries workers.
version: &apos;2&apos;
services:
  server:
    image: redash/redash:latest
    command: server
    depends_on:
      - postgres
      - redis
    ports:
      - &quot;5000:5000&quot;
    environment:
      PYTHONUNBUFFERED: 0
      REDASH_LOG_LEVEL: &quot;INFO&quot;
      REDASH_REDIS_URL: &quot;redis://redis:6379/0&quot;
      REDASH_DATABASE_URL: &quot;postgresql://postgres@postgres/postgres&quot;
      REDASH_COOKIE_SECRET: veryverysecret
      REDASH_WEB_WORKERS: 4
    restart: always
  worker:
    image: redash/redash:latest
    command: scheduler
    environment:
      PYTHONUNBUFFERED: 0
      REDASH_LOG_LEVEL: &quot;INFO&quot;
      REDASH_REDIS_URL: &quot;redis://redis:6379/0&quot;
      REDASH_DATABASE_URL: &quot;postgresql://postgres@postgres/postgres&quot;
      QUEUES: &quot;queries,scheduled_queries,celery&quot;
      WORKERS_COUNT: 2
    restart: always
  redis:
    image: redis:3.0-alpine
    restart: always
  postgres:
    image: postgres:9.5.6-alpine
    # volumes:
    #   - /opt/postgres-data:/var/lib/postgresql/data
    restart: always
  nginx:
    image: redash/nginx:latest
    ports:
      - &quot;80:80&quot;
    depends_on:
      - server
    links:
      - server:redash
    restart: always" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code><span class="hljs-meta"># This is an example configuration for Docker Compose. Make sure to atleast update</span>
<span class="hljs-meta"># the cookie secret &amp; postgres database password.</span>
<span class="hljs-meta">#</span>
<span class="hljs-meta"># Some other recommendations:</span>
<span class="hljs-meta"># 1. To persist Postgres data, assign it a volume host location.</span>
<span class="hljs-meta"># 2. Split the worker service to adhoc workers and scheduled queries workers.</span>
<span class="hljs-symbol">version:</span> <span class="hljs-string">&apos;2&apos;</span>
<span class="hljs-symbol">services:</span>
<span class="hljs-symbol">  server:</span>
<span class="hljs-symbol">    image:</span> redash/redash:latest
<span class="hljs-symbol">    command:</span> server
<span class="hljs-symbol">    depends_on:</span>
      - postgres
      - redis
<span class="hljs-symbol">    ports:</span>
      - <span class="hljs-string">&quot;5000:5000&quot;</span>
<span class="hljs-symbol">    environment:</span>
<span class="hljs-symbol">      PYTHONUNBUFFERED:</span> <span class="hljs-number">0</span>
<span class="hljs-symbol">      REDASH_LOG_LEVEL:</span> <span class="hljs-string">&quot;INFO&quot;</span>
<span class="hljs-symbol">      REDASH_REDIS_URL:</span> <span class="hljs-string">&quot;redis://redis:6379/0&quot;</span>
<span class="hljs-symbol">      REDASH_DATABASE_URL:</span> <span class="hljs-string">&quot;postgresql://postgres@postgres/postgres&quot;</span>
<span class="hljs-symbol">      REDASH_COOKIE_SECRET:</span> veryverysecret
<span class="hljs-symbol">      REDASH_WEB_WORKERS:</span> <span class="hljs-number">4</span>
<span class="hljs-symbol">    restart:</span> always
<span class="hljs-symbol">  worker:</span>
<span class="hljs-symbol">    image:</span> redash/redash:latest
<span class="hljs-symbol">    command:</span> scheduler
<span class="hljs-symbol">    environment:</span>
<span class="hljs-symbol">      PYTHONUNBUFFERED:</span> <span class="hljs-number">0</span>
<span class="hljs-symbol">      REDASH_LOG_LEVEL:</span> <span class="hljs-string">&quot;INFO&quot;</span>
<span class="hljs-symbol">      REDASH_REDIS_URL:</span> <span class="hljs-string">&quot;redis://redis:6379/0&quot;</span>
<span class="hljs-symbol">      REDASH_DATABASE_URL:</span> <span class="hljs-string">&quot;postgresql://postgres@postgres/postgres&quot;</span>
<span class="hljs-symbol">      QUEUES:</span> <span class="hljs-string">&quot;queries,scheduled_queries,celery&quot;</span>
<span class="hljs-symbol">      WORKERS_COUNT:</span> <span class="hljs-number">2</span>
<span class="hljs-symbol">    restart:</span> always
<span class="hljs-symbol">  redis:</span>
<span class="hljs-symbol">    image:</span> redis:<span class="hljs-number">3.0</span>-alpine
<span class="hljs-symbol">    restart:</span> always
<span class="hljs-symbol">  postgres:</span>
<span class="hljs-symbol">    image:</span> postgres:<span class="hljs-number">9.5</span><span class="hljs-number">.6</span>-alpine
    <span class="hljs-meta"># volumes:</span>
    <span class="hljs-meta">#   - /opt/postgres-data:/var/lib/postgresql/data</span>
<span class="hljs-symbol">    restart:</span> always
<span class="hljs-symbol">  nginx:</span>
<span class="hljs-symbol">    image:</span> redash/nginx:latest
<span class="hljs-symbol">    ports:</span>
      - <span class="hljs-string">&quot;80:80&quot;</span>
<span class="hljs-symbol">    depends_on:</span>
      - server
<span class="hljs-symbol">    links:</span>
      - server:redash
<span class="hljs-symbol">    restart:</span> always</code></pre><p>&#x901A;&#x8FC7;compose&#x6587;&#x4EF6;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;redash&#x4F9D;&#x8D56;redis&#x548C;pgsql&#x6570;&#x636E;&#x5E93;&#x3002;redis&#x7528;&#x6765;&#x7F13;&#x5B58;&#x4E00;&#x4E9B;&#x67E5;&#x8BE2;result&#xFF0C;&#x800C;pgsql&#x662F;&#x5143;&#x6570;&#x636E;&#x5E93;&#xFF0C;&#x76EE;&#x524D;&#x4E0D;&#x652F;&#x6301;mysql&#x66FF;&#x6362;pgsql&#x3002;</p><p>&#x5176;&#x4ED6;&#x5B89;&#x88C5;&#x65B9;&#x5F0F;&#xFF0C;&#x89C1;<a href="https://redash.io/help/open-source/setup" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a></p><h3 id="articleHeader4">&#x7B80;&#x5355;&#x4F7F;&#x7528;</h3><p>&#x5148;&#x4E0A;&#x4E00;&#x5F20;&#x5B9E;&#x9645;&#x7684;&#x6548;&#x679C;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbefGY?w=2872&amp;h=1322" src="https://static.alili.tech/img/bVbefGY?w=2872&amp;h=1322" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x5305;&#x542B;&#x4E86;couter&#x548C;area chart&#x3002;<br>&#x6570;&#x636E;&#x6E90;&#x5305;&#x62EC;influxdb&#x65F6;&#x5E8F;&#x6570;&#x636E;&#x5E93;&#xFF0C;&#x548C;mysql&#x4E1A;&#x52A1;&#x5E93;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbefH6?w=1900&amp;h=442" src="https://static.alili.tech/img/bVbefH6?w=1900&amp;h=442" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span><br>&#x5176;&#x4E2D;audit-middware &#x5176;&#x5B9E;&#x662F;Query Results&#x5E93;&#x3002;Query Results Data Source &#x5141;&#x8BB8;&#x4F60;&#x5728;&#x4E00;&#x4E9B;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x67E5;&#x8BE2;&#x7ED3;&#x679C;&#x4E4B;&#x4E0A;&#x518D;&#x505A;&#x4E00;&#x4E9B;&#x9AD8;&#x7EA7;&#x7684;&#x67E5;&#x8BE2;, &#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x8F7B;&#x6613;&#x5408;&#x5E76;&#x4E00;&#x4E9B;&#x67E5;&#x8BE2;&#x7ED3;&#x679C;&#x3002;</p><h2 id="articleHeader5">&#x603B;&#x7ED3;</h2><p>&#x5728;&#x5B9E;&#x9645;&#x4F7F;&#x7528;&#x4E2D;&#xFF0C;redash&#x548C;superset&#x5404;&#x6709;&#x4F18;&#x52A3;&#x3002;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x7684;&#x573A;&#x666F;&#x6765;&#x9009;&#x62E9;&#x5427;&#x3002;&#x67E5;&#x9605;&#x8D44;&#x6599;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5DF2;&#x7ECF;&#x6709;&#x4EBA;&#x5BF9;redash&#x505A;&#x4E86;&#x4E8C;&#x6B21;&#x5F00;&#x53D1;&#xFF0C;&#x8FD9;&#x4E5F;&#x8BB8;&#x662F;&#x6DF1;&#x5EA6;&#x4F7F;&#x7528;&#x7684;&#x5FC5;&#x7ECF;&#x4E4B;&#x8DEF;&#x3002;<br>&#x4E3A;&#x4EC0;&#x4E48;&#x975E;&#x8981;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x5F00;&#x6E90;BI&#x53EF;&#x89C6;&#x5316;&#x5DE5;&#x5177;&#xFF1F;<br>&#x56E0;&#x4E3A;&#x5982;&#x679C;&#x662F;&#x524D;&#x540E;&#x7AEF;&#x914D;&#x5408;&#x7684;&#x8BDD;&#xFF0C;&#x5DE5;&#x4F5C;&#x91CF;&#x4F1A;&#x5F88;&#x5927;&#x3002;&#x800C;&#x4E14;&#x4E5F;&#x5F88;&#x96BE;&#x5B9E;&#x73B0;&#x968F;&#x65F6;&#x4FEE;&#x6539;&#x968F;&#x65F6;&#x4E0A;&#x7EBF;&#x3002;&#x4E0D;&#x8FC7;&#x8FD9;&#x53D6;&#x51B3;&#x4E8E;&#x524D;&#x671F;&#x6570;&#x636E;&#x7684;&#x5B8C;&#x6574;&#x6027;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
k8s与数据分析--利用redash做自助数据分析

## 原文链接
[https://segmentfault.com/a/1190000015751205](https://segmentfault.com/a/1190000015751205)

