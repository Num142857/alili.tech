---
title: '[Vue CLI 3] 多页应用实践和源码设计'
reprint: true
categories: reprint
abbrlink: d0e854c9
date: 2018-11-13 02:30:09
---

{{% raw %}}
<p>&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;&#x5B98;&#x7F51;&#x7ED9;&#x7684; multi-page &#x7684;&#x914D;&#x7F6E;&#xFF1A;&#x9700;&#x8981;&#x5728; <code>vue.config.js</code> &#x914D;&#x7F6E; <code>pages</code>&#xFF0C;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>pages: {
    index: {
      // page &#x7684;&#x5165;&#x53E3;
      entry: &apos;src/index/main.js&apos;,
      // &#x6A21;&#x677F;&#x6765;&#x6E90;
      template: &apos;public/index.html&apos;,
      // &#x5728; dist/index.html &#x7684;&#x8F93;&#x51FA;
      filename: &apos;index.html&apos;,
      // &#x5F53;&#x4F7F;&#x7528; title &#x9009;&#x9879;&#x65F6;&#xFF0C;
      // template &#x4E2D;&#x7684; title &#x6807;&#x7B7E;&#x9700;&#x8981;&#x662F; &lt;title&gt;&lt;%= htmlWebpackPlugin.options.title %&gt;&lt;/title&gt;
      title: &apos;Index Page&apos;,
      // &#x5728;&#x8FD9;&#x4E2A;&#x9875;&#x9762;&#x4E2D;&#x5305;&#x542B;&#x7684;&#x5757;&#xFF0C;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#x4F1A;&#x5305;&#x542B;
      // &#x63D0;&#x53D6;&#x51FA;&#x6765;&#x7684;&#x901A;&#x7528; chunk &#x548C; vendor chunk&#x3002;
      chunks: [&apos;chunk-vendors&apos;, &apos;chunk-common&apos;, &apos;index&apos;]
    },
    // &#x5F53;&#x4F7F;&#x7528;&#x53EA;&#x6709;&#x5165;&#x53E3;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x683C;&#x5F0F;&#x65F6;&#xFF0C;
    // &#x6A21;&#x677F;&#x4F1A;&#x88AB;&#x63A8;&#x5BFC;&#x4E3A; `public/subpage.html`
    // &#x5E76;&#x4E14;&#x5982;&#x679C;&#x627E;&#x4E0D;&#x5230;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x56DE;&#x9000;&#x5230; `public/index.html`&#x3002;
    // &#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x540D;&#x4F1A;&#x88AB;&#x63A8;&#x5BFC;&#x4E3A; `subpage.html`&#x3002;
    subpage: &apos;src/subpage/main.js&apos;
  }</code></pre><p>&#x6BCF;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x4E2D;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5305;&#x542B;&#x4E86;&#x5982;&#x4E0B;&#x914D;&#x7F6E;&#xFF1A;</p><ul><li>entry &#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;</li><li>template &#x6A21;&#x677F;&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;</li><li>filename &#x7F16;&#x8BD1;&#x4E4B;&#x540E;&#x7684; html &#x6587;&#x4EF6;&#x540D;</li><li>title html &#x4E2D;&#x7684; title</li><li>chunks &#x6253;&#x5305;&#x7684; chunk &#x6587;&#x4EF6;&#xFF0C;&#x6570;&#x7EC4;&#x683C;&#x5F0F;&#xFF0C;&#x5305;&#x542B;&#x5165;&#x53E3;&#x6587;&#x4EF6;</li></ul><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8BBE;&#x8BA1;&#x4E00;&#x4E0B; <code>src</code> &#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x653E;&#x7F6E; multi-page &#x7684;&#x6587;&#x4EF6;&#xFF1A;</p><p>&#x770B;&#x4E86;&#x5F88;&#x591A;&#x591A;&#x9875;&#x9879;&#x76EE;&#xFF0C;&#x6709; 2 &#x4E2A;&#x65B9;&#x6848;&#xFF1A;</p><ul><li>&#x4E00;&#x79CD;&#x53EB; <code>pages</code> &#x6587;&#x4EF6;&#x5939;</li><li>&#x4E00;&#x79CD;&#x53EB; <code>views</code> &#x6216;&#x8005;&#x5176;&#x4ED6;&#x540D;&#x5B57;&#x7684;&#x6587;&#x4EF6;&#x5939;</li></ul><p>&#x5927;&#x5BB6;&#x81EA;&#x884C;&#x9009;&#x62E9;&#x6216;&#x8005;&#x5B9A;&#x4E49;&#x5C31;&#x597D;&#x4E86;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x9009; <code>pages</code></p><p>&#x6211;&#x4EEC;&#x518D;&#x770B;&#x4E00;&#x4E0B;&#x91CC;&#x9762;&#x7684;&#x6587;&#x4EF6;&#xFF1A;</p><ul><li>&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF1A;&#x6587;&#x4EF6;&#x540D;&#x53EF;&#x4EE5;&#x53EB; <code>main.js</code> &#x6216;&#x8005; <code>index.js</code></li><li>&#x6A21;&#x677F;&#x6587;&#x4EF6;&#xFF1A;&#x53EF;&#x4EE5;&#x7528;&#x7EDF;&#x4E00;&#x7684; &apos;public/index.html&apos;&#xFF0C;&#x6216;&#x8005;&#x76EE;&#x5F55;&#x5185;&#x653E;&#x7F6E;&#x4E00;&#x4E2A;&#x81EA;&#x5DF1;&#x7684;&#xFF0C;&#x53D6;&#x540D; <code>index.html</code></li><li>title&#xFF1A;&#x53EF;&#x4EE5;&#x4ECE;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x53D6;</li></ul><pre><code>src
  pages
    page1
      index.html
      main.js
      App.vue
    page2
      index.html
      main.js
      App.vue </code></pre><p>&#x4E0B;&#x9762;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x51FD;&#x6570;&#x6765;&#x751F;&#x6210; <code>pages</code> &#x7684;&#x914D;&#x7F6E;&#xFF1A;</p><p>&#x7B2C;&#x4E00;&#x6B65;&#xFF1A;&#x627E;&#x5230;&#x5165;&#x53E3;&#x6587;&#x4EF6;</p><p>&#x53EF;&#x4EE5;&#x7528; <code>glob</code></p><pre><code>const glob = require(&apos;glob&apos;)</code></pre><p><code>pages</code> &#x76EE;&#x5F55;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;<code>&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;</code>&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;<code>&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;</code>&#xFF1A;</p><pre><code>const path = require(&apos;path&apos;)
const PAGES_PATH = path.resolve(__dirname, &apos;./src/pages&apos;)</code></pre><p>&#x5B9A;&#x4E49;&#x4E00;&#x4E2A; pages &#x5BF9;&#x8C61;&#xFF1A;</p><pre><code>const pages = {}</code></pre><pre><code>glob.sync(PAGES_PATH + &apos;/*/main.js&apos;).forEach(filepath =&gt; {
  // ...
})</code></pre><p>&#x8FD9;&#x91CC;&#x5C31;&#x662F;&#x53BB;&#x8BBE;&#x7F6E;&#x5BF9;&#x5E94;&#x51E0;&#x4E2A; key &#x4E86;&#xFF0C;&#x5F88;&#x591A;&#x9879;&#x76EE;&#x57FA;&#x672C;&#x591A;&#x662F;&#x901A;&#x8FC7;</p><blockquote>/ &#x5206;&#x9694;&#x7B26;&#x6765;&#x5BF9;&#x5B57;&#x7B26;&#x4E32;&#x8FDB;&#x884C;&#x6570;&#x7EC4;&#x8BDD;&#xFF0C;&#x7136;&#x540E;&#x7B80;&#x5355;&#x5730;&#x83B7;&#x53D6;</blockquote><p>&#x4F46;&#x662F;&#x719F;&#x6089; <code>node.js path</code> &#x6A21;&#x5757;&#x7684;&#x4F1A;&#x5982;&#x4E0B;&#x5904;&#x7406;&#xFF1A;</p><pre><code>const pageName = path.basename(path.dirname(filepath))</code></pre><p>&#x5F80; pages &#x91CC;&#x9762;&#x5FAA;&#x73AF;&#x8BBE;&#x7F6E;&#xFF1A;</p><pre><code>pages[pageName] = {
    entry: filepath,
    filename: `${pageName}.html`,
    chunks: [&apos;chunk-vendors&apos;, &apos;chunk-common&apos;, pageName]
  }</code></pre><p>&#x5173;&#x4E8E; <code>template</code> &#x7A0D;&#x5FAE;&#x590D;&#x6742;&#x4E00;&#x70B9;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x505A;&#x5224;&#x65AD;&#xFF0C;&#x5982;&#x679C;&#x5B58;&#x5728;&#x5C31;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#x5C31;&#x7528;&#x901A;&#x7528;&#x7684;</p><pre><code>const templatePath = path.dirname(filepath) + &apos;/index.html&apos;</code></pre><p>&#x7136;&#x540E;&#x901A;&#x8FC7; fs.existsSync &#x4F1A;&#x5224;&#x65AD;&#x81EA;&#x5B9A;&#x4E49;&#x6587;&#x4EF6;&#x662F;&#x5426;&#x5B58;&#x5728;:</p><pre><code>if (!fs.existsSync(templatePath)) {
    // &#x5165;&#x53E3;&#x5982;&#x679C;&#x4E0D;&#x914D;&#x7F6E;&#x76F4;&#x63A5;&#x4F7F;&#x7528;
    templatePath = &apos;public/index.html&apos;
  }</code></pre><p>&#x5F53;&#x7136;&#x540E;&#x9762;&#x6211;&#x4EEC;<code>&#x5206;&#x4EAB;&#x4E86;&#x6E90;&#x7801;</code>&#x4E4B;&#x540E;&#xFF0C;&#x4F60;&#x5C31;&#x4F1A;&#x53D1;&#x73B0;&#x4F60;&#x505A;&#x4E86;<code>&#x65E0;&#x7528;&#x529F;</code></p><hr><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;&#x6E90;&#x7801;&#x5B9E;&#x73B0;&#x90E8;&#x5206;:</p><blockquote>&#x6BCF;&#x4E2A;&#x7248;&#x672C;&#x7684; cli-service &#x591A;&#x6709;&#x5FAE;&#x5C0F;&#x7684;&#x6539;&#x52A8;</blockquote><p><code>cli-service/lib/config/app.js</code> &#x6587;&#x4EF6;</p><p>&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x53D8;&#x91CF; <code>multiPageConfig</code> &#x83B7;&#x53D6; vue.config.js &#x53D6;&#x51FA;&#x6765;&#x7684; <code>pages</code>&#xFF1A;</p><pre><code>const multiPageConfig = options.pages</code></pre><p>&#x6E05;&#x7A7A;&#x4E00;&#x6B21; entry</p><pre><code>webpackConfig.entryPoints.clear()</code></pre><p>&#x901A;&#x8FC7; <code>Object.keys</code> &#x83B7;&#x53D6; keys&#xFF0C;&#x7136;&#x540E; <code>forEach</code> &#x5FAA;&#x73AF;</p><pre><code>const pages = Object.keys(multiPageConfig)
pages.forEach(name =&gt; {
})</code></pre><p>&#x5FAA;&#x73AF;&#x5185;&#x90E8;&#xFF1A;</p><p>&#x5148;&#x5B9A;&#x4E49;&#x8981;&#x7528;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x4ECE; multiPageConfig[name] &#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x53D6;&#xFF1A;</p><pre><code>const {
          title,
          entry,
          template = `public/${name}.html`,
          filename = `${name}.html`,
          chunks
        } = normalizePageConfig(multiPageConfig[name])</code></pre><p>normalizePageConfig &#x51FD;&#x6570;&#x5982;&#x4E0B;&#xFF1A;</p><blockquote>&#x5904;&#x7406; subpage: &apos;src/subpage/main.js&apos; &#x7684;&#x60C5;&#x51B5;</blockquote><pre><code>const normalizePageConfig = c =&gt; typeof c === &apos;string&apos; ? { entry: c } : c</code></pre><p>&#x8BBE;&#x7F6E; entry</p><pre><code>webpackConfig.entry(name).add(api.resolve(entry))</code></pre><p>hasDedicatedTemplate &#x662F;&#x5224;&#x65AD;</p><blockquote>&#x7528;&#x6237;&#x4F20;&#x9012;&#x7684;&#x591A;&#x9875;&#x914D;&#x7F6E;&#x81EA;&#x5B9A;&#x4E49;&#x6A21;&#x677F;&#x8DEF;&#x5F84;&#x662F;&#x5426;&#x5B58;&#x5728;&#xFF1A;</blockquote><pre><code>const fs = require(&apos;fs&apos;)
const hasDedicatedTemplate = fs.existsSync(api.resolve(template))</code></pre><p>templatePath &#x7684;&#x5904;&#x7406;&#x7EC6;&#x8282;&#xFF1A;</p><p><code>htmlPath</code> &#x8DEF;&#x5F84;&#x662F;&#xFF1A;</p><blockquote>/Users/<strong>*</strong>/public/index.html</blockquote><pre><code>const htmlPath = api.resolve(&apos;public/index.html&apos;)</code></pre><p><code>defaultHtmlPath</code> &#x8DEF;&#x5F84;&#x662F;&#xFF1A;</p><blockquote>/Users/<strong>*</strong>/node_modules/@vue/cli-service/lib/config/index-default.html</blockquote><pre><code>const defaultHtmlPath = path.resolve(__dirname, &apos;index-default.html&apos;)</code></pre><p>&#x5982;&#x679C;&#xFF1A;</p><p>1&#x3001;&#x7528;&#x6237;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x6A21;&#x677F;&#x5B58;&#x5728;&#x5C31;&#x76F4;&#x63A5;&#x7ED9; templatePath<br>2&#x3001;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x5148;&#x53D6; public/index.html&#xFF0C;&#x518D;&#x4E0D;&#x884C;&#x5C31;&#x53D6; node_modules &#x91CC;&#x9762;&#x7684;</p><pre><code>const templatePath = hasDedicatedTemplate
          ? template
          : fs.existsSync(htmlPath)
            ? htmlPath
            : defaultHtmlPath</code></pre><p>&#x6700;&#x7EC8;&#x901A;&#x8FC7; <code>html-webpack-plugin</code> &#x63D2;&#x4EF6;&#x6765;&#x751F;&#x6210;<code>&#x6307;&#x5B9A;&#x540D;&#x5B57;</code>&#x7684; html &#x6587;&#x4EF6;&#x5230;<code>&#x6307;&#x5B9A;&#x76EE;&#x5F55;</code>&#xFF1A;</p><p>1&#x3001;&#x6307;&#x5B9A;&#x76EE;&#x5F55;&#xFF1A;</p><p>&#x7531; <code>vue.config.js</code> &#x4E2D;&#x7684; <code>outputDir</code> &#x6765;&#x51B3;&#x5B9A;</p><pre><code>const outputDir = api.resolve(options.outputDir)</code></pre><p>2&#x3001;&#x751F;&#x6210; webpack config &#x5173;&#x4E8E; html-webpack-plugin &#x7684;&#x90E8;&#x5206;&#xFF1A;</p><pre><code>const HTMLPlugin = require(&apos;html-webpack-plugin&apos;)
webpackConfig
          .plugin(`html-${name}`)
            .use(HTMLPlugin, [pageHtmlOptions])</code></pre><p>pageHtmlOptions &#x7684;&#x5904;&#x7406;&#x7EC6;&#x8282;&#xFF1A;</p><p>&#x4F20;&#x9012;&#x7ED9; html-webpack-plugin &#x63D2;&#x4EF6;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x91CC;&#x9ED8;&#x8BA4;&#x4F1A;&#x8BBE;&#x7F6E; <code>chunks</code> &#x7684;&#xFF0C;&#x6240;&#x4EE5;<code>&#x4E0A;&#x9762;&#x5B9E;&#x6218;&#x4E2D;&#x914D;&#x7F6E;&#x4E5F;&#x662F;&#x65E0;&#x7528;&#x529F;</code></p><pre><code>const pageHtmlOptions = Object.assign({}, htmlOptions, {
          chunks: chunks || [&apos;chunk-vendors&apos;, &apos;chunk-common&apos;, name],
          template: templatePath,
          filename: ensureRelative(outputDir, filename),
          title
        })</code></pre>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[Vue CLI 3] 多页应用实践和源码设计

## 原文链接
[https://segmentfault.com/a/1190000016206160](https://segmentfault.com/a/1190000016206160)

