---
title: '【敲黑板】手把手教你vue-cli单页到多页应用' 
date: 2018-11-29 9:33:05
hidden: true
slug: 1uaei8sde88h
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">vue-cli&#x5230;&#x591A;&#x9875;&#x5E94;&#x7528;</h2>
<p><strong><em>&#x524D;&#x8A00;&#xFF1A;&#x6211;&#x6709;&#x4E00;&#x4E2A;cli&#x521B;&#x5EFA;&#x7684;vue&#x9879;&#x76EE;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x60F3;&#x505A;&#x6210;&#x591A;&#x9875;&#x5E94;&#x7528;&#xFF0C;&#x600E;&#x4E48;&#x529E;&#xFF0C;&#x5E9F;&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x76F4;&#x63A5;&#x5F00;&#x64B8;~</em></strong></p>
<p><strong><em>&#x7EA6;&#x5B9A;&#xFF1A;&#x65B0;&#x589E;&#x4EE3;&#x7801;&#x90E8;&#x5206;&#x5728;//add&#x548C;//end&#x4E2D;&#x95F4;    &#x5220;&#x9664;(&#x6CE8;&#x91CA;)&#x4EE3;&#x7801;&#x90E8;&#x5206;&#x5728;//del&#x548C;//end&#x4E2D;&#x95F4;&#xFF0C;&#x5F88;&#x591A;&#x4E1C;&#x897F;&#x90FD;&#x5199;&#x5728;&#x6CE8;&#x91CA;&#x91CC;</em></strong></p>
<h2 id="articleHeader1">&#x7B2C;&#x4E00;&#x6B65;&#xFF1A;cli&#x4E00;&#x4E2A;vue&#x9879;&#x76EE;</h2>
<p>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;vue&#x9879;&#x76EE;  &#x5B98;&#x7F51; vue init webpack demo<br>cli&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;webpack&#x7684;dev-server&#x670D;&#x52A1;&#xFF0C;&#x8FD9;&#x4E2A;&#x670D;&#x52A1;&#x662F;&#x505A;&#x4E0D;&#x4E86;&#x5355;&#x9875;&#x7684;&#xFF0C;&#x9700;&#x8981;&#x624B;&#x52A8;&#x5EFA;&#x4E00;&#x4E2A;&#x79C1;&#x670D;&#x53EB;&#x5565;&#x4F60;&#x968F;&#x610F;  &#x4E00;&#x822C;&#x53EB;dev.server&#x6216;&#x8005;dev.client</p>
<h2 id="articleHeader2">&#x7B2C;&#x4E8C;&#x6B65;&#xFF1A;&#x6DFB;&#x52A0;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x5904;&#x7406;&#x51FA;&#x53E3;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF08;SPA&#x9ED8;&#x8BA4;&#x5199;&#x6B7B;&#x7684;&#xFF09;</h2>
<p>&#x8FDB;&#x5165;&#x521A;&#x521A;&#x521B;&#x5EFA;vue&#x9879;&#x76EE; cd demo<br>&#x5728;&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x627E;&#x5230;build/utils.js&#x6587;&#x4EF6; <br>&#x4FEE;&#x6539;&#x90E8;&#x5206;&#xFF1A;</p>
<ul><li>utils.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;
const path = require(&apos;path&apos;)
const config = require(&apos;../config&apos;)
const ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;)
const packageConfig = require(&apos;../package.json&apos;)

//add
const glob = require(&apos;glob&apos;);
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);   //&#x529F;&#x80FD;&#xFF1A;&#x751F;&#x6210;html&#x6587;&#x4EF6;&#x53CA;js&#x6587;&#x4EF6;&#x5E76;&#x628A;js&#x5F15;&#x5165;html
const pagePath = path.resolve(__dirname, &apos;../src/views/&apos;);  //&#x9875;&#x9762;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x6BD4;&#x5982;&#x8FD9;&#x91CC;&#x6211;&#x7528;&#x7684;views&#xFF0C;&#x90A3;&#x4E48;&#x540E;&#x9762;&#x79C1;&#x670D;&#x52A0;&#x5165;&#x7684;&#x6587;&#x4EF6;&#x76D1;&#x63A7;&#x5668;&#x5C31;&#x4F1A;&#x4ECE;src&#x4E0B;&#x9762;&#x7684;views&#x4E0B;&#x9762;&#x5F00;&#x59CB;&#x76D1;&#x63A7;&#x6587;&#x4EF6;
//end

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === &apos;production&apos;
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: &apos;css-loader&apos;,
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: &apos;postcss-loader&apos;,
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + &apos;-loader&apos;,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: &apos;vue-style-loader&apos;
      })
    } else {
      return [&apos;vue-style-loader&apos;].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders(&apos;less&apos;),
    sass: generateLoaders(&apos;sass&apos;, { indentedSyntax: true }),
    scss: generateLoaders(&apos;sass&apos;),
    stylus: generateLoaders(&apos;stylus&apos;),
    styl: generateLoaders(&apos;stylus&apos;)
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp(&apos;\\.&apos; + extension + &apos;$&apos;),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () =&gt; {
  const notifier = require(&apos;node-notifier&apos;)

  return (severity, errors) =&gt; {
    if (severity !== &apos;error&apos;) return

    const error = errors[0]
    const filename = error.file &amp;&amp; error.file.split(&apos;!&apos;).pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + &apos;: &apos; + error.name,
      subtitle: filename || &apos;&apos;,
      icon: path.join(__dirname, &apos;logo.png&apos;)
    })
  }
}

//add  &#x65B0;&#x589E;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x5904;&#x7406;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF08;&#x5355;&#x9875;&#x5E94;&#x7528;&#x7684;&#x5165;&#x53E3;&#x90FD;&#x662F;&#x5199;&#x6B7B;&#xFF0C;&#x5230;&#x65F6;&#x5019;&#x66FF;&#x6362;&#x6210;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF09;
exports.createEntry = () =&gt; {
  let files = glob.sync(pagePath + &apos;/**/*.js&apos;);
  let entries = {};
  let basename;
  let foldername;

  files.forEach(entry =&gt; {
    // Filter the router.js
    basename = path.basename(entry, path.extname(entry), &apos;router.js&apos;);
    foldername = path.dirname(entry).split(&apos;/&apos;).splice(-1)[0];
    // If foldername not equal basename, doing nothing
    // The folder maybe contain more js files, but only the same name is main
    if (basename === foldername) {
      entries[basename] = process.env.NODE_ENV === &apos;development&apos; ?
        [
          &apos;webpack-hot-middleware/client?noInfo=true&amp;reload=true&amp;path=/__webpack_hmr&amp;timeout=20000&apos;,
          entry
        ]: [entry];
    }
  });
  return entries;
};
//end

//add &#x65B0;&#x589E;&#x51FA;&#x53E3;&#x6587;&#x4EF6;
exports.createHtmlWebpackPlugin = (publicModule) =&gt; {
  let files = glob.sync(pagePath + &apos;/**/*.html&apos;, {matchBase: true});
  let entries = exports.createEntry();
  let plugins = [];
  let conf;
  let basename;
  let foldername;
  publicModule = publicModule || [];

  files.forEach(file =&gt; {
    basename = path.basename(file, path.extname(file));
    foldername = path.dirname(file).split(&apos;/&apos;).splice(-1).join(&apos;&apos;);

    if (basename === foldername) {
      conf = {
        template: file,
        filename: basename + &apos;.html&apos;,
        inject: true,
        chunks: entries[basename] ? [basename] : []
      };
      if (process.env.NODE_ENV !== &apos;development&apos;) {
        conf.chunksSortMode = &apos;dependency&apos;;
        conf.minify = {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        };
        // &#x5728;&#x6784;&#x5EFA;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x6307;&#x5B9A;&#x5171;&#x7528;&#x6A21;&#x5757;
        conf.chunks = [...publicModule, ...conf.chunks];
      }

      plugins.push(new HtmlWebpackPlugin(conf));
    }
  });
  return plugins;
};
//end" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">&apos;use strict&apos;</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config&apos;</span>)
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>)
<span class="hljs-keyword">const</span> packageConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../package.json&apos;</span>)

<span class="hljs-comment">//add</span>
<span class="hljs-keyword">const</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;glob&apos;</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);   <span class="hljs-comment">//&#x529F;&#x80FD;&#xFF1A;&#x751F;&#x6210;html&#x6587;&#x4EF6;&#x53CA;js&#x6587;&#x4EF6;&#x5E76;&#x628A;js&#x5F15;&#x5165;html</span>
<span class="hljs-keyword">const</span> pagePath = path.resolve(__dirname, <span class="hljs-string">&apos;../src/views/&apos;</span>);  <span class="hljs-comment">//&#x9875;&#x9762;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x6BD4;&#x5982;&#x8FD9;&#x91CC;&#x6211;&#x7528;&#x7684;views&#xFF0C;&#x90A3;&#x4E48;&#x540E;&#x9762;&#x79C1;&#x670D;&#x52A0;&#x5165;&#x7684;&#x6587;&#x4EF6;&#x76D1;&#x63A7;&#x5668;&#x5C31;&#x4F1A;&#x4ECE;src&#x4E0B;&#x9762;&#x7684;views&#x4E0B;&#x9762;&#x5F00;&#x59CB;&#x76D1;&#x63A7;&#x6587;&#x4EF6;</span>
<span class="hljs-comment">//end</span>

exports.assetsPath = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_path</span>) </span>{
  <span class="hljs-keyword">const</span> assetsSubDirectory = process.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  <span class="hljs-keyword">return</span> path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  options = options || {}

  <span class="hljs-keyword">const</span> cssLoader = {
    <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;css-loader&apos;</span>,
    <span class="hljs-attr">options</span>: {
      <span class="hljs-attr">sourceMap</span>: options.sourceMap
    }
  }

  <span class="hljs-keyword">const</span> postcssLoader = {
    <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;postcss-loader&apos;</span>,
    <span class="hljs-attr">options</span>: {
      <span class="hljs-attr">sourceMap</span>: options.sourceMap
    }
  }

  <span class="hljs-comment">// generate loader string to be used with extract text plugin</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateLoaders</span> (<span class="hljs-params">loader, loaderOptions</span>) </span>{
    <span class="hljs-keyword">const</span> loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    <span class="hljs-keyword">if</span> (loader) {
      loaders.push({
        <span class="hljs-attr">loader</span>: loader + <span class="hljs-string">&apos;-loader&apos;</span>,
        <span class="hljs-attr">options</span>: <span class="hljs-built_in">Object</span>.assign({}, loaderOptions, {
          <span class="hljs-attr">sourceMap</span>: options.sourceMap
        })
      })
    }

    <span class="hljs-comment">// Extract CSS when that option is specified</span>
    <span class="hljs-comment">// (which is the case during production build)</span>
    <span class="hljs-keyword">if</span> (options.extract) {
      <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
        <span class="hljs-attr">use</span>: loaders,
        <span class="hljs-attr">fallback</span>: <span class="hljs-string">&apos;vue-style-loader&apos;</span>
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> [<span class="hljs-string">&apos;vue-style-loader&apos;</span>].concat(loaders)
    }
  }

  <span class="hljs-comment">// https://vue-loader.vuejs.org/en/configurations/extract-css.html</span>
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">css</span>: generateLoaders(),
    <span class="hljs-attr">postcss</span>: generateLoaders(),
    <span class="hljs-attr">less</span>: generateLoaders(<span class="hljs-string">&apos;less&apos;</span>),
    <span class="hljs-attr">sass</span>: generateLoaders(<span class="hljs-string">&apos;sass&apos;</span>, { <span class="hljs-attr">indentedSyntax</span>: <span class="hljs-literal">true</span> }),
    <span class="hljs-attr">scss</span>: generateLoaders(<span class="hljs-string">&apos;sass&apos;</span>),
    <span class="hljs-attr">stylus</span>: generateLoaders(<span class="hljs-string">&apos;stylus&apos;</span>),
    <span class="hljs-attr">styl</span>: generateLoaders(<span class="hljs-string">&apos;stylus&apos;</span>)
  }
}

<span class="hljs-comment">// Generate loaders for standalone style files (outside of .vue)</span>
exports.styleLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">const</span> output = []
  <span class="hljs-keyword">const</span> loaders = exports.cssLoaders(options)

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> extension <span class="hljs-keyword">in</span> loaders) {
    <span class="hljs-keyword">const</span> loader = loaders[extension]
    output.push({
      <span class="hljs-attr">test</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">&apos;\\.&apos;</span> + extension + <span class="hljs-string">&apos;$&apos;</span>),
      <span class="hljs-attr">use</span>: loader
    })
  }

  <span class="hljs-keyword">return</span> output
}

exports.createNotifierCallback = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> notifier = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;node-notifier&apos;</span>)

  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">severity, errors</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (severity !== <span class="hljs-string">&apos;error&apos;</span>) <span class="hljs-keyword">return</span>

    <span class="hljs-keyword">const</span> error = errors[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">const</span> filename = error.file &amp;&amp; error.file.split(<span class="hljs-string">&apos;!&apos;</span>).pop()

    notifier.notify({
      <span class="hljs-attr">title</span>: packageConfig.name,
      <span class="hljs-attr">message</span>: severity + <span class="hljs-string">&apos;: &apos;</span> + error.name,
      <span class="hljs-attr">subtitle</span>: filename || <span class="hljs-string">&apos;&apos;</span>,
      <span class="hljs-attr">icon</span>: path.join(__dirname, <span class="hljs-string">&apos;logo.png&apos;</span>)
    })
  }
}

<span class="hljs-comment">//add  &#x65B0;&#x589E;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x5904;&#x7406;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF08;&#x5355;&#x9875;&#x5E94;&#x7528;&#x7684;&#x5165;&#x53E3;&#x90FD;&#x662F;&#x5199;&#x6B7B;&#xFF0C;&#x5230;&#x65F6;&#x5019;&#x66FF;&#x6362;&#x6210;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF09;</span>
exports.createEntry = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">let</span> files = glob.sync(pagePath + <span class="hljs-string">&apos;/**/*.js&apos;</span>);
  <span class="hljs-keyword">let</span> entries = {};
  <span class="hljs-keyword">let</span> basename;
  <span class="hljs-keyword">let</span> foldername;

  files.forEach(<span class="hljs-function"><span class="hljs-params">entry</span> =&gt;</span> {
    <span class="hljs-comment">// Filter the router.js</span>
    basename = path.basename(entry, path.extname(entry), <span class="hljs-string">&apos;router.js&apos;</span>);
    foldername = path.dirname(entry).split(<span class="hljs-string">&apos;/&apos;</span>).splice(<span class="hljs-number">-1</span>)[<span class="hljs-number">0</span>];
    <span class="hljs-comment">// If foldername not equal basename, doing nothing</span>
    <span class="hljs-comment">// The folder maybe contain more js files, but only the same name is main</span>
    <span class="hljs-keyword">if</span> (basename === foldername) {
      entries[basename] = process.env.NODE_ENV === <span class="hljs-string">&apos;development&apos;</span> ?
        [
          <span class="hljs-string">&apos;webpack-hot-middleware/client?noInfo=true&amp;reload=true&amp;path=/__webpack_hmr&amp;timeout=20000&apos;</span>,
          entry
        ]: [entry];
    }
  });
  <span class="hljs-keyword">return</span> entries;
};
<span class="hljs-comment">//end</span>

<span class="hljs-comment">//add &#x65B0;&#x589E;&#x51FA;&#x53E3;&#x6587;&#x4EF6;</span>
exports.createHtmlWebpackPlugin = <span class="hljs-function">(<span class="hljs-params">publicModule</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> files = glob.sync(pagePath + <span class="hljs-string">&apos;/**/*.html&apos;</span>, {<span class="hljs-attr">matchBase</span>: <span class="hljs-literal">true</span>});
  <span class="hljs-keyword">let</span> entries = exports.createEntry();
  <span class="hljs-keyword">let</span> plugins = [];
  <span class="hljs-keyword">let</span> conf;
  <span class="hljs-keyword">let</span> basename;
  <span class="hljs-keyword">let</span> foldername;
  publicModule = publicModule || [];

  files.forEach(<span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> {
    basename = path.basename(file, path.extname(file));
    foldername = path.dirname(file).split(<span class="hljs-string">&apos;/&apos;</span>).splice(<span class="hljs-number">-1</span>).join(<span class="hljs-string">&apos;&apos;</span>);

    <span class="hljs-keyword">if</span> (basename === foldername) {
      conf = {
        <span class="hljs-attr">template</span>: file,
        <span class="hljs-attr">filename</span>: basename + <span class="hljs-string">&apos;.html&apos;</span>,
        <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">chunks</span>: entries[basename] ? [basename] : []
      };
      <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">&apos;development&apos;</span>) {
        conf.chunksSortMode = <span class="hljs-string">&apos;dependency&apos;</span>;
        conf.minify = {
          <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">collapseWhitespace</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">removeAttributeQuotes</span>: <span class="hljs-literal">true</span>
        };
        <span class="hljs-comment">// &#x5728;&#x6784;&#x5EFA;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x6307;&#x5B9A;&#x5171;&#x7528;&#x6A21;&#x5757;</span>
        conf.chunks = [...publicModule, ...conf.chunks];
      }

      plugins.push(<span class="hljs-keyword">new</span> HtmlWebpackPlugin(conf));
    }
  });
  <span class="hljs-keyword">return</span> plugins;
};
<span class="hljs-comment">//end</span></code></pre>
<h2 id="articleHeader3">&#x7B2C;&#x4E09;&#x6B65;&#xFF1A;&#x521B;&#x5EFA;&#x79C1;&#x670D;&#xFF08;&#x4E0D;&#x4F7F;&#x7528;dev-server&#x670D;&#x52A1;&#xFF0C;&#x81EA;&#x5DF1;&#x5EFA;&#x4E00;&#x4E2A;&#xFF09;</h2>
<p>&#x4ECE;express&#x65B0;&#x5EFA;&#x79C1;&#x670D;&#x5E76;&#x914D;&#x7F6E;(build&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x65B0;&#x5EFA; &#x6211;&#x8FD9;&#x91CC;&#x53EB;webpack.dev.client.js)</p>
<ul><li>webpack.dev.client.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * created by qbyu2 on 2018-05-30
 * express &#x79C1;&#x670D;
 * */
&apos;use strict&apos;;

const fs = require(&apos;fs&apos;);
const path = require(&apos;path&apos;);
const express = require(&apos;express&apos;);
const webpack = require(&apos;webpack&apos;);
const webpackDevMiddleware = require(&apos;webpack-dev-middleware&apos;);   //&#x6587;&#x4EF6;&#x76D1;&#x63A7;(&#x524D;&#x9762;&#x914D;&#x7F6E;&#x4E86;&#x4ECE;views&#x4E0B;&#x9762;&#x76D1;&#x63A7;)
const webpackHotMiddleware = require(&apos;webpack-hot-middleware&apos;);   //&#x70ED;&#x52A0;&#x8F7D;
const config = require(&apos;../config&apos;);
const devWebpackConfig = require(&apos;./webpack.dev.conf&apos;);
const proxyMiddleware = require(&apos;http-proxy-middleware&apos;);   //&#x8DE8;&#x57DF;

const proxyTable = config.dev.proxyTable;

const PORT = config.dev.port;
const HOST = config.dev.host;
const assetsRoot = config.dev.assetsRoot;
const app = express();
const router = express.Router();
const compiler = webpack(devWebpackConfig);

let devMiddleware  = webpackDevMiddleware(compiler, {
  publicPath: devWebpackConfig.output.publicPath,
  quiet: true,
  stats: {
    colors: true,
    chunks: false
  }
});

let hotMiddleware = webpackHotMiddleware(compiler, {
  path: &apos;/__webpack_hmr&apos;,
  heartbeat: 2000
});

app.use(hotMiddleware);
app.use(devMiddleware);

Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context];
  if (typeof options === &apos;string&apos;) {
    options = {
      target: options
    };
  }
  app.use(proxyMiddleware(context, options));
});

//&#x53CC;&#x8DEF;&#x7531;   &#x79C1;&#x670D;&#x4E00;&#x5C42;&#x63A7;&#x5236;&#x79C1;&#x670D;&#x8DEF;&#x7531;    vue&#x7684;&#x8DEF;&#x7531;&#x63A7;&#x5236;&#x8BE5;&#x9875;&#x9762;&#x4E0B;&#x7684;&#x8DEF;&#x7531;
app.use(router)
app.use(&apos;/static&apos;, express.static(path.join(assetsRoot, &apos;static&apos;)));

let sendFile = (viewname, response, next) =&gt; {
  compiler.outputFileSystem.readFile(viewname, (err, result) =&gt; {
    if (err) {
      return (next(err));
    }
    response.set(&apos;content-type&apos;, &apos;text/html&apos;);
    response.send(result);
    response.end();
  });
};

//&#x62FC;&#x63A5;&#x65B9;&#x6CD5;
function pathJoin(patz) {
  return path.join(assetsRoot, patz);
}

/**
 * &#x5B9A;&#x4E49;&#x8DEF;&#x7531;(&#x79C1;&#x670D;&#x8DEF;&#x7531; &#x975E;vue&#x8DEF;&#x7531;)
 * */

// favicon
router.get(&apos;/favicon.ico&apos;, (req, res, next) =&gt; {
  res.end();
});

// http://localhost:8080/
router.get(&apos;/&apos;, (req, res, next)=&gt;{
  sendFile(pathJoin(&apos;index.html&apos;), res, next);
});

// http://localhost:8080/home
router.get(&apos;/:home&apos;, (req, res, next) =&gt; {
  sendFile(pathJoin(req.params.home + &apos;.html&apos;), res, next);
});

// http://localhost:8080/index
router.get(&apos;/:index&apos;, (req, res, next) =&gt; {
  sendFile(pathJoin(req.params.index + &apos;.html&apos;), res, next);
});

module.exports = app.listen(PORT, err =&gt; {
  if (err){
    return
  }
  console.log(`Listening at http://${HOST}:${PORT}\n`);
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">/**
 * created by qbyu2 on 2018-05-30
 * express &#x79C1;&#x670D;
 * */</span>
<span class="hljs-meta">&apos;use strict&apos;</span>;

<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>);
<span class="hljs-keyword">const</span> webpackDevMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-dev-middleware&apos;</span>);   <span class="hljs-comment">//&#x6587;&#x4EF6;&#x76D1;&#x63A7;(&#x524D;&#x9762;&#x914D;&#x7F6E;&#x4E86;&#x4ECE;views&#x4E0B;&#x9762;&#x76D1;&#x63A7;)</span>
<span class="hljs-keyword">const</span> webpackHotMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-hot-middleware&apos;</span>);   <span class="hljs-comment">//&#x70ED;&#x52A0;&#x8F7D;</span>
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config&apos;</span>);
<span class="hljs-keyword">const</span> devWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.dev.conf&apos;</span>);
<span class="hljs-keyword">const</span> proxyMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http-proxy-middleware&apos;</span>);   <span class="hljs-comment">//&#x8DE8;&#x57DF;</span>

<span class="hljs-keyword">const</span> proxyTable = config.dev.proxyTable;

<span class="hljs-keyword">const</span> PORT = config.dev.port;
<span class="hljs-keyword">const</span> HOST = config.dev.host;
<span class="hljs-keyword">const</span> assetsRoot = config.dev.assetsRoot;
<span class="hljs-keyword">const</span> app = express();
<span class="hljs-keyword">const</span> router = express.Router();
<span class="hljs-keyword">const</span> compiler = webpack(devWebpackConfig);

<span class="hljs-keyword">let</span> devMiddleware  = webpackDevMiddleware(compiler, {
  publicPath: devWebpackConfig.output.publicPath,
  quiet: <span class="hljs-literal">true</span>,
  stats: {
    colors: <span class="hljs-literal">true</span>,
    chunks: <span class="hljs-literal">false</span>
  }
});

<span class="hljs-keyword">let</span> hotMiddleware = webpackHotMiddleware(compiler, {
  path: <span class="hljs-string">&apos;/__webpack_hmr&apos;</span>,
  heartbeat: <span class="hljs-number">2000</span>
});

app.use(hotMiddleware);
app.use(devMiddleware);

<span class="hljs-built_in">Object</span>.keys(proxyTable).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
  <span class="hljs-keyword">let</span> options = proxyTable[context];
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> options === <span class="hljs-string">&apos;string&apos;</span>) {
    options = {
      target: options
    };
  }
  app.use(proxyMiddleware(context, options));
});

<span class="hljs-comment">//&#x53CC;&#x8DEF;&#x7531;   &#x79C1;&#x670D;&#x4E00;&#x5C42;&#x63A7;&#x5236;&#x79C1;&#x670D;&#x8DEF;&#x7531;    vue&#x7684;&#x8DEF;&#x7531;&#x63A7;&#x5236;&#x8BE5;&#x9875;&#x9762;&#x4E0B;&#x7684;&#x8DEF;&#x7531;</span>
app.use(router)
app.use(<span class="hljs-string">&apos;/static&apos;</span>, express.static(path.join(assetsRoot, <span class="hljs-string">&apos;static&apos;</span>)));

<span class="hljs-keyword">let</span> sendFile = <span class="hljs-function">(<span class="hljs-params">viewname, response, next</span>) =&gt;</span> {
  compiler.outputFileSystem.readFile(viewname, <span class="hljs-function">(<span class="hljs-params">err, result</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-keyword">return</span> (next(err));
    }
    response.set(<span class="hljs-string">&apos;content-type&apos;</span>, <span class="hljs-string">&apos;text/html&apos;</span>);
    response.send(result);
    response.end();
  });
};

<span class="hljs-comment">//&#x62FC;&#x63A5;&#x65B9;&#x6CD5;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pathJoin</span>(<span class="hljs-params">patz</span>) </span>{
  <span class="hljs-keyword">return</span> path.join(assetsRoot, patz);
}

<span class="hljs-comment">/**
 * &#x5B9A;&#x4E49;&#x8DEF;&#x7531;(&#x79C1;&#x670D;&#x8DEF;&#x7531; &#x975E;vue&#x8DEF;&#x7531;)
 * */</span>

<span class="hljs-comment">// favicon</span>
router.get(<span class="hljs-string">&apos;/favicon.ico&apos;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
  res.end();
});

<span class="hljs-comment">// http://localhost:8080/</span>
router.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, next</span>)=&gt;</span>{
  sendFile(pathJoin(<span class="hljs-string">&apos;index.html&apos;</span>), res, next);
});

<span class="hljs-comment">// http://localhost:8080/home</span>
router.get(<span class="hljs-string">&apos;/:home&apos;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
  sendFile(pathJoin(req.params.home + <span class="hljs-string">&apos;.html&apos;</span>), res, next);
});

<span class="hljs-comment">// http://localhost:8080/index</span>
router.get(<span class="hljs-string">&apos;/:index&apos;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
  sendFile(pathJoin(req.params.index + <span class="hljs-string">&apos;.html&apos;</span>), res, next);
});

<span class="hljs-built_in">module</span>.exports = app.listen(PORT, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (err){
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Listening at http://<span class="hljs-subst">${HOST}</span>:<span class="hljs-subst">${PORT}</span>\n`</span>);
})</code></pre>
<p>&#x79C1;&#x670D;&#x521B;&#x5EFA;&#x597D;&#x4E86;  &#x5B89;&#x88C5;&#x4E0B;&#x4F9D;&#x8D56;<br>&#x6709;&#x5751;&#x3002;&#x3002;&#x3002;<br>webpack&#x548C;&#x70ED;&#x52A0;&#x8F7D;&#x7248;&#x672C;&#x592A;&#x9AD8;&#x592A;&#x4F4E;&#x90FD;&#x4E0D;&#x884C;<br>npm install webpack@3.10.0 --save-dev<br>npm install webpack-dev-middleware --save-dev<br>npm install webpack-hot-middleware@2.21.0 --save-dev<br>npm install http-proxy-middleware --save-dev</p>
<h2 id="articleHeader4">&#x7B2C;&#x56DB;&#x6B65;&#xFF1A;&#x4FEE;&#x6539;&#x914D;&#x7F6E;</h2>
<ul><li>webpack.base.conf.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x628A;&#x539F;&#x6765;&#x5199;&#x6B7B;&#x7684;
entry: {
    app: &apos;./src/index.js&apos;
  },
&#x6539;&#x4E3A;&#xFF1A;
entry: utils.createEntry()," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code>&#x628A;&#x539F;&#x6765;&#x5199;&#x6B7B;&#x7684;
<span class="hljs-selector-tag">entry</span>: {
    <span class="hljs-attribute">app</span>: <span class="hljs-string">&apos;./src/index.js&apos;</span>
  },
&#x6539;&#x4E3A;&#xFF1A;
<span class="hljs-selector-tag">entry</span>: <span class="hljs-selector-tag">utils</span><span class="hljs-selector-class">.createEntry</span>(),</code></pre>
<ul><li>webpack.dev.conf.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;
const utils = require(&apos;./utils&apos;)
const webpack = require(&apos;webpack&apos;)
const config = require(&apos;../config&apos;)
const merge = require(&apos;webpack-merge&apos;)
const path = require(&apos;path&apos;)
const baseWebpackConfig = require(&apos;./webpack.base.conf&apos;)
const CopyWebpackPlugin = require(&apos;copy-webpack-plugin&apos;)
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;)
const FriendlyErrorsPlugin = require(&apos;friendly-errors-webpack-plugin&apos;)
const portfinder = require(&apos;portfinder&apos;)

process.env.NODE_ENV = &apos;development&apos;;

const HOST = process.env.HOST
const PORT = process.env.PORT &amp;&amp; Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  //del  &#x6CE8;&#x6389;SPA&#x7684;&#x670D;&#x52A1;&#x5668;
  // devServer: {
  //   clientLogLevel: &apos;warning&apos;,
  //   historyApiFallback: {
  //     rewrites: [
  //       { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, &apos;index.html&apos;) },
  //     ],
  //   },
  //   hot: true,
  //   contentBase: false, // since we use CopyWebpackPlugin.
  //   compress: true,
  //   host: HOST || config.dev.host,
  //   port: PORT || config.dev.port,
  //   open: config.dev.autoOpenBrowser,
  //   overlay: config.dev.errorOverlay
  //     ? { warnings: false, errors: true }
  //     : false,
  //   publicPath: config.dev.assetsPublicPath,
  //   proxy: config.dev.proxyTable,
  //   quiet: true, // necessary for FriendlyErrorsPlugin
  //   watchOptions: {
  //     poll: config.dev.poll,
  //   }
  // },
  //end
  plugins: [
    new webpack.DefinePlugin({
      &apos;process.env&apos;: require(&apos;../config/dev.env&apos;)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    //del   &#x6CE8;&#x91CA;&#x6389;spa&#x56FA;&#x5B9A;&#x7684;&#x5355;&#x9875;&#x51FA;&#x53E3;  &#x672B;&#x5C3E;&#x52A8;&#x6001;&#x914D;&#x4E0A;&#x51FA;&#x53E3;
    // new HtmlWebpackPlugin({
    //   filename: &apos;index.html&apos;,
    //   template: &apos;index.html&apos;,
    //   inject: true
    // }),
    //end
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, &apos;../static&apos;),
        to: config.dev.assetsSubDirectory,
        ignore: [&apos;.*&apos;]
      }
    ])
  ]
  //add
    .concat(utils.createHtmlWebpackPlugin())
  //end
})
//del
// module.exports = new Promise((resolve, reject) =&gt; {
//   portfinder.basePort = process.env.PORT || config.dev.port
//   portfinder.getPort((err, port) =&gt; {
//     if (err) {
//       reject(err)
//     } else {
//       // publish the new Port, necessary for e2e tests
//       process.env.PORT = port
//       // add port to devServer config
//       devWebpackConfig.devServer.port = port
//
//       // Add FriendlyErrorsPlugin
//       devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
//         compilationSuccessInfo: {
//           messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
//         },
//         onErrors: config.dev.notifyOnErrors
//         ? utils.createNotifierCallback()
//         : undefined
//       }))
//
//       resolve(devWebpackConfig)
//     }
//   })
// })
//end
module.exports = devWebpackConfig;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">&apos;use strict&apos;</span>
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./utils&apos;</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config&apos;</span>)
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.base.conf&apos;</span>)
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;copy-webpack-plugin&apos;</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>)
<span class="hljs-keyword">const</span> FriendlyErrorsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;friendly-errors-webpack-plugin&apos;</span>)
<span class="hljs-keyword">const</span> portfinder = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;portfinder&apos;</span>)

process.env.NODE_ENV = <span class="hljs-string">&apos;development&apos;</span>;

<span class="hljs-keyword">const</span> HOST = process.env.HOST
<span class="hljs-keyword">const</span> PORT = process.env.PORT &amp;&amp; <span class="hljs-built_in">Number</span>(process.env.PORT)

<span class="hljs-keyword">const</span> devWebpackConfig = merge(baseWebpackConfig, {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: utils.styleLoaders({ <span class="hljs-attr">sourceMap</span>: config.dev.cssSourceMap, <span class="hljs-attr">usePostCSS</span>: <span class="hljs-literal">true</span> })
  },
  <span class="hljs-comment">// cheap-module-eval-source-map is faster for development</span>
  devtool: config.dev.devtool,

  <span class="hljs-comment">// these devServer options should be customized in /config/index.js</span>
  <span class="hljs-comment">//del  &#x6CE8;&#x6389;SPA&#x7684;&#x670D;&#x52A1;&#x5668;</span>
  <span class="hljs-comment">// devServer: {</span>
  <span class="hljs-comment">//   clientLogLevel: &apos;warning&apos;,</span>
  <span class="hljs-comment">//   historyApiFallback: {</span>
  <span class="hljs-comment">//     rewrites: [</span>
  <span class="hljs-comment">//       { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, &apos;index.html&apos;) },</span>
  <span class="hljs-comment">//     ],</span>
  <span class="hljs-comment">//   },</span>
  <span class="hljs-comment">//   hot: true,</span>
  <span class="hljs-comment">//   contentBase: false, // since we use CopyWebpackPlugin.</span>
  <span class="hljs-comment">//   compress: true,</span>
  <span class="hljs-comment">//   host: HOST || config.dev.host,</span>
  <span class="hljs-comment">//   port: PORT || config.dev.port,</span>
  <span class="hljs-comment">//   open: config.dev.autoOpenBrowser,</span>
  <span class="hljs-comment">//   overlay: config.dev.errorOverlay</span>
  <span class="hljs-comment">//     ? { warnings: false, errors: true }</span>
  <span class="hljs-comment">//     : false,</span>
  <span class="hljs-comment">//   publicPath: config.dev.assetsPublicPath,</span>
  <span class="hljs-comment">//   proxy: config.dev.proxyTable,</span>
  <span class="hljs-comment">//   quiet: true, // necessary for FriendlyErrorsPlugin</span>
  <span class="hljs-comment">//   watchOptions: {</span>
  <span class="hljs-comment">//     poll: config.dev.poll,</span>
  <span class="hljs-comment">//   }</span>
  <span class="hljs-comment">// },</span>
  <span class="hljs-comment">//end</span>
  plugins: [
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">&apos;process.env&apos;</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config/dev.env&apos;</span>)
    }),
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
    <span class="hljs-keyword">new</span> webpack.NamedModulesPlugin(), <span class="hljs-comment">// HMR shows correct file names in console on update.</span>
    <span class="hljs-keyword">new</span> webpack.NoEmitOnErrorsPlugin(),
    <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-comment">//del   &#x6CE8;&#x91CA;&#x6389;spa&#x56FA;&#x5B9A;&#x7684;&#x5355;&#x9875;&#x51FA;&#x53E3;  &#x672B;&#x5C3E;&#x52A8;&#x6001;&#x914D;&#x4E0A;&#x51FA;&#x53E3;</span>
    <span class="hljs-comment">// new HtmlWebpackPlugin({</span>
    <span class="hljs-comment">//   filename: &apos;index.html&apos;,</span>
    <span class="hljs-comment">//   template: &apos;index.html&apos;,</span>
    <span class="hljs-comment">//   inject: true</span>
    <span class="hljs-comment">// }),</span>
    <span class="hljs-comment">//end</span>
    <span class="hljs-comment">// copy custom static assets</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      {
        <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../static&apos;</span>),
        <span class="hljs-attr">to</span>: config.dev.assetsSubDirectory,
        <span class="hljs-attr">ignore</span>: [<span class="hljs-string">&apos;.*&apos;</span>]
      }
    ])
  ]
  <span class="hljs-comment">//add</span>
    .concat(utils.createHtmlWebpackPlugin())
  <span class="hljs-comment">//end</span>
})
<span class="hljs-comment">//del</span>
<span class="hljs-comment">// module.exports = new Promise((resolve, reject) =&gt; {</span>
<span class="hljs-comment">//   portfinder.basePort = process.env.PORT || config.dev.port</span>
<span class="hljs-comment">//   portfinder.getPort((err, port) =&gt; {</span>
<span class="hljs-comment">//     if (err) {</span>
<span class="hljs-comment">//       reject(err)</span>
<span class="hljs-comment">//     } else {</span>
<span class="hljs-comment">//       // publish the new Port, necessary for e2e tests</span>
<span class="hljs-comment">//       process.env.PORT = port</span>
<span class="hljs-comment">//       // add port to devServer config</span>
<span class="hljs-comment">//       devWebpackConfig.devServer.port = port</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">//       // Add FriendlyErrorsPlugin</span>
<span class="hljs-comment">//       devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({</span>
<span class="hljs-comment">//         compilationSuccessInfo: {</span>
<span class="hljs-comment">//           messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],</span>
<span class="hljs-comment">//         },</span>
<span class="hljs-comment">//         onErrors: config.dev.notifyOnErrors</span>
<span class="hljs-comment">//         ? utils.createNotifierCallback()</span>
<span class="hljs-comment">//         : undefined</span>
<span class="hljs-comment">//       }))</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">//       resolve(devWebpackConfig)</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">//   })</span>
<span class="hljs-comment">// })</span>
<span class="hljs-comment">//end</span>
<span class="hljs-built_in">module</span>.exports = devWebpackConfig;</code></pre>
<ul><li>webpack.prod.conf.js</li></ul>
<p>plugins&#x6700;&#x540E;&#x52A0;&#x4E0A;.concat(utils.createHtmlWebpackPlugin([&apos;manifest&apos;, &apos;vendor&apos;]))<br>test&#x73AF;&#x5883;&#x4E00;&#x6837;</p>
<h2 id="articleHeader5">&#x7B2C;&#x4E94;&#x6B65;&#xFF1A;&#x4FEE;&#x6539;package.json &#x6307;&#x4EE4;&#x914D;&#x7F6E;</h2>
<p>scripts&#x4E0B;&#x9762;&apos;dev&apos;:<br>&#x8FD9;&#x6837;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x4E0D;&#x4F1A;&#x8D70;&#x9ED8;&#x8BA4;&#x7684;dev-server&#x800C;&#x8D70;&#x4F60;&#x7684;&#x79C1;&#x670D;&#x4E86;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/webpack.dev.client.js&quot;,
    &quot;start&quot;: &quot;npm run dev&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;
  }," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;node build/webpack.dev.client.js&quot;</span>,
    <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;npm run dev&quot;</span>,
    <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;node build/build.js&quot;</span>
  },</code></pre>
<h2 id="articleHeader6">&#x7B2C;&#x516D;&#x6B65;&#xFF1A;&#x521B;&#x5EFA;&#x6D4B;&#x8BD5;&#x6587;&#x4EF6;</h2>
<p>src&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA; views&#x6587;&#x4EF6;&#x5939;  &#xFF08;&#x4EE3;&#x7801;&#x6CE8;&#x91CA;&#x91CC;&#x6709; &#x5F53;&#x65F6;&#x914D;&#x7684;&#x76EE;&#x5F55;&#x8DDF;&#x8FD9;&#x4E2A;&#x4E00;&#x81F4;&#x5C31;&#x53EF;&#x4EE5; &#x968F;&#x4FBF;&#x4F60;&#x547D;&#x540D;  &#x9075;&#x5FAA;&#x547D;&#x540D;&#x89C4;&#x8303;&#x5C31;&#x884C;&#xFF09;<br>views &#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x65B0;&#x5EFA;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x5939;index&#x548C;home  &#x4EE3;&#x8868;&#x591A;&#x9875;  &#x6BCF;&#x9875;&#x5355;&#x72EC;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5939; &#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x5EFA;&#x5BF9;&#x5E94;&#x6587;&#x4EF6;</p>
<p>&#x6253;&#x5305;&#x6539;&#x4E3A;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;config/index.js<br>build&#x4E0B;&#x9762;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="assetsPublicPath: &apos;/&apos;,   =&gt;   assetsPublicPath: &apos;./&apos;," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">assetsPublicPath:</span> <span class="hljs-string">&apos;/&apos;</span>,   =&gt;   <span class="hljs-string">assetsPublicPath:</span> <span class="hljs-string">&apos;./&apos;</span>,</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbzpC?w=212&amp;h=170" src="https://static.alili.tech/img/bVbbzpC?w=212&amp;h=170" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>&#x6700;&#x540E;&#xFF0C;npm run dev   &#x6216;&#x8005;  npm run build</p>
<h2 id="articleHeader7">&#x6D4B;&#x8BD5;&#x73AF;&#x5883;&#x81EA;&#x5DF1;&#x914D;  &#x8DDF; &#x751F;&#x4EA7;&#x73AF;&#x5883;&#x5DEE;&#x4E0D;&#x591A;&#xFF0C;&#x5C31;&#x51E0;&#x4E2A;&#x914D;&#x7F6E;&#x53C2;&#x6570;&#x4E0D;&#x4E00;&#x6837;</h2>
<p>&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x7279;&#x4E48;&#x7684;&#x4EC0;&#x4E48;&#x9B3C;&#x6587;&#x7AE0;  &#x62A5;&#x9519;&#x4E86;&#x554A;<br>&#x7A0D;&#x5B89;&#x52FF;&#x8E81;~<br>&#x4E24;&#x4E2A;&#x5730;&#x65B9;&#xFF0C;</p>
<ul><li>1.webpack.dev.client.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x53CC;&#x8DEF;&#x7531;   &#x79C1;&#x670D;&#x4E00;&#x5C42;&#x63A7;&#x5236;&#x79C1;&#x670D;&#x8DEF;&#x7531;    vue&#x7684;&#x8DEF;&#x7531;&#x63A7;&#x5236;&#x8BE5;&#x9875;&#x9762;&#x4E0B;&#x7684;&#x8DEF;&#x7531;
app.use(router)
app.use(&apos;/static&apos;, express.static(path.join(assetsRoot, &apos;static&apos;)));" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs fsharp"><code><span class="hljs-comment">//&#x53CC;&#x8DEF;&#x7531;   &#x79C1;&#x670D;&#x4E00;&#x5C42;&#x63A7;&#x5236;&#x79C1;&#x670D;&#x8DEF;&#x7531;    vue&#x7684;&#x8DEF;&#x7531;&#x63A7;&#x5236;&#x8BE5;&#x9875;&#x9762;&#x4E0B;&#x7684;&#x8DEF;&#x7531;</span>
app.<span class="hljs-keyword">use</span>(router)
app.<span class="hljs-keyword">use</span>(&apos;/<span class="hljs-keyword">static</span>&apos;, express.<span class="hljs-keyword">static</span>(path.join(assetsRoot, &apos;<span class="hljs-keyword">static</span>&apos;)));</code></pre>
<p>&#x8FD9;&#x4E2A;assetsRoot   cli&#x521B;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#x662F;&#x6CA1;&#x6709;&#x7684; &#x5728;config/index.js &#x4E0B;&#x9762;&#x627E;&#x5230;dev&#x52A0;&#x4E0A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="assetsRoot: path.resolve(__dirname, &apos;../dist&apos;)," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">assetsRoo<span class="hljs-variable">t:</span> path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">&apos;../dist&apos;</span>),</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbzEN?w=647&amp;h=241" src="https://static.alili.tech/img/bVbbzEN?w=647&amp;h=241" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li>2.&#x8FD8;&#x662F;&#x7248;&#x672C;&#x95EE;&#x9898;</li></ul>
<p>webpack-dev-middleware &#x9ED8;&#x8BA4;&#x662F;3.1.3&#x7248;&#x672C;&#x4F46;&#x662F;&#x4F1A;&#x62A5;&#x9519;<br>&#x5177;&#x4F53;&#x54EA;&#x4E2A;&#x7248;&#x672C;&#x4E0D;&#x62A5;&#x9519;&#x6211;&#x4E5F;&#x4E0D;&#x77E5;&#x9053;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="context.compiler.hooks.invalid.tap(&apos;WebpackDevMiddleware&apos;, invalid);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">context</span><span class="hljs-selector-class">.compiler</span><span class="hljs-selector-class">.hooks</span><span class="hljs-selector-class">.invalid</span><span class="hljs-selector-class">.tap</span>(<span class="hljs-string">&apos;WebpackDevMiddleware&apos;</span>, invalid);</code></pre>
<p>&#x627E;&#x4E0D;&#x5230;invalid   &#x6E90;&#x7801;&#x91CC;&#x9762;&#x662F;&#x6709;&#x7684;<br>&#x5378;&#x8F7D;webpack-dev-middleware</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm uninstall webpack-dev-middleware" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> uninstall webpack-dev-middleware</code></pre>
<p>&#x4F7F;&#x7528;dev-server&#x81EA;&#x5E26;&#x7684;webpack-dev-middleware  &#xFF08;cli&#x5355;&#x9875;&#x5E94;&#x7528;&#x662F;&#x6709;&#x70ED;&#x52A0;&#x8F7D;&#x7684;&#xFF09;<br>&#x91CD;&#x65B0;install dev-server</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack-dev-server@2.10.0 --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">npm</span> <span class="hljs-selector-tag">install</span> <span class="hljs-selector-tag">webpack-dev-server</span>@<span class="hljs-keyword">2</span>.<span class="hljs-keyword">10</span>.<span class="hljs-keyword">0</span> --save-dev</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbzJk?w=403&amp;h=177" src="https://static.alili.tech/img/bVbbzJk?w=403&amp;h=177" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbbzJC?w=420&amp;h=172" src="https://static.alili.tech/img/bVbbzJC?w=420&amp;h=172" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">&#x603B;&#x7ED3;&#xFF1A;&#x6838;&#x5FC3;&#x70B9;&#x5C31;&#x5728;&#x521B;&#x5EFA;&#x5E76;&#x914D;&#x7F6E;&#x79C1;&#x670D;&#x548C;&#x4FEE;&#x6539;&#x51FA;&#x53E3;&#x5165;&#x53E3;&#x914D;&#x7F6E;&#xFF0C;&#x5751;&#x5C31;&#x5728;&#x7248;&#x672C;&#x4E0D;&#x517C;&#x5BB9;</h2>
<p>&#x5EFA;&#x8BAE;&#xFF1A;cli&#x4E00;&#x4E2A;vue&#x7684;demo&#x9879;&#x76EE; &#x4ECE;&#x5934;&#x64B8;&#x4E00;&#x904D; &#x518D;&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x91CC;&#x4F7F;&#x7528;&#xFF0C;&#x800C;&#x4E0D;&#x662F;copy&#x4E00;&#x4E0B;&#x8FD0;&#x884C;&#x6CA1;&#x95EE;&#x9898;&#x641E;&#x5B9A;~<br>&#x5EFA;&#x8BAE;&#x800C;&#x5DF2;&#xFF0C;&#x4F60;&#x600E;&#x4E48;&#x6253;&#x4EBA;&#xFF0C;&#x545C;&#x545C;&#x545C;~</p>
<p>&#x5FEB;&#x8FC7;&#x8282;&#x4E86;&#xFF0C;&#x89C9;&#x5F97;&#x672C;&#x6587;&#x5BF9;&#x4F60;&#x6709;&#x7528;&#x7684;&#x8BDD;&#x8BF7;&#x968F;&#x610F;&#x6253;&#x8D4F;&#xFF0C;&#x8BA9;&#x4F5C;&#x8005;&#x53EF;&#x4EE5;&#x4E70;&#x4E2A;&#x68D2;&#x68D2;&#x7CD6;&#x5403;~</p>
<p>-------------------------------------------6.1&#x66F4;-----------------------------------------<br>&#x7559;&#x4E86;&#x4E00;&#x4E2A;&#x5751;&#xFF0C;&#x4E00;&#x5929;&#x4E86;&#xFF0C;&#x6709;&#x8D5E;&#x6709;&#x6536;&#x85CF;&#xFF0C;&#x6CA1;&#x89C1;&#x4EBA;&#x8BC4;&#x8BBA;&#x6307;&#x51FA;&#x5751;&#xFF0C;&#x5FC3;&#x75DB;&#x7684;&#x65E0;&#x6CD5;&#x547C;&#x5438;~</p>
<p>build &#x540E; &#x6CA1;&#x6709;&#x5F15;&#x5165;&#x5171;&#x7528;&#x6A21;&#x5757;</p>
<p>&#x4EE3;&#x7801;&#x5DF2;&#x66F4;&#x65B0;~ build&#x540E;&#x53EF;&#x6B63;&#x5E38;&#x8BBF;&#x95EE;...</p>
<p>&#x4EE3;&#x7801;&#x4ED3;&#x5E93;&#xFF1A;<a href="https://github.com/yuqibin/vue-cli-multi-page" rel="nofollow noreferrer" target="_blank">github</a></p>
<p><em>&#x6CE8;&#xFF1A;&#x5185;&#x5BB9;&#x6709;&#x4E0D;&#x5F53;&#x6216;&#x8005;&#x9519;&#x8BEF;&#x5904;&#x8BF7;&#x6307;&#x6B63;~&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;~&#x8C22;&#x8C22;&#x5408;&#x4F5C;&#xFF01;</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【敲黑板】手把手教你vue-cli单页到多页应用

## 原文链接
[https://segmentfault.com/a/1190000015113584](https://segmentfault.com/a/1190000015113584)

