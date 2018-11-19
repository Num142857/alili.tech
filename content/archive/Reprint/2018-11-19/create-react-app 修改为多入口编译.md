---
title: 'create-react-app 修改为多入口编译' 
date: 2018-11-19 2:32:04
hidden: true
slug: ddcda41pz6w
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">create-react-app &#x4FEE;&#x6539;&#x4E3A;&#x591A;&#x5165;&#x53E3;&#x7F16;&#x8BD1;</h3><ul><li>date: 2018.07.31</li></ul><hr><ul><li>&#x53C2;&#x8003;&#x4E86;<a href="http://imshuai.com/create-react-app-multiple-entry-points/" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;</a></li></ul><h3 id="articleHeader1">&#x9700;&#x6C42;&#x548C;&#x51FA;&#x53D1;&#x70B9;</h3><p>&#x6211;&#x4EEC;&#x4F1A;&#x6709;&#x8F83;&#x591A;&#x7684;&#x5C0F;&#x7684;&#x5355;&#x9875;&#x5E94;&#x7528;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x4E00;&#x4E9B;&#x7B80;&#x5355;&#x7684;&#x9875;&#x9762;&#x548C;&#x6D3B;&#x52A8;&#x4E4B;&#x7C7B;&#x3002;&#x8FD9;&#x4E9B;&#x9875;&#x9762;&#x76F8;&#x4E92;&#x4E4B;&#x95F4;&#x6CA1;&#x6709;&#x4EA4;&#x96C6;&#xFF0C;&#x4F46;&#x662F;&#x4F1A;&#x6709;&#x4E00;&#x4E9B;&#x53EF;&#x4EE5;&#x5171;&#x7528;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x8D44;&#x6E90;&#x3001;&#x63A5;&#x53E3;&#x3001;&#x7EC4;&#x4EF6;&#x5565;&#x7684;&#x3002;</p><p>&#x5BF9;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x60F3;&#x5230;&#x4E86;&#x4E24;&#x79CD;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A;</p><ul><li>react-router &#x8DEF;&#x7531;&#x65B9;&#x6848;&#xFF1B;</li><li>&#x540C;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x591A;&#x5165;&#x53E3;&#x7F16;&#x8BD1;&#xFF1B;</li></ul><p>&#x9488;&#x5BF9;&#x6211;&#x4EEC;&#x7684;&#x4E1A;&#x52A1;&#x9700;&#x6C42;&#xFF0C;&#x5176;&#x5B9E; react-router &#x65B9;&#x6848;&#x4F1A;&#x6709;&#x4E24;&#x4E2A;&#x5C0F;&#x95EE;&#x9898;&#xFF1A;</p><ul><li>&#x5355;&#x4E2A;&#x6D3B;&#x52A8;&#x7684;&#x4FEE;&#x6539;&#xFF0C;&#x5176;&#x5B9E;&#x9700;&#x8981;&#x7F16;&#x8BD1;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#xFF1B;</li><li>&#x82E5;&#x662F;&#x4E0D;&#x505A;&#x7F16;&#x8BD1;&#x4F18;&#x5316;&#xFF0C;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x5305;&#x4F1A;&#x6BD4;&#x8F83;&#x5927;&#xFF0C;&#x4F46;&#x5176;&#x5B9E;&#x6CA1;&#x5FC5;&#x8981;&#xFF0C;&#x5F53;&#x7136;&#x8FD9;&#x4E2A;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; react-router &#x7684;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x6765;&#x89E3;&#x51B3;&#xFF1B;</li></ul><p>&#x6743;&#x8861;&#x4E4B;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x662F;&#x9009;&#x62E9;&#x4E86;&#x7B2C;&#x4E8C;&#x4E2A;&#x65B9;&#x6848;&#x2014;&#x2014;&#x6539;&#x9020;&#x9879;&#x76EE;&#x6210;&#x4E3A;&#x591A;&#x5165;&#x53E3;&#x7F16;&#x8BD1;&#x3002;</p><h3 id="articleHeader2">&#x6587;&#x4EF6;&#x7ED3;&#x6784;&#x8BBE;&#x8BA1;</h3><p>&#x6539;&#x8FDB;&#x540E;&#xFF0C;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x7ED3;&#x6784;&#x5927;&#x4F53;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- project
    - build
    - config
    - public
    - scripts
    - src
        - api
        - component
        - site
            - site1
                - index.html
                - index.js
                - ...
            - site2
                - index.html
                - index.js
                - ...
    - package.json" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> project
</span>    -<span class="ruby"> build
</span>    -<span class="ruby"> config
</span>    -<span class="ruby"> public
</span>    -<span class="ruby"> scripts
</span>    -<span class="ruby"> src
</span>        -<span class="ruby"> api
</span>        -<span class="ruby"> component
</span>        -<span class="ruby"> site
</span>            -<span class="ruby"> site1
</span>                -<span class="ruby"> index.html
</span>                -<span class="ruby"> index.js
</span>                -<span class="ruby"> ...
</span>            -<span class="ruby"> site2
</span>                -<span class="ruby"> index.html
</span>                -<span class="ruby"> index.js
</span>                -<span class="ruby"> ...
</span>    -<span class="ruby"> package.json</span></code></pre><p>site &#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;&#x6240;&#x6709;&#x6587;&#x4EF6;&#x5939;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x9879;&#x76EE;&#x901A;&#x7528;&#x7684;&#x4EE3;&#x7801;&#x3001;&#x8D44;&#x6E90;&#x88AB;&#x62BD;&#x79BB;&#x5230;&#x66F4;&#x5916;&#x5C42;&#x7684;&#x6587;&#x4EF6;&#x5939;&#x5185;&#xFF0C;&#x5982; api&#x3001;component &#x7B49;&#xFF0C;&#x6587;&#x4EF6;&#x5939;&#x5185;&#x90FD;&#x4F1A;&#x6709;&#x81EA;&#x5DF1;&#x7684; index.html &#x548C; index.js&#xFF0C;&#x8FD9;&#x4F1A;&#x4F5C;&#x4E3A;&#x8BE5;&#x9879;&#x76EE;&#x7684; html &#x6A21;&#x677F;&#x548C;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x3002;&#x4E0B;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x770B;&#x4E0B;&#x662F;&#x5982;&#x4F55;&#x4FEE;&#x6539;&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;&#x7684;&#x3002;</p><h3 id="articleHeader3">&#x4FEE;&#x6539;&#x5165;&#x53E3;&#x548C;&#x51FA;&#x53E3;</h3><p>&#x7F16;&#x8BD1;&#x9700;&#x8981;&#x6307;&#x5B9A;&#x7F16;&#x8BD1;&#x7684;&#x5165;&#x53E3;&#x548C;&#x8F93;&#x51FA;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x5728; create-react-app &#x672C;&#x6765;&#x751F;&#x6210;&#x7684; code &#x4E2D;&#xFF0C;&#x53EA;&#x6709;&#x5355;&#x5165;&#x53E3;&#x548C;&#x5355;&#x51FA;&#x53E3;&#xFF0C;&#x4F46;&#x662F;&#x5176;&#x5B9E; webpack &#x662F;&#x652F;&#x6301;&#x591A;&#x5165;&#x53E3;&#x3001;&#x591A;&#x51FA;&#x53E3;&#x7684;&#x3002;</p><h4>&#x5165;&#x53E3;&#x4FEE;&#x6539;</h4><p>create-react-app &#x547D;&#x4EE4;&#x751F;&#x6210;&#x7684; config &#x6587;&#x4EF6;&#x5939;&#x4E2D;&#xFF0C;&#x6709;&#x4E2A; paths.js &#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x91CC;&#x9762; export &#x4E86;&#x6BD4;&#x8F83;&#x5E38;&#x7528;&#x7684;&#x8DEF;&#x5F84;&#x3002;&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x5BF9; src/site &#x6587;&#x4EF6;&#x5939;&#x5185;&#x7684;&#x6587;&#x4EF6;&#x5939;&#x8FDB;&#x884C;&#x4E86;&#x904D;&#x5386;&#xFF0C;&#x751F;&#x6210;&#x4E3A;&#x5BF9;&#x8C61;&#x3002;&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// all site paths
function allSitePath(source) {
  const { lstatSync, readdirSync } = fs
  const { join } = path
  const result = {}
  const isDirectory = source =&gt; lstatSync(source).isDirectory()
  readdirSync(source).map(name =&gt; {
    let path = join(resolveApp(source), name)
    if (isDirectory(path)) result[name] = path
  })
  return result
}

module.exports = {
  ...
  allSites: allSitePath(&apos;src/site&apos;),
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// all site paths</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">allSitePath</span>(<span class="hljs-params">source</span>) </span>{
  <span class="hljs-keyword">const</span> { lstatSync, readdirSync } = fs
  <span class="hljs-keyword">const</span> { join } = path
  <span class="hljs-keyword">const</span> result = {}
  <span class="hljs-keyword">const</span> isDirectory = <span class="hljs-function"><span class="hljs-params">source</span> =&gt;</span> lstatSync(source).isDirectory()
  readdirSync(source).map(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> path = join(resolveApp(source), name)
    <span class="hljs-keyword">if</span> (isDirectory(path)) result[name] = path
  })
  <span class="hljs-keyword">return</span> result
}

<span class="hljs-built_in">module</span>.exports = {
  ...
  allSites: allSitePath(<span class="hljs-string">&apos;src/site&apos;</span>),
}</code></pre><p>&#x5728; webpack.config.dev.js / webpack.config.prod.js &#x4E2D;&#x627E;&#x5230; module.exports &#x7684; entry &#x5C5E;&#x6027;&#xFF0C;&#x5C06;&#x5176;&#x4FEE;&#x6539;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x52A8;&#x6001;&#x751F;&#x6210; entry
const entry = {}
Object.keys(paths.allSites).forEach(item =&gt; {
  entry[item] = [
    require.resolve(&apos;./polyfills&apos;),
    require.resolve(&apos;react-dev-utils/webpackHotDevClient&apos;),
    require.resolve(&apos;react-error-overlay&apos;),
    paths.allSites[item]
  ]
})

module.exports = {
  ...
  entry: entry,
  ...
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x52A8;&#x6001;&#x751F;&#x6210; entry</span>
<span class="hljs-keyword">const</span> entry = {}
<span class="hljs-built_in">Object</span>.keys(paths.allSites).forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
  entry[item] = [
    <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;./polyfills&apos;</span>),
    <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;react-dev-utils/webpackHotDevClient&apos;</span>),
    <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;react-error-overlay&apos;</span>),
    paths.allSites[item]
  ]
})

<span class="hljs-built_in">module</span>.exports = {
  ...
  entry: entry,
  ...
}
</code></pre><h4>&#x51FA;&#x53E3;&#x4FEE;&#x6539;</h4><p>&#x51FA;&#x53E3;&#x7684;&#x4FEE;&#x6539;&#x5206;&#x4E3A;&#x4E24;&#x90E8;&#x5206;&#xFF0C;&#x4E00;&#x90E8;&#x5206;&#x662F; module.exports &#x7684; output&#xFF0C;&#x6DFB;&#x52A0; name &#x4EE5;&#x4F7F;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x533A;&#x5206;&#x4E0D;&#x540C;&#x9879;&#x76EE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  ...
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: &apos;static/js/[name].bundle.js&apos;,
    chunkFilename: &apos;static/js/[name].chunk.js&apos;,
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =&gt;
      path.resolve(info.absoluteResourcePath).replace(/\\/g, &apos;/&apos;),
  },
  ...
} " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs roboconf"><code>module.exports = {
  ...
  <span class="hljs-attribute">output</span>: {
    path: paths<span class="hljs-variable">.appBuild</span>,
    pathinfo: true,
    filename: &apos;static/js/[name]<span class="hljs-variable">.bundle</span><span class="hljs-variable">.js</span>&apos;,
    chunkFilename: &apos;static/js/[name]<span class="hljs-variable">.chunk</span><span class="hljs-variable">.js</span>&apos;,
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =&gt;
      path<span class="hljs-variable">.resolve</span>(info<span class="hljs-variable">.absoluteResourcePath</span>)<span class="hljs-variable">.replace</span>(/\\/g, &apos;/&apos;),
  },
  ...
} </code></pre><p>&#x53E6;&#x4E00;&#x90E8;&#x5206;&#x662F; plugin &#x7684;&#x4FEE;&#x6539;&#xFF0C;webpack &#x4E2D;&#xFF0C;&#x6BCF;&#x4E2A; HTML &#x6587;&#x4EF6;&#x7684;&#x8F93;&#x51FA;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x4E00;&#x4E2A; HtmlWebpackPlugin&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x591A;&#x4E2A; HtmlWebpackPlugin&#xFF0C;&#x4EE5;&#x6C42;&#x751F;&#x6210;&#x591A;&#x4E2A; HTML&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x52A8;&#x6001;&#x751F;&#x6210; plugins
const plugins = []
Object.keys(paths.allSites).forEach(item =&gt; {
  plugins.push(new HtmlWebpackPlugin({
    inject: true,
    chunks: [item],
    template: `${paths.allSites[item]}/index.html`,
    filename: `${item}/index.html`,
  }))
})

module.exports = {
  ...
  plugins: [
    ...
  ].concat(plugins),    
  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x52A8;&#x6001;&#x751F;&#x6210; plugins</span>
<span class="hljs-keyword">const</span> plugins = []
<span class="hljs-built_in">Object</span>.keys(paths.allSites).forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
  plugins.push(<span class="hljs-keyword">new</span> HtmlWebpackPlugin({
    <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">chunks</span>: [item],
    <span class="hljs-attr">template</span>: <span class="hljs-string">`<span class="hljs-subst">${paths.allSites[item]}</span>/index.html`</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">`<span class="hljs-subst">${item}</span>/index.html`</span>,
  }))
})

<span class="hljs-built_in">module</span>.exports = {
  ...
  plugins: [
    ...
  ].concat(plugins),    
  ...
}</code></pre><h3 id="articleHeader4">&#x4FEE;&#x6539; webpack Dev Server &#x914D;&#x7F6E;</h3><p>&#x4E0A;&#x8FF0;&#x914D;&#x7F6E;&#x505A;&#x5B8C;&#x540E;&#xFF0C;&#x7406;&#x8BBA;&#x5C31;&#x53EF;&#x4EE5;&#x6253;&#x5305;&#x51FA;&#x591A;&#x5165;&#x53E3;&#x7684;&#x7248;&#x672C;&#xFF1B;&#x4F46;&#x4F7F;&#x7528;npm start&#x542F;&#x52A8;&#x540E;&#xFF0C;&#x53D1;&#x73B0;&#x65E0;&#x8BBA;&#x8F93;&#x5165;/index.html&#x8FD8;&#x662F;/admin.html&#xFF0C;&#x597D;&#x50CF;&#x90FD;&#x662F;&#x548C;&#x539F;&#x6765;/index.html&#x663E;&#x793A;&#x4E00;&#x6837;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x751A;&#x81F3;&#x8F93;&#x5165;&#x663E;&#x7136;&#x4E0D;&#x5B58;&#x5728;&#x7684;/xxxx.html&#xFF0C;&#x4E5F;&#x663E;&#x793A;&#x4E3A;/index.html&#x7684;&#x5185;&#x5BB9;&#x3002;</p><p>&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x4FEE;&#x6539; /config/webpackDevServer.config.js&#xFF0C;&#x505A;&#x4E00;&#x4E9B;&#x989D;&#x5916;&#x914D;&#x7F6E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rewrites = []
Object.keys(paths.allSites).forEach(item =&gt; {
  rewrites.push({
    from: new RegExp(`^\\/${item}/`, &apos;i&apos;),
    to: `/${item}/index.html`,
  })
})

...

module.exports = function(proxy, allowedHost) {
  return {
    ...
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebookincubator/create-react-app/issues/387.
      disableDotRule: true,
      // &#x6307;&#x660E;&#x54EA;&#x4E9B;&#x8DEF;&#x5F84;&#x6620;&#x5C04;&#x5230;&#x54EA;&#x4E2A;html
      rewrites: rewrites,
    },
    ...
  };
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> rewrites = []
<span class="hljs-built_in">Object</span>.keys(paths.allSites).forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
  rewrites.push({
    <span class="hljs-keyword">from</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">`^\\/<span class="hljs-subst">${item}</span>/`</span>, <span class="hljs-string">&apos;i&apos;</span>),
    to: <span class="hljs-string">`/<span class="hljs-subst">${item}</span>/index.html`</span>,
  })
})

...

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">proxy, allowedHost</span>) </span>{
  <span class="hljs-keyword">return</span> {
    ...
    historyApiFallback: {
      <span class="hljs-comment">// Paths with dots should still use the history fallback.</span>
      <span class="hljs-comment">// See https://github.com/facebookincubator/create-react-app/issues/387.</span>
      disableDotRule: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// &#x6307;&#x660E;&#x54EA;&#x4E9B;&#x8DEF;&#x5F84;&#x6620;&#x5C04;&#x5230;&#x54EA;&#x4E2A;html</span>
      rewrites: rewrites,
    },
    ...
  };
};
</code></pre><p>OK&#xFF0C;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6574;&#x4E2A;&#x6539;&#x9020;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
create-react-app 修改为多入口编译

## 原文链接
[https://segmentfault.com/a/1190000015837055](https://segmentfault.com/a/1190000015837055)

