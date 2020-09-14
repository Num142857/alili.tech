---
title: 'Loader 入门【Webpack Book 翻译】' 
date: 2018-11-15 21:20:48
hidden: true
slug: c8vnvsr52no
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x539F;&#x6587;&#x94FE;&#x63A5;&#xFF1A;<a href="https://survivejs.com/webpack/loading/loader-definitions/" rel="nofollow noreferrer">https://survivejs.com/webpack...</a><br>&#x7FFB;&#x8BD1;&#x8BA1;&#x5212;&#xFF1A;<a href="https://segmentfault.com/a/1190000015971186">https://segmentfault.com/a/11...</a><p>&#x9644;&#x8A00;&#xFF1A;&#x56E0;&#x4E3A;&#x53D1;&#x73B0;&#x4E66;&#x4E2D;&#x4E00;&#x4E9B;&#x5185;&#x5BB9;&#x5355;&#x72EC;&#x653E;&#x51FA;&#x6765;&#x4F1A;&#x6BD4;&#x8F83;&#x5C34;&#x5C2C;&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x8DF3;&#x8FC7;&#x90E8;&#x5206;&#x7AE0;&#x8282;&#xFF0C;&#x5F53;&#x7136;&#x5B8C;&#x6574;&#x7248;&#x4F1A;&#x5168;&#x90E8;&#x7FFB;&#x8BD1;&#xFF0C;&#x5DF2;&#x7ECF;&#x6B63;&#x5728;&#x7814;&#x7A76;&#x539F;&#x7248;&#x7684;&#x7F51;&#x7AD9;&#x642D;&#x5EFA;&#x5DE5;&#x7A0B;&#x4E86;<br><span class="img-wrap"><img data-src="/img/bVbfE8l?w=67&amp;h=64" src="https://static.alili.tech/img/bVbfE8l?w=67&amp;h=64" alt="clipboard.png" title="clipboard.png"></span></p></blockquote><p>Webpack &#x63D0;&#x4F9B;&#x4E86;&#x591A;&#x79CD;&#x914D;&#x7F6E;&#x6A21;&#x5757; loader &#x7684;&#x65B9;&#x6CD5;&#x3002; Webpack 2 &#x5F00;&#x59CB;&#x901A;&#x8FC7;&#x5F15;&#x5165; <code>use</code> &#x5B57;&#x6BB5;&#xFF0C;&#x7B80;&#x5316;&#x4E86; loader &#x4F7F;&#x7528;&#x3002;&#x5728;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x662F;&#x4E00;&#x4E2A;&#x597D;&#x4E3B;&#x610F;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x4EEC;&#x5141;&#x8BB8;&#x4F60;&#x5728;&#x4E0D;&#x5F71;&#x54CD;&#x6784;&#x5EFA;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x79FB;&#x52A8;&#x914D;&#x7F6E;&#x3002;</p><p>&#x53E6;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#x662F;&#x8BBE;&#x7F6E; <code>context</code> &#x5B57;&#x6BB5;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4F1A;&#x4EA7;&#x751F;&#x7C7B;&#x4F3C;&#x7684;&#x6548;&#x679C;&#x5E76;&#x5F71;&#x54CD; entry &#x548C; loader &#x7684;&#x8DEF;&#x5F84;&#x89E3;&#x6790;&#x3002;&#x4F46;&#x662F;&#x5B83;&#x5BF9;&#x8F93;&#x51FA;&#x6CA1;&#x6709;&#x5F71;&#x54CD;&#xFF0C;&#x4F60;&#x4ECD;&#x7136;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x6216; <code>/</code>&#x3002;</p><p>&#x5373;&#x4F7F;&#x4F60;&#x8BBE;&#x7F6E;&#x4E86; <code>include</code> &#x6216; <code>exclude</code> &#x89C4;&#x5219;&#xFF0C;&#x4ECE; <strong>node_modules</strong> &#x52A0;&#x8F7D;&#x7684;&#x5305;&#x4ECD;&#x7136;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x4EEC;&#x5DF2;&#x7ECF;&#x88AB;&#x7F16;&#x8BD1;&#x4E3A;&#x5F00;&#x7BB1;&#x5373;&#x7528;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x5982;&#x679C;&#x5B83;&#x4EEC;&#x6CA1;&#x8FD9;&#x4E48;&#x505A;&#xFF0C;&#x90A3;&#x4E48;&#x4F60;&#x5FC5;&#x987B;&#x5E94;&#x7528; <strong>Consuming Packages</strong> &#x7AE0;&#x8282;&#x4E2D;&#x6DB5;&#x76D6;&#x7684;&#x6280;&#x672F;&#x3002;</p><p>T&gt; <code>include</code>/<code>exclude</code> &#x5728;&#x5904;&#x7406; <strong>node_modules</strong> &#x95EE;&#x9898;&#x65F6;&#x975E;&#x5E38;&#x65B9;&#x4FBF;&#xFF0C;&#x56E0;&#x4E3A;&#x5F53;&#x4F60;&#x5C06; JavaScript &#x6587;&#x4EF6;&#x5BFC;&#x5165;&#x9879;&#x76EE;&#x65F6;&#xFF0C;webpack &#x4F1A;&#x9ED8;&#x8BA4;&#x5904;&#x7406;&#x5E76;&#x904D;&#x5386;&#x5DF2;&#x5B89;&#x88C5;&#x7684;&#x5305;&#x3002;&#x4E3A;&#x4E86;&#x8BA9; webpack &#x4E0D;&#x5904;&#x7406; <strong>node_modules</strong>&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x4F7F;&#x7528; <code>exclude</code>&#x3002;&#x5176;&#x4ED6;&#x6587;&#x4EF6;&#x7C7B;&#x578B;&#x4E0D;&#x4F1A;&#x9047;&#x5230;&#x6B64;&#x95EE;&#x9898;&#x3002;</p><h2>&#x5256;&#x6790; Loader</h2><p>Webpack &#x901A;&#x8FC7; <strong>loader</strong> &#x652F;&#x6301;&#x591A;&#x79CD;&#x683C;&#x5F0F;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x6B64;&#x5916;&#xFF0C;&#x5B83;&#x652F;&#x6301;&#x4E00;&#x4E9B;&#x5F00;&#x7BB1;&#x5373;&#x7528;&#x7684; JavaScript &#x6A21;&#x5757;&#x89C4;&#x8303;&#x3002;&#x6587;&#x4EF6;&#x683C;&#x5F0F;&#x4E0D;&#x540C;&#xFF0C;&#x4F46;&#x601D;&#x8DEF;&#x90FD;&#x662F;&#x4E00;&#x81F4;&#x7684;&#xFF0C;&#x4F60;&#x5FC5;&#x987B;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A; loader&#xFF0C;&#x5E76;&#x5C06;&#x5B83;&#x4EEC;&#x4E0E;&#x4F60;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x8FDE;&#x63A5;&#x8D77;&#x6765;&#x3002;</p><p>{pagebreak}</p><p>&#x4E0B;&#x4F8B;&#x4E2D; webpack &#x901A;&#x8FC7; Babel &#x5904;&#x7406; JavaScript&#xFF1A;</p><p><strong>webpack.config.js</strong></p><pre><code class="javascript">module.exports = {
  ...
  module: {
    rules: [
      {
        // **Conditions** to match files using RegExp, function.
        test: /\.js$/,

        // **Restrictions**
        // Restrict matching to a directory. This
        // also accepts an array of paths or a function.
        // The same applies to `exclude`.
        include: path.join(__dirname, &quot;app&quot;),
        exclude(path) {
          // You can perform more complicated checks  as well.
          return path.match(/node_modules/);
        },

        // **Actions** to apply loaders to the matched files.
        use: &quot;babel-loader&quot;,
      },
    ],
  },
};</code></pre><p>T&gt; &#x5982;&#x679C;&#x4F60;&#x5BF9; RegExp &#x7684;&#x5339;&#x914D;&#x4E0D;&#x719F;&#x6089;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5728;&#x7EBF;&#x5DE5;&#x5177;&#xFF0C;&#x4F8B;&#x5982; <a href="https://regex101.com/" rel="nofollow noreferrer">regex101</a>&#xFF0C;<a href="http://regexr.com/" rel="nofollow noreferrer">RegExr</a> &#x6216; <a href="https://regexper.com" rel="nofollow noreferrer">Regexper</a>&#x3002;</p><h2>Loader &#x7684;&#x8FD0;&#x7B97;&#x987A;&#x5E8F;</h2><p>&#x4E00;&#x5B9A;&#x8981;&#x8BB0;&#x4F4F; loader &#x603B;&#x662F;&#x4ECE;&#x53F3;&#x5230;&#x5DE6;&#xFF0C;&#x4ECE;&#x4E0B;&#x5230;&#x4E0A;&#xFF08;&#x62C6;&#x5F00;&#x5199;&#x7684;&#x65F6;&#x5019;&#xFF09;&#x8FDB;&#x884C;&#x8FD0;&#x7B97;&#x7684;&#x3002;&#x628A;&#x5B83;&#x770B;&#x6210;&#x51FD;&#x6570;&#x6BD4;&#x8F83;&#x5BB9;&#x6613;&#x7406;&#x89E3;&#x6240;&#x8C13;&#x201C;&#x4ECE;&#x53F3;&#x5230;&#x5DE6;&#x8FD0;&#x884C;&#x201D;&#x3002;&#x4F60;&#x53EF;&#x4EE5;&#x628A; <code>use: [&quot;style-loader&quot;, &quot;css-loader&quot;]</code> &#x770B;&#x4F5C; <code>style(css(input))</code>&#x3002;</p><p>&#x8981;&#x67E5;&#x770B;&#x89C4;&#x5219;&#xFF0C;&#x8BF7;&#x770B;&#x4EE5;&#x4E0B;&#x793A;&#x4F8B;&#xFF1A;</p><pre><code class="javascript">{
  test: /\.css$/,
  use: [&quot;style-loader&quot;, &quot;css-loader&quot;],
},</code></pre><p>&#x6839;&#x636E;&#x4ECE;&#x53F3;&#x5230;&#x5DE6;&#x7684;&#x89C4;&#x5219;&#xFF0C;&#x53EF;&#x4EE5;&#x7B49;&#x6548;&#x62C6;&#x5206;&#x4E3A;&#xFF1A;</p><pre><code class="javascript">{
  test: /\.css$/,
  use: &quot;style-loader&quot;,
},
{
  test: /\.css$/,
  use: &quot;css-loader&quot;,
},</code></pre><h3>&#x5F3A;&#x5236;&#x6267;&#x884C;&#x987A;&#x5E8F;</h3><p>&#x5C3D;&#x7BA1;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E0A;&#x8FF0;&#x89C4;&#x5219;&#x914D;&#x7F6E;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x53EF;&#x4EE5;&#x5F3A;&#x5236;&#x5728;&#x5E38;&#x89C4;&#x89C4;&#x5219;<strong>&#x4E4B;&#x524D;</strong>&#x6216;<strong>&#x4E4B;&#x540E;</strong>&#x5E94;&#x7528;&#x7279;&#x5B9A;&#x89C4;&#x5219;&#x3002;<code>enforce</code> &#x5B57;&#x6BB5;&#x5728;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x6D3E;&#x4E0A;&#x7528;&#x573A;&#x3002;&#x628A;&#x4ED6;&#x8BBE;&#x7F6E;&#x4E3A; <code>pre</code> or <code>post</code> &#x4EE5;&#x5728;&#x5176;&#x4ED6; loader &#x4E4B;&#x524D;&#x6216;&#x4E4B;&#x540E;&#x8FDB;&#x884C;&#x5904;&#x7406;&#x3002;</p><p>Lint &#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x56E0;&#x4E3A; Lint &#x5FC5;&#x987B;&#x5148;&#x4E8E;&#x4EFB;&#x4F55;&#x5176;&#x4ED6;&#x884C;&#x4E3A;&#x3002;<code>enforce: &quot;post&quot;</code> &#x5012;&#x662F;&#x5F88;&#x5C11;&#x7528;&#x5230;&#xFF0C;&#x8FD9;&#x591A;&#x662F;&#x4F60;&#x60F3;&#x5BF9;&#x6784;&#x5EFA;&#x7ED3;&#x679C;&#x8FDB;&#x884C;&#x68C0;&#x67E5;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x3002;</p><p>{pagebreak}</p><p>&#x57FA;&#x672C;&#x8BED;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code class="javascript">{
  // Conditions
  test: /\.js$/,
  enforce: &quot;pre&quot;, // &quot;post&quot; too

  // Actions
  use: &quot;eslint-loader&quot;,
},</code></pre><p>&#x5982;&#x679C;&#x4F60;&#x53EF;&#x4EE5;&#x4FDD;&#x8BC1; <code>test</code> &#x4E2D;&#x7684; loader &#x987A;&#x5E8F;&#x65E0;&#x8BEF;&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x4E0D;&#x4F7F;&#x7528; <code>enforce</code>&#x3002;&#x4E0D;&#x8FC7;&#x4F7F;&#x7528; <code>enforce</code> &#x65B9;&#x4FBF;&#x4F60;&#x628A;&#x4E0D;&#x540C;&#x6B65;&#x9AA4;&#x7684; loader &#x5206;&#x79BB;&#x5F00;&#x6765;&#xFF0C;&#x66F4;&#x5BB9;&#x6613;&#x7EC4;&#x7EC7;&#x3002;</p><h2>Loader &#x7684;&#x4F20;&#x53C2;</h2><p>&#x53EF;&#x901A;&#x8FC7; query &#x628A;&#x53C2;&#x6570;&#x4F20;&#x5230; loader&#xFF1A;</p><pre><code class="javascript">{
  // Conditions
  test: /\.js$/,
  include: PATHS.app,

  // Actions
  use: &quot;babel-loader?presets[]=env&quot;,
},</code></pre><p>&#x8FD9;&#x79CD;&#x914D;&#x7F6E;&#x98CE;&#x683C;&#x4E5F;&#x9002;&#x7528;&#x4E8E; entry &#x548C; import&#xFF0C;webpack &#x4F1A;&#x5904;&#x7406;&#x4ED6;&#x4EEC;&#x3002;&#x5728;&#x67D0;&#x4E9B;&#x4E2A;&#x522B;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FD9;&#x4E2A;&#x5199;&#x6CD5;&#x80FD;&#x6D3E;&#x4E0A;&#x7528;&#x573A;&#xFF0C;&#x4F46;&#x901A;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#x6700;&#x597D;&#x4F7F;&#x7528;&#x4EE5;&#x4E0B;&#x66F4;&#x5177;&#x53EF;&#x8BFB;&#x6027;&#x7684;&#x65B9;&#x6848;&#x3002;</p><p>{pagebreak}</p><p>&#x4F20;&#x5165;&#x5BF9;&#x8C61;&#x5230; <code>use</code>&#xFF1A;</p><pre><code class="javascript">{
  // Conditions
  test: /\.js$/,
  include: PATHS.app,

  // Actions
  use: {
    loader: &quot;babel-loader&quot;,
    options: {
      presets: [&quot;env&quot;],
    },
  },
},</code></pre><p>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x4F7F;&#x7528;&#x591A;&#x4E2A; loader&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5C06;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x6570;&#x7EC4;&#x4F20;&#x9012;&#x7ED9; <code>use</code>&#xFF1A;</p><pre><code class="javascript">{
  test: /\.js$/,
  include: PATHS.app,

  use: [
    {
      loader: &quot;babel-loader&quot;,
      options: {
        presets: [&quot;env&quot;],
      },
    },
    // Add more loaders here
  ],
},</code></pre><p>{pagebreak}</p><h2>&#x4F7F;&#x7528;&#x51FD;&#x6570;&#x5728; <code>use</code> &#x5B57;&#x6BB5;&#x6DFB;&#x52A0;&#x5206;&#x652F;</h2><p>&#x672C;&#x4E66;&#x4E2D;&#xFF0C;&#x4F60;&#x5728;&#x66F4;&#x9AD8;&#x7EA7;&#x522B;&#x4E0A;&#x8FDB;&#x884C;&#x73AF;&#x5883;&#x914D;&#x7F6E;&#x3002;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x7ED3;&#x679C;&#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x9009;&#x62E9;&#x662F;&#x5728; <code>use</code> &#x5904;&#x4F7F;&#x7528;&#x5206;&#x652F;&#xFF0C;&#x56E0;&#x4E3A; webpack &#x7684; loader &#x5B9A;&#x4E49;&#x63A5;&#x53D7;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x6B64;&#x51FD;&#x6570;&#x533A;&#x5206;&#x73AF;&#x5883;&#xFF1A;</p><pre><code class="javascript">{
  test: /\.css$/,

  // `resource` refers to the resource path matched.
  // `resourceQuery` contains possible query passed to it
  // `issuer` tells about match context path
  use: ({ resource, resourceQuery, issuer }) =&gt; {
    // You have to return something falsy, object, or a
    // string (i.e., &quot;style-loader&quot;) from here.
    //
    // Returning an array fails! Nest rules instead.
    if (env === &quot;development&quot;) {
      return {
        use: {
          loader: &quot;css-loader&quot;, // css-loader first
          rules: [
            &quot;style-loader&quot;, // style-loader after
          ],
        },
      };
    }
  },
},</code></pre><p>&#x7528;&#x5FC3;&#x611F;&#x53D7;&#xFF0C;&#x8FD9;&#x662F;&#x7EC4;&#x5408;&#x914D;&#x7F6E;&#x7684;&#x53E6;&#x4E00;&#x79CD;&#x624B;&#x6BB5;&#x3002;</p><h2>&#x5185;&#x8054;&#x5F0F;&#x5B9A;&#x4E49;</h2><p>&#x5C3D;&#x7BA1;&#x914D;&#x7F6E;&#x7EA7; loader &#x5B9A;&#x4E49;&#x66F4;&#x53EF;&#x53D6;&#xFF0C;&#x4F46;&#x53EF;&#x4EE5;&#x5185;&#x8054;&#x7F16;&#x5199; loader &#x5B9A;&#x4E49;&#xFF1A;</p><pre><code class="javascript">// Process foo.png through url-loader and other
// possible matches.
import &quot;url-loader!./foo.png&quot;;

// Override possible higher level match completely
import &quot;!!url-loader!./bar.png&quot;;</code></pre><p>&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x7684;&#x95EE;&#x9898;&#x5728;&#x4F60;&#x7684;&#x6E90;&#x4EE3;&#x7801;&#x4F1A;&#x4E0E; webpack &#x8026;&#x5408;&#x3002;&#x76F8;&#x540C;&#x7684;&#x673A;&#x5236;&#x8FD8;&#x9002;&#x7528;&#x4E8E; entry&#xFF1A;</p><pre><code class="javascript">{
  entry: {
    app: &quot;babel-loader!./app&quot;,
  },
},</code></pre><h2>&#x5339;&#x914D;&#x6587;&#x4EF6;&#x7684;&#x5907;&#x9009;&#x65B9;&#x6CD5;</h2><p><code>test</code> &#x7ED3;&#x5408; <code>include</code> &#x6216; <code>exclude</code> &#x662F;&#x5339;&#x914D;&#x6587;&#x4EF6;&#x7684;&#x6700;&#x5E38;&#x7528;&#x65B9;&#x6CD5;&#x3002;&#x8FD9;&#x4E9B;&#x5B57;&#x6BB5;&#x63A5;&#x53D7;&#x4EE5;&#x4E0B;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF1A;</p><ul><li><code>test</code>&#x2014;&#x2014;&#x5339;&#x914D; RegExp&#xFF0C;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x51FD;&#x6570;&#xFF0C;&#x5BF9;&#x8C61;&#x6216;&#x6570;&#x7EC4;&#x3002;</li><li><code>include</code>&#x2014;&#x2014;&#x540C;&#x4E0A;&#x3002;</li><li><code>exclude</code>&#x2014;&#x2014;&#x540C;&#x4E0A;&#xFF0C;&#x8F93;&#x51FA;&#x4E0E; <code>include</code> &#x76F8;&#x53CD;&#x3002;</li><li><code>resource: /inline/</code>&#x2014;&#x2014;&#x5339;&#x914D;&#x5305;&#x542B;&#x67E5;&#x8BE2;&#x5185;&#x5BB9;&#x7684;&#x8D44;&#x6E90;&#x8DEF;&#x5F84;&#x3002;&#x793A;&#x4F8B;&#xFF1A;<code>/path/foo.inline.js</code>, <code>/path/bar.png?inline</code>&#x3002;</li><li><code>issuer: /bar.js/</code>&#x2014;&#x2014;&#x5339;&#x914D;&#x4ECE;&#x67D0;&#x5904;&#x8BF7;&#x6C42;&#x7684;&#x8D44;&#x6E90;&#x3002;&#x793A;&#x4F8B;&#xFF1A;&#x5982;&#x679C; <code>/path/foo.png</code> &#x4ECE; <code>/path/bar.js</code> &#x8BF7;&#x6C42;&#xFF0C;&#x90A3;&#x4E48; <code>/path/foo.png</code> &#x5C06;&#x5339;&#x914D;&#x3002;</li><li><code>resourcePath: /inline/</code>&#x2014;&#x2014;&#x5339;&#x914D;&#x5305;&#x542B;&#x67E5;&#x8BE2;&#x5185;&#x5BB9;&#x7684;&#x8D44;&#x6E90;&#x8DEF;&#x5F84;&#xFF08;&#x4E0D;&#x5305;&#x62EC; query&#xFF09;&#x3002;&#x793A;&#x4F8B;&#xFF1A;<code>/path/foo.inline.png</code>&#x3002;</li><li><code>resourceQuery: /inline/</code>&#x2014;&#x2014;&#x5339;&#x914D;&#x5305;&#x542B;&#x67E5;&#x8BE2;&#x5185;&#x5BB9;&#x7684; query&#xFF08;&#x4E0D;&#x5305;&#x62EC; query&#xFF09;&#x3002;&#x793A;&#x4F8B;&#xFF1A;<code>/path/foo.png?inline</code>&#x3002;</li></ul><p>&#x57FA;&#x4E8E;&#x5E03;&#x5C14;&#x503C;&#x7684;&#x5B57;&#x6BB5;&#x53EF;&#x7528;&#x4E8E;&#x8FDB;&#x4E00;&#x6B65;&#x8FDB;&#x884C;&#x7EA6;&#x675F;&#xFF1A;<br>Boolean based fields can be used to constrain these matchers further:</p><ul><li><code>not</code>&#x2014;&#x2014;<strong>&#x4E0D;</strong>&#x5339;&#x914D;&#x7ED9;&#x5B9A;&#x6761;&#x4EF6;&#xFF08;&#x53C2;&#x89C1;<code>test</code>&#x8868;&#x793A;&#x63A5;&#x53D7;&#x7684;&#x503C;&#xFF09;&#x3002;</li><li><code>and</code>&#x2014;&#x2014;&#x540C;&#x65F6;&#x5339;&#x914D;&#x4E00;&#x7CFB;&#x5217;&#x6761;&#x4EF6;&#x3002;</li><li><code>or</code>&#x2014;&#x2014;&#x4E0E;&#x6570;&#x7EC4;&#x4E2D;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x6761;&#x4EF6;&#x5339;&#x914D;&#x3002;</li></ul><h2>&#x57FA;&#x4E8E; <code>resourceQuery</code> &#x52A0;&#x8F7D;</h2><p><code>oneOf</code> &#x5B57;&#x6BB5;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x8D44;&#x6E90;&#x76F8;&#x5173;&#x5339;&#x914D;&#x5C06; webpack &#x8DEF;&#x7531;&#x5230;&#x7279;&#x5B9A;&#x7684; loader&#xFF1A;</p><pre><code class="javascript">{
  test: /\.png$/,
  oneOf: [
    {
      resourceQuery: /inline/,
      use: &quot;url-loader&quot;,
    },
    {
      resourceQuery: /external/,
      use: &quot;file-loader&quot;,
    },
  ],
},</code></pre><p>&#x5982;&#x679C;&#x4F60;&#x9700;&#x8981;&#x5728;&#x6587;&#x4EF6;&#x540D;&#x4E2D;&#x67E5;&#x8BE2;&#xFF0C;&#x5E94;&#x8BE5;&#x4F7F;&#x7528; <code>resourcePath</code> &#x800C;&#x4E0D;&#x662F; <code>resourceQuery</code>&#x3002;</p><p>{pagebreak}</p><h2>&#x57FA;&#x4E8E; <code>issuer</code> &#x52A0;&#x8F7D;</h2><p><code>issuer</code> &#x57FA;&#x4E8E;&#x8D44;&#x6E90;&#x7684;&#x5BFC;&#x5165;&#x4F4D;&#x7F6E;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x3002;&#x4EE5;&#x4E0B;&#x793A;&#x4F8B;&#x6539;&#x7F16;&#x81EA; <a href="https://github.com/webpack-contrib/css-loader/pull/287#issuecomment-261269199" rel="nofollow noreferrer">css-loader issue 287</a>&#xFF0C;<strong>style-loader</strong> &#x5C06;&#x5E94;&#x7528;&#x4E8E; JavaScript &#x5BFC;&#x5165;&#x7684; CSS &#x6587;&#x4EF6;&#xFF1A;</p><pre><code class="javascript">{
  test: /\.css$/,

  rules: [
    {
      issuer: /\.js$/,
      use: &quot;style-loader&quot;,
    },
    {
      use: &quot;css-loader&quot;,
    },
  ],
},</code></pre><p>&#x53E6;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#x7ED3;&#x5408;&#x4E86; <code>issuer</code> &#x548C; <code>not</code>&#xFF1A;</p><pre><code class="javascript">{
  test: /\.css$/,

  rules: [
    // CSS imported from other modules is added to the DOM
    {
      issuer: { not: /\.css$/ },
      use: &quot;style-loader&quot;,
    },
    // Apply css-loader against CSS imports to return CSS
    {
      use: &quot;css-loader&quot;,
    },
  ],
}</code></pre><h2>&#x4E86;&#x89E3; loader &#x884C;&#x4E3A;</h2><p>&#x901A;&#x8FC7;&#x89C2;&#x5BDF; loader &#x884C;&#x4E3A;&#x53EF;&#x4EE5;&#x66F4;&#x6DF1;&#x5165;&#x5730;&#x7406;&#x89E3;&#x5B83;&#x4EEC;&#x3002; <a href="https://www.npmjs.com/package/loader-runner" rel="nofollow noreferrer">loader-runner</a> &#x5141;&#x8BB8;&#x4F60;&#x5728;&#x6CA1;&#x6709; webpack &#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x5355;&#x72EC;&#x8FD0;&#x884C;&#x5B83;&#x4EEC;&#x3002;Webpack &#x5728;&#x5E95;&#x5C42;&#x4E5F;&#x662F;&#x4F7F;&#x7528;&#x6B64;&#x8F6F;&#x4EF6;&#x5305;&#xFF0C;<em>Extending with Loaders</em> &#x7AE0;&#x8282;&#x5C06;&#x4F1A;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x5B83;&#x3002;</p><p><a href="https://www.npmjs.com/package/inspect-loader" rel="nofollow noreferrer">inspect-loader</a> &#x53EF;&#x4EE5;&#x76D1;&#x89C6; loader &#x4E4B;&#x95F4;&#x4F20;&#x9012;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x5C06;&#x6B64; loader &#x6DFB;&#x52A0;&#x5230;&#x4F60;&#x7684;&#x914D;&#x7F6E;&#x5373;&#x53EF;&#x68C0;&#x67E5;&#x5176;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x6D41;&#xFF0C;&#x800C;&#x4E0D;&#x5FC5;&#x5728; <em>node_modules</em> &#x4E2D;&#x63D2;&#x5165; <code>console.log</code>&#x3002;</p><h2>&#x603B;&#x7ED3;</h2><p>Webpack &#x63D0;&#x4F9B;&#x4E86;&#x591A;&#x79CD;&#x8BBE;&#x7F6E; loader &#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x5728; webpack 4 &#x4E2D;&#x7528;&#x597D; <code>use</code> &#x5C31;&#x8DB3;&#x591F;&#x4E86;&#x3002;&#x6CE8;&#x610F; loader &#x7684;&#x5904;&#x7406;&#x987A;&#x5E8F;&#xFF0C;&#x8FD9;&#x662F;&#x5F88;&#x591A;&#x5E38;&#x89C1;&#x7684;&#x95EE;&#x9898;&#x6765;&#x6E90;&#x3002;</p><p>&#x56DE;&#x987E;&#x4E00;&#x4E0B;&#xFF1A;</p><ul><li><strong>Loaders</strong> &#x51B3;&#x5B9A;&#x4E86; webpack &#x7684;&#x6A21;&#x5757;&#x89E3;&#x6790;&#x673A;&#x5236;&#x5339;&#x914D;&#x5230;&#x6587;&#x4EF6;&#x65F6;&#x5E94;&#x8BE5;&#x4F5C;&#x4F55;&#x5904;&#x7406;&#x3002;</li><li>loader &#x5B9A;&#x4E49;&#x5305;&#x62EC;&#x7528;&#x4E8E;&#x5339;&#x914D;&#x7684;<strong>&#x6761;&#x4EF6;&#xFF08;conditions&#xFF09;</strong>&#xFF0C;&#x4EE5;&#x53CA;&#x5339;&#x914D;&#x6210;&#x529F;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x7684;<strong>&#x52A8;&#x4F5C;&#xFF08;actions&#xFF09;</strong>&#x3002;</li><li>Webpack 2 &#x5F15;&#x5165;&#x4E86;<code>use</code>&#x5B57;&#x6BB5;&#x3002;&#x5B83;&#x5C06;&#x4EE5;&#x524D;&#x7684; <code>loader</code> &#x548C; <code>loaders</code> &#x5B57;&#x6BB5;&#x7ED3;&#x5408;&#x5230;&#x4E86;&#x4E00;&#x8D77;&#x3002;</li><li>Webpack 4 &#x63D0;&#x4F9B;&#x4E86;&#x591A;&#x79CD;&#x5339;&#x914D;&#x548C;&#x6539;&#x53D8; loader &#x884C;&#x4E3A;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x5339;&#x914D; loader &#x540E;&#x8FDB;&#x884C; <strong>resource query</strong> &#x5339;&#x914D;&#xFF0C;&#x6307;&#x5F15; loader &#x8FDB;&#x884C;&#x7279;&#x5B9A;&#x64CD;&#x4F5C;&#x3002;</li></ul><p>&#x5728;&#x4E0B;&#x4E00;&#x7AE0;&#x4E2D;&#xFF0C;&#x4F60;&#x5C06;&#x5B66;&#x4E60;&#x4F7F;&#x7528; webpack &#x52A0;&#x8F7D;&#x56FE;&#x7247;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Loader 入门【Webpack Book 翻译】

## 原文链接
[https://segmentfault.com/a/1190000016087028](https://segmentfault.com/a/1190000016087028)

