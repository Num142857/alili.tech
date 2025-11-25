---
title: '我的springboot+vue前后端分离权限脚手架' 
date: 2018-11-28 2:30:11
hidden: true
slug: hawutpvdnkb
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x6211;&#x7684;springboot+vue&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x6743;&#x9650;&#x811A;&#x624B;&#x67B6;</h1><blockquote>&#x5176;&#x5B9E;&#x4E24;&#x5468;&#x524D;&#x5C31;&#x5199;&#x597D;&#x4E86;&#xFF0C;&#x5C31;&#x662F;&#x62D6;&#x7740;&#x4E00;&#x76F4;&#x6CA1;&#x8865;&#x4E2A;README&#x6587;&#x6863;&#x3002;&#x559C;&#x6B22;&#x7684;&#x540C;&#x5B66;&#x5E2E;&#x6211;&#x4E0A;&#x4E2A;&#x661F;&#x661F;&#xFF1A;<a href="https://github.com/CaiBaoHong/biu" rel="nofollow noreferrer" target="_blank">biu</a>&#x3002;&#x6709;bug&#x8BF7;issue&#x6211;&#x3002;&#x7801;&#x4E91;&#x5730;&#x5740;&#xFF1A;<a href="https://gitee.com/caibaohong/biu" rel="nofollow noreferrer" target="_blank">&#x7801;&#x4E91;biu</a></blockquote><blockquote>Biu&#xFF0C;boot&#x548C;vue&#x7684;&#x8FDE;&#x8BFB;&#x800C;&#x60F3;&#x5230;&#x7684;&#x540D;&#x5B57;&#x3002;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;Spring Boot&#x548C;Vue&#x7684;Web&#x5F00;&#x53D1;&#x811A;&#x624B;&#x67B6;&#xFF0C;&#x6574;&#x5408;&#x548C;&#x6700;&#x57FA;&#x7840;&#x7684;RBAC&#x6743;&#x9650;&#x63A7;&#x5236;&#xFF0C;&#x5305;&#x62EC;&#xFF1A;&#x83DC;&#x5355;&#x6743;&#x9650;&#x3001;&#x6309;&#x94AE;&#x6743;&#x9650;&#x3001;&#x63A5;&#x53E3;&#x6743;&#x9650;&#x3002;</blockquote><ul><li>&#x524D;&#x7AEF;&#x4F7F;&#x7528;vue-cli&#xFF0C;&#x540E;&#x7AEF;&#x4F7F;&#x7528;Spring Boot&#xFF0C;&#x4E24;&#x4E2A;&#x5168;&#x5BB6;&#x6876;&#x5F3A;&#x5F3A;&#x8054;&#x5408;&#x3002;</li><li>&#x7528;&#x7B80;&#x5355;&#x4F18;&#x96C5;&#x7684;&#x65B9;&#x5F0F;&#x6574;&#x5408;shiro</li><li>&#x4F7F;&#x7528;Gradle&#x6301;&#x7EED;&#x6784;&#x5EFA;&#x7279;&#x6027;&#xFF0C;&#x5F00;&#x53D1;&#x65F6;&#x4FEE;&#x6539;java&#x4EE3;&#x7801;&#x65E0;&#x9700;&#x91CD;&#x542F;</li><li>&#x4F7F;&#x7528;vue-element-admin&#x505A;&#x524D;&#x7AEF;&#x6A21;&#x677F;&#xFF0C;&#x6446;&#x8131;&#x5199;jQuery&#x7684;&#x75DB;&#x82E6;</li><li>&#x5DF2;&#x914D;&#x7F6E;&#x597D;cors&#x8DE8;&#x57DF;</li><li>&#x591A;&#x79CD;&#x7075;&#x6D3B;&#x5F62;&#x5F0F;&#x7684;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x65B9;&#x5F0F;&#xFF0C;&#x5305;&#x62EC;&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#x7684;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x548C;&#x90E8;&#x7F72;&#x7684;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;</li></ul><p><strong>&#x6548;&#x679C;&#x56FE;&#xFF1A;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbca52?w=1524&amp;h=857" src="https://static.alili.tech/img/bVbca52?w=1524&amp;h=857" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span><br><span class="img-wrap"><img data-src="/img/bVbca55?w=1524&amp;h=857" src="https://static.alili.tech/img/bVbca55?w=1524&amp;h=857" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span><br><span class="img-wrap"><img data-src="/img/bVbca57?w=1524&amp;h=857" src="https://static.alili.tech/img/bVbca57?w=1524&amp;h=857" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/bVbca6d?w=1524&amp;h=857" src="https://static.alili.tech/img/bVbca6d?w=1524&amp;h=857" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/bVbca6h?w=1524&amp;h=857" src="https://static.alili.tech/img/bVbca6h?w=1524&amp;h=857" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/bVbca6j?w=1524&amp;h=857" src="https://static.alili.tech/img/bVbca6j?w=1524&amp;h=857" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x5982;&#x4F55;&#x5F00;&#x59CB;&#x5F00;&#x53D1;</h2><p>&#x8BF7;&#x5148;&#x5B89;&#x88C5;&#x597D;&#x4F9D;&#x8D56;&#x7684;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF1A;Java8&#x3001;Gradle&#x3001;Node.js&#x3001;vue-cli&#x3002;&#x6211;&#x81EA;&#x5DF1;&#x4F7F;&#x7528;&#x7684;&#x662F;Gradle4.6&#xFF0C;Node8.11.1&#xFF0C;vue-cli 2.9.3&#xFF0C;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;Intellij IDEA&#x3002;</p><p>&#x514B;&#x9686;&#x9879;&#x76EE;&#x5230;&#x672C;&#x5730;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/CaiBaoHong/biu" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code style="word-break:break-word;white-space:initial">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/CaiBaoHong/biu</code></pre><p>&#x6253;&#x5F00;IDEA&#xFF0C;<code>File - Settings - Build Execution Deployment - Build Tools - Gradle</code>&#x914D;&#x7F6E;&#x597D;&#x672C;&#x673A;Gradle&#x7684;&#x8DEF;&#x5F84;&#x3002;</p><p>&#x6253;&#x5F00;IDEA&#xFF0C;<code>File - Open</code>&#x6253;&#x5F00;biu&#x9879;&#x76EE;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x5BFC;&#x5165;&#x9879;&#x76EE;&#xFF0C;&#x5F39;&#x51FA;Gradle&#x5BFC;&#x5165;&#x5F15;&#x5BFC;&#x7A97;&#x53E3;&#x7684;&#xFF0C;&#x6309;&#x4E0B;&#x4E00;&#x6B65;&#x5C31;&#x884C;&#xFF0C;&#x786E;&#x5B9A;&#x540E;&#x9879;&#x76EE;&#x5F00;&#x59CB;&#x521D;&#x59CB;&#x5316;&#xFF0C;<br>&#x8FC7;&#x7A0B;&#x6709;&#x70B9;&#x6162;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4E0B;&#x8F7D;server&#x6A21;&#x5757;&#x4E2D;Gradle&#x58F0;&#x660E;&#x7684;&#x9879;&#x76EE;&#x4F9D;&#x8D56;&#x3002;</p><p>&#x4E0B;&#x8F7D;&#x597D;&#x4F9D;&#x8D56;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x4E0B;&#x8F7D;browser&#x6A21;&#x5757;&#x7684;&#x4F9D;&#x8D56;&#x3002;&#x5728;IDEA&#x5DE6;&#x4E0B;&#x89D2;&#x6253;&#x5F00;&#x4E00;&#x4E2A;Terminal&#x547D;&#x4EE4;&#x884C;&#x7EC8;&#x7AEF;&#x3002;<code>cd browser</code>&#x7136;&#x540E;<code>npm install</code>&#xFF0C;&#x7B49;&#x5F85;&#x4F9D;&#x8D56;&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x3002;</p><p>&#x7136;&#x540E;&#x518D;&#x65B0;&#x5EFA;&#x4E24;&#x4E2A;Terminal&#x547D;&#x4EE4;&#x884C;&#x7EC8;&#x7AEF;&#xFF0C;&#x5373;&#x4E00;&#x5171;&#x5EFA;&#x4E09;&#x4E2A;&#x547D;&#x4EE4;&#x884C;&#x7EC8;&#x7AEF;&#x3002;</p><p>&#x5728;&#x7B2C;1&#x4E2A;&#x7EC8;&#x7AEF;&#x8F93;&#x5165;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd server
gradle build --continuous" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code>cd server
gradle build <span class="hljs-comment">--continuous</span></code></pre><p>&#x542F;&#x52A8;gradle&#x7684;&#x6301;&#x7EED;&#x6784;&#x5EFA;</p><p>&#x5728;&#x7B2C;2&#x4E2A;&#x7EC8;&#x7AEF;&#x8F93;&#x5165;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd server
gradle bootRun" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs axapta"><code>cd <span class="hljs-keyword">server</span>
gradle bootRun</code></pre><p>&#x542F;&#x52A8;spring boot&#x3002;&#x6709;&#x65F6;&#x5019;&#x7531;&#x4E8E;&#x6301;&#x7EED;&#x6784;&#x5EFA;&#x6CA1;&#x6709;&#x7F16;&#x8BD1;&#x597D;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;spring boot&#x542F;&#x52A8;&#x5931;&#x8D25;&#x3002;&#x591A;&#x8BD5;&#x51E0;&#x6B21;&#x5C31;&#x884C;&#x3002;</p><p>&#x5728;&#x7B2C;3&#x4E2A;&#x7EC8;&#x7AEF;&#x8F93;&#x5165;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd browser
npm run dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>cd browser
npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre><p>&#x542F;&#x52A8;spring boot&#x3002;&#x6709;&#x65F6;&#x5019;&#x7531;&#x4E8E;&#x6301;&#x7EED;&#x6784;&#x5EFA;&#x6CA1;&#x6709;&#x7F16;&#x8BD1;&#x597D;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;spring boot&#x542F;&#x52A8;&#x5931;&#x8D25;&#x3002;&#x591A;&#x8BD5;&#x51E0;&#x6B21;&#x5C31;&#x884C;&#x3002;</p><p>&#x5F85;&#x4E09;&#x4E2A;&#x7EC8;&#x7AEF;&#x90FD;&#x542F;&#x52A8;&#x5B8C;&#x6210;&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x9875;&#x9762;&#x8BBF;&#x95EE;&#x524D;&#x7AEF;&#x9875;&#x9762;&#xFF1A;<code>http://localhost:9527</code>&#xFF0C;&#x9875;&#x9762;&#x4E0A;&#x7684;ajax&#x8BF7;&#x6C42;&#x4F1A;&#x8F6C;&#x53D1;&#x5230;java&#x540E;&#x53F0;&#x7684;<code>8888</code>&#x7AEF;&#x53E3;&#x3002;</p><p>&#x540E;&#x7AEF;&#x6A21;&#x5757;<code>server</code>&#x7531;&#x4E8E;&#x4F7F;&#x7528;&#x4E86;Gradle&#x7684;&#x6301;&#x7EED;&#x6784;&#x5EFA;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x7F16;&#x8F91;&#x4EFB;&#x4F55;java&#x4EE3;&#x7801;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x4F1A;&#x89E6;&#x53D1;&#x6784;&#x5EFA;&#xFF0C;spring boot&#x4F1A;&#x81EA;&#x52A8;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#xFF0C;&#x65E0;&#x9700;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x624B;&#x52A8;&#x91CD;&#x542F;&#x3002;</p><p>&#x524D;&#x7AEF;&#x6A21;&#x5757;<code>browser</code>&#x662F;&#x7528;<code>vue-element-admin</code>&#x8FD9;&#x4E2A;&#x811A;&#x624B;&#x67B6;&#x6765;&#x505A;&#x7684;&#xFF0C;&#x6539;&#x52A8;&#x4EE3;&#x7801;&#x4E5F;&#x65E0;&#x9700;&#x91CD;&#x542F;&#x3002;&#x66F4;&#x591A;&#x8BE6;&#x60C5;&#x8BF7;&#x770B;&#xFF1A;<a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a></p><h2 id="articleHeader2">&#x5982;&#x4F55;&#x90E8;&#x7F72;</h2><p><strong>&#x6253;&#x5305;server&#x6A21;&#x5757;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd server
gradle build" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs axapta"><code>cd <span class="hljs-keyword">server</span>
gradle build</code></pre><p>&#x7136;&#x540E;&#x4E0A;&#x4F20;&#x5230;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x542F;&#x52A8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="java -jar server.jar" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">java </span>-<span class="hljs-keyword">jar </span>server.<span class="hljs-keyword">jar</span></code></pre><p><strong>&#x6253;&#x5305;browser&#x6A21;&#x5757;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd browser
npm run build:prod" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>cd browser
npm <span class="hljs-keyword">run</span><span class="bash"> build:prod</span></code></pre><p>&#x7136;&#x540E;&#x4E0A;&#x4F20;&#x5230;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x5B9E;&#x7528;<code>nginx</code>&#x5BF9;&#x5916;&#x63D0;&#x4F9B;&#x7F51;&#x9875;&#x5185;&#x5BB9;&#xFF0C;&#x4EE5;&#x53CA;&#x5C06;&#x7F51;&#x9875;&#x7684;ajax&#x8BF7;&#x6C42;&#x8F6C;&#x53D1;&#x5230;<code>server.jar</code>&#x7684;&#x540E;&#x53F0;&#x3002;&#x4EE5;&#x4E0B;&#x53C2;&#x8003;&#x7684;&#x914D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
user  nginx;
worker_processes  1;
 
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
 
 
events {
    worker_connections  1024;
}
 
 
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
 
    log_format  main  &apos;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &apos;
                      &apos;$status $body_bytes_sent &quot;$http_referer&quot; &apos;
                      &apos;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&apos;;
 
    access_log  /var/log/nginx/access.log  main;
 
    sendfile        on;
    #tcp_nopush     on;
 
    keepalive_timeout  65;
 
    # compress static html files
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_comp_level 9;
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;    
    
    # virtual host for jujuju
    server{
        listen 80;
        index index.html;
        root /data/production/jujuju/html;
    }
 
    # virtural host for aaa/web &#x3010;&#x5C31;&#x5728;&#x8FD9;&#x91CC;&#xFF01;&#xFF01;&#x3011;
    server{
        listen 9527;       
        index index.html;
        root /data/production/aaa/dist;                
        location /api/v1 {
            # proxy request to java server
            proxy_pass http://localhost:8888;
        }
    }
 
 
 
    include /etc/nginx/conf.d/*.conf;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code> 
user  nginx;
worker_processes  1;
 
error_log  /<span class="hljs-keyword">var</span>/<span class="hljs-keyword">log</span>/nginx/<span class="hljs-keyword">error</span>.<span class="hljs-keyword">log</span> warn;
pid        /<span class="hljs-keyword">var</span>/<span class="hljs-keyword">run</span>/nginx.pid;
 
 
events {
    worker_connections  1024;
}
 
 
http {
    <span class="hljs-keyword">include</span>       /etc/nginx/mime.types;
    default_type  application/octet-stream;
 
    log_format  main  &apos;<span class="hljs-variable">$remote_addr</span> - <span class="hljs-variable">$remote_user</span> [<span class="hljs-variable">$time_local</span>] <span class="hljs-string">&quot;$request&quot;</span> &apos;
                      &apos;<span class="hljs-variable">$status</span> <span class="hljs-variable">$body_bytes_sent</span> <span class="hljs-string">&quot;$http_referer&quot;</span> &apos;
                      &apos;<span class="hljs-string">&quot;$http_user_agent&quot;</span> <span class="hljs-string">&quot;$http_x_forwarded_for&quot;</span>&apos;;
 
    access_log  /<span class="hljs-keyword">var</span>/<span class="hljs-keyword">log</span>/nginx/access.<span class="hljs-keyword">log</span>  main;
 
    sendfile        <span class="hljs-keyword">on</span>;
    #tcp_nopush     <span class="hljs-keyword">on</span>;
 
    keepalive_timeout  65;
 
    # <span class="hljs-keyword">compress</span> static html files
    gzip <span class="hljs-keyword">on</span>;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_comp_level 9;
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;    
    
    # virtual host <span class="hljs-keyword">for</span> jujuju
    server{
        listen 80;
        index index.html;
        root /data/production/jujuju/html;
    }
 
    # virtural host <span class="hljs-keyword">for</span> aaa/web &#x3010;&#x5C31;&#x5728;&#x8FD9;&#x91CC;&#xFF01;&#xFF01;&#x3011;
    server{
        listen 9527;       
        index index.html;
        root /data/production/aaa/dist;                
        location /api/v1 {
            # proxy request to java server
            proxy_pass http:<span class="hljs-comment">//localhost:8888;</span>
        }
    }
 
 
 
    <span class="hljs-keyword">include</span> /etc/nginx/<span class="hljs-keyword">conf</span>.<span class="hljs-keyword">d</span><span class="hljs-comment">/*.conf;
}</span></code></pre><h2 id="articleHeader3">&#x5176;&#x5B83;&#x4FE1;&#x606F;</h2><p><strong>1.&#x5982;&#x4F55;&#x6574;&#x5408;shiro</strong></p><p>&#x7F51;&#x4E0A;&#x627E;&#x5230;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x57FA;&#x672C;&#x4E0A;&#x90FD;&#x4E0D;&#x662F;&#x57FA;&#x4E8E;Spring Boot&#x7684;starter&#x6765;&#x6574;&#x5408;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x4EE3;&#x7801;&#x91CF;&#x6BD4;&#x8F83;&#x591A;&#xFF0C;&#x800C;&#x4E14;&#x6BD4;&#x8F83;&#x7E41;&#x6742;&#x3002;<br>&#x5176;&#x5B9E;shiro&#x5B98;&#x65B9;&#x63D0;&#x4F9B;&#x4E86;starter&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x4F18;&#x96C5;&#x5730;&#x628A;shiro&#x6574;&#x5408;&#x5230;spring boot&#x4E2D;&#x3002;&#x8BF7;&#x770B;&#x5B98;&#x7F51;&#x76F8;&#x5173;&#x6587;&#x6863;&#xFF1A;<br><a href="https://shiro.apache.org/spring-boot.html" rel="nofollow noreferrer" target="_blank">Integrating Apache Shiro into Spring-Boot Applications</a></p><p><strong>2.&#x6743;&#x9650;&#x7BA1;&#x7406;&#x7684;&#x7EC6;&#x8282;</strong></p><p>&#x5728;&#x201C;&#x6743;&#x9650;&#x7BA1;&#x7406;&#x201D;&#x83DC;&#x5355;&#x4E2D;&#x3002;&#x6743;&#x9650;&#x6570;&#x636E;&#x5206;&#x4E3A;&#x83DC;&#x5355;&#x3001;&#x6309;&#x94AE;&#x3001;&#x63A5;&#x53E3;&#x4E09;&#x79CD;&#x3002;</p><p><strong>&#x83DC;&#x5355;&#x6743;&#x9650;&#x5143;&#x6570;&#x636E;</strong></p><p>&#x83DC;&#x5355;&#x7684;&#x6743;&#x9650;&#x5143;&#x6570;&#x636E;&#x662F;&#x5B9A;&#x4E49;&#x5728;<code>browser/src/router/index.js</code>&#x4E2D;&#x7684;&#xFF0C;<br>&#x5728;&#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x7684;&#x8DEF;&#x7531;&#x5C31;&#x53EF;&#x4EE5;&#x663E;&#x793A;&#x6210;&#x83DC;&#x5355;&#x3002;&#x8FD9;&#x4E9B;&#x83DC;&#x5355;&#x8DEF;&#x7531;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;<code>meta.perm</code>&#x5C5E;&#x6027;&#x6765;&#x58F0;&#x660E;&#x8BBF;&#x95EE;&#x8BE5;&#x83DC;&#x5355;&#x6240;&#x9700;&#x8981;&#x7684;&#x6743;&#x9650;&#x503C;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;&#x6743;&#x9650;&#x503C;&#xFF0C;&#x5C31;&#x662F;&#x6743;&#x9650;&#x7684;&#x5143;&#x6570;&#x636E;&#x3002;<br>&#x7531;&#x4E8E;&#x8FD9;&#x4E2A;&#x5143;&#x6570;&#x636E;&#x662F;&#x5B9A;&#x4E49;&#x5728;&#x524D;&#x7AEF;&#x7684;&#xFF0C;&#x540E;&#x7AEF;&#x7684;&#x6570;&#x636E;&#x5E93;&#x4E2D;<code>sys_perm</code>&#x8868;&#x4E0D;&#x4E00;&#x5B9A;&#x6709;&#x8BB0;&#x5F55;&#x3002;<br>&#x6240;&#x4EE5;&#x83DC;&#x5355;&#x6743;&#x9650;&#x5143;&#x6570;&#x636E;&#x4E2D;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x4ED6;&#x201C;&#x540C;&#x6B65;&#x201D;&#x6309;&#x94AE;&#xFF0C;&#x70B9;&#x51FB;&#x5373;&#x53EF;&#x628A;&#x9875;&#x9762;&#x4E0A;&#x5B9A;&#x4E49;&#x7684;&#x6743;&#x9650;&#x503C;&#x540C;&#x6B65;&#x4FDD;&#x5B58;&#x5230;&#x540E;&#x53F0;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x3002;</p><p><strong>&#x6309;&#x94AE;&#x6743;&#x9650;&#x5143;&#x6570;&#x636E;</strong></p><p>&#x6309;&#x94AE;&#x6743;&#x9650;&#x662F;&#x5F52;&#x5C5E;&#x4E8E;&#x83DC;&#x5355;&#x4E0B;&#x7684;&#xFF0C;&#x8FD9;&#x6837;&#x6709;&#x52A9;&#x4E8E;&#x6211;&#x4EEC;&#x533A;&#x5206;&#x76F8;&#x4F3C;&#x7684;&#x6309;&#x94AE;&#x3002;&#x6BD4;&#x5982;&#xFF0C;&#x7528;&#x6237;&#x7BA1;&#x7406;&#x83DC;&#x5355;&#x4E0B;&#x6709;&#x201C;&#x6DFB;&#x52A0;&#x7528;&#x6237;&#x201D;&#xFF0C;&#x89D2;&#x8272;&#x7BA1;&#x7406;&#x83DC;&#x5355;&#x4E0B;&#x6709;&#x201C;&#x6DFB;&#x52A0;&#x89D2;&#x8272;&#x201D;&#xFF0C;&#x4E24;&#x4E2A;&#x201C;&#x6DFB;&#x52A0;&#x201D;&#x6309;&#x94AE;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x5404;&#x81EA;&#x6302;&#x8F7D;&#x5728;&#x5BF9;&#x5E94;&#x83DC;&#x5355;&#x4E0B;&#xFF0C;&#x6BD4;&#x8F83;&#x5BB9;&#x6613;&#x6DF7;&#x6DC6;&#x3002;<br>&#x6309;&#x94AE;&#x6743;&#x9650;&#x5143;&#x6570;&#x636E;&#x662F;&#x5728;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x76F4;&#x63A5;&#x5B9A;&#x4E49;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5BF9;&#x6309;&#x94AE;&#x6743;&#x9650;&#x5143;&#x6570;&#x636E;&#x7684;&#x589E;&#x5220;&#x67E5;&#x6539;&#xFF0C;&#x90FD;&#x662F;&#x64CD;&#x4F5C;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x3002;</p><p><strong>&#x63A5;&#x53E3;&#x6743;&#x9650;&#x5143;&#x6570;&#x636E;</strong></p><p>&#x63A5;&#x53E3;&#x7684;&#x6743;&#x9650;&#x5143;&#x6570;&#x636E;&#x662F;&#x5B9A;&#x4E49;&#x5728;<code>server/com/abc/controller</code>&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x5404;&#x79CD;Controller&#x4E2D;&#x7684;&#xFF0C;</p><p>&#x5728;Controller&#x7684;&#x7C7B;&#x4E0A;&#xFF0C;&#x4F1A;&#x4F18;&#x5148;&#x67E5;&#x627E;<code>@PermInfo</code>&#x7684;value&#x5C5E;&#x6027;&#x4F5C;&#x4E3A;&#x63A5;&#x53E3;&#x6A21;&#x5757;&#x7684;&#x6743;&#x9650;&#x540D;&#xFF0C;&#x67E5;&#x627E;<code>@RequiresPermissions</code>&#x7684;&#x503C;&#x4F5C;&#x4E3A;&#x63A5;&#x53E3;&#x6A21;&#x5757;&#x7684;&#x6743;&#x9650;&#x503C;&#x3002;<br>&#x5982;&#x679C;&#x6CA1;&#x6709;&#xFF0C;&#x5219;&#x4F1A;&#x628A;Controller&#x7C7B;&#x540D;&#x4F5C;&#x4E3A;&#x63A5;&#x53E3;&#x6A21;&#x5757;&#x6743;&#x9650;&#x7684;&#x540D;&#x79F0;&#xFF0C;&#x628A;<code>@RequestMapping</code>&#x4F5C;&#x4E3A;&#x63A5;&#x53E3;&#x6A21;&#x5757;&#x6743;&#x9650;&#x7684;&#x6743;&#x9650;&#x503C;&#x3002;</p><p>&#x5BF9;&#x4E8E;&#x5728;Controller&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x53EA;&#x6709;&#x6CE8;&#x89E3;&#x4E86;<code>@RequiresPermission</code>&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x624D;&#x4F1A;&#x88AB;&#x89C6;&#x4E3A;&#x63A5;&#x53E3;&#x6743;&#x9650;&#x5143;&#x6570;&#x636E;&#x5C55;&#x793A;&#x5728;&#x201C;&#x6743;&#x9650;&#x7BA1;&#x7406;&#x201D;&#x83DC;&#x5355;&#x4E2D;&#x3002;<br>&#x83B7;&#x53D6;&#x63A5;&#x53E3;&#x6743;&#x9650;&#x5143;&#x6570;&#x636E;&#x7684;&#x903B;&#x8F91;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;&#x4F18;&#x5148;&#x67E5;&#x627E;<code>@PermInfo</code>&#x7684;value&#x5C5E;&#x6027;&#x4F5C;&#x4E3A;&#x63A5;&#x53E3;&#x7684;&#x6743;&#x9650;&#x540D;&#xFF0C;&#x67E5;&#x627E;<code>@RequiresPermissions</code>&#x7684;&#x503C;&#x4F5C;&#x4E3A;&#x63A5;&#x53E3;&#x6A21;&#x5757;&#x7684;&#x6743;&#x9650;&#x503C;&#x3002;<br>&#x5982;&#x679C;&#x6CA1;&#x6709;<code>@PermInfo</code>&#xFF0C;&#x5219;&#x4F1A;&#x628A;Controller&#x65B9;&#x6CD5;&#x540D;&#x4F5C;&#x4E3A;&#x63A5;&#x53E3;&#x6A21;&#x5757;&#x6743;&#x9650;&#x7684;&#x540D;&#x79F0;</p><p>&#x7531;&#x4E8E;&#x63A5;&#x53E3;&#x6743;&#x9650;&#x5143;&#x6570;&#x636E;&#x7684;&#x83B7;&#x53D6;&#x90FD;&#x4F1A;&#x83B7;&#x53D6;&#x5907;&#x9009;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x60A8;&#x4E0D;&#x5FC5;&#x62C5;&#x5FC3;&#x6CA1;&#x6709;&#x4F7F;&#x7528;<code>@PermInfo</code>&#x6765;&#x58F0;&#x660E;&#x6743;&#x9650;&#x540D;&#x79F0;&#x6216;&#x6743;&#x9650;&#x503C;&#x800C;&#x5BFC;&#x81F4;&#x65E0;&#x6CD5;&#x663E;&#x793A;&#x63A5;&#x53E3;&#x6743;&#x9650;&#x5143;&#x6570;&#x636E;&#x3002;</p><p><strong>3.&#x4E3A;&#x4EC0;&#x4E48;&#x83DC;&#x5355;&#x6743;&#x9650;&#x548C;&#x63A5;&#x53E3;&#x6743;&#x9650;&#x90FD;&#x4E0D;&#x76F4;&#x63A5;&#x5728;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x7EF4;&#x62A4;&#x5143;&#x6570;&#x636E;</strong></p><p>&#x8FD9;&#x6837;&#x505A;&#x662F;&#x4E3A;&#x4E86;&#x6570;&#x636E;&#x65B9;&#x4FBF;&#x7EF4;&#x62A4;&#xFF0C;&#x5F53;&#x524D;&#x7AEF;&#x7F16;&#x8F91;&#x5B8C;&#x83DC;&#x5355;&#x8DEF;&#x7531;&#x6570;&#x636E;&#x6216;&#x540E;&#x7AEF;&#x7F16;&#x8F91;&#x5B8C;&#x63A5;&#x53E3;&#xFF0C;&#x8FD8;&#x8981;&#x201C;&#x624B;&#x5DE5;&#x590D;&#x5236;&#x4E00;&#x4EFD;&#x201D;&#x5230;&#x6570;&#x636E;&#x5E93;&#xFF0C;&#x662F;&#x5F88;&#x7D2F;&#x5F88;&#x7B28;&#x7684;&#x4E8B;&#x60C5;&#x3002;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x91C7;&#x7528;&#x201C;&#x540C;&#x6B65;&#x201D;&#x7684;&#x65B9;&#x6CD5;&#x628A;&#x5143;&#x6570;&#x636E;&#x5199;&#x5165;<code>sys_perm</code>&#x8868;&#x3002;</p><p><strong>4.&#x63A5;&#x53E3;&#x6743;&#x9650;&#x662F;&#x5565;&#xFF1F;&#x7B49;&#x540C;&#x4E8E;&#x6309;&#x94AE;&#x6743;&#x9650;&#x5417;&#xFF1F;</strong></p><p>&#x63A5;&#x53E3;&#x6743;&#x9650;&#x662F;&#x4E3A;&#x4E86;&#x4FDD;&#x62A4;&#x540E;&#x53F0;&#x63A5;&#x53E3;&#x505A;&#x7684;&#x6743;&#x9650;&#x63A7;&#x5236;&#xFF0C;&#x5B83;&#x4E0D;&#x7B49;&#x540C;&#x4E0E;&#x524D;&#x53F0;&#x9875;&#x9762;&#x4E0A;&#x7684;&#x6309;&#x94AE;&#x6743;&#x9650;&#xFF0C;&#x6309;&#x94AE;&#x6743;&#x9650;&#x662F;&#x9875;&#x9762;&#x4E0A;&#x6839;&#x636E;&#x7528;&#x6237;&#x767B;&#x5F55;&#x540E;&#x8FD4;&#x56DE;&#x7684;&#x6743;&#x9650;&#x503C;&#xFF0C;&#x5224;&#x65AD;&#x7528;&#x6237;&#x662F;&#x5426;&#x6709;&#x6309;&#x94AE;&#x4E0A;&#x58F0;&#x660E;&#x7684;&#x6743;&#x9650;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5C31;&#x4E0D;&#x663E;&#x793A;&#x8BE5;&#x6309;&#x94AE;&#x3002;<br>&#x4F46;&#x662F;&#x63A5;&#x53E3;&#x8FD8;&#x662F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;http&#x6765;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x63A5;&#x53E3;&#x6743;&#x9650;&#x7684;&#x63A7;&#x5236;&#x3002;&#x800C;&#x4E14;&#xFF0C;&#x6709;&#x7684;&#x573A;&#x666F;&#x4E0B;&#xFF0C;&#x524D;&#x53F0;&#x7684;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;&#x4E0D;&#x4E00;&#x5B9A;&#x5BF9;&#x5E94;&#x540E;&#x53F0;&#x7684;&#x4E00;&#x4E2A;&#x63A5;&#x53E3;&#x8C03;&#x7528;&#xFF0C;&#x4E5F;&#x6709;&#x53EF;&#x80FD;&#x662F;&#x591A;&#x4E2A;&#x63A5;&#x53E3;&#x7684;&#x8C03;&#x7528;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x8FD9;&#x91CC;&#x628A;&#x201C;&#x6309;&#x94AE;&#x201D;&#x548C;&#x201C;&#x63A5;&#x53E3;&#x201D;&#x7684;&#x6982;&#x5FF5;&#x533A;&#x5206;&#x5F00;&#x4E86;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我的springboot+vue前后端分离权限脚手架

## 原文链接
[https://segmentfault.com/a/1190000015256638](https://segmentfault.com/a/1190000015256638)

