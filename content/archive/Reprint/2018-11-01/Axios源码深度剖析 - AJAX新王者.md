---
title: Axios源码深度剖析 - AJAX新王者
reprint: true
categories: reprint
abbrlink: 3ba215a7
date: 2018-11-01 02:30:09
---

{{% raw %}}
<p>Axios&#x6E90;&#x7801;&#x5206;&#x6790; - XHR&#x7BC7;</p><p>&#x6587;&#x7AE0;&#x6E90;&#x7801;&#x6258;&#x7BA1;&#x5728;<a href="https://github.com/ronffy/axios-tutorial" rel="nofollow noreferrer" target="_blank">github</a>&#x4E0A;&#xFF0C;&#x6B22;&#x8FCE;fork&#x6307;&#x6B63;&#xFF01;</p><p><a href="https://github.com/axios/axios" rel="nofollow noreferrer" target="_blank">axios</a> &#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E; Promise &#x7684;http&#x8BF7;&#x6C42;&#x5E93;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x548C;node.js&#x4E2D;&#xFF0C;&#x76EE;&#x524D;&#x5728;github&#x4E0A;&#x6709; 42K &#x7684;star&#x6570;</p><h3 id="articleHeader0">&#x5907;&#x6CE8;&#xFF1A;</h3><ol><li>&#x6BCF;&#x4E00;&#x5C0F;&#x8282;&#x90FD;&#x4F1A;&#x4ECE;&#x4E24;&#x4E2A;&#x65B9;&#x9762;&#x4ECB;&#x7ECD;&#xFF1A;&#x5982;&#x4F55;&#x4F7F;&#x7528; -&gt; &#x6E90;&#x7801;&#x5206;&#x6790;</li><li>[&#x5DE5;&#x5177;&#x65B9;&#x6CD5;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;]&#x4E00;&#x8282;&#x53EF;&#x5148;&#x8DF3;&#x8FC7;&#xFF0C;&#x540E;&#x9762;&#x7528;&#x5230;&#x4E86;&#x518D;&#x8FC7;&#x6765;&#x67E5;&#x770B;</li><li>axios&#x6700;&#x6838;&#x5FC3;&#x7684;&#x6280;&#x672F;&#x70B9;&#x662F;<a href="#%E5%A6%82%E4%BD%95%E6%8B%A6%E6%88%AA%E8%AF%B7%E6%B1%82%E5%93%8D%E5%BA%94%E5%B9%B6%E4%BF%AE%E6%94%B9%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0%E4%BF%AE%E6%94%B9%E5%93%8D%E5%BA%94%E6%95%B0%E6%8D%AE">&#x5982;&#x4F55;&#x62E6;&#x622A;&#x8BF7;&#x6C42;&#x54CD;&#x5E94;&#x5E76;&#x4FEE;&#x6539;&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#x4FEE;&#x6539;&#x54CD;&#x5E94;&#x6570;&#x636E;</a> &#x548C; <a href="#axios%E6%98%AF%E5%A6%82%E4%BD%95%E7%94%A8promise%E6%90%AD%E8%B5%B7%E5%9F%BA%E4%BA%8Exhr%E7%9A%84%E5%BC%82%E6%AD%A5%E6%A1%A5%E6%A2%81%E7%9A%84">axios&#x662F;&#x5982;&#x4F55;&#x7528;promise&#x642D;&#x8D77;&#x57FA;&#x4E8E;xhr&#x7684;&#x5F02;&#x6B65;&#x6865;&#x6881;&#x7684;</a></li></ol><h3 id="articleHeader1">axios&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&#x251C;&#x2500;&#x2500; /dist/                     # &#x9879;&#x76EE;&#x8F93;&#x51FA;&#x76EE;&#x5F55;
&#x251C;&#x2500;&#x2500; /lib/                      # &#x9879;&#x76EE;&#x6E90;&#x7801;&#x76EE;&#x5F55;
&#x2502; &#x251C;&#x2500;&#x2500; /cancel/                 # &#x5B9A;&#x4E49;&#x53D6;&#x6D88;&#x529F;&#x80FD;
&#x2502; &#x251C;&#x2500;&#x2500; /core/                   # &#x4E00;&#x4E9B;&#x6838;&#x5FC3;&#x529F;&#x80FD;
&#x2502; &#x2502; &#x251C;&#x2500;&#x2500; Axios.js               # axios&#x7684;&#x6838;&#x5FC3;&#x4E3B;&#x7C7B;
&#x2502; &#x2502; &#x251C;&#x2500;&#x2500; dispatchRequest.js     # &#x7528;&#x6765;&#x8C03;&#x7528;http&#x8BF7;&#x6C42;&#x9002;&#x914D;&#x5668;&#x65B9;&#x6CD5;&#x53D1;&#x9001;&#x8BF7;&#x6C42;
&#x2502; &#x2502; &#x251C;&#x2500;&#x2500; InterceptorManager.js  # &#x62E6;&#x622A;&#x5668;&#x6784;&#x9020;&#x51FD;&#x6570;
&#x2502; &#x2502; &#x2514;&#x2500;&#x2500; settle.js              # &#x6839;&#x636E;http&#x54CD;&#x5E94;&#x72B6;&#x6001;&#xFF0C;&#x6539;&#x53D8;Promise&#x7684;&#x72B6;&#x6001;
&#x2502; &#x251C;&#x2500;&#x2500; /helpers/                # &#x4E00;&#x4E9B;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;
&#x2502; &#x251C;&#x2500;&#x2500; /adapters/               # &#x5B9A;&#x4E49;&#x8BF7;&#x6C42;&#x7684;&#x9002;&#x914D;&#x5668; xhr&#x3001;http
&#x2502; &#x2502; &#x251C;&#x2500;&#x2500; http.js                # &#x5B9E;&#x73B0;http&#x9002;&#x914D;&#x5668;
&#x2502; &#x2502; &#x2514;&#x2500;&#x2500; xhr.js                 # &#x5B9E;&#x73B0;xhr&#x9002;&#x914D;&#x5668;
&#x2502; &#x251C;&#x2500;&#x2500; axios.js                 # &#x5BF9;&#x5916;&#x66B4;&#x9732;&#x63A5;&#x53E3;
&#x2502; &#x251C;&#x2500;&#x2500; defaults.js              # &#x9ED8;&#x8BA4;&#x914D;&#x7F6E; 
&#x2502; &#x2514;&#x2500;&#x2500; utils.js                 # &#x516C;&#x7528;&#x5DE5;&#x5177;
&#x251C;&#x2500;&#x2500; package.json               # &#x9879;&#x76EE;&#x4FE1;&#x606F;
&#x251C;&#x2500;&#x2500; index.d.ts                 # &#x914D;&#x7F6E;TypeScript&#x7684;&#x58F0;&#x660E;&#x6587;&#x4EF6;
&#x2514;&#x2500;&#x2500; index.js                   # &#x5165;&#x53E3;&#x6587;&#x4EF6;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crystal"><code>
&#x251C;&#x2500;&#x2500; /dist/                     <span class="hljs-comment"># &#x9879;&#x76EE;&#x8F93;&#x51FA;&#x76EE;&#x5F55;</span>
&#x251C;&#x2500;&#x2500; /<span class="hljs-class"><span class="hljs-keyword">lib</span>/                      <span class="hljs-comment"># &#x9879;&#x76EE;&#x6E90;&#x7801;&#x76EE;&#x5F55;</span></span>
&#x2502; &#x251C;&#x2500;&#x2500; /cancel/                 <span class="hljs-comment"># &#x5B9A;&#x4E49;&#x53D6;&#x6D88;&#x529F;&#x80FD;</span>
&#x2502; &#x251C;&#x2500;&#x2500; /core/                   <span class="hljs-comment"># &#x4E00;&#x4E9B;&#x6838;&#x5FC3;&#x529F;&#x80FD;</span>
&#x2502; &#x2502; &#x251C;&#x2500;&#x2500; Axios.js               <span class="hljs-comment"># axios&#x7684;&#x6838;&#x5FC3;&#x4E3B;&#x7C7B;</span>
&#x2502; &#x2502; &#x251C;&#x2500;&#x2500; dispatchRequest.js     <span class="hljs-comment"># &#x7528;&#x6765;&#x8C03;&#x7528;http&#x8BF7;&#x6C42;&#x9002;&#x914D;&#x5668;&#x65B9;&#x6CD5;&#x53D1;&#x9001;&#x8BF7;&#x6C42;</span>
&#x2502; &#x2502; &#x251C;&#x2500;&#x2500; InterceptorManager.js  <span class="hljs-comment"># &#x62E6;&#x622A;&#x5668;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
&#x2502; &#x2502; &#x2514;&#x2500;&#x2500; settle.js              <span class="hljs-comment"># &#x6839;&#x636E;http&#x54CD;&#x5E94;&#x72B6;&#x6001;&#xFF0C;&#x6539;&#x53D8;Promise&#x7684;&#x72B6;&#x6001;</span>
&#x2502; &#x251C;&#x2500;&#x2500; /helpers/                <span class="hljs-comment"># &#x4E00;&#x4E9B;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;</span>
&#x2502; &#x251C;&#x2500;&#x2500; /adapters/               <span class="hljs-comment"># &#x5B9A;&#x4E49;&#x8BF7;&#x6C42;&#x7684;&#x9002;&#x914D;&#x5668; xhr&#x3001;http</span>
&#x2502; &#x2502; &#x251C;&#x2500;&#x2500; http.js                <span class="hljs-comment"># &#x5B9E;&#x73B0;http&#x9002;&#x914D;&#x5668;</span>
&#x2502; &#x2502; &#x2514;&#x2500;&#x2500; xhr.js                 <span class="hljs-comment"># &#x5B9E;&#x73B0;xhr&#x9002;&#x914D;&#x5668;</span>
&#x2502; &#x251C;&#x2500;&#x2500; axios.js                 <span class="hljs-comment"># &#x5BF9;&#x5916;&#x66B4;&#x9732;&#x63A5;&#x53E3;</span>
&#x2502; &#x251C;&#x2500;&#x2500; defaults.js              <span class="hljs-comment"># &#x9ED8;&#x8BA4;&#x914D;&#x7F6E; </span>
&#x2502; &#x2514;&#x2500;&#x2500; utils.js                 <span class="hljs-comment"># &#x516C;&#x7528;&#x5DE5;&#x5177;</span>
&#x251C;&#x2500;&#x2500; package.json               <span class="hljs-comment"># &#x9879;&#x76EE;&#x4FE1;&#x606F;</span>
&#x251C;&#x2500;&#x2500; index.d.ts                 <span class="hljs-comment"># &#x914D;&#x7F6E;TypeScript&#x7684;&#x58F0;&#x660E;&#x6587;&#x4EF6;</span>
&#x2514;&#x2500;&#x2500; index.js                   <span class="hljs-comment"># &#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
</code></pre><p>&#x6CE8;&#xFF1A;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8981;&#x770B;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x662F;<code>/lib/</code>&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x4EE5;&#x4E0B;&#x6240;&#x6709;&#x6D89;&#x53CA;&#x5230;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x7684;&#x5730;&#x65B9;&#xFF0C;<br>&#x6211;&#x4EEC;&#x90FD;&#x4F1A;&#x5728;<code>/lib/</code>&#x4E0B;&#x8FDB;&#x884C;&#x67E5;&#x627E;</p><h3 id="articleHeader2">&#x540D;&#x8BCD;&#x89E3;&#x91CA;</h3><ul><li>&#x62E6;&#x622A;&#x5668; interceptors<p>&#xFF08;&#x5982;&#x679C;&#x4F60;&#x719F;&#x6089;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x5F88;&#x597D;&#x7406;&#x89E3;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x8D77;&#x5230;&#x7684;&#x5C31;&#x662F;&#x57FA;&#x4E8E;promise&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x4F5C;&#x7528;&#xFF09;</p><p>&#x62E6;&#x622A;&#x5668;&#x5206;&#x4E3A;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#x548C;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF1A;<br>&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;(<code>interceptors.request</code>)&#x662F;&#x6307;&#x53EF;&#x4EE5;&#x62E6;&#x622A;&#x4F4F;&#x6BCF;&#x6B21;&#x6216;&#x6307;&#x5B9A;http&#x8BF7;&#x6C42;&#xFF0C;&#x5E76;&#x53EF;&#x4FEE;&#x6539;&#x914D;&#x7F6E;&#x9879;<br>&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;(<code>interceptors.response</code>)&#x53EF;&#x4EE5;&#x5728;&#x6BCF;&#x6B21;http&#x8BF7;&#x6C42;&#x540E;&#x62E6;&#x622A;&#x4F4F;&#x6BCF;&#x6B21;&#x6216;&#x6307;&#x5B9A;http&#x8BF7;&#x6C42;&#xFF0C;&#x5E76;&#x53EF;&#x4FEE;&#x6539;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x9879;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x5148;&#x7B80;&#x5355;&#x8BF4;&#x660E;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x505A;&#x8BE6;&#x7EC6;&#x7684;&#x4ECB;&#x7ECD;<a href="#%E5%A6%82%E4%BD%95%E6%8B%A6%E6%88%AA%E8%AF%B7%E6%B1%82%E5%93%8D%E5%BA%94%E5%B9%B6%E4%BF%AE%E6%94%B9%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0%E4%BF%AE%E6%94%B9%E5%93%8D%E5%BA%94%E6%95%B0%E6%8D%AE">&#x5982;&#x4F55;&#x62E6;&#x622A;&#x8BF7;&#x6C42;&#x54CD;&#x5E94;&#x5E76;&#x4FEE;&#x6539;&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#x4FEE;&#x6539;&#x54CD;&#x5E94;&#x6570;&#x636E;</a>&#x3002;</p></li><li>&#x6570;&#x636E;&#x8F6C;&#x6362;&#x5668; &#xFF08;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5BF9;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#xFF0C;&#x6BD4;&#x5982;&#x5C06;&#x5BF9;&#x8C61;&#x8F6C;&#x6362;&#x4E3A;JSON&#x5B57;&#x7B26;&#x4E32;&#xFF09;<p>&#x6570;&#x636E;&#x8F6C;&#x6362;&#x5668;&#x5206;&#x4E3A;&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x5668;&#x548C;&#x54CD;&#x5E94;&#x8F6C;&#x6362;&#x5668;&#xFF0C;&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF1A;<br>&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x5668;(<code>transformRequest</code>)&#x662F;&#x6307;&#x5728;&#x8BF7;&#x6C42;&#x524D;&#x5BF9;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#xFF0C;<br>&#x54CD;&#x5E94;&#x8F6C;&#x6362;&#x5668;(<code>transformResponse</code>)&#x4E3B;&#x8981;&#x5BF9;&#x8BF7;&#x6C42;&#x54CD;&#x5E94;&#x540E;&#x7684;&#x54CD;&#x5E94;&#x4F53;&#x505A;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x3002;</p></li><li>http&#x8BF7;&#x6C42;&#x9002;&#x914D;&#x5668;&#xFF08;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF09;<p>&#x5728;axios&#x9879;&#x76EE;&#x91CC;&#xFF0C;http&#x8BF7;&#x6C42;&#x9002;&#x914D;&#x5668;&#x4E3B;&#x8981;&#x6307;&#x4E24;&#x79CD;&#xFF1A;XHR&#x3001;http&#x3002;<br>XHR&#x7684;&#x6838;&#x5FC3;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x7684;XMLHttpRequest&#x5BF9;&#x8C61;&#xFF0C;<br>http&#x6838;&#x5FC3;&#x662F;node&#x7684;http[s].request&#x65B9;&#x6CD5;</p><p>&#x5F53;&#x7136;&#xFF0C;axios&#x4E5F;&#x7559;&#x7ED9;&#x4E86;&#x7528;&#x6237;&#x901A;&#x8FC7;config&#x81EA;&#x884C;&#x914D;&#x7F6E;&#x9002;&#x914D;&#x5668;&#x7684;&#x63A5;&#x53E3;&#x7684;&#xFF0C;<br>&#x4E0D;&#x8FC7;&#xFF0C;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FD9;&#x4E24;&#x79CD;&#x9002;&#x914D;&#x5668;&#x5C31;&#x80FD;&#x591F;&#x6EE1;&#x8DB3;&#x4ECE;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x5411;&#x670D;&#x52A1;&#x7AEF;&#x53D1;&#x8BF7;&#x6C42;&#x6216;&#x8005;&#x4ECE;node&#x7684;http&#x5BA2;&#x6237;&#x7AEF;&#x5411;&#x670D;&#x52A1;&#x7AEF;&#x53D1;&#x8BF7;&#x6C42;&#x7684;&#x9700;&#x6C42;&#x3002;</p><p>&#x672C;&#x6B21;&#x5206;&#x4EAB;&#x4E3B;&#x8981;&#x56F4;&#x7ED5;XHR&#x3002;</p></li><li>config&#x914D;&#x7F6E;&#x9879; &#xFF08;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF09;<p>&#x6B64;&#x5904;&#x6211;&#x4EEC;&#x8BF4;&#x7684;config&#xFF0C;&#x5728;&#x9879;&#x76EE;&#x5185;&#x4E0D;&#x662F;&#x771F;&#x7684;&#x90FD;&#x53EB;config&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#x540D;&#xFF0C;&#x8FD9;&#x4E2A;&#x540D;&#x5B57;&#x662F;&#x6211;&#x6839;&#x636E;&#x5B83;&#x7684;&#x7528;&#x9014;&#x8D77;&#x7684;&#x4E00;&#x4E2A;&#x540D;&#x5B57;&#xFF0C;&#x65B9;&#x4FBF;&#x5927;&#x5BB6;&#x7406;&#x89E3;&#x3002;</p><p>&#x5728;axios&#x9879;&#x76EE;&#x4E2D;&#x7684;&#xFF0C;&#x8BBE;&#x7F6E;&#x8BFB;&#x53D6;config&#x65F6;&#xFF0C;<br>&#x6709;&#x7684;&#x5730;&#x65B9;&#x53EB;&#x5B83;<code>defaults</code>(<code>/lib/defaults.js</code>)&#xFF0C;&#x8FD9;&#x513F;&#x662F;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x9879;&#xFF0C;<br>&#x6709;&#x7684;&#x5730;&#x65B9;&#x53EB;&#x5B83;<code>config</code>&#xFF0C;&#x5982;<code>Axios.prototype.request</code>&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x518D;&#x5982;<code>xhrAdapter</code>http&#x8BF7;&#x6C42;&#x9002;&#x914D;&#x5668;&#x65B9;&#x6CD5;&#x7684;&#x53C2;&#x6570;&#x3002;</p><p>config&#x5728;axios&#x9879;&#x76EE;&#x91CC;&#x7684;&#x662F;&#x975E;&#x5E38;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x6761;&#x94FE;&#xFF0C;&#x662F;&#x7528;&#x6237;&#x8DDF;axios&#x9879;&#x76EE;&#x5185;&#x90E8;&#x201C;&#x901A;&#x4FE1;&#x201D;&#x7684;&#x4E3B;&#x8981;&#x6865;&#x6881;&#x3002;</p></li></ul><h3 id="articleHeader3">axios&#x5185;&#x90E8;&#x7684;&#x8FD0;&#x4F5C;&#x6D41;&#x7A0B;&#x56FE;</h3><p><span class="img-wrap"><img data-src="/img/bVbbjtQ?w=450&amp;h=764" src="https://static.alili.tech/img/bVbbjtQ?w=450&amp;h=764" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader4">&#x5DE5;&#x5177;&#x65B9;&#x6CD5;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;</h3><p>&#xFF08;&#x6CE8;&#xFF1A;&#x672C;&#x8282;&#x53EF;&#x5148;&#x8DF3;&#x8FC7;&#xFF0C;&#x540E;&#x9762;&#x7528;&#x5230;&#x4E86;&#x518D;&#x8FC7;&#x6765;&#x67E5;&#x770B;&#xFF09;</p><p>&#x6709;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x591A;&#x5904;&#x4F7F;&#x7528;&#xFF0C;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;&#x4E0B;&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;</p><p>1.bind&#xFF1A; &#x7ED9;&#x67D0;&#x4E2A;&#x51FD;&#x6570;&#x6307;&#x5B9A;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;this&#x6307;&#x5411;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
bind(fn, context); 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
bind(fn, context); 
</code></pre><p>&#x5B9E;&#x73B0;&#x6548;&#x679C;&#x540C;<code>Function.prototype.bind</code>&#x65B9;&#x6CD5;: <code>fn.bind(context)</code></p><p>2.forEach&#xFF1A;&#x904D;&#x5386;&#x6570;&#x7EC4;&#x6216;&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var utils = require(&apos;./utils&apos;);
var forEach = utils.forEach;

// &#x6570;&#x7EC4;
utils.forEach([], (value, index, array) =&gt; {})

// &#x5BF9;&#x8C61;
utils.forEach({}, (value, key, object) =&gt; {})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./utils&apos;</span>);
<span class="hljs-keyword">var</span> forEach = utils.forEach;

<span class="hljs-comment">// &#x6570;&#x7EC4;</span>
utils.forEach([], (value, index, array) =&gt; {})

<span class="hljs-comment">// &#x5BF9;&#x8C61;</span>
utils.forEach({}, (value, key, object) =&gt; {})
</code></pre><p>3.merge&#xFF1A;&#x6DF1;&#x5EA6;&#x5408;&#x5E76;&#x591A;&#x4E2A;&#x5BF9;&#x8C61;&#x4E3A;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var utils = require(&apos;./utils&apos;);
var merge = utils.merge;

var obj1 = {
  a: 1,
  b: {
    bb: 11,
    bbb: 111,
  }
};
var obj2 = {
  a: 2,
  b: {
    bb: 22,
  }
};
var mergedObj = merge(obj1, obj2); 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./utils&apos;</span>);
<span class="hljs-keyword">var</span> merge = utils.merge;

<span class="hljs-keyword">var</span> obj1 = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">b</span>: {
    <span class="hljs-attr">bb</span>: <span class="hljs-number">11</span>,
    <span class="hljs-attr">bbb</span>: <span class="hljs-number">111</span>,
  }
};
<span class="hljs-keyword">var</span> obj2 = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">b</span>: {
    <span class="hljs-attr">bb</span>: <span class="hljs-number">22</span>,
  }
};
<span class="hljs-keyword">var</span> mergedObj = merge(obj1, obj2); 
</code></pre><p>mergedObj&#x5BF9;&#x8C61;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{ 
  a: 2, 
  b: { 
    bb: 22, 
    bbb: 111 
  } 
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
{ 
  <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>, 
  <span class="hljs-attr">b</span>: { 
    <span class="hljs-attr">bb</span>: <span class="hljs-number">22</span>, 
    <span class="hljs-attr">bbb</span>: <span class="hljs-number">111</span> 
  } 
}
</code></pre><p>4.extend&#xFF1A;&#x5C06;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x548C;&#x5C5E;&#x6027;&#x6269;&#x5C55;&#x5230;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0A;&#xFF0C;&#x5E76;&#x6307;&#x5B9A;&#x4E0A;&#x4E0B;&#x6587;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var utils = require(&apos;./utils&apos;);
var extend = utils.extend;

var context = {
  a: 4,
};
var target = {
  k: &apos;k1&apos;,
  fn(){
    console.log(this.a + 1)
  }
};
var source = {
  k: &apos;k2&apos;,
  fn(){
    console.log(this.a - 1)
  }
};
let extendObj = extend(target, source, context);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./utils&apos;</span>);
<span class="hljs-keyword">var</span> extend = utils.extend;

<span class="hljs-keyword">var</span> context = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">4</span>,
};
<span class="hljs-keyword">var</span> target = {
  <span class="hljs-attr">k</span>: <span class="hljs-string">&apos;k1&apos;</span>,
  fn(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a + <span class="hljs-number">1</span>)
  }
};
<span class="hljs-keyword">var</span> source = {
  <span class="hljs-attr">k</span>: <span class="hljs-string">&apos;k2&apos;</span>,
  fn(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a - <span class="hljs-number">1</span>)
  }
};
<span class="hljs-keyword">let</span> extendObj = extend(target, source, context);
</code></pre><p>extendObj&#x5BF9;&#x8C61;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{
  k: &apos;k2&apos;,
  fn: source.fn.bind(context),
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
{
  <span class="hljs-attr">k</span>: <span class="hljs-string">&apos;k2&apos;</span>,
  <span class="hljs-attr">fn</span>: source.fn.bind(context),
}
</code></pre><p>&#x6267;&#x884C;<code>extendObj.fn()</code>, &#x6253;&#x5370;<code>3</code></p><h3 id="articleHeader5">axios&#x4E3A;&#x4F55;&#x4F1A;&#x6709;&#x591A;&#x79CD;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;</h3><h4>&#x5982;&#x4F55;&#x4F7F;&#x7528;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// &#x9996;&#x5148;&#x5C06;axios&#x5305;&#x5F15;&#x8FDB;&#x6765;
import axios from &apos;axios&apos;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// &#x9996;&#x5148;&#x5C06;axios&#x5305;&#x5F15;&#x8FDB;&#x6765;</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>
</code></pre><p>&#x7B2C;1&#x79CD;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF1A;<code>axios(option)</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
axios({
  url,
  method,
  headers,
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
axios({
  url,
  method,
  headers,
})
</code></pre><p>&#x7B2C;2&#x79CD;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF1A;<code>axios(url[, option])</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
axios(url, {
  method,
  headers,
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
axios(url, {
  method,
  headers,
})
</code></pre><p>&#x7B2C;3&#x79CD;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF08;&#x5BF9;&#x4E8E;<code>get&#x3001;delete</code>&#x7B49;&#x65B9;&#x6CD5;&#xFF09;&#xFF1A;<code>axios[method](url[, option])</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
axios.get(url, {
  headers,
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
axios.get(url, {
  headers,
})
</code></pre><p>&#x7B2C;4&#x79CD;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF08;&#x5BF9;&#x4E8E;<code>post&#x3001;put</code>&#x7B49;&#x65B9;&#x6CD5;&#xFF09;&#xFF1A;<code>axios[method](url[, data[, option]])</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
axios.post(url, data, {
  headers,
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
axios.post(url, data, {
  headers,
})
</code></pre><p>&#x7B2C;5&#x79CD;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF1A;<code>axios.request(option)</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
axios.request({
  url,
  method,
  headers,
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
axios.request({
  url,
  method,
  headers,
})
</code></pre><h4>&#x6E90;&#x7801;&#x5206;&#x6790;</h4><p>&#x4F5C;&#x4E3A;axios&#x9879;&#x76EE;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x4E0B;<code>axios.js</code>&#x7684;&#x6E90;&#x7801;<br>&#x80FD;&#x591F;&#x5B9E;&#x73B0;axios&#x7684;&#x591A;&#x79CD;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x7684;&#x6838;&#x5FC3;&#x662F;<code>createInstance</code>&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/axios.js
function createInstance(defaultConfig) {
  // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;Axios&#x5B9E;&#x4F8B;
  var context = new Axios(defaultConfig);

  // &#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x4E5F;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5B9E;&#x73B0;&#xFF1A;var instance = Axios.prototype.request.bind(context);
  // &#x8FD9;&#x6837;instance&#x5C31;&#x6307;&#x5411;&#x4E86;request&#x65B9;&#x6CD5;&#xFF0C;&#x4E14;&#x4E0A;&#x4E0B;&#x6587;&#x6307;&#x5411;context&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4EE5; instance(option) &#x65B9;&#x5F0F;&#x8C03;&#x7528; 
  // Axios.prototype.request &#x5185;&#x5BF9;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x5224;&#x65AD;&#xFF0C;&#x4F7F;&#x6211;&#x4EEC;&#x80FD;&#x591F;&#x4EE5; instance(url, option) &#x65B9;&#x5F0F;&#x8C03;&#x7528;
  var instance = bind(Axios.prototype.request, context);

  // &#x628A;Axios.prototype&#x4E0A;&#x7684;&#x65B9;&#x6CD5;&#x6269;&#x5C55;&#x5230;instance&#x5BF9;&#x8C61;&#x4E0A;&#xFF0C;
  // &#x8FD9;&#x6837; instance &#x5C31;&#x6709;&#x4E86; get&#x3001;post&#x3001;put&#x7B49;&#x65B9;&#x6CD5;
  // &#x5E76;&#x6307;&#x5B9A;&#x4E0A;&#x4E0B;&#x6587;&#x4E3A;context&#xFF0C;&#x8FD9;&#x6837;&#x6267;&#x884C;Axios&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;this&#x4F1A;&#x6307;&#x5411;context
  utils.extend(instance, Axios.prototype, context);

  // &#x628A;context&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x81EA;&#x8EAB;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x6269;&#x5C55;&#x5230;instance&#x4E0A;
  // &#x6CE8;&#xFF1A;&#x56E0;&#x4E3A;extend&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x7684;forEach&#x65B9;&#x6CD5;&#x5BF9;&#x5BF9;&#x8C61;&#x505A;for in &#x904D;&#x5386;&#x65F6;&#xFF0C;&#x53EA;&#x904D;&#x5386;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x4E0D;&#x4F1A;&#x904D;&#x5386;&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x7684;&#x5C5E;&#x6027;
  // &#x8FD9;&#x6837;&#xFF0C;instance &#x5C31;&#x6709;&#x4E86;  defaults&#x3001;interceptors &#x5C5E;&#x6027;&#x3002;&#xFF08;&#x8FD9;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x540E;&#x9762;&#x6211;&#x4EEC;&#x4F1A;&#x4ECB;&#x7ECD;&#xFF09;
  utils.extend(instance, context);

  return instance;
}

// &#x63A5;&#x6536;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x9879;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF08;&#x540E;&#x9762;&#x4F1A;&#x4ECB;&#x7ECD;&#x914D;&#x7F6E;&#x9879;&#xFF09;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;Axios&#x5B9E;&#x4F8B;&#xFF0C;&#x6700;&#x7EC8;&#x4F1A;&#x88AB;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x5BFC;&#x51FA;
var axios = createInstance(defaults);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/axios.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createInstance</span>(<span class="hljs-params">defaultConfig</span>) </span>{
  <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;Axios&#x5B9E;&#x4F8B;</span>
  <span class="hljs-keyword">var</span> context = <span class="hljs-keyword">new</span> Axios(defaultConfig);

  <span class="hljs-comment">// &#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x4E5F;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5B9E;&#x73B0;&#xFF1A;var instance = Axios.prototype.request.bind(context);</span>
  <span class="hljs-comment">// &#x8FD9;&#x6837;instance&#x5C31;&#x6307;&#x5411;&#x4E86;request&#x65B9;&#x6CD5;&#xFF0C;&#x4E14;&#x4E0A;&#x4E0B;&#x6587;&#x6307;&#x5411;context&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4EE5; instance(option) &#x65B9;&#x5F0F;&#x8C03;&#x7528; </span>
  <span class="hljs-comment">// Axios.prototype.request &#x5185;&#x5BF9;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x5224;&#x65AD;&#xFF0C;&#x4F7F;&#x6211;&#x4EEC;&#x80FD;&#x591F;&#x4EE5; instance(url, option) &#x65B9;&#x5F0F;&#x8C03;&#x7528;</span>
  <span class="hljs-keyword">var</span> instance = bind(Axios.prototype.request, context);

  <span class="hljs-comment">// &#x628A;Axios.prototype&#x4E0A;&#x7684;&#x65B9;&#x6CD5;&#x6269;&#x5C55;&#x5230;instance&#x5BF9;&#x8C61;&#x4E0A;&#xFF0C;</span>
  <span class="hljs-comment">// &#x8FD9;&#x6837; instance &#x5C31;&#x6709;&#x4E86; get&#x3001;post&#x3001;put&#x7B49;&#x65B9;&#x6CD5;</span>
  <span class="hljs-comment">// &#x5E76;&#x6307;&#x5B9A;&#x4E0A;&#x4E0B;&#x6587;&#x4E3A;context&#xFF0C;&#x8FD9;&#x6837;&#x6267;&#x884C;Axios&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;this&#x4F1A;&#x6307;&#x5411;context</span>
  utils.extend(instance, Axios.prototype, context);

  <span class="hljs-comment">// &#x628A;context&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x81EA;&#x8EAB;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x6269;&#x5C55;&#x5230;instance&#x4E0A;</span>
  <span class="hljs-comment">// &#x6CE8;&#xFF1A;&#x56E0;&#x4E3A;extend&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x7684;forEach&#x65B9;&#x6CD5;&#x5BF9;&#x5BF9;&#x8C61;&#x505A;for in &#x904D;&#x5386;&#x65F6;&#xFF0C;&#x53EA;&#x904D;&#x5386;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x4E0D;&#x4F1A;&#x904D;&#x5386;&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x7684;&#x5C5E;&#x6027;</span>
  <span class="hljs-comment">// &#x8FD9;&#x6837;&#xFF0C;instance &#x5C31;&#x6709;&#x4E86;  defaults&#x3001;interceptors &#x5C5E;&#x6027;&#x3002;&#xFF08;&#x8FD9;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x540E;&#x9762;&#x6211;&#x4EEC;&#x4F1A;&#x4ECB;&#x7ECD;&#xFF09;</span>
  utils.extend(instance, context);

  <span class="hljs-keyword">return</span> instance;
}

<span class="hljs-comment">// &#x63A5;&#x6536;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x9879;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF08;&#x540E;&#x9762;&#x4F1A;&#x4ECB;&#x7ECD;&#x914D;&#x7F6E;&#x9879;&#xFF09;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;Axios&#x5B9E;&#x4F8B;&#xFF0C;&#x6700;&#x7EC8;&#x4F1A;&#x88AB;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x5BFC;&#x51FA;</span>
<span class="hljs-keyword">var</span> axios = createInstance(defaults);
</code></pre><p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x770B;&#x4E0A;&#x53BB;&#x5F88;&#x7ED5;&#xFF0C;&#x5176;&#x5B9E;<code>createInstance</code>&#x6700;&#x7EC8;&#x662F;&#x5E0C;&#x671B;&#x62FF;&#x5230;&#x4E00;&#x4E2A;Function&#xFF0C;&#x8FD9;&#x4E2A;Function&#x6307;&#x5411;<code>Axios.prototype.request</code>&#xFF0C;&#x8FD9;&#x4E2A;Function&#x8FD8;&#x4F1A;&#x6709;<code>Axios.prototype</code>&#x4E0A;&#x7684;&#x6BCF;&#x4E2A;&#x65B9;&#x6CD5;&#x4F5C;&#x4E3A;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#xFF0C;&#x4E14;&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x90FD;&#x662F;&#x6307;&#x5411;&#x540C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;</p><p>&#x90A3;&#x4E48;&#x5728;&#x6765;&#x770B;&#x770B;<code>Axios&#x3001;Axios.prototype.request</code>&#x7684;&#x6E90;&#x7801;&#x662F;&#x600E;&#x6837;&#x7684;&#xFF1F;</p><p><code>Axios</code>&#x662F;axios&#x5305;&#x7684;&#x6838;&#x5FC3;&#xFF0C;&#x4E00;&#x4E2A;<code>Axios</code>&#x5B9E;&#x4F8B;&#x5C31;&#x662F;&#x4E00;&#x4E2A;axios&#x5E94;&#x7528;&#xFF0C;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#x90FD;&#x662F;&#x5BF9;<code>Axios</code>&#x5185;&#x5BB9;&#x7684;&#x6269;&#x5C55;<br>&#x800C;<code>Axios</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x6838;&#x5FC3;&#x65B9;&#x6CD5;&#x662F;<code>request</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5404;&#x79CD;axios&#x7684;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#x6700;&#x7EC8;&#x90FD;&#x662F;&#x901A;&#x8FC7;<code>request</code>&#x65B9;&#x6CD5;&#x53D1;&#x8BF7;&#x6C42;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/core/Axios.js
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

Axios.prototype.request = function request(config) {
  // ...&#x7701;&#x7565;&#x4EE3;&#x7801;
};

// &#x4E3A;&#x652F;&#x6301;&#x7684;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#x63D0;&#x4F9B;&#x522B;&#x540D;
utils.forEach([&apos;delete&apos;, &apos;get&apos;, &apos;head&apos;, &apos;options&apos;], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});
utils.forEach([&apos;post&apos;, &apos;put&apos;, &apos;patch&apos;], function forEachMethodWithData(method) {
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/core/Axios.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Axios</span>(<span class="hljs-params">instanceConfig</span>) </span>{
  <span class="hljs-keyword">this</span>.defaults = instanceConfig;
  <span class="hljs-keyword">this</span>.interceptors = {
    <span class="hljs-attr">request</span>: <span class="hljs-keyword">new</span> InterceptorManager(),
    <span class="hljs-attr">response</span>: <span class="hljs-keyword">new</span> InterceptorManager()
  };
}

Axios.prototype.request = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">config</span>) </span>{
  <span class="hljs-comment">// ...&#x7701;&#x7565;&#x4EE3;&#x7801;</span>
};

<span class="hljs-comment">// &#x4E3A;&#x652F;&#x6301;&#x7684;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#x63D0;&#x4F9B;&#x522B;&#x540D;</span>
utils.forEach([<span class="hljs-string">&apos;delete&apos;</span>, <span class="hljs-string">&apos;get&apos;</span>, <span class="hljs-string">&apos;head&apos;</span>, <span class="hljs-string">&apos;options&apos;</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">forEachMethodNoData</span>(<span class="hljs-params">method</span>) </span>{
  Axios.prototype[method] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url, config</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.request(utils.merge(config || {}, {
      <span class="hljs-attr">method</span>: method,
      <span class="hljs-attr">url</span>: url
    }));
  };
});
utils.forEach([<span class="hljs-string">&apos;post&apos;</span>, <span class="hljs-string">&apos;put&apos;</span>, <span class="hljs-string">&apos;patch&apos;</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">forEachMethodWithData</span>(<span class="hljs-params">method</span>) </span>{
  Axios.prototype[method] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url, data, config</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.request(utils.merge(config || {}, {
      <span class="hljs-attr">method</span>: method,
      <span class="hljs-attr">url</span>: url,
      <span class="hljs-attr">data</span>: data
    }));
  };
});
</code></pre><p>&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x4EE5;&#x591A;&#x79CD;&#x65B9;&#x5F0F;&#x53D1;&#x8D77;http&#x8BF7;&#x6C42;&#x4E86;: <code>axios()&#x3001;axios.get()&#x3001;axios.post()</code></p><p>&#x4E00;&#x822C;&#x60C5;&#x51B5;&#xFF0C;&#x9879;&#x76EE;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x5BFC;&#x51FA;&#x7684;axios&#x5B9E;&#x4F8B;&#x5C31;&#x53EF;&#x4EE5;&#x6EE1;&#x8DB3;&#x9700;&#x6C42;&#x4E86;&#xFF0C;<br>&#x5982;&#x679C;&#x4E0D;&#x6EE1;&#x8DB3;&#x9700;&#x6C42;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x65B0;&#x7684;axios&#x5B9E;&#x4F8B;&#xFF0C;axios&#x5305;&#x4E5F;&#x9884;&#x7559;&#x4E86;&#x63A5;&#x53E3;&#xFF0C;<br>&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/axios.js  -  31&#x884C;
axios.Axios = Axios;
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/axios.js  -  31&#x884C;</span>
axios.Axios = Axios;
axios.create = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>(<span class="hljs-params">instanceConfig</span>) </span>{
  <span class="hljs-keyword">return</span> createInstance(utils.merge(defaults, instanceConfig));
};
</code></pre><p>&#x8BF4;&#x5B8C;axios&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x6709;&#x8FD9;&#x4E48;&#x591A;&#x79CD;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF0C;&#x53EF;&#x80FD;&#x4F60;&#x5FC3;&#x4E2D;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x7591;&#x95EE;&#xFF1A;<br>&#x4F7F;&#x7528;axios&#x65F6;&#xFF0C;&#x65E0;&#x8BBA;<code>get</code>&#x65B9;&#x6CD5;&#x8FD8;&#x662F;<code>post</code>&#x65B9;&#x6CD5;&#xFF0C;&#x6700;&#x7EC8;&#x90FD;&#x662F;&#x8C03;&#x7528;&#x7684;<code>Axios.prototype.request</code>&#x65B9;&#x6CD5;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x662F;&#x600E;&#x4E48;&#x6839;&#x636E;&#x6211;&#x4EEC;&#x7684;config&#x914D;&#x7F6E;&#x53D1;&#x8BF7;&#x6C42;&#x7684;&#x5462;&#xFF1F;</p><p>&#x5728;&#x5F00;&#x59CB;&#x8BF4;<code>Axios.prototype.request</code>&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x634B;&#x4E00;&#x634B;&#x5728;axios&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x7528;&#x6237;&#x914D;&#x7F6E;&#x7684;config&#x662F;&#x600E;&#x4E48;&#x8D77;&#x4F5C;&#x7528;&#x7684;&#xFF1F;</p><h3 id="articleHeader6">&#x7528;&#x6237;&#x914D;&#x7F6E;&#x7684;config&#x662F;&#x600E;&#x4E48;&#x8D77;&#x4F5C;&#x7528;&#x7684;</h3><p>&#x8FD9;&#x91CC;&#x8BF4;&#x7684;<code>config</code>&#xFF0C;&#x6307;&#x7684;&#x662F;&#x8D2F;&#x7A7F;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x914D;&#x7F6E;&#x9879;&#x5BF9;&#x8C61;&#xFF0C;<br>&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#xFF1A;</p><p>`http&#x8BF7;&#x6C42;&#x9002;&#x914D;&#x5668;&#x3001;&#x8BF7;&#x6C42;&#x5730;&#x5740;&#x3001;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#x3001;&#x8BF7;&#x6C42;&#x5934;header&#x3001;<br>&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x3001;&#x8BF7;&#x6C42;&#x6216;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x7684;&#x8F6C;&#x6362;&#x3001;&#x8BF7;&#x6C42;&#x8FDB;&#x5EA6;&#x3001;http&#x72B6;&#x6001;&#x7801;&#x9A8C;&#x8BC1;&#x89C4;&#x5219;&#x3001;&#x8D85;&#x65F6;&#x3001;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x7B49;`</p><p>&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#xFF0C;&#x51E0;&#x4E4E;<code>axios</code>&#x6240;&#x6709;&#x7684;&#x529F;&#x80FD;&#x90FD;&#x662F;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#x548C;&#x4F20;&#x9012;&#x7684;&#xFF0C;<br>&#x65E2;&#x662F;<code>axios</code>&#x9879;&#x76EE;&#x5185;&#x90E8;&#x7684;&#x6C9F;&#x901A;&#x6865;&#x6881;&#xFF0C;&#x4E5F;&#x662F;&#x7528;&#x6237;&#x8DDF;<code>axios</code>&#x8FDB;&#x884C;&#x6C9F;&#x901A;&#x7684;&#x6865;&#x6881;&#x3002;</p><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x770B;&#x770B;&#xFF0C;&#x7528;&#x6237;&#x80FD;&#x4EE5;&#x4EC0;&#x4E48;&#x65B9;&#x5F0F;&#x5B9A;&#x4E49;&#x914D;&#x7F6E;&#x9879;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import axios from &apos;axios&apos;

// &#x7B2C;1&#x79CD;&#xFF1A;&#x76F4;&#x63A5;&#x4FEE;&#x6539;Axios&#x5B9E;&#x4F8B;&#x4E0A;defaults&#x5C5E;&#x6027;&#xFF0C;&#x4E3B;&#x8981;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x901A;&#x7528;&#x914D;&#x7F6E;
axios.defaults[configName] = value;

// &#x7B2C;2&#x79CD;&#xFF1A;&#x53D1;&#x8D77;&#x8BF7;&#x6C42;&#x65F6;&#x6700;&#x7EC8;&#x4F1A;&#x8C03;&#x7528;Axios.prototype.request&#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x4F20;&#x5165;&#x914D;&#x7F6E;&#x9879;&#xFF0C;&#x4E3B;&#x8981;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x201C;&#x4E2A;&#x4F8B;&#x201D;&#x914D;&#x7F6E;
axios({
  url,
  method,
  headers,
})

// &#x7B2C;3&#x79CD;&#xFF1A;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;Axios&#x5B9E;&#x4F8B;&#xFF0C;&#x4F20;&#x5165;&#x914D;&#x7F6E;&#x9879;&#xFF0C;&#x6B64;&#x5904;&#x8BBE;&#x7F6E;&#x7684;&#x662F;&#x901A;&#x7528;&#x914D;&#x7F6E;
let newAxiosInstance = axios.create({
  [configName]: value,
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>

<span class="hljs-comment">// &#x7B2C;1&#x79CD;&#xFF1A;&#x76F4;&#x63A5;&#x4FEE;&#x6539;Axios&#x5B9E;&#x4F8B;&#x4E0A;defaults&#x5C5E;&#x6027;&#xFF0C;&#x4E3B;&#x8981;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x901A;&#x7528;&#x914D;&#x7F6E;</span>
axios.defaults[configName] = value;

<span class="hljs-comment">// &#x7B2C;2&#x79CD;&#xFF1A;&#x53D1;&#x8D77;&#x8BF7;&#x6C42;&#x65F6;&#x6700;&#x7EC8;&#x4F1A;&#x8C03;&#x7528;Axios.prototype.request&#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x4F20;&#x5165;&#x914D;&#x7F6E;&#x9879;&#xFF0C;&#x4E3B;&#x8981;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x201C;&#x4E2A;&#x4F8B;&#x201D;&#x914D;&#x7F6E;</span>
axios({
  url,
  method,
  headers,
})

<span class="hljs-comment">// &#x7B2C;3&#x79CD;&#xFF1A;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;Axios&#x5B9E;&#x4F8B;&#xFF0C;&#x4F20;&#x5165;&#x914D;&#x7F6E;&#x9879;&#xFF0C;&#x6B64;&#x5904;&#x8BBE;&#x7F6E;&#x7684;&#x662F;&#x901A;&#x7528;&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">let</span> newAxiosInstance = axios.create({
  [configName]: value,
})
</code></pre><p>&#x770B;&#x4E0B; <code>Axios.prototype.request</code> &#x65B9;&#x6CD5;&#x91CC;&#x7684;&#x4E00;&#x884C;&#x4EE3;&#x7801;: (<code>/lib/core/Axios.js</code> - &#x7B2C;35&#x884C;)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
config = utils.merge(defaults, {method: &apos;get&apos;}, this.defaults, config);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
config = utils.merge(defaults, {<span class="hljs-attr">method</span>: <span class="hljs-string">&apos;get&apos;</span>}, <span class="hljs-keyword">this</span>.defaults, config);
</code></pre><p>&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x6B64;&#x5904;&#x5C06;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;<code>defaults</code>&#xFF08;<code>/lib/defaults.js</code>&#xFF09;&#x3001;Axios&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;<code>this.defaults</code>&#x3001;<code>request</code>&#x8BF7;&#x6C42;&#x7684;&#x53C2;&#x6570;<code>config</code>&#x8FDB;&#x884C;&#x4E86;&#x5408;&#x5E76;&#x3002;</p><p>&#x7531;&#x6B64;&#x5F97;&#x51FA;&#xFF0C;&#x591A;&#x5904;&#x914D;&#x7F6E;&#x7684;&#x4F18;&#x5148;&#x7EA7;&#x7531;&#x4F4E;&#x5230;&#x9AD8;&#x662F;&#xFF1A;<br>&#x2014;&gt; &#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;<code>defaults</code>&#xFF08;<code>/lib/defaults.js</code>)<br>&#x2014;&gt; { method: &apos;get&apos; }<br>&#x2014;&gt; Axios&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;<code>this.defaults</code><br>&#x2014;&gt; <code>request</code>&#x8BF7;&#x6C42;&#x7684;&#x53C2;&#x6570;<code>config</code></p><p>&#x7559;&#x7ED9;&#x5927;&#x5BB6;&#x601D;&#x8003;&#x4E00;&#x4E2A;&#x95EE;&#x9898;: <code>defaults</code> &#x548C; <code>this.defaults</code> &#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x914D;&#x7F6E;&#x662F;&#x76F8;&#x540C;&#x7684;&#xFF0C;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x662F;&#x4E0D;&#x540C;&#x7684;&#xFF1F;</p><p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5F97;&#x5230;&#x4E86;&#x5C06;&#x591A;&#x5904;<code>merge</code>&#x540E;&#x7684;<code>config</code>&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x53C8;&#x662F;&#x600E;&#x6837;&#x4F20;&#x9012;&#x7684;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
Axios.prototype.request = function request(config) {
  // ...
  config = utils.merge(defaults, {method: &apos;get&apos;}, this.defaults, config);

  var chain = [dispatchRequest, undefined];
  // &#x5C06;config&#x5BF9;&#x8C61;&#x5F53;&#x4F5C;&#x53C2;&#x6570;&#x4F20;&#x7ED9;Primise.resolve&#x65B9;&#x6CD5;
  var promise = Promise.resolve(config);

  // ...&#x7701;&#x7565;&#x4EE3;&#x7801;
  
  while (chain.length) {
    // config&#x4F1A;&#x6309;&#x5E8F;&#x901A;&#x8FC7; &#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668; - dispatchRequest&#x65B9;&#x6CD5; - &#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;
    // &#x5173;&#x4E8E;&#x62E6;&#x622A;&#x5668; &#x548C; dispatchRequest&#x65B9;&#x6CD5;&#xFF0C;&#x4E0B;&#x9762;&#x4F1A;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x4E13;&#x95E8;&#x7684;&#x5C0F;&#x8282;&#x6765;&#x4ECB;&#x7ECD;&#x3002;
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
Axios.prototype.request = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">config</span>) </span>{
  <span class="hljs-comment">// ...</span>
  config = utils.merge(defaults, {<span class="hljs-attr">method</span>: <span class="hljs-string">&apos;get&apos;</span>}, <span class="hljs-keyword">this</span>.defaults, config);

  <span class="hljs-keyword">var</span> chain = [dispatchRequest, <span class="hljs-literal">undefined</span>];
  <span class="hljs-comment">// &#x5C06;config&#x5BF9;&#x8C61;&#x5F53;&#x4F5C;&#x53C2;&#x6570;&#x4F20;&#x7ED9;Primise.resolve&#x65B9;&#x6CD5;</span>
  <span class="hljs-keyword">var</span> promise = <span class="hljs-built_in">Promise</span>.resolve(config);

  <span class="hljs-comment">// ...&#x7701;&#x7565;&#x4EE3;&#x7801;</span>
  
  <span class="hljs-keyword">while</span> (chain.length) {
    <span class="hljs-comment">// config&#x4F1A;&#x6309;&#x5E8F;&#x901A;&#x8FC7; &#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668; - dispatchRequest&#x65B9;&#x6CD5; - &#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;</span>
    <span class="hljs-comment">// &#x5173;&#x4E8E;&#x62E6;&#x622A;&#x5668; &#x548C; dispatchRequest&#x65B9;&#x6CD5;&#xFF0C;&#x4E0B;&#x9762;&#x4F1A;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x4E13;&#x95E8;&#x7684;&#x5C0F;&#x8282;&#x6765;&#x4ECB;&#x7ECD;&#x3002;</span>
    promise = promise.then(chain.shift(), chain.shift());
  }

  <span class="hljs-keyword">return</span> promise;
};
</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;<code>config</code>&#x8D70;&#x5B8C;&#x4E86;&#x5B83;&#x4F20;&#x5947;&#x7684;&#x4E00;&#x751F; <code>-_-</code><br>&#x4E0B;&#x4E00;&#x8282;&#x5C31;&#x8981;&#x8BF4;&#x5230;&#x91CD;&#x5934;&#x620F;&#x4E86;: <code>Axios.prototype.request</code></p><h3 id="articleHeader7">axios.prototype.request</h3><p>&#x8FD9;&#x91CC;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#xFF0C;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x8FFD;&#x6839;&#x6EAF;&#x6E90;&#x624D;&#x80FD;&#x641E;&#x6E05;&#x695A;&#xFF0C;<br>&#x6240;&#x4EE5;&#x53EA;&#x9700;&#x5BF9;chain&#x6570;&#x7EC4;&#x6709;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4E86;&#x89E3;&#x5C31;&#x597D;&#xFF0C;&#x6D89;&#x53CA;&#x5230;&#x7684;<a href="#%E5%A6%82%E4%BD%95%E6%8B%A6%E6%88%AA%E8%AF%B7%E6%B1%82%E5%93%8D%E5%BA%94%E5%B9%B6%E4%BF%AE%E6%94%B9%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0%E4%BF%AE%E6%94%B9%E5%93%8D%E5%BA%94%E6%95%B0%E6%8D%AE">&#x62E6;&#x622A;&#x5668;</a>&#x3001;[<code>dispatchRequest</code>]&#x540E;&#x9762;&#x90FD;&#x4F1A;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;</p><p><code>chain</code>&#x6570;&#x7EC4;&#x662F;&#x7528;&#x6765;&#x76DB;&#x653E;&#x62E6;&#x622A;&#x5668;&#x65B9;&#x6CD5;&#x548C;<code>dispatchRequest</code>&#x65B9;&#x6CD5;&#x7684;&#xFF0C;<br>&#x901A;&#x8FC7;promise&#x4ECE;<code>chain</code>&#x6570;&#x7EC4;&#x91CC;&#x6309;&#x5E8F;&#x53D6;&#x51FA;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x9010;&#x4E00;&#x6267;&#x884C;&#xFF0C;&#x6700;&#x540E;&#x5C06;&#x5904;&#x7406;&#x540E;&#x7684;&#x65B0;&#x7684;promise&#x5728;<code>Axios.prototype.request</code>&#x65B9;&#x6CD5;&#x91CC;&#x8FD4;&#x56DE;&#x51FA;&#x53BB;&#xFF0C;<br>&#x5E76;&#x5C06;response&#x6216;error&#x4F20;&#x9001;&#x51FA;&#x53BB;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;<code>Axios.prototype.request</code>&#x7684;&#x4F7F;&#x547D;&#x4E86;&#x3002;</p><p>&#x67E5;&#x770B;&#x6E90;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/core/Axios.js
Axios.prototype.request = function request(config) {
  // ...
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/core/Axios.js</span>
Axios.prototype.request = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">config</span>) </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">var</span> chain = [dispatchRequest, <span class="hljs-literal">undefined</span>];
  <span class="hljs-keyword">var</span> promise = <span class="hljs-built_in">Promise</span>.resolve(config);

  <span class="hljs-keyword">this</span>.interceptors.request.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unshiftRequestInterceptors</span>(<span class="hljs-params">interceptor</span>) </span>{
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  <span class="hljs-keyword">this</span>.interceptors.response.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pushResponseInterceptors</span>(<span class="hljs-params">interceptor</span>) </span>{
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  <span class="hljs-keyword">while</span> (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  <span class="hljs-keyword">return</span> promise;
};
</code></pre><p>&#x6B64;&#x65F6;&#xFF0C;&#x4F60;&#x4E00;&#x5B9A;&#x5BF9;&#x62E6;&#x622A;&#x5668;&#x5145;&#x6EE1;&#x4E86;&#x597D;&#x5947;&#xFF0C;&#x8FD9;&#x4E2A;&#x62E6;&#x622A;&#x5668;&#x5230;&#x5E95;&#x662F;&#x4E2A;&#x4EC0;&#x4E48;&#x5BB6;&#x4F19;&#xFF0C;&#x4E0B;&#x4E00;&#x8282;&#x5C31;&#x8BA9;&#x6211;&#x4EEC;&#x4E00;&#x63A2;&#x7A76;&#x7ADF;&#x5427;</p><h3 id="articleHeader8">&#x5982;&#x4F55;&#x62E6;&#x622A;&#x8BF7;&#x6C42;&#x54CD;&#x5E94;&#x5E76;&#x4FEE;&#x6539;&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#x4FEE;&#x6539;&#x54CD;&#x5E94;&#x6570;&#x636E;</h3><h4>&#x5982;&#x4F55;&#x4F7F;&#x7528;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// &#x6DFB;&#x52A0;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;
const myRequestInterceptor = axios.interceptors.request.use(config =&gt; {
    // &#x5728;&#x53D1;&#x9001;http&#x8BF7;&#x6C42;&#x4E4B;&#x524D;&#x505A;&#x4E9B;&#x4EC0;&#x4E48;
    return config; // &#x6709;&#x4E14;&#x5FC5;&#x987B;&#x6709;&#x4E00;&#x4E2A;config&#x5BF9;&#x8C61;&#x88AB;&#x8FD4;&#x56DE;
}, error =&gt; {
    // &#x5BF9;&#x8BF7;&#x6C42;&#x9519;&#x8BEF;&#x505A;&#x4E9B;&#x4EC0;&#x4E48;
    return Promise.reject(error);
});

// &#x6DFB;&#x52A0;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;
axios.interceptors.response.use(response =&gt; {
  // &#x5BF9;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x505A;&#x70B9;&#x4EC0;&#x4E48;
  return response; // &#x6709;&#x4E14;&#x5FC5;&#x987B;&#x6709;&#x4E00;&#x4E2A;response&#x5BF9;&#x8C61;&#x88AB;&#x8FD4;&#x56DE;
}, error =&gt; {
  // &#x5BF9;&#x54CD;&#x5E94;&#x9519;&#x8BEF;&#x505A;&#x70B9;&#x4EC0;&#x4E48;
  return Promise.reject(error);
});

// &#x79FB;&#x9664;&#x67D0;&#x6B21;&#x62E6;&#x622A;&#x5668;
axios.interceptors.request.eject(myRequestInterceptor);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// &#x6DFB;&#x52A0;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;</span>
<span class="hljs-keyword">const</span> myRequestInterceptor = axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
    <span class="hljs-comment">// &#x5728;&#x53D1;&#x9001;http&#x8BF7;&#x6C42;&#x4E4B;&#x524D;&#x505A;&#x4E9B;&#x4EC0;&#x4E48;</span>
    <span class="hljs-keyword">return</span> config; <span class="hljs-comment">// &#x6709;&#x4E14;&#x5FC5;&#x987B;&#x6709;&#x4E00;&#x4E2A;config&#x5BF9;&#x8C61;&#x88AB;&#x8FD4;&#x56DE;</span>
}, error =&gt; {
    <span class="hljs-comment">// &#x5BF9;&#x8BF7;&#x6C42;&#x9519;&#x8BEF;&#x505A;&#x4E9B;&#x4EC0;&#x4E48;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
});

<span class="hljs-comment">// &#x6DFB;&#x52A0;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;</span>
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
  <span class="hljs-comment">// &#x5BF9;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x505A;&#x70B9;&#x4EC0;&#x4E48;</span>
  <span class="hljs-keyword">return</span> response; <span class="hljs-comment">// &#x6709;&#x4E14;&#x5FC5;&#x987B;&#x6709;&#x4E00;&#x4E2A;response&#x5BF9;&#x8C61;&#x88AB;&#x8FD4;&#x56DE;</span>
}, error =&gt; {
  <span class="hljs-comment">// &#x5BF9;&#x54CD;&#x5E94;&#x9519;&#x8BEF;&#x505A;&#x70B9;&#x4EC0;&#x4E48;</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
});

<span class="hljs-comment">// &#x79FB;&#x9664;&#x67D0;&#x6B21;&#x62E6;&#x622A;&#x5668;</span>
axios.interceptors.request.eject(myRequestInterceptor);
</code></pre><h4>&#x601D;&#x8003;</h4><ol><li>&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x76F4;&#x63A5; return error&#xFF1F;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
axios.interceptors.request.use(config =&gt; config, error =&gt; {
  // &#x662F;&#x5426;&#x53EF;&#x4EE5;&#x76F4;&#x63A5; return error &#xFF1F;
  return Promise.reject(error); 
});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> config, error =&gt; {
  <span class="hljs-comment">// &#x662F;&#x5426;&#x53EF;&#x4EE5;&#x76F4;&#x63A5; return error &#xFF1F;</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error); 
});
</code></pre><ol><li>&#x5982;&#x4F55;&#x5B9E;&#x73B0;promise&#x7684;&#x94FE;&#x5F0F;&#x8C03;&#x7528;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
new People(&apos;whr&apos;).sleep(3000).eat(&apos;apple&apos;).sleep(5000).eat(&apos;durian&apos;);

// &#x6253;&#x5370;&#x7ED3;&#x679C;
// (&#x7B49;&#x5F85;3s)--&gt; &apos;whr eat apple&apos; -(&#x7B49;&#x5F85;5s)--&gt; &apos;whr eat durian&apos;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">new</span> People(<span class="hljs-string">&apos;whr&apos;</span>).sleep(<span class="hljs-number">3000</span>).eat(<span class="hljs-string">&apos;apple&apos;</span>).sleep(<span class="hljs-number">5000</span>).eat(<span class="hljs-string">&apos;durian&apos;</span>);

<span class="hljs-comment">// &#x6253;&#x5370;&#x7ED3;&#x679C;</span>
<span class="hljs-comment">// (&#x7B49;&#x5F85;3s)--&gt; &apos;whr eat apple&apos; -(&#x7B49;&#x5F85;5s)--&gt; &apos;whr eat durian&apos;</span>
</code></pre><h4>&#x6E90;&#x7801;&#x5206;&#x6790;</h4><p>&#x5173;&#x4E8E;&#x62E6;&#x622A;&#x5668;&#xFF0C;<a href="#%E5%90%8D%E8%AF%8D%E8%A7%A3%E9%87%8A">&#x540D;&#x8BCD;&#x89E3;&#x91CA;</a>&#x4E00;&#x8282;&#x5DF2;&#x7ECF;&#x505A;&#x8FC7;&#x7B80;&#x5355;&#x8BF4;&#x660E;&#x3002;</p><p>&#x6BCF;&#x4E2A;axios&#x5B9E;&#x4F8B;&#x90FD;&#x6709;&#x4E00;&#x4E2A;<code>interceptors</code>&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#xFF0C;<br><code>interceptors</code>&#x5BF9;&#x8C61;&#x4E0A;&#x6709;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;<code>request</code>&#x3001;<code>response</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function Axios(instanceConfig) {
  // ...
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Axios</span>(<span class="hljs-params">instanceConfig</span>) </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">this</span>.interceptors = {
    <span class="hljs-attr">request</span>: <span class="hljs-keyword">new</span> InterceptorManager(),
    <span class="hljs-attr">response</span>: <span class="hljs-keyword">new</span> InterceptorManager()
  };
}
</code></pre><p>&#x8FD9;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x90FD;&#x662F;&#x4E00;&#x4E2A;<code>InterceptorManager</code>&#x5B9E;&#x4F8B;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;<code>InterceptorManager</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x7528;&#x6765;&#x7BA1;&#x7406;&#x62E6;&#x622A;&#x5668;&#x7684;&#x3002;</p><p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x770B;<code>InterceptorManager</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF1A;</p><p><code>InterceptorManager</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x7528;&#x6765;&#x5B9E;&#x73B0;&#x62E6;&#x622A;&#x5668;&#x7684;&#xFF0C;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x539F;&#x578B;&#x4E0A;&#x6709;3&#x4E2A;&#x65B9;&#x6CD5;&#xFF1A;use&#x3001;eject&#x3001;forEach&#x3002;<br>&#x5173;&#x4E8E;&#x6E90;&#x7801;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#x7684;&#xFF0C;&#x90FD;&#x662F;&#x7528;&#x6765;&#x64CD;&#x4F5C;&#x8BE5;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;handlers&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/core/InterceptorManager.js

function InterceptorManager() {
  this.handlers = []; // &#x5B58;&#x653E;&#x62E6;&#x622A;&#x5668;&#x65B9;&#x6CD5;&#xFF0C;&#x6570;&#x7EC4;&#x5185;&#x6BCF;&#x4E00;&#x9879;&#x90FD;&#x662F;&#x6709;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x5206;&#x522B;&#x5BF9;&#x5E94;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x540E;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#x3002;
}

// &#x5F80;&#x62E6;&#x622A;&#x5668;&#x91CC;&#x6DFB;&#x52A0;&#x62E6;&#x622A;&#x65B9;&#x6CD5;
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

// &#x7528;&#x6765;&#x6CE8;&#x9500;&#x6307;&#x5B9A;&#x7684;&#x62E6;&#x622A;&#x5668;
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

// &#x904D;&#x5386;this.handlers&#xFF0C;&#x5E76;&#x5C06;this.handlers&#x91CC;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x7ED9;fn&#x6267;&#x884C;
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/core/InterceptorManager.js</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">InterceptorManager</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.handlers = []; <span class="hljs-comment">// &#x5B58;&#x653E;&#x62E6;&#x622A;&#x5668;&#x65B9;&#x6CD5;&#xFF0C;&#x6570;&#x7EC4;&#x5185;&#x6BCF;&#x4E00;&#x9879;&#x90FD;&#x662F;&#x6709;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x5206;&#x522B;&#x5BF9;&#x5E94;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x540E;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#x3002;</span>
}

<span class="hljs-comment">// &#x5F80;&#x62E6;&#x622A;&#x5668;&#x91CC;&#x6DFB;&#x52A0;&#x62E6;&#x622A;&#x65B9;&#x6CD5;</span>
InterceptorManager.prototype.use = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">use</span>(<span class="hljs-params">fulfilled, rejected</span>) </span>{
  <span class="hljs-keyword">this</span>.handlers.push({
    <span class="hljs-attr">fulfilled</span>: fulfilled,
    <span class="hljs-attr">rejected</span>: rejected
  });
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.handlers.length - <span class="hljs-number">1</span>;
};

<span class="hljs-comment">// &#x7528;&#x6765;&#x6CE8;&#x9500;&#x6307;&#x5B9A;&#x7684;&#x62E6;&#x622A;&#x5668;</span>
InterceptorManager.prototype.eject = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eject</span>(<span class="hljs-params">id</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.handlers[id]) {
    <span class="hljs-keyword">this</span>.handlers[id] = <span class="hljs-literal">null</span>;
  }
};

<span class="hljs-comment">// &#x904D;&#x5386;this.handlers&#xFF0C;&#x5E76;&#x5C06;this.handlers&#x91CC;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x7ED9;fn&#x6267;&#x884C;</span>
InterceptorManager.prototype.forEach = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">forEach</span>(<span class="hljs-params">fn</span>) </span>{
  utils.forEach(<span class="hljs-keyword">this</span>.handlers, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">forEachHandler</span>(<span class="hljs-params">h</span>) </span>{
    <span class="hljs-keyword">if</span> (h !== <span class="hljs-literal">null</span>) {
      fn(h);
    }
  });
};

</code></pre><p>&#x90A3;&#x4E48;&#x5F53;&#x6211;&#x4EEC;&#x901A;&#x8FC7;<code>axios.interceptors.request.use</code>&#x6DFB;&#x52A0;&#x62E6;&#x622A;&#x5668;&#x540E;&#xFF0C;<br>axios&#x5185;&#x90E8;&#x53C8;&#x662F;&#x600E;&#x4E48;&#x8BA9;&#x8FD9;&#x4E9B;&#x62E6;&#x622A;&#x5668;&#x80FD;&#x591F;&#x5728;&#x8BF7;&#x6C42;&#x524D;&#x3001;&#x8BF7;&#x6C42;&#x540E;&#x62FF;&#x5230;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x6570;&#x636E;&#x7684;&#x5462;&#xFF1F;</p><p>&#x5148;&#x770B;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/core/Axios.js
Axios.prototype.request = function request(config) {
  // ...
  var chain = [dispatchRequest, undefined];

  // &#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A;promise&#x5BF9;&#x8C61;&#xFF0C;&#x72B6;&#x6001;&#x5FAE;resolved&#xFF0C;&#x63A5;&#x6536;&#x5230;&#x7684;&#x53C2;&#x6570;&#x5FAE;config&#x5BF9;&#x8C61;
  var promise = Promise.resolve(config);

  // &#x6CE8;&#x610F;&#xFF1A;interceptor.fulfilled &#x6216; interceptor.rejected &#x662F;&#x53EF;&#x80FD;&#x4E3A;undefined
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  // &#x6DFB;&#x52A0;&#x4E86;&#x62E6;&#x622A;&#x5668;&#x540E;&#x7684;chain&#x6570;&#x7EC4;&#x5927;&#x6982;&#x4F1A;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;
  // [
  //   requestFulfilledFn, requestRejectedFn, ..., 
  //   dispatchRequest, undefined,
  //   responseFulfilledFn, responseRejectedFn, ....,
  // ]

  // &#x53EA;&#x8981;chain&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x4E0D;&#x4E3A;0&#xFF0C;&#x5C31;&#x4E00;&#x76F4;&#x6267;&#x884C;while&#x5FAA;&#x73AF;
  while (chain.length) {
    // &#x6570;&#x7EC4;&#x7684; shift() &#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x628A;&#x6570;&#x7EC4;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4ECE;&#x5176;&#x4E2D;&#x5220;&#x9664;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x503C;&#x3002;
    // &#x6BCF;&#x6B21;&#x6267;&#x884C;while&#x5FAA;&#x73AF;&#xFF0C;&#x4ECE;chain&#x6570;&#x7EC4;&#x91CC;&#x6309;&#x5E8F;&#x53D6;&#x51FA;&#x4E24;&#x9879;&#xFF0C;&#x5E76;&#x5206;&#x522B;&#x4F5C;&#x4E3A;promise.then&#x65B9;&#x6CD5;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x548C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;

    // &#x6309;&#x7167;&#x6211;&#x4EEC;&#x4F7F;&#x7528;InterceptorManager.prototype.use&#x6DFB;&#x52A0;&#x62E6;&#x622A;&#x5668;&#x7684;&#x89C4;&#x5219;&#xFF0C;&#x6B63;&#x597D;&#x6BCF;&#x6B21;&#x6DFB;&#x52A0;&#x7684;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x901A;&#x8FC7;InterceptorManager.prototype.use&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x7684;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x56DE;&#x8C03;

    // &#x901A;&#x8FC7;InterceptorManager.prototype.use&#x5F80;&#x62E6;&#x622A;&#x5668;&#x6570;&#x7EC4;&#x91CC;&#x6DFB;&#x52A0;&#x62E6;&#x622A;&#x5668;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x6570;&#x7EC4;&#x7684;push&#x65B9;&#x6CD5;&#xFF0C;
    // &#x5BF9;&#x4E8E;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x4ECE;&#x62E6;&#x622A;&#x5668;&#x6570;&#x7EC4;&#x6309;&#x5E8F;&#x8BFB;&#x5230;&#x540E;&#x662F;&#x901A;&#x8FC7;unshift&#x65B9;&#x6CD5;&#x5F80;chain&#x6570;&#x7EC4;&#x6570;&#x91CC;&#x6DFB;&#x52A0;&#x7684;&#xFF0C;&#x53C8;&#x901A;&#x8FC7;shift&#x65B9;&#x6CD5;&#x4ECE;chain&#x6570;&#x7EC4;&#x91CC;&#x53D6;&#x51FA;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5F97;&#x51FA;&#x7ED3;&#x8BBA;&#xFF1A;&#x5BF9;&#x4E8E;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x5148;&#x6DFB;&#x52A0;&#x7684;&#x62E6;&#x622A;&#x5668;&#x4F1A;&#x540E;&#x6267;&#x884C;
    // &#x5BF9;&#x4E8E;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x4ECE;&#x62E6;&#x622A;&#x5668;&#x6570;&#x7EC4;&#x6309;&#x5E8F;&#x8BFB;&#x5230;&#x540E;&#x662F;&#x901A;&#x8FC7;push&#x65B9;&#x6CD5;&#x5F80;chain&#x6570;&#x7EC4;&#x91CC;&#x6DFB;&#x52A0;&#x7684;&#xFF0C;&#x53C8;&#x901A;&#x8FC7;shift&#x65B9;&#x6CD5;&#x4ECE;chain&#x6570;&#x7EC4;&#x91CC;&#x53D6;&#x51FA;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5F97;&#x51FA;&#x7ED3;&#x8BBA;&#xFF1A;&#x5BF9;&#x4E8E;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x6DFB;&#x52A0;&#x7684;&#x62E6;&#x622A;&#x5668;&#x5148;&#x6267;&#x884C;

    // &#x7B2C;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#x7684;fulfilled&#x51FD;&#x6570;&#x4F1A;&#x63A5;&#x6536;&#x5230;promise&#x5BF9;&#x8C61;&#x521D;&#x59CB;&#x5316;&#x65F6;&#x4F20;&#x5165;&#x7684;config&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#x53C8;&#x89C4;&#x5B9A;&#x7528;&#x6237;&#x5199;&#x7684;fulfilled&#x51FD;&#x6570;&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;config&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x901A;&#x8FC7;promise&#x5B9E;&#x73B0;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x6BCF;&#x4E2A;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#x7684;fulfilled&#x51FD;&#x6570;&#x90FD;&#x4F1A;&#x63A5;&#x6536;&#x5230;&#x4E00;&#x4E2A;config&#x5BF9;&#x8C61;

    // &#x7B2C;&#x4E00;&#x4E2A;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#x7684;fulfilled&#x51FD;&#x6570;&#x4F1A;&#x63A5;&#x53D7;&#x5230;dispatchRequest&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#xFF09;&#x8BF7;&#x6C42;&#x5230;&#x7684;&#x6570;&#x636E;&#xFF08;&#x4E5F;&#x5C31;&#x662F;response&#x5BF9;&#x8C61;&#xFF09;,&#x800C;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#x53C8;&#x89C4;&#x5B9A;&#x7528;&#x6237;&#x5199;&#x7684;fulfilled&#x51FD;&#x6570;&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;response&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x901A;&#x8FC7;promise&#x5B9E;&#x73B0;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x6BCF;&#x4E2A;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#x7684;fulfilled&#x51FD;&#x6570;&#x90FD;&#x4F1A;&#x63A5;&#x6536;&#x5230;&#x4E00;&#x4E2A;response&#x5BF9;&#x8C61;

    // &#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x62E6;&#x622A;&#x5668;&#x7684;&#x629B;&#x51FA;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x90FD;&#x4F1A;&#x88AB;&#x4E0B;&#x4E00;&#x4E2A;&#x62E6;&#x622A;&#x5668;&#x7684;rejected&#x51FD;&#x6570;&#x6536;&#x5230;&#xFF0C;&#x6240;&#x4EE5;dispatchRequest&#x629B;&#x51FA;&#x7684;&#x9519;&#x8BEF;&#x624D;&#x4F1A;&#x88AB;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#x63A5;&#x6536;&#x5230;&#x3002;

    // &#x56E0;&#x4E3A;axios&#x662F;&#x901A;&#x8FC7;promise&#x5B9E;&#x73B0;&#x7684;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x62E6;&#x622A;&#x5668;&#x91CC;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x800C;&#x62E6;&#x622A;&#x5668;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x8FD8;&#x662F;&#x4F1A;&#x6309;&#x7167;&#x6211;&#x4EEC;&#x4E0A;&#x9762;&#x8BF4;&#x7684;&#x987A;&#x5E8F;&#x6267;&#x884C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F; dispatchRequest &#x65B9;&#x6CD5;&#x4E00;&#x5B9A;&#x4F1A;&#x7B49;&#x5F85;&#x6240;&#x6709;&#x7684;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#x6267;&#x884C;&#x5B8C;&#x540E;&#x518D;&#x5F00;&#x59CB;&#x6267;&#x884C;&#xFF0C;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#x4E00;&#x5B9A;&#x4F1A;&#x7B49;&#x5F85; dispatchRequest &#x6267;&#x884C;&#x5B8C;&#x540E;&#x518D;&#x5F00;&#x59CB;&#x6267;&#x884C;&#x3002;

    promise = promise.then(chain.shift(), chain.shift());

  }

  return promise;
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/core/Axios.js</span>
Axios.prototype.request = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">config</span>) </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">var</span> chain = [dispatchRequest, <span class="hljs-literal">undefined</span>];

  <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A;promise&#x5BF9;&#x8C61;&#xFF0C;&#x72B6;&#x6001;&#x5FAE;resolved&#xFF0C;&#x63A5;&#x6536;&#x5230;&#x7684;&#x53C2;&#x6570;&#x5FAE;config&#x5BF9;&#x8C61;</span>
  <span class="hljs-keyword">var</span> promise = <span class="hljs-built_in">Promise</span>.resolve(config);

  <span class="hljs-comment">// &#x6CE8;&#x610F;&#xFF1A;interceptor.fulfilled &#x6216; interceptor.rejected &#x662F;&#x53EF;&#x80FD;&#x4E3A;undefined</span>
  <span class="hljs-keyword">this</span>.interceptors.request.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unshiftRequestInterceptors</span>(<span class="hljs-params">interceptor</span>) </span>{
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  <span class="hljs-keyword">this</span>.interceptors.response.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pushResponseInterceptors</span>(<span class="hljs-params">interceptor</span>) </span>{
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x4E86;&#x62E6;&#x622A;&#x5668;&#x540E;&#x7684;chain&#x6570;&#x7EC4;&#x5927;&#x6982;&#x4F1A;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</span>
  <span class="hljs-comment">// [</span>
  <span class="hljs-comment">//   requestFulfilledFn, requestRejectedFn, ..., </span>
  <span class="hljs-comment">//   dispatchRequest, undefined,</span>
  <span class="hljs-comment">//   responseFulfilledFn, responseRejectedFn, ....,</span>
  <span class="hljs-comment">// ]</span>

  <span class="hljs-comment">// &#x53EA;&#x8981;chain&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x4E0D;&#x4E3A;0&#xFF0C;&#x5C31;&#x4E00;&#x76F4;&#x6267;&#x884C;while&#x5FAA;&#x73AF;</span>
  <span class="hljs-keyword">while</span> (chain.length) {
    <span class="hljs-comment">// &#x6570;&#x7EC4;&#x7684; shift() &#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x628A;&#x6570;&#x7EC4;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4ECE;&#x5176;&#x4E2D;&#x5220;&#x9664;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x503C;&#x3002;</span>
    <span class="hljs-comment">// &#x6BCF;&#x6B21;&#x6267;&#x884C;while&#x5FAA;&#x73AF;&#xFF0C;&#x4ECE;chain&#x6570;&#x7EC4;&#x91CC;&#x6309;&#x5E8F;&#x53D6;&#x51FA;&#x4E24;&#x9879;&#xFF0C;&#x5E76;&#x5206;&#x522B;&#x4F5C;&#x4E3A;promise.then&#x65B9;&#x6CD5;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x548C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;</span>

    <span class="hljs-comment">// &#x6309;&#x7167;&#x6211;&#x4EEC;&#x4F7F;&#x7528;InterceptorManager.prototype.use&#x6DFB;&#x52A0;&#x62E6;&#x622A;&#x5668;&#x7684;&#x89C4;&#x5219;&#xFF0C;&#x6B63;&#x597D;&#x6BCF;&#x6B21;&#x6DFB;&#x52A0;&#x7684;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x901A;&#x8FC7;InterceptorManager.prototype.use&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x7684;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x56DE;&#x8C03;</span>

    <span class="hljs-comment">// &#x901A;&#x8FC7;InterceptorManager.prototype.use&#x5F80;&#x62E6;&#x622A;&#x5668;&#x6570;&#x7EC4;&#x91CC;&#x6DFB;&#x52A0;&#x62E6;&#x622A;&#x5668;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x6570;&#x7EC4;&#x7684;push&#x65B9;&#x6CD5;&#xFF0C;</span>
    <span class="hljs-comment">// &#x5BF9;&#x4E8E;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x4ECE;&#x62E6;&#x622A;&#x5668;&#x6570;&#x7EC4;&#x6309;&#x5E8F;&#x8BFB;&#x5230;&#x540E;&#x662F;&#x901A;&#x8FC7;unshift&#x65B9;&#x6CD5;&#x5F80;chain&#x6570;&#x7EC4;&#x6570;&#x91CC;&#x6DFB;&#x52A0;&#x7684;&#xFF0C;&#x53C8;&#x901A;&#x8FC7;shift&#x65B9;&#x6CD5;&#x4ECE;chain&#x6570;&#x7EC4;&#x91CC;&#x53D6;&#x51FA;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5F97;&#x51FA;&#x7ED3;&#x8BBA;&#xFF1A;&#x5BF9;&#x4E8E;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x5148;&#x6DFB;&#x52A0;&#x7684;&#x62E6;&#x622A;&#x5668;&#x4F1A;&#x540E;&#x6267;&#x884C;</span>
    <span class="hljs-comment">// &#x5BF9;&#x4E8E;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x4ECE;&#x62E6;&#x622A;&#x5668;&#x6570;&#x7EC4;&#x6309;&#x5E8F;&#x8BFB;&#x5230;&#x540E;&#x662F;&#x901A;&#x8FC7;push&#x65B9;&#x6CD5;&#x5F80;chain&#x6570;&#x7EC4;&#x91CC;&#x6DFB;&#x52A0;&#x7684;&#xFF0C;&#x53C8;&#x901A;&#x8FC7;shift&#x65B9;&#x6CD5;&#x4ECE;chain&#x6570;&#x7EC4;&#x91CC;&#x53D6;&#x51FA;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5F97;&#x51FA;&#x7ED3;&#x8BBA;&#xFF1A;&#x5BF9;&#x4E8E;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x6DFB;&#x52A0;&#x7684;&#x62E6;&#x622A;&#x5668;&#x5148;&#x6267;&#x884C;</span>

    <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#x7684;fulfilled&#x51FD;&#x6570;&#x4F1A;&#x63A5;&#x6536;&#x5230;promise&#x5BF9;&#x8C61;&#x521D;&#x59CB;&#x5316;&#x65F6;&#x4F20;&#x5165;&#x7684;config&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#x53C8;&#x89C4;&#x5B9A;&#x7528;&#x6237;&#x5199;&#x7684;fulfilled&#x51FD;&#x6570;&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;config&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x901A;&#x8FC7;promise&#x5B9E;&#x73B0;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x6BCF;&#x4E2A;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#x7684;fulfilled&#x51FD;&#x6570;&#x90FD;&#x4F1A;&#x63A5;&#x6536;&#x5230;&#x4E00;&#x4E2A;config&#x5BF9;&#x8C61;</span>

    <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x4E2A;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#x7684;fulfilled&#x51FD;&#x6570;&#x4F1A;&#x63A5;&#x53D7;&#x5230;dispatchRequest&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#xFF09;&#x8BF7;&#x6C42;&#x5230;&#x7684;&#x6570;&#x636E;&#xFF08;&#x4E5F;&#x5C31;&#x662F;response&#x5BF9;&#x8C61;&#xFF09;,&#x800C;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#x53C8;&#x89C4;&#x5B9A;&#x7528;&#x6237;&#x5199;&#x7684;fulfilled&#x51FD;&#x6570;&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;response&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x901A;&#x8FC7;promise&#x5B9E;&#x73B0;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x6BCF;&#x4E2A;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#x7684;fulfilled&#x51FD;&#x6570;&#x90FD;&#x4F1A;&#x63A5;&#x6536;&#x5230;&#x4E00;&#x4E2A;response&#x5BF9;&#x8C61;</span>

    <span class="hljs-comment">// &#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x62E6;&#x622A;&#x5668;&#x7684;&#x629B;&#x51FA;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x90FD;&#x4F1A;&#x88AB;&#x4E0B;&#x4E00;&#x4E2A;&#x62E6;&#x622A;&#x5668;&#x7684;rejected&#x51FD;&#x6570;&#x6536;&#x5230;&#xFF0C;&#x6240;&#x4EE5;dispatchRequest&#x629B;&#x51FA;&#x7684;&#x9519;&#x8BEF;&#x624D;&#x4F1A;&#x88AB;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#x63A5;&#x6536;&#x5230;&#x3002;</span>

    <span class="hljs-comment">// &#x56E0;&#x4E3A;axios&#x662F;&#x901A;&#x8FC7;promise&#x5B9E;&#x73B0;&#x7684;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x62E6;&#x622A;&#x5668;&#x91CC;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x800C;&#x62E6;&#x622A;&#x5668;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x8FD8;&#x662F;&#x4F1A;&#x6309;&#x7167;&#x6211;&#x4EEC;&#x4E0A;&#x9762;&#x8BF4;&#x7684;&#x987A;&#x5E8F;&#x6267;&#x884C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F; dispatchRequest &#x65B9;&#x6CD5;&#x4E00;&#x5B9A;&#x4F1A;&#x7B49;&#x5F85;&#x6240;&#x6709;&#x7684;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#x6267;&#x884C;&#x5B8C;&#x540E;&#x518D;&#x5F00;&#x59CB;&#x6267;&#x884C;&#xFF0C;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#x4E00;&#x5B9A;&#x4F1A;&#x7B49;&#x5F85; dispatchRequest &#x6267;&#x884C;&#x5B8C;&#x540E;&#x518D;&#x5F00;&#x59CB;&#x6267;&#x884C;&#x3002;</span>

    promise = promise.then(chain.shift(), chain.shift());

  }

  <span class="hljs-keyword">return</span> promise;
};
</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x4F60;&#x5E94;&#x8BE5;&#x5DF2;&#x7ECF;&#x6E05;&#x695A;&#x4E86;&#x62E6;&#x622A;&#x5668;&#x662F;&#x600E;&#x4E48;&#x56DE;&#x4E8B;&#xFF0C;&#x4EE5;&#x53CA;&#x62E6;&#x622A;&#x5668;&#x662F;&#x5982;&#x4F55;&#x5728;<code>Axios.prototype.request</code>&#x65B9;&#x6CD5;&#x91CC;&#x53D1;&#x6325;&#x4F5C;&#x7528;&#x7684;&#x4E86;&#xFF0C;<br>&#x90A3;&#x4E48;&#x5904;&#x4E8E;&quot;&#x4E2D;&#x6E38;&#x4F4D;&#x7F6E;&quot;&#x7684;<code>dispatchRequest</code>&#x662F;&#x5982;&#x4F55;&#x53D1;&#x9001;http&#x8BF7;&#x6C42;&#x7684;&#x5462;&#xFF1F;</p><h3 id="articleHeader9">dispatchrequest&#x90FD;&#x505A;&#x4E86;&#x54EA;&#x4E9B;&#x4E8B;</h3><p>dispatchRequest&#x4E3B;&#x8981;&#x505A;&#x4E86;3&#x4EF6;&#x4E8B;&#xFF1A;<br>1&#xFF0C;&#x62FF;&#x5230;config&#x5BF9;&#x8C61;&#xFF0C;&#x5BF9;config&#x8FDB;&#x884C;&#x4F20;&#x7ED9;http&#x8BF7;&#x6C42;&#x9002;&#x914D;&#x5668;&#x524D;&#x7684;&#x6700;&#x540E;&#x5904;&#x7406;&#xFF1B;<br>2&#xFF0C;http&#x8BF7;&#x6C42;&#x9002;&#x914D;&#x5668;&#x6839;&#x636E;config&#x914D;&#x7F6E;&#xFF0C;&#x53D1;&#x8D77;&#x8BF7;&#x6C42;<br>3&#xFF0C;http&#x8BF7;&#x6C42;&#x9002;&#x914D;&#x5668;&#x8BF7;&#x6C42;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x5982;&#x679C;&#x6210;&#x529F;&#x5219;&#x6839;&#x636E;header&#x3001;data&#x3001;&#x548C;config.transformResponse&#xFF08;&#x5173;&#x4E8E;transformResponse&#xFF0C;&#x4E0B;&#x9762;&#x7684;<a href="#%E6%95%B0%E6%8D%AE%E8%BD%AC%E6%8D%A2%E5%99%A8-%E8%BD%AC%E6%8D%A2%E8%AF%B7%E6%B1%82%E4%B8%8E%E5%93%8D%E5%BA%94%E6%95%B0%E6%8D%AE">&#x6570;&#x636E;&#x8F6C;&#x6362;&#x5668;</a>&#x4F1A;&#x8FDB;&#x884C;&#x8BB2;&#x89E3;&#xFF09;&#x62FF;&#x5230;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x540E;&#x7684;response&#xFF0C;&#x5E76;return&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/core/dispatchRequest.js
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL &amp;&amp; !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // &#x5BF9;&#x8BF7;&#x6C42;data&#x8FDB;&#x884C;&#x8F6C;&#x6362;
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // &#x5BF9;header&#x8FDB;&#x884C;&#x5408;&#x5E76;&#x5904;&#x7406;
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  // &#x5220;&#x9664;header&#x5C5E;&#x6027;&#x91CC;&#x65E0;&#x7528;&#x7684;&#x5C5E;&#x6027;
  utils.forEach(
    [&apos;delete&apos;, &apos;get&apos;, &apos;head&apos;, &apos;post&apos;, &apos;put&apos;, &apos;patch&apos;, &apos;common&apos;],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  // http&#x8BF7;&#x6C42;&#x9002;&#x914D;&#x5668;&#x4F1A;&#x4F18;&#x5148;&#x4F7F;&#x7528;config&#x4E0A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x9002;&#x914D;&#x5668;&#xFF0C;&#x6CA1;&#x6709;&#x914D;&#x7F6E;&#x65F6;&#x624D;&#x4F1A;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x7684;XHR&#x6216;http&#x9002;&#x914D;&#x5668;&#xFF0C;&#x4E0D;&#x8FC7;&#x5927;&#x90E8;&#x5206;&#x65F6;&#x5019;&#xFF0C;axios&#x63D0;&#x4F9B;&#x7684;&#x9ED8;&#x8BA4;&#x9002;&#x914D;&#x5668;&#x662F;&#x80FD;&#x591F;&#x6EE1;&#x8DB3;&#x6211;&#x4EEC;&#x7684;
  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(/**/);
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/core/dispatchRequest.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatchRequest</span>(<span class="hljs-params">config</span>) </span>{
  throwIfCancellationRequested(config);

  <span class="hljs-comment">// Support baseURL config</span>
  <span class="hljs-keyword">if</span> (config.baseURL &amp;&amp; !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  <span class="hljs-comment">// Ensure headers exist</span>
  config.headers = config.headers || {};

  <span class="hljs-comment">// &#x5BF9;&#x8BF7;&#x6C42;data&#x8FDB;&#x884C;&#x8F6C;&#x6362;</span>
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  <span class="hljs-comment">// &#x5BF9;header&#x8FDB;&#x884C;&#x5408;&#x5E76;&#x5904;&#x7406;</span>
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  <span class="hljs-comment">// &#x5220;&#x9664;header&#x5C5E;&#x6027;&#x91CC;&#x65E0;&#x7528;&#x7684;&#x5C5E;&#x6027;</span>
  utils.forEach(
    [<span class="hljs-string">&apos;delete&apos;</span>, <span class="hljs-string">&apos;get&apos;</span>, <span class="hljs-string">&apos;head&apos;</span>, <span class="hljs-string">&apos;post&apos;</span>, <span class="hljs-string">&apos;put&apos;</span>, <span class="hljs-string">&apos;patch&apos;</span>, <span class="hljs-string">&apos;common&apos;</span>],
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cleanHeaderConfig</span>(<span class="hljs-params">method</span>) </span>{
      <span class="hljs-keyword">delete</span> config.headers[method];
    }
  );

  <span class="hljs-comment">// http&#x8BF7;&#x6C42;&#x9002;&#x914D;&#x5668;&#x4F1A;&#x4F18;&#x5148;&#x4F7F;&#x7528;config&#x4E0A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x9002;&#x914D;&#x5668;&#xFF0C;&#x6CA1;&#x6709;&#x914D;&#x7F6E;&#x65F6;&#x624D;&#x4F1A;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x7684;XHR&#x6216;http&#x9002;&#x914D;&#x5668;&#xFF0C;&#x4E0D;&#x8FC7;&#x5927;&#x90E8;&#x5206;&#x65F6;&#x5019;&#xFF0C;axios&#x63D0;&#x4F9B;&#x7684;&#x9ED8;&#x8BA4;&#x9002;&#x914D;&#x5668;&#x662F;&#x80FD;&#x591F;&#x6EE1;&#x8DB3;&#x6211;&#x4EEC;&#x7684;</span>
  <span class="hljs-keyword">var</span> adapter = config.adapter || defaults.adapter;

  <span class="hljs-keyword">return</span> adapter(config).then(<span class="hljs-comment">/**/</span>);
};
</code></pre><p>&#x597D;&#x4E86;&#xFF0C;&#x770B;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x65F6;&#x5019;&#x68B3;&#x7406;&#x4E00;&#x4E0B;&#xFF1A;axios&#x662F;&#x5982;&#x4F55;&#x7528;promise&#x642D;&#x8D77;&#x57FA;&#x4E8E;xhr&#x7684;&#x5F02;&#x6B65;&#x6865;&#x6881;&#x7684;&#xFF1F;</p><h3 id="articleHeader10">axios&#x662F;&#x5982;&#x4F55;&#x7528;promise&#x642D;&#x8D77;&#x57FA;&#x4E8E;xhr&#x7684;&#x5F02;&#x6B65;&#x6865;&#x6881;&#x7684;</h3><p>axios&#x662F;&#x5982;&#x4F55;&#x901A;&#x8FC7;Promise&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x7684;&#xFF1F;</p><h4>&#x5982;&#x4F55;&#x4F7F;&#x7528;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import axios from &apos;axios&apos;

axios.get(/**/)
.then(data =&gt; {
  // &#x6B64;&#x5904;&#x53EF;&#x4EE5;&#x62FF;&#x5230;&#x5411;&#x670D;&#x52A1;&#x7AEF;&#x8BF7;&#x6C42;&#x56DE;&#x7684;&#x6570;&#x636E;
})
.catch(error =&gt; {
  // &#x6B64;&#x5904;&#x53EF;&#x4EE5;&#x62FF;&#x5230;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&#x6216;&#x53D6;&#x6D88;&#x6216;&#x5176;&#x4ED6;&#x5904;&#x7406;&#x5931;&#x8D25;&#x7684;&#x9519;&#x8BEF;&#x5BF9;&#x8C61;
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>

axios.get(<span class="hljs-comment">/**/</span>)
.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
  <span class="hljs-comment">// &#x6B64;&#x5904;&#x53EF;&#x4EE5;&#x62FF;&#x5230;&#x5411;&#x670D;&#x52A1;&#x7AEF;&#x8BF7;&#x6C42;&#x56DE;&#x7684;&#x6570;&#x636E;</span>
})
.catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
  <span class="hljs-comment">// &#x6B64;&#x5904;&#x53EF;&#x4EE5;&#x62FF;&#x5230;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&#x6216;&#x53D6;&#x6D88;&#x6216;&#x5176;&#x4ED6;&#x5904;&#x7406;&#x5931;&#x8D25;&#x7684;&#x9519;&#x8BEF;&#x5BF9;&#x8C61;</span>
})
</code></pre><h4>&#x6E90;&#x7801;&#x5206;&#x6790;</h4><p>&#x5148;&#x6765;&#x4E00;&#x4E2A;&#x56FE;&#x7B80;&#x5355;&#x7684;&#x4E86;&#x89E3;&#x4E0B;axios&#x9879;&#x76EE;&#x91CC;&#xFF0C;http&#x8BF7;&#x6C42;&#x5B8C;&#x6210;&#x540E;&#x5230;&#x8FBE;&#x7528;&#x6237;&#x7684;&#x987A;&#x5E8F;&#x6D41;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbbjtR?w=470&amp;h=522" src="https://static.alili.tech/img/bVbbjtR?w=470&amp;h=522" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x901A;&#x8FC7;<a href="#axios%E4%B8%BA%E4%BD%95%E4%BC%9A%E6%9C%89%E5%A4%9A%E7%A7%8D%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F">axios&#x4E3A;&#x4F55;&#x4F1A;&#x6709;&#x591A;&#x79CD;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;</a>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#xFF0C;<br>&#x7528;&#x6237;&#x65E0;&#x8BBA;&#x4EE5;&#x4EC0;&#x4E48;&#x65B9;&#x5F0F;&#x8C03;&#x7528;axios&#xFF0C;&#x6700;&#x7EC8;&#x90FD;&#x662F;&#x8C03;&#x7528;&#x7684;<code>Axios.prototype.request</code>&#x65B9;&#x6CD5;&#xFF0C;<br>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x6700;&#x7EC8;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;Promise&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
Axios.prototype.request = function request(config) {
  // ...
  var chain = [dispatchRequest, undefined];
  // &#x5C06;config&#x5BF9;&#x8C61;&#x5F53;&#x4F5C;&#x53C2;&#x6570;&#x4F20;&#x7ED9;Primise.resolve&#x65B9;&#x6CD5;
  var promise = Promise.resolve(config);

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
Axios.prototype.request = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">config</span>) </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">var</span> chain = [dispatchRequest, <span class="hljs-literal">undefined</span>];
  <span class="hljs-comment">// &#x5C06;config&#x5BF9;&#x8C61;&#x5F53;&#x4F5C;&#x53C2;&#x6570;&#x4F20;&#x7ED9;Primise.resolve&#x65B9;&#x6CD5;</span>
  <span class="hljs-keyword">var</span> promise = <span class="hljs-built_in">Promise</span>.resolve(config);

  <span class="hljs-keyword">while</span> (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  <span class="hljs-keyword">return</span> promise;
};
</code></pre><p><code>Axios.prototype.request</code>&#x65B9;&#x6CD5;&#x4F1A;&#x8C03;&#x7528;<code>dispatchRequest</code>&#x65B9;&#x6CD5;&#xFF0C;&#x800C;<code>dispatchRequest</code>&#x65B9;&#x6CD5;&#x4F1A;&#x8C03;&#x7528;<code>xhrAdapter</code>&#x65B9;&#x6CD5;&#xFF0C;<code>xhrAdapter</code>&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x8FD8;&#x4E00;&#x4E2A;Promise&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/adapters/xhr.js
function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    // ... &#x7701;&#x7565;&#x4EE3;&#x7801;
  });
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/adapters/xhr.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">xhrAdapter</span>(<span class="hljs-params">config</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatchXhrRequest</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-comment">// ... &#x7701;&#x7565;&#x4EE3;&#x7801;</span>
  });
};
</code></pre><p><code>xhrAdapter</code>&#x5185;&#x7684;XHR&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x540E;&#x4F1A;&#x6267;&#x884C;&#x8FD9;&#x4E2A;Promise&#x5BF9;&#x8C61;&#x7684;<code>resolve</code>&#x65B9;&#x6CD5;,&#x5E76;&#x5C06;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;&#x4F20;&#x51FA;&#x53BB;,<br>&#x53CD;&#x4E4B;&#x5219;&#x6267;&#x884C;<code>reject</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x5C06;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x51FA;&#x53BB;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/adapters/xhr.js
var request = new XMLHttpRequest();
var loadEvent = &apos;onreadystatechange&apos;;

request[loadEvent] = function handleLoad() {
  // ...
  // &#x5F80;&#x4E0B;&#x8D70;&#x6709;settle&#x7684;&#x6E90;&#x7801;
  settle(resolve, reject, response);
  // ...
};
request.onerror = function handleError() {
  reject(/**/);
  request = null;
};
request.ontimeout = function handleTimeout() {
  reject(/**/);
  request = null;
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/adapters/xhr.js</span>
<span class="hljs-keyword">var</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
<span class="hljs-keyword">var</span> loadEvent = <span class="hljs-string">&apos;onreadystatechange&apos;</span>;

request[loadEvent] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleLoad</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-comment">// &#x5F80;&#x4E0B;&#x8D70;&#x6709;settle&#x7684;&#x6E90;&#x7801;</span>
  settle(resolve, reject, response);
  <span class="hljs-comment">// ...</span>
};
request.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleError</span>(<span class="hljs-params"></span>) </span>{
  reject(<span class="hljs-comment">/**/</span>);
  request = <span class="hljs-literal">null</span>;
};
request.ontimeout = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleTimeout</span>(<span class="hljs-params"></span>) </span>{
  reject(<span class="hljs-comment">/**/</span>);
  request = <span class="hljs-literal">null</span>;
};
</code></pre><p>&#x9A8C;&#x8BC1;&#x670D;&#x52A1;&#x7AEF;&#x7684;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x662F;&#x5426;&#x901A;&#x8FC7;&#x9A8C;&#x8BC1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/core/settle.js
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(/**/);
  }
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/core/settle.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">settle</span>(<span class="hljs-params">resolve, reject, response</span>) </span>{
  <span class="hljs-keyword">var</span> validateStatus = response.config.validateStatus;
  <span class="hljs-keyword">if</span> (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } <span class="hljs-keyword">else</span> {
    reject(<span class="hljs-comment">/**/</span>);
  }
};
</code></pre><p>&#x56DE;&#x5230;<code>dispatchRequest</code>&#x65B9;&#x6CD5;&#x5185;&#xFF0C;&#x9996;&#x5148;&#x5F97;&#x5230;<code>xhrAdapter</code>&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;Promise&#x5BF9;&#x8C61;,<br>&#x7136;&#x540E;&#x901A;&#x8FC7;<code>.then</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5BF9;<code>xhrAdapter</code>&#x8FD4;&#x56DE;&#x7684;Promise&#x5BF9;&#x8C61;&#x7684;&#x6210;&#x529F;&#x6216;&#x5931;&#x8D25;&#x7ED3;&#x679C;&#x518D;&#x6B21;&#x52A0;&#x5DE5;&#xFF0C;<br>&#x6210;&#x529F;&#x7684;&#x8BDD;&#xFF0C;&#x5219;&#x5C06;&#x5904;&#x7406;&#x540E;&#x7684;<code>response</code>&#x8FD4;&#x56DE;&#xFF0C;<br>&#x5931;&#x8D25;&#x7684;&#x8BDD;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x4E3A;<code>rejected</code>&#x7684;Promise&#x5BF9;&#x8C61;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  return adapter(config).then(function onAdapterResolution(response) {
    // ...
    return response;
  }, function onAdapterRejection(reason) {
    // ...
    return Promise.reject(reason);
  });
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
  <span class="hljs-keyword">return</span> adapter(config).then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onAdapterResolution</span>(<span class="hljs-params">response</span>) </span>{
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> response;
  }, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onAdapterRejection</span>(<span class="hljs-params">reason</span>) </span>{
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(reason);
  });
};
</code></pre><p>&#x90A3;&#x4E48;&#x81F3;&#x6B64;&#xFF0C;&#x7528;&#x6237;&#x8C03;&#x7528;<code>axios()</code>&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8C03;&#x7528;Promise&#x7684;<code>.then</code>&#x6216;<code>.catch</code>&#x8FDB;&#x884C;&#x4E1A;&#x52A1;&#x5904;&#x7406;&#x4E86;&#x3002;</p><p>&#x56DE;&#x8FC7;&#x5934;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x4ECB;&#x7ECD;<code>dispatchRequest</code>&#x4E00;&#x8282;&#x65F6;&#x8BF4;&#x5230;&#x7684;&#x6570;&#x636E;&#x8F6C;&#x6362;&#xFF0C;&#x800C;axios&#x5B98;&#x65B9;&#x4E5F;&#x5C06;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x4E13;&#x95E8;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x4EAE;&#x70B9;&#x6765;&#x4ECB;&#x7ECD;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x5230;&#x5E95;&#x80FD;&#x5728;&#x4F7F;&#x7528;axios&#x53D1;&#x6325;&#x4EC0;&#x4E48;&#x529F;&#x6548;&#x5462;&#xFF1F;</p><h3 id="articleHeader11">&#x6570;&#x636E;&#x8F6C;&#x6362;&#x5668;-&#x8F6C;&#x6362;&#x8BF7;&#x6C42;&#x4E0E;&#x54CD;&#x5E94;&#x6570;&#x636E;</h3><h4>&#x5982;&#x4F55;&#x4F7F;&#x7528;</h4><ol><li>&#x4FEE;&#x6539;&#x5168;&#x5C40;&#x7684;&#x8F6C;&#x6362;&#x5668;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import axios from &apos;axios&apos;

// &#x5F80;&#x73B0;&#x6709;&#x7684;&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x5668;&#x91CC;&#x589E;&#x52A0;&#x8F6C;&#x6362;&#x65B9;&#x6CD5;
axios.defaults.transformRequest.push((data, headers) =&gt; {
  // ...&#x5904;&#x7406;data
  return data;
});

// &#x91CD;&#x5199;&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x5668;
axios.defaults.transformRequest = [(data, headers) =&gt; {
  // ...&#x5904;&#x7406;data
  return data;
}];

// &#x5F80;&#x73B0;&#x6709;&#x7684;&#x54CD;&#x5E94;&#x8F6C;&#x6362;&#x5668;&#x91CC;&#x589E;&#x52A0;&#x8F6C;&#x6362;&#x65B9;&#x6CD5;
axios.defaults.transformResponse.push((data, headers) =&gt; {
  // ...&#x5904;&#x7406;data
  return data;
});

// &#x91CD;&#x5199;&#x54CD;&#x5E94;&#x8F6C;&#x6362;&#x5668;
axios.defaults.transformResponse = [(data, headers) =&gt; {
  // ...&#x5904;&#x7406;data
  return data;
}];
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>

<span class="hljs-comment">// &#x5F80;&#x73B0;&#x6709;&#x7684;&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x5668;&#x91CC;&#x589E;&#x52A0;&#x8F6C;&#x6362;&#x65B9;&#x6CD5;</span>
axios.defaults.transformRequest.push(<span class="hljs-function">(<span class="hljs-params">data, headers</span>) =&gt;</span> {
  <span class="hljs-comment">// ...&#x5904;&#x7406;data</span>
  <span class="hljs-keyword">return</span> data;
});

<span class="hljs-comment">// &#x91CD;&#x5199;&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x5668;</span>
axios.defaults.transformRequest = [<span class="hljs-function">(<span class="hljs-params">data, headers</span>) =&gt;</span> {
  <span class="hljs-comment">// ...&#x5904;&#x7406;data</span>
  <span class="hljs-keyword">return</span> data;
}];

<span class="hljs-comment">// &#x5F80;&#x73B0;&#x6709;&#x7684;&#x54CD;&#x5E94;&#x8F6C;&#x6362;&#x5668;&#x91CC;&#x589E;&#x52A0;&#x8F6C;&#x6362;&#x65B9;&#x6CD5;</span>
axios.defaults.transformResponse.push(<span class="hljs-function">(<span class="hljs-params">data, headers</span>) =&gt;</span> {
  <span class="hljs-comment">// ...&#x5904;&#x7406;data</span>
  <span class="hljs-keyword">return</span> data;
});

<span class="hljs-comment">// &#x91CD;&#x5199;&#x54CD;&#x5E94;&#x8F6C;&#x6362;&#x5668;</span>
axios.defaults.transformResponse = [<span class="hljs-function">(<span class="hljs-params">data, headers</span>) =&gt;</span> {
  <span class="hljs-comment">// ...&#x5904;&#x7406;data</span>
  <span class="hljs-keyword">return</span> data;
}];
</code></pre><ol><li>&#x4FEE;&#x6539;&#x67D0;&#x6B21;axios&#x8BF7;&#x6C42;&#x7684;&#x8F6C;&#x6362;&#x5668;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import axios from &apos;axios&apos;

// &#x5F80;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x8F6C;&#x6362;&#x5668;&#x91CC;&#x589E;&#x52A0;&#x8F6C;&#x6362;&#x65B9;&#x6CD5;
axios.get(url, {
  // ...
  transformRequest: [
    ...axios.defaults.transformRequest, // &#x53BB;&#x6389;&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#x5C31;&#x7B49;&#x4E8E;&#x91CD;&#x5199;&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x5668;&#x4E86;
    (data, headers) =&gt; {
      // ...&#x5904;&#x7406;data
      return data;
    }
  ],
  transformResponse: [
    ...axios.defaults.transformResponse, // &#x53BB;&#x6389;&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#x5C31;&#x7B49;&#x4E8E;&#x91CD;&#x5199;&#x54CD;&#x5E94;&#x8F6C;&#x6362;&#x5668;&#x4E86;
    (data, headers) =&gt; {
      // ...&#x5904;&#x7406;data
      return data;
    }
  ],
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>

<span class="hljs-comment">// &#x5F80;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x8F6C;&#x6362;&#x5668;&#x91CC;&#x589E;&#x52A0;&#x8F6C;&#x6362;&#x65B9;&#x6CD5;</span>
axios.get(url, {
  <span class="hljs-comment">// ...</span>
  transformRequest: [
    ...axios.defaults.transformRequest, <span class="hljs-comment">// &#x53BB;&#x6389;&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#x5C31;&#x7B49;&#x4E8E;&#x91CD;&#x5199;&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x5668;&#x4E86;</span>
    (data, headers) =&gt; {
      <span class="hljs-comment">// ...&#x5904;&#x7406;data</span>
      <span class="hljs-keyword">return</span> data;
    }
  ],
  <span class="hljs-attr">transformResponse</span>: [
    ...axios.defaults.transformResponse, <span class="hljs-comment">// &#x53BB;&#x6389;&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#x5C31;&#x7B49;&#x4E8E;&#x91CD;&#x5199;&#x54CD;&#x5E94;&#x8F6C;&#x6362;&#x5668;&#x4E86;</span>
    (data, headers) =&gt; {
      <span class="hljs-comment">// ...&#x5904;&#x7406;data</span>
      <span class="hljs-keyword">return</span> data;
    }
  ],
})
</code></pre><h4>&#x6E90;&#x7801;&#x5206;&#x6790;</h4><p>&#x9ED8;&#x8BA4;&#x7684;<code>defaults</code>&#x914D;&#x7F6E;&#x9879;&#x91CC;&#x5DF2;&#x7ECF;&#x81EA;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x5668;&#x548C;&#x4E00;&#x4E2A;&#x54CD;&#x5E94;&#x8F6C;&#x6362;&#x5668;&#xFF0C;<br>&#x770B;&#x4E0B;&#x6E90;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/defaults.js
var defaults = {

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, &apos;Content-Type&apos;);
    // ...
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, &apos;application/x-www-form-urlencoded;charset=utf-8&apos;);
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, &apos;application/json;charset=utf-8&apos;);
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    if (typeof data === &apos;string&apos;) {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],
  
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/defaults.js</span>
<span class="hljs-keyword">var</span> defaults = {

  <span class="hljs-attr">transformRequest</span>: [<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">transformRequest</span>(<span class="hljs-params">data, headers</span>) </span>{
    normalizeHeaderName(headers, <span class="hljs-string">&apos;Content-Type&apos;</span>);
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">if</span> (utils.isArrayBufferView(data)) {
      <span class="hljs-keyword">return</span> data.buffer;
    }
    <span class="hljs-keyword">if</span> (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, <span class="hljs-string">&apos;application/x-www-form-urlencoded;charset=utf-8&apos;</span>);
      <span class="hljs-keyword">return</span> data.toString();
    }
    <span class="hljs-keyword">if</span> (utils.isObject(data)) {
      setContentTypeIfUnset(headers, <span class="hljs-string">&apos;application/json;charset=utf-8&apos;</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.stringify(data);
    }
    <span class="hljs-keyword">return</span> data;
  }],

  <span class="hljs-attr">transformResponse</span>: [<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">transformResponse</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> data === <span class="hljs-string">&apos;string&apos;</span>) {
      <span class="hljs-keyword">try</span> {
        data = <span class="hljs-built_in">JSON</span>.parse(data);
      } <span class="hljs-keyword">catch</span> (e) { <span class="hljs-comment">/* Ignore */</span> }
    }
    <span class="hljs-keyword">return</span> data;
  }],
  
};
</code></pre><p>&#x90A3;&#x4E48;&#x5728;axios&#x9879;&#x76EE;&#x91CC;&#xFF0C;&#x662F;&#x5728;&#x4EC0;&#x4E48;&#x5730;&#x65B9;&#x4F7F;&#x7528;&#x4E86;&#x8F6C;&#x6362;&#x5668;&#x5462;&#xFF1F;</p><p>&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x5668;&#x7684;&#x4F7F;&#x7528;&#x5730;&#x65B9;&#x662F;http&#x8BF7;&#x6C42;&#x524D;&#xFF0C;&#x4F7F;&#x7528;&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x5668;&#x5BF9;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x505A;&#x5904;&#x7406;&#xFF0C;<br>&#x7136;&#x540E;&#x4F20;&#x7ED9;http&#x8BF7;&#x6C42;&#x9002;&#x914D;&#x5668;&#x4F7F;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/core/dispatchRequest.js
function dispatchRequest(config) {
  
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  return adapter(config).then(/* ... */);
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/core/dispatchRequest.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatchRequest</span>(<span class="hljs-params">config</span>) </span>{
  
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  <span class="hljs-keyword">return</span> adapter(config).then(<span class="hljs-comment">/* ... */</span>);
};
</code></pre><p>&#x770B;&#x4E0B;<code>transformData</code>&#x65B9;&#x6CD5;&#x7684;&#x4EE3;&#x7801;&#xFF0C;<br>&#x4E3B;&#x8981;&#x904D;&#x5386;&#x8F6C;&#x6362;&#x5668;&#x6570;&#x7EC4;&#xFF0C;&#x5206;&#x522B;&#x6267;&#x884C;&#x6BCF;&#x4E00;&#x4E2A;&#x8F6C;&#x6362;&#x5668;&#xFF0C;&#x6839;&#x636E;data&#x548C;headers&#x53C2;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x65B0;&#x7684;data&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/core/transformData.js
function transformData(data, headers, fns) {
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/core/transformData.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">transformData</span>(<span class="hljs-params">data, headers, fns</span>) </span>{
  utils.forEach(fns, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">transform</span>(<span class="hljs-params">fn</span>) </span>{
    data = fn(data, headers);
  });
  <span class="hljs-keyword">return</span> data;
};
</code></pre><p>&#x54CD;&#x5E94;&#x8F6C;&#x6362;&#x5668;&#x7684;&#x4F7F;&#x7528;&#x5730;&#x65B9;&#x662F;&#x5728;http&#x8BF7;&#x6C42;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x6839;&#x636E;http&#x8BF7;&#x6C42;&#x9002;&#x914D;&#x5668;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x505A;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x5904;&#x7406;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/core/dispatchRequest.js
return adapter(config).then(function onAdapterResolution(response) {
    // ...
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      // ...
      if (reason &amp;&amp; reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/core/dispatchRequest.js</span>
<span class="hljs-keyword">return</span> adapter(config).then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onAdapterResolution</span>(<span class="hljs-params">response</span>) </span>{
    <span class="hljs-comment">// ...</span>
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    <span class="hljs-keyword">return</span> response;
  }, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onAdapterRejection</span>(<span class="hljs-params">reason</span>) </span>{
    <span class="hljs-keyword">if</span> (!isCancel(reason)) {
      <span class="hljs-comment">// ...</span>
      <span class="hljs-keyword">if</span> (reason &amp;&amp; reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(reason);
  });
</code></pre><h4>&#x8F6C;&#x6362;&#x5668;&#x548C;&#x62E6;&#x622A;&#x5668;&#x7684;&#x5173;&#x7CFB;&#xFF1F;</h4><p>&#x62E6;&#x622A;&#x5668;&#x540C;&#x6837;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x8F6C;&#x6362;&#x8BF7;&#x6C42;&#x548C;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x4F46;&#x6839;&#x636E;&#x4F5C;&#x8005;&#x7684;&#x8BBE;&#x8BA1;&#x548C;&#x7EFC;&#x5408;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;<br>&#x5728;&#x8BF7;&#x6C42;&#x65F6;&#xFF0C;&#x62E6;&#x622A;&#x5668;&#x4E3B;&#x8981;&#x8D1F;&#x8D23;&#x4FEE;&#x6539;config&#x914D;&#x7F6E;&#x9879;&#xFF0C;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x5668;&#x4E3B;&#x8981;&#x8D1F;&#x8D23;&#x8F6C;&#x6362;&#x8BF7;&#x6C42;&#x4F53;&#xFF0C;&#x6BD4;&#x5982;&#x8F6C;&#x6362;&#x5BF9;&#x8C61;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;<br>&#x5728;&#x8BF7;&#x6C42;&#x54CD;&#x5E94;&#x540E;&#xFF0C;&#x62E6;&#x622A;&#x5668;&#x53EF;&#x4EE5;&#x62FF;&#x5230;<code>response</code>&#xFF0C;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x5668;&#x4E3B;&#x8981;&#x8D1F;&#x8D23;&#x5904;&#x7406;&#x54CD;&#x5E94;&#x4F53;&#xFF0C;&#x6BD4;&#x5982;&#x8F6C;&#x6362;&#x5B57;&#x7B26;&#x4E32;&#x4E3A;&#x5BF9;&#x8C61;&#x3002;</p><p>axios&#x5B98;&#x65B9;&#x662F;&#x5C06;&quot;&#x81EA;&#x52A8;&#x8F6C;&#x6362;&#x4E3A;JSON&#x6570;&#x636E;&quot;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x4EAE;&#x70B9;&#x6765;&#x4ECB;&#x7ECD;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x5668;&#x662F;&#x5982;&#x4F55;&#x5B8C;&#x6210;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x7684;&#x5462;&#xFF1F;<br>&#x5176;&#x5B9E;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x8D77;&#x770B;&#x4E0B;&#x5427;&#x3002;</p><h3 id="articleHeader12">&#x81EA;&#x52A8;&#x8F6C;&#x6362;json&#x6570;&#x636E;</h3><p>&#x5728;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;axios&#x5C06;&#x4F1A;&#x81EA;&#x52A8;&#x7684;&#x5C06;&#x4F20;&#x5165;&#x7684;data&#x5BF9;&#x8C61;&#x5E8F;&#x5217;&#x5316;&#x4E3A;JSON&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5C06;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x4E2D;&#x7684;JSON&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x6362;&#x4E3A;JavaScript&#x5BF9;&#x8C61;</p><h4>&#x6E90;&#x7801;&#x5206;&#x6790;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// &#x8BF7;&#x6C42;&#x65F6;&#xFF0C;&#x5C06;data&#x6570;&#x636E;&#x8F6C;&#x6362;&#x4E3A;JSON &#x5B57;&#x7B26;&#x4E32;
// /lib/defaults.js 
transformRequest: [function transformRequest(data, headers) {
  // ...
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, &apos;application/json;charset=utf-8&apos;);
      return JSON.stringify(data);
    }
    return data;
}]

// &#x5F97;&#x5230;&#x54CD;&#x5E94;&#x540E;&#xFF0C;&#x5C06;&#x8BF7;&#x6C42;&#x5230;&#x7684;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x4E3A;JSON&#x5BF9;&#x8C61;
// /lib/defaults.js
transformResponse: [function transformResponse(data) {
    if (typeof data === &apos;string&apos;) {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
}]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// &#x8BF7;&#x6C42;&#x65F6;&#xFF0C;&#x5C06;data&#x6570;&#x636E;&#x8F6C;&#x6362;&#x4E3A;JSON &#x5B57;&#x7B26;&#x4E32;</span>
<span class="hljs-comment">// /lib/defaults.js </span>
transformRequest: [<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">transformRequest</span>(<span class="hljs-params">data, headers</span>) </span>{
  <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">if</span> (utils.isObject(data)) {
      setContentTypeIfUnset(headers, <span class="hljs-string">&apos;application/json;charset=utf-8&apos;</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.stringify(data);
    }
    <span class="hljs-keyword">return</span> data;
}]

<span class="hljs-comment">// &#x5F97;&#x5230;&#x54CD;&#x5E94;&#x540E;&#xFF0C;&#x5C06;&#x8BF7;&#x6C42;&#x5230;&#x7684;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x4E3A;JSON&#x5BF9;&#x8C61;</span>
<span class="hljs-comment">// /lib/defaults.js</span>
transformResponse: [<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">transformResponse</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> data === <span class="hljs-string">&apos;string&apos;</span>) {
      <span class="hljs-keyword">try</span> {
        data = <span class="hljs-built_in">JSON</span>.parse(data);
      } <span class="hljs-keyword">catch</span> (e) { <span class="hljs-comment">/* Ignore */</span> }
    }
    <span class="hljs-keyword">return</span> data;
}]
</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;axios&#x9879;&#x76EE;&#x7684;&#x8FD0;&#x4F5C;&#x6D41;&#x7A0B;&#x5DF2;&#x7ECF;&#x4ECB;&#x7ECD;&#x5B8C;&#x6BD5;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x5DF2;&#x7ECF;&#x6253;&#x901A;&#x4E86;&#x4EFB;&#x7763;&#x4E8C;&#x8109;&#x4E86;&#x5462;<br>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x4E00;&#x8D77;&#x770B;&#x4E0B;axios&#x8FD8;&#x5E26;&#x7ED9;&#x4E86;&#x6211;&#x4EEC;&#x54EA;&#x4E9B;&#x597D;&#x7528;&#x7684;&#x6280;&#x80FD;&#x70B9;&#x5427;&#x3002;</p><h3 id="articleHeader13">header&#x8BBE;&#x7F6E;</h3><h4>&#x5982;&#x4F55;&#x4F7F;&#x7528;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import axios from &apos;axios&apos;

// &#x8BBE;&#x7F6E;&#x901A;&#x7528;header
axios.defaults.headers.common[&apos;X-Requested-With&apos;] = &apos;XMLHttpRequest&apos;; // xhr&#x6807;&#x8BC6;

// &#x8BBE;&#x7F6E;&#x67D0;&#x79CD;&#x8BF7;&#x6C42;&#x7684;header
axios.defaults.headers.post[&apos;Content-Type&apos;] = &apos;application/x-www-form-urlencoded;charset=utf-8&apos;;

// &#x8BBE;&#x7F6E;&#x67D0;&#x6B21;&#x8BF7;&#x6C42;&#x7684;header
axios.get(url, {
  headers: {
    &apos;Authorization&apos;: &apos;whr1&apos;,
  },
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>

<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x901A;&#x7528;header</span>
axios.defaults.headers.common[<span class="hljs-string">&apos;X-Requested-With&apos;</span>] = <span class="hljs-string">&apos;XMLHttpRequest&apos;</span>; <span class="hljs-comment">// xhr&#x6807;&#x8BC6;</span>

<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x67D0;&#x79CD;&#x8BF7;&#x6C42;&#x7684;header</span>
axios.defaults.headers.post[<span class="hljs-string">&apos;Content-Type&apos;</span>] = <span class="hljs-string">&apos;application/x-www-form-urlencoded;charset=utf-8&apos;</span>;

<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x67D0;&#x6B21;&#x8BF7;&#x6C42;&#x7684;header</span>
axios.get(url, {
  <span class="hljs-attr">headers</span>: {
    <span class="hljs-string">&apos;Authorization&apos;</span>: <span class="hljs-string">&apos;whr1&apos;</span>,
  },
})
</code></pre><h4>&#x6E90;&#x7801;&#x5206;&#x6790;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/core/dispatchRequest.js  -  44&#x884C;

  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/core/dispatchRequest.js  -  44&#x884C;</span>

  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );
</code></pre><h3 id="articleHeader14">&#x5982;&#x4F55;&#x53D6;&#x6D88;&#x5DF2;&#x7ECF;&#x53D1;&#x9001;&#x7684;&#x8BF7;&#x6C42;</h3><h4>&#x5982;&#x4F55;&#x4F7F;&#x7528;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import axios from &apos;axios&apos;

// &#x7B2C;&#x4E00;&#x79CD;&#x53D6;&#x6D88;&#x65B9;&#x6CD5;
axios.get(url, {
  cancelToken: new axios.CancelToken(cancel =&gt; {
    if (/* &#x53D6;&#x6D88;&#x6761;&#x4EF6; */) {
      cancel(&apos;&#x53D6;&#x6D88;&#x65E5;&#x5FD7;&apos;);
    }
  })
});

// &#x7B2C;&#x4E8C;&#x79CD;&#x53D6;&#x6D88;&#x65B9;&#x6CD5;
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axios.get(url, {
  cancelToken: source.token
});
source.cancel(&apos;&#x53D6;&#x6D88;&#x65E5;&#x5FD7;&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>

<span class="hljs-comment">// &#x7B2C;&#x4E00;&#x79CD;&#x53D6;&#x6D88;&#x65B9;&#x6CD5;</span>
axios.get(url, {
  <span class="hljs-attr">cancelToken</span>: <span class="hljs-keyword">new</span> axios.CancelToken(<span class="hljs-function"><span class="hljs-params">cancel</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-comment">/* &#x53D6;&#x6D88;&#x6761;&#x4EF6; */</span>) {
      cancel(<span class="hljs-string">&apos;&#x53D6;&#x6D88;&#x65E5;&#x5FD7;&apos;</span>);
    }
  })
});

<span class="hljs-comment">// &#x7B2C;&#x4E8C;&#x79CD;&#x53D6;&#x6D88;&#x65B9;&#x6CD5;</span>
<span class="hljs-keyword">const</span> CancelToken = axios.CancelToken;
<span class="hljs-keyword">const</span> source = CancelToken.source();
axios.get(url, {
  <span class="hljs-attr">cancelToken</span>: source.token
});
source.cancel(<span class="hljs-string">&apos;&#x53D6;&#x6D88;&#x65E5;&#x5FD7;&apos;</span>);
</code></pre><h4>&#x6E90;&#x7801;&#x5206;&#x6790;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /cancel/CancelToken.js  -  11&#x884C;
function CancelToken(executor) {
 
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      return;
    }
    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

// /lib/adapters/xhr.js  -  159&#x884C;
if (config.cancelToken) {
    config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
            return;
        }
        request.abort();
        reject(cancel);
        request = null;
    });
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /cancel/CancelToken.js  -  11&#x884C;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CancelToken</span>(<span class="hljs-params">executor</span>) </span>{
 
  <span class="hljs-keyword">var</span> resolvePromise;
  <span class="hljs-keyword">this</span>.promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">promiseExecutor</span>(<span class="hljs-params">resolve</span>) </span>{
    resolvePromise = resolve;
  });
  <span class="hljs-keyword">var</span> token = <span class="hljs-keyword">this</span>;
  executor(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cancel</span>(<span class="hljs-params">message</span>) </span>{
    <span class="hljs-keyword">if</span> (token.reason) {
      <span class="hljs-keyword">return</span>;
    }
    token.reason = <span class="hljs-keyword">new</span> Cancel(message);
    resolvePromise(token.reason);
  });
}

<span class="hljs-comment">// /lib/adapters/xhr.js  -  159&#x884C;</span>
<span class="hljs-keyword">if</span> (config.cancelToken) {
    config.cancelToken.promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onCanceled</span>(<span class="hljs-params">cancel</span>) </span>{
        <span class="hljs-keyword">if</span> (!request) {
            <span class="hljs-keyword">return</span>;
        }
        request.abort();
        reject(cancel);
        request = <span class="hljs-literal">null</span>;
    });
}
</code></pre><p>&#x53D6;&#x6D88;&#x529F;&#x80FD;&#x7684;&#x6838;&#x5FC3;&#x662F;&#x901A;&#x8FC7;CancelToken&#x5185;&#x7684;<code>this.promise = new Promise(resolve =&gt; resolvePromise = resolve)</code>&#xFF0C;<br>&#x5F97;&#x5230;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;<code>promise</code>&#xFF0C;&#x6B64;&#x65F6;&#x8BE5;<code>promise</code>&#x7684;&#x72B6;&#x6001;&#x4E3A;<code>pending</code><br>&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x5728;<code>/lib/adapters/xhr.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x7EE7;&#x7EED;&#x7ED9;&#x8FD9;&#x4E2A;<code>promise</code>&#x5B9E;&#x4F8B;&#x6DFB;&#x52A0;<code>.then</code>&#x65B9;&#x6CD5;<br>&#xFF08;<code>xhr.js</code>&#x6587;&#x4EF6;&#x7684;159&#x884C;<code>config.cancelToken.promise.then(message =&gt; request.abort())</code>&#xFF09;&#xFF1B;</p><p>&#x5728;<code>CancelToken</code>&#x5916;&#x754C;&#xFF0C;&#x901A;&#x8FC7;<code>executor</code>&#x53C2;&#x6570;&#x62FF;&#x5230;&#x5BF9;<code>cancel</code>&#x65B9;&#x6CD5;&#x7684;&#x63A7;&#x5236;&#x6743;&#xFF0C;<br>&#x8FD9;&#x6837;&#x5F53;&#x6267;&#x884C;<code>cancel</code>&#x65B9;&#x6CD5;&#x65F6;&#x5C31;&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x5B9E;&#x4F8B;&#x7684;<code>promise</code>&#x5C5E;&#x6027;&#x7684;&#x72B6;&#x6001;&#x4E3A;<code>rejected</code>&#xFF0C;<br>&#x4ECE;&#x800C;&#x6267;&#x884C;<code>request.abort()</code>&#x65B9;&#x6CD5;&#x8FBE;&#x5230;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x7684;&#x76EE;&#x7684;&#x3002;</p><p>&#x4E0A;&#x9762;&#x7B2C;&#x4E8C;&#x79CD;&#x5199;&#x6CD5;&#x53EF;&#x4EE5;&#x770B;&#x4F5C;&#x662F;&#x5BF9;&#x7B2C;&#x4E00;&#x79CD;&#x5199;&#x6CD5;&#x7684;&#x5B8C;&#x5584;&#xFF0C;<br>&#x56E0;&#x4E3A;&#x5F88;&#x591A;&#x662F;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x7528;&#x5728;&#x672C;&#x6B21;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#x5916;&#xFF0C;<br>&#x4F8B;&#x5982;&#xFF0C;&#x53D1;&#x9001;A&#x3001;B&#x4E24;&#x4E2A;&#x8BF7;&#x6C42;&#xFF0C;&#x5F53;B&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x53D6;&#x6D88;A&#x8BF7;&#x6C42;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// &#x7B2C;1&#x79CD;&#x5199;&#x6CD5;&#xFF1A;
let source;
axios.get(Aurl, {
  cancelToken: new axios.CancelToken(cancel =&gt; {
    source = cancel;
  })
});
axios.get(Burl)
.then(() =&gt; source(&apos;B&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x4E86;&apos;));

// &#x7B2C;2&#x79CD;&#x5199;&#x6CD5;&#xFF1A;
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axios.get(Aurl, {
  cancelToken: source.token
});
axios.get(Burl)
.then(() =&gt; source.cancel(&apos;B&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x4E86;&apos;));
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// &#x7B2C;1&#x79CD;&#x5199;&#x6CD5;&#xFF1A;</span>
<span class="hljs-keyword">let</span> source;
axios.get(Aurl, {
  <span class="hljs-attr">cancelToken</span>: <span class="hljs-keyword">new</span> axios.CancelToken(<span class="hljs-function"><span class="hljs-params">cancel</span> =&gt;</span> {
    source = cancel;
  })
});
axios.get(Burl)
.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> source(<span class="hljs-string">&apos;B&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x4E86;&apos;</span>));

<span class="hljs-comment">// &#x7B2C;2&#x79CD;&#x5199;&#x6CD5;&#xFF1A;</span>
<span class="hljs-keyword">const</span> CancelToken = axios.CancelToken;
<span class="hljs-keyword">const</span> source = CancelToken.source();
axios.get(Aurl, {
  <span class="hljs-attr">cancelToken</span>: source.token
});
axios.get(Burl)
.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> source.cancel(<span class="hljs-string">&apos;B&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x4E86;&apos;</span>));
</code></pre><p>&#x76F8;&#x5BF9;&#x6765;&#x8BF4;&#xFF0C;&#x6211;&#x66F4;&#x63A8;&#x5D07;&#x7B2C;1&#x79CD;&#x5199;&#x6CD5;&#xFF0C;&#x56E0;&#x4E3A;&#x7B2C;2&#x79CD;&#x5199;&#x6CD5;&#x592A;&#x9690;&#x853D;&#x4E86;&#xFF0C;&#x4E0D;&#x5982;&#x7B2C;&#x4E00;&#x79CD;&#x76F4;&#x89C2;&#x597D;&#x7406;&#x89E3;&#x3002;</p><h5>&#x53D1;&#x73B0;&#x7684;&#x95EE;&#x9898;</h5><ol><li>/lib/adapters/xhr.js&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;onCanceled&#x65B9;&#x6CD5;&#x7684;&#x53C2;&#x6570;&#x4E0D;&#x5E94;&#x8BE5;&#x53EB;message&#x4E48;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x53EB;cancel&#xFF1F;</li><li>/lib/adapters/xhr.js&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;onCanceled&#x65B9;&#x6CD5;&#x91CC;&#xFF0C;reject&#x91CC;&#x5E94;&#x8BE5;&#x5C06;config&#x4FE1;&#x606F;&#x4E5F;&#x4F20;&#x51FA;&#x6765;</li></ol><h3 id="articleHeader15">&#x8DE8;&#x57DF;&#x643A;&#x5E26;cookie</h3><h4>&#x5982;&#x4F55;&#x4F7F;&#x7528;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import axios from &apos;axios&apos;

axios.defaults.withCredentials = true;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>

axios.defaults.withCredentials = <span class="hljs-literal">true</span>;
</code></pre><h4>&#x6E90;&#x7801;&#x5206;&#x6790;</h4><p>&#x6211;&#x4EEC;&#x5728;<a href="#%E7%94%A8%E6%88%B7%E9%85%8D%E7%BD%AE%E7%9A%84config%E6%98%AF%E6%80%8E%E4%B9%88%E8%B5%B7%E4%BD%9C%E7%94%A8%E7%9A%84">&#x7528;&#x6237;&#x914D;&#x7F6E;&#x7684;config&#x662F;&#x600E;&#x4E48;&#x8D77;&#x4F5C;&#x7528;&#x7684;</a>&#x4E00;&#x8282;&#x5DF2;&#x7ECF;&#x4ECB;&#x7ECD;&#x4E86;config&#x5728;axios&#x9879;&#x76EE;&#x91CC;&#x7684;&#x4F20;&#x9012;&#x8FC7;&#x7A0B;&#xFF0C;<br>&#x7531;&#x6B64;&#x5F97;&#x51FA;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;<code>axios.defaults.withCredentials = true</code>&#x505A;&#x7684;&#x914D;&#x7F6E;&#xFF0C;<br>&#x5728;<code>/lib/adapters/xhr.js</code>&#x91CC;&#x662F;&#x53EF;&#x4EE5;&#x53D6;&#x5230;&#x7684;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x914D;&#x7F6E;&#x5230;xhr&#x5BF9;&#x8C61;&#x9879;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var request = new XMLHttpRequest();

// /lib/adapters/xhr.js
if (config.withCredentials) {
  request.withCredentials = true;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">var</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();

<span class="hljs-comment">// /lib/adapters/xhr.js</span>
<span class="hljs-keyword">if</span> (config.withCredentials) {
  request.withCredentials = <span class="hljs-literal">true</span>;
}
</code></pre><h3 id="articleHeader16">&#x8D85;&#x65F6;&#x914D;&#x7F6E;&#x53CA;&#x5904;&#x7406;</h3><h4>&#x5982;&#x4F55;&#x4F7F;&#x7528;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import axios from &apos;axios&apos;

axios.defaults.timeout = 3000;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>

axios.defaults.timeout = <span class="hljs-number">3000</span>;
</code></pre><h4>&#x6E90;&#x7801;&#x5206;&#x6790;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /adapters/xhr.js
request.timeout = config.timeout;

// /adapters/xhr.js
// &#x901A;&#x8FC7;createError&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x5408;&#x4E3A;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;
request.ontimeout = function handleTimeout() {
  reject(createError(&apos;timeout of &apos; + config.timeout + &apos;ms exceeded&apos;, 
    config, &apos;ECONNABORTED&apos;, request));
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /adapters/xhr.js</span>
request.timeout = config.timeout;

<span class="hljs-comment">// /adapters/xhr.js</span>
<span class="hljs-comment">// &#x901A;&#x8FC7;createError&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x5408;&#x4E3A;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;</span>
request.ontimeout = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleTimeout</span>(<span class="hljs-params"></span>) </span>{
  reject(createError(<span class="hljs-string">&apos;timeout of &apos;</span> + config.timeout + <span class="hljs-string">&apos;ms exceeded&apos;</span>, 
    config, <span class="hljs-string">&apos;ECONNABORTED&apos;</span>, request));
};
</code></pre><ul><li>axios&#x5E93;&#x5916;&#x5982;&#x4F55;&#x6DFB;&#x52A0;&#x8D85;&#x65F6;&#x540E;&#x7684;&#x5904;&#x7406;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
axios().catch(error =&gt; {
  const { message } = error;
  if (message.indexOf(&apos;timeout&apos;) &gt; -1){
    // &#x8D85;&#x65F6;&#x5904;&#x7406;
  }
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
axios().catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> { message } = error;
  <span class="hljs-keyword">if</span> (message.indexOf(<span class="hljs-string">&apos;timeout&apos;</span>) &gt; <span class="hljs-number">-1</span>){
    <span class="hljs-comment">// &#x8D85;&#x65F6;&#x5904;&#x7406;</span>
  }
})
</code></pre><h3 id="articleHeader17">&#x6539;&#x5199;&#x9A8C;&#x8BC1;&#x6210;&#x529F;&#x6216;&#x5931;&#x8D25;&#x7684;&#x89C4;&#x5219;validatestatus</h3><p>&#x81EA;&#x5B9A;&#x4E49;http&#x72B6;&#x6001;&#x7801;&#x7684;&#x6210;&#x529F;&#x3001;&#x5931;&#x8D25;&#x8303;&#x56F4;</p><h4>&#x5982;&#x4F55;&#x4F7F;&#x7528;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import axios from &apos;axios&apos;

axios.defaults.validateStatus = status =&gt; status &gt;= 200 &amp;&amp; status &lt; 300;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>

axios.defaults.validateStatus = <span class="hljs-function"><span class="hljs-params">status</span> =&gt;</span> status &gt;= <span class="hljs-number">200</span> &amp;&amp; status &lt; <span class="hljs-number">300</span>;
</code></pre><h4>&#x6E90;&#x7801;&#x5206;&#x6790;</h4><p>&#x5728;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x4E2D;&#xFF0C;&#x5B9A;&#x4E49;&#x4E86;&#x9ED8;&#x8BA4;&#x7684;http&#x72B6;&#x6001;&#x7801;&#x9A8C;&#x8BC1;&#x89C4;&#x5219;&#xFF0C;<br>&#x6240;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;<code>validateStatus</code>&#x5176;&#x5B9E;&#x662F;&#x5BF9;&#x6B64;&#x5904;&#x65B9;&#x6CD5;&#x7684;&#x91CD;&#x5199;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// `/lib/defaults.js`
var defaults = {
  // ...
  validateStatus: function validateStatus(status) {
    return status &gt;= 200 &amp;&amp; status &lt; 300;
  },
  // ...
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// `/lib/defaults.js`</span>
<span class="hljs-keyword">var</span> defaults = {
  <span class="hljs-comment">// ...</span>
  validateStatus: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">validateStatus</span>(<span class="hljs-params">status</span>) </span>{
    <span class="hljs-keyword">return</span> status &gt;= <span class="hljs-number">200</span> &amp;&amp; status &lt; <span class="hljs-number">300</span>;
  },
  <span class="hljs-comment">// ...</span>
}
</code></pre><p>axios&#x662F;&#x4F55;&#x65F6;&#x5F00;&#x59CB;&#x9A8C;&#x8BC1;http&#x72B6;&#x6001;&#x7801;&#x7684;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/adapters/xhr.js
var request = new XMLHttpRequest();
var loadEvent = &apos;onreadystatechange&apos;;

// /lib/adapters/xhr.js
// &#x6BCF;&#x5F53; readyState &#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x5C31;&#x4F1A;&#x89E6;&#x53D1; onreadystatechange &#x4E8B;&#x4EF6;
request[loadEvent] = function handleLoad() {
  if (!request || (request.readyState !== 4 &amp;&amp; !xDomain)) {
    return;
  }
  // ...&#x7701;&#x7565;&#x4EE3;&#x7801;
  var response = {
      // ...
      // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
      status: request.status === 1223 ? 204 : request.status,
      config: config,
  };
  settle(resolve, reject, response);
  // ...&#x7701;&#x7565;&#x4EE3;&#x7801;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/adapters/xhr.js</span>
<span class="hljs-keyword">var</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
<span class="hljs-keyword">var</span> loadEvent = <span class="hljs-string">&apos;onreadystatechange&apos;</span>;

<span class="hljs-comment">// /lib/adapters/xhr.js</span>
<span class="hljs-comment">// &#x6BCF;&#x5F53; readyState &#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x5C31;&#x4F1A;&#x89E6;&#x53D1; onreadystatechange &#x4E8B;&#x4EF6;</span>
request[loadEvent] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleLoad</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (!request || (request.readyState !== <span class="hljs-number">4</span> &amp;&amp; !xDomain)) {
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-comment">// ...&#x7701;&#x7565;&#x4EE3;&#x7801;</span>
  <span class="hljs-keyword">var</span> response = {
      <span class="hljs-comment">// ...</span>
      <span class="hljs-comment">// IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)</span>
      status: request.status === <span class="hljs-number">1223</span> ? <span class="hljs-number">204</span> : request.status,
      <span class="hljs-attr">config</span>: config,
  };
  settle(resolve, reject, response);
  <span class="hljs-comment">// ...&#x7701;&#x7565;&#x4EE3;&#x7801;</span>
}
</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// /lib/core/settle.js
function settle(resolve, reject, response) {
  // &#x5982;&#x679C;&#x6211;&#x4EEC;&#x5F80;&#x4E0A;&#x6363;&#x4E00;&#x6363;&#x5C31;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;config&#x5BF9;&#x8C61;&#x7684;validateStatus&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x81EA;&#x5B9A;&#x4E49;&#x7684;validateStatus&#x65B9;&#x6CD5;&#x6216;&#x9ED8;&#x8BA4;&#x7684;validateStatus&#x65B9;&#x6CD5;
  var validateStatus = response.config.validateStatus;
  // validateStatus&#x9A8C;&#x8BC1;&#x901A;&#x8FC7;&#xFF0C;&#x5C31;&#x4F1A;&#x89E6;&#x53D1;resolve&#x65B9;&#x6CD5;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      &apos;Request failed with status code &apos; + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// /lib/core/settle.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">settle</span>(<span class="hljs-params">resolve, reject, response</span>) </span>{
  <span class="hljs-comment">// &#x5982;&#x679C;&#x6211;&#x4EEC;&#x5F80;&#x4E0A;&#x6363;&#x4E00;&#x6363;&#x5C31;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;config&#x5BF9;&#x8C61;&#x7684;validateStatus&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x81EA;&#x5B9A;&#x4E49;&#x7684;validateStatus&#x65B9;&#x6CD5;&#x6216;&#x9ED8;&#x8BA4;&#x7684;validateStatus&#x65B9;&#x6CD5;</span>
  <span class="hljs-keyword">var</span> validateStatus = response.config.validateStatus;
  <span class="hljs-comment">// validateStatus&#x9A8C;&#x8BC1;&#x901A;&#x8FC7;&#xFF0C;&#x5C31;&#x4F1A;&#x89E6;&#x53D1;resolve&#x65B9;&#x6CD5;</span>
  <span class="hljs-keyword">if</span> (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } <span class="hljs-keyword">else</span> {
    reject(createError(
      <span class="hljs-string">&apos;Request failed with status code &apos;</span> + response.status,
      response.config,
      <span class="hljs-literal">null</span>,
      response.request,
      response
    ));
  }
};
</code></pre><h3 id="articleHeader18">&#x603B;&#x7ED3;</h3><p>axios&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x91CC;&#xFF0C;&#x6709;&#x5F88;&#x591A;&#x5BF9;JS&#x4F7F;&#x7528;&#x5F88;&#x5DE7;&#x5999;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6BD4;&#x5982;&#x5BF9;promise&#x7684;&#x4E32;&#x8054;&#x64CD;&#x4F5C;&#xFF08;&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x8BF4;&#x8FD9;&#x5757;&#x662F;&#x501F;&#x9274;&#x5F88;&#x591A;&#x5F02;&#x6B65;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#xFF09;,&#x8BA9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F88;&#x65B9;&#x4FBF;&#x5BF9;&#x8BF7;&#x6C42;&#x524D;&#x540E;&#x7684;&#x5404;&#x79CD;&#x5904;&#x7406;&#x65B9;&#x6CD5;&#x7684;&#x6D41;&#x7A0B;&#x8FDB;&#x884C;&#x63A7;&#x5236;&#xFF1B;&#x5F88;&#x591A;&#x5B9E;&#x7528;&#x7684;&#x5C0F;&#x4F18;&#x5316;&#xFF0C;&#x6BD4;&#x5982;&#x8BF7;&#x6C42;&#x524D;&#x540E;&#x7684;&#x6570;&#x636E;&#x5904;&#x7406;&#xFF0C;&#x7701;&#x4E86;&#x7A0B;&#x5E8F;&#x5458;&#x4E00;&#x904D;&#x4E00;&#x904D;&#x53BB;&#x5199;JSON.xxx&#x4E86;&#xFF1B;&#x540C;&#x65F6;&#x652F;&#x6301;&#x4E86;&#x6D4F;&#x89C8;&#x5668;&#x548C;node&#x4E24;&#x79CD;&#x73AF;&#x5883;&#xFF0C;&#x5BF9;&#x4F7F;&#x7528;node&#x7684;&#x9879;&#x76EE;&#x6765;&#x8BF4;&#x65E0;&#x7591;&#x662F;&#x6781;&#x597D;&#x7684;&#x3002;</p><p>&#x603B;&#x4E4B;&#xFF0C;&#x8FD9;&#x4E2A;&#x80FD;&#x591F;&#x5728;github&#x65A9;&#x83B7;42K+&#xFF08;&#x622A;&#x6B62;2018.05.27&#xFF09;&#x7684;star&#xFF0C;&#x5B9E;&#x529B;&#x7EDD;&#x4E0D;&#x662F;&#x76D6;&#x7684;&#xFF0C;&#x503C;&#x5F97;&#x597D;&#x597D;&#x4EA4;&#x4EA4;&#x5FC3;&#xFF01;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Axios源码深度剖析 - AJAX新王者

## 原文链接
[https://segmentfault.com/a/1190000015050441](https://segmentfault.com/a/1190000015050441)

