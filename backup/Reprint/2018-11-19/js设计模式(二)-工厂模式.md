---
title: 'js设计模式(二)-工厂模式' 
date: 2018-11-19 2:30:09
hidden: true
slug: nrmgerc94l
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x586B;&#x5751;&#x7CFB;&#x5217;&#xFF0C;&#x7D27;&#x63A5;&#x524D;&#x6587;&#xFF08;&#x8DDD;&#x79BB;&#x4E0A;&#x6B21;&#x5199;&#x7B14;&#x8BB0;&#x53C8;&#x8FC7;&#x53BB;&#x4E86;&#x4E00;&#x4E2A;&#x591A;&#x6708;&#xFF0C;&#x6211;&#x4E5F;&#x4E0D;&#x77E5;&#x9053;&#x600E;&#x4E48;&#x52A0;&#x73ED;&#x52A0;&#x7740;&#x52A0;&#x7740;&#x5C31;&#x4E00;&#x4E2A;&#x6708;&#x4E86;-_-!&#xFF09;</p><h2 id="articleHeader1">&#x6B63;&#x6587;</h2><h3 id="articleHeader2">&#x5B9A;&#x4E49;</h3><p>&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x662F;&#x6307;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x7684;&#x63A5;&#x53E3;&#x800C;&#x4E0D;&#x4FDD;&#x7559;&#x5177;&#x4F53;&#x7684;&#x521B;&#x5EFA;&#x903B;&#x8F91;&#xFF0C;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x8F93;&#x5165;&#x7C7B;&#x578B;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x3002;&#x8BA9;&#x5B50;&#x7C7B;&#x81EA;&#x884C;&#x51B3;&#x5B9A;&#x5B9E;&#x4F8B;&#x5316;&#x54EA;&#x4E00;&#x79CD;&#x5DE5;&#x5382;&#x7C7B;&#xFF0C;&#x5B9E;&#x9645;&#x7684;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x8FC7;&#x7A0B;&#x5728;&#x5B50;&#x7C7B;&#x4E2D;&#x8FDB;&#x884C;&#x3002;&#x5728;&#x521B;&#x5EFA;&#x76F8;&#x4F3C;&#x5B50;&#x7C7B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6267;&#x884C;&#x91CD;&#x590D;&#x64CD;&#x4F5C;&#x3002;&#xFF08;&#x89C9;&#x5F97;&#x6211;&#x8BF4;&#x7684;&#x592A;&#x62BD;&#x8C61;&#x6CA1;&#x5173;&#x7CFB;&#xFF0C;&#x9A6C;&#x4E0A;&#x5C31;&#x5230;&#x4E3E;&#x4F8B;&#x5B50;&#x73AF;&#x8282;&#xFF09;</p><h3 id="articleHeader3">&#x5177;&#x4F53;&#x5B9E;&#x73B0;</h3><p>&#x524D;&#x9762;&#x7684;&#x63CF;&#x8FF0;&#x53EF;&#x80FD;&#x8FD8;&#x662F;&#x7A0D;&#x663E;&#x62BD;&#x8C61;&#xFF0C;&#x4E3E;&#x4E2A;&#x6E38;&#x620F;&#x91CC;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x751F;&#x4EA7;&#x6E38;&#x620F;&#x89D2;&#x8272;&#x7684;<code>RoleMaker</code>&#x5DE5;&#x5382;&#xFF0C;&#x8FBE;&#x5230;&#x4EE5;&#x4E0B;&#x76EE;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var warrior = RoleMaker.factory(&apos;warrior&apos;)//&#x751F;&#x4EA7;&#x4E00;&#x4E2A;&#x6218;&#x58EB;
var mage = RoleMaker.factory(&apos;mage&apos;)//&#x751F;&#x4EA7;&#x4E00;&#x4E2A;&#x6CD5;&#x5E08;
var priest = RoleMaker.factory(&apos;priest&apos;)//&#x751F;&#x4EA7;&#x4E00;&#x4E2A;&#x7267;&#x5E08;
warrior.introduce()// &#x8F93;&#x51FA; &apos;&#x6211;&#x662F;&#x4E00;&#x4E2A;&#x6218;&#x58EB;&#xFF0C;&#x6211;&#x7684;&#x7279;&#x957F;&#x662F;&#x8FD1;&#x6218;&apos;
mage.introduce()// &#x8F93;&#x51FA; &apos;&#x6211;&#x662F;&#x4E00;&#x4E2A;&#x6CD5;&#x5E08;&#xFF0C;&#x6211;&#x7684;&#x7279;&#x957F;&#x662F;&#x9B54;&#x6CD5;&apos;
priest.introduce()// &#x8F93;&#x51FA; &apos;&#x6211;&#x662F;&#x4E00;&#x4E2A;&#x7267;&#x5E08;&#xFF0C;&#x6211;&#x7684;&#x7279;&#x957F;&#x662F;&#x6CBB;&#x7597;&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> warrior = RoleMaker.<span class="hljs-keyword">factory</span>(<span class="hljs-string">&apos;warrior&apos;</span>)<span class="hljs-comment">//&#x751F;&#x4EA7;&#x4E00;&#x4E2A;&#x6218;&#x58EB;</span>
<span class="hljs-keyword">var</span> mage = RoleMaker.<span class="hljs-keyword">factory</span>(<span class="hljs-string">&apos;mage&apos;</span>)<span class="hljs-comment">//&#x751F;&#x4EA7;&#x4E00;&#x4E2A;&#x6CD5;&#x5E08;</span>
<span class="hljs-keyword">var</span> priest = RoleMaker.<span class="hljs-keyword">factory</span>(<span class="hljs-string">&apos;priest&apos;</span>)<span class="hljs-comment">//&#x751F;&#x4EA7;&#x4E00;&#x4E2A;&#x7267;&#x5E08;</span>
warrior.introduce()<span class="hljs-comment">// &#x8F93;&#x51FA; &apos;&#x6211;&#x662F;&#x4E00;&#x4E2A;&#x6218;&#x58EB;&#xFF0C;&#x6211;&#x7684;&#x7279;&#x957F;&#x662F;&#x8FD1;&#x6218;&apos;</span>
mage.introduce()<span class="hljs-comment">// &#x8F93;&#x51FA; &apos;&#x6211;&#x662F;&#x4E00;&#x4E2A;&#x6CD5;&#x5E08;&#xFF0C;&#x6211;&#x7684;&#x7279;&#x957F;&#x662F;&#x9B54;&#x6CD5;&apos;</span>
priest.introduce()<span class="hljs-comment">// &#x8F93;&#x51FA; &apos;&#x6211;&#x662F;&#x4E00;&#x4E2A;&#x7267;&#x5E08;&#xFF0C;&#x6211;&#x7684;&#x7279;&#x957F;&#x662F;&#x6CBB;&#x7597;&apos;</span></code></pre><p>&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5F62;&#x5982;<code>var warrior = RoleMaker.factory(&apos;warrior&apos;)</code>&#x7684;&#x8BED;&#x53E5;&#xFF0C;&#x5C31;&#x662F;&#x4F7F;&#x7528;<code>RoleMaker</code>&#x5DE5;&#x5382;&#x751F;&#x4EA7;&#x4E86;&#x4E00;&#x4E2A;&#x6218;&#x58EB;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;<code>&#x6218;&#x58EB;</code>&#xFF0C;<code>&#x6CD5;&#x5E08;</code>&#xFF0C;<code>&#x7267;&#x5E08;</code>&#x90FD;&#x662F;<code>&#x89D2;&#x8272;</code>&#x7684;&#x4E00;&#x4E2A;&#x5B50;&#x7C7B;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x4E0A;&#x9762;&#x7684;<code>RoleMaker</code>&#x7C7B;&#xFF0C;&#x6700;&#x6838;&#x5FC3;&#x7684;&#x601D;&#x60F3;&#x8FD8;&#x662F;<strong>&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;</strong>&#xFF08;&#x5FD8;&#x8BB0;&#x7684;&#x540C;&#x5B66;&#x8BF7;&#x81EA;&#x884C;&#x8865;&#x8BFE;&#xFF0C;&#x78E8;&#x5200;&#x4E0D;&#x8BEF;&#x780D;&#x67F4;&#x5DE5;&#xFF09;&#xFF0C;&#x5177;&#x4F53;&#x7684;&#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //&#x7236;&#x7C7B;
  function RoleMaker() {
    // &#x8FD9;&#x91CC;&#x662F;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;
  }

  RoleMaker.introduce = function () {
    return &apos;&#x6211;&#x662F;&#x4E00;&#x4E2A;&apos; + this.type + &apos;&#xFF0C;&#x6211;&#x7684;&#x7279;&#x957F;&#x662F;&apos; + this.specialty
  }

  //&#x5DE5;&#x5382;&#x65B9;&#x6CD5;
  RoleMaker.prototype.factory = function (type) {
    var role;
    // &#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x628A;&#x5B50;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x90FD;&#x4FDD;&#x5B58;&#x5728;&#x7236;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x4E2D;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x597D;&#x5904;&#x662F;&#x4E0D;&#x6C61;&#x67D3;&#x5168;&#x5C40;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#xFF0C;&#x540C;&#x65F6;&#x65B9;&#x4FBF;&#x67E5;&#x627E;&#x3002;&#x5B9E;&#x9645;&#x4E0A;&#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x7528;`switch-case`&#x5B9E;&#x73B0;
    if (typeof (RoleMaker[type]) !== &quot;function&quot;) {
      //&#x5BF9;&#x672A;&#x6307;&#x5B9A;&#x5B50;&#x7C7B;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x8FD9;&#x91CC;&#x662F;&#x76F4;&#x63A5;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4E3A;&#x672A;&#x6307;&#x5B9A;&#x7C7B;&#x578B;&#x505A;&#x9ED8;&#x8BA4;&#x503C;&#x5904;&#x7406;
      throw {
        name: &apos;Error&apos;,
        message: type + &apos;does not exist&apos;
      }
    }
    if (typeof (RoleMaker[type].prototype.introduce !== &quot;function&quot;)) {
      // &#x5224;&#x65AD;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF0C;&#x6CE8;&#x610F;&#x53EA;&#x7EE7;&#x627F;&#x4E00;&#x6B21;&#xFF0C;&#x5F53;&#x7136;&#x7531;&#x4E8E;&#x53EA;&#x662F;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x8FD9;&#x91CC;&#x5224;&#x65AD;&#x6761;&#x4EF6;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;`RoleMaker[type].constructor===RoleMaker`
      RoleMaker[type].prototype = new RoleMaker()
    }

    role = new RoleMaker[type]() //&#x5B9E;&#x4F8B;&#x5316;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5B9E;&#x9645;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x7684;&#x8FC7;&#x7A0B;
    return role
  }

  // &#x6BCF;&#x4E2A;&#x5B50;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;
  RoleMaker.warrior = function () {
    this.type = &quot;&#x6218;&#x58EB;&quot;,
      this.specialty = &quot;&#x8FD1;&#x6218;&quot;
  }
  RoleMaker.mage = function () {
    this.type = &quot;&#x6CD5;&#x5E08;&quot;,
      this.specialty = &quot;&#x9B54;&#x6CD5;&quot;
  }
  RoleMaker.priest = function () {
    this.type = &quot;&#x7267;&#x5E08;&quot;,
      this.specialty = &quot;&#x6CBB;&#x7597;&quot;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>  <span class="hljs-comment">//&#x7236;&#x7C7B;</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">RoleMaker</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;</span>
  }

  RoleMaker.introduce = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x6211;&#x662F;&#x4E00;&#x4E2A;&apos;</span> + <span class="hljs-keyword">this</span>.type + <span class="hljs-string">&apos;&#xFF0C;&#x6211;&#x7684;&#x7279;&#x957F;&#x662F;&apos;</span> + <span class="hljs-keyword">this</span>.specialty
  }

  <span class="hljs-comment">//&#x5DE5;&#x5382;&#x65B9;&#x6CD5;</span>
  RoleMaker.prototype.factory = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(type)</span> </span>{
    <span class="hljs-keyword">var</span> role;
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x628A;&#x5B50;&#x7C7B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x90FD;&#x4FDD;&#x5B58;&#x5728;&#x7236;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x4E2D;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x597D;&#x5904;&#x662F;&#x4E0D;&#x6C61;&#x67D3;&#x5168;&#x5C40;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#xFF0C;&#x540C;&#x65F6;&#x65B9;&#x4FBF;&#x67E5;&#x627E;&#x3002;&#x5B9E;&#x9645;&#x4E0A;&#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x7528;`switch-case`&#x5B9E;&#x73B0;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> (RoleMaker[type]) !== <span class="hljs-string">&quot;function&quot;</span>) {
      <span class="hljs-comment">//&#x5BF9;&#x672A;&#x6307;&#x5B9A;&#x5B50;&#x7C7B;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x8FD9;&#x91CC;&#x662F;&#x76F4;&#x63A5;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4E3A;&#x672A;&#x6307;&#x5B9A;&#x7C7B;&#x578B;&#x505A;&#x9ED8;&#x8BA4;&#x503C;&#x5904;&#x7406;</span>
      <span class="hljs-keyword">throw</span> {
        name: <span class="hljs-string">&apos;Error&apos;</span>,
        message: type + <span class="hljs-string">&apos;does not exist&apos;</span>
      }
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> (RoleMaker[type].prototype.introduce !== <span class="hljs-string">&quot;function&quot;</span>)) {
      <span class="hljs-comment">// &#x5224;&#x65AD;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF0C;&#x6CE8;&#x610F;&#x53EA;&#x7EE7;&#x627F;&#x4E00;&#x6B21;&#xFF0C;&#x5F53;&#x7136;&#x7531;&#x4E8E;&#x53EA;&#x662F;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x8FD9;&#x91CC;&#x5224;&#x65AD;&#x6761;&#x4EF6;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;`RoleMaker[type].constructor===RoleMaker`</span>
      RoleMaker[type].prototype = <span class="hljs-keyword">new</span> RoleMaker()
    }

    role = <span class="hljs-keyword">new</span> RoleMaker[type]() <span class="hljs-comment">//&#x5B9E;&#x4F8B;&#x5316;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5B9E;&#x9645;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x7684;&#x8FC7;&#x7A0B;</span>
    <span class="hljs-keyword">return</span> role
  }

  <span class="hljs-comment">// &#x6BCF;&#x4E2A;&#x5B50;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
  RoleMaker.warrior = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.type = <span class="hljs-string">&quot;&#x6218;&#x58EB;&quot;</span>,
      <span class="hljs-keyword">this</span>.specialty = <span class="hljs-string">&quot;&#x8FD1;&#x6218;&quot;</span>
  }
  RoleMaker.mage = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.type = <span class="hljs-string">&quot;&#x6CD5;&#x5E08;&quot;</span>,
      <span class="hljs-keyword">this</span>.specialty = <span class="hljs-string">&quot;&#x9B54;&#x6CD5;&quot;</span>
  }
  RoleMaker.priest = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.type = <span class="hljs-string">&quot;&#x7267;&#x5E08;&quot;</span>,
      <span class="hljs-keyword">this</span>.specialty = <span class="hljs-string">&quot;&#x6CBB;&#x7597;&quot;</span>
  }</code></pre><p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x6765;&#x56DE;&#x987E;&#x4E0B;&#x524D;&#x6587;&#x8BF4;&#x9053;&#x7684;&#x51E0;&#x4E2A;&#x7279;&#x70B9;&#xFF1A;</p><ol><li>&#x4F7F;&#x7528;&#x8005;&#x53EA;&#x9700;&#x8981;&#x77E5;&#x9053;&#x7279;&#x5B9A;&#x5B50;&#x7C7B;&#x7684;&#x540D;&#x79F0;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x751F;&#x4EA7;&#x5BF9;&#x5E94;&#x7684;&#x5B50;&#x7C7B;&#xFF0C;&#x65E0;&#x9700;&#x77E5;&#x9053;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x903B;&#x8F91;</li><li>&#x5B9E;&#x9645;&#x7684;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x8FC7;&#x7A0B;&#x5728;&#x5B50;&#x7C7B;&#x4E2D;&#x8FDB;&#x884C;</li><li>&#x5728;&#x521B;&#x5EFA;&#x76F8;&#x4F3C;&#x5B50;&#x7C7B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6267;&#x884C;&#x91CD;&#x590D;&#x64CD;&#x4F5C;&#xFF08;&#x6BCF;&#x4E2A;&#x5B50;&#x7C7B;&#x53EA;&#x505A;&#x4E00;&#x6B21;&#x7684;&#x7EE7;&#x627F;&#xFF09;</li></ol><h3 id="articleHeader4">&#x8865;&#x5145;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;</h3><p>&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;js&#x7684;<code>Object()</code>&#x51FD;&#x6570;&#xFF0C;&#x5C31;&#x5F88;&#x7B26;&#x5408;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x7684;&#x7279;&#x5F81;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var n = Object(1)
n.constructor === Number
var s = Object(&apos;1&apos;)
n.constructor === String
var b = Object(true)
n.constructor === Boolean" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> n = <span class="hljs-keyword">Object</span>(<span class="hljs-number">1</span>)
n.<span class="hljs-keyword">constructor</span> === Number
<span class="hljs-keyword">var</span> s = <span class="hljs-keyword">Object</span>(<span class="hljs-string">&apos;1&apos;</span>)
n.<span class="hljs-keyword">constructor</span> === <span class="hljs-keyword">String</span>
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">Object</span>(true)
n.<span class="hljs-keyword">constructor</span> === Boolean</code></pre><h2 id="articleHeader5">&#x5C0F;&#x7ED3;</h2><p>&#x81EA;&#x6211;&#x611F;&#x89C9;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x7CFB;&#x5217;&#x7531;&#x4E8E;&#x8FD8;&#x662F;&#x5904;&#x4E8E;&#x5B66;&#x4E60;&#x9636;&#x6BB5;&#xFF0C;&#x5B9E;&#x8DF5;&#x7ECF;&#x9A8C;&#x76F8;&#x5BF9;&#x8F83;&#x5C11;&#xFF0C;&#x6240;&#x4EE5;&#x5199;&#x8D77;&#x6765;&#x8FD8;&#x662F;&#x504F;&#x5411;&#x4E8E;&#x8BFB;&#x4E66;&#x7B14;&#x8BB0;&#x7C7B;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x80FD;&#x6709;&#x5F88;&#x591A;&#x5730;&#x65B9;&#x90FD;&#x663E;&#x5F97;&#x7C97;&#x7CD9;&#x3002;&#x6743;&#x5F53;&#x505A;&#x5148;&#x5360;&#x4E2A;&#x5751;&#xFF0C;&#x7B49;&#x540E;&#x7EED;&#x6709;&#x66F4;&#x6DF1;&#x5165;&#x7406;&#x89E3;&#x518D;&#x56DE;&#x6765;&#x8865;&#x4E0A;&#x3002;<br><strong>&#x7136;&#x540E;&#x60EF;&#x4F8B;&#x611F;&#x8C22;&#x4E4B;&#x524D;&#x7684;&#x70ED;&#x5FC3;&#x8BFB;&#x8005;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x4E3A;&#x6211;&#x6307;&#x51FA;&#x9519;&#x8BEF;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x3002;</strong><br><strong>&#x7136;&#x540E;&#x4F9D;&#x7136;&#x662F;&#x6BCF;&#x6B21;&#x90FD;&#x4E00;&#x6837;&#x7684;&#x7ED3;&#x5C3E;&#xFF0C;&#x5982;&#x679C;&#x5185;&#x5BB9;&#x6709;&#x9519;&#x8BEF;&#x7684;&#x5730;&#x65B9;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#xFF1B;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x70B9;&#x8D5E;&#x548C;&#x6536;&#x85CF;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x5F81;&#x5F97;&#x540C;&#x610F;&#x540E;&#x8457;&#x660E;&#x51FA;&#x5904;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x95EE;&#x9898;&#x4E5F;&#x6B22;&#x8FCE;&#x79C1;&#x4FE1;&#x4EA4;&#x6D41;&#xFF0C;&#x4E3B;&#x9875;&#x6DFB;&#x52A0;&#x4E86;&#x90AE;&#x7BB1;&#x5730;&#x5740;~&#x6E9C;&#x4E86;</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js设计模式(二)-工厂模式

## 原文链接
[https://segmentfault.com/a/1190000015865576](https://segmentfault.com/a/1190000015865576)

