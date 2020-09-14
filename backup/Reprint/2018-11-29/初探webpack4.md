---
title: '初探webpack4' 
date: 2018-11-29 2:30:09
hidden: true
slug: 9xboa2o3rx5
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x524D;&#x8A00;</h2><p>2018/2/25&#xFF0C;webpack4&#x6B63;&#x5F0F;&#x53D1;&#x5E03;&#xFF0C;&#x8DDD;&#x79BB;&#x73B0;&#x5728;&#x5DF2;&#x7ECF;&#x8FC7;&#x53BB;&#x4E09;&#x4E2A;&#x591A;&#x6708;&#x4E86;&#xFF0C;&#x4E5F;&#x9010;&#x6E10;&#x8D8B;&#x4E8E;&#x7A33;&#x5B9A;&#xFF0C;&#x800C;&#x4E14;&#x73B0;&#x5728;&#x7684;&#x6700;&#x65B0;&#x7248;&#x672C;&#x90FD;&#x5230;&#x4E86;4.12.0&#xFF08;&#x7248;&#x672C;&#x8FED;&#x4EE3;&#x5FEB;&#x5F97;&#x771F;&#x662F;&#x8BA9;&#x4EBA;&#x5BB3;&#x6015;&#xFF09;&#x3002;</p><p><span class="img-wrap"><img data-src="http://ovdk1wiaq.bkt.clouddn.com/18-6-9/66027398.jpg" src="https://static.alili.techhttp://ovdk1wiaq.bkt.clouddn.com/18-6-9/66027398.jpg" alt="&#x6700;&#x65B0;&#x7248;&#x672C;" title="&#x6700;&#x65B0;&#x7248;&#x672C;" style="cursor:pointer;display:inline"></span></p><p>&#x5F88;&#x591A;&#x4EBA;&#x90FD;&#x8BF4;webpack&#x590D;&#x6742;&#xFF0C;&#x96BE;&#x4EE5;&#x7406;&#x89E3;&#xFF0C;&#x5F88;&#x5927;&#x4E00;&#x90E8;&#x5206;&#x539F;&#x56E0;&#x662F;webpack&#x662F;&#x57FA;&#x4E8E;&#x914D;&#x7F6E;&#x7684;&#xFF0C;&#x53EF;&#x914D;&#x7F6E;&#x9879;&#x5F88;&#x591A;&#xFF0C;&#x5E76;&#x4E14;&#x6BCF;&#x4E2A;&#x53C2;&#x6570;&#x4F20;&#x5165;&#x7684;&#x5F62;&#x5F0F;&#x591A;&#x79CD;&#x591A;&#x6837;&#xFF08;&#x53EF;&#x4EE5;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x3001;&#x6570;&#x7EC4;&#x3001;&#x5BF9;&#x8C61;&#x3001;&#x51FD;&#x6570;&#x3002;&#x3002;&#x3002;&#xFF09;&#xFF0C;&#x6587;&#x6863;&#x4ECB;&#x7ECD;&#x4E5F;&#x6BD4;&#x8F83;&#x6A21;&#x7CCA;&#xFF0C;&#x8FD9;&#x4E48;&#x591A;&#x7684;&#x914D;&#x7F6E;&#x9879;&#x5404;&#x79CD;&#x6392;&#x5217;&#x7EC4;&#x5408;&#xFF0C;&#x60F3;&#x60F3;&#x90FD;&#x590D;&#x6742;&#x3002;&#x800C;gulp&#x57FA;&#x4E8E;&#x6D41;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5904;&#x7406;&#x6587;&#x4EF6;&#xFF0C;&#x65E0;&#x8BBA;&#x4ECE;&#x7406;&#x89E3;&#x4E0A;&#xFF0C;&#x8FD8;&#x662F;&#x529F;&#x80FD;&#x4E0A;&#x90FD;&#x5F88;&#x5BB9;&#x6613;&#x4E0A;&#x624B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//gulp
gulp.src(&apos;./src/js/**/*.js&apos;)
.pipe(&apos;babel&apos;)
.pipe(&apos;uglifyjs&apos;)
.dest(&apos;./dist/js&apos;)

//webpack
module.exports = {
  entry: &apos;./src/main.js&apos;,
  output: __dirname + &apos;/dist/app.js&apos;,
  module: {
    rules: [{
      test: /\.js$/,
      loader: &apos;babel-loader&apos;
    }]
  },
  plugins: [
    new require(&apos;uglifyjs-webpack-plugin&apos;)()
  ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//gulp</span>
gulp.src(<span class="hljs-string">&apos;./src/js/**/*.js&apos;</span>)
.pipe(<span class="hljs-string">&apos;babel&apos;</span>)
.pipe(<span class="hljs-string">&apos;uglifyjs&apos;</span>)
.dest(<span class="hljs-string">&apos;./dist/js&apos;</span>)

<span class="hljs-comment">//webpack</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">&apos;./src/main.js&apos;</span>,
  <span class="hljs-attr">output</span>: __dirname + <span class="hljs-string">&apos;/dist/app.js&apos;</span>,
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [{
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;babel-loader&apos;</span>
    }]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;uglifyjs-webpack-plugin&apos;</span>)()
  ]
}</code></pre><p>&#x4E0A;&#x9762;&#x7B80;&#x5355;&#x5BF9;&#x6BD4;&#x4E86;webpack&#x4E0E;gulp&#x914D;&#x7F6E;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x5F53;&#x7136;&#x8FD9;&#x6837;&#x6BD4;&#x8F83;&#x662F;&#x6709;&#x95EE;&#x9898;&#x7684;&#xFF0C;gulp&#x5E76;&#x4E0D;&#x80FD;&#x8FDB;&#x884C;&#x6A21;&#x5757;&#x5316;&#x7684;&#x5904;&#x7406;&#x3002;&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x662F;&#x60F3;&#x544A;&#x8BC9;&#x5927;&#x5BB6;&#x4F7F;&#x7528;gulp&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x80FD;&#x660E;&#x786E;&#x7684;&#x77E5;&#x9053;js&#x6587;&#x4EF6;&#x662F;&#x5148;&#x8FDB;&#x884C;babel&#x8F6C;&#x8BD1;&#xFF0C;&#x7136;&#x540E;&#x8FDB;&#x884C;&#x538B;&#x7F29;&#x6DF7;&#x6DC6;&#xFF0C;&#x6700;&#x540E;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x3002;&#x800C;webpack&#x5BF9;&#x6211;&#x4EEC;&#x6765;&#x8BF4;&#x5B8C;&#x5168;&#x662F;&#x4E2A;&#x9ED1;&#x76D2;&#xFF0C;&#x5B8C;&#x5168;&#x4E0D;&#x77E5;&#x9053;plugins&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x3002;&#x6B63;&#x662F;&#x56E0;&#x4E3A;&#x8FD9;&#x4E9B;&#x539F;&#x56E0;&#xFF0C;&#x6211;&#x4EEC;&#x5E38;&#x5E38;&#x5728;&#x4F7F;&#x7528;webpack&#x65F6;&#x6709;&#x4E00;&#x4E9B;&#x4E0D;&#x5B89;&#xFF0C;&#x4E0D;&#x77E5;&#x9053;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x5230;&#x5E95;&#x6709;&#x6CA1;&#x6709;&#x751F;&#x6548;&#xFF0C;&#x6211;&#x8981;&#x6309;&#x67D0;&#x79CD;&#x65B9;&#x5F0F;&#x6253;&#x5305;&#x5230;&#x5E95;&#x8BE5;&#x5982;&#x4F55;&#x914D;&#x7F6E;&#xFF1F;</p><p>&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x4E0A;&#x9762;&#x7684;&#x95EE;&#x9898;&#xFF0C;webpack4&#x5F15;&#x5165;&#x4E86;<code>&#x96F6;&#x914D;&#x7F6E;</code>&#x7684;&#x6982;&#x5FF5;&#xFF08;Parcel &#xFF1F;&#xFF1F;&#xFF1F;&#xFF09;&#xFF0C;&#x5B9E;&#x9645;&#x4F53;&#x9A8C;&#x4E0B;&#x6765;&#x8FD8;&#x662F;&#x8981;&#x5199;&#x4E0D;&#x5C11;&#x914D;&#x7F6E;&#x3002;<br>&#x4F46;&#x662F;&#x8FD9;&#x4E0D;&#x662F;&#x91CD;&#x70B9;&#xFF0C;&#x91CD;&#x70B9;&#x662F;&#x5B98;&#x65B9;&#x5BA3;&#x4F20;webpack4&#x80FD;&#x591F;&#x63D0;&#x5347;&#x6784;&#x5EFA;&#x901F;&#x5EA6;60%-98%&#xFF0C;&#x771F;&#x7684;&#x8BA9;&#x4EBA;&#x5FC3;&#x52A8;&#x3002;</p><h2 id="articleHeader1">&#x4E8C;&#x3001;&#x5230;&#x5E95;&#x600E;&#x4E48;&#x5347;&#x7EA7;</h2><h4>0&#x3001;&#x521D;&#x59CB;&#x5316;&#x914D;&#x7F6E;</h4><p>&#x9996;&#x5148;&#x5B89;&#x88C5;&#x6700;&#x65B0;&#x7248;&#x7684;webpack&#x548C;webpack-dev-server&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5B89;&#x88C5;webpack-cli&#x3002;webpack4&#x5C06;&#x547D;&#x4EE4;&#x884C;&#x76F8;&#x5173;&#x7684;&#x64CD;&#x4F5C;&#x62BD;&#x79BB;&#x5230;&#x4E86;webpack-cli&#x4E2D;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x8981;&#x4F7F;&#x7528;webpack4&#xFF0C;&#x5FC5;&#x987B;&#x5B89;&#x88C5;webpack-cli&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x60F3;&#x4F7F;&#x7528;webpack-cli&#xFF0C;&#x793E;&#x533A;&#x4E5F;&#x6709;&#x66FF;&#x4EE3;&#x65B9;&#x6848;<a href="https://github.com/webpack-contrib/webpack-command" rel="nofollow noreferrer" target="_blank">webpack-command</a>&#xFF0C;&#x867D;&#x7136;&#x5B83;&#x4E0E;webpack-cli&#x533A;&#x522B;&#x4E0D;&#x5927;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x662F;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;&#x5B98;&#x65B9;&#x63A8;&#x8350;&#x7684;webpack-cli&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i webpack@4 webpack-dev-server@3 --save-dev
npm i webpack-cli --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">npm i webpack@4 webpack-dev-server@3 --save-dev
npm i webpack-cli --save-dev</code></pre><p>webpack-cli&#x9664;&#x4E86;&#x80FD;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x63A5;&#x53D7;&#x53C2;&#x6570;&#x8FD0;&#x884C;webpack&#x5916;&#xFF0C;&#x8FD8;&#x5177;&#x5907;<code>migrate</code>&#x548C;<code>init</code>&#x529F;&#x80FD;&#x3002;</p><ol><li>migrate&#x7528;&#x6765;&#x5347;&#x7EA7;webpack&#x914D;&#x7F6E;&#xFF0C;&#x80FD;&#x5C06;webpack1&#x7684;api&#x5347;&#x7EA7;&#x5230;webpack2&#xFF0C;&#x73B0;&#x5728;&#x7528;&#x5904;&#x4E0D;&#x5927;&#x3002;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-cli migrate ./webpack.config.js
 &#x2714; Reading webpack config
 &#x2714; Migrating config from v1 to v2
-    loaders: [
+      rules: [
-        loader: &apos;babel&apos;,
-          query: {
+            use: [{
+              loader: &apos;babel-loader&apos;
+            }],
+            options: {
-              loader: ExtractTextPlugin.extract(&apos;style&apos;, &apos;css!sass&apos;)
+              use: ExtractTextPlugin.extract({
+                fallback: &apos;style&apos;,
+                use: &apos;css!sass&apos;
+              })
? Are you sure these changes are fine? Yes

 &#x2714;&#xFE0E; New webpack v2 config file is at /home/webpack-cli/build/webpack.config.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="diff hljs"><code class="diff">$ webpack-cli migrate ./webpack.config.js
 &#x2714; Reading webpack config
 &#x2714; Migrating config from v1 to v2
<span class="hljs-deletion">-    loaders: [</span>
<span class="hljs-addition">+      rules: [</span>
<span class="hljs-deletion">-        loader: &apos;babel&apos;,</span>
<span class="hljs-deletion">-          query: {</span>
<span class="hljs-addition">+            use: [{</span>
<span class="hljs-addition">+              loader: &apos;babel-loader&apos;</span>
<span class="hljs-addition">+            }],</span>
<span class="hljs-addition">+            options: {</span>
<span class="hljs-deletion">-              loader: ExtractTextPlugin.extract(&apos;style&apos;, &apos;css!sass&apos;)</span>
<span class="hljs-addition">+              use: ExtractTextPlugin.extract({</span>
<span class="hljs-addition">+                fallback: &apos;style&apos;,</span>
<span class="hljs-addition">+                use: &apos;css!sass&apos;</span>
<span class="hljs-addition">+              })</span>
? Are you sure these changes are fine? Yes

 &#x2714;&#xFE0E; New webpack v2 config file is at /home/webpack-cli/build/webpack.config.js</code></pre><ol><li>init&#x53EF;&#x4EE5;&#x5FEB;&#x901F;&#x751F;&#x6210;&#x4E00;&#x4E2A;webpack&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x6A21;&#x7248;&#xFF0C;&#x4E0D;&#x8FC7;&#x7528;&#x5904;&#x4E5F;&#x4E0D;&#x5927;&#xFF0C;&#x6BD5;&#x7ADF;&#x73B0;&#x5728;&#x7684;&#x811A;&#x624B;&#x67B6;&#x90FD;&#x96C6;&#x6210;&#x4E86;webpack&#x7684;&#x914D;&#x7F6E;&#x3002;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-cli init

1. Will your application have multiple bundles? No // &#x5982;&#x679C;&#x662F;&#x591A;&#x5165;&#x53E3;&#x5E94;&#x7528;&#xFF0C;&#x53EF;&#x4EE5;&#x4F20;&#x5165;&#x4E00;&#x4E2A;object
2. Which module will be the first to enter the application? [example: &apos;./src/index&apos;] ./src/index // &#x7A0B;&#x5E8F;&#x5165;&#x53E3;
3. What is the location of &quot;app&quot;? [example: &quot;./src/app&quot;] &apos;./src/app&apos;
4. Which folder will your generated bundles be in? [default: dist]
5. Are you going to use this in production? No
6. Will you be using ES2015? Yes //&#x662F;&#x5426;&#x4F7F;&#x7528;ES6&#x8BED;&#x6CD5;&#xFF0C;&#x81EA;&#x52A8;&#x6DFB;&#x52A0;babel-loader
7. Will you use one of the below CSS solutions? SASS // &#x6839;&#x636E;&#x9009;&#x62E9;&#x7684;&#x6837;&#x5F0F;&#x7C7B;&#x578B;&#xFF0C;&#x81EA;&#x52A8;&#x751F;&#x6210; loader &#x914D;&#x7F6E;
8. If you want to bundle your CSS files, what will you name the bundle? (press enter to skip)
9. Name your &apos;webpack.[name].js?&apos; [default: &apos;config&apos;]: // webpack.config.js

Congratulations! Your new webpack configuration file has been created!" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livecodeserver"><code>webpack-cli init

<span class="hljs-number">1.</span> Will your application have multiple bundles? No<span class="hljs-comment"> // &#x5982;&#x679C;&#x662F;&#x591A;&#x5165;&#x53E3;&#x5E94;&#x7528;&#xFF0C;&#x53EF;&#x4EE5;&#x4F20;&#x5165;&#x4E00;&#x4E2A;object</span>
<span class="hljs-number">2.</span> Which module will be <span class="hljs-keyword">the</span> <span class="hljs-keyword">first</span> <span class="hljs-built_in">to</span> enter <span class="hljs-keyword">the</span> application? [example: <span class="hljs-string">&apos;./src/index&apos;</span>] ./src/index<span class="hljs-comment"> // &#x7A0B;&#x5E8F;&#x5165;&#x53E3;</span>
<span class="hljs-number">3.</span> What is <span class="hljs-keyword">the</span> location <span class="hljs-keyword">of</span> <span class="hljs-string">&quot;app&quot;</span>? [example: <span class="hljs-string">&quot;./src/app&quot;</span>] <span class="hljs-string">&apos;./src/app&apos;</span>
<span class="hljs-number">4.</span> Which <span class="hljs-built_in">folder</span> will your generated bundles be <span class="hljs-keyword">in</span>? [default: dist]
<span class="hljs-number">5.</span> Are you going <span class="hljs-built_in">to</span> use this <span class="hljs-keyword">in</span> production? No
<span class="hljs-number">6.</span> Will you be <span class="hljs-keyword">using</span> ES2015? Yes<span class="hljs-comment"> //&#x662F;&#x5426;&#x4F7F;&#x7528;ES6&#x8BED;&#x6CD5;&#xFF0C;&#x81EA;&#x52A8;&#x6DFB;&#x52A0;babel-loader</span>
<span class="hljs-number">7.</span> Will you use <span class="hljs-literal">one</span> <span class="hljs-keyword">of</span> <span class="hljs-keyword">the</span> below CSS solutions? SASS<span class="hljs-comment"> // &#x6839;&#x636E;&#x9009;&#x62E9;&#x7684;&#x6837;&#x5F0F;&#x7C7B;&#x578B;&#xFF0C;&#x81EA;&#x52A8;&#x751F;&#x6210; loader &#x914D;&#x7F6E;</span>
<span class="hljs-number">8.</span> If you want <span class="hljs-built_in">to</span> bundle your CSS <span class="hljs-built_in">files</span>, what will you name <span class="hljs-keyword">the</span> bundle? (press enter <span class="hljs-built_in">to</span> skip)
<span class="hljs-number">9.</span> Name your <span class="hljs-string">&apos;webpack.[name].js?&apos;</span> [default: <span class="hljs-string">&apos;config&apos;</span>]:<span class="hljs-comment"> // webpack.config.js</span>

Congratulations! Your <span class="hljs-built_in">new</span> webpack configuration <span class="hljs-built_in">file</span> has been created!</code></pre><p>&#x66F4;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x8BF7;&#x67E5;&#x770B;webpack-cli&#x7684;<a href="https://github.com/webpack/webpack-cli/blob/master/README.md" rel="nofollow noreferrer" target="_blank">&#x6587;&#x6863;</a></p><h4>1&#x3001;&#x96F6;&#x914D;&#x7F6E;</h4><p>&#x96F6;&#x914D;&#x7F6E;&#x5C31;&#x610F;&#x5473;&#x7740;webpack4&#x5177;&#x6709;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#xFF0C;webpack&#x8FD0;&#x884C;&#x65F6;&#xFF0C;&#x4F1A;&#x6839;&#x636E;<code>mode</code>&#x7684;&#x503C;&#x91C7;&#x53D6;&#x4E0D;&#x540C;&#x7684;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x3002;&#x5982;&#x679C;&#x4F60;&#x6CA1;&#x6709;&#x7ED9;webpack&#x4F20;&#x5165;mode&#xFF0C;&#x4F1A;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#xFF0C;&#x5E76;&#x63D0;&#x793A;&#x6211;&#x4EEC;&#x5982;&#x679C;&#x8981;&#x4F7F;&#x7528;webpack&#x5C31;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;mode&#x3002;</p><p><span class="img-wrap"><img data-src="http://ovdk1wiaq.bkt.clouddn.com/18-6-4/38892042.jpg" src="https://static.alili.techhttp://ovdk1wiaq.bkt.clouddn.com/18-6-4/38892042.jpg" alt="&#x6CA1;&#x6709;&#x4F7F;&#x7528;mode" title="&#x6CA1;&#x6709;&#x4F7F;&#x7528;mode" style="cursor:pointer"></span></p><blockquote>The &apos;mode&apos; option has not been set, webpack will fallback to &apos;production&apos; for this value. Set &apos;mode&apos; option to &apos;development&apos; or &apos;production&apos; to enable defaults for each environment.<br>You can also set it to &apos;none&apos; to disable any default behavior. Learn more: <a href="https://webpack.js.org/concepts/mode/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/concep...</a></blockquote><p>mode&#x4E00;&#x5171;&#x6709;&#x5982;&#x4E0B;&#x4E09;&#x79CD;&#x914D;&#x7F6E;&#xFF1A;</p><ol><li>none<p>&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x7684;&#x610F;&#x601D;&#x5C31;&#x662F;&#x4E0D;&#x4F7F;&#x7528;&#x4EFB;&#x4F55;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;</p></li><li>development&#xFF0C;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x7684;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  //&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x9ED8;&#x8BA4;&#x542F;&#x7528;cache&#xFF0C;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x5BF9;&#x5DF2;&#x7ECF;&#x6784;&#x5EFA;&#x7684;&#x90E8;&#x5206;&#x8FDB;&#x884C;&#x7F13;&#x5B58;
  //&#x907F;&#x514D;&#x5176;&#x4ED6;&#x6A21;&#x5757;&#x4FEE;&#x6539;&#xFF0C;&#x4F46;&#x662F;&#x8BE5;&#x6A21;&#x5757;&#x672A;&#x4FEE;&#x6539;&#x65F6;&#x5019;&#xFF0C;&#x91CD;&#x65B0;&#x6784;&#x5EFA;&#xFF0C;&#x80FD;&#x591F;&#x66F4;&#x5FEB;&#x7684;&#x8FDB;&#x884C;&#x589E;&#x91CF;&#x6784;&#x5EFA;
  //&#x5C5E;&#x4E8E;&#x7A7A;&#x95F4;&#x6362;&#x65F6;&#x95F4;&#x7684;&#x505A;&#x6CD5;
  cache: true, 
  output: {
    pathinfo: true //&#x8F93;&#x5165;&#x4EE3;&#x7801;&#x6DFB;&#x52A0;&#x989D;&#x5916;&#x7684;&#x8DEF;&#x5F84;&#x6CE8;&#x91CA;&#xFF0C;&#x63D0;&#x9AD8;&#x4EE3;&#x7801;&#x53EF;&#x8BFB;&#x6027;
  },
  devtools: &quot;eval&quot;, //sourceMap&#x4E3A;eval&#x7C7B;&#x578B;
  plugins: [
    //&#x9ED8;&#x8BA4;&#x6DFB;&#x52A0;NODE_ENV&#x4E3A;development
    new webpack.DefinePlugin({ &quot;process.env.NODE_ENV&quot;: JSON.stringify(&quot;development&quot;) }),
  ],
  optimization: {
    namedModules: true, //&#x53D6;&#x4EE3;&#x63D2;&#x4EF6;&#x4E2D;&#x7684; new webpack.NamedModulesPlugin()
    namedChunks: true
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">//&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x9ED8;&#x8BA4;&#x542F;&#x7528;cache&#xFF0C;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x5BF9;&#x5DF2;&#x7ECF;&#x6784;&#x5EFA;&#x7684;&#x90E8;&#x5206;&#x8FDB;&#x884C;&#x7F13;&#x5B58;</span>
  <span class="hljs-comment">//&#x907F;&#x514D;&#x5176;&#x4ED6;&#x6A21;&#x5757;&#x4FEE;&#x6539;&#xFF0C;&#x4F46;&#x662F;&#x8BE5;&#x6A21;&#x5757;&#x672A;&#x4FEE;&#x6539;&#x65F6;&#x5019;&#xFF0C;&#x91CD;&#x65B0;&#x6784;&#x5EFA;&#xFF0C;&#x80FD;&#x591F;&#x66F4;&#x5FEB;&#x7684;&#x8FDB;&#x884C;&#x589E;&#x91CF;&#x6784;&#x5EFA;</span>
  <span class="hljs-comment">//&#x5C5E;&#x4E8E;&#x7A7A;&#x95F4;&#x6362;&#x65F6;&#x95F4;&#x7684;&#x505A;&#x6CD5;</span>
  cache: <span class="hljs-literal">true</span>, 
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">pathinfo</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">//&#x8F93;&#x5165;&#x4EE3;&#x7801;&#x6DFB;&#x52A0;&#x989D;&#x5916;&#x7684;&#x8DEF;&#x5F84;&#x6CE8;&#x91CA;&#xFF0C;&#x63D0;&#x9AD8;&#x4EE3;&#x7801;&#x53EF;&#x8BFB;&#x6027;</span>
  },
  <span class="hljs-attr">devtools</span>: <span class="hljs-string">&quot;eval&quot;</span>, <span class="hljs-comment">//sourceMap&#x4E3A;eval&#x7C7B;&#x578B;</span>
  plugins: [
    <span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x6DFB;&#x52A0;NODE_ENV&#x4E3A;development</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({ <span class="hljs-string">&quot;process.env.NODE_ENV&quot;</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">&quot;development&quot;</span>) }),
  ],
  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">namedModules</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">//&#x53D6;&#x4EE3;&#x63D2;&#x4EF6;&#x4E2D;&#x7684; new webpack.NamedModulesPlugin()</span>
    namedChunks: <span class="hljs-literal">true</span>
  }
}</code></pre><ol><li>production&#xFF0C;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E0B;&#x7684;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  performance: {
    hints: &apos;warning&apos;,
    maxAssetSize: 250000, //&#x5355;&#x6587;&#x4EF6;&#x8D85;&#x8FC7;250k&#xFF0C;&#x547D;&#x4EE4;&#x884C;&#x544A;&#x8B66;
    maxEntrypointSize: 250000, //&#x9996;&#x6B21;&#x52A0;&#x8F7D;&#x6587;&#x4EF6;&#x603B;&#x548C;&#x8D85;&#x8FC7;250k&#xFF0C;&#x547D;&#x4EE4;&#x884C;&#x544A;&#x8B66;
  }
  plugins: [
    //&#x9ED8;&#x8BA4;&#x6DFB;&#x52A0;NODE_ENV&#x4E3A;production
    new webpack.DefinePlugin({ &quot;process.env.NODE_ENV&quot;: JSON.stringify(&quot;production&quot;) })
  ],
  optimization: {
    minimize: true, //&#x53D6;&#x4EE3; new UglifyJsPlugin(/* ... */)
    providedExports: true,
    usedExports: true,
    //&#x8BC6;&#x522B;package.json&#x4E2D;&#x7684;sideEffects&#x4EE5;&#x5254;&#x9664;&#x65E0;&#x7528;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x7528;&#x6765;&#x505A;tree-shake
    //&#x4F9D;&#x8D56;&#x4E8E;optimization.providedExports&#x548C;optimization.usedExports
    sideEffects: true,
    //&#x53D6;&#x4EE3; new webpack.optimize.ModuleConcatenationPlugin()
    concatenateModules: true,
    //&#x53D6;&#x4EE3; new webpack.NoEmitOnErrorsPlugin()&#xFF0C;&#x7F16;&#x8BD1;&#x9519;&#x8BEF;&#x65F6;&#x4E0D;&#x6253;&#x5370;&#x8F93;&#x51FA;&#x8D44;&#x6E90;&#x3002;
    noEmitOnErrors: true
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">performance</span>: {
    <span class="hljs-attr">hints</span>: <span class="hljs-string">&apos;warning&apos;</span>,
    <span class="hljs-attr">maxAssetSize</span>: <span class="hljs-number">250000</span>, <span class="hljs-comment">//&#x5355;&#x6587;&#x4EF6;&#x8D85;&#x8FC7;250k&#xFF0C;&#x547D;&#x4EE4;&#x884C;&#x544A;&#x8B66;</span>
    maxEntrypointSize: <span class="hljs-number">250000</span>, <span class="hljs-comment">//&#x9996;&#x6B21;&#x52A0;&#x8F7D;&#x6587;&#x4EF6;&#x603B;&#x548C;&#x8D85;&#x8FC7;250k&#xFF0C;&#x547D;&#x4EE4;&#x884C;&#x544A;&#x8B66;</span>
  }
  plugins: [
    <span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x6DFB;&#x52A0;NODE_ENV&#x4E3A;production</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({ <span class="hljs-string">&quot;process.env.NODE_ENV&quot;</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">&quot;production&quot;</span>) })
  ],
  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">minimize</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">//&#x53D6;&#x4EE3; new UglifyJsPlugin(/* ... */)</span>
    providedExports: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">usedExports</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">//&#x8BC6;&#x522B;package.json&#x4E2D;&#x7684;sideEffects&#x4EE5;&#x5254;&#x9664;&#x65E0;&#x7528;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x7528;&#x6765;&#x505A;tree-shake</span>
    <span class="hljs-comment">//&#x4F9D;&#x8D56;&#x4E8E;optimization.providedExports&#x548C;optimization.usedExports</span>
    sideEffects: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">//&#x53D6;&#x4EE3; new webpack.optimize.ModuleConcatenationPlugin()</span>
    concatenateModules: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">//&#x53D6;&#x4EE3; new webpack.NoEmitOnErrorsPlugin()&#xFF0C;&#x7F16;&#x8BD1;&#x9519;&#x8BEF;&#x65F6;&#x4E0D;&#x6253;&#x5370;&#x8F93;&#x51FA;&#x8D44;&#x6E90;&#x3002;</span>
    noEmitOnErrors: <span class="hljs-literal">true</span>
  }
}</code></pre><p>&#x5176;&#x4ED6;&#x7684;&#x4E00;&#x4E9B;&#x9ED8;&#x8BA4;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  context: process.cwd()
  entry: &apos;./src&apos;,
  output: {
    path: &apos;dist&apos;,
    filename: &apos;[name].js&apos;
  },
  rules: [
    {
      type: &quot;javascript/auto&quot;,
      resolve: {}
    },
    {
      test: /\.mjs$/i,
      type: &quot;javascript/esm&quot;,
      resolve: {
        mainFields:
        options.target === &quot;web&quot; ||
        options.target === &quot;webworker&quot; ||
        options.target === &quot;electron-renderer&quot;
          ? [&quot;browser&quot;, &quot;main&quot;]
          : [&quot;main&quot;]
      }
    },
    {
      test: /\.json$/i,
      type: &quot;json&quot;
    },
    {
      test: /\.wasm$/i,
      type: &quot;webassembly/experimental&quot;
    }
  ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">context</span>: process.cwd()
  entry: <span class="hljs-string">&apos;./src&apos;</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;dist&apos;</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;[name].js&apos;</span>
  },
  <span class="hljs-attr">rules</span>: [
    {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;javascript/auto&quot;</span>,
      <span class="hljs-attr">resolve</span>: {}
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.mjs$/i</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;javascript/esm&quot;</span>,
      <span class="hljs-attr">resolve</span>: {
        <span class="hljs-attr">mainFields</span>:
        options.target === <span class="hljs-string">&quot;web&quot;</span> ||
        options.target === <span class="hljs-string">&quot;webworker&quot;</span> ||
        options.target === <span class="hljs-string">&quot;electron-renderer&quot;</span>
          ? [<span class="hljs-string">&quot;browser&quot;</span>, <span class="hljs-string">&quot;main&quot;</span>]
          : [<span class="hljs-string">&quot;main&quot;</span>]
      }
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.json$/i</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;json&quot;</span>
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.wasm$/i</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;webassembly/experimental&quot;</span>
    }
  ]
}</code></pre><p>&#x5982;&#x679C;&#x60F3;&#x67E5;&#x770B;&#x66F4;&#x591A;webpack4&#x76F8;&#x5173;&#x7684;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#xFF0C;<a href="https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js" rel="nofollow noreferrer" target="_blank">&#x5230;&#x8FD9;&#x91CC;&#x6765;</a>&#x3002;&#x53EF;&#x4EE5;&#x770B;&#x5230;webpack4&#x628A;&#x5F88;&#x591A;&#x63D2;&#x4EF6;&#x76F8;&#x5173;&#x7684;&#x914D;&#x7F6E;&#x90FD;&#x8FC1;&#x79FB;&#x5230;&#x4E86;optimization&#x4E2D;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x770B;&#x770B;<a href="https://webpack.js.org/configuration/optimization/#optimization-noemitonerrors" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#x5BF9;optimization&#x7684;&#x4ECB;&#x7ECD;&#x7B80;&#x76F4;&#x5BE5;&#x5BE5;&#x65E0;&#x51E0;&#xFF0C;&#x800C;&#x5728;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;webpack&#x5BF9;optimization&#x7684;&#x914D;&#x7F6E;&#x6709;&#x5341;&#x51E0;&#x9879;&#xFF0C;&#x53CD;&#x6B63;&#x6211;&#x662F;&#x6015;&#x4E86;&#x3002;</p><p><span class="img-wrap"><img data-src="http://ovdk1wiaq.bkt.clouddn.com/18-6-4/22804701.jpg" src="https://static.alili.techhttp://ovdk1wiaq.bkt.clouddn.com/18-6-4/22804701.jpg" alt="&#x6587;&#x6863;&#x5BF9;optimization&#x7684;&#x4ECB;&#x7ECD;" title="&#x6587;&#x6863;&#x5BF9;optimization&#x7684;&#x4ECB;&#x7ECD;" style="cursor:pointer"></span></p><p>&#x867D;&#x7136;api&#x53D1;&#x751F;&#x4E86;&#x4E00;&#x4E9B;&#x53D8;&#x5316;&#xFF0C;&#x597D;&#x7684;&#x4E00;&#x9762;&#x5C31;&#x662F;&#x6709;&#x4E86;&#x8FD9;&#x4E9B;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x6211;&#x4EEC;&#x60F3;&#x901A;&#x8FC7;webpack&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x6BD4;&#x4EE5;&#x524D;&#x8981;&#x7B80;&#x5355;&#x5F88;&#x591A;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x53EA;&#x662F;&#x60F3;&#x7B80;&#x5355;&#x7684;&#x8FDB;&#x884C;&#x6253;&#x5305;&#xFF0C;&#x5728;package.json&#x4E2D;&#x6DFB;&#x52A0;&#x5982;&#x4E0B;&#x4E24;&#x4E2A;script&#xFF0C;&#x5305;&#x4F60;&#x6EE1;&#x610F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;webpack-dev-server --mode development&quot;,
    &quot;build&quot;: &quot;webpack --mode production&quot;
  },
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;scripts&quot;</span>: {
    <span class="hljs-attr">&quot;dev&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --mode development&quot;</span>,
    <span class="hljs-attr">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack --mode production&quot;</span>
  },
}</code></pre><p>&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4F7F;&#x7528;webpack-dev-server&#xFF0C;&#x8FB9;&#x9884;&#x89C8;&#x8FB9;&#x6253;&#x5305;&#x518D;&#x4E5F;&#x4E0D;&#x7528;f5&#xFF0C;&#x7B80;&#x76F4;&#x723D;&#x6B6A;&#x6B6A;&#xFF1B;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x76F4;&#x63A5;&#x751F;&#x6210;&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x5230;dist&#x76EE;&#x5F55;</p><h4>2&#x3001;loader&#x4E0E;plugin&#x7684;&#x5347;&#x7EA7;</h4><p>loader&#x7684;&#x5347;&#x7EA7;&#x5C31;&#x662F;&#x4E00;&#x6B21;&#x5927;&#x6362;&#x8840;&#xFF0C;&#x4E4B;&#x524D;&#x9002;&#x914D;webpack3&#x7684;loader&#x90FD;&#x9700;&#x8981;&#x5347;&#x7EA7;&#x624D;&#x80FD;&#x9002;&#x914D;webpack4&#x3002;&#x5982;&#x679C;&#x4F60;&#x4F7F;&#x7528;&#x4E86;&#x4E0D;&#x517C;&#x5BB9;&#x7684;loader&#xFF0C;webpack&#x4F1A;&#x544A;&#x8BC9;&#x4F60;&#xFF1A;</p><blockquote>DeprecationWarning: Tapable.apply is deprecated. Call apply on the plugin directly instead<p>DeprecationWarning: Tapable.plugin is deprecated. Use new API on <code>.hooks</code> instead</p></blockquote><p>&#x5982;&#x679C;&#x5728;&#x8FD0;&#x884C;&#x8FC7;&#x7A0B;&#x4E2D;&#x9047;&#x5230;&#x8FD9;&#x4E24;&#x4E2A;&#x8B66;&#x544A;&#xFF0C;&#x5C31;&#x8868;&#x793A;&#x4F60;&#x6709;loader&#x6216;&#x8005;plugin&#x6CA1;&#x6709;&#x5347;&#x7EA7;&#x3002;&#x9020;&#x6210;&#x8FD9;&#x4E24;&#x4E2A;&#x9519;&#x8BEF;&#x7684;&#x539F;&#x56E0;&#x662F;&#xFF0C;webpack4&#x4F7F;&#x7528;&#x7684;&#x65B0;&#x7684;&#x63D2;&#x4EF6;&#x7CFB;&#x7EDF;&#xFF0C;&#x5E76;&#x4E14;&#x7834;&#x574F;&#x6027;&#x7684;&#x5BF9;api&#x8FDB;&#x884C;&#x4E86;&#x66F4;&#x65B0;&#xFF0C;&#x4E0D;&#x8FC7;&#x597D;&#x5728;&#x8FD9;&#x53EA;&#x662F;&#x8B66;&#x544A;&#xFF0C;&#x4E0D;&#x4F1A;&#x5BFC;&#x81F4;&#x7A0B;&#x5E8F;&#x9000;&#x51FA;&#xFF0C;&#x4E0D;&#x8FC7;&#x5EFA;&#x8BAE;&#x6700;&#x597D;&#x662F;&#x8FDB;&#x884C;&#x5347;&#x7EA7;&#x3002;&#x5BF9;&#x4E8E;loader&#x6700;&#x597D;&#x5168;&#x90E8;&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#x5347;&#x7EA7;&#xFF0C;&#x53CD;&#x6B63;&#x4E5F;&#x4E0D;&#x4E8F;&#xFF0C;&#x767E;&#x5229;&#x800C;&#x65E0;&#x4E00;&#x5BB3;&#x3002;</p><p>&#x5173;&#x4E8E;plugin&#xFF0C;&#x6709;&#x4E24;&#x4E2A;&#x5751;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;<code>extract-text-webpack-plugin</code>&#xFF0C;&#x8FD8;&#x4E00;&#x4E2A;&#x662F;<code>html-webpack-plugin</code>&#x3002;</p><p>&#x5148;&#x8BF4;&#x8BF4;<code>extract-text-webpack-plugin</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x4E3B;&#x8981;&#x7528;&#x4E8E;&#x5C06;&#x591A;&#x4E2A;css&#x5408;&#x5E76;&#x6210;&#x4E00;&#x4E2A;css&#xFF0C;&#x51CF;&#x5C11;http&#x8BF7;&#x6C42;&#xFF0C;&#x547D;&#x540D;&#x65F6;&#x652F;&#x6301;contenthash(&#x6839;&#x636E;&#x6587;&#x672C;&#x5185;&#x5BB9;&#x751F;&#x6210;hash)&#x3002;&#x4F46;&#x662F;webpack4&#x4F7F;&#x7528;&#x6709;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x6240;&#x4EE5;&#x5B98;&#x65B9;&#x63A8;&#x8350;&#x4F7F;&#x7528;<code>mini-css-extract-plugin</code>&#x3002;</p><blockquote>&#x26A0;&#xFE0F; Since webpack v4 the extract-text-webpack-plugin should not be used for css. Use mini-css-extract-plugin instead.</blockquote><p>&#x8FD9;&#x91CC;&#x6539;&#x52A8;&#x6BD4;&#x8F83;&#x5C0F;&#xFF0C;&#x53EA;&#x8981;&#x66FF;&#x6362;&#x4E0B;&#x63D2;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x6539;&#x52A8;&#x4E0B;css&#x76F8;&#x5173;&#x7684;loader&#x5C31;&#x884C;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-const ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;)
+const MiniCssExtractPlugin = require(&apos;mini-css-extract-plugin&apos;)

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
-       use: ExtractTextPlugin.extract({
-         use: [{
-           loader: &apos;css-loader&apos;,
-           options: {
-             minimize: process.env.NODE_ENV === &apos;production&apos;
-           }
-         }],
-         fallback: &apos;vue-style-loader&apos;
-       })
+       use: [
+         MiniCssExtractPlugin.loader,
+         {
+           loader: &apos;css-loader&apos;,
+           options: {
+           minimize: process.env.NODE_ENV === &apos;production&apos;
+         }
+       ],
      }
    ]
  },
  plugins:[
-   new ExtractTextPlugin({
+   new MiniCssExtractPlugin({
      filename: &apos;css/[name].css&apos;,
    }),
  ...
  ]
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="diff hljs"><code class="diff"><span class="hljs-deletion">-const ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;)</span>
<span class="hljs-addition">+const MiniCssExtractPlugin = require(&apos;mini-css-extract-plugin&apos;)</span>

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
<span class="hljs-deletion">-       use: ExtractTextPlugin.extract({</span>
<span class="hljs-deletion">-         use: [{</span>
<span class="hljs-deletion">-           loader: &apos;css-loader&apos;,</span>
<span class="hljs-deletion">-           options: {</span>
<span class="hljs-deletion">-             minimize: process.env.NODE_ENV === &apos;production&apos;</span>
<span class="hljs-deletion">-           }</span>
<span class="hljs-deletion">-         }],</span>
<span class="hljs-deletion">-         fallback: &apos;vue-style-loader&apos;</span>
<span class="hljs-deletion">-       })</span>
<span class="hljs-addition">+       use: [</span>
<span class="hljs-addition">+         MiniCssExtractPlugin.loader,</span>
<span class="hljs-addition">+         {</span>
<span class="hljs-addition">+           loader: &apos;css-loader&apos;,</span>
<span class="hljs-addition">+           options: {</span>
<span class="hljs-addition">+           minimize: process.env.NODE_ENV === &apos;production&apos;</span>
<span class="hljs-addition">+         }</span>
<span class="hljs-addition">+       ],</span>
      }
    ]
  },
  plugins:[
<span class="hljs-deletion">-   new ExtractTextPlugin({</span>
<span class="hljs-addition">+   new MiniCssExtractPlugin({</span>
      filename: &apos;css/[name].css&apos;,
    }),
  ...
  ]
}
</code></pre><p>&#x7136;&#x540E;&#x770B;&#x770B;<code>html-webpack-plugin</code>&#xFF0C;&#x5C06;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x5347;&#x7EA7;&#x5230;&#x6700;&#x65B0;&#x7248;&#x672C;&#xFF0C;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x6CA1;&#x5565;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E2A;&#x5751;&#xFF0C;&#x6700;&#x597D;&#x662F;&#x628A;<code>chunksSortMode</code>&#x8FD9;&#x4E2A;&#x9009;&#x9879;&#x8BBE;&#x7F6E;&#x4E3A;none&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;)
module.exports = {
  plugins:[
    new HtmlWebpackPlugin({
      filename: &apos;index.html&apos;,
      template: &apos;index.html&apos;,
      inject: true,
      hash: true,
      chunksSortMode: &apos;none&apos; //&#x5982;&#x679C;&#x4F7F;&#x7528;webpack4&#x5C06;&#x8BE5;&#x914D;&#x7F6E;&#x9879;&#x8BBE;&#x7F6E;&#x4E3A;&apos;none&apos;
    })
  ]
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>)
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>:[
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;index.html&apos;</span>,
      <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;index.html&apos;</span>,
      <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">hash</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">chunksSortMode</span>: <span class="hljs-string">&apos;none&apos;</span> <span class="hljs-comment">//&#x5982;&#x679C;&#x4F7F;&#x7528;webpack4&#x5C06;&#x8BE5;&#x914D;&#x7F6E;&#x9879;&#x8BBE;&#x7F6E;&#x4E3A;&apos;none&apos;</span>
    })
  ]
}
</code></pre><p>&#x5B98;&#x65B9;&#x6709;&#x4E2A;<a href="https://github.com/jantimon/html-webpack-plugin/issues/870" rel="nofollow noreferrer" target="_blank">issues</a>&#x8BA8;&#x8BBA;&#x4E86;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x53BB;&#x770B;&#x770B;&#x3002;&#x76EE;&#x524D;&#x4F5C;&#x8005;&#x8FD8;&#x5728;&#x5BFB;&#x627E;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x4E2D;&#x3002;<br><span class="img-wrap"><img data-src="http://ovdk1wiaq.bkt.clouddn.com/18-6-7/22043868.jpg" src="https://static.alili.techhttp://ovdk1wiaq.bkt.clouddn.com/18-6-7/22043868.jpg" alt="html-webpack-plugin issues" title="html-webpack-plugin issues" style="cursor:pointer"></span></p><p>&#x53E6;&#x5916;&#xFF0C;webpack-dev-server&#x4E5F;&#x6709;&#x4E2A;&#x5347;&#x7EA7;&#x7248;&#x672C;&#xFF0C;&#x53EB;&#x505A;<a href="https://www.npmjs.com/package/webpack-serve" rel="nofollow noreferrer" target="_blank">webpack-serve</a>&#xFF0C;&#x529F;&#x80FD;&#x6BD4;webpack-dev-server&#x5F3A;&#x5927;&#xFF0C;&#x652F;&#x6301;HTTP2&#x3001;&#x4F7F;&#x7528;WebSockets&#x505A;&#x70ED;&#x66F4;&#x65B0;&#xFF0C;&#x6682;&#x65F6;&#x8FD8;&#x5728;&#x89C2;&#x671B;&#x4E2D;&#xFF0C;&#x540E;&#x7EED;&#x91C7;&#x5751;&#x3002;</p><h4>3&#x3001;webpack4&#x7684;&#x6A21;&#x5757;&#x62C6;&#x5206;</h4><p>webpack3&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x7ECF;&#x5E38;&#x4F7F;&#x7528;<code>CommonsChunkPlugin</code>&#x8FDB;&#x884C;&#x6A21;&#x5757;&#x7684;&#x62C6;&#x5206;&#xFF0C;&#x5C06;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x516C;&#x5171;&#x90E8;&#x5206;&#xFF0C;&#x4EE5;&#x53CA;&#x53D8;&#x52A8;&#x8F83;&#x5C11;&#x7684;&#x6846;&#x67B6;&#x6216;&#x8005;&#x5E93;&#x63D0;&#x53D6;&#x5230;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x5F15;&#x5165;&#x7684;&#x6846;&#x67B6;&#x4EE3;&#x7801;(vue&#x3001;react)&#x3002;&#x53EA;&#x8981;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x8FC7;&#x4E00;&#x6B21;&#x4E4B;&#x540E;&#xFF0C;&#x62BD;&#x79BB;&#x51FA;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x5C31;&#x53EF;&#x4EE5;&#x653E;&#x5165;&#x7F13;&#x5B58;&#x4E2D;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6BCF;&#x6B21;&#x52A0;&#x8F7D;&#x9875;&#x9762;&#x90FD;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#x5168;&#x90E8;&#x8D44;&#x6E90;&#x3002;</p><p>CommonsChunkPlugin&#x7684;&#x5E38;&#x89C4;&#x7528;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ //&#x5C06;node_modules&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x653E;&#x5165;vendor.js&#x4E2D;
      name: &quot;vendor&quot;,
      minChunks: function(module){
        return module.context &amp;&amp; module.context.includes(&quot;node_modules&quot;);
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ //&#x5C06;webpack&#x4E2D;runtime&#x76F8;&#x5173;&#x7684;&#x4EE3;&#x7801;&#x653E;&#x5165;manifest.js&#x4E2D;
      name: &quot;manifest&quot;,
      minChunks: Infinity
    }),
  ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({ <span class="hljs-comment">//&#x5C06;node_modules&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x653E;&#x5165;vendor.js&#x4E2D;</span>
      name: <span class="hljs-string">&quot;vendor&quot;</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.context &amp;&amp; <span class="hljs-built_in">module</span>.context.includes(<span class="hljs-string">&quot;node_modules&quot;</span>);
      }
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({ <span class="hljs-comment">//&#x5C06;webpack&#x4E2D;runtime&#x76F8;&#x5173;&#x7684;&#x4EE3;&#x7801;&#x653E;&#x5165;manifest.js&#x4E2D;</span>
      name: <span class="hljs-string">&quot;manifest&quot;</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>
    }),
  ]
}</code></pre><p>&#x4E4B;&#x524D;<code>CommonsChunkPlugin</code>&#x867D;&#x7136;&#x80FD;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x914D;&#x7F6E;&#x4E0D;&#x591F;&#x7075;&#x6D3B;&#xFF0C;&#x96BE;&#x4EE5;&#x7406;&#x89E3;&#xFF0C;minChunks&#x6709;&#x65F6;&#x5019;&#x4E3A;&#x6570;&#x5B57;&#xFF0C;&#x6709;&#x65F6;&#x5019;&#x4E3A;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x5982;&#x679C;&#x540C;&#x6B65;&#x6A21;&#x5757;&#x4E0E;&#x5F02;&#x6B65;&#x6A21;&#x5757;&#x90FD;&#x5F15;&#x5165;&#x4E86;&#x76F8;&#x540C;&#x7684;module&#x5E76;&#x4E0D;&#x80FD;&#x5C06;&#x516C;&#x5171;&#x90E8;&#x5206;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#xFF0C;&#x6700;&#x540E;&#x6253;&#x5305;&#x751F;&#x6210;&#x7684;js&#x8FD8;&#x662F;&#x5B58;&#x5728;&#x76F8;&#x540C;&#x7684;module&#x3002;</p><p>&#x73B0;&#x5728;webpack4&#x4F7F;&#x7528;<code>optimization.splitChunks</code>&#x6765;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x7684;&#x62C6;&#x5206;&#xFF0C;&#x4F7F;&#x7528;<code>optimization.runtimeChunk</code>&#x6765;&#x63D0;&#x53D6;webpack&#x7684;runtime&#x4EE3;&#x7801;&#xFF0C;&#x5F15;&#x5165;&#x4E86;&#x65B0;&#x7684;<code>cacheGroups</code>&#x6982;&#x5FF5;&#x3002;&#x5E76;&#x4E14;webpack4&#x4E2D;optimization&#x63D0;&#x4F9B;&#x5982;&#x4E0B;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x5B98;&#x65B9;&#x79F0;&#x8FD9;&#x79CD;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x662F;&#x4FDD;&#x6301;web&#x6027;&#x80FD;&#x7684;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#xFF0C;&#x4E0D;&#x8981;&#x624B;&#x8D31;&#x53BB;&#x4FEE;&#x6539;&#xFF0C;&#x5C31;&#x7B97;&#x4F60;&#x8981;&#x6539;&#x4E5F;&#x8981;&#x591A;&#x6D4B;&#x8BD5;&#xFF08;&#x5B98;&#x65B9;&#x5C31;&#x662F;&#x8FD9;&#x4E48;&#x81EA;&#x4FE1;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  optimization: {
    minimize: env === &apos;production&apos; ? true : false, //&#x662F;&#x5426;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x538B;&#x7F29;
    splitChunks: {
      chunks: &quot;async&quot;,
      minSize: 30000, //&#x6A21;&#x5757;&#x5927;&#x4E8E;30k&#x4F1A;&#x88AB;&#x62BD;&#x79BB;&#x5230;&#x516C;&#x5171;&#x6A21;&#x5757;
      minChunks: 1, //&#x6A21;&#x5757;&#x51FA;&#x73B0;1&#x6B21;&#x5C31;&#x4F1A;&#x88AB;&#x62BD;&#x79BB;&#x5230;&#x516C;&#x5171;&#x6A21;&#x5757;
      maxAsyncRequests: 5, //&#x5F02;&#x6B65;&#x6A21;&#x5757;&#xFF0C;&#x4E00;&#x6B21;&#x6700;&#x591A;&#x53EA;&#x80FD;&#x88AB;&#x52A0;&#x8F7D;5&#x4E2A;
      maxInitialRequests: 3, //&#x5165;&#x53E3;&#x6A21;&#x5757;&#x6700;&#x591A;&#x53EA;&#x80FD;&#x52A0;&#x8F7D;3&#x4E2A;
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    runtimeChunk {
      name: &quot;runtime&quot;
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">minimize</span>: env === <span class="hljs-string">&apos;production&apos;</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>, <span class="hljs-comment">//&#x662F;&#x5426;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x538B;&#x7F29;</span>
    splitChunks: {
      <span class="hljs-attr">chunks</span>: <span class="hljs-string">&quot;async&quot;</span>,
      <span class="hljs-attr">minSize</span>: <span class="hljs-number">30000</span>, <span class="hljs-comment">//&#x6A21;&#x5757;&#x5927;&#x4E8E;30k&#x4F1A;&#x88AB;&#x62BD;&#x79BB;&#x5230;&#x516C;&#x5171;&#x6A21;&#x5757;</span>
      minChunks: <span class="hljs-number">1</span>, <span class="hljs-comment">//&#x6A21;&#x5757;&#x51FA;&#x73B0;1&#x6B21;&#x5C31;&#x4F1A;&#x88AB;&#x62BD;&#x79BB;&#x5230;&#x516C;&#x5171;&#x6A21;&#x5757;</span>
      maxAsyncRequests: <span class="hljs-number">5</span>, <span class="hljs-comment">//&#x5F02;&#x6B65;&#x6A21;&#x5757;&#xFF0C;&#x4E00;&#x6B21;&#x6700;&#x591A;&#x53EA;&#x80FD;&#x88AB;&#x52A0;&#x8F7D;5&#x4E2A;</span>
      maxInitialRequests: <span class="hljs-number">3</span>, <span class="hljs-comment">//&#x5165;&#x53E3;&#x6A21;&#x5757;&#x6700;&#x591A;&#x53EA;&#x80FD;&#x52A0;&#x8F7D;3&#x4E2A;</span>
      name: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">cacheGroups</span>: {
        <span class="hljs-attr">default</span>: {
          <span class="hljs-attr">minChunks</span>: <span class="hljs-number">2</span>,
          <span class="hljs-attr">priority</span>: <span class="hljs-number">-20</span>
          reuseExistingChunk: <span class="hljs-literal">true</span>,
        },
        <span class="hljs-attr">vendors</span>: {
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/[\\/]node_modules[\\/]/</span>,
          <span class="hljs-attr">priority</span>: <span class="hljs-number">-10</span>
        }
      }
    },
    runtimeChunk {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;runtime&quot;</span>
    }
  }
}</code></pre><p>&#x6709;&#x4E86;&#x8FD9;&#x4E9B;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#xFF0C;&#x6211;&#x4EEC;&#x51E0;&#x4E4E;&#x4E0D;&#x9700;&#x8981;&#x4EFB;&#x4F55;&#x6210;&#x529F;&#x5C31;&#x80FD;&#x5220;&#x9664;&#x4E4B;&#x524D;CommonChunkPlugin&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x597D;&#x795E;&#x5947;&#x3002;</p><h5>&#x4EC0;&#x4E48;&#x6A21;&#x5757;&#x4F1A;&#x8FDB;&#x884C;&#x63D0;&#x53D6;&#xFF1F;</h5><p>&#x901A;&#x8FC7;&#x5224;&#x65AD;<code>splitChunks.chunks</code>&#x7684;&#x503C;&#x6765;&#x786E;&#x5B9A;&#x54EA;&#x4E9B;&#x6A21;&#x5757;&#x4F1A;&#x63D0;&#x53D6;&#x516C;&#x5171;&#x6A21;&#x5757;&#xFF0C;&#x8BE5;&#x914D;&#x7F6E;&#x4E00;&#x5171;&#x6709;&#x4E09;&#x4E2A;&#x9009;&#x9879;&#xFF0C;<code>initial</code>&#x3001;<code>async</code>&#x3001; <code>all</code>&#x3002;<br>&#x9ED8;&#x8BA4;&#x4E3A;async&#xFF0C;&#x8868;&#x793A;&#x53EA;&#x4F1A;&#x63D0;&#x53D6;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x7684;&#x516C;&#x5171;&#x4EE3;&#x7801;&#xFF0C;initial&#x8868;&#x793A;&#x53EA;&#x4F1A;&#x63D0;&#x53D6;&#x521D;&#x59CB;&#x5165;&#x53E3;&#x6A21;&#x5757;&#x7684;&#x516C;&#x5171;&#x4EE3;&#x7801;&#xFF0C;all&#x8868;&#x793A;&#x540C;&#x65F6;&#x63D0;&#x53D6;&#x524D;&#x4E24;&#x8005;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6709;&#x4E2A;&#x6982;&#x5FF5;&#x9700;&#x8981;&#x660E;&#x786E;&#xFF0C;webpack&#x4E2D;&#x4EC0;&#x4E48;&#x662F;&#x521D;&#x59CB;&#x5165;&#x53E3;&#x6A21;&#x5757;&#xFF0C;&#x4EC0;&#x4E48;&#x662F;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x3002;e.g.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
module.exports = {
  entry: {
    main: &apos;src/index.js&apos;
  }
}

//index.js
import Vue from &apos;vue&apos;
import(/* webpackChunkName: &quot;asyncModule&quot; */&apos;./a.js&apos;)
  .then(mod =&gt; {
    console.log(&apos;loaded module a&apos;, mod)
  })

console.log(&apos;initial module&apos;)
new Vue({})

//a.js
import _ from &apos;lodash&apos;
const obj = { name: &apos;module a&apos; }
export default _.clone(obj)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">main</span>: <span class="hljs-string">&apos;src/index.js&apos;</span>
  }
}

<span class="hljs-comment">//index.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: &quot;asyncModule&quot; */</span><span class="hljs-string">&apos;./a.js&apos;</span>)
  .then(<span class="hljs-function"><span class="hljs-params">mod</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;loaded module a&apos;</span>, mod)
  })

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;initial module&apos;</span>)
<span class="hljs-keyword">new</span> Vue({})

<span class="hljs-comment">//a.js</span>
<span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;lodash&apos;</span>
<span class="hljs-keyword">const</span> obj = { <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;module a&apos;</span> }
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> _.clone(obj)</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;<code>index.js</code>&#x5728;webpack&#x7684;entry&#x914D;&#x7F6E;&#x4E2D;&#xFF0C;&#x8FD9;&#x662F;&#x6253;&#x5305;&#x7684;&#x5165;&#x53E3;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x662F;&#x521D;&#x59CB;&#x5165;&#x53E3;&#x6A21;&#x5757;&#x3002;&#x518D;&#x770B;&#x770B;<code>index.js</code>&#x4E2D;&#x4F7F;&#x7528;&#x4E86;&#x52A8;&#x6001;import&#x8BED;&#x6CD5;&#xFF0C;&#x5BF9;<code>a.js</code>&#xFF08;&#x8BE5;&#x5F02;&#x6B65;&#x6A21;&#x5757;&#x88AB;&#x547D;&#x540D;&#x4E3A;asyncModule&#xFF09;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#xFF0C;&#x5219;<code>a.js</code>&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x3002;&#x518D;&#x770B;&#x770B;<code>index.js</code>&#x548C;<code>a.js</code>&#x90FD;&#x6709;&#x6765;&#x81EA;<code>node_modules</code>&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x6309;&#x7167;&#x4E4B;&#x524D;&#x7684;&#x89C4;&#x5219;&#xFF0C;splitChunks.chunks&#x9ED8;&#x8BA4;&#x4E3A;<code>async</code>&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x88AB;&#x63D0;&#x53D6;&#x5230;vendors&#x4E2D;&#x7684;&#x53EA;&#x6709;webpackChunkName&#x4E2D;&#x7684;&#x6A21;&#x5757;&#x3002;</p><p><span class="img-wrap"><img data-src="http://ovdk1wiaq.bkt.clouddn.com/18-6-9/6383332.jpg" src="https://static.alili.techhttp://ovdk1wiaq.bkt.clouddn.com/18-6-9/6383332.jpg" alt="chunks&#x4E3A;async" title="chunks&#x4E3A;async" style="cursor:pointer"></span></p><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x628A;splitChunks.chunks&#x6539;&#x6210;all&#xFF0C;main&#x4E2D;&#x6765;&#x81EA;<code>node_modules</code>&#x7684;&#x6A21;&#x5757;&#x4E5F;&#x4F1A;&#x88AB;&#x8FDB;&#x884C;&#x63D0;&#x53D6;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  optimization: {
    splitChunks: {
      chunks: &quot;all&quot;
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">splitChunks</span>: {
      <span class="hljs-attr">chunks</span>: <span class="hljs-string">&quot;all&quot;</span>
    }
  }
}</code></pre><p><span class="img-wrap"><img data-src="http://ovdk1wiaq.bkt.clouddn.com/18-6-9/30305961.jpg" src="https://static.alili.techhttp://ovdk1wiaq.bkt.clouddn.com/18-6-9/30305961.jpg" alt="chunks&#x4E3A;all" title="chunks&#x4E3A;all" style="cursor:pointer"></span></p><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5728;<code>index.js</code>&#x4E2D;&#x4E5F;&#x5F15;&#x5165;lodash&#xFF0C;&#x770B;&#x770B;&#x5165;&#x53E3;&#x6A21;&#x5757;&#x548C;&#x5F02;&#x6B65;&#x6A21;&#x5757;&#x7684;&#x516C;&#x5171;&#x6A21;&#x5757;&#x8FD8;&#x4F1A;&#x4E0D;&#x4F1A;&#x50CF;CommonsChunkPlugin&#x4E00;&#x6837;&#x88AB;&#x91CD;&#x590D;&#x6253;&#x5305;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.js
import Vue from &apos;vue&apos;
import _ from &apos;lodash&apos;

import(/* webpackChunkName: &quot;asyncModule&quot; */&apos;./a.js&apos;)
  .then(mod =&gt; {
    console.log(&apos;loaded module a&apos;, mod)
  })

console.log(&apos;initial module&apos;)
console.log(_.map([1,2,3], a =&gt; {
    return a * 10
}))
new Vue({})

//a.js
import _ from &apos;lodash&apos;
const obj = { name: &apos;module a&apos; }
export default _.clone(obj)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//index.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;lodash&apos;</span>

<span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: &quot;asyncModule&quot; */</span><span class="hljs-string">&apos;./a.js&apos;</span>)
  .then(<span class="hljs-function"><span class="hljs-params">mod</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;loaded module a&apos;</span>, mod)
  })

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;initial module&apos;</span>)
<span class="hljs-built_in">console</span>.log(_.map([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>], a =&gt; {
    <span class="hljs-keyword">return</span> a * <span class="hljs-number">10</span>
}))
<span class="hljs-keyword">new</span> Vue({})

<span class="hljs-comment">//a.js</span>
<span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;lodash&apos;</span>
<span class="hljs-keyword">const</span> obj = { <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;module a&apos;</span> }
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> _.clone(obj)</code></pre><p><span class="img-wrap"><img data-src="http://ovdk1wiaq.bkt.clouddn.com/18-6-9/67725879.jpg" src="https://static.alili.techhttp://ovdk1wiaq.bkt.clouddn.com/18-6-9/67725879.jpg" alt="&#x89E3;&#x51B3;&#x4E86;CommonsChunkPlugin&#x7684;&#x95EE;&#x9898;" title="&#x89E3;&#x51B3;&#x4E86;CommonsChunkPlugin&#x7684;&#x95EE;&#x9898;" style="cursor:pointer;display:inline"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x4E4B;&#x524D;CommonsChunkPlugin&#x7684;&#x95EE;&#x9898;&#x5DF2;&#x7ECF;&#x88AB;&#x89E3;&#x51B3;&#x4E86;&#xFF0C;main&#x6A21;&#x5757;&#x4E0E;asyncModule&#x6A21;&#x5757;&#x5171;&#x540C;&#x7684;lodash&#x90FD;&#x88AB;&#x6253;&#x5305;&#x8FDB;&#x4E86;<code>vendors~main.js</code>&#x4E2D;&#x3002;</p><h5>&#x63D0;&#x53D6;&#x7684;&#x89C4;&#x5219;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;</h5><p><code>splitChunks.cacheGroups</code>&#x914D;&#x7F6E;&#x9879;&#x5C31;&#x662F;&#x7528;&#x6765;&#x8868;&#x793A;&#xFF0C;&#x4F1A;&#x63D0;&#x53D6;&#x5230;&#x516C;&#x5171;&#x6A21;&#x5757;&#x7684;&#x4E00;&#x4E2A;&#x96C6;&#x5408;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x63D0;&#x53D6;&#x89C4;&#x5219;&#x3002;&#x50CF;&#x524D;&#x9762;&#x7684;<code>vendor</code>&#xFF0C;&#x5C31;&#x662F;webpack4&#x9ED8;&#x8BA4;&#x63D0;&#x4F9B;&#x7684;&#x4E00;&#x4E2A;cacheGroup&#xFF0C;&#x8868;&#x793A;&#x6765;&#x81EA;node_modules&#x7684;&#x6A21;&#x5757;&#x4E3A;&#x4E00;&#x4E2A;&#x96C6;&#x5408;&#x3002;</p><p>&#x9664;&#x4E86;cacheGroups&#x914D;&#x7F6E;&#x9879;&#x5916;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x4E0B;&#x5176;&#x4ED6;&#x7684;&#x51E0;&#x4E2A;&#x9ED8;&#x8BA4;&#x89C4;&#x5219;&#x3002;</p><ol><li>&#x88AB;&#x63D0;&#x53D6;&#x7684;&#x6A21;&#x5757;&#x5FC5;&#x987B;&#x5927;&#x4E8E;30kb&#xFF1B;</li><li>&#x6A21;&#x5757;&#x88AB;&#x5F15;&#x5165;&#x7684;&#x6B21;&#x6570;&#x5FC5;&#x987B;&#x5927;&#x4E8E;1&#x6B21;&#xFF1B;</li><li>&#x5BF9;&#x4E8E;&#x5F02;&#x6B65;&#x6A21;&#x5757;&#xFF0C;&#x751F;&#x6210;&#x7684;&#x516C;&#x5171;&#x6A21;&#x5757;&#x6587;&#x4EF6;&#x4E0D;&#x80FD;&#x8D85;&#x51FA;5&#x4E2A;&#xFF1B;</li><li>&#x5BF9;&#x4E8E;&#x5165;&#x53E3;&#x6A21;&#x5757;&#xFF0C;&#x62BD;&#x79BB;&#x51FA;&#x7684;&#x516C;&#x5171;&#x6A21;&#x5757;&#x6587;&#x4EF6;&#x4E0D;&#x80FD;&#x8D85;&#x51FA;3&#x4E2A;&#x3002;</li></ol><p>&#x5BF9;&#x5E94;&#x5230;&#x4EE3;&#x7801;&#x4E2D;&#x5C31;&#x662F;&#x8FD9;&#x56DB;&#x4E2A;&#x914D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">minSize</span>: <span class="hljs-number">30000</span>,
    <span class="hljs-attr">minChunks</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">maxAsyncRequests</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">maxInitialRequests</span>: <span class="hljs-number">3</span>,
}</code></pre><h2 id="articleHeader2">&#x4E09;&#x3001;&#x8D60;&#x9001;webpack&#x5E38;&#x89C1;&#x4F18;&#x5316;&#x65B9;&#x5F0F;</h2><h4>1&#x3001;&#x4E00;&#x4E2A;&#x4EBA;&#x4E0D;&#x884C;&#xFF0C;&#x5927;&#x5BB6;&#x4E00;&#x8D77;&#x4E0A;</h4><p>webpack&#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;node&#x7684;&#x524D;&#x7AEF;&#x6253;&#x5305;&#x5DE5;&#x5177;&#xFF0C;&#x4F46;&#x662F;node&#x57FA;&#x4E8E;v8&#x8FD0;&#x884C;&#x65F6;&#x53EA;&#x80FD;&#x662F;&#x5355;&#x7EBF;&#x7A0B;&#xFF0C;&#x4F46;&#x662F;node&#x4E2D;&#x80FD;&#x591F;fork&#x5B50;&#x8FDB;&#x7A0B;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x591A;&#x8FDB;&#x7A0B;&#x7684;&#x65B9;&#x5F0F;&#x8FD0;&#x884C;loader&#xFF0C;&#x548C;&#x538B;&#x7F29;js&#xFF0C;&#x793E;&#x533A;&#x6709;&#x4E24;&#x4E2A;&#x63D2;&#x4EF6;&#x5C31;&#x662F;&#x4E13;&#x95E8;&#x5E72;&#x8FD9;&#x4E24;&#x4E2A;&#x4E8B;&#x7684;&#xFF1A;HappyPack&#x3001;ParallelUglifyPlugin&#x3002;</p><p>&#x4F7F;&#x7528;<a href="https://github.com/amireh/happypack" rel="nofollow noreferrer" target="_blank">HappyPack</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;)
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // loader: &apos;babel-loader&apos;
        loader: &apos;happypack/loader?id=babel&apos;
      }
    ]
  },
  plugins: [
    new require(&apos;happypack&apos;)({
      id: &apos;babel&apos;,
      loaders: [&apos;babel-loader&apos;]
    }),
  ],
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-comment">// loader: &apos;babel-loader&apos;</span>
        loader: <span class="hljs-string">&apos;happypack/loader?id=babel&apos;</span>
      }
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;happypack&apos;</span>)({
      <span class="hljs-attr">id</span>: <span class="hljs-string">&apos;babel&apos;</span>,
      <span class="hljs-attr">loaders</span>: [<span class="hljs-string">&apos;babel-loader&apos;</span>]
    }),
  ],
};</code></pre><p>&#x4F7F;&#x7528;<a href="https://github.com/gdborton/webpack-parallel-uglify-plugin" rel="nofollow noreferrer" target="_blank">ParallelUglifyPlugin</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  optimization: {
    minimizer: [
      new require(&apos;webpack-parallel-uglify-plugin&apos;)({
        // &#x914D;&#x7F6E;&#x9879;
      }),
    ]
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">minimizer</span>: [
      <span class="hljs-keyword">new</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-parallel-uglify-plugin&apos;</span>)({
        <span class="hljs-comment">// &#x914D;&#x7F6E;&#x9879;</span>
      }),
    ]
  }
}</code></pre><h4>2&#x3001;&#x6253;&#x5305;&#x518D;&#x6253;&#x5305;</h4><p>&#x4F7F;windows&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x7ECF;&#x5E38;&#x4F1A;&#x770B;&#x5230;&#x4E00;&#x4E9B;<code>.dll</code>&#x6587;&#x4EF6;&#xFF0C;dll&#x6587;&#x4EF6;&#x88AB;&#x79F0;&#x4E3A;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#xFF0C;&#x91CC;&#x9762;&#x5305;&#x542B;&#x4E86;&#x7A0B;&#x5E8F;&#x8FD0;&#x884C;&#x65F6;&#x7684;&#x4E00;&#x4E9B;&#x52A8;&#x6001;&#x51FD;&#x6570;&#x5E93;&#xFF0C;&#x591A;&#x4E2A;&#x7A0B;&#x5E8F;&#x53EF;&#x4EE5;&#x5171;&#x7528;&#x4E00;&#x4E2A;dll&#x6587;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x51CF;&#x5C11;&#x7A0B;&#x5E8F;&#x8FD0;&#x884C;&#x65F6;&#x7684;&#x7269;&#x7406;&#x5185;&#x5B58;&#x3002;</p><p>webpack&#x4E2D;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x5F15;&#x5165;dll&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x4F7F;&#x7528;<a href="https://webpack.js.org/plugins/dll-plugin/" rel="nofollow noreferrer" target="_blank">DllPlugin</a>&#x63D2;&#x4EF6;&#xFF0C;&#x5C06;&#x4E0D;&#x7ECF;&#x5E38;&#x53D8;&#x5316;&#x7684;&#x6846;&#x67B6;&#x4EE3;&#x7801;&#x6253;&#x5305;&#x5230;&#x4E00;&#x4E2A;js&#x4E2D;&#xFF0C;&#x6BD4;&#x5982;&#x53EB;&#x505A;dll.js&#x3002;&#x5728;&#x6253;&#x5305;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x68C0;&#x6D4B;&#x5230;&#x67D0;&#x4E2A;&#x5757;&#x5DF2;&#x7ECF;&#x5728;dll.js&#x4E2D;&#x5C31;&#x4E0D;&#x4F1A;&#x518D;&#x6253;&#x5305;&#x3002;&#x4E4B;&#x524D;DllPlugin&#x4E0E;CommonsChunkPlugin&#x5E76;&#x80FD;&#x76F8;&#x4E92;&#x517C;&#x5BB9;&#xFF0C;&#x672C;&#x662F;&#x540C;&#x6839;&#x751F;&#x76F8;&#x714E;&#x4F55;&#x592A;&#x6025;&#x3002;&#x4F46;&#x662F;&#x5347;&#x7EA7;&#x5230;webpack4&#x4E4B;&#x540E;&#xFF0C;&#x95EE;&#x9898;&#x5C31;&#x8FCE;&#x5203;&#x800C;&#x89E3;&#x4E86;&#x3002;</p><p>&#x4F7F;&#x7528;DllPlugin&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8981;&#x5148;&#x5199;&#x53E6;&#x5916;&#x4E00;&#x4E2A;webpack&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x7528;&#x6765;&#x751F;&#x6210;dll&#x6587;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.vue.dll.js
const path = require(&apos;path&apos;)

module.exports = {
  entry: {
    // &#x628A; vue &#x76F8;&#x5173;&#x6A21;&#x5757;&#x7684;&#x653E;&#x5230;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;
    vue: [&apos;vue&apos;, &apos;vue-router&apos;, &apos;vuex&apos;, &apos;element-ui&apos;]
  },
  output: {
    filename: &apos;[name].dll.js&apos;, //&#x751F;&#x6210;vue.dll.js
    path: path.resolve(__dirname, &apos;dist&apos;),
    library: &apos;_dll_[name]&apos;
  },
  plugins: [
    new require(&apos;webpack/lib/DllPlugin&apos;)({
      name: &apos;_dll_[name]&apos;,
      // manifest.json &#x63CF;&#x8FF0;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x5305;&#x542B;&#x4E86;&#x54EA;&#x4E9B;&#x5185;&#x5BB9;
      path: path.join(__dirname, &apos;dist&apos;, &apos;[name].manifest.json&apos;)
    }),
  ],
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//webpack.vue.dll.js</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-comment">// &#x628A; vue &#x76F8;&#x5173;&#x6A21;&#x5757;&#x7684;&#x653E;&#x5230;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;</span>
    vue: [<span class="hljs-string">&apos;vue&apos;</span>, <span class="hljs-string">&apos;vue-router&apos;</span>, <span class="hljs-string">&apos;vuex&apos;</span>, <span class="hljs-string">&apos;element-ui&apos;</span>]
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;[name].dll.js&apos;</span>, <span class="hljs-comment">//&#x751F;&#x6210;vue.dll.js</span>
    path: path.resolve(__dirname, <span class="hljs-string">&apos;dist&apos;</span>),
    <span class="hljs-attr">library</span>: <span class="hljs-string">&apos;_dll_[name]&apos;</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack/lib/DllPlugin&apos;</span>)({
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;_dll_[name]&apos;</span>,
      <span class="hljs-comment">// manifest.json &#x63CF;&#x8FF0;&#x52A8;&#x6001;&#x94FE;&#x63A5;&#x5E93;&#x5305;&#x542B;&#x4E86;&#x54EA;&#x4E9B;&#x5185;&#x5BB9;</span>
      path: path.join(__dirname, <span class="hljs-string">&apos;dist&apos;</span>, <span class="hljs-string">&apos;[name].manifest.json&apos;</span>)
    }),
  ],
};</code></pre><p>&#x7136;&#x540E;&#x5728;&#x4E4B;&#x524D;&#x7684;webpack&#x914D;&#x7F6E;&#x4E2D;&#xFF0C;&#x5F15;&#x5165;dll&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;)

module.exports = {
  plugins: [
    // &#x53EA;&#x8981;&#x5F15;&#x5165;manifest.json&#x5C31;&#x80FD;&#x77E5;&#x9053;&#x54EA;&#x4E9B;&#x6A21;&#x5757;&#x518D;dll&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5728;&#x6253;&#x5305;&#x8FC7;&#x7A0B;&#x4F1A;&#x5FFD;&#x7565;&#x8FD9;&#x4E9B;&#x6A21;&#x5757;
    new require(&apos;webpack/lib/DllReferencePlugin&apos;)({
      manifest: require(&apos;./dist/vue.manifest.json&apos;),
    })
  ],
  devtool: &apos;source-map&apos;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// &#x53EA;&#x8981;&#x5F15;&#x5165;manifest.json&#x5C31;&#x80FD;&#x77E5;&#x9053;&#x54EA;&#x4E9B;&#x6A21;&#x5757;&#x518D;dll&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5728;&#x6253;&#x5305;&#x8FC7;&#x7A0B;&#x4F1A;&#x5FFD;&#x7565;&#x8FD9;&#x4E9B;&#x6A21;&#x5757;</span>
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack/lib/DllReferencePlugin&apos;</span>)({
      <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./dist/vue.manifest.json&apos;</span>),
    })
  ],
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">&apos;source-map&apos;</span>
};</code></pre><p>&#x6700;&#x540E;&#x751F;&#x6210;html&#x6587;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x5148;&#x5F15;&#x5165;dll&#x6587;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
        &lt;script src=&quot;./dist/vue.dll.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;./dist/main.js&quot;&gt;&lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./dist/vue.dll.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./dist/main.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><h4>3&#x3001;&#x4F60;&#x80D6;&#x4F60;&#x5148;&#x8DD1;&#xFF0C;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x9884;&#x5148;&#x8FD0;&#x884C;</h4><p>&#x524D;&#x9762;&#x7684;&#x4F18;&#x5316;&#x90FD;&#x662F;&#x4F18;&#x5316;&#x6253;&#x5305;&#x901F;&#x5EA6;&#xFF0C;&#x6216;&#x8005;&#x51CF;&#x5C11;&#x91CD;&#x590D;&#x6A21;&#x5757;&#x7684;&#x3002;&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x79CD;&#x4F18;&#x5316;&#x65B9;&#x5F0F;&#xFF0C;&#x80FD;&#x591F;&#x51CF;&#x5C11;&#x4EE3;&#x7801;&#x91CF;&#xFF0C;&#x5E76;&#x4E14;&#x51CF;&#x5C11;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x8FD0;&#x884C;&#x65F6;&#x95F4;&#x3002;</p><p>&#x4F7F;&#x7528;<a href="https://prepack.io/" rel="nofollow noreferrer" target="_blank">Prepack</a>&#xFF0C;&#x8FD9;&#x662F;facebook&#x5F00;&#x6E90;&#x7684;&#x4E00;&#x6B3E;&#x5DE5;&#x5177;&#xFF0C;&#x80FD;&#x591F;&#x8FD0;&#x884C;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x90E8;&#x5206;&#x80FD;&#x591F;&#x63D0;&#x524D;&#x8FD0;&#x884C;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x51CF;&#x5C11;&#x5728;&#x7EBF;&#x4E0A;&#x771F;&#x5B9E;&#x8FD0;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x5B98;&#x65B9;&#x7684;demo&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//input
(function () {
  function hello() { return &apos;hello&apos;; }
  function world() { return &apos;world&apos;; }
  global.s = hello() + &apos; &apos; + world();
})();

//output
s = &quot;hello world&quot;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//input</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;hello&apos;</span>; }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">world</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;world&apos;</span>; }
  global.s = hello() + <span class="hljs-string">&apos; &apos;</span> + world();
})();

<span class="hljs-comment">//output</span>
s = <span class="hljs-string">&quot;hello world&quot;</span>;</code></pre><p>&#x60F3;&#x5728;webpack&#x4E2D;&#x63A5;&#x5165;&#x4E5F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x793E;&#x533A;&#x4EE5;&#x53CA;&#x6709;&#x4E86;&#x5BF9;&#x5E94;&#x7684;&#x63D2;&#x4EF6;<a href="https://github.com/gajus/prepack-webpack-plugin" rel="nofollow noreferrer" target="_blank">prepack-webpack-plugin</a>&#xFF0C;&#x76EE;&#x524D;&#x6B63;&#x5F0F;&#x73AF;&#x5883;&#x8FD0;&#x7528;&#x8F83;&#x5C11;&#xFF0C;&#x8FD8;&#x6709;&#x4E9B;&#x5751;&#xFF0C;&#x53EF;&#x4EE5;&#x7EE7;&#x7EED;&#x89C2;&#x671B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  plugins: [
    new require(&apos;prepack-webpack-plugin&apos;)()
  ]
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;prepack-webpack-plugin&apos;</span>)()
  ]
};</code></pre><p>&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x7F57;&#x5217;&#x4E86;&#x4E00;&#x4E9B;webpack&#x7684;&#x4F18;&#x5316;&#x7B56;&#x7565;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E9B;&#x4F18;&#x5316;&#x7B56;&#x7565;&#x8FD8;&#x662F;&#x8FD8;&#x662F;&#x8981;&#x914C;&#x60C5;&#x8003;&#x8651;&#x3002;&#x6BD4;&#x5982;&#x591A;&#x8FDB;&#x7A0B;&#x8DD1;loader&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x9879;&#x76EE;&#x6BD4;&#x8F83;&#x5C0F;&#xFF0C;&#x5F00;&#x4E86;&#x4E4B;&#x540E;&#x53EF;&#x80FD;&#x53D8;&#x6162;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x672C;&#x6765;&#x6253;&#x5305;&#x65F6;&#x95F4;&#x5C31;&#x6BD4;&#x8F83;&#x77ED;&#xFF0C;&#x7528;&#x6765;fork&#x5B50;&#x8FDB;&#x7A0B;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x8BF4;&#x4E0D;&#x5B9A;&#x90FD;&#x5DF2;&#x7ECF;&#x8DD1;&#x5B8C;&#x4E86;&#x3002;&#x8BB0;&#x4F4F;<code>&#x8FC7;&#x65E9;&#x7684;&#x4F18;&#x5316;&#x5C31;&#x662F;&#x4E07;&#x6076;&#x4E4B;&#x6E90;</code>&#x3002;</p><h2 id="articleHeader3">&#x56DB;&#x3001;&#x603B;&#x7ED3;</h2><p>webpack4&#x5E26;&#x4E86;&#x5F88;&#x591A;&#x65B0;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x4E5F;&#x5927;&#x5927;&#x52A0;&#x5FEB;&#x7684;&#x6253;&#x5305;&#x65F6;&#x95F4;&#xFF0C;&#x5E76;&#x4E14;&#x51CF;&#x5C11;&#x4E86;&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x4F53;&#x79EF;&#x3002;&#x671F;&#x5F85;webpack5&#x7684;&#x66F4;&#x591A;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x6BD4;&#x5982;&#xFF0C;&#x4EE5;html&#x6216;css&#x4E3A;&#x6587;&#x4EF6;&#x5165;&#x53E3;&#xFF08;&#x9119;&#x4EBA;&#x8BA4;&#x4E3A;html&#x624D;&#x662F;&#x524D;&#x7AEF;&#x6A21;&#x5757;&#x5316;&#x7684;&#x771F;&#x6B63;&#x5165;&#x53E3;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x5165;&#x53E3;&#x5C31;&#x662F;html&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5728;&#x771F;&#x6B63;&#x7684;&#x4EB2;&#x7239;&#xFF0C;&#x4E0D;&#x548C;&#x7239;&#x4EB2;&#x548C;&#x8C01;&#x4EB2;&#xFF09;&#xFF0C;&#x9ED8;&#x8BA4;&#x5F00;&#x542F;&#x591A;&#x8FDB;&#x7A0B;&#x6253;&#x5305;&#xFF0C;&#x52A0;&#x5165;&#x6587;&#x4EF6;&#x7684;&#x957F;&#x671F;&#x7F13;&#x5B58;&#xFF0C;&#x66F4;&#x591A;&#x7684;&#x62D3;&#x5C55;&#x96F6;&#x914D;&#x7F6E;&#x3002;</p><p>&#x540C;&#x65F6;&#x4E5F;&#x8981;&#x611F;&#x8C22;&#x524D;&#x7AEF;&#x793E;&#x533A;&#x5176;&#x5B83;&#x7684;&#x4F18;&#x79C0;&#x7684;&#x6253;&#x5305;&#x5DE5;&#x5177;&#xFF0C;&#x611F;&#x8C22;rollup&#xFF0C;&#x611F;&#x8C22;parcel&#x3002;</p><h2 id="articleHeader4">&#x4E94;&#x3001;&#x53C2;&#x8003;</h2><ol><li><a href="https://zhuanlan.zhihu.com/p/32148338" rel="nofollow noreferrer" target="_blank">webpack &#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x4E48;&#x96BE;&#x7528;&#xFF1F;</a></li><li><a href="https://zhuanlan.zhihu.com/p/35407642" rel="nofollow noreferrer" target="_blank">Webpack 4&#x8FDB;&#x9636;</a></li><li><a href="https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693" rel="nofollow noreferrer" target="_blank">RIP CommonsChunkPlugin</a><button class="btn btn-xs btn-default ml10 preview" data-url="sokra/1522d586b8e5c0f5072d7565c2bee693" data-typeid="1">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></li><li><a href="https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a" rel="nofollow noreferrer" target="_blank">webpack 4: mode and optimization</a></li><li><a href="https://github.com/dwqs/blog/issues/60" rel="nofollow noreferrer" target="_blank">webpack 4 &#x4E0D;&#x5B8C;&#x5168;&#x8FC1;&#x79FB;&#x6307;&#x5317;</a></li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初探webpack4

## 原文链接
[https://segmentfault.com/a/1190000015237322](https://segmentfault.com/a/1190000015237322)

