---
title: 深入认识vue-cli：能做的不仅仅是初始化vue工程
reprint: true
categories: reprint
abbrlink: fdf05b45
date: 2018-10-29 02:30:09
---

{{% raw %}}
<p>&#x76F8;&#x4FE1;&#x5BF9;&#x4E8E;&#x5927;&#x90E8;&#x5206;&#x4F7F;&#x7528;&#x8FC7;VueJS&#x7684;&#x540C;&#x5B66;&#x6765;&#x8BF4;&#xFF0C;<code>vue-cli</code>&#x662F;&#x4ED6;&#x4EEC;&#x975E;&#x5E38;&#x719F;&#x6089;&#x7684;&#x4E00;&#x4E2A;&#x5DE5;&#x5177;&#x3002;&#x501F;&#x52A9;<code>vue-cli</code>&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x7684;&#x95EE;&#x7B54;&#x5F62;&#x5F0F;&#xFF0C;&#x65B9;&#x4FBF;&#x5730;&#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A;vue&#x5DE5;&#x7A0B;&#xFF0C;&#x5B8C;&#x5168;&#x4E0D;&#x9700;&#x8981;&#x62C5;&#x5FC3;&#x7E41;&#x590D;&#x7684;webpack&#x3001;eslint&#x914D;&#x7F6E;&#x7B49;&#x7B49;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;&#x4ECD;&#x7136;&#x6709;&#x8BB8;&#x591A;&#x540C;&#x5B66;&#x6CA1;&#x6709;&#x641E;&#x6E05;&#x695A;<code>vue-cli</code>&#x548C;<code>vue&#x5DE5;&#x7A0B;</code>&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x5BFC;&#x81F4;&#x6CA1;&#x6709;&#x5145;&#x5206;&#x53D1;&#x6325;<code>vue-cli</code>&#x7684;&#x529F;&#x80FD;&#x3002;&#x5728;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#xFF0C;&#x6211;&#x5C06;&#x4ECE;&#x5E95;&#x5C42;&#x539F;&#x7406;&#x5F00;&#x59CB;&#x5E76;&#x7ED3;&#x5408;&#x51E0;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x544A;&#x8BC9;&#x5927;&#x5BB6;<code>vue-cli</code>&#x8FD8;&#x80FD;&#x8FD9;&#x6837;&#x7528;&#x3002;</p><h1 id="articleHeader0">&#x4EC0;&#x4E48;&#x662F;vue-cli</h1><p>&#x5F15;&#x7528;vue-cli&#x5B98;&#x65B9;&#x6587;&#x6863;&#x7684;&#x4E00;&#x53E5;&#x8BDD;&#xFF1A;</p><blockquote><p>A simple CLI for scaffolding Vue.js projects.<br>&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Vue.js&#x5DE5;&#x7A0B;&#x547D;&#x4EE4;&#x884C;&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;&#x3002;</p></blockquote><p>&#x5728;&#x5168;&#x5C40;&#x5B89;&#x88C5;vue-cli&#x4E4B;&#x540E;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E00;&#x6761;&#x547D;&#x4EE4;&#x521D;&#x59CB;&#x5316;&#x6211;&#x4EEC;&#x7684;vue&#x5DE5;&#x7A0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init &lt;template-name&gt; &lt;project-name&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">vue init &lt;template-name&gt; &lt;project-name&gt;</code></pre><p>&#x63A5;&#x4E0B;&#x6765;vue-cli&#x5C31;&#x4F1A;&#x6309;&#x7167;&#x8FD9;&#x4E2A;<code>&lt;template-name&gt;</code>&#x6A21;&#x677F;&#x5185;&#x90E8;&#x7684;&#x8BBE;&#x7F6E;&#xFF0C;&#x629B;&#x51FA;&#x51E0;&#x4E2A;&#x95EE;&#x7B54;&#x9009;&#x9879;&#x3002;&#x5728;&#x56DE;&#x7B54;&#x5B8C;&#x95EE;&#x7B54;&#x9009;&#x9879;&#x4EE5;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x7684;vue&#x5DE5;&#x7A0B;&#x76EE;&#x5F55;&#x5C31;&#x5DF2;&#x7ECF;&#x751F;&#x6210;&#x597D;&#x4E86;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x53EA;&#x8981;&#x628A;&#x4F9D;&#x8D56;&#x5B89;&#x88C5;&#x5B8C;&#xFF0C;&#x76F4;&#x63A5;&#x5C31;&#x53EF;&#x4EE5;&#x8DD1;&#x8D77;&#x6765;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x975E;&#x5E38;&#x65B9;&#x4FBF;&#x5462;&#xFF1F;</p><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x8981;&#x770B;&#x770B;&#xFF0C;&#x8FD9;&#x4E00;&#x6761;&#x547D;&#x4EE4;&#x7684;&#x80CC;&#x540E;&#xFF0C;&#x7A76;&#x7ADF;&#x53D1;&#x751F;&#x4E86;&#x4E00;&#x4E9B;&#x4EC0;&#x4E48;&#x4E8B;&#x3002;</p><h1 id="articleHeader1">vue-cli&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#x7684;&#x539F;&#x7406;</h1><p>&#x4ECE;<a href="https://github.com/vuejs/vue-cli/blob/master/README.md" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#xFF0C;vue-cli&#x4F7F;&#x7528;&#x4E86;<a href="https://github.com/flipxfx/download-git-repo" rel="nofollow noreferrer" target="_blank">download-git-repo</a>&#x8FD9;&#x4E2A;&#x5DE5;&#x5177;&#x53BB;&#x4E0B;&#x8F7D;&#x8FDC;&#x7AEF;git&#x4ED3;&#x5E93;&#x91CC;&#x9762;&#x7684;&#x5DE5;&#x7A0B;&#xFF0C;&#x5982;&#x679C;&#x52A0;&#x4E0A;&#x4E86;<code>--clone</code>&#x53C2;&#x6570;&#xFF0C;&#x5219;&#x4F1A;&#x5728;&#x5185;&#x90E8;&#x8FD0;&#x884C;<code>git clone</code>&#xFF0C;&#x901A;&#x8FC7;&#x514B;&#x9686;&#x7684;&#x65B9;&#x5F0F;&#x628A;&#x8FDC;&#x7AEF;git&#x4ED3;&#x5E93;&#x62C9;&#x53D6;&#x5230;&#x672C;&#x5730;&#x3002;&#x660E;&#x767D;&#x8FD9;&#x4E00;&#x70B9;&#x81F3;&#x5173;&#x91CD;&#x8981;&#xFF1A;</p><p><strong>vue-cli&#x5E76;&#x975E;&#x4ECE;&#x65E0;&#x5230;&#x6709;&#x5730;&#x51ED;&#x7A7A;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#xFF0C;&#x800C;&#x662F;&#x901A;&#x8FC7;&#x4E0B;&#x8F7D;/&#x62C9;&#x53D6;&#x5DF2;&#x6709;&#x7684;&#x5DE5;&#x7A0B;&#x5230;&#x672C;&#x5730;&#xFF0C;&#x5B8C;&#x6210;&#x751F;&#x6210;&#x9879;&#x76EE;&#x7684;&#x5DE5;&#x4F5C;</strong>&#x3002;</p><p>&#x800C;&#x8FD9;&#x4E2A;&#x201C;&#x5DF2;&#x6709;&#x7684;&#x5DE5;&#x7A0B;&#x201D;&#xFF0C;&#x5C31;&#x662F;&#x6240;&#x8C13;&#x7684;&#x201C;&#x6A21;&#x677F;&#xFF08;template&#xFF09;&#x201D;&#x3002;</p><p>&#x5F53;&#x7136;&#xFF0C;vue-cli&#x53EF;&#x4E0D;&#x53EA;&#x662F;&#x628A;&#x6A21;&#x677F;&#x62C9;&#x53D6;&#x5230;&#x672C;&#x5730;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#xFF0C;&#x5B83;&#x8FD8;&#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x95EE;&#x7B54;&#x7684;&#x5F62;&#x5F0F;&#x5BF9;&#x6A21;&#x677F;&#x8FDB;&#x884C;&#x4E2A;&#x6027;&#x5316;&#x914D;&#x7F6E;&#xFF0C;&#x8FD9;&#x4E2A;&#x53C8;&#x662F;&#x5982;&#x4F55;&#x505A;&#x5230;&#x7684;&#x5462;&#xFF1F;</p><p>vue-cli&#x4F7F;&#x7528;&#x4E86;<a href="https://github.com/SBoudrias/Inquirer.js" rel="nofollow noreferrer" target="_blank">inquirer.js</a>&#x5B9E;&#x73B0;&#x4E86;&#x201C;&#x95EE;&#x7B54;&#x73AF;&#x8282;&#x201D;&#xFF0C;&#x7B80;&#x5355;&#x6765;&#x8BF4;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x51C6;&#x5907;&#x51E0;&#x4E2A;&#x95EE;&#x9898;

const questions = [
  {
    type: &apos;input&apos;,
    name: &apos;name&apos;,
    message: &apos;What&apos;s your name?&apos;
  },
  {
    type: &apos;input&apos;,
    name: &apos;age&apos;,
    message: &apos;How old are you?&apos;,
  }
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x51C6;&#x5907;&#x51E0;&#x4E2A;&#x95EE;&#x9898;</span>

<span class="hljs-keyword">const</span> questions = [
  {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;input&apos;</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;name&apos;</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;What&apos;</span>s your name?<span class="hljs-string">&apos;
  },
  {
    type: &apos;</span>input<span class="hljs-string">&apos;,
    name: &apos;</span>age<span class="hljs-string">&apos;,
    message: &apos;</span>How old are you?<span class="hljs-string">&apos;,
  }
]</span></code></pre><p>&#x7136;&#x540E;&#x628A;&#x8FD9;&#x6BB5;&#x95EE;&#x9898;&#x4F20;&#x7ED9;inquirer.js&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="inquirer.prompt(questions).then(({ name, age }) =&gt; {
  console.log(`My name is ${name}, and I&apos;m ${age} years old`)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">inquirer.prompt(questions).then(<span class="hljs-function">(<span class="hljs-params">{ name, age }</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`My name is <span class="hljs-subst">${name}</span>, and I&apos;m <span class="hljs-subst">${age}</span> years old`</span>)
})</code></pre><p>&#x5728;&#x8FD0;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;vue-cli&#x4F1A;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x91CC;&#x9762;&#x628A;<code>What&apos;s your name?</code>&#x548C;<code>How old are you?</code>&#x8FD9;&#x4E24;&#x4E2A;&#x95EE;&#x9898;&#x76F8;&#x7EE7;&#x629B;&#x51FA;&#xFF0C;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x8F93;&#x5165;&#xFF0C;&#x628A;&#x8F93;&#x5165;&#x8D4B;&#x503C;&#x7ED9;<code>name</code>&#x548C;<code>age</code>&#x53D8;&#x91CF;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x80FD;&#x591F;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x7684;&#x8F93;&#x5165;&#x4FE1;&#x606F;&#x4E86;&#x3002;&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x5F15;&#x51FA;&#x4E0B;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x4E9B;&#x7528;&#x6237;&#x8F93;&#x5165;&#xFF0C;&#x662F;&#x5982;&#x4F55;&#x8DDF;&#x6A21;&#x677F;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x5173;&#x8054;&#x8D77;&#x6765;&#x7684;&#x5462;&#xFF1F;</p><p>&#x6211;&#x4EEC;&#x6253;&#x5F00;&#x4E00;&#x4E2A;vue-cli&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x6BD4;&#x5982;<a href="https://github.com/vuejs-templates/webpack-simple/blob/master/template/README.md" rel="nofollow noreferrer" target="_blank">webpack-simple&#x91CC;&#x9762;&#x7684;README.md</a>&#xFF0C;&#x5B83;&#x957F;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# {{ name }}

&gt; {{ description }}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="markdown hljs"><code class="markdown"><span class="hljs-section"># {{ name }}</span>

<span class="hljs-quote">&gt; {{ description }}</span></code></pre><p>&#x4E0A;&#x9762;&#x4F7F;&#x7528;&#x53CC;&#x62EC;&#x53F7;&#x5305;&#x88F9;&#x8D77;&#x6765;&#x7684;&#xFF0C;&#x6700;&#x7EC8;&#x4F1A;&#x6839;&#x636E;&#x7528;&#x6237;&#x7684;&#x8F93;&#x5165;&#x800C;&#x66F4;&#x6539;&#x4E3A;&#x5177;&#x4F53;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x662F;&#x4E0D;&#x662F;&#x89C9;&#x5F97;&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x5F88;&#x719F;&#x6089;&#xFF1F;&#x5176;&#x5B9E;&#x5C31;&#x662F;<a href="http://handlebarsjs.com/" rel="nofollow noreferrer" target="_blank">Handlebars</a>&#x7684;&#x6A21;&#x677F;&#x8BED;&#x6CD5;&#x3002;</p><p>&#x4EE5;&#x8FD9;&#x4E2A;README.md&#x6587;&#x4EF6;&#x4E3A;&#x4F8B;&#xFF0C;&#x5728;vue-cli&#x8FD0;&#x884C;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x4F1A;&#x9996;&#x5148;&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&#x653E;&#x5728;&#x5185;&#x5B58;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;<code>inquirer.js</code>&#x83B7;&#x53D6;&#x7528;&#x6237;&#x8F93;&#x5165;&#xFF0C;&#x628A;&#x8F93;&#x5165;&#x7684;&#x503C;&#x66FF;&#x6362;&#x5230;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x91CC;&#x9762;&#xFF0C;&#x6700;&#x540E;&#x901A;&#x8FC7;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x540D;&#x53EB;<a href="https://github.com/segmentio/metalsmith" rel="nofollow noreferrer" target="_blank">Metalsmith</a>&#x7684;&#x5DE5;&#x5177;&#xFF0C;&#x628A;&#x66FF;&#x6362;&#x597D;&#x7684;&#x5185;&#x5BB9;&#x8F93;&#x51FA;&#x4E3A;&#x6587;&#x4EF6;&#xFF0C;&#x4E5F;&#x5C31;&#x751F;&#x6210;&#x4E86;&#x5177;&#x6709;&#x4E2A;&#x6027;&#x5316;&#x5185;&#x5BB9;&#x7684;README.md&#x6587;&#x4EF6;&#x4E86;&#x3002;</p><p>&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#x5E76;&#x4E0D;&#x590D;&#x6742;&#xFF0C;&#x5728;&#x660E;&#x767D;&#x8FD9;&#x4E9B;&#x539F;&#x7406;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x80FD;&#x66F4;&#x6DF1;&#x5165;&#x5730;&#x4F7F;&#x7528;vue-cli&#x4E86;&#x3002;</p><h1 id="articleHeader2">Javascript&#x4E0E;Java&#xFF0C;Vue-cli&#x4E0E;Vue</h1><p>&#x867D;&#x7136;&#x8FD9;&#x4E48;&#x7C7B;&#x6BD4;&#x4E0D;&#x592A;&#x51C6;&#x786E;&#xFF0C;&#x4F46;&#x6211;&#x60F3;&#x5927;&#x5BB6;&#x4E5F;&#x5E94;&#x8BE5;&#x80FD;&#x660E;&#x767D;&#x6211;&#x7684;&#x610F;&#x601D;&#x3002;</p><p>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#xFF0C;&#x5C31;&#x662F;vue-cli&#x4E0D;&#x4EC5;&#x4EC5;&#x80FD;&#x521D;&#x59CB;&#x5316;vue&#x5DE5;&#x7A0B;&#xFF0C;&#x7406;&#x8BBA;&#x4E0A;&#x80FD;&#x591F;&#x521D;&#x59CB;&#x5316;<strong>&#x4E00;&#x5207;&#x5DE5;&#x7A0B;</strong>&#xFF0C;&#x5305;&#x62EC;react&#xFF0C;angular&#x7B49;&#x7B49;&#x7B49;&#x7B49;&#xFF0C;&#x53EA;&#x8981;&#x4F60;&#x6709;&#x4E00;&#x4EFD;&#x80FD;&#x591F;&#x8FD0;&#x884C;&#x7684;<strong>&#x6A21;&#x677F;</strong>&#xFF0C;&#x5C31;&#x80FD;&#x591F;&#x901A;&#x8FC7;vue-cli&#x8FDB;&#x884C;&#x5DE5;&#x7A0B;&#x7684;&#x521D;&#x59CB;&#x5316;&#x3002;</p><p>&#x5728;&#x8BA8;&#x8BBA;&#x533A;&#x6709;&#x8BB8;&#x591A;&#x7C7B;&#x4F3C;&#x7684;&#x95EE;&#x9898;&#xFF1A;</p><ul><li>&#x201C;vue-cli&#x5F53;&#x4E2D;&#x5982;&#x4F55;&#x914D;&#x7F6E;sass&#xFF1F;&#x201D;</li><li>&#x201C;vue-cli&#x4E2D;&#x5982;&#x4F55;&#x4FEE;&#x6539;devServer&#x7684;&#x7AEF;&#x53E3;&#xFF1F;&#x201D;</li><li>&#x201C;vue-cli&#x4E2D;&#x53D1;&#x73B0;&#x9879;&#x76EE;&#x8DD1;&#x4E0D;&#x8D77;&#x6765;&#x201D;</li><li>&#x2026;&#x2026;</li></ul><p>vue-cli&#x8BF4;&#xFF1A;&#x201C;&#x8FD9;&#x9505;&#x6211;&#x4E0D;&#x80CC;&#x3002;&#x201D;</p><p>&#x662F;&#x7684;&#xFF0C;&#x6240;&#x9047;&#x5230;&#x7684;&#x95EE;&#x9898;&#x90FD;&#x4E0D;&#x662F;vue-cli&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x800C;&#x662F;&#x76F8;&#x5173;&#x6A21;&#x677F;&#x7684;&#x95EE;&#x9898;&#x3002;&#x90A3;&#x4E48;&#x5E94;&#x8BE5;&#x5982;&#x4F55;&#x5199;&#x4E00;&#x4EFD;&#x5408;&#x683C;&#x7684;&#x6A21;&#x677F;&#x5462;&#xFF1F;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x4E00;&#x8D77;&#x6765;&#x7814;&#x7A76;&#x4E00;&#x4E0B;&#x3002;</p><h1 id="articleHeader3">&#x5199;&#x4E00;&#x4EFD;vue-cli&#x6A21;&#x677F;</h1><p>&#x53C2;&#x8003;<a href="https://github.com/vuejs/vue-cli/blob/master/README.md#custom-templates" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#xFF0C;&#x4E5F;&#x8BB8;&#x8FD8;&#x662F;&#x4E0D;&#x80FD;&#x7406;&#x89E3;&#x5230;&#x5E95;&#x5E94;&#x8BE5;&#x600E;&#x4E48;&#x5199;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x53C2;&#x8003;&#x5B98;&#x65B9;&#x4F8B;&#x5B50;<a href="https://github.com/vuejs-templates/webpack-simple" rel="nofollow noreferrer" target="_blank">webpack-simple</a>&#xFF0C;&#x770B;&#x770B;&#x5B83;&#x5230;&#x5E95;&#x662F;&#x600E;&#x4E48;&#x5199;&#x7684;&#x3002;</p><p>&#x9996;&#x5148;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVW033?w=237&amp;h=78" src="https://static.alili.tech/img/bVW033?w=237&amp;h=78" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x7740;&#x5B9E;&#x662F;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x5176;&#x4E2D;<code>meta.json</code>&#x5C31;&#x662F;&#x5411;&#x7528;&#x6237;&#x629B;&#x51FA;&#x7684;&#x95EE;&#x7B54;&#x9898;&#xFF0C;<code>/template</code>&#x76EE;&#x5F55;&#x5219;&#x662F;&#x771F;&#x6B63;&#x7684;&#x6A21;&#x677F;&#x5185;&#x5BB9;&#x3002;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;<code>meta.json</code>&#x90FD;&#x5199;&#x4E86;&#x4E9B;&#x5565;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;prompts&quot;: {
    &quot;name&quot;: {
      &quot;type&quot;: &quot;string&quot;,
      &quot;required&quot;: true,
      &quot;label&quot;: &quot;Project name&quot;
    },
    &quot;description&quot;: {
      &quot;type&quot;: &quot;string&quot;,
      &quot;required&quot;: true,
      &quot;label&quot;: &quot;Project description&quot;,
      &quot;default&quot;: &quot;A Vue.js project&quot;
    },
    &quot;author&quot;: {
      &quot;type&quot;: &quot;string&quot;,
      &quot;label&quot;: &quot;Author&quot;
    },
    &quot;sass&quot;: {
       &quot;type&quot;: &quot;confirm&quot;,
       &quot;message&quot;: &quot;Use sass?&quot;,
       &quot;default&quot;: false
    }
  },
  &quot;completeMessage&quot;: &quot;{{#inPlace}}To get started:\n\n  npm install\n  npm run dev.{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev.{{/inPlace}}&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;prompts&quot;</span>: {
    <span class="hljs-attr">&quot;name&quot;</span>: {
      <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;string&quot;</span>,
      <span class="hljs-attr">&quot;required&quot;</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">&quot;label&quot;</span>: <span class="hljs-string">&quot;Project name&quot;</span>
    },
    <span class="hljs-attr">&quot;description&quot;</span>: {
      <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;string&quot;</span>,
      <span class="hljs-attr">&quot;required&quot;</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">&quot;label&quot;</span>: <span class="hljs-string">&quot;Project description&quot;</span>,
      <span class="hljs-attr">&quot;default&quot;</span>: <span class="hljs-string">&quot;A Vue.js project&quot;</span>
    },
    <span class="hljs-attr">&quot;author&quot;</span>: {
      <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;string&quot;</span>,
      <span class="hljs-attr">&quot;label&quot;</span>: <span class="hljs-string">&quot;Author&quot;</span>
    },
    <span class="hljs-attr">&quot;sass&quot;</span>: {
       <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;confirm&quot;</span>,
       <span class="hljs-attr">&quot;message&quot;</span>: <span class="hljs-string">&quot;Use sass?&quot;</span>,
       <span class="hljs-attr">&quot;default&quot;</span>: <span class="hljs-literal">false</span>
    }
  },
  <span class="hljs-attr">&quot;completeMessage&quot;</span>: <span class="hljs-string">&quot;{{#inPlace}}To get started:\n\n  npm install\n  npm run dev.{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev.{{/inPlace}}&quot;</span>
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x5B83;&#x4E00;&#x5171;&#x5411;&#x7528;&#x6237;&#x63D0;&#x4E86;4&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><ul><li>Project name</li><li>Project description</li><li>Author</li><li>Use sass?</li></ul><p>&#x63A5;&#x7740;&#xFF0C;&#x6211;&#x4EEC;&#x6253;&#x5F00;<code>/template</code>&#x76EE;&#x5F55;&#xFF0C;&#x770B;&#x770B;&#x5B83;&#x957F;&#x4EC0;&#x4E48;&#x6837;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVW06v?w=245&amp;h=264" src="https://static.alili.tech/img/bVW06v?w=245&amp;h=264" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x5C31;&#x662F;&#x7EC8;&#x5C06;&#x88AB;&#x751F;&#x6210;&#x7684;&#x5DE5;&#x7A0B;&#x76EE;&#x5F55;&#x3002;&#x6253;&#x5F00;&#x91CC;&#x9762;&#x7684;<code>package.json</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;{{ name }}&quot;,
  &quot;description&quot;: &quot;{{ description }}&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;author&quot;: &quot;{{ author }}&quot;,
  &quot;private&quot;: true,
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;cross-env NODE_ENV=development webpack-dev-server --open --hot&quot;,
    &quot;build&quot;: &quot;cross-env NODE_ENV=production webpack --progress --hide-modules&quot;
  },
  &quot;dependencies&quot;: {
    &quot;vue&quot;: &quot;^2.4.4&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;babel-core&quot;: &quot;^6.26.0&quot;,
    &quot;babel-loader&quot;: &quot;^7.1.2&quot;,
    &quot;babel-preset-env&quot;: &quot;^1.6.0&quot;,
    &quot;cross-env&quot;: &quot;^5.0.5&quot;,
    &quot;css-loader&quot;: &quot;^0.28.7&quot;,
    &quot;file-loader&quot;: &quot;^1.1.4&quot;,
    {{#sass}}
    &quot;node-sass&quot;: &quot;^4.5.3&quot;,
    &quot;sass-loader&quot;: &quot;^6.0.6&quot;,
    {{/sass}}
    &quot;vue-loader&quot;: &quot;^13.0.5&quot;,
    &quot;vue-template-compiler&quot;: &quot;^2.4.4&quot;,
    &quot;webpack&quot;: &quot;^3.6.0&quot;,
    &quot;webpack-dev-server&quot;: &quot;^2.9.1&quot;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;{{ name }}&quot;</span>,
  <span class="hljs-attr">&quot;description&quot;</span>: <span class="hljs-string">&quot;{{ description }}&quot;</span>,
  <span class="hljs-attr">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.0.0&quot;</span>,
  <span class="hljs-attr">&quot;author&quot;</span>: <span class="hljs-string">&quot;{{ author }}&quot;</span>,
  <span class="hljs-attr">&quot;private&quot;</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">&quot;scripts&quot;</span>: {
    <span class="hljs-attr">&quot;dev&quot;</span>: <span class="hljs-string">&quot;cross-env NODE_ENV=development webpack-dev-server --open --hot&quot;</span>,
    <span class="hljs-attr">&quot;build&quot;</span>: <span class="hljs-string">&quot;cross-env NODE_ENV=production webpack --progress --hide-modules&quot;</span>
  },
  <span class="hljs-attr">&quot;dependencies&quot;</span>: {
    <span class="hljs-attr">&quot;vue&quot;</span>: <span class="hljs-string">&quot;^2.4.4&quot;</span>
  },
  <span class="hljs-attr">&quot;devDependencies&quot;</span>: {
    <span class="hljs-attr">&quot;babel-core&quot;</span>: <span class="hljs-string">&quot;^6.26.0&quot;</span>,
    <span class="hljs-attr">&quot;babel-loader&quot;</span>: <span class="hljs-string">&quot;^7.1.2&quot;</span>,
    <span class="hljs-attr">&quot;babel-preset-env&quot;</span>: <span class="hljs-string">&quot;^1.6.0&quot;</span>,
    <span class="hljs-attr">&quot;cross-env&quot;</span>: <span class="hljs-string">&quot;^5.0.5&quot;</span>,
    <span class="hljs-attr">&quot;css-loader&quot;</span>: <span class="hljs-string">&quot;^0.28.7&quot;</span>,
    <span class="hljs-attr">&quot;file-loader&quot;</span>: <span class="hljs-string">&quot;^1.1.4&quot;</span>,
    {{#sass}}
    <span class="hljs-string">&quot;node-sass&quot;</span>: <span class="hljs-string">&quot;^4.5.3&quot;</span>,
    <span class="hljs-string">&quot;sass-loader&quot;</span>: <span class="hljs-string">&quot;^6.0.6&quot;</span>,
    {{/sass}}
    <span class="hljs-string">&quot;vue-loader&quot;</span>: <span class="hljs-string">&quot;^13.0.5&quot;</span>,
    <span class="hljs-string">&quot;vue-template-compiler&quot;</span>: <span class="hljs-string">&quot;^2.4.4&quot;</span>,
    <span class="hljs-string">&quot;webpack&quot;</span>: <span class="hljs-string">&quot;^3.6.0&quot;</span>,
    <span class="hljs-string">&quot;webpack-dev-server&quot;</span>: <span class="hljs-string">&quot;^2.9.1&quot;</span>
  }
}</code></pre><p>&#x7ED3;&#x5408;&#x524D;&#x6587;&#x539F;&#x7406;&#x91CC;&#x9762;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x4E5F;&#x4E0D;&#x96BE;&#x7406;&#x89E3;&#x8FD9;&#x4E2A;<code>package.json</code>&#x91CC;&#x9762;&#x53CC;&#x62EC;&#x53F7;&#x7684;&#x542B;&#x4E49;&#x4E86;&#x3002;</p><p>&#x770B;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x5DF2;&#x7ECF;&#x8DC3;&#x8DC3;&#x6B32;&#x8BD5;&#xFF0C;&#x60F3;&#x8981;&#x5199;&#x4E00;&#x4EFD;&#x5C5E;&#x4E8E;&#x81EA;&#x5DF1;&#x7684;&#x6A21;&#x677F;&#x5462;&#xFF1F;&#x53C8;&#x6216;&#x8005;&#x60F3;&#x8981;&#x6253;&#x9020;&#x4E00;&#x6B3E;&#x5C5E;&#x4E8E;&#x81EA;&#x5DF1;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;&#xFF1F;&#x539F;&#x7406;&#x90FD;&#x662F;&#x5F88;&#x7B80;&#x5355;&#x7684;&#xFF0C;&#x53EA;&#x8981;&#x6309;&#x7167;&#x60F3;&#x6CD5;&#x4E00;&#x6B65;&#x6B65;&#x5B9E;&#x73B0;&#x5373;&#x53EF;&#x3002;</p><h1 id="articleHeader4">&#x540E;&#x8BB0;</h1><p>&#x5176;&#x5B9E;&#x5728;&#x53BB;&#x5E74;&#x65E9;&#x4E9B;&#x65F6;&#x5019;&#xFF0C;&#x5DF2;&#x7ECF;&#x5199;&#x4E86;&#x4E24;&#x7BC7;&#x811A;&#x624B;&#x67B6;&#x76F8;&#x5173;&#x7684;&#x6587;&#x7AE0;&#xFF1A;</p><ul><li><a href="https://segmentfault.com/a/1190000006190814">&#x300A;&#x6559;&#x4F60;&#x4ECE;&#x96F6;&#x5F00;&#x59CB;&#x642D;&#x5EFA;&#x4E00;&#x6B3E;&#x524D;&#x7AEF;&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;&#x300B;</a></li><li><a href="https://segmentfault.com/a/1190000009384902" target="_blank">&#x597D;&#x7528;&#x7684;&#x9879;&#x76EE;&#x521D;&#x59CB;&#x5316;&#x5DE5;&#x5177;SCION&#x5347;&#x7EA7;&#x5566;&#xFF01;</a></li></ul><p>&#x4F46;&#x662F;&#x53D1;&#x73B0;&#x4ECD;&#x7136;&#x6709;&#x8BB8;&#x591A;&#x540C;&#x5B66;&#x5BF9;&#x4E8E;vue-cli&#x7684;&#x7406;&#x89E3;&#x6709;&#x4E9B;&#x504F;&#x5DEE;&#xFF0C;&#x4E8E;&#x662F;&#x5199;&#x4E0B;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x804A;&#x4E00;&#x804A;&#x81EA;&#x5DF1;&#x7684;&#x7406;&#x89E3;&#x3002;</p><p>By the way&#xFF0C;&#x6211;&#x5C06;&#x4F1A;&#x5728;11&#x6708;16&#x65E5;&#x665A;&#x4E0A;8&#x70B9;&#xFF0C;&#x5728;Segmentfault&#x5F00;&#x5C55;live&#x8BB2;&#x5EA7;&#xFF0C;&#x4E3B;&#x9898;&#x662F;&#x300A;&#x3010;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5316;&#x3011;&#xFF1A;&#x73A9;&#x8F6C;Webpack&#x914D;&#x7F6E;&#x300B;&#xFF0C;&#x6B22;&#x8FCE;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#x62A5;&#x540D;&#x53C2;&#x52A0;&#x54E6;&#xFF0C;&#x4FDD;&#x8BC1;&#x7CBE;&#x5FC3;&#x51C6;&#x5907;&#xFF0C;&#x5E72;&#x8D27;&#x6EE1;&#x6EE1;&#xFF01;</p><p>&#x62A5;&#x540D;&#x94FE;&#x63A5;&#xFF1A;<a href="https://segmentfault.com/l/1500000011633208">https://segmentfault.com/l/15...</a></p><p>&#x671F;&#x5F85;&#x548C;&#x5927;&#x5BB6;&#x7684;&#x5206;&#x4EAB;&#x4EA4;&#x6D41;~</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入认识vue-cli：能做的不仅仅是初始化vue工程

## 原文链接
[https://segmentfault.com/a/1190000011643581](https://segmentfault.com/a/1190000011643581)

