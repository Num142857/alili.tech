---
title: '用shelljs实现前端部署自动化' 
date: 2018-11-16 2:30:06
hidden: true
slug: nrbjnis3z8e
categories: [reprint]
---

{{< raw >}}
<h1>&#x4E00;&#x3001;&#x573A;&#x666F;</h1><p>&#x5728;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x4F60;&#x80AF;&#x5B9A;&#x7ECF;&#x5E38;&#x4F7F;&#x7528;&#x5230;&#x4EE5;&#x4E0B;&#x7B49;&#x547D;&#x4EE4;&#xFF1A;</p><pre><code>npm run build
git add .
git commit -m &apos;commit&apos;
git push </code></pre><p>&#x672C;&#x4EBA;&#x5728;&#x7528;<code>vue-cli</code>&#x5199;&#x6211;&#x7684;&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;&#x65F6;&#xFF0C;&#x5C06;&#x5176;&#x90E8;&#x7F72;&#x5230;<code>coding pages</code>&#x4E0A;&#x3002;&#x4E0D;&#x7528;<code>github pages</code>&#x7684;&#x539F;&#x56E0;&#x7EAF;&#x7CB9;&#x662F;&#x56E0;&#x4E3A;&#x6162;&#x3002;&#x3002;&#x3002;&#x6BCF;&#x4E00;&#x6B21;&#x90E8;&#x7F72;&#xFF0C;&#x90FD;&#x8981;&#x5C06;&#x4E0A;&#x9762;&#x7684;&#x547D;&#x4EE4;&#x6572;&#x4E00;&#x904D;&#xFF0C;&#x5B9E;&#x5728;&#x4EE4;&#x6211;&#x5F88;&#x75DB;&#x82E6;&#x3002;&#x5982;&#x679C;&#x80FD;&#x7528;&#x4E00;&#x6761;&#x547D;&#x4EE4;&#x6267;&#x884C;&#x4EE5;&#x4E0A;&#x6240;&#x6709;&#x4EFB;&#x52A1;&#xFF0C;&#x90A3;&#x5C31;&#x723D;&#x591A;&#x4E86;&#x3002;</p><p>&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x8BF4;&#x5E72;&#x5C31;&#x5E72;&#x3002;</p><h1>&#x4E8C;&#x3001;<a href="https://github.com/shelljs/shelljs" rel="nofollow noreferrer">Shelljs</a></h1><p>&#x8FD9;&#x4E2A;&#x5E93;&#x80FD;&#x591F;&#x8BA9;&#x6211;&#x4EEC;&#x5728;<code>js</code>&#x6587;&#x4EF6;&#x4E2D;&#x6267;&#x884C;shell&#x547D;&#x4EE4;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x770B;<a href="https://github.com/shelljs/shelljs" rel="nofollow noreferrer">&#x6587;&#x6863;</a>&#x3002;</p><h3>&#x5B89;&#x88C5;</h3><pre><code>npm install [-g] shelljs </code></pre><p>&#x6709;&#x4E24;&#x79CD;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF0C;&#x4E00;&#x79CD;&#x662F;&#x5168;&#x5C40;&#x6A21;&#x5F0F;(&#x5BF9;&#x5E94;&#x5168;&#x5C40;&#x5B89;&#x88C5;),&#x4E00;&#x79CD;&#x662F;&#x5C40;&#x90E8;&#x6A21;&#x5F0F;&#x3002;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4F7F;&#x7528;&#x6848;&#x4F8B;&#x5C31;&#x77E5;&#x9053;&#x4E24;&#x8005;&#x533A;&#x522B;&#x3002;</p><h1>&#x4E09;&#x3001;&#x4F7F;&#x7528;</h1><p>&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;&#x6587;&#x4EF6;<code>shell.js</code>&#xFF0C;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>//&#x5C40;&#x90E8;&#x6A21;&#x5F0F;
var shell = require(&apos;shelljs&apos;);
//&#x5168;&#x5C40;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x7528;shell&#x5F00;&#x5934;&#x4E86;&#x3002;
//require(&apos;shelljs/global&apos;);

if (shell.exec(&apos;npm run build&apos;).code !== 0) {//&#x6267;&#x884C;npm run build &#x547D;&#x4EE4;
  shell.echo(&apos;Error: Git commit failed&apos;);
  shell.exit(1);
}

//&#x7531;&#x4E8E;&#x6211;&#x7684;&#x7528;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x4ED3;&#x5E93;&#x5B58;&#x653E;dist&#x76EE;&#x5F55;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x8981;&#x5C06;&#x6587;&#x4EF6;&#x589E;&#x91CF;&#x590D;&#x5236;&#x5230;&#x76EE;&#x6807;&#x76EE;&#x5F55;&#x3002;&#x5E76;&#x5207;&#x6362;&#x5230;&#x5BF9;&#x5E94;&#x76EE;&#x5F55;&#x3002;
shell.cp (&apos;-r&apos;, &apos;./dist/*&apos;, &apos;../../Rychou&apos;);
shell.cd(&apos;../../Rychou&apos;);

shell.exec(&apos;git add .&apos;);
shell.exec(&quot;git commit -m &apos;autocommit&apos;&quot;)
shell.exec(&apos;git push&apos;)
</code></pre><p>&#x8FD9;&#x65F6;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x6267;&#x884C;<code>node shell.js</code>&#x5C31;&#x53EF;&#x4EE5;&#x4E86;</p><p>&#x8FD9;&#x91CC;&#x53EA;&#x662F;&#x6700;&#x7B80;&#x5355;&#x7684;&#x4F7F;&#x7528;&#x6848;&#x4F8B;&#x3002;</p><h1>&#x56DB;&#x3001;&#x518D;&#x8BA9;&#x5B83;&#x66F4;&#x65B9;&#x4FBF;&#x4E9B;</h1><p>&#x5728;<code>package.json</code>&#x4E2D;&#x52A0;&#x5165;&#xFF1A;</p><pre><code>&quot;script&quot;:{
+    &quot;push&quot;:&quot;node ./shell.js&quot;
}</code></pre><p>&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x6267;&#x884C;<code>npm run push</code>&#x5C31;&#x641E;&#x5B9A;&#x4E86;&#x3002;</p><blockquote>&#x53C2;&#x8003;&#x94FE;&#x63A5;&#xFF1A;<a href="https://github.com/shelljs/shelljs" rel="nofollow noreferrer">Shelljs</a><br><a href="http://www.rychou.xyz/#/article/68" rel="nofollow noreferrer">&#x539F;&#x6587;&#x94FE;&#x63A5;</a><br>&#x6B22;&#x8FCE;&#x5173;&#x6CE8;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x5F00;&#x6E90;&#x5B66;&#x9662;<br><span class="img-wrap"><img data-src="/img/bVbfylG?w=351&amp;h=266" src="https://static.alili.tech/img/bVbfylG?w=351&amp;h=266" alt="bVbfxKF" title="bVbfxKF"></span></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用shelljs实现前端部署自动化

## 原文链接
[https://segmentfault.com/a/1190000016054416](https://segmentfault.com/a/1190000016054416)

