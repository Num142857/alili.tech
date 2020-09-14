---
title: 'Golang Gin实践 连载十三 优化你的应用结构和实现Redis缓存' 
date: 2018-11-29 9:27:39
hidden: true
slug: 6cb0v00iyd
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">&#x4F18;&#x5316;&#x4F60;&#x7684;&#x5E94;&#x7528;&#x7ED3;&#x6784;&#x548C;&#x5B9E;&#x73B0;Redis&#x7F13;&#x5B58;</h1>
<p>&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/EDDYCJY/go-gin-example" rel="nofollow noreferrer" target="_blank">https://github.com/EDDYCJY/go...</a></p>
<p>&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x6240;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x70B9;&#x4E2A; Star &#x1F44D;</p>
<h2 id="articleHeader1">&#x524D;&#x8A00;</h2>
<p>&#x4E4B;&#x524D;&#x5C31;&#x5728;&#x60F3;&#xFF0C;&#x4E0D;&#x5C11;&#x6559;&#x7A0B;&#x6216;&#x793A;&#x4F8B;&#x7684;&#x4EE3;&#x7801;&#x8BBE;&#x8BA1;&#x90FD;&#x662F;&#x4E00;&#x6B65;&#x5230;&#x4F4D;&#x7684;&#xFF08;&#x4E5F;&#x6CA1;&#x95EE;&#x9898;&#xFF09;</p>
<p>&#x4F46;&#x5B9E;&#x9645;&#x64CD;&#x4F5C;&#x7684;&#x8BFB;&#x8005;&#x771F;&#x7684;&#x80FD;&#x591F;&#x7406;&#x89E3;&#x900F;&#x5F7B;&#x4E3A;&#x4EC0;&#x4E48;&#x5417;&#xFF1F;&#x5DE6;&#x601D;&#x53F3;&#x60F3;&#xFF0C;&#x6709;&#x4E86;&#x4ECA;&#x5929;&#x8FD9;&#x4E00;&#x7AE0;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x6211;&#x8BA4;&#x4E3A;&#x5B9E;&#x9645;&#x7ECF;&#x5386;&#x8FC7;&#x4E00;&#x904D;&#x5370;&#x8C61;&#x4F1A;&#x66F4;&#x52A0;&#x6DF1;&#x523B;</p>
<h2 id="articleHeader2">&#x89C4;&#x5212;</h2>
<p>&#x5728;&#x672C;&#x7AE0;&#x8282;&#xFF0C;&#x5C06;&#x4ECB;&#x7ECD;&#x4EE5;&#x4E0B;&#x529F;&#x80FD;&#x7684;&#x6574;&#x7406;&#xFF1A;</p>
<ul>
<li>&#x62BD;&#x79BB;&#x3001;&#x5206;&#x5C42;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#xFF1A;&#x51CF;&#x8F7B; routers/*.go &#x5185;&#x7684; api&#x65B9;&#x6CD5;&#x7684;&#x903B;&#x8F91;&#xFF08;&#x4F46;&#x672C;&#x6587;&#x6682;&#x4E0D;&#x5206;&#x5C42; repository&#xFF0C;&#x8FD9;&#x5757;&#x903B;&#x8F91;&#x8FD8;&#x4E0D;&#x91CD;&#xFF09;</li>
<li>&#x589E;&#x52A0;&#x5BB9;&#x9519;&#x6027;&#xFF1A;&#x5BF9; gorm &#x7684;&#x9519;&#x8BEF;&#x8FDB;&#x884C;&#x5224;&#x65AD;</li>
<li>Redis&#x7F13;&#x5B58;&#xFF1A;&#x5BF9;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7C7B;&#x7684;&#x63A5;&#x53E3;&#x589E;&#x52A0;&#x7F13;&#x5B58;&#x8BBE;&#x7F6E;</li>
<li>&#x51CF;&#x5C11;&#x91CD;&#x590D;&#x5197;&#x4F59;&#x4EE3;&#x7801;</li>
</ul>
<h2 id="articleHeader3">&#x95EE;&#x9898;&#x5728;&#x54EA;&#xFF1F;</h2>
<p>&#x5728;&#x89C4;&#x5212;&#x9636;&#x6BB5;&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x662F;&#x76EE;&#x524D;&#x7684;&#x4F2A;&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ! HasErrors() {
    if ExistArticleByID(id) {
        DeleteArticle(id)
        code = e.SUCCESS
    } else {
        code = e.ERROR_NOT_EXIST_ARTICLE
    }
} else {
    for _, err := range valid.Errors {
        logging.Info(err.Key, err.Message)
    }
}

c.JSON(http.StatusOK, gin.H{
    &quot;code&quot;: code,
    &quot;msg&quot;:  e.GetMsg(code),
    &quot;data&quot;: make(map[string]string),
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-keyword">if</span> ! HasErrors() {
    <span class="hljs-keyword">if</span> ExistArticleByID(id) {
        DeleteArticle(id)
        <span class="hljs-selector-tag">code</span> = e<span class="hljs-selector-class">.SUCCESS</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-selector-tag">code</span> = e<span class="hljs-selector-class">.ERROR_NOT_EXIST_ARTICLE</span>
    }
} <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">for</span> _, err := range valid<span class="hljs-selector-class">.Errors</span> {
        logging.Info(err<span class="hljs-selector-class">.Key</span>, err.Message)
    }
}

c.JSON(http<span class="hljs-selector-class">.StatusOK</span>, gin.H{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-selector-tag">code</span>,
    <span class="hljs-string">&quot;msg&quot;</span>:  e.GetMsg(code),
    <span class="hljs-string">&quot;data&quot;</span>: make(map[string]string),
})</code></pre>
<p>&#x5982;&#x679C;&#x52A0;&#x4E0A;&#x89C4;&#x5212;&#x5185;&#x7684;&#x529F;&#x80FD;&#x903B;&#x8F91;&#x5462;&#xFF0C;&#x4F2A;&#x4EE3;&#x7801;&#x4F1A;&#x53D8;&#x6210;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ! HasErrors() {
    exists, err := ExistArticleByID(id)
    if err == nil {
        if exists {
            err = DeleteArticle(id)
            if err == nil {
                code = e.SUCCESS
            } else {
                code = e.ERROR_XXX
            }
        } else {
            code = e.ERROR_NOT_EXIST_ARTICLE
        }
    } else {
        code = e.ERROR_XXX
    }
} else {
    for _, err := range valid.Errors {
        logging.Info(err.Key, err.Message)
    }
}

c.JSON(http.StatusOK, gin.H{
    &quot;code&quot;: code,
    &quot;msg&quot;:  e.GetMsg(code),
    &quot;data&quot;: make(map[string]string),
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-keyword">if</span> ! HasErrors() {
    exists, err := ExistArticleByID(id)
    <span class="hljs-keyword">if</span> err == nil {
        <span class="hljs-keyword">if</span> exists {
            err = DeleteArticle(id)
            <span class="hljs-keyword">if</span> err == nil {
                <span class="hljs-selector-tag">code</span> = e<span class="hljs-selector-class">.SUCCESS</span>
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-selector-tag">code</span> = e<span class="hljs-selector-class">.ERROR_XXX</span>
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-selector-tag">code</span> = e<span class="hljs-selector-class">.ERROR_NOT_EXIST_ARTICLE</span>
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-selector-tag">code</span> = e<span class="hljs-selector-class">.ERROR_XXX</span>
    }
} <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">for</span> _, err := range valid<span class="hljs-selector-class">.Errors</span> {
        logging.Info(err<span class="hljs-selector-class">.Key</span>, err.Message)
    }
}

c.JSON(http<span class="hljs-selector-class">.StatusOK</span>, gin.H{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-selector-tag">code</span>,
    <span class="hljs-string">&quot;msg&quot;</span>:  e.GetMsg(code),
    <span class="hljs-string">&quot;data&quot;</span>: make(map[string]string),
})</code></pre>
<p>&#x5982;&#x679C;&#x7F13;&#x5B58;&#x7684;&#x903B;&#x8F91;&#x4E5F;&#x52A0;&#x8FDB;&#x6765;&#xFF0C;&#x540E;&#x9762;&#x6162;&#x6162;&#x4E0D;&#x65AD;&#x7684;&#x8FED;&#x4EE3;&#xFF0C;&#x5C82;&#x4E0D;&#x662F;&#x4F1A;&#x53D8;&#x6210;&#x5982;&#x4E0B;&#x56FE;&#x4E00;&#x6837;&#xFF1F;</p>
<p><span class="img-wrap"><img data-src="https://coolshell.cn/wp-content/uploads/2017/04/IMG_7411.jpg" src="https://static.alili.techhttps://coolshell.cn/wp-content/uploads/2017/04/IMG_7411.jpg" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x4E86;&#x95EE;&#x9898;&#xFF0C;&#x5E94;&#x53CA;&#x65F6;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;&#x7ED3;&#x6784;&#x95EE;&#x9898;&#xFF0C;&#x540C;&#x65F6;&#x628A;&#x4EE3;&#x7801;&#x5199;&#x7684;&#x6E05;&#x6670;&#x3001;&#x6F02;&#x4EAE;&#x3001;&#x6613;&#x8BFB;&#x6613;&#x6539;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x6307;&#x6807;</p>
<h2 id="articleHeader4">&#x5982;&#x4F55;&#x6539;&#xFF1F;</h2>
<p>&#x5728;&#x5DE6;&#x8033;&#x6735;&#x8017;&#x5B50;&#x7684;&#x6587;&#x7AE0;&#x4E2D;&#xFF0C;&#x8FD9;&#x7C7B;&#x4EE3;&#x7801;&#x88AB;&#x79F0;&#x4E3A; &#x201C;&#x7BAD;&#x5934;&#x578B;&#x201D; &#x4EE3;&#x7801;&#xFF0C;&#x6709;&#x5982;&#x4E0B;&#x51E0;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p>
<p>1&#x3001;&#x6211;&#x7684;&#x663E;&#x793A;&#x5668;&#x4E0D;&#x591F;&#x5BBD;&#xFF0C;&#x7BAD;&#x5934;&#x578B;&#x4EE3;&#x7801;&#x7F29;&#x8FDB;&#x592A;&#x72E0;&#x4E86;&#xFF0C;&#x9700;&#x8981;&#x6211;&#x6765;&#x56DE;&#x62C9;&#x6C34;&#x5E73;&#x6EDA;&#x52A8;&#x6761;&#xFF0C;&#x8FD9;&#x8BA9;&#x6211;&#x5728;&#x8BFB;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x76F8;&#x5F53;&#x7684;&#x4E0D;&#x8212;&#x670D;</p>
<p>2&#x3001;&#x9664;&#x4E86;&#x5BBD;&#x5EA6;&#x5916;&#x8FD8;&#x6709;&#x957F;&#x5EA6;&#xFF0C;&#x6709;&#x7684;&#x4EE3;&#x7801;&#x7684; if-else &#x91CC;&#x7684; if-else &#x91CC;&#x7684; if-else &#x7684;&#x4EE3;&#x7801;&#x592A;&#x591A;&#xFF0C;&#x8BFB;&#x5230;&#x4E2D;&#x95F4;&#x4F60;&#x90FD;&#x4E0D;&#x77E5;&#x9053;&#x4E2D;&#x95F4;&#x7684;&#x4EE3;&#x7801;&#x662F;&#x7ECF;&#x8FC7;&#x4E86;&#x4EC0;&#x4E48;&#x6837;&#x7684;&#x5C42;&#x5C42;&#x68C0;&#x67E5;&#x624D;&#x6765;&#x5230;&#x8FD9;&#x91CC;&#x7684;</p>
<p>&#x603B;&#x800C;&#x8A00;&#x4E4B;&#xFF0C;&#x201C;&#x7BAD;&#x5934;&#x578B;&#x4EE3;&#x7801;&#x201D;&#x5982;&#x679C;&#x5D4C;&#x5957;&#x592A;&#x591A;&#xFF0C;&#x4EE3;&#x7801;&#x592A;&#x957F;&#x7684;&#x8BDD;&#xFF0C;&#x4F1A;&#x76F8;&#x5F53;&#x5BB9;&#x6613;&#x8BA9;&#x7EF4;&#x62A4;&#x4EE3;&#x7801;&#x7684;&#x4EBA;&#xFF08;&#x5305;&#x62EC;&#x81EA;&#x5DF1;&#xFF09;&#x8FF7;&#x5931;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x56E0;&#x4E3A;&#x770B;&#x5230;&#x6700;&#x5185;&#x5C42;&#x7684;&#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x4F60;&#x5DF2;&#x7ECF;&#x4E0D;&#x77E5;&#x9053;&#x524D;&#x9762;&#x7684;&#x90A3;&#x4E00;&#x5C42;&#x4E00;&#x5C42;&#x7684;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#x662F;&#x4EC0;&#x4E48;&#x6837;&#x7684;&#xFF0C;&#x4EE3;&#x7801;&#x662F;&#x600E;&#x4E48;&#x8FD0;&#x884C;&#x5230;&#x8FD9;&#x91CC;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x7BAD;&#x5934;&#x578B;&#x4EE3;&#x7801;&#x662F;&#x975E;&#x5E38;&#x96BE;&#x4EE5;&#x7EF4;&#x62A4;&#x548C;Debug&#x7684;&#x3002;</p>
<p>&#x7B80;&#x5355;&#x7684;&#x6765;&#x8BF4;&#xFF0C;&#x5C31;&#x662F;<strong>&#x8BA9;&#x51FA;&#x9519;&#x7684;&#x4EE3;&#x7801;&#x5148;&#x8FD4;&#x56DE;&#xFF0C;&#x524D;&#x9762;&#x628A;&#x6240;&#x6709;&#x7684;&#x9519;&#x8BEF;&#x5224;&#x65AD;&#x5168;&#x5224;&#x65AD;&#x6389;&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x5269;&#x4E0B;&#x7684;&#x5C31;&#x662F;&#x6B63;&#x5E38;&#x7684;&#x4EE3;&#x7801;&#x4E86;</strong></p>
<p>&#xFF08;&#x6CE8;&#x610F;&#xFF1A;&#x672C;&#x6BB5;&#x5F15;&#x7528;&#x81EA;&#x8017;&#x5B50;&#x54E5;&#x7684; <a href="https://coolshell.cn/articles/17757.html" rel="nofollow noreferrer" target="_blank">&#x5982;&#x4F55;&#x91CD;&#x6784;&#x201C;&#x7BAD;&#x5934;&#x578B;&#x201D;&#x4EE3;&#x7801;</a>&#xFF0C;&#x5EFA;&#x8BAE;&#x7EC6;&#x7EC6;&#x54C1;&#x5C1D;&#xFF09;</p>
<h2 id="articleHeader5">&#x843D;&#x5B9E;</h2>
<p>&#x672C;&#x9879;&#x76EE;&#x5C06;&#x5BF9;&#x65E2;&#x6709;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x4F18;&#x5316;&#x548C;&#x5B9E;&#x73B0;&#x7F13;&#x5B58;&#xFF0C;&#x5E0C;&#x671B;&#x4F60;&#x4E60;&#x5F97;&#x65B9;&#x6CD5;&#x5E76;&#x5BF9;&#x5176;&#x4ED6;&#x5730;&#x65B9;&#x4E5F;&#x8FDB;&#x884C;&#x4F18;&#x5316;</p>
<p>&#x7B2C;&#x4E00;&#x6B65;&#xFF1A;&#x5B8C;&#x6210; Redis &#x7684;&#x57FA;&#x7840;&#x8BBE;&#x65BD;&#x5EFA;&#x8BBE;&#xFF08;&#x9700;&#x8981;&#x4F60;&#x5148;&#x88C5;&#x597D; Redis&#xFF09;</p>
<p>&#x7B2C;&#x4E8C;&#x6B65;&#xFF1A;&#x5BF9;&#x73B0;&#x6709;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x62C6;&#x89E3;&#x3001;&#x5206;&#x5C42;&#xFF08;&#x4E0D;&#x4F1A;&#x8D34;&#x4E0A;&#x5177;&#x4F53;&#x6B65;&#x9AA4;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5E0C;&#x671B;&#x4F60;&#x80FD;&#x591F;&#x5B9E;&#x64CD;&#x4E00;&#x6CE2;&#xFF0C;&#x52A0;&#x6DF1;&#x7406;&#x89E3;&#x1F914;&#xFF09;</p>
<h3 id="articleHeader6">Redis</h3>
<h4>&#x4E00;&#x3001;&#x914D;&#x7F6E;</h4>
<p>&#x6253;&#x5F00; conf/app.ini &#x6587;&#x4EF6;&#xFF0C;&#x65B0;&#x589E;&#x914D;&#x7F6E;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
[redis]
Host = 127.0.0.1:6379
Password =
MaxIdle = 30
MaxActive = 30
IdleTimeout = 200" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs makefile"><code>...
[redis]
Host = 127.0.0.1:6379
Password =
MaxIdle = 30
MaxActive = 30
IdleTimeout = 200</code></pre>
<h4>&#x4E8C;&#x3001;&#x7F13;&#x5B58; Prefix</h4>
<p>&#x6253;&#x5F00; pkg/e &#x76EE;&#x5F55;&#xFF0C;&#x65B0;&#x5EFA; cache.go&#xFF0C;&#x5199;&#x5165;&#x5185;&#x5BB9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package e

const (
    CACHE_ARTICLE = &quot;ARTICLE&quot;
    CACHE_TAG     = &quot;TAG&quot;
)" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs objectivec"><code>package e

<span class="hljs-keyword">const</span> (
    <span class="hljs-built_in">CACHE_ARTICLE</span> = <span class="hljs-string">&quot;ARTICLE&quot;</span>
    <span class="hljs-built_in">CACHE_TAG</span>     = <span class="hljs-string">&quot;TAG&quot;</span>
)</code></pre>
<h4>&#x4E09;&#x3001;&#x7F13;&#x5B58; Key</h4>
<p>&#xFF08;1&#xFF09;&#x3001;&#x6253;&#x5F00; service &#x76EE;&#x5F55;&#xFF0C;&#x65B0;&#x5EFA; cache_service/article.go</p>
<p>&#x5199;&#x5165;&#x5185;&#x5BB9;&#xFF1A;<a href="https://github.com/EDDYCJY/go-gin-example/blob/master/service/cache_service/article.go" rel="nofollow noreferrer" target="_blank">&#x4F20;&#x9001;&#x95E8;</a></p>
<p>&#xFF08;2&#xFF09;&#x3001;&#x6253;&#x5F00; service &#x76EE;&#x5F55;&#xFF0C;&#x65B0;&#x5EFA; cache_service/tag.go</p>
<p>&#x5199;&#x5165;&#x5185;&#x5BB9;&#xFF1A;<a href="https://github.com/EDDYCJY/go-gin-example/blob/master/service/cache_service/tag.go" rel="nofollow noreferrer" target="_blank">&#x4F20;&#x9001;&#x95E8;</a></p>
<p>&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#x4E3B;&#x8981;&#x662F;&#x7F16;&#x5199;&#x83B7;&#x53D6;&#x7F13;&#x5B58; KEY &#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x76F4;&#x63A5;&#x53C2;&#x8003;&#x4F20;&#x9001;&#x95E8;&#x5373;&#x53EF;</p>
<h4>&#x56DB;&#x3001;Redis &#x5DE5;&#x5177;&#x5305;</h4>
<p>&#x6253;&#x5F00; pkg &#x76EE;&#x5F55;&#xFF0C;&#x65B0;&#x5EFA; gredis/redis.go&#xFF0C;&#x5199;&#x5165;&#x5185;&#x5BB9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package gredis

import (
    &quot;encoding/json&quot;
    &quot;time&quot;

    &quot;github.com/gomodule/redigo/redis&quot;

    &quot;github.com/EDDYCJY/go-gin-example/pkg/setting&quot;
)

var RedisConn *redis.Pool

func Setup() error {
    RedisConn = &amp;redis.Pool{
        MaxIdle:     setting.RedisSetting.MaxIdle,
        MaxActive:   setting.RedisSetting.MaxActive,
        IdleTimeout: setting.RedisSetting.IdleTimeout,
        Dial: func() (redis.Conn, error) {
            c, err := redis.Dial(&quot;tcp&quot;, setting.RedisSetting.Host)
            if err != nil {
                return nil, err
            }
            if setting.RedisSetting.Password != &quot;&quot; {
                if _, err := c.Do(&quot;AUTH&quot;, setting.RedisSetting.Password); err != nil {
                    c.Close()
                    return nil, err
                }
            }
            return c, err
        },
        TestOnBorrow: func(c redis.Conn, t time.Time) error {
            _, err := c.Do(&quot;PING&quot;)
            return err
        },
    }

    return nil
}

func Set(key string, data interface{}, time int) (bool, error) {
    conn := RedisConn.Get()
    defer conn.Close()

    value, err := json.Marshal(data)
    if err != nil {
        return false, err
    }

    reply, err := redis.Bool(conn.Do(&quot;SET&quot;, key, value))
    conn.Do(&quot;EXPIRE&quot;, key, time)

    return reply, err
}

func Exists(key string) bool {
    conn := RedisConn.Get()
    defer conn.Close()

    exists, err := redis.Bool(conn.Do(&quot;EXISTS&quot;, key))
    if err != nil {
        return false
    }

    return exists
}

func Get(key string) ([]byte, error) {
    conn := RedisConn.Get()
    defer conn.Close()

    reply, err := redis.Bytes(conn.Do(&quot;GET&quot;, key))
    if err != nil {
        return nil, err
    }

    return reply, nil
}

func Delete(key string) (bool, error) {
    conn := RedisConn.Get()
    defer conn.Close()

    return redis.Bool(conn.Do(&quot;DEL&quot;, key))
}

func LikeDeletes(key string) error {
    conn := RedisConn.Get()
    defer conn.Close()

    keys, err := redis.Strings(conn.Do(&quot;KEYS&quot;, &quot;*&quot;+key+&quot;*&quot;))
    if err != nil {
        return err
    }

    for _, key := range keys {
        _, err = Delete(key)
        if err != nil {
            return err
        }
    }

    return nil
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">package</span> gredis

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;encoding/json&quot;</span>
    <span class="hljs-string">&quot;time&quot;</span>

    <span class="hljs-string">&quot;github.com/gomodule/redigo/redis&quot;</span>

    <span class="hljs-string">&quot;github.com/EDDYCJY/go-gin-example/pkg/setting&quot;</span>
)

<span class="hljs-keyword">var</span> RedisConn *redis.Pool

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Setup</span><span class="hljs-params">()</span> <span class="hljs-title">error</span></span> {
    RedisConn = &amp;redis.Pool{
        MaxIdle:     setting.RedisSetting.MaxIdle,
        MaxActive:   setting.RedisSetting.MaxActive,
        IdleTimeout: setting.RedisSetting.IdleTimeout,
        Dial: <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span> <span class="hljs-params">(redis.Conn, error)</span></span> {
            c, err := redis.Dial(<span class="hljs-string">&quot;tcp&quot;</span>, setting.RedisSetting.Host)
            <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
                <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>, err
            }
            <span class="hljs-keyword">if</span> setting.RedisSetting.Password != <span class="hljs-string">&quot;&quot;</span> {
                <span class="hljs-keyword">if</span> _, err := c.Do(<span class="hljs-string">&quot;AUTH&quot;</span>, setting.RedisSetting.Password); err != <span class="hljs-literal">nil</span> {
                    c.Close()
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>, err
                }
            }
            <span class="hljs-keyword">return</span> c, err
        },
        TestOnBorrow: <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(c redis.Conn, t time.Time)</span> <span class="hljs-title">error</span></span> {
            _, err := c.Do(<span class="hljs-string">&quot;PING&quot;</span>)
            <span class="hljs-keyword">return</span> err
        },
    }

    <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Set</span><span class="hljs-params">(key <span class="hljs-keyword">string</span>, data <span class="hljs-keyword">interface</span>{}, time <span class="hljs-keyword">int</span>)</span> <span class="hljs-params">(<span class="hljs-keyword">bool</span>, error)</span></span> {
    conn := RedisConn.Get()
    <span class="hljs-keyword">defer</span> conn.Close()

    value, err := json.Marshal(data)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>, err
    }

    reply, err := redis.Bool(conn.Do(<span class="hljs-string">&quot;SET&quot;</span>, key, value))
    conn.Do(<span class="hljs-string">&quot;EXPIRE&quot;</span>, key, time)

    <span class="hljs-keyword">return</span> reply, err
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Exists</span><span class="hljs-params">(key <span class="hljs-keyword">string</span>)</span> <span class="hljs-title">bool</span></span> {
    conn := RedisConn.Get()
    <span class="hljs-keyword">defer</span> conn.Close()

    exists, err := redis.Bool(conn.Do(<span class="hljs-string">&quot;EXISTS&quot;</span>, key))
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }

    <span class="hljs-keyword">return</span> exists
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Get</span><span class="hljs-params">(key <span class="hljs-keyword">string</span>)</span> <span class="hljs-params">([]<span class="hljs-keyword">byte</span>, error)</span></span> {
    conn := RedisConn.Get()
    <span class="hljs-keyword">defer</span> conn.Close()

    reply, err := redis.Bytes(conn.Do(<span class="hljs-string">&quot;GET&quot;</span>, key))
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>, err
    }

    <span class="hljs-keyword">return</span> reply, <span class="hljs-literal">nil</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Delete</span><span class="hljs-params">(key <span class="hljs-keyword">string</span>)</span> <span class="hljs-params">(<span class="hljs-keyword">bool</span>, error)</span></span> {
    conn := RedisConn.Get()
    <span class="hljs-keyword">defer</span> conn.Close()

    <span class="hljs-keyword">return</span> redis.Bool(conn.Do(<span class="hljs-string">&quot;DEL&quot;</span>, key))
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">LikeDeletes</span><span class="hljs-params">(key <span class="hljs-keyword">string</span>)</span> <span class="hljs-title">error</span></span> {
    conn := RedisConn.Get()
    <span class="hljs-keyword">defer</span> conn.Close()

    keys, err := redis.Strings(conn.Do(<span class="hljs-string">&quot;KEYS&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>+key+<span class="hljs-string">&quot;*&quot;</span>))
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> err
    }

    <span class="hljs-keyword">for</span> _, key := <span class="hljs-keyword">range</span> keys {
        _, err = Delete(key)
        <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
            <span class="hljs-keyword">return</span> err
        }
    }

    <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>
}</code></pre>
<p>&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x505A;&#x4E86;&#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x529F;&#x80FD;&#x5C01;&#x88C5;</p>
<p>1&#x3001;&#x8BBE;&#x7F6E; RedisConn &#x4E3A; redis.Pool&#xFF08;&#x8FDE;&#x63A5;&#x6C60;&#xFF09;&#x5E76;&#x914D;&#x7F6E;&#x4E86;&#x5B83;&#x7684;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#xFF1A;</p>
<ul>
<li>Dial&#xFF1A;&#x63D0;&#x4F9B;&#x521B;&#x5EFA;&#x548C;&#x914D;&#x7F6E;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x8FDE;&#x63A5;&#x7684;&#x4E00;&#x4E2A;&#x51FD;&#x6570;</li>
<li>TestOnBorrow&#xFF1A;&#x53EF;&#x9009;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x68C0;&#x67E5;&#x5065;&#x5EB7;&#x529F;&#x80FD;</li>
<li>MaxIdle&#xFF1A;&#x6700;&#x5927;&#x7A7A;&#x95F2;&#x8FDE;&#x63A5;&#x6570;</li>
<li>MaxActive&#xFF1A;&#x5728;&#x7ED9;&#x5B9A;&#x65F6;&#x95F4;&#x5185;&#xFF0C;&#x5141;&#x8BB8;&#x5206;&#x914D;&#x7684;&#x6700;&#x5927;&#x8FDE;&#x63A5;&#x6570;&#xFF08;&#x5F53;&#x4E3A;&#x96F6;&#x65F6;&#xFF0C;&#x6CA1;&#x6709;&#x9650;&#x5236;&#xFF09;</li>
<li>IdleTimeout&#xFF1A;&#x5728;&#x7ED9;&#x5B9A;&#x65F6;&#x95F4;&#x5185;&#x5C06;&#x4F1A;&#x4FDD;&#x6301;&#x7A7A;&#x95F2;&#x72B6;&#x6001;&#xFF0C;&#x82E5;&#x5230;&#x8FBE;&#x65F6;&#x95F4;&#x9650;&#x5236;&#x5219;&#x5173;&#x95ED;&#x8FDE;&#x63A5;&#xFF08;&#x5F53;&#x4E3A;&#x96F6;&#x65F6;&#xFF0C;&#x6CA1;&#x6709;&#x9650;&#x5236;&#xFF09;</li>
</ul>
<p>2&#x3001;&#x5C01;&#x88C5;&#x57FA;&#x7840;&#x65B9;&#x6CD5;</p>
<p>&#x6587;&#x4EF6;&#x5185;&#x5305;&#x542B; Set&#x3001;Exists&#x3001;Get&#x3001;Delete&#x3001;LikeDeletes &#x7528;&#x4E8E;&#x652F;&#x6491;&#x76EE;&#x524D;&#x7684;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#xFF0C;&#x800C;&#x5728;&#x91CC;&#x9762;&#x6D89;&#x53CA;&#x5230;&#x4E86;&#x5982;&#x65B9;&#x6CD5;&#xFF1A;</p>
<p>&#xFF08;1&#xFF09;<code>RedisConn.Get()</code>&#xFF1A;&#x5728;&#x8FDE;&#x63A5;&#x6C60;&#x4E2D;&#x83B7;&#x53D6;&#x4E00;&#x4E2A;&#x6D3B;&#x8DC3;&#x8FDE;&#x63A5;</p>
<p>&#xFF08;2&#xFF09;<code>conn.Do(commandName string, args ...interface{})</code>&#xFF1A;&#x5411; Redis &#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x547D;&#x4EE4;&#x5E76;&#x8FD4;&#x56DE;&#x6536;&#x5230;&#x7684;&#x7B54;&#x590D;</p>
<p>&#xFF08;3&#xFF09;<code>redis.Bool(reply interface{}, err error)</code>&#xFF1A;&#x5C06;&#x547D;&#x4EE4;&#x8FD4;&#x56DE;&#x8F6C;&#x4E3A;&#x5E03;&#x5C14;&#x503C;</p>
<p>&#xFF08;4&#xFF09;<code>redis.Bytes(reply interface{}, err error)</code>&#xFF1A;&#x5C06;&#x547D;&#x4EE4;&#x8FD4;&#x56DE;&#x8F6C;&#x4E3A; Bytes</p>
<p>&#xFF08;5&#xFF09;<code>redis.Strings(reply interface{}, err error)</code>&#xFF1A;&#x5C06;&#x547D;&#x4EE4;&#x8FD4;&#x56DE;&#x8F6C;&#x4E3A; []string</p>
<p>&#x5728; <a href="https://godoc.org/github.com/gomodule/redigo/redis" rel="nofollow noreferrer" target="_blank">redigo</a> &#x4E2D;&#x5305;&#x542B;&#x5927;&#x91CF;&#x7C7B;&#x4F3C;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4E07;&#x53D8;&#x4E0D;&#x79BB;&#x5176;&#x5B97;&#xFF0C;&#x5EFA;&#x8BAE;&#x719F;&#x6089;&#x5176;&#x4F7F;&#x7528;&#x89C4;&#x5219;&#x548C; <a href="http://doc.redisfans.com/index.html" rel="nofollow noreferrer" target="_blank">Redis&#x547D;&#x4EE4;</a> &#x5373;&#x53EF;</p>
<p>&#x5230;&#x8FD9;&#x91CC;&#x4E3A;&#x6B62;&#xFF0C;Redis &#x5C31;&#x53EF;&#x4EE5;&#x6109;&#x5FEB;&#x7684;&#x8C03;&#x7528;&#x5566;&#x3002;&#x53E6;&#x5916;&#x53D7;&#x7BC7;&#x5E45;&#x9650;&#x5236;&#xFF0C;&#x8FD9;&#x5757;&#x7684;&#x6DF1;&#x5165;&#x8BB2;&#x89E3;&#x4F1A;&#x53E6;&#x5916;&#x5F00;&#x8BBE;&#xFF01;</p>
<h3 id="articleHeader7">&#x62C6;&#x89E3;&#x3001;&#x5206;&#x5C42;</h3>
<p>&#x5728;&#x5148;&#x524D;&#x89C4;&#x5212;&#x4E2D;&#xFF0C;&#x5F15;&#x51FA;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x53BB;&#x4F18;&#x5316;&#x6211;&#x4EEC;&#x7684;&#x5E94;&#x7528;&#x7ED3;&#x6784;</p>
<ul>
<li>&#x9519;&#x8BEF;&#x63D0;&#x524D;&#x8FD4;&#x56DE;</li>
<li>&#x7EDF;&#x4E00;&#x8FD4;&#x56DE;&#x65B9;&#x6CD5;</li>
<li>&#x62BD;&#x79BB; Service&#xFF0C;&#x51CF;&#x8F7B; routers/api &#x7684;&#x903B;&#x8F91;&#xFF0C;&#x8FDB;&#x884C;&#x5206;&#x5C42;</li>
<li>&#x589E;&#x52A0; gorm &#x9519;&#x8BEF;&#x5224;&#x65AD;&#xFF0C;&#x8BA9;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x66F4;&#x660E;&#x786E;&#xFF08;&#x589E;&#x52A0;&#x5185;&#x90E8;&#x9519;&#x8BEF;&#x7801;&#xFF09;</li>
</ul>
<h4>&#x7F16;&#x5199;&#x8FD4;&#x56DE;&#x65B9;&#x6CD5;</h4>
<p>&#x8981;&#x8BA9;&#x9519;&#x8BEF;&#x63D0;&#x524D;&#x8FD4;&#x56DE;&#xFF0C;c.JSON &#x7684;&#x4FB5;&#x5165;&#x662F;&#x4E0D;&#x53EF;&#x907F;&#x514D;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x53EF;&#x4EE5;&#x8BA9;&#x5176;&#x66F4;&#x5177;&#x53EF;&#x53D8;&#x6027;&#xFF0C;&#x6307;&#x4E0D;&#x5B9A;&#x54EA;&#x5929;&#x5C31;&#x53D8; XML &#x4E86;&#x5462;&#xFF1F;</p>
<p>1&#x3001;&#x6253;&#x5F00; pkg &#x76EE;&#x5F55;&#xFF0C;&#x65B0;&#x5EFA; app/request.go&#xFF0C;&#x5199;&#x5165;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package app

import (
    &quot;github.com/astaxie/beego/validation&quot;

    &quot;github.com/EDDYCJY/go-gin-example/pkg/logging&quot;
)

func MarkErrors(errors []*validation.Error) {
    for _, err := range errors {
        logging.Info(err.Key, err.Message)
    }

    return
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">package</span> app

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/astaxie/beego/validation&quot;</span>

    <span class="hljs-string">&quot;github.com/EDDYCJY/go-gin-example/pkg/logging&quot;</span>
)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">MarkErrors</span><span class="hljs-params">(errors []*validation.Error)</span></span> {
    <span class="hljs-keyword">for</span> _, err := <span class="hljs-keyword">range</span> errors {
        logging.Info(err.Key, err.Message)
    }

    <span class="hljs-keyword">return</span>
}</code></pre>
<p>2&#x3001;&#x6253;&#x5F00; pkg &#x76EE;&#x5F55;&#xFF0C;&#x65B0;&#x5EFA; app/response.go&#xFF0C;&#x5199;&#x5165;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package app

import (
    &quot;github.com/gin-gonic/gin&quot;

    &quot;github.com/EDDYCJY/go-gin-example/pkg/e&quot;
)

type Gin struct {
    C *gin.Context
}

func (g *Gin) Response(httpCode, errCode int, data interface{}) {
    g.C.JSON(httpCode, gin.H{
        &quot;code&quot;: httpCode,
        &quot;msg&quot;:  e.GetMsg(errCode),
        &quot;data&quot;: data,
    })

    return
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">package</span> app

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/gin-gonic/gin&quot;</span>

    <span class="hljs-string">&quot;github.com/EDDYCJY/go-gin-example/pkg/e&quot;</span>
)

<span class="hljs-keyword">type</span> Gin <span class="hljs-keyword">struct</span> {
    C *gin.Context
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(g *Gin)</span> <span class="hljs-title">Response</span><span class="hljs-params">(httpCode, errCode <span class="hljs-keyword">int</span>, data <span class="hljs-keyword">interface</span>{})</span></span> {
    g.C.JSON(httpCode, gin.H{
        <span class="hljs-string">&quot;code&quot;</span>: httpCode,
        <span class="hljs-string">&quot;msg&quot;</span>:  e.GetMsg(errCode),
        <span class="hljs-string">&quot;data&quot;</span>: data,
    })

    <span class="hljs-keyword">return</span>
}</code></pre>
<p>&#x8FD9;&#x6837;&#x5B50;&#x4EE5;&#x540E;&#x5982;&#x679C;&#x8981;&#x53D8;&#x52A8;&#xFF0C;&#x76F4;&#x63A5;&#x6539;&#x52A8; app &#x5305;&#x5185;&#x7684;&#x65B9;&#x6CD5;&#x5373;&#x53EF;</p>
<h4>&#x4FEE;&#x6539;&#x65E2;&#x6709;&#x903B;&#x8F91;</h4>
<p>&#x6253;&#x5F00; routers/api/v1/article.go&#xFF0C;&#x67E5;&#x770B;&#x4FEE;&#x6539; GetArticle &#x65B9;&#x6CD5;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x4E3A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func GetArticle(c *gin.Context) {
    appG := app.Gin{c}
    id := com.StrTo(c.Param(&quot;id&quot;)).MustInt()
    valid := validation.Validation{}
    valid.Min(id, 1, &quot;id&quot;).Message(&quot;ID&#x5FC5;&#x987B;&#x5927;&#x4E8E;0&quot;)

    if valid.HasErrors() {
        app.MarkErrors(valid.Errors)
        appG.Response(http.StatusOK, e.INVALID_PARAMS, nil)
        return
    }

    articleService := article_service.Article{ID: id}
    exists, err := articleService.ExistByID()
    if err != nil {
        appG.Response(http.StatusOK, e.ERROR_CHECK_EXIST_ARTICLE_FAIL, nil)
        return
    }
    if !exists {
        appG.Response(http.StatusOK, e.ERROR_NOT_EXIST_ARTICLE, nil)
        return
    }

    article, err := articleService.Get()
    if err != nil {
        appG.Response(http.StatusOK, e.ERROR_GET_ARTICLE_FAIL, nil)
        return
    }

    appG.Response(http.StatusOK, e.SUCCESS, article)
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="go hljs"><code class="go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">GetArticle</span><span class="hljs-params">(c *gin.Context)</span></span> {
    appG := app.Gin{c}
    id := com.StrTo(c.Param(<span class="hljs-string">&quot;id&quot;</span>)).MustInt()
    valid := validation.Validation{}
    valid.Min(id, <span class="hljs-number">1</span>, <span class="hljs-string">&quot;id&quot;</span>).Message(<span class="hljs-string">&quot;ID&#x5FC5;&#x987B;&#x5927;&#x4E8E;0&quot;</span>)

    <span class="hljs-keyword">if</span> valid.HasErrors() {
        app.MarkErrors(valid.Errors)
        appG.Response(http.StatusOK, e.INVALID_PARAMS, <span class="hljs-literal">nil</span>)
        <span class="hljs-keyword">return</span>
    }

    articleService := article_service.Article{ID: id}
    exists, err := articleService.ExistByID()
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        appG.Response(http.StatusOK, e.ERROR_CHECK_EXIST_ARTICLE_FAIL, <span class="hljs-literal">nil</span>)
        <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">if</span> !exists {
        appG.Response(http.StatusOK, e.ERROR_NOT_EXIST_ARTICLE, <span class="hljs-literal">nil</span>)
        <span class="hljs-keyword">return</span>
    }

    article, err := articleService.Get()
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        appG.Response(http.StatusOK, e.ERROR_GET_ARTICLE_FAIL, <span class="hljs-literal">nil</span>)
        <span class="hljs-keyword">return</span>
    }

    appG.Response(http.StatusOK, e.SUCCESS, article)
}</code></pre>
<p>&#x8FD9;&#x91CC;&#x6709;&#x51E0;&#x4E2A;&#x503C;&#x5F97;&#x53D8;&#x52A8;&#x70B9;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x5728;&#x5185;&#x90E8;&#x589E;&#x52A0;&#x4E86;&#x9519;&#x8BEF;&#x8FD4;&#x56DE;&#xFF0C;&#x5982;&#x679C;&#x5B58;&#x5728;&#x9519;&#x8BEF;&#x5219;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x3002;&#x53E6;&#x5916;&#x8FDB;&#x884C;&#x4E86;&#x5206;&#x5C42;&#xFF0C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5185;&#x805A;&#x5230;&#x4E86; service &#x5C42;&#x4E2D;&#x53BB;&#xFF0C;&#x800C; routers/api&#xFF08;controller&#xFF09;&#x663E;&#x8457;&#x51CF;&#x8F7B;&#xFF0C;&#x4EE3;&#x7801;&#x4F1A;&#x66F4;&#x52A0;&#x7684;&#x76F4;&#x89C2;</p>
<p>&#x4F8B;&#x5982; service/article_service &#x4E0B;&#x7684; <code>articleService.Get()</code> &#x65B9;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func (a *Article) Get() (*models.Article, error) {
    var cacheArticle *models.Article

    cache := cache_service.Article{ID: a.ID}
    key := cache.GetArticleKey()
    if gredis.Exists(key) {
        data, err := gredis.Get(key)
        if err != nil {
            logging.Info(err)
        } else {
            json.Unmarshal(data, &amp;cacheArticle)
            return cacheArticle, nil
        }
    }

    article, err := models.GetArticle(a.ID)
    if err != nil {
        return nil, err
    }

    gredis.Set(key, article, 3600)
    return article, nil
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(a *Article)</span> <span class="hljs-title">Get</span><span class="hljs-params">()</span> <span class="hljs-params">(*models.Article, error)</span></span> {
    <span class="hljs-keyword">var</span> cacheArticle *models.Article

    cache := cache_service.Article{ID: a.ID}
    key := cache.GetArticleKey()
    <span class="hljs-keyword">if</span> gredis.Exists(key) {
        data, err := gredis.Get(key)
        <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
            logging.Info(err)
        } <span class="hljs-keyword">else</span> {
            json.Unmarshal(data, &amp;cacheArticle)
            <span class="hljs-keyword">return</span> cacheArticle, <span class="hljs-literal">nil</span>
        }
    }

    article, err := models.GetArticle(a.ID)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>, err
    }

    gredis.Set(key, article, <span class="hljs-number">3600</span>)
    <span class="hljs-keyword">return</span> article, <span class="hljs-literal">nil</span>
}</code></pre>
<p>&#x800C;&#x5BF9;&#x4E8E; gorm &#x7684; &#x9519;&#x8BEF;&#x8FD4;&#x56DE;&#x8BBE;&#x7F6E;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x4FEE;&#x6539; models/article.go &#x5982;&#x4E0B;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func GetArticle(id int) (*Article, error) {
    var article Article
    err := db.Where(&quot;id = ? AND deleted_on = ? &quot;, id, 0).First(&amp;article).Related(&amp;article.Tag).Error
    if err != nil &amp;&amp; err != gorm.ErrRecordNotFound {
        return nil, err
    }

    return &amp;article, nil
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">GetArticle</span><span class="hljs-params">(id <span class="hljs-keyword">int</span>)</span> <span class="hljs-params">(*Article, error)</span></span> {
    <span class="hljs-keyword">var</span> article Article
    err := db.Where(<span class="hljs-string">&quot;id = ? AND deleted_on = ? &quot;</span>, id, <span class="hljs-number">0</span>).First(&amp;article).Related(&amp;article.Tag).Error
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> &amp;&amp; err != gorm.ErrRecordNotFound {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>, err
    }

    <span class="hljs-keyword">return</span> &amp;article, <span class="hljs-literal">nil</span>
}</code></pre>
<p>&#x4E60;&#x60EF;&#x6027;&#x589E;&#x52A0; .Error&#xFF0C;&#x628A;&#x63A7;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x7684;&#x9519;&#x8BEF;&#x3002;&#x53E6;&#x5916;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x4E00;&#x70B9;&#xFF0C;&#x5728; gorm &#x4E2D;&#xFF0C;&#x67E5;&#x627E;&#x4E0D;&#x5230;&#x8BB0;&#x5F55;&#x4E5F;&#x7B97;&#x4E00;&#x79CD; &#x201C;&#x9519;&#x8BEF;&#x201D; &#x54E6;</p>
<h2 id="articleHeader8">&#x6700;&#x540E;</h2>
<p>&#x663E;&#x7136;&#xFF0C;&#x672C;&#x7AE0;&#x8282;&#x5E76;&#x4E0D;&#x662F;&#x4F60;&#x8DDF;&#x7740;&#x6211;&#x6572;&#x7CFB;&#x5217;&#x3002;&#x6211;&#x7ED9;&#x4F60;&#x7684;&#x8BFE;&#x9898;&#x662F; &#x201C;&#x5B9E;&#x73B0; Redis &#x7F13;&#x5B58;&#x5E76;&#x4F18;&#x5316;&#x65E2;&#x6709;&#x7684;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4EE3;&#x7801;&#x201D;</p>
<p>&#x8BA9;&#x5176;&#x80FD;&#x591F;&#x4E0D;&#x65AD;&#x5730;&#x9002;&#x5E94;&#x4E1A;&#x52A1;&#x7684;&#x53D1;&#x5C55;&#xFF0C;&#x8BA9;&#x4EE3;&#x7801;&#x66F4;&#x6E05;&#x6670;&#x6613;&#x8BFB;&#xFF0C;&#x4E14;&#x5448;&#x5C42;&#x7EA7;&#x548C;&#x7ED3;&#x6784;&#x6027;</p>
<p>&#x5982;&#x679C;&#x6709;&#x7591;&#x60D1;&#xFF0C;&#x53EF;&#x4EE5;&#x5230; <a href="https://github.com/EDDYCJY/go-gin-example" rel="nofollow noreferrer" target="_blank">go-gin-example</a> &#x770B;&#x770B;&#x6211;&#x662F;&#x600E;&#x4E48;&#x5199;&#x7684;&#xFF0C;&#x4F60;&#x662F;&#x600E;&#x4E48;&#x5199;&#x7684;&#xFF0C;&#x53C8;&#x5206;&#x522B;&#x6709;&#x4EC0;&#x4E48;&#x4F18;&#x52BF;&#x3001;&#x52A3;&#x52BF;&#xFF0C;&#x53D6;&#x957F;&#x8865;&#x77ED;&#x4E00;&#x6CE2;&#xFF1F;</p>
<h2 id="articleHeader9">&#x53C2;&#x8003;</h2>
<h3 id="articleHeader10">&#x672C;&#x7CFB;&#x5217;&#x793A;&#x4F8B;&#x4EE3;&#x7801;</h3>
<ul><li><a href="https://github.com/EDDYCJY/go-gin-example" rel="nofollow noreferrer" target="_blank">go-gin-example</a></li></ul>
<h3 id="articleHeader11">&#x672C;&#x7CFB;&#x5217;&#x76EE;&#x5F55;</h3>
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
<h3 id="articleHeader12">&#x63A8;&#x8350;&#x9605;&#x8BFB;</h3>
<ul><li><a href="https://coolshell.cn/articles/17757.html" rel="nofollow noreferrer" target="_blank">&#x5982;&#x4F55;&#x91CD;&#x6784;&#x201C;&#x7BAD;&#x5934;&#x578B;&#x201D;&#x4EE3;&#x7801;</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Golang Gin实践 连载十三 优化你的应用结构和实现Redis缓存

## 原文链接
[https://segmentfault.com/a/1190000015140508](https://segmentfault.com/a/1190000015140508)

