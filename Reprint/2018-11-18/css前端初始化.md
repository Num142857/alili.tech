---
title: 'css前端初始化' 
date: 2018-11-18 2:30:10
hidden: true
slug: 3zum6j6st3k
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5F53;&#x4E0B;&#x79FB;&#x52A8;&#x7AEF;&#x6A2A;&#x884C;&#xFF0C;&#x5E73;&#x5E38;&#x6211;&#x4EEC;&#x505A;&#x4E00;&#x4E9B;&#x79FB;&#x52A8;&#x7AEF;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x63A5;&#x89E6;&#x6700;&#x591A;&#x7684;&#x5C31;&#x662F;H5&#xFF0C;&#x867D;&#x7136;&#x505A;&#x79FB;&#x52A8;&#x7AEF;&#x4E0D;&#x7528;&#x517C;&#x5BB9;IE&#xFF0C;&#x4F46;&#x662F;
&#x6211;&#x4EEC;&#x8981;&#x517C;&#x5BB9;&#x5FAE;&#x4FE1;&#x3001;app&#x3001;ios&#x3001;android... &#x4ECA;&#x5929;&#x5C31;&#x7ED9;&#x5199;&#x51E0;&#x4E2A;&#x5E73;&#x5E38;&#x5F00;&#x53D1;&#x7ECF;&#x5E38;&#x4F1A;&#x9047;&#x5230;&#x7684;&#x95EE;&#x9898;&#x4EE5;&#x53CA;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#x3002;

&#x521D;&#x5165;&#x524D;&#x7AEF;&#xFF0C;&#x82E5;&#x6709;&#x4E0D;&#x8DB3; &#x6B22;&#x8FCE;&#x6307;&#x6B63;&#xFF01;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code>&#x5F53;&#x4E0B;&#x79FB;&#x52A8;&#x7AEF;&#x6A2A;&#x884C;&#xFF0C;&#x5E73;&#x5E38;&#x6211;&#x4EEC;&#x505A;&#x4E00;&#x4E9B;&#x79FB;&#x52A8;&#x7AEF;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x63A5;&#x89E6;&#x6700;&#x591A;&#x7684;&#x5C31;&#x662F;H5&#xFF0C;&#x867D;&#x7136;&#x505A;&#x79FB;&#x52A8;&#x7AEF;&#x4E0D;&#x7528;&#x517C;&#x5BB9;IE&#xFF0C;&#x4F46;&#x662F;
&#x6211;&#x4EEC;&#x8981;&#x517C;&#x5BB9;&#x5FAE;&#x4FE1;&#x3001;app&#x3001;ios&#x3001;<span class="hljs-keyword">android... </span>&#x4ECA;&#x5929;&#x5C31;&#x7ED9;&#x5199;&#x51E0;&#x4E2A;&#x5E73;&#x5E38;&#x5F00;&#x53D1;&#x7ECF;&#x5E38;&#x4F1A;&#x9047;&#x5230;&#x7684;&#x95EE;&#x9898;&#x4EE5;&#x53CA;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#x3002;

&#x521D;&#x5165;&#x524D;&#x7AEF;&#xFF0C;&#x82E5;&#x6709;&#x4E0D;&#x8DB3; &#x6B22;&#x8FCE;&#x6307;&#x6B63;&#xFF01;</code></pre><h3 id="articleHeader1">&#x5934;&#x90E8;&#x521D;&#x59CB;&#x5316;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv=&#x201D;Content-Type&#x201D; content=&#x201D;text/html; charset=utf-8&#x2033;&gt;
&lt;meta id=&#x201D;viewport&#x201D; name=&#x201D;viewport&#x201D; content=&#x201D;width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no&#x201D;&gt;
&lt;meta name=&#x201D;MobileOptimized&#x201D; content=&#x201D;320&#x2033;&gt;
&lt;meta name=&#x201D;format-detection&#x201D; content=&#x201D;telephone=no&#x201D;&gt;

&lt;/head&gt;

&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&#x201D;Content-Type&#x201D;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&#x201D;text/html;</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">utf-8&#x2033;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&#x201D;viewport&#x201D;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&#x201D;viewport&#x201D;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&#x201D;width</span>=<span class="hljs-string">device-width,</span> <span class="hljs-attr">initial-scale</span>=<span class="hljs-string">1.0,</span> <span class="hljs-attr">minimum-scale</span>=<span class="hljs-string">1.0,</span> <span class="hljs-attr">maximum-scale</span>=<span class="hljs-string">1.0,</span> <span class="hljs-attr">user-scalable</span>=<span class="hljs-string">no&#x201D;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&#x201D;MobileOptimized&#x201D;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&#x201D;320&#x2033;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&#x201D;format-detection&#x201D;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&#x201D;telephone</span>=<span class="hljs-string">no&#x201D;</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><h3 id="articleHeader2">1.audio&#x6807;&#x7B7E;&#x95EE;&#x9898;</h3><p>&#x4E00;&#x822C;&#x8981;&#x6DFB;&#x52A0;&#x80CC;&#x666F;&#x97F3;&#x4E50;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x7B2C;&#x4E00;&#x53CD;&#x5E94;&#x5C31;&#x662F;&#x4F7F;&#x7528;audio&#x6807;&#x7B7E;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;&#x5751;&#x3002;&#x5982;&#x679C;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x662F;&#x4E00;&#x8FDB;&#x9875;&#x9762;&#x5C31;&#x8981;&#x64AD;&#x653E;&#x97F3;&#x4E50;&#x7684;&#x8BDD;&#xFF0C;audio&#x6807;&#x7B7E;&#x5728;&#x5FAE;&#x4FE1;&#x7AEF;&#x662F;&#x4E0D;&#x751F;&#x6548;&#x7684;&#x3002;&#x8FD9;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" document.addEventListener(&quot;WeixinJSBridgeReady&quot;, function () {
        audioAutoPlay(&#x2018;XXX&#x2019;);//&#x7ED9;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x51FD;&#x6570;
    },false);
    //&#x517C;&#x5BB9;ios&#x5FAE;&#x4FE1;&#x4E0D;&#x80FD;&#x4E00;&#x6253;&#x5F00;&#x5C31;&#x64AD;&#x653E;&#x97F3;&#x4E50;
    function audioAutoPlay(id){ //&#x5168;&#x5C40;&#x63A7;&#x5236;&#x64AD;&#x653E;&#x51FD;&#x6570;
        var audio = document.getElementById(id),
            play = function(){
            audio.play();
        document.removeEventListener(&#x201C;touchstart&#x201D;,play,false);
            };
        audio.play();
        document.addEventListener(&#x201C;touchstart&#x201D;,play,false);
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&quot;WeixinJSBridgeReady&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        audioAutoPlay(&#x2018;XXX&#x2019;);<span class="hljs-comment">//&#x7ED9;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x51FD;&#x6570;</span>
    },<span class="hljs-literal">false</span>);
    <span class="hljs-comment">//&#x517C;&#x5BB9;ios&#x5FAE;&#x4FE1;&#x4E0D;&#x80FD;&#x4E00;&#x6253;&#x5F00;&#x5C31;&#x64AD;&#x653E;&#x97F3;&#x4E50;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">audioAutoPlay</span>(<span class="hljs-params">id</span>)</span>{ <span class="hljs-comment">//&#x5168;&#x5C40;&#x63A7;&#x5236;&#x64AD;&#x653E;&#x51FD;&#x6570;</span>
        <span class="hljs-keyword">var</span> audio = <span class="hljs-built_in">document</span>.getElementById(id),
            play = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            audio.play();
        <span class="hljs-built_in">document</span>.removeEventListener(&#x201C;touchstart&#x201D;,play,<span class="hljs-literal">false</span>);
            };
        audio.play();
        <span class="hljs-built_in">document</span>.addEventListener(&#x201C;touchstart&#x201D;,play,<span class="hljs-literal">false</span>);
    }</code></pre><p><strong>&#x539F;&#x7406;&#xFF1A;</strong></p><ul><li>&#x6211;&#x4EEC;&#x7ED9;&#x4E00;&#x5B83;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x81EA;&#x52A8;&#x6267;&#x884C;&#x4E00;&#x6B21;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</li></ul><h3 id="articleHeader3">2.video&#x6807;&#x7B7E;&#x95EE;&#x9898;</h3><h4>a. app&#x91CC;&#x9762;&#x4E0D;&#x80FD;&#x63A7;&#x5236;&#x968F;&#x5FC3;&#x6240;&#x6B32;&#x7684;&#x63A7;&#x5236;&#x89C6;&#x9891;&#x7684;&#x64AD;&#x653E;&#x548C;&#x6682;&#x505C;&#x3002;</h4><p>&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var video=$(&quot;#video&quot;)[0];
        $(&quot;#video&quot;).click(function(){
                  if($(this).hasClass(&quot;pls&quot;)){
                        video.play();
                  }else{
                        video.pause();
            }
            $(&quot;#video&quot;).toggleClass(&quot;pls&quot;)
        })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> video=$(<span class="hljs-string">&quot;#video&quot;</span>)[<span class="hljs-number">0</span>];
        $(<span class="hljs-string">&quot;#video&quot;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                  <span class="hljs-keyword">if</span>($(<span class="hljs-keyword">this</span>).hasClass(<span class="hljs-string">&quot;pls&quot;</span>)){
                        video.play();
                  }<span class="hljs-keyword">else</span>{
                        video.pause();
            }
            $(<span class="hljs-string">&quot;#video&quot;</span>).toggleClass(<span class="hljs-string">&quot;pls&quot;</span>)
        })</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5982;&#x679C;&#x51FA;&#x73B0;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x7CFB;&#x7EDF;&#x81EA;&#x5E26;&#x7684;&#x63A7;&#x5236;&#x64AD;&#x653E;&#x548C;&#x6682;&#x505C;&#x7684;&#x529F;&#x80FD;&#x4E86;&#xFF0C;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x4E00;&#x6BB5;&#x63A7;&#x5236;&#x64AD;&#x653E;&#x548C;&#x6682;&#x505C;&#x7684;&#x65B9;&#x6CD5;&#x51FA;&#x6765;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs"><code style="word-break:break-word;white-space:initial">&#x5982;&#x679C;&#x51FA;&#x73B0;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x7CFB;&#x7EDF;&#x81EA;&#x5E26;&#x7684;&#x63A7;&#x5236;&#x64AD;&#x653E;&#x548C;&#x6682;&#x505C;&#x7684;&#x529F;&#x80FD;&#x4E86;&#xFF0C;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x4E00;&#x6BB5;&#x63A7;&#x5236;&#x64AD;&#x653E;&#x548C;&#x6682;&#x505C;&#x7684;&#x65B9;&#x6CD5;&#x51FA;&#x6765;&#x3002;</code></pre><h4>b.&#x5FAE;&#x4FE1;&#x7AEF;&#x81EA;&#x52A8;&#x64AD;&#x653E;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- &#x5FC5;&#x987B;&#x52A0;&#x5728;&#x5FAE;&#x4FE1;api&#x8D44;&#x6E90; --&gt; 
&lt;script src=&quot;http://res.wx.qq.com/open/js/jweixin-1.0.0.js&quot;&gt;&lt;/script&gt; 
&lt;script&gt; 
  //&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x64AD;&#x653E;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x4E00;&#x4E9B;&#x5947;&#x8469;iPhone&#x673A;&#x4E0D;&#x53EF;&#x4EE5; 
  document.getElementById(&apos;car_audio&apos;).play(); 
  //&#x5FC5;&#x987B;&#x5728;&#x5FAE;&#x4FE1;Weixin JSAPI&#x7684;WeixinJSBridgeReady&#x624D;&#x80FD;&#x751F;&#x6548; 
  document.addEventListener(&quot;WeixinJSBridgeReady&quot;, function () { 
      document.getElementById(&apos;car_audio&apos;).play(); 
      document.getElementById(&apos;video&apos;).play(); 
  }, false); 
    //&#x82E5;&#x662F;&#x8FD8;&#x4E0D;&#x80FD;&#x89E3;&#x51B3;&#xFF0C;&#x6362;&#x6210;&#x8FD9;&#x6837;
    document.getElementById(&apos;video2&apos;).play();
    wx.getNetworkType({
         success: function (res) {
         console.log(&apos;res is&apos;,res);
             document.getElementById(&apos;video2&apos;).play();
         }
     });
&lt;/script&gt; " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- &#x5FC5;&#x987B;&#x52A0;&#x5728;&#x5FAE;&#x4FE1;api&#x8D44;&#x6E90; --&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;http://res.wx.qq.com/open/js/jweixin-1.0.0.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"> 
  <span class="hljs-comment">//&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x64AD;&#x653E;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x4E00;&#x4E9B;&#x5947;&#x8469;iPhone&#x673A;&#x4E0D;&#x53EF;&#x4EE5; </span>
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;car_audio&apos;</span>).play(); 
  <span class="hljs-comment">//&#x5FC5;&#x987B;&#x5728;&#x5FAE;&#x4FE1;Weixin JSAPI&#x7684;WeixinJSBridgeReady&#x624D;&#x80FD;&#x751F;&#x6548; </span>
  <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&quot;WeixinJSBridgeReady&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
      <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;car_audio&apos;</span>).play(); 
      <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;video&apos;</span>).play(); 
  }, <span class="hljs-literal">false</span>); 
    <span class="hljs-comment">//&#x82E5;&#x662F;&#x8FD8;&#x4E0D;&#x80FD;&#x89E3;&#x51B3;&#xFF0C;&#x6362;&#x6210;&#x8FD9;&#x6837;</span>
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;video2&apos;</span>).play();
    wx.getNetworkType({
         <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
         <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;res is&apos;</span>,res);
             <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;video2&apos;</span>).play();
         }
     });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> </code></pre><h3 id="articleHeader4">3.&#x5F39;&#x51FA;&#x952E;&#x76D8;&#x95EE;&#x9898;</h3><p>ios&#x624B;&#x673A;&#x5F39;&#x51FA;&#x952E;&#x76D8;&#x6709;&#x65F6;&#x5019;&#x4F1A;&#x906E;&#x4F4F;&#x8F93;&#x5165;&#x6846;&#xFF0C;&#x7ED9;&#x4EBA;&#x4E00;&#x79CD;&#x5F88;&#x4E0D;&#x723D;&#x7684;&#x4F53;&#x9A8C;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x5F88;&#x5C11;&#x51FA;&#x73B0;&#x3002;&#x4E0B;&#x9762;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" keyboardEvent:function($footer,winHeight){
    //&#x8FD9;&#x91CC;&#x9ED8;&#x8BA4;&#x8F6F;&#x952E;&#x76D8;&#x7684;&#x9AD8;&#x5EA6;&#x5C0F;&#x4E8E;&#x5C4F;&#x5E55;&#x9AD8;&#x5EA6;&#x7684;&#x4E8C;&#x5206;&#x4E4B;&#x4E00;
    $(window).resize(function(){
        var currentWinHeight = $(window).height();
        if(isInputsFocus($(&#x2018;input&#x2019;)) &amp;&amp; currentWinHeight &lt; winHeight/1.2){
            //&#x952E;&#x76D8;&#x5F39;&#x51FA;
            $footer.hide()
        }
        if(currentWinHeight &gt;= winHeight/1.2){
            //&#x952E;&#x76D8;&#x6536;&#x8D77;
            $footer.show()
        }
    });
}
Var isInputsFocus = function($inputs){
    if($inputs &amp;&amp; $inputs.length &gt; 0){
        for(var i=0;i&lt;$inputs.length;i++){
            if($($inputs[i].is(&#x201C;:focus&#x201D;))){
                return true
            }
        }
        return false
    }
    return false
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code> keyboardEvent:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">($footer,winHeight)</span></span>{
    <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x9ED8;&#x8BA4;&#x8F6F;&#x952E;&#x76D8;&#x7684;&#x9AD8;&#x5EA6;&#x5C0F;&#x4E8E;&#x5C4F;&#x5E55;&#x9AD8;&#x5EA6;&#x7684;&#x4E8C;&#x5206;&#x4E4B;&#x4E00;</span>
    $(window).resize(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">var</span> currentWinHeight = $(window).height();
        <span class="hljs-keyword">if</span>(isInputsFocus($(&#x2018;input&#x2019;)) &amp;&amp; currentWinHeight &lt; winHeight/<span class="hljs-number">1.2</span>){
            <span class="hljs-comment">//&#x952E;&#x76D8;&#x5F39;&#x51FA;</span>
            $footer.hide()
        }
        <span class="hljs-keyword">if</span>(currentWinHeight &gt;= winHeight/<span class="hljs-number">1.2</span>){
            <span class="hljs-comment">//&#x952E;&#x76D8;&#x6536;&#x8D77;</span>
            $footer.show()
        }
    });
}
<span class="hljs-keyword">Var</span> isInputsFocus = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">($inputs)</span></span>{
    <span class="hljs-keyword">if</span>($inputs &amp;&amp; $inputs.length &gt; <span class="hljs-number">0</span>){
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;$inputs.length;i++){
            <span class="hljs-keyword">if</span>($($inputs[i].is(&#x201C;:focus&#x201D;))){
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>
            }
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>
}</code></pre><h3 id="articleHeader5">4.&#x83B7;&#x53D6;&#x6587;&#x6863;&#x6EDA;&#x52A8;&#x9AD8;&#x5EA6;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5E38;&#x7528;&#x7684;&#x83B7;&#x53D6;&#x65B9;&#x5F0F;&#x662F; document.documentElement.scrollTop &#x4F46;&#x662F;&#x5728;&#x624B;&#x673A;&#x4E0A;&#x4E0D;&#x751F;&#x6548;&#x3002;&#x67E5;&#x4E86;&#x597D;&#x4E45;&#x4E5F;&#x4E0D;&#x77E5;&#x9053;&#x54EA;&#x91CC;&#x6709;&#x95EE;&#x9898;&#x3002;&#x540E;&#x6765;&#x5076;&#x7136;&#x53D1;&#x73B0;document.body.scrollTop &#x5C31;&#x751F;&#x6548;&#x4E86;&#xFF0C;&#x4F46;&#x662F;PC&#x53C8;&#x4E0D;&#x884C;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x5EFA;&#x8BAE;&#x5927;&#x5BB6;&#x505A;&#x4E00;&#x4E0B;&#x5224;&#x65AD;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">&#x5E38;&#x7528;&#x7684;&#x83B7;&#x53D6;&#x65B9;&#x5F0F;&#x662F; document<span class="hljs-selector-class">.documentElement</span><span class="hljs-selector-class">.scrollTop</span> &#x4F46;&#x662F;&#x5728;&#x624B;&#x673A;&#x4E0A;&#x4E0D;&#x751F;&#x6548;&#x3002;&#x67E5;&#x4E86;&#x597D;&#x4E45;&#x4E5F;&#x4E0D;&#x77E5;&#x9053;&#x54EA;&#x91CC;&#x6709;&#x95EE;&#x9898;&#x3002;&#x540E;&#x6765;&#x5076;&#x7136;&#x53D1;&#x73B0;document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.scrollTop</span> &#x5C31;&#x751F;&#x6548;&#x4E86;&#xFF0C;&#x4F46;&#x662F;PC&#x53C8;&#x4E0D;&#x884C;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x5EFA;&#x8BAE;&#x5927;&#x5BB6;&#x505A;&#x4E00;&#x4E0B;&#x5224;&#x65AD;</code></pre><h3 id="articleHeader6">5.zepto&#x83B7;&#x53D6;select&#x6587;&#x672C;</h3><p>&#x6211;&#x4EEC;&#x5E73;&#x5E38;&#x4F7F;&#x7528;&#x7684;&#x662F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#select&quot;).val()//&#x83B7;&#x53D6;option&#x7684;value&#x503C;&#xFF1B;
$(&quot;#select&quot;).find(&quot;option:selected&quot;).text()//&#x83B7;&#x53D6;option&#x7684;&#x6587;&#x672C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mel"><code>$(<span class="hljs-string">&quot;#select&quot;</span>).val()<span class="hljs-comment">//&#x83B7;&#x53D6;option&#x7684;value&#x503C;&#xFF1B;</span>
$(<span class="hljs-string">&quot;#select&quot;</span>).find(<span class="hljs-string">&quot;option:selected&quot;</span>).<span class="hljs-keyword">text</span>()<span class="hljs-comment">//&#x83B7;&#x53D6;option&#x7684;&#x6587;&#x672C;</span></code></pre><p>&#x4F46;&#x662F;&#x5728;&#x4F7F;&#x7528;zepto&#x7684;&#x65F6;&#x5019;&#x7ADF;&#x7136;&#x62A5;&#x9519;&#x3002;&#x7814;&#x7A76;&#x597D;&#x4E45;&#x4E0D;&#x6653;&#x5F97;&#x662F;&#x4EC0;&#x4E48;&#x539F;&#x56E0;&#x3002;&#x540E;&#x6765;&#x67E5;&#x4E86;&#x4E0B;zepto&#x7684;api &#x53D1;&#x73B0;&#x83B7;&#x53D6;&#x65B9;&#x6CD5;&#x6539;&#x4E86;&#x3002;&#x73B0;&#x5728;&#x662F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#select option&quot;).not(function(){ return !this.selected }).val()//&#x83B7;&#x53D6;value&#x503C;
$(&quot;#select option&quot;).not(function(){ return !this.selected }).text()//&#x83B7;&#x53D6;&#x6587;&#x672C;&#x503C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-string">&quot;#select option&quot;</span>).not(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> !<span class="hljs-keyword">this</span>.selected }).val()<span class="hljs-comment">//&#x83B7;&#x53D6;value&#x503C;</span>
$(<span class="hljs-string">&quot;#select option&quot;</span>).not(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> !<span class="hljs-keyword">this</span>.selected }).text()<span class="hljs-comment">//&#x83B7;&#x53D6;&#x6587;&#x672C;&#x503C;</span></code></pre><h3 id="articleHeader7">6.swiper&#x56FE;&#x7247;&#x8D85;&#x51FA;&#x7236;&#x7EA7;&#x76D2;&#x5B50;</h3><p>&#x7ED9;img&#x6DFB;&#x52A0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function () {
    var u = navigator.userAgent;
    if (u.indexOf(&apos;Android&apos;) &gt; -1 || u.indexOf(&apos;Linux&apos;) &gt; -1) {//&#x5B89;&#x5353;&#x624B;&#x673A;
        phoneType = 0;
    } else if (u.indexOf(&apos;iPhone&apos;) &gt; -1) {//&#x82F9;&#x679C;&#x624B;&#x673A;
        phoneType = 1;
    } else if (u.indexOf(&apos;Windows Phone&apos;) &gt; -1) {//winphone&#x624B;&#x673A;
        phoneType =2;
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> u = navigator.userAgent;
    <span class="hljs-keyword">if</span> (u.indexOf(<span class="hljs-string">&apos;Android&apos;</span>) &gt; <span class="hljs-number">-1</span> || u.indexOf(<span class="hljs-string">&apos;Linux&apos;</span>) &gt; <span class="hljs-number">-1</span>) {<span class="hljs-comment">//&#x5B89;&#x5353;&#x624B;&#x673A;</span>
        phoneType = <span class="hljs-number">0</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (u.indexOf(<span class="hljs-string">&apos;iPhone&apos;</span>) &gt; <span class="hljs-number">-1</span>) {<span class="hljs-comment">//&#x82F9;&#x679C;&#x624B;&#x673A;</span>
        phoneType = <span class="hljs-number">1</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (u.indexOf(<span class="hljs-string">&apos;Windows Phone&apos;</span>) &gt; <span class="hljs-number">-1</span>) {<span class="hljs-comment">//winphone&#x624B;&#x673A;</span>
        phoneType =<span class="hljs-number">2</span>;
    }
};</code></pre><h3 id="articleHeader8">7.&#x5E27;&#x52A8;&#x753B;&#x7684;&#x7B80;&#x5355;&#x5B9E;&#x73B0;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timeout = 1000; //&#x6BCF;&#x9694;100ms
var index = 1;
var am,
  am = setInterval(function () {
      if (index &gt;= $(&quot;.roll&quot;).length) {
          $(&quot;.roll&quot;).removeClass(&quot;run&quot;);
          clearInterval(am);
          $(&apos;.goinfo&apos;).removeClass(&apos;hide&apos;);
              console.log(&apos;res enter&apos;);
      } else {
          $(&quot;.roll&quot;).eq(index++).addClass(&quot;run&quot;);
      }
  }, timeout);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> timeout = <span class="hljs-number">1000</span>; <span class="hljs-comment">//&#x6BCF;&#x9694;100ms</span>
<span class="hljs-keyword">var</span> index = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> am,
  am = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (index &gt;= $(<span class="hljs-string">&quot;.roll&quot;</span>).length) {
          $(<span class="hljs-string">&quot;.roll&quot;</span>).removeClass(<span class="hljs-string">&quot;run&quot;</span>);
          clearInterval(am);
          $(<span class="hljs-string">&apos;.goinfo&apos;</span>).removeClass(<span class="hljs-string">&apos;hide&apos;</span>);
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;res enter&apos;</span>);
      } <span class="hljs-keyword">else</span> {
          $(<span class="hljs-string">&quot;.roll&quot;</span>).eq(index++).addClass(<span class="hljs-string">&quot;run&quot;</span>);
      }
  }, timeout);</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{
    margin:0;
    padding:0;
}
a {
  text-decoration: none;
}
ul,ol {
  margin: 0;
  padding: 0;
  list-style: none;
}
img {vert-align: top;} //&#x79FB;&#x52A8;&#x7AEF;&#x56FE;&#x7247;&#x8FB9;&#x6846;   &#x76F8;&#x5F53;&#x4E8E;  border:0

a,
input,
button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
//-webkit-tap-highlight-color:rgba(0,0,0,0);//&#x900F;&#x660E;&#x5EA6;&#x8BBE;&#x7F6E;&#x4E3A;0&#xFF0C;&#x53BB;&#x6389;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x548C;&#x6587;&#x672C;&#x6846;&#x5BF9;&#x8C61;&#x65F6;&#x9ED8;&#x8BA4;&#x7684;&#x7070;&#x8272;&#x534A;&#x900F;&#x660E;&#x8986;&#x76D6;&#x5C42;(iOS)&#x6216;&#x8005;&#x865A;&#x6846;(Android) 
input&#xFF0C;textarea{outline:none}  
//&#x53D6;&#x6D88;chrome&#x4E0B;&#x9ED8;&#x8BA4;&#x7684;&#x6587;&#x672C;&#x6846;&#x805A;&#x7126;&#x6837;&#x5F0F;

-webkit-appearance: none;
//&#x6D88;&#x9664;&#x8F93;&#x5165;&#x6846;&#x548C;&#x6309;&#x94AE;&#x7684;&#x539F;&#x751F;&#x5916;&#x89C2;&#xFF0C;&#x5728;iOS&#x4E0A;&#x52A0;&#x4E0A;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x624D;&#x80FD;&#x7ED9;&#x6309;&#x94AE;&#x548C;&#x8F93;&#x5165;&#x6846;&#x81EA;&#x5B9A;&#x4E49;&#x6837;&#x5F0F; 

-webkit-user-select: none;
// &#x7981;&#x6B62;&#x9875;&#x9762;&#x6587;&#x5B57;&#x9009;&#x62E9; &#xFF0C;&#x6B64;&#x5C5E;&#x6027;&#x4E0D;&#x7EE7;&#x627F;&#xFF0C;&#x4E00;&#x822C;&#x52A0;&#x5728;body&#x4E0A;&#x89C4;&#x5B9A;&#x6574;&#x4E2A;body&#x7684;&#x6587;&#x5B57;&#x90FD;&#x4E0D;&#x4F1A;&#x81EA;&#x52A8;&#x8C03;&#x6574;
input,
button {
  -webkit-appearance: none;
  border-radius: 0;
}
//&#x53BB;&#x6389;IOS&#x79FB;&#x9664;&#x539F;&#x751F;&#x63A7;&#x4EF6;&#x6837;&#x5F0F;

-webkit-touch-callout:none; 
// &#x7981;&#x7528;&#x957F;&#x6309;&#x9875;&#x9762;&#x65F6;&#x7684;&#x5F39;&#x51FA;&#x83DC;&#x5355;

body {
  margin: 0;
  -webkit-user-select: none;
}
//&#x7981;&#x6B62;&#x79FB;&#x52A8;&#x7AEF;&#x7528;&#x6237;&#x8FDB;&#x884C;&#x590D;&#x5236;.&#x9009;&#x62E9;.

body * {
  -webkit-user-select: none;
  font-family: Helvetica;
}

body {
  -webkit-text-size-adjust: 100%;
}
//&#x79FB;&#x52A8;&#x7AEF;&#x6A2A;&#x7AD6;&#x5C4F;&#x5B57;&#x4F53;&#x4E4E;&#x5927;&#x4E4E;&#x5C0F;

-webkit-text-size-adjust: none; 
//&#x7981;&#x6B62;&#x6587;&#x5B57;&#x81EA;&#x52A8;&#x8C03;&#x6574;&#x5927;&#x5C0F;(&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#x65CB;&#x8F6C;&#x8BBE;&#x5907;&#x7684;&#x65F6;&#x5019;&#x6587;&#x5B57;&#x5927;&#x5C0F;&#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x5316;)&#xFF0C;&#x6B64;&#x5C5E;&#x6027;&#x4E5F;&#x4E0D;&#x7EE7;&#x627F;&#xFF0C;&#x4E00;&#x822C;&#x52A0;&#x5728;body&#x4E0A;&#x89C4;&#x5B9A;&#x6574;&#x4E2A;body&#x7684;&#x6587;&#x5B57;&#x90FD;&#x4E0D;&#x4F1A;&#x81EA;&#x52A8;&#x8C03;&#x6574; " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">div</span>,<span class="hljs-selector-tag">dl</span>,<span class="hljs-selector-tag">dt</span>,<span class="hljs-selector-tag">dd</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">li</span>,<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">pre</span>,<span class="hljs-selector-tag">code</span>,<span class="hljs-selector-tag">form</span>,<span class="hljs-selector-tag">fieldset</span>,<span class="hljs-selector-tag">legend</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">textarea</span>,<span class="hljs-selector-tag">p</span>,<span class="hljs-selector-tag">blockquote</span>,<span class="hljs-selector-tag">th</span>,<span class="hljs-selector-tag">td</span>{
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">a</span> {
  <span class="hljs-attribute">text-decoration</span>: none;
}
<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">ol</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">list-style</span>: none;
}
<span class="hljs-selector-tag">img</span> {vert-align: top;} <span class="hljs-comment">//&#x79FB;&#x52A8;&#x7AEF;&#x56FE;&#x7247;&#x8FB9;&#x6846;   &#x76F8;&#x5F53;&#x4E8E;  border:0</span>

<span class="hljs-selector-tag">a</span>,
<span class="hljs-selector-tag">input</span>,
<span class="hljs-selector-tag">button</span> {
  -webkit-tap-highlight-<span class="hljs-attribute">color</span>: rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
}
<span class="hljs-comment">//-webkit-tap-highlight-color:rgba(0,0,0,0);//&#x900F;&#x660E;&#x5EA6;&#x8BBE;&#x7F6E;&#x4E3A;0&#xFF0C;&#x53BB;&#x6389;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x548C;&#x6587;&#x672C;&#x6846;&#x5BF9;&#x8C61;&#x65F6;&#x9ED8;&#x8BA4;&#x7684;&#x7070;&#x8272;&#x534A;&#x900F;&#x660E;&#x8986;&#x76D6;&#x5C42;(iOS)&#x6216;&#x8005;&#x865A;&#x6846;(Android) </span>
<span class="hljs-selector-tag">input</span>&#xFF0C;<span class="hljs-selector-tag">textarea</span>{<span class="hljs-attribute">outline</span>:none}  
//&#x53D6;&#x6D88;chrome&#x4E0B;&#x9ED8;&#x8BA4;&#x7684;&#x6587;&#x672C;&#x6846;&#x805A;&#x7126;&#x6837;&#x5F0F;

-webkit-appearance: none;
<span class="hljs-comment">//&#x6D88;&#x9664;&#x8F93;&#x5165;&#x6846;&#x548C;&#x6309;&#x94AE;&#x7684;&#x539F;&#x751F;&#x5916;&#x89C2;&#xFF0C;&#x5728;iOS&#x4E0A;&#x52A0;&#x4E0A;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x624D;&#x80FD;&#x7ED9;&#x6309;&#x94AE;&#x548C;&#x8F93;&#x5165;&#x6846;&#x81EA;&#x5B9A;&#x4E49;&#x6837;&#x5F0F; </span>

-webkit-user-<span class="hljs-selector-tag">select</span>: none;
<span class="hljs-comment">// &#x7981;&#x6B62;&#x9875;&#x9762;&#x6587;&#x5B57;&#x9009;&#x62E9; &#xFF0C;&#x6B64;&#x5C5E;&#x6027;&#x4E0D;&#x7EE7;&#x627F;&#xFF0C;&#x4E00;&#x822C;&#x52A0;&#x5728;body&#x4E0A;&#x89C4;&#x5B9A;&#x6574;&#x4E2A;body&#x7684;&#x6587;&#x5B57;&#x90FD;&#x4E0D;&#x4F1A;&#x81EA;&#x52A8;&#x8C03;&#x6574;</span>
<span class="hljs-selector-tag">input</span>,
<span class="hljs-selector-tag">button</span> {
  -webkit-appearance: none;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-comment">//&#x53BB;&#x6389;IOS&#x79FB;&#x9664;&#x539F;&#x751F;&#x63A7;&#x4EF6;&#x6837;&#x5F0F;</span>

-webkit-touch-callout:none; 
<span class="hljs-comment">// &#x7981;&#x7528;&#x957F;&#x6309;&#x9875;&#x9762;&#x65F6;&#x7684;&#x5F39;&#x51FA;&#x83DC;&#x5355;</span>

<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  -webkit-user-<span class="hljs-selector-tag">select</span>: none;
}
<span class="hljs-comment">//&#x7981;&#x6B62;&#x79FB;&#x52A8;&#x7AEF;&#x7528;&#x6237;&#x8FDB;&#x884C;&#x590D;&#x5236;.&#x9009;&#x62E9;.</span>

<span class="hljs-selector-tag">body</span> * {
  -webkit-user-<span class="hljs-selector-tag">select</span>: none;
  <span class="hljs-attribute">font-family</span>: Helvetica;
}

<span class="hljs-selector-tag">body</span> {
  -webkit-text-size-adjust: <span class="hljs-number">100%</span>;
}
<span class="hljs-comment">//&#x79FB;&#x52A8;&#x7AEF;&#x6A2A;&#x7AD6;&#x5C4F;&#x5B57;&#x4F53;&#x4E4E;&#x5927;&#x4E4E;&#x5C0F;</span>

-webkit-text-size-adjust: none; 
<span class="hljs-comment">//&#x7981;&#x6B62;&#x6587;&#x5B57;&#x81EA;&#x52A8;&#x8C03;&#x6574;&#x5927;&#x5C0F;(&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#x65CB;&#x8F6C;&#x8BBE;&#x5907;&#x7684;&#x65F6;&#x5019;&#x6587;&#x5B57;&#x5927;&#x5C0F;&#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x5316;)&#xFF0C;&#x6B64;&#x5C5E;&#x6027;&#x4E5F;&#x4E0D;&#x7EE7;&#x627F;&#xFF0C;&#x4E00;&#x822C;&#x52A0;&#x5728;body&#x4E0A;&#x89C4;&#x5B9A;&#x6574;&#x4E2A;body&#x7684;&#x6587;&#x5B57;&#x90FD;&#x4E0D;&#x4F1A;&#x81EA;&#x52A8;&#x8C03;&#x6574; </span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css前端初始化

## 原文链接
[https://segmentfault.com/a/1190000015907860](https://segmentfault.com/a/1190000015907860)

