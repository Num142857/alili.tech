---
title: 'Bower的安装与基本使用' 
date: 2018-11-25 2:30:07
hidden: true
slug: d7hvnqx1baf
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">Bower&#x662F;&#x4EC0;&#x4E48;&#x4E1C;&#x897F;&#xFF1F;</h2><p>&#x4E00;&#x4E2A;&#x524D;&#x7AEF;&#x5305;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#x3002;&#x80FD;&#x591F;&#x5E2E;&#x6211;&#x4EEC;&#x7BA1;&#x7406;Web&#x7AD9;&#x70B9;&#x4E0A;&#x7684;&#x5404;&#x79CD;&#x6846;&#x67B6;&#xFF0C;&#x7C7B;&#x5E93;&#x7B49;&#x7B49;&#x3002;&#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x6709;&#x5982;&#x4E0B;&#xFF1A;&#x80FD;&#x591F;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x8DDF;&#x8E2A;&#x524D;&#x7AEF;&#x5305;&#xFF0C;&#x5E76;&#x4E14;&#x4FDD;&#x8BC1;&#x4ED6;&#x4EEC;&#x662F;&#x6700;&#x65B0;&#xFF08;&#x6216;&#x8005;&#x662F;&#x4F60;&#x6307;&#x5B9A;&#x7684;&#x7279;&#x5B9A;&#x7248;&#x672C;&#xFF09;&#xFF0C;Bower&#x80FD;&#x591F;&#x7BA1;&#x7406;&#x524D;&#x7AEF;&#x91CC;&#x9762;&#x7684;HTML,CSS,JS&#xFF0C;&#x751A;&#x81F3;&#x8FD8;&#x53EF;&#x4EE5;&#x662F;&#x56FE;&#x7247;&#x3002;Bower&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x6700;&#x5927;&#x7684;&#x597D;&#x5904;&#xFF0C;&#x5B83;&#x5BF9;&#x6211;&#x4EEC;&#x524D;&#x7AEF;&#x8FDB;&#x884C;&#x4E86;&#x4F18;&#x5316;&#x3002;&#x5982;&#x679C;&#x591A;&#x4E2A;&#x5305;&#x4F9D;&#x8D56;&#x4E8E;&#x4E00;&#x4E2A;&#x5305;&#xFF0C;&#x4F8B;&#x5982;jQuery&#xFF0C;&#x90A3;&#x4E48;Bower&#x5C06;&#x53EA;&#x4E0B;&#x8F7D;jQuery&#x4E00;&#x6B21;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x79F0;&#x4E3A;&#x6241;&#x5E73;&#x4F9D;&#x8D56;&#xFF0C;&#x5B83;&#x6709;&#x52A9;&#x4E8E;&#x51CF;&#x5C11;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x3002;</p><p>&#x7B80;&#x8A00;&#x4E4B;&#x5C31;&#x662F;&#x7528;&#x4E8E;&#x641C;&#x7D22;&#x3001;&#x5B89;&#x88C5;&#x548C;&#x5378;&#x8F7D;&#x5982;JavaScript&#x3001;HTML&#x3001;CSS&#x4E4B;&#x7C7B;&#x7684;&#x7F51;&#x7EDC;&#x8D44;&#x6E90;&#x3002;</p><h2 id="articleHeader1">&#x5B89;&#x88C5;</h2><p>bower&#x4F9D;&#x8D56;&#x4E8E;node.js&#x548C;npm&#xFF0C;&#x5982;&#x679C;&#x8981;&#x4F7F;&#x7528;&#x5B83;&#x9700;&#x8981;&#x5148;&#x5B89;&#x88C5;node.js&#x548C;npm&#xFF0C;&#x56E0;&#x4E3A;node.js&#x5305;&#x542B;npm&#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x9700;&#x8981;&#x5B89;&#x88C5;node.js&#x5373;&#x53EF;&#x3002;</p><h1 id="articleHeader2">1.Node&#x5B89;&#x88C5;&#xFF08;&#x82E5;&#x5DF2;&#x5B89;&#x88C5;&#x53EF;&#x8DF3;&#x8FC7;&#xFF09;&#xFF1A;</h1><p>Windows &#x5B89;&#x88C5;&#x5305;(.msi)<br>32 &#x4F4D;&#x5B89;&#x88C5;&#x5305;&#x4E0B;&#x8F7D;&#x5730;&#x5740; : <a href="https://nodejs.org/dist/v4.4.3/node-v4.4.3-x86.msi" rel="nofollow noreferrer" target="_blank">https://nodejs.org/dist/v4.4....</a><br>64 &#x4F4D;&#x5B89;&#x88C5;&#x5305;&#x4E0B;&#x8F7D;&#x5730;&#x5740; : <a href="https://nodejs.org/dist/v4.4.3/node-v4.4.3-x64.msi" rel="nofollow noreferrer" target="_blank">https://nodejs.org/dist/v4.4....</a></p><p>CentOS&#x5B89;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x83B7;&#x53D6;&#x6E90;&#x7801;&#xFF0C;&#x89E3;&#x538B;&#xFF0C;&#x7F16;&#x8BD1;&#x5B89;&#x88C5;&#xFF0C;&#x914D;&#x7F6E;&#x53D8;&#x91CF;&#x4FEE;&#x6539;&#x6743;&#x9650;,&#x7F16;&#x8BD1;&#x6587;&#x4EF6;&#xFF0C;&#x68C0;&#x67E5;&#x7248;&#x672C;
cd /usr/local/src/
wget http://nodejs.org/dist/v0.10.24/node-v0.10.24.tar.gz
tar zxvf node-v0.10.24.tar.gz
cd node-v0.10.24
./configure --prefix=/usr/local/node/0.10.24
make
make install
vim /etc/profile
&#x8BBE;&#x7F6E;nodejs&#x73AF;&#x5883;&#x53D8;&#x91CF;&#xFF0C;&#x5728; export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL &#x4E00;&#x884C;&#x7684;&#x4E0A;&#x9762;&#x6DFB;&#x52A0;&#x5982;&#x4E0B;&#x5185;&#x5BB9;:
#set for nodejs
export NODE_HOME=/usr/local/node/0.10.24
export PATH=$NODE_HOME/bin:$PATH

//&#x91CD;&#x7F16;&#x8BD1;&#x751F;&#x6548;
source /etc/profile
//&#x68C0;&#x67E5;&#x662F;&#x5426;&#x5B89;&#x88C5;&#x6210;&#x529F;
node -v
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code>&#x83B7;&#x53D6;&#x6E90;&#x7801;&#xFF0C;&#x89E3;&#x538B;&#xFF0C;&#x7F16;&#x8BD1;&#x5B89;&#x88C5;&#xFF0C;&#x914D;&#x7F6E;&#x53D8;&#x91CF;&#x4FEE;&#x6539;&#x6743;&#x9650;,&#x7F16;&#x8BD1;&#x6587;&#x4EF6;&#xFF0C;&#x68C0;&#x67E5;&#x7248;&#x672C;
cd /usr/local/src/
wget http://nodejs.org/dist/v0.<span class="hljs-number">10.24</span>/<span class="hljs-keyword">node</span><span class="hljs-title">-v0</span>.<span class="hljs-number">10.24</span>.tar.gz
tar zxvf <span class="hljs-keyword">node</span><span class="hljs-title">-v0</span>.<span class="hljs-number">10.24</span>.tar.gz
cd <span class="hljs-keyword">node</span><span class="hljs-title">-v0</span>.<span class="hljs-number">10.24</span>
./configure --<span class="hljs-attr">prefix=</span>/usr/local/<span class="hljs-keyword">node</span><span class="hljs-title">/0</span>.<span class="hljs-number">10.24</span>
make
make install
vim /etc/profile
&#x8BBE;&#x7F6E;nodejs&#x73AF;&#x5883;&#x53D8;&#x91CF;&#xFF0C;&#x5728; export PATH <span class="hljs-keyword">USER</span> <span class="hljs-title">LOGNAME</span> MAIL HOSTNAME HISTSIZE HISTCONTROL &#x4E00;&#x884C;&#x7684;&#x4E0A;&#x9762;&#x6DFB;&#x52A0;&#x5982;&#x4E0B;&#x5185;&#x5BB9;:
<span class="hljs-comment">#set for nodejs</span>
export <span class="hljs-attr">NODE_HOME=</span>/usr/local/<span class="hljs-keyword">node</span><span class="hljs-title">/0</span>.<span class="hljs-number">10.24</span>
export <span class="hljs-attr">PATH=</span>$NODE_HOME/bin:$PATH

//&#x91CD;&#x7F16;&#x8BD1;&#x751F;&#x6548;
source /etc/profile
//&#x68C0;&#x67E5;&#x662F;&#x5426;&#x5B89;&#x88C5;&#x6210;&#x529F;
<span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>
</code></pre><h1 id="articleHeader3">2.Bower&#x5B89;&#x88C5;&#xFF1A;</h1><p>npm install bower &#x2013;g</p><h2 id="articleHeader4">&#x521D;&#x59CB;&#x5316;</h2><p>bower init</p><h2 id="articleHeader5">&#x5B89;&#x88C5;&#x3001;&#x66F4;&#x65B0;&#x3001;&#x5378;&#x8F7D;&#x4F9D;&#x8D56;&#x5305;</h2><p>bower install<br>&#x5982;&#xFF1A;bower install jQuery#1.2</p><p>bower update<br>bower unstall</p><h2 id="articleHeader6">&#x6E05;&#x7406;&#x7F13;&#x5B58;</h2><p>bower cache clean</p><h2 id="articleHeader7">&#x67E5;&#x8BE2;</h2><p>bower search &#x5305;&#x540D;</p><h2 id="articleHeader8">&#x6CE8;&#x518C;&#x5305;</h2><p>&#x5148;&#x53BB;github&#x4E0A;&#x9762;&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;&#x5E93;&#xFF08;&#x9879;&#x76EE;&#xFF09;&#xFF08;&#x516C;&#x6709;&#xFF0C;&#x79C1;&#x6709;&#x90FD;&#x884C;&#xFF09;&#x6216;&#x8005;&#x5176;&#x4ED6;&#xFF0C;&#x53EA;&#x8981;&#x80FD;&#x8BA9;bower.com&#x80FD;&#x8BBF;&#x95EE;&#x5230;&#x5730;&#x5740;&#x5E94;&#x8BE5;&#x90FD;&#x53EF;&#x4EE5;&#x3002;<br>&#x6BD4;&#x5982;&#x5EFA;&#x7ACB;&#x4E86;&#x4E00;&#x4E2A;&#x53EB;&#x505A;angualr-demo&#x7684;&#x5E93;&#xFF0C;&#x7136;&#x540E;&#x52A0;&#x5165;bower init&#x6765;&#x7BA1;&#x7406;&#x8FD9;&#x4E2A;&#x5E93;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbcVkx?w=702&amp;h=77" src="https://static.alili.tech/img/bVbcVkx?w=702&amp;h=77" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>bower install ngDemo &#x5B89;&#x88C5;</p><h2 id="articleHeader9">Bower&#x914D;&#x7F6E;&#x6587;&#x4EF6;(bower.json)</h2><p>&#x4F5C;&#x7528;&#x7C7B;&#x4F3C;&#x4E8E;composer.json&#xFF0C;&#x6267;&#x884C;bower install&#x65F6;&#x4F1A;&#x4F9D;&#x636E;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x66F4;&#x65B0;&#x5E93;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bower.json&#x914D;&#x7F6E;&#x6587;&#x4EF6;
{
&quot;name&quot;:&quot;&quot;,              //&#x5FC5;&#x987B;&#xFF0C;&#x5982;&#x679C;&#x9700;&#x8981;&#x6CE8;&#x518C;&#x5305;&#xFF0C;&#x5219;&#x8BE5;&#x5305;&#x540D;&#x552F;&#x4E00;&#x3002;
&quot;description&quot;:&quot;&quot;,       //&#x53EF;&#x9009;&#xFF0C;&#x5305;&#x63CF;&#x8FF0;
&quot;main&quot;:[],              //&#x53EF;&#x9009;&#xFF0C;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;bower&#x672C;&#x8EAB;&#x4E0D;&#x4F7F;&#x7528;&#xFF0C;&#x4F9B;&#x7B2C;&#x4E09;&#x65B9;&#x6784;&#x5EFA;&#x5DE5;&#x5177;&#x4F1A;&#x4F7F;&#x7528;
//&#x6BCF;&#x79CD;&#x6587;&#x4EF6;&#x7C7B;&#x578B;&#x53EA;&#x80FD;&#x6709;&#x4E00;&#x4E2A;&#x3002;
&quot;ignore&quot;:[],            //&#x53EF;&#x9009;&#xFF0C;&#x6587;&#x4EF6;&#x6216;&#x76EE;&#x5F55;&#x5217;&#x8868;&#x3002;bower&#x5B89;&#x88C5;&#x7684;&#x65F6;&#x5019;&#x5C06;&#x5FFD;&#x7565;&#x8BE5;&#x5217;&#x8868;&#x4E2D;&#x7684;&#x6587;&#x4EF6;&#x3002;
//bower&#x662F;&#x4ECE;git&#x4ED3;&#x5E93;&#x6216;&#x538B;&#x7F29;&#x5305;&#x4E0B;&#x8F7D;&#x4E00;&#x4E2A;&#x5305;&#xFF0C;&#x91CC;&#x9762;&#x7684;&#x6587;&#x4EF6;&#x5E76;&#x4E0D;&#x4E00;&#x5B9A;&#x5168;&#x90E8;&#x9700;&#x8981;&#x3002;
&quot;dependencies&quot;:[],      //&#x4F9D;&#x8D56;&#x5305;&#xFF0C;name:value&#xFF0C;value&#x53EF;&#x4EE5;&#x662F;&#x5305;&#x7684;semver       
//range(&#x7248;&#x672C;&#x53F7;&#x8303;&#x56F4;)&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x662F;&#x4E00;&#x4E2A;&#x5305;&#x7684;git&#x5730;&#x5740;&#x6216;&#x538B;&#x7F29;&#x5305;&#x5730;&#x5740;&#x3002;
&quot;devDependencies&quot;:[],   //&#x5F00;&#x53D1;&#x4F9D;&#x8D56;&#x5305;&#xFF0C;&#x4EC5;&#x4EC5;&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x6D4B;&#x8BD5;&#x6216;&#x8005;&#x7F16;&#x8BD1;&#x6587;&#x6863;&#x7528;&#xFF0C;&#x90E8;&#x7F72;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x3002;
//&#x683C;&#x5F0F;&#x548C;dependencies &#x76F8;&#x540C;
&quot;resolutions&quot;:[],       //&#x5305;&#x5F15;&#x7528;&#x51B2;&#x7A81;&#x81EA;&#x52A8;&#x4F7F;&#x7528;&#x8BE5;&#x6A21;&#x5757;&#x6307;&#x5B9A;&#x7684;&#x5305;&#x7248;&#x672C;
//&#x683C;&#x5F0F;&#x548C;dependencies &#x76F8;&#x540C;
&quot;overrides&quot; :[          //&#x8FD9;&#x4E2A;&#x4E5F;&#x5F88;&#x5173;&#x952E;&#xFF0C;&#x53EF;&#x4EE5;&#x8986;&#x76D6;&#x4E00;&#x4E2A;&#x5305;&#x4E2D;&#x7684;&#x9ED8;&#x8BA4;&#x8BBE;&#x7F6E;&#xFF0C;&#x6BD4;&#x5982;main&#x91CC;&#x9762;&#x8BBE;&#x5B9A;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;
&quot;package-name&quot;:{    //&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x9700;&#x8981;&#xFF0C;&#x8BA9;&#x7B2C;&#x4E09;&#x65B9;&#x5DE5;&#x5177;&#x53EA;&#x6253;&#x5305;&#x9700;&#x8981;&#x7684;&#x6587;&#x4EF6;&#x3002;
&quot;main&quot;:[]
        }
    ],                     
&quot;moduleType&quot;:&quot;&quot;,        //&#x53EF;&#x9009;&#xFF0C;&#x6307;&#x5B9A;&#x5305;&#x91C7;&#x7528;&#x90A3;&#x79CD;&#x6A21;&#x5757;&#x5316;&#x65B9;&#x5F0F;(globals,amd,node,es6,yui)
&quot;private&quot;:Boolean,      //&#x662F;&#x5426;&#x516C;&#x5F00;&#x53D1;&#x5E03;&#x5F53;&#x524D;&#x5305;,&#x5982;&#x679C;&#x53EA;&#x662F;&#x4F7F;&#x7528;bower&#x6765;&#x7BA1;&#x7406;&#x9879;&#x76EE;&#x7684;&#x5305;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E3A;true.
&quot;license&quot;:&quot;&quot;,           //&#x6388;&#x6743;&#x65B9;&#x5F0F;(GPL-3.0,CC-BY-4.0.....)
&quot;keywords&quot;:[],          //&#x53EF;&#x9009;&#xFF0C;&#x65B9;&#x4FBF;&#x6CE8;&#x518C;&#x540E;&#x5BB9;&#x6613;&#x88AB;&#x5176;&#x4ED6;&#x4EBA;&#x641C;&#x7D22;&#x5230;&#x3002;
&quot;authors&quot;:[],           //&#x4F5C;&#x8005;&#x5217;&#x8868;
&quot;homepage&quot;:[],          //&#x4E3B;&#x9875;&#xFF0C;&#x5305;&#x4ECB;&#x7ECD;&#x9875;
&quot;repository&quot;:{          //&#x5305;&#x6240;&#x5728;&#x4ED3;&#x5E93;&#x3002;
&quot;type&quot;: &quot;git&quot;,
&quot;url&quot;: &quot;git://github.com/foo/bar.git&quot;
    },
&#xFF5D;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code>bower.json&#x914D;&#x7F6E;&#x6587;&#x4EF6;
{
<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;&quot;</span>,              <span class="hljs-comment">//&#x5FC5;&#x987B;&#xFF0C;&#x5982;&#x679C;&#x9700;&#x8981;&#x6CE8;&#x518C;&#x5305;&#xFF0C;&#x5219;&#x8BE5;&#x5305;&#x540D;&#x552F;&#x4E00;&#x3002;</span>
<span class="hljs-string">&quot;description&quot;</span>:<span class="hljs-string">&quot;&quot;</span>,       <span class="hljs-comment">//&#x53EF;&#x9009;&#xFF0C;&#x5305;&#x63CF;&#x8FF0;</span>
<span class="hljs-string">&quot;main&quot;</span>:[],              <span class="hljs-comment">//&#x53EF;&#x9009;&#xFF0C;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;bower&#x672C;&#x8EAB;&#x4E0D;&#x4F7F;&#x7528;&#xFF0C;&#x4F9B;&#x7B2C;&#x4E09;&#x65B9;&#x6784;&#x5EFA;&#x5DE5;&#x5177;&#x4F1A;&#x4F7F;&#x7528;</span>
<span class="hljs-comment">//&#x6BCF;&#x79CD;&#x6587;&#x4EF6;&#x7C7B;&#x578B;&#x53EA;&#x80FD;&#x6709;&#x4E00;&#x4E2A;&#x3002;</span>
<span class="hljs-string">&quot;ignore&quot;</span>:[],            <span class="hljs-comment">//&#x53EF;&#x9009;&#xFF0C;&#x6587;&#x4EF6;&#x6216;&#x76EE;&#x5F55;&#x5217;&#x8868;&#x3002;bower&#x5B89;&#x88C5;&#x7684;&#x65F6;&#x5019;&#x5C06;&#x5FFD;&#x7565;&#x8BE5;&#x5217;&#x8868;&#x4E2D;&#x7684;&#x6587;&#x4EF6;&#x3002;</span>
<span class="hljs-comment">//bower&#x662F;&#x4ECE;git&#x4ED3;&#x5E93;&#x6216;&#x538B;&#x7F29;&#x5305;&#x4E0B;&#x8F7D;&#x4E00;&#x4E2A;&#x5305;&#xFF0C;&#x91CC;&#x9762;&#x7684;&#x6587;&#x4EF6;&#x5E76;&#x4E0D;&#x4E00;&#x5B9A;&#x5168;&#x90E8;&#x9700;&#x8981;&#x3002;</span>
<span class="hljs-string">&quot;dependencies&quot;</span>:[],      <span class="hljs-comment">//&#x4F9D;&#x8D56;&#x5305;&#xFF0C;name:value&#xFF0C;value&#x53EF;&#x4EE5;&#x662F;&#x5305;&#x7684;semver       </span>
<span class="hljs-comment">//range(&#x7248;&#x672C;&#x53F7;&#x8303;&#x56F4;)&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x662F;&#x4E00;&#x4E2A;&#x5305;&#x7684;git&#x5730;&#x5740;&#x6216;&#x538B;&#x7F29;&#x5305;&#x5730;&#x5740;&#x3002;</span>
<span class="hljs-string">&quot;devDependencies&quot;</span>:[],   <span class="hljs-comment">//&#x5F00;&#x53D1;&#x4F9D;&#x8D56;&#x5305;&#xFF0C;&#x4EC5;&#x4EC5;&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x6D4B;&#x8BD5;&#x6216;&#x8005;&#x7F16;&#x8BD1;&#x6587;&#x6863;&#x7528;&#xFF0C;&#x90E8;&#x7F72;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x3002;</span>
<span class="hljs-comment">//&#x683C;&#x5F0F;&#x548C;dependencies &#x76F8;&#x540C;</span>
<span class="hljs-string">&quot;resolutions&quot;</span>:[],       <span class="hljs-comment">//&#x5305;&#x5F15;&#x7528;&#x51B2;&#x7A81;&#x81EA;&#x52A8;&#x4F7F;&#x7528;&#x8BE5;&#x6A21;&#x5757;&#x6307;&#x5B9A;&#x7684;&#x5305;&#x7248;&#x672C;</span>
<span class="hljs-comment">//&#x683C;&#x5F0F;&#x548C;dependencies &#x76F8;&#x540C;</span>
<span class="hljs-string">&quot;overrides&quot;</span> :[          <span class="hljs-comment">//&#x8FD9;&#x4E2A;&#x4E5F;&#x5F88;&#x5173;&#x952E;&#xFF0C;&#x53EF;&#x4EE5;&#x8986;&#x76D6;&#x4E00;&#x4E2A;&#x5305;&#x4E2D;&#x7684;&#x9ED8;&#x8BA4;&#x8BBE;&#x7F6E;&#xFF0C;&#x6BD4;&#x5982;main&#x91CC;&#x9762;&#x8BBE;&#x5B9A;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
<span class="hljs-string">&quot;package-name&quot;</span>:{    <span class="hljs-comment">//&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x9700;&#x8981;&#xFF0C;&#x8BA9;&#x7B2C;&#x4E09;&#x65B9;&#x5DE5;&#x5177;&#x53EA;&#x6253;&#x5305;&#x9700;&#x8981;&#x7684;&#x6587;&#x4EF6;&#x3002;</span>
<span class="hljs-string">&quot;main&quot;</span>:[]
        }
    ],                     
<span class="hljs-string">&quot;moduleType&quot;</span>:<span class="hljs-string">&quot;&quot;</span>,        <span class="hljs-comment">//&#x53EF;&#x9009;&#xFF0C;&#x6307;&#x5B9A;&#x5305;&#x91C7;&#x7528;&#x90A3;&#x79CD;&#x6A21;&#x5757;&#x5316;&#x65B9;&#x5F0F;(globals,amd,node,es6,yui)</span>
<span class="hljs-string">&quot;private&quot;</span>:<span class="hljs-keyword">Boolean</span>,      <span class="hljs-comment">//&#x662F;&#x5426;&#x516C;&#x5F00;&#x53D1;&#x5E03;&#x5F53;&#x524D;&#x5305;,&#x5982;&#x679C;&#x53EA;&#x662F;&#x4F7F;&#x7528;bower&#x6765;&#x7BA1;&#x7406;&#x9879;&#x76EE;&#x7684;&#x5305;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E3A;true.</span>
<span class="hljs-string">&quot;license&quot;</span>:<span class="hljs-string">&quot;&quot;</span>,           <span class="hljs-comment">//&#x6388;&#x6743;&#x65B9;&#x5F0F;(GPL-3.0,CC-BY-4.0.....)</span>
<span class="hljs-string">&quot;keywords&quot;</span>:[],          <span class="hljs-comment">//&#x53EF;&#x9009;&#xFF0C;&#x65B9;&#x4FBF;&#x6CE8;&#x518C;&#x540E;&#x5BB9;&#x6613;&#x88AB;&#x5176;&#x4ED6;&#x4EBA;&#x641C;&#x7D22;&#x5230;&#x3002;</span>
<span class="hljs-string">&quot;authors&quot;</span>:[],           <span class="hljs-comment">//&#x4F5C;&#x8005;&#x5217;&#x8868;</span>
<span class="hljs-string">&quot;homepage&quot;</span>:[],          <span class="hljs-comment">//&#x4E3B;&#x9875;&#xFF0C;&#x5305;&#x4ECB;&#x7ECD;&#x9875;</span>
<span class="hljs-string">&quot;repository&quot;</span>:{          <span class="hljs-comment">//&#x5305;&#x6240;&#x5728;&#x4ED3;&#x5E93;&#x3002;</span>
<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;git&quot;</span>,
<span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;git://github.com/foo/bar.git&quot;</span>
    },
&#xFF5D;
</code></pre><h2 id="articleHeader10">.bowerrc</h2><p>.bowerrc&#x6587;&#x4EF6;&#x662F;&#x7528;&#x6765;&#x914D;&#x7F6E;bower&#x672C;&#x8EAB;&#x7684;&#x4E00;&#x4E9B;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x7684;</p><p>&#x5982;&#xFF0C;bower install &#x5B89;&#x88C5;&#xFF0C;&#x9ED8;&#x8BA4;&#x4F1A;&#x5B89;&#x88C5;&#x5230;&#x5F53;&#x524D;&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x8981;&#x4FEE;&#x6539;&#x8BE5;&#x5B89;&#x88C5;&#x4F4D;&#x7F6E;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x7F16;&#x8F91;.bowerrc&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x65B0;&#x5EFA;.bowerrc&#x6587;&#x4EF6;
{
    &quot;directory&quot;:&quot;public/bower_components&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code>&#x65B0;&#x5EFA;.<span class="hljs-keyword">bowerrc&#x6587;&#x4EF6;
</span>{
    <span class="hljs-string">&quot;directory&quot;</span>:<span class="hljs-string">&quot;public/bower_components&quot;</span>
}</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Bower的安装与基本使用

## 原文链接
[https://segmentfault.com/a/1190000015434346](https://segmentfault.com/a/1190000015434346)

