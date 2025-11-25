---
title: 前后端分离项目 — SpringSocial 绑定与解绑社交账号如微信、QQ
hidden: true
categories: [reprint]
slug: bc6556da
date: 2018-11-06 15:28:31
---

{{< raw >}}
<h1 id="articleHeader0">1&#x3001;&#x51C6;&#x5907;&#x5DE5;&#x4F5C;</h1><p>&#x7533;&#x8BF7;QQ&#x3001;&#x5FAE;&#x4FE1;&#x76F8;&#x5173;AppId&#x548C;AppSecret&#xFF0C;&#x8FD9;&#x4E9B;&#x5927;&#x5BB6;&#x81EA;&#x5DF1;&#x5230;<a href="https://connect.qq.com/index.html" rel="nofollow noreferrer" target="_blank">QQ&#x4E92;&#x8054;</a>&#x548C;<a href="https://open.weixin.qq.com/cgi-bin/index" rel="nofollow noreferrer" target="_blank">&#x5FAE;&#x4FE1;&#x5F00;&#x53D1;&#x5E73;&#x53F0;</a> &#x53BB;&#x7533;&#x8BF7;&#x5427;<br>&#x8FD8;&#x6709;java&#x540E;&#x53F0;&#x8981;&#x5F15;&#x5165;&#x76F8;&#x5173;&#x7684;jar&#x5305;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;dependencies&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.security.oauth.boot&lt;/groupId&gt;
         &lt;artifactId&gt;spring-security-oauth2-autoconfigure&lt;/artifactId&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.security.oauth&lt;/groupId&gt;
         &lt;artifactId&gt;spring-security-oauth2&lt;/artifactId&gt;
         &lt;version&gt;2.3.3.RELEASE&lt;/version&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
         &lt;artifactId&gt;spring-boot-starter-security&lt;/artifactId&gt;
     &lt;/dependency&gt;
     &lt;!--&lt;dependency&gt;--&gt;
         &lt;!--&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;--&gt;
         &lt;!--&lt;artifactId&gt;spring-cloud-starter-security&lt;/artifactId&gt;--&gt;
     &lt;!--&lt;/dependency&gt;--&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
         &lt;artifactId&gt;spring-cloud-starter-security&lt;/artifactId&gt;
     &lt;/dependency&gt;

     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
         &lt;artifactId&gt;spring-cloud-starter-oauth2&lt;/artifactId&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
         &lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
         &lt;artifactId&gt;spring-boot-starter-jdbc&lt;/artifactId&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;mysql&lt;/groupId&gt;
         &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.social&lt;/groupId&gt;
         &lt;artifactId&gt;spring-social-config&lt;/artifactId&gt;
         &lt;version&gt;1.1.6.RELEASE&lt;/version&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.social&lt;/groupId&gt;
         &lt;artifactId&gt;spring-social-core&lt;/artifactId&gt;
         &lt;version&gt;1.1.6.RELEASE&lt;/version&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.social&lt;/groupId&gt;
         &lt;artifactId&gt;spring-social-security&lt;/artifactId&gt;
         &lt;version&gt;1.1.6.RELEASE&lt;/version&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.social&lt;/groupId&gt;
         &lt;artifactId&gt;spring-social-web&lt;/artifactId&gt;
         &lt;version&gt;1.1.6.RELEASE&lt;/version&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;io.jsonwebtoken&lt;/groupId&gt;
         &lt;artifactId&gt;jjwt&lt;/artifactId&gt;
         &lt;version&gt;0.9.1&lt;/version&gt;
     &lt;/dependency&gt;

     &lt;dependency&gt;
         &lt;groupId&gt;org.apache.commons&lt;/groupId&gt;
         &lt;artifactId&gt;commons-lang3&lt;/artifactId&gt;
         &lt;version&gt;3.7&lt;/version&gt;
     &lt;/dependency&gt;

     &lt;dependency&gt;
         &lt;groupId&gt;org.apache.commons&lt;/groupId&gt;
         &lt;artifactId&gt;commons-collections4&lt;/artifactId&gt;
         &lt;version&gt;4.2&lt;/version&gt;
     &lt;/dependency&gt;

     &lt;dependency&gt;
         &lt;groupId&gt;commons-beanutils&lt;/groupId&gt;
         &lt;artifactId&gt;commons-beanutils&lt;/artifactId&gt;
         &lt;version&gt;1.9.3&lt;/version&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
         &lt;artifactId&gt;spring-boot-configuration-processor&lt;/artifactId&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.data&lt;/groupId&gt;
         &lt;artifactId&gt;spring-data-mongodb&lt;/artifactId&gt;
         &lt;version&gt;2.0.9.RELEASE&lt;/version&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
         &lt;artifactId&gt;spring-boot-starter-data-mongodb&lt;/artifactId&gt;
         &lt;version&gt;2.0.4.RELEASE&lt;/version&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;com.fasterxml.jackson.core&lt;/groupId&gt;
         &lt;artifactId&gt;jackson-core&lt;/artifactId&gt;
         &lt;version&gt;2.9.6&lt;/version&gt;
     &lt;/dependency&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">dependencies</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.security.oauth.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-security-oauth2-autoconfigure<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.security.oauth<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-security-oauth2<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.3.3.RELEASE<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-security<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-comment">&lt;!--&lt;dependency&gt;--&gt;</span>
         <span class="hljs-comment">&lt;!--&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;--&gt;</span>
         <span class="hljs-comment">&lt;!--&lt;artifactId&gt;spring-cloud-starter-security&lt;/artifactId&gt;--&gt;</span>
     <span class="hljs-comment">&lt;!--&lt;/dependency&gt;--&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.cloud<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-cloud-starter-security<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>

     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.cloud<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-cloud-starter-oauth2<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-data-redis<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-jdbc<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>mysql<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>mysql-connector-java<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.social<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-social-config<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.1.6.RELEASE<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.social<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-social-core<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.1.6.RELEASE<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.social<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-social-security<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.1.6.RELEASE<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.social<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-social-web<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.1.6.RELEASE<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>io.jsonwebtoken<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>jjwt<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>0.9.1<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>

     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.apache.commons<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>commons-lang3<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>3.7<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>

     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.apache.commons<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>commons-collections4<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>4.2<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>

     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>commons-beanutils<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>commons-beanutils<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.9.3<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-configuration-processor<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.data<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-data-mongodb<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.0.9.RELEASE<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-data-mongodb<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.0.4.RELEASE<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>com.fasterxml.jackson.core<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>jackson-core<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.9.6<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span></code></pre><p>&#x7136;&#x540E;&#x5728;application.properties&#x91CC;&#x9762;&#x8BBE;&#x7F6E;&#x76F8;&#x5173;&#x914D;&#x7F6E;&#xFF0C;&#x5982;redis&#x3001;mysql&#x7B49;&#x8BBE;&#x7F6E;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" spring.datasource.url=
 spring.datasource.username=
 spring.datasource.password=
 spring.datasource.driverClassName=com.mysql.jdbc.Driver
 
 spring.redis.host=127.0.0.1
 spring.redis.password=your_pwd
 spring.redis.port=6379
 spring.redis.timeout=30000
 
 ssb.security.social.register-url=/social/signUp
 ssb.security.social.filter-processes-url=/social-login
 ssb.security.social.bind-url=https://website/social-bind/qq
 ssb.security.social.callback-url=https://website/social-login
 ssb.security.social.connect-url=https://website/social-connect

 //QQ&#x6388;&#x6743;
 ssb.security.social.qq.app-id=
 ssb.security.social.qq.app-secret=
 ssb.security.social.qq.provider-id=qq
 
 //WeChat&#x6388;&#x6743;
 ssb.security.social.wechat.app-id=
 ssb.security.social.wechat.app-secret=
 ssb.security.social.wechat.provider-id=wechat" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code> spring<span class="hljs-selector-class">.datasource</span><span class="hljs-selector-class">.url</span>=
 spring<span class="hljs-selector-class">.datasource</span><span class="hljs-selector-class">.username</span>=
 spring<span class="hljs-selector-class">.datasource</span><span class="hljs-selector-class">.password</span>=
 spring<span class="hljs-selector-class">.datasource</span><span class="hljs-selector-class">.driverClassName</span>=com<span class="hljs-selector-class">.mysql</span><span class="hljs-selector-class">.jdbc</span><span class="hljs-selector-class">.Driver</span>
 
 spring<span class="hljs-selector-class">.redis</span><span class="hljs-selector-class">.host</span>=<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>
 spring<span class="hljs-selector-class">.redis</span><span class="hljs-selector-class">.password</span>=your_pwd
 spring<span class="hljs-selector-class">.redis</span><span class="hljs-selector-class">.port</span>=<span class="hljs-number">6379</span>
 spring<span class="hljs-selector-class">.redis</span><span class="hljs-selector-class">.timeout</span>=<span class="hljs-number">30000</span>
 
 ssb<span class="hljs-selector-class">.security</span><span class="hljs-selector-class">.social</span><span class="hljs-selector-class">.register-url</span>=/social/signUp
 ssb<span class="hljs-selector-class">.security</span><span class="hljs-selector-class">.social</span><span class="hljs-selector-class">.filter-processes-url</span>=/social-login
 ssb<span class="hljs-selector-class">.security</span><span class="hljs-selector-class">.social</span><span class="hljs-selector-class">.bind-url</span>=https:<span class="hljs-comment">//website/social-bind/qq</span>
 ssb<span class="hljs-selector-class">.security</span><span class="hljs-selector-class">.social</span><span class="hljs-selector-class">.callback-url</span>=https:<span class="hljs-comment">//website/social-login</span>
 ssb<span class="hljs-selector-class">.security</span><span class="hljs-selector-class">.social</span><span class="hljs-selector-class">.connect-url</span>=https:<span class="hljs-comment">//website/social-connect</span>

 <span class="hljs-comment">//QQ&#x6388;&#x6743;</span>
 ssb<span class="hljs-selector-class">.security</span><span class="hljs-selector-class">.social</span><span class="hljs-selector-class">.qq</span><span class="hljs-selector-class">.app-id</span>=
 ssb<span class="hljs-selector-class">.security</span><span class="hljs-selector-class">.social</span><span class="hljs-selector-class">.qq</span><span class="hljs-selector-class">.app-secret</span>=
 ssb<span class="hljs-selector-class">.security</span><span class="hljs-selector-class">.social</span><span class="hljs-selector-class">.qq</span><span class="hljs-selector-class">.provider-id</span>=qq
 
 <span class="hljs-comment">//WeChat&#x6388;&#x6743;</span>
 ssb<span class="hljs-selector-class">.security</span><span class="hljs-selector-class">.social</span><span class="hljs-selector-class">.wechat</span><span class="hljs-selector-class">.app-id</span>=
 ssb<span class="hljs-selector-class">.security</span><span class="hljs-selector-class">.social</span><span class="hljs-selector-class">.wechat</span><span class="hljs-selector-class">.app-secret</span>=
 ssb<span class="hljs-selector-class">.security</span><span class="hljs-selector-class">.social</span><span class="hljs-selector-class">.wechat</span><span class="hljs-selector-class">.provider-id</span>=wechat</code></pre><h1 id="articleHeader1">2&#x3001;&#x5206;&#x6790;&#x793E;&#x4EA4;&#x7ED1;&#x5B9A;ConnectController&#x7C7B;</h1><p>&#x51C6;&#x5907;&#x5DE5;&#x4F5C;&#x505A;&#x597D;&#x4E4B;&#x540E;&#xFF0C;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5F00;&#x59CB;&#x5206;&#x6790;&#x793E;&#x4EA4;&#x7ED1;&#x5B9A;&#xFF0C;&#x5176;&#x5B9E;spring-social&#x6846;&#x67B6;&#x91CC;&#x5DF2;&#x7ECF;&#x81EA;&#x5E26;&#x4E86;spring-social-web&#xFF0C;&#x8FD9;&#x4E2A;jar&#x5305;&#x91CC;&#x9762;&#x6709;&#x4E2A;ConnectController.java&#x7C7B;&#xFF0C;&#x8FD9;&#x4E2A;&#x7C7B;&#x5DF2;&#x7ECF;&#x5E2E;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E86;&#x76F8;&#x5173;&#x7ED1;&#x5B9A;&#x4E0E;&#x89E3;&#x7ED1;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#xFF0C;&#x95EE;&#x9898;&#x5728;&#x4E8E;&#x5B83;&#x662F;&#x57FA;&#x4E8E;Session&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x662F;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x9879;&#x76EE;&#x4F7F;&#x7528;Session&#x5F53;&#x7136;&#x5E94;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8981;&#x7ED3;&#x5408;Redis&#x6765;&#x4F7F;&#x7528;&#xFF0C;&#x628A;&#x76F8;&#x5173;&#x53D8;&#x91CF;&#x90FD;&#x5B58;&#x5728;Redis&#x4E2D;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x4E0A;&#x9762;&#x5DF2;&#x7ECF;&#x914D;&#x7F6E;&#x597D;&#x4E86;Redis&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x6765;&#x770B;&#x770B;Redis&#x914D;&#x7F6E;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate(ClientHttpRequestFactory factory){
        return new RestTemplate(factory);
    }

    @Bean
    public ClientHttpRequestFactory simpleClientHttpRequestFactory(){
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setReadTimeout(50000);//&#x5355;&#x4F4D;&#x4E3A;ms
        factory.setConnectTimeout(50000);//&#x5355;&#x4F4D;&#x4E3A;ms
        return factory;
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-meta">@Configuration</span>
public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">RestTemplateConfig</span> </span>{

    <span class="hljs-meta">@Bean</span>
    public RestTemplate restTemplate(ClientHttpRequestFactory <span class="hljs-keyword">factory</span>){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> RestTemplate(<span class="hljs-keyword">factory</span>);
    }

    <span class="hljs-meta">@Bean</span>
    public ClientHttpRequestFactory simpleClientHttpRequestFactory(){
        SimpleClientHttpRequestFactory <span class="hljs-keyword">factory</span> = <span class="hljs-keyword">new</span> SimpleClientHttpRequestFactory();
        <span class="hljs-keyword">factory</span>.setReadTimeout(<span class="hljs-number">50000</span>);<span class="hljs-comment">//&#x5355;&#x4F4D;&#x4E3A;ms</span>
        <span class="hljs-keyword">factory</span>.setConnectTimeout(<span class="hljs-number">50000</span>);<span class="hljs-comment">//&#x5355;&#x4F4D;&#x4E3A;ms</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">factory</span>;
    }
}
</code></pre><h1 id="articleHeader2">3&#x3001;&#x83B7;&#x53D6;&#x7CFB;&#x7EDF;&#x5F53;&#x524D;&#x7528;&#x6237;&#x6240;&#x6709;&#x793E;&#x4EA4;&#x8D26;&#x53F7;&#x7ED1;&#x5B9A;&#x60C5;&#x51B5;</h1><p>&#x8BBE;&#x7F6E;&#x597D;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x5206;&#x6790;&#x4E00;&#x4E0B;spring-social-web&#x8FD9;&#x4E2A;jar&#x5305;&#x83B7;&#x53D6;&#x793E;&#x4EA4;&#x8D26;&#x53F7;&#x7ED1;&#x5B9A;&#x60C5;&#x51B5;&#xFF0C;&#x5B83;&#x7684;&#x8BF7;&#x6C42;&#x5730;&#x5740;&#x662F;/connect&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Controller
@RequestMapping({&quot;/connect&quot;})
public class ConnectController implements InitializingBean {
    private static final Log logger = LogFactory.getLog(ConnectController.class);
    private final ConnectionFactoryLocator connectionFactoryLocator;
    private final ConnectionRepository connectionRepository;
    private final MultiValueMap&lt;Class&lt;?&gt;, ConnectInterceptor&lt;?&gt;&gt; connectInterceptors = new LinkedMultiValueMap();
    private final MultiValueMap&lt;Class&lt;?&gt;, DisconnectInterceptor&lt;?&gt;&gt; disconnectInterceptors = new LinkedMultiValueMap();
    private ConnectSupport connectSupport;
    private final UrlPathHelper urlPathHelper = new UrlPathHelper();
    private String viewPath = &quot;connect/&quot;;
    private SessionStrategy sessionStrategy = new HttpSessionSessionStrategy();
    private String applicationUrl = null;
    protected static final String DUPLICATE_CONNECTION_ATTRIBUTE = &quot;social_addConnection_duplicate&quot;;
    protected static final String PROVIDER_ERROR_ATTRIBUTE = &quot;social_provider_error&quot;;
    protected static final String AUTHORIZATION_ERROR_ATTRIBUTE = &quot;social_authorization_error&quot;;

    @Inject
    public ConnectController(ConnectionFactoryLocator connectionFactoryLocator, ConnectionRepository connectionRepository) {
        this.connectionFactoryLocator = connectionFactoryLocator;
        this.connectionRepository = connectionRepository;
    }

    /** @deprecated */
    @Deprecated
    public void setInterceptors(List&lt;ConnectInterceptor&lt;?&gt;&gt; interceptors) {
        this.setConnectInterceptors(interceptors);
    }

    public void setConnectInterceptors(List&lt;ConnectInterceptor&lt;?&gt;&gt; interceptors) {
        Iterator var2 = interceptors.iterator();

        while(var2.hasNext()) {
            ConnectInterceptor&lt;?&gt; interceptor = (ConnectInterceptor)var2.next();
            this.addInterceptor(interceptor);
        }

    }

    public void setDisconnectInterceptors(List&lt;DisconnectInterceptor&lt;?&gt;&gt; interceptors) {
        Iterator var2 = interceptors.iterator();

        while(var2.hasNext()) {
            DisconnectInterceptor&lt;?&gt; interceptor = (DisconnectInterceptor)var2.next();
            this.addDisconnectInterceptor(interceptor);
        }

    }

    public void setApplicationUrl(String applicationUrl) {
        this.applicationUrl = applicationUrl;
    }

    public void setViewPath(String viewPath) {
        this.viewPath = viewPath;
    }

    public void setSessionStrategy(SessionStrategy sessionStrategy) {
        this.sessionStrategy = sessionStrategy;
    }

    public void addInterceptor(ConnectInterceptor&lt;?&gt; interceptor) {
        Class&lt;?&gt; serviceApiType = GenericTypeResolver.resolveTypeArgument(interceptor.getClass(), ConnectInterceptor.class);
        this.connectInterceptors.add(serviceApiType, interceptor);
    }

    public void addDisconnectInterceptor(DisconnectInterceptor&lt;?&gt; interceptor) {
        Class&lt;?&gt; serviceApiType = GenericTypeResolver.resolveTypeArgument(interceptor.getClass(), DisconnectInterceptor.class);
        this.disconnectInterceptors.add(serviceApiType, interceptor);
    }

    @RequestMapping(
        method = {RequestMethod.GET}
    )
    public String connectionStatus(NativeWebRequest request, Model model) {
        this.setNoCache(request);
        this.processFlash(request, model);
        Map&lt;String, List&lt;Connection&lt;?&gt;&gt;&gt; connections = this.connectionRepository.findAllConnections();
        model.addAttribute(&quot;providerIds&quot;, this.connectionFactoryLocator.registeredProviderIds());
        model.addAttribute(&quot;connectionMap&quot;, connections);
        return this.connectView();
    }

    @RequestMapping(
        value = {&quot;/{providerId}&quot;},
        method = {RequestMethod.GET}
    )
    public String connectionStatus(@PathVariable String providerId, NativeWebRequest request, Model model) {
        this.setNoCache(request);
        this.processFlash(request, model);
        List&lt;Connection&lt;?&gt;&gt; connections = this.connectionRepository.findConnections(providerId);
        this.setNoCache(request);
        if(connections.isEmpty()) {
            return this.connectView(providerId);
        } else {
            model.addAttribute(&quot;connections&quot;, connections);
            return this.connectedView(providerId);
        }
    }

    @RequestMapping(
        value = {&quot;/{providerId}&quot;},
        method = {RequestMethod.POST}
    )
    public RedirectView connect(@PathVariable String providerId, NativeWebRequest request) {
        ConnectionFactory&lt;?&gt; connectionFactory = this.connectionFactoryLocator.getConnectionFactory(providerId);
        MultiValueMap&lt;String, String&gt; parameters = new LinkedMultiValueMap();
        this.preConnect(connectionFactory, parameters, request);

        try {
            return new RedirectView(this.connectSupport.buildOAuthUrl(connectionFactory, request, parameters));
        } catch (Exception var6) {
            this.sessionStrategy.setAttribute(request, &quot;social_provider_error&quot;, var6);
            return this.connectionStatusRedirect(providerId, request);
        }
    }

    @RequestMapping(
        value = {&quot;/{providerId}&quot;},
        method = {RequestMethod.GET},
        params = {&quot;oauth_token&quot;}
    )
    public RedirectView oauth1Callback(@PathVariable String providerId, NativeWebRequest request) {
        try {
            OAuth1ConnectionFactory&lt;?&gt; connectionFactory = (OAuth1ConnectionFactory)this.connectionFactoryLocator.getConnectionFactory(providerId);
            Connection&lt;?&gt; connection = this.connectSupport.completeConnection(connectionFactory, request);
            this.addConnection(connection, connectionFactory, request);
        } catch (Exception var5) {
            this.sessionStrategy.setAttribute(request, &quot;social_provider_error&quot;, var5);
            logger.warn(&quot;Exception while handling OAuth1 callback (&quot; + var5.getMessage() + &quot;). Redirecting to &quot; + providerId + &quot; connection status page.&quot;);
        }

        return this.connectionStatusRedirect(providerId, request);
    }

    @RequestMapping(
        value = {&quot;/{providerId}&quot;},
        method = {RequestMethod.GET},
        params = {&quot;code&quot;}
    )
    public RedirectView oauth2Callback(@PathVariable String providerId, NativeWebRequest request) {
        try {
            OAuth2ConnectionFactory&lt;?&gt; connectionFactory = (OAuth2ConnectionFactory)this.connectionFactoryLocator.getConnectionFactory(providerId);
            Connection&lt;?&gt; connection = this.connectSupport.completeConnection(connectionFactory, request);
            this.addConnection(connection, connectionFactory, request);
        } catch (Exception var5) {
            this.sessionStrategy.setAttribute(request, &quot;social_provider_error&quot;, var5);
            logger.warn(&quot;Exception while handling OAuth2 callback (&quot; + var5.getMessage() + &quot;). Redirecting to &quot; + providerId + &quot; connection status page.&quot;);
        }

        return this.connectionStatusRedirect(providerId, request);
    }

    @RequestMapping(
        value = {&quot;/{providerId}&quot;},
        method = {RequestMethod.GET},
        params = {&quot;error&quot;}
    )
    public RedirectView oauth2ErrorCallback(@PathVariable String providerId, @RequestParam(&quot;error&quot;) String error, @RequestParam(value = &quot;error_description&quot;,required = false) String errorDescription, @RequestParam(value = &quot;error_uri&quot;,required = false) String errorUri, NativeWebRequest request) {
        Map&lt;String, String&gt; errorMap = new HashMap();
        errorMap.put(&quot;error&quot;, error);
        if(errorDescription != null) {
            errorMap.put(&quot;errorDescription&quot;, errorDescription);
        }

        if(errorUri != null) {
            errorMap.put(&quot;errorUri&quot;, errorUri);
        }

        this.sessionStrategy.setAttribute(request, &quot;social_authorization_error&quot;, errorMap);
        return this.connectionStatusRedirect(providerId, request);
    }

    @RequestMapping(
        value = {&quot;/{providerId}&quot;},
        method = {RequestMethod.DELETE}
    )
    public RedirectView removeConnections(@PathVariable String providerId, NativeWebRequest request) {
        ConnectionFactory&lt;?&gt; connectionFactory = this.connectionFactoryLocator.getConnectionFactory(providerId);
        this.preDisconnect(connectionFactory, request);
        this.connectionRepository.removeConnections(providerId);
        this.postDisconnect(connectionFactory, request);
        return this.connectionStatusRedirect(providerId, request);
    }

    @RequestMapping(
        value = {&quot;/{providerId}/{providerUserId}&quot;},
        method = {RequestMethod.DELETE}
    )
    public RedirectView removeConnection(@PathVariable String providerId, @PathVariable String providerUserId, NativeWebRequest request) {
        ConnectionFactory&lt;?&gt; connectionFactory = this.connectionFactoryLocator.getConnectionFactory(providerId);
        this.preDisconnect(connectionFactory, request);
        this.connectionRepository.removeConnection(new ConnectionKey(providerId, providerUserId));
        this.postDisconnect(connectionFactory, request);
        return this.connectionStatusRedirect(providerId, request);
    }

    protected String connectView() {
        return this.getViewPath() + &quot;status&quot;;
    }

    protected String connectView(String providerId) {
        return this.getViewPath() + providerId + &quot;Connect&quot;;
    }

    protected String connectedView(String providerId) {
        return this.getViewPath() + providerId + &quot;Connected&quot;;
    }

    protected RedirectView connectionStatusRedirect(String providerId, NativeWebRequest request) {
        HttpServletRequest servletRequest = (HttpServletRequest)request.getNativeRequest(HttpServletRequest.class);
        String path = &quot;/connect/&quot; + providerId + this.getPathExtension(servletRequest);
        if(this.prependServletPath(servletRequest)) {
            path = servletRequest.getServletPath() + path;
        }

        return new RedirectView(path, true);
    }

    public void afterPropertiesSet() throws Exception {
        this.connectSupport = new ConnectSupport(this.sessionStrategy);
        if(this.applicationUrl != null) {
            this.connectSupport.setApplicationUrl(this.applicationUrl);
        }

    }

    private boolean prependServletPath(HttpServletRequest request) {
        return !this.urlPathHelper.getPathWithinServletMapping(request).equals(&quot;&quot;);
    }

    private String getPathExtension(HttpServletRequest request) {
        String fileName = this.extractFullFilenameFromUrlPath(request.getRequestURI());
        String extension = StringUtils.getFilenameExtension(fileName);
        return extension != null?&quot;.&quot; + extension:&quot;&quot;;
    }

    private String extractFullFilenameFromUrlPath(String urlPath) {
        int end = urlPath.indexOf(63);
        if(end == -1) {
            end = urlPath.indexOf(35);
            if(end == -1) {
                end = urlPath.length();
            }
        }

        int begin = urlPath.lastIndexOf(47, end) + 1;
        int paramIndex = urlPath.indexOf(59, begin);
        end = paramIndex != -1 &amp;&amp; paramIndex &lt; end?paramIndex:end;
        return urlPath.substring(begin, end);
    }

    private String getViewPath() {
        return this.viewPath;
    }

    private void addConnection(Connection&lt;?&gt; connection, ConnectionFactory&lt;?&gt; connectionFactory, WebRequest request) {
        try {
            this.connectionRepository.addConnection(connection);
            this.postConnect(connectionFactory, connection, request);
        } catch (DuplicateConnectionException var5) {
            this.sessionStrategy.setAttribute(request, &quot;social_addConnection_duplicate&quot;, var5);
        }

    }

    private void preConnect(ConnectionFactory&lt;?&gt; connectionFactory, MultiValueMap&lt;String, String&gt; parameters, WebRequest request) {
        Iterator var4 = this.interceptingConnectionsTo(connectionFactory).iterator();

        while(var4.hasNext()) {
            ConnectInterceptor interceptor = (ConnectInterceptor)var4.next();
            interceptor.preConnect(connectionFactory, parameters, request);
        }

    }

    private void postConnect(ConnectionFactory&lt;?&gt; connectionFactory, Connection&lt;?&gt; connection, WebRequest request) {
        Iterator var4 = this.interceptingConnectionsTo(connectionFactory).iterator();

        while(var4.hasNext()) {
            ConnectInterceptor interceptor = (ConnectInterceptor)var4.next();
            interceptor.postConnect(connection, request);
        }

    }

    private void preDisconnect(ConnectionFactory&lt;?&gt; connectionFactory, WebRequest request) {
        Iterator var3 = this.interceptingDisconnectionsTo(connectionFactory).iterator();

        while(var3.hasNext()) {
            DisconnectInterceptor interceptor = (DisconnectInterceptor)var3.next();
            interceptor.preDisconnect(connectionFactory, request);
        }

    }

    private void postDisconnect(ConnectionFactory&lt;?&gt; connectionFactory, WebRequest request) {
        Iterator var3 = this.interceptingDisconnectionsTo(connectionFactory).iterator();

        while(var3.hasNext()) {
            DisconnectInterceptor interceptor = (DisconnectInterceptor)var3.next();
            interceptor.postDisconnect(connectionFactory, request);
        }

    }

    private List&lt;ConnectInterceptor&lt;?&gt;&gt; interceptingConnectionsTo(ConnectionFactory&lt;?&gt; connectionFactory) {
        Class&lt;?&gt; serviceType = GenericTypeResolver.resolveTypeArgument(connectionFactory.getClass(), ConnectionFactory.class);
        List&lt;ConnectInterceptor&lt;?&gt;&gt; typedInterceptors = (List)this.connectInterceptors.get(serviceType);
        if(typedInterceptors == null) {
            typedInterceptors = Collections.emptyList();
        }

        return typedInterceptors;
    }

    private List&lt;DisconnectInterceptor&lt;?&gt;&gt; interceptingDisconnectionsTo(ConnectionFactory&lt;?&gt; connectionFactory) {
        Class&lt;?&gt; serviceType = GenericTypeResolver.resolveTypeArgument(connectionFactory.getClass(), ConnectionFactory.class);
        List&lt;DisconnectInterceptor&lt;?&gt;&gt; typedInterceptors = (List)this.disconnectInterceptors.get(serviceType);
        if(typedInterceptors == null) {
            typedInterceptors = Collections.emptyList();
        }

        return typedInterceptors;
    }

    private void processFlash(WebRequest request, Model model) {
        this.convertSessionAttributeToModelAttribute(&quot;social_addConnection_duplicate&quot;, request, model);
        this.convertSessionAttributeToModelAttribute(&quot;social_provider_error&quot;, request, model);
        model.addAttribute(&quot;social_authorization_error&quot;, this.sessionStrategy.getAttribute(request, &quot;social_authorization_error&quot;));
        this.sessionStrategy.removeAttribute(request, &quot;social_authorization_error&quot;);
    }

    private void convertSessionAttributeToModelAttribute(String attributeName, WebRequest request, Model model) {
        if(this.sessionStrategy.getAttribute(request, attributeName) != null) {
            model.addAttribute(attributeName, Boolean.TRUE);
            this.sessionStrategy.removeAttribute(request, attributeName);
        }

    }

    private void setNoCache(NativeWebRequest request) {
        HttpServletResponse response = (HttpServletResponse)request.getNativeResponse(HttpServletResponse.class);
        if(response != null) {
            response.setHeader(&quot;Pragma&quot;, &quot;no-cache&quot;);
            response.setDateHeader(&quot;Expires&quot;, 1L);
            response.setHeader(&quot;Cache-Control&quot;, &quot;no-cache&quot;);
            response.addHeader(&quot;Cache-Control&quot;, &quot;no-store&quot;);
        }

    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre><code>@Controller
@RequestMapping({&quot;/connect&quot;})
public class ConnectController implements InitializingBean {
    private static final Log logger = LogFactory.getLog(ConnectController.class);
    private final ConnectionFactoryLocator connectionFactoryLocator;
    private final ConnectionRepository connectionRepository;
    private final MultiValueMap&lt;Class&lt;?&gt;, ConnectInterceptor&lt;?&gt;&gt; connectInterceptors = new LinkedMultiValueMap();
    private final MultiValueMap&lt;Class&lt;?&gt;, DisconnectInterceptor&lt;?&gt;&gt; disconnectInterceptors = new LinkedMultiValueMap();
    private ConnectSupport connectSupport;
    private final UrlPathHelper urlPathHelper = new UrlPathHelper();
    private String viewPath = &quot;connect/&quot;;
    private SessionStrategy sessionStrategy = new HttpSessionSessionStrategy();
    private String applicationUrl = null;
    protected static final String DUPLICATE_CONNECTION_ATTRIBUTE = &quot;social_addConnection_duplicate&quot;;
    protected static final String PROVIDER_ERROR_ATTRIBUTE = &quot;social_provider_error&quot;;
    protected static final String AUTHORIZATION_ERROR_ATTRIBUTE = &quot;social_authorization_error&quot;;

    @Inject
    public ConnectController(ConnectionFactoryLocator connectionFactoryLocator, ConnectionRepository connectionRepository) {
        this.connectionFactoryLocator = connectionFactoryLocator;
        this.connectionRepository = connectionRepository;
    }

    /** @deprecated */
    @Deprecated
    public void setInterceptors(List&lt;ConnectInterceptor&lt;?&gt;&gt; interceptors) {
        this.setConnectInterceptors(interceptors);
    }

    public void setConnectInterceptors(List&lt;ConnectInterceptor&lt;?&gt;&gt; interceptors) {
        Iterator var2 = interceptors.iterator();

        while(var2.hasNext()) {
            ConnectInterceptor&lt;?&gt; interceptor = (ConnectInterceptor)var2.next();
            this.addInterceptor(interceptor);
        }

    }

    public void setDisconnectInterceptors(List&lt;DisconnectInterceptor&lt;?&gt;&gt; interceptors) {
        Iterator var2 = interceptors.iterator();

        while(var2.hasNext()) {
            DisconnectInterceptor&lt;?&gt; interceptor = (DisconnectInterceptor)var2.next();
            this.addDisconnectInterceptor(interceptor);
        }

    }

    public void setApplicationUrl(String applicationUrl) {
        this.applicationUrl = applicationUrl;
    }

    public void setViewPath(String viewPath) {
        this.viewPath = viewPath;
    }

    public void setSessionStrategy(SessionStrategy sessionStrategy) {
        this.sessionStrategy = sessionStrategy;
    }

    public void addInterceptor(ConnectInterceptor&lt;?&gt; interceptor) {
        Class&lt;?&gt; serviceApiType = GenericTypeResolver.resolveTypeArgument(interceptor.getClass(), ConnectInterceptor.class);
        this.connectInterceptors.add(serviceApiType, interceptor);
    }

    public void addDisconnectInterceptor(DisconnectInterceptor&lt;?&gt; interceptor) {
        Class&lt;?&gt; serviceApiType = GenericTypeResolver.resolveTypeArgument(interceptor.getClass(), DisconnectInterceptor.class);
        this.disconnectInterceptors.add(serviceApiType, interceptor);
    }

    @RequestMapping(
        method = {RequestMethod.GET}
    )
    public String connectionStatus(NativeWebRequest request, Model model) {
        this.setNoCache(request);
        this.processFlash(request, model);
        Map&lt;String, List&lt;Connection&lt;?&gt;&gt;&gt; connections = this.connectionRepository.findAllConnections();
        model.addAttribute(&quot;providerIds&quot;, this.connectionFactoryLocator.registeredProviderIds());
        model.addAttribute(&quot;connectionMap&quot;, connections);
        return this.connectView();
    }

    @RequestMapping(
        value = {&quot;/{providerId}&quot;},
        method = {RequestMethod.GET}
    )
    public String connectionStatus(@PathVariable String providerId, NativeWebRequest request, Model model) {
        this.setNoCache(request);
        this.processFlash(request, model);
        List&lt;Connection&lt;?&gt;&gt; connections = this.connectionRepository.findConnections(providerId);
        this.setNoCache(request);
        if(connections.isEmpty()) {
            return this.connectView(providerId);
        } else {
            model.addAttribute(&quot;connections&quot;, connections);
            return this.connectedView(providerId);
        }
    }

    @RequestMapping(
        value = {&quot;/{providerId}&quot;},
        method = {RequestMethod.POST}
    )
    public RedirectView connect(@PathVariable String providerId, NativeWebRequest request) {
        ConnectionFactory&lt;?&gt; connectionFactory = this.connectionFactoryLocator.getConnectionFactory(providerId);
        MultiValueMap&lt;String, String&gt; parameters = new LinkedMultiValueMap();
        this.preConnect(connectionFactory, parameters, request);

        try {
            return new RedirectView(this.connectSupport.buildOAuthUrl(connectionFactory, request, parameters));
        } catch (Exception var6) {
            this.sessionStrategy.setAttribute(request, &quot;social_provider_error&quot;, var6);
            return this.connectionStatusRedirect(providerId, request);
        }
    }

    @RequestMapping(
        value = {&quot;/{providerId}&quot;},
        method = {RequestMethod.GET},
        params = {&quot;oauth_token&quot;}
    )
    public RedirectView oauth1Callback(@PathVariable String providerId, NativeWebRequest request) {
        try {
            OAuth1ConnectionFactory&lt;?&gt; connectionFactory = (OAuth1ConnectionFactory)this.connectionFactoryLocator.getConnectionFactory(providerId);
            Connection&lt;?&gt; connection = this.connectSupport.completeConnection(connectionFactory, request);
            this.addConnection(connection, connectionFactory, request);
        } catch (Exception var5) {
            this.sessionStrategy.setAttribute(request, &quot;social_provider_error&quot;, var5);
            logger.warn(&quot;Exception while handling OAuth1 callback (&quot; + var5.getMessage() + &quot;). Redirecting to &quot; + providerId + &quot; connection status page.&quot;);
        }

        return this.connectionStatusRedirect(providerId, request);
    }

    @RequestMapping(
        value = {&quot;/{providerId}&quot;},
        method = {RequestMethod.GET},
        params = {&quot;code&quot;}
    )
    public RedirectView oauth2Callback(@PathVariable String providerId, NativeWebRequest request) {
        try {
            OAuth2ConnectionFactory&lt;?&gt; connectionFactory = (OAuth2ConnectionFactory)this.connectionFactoryLocator.getConnectionFactory(providerId);
            Connection&lt;?&gt; connection = this.connectSupport.completeConnection(connectionFactory, request);
            this.addConnection(connection, connectionFactory, request);
        } catch (Exception var5) {
            this.sessionStrategy.setAttribute(request, &quot;social_provider_error&quot;, var5);
            logger.warn(&quot;Exception while handling OAuth2 callback (&quot; + var5.getMessage() + &quot;). Redirecting to &quot; + providerId + &quot; connection status page.&quot;);
        }

        return this.connectionStatusRedirect(providerId, request);
    }

    @RequestMapping(
        value = {&quot;/{providerId}&quot;},
        method = {RequestMethod.GET},
        params = {&quot;error&quot;}
    )
    public RedirectView oauth2ErrorCallback(@PathVariable String providerId, @RequestParam(&quot;error&quot;) String error, @RequestParam(value = &quot;error_description&quot;,required = false) String errorDescription, @RequestParam(value = &quot;error_uri&quot;,required = false) String errorUri, NativeWebRequest request) {
        Map&lt;String, String&gt; errorMap = new HashMap();
        errorMap.put(&quot;error&quot;, error);
        if(errorDescription != null) {
            errorMap.put(&quot;errorDescription&quot;, errorDescription);
        }

        if(errorUri != null) {
            errorMap.put(&quot;errorUri&quot;, errorUri);
        }

        this.sessionStrategy.setAttribute(request, &quot;social_authorization_error&quot;, errorMap);
        return this.connectionStatusRedirect(providerId, request);
    }

    @RequestMapping(
        value = {&quot;/{providerId}&quot;},
        method = {RequestMethod.DELETE}
    )
    public RedirectView removeConnections(@PathVariable String providerId, NativeWebRequest request) {
        ConnectionFactory&lt;?&gt; connectionFactory = this.connectionFactoryLocator.getConnectionFactory(providerId);
        this.preDisconnect(connectionFactory, request);
        this.connectionRepository.removeConnections(providerId);
        this.postDisconnect(connectionFactory, request);
        return this.connectionStatusRedirect(providerId, request);
    }

    @RequestMapping(
        value = {&quot;/{providerId}/{providerUserId}&quot;},
        method = {RequestMethod.DELETE}
    )
    public RedirectView removeConnection(@PathVariable String providerId, @PathVariable String providerUserId, NativeWebRequest request) {
        ConnectionFactory&lt;?&gt; connectionFactory = this.connectionFactoryLocator.getConnectionFactory(providerId);
        this.preDisconnect(connectionFactory, request);
        this.connectionRepository.removeConnection(new ConnectionKey(providerId, providerUserId));
        this.postDisconnect(connectionFactory, request);
        return this.connectionStatusRedirect(providerId, request);
    }

    protected String connectView() {
        return this.getViewPath() + &quot;status&quot;;
    }

    protected String connectView(String providerId) {
        return this.getViewPath() + providerId + &quot;Connect&quot;;
    }

    protected String connectedView(String providerId) {
        return this.getViewPath() + providerId + &quot;Connected&quot;;
    }

    protected RedirectView connectionStatusRedirect(String providerId, NativeWebRequest request) {
        HttpServletRequest servletRequest = (HttpServletRequest)request.getNativeRequest(HttpServletRequest.class);
        String path = &quot;/connect/&quot; + providerId + this.getPathExtension(servletRequest);
        if(this.prependServletPath(servletRequest)) {
            path = servletRequest.getServletPath() + path;
        }

        return new RedirectView(path, true);
    }

    public void afterPropertiesSet() throws Exception {
        this.connectSupport = new ConnectSupport(this.sessionStrategy);
        if(this.applicationUrl != null) {
            this.connectSupport.setApplicationUrl(this.applicationUrl);
        }

    }

    private boolean prependServletPath(HttpServletRequest request) {
        return !this.urlPathHelper.getPathWithinServletMapping(request).equals(&quot;&quot;);
    }

    private String getPathExtension(HttpServletRequest request) {
        String fileName = this.extractFullFilenameFromUrlPath(request.getRequestURI());
        String extension = StringUtils.getFilenameExtension(fileName);
        return extension != null?&quot;.&quot; + extension:&quot;&quot;;
    }

    private String extractFullFilenameFromUrlPath(String urlPath) {
        int end = urlPath.indexOf(63);
        if(end == -1) {
            end = urlPath.indexOf(35);
            if(end == -1) {
                end = urlPath.length();
            }
        }

        int begin = urlPath.lastIndexOf(47, end) + 1;
        int paramIndex = urlPath.indexOf(59, begin);
        end = paramIndex != -1 &amp;&amp; paramIndex &lt; end?paramIndex:end;
        return urlPath.substring(begin, end);
    }

    private String getViewPath() {
        return this.viewPath;
    }

    private void addConnection(Connection&lt;?&gt; connection, ConnectionFactory&lt;?&gt; connectionFactory, WebRequest request) {
        try {
            this.connectionRepository.addConnection(connection);
            this.postConnect(connectionFactory, connection, request);
        } catch (DuplicateConnectionException var5) {
            this.sessionStrategy.setAttribute(request, &quot;social_addConnection_duplicate&quot;, var5);
        }

    }

    private void preConnect(ConnectionFactory&lt;?&gt; connectionFactory, MultiValueMap&lt;String, String&gt; parameters, WebRequest request) {
        Iterator var4 = this.interceptingConnectionsTo(connectionFactory).iterator();

        while(var4.hasNext()) {
            ConnectInterceptor interceptor = (ConnectInterceptor)var4.next();
            interceptor.preConnect(connectionFactory, parameters, request);
        }

    }

    private void postConnect(ConnectionFactory&lt;?&gt; connectionFactory, Connection&lt;?&gt; connection, WebRequest request) {
        Iterator var4 = this.interceptingConnectionsTo(connectionFactory).iterator();

        while(var4.hasNext()) {
            ConnectInterceptor interceptor = (ConnectInterceptor)var4.next();
            interceptor.postConnect(connection, request);
        }

    }

    private void preDisconnect(ConnectionFactory&lt;?&gt; connectionFactory, WebRequest request) {
        Iterator var3 = this.interceptingDisconnectionsTo(connectionFactory).iterator();

        while(var3.hasNext()) {
            DisconnectInterceptor interceptor = (DisconnectInterceptor)var3.next();
            interceptor.preDisconnect(connectionFactory, request);
        }

    }

    private void postDisconnect(ConnectionFactory&lt;?&gt; connectionFactory, WebRequest request) {
        Iterator var3 = this.interceptingDisconnectionsTo(connectionFactory).iterator();

        while(var3.hasNext()) {
            DisconnectInterceptor interceptor = (DisconnectInterceptor)var3.next();
            interceptor.postDisconnect(connectionFactory, request);
        }

    }

    private List&lt;ConnectInterceptor&lt;?&gt;&gt; interceptingConnectionsTo(ConnectionFactory&lt;?&gt; connectionFactory) {
        Class&lt;?&gt; serviceType = GenericTypeResolver.resolveTypeArgument(connectionFactory.getClass(), ConnectionFactory.class);
        List&lt;ConnectInterceptor&lt;?&gt;&gt; typedInterceptors = (List)this.connectInterceptors.get(serviceType);
        if(typedInterceptors == null) {
            typedInterceptors = Collections.emptyList();
        }

        return typedInterceptors;
    }

    private List&lt;DisconnectInterceptor&lt;?&gt;&gt; interceptingDisconnectionsTo(ConnectionFactory&lt;?&gt; connectionFactory) {
        Class&lt;?&gt; serviceType = GenericTypeResolver.resolveTypeArgument(connectionFactory.getClass(), ConnectionFactory.class);
        List&lt;DisconnectInterceptor&lt;?&gt;&gt; typedInterceptors = (List)this.disconnectInterceptors.get(serviceType);
        if(typedInterceptors == null) {
            typedInterceptors = Collections.emptyList();
        }

        return typedInterceptors;
    }

    private void processFlash(WebRequest request, Model model) {
        this.convertSessionAttributeToModelAttribute(&quot;social_addConnection_duplicate&quot;, request, model);
        this.convertSessionAttributeToModelAttribute(&quot;social_provider_error&quot;, request, model);
        model.addAttribute(&quot;social_authorization_error&quot;, this.sessionStrategy.getAttribute(request, &quot;social_authorization_error&quot;));
        this.sessionStrategy.removeAttribute(request, &quot;social_authorization_error&quot;);
    }

    private void convertSessionAttributeToModelAttribute(String attributeName, WebRequest request, Model model) {
        if(this.sessionStrategy.getAttribute(request, attributeName) != null) {
            model.addAttribute(attributeName, Boolean.TRUE);
            this.sessionStrategy.removeAttribute(request, attributeName);
        }

    }

    private void setNoCache(NativeWebRequest request) {
        HttpServletResponse response = (HttpServletResponse)request.getNativeResponse(HttpServletResponse.class);
        if(response != null) {
            response.setHeader(&quot;Pragma&quot;, &quot;no-cache&quot;);
            response.setDateHeader(&quot;Expires&quot;, 1L);
            response.setHeader(&quot;Cache-Control&quot;, &quot;no-cache&quot;);
            response.addHeader(&quot;Cache-Control&quot;, &quot;no-store&quot;);
        }

    }
}</code></pre><p>&#x4E0A;&#x9762;&#x5C31;&#x662F;ConnectController&#x7684;&#x6E90;&#x7801;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x5206;&#x6790;&#x4E00;&#x4E0B;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x7528;&#x6237;&#x793E;&#x4EA4;&#x7ED1;&#x5B9A;&#x60C5;&#x51B5;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      @RequestMapping(
      method = {RequestMethod.GET}
  )
  public String connectionStatus(NativeWebRequest request, Model model) {
      this.setNoCache(request);
      this.processFlash(request, model);
      Map&lt;String, List&lt;Connection&lt;?&gt;&gt;&gt; connections = this.connectionRepository.findAllConnections();
      model.addAttribute(&quot;providerIds&quot;, this.connectionFactoryLocator.registeredProviderIds());
      model.addAttribute(&quot;connectionMap&quot;, connections);
      return this.connectView();
  }

  @RequestMapping(
      value = {&quot;/{providerId}&quot;},
      method = {RequestMethod.GET}
  )
  public String connectionStatus(@PathVariable String providerId, NativeWebRequest request, Model model) {
      this.setNoCache(request);
      this.processFlash(request, model);
      List&lt;Connection&lt;?&gt;&gt; connections = this.connectionRepository.findConnections(providerId);
      this.setNoCache(request);
      if(connections.isEmpty()) {
          return this.connectView(providerId);
      } else {
          model.addAttribute(&quot;connections&quot;, connections);
          return this.connectedView(providerId);
      }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>      <span class="hljs-meta">@RequestMapping(
      method = {RequestMethod.GET}
  )</span>
  <span class="hljs-keyword">public</span> String connectionStatus(NativeWebRequest request, Model model) {
      <span class="hljs-keyword">this</span>.setNoCache(request);
      <span class="hljs-keyword">this</span>.processFlash(request, model);
      Map&lt;String, List&lt;Connection&lt;?&gt;&gt;&gt; connections = <span class="hljs-keyword">this</span>.connectionRepository.findAllConnections();
      model.addAttribute(<span class="hljs-string">&quot;providerIds&quot;</span>, <span class="hljs-keyword">this</span>.connectionFactoryLocator.registeredProviderIds());
      model.addAttribute(<span class="hljs-string">&quot;connectionMap&quot;</span>, connections);
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.connectView();
  }

  <span class="hljs-meta">@RequestMapping(
      value = {<span class="hljs-meta-string">&quot;/{providerId}&quot;</span>},
      method = {RequestMethod.GET}
  )</span>
  <span class="hljs-keyword">public</span> String connectionStatus(<span class="hljs-meta">@PathVariable</span> String providerId, NativeWebRequest request, Model model) {
      <span class="hljs-keyword">this</span>.setNoCache(request);
      <span class="hljs-keyword">this</span>.processFlash(request, model);
      List&lt;Connection&lt;?&gt;&gt; connections = <span class="hljs-keyword">this</span>.connectionRepository.findConnections(providerId);
      <span class="hljs-keyword">this</span>.setNoCache(request);
      <span class="hljs-keyword">if</span>(connections.isEmpty()) {
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.connectView(providerId);
      } <span class="hljs-keyword">else</span> {
          model.addAttribute(<span class="hljs-string">&quot;connections&quot;</span>, connections);
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.connectedView(providerId);
      }
  }</code></pre><p>&#x5BF9;&#x4E86;&#xFF0C;&#x5C31;&#x662F;&#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x524D;&#x9762;&#x7B2C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x8BF7;&#x6C42;&#x7684;&#x5730;&#x5740;&#x662F;&#xFF1A;/connect(&#x9700;&#x8981;&#x7528;&#x6237;&#x767B;&#x5F55;) &#x8FD9;&#x4E2A;&#x5730;&#x5740;&#x662F;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x7528;&#x6237;&#x6240;&#x6709;&#x793E;&#x4EA4;&#x8D26;&#x53F7;&#x7ED1;&#x5B9A;&#x60C5;&#x51B5;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x65B9;&#x6CD5;&#x8BF7;&#x6C42;&#x7684;&#x5730;&#x5740;&#x662F;&#xFF1A;/connect/{providerId}(&#x9700;&#x8981;&#x7528;&#x6237;&#x767B;&#x5F55;) &#x8FD9;&#x4E2A;&#x5730;&#x5740;&#x662F;&#x83B7;&#x53D6;&#x67D0;&#x4E2A;&#x793E;&#x4EA4;&#x8D26;&#x53F7;&#x7ED1;&#x5B9A;&#x60C5;&#x51B5;&#xFF0C;&#x5982;/connect/qq&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8981;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x7528;&#x6237;&#x7ED1;&#x5B9A;&#x7684;&#x6240;&#x6709;&#x793E;&#x4EA4;&#x8D26;&#x53F7;&#x7ED1;&#x5B9A;&#x60C5;&#x51B5;&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x662F;&#x73B0;&#x5728;&#x6709;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x83B7;&#x53D6;&#x5B8C;&#x4E4B;&#x540E; &#x5B83;&#x662F;&#x76F4;&#x63A5;&#x8DF3;&#x8F6C;&#x9875;&#x9762;&#x5230;/connect/status&#xFF0C;&#x5F53;&#x7136;&#x8FD9;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x4FEE;&#x6539;&#x8FD9;&#x4E2A;&#x7C7B;&#xFF0C;&#x6BD4;&#x5982;&#x5730;&#x5740;&#x6362;&#x6210;/socialConnect&#xFF0C;&#x8FD9;&#x4E2A;&#x6362;&#x6210;&#x81EA;&#x5DF1;&#x7684;&#x5C31;&#x597D;&#xFF0C;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x6765;&#x6539;&#x4E0B;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" @RequestMapping(
         method = {RequestMethod.GET}
 )
 public ResponseEntity&lt;?&gt; connectionStatus(NativeWebRequest request, Model model) throws JsonProcessingException {
     this.setNoCache(request);
     this.processFlash(request, model);
     Map&lt;String, List&lt;Connection&lt;?&gt;&gt;&gt; connections = this.connectionRepository.findAllConnections();
     model.addAttribute(&quot;providerIds&quot;, this.connectionFactoryLocator.registeredProviderIds());
     model.addAttribute(&quot;connectionMap&quot;, connections);
     Map&lt;String,Boolean&gt; result = new HashMap&lt;String, Boolean&gt;();
     for (String key : connections.keySet()){
         result.put(key, org.apache.commons.collections.CollectionUtils.isNotEmpty(connections.get(key)));
     }
     return ResponseEntity.ok(objectMapper.writeValueAsString(result));
 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code> @RequestMapping(
         method = {RequestMethod.GET}
 )
 <span class="hljs-keyword">public</span> ResponseEntity&lt;?&gt; connectionStatus(NativeWebRequest request, Model model) <span class="hljs-keyword">throws</span> JsonProcessingException {
     <span class="hljs-keyword">this</span>.setNoCache(request);
     <span class="hljs-keyword">this</span>.processFlash(request, model);
     Map&lt;<span class="hljs-keyword">String</span>, List&lt;Connection&lt;?&gt;&gt;&gt; connections = <span class="hljs-keyword">this</span>.connectionRepository.findAllConnections();
     model.addAttribute(<span class="hljs-string">&quot;providerIds&quot;</span>, <span class="hljs-keyword">this</span>.connectionFactoryLocator.registeredProviderIds());
     model.addAttribute(<span class="hljs-string">&quot;connectionMap&quot;</span>, connections);
     Map&lt;<span class="hljs-keyword">String</span>,Boolean&gt; result = <span class="hljs-keyword">new</span> <span class="hljs-keyword">HashMap</span>&lt;<span class="hljs-keyword">String</span>, Boolean&gt;();
     <span class="hljs-keyword">for</span> (<span class="hljs-keyword">String</span> <span class="hljs-built_in">key</span> : connections.keySet()){
         result.put(<span class="hljs-built_in">key</span>, org.apache.commons.collections.CollectionUtils.isNotEmpty(connections.<span class="hljs-built_in">get</span>(<span class="hljs-built_in">key</span>)));
     }
     <span class="hljs-keyword">return</span> ResponseEntity.ok(objectMapper.writeValueAsString(result));
 }</code></pre><p>&#x6539;&#x597D;&#x7684;&#x4EE3;&#x7801;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;Json&#x6570;&#x636E;&#x7ED9;&#x524D;&#x7AEF;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x8DF3;&#x8F6C;&#x9875;&#x9762;&#xFF0C;&#x5B8C;&#x7F8E;&#x89E3;&#x51B3;&#x4E86;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x9879;&#x76EE;&#x95EE;&#x9898;&#xFF0C;&#x597D;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;postman&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x6D4B;&#x8BD5;&#x770B;&#x770B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhzv5?w=2260&amp;h=846" src="https://static.alili.tech/img/bVbhzv5?w=2260&amp;h=846" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5982;&#x56FE;&#x6240;&#x793A;&#xFF0C;&#x6211;&#x4EEC;&#x6210;&#x529F;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x767B;&#x5F55;&#x7528;&#x6237;&#x6240;&#x6709;&#x793E;&#x4EA4;&#x8D26;&#x53F7;&#x7ED1;&#x5B9A;&#x60C5;&#x51B5;&#x4E86;(&#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x91CC;&#x53EA;&#x6709;qq&#x548C;&#x5FAE;&#x4FE1;&#xFF1F;&#x793E;&#x4EA4;&#x8D26;&#x53F7;&#x7684;&#x7C7B;&#x578B;&#x662F;&#x4F60;application.proterties&#x91CC;&#x9762;&#x914D;&#x7F6E;&#x7684;)&#x3002;</p><h1 id="articleHeader3">4&#x3001;&#x7ED1;&#x5B9A;&#x793E;&#x4EA4;&#x8D26;&#x53F7;</h1><p>&#x597D;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x7ED1;&#x5B9A;&#x793E;&#x4EA4;&#x8D26;&#x53F7;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  @RequestMapping(
      value = {&quot;/{providerId}&quot;},
      method = {RequestMethod.POST}
  )
  public RedirectView connect(@PathVariable String providerId, NativeWebRequest request) {
      ConnectionFactory&lt;?&gt; connectionFactory = this.connectionFactoryLocator.getConnectionFactory(providerId);
      MultiValueMap&lt;String, String&gt; parameters = new LinkedMultiValueMap();
      this.preConnect(connectionFactory, parameters, request);

      try {
          return new RedirectView(this.connectSupport.buildOAuthUrl(connectionFactory, request, parameters));
      } catch (Exception var6) {
          this.sessionStrategy.setAttribute(request, &quot;social_provider_error&quot;, var6);
          return this.connectionStatusRedirect(providerId, request);
      }
  }
  
  @RequestMapping(
      value = {&quot;/{providerId}&quot;},
      method = {RequestMethod.GET},
      params = {&quot;code&quot;}
  )
  public RedirectView oauth2Callback(@PathVariable String providerId, NativeWebRequest request) {
      try {
          OAuth2ConnectionFactory&lt;?&gt; connectionFactory = (OAuth2ConnectionFactory)this.connectionFactoryLocator.getConnectionFactory(providerId);
          Connection&lt;?&gt; connection = this.connectSupport.completeConnection(connectionFactory, request);
          this.addConnection(connection, connectionFactory, request);
      } catch (Exception var5) {
          this.sessionStrategy.setAttribute(request, &quot;social_provider_error&quot;, var5);
          logger.warn(&quot;Exception while handling OAuth2 callback (&quot; + var5.getMessage() + &quot;). Redirecting to &quot; + providerId + &quot; connection status page.&quot;);
      }

      return this.connectionStatusRedirect(providerId, request);
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>  <span class="hljs-meta">@RequestMapping(
      value = {<span class="hljs-meta-string">&quot;/{providerId}&quot;</span>},
      method = {RequestMethod.POST}
  )</span>
  <span class="hljs-keyword">public</span> RedirectView connect(<span class="hljs-meta">@PathVariable</span> String providerId, NativeWebRequest request) {
      ConnectionFactory&lt;?&gt; connectionFactory = <span class="hljs-keyword">this</span>.connectionFactoryLocator.getConnectionFactory(providerId);
      MultiValueMap&lt;String, String&gt; parameters = new LinkedMultiValueMap();
      <span class="hljs-keyword">this</span>.preConnect(connectionFactory, parameters, request);

      <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">return</span> new RedirectView(<span class="hljs-keyword">this</span>.connectSupport.buildOAuthUrl(connectionFactory, request, parameters));
      } <span class="hljs-keyword">catch</span> (Exception var6) {
          <span class="hljs-keyword">this</span>.sessionStrategy.setAttribute(request, <span class="hljs-string">&quot;social_provider_error&quot;</span>, var6);
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.connectionStatusRedirect(providerId, request);
      }
  }
  
  <span class="hljs-meta">@RequestMapping(
      value = {<span class="hljs-meta-string">&quot;/{providerId}&quot;</span>},
      method = {RequestMethod.GET},
      params = {<span class="hljs-meta-string">&quot;code&quot;</span>}
  )</span>
  <span class="hljs-keyword">public</span> RedirectView oauth2Callback(<span class="hljs-meta">@PathVariable</span> String providerId, NativeWebRequest request) {
      <span class="hljs-keyword">try</span> {
          OAuth2ConnectionFactory&lt;?&gt; connectionFactory = (OAuth2ConnectionFactory)<span class="hljs-keyword">this</span>.connectionFactoryLocator.getConnectionFactory(providerId);
          Connection&lt;?&gt; connection = <span class="hljs-keyword">this</span>.connectSupport.completeConnection(connectionFactory, request);
          <span class="hljs-keyword">this</span>.addConnection(connection, connectionFactory, request);
      } <span class="hljs-keyword">catch</span> (Exception var5) {
          <span class="hljs-keyword">this</span>.sessionStrategy.setAttribute(request, <span class="hljs-string">&quot;social_provider_error&quot;</span>, var5);
          logger.warn(<span class="hljs-string">&quot;Exception while handling OAuth2 callback (&quot;</span> + var5.getMessage() + <span class="hljs-string">&quot;). Redirecting to &quot;</span> + providerId + <span class="hljs-string">&quot; connection status page.&quot;</span>);
      }

      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.connectionStatusRedirect(providerId, request);
  }</code></pre><p>&#x73B0;&#x5728;&#x6765;&#x5206;&#x6790; &#x4E0B;&#x8FD9;&#x4E24;&#x4E2A; &#x65B9;&#x6CD5;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x8BF7;&#x6C42;&#x7684;&#x5730;&#x5740;&#x662F;&#xFF1A;POST /connect/{providerId}(&#x9700;&#x8981;&#x767B;&#x5F55;) &#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x65B9;&#x6CD5;&#x8BF7;&#x6C42;&#x5730;&#x5740;&#x662F;&#xFF1A;GET /connect/{providerId}?code=&amp;state=(&#x9700;&#x8981;&#x767B;&#x5F55;)&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x662F;&#x83B7;&#x53D6;&#x793E;&#x4EA4;&#x6388;&#x6743;&#x8FDE;&#x63A5;&#x5730;&#x5740;&#xFF08;&#x8FD9;&#x4E2A;&#x662F;&#x4F60;&#x81EA;&#x5DF1;&#x793E;&#x4EA4;&#x767B;&#x5F55;&#x65F6;&#x5019;&#x5C01;&#x88C5;&#x597D;&#x7684;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4E0D;&#x6253;&#x7B97;&#x8BE6;&#x7EC6;&#x8BB2;&#x89E3;&#xFF0C;&#x540E;&#x9762;&#x8BFE;&#x7A0B;&#x518D;&#x653E;&#x51FA;&#x6765;&#x5427;&#xFF09;&#x6BD4;&#x5982;qq&#x7684;&#x6388;&#x6743;&#x5730;&#x5740;&#xFF1A;<a href="https://graph.qq.com/oauth2.0/show?which=Login&amp;display=pc&amp;client_id=&amp;response_type=code&amp;redirect_uri=&amp;state=" rel="nofollow noreferrer" target="_blank">https://graph.qq.com/oauth2.0...</a>&#xFF0C;&#x8FD9;&#x6837;&#x5F53;&#x4F60;&#x6388;&#x6743;&#x6210;&#x529F;&#x4E4B;&#x540E;&#x5C31;&#x56DE;&#x8C03;&#x5230;&#x4E86;&#x7B2C;&#x4E8C;&#x4E2A;&#x65B9;&#x6CD5;&#x91CC;&#x9762;&#xFF0C;&#x987A;&#x4FBF;&#x628A;code&#x548C;state&#x539F;&#x6837;&#x8FD4;&#x56DE;&#x8FC7;&#x6765;&#xFF0C;&#x8FD9;&#x4E00;&#x5957;&#x7ED1;&#x5B9A;&#x673A;&#x5236;&#x90FD;&#x662F;&#x57FA;&#x4E8E;session&#x7684;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x5206;&#x6790;&#x770B;&#x4E0B;&#x4ED6;&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7684;&#x3002;</p><p>&#x6211;&#x4EEC;&#x4EE5;&#x5FAE;&#x4FE1;&#x4E3A;&#x4F8B;&#xFF0C;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x53D1;&#x9001;&#x4E00;&#x4E2A;POST&#x8BF7;&#x6C42;/connect/wechat&#xFF0C;&#x56E0;&#x4E3A;&#x4F60;&#x5DF2;&#x7ECF;&#x767B;&#x5F55;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x540E;&#x53F0;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x5F53;&#x524D;user&#x662F;&#x8C01;&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x83B7;&#x53D6;&#x5230;&#x8BF7;&#x6C42;&#x7684;&#x94FE;&#x63A5;&#xFF1A;<a href="https://open.weixin.qq.com/connect/qrconnect?client_id=&amp;response_type=code&amp;redirect_uri=&amp;state=&amp;appid=&amp;scope=snsapi_login" rel="nofollow noreferrer" target="_blank">https://open.weixin.qq.com/co...</a>&#xFF0C;&#x6700;&#x540E;&#x5C31;&#x662F;&#x8DF3;&#x8F6C;&#x5230;&#x8FD9;&#x4E2A;&#x94FE;&#x63A5;&#x4E0A;&#x9762;&#x53BB;&#x3002;&#x8FD9;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5206;&#x6790;&#x7B2C;&#x4E8C;&#x4E2A;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x8BF7;&#x6C42;&#x4E0A;&#x9762;&#x7684;&#x94FE;&#x63A5;&#x4E4B;&#x540E;&#x5C31;&#x662F;&#x8DF3;&#x8F6C;&#x5230;&#x5FAE;&#x4FE1;&#x626B;&#x7801;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhAMI?w=1440&amp;h=1156" src="https://static.alili.tech/img/bVbhAMI?w=1440&amp;h=1156" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x626B;&#x5B8C;&#x4E4B;&#x540E;&#x7ACB;&#x9A6C;&#x5C31;&#x8DF3;&#x5230;&#x4E0A;&#x9762;&#x94FE;&#x63A5;redirect_uri&#x5730;&#x5740;&#x4E0A;&#x9762;&#x53BB;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x73B0;&#x5728;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x65B9;&#x6CD5;&#x4E0A;&#x9762;&#xFF0C;&#x800C;&#x4E14;&#x662F;&#x5E26;&#x7740;state&#x548C;code&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x540E;&#x53F0;&#x5F00;&#x59CB;&#x9A8C;&#x8BC1;&#x4F60;&#x56DE;&#x4F20;&#x8FC7;&#x6765;&#x7684;state&#x503C;&#x662F;&#x4E0D;&#x662F;&#x5339;&#x914D;&#x7684;&#xFF0C;&#x4E0D;&#x5339;&#x914D;&#x5C31;&#x62A5;&#x9519;&#x5E76;&#x4E14;&#x8DF3;&#x8F6C;&#x5230;&#x51FA;&#x9519;&#x9875;&#x9762;&#xFF0C;&#x5339;&#x914D;&#x7684;&#x8BDD;&#x5C31;&#x5F80;&#x4E0B;&#x8D70;&#xFF0C;&#x5E76;&#x4E14;&#x901A;&#x8FC7;code&#x83B7;&#x53D6;SpringSecurity OAuth&#x76F8;&#x5173;&#x793E;&#x4EA4;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x5E76;&#x4FDD;&#x5B58;&#x5230;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;code&#x548C;state&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x9A8C;&#x8BC1;&#x548C;&#x83B7;&#x53D6;&#x5B8C;&#x4E4B;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#xFF0C;&#x8FD9;&#x6837;&#x4F60;&#x5C31;&#x7ED1;&#x5B9A;&#x6210;&#x529F;&#x4E86;&#xFF0C;&#x6700;&#x540E;&#x8DF3;&#x8F6C;&#x5230;/connected/wechat&#x9875;&#x9762;&#x4E86;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x7ED3;&#x675F;&#x4E86;&#x7ED1;&#x5B9A;&#x529F;&#x80FD;&#x4E86;&#x3002;</p><p>&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x9879;&#x76EE;&#x8981;&#x4F7F;&#x7528;&#x8FD9;&#x5957;&#x673A;&#x5236;&#xFF0C;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x6539;&#x4E00;&#x4E0B;&#x4ED6;&#x7684;&#x6E90;&#x7801;&#x4E86;&#x3002;</p><p>&#x9996;&#x5148;&#x7B2C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x628A;userId&#x4FDD;&#x5B58;&#x5230;&#x4EE5;state&#x7684;redis&#x952E;&#x503C;&#x5BF9;&#x4E2D;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#xFF1A;{state:userId}&#xFF0C;&#x7136;&#x540E;&#x4EE5;JSON&#x7684;&#x683C;&#x5F0F;&#x8FD4;&#x56DE;&#x793E;&#x4EA4;&#x6388;&#x6743;&#x7684;&#x94FE;&#x63A5;&#x7ED9;&#x524D;&#x53F0;&#xFF0C;&#x8FD9;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x8981;&#x4FEE;&#x6539;&#x7684;&#x601D;&#x8DEF;&#x3002;</p><p>&#x7136;&#x540E;&#x7B2C;&#x4E8C;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x662F;&#x793E;&#x4EA4;&#x6388;&#x6743;&#x94FE;&#x63A5;&#x8FD4;&#x56DE;&#x56DE;&#x6765;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x9879;&#x76EE;session&#x5C31;&#x65E0;&#x6CD5;&#x4F7F;&#x7528;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x5FC5;&#x987B;&#x901A;&#x8FC7;&#x4E0A;&#x9762;redis&#x4FDD;&#x5B58;&#x7684;{state:userId}&#xFF0C;&#x6765;&#x83B7;&#x53D6;&#x7528;&#x6237;id&#x3002;&#x518D;&#x4E00;&#x4E2A;&#x6211;&#x4EEC;&#x901A;&#x8FC7;code&#x83B7;&#x53D6;&#x793E;&#x4EA4;&#x7528;&#x6237;&#x4FE1;&#x606F;&#xFF0C;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x90FD;&#x83B7;&#x53D6;&#x4E86;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5B89;&#x5FC3;&#x7684;&#x628A;&#x793E;&#x4EA4;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x4FDD;&#x5B58;&#x5230;&#x6570;&#x636E;&#x5E93;&#x4E2D;(&#x8FD9;&#x91CC;&#x7684;&#x901A;&#x8FC7;state&#x4ECE;redis&#x4E2D;&#x83B7;&#x53D6;userId&#xFF0C;&#x5176;&#x5B9E;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x9A8C;&#x8BC1;state&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x4F60;&#x60F3;&#x60F3;&#x53EF;&#x662F;&#x5462;&#xFF01;)&#xFF0C;&#x6700;&#x540E;&#x5C31;&#x8DF3;&#x8F6C;&#x5230;&#x4F60;&#x60F3;&#x8981;&#x7684;&#x9875;&#x9762;&#x5C31;&#x597D;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x5C31;&#x662F;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@RequestMapping(
            value = {&quot;/{providerId}&quot;},
            method = {RequestMethod.POST}
    )
    public ResponseEntity&lt;?&gt; connect(@PathVariable String providerId,
                                     NativeWebRequest request) {
        HttpServletRequest nativeRequest = request.getNativeRequest(HttpServletRequest.class);
        Principal user = nativeRequest.getUserPrincipal();
        ConnectionFactory&lt;?&gt; connectionFactory = this.connectionFactoryLocator.getConnectionFactory(providerId);
        MultiValueMap&lt;String, String&gt; parameters = new LinkedMultiValueMap();
        this.preConnect(connectionFactory, parameters, request);
        try {
            String social_connect_url = this.connectSupport.buildOAuthUrl(connectionFactory, request, parameters);
            String state = (String) this.sessionStrategy.getAttribute(request, &quot;oauth2State&quot;);
            this.sessionStrategy.removeAttribute(request, &quot;oauth2State&quot;);
            //&#x628A;userId&#x4EE5;state&#x4E3A;key&#x7684;&#x5F62;&#x5F0F;&#x4FDD;&#x5B58;&#x5230;redis&#x4E2D;
            socialRedisHelper.saveStateUserId(state, user.getName());
            //&#x8FD4;&#x56DE;&#x793E;&#x4EA4;&#x94FE;&#x63A5;&#x5730;&#x5740;
            return ResponseEntity.ok(social_connect_url);
        } catch (Exception var6) {
            this.sessionStrategy.setAttribute(request, &quot;social_provider_error&quot;, var6);
            logger.info(var6.getMessage());
            return null;
        }
    }
    
    //&#x8F85;&#x52A9;&#x65B9;&#x6CD5;1
    protected String callbackUrl(NativeWebRequest request) {
        if (this.callbackUrl != null) {
            return this.callbackUrl;
        } else {
            HttpServletRequest nativeRequest = request.getNativeRequest(HttpServletRequest.class);
            return this.applicationUrl != null ? this.applicationUrl + this.connectPath(nativeRequest) : nativeRequest.getRequestURL().toString();
        }
    }

    //&#x8F85;&#x52A9;&#x65B9;&#x6CD5;2
    private String connectPath(HttpServletRequest request) {
        String pathInfo = request.getPathInfo();
        return request.getServletPath() + (pathInfo != null ? pathInfo : &quot;&quot;);
    }

    //&#x56DE;&#x8C03;&#x65B9;&#x6CD5;
    @RequestMapping(
            value = {&quot;/{providerId}&quot;},
            method = {RequestMethod.GET},
            params = {&quot;code&quot;}
    )
    public void oauth2Callback(@PathVariable String providerId,
                               NativeWebRequest request,
                               HttpServletResponse response) {
        try {
            //ConnectController&#x662F;&#x5148;&#x4FDD;&#x5B58;&#x5728;session&#x91CC;&#x9762;&#xFF0C;&#x7136;&#x540E;&#x56DE;&#x8C03;&#x4ECE;session&#x91CC;&#x9762;&#x53D6;&#x51FA;&#x6765;&#x6821;&#x9A8C;
            //&#x6211;&#x73B0;&#x5728;&#x662F;&#x901A;&#x8FC7;redis&#x4FDD;&#x5B58;state &#x7684; userId&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x76F8;&#x5F53;&#x4E8E;&#x6821;&#x9A8C;&#x4E86;state
            String state = request.getParameter(&quot;state&quot;);
            String code = request.getParameter(&quot;code&quot;);
            OAuth2ConnectionFactory&lt;?&gt; connectionFactory = (OAuth2ConnectionFactory) this.connectionFactoryLocator.getConnectionFactory(providerId);
            AccessGrant accessGrant = connectionFactory.getOAuthOperations().exchangeForAccess(code, this.callbackUrl(request), null);
            Connection&lt;?&gt; connection = connectionFactory.createConnection(accessGrant);
            //&#x4ECE;redis&#x4E2D;&#x83B7;&#x53D6;userid
            String userId = socialRedisHelper.getStateUserId(state);
            //&#x4FDD;&#x5B58;&#x5230;&#x6570;&#x636E;&#x5E93;&#x4E2D;
            jdbcConnectionRepository.createConnectionRepository(userId).addConnection(connection);
            //&#x8DF3;&#x8F6C;&#x9875;&#x9762;&#x5230;&#x524D;&#x53F0;&#x4EFB;&#x4F55;&#x4F60;&#x60F3;&#x8BBE;&#x7F6E;&#x7684;&#x5730;&#x5740;
            response.sendRedirect(connectUrl);
        } catch (Exception ex) {
            logger.info(ex.getMessage());
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-meta">@RequestMapping(
            value = {<span class="hljs-meta-string">&quot;/{providerId}&quot;</span>},
            method = {RequestMethod.POST}
    )</span>
    <span class="hljs-keyword">public</span> ResponseEntity&lt;?&gt; connect(<span class="hljs-meta">@PathVariable</span> String providerId,
                                     NativeWebRequest request) {
        HttpServletRequest nativeRequest = request.getNativeRequest(HttpServletRequest.<span class="hljs-keyword">class</span>);
        Principal user = nativeRequest.getUserPrincipal();
        ConnectionFactory&lt;?&gt; connectionFactory = <span class="hljs-keyword">this</span>.connectionFactoryLocator.getConnectionFactory(providerId);
        MultiValueMap&lt;String, String&gt; parameters = new LinkedMultiValueMap();
        <span class="hljs-keyword">this</span>.preConnect(connectionFactory, parameters, request);
        <span class="hljs-keyword">try</span> {
            String social_connect_url = <span class="hljs-keyword">this</span>.connectSupport.buildOAuthUrl(connectionFactory, request, parameters);
            String state = (String) <span class="hljs-keyword">this</span>.sessionStrategy.getAttribute(request, <span class="hljs-string">&quot;oauth2State&quot;</span>);
            <span class="hljs-keyword">this</span>.sessionStrategy.removeAttribute(request, <span class="hljs-string">&quot;oauth2State&quot;</span>);
            <span class="hljs-comment">//&#x628A;userId&#x4EE5;state&#x4E3A;key&#x7684;&#x5F62;&#x5F0F;&#x4FDD;&#x5B58;&#x5230;redis&#x4E2D;</span>
            socialRedisHelper.saveStateUserId(state, user.getName());
            <span class="hljs-comment">//&#x8FD4;&#x56DE;&#x793E;&#x4EA4;&#x94FE;&#x63A5;&#x5730;&#x5740;</span>
            <span class="hljs-keyword">return</span> ResponseEntity.ok(social_connect_url);
        } <span class="hljs-keyword">catch</span> (Exception var6) {
            <span class="hljs-keyword">this</span>.sessionStrategy.setAttribute(request, <span class="hljs-string">&quot;social_provider_error&quot;</span>, var6);
            logger.info(var6.getMessage());
            <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        }
    }
    
    <span class="hljs-comment">//&#x8F85;&#x52A9;&#x65B9;&#x6CD5;1</span>
    <span class="hljs-keyword">protected</span> String callbackUrl(NativeWebRequest request) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.callbackUrl != <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.callbackUrl;
        } <span class="hljs-keyword">else</span> {
            HttpServletRequest nativeRequest = request.getNativeRequest(HttpServletRequest.<span class="hljs-keyword">class</span>);
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.applicationUrl != <span class="hljs-literal">null</span> ? <span class="hljs-keyword">this</span>.applicationUrl + <span class="hljs-keyword">this</span>.connectPath(nativeRequest) : nativeRequest.getRequestURL().toString();
        }
    }

    <span class="hljs-comment">//&#x8F85;&#x52A9;&#x65B9;&#x6CD5;2</span>
    <span class="hljs-keyword">private</span> String connectPath(HttpServletRequest request) {
        String pathInfo = request.getPathInfo();
        <span class="hljs-keyword">return</span> request.getServletPath() + (pathInfo != <span class="hljs-literal">null</span> ? pathInfo : <span class="hljs-string">&quot;&quot;</span>);
    }

    <span class="hljs-comment">//&#x56DE;&#x8C03;&#x65B9;&#x6CD5;</span>
    <span class="hljs-meta">@RequestMapping(
            value = {<span class="hljs-meta-string">&quot;/{providerId}&quot;</span>},
            method = {RequestMethod.GET},
            params = {<span class="hljs-meta-string">&quot;code&quot;</span>}
    )</span>
    <span class="hljs-keyword">public</span> void oauth2Callback(<span class="hljs-meta">@PathVariable</span> String providerId,
                               NativeWebRequest request,
                               HttpServletResponse response) {
        <span class="hljs-keyword">try</span> {
            <span class="hljs-comment">//ConnectController&#x662F;&#x5148;&#x4FDD;&#x5B58;&#x5728;session&#x91CC;&#x9762;&#xFF0C;&#x7136;&#x540E;&#x56DE;&#x8C03;&#x4ECE;session&#x91CC;&#x9762;&#x53D6;&#x51FA;&#x6765;&#x6821;&#x9A8C;</span>
            <span class="hljs-comment">//&#x6211;&#x73B0;&#x5728;&#x662F;&#x901A;&#x8FC7;redis&#x4FDD;&#x5B58;state &#x7684; userId&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x76F8;&#x5F53;&#x4E8E;&#x6821;&#x9A8C;&#x4E86;state</span>
            String state = request.getParameter(<span class="hljs-string">&quot;state&quot;</span>);
            String code = request.getParameter(<span class="hljs-string">&quot;code&quot;</span>);
            OAuth2ConnectionFactory&lt;?&gt; connectionFactory = (OAuth2ConnectionFactory) <span class="hljs-keyword">this</span>.connectionFactoryLocator.getConnectionFactory(providerId);
            AccessGrant accessGrant = connectionFactory.getOAuthOperations().exchangeForAccess(code, <span class="hljs-keyword">this</span>.callbackUrl(request), <span class="hljs-literal">null</span>);
            Connection&lt;?&gt; connection = connectionFactory.createConnection(accessGrant);
            <span class="hljs-comment">//&#x4ECE;redis&#x4E2D;&#x83B7;&#x53D6;userid</span>
            String userId = socialRedisHelper.getStateUserId(state);
            <span class="hljs-comment">//&#x4FDD;&#x5B58;&#x5230;&#x6570;&#x636E;&#x5E93;&#x4E2D;</span>
            jdbcConnectionRepository.createConnectionRepository(userId).addConnection(connection);
            <span class="hljs-comment">//&#x8DF3;&#x8F6C;&#x9875;&#x9762;&#x5230;&#x524D;&#x53F0;&#x4EFB;&#x4F55;&#x4F60;&#x60F3;&#x8BBE;&#x7F6E;&#x7684;&#x5730;&#x5740;</span>
            response.sendRedirect(connectUrl);
        } <span class="hljs-keyword">catch</span> (Exception ex) {
            logger.info(ex.getMessage());
        }
    }</code></pre><p>&#x8FD9;&#x6837;&#x4F60;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x540E;&#x53F0;&#x7ED1;&#x5B9A;&#x76F8;&#x5173;&#x5DE5;&#x4F5C;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x628A;&#x524D;&#x7AEF;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x4E5F;&#x653E;&#x51FA;&#x6765;&#x5927;&#x5BB6;&#x770B;&#x4E0B;&#x5427;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gotoBind(type){
            let url = `${this.$url}/socialConnect/${type}`;
            this.$post(url)
            .then(res=&gt;{
                if(res.code == 0){
                    this.openWindow(res.data.redirect_uri)
                }
            })
        },
openWindow(url){
            let sf_H = 550;
            let sf_W = 720;
            var iTop = (window.screen.height-30 -sf_H)/2; //&#x83B7;&#x5F97;&#x7A97;&#x53E3;&#x7684;&#x5782;&#x76F4;&#x4F4D;&#x7F6E;;  
            var iLeft = (window.screen.width-10 -sf_W)/2; //&#x83B7;&#x5F97;&#x7A97;&#x53E3;&#x7684;&#x6C34;&#x5E73;&#x4F4D;&#x7F6E;;
            let s = window.open(url,&quot;social_bind_form&quot;,&apos;height=&apos;+sf_H+
            &apos;, width=&apos;+sf_W+&apos;,top=&apos;+iTop+&apos;,left=&apos;+iLeft+&apos;toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes&apos;);
        }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code>gotoBind(type){
            <span class="hljs-keyword">let</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">`<span class="hljs-subst">${this.$url}</span>/socialConnect/<span class="hljs-subst">${type}</span>`</span>;
            <span class="hljs-keyword">this</span>.$post(<span class="hljs-built_in">url</span>)
            .then(res=&gt;{
                <span class="hljs-keyword">if</span>(res.code == <span class="hljs-number">0</span>){
                    <span class="hljs-keyword">this</span>.openWindow(res.data.redirect_uri)
                }
            })
        },
openWindow(<span class="hljs-built_in">url</span>){
            <span class="hljs-keyword">let</span> sf_H = <span class="hljs-number">550</span>;
            <span class="hljs-keyword">let</span> sf_W = <span class="hljs-number">720</span>;
            <span class="hljs-built_in">var</span> iTop = (<span class="hljs-built_in">window</span>.screen.height<span class="hljs-number">-30</span> -sf_H)/<span class="hljs-number">2</span>; <span class="hljs-comment">//&#x83B7;&#x5F97;&#x7A97;&#x53E3;&#x7684;&#x5782;&#x76F4;&#x4F4D;&#x7F6E;;  </span>
            <span class="hljs-built_in">var</span> iLeft = (<span class="hljs-built_in">window</span>.screen.width<span class="hljs-number">-10</span> -sf_W)/<span class="hljs-number">2</span>; <span class="hljs-comment">//&#x83B7;&#x5F97;&#x7A97;&#x53E3;&#x7684;&#x6C34;&#x5E73;&#x4F4D;&#x7F6E;;</span>
            <span class="hljs-keyword">let</span> s = <span class="hljs-built_in">window</span>.open(<span class="hljs-built_in">url</span>,<span class="hljs-string">&quot;social_bind_form&quot;</span>,<span class="hljs-string">&apos;height=&apos;</span>+sf_H+
            <span class="hljs-string">&apos;, width=&apos;</span>+sf_W+<span class="hljs-string">&apos;,top=&apos;</span>+iTop+<span class="hljs-string">&apos;,left=&apos;</span>+iLeft+<span class="hljs-string">&apos;toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes&apos;</span>);
        },</code></pre><p>&#x4E0A;&#x9762;&#x662F;&#x83B7;&#x53D6;&#x793E;&#x4EA4;&#x7ED1;&#x5B9A;&#x5730;&#x5740;&#x5E76;&#x8DF3;&#x8F6C;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x56DE;&#x8C03;&#x6210;&#x529F;&#x4E4B;&#x540E;&#x5173;&#x95ED;&#x5BF9;&#x8BDD;&#x6846;&#x5E76;&#x5237;&#x65B0;&#x7684;&#x9875;&#x9762;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;section&gt;
        &lt;!--&#x793E;&#x4EA4;&#x7ED1;&#x5B9A;&#x6210;&#x529F;&#x5904;&#x7406;&#x9875;&#x9762;--&gt;
    &lt;/section&gt;
&lt;/template&gt;
&lt;script&gt;
import {mapActions,mapState} from &apos;vuex&apos;

export default {
    data(){
        return{
        }
    },
    created(){
        window.close(); 
        opener.location.reload();
    },
    methods:{
        
    }
}
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-comment">&lt;!--&#x793E;&#x4EA4;&#x7ED1;&#x5B9A;&#x6210;&#x529F;&#x5904;&#x7406;&#x9875;&#x9762;--&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> {mapActions,mapState} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data(){
        <span class="hljs-keyword">return</span>{
        }
    },
    created(){
        <span class="hljs-built_in">window</span>.close(); 
        opener.location.reload();
    },
    <span class="hljs-attr">methods</span>:{
        
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre><p>&#x6211;&#x4EEC;&#x6765;&#x6F14;&#x793A;&#x4E00;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhAMa?w=1720&amp;h=862" src="https://static.alili.tech/img/bVbhAMa?w=1720&amp;h=862" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVbhAMI?w=1440&amp;h=1156" src="https://static.alili.tech/img/bVbhAMI?w=1440&amp;h=1156" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVbhAM4?w=1686&amp;h=762" src="https://static.alili.tech/img/bVbhAM4?w=1686&amp;h=762" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVbhANd?w=2394&amp;h=628" src="https://static.alili.tech/img/bVbhANd?w=2394&amp;h=628" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h1 id="articleHeader4">5&#x3001;&#x89E3;&#x7ED1;&#x793E;&#x4EA4;&#x8D26;&#x53F7;</h1><p>&#x7ED1;&#x5B9A;&#x793E;&#x4EA4;&#x8D26;&#x53F7;&#x5DF2;&#x7ECF;&#x6210;&#x529F;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x5982;&#x4F55;&#x89E3;&#x7ED1;&#x793E;&#x4EA4;&#x8D26;&#x53F7;&#x5427;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x770B;&#x4E0B;&#x6E90;&#x7801;&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@RequestMapping(
        value = {&quot;/{providerId}&quot;},
        method = {RequestMethod.DELETE}
    )
    public RedirectView removeConnections(@PathVariable String providerId, NativeWebRequest request) {
        ConnectionFactory&lt;?&gt; connectionFactory = this.connectionFactoryLocator.getConnectionFactory(providerId);
        this.preDisconnect(connectionFactory, request);
        this.connectionRepository.removeConnections(providerId);
        this.postDisconnect(connectionFactory, request);
        return this.connectionStatusRedirect(providerId, request);
    }

    @RequestMapping(
        value = {&quot;/{providerId}/{providerUserId}&quot;},
        method = {RequestMethod.DELETE}
    )
    public RedirectView removeConnection(@PathVariable String providerId, @PathVariable String providerUserId, NativeWebRequest request) {
        ConnectionFactory&lt;?&gt; connectionFactory = this.connectionFactoryLocator.getConnectionFactory(providerId);
        this.preDisconnect(connectionFactory, request);
        this.connectionRepository.removeConnection(new ConnectionKey(providerId, providerUserId));
        this.postDisconnect(connectionFactory, request);
        return this.connectionStatusRedirect(providerId, request);
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-meta">@RequestMapping(
        value = {<span class="hljs-meta-string">&quot;/{providerId}&quot;</span>},
        method = {RequestMethod.DELETE}
    )</span>
    <span class="hljs-keyword">public</span> RedirectView removeConnections(<span class="hljs-meta">@PathVariable</span> String providerId, NativeWebRequest request) {
        ConnectionFactory&lt;?&gt; connectionFactory = <span class="hljs-keyword">this</span>.connectionFactoryLocator.getConnectionFactory(providerId);
        <span class="hljs-keyword">this</span>.preDisconnect(connectionFactory, request);
        <span class="hljs-keyword">this</span>.connectionRepository.removeConnections(providerId);
        <span class="hljs-keyword">this</span>.postDisconnect(connectionFactory, request);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.connectionStatusRedirect(providerId, request);
    }

    <span class="hljs-meta">@RequestMapping(
        value = {<span class="hljs-meta-string">&quot;/{providerId}/{providerUserId}&quot;</span>},
        method = {RequestMethod.DELETE}
    )</span>
    <span class="hljs-keyword">public</span> RedirectView removeConnection(<span class="hljs-meta">@PathVariable</span> String providerId, <span class="hljs-meta">@PathVariable</span> String providerUserId, NativeWebRequest request) {
        ConnectionFactory&lt;?&gt; connectionFactory = <span class="hljs-keyword">this</span>.connectionFactoryLocator.getConnectionFactory(providerId);
        <span class="hljs-keyword">this</span>.preDisconnect(connectionFactory, request);
        <span class="hljs-keyword">this</span>.connectionRepository.removeConnection(new ConnectionKey(providerId, providerUserId));
        <span class="hljs-keyword">this</span>.postDisconnect(connectionFactory, request);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.connectionStatusRedirect(providerId, request);
    }</code></pre><p>&#x7B2C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x8BF7;&#x6C42;&#x5730;&#x5740;&#x662F;&#xFF1A;Delete /connect/{providerId}(&#x9700;&#x767B;&#x5F55;)&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x65B9;&#x6CD5;&#x8BF7;&#x6C42;&#x5730;&#x5740;&#x662F;&#xFF1A;Delete /connect/{providerId}/{providerUserId}(&#x9700;&#x767B;&#x5F55;)&#xFF0C;&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684;providerUserId&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x793E;&#x4EA4;&#x7528;&#x6237;id,&#x6BD4;&#x5982;&#x5FAE;&#x4FE1;&#x7684;openId&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x662F;&#x6839;&#x636E;&#x767B;&#x5F55;&#x7684;userId&#x548C;providerId&#x6765;&#x5220;&#x9664;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x7ED1;&#x5B9A;&#x7684;&#x793E;&#x4EA4;&#x7528;&#x6237;&#x6570;&#x636E;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x65B9;&#x6CD5;&#x662F;&#x6839;&#x636E;&#x767B;&#x5F55;&#x7684;userId&#x548C;providerId&#x8FD8;&#x6709;providerUserId&#x6765;&#x5220;&#x9664;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x7ED1;&#x5B9A;&#x7684;&#x793E;&#x4EA4;&#x7528;&#x6237;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A; &#x65B9;&#x6CD5;&#x90FD;&#x6709;&#x76F8;&#x540C;&#x7684;&#x4E00;&#x70B9;&#x5C31;&#x662F;&#x8DF3;&#x8F6C;&#x5230;&#x5220;&#x9664;&#x4E4B;&#x540E;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EA;&#x8981;&#x628A;&#x8DF3;&#x8F6C;&#x9875;&#x9762;&#x4EE5;JSON&#x7684;&#x5F62;&#x5F0F;&#x8FD4;&#x56DE;&#x7ED9;&#x524D;&#x7AEF;&#x5C31;&#x597D;&#xFF0C;&#x4E0B;&#x9762;&#x5C31;&#x662F;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" @RequestMapping(
            value = {&quot;/{providerId}&quot;},
            method = {RequestMethod.DELETE}
    )
    public ResponseEntity&lt;?&gt; removeConnections(@PathVariable String providerId, NativeWebRequest request) {
        ConnectionFactory&lt;?&gt; connectionFactory = this.connectionFactoryLocator.getConnectionFactory(providerId);
        this.preDisconnect(connectionFactory, request);
        this.connectionRepository.removeConnections(providerId);
        this.postDisconnect(connectionFactory, request);
        return ResponseEntity.ok(&quot;success&quot;);
    }

    @RequestMapping(
            value = {&quot;/{providerId}/{providerUserId}&quot;},
            method = {RequestMethod.DELETE}
    )
    public ResponseEntity&lt;?&gt; removeConnection(@PathVariable String providerId,
                                              @PathVariable String providerUserId,
                                              NativeWebRequest request) throws IOException {
        try {
            ConnectionFactory&lt;?&gt; connectionFactory = this.connectionFactoryLocator.getConnectionFactory(providerId);
            this.preDisconnect(connectionFactory, request);
            this.connectionRepository.removeConnection(new ConnectionKey(providerId, providerUserId));
            this.postDisconnect(connectionFactory, request);
        } catch (Exception ex) {
            logger.info(ex.getMessage());
        }
        return ResponseEntity.ok(&quot;success&quot;);
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code> <span class="hljs-meta">@RequestMapping(
            value = {<span class="hljs-meta-string">&quot;/{providerId}&quot;</span>},
            method = {RequestMethod.DELETE}
    )</span>
    <span class="hljs-keyword">public</span> ResponseEntity&lt;?&gt; removeConnections(<span class="hljs-meta">@PathVariable</span> String providerId, NativeWebRequest request) {
        ConnectionFactory&lt;?&gt; connectionFactory = <span class="hljs-keyword">this</span>.connectionFactoryLocator.getConnectionFactory(providerId);
        <span class="hljs-keyword">this</span>.preDisconnect(connectionFactory, request);
        <span class="hljs-keyword">this</span>.connectionRepository.removeConnections(providerId);
        <span class="hljs-keyword">this</span>.postDisconnect(connectionFactory, request);
        <span class="hljs-keyword">return</span> ResponseEntity.ok(<span class="hljs-string">&quot;success&quot;</span>);
    }

    <span class="hljs-meta">@RequestMapping(
            value = {<span class="hljs-meta-string">&quot;/{providerId}/{providerUserId}&quot;</span>},
            method = {RequestMethod.DELETE}
    )</span>
    <span class="hljs-keyword">public</span> ResponseEntity&lt;?&gt; removeConnection(<span class="hljs-meta">@PathVariable</span> String providerId,
                                              <span class="hljs-meta">@PathVariable</span> String providerUserId,
                                              NativeWebRequest request) throws IOException {
        <span class="hljs-keyword">try</span> {
            ConnectionFactory&lt;?&gt; connectionFactory = <span class="hljs-keyword">this</span>.connectionFactoryLocator.getConnectionFactory(providerId);
            <span class="hljs-keyword">this</span>.preDisconnect(connectionFactory, request);
            <span class="hljs-keyword">this</span>.connectionRepository.removeConnection(new ConnectionKey(providerId, providerUserId));
            <span class="hljs-keyword">this</span>.postDisconnect(connectionFactory, request);
        } <span class="hljs-keyword">catch</span> (Exception ex) {
            logger.info(ex.getMessage());
        }
        <span class="hljs-keyword">return</span> ResponseEntity.ok(<span class="hljs-string">&quot;success&quot;</span>);
    }</code></pre><p>&#x6211;&#x4EEC;&#x518D;&#x628A;&#x524D;&#x7AEF;&#x4EE3;&#x7801;&#x8D34;&#x51FA;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gotoUnBind(type){
            let url = `${this.$url}/socialConnect/${type}`;
            this.$delete(url)
            .then(res=&gt;{
                if(res.code == 0){
                    this.$Message.success(&apos;&#x89E3;&#x7ED1;&#x6210;&#x529F;&#xFF01;&apos;)
                    location.reload();
                }
            })
        }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>gotoUnBind(type){
            <span class="hljs-keyword">let</span> url = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.$url}</span>/socialConnect/<span class="hljs-subst">${type}</span>`</span>;
            <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">delete</span>(url)
            .then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{
                <span class="hljs-keyword">if</span>(res.code == <span class="hljs-number">0</span>){
                    <span class="hljs-keyword">this</span>.$Message.success(<span class="hljs-string">&apos;&#x89E3;&#x7ED1;&#x6210;&#x529F;&#xFF01;&apos;</span>)
                    location.reload();
                }
            })
        },</code></pre><h1 id="articleHeader5">6&#x3001;&#x603B;&#x7ED3;&#xFF1A;</h1><p>1&#x3001;&#x53EA;&#x8981;&#x628A;&#x601D;&#x8DEF;&#x7406;&#x6E05;&#x695A;&#x4E86;&#xFF0C;&#x5176;&#x5B9E;&#x4FEE;&#x6539;&#x6210;&#x81EA;&#x5DF1;&#x60F3;&#x8981;&#x7684;&#x4EE3;&#x7801;&#x5C31;&#x4E0D;&#x96BE;<br>2&#x3001;&#x6CE8;&#x610F;ConnectController&#x4EE3;&#x7801;&#x662F;&#x57FA;&#x4E8E;Session&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x4F60;&#x5FC5;&#x987B;&#x8981;&#x767B;&#x5F55;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x624D;&#x80FD;&#x4F7F;&#x7528;<br>3&#x3001;redis&#x7684;&#x4F7F;&#x7528;&#x5728;&#x8FD9;&#x91CC;&#x53D1;&#x6325;&#x5230;&#x4E86;&#x4E00;&#x5B9A;&#x4F5C;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x8BF4;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x9879;&#x76EE;&#x79BB;&#x4E0D;&#x5F00;redis</p><p>&#x5982;&#x679C;&#x4F60;&#x89C9;&#x5F97;&#x5E2E;&#x52A9;&#x5230;&#x4F60;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x6253;&#x8D4F;&#x6211;&#x66F4;&#x6709;&#x52A8;&#x529B;&#x6765;&#x66F4;&#x65B0;&#x6587;&#x7AE0;</p><p><span class="img-wrap"><img data-src="/img/bVbhA0O?w=900&amp;h=1350" src="https://static.alili.tech/img/bVbhA0O?w=900&amp;h=1350" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader6">7&#x3001;&#x5F15;&#x7528;</h1><p><a href="http://wiki.connect.qq.com/get_user_info" rel="nofollow noreferrer" target="_blank">qq&#x4E92;&#x8054;&#x6587;&#x6863;</a><br><a href="https://my.oschina.net/giegie/blog/1605932" rel="nofollow noreferrer" target="_blank">Spring Security Oauth2.0 &#x5B9E;&#x73B0;&#x77ED;&#x4FE1;&#x9A8C;&#x8BC1;&#x7801;&#x767B;&#x5F55;</a><br><a href="http://www.dewafer.com/2016/10/01/dive-into-spring-security/" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;&#x4E86;&#x89E3; Spring Security</a><br><a href="https://github.com/longfeizheng/logback" rel="nofollow noreferrer" target="_blank">SpringBoot+Spring Security&#x57FA;&#x672C;&#x914D;&#x7F6E;</a><br><a href="https://github.com/trautonen/spring-social-mongodb" rel="nofollow noreferrer" target="_blank">spring-social-mongodb</a><br><a href="https://blog.csdn.net/u014033756/article/details/52038114" rel="nofollow noreferrer" target="_blank">&#x5FAE;&#x4FE1;&#x7684;redirect_uri&#x53C2;&#x6570;&#x9519;&#x8BEF;&#x89E3;&#x51B3;&#x529E;&#x6CD5;</a><br><a href="https://www.jianshu.com/p/5b5c2131bff9" rel="nofollow noreferrer" target="_blank">&#x7F51;&#x9875;&#x5FAE;&#x4FE1;&#x7B2C;&#x4E09;&#x65B9;&#x767B;&#x5F55;-redirect_uri&#x53C2;&#x6570;&#x9519;&#x8BEF;</a><br><a href="https://www.jianshu.com/p/8faaad6e9aec" rel="nofollow noreferrer" target="_blank">Java&#x5B9E;&#x73B0;QQ&#x3001;&#x5FAE;&#x4FE1;&#x3001;&#x65B0;&#x6D6A;&#x5FAE;&#x535A;&#x7B2C;&#x4E09;&#x65B9;&#x767B;&#x5F55;</a><br><a href="https://www.cnblogs.com/liuxianan/p/java-qq-weibo-login.html" rel="nofollow noreferrer" target="_blank">&#x5982;&#x4F55;&#x4ECE;&#x96F6;&#x5F00;&#x59CB;&#x5BF9;&#x63A5;&#x7B2C;&#x4E09;&#x65B9;&#x767B;&#x5F55;(Java&#x7248;)&#xFF1A;QQ&#x767B;&#x5F55;&#x548C;&#x5FAE;&#x535A;&#x767B;&#x5F55;</a><br><a href="https://www.jianshu.com/p/217abf004545" rel="nofollow noreferrer" target="_blank">QQ&#x6388;&#x6743;&#x767B;&#x5F55;&#x6539;</a><br><a href="https://qtdebug.com/spring-security-11-qq-login/" rel="nofollow noreferrer" target="_blank">Spring Security QQ &#x767B;&#x9646;</a><br><a href="https://blog.csdn.net/qq_34206863/article/details/78778058" rel="nofollow noreferrer" target="_blank">&#x7B2C;&#x4E09;&#x65B9;APP&#x5B9E;&#x73B0;QQ&#x767B;&#x9646;</a><br><a href="https://blog.csdn.net/silent_paladin/article/details/72775782" rel="nofollow noreferrer" target="_blank">2 Apache Shiro &#x8EAB;&#x4EFD;&#x8BA4;&#x8BC1;&#xFF08;&#x767B;&#x5F55;&#xFF09;</a><br><a href="https://www.jianshu.com/p/51b558780098" rel="nofollow noreferrer" target="_blank">Spring Security &#x5B9E;&#x6218;&#xFF1A;QQ&#x767B;&#x5F55;&#x5B9E;&#x73B0;</a><br><a href="https://blog.csdn.net/shanshan_blog/article/details/71514087" rel="nofollow noreferrer" target="_blank">&#x57FA;&#x4E8E;Spring&#x7684;QQ&#x7B2C;&#x4E09;&#x65B9;&#x767B;&#x5F55;&#x5B9E;&#x73B0;</a><br><a href="https://blog.csdn.net/dandandeshangni/article/details/79016125" rel="nofollow noreferrer" target="_blank">Spring Security&#x6E90;&#x7801;&#x5206;&#x6790;&#x4E09;&#xFF1A;Spring Social&#x5B9E;&#x73B0;QQ&#x793E;&#x4EA4;&#x767B;&#x5F55;</a><br><a href="https://blog.csdn.net/u012682683/article/details/78201371?locationNum=9&amp;fps=1" rel="nofollow noreferrer" target="_blank">&#x5FAE;&#x4FE1;&#x6388;&#x6743;&#x767B;&#x5F55;-&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;</a><br><a href="http://blog.didispace.com/spring-security-oauth2-xjf-1/" rel="nofollow noreferrer" target="_blank">&#x4ECE;&#x96F6;&#x5F00;&#x59CB;&#x7684;Spring Security Oauth2&#xFF08;&#x4E00;&#xFF09;</a><br><a href="https://spring.io/guides/tutorials/spring-boot-oauth2/" rel="nofollow noreferrer" target="_blank">Spring Boot and OAuth2</a><br><a href="https://juejin.im/post/5a3cbce05188252582279467" rel="nofollow noreferrer" target="_blank">Spring security OAuth2 &#x6DF1;&#x5165;&#x89E3;&#x6790;</a><br><a href="http://www.leftso.com/blog/139.html" rel="nofollow noreferrer" target="_blank">spring boot &#x5165;&#x95E8;&#x4E4B;security oauth2 jwt&#x5B8C;&#x7F8E;&#x6574;&#x5408;&#x4F8B;&#x5B50;-java&#x7F16;&#x7A0B;</a><br><a href="https://github.com/jojozhai/security" rel="nofollow noreferrer" target="_blank">jojozhai/security</a><br><a href="https://blog.csdn.net/shannon8/article/details/72896408" rel="nofollow noreferrer" target="_blank">window.open&#x6253;&#x5F00;&#x7684;&#x7A97;&#x53E3;&#x5173;&#x95ED;&#x540E;&#x5237;&#x65B0;&#x7236;&#x9875;&#x9762;&#x7684;&#x5B50;&#x9875;&#x9762;</a><br><a href="https://www.cnblogs.com/softidea/p/7153047.html" rel="nofollow noreferrer" target="_blank">Spring Security &#x5B9E;&#x6218;&#xFF1A;QQ&#x767B;&#x5F55;&#x5B9E;&#x73B0;</a><a href="https://jwt.io" rel="nofollow noreferrer" target="_blank">jwt</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前后端分离项目 — SpringSocial 绑定与解绑社交账号如微信、QQ

## 原文链接
[https://segmentfault.com/a/1190000016542131](https://segmentfault.com/a/1190000016542131)

