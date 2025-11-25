---
title: '用vue搭建的个人博客介绍----mapblog小站' 
date: 2018-11-29 9:27:39
hidden: true
slug: peoqu65zq8l
categories: [reprint]
---

{{< raw >}}

                    
<p>&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x6401;&#x7F6E;&#x4E86;&#x5F88;&#x957F;&#x65F6;&#x95F4;&#xFF0C;&#x6700;&#x7EC8;&#x51B3;&#x5B9A;&#x8FD8;&#x662F;&#x628A;&#x5B83;&#x5199;&#x51FA;&#x6765;&#xFF0C;&#x7ED9;&#x521A;&#x5F00;&#x59CB;&#x5B66;&#x4E60;vue&#x5E76;&#x4E14;&#x60F3;&#x7528;vue&#x5199;&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;&#x7684;&#x540C;&#x5B66;&#x4E00;&#x4E2A;&#x53C2;&#x8003;&#x3002;&#x56E0;&#x4E3A;&#x5F53;&#x521D;&#x6211;&#x4E5F;&#x662F;&#x53C2;&#x8003;&#x4E86;&#x5176;&#x4ED6;&#x4EBA;&#x5206;&#x4EAB;&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x4ECE;&#x4E00;&#x4E2A;vue&#x5C0F;&#x767D;&#x53D8;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x5165;&#x95E8;&#x7EA7;&#x9009;&#x624B;&#xFF0C;&#x5E76;&#x6700;&#x7EC8;&#x5B8C;&#x6210;&#x4E86;&#x8FD9;&#x4E2A;&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;&#x7684;&#x642D;&#x5EFA;&#x5DE5;&#x4F5C;&#xFF0C;&#x4EE3;&#x7801;&#x5DF2;&#x6258;&#x7BA1;&#x5728;<a href="https://github.com/justJokee/vue-ssr-blog" rel="nofollow noreferrer" target="_blank">Github-justJokee</a>&#x3002;&#x7EBF;&#x4E0A;&#x8BBF;&#x95EE;&#x8BF7;&#x6233;<a href="http://www.mapblog.cn" rel="nofollow noreferrer" target="_blank">mapblog&#x5C0F;&#x7AD9;</a>&#xFF0C;&#x6240;&#x4EE5;&#x73B0;&#x5728;&#x6709;&#x5FC5;&#x8981;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x535A;&#x5BA2;&#x6240;&#x7528;&#x5230;&#x7684;&#x76F8;&#x5173;&#x6280;&#x672F;&#x53CA;&#x5B9E;&#x73B0;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x5E2E;&#x52A9;&#x6709;&#x9700;&#x8981;&#x7684;&#x540C;&#x5B66;^_^&#x3002;<br>&#x535A;&#x5BA2;&#x524D;&#x53F0;&#x91C7;&#x7528;vue-ssr&#x8FDB;&#x884C;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF08;&#x89E3;&#x51B3;vue&#x524D;&#x7AEF;&#x6E32;&#x67D3;&#x7684;seo&#x95EE;&#x9898;&#xFF09;&#xFF0C;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x91C7;&#x7528;vue&#x8FDB;&#x884C;&#x4F20;&#x7EDF;&#x524D;&#x7AEF;&#x6E32;&#x67D3;&#x3002;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x53EF;&#x53C2;&#x8003;&#x535A;&#x5BA2;&#x524D;&#x53F0;&#x4EE3;&#x7801;<a href="https://github.com/justJokee/vue-ssr-blog/tree/master/front" rel="nofollow noreferrer" target="_blank">front</a>&#xFF0C;&#x524D;&#x53F0;&#x6E32;&#x67D3;&#x53EF;&#x53C2;&#x8003;&#x535A;&#x5BA2;&#x7684;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x4EE3;&#x7801;<a href="https://github.com/justJokee/vue-ssr-blog/tree/master/admin" rel="nofollow noreferrer" target="_blank">admin</a>&#x3002;&#x540E;&#x7AEF;&#x4E3B;&#x8981;&#x4F7F;&#x7528;nodejs&#x7684;&#x6846;&#x67B6;express&#xFF0C;&#x6570;&#x636E;&#x5E93;&#x91C7;&#x7528;mongodb&#x3002;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x767B;&#x5F55;&#x91C7;&#x7528;jsonwebtoken&#x4E0E;&#x540E;&#x7AEF;&#x8FDB;&#x884C;&#x767B;&#x9646;&#x72B6;&#x6001;&#x7684;&#x786E;&#x8BA4;&#x3002;&#x7A7A;&#x95F4;&#x4E70;&#x7684;&#x817E;&#x8BAF;&#x4E91;&#xFF0C;1M&#x7F51;&#x901F;&#xFF0C;&#x5B66;&#x751F;&#x5957;&#x9910;&#x867D;&#x7136;&#x4FBF;&#x5B9C;&#x70B9;&#xFF0C;&#x9F9F;&#x901F;&#x4E5F;&#x662F;&#x591F;&#x4F24;&#x7684;&#x3002;&#x6574;&#x7AD9;&#x4E3B;&#x8981;&#x91C7;&#x7528;&#x7684;&#x6280;&#x672F;&#x6808;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;<br><strong>&#x524D;&#x7AEF;&#xFF1A;</strong></p>
<ul>
<li>vue&#x3001;vue-ssr</li>
<li>vue-router</li>
<li>vuex</li>
<li>vue-meta</li>
<li>axios</li>
<li>webpack</li>
</ul>
<p><strong>&#x540E;&#x7AEF;&#xFF1A;</strong></p>
<ul>
<li>nodejs</li>
<li>express</li>
<li>mongodb</li>
<li>mongoose</li>
<li>jsonwebtoken</li>
<li>pm2</li>
<li>webpack</li>
</ul>
<p><strong>&#x9879;&#x76EE;&#x7684;&#x4E3B;&#x76EE;&#x5F55;&#xFF1A;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x2502;  .gitignore
&#x2502;  README.md
&#x2502;
&#x251C;&#x2500;admin  &#x540E;&#x53F0;&#x7BA1;&#x7406;&#xFF08;&#x524D;&#x53F0;&#x6E32;&#x67D3;&#xFF09;
&#x2514;&#x2500;front  &#x524D;&#x53F0;&#x9875;&#x9762;&#xFF08;vue-ssr&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF09;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&#x2502;  .gitignore
&#x2502;  README.md
&#x2502;
&#x251C;&#x2500;admin  &#x540E;&#x53F0;&#x7BA1;&#x7406;&#xFF08;&#x524D;&#x53F0;&#x6E32;&#x67D3;&#xFF09;
&#x2514;&#x2500;front  &#x524D;&#x53F0;&#x9875;&#x9762;&#xFF08;vue-ssr&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF09;</code></pre>
<p><strong>&#x4E3B;&#x76EE;&#x5F55;&#x8BF4;&#x660E;&#xFF1A;</strong></p>
<ul>
<li>front &#x4E0B;&#x6240;&#x8D77;&#x7684;express&#x670D;&#x52A1;&#x662F;&#x6574;&#x4E2A;&#x7AD9;&#x70B9;&#x7684;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x8D1F;&#x8D23;&#x524D;&#x540E;&#x53F0;&#x7684;&#x6570;&#x636E;&#x4EA4;&#x4E92;&#x3001;&#x524D;&#x53F0;&#x9875;&#x9762;&#x76F4;&#x51FA;&#x7B49;&#x3002;&#x5F53;&#x7136;&#x5B83;&#x4E5F;&#x8D1F;&#x8D23;&#x524D;&#x53F0;&#x7684;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x70ED;&#x66F4;&#x65B0;&#xFF0C;&#x901A;&#x8FC7;NODE_ENV&#x63A7;&#x5236;</li>
<li>admin &#x4E0B;&#x6240;&#x8D77;&#x7684;&#x670D;&#x52A1;&#x4EC5;&#x4F9B;&#x5F00;&#x53D1;&#x65F6;&#x7684;&#x70ED;&#x66F4;&#x65B0;&#x548C;http&#x8BF7;&#x6C42;&#x8F6C;&#x53D1;,&#x6570;&#x636E;&#x4EA4;&#x4E92;&#x4F9D;&#x9760;&#x4E0A;&#x9762;&#x6240;&#x8BF4;&#x7684;&#x7684;front&#x4E0B;&#x6240;&#x8D77;&#x7684;express&#x670D;&#x52A1;&#x5668;</li>
</ul>
<p><strong>&#x535A;&#x5BA2;&#x524D;&#x53F0;&#x4E3B;&#x8981;&#x5B9E;&#x73B0;&#x529F;&#x80FD;&#xFF1A;</strong></p>
<ul>
<li>&#x5168;&#x5C40;&#x54CD;&#x5E94;&#x5F0F;</li>
<li>
<p>&#x6587;&#x7AE0;</p>
<ul>
<li>&#x6309;&#x6807;&#x7B7E;&#x5206;&#x7C7B;&#x5C55;&#x793A;&#xFF08;&#x5927;&#x4E8E;10&#x7BC7;&#x5206;&#x9875;&#xFF09;</li>
<li>&#x6309;&#x65F6;&#x95F4;&#x5F52;&#x6863;&#xFF08;&#x5927;&#x4E8E;10&#x7BC7;&#x5206;&#x9875;&#xFF09;</li>
<li>&#x7B2C;&#x4E09;&#x65B9;&#x5206;&#x4EAB;</li>
<li>&#x8BC4;&#x8BBA;</li>
<li>&#x7AD9;&#x5185;&#x641C;&#x7D22;&#xFF08;&#x5927;&#x4E8E;10&#x7BC7;&#x5206;&#x9875;&#xFF09;</li>
</ul>
</li>
<li>&#x7559;&#x8A00;&#xFF08;&#x5927;&#x4E8E;10&#x6761;&#x5206;&#x9875;&#xFF09;</li>
<li>&#x6240;&#x6709;&#x6807;&#x7B7E;&#x5C55;&#x793A;</li>
<li>&#x63A8;&#x8350;&#x9605;&#x8BFB;&#x6D4F;&#x89C8;&#x91CF;&#x524D;&#x4E94;&#x7684;&#x6587;&#x7AE0;</li>
<li>&#x652F;&#x6301;QQ&#x3001;Github&#x7B2C;&#x4E09;&#x65B9;&#x767B;&#x5F55;</li>
</ul>
<p><strong>&#x535A;&#x5BA2;&#x7684;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x4E3B;&#x8981;&#x5B9E;&#x73B0;&#x529F;&#x80FD;&#xFF1A;</strong></p>
<ul>
<li>&#x5168;&#x5C40;&#x54CD;&#x5E94;&#x5F0F;</li>
<li>
<p>&#x7AD9;&#x5185;&#x6587;&#x7AE0;&#x641C;&#x7D22;</p>
<ul>
<li>&#x5173;&#x952E;&#x5B57;&#x641C;&#x7D22;</li>
<li>&#x65F6;&#x95F4;&#x8303;&#x56F4;&#x641C;&#x7D22;</li>
</ul>
</li>
<li>
<p>&#x5DF2;&#x53D1;&#x8868;&#x6587;&#x7AE0;&#x7BA1;&#x7406;</p>
<ul>
<li>&#x663E;&#x793A;&#x6240;&#x6709;&#x6587;&#x7AE0;</li>
<li>&#x6309;&#x6807;&#x7B7E;&#x5206;&#x7C7B;&#x5C55;&#x793A;</li>
<li>&#x5B9E;&#x73B0;&#x5220;&#x9664;&#x3001;&#x4FEE;&#x6539;&#x3001;&#x9884;&#x89C8;&#x529F;&#x80FD;</li>
</ul>
</li>
<li>
<p>&#x8349;&#x7A3F;&#x7BB1;</p>
<ul><li>&#x5B9E;&#x73B0;&#x5220;&#x9664;&#x3001;&#x4FEE;&#x6539;&#x3001;&#x9884;&#x89C8;&#x529F;&#x80FD;</li></ul>
</li>
<li>
<p>&#x7559;&#x8A00;&#x7BA1;&#x7406;</p>
<ul>
<li>&#x5B9E;&#x73B0;&#x9884;&#x89C8;&#x3001;&#x5220;&#x9664;&#x7559;&#x8A00;&#x529F;&#x80FD;</li>
<li>&#x7BA1;&#x7406;&#x5458;&#x56DE;&#x590D;</li>
</ul>
</li>
<li>
<p>&#x8BC4;&#x8BBA;&#x7BA1;&#x7406;</p>
<ul>
<li>&#x5B9E;&#x73B0;&#x9884;&#x89C8;&#x3001;&#x5220;&#x9664;&#x8BC4;&#x8BBA;&#x529F;&#x80FD;</li>
<li>&#x7BA1;&#x7406;&#x5458;&#x56DE;&#x590D;</li>
</ul>
</li>
<li>
<p>&#x65B0;&#x6D88;&#x606F;</p>
<ul><li>&#x5BF9;&#x8BBF;&#x5BA2;&#x7684;&#x8BC4;&#x8BBA;&#x3001;&#x7559;&#x8A00;&#x3001;&#x8D5E;&#x7684;&#x6587;&#x7AE0;&#x4EE5;&#x53CA;&#x8BBF;&#x95EE;&#x7684;&#x54EA;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x8FDB;&#x884C;&#x6536;&#x96C6;&#x5206;&#x7C7B;&#x5C55;&#x793A;</li></ul>
</li>
<li>
<p>&#x6587;&#x672C;&#x7F16;&#x8F91;&#x5668; ---Ueditor</p>
<ul><li>&#x6587;&#x7AE0;&#x53D1;&#x8868;&#x3001;&#x4FEE;&#x6539;</li></ul>
</li>
<li>
<p>&#x8D26;&#x6237;&#x8BBE;&#x7F6E;</p>
<ul>
<li>&#x5BC6;&#x7801;&#x4FEE;&#x6539;</li>
<li>&#x6570;&#x636E;&#x5E93;&#x5907;&#x4EFD;&#x53CA;&#x4E0B;&#x8F7D;&#x5907;&#x4EFD;&#x6587;&#x4EF6;&#x5230;&#x672C;&#x5730;</li>
</ul>
</li>
<li>&#x9000;&#x51FA;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;</li>
<li>&#x6587;&#x7AE0;&#x3001;&#x8BC4;&#x8BBA;&#x3001;&#x7559;&#x8A00;&#x7684;&#x6570;&#x91CF;&#x5927;&#x4E8E;10&#x65F6;&#x5206;&#x9875;&#x663E;&#x793A;</li>
</ul>
<p><strong>&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x754C;&#x9762;&#x76F8;&#x5173;&#x622A;&#x56FE;&#xFF1A;</strong></p>
<h5>&#x767B;&#x5F55;&#x754C;&#x9762;</h5>
<p><span class="img-wrap"><img data-src="/img/bVbbEeM?w=1362&amp;h=634" src="https://static.alili.tech/img/bVbbEeM?w=1362&amp;h=634" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h5>&#x6587;&#x7AE0;&#x7BA1;&#x7406;</h5>
<p><span class="img-wrap"><img data-src="/img/bVbbEeW?w=1348&amp;h=954" src="https://static.alili.tech/img/bVbbEeW?w=1348&amp;h=954" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h5>&#x7559;&#x8A00;&#x7BA1;&#x7406;&#xFF08;&#x4E0E;&#x8BC4;&#x8BBA;&#x7BA1;&#x7406;&#x57FA;&#x672C;&#x7C7B;&#x4F3C;&#xFF09;</h5>
<p><span class="img-wrap"><img data-src="/img/bVbbEfh?w=1364&amp;h=636" src="https://static.alili.tech/img/bVbbEfh?w=1364&amp;h=636" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer;"></span></p>
<h5>&#x65B0;&#x6D88;&#x606F;</h5>
<p><span class="img-wrap"><img data-src="/img/bVbbEfF?w=1364&amp;h=636" src="https://static.alili.tech/img/bVbbEfF?w=1364&amp;h=636" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h5>&#x7F16;&#x8F91;&#x5668;</h5>
<p><span class="img-wrap"><img data-src="/img/bVbbEfM?w=1350&amp;h=636" src="https://static.alili.tech/img/bVbbEfM?w=1350&amp;h=636" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h5>&#x8D26;&#x6237;&#x8BBE;&#x7F6E;</h5>
<p><span class="img-wrap"><img data-src="/img/bVbbEgt?w=1366&amp;h=617" src="https://static.alili.tech/img/bVbbEgt?w=1366&amp;h=617" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<p><strong>&#x76F8;&#x5173;&#x53C2;&#x8003;&#xFF1A;</strong></p>
<ol>
<li><a href="https://ssr.vuejs.org/zh/" rel="nofollow noreferrer" target="_blank">vue-ssr&#x5B98;&#x65B9;&#x6587;&#x6863;</a></li>
<li><a href="https://juejin.im/post/5a50f208f265da3e5132ed91" rel="nofollow noreferrer" target="_blank">&#x57FA;&#x4E8E;vue-ssr&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x5165;&#x95E8;&#x8BE6;&#x89E3;</a></li>
<li><a href="https://segmentfault.com/a/1190000007985486">Vue2 SSR &#x7684;&#x4F18;&#x5316;&#x4E4B;&#x65C5;</a></li>
<li><a href="https://github.com/jkchao/vue-emoji" rel="nofollow noreferrer" target="_blank">emoji</a></li>
<li>
<a href="https://github.com/netpi/ueditor" rel="nofollow noreferrer" target="_blank">nodejs-ueditor&#x63D2;&#x4EF6;</a><br>...</li>
</ol>
<p><strong>&#x7279;&#x6B64;&#x5411;&#x4EE5;&#x4E0A;&#x4F5C;&#x8005;&#x4EEC;&#x7684;&#x65E0;&#x79C1;&#x5206;&#x4EAB;&#x7CBE;&#x795E;&#x81F4;&#x8C22;&#x3002;</strong></p>
<p>&#x672C;&#x6587;&#x9996;&#x53D1;&#x4E8E;<a href="http://www.mapblog.cn/article/vue/1" rel="nofollow noreferrer" target="_blank">mapblog&#x5C0F;&#x7AD9;</a>&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x79EF;&#x7D2F;&#x548C;&#x5206;&#x4EAB;web&#x77E5;&#x8BC6;&#x7684;&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue搭建的个人博客介绍----mapblog小站

## 原文链接
[https://segmentfault.com/a/1190000015131514](https://segmentfault.com/a/1190000015131514)

