---
title: 'Golang Gin实践 连载十二 优化配置结构及实现图片上传' 
date: 2018-11-29 9:33:05
hidden: true
slug: moh5l86kz1
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">&#x4F18;&#x5316;&#x914D;&#x7F6E;&#x7ED3;&#x6784;&#x53CA;&#x5B9E;&#x73B0;&#x56FE;&#x7247;&#x4E0A;&#x4F20;</h1>
<p>&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/EDDYCJY/go-gin-example" rel="nofollow noreferrer" target="_blank">https://github.com/EDDYCJY/go...</a></p>
<p>&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x6240;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x70B9;&#x4E2A; Star &#x1F44D;</p>
<h2 id="articleHeader1">&#x524D;&#x8A00;</h2>
<p>&#x4E00;&#x5929;&#xFF0C;&#x4EA7;&#x54C1;&#x7ECF;&#x7406;&#x7A81;&#x7136;&#x8DDF;&#x4F60;&#x8BF4;&#x6587;&#x7AE0;&#x5217;&#x8868;&#xFF0C;&#x6CA1;&#x6709;&#x5C01;&#x9762;&#x56FE;&#xFF0C;&#x4E0D;&#x591F;&#x7F8E;&#x89C2;&#xFF0C;&#xFF01;&#xFF09;&amp;&#xFFE5;<em>&#xFF01;&amp;&#xFF09;#&amp;&#xFFE5;</em>&#xFF01;&#x52A0;&#x4E00;&#x4E2A;&#x5427;&#xFF0C;&#x51E0;&#x5206;&#x949F;&#x7684;&#x4E8B;</p>
<p>&#x4F60;&#x6253;&#x5F00;&#x4F60;&#x7684;&#x7A0B;&#x5E8F;&#xFF0C;&#x5206;&#x6790;&#x4E86;&#x4E00;&#x6CE2;&#x5199;&#x4E86;&#x4E2A;&#x6E05;&#x5355;&#xFF1A;</p>
<ul>
<li>&#x4F18;&#x5316;&#x914D;&#x7F6E;&#x7ED3;&#x6784;&#xFF08;&#x56E0;&#x4E3A;&#x914D;&#x7F6E;&#x9879;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#xFF09;</li>
<li>&#x62BD;&#x79BB; &#x539F; logging &#x7684; File &#x4FBF;&#x4E8E;&#x516C;&#x7528;&#xFF08;logging&#x3001;upload &#x5404;&#x4FDD;&#x6709;&#x4E00;&#x4EFD;&#x5E76;&#x4E0D;&#x5408;&#x9002;&#xFF09;</li>
<li>&#x5B9E;&#x73B0;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&#x63A5;&#x53E3;&#xFF08;&#x9700;&#x9650;&#x5236;&#x6587;&#x4EF6;&#x683C;&#x5F0F;&#x3001;&#x5927;&#x5C0F;&#xFF09;</li>
<li>&#x4FEE;&#x6539;&#x6587;&#x7AE0;&#x63A5;&#x53E3;&#xFF08;&#x9700;&#x652F;&#x6301;&#x5C01;&#x9762;&#x5730;&#x5740;&#x53C2;&#x6570;&#xFF09;</li>
<li>&#x589E;&#x52A0; blog_article &#xFF08;&#x6587;&#x7AE0;&#xFF09;&#x7684;&#x6570;&#x636E;&#x5E93;&#x5B57;&#x6BB5;</li>
<li>&#x5B9E;&#x73B0; http.FileServer</li>
</ul>
<p>&#x55EF;&#xFF0C;&#x4F60;&#x53D1;&#x73B0;&#x8981;&#x8F83;&#x4F18;&#x7684;&#x8BDD;&#xFF0C;&#x9700;&#x8981;&#x8C03;&#x6574;&#x90E8;&#x5206;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7ED3;&#x6784;&#xFF0C;&#x56E0;&#x4E3A;&#x529F;&#x80FD;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#xFF0C;&#x539F;&#x672C;&#x7684;&#x8BBE;&#x8BA1;&#x4E5F;&#x8981;&#x8DDF;&#x4E0A;&#x8282;&#x594F;</p>
<p>&#x4E5F;&#x5C31;&#x662F;&#x5728;&#x9002;&#x5F53;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53CA;&#x65F6;&#x4F18;&#x5316;</p>
<h2 id="articleHeader2">&#x4F18;&#x5316;&#x914D;&#x7F6E;&#x7ED3;&#x6784;</h2>
<h3 id="articleHeader3">&#x4E00;&#x3001;&#x8BB2;&#x89E3;</h3>
<p>&#x5728;&#x5148;&#x524D;&#x7AE0;&#x8282;&#x4E2D;&#xFF0C;&#x91C7;&#x7528;&#x4E86;&#x76F4;&#x63A5;&#x8BFB;&#x53D6; KEY &#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x5B58;&#x50A8;&#x914D;&#x7F6E;&#x9879;&#xFF0C;&#x800C;&#x672C;&#x6B21;&#x9700;&#x6C42;&#x4E2D;&#xFF0C;&#x9700;&#x8981;&#x589E;&#x52A0;&#x56FE;&#x7247;&#x7684;&#x914D;&#x7F6E;&#x9879;&#xFF0C;&#x603B;&#x4F53;&#x5C31;&#x6709;&#x4E9B;&#x5197;&#x4F59;&#x4E86;</p>
<p>&#x6211;&#x4EEC;&#x91C7;&#x7528;&#x4EE5;&#x4E0B;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#xFF1A;</p>
<ul>
<li>&#x6620;&#x5C04;&#x7ED3;&#x6784;&#x4F53;&#xFF1A;&#x4F7F;&#x7528; MapTo &#x6765;&#x8BBE;&#x7F6E;&#x914D;&#x7F6E;&#x53C2;&#x6570;</li>
<li>&#x914D;&#x7F6E;&#x7EDF;&#x7BA1;&#xFF1A;&#x6240;&#x6709;&#x7684;&#x914D;&#x7F6E;&#x9879;&#x7EDF;&#x7BA1;&#x5230; setting &#x4E2D;</li>
</ul>
<h4>&#x6620;&#x5C04;&#x7ED3;&#x6784;&#x4F53;&#xFF08;&#x793A;&#x4F8B;&#xFF09;</h4>
<p>&#x5728; go-ini &#x4E2D;&#x53EF;&#x4EE5;&#x91C7;&#x7528; MapTo &#x7684;&#x65B9;&#x5F0F;&#x6765;&#x6620;&#x5C04;&#x7ED3;&#x6784;&#x4F53;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Server struct {
    RunMode string
    HttpPort int
    ReadTimeout time.Duration
    WriteTimeout time.Duration
}

var ServerSetting = &amp;Server{}

func main() {
    Cfg, err := ini.Load(&quot;conf/app.ini&quot;)
    if err != nil {
        log.Fatalf(&quot;Fail to parse &apos;conf/app.ini&apos;: %v&quot;, err)
    }
    
    err = Cfg.Section(&quot;server&quot;).MapTo(ServerSetting)
    if err != nil {
        log.Fatalf(&quot;Cfg.MapTo ServerSetting err: %v&quot;, err)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="go hljs"><code class="go"><span class="hljs-keyword">type</span> Server <span class="hljs-keyword">struct</span> {
    RunMode <span class="hljs-keyword">string</span>
    HttpPort <span class="hljs-keyword">int</span>
    ReadTimeout time.Duration
    WriteTimeout time.Duration
}

<span class="hljs-keyword">var</span> ServerSetting = &amp;Server{}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    Cfg, err := ini.Load(<span class="hljs-string">&quot;conf/app.ini&quot;</span>)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatalf(<span class="hljs-string">&quot;Fail to parse &apos;conf/app.ini&apos;: %v&quot;</span>, err)
    }
    
    err = Cfg.Section(<span class="hljs-string">&quot;server&quot;</span>).MapTo(ServerSetting)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatalf(<span class="hljs-string">&quot;Cfg.MapTo ServerSetting err: %v&quot;</span>, err)
    }
}</code></pre>
<p>&#x5728;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x6CE8;&#x610F; ServerSetting &#x53D6;&#x4E86;&#x5730;&#x5740;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48; MapTo &#x5FC5;&#x987B;&#x5730;&#x5740;&#x5165;&#x53C2;&#x5462;&#xFF1F;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// MapTo maps section to given struct.
func (s *Section) MapTo(v interface{}) error {
    typ := reflect.TypeOf(v)
    val := reflect.ValueOf(v)
    if typ.Kind() == reflect.Ptr {
        typ = typ.Elem()
        val = val.Elem()
    } else {
        return errors.New(&quot;cannot map to non-pointer struct&quot;)
    }

    return s.mapTo(val, false)
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// MapTo maps section to given struct.</span>
func (s *Section) MapTo(v <span class="hljs-class"><span class="hljs-keyword">interface</span></span>{}) error {
    typ := reflect.TypeOf(v)
    <span class="hljs-keyword">val</span> := reflect.ValueOf(v)
    <span class="hljs-keyword">if</span> typ.Kind() == reflect.Ptr {
        typ = typ.Elem()
        <span class="hljs-keyword">val</span> = <span class="hljs-keyword">val</span>.Elem()
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> errors.New(<span class="hljs-string">&quot;cannot map to non-pointer struct&quot;</span>)
    }

    <span class="hljs-keyword">return</span> s.mapTo(<span class="hljs-keyword">val</span>, <span class="hljs-literal">false</span>)
}</code></pre>
<p>&#x5728; MapTo &#x4E2D; <code>typ.Kind() == reflect.Ptr</code> &#x7EA6;&#x675F;&#x4E86;&#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x6307;&#x9488;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x8FD4;&#x56DE; <code>cannot map to non-pointer struct</code> &#x7684;&#x9519;&#x8BEF;&#x3002;&#x8FD9;&#x4E2A;&#x662F;&#x8868;&#x9762;&#x539F;&#x56E0;</p>
<p>&#x66F4;&#x5F80;&#x5185;&#x63A2;&#x7A76;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F; <code>field.Set</code> &#x7684;&#x539F;&#x56E0;&#xFF0C;&#x5F53;&#x6267;&#x884C; <code>val := reflect.ValueOf(v)</code> &#xFF0C;&#x51FD;&#x6570;&#x901A;&#x8FC7;&#x4F20;&#x9012; <code>v</code> &#x62F7;&#x8D1D;&#x521B;&#x5EFA;&#x4E86; <code>val</code>&#xFF0C;&#x4F46;&#x662F; <code>val</code> &#x7684;&#x6539;&#x53D8;&#x5E76;&#x4E0D;&#x80FD;&#x66F4;&#x6539;&#x539F;&#x59CB;&#x7684; <code>v</code>&#xFF0C;&#x8981;&#x60F3; <code>val</code> &#x7684;&#x66F4;&#x6539;&#x80FD;&#x4F5C;&#x7528;&#x5230; <code>v</code>&#xFF0C;&#x5219;&#x5FC5;&#x987B;&#x4F20;&#x9012; <code>v</code> &#x7684;&#x5730;&#x5740;</p>
<p>&#x663E;&#x7136; go-ini &#x91CC;&#x4E5F;&#x662F;&#x5305;&#x542B;&#x4FEE;&#x6539;&#x539F;&#x59CB;&#x503C;&#x8FD9;&#x4E00;&#x9879;&#x529F;&#x80FD;&#x7684;&#xFF0C;&#x4F60;&#x89C9;&#x5F97;&#x662F;&#x4EC0;&#x4E48;&#x539F;&#x56E0;&#x5462;&#xFF1F;</p>
<h4>&#x914D;&#x7F6E;&#x7EDF;&#x7BA1;</h4>
<p>&#x5728;&#x5148;&#x524D;&#x7684;&#x7248;&#x672C;&#x4E2D;&#xFF0C;models &#x548C; file &#x7684;&#x914D;&#x7F6E;&#x662F;&#x5728;&#x81EA;&#x5DF1;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#x89E3;&#x6790;&#x7684;&#xFF0C;&#x800C;&#x5176;&#x4ED6;&#x5728; setting.go &#x4E2D;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5C06;&#x5176;&#x5728; setting &#x4E2D;&#x7EDF;&#x4E00;&#x63A5;&#x7BA1;</p>
<p>&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x60F3;&#xFF0C;&#x76F4;&#x63A5;&#x628A;&#x4E24;&#x8005;&#x7684;&#x914D;&#x7F6E;&#x9879;&#x590D;&#x5236;&#x7C98;&#x8D34;&#x5230; setting.go &#x7684; init &#x4E2D;&#xFF0C;&#x4E00;&#x4E0B;&#x5B50;&#x5C31;&#x5B8C;&#x4E8B;&#x4E86;&#xFF0C;&#x641E;&#x90A3;&#x4E48;&#x9EBB;&#x70E6;&#xFF1F;</p>
<p>&#x4F46;&#x4F60;&#x5728;&#x60F3;&#x60F3;&#xFF0C;&#x5148;&#x524D;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x5B58;&#x5728;&#x591A;&#x4E2A; init &#x51FD;&#x6570;&#xFF0C;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x5B58;&#x5728;&#x95EE;&#x9898;&#xFF0C;&#x65E0;&#x6CD5;&#x8FBE;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x8981;&#x6C42;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x8BD5;&#x8BD5;</p>
<p>&#xFF08;&#x6B64;&#x5904;&#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#x70B9;&#xFF09;</p>
<p>&#x5728; Go &#x4E2D;&#xFF0C;&#x5F53;&#x5B58;&#x5728;&#x591A;&#x4E2A; init &#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x4E3A;&#xFF1A;</p>
<ul>
<li>&#x76F8;&#x540C;&#x5305;&#x4E0B;&#x7684; init &#x51FD;&#x6570;&#xFF1A;&#x6309;&#x7167;&#x6E90;&#x6587;&#x4EF6;&#x7F16;&#x8BD1;&#x987A;&#x5E8F;&#x51B3;&#x5B9A;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF08;&#x9ED8;&#x8BA4;&#x6309;&#x6587;&#x4EF6;&#x540D;&#x6392;&#x5E8F;&#xFF09;</li>
<li>&#x4E0D;&#x540C;&#x5305;&#x4E0B;&#x7684; init &#x51FD;&#x6570;&#xFF1A;&#x6309;&#x7167;&#x5305;&#x5BFC;&#x5165;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x51B3;&#x5B9A;&#x5148;&#x540E;&#x987A;&#x5E8F;</li>
</ul>
<p>&#x6240;&#x4EE5;&#x8981;&#x907F;&#x514D;&#x591A; init &#x7684;&#x60C5;&#x51B5;&#xFF0C;<strong>&#x5C3D;&#x91CF;&#x7531;&#x7A0B;&#x5E8F;&#x628A;&#x63A7;&#x521D;&#x59CB;&#x5316;&#x7684;&#x5148;&#x540E;&#x987A;&#x5E8F;</strong></p>
<h3 id="articleHeader4">&#x4E8C;&#x3001;&#x843D;&#x5B9E;</h3>
<h4>&#x4FEE;&#x6539;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</h4>
<p>&#x6253;&#x5F00; conf/app.ini &#x5C06;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4FEE;&#x6539;&#x4E3A;&#x5927;&#x9A7C;&#x5CF0;&#x547D;&#x540D;&#xFF0C;&#x53E6;&#x5916;&#x6211;&#x4EEC;&#x589E;&#x52A0;&#x4E86; 5 &#x4E2A;&#x914D;&#x7F6E;&#x9879;&#x7528;&#x4E8E;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&#x7684;&#x529F;&#x80FD;&#xFF0C;4 &#x4E2A;&#x6587;&#x4EF6;&#x65E5;&#x5FD7;&#x65B9;&#x9762;&#x7684;&#x914D;&#x7F6E;&#x9879;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[app]
PageSize = 10
JwtSecret = 233

RuntimeRootPath = runtime/

ImagePrefixUrl = http://127.0.0.1:8000
ImageSavePath = upload/images/
# MB
ImageMaxSize = 5
ImageAllowExts = .jpg,.jpeg,.png

LogSavePath = logs/
LogSaveName = log
LogFileExt = log
TimeFormat = 20060102

[server]
#debug or release
RunMode = debug
HttpPort = 8000
ReadTimeout = 60
WriteTimeout = 60

[database]
Type = mysql
User = root
Password = rootroot
Host = 127.0.0.1:3306
Name = blog
TablePrefix = blog_" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-section">[app]</span>
<span class="hljs-attr">PageSize</span> = <span class="hljs-number">10</span>
<span class="hljs-attr">JwtSecret</span> = <span class="hljs-number">233</span>

<span class="hljs-attr">RuntimeRootPath</span> = runtime/

<span class="hljs-attr">ImagePrefixUrl</span> = http://<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8000</span>
<span class="hljs-attr">ImageSavePath</span> = upload/images/
<span class="hljs-comment"># MB</span>
<span class="hljs-attr">ImageMaxSize</span> = <span class="hljs-number">5</span>
<span class="hljs-attr">ImageAllowExts</span> = .jpg,.jpeg,.png

<span class="hljs-attr">LogSavePath</span> = logs/
<span class="hljs-attr">LogSaveName</span> = log
<span class="hljs-attr">LogFileExt</span> = log
<span class="hljs-attr">TimeFormat</span> = <span class="hljs-number">20060102</span>
<span class="hljs-section">
[server]</span>
<span class="hljs-comment">#debug or release</span>
<span class="hljs-attr">RunMode</span> = debug
<span class="hljs-attr">HttpPort</span> = <span class="hljs-number">8000</span>
<span class="hljs-attr">ReadTimeout</span> = <span class="hljs-number">60</span>
<span class="hljs-attr">WriteTimeout</span> = <span class="hljs-number">60</span>
<span class="hljs-section">
[database]</span>
<span class="hljs-attr">Type</span> = mysql
<span class="hljs-attr">User</span> = root
<span class="hljs-attr">Password</span> = rootroot
<span class="hljs-attr">Host</span> = <span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">3306</span>
<span class="hljs-attr">Name</span> = blog
<span class="hljs-attr">TablePrefix</span> = blog_</code></pre>
<h4>&#x4F18;&#x5316;&#x914D;&#x7F6E;&#x8BFB;&#x53D6;&#x53CA;&#x8BBE;&#x7F6E;&#x521D;&#x59CB;&#x5316;&#x987A;&#x5E8F;</h4>
<h5>&#x7B2C;&#x4E00;&#x6B65;</h5>
<p>&#x5C06;&#x6563;&#x843D;&#x5728;&#x5176;&#x4ED6;&#x6587;&#x4EF6;&#x91CC;&#x7684;&#x914D;&#x7F6E;&#x90FD;&#x5220;&#x6389;&#xFF0C;<strong>&#x7EDF;&#x4E00;&#x5728; setting &#x4E2D;&#x5904;&#x7406;</strong>&#x4EE5;&#x53CA;<strong>&#x4FEE;&#x6539; init &#x51FD;&#x6570;&#x4E3A; Setup &#x65B9;&#x6CD5;</strong></p>
<p>&#x6253;&#x5F00; pkg/setting/setting.go &#x6587;&#x4EF6;&#xFF0C;&#x4FEE;&#x6539;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package setting

import (
    &quot;log&quot;
    &quot;time&quot;

    &quot;github.com/go-ini/ini&quot;
)

type App struct {
    JwtSecret string
    PageSize int
    RuntimeRootPath string

    ImagePrefixUrl string
    ImageSavePath string
    ImageMaxSize int
    ImageAllowExts []string

    LogSavePath string
    LogSaveName string
    LogFileExt string
    TimeFormat string
}

var AppSetting = &amp;App{}

type Server struct {
    RunMode string
    HttpPort int
    ReadTimeout time.Duration
    WriteTimeout time.Duration
}

var ServerSetting = &amp;Server{}

type Database struct {
    Type string
    User string
    Password string
    Host string
    Name string
    TablePrefix string
}

var DatabaseSetting = &amp;Database{}

func Setup() {
    Cfg, err := ini.Load(&quot;conf/app.ini&quot;)
    if err != nil {
        log.Fatalf(&quot;Fail to parse &apos;conf/app.ini&apos;: %v&quot;, err)
    }

    err = Cfg.Section(&quot;app&quot;).MapTo(AppSetting)
    if err != nil {
        log.Fatalf(&quot;Cfg.MapTo AppSetting err: %v&quot;, err)
    }

    AppSetting.ImageMaxSize = AppSetting.ImageMaxSize * 1024 * 1024

    err = Cfg.Section(&quot;server&quot;).MapTo(ServerSetting)
    if err != nil {
        log.Fatalf(&quot;Cfg.MapTo ServerSetting err: %v&quot;, err)
    }

    ServerSetting.ReadTimeout = ServerSetting.ReadTimeout * time.Second
    ServerSetting.WriteTimeout = ServerSetting.ReadTimeout * time.Second

    err = Cfg.Section(&quot;database&quot;).MapTo(DatabaseSetting)
    if err != nil {
        log.Fatalf(&quot;Cfg.MapTo DatabaseSetting err: %v&quot;, err)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs vbscript"><code>package setting

import (
    <span class="hljs-string">&quot;log&quot;</span>
    <span class="hljs-string">&quot;time&quot;</span>

    <span class="hljs-string">&quot;github.com/go-ini/ini&quot;</span>
)

type App struct {
    JwtSecret <span class="hljs-built_in">string</span>
    PageSize <span class="hljs-built_in">int</span>
    RuntimeRootPath <span class="hljs-built_in">string</span>

    ImagePrefixUrl <span class="hljs-built_in">string</span>
    ImageSavePath <span class="hljs-built_in">string</span>
    ImageMaxSize <span class="hljs-built_in">int</span>
    ImageAllowExts []<span class="hljs-built_in">string</span>

    LogSavePath <span class="hljs-built_in">string</span>
    LogSaveName <span class="hljs-built_in">string</span>
    LogFileExt <span class="hljs-built_in">string</span>
    TimeFormat <span class="hljs-built_in">string</span>
}

var AppSetting = &amp;App{}

type <span class="hljs-built_in">Server</span> struct {
    RunMode <span class="hljs-built_in">string</span>
    HttpPort <span class="hljs-built_in">int</span>
    ReadTimeout <span class="hljs-built_in">time</span>.Duration
    WriteTimeout <span class="hljs-built_in">time</span>.Duration
}

var ServerSetting = &amp;<span class="hljs-built_in">Server</span>{}

type Database struct {
    Type <span class="hljs-built_in">string</span>
    User <span class="hljs-built_in">string</span>
    Password <span class="hljs-built_in">string</span>
    Host <span class="hljs-built_in">string</span>
    Name <span class="hljs-built_in">string</span>
    TablePrefix <span class="hljs-built_in">string</span>
}

var DatabaseSetting = &amp;Database{}

func Setup() {
    Cfg, <span class="hljs-built_in">err</span> := ini.Load(<span class="hljs-string">&quot;conf/app.ini&quot;</span>)
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">err</span> != nil {
        <span class="hljs-built_in">log</span>.Fatalf(<span class="hljs-string">&quot;Fail to parse &apos;conf/app.ini&apos;: %v&quot;</span>, <span class="hljs-built_in">err</span>)
    }

    <span class="hljs-built_in">err</span> = Cfg.Section(<span class="hljs-string">&quot;app&quot;</span>).MapTo(AppSetting)
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">err</span> != nil {
        <span class="hljs-built_in">log</span>.Fatalf(<span class="hljs-string">&quot;Cfg.MapTo AppSetting err: %v&quot;</span>, <span class="hljs-built_in">err</span>)
    }

    AppSetting.ImageMaxSize = AppSetting.ImageMaxSize * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>

    <span class="hljs-built_in">err</span> = Cfg.Section(<span class="hljs-string">&quot;server&quot;</span>).MapTo(ServerSetting)
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">err</span> != nil {
        <span class="hljs-built_in">log</span>.Fatalf(<span class="hljs-string">&quot;Cfg.MapTo ServerSetting err: %v&quot;</span>, <span class="hljs-built_in">err</span>)
    }

    ServerSetting.ReadTimeout = ServerSetting.ReadTimeout * <span class="hljs-built_in">time</span>.<span class="hljs-built_in">Second</span>
    ServerSetting.WriteTimeout = ServerSetting.ReadTimeout * <span class="hljs-built_in">time</span>.<span class="hljs-built_in">Second</span>

    <span class="hljs-built_in">err</span> = Cfg.Section(<span class="hljs-string">&quot;database&quot;</span>).MapTo(DatabaseSetting)
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">err</span> != nil {
        <span class="hljs-built_in">log</span>.Fatalf(<span class="hljs-string">&quot;Cfg.MapTo DatabaseSetting err: %v&quot;</span>, <span class="hljs-built_in">err</span>)
    }
}</code></pre>
<p>&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x505A;&#x4E86;&#x5982;&#x4E0B;&#x51E0;&#x4EF6;&#x4E8B;&#xFF1A;</p>
<ul>
<li>&#x7F16;&#x5199;&#x4E0E;&#x914D;&#x7F6E;&#x9879;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#x7684;&#x7ED3;&#x6784;&#x4F53;&#xFF08;App&#x3001;Server&#x3001;Database&#xFF09;</li>
<li>&#x4F7F;&#x7528; MapTo &#x5C06;&#x914D;&#x7F6E;&#x9879;&#x6620;&#x5C04;&#x5230;&#x7ED3;&#x6784;&#x4F53;&#x4E0A;</li>
<li>&#x5BF9;&#x4E00;&#x4E9B;&#x9700;&#x7279;&#x6B8A;&#x8BBE;&#x7F6E;&#x7684;&#x914D;&#x7F6E;&#x9879;&#x8FDB;&#x884C;&#x518D;&#x8D4B;&#x503C;</li>
</ul>
<p><strong>&#x9700;&#x8981;&#x4F60;&#x53BB;&#x505A;&#x7684;&#x4E8B;&#xFF1A;</strong></p>
<ul>
<li>&#x5C06; <a href="https://github.com/EDDYCJY/go-gin-example/blob/a338ddec103c9506b4c7ed16d9f5386040d99b4b/models/models.go#L23" rel="nofollow noreferrer" target="_blank">models.go</a>&#x3001;<a href="https://github.com/EDDYCJY/go-gin-example/blob/a338ddec103c9506b4c7ed16d9f5386040d99b4b/pkg/setting/setting.go#L23" rel="nofollow noreferrer" target="_blank">setting.go</a>&#x3001;<a href="https://github.com/EDDYCJY/go-gin-example/blob/a338ddec103c9506b4c7ed16d9f5386040d99b4b/pkg/logging/log.go#L32-L37" rel="nofollow noreferrer" target="_blank">pkg/logging/log.go</a> &#x7684; init &#x51FD;&#x6570;&#x4FEE;&#x6539;&#x4E3A; Setup &#x65B9;&#x6CD5;</li>
<li>&#x5C06; <a href="https://github.com/EDDYCJY/go-gin-example/blob/a338ddec103c9506b4c7ed16d9f5386040d99b4b/models/models.go#L23-L39" rel="nofollow noreferrer" target="_blank">models/models.go</a> &#x72EC;&#x7ACB;&#x8BFB;&#x53D6;&#x7684; DB &#x914D;&#x7F6E;&#x9879;&#x5220;&#x9664;&#xFF0C;&#x6539;&#x4E3A;&#x7EDF;&#x4E00;&#x8BFB;&#x53D6; setting</li>
<li>&#x5C06; <a href="https://github.com/EDDYCJY/go-gin-example/blob/a338ddec103c9506b4c7ed16d9f5386040d99b4b/pkg/logging/file.go#L10-L15" rel="nofollow noreferrer" target="_blank">pkg/logging/file</a> &#x72EC;&#x7ACB;&#x7684; LOG &#x914D;&#x7F6E;&#x9879;&#x5220;&#x9664;&#xFF0C;&#x6539;&#x4E3A;&#x7EDF;&#x4E00;&#x8BFB;&#x53D6; setting</li>
</ul>
<p>&#x8FD9;&#x51E0;&#x9879;&#x6BD4;&#x8F83;&#x57FA;&#x7840;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x8D34;&#x51FA;&#x6765;&#xFF0C;&#x6211;&#x5E0C;&#x671B;&#x4F60;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x52A8;&#x624B;&#xFF0C;&#x6709;&#x95EE;&#x9898;&#x7684;&#x8BDD;&#x53EF;&#x53F3;&#x62D0; <a href="https://github.com/EDDYCJY/go-gin-example" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x5730;&#x5740;</a></p>
<h5>&#x7B2C;&#x4E8C;&#x6B65;</h5>
<p>&#x5728;&#x8FD9;&#x4E00;&#x6B65;&#x6211;&#x4EEC;&#x8981;&#x8BBE;&#x7F6E;&#x521D;&#x59CB;&#x5316;&#x7684;&#x6D41;&#x7A0B;&#xFF0C;&#x6253;&#x5F00; main.go &#x6587;&#x4EF6;&#xFF0C;&#x4FEE;&#x6539;&#x5185;&#x5BB9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func main() {
    setting.Setup()
    models.Setup()
    logging.Setup()

    endless.DefaultReadTimeOut = setting.ServerSetting.ReadTimeout
    endless.DefaultWriteTimeOut = setting.ServerSetting.WriteTimeout
    endless.DefaultMaxHeaderBytes = 1 &lt;&lt; 20
    endPoint := fmt.Sprintf(&quot;:%d&quot;, setting.ServerSetting.HttpPort)

    server := endless.NewServer(endPoint, routers.InitRouter())
    server.BeforeBegin = func(add string) {
        log.Printf(&quot;Actual pid is %d&quot;, syscall.Getpid())
    }

    err := server.ListenAndServe()
    if err != nil {
        log.Printf(&quot;Server err: %v&quot;, err)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>func main() {
    setting.Setup()
    models.Setup()
    logging.Setup()

    endless<span class="hljs-selector-class">.DefaultReadTimeOut</span> = setting<span class="hljs-selector-class">.ServerSetting</span><span class="hljs-selector-class">.ReadTimeout</span>
    endless<span class="hljs-selector-class">.DefaultWriteTimeOut</span> = setting<span class="hljs-selector-class">.ServerSetting</span><span class="hljs-selector-class">.WriteTimeout</span>
    endless<span class="hljs-selector-class">.DefaultMaxHeaderBytes</span> = <span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">20</span>
    endPoint := fmt.Sprintf(<span class="hljs-string">&quot;:%d&quot;</span>, setting<span class="hljs-selector-class">.ServerSetting</span><span class="hljs-selector-class">.HttpPort</span>)

    server := endless.NewServer(endPoint, routers.InitRouter())
    server<span class="hljs-selector-class">.BeforeBegin</span> = func(add string) {
        log.Printf(<span class="hljs-string">&quot;Actual pid is %d&quot;</span>, syscall.Getpid())
    }

    err := server.ListenAndServe()
    <span class="hljs-keyword">if</span> err != nil {
        log.Printf(<span class="hljs-string">&quot;Server err: %v&quot;</span>, err)
    }
}</code></pre>
<p>&#x4FEE;&#x6539;&#x5B8C;&#x6BD5;&#x540E;&#xFF0C;&#x5C31;&#x6210;&#x529F;&#x5C06;&#x591A;&#x6A21;&#x5757;&#x7684;&#x521D;&#x59CB;&#x5316;&#x51FD;&#x6570;&#x653E;&#x5230;&#x542F;&#x52A8;&#x6D41;&#x7A0B;&#x4E2D;&#x4E86;&#xFF08;&#x5148;&#x540E;&#x987A;&#x5E8F;&#x4E5F;&#x53EF;&#x4EE5;&#x63A7;&#x5236;&#xFF09;</p>
<h5>&#x9A8C;&#x8BC1;</h5>
<p>&#x5728;&#x8FD9;&#x91CC;&#x4E3A;&#x6B62;&#xFF0C;&#x9488;&#x5BF9;&#x672C;&#x9700;&#x6C42;&#x7684;&#x914D;&#x7F6E;&#x4F18;&#x5316;&#x5C31;&#x5B8C;&#x6BD5;&#x4E86;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x6267;&#x884C; <code>go run main.go</code> &#x9A8C;&#x8BC1;&#x4E00;&#x4E0B;&#x4F60;&#x7684;&#x529F;&#x80FD;&#x662F;&#x5426;&#x6B63;&#x5E38;&#x54E6;</p>
<p>&#x987A;&#x5E26;&#x7559;&#x4E2A;&#x57FA;&#x7840;&#x95EE;&#x9898;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x601D;&#x8003;&#x4E0B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ServerSetting.ReadTimeout = ServerSetting.ReadTimeout * time.Second
ServerSetting.WriteTimeout = ServerSetting.ReadTimeout * time.Second" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs vbscript"><code>ServerSetting.ReadTimeout = ServerSetting.ReadTimeout * <span class="hljs-built_in">time</span>.<span class="hljs-built_in">Second</span>
ServerSetting.WriteTimeout = ServerSetting.ReadTimeout * <span class="hljs-built_in">time</span>.<span class="hljs-built_in">Second</span></code></pre>
<p>&#x82E5;&#x5C06; setting.go &#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x8FD9;&#x4E24;&#x884C;&#x5220;&#x9664;&#xFF0C;&#x4F1A;&#x51FA;&#x73B0;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;</p>
<h2 id="articleHeader5">&#x62BD;&#x79BB; File</h2>
<p>&#x5728;&#x5148;&#x524D;&#x7248;&#x672C;&#x4E2D;&#xFF0C;&#x5728; <a href="https://github.com/EDDYCJY/go-gin-example/blob/a338ddec103c9506b4c7ed16d9f5386040d99b4b/pkg/logging/file.go" rel="nofollow noreferrer" target="_blank">logging/file.go</a> &#x4E2D;&#x4F7F;&#x7528;&#x5230;&#x4E86; os &#x7684;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x524D;&#x671F;&#x89C4;&#x5212;&#x53D1;&#x73B0;&#xFF0C;&#x8FD9;&#x90E8;&#x5206;&#x5728;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&#x529F;&#x80FD;&#x4E2D;&#x53EF;&#x4EE5;&#x590D;&#x7528;</p>
<h3 id="articleHeader6">&#x7B2C;&#x4E00;&#x6B65;</h3>
<p>&#x5728; pkg &#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA; file/file.go &#xFF0C;&#x5199;&#x5165;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package file

import (
    &quot;os&quot;
    &quot;path&quot;
    &quot;mime/multipart&quot;
    &quot;io/ioutil&quot;
)

func GetSize(f multipart.File) (int, error) {
    content, err := ioutil.ReadAll(f)

    return len(content), err
}

func GetExt(fileName string) string {
    return path.Ext(fileName)
}

func CheckExist(src string) bool {
    _, err := os.Stat(src)

    return os.IsNotExist(err)
}

func CheckPermission(src string) bool {
    _, err := os.Stat(src)

    return os.IsPermission(err)
}

func IsNotExistMkDir(src string) error {
    if exist := CheckExist(src); exist == false {
        if err := MkDir(src); err != nil {
            return err
        }
    }

    return nil
}

func MkDir(src string) error {
    err := os.MkdirAll(src, os.ModePerm)
    if err != nil {
        return err
    }

    return nil
}

func Open(name string, flag int, perm os.FileMode) (*os.File, error) {
    f, err := os.OpenFile(name, flag, perm)
    if err != nil {
        return nil, err
    }

    return f, nil
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">package</span> file

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;os&quot;</span>
    <span class="hljs-string">&quot;path&quot;</span>
    <span class="hljs-string">&quot;mime/multipart&quot;</span>
    <span class="hljs-string">&quot;io/ioutil&quot;</span>
)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">GetSize</span><span class="hljs-params">(f multipart.File)</span> <span class="hljs-params">(<span class="hljs-keyword">int</span>, error)</span></span> {
    content, err := ioutil.ReadAll(f)

    <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(content), err
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">GetExt</span><span class="hljs-params">(fileName <span class="hljs-keyword">string</span>)</span> <span class="hljs-title">string</span></span> {
    <span class="hljs-keyword">return</span> path.Ext(fileName)
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">CheckExist</span><span class="hljs-params">(src <span class="hljs-keyword">string</span>)</span> <span class="hljs-title">bool</span></span> {
    _, err := os.Stat(src)

    <span class="hljs-keyword">return</span> os.IsNotExist(err)
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">CheckPermission</span><span class="hljs-params">(src <span class="hljs-keyword">string</span>)</span> <span class="hljs-title">bool</span></span> {
    _, err := os.Stat(src)

    <span class="hljs-keyword">return</span> os.IsPermission(err)
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">IsNotExistMkDir</span><span class="hljs-params">(src <span class="hljs-keyword">string</span>)</span> <span class="hljs-title">error</span></span> {
    <span class="hljs-keyword">if</span> exist := CheckExist(src); exist == <span class="hljs-literal">false</span> {
        <span class="hljs-keyword">if</span> err := MkDir(src); err != <span class="hljs-literal">nil</span> {
            <span class="hljs-keyword">return</span> err
        }
    }

    <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">MkDir</span><span class="hljs-params">(src <span class="hljs-keyword">string</span>)</span> <span class="hljs-title">error</span></span> {
    err := os.MkdirAll(src, os.ModePerm)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> err
    }

    <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Open</span><span class="hljs-params">(name <span class="hljs-keyword">string</span>, flag <span class="hljs-keyword">int</span>, perm os.FileMode)</span> <span class="hljs-params">(*os.File, error)</span></span> {
    f, err := os.OpenFile(name, flag, perm)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>, err
    }

    <span class="hljs-keyword">return</span> f, <span class="hljs-literal">nil</span>
}</code></pre>
<p>&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4E00;&#x5171;&#x5C01;&#x88C5;&#x4E86; 7&#x4E2A; &#x65B9;&#x6CD5;</p>
<ul>
<li>GetSize&#xFF1A;&#x83B7;&#x53D6;&#x6587;&#x4EF6;&#x5927;&#x5C0F;</li>
<li>GetExt&#xFF1A;&#x83B7;&#x53D6;&#x6587;&#x4EF6;&#x540E;&#x7F00;</li>
<li>CheckExist&#xFF1A;&#x68C0;&#x67E5;&#x6587;&#x4EF6;&#x662F;&#x5426;&#x5B58;&#x5728;</li>
<li>CheckPermission&#xFF1A;&#x68C0;&#x67E5;&#x6587;&#x4EF6;&#x6743;&#x9650;</li>
<li>IsNotExistMkDir&#xFF1A;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#x5219;&#x65B0;&#x5EFA;&#x6587;&#x4EF6;&#x5939;</li>
<li>MkDir&#xFF1A;&#x65B0;&#x5EFA;&#x6587;&#x4EF6;&#x5939;</li>
<li>Open&#xFF1A;&#x6253;&#x5F00;&#x6587;&#x4EF6;</li>
</ul>
<p>&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x7528;&#x5230;&#x4E86; <code>mime/multipart</code> &#x5305;&#xFF0C;&#x5B83;&#x4E3B;&#x8981;&#x5B9E;&#x73B0;&#x4E86; MIME &#x7684; multipart &#x89E3;&#x6790;&#xFF0C;&#x4E3B;&#x8981;&#x9002;&#x7528;&#x4E8E; <a href="https://tools.ietf.org/html/rfc2388" rel="nofollow noreferrer" target="_blank">HTTP</a> &#x548C;&#x5E38;&#x89C1;&#x6D4F;&#x89C8;&#x5668;&#x751F;&#x6210;&#x7684; multipart &#x4E3B;&#x4F53;</p>
<p>multipart &#x53C8;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;<a href="https://tools.ietf.org/html/rfc2388" rel="nofollow noreferrer" target="_blank">rfc2388</a> &#x7684; multipart/form-data &#x4E86;&#x89E3;&#x4E00;&#x4E0B;</p>
<h3 id="articleHeader7">&#x7B2C;&#x4E8C;&#x6B65;</h3>
<p>&#x6211;&#x4EEC;&#x5728;&#x7B2C;&#x4E00;&#x6B65;&#x5DF2;&#x7ECF;&#x5C06; file &#x91CD;&#x65B0;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x5C42;&#xFF0C;&#x5728;&#x8FD9;&#x4E00;&#x6B65;&#x6211;&#x4EEC;&#x5C06;&#x539F;&#x5148; logging &#x5305;&#x7684;&#x65B9;&#x6CD5;&#x90FD;&#x4FEE;&#x6539;&#x6389;</p>
<p>1&#x3001;&#x6253;&#x5F00; pkg/logging/file.go &#x6587;&#x4EF6;&#xFF0C;&#x4FEE;&#x6539;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package logging

import (
    &quot;fmt&quot;
    &quot;os&quot;
    &quot;time&quot;

    &quot;github.com/EDDYCJY/go-gin-example/pkg/setting&quot;
    &quot;github.com/EDDYCJY/go-gin-example/pkg/file&quot;
)

func getLogFilePath() string {
    return fmt.Sprintf(&quot;%s%s&quot;, setting.AppSetting.RuntimeRootPath, setting.AppSetting.LogSavePath)
}

func getLogFileName() string {
    return fmt.Sprintf(&quot;%s%s.%s&quot;,
        setting.AppSetting.LogSaveName,
        time.Now().Format(setting.AppSetting.TimeFormat),
        setting.AppSetting.LogFileExt,
    )
}

func openLogFile(fileName, filePath string) (*os.File, error) {
    dir, err := os.Getwd()
    if err != nil {
        return nil, fmt.Errorf(&quot;os.Getwd err: %v&quot;, err)
    }

    src := dir + &quot;/&quot; + filePath
    perm := file.CheckPermission(src)
    if perm == true {
        return nil, fmt.Errorf(&quot;file.CheckPermission Permission denied src: %s&quot;, src)
    }

    err = file.IsNotExistMkDir(src)
    if err != nil {
        return nil, fmt.Errorf(&quot;file.IsNotExistMkDir src: %s, err: %v&quot;, src, err)
    }

    f, err := file.Open(src + fileName, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
    if err != nil {
        return nil, fmt.Errorf(&quot;Fail to OpenFile :%v&quot;, err)
    }

    return f, nil
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">package</span> logging

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;os&quot;</span>
    <span class="hljs-string">&quot;time&quot;</span>

    <span class="hljs-string">&quot;github.com/EDDYCJY/go-gin-example/pkg/setting&quot;</span>
    <span class="hljs-string">&quot;github.com/EDDYCJY/go-gin-example/pkg/file&quot;</span>
)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">getLogFilePath</span><span class="hljs-params">()</span> <span class="hljs-title">string</span></span> {
    <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;%s%s&quot;</span>, setting.AppSetting.RuntimeRootPath, setting.AppSetting.LogSavePath)
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">getLogFileName</span><span class="hljs-params">()</span> <span class="hljs-title">string</span></span> {
    <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;%s%s.%s&quot;</span>,
        setting.AppSetting.LogSaveName,
        time.Now().Format(setting.AppSetting.TimeFormat),
        setting.AppSetting.LogFileExt,
    )
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">openLogFile</span><span class="hljs-params">(fileName, filePath <span class="hljs-keyword">string</span>)</span> <span class="hljs-params">(*os.File, error)</span></span> {
    dir, err := os.Getwd()
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>, fmt.Errorf(<span class="hljs-string">&quot;os.Getwd err: %v&quot;</span>, err)
    }

    src := dir + <span class="hljs-string">&quot;/&quot;</span> + filePath
    perm := file.CheckPermission(src)
    <span class="hljs-keyword">if</span> perm == <span class="hljs-literal">true</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>, fmt.Errorf(<span class="hljs-string">&quot;file.CheckPermission Permission denied src: %s&quot;</span>, src)
    }

    err = file.IsNotExistMkDir(src)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>, fmt.Errorf(<span class="hljs-string">&quot;file.IsNotExistMkDir src: %s, err: %v&quot;</span>, src, err)
    }

    f, err := file.Open(src + fileName, os.O_APPEND|os.O_CREATE|os.O_WRONLY, <span class="hljs-number">0644</span>)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>, fmt.Errorf(<span class="hljs-string">&quot;Fail to OpenFile :%v&quot;</span>, err)
    }

    <span class="hljs-keyword">return</span> f, <span class="hljs-literal">nil</span>
}</code></pre>
<p>&#x6211;&#x4EEC;&#x5C06;&#x5F15;&#x7528;&#x90FD;&#x6539;&#x4E3A;&#x4E86; file/file.go &#x5305;&#x91CC;&#x7684;&#x65B9;&#x6CD5;</p>
<p>2&#x3001;&#x6253;&#x5F00; pkg/logging/log.go &#x6587;&#x4EF6;&#xFF0C;&#x4FEE;&#x6539;&#x6587;&#x4EF6;&#x5185;&#x5BB9;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package logging

...

func Setup() {
    var err error
    filePath := getLogFilePath()
    fileName := getLogFileName()
    F, err = openLogFile(fileName, filePath)
    if err != nil {
        log.Fatalln(err)
    }

    logger = log.New(F, DefaultPrefix, log.LstdFlags)
}

..." title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stata"><code>package logging

...

func Setup() {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">err</span> <span class="hljs-keyword">error</span>
    filePath := getLogFilePath()
    fileName := getLogFileName()
    F, <span class="hljs-keyword">err</span> = openLogFile(fileName, filePath)
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">err</span> != nil {
        <span class="hljs-keyword">log</span>.Fatalln(<span class="hljs-keyword">err</span>)
    }

    logger = <span class="hljs-keyword">log</span>.New(F, DefaultPrefix, <span class="hljs-keyword">log</span>.LstdFlags)
}

...</code></pre>
<p>&#x7531;&#x4E8E;&#x539F;&#x65B9;&#x6CD5;&#x5F62;&#x53C2;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x56E0;&#x6B64; openLogFile &#x4E5F;&#x9700;&#x8981;&#x8C03;&#x6574;</p>
<h2 id="articleHeader8">&#x5B9E;&#x73B0;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&#x63A5;&#x53E3;</h2>
<p>&#x8FD9;&#x4E00;&#x5C0F;&#x8282;&#xFF0C;&#x6211;&#x4EEC;&#x5F00;&#x59CB;&#x5B9E;&#x73B0;&#x4E0A;&#x6B21;&#x56FE;&#x7247;&#x76F8;&#x5173;&#x7684;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#x548C;&#x529F;&#x80FD;</p>
<p>&#x9996;&#x5148;&#x9700;&#x8981;&#x5728; blog_article &#x4E2D;&#x589E;&#x52A0;&#x5B57;&#x6BB5; <code>cover_image_url</code>&#xFF0C;&#x683C;&#x5F0F;&#x4E3A; <code>varchar(255) DEFAULT &apos;&apos; COMMENT &apos;&#x5C01;&#x9762;&#x56FE;&#x7247;&#x5730;&#x5740;&apos;</code></p>
<h3 id="articleHeader9">&#x7B2C;&#x96F6;&#x6B65;</h3>
<p>&#x4E00;&#x822C;&#x4E0D;&#x4F1A;&#x76F4;&#x63A5;&#x5C06;&#x4E0A;&#x4F20;&#x7684;&#x56FE;&#x7247;&#x540D;&#x66B4;&#x9732;&#x51FA;&#x6765;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x5BF9;&#x56FE;&#x7247;&#x540D;&#x8FDB;&#x884C; MD5 &#x6765;&#x8FBE;&#x5230;&#x8FD9;&#x4E2A;&#x6548;&#x679C;</p>
<p>&#x5728; util &#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA; md5.go&#xFF0C;&#x5199;&#x5165;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package util

import (
    &quot;crypto/md5&quot;
    &quot;encoding/hex&quot;
)

func EncodeMD5(value string) string {
    m := md5.New()
    m.Write([]byte(value))

    return hex.EncodeToString(m.Sum(nil))
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">package</span> util

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;crypto/md5&quot;</span>
    <span class="hljs-string">&quot;encoding/hex&quot;</span>
)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">EncodeMD5</span><span class="hljs-params">(value <span class="hljs-keyword">string</span>)</span> <span class="hljs-title">string</span></span> {
    m := md5.New()
    m.Write([]<span class="hljs-keyword">byte</span>(value))

    <span class="hljs-keyword">return</span> hex.EncodeToString(m.Sum(<span class="hljs-literal">nil</span>))
}
</code></pre>
<h3 id="articleHeader10">&#x7B2C;&#x4E00;&#x6B65;</h3>
<p>&#x5728;&#x5148;&#x524D;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x628A;&#x5E95;&#x5C42;&#x65B9;&#x6CD5;&#x7ED9;&#x5C01;&#x88C5;&#x597D;&#x4E86;&#xFF0C;&#x5B9E;&#x8D28;&#x8FD9;&#x4E00;&#x6B65;&#x4E3A;&#x5C01;&#x88C5; image &#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;</p>
<p>&#x5728; pkg &#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA; upload/image.go &#x6587;&#x4EF6;&#xFF0C;&#x5199;&#x5165;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package upload

import (
    &quot;os&quot;
    &quot;path&quot;
    &quot;log&quot;
    &quot;fmt&quot;
    &quot;strings&quot;
    &quot;mime/multipart&quot;

    &quot;github.com/EDDYCJY/go-gin-example/pkg/file&quot;
    &quot;github.com/EDDYCJY/go-gin-example/pkg/setting&quot;
    &quot;github.com/EDDYCJY/go-gin-example/pkg/logging&quot;
    &quot;github.com/EDDYCJY/go-gin-example/pkg/util&quot;
)

func GetImageFullUrl(name string) string {
    return setting.AppSetting.ImagePrefixUrl + &quot;/&quot; + GetImagePath() + name
}

func GetImageName(name string) string {
    ext := path.Ext(name)
    fileName := strings.TrimSuffix(name, ext)
    fileName = util.EncodeMD5(fileName)

    return fileName + ext
}

func GetImagePath() string {
    return setting.AppSetting.ImageSavePath
}

func GetImageFullPath() string {
    return setting.AppSetting.RuntimeRootPath + GetImagePath()
}

func CheckImageExt(fileName string) bool {
    ext := file.GetExt(fileName)
    for _, allowExt := range setting.AppSetting.ImageAllowExts {
        if strings.ToUpper(allowExt) == strings.ToUpper(ext) {
            return true
        }
    }

    return false
}

func CheckImageSize(f multipart.File) bool {
    size, err := file.GetSize(f)
    if err != nil {
        log.Println(err)
        logging.Warn(err)
        return false
    }

    return size &lt;= setting.AppSetting.ImageMaxSize
}

func CheckImage(src string) error {
    dir, err := os.Getwd()
    if err != nil {
        return fmt.Errorf(&quot;os.Getwd err: %v&quot;, err)
    }

    err = file.IsNotExistMkDir(dir + &quot;/&quot; + src)
    if err != nil {
        return fmt.Errorf(&quot;file.IsNotExistMkDir err: %v&quot;, err)
    }

    perm := file.CheckPermission(src)
    if perm == true {
        return fmt.Errorf(&quot;file.CheckPermission Permission denied src: %s&quot;, src)
    }

    return nil
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">package</span> upload

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;os&quot;</span>
    <span class="hljs-string">&quot;path&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;strings&quot;</span>
    <span class="hljs-string">&quot;mime/multipart&quot;</span>

    <span class="hljs-string">&quot;github.com/EDDYCJY/go-gin-example/pkg/file&quot;</span>
    <span class="hljs-string">&quot;github.com/EDDYCJY/go-gin-example/pkg/setting&quot;</span>
    <span class="hljs-string">&quot;github.com/EDDYCJY/go-gin-example/pkg/logging&quot;</span>
    <span class="hljs-string">&quot;github.com/EDDYCJY/go-gin-example/pkg/util&quot;</span>
)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">GetImageFullUrl</span><span class="hljs-params">(name <span class="hljs-keyword">string</span>)</span> <span class="hljs-title">string</span></span> {
    <span class="hljs-keyword">return</span> setting.AppSetting.ImagePrefixUrl + <span class="hljs-string">&quot;/&quot;</span> + GetImagePath() + name
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">GetImageName</span><span class="hljs-params">(name <span class="hljs-keyword">string</span>)</span> <span class="hljs-title">string</span></span> {
    ext := path.Ext(name)
    fileName := strings.TrimSuffix(name, ext)
    fileName = util.EncodeMD5(fileName)

    <span class="hljs-keyword">return</span> fileName + ext
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">GetImagePath</span><span class="hljs-params">()</span> <span class="hljs-title">string</span></span> {
    <span class="hljs-keyword">return</span> setting.AppSetting.ImageSavePath
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">GetImageFullPath</span><span class="hljs-params">()</span> <span class="hljs-title">string</span></span> {
    <span class="hljs-keyword">return</span> setting.AppSetting.RuntimeRootPath + GetImagePath()
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">CheckImageExt</span><span class="hljs-params">(fileName <span class="hljs-keyword">string</span>)</span> <span class="hljs-title">bool</span></span> {
    ext := file.GetExt(fileName)
    <span class="hljs-keyword">for</span> _, allowExt := <span class="hljs-keyword">range</span> setting.AppSetting.ImageAllowExts {
        <span class="hljs-keyword">if</span> strings.ToUpper(allowExt) == strings.ToUpper(ext) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
        }
    }

    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">CheckImageSize</span><span class="hljs-params">(f multipart.File)</span> <span class="hljs-title">bool</span></span> {
    size, err := file.GetSize(f)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Println(err)
        logging.Warn(err)
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }

    <span class="hljs-keyword">return</span> size &lt;= setting.AppSetting.ImageMaxSize
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">CheckImage</span><span class="hljs-params">(src <span class="hljs-keyword">string</span>)</span> <span class="hljs-title">error</span></span> {
    dir, err := os.Getwd()
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> fmt.Errorf(<span class="hljs-string">&quot;os.Getwd err: %v&quot;</span>, err)
    }

    err = file.IsNotExistMkDir(dir + <span class="hljs-string">&quot;/&quot;</span> + src)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> fmt.Errorf(<span class="hljs-string">&quot;file.IsNotExistMkDir err: %v&quot;</span>, err)
    }

    perm := file.CheckPermission(src)
    <span class="hljs-keyword">if</span> perm == <span class="hljs-literal">true</span> {
        <span class="hljs-keyword">return</span> fmt.Errorf(<span class="hljs-string">&quot;file.CheckPermission Permission denied src: %s&quot;</span>, src)
    }

    <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>
}</code></pre>
<p>&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E86; 7 &#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p>
<ul>
<li>GetImageFullUrl&#xFF1A;&#x83B7;&#x53D6;&#x56FE;&#x7247;&#x5B8C;&#x6574;&#x8BBF;&#x95EE;URL</li>
<li>GetImageName&#xFF1A;&#x83B7;&#x53D6;&#x56FE;&#x7247;&#x540D;&#x79F0;</li>
<li>GetImagePath&#xFF1A;&#x83B7;&#x53D6;&#x56FE;&#x7247;&#x8DEF;&#x5F84;</li>
<li>GetImageFullPath&#xFF1A;&#x83B7;&#x53D6;&#x56FE;&#x7247;&#x5B8C;&#x6574;&#x8DEF;&#x5F84;</li>
<li>CheckImageExt&#xFF1A;&#x68C0;&#x67E5;&#x56FE;&#x7247;&#x540E;&#x7F00;</li>
<li>CheckImageSize&#xFF1A;&#x68C0;&#x67E5;&#x56FE;&#x7247;&#x5927;&#x5C0F;</li>
<li>CheckImage&#xFF1A;&#x68C0;&#x67E5;&#x56FE;&#x7247;</li>
</ul>
<p>&#x8FD9;&#x91CC;&#x57FA;&#x672C;&#x662F;&#x5BF9;&#x5E95;&#x5C42;&#x4EE3;&#x7801;&#x7684;&#x4E8C;&#x6B21;&#x5C01;&#x88C5;&#xFF0C;&#x4E3A;&#x4E86;&#x66F4;&#x7075;&#x6D3B;&#x7684;&#x5904;&#x7406;&#x4E00;&#x4E9B;&#x56FE;&#x7247;&#x7279;&#x6709;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x5E76;&#x4E14;&#x65B9;&#x4FBF;&#x4FEE;&#x6539;&#xFF0C;&#x4E0D;&#x76F4;&#x63A5;&#x5BF9;&#x5916;&#x66B4;&#x9732;&#x4E0B;&#x5C42;</p>
<h3 id="articleHeader11">&#x7B2C;&#x4E8C;&#x6B65;</h3>
<p>&#x8FD9;&#x4E00;&#x6B65;&#x5C06;&#x7F16;&#x5199;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&#x7684;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#xFF0C;&#x5728; routers/api &#x76EE;&#x5F55;&#x4E0B; &#x65B0;&#x5EFA; upload.go &#x6587;&#x4EF6;&#xFF0C;&#x5199;&#x5165;&#x6587;&#x4EF6;&#x5185;&#x5BB9;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package api

import (
    &quot;net/http&quot;

    &quot;github.com/gin-gonic/gin&quot;

    &quot;github.com/EDDYCJY/go-gin-example/pkg/e&quot;
    &quot;github.com/EDDYCJY/go-gin-example/pkg/logging&quot;
    &quot;github.com/EDDYCJY/go-gin-example/pkg/upload&quot;
)

func UploadImage(c *gin.Context) {
    code := e.SUCCESS
    data := make(map[string]string)

    file, image, err := c.Request.FormFile(&quot;image&quot;)
    if err != nil {
        logging.Warn(err)
        code = e.ERROR
        c.JSON(http.StatusOK, gin.H{
            &quot;code&quot;: code,
            &quot;msg&quot;:  e.GetMsg(code),
            &quot;data&quot;: data,
        })
    }

    if image == nil {
        code = e.INVALID_PARAMS
    } else {
        imageName := upload.GetImageName(image.Filename)
        fullPath := upload.GetImageFullPath()
        savePath := upload.GetImagePath()

        src := fullPath + imageName
        if ! upload.CheckImageExt(imageName) || ! upload.CheckImageSize(file) {
            code = e.ERROR_UPLOAD_CHECK_IMAGE_FORMAT
        } else {
            err := upload.CheckImage(fullPath)
            if err != nil {
                logging.Warn(err)
                code = e.ERROR_UPLOAD_CHECK_IMAGE_FAIL
            } else if err := c.SaveUploadedFile(image, src); err != nil {
                logging.Warn(err)
                code = e.ERROR_UPLOAD_SAVE_IMAGE_FAIL
            } else {
                data[&quot;image_url&quot;] = upload.GetImageFullUrl(imageName)
                data[&quot;image_save_url&quot;] = savePath + imageName
            }
        }
    }

    c.JSON(http.StatusOK, gin.H{
        &quot;code&quot;: code,
        &quot;msg&quot;:  e.GetMsg(code),
        &quot;data&quot;: data,
    })
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">package</span> api

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;net/http&quot;</span>

    <span class="hljs-string">&quot;github.com/gin-gonic/gin&quot;</span>

    <span class="hljs-string">&quot;github.com/EDDYCJY/go-gin-example/pkg/e&quot;</span>
    <span class="hljs-string">&quot;github.com/EDDYCJY/go-gin-example/pkg/logging&quot;</span>
    <span class="hljs-string">&quot;github.com/EDDYCJY/go-gin-example/pkg/upload&quot;</span>
)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">UploadImage</span><span class="hljs-params">(c *gin.Context)</span></span> {
    code := e.SUCCESS
    data := <span class="hljs-built_in">make</span>(<span class="hljs-keyword">map</span>[<span class="hljs-keyword">string</span>]<span class="hljs-keyword">string</span>)

    file, image, err := c.Request.FormFile(<span class="hljs-string">&quot;image&quot;</span>)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        logging.Warn(err)
        code = e.ERROR
        c.JSON(http.StatusOK, gin.H{
            <span class="hljs-string">&quot;code&quot;</span>: code,
            <span class="hljs-string">&quot;msg&quot;</span>:  e.GetMsg(code),
            <span class="hljs-string">&quot;data&quot;</span>: data,
        })
    }

    <span class="hljs-keyword">if</span> image == <span class="hljs-literal">nil</span> {
        code = e.INVALID_PARAMS
    } <span class="hljs-keyword">else</span> {
        imageName := upload.GetImageName(image.Filename)
        fullPath := upload.GetImageFullPath()
        savePath := upload.GetImagePath()

        src := fullPath + imageName
        <span class="hljs-keyword">if</span> ! upload.CheckImageExt(imageName) || ! upload.CheckImageSize(file) {
            code = e.ERROR_UPLOAD_CHECK_IMAGE_FORMAT
        } <span class="hljs-keyword">else</span> {
            err := upload.CheckImage(fullPath)
            <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
                logging.Warn(err)
                code = e.ERROR_UPLOAD_CHECK_IMAGE_FAIL
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> err := c.SaveUploadedFile(image, src); err != <span class="hljs-literal">nil</span> {
                logging.Warn(err)
                code = e.ERROR_UPLOAD_SAVE_IMAGE_FAIL
            } <span class="hljs-keyword">else</span> {
                data[<span class="hljs-string">&quot;image_url&quot;</span>] = upload.GetImageFullUrl(imageName)
                data[<span class="hljs-string">&quot;image_save_url&quot;</span>] = savePath + imageName
            }
        }
    }

    c.JSON(http.StatusOK, gin.H{
        <span class="hljs-string">&quot;code&quot;</span>: code,
        <span class="hljs-string">&quot;msg&quot;</span>:  e.GetMsg(code),
        <span class="hljs-string">&quot;data&quot;</span>: data,
    })
}</code></pre>
<p>&#x6240;&#x6D89;&#x53CA;&#x7684;&#x9519;&#x8BEF;&#x7801;&#xFF08;&#x9700;&#x5728; pkg/e/code.go&#x3001;msg.go &#x6DFB;&#x52A0;&#xFF09;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4FDD;&#x5B58;&#x56FE;&#x7247;&#x5931;&#x8D25;
ERROR_UPLOAD_SAVE_IMAGE_FAIL = 30001
// &#x68C0;&#x67E5;&#x56FE;&#x7247;&#x5931;&#x8D25;
ERROR_UPLOAD_CHECK_IMAGE_FAIL = 30002
// &#x6821;&#x9A8C;&#x56FE;&#x7247;&#x9519;&#x8BEF;&#xFF0C;&#x56FE;&#x7247;&#x683C;&#x5F0F;&#x6216;&#x5927;&#x5C0F;&#x6709;&#x95EE;&#x9898;
ERROR_UPLOAD_CHECK_IMAGE_FORMAT = 30003" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// &#x4FDD;&#x5B58;&#x56FE;&#x7247;&#x5931;&#x8D25;</span>
ERROR_UPLOAD_SAVE_IMAGE_FAIL = <span class="hljs-number">30001</span>
<span class="hljs-comment">// &#x68C0;&#x67E5;&#x56FE;&#x7247;&#x5931;&#x8D25;</span>
ERROR_UPLOAD_CHECK_IMAGE_FAIL = <span class="hljs-number">30002</span>
<span class="hljs-comment">// &#x6821;&#x9A8C;&#x56FE;&#x7247;&#x9519;&#x8BEF;&#xFF0C;&#x56FE;&#x7247;&#x683C;&#x5F0F;&#x6216;&#x5927;&#x5C0F;&#x6709;&#x95EE;&#x9898;</span>
ERROR_UPLOAD_CHECK_IMAGE_FORMAT = <span class="hljs-number">30003</span></code></pre>
<p>&#x5728;&#x8FD9;&#x4E00;&#x5927;&#x6BB5;&#x7684;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x505A;&#x4E86;&#x5982;&#x4E0B;&#x4E8B;&#x60C5;&#xFF1A;</p>
<ul>
<li>c.Request.FormFile&#xFF1A;&#x83B7;&#x53D6;&#x4E0A;&#x4F20;&#x7684;&#x56FE;&#x7247;&#xFF08;&#x8FD4;&#x56DE;&#x63D0;&#x4F9B;&#x7684;&#x8868;&#x5355;&#x952E;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF09;</li>
<li>CheckImageExt&#x3001;CheckImageSize&#x68C0;&#x67E5;&#x56FE;&#x7247;&#x5927;&#x5C0F;&#xFF0C;&#x68C0;&#x67E5;&#x56FE;&#x7247;&#x540E;&#x7F00;</li>
<li>CheckImage&#xFF1A;&#x68C0;&#x67E5;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&#x6240;&#x9700;&#xFF08;&#x6743;&#x9650;&#x3001;&#x6587;&#x4EF6;&#x5939;&#xFF09;</li>
<li>SaveUploadedFile&#xFF1A;&#x4FDD;&#x5B58;&#x56FE;&#x7247;</li>
</ul>
<p>&#x603B;&#x7684;&#x6765;&#x8BF4;&#xFF0C;&#x5C31;&#x662F; &#x5165;&#x53C2; -&gt; &#x68C0;&#x67E5; -&#x300B; &#x4FDD;&#x5B58; &#x7684;&#x5E94;&#x7528;&#x6D41;&#x7A0B;</p>
<h3 id="articleHeader12">&#x7B2C;&#x4E09;&#x6B65;</h3>
<p>&#x6253;&#x5F00; routers/router.go &#x6587;&#x4EF6;&#xFF0C;&#x589E;&#x52A0;&#x8DEF;&#x7531; <code>r.POST(&quot;/upload&quot;, api.UploadImage)</code> &#xFF0C;&#x5982;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func InitRouter() *gin.Engine {
    r := gin.New()
    ...
    r.GET(&quot;/auth&quot;, api.GetAuth)
    r.GET(&quot;/swagger/*any&quot;, ginSwagger.WrapHandler(swaggerFiles.Handler))
    r.POST(&quot;/upload&quot;, api.UploadImage)

    apiv1 := r.Group(&quot;/api/v1&quot;)
    apiv1.Use(jwt.JWT())
    {
        ...
    }

    return r
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">func</span> <span class="hljs-selector-tag">InitRouter</span>() *<span class="hljs-selector-tag">gin</span><span class="hljs-selector-class">.Engine</span> {
    <span class="hljs-attribute">r </span>:= gin.<span class="hljs-built_in">New</span>()
    ...
    r.<span class="hljs-built_in">GET</span>(<span class="hljs-string">&quot;/auth&quot;</span>, api.GetAuth)
    r.<span class="hljs-built_in">GET</span>(<span class="hljs-string">&quot;/swagger/*any&quot;</span>, ginSwagger.WrapHandler(swaggerFiles.Handler))
    r.<span class="hljs-built_in">POST</span>(<span class="hljs-string">&quot;/upload&quot;</span>, api.UploadImage)

    apiv1 := r.<span class="hljs-built_in">Group</span>(<span class="hljs-string">&quot;/api/v1&quot;</span>)
    apiv1.<span class="hljs-built_in">Use</span>(jwt.JWT())
    {
        ...
    }

    <span class="hljs-selector-tag">return</span> <span class="hljs-selector-tag">r</span>
}</code></pre>
<h3 id="articleHeader13">&#x9A8C;&#x8BC1;</h3>
<p>&#x6700;&#x540E;&#x6211;&#x4EEC;&#x8BF7;&#x6C42;&#x4E00;&#x4E0B;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&#x7684;&#x63A5;&#x53E3;&#xFF0C;&#x6D4B;&#x8BD5;&#x6240;&#x7F16;&#x5199;&#x7684;&#x529F;&#x80FD;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015055623?w=1504&amp;h=884" src="https://static.alili.tech/img/remote/1460000015055623?w=1504&amp;h=884" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>&#x68C0;&#x67E5;&#x76EE;&#x5F55;&#x4E0B;&#x662F;&#x5426;&#x542B;&#x6587;&#x4EF6;&#xFF08;&#x6CE8;&#x610F;&#x6743;&#x9650;&#x95EE;&#x9898;&#xFF09;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ pwd
$GOPATH/src/github.com/EDDYCJY/go-gin-example/runtime/upload/images

$ ll
... 96a3be3cf272e017046d1b2674a52bd3.jpg
... c39fa784216313cf2faa7c98739fc367.jpeg" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs vim"><code>$ <span class="hljs-keyword">pwd</span>
$GOPATH/src/github.<span class="hljs-keyword">com</span>/EDDYCJY/<span class="hljs-keyword">go</span>-gin-example/<span class="hljs-keyword">runtime</span>/upload/images

$ <span class="hljs-keyword">ll</span>
... <span class="hljs-number">96</span>a3be3cf272e017046d1b2674a52bd3.jpg
... c39fa784216313cf2faa7c98739fc367.jpeg</code></pre>
<p>&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4E00;&#x5171;&#x8FD4;&#x56DE;&#x4E86; 2 &#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x5B8C;&#x6574;&#x7684;&#x8BBF;&#x95EE; URL&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x4E3A;&#x4FDD;&#x5B58;&#x8DEF;&#x5F84;</p>
<h2 id="articleHeader14">&#x5B9E;&#x73B0; http.FileServer</h2>
<p>&#x5728;&#x5B8C;&#x6210;&#x4E86;&#x4E0A;&#x4E00;&#x5C0F;&#x8282;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x8BA9;&#x524D;&#x7AEF;&#x80FD;&#x591F;&#x8BBF;&#x95EE;&#x5230;&#x56FE;&#x7247;&#xFF0C;&#x4E00;&#x822C;&#x662F;&#x5982;&#x4E0B;&#xFF1A;</p>
<ul>
<li>CDN</li>
<li>http.FileSystem</li>
</ul>
<p>&#x5728;&#x516C;&#x53F8;&#x7684;&#x8BDD;&#xFF0C;CDN &#x6216;&#x81EA;&#x5EFA;&#x5206;&#x5E03;&#x5F0F;&#x6587;&#x4EF6;&#x7CFB;&#x7EDF;&#x5C45;&#x591A;&#xFF0C;&#x4E5F;&#x4E0D;&#x9700;&#x8981;&#x8FC7;&#x591A;&#x5173;&#x6CE8;&#x3002;&#x800C;&#x5728;&#x5B9E;&#x8DF5;&#x91CC;&#x7684;&#x8BDD;&#x80AF;&#x5B9A;&#x662F;&#x672C;&#x5730;&#x642D;&#x5EFA;&#x4E86;&#xFF0C;Go &#x672C;&#x8EAB;&#x5BF9;&#x6B64;&#x5C31;&#x6709;&#x5F88;&#x597D;&#x7684;&#x652F;&#x6301;&#xFF0C;&#x800C; Gin &#x66F4;&#x662F;&#x518D;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x5C42;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5728;&#x8DEF;&#x7531;&#x589E;&#x52A0;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#x5373;&#x53EF;</p>
<h3 id="articleHeader15">r.StaticFS</h3>
<p>&#x6253;&#x5F00; routers/router.go &#x6587;&#x4EF6;&#xFF0C;&#x589E;&#x52A0;&#x8DEF;&#x7531; <code>r.StaticFS(&quot;/upload/images&quot;, http.Dir(upload.GetImageFullPath()))</code>&#xFF0C;&#x5982;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func InitRouter() *gin.Engine {
    ...
    r.StaticFS(&quot;/upload/images&quot;, http.Dir(upload.GetImageFullPath()))

    r.GET(&quot;/auth&quot;, api.GetAuth)
    r.GET(&quot;/swagger/*any&quot;, ginSwagger.WrapHandler(swaggerFiles.Handler))
    r.POST(&quot;/upload&quot;, api.UploadImage)
    ...
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">func</span> <span class="hljs-selector-tag">InitRouter</span>() *<span class="hljs-selector-tag">gin</span><span class="hljs-selector-class">.Engine</span> {
    ...
    <span class="hljs-selector-tag">r</span><span class="hljs-selector-class">.StaticFS</span>(<span class="hljs-string">&quot;/upload/images&quot;</span>, http.Dir(upload.GetImageFullPath()))

    <span class="hljs-selector-tag">r</span><span class="hljs-selector-class">.GET</span>(<span class="hljs-string">&quot;/auth&quot;</span>, api.GetAuth)
    <span class="hljs-selector-tag">r</span><span class="hljs-selector-class">.GET</span>(<span class="hljs-string">&quot;/swagger/*any&quot;</span>, ginSwagger.WrapHandler(swaggerFiles.Handler))
    <span class="hljs-selector-tag">r</span><span class="hljs-selector-class">.POST</span>(<span class="hljs-string">&quot;/upload&quot;</span>, api.UploadImage)
    ...
}</code></pre>
<h3 id="articleHeader16">&#x5B83;&#x505A;&#x4E86;&#x4EC0;&#x4E48;</h3>
<p>&#x5F53;&#x8BBF;&#x95EE; $HOST/upload/images &#x65F6;&#xFF0C;&#x5C06;&#x4F1A;&#x8BFB;&#x53D6;&#x5230; $GOPATH/src/github.com/EDDYCJY/go-gin-example/runtime/upload/images &#x4E0B;&#x7684;&#x6587;&#x4EF6;</p>
<p>&#x800C;&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#x53C8;&#x505A;&#x4E86;&#x4EC0;&#x4E48;&#x4E8B;&#x5462;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x65B9;&#x6CD5;&#x539F;&#x578B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// StaticFS works just like `Static()` but a custom `http.FileSystem` can be used instead.
// Gin by default user: gin.Dir()
func (group *RouterGroup) StaticFS(relativePath string, fs http.FileSystem) IRoutes {
    if strings.Contains(relativePath, &quot;:&quot;) || strings.Contains(relativePath, &quot;*&quot;) {
        panic(&quot;URL parameters can not be used when serving a static folder&quot;)
    }
    handler := group.createStaticHandler(relativePath, fs)
    urlPattern := path.Join(relativePath, &quot;/*filepath&quot;)

    // Register GET and HEAD handlers
    group.GET(urlPattern, handler)
    group.HEAD(urlPattern, handler)
    return group.returnObj()
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-comment">// StaticFS works just like `Static()` but a custom `http.FileSystem` can be used instead.</span>
<span class="hljs-comment">// Gin by default user: gin.Dir()</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(group *RouterGroup)</span> <span class="hljs-title">StaticFS</span><span class="hljs-params">(relativePath <span class="hljs-keyword">string</span>, fs http.FileSystem)</span> <span class="hljs-title">IRoutes</span></span> {
    <span class="hljs-keyword">if</span> strings.Contains(relativePath, <span class="hljs-string">&quot;:&quot;</span>) || strings.Contains(relativePath, <span class="hljs-string">&quot;*&quot;</span>) {
        <span class="hljs-built_in">panic</span>(<span class="hljs-string">&quot;URL parameters can not be used when serving a static folder&quot;</span>)
    }
    handler := group.createStaticHandler(relativePath, fs)
    urlPattern := path.Join(relativePath, <span class="hljs-string">&quot;/*filepath&quot;</span>)

    <span class="hljs-comment">// Register GET and HEAD handlers</span>
    group.GET(urlPattern, handler)
    group.HEAD(urlPattern, handler)
    <span class="hljs-keyword">return</span> group.returnObj()
}</code></pre>
<p>&#x9996;&#x5148;&#x5728;&#x66B4;&#x9732;&#x7684; URL &#x4E2D;&#x7981;&#x6B62;&#x4E86; * &#x548C; : &#x7B26;&#x53F7;&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x901A;&#x8FC7; <code>createStaticHandler</code> &#x521B;&#x5EFA;&#x4E86;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x670D;&#x52A1;&#xFF0C;&#x5B9E;&#x8D28;&#x6700;&#x7EC8;&#x8C03;&#x7528;&#x7684;&#x8FD8;&#x662F; <code>fileServer.ServeHTTP</code> &#x548C;&#x4E00;&#x4E9B;&#x5904;&#x7406;&#x903B;&#x8F91;&#x4E86;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func (group *RouterGroup) createStaticHandler(relativePath string, fs http.FileSystem) HandlerFunc {
    absolutePath := group.calculateAbsolutePath(relativePath)
    fileServer := http.StripPrefix(absolutePath, http.FileServer(fs))
    _, nolisting := fs.(*onlyfilesFS)
    return func(c *Context) {
        if nolisting {
            c.Writer.WriteHeader(404)
        }
        fileServer.ServeHTTP(c.Writer, c.Request)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">func</span> (<span class="hljs-selector-tag">group</span> *<span class="hljs-selector-tag">RouterGroup</span>) <span class="hljs-selector-tag">createStaticHandler</span>(<span class="hljs-selector-tag">relativePath</span> <span class="hljs-selector-tag">string</span>, <span class="hljs-selector-tag">fs</span> <span class="hljs-selector-tag">http</span><span class="hljs-selector-class">.FileSystem</span>) <span class="hljs-selector-tag">HandlerFunc</span> {
    <span class="hljs-attribute">absolutePath </span>:= group.<span class="hljs-built_in">calculateAbsolutePath</span>(relativePath)
    fileServer := http.<span class="hljs-built_in">StripPrefix</span>(absolutePath, http.FileServer(fs))
    _, nolisting := fs.(*onlyfilesFS)
    return <span class="hljs-built_in">func</span>(c *Context) {
        if nolisting {
            c.Writer.<span class="hljs-built_in">WriteHeader</span>(404)
        }
        <span class="hljs-selector-tag">fileServer</span><span class="hljs-selector-class">.ServeHTTP</span>(<span class="hljs-selector-tag">c</span><span class="hljs-selector-class">.Writer</span>, <span class="hljs-selector-tag">c</span><span class="hljs-selector-class">.Request</span>)
    }
}</code></pre>
<h4>http.StripPrefix</h4>
<p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7559;&#x610F;&#x4E0B; <code>fileServer := http.StripPrefix(absolutePath, http.FileServer(fs))</code> &#x8FD9;&#x6BB5;&#x8BED;&#x53E5;&#xFF0C;&#x5728;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x670D;&#x52A1;&#x4E2D;&#x5F88;&#x5E38;&#x89C1;&#xFF0C;&#x5B83;&#x6709;&#x4EC0;&#x4E48;&#x4F5C;&#x7528;&#x5462;&#xFF1F;</p>
<p><code>http.StripPrefix</code> &#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x662F;&#x4ECE;&#x8BF7;&#x6C42; URL &#x7684;&#x8DEF;&#x5F84;&#x4E2D;&#x5220;&#x9664;&#x7ED9;&#x5B9A;&#x7684;&#x524D;&#x7F00;&#xFF0C;&#x6700;&#x7EC8;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A; <code>Handler</code></p>
<p>&#x901A;&#x5E38; http.FileServer &#x8981;&#x4E0E; http.StripPrefix &#x76F8;&#x7ED3;&#x5408;&#x4F7F;&#x7528;&#xFF0C;&#x5426;&#x5219;&#x5F53;&#x4F60;&#x8FD0;&#x884C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http.Handle(&quot;/upload/images&quot;, http.FileServer(http.Dir(&quot;upload/images&quot;)))" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">http</span>.Handle(<span class="hljs-string">&quot;/upload/images&quot;</span>, <span class="hljs-keyword">http</span>.FileServer(<span class="hljs-keyword">http</span>.Dir(<span class="hljs-string">&quot;upload/images&quot;</span>)))</code></pre>
<p>&#x4F1A;&#x65E0;&#x6CD5;&#x6B63;&#x786E;&#x7684;&#x8BBF;&#x95EE;&#x5230;&#x6587;&#x4EF6;&#x76EE;&#x5F55;&#xFF0C;&#x56E0;&#x4E3A; <code>/upload/images</code> &#x4E5F;&#x5305;&#x542B;&#x5728;&#x4E86; URL &#x8DEF;&#x5F84;&#x4E2D;&#xFF0C;&#x5FC5;&#x987B;&#x4F7F;&#x7528;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http.Handle(&quot;/upload/images&quot;, http.StripPrefix(&quot;upload/images&quot;, http.FileServer(http.Dir(&quot;upload/images&quot;))))" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">http</span>.Handle(<span class="hljs-string">&quot;/upload/images&quot;</span>, <span class="hljs-keyword">http</span>.StripPrefix(<span class="hljs-string">&quot;upload/images&quot;</span>, <span class="hljs-keyword">http</span>.FileServer(<span class="hljs-keyword">http</span>.Dir(<span class="hljs-string">&quot;upload/images&quot;</span>))))</code></pre>
<h4>/*filepath</h4>
<p>&#x5230;&#x4E0B;&#x9762;&#x53EF;&#x4EE5;&#x770B;&#x5230; <code>urlPattern := path.Join(relativePath, &quot;/*filepath&quot;)</code>&#xFF0C;<code>/*filepath</code> &#x4F60;&#x662F;&#x8C01;&#xFF0C;&#x4F60;&#x5728;&#x8FD9;&#x91CC;&#x6709;&#x4EC0;&#x4E48;&#x7528;&#xFF0C;&#x4F60;&#x662F; Gin &#x7684;&#x4EA7;&#x7269;&#x5417;?</p>
<p>&#x901A;&#x8FC7;&#x8BED;&#x4E49;&#x53EF;&#x5F97;&#x77E5;&#x662F;&#x8DEF;&#x7531;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;&#xFF0C;&#x800C; Gin &#x7684;&#x8DEF;&#x7531;&#x662F;&#x57FA;&#x4E8E; httprouter &#x7684;&#xFF0C;&#x901A;&#x8FC7;&#x67E5;&#x9605;&#x6587;&#x6863;&#x53EF;&#x5F97;&#x5230;&#x4EE5;&#x4E0B;&#x4FE1;&#x606F;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Pattern: /src/*filepath

 /src/                     match
 /src/somefile.go          match
 /src/subdir/somefile.go   match" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-attribute">Pattern</span>: /src/*filepath

<span class="vim"> /src/                     <span class="hljs-keyword">match</span>
 /src/somefile.<span class="hljs-keyword">go</span>          <span class="hljs-keyword">match</span>
 /src/subdir/somefile.<span class="hljs-keyword">go</span>   <span class="hljs-keyword">match</span></span></code></pre>
<p><code>*filepath</code> &#x5C06;&#x5339;&#x914D;&#x6240;&#x6709;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#xFF0C;&#x5E76;&#x4E14; <code>*filepath</code> &#x5FC5;&#x987B;&#x5728; Pattern &#x7684;&#x6700;&#x540E;</p>
<h3 id="articleHeader17">&#x9A8C;&#x8BC1;</h3>
<p>&#x91CD;&#x65B0;&#x6267;&#x884C; <code>go run main.go</code> &#xFF0C;&#x53BB;&#x8BBF;&#x95EE;&#x521A;&#x521A;&#x5728; upload &#x63A5;&#x53E3;&#x5F97;&#x5230;&#x7684;&#x56FE;&#x7247;&#x5730;&#x5740;&#xFF0C;&#x68C0;&#x67E5; http.FileSystem &#x662F;&#x5426;&#x6B63;&#x5E38;</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015055624?w=1788&amp;h=1242" src="https://static.alili.tech/img/remote/1460000015055624?w=1788&amp;h=1242" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader18">&#x4FEE;&#x6539;&#x6587;&#x7AE0;&#x63A5;&#x53E3;</h2>
<p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x9700;&#x8981;&#x4F60;&#x4FEE;&#x6539; routers/api/v1/article.go &#x7684; AddArticle&#x3001;EditArticle &#x4E24;&#x4E2A;&#x63A5;&#x53E3;</p>
<ul>
<li>&#x65B0;&#x589E;&#x3001;&#x66F4;&#x65B0;&#x6587;&#x7AE0;&#x63A5;&#x53E3;&#xFF1A;&#x652F;&#x6301;&#x5165;&#x53C2; cover_image_url</li>
<li>&#x65B0;&#x589E;&#x3001;&#x66F4;&#x65B0;&#x6587;&#x7AE0;&#x63A5;&#x53E3;&#xFF1A;&#x589E;&#x52A0;&#x5BF9; cover_image_url &#x7684;&#x975E;&#x7A7A;&#x3001;&#x6700;&#x957F;&#x957F;&#x5EA6;&#x6821;&#x9A8C;</li>
</ul>
<p>&#x8FD9;&#x5757;&#x524D;&#x9762;&#x6587;&#x7AE0;&#x8BB2;&#x8FC7;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x95EE;&#x9898;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x9879;&#x76EE;&#x7684;&#x4EE3;&#x7801;&#x1F44C;</p>
<h2 id="articleHeader19">&#x603B;&#x7ED3;</h2>
<p>&#x5728;&#x8FD9;&#x7AE0;&#x8282;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x7B80;&#x5355;&#x7684;&#x5206;&#x6790;&#x4E86;&#x4E0B;&#x9700;&#x6C42;&#xFF0C;&#x5BF9;&#x5E94;&#x7528;&#x505A;&#x51FA;&#x4E86;&#x4E00;&#x4E2A;&#x5C0F;&#x89C4;&#x5212;&#x5E76;&#x5B9E;&#x65BD;</p>
<p>&#x5B8C;&#x6210;&#x4E86;&#x6E05;&#x5355;&#x4E2D;&#x7684;&#x529F;&#x80FD;&#x70B9;&#x548C;&#x4F18;&#x5316;&#xFF0C;&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x4E2D;&#x4E5F;&#x662F;&#x5E38;&#x89C1;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x5E0C;&#x671B;&#x4F60;&#x80FD;&#x591F;&#x7EC6;&#x7EC6;&#x54C1;&#x5C1D;&#x5E76;&#x9488;&#x5BF9;&#x4E00;&#x4E9B;&#x70B9;&#x8FDB;&#x884C;&#x6DF1;&#x5165;&#x5B66;&#x4E60;</p>
<h2 id="articleHeader20">&#x53C2;&#x8003;</h2>
<h3 id="articleHeader21">&#x672C;&#x7CFB;&#x5217;&#x793A;&#x4F8B;&#x4EE3;&#x7801;</h3>
<ul><li><a href="https://github.com/EDDYCJY/go-gin-example" rel="nofollow noreferrer" target="_blank">go-gin-example</a></li></ul>
<h3 id="articleHeader22">&#x672C;&#x7CFB;&#x5217;&#x76EE;&#x5F55;</h3>
<ul>
<li><a href="https://segmentfault.com/a/1190000013297625">&#x8FDE;&#x8F7D;&#x4E00; Golang&#x4ECB;&#x7ECD;&#x4E0E;&#x73AF;&#x5883;&#x5B89;&#x88C5;</a></li>
<li><a href="https://segmentfault.com/a/1190000013297683" target="_blank">&#x8FDE;&#x8F7D;&#x4E8C; &#x642D;&#x5EFA;Blog API&apos;s&#xFF08;&#x4E00;&#xFF09;</a></li>
<li><a href="https://segmentfault.com/a/1190000013297705">&#x8FDE;&#x8F7D;&#x4E09; &#x642D;&#x5EFA;Blog API&apos;s&#xFF08;&#x4E8C;&#xFF09;</a></li>
<li><a href="https://segmentfault.com/a/1190000013297747" target="_blank">&#x8FDE;&#x8F7D;&#x56DB; &#x642D;&#x5EFA;Blog API&apos;s&#xFF08;&#x4E09;&#xFF09;</a></li>
<li><a href="https://segmentfault.com/a/1190000013297828">&#x8FDE;&#x8F7D;&#x4E94; &#x4F7F;&#x7528;JWT&#x8FDB;&#x884C;&#x8EAB;&#x4EFD;&#x6821;&#x9A8C;</a></li>
<li><a href="https://segmentfault.com/a/1190000013297850" target="_blank">&#x8FDE;&#x8F7D;&#x516D; &#x7F16;&#x5199;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x6587;&#x4EF6;&#x65E5;&#x5FD7;</a></li>
<li><a href="https://segmentfault.com/a/1190000013757098">&#x8FDE;&#x8F7D;&#x4E03; Golang&#x4F18;&#x96C5;&#x91CD;&#x542F;HTTP&#x670D;&#x52A1;</a></li>
<li><a href="https://segmentfault.com/a/1190000013808421" target="_blank">&#x8FDE;&#x8F7D;&#x516B; &#x4E3A;&#x5B83;&#x52A0;&#x4E0A;Swagger</a></li>
<li><a href="https://segmentfault.com/a/1190000013960558">&#x8FDE;&#x8F7D;&#x4E5D; &#x5C06;Golang&#x5E94;&#x7528;&#x90E8;&#x7F72;&#x5230;Docker</a></li>
<li><a href="https://segmentfault.com/a/1190000014393602" target="_blank">&#x8FDE;&#x8F7D;&#x5341; &#x5B9A;&#x5236; GORM Callbacks</a></li>
<li><a href="https://segmentfault.com/a/1190000014666453">&#x8FDE;&#x8F7D;&#x5341;&#x4E00; Cron&#x5B9A;&#x65F6;&#x4EFB;&#x52A1;</a></li>
<li><a href="https://segmentfault.com/a/1190000015051346" target="_blank">&#x8FDE;&#x8F7D;&#x5341;&#x4E8C; &#x4F18;&#x5316;&#x914D;&#x7F6E;&#x7ED3;&#x6784;&#x53CA;&#x5B9E;&#x73B0;&#x56FE;&#x7247;&#x4E0A;&#x4F20;</a></li>
<li><a href="https://segmentfault.com/a/1190000015140508">&#x8FDE;&#x8F7D;&#x5341;&#x4E09; &#x4F18;&#x5316;&#x4F60;&#x7684;&#x5E94;&#x7528;&#x7ED3;&#x6784;&#x548C;&#x5B9E;&#x73B0;Redis&#x7F13;&#x5B58;</a></li>
<li><a href="https://segmentfault.com/a/1190000015293834" target="_blank">&#x8FDE;&#x8F7D;&#x5341;&#x56DB; &#x5B9E;&#x73B0;&#x5BFC;&#x51FA;&#x3001;&#x5BFC;&#x5165; Excel</a></li>
<li><a href="https://segmentfault.com/a/1190000015483482">&#x8FDE;&#x8F7D;&#x5341;&#x4E94; &#x751F;&#x6210;&#x4E8C;&#x7EF4;&#x7801;&#x3001;&#x5408;&#x5E76;&#x6D77;&#x62A5;</a></li>
<li><a href="https://segmentfault.com/a/1190000015558234" target="_blank">&#x8FDE;&#x8F7D;&#x5341;&#x516D; &#x5728;&#x56FE;&#x7247;&#x4E0A;&#x7ED8;&#x5236;&#x6587;&#x5B57;</a></li>
<li><a href="https://segmentfault.com/a/1190000016236253">&#x8FDE;&#x8F7D;&#x5341;&#x4E03; &#x7528; Nginx &#x90E8;&#x7F72; Go &#x5E94;&#x7528;</a></li>
<li><a href="https://segmentfault.com/a/1190000013989448" target="_blank">&#x756A;&#x5916; Golang&#x4EA4;&#x53C9;&#x7F16;&#x8BD1;</a></li>
<li><a href="https://segmentfault.com/a/1190000016154678">&#x756A;&#x5916; &#x8BF7;&#x5165;&#x95E8; Makefile</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Golang Gin实践 连载十二 优化配置结构及实现图片上传

## 原文链接
[https://segmentfault.com/a/1190000015051346](https://segmentfault.com/a/1190000015051346)

