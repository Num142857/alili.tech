---
title: 手把手教会使用react开发日历组件
hidden: true
categories: [reprint]
slug: 8f49361c
date: 2018-11-12 02:30:05
---

{{< raw >}}
<h1 id="articleHeader0">&#x51C6;&#x5907;&#x5DE5;&#x4F5C;</h1><p>&#x63D0;&#x524D;&#x9700;&#x8981;&#x51C6;&#x5907;&#x597D;react&#x811A;&#x624B;&#x67B6;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x7531;&#x4E8E;react&#x5DF2;&#x7ECF;&#x4E0D;&#x652F;&#x6301;&#x5728;&#x9875;&#x9762;&#x5185;&#x90E8;&#x901A;&#x8FC7;jsx.transform&#x6765;&#x8F6C;&#x4E49;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x81EA;&#x5DF1;&#x5927;&#x4E86;&#x4E2A;&#x7B80;&#x6613;&#x7684;&#x5F00;&#x53D1;&#x73AF;&#x5883;</p><p>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x547D;&#x540D;&#x4E3A;react-canlendar</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd ./react-canlendar" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs bash"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">cd</span> ./react-canlendar</code></pre><p>&#x8FD0;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">npm</span> init</code></pre><p>&#x4E00;&#x8DEF;enter&#x6211;&#x4EEC;&#x5F97;&#x5230;&#x4E00;&#x4E2A;package.json&#x7684;&#x6587;&#x4EF6;</p><p>&#x5B89;&#x88C5;&#x51E0;&#x4E2A;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x811A;&#x624B;&#x67B6;&#x4F9D;&#x8D56;&#x5305;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install awesome-typescript-loader typescript webpack webpack-cli -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code style="word-break:break-word;white-space:initial">npm install awesome-typescript-loader typescript webpack webpack-<span class="hljs-keyword">cli</span> -<span class="hljs-built_in">D</span></code></pre><p>&#x5B89;&#x88C5;&#x51E0;&#x4E2A;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x7C7B;&#x5E93;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install @types/react react react-dom --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">npm</span> install @types/react react react-dom --save</code></pre><p>&#x57FA;&#x7840;&#x7C7B;&#x5E93;&#x5B89;&#x88C5;&#x5B8C;&#x6BD5;&#xFF0C;&#x5F00;&#x59CB;&#x6784;&#x5EFA;webpack&#x914D;&#x7F6E;</p><p>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x76EE;&#x5F55;config&#xFF0C;config&#x4E0B;&#x9762;&#x65B0;&#x589E;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x540D;&#x5B57;&#x53EB;&#x505A;webpack.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require(&apos;path&apos;)

module.exports = {
    entry: {
        main: path.resolve(__dirname, &apos;../src/index.tsx&apos;)
    },
    output: {
        filename: &apos;[name].js&apos;
    },
    resolve: {
        extensions: [&quot;.ts&quot;, &quot;.tsx&quot;, &quot;.js&quot;, &quot;.json&quot;]
    },
    module: {
        rules: [
            {test: /\.tsx?$/, use: [&apos;awesome-typescript-loader&apos;]}
        ]
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)

<span class="hljs-built_in">module</span>.exports = {
    entry: {
        main: path.resolve(__dirname, <span class="hljs-string">&apos;../src/index.tsx&apos;</span>)
    },
    output: {
        filename: <span class="hljs-string">&apos;[name].js&apos;</span>
    },
    resolve: {
        extensions: [<span class="hljs-string">&quot;.ts&quot;</span>, <span class="hljs-string">&quot;.tsx&quot;</span>, <span class="hljs-string">&quot;.js&quot;</span>, <span class="hljs-string">&quot;.json&quot;</span>]
    },
    <span class="hljs-keyword">module</span>: {
        rules: [
            {test: <span class="hljs-regexp">/\.tsx?$/</span>, use: [<span class="hljs-string">&apos;awesome-typescript-loader&apos;</span>]}
        ]
    }
}</code></pre><p>&#x8FD8;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;index.html&#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id=&quot;root&quot;&gt;&lt;/div&gt;
    &lt;script src=&quot;./dist/main.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;root&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./dist/main.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p><em>&#x4EE5;&#x4E0A;&#x73AF;&#x5883;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x6781;&#x7B80;&#x5355;&#x7684;&#x73AF;&#x5883;&#xFF0C;&#x771F;&#x5B9E;&#x73AF;&#x5883;&#x8981;&#x6BD4;&#x8FD9;&#x4E2A;&#x590D;&#x6742;&#x7684;&#x591A;</em>&#x3002;</p><p>&#x597D;&#x4E86;&#xFF0C;&#x8A00;&#x5F52;&#x6B63;&#x4F20;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x662F;&#x805A;&#x7126;&#x5230;&#x65E5;&#x5386;&#x7EC4;&#x4EF6;&#x7684;&#x5F00;&#x53D1;&#x4E2D;&#x6765;&#x5427;</p><p>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;src&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5185;&#x90E8;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;index.tsx&#x6587;&#x4EF6;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5F88;&#x7B80;&#x5355;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6302;&#x8F7D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as React from &apos;react&apos;
import * as ReactDOM from &apos;react-dom&apos;

ReactDOM.render((
  &lt;div&gt;
    test
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>

ReactDOM.render((
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    test
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
), <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;root&apos;</span>))
</code></pre><p>ok&#xFF0C;&#x6253;&#x5F00;&#x9875;&#x9762;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x9875;&#x9762;&#x6B63;&#x5E38;&#x663E;&#x793A;&#x4E86;test&#x5B57;&#x6837;&#x3002;</p><p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x521B;&#x5EFA;Calendar&#x7EC4;&#x4EF6;&#x4E86;&#x3002;</p><p>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;components&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5185;&#x90E8;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;Calendar.tsx&#x6587;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as React from &apos;react&apos;

export default class Calendar extends React.Component {
  render() {
   
    return (&lt;div&gt;
        &#x65E5;&#x5386;
    &lt;/div&gt;)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> * as <span class="hljs-type">React</span> from <span class="hljs-symbol">&apos;reac</span>t&apos;

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Calendar</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
   
    <span class="hljs-keyword">return</span> (&lt;div&gt;
        &#x65E5;&#x5386;
    &lt;/div&gt;)
  }
}</code></pre><p>&#x5728;index.tsx&#x4E2D;&#x628A;Calendar.tsx&#x5F15;&#x5165;&#xFF0C;&#x5E76;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x3002;&#x4E8E;&#x662F;index.tsx&#x53D8;&#x6210;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as React from &apos;react&apos;
import * as ReactDOM from &apos;react-dom&apos;
import Calendar from &apos;./components/Calendar&apos;

ReactDOM.render((
  &lt;div&gt;
    &lt;Calendar/&gt;
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>
<span class="hljs-keyword">import</span> Calendar <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/Calendar&apos;</span>

ReactDOM.render((
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Calendar</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
), <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;root&apos;</span>))</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x9875;&#x9762;&#x663E;&#x793A;&#x4E86;&#x65E5;&#x5386;&#x5B57;&#x6837;&#x3002;</p><p>&#x8981;&#x663E;&#x793A;&#x65E5;&#x5386;&#xFF0C;&#x9996;&#x5148;&#x9700;&#x8981;&#x663E;&#x793A;&#x65E5;&#x5386;&#x8FD9;&#x4E2A;&#x5927;&#x6846;&#x4EE5;&#x53CA;&#x5185;&#x90E8;&#x7684;&#x4E00;&#x4E2A;&#x4E2A;&#x5C0F;&#x6846;&#x3002;&#x5B9E;&#x73B0;&#x8FD9;&#x79CD;&#x5E03;&#x5C40;&#x6700;&#x7B80;&#x5355;&#x7684;&#x5E03;&#x5C40;&#x5C31;&#x662F;table&#x4E86;</p><p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x521B;&#x5EFA;&#x7684;&#x662F;&#x8FD9;&#x79CD;&#x65E5;&#x5386;table&#x5C0F;&#x6846;&#x6846;&#xFF0C;&#x4EE5;&#x53CA;&#x8868;&#x5934;&#x7684;&#x661F;&#x671F;&#x6392;&#x5217;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as React from &apos;react&apos;

const WEEK_NAMES = [&apos;&#x65E5;&apos;, &apos;&#x4E00;&apos;, &apos;&#x4E8C;&apos;, &apos;&#x4E09;&apos;, &apos;&#x56DB;&apos;, &apos;&#x4E94;&apos;, &apos;&#x516D;&apos;]
const LINES = [1,2,3,4,5,6]

export default class Calendar extends React.Component {
  render() {
    return (&lt;div&gt;
      &lt;table cellPadding={0} cellSpacing={0} className=&quot;table&quot;&gt;
        &lt;thead&gt;
        &lt;tr&gt;
          {
            WEEK_NAMES.map((week, key) =&gt; {
              return &lt;td key={key}&gt;{week}&lt;/td&gt;
            })
          }
        &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;
        {
          LINES.map((l, key) =&gt; {
            return &lt;tr key={key}&gt;
              {
                WEEK_NAMES.map((week, index) =&gt; {
                  return &lt;td key={index}&gt;{index}&lt;/td&gt;
                })
              }
            &lt;/tr&gt;
          })
        }
        &lt;/tbody&gt;
      &lt;/table&gt;
    &lt;/div&gt;)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>

<span class="hljs-keyword">const</span> WEEK_NAMES = [<span class="hljs-string">&apos;&#x65E5;&apos;</span>, <span class="hljs-string">&apos;&#x4E00;&apos;</span>, <span class="hljs-string">&apos;&#x4E8C;&apos;</span>, <span class="hljs-string">&apos;&#x4E09;&apos;</span>, <span class="hljs-string">&apos;&#x56DB;&apos;</span>, <span class="hljs-string">&apos;&#x4E94;&apos;</span>, <span class="hljs-string">&apos;&#x516D;&apos;</span>]
<span class="hljs-keyword">const</span> LINES = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Calendar</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">cellPadding</span>=<span class="hljs-string">{0}</span> <span class="hljs-attr">cellSpacing</span>=<span class="hljs-string">{0}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;table&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
          {
            WEEK_NAMES.map((week, key) =&gt; {
              return <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{key}</span>&gt;</span>{week}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            })
          }
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
        {
          LINES.map((l, key) =&gt; {
            return <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{key}</span>&gt;</span>
              {
                WEEK_NAMES.map((week, index) =&gt; {
                  return <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>{index}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                })
              }
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
          })
        }
        <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)
  }
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E86;&#x4E00;&#x4E2A;&#x661F;&#x671F;&#x6570;&#x7EC4;&#x4F5C;&#x4E3A;&#x8868;&#x5934;&#xFF0C;&#x6211;&#x4EEC;&#x6309;&#x7167;&#x60EF;&#x4F8B;&#x662F;&#x4ECE;&#x5468;&#x65E5;&#x5F00;&#x59CB;&#x7684;&#x3002;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x4ECE;&#x5176;&#x4ED6;&#x661F;&#x671F;&#x5F00;&#x59CB;&#xFF0C;&#x4E0D;&#x8FC7;&#x4F1A;&#x5BF9;&#x4E0B;&#x9762;&#x7684;&#x65E5;&#x671F;&#x663E;&#x793A;&#x6709;&#x5F71;&#x54CD;&#xFF0C;&#x56E0;&#x4E3A;&#x6BCF;&#x4E2A;&#x6708;&#x7684;&#x7B2C;&#x4E00;&#x5929;&#x662F;&#x5468;&#x51E0;&#x51B3;&#x5B9A;&#x7B2C;&#x4E00;&#x5929;&#x663E;&#x793A;&#x5728;&#x7B2C;&#x51E0;&#x4E2A;&#x683C;&#x5B50;&#x91CC;&#x3002;</p><p>&#x90A3;&#x4E3A;&#x4EC0;&#x4E48;&#x884C;&#x6570;&#x8981;6&#x884C;&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x662F;&#x6309;&#x7167;&#x6700;&#x5927;&#x884C;&#x6570;&#x6765;&#x786E;&#x5B9A;&#x8868;&#x683C;&#x7684;&#x884C;&#x6570;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x6708;&#x6709;31&#x5929;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;&#x6708;&#x7684;&#x7B2C;&#x4E00;&#x5929;&#x521A;&#x597D;&#x662F;&#x5468;&#x516D;&#x3002;&#x5C31;&#x80AF;&#x5B9A;&#x4F1A;&#x663E;&#x793A;6&#x884C;&#x4E86;&#x3002;</p><p>&#x4E3A;&#x4E86;&#x663E;&#x793A;&#x597D;&#x770B;&#xFF0C;&#x6211;&#x76F4;&#x63A5;&#x5199;&#x597D;&#x4E86;&#x6837;&#x5F0F;&#x653E;&#x7F6E;&#x5728;index.html&#x4E2D;&#x4E86;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E0D;&#x91CD;&#x8981;&#xFF0C;&#x4E0D;&#x8BB2;&#x89E3;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;style type=&quot;text/css&quot;&gt;
        * {
            margin: 0;
            padding: 0;
        }
        .table {
            border-collapse:collapse;
            border-spacing:0;
        }
        .table td{
            border: 1px solid #ddd;
            padding: 10px;
        }
        .table caption .caption-header{
            border-top: 1px solid #ddd;
            border-right: 1px solid #ddd;
            border-left: 1px solid #ddd;
            padding: 10px;
            display: flex;
            justify-content: space-between;
        }
        .table caption .caption-header .arrow {
            cursor: pointer;
            font-family: &quot;&#x5B8B;&#x4F53;&quot;;
            transition: all 0.3s;
        }
        .table caption .caption-header .arrow:hover {
            opacity:0.7;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id=&quot;root&quot;&gt;&lt;/div&gt;
    &lt;script src=&quot;./dist/main.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span>&gt;</span><span class="css">
        * {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.table</span> {
            <span class="hljs-attribute">border-collapse</span>:collapse;
            <span class="hljs-attribute">border-spacing</span>:<span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.table</span> <span class="hljs-selector-tag">td</span>{
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
        }
        <span class="hljs-selector-class">.table</span> <span class="hljs-selector-tag">caption</span> <span class="hljs-selector-class">.caption-header</span>{
            <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>;
            <span class="hljs-attribute">border-right</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>;
            <span class="hljs-attribute">border-left</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">justify-content</span>: space-between;
        }
        <span class="hljs-selector-class">.table</span> <span class="hljs-selector-tag">caption</span> <span class="hljs-selector-class">.caption-header</span> <span class="hljs-selector-class">.arrow</span> {
            <span class="hljs-attribute">cursor</span>: pointer;
            <span class="hljs-attribute">font-family</span>: <span class="hljs-string">&quot;&#x5B8B;&#x4F53;&quot;</span>;
            <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.3s</span>;
        }
        <span class="hljs-selector-class">.table</span> <span class="hljs-selector-tag">caption</span> <span class="hljs-selector-class">.caption-header</span> <span class="hljs-selector-class">.arrow</span><span class="hljs-selector-pseudo">:hover</span> {
            <span class="hljs-attribute">opacity</span>:<span class="hljs-number">0.7</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;root&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./dist/main.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x4E0B;&#x9762;&#x5C31;&#x8981;&#x5F00;&#x59CB;&#x663E;&#x793A;&#x65E5;&#x671F;&#x4E86;&#xFF0C;&#x9996;&#x5148;&#x8981;&#x628A;&#x5F53;&#x524D;&#x6708;&#x4EFD;&#x7684;&#x65E5;&#x671F;&#x663E;&#x793A;&#x51FA;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x5728;&#x7EC4;&#x4EF6;&#x7684;state&#x4E2D;&#x5B9A;&#x4E49;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="state = {
    month: 0,
    year: 0,
    currentDate: new Date()
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code><span class="hljs-keyword">state</span> = {
    month: <span class="hljs-number">0</span>,
    year: <span class="hljs-number">0</span>,
    currentDate: new Date()
}</code></pre><p>&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x5E74;&#x6708;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x9700;&#x8981;&#x83B7;&#x53D6;&#x65E5;&#xFF0C;&#x56E0;&#x4E3A;&#x65E5;&#x5386;&#x90FD;&#x662F;&#x6309;&#x6708;&#x663E;&#x793A;&#x7684;&#x3002;&#x83B7;&#x53D6;&#x65E5;&#x73B0;&#x5728;&#x770B;&#x6765;&#x5BF9;&#x6211;&#x4EEC;&#x6CA1;&#x6709;&#x610F;&#x4E49;&#xFF0C;&#x4E8E;&#x662F;&#x65B0;&#x589E;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x8BBE;&#x7F6E;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x7684;&#x5E74;&#x6708;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setCurrentYearMonth(date) {
    var month = Calendar.getMonth(date)
    var year = Calendar.getFullYear(date)
    this.setState({
      month,
      year
    })
}

static getMonth(date: Date): number{
    return date.getMonth()
}

static getFullYear(date: Date): number{
    return date.getFullYear()
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>setCurrentYearMonth(<span class="hljs-built_in">date</span>) {
    var <span class="hljs-built_in">month</span> = Calendar.getMonth(<span class="hljs-built_in">date</span>)
    var <span class="hljs-built_in">year</span> = Calendar.getFullYear(<span class="hljs-built_in">date</span>)
    this.setState({
      <span class="hljs-built_in">month</span>,
      <span class="hljs-built_in">year</span>
    })
}

static getMonth(<span class="hljs-built_in">date</span>: Date): <span class="hljs-built_in">number</span>{
<span class="hljs-built_in">    return</span> <span class="hljs-built_in">date</span>.getMonth()
}

static getFullYear(<span class="hljs-built_in">date</span>: Date): <span class="hljs-built_in">number</span>{
<span class="hljs-built_in">    return</span> <span class="hljs-built_in">date</span>.getFullYear()
}</code></pre><p>&#x521B;&#x5EFA;&#x4E24;&#x4E2A;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x5E74;&#x6708;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x662F;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#xFF0C;&#x56E0;&#x4E3A;&#x4E0E;&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#x65E0;&#x5173;&#xFF0C;&#x6700;&#x597D;&#x653E;&#x5230;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x4E0A;&#x53BB;&#x3002;</p><p>&#x8981;&#x60F3;&#x7ED8;&#x5236;&#x4E00;&#x4E2A;&#x6708;&#x8FD8;&#x9700;&#x8981;&#x77E5;&#x9053;&#x4E00;&#x4E2A;&#x6708;&#x7684;&#x5929;&#x6570;&#x5427;&#xFF0C;&#x624D;&#x597D;&#x7ED8;&#x5236;&#x5427;</p><p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x6765;&#x8868;&#x793A;&#x6708;&#x4EFD;&#x7684;&#x5929;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]  // &#x6682;&#x5B9A;2&#x6708;&#x4EFD;28&#x5929;&#x5427;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>const MONTH_DAYS = [<span class="hljs-number">31</span>, <span class="hljs-number">28</span>, <span class="hljs-number">31</span>, <span class="hljs-number">30</span>, <span class="hljs-number">31</span>, <span class="hljs-number">30</span>, <span class="hljs-number">31</span>, <span class="hljs-number">31</span>, <span class="hljs-number">30</span>, <span class="hljs-number">31</span>, <span class="hljs-number">30</span>, <span class="hljs-number">31</span>]  <span class="hljs-comment">// &#x6682;&#x5B9A;2&#x6708;&#x4EFD;28&#x5929;&#x5427;</span>
</code></pre><p>&#x7EC4;&#x4EF6;&#x4E0A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x6839;&#x636E;&#x6708;&#x4EFD;&#x83B7;&#x53D6;&#x5929;&#x6570;&#xFF0C;&#x4E5F;&#x662F;&#x9759;&#x6001;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="static getCurrentMonthDays(month: number): number {
    return MONTH_DAYS[month]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>static getCurrentMonthDays(<span class="hljs-built_in">month</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
<span class="hljs-built_in">    return</span> MONTH_DAYS[<span class="hljs-built_in">month</span>]
}</code></pre><p>&#x4E0B;&#x9762;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x5C31;&#x662F;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x6708;&#x4EFD;&#x7B2C;&#x4E00;&#x5929;&#x662F;&#x5468;&#x51E0;&#xFF0C;&#x8FD9;&#x6837;&#x5B50;&#x5C31;&#x53EF;&#x4EE5;&#x51B3;&#x5B9A;&#x628A;&#x7B2C;&#x4E00;&#x5929;&#x7ED8;&#x5236;&#x5728;&#x54EA;&#x91CC;&#x4E86;&#x3002;&#x9996;&#x5148;&#x8981;&#x6839;&#x636E;&#x5E74;&#x6708;&#x7684;&#x7B2C;&#x4E00;&#x5929;&#x83B7;&#x5F97;date&#xFF0C;&#x6839;&#x636E;&#x8FD9;&#x4E2A;date&#x83B7;&#x53D6;&#x5468;&#x51E0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="static getDateByYearMonth(year: number, month: number, day: number=1): Date {
    var date = new Date()
    date.setFullYear(year)
    date.setMonth(month, day)
    return date
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>static getDateByYearMonth(<span class="hljs-built_in">year</span>: <span class="hljs-built_in">number</span>, <span class="hljs-built_in">month</span>: <span class="hljs-built_in">number</span>, <span class="hljs-built_in">day</span>: <span class="hljs-built_in">number</span>=<span class="hljs-number">1</span>): Date {
    var <span class="hljs-built_in">date</span> = new Date()
    <span class="hljs-built_in">date</span>.setFullYear(<span class="hljs-built_in">year</span>)
    <span class="hljs-built_in">date</span>.setMonth(<span class="hljs-built_in">month</span>, <span class="hljs-built_in">day</span>)
<span class="hljs-built_in">    return</span> <span class="hljs-built_in">date</span>
  }</code></pre><p>&#x8FD9;&#x91CC;&#x83B7;&#x5F97;&#x6BCF;&#x4E2A;&#x6708;&#x7684;&#x7B2C;&#x4E00;&#x5929;&#x662F;&#x5468;&#x51E0;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="static getWeeksByFirstDay(year: number, month: number): number {
    var date = Calendar.getDateByYearMonth(year, month)
    return date.getDay()
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>static getWeeksByFirstDay(<span class="hljs-built_in">year</span>: <span class="hljs-built_in">number</span>, <span class="hljs-built_in">month</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
    var <span class="hljs-built_in">date</span> = Calendar.getDateByYearMonth(<span class="hljs-built_in">year</span>, <span class="hljs-built_in">month</span>)
<span class="hljs-built_in">    return</span> <span class="hljs-built_in">date</span>.getDay()
  }</code></pre><p>&#x597D;&#x4E86;&#xFF0C;&#x5F00;&#x59CB;&#x5728;&#x6846;&#x5B50;&#x63D2;&#x5165;&#x65E5;&#x671F;&#x6570;&#x5B57;&#x4E86;&#x3002;&#x56E0;&#x4E3A;&#x6BCF;&#x4E2A;&#x65E5;&#x671F;&#x90FD;&#x662F;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E8C;&#x7EF4;&#x6570;&#x7EC4;&#x53EF;&#x4EE5;&#x5148;&#x8BA1;&#x7B97;&#x597D;&#xFF0C;&#x6216;&#x8005;&#x901A;&#x8FC7;&#x51FD;&#x6570;&#x76F4;&#x63A5;&#x63D2;&#x5165;&#x5230;jsx&#x4E2D;&#x95F4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="static getDayText(line: number, weekIndex: number, weekDay: number, monthDays: number): any {
    var number = line * 7 + weekIndex - weekDay + 1
    if ( number &lt;= 0 || number &gt; monthDays ) {
      return &lt;span&gt;&amp;nbsp;&lt;/span&gt;
    }

    return number
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs autoit"><code><span class="hljs-keyword">static</span> getDayText(line: <span class="hljs-built_in">number</span>, weekIndex: <span class="hljs-built_in">number</span>, weekDay: <span class="hljs-built_in">number</span>, monthDays: <span class="hljs-built_in">number</span>): any {
    var <span class="hljs-built_in">number</span> = line * <span class="hljs-number">7</span> + weekIndex - weekDay + <span class="hljs-number">1</span>
    <span class="hljs-keyword">if</span> ( <span class="hljs-built_in">number</span> &lt;= <span class="hljs-number">0</span> || <span class="hljs-built_in">number</span> &gt; monthDays ) {
      <span class="hljs-keyword">return</span> &lt;span&gt;&amp;nbsp<span class="hljs-comment">;&lt;/span&gt;</span>
    }

    <span class="hljs-keyword">return</span> <span class="hljs-built_in">number</span>
  }</code></pre><p>&#x770B;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x9700;&#x8981;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#x54C8;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x884C;&#x6570;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x5217;&#x6570;&#xFF08;&#x5468;&#x51E0;&#xFF09;&#xFF0C;&#x672C;&#x6708;&#x7B2C;&#x4E00;&#x5929;&#x662F;&#x5468;&#x51E0;&#xFF0C;&#x672C;&#x6708;&#x5929;&#x6570;&#x3002;<code>line * 7 + weekIndex</code>&#x8868;&#x793A;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x672C;&#x6765;&#x662F;&#x51E0;&#xFF0C;&#x51CF;&#x53BB;&#x672C;&#x6708;&#x7B2C;&#x4E00;&#x5929;&#x661F;&#x671F;&#x6570;&#x5B57;&#x3002;&#x4E3A;&#x4EC0;&#x4E48;+1&#xFF0C;&#x56E0;&#x4E3A;&#x7D22;&#x5F15;&#x662F;&#x4ECE;0&#x5F00;&#x59CB;&#x7684;&#xFF0C;&#x800C;&#x5929;&#x6570;&#x5219;&#x662F;&#x4ECE;1&#x5F00;&#x59CB;&#x3002;&#x90A3;&#x4E48;<code>&lt;0 || &gt;&#x672C;&#x6708;&#x6700;&#x5927;&#x5929;&#x6570;&#x7684;</code>&#x5219;&#x8FC7;&#x6EE4;&#x6389;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7A7A;span&#xFF0C;&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x6491;&#x5F00;td&#x3002;&#x5176;&#x4ED6;&#x5219;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x6570;&#x5B57;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import * as React from &apos;react&apos;

const WEEK_NAMES = [&apos;&#x65E5;&apos;, &apos;&#x4E00;&apos;, &apos;&#x4E8C;&apos;, &apos;&#x4E09;&apos;, &apos;&#x56DB;&apos;, &apos;&#x4E94;&apos;, &apos;&#x516D;&apos;]
const LINES = [1,2,3,4,5,6]
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export default class Calendar extends React.Component {
  state = {
    month: 0,
    year: 0,
    currentDate: new Date()
  }

  componentWillMount() {
    this.setCurrentYearMonth(this.state.currentDate)
  }

  setCurrentYearMonth(date) {
    var month = Calendar.getMonth(date)
    var year = Calendar.getFullYear(date)
    this.setState({
      month,
      year
    })
  }

  static getMonth(date: Date): number{
    return date.getMonth()
  }

  static getFullYear(date: Date): number{
    return date.getFullYear()
  }

  static getCurrentMonthDays(month: number): number {
    return MONTH_DAYS[month]
  }

  static getWeeksByFirstDay(year: number, month: number): number {
    var date = Calendar.getDateByYearMonth(year, month)
    return date.getDay()
  }

  static getDayText(line: number, weekIndex: number, weekDay: number, monthDays: number): any {
    var number = line * 7 + weekIndex - weekDay + 1
    if ( number &lt;= 0 || number &gt; monthDays ) {
      return &lt;span&gt;&amp;nbsp;&lt;/span&gt;
    }

    return number
  }

  static formatNumber(num: number): string {
    var _num = num + 1
    return _num &lt; 10 ? `0${_num}` : `${_num}`
  }

  static getDateByYearMonth(year: number, month: number, day: number=1): Date {
    var date = new Date()
    date.setFullYear(year)
    date.setMonth(month, day)
    return date
  }

  checkToday(line: number, weekIndex: number, weekDay: number, monthDays: number): Boolean {
    var { year, month } = this.state
    var day = Calendar.getDayText(line, weekIndex, weekDay, monthDays)
    var date = new Date()
    var todayYear = date.getFullYear()
    var todayMonth = date.getMonth()
    var todayDay = date.getDate()

    return year === todayYear &amp;&amp; month === todayMonth &amp;&amp; day === todayDay
  }

  monthChange(monthChanged: number) {
    var { month, year } = this.state
    var monthAfter = month + monthChanged
    var date = Calendar.getDateByYearMonth(year, monthAfter)
    this.setCurrentYearMonth(date)
  }

  render() {
    var { year, month } = this.state
    console.log(this.state)

    var monthDays = Calendar.getCurrentMonthDays(month)
    var weekDay = Calendar.getWeeksByFirstDay(year, month)

    return (&lt;div&gt;
      {this.state.month}
      &lt;table cellPadding={0} cellSpacing={0} className=&quot;table&quot;&gt;
        &lt;caption&gt;
          &lt;div className=&quot;caption-header&quot;&gt;
            &lt;span className=&quot;arrow&quot; onClick={this.monthChange.bind(this, -1)}&gt;&amp;#60;&lt;/span&gt;
            &lt;span&gt;{year} - {Calendar.formatNumber(month)}&lt;/span&gt;
            &lt;span className=&quot;arrow&quot; onClick={this.monthChange.bind(this, 1)}&gt;&amp;gt;&lt;/span&gt;
          &lt;/div&gt;
        &lt;/caption&gt;
        &lt;thead&gt;
          &lt;tr&gt;
            {
              WEEK_NAMES.map((week, key) =&gt; {
                return &lt;td key={key}&gt;{week}&lt;/td&gt;
              })
            }
          &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;
        {
          LINES.map((l, key) =&gt; {
            return &lt;tr key={key}&gt;
              {
                WEEK_NAMES.map((week, index) =&gt; {
                  return &lt;td key={index} style={{color: this.checkToday(key, index, weekDay, monthDays) ? &apos;red&apos; : &apos;#000&apos;}}&gt;
                    {Calendar.getDayText(key, index, weekDay, monthDays)}
                  &lt;/td&gt;
                })
              }
            &lt;/tr&gt;
          })
        }
        &lt;/tbody&gt;
      &lt;/table&gt;
    &lt;/div&gt;)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>

<span class="hljs-keyword">const</span> WEEK_NAMES = [<span class="hljs-string">&apos;&#x65E5;&apos;</span>, <span class="hljs-string">&apos;&#x4E00;&apos;</span>, <span class="hljs-string">&apos;&#x4E8C;&apos;</span>, <span class="hljs-string">&apos;&#x4E09;&apos;</span>, <span class="hljs-string">&apos;&#x56DB;&apos;</span>, <span class="hljs-string">&apos;&#x4E94;&apos;</span>, <span class="hljs-string">&apos;&#x516D;&apos;</span>]
<span class="hljs-keyword">const</span> LINES = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]
<span class="hljs-keyword">const</span> MONTH_DAYS = [<span class="hljs-number">31</span>, <span class="hljs-number">28</span>, <span class="hljs-number">31</span>, <span class="hljs-number">30</span>, <span class="hljs-number">31</span>, <span class="hljs-number">30</span>, <span class="hljs-number">31</span>, <span class="hljs-number">31</span>, <span class="hljs-number">30</span>, <span class="hljs-number">31</span>, <span class="hljs-number">30</span>, <span class="hljs-number">31</span>]

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Calendar</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {
    <span class="hljs-attr">month</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">year</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">currentDate</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
  }

  componentWillMount() {
    <span class="hljs-keyword">this</span>.setCurrentYearMonth(<span class="hljs-keyword">this</span>.state.currentDate)
  }

  setCurrentYearMonth(date) {
    <span class="hljs-keyword">var</span> month = Calendar.getMonth(date)
    <span class="hljs-keyword">var</span> year = Calendar.getFullYear(date)
    <span class="hljs-keyword">this</span>.setState({
      month,
      year
    })
  }

  <span class="hljs-keyword">static</span> getMonth(date: <span class="hljs-built_in">Date</span>): number{
    <span class="hljs-keyword">return</span> date.getMonth()
  }

  <span class="hljs-keyword">static</span> getFullYear(date: <span class="hljs-built_in">Date</span>): number{
    <span class="hljs-keyword">return</span> date.getFullYear()
  }

  <span class="hljs-keyword">static</span> getCurrentMonthDays(month: number): number {
    <span class="hljs-keyword">return</span> MONTH_DAYS[month]
  }

  <span class="hljs-keyword">static</span> getWeeksByFirstDay(year: number, <span class="hljs-attr">month</span>: number): number {
    <span class="hljs-keyword">var</span> date = Calendar.getDateByYearMonth(year, month)
    <span class="hljs-keyword">return</span> date.getDay()
  }

  <span class="hljs-keyword">static</span> getDayText(line: number, <span class="hljs-attr">weekIndex</span>: number, <span class="hljs-attr">weekDay</span>: number, <span class="hljs-attr">monthDays</span>: number): any {
    <span class="hljs-keyword">var</span> number = line * <span class="hljs-number">7</span> + weekIndex - weekDay + <span class="hljs-number">1</span>
    <span class="hljs-keyword">if</span> ( number &lt;= <span class="hljs-number">0</span> || number &gt; monthDays ) {
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&amp;nbsp;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
    }

    <span class="hljs-keyword">return</span> number
  }

  <span class="hljs-keyword">static</span> formatNumber(num: number): string {
    <span class="hljs-keyword">var</span> _num = num + <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> _num &lt; <span class="hljs-number">10</span> ? <span class="hljs-string">`0<span class="hljs-subst">${_num}</span>`</span> : <span class="hljs-string">`<span class="hljs-subst">${_num}</span>`</span>
  }

  <span class="hljs-keyword">static</span> getDateByYearMonth(year: number, <span class="hljs-attr">month</span>: number, <span class="hljs-attr">day</span>: number=<span class="hljs-number">1</span>): <span class="hljs-built_in">Date</span> {
    <span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
    date.setFullYear(year)
    date.setMonth(month, day)
    <span class="hljs-keyword">return</span> date
  }

  checkToday(line: number, <span class="hljs-attr">weekIndex</span>: number, <span class="hljs-attr">weekDay</span>: number, <span class="hljs-attr">monthDays</span>: number): <span class="hljs-built_in">Boolean</span> {
    <span class="hljs-keyword">var</span> { year, month } = <span class="hljs-keyword">this</span>.state
    <span class="hljs-keyword">var</span> day = Calendar.getDayText(line, weekIndex, weekDay, monthDays)
    <span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
    <span class="hljs-keyword">var</span> todayYear = date.getFullYear()
    <span class="hljs-keyword">var</span> todayMonth = date.getMonth()
    <span class="hljs-keyword">var</span> todayDay = date.getDate()

    <span class="hljs-keyword">return</span> year === todayYear &amp;&amp; month === todayMonth &amp;&amp; day === todayDay
  }

  monthChange(monthChanged: number) {
    <span class="hljs-keyword">var</span> { month, year } = <span class="hljs-keyword">this</span>.state
    <span class="hljs-keyword">var</span> monthAfter = month + monthChanged
    <span class="hljs-keyword">var</span> date = Calendar.getDateByYearMonth(year, monthAfter)
    <span class="hljs-keyword">this</span>.setCurrentYearMonth(date)
  }

  render() {
    <span class="hljs-keyword">var</span> { year, month } = <span class="hljs-keyword">this</span>.state
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.state)

    <span class="hljs-keyword">var</span> monthDays = Calendar.getCurrentMonthDays(month)
    <span class="hljs-keyword">var</span> weekDay = Calendar.getWeeksByFirstDay(year, month)

    <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {this.state.month}
      <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">cellPadding</span>=<span class="hljs-string">{0}</span> <span class="hljs-attr">cellSpacing</span>=<span class="hljs-string">{0}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;table&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">caption</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;caption-header&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;arrow&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.monthChange.bind(this,</span> <span class="hljs-attr">-1</span>)}&gt;</span>&amp;#60;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{year} - {Calendar.formatNumber(month)}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;arrow&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.monthChange.bind(this,</span> <span class="hljs-attr">1</span>)}&gt;</span>&amp;gt;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">caption</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            {
              WEEK_NAMES.map((week, key) =&gt; {
                return <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{key}</span>&gt;</span>{week}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
              })
            }
          <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
        {
          LINES.map((l, key) =&gt; {
            return <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{key}</span>&gt;</span>
              {
                WEEK_NAMES.map((week, index) =&gt; {
                  return <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"color:</span> <span class="hljs-attr">this.checkToday</span>(<span class="hljs-attr">key</span>, <span class="hljs-attr">index</span>, <span class="hljs-attr">weekDay</span>, <span class="hljs-attr">monthDays</span>) ? &apos;<span class="hljs-attr">red</span>&apos; <span class="hljs-attr">:</span> &apos;#<span class="hljs-attr">000</span>&apos;}}&gt;</span>
                    {Calendar.getDayText(key, index, weekDay, monthDays)}
                  <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                })
              }
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
          })
        }
        <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)
  }
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6700;&#x7EC8;&#x7684;&#x4EE3;&#x7801;&#x591A;&#x4E86;&#x4E00;&#x4E9B;&#x4E1C;&#x897F;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x52A0;&#x4E86;&#x6708;&#x4EFD;&#x7684;&#x5207;&#x6362;&#x3002;</p><p>&#x8FD8;&#x8BB0;&#x7684;&#x4E0A;&#x6587;&#x6211;&#x4EEC;&#x628A;&#x4E8C;&#x6708;&#x4EFD;&#x5929;&#x6570;&#x5199;28&#x5929;&#x561B;&#xFF1F;&#x8981;&#x4E0D;&#x4F60;&#x4EEC;&#x81EA;&#x5DF1;&#x6539;&#x6539;&#xFF0C;&#x5224;&#x65AD;&#x4E00;&#x4E0B;&#x95F0;&#x5E74;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教会使用react开发日历组件

## 原文链接
[https://segmentfault.com/a/1190000016296697](https://segmentfault.com/a/1190000016296697)

