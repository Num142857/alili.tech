---
title: 如何使用 vue-cli 3 的 preset 打造基于 git repo 的前端项目模板
hidden: true
categories: [reprint]
slug: 5e7e6433
date: 2018-11-10 02:30:10
---

{{< raw >}}
<p><a href="https://cli.vuejs.org/zh/guide/plugins-and-presets.html#%E6%8F%92%E4%BB%B6" rel="nofollow noreferrer" target="_blank">vue-cli &#x4E4B; Preset</a></p><p><a href="https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5" rel="nofollow noreferrer" target="_blank">vue-cli &#x63D2;&#x4EF6;&#x5F00;&#x53D1;&#x6307;&#x5357;</a></p><p><strong>TLDR</strong></p><h2 id="articleHeader0">&#x80CC;&#x666F;&#x4ECB;&#x7ECD;</h2><p>vue-cli 3 &#x5B8C;&#x5168;&#x63A8;&#x7FFB;&#x4E86; vue-cli 2 &#x7684;&#x6574;&#x4F53;&#x67B6;&#x6784;&#x8BBE;&#x8BA1;&#xFF0C;&#x6240;&#x4EE5;&#x5F53;&#x4F60;&#x9700;&#x8981;&#x7ED9;&#x7EC4;&#x91CC;&#x5B9A;&#x5236;&#x4E00;&#x4EFD;&#x57FA;&#x4E8E; vue-cli &#x7684;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x521D;&#x59CB;&#x5316;&#x6A21;&#x677F;&#x65F6;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x53BB;&#x601D;&#x8003;&#xFF1A;&#x6211;&#x8BE5;&#x600E;&#x4E48;&#x505A;&#xFF1F;</p><p>&#x6211;&#x4EEC;&#x8981;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x5F53;&#x522B;&#x4EBA;&#x4F7F;&#x7528; <code>vue create xxx</code> &#x547D;&#x4EE4;&#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x4ECE; git repo &#x53BB;&#x62C9;&#x53D6;&#x9879;&#x76EE;&#x521D;&#x59CB;&#x5316;&#x4FE1;&#x606F;&#xFF0C;&#x597D;&#x5904;&#x6709;&#x4E24;&#x70B9;&#xFF1A;</p><ol><li>&#x56E2;&#x961F;&#x5185;&#x90E8;&#x6240;&#x6709;&#x7684;&#x65B0;&#x9879;&#x76EE;&#x90FD;&#x662F;&#x7EDF;&#x4E00;&#x7684;<strong>&#x76EE;&#x5F55;&#x7ED3;&#x6784;</strong>&#x548C;<strong>&#x4EE3;&#x7801;&#x7EC4;&#x7EC7;&#x65B9;&#x5F0F;</strong>&#xFF0C;&#x4FBF;&#x4E8E;&#x7EF4;&#x62A4;</li><li>&#x540E;&#x671F;&#x53EF;&#x4EE5;&#x5F00;&#x53D1;&#x516C;&#x5171;&#x63D2;&#x4EF6;&#x670D;&#x52A1;&#x4E8E;&#x4E0D;&#x540C;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x63D0;&#x9AD8;&#x6548;&#x7387;</li></ol><p>&#x56E0;&#x4E3A; vue-cli 3 &#x624D;&#x51FA;&#x6765;&#x4E0D;&#x4E45;&#xFF0C;&#x6240;&#x4EE5;&#x63A2;&#x7D22;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x8E29;&#x4E86;&#x5F88;&#x591A;&#x5751;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x6765;&#x603B;&#x7ED3;&#x4E0B;&#x3002;</p><h2 id="articleHeader1">&#x6574;&#x4F53;&#x8BBE;&#x8BA1;</h2><p>vue-cli &#x5B98;&#x7F51;&#x4ECB;&#x7ECD;&#x5230;&#xFF1A;</p><blockquote><p>&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x53D1;&#x5E03; git repo &#x5C06;&#x4E00;&#x4E2A; preset &#x5206;&#x4EAB;&#x7ED9;&#x5176;&#x4ED6;&#x5F00;&#x53D1;&#x8005;&#x3002;&#x8FD9;&#x4E2A; repo &#x5E94;&#x8BE5;&#x5305;&#x542B;&#x4EE5;&#x4E0B;&#x6587;&#x4EF6;&#xFF1A;</p><ul><li>preset.json: &#x5305;&#x542B; preset &#x6570;&#x636E;&#x7684;&#x4E3B;&#x8981;&#x6587;&#x4EF6;&#xFF08;&#x5FC5;&#x9700;&#xFF09;&#x3002;</li><li>generator.js: &#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x6CE8;&#x5165;&#x6216;&#x662F;&#x4FEE;&#x6539;&#x9879;&#x76EE;&#x4E2D;&#x6587;&#x4EF6;&#x7684; Generator&#x3002;</li><li>prompts.js: &#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x547D;&#x4EE4;&#x884C;&#x5BF9;&#x8BDD;&#x4E3A; generator &#x6536;&#x96C6;&#x9009;&#x9879;&#x7684; prompts &#x6587;&#x4EF6;&#x3002;</li></ul></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x4ECE; GitHub repo &#x4F7F;&#x7528; preset
vue create --preset username/repo my-project" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livecodeserver"><code><span class="hljs-comment"># &#x4ECE; GitHub repo &#x4F7F;&#x7528; preset</span>
vue <span class="hljs-built_in">create</span> <span class="hljs-comment">--preset username/repo my-project</span></code></pre><blockquote>GitLab &#x548C; BitBucket &#x4E5F;&#x662F;&#x652F;&#x6301;&#x7684;&#x3002;&#x5982;&#x679C;&#x8981;&#x4ECE;&#x79C1;&#x6709; repo &#x83B7;&#x53D6;&#xFF0C;&#x8BF7;&#x786E;&#x4FDD;&#x4F7F;&#x7528; --clone &#x9009;&#x9879;&#xFF1A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue create --preset gitlab:username/repo --clone my-project
vue create --preset bitbucket:username/repo --clone my-project" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code>vue create --preset gitlab:username/repo --<span class="hljs-keyword">clone</span> <span class="hljs-title">my-project</span>
vue create --preset bitbucket:username/repo --<span class="hljs-keyword">clone</span> <span class="hljs-title">my-project</span></code></pre><p>&#x662F;&#x4E0D;&#x662F;&#x770B;&#x4E0A;&#x53BB;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x8D77;&#x7801;&#x6211;&#x5728;&#x5B9E;&#x8DF5;&#x8FC7;&#x7A0B;&#x4E2D;&#x8FD8;&#x662F;&#x9047;&#x5230;&#x4E86;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x91CD;&#x70B9;&#x8BB2;&#x4E0B;&#x3002;</p><p><strong>git repo &#x53C2;&#x6570;</strong></p><p>&#x4E0A;&#x9762; <code>--preset</code> &#x540E;&#x8DDF;&#x7684;&#x53C2;&#x6570; <code>username/repo</code> &#x5B9E;&#x9645;&#x662F;&#x4E0B;&#x56FE;&#x4E2D;&#x7684;&#x7EA2;&#x6846;&#x5185;&#x90E8;&#x5206;&#xFF08;&#x5343;&#x4E07;&#x522B;&#x4EE5;&#x4E3A;&#x662F; <code>git clone</code> &#x540E;&#x7684;&#x5730;&#x5740;&#xFF09;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgVOG?w=1594&amp;h=324" src="https://static.alili.tech/img/bVbgVOG?w=1594&amp;h=324" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>preset.json &#x6587;&#x4EF6;</strong></p><p>&#x5148;&#x8BF4;&#x4E00;&#x70B9;&#xFF1A;&#x5F53;&#x4F60;&#x76F4;&#x63A5;&#x7528; <code>vue create xxx</code> &#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#x65F6;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x5C06;&#x521D;&#x59CB;&#x5316;&#x4FE1;&#x606F;&#x4FDD;&#x5B58;&#x6210;&#x4E00;&#x4E2A;&#x672C;&#x5730;&#x6A21;&#x677F;&#x540E;&#xFF0C;&#x4F1A;&#x5199;&#x5165;&#x5230;&#x4F60;&#x7CFB;&#x7EDF;&#x7684; <code>~/.vuerc</code> &#x6587;&#x4EF6;&#x4E2D;&#x3002;&#x8BE5;&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x5185;&#x5BB9;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x63A5;&#x4E0B;&#x6765;&#x9700;&#x8981;&#x914D;&#x7F6E;&#x7684; <code>present.json</code>&#x3002;</p><p>&#x6B64;&#x5904;&#x76F4;&#x63A5; show code :</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;useConfigFiles&quot;: true,

  &quot;cssPreprocessor&quot;: &quot;less&quot;,

  &quot;plugins&quot;: {

    &quot;@vue/cli-plugin-babel&quot;: {
      &quot;version&quot;: &quot;^3.0.0&quot;
    },

    &quot;@vue/cli-plugin-eslint&quot;: {
      &quot;version&quot;: &quot;^3.0.0&quot;,

      &quot;config&quot;: &quot;recommended&quot;,

      &quot;lintOn&quot;: [&quot;save&quot;, &quot;commit&quot;]
    }
  },

  &quot;configs&quot;: {

    &quot;vue&quot;: {
      &quot;baseUrl&quot;: &quot;/&quot;,

      &quot;outputDir&quot;: &quot;dist&quot;,

      &quot;assetsDir&quot;: &quot;static&quot;,

      &quot;filenameHashing&quot;: true,

      &quot;lintOnSave&quot;: true,

      &quot;runtimeCompiler&quot;: false,

      &quot;transpileDependencies&quot;: [],

      &quot;productionSourceMap&quot;: false,

      &quot;pages&quot;: {
        &quot;index&quot;: {
          &quot;entry&quot;: &quot;src/main.js&quot;,
          &quot;template&quot;: &quot;public/index.html&quot;,
          &quot;filename&quot;: &quot;index.html&quot;,
          &quot;title&quot;: &quot;&#x9996;&#x9875;&quot;,
          &quot;chunks&quot;: [&quot;chunk-vendors&quot;, &quot;chunk-common&quot;, &quot;index&quot;]
        }
      },

      &quot;devServer&quot;: {
        &quot;open&quot;: true,

        &quot;host&quot;: &quot;127.0.0.1&quot;,

        &quot;https&quot;: false,

        &quot;hotOnly&quot;: false,

        &quot;proxy&quot;: null
      },

      &quot;pwa&quot;: {},

      &quot;pluginOptions&quot;: {}
    },

    &quot;postcss&quot;: {},

    &quot;eslintConfig&quot;: {
    }
  },

  &quot;router&quot;: true,

  &quot;vuex&quot;: false,

  &quot;routerHistoryMode&quot;: false
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;useConfigFiles&quot;</span>: <span class="hljs-literal">true</span>,

  <span class="hljs-attr">&quot;cssPreprocessor&quot;</span>: <span class="hljs-string">&quot;less&quot;</span>,

  <span class="hljs-attr">&quot;plugins&quot;</span>: {

    <span class="hljs-attr">&quot;@vue/cli-plugin-babel&quot;</span>: {
      <span class="hljs-attr">&quot;version&quot;</span>: <span class="hljs-string">&quot;^3.0.0&quot;</span>
    },

    <span class="hljs-attr">&quot;@vue/cli-plugin-eslint&quot;</span>: {
      <span class="hljs-attr">&quot;version&quot;</span>: <span class="hljs-string">&quot;^3.0.0&quot;</span>,

      <span class="hljs-attr">&quot;config&quot;</span>: <span class="hljs-string">&quot;recommended&quot;</span>,

      <span class="hljs-attr">&quot;lintOn&quot;</span>: [<span class="hljs-string">&quot;save&quot;</span>, <span class="hljs-string">&quot;commit&quot;</span>]
    }
  },

  <span class="hljs-attr">&quot;configs&quot;</span>: {

    <span class="hljs-attr">&quot;vue&quot;</span>: {
      <span class="hljs-attr">&quot;baseUrl&quot;</span>: <span class="hljs-string">&quot;/&quot;</span>,

      <span class="hljs-attr">&quot;outputDir&quot;</span>: <span class="hljs-string">&quot;dist&quot;</span>,

      <span class="hljs-attr">&quot;assetsDir&quot;</span>: <span class="hljs-string">&quot;static&quot;</span>,

      <span class="hljs-attr">&quot;filenameHashing&quot;</span>: <span class="hljs-literal">true</span>,

      <span class="hljs-attr">&quot;lintOnSave&quot;</span>: <span class="hljs-literal">true</span>,

      <span class="hljs-attr">&quot;runtimeCompiler&quot;</span>: <span class="hljs-literal">false</span>,

      <span class="hljs-attr">&quot;transpileDependencies&quot;</span>: [],

      <span class="hljs-attr">&quot;productionSourceMap&quot;</span>: <span class="hljs-literal">false</span>,

      <span class="hljs-attr">&quot;pages&quot;</span>: {
        <span class="hljs-attr">&quot;index&quot;</span>: {
          <span class="hljs-attr">&quot;entry&quot;</span>: <span class="hljs-string">&quot;src/main.js&quot;</span>,
          <span class="hljs-attr">&quot;template&quot;</span>: <span class="hljs-string">&quot;public/index.html&quot;</span>,
          <span class="hljs-attr">&quot;filename&quot;</span>: <span class="hljs-string">&quot;index.html&quot;</span>,
          <span class="hljs-attr">&quot;title&quot;</span>: <span class="hljs-string">&quot;&#x9996;&#x9875;&quot;</span>,
          <span class="hljs-attr">&quot;chunks&quot;</span>: [<span class="hljs-string">&quot;chunk-vendors&quot;</span>, <span class="hljs-string">&quot;chunk-common&quot;</span>, <span class="hljs-string">&quot;index&quot;</span>]
        }
      },

      <span class="hljs-attr">&quot;devServer&quot;</span>: {
        <span class="hljs-attr">&quot;open&quot;</span>: <span class="hljs-literal">true</span>,

        <span class="hljs-attr">&quot;host&quot;</span>: <span class="hljs-string">&quot;127.0.0.1&quot;</span>,

        <span class="hljs-attr">&quot;https&quot;</span>: <span class="hljs-literal">false</span>,

        <span class="hljs-attr">&quot;hotOnly&quot;</span>: <span class="hljs-literal">false</span>,

        <span class="hljs-attr">&quot;proxy&quot;</span>: <span class="hljs-literal">null</span>
      },

      <span class="hljs-attr">&quot;pwa&quot;</span>: {},

      <span class="hljs-attr">&quot;pluginOptions&quot;</span>: {}
    },

    <span class="hljs-attr">&quot;postcss&quot;</span>: {},

    <span class="hljs-attr">&quot;eslintConfig&quot;</span>: {
    }
  },

  <span class="hljs-attr">&quot;router&quot;</span>: <span class="hljs-literal">true</span>,

  <span class="hljs-attr">&quot;vuex&quot;</span>: <span class="hljs-literal">false</span>,

  <span class="hljs-attr">&quot;routerHistoryMode&quot;</span>: <span class="hljs-literal">false</span>
}
</code></pre><p>&#x5176;&#x4E2D;&#x5F53; <code>&quot;useConfigFiles&quot;: true</code> &#x65F6;&#xFF0C; <code>configs</code> &#x5185;&#x7684;&#x914D;&#x7F6E;&#x4FE1;&#x606F;&#x4F1A;&#x76F4;&#x63A5;&#x8986;&#x76D6;&#x521D;&#x59CB;&#x5316;&#x540E;&#x9879;&#x76EE;&#x4E2D;&#x7684; <code>vue.config.js</code>&#x3002;</p><p><strong>prompts.js &#x6587;&#x4EF6;</strong></p><p>prompts.js &#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4F60;&#x5728;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#x65F6;&#xFF0C;&#x7CFB;&#x7EDF;&#x4F1A;&#x8BE2;&#x95EE;&#x4F60;&#x7684;&#x914D;&#x7F6E;&#x9009;&#x9879;&#x95EE;&#x9898;&#xFF0C;&#x6BD4;&#x5982;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x9700;&#x4E0D;&#x9700;&#x8981;&#x5B89;&#x88C5; <code>vuex</code>? &#x9700;&#x4E0D;&#x9700;&#x8981;&#x5B89;&#x88C5; <code>vue-router</code>?</p><p>&#x4F60;&#x7684;&#x56DE;&#x7B54;&#x4F1A;&#x76F4;&#x63A5;&#x5F71;&#x54CD;&#x540E;&#x9762;&#x521D;&#x59CB;&#x5316;&#x751F;&#x6210;&#x7684;&#x9879;&#x76EE;&#x6587;&#x4EF6;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6700;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x4E00;&#x70B9;&#xFF01;&#xFF01;&#xFF01;</p><p>&#x5F53;&#x4F60;&#x67E5;&#x770B;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x65F6;&#xFF0C;&#x7B2C;&#x4E00;&#x773C;&#x770B;&#x5230;&#x5C31;&#x662F;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgVQg?w=1560&amp;h=1682" src="https://static.alili.tech/img/bVbgVQg?w=1560&amp;h=1682" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x53EA;&#x8981;&#x4F60;&#x8FD9;&#x6837;&#x5199;&#xFF0C;&#x5C31;&#x4E00;&#x5B9A;&#x4F1A; <strong>&#x62A5;&#x9519;</strong> &#xFF01;&#xFF01;&#xFF01;</p><p>&#x539F;&#x56E0;&#x5F88;&#x7B80;&#x5355;&#xFF1A;&#x4E0A;&#x56FE;&#x4E2D; <code>prompts.js</code>&#x7684;&#x5199;&#x6CD5;&#x662F;&#x5F00;&#x53D1;&#x57FA;&#x4E8E; <code>vue-cli-service</code> &#x63D2;&#x4EF6;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x800C;&#x5F53;&#x4F60;&#x662F;&#x8981;&#x5F00;&#x53D1;&#x9879;&#x76EE;&#x6A21;&#x677F;&#x65F6;&#xFF0C;&#x6B63;&#x786E;&#x5199;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = [
  {
    name: &quot;vuex&quot;,
    type: &quot;confirm&quot;,
    message: `&#x662F;&#x5426;&#x9700;&#x8981;&#x4F7F;&#x7528; vuex`,
    default: false
  },
  {
    name: &quot;elementUI&quot;,
    type: &quot;confirm&quot;,
    message: `element-ui`,
    default: false
  }
];
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = [
  {
    name: <span class="hljs-string">&quot;vuex&quot;</span>,
    <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;confirm&quot;</span>,
    message: <span class="hljs-string">`&#x662F;&#x5426;&#x9700;&#x8981;&#x4F7F;&#x7528; vuex`</span>,
    <span class="hljs-keyword">default</span>: <span class="hljs-literal">false</span>
  },
  {
    name: <span class="hljs-string">&quot;elementUI&quot;</span>,
    <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;confirm&quot;</span>,
    message: <span class="hljs-string">`element-ui`</span>,
    <span class="hljs-keyword">default</span>: <span class="hljs-literal">false</span>
  }
];
</code></pre><p>&#x8FD9;&#x4E00;&#x70B9;&#x5176;&#x5B9E;&#x5B98;&#x7F51;&#x4E5F;&#x6709;&#x63D0;&#x5230;&#xFF0C;&#x53EA;&#x662F;&#x5F88;&#x4E0D;&#x5BB9;&#x6613;&#x6CE8;&#x610F;&#x5230;&#x3002;</p><p>&#x6B64;&#x5904;&#x518D;&#x7ED9;&#x5927;&#x5BB6;&#x5B89;&#x5229;&#x4E0B; <a href="https://github.com/vuetifyjs/vue-cli-plugin-vuetify/blob/dev/prompts.js" rel="nofollow noreferrer" target="_blank">vue-cli-plugin-vuetify</a> &#x8FD9;&#x4E2A;&#x5F00;&#x6E90;&#x63D2;&#x4EF6;&#x4E2D; <code>prompts.js</code> &#x7684;&#x5199;&#x6CD5;&#x3002;&#x7A0B;&#x5E8F;&#x733F;&#x561B;&#xFF0C;&#x6700;&#x7231;&#x7684;&#x5C31;&#x662F;&#x6817;&#x5B50;&#x3002;</p><p><strong>generator.js &#x6587;&#x4EF6;</strong></p><p>&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F; <code>generator.js</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x8D1F;&#x8D23;&#x7684;&#x5C31;&#x662F; <strong>&#x6CE8;&#x5165;&#x6216;&#x662F;&#x4FEE;&#x6539;&#x9879;&#x76EE;&#x4E2D;&#x6587;&#x4EF6;</strong>&#x3002;</p><p>&#x540C;&#x6837;&#xFF0C;&#x6211;&#x8FD8;&#x662F;&#x76F4;&#x63A5; show code :</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = (api, options, rootOptions) =&gt; {
  // &#x5B89;&#x88C5;&#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x516C;&#x5171;&#x5E93;
  api.extendPackage({
    dependencies: {
      &quot;axios&quot;: &quot;^0.18.0&quot;,
      &quot;lodash&quot;: &quot;^4.17.10&quot;,
      &quot;keymirror&quot;: &quot;^0.1.1&quot;
    },
    devDependencies: {
      &quot;mockjs&quot;: &quot;^1.0.1-beta3&quot;
    }
  });

  // &#x5B89;&#x88C5; vuex
  if (options.vuex) {
    api.extendPackage({
      dependencies: {
        vuex: &apos;^3.0.1&apos;
      }
    });

    api.render(&apos;./template/vuex&apos;);
  }

  // &#x5B89;&#x88C5; element-ui &#x5E93;
  if (options.elementUI) {
    api.extendPackage({
      devDependencies: {
        &quot;element-ui&quot;: &quot;^2.4.6&quot;
      }
    });
  }

  // &#x516C;&#x5171;&#x57FA;&#x7840;&#x76EE;&#x5F55;&#x548C;&#x6587;&#x4EF6;
  api.render(&apos;./template/default&apos;);

  // &#x914D;&#x7F6E;&#x6587;&#x4EF6;
  api.render({
    &apos;./.eslintrc.js&apos;     : &apos;./template/_eslintrc.js&apos;,
    &apos;./.gitignore&apos;       : &apos;./template/_gitignore&apos;,
    &apos;./.postcssrc.js&apos;    : &apos;./template/_postcssrc.js&apos;
  });
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code>module.exports = (api, <span class="hljs-keyword">options</span>, rootOptions) =&gt; {
  <span class="hljs-comment">// &#x5B89;&#x88C5;&#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x516C;&#x5171;&#x5E93;</span>
  api.extendPackage({
    <span class="hljs-keyword">dependencies</span>: {
      <span class="hljs-string">&quot;axios&quot;</span>: <span class="hljs-string">&quot;^0.18.0&quot;</span>,
      <span class="hljs-string">&quot;lodash&quot;</span>: <span class="hljs-string">&quot;^4.17.10&quot;</span>,
      <span class="hljs-string">&quot;keymirror&quot;</span>: <span class="hljs-string">&quot;^0.1.1&quot;</span>
    },
    devDependencies: {
      <span class="hljs-string">&quot;mockjs&quot;</span>: <span class="hljs-string">&quot;^1.0.1-beta3&quot;</span>
    }
  });

  <span class="hljs-comment">// &#x5B89;&#x88C5; vuex</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">options</span>.vuex) {
    api.extendPackage({
      <span class="hljs-keyword">dependencies</span>: {
        vuex: <span class="hljs-string">&apos;^3.0.1&apos;</span>
      }
    });

    api.render(<span class="hljs-string">&apos;./template/vuex&apos;</span>);
  }

  <span class="hljs-comment">// &#x5B89;&#x88C5; element-ui &#x5E93;</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">options</span>.elementUI) {
    api.extendPackage({
      devDependencies: {
        <span class="hljs-string">&quot;element-ui&quot;</span>: <span class="hljs-string">&quot;^2.4.6&quot;</span>
      }
    });
  }

  <span class="hljs-comment">// &#x516C;&#x5171;&#x57FA;&#x7840;&#x76EE;&#x5F55;&#x548C;&#x6587;&#x4EF6;</span>
  api.render(<span class="hljs-string">&apos;./template/default&apos;</span>);

  <span class="hljs-comment">// &#x914D;&#x7F6E;&#x6587;&#x4EF6;</span>
  api.render({
    <span class="hljs-string">&apos;./.eslintrc.js&apos;</span>     : <span class="hljs-string">&apos;./template/_eslintrc.js&apos;</span>,
    <span class="hljs-string">&apos;./.gitignore&apos;</span>       : <span class="hljs-string">&apos;./template/_gitignore&apos;</span>,
    <span class="hljs-string">&apos;./.postcssrc.js&apos;</span>    : <span class="hljs-string">&apos;./template/_postcssrc.js&apos;</span>
  });
}
</code></pre><p>&#x6838;&#x5FC3; api:</p><ul><li><code>api.extendPackage</code> : &#x8D1F;&#x8D23;&#x7ED9;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#x4E2D;&#x7684; <code>package.json</code> &#x6DFB;&#x52A0;&#x989D;&#x5916;&#x4F9D;&#x8D56;&#x5E76;&#x5B89;&#x88C5;&#xFF1B;</li><li><code>api.render</code> : &#x8D1F;&#x8D23;&#x5C06;&#x6A21;&#x677F;&#x9879;&#x76EE;&#x4E2D;&#x63D0;&#x524D;&#x5B9A;&#x4E49;&#x597D;&#x7684;&#x76EE;&#x5F55;&#x548C;&#x6587;&#x4EF6;&#x62F7;&#x8D1D;&#x5230;&#x521D;&#x59CB;&#x5316;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#xFF1B;</li><li><code>api.postProcessFiles</code> : &#x8D1F;&#x8D23;&#x5177;&#x4F53;&#x5904;&#x7406;&#x6A21;&#x677F;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5173;&#x4E8E;&#x5B83;&#x53EF;&#x4EE5;&#x53C2;&#x8003; <a href="https://medium.com/@Seb_L/how-to-build-your-own-vue-cli-3-plugin-be4b1a6bb68b" rel="nofollow noreferrer" target="_blank">How to build your own vue-cli 3 plugin</a> &#x548C; <a href="https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli/lib/GeneratorAPI.js" rel="nofollow noreferrer" target="_blank">GeneratorAPI.js &#x6E90;&#x7801;</a></li></ul><p>&#x5BF9;&#x4E8E; <code>api.render</code> &#x9700;&#x8981;&#x6CE8;&#x610F;&#x51E0;&#x70B9;&#xFF1A;</p><ol><li>&#x62F7;&#x8D1D;&#x76EE;&#x5F55;&#x7684;&#x8BDD;&#xFF0C;&#x76F4;&#x63A5;&#x4F20;&#x5730;&#x5740;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;<code>render</code> &#x51FD;&#x6570;&#x4F1A;&#x5C06;&#x4F60;&#x6240;&#x4F20;&#x76EE;&#x5F55;&#x5185;&#x7684;&#x6240;&#x6709;&#x6587;&#x4EF6;&#x8986;&#x76D6;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#x4E2D; <code>src</code> &#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6587;&#x4EF6;&#xFF08;&#x6211;&#x7684;&#x6D4B;&#x8BD5;&#x7ED3;&#x679C;&#x662F;&#x9650;&#x4E8E;&#x4E24;&#x5C42;&#x76EE;&#x5F55;&#xFF09;&#xFF1B;</li><li>&#x62F7;&#x8D1D;&#x6587;&#x4EF6;&#x7684;&#x8BDD;&#xFF0C;&#x76F4;&#x63A5;&#x4F20;&#x5165;&#x4E00;&#x4E2A; <code>object</code>&#xFF0C;&#x5176;&#x4E2D; <code>key</code> &#x5BF9;&#x5E94;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x76EE;&#x6807;&#x4F4D;&#x7F6E;&#xFF0C;<code>value</code> &#x5BF9;&#x5E94;&#x6A21;&#x677F;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x6587;&#x4EF6;&#x4F4D;&#x7F6E;&#xFF1B;</li><li>&#x5F53;&#x4F60;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4EE5; <code>.</code> &#x5F00;&#x5934;&#x7684;&#x6587;&#x4EF6;&#x65F6;&#xFF0C;&#x6A21;&#x677F;&#x9879;&#x76EE;&#x4E2D;&#x9700;&#x8981;&#x7528; <code>_</code> &#x66FF;&#x4EE3; <code>.</code>&#xFF0C;&#x8FD9;&#x70B9;&#x5B98;&#x7F51;&#x6709;&#x8BF4;&#x660E;&#xFF1B;</li></ol><p><span class="img-wrap"><img data-src="/img/bVbgVWN?w=1512&amp;h=1142" src="https://static.alili.tech/img/bVbgVWN?w=1512&amp;h=1142" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6700;&#x540E;&#x518D;&#x8BF4;&#x4E2A;&#x5F88;&#x91CD;&#x8981;&#x70B9;&#xFF0C;vue-cli 3 &#x5728;&#x62F7;&#x8D1D;&#x6587;&#x4EF6;&#x65F6;&#x4F7F;&#x7528;&#x7684;&#x662F; <code>EJS</code> &#x6A21;&#x677F;&#x53BB;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5F00;&#x53D1;&#x8005;&#x662F;&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x610F;&#x6587;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528; <code>EJS</code> &#x8BED;&#x6CD5;&#x53BB;&#x505A;&#x66F4;&#x7EC6;&#x7C92;&#x5EA6;&#x7684;&#x63A7;&#x5236;&#x3002;&#x6BD4;&#x5982;&#x6211;&#x7684; <code>main.js</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import App from &apos;./App.vue&apos;
&lt;%_ if (options.vuex) { _%&gt;
import store from &apos;./store&apos;
&lt;%_ } _%&gt;
&lt;%_ if (options.elementUI) { _%&gt;
import ElementUI from &apos;element-ui&apos;;
Vue.use(ElementUI);
&lt;%_ } _%&gt;

// simulation data
import &apos;./mock/index&apos;;

Vue.config.productionTip = false

new Vue({
  router,
  &lt;%_ if (options.vuex) { _%&gt;
  store,
  &lt;%_ } _%&gt;
  render: h =&gt; h(App)
}).$mount(&apos;#app&apos;)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-keyword">import</span> Vue from <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> App from <span class="hljs-string">&apos;./App.vue&apos;</span>
&lt;%<span class="hljs-literal">_</span> <span class="hljs-keyword">if</span> (options.vuex) { <span class="hljs-literal">_</span>%&gt;
<span class="hljs-keyword">import</span> store from <span class="hljs-string">&apos;./store&apos;</span>
&lt;%<span class="hljs-literal">_</span> } <span class="hljs-literal">_</span>%&gt;
&lt;%<span class="hljs-literal">_</span> <span class="hljs-keyword">if</span> (options.elementUI) { <span class="hljs-literal">_</span>%&gt;
<span class="hljs-keyword">import</span> ElementUI from <span class="hljs-string">&apos;element-ui&apos;</span>;
Vue.use(ElementUI);
&lt;%<span class="hljs-literal">_</span> } <span class="hljs-literal">_</span>%&gt;

<span class="hljs-comment">// simulation data</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./mock/index&apos;</span>;

Vue.config.productionTip = <span class="hljs-literal">false</span>

<span class="hljs-keyword">new</span> <span class="hljs-type">Vue</span>({
  router,
  &lt;%<span class="hljs-literal">_</span> <span class="hljs-keyword">if</span> (options.vuex) { <span class="hljs-literal">_</span>%&gt;
  store,
  &lt;%<span class="hljs-literal">_</span> } <span class="hljs-literal">_</span>%&gt;
  render: <span class="hljs-type">h </span>=&gt; h(App)
}).$mount(<span class="hljs-string">&apos;#app&apos;</span>)
</code></pre><p>&#x5176;&#x4E2D; <code>options.vuex</code> &#x548C; <code>options.elementUI</code> &#x5C31;&#x662F;&#x7528;&#x6237;&#x5728;&#x5904;&#x7406; <code>prompts.js</code> &#x4E2D;&#x8BBE;&#x5B9A;&#x7684;&#x95EE;&#x9898;&#x7684;&#x56DE;&#x7B54;&#x503C;&#x3002;&#x6B63;&#x662F;&#x57FA;&#x4E8E;&#x8FD9;&#x70B9;&#xFF0C;&#x6211;&#x6CA1;&#x6709;&#x518D;&#x53BB;&#x4F7F;&#x7528; <code>api.postProcessFiles</code> &#x8FD9;&#x4E2A; api &#x3002;</p><p>&#x4ECA;&#x5929;&#x5C31;&#x5199;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x540E;&#x7EED;&#x6709;&#x8865;&#x5145;&#x518D;&#x5199;~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用 vue-cli 3 的 preset 打造基于 git repo 的前端项目模板

## 原文链接
[https://segmentfault.com/a/1190000016389996](https://segmentfault.com/a/1190000016389996)

