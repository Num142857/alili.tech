---
title: vue-cli + webpack 多页面实例配置优化方法
reprint: true
categories: reprint
abbrlink: 9a74ca55
date: 2018-10-29 02:30:09
---

{{% raw %}}
<h2 id="articleHeader0">vue+webpack&#x662F;&#x5426;&#x6709;&#x591A;&#x9875;&#x9762;</h2><p>&#x76EE;&#x524D;&#x4F7F;&#x7528;vue&#x6765;&#x505A;&#x9879;&#x76EE;&#xFF0C;&#x4F30;&#x8BA1;&#x5927;&#x90E8;&#x5206;&#x90FD;&#x662F;&#x5355;&#x9875;&#x9762;&#xFF08;SPA&#xFF09;&#x5E94;&#x7528;&#xFF0C;&#x4E00;&#x4E2A;&#x8F7B;&#x578B;&#x7684; MVVM &#x6846;&#x67B6;&#xFF0C;&#x8C01;&#x7528;&#x4E86;MVVM&#x6846;&#x67B6;&#xFF0C;&#x5C31;&#x518D;&#x4E5F;&#x56DE;&#x4E0D;&#x53BB;JQ&#x65F6;&#x4EE3;&#x4E86;&#xFF0C;&#x54C8;&#x54C8;&#x3002;</p><p>&#x5728;&#x624B;&#x673A;&#x7AEF;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x4F7F;&#x7528;vue + vue-router&#x662F;high&#x5230;&#x7206;&#xFF0C;&#x4E0D;&#x4EC5;&#x4EC5;&#x662F;&#x6211;&#x4EEC;&#x5F00;&#x53D1;&#x7684;&#x800C;&#x8A00;&#xFF0C;&#x6700;&#x4E3B;&#x8981;&#x7684;&#x7528;&#x6237;&#x4F53;&#x68C0;&#x4E5F;&#x662F;&#x5F00;&#x8DB3;&#x9A6C;&#x529B;&#xFF0C;&#x4F53;&#x68C0;&#x611F;&#x6760;&#x6760;&#x7684;&#x3002;</p><p>&#x90A3;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x4F7F;&#x7528;vue+webpack&#x7684;&#x5355;&#x9875;&#x9762;&#x662F;&#x723D;&#x5230;&#x7206;&#xFF0C;&#x90A3;&#x5982;&#x679C;&#x662F;&#x591A;&#x9875;&#x9762;&#x4E5F;&#x80FD;&#x4E0D;&#x80FD;high&#x5230;&#x7206;&#x5462;&#xFF1F;&#x90A3;&#x5F53;&#x7136;&#x5440;&#xFF0C;&#x5FC5;&#x987B;&#x7684;&#x5FC5;&#xFF0C;vue&#x3001;webpack&#x7684;&#x5FE0;&#x7C89;&#xFF08;&#x54C8;&#x54C8;&#xFF0C;&#x597D;&#x50CF;&#x8FD9;&#x5FE0;&#x7C89;&#x4E0D;&#x5173;&#x7CFB;&#x5230;&#x591A;&#x9875;&#x9762;&#x7684;&#xFF09;&#x3002;</p><p>&#x5728;&#x8C37;&#x6B4C;&#x627E;vue &#x591A;&#x9875;&#x9762;&#xFF0C;&#x5B9E;&#x4F8B;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x5C11;&#xFF0C;&#x529F;&#x592B;&#x4E0D;&#x8D1F;&#x6709;&#x5FC3;&#x4EBA;&#xFF0C;&#x5728;yaoyao1987&#x90A3;&#x627E;&#x5230;&#x4E86;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x5230;&#x8FD9;&#x4E2A;<a href="https://github.com/yaoyao1987/vue-cli-multipage" rel="nofollow noreferrer" target="_blank">yaoyao1987 github</a>&#xFF0C;&#x975E;&#x5E38;&#x611F;&#x8C22;yaoyao1987&#x7AE5;&#x978B;&#xFF0C;&#x4ECA;&#x5929;&#x8981;&#x8BB2;&#x7684;&#x5185;&#x5BB9;&#x662F;&#x57FA;&#x4E8E;yaoyao1987&#x7AE5;&#x978B;&#x7684;&#x591A;&#x9875;&#x9762;&#x5B9E;&#x4F8B;&#x4E0A;&#x518D;&#x4F18;&#x5316;&#x7684;&#x3002;</p><h2 id="articleHeader1">&#x4F18;&#x5316;&#x4E86;&#x70B9;&#x5565;</h2><h3 id="articleHeader2">demo&#x3001;github&#x5730;&#x5740;</h3><p>1&#x3001;demo&#xFF1A;<a href="http://v.lanchenglv.com/demo/vue-cli-multi-page/module/login.html" rel="nofollow noreferrer" target="_blank">http://v.lanchenglv.com/demo/...</a><br>2&#x3001;github&#xFF1A;<a href="https://github.com/bluefox1688/vue-cli-multi-page" rel="nofollow noreferrer" target="_blank">https://github.com/bluefox168...</a></p><h3 id="articleHeader3">&#x4F18;&#x5316;&#x7684;&#x5185;&#x5BB9;</h3><p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x8BB2;&#x8BB2;&#xFF0C;&#x5177;&#x4F53;&#x6211;&#x4EEC;&#x4F18;&#x5316;&#x4E86;&#x4EC0;&#x4E48;&#x5185;&#x5BB9;&#x3002;</p><ol><li><p>&#x589E;&#x52A0;&#x5168;&#x5C40;&#x7EDF;&#x4E00;&#x4F7F;&#x7528;&#x7684;&#x6A21;&#x5757;<code>Lib.js</code>&#x5E93;&#xFF0C;&#x53EF;&#x80FD;&#x8FD9;&#x91CC;&#x770B;&#x4E0D;&#x660E;&#x767D;&#xFF0C;&#x4E0D;&#x8981;&#x7D27;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x8BB2;&#x5230;&#x3002;</p></li><li><p>&#x652F;&#x6301;&#x5B57;&#x4F53;&#x56FE;&#x6807;</p></li><li><p>&#x589E;&#x52A0;&#x5E72;&#x51C0;&#x7684;&#x9875;&#x9762;&#x3001;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x590D;&#x5236;&#x5373;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x3002;</p></li><li><p>&#x53BB;&#x6389;&#x591A;&#x4F59;&#x7684;&#x4EE3;&#x7801;&#x6CE8;&#x91CA;&#xFF0C;&#x5751;&#x4E86;&#x6211;&#x7684;&#x6CE8;&#x91CA;&#xFF0C;&#x522B;&#x518D;&#x5751;&#x4EBA;&#x4E86;</p></li><li><p>&#x6784;&#x5EFA;&#x65F6;&#xFF0C;&#x589E;&#x52A0;&#x5BF9;css&#x6253;&#x5305;&#x7684;&#x652F;&#x6301;</p></li><li><p>&#x63D0;&#x53D6;&#x516C;&#x5171;&#x6A21;&#x5757;<br>........</p></li></ol><h2 id="articleHeader4">&#x4F7F;&#x7528;&#x65B9;&#x6CD5;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x5B89;&#x88C5;
npm install

# &#x8C03;&#x8BD5;&#x73AF;&#x5883; serve with hot reload at http://localhost:8083/module/login.html
npm run dev

# &#x751F;&#x4EA7;&#x73AF;&#x5883; build for production with minification
npm run build
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># &#x5B89;&#x88C5;</span>
npm install

<span class="hljs-comment"># &#x8C03;&#x8BD5;&#x73AF;&#x5883; serve with hot reload at http://localhost:8083/module/login.html</span>
npm run dev

<span class="hljs-comment"># &#x751F;&#x4EA7;&#x73AF;&#x5883; build for production with minification</span>
npm run build
</code></pre><p>&#x672C;&#x5730;&#x9ED8;&#x8BA4;&#x8BBF;&#x95EE;&#x7AEF;&#x53E3;&#x4E3A;8083&#xFF0C;&#x9700;&#x8981;&#x66F4;&#x6539;&#x7684;&#x7AE5;&#x978B;&#x8BF7;&#x5230;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x6587;&#x4EF6;<code>config.js</code>&#x4FEE;&#x6539;&#x3002;</p><h3 id="articleHeader5">&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack
 |---build
   |---src
     |---assets &#x8D44;&#x6E90;
          |---css.css  css
         |---img  &#x56FE;&#x7247;&#x6587;&#x4EF6;
         |---font/  &#x5B57;&#x4F53;&#x56FE;&#x6807;
     |---components &#x7EC4;&#x4EF6;
           |---Button.vue  &#x6309;&#x94AE;&#x7EC4;&#x4EF6;
          |---module-head.vue  head&#x7EC4;&#x4EF6;
     |---module&#x5404;&#x4E2A;&#x9875;&#x9762;&#x6A21;&#x5757;
       |---login    &#x767B;&#x9646;&#x6A21;&#x5757;
         |---login.html
         |---login.js
         |---app.vue
       |---welcome       &#x6B22;&#x8FCE;&#x9875;&#x6A21;&#x5757;
         |---welcome.html
         |---welcome.js
         |---app.vue" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code>webpack
 <span class="hljs-string">|---build</span>
   <span class="hljs-string">|---src</span>
     <span class="hljs-string">|---assets &#x8D44;&#x6E90;</span>
          <span class="hljs-string">|---css.css  css</span>
         <span class="hljs-string">|---img  &#x56FE;&#x7247;&#x6587;&#x4EF6;</span>
         <span class="hljs-string">|---font/  &#x5B57;&#x4F53;&#x56FE;&#x6807;</span>
     <span class="hljs-string">|---components &#x7EC4;&#x4EF6;</span>
           <span class="hljs-string">|---Button.vue  &#x6309;&#x94AE;&#x7EC4;&#x4EF6;</span>
          <span class="hljs-string">|---module-head.vue  head&#x7EC4;&#x4EF6;</span>
     <span class="hljs-string">|---module&#x5404;&#x4E2A;&#x9875;&#x9762;&#x6A21;&#x5757;</span>
       <span class="hljs-string">|---login    &#x767B;&#x9646;&#x6A21;&#x5757;</span>
         <span class="hljs-string">|---login.html</span>
         <span class="hljs-string">|---login.js</span>
         <span class="hljs-string">|---app.vue</span>
       <span class="hljs-string">|---welcome       &#x6B22;&#x8FCE;&#x9875;&#x6A21;&#x5757;</span>
         <span class="hljs-string">|---welcome.html</span>
         <span class="hljs-string">|---welcome.js</span>
         <span class="hljs-string">|---app.vue</span></code></pre><p>&#x4ECE;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x4E0A;&#xFF0C;&#x5404;&#x79CD;&#x7EC4;&#x4EF6;&#x3001;&#x9875;&#x9762;&#x6A21;&#x5757;&#x3001;&#x8D44;&#x6E90;&#x7B49;&#x90FD;&#x6309;&#x7C7B;&#x65B0;&#x5EFA;&#x4E86;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x65B9;&#x4FBF;&#x6211;&#x4EEC;&#x50A8;&#x5B58;&#x6587;&#x4EF6;&#x3002;<br>&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x6240;&#x6709;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x6700;&#x4E3B;&#x8981;&#x90FD;&#x662F;&#x653E;&#x5728;<code>module</code>&#x6587;&#x4EF6;&#x5939;&#x91CC;&#xFF0C;&#x4EE5;&#x6587;&#x4EF6;&#x5939;&#x540D;&#x4E3A;html&#x7684;&#x540D;&#x79F0;&#x3002;<br>&#x4F8B;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" |---login    &#x767B;&#x9646;&#x6A21;&#x5757;
   |---login.html
   |---login.js
   |---app.vue" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="stylus hljs"><code class="stylus"> |---login    &#x767B;&#x9646;&#x6A21;&#x5757;
   |---login<span class="hljs-selector-class">.html</span>
   |---login<span class="hljs-selector-class">.js</span>
   |---app.vue</code></pre><p>&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x8BBF;&#x95EE;&#x65F6;&#x7684;&#x5730;&#x5740;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:8083/module/login.html" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="stylus hljs"><code class="stylus" style="word-break:break-word;white-space:initial">http:<span class="hljs-comment">//localhost:8083/module/login.html</span></code></pre><p>&#x8FD9;&#x91CC;&#x4E00;&#x5B9A;&#x8981;&#x8BB0;&#x4F4F;&#xFF0C;&#x5728;<code>module</code>&#x91CC;&#x4E0B;&#x7EA7;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x5C31;&#x662F;&#x4E00;&#x4E2A;html&#xFF0C;<code>js</code>&#x3001;<code>vue template</code> &#x90FD;&#x7EDF;&#x4E00;&#x653E;&#x5728;&#x5F53;&#x524D;&#x6587;&#x4EF6;&#x5939;&#x91CC;&#xFF0C;&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x7EE7;&#x7EED;&#x653E;&#x5176;&#x4ED6;&#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x4F8B;&#x5982;css&#x3001;&#x56FE;&#x7247;&#x7B49;&#xFF0C;webpack&#x4F1A;&#x6253;&#x5305;&#x5230;&#x5F53;&#x524D;&#x9875;&#x9762;&#x91CC;&#x3002;<br>&#x5982;&#x679C;&#x9879;&#x76EE;&#x4E0D;&#x9700;&#x8981;&#x8FD9;&#x4E2A;&#x9875;&#x9762;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x628A;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x76F4;&#x63A5;&#x5220;&#x9664;&#x6389;&#xFF0C;&#x5E72;&#x51C0;&#x9879;&#x76EE;&#xFF0C;&#x5E72;&#x6D3B;&#x4E5F;&#x5F00;&#x5FC3;&#x3002;<br>&#x50CF;&#x4EE5;&#x524D;&#x6211;&#x4EEC;&#x4F20;&#x7EDF;&#x5F00;&#x53D1;&#x9879;&#x76EE;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x56FE;&#x7247;&#x90FD;&#x4E60;&#x60EF;&#x653E;&#x5728;<code>images</code>&#x91CC;&#xFF0C;&#x5F53;&#x9879;&#x76EE;&#x6709;&#x6539;&#x52A8;&#x65F6;&#xFF0C;&#x6709;&#x4E9B;&#x56FE;&#x7247;&#x7B49;&#x8D44;&#x6E90;&#x7528;&#x4E0D;&#x4E0A;&#x4E86;&#xFF0C;&#x4F46;&#x8FD8;&#x5360;&#x7740;&#x5751;&#x4F4D;&#xFF0C;&#x867D;&#x7136;&#x73B0;&#x5728;&#x7684;&#x786C;&#x4EF6;&#x5BB9;&#x91CF;&#x5927;&#x5230;&#x60CA;&#x4EBA;&#xFF0C;&#x4F46;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x8FD8;&#x662F;&#x8981;&#x517B;&#x5230;&#x4E00;&#x4E2A;&#x826F;&#x597D;&#x7684;&#x4E60;&#x60EF;&#x3002;<br>&#x5F53;&#x524D;&#x9875;&#x9762;&#x7684;&#x5F00;&#x53D1;&#x5728;<code>app.vue</code>&#x91CC;&#xFF0C;&#x6253;&#x5F00;&#x540E;&#x4F60;&#x5C31;&#x4F1A;&#x770B;&#x5230;&#x5F88;&#x719F;&#x6089;&#x7684;<code>&lt;template&gt;</code>&#x3001;<code>&lt;script&gt;</code>&#x3001;<code>&lt;style scoped&gt;</code>&#x4E86;&#x3002;</p><h3 id="articleHeader6">&#x5168;&#x5C40;&#x7EDF;&#x4E00;&#x516C;&#x5171;&#x6A21;&#x5757;</h3><p>&#x6211;&#x4EEC;&#x505A;&#x591A;&#x9875;&#x9762;&#x5F00;&#x53D1;&#xFF0C;&#x90A3;&#x80AF;&#x5B9A;&#x4F1A;&#x6D89;&#x53CA;&#x5230;&#x5168;&#x5C40;&#x90FD;&#x80FD;&#x8C03;&#x7528;&#x7684;&#x516C;&#x5171;&#x5E93;&#xFF0C;&#x6216;&#x8005;&#x662F;&#x628A;&#x522B;&#x4EBA;&#x5C01;&#x88C5;&#x7684;&#x5E93;&#x4E5F;&#x4E00;&#x8D77;&#x6253;&#x5305;&#x5728;&#x5168;&#x5C40;&#x516C;&#x5171;&#x6A21;&#x5757;&#x91CC;&#x3002;</p><p>&#x5982;&#x679C;&#x770B;&#x8FC7;&#x6E90;&#x7801;&#x7684;&#x7AE5;&#x978B;&#xFF0C;&#x5728;<code>*.vue</code>&#x9875;&#x9762;&#x91CC;&#xFF0C;&#x6211;&#x90FD;&#x7EDF;&#x4E00;import&#x4E86;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Lib from &apos;assets/Lib.js&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> Lib <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;assets/Lib.js&apos;</span></code></pre><p>&#x8FD9;&#x5C31;&#x662F;&#x5168;&#x5C40;&#x7EDF;&#x4E00;&#x516C;&#x5171;&#x6A21;&#x5757;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x770B;&#x770B;<code>Lib.js</code>&#x91CC;&#x7684;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x5BFC;&#x5165;&#x5168;&#x5C40;&#x7684;css
import &apos;assets/css.css&apos;;
# &#x5BFC;&#x5165;&#x5168;&#x5C40;&#x7684;&#x7AD9;&#x70B9;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
import C from &apos;assets/conf&apos;;
# &#x5BFC;&#x5165;&#x5168;&#x5C40;&#x7684;&#x5171;&#x7528;&#x4E8B;&#x4EF6;
import M from &apos;assets/common&apos;;

var Rxports = {
    M,C
};

module.exports = Rxports
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># &#x5BFC;&#x5165;&#x5168;&#x5C40;&#x7684;css</span>
import <span class="hljs-string">&apos;assets/css.css&apos;</span>;
<span class="hljs-comment"># &#x5BFC;&#x5165;&#x5168;&#x5C40;&#x7684;&#x7AD9;&#x70B9;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</span>
import C from <span class="hljs-string">&apos;assets/conf&apos;</span>;
<span class="hljs-comment"># &#x5BFC;&#x5165;&#x5168;&#x5C40;&#x7684;&#x5171;&#x7528;&#x4E8B;&#x4EF6;</span>
import M from <span class="hljs-string">&apos;assets/common&apos;</span>;

var Rxports = {
    M,C
};

module.exports = Rxports
</code></pre><p>&#x5728;&#x4E0A;&#x65B9;&#x4EE3;&#x7801;&#x7684;<code>M</code>&#x3001;<code>C</code>&#x90FD;&#x662F;&#x4EC0;&#x4E48;&#x9B3C;&#xFF0C;&#x806A;&#x660E;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x5C31;&#x77E5;&#x9053;&#x6211;&#x60F3;&#x5E72;&#x561B;&#x4E86;&#xFF0C;&#x7701;&#x5199;&#x5C11;&#x4E8B;&#x5457;&#x3002;<br>&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x60F3;&#x8C03;&#x7528;APP&#x7684;&#x540D;&#x79F0;&#xFF0C;&#x5728;<code>.vue</code>&#x91CC;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x5199;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Lib from &apos;assets/Lib.js&apos;
Lib.C.appname;  # &#x84DD;&#x9505;&#x9505;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">import Lib from <span class="hljs-string">&apos;assets/Lib.js&apos;</span>
Lib.C.appname;  <span class="hljs-comment"># &#x84DD;&#x9505;&#x9505;</span></code></pre><p>&#x53EA;&#x9700;&#x8981;&#x5728;<code>*.vue</code>&#x91CC;&#x5BFC;&#x5165;<code>import Lib from &apos;assets/Lib.js&apos;</code>&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5230;&#x5904;&#x4F7F;&#x7528;&#x5168;&#x5C40;&#x6A21;&#x5757;&#x4E86;&#x3002;<br>&#x4E0D;&#x518D;&#x50CF;&#x4F20;&#x7EDF;&#x7684;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#xFF0C;&#x9700;&#x8981;&#x4E00;&#x5806;&#x7684;<code>&lt;script&gt;</code>&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x7684;&#x6765;&#x653E;&#x5230;&#x9875;&#x9762;&#x7684;&#x5E95;&#x90E8;&#x3002;<br>&#x4F20;&#x7EDF;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;script type=&apos;text/javascript&apos; src=&apos;//g.alicdn.com/sj/lib/zepto/zepto.min.js&apos; charset=&apos;utf-8&apos;&gt;&lt;/script&gt;
&gt;&lt;/script&gt;
  &lt;script type=&apos;text/javascript&apos; src=&apos;//g.alicdn.com/msui/sm/0.6.2/js/sm.min.js&apos; charset=&apos;utf-8&apos;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;http://res.wx.qq.com/open/js/jweixin-1.0.0.js&quot;&gt;&lt;/script&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="stylus hljs"><code class="stylus">
&lt;script type=<span class="hljs-string">&apos;text/javascript&apos;</span> src=<span class="hljs-string">&apos;//g.alicdn.com/sj/lib/zepto/zepto.min.js&apos;</span> charset=<span class="hljs-string">&apos;utf-8&apos;</span>&gt;&lt;/script&gt;
&gt;&lt;/script&gt;
  &lt;script type=<span class="hljs-string">&apos;text/javascript&apos;</span> src=<span class="hljs-string">&apos;//g.alicdn.com/msui/sm/0.6.2/js/sm.min.js&apos;</span> charset=<span class="hljs-string">&apos;utf-8&apos;</span>&gt;&lt;/script&gt;
&lt;script type=<span class="hljs-string">&quot;text/javascript&quot;</span> src=<span class="hljs-string">&quot;http://res.wx.qq.com/open/js/jweixin-1.0.0.js&quot;</span>&gt;&lt;/script&gt;

</code></pre><p>&#x8FD9;&#x91CC;&#x5C31;&#x662F;&#x6211;&#x60F3;&#x8BB2;&#x7684;&#x5173;&#x4E8E;&#x4F18;&#x5316;&#x7684;&#x7B2C;&#x4E00;&#x70B9;&#x63D0;&#x5230;&#x7684;&#x5168;&#x5C40;&#x6A21;&#x5757;&#x5E93;&#x3002;<br>&#x5F53;&#x7136;&#x4E5F;&#x6709;&#x7AE5;&#x978B;&#x95EE;&#x5440;&#xFF0C;&#x4F1A;&#x4E0D;&#x4F1A;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x4F1A;&#x628A;&#x8FD9;&#x4E9B;&#x5168;&#x5C40;&#x6A21;&#x5757;&#x5E93;&#x90FD;&#x6253;&#x5305;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#xFF0C;&#x90A3;JS&#x6587;&#x4EF6;&#x4F53;&#x79EF;&#x5927;&#x5230;&#x60CA;&#x4EBA;&#x3002;<br>&#x54CE;&#x5440;&#xFF0C;&#x4F60;&#x5F53;<code>webpack</code>&#x662F;&#x4E8C;&#x8D27;&#x7684;&#x5440;&#xFF0C;<code>webpack</code>&#x4F1A;&#x81EA;&#x52A8;&#x5E2E;&#x4F60;&#x5904;&#x7406;&#x597D;&#x7684;&#xFF0C;&#x4F1A;&#x628A;&#x5728;<code>*.vue</code>&#x91CC;&#x7684;<code>import Lib from &apos;assets/Lib.js&apos;</code>&#x7684;&#x5E93;&#x81EA;&#x52A8;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#xFF0C;&#x653E;&#x5230;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x7684;JS&#x6587;&#x4EF6;&#x91CC;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x81EA;&#x52A8;&#x6784;&#x9020;&#x7684;&#x795E;&#x5947;&#x5440;&#xFF0C;&#x7701;&#x5FC3;&#x7701;&#x7535;&#xFF0C;&#x5988;&#x5988;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x6211;&#x505A;&#x91CD;&#x590D;&#x7684;&#x5DE5;&#x4F5C;&#x4E86;&#x3002;</p><p>&#x5728;<code>Lib.js</code>&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x770B;&#x5230;&#x6709;&#x4E24;&#x4E2A;&#x5BFC;&#x5165;&#x7684;JS&#x6587;&#x4EF6;&#xFF0C;&#x4E3B;&#x8981;&#x6765;&#x505A;&#x4EC0;&#x4E48;&#x7684;&#x5462;&#xFF1F;<br>&#x4E3A;&#x4E86;&#x66F4;&#x597D;&#x7684;&#x5728;&#x5168;&#x5C40;&#x8C03;&#x7528;&#x6A21;&#x5757;&#x91CC;&#xFF0C;&#x77E5;&#x9053;&#x54EA;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x53E6;&#x5916;&#x5728;&#x5199;&#x4EE3;&#x7801;&#x65F6;&#x66F4;&#x80FD;&#x5FEB;&#x901F;&#x67E5;&#x627E;&#x5230;JS&#x6587;&#x4EF6;&#xFF0C;&#x6211;&#x533A;&#x5206;&#x4E86;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x548C;&#x5171;&#x7528;&#x4E8B;&#x4EF6;&#x6587;&#x4EF6;&#xFF0C;&#x5373;<code>conf</code>&#x3001;<code>common</code>&#xFF0C;&#x4E0B;&#x9762;&#x8BF4;&#x4E0B;&#x5177;&#x4F53;&#x7684;&#x7528;&#x9014;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x50A8;&#x5B58;&#x7AD9;&#x70B9;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x4F8B;&#x5982;web&#x7684;&#x540D;&#x79F0;&#x3001;LOGO&#x5730;&#x5740;&#x7B49;
import C from &apos;assets/conf&apos;;
# &#x5BFC;&#x5165;&#x5168;&#x5C40;&#x7684;&#x5171;&#x7528;&#x4E8B;&#x4EF6;&#xFF0C;&#x4F8B;&#x5982;&#x5728;&#x5FAE;&#x4FE1;&#x7684;JS SDK&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x8981;&#x5206;&#x4EAB;&#xFF0C;&#x90FD;&#x9700;&#x8981;&#x521D;&#x59CB;&#x5316;&#x7684;&#xFF0C;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#xFF0C;&#x5168;&#x5C40;&#x4F7F;&#x7528;&#xFF0C;&#x68D2;&#xFF01;&#xFF01;
import M from &apos;assets/common&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># &#x50A8;&#x5B58;&#x7AD9;&#x70B9;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x4F8B;&#x5982;web&#x7684;&#x540D;&#x79F0;&#x3001;LOGO&#x5730;&#x5740;&#x7B49;</span>
import C from <span class="hljs-string">&apos;assets/conf&apos;</span>;
<span class="hljs-comment"># &#x5BFC;&#x5165;&#x5168;&#x5C40;&#x7684;&#x5171;&#x7528;&#x4E8B;&#x4EF6;&#xFF0C;&#x4F8B;&#x5982;&#x5728;&#x5FAE;&#x4FE1;&#x7684;JS SDK&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x8981;&#x5206;&#x4EAB;&#xFF0C;&#x90FD;&#x9700;&#x8981;&#x521D;&#x59CB;&#x5316;&#x7684;&#xFF0C;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#xFF0C;&#x5168;&#x5C40;&#x4F7F;&#x7528;&#xFF0C;&#x68D2;&#xFF01;&#xFF01;</span>
import M from <span class="hljs-string">&apos;assets/common&apos;</span>;</code></pre><p>&#x5F53;&#x7136;&#xFF0C;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x4E0D;&#x50CF;&#x8FD9;&#x6837;&#x533A;&#x5206;&#x4E0D;&#x540C;&#x7684;JS&#x6587;&#x4EF6;&#xFF0C;&#x5220;&#x9664;&#x4E5F;&#x6CA1;&#x6709;&#x5F71;&#x54CD;&#x7684;&#xFF0C;&#x5177;&#x4F53;&#x4E5F;&#x8981;&#x770B;&#x9879;&#x76EE;&#x7684;&#x9700;&#x8981;&#x800C;&#x5B9A;&#xFF0C;&#x4E0D;&#x80FD;&#x6B7B;&#x8BFB;&#x4E66;&#x3002;</p><p>&#x53E6;&#x5916;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x8981;&#x5E72;&#x51C0;&#x7684;&#x9875;&#x9762;&#x6A21;&#x5757;&#x6A21;&#x677F;&#xFF0C;&#x53EF;&#x4EE5;&#x5230;&#x6839;&#x76EE;&#x5F55;&#x7684;<code>tpl</code>&#x91CC;&#x590D;&#x5236;<code>module_tpl</code>&#x6574;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x7136;&#x540E;&#x7C98;&#x8D34;&#x5230;<code>src/module</code>&#x76EE;&#x5F55;&#x4E0B;&#x9A6C;&#x4E0A;&#x5C31;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x4E86;&#xFF0C;&#x5F00;&#x53D1;&#x4E4B;&#x524D;&#x8BB0;&#x5F97;&#x5728;<code>cmd</code>&#x91CC;<code>npm run dev</code>&#x8DD1;&#x4E00;&#x904D;&#xFF0C;&#x65B0;&#x589E;&#x9875;&#x9762;&#x90FD;&#x8981;&#x91CD;&#x65B0;<code>dev</code>&#x4E00;&#x904D;&#x3002;</p><p><code>module</code>&#x6211;&#x4EEC;&#x5C31;&#x8BB2;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x8BB2;&#x8BB2;&#x7EC4;&#x4EF6;&#x7684;&#x8C03;&#x7528;&#xFF0C;&#x6700;&#x7231;&#x7EC4;&#x4EF6;&#x4E86;&#x3002;</p><h3 id="articleHeader7">&#x7EC4;&#x4EF6;&#x7684;&#x4F7F;&#x7528;</h3><p>&#x7EC4;&#x4EF6;&#xFF08;Component&#xFF09;&#x662F; vue.js &#x6700;&#x5F3A;&#x5927;&#x7684;&#x529F;&#x80FD;&#x4E4B;&#x4E00;&#xFF0C;&#x5F53;&#x4F60;&#x53D1;&#x73B0;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x51CF;&#x5C11;&#x9020;&#x8F6E;&#x5B50;&#x91CC;&#xFF0C;&#x4F60;&#x4F1A;&#x6DF1;&#x6DF1;&#x7684;&#x7231;&#x4E0A;&#x5B83;&#x3002;<br>&#x6211;&#x4EEC;&#x7684;&#x7EC4;&#x4EF6;&#x90FD;&#x662F;&#x653E;&#x5728;<code>components</code>&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#xFF0C;&#x8C03;&#x7528;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Button from &apos;components/Button&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="stylus hljs"><code class="stylus" style="word-break:break-word;white-space:initial">import Button from <span class="hljs-string">&apos;components/Button&apos;</span>;</code></pre><p>&#x7136;&#x540E;&#x8BB0;&#x5F97;&#x5728;<code>*.vue</code>&#x6CE8;&#x518C;&#x5BFC;&#x5165;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x8981;&#x4E0D;&#x7136;&#x4F1A;&#x5F71;&#x54CD;&#x4F7F;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Button from &apos;components/Button&apos;;
export default {
  data() {
    return {
        
    }
  },
  components: {
   # &#x5728;&#x8FD9;&#x91CC;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E0D;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x7684;&#x8BDD;&#xFF0C;&#x662F;&#x65E0;&#x6CD5;&#x4F7F;&#x7528;&#x7684;&#x3002;
    Button    
  } 
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">import Button from <span class="hljs-string">&apos;components/Button&apos;</span>;
<span class="hljs-built_in">export</span> default {
  <span class="hljs-function"><span class="hljs-title">data</span></span>() {
    <span class="hljs-built_in">return</span> {
        
    }
  },
  components: {
   <span class="hljs-comment"># &#x5728;&#x8FD9;&#x91CC;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E0D;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x7684;&#x8BDD;&#xFF0C;&#x662F;&#x65E0;&#x6CD5;&#x4F7F;&#x7528;&#x7684;&#x3002;</span>
    Button    
  } 
}</code></pre><p>&#x5982;&#x679C;&#x60F3;&#x8981;&#x5E72;&#x51C0;&#x7684;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#xFF0C;&#x53EF;&#x4EE5;&#x5230;&#x6839;&#x76EE;&#x5F55;&#x7684;<code>tpl</code>&#x91CC;&#x627E;&#x5230;<code>components_tpl</code>&#x7684;<code>Hello.vue</code>&#x6587;&#x4EF6;&#xFF0C;&#x590D;&#x5236;&#x7C98;&#x8D34;&#x5230;<code>components</code>&#x76EE;&#x5F55;&#x4E0B;&#x9A6C;&#x4E0A;&#x5C31;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x4E86;&#x3002;</p><h3 id="articleHeader8">&#x56FE;&#x6807;&#x5B57;&#x4F53;</h3><p>&#x5728;yaoyao1987&#x7AE5;&#x978B;&#x91CC;&#xFF0C;&#x662F;&#x6CA1;&#x6709;&#x6253;&#x5305;&#x6784;&#x9020;&#x56FE;&#x6807;&#x5B57;&#x4F53;&#x7684;&#x4EE3;&#x7801;&#x903B;&#x8F91;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x6211;&#x4F18;&#x5316;&#x4E0A;&#x53BB;&#x7684;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;<code>iconfont</code>&#x56FE;&#x6807;&#xFF08;<a href="http://www.iconfont.cn" rel="nofollow noreferrer" target="_blank">http://www.iconfont.cn</a>&#xFF09; &#xFF0C;&#x5F3A;&#x5927;&#x5230;&#x65E0;&#x6240;&#x4E0D;&#x80FD;&#xFF0C;&#x53EF;&#x4EE5;&#x5230;<code>iconfont</code>&#x4E0B;&#x8F7D;&#x81EA;&#x5DF1;&#x60F3;&#x8981;&#x7684;&#x56FE;&#x6807;&#x5B57;&#x4F53;&#xFF0C;&#x8BB0;&#x5F97;&#x662F;&#x628A;&#x6587;&#x4EF6;&#x653E;&#x5230;<code>\src\assets\font</code>&#x6587;&#x4EF6;&#x5939;&#x91CC;&#x3002;</p><p><code>webpack</code>&#x4F1A;&#x81EA;&#x52A8;&#x6253;&#x5305;&#x7684;&#xFF0C;&#x65E0;&#x9700;&#x7406;&#x4F1A;&#xFF0C;&#x53E6;&#x5916;&#x8FD8;&#x6709;&#x4E00;&#x70B9;&#xFF0C;<code>iconfont</code>&#x63D0;&#x4F9B;&#x7684;css&#x6587;&#x4EF6;&#xFF0C;&#x590D;&#x5236;&#x5230;<code>\src\assets\css.css</code>&#x6587;&#x4EF6;&#x5373;&#x53EF;&#xFF0C;&#x8981;&#x4E0D;&#x7136;&#x6CA1;&#x6709;&#x6548;&#x679C;&#x54C8;&#x3002;<br>&#x5728;<code>*.vue</code>&#x91CC;&#x4F7F;&#x7528;&#x8C03;&#x7528;&#x5C31;&#x884C;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;i class=&quot;iconfont&quot;&gt;&amp;#33&lt;/i&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="stylus hljs"><code class="stylus" style="word-break:break-word;white-space:initial">&lt;<span class="hljs-selector-tag">i</span> class=<span class="hljs-string">&quot;iconfont&quot;</span>&gt;&amp;#<span class="hljs-number">33</span>&lt;/i&gt;</code></pre><h2 id="articleHeader9">&#x6784;&#x5EFA;&#x4EE3;&#x7801;&#x8BF4;&#x660E;</h2><p>&#x90A3;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x7684;&#x662F;vue-cli&#x7684;&#x624B;&#x811A;&#x67B6;&#xFF0C;&#x7528;&#x8FC7;<code>vue+cli</code>&#x7684;&#x670B;&#x53CB;&#x77E5;&#x9053;&#x4E3B;&#x8981;&#x6784;&#x5EFA;&#x4EE3;&#x7801;&#x90FD;&#x653E;&#x5728;&#x6839;&#x76EE;&#x5F55;<code>build</code>&#x4E0B;&#xFF0C;vue&#x591A;&#x9875;&#x9762;&#x4E3B;&#x8981;&#x4FEE;&#x6539;&#x4E86;&#x8FD9;&#x4E09;&#x4E2A;JS&#x6587;&#x4EF6;<code>webpack.base.conf.js</code>&#x3001;<code>webpack.dev.conf.js</code>&#x3001;<code>webpack.prod.conf.js</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x3010;webpack.base.conf.js&#x3011;&#x4E3B;&#x8981;&#x662F;&#x6784;&#x5EFA;&#x7684;&#x5168;&#x5C40;&#x8BBE;&#x7F6E;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x589E;&#x52A0;&#x4E86;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#xFF0C;&#x5DF2;&#x7ECF;&#x589E;&#x52A0;&#x5728;JS&#x6587;&#x4EF6;&#x91CC;&#xFF0C;&#x8FD9;&#x91CC;&#x53EA;&#x662F;&#x505A;&#x4E00;&#x4E2A;&#x8865;&#x5145;&#x8BF4;&#x660E;&#xFF0C;&#x5177;&#x4F53;&#x8BF7;&#x770B;`build/webpack.base.conf.js`&#x3002;

var entries = getEntry(&apos;./src/module/**/*.js&apos;); // &#x83B7;&#x5F97;&#x5165;&#x53E3;js&#x6587;&#x4EF6;
var chunks = Object.keys(entries);

plugins: [
   // &#x63D0;&#x53D6;&#x516C;&#x5171;&#x6A21;&#x5757;
    new webpack.optimize.CommonsChunkPlugin({
      name: &apos;vendors&apos;, // &#x516C;&#x5171;&#x6A21;&#x5757;&#x7684;&#x540D;&#x79F0;
      chunks: chunks, // chunks&#x662F;&#x9700;&#x8981;&#x63D0;&#x53D6;&#x7684;&#x6A21;&#x5757;
      minChunks: chunks.length
    }),
   // &#x914D;&#x7F6E;&#x63D0;&#x53D6;&#x51FA;&#x7684;&#x6837;&#x5F0F;&#x6587;&#x4EF6;
    new ExtractTextPlugin(&apos;css/[name].css&apos;)
 ]

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split(&apos;/&apos;).splice(-3);
    pathname = tmp.splice(0, 1) + &apos;/&apos; + basename; // &#x6B63;&#x786E;&#x8F93;&#x51FA;js&#x548C;html&#x7684;&#x8DEF;&#x5F84;
    entries[pathname] = entry;
  });
  
  return entries;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># &#x3010;webpack.base.conf.js&#x3011;&#x4E3B;&#x8981;&#x662F;&#x6784;&#x5EFA;&#x7684;&#x5168;&#x5C40;&#x8BBE;&#x7F6E;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x589E;&#x52A0;&#x4E86;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#xFF0C;&#x5DF2;&#x7ECF;&#x589E;&#x52A0;&#x5728;JS&#x6587;&#x4EF6;&#x91CC;&#xFF0C;&#x8FD9;&#x91CC;&#x53EA;&#x662F;&#x505A;&#x4E00;&#x4E2A;&#x8865;&#x5145;&#x8BF4;&#x660E;&#xFF0C;&#x5177;&#x4F53;&#x8BF7;&#x770B;`build/webpack.base.conf.js`&#x3002;</span>

var entries = getEntry(<span class="hljs-string">&apos;./src/module/**/*.js&apos;</span>); // &#x83B7;&#x5F97;&#x5165;&#x53E3;js&#x6587;&#x4EF6;
var chunks = Object.keys(entries);

plugins: [
   // &#x63D0;&#x53D6;&#x516C;&#x5171;&#x6A21;&#x5757;
    new webpack.optimize.CommonsChunkPlugin({
      name: <span class="hljs-string">&apos;vendors&apos;</span>, // &#x516C;&#x5171;&#x6A21;&#x5757;&#x7684;&#x540D;&#x79F0;
      chunks: chunks, // chunks&#x662F;&#x9700;&#x8981;&#x63D0;&#x53D6;&#x7684;&#x6A21;&#x5757;
      minChunks: chunks.length
    }),
   // &#x914D;&#x7F6E;&#x63D0;&#x53D6;&#x51FA;&#x7684;&#x6837;&#x5F0F;&#x6587;&#x4EF6;
    new ExtractTextPlugin(<span class="hljs-string">&apos;css/[name].css&apos;</span>)
 ]

<span class="hljs-keyword">function</span> getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(<span class="hljs-keyword">function</span> (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split(<span class="hljs-string">&apos;/&apos;</span>).splice(-3);
    pathname = tmp.splice(0, 1) + <span class="hljs-string">&apos;/&apos;</span> + basename; // &#x6B63;&#x786E;&#x8F93;&#x51FA;js&#x548C;html&#x7684;&#x8DEF;&#x5F84;
    entries[pathname] = entry;
  });
  
  <span class="hljs-built_in">return</span> entries;
}
</code></pre><p>&#x8FD9;&#x91CC;&#x8FD8;&#x8981;&#x505A;&#x4E00;&#x4E2A;&#x7279;&#x522B;&#x8BF4;&#x660E;&#xFF0C;&#x6211;&#x4EEC;&#x6BCF;&#x6B21;&#x66F4;&#x65B0;&#x8D44;&#x6E90;&#x6587;&#x4EF6;&#xFF0C;&#x4E3A;&#x4E86;&#x53BB;&#x7F13;&#x5B58;&#xFF0C;&#x90FD;&#x4F1A;&#x7ED9;&#x6587;&#x4EF6;&#x751F;&#x6210;<code>hash</code>&#x503C;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script type=&apos;text/javascript&apos; src=&apos;vendors.61714a310523a3df9869.js&apos; charset=&apos;utf-8&apos;&gt;&lt;/script&gt;
&lt;script type=&apos;text/javascript&apos; src=&apos;vendors.js?f3aaf25de220e214f84e&apos; charset=&apos;utf-8&apos;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="stylus hljs"><code class="stylus">&lt;script type=<span class="hljs-string">&apos;text/javascript&apos;</span> src=<span class="hljs-string">&apos;vendors.61714a310523a3df9869.js&apos;</span> charset=<span class="hljs-string">&apos;utf-8&apos;</span>&gt;&lt;/script&gt;
&lt;script type=<span class="hljs-string">&apos;text/javascript&apos;</span> src=<span class="hljs-string">&apos;vendors.js?f3aaf25de220e214f84e&apos;</span> charset=<span class="hljs-string">&apos;utf-8&apos;</span>&gt;&lt;/script&gt;</code></pre><p>&#x8FD9;&#x4E24;&#x8005;&#x90FD;&#x662F;&#x4E3A;&#x4E86;&#x53BB;&#x7F13;&#x5B58;&#xFF0C;&#x552F;&#x4E00;&#x7684;&#x533A;&#x522B;&#x7684;&#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x6709;&#x4E9B;&#x9879;&#x76EE;&#xFF0C;&#x4E3A;&#x4E86;&#x53EF;&#x4EE5;&#x80FD;&#x51FA;&#x4E25;&#x91CD;BUG&#x65F6;&#x7B2C;&#x4E00;&#x65F6;&#x95F4;&#x56DE;&#x6EDA;&#xFF0C;&#x4EE5;<code>&#x6587;&#x4EF6;&#x540D;</code>+<code>hash</code>&#x7684;&#x65B9;&#x5F0F;&#x50A8;&#x5B58;&#xFF0C;&#x6BCF;&#x6B21;&#x751F;&#x6210;&#x90FD;&#x4E0D;&#x4F1A;&#x8986;&#x76D6;&#x4E4B;&#x524D;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4EE5;&#x65B9;&#x4FBF;&#x67E5;BUG&#x6216;&#x8005;&#x56DE;&#x6EDA;&#x3002;<br>&#x53E6;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x5C31;&#x662F;&#x4EE5;<code>&#x6587;&#x4EF6;&#x540D;</code>+<code>?hash</code>&#x7684;&#x65B9;&#x5F0F;&#x50A8;&#x5B58;&#xFF0C;&#x6BCF;&#x6B21;&#x90FD;&#x4F1A;&#x8986;&#x76D6;&#x4E4B;&#x524D;&#x751F;&#x6210;&#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x65B9;&#x4FBF;&#x5728;&#x67D0;&#x4E9B;&#x7279;&#x6B8A;&#x9879;&#x76EE;&#x4F7F;&#x7528;&#x3002;<br>&#x6211;&#x5728;<code>webpack.base.conf.js</code>&#x4E5F;&#x5DF2;&#x7ECF;&#x6CE8;&#x91CA;&#x8BF4;&#x660E;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    /* ---- &#x751F;&#x6210;&#x7684;&#x4F8B;&#x5B50; vendors.61714a310523a3df9869.js --- */
    //filename: &apos;[name].[hash].js&apos;
    /* ---- &#x751F;&#x6210;&#x7684;&#x4F8B;&#x5B50; vendors.js?f3aaf25de220e214f84e --- */
    filename: &apos;[name].js&apos;
  }
}  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="stylus hljs"><code class="stylus">module<span class="hljs-selector-class">.exports</span> = {
  entry: entries,
  output: {
    path: config<span class="hljs-selector-class">.build</span><span class="hljs-selector-class">.assetsRoot</span>,
    publicPath: config<span class="hljs-selector-class">.build</span><span class="hljs-selector-class">.assetsPublicPath</span>,
    <span class="hljs-comment">/* ---- &#x751F;&#x6210;&#x7684;&#x4F8B;&#x5B50; vendors.61714a310523a3df9869.js --- */</span>
    <span class="hljs-comment">//filename: &apos;[name].[hash].js&apos;</span>
    <span class="hljs-comment">/* ---- &#x751F;&#x6210;&#x7684;&#x4F8B;&#x5B50; vendors.js?f3aaf25de220e214f84e --- */</span>
    filename: <span class="hljs-string">&apos;[name].js&apos;</span>
  }
}  </code></pre><h2 id="articleHeader10">&#x7ED3;&#x675F;&#x8A00;</h2><p>&#x4E0D;&#x77E5;&#x4E0D;&#x89C9;&#x65F6;&#x95F4;&#x53C8;&#x8FC7;&#x53BB;&#xFF0C;&#x5570;&#x55E6;&#x4E00;&#x5806;&#x5806;&#x7684;&#xFF0C;&#x6BCF;&#x4E2A;&#x9879;&#x76EE;&#x9700;&#x6C42;&#x90FD;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x914D;&#x7F6E;&#x4E5F;&#x4F1A;&#x6709;&#x8BB8;&#x4E0D;&#x540C;&#xFF0C;&#x4E5F;&#x5E0C;&#x671B;&#x66F4;&#x591A;&#x7684;&#x670B;&#x53CB;&#x5206;&#x4EAB;&#x81EA;&#x5DF1;&#x7684;&#x4EE3;&#x7801;&#x548C;&#x60F3;&#x6CD5;&#x51FA;&#x6765;&#x54C8;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4E00;&#x8D77;&#x4EA4;&#x6D41;&#x3002;<br>&#x6709;&#x9700;&#x8981;&#x4E00;&#x8D77;&#x4EA4;&#x6D41;&#x7684;&#x53EF;&#x4EE5;&#x52A0;&#x6211;&#x7684;&#x5FAE;&#x4FE1;&#xFF0C;<code>amwhuang</code>&#xFF0C;&#x8BB0;&#x5F97;&#x5907;&#x6CE8;<code>&#x6280;&#x672F;&#x4EA4;&#x6D41;</code>&#x54C8;&#x3002;</p><p>&#x9996;&#x53D1;&#x535A;&#x5BA2;&#x5730;&#x5740;&#xFF1A;<a href="http://lanchenglv.com/article/2016/0826/vue-cli_webpack_multi-page.html" rel="nofollow noreferrer" target="_blank">http://lanchenglv.com/article...</a></p><p><span class="img-wrap"><img data-src="/img/remote/1460000006762526" src="https://static.alili.tech/img/remote/1460000006762526" alt="&apos;&apos;" title="&apos;&apos;" style="cursor:pointer"></span></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli + webpack 多页面实例配置优化方法

## 原文链接
[https://segmentfault.com/a/1190000006741478](https://segmentfault.com/a/1190000006741478)

