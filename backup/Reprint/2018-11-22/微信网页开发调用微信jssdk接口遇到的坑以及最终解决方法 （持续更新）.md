---
title: '微信网页开发调用微信jssdk接口遇到的坑以及最终解决方法 （持续更新）' 
date: 2018-11-22 2:30:09
hidden: true
slug: k177n6cbct
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">1.&#x5FAE;&#x4FE1;&#x7F51;&#x9875;&#x5F00;&#x53D1;&#x8C03;&#x7528;jssdk&#x65F6;&#x62A5;permission denied</h3><h4>&#x5927;&#x81F4;&#x662F;&#x4E24;&#x4E2A;&#x539F;&#x56E0;</h4><p>&#xFF08;1&#xFF09;&#x9996;&#x5148;&#x6CE8;&#x518C;&#x65F6;&#x672A;&#x5C06;&#x4F60;&#x6240;&#x8C03;&#x7528;&#x7684;&#x63A5;&#x53E3;&#x540D;&#x5B57;&#x6DFB;&#x52A0;&#x81F3;jsApiList</p><p>&#xFF08;2&#xFF09;&#x7B2C;&#x4E8C;&#x4E2A;&#x5C31;&#x662F;&#x4F60;&#x7684;&#x8FD9;&#x4E2A;&#x516C;&#x4F17;&#x53F7;&#x6CA1;&#x6709;&#x6743;&#x9650;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;api&#xFF0C;&#x4F8B;&#x5982;&#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E2D;&#x7684;&#x5FAE;&#x4FE1;&#x9875;&#x9762;&#x5C31;&#x65E0;&#x6CD5;&#x8C03;&#x53D6;&#x8FD9;&#x4E2A;api,&#x9700;&#x8981;&#x53D1;&#x5E03;&#x540E;&#xFF0C;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x6709;&#x6743;&#x9650;&#x7684;&#x516C;&#x4F17;&#x53F7;&#x4E2D;&#x518D;&#x6253;&#x5F00;&#x5BF9;&#x5E94;&#x7684;&#x754C;&#x9762;&#xFF0C;&#x8C03;&#x7528;api&#x624D;&#x6210;&#x529F;</p><h3 id="articleHeader1">2.&#x5FAE;&#x4FE1;jssdk &#x4F7F;&#x7528;&#x5FAE;&#x4FE1;&#x5185;&#x7F6E;&#x5730;&#x56FE;&#x67E5;&#x770B;&#x4F4D;&#x7F6E;&#x3010;openLocation&#x3011;&#x63A5;&#x53E3; &#x6700;&#x7EC8;&#x663E;&#x793A;&#x4E0D;&#x7CBE;&#x786E;</h3><p>&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;web&#x7AEF;&#x8C03;&#x7528;&#x7684;&#x662F;&#x767E;&#x5EA6;&#x5730;&#x56FE;api&#xFF0C;&#x800C;&#x5FAE;&#x4FE1;&#x9879;&#x76EE;&#x4E2D;&#x8C03;&#x7528;&#x7684;&#x662F;&#x817E;&#x8BAF;&#x81EA;&#x5DF1;&#x7684;&#x5730;&#x56FE;&#xFF0C;&#x4E24;&#x8005;&#x6240;&#x4F7F;&#x7528;&#x7684;&#x5750;&#x6807;&#x7CFB;&#x6709;&#x6240;&#x4E0D;&#x540C;&#xFF0C;&#x767E;&#x5EA6;&#x7528;&#x7684;&#x662F;&#x81EA;&#x5DF1;&#x7684;&#x767E;&#x5EA6;&#x5750;&#x6807;&#x7CFB;&#xFF0C;&#x800C;&#x9AD8;&#x5FB7;&#x5730;&#x56FE;&#x548C;&#x817E;&#x8BAF;&#x5730;&#x56FE;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x706B;&#x661F;&#x5750;&#x6807;&#x7CFB;&#xFF0C;&#x4E24;&#x8005;&#x4E4B;&#x95F4;&#x9700;&#x8981;&#x505A;&#x4E00;&#x4E0B;&#x8F6C;&#x6362;</p><blockquote>&#x706B;&#x661F;&#x5750;&#x6807; &#x8F6C;&#x6362;&#x5230; &#x767E;&#x5EA6;&#x5730;&#x56FE;&#x5750;&#x6807;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function huoxingToBaidu(hxLongitude, hxLatitude){  
                var X_PI = Math.PI * 3000.0 / 180.0;  
                var x = hxLongitude, y = hxLatitude;  
                var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);  
                var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);  
                var bdLongitude = z * Math.cos(theta) + 0.0065;  
                var bdLatitude = z * Math.sin(theta) + 0.006;  
                return {  
                    bdLongitude: bdLongitude,  
                    bdLatitude: bdLatitude  
                };  
            }  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">huoxingToBaidu</span>(<span class="hljs-params">hxLongitude, hxLatitude</span>)</span>{  
                <span class="hljs-keyword">var</span> X_PI = <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">3000.0</span> / <span class="hljs-number">180.0</span>;  
                <span class="hljs-keyword">var</span> x = hxLongitude, y = hxLatitude;  
                <span class="hljs-keyword">var</span> z = <span class="hljs-built_in">Math</span>.sqrt(x * x + y * y) + <span class="hljs-number">0.00002</span> * <span class="hljs-built_in">Math</span>.sin(y * X_PI);  
                <span class="hljs-keyword">var</span> theta = <span class="hljs-built_in">Math</span>.atan2(y, x) + <span class="hljs-number">0.000003</span> * <span class="hljs-built_in">Math</span>.cos(x * X_PI);  
                <span class="hljs-keyword">var</span> bdLongitude = z * <span class="hljs-built_in">Math</span>.cos(theta) + <span class="hljs-number">0.0065</span>;  
                <span class="hljs-keyword">var</span> bdLatitude = z * <span class="hljs-built_in">Math</span>.sin(theta) + <span class="hljs-number">0.006</span>;  
                <span class="hljs-keyword">return</span> {  
                    <span class="hljs-attr">bdLongitude</span>: bdLongitude,  
                    <span class="hljs-attr">bdLatitude</span>: bdLatitude  
                };  
            }  </code></pre><blockquote>&#x767E;&#x5EA6;&#x5730;&#x56FE;&#x5750;&#x6807; &#x8F6C;&#x6362;&#x5230; &#x706B;&#x661F;&#x5750;&#x6807;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function baiduToHuoxing(bdLongitude,bdLatitude) {  
                var X_PI = Math.Pi * 3000.0 / 180.0;  
                var x = bdLongitude - 0.0065;  
                var y = bdLatitude - 0.006;  
                var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);  
                var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);  
                var hxLongitude = z * Math.cos(theta);  
                var hxLatitude = z * Math.sin(theta);  
                return {  
                    hxLongitude: hxLongitude,  
                    hxLatitude: hxLatitude  
                }  
            }  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baiduToHuoxing</span>(<span class="hljs-params">bdLongitude,bdLatitude</span>) </span>{  
                <span class="hljs-keyword">var</span> X_PI = <span class="hljs-built_in">Math</span>.Pi * <span class="hljs-number">3000.0</span> / <span class="hljs-number">180.0</span>;  
                <span class="hljs-keyword">var</span> x = bdLongitude - <span class="hljs-number">0.0065</span>;  
                <span class="hljs-keyword">var</span> y = bdLatitude - <span class="hljs-number">0.006</span>;  
                <span class="hljs-keyword">var</span> z = <span class="hljs-built_in">Math</span>.sqrt(x * x + y * y) - <span class="hljs-number">0.00002</span> * <span class="hljs-built_in">Math</span>.sin(y * X_PI);  
                <span class="hljs-keyword">var</span> theta = <span class="hljs-built_in">Math</span>.atan2(y, x) - <span class="hljs-number">0.000003</span> * <span class="hljs-built_in">Math</span>.cos(x * X_PI);  
                <span class="hljs-keyword">var</span> hxLongitude = z * <span class="hljs-built_in">Math</span>.cos(theta);  
                <span class="hljs-keyword">var</span> hxLatitude = z * <span class="hljs-built_in">Math</span>.sin(theta);  
                <span class="hljs-keyword">return</span> {  
                    <span class="hljs-attr">hxLongitude</span>: hxLongitude,  
                    <span class="hljs-attr">hxLatitude</span>: hxLatitude  
                }  
            }  </code></pre><h3 id="articleHeader2">3.&#x5FAE;&#x4FE1;JSSDK &#x9884;&#x89C8;&#x56FE;&#x7247;&#x3010;previewImage&#x3011;&#x63A5;&#x53E3;&#x7684;&#x5751;, &#x5B89;&#x5353;&#x624B;&#x673A;&#x4E0A;&#xFF0C;&#x56FE;&#x7247;&#x9884;&#x89C8;&#x9700;&#x8981;&#x70B9;&#x51FB;&#x4E24;&#x6B21;&#x624D;&#x80FD;&#x9000;&#x51FA;&#x9884;&#x89C8;</h3><p>&#x5728;&#x5FAE;&#x4FE1;&#x7F51;&#x9875;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6D4B;&#x8BD5;&#x63D0;&#x51FA;&#x7684;&#x4E00;&#x4E2A;bug&#xFF0C;&#x5728;&#x5FAE;&#x4FE1;&#x4E2D;&#x9884;&#x89C8;&#x56FE;&#x7247;&#x662F;&#xFF0C;&#x70B9;&#x51FB;&#x56FE;&#x7247;&#xFF0C;&#x6253;&#x5F00;&#x56FE;&#x7247;&#x6B63;&#x5E38;&#xFF0C;&#x5F53;&#x518D;&#x6B21;&#x70B9;&#x51FB;&#x65F6;&#xFF0C;&#x539F;&#x672C;&#x5E94;&#x8BE5;&#x76F4;&#x63A5;&#x9000;&#x51FA;&#x56FE;&#x7247;&#x9884;&#x89C8;&#xFF0C;&#x4F46;&#x662F;&#x5374;&#x9700;&#x8981;&#x70B9;&#x51FB;&#x4E24;&#x6B21;&#x624D;&#x80FD;&#x9000;&#x51FA;&#x9884;&#x89C8;&#x3002;</p><blockquote>&#x5206;&#x6790;&#x539F;&#x56E0;</blockquote><p>&#x5E94;&#x8BE5;&#x662F; previewImage &#x8FD9;&#x4E2A;&#x63A5;&#x53E3;&#x8C03;&#x7528;&#x4E86;&#x4E24;&#x6B21;&#xFF0C;&#x8FDB;&#x884C;&#x4E86;&#x56FE;&#x7247;&#x7684;&#x53E0;&#x52A0;&#x3002;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x4E24;&#x6B21;&#x624D;&#x80FD;&#x9000;&#x51FA;</p><blockquote>&#x6700;&#x7EC8;&#x5F97;&#x51FA;&#x7684;&#x7ED3;&#x679C;</blockquote><p>&#x4EE3;&#x7801;&#x4E2D;&#x5B9E;&#x9645;&#x4E0A;&#x53EA;&#x8C03;&#x7528;&#x4E86;&#x4E00;&#x6B21;&#x3002;</p><ol><li>&#x5728;Android&#x7CFB;&#x7EDF;&#x7684;&#x624B;&#x673A;&#x4E2D;&#xFF0C;&#x5176;&#x5B9E;&#x5FAE;&#x4FE1;&#x70B9;&#x51FB;&#x7F51;&#x9875;&#x7684;&#x56FE;&#x7247;&#x4F1A;&#x81EA;&#x52A8;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x63A5;&#x53E3;&#x4E00;&#x6B21;&#x3002;&#x7136;&#x540E;&#x4EE3;&#x7801;&#x4E2D;&#x53C8;&#x5BF9;&#x5BF9;&#x8FD9;&#x4E2A;&#x63A5;&#x53E3;&#x8C03;&#x7528;&#x4E86;&#x4E00;&#x6B21;&#xFF0C;&#x8FD9;&#x5C31;&#x9020;&#x6210;&#x4E86;&#x4EE5;&#x4E0A;&#x7684;&#x7ED3;&#x679C;&#x3002;</li><li>&#x4F46;&#x662F;&#x5728;ios&#x7CFB;&#x7EDF;&#x7684;&#x624B;&#x673A;&#x4E2D;&#xFF0C;&#x5FAE;&#x4FE1;&#x5E76;&#x4E0D;&#x4F1A;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x63A5;&#x53E3;&#x3002;</li></ol><blockquote>&#x89E3;&#x51B3;&#x65B9;&#x6848;</blockquote><p>&#x5728;&#x65B9;&#x6CD5;&#x7684;&#x6700;&#x524D;&#x9762;&#x8FDB;&#x884C;&#x624B;&#x673A;&#x7CFB;&#x7EDF;&#x7684;&#x5224;&#x65AD;&#xFF0C;&#x5F53;&#x662F;Android&#x7CFB;&#x7EDF;&#x76F4;&#x63A5;return&#x3002;<br>&#x7136;&#x540E;&#x5728;&#x5728;&#x4E0B;&#x9762;&#x8FDB;&#x884C;&#x5FAE;&#x4FE1;&#x7684;previewImage&#x63A5;&#x53E3;&#x7684;&#x8C03;&#x7528;</p><blockquote>js&#x5224;&#x65AD;&#x662F;Android&#x8FD8;&#x662F;ios</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var u = navigator.userAgent;

isAndroid = u.indexOf(&apos;Android&apos;) &gt; -1 || u.indexOf(&apos;Adr&apos;) &gt; -1, //android&#x7EC8;&#x7AEF;

isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios&#x7EC8;&#x7AEF;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ruby"><code>var u = navigator.userAgent;

isAndroid = u.indexOf(<span class="hljs-string">&apos;Android&apos;</span>) &gt; -<span class="hljs-number">1</span> <span class="hljs-params">||</span> u.indexOf(<span class="hljs-string">&apos;Adr&apos;</span>) &gt; -<span class="hljs-number">1</span>, <span class="hljs-regexp">//android</span>&#x7EC8;&#x7AEF;

isiOS = !!u.match(<span class="hljs-regexp">/\(i[^;]+;( U;)? CPU.+Mac OS X/</span>); <span class="hljs-regexp">//ios</span>&#x7EC8;&#x7AEF;</code></pre><hr><p>2018.8.1&#x66F4;&#x65B0;<br>&#x8FD9;&#x4E2A;bug&#x597D;&#x50CF;&#x5FAE;&#x4FE1;&#x81EA;&#x5DF1;&#x4FEE;&#x590D;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x65E0;&#x8BBA;Android&#x8FD8;&#x662F;ios&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5FAE;&#x4FE1;&#x81EA;&#x5DF1;&#x4E0D;&#x4F1A;&#x53BB;&#x8C03;&#x7528;&#x4E86;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信网页开发调用微信jssdk接口遇到的坑以及最终解决方法 （持续更新）

## 原文链接
[https://segmentfault.com/a/1190000015735047](https://segmentfault.com/a/1190000015735047)

