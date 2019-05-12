---
title: 'Vue 动态路由的实现(后台传递路由，前端拿到并生成侧边栏)' 
date: 2018-11-26 2:30:09
hidden: true
slug: k9kr87zgctb
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x5730;&#x72F1;&#x7A7A;&#x8361;&#x8361;&#xFF0C;&#x5E08;&#x5144;&#x5728;&#x571F;&#x521B;&#x3002;&#x867D;&#x7136;&#x571F;&#xFF0C;&#x4F46;&#x662F;&#x53EF;&#x4EE5;&#x7597;&#x4F24;&#x3002;</blockquote><h2 id="articleHeader0">&#x524D;&#x8A00;</h2><blockquote>vue&#x9879;&#x76EE;&#x5B9E;&#x73B0;<strong>&#x52A8;&#x6001;&#x8DEF;&#x7531;</strong>&#x7684;&#x65B9;&#x5F0F;&#x5927;&#x4F53;&#x53EF;&#x5206;&#x4E3A;&#x4E24;&#x79CD;:<br><strong>1.&#x524D;&#x7AEF;&#x8FD9;&#x8FB9;&#x628A;&#x8DEF;&#x7531;&#x5199;&#x597D;&#xFF0C;&#x767B;&#x5F55;&#x7684;&#x65F6;&#x5019;&#x6839;&#x636E;&#x7528;&#x6237;&#x7684;&#x89D2;&#x8272;&#x6743;&#x9650;&#x6765;&#x52A8;&#x6001;&#x5C55;&#x793A;&#x8DEF;&#x7531;&#xFF0C;(&#x524D;&#x7AEF;&#x63A7;&#x5236;&#x8DEF;&#x7531;)</strong><br>&#x8BE6;&#x60C5;&#x53EF;&#x53C2;&#x9605;<strong>&#x82B1;&#x88E4;&#x8869;&#x5927;&#x4F6C;</strong>&#x7684;&#x9879;&#x76EE;<a href="https://segmentfault.com/a/1190000009275424">&#x624B;&#x628A;&#x624B;...</a>,&#x6211;&#x5F53;&#x65F6;&#x770B;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x770B;&#x4E86;&#x597D;&#x4E45;&#x624D;&#x660E;&#x767D;&#x4E00;&#x70B9;&#x903B;&#x8F91;&#xFF0C;<br>&#x56E0;&#x4E3A;&#x5927;&#x795E;&#x7684;&#x52A8;&#x6001;&#x8DEF;&#x7531;&#x90A3;&#x91CC;&#x6709;&#x597D;&#x591A;&#x5C42;&#x5224;&#x65AD;&#xFF0C;&#x5E76;&#x4E14;&#x7A7F;&#x63D2;&#x5404;&#x79CD;vuex&#xFF0C;&#x628A;&#x5C0F;&#x767D;&#x7684;&#x6211;&#x90FD;&#x5FEB;&#x641E;&#x61F5;&#x903C;&#x4E86;&#xFF0C;&#x5BF9;&#x6211;&#x542F;&#x53D1;&#x5F88;&#x5927;&#xFF0C;&#x4E5F;&#x6B63;&#x662F;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x7ED9;&#x6211;&#x63D0;&#x4F9B;&#x4E86;&#x5F88;&#x591A;&#x903B;&#x8F91;<br><strong>2.&#x540E;&#x53F0;&#x4F20;&#x6765;&#x5F53;&#x524D;&#x7528;&#x6237;&#x5BF9;&#x5E94;&#x6743;&#x9650;&#x7684;&#x8DEF;&#x7531;&#x8868;&#xFF0C;&#x524D;&#x7AEF;&#x901A;&#x8FC7;&#x8C03;&#x63A5;&#x53E3;&#x62FF;&#x5230;&#x540E;&#x5904;&#x7406;(&#x540E;&#x7AEF;&#x5904;&#x7406;&#x8DEF;&#x7531;)</strong><br>&#x8FD9;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#x5404;&#x6709;&#x4F18;&#x70B9;&#xFF0C;&#x6548;&#x679C;&#x90FD;&#x80FD;&#x5B9E;&#x73B0;&#xFF0C;&#x6211;&#x4EEC;&#x516C;&#x53F8;&#x662F;&#x901A;&#x8FC7;&#x7B2C;&#x4E8C;&#x4E2D;&#x79CD;&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x539F;&#x56E0;&#x5C31;&#x662F;&#x516C;&#x53F8;&#x9879;&#x76EE;&#x91CC;&#x6709;&#x4E00;&#x4E2A;&#x4E13;&#x95E8;&#x7684;&#x7528;&#x6237;&#x4E2D;&#x5FC3;&#xFF0C;&#x91CC;&#x8FB9;&#x903B;&#x8F91;&#x5F88;&#x590D;&#x6742;&#xFF0C;&#x4E0D;&#x597D;&#x8FD4;&#x7ED9;&#x524D;&#x7AEF;&#x7528;&#x6237;&#x6743;&#x9650;&#xFF0C;&#x62C5;&#x5FC3;&#x8DEF;&#x7531;&#x653E;&#x5230;&#x524D;&#x7AEF;<br>&#x4E0D;&#x5B89;&#x5168;(&#x4EE5;&#x4E0A;&#x7684;&#x8BDD;&#x662F;&#x516C;&#x53F8;&#x7684;&#x540E;&#x53F0;&#x540C;&#x5B66;&#x8BB2;&#x7684;)&#xFF0C;&#x90A3;&#x597D;&#x5427;&#xFF0C;&#x62B1;&#x7740;&#x90FD;&#x8BD5;&#x8BD5;&#x3001;&#x953B;&#x70BC;&#x4E0B;&#x81EA;&#x5DF1;&#x80FD;&#x529B;&#x7684;&#x6001;&#x5EA6;&#xFF0C;<br>&#x6211;&#x4EEC;&#x641E;&#x4E86;&#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x6CD5;&#x3002;</blockquote><p><strong>&#x4ECA;&#x5929;&#x6211;&#x4EEC;&#x6765;&#x8BB2;&#x8BB2;&#x7528;&#x540E;&#x53F0;&#x4F20;&#x9012;&#x8DEF;&#x7531;&#x8868;&#x5B9E;&#x73B0;&#x52A8;&#x6001;&#x8DEF;&#x7531;&#x7684;&#x601D;&#x8DEF;&#xFF0C;&#x56E0;&#x4E3A;&#x516C;&#x53F8;&#x7684;&#x9879;&#x76EE;&#x91CC;&#x8DEF;&#x6709;&#x90E8;&#x5206;&#x7528;&#x5230;&#x4E86;vuex&#xFF0C;&#x6211;&#x5C31;&#x628A;&#x8DEF;&#x7531;&#x90E8;&#x5206;&#x8131;&#x79BB;vuex&#x6574;&#x7406;&#x4E86;&#x51FA;&#x6765;&#xFF0C;&#x8BA9;&#x5927;&#x5BB6;&#x6709;&#x4E2A;&#x542F;&#x53D1;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x7EDD;&#x5BF9;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x53EA;&#x662F;&#x601D;&#x8DEF;</strong><br><strong>github:</strong><a href="https://github.com/Mrblackant/dynamicRouter" rel="nofollow noreferrer" target="_blank">https://github.com/Mrblackant...</a><br><strong>&#x5728;&#x7EBF;&#x67E5;&#x770B;:<a href="http://an888.net/antRouter/#/dashboard" rel="nofollow noreferrer" target="_blank">http://an888.net/antRouter/#/...</a></strong><br><span class="img-wrap"><img data-src="/img/bVbcRxb?w=599&amp;h=293" src="https://static.alili.tech/img/bVbcRxb?w=599&amp;h=293" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x601D;&#x8DEF;&#x6574;&#x7406;</h2><p>&#x4EE5;&#x4E0B;&#x56DB;&#x6B65;&#x9AA4;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x5728;&#x4E0B;&#x65B9;&#x4F1A;&#x8BB2;&#x5230;&#xFF0C;&#x5E76;&#x4E14;&#x662F;&#x5BF9;&#x5E94;&#x7684;</p><blockquote>1.&#x540E;&#x53F0;&#x540C;&#x5B66;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;json&#x683C;&#x5F0F;&#x7684;&#x8DEF;&#x7531;&#x8868;&#xFF0C;&#x6211;&#x7528;easymock&#x9020;&#x4E86;&#x4E00;&#x6BB5;:<a href="https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter" rel="nofollow noreferrer" target="_blank">&#x52A8;&#x6001;&#x8DEF;&#x7531;&#x8868;</a>&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x53C2;&#x8003;;<br>2.&#x56E0;&#x4E3A;&#x540E;&#x7AEF;&#x540C;&#x5B66;&#x4F20;&#x56DE;&#x6765;&#x7684;&#x90FD;&#x662F;<strong>&#x5B57;&#x7B26;&#x4E32;&#x683C;&#x5F0F;</strong>&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x524D;&#x7AEF;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x5BF9;&#x8C61;&#x554A;&#xFF0C;&#x5199;&#x4E2A;&#x65B9;&#x6CD5;&#x904D;&#x5386;&#x4E00;&#x4E0B;&#xFF0C;&#x5C06;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x6362;&#x4E3A;&#x7EC4;&#x4EF6;&#x5BF9;&#x8C61;;<br>3.&#x5229;&#x7528;vue-router&#x7684;beforeEach&#x3001;addRoutes&#x3001;localStorage&#x6765;&#x914D;&#x5408;&#x4E0A;&#x8FB9;&#x4E24;&#x6B65;&#x5B9E;&#x73B0;&#x6548;&#x679C;;<br>4.&#x5DE6;&#x4FA7;&#x83DC;&#x5355;&#x680F;&#x6839;&#x636E;&#x62FF;&#x5230;&#x8F6C;&#x6362;&#x597D;&#x7684;&#x8DEF;&#x7531;&#x5217;&#x8868;&#x8FDB;&#x884C;&#x5C55;&#x793A;;<br><strong>&#x5927;&#x4F53;&#x6B65;&#x9AA4;&#xFF1A;&#x62E6;&#x622A;&#x8DEF;&#x7531;-&gt;&#x540E;&#x53F0;&#x53D6;&#x5230;&#x8DEF;&#x7531;-&gt;&#x4FDD;&#x5B58;&#x8DEF;&#x7531;&#x5230;localStorage(&#x7528;&#x6237;&#x767B;&#x5F55;&#x8FDB;&#x6765;&#x53EA;&#x4F1A;&#x4ECE;&#x540E;&#x53F0;&#x53D6;&#x4E00;&#x6B21;&#xFF0C;&#x5176;&#x4F59;&#x90FD;&#x4ECE;&#x672C;&#x5730;&#x53D6;,&#x6240;&#x4EE5;&#x7528;&#x6237;&#xFF0C;&#x53EA;&#x6709;&#x9000;&#x51FA;&#x5728;&#x767B;&#x5F55;&#x8DEF;&#x7531;&#x624D;&#x4F1A;&#x66F4;&#x65B0;)</strong></blockquote><h2 id="articleHeader2">&#x4EE3;&#x7801;</h2><p><strong>1.&#x8DEF;&#x7531;&#x8868;</strong></p><blockquote>&#x6BCF;&#x4E2A;&#x8DEF;&#x7531;&#x90FD;&#x4F7F;&#x7528;&#x5230;&#x7EC4;&#x4EF6;<strong>Layout</strong>,&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x662F;&#x6574;&#x4F53;&#x7684;&#x9875;&#x9762;&#x5E03;&#x5C40;:&#x5DE6;&#x4FA7;&#x83DC;&#x5355;&#x5217;&#xFF0C;&#x53F3;&#x4FA7;&#x9875;&#x9762;,&#x6240;&#x4EE5;children&#x4E0B;&#x8FB9;&#x7684;&#x7B2C;&#x4E00;&#x7EA7;&#x8DEF;&#x7531;&#x5C31;&#x662F;&#x4F60;&#x81EA;&#x5DF1;&#x7684;&#x5F00;&#x53D1;&#x7684;&#x9875;&#x9762;,meta&#x91CC;&#x5305;&#x542B;&#x7740;&#x8DEF;&#x7531;&#x7684;&#x540D;&#x5B57;&#xFF0C;&#x4EE5;&#x53CA;&#x8DEF;&#x7531;&#x5BF9;&#x5E94;&#x7684;icon;<br>&#x56E0;&#x4E3A;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x591A;&#x7EA7;&#x83DC;&#x5355;&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x51FA;&#x73B0;children&#x4E0B;&#x8FB9;&#x5D4C;&#x5957;children&#x7684;&#x60C5;&#x51B5;;<br><strong>&#x8DEF;&#x7531;&#x662F;&#x6570;&#x7EC4;&#x683C;&#x5F0F;</strong></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;data&quot;: {
    &quot;router&quot;: [
      {
        &quot;path&quot;: &quot;&quot;,
        &quot;component&quot;: &quot;Layout&quot;,
        &quot;redirect&quot;: &quot;dashboard&quot;,
        &quot;children&quot;: [
          {
            &quot;path&quot;: &quot;dashboard&quot;,
            &quot;component&quot;: &quot;dashboard/index&quot;,
            &quot;meta&quot;: {
              &quot;title&quot;: &quot;&#x9996;&#x9875;&quot;,
              &quot;icon&quot;: &quot;dashboard&quot;
            }
          }
        ]
      },
      {
        &quot;path&quot;: &quot;/example&quot;,
        &quot;component&quot;: &quot;Layout&quot;,
        &quot;redirect&quot;: &quot;/example/table&quot;,
        &quot;name&quot;: &quot;Example&quot;,
        &quot;meta&quot;: {
          &quot;title&quot;: &quot;&#x6848;&#x4F8B;&quot;,
          &quot;icon&quot;: &quot;example&quot;
        },
        &quot;children&quot;: [
          {
            &quot;path&quot;: &quot;table&quot;,
            &quot;name&quot;: &quot;Table&quot;,
            &quot;component&quot;: &quot;table/index&quot;,
            &quot;meta&quot;: {
              &quot;title&quot;: &quot;&#x8868;&#x683C;&quot;,
              &quot;icon&quot;: &quot;table&quot;
            }
          },
          {
            &quot;path&quot;: &quot;tree&quot;,
            &quot;name&quot;: &quot;Tree&quot;,
            &quot;component&quot;: &quot;tree/index&quot;,
            &quot;meta&quot;: {
              &quot;title&quot;: &quot;&#x6811;&#x5F62;&#x83DC;&#x5355;&quot;,
              &quot;icon&quot;: &quot;tree&quot;
            }
          }
        ]
      },
      {
        &quot;path&quot;: &quot;/form&quot;,
        &quot;component&quot;: &quot;Layout&quot;,
        &quot;children&quot;: [
          {
            &quot;path&quot;: &quot;index&quot;,
            &quot;name&quot;: &quot;Form&quot;,
            &quot;component&quot;: &quot;form/index&quot;,
            &quot;meta&quot;: {
              &quot;title&quot;: &quot;&#x8868;&#x5355;&quot;,
              &quot;icon&quot;: &quot;form&quot;
            }
          }
        ]
      },
      {
        &quot;path&quot;: &quot;*&quot;,
        &quot;redirect&quot;: &quot;/404&quot;,
        &quot;hidden&quot;: true
      }
    ]
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-string">&quot;data&quot;</span>: {
    <span class="hljs-string">&quot;router&quot;</span>: [
      {
        <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
        <span class="hljs-string">&quot;component&quot;</span>: <span class="hljs-string">&quot;Layout&quot;</span>,
        <span class="hljs-string">&quot;redirect&quot;</span>: <span class="hljs-string">&quot;dashboard&quot;</span>,
        <span class="hljs-string">&quot;children&quot;</span>: [
          {
            <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;dashboard&quot;</span>,
            <span class="hljs-string">&quot;component&quot;</span>: <span class="hljs-string">&quot;dashboard/index&quot;</span>,
            <span class="hljs-string">&quot;meta&quot;</span>: {
              <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;&#x9996;&#x9875;&quot;</span>,
              <span class="hljs-string">&quot;icon&quot;</span>: <span class="hljs-string">&quot;dashboard&quot;</span>
            }
          }
        ]
      },
      {
        <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/example&quot;</span>,
        <span class="hljs-string">&quot;component&quot;</span>: <span class="hljs-string">&quot;Layout&quot;</span>,
        <span class="hljs-string">&quot;redirect&quot;</span>: <span class="hljs-string">&quot;/example/table&quot;</span>,
        <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Example&quot;</span>,
        <span class="hljs-string">&quot;meta&quot;</span>: {
          <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;&#x6848;&#x4F8B;&quot;</span>,
          <span class="hljs-string">&quot;icon&quot;</span>: <span class="hljs-string">&quot;example&quot;</span>
        },
        <span class="hljs-string">&quot;children&quot;</span>: [
          {
            <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;table&quot;</span>,
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Table&quot;</span>,
            <span class="hljs-string">&quot;component&quot;</span>: <span class="hljs-string">&quot;table/index&quot;</span>,
            <span class="hljs-string">&quot;meta&quot;</span>: {
              <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;&#x8868;&#x683C;&quot;</span>,
              <span class="hljs-string">&quot;icon&quot;</span>: <span class="hljs-string">&quot;table&quot;</span>
            }
          },
          {
            <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;tree&quot;</span>,
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Tree&quot;</span>,
            <span class="hljs-string">&quot;component&quot;</span>: <span class="hljs-string">&quot;tree/index&quot;</span>,
            <span class="hljs-string">&quot;meta&quot;</span>: {
              <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;&#x6811;&#x5F62;&#x83DC;&#x5355;&quot;</span>,
              <span class="hljs-string">&quot;icon&quot;</span>: <span class="hljs-string">&quot;tree&quot;</span>
            }
          }
        ]
      },
      {
        <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/form&quot;</span>,
        <span class="hljs-string">&quot;component&quot;</span>: <span class="hljs-string">&quot;Layout&quot;</span>,
        <span class="hljs-string">&quot;children&quot;</span>: [
          {
            <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;index&quot;</span>,
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Form&quot;</span>,
            <span class="hljs-string">&quot;component&quot;</span>: <span class="hljs-string">&quot;form/index&quot;</span>,
            <span class="hljs-string">&quot;meta&quot;</span>: {
              <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;&#x8868;&#x5355;&quot;</span>,
              <span class="hljs-string">&quot;icon&quot;</span>: <span class="hljs-string">&quot;form&quot;</span>
            }
          }
        ]
      },
      {
        <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>,
        <span class="hljs-string">&quot;redirect&quot;</span>: <span class="hljs-string">&quot;/404&quot;</span>,
        <span class="hljs-string">&quot;hidden&quot;</span>: true
      }
    ]
  }</code></pre><p><strong>2.&#x5C06;&#x540E;&#x7AEF;&#x4F20;&#x56DE;&#x7684;&quot;component&quot;: &quot;Layout&quot;, &#x8F6C;&#x4E3A;&quot;component&quot;: Layout&#x7EC4;&#x4EF6;&#x5BF9;&#x8C61;</strong></p><blockquote>&#x56E0;&#x4E3A;&#x6709;&#x591A;&#x7EA7;&#x8DEF;&#x7531;&#x7684;&#x51FA;&#x73B0;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x5199;&#x6210;&#x904D;&#x5386;&#x9012;&#x5F52;&#x65B9;&#x6CD5;&#xFF0C;&#x786E;&#x4FDD;&#x628A;&#x6BCF;&#x4E2A;component&#x8F6C;&#x6210;&#x5BF9;&#x8C61;&#xFF0C;<br>&#x56E0;&#x4E3A;&#x540E;&#x53F0;&#x4F20;&#x56DE;&#x7684;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x628A;&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;&#x7684;&#x8FC7;&#x7A0B; &#x5C01;&#x88C5;&#x6210;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;(&#x6B64;&#x5904;&#x53C2;&#x8003;<strong>&#x82B1;&#x88E4;&#x8869;&#x5927;&#x795E;</strong>&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;)&#xFF0C;&#x7528;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5728;&#x904D;&#x5386;&#x4E2D;&#x4F7F;&#x7528;;&#x8BE6;&#x60C5;&#x67E5;&#x770B;&#x9879;&#x76EE;&#x91CC;&#x7684;router&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684; _import_development.js&#x548C;_import_production.js&#x6587;&#x4EF6;<br>Layout&#x6211;&#x653E;&#x7684;&#x76EE;&#x5F55;&#x8DDF;&#x5176;&#x4ED6;&#x6587;&#x4EF6;&#x7684;&#x76EE;&#x5F55;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x5728;&#x904D;&#x5386;&#x91CC;&#x5355;&#x72EC;&#x5904;&#x7406;&#xFF0C;&#x5404;&#x4F4D;&#x5C0F;&#x4F19;&#x4F34;&#x53EF;&#x81EA;&#x5DF1;&#x8C03;&#x6574;&#x54C8;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _import = require(&apos;./router/_import_&apos; + process.env.NODE_ENV)//&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;
import Layout from &apos;@/views/layout&apos; //Layout &#x662F;&#x67B6;&#x6784;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E0D;&#x5728;&#x540E;&#x53F0;&#x8FD4;&#x56DE;&#xFF0C;&#x5728;&#x6587;&#x4EF6;&#x91CC;&#x5355;&#x72EC;&#x5F15;&#x5165;

function filterAsyncRouter(asyncRouterMap) { //&#x904D;&#x5386;&#x540E;&#x53F0;&#x4F20;&#x6765;&#x7684;&#x8DEF;&#x7531;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8F6C;&#x6362;&#x4E3A;&#x7EC4;&#x4EF6;&#x5BF9;&#x8C61;
  const accessedRouters = asyncRouterMap.filter(route =&gt; {
    if (route.component) {
 **&#x52A0;&#x7C97;&#x6587;&#x5B57;**     if (route.component === &apos;Layout&apos;) {//Layout&#x7EC4;&#x4EF6;&#x7279;&#x6B8A;&#x5904;&#x7406;
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children &amp;&amp; route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> _import = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./router/_import_&apos;</span> + process.env.NODE_ENV)<span class="hljs-comment">//&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;</span>
<span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/views/layout&apos;</span> <span class="hljs-comment">//Layout &#x662F;&#x67B6;&#x6784;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E0D;&#x5728;&#x540E;&#x53F0;&#x8FD4;&#x56DE;&#xFF0C;&#x5728;&#x6587;&#x4EF6;&#x91CC;&#x5355;&#x72EC;&#x5F15;&#x5165;</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">filterAsyncRouter</span>(<span class="hljs-params">asyncRouterMap</span>) </span>{ <span class="hljs-comment">//&#x904D;&#x5386;&#x540E;&#x53F0;&#x4F20;&#x6765;&#x7684;&#x8DEF;&#x7531;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8F6C;&#x6362;&#x4E3A;&#x7EC4;&#x4EF6;&#x5BF9;&#x8C61;</span>
  <span class="hljs-keyword">const</span> accessedRouters = asyncRouterMap.filter(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (route.component) {
 **&#x52A0;&#x7C97;&#x6587;&#x5B57;**     <span class="hljs-keyword">if</span> (route.component === <span class="hljs-string">&apos;Layout&apos;</span>) {<span class="hljs-comment">//Layout&#x7EC4;&#x4EF6;&#x7279;&#x6B8A;&#x5904;&#x7406;</span>
        route.component = Layout
      } <span class="hljs-keyword">else</span> {
        route.component = _import(route.component)
      }
    }
    <span class="hljs-keyword">if</span> (route.children &amp;&amp; route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  })

  <span class="hljs-keyword">return</span> accessedRouters
}
</code></pre><p><strong>3.&#x4F7F;&#x7528;beforeEach&#x3001;addRoutes&#x3001;localStorage&#x6765;&#x914D;&#x5408;&#x5B9E;&#x73B0;</strong></p><blockquote>beforeEach&#x8DEF;&#x7531;&#x62E6;&#x622A;&#xFF0C;&#x8FDB;&#x5165;&#x5224;&#x65AD;&#xFF0C;&#x5982;&#x679C;&#x53D1;&#x73B0;&#x672C;&#x5730;&#x6CA1;&#x6709;&#x8DEF;&#x7531;&#x6570;&#x636E;&#xFF0C;&#x90A3;&#x5C31;&#x5229;&#x7528;axios&#x540E;&#x53F0;&#x53D6;&#x4E00;&#x6B21;&#xFF0C;&#x53D6;&#x5B8C;&#x4EE5;&#x540E;&#xFF0C;&#x5229;&#x7528;localStorage&#x5B58;&#x50A8;&#x8D77;&#x6765;&#xFF0C;&#x5229;&#x7528;addRoutes&#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x8DEF;&#x7531;&#xFF0C;<br><strong>ps&#xFF1A;beforeEach&#x597D;&#x574F;&#x554A;&#xFF0C;&#x4E00;&#x6B65;&#x5C0F;&#x5FC3;&#x5C31;&#x8FDB;&#x5165;&#x5230;&#x4E86;&#x4ED6;&#x7684;&#x6B7B;&#x5FAA;&#x73AF;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x90FD;tm&#x5D29;&#x4E86;&#xFF0C;&#x5F97;&#x5728;&#x4E00;&#x5F00;&#x59CB;&#x5C31;&#x52A0;&#x5224;&#x65AD;&#xFF0C;&#x62FF;&#x5230;&#x8DEF;&#x7531;&#x4E86;&#xFF0C;&#x5C31;&#x76F4;&#x63A5;next()&#xFF0C;&#x5624;&#x5624;&#x5624;</strong><br>global.antRouter&#x662F;&#x4E3A;&#x4E86;&#x4F20;&#x9012;&#x6570;&#x636E;&#x7ED9;&#x5DE6;&#x4FA7;&#x83DC;&#x5355;&#x7EC4;&#x4EF6;&#x8FDB;&#x884C;&#x6E32;&#x67D3;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from &apos;axios&apos;

var getRouter //&#x7528;&#x6765;&#x83B7;&#x53D6;&#x540E;&#x53F0;&#x62FF;&#x5230;&#x7684;&#x8DEF;&#x7531;

router.beforeEach((to, from, next) =&gt; {
  if (!getRouter) {//&#x4E0D;&#x52A0;&#x8FD9;&#x4E2A;&#x5224;&#x65AD;&#xFF0C;&#x8DEF;&#x7531;&#x4F1A;&#x9677;&#x5165;&#x6B7B;&#x5FAA;&#x73AF;
    if (!getObjArr(&apos;router&apos;)) {
      axios.get(&apos;https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter&apos;).then(res =&gt; {
        getRouter = res.data.data.router//&#x540E;&#x53F0;&#x62FF;&#x5230;&#x8DEF;&#x7531;
        saveObjArr(&apos;router&apos;, getRouter) //&#x5B58;&#x50A8;&#x8DEF;&#x7531;&#x5230;localStorage

        routerGo(to, next)//&#x6267;&#x884C;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x65B9;&#x6CD5;
      })
    } else {//&#x4ECE;localStorage&#x62FF;&#x5230;&#x4E86;&#x8DEF;&#x7531;
      getRouter = getObjArr(&apos;router&apos;)//&#x62FF;&#x5230;&#x8DEF;&#x7531;
      routerGo(to, next)
    }
  } else {
    next()
  }

})


function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter) //&#x8FC7;&#x6EE4;&#x8DEF;&#x7531;
  router.addRoutes(getRouter) //&#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x8DEF;&#x7531;
  global.antRouter = getRouter //&#x5C06;&#x8DEF;&#x7531;&#x6570;&#x636E;&#x4F20;&#x9012;&#x7ED9;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x505A;&#x4FA7;&#x8FB9;&#x680F;&#x83DC;&#x5355;&#x6E32;&#x67D3;&#x5DE5;&#x4F5C;
  next({ ...to, replace: true })
}

function saveObjArr(name, data) { //localStorage &#x5B58;&#x50A8;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;
  localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage &#x83B7;&#x53D6;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;
  return JSON.parse(window.localStorage.getItem(name));

}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>

<span class="hljs-keyword">var</span> getRouter <span class="hljs-comment">//&#x7528;&#x6765;&#x83B7;&#x53D6;&#x540E;&#x53F0;&#x62FF;&#x5230;&#x7684;&#x8DEF;&#x7531;</span>

router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (!getRouter) {<span class="hljs-comment">//&#x4E0D;&#x52A0;&#x8FD9;&#x4E2A;&#x5224;&#x65AD;&#xFF0C;&#x8DEF;&#x7531;&#x4F1A;&#x9677;&#x5165;&#x6B7B;&#x5FAA;&#x73AF;</span>
    <span class="hljs-keyword">if</span> (!getObjArr(<span class="hljs-string">&apos;router&apos;</span>)) {
      axios.get(<span class="hljs-string">&apos;https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        getRouter = res.data.data.router<span class="hljs-comment">//&#x540E;&#x53F0;&#x62FF;&#x5230;&#x8DEF;&#x7531;</span>
        saveObjArr(<span class="hljs-string">&apos;router&apos;</span>, getRouter) <span class="hljs-comment">//&#x5B58;&#x50A8;&#x8DEF;&#x7531;&#x5230;localStorage</span>

        routerGo(to, next)<span class="hljs-comment">//&#x6267;&#x884C;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x65B9;&#x6CD5;</span>
      })
    } <span class="hljs-keyword">else</span> {<span class="hljs-comment">//&#x4ECE;localStorage&#x62FF;&#x5230;&#x4E86;&#x8DEF;&#x7531;</span>
      getRouter = getObjArr(<span class="hljs-string">&apos;router&apos;</span>)<span class="hljs-comment">//&#x62FF;&#x5230;&#x8DEF;&#x7531;</span>
      routerGo(to, next)
    }
  } <span class="hljs-keyword">else</span> {
    next()
  }

})


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">routerGo</span>(<span class="hljs-params">to, next</span>) </span>{
  getRouter = filterAsyncRouter(getRouter) <span class="hljs-comment">//&#x8FC7;&#x6EE4;&#x8DEF;&#x7531;</span>
  router.addRoutes(getRouter) <span class="hljs-comment">//&#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x8DEF;&#x7531;</span>
  global.antRouter = getRouter <span class="hljs-comment">//&#x5C06;&#x8DEF;&#x7531;&#x6570;&#x636E;&#x4F20;&#x9012;&#x7ED9;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x505A;&#x4FA7;&#x8FB9;&#x680F;&#x83DC;&#x5355;&#x6E32;&#x67D3;&#x5DE5;&#x4F5C;</span>
  next({ ...to, <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span> })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">saveObjArr</span>(<span class="hljs-params">name, data</span>) </span>{ <span class="hljs-comment">//localStorage &#x5B58;&#x50A8;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;</span>
  localStorage.setItem(name, <span class="hljs-built_in">JSON</span>.stringify(data))
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getObjArr</span>(<span class="hljs-params">name</span>) </span>{ <span class="hljs-comment">//localStorage &#x83B7;&#x53D6;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">window</span>.localStorage.getItem(name));

}
</code></pre><p><strong>4.&#x62FF;&#x5230;&#x904D;&#x5386;&#x597D;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x8FDB;&#x884C;&#x5DE6;&#x4FA7;&#x83DC;&#x5355;&#x6E32;&#x67D3;</strong></p><blockquote>&#x4E0A;&#x8FB9;&#x7B2C;&#x4E09;&#x90E8;&#x4F1A;&#x7ED9; global.antRouter&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF08;&#x53EF;&#x4EE5;&#x7528;vuex&#x66FF;&#x4EE3;&#xFF09;&#xFF0C;&#x83DC;&#x5355;&#x90A3;&#x8FB9;&#x62FF;&#x5230;&#x8DEF;&#x7531;&#xFF0C;&#x8FDB;&#x884C;&#x6E32;&#x67D3;&#xFF0C;&#x8FD9;&#x91CC;&#x53C8;&#x662F;&#x53C2;&#x8003;&#x4E86;<strong>&#x82B1;&#x88E4;&#x8869;&#x5927;&#x795E;</strong>&#x7684;layout&#x90E8;&#x5206; ,&#x8FD9;&#x91CC;&#x6211;&#x5C31;&#x4E0D;&#x8D34;&#x4EE3;&#x7801;&#x4E86;</blockquote><p>&#x624D;&#x758F;&#x5B66;&#x6D45;&#xFF0C;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x591A;&#x591A;&#x6307;&#x6B63;&#xFF0C;&#x5C24;&#x5176;&#x5BF9;&#x4E8E;&#x8DEF;&#x7531;&#x62E6;&#x622A;&#x90A3;&#x90E8;&#x5206;&#xFF0C;&#x5E94;&#x8BE5;&#x8FD8;&#x6709;&#x5F88;&#x591A;&#x4F18;&#x5316;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6B22;&#x8FCE;&#x6307;&#x6B63;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 动态路由的实现(后台传递路由，前端拿到并生成侧边栏)

## 原文链接
[https://segmentfault.com/a/1190000015419713](https://segmentfault.com/a/1190000015419713)

