---
title: 使用Docker部署Spring-Boot+Vue博客系统
hidden: true
categories: reprint
slug: b265b7db
date: 2018-11-06 15:28:31
---

{{< raw >}}
<p>&#x5728;&#x4ECA;&#x5E74;&#x5E74;&#x521D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B8C;&#x6210;&#x4E86;&#x81EA;&#x5DF1;&#x7684;&#x4E2A;<a href="https://github.com/zzzzbw/Fame" rel="nofollow noreferrer" target="_blank">Fame</a>&#x535A;&#x5BA2;&#x7CFB;&#x7EDF;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x5F53;&#x65F6;&#x4E5F;&#x505A;&#x4E86;&#x4E00;&#x7BC7;&#x535A;&#x6587;<a href="http://zzzzbw.cn/article/5" rel="nofollow noreferrer" target="_blank">Spring-boot+Vue = Fame &#x5199;blog&#x7684;&#x4E00;&#x6B21;&#x5C0F;&#x7ED3;</a>&#x4F5C;&#x4E3A;&#x8BB0;&#x5F55;&#x548C;&#x4ECB;&#x7ECD;&#x3002;&#x4ECE;&#x5B8C;&#x6210;&#x5B9E;&#x73B0;&#x5230;&#x73B0;&#x5728;&#xFF0C;&#x4E5F;&#x65AD;&#x65AD;&#x7EED;&#x7EED;&#x7684;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x7684;&#x4F7F;&#x7528;&#x60C5;&#x51B5;&#x8FDB;&#x884C;&#x66F4;&#x65B0;&#x3002;</p><p>&#x53EA;&#x4E0D;&#x8FC7;&#x6BCF;&#x6B21;&#x4E0A;&#x7EBF;&#x90E8;&#x7F72;&#x7684;&#x65F6;&#x5019;&#x90FD;&#x89C9;&#x5F97;&#x6709;&#x4E9B;&#x9EBB;&#x70E6;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x7684;&#x670D;&#x52A1;&#x5668;&#x5185;&#x5B58;&#x592A;&#x5C0F;&#xFF0C;&#x6BCF;&#x6B21;&#x5373;&#x4F7F;&#x53EA;&#x66F4;&#x65B0;&#x4E86;&#x524D;&#x53F0;&#x90E8;&#x5206;(fame-front)&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5728;&#x6267;&#x884C;<code>npm build</code>&#x7684;&#x65F6;&#x5019;&#x90FD;&#x8FD8;&#x5FC5;&#x987B;&#x628A;&#x6211;&#x7684;&#x540E;&#x7AEF;&#x670D;&#x52A1;(fame-server)&#x7684;&#x8FDB;&#x7A0B;&#x5173;&#x6389;&#xFF0C;&#x4E0D;&#x7136;&#x4F1A;&#x9020;&#x6210;&#x670D;&#x52A1;&#x5668;&#x5361;&#x6B7B;(&#x60E8;&#x554A;)&#x3002;</p><p>&#x800C;&#x4E14;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x662F;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x7684;&#xFF0C;&#x535A;&#x5BA2;&#x524D;&#x53F0;&#x9875;&#x9762;&#x8FD8;&#x4E3A;&#x4E86;SEO&#x7528;&#x4E86;<code>Nuxt</code>&#x6846;&#x67B6;&#xFF0C;&#x5047;&#x5982;&#x662F;&#x7B2C;&#x4E00;&#x6B21;&#x90E8;&#x7F72;&#x6216;&#x8005;&#x8981;&#x670D;&#x52A1;&#x5668;&#x8FC1;&#x79FB;&#x7684;&#x8BDD;&#xFF0C;&#x9EBB;&#x70E6;&#x7684;&#x8981;&#x6B7B;&#x554A;&#xFF0C;&#x90E8;&#x7F72;&#x4E00;&#x6B21;&#x7684;&#x8BDD;&#x8981;&#x4EE5;&#x4E0B;&#x6B65;&#x9AA4;</p><ol><li>&#x5B89;&#x88C5;mysql&#xFF0C;&#x4FEE;&#x6539;&#x76F8;&#x5173;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x8BBE;&#x7F6E;&#x7F16;&#x7801;&#x65F6;&#x533A;&#x7B49;&#xFF0C;&#x7136;&#x540E;&#x91CD;&#x542F;</li><li>&#x4E0B;&#x8F7D;&#x5B89;&#x88C5;java&#xFF0C;&#x914D;&#x7F6E;java&#x73AF;&#x5883;</li><li>&#x4E0B;&#x8F7D;&#x5B89;&#x88C5;maven&#xFF0C;&#x914D;&#x7F6E;maven&#x73AF;&#x5883;</li><li>&#x4E0B;&#x8F7D;&#x5B89;&#x88C5;nginx&#xFF0C;&#x4FEE;&#x6539;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x8BBE;&#x8BA1;&#x53CD;&#x5411;&#x4EE3;&#x7406;&#x7B49;</li><li>&#x542F;&#x52A8;spring-boot&#x9879;&#x76EE;</li><li>&#x6253;&#x5305;vue&#x9879;&#x76EE;&#xFF0C;<code>npm install</code>,<code>npm run build</code>&#x7B49;</li><li>&#x542F;&#x52A8;nuxt&#x9879;&#x76EE;,<code>npm install</code>,<code>npm run start</code>&#x7B49;</li></ol><p>&#x5982;&#x679C;&#x80FD;&#x591F;&#x987A;&#x5229;&#x7684;&#x5B8C;&#x6210;&#x8FD9;&#x4E03;&#x4E2A;&#x6B65;&#x9AA4;&#x7B97;&#x662F;&#x5E78;&#x8FD0;&#x513F;&#x4E86;&#xFF0C;&#x5047;&#x5982;&#x4E2D;&#x95F4;&#x54EA;&#x4E2A;&#x6B65;&#x9AA4;&#x62A5;&#x9519;&#x51FA;&#x4E86;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x80FD;&#x8FD8;&#x8981;&#x56DE;&#x5934;&#x67E5;&#x627E;&#x54EA;&#x4E2A;&#x6B65;&#x9AA4;&#x51FA;&#x4E86;&#x95EE;&#x9898;&#xFF0C;&#x7136;&#x540E;&#x53C8;&#x91CD;&#x65B0;&#x90E8;&#x7F72;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016557758?w=190&amp;h=190" src="https://static.alili.tech/img/remote/1460000016557758?w=190&amp;h=190" alt="&#x6211;&#x9009;&#x62E9;&#x6B7B;&#x4EA1;" title="&#x6211;&#x9009;&#x62E9;&#x6B7B;&#x4EA1;" style="cursor:pointer;display:inline"></span></p><p>&#x5728;&#x8FD9;&#x4E9B;&#x9700;&#x6C42;&#x9762;&#x524D;&#xFF0C;Docker&#x5C31;&#x662F;&#x89E3;&#x51B3;&#x8FD9;&#x4E9B;&#x95EE;&#x9898;&#x7684;&#x5927;&#x6740;&#x5668;&#x3002;&#x65E0;&#x8BBA;&#x662F;&#x5176;&#x865A;&#x62DF;&#x5316;&#x6280;&#x672F;&#x9694;&#x79BB;&#x5404;&#x4E2A;&#x5BB9;&#x5668;&#x4F7F;&#x5176;&#x8D44;&#x6E90;&#x4E92;&#x4E0D;&#x5F71;&#x54CD;&#xFF0C;&#x8FD8;&#x662F;&#x4E00;&#x81F4;&#x7684;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#xFF0C;&#x4EE5;&#x53CA;docker-compose&#x7684;&#x4E00;&#x952E;&#x90E8;&#x7F72;&#xFF0C;&#x90FD;&#x5B8C;&#x7F8E;&#x7684;&#x89E3;&#x51B3;&#x4E86;&#x4E0A;&#x8FF0;&#x95EE;&#x9898;&#x3002;</p><blockquote>&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/zzzzbw/Fame" rel="nofollow noreferrer" target="_blank">Fame</a></blockquote><h3 id="articleHeader0">Docker&#x548C;Docker-compose&#x5B89;&#x88C5;</h3><blockquote>Docker&#x548C;Docker-compose&#x7684;&#x529F;&#x80FD;&#x548C;&#x4F7F;&#x7528;&#x53EF;&#x4EE5;&#x770B;&#x7EBF;&#x4E0A;&#x7684;&#x4E00;&#x4E2A;&#x4E2D;&#x6587;&#x6587;&#x6863;<a href="https://docker_practice.gitee.io/" rel="nofollow noreferrer" target="_blank">Docker &#x2014; &#x4ECE;&#x5165;&#x95E8;&#x5230;&#x5B9E;&#x8DF5;</a></blockquote><p>&#x4E0B;&#x9762;&#x662F;Centos7&#x5B89;&#x88C5;&#x548C;&#x914D;&#x7F6E;Docker&#x4EE5;&#x53CA;Docker-compose&#x7684;shell&#x811A;&#x672C;&#xFF0C;&#x5176;&#x4ED6;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x4FEE;&#x6539;&#x6765;&#x5B89;&#x88C5;&#x3002;&#x5176;&#x4E2D;Docker&#x7248;&#x672C;&#x4E3A;<code>docker-ce</code>&#xFF0C;Docker-compose&#x7248;&#x672C;&#x4E3A;<code>1.22.0</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/bin/sh

### &#x66F4;&#x65B0; ###
yum -y update

### &#x5B89;&#x88C5;docker ###
# &#x5B89;&#x88C5;&#x4E00;&#x4E9B;&#x5FC5;&#x8981;&#x7684;&#x7CFB;&#x7EDF;&#x5DE5;&#x5177;
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# &#x6DFB;&#x52A0;&#x8F6F;&#x4EF6;&#x6E90;&#x4FE1;&#x606F;
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# &#x66F4;&#x65B0; yum &#x7F13;&#x5B58;
sudo yum makecache fast
# &#x5B89;&#x88C5; Docker-ce
sudo yum -y install docker-ce
# &#x542F;&#x52A8;docker&#x5E76;&#x8BBE;&#x7F6E;&#x4E3A;&#x5F00;&#x673A;&#x542F;&#x52A8;(centos7)
systemctl  start docker.service
systemctl  enable docker.service
# &#x66FF;&#x6362;docker&#x4E3A;&#x56FD;&#x5185;&#x6E90;
echo &apos;{&quot;registry-mirrors&quot;: [&quot;https://registry.docker-cn.com&quot;],&quot;live-restore&quot;: true}&apos; &gt; /etc/docker/daemon.json
systemctl restart docker
# &#x5B89;&#x88C5;dokcer-compose
sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
# &#x5B89;&#x88C5;&#x547D;&#x4EE4;&#x8865;&#x5168;&#x5DE5;&#x5177;
yum -y install bash-completion
curl -L https://raw.githubusercontent.com/docker/compose/$(docker-compose version --short)/contrib/completion/bash/docker-compose &gt; /etc/bash_completion.d/docker-compose
### &#x5B89;&#x88C5;docker&#x7ED3;&#x675F; ###" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code class="shell">#!/bin/sh

### &#x66F4;&#x65B0; ###
yum -y update

### &#x5B89;&#x88C5;docker ###
# &#x5B89;&#x88C5;&#x4E00;&#x4E9B;&#x5FC5;&#x8981;&#x7684;&#x7CFB;&#x7EDF;&#x5DE5;&#x5177;
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# &#x6DFB;&#x52A0;&#x8F6F;&#x4EF6;&#x6E90;&#x4FE1;&#x606F;
sudo yum-config-manager --add-repo http:<span class="hljs-comment">//mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span>
# &#x66F4;&#x65B0; yum &#x7F13;&#x5B58;
sudo yum makecache fast
# &#x5B89;&#x88C5; Docker-ce
sudo yum -y install docker-ce
# &#x542F;&#x52A8;docker&#x5E76;&#x8BBE;&#x7F6E;&#x4E3A;&#x5F00;&#x673A;&#x542F;&#x52A8;(centos7)
systemctl  start docker.service
systemctl  enable docker.service
# &#x66FF;&#x6362;docker&#x4E3A;&#x56FD;&#x5185;&#x6E90;
echo <span class="hljs-string">&apos;{&quot;registry-mirrors&quot;: [&quot;https://registry.docker-cn.com&quot;],&quot;live-restore&quot;: true}&apos;</span> &gt; /etc/docker/daemon.json
systemctl restart docker
# &#x5B89;&#x88C5;dokcer-compose
sudo curl -L https:<span class="hljs-comment">//github.com/docker/compose/releases/download/1.22.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose</span>
chmod +x /usr/local/bin/docker-compose
# &#x5B89;&#x88C5;&#x547D;&#x4EE4;&#x8865;&#x5168;&#x5DE5;&#x5177;
yum -y install bash-completion
curl -L https:<span class="hljs-comment">//raw.githubusercontent.com/docker/compose/$(docker-compose version --short)/contrib/completion/bash/docker-compose &gt; /etc/bash_completion.d/docker-compose</span>
### &#x5B89;&#x88C5;docker&#x7ED3;&#x675F; ###</code></pre><h3 id="articleHeader1">Docker&#x5316;&#x6539;&#x9020;</h3><h4>&#x6539;&#x9020;&#x540E;&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h4><p>&#x5148;&#x770B;&#x4E00;&#x4E0B;&#x6539;&#x9020;&#x540E;&#x7684;&#x9879;&#x76EE;&#x7684;&#x7ED3;&#x6784;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;Fame
&#x2502;  &#x2502;  .env                            // docker-compose&#x73AF;&#x5883;&#x53C2;&#x6570;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
&#x2502;  &#x2502;  docker-compose.yml              // docker-compose&#x6587;&#x4EF6;
&#x2502;  &#x251C;&#x2500;fame-docker
&#x2502;  &#x2502;  &#x2502;  fame-front-Dockerfile        // fame-front&#x7684;Dockerfile&#x6587;&#x4EF6;
&#x2502;  &#x2502;  &#x2502;  fame-server-Dockerfile       // fame-server&#x7684;Dockerfile&#x6587;&#x4EF6;
&#x2502;  &#x2502;  &#x2502;  
&#x2502;  &#x2502;  &#x251C;&#x2500;fame-admin
&#x2502;  &#x2502;  &#x2502;      fame-admin-Dockerfile    // fame-admin&#x7684;Dockerfile&#x6587;&#x4EF6;
&#x2502;  &#x2502;  &#x2502;      nginx.conf               // fame-admin&#x7684;nginx&#x670D;&#x52A1;&#x5668;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
&#x2502;  &#x2502;  &#x2502;      
&#x2502;  &#x2502;  &#x251C;&#x2500;fame-mysql
&#x2502;  &#x2502;  &#x2502;      fame-mysql-Dockerfile    // mysql&#x7684;Dockerfile&#x6587;&#x4EF6;
&#x2502;  &#x2502;  &#x2502;      mysqld.cnf               // mysql&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;mysqld.cnf
&#x2502;  &#x2502;  &#x2502;      
&#x2502;  &#x2502;  &#x2514;&#x2500;fame-nginx
&#x2502;  &#x2502;          nginx-Dockerfile        // &#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;nginx&#x670D;&#x52A1;&#x5668;&#x7684;Dockerfile&#x6587;&#x4EF6;
&#x2502;  &#x2502;          nginx.conf              // &#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;nginx&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
&#x2502;  &#x2502;          
&#x2502;  &#x251C;&#x2500;fame-admin   // &#x535A;&#x5BA2;&#x7BA1;&#x7406;&#x540E;&#x53F0;&#xFF0C;&#x57FA;&#x4E8E;Vue+elementui
&#x2502;  &#x251C;&#x2500;fame-front   // &#x535A;&#x5BA2;&#x524D;&#x7AEF;&#xFF0C;&#x57FA;&#x4E8E;Nuxt
&#x2502;  &#x2514;&#x2500;fame-server  // &#x535A;&#x5BA2;&#x670D;&#x52A1;&#x7AEF;&#xFF0C;&#x57FA;&#x4E8E;spring-boot" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&#x251C;&#x2500;Fame
&#x2502;  &#x2502;  <span class="hljs-selector-class">.env</span>                            <span class="hljs-comment">// docker-compose&#x73AF;&#x5883;&#x53C2;&#x6570;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</span>
&#x2502;  &#x2502;  docker-compose<span class="hljs-selector-class">.yml</span>              <span class="hljs-comment">// docker-compose&#x6587;&#x4EF6;</span>
&#x2502;  &#x251C;&#x2500;fame-docker
&#x2502;  &#x2502;  &#x2502;  fame-front-Dockerfile        <span class="hljs-comment">// fame-front&#x7684;Dockerfile&#x6587;&#x4EF6;</span>
&#x2502;  &#x2502;  &#x2502;  fame-server-Dockerfile       <span class="hljs-comment">// fame-server&#x7684;Dockerfile&#x6587;&#x4EF6;</span>
&#x2502;  &#x2502;  &#x2502;  
&#x2502;  &#x2502;  &#x251C;&#x2500;fame-admin
&#x2502;  &#x2502;  &#x2502;      fame-admin-Dockerfile    <span class="hljs-comment">// fame-admin&#x7684;Dockerfile&#x6587;&#x4EF6;</span>
&#x2502;  &#x2502;  &#x2502;      nginx<span class="hljs-selector-class">.conf</span>               <span class="hljs-comment">// fame-admin&#x7684;nginx&#x670D;&#x52A1;&#x5668;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</span>
&#x2502;  &#x2502;  &#x2502;      
&#x2502;  &#x2502;  &#x251C;&#x2500;fame-mysql
&#x2502;  &#x2502;  &#x2502;      fame-mysql-Dockerfile    <span class="hljs-comment">// mysql&#x7684;Dockerfile&#x6587;&#x4EF6;</span>
&#x2502;  &#x2502;  &#x2502;      mysqld<span class="hljs-selector-class">.cnf</span>               <span class="hljs-comment">// mysql&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;mysqld.cnf</span>
&#x2502;  &#x2502;  &#x2502;      
&#x2502;  &#x2502;  &#x2514;&#x2500;fame-nginx
&#x2502;  &#x2502;          nginx-Dockerfile        <span class="hljs-comment">// &#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;nginx&#x670D;&#x52A1;&#x5668;&#x7684;Dockerfile&#x6587;&#x4EF6;</span>
&#x2502;  &#x2502;          nginx<span class="hljs-selector-class">.conf</span>              <span class="hljs-comment">// &#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;nginx&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</span>
&#x2502;  &#x2502;          
&#x2502;  &#x251C;&#x2500;fame-admin   <span class="hljs-comment">// &#x535A;&#x5BA2;&#x7BA1;&#x7406;&#x540E;&#x53F0;&#xFF0C;&#x57FA;&#x4E8E;Vue+elementui</span>
&#x2502;  &#x251C;&#x2500;fame-front   <span class="hljs-comment">// &#x535A;&#x5BA2;&#x524D;&#x7AEF;&#xFF0C;&#x57FA;&#x4E8E;Nuxt</span>
&#x2502;  &#x2514;&#x2500;fame-server  <span class="hljs-comment">// &#x535A;&#x5BA2;&#x670D;&#x52A1;&#x7AEF;&#xFF0C;&#x57FA;&#x4E8E;spring-boot</span></code></pre><p>&#x4E3A;&#x4E86;&#x4E0D;&#x7834;&#x574F;&#x539F;&#x6709;&#x9879;&#x76EE;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x65E0;&#x8BBA;&#x524D;&#x7AEF;&#x8FD8;&#x662F;&#x540E;&#x7AEF;&#x7684;docker&#x7684;&#x76F8;&#x5173;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x5168;&#x90E8;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#xFF0C;&#x5355;&#x72EC;&#x653E;&#x5728;&#x4E86;<code>fame-docker</code>&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x3002;</p><p><code>docker-compose.yml</code>&#x653E;&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x76F4;&#x63A5;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x8FD0;&#x884C;&#x547D;&#x4EE4;&#xFF1A;<code>docker-compose up -d</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@localhost Fame]# docker-compose up -d
Starting fame-front ... 
Starting fame-admin ... 
Starting fame-front ... done
Starting fame-admin ... done
Starting fame-nginx ... done" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>[root@localhost Fame]# docker-compose up -d
Starting fame-front ... 
Starting fame-admin ... 
Starting fame-front ... done
Starting fame-admin ... done
Starting fame-nginx ... done</code></pre><p>&#x5C31;&#x542F;&#x52A8;&#x9879;&#x76EE;&#x4E86;&#xFF0C;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x91CD;&#x590D;&#x7E41;&#x7410;&#x7684;&#x6B65;&#x9AA4;&#xFF01;</p><h3 id="articleHeader2">&#x6539;&#x9020;&#x540E;&#x7684;docker&#x9879;&#x76EE;&#x7ED3;&#x6784;</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000016557759" src="https://static.alili.tech/img/remote/1460000016557759" alt="fame-structure" title="fame-structure" style="cursor:pointer"></span></p><h4>&#x6539;&#x9020;&#x540E;&#x7684;<code>docker-compose.yaml</code>&#x6587;&#x4EF6;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="version: &apos;3&apos;
services: 
  fame-nginx:
    container_name: fame-nginx
    build:
     context: ./
     dockerfile: ./fame-docker/fame-nginx/nginx-Dockerfile
    ports:
      - &quot;80:80&quot;
    volumes:
     - ./logs/nginx:/var/log/nginx
    depends_on:
      - fame-server
      - fame-admin
      - fame-front
  
  fame-mysql:
   container_name: fame-mysql
   build: 
     context: ./
     dockerfile: ./fame-docker/fame-mysql/fame-mysql-Dockerfile
   environment:
     MYSQL_DATABASE: fame
     MYSQL_ROOT_PASSWORD: root
     MYSQL_ROOT_HOST: &apos;%&apos;
     TZ: Asia/Shanghai
   expose:
      - &quot;3306&quot;
   volumes:
     - ./mysql/mysql_data:/var/lib/mysql
   restart: always

  fame-server:
    container_name: fame-server
    restart: always
    build: 
     context: ./
     dockerfile: ./fame-docker/fame-server-Dockerfile
    working_dir: /app
    volumes:
      - ./fame-server:/app
      - ~/.m2:/root/.m2
      - ./logs/fame:/app/log
    expose:
      - &quot;9090&quot;
    command: mvn clean spring-boot:run -Dspring-boot.run.profiles=docker -Dmaven.test.skip=true
    depends_on:
      - fame-mysql

  fame-admin:
   container_name: fame-admin
   build: 
    context: ./
    dockerfile: ./fame-docker/fame-admin/fame-admin-Dockerfile
    args:
      BASE_URL: ${BASE_URL}
   expose:
      - &quot;3001&quot;

  fame-front:
   container_name: fame-front
   build: 
    context: ./
    dockerfile: ./fame-docker/fame-front-Dockerfile
   environment:
      BASE_URL: ${BASE_URL}
      PROXY_HOST: ${PROXY_HOST}
      PROXY_PORT: ${PROXY_PORT}
   expose:
      - &quot;3000&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="yaml hljs"><code class="yaml"><span class="hljs-attr">version:</span> <span class="hljs-string">&apos;3&apos;</span>
<span class="hljs-attr">services:</span> 
<span class="hljs-attr">  fame-nginx:</span>
<span class="hljs-attr">    container_name:</span> <span class="hljs-string">fame-nginx</span>
<span class="hljs-attr">    build:</span>
<span class="hljs-attr">     context:</span> <span class="hljs-string">./</span>
<span class="hljs-attr">     dockerfile:</span> <span class="hljs-string">./fame-docker/fame-nginx/nginx-Dockerfile</span>
<span class="hljs-attr">    ports:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">&quot;80:80&quot;</span>
<span class="hljs-attr">    volumes:</span>
<span class="hljs-bullet">     -</span> <span class="hljs-string">./logs/nginx:/var/log/nginx</span>
<span class="hljs-attr">    depends_on:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">fame-server</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">fame-admin</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">fame-front</span>
  
<span class="hljs-attr">  fame-mysql:</span>
<span class="hljs-attr">   container_name:</span> <span class="hljs-string">fame-mysql</span>
<span class="hljs-attr">   build:</span> 
<span class="hljs-attr">     context:</span> <span class="hljs-string">./</span>
<span class="hljs-attr">     dockerfile:</span> <span class="hljs-string">./fame-docker/fame-mysql/fame-mysql-Dockerfile</span>
<span class="hljs-attr">   environment:</span>
<span class="hljs-attr">     MYSQL_DATABASE:</span> <span class="hljs-string">fame</span>
<span class="hljs-attr">     MYSQL_ROOT_PASSWORD:</span> <span class="hljs-string">root</span>
<span class="hljs-attr">     MYSQL_ROOT_HOST:</span> <span class="hljs-string">&apos;%&apos;</span>
<span class="hljs-attr">     TZ:</span> <span class="hljs-string">Asia/Shanghai</span>
<span class="hljs-attr">   expose:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">&quot;3306&quot;</span>
<span class="hljs-attr">   volumes:</span>
<span class="hljs-bullet">     -</span> <span class="hljs-string">./mysql/mysql_data:/var/lib/mysql</span>
<span class="hljs-attr">   restart:</span> <span class="hljs-string">always</span>

<span class="hljs-attr">  fame-server:</span>
<span class="hljs-attr">    container_name:</span> <span class="hljs-string">fame-server</span>
<span class="hljs-attr">    restart:</span> <span class="hljs-string">always</span>
<span class="hljs-attr">    build:</span> 
<span class="hljs-attr">     context:</span> <span class="hljs-string">./</span>
<span class="hljs-attr">     dockerfile:</span> <span class="hljs-string">./fame-docker/fame-server-Dockerfile</span>
<span class="hljs-attr">    working_dir:</span> <span class="hljs-string">/app</span>
<span class="hljs-attr">    volumes:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">./fame-server:/app</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">~/.m2:/root/.m2</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">./logs/fame:/app/log</span>
<span class="hljs-attr">    expose:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">&quot;9090&quot;</span>
<span class="hljs-attr">    command:</span> <span class="hljs-string">mvn</span> <span class="hljs-string">clean</span> <span class="hljs-attr">spring-boot:run</span> <span class="hljs-bullet">-Dspring-boot.run.profiles=docker</span> <span class="hljs-bullet">-Dmaven.test.skip=true</span>
<span class="hljs-attr">    depends_on:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">fame-mysql</span>

<span class="hljs-attr">  fame-admin:</span>
<span class="hljs-attr">   container_name:</span> <span class="hljs-string">fame-admin</span>
<span class="hljs-attr">   build:</span> 
<span class="hljs-attr">    context:</span> <span class="hljs-string">./</span>
<span class="hljs-attr">    dockerfile:</span> <span class="hljs-string">./fame-docker/fame-admin/fame-admin-Dockerfile</span>
<span class="hljs-attr">    args:</span>
<span class="hljs-attr">      BASE_URL:</span> <span class="hljs-string">${BASE_URL}</span>
<span class="hljs-attr">   expose:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">&quot;3001&quot;</span>

<span class="hljs-attr">  fame-front:</span>
<span class="hljs-attr">   container_name:</span> <span class="hljs-string">fame-front</span>
<span class="hljs-attr">   build:</span> 
<span class="hljs-attr">    context:</span> <span class="hljs-string">./</span>
<span class="hljs-attr">    dockerfile:</span> <span class="hljs-string">./fame-docker/fame-front-Dockerfile</span>
<span class="hljs-attr">   environment:</span>
<span class="hljs-attr">      BASE_URL:</span> <span class="hljs-string">${BASE_URL}</span>
<span class="hljs-attr">      PROXY_HOST:</span> <span class="hljs-string">${PROXY_HOST}</span>
<span class="hljs-attr">      PROXY_PORT:</span> <span class="hljs-string">${PROXY_PORT}</span>
<span class="hljs-attr">   expose:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">&quot;3000&quot;</span></code></pre><p><code>docker-compose.yml</code>&#x7684;&#x7ED3;&#x6784;&#x548C;&#x521A;&#x624D;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x5927;&#x4F53;&#x7C7B;&#x4F3C;&#xFF0C;&#x4E5F;&#x662F;&#x5206;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x90E8;&#x5206;</p><ol><li>fame-nginx</li><li>fame-mysql</li><li>fame-server</li><li>fame-admin</li><li>fame-front</li></ol><p>&#x8FD9;&#x4E2A;<code>docker-compose.yml</code>&#x4E2D;&#x6709;&#x51E0;&#x4E2A;&#x8981;&#x70B9;</p><ul><li><code>fame-mysql</code>&#x548C;<code>fame-server</code>&#x7684;<code>restart</code>&#x8981;&#x8BBE;&#x7F6E;&#x4E3A;<code>always</code>&#xFF0C;&#x56E0;&#x4E3A;&#x76EE;&#x524D;Docker-compose&#x662F;&#x6CA1;&#x6709;&#x4E00;&#x4E2A;&#x65B9;&#x6848;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x5BB9;&#x5668;&#x542F;&#x52A8;&#x7684;&#x5148;&#x540E;&#x7684;&#x95EE;&#x9898;&#x7684;&#x3002;&#x5373;&#x4F7F;&#x8BBE;&#x7F6E;&#x4E86;<code>depends_on</code>&#xFF0C;&#x90A3;&#x4E5F;&#x53EA;&#x662F;&#x63A7;&#x5236;&#x5BB9;&#x5668;&#x5F00;&#x59CB;&#x542F;&#x52A8;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x4E0D;&#x80FD;&#x63A7;&#x5236;&#x5BB9;&#x5668;&#x542F;&#x52A8;&#x5B8C;&#x6210;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x6240;&#x4EE5;&#x8BA9;<code>fame-mysql</code>&#x548C;<code>fame-server</code>&#x8FD9;&#x4E24;&#x4E2A;&#x5BB9;&#x5668;&#x8BBE;&#x7F6E;<code>restart</code>&#xFF0C;&#x9632;&#x6B62;spring-boot&#x5728;mysql&#x542F;&#x52A8;&#x5B8C;&#x6210;&#x4E4B;&#x524D;&#x542F;&#x52A8;&#x800C;&#x62A5;&#x9519;&#x542F;&#x52A8;&#x5931;&#x8D25;</li><li><code>fame-server</code>&#xFF0C;<code>fame-mysql</code>&#xFF0C;<code>fame-nginx</code>&#x8FD9;&#x4E09;&#x4E2A;&#x5BB9;&#x5668;&#x90FD;&#x8BBE;&#x7F6E;&#x4E86;<code>volumes</code>&#xFF0C;&#x628A;&#x5BB9;&#x5668;&#x91CC;&#x7684;logs&#x65E5;&#x5FD7;&#x6587;&#x4EF6;&#x6302;&#x8F7D;&#x5230;&#x5BBF;&#x4E3B;&#x673A;&#x7684;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x91CC;&#xFF0C;&#x65B9;&#x4FBF;&#x968F;&#x65F6;&#x770B;&#x65E5;&#x5FD7;&#x6587;&#x4EF6;</li><li><code>fame-mysql</code>&#x5BB9;&#x5668;&#x7684;mysql&#x5B58;&#x50A8;&#x6587;&#x4EF6;&#x4E5F;&#x8BBE;&#x7F6E;&#x4E86;<code>volumes</code>&#x6302;&#x8F7D;&#x5728;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x91CC;(<code>./mysql/mysql_data:/var/lib/mysql</code>)&#xFF0C;&#x8FD9;&#x4E2A;&#x5EFA;&#x8BAE;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x7684;&#x60C5;&#x51B5;&#x8BBE;&#x7F6E;&#x5230;&#x5BBF;&#x4E3B;&#x673A;&#x7684;&#x5176;&#x4ED6;&#x76EE;&#x5F55;&#x91CC;&#xFF0C;&#x4E0D;&#x7136;&#x4E0D;&#x5C0F;&#x5FC3;&#x5220;&#x9664;&#x9879;&#x76EE;&#x7684;&#x8BDD;&#x90A3;&#x4E48;&#x5BB9;&#x5668;&#x91CC;&#x7684;&#x6570;&#x636E;&#x5E93;&#x6570;&#x636E;&#x4E5F;&#x90FD;&#x6CA1;&#x4E86;</li></ul><blockquote>&#x51E0;&#x4E2A;&#x955C;&#x50CF;&#x7684;Dockerfile&#x5927;&#x90E8;&#x5206;&#x90FD;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x8FD9;&#x90E8;&#x5206;&#x5C31;&#x4E0D;&#x5168;&#x90E8;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x53BB;&#x6211;&#x9879;&#x76EE;&#x4E2D;&#x4E86;&#x89E3;&#x3002;</blockquote><h3 id="articleHeader3">Docker&#x5316;&#x8FC7;&#x7A0B;&#x7684;&#x56F0;&#x96BE;&#x548C;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;</h3><h4>spring-boot&#x53CC;&#x914D;&#x7F6E;&#x5207;&#x6362;</h4><p>&#x4E3A;&#x4E86;&#x80FD;&#x591F;&#x8BA9;spring-boot&#x80FD;&#x591F;&#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x548C;Docker&#x73AF;&#x5883;&#x4E0B;&#x5FEB;&#x901F;&#x5207;&#x6362;&#xFF0C;&#x9700;&#x8981;&#x5C06;spring-boot&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x4FEE;&#x6539;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x2514;&#x2500;fame-server
        ...                   
        &#x2502;  &#x2514;&#x2500;resources
        &#x2502;      &#x2502;  application-dev.properties
        &#x2502;      &#x2502;  application-docker.properties
        &#x2502;      &#x2502;  application.properties" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&#x2514;&#x2500;fame-server
        ...                   
        &#x2502;  &#x2514;&#x2500;resources
        &#x2502;      &#x2502;  application-dev<span class="hljs-selector-class">.properties</span>
        &#x2502;      &#x2502;  application-docker<span class="hljs-selector-class">.properties</span>
        &#x2502;      &#x2502;  application.properties</code></pre><p>&#x5728;&#x539F;&#x6709;&#x7684;<code>application.properties</code>&#x57FA;&#x7840;&#x4E0A;&#x589E;&#x52A0;<code>application-dev.properties</code>&#x548C;<code>application-docker.properties</code>&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x628A;<code>application.properties</code>&#x91CC;&#x7684;&#x6570;&#x636E;&#x5E93;&#x65E5;&#x5FD7;&#x7B49;&#x4FE1;&#x606F;&#x5206;&#x522B;&#x653E;&#x5230;<code>application-dev.properties</code>&#x548C;<code>application-docker.properties</code>&#x8FD9;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5B9E;&#x73B0;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x548C;Docker&#x73AF;&#x5883;&#x7684;&#x5FEB;&#x901F;&#x5207;&#x6362;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# application.properties&#x6587;&#x4EF6;
#&#x7AEF;&#x53E3;&#x53F7;
server.port=9090
#mybatis
mybatis.type-aliases-package=com.zbw.fame.Model
#mapper
mapper.mappers=com.zbw.fame.util.MyMapper
mapper.not-empty=false
mapper.identity=MYSQL

#mail
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true

#&#x9ED8;&#x8BA4;properties
spring.profiles.active=dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vala"><code class="properties"><span class="hljs-meta"># application.properties&#x6587;&#x4EF6;</span>
<span class="hljs-meta">#&#x7AEF;&#x53E3;&#x53F7;</span>
server.port=<span class="hljs-number">9090</span>
<span class="hljs-meta">#mybatis</span>
mybatis.type-aliases-package=com.zbw.fame.Model
<span class="hljs-meta">#mapper</span>
mapper.mappers=com.zbw.fame.util.MyMapper
mapper.not-empty=<span class="hljs-literal">false</span>
mapper.identity=MYSQL

<span class="hljs-meta">#mail</span>
spring.mail.properties.mail.smtp.auth=<span class="hljs-literal">true</span>
spring.mail.properties.mail.smtp.starttls.enable=<span class="hljs-literal">true</span>
spring.mail.properties.mail.smtp.starttls.required=<span class="hljs-literal">true</span>

<span class="hljs-meta">#&#x9ED8;&#x8BA4;properties</span>
spring.profiles.active=dev</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# application-docker.properties&#x6587;&#x4EF6;
#datasource
spring.datasource.driverClassName=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://fame-mysql:3306/fame?useUnicode=true&amp;characterEncoding=utf-8&amp;useSSL=false
spring.datasource.username=root
spring.datasource.password=root

#log
logging.level.root=INFO
logging.level.org.springframework.web=INFO
logging.file=log/fame.log" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code class="properties"><span class="hljs-comment"># application-docker.properties&#x6587;&#x4EF6;</span>
<span class="hljs-comment">#datasource</span>
spring.datasource.<span class="hljs-attr">driverClassName=com.mysql.jdbc.Driver</span>
spring.datasource.<span class="hljs-attr">url=jdbc:mysql://fame-mysql:3306/fame?useUnicode=true&amp;characterEncoding=utf-8&amp;useSSL=false</span>
spring.datasource.<span class="hljs-attr">username=root</span>
spring.datasource.<span class="hljs-attr">password=root</span>

<span class="hljs-comment">#log</span>
logging.level.<span class="hljs-attr">root=INFO</span>
logging.level.org.springframework.<span class="hljs-attr">web=INFO</span>
logging.<span class="hljs-attr">file=log/fame.log</span></code></pre><p><code>application-dev.properties</code>&#x7684;&#x5185;&#x5BB9;&#x548C;<code>application-docker.properties</code>&#x6587;&#x4EF6;&#x7C7B;&#x4F3C;&#xFF0C;&#x53EA;&#x662F;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x7684;&#x60C5;&#x51B5;&#x4FEE;&#x6539;mysql&#x548C;log&#x914D;&#x7F6E;&#x3002;</p><h4>&#x52A8;&#x6001;&#x914D;&#x7F6E;axios&#x7684;<code>baseUrl</code>&#x5730;&#x5740;</h4><p>&#x5728;<code>fame-admin</code>&#x548C;<code>fame-front</code>&#x4E2D;&#x7528;&#x4E86;<code>axios</code>&#x63D2;&#x4EF6;&#xFF0C;&#x7528;&#x4E8E;&#x53D1;&#x8D77;&#x548C;&#x83B7;&#x53D6;<code>fame-server</code>&#x670D;&#x52A1;&#x5668;&#x7684;&#x8BF7;&#x6C42;&#x3002;&#x5728;<code>axios</code>&#x8981;&#x914D;&#x7F6E;&#x670D;&#x52A1;&#x5668;url&#x5730;&#x5740;<code>baseUrl</code>&#xFF0C;&#x90A3;&#x4E48;&#x901A;&#x5E38;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x548C;Docker&#x73AF;&#x5883;&#x4EE5;&#x53CA;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x7684;url&#x53EF;&#x80FD;&#x90FD;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x6BCF;&#x6B21;&#x90FD;&#x53BB;&#x4FEE;&#x6539;&#x6709;&#x70B9;&#x9EBB;&#x70E6;&#x3002;(&#x867D;&#x7136;&#x53EA;&#x9700;&#x8981;&#x914D;&#x7F6E;&#x4E24;&#x5904;&#xFF0C;&#x4F46;&#x662F;&#x4EE3;&#x7801;&#x6D01;&#x7656;&#x4E0D;&#x5141;&#x8BB8;&#x6211;&#x786C;&#x7F16;&#x7801;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;)&#x3002;</p><ol><li><p>&#x5148;&#x4FEE;&#x6539;<code>fame-admin(Vue)</code>&#x4F7F;&#x5176;&#x517C;&#x5BB9;&#x624B;&#x52A8;&#x90E8;&#x7F72;&#x6A21;&#x5F0F;&#x548C;Docker&#x6A21;&#x5F0F;</p><p><code>fame-admin</code>&#x662F;&#x57FA;&#x4E8E;<code>Vue CLI 3</code>&#x642D;&#x5EFA;&#x7684;&#xFF0C;&#x76F8;&#x5BF9;&#x4E8E;cli 2.0&#x5B98;&#x65B9;&#x628A;webpack&#x7684;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x90FD;&#x5C01;&#x88C5;&#x8D77;&#x6765;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x6CA1;&#x6709;config&#x548C;build&#x6587;&#x4EF6;&#x5939;&#x3002;&#x4E0D;&#x8FC7;&#x5BF9;&#x5E94;&#x7684;&#x5B98;&#x7F51;&#x4E5F;&#x7ED9;&#x4E86;&#x4E00;&#x4E9B;&#x8BBE;&#x7F6E;&#x66F4;&#x52A0;&#x65B9;&#x4FBF;&#x7684;&#x914D;&#x7F6E;&#x53C2;&#x6570;&#x3002;</p><p>&#x5728;<a href="https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#x4E2D;&#x63D0;&#x5230;:</p><blockquote><p>&#x53EA;&#x6709;&#x4EE5; <code>VUE_APP_</code> &#x5F00;&#x5934;&#x7684;&#x53D8;&#x91CF;&#x4F1A;&#x88AB; <code>webpack.DefinePlugin</code> &#x9759;&#x6001;&#x5D4C;&#x5165;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x4FA7;&#x7684;&#x5305;&#x4E2D;&#x3002;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x5E94;&#x7528;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x8FD9;&#x6837;&#x8BBF;&#x95EE;&#x5B83;&#x4EEC;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(process.env.VUE_APP_SECRET)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">console</span>.log(process.env.VUE_APP_SECRET)</code></pre><p>&#x5728;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;<code>process.env.VUE_APP_SECRET</code> &#x5C06;&#x4F1A;&#x88AB;&#x76F8;&#x5E94;&#x7684;&#x503C;&#x6240;&#x53D6;&#x4EE3;&#x3002;&#x5728; <code>VUE_APP_SECRET=secret</code> &#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5B83;&#x4F1A;&#x88AB;&#x66FF;&#x6362;&#x4E3A; <code>&quot;sercet&quot;</code>&#x3002;</p></blockquote><p>&#x5229;&#x7528;&#x8FD9;&#x4E2A;&#x7279;&#x6027;&#x6765;&#x8BBE;&#x7F6E;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x6765;&#x52A8;&#x6001;&#x7684;&#x8BBE;&#x7F6E;Docker&#x6A21;&#x5F0F;&#x548C;&#x624B;&#x52A8;&#x90E8;&#x7F72;&#x6A21;&#x5F0F;&#x7684;<code>baseUrl</code>&#x7684;&#x503C;</p><p>&#x5728;<code>fame-admin</code>&#x76EE;&#x5F55;&#x4E0B;&#x521B;&#x5EFA;&#x6587;&#x4EF6;<code>server-config.js</code>&#xFF0C;&#x7F16;&#x5199;&#x4EE5;&#x4E0B;&#x5185;&#x5BB9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isProd = process.env.NODE_ENV === &apos;production&apos;
const localhost = &apos;http://127.0.0.1:9090/&apos;
const baseUrl = process.env.VUE_APP_API_URL || localhost
const api = isProd ? baseUrl : localhost
export default {
  isProd,
  api
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> isProd = process.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>
<span class="hljs-keyword">const</span> localhost = <span class="hljs-string">&apos;http://127.0.0.1:9090/&apos;</span>
<span class="hljs-keyword">const</span> baseUrl = process.env.VUE_APP_API_URL || localhost
<span class="hljs-keyword">const</span> api = isProd ? baseUrl : localhost
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  isProd,
  api
}</code></pre><p>&#x90A3;&#x4E48;&#x53EA;&#x8981;&#x5728;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x4E2D;&#x6709;<code>VUE_APP_API_URL</code>&#x7684;&#x503C;&#xFF0C;&#x4E14;<code>NODE_ENV === &apos;production&apos;</code>&#xFF0C;baseUrl&#x5C31;&#x7B49;&#x4E8E;<code>VUE_APP_API_URL</code>&#x7684;&#x503C;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x662F;<code>localhost</code>&#x7684;&#x503C;&#x3002;</p><p>&#x63A5;&#x7740;&#x5728;<code>axios</code>&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x5F15;&#x7528;&#x8BE5;&#x6587;&#x4EF6;&#x8BBE;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// fame-admin/src/plugins/http.js
...
import serverConfig from &apos;../../server-config&apos;

const Axios = axios.create({
  baseURL: serverConfig.api + &apos;api/&apos;,
 ...
})
    
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// fame-admin/src/plugins/http.js</span>
...
import serverConfig <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../../server-config&apos;</span>

<span class="hljs-keyword">const</span> Axios = axios.create({
  <span class="hljs-attr">baseURL</span>: serverConfig.api + <span class="hljs-string">&apos;api/&apos;</span>,
 ...
})
    
...</code></pre><p>&#x73B0;&#x5728;&#x53EA;&#x8981;&#x5C06;docker&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;<code>VUE_APP_API_URL</code>&#x7684;&#x503C;&#x5C31;&#x884C;&#x4E86;&#xFF0C;&#x53EA;&#x8981;&#x5728;&#x5BF9;&#x5E94;&#x7684;Dockerfile&#x4E2D;&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x6B65;&#x9AA4;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ENV VUE_APP_API_URL http://xx.xxx.xxx.xxx" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dockerfile hljs"><code class="dockerfile" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">ENV</span> VUE_APP_API_URL http://xx.xxx.xxx.xxx</code></pre></li><li><p>&#x518D;&#x4FEE;&#x6539;<code>fame-front(Nuxt)</code>&#x4F7F;&#x5176;&#x517C;&#x5BB9;&#x624B;&#x52A8;&#x90E8;&#x7F72;&#x6A21;&#x5F0F;&#x548C;Docker&#x6A21;&#x5F0F;</p><p>&#x540C;&#x6837;&#x7684;&#xFF0C;&#x5BF9;&#x4E8E;&#x7528;<code>Nuxt</code>&#x642D;&#x5EFA;<code>fame-front</code>&#x535A;&#x5BA2;&#x524D;&#x53F0;&#x4FEE;&#x6539;&#x4E5F;&#x662F;&#x7C7B;&#x4F3C;&#x7684;&#x601D;&#x8DEF;&#x3002;</p><p>&#x5728;Nuxt&#x7684;<a href="https://zh.nuxtjs.org/api/configuration-env" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#x4E2D;&#x5199;&#x5230;&#xFF1A;</p><blockquote><blockquote>Nuxt.js &#x8BA9;&#x4F60;&#x53EF;&#x4EE5;&#x914D;&#x7F6E;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x548C;&#x670D;&#x52A1;&#x7AEF;&#x5171;&#x4EAB;&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x3002;</blockquote><p>&#x4F8B;&#x5982; (<code>nuxt.config.js</code>)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || &apos;http://localhost:3000&apos;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">env</span>: {
    <span class="hljs-attr">baseUrl</span>: process.env.BASE_URL || <span class="hljs-string">&apos;http://localhost:3000&apos;</span>
  }
}</code></pre><p>&#x4EE5;&#x4E0A;&#x914D;&#x7F6E;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A; <code>baseUrl</code> &#x73AF;&#x5883;&#x53D8;&#x91CF;&#xFF0C;&#x5982;&#x679C;&#x5E94;&#x7528;&#x8BBE;&#x5B9A;&#x4E86; <code>BASE_URL</code> &#x73AF;&#x5883;&#x53D8;&#x91CF;&#xFF0C;&#x90A3;&#x4E48; <code>baseUrl</code> &#x7684;&#x503C;&#x7B49;&#x4E8E; <code>BASE_URL</code> &#x7684;&#x503C;&#xFF0C;&#x5426;&#x5219;&#x5176;&#x503C;&#x4E3A; <code>http://localhost:3000</code>&#x3002;</p></blockquote><p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EA;&#x8981;&#x548C;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x8BF4;&#x7684;&#x4E00;&#x6837;&#xFF0C;&#x5728;<code>nuxt.config.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x589E;&#x52A0;&#x4EE3;&#x7801;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
 env: {
   baseUrl: process.env.BASE_URL || &apos;http://localhost:3000&apos;
 }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
 <span class="hljs-attr">env</span>: {
   <span class="hljs-attr">baseUrl</span>: process.env.BASE_URL || <span class="hljs-string">&apos;http://localhost:3000&apos;</span>
 }
}</code></pre><p>&#x63A5;&#x7740;&#x5728;<code>server-config.js</code>&#x6587;&#x4EF6;&#x548C;<code>axios</code>&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;<code>fame-front/plugins/http.js</code>&#x4EE5;&#x53CA;&#x5BF9;&#x5E94;&#x7684;Dockerfile&#x6587;&#x4EF6;&#x4E2D;&#x7F16;&#x5199;&#x548C;&#x4E0A;&#x9762;<code>fame-admin</code>&#x90E8;&#x5206;&#x4E00;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;</p></li></ol><p><strong>&#x73B0;&#x5728;&#x5DF2;&#x7ECF;&#x628A;<code>baseUrl</code>&#x7684;&#x8BBE;&#x7F6E;&#x4ECE;&#x4EE3;&#x7801;&#x7684;&#x786C;&#x7F16;&#x7801;&#x4E2D;&#x89E3;&#x653E;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x4F46;&#x4E8B;&#x5B9E;&#x4E0A;&#x6211;&#x4EEC;&#x53EA;&#x662F;&#x628A;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x7F16;&#x7801;&#x4ECE;&#x4EE3;&#x7801;&#x4ECE;&#x8F6C;&#x79FB;&#x5230;Dockerfile&#x6587;&#x4EF6;&#x91CC;&#x4E86;&#xFF0C;&#x8981;&#x662F;&#x60F3;&#x8981;&#x4FEE;&#x6539;&#x7684;&#x8BDD;&#x4E5F;&#x8981;&#x53BB;&#x8FD9;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#x67E5;&#x627E;&#x7136;&#x540E;&#x4FEE;&#x6539;&#xFF0C;&#x8FD9;&#x6837;&#x4E5F;&#x4E0D;&#x65B9;&#x4FBF;&#x3002;&#x540E;&#x9762;&#x4F1A;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x628A;&#x6240;&#x6709;&#x73AF;&#x5883;&#x914D;&#x7F6E;&#x7EDF;&#x4E00;&#x8D77;&#x6765;&#x3002;</strong></p><h4>Nuxt&#x5728;Docker&#x4E2D;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#x5230;&#x5BBF;&#x4E3B;&#x673A;ip&#x95EE;&#x9898;</h4><p>&#x5148;&#x8981;&#x8BF4;&#x660E;&#x4E00;&#x70B9;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x535A;&#x5BA2;&#x524D;&#x7AEF;&#x8981;&#x5355;&#x72EC;&#x53BB;&#x4F7F;&#x7528;&#x7684;Nuxt&#x800C;&#x4E0D;&#x662F;&#x548C;&#x535A;&#x5BA2;&#x540E;&#x53F0;&#x4E00;&#x6837;&#x7528;Vue&#x5462;&#xFF0C;&#x56E0;&#x4E3A;&#x535A;&#x5BA2;&#x524D;&#x7AEF;&#x6709;SEO&#x7684;&#x9700;&#x6C42;&#x7684;&#xFF0C;&#x50CF;Vue&#x8FD9;&#x6837;&#x7684;&#x5BF9;&#x641C;&#x7D22;&#x5F15;&#x64CE;&#x5F88;&#x4E0D;&#x53CB;&#x597D;&#x3002;</p><p><strong>&#x6240;&#x4EE5;Nuxt&#x7684;&#x9875;&#x9762;&#x662F;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6E32;&#x67D3;(SSR)&#x7684;</strong></p><h5>&#x8FD9;&#x6837;&#x5C31;&#x4EA7;&#x751F;&#x4E86;&#x95EE;&#x9898;</h5><p><code>fame-front</code>&#x7684;&#x9875;&#x9762;&#x5728;&#x6E32;&#x67D3;&#x4E4B;&#x524D;&#x5FC5;&#x987B;&#x83B7;&#x53D6;&#x5230;<code>fame-server</code>&#x670D;&#x52A1;&#x5668;&#x4E2D;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x4F46;&#x662F;&#x6BCF;&#x4E2A;docker&#x5BB9;&#x5668;&#x90FD;&#x662F;&#x4E92;&#x76F8;&#x72EC;&#x7ACB;&#x7684;&#xFF0C;&#x5176;&#x5185;&#x90E8;&#x60F3;&#x8981;&#x4E92;&#x76F8;&#x8BBF;&#x95EE;&#x53EA;&#x80FD;&#x901A;&#x8FC7;&#x5BB9;&#x5668;&#x540D;&#x8BBF;&#x95EE;&#x3002;&#x4F8B;&#x5982;&#x5BB9;&#x5668;<code>fame-front</code>&#x60F3;&#x8981;&#x8BBF;&#x95EE;&#x5BB9;&#x5668;<code>fame-server</code>&#xFF0C;&#x5C31;&#x8BBE;&#x7F6E;<code>baseURL = fame-server</code>(fame-server&#x662F;&#x670D;&#x52A1;&#x5668;&#x7684;&#x5BB9;&#x5668;&#x7684;container_name)&#x3002;</p><p>&#x8FD9;&#x6837;&#x8BBE;&#x7F6E;&#x4E4B;&#x540E;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;&#x8F93;&#x5165;&#x7F51;&#x5740;:<a href="http://xx.xxx.xxx.xx%E5%8F%AF%E4%BB%A5%E6%88%90%E5%8A%9F%E8%AE%BF%E9%97%AE%E5%88%B0%E9%A1%B5%E9%9D%A2" rel="nofollow noreferrer" target="_blank">http://xx.xxx.xxx.xx&#x53EF;&#x4EE5;&#x6210;&#x529F;...</a>&#xFF0C;&#x4F46;&#x662F;&#x968F;&#x4FBF;&#x70B9;&#x51FB;&#x4E00;&#x4E2A;&#x94FE;&#x63A5;&#xFF0C;&#x5C31;&#x4F1A;&#x770B;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#x63D0;&#x793A;&#x9519;&#x8BEF;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#x5230;&#x5730;&#x5740;<a href="http://fame-server/..." rel="nofollow noreferrer" target="_blank">http://fame-server/...</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vendor.e2feb665ef91f298be86.js:2 GET http://fame-server/api/article/1 net::ERR_CONNECTION_REFUSED" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">vendor.e2feb665ef91f298be86.js:<span class="hljs-number">2</span> GET http:<span class="hljs-comment">//fame-server/api/article/1 net::ERR_CONNECTION_REFUSED</span></code></pre><p>&#x8FD9;&#x662F;&#x5FC5;&#x7136;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x5728;&#x5BB9;&#x5668;&#x91CC;<a href="http://fame-server/%E5%B0%B1%E6%98%AF%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%9A%84%E5%9C%B0%E5%9D%80" rel="nofollow noreferrer" target="_blank">http://fame-server/&#x5C31;&#x662F;&#x670D;&#x52A1;&#x5668;...</a>&#xFF0C;&#x4F46;&#x662F;&#x4F60;&#x672C;&#x5730;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x5F53;&#x7136;&#x662F;&#x4E0D;&#x77E5;&#x9053;<a href="http://fame-server/%E6%98%AF%E4%B8%AA%E4%BB%80%E4%B9%88%E9%AC%BC%E5%9C%B0%E5%9D%80" rel="nofollow noreferrer" target="_blank">http://fame-server/&#x662F;&#x4E2A;&#x4EC0;&#x4E48;&#x9B3C;...</a>&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x6D4F;&#x89C8;&#x5668;&#x5C31;&#x62A5;&#x51FA;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#x7684;&#x9519;&#x8BEF;&#x3002;</p><p>&#x4EC0;&#x4E48;&#xFF1F;&#x53EF;&#x662F;&#x521A;&#x624D;&#x4E0D;&#x662F;&#x8BF4;Nuxt&#x662F;&#x670D;&#x52A1;&#x5668;&#x6E32;&#x67D3;&#x7684;&#x9875;&#x9762;&#x5417;&#xFF0C;&#x600E;&#x4E48;&#x53C8;&#x8BA9;&#x672C;&#x5730;&#x6D4F;&#x89C8;&#x5668;&#x62A5;&#x8FD9;&#x4E2A;&#x9519;&#x8BEF;&#x4E86;&#x3002;</p><p>&#x539F;&#x6765;&#x662F;&#x56E0;&#x4E3A;&#x5F53;&#x901A;&#x8FC7;&#x6D4F;&#x89C8;&#x5668;&#x94FE;&#x63A5;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;Nuxt&#x7684;&#x786E;&#x662F;&#x4ECE;&#x540E;&#x7AEF;&#x6E32;&#x67D3;&#x4E86;&#x9875;&#x9762;&#x518D;&#x4F20;&#x8FC7;&#x6765;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x9875;&#x9762;&#x4E2D;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x7684;&#x65F6;&#x5019;&#x662F;&#x901A;&#x8FC7;Vue-Router&#x8DF3;&#x8F6C;&#x7684;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x4E0D;&#x5728;Nuxt&#x7684;&#x63A7;&#x5236;&#x8303;&#x56F4;&#xFF0C;&#x800C;&#x662F;&#x548C;Vue&#x4E00;&#x6837;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x6E32;&#x67D3;&#x7684;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x5C31;&#x8981;&#x4ECE;&#x6D4F;&#x89C8;&#x5668;&#x91CC;&#x5411;&#x670D;&#x52A1;&#x7AEF;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x6765;&#x6E32;&#x67D3;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5C31;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><h5>&#x5982;&#x4F55;&#x89E3;&#x51B3;&#x5462;</h5><p>&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x5F00;&#x59CB;&#x7684;&#x65F6;&#x5019;&#x4E00;&#x76F4;&#x60F3;&#x8981;&#x5C1D;&#x8BD5;&#x914D;&#x7F6E;Docker&#x5BB9;&#x5668;&#x7684;&#x7F51;&#x7EDC;&#x6A21;&#x5F0F;&#x6765;&#x89E3;&#x51B3;&#xFF0C;&#x53EF;&#x662F;&#x90FD;&#x6CA1;&#x6709;&#x89E3;&#x51B3;&#x3002;&#x76F4;&#x5230;&#x540E;&#x9762;&#x6211;&#x770B;<code>axios</code>&#x6587;&#x6863;&#x7684;&#x65F6;&#x5019;&#x624D;&#x6CE8;&#x610F;&#x5230;<code>axios</code>&#x7684;&#x4EE3;&#x7406;&#x529F;&#x80FD;&#xFF0C;&#x5176;&#x672C;&#x8D28;&#x662F;&#x89E3;&#x51B3;&#x8DE8;&#x57DF;&#x7684;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x53EA;&#x8981;&#x5728;<code>axios</code>&#x8BBE;&#x7F6E;&#x4E86;&#x4EE3;&#x7406;&#xFF0C;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x4F1A;&#x4F7F;&#x7528;&#x4EE3;&#x7406;&#x7684;&#x5730;&#x5740;&#xFF0C;&#x540C;&#x65F6;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x8BBF;&#x95EE;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x7528;<code>baseUrl</code> &#x7684;&#x5730;&#x5740;&#xFF0C;&#x8FD9;&#x4E2A;&#x7279;&#x70B9;&#x5B8C;&#x7F8E;&#x89E3;&#x51B3;&#x6211;&#x7684;&#x95EE;&#x9898;&#x554A;&#x3002;</p><p>&#x5728;<code>server-config.js</code>&#x6587;&#x4EF6;&#x91CC;&#x589E;&#x52A0;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#xFF08;&#x5728;<code>nuxt.config.js</code>&#x91CC;&#x83B7;&#x53D6;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x91CC;&#x7684;<code>proxyHost</code>&#x548C;<code>proxyPort</code>&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
const localProxy = {
  host: &apos;127.0.0.1&apos;,
  port: 9090
}
const baseProxy = {
  host: process.env.proxyHost || localProxy.host,
  port: process.env.proxyPort || localProxy.port
}
exports.baseProxy = isProd ? baseProxy : localProxy
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">...
const localProxy = {
  <span class="hljs-attr">host</span>: <span class="hljs-string">&apos;127.0.0.1&apos;</span>,
  <span class="hljs-attr">port</span>: <span class="hljs-number">9090</span>
}
<span class="hljs-keyword">const</span> baseProxy = {
  <span class="hljs-attr">host</span>: process.env.proxyHost || localProxy.host,
  <span class="hljs-attr">port</span>: process.env.proxyPort || localProxy.port
}
exports.baseProxy = isProd ? baseProxy : localProxy
...</code></pre><p>&#x7136;&#x540E;&#x5728;<code>axios</code>&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x91CC;&#x589E;&#x52A0;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// fame-front/plugins/http.js
const Axios = axios.create({
  proxy: serverConfig.baseProxy
 ...
})
    
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// fame-front/plugins/http.js</span>
<span class="hljs-keyword">const</span> Axios = axios.create({
  <span class="hljs-attr">proxy</span>: serverConfig.baseProxy
 ...
})
    
...</code></pre><p>&#x5C31;&#x53EF;&#x4EE5;&#x5B8C;&#x7F8E;&#x7684;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x4E86;&#x3002;</p><h4>Dockerfile&#x7684;&#x73AF;&#x5883;&#x53C2;&#x6570;&#x7EDF;&#x4E00;&#x8BBE;&#x7F6E;</h4><p>&#x5728;&#x4E0A;&#x6587;&#x89E3;&#x51B3;<code>&#x52A8;&#x6001;&#x914D;&#x7F6E;axios&#x5730;&#x5740;</code>&#x7684;&#x90E8;&#x5206;&#x628A;<code>baseUrl</code>&#x7684;&#x8BBE;&#x7F6E;&#x653E;&#x5728;&#x4E86;Dockerfile&#x4E2D;&#xFF0C;&#x73B0;&#x5728;&#x5C31;&#x518D;&#x628A;Dockerfile&#x4E2D;&#x7684;&#x786C;&#x7F16;&#x7801;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#xFF0C;&#x653E;&#x5230;&#x7EDF;&#x4E00;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x3002;</p><p>&#x9996;&#x5148;&#x5728;<code>docker-compose.yml</code>&#x6587;&#x4EF6;&#x76EE;&#x5F55;&#x4E0B;(&#x5373;&#x9879;&#x76EE;&#x8DDF;&#x76EE;&#x5F55;)&#x521B;&#x5EFA;&#x73AF;&#x5883;&#x6587;&#x4EF6;<code>.env</code>&#x5E76;&#x7F16;&#x5199;&#x4E00;&#x4E0B;&#x5185;&#x5BB9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="BASE_URL=http://xx.xxx.xxx.xxx

PROXY_HOST=fame-nginx
PROXY_PORT=80" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ini"><code><span class="hljs-attr">BASE_URL</span>=http://xx.xxx.xxx.xxx

<span class="hljs-attr">PROXY_HOST</span>=fame-nginx
<span class="hljs-attr">PROXY_PORT</span>=<span class="hljs-number">80</span></code></pre><p>&#x8FD9;&#x4E2A;&#x662F;<code>docker-compose</code>&#x7684;<code>env_file</code>&#x53C2;&#x6570;&#xFF0C;&#x4ECE;&#x6587;&#x4EF6;&#x4E2D;&#x83B7;&#x53D6;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#xFF0C;&#x53EF;&#x4EE5;&#x4E3A;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x6216;&#x5217;&#x8868;&#xFF0C;&#x5982;&#x679C;&#x540C;&#x76EE;&#x5F55;&#x4E0B;&#x6709;<code>.env</code>&#x6587;&#x4EF6;&#x5219;&#x4F1A;&#x9ED8;&#x8BA4;&#x8BFB;&#x53D6;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5728;<code>docker-compose</code>&#x91CC;&#x8BBE;&#x7F6E;&#x8DEF;&#x5F84;&#x3002;</p><p>&#x5DF2;&#x7ECF;&#x5728;<code>.env</code>&#x8BBE;&#x7F6E;&#x4E86;&#x73AF;&#x5883;&#x53D8;&#x91CF;<code>BASE_URL</code>&#x7684;&#x503C;&#xFF0C;&#x5C31;&#x80FD;&#x5728;<code>docker-compose.yml</code>&#x91CC;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x4E86;&#x3002;&#x4FEE;&#x6539;<code>docker-compose.yml</code>&#x7684;<code>fame-front</code>&#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fame-front:
 ...
 environment:
  BASE_URL: ${BASE_URL}
  PROXY_HOST: ${PROXY_HOST}
  PROXY_PORT: ${PROXY_PORT}
  ...
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="yaml hljs"><code class="yaml"><span class="hljs-attr">fame-front:</span>
 <span class="hljs-string">...</span>
<span class="hljs-attr"> environment:</span>
<span class="hljs-attr">  BASE_URL:</span> <span class="hljs-string">${BASE_URL}</span>
<span class="hljs-attr">  PROXY_HOST:</span> <span class="hljs-string">${PROXY_HOST}</span>
<span class="hljs-attr">  PROXY_PORT:</span> <span class="hljs-string">${PROXY_PORT}</span>
  <span class="hljs-string">...</span>
</code></pre><p>&#x8FD9;&#x6837;&#x5728;<code>fame-front</code>&#x7684;&#x5BB9;&#x5668;&#x91CC;&#x5C31;&#x6709;&#x5BF9;&#x5E94;&#x7684;<code>BASE_URL</code>,<code>PROXY_HOST</code>,<code>PROXY_PORT</code>&#x73AF;&#x5883;&#x53D8;&#x91CF;&#xFF0C;Nuxt&#x4E5F;&#x80FD;&#x591F;&#x6210;&#x529F;&#x83B7;&#x53D6;&#x5E76;&#x8BBE;&#x7F6E;&#x3002;</p><p>&#x4E0D;&#x8FC7;&#x5BF9;&#x4E8E;<code>fame-admin</code>&#x5BB9;&#x5668;&#x6765;&#x8BF4;&#x5C31;&#x8981;&#x7A0D;&#x5FAE;&#x590D;&#x6742;&#x4E00;&#x70B9;&#x70B9;&#x4E86;&#x3002;&#x5148;&#x6765;&#x770B;&#x4E00;&#x4E0B;<code>fame-admin</code>&#x5BB9;&#x5668;&#x7684;Dockerfile&#x6587;&#x4EF6;<code>fame-admin-Dockerfile</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# build stage
FROM node:10.10.0-alpine as build-stage

#&#x4E2D;&#x95F4;&#x4E00;&#x4E9B;&#x64CD;&#x4F5C;&#x7701;&#x7565;...

RUN npm run build

# production stage
FROM nginx:1.15.3-alpine as production-stage

COPY ./fame-docker/fame-admin/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [&quot;nginx&quot;, &quot;-g&quot;, &quot;daemon off;&quot;]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dockerfile hljs"><code class="dockerfile"><span class="hljs-comment"># build stage</span>
<span class="hljs-keyword">FROM</span> node:<span class="hljs-number">10.10</span>.<span class="hljs-number">0</span>-alpine as build-stage

<span class="hljs-comment">#&#x4E2D;&#x95F4;&#x4E00;&#x4E9B;&#x64CD;&#x4F5C;&#x7701;&#x7565;...</span>

<span class="hljs-keyword">RUN</span><span class="bash"> npm run build
</span>
<span class="hljs-comment"># production stage</span>
<span class="hljs-keyword">FROM</span> nginx:<span class="hljs-number">1.15</span>.<span class="hljs-number">3</span>-alpine as production-stage

<span class="hljs-keyword">COPY</span><span class="bash"> ./fame-docker/fame-admin/nginx.conf /etc/nginx/conf.d/default.conf
</span><span class="hljs-keyword">COPY</span><span class="bash"> --from=build-stage /app/dist /usr/share/nginx/html
</span><span class="hljs-keyword">EXPOSE</span> <span class="hljs-number">80</span>
<span class="hljs-keyword">CMD</span><span class="bash"> [<span class="hljs-string">&quot;nginx&quot;</span>, <span class="hljs-string">&quot;-g&quot;</span>, <span class="hljs-string">&quot;daemon off;&quot;</span>]</span></code></pre><p>&#x8FD9;&#x91CC;&#x7528;&#x4E86;&#x591A;&#x9636;&#x6BB5;&#x6784;&#x5EFA;&#x5BB9;&#x5668;&#xFF0C;&#x5982;&#x679C;&#x76F4;&#x63A5;&#x901A;&#x8FC7;<code>docker-compose</code>&#x8BBE;&#x7F6E;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x53EA;&#x4F1A;&#x5728;&#x540E;&#x9762;&#x4E00;&#x4E2A;&#x9636;&#x6BB5;&#x751F;&#x6548;&#xFF0C;&#x4F46;&#x662F;<code>npm run build</code>&#x662F;&#x5728;&#x7B2C;&#x4E00;&#x4E2A;&#x9636;&#x6BB5;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x4E0D;&#x80FD;&#x5E94;&#x7528;&#x5230;Vue&#x5F53;&#x4E2D;&#x3002;&#x4E3A;&#x4E86;&#x8BA9;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x5728;&#x7B2C;&#x4E00;&#x9636;&#x6BB5;&#x5C31;&#x5E94;&#x7528;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x5728;&#x6784;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x628A;&#x53D8;&#x91CF;&#x4ECE;<code>docker-compose</code>&#x4F20;&#x5230;<code>fame-admin-Dockerfile</code>&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x5728;Dockerfile&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x9636;&#x6BB5;&#x628A;&#x8FD9;&#x4E2A;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x5E94;&#x7528;&#x5230;&#x5BB9;&#x5668;&#x91CC;&#x3002;&#x4E0B;&#x9762;&#x4FEE;&#x6539;<code>docker-compose.yml</code>&#x7684;<code>fame-admin</code>&#x90E8;&#x5206;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" fame-admin:
   ...
   build: 
    context: ./
    dockerfile: ./fame-docker/fame-admin/fame-admin-Dockerfile
    args:
      BASE_URL: ${BASE_URL} # &#x8FD9;&#x91CC;&#x628A;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x5F53;&#x505A;ARG&#x4F20;&#x7ED9;Dockerfile
   ..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="yaml hljs"><code class="yaml"><span class="hljs-attr"> fame-admin:</span>
   <span class="hljs-string">...</span>
<span class="hljs-attr">   build:</span> 
<span class="hljs-attr">    context:</span> <span class="hljs-string">./</span>
<span class="hljs-attr">    dockerfile:</span> <span class="hljs-string">./fame-docker/fame-admin/fame-admin-Dockerfile</span>
<span class="hljs-attr">    args:</span>
<span class="hljs-attr">      BASE_URL:</span> <span class="hljs-string">${BASE_URL}</span> <span class="hljs-comment"># &#x8FD9;&#x91CC;&#x628A;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x5F53;&#x505A;ARG&#x4F20;&#x7ED9;Dockerfile</span>
   <span class="hljs-string">...</span></code></pre><p>&#x7136;&#x540E;&#x5728;<code>fame-admin-Dockerfile</code>&#x7684;&#x7B2C;&#x4E00;&#x9636;&#x6BB5;&#x589E;&#x52A0;&#x6B65;&#x9AA4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# build stage
FROM node:10.10.0-alpine as build-stage

ARG BASE_URL # &#x5FC5;&#x987B;&#x7533;&#x660E;&#x8FD9;&#x4E2A;ARG&#x624D;&#x80FD;&#x4ECE;docker-compose&#x91CC;&#x83B7;&#x53D6;

ENV VUE_APP_API_URL $BASE_URL

# &#x4EE5;&#x4E0B;&#x7701;&#x7565;...
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dockerfile hljs"><code class="dockerfile"><span class="hljs-comment"># build stage</span>
<span class="hljs-keyword">FROM</span> node:<span class="hljs-number">10.10</span>.<span class="hljs-number">0</span>-alpine as build-stage

ARG BASE_URL <span class="hljs-comment"># &#x5FC5;&#x987B;&#x7533;&#x660E;&#x8FD9;&#x4E2A;ARG&#x624D;&#x80FD;&#x4ECE;docker-compose&#x91CC;&#x83B7;&#x53D6;</span>

<span class="hljs-keyword">ENV</span> VUE_APP_API_URL $BASE_URL

<span class="hljs-comment"># &#x4EE5;&#x4E0B;&#x7701;&#x7565;...</span>
</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x6784;&#x5EFA;&#x9636;&#x6BB5;&#x4E00;&#x955C;&#x50CF;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x628A;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x4F20;&#x5165;&#x5230;&#x9636;&#x6BB5;&#x4E00;&#x7684;&#x955C;&#x50CF;&#x91CC;&#xFF0C;&#x8BA9;Vue&#x91CC;&#x7684;&#x53D8;&#x91CF;&#x751F;&#x6548;&#x4E86;&#x3002;</p><h3 id="articleHeader4">&#x603B;&#x7ED3;</h3><p>&#x73B0;&#x5728;&#x7F51;&#x4E0A;&#x5F88;&#x591A;&#x590D;&#x6742;&#x4E00;&#x70B9;&#x7684;&#x9879;&#x76EE;&#x5373;&#x4F7F;&#x7528;&#x4E86;docker-compose&#x90E8;&#x7F72;&#xFF0C;&#x4E5F;&#x591A;&#x5C11;&#x4F9D;&#x8D56;shell&#x811A;&#x672C;&#x6765;&#x64CD;&#x4F5C;&#xFF0C;&#x6BD4;&#x5982;&#x590D;&#x5236;&#x6587;&#x4EF6;&#x8BBE;&#x7F6E;&#x73AF;&#x5883;&#x7B49;&#xFF0C;&#x6211;&#x89C9;&#x5F97;&#x8FD9;&#x6837;&#x4F1A;&#x964D;&#x4F4E;docker-compose&#x7684;&#x610F;&#x4E49;&#x3002;&#x5982;&#x679C;&#x90FD;&#x4F7F;&#x7528;&#x4E86;shell&#x811A;&#x672C;&#xFF0C;&#x90A3;&#x4E0D;&#x5982;&#x76F4;&#x63A5;&#x4E0D;&#x7528;docker-compose&#x800C;&#x5168;&#x7528;shell&#x6765;&#x6784;&#x5EFA;&#x548C;&#x542F;&#x52A8;&#x955C;&#x50CF;&#x3002;</p><p>&#x6240;&#x4EE5;&#x5728;Docker&#x5316;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x867D;&#x7136;&#x9047;&#x5230;&#x4E00;&#x4E9B;&#x574E;&#x5777;&#xFF0C;&#x4F46;&#x575A;&#x6301;&#x5B9E;&#x73B0;&#x4E86;&#x53EA;&#x7528;docker-compose&#x90E8;&#x7F72;&#xFF0C;&#x4EE5;&#x540E;&#x4E0A;&#x7EBF;&#x548C;&#x4E0B;&#x7EBF;&#x5C31;&#x53CA;&#x5176;&#x65B9;&#x4FBF;&#x4E86;&#x3002;&#x4E5F;&#x5E0C;&#x671B;&#x6211;&#x7684;Docker&#x5316;&#x601D;&#x8DEF;&#x53EF;&#x4EE5;&#x7ED9;&#x5176;&#x4ED6;&#x9879;&#x76EE;&#x505A;&#x4E00;&#x4E9B;&#x53C2;&#x8003;&#x3002;</p><p>&#x5BF9;&#x6BD4;&#x4EE5;&#x524D;&#x6050;&#x6016;&#x7684;&#x6B65;&#x9AA4;&#xFF0C;&#x73B0;&#x5728;Fame&#x535A;&#x5BA2;&#x7684;&#x4E0A;&#x7EBF;&#x548C;&#x4E0B;&#x7EBF;&#x53EA;&#x9700;&#x8981;&#x4E24;&#x884C;&#x547D;&#x4EE4;&#xFF0C;&#x771F;&#x7684;&#x5341;&#x5206;&#x7684;&#x4FBF;&#x6377;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="docker-compose up
docker-compose down" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs x86asm"><code>docker-compose <span class="hljs-meta">up</span>
docker-compose <span class="hljs-meta">down</span></code></pre><hr><p>&#x6E90;&#x7801;&#x5730;&#x5740;:<a href="https://github.com/zzzzbw/Fame" rel="nofollow noreferrer" target="_blank">doodle</a></p><p>&#x539F;&#x6587;&#x5730;&#x5740;:<a href="http://zzzzbw.cn/article/17" rel="nofollow noreferrer" target="_blank">&#x4F7F;&#x7528;Docker&#x90E8;&#x7F72;Spring-Boot+Vue&#x535A;&#x5BA2;&#x7CFB;&#x7EDF;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Docker部署Spring-Boot+Vue博客系统

## 原文链接
[https://segmentfault.com/a/1190000016557755](https://segmentfault.com/a/1190000016557755)

