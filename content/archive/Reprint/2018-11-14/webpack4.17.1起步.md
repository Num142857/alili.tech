---
title: webpack4.17.1起步
reprint: true
categories: reprint
abbrlink: 2f960d3d
date: 2018-11-14 02:30:09
---

{{% raw %}}
<h2>&#x672C;&#x5730;&#x5B89;&#x88C5;webpack</h2><pre><code>npm install --save-dev webpack
</code></pre><p>&#x5982;&#x679C;&#x4F7F;&#x7528;webpack4+&#x7248;&#x672C;&#xFF0C;&#x9700;&#x8981;&#x5B89;&#x88C5;webpack-cli</p><pre><code>npm install webpack webpack-cli --save-dev
</code></pre><hr><h2>&#x521D;&#x59CB;&#x5316;npm</h2><p>&#x521D;&#x59CB;&#x5316;npm&#x540E;&#xFF0C;&#x4F1A;&#x751F;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x6210;&#x4E00;&#x4E2A;package.json</p><pre><code>npm init -y</code></pre><h2>&#x521B;&#x5EFA;&#x6587;&#x4EF6;&#x76EE;&#x5F55;&#xFF0C;&#x6587;&#x4EF6;&#xFF0C;&#x5185;&#x5BB9;</h2><p>&#x6587;&#x4EF6;&#x7ED3;&#x6784;</p><pre><code>webpack
|-/src
  |-index.js
|-index.html
|-package.json</code></pre><p>src/index.js</p><pre><code>function component () {
  var ele = document.createElement(&apos;div&apos;)
  // Lodash[Lodash &#x901A;&#x8FC7;&#x964D;&#x4F4E; array&#x3001;number&#x3001;objects&#x3001;string &#x7B49;&#x7B49;&#x7684;&#x4F7F;&#x7528;&#x96BE;&#x5EA6;&#x4ECE;&#x800C;&#x8BA9; JavaScript &#x53D8;&#x5F97;&#x66F4;&#x7B80;&#x5355;&#x3002;
  // Lodash &#x7684;&#x6A21;&#x5757;&#x5316;&#x65B9;&#x6CD5; &#x975E;&#x5E38;&#x9002;&#x7528;&#x4E8E;&#xFF1A;
  // &#x904D;&#x5386; array&#x3001;object &#x548C; string
  // &#x5BF9;&#x503C;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x548C;&#x68C0;&#x6D4B;&#x521B;&#x5EFA;&#x7B26;&#x5408;&#x529F;&#x80FD;&#x7684;&#x51FD;&#x6570; https://www.lodashjs.com/]&#xFF08;&#x76EE;&#x524D;&#x901A;&#x8FC7;&#x4E00;&#x4E2A; script &#x811A;&#x672C;&#x5F15;&#x5165;&#xFF09;&#x5BF9;&#x4E8E;&#x6267;&#x884C;&#x8FD9;&#x4E00;&#x884C;&#x662F;&#x5FC5;&#x9700;&#x7684;
  element.innerHTML = _.join([&apos;Hello&apos;, &apos;webpack&apos;], &apos; &apos;);
  return element;
}
document.body.appendChild(component());</code></pre><p>index.html</p><pre><code>&lt;!doctype html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;&#x8D77;&#x6B65;&lt;/title&gt;
    &lt;script src=&quot;https://unpkg.com/lodash@4.16.6&quot;&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;script src=&quot;./src/index.js&quot;&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre><p>package.json<br>&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#x4E2D;&#xFF0C;json&#x6587;&#x4EF6;&#x4E2D;&#x4E0D;&#x5141;&#x8BB8;&#x6709;&#x6CE8;&#x91CA;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x6CE8;&#x91CA;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x5B89;&#x88C5;&#x4E0D;&#x4E86;&#x4F9D;&#x8D56;</p><pre><code>{
  ...
  &quot;name&quot;: &quot;webpack&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  // &quot;main&quot;: &quot;index.js&quot;, // &#x5E76;&#x4E14;&#x79FB;&#x9664; main &#x5165;&#x53E3;
  &quot;private&quot;: true, // &#x4EE5;&#x4FBF;&#x786E;&#x4FDD;&#x6211;&#x4EEC;&#x5B89;&#x88C5;&#x5305;&#x662F;&#x79C1;&#x6709;&#x7684;(private) &#x8FD9;&#x53EF;&#x4EE5;&#x9632;&#x6B62;&#x610F;&#x5916;&#x53D1;&#x5E03;&#x4F60;&#x7684;&#x4EE3;&#x7801;
   ...
}</code></pre><p><strong>&#x603B;&#x7ED3;&#xFF1A;</strong>&#x901A;&#x8FC7;script&#x811A;&#x672C;&#x5F15;&#x5165;&#x4E09;&#x65B9;&#x8D44;&#x6E90;&#x4F1A;&#x5E26;&#x6765;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>&#x65E0;&#x6CD5;&#x7ACB;&#x5373;&#x4F53;&#x73B0;&#xFF0C;&#x811A;&#x672C;&#x7684;&#x6267;&#x884C;&#x4F9D;&#x8D56;&#x4E8E;&#x5916;&#x90E8;&#x6269;&#x5C55;&#x5E93;(external library)</li><li>&#x5982;&#x679C;&#x4F9D;&#x8D56;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x6216;&#x8005;&#x5F15;&#x5165;&#x987A;&#x5E8F;&#x9519;&#x8BEF;&#xFF0C;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5C06;&#x65E0;&#x6CD5;&#x6B63;&#x5E38;&#x8FD0;&#x884C;</li><li>&#x5982;&#x679C;&#x4F9D;&#x8D56;&#x88AB;&#x5F15;&#x5165;&#x4F46;&#x662F;&#x5E76;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5C06;&#x88AB;&#x8FEB;&#x4E0B;&#x8F7D;&#x65E0;&#x7528;&#x4EE3;&#x7801;</li></ul><p>&#x4F7F;&#x7528; webpack &#x6765;&#x7BA1;&#x7406;&#x8FD9;&#x4E9B;&#x811A;&#x672C;</p><h2>&#x521B;&#x5EFA;&#x4E00;&#x4E2A; bundle &#x6587;&#x4EF6;</h2><p>&#x8C03;&#x6574;&#x76EE;&#x5F55;&#x7ED3;&#x6784;</p><pre><code>webpack
|-/src &quot;&#x6E90;&quot;&#x4EE3;&#x7801;&#xFF0C;&#x7528;&#x4E8E;&#x4E66;&#x5199;&#x548C;&#x7F16;&#x8F91;&#x7684;&#x4EE3;&#x7801;
  |-index.js
|-/dist &quot;&#x5206;&#x53D1;&quot;&#x4EE3;&#x7801;&#x662F;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x4EA7;&#x751F;&#x7684;&#x4EE3;&#x7801;&#x6700;&#x5C0F;&#x5316;&#x548C;&#x4F18;&#x5316;&#x540E;&#x7684;&#x201C;&#x8F93;&#x51FA;&#x201D;&#x76EE;&#x5F55;&#xFF0C;&#x6700;&#x7EC8;&#x5C06;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x52A0;&#x8F7D;
  |-index.html
|-package.json</code></pre><p>&#x4E0D;&#x518D;&#x4F7F;&#x7528;script&#x5F15;&#x5165;&#x4E09;&#x65B9;&#x8D44;&#x6E90;&#xFF0C;&#x8981;&#x5728; index.js &#x4E2D;&#x6253;&#x5305; lodash &#x4F9D;&#x8D56;&#xFF0C;&#x5B89;&#x88C5;lodash</p><pre><code>npm install --save-dev lodash</code></pre><p>&#x4FEE;&#x6539;src/index.js&#x6587;&#x4EF6;</p><pre><code>// &#x4E0D;&#x518D;&#x4F7F;&#x7528;script&#x5F15;&#x5165;lodash &#x672C;&#x5730;&#x5DF2;&#x5B89;&#x88C5;loadash,&#x4F7F;&#x7528;import&#x5F15;&#x5165;lodash
import _ from &apos;lodash&apos;
function component () {
  var ele = document.createElement(&apos;div&apos;)
  element.innerHTML = _.join([&apos;Hello&apos;, &apos;webpack&apos;], &apos; &apos;);
  return element;
}
document.body.appendChild(component());</code></pre><p>&#x4FEE;&#x6539;dist/index.html&#x6587;&#x4EF6;</p><pre><code>&lt;!doctype html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;&#x8D77;&#x6B65;&lt;/title&gt;
    &lt;!-- &#x56E0;&#x4E3A;&#x73B0;&#x5728;&#x662F;&#x901A;&#x8FC7; import &#x5F15;&#x5165; lodash&#xFF0C;&#x6240;&#x4EE5;&#x5C06; lodash &lt;script&gt; &#x5220;&#x9664; --&gt;
    &lt;!-- &lt;script src=&quot;https://unpkg.com/lodash@4.16.6&quot;&gt;&lt;/script&gt; --&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;!-- &#x7136;&#x540E;&#x4FEE;&#x6539;&#x53E6;&#x4E00;&#x4E2A; &lt;script&gt; &#x6807;&#x7B7E;&#x6765;&#x52A0;&#x8F7D; bundle&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x539F;&#x59CB;&#x7684; /src &#x6587;&#x4EF6;--&gt;
    &lt;script src=&quot;main.js&quot;&gt;&lt;/script&gt;
    &lt;!-- &lt;script src=&quot;./src/index.js&quot;&gt;&lt;/script&gt; --&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre><p>&#x6267;&#x884C;npx webpack,&#x6784;&#x5EFA;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x6253;&#x5F00;index.html</p><h2>&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</h2><p>&#x65B0;&#x589E;webpack.config.js</p><pre><code>const path = require(&apos;path&apos;)
module.exports = {
  entry: &apos;./src/index.js&apos;, // &#x5165;&#x53E3;&#x6587;&#x4EF6;
  output: { // &#x6784;&#x5EFA;&#x540E;&#x7684;bundle.js&#x6587;&#x4EF6;&#x8F93;&#x51FA;&#x5230;dist&#x6587;&#x4EF6;&#x4E2D;
    filename: &apos;bundle.js&apos;,
    // _dirname&#x8868;&#x793A;&#x5F53;&#x524D;&#x6587;&#x4EF6;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;
    path: path.resolve(_dirname, &apos;dist&apos;)
  }
};</code></pre><p>&#x518D;&#x6B21;npx webpack --config webpack.config.js<br>&#x4F7F;&#x7528;cli&#xFF08;npx webpack&#xFF09;&#x6765;&#x8FD0;&#x884C;&#x672C;&#x5730;node_module/.bin/webpack&#x6587;&#x4EF6;,&#x53CD;&#x6B63;&#x6211;&#x662F;&#x4E00;&#x76F4;&#x6CA1;&#x6709;&#x6784;&#x5EFA;&#x6210;&#x529F;&#xFF0C;&#x53EF;&#x80FD;&#x662F;&#x672C;&#x5730;&#x73AF;&#x5883;&#x95EE;&#x9898;&#x3002;QAQ ===</p><h2>&#x4F7F;&#x7528;npm&#x811A;&#x672C;</h2><p>&#x592A;&#x597D;&#x4E86;&#xFF0C;&#x8FD8;&#x597D;&#x8FD8;&#x6709;&#x53E6;&#x5916;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;555&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5FEB;&#x6377;&#x65B9;&#x5F0F;&#x3002;&#x5728; package.json &#x6DFB;&#x52A0;&#x4E00;&#x4E2A; npm &#x811A;&#x672C;(npm script)<br>package.json &#x3010;package.json&#x6587;&#x4EF6;&#x4E2D;&#x4E0D;&#x80FD;&#x6709;&#x6CE8;&#x91CA;&#x3011;</p><pre><code>{
    ...
    &quot;scripts&quot;: {
        &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
        &quot;build&quot;: &quot;webpack&quot; // &#x6DFB;&#x52A0;&#x4E00;&#x4E2A; npm &#x811A;&#x672C;(npm script)
     },
    ...
}</code></pre><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;npm run build &#x547D;&#x4EE4;&#xFF0C;&#x6765;&#x4EE3;&#x66FF;npx&#x547D;&#x4EE4;&#xFF0C;&#x8FD9;&#x91CC;&#x9047;&#x5230;&#x4E00;&#x70B9;&#x95EE;&#x9898;QAQ</p><blockquote>&#x5728;&#x6267;&#x884C;cnpm run build&#x603B;&#x662F;&#x4F1A;&#x51FA;&#x73B0;One CLI for webpack must be installed. These are recommended choices......</blockquote><p><span class="img-wrap"><img data-src="/img/bVbf943?w=580&amp;h=186" src="https://static.alili.tech/img/bVbf943?w=580&amp;h=186" alt="clipboard.png" title="clipboard.png"></span></p><p>&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#xFF1A;</p><ol><li><p>&#x5168;&#x5C40;&#x5B89;&#x88C5;webpack-cli</p><pre><code>cnpm i webpack-cli -g</code></pre></li><li><p>&#x5728;&#x9879;&#x76EE;&#x91CC;&#x518D;&#x505A;&#x4E00;&#x4E2A;&#x672C;&#x5730;&#x5B89;&#x88C5;</p><pre><code>cnpm i webpack -D</code></pre></li><li>&#x8FD0;&#x884C;cnpm run build &#x8C22;&#x5929;&#x8C22;&#x5730;&#xFF0C;&#x7EC8;&#x4E8E;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x6784;&#x5EFA;&#x6210;&#x529F;&#x4E86;<p><span class="img-wrap"><img data-src="/img/bVbf96p?w=570&amp;h=293" src="https://static.alili.tech/img/bVbf96p?w=570&amp;h=293" alt="clipboard.png" title="clipboard.png"></span></p><p>&#x67E5;&#x770B;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#xFF0C;&#x4F1A;&#x8F93;&#x51FA;&#x4E00;&#x4E2A;&#x538B;&#x7F29;&#x4E86;&#x7684;bundle.js&#x6587;&#x4EF6;&#x5230;dist&#x6587;&#x4EF6;&#x5939;&#x4E2D;</p><p><span class="img-wrap"><img data-src="/img/bVbf97M?w=256&amp;h=187" src="https://static.alili.tech/img/bVbf97M?w=256&amp;h=187" alt="clipboard.png" title="clipboard.png"></span></p></li></ol><p>&#x5230;&#x6B64;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x57FA;&#x672C;&#x7684;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#xFF0C;&#x4F60;&#x5E94;&#x8BE5;&#x79FB;&#x81F3;&#x4E0B;&#x4E00;&#x7AE0;&#x8282;&#x7684;&#x7BA1;&#x7406;&#x8D44;&#x6E90;&#x6307;&#x5357;&#xFF0C;&#x4EE5;&#x4E86;&#x89E3;&#x5982;&#x4F55;&#x901A;&#x8FC7; webpack &#x6765;&#x7BA1;&#x7406;&#x8D44;&#x6E90;&#xFF0C;&#x4F8B;&#x5982;&#x56FE;&#x7247;&#x3001;&#x5B57;&#x4F53;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack4.17.1起步

## 原文链接
[https://segmentfault.com/a/1190000016199467](https://segmentfault.com/a/1190000016199467)

