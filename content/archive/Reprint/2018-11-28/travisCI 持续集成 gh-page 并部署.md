---
title: 'travisCI 持续集成 gh-page 并部署' 
date: 2018-11-28 2:30:11
hidden: true
slug: wuvbst3hpp
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4ECB;&#x7ECD;</h2><p>&#x6211;&#x4EEC;&#x5927;&#x591A;&#x6570;&#x516C;&#x53F8;&#x5728;&#x505A;&#x9879;&#x76EE;&#x65F6;&#xFF0C;&#x5E94;&#x8BE5;&#x90FD;&#x78B0;&#x5230;&#x8FC7;&#xFF0C;&#x5F53;&#x4EE3;&#x7801;&#x88AB; push &#x4E0A; git &#x6216;&#x8005;&#x662F; svn &#x65F6;&#xFF0C;&#x8FC7;&#x51E0;&#x5206;&#x949F;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x7EBF;&#x4E0A;&#x5B9E;&#x65F6;&#x770B;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x5C31;&#x50CF;&#x770B;&#x5230;&#x4EB2;&#x751F;&#x513F;&#x5B50;&#x4E00;&#x6837;&#xFF0C;&#x4F46;&#x662F;&#x80AF;&#x5B9A;&#x5F88;&#x591A;&#x4EBA;&#x4E0D;&#x77E5;&#x9053;&#x8FD9;&#x662F;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x7684;&#xFF08;&#x5982;&#x679C;&#x4F60;&#x77E5;&#x9053;&#xFF0C;&#x90A3;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#x5F80;&#x4E0B;&#x770B;&#x4E86;&#xFF0C;&#x70B9;&#x4E2A;&#x8D5E;&#x5C31;&#x53BB;&#x5403;&#x996D;&#x5427;...&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x4ECA;&#x5929;&#x6211;&#x5C31;&#x6765;&#x7ED9;&#x5927;&#x5BB6;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x5176;&#x4E2D;&#x7684;&#x4E00;&#x6B3E; travis-CI&#xFF0C;&#x8BF7;&#x8BB0;&#x4F4F;&#x5B83;&#x7684; face&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015274246?w=72&amp;h=55" src="https://static.alili.tech/img/remote/1460000015274246?w=72&amp;h=55" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x6301;&#x7EED;&#x96C6;&#x6210;&#xFF08;Continuous integration&#xFF09;&#x7684;&#x6838;&#x5FC3;&#x601D;&#x60F3;&#xFF0C;&#x4EE3;&#x7801;&#x5148;&#x81EA;&#x52A8;&#x5316;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#xFF0C;&#x901A;&#x8FC7;&#x540E;&#x96C6;&#x6210;&#x5230;&#x4E3B;&#x5E72;&#x3002;&#x5B83;&#x7EC6;&#x5206;&#x7684;&#x8BDD;&#x6709;&#x4E24;&#x4E2A;&#x6982;&#x5FF5;&#xFF1A;</p><ul><li>&#x6301;&#x7EED;&#x4EA4;&#x4ED8;</li><li>&#x6301;&#x7EED;&#x90E8;&#x7F72;</li></ul><blockquote>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#x6301;&#x7EED;&#x90E8;&#x7F72;&#x662F;&#x6301;&#x7EED;&#x4EA4;&#x4ED8;&#x7684;&#x4E0B;&#x4E00;&#x6B65;&#xFF0C;&#x6301;&#x7EED;&#x4EA4;&#x4ED8;&#x662F;&#x6D4B;&#x8BD5;&#x9636;&#x6BB5;&#xFF0C;&#x90E8;&#x7F72;&#x5C31;&#x662F;&#x6D4B;&#x8BD5;&#x901A;&#x8FC7;&#x9636;&#x6BB5;&#x3002;,&#x8FD9;&#x4E2A;&#x5C31;&#x6709;&#x5F88;&#x591A;&#x4E1C;&#x897F;&#x5C55;&#x5F00;&#x4E86;&#xFF0C;&#x6C42;&#x6211;&#x6211;&#x5C31;&#x544A;&#x8BC9;&#x4F60;...</blockquote><h2 id="articleHeader1">&#x51C6;&#x5907;</h2><ul><li>GitHub &#x8D26;&#x53F7;&#xFF08;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x5408;&#x683C;&#x7684;&#x7A0B;&#x5E8F;&#x5458;&#xFF0C;&#x4F60;&#x6CA1;&#x6709;&#x771F;&#x7684;&#x597D;&#x5417;&#xFF1F;&#xFF09;</li><li>travis-CI &#x5E73;&#x53F0;&#x63A5;&#x5165;</li><li>GITHUB_TOKEN</li><li>&#x7ED9;&#x6211;&#x70B9;&#x8D5E;...</li></ul><h2 id="articleHeader2">&#x7B2C;&#x4E00;&#x6B65;</h2><p>&#x767B;&#x5F55; CI &#x5B98;&#x7F51;&#xFF0C;&#x7136;&#x540E;&#x8FDE;&#x63A5;&#x81EA;&#x5DF1;&#x7684; gitHub&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019; Legacy Services Integration &#x5E94;&#x8BE5;&#x9ED8;&#x8BA4;&#x663E;&#x793A;&#x4E86;&#x51E0;&#x4E2A;&#x81EA;&#x5DF1;gitHub&#x7684;&#x9879;&#x76EE;<br><span class="img-wrap"><img data-src="/img/remote/1460000015274247?w=761&amp;h=546" src="https://static.alili.tech/img/remote/1460000015274247?w=761&amp;h=546" alt="" title="" style="cursor:pointer;display:inline"></span><br>&#x5982;&#x679C;&#x663E;&#x793A;&#x4E0D;&#x5168;&#xFF0C;&#x53EF;&#x4EE5;&#x6309;&#x5DE6;&#x8FB9;&#x7684; sync &#x540C;&#x6B65;&#x4E00;&#x4E0B;<br><span class="img-wrap"><img data-src="/img/remote/1460000015274248?w=318&amp;h=204" src="https://static.alili.tech/img/remote/1460000015274248?w=318&amp;h=204" alt="" title="" style="cursor:pointer;display:inline"></span><br>&#x7136;&#x540E;&#x7B2C;&#x4E00;&#x5F20;&#x56FE;&#x6BCF;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x8FB9;&#x4E0A;&#x6709;&#x4E00;&#x4E2A; switch &#x5F00;&#x5173;&#xFF0C;&#x4F60;&#x60F3;&#x8981;&#x8BA9;&#x54EA;&#x4E2A;&#x96C6;&#x6210;&#x5C31;&#x6253;&#x5F00;&#x54EA;&#x4E2A;&#x5427;&#xFF08;&#x4E0D;&#x622A;&#x56FE;&#x4E86;&#xFF0C;&#x6211;&#x61D2;...&#xFF09;</p><h2 id="articleHeader3">&#x7B2C;&#x4E8C;&#x6B65;</h2><p>&#x8FDB;&#x5165;&#x81EA;&#x5DF1;&#x7684; gh &#x4E3B;&#x9875;&#xFF0C;&#x4F9D;&#x6B21;&#xFF1A;GitHub settings -&gt; developer settings -&gt; Personal access tokens&#xFF0C;&#x52FE;&#x9009;&#x6743;&#x9650;&#xFF0C;&#x81EA;&#x7531;&#x53D1;&#x6325;&#xFF0C;&#x4F60;&#x8981;&#x5168;&#x52FE;&#x4E5F;&#x884C;...</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015274249?w=1050&amp;h=878" src="https://static.alili.tech/img/remote/1460000015274249?w=1050&amp;h=878" alt="" title="" style="cursor:pointer;display:inline"></span><br>&#x5C06;&#x751F;&#x6210;&#x7684; token &#x590D;&#x5236;&#x5907;&#x7528;</p><h2 id="articleHeader4">&#x7B2C;&#x4E09;&#x6B65;</h2><p>&#x56DE;&#x5230;CI&#xFF0C;&#x6253;&#x5F00;&#x4F60;&#x6253;&#x5F00;&#x5F00;&#x5173;&#x7684;&#x90A3;&#x4E2A;&#x9879;&#x76EE;&#x7684; settings&#xFF08;&#x770B;&#x5230;&#x4F60;&#x5F88;&#x7ED5;&#x6211;&#x5C31;&#x653E;&#x5FC3;&#x4E86;...&#xFF09;&#xFF0C;&#x8FDB;&#x5165;&#x914D;&#x7F6E;&#x9875;&#x9762;&#xFF0C;&#x5728; Environment Variables &#x91CC;&#x586B;&#x5165;&#x4EE5;&#x4E0B;&#x5185;&#x5BB9;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015274250?w=832&amp;h=374" src="https://static.alili.tech/img/remote/1460000015274250?w=832&amp;h=374" alt="" title="" style="cursor:pointer"></span></p><blockquote>&#x5206;&#x522B;&#x5BF9;&#x5E94;&#xFF1A;git&#x9879;&#x76EE;&#x3001;&#x9879;&#x76EE;&#x5206;&#x652F;&#xFF08;&#x6211;&#x8FD9;&#x91CC;&#x7684;&#x5206;&#x652F;&#x662F;gh-pages&#xFF09;&#x3001;token&#x3001;Git-email&#x3001;Git-username</blockquote><h2 id="articleHeader5">&#x7B2C;&#x56DB;&#x6B65;</h2><p>&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x914D;&#x7F6E;&#x4E2A;&#x6587;&#x4EF6;&#x53EB; .travis.yml,&#x6253;&#x5305;&#x9879;&#x76EE;&#x4EE5;vue-cli&#x4E3A;&#x4F8B;&#xFF0C;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="language: node_js
# nodejs&#x7248;&#x672C;
node_js:
    - &apos;8.9.1&apos;

# S: Build Lifecycle
install:
  - npm install
script:
  - npm run build

# &#x8FD9;&#x4E2A;&#x662F;&#x4E0D;&#x662F;&#x770B;&#x7740;&#x5F88;&#x719F;&#x6089;&#xFF1F;
after_script:
  - cd ./dist
  - git init
  - git config user.name &quot;${USER_NAME}&quot;
  - git config user.email &quot;${USER_EMAIL}&quot;
  - git add .
  - git commit -m &quot;blog.jzxer.cn&quot;
  - git push --force --quiet &quot;https://${test_token}@${GH_REF}&quot; master:${P_BRANCH}
# E: Build LifeCycle

# &#x53EA;&#x5BF9;&#x67D0;&#x4E2A;&#x5206;&#x652F;&#x884C;&#x4E3A;&#x751F;&#x6548;
branches:
  only:
    - master" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code class="txt">language: node_js
# nodejs&#x7248;&#x672C;
node_js:
    -<span class="ruby"> <span class="hljs-string">&apos;8.9.1&apos;</span>
</span>
# S: Build Lifecycle
install:
  -<span class="ruby"> npm install
</span>script:
  -<span class="ruby"> npm run build
</span>
# &#x8FD9;&#x4E2A;&#x662F;&#x4E0D;&#x662F;&#x770B;&#x7740;&#x5F88;&#x719F;&#x6089;&#xFF1F;
after_script:
  -<span class="ruby"> cd ./dist
</span>  -<span class="ruby"> git init
</span>  -<span class="ruby"> git config user.name <span class="hljs-string">&quot;${USER_NAME}&quot;</span>
</span>  -<span class="ruby"> git config user.email <span class="hljs-string">&quot;${USER_EMAIL}&quot;</span>
</span>  -<span class="ruby"> git add .
</span>  -<span class="ruby"> git commit -m <span class="hljs-string">&quot;blog.jzxer.cn&quot;</span>
</span>  -<span class="ruby"> git push --force --quiet <span class="hljs-string">&quot;https://${test_token}@${GH_REF}&quot;</span> <span class="hljs-symbol">master:</span>${P_BRANCH}
</span># E: Build LifeCycle

# &#x53EA;&#x5BF9;&#x67D0;&#x4E2A;&#x5206;&#x652F;&#x884C;&#x4E3A;&#x751F;&#x6548;
branches:
  only:
    -<span class="ruby"> master</span></code></pre><h2 id="articleHeader6">&#x7B2C;&#x56DB;&#x70B9;</h2><p>&#x6253;&#x5F00; CI&#xFF0C;&#x8FDB;&#x5165;&#x81EA;&#x5DF1;&#x6784;&#x5EFA;&#x9879;&#x76EE;&#x7684;&#x90A3;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x6253;&#x5F00; job log&#xFF0C;&#x611F;&#x53D7;&#x90A3;&#x751F;&#x6015; error &#x7684;&#x5FEB;&#x611F;&#xFF01;&#xFF08;&#x90FD;&#x662F;&#x6CEA;...&#xFF09;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015274251?w=632&amp;h=420" src="https://static.alili.tech/img/remote/1460000015274251?w=632&amp;h=420" alt="" title="" style="cursor:pointer;display:inline"></span><br>&#x5F53;&#x7136;&#x5982;&#x679C;&#x4F60;&#x901A;&#x8FC7;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x4F1A;&#x6709;&#x4E00;&#x4E2A; passing &#x5728;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x6807;&#x9898;&#x65C1;&#x8FB9;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015274252?w=363&amp;h=148" src="https://static.alili.tech/img/remote/1460000015274252?w=363&amp;h=148" alt="" title="" style="cursor:pointer;display:inline"></span><br>&#x6BCF;&#x6B21;&#x770B;&#x5230;&#x8FD9;&#x4E2A;&#x6211;&#x90FD;&#x6FC0;&#x52A8;&#x7684;&#x70ED;&#x6CEA;&#x76C8;&#x7736;...</p><h2 id="articleHeader7">&#x7B2C;&#x4E94;&#x6B65;</h2><p>&#x770B;&#x4E00;&#x4E0B;&#x81EA;&#x5DF1;&#x5728;git&#x4E0A;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x51FA;&#x73B0;&#x4E86;&#x8FD9;&#x4E2A;&#x5206;&#x652F;&#xFF0C;&#x5E76;&#x4E14;&#x5DF2;&#x7ECF;&#x81EA;&#x52A8;&#x90E8;&#x7F72;&#x597D;&#x4E86;&#xFF1F;&#x6210;&#x529F;&#x7684;&#x622A;&#x56FE;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000015274253?w=355&amp;h=306" src="https://static.alili.tech/img/remote/1460000015274253?w=355&amp;h=306" alt="" title="" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader8">&#x90E8;&#x7F72;&#x597D;&#x7684;&#x9875;&#x9762;</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000015274254?w=797&amp;h=266" src="https://static.alili.tech/img/remote/1460000015274254?w=797&amp;h=266" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader9">&#x540E;&#x8BB0;</h2><p>&#x73B0;&#x5728;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x75AF;&#x72C2;&#x7684; push &#x4EE3;&#x7801;&#x4E86;&#xFF0C;&#x5176;&#x4ED6;&#x7684;&#x4E8B;&#x4EA4;&#x7ED9; CI &#x53BB;&#x505A;&#x5C31;&#x884C;&#x3002;</p><p>&#x597D;&#x4E86;&#xFF0C;&#x7801;&#x4E86;&#x8FD9;&#x4E48;&#x4E45;&#x7684;&#x5B57;&#xFF0C;&#x4F60;&#x662F;&#x4E0D;&#x662F;&#x5E94;&#x8BE5;&#xFF1A;</p><p>&#x70B9;&#x4E2A;&#x8D5E;&#xFF1F;</p><p>&#x4E2A;&#x8D5E;&#xFF1F;</p><p>&#x8D5E;&#xFF1F;</p><p>&#x1F44D;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
travisCI 持续集成 gh-page 并部署

## 原文链接
[https://segmentfault.com/a/1190000015274243](https://segmentfault.com/a/1190000015274243)

