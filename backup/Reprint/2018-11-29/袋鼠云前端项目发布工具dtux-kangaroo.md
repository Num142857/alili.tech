---
title: '袋鼠云前端项目发布工具dtux-kangaroo' 
date: 2018-11-29 9:27:38
hidden: true
slug: gudlsmqnv3o
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">&#x524D;&#x8A00;</h1>
<p>&#x5728;&#x76EE;&#x524D;&#x7684;&#x5927;&#x8D8B;&#x52BF;&#x4E0B;&#xFF0C;&#x524D;&#x7AEF;&#x548C;&#x540E;&#x7AEF;&#x89E3;&#x8026;&#x5DF2;&#x7ECF;&#x662F;&#x4E00;&#x4E2A;&#x4E1A;&#x754C;&#x7684;&#x8D8B;&#x52BF;&#x3002;&#x524D;&#x7AEF;&#x548C;&#x540E;&#x7AEF;&#x4E00;&#x65E6;&#x89E3;&#x8026;&#x4E4B;&#x540E;&#xFF0C;&#x524D;&#x7AEF;&#x7684;&#x9879;&#x76EE;&#x548C;&#x540E;&#x7AEF;&#x7684;&#x9879;&#x76EE;&#x4FBF;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x53D1;&#x5E03;&#xFF0C;&#x4E92;&#x4E0D;&#x5F71;&#x54CD;&#x3002;&#x8FD9;&#x6837;&#x6781;&#x5927;&#x5730;&#x63D0;&#x9AD8;&#x5DE5;&#x4F5C;&#x6548;&#x7387;&#xFF0C;&#x514D;&#x53BB;&#x4E86;&#x5F88;&#x591A;&#x4E92;&#x76F8;&#x7B49;&#x5F85;&#x7684;&#x65F6;&#x95F4;&#x3002;&#x6BCF;&#x5BB6;&#x516C;&#x53F8;&#x5728;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x53D1;&#x5E03;&#x4F53;&#x7CFB;&#x53EF;&#x80FD;&#x4E0D;&#x5C3D;&#x76F8;&#x540C;&#xFF0C;&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#x4EC5;&#x4EC5;&#x4ECB;&#x7ECD;&#x888B;&#x9F20;&#x4E91;&#x7684;&#x524D;&#x7AEF;&#x53D1;&#x5E03;&#x4F53;&#x7CFB;&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x5BF9;&#x5927;&#x5BB6;&#x80FD;&#x6709;&#x6240;&#x542F;&#x53D1;&#x3002;</p>
<p><strong>&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;</strong> <a href="https://github.com/ruichengping/dtux-kangaroo" rel="nofollow noreferrer" target="_blank">https://github.com/ruichengpi...</a></p>
<h1 id="articleHeader1">&#x5B9E;&#x73B0;&#x539F;&#x7406;</h1>
<p><span class="img-wrap"><img data-src="/img/bVbbXFK?w=1628&amp;h=918" src="https://static.alili.tech/img/bVbbXFK?w=1628&amp;h=918" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x9996;&#x5148;&#x8BF4;&#x4E00;&#x4E0B;&#x6574;&#x4E2A;&#x524D;&#x7AEF;&#x8FD9;&#x8FB9;&#x7684;&#x8FD0;&#x884C;&#x6D41;&#x7A0B;&#xFF0C;&#x4E00;&#x822C;&#x6D4F;&#x89C8;&#x5668;&#x8BF7;&#x6C42;&#x6211;&#x4EEC;&#x5927;&#x81F4;&#x5206;&#x4E3A;&#x4E24;&#x6761;&#x7EBF;<strong>&#x8D44;&#x6E90;&#x8BF7;&#x6C42;</strong>&#x548C;<strong>&#x63A5;&#x53E3;&#x8BF7;&#x6C42;</strong>&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x4EE5;&#x8FD9;&#x4E24;&#x4E2A;&#x7EBF;&#x8BF4;&#x4E00;&#x4E0B;&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#xFF1A;</p>
<p><strong>1. &#x8D44;&#x6E90;&#x8BF7;&#x6C42;&#xFF1A;</strong> &#x8FD9;&#x8FB9;&#x6211;&#x4EEC;Nginx&#x670D;&#x52A1;&#x5668;&#x8DDF;&#x6211;&#x4EEC;&#x524D;&#x7AEF;&#x6253;&#x5305;&#x51FA;&#x6765;&#x8D44;&#x6E90;&#x90FD;&#x662F;&#x653E;&#x5728;&#x540C;&#x4E00;&#x53F0;&#x673A;&#x5668;&#x4E0A;&#x3002;Nginx&#x8BBE;&#x7F6E;&#x4E00;&#x4E0B;&#x6211;&#x4EEC;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x7684;&#x76EE;&#x5F55;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x8D44;&#x6E90;&#x8BF7;&#x6C42;&#x90FD;&#x4F1A;&#x4ECE;&#x8FD9;&#x4E2A;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x76EE;&#x5F55;&#x4E2D;&#x83B7;&#x53D6;&#xFF0C;&#x6211;&#x4EEC;&#x672C;&#x5730;&#x5F80;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x63A8;&#x9001;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x4E5F;&#x662F;&#x5728;&#x8FD9;&#x4E2A;&#x76EE;&#x5F55;&#x4E0B;&#x3002;</p>
<p><strong>2. &#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#xFF1A;</strong> &#x6D4F;&#x89C8;&#x5668;&#x7684;&#x6240;&#x6709;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x90FD;&#x4F1A;&#x88AB;&#x6211;&#x4EEC;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x4E0A;&#x7684;Nginx&#x62E6;&#x622A;,&#x7136;&#x540E;&#x8DEF;&#x5F84;&#x89C4;&#x5219;&#x5339;&#x914D;&#x4EE3;&#x7406;&#x76F8;&#x5E94;&#x7684;&#x63A5;&#x53E3;&#x670D;&#x52A1;&#x4E0A;&#x3002;</p>
<h1 id="articleHeader2">&#x51C6;&#x5907;&#x5DE5;&#x4F5C;</h1>
<h3 id="articleHeader3">&#x5B89;&#x88C5;nginx</h3>
<p>&#x8FD9;&#x8FB9;&#x4EE5;Centos&#x4E3A;&#x4F8B;&#x4E3A;&#x4F8B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum install nginx" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">yum <span class="hljs-keyword">install</span> nginx</code></pre>
<blockquote>&#x8FD9;&#x91CC;&#x6709;&#x4E2A;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x5C3D;&#x91CF;&#x4FDD;&#x8BC1;nginx&#x5168;&#x5C40;&#x547D;&#x4EE4;&#x662F;&#x53EF;&#x7528;&#xFF0C;&#x6709;&#x4E0D;&#x5C11;&#x516C;&#x53F8;nginx&#x547D;&#x4EE4;&#x4E0D;&#x662F;&#x5168;&#x5C40;&#x7684;&#xFF0C;&#x5982;&#x4F55;&#x5728;&#x5BF9;&#x5E94;&#x7684;<strong>roo.config.js</strong>&#x4E2D;&#x505A;&#x4E00;&#x4E0B;&#x8BBE;&#x7F6E;&#xFF0C;&#x540E;&#x9762;&#x6211;&#x4EEC;&#x4F1A;&#x8BB2;&#x5230;&#x3002;</blockquote>
<h3 id="articleHeader4">&#x8BBE;&#x7F6E;&#x597D;&#x76F8;&#x5E94;&#x7684;&#x76EE;&#x5F55;</h3>
<p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8BBE;&#x5B9A;&#x4E00;&#x4E0B;&#x4E09;&#x4E2A;&#x76EE;&#x5F55;&#xFF1A;</p>
<ul>
<li>&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x5B58;&#x653E;&#x76EE;&#x5F55;   &#x4F8B;&#x5982;&#xFF1A;/root/app</li>
<li>&#x524D;&#x7AEF;&#x9879;&#x76EE;nginx&#x914D;&#x7F6E;&#x5B58;&#x653E;&#x76EE;&#x5F55;  &#x4F8B;&#x5982;&#xFF1A;/root/nginx</li>
<li>&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x5907;&#x4EFD;&#x76EE;&#x5F55; &#x4F8B;&#x5982;&#xFF1A;/root/backup</li>
</ul>
<h3 id="articleHeader5">&#x914D;&#x7F6E;nginx&#x6587;&#x4EF6;</h3>
<p>&#x8BBE;&#x7F6E;&#x4E00;&#x4E0B;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x662F;<strong>/etc/nginx/nginx.conf</strong>&#x3002;&#x5F53;&#x7136;&#x6839;&#x636E;&#x6BCF;&#x4E2A;&#x516C;&#x53F8;&#x4E0D;&#x540C;&#x60C5;&#x51B5;&#x627E;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
http{
    include /root/nginx/*.conf;  
}
...
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code>...
http{
    <span class="hljs-meta"><span class="hljs-meta-keyword">include</span> /root/nginx/*.conf;</span>  
}
...
</code></pre>
<p><strong>include /root/nginx/*.conf;</strong></p>
<blockquote>&#x8FD9;&#x53E5;&#x8BDD;&#x8868;&#x793A;<strong>/root/nginx</strong>&#x4E0B;&#x6240;&#x6709;&#x4EE5;<strong>.conf</strong>&#x7ED3;&#x5C3E;&#x7684;&#x6587;&#x4EF6;&#x90FD;&#x4F1A;&#x88AB;&#x52A0;&#x8F7D;&#x8FDB;&#x6765;&#xFF0C;&#x800C;<strong>/root/nginx</strong>&#x662F;&#x6211;&#x4EEC;&#x6240;&#x8BBE;&#x5B9A;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x5B58;&#x653E;&#x76EE;&#x5F55;&#x3002;</blockquote>
<h3 id="articleHeader6">&#x542F;&#x52A8;Nginx</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nginx -c /etc/nginx/nginx.conf  //&#x542F;&#x52A8;nginx&#xFF0C;&#x5E76;&#x786E;&#x5B9A;&#x524D;&#x9762;&#x914D;&#x7F6E;&#x662F;&#x5426;&#x6B63;&#x786E;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>nginx -c /etc/nginx/nginx<span class="hljs-selector-class">.conf</span>  <span class="hljs-comment">//&#x542F;&#x52A8;nginx&#xFF0C;&#x5E76;&#x786E;&#x5B9A;&#x524D;&#x9762;&#x914D;&#x7F6E;&#x662F;&#x5426;&#x6B63;&#x786E;</span>
</code></pre>
<p>&#x4E0A;&#x9762;&#x547D;&#x4EE4;&#x4EC5;&#x4F5C;&#x53C2;&#x8003;&#xFF0C;&#x5177;&#x4F53;&#x6839;&#x636E;&#x60C5;&#x51B5;&#x6765;&#x5B9A;&#x3002;</p>
<p>&#x6211;&#x4EEC;&#x8BBF;&#x95EE;&#x8D44;&#x6E90;&#x7684;&#x65F6;&#x5019;&#x6709;&#x4E9B;&#x4EBA;&#x4F1A;&#x9047;&#x5230;nginx&#x629B;&#x51FA;<strong>403 Forbidden</strong>&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x8FD9;&#x662F;&#x662F;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x6700;&#x4E0A;&#x9762;&#x7684;<strong>user</strong>&#x8BBE;&#x7F6E;&#x7684;&#x7528;&#x6237;&#x6743;&#x9650;&#x4E0D;&#x591F;&#xFF0C;&#x53EF;&#x4EE5;&#x6539;&#x6210;<strong>user root</strong>&#x6765;&#x89E3;&#x51B3;&#x3002;</p>
<h1 id="articleHeader7">&#x652F;&#x6301;&#x529F;&#x80FD;</h1>
<blockquote>&#x4EE5;&#x4E0B;&#x56DB;&#x4E2A;&#x529F;&#x80FD;&#x5747;&#x652F;&#x6301;<strong>-c</strong>&#x6216;&#x8005;<strong>--config</strong>&#x6307;&#x5B9A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;.&#x5982;&#x679C;&#x672A;&#x6307;&#x5B9A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x5219;&#x9ED8;&#x8BA4;&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x53BB;<strong>roo.config.js</strong>&#x4F5C;&#x4E3A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3002;</blockquote>
<h2 id="articleHeader8">roo backup</h2>
<p>&#x8BE5;&#x547D;&#x4EE4;&#x7528;&#x4E8E;&#x5907;&#x4EFD;&#x6211;&#x4EEC;&#x7684;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x5305;&#xFF0C;&#x8FD9;&#x6837;&#x6709;&#x5229;&#x4E8E;&#x6211;&#x4EEC;&#x505A;&#x7248;&#x672C;&#x7684;&#x7BA1;&#x7406;&#x3002;&#x5F53;&#x7EBF;&#x4E0A;&#x51FA;&#x73B0;&#x91CD;&#x5927;&#x95EE;&#x9898;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x4EE5;&#x53CA;&#x65F6;&#x62FF;&#x8FC7;&#x6765;&#x505A;&#x7248;&#x672C;&#x56DE;&#x6EDA;&#x3002;</p>
<p>&#x6267;&#x884C;<strong>roo backup</strong>&#x547D;&#x4EE4;&#xFF0C;&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E86;NODE_ENV=production&#x5219;&#x4F1A;&#x5728;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x4E0A;&#x7684;<strong>backupDirectory</strong>&#x91CC;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x201C;<strong>production_YYYYMMDD</strong>&#x201D;&#x7684;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x5305;&#xFF0C;&#x82E5;&#x672A;&#x8BBE;&#x7F6E;&#x5219;&#x751F;&#x6210;&#x4E00;&#x4E2A;<br>&#x201C;<strong>test_YYYYMMDD</strong>&#x201D;&#x7684;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x5305;&#xFF0C;&#x5176;&#x4E2D;<strong>YYYYMMDD</strong>&#x4E3A;&#x5F53;&#x5929;&#x7684;&#x5E74;&#x6708;&#x65E5;&#xFF0C;&#x5F53;&#x5929;&#x4E0A;&#x4F20;&#x591A;&#x6B21;&#x4E5F;&#x53EA;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5305;&#xFF0C;&#x540E;&#x7EED;&#x4E0A;&#x4F20;&#x7684;&#x5C06;&#x4F1A;&#x8986;&#x76D6;&#x4E4B;&#x524D;&#x4E0A;&#x4F20;&#x7684;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x3002;</p>
<p><strong>&#x4EE5;&#x4E0B;&#x4E3A;&#x5FC5;&#x987B;&#x914D;&#x7F6E;&#x9879;&#xFF1A;</strong></p>
<p><strong>roo.config.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports={
  local:{
    resourceDirectory:&apos;&lt;&#x672C;&#x5730;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x6240;&#x5728;&#x76EE;&#x5F55;&#xFF0C;&#x8BE5;&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x5185;&#x5BB9;&#x5C06;&#x4F1A;&#x5168;&#x90E8;&#x4E0A;&#x4F20;&gt;&apos;
  },
  origin:{
    host:&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;IP&gt;&apos;,
    username: &apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x7528;&#x6237;&#x540D;&gt;&apos;,
    password: &apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5BC6;&#x7801;&gt;&apos;,
    backupDirectory:&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5907;&#x4EFD;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x7684;&#x76EE;&#x5F55;&gt;&apos;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xquery"><code>module.exports={
  local:{
    resourceDirectory:<span class="hljs-string">&apos;&lt;&#x672C;&#x5730;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x6240;&#x5728;&#x76EE;&#x5F55;&#xFF0C;&#x8BE5;&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x5185;&#x5BB9;&#x5C06;&#x4F1A;&#x5168;&#x90E8;&#x4E0A;&#x4F20;&gt;&apos;</span>
  },
  origin:{
    host:<span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;IP&gt;&apos;</span>,
    username: <span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x7528;&#x6237;&#x540D;&gt;&apos;</span>,
    password: <span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5BC6;&#x7801;&gt;&apos;</span>,
    backupDirectory:<span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5907;&#x4EFD;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x7684;&#x76EE;&#x5F55;&gt;&apos;</span>
  }
}</code></pre>
<h2 id="articleHeader9">roo nginx</h2>
<p>&#x8BE5;&#x547D;&#x4EE4;&#x7528;&#x4E8E;&#x751F;&#x6210;&#x9879;&#x76EE;&#x5BF9;&#x5E94;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x66F4;&#x65B0;&#x7EBF;&#x4E0A;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3002;&#x6267;&#x884C;roo nginx&#x6587;&#x4EF6;&#x4E4B;&#x540E;&#xFF0C;&#x4F1A;&#x5728;<strong>roo.config.js</strong>&#x4E2D;&#x6307;&#x5B9A;&#x7684;<strong>local.nginxConfigFilePath</strong>&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x66F4;&#x65B0;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x4E0A;&#x7684;<strong>roo.config.js</strong>&#x4E2D;&#x6307;&#x5B9A;&#x7684;<strong>origin.nginxConfigFilePath</strong>&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x6267;&#x884C;nginx&#x7684;reload&#x64CD;&#x4F5C;&#x3002;</p>
<p><strong>&#x4EE5;&#x4E0B;&#x4E3A;&#x5FC5;&#x987B;&#x914D;&#x7F6E;&#x9879;&#xFF1A;</strong></p>
<p><strong>roo.config.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports={
  local:{
     nginxConfigTemplate:&apos;&lt;roo nginx nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x751F;&#x6210;&#x6240;&#x7528;&#x6A21;&#x677F;&gt;&apos;
     nginxConfigFilePath:&apos;&lt;roo nginx nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x751F;&#x6210;&#x8DEF;&#x5F84;&gt;&apos;
  },
  origin:{
    host:&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;IP&gt;&apos;,
    username: &apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x7528;&#x6237;&#x540D;&gt;&apos;,
    password: &apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5BC6;&#x7801;&gt;&apos;,
    nginxConfigFilePath:&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x4E0A;&#x8BE5;&#x9879;&#x76EE;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x6B64;&#x6587;&#x4EF6;&#x5C06;&#x4F1A;&#x88AB;nginx&#x4E3B;&#x6587;&#x4EF6;include&gt;&apos;    
  },
//nginxConfig&#x91CC;&#x7684;&#x53C2;&#x6570;&#x5C06;&#x7528;&#x4E8E;&#x751F;&#x6210;&#x672C;&#x9879;&#x76EE;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;
  nginxConfig:{
    port:&apos;&lt;&#x5F00;&#x653E;&#x7AEF;&#x53E3;&gt;&apos;,
    serverName&#xFF1A;&apos;&lt;&#x670D;&#x52A1;&#x540D;&#x79F0;&gt;&apos;,
    publicPath:&apos;&lt;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x76EE;&#x5F55;&gt;&apos;&#xFF0C;
    //locations&#x5C06;&#x5BF9;&#x4E8E;nginx&#x91CC;&#x9762;&#x7684;location
    locations:[
        {
            path:&apos;&lt;&#x5339;&#x914D;&#x8DEF;&#x5F84;&gt;&apos;,
            //&#x5BF9;&#x5E94;location&#x4E2D;&#x7684;&#x914D;&#x7F6E;&#x9879;
            configs:[
                {
                    key:&apos;proxy_redirect&apos;,
                    value:&apos;off&apos;
                },
                {
                    key:&apos;proxy_set_header&apos;,
                    value:&apos;Host $host&apos;
                },
                {
                    key:&apos;proxy_pass&apos;,
                    value:&apos;&#x4EE3;&#x7406;&#x8DEF;&#x5F84;&apos;
                },
            ]
        }
    ]
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xquery"><code>module.exports={
  local:{
     nginxConfigTemplate:<span class="hljs-string">&apos;&lt;roo nginx nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x751F;&#x6210;&#x6240;&#x7528;&#x6A21;&#x677F;&gt;&apos;</span>
     nginxConfigFilePath:<span class="hljs-string">&apos;&lt;roo nginx nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x751F;&#x6210;&#x8DEF;&#x5F84;&gt;&apos;</span>
  },
  origin:{
    host:<span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;IP&gt;&apos;</span>,
    username: <span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x7528;&#x6237;&#x540D;&gt;&apos;</span>,
    password: <span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5BC6;&#x7801;&gt;&apos;</span>,
    nginxConfigFilePath:<span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x4E0A;&#x8BE5;&#x9879;&#x76EE;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x6B64;&#x6587;&#x4EF6;&#x5C06;&#x4F1A;&#x88AB;nginx&#x4E3B;&#x6587;&#x4EF6;include&gt;&apos;</span>    
  },
//nginxConfig&#x91CC;&#x7684;&#x53C2;&#x6570;&#x5C06;&#x7528;&#x4E8E;&#x751F;&#x6210;&#x672C;&#x9879;&#x76EE;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;
  nginxConfig:{
    port:<span class="hljs-string">&apos;&lt;&#x5F00;&#x653E;&#x7AEF;&#x53E3;&gt;&apos;</span>,
    serverName&#xFF1A;<span class="hljs-string">&apos;&lt;&#x670D;&#x52A1;&#x540D;&#x79F0;&gt;&apos;</span>,
    publicPath:<span class="hljs-string">&apos;&lt;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x76EE;&#x5F55;&gt;&apos;</span>&#xFF0C;
    //locations&#x5C06;&#x5BF9;&#x4E8E;nginx&#x91CC;&#x9762;&#x7684;location
    locations:[
        {
            path:<span class="hljs-string">&apos;&lt;&#x5339;&#x914D;&#x8DEF;&#x5F84;&gt;&apos;</span>,
            //&#x5BF9;&#x5E94;location&#x4E2D;&#x7684;&#x914D;&#x7F6E;&#x9879;
            configs:[
                {
                    key:<span class="hljs-string">&apos;proxy_redirect&apos;</span>,
                    value:<span class="hljs-string">&apos;off&apos;</span>
                },
                {
                    key:<span class="hljs-string">&apos;proxy_set_header&apos;</span>,
                    value:<span class="hljs-string">&apos;Host $host&apos;</span>
                },
                {
                    key:<span class="hljs-string">&apos;proxy_pass&apos;</span>,
                    value:<span class="hljs-string">&apos;&#x4EE3;&#x7406;&#x8DEF;&#x5F84;&apos;</span>
                },
            ]
        }
    ]
  }
}</code></pre>
<p><strong>&#x9ED8;&#x8BA4;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x6A21;&#x677F;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
  listen       "{{"port"}}";
  server_name  "{{"serverName"}}";
  location / {
    root        "{{"publicPath"}}";
    try_files $uri /index.html;
    location ~ .*\.(ico|js|css|gif|jpg|jpeg|png|bmp|swf)$ {}
  }
  "{{"#each locations"}}"
  location "{{"this.path"}}" {
    "{{"#each this.configs"}}"
    "{{"this.key"}}" "{{"this.value"}}";
    "{{"/each"}}"
  }
  "{{"/each"}}"
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xquery"><code>server {
  listen       "{{"port"}}";
  server_name  "{{"serverName"}}";
  location / {
    root        "{{"publicPath"}}";
    try_files $uri /index.html;
    location ~ .*\.(ico|js|css|gif|jpg|jpeg|png|bmp|swf)$ {}
  }
  "{{"#each locations"}}"
  location "{{"this.path"}}" {
    "{{"#each this.configs"}}"
    "{{"this.key"}}" "{{"this.value"}}";
    "{{"/each"}}"
  }
  "{{"/each"}}"
}</code></pre>
<h2 id="articleHeader10">roo port</h2>
<p>&#x8BE5;&#x547D;&#x4EE4;&#x7528;&#x4E8E;&#x68C0;&#x67E5;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x7684;&#x7AEF;&#x53E3;&#x5360;&#x7528;&#x60C5;&#x51B5;&#x3002;</p>
<ul><li>-p &#x6216;&#x8005; --port  |  &#x4F1A;&#x68C0;&#x6D4B;&#x8BE5;&#x7AEF;&#x53E3;&#x662F;&#x5426;&#x5360;&#x7528;&#xFF0C;&#x82E5;&#x5360;&#x7528;&#x4F1A;&#x663E;&#x793A;&#x76F8;&#x5173;&#x4F7F;&#x7528;&#x60C5;&#x51B5;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="roo port  // &#x4F1A;&#x62C9;&#x53D6;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x4E0A;&#x6240;&#x6709;&#x5DF2;&#x5360;&#x7528;&#x7684;&#x7AEF;&#x53E3;&#x60C5;&#x51B5;

roo port -p 8000  //&#x68C0;&#x6D4B;8000&#x7AEF;&#x53E3;&#x662F;&#x5426;&#x5360;&#x7528;&#xFF0C;&#x82E5;&#x5360;&#x7528;&#x663E;&#x793A;&#x88AB;&#x4F7F;&#x7528;&#x60C5;&#x51B5;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>roo port  <span class="hljs-comment">// &#x4F1A;&#x62C9;&#x53D6;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x4E0A;&#x6240;&#x6709;&#x5DF2;&#x5360;&#x7528;&#x7684;&#x7AEF;&#x53E3;&#x60C5;&#x51B5;</span>

roo port -<span class="hljs-selector-tag">p</span> <span class="hljs-number">8000</span>  <span class="hljs-comment">//&#x68C0;&#x6D4B;8000&#x7AEF;&#x53E3;&#x662F;&#x5426;&#x5360;&#x7528;&#xFF0C;&#x82E5;&#x5360;&#x7528;&#x663E;&#x793A;&#x88AB;&#x4F7F;&#x7528;&#x60C5;&#x51B5;</span></code></pre>
<p><strong>&#x4EE5;&#x4E0B;&#x4E3A;&#x5FC5;&#x987B;&#x914D;&#x7F6E;&#x9879;&#xFF1A;</strong></p>
<p><strong>roo.config.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports={
    origin:{
        host:&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;IP&gt;&apos;,
        username: &apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x7528;&#x6237;&#x540D;&gt;&apos;,
        password: &apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5BC6;&#x7801;&gt;&apos;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>={
    origin:{
        host:<span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;IP&gt;&apos;</span>,
        username: <span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x7528;&#x6237;&#x540D;&gt;&apos;</span>,
        password: <span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5BC6;&#x7801;&gt;&apos;</span>
    }
}</code></pre>
<h2 id="articleHeader11">roo publish</h2>
<p>&#x8BE5;&#x547D;&#x4EE4;&#x5C06;<strong>roo.config.js</strong>&#x6587;&#x4EF6;&#x4E2D;<strong>local.resourceDirectory</strong>&#x6307;&#x5B9A;&#x7684;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x76EE;&#x5F55;&#x5185;&#x7684;&#x8D44;&#x6E90;&#x4E0A;&#x4F20;&#x5230;<strong>origin.resourceDirectory</strong>&#x76EE;&#x5F55;&#x4E0B;&#x3002;<strong>origin.resourceDirectory</strong>&#x6307;&#x5B9A;&#x7684;&#x76EE;&#x5F55;&#x4E5F;&#x4F1A;&#x8DDF;<strong>nginxConfig.publicPath</strong>&#x6307;&#x5B9A;&#x7684;&#x76EE;&#x5F55;&#x76F8;&#x5BF9;&#x5E94;&#x3002;</p>
<p><strong>&#x4EE5;&#x4E0B;&#x4E3A;&#x5FC5;&#x987B;&#x914D;&#x7F6E;&#x9879;&#xFF1A;</strong></p>
<p><strong>roo.config.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports={
    local:{
        resourceDirectory:&apos;&lt;&#x672C;&#x5730;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x6240;&#x5728;&#x76EE;&#x5F55;&#xFF0C;&#x8BE5;&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x5185;&#x5BB9;&#x5C06;&#x4F1A;&#x5168;&#x90E8;&#x4E0A;&#x4F20;&gt;&apos;
    }    
    origin:{
        host:&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;IP&gt;&apos;,
        username: &apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x7528;&#x6237;&#x540D;&gt;&apos;,
        password: &apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5BC6;&#x7801;&gt;&apos;,
        resourceDirectory:&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5B58;&#x5728;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x7684;&#x76EE;&#x5F55;&#xFF0C;&#x4E0A;&#x4F20;&#x7684;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x5C06;&#x4F1A;&#x5B58;&#x5728;&#x8FD9;&#x91CC;&gt;&apos;,
        nginxConfigFilePath:&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x4E0A;&#x8BE5;&#x9879;&#x76EE;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x6B64;&#x6587;&#x4EF6;&#x5C06;&#x4F1A;&#x88AB;nginx&#x4E3B;&#x6587;&#x4EF6;include&gt;&apos;  
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xquery"><code>module.exports={
    local:{
        resourceDirectory:<span class="hljs-string">&apos;&lt;&#x672C;&#x5730;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x6240;&#x5728;&#x76EE;&#x5F55;&#xFF0C;&#x8BE5;&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x5185;&#x5BB9;&#x5C06;&#x4F1A;&#x5168;&#x90E8;&#x4E0A;&#x4F20;&gt;&apos;</span>
    }    
    origin:{
        host:<span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;IP&gt;&apos;</span>,
        username: <span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x7528;&#x6237;&#x540D;&gt;&apos;</span>,
        password: <span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5BC6;&#x7801;&gt;&apos;</span>,
        resourceDirectory:<span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5B58;&#x5728;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x7684;&#x76EE;&#x5F55;&#xFF0C;&#x4E0A;&#x4F20;&#x7684;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x5C06;&#x4F1A;&#x5B58;&#x5728;&#x8FD9;&#x91CC;&gt;&apos;</span>,
        nginxConfigFilePath:<span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x4E0A;&#x8BE5;&#x9879;&#x76EE;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x6B64;&#x6587;&#x4EF6;&#x5C06;&#x4F1A;&#x88AB;nginx&#x4E3B;&#x6587;&#x4EF6;include&gt;&apos;</span>  
    }
}</code></pre>
<h1 id="articleHeader12">roo.config.js&#x914D;&#x7F6E;&#x53C2;&#x6570;&#x8BF4;&#x660E;</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports={
  local:{
    resourceDirectory:&apos;&lt;&#x672C;&#x5730;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x6240;&#x5728;&#x76EE;&#x5F55;&#xFF0C;&#x8BE5;&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x5185;&#x5BB9;&#x5C06;&#x4F1A;&#x5168;&#x90E8;&#x4E0A;&#x4F20;&gt;&apos;,
    nginxConfigFilePath:&apos;&lt;roo nginx nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x751F;&#x6210;&#x8DEF;&#x5F84;&gt;&apos;
  },
  origin:{
    host:&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;IP&gt;&apos;,
    username: &apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x7528;&#x6237;&#x540D;&gt;&apos;,
    password: &apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5BC6;&#x7801;&gt;&apos;,
    resourceDirectory:&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5B58;&#x5728;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x7684;&#x76EE;&#x5F55;&#xFF0C;&#x4E0A;&#x4F20;&#x7684;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x5C06;&#x4F1A;&#x5B58;&#x5728;&#x8FD9;&#x91CC;&gt;&apos;,
    backupDirectory:&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5907;&#x4EFD;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x7684;&#x76EE;&#x5F55;&gt;&apos;
    nginxConfigFilePath:&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x4E0A;&#x8BE5;&#x9879;&#x76EE;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x6B64;&#x6587;&#x4EF6;&#x5C06;&#x4F1A;&#x88AB;nginx&#x4E3B;&#x6587;&#x4EF6;include&gt;&apos;    
  },
 //nginxConfig&#x91CC;&#x7684;&#x53C2;&#x6570;&#x5C06;&#x7528;&#x4E8E;&#x751F;&#x6210;&#x672C;&#x9879;&#x76EE;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;
  nginxConfig:{
    port:&apos;&lt;&#x5F00;&#x653E;&#x7AEF;&#x53E3;&gt;&apos;,
    serverName&#xFF1A;&apos;&lt;&#x670D;&#x52A1;&#x540D;&#x79F0;&gt;&apos;,
    publicPath:&apos;&lt;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x76EE;&#x5F55;&gt;&apos;&#xFF0C;
    //locations&#x5C06;&#x5BF9;&#x4E8E;nginx&#x91CC;&#x9762;&#x7684;location
    locations:[
        {
            path:&apos;&lt;&#x5339;&#x914D;&#x8DEF;&#x5F84;&gt;&apos;,
            //&#x5BF9;&#x5E94;location&#x4E2D;&#x7684;&#x914D;&#x7F6E;&#x9879;
            configs:[
                {
                    key:&apos;proxy_redirect&apos;,
                    value:&apos;off&apos;
                },
                {
                    key:&apos;proxy_set_header&apos;,
                    value:&apos;Host $host&apos;
                },
                {
                    key:&apos;proxy_pass&apos;,
                    value:&apos;&#x4EE3;&#x7406;&#x8DEF;&#x5F84;&apos;
                },
            ]
        }
    ]
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xquery"><code>module.exports={
  local:{
    resourceDirectory:<span class="hljs-string">&apos;&lt;&#x672C;&#x5730;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x6240;&#x5728;&#x76EE;&#x5F55;&#xFF0C;&#x8BE5;&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x5185;&#x5BB9;&#x5C06;&#x4F1A;&#x5168;&#x90E8;&#x4E0A;&#x4F20;&gt;&apos;</span>,
    nginxConfigFilePath:<span class="hljs-string">&apos;&lt;roo nginx nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x751F;&#x6210;&#x8DEF;&#x5F84;&gt;&apos;</span>
  },
  origin:{
    host:<span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;IP&gt;&apos;</span>,
    username: <span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x7528;&#x6237;&#x540D;&gt;&apos;</span>,
    password: <span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5BC6;&#x7801;&gt;&apos;</span>,
    resourceDirectory:<span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5B58;&#x5728;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x7684;&#x76EE;&#x5F55;&#xFF0C;&#x4E0A;&#x4F20;&#x7684;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x5C06;&#x4F1A;&#x5B58;&#x5728;&#x8FD9;&#x91CC;&gt;&apos;</span>,
    backupDirectory:<span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x5907;&#x4EFD;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x7684;&#x76EE;&#x5F55;&gt;&apos;</span>
    nginxConfigFilePath:<span class="hljs-string">&apos;&lt;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x4E0A;&#x8BE5;&#x9879;&#x76EE;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x6B64;&#x6587;&#x4EF6;&#x5C06;&#x4F1A;&#x88AB;nginx&#x4E3B;&#x6587;&#x4EF6;include&gt;&apos;</span>    
  },
 //nginxConfig&#x91CC;&#x7684;&#x53C2;&#x6570;&#x5C06;&#x7528;&#x4E8E;&#x751F;&#x6210;&#x672C;&#x9879;&#x76EE;&#x7684;nginx&#x914D;&#x7F6E;&#x6587;&#x4EF6;
  nginxConfig:{
    port:<span class="hljs-string">&apos;&lt;&#x5F00;&#x653E;&#x7AEF;&#x53E3;&gt;&apos;</span>,
    serverName&#xFF1A;<span class="hljs-string">&apos;&lt;&#x670D;&#x52A1;&#x540D;&#x79F0;&gt;&apos;</span>,
    publicPath:<span class="hljs-string">&apos;&lt;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x76EE;&#x5F55;&gt;&apos;</span>&#xFF0C;
    //locations&#x5C06;&#x5BF9;&#x4E8E;nginx&#x91CC;&#x9762;&#x7684;location
    locations:[
        {
            path:<span class="hljs-string">&apos;&lt;&#x5339;&#x914D;&#x8DEF;&#x5F84;&gt;&apos;</span>,
            //&#x5BF9;&#x5E94;location&#x4E2D;&#x7684;&#x914D;&#x7F6E;&#x9879;
            configs:[
                {
                    key:<span class="hljs-string">&apos;proxy_redirect&apos;</span>,
                    value:<span class="hljs-string">&apos;off&apos;</span>
                },
                {
                    key:<span class="hljs-string">&apos;proxy_set_header&apos;</span>,
                    value:<span class="hljs-string">&apos;Host $host&apos;</span>
                },
                {
                    key:<span class="hljs-string">&apos;proxy_pass&apos;</span>,
                    value:<span class="hljs-string">&apos;&#x4EE3;&#x7406;&#x8DEF;&#x5F84;&apos;</span>
                },
            ]
        }
    ]
  }
}</code></pre>
<h1 id="articleHeader13">&#x5C55;&#x671B;</h1>
<h2 id="articleHeader14">roo create</h2>
<p>&#x76EE;&#x524D;&#x888B;&#x9F20;&#x4E91;&#x8FD9;&#x8FB9;&#x7684;&#x9879;&#x76EE;&#x6784;&#x5EFA;&#x5DE5;&#x5177;&#x91C7;&#x7528;&#x7684;&#x662F;Yeoman&#x7684;&#x6784;&#x5EFA;&#x4F53;&#x7CFB;&#xFF0C;&#x53EF;&#x4EE5;&#x6EE1;&#x8DB3;&#x888B;&#x9F20;&#x4E91;&#x8FD9;&#x8FB9;&#x5BF9;&#x9879;&#x76EE;&#x6784;&#x5EFA;&#x7684;&#x9700;&#x6C42;&#x3002;&#x4F46;&#x662F;&#x6709;&#x70B9;&#x5C0F;&#x5C0F;&#x4E0D;&#x8DB3;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x5C31;&#x662F;&#x6BCF;&#x6B21;&#x9879;&#x76EE;&#x6A21;&#x677F;&#x66F4;&#x65B0;&#x4E4B;&#x540E;&#x90FD;&#x8981;&#x91CD;&#x65B0;&#x53D1;&#x5E03;Yeoman&#x7684;&#x811A;&#x624B;&#x67B6;&#xFF0C;&#x7075;&#x6D3B;&#x6027;&#x76F8;&#x5BF9;&#x8F83;&#x5DEE;&#x3002;&#x540E;&#x9762;&#x6253;&#x7B97;&#x628A;&#x9879;&#x76EE;&#x7684;&#x751F;&#x6210;&#x7684;&#x5DE5;&#x4F5C;&#x4EA4;&#x7ED9;dtux-kangaroo&#xFF0C;&#x5E76;&#x4E14;&#x6240;&#x6709;&#x9879;&#x76EE;&#x6A21;&#x677F;&#x5747;&#x653E;&#x5728;github&#x4E0A;&#xFF0C;&#x6BCF;&#x6B21;&#x751F;&#x6210;&#x9879;&#x76EE;&#x90FD;&#x4F1A;&#x4ECE;github&#x91CD;&#x65B0;&#x62C9;&#xFF0C;&#x6A21;&#x677F;&#x8D21;&#x732E;&#x8005;&#x53EA;&#x9700;&#x8981;&#x5173;&#x6CE8;&#x81EA;&#x5DF1;&#x7684;github&#x4ED3;&#x5E93;&#x5373;&#x53EF;&#xFF0C;&#x53EA;&#x8981;&#x5C06;&#x66F4;&#x65B0;&#x5408;&#x5E76;&#x5230;master&#x5206;&#x652F;&#x4E0A;&#xFF0C;&#x540E;&#x7EED;&#x9879;&#x76EE;&#x751F;&#x6210;&#x5747;&#x4F1A;&#x63D0;&#x5230;&#x66F4;&#x65B0;&#x3002;&#x5F53;&#x7136;&#x5728;&#x73B0;&#x6709;&#x7684;Yeoman&#x7684;&#x811A;&#x624B;&#x67B6;&#x6539;&#x9020;&#x4E5F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x540C;&#x6837;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4F46;&#x662F;&#x672C;&#x7740;&#x5DE5;&#x5177;&#x7CBE;&#x7B80;&#x7684;&#x539F;&#x5219;&#xFF0C;&#x4F1A;&#x5C06;&#x73B0;&#x6709;&#x7684;Yeoman&#x7684;&#x811A;&#x624B;&#x67B6;&#x8FC1;&#x5230;dtux-kangaroo&#x5E76;&#x8FDB;&#x884C;&#x6539;&#x9020;&#x3002;</p>
<h2 id="articleHeader15">roo mock</h2>
<p>&#x76EE;&#x524D;&#x888B;&#x9F20;&#x4E91;&#x91C7;&#x7528;&#x7684;&#x662F;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x4F46;&#x662F;&#x5F00;&#x53D1;&#x4E2D;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x4F9D;&#x8D56;&#x540E;&#x7AEF;&#x7684;&#xFF0C;&#x63A5;&#x53E3;&#x6570;&#x636E;mock&#x8FD8;&#x4E0D;&#x662F;&#x5F88;&#x5B8C;&#x5584;&#x3002;&#x540E;&#x9762;&#x8BA1;&#x5212;&#x52A0;&#x5165;<strong>roo mock</strong>&#x6765;&#x89E3;&#x51B3;&#x6570;&#x636E;mock&#x95EE;&#x9898;&#xFF0C;&#x521D;&#x6B65;&#x60F3;&#x6CD5;&#x662F;&#x501F;&#x52A9;&#x540E;&#x7AEF;&#x7684;swagger&#x6765;&#x5B9E;&#x73B0;&#x63A5;&#x53E3;&#x6570;&#x636E;mock&#x3002;</p>
<h2 id="articleHeader16">&#x5728;dtux-kangaroo&#x4E0A;&#x57FA;&#x7840;&#x505A;&#x4E00;&#x4E2A;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x53D1;&#x5E03;&#x5E73;&#x53F0;</h2>
<p>dtux-kangaroo&#x5DF2;&#x7ECF;&#x9A8C;&#x8BC1;&#x4E86;&#x8FD9;&#x5957;&#x53D1;&#x5E03;&#x4F53;&#x7CFB;&#x7684;&#x53EF;&#x884C;&#x6027;&#xFF0C;&#x4E5F;&#x89E3;&#x51B3;&#x4E86;&#x5982;&#x4F55;&#x4E0E;&#x8FDC;&#x7A0B;&#x673A;&#x5668;&#x7684;&#x4EA4;&#x4E92;&#x7684;&#x95EE;&#x9898;&#x3002;&#x4E3A;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x53D1;&#x5E03;&#x5E73;&#x53F0;&#x7684;&#x642D;&#x5EFA;&#x6253;&#x4E0B;&#x5F88;&#x597D;&#x7684;&#x57FA;&#x7840;&#x3002;&#x540E;&#x9762;&#x8BA1;&#x5212;&#x642D;&#x5EFA;&#x8FD9;&#x4E2A;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x53D1;&#x5E03;&#x5E73;&#x53F0;&#xFF0C;&#x63D0;&#x9AD8;&#x524D;&#x7AEF;&#x8D44;&#x6E90;&#x53D1;&#x5E03;&#x7684;&#x6548;&#x7387;&#xFF0C;&#x51CF;&#x5C11;&#x5BF9;&#x8FD0;&#x7EF4;&#x7684;&#x4F9D;&#x8D56;&#x3002;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
袋鼠云前端项目发布工具dtux-kangaroo

## 原文链接
[https://segmentfault.com/a/1190000015211887](https://segmentfault.com/a/1190000015211887)

