---
title: 一段万能的nginx接口反向代理配置
reprint: true
categories: reprint
abbrlink: 23cae450
date: 2018-11-06 02:30:12
---

{{% raw %}}
<p>&#x4F5C;&#x4E3A;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#xFF0C;&#x6BCF;&#x6B21;&#x8C03;&#x8BD5;&#x63A5;&#x53E3;&#xFF0C;&#x628A;&#x4EE3;&#x7801;&#x53D1;&#x5230;&#x6D4B;&#x8BD5;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x662F;&#x5F88;&#x8D39;&#x65F6;&#x8D39;&#x4E8B;&#x7684;&#x4E00;&#x4EF6;&#x4E8B;&#x60C5;&#x3002;<br>&#x4E3A;&#x4E86;&#x63D0;&#x9AD8;&#x6548;&#x7387;&#xFF0C;&#x60F3;&#x5230;&#x4E86;nginx&#x53CD;&#x5411;&#x4EE3;&#x7406;&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E00;&#x95EE;&#x9898;&#x3002;</p><p>&#x63A5;&#x53E3;&#x5730;&#x5740;&#xFF1A;<br>test.com</p><p>&#x8BBF;&#x95EE;&#x5730;&#x5740;&#xFF1A;<br>localhost</p><p>&#x6700;&#x6838;&#x5FC3;&#x7684;&#x95EE;&#x9898;&#x5C31;&#x662F;&#xFF0C;&#x767B;&#x5F55;&#x65F6;&#xFF0C;&#x65E0;&#x6CD5;&#x5199;&#x5165;cookie&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x8D70;&#x4E86;&#x4E0D;&#x5C11;&#x5F2F;&#x8DEF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile      on;
    keepalive_timeout 10;
    server {
        listen  80;
        server_name  localhost;
        
        location =/ {
            add_header X-Frame-Options SAMEORIGIN;
            root        D:/workspace/;
            index index.html;
        }

        location ~* \.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css|swf|woff|woff2|ttf|json|svg|cur|vue|otf|eot)$ {
            charset     utf-8;
            root        D:/workspace/;
            expires     3d;
        }
        
        location = /socket/v2 {
            proxy_pass   http://test.com;
            proxy_redirect off;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection &quot;upgrade&quot;;
            proxy_set_header Host test.com;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_connect_timeout 30;
            proxy_send_timeout 30;
            proxy_read_timeout 60;
            proxy_buffer_size 256k;
            proxy_buffers 4 256k;
        }
        
        location / {
            proxy_pass   http://test.com;
            proxy_set_header Cookie $http_cookie;
            proxy_cookie_domain test.com localhost;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host test.com;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nginx"><code><span class="hljs-attribute">worker_processes</span>  <span class="hljs-number">1</span>;
<span class="hljs-section">events</span> {
    <span class="hljs-attribute">worker_connections</span>  <span class="hljs-number">1024</span>;
}
<span class="hljs-section">http</span> {
    <span class="hljs-attribute">include</span>       mime.types;
    <span class="hljs-attribute">default_type</span>  application/octet-stream;
    <span class="hljs-attribute">sendfile</span>      <span class="hljs-literal">on</span>;
    <span class="hljs-attribute">keepalive_timeout</span> <span class="hljs-number">10</span>;
    <span class="hljs-section">server</span> {
        <span class="hljs-attribute">listen</span>  <span class="hljs-number">80</span>;
        <span class="hljs-attribute">server_name</span>  localhost;
        
        <span class="hljs-attribute">location</span> =/ {
            <span class="hljs-attribute">add_header</span> X-Frame-Options SAMEORIGIN;
            <span class="hljs-attribute">root</span>        D:/workspace/;
            <span class="hljs-attribute">index</span> index.html;
        }

        <span class="hljs-attribute">location</span> <span class="hljs-regexp">~* \.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css|swf|woff|woff2|ttf|json|svg|cur|vue|otf|eot)$</span> {
            <span class="hljs-attribute">charset</span>     utf-<span class="hljs-number">8</span>;
            <span class="hljs-attribute">root</span>        D:/workspace/;
            <span class="hljs-attribute">expires</span>     <span class="hljs-number">3d</span>;
        }
        
        <span class="hljs-attribute">location</span> = /socket/v2 {
            <span class="hljs-attribute">proxy_pass</span>   http://test.com;
            <span class="hljs-attribute">proxy_redirect</span> <span class="hljs-literal">off</span>;
            <span class="hljs-attribute">proxy_http_version</span> <span class="hljs-number">1</span>.<span class="hljs-number">1</span>;
            <span class="hljs-attribute">proxy_set_header</span> Upgrade <span class="hljs-variable">$http_upgrade</span>;
            <span class="hljs-attribute">proxy_set_header</span> Connection <span class="hljs-string">&quot;upgrade&quot;</span>;
            <span class="hljs-attribute">proxy_set_header</span> Host test.com;
            <span class="hljs-attribute">proxy_set_header</span> X-Real-IP <span class="hljs-variable">$remote_addr</span>;
            <span class="hljs-attribute">proxy_set_header</span> REMOTE-HOST <span class="hljs-variable">$remote_addr</span>;
            <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
            <span class="hljs-attribute">proxy_connect_timeout</span> <span class="hljs-number">30</span>;
            <span class="hljs-attribute">proxy_send_timeout</span> <span class="hljs-number">30</span>;
            <span class="hljs-attribute">proxy_read_timeout</span> <span class="hljs-number">60</span>;
            <span class="hljs-attribute">proxy_buffer_size</span> <span class="hljs-number">256k</span>;
            <span class="hljs-attribute">proxy_buffers</span> <span class="hljs-number">4</span> <span class="hljs-number">256k</span>;
        }
        
        <span class="hljs-attribute">location</span> / {
            <span class="hljs-attribute">proxy_pass</span>   http://test.com;
            <span class="hljs-attribute">proxy_set_header</span> Cookie <span class="hljs-variable">$http_cookie</span>;
            <span class="hljs-attribute">proxy_cookie_domain</span> test.com localhost;
            <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
            <span class="hljs-attribute">proxy_set_header</span> Host test.com;
            <span class="hljs-attribute">proxy_set_header</span> X-Real-IP <span class="hljs-variable">$remote_addr</span>;
            <span class="hljs-attribute">proxy_set_header</span> REMOTE-HOST <span class="hljs-variable">$remote_addr</span>;
        }
    }
}</code></pre><p>&#x6838;&#x5FC3;&#x4EE3;&#x7801;&#x5728;&#x4E09;&#x884C;&#x4EE3;&#x7801;&#x4E0A;&#xFF1A;<br>proxy_set_header Cookie $http_cookie;<br>proxy_cookie_domain test.com localhost;<br>proxy_set_header Host test.com;</p><p>&#x5177;&#x4F53;&#x89E3;&#x91CA;&#x6211;&#x4E5F;&#x662F;&#x4E00;&#x77E5;&#x534A;&#x89E3;&#xFF1A;<br>&#x7B2C;&#x4E00;&#x4E2A;&#x662F;&#x643A;&#x5E26;cookie&#xFF0C;<br>&#x7B2C;&#x4E8C;&#x4E2A;&#x8BBE;&#x7F6E;cookie &#x7684; domain<br>&#x7B2C;&#x4E09;&#x4E2A; &#x8BBE;&#x7F6E;&#x771F;&#x5B9E;&#x7684;host</p><h3 id="articleHeader0">&#x91CD;&#x8981;&#x63D0;&#x793A;&#xFF1A;&#x4EE5;&#x4E0A;3&#x4E2A;&#x7684;&#x987A;&#x5E8F;&#x4E0D;&#x8981;&#x98A0;&#x5012;&#xFF0C;&#x5426;&#x5219;&#x4EE3;&#x7406;&#x5931;&#x8D25;&#xFF0C;&#x6211;&#x4E5F;&#x4E0D;&#x77E5;&#x9053;&#x4E3A;&#x4EC0;&#x4E48;&#x3002;</h3><p>&#x5982;&#x4F55;&#x5728;&#x624B;&#x673A;&#x4E0A;&#x8C03;&#x8BD5;&#x5462;&#xFF1F;</p><p>&#x624B;&#x673A;&#x4E0A;&#x4E0D;&#x53EF;&#x80FD;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;localhost,&#x53EF;&#x4EE5;&#x628A;&#x624B;&#x673A;&#x548C;&#x7535;&#x8111;&#x8FDE;&#x63A5;&#x5230;&#x540C;&#x4E00;&#x4E2A;&#x7F51;&#x6BB5;&#xFF0C;&#x4F7F;&#x7528;&#x7535;&#x8111;&#x7684;ip&#x8FDB;&#x884C;&#x8BBF;&#x95EE;&#x3002;<br>&#x4F46;&#x662F;&#x8FD9;&#x91CC;&#x53EA;&#x4EE3;&#x7406;&#x4E86;localhost,&#x5E76;&#x6CA1;&#x6709;&#x4EE3;&#x7406;&#x7535;&#x8111;&#x7684;ip</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x9700;&#x8981;&#x628A;&#x662F;&#x4E0A;&#x9762;&#x7684;server{...}&#x62F7;&#x8D1D;&#x4E00;&#x4EFD;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x628A;&#x91CC;&#x9762;&#x7684;localhost&#x5168;&#x90E8;&#x6539;&#x6210;&#x4F60;&#x7684;&#x7535;&#x8111;ip&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x6700;&#x7EC8;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile      on;
    keepalive_timeout 10;
    server {
        listen  80;
        server_name  localhost;
        
        location =/ {
            add_header X-Frame-Options SAMEORIGIN;
            root        D:/workspace/;
            index index.html;
        }

        location ~* \.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css|swf|woff|woff2|ttf|json|svg|cur|vue|otf|eot)$ {
            charset     utf-8;
            root        D:/workspace/;
            expires     3d;
        }
        
        location = /socket/v2 {
            proxy_pass   http://test.com;
            proxy_redirect off;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection &quot;upgrade&quot;;
            proxy_set_header Host test.com;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_connect_timeout 30;
            proxy_send_timeout 30;
            proxy_read_timeout 60;
            proxy_buffer_size 256k;
            proxy_buffers 4 256k;
        }
        
        location / {
            proxy_pass   http://test.com;
            proxy_set_header Cookie $http_cookie;
            proxy_cookie_domain test.com localhost;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host test.com;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
        }
    }
    server {
        listen  8080;
        server_name  xx.xx.xx.xx;
        
        location =/ {
            add_header X-Frame-Options SAMEORIGIN;
            root        D:/workspace/;
            index index.html;
        }

        location ~* \.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css|swf|woff|woff2|ttf|json|svg|cur|vue|otf|eot)$ {
            charset     utf-8;
            root        D:/workspace/;
            expires     3d;
        }
        
        location = /socket/v2 {
            proxy_pass   http://test.com;
            proxy_redirect off;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection &quot;upgrade&quot;;
            proxy_set_header Host test.com;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_connect_timeout 30;
            proxy_send_timeout 30;
            proxy_read_timeout 60;
            proxy_buffer_size 256k;
            proxy_buffers 4 256k;
        }
        
        location / {
            proxy_pass   http://test.com;
            proxy_set_header Cookie $http_cookie;
            proxy_cookie_domain test.com xx.xx.xx.xx;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host test.com;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nginx"><code>
<span class="hljs-attribute">worker_processes</span>  <span class="hljs-number">1</span>;
<span class="hljs-section">events</span> {
    <span class="hljs-attribute">worker_connections</span>  <span class="hljs-number">1024</span>;
}
<span class="hljs-section">http</span> {
    <span class="hljs-attribute">include</span>       mime.types;
    <span class="hljs-attribute">default_type</span>  application/octet-stream;
    <span class="hljs-attribute">sendfile</span>      <span class="hljs-literal">on</span>;
    <span class="hljs-attribute">keepalive_timeout</span> <span class="hljs-number">10</span>;
    <span class="hljs-section">server</span> {
        <span class="hljs-attribute">listen</span>  <span class="hljs-number">80</span>;
        <span class="hljs-attribute">server_name</span>  localhost;
        
        <span class="hljs-attribute">location</span> =/ {
            <span class="hljs-attribute">add_header</span> X-Frame-Options SAMEORIGIN;
            <span class="hljs-attribute">root</span>        D:/workspace/;
            <span class="hljs-attribute">index</span> index.html;
        }

        <span class="hljs-attribute">location</span> <span class="hljs-regexp">~* \.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css|swf|woff|woff2|ttf|json|svg|cur|vue|otf|eot)$</span> {
            <span class="hljs-attribute">charset</span>     utf-<span class="hljs-number">8</span>;
            <span class="hljs-attribute">root</span>        D:/workspace/;
            <span class="hljs-attribute">expires</span>     <span class="hljs-number">3d</span>;
        }
        
        <span class="hljs-attribute">location</span> = /socket/v2 {
            <span class="hljs-attribute">proxy_pass</span>   http://test.com;
            <span class="hljs-attribute">proxy_redirect</span> <span class="hljs-literal">off</span>;
            <span class="hljs-attribute">proxy_http_version</span> <span class="hljs-number">1</span>.<span class="hljs-number">1</span>;
            <span class="hljs-attribute">proxy_set_header</span> Upgrade <span class="hljs-variable">$http_upgrade</span>;
            <span class="hljs-attribute">proxy_set_header</span> Connection <span class="hljs-string">&quot;upgrade&quot;</span>;
            <span class="hljs-attribute">proxy_set_header</span> Host test.com;
            <span class="hljs-attribute">proxy_set_header</span> X-Real-IP <span class="hljs-variable">$remote_addr</span>;
            <span class="hljs-attribute">proxy_set_header</span> REMOTE-HOST <span class="hljs-variable">$remote_addr</span>;
            <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
            <span class="hljs-attribute">proxy_connect_timeout</span> <span class="hljs-number">30</span>;
            <span class="hljs-attribute">proxy_send_timeout</span> <span class="hljs-number">30</span>;
            <span class="hljs-attribute">proxy_read_timeout</span> <span class="hljs-number">60</span>;
            <span class="hljs-attribute">proxy_buffer_size</span> <span class="hljs-number">256k</span>;
            <span class="hljs-attribute">proxy_buffers</span> <span class="hljs-number">4</span> <span class="hljs-number">256k</span>;
        }
        
        <span class="hljs-attribute">location</span> / {
            <span class="hljs-attribute">proxy_pass</span>   http://test.com;
            <span class="hljs-attribute">proxy_set_header</span> Cookie <span class="hljs-variable">$http_cookie</span>;
            <span class="hljs-attribute">proxy_cookie_domain</span> test.com localhost;
            <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
            <span class="hljs-attribute">proxy_set_header</span> Host test.com;
            <span class="hljs-attribute">proxy_set_header</span> X-Real-IP <span class="hljs-variable">$remote_addr</span>;
            <span class="hljs-attribute">proxy_set_header</span> REMOTE-HOST <span class="hljs-variable">$remote_addr</span>;
        }
    }
    <span class="hljs-section">server</span> {
        <span class="hljs-attribute">listen</span>  <span class="hljs-number">8080</span>;
        <span class="hljs-attribute">server_name</span>  xx.xx.xx.xx;
        
        <span class="hljs-attribute">location</span> =/ {
            <span class="hljs-attribute">add_header</span> X-Frame-Options SAMEORIGIN;
            <span class="hljs-attribute">root</span>        D:/workspace/;
            <span class="hljs-attribute">index</span> index.html;
        }

        <span class="hljs-attribute">location</span> <span class="hljs-regexp">~* \.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css|swf|woff|woff2|ttf|json|svg|cur|vue|otf|eot)$</span> {
            <span class="hljs-attribute">charset</span>     utf-<span class="hljs-number">8</span>;
            <span class="hljs-attribute">root</span>        D:/workspace/;
            <span class="hljs-attribute">expires</span>     <span class="hljs-number">3d</span>;
        }
        
        <span class="hljs-attribute">location</span> = /socket/v2 {
            <span class="hljs-attribute">proxy_pass</span>   http://test.com;
            <span class="hljs-attribute">proxy_redirect</span> <span class="hljs-literal">off</span>;
            <span class="hljs-attribute">proxy_http_version</span> <span class="hljs-number">1</span>.<span class="hljs-number">1</span>;
            <span class="hljs-attribute">proxy_set_header</span> Upgrade <span class="hljs-variable">$http_upgrade</span>;
            <span class="hljs-attribute">proxy_set_header</span> Connection <span class="hljs-string">&quot;upgrade&quot;</span>;
            <span class="hljs-attribute">proxy_set_header</span> Host test.com;
            <span class="hljs-attribute">proxy_set_header</span> X-Real-IP <span class="hljs-variable">$remote_addr</span>;
            <span class="hljs-attribute">proxy_set_header</span> REMOTE-HOST <span class="hljs-variable">$remote_addr</span>;
            <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
            <span class="hljs-attribute">proxy_connect_timeout</span> <span class="hljs-number">30</span>;
            <span class="hljs-attribute">proxy_send_timeout</span> <span class="hljs-number">30</span>;
            <span class="hljs-attribute">proxy_read_timeout</span> <span class="hljs-number">60</span>;
            <span class="hljs-attribute">proxy_buffer_size</span> <span class="hljs-number">256k</span>;
            <span class="hljs-attribute">proxy_buffers</span> <span class="hljs-number">4</span> <span class="hljs-number">256k</span>;
        }
        
        <span class="hljs-attribute">location</span> / {
            <span class="hljs-attribute">proxy_pass</span>   http://test.com;
            <span class="hljs-attribute">proxy_set_header</span> Cookie <span class="hljs-variable">$http_cookie</span>;
            <span class="hljs-attribute">proxy_cookie_domain</span> test.com xx.xx.xx.xx;
            <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
            <span class="hljs-attribute">proxy_set_header</span> Host test.com;
            <span class="hljs-attribute">proxy_set_header</span> X-Real-IP <span class="hljs-variable">$remote_addr</span>;
            <span class="hljs-attribute">proxy_set_header</span> REMOTE-HOST <span class="hljs-variable">$remote_addr</span>;
        }
    }
}</code></pre><p>&#x8BBF;&#x95EE;&#x65B9;&#x6CD5;&#xFF1A;</p><p><a href="http://xx.xx.xx.xx" rel="nofollow noreferrer" target="_blank">http://xx.xx.xx.xx</a>:8080 &#x5373;&#x53EF;</p><p>&#x5982;&#x679C;&#x662F;&#x6253;&#x5305;&#x5DE5;&#x5177;&#x751F;&#x6210;&#x589E;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;nodejs&#x52A8;&#x6001;&#x83B7;&#x53D6;&#x4F60;&#x7535;&#x8111;&#x7684;ip</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function&#xA0; getIPAdress() {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
    var&#xA0; interfaces&#xA0; = &#xA0;require(&apos;os&apos;).networkInterfaces();&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
    for (var&#xA0; devName&#xA0; in &#xA0;interfaces) {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
        var&#xA0; iface&#xA0; = &#xA0;interfaces[devName];&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
        for (var&#xA0; i = 0; i &lt; iface.length; i++) {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
            var&#xA0; alias&#xA0; = &#xA0;iface[i];&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
            if (alias.family&#xA0; === &#xA0;&apos;IPv4&apos;&#xA0; &amp;&amp; &#xA0;alias.address&#xA0; !== &#xA0;&apos;127.0.0.1&apos;&#xA0; &amp;&amp; &#xA0;!alias.internal) {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
                return&#xA0; alias.address;
            }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
        }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
    }&#xA0;&#xA0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-function">function&#xA0; <span class="hljs-title">getIPAdress</span>(<span class="hljs-params"></span>) </span>{&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
    <span class="hljs-keyword">var</span>&#xA0; interfaces&#xA0; = &#xA0;require(<span class="hljs-string">&apos;os&apos;</span>).networkInterfaces();&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span>&#xA0; devName&#xA0; <span class="hljs-keyword">in</span> &#xA0;interfaces) {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
        <span class="hljs-keyword">var</span>&#xA0; iface&#xA0; = &#xA0;interfaces[devName];&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span>&#xA0; i = <span class="hljs-number">0</span>; i &lt; iface.length; i++) {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
            <span class="hljs-keyword">var</span>&#xA0; <span class="hljs-keyword">alias</span>&#xA0; = &#xA0;iface[i];&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">alias</span>.family&#xA0; === &#xA0;<span class="hljs-string">&apos;IPv4&apos;</span>&#xA0; &amp;&amp; &#xA0;<span class="hljs-keyword">alias</span>.address&#xA0; !== &#xA0;<span class="hljs-string">&apos;127.0.0.1&apos;</span>&#xA0; &amp;&amp; &#xA0;!<span class="hljs-keyword">alias</span>.<span class="hljs-keyword">internal</span>) {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
                <span class="hljs-keyword">return</span>&#xA0; <span class="hljs-keyword">alias</span>.address;
            }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
        }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
    }&#xA0;&#xA0;
}</code></pre><p>&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x91CC;&#x8D34;&#x51FA;&#x6765;&#x4E00;&#x4E2A;&#x52A8;&#x6001;&#x751F;&#x6210;nginx.config&#x7684;&#x5DE5;&#x5177;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function buildNginxConfig(config) {

    function&#xA0; getIPAdress() {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
        var&#xA0; interfaces&#xA0; = &#xA0;require(&apos;os&apos;).networkInterfaces();&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
        for (var&#xA0; devName&#xA0; in &#xA0;interfaces) {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
            var&#xA0; iface&#xA0; = &#xA0;interfaces[devName];&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
            for (var&#xA0; i = 0; i &lt; iface.length; i++) {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
                var&#xA0; alias&#xA0; = &#xA0;iface[i];&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
                if (alias.family&#xA0; === &#xA0;&apos;IPv4&apos;&#xA0; &amp;&amp; &#xA0;alias.address&#xA0; !== &#xA0;&apos;127.0.0.1&apos;&#xA0; &amp;&amp; &#xA0;!alias.internal) {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
                    return&#xA0; alias.address;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
                }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
            }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
        }&#xA0;&#xA0;
    }
    var cwd = process.cwd().replace(/\\/g, &apos;/&apos;) + &apos;/app&apos;;
    var protocol = /https|443/.test(config.ip) ? &apos;https&apos; : &apos;http&apos;;

    var servers = [{
        browserIp: &apos;localhost&apos;,
        port: 80,
        root: cwd,
        serverIp: config.ip,
        protocol: protocol,
    }, {
        browserIp: getIPAdress(),
        port: 8080,
        root: cwd,
        serverIp: config.ip,
        protocol: protocol,
    }].map(function(item) {
        return `
    server {
        listen  ${item.port};
        server_name  ${item.browserIp};
        
        location =/ {
            add_header X-Frame-Options SAMEORIGIN;
            root        ${item.root};
            index index.html;
        }

        location ~* \\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css|swf|woff|woff2|ttf|json|svg|cur|vue|otf|eot)$ {
            charset     utf-8;
            root        ${item.root};
            expires     3d;
        }
        
        location = /socket/v2 {
            proxy_pass   ${item.protocol}://${item.serverIp};
            proxy_redirect off;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection &quot;upgrade&quot;;
            proxy_set_header Host ${item.serverIp};
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_connect_timeout 30;
            proxy_send_timeout 30;
            proxy_read_timeout 60;
            proxy_buffer_size 256k;
            proxy_buffers 4 256k;
        }
        
        location / {
            proxy_pass   ${item.protocol}://${item.serverIp};
            proxy_set_header Cookie $http_cookie;
            proxy_cookie_domain ${item.serverIp} ${item.browserIp};
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host ${item.serverIp};
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
        }
    }`;
    }).join(&apos;\n&apos;);
    var str = `worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile      on;
    keepalive_timeout 10;
    ${servers}
}`;

    return str;
}

exports = module.exports = buildNginxConfig;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">buildNginxConfig</span>(<span class="hljs-params">config</span>) </span>{

    <span class="hljs-function"><span class="hljs-keyword">function</span>&#xA0; <span class="hljs-title">getIPAdress</span>(<span class="hljs-params"></span>) </span>{&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
        <span class="hljs-keyword">var</span>&#xA0; interfaces&#xA0; = &#xA0;<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;os&apos;</span>).networkInterfaces();&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span>&#xA0; devName&#xA0; <span class="hljs-keyword">in</span> &#xA0;interfaces) {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
            <span class="hljs-keyword">var</span>&#xA0; iface&#xA0; = &#xA0;interfaces[devName];&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span>&#xA0; i = <span class="hljs-number">0</span>; i &lt; iface.length; i++) {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
                <span class="hljs-keyword">var</span>&#xA0; alias&#xA0; = &#xA0;iface[i];&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
                <span class="hljs-keyword">if</span> (alias.family&#xA0; === &#xA0;<span class="hljs-string">&apos;IPv4&apos;</span>&#xA0; &amp;&amp; &#xA0;alias.address&#xA0; !== &#xA0;<span class="hljs-string">&apos;127.0.0.1&apos;</span>&#xA0; &amp;&amp; &#xA0;!alias.internal) {&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
                    <span class="hljs-keyword">return</span>&#xA0; alias.address;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
                }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
            }&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
        }&#xA0;&#xA0;
    }
    <span class="hljs-keyword">var</span> cwd = process.cwd().replace(<span class="hljs-regexp">/\\/g</span>, <span class="hljs-string">&apos;/&apos;</span>) + <span class="hljs-string">&apos;/app&apos;</span>;
    <span class="hljs-keyword">var</span> protocol = <span class="hljs-regexp">/https|443/</span>.test(config.ip) ? <span class="hljs-string">&apos;https&apos;</span> : <span class="hljs-string">&apos;http&apos;</span>;

    <span class="hljs-keyword">var</span> servers = [{
        <span class="hljs-attr">browserIp</span>: <span class="hljs-string">&apos;localhost&apos;</span>,
        <span class="hljs-attr">port</span>: <span class="hljs-number">80</span>,
        <span class="hljs-attr">root</span>: cwd,
        <span class="hljs-attr">serverIp</span>: config.ip,
        <span class="hljs-attr">protocol</span>: protocol,
    }, {
        <span class="hljs-attr">browserIp</span>: getIPAdress(),
        <span class="hljs-attr">port</span>: <span class="hljs-number">8080</span>,
        <span class="hljs-attr">root</span>: cwd,
        <span class="hljs-attr">serverIp</span>: config.ip,
        <span class="hljs-attr">protocol</span>: protocol,
    }].map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">`
    server {
        listen  <span class="hljs-subst">${item.port}</span>;
        server_name  <span class="hljs-subst">${item.browserIp}</span>;
        
        location =/ {
            add_header X-Frame-Options SAMEORIGIN;
            root        <span class="hljs-subst">${item.root}</span>;
            index index.html;
        }

        location ~* \\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css|swf|woff|woff2|ttf|json|svg|cur|vue|otf|eot)$ {
            charset     utf-8;
            root        <span class="hljs-subst">${item.root}</span>;
            expires     3d;
        }
        
        location = /socket/v2 {
            proxy_pass   <span class="hljs-subst">${item.protocol}</span>://<span class="hljs-subst">${item.serverIp}</span>;
            proxy_redirect off;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection &quot;upgrade&quot;;
            proxy_set_header Host <span class="hljs-subst">${item.serverIp}</span>;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_connect_timeout 30;
            proxy_send_timeout 30;
            proxy_read_timeout 60;
            proxy_buffer_size 256k;
            proxy_buffers 4 256k;
        }
        
        location / {
            proxy_pass   <span class="hljs-subst">${item.protocol}</span>://<span class="hljs-subst">${item.serverIp}</span>;
            proxy_set_header Cookie $http_cookie;
            proxy_cookie_domain <span class="hljs-subst">${item.serverIp}</span> <span class="hljs-subst">${item.browserIp}</span>;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host <span class="hljs-subst">${item.serverIp}</span>;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
        }
    }`</span>;
    }).join(<span class="hljs-string">&apos;\n&apos;</span>);
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">`worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile      on;
    keepalive_timeout 10;
    <span class="hljs-subst">${servers}</span>
}`</span>;

    <span class="hljs-keyword">return</span> str;
}

exports = <span class="hljs-built_in">module</span>.exports = buildNginxConfig;</code></pre><p>&#x6709;&#x4E86;&#x8FD9;&#x4E2A;&#x4E07;&#x80FD;&#x53CD;&#x5411;&#x4EE3;&#x7406;&#xFF0C;&#x53EF;&#x4EE5;&#x968F;&#x5FC3;&#x6240;&#x6B32;&#x7684;&#x73A9;&#x8F6C;&#x4EFB;&#x4F55;&#x7F51;&#x7AD9;&#x63A5;&#x53E3;&#x4E86;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一段万能的nginx接口反向代理配置

## 原文链接
[https://segmentfault.com/a/1190000016575842](https://segmentfault.com/a/1190000016575842)

