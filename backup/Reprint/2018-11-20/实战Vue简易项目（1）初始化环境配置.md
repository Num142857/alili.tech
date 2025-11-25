---
title: '实战Vue简易项目（1）初始化环境配置' 
date: 2018-11-20 2:30:10
hidden: true
slug: d3psf4ls4v
categories: [reprint]
---

{{< raw >}}
<p>&#x672C;&#x7AE0;&#x4EE5;&#x4E0B;&#x547D;&#x4EE4;&#x90FD;&#x662F;<strong>&#x5728;<code>cmd</code>&#x547D;&#x4EE4;&#x884C;</strong>&#x4E2D;&#x8FDB;&#x884C;&#x7684;&#x3002;</p><h2>&#x5B89;&#x88C5;&#x547D;&#x4EE4;&#x884C;</h2><p><code>npm i -g vue-cli</code></p><p>&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x8F93;&#x5165;<code>vue -V</code>&#x8FD4;&#x56DE;&#x7248;&#x672C;&#x53F7;&#xFF0C;&#x5373;&#x5B89;&#x88C5;&#x6210;&#x529F;&#xFF1B;</p><h2>&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;</h2><h3>&#x5207;&#x6362;&#x5230;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x4E0B;</h3><p>&#x9879;&#x76EE;&#x76EE;&#x5F55;&#xFF0C;&#x5373;&#x9879;&#x76EE;&#x6240;&#x5728;&#x76EE;&#x5F55;&#x3002;</p><p>&#x76EE;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x6CA1;&#x6709;&#x521B;&#x5EFA;&#x9879;&#x76EE;&#xFF0C;&#x8FDB;&#x5165; &#x9884;&#x671F;&#x9879;&#x76EE;&#x76EE;&#x5F55; &#x7684;&#x4E0A;&#x4E00;&#x7EA7;&#x6587;&#x4EF6;&#x76EE;&#x5F55;&#x4E0B;&#x5373;&#x53EF;&#x3002;</p><p>&#x672C;&#x6587;&#x4EE5;&#x4E2A;&#x4EBA;&#x7535;&#x8111;&#x76EE;&#x5F55;&#x6F14;&#x4E60;<code>cd /d e:/tutors/</code>&#xFF0C;&#x8BF7;&#x81EA;&#x52A8;&#x5BF9;&#x5E94;&#x81EA;&#x5DF1;&#x7684;&#x5B66;&#x4E60;&#x6240;&#x7528;&#x8DEF;&#x5F84;&#x3002;</p><h3>&#x4F7F;&#x7528;&#x811A;&#x624B;&#x67B6;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;</h3><p><code>vue init webpack vue</code>&#x6700;&#x540E;&#x4E00;&#x4E2A;<code>vue</code>&#x4E3A;&#x9879;&#x76EE;&#x540D;&#x79F0;&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x5176;&#x5B83;&#x540D;&#x79F0;&#xFF1A;<code>vue init webpack aaa</code>&#x3002;</p><p>&#x521D;&#x59CB;&#x5316;&#x8FC7;&#x7A0B;&#x4F1A;&#x4E3A;&#x60A8;&#x5B9A;&#x5236;&#x521D;&#x59CB;&#x5316;&#x73AF;&#x5883;,&#x4EE5;&#x4E0B;&#x662F;&#x6211;&#x7684;&#x5B9A;&#x5236;&#xFF1A;</p><pre><code>? Project name vue  //&#x9879;&#x76EE;&#x540D;&#x79F0;
? Project description A Vue.js project //&#x9879;&#x76EE;&#x63CF;&#x8FF0;
? Author //&#x4F5C;&#x8005;
? Vue build standalone
? Install vue-router? Yes  //&#x662F;&#x5426;&#x9700;&#x8981;vue-router
? Use ESLint to lint your code? No  //&#x662F;&#x5426;&#x9700;&#x8981;ESLint&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x98CE;&#x683C;&#x68C0;&#x6D4B;
? Set up unit tests No  //&#x662F;&#x5426;&#x9700;&#x8981;&#x5355;&#x5143;&#x6D4B;&#x8BD5;
? Setup e2e tests with Nightwatch? No  //&#x662F;&#x5426;&#x9700;&#x8981;&#x7AEF;&#x5230;&#x7AEF;&#x6D4B;&#x8BD5;&#xFF1B;
? Should we run `npm install` for you after the project has been created? (recommended) npm  //&#x9009;&#x62E9;&#x5B89;&#x88C5;&#x9879;&#x76EE;&#x4F9D;&#x8D56;&#x7684;&#x5DE5;&#x5177;</code></pre><p>&#x64CD;&#x4F5C;&#x90FD;&#x662F;<code>yes || no</code>&#xFF0C;&#x7136;&#x540E;&#x56DE;&#x8F66;&#x3002;<br>&#x5F53;&#x7136;&#xFF0C;&#x9ED8;&#x8BA4;&#x9009;&#x62E9;<code>yes</code>&#xFF0C;&#x4E0D;&#x5FC5;&#x8F93;&#x5165;&#xFF0C;&#x76F4;&#x63A5;&#x56DE;&#x8F66;&#x3002;<br>&#x9009;&#x62E9;<code>no</code>&#x7684;&#x8BDD;&#xFF0C;&#x9700;&#x8981;&#x8F93;&#x5165;&#xFF0C;&#x7136;&#x540E;&#x56DE;&#x8F66;&#x3002;</p><p>&#x521D;&#x59CB;&#x5316;&#x5B8C;&#x6210;&#x7684;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbetlt?w=618&amp;h=163" src="https://static.alili.tech/img/bVbetlt?w=618&amp;h=163" alt="&#x521D;&#x59CB;&#x5316;&#x7ED3;&#x679C;" title="&#x521D;&#x59CB;&#x5316;&#x7ED3;&#x679C;"></span></p><h2>&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#x7ED3;&#x6784;</h2><p><code>dir vue</code>&#x67E5;&#x770B;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF1A;</p><pre><code>e:\tutors&gt;dir vue
 &#x9A71;&#x52A8;&#x5668; E &#x4E2D;&#x7684;&#x5377;&#x662F; &#x6587;&#x6863;
 &#x5377;&#x7684;&#x5E8F;&#x5217;&#x53F7;&#x662F; B4A1-7185

 e:\tutors\vue &#x7684;&#x76EE;&#x5F55;

2018/07/29  09:32    &lt;DIR&gt;          .
2018/07/29  09:32    &lt;DIR&gt;          ..
2018/07/29  09:31               230 .babelrc  //babel&#x914D;&#x7F6E;&#x6587;&#x4EF6;
2018/07/29  09:31               147 .editorconfig  //&#x7F16;&#x8F91;&#x5668;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
2018/07/29  09:31               154 .gitignore  //Git&#x7BA1;&#x7406;&#x5FFD;&#x7565;&#x6587;&#x4EF6;&#x914D;&#x7F6E;
2018/07/29  09:31               246 .postcssrc.js  //postcss&#x914D;&#x7F6E;&#x6587;&#x4EF6;
2018/07/29  09:31    &lt;DIR&gt;          build  //&#x751F;&#x4EA7;&#x3001;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x914D;&#x7F6E;&#x4EA7;&#x51FA;&#x6587;&#x4EF6;&#xFF1B;
2018/07/29  09:31    &lt;DIR&gt;          config  // &#x751F;&#x4EA7;&#x3001;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x914D;&#x7F6E;&#x57FA;&#x7840;&#x6587;&#x4EF6;&#xFF1B;
2018/07/29  09:31               265 index.html  //HTML&#x6A21;&#x677F;&#xFF1B;
2018/07/29  09:32    &lt;DIR&gt;          node_modules  //NPM&#x4F9D;&#x8D56;&#x5305;&#xFF1B;
2018/07/29  09:32           371,973 package-lock.json  //&#x9879;&#x76EE;&#x4F9D;&#x8D56;&#x7248;&#x672C;&#x7B49;&#x4FE1;&#x606F;&#x6587;&#x4EF6;
2018/07/29  09:31             1,733 package.json  //&#x9879;&#x76EE;&#x4F9D;&#x8D56;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF1B;
2018/07/29  09:31               460 README.md  //Markdown&#x8BF4;&#x660E;&#x6587;&#x6863;&#xFF1B;
2018/07/29  09:31    &lt;DIR&gt;          src  //&#x9879;&#x76EE;&#x6E90;&#x6587;&#x4EF6;&#xFF08;&#x5F00;&#x53D1;&#x6240;&#x5728;&#xFF09;
2018/07/29  09:31    &lt;DIR&gt;          static  //&#x6211;&#x6CA1;&#x7528;&#x8BE5;&#x6587;&#x4EF6;...
               8 &#x4E2A;&#x6587;&#x4EF6;        375,208 &#x5B57;&#x8282;
               7 &#x4E2A;&#x76EE;&#x5F55; 32,987,131,904 &#x53EF;&#x7528;&#x5B57;&#x8282;</code></pre><h2>&#x8FD0;&#x884C;&#x9879;&#x76EE;</h2><p><code>cd vue</code>&#x5207;&#x6362;&#x5230;&#x81EA;&#x5DF1;&#x7684;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;<code>npm run dev</code>&#x53EF;&#x4EE5;&#x5C06;&#x8BE5;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#x8FD0;&#x884C;&#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x3002;</p><p>&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbetlR?w=502&amp;h=544" src="https://static.alili.tech/img/bVbetlR?w=502&amp;h=544" alt="&#x8FD0;&#x884C;&#x7ED3;&#x679C;" title="&#x8FD0;&#x884C;&#x7ED3;&#x679C;"></span></p><h2>&#x7AE0;&#x8282;&#x56DE;&#x987E;</h2><ul><li>&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#x6240;&#x9700;&#x8981;&#x7684;&#x4F9D;&#x8D56;&#x6709;&#x54EA;&#x4E9B;&#xFF1F;</li><li>&#x5982;&#x4F55;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#xFF1F;</li><li>&#x5982;&#x4F55;&#x8FD0;&#x884C;&#x9879;&#x76EE;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x7B80;&#x4FBF;&#x7684;&#x8FD0;&#x884C;&#xFF1F;</li></ul><h2>&#x601D;&#x8003;</h2><ul><li>&#x5982;&#x679C;&#x4F7F;&#x7528;CSS&#x9884;&#x5904;&#x7406;&#xFF0C;&#x9700;&#x8981;&#x505A;&#x4EC0;&#x4E48;&#xFF0C;&#x8FD8;&#x662F;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x9700;&#x8981;&#x505A;&#x5C31;&#x53EF;&#x4EE5;&#x5462;&#xFF1F;</li><li>&#x5982;&#x679C;&#x60F3;&#x5728;&#x5C40;&#x57DF;&#x7F51;&#x5176;&#x5B83;&#x7AEF;&#x8BBF;&#x95EE;&#xFF0C;&#x9700;&#x8981;&#x505A;&#x4EC0;&#x4E48;&#xFF0C;&#x8FD8;&#x662F;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x9700;&#x8981;&#x505A;&#x5C31;&#x53EF;&#x4EE5;&#x5462;&#xFF1F;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实战Vue简易项目（1）初始化环境配置

## 原文链接
[https://segmentfault.com/a/1190000015803942](https://segmentfault.com/a/1190000015803942)

