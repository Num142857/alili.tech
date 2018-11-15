---
title: webpack的可视化资源分析工具webpack-bundle-analyzer的使用
hidden: true
categories: reprint
slug: 386e6ff
date: 2018-11-14 02:30:09
---

{{< raw >}}
<p>&#x968F;&#x7740;&#x9879;&#x76EE;&#x8D8A;&#x6765;&#x7EA6;&#x5E9E;&#x5927;&#xFF0C;&#x5BFC;&#x81F4;&#x6784;&#x5EFA;&#x5305;&#x7684;&#x65F6;&#x5019;&#x901F;&#x5EA6;&#x7F13;&#x6162;&#xFF01;</p><blockquote>&#x9996;&#x5148;&#x63A8;&#x8350;&#x4F7F;&#x7528;wepback&#x7684;&#x53EF;&#x89C6;&#x5316;&#x8D44;&#x6E90;&#x5206;&#x6790;&#x5DE5;&#x5177;&#x3002;&#x4EE5;&#x4E0B;&#x7ED9;&#x51FA;webpack-bundle-analyzer&#x914D;&#x7F6E;&#x3010;vue-cli&#x6784;&#x5EFA;&#x9879;&#x76EE;&#x65F6;&#x4F1A;&#x81EA;&#x52A8;&#x914D;&#x7F6E;&#x597D;&#x3011;</blockquote><ul><li>&#x5B89;&#x88C5;webpack-bundle-analyzer<br>&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x5165;npm/cnpm install --save-dev webpack-bundle-analyzer</li><li><p>config/index.js&#x6587;&#x4EF6;&#x4E2D;</p><pre><code>module.exports = {
  build: {
  ...
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
  ...
}</code></pre></li><li><p>webpack&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E2D; build/webpack.prod.conf.js&#x6587;&#x4EF6;&#x4E2D;</p><pre><code>...
if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require(&apos;webpack-bundle-analyzer&apos;).BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
...</code></pre></li><li>&#x5F00;&#x59CB;&#x4F7F;&#x7528;webpack-bundle-analyzer<br>&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x5165;cnpm run build --report<br>&#x7B49;&#x5F85;&#x6784;&#x5EFA;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x8F93;&#x5165;localhost:8888&#x6253;&#x5F00;&#x5206;&#x6790;&#x7ED3;&#x679C;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x5206;&#x6790;&#x5566;&#x3002;&#x62C9;&#x62C9;&#x62C9;&#x62C9;&#x62C9;&#xFF01;&#x5F00;&#x5FC3;.png<br>&#x6D4F;&#x89C8;&#x5668;&#x6253;&#x5F00;&#x5206;&#x6790;&#x7ED3;&#x679C;&#xFF0C;&#x5927;&#x6982;&#x957F;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#x54DF;<p><span class="img-wrap"><img data-src="/img/bVbf3jw?w=1916&amp;h=1015" src="https://static.alili.tech/img/bVbf3jw?w=1916&amp;h=1015" alt="clipboard.png" title="clipboard.png"></span></p></li></ul><blockquote>&#x5206;&#x6790;&#x7ED3;&#x679C;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x4F18;&#x5316;&#x5566;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack的可视化资源分析工具webpack-bundle-analyzer的使用

## 原文链接
[https://segmentfault.com/a/1190000016180784](https://segmentfault.com/a/1190000016180784)

