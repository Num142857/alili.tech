---
title: vue快速入门的三个小实例
hidden: true
categories: [reprint]
slug: cfd5a32d
date: 2018-10-24 08:17:54
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.&#x524D;&#x8A00;</h2>
<p>&#x7528;vue&#x505A;&#x9879;&#x76EE;&#x4E5F;&#x6709;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x4E86;&#xFF0C;&#x4E4B;&#x524D;&#x4E5F;&#x662F;&#x5199;&#x8FC7;&#x5173;&#x4E8E;vue&#x548C;webpack&#x6784;&#x5EFA;&#x9879;&#x76EE;&#x7684;&#x76F8;&#x5173;&#x6587;&#x7AE0;&#xFF0C;&#x5927;&#x5BB6;&#x6709;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x53BB;&#x770B;&#x4E0B;<a href="https://segmentfault.com/a/1190000010025189">webpack+vue&#x9879;&#x76EE;&#x5B9E;&#x6218;&#xFF08;&#x4E00;,&#x642D;&#x5EFA;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x548C;&#x76F8;&#x5173;&#x914D;&#x7F6E;&#xFF09;</a>&#xFF08;&#x8FD9;&#x4E2A;&#x7CFB;&#x5217;&#x4E00;&#x5171;&#x6709;5&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x8FD9;&#x662F;&#x7B2C;&#x4E00;&#x7BC7;&#xFF0C;&#x5176;&#x5B83;&#x51E0;&#x7BC7;&#x6587;&#x7AE0;&#x94FE;&#x63A5;&#x5C31;&#x4E0D;&#x8D34;&#x4E86;&#xFF09;&#x3002;&#x4F46;&#x662F;&#x5173;&#x4E8E;vue&#x5165;&#x95E8;&#x57FA;&#x7840;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x6211;&#x8FD8;&#x6CA1;&#x6709;&#x5199;&#x8FC7;&#xFF0C;&#x90A3;&#x4E48;&#x4ECA;&#x5929;&#x5C31;&#x5199;vue&#x5165;&#x95E8;&#x7684;&#x4E09;&#x4E2A;&#x5C0F;&#x5B9E;&#x4F8B;&#xFF0C;&#x8FD9;&#x4E09;&#x4E2A;&#x5C0F;&#x5B9E;&#x4F8B;&#x662F;&#x6211;&#x521A;&#x63A5;&#x89E6;vue&#x7684;&#x65F6;&#x5019;&#x7684;&#x7EC3;&#x624B;&#x4F5C;&#x54C1;&#xFF0C;&#x96BE;&#x5EA6;&#x4ECE;&#x5F88;&#x7B80;&#x5355;&#x5230;&#x7B80;&#x5355;&#xFF0C;&#x90FD;&#x662F;&#x5165;&#x95E8;&#x7EA7;&#x7684;&#x3002;&#x5E0C;&#x671B;&#x80FD;&#x5E2E;&#x5230;&#x5927;&#x5BB6;&#x66F4;&#x597D;&#x7684;&#x5B66;&#x4E60;&#x548C;&#x4E86;&#x89E3;vue&#xFF0C;&#x4E5F;&#x662F;&#x8BA9;&#x81EA;&#x5DF1;&#x80FD;&#x591F;&#x590D;&#x4E60;&#x4E00;&#x4E0B;vue&#x3002;&#x5982;&#x679C;&#x53D1;&#x73B0;&#x6587;&#x7AE0;&#x5199;&#x5F97;&#x6709;&#x4EC0;&#x4E48;&#x4E0D;&#x597D;&#xFF0C;&#x5199;&#x9519;&#x4E86;&#xFF0C;&#x6216;&#x8005;&#x6709;&#x4EC0;&#x4E48;&#x5EFA;&#x8BAE;&#xFF01;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6307;&#x70B9;&#x8FF7;&#x6D25;&#xFF01;</p>
<blockquote>1.&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#x4F7F;&#x7528;&#x7684;vue&#x7248;&#x672C;&#x662F;<code>2.4.2</code>&#xFF0C;&#x5927;&#x5BB6;&#x8981;&#x6CE8;&#x610F;&#x7248;&#x672C;&#x95EE;&#x9898;<br>2.&#x73B0;&#x5728;&#x6211;&#x4E5F;&#x662F;&#x5047;&#x8BBE;&#x60A8;&#x6709;&#x57FA;&#x7840;&#x7684;html,css,javascript&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x4E5F;&#x5DF2;&#x7ECF;&#x770B;&#x8FC7;&#x4E86;<a href="https://cn.vuejs.org/v2/guide/index.html" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x7F51;</a>&#x7684;&#x57FA;&#x672C;&#x4ECB;&#x7ECD;&#xFF0C;&#x5BF9;vue&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x5927;&#x6982;&#x7684;&#x8BA4;&#x8BC6;&#x4E86;&#xFF0C;&#x4E86;&#x89E3;&#x4E86;&#x5E38;&#x7528;&#x7684;vue&#x6307;&#x4EE4;(v-model,v-show,v-if,v-for,v-on,v-bind&#x7B49;)&#xFF01;&#x5982;&#x679C;&#x521A;&#x63A5;&#x89E6;&#x524D;&#x7AEF;&#x7684;&#x8BDD;&#xFF0C;&#x4F60;&#x770B;&#x7740;&#x6587;&#x7AE0;&#x53EF;&#x80FD;&#x4F1A;&#x8499;&#x5708;&#xFF0C;&#x5EFA;&#x8BAE;&#x5148;&#x5B66;&#x4E60;&#x57FA;&#x7840;&#xFF0C;&#x638C;&#x63E1;&#x4E86;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#x518D;&#x6765;&#x770B;&#xFF01;<br>3.&#x4E0B;&#x9762;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x5EFA;&#x8BAE;&#x5927;&#x5BB6;&#x8FB9;&#x770B;&#x6587;&#x7AE0;&#x8FB9;&#x52A8;&#x624B;&#x505A;&#xFF01;&#x8FD9;&#x6837;&#x601D;&#x8DEF;&#x4F1A;&#x975E;&#x5E38;&#x6E05;&#x6670;&#xFF0C;&#x4E0D;&#x6613;&#x6DF7;&#x4E71;&#xFF01;&#x4E5F;&#x4E0D;&#x4F1A;&#x89C9;&#x5F97;&#x6587;&#x7AE0;&#x957F;&#xFF01;&#x5982;&#x679C;&#x53EA;&#x770B;&#x6587;&#x7AE0;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x672A;&#x5FC5;&#x4F1A;&#x770B;&#x5B8C;&#xFF0C;&#x56E0;&#x4E3A;&#x6587;&#x7AE0;&#x6211;&#x8BB2;&#x5F97;&#x6BD4;&#x8F83;&#x7EC6;&#xFF0C;&#x6BD4;&#x8F83;&#x957F;&#xFF01;<br>4.&#x8FD9;&#x51E0;&#x4E2A;&#x5B9E;&#x4F8B;&#xFF0C;&#x6458;&#x81EA;&#x6211;&#x81EA;&#x5DF1;&#x7684;&#x5E73;&#x5E38;&#x7EC3;&#x4E60;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x63D0;&#x5230;github&#x4E0A;&#x9762;&#x4E86;(<a href="https://github.com/chenhuiYj/demos/tree/master/vue-demos" rel="nofollow noreferrer" target="_blank">vue-demos</a>)&#x3002;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;star&#x3002;&#xFF01;</blockquote>
<h2 id="articleHeader1">2.&#x4EC0;&#x4E48;&#x662F;vue</h2>
<p>vue&#x662F;&#x73B0;&#x5728;&#x5F88;&#x706B;&#x7684;&#x4E00;&#x4E2A;&#x524D;&#x7AEF;MVVM&#x6846;&#x67B6;&#xFF0C;&#x5B83;&#x4EE5;&#x6570;&#x636E;&#x9A71;&#x52A8;&#x548C;&#x7EC4;&#x4EF6;&#x5316;&#x7684;&#x601D;&#x60F3;&#x6784;&#x5EFA;&#xFF0C;&#x4E0E;angular&#x548C;react&#x5E76;&#x79F0;&#x524D;&#x7AEF;&#x4E09;&#x5927;&#x6846;&#x67B6;&#x3002;&#x76F8;&#x6BD4;angular&#x548C;react&#xFF0C;vue&#x66F4;&#x52A0;&#x8F7B;&#x5DE7;&#x3001;&#x9AD8;&#x6027;&#x80FD;&#x3001;&#x4E5F;&#x5F88;&#x5BB9;&#x6613;&#x4E0A;&#x624B;&#x3002;&#x5927;&#x5BB6;&#x4E5F;&#x53EF;&#x4EE5;&#x79FB;&#x6B65;&#xFF0C;&#x770B;&#x4E00;&#x4E0B;vue&#x7684;&#x4ECB;&#x7ECD;&#x548C;&#x6838;&#x5FC3;&#x529F;&#x80FD;<a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x7F51;&#x4ECB;&#x7ECD;</a>&#x3002;&#x7B80;&#x5355;&#x7C97;&#x66B4;&#x7684;&#x7406;&#x89E3;&#x5C31;&#x662F;&#xFF1A;&#x7528;vue&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x662F;&#x64CD;&#x4F5C;&#x6570;&#x636E;&#xFF0C;&#x7136;&#x540E;vue&#x5C31;&#x4F1A;&#x5904;&#x7406;&#xFF0C;&#x4EE5;&#x6570;&#x636E;&#x9A71;&#x52A8;&#x53BB;&#x6539;&#x53D8;DOM&#xFF08;&#x4E0D;&#x77E5;&#x9053;&#x6709;&#x6CA1;&#x6709;&#x7406;&#x89E3;&#x9519;&#xFF0C;&#x7406;&#x89E3;&#x9519;&#x4E86;&#x6307;&#x70B9;&#x4E0B;&#xFF09;&#x3002;<br>&#x4E0B;&#x9762;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684;&#x8BF4;&#x660E;&#x4F8B;&#x5B50;</p>
<p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p>
<p>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
  &lt;p&gt;{{ message }}&lt;/p&gt;
  &lt;input v-model=&quot;message&quot;&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" message "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;message&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: &apos;#app&apos;,
  data: {
    message: &apos;Hello Vue!&apos;
  }
})
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
  <span class="hljs-attribute">data</span>: {
    <span class="hljs-attribute">message</span>: <span class="hljs-string">&apos;Hello Vue!&apos;</span>
  }
})
</code></pre>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer;"></span></p>
<p>&#x76F8;&#x4FE1;&#x4E5F;&#x4E0D;&#x96BE;&#x7406;&#x89E3;&#xFF0C;&#x5C31;&#x662F;<code>input</code>&#x7ED1;&#x5B9A;&#x4E86;<code>message</code>&#x8FD9;&#x4E2A;&#x503C;&#xFF0C;&#x7136;&#x540E;&#x5728;<code>input</code>&#x4FEE;&#x6539;&#x7684;&#x65F6;&#x5019;&#xFF0C;<code>message</code>&#x5C31;&#x6539;&#x4E86;&#xFF0C;&#x7531;&#x4E8E;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#xFF0C;&#x540C;&#x65F6;&#x9875;&#x9762;&#x7684;html&#xFF08;<code>"{{" message "}}"</code>&#xFF09;&#x8FDB;&#x884C;&#x4E86;&#x4FEE;&#x6539;&#xFF01;<br>&#x597D;&#xFF0C;&#x4E0B;&#x9762;&#x8FDB;&#x5165;&#x4F8B;&#x5B50;&#x5B66;&#x4E60;&#xFF01;</p>
<h2 id="articleHeader2">3.&#x9009;&#x9879;&#x5361;</h2>
<h3 id="articleHeader3">&#x8FD0;&#x884C;&#x6548;&#x679C;</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVTsg0?w=684&amp;h=506" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">&#x539F;&#x7406;&#x5206;&#x6790;&#x548C;&#x5B9E;&#x73B0;</h3>
<p>&#x8FD9;&#x4E2A;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x65E0;&#x975E;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x70B9;&#x51FB;&#x5207;&#x6362;&#x663E;&#x793A;&#x800C;&#x5DF2;&#x3002;&#x4F46;&#x662F;&#x5927;&#x5BB6;&#x4E5F;&#x8981;&#x5B9E;&#x73B0;&#x3002;&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x770B;&#x660E;&#x767D;&#x4E86;&#xFF0C;&#x518D;&#x770B;&#x4E0B;&#x9762;&#x4E24;&#x4E2A;&#xFF01;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x5E94;&#x8BE5;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x70ED;&#x8EAB;&#x548C;&#x719F;&#x6089;&#x7684;&#x4F5C;&#x7528;&#xFF01;</p>
<p>&#x8FD9;&#x4E2A;&#x7684;&#x6B65;&#x9AA4;&#x53EA;&#x6709;&#x4E00;&#x6B65;&#xFF0C;&#x539F;&#x7406;&#x4E5F;&#x6CA1;&#x4EC0;&#x4E48;&#x3002;&#x6211;&#x76F4;&#x63A5;&#x5728;&#x4EE3;&#x7801;&#x6253;&#x6CE8;&#x91CA;&#xFF0C;&#x770B;&#x4E86;&#x6CE8;&#x91CA;&#xFF0C;&#x5927;&#x5BB6;&#x5C31;&#x660E;&#x767D;&#x4E86;&#xFF01;</p>
<h3 id="articleHeader5">&#x5B8C;&#x6574;&#x4EE3;&#x7801;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Title&lt;/title&gt;
&lt;/head&gt;
&lt;style&gt;
    body{
        font-family:&quot;Microsoft YaHei&quot;;
    }
    #tab{
        width: 600px;
        margin: 0 auto;
    }
    .tab-tit{
        font-size: 0;
        width: 600px;
    }
    .tab-tit a{
        display: inline-block;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        width: 25%;
        text-align: center;
        background: #ccc;
        color: #333;
        text-decoration: none;
    }
    .tab-tit .cur{
        background: #09f;
        color: #fff;
    }
    .tab-con div{
        border: 1px solid #ccc;
        height: 400px;
        padding-top: 20px;
    }
&lt;/style&gt;
&lt;body&gt;
&lt;div id=&quot;tab&quot;&gt;
    &lt;div class=&quot;tab-tit&quot;&gt;
        &lt;!--&#x70B9;&#x51FB;&#x8BBE;&#x7F6E;curId&#x7684;&#x503C;  &#x5982;&#x679C;curId&#x7B49;&#x4E8E;0&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;a&#x6DFB;&#x52A0;cur&#x7C7B;&#x540D;&#xFF0C;&#x5982;&#x679C;curId&#x7B49;&#x4E8E;1&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;a&#x6DFB;&#x52A0;cur&#x7C7B;&#x540D;&#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#x3002;&#x6DFB;&#x52A0;&#x4E86;cur&#x7C7B;&#x540D;&#xFF0C;a&#x5C31;&#x4F1A;&#x6539;&#x53D8;&#x6837;&#x5F0F; @click,:class ,v-show&#x8FD9;&#x4E09;&#x4E2A;&#x662F;vue&#x5E38;&#x7528;&#x7684;&#x6307;&#x4EE4;&#x6216;&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;--&gt;
        &lt;a href=&quot;javascript:;&quot; @click=&quot;curId=0&quot; :class=&quot;{&apos;cur&apos;:curId===0}&quot;&gt;html&lt;/a&gt;
        &lt;a href=&quot;javascript:;&quot; @click=&quot;curId=1&quot; :class=&quot;{&apos;cur&apos;:curId===1}&quot;&gt;css&lt;/a&gt;
        &lt;a href=&quot;javascript:;&quot; @click=&quot;curId=2&quot; :class=&quot;{&apos;cur&apos;:curId===2}&quot;&gt;javascript&lt;/a&gt;
        &lt;a href=&quot;javascript:;&quot; @click=&quot;curId=3&quot; :class=&quot;{&apos;cur&apos;:curId===3}&quot;&gt;vue&lt;/a&gt;
    &lt;/div&gt;
    &lt;div class=&quot;tab-con&quot;&gt;
        &lt;!--&#x6839;&#x636E;curId&#x7684;&#x503C;&#x663E;&#x793A;div,&#x5982;&#x679C;curId&#x7B49;&#x4E8E;0&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;div&#x663E;&#x793A;&#xFF0C;&#x5176;&#x5B83;&#x4E09;&#x4E2A;div&#x4E0D;&#x663E;&#x793A;&#x3002;&#x5982;&#x679C;curId&#x7B49;&#x4E8E;1&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;div&#x663E;&#x793A;&#xFF0C;&#x5176;&#x5B83;&#x4E09;&#x4E2A;div&#x4E0D;&#x663E;&#x793A;&#x3002;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;--&gt;
        &lt;div v-show=&quot;curId===0&quot;&gt;
            html&lt;br/&gt;
        &lt;/div&gt;
        &lt;div v-show=&quot;curId===1&quot;&gt;
            css
        &lt;/div&gt;
        &lt;div v-show=&quot;curId===2&quot;&gt;
            javascript
        &lt;/div&gt;
        &lt;div v-show=&quot;curId===3&quot;&gt;
            vue
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;script src=&quot;vue.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    new Vue({
        el: &apos;#tab&apos;,
        data: {
            curId: 0
        },
        computed: {},
        methods: {},
        mounted: function () {
        }
    })
&lt;/script&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span>{
        <span class="hljs-attribute">font-family</span>:<span class="hljs-string">&quot;Microsoft YaHei&quot;</span>;
    }
    <span class="hljs-selector-id">#tab</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    }
    <span class="hljs-selector-class">.tab-tit</span>{
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
    }
    <span class="hljs-selector-class">.tab-tit</span> <span class="hljs-selector-tag">a</span>{
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
        <span class="hljs-attribute">text-decoration</span>: none;
    }
    <span class="hljs-selector-class">.tab-tit</span> <span class="hljs-selector-class">.cur</span>{
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    }
    <span class="hljs-selector-class">.tab-con</span> <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
        <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">20px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;tab&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tab-tit&quot;</span>&gt;</span>
        <span class="hljs-comment">&lt;!--&#x70B9;&#x51FB;&#x8BBE;&#x7F6E;curId&#x7684;&#x503C;  &#x5982;&#x679C;curId&#x7B49;&#x4E8E;0&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;a&#x6DFB;&#x52A0;cur&#x7C7B;&#x540D;&#xFF0C;&#x5982;&#x679C;curId&#x7B49;&#x4E8E;1&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;a&#x6DFB;&#x52A0;cur&#x7C7B;&#x540D;&#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#x3002;&#x6DFB;&#x52A0;&#x4E86;cur&#x7C7B;&#x540D;&#xFF0C;a&#x5C31;&#x4F1A;&#x6539;&#x53D8;&#x6837;&#x5F0F; @click,:class ,v-show&#x8FD9;&#x4E09;&#x4E2A;&#x662F;vue&#x5E38;&#x7528;&#x7684;&#x6307;&#x4EE4;&#x6216;&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;curId=0&quot;</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;{&apos;cur&apos;:curId===0}&quot;</span>&gt;</span>html<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;curId=1&quot;</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;{&apos;cur&apos;:curId===1}&quot;</span>&gt;</span>css<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;curId=2&quot;</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;{&apos;cur&apos;:curId===2}&quot;</span>&gt;</span>javascript<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;curId=3&quot;</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;{&apos;cur&apos;:curId===3}&quot;</span>&gt;</span>vue<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tab-con&quot;</span>&gt;</span>
        <span class="hljs-comment">&lt;!--&#x6839;&#x636E;curId&#x7684;&#x503C;&#x663E;&#x793A;div,&#x5982;&#x679C;curId&#x7B49;&#x4E8E;0&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;div&#x663E;&#x793A;&#xFF0C;&#x5176;&#x5B83;&#x4E09;&#x4E2A;div&#x4E0D;&#x663E;&#x793A;&#x3002;&#x5982;&#x679C;curId&#x7B49;&#x4E8E;1&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;div&#x663E;&#x793A;&#xFF0C;&#x5176;&#x5B83;&#x4E09;&#x4E2A;div&#x4E0D;&#x663E;&#x793A;&#x3002;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">&quot;curId===0&quot;</span>&gt;</span>
            html<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">&quot;curId===1&quot;</span>&gt;</span>
            css
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">&quot;curId===2&quot;</span>&gt;</span>
            javascript
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">&quot;curId===3&quot;</span>&gt;</span>
            vue
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;vue.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">&apos;#tab&apos;</span>,
        data: {
            curId: <span class="hljs-number">0</span>
        },
        computed: {},
        methods: {},
        mounted: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<h2 id="articleHeader6">4.&#x7EDF;&#x8BA1;&#x603B;&#x4EF7;</h2>
<h3 id="articleHeader7">&#x8FD0;&#x884C;&#x6548;&#x679C;</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVTmTo?w=1224&amp;h=744" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">&#x539F;&#x7406;&#x5206;&#x6790;&#x548C;&#x5B9E;&#x73B0;</h3>
<p>&#x9996;&#x5148;&#xFF0C;&#x8FD8;&#x662F;&#x5148;&#x628A;&#x5E03;&#x5C40;&#x5199;&#x597D;&#xFF0C;&#x548C;&#x5F15;&#x5165;vue&#xFF0C;&#x51C6;&#x5907;vue&#x5B9E;&#x4F8B;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Title&lt;/title&gt;
    &lt;style&gt;
        .fl{
            float: left;
        }
        .fr{
            float: right;
        }
       blockquote, body, dd, div, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, img, input, li, ol, p, table, td, textarea, th, ul {
            margin: 0;
            padding: 0;
        }
       .clearfix{
          zoom: 1;
       }
        .clearfix:after {
            clear: both;
        }
        .clearfix:after {
            content: &apos;.&apos;;
            display: block;
            overflow: hidden;
            visibility: hidden;
            font-size: 0;
            line-height: 0;
            width: 0;
            height: 0;
        }
        a{
            text-decoration: none;
            color: #333;
        }
        img{vertical-align: middle;}
        .page-shopping-cart {
            width: 1200px;
            margin: 50px auto;
            font-size: 14px;
            border: 1px solid #e3e3e3;
            border-top: 2px solid #317ee7; }
        .page-shopping-cart .cart-title {
            color: #317ee7;
            font-size: 16px;
            text-align: left;
            padding-left: 20px;
            line-height: 68px; }
        .page-shopping-cart .red-text {
            color: #e94826; }
        .page-shopping-cart .check-span {
            display: block;
            width: 24px;
            height: 20px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat 0 0; }
        .page-shopping-cart .check-span.check-true {
            background: url(&quot;shopping_cart.png&quot;) no-repeat 0 -22px; }
        .page-shopping-cart .td-check {
            width: 70px; }
        .page-shopping-cart .td-product {
            width: 460px; }
        .page-shopping-cart .td-num, .page-shopping-cart .td-price, .page-shopping-cart .td-total {
            width: 160px; }
        .page-shopping-cart .td-do {
            width: 150px; }
        .page-shopping-cart .cart-product-title {
            text-align: center;
            height: 38px;
            line-height: 38px;
            padding: 0 20px;
            background: #f7f7f7;
            border-top: 1px solid #e3e3e3;
            border-bottom: 1px solid #e3e3e3; }
        .page-shopping-cart .cart-product-title .td-product {
            text-align: center;
            font-size: 14px; }
        .page-shopping-cart .cart-product-title .td-check {
            text-align: left; }
        .page-shopping-cart .cart-product-title .td-check .check-span {
            margin: 9px 6px 0 0; }
        .page-shopping-cart .cart-product {
            padding: 0 20px;
            text-align: center; }
        .page-shopping-cart .cart-product table {
            width: 100%;
            text-align: center;
            font-size: 14px; }
        .page-shopping-cart .cart-product table td {
            padding: 20px 0; }
        .page-shopping-cart .cart-product table tr {
            border-bottom: 1px dashed #e3e3e3; }
        .page-shopping-cart .cart-product table tr:last-child {
            border-bottom: none; }
        .page-shopping-cart .cart-product table .product-num {
            border: 1px solid #e3e3e3;
            display: inline-block;
            text-align: center; }
        .page-shopping-cart .cart-product table .product-num .num-do {
            width: 24px;
            height: 28px;
            display: block;
            background: #f7f7f7; }
        .page-shopping-cart .cart-product table .product-num .num-reduce span {
            background: url(&quot;shopping_cart.png&quot;) no-repeat -40px -22px;
            display: block;
            width: 6px;
            height: 2px;
            margin: 13px auto 0 auto; }
        .page-shopping-cart .cart-product table .product-num .num-add span {
            background: url(&quot;shopping_cart.png&quot;) no-repeat -60px -22px;
            display: block;
            width: 8px;
            height: 8px;
            margin: 10px auto 0 auto; }
        .page-shopping-cart .cart-product table .product-num .num-input {
            width: 42px;
            height: 28px;
            line-height: 28px;
            border: none;
            text-align: center; }
        .page-shopping-cart .cart-product table .td-product {
            text-align: left;
            font-size: 12px;
            line-height: 20px; }
        .page-shopping-cart .cart-product table .td-product img {
            border: 1px solid #e3e3e3;
            margin-right: 10px; }
        .page-shopping-cart .cart-product table .td-product .product-info {
            display: inline-block;
            vertical-align: middle; }
        .page-shopping-cart .cart-product table .td-do {
            font-size: 12px; }
        .page-shopping-cart .cart-product-info {
            height: 50px;
            line-height: 50px;
            background: #f7f7f7;
            padding-left: 20px; }
        .page-shopping-cart .cart-product-info .delect-product {
            color: #666; }
        .page-shopping-cart .cart-product-info .delect-product span {
            display: inline-block;
            vertical-align: top;
            margin: 18px 8px 0 0;
            width: 13px;
            height: 15px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -60px 0; }
        .page-shopping-cart .cart-product-info .product-total {
            font-size: 14px;
            color: #e94826; }
        .page-shopping-cart .cart-product-info .product-total span {
            font-size: 20px; }
        .page-shopping-cart .cart-product-info .check-num {
            color: #333; }
        .page-shopping-cart .cart-product-info .check-num span {
            color: #e94826; }
        .page-shopping-cart .cart-product-info .keep-shopping {
            color: #666;
            margin-left: 40px; }
        .page-shopping-cart .cart-product-info .keep-shopping span {
            display: inline-block;
            vertical-align: top;
            margin: 18px 8px 0 0;
            width: 15px;
            height: 15px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -40px 0; }
        .page-shopping-cart .cart-product-info .btn-buy {
            height: 50px;
            color: #fff;
            font-size: 20px;
            display: block;
            width: 110px;
            background: #ff7700;
            text-align: center;
            margin-left: 30px; }
        .page-shopping-cart .cart-worder {
            padding: 20px; }
        .page-shopping-cart .cart-worder .choose-worder {
            color: #fff;
            display: block;
            background: #39e;
            width: 140px;
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            text-align: center;
            margin-right: 20px; }
        .page-shopping-cart .cart-worder .choose-worder span {
            display: inline-block;
            vertical-align: top;
            margin: 9px 10px 0 0;
            width: 22px;
            height: 22px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -92px 0; }
        .page-shopping-cart .cart-worder .worker-info {
            color: #666; }
        .page-shopping-cart .cart-worder .worker-info img {
            border-radius: 100%;
            margin-right: 10px; }
        .page-shopping-cart .cart-worder .worker-info span {
            color: #000; }

        .choose-worker-box {
            width: 620px;
            background: #fff; }
        .choose-worker-box .box-title {
            height: 40px;
            line-height: 40px;
            background: #F7F7F7;
            text-align: center;
            position: relative;
            font-size: 14px; }
        .choose-worker-box .box-title a {
            display: block;
            position: absolute;
            top: 15px;
            right: 16px;
            width: 10px;
            height: 10px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -80px 0; }
        .choose-worker-box .box-title a:hover {
            background: url(&quot;shopping_cart.png&quot;) no-repeat -80px -22px; }
        .choose-worker-box .worker-list {
            padding-top: 30px;
            height: 134px;
            overflow-y: auto; }
        .choose-worker-box .worker-list li {
            float: left;
            width: 25%;
            text-align: center;
            margin-bottom: 30px; }
        .choose-worker-box .worker-list li p {
            margin-top: 8px; }
        .choose-worker-box .worker-list li.cur a {
            color: #f70; }
        .choose-worker-box .worker-list li.cur a img {
            border: 1px solid #f70; }
        .choose-worker-box .worker-list li a:hover {
            color: #f70; }
        .choose-worker-box .worker-list li a:hover img {
            border: 1px solid #f70; }
        .choose-worker-box .worker-list li img {
            border: 1px solid #fff;
            border-radius: 100%; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;page-shopping-cart&quot; id=&quot;shopping-cart&quot;&gt;
    &lt;h4 class=&quot;cart-title&quot;&gt;&#x8D2D;&#x7269;&#x6E05;&#x5355;&lt;/h4&gt;
    &lt;div class=&quot;cart-product-title clearfix&quot;&gt;
        &lt;div class=&quot;td-check fl&quot;&gt;&lt;span class=&quot;check-span fl check-all&quot;&gt;&lt;/span&gt;&#x5168;&#x9009;&lt;/div&gt;
        &lt;div class=&quot;td-product fl&quot;&gt;&#x5546;&#x54C1;&lt;/div&gt;
        &lt;div class=&quot;td-num fl&quot;&gt;&#x6570;&#x91CF;&lt;/div&gt;
        &lt;div class=&quot;td-price fl&quot;&gt;&#x5355;&#x4EF7;(&#x5143;)&lt;/div&gt;
        &lt;div class=&quot;td-total fl&quot;&gt;&#x91D1;&#x989D;(&#x5143;)&lt;/div&gt;
        &lt;div class=&quot;td-do fl&quot;&gt;&#x64CD;&#x4F5C;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;cart-product clearfix&quot;&gt;
        &lt;table&gt;
            &lt;tbody&gt;&lt;tr&gt;
                &lt;td class=&quot;td-check&quot;&gt;&lt;span class=&quot;check-span&quot;&gt;&lt;/span&gt;&lt;/td&gt;
                &lt;td class=&quot;td-product&quot;&gt;&lt;img src=&quot;testimg.jpg&quot; width=&quot;98&quot; height=&quot;98&quot;&gt;
                    &lt;div class=&quot;product-info&quot;&gt;
                        &lt;h6&gt;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9;&amp;nbsp;|&amp;nbsp;&#x4E19;&#x4E09;&#x9187;&lt;/h6&gt;
                        &lt;p&gt;&#x54C1;&#x724C;&#xFF1A;&#x97E9;&#x56FD;skc&amp;nbsp;&amp;nbsp;&#x4EA7;&#x5730;&#xFF1A;&#x97E9;&#x56FD;&lt;/p&gt;
                        &lt;p&gt;&#x89C4;&#x683C;/&#x7EAF;&#x5EA6;:99.7%&amp;nbsp;&amp;nbsp;&#x8D77;&#x5B9A;&#x91CF;&#xFF1A;215&#x5343;&#x514B;&lt;/p&gt;
                        &lt;p&gt;&#x914D;&#x9001;&#x4ED3;&#x50A8;&#xFF1A;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-num&quot;&gt;
                    &lt;div class=&quot;product-num&quot;&gt;
                        &lt;a href=&quot;javascript:;&quot; class=&quot;num-reduce num-do fl&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
                        &lt;input type=&quot;text&quot; class=&quot;num-input&quot; value=&quot;3&quot;&gt;
                        &lt;a href=&quot;javascript:;&quot; class=&quot;num-add num-do fr&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
                    &lt;/div&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-price&quot;&gt;
                    &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;price-text&quot;&gt;800&lt;/span&gt;.00&lt;/p&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-total&quot;&gt;
                    &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;total-text&quot;&gt;800&lt;/span&gt;.00&lt;/p&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-do&quot;&gt;&lt;a href=&quot;javascript:;&quot; class=&quot;product-delect&quot;&gt;&#x5220;&#x9664;&lt;/a&gt;&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr&gt;
                &lt;td class=&quot;td-check&quot;&gt;&lt;span class=&quot;check-span check-true&quot;&gt;&lt;/span&gt;&lt;/td&gt;
                &lt;td class=&quot;td-product&quot;&gt;&lt;img src=&quot;testimg.jpg&quot; width=&quot;98&quot; height=&quot;98&quot;&gt;
                    &lt;div class=&quot;product-info&quot;&gt;
                        &lt;h6&gt;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9;&amp;nbsp;|&amp;nbsp;&#x4E19;&#x4E09;&#x9187;&lt;/h6&gt;
                        &lt;p&gt;&#x54C1;&#x724C;&#xFF1A;&#x97E9;&#x56FD;skc&amp;nbsp;&amp;nbsp;&#x4EA7;&#x5730;&#xFF1A;&#x97E9;&#x56FD;&lt;/p&gt;
                        &lt;p&gt;&#x89C4;&#x683C;/&#x7EAF;&#x5EA6;:99.7%&amp;nbsp;&amp;nbsp;&#x8D77;&#x5B9A;&#x91CF;&#xFF1A;215&#x5343;&#x514B;&lt;/p&gt;
                        &lt;p&gt;&#x914D;&#x9001;&#x4ED3;&#x50A8;&#xFF1A;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-num&quot;&gt;
                    &lt;div class=&quot;product-num&quot;&gt;
                        &lt;a href=&quot;javascript:;&quot; class=&quot;num-reduce num-do fl&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
                        &lt;input type=&quot;text&quot; class=&quot;num-input&quot; value=&quot;1&quot;&gt;
                        &lt;a href=&quot;javascript:;&quot; class=&quot;num-add num-do fr&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
                    &lt;/div&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-price&quot;&gt;
                    &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;price-text&quot;&gt;800&lt;/span&gt;.00&lt;/p&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-total&quot;&gt;
                    &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;total-text&quot;&gt;800&lt;/span&gt;.00&lt;/p&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-do&quot;&gt;&lt;a href=&quot;javascript:;&quot; class=&quot;product-delect&quot;&gt;&#x5220;&#x9664;&lt;/a&gt;&lt;/td&gt;
            &lt;/tr&gt;
            &lt;/tbody&gt;&lt;/table&gt;
    &lt;/div&gt;
    &lt;div class=&quot;cart-product-info&quot;&gt;
        &lt;a class=&quot;delect-product&quot; href=&quot;javascript:;&quot;&gt;&lt;span&gt;&lt;/span&gt;&#x5220;&#x9664;&#x6240;&#x9009;&#x5546;&#x54C1;&lt;/a&gt;
        &lt;a class=&quot;keep-shopping&quot; href=&quot;#&quot;&gt;&lt;span&gt;&lt;/span&gt;&#x7EE7;&#x7EED;&#x8D2D;&#x7269;&lt;/a&gt;
        &lt;a class=&quot;btn-buy fr&quot; href=&quot;javascript:;&quot;&gt;&#x53BB;&#x7ED3;&#x7B97;&lt;/a&gt;
        &lt;p class=&quot;fr product-total&quot;&gt;&#xFFE5;&lt;span&gt;1600&lt;/span&gt;&lt;/p&gt;
        &lt;p class=&quot;fr check-num&quot;&gt;&lt;span&gt;2&lt;/span&gt;&#x4EF6;&#x5546;&#x54C1;&#x603B;&#x8BA1;&#xFF08;&#x4E0D;&#x542B;&#x8FD0;&#x8D39;&#xFF09;&#xFF1A;&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;cart-worder clearfix&quot;&gt;
        &lt;a href=&quot;javascript:;&quot; class=&quot;choose-worder fl&quot;&gt;&lt;span&gt;&lt;/span&gt;&#x7ED1;&#x5B9A;&#x8DDF;&#x5355;&#x5458;&lt;/a&gt;
        &lt;div class=&quot;worker-info fl&quot;&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;script src=&quot;vue.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    new Vue({
        el:&apos;#shopping-cart&apos;,
        data:{

        },
        computed: {},
        methods:{
            
        }
    })
&lt;/script&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Title&lt;/title&gt;
    &lt;style&gt;
        .fl{
            float: left;
        }
        .fr{
            float: right;
        }
       blockquote, body, dd, div, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, img, input, li, ol, p, table, td, textarea, th, ul {
            margin: 0;
            padding: 0;
        }
       .clearfix{
          zoom: 1;
       }
        .clearfix:after {
            clear: both;
        }
        .clearfix:after {
            content: &apos;.&apos;;
            display: block;
            overflow: hidden;
            visibility: hidden;
            font-size: 0;
            line-height: 0;
            width: 0;
            height: 0;
        }
        a{
            text-decoration: none;
            color: #333;
        }
        img{vertical-align: middle;}
        .page-shopping-cart {
            width: 1200px;
            margin: 50px auto;
            font-size: 14px;
            border: 1px solid #e3e3e3;
            border-top: 2px solid #317ee7; }
        .page-shopping-cart .cart-title {
            color: #317ee7;
            font-size: 16px;
            text-align: left;
            padding-left: 20px;
            line-height: 68px; }
        .page-shopping-cart .red-text {
            color: #e94826; }
        .page-shopping-cart .check-span {
            display: block;
            width: 24px;
            height: 20px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat 0 0; }
        .page-shopping-cart .check-span.check-true {
            background: url(&quot;shopping_cart.png&quot;) no-repeat 0 -22px; }
        .page-shopping-cart .td-check {
            width: 70px; }
        .page-shopping-cart .td-product {
            width: 460px; }
        .page-shopping-cart .td-num, .page-shopping-cart .td-price, .page-shopping-cart .td-total {
            width: 160px; }
        .page-shopping-cart .td-do {
            width: 150px; }
        .page-shopping-cart .cart-product-title {
            text-align: center;
            height: 38px;
            line-height: 38px;
            padding: 0 20px;
            background: #f7f7f7;
            border-top: 1px solid #e3e3e3;
            border-bottom: 1px solid #e3e3e3; }
        .page-shopping-cart .cart-product-title .td-product {
            text-align: center;
            font-size: 14px; }
        .page-shopping-cart .cart-product-title .td-check {
            text-align: left; }
        .page-shopping-cart .cart-product-title .td-check .check-span {
            margin: 9px 6px 0 0; }
        .page-shopping-cart .cart-product {
            padding: 0 20px;
            text-align: center; }
        .page-shopping-cart .cart-product table {
            width: 100%;
            text-align: center;
            font-size: 14px; }
        .page-shopping-cart .cart-product table td {
            padding: 20px 0; }
        .page-shopping-cart .cart-product table tr {
            border-bottom: 1px dashed #e3e3e3; }
        .page-shopping-cart .cart-product table tr:last-child {
            border-bottom: none; }
        .page-shopping-cart .cart-product table .product-num {
            border: 1px solid #e3e3e3;
            display: inline-block;
            text-align: center; }
        .page-shopping-cart .cart-product table .product-num .num-do {
            width: 24px;
            height: 28px;
            display: block;
            background: #f7f7f7; }
        .page-shopping-cart .cart-product table .product-num .num-reduce span {
            background: url(&quot;shopping_cart.png&quot;) no-repeat -40px -22px;
            display: block;
            width: 6px;
            height: 2px;
            margin: 13px auto 0 auto; }
        .page-shopping-cart .cart-product table .product-num .num-add span {
            background: url(&quot;shopping_cart.png&quot;) no-repeat -60px -22px;
            display: block;
            width: 8px;
            height: 8px;
            margin: 10px auto 0 auto; }
        .page-shopping-cart .cart-product table .product-num .num-input {
            width: 42px;
            height: 28px;
            line-height: 28px;
            border: none;
            text-align: center; }
        .page-shopping-cart .cart-product table .td-product {
            text-align: left;
            font-size: 12px;
            line-height: 20px; }
        .page-shopping-cart .cart-product table .td-product img {
            border: 1px solid #e3e3e3;
            margin-right: 10px; }
        .page-shopping-cart .cart-product table .td-product .product-info {
            display: inline-block;
            vertical-align: middle; }
        .page-shopping-cart .cart-product table .td-do {
            font-size: 12px; }
        .page-shopping-cart .cart-product-info {
            height: 50px;
            line-height: 50px;
            background: #f7f7f7;
            padding-left: 20px; }
        .page-shopping-cart .cart-product-info .delect-product {
            color: #666; }
        .page-shopping-cart .cart-product-info .delect-product span {
            display: inline-block;
            vertical-align: top;
            margin: 18px 8px 0 0;
            width: 13px;
            height: 15px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -60px 0; }
        .page-shopping-cart .cart-product-info .product-total {
            font-size: 14px;
            color: #e94826; }
        .page-shopping-cart .cart-product-info .product-total span {
            font-size: 20px; }
        .page-shopping-cart .cart-product-info .check-num {
            color: #333; }
        .page-shopping-cart .cart-product-info .check-num span {
            color: #e94826; }
        .page-shopping-cart .cart-product-info .keep-shopping {
            color: #666;
            margin-left: 40px; }
        .page-shopping-cart .cart-product-info .keep-shopping span {
            display: inline-block;
            vertical-align: top;
            margin: 18px 8px 0 0;
            width: 15px;
            height: 15px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -40px 0; }
        .page-shopping-cart .cart-product-info .btn-buy {
            height: 50px;
            color: #fff;
            font-size: 20px;
            display: block;
            width: 110px;
            background: #ff7700;
            text-align: center;
            margin-left: 30px; }
        .page-shopping-cart .cart-worder {
            padding: 20px; }
        .page-shopping-cart .cart-worder .choose-worder {
            color: #fff;
            display: block;
            background: #39e;
            width: 140px;
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            text-align: center;
            margin-right: 20px; }
        .page-shopping-cart .cart-worder .choose-worder span {
            display: inline-block;
            vertical-align: top;
            margin: 9px 10px 0 0;
            width: 22px;
            height: 22px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -92px 0; }
        .page-shopping-cart .cart-worder .worker-info {
            color: #666; }
        .page-shopping-cart .cart-worder .worker-info img {
            border-radius: 100%;
            margin-right: 10px; }
        .page-shopping-cart .cart-worder .worker-info span {
            color: #000; }

        .choose-worker-box {
            width: 620px;
            background: #fff; }
        .choose-worker-box .box-title {
            height: 40px;
            line-height: 40px;
            background: #F7F7F7;
            text-align: center;
            position: relative;
            font-size: 14px; }
        .choose-worker-box .box-title a {
            display: block;
            position: absolute;
            top: 15px;
            right: 16px;
            width: 10px;
            height: 10px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -80px 0; }
        .choose-worker-box .box-title a:hover {
            background: url(&quot;shopping_cart.png&quot;) no-repeat -80px -22px; }
        .choose-worker-box .worker-list {
            padding-top: 30px;
            height: 134px;
            overflow-y: auto; }
        .choose-worker-box .worker-list li {
            float: left;
            width: 25%;
            text-align: center;
            margin-bottom: 30px; }
        .choose-worker-box .worker-list li p {
            margin-top: 8px; }
        .choose-worker-box .worker-list li.cur a {
            color: #f70; }
        .choose-worker-box .worker-list li.cur a img {
            border: 1px solid #f70; }
        .choose-worker-box .worker-list li a:hover {
            color: #f70; }
        .choose-worker-box .worker-list li a:hover img {
            border: 1px solid #f70; }
        .choose-worker-box .worker-list li img {
            border: 1px solid #fff;
            border-radius: 100%; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;page-shopping-cart&quot; id=&quot;shopping-cart&quot;&gt;
    &lt;h4 class=&quot;cart-title&quot;&gt;&#x8D2D;&#x7269;&#x6E05;&#x5355;&lt;/h4&gt;
    &lt;div class=&quot;cart-product-title clearfix&quot;&gt;
        &lt;div class=&quot;td-check fl&quot;&gt;&lt;span class=&quot;check-span fl check-all&quot;&gt;&lt;/span&gt;&#x5168;&#x9009;&lt;/div&gt;
        &lt;div class=&quot;td-product fl&quot;&gt;&#x5546;&#x54C1;&lt;/div&gt;
        &lt;div class=&quot;td-num fl&quot;&gt;&#x6570;&#x91CF;&lt;/div&gt;
        &lt;div class=&quot;td-price fl&quot;&gt;&#x5355;&#x4EF7;(&#x5143;)&lt;/div&gt;
        &lt;div class=&quot;td-total fl&quot;&gt;&#x91D1;&#x989D;(&#x5143;)&lt;/div&gt;
        &lt;div class=&quot;td-do fl&quot;&gt;&#x64CD;&#x4F5C;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;cart-product clearfix&quot;&gt;
        &lt;table&gt;
            &lt;tbody&gt;&lt;tr&gt;
                &lt;td class=&quot;td-check&quot;&gt;&lt;span class=&quot;check-span&quot;&gt;&lt;/span&gt;&lt;/td&gt;
                &lt;td class=&quot;td-product&quot;&gt;&lt;img src=&quot;testimg.jpg&quot; width=&quot;98&quot; height=&quot;98&quot;&gt;
                    &lt;div class=&quot;product-info&quot;&gt;
                        &lt;h6&gt;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9;&amp;nbsp;|&amp;nbsp;&#x4E19;&#x4E09;&#x9187;&lt;/h6&gt;
                        &lt;p&gt;&#x54C1;&#x724C;&#xFF1A;&#x97E9;&#x56FD;skc&amp;nbsp;&amp;nbsp;&#x4EA7;&#x5730;&#xFF1A;&#x97E9;&#x56FD;&lt;/p&gt;
                        &lt;p&gt;&#x89C4;&#x683C;/&#x7EAF;&#x5EA6;:99.7%&amp;nbsp;&amp;nbsp;&#x8D77;&#x5B9A;&#x91CF;&#xFF1A;215&#x5343;&#x514B;&lt;/p&gt;
                        &lt;p&gt;&#x914D;&#x9001;&#x4ED3;&#x50A8;&#xFF1A;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-num&quot;&gt;
                    &lt;div class=&quot;product-num&quot;&gt;
                        &lt;a href=&quot;javascript:;&quot; class=&quot;num-reduce num-do fl&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
                        &lt;input type=&quot;text&quot; class=&quot;num-input&quot; value=&quot;3&quot;&gt;
                        &lt;a href=&quot;javascript:;&quot; class=&quot;num-add num-do fr&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
                    &lt;/div&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-price&quot;&gt;
                    &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;price-text&quot;&gt;800&lt;/span&gt;.00&lt;/p&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-total&quot;&gt;
                    &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;total-text&quot;&gt;800&lt;/span&gt;.00&lt;/p&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-do&quot;&gt;&lt;a href=&quot;javascript:;&quot; class=&quot;product-delect&quot;&gt;&#x5220;&#x9664;&lt;/a&gt;&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr&gt;
                &lt;td class=&quot;td-check&quot;&gt;&lt;span class=&quot;check-span check-true&quot;&gt;&lt;/span&gt;&lt;/td&gt;
                &lt;td class=&quot;td-product&quot;&gt;&lt;img src=&quot;testimg.jpg&quot; width=&quot;98&quot; height=&quot;98&quot;&gt;
                    &lt;div class=&quot;product-info&quot;&gt;
                        &lt;h6&gt;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9;&amp;nbsp;|&amp;nbsp;&#x4E19;&#x4E09;&#x9187;&lt;/h6&gt;
                        &lt;p&gt;&#x54C1;&#x724C;&#xFF1A;&#x97E9;&#x56FD;skc&amp;nbsp;&amp;nbsp;&#x4EA7;&#x5730;&#xFF1A;&#x97E9;&#x56FD;&lt;/p&gt;
                        &lt;p&gt;&#x89C4;&#x683C;/&#x7EAF;&#x5EA6;:99.7%&amp;nbsp;&amp;nbsp;&#x8D77;&#x5B9A;&#x91CF;&#xFF1A;215&#x5343;&#x514B;&lt;/p&gt;
                        &lt;p&gt;&#x914D;&#x9001;&#x4ED3;&#x50A8;&#xFF1A;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-num&quot;&gt;
                    &lt;div class=&quot;product-num&quot;&gt;
                        &lt;a href=&quot;javascript:;&quot; class=&quot;num-reduce num-do fl&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
                        &lt;input type=&quot;text&quot; class=&quot;num-input&quot; value=&quot;1&quot;&gt;
                        &lt;a href=&quot;javascript:;&quot; class=&quot;num-add num-do fr&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
                    &lt;/div&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-price&quot;&gt;
                    &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;price-text&quot;&gt;800&lt;/span&gt;.00&lt;/p&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-total&quot;&gt;
                    &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;total-text&quot;&gt;800&lt;/span&gt;.00&lt;/p&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-do&quot;&gt;&lt;a href=&quot;javascript:;&quot; class=&quot;product-delect&quot;&gt;&#x5220;&#x9664;&lt;/a&gt;&lt;/td&gt;
            &lt;/tr&gt;
            &lt;/tbody&gt;&lt;/table&gt;
    &lt;/div&gt;
    &lt;div class=&quot;cart-product-info&quot;&gt;
        &lt;a class=&quot;delect-product&quot; href=&quot;javascript:;&quot;&gt;&lt;span&gt;&lt;/span&gt;&#x5220;&#x9664;&#x6240;&#x9009;&#x5546;&#x54C1;&lt;/a&gt;
        &lt;a class=&quot;keep-shopping&quot; href=&quot;#&quot;&gt;&lt;span&gt;&lt;/span&gt;&#x7EE7;&#x7EED;&#x8D2D;&#x7269;&lt;/a&gt;
        &lt;a class=&quot;btn-buy fr&quot; href=&quot;javascript:;&quot;&gt;&#x53BB;&#x7ED3;&#x7B97;&lt;/a&gt;
        &lt;p class=&quot;fr product-total&quot;&gt;&#xFFE5;&lt;span&gt;1600&lt;/span&gt;&lt;/p&gt;
        &lt;p class=&quot;fr check-num&quot;&gt;&lt;span&gt;2&lt;/span&gt;&#x4EF6;&#x5546;&#x54C1;&#x603B;&#x8BA1;&#xFF08;&#x4E0D;&#x542B;&#x8FD0;&#x8D39;&#xFF09;&#xFF1A;&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;cart-worder clearfix&quot;&gt;
        &lt;a href=&quot;javascript:;&quot; class=&quot;choose-worder fl&quot;&gt;&lt;span&gt;&lt;/span&gt;&#x7ED1;&#x5B9A;&#x8DDF;&#x5355;&#x5458;&lt;/a&gt;
        &lt;div class=&quot;worker-info fl&quot;&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;script src=&quot;vue.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    new Vue({
        el:&apos;#shopping-cart&apos;,
        data:{

        },
        computed: {},
        methods:{
            
        }
    })
&lt;/script&gt;
&lt;/html&gt;</code></pre>
<p>&#x7136;&#x540E;&#x51C6;&#x5907;&#x4E0B;&#x5217;&#x8868;&#x6570;&#x636E;&#xFF0C;&#x6839;&#x636E;&#x4E0B;&#x9762;&#x8868;&#x683C;&#x7684;&#x7BAD;&#x5934;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVTnai?w=1208&amp;h=197" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>&#x6240;&#x4EE5;&#x5927;&#x5BB6;&#x5C31;&#x77E5;&#x9053;&#x5417;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x6570;&#x636E;&#x5927;&#x6982;&#x662F;&#x6DA8;&#x8FD9;&#x6837;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="productList:[
    {
        &apos;pro_name&apos;: &apos;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9; | &#x4E19;&#x4E09;&#x9187;&apos;,//&#x4EA7;&#x54C1;&#x540D;&#x79F0;
        &apos;pro_brand&apos;: &apos;skc&apos;,//&#x54C1;&#x724C;&#x540D;&#x79F0;
        &apos;pro_place&apos;: &apos;&#x97E9;&#x56FD;&apos;,//&#x4EA7;&#x5730;
        &apos;pro_purity&apos;: &apos;99.7%&apos;,//&#x89C4;&#x683C;
        &apos;pro_min&apos;: &quot;215&#x5343;&#x514B;&quot;,//&#x6700;&#x5C0F;&#x8D77;&#x8BA2;&#x91CF;
        &apos;pro_depot&apos;: &apos;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&apos;,//&#x6240;&#x5728;&#x4ED3;&#x5E93;
        &apos;pro_num&apos;: 3,//&#x6570;&#x91CF;
        &apos;pro_img&apos;: &apos;../../images/ucenter/testimg.jpg&apos;,//&#x56FE;&#x7247;&#x94FE;&#x63A5;
        &apos;pro_price&apos;: 800//&#x5355;&#x4EF7;
    }
]" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">productList:</span>[
    {
        <span class="hljs-string">&apos;pro_name&apos;</span>: <span class="hljs-string">&apos;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9; | &#x4E19;&#x4E09;&#x9187;&apos;</span>,<span class="hljs-comment">//&#x4EA7;&#x54C1;&#x540D;&#x79F0;</span>
        <span class="hljs-string">&apos;pro_brand&apos;</span>: <span class="hljs-string">&apos;skc&apos;</span>,<span class="hljs-comment">//&#x54C1;&#x724C;&#x540D;&#x79F0;</span>
        <span class="hljs-string">&apos;pro_place&apos;</span>: <span class="hljs-string">&apos;&#x97E9;&#x56FD;&apos;</span>,<span class="hljs-comment">//&#x4EA7;&#x5730;</span>
        <span class="hljs-string">&apos;pro_purity&apos;</span>: <span class="hljs-string">&apos;99.7%&apos;</span>,<span class="hljs-comment">//&#x89C4;&#x683C;</span>
        <span class="hljs-string">&apos;pro_min&apos;</span>: <span class="hljs-string">&quot;215&#x5343;&#x514B;&quot;</span>,<span class="hljs-comment">//&#x6700;&#x5C0F;&#x8D77;&#x8BA2;&#x91CF;</span>
        <span class="hljs-string">&apos;pro_depot&apos;</span>: <span class="hljs-string">&apos;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&apos;</span>,<span class="hljs-comment">//&#x6240;&#x5728;&#x4ED3;&#x5E93;</span>
        <span class="hljs-string">&apos;pro_num&apos;</span>: <span class="hljs-number">3</span>,<span class="hljs-comment">//&#x6570;&#x91CF;</span>
        <span class="hljs-string">&apos;pro_img&apos;</span>: <span class="hljs-string">&apos;../../images/ucenter/testimg.jpg&apos;</span>,<span class="hljs-comment">//&#x56FE;&#x7247;&#x94FE;&#x63A5;</span>
        <span class="hljs-string">&apos;pro_price&apos;</span>: <span class="hljs-number">800</span><span class="hljs-comment">//&#x5355;&#x4EF7;</span>
    }
]</code></pre>
<p>&#x51C6;&#x5907;&#x4E86;&#x8FD9;&#x4E48;&#x591A;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x80FD;&#x60F3;&#x5230;&#xFF0C;&#x8FD8;&#x7F3A;&#x5C11;&#x4E00;&#x4E2A;&#xFF0C;&#x5C31;&#x662F;&#x8BB0;&#x5F55;&#x4EA7;&#x54C1;&#x662F;&#x5426;&#x6709;&#x9009;&#x4E2D;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x4E2A;&#x5B57;&#x6BB5;&#xFF0C;&#x867D;&#x7136;&#x53EF;&#x4EE5;&#x5728;&#x4E0A;&#x9762;&#x90A3;&#x91CC;&#x52A0;&#xFF0C;&#x4F46;&#x662F;&#x610F;&#x4E49;&#x4E0D;&#x5927;&#xFF0C;&#x6BD4;&#x5982;&#x5728;&#x5E73;&#x5E38;&#x9879;&#x76EE;&#x90A3;&#x91CC;&#xFF01;&#x540E;&#x53F0;&#x7684;&#x6570;&#x636E;&#x4E0D;&#x4F1A;&#x8FD9;&#x6837;&#x8FD4;&#x56DE;&#xFF0C;&#x6570;&#x636E;&#x5E93;&#x4E5F;&#x4E0D;&#x4F1A;&#x6709;&#x8FD9;&#x4E2A;&#x5B57;&#x6BB5;&#xFF0C;&#x8FD9;&#x4E2A;&#x5B57;&#x6BB5;&#x5E94;&#x8BE5;&#x662F;&#x81EA;&#x5DF1;&#x6DFB;&#x52A0;&#x7684;&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el:&apos;#shopping-cart&apos;,
    data:{
        productList:[
            {
                &apos;pro_name&apos;: &apos;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9; | &#x4E19;&#x4E09;&#x9187;&apos;,//&#x4EA7;&#x54C1;&#x540D;&#x79F0;
                &apos;pro_brand&apos;: &apos;skc&apos;,//&#x54C1;&#x724C;&#x540D;&#x79F0;
                &apos;pro_place&apos;: &apos;&#x97E9;&#x56FD;&apos;,//&#x4EA7;&#x5730;
                &apos;pro_purity&apos;: &apos;99.7%&apos;,//&#x89C4;&#x683C;
                &apos;pro_min&apos;: &quot;215&#x5343;&#x514B;&quot;,//&#x6700;&#x5C0F;&#x8D77;&#x8BA2;&#x91CF;
                &apos;pro_depot&apos;: &apos;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&apos;,//&#x6240;&#x5728;&#x4ED3;&#x5E93;
                &apos;pro_num&apos;: 3,//&#x6570;&#x91CF;
                &apos;pro_img&apos;: &apos;../../images/ucenter/testimg.jpg&apos;,//&#x56FE;&#x7247;&#x94FE;&#x63A5;
                &apos;pro_price&apos;: 800//&#x5355;&#x4EF7;
            }
        ]
    },
    computed: {},
    methods:{

    },
    mounted:function () {
        //&#x4E3A;productList&#x6DFB;&#x52A0;select&#xFF08;&#x662F;&#x5426;&#x9009;&#x4E2D;&#xFF09;&#x5B57;&#x6BB5;&#xFF0C;&#x521D;&#x59CB;&#x503C;&#x4E3A;true
        var _this=this;
        //&#x4E3A;productList&#x6DFB;&#x52A0;select&#xFF08;&#x662F;&#x5426;&#x9009;&#x4E2D;&#xFF09;&#x5B57;&#x6BB5;&#xFF0C;&#x521D;&#x59CB;&#x503C;&#x4E3A;true
        this.productList.map(function (item) {
            _this.$set(item, &apos;select&apos;, true);
        })
        //&#x8981;&#x50CF;&#x4E0A;&#x9762;&#x8FD9;&#x6837;&#x5199;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x624D;&#x80FD;&#x8D77;&#x6548;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x5199;&#x6CD5;&#x662F;&#x6709;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x4E0D;&#x8D77;&#x6548;&#x7684;&#xFF01;
        //this.productList.map(function (item) {item.select=true})
    }
})
          " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">new</span> Vue({
    el:<span class="hljs-string">&apos;#shopping-cart&apos;</span>,
    data:{
        productList:[
            {
                <span class="hljs-string">&apos;pro_name&apos;</span>: <span class="hljs-string">&apos;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9; | &#x4E19;&#x4E09;&#x9187;&apos;</span>,<span class="hljs-comment">//&#x4EA7;&#x54C1;&#x540D;&#x79F0;</span>
                <span class="hljs-string">&apos;pro_brand&apos;</span>: <span class="hljs-string">&apos;skc&apos;</span>,<span class="hljs-comment">//&#x54C1;&#x724C;&#x540D;&#x79F0;</span>
                <span class="hljs-string">&apos;pro_place&apos;</span>: <span class="hljs-string">&apos;&#x97E9;&#x56FD;&apos;</span>,<span class="hljs-comment">//&#x4EA7;&#x5730;</span>
                <span class="hljs-string">&apos;pro_purity&apos;</span>: <span class="hljs-string">&apos;99.7%&apos;</span>,<span class="hljs-comment">//&#x89C4;&#x683C;</span>
                <span class="hljs-string">&apos;pro_min&apos;</span>: <span class="hljs-string">&quot;215&#x5343;&#x514B;&quot;</span>,<span class="hljs-comment">//&#x6700;&#x5C0F;&#x8D77;&#x8BA2;&#x91CF;</span>
                <span class="hljs-string">&apos;pro_depot&apos;</span>: <span class="hljs-string">&apos;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&apos;</span>,<span class="hljs-comment">//&#x6240;&#x5728;&#x4ED3;&#x5E93;</span>
                <span class="hljs-string">&apos;pro_num&apos;</span>: <span class="hljs-number">3</span>,<span class="hljs-comment">//&#x6570;&#x91CF;</span>
                <span class="hljs-string">&apos;pro_img&apos;</span>: <span class="hljs-string">&apos;../../images/ucenter/testimg.jpg&apos;</span>,<span class="hljs-comment">//&#x56FE;&#x7247;&#x94FE;&#x63A5;</span>
                <span class="hljs-string">&apos;pro_price&apos;</span>: <span class="hljs-number">800</span><span class="hljs-comment">//&#x5355;&#x4EF7;</span>
            }
        ]
    },
    computed: {},
    methods:{

    },
    mounted:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-comment">//&#x4E3A;productList&#x6DFB;&#x52A0;select&#xFF08;&#x662F;&#x5426;&#x9009;&#x4E2D;&#xFF09;&#x5B57;&#x6BB5;&#xFF0C;&#x521D;&#x59CB;&#x503C;&#x4E3A;true</span>
        <span class="hljs-keyword">var</span> _this=<span class="hljs-keyword">this</span>;
        <span class="hljs-comment">//&#x4E3A;productList&#x6DFB;&#x52A0;select&#xFF08;&#x662F;&#x5426;&#x9009;&#x4E2D;&#xFF09;&#x5B57;&#x6BB5;&#xFF0C;&#x521D;&#x59CB;&#x503C;&#x4E3A;true</span>
        <span class="hljs-keyword">this</span>.productList.map(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(item)</span> </span>{
            _this.$<span class="hljs-keyword">set</span>(item, <span class="hljs-string">&apos;select&apos;</span>, <span class="hljs-literal">true</span>);
        })
        <span class="hljs-comment">//&#x8981;&#x50CF;&#x4E0A;&#x9762;&#x8FD9;&#x6837;&#x5199;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x624D;&#x80FD;&#x8D77;&#x6548;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x5199;&#x6CD5;&#x662F;&#x6709;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x4E0D;&#x8D77;&#x6548;&#x7684;&#xFF01;</span>
        <span class="hljs-comment">//this.productList.map(function (item) {item.select=true})</span>
    }
})
          </code></pre>
<h3 id="articleHeader9">&#x6B65;&#x9AA4;1</h3>
<blockquote>&#x4E3A;&#x4E86;&#x7740;&#x91CD;&#x8868;&#x793A;&#x6211;&#x4FEE;&#x6539;&#x4E86;&#x4EC0;&#x4E48;&#x5730;&#x65B9;&#xFF0C;&#x4EE3;&#x7801;&#x6211;&#x73B0;&#x5728;&#x53EA;&#x8D34;&#x51FA;&#x4FEE;&#x6539;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x5927;&#x5BB6;&#x5BF9;&#x7740;&#x4E0A;&#x9762;&#x7684;&#x5E03;&#x5C40;&#xFF0C;&#x5C31;&#x5F88;&#x5BB9;&#x6613;&#x77E5;&#x9053;&#x6211;&#x6539;&#x7684;&#x662F;&#x4EC0;&#x4E48;&#x5730;&#x65B9;&#x4E86;&#xFF01;&#x4E0B;&#x9762;&#x4E5F;&#x662F;&#x8FD9;&#x6837;&#x64CD;&#x4F5C;&#xFF01;</blockquote>
<p>&#x70B9;&#x51FB;&#x589E;&#x52A0;&#x548C;&#x51CF;&#x5C11;&#x6309;&#x94AE;&#xFF08;&#x7BAD;&#x5934;&#x6307;&#x5411;&#x5730;&#x65B9;&#xFF09;&#xFF0C;&#x6240;&#x5C5E;&#x5217;&#x7684;&#x91D1;&#x989D;&#x6539;&#x53D8;&#xFF08;&#x7EA2;&#x6846;&#x5730;&#x65B9;&#xFF09;<br><span class="img-wrap"><img src="https://static.alili.tech/img/bVTmXE?w=1333&amp;h=278" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>&#x6267;&#x884C;&#x6B65;&#x9AA4;1&#x4E4B;&#x524D;&#xFF0C;&#x8981;&#x5148;&#x628A;&#x5217;&#x8868;&#x7684;&#x6570;&#x636E;&#x7ED9;&#x94FA;&#x51FA;&#x6765;&#x3002;&#x5229;&#x7528;v-for&#x6307;&#x4EE4;&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;tr v-for=&quot;item in productList&quot;&gt;
    &lt;td class=&quot;td-check&quot;&gt;&lt;span class=&quot;check-span&quot;&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;td class=&quot;td-product&quot;&gt;&lt;img :src=&quot;item.pro_img&quot; width=&quot;98&quot; height=&quot;98&quot;&gt;
        &lt;div class=&quot;product-info&quot;&gt;
            &lt;h6&gt;{{item.pro_name}}&lt;/h6&gt;
            &lt;p&gt;&#x54C1;&#x724C;&#xFF1A;{{item.pro_brand}}&amp;nbsp;&amp;nbsp;&#x4EA7;&#x5730;&#xFF1A;{{item.pro_place}}&lt;/p&gt;
            &lt;p&gt;&#x89C4;&#x683C;/&#x7EAF;&#x5EA6;:{{item.pro_purity}}&amp;nbsp;&amp;nbsp;&#x8D77;&#x5B9A;&#x91CF;&#xFF1A;{{item.pro_min}}&lt;/p&gt;
            &lt;p&gt;&#x914D;&#x9001;&#x4ED3;&#x50A8;&#xFF1A;{{item.pro_depot}}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;
    &lt;/td&gt;
    &lt;td class=&quot;td-num&quot;&gt;
        &lt;div class=&quot;product-num&quot;&gt;
            &lt;a href=&quot;javascript:;&quot; class=&quot;num-reduce num-do fl&quot; @click=&quot;item.pro_num--&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
            &lt;input type=&quot;text&quot; class=&quot;num-input&quot; v-model=&quot;item.pro_num&quot;&gt;
            &lt;a href=&quot;javascript:;&quot; class=&quot;num-add num-do fr&quot; @click=&quot;item.pro_num++&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
        &lt;/div&gt;
    &lt;/td&gt;
    &lt;td class=&quot;td-price&quot;&gt;
        &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;price-text&quot;&gt;{{item.pro_price.toFixed(2)}}&lt;/span&gt;&lt;/p&gt;
    &lt;/td&gt;
    &lt;td class=&quot;td-total&quot;&gt;
        &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;total-text&quot;&gt;{{item.pro_price*item.pro_num}}&lt;/span&gt;.00&lt;/p&gt;
    &lt;/td&gt;
    &lt;td class=&quot;td-do&quot;&gt;&lt;a href=&quot;javascript:;&quot; class=&quot;product-delect&quot;&gt;&#x5220;&#x9664;&lt;/a&gt;&lt;/td&gt;
&lt;/tr&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;item in productList&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td-check&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;check-span&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td-product&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;item.pro_img&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;98&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;98&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;product-info&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.pro_name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x54C1;&#x724C;&#xFF1A;</span><span class="hljs-template-variable">"{{"item.pro_brand"}}"</span><span class="xml">&amp;nbsp;&amp;nbsp;&#x4EA7;&#x5730;&#xFF1A;</span><span class="hljs-template-variable">"{{"item.pro_place"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x89C4;&#x683C;/&#x7EAF;&#x5EA6;:</span><span class="hljs-template-variable">"{{"item.pro_purity"}}"</span><span class="xml">&amp;nbsp;&amp;nbsp;&#x8D77;&#x5B9A;&#x91CF;&#xFF1A;</span><span class="hljs-template-variable">"{{"item.pro_min"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x914D;&#x9001;&#x4ED3;&#x50A8;&#xFF1A;</span><span class="hljs-template-variable">"{{"item.pro_depot"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clearfix&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td-num&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;product-num&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-reduce num-do fl&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;item.pro_num--&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-input&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;item.pro_num&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-add num-do fr&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;item.pro_num++&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td-price&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red-text&quot;</span>&gt;</span>&#xFFE5;<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;price-text&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.pro_price.toFixed(2)"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td-total&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red-text&quot;</span>&gt;</span>&#xFFE5;<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;total-text&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.pro_price*item.pro_num"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>.00<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td-do&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;product-delect&quot;</span>&gt;</span>&#x5220;&#x9664;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
</span></code></pre>
<p>&#x8FD9;&#x6837;&#xFF0C;&#x5217;&#x8868;&#x7684;&#x6570;&#x636E;&#x5C31;&#x6709;&#x4E86;&#xFF01;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVTqtz?w=1224&amp;h=744" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>&#x4E5F;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#xFF0C;<span class="img-wrap"><img src="https://static.alili.tech/img/bVTqsG?w=125&amp;h=41" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>&#x8FD9;&#x4E24;&#x4E2A;&#x6309;&#x94AE;&#x7684;&#x529F;&#x80FD;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x91D1;&#x989D;&#x4E5F;&#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF01;&#x662F;&#x4E0D;&#x662F;&#x611F;&#x5230;&#x5F88;&#x60CA;&#x559C;&#xFF01;&#x5176;&#x5B9E;&#x8FD9;&#x91CC;&#x6CA1;&#x4EC0;&#x4E48;&#x7279;&#x522B;&#x7684;&#xFF0C;&#x5C31;&#x662F;&#x56E0;&#x4E3A;&#x8F93;&#x5165;&#x6846;&#x5229;&#x7528;v-model&#x7ED1;&#x5B9A;&#x4E86;&#x6570;&#x91CF;&#xFF08;<code>pro_num</code>&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x4E24;&#x4E2A;&#x6309;&#x94AE;&#x5206;&#x522B;&#x6DFB;&#x52A0;&#x4E86;&#x4E8B;&#x4EF6;<code>@click=&quot;item.pro_num--&quot;</code>&#x548C;@<code>click=&quot;item.pro_num++&quot;</code>&#x3002;&#x6BD4;&#x5982;&#x521A;&#x5F00;&#x59CB;pro_num&#x662F;3&#xFF0C;&#x70B9;&#x51FB;<span class="img-wrap"><img src="https://static.alili.tech/img/bVTqs0?w=34&amp;h=27" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>&#xFF0C;<code>pro_num</code>&#x5C31;&#x53D8;&#x6210;2&#xFF0C;&#x70B9;&#x51FB;<span class="img-wrap"><img src="https://static.alili.tech/img/bVTqs3?w=27&amp;h=34" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>&#xFF0C;<code>pro_num</code>&#x5C31;&#x53D8;&#x6210;4&#xFF0C;&#x7136;&#x540E;&#x540E;&#x9762;&#x7684;&#x91D1;&#x989D;&#x4F1A;&#x6539;&#x6539;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;<code>"{{"item.pro_price*item.pro_num"}}"</code>&#x3002;&#x53EA;&#x8981;pro_price&#x6216;&#x8005;pro_num&#x7684;&#x503C;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x6574;&#x4E00;&#x5757;&#x4E5F;&#x4F1A;&#x6539;&#x53D8;&#xFF0C;&#x89C6;&#x56FE;&#x5C31;&#x4F1A;&#x5237;&#x65B0;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x80FD;&#x770B;&#x5230;&#x53D8;&#x5316;&#xFF08;&#x8FD9;&#x4E9B;&#x4E8B;&#x60C5;&#x662F;vue&#x505A;&#x7684;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;MVVM&#x7684;&#x9B45;&#x529B;&#xFF0C;&#x6570;&#x636E;&#x9A71;&#x52A8;&#x89C6;&#x56FE;&#x6539;&#x53D8;&#xFF09;&#x3002;</p>
<h3 id="articleHeader10">&#x6B65;&#x9AA4;2</h3>
<p>&#x70B9;&#x51FB;&#x6240;&#x5C5E;&#x5217;&#x9009;&#x62E9;&#x6309;&#x94AE;&#xFF08;&#x7BAD;&#x5934;&#x6307;&#x5411;&#x5730;&#x65B9;&#xFF09;&#xFF0C;&#x603B;&#x8BA1;&#x7684;&#x91D1;&#x989D;&#xFF08;&#x7EA2;&#x6846;&#x5730;&#x65B9;&#xFF09;&#x548C;&#x5DF2;&#x9009;&#x4EA7;&#x54C1;&#x7684;&#x5217;&#x6570;&#xFF08;&#x84DD;&#x6846;&#x5730;&#x65B9;&#xFF09;&#x548C;&#x5168;&#x9009;&#xFF08;&#x9EC4;&#x6846;&#x5730;&#x65B9;&#xFF09;&#x4F1A;&#x6539;&#x53D8;&#xFF08;&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x5168;&#x9009;&#x4E86;&#xFF0C;&#x5168;&#x9009;&#x6309;&#x94AE;&#x81EA;&#x52A8;&#x53D8;&#x6210;&#x5168;&#x9009;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5168;&#x9009;&#xFF0C;&#x5168;&#x9009;&#x6309;&#x94AE;&#xFF0C;&#x81EA;&#x52A8;&#x53D6;&#x6D88;&#x5168;&#x9009;&#xFF09;&#xFF01;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVTmZb?w=1326&amp;h=502" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>&#x9996;&#x5148;&#xFF0C;&#x9009;&#x62E9;&#x4E0E;&#x53D6;&#x6D88;&#x9009;&#x62E9;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x53EA;&#x6709;&#x4E24;&#x4E2A;&#x64CD;&#x4F5C;&#xFF08;&#x5176;&#x5B9E;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#xFF1A;&#x6539;&#x53D8;&#x8FD9;&#x6761;&#x8BB0;&#x5F55;&#x7684;<code>select</code>&#x5B57;&#x6BB5;&#xFF09;&#x3002;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVTrjW?w=1198&amp;h=154" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>&#x7136;&#x540E;&#x6539;&#x53D8;<span class="img-wrap"><img src="https://static.alili.tech/img/bVTrkf?w=32&amp;h=32" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x6761;&#x8BB0;&#x5F55;<code>select</code>&#x4E3A;<code>false</code>&#xFF0C;&#x5C31;&#x663E;&#x793A;<span class="img-wrap"><img src="https://static.alili.tech/img/bVTrkf?w=32&amp;h=32" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x663E;&#x793A;<span class="img-wrap"><img src="https://static.alili.tech/img/bVTrk6?w=36&amp;h=30" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>&#x3002;<br>&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;td class=&quot;td-check&quot;&gt;&lt;span class=&quot;check-span&quot; @click=&quot;item.select=!item.select&quot; :class=&quot;{&apos;check-true&apos;:item.select}&quot;&gt;&lt;/span&gt;&lt;/td&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;td class=<span class="hljs-string">&quot;td-check&quot;</span>&gt;&lt;span class=<span class="hljs-string">&quot;check-span&quot;</span> <span class="hljs-variable">@click</span>=<span class="hljs-string">&quot;item.select=!item.select&quot;</span> <span class="hljs-symbol">:class=<span class="hljs-string">&quot;{&apos;check-true&apos;:item.select}&quot;</span>&gt;&lt;/span&gt;&lt;/td&gt;</span></code></pre>
<p>&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x7B49;&#x4E8E;&#x6DFB;&#x52A0;&#x4E86;<code>@click=&quot;item.select=!item.select&quot; :class=&quot;{&apos;check-true&apos;:item.select}&quot;</code>&#x8FD9;&#x91CC;&#x3002;&#x70B9;&#x51FB;&#x8FD9;&#x4E2A;&#xFF0C;&#x8FD9;&#x6761;&#x6570;&#x636E;&#x7684;<code>select</code>&#x5B57;&#x6BB5;&#x5C31;&#x53D6;&#x53CD;&#xFF08;true-&gt;false&#x6216;&#x8005;false-&gt;true&#xFF09;&#x3002;&#x7136;&#x540E;<code>:class=&quot;{&apos;check-true&apos;:item.select}&quot;</code>&#xFF0C;&#x5C31;&#x4F1A;&#x6839;&#x636E;&#x8FD9;&#x6761;&#x6570;&#x636E;&#x7684;<code>select</code>&#x5B57;&#x6BB5;&#x8FDB;&#x884C;&#x5224;&#x65AD;&#xFF0C;&#x662F;&#x5426;&#x6DFB;&#x52A0;<code>check-true</code>&#x7C7B;&#x540D;&#xFF0C;&#x5982;&#x679C;<code>select</code>&#x5B57;&#x6BB5;&#x4E3A;true&#xFF0C;&#x5C31;&#x6DFB;&#x52A0;&#x7C7B;&#x540D;&#xFF0C;&#x663E;&#x793A;<span class="img-wrap"><img src="https://static.alili.tech/img/bVTrqu?w=34&amp;h=30" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>&#x3002;&#x5426;&#x5219;&#x4E0D;&#x6DFB;&#x52A0;&#x7C7B;&#x540D;&#xFF0C;&#x663E;&#x793A;<br><span class="img-wrap"><img src="https://static.alili.tech/img/bVTrqG?w=31&amp;h=28" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>&#x3002;</p>
<p>&#x7136;&#x540E;&#xFF0C;<span class="img-wrap"><img src="https://static.alili.tech/img/bVTrq4?w=112&amp;h=38" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>&#x5168;&#x9009;&#x6309;&#x94AE;&#xFF0C;&#x662F;&#x5426;&#x53D8;&#x6210;<span class="img-wrap"><img src="https://static.alili.tech/img/bVTrqu?w=34&amp;h=30" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>&#x3002;&#x8FD9;&#x91CC;&#x7528;&#x4E00;&#x4E2A;computed&#xFF08;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF09;&#x5C31;&#x597D;&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p>
<p>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;td-check fl&quot;&gt;&lt;span class=&quot;check-span fl check-all&quot; :class=&quot;{&apos;check-true&apos;:isSelectAll}&quot;&gt;&lt;/span&gt;&#x5168;&#x9009;&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;td-check fl&quot;</span>&gt;&lt;span <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;check-span fl check-all&quot;</span> :<span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;{&apos;check-true&apos;:isSelectAll}&quot;</span>&gt;&lt;/span&gt;&#x5168;&#x9009;&lt;/div&gt;
</code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
    isSelectAll:function(){
        //&#x5982;&#x679C;productList&#x4E2D;&#x6BCF;&#x4E00;&#x6761;&#x6570;&#x636E;&#x7684;select&#x90FD;&#x4E3A;true&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false;
        return this.productList.every(function (val) { return val.select});
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lua"><code>computed: {
    isSelectAll:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        //&#x5982;&#x679C;productList&#x4E2D;&#x6BCF;&#x4E00;&#x6761;&#x6570;&#x636E;&#x7684;<span class="hljs-built_in">select</span>&#x90FD;&#x4E3A;<span class="hljs-literal">true</span>&#xFF0C;&#x8FD4;&#x56DE;<span class="hljs-literal">true</span>&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;<span class="hljs-literal">false</span>;
        <span class="hljs-keyword">return</span> this.productList.every(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(val)</span></span> { <span class="hljs-keyword">return</span> val.<span class="hljs-built_in">select</span>});
    }
}</code></pre>
<p>&#x4EE3;&#x7801;&#x6211;&#x89E3;&#x91CA;&#x4E0B;&#xFF0C;&#x5C31;&#x662F;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E2D;&#xFF0C;&#x5B9A;&#x4E49;&#x7684;isSelectAll&#x4F9D;&#x8D56;productList&#x3002;&#x53EA;&#x8981;productList&#x6539;&#x53D8;&#xFF0C;isSelectAll&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x5C31;&#x4F1A;&#x6539;&#x53D8;&#xFF0C;&#x7136;&#x540E;<code>:class=&quot;{&apos;check-true&apos;:isSelectAll}&quot;</code>&#x6839;&#x7EDD;isSelectAll&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x5426;&#x6DFB;&#x52A0;<code>&apos;check-true&apos;</code>&#x7C7B;&#x540D;&#xFF0C;&#x663E;&#x793A;&#x5BF9;&#x5E94;&#x7684;&#x6837;&#x5F0F;&#xFF01;<br>&#x6700;&#x540E;&#xFF0C;<span class="img-wrap"><img src="https://static.alili.tech/img/bVTrAV?w=278&amp;h=49" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>&#xFF0C;&#x8FD9;&#x91CC;&#x7684;&#x591A;&#x5C11;&#x4EF6;&#x4EA7;&#x54C1;&#x548C;&#x603B;&#x4EF7;&#xFF0C;&#x4E5F;&#x662F;&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF0C;&#x6709;&#x4E86;&#x4E0A;&#x4E00;&#x6B65;&#x7684;&#x57FA;&#x7840;&#xFF0C;&#x7ED9;&#x51FA;&#x4EE3;&#x7801;&#xFF0C;&#x5927;&#x5BB6;&#x4E00;&#x770B;&#x5C31;&#x660E;&#x767D;&#x4E86;&#xFF01;<br>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;p class=&quot;fr product-total&quot;&gt;&#xFFE5;&lt;span&gt;{{getTotal.totalPrice}}&lt;/span&gt;&lt;/p&gt;
&lt;p class=&quot;fr check-num&quot;&gt;&lt;span&gt;{{getTotal.totalNum}}&lt;/span&gt;&#x4EF6;&#x5546;&#x54C1;&#x603B;&#x8BA1;&#xFF08;&#x4E0D;&#x542B;&#x8FD0;&#x8D39;&#xFF09;&#xFF1A;&lt;/p&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;fr product-total&quot;</span>&gt;</span>&#xFFE5;<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"getTotal.totalPrice"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;fr check-num&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"getTotal.totalNum"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>&#x4EF6;&#x5546;&#x54C1;&#x603B;&#x8BA1;&#xFF08;&#x4E0D;&#x542B;&#x8FD0;&#x8D39;&#xFF09;&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span></code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
    //&#x68C0;&#x6D4B;&#x662F;&#x5426;&#x5168;&#x9009;
    isSelectAll:function(){
        //&#x5982;&#x679C;productList&#x4E2D;&#x6BCF;&#x4E00;&#x6761;&#x6570;&#x636E;&#x7684;select&#x90FD;&#x4E3A;true&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false;
        return this.productList.every(function (val) { return val.select});
    },
    //&#x83B7;&#x53D6;&#x603B;&#x4EF7;&#x548C;&#x4EA7;&#x54C1;&#x603B;&#x4EF6;&#x6570;
    getTotal:function(){
        //&#x83B7;&#x53D6;productList&#x4E2D;select&#x4E3A;true&#x7684;&#x6570;&#x636E;&#x3002;
        var _proList=this.productList.filter(function (val) { return val.select}),totalPrice=0;
        for(var i=0,len=_proList.length;i&lt;len;i++){
            //&#x603B;&#x4EF7;&#x7D2F;&#x52A0;
            totalPrice+=_proList[i].pro_num*_proList[i].pro_price;
        }
        //&#x9009;&#x62E9;&#x4EA7;&#x54C1;&#x7684;&#x4EF6;&#x6570;&#x5C31;&#x662F;_proList.length&#xFF0C;&#x603B;&#x4EF7;&#x5C31;&#x662F;totalPrice
        return {totalNum:_proList.length,totalPrice:totalPrice}
    }
}," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code>computed: {
    <span class="hljs-comment">//&#x68C0;&#x6D4B;&#x662F;&#x5426;&#x5168;&#x9009;</span>
    isSelectAll:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-comment">//&#x5982;&#x679C;productList&#x4E2D;&#x6BCF;&#x4E00;&#x6761;&#x6570;&#x636E;&#x7684;select&#x90FD;&#x4E3A;true&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.productList.every(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(val)</span> </span>{ <span class="hljs-keyword">return</span> val.select});
    },
    <span class="hljs-comment">//&#x83B7;&#x53D6;&#x603B;&#x4EF7;&#x548C;&#x4EA7;&#x54C1;&#x603B;&#x4EF6;&#x6570;</span>
    getTotal:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-comment">//&#x83B7;&#x53D6;productList&#x4E2D;select&#x4E3A;true&#x7684;&#x6570;&#x636E;&#x3002;</span>
        <span class="hljs-keyword">var</span> _proList=<span class="hljs-keyword">this</span>.productList.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(val)</span> </span>{ <span class="hljs-keyword">return</span> val.select}),totalPrice=<span class="hljs-number">0</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,len=_proList.length;i&lt;len;i++){
            <span class="hljs-comment">//&#x603B;&#x4EF7;&#x7D2F;&#x52A0;</span>
            totalPrice+=_proList[i].pro_num*_proList[i].pro_price;
        }
        <span class="hljs-comment">//&#x9009;&#x62E9;&#x4EA7;&#x54C1;&#x7684;&#x4EF6;&#x6570;&#x5C31;&#x662F;_proList.length&#xFF0C;&#x603B;&#x4EF7;&#x5C31;&#x662F;totalPrice</span>
        <span class="hljs-keyword">return</span> {totalNum:_proList.length,totalPrice:totalPrice}
    }
},</code></pre>
<p>&#x4EE3;&#x7801;&#x5F88;&#x7B80;&#x5355;&#xFF0C;html&#x6839;&#x636E;getTotal&#x8FD4;&#x56DE;&#x503C;&#x663E;&#x793A;&#x6570;&#x636E;&#xFF0C;getTotal&#x4F9D;&#x8D56;productList&#x7684;&#x6570;&#x636E;&#xFF0C;&#x53EA;&#x8981;productList&#x6539;&#x53D8;&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x4F1A;&#x6539;&#x53D8;&#xFF0C;&#x89C6;&#x56FE;&#x4E5F;&#x4F1A;&#x6539;&#x53D8;&#xFF01;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVTrLe?w=1224&amp;h=744" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">&#x6B65;&#x9AA4;3</h3>
<p>&#x70B9;&#x51FB;&#x5168;&#x9009;&#x6309;&#x94AE;&#xFF08;&#x7BAD;&#x5934;&#x6307;&#x5411;&#x90E8;&#x5206;&#xFF09;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x7684;&#x5BF9;&#x4EA7;&#x54C1;&#x8FDB;&#x884C;&#x5168;&#x9009;&#x6216;&#x8005;&#x53D6;&#x6D88;&#x5168;&#x9009;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x603B;&#x8BA1;&#x4E5F;&#x4F1A;&#x53D1;&#x751F;&#x6539;&#x53D8;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVTmY1?w=1245&amp;h=477" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>&#x505A;&#x5230;&#x8FD9;&#x4E00;&#x6B65;&#xFF0C;&#x5927;&#x5BB6;&#x5E94;&#x8BE5;&#x77E5;&#x9053;&#xFF0C;&#x5168;&#x9009;&#x6216;&#x8005;&#x53D6;&#x6D88;&#x5168;&#x9009;&#xFF0C;&#x5C31;&#x662F;&#x6539;&#x53D8;&#x8BB0;&#x5F55;&#x7684;<code>select</code>&#x3002;&#x4F46;&#x662F;&#x600E;&#x4E48;&#x77E5;&#x9053;&#x73B0;&#x5728;&#x7684;&#x5217;&#x8868;&#x6709;&#x6CA1;&#x6709;&#x5168;&#x9009;&#x5462;&#xFF1F;&#x8FD9;&#x4E2A;&#x5F88;&#x8D31;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x5728;&#x64CD;&#x4F5C;&#x51FD;&#x6570;&#xFF08;&#x5168;&#x9009;&#x4E0E;&#x53D6;&#x6D88;&#x5168;&#x9009;&#x51FD;&#x6570;&#xFF09;&#x91CC;&#x9762;&#x904D;&#x5386;&#xFF0C;&#x5927;&#x5BB6;&#x5E94;&#x8BE5;&#x8FD8;&#x8BB0;&#x5F97;&#x7B2C;&#x4E8C;&#x6B65;&#x7684;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;<code>isSelectAll</code>&#xFF08;&#x4E3A;true&#x5C31;&#x662F;&#x5168;&#x9009;&#xFF0C;&#x5426;&#x5219;&#x4E0D;&#x662F;&#x5168;&#x9009;&#xFF09;&#xFF0C;&#x628A;&#x8FD9;&#x4E2A;&#x4F20;&#x8FDB;&#x64CD;&#x4F5C;&#x51FD;&#x6570;&#x5C31;&#x597D;&#xFF0C;&#x7136;&#x540E;&#x64CD;&#x4F5C;&#x51FD;&#x6570;&#xFF0C;&#x6839;&#x636E;&#x53C2;&#x6570;&#xFF0C;&#x51B3;&#x5B9A;&#x6267;&#x884C;&#x5168;&#x9009;&#xFF0C;&#x8FD8;&#x662F;&#x53D6;&#x6D88;&#x5168;&#x9009;&#x64CD;&#x4F5C;&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF01;<br>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;td-check fl&quot;&gt;&lt;span class=&quot;check-span fl check-all&quot; :class=&quot;{&apos;check-true&apos;:isSelectAll}&quot; @click=&quot;selectProduct(isSelectAll)&quot;&gt;&lt;/span&gt;&#x5168;&#x9009;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs scala"><code style="word-break: break-word; white-space: initial;">&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;td-check fl&quot;</span>&gt;&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;check-span fl check-all&quot;</span> :<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;{&apos;check-true&apos;:isSelectAll}&quot;</span> <span class="hljs-meta">@click</span>=<span class="hljs-string">&quot;selectProduct(isSelectAll)&quot;</span>&gt;&lt;/span&gt;&#x5168;&#x9009;&lt;/div&gt;</code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" methods: {
    //&#x5168;&#x9009;&#x4E0E;&#x53D6;&#x6D88;&#x5168;&#x9009;
    selectProduct:function(_isSelect){
        //&#x904D;&#x5386;productList&#xFF0C;&#x5168;&#x90E8;&#x53D6;&#x53CD;
        for (var i = 0, len = this.productList.length; i &lt; len; i++) {
            this.productList[i].select = !_isSelect;
        }
    }
},
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code> methods: {
    <span class="hljs-comment">//&#x5168;&#x9009;&#x4E0E;&#x53D6;&#x6D88;&#x5168;&#x9009;</span>
    selectProduct:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(_isSelect)</span></span>{
        <span class="hljs-comment">//&#x904D;&#x5386;productList&#xFF0C;&#x5168;&#x90E8;&#x53D6;&#x53CD;</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = <span class="hljs-keyword">this</span>.productList.length; i &lt; len; i++) {
            <span class="hljs-keyword">this</span>.productList[i].select = !_isSelect;
        }
    }
},
</code></pre>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVTrUq?w=1224&amp;h=744" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">&#x6B65;&#x9AA4;4</h3>
<p>&#x70B9;&#x51FB;&#x5220;&#x9664;&#x4EA7;&#x54C1;&#xFF0C;&#x4F1A;&#x5220;&#x9664;&#x5DF2;&#x7ECF;&#x9009;&#x4E2D;&#x7684;&#xFF0C;&#x5168;&#x9009;&#x6309;&#x94AE;&#x548C;&#x4E0B;&#x9762;&#x7684;&#x603B;&#x8BA1;&#xFF0C;&#x90FD;&#x4F1A;&#x53D8;&#x5316;&#xFF01;&#x70B9;&#x51FB;&#x6BCF;&#x6761;&#x8BB0;&#x5F55;&#x540E;&#x9762;&#x7684;&#x5220;&#x9664;&#xFF0C;&#x4F1A;&#x5220;&#x9664;&#x5F53;&#x524D;&#x7684;&#x8FD9;&#x6761;&#x8BB0;&#x5F55;&#x3002;&#x5168;&#x9009;&#x6309;&#x94AE;&#x548C;&#x4E0B;&#x9762;&#x7684;&#x603B;&#x8BA1;&#xFF0C;&#x4E5F;&#x90FD;&#x4F1A;&#x53D8;&#x5316;&#xFF01;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVTrUW?w=1260&amp;h=633" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>&#x9996;&#x5148;&#xFF0C;&#x70B9;&#x51FB;&#x5220;&#x9664;&#x4EA7;&#x54C1;&#xFF0C;&#x5220;&#x9664;&#x5DF2;&#x7ECF;&#x9009;&#x4E2D;&#x3002;&#x8FD9;&#x4E2A;&#x5927;&#x5BB6;&#x77E5;&#x9053;&#x4E86;&#x600E;&#x4E48;&#x505A;&#x4E86;&#xFF01;&#x5C31;&#x662F;&#x904D;&#x5386;productList&#xFF0C;&#x5982;&#x679C;&#x54EA;&#x6761;&#x8BB0;&#x5F55;&#x7684;select&#x4E3A;true&#xFF0C;&#x5C31;&#x5220;&#x9664;&#x3002;<br>&#x7136;&#x540E;&#xFF0C;&#x70B9;&#x51FB;&#x6BCF;&#x6761;&#x8BB0;&#x5F55;&#x540E;&#x9762;&#x7684;&#x5220;&#x9664;&#xFF0C;&#x5220;&#x9664;&#x5F53;&#x524D;&#x7684;&#x8FD9;&#x6761;&#x8BB0;&#x5F55;&#x3002;&#x8FD9;&#x4E2A;&#x5728;html&#x904D;&#x5386;productList&#x7684;&#x65F6;&#x5019;&#x3002;&#x987A;&#x4FBF;&#x5E26;&#x4E0A;&#x7D22;&#x5F15;&#xFF0C;&#x7136;&#x540E;&#x628A;&#x7D22;&#x5F15;&#x5F53;&#x6210;&#x53C2;&#x6570;&#xFF0C;&#x4F20;&#x8FDB;&#x64CD;&#x4F5C;&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x6839;&#x636E;&#x7D22;&#x5F15;&#x53C2;&#x6570;&#xFF0C;&#x5220;&#x9664;productList&#x7684;&#x54EA;&#x4E00;&#x6761;&#x8BB0;&#x5F55;&#x3002;&#x5373;&#x53EF;&#x5B9E;&#x73B0;&#xFF01;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF01;<br>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!--&#x904D;&#x5386;&#x7684;&#x65F6;&#x5019;&#x5E26;&#x4E0A;&#x7D22;&#x5F15;--&gt;
&lt;tr v-for=&quot;(item,index) in productList&quot;&gt;
    &lt;td class=&quot;td-check&quot;&gt;&lt;span class=&quot;check-span&quot; @click=&quot;item.select=!item.select&quot; :class=&quot;{&apos;check-true&apos;:item.select}&quot;&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;td class=&quot;td-product&quot;&gt;&lt;img :src=&quot;item.pro_img&quot; width=&quot;98&quot; height=&quot;98&quot;&gt;
        &lt;div class=&quot;product-info&quot;&gt;
            &lt;h6&gt;{{item.pro_name}}&lt;/h6&gt;
            &lt;p&gt;&#x54C1;&#x724C;&#xFF1A;{{item.pro_brand}}&amp;nbsp;&amp;nbsp;&#x4EA7;&#x5730;&#xFF1A;{{item.pro_place}}&lt;/p&gt;
            &lt;p&gt;&#x89C4;&#x683C;/&#x7EAF;&#x5EA6;:{{item.pro_purity}}&amp;nbsp;&amp;nbsp;&#x8D77;&#x5B9A;&#x91CF;&#xFF1A;{{item.pro_min}}&lt;/p&gt;
            &lt;p&gt;&#x914D;&#x9001;&#x4ED3;&#x50A8;&#xFF1A;{{item.pro_depot}}&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;
    &lt;/td&gt;
    &lt;td class=&quot;td-num&quot;&gt;
        &lt;div class=&quot;product-num&quot;&gt;
            &lt;a href=&quot;javascript:;&quot; class=&quot;num-reduce num-do fl&quot; @click=&quot;item.pro_num--&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
            &lt;input type=&quot;text&quot; class=&quot;num-input&quot; v-model=&quot;item.pro_num&quot;&gt;
            &lt;a href=&quot;javascript:;&quot; class=&quot;num-add num-do fr&quot; @click=&quot;item.pro_num++&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
        &lt;/div&gt;
    &lt;/td&gt;
    &lt;td class=&quot;td-price&quot;&gt;
        &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;price-text&quot;&gt;{{item.pro_price.toFixed(2)}}&lt;/span&gt;&lt;/p&gt;
    &lt;/td&gt;
    &lt;td class=&quot;td-total&quot;&gt;
        &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;total-text&quot;&gt;{{item.pro_price*item.pro_num}}&lt;/span&gt;.00&lt;/p&gt;
    &lt;/td&gt;
    &lt;td class=&quot;td-do&quot;&gt;&lt;a href=&quot;javascript:;&quot; class=&quot;product-delect&quot; @click=&quot;deleteOneProduct(index)&quot;&gt;&#x5220;&#x9664;&lt;/a&gt;&lt;/td&gt;
&lt;/tr&gt;
...
&lt;a class=&quot;delect-product&quot; href=&quot;javascript:;&quot; @click=&quot;deleteProduct&quot;&gt;&lt;span&gt;&lt;/span&gt;&#x5220;&#x9664;&#x6240;&#x9009;&#x5546;&#x54C1;&lt;/a&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-comment">&lt;!--&#x904D;&#x5386;&#x7684;&#x65F6;&#x5019;&#x5E26;&#x4E0A;&#x7D22;&#x5F15;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item,index) in productList&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td-check&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;check-span&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;item.select=!item.select&quot;</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{&apos;check-true&apos;:item.<span class="hljs-keyword">select</span>}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td-product&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;item.pro_img&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;98&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;98&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;product-info&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.pro_name}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x54C1;&#x724C;&#xFF1A;</span><span class="hljs-template-variable">"{{"item.pro_brand}</span><span class="xml">}&amp;nbsp;&amp;nbsp;&#x4EA7;&#x5730;&#xFF1A;</span><span class="hljs-template-variable">"{{"item.pro_place}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x89C4;&#x683C;/&#x7EAF;&#x5EA6;:</span><span class="hljs-template-variable">"{{"item.pro_purity}</span><span class="xml">}&amp;nbsp;&amp;nbsp;&#x8D77;&#x5B9A;&#x91CF;&#xFF1A;</span><span class="hljs-template-variable">"{{"item.pro_min}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x914D;&#x9001;&#x4ED3;&#x50A8;&#xFF1A;</span><span class="hljs-template-variable">"{{"item.pro_depot}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clearfix&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td-num&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;product-num&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-reduce num-do fl&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;item.pro_num--&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-input&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;item.pro_num&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-add num-do fr&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;item.pro_num++&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td-price&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red-text&quot;</span>&gt;</span>&#xFFE5;<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;price-text&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.pro_price.toFixed(2)}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td-total&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;red-text&quot;</span>&gt;</span>&#xFFE5;<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;total-text&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.pro_price*item.pro_num}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>.00<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td-do&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;product-delect&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;deleteOneProduct(index)&quot;</span>&gt;</span>&#x5220;&#x9664;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
...
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;delect-product&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;deleteProduct&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>&#x5220;&#x9664;&#x6240;&#x9009;&#x5546;&#x54C1;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span></code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5220;&#x9664;&#x5DF2;&#x7ECF;&#x9009;&#x4E2D;(select=true)&#x7684;&#x4EA7;&#x54C1;
deleteProduct:function () {
    this.productList=this.productList.filter(function (item) {return !item.select})
},
//&#x5220;&#x9664;&#x5355;&#x6761;&#x4EA7;&#x54C1;
deleteOneProduct:function (index) {
    //&#x6839;&#x636E;&#x7D22;&#x5F15;&#x5220;&#x9664;productList&#x7684;&#x8BB0;&#x5F55;
    this.productList.splice(index,1);
}," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//&#x5220;&#x9664;&#x5DF2;&#x7ECF;&#x9009;&#x4E2D;(select=true)&#x7684;&#x4EA7;&#x54C1;</span>
deleteProduct:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.productList=<span class="hljs-keyword">this</span>.productList.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(item)</span> </span>{<span class="hljs-keyword">return</span> !item.select})
},
<span class="hljs-comment">//&#x5220;&#x9664;&#x5355;&#x6761;&#x4EA7;&#x54C1;</span>
deleteOneProduct:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(index)</span> </span>{
    <span class="hljs-comment">//&#x6839;&#x636E;&#x7D22;&#x5F15;&#x5220;&#x9664;productList&#x7684;&#x8BB0;&#x5F55;</span>
    <span class="hljs-keyword">this</span>.productList.splice(index,<span class="hljs-number">1</span>);
},</code></pre>
<h3 id="articleHeader13">&#x5B8C;&#x6574;&#x4EE3;&#x7801;</h3>
<p>&#x6837;&#x5F0F;&#x56FE;&#x7247;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVTr3F?w=130&amp;h=60" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Title&lt;/title&gt;
    &lt;style&gt;
        .fl {
            float: left;
        }

        .fr {
            float: right;
        }

        blockquote, body, dd, div, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, img, input, li, ol, p, table, td, textarea, th, ul {
            margin: 0;
            padding: 0;
        }

        .clearfix {
            zoom: 1;
        }

        .clearfix:after {
            clear: both;
        }

        .clearfix:after {
            content: &apos;.&apos;;
            display: block;
            overflow: hidden;
            visibility: hidden;
            font-size: 0;
            line-height: 0;
            width: 0;
            height: 0;
        }

        a {
            text-decoration: none;
            color: #333;
        }

        img {
            vertical-align: middle;
        }

        .page-shopping-cart {
            width: 1200px;
            margin: 50px auto;
            font-size: 14px;
            border: 1px solid #e3e3e3;
            border-top: 2px solid #317ee7;
        }

        .page-shopping-cart .cart-title {
            color: #317ee7;
            font-size: 16px;
            text-align: left;
            padding-left: 20px;
            line-height: 68px;
        }

        .page-shopping-cart .red-text {
            color: #e94826;
        }

        .page-shopping-cart .check-span {
            display: block;
            width: 24px;
            height: 20px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat 0 0;
        }

        .page-shopping-cart .check-span.check-true {
            background: url(&quot;shopping_cart.png&quot;) no-repeat 0 -22px;
        }

        .page-shopping-cart .td-check {
            width: 70px;
        }

        .page-shopping-cart .td-product {
            width: 460px;
        }

        .page-shopping-cart .td-num, .page-shopping-cart .td-price, .page-shopping-cart .td-total {
            width: 160px;
        }

        .page-shopping-cart .td-do {
            width: 150px;
        }

        .page-shopping-cart .cart-product-title {
            text-align: center;
            height: 38px;
            line-height: 38px;
            padding: 0 20px;
            background: #f7f7f7;
            border-top: 1px solid #e3e3e3;
            border-bottom: 1px solid #e3e3e3;
        }

        .page-shopping-cart .cart-product-title .td-product {
            text-align: center;
            font-size: 14px;
        }

        .page-shopping-cart .cart-product-title .td-check {
            text-align: left;
        }

        .page-shopping-cart .cart-product-title .td-check .check-span {
            margin: 9px 6px 0 0;
        }

        .page-shopping-cart .cart-product {
            padding: 0 20px;
            text-align: center;
        }

        .page-shopping-cart .cart-product table {
            width: 100%;
            text-align: center;
            font-size: 14px;
        }

        .page-shopping-cart .cart-product table td {
            padding: 20px 0;
        }

        .page-shopping-cart .cart-product table tr {
            border-bottom: 1px dashed #e3e3e3;
        }

        .page-shopping-cart .cart-product table tr:last-child {
            border-bottom: none;
        }

        .page-shopping-cart .cart-product table .product-num {
            border: 1px solid #e3e3e3;
            display: inline-block;
            text-align: center;
        }

        .page-shopping-cart .cart-product table .product-num .num-do {
            width: 24px;
            height: 28px;
            display: block;
            background: #f7f7f7;
        }

        .page-shopping-cart .cart-product table .product-num .num-reduce span {
            background: url(&quot;shopping_cart.png&quot;) no-repeat -40px -22px;
            display: block;
            width: 6px;
            height: 2px;
            margin: 13px auto 0 auto;
        }

        .page-shopping-cart .cart-product table .product-num .num-add span {
            background: url(&quot;shopping_cart.png&quot;) no-repeat -60px -22px;
            display: block;
            width: 8px;
            height: 8px;
            margin: 10px auto 0 auto;
        }

        .page-shopping-cart .cart-product table .product-num .num-input {
            width: 42px;
            height: 28px;
            line-height: 28px;
            border: none;
            text-align: center;
        }

        .page-shopping-cart .cart-product table .td-product {
            text-align: left;
            font-size: 12px;
            line-height: 20px;
        }

        .page-shopping-cart .cart-product table .td-product img {
            border: 1px solid #e3e3e3;
            margin-right: 10px;
        }

        .page-shopping-cart .cart-product table .td-product .product-info {
            display: inline-block;
            vertical-align: middle;
        }

        .page-shopping-cart .cart-product table .td-do {
            font-size: 12px;
        }

        .page-shopping-cart .cart-product-info {
            height: 50px;
            line-height: 50px;
            background: #f7f7f7;
            padding-left: 20px;
        }

        .page-shopping-cart .cart-product-info .delect-product {
            color: #666;
        }

        .page-shopping-cart .cart-product-info .delect-product span {
            display: inline-block;
            vertical-align: top;
            margin: 18px 8px 0 0;
            width: 13px;
            height: 15px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -60px 0;
        }

        .page-shopping-cart .cart-product-info .product-total {
            font-size: 14px;
            color: #e94826;
        }

        .page-shopping-cart .cart-product-info .product-total span {
            font-size: 20px;
        }

        .page-shopping-cart .cart-product-info .check-num {
            color: #333;
        }

        .page-shopping-cart .cart-product-info .check-num span {
            color: #e94826;
        }

        .page-shopping-cart .cart-product-info .keep-shopping {
            color: #666;
            margin-left: 40px;
        }

        .page-shopping-cart .cart-product-info .keep-shopping span {
            display: inline-block;
            vertical-align: top;
            margin: 18px 8px 0 0;
            width: 15px;
            height: 15px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -40px 0;
        }

        .page-shopping-cart .cart-product-info .btn-buy {
            height: 50px;
            color: #fff;
            font-size: 20px;
            display: block;
            width: 110px;
            background: #ff7700;
            text-align: center;
            margin-left: 30px;
        }

        .page-shopping-cart .cart-worder {
            padding: 20px;
        }

        .page-shopping-cart .cart-worder .choose-worder {
            color: #fff;
            display: block;
            background: #39e;
            width: 140px;
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            text-align: center;
            margin-right: 20px;
        }

        .page-shopping-cart .cart-worder .choose-worder span {
            display: inline-block;
            vertical-align: top;
            margin: 9px 10px 0 0;
            width: 22px;
            height: 22px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -92px 0;
        }

        .page-shopping-cart .cart-worder .worker-info {
            color: #666;
        }

        .page-shopping-cart .cart-worder .worker-info img {
            border-radius: 100%;
            margin-right: 10px;
        }

        .page-shopping-cart .cart-worder .worker-info span {
            color: #000;
        }

        .choose-worker-box {
            width: 620px;
            background: #fff;
        }

        .choose-worker-box .box-title {
            height: 40px;
            line-height: 40px;
            background: #F7F7F7;
            text-align: center;
            position: relative;
            font-size: 14px;
        }

        .choose-worker-box .box-title a {
            display: block;
            position: absolute;
            top: 15px;
            right: 16px;
            width: 10px;
            height: 10px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -80px 0;
        }

        .choose-worker-box .box-title a:hover {
            background: url(&quot;shopping_cart.png&quot;) no-repeat -80px -22px;
        }

        .choose-worker-box .worker-list {
            padding-top: 30px;
            height: 134px;
            overflow-y: auto;
        }

        .choose-worker-box .worker-list li {
            float: left;
            width: 25%;
            text-align: center;
            margin-bottom: 30px;
        }

        .choose-worker-box .worker-list li p {
            margin-top: 8px;
        }

        .choose-worker-box .worker-list li.cur a {
            color: #f70;
        }

        .choose-worker-box .worker-list li.cur a img {
            border: 1px solid #f70;
        }

        .choose-worker-box .worker-list li a:hover {
            color: #f70;
        }

        .choose-worker-box .worker-list li a:hover img {
            border: 1px solid #f70;
        }

        .choose-worker-box .worker-list li img {
            border: 1px solid #fff;
            border-radius: 100%;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;page-shopping-cart&quot; id=&quot;shopping-cart&quot;&gt;
    &lt;h4 class=&quot;cart-title&quot;&gt;&#x8D2D;&#x7269;&#x6E05;&#x5355;&lt;/h4&gt;
    &lt;div class=&quot;cart-product-title clearfix&quot;&gt;
        &lt;div class=&quot;td-check fl&quot;&gt;&lt;span class=&quot;check-span fl check-all&quot; :class=&quot;{&apos;check-true&apos;:isSelectAll}&quot; @click=&quot;selectProduct(isSelectAll)&quot;&gt;&lt;/span&gt;&#x5168;&#x9009;&lt;/div&gt;
        &lt;div class=&quot;td-product fl&quot;&gt;&#x5546;&#x54C1;&lt;/div&gt;
        &lt;div class=&quot;td-num fl&quot;&gt;&#x6570;&#x91CF;&lt;/div&gt;
        &lt;div class=&quot;td-price fl&quot;&gt;&#x5355;&#x4EF7;(&#x5143;)&lt;/div&gt;
        &lt;div class=&quot;td-total fl&quot;&gt;&#x91D1;&#x989D;(&#x5143;)&lt;/div&gt;
        &lt;div class=&quot;td-do fl&quot;&gt;&#x64CD;&#x4F5C;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;cart-product clearfix&quot;&gt;
        &lt;table&gt;
            &lt;tbody&gt;
            &lt;!--&#x904D;&#x5386;&#x7684;&#x65F6;&#x5019;&#x5E26;&#x4E0A;&#x7D22;&#x5F15;--&gt;
            &lt;tr v-for=&quot;(item,index) in productList&quot;&gt;
                &lt;td class=&quot;td-check&quot;&gt;&lt;span class=&quot;check-span&quot; @click=&quot;item.select=!item.select&quot; :class=&quot;{&apos;check-true&apos;:item.select}&quot;&gt;&lt;/span&gt;&lt;/td&gt;
                &lt;td class=&quot;td-product&quot;&gt;&lt;img :src=&quot;item.pro_img&quot; width=&quot;98&quot; height=&quot;98&quot;&gt;
                    &lt;div class=&quot;product-info&quot;&gt;
                        &lt;h6&gt;{{item.pro_name}}&lt;/h6&gt;
                        &lt;p&gt;&#x54C1;&#x724C;&#xFF1A;{{item.pro_brand}}&amp;nbsp;&amp;nbsp;&#x4EA7;&#x5730;&#xFF1A;{{item.pro_place}}&lt;/p&gt;
                        &lt;p&gt;&#x89C4;&#x683C;/&#x7EAF;&#x5EA6;:{{item.pro_purity}}&amp;nbsp;&amp;nbsp;&#x8D77;&#x5B9A;&#x91CF;&#xFF1A;{{item.pro_min}}&lt;/p&gt;
                        &lt;p&gt;&#x914D;&#x9001;&#x4ED3;&#x50A8;&#xFF1A;{{item.pro_depot}}&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-num&quot;&gt;
                    &lt;div class=&quot;product-num&quot;&gt;
                        &lt;a href=&quot;javascript:;&quot; class=&quot;num-reduce num-do fl&quot; @click=&quot;item.pro_num&gt;0?item.pro_num--:&apos;&apos;&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
                        &lt;input type=&quot;text&quot; class=&quot;num-input&quot; v-model=&quot;item.pro_num&quot;&gt;
                        &lt;a href=&quot;javascript:;&quot; class=&quot;num-add num-do fr&quot; @click=&quot;item.pro_num++&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
                    &lt;/div&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-price&quot;&gt;
                    &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;price-text&quot;&gt;{{item.pro_price.toFixed(2)}}&lt;/span&gt;&lt;/p&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-total&quot;&gt;
                    &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;total-text&quot;&gt;{{item.pro_price*item.pro_num}}&lt;/span&gt;.00&lt;/p&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-do&quot;&gt;&lt;a href=&quot;javascript:;&quot; class=&quot;product-delect&quot; @click=&quot;deleteOneProduct(index)&quot;&gt;&#x5220;&#x9664;&lt;/a&gt;&lt;/td&gt;
            &lt;/tr&gt;
            &lt;/tbody&gt;
        &lt;/table&gt;
    &lt;/div&gt;
    &lt;div class=&quot;cart-product-info&quot;&gt;
        &lt;a class=&quot;delect-product&quot; href=&quot;javascript:;&quot; @click=&quot;deleteProduct&quot;&gt;&lt;span&gt;&lt;/span&gt;&#x5220;&#x9664;&#x6240;&#x9009;&#x5546;&#x54C1;&lt;/a&gt;
        &lt;a class=&quot;keep-shopping&quot; href=&quot;#&quot;&gt;&lt;span&gt;&lt;/span&gt;&#x7EE7;&#x7EED;&#x8D2D;&#x7269;&lt;/a&gt;
        &lt;a class=&quot;btn-buy fr&quot; href=&quot;javascript:;&quot;&gt;&#x53BB;&#x7ED3;&#x7B97;&lt;/a&gt;
        &lt;p class=&quot;fr product-total&quot;&gt;&#xFFE5;&lt;span&gt;{{getTotal.totalPrice}}&lt;/span&gt;&lt;/p&gt;
        &lt;p class=&quot;fr check-num&quot;&gt;&lt;span&gt;{{getTotal.totalNum}}&lt;/span&gt;&#x4EF6;&#x5546;&#x54C1;&#x603B;&#x8BA1;&#xFF08;&#x4E0D;&#x542B;&#x8FD0;&#x8D39;&#xFF09;&#xFF1A;&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;script src=&quot;vue.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    new Vue({
        el: &apos;#shopping-cart&apos;,
        data: {
            productList: [
                {
                    &apos;pro_name&apos;: &apos;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9; | &#x4E19;&#x4E09;&#x9187;&apos;,//&#x4EA7;&#x54C1;&#x540D;&#x79F0;
                    &apos;pro_brand&apos;: &apos;skc&apos;,//&#x54C1;&#x724C;&#x540D;&#x79F0;
                    &apos;pro_place&apos;: &apos;&#x97E9;&#x56FD;&apos;,//&#x4EA7;&#x5730;
                    &apos;pro_purity&apos;: &apos;99.7%&apos;,//&#x89C4;&#x683C;
                    &apos;pro_min&apos;: &quot;215&#x5343;&#x514B;&quot;,//&#x6700;&#x5C0F;&#x8D77;&#x8BA2;&#x91CF;
                    &apos;pro_depot&apos;: &apos;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&apos;,//&#x6240;&#x5728;&#x4ED3;&#x5E93;
                    &apos;pro_num&apos;: 3,//&#x6570;&#x91CF;
                    &apos;pro_img&apos;: &apos;../../images/ucenter/testimg.jpg&apos;,//&#x56FE;&#x7247;&#x94FE;&#x63A5;
                    &apos;pro_price&apos;: 800//&#x5355;&#x4EF7;
                },
                {
                    &apos;pro_name&apos;: &apos;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9; | &#x4E19;&#x4E09;&#x9187;&apos;,//&#x4EA7;&#x54C1;&#x540D;&#x79F0;
                    &apos;pro_brand&apos;: &apos;skc&apos;,//&#x54C1;&#x724C;&#x540D;&#x79F0;
                    &apos;pro_place&apos;: &apos;&#x97E9;&#x56FD;&apos;,//&#x4EA7;&#x5730;
                    &apos;pro_purity&apos;: &apos;99.7%&apos;,//&#x89C4;&#x683C;
                    &apos;pro_min&apos;: &quot;215&#x5343;&#x514B;&quot;,//&#x6700;&#x5C0F;&#x8D77;&#x8BA2;&#x91CF;
                    &apos;pro_depot&apos;: &apos;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&apos;,//&#x6240;&#x5728;&#x4ED3;&#x5E93;
                    &apos;pro_num&apos;: 3,//&#x6570;&#x91CF;
                    &apos;pro_img&apos;: &apos;../../images/ucenter/testimg.jpg&apos;,//&#x56FE;&#x7247;&#x94FE;&#x63A5;
                    &apos;pro_price&apos;: 800//&#x5355;&#x4EF7;
                },
                {
                    &apos;pro_name&apos;: &apos;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9; | &#x4E19;&#x4E09;&#x9187;&apos;,//&#x4EA7;&#x54C1;&#x540D;&#x79F0;
                    &apos;pro_brand&apos;: &apos;skc&apos;,//&#x54C1;&#x724C;&#x540D;&#x79F0;
                    &apos;pro_place&apos;: &apos;&#x97E9;&#x56FD;&apos;,//&#x4EA7;&#x5730;
                    &apos;pro_purity&apos;: &apos;99.7%&apos;,//&#x89C4;&#x683C;
                    &apos;pro_min&apos;: &quot;215&#x5343;&#x514B;&quot;,//&#x6700;&#x5C0F;&#x8D77;&#x8BA2;&#x91CF;
                    &apos;pro_depot&apos;: &apos;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&apos;,//&#x6240;&#x5728;&#x4ED3;&#x5E93;
                    &apos;pro_num&apos;: 3,//&#x6570;&#x91CF;
                    &apos;pro_img&apos;: &apos;../../images/ucenter/testimg.jpg&apos;,//&#x56FE;&#x7247;&#x94FE;&#x63A5;
                    &apos;pro_price&apos;: 800//&#x5355;&#x4EF7;
                }
            ]
        },
        computed: {
            //&#x68C0;&#x6D4B;&#x662F;&#x5426;&#x5168;&#x9009;
            isSelectAll:function(){
                //&#x5982;&#x679C;productList&#x4E2D;&#x6BCF;&#x4E00;&#x6761;&#x6570;&#x636E;&#x7684;select&#x90FD;&#x4E3A;true&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false;
                return this.productList.every(function (val) { return val.select});
            },
            //&#x83B7;&#x53D6;&#x603B;&#x4EF7;&#x548C;&#x4EA7;&#x54C1;&#x603B;&#x4EF6;&#x6570;
            getTotal:function(){
                //&#x83B7;&#x53D6;productList&#x4E2D;select&#x4E3A;true&#x7684;&#x6570;&#x636E;&#x3002;
                var _proList=this.productList.filter(function (val) { return val.select}),totalPrice=0;
                for(var i=0,len=_proList.length;i&lt;len;i++){
                    //&#x603B;&#x4EF7;&#x7D2F;&#x52A0;
                    totalPrice+=_proList[i].pro_num*_proList[i].pro_price;
                }
                //&#x9009;&#x62E9;&#x4EA7;&#x54C1;&#x7684;&#x4EF6;&#x6570;&#x5C31;&#x662F;_proList.length&#xFF0C;&#x603B;&#x4EF7;&#x5C31;&#x662F;totalPrice
                return {totalNum:_proList.length,totalPrice:totalPrice}
            }
        },
        methods: {
            //&#x5168;&#x9009;&#x4E0E;&#x53D6;&#x6D88;&#x5168;&#x9009;
            selectProduct:function(_isSelect){
                //&#x904D;&#x5386;productList&#xFF0C;&#x5168;&#x90E8;&#x53D6;&#x53CD;
                for (var i = 0, len = this.productList.length; i &lt; len; i++) {
                    this.productList[i].select = !_isSelect;
                }
            },
            //&#x5220;&#x9664;&#x5DF2;&#x7ECF;&#x9009;&#x4E2D;(select=true)&#x7684;&#x4EA7;&#x54C1;
            deleteProduct:function () {
                this.productList=this.productList.filter(function (item) {return !item.select})
            },
            //&#x5220;&#x9664;&#x5355;&#x6761;&#x4EA7;&#x54C1;
            deleteOneProduct:function (index) {
                //&#x6839;&#x636E;&#x7D22;&#x5F15;&#x5220;&#x9664;productList&#x7684;&#x8BB0;&#x5F55;
                this.productList.splice(index,1);
            },
        },
        mounted: function () {
            var _this=this;
            //&#x4E3A;productList&#x6DFB;&#x52A0;select&#xFF08;&#x662F;&#x5426;&#x9009;&#x4E2D;&#xFF09;&#x5B57;&#x6BB5;&#xFF0C;&#x521D;&#x59CB;&#x503C;&#x4E3A;true
            this.productList.map(function (item) {
                _this.$set(item, &apos;select&apos;, true);
            })
        }
    })
&lt;/script&gt;
&lt;/html&gt; 
          " title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Title&lt;/title&gt;
    &lt;style&gt;
        .fl {
            float: left;
        }

        .fr {
            float: right;
        }

        blockquote, body, dd, div, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, img, input, li, ol, p, table, td, textarea, th, ul {
            margin: 0;
            padding: 0;
        }

        .clearfix {
            zoom: 1;
        }

        .clearfix:after {
            clear: both;
        }

        .clearfix:after {
            content: &apos;.&apos;;
            display: block;
            overflow: hidden;
            visibility: hidden;
            font-size: 0;
            line-height: 0;
            width: 0;
            height: 0;
        }

        a {
            text-decoration: none;
            color: #333;
        }

        img {
            vertical-align: middle;
        }

        .page-shopping-cart {
            width: 1200px;
            margin: 50px auto;
            font-size: 14px;
            border: 1px solid #e3e3e3;
            border-top: 2px solid #317ee7;
        }

        .page-shopping-cart .cart-title {
            color: #317ee7;
            font-size: 16px;
            text-align: left;
            padding-left: 20px;
            line-height: 68px;
        }

        .page-shopping-cart .red-text {
            color: #e94826;
        }

        .page-shopping-cart .check-span {
            display: block;
            width: 24px;
            height: 20px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat 0 0;
        }

        .page-shopping-cart .check-span.check-true {
            background: url(&quot;shopping_cart.png&quot;) no-repeat 0 -22px;
        }

        .page-shopping-cart .td-check {
            width: 70px;
        }

        .page-shopping-cart .td-product {
            width: 460px;
        }

        .page-shopping-cart .td-num, .page-shopping-cart .td-price, .page-shopping-cart .td-total {
            width: 160px;
        }

        .page-shopping-cart .td-do {
            width: 150px;
        }

        .page-shopping-cart .cart-product-title {
            text-align: center;
            height: 38px;
            line-height: 38px;
            padding: 0 20px;
            background: #f7f7f7;
            border-top: 1px solid #e3e3e3;
            border-bottom: 1px solid #e3e3e3;
        }

        .page-shopping-cart .cart-product-title .td-product {
            text-align: center;
            font-size: 14px;
        }

        .page-shopping-cart .cart-product-title .td-check {
            text-align: left;
        }

        .page-shopping-cart .cart-product-title .td-check .check-span {
            margin: 9px 6px 0 0;
        }

        .page-shopping-cart .cart-product {
            padding: 0 20px;
            text-align: center;
        }

        .page-shopping-cart .cart-product table {
            width: 100%;
            text-align: center;
            font-size: 14px;
        }

        .page-shopping-cart .cart-product table td {
            padding: 20px 0;
        }

        .page-shopping-cart .cart-product table tr {
            border-bottom: 1px dashed #e3e3e3;
        }

        .page-shopping-cart .cart-product table tr:last-child {
            border-bottom: none;
        }

        .page-shopping-cart .cart-product table .product-num {
            border: 1px solid #e3e3e3;
            display: inline-block;
            text-align: center;
        }

        .page-shopping-cart .cart-product table .product-num .num-do {
            width: 24px;
            height: 28px;
            display: block;
            background: #f7f7f7;
        }

        .page-shopping-cart .cart-product table .product-num .num-reduce span {
            background: url(&quot;shopping_cart.png&quot;) no-repeat -40px -22px;
            display: block;
            width: 6px;
            height: 2px;
            margin: 13px auto 0 auto;
        }

        .page-shopping-cart .cart-product table .product-num .num-add span {
            background: url(&quot;shopping_cart.png&quot;) no-repeat -60px -22px;
            display: block;
            width: 8px;
            height: 8px;
            margin: 10px auto 0 auto;
        }

        .page-shopping-cart .cart-product table .product-num .num-input {
            width: 42px;
            height: 28px;
            line-height: 28px;
            border: none;
            text-align: center;
        }

        .page-shopping-cart .cart-product table .td-product {
            text-align: left;
            font-size: 12px;
            line-height: 20px;
        }

        .page-shopping-cart .cart-product table .td-product img {
            border: 1px solid #e3e3e3;
            margin-right: 10px;
        }

        .page-shopping-cart .cart-product table .td-product .product-info {
            display: inline-block;
            vertical-align: middle;
        }

        .page-shopping-cart .cart-product table .td-do {
            font-size: 12px;
        }

        .page-shopping-cart .cart-product-info {
            height: 50px;
            line-height: 50px;
            background: #f7f7f7;
            padding-left: 20px;
        }

        .page-shopping-cart .cart-product-info .delect-product {
            color: #666;
        }

        .page-shopping-cart .cart-product-info .delect-product span {
            display: inline-block;
            vertical-align: top;
            margin: 18px 8px 0 0;
            width: 13px;
            height: 15px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -60px 0;
        }

        .page-shopping-cart .cart-product-info .product-total {
            font-size: 14px;
            color: #e94826;
        }

        .page-shopping-cart .cart-product-info .product-total span {
            font-size: 20px;
        }

        .page-shopping-cart .cart-product-info .check-num {
            color: #333;
        }

        .page-shopping-cart .cart-product-info .check-num span {
            color: #e94826;
        }

        .page-shopping-cart .cart-product-info .keep-shopping {
            color: #666;
            margin-left: 40px;
        }

        .page-shopping-cart .cart-product-info .keep-shopping span {
            display: inline-block;
            vertical-align: top;
            margin: 18px 8px 0 0;
            width: 15px;
            height: 15px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -40px 0;
        }

        .page-shopping-cart .cart-product-info .btn-buy {
            height: 50px;
            color: #fff;
            font-size: 20px;
            display: block;
            width: 110px;
            background: #ff7700;
            text-align: center;
            margin-left: 30px;
        }

        .page-shopping-cart .cart-worder {
            padding: 20px;
        }

        .page-shopping-cart .cart-worder .choose-worder {
            color: #fff;
            display: block;
            background: #39e;
            width: 140px;
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            text-align: center;
            margin-right: 20px;
        }

        .page-shopping-cart .cart-worder .choose-worder span {
            display: inline-block;
            vertical-align: top;
            margin: 9px 10px 0 0;
            width: 22px;
            height: 22px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -92px 0;
        }

        .page-shopping-cart .cart-worder .worker-info {
            color: #666;
        }

        .page-shopping-cart .cart-worder .worker-info img {
            border-radius: 100%;
            margin-right: 10px;
        }

        .page-shopping-cart .cart-worder .worker-info span {
            color: #000;
        }

        .choose-worker-box {
            width: 620px;
            background: #fff;
        }

        .choose-worker-box .box-title {
            height: 40px;
            line-height: 40px;
            background: #F7F7F7;
            text-align: center;
            position: relative;
            font-size: 14px;
        }

        .choose-worker-box .box-title a {
            display: block;
            position: absolute;
            top: 15px;
            right: 16px;
            width: 10px;
            height: 10px;
            background: url(&quot;shopping_cart.png&quot;) no-repeat -80px 0;
        }

        .choose-worker-box .box-title a:hover {
            background: url(&quot;shopping_cart.png&quot;) no-repeat -80px -22px;
        }

        .choose-worker-box .worker-list {
            padding-top: 30px;
            height: 134px;
            overflow-y: auto;
        }

        .choose-worker-box .worker-list li {
            float: left;
            width: 25%;
            text-align: center;
            margin-bottom: 30px;
        }

        .choose-worker-box .worker-list li p {
            margin-top: 8px;
        }

        .choose-worker-box .worker-list li.cur a {
            color: #f70;
        }

        .choose-worker-box .worker-list li.cur a img {
            border: 1px solid #f70;
        }

        .choose-worker-box .worker-list li a:hover {
            color: #f70;
        }

        .choose-worker-box .worker-list li a:hover img {
            border: 1px solid #f70;
        }

        .choose-worker-box .worker-list li img {
            border: 1px solid #fff;
            border-radius: 100%;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;page-shopping-cart&quot; id=&quot;shopping-cart&quot;&gt;
    &lt;h4 class=&quot;cart-title&quot;&gt;&#x8D2D;&#x7269;&#x6E05;&#x5355;&lt;/h4&gt;
    &lt;div class=&quot;cart-product-title clearfix&quot;&gt;
        &lt;div class=&quot;td-check fl&quot;&gt;&lt;span class=&quot;check-span fl check-all&quot; :class=&quot;{&apos;check-true&apos;:isSelectAll}&quot; @click=&quot;selectProduct(isSelectAll)&quot;&gt;&lt;/span&gt;&#x5168;&#x9009;&lt;/div&gt;
        &lt;div class=&quot;td-product fl&quot;&gt;&#x5546;&#x54C1;&lt;/div&gt;
        &lt;div class=&quot;td-num fl&quot;&gt;&#x6570;&#x91CF;&lt;/div&gt;
        &lt;div class=&quot;td-price fl&quot;&gt;&#x5355;&#x4EF7;(&#x5143;)&lt;/div&gt;
        &lt;div class=&quot;td-total fl&quot;&gt;&#x91D1;&#x989D;(&#x5143;)&lt;/div&gt;
        &lt;div class=&quot;td-do fl&quot;&gt;&#x64CD;&#x4F5C;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;cart-product clearfix&quot;&gt;
        &lt;table&gt;
            &lt;tbody&gt;
            &lt;!--&#x904D;&#x5386;&#x7684;&#x65F6;&#x5019;&#x5E26;&#x4E0A;&#x7D22;&#x5F15;--&gt;
            &lt;tr v-for=&quot;(item,index) in productList&quot;&gt;
                &lt;td class=&quot;td-check&quot;&gt;&lt;span class=&quot;check-span&quot; @click=&quot;item.select=!item.select&quot; :class=&quot;{&apos;check-true&apos;:item.select}&quot;&gt;&lt;/span&gt;&lt;/td&gt;
                &lt;td class=&quot;td-product&quot;&gt;&lt;img :src=&quot;item.pro_img&quot; width=&quot;98&quot; height=&quot;98&quot;&gt;
                    &lt;div class=&quot;product-info&quot;&gt;
                        &lt;h6&gt;{{item.pro_name}}&lt;/h6&gt;
                        &lt;p&gt;&#x54C1;&#x724C;&#xFF1A;{{item.pro_brand}}&amp;nbsp;&amp;nbsp;&#x4EA7;&#x5730;&#xFF1A;{{item.pro_place}}&lt;/p&gt;
                        &lt;p&gt;&#x89C4;&#x683C;/&#x7EAF;&#x5EA6;:{{item.pro_purity}}&amp;nbsp;&amp;nbsp;&#x8D77;&#x5B9A;&#x91CF;&#xFF1A;{{item.pro_min}}&lt;/p&gt;
                        &lt;p&gt;&#x914D;&#x9001;&#x4ED3;&#x50A8;&#xFF1A;{{item.pro_depot}}&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-num&quot;&gt;
                    &lt;div class=&quot;product-num&quot;&gt;
                        &lt;a href=&quot;javascript:;&quot; class=&quot;num-reduce num-do fl&quot; @click=&quot;item.pro_num&gt;0?item.pro_num--:&apos;&apos;&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
                        &lt;input type=&quot;text&quot; class=&quot;num-input&quot; v-model=&quot;item.pro_num&quot;&gt;
                        &lt;a href=&quot;javascript:;&quot; class=&quot;num-add num-do fr&quot; @click=&quot;item.pro_num++&quot;&gt;&lt;span&gt;&lt;/span&gt;&lt;/a&gt;
                    &lt;/div&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-price&quot;&gt;
                    &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;price-text&quot;&gt;{{item.pro_price.toFixed(2)}}&lt;/span&gt;&lt;/p&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-total&quot;&gt;
                    &lt;p class=&quot;red-text&quot;&gt;&#xFFE5;&lt;span class=&quot;total-text&quot;&gt;{{item.pro_price*item.pro_num}}&lt;/span&gt;.00&lt;/p&gt;
                &lt;/td&gt;
                &lt;td class=&quot;td-do&quot;&gt;&lt;a href=&quot;javascript:;&quot; class=&quot;product-delect&quot; @click=&quot;deleteOneProduct(index)&quot;&gt;&#x5220;&#x9664;&lt;/a&gt;&lt;/td&gt;
            &lt;/tr&gt;
            &lt;/tbody&gt;
        &lt;/table&gt;
    &lt;/div&gt;
    &lt;div class=&quot;cart-product-info&quot;&gt;
        &lt;a class=&quot;delect-product&quot; href=&quot;javascript:;&quot; @click=&quot;deleteProduct&quot;&gt;&lt;span&gt;&lt;/span&gt;&#x5220;&#x9664;&#x6240;&#x9009;&#x5546;&#x54C1;&lt;/a&gt;
        &lt;a class=&quot;keep-shopping&quot; href=&quot;#&quot;&gt;&lt;span&gt;&lt;/span&gt;&#x7EE7;&#x7EED;&#x8D2D;&#x7269;&lt;/a&gt;
        &lt;a class=&quot;btn-buy fr&quot; href=&quot;javascript:;&quot;&gt;&#x53BB;&#x7ED3;&#x7B97;&lt;/a&gt;
        &lt;p class=&quot;fr product-total&quot;&gt;&#xFFE5;&lt;span&gt;{{getTotal.totalPrice}}&lt;/span&gt;&lt;/p&gt;
        &lt;p class=&quot;fr check-num&quot;&gt;&lt;span&gt;{{getTotal.totalNum}}&lt;/span&gt;&#x4EF6;&#x5546;&#x54C1;&#x603B;&#x8BA1;&#xFF08;&#x4E0D;&#x542B;&#x8FD0;&#x8D39;&#xFF09;&#xFF1A;&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;script src=&quot;vue.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    new Vue({
        el: &apos;#shopping-cart&apos;,
        data: {
            productList: [
                {
                    &apos;pro_name&apos;: &apos;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9; | &#x4E19;&#x4E09;&#x9187;&apos;,//&#x4EA7;&#x54C1;&#x540D;&#x79F0;
                    &apos;pro_brand&apos;: &apos;skc&apos;,//&#x54C1;&#x724C;&#x540D;&#x79F0;
                    &apos;pro_place&apos;: &apos;&#x97E9;&#x56FD;&apos;,//&#x4EA7;&#x5730;
                    &apos;pro_purity&apos;: &apos;99.7%&apos;,//&#x89C4;&#x683C;
                    &apos;pro_min&apos;: &quot;215&#x5343;&#x514B;&quot;,//&#x6700;&#x5C0F;&#x8D77;&#x8BA2;&#x91CF;
                    &apos;pro_depot&apos;: &apos;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&apos;,//&#x6240;&#x5728;&#x4ED3;&#x5E93;
                    &apos;pro_num&apos;: 3,//&#x6570;&#x91CF;
                    &apos;pro_img&apos;: &apos;../../images/ucenter/testimg.jpg&apos;,//&#x56FE;&#x7247;&#x94FE;&#x63A5;
                    &apos;pro_price&apos;: 800//&#x5355;&#x4EF7;
                },
                {
                    &apos;pro_name&apos;: &apos;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9; | &#x4E19;&#x4E09;&#x9187;&apos;,//&#x4EA7;&#x54C1;&#x540D;&#x79F0;
                    &apos;pro_brand&apos;: &apos;skc&apos;,//&#x54C1;&#x724C;&#x540D;&#x79F0;
                    &apos;pro_place&apos;: &apos;&#x97E9;&#x56FD;&apos;,//&#x4EA7;&#x5730;
                    &apos;pro_purity&apos;: &apos;99.7%&apos;,//&#x89C4;&#x683C;
                    &apos;pro_min&apos;: &quot;215&#x5343;&#x514B;&quot;,//&#x6700;&#x5C0F;&#x8D77;&#x8BA2;&#x91CF;
                    &apos;pro_depot&apos;: &apos;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&apos;,//&#x6240;&#x5728;&#x4ED3;&#x5E93;
                    &apos;pro_num&apos;: 3,//&#x6570;&#x91CF;
                    &apos;pro_img&apos;: &apos;../../images/ucenter/testimg.jpg&apos;,//&#x56FE;&#x7247;&#x94FE;&#x63A5;
                    &apos;pro_price&apos;: 800//&#x5355;&#x4EF7;
                },
                {
                    &apos;pro_name&apos;: &apos;&#x3010;&#x65AF;&#x6587;&#x3011;&#x7518;&#x6CB9; | &#x4E19;&#x4E09;&#x9187;&apos;,//&#x4EA7;&#x54C1;&#x540D;&#x79F0;
                    &apos;pro_brand&apos;: &apos;skc&apos;,//&#x54C1;&#x724C;&#x540D;&#x79F0;
                    &apos;pro_place&apos;: &apos;&#x97E9;&#x56FD;&apos;,//&#x4EA7;&#x5730;
                    &apos;pro_purity&apos;: &apos;99.7%&apos;,//&#x89C4;&#x683C;
                    &apos;pro_min&apos;: &quot;215&#x5343;&#x514B;&quot;,//&#x6700;&#x5C0F;&#x8D77;&#x8BA2;&#x91CF;
                    &apos;pro_depot&apos;: &apos;&#x4E0A;&#x6D77;&#x4ED3;&#x6D77;&#x4ED3;&#x50A8;&apos;,//&#x6240;&#x5728;&#x4ED3;&#x5E93;
                    &apos;pro_num&apos;: 3,//&#x6570;&#x91CF;
                    &apos;pro_img&apos;: &apos;../../images/ucenter/testimg.jpg&apos;,//&#x56FE;&#x7247;&#x94FE;&#x63A5;
                    &apos;pro_price&apos;: 800//&#x5355;&#x4EF7;
                }
            ]
        },
        computed: {
            //&#x68C0;&#x6D4B;&#x662F;&#x5426;&#x5168;&#x9009;
            isSelectAll:function(){
                //&#x5982;&#x679C;productList&#x4E2D;&#x6BCF;&#x4E00;&#x6761;&#x6570;&#x636E;&#x7684;select&#x90FD;&#x4E3A;true&#xFF0C;&#x8FD4;&#x56DE;true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;false;
                return this.productList.every(function (val) { return val.select});
            },
            //&#x83B7;&#x53D6;&#x603B;&#x4EF7;&#x548C;&#x4EA7;&#x54C1;&#x603B;&#x4EF6;&#x6570;
            getTotal:function(){
                //&#x83B7;&#x53D6;productList&#x4E2D;select&#x4E3A;true&#x7684;&#x6570;&#x636E;&#x3002;
                var _proList=this.productList.filter(function (val) { return val.select}),totalPrice=0;
                for(var i=0,len=_proList.length;i&lt;len;i++){
                    //&#x603B;&#x4EF7;&#x7D2F;&#x52A0;
                    totalPrice+=_proList[i].pro_num*_proList[i].pro_price;
                }
                //&#x9009;&#x62E9;&#x4EA7;&#x54C1;&#x7684;&#x4EF6;&#x6570;&#x5C31;&#x662F;_proList.length&#xFF0C;&#x603B;&#x4EF7;&#x5C31;&#x662F;totalPrice
                return {totalNum:_proList.length,totalPrice:totalPrice}
            }
        },
        methods: {
            //&#x5168;&#x9009;&#x4E0E;&#x53D6;&#x6D88;&#x5168;&#x9009;
            selectProduct:function(_isSelect){
                //&#x904D;&#x5386;productList&#xFF0C;&#x5168;&#x90E8;&#x53D6;&#x53CD;
                for (var i = 0, len = this.productList.length; i &lt; len; i++) {
                    this.productList[i].select = !_isSelect;
                }
            },
            //&#x5220;&#x9664;&#x5DF2;&#x7ECF;&#x9009;&#x4E2D;(select=true)&#x7684;&#x4EA7;&#x54C1;
            deleteProduct:function () {
                this.productList=this.productList.filter(function (item) {return !item.select})
            },
            //&#x5220;&#x9664;&#x5355;&#x6761;&#x4EA7;&#x54C1;
            deleteOneProduct:function (index) {
                //&#x6839;&#x636E;&#x7D22;&#x5F15;&#x5220;&#x9664;productList&#x7684;&#x8BB0;&#x5F55;
                this.productList.splice(index,1);
            },
        },
        mounted: function () {
            var _this=this;
            //&#x4E3A;productList&#x6DFB;&#x52A0;select&#xFF08;&#x662F;&#x5426;&#x9009;&#x4E2D;&#xFF09;&#x5B57;&#x6BB5;&#xFF0C;&#x521D;&#x59CB;&#x503C;&#x4E3A;true
            this.productList.map(function (item) {
                _this.$set(item, &apos;select&apos;, true);
            })
        }
    })
&lt;/script&gt;
&lt;/html&gt; 
          </code></pre>
<h2 id="articleHeader14">5.todoList</h2>
<h3 id="articleHeader15">&#x8FD0;&#x884C;&#x6548;&#x679C;</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVS3Qj?w=927&amp;h=501" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader16">&#x539F;&#x7406;&#x5206;&#x6790;&#x548C;&#x5B9E;&#x73B0;</h3>
<p>&#x9996;&#x5148;&#xFF0C;&#x8FD8;&#x662F;&#x5148;&#x628A;&#x5E03;&#x5C40;&#x5199;&#x597D;&#xFF0C;&#x548C;&#x5F15;&#x5165;vue&#xFF0C;&#x51C6;&#x5907;vue&#x5B9E;&#x4F8B;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;UTF-8&quot;&gt;
        &lt;title&gt;&lt;/title&gt;
        &lt;style&gt;
            body{font-family: &quot;&#x5FAE;&#x8F6F;&#x96C5;&#x9ED1;&quot;;font-size: 14px;}
            input{font-size: 14px;}
            body,ul,div,html{padding: 0;margin: 0;}
            .hidden{display: none;}
            .main{width: 800px;margin: 0 auto;}
            li{list-style-type: none;line-height: 40px;position: relative;border: 1px solid transparent;padding: 0 20px;}
            li .type-span{display: block;width: 10px;height: 10px;background: #ccc;margin: 14px 10px 0 0 ;float: left;}
            li .close{position: absolute;color: #f00;font-size: 20px;line-height: 40px;height: 40px;right: 20px;cursor: pointer;display: none;top: 0;}
            li:hover{border: 1px solid #09f;}
            li:hover .close{display: block;}
            li .text-keyword{height: 40px;padding-left: 10px;box-sizing: border-box;margin-left: 10px;width: 80%;display: none;}
            .text-keyword{box-sizing: border-box;width: 100%;height: 40px;padding-left: 10px;outline: none;}
        &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div id=&quot;app&quot; class=&quot;main&quot;&gt;
            &lt;h2&gt;&#x5C0F;&#x76EE;&#x6807;&#x5217;&#x8868;&lt;/h2&gt;
            &lt;div class=&quot;list&quot;&gt;
                &lt;h3&gt;&#x6DFB;&#x52A0;&#x5C0F;&#x76EE;&#x6807;&lt;/h3&gt;
                &lt;input type=&quot;text&quot; class=&quot;text-keyword&quot; placeholder=&quot;&#x8F93;&#x5165;&#x5C0F;&#x76EE;&#x6807;&#x540E;&#xFF0C;&#x6309;&#x56DE;&#x8F66;&#x786E;&#x8BA4;&quot;/&gt;
                &lt;p&gt;&#x5171;&#x6709;N&#x4E2A;&#x76EE;&#x6807;&lt;/p&gt;
                &lt;p&gt;
                    &lt;input type=&quot;radio&quot; name=&quot;chooseType&quot; checked=&quot;true&quot;/&gt;&lt;label&gt;&#x6240;&#x6709;&#x76EE;&#x6807;&lt;/label&gt;
                    &lt;input type=&quot;radio&quot; name=&quot;chooseType&quot;/&gt;&lt;label&gt;&#x5DF2;&#x5B8C;&#x6210;&#x76EE;&#x6807;&lt;/label&gt;
                    &lt;input type=&quot;radio&quot; name=&quot;chooseType&quot;/&gt;&lt;label&gt;&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;&lt;/label&gt;
                &lt;/p&gt;
            &lt;/div&gt;
            &lt;ul&gt;
                &lt;li class=&quot;li1&quot;&gt;
                    &lt;div&gt;
                        &lt;span class=&quot;type-span&quot;&gt;&lt;/span&gt;
                        &lt;span&gt;html5&lt;/span&gt;
                        &lt;span class=&quot;close&quot;&gt;X&lt;/span&gt;
                    &lt;/div&gt;
                &lt;/li&gt;
                &lt;li class=&quot;li1&quot;&gt;
                    &lt;div&gt;
                        &lt;span class=&quot;type-span&quot;&gt;&lt;/span&gt;
                        &lt;span&gt;css3&lt;/span&gt;
                        &lt;span class=&quot;close&quot;&gt;X&lt;/span&gt;
                    &lt;/div&gt;
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    &lt;/body&gt;
    &lt;script src=&quot;vue2.4.2.js&quot;&gt;&lt;/script&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
    new Vue({
        el: &quot;#app&quot;,
        data: {
        },
        computed:{
            
        },
        methods:{
            
        }
    });
    &lt;/script&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
            <span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">font-family</span>: <span class="hljs-string">&quot;&#x5FAE;&#x8F6F;&#x96C5;&#x9ED1;&quot;</span>;<span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;}
            <span class="hljs-selector-tag">input</span>{<span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;}
            <span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">div</span>,<span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;}
            <span class="hljs-selector-class">.hidden</span>{<span class="hljs-attribute">display</span>: none;}
            <span class="hljs-selector-class">.main</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;}
            <span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">list-style-type</span>: none;<span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">position</span>: relative;<span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid transparent;<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;}
            <span class="hljs-selector-tag">li</span> <span class="hljs-selector-class">.type-span</span>{<span class="hljs-attribute">display</span>: block;<span class="hljs-attribute">width</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;<span class="hljs-attribute">margin</span>: <span class="hljs-number">14px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> ;<span class="hljs-attribute">float</span>: left;}
            <span class="hljs-selector-tag">li</span> <span class="hljs-selector-class">.close</span>{<span class="hljs-attribute">position</span>: absolute;<span class="hljs-attribute">color</span>: <span class="hljs-number">#f00</span>;<span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;<span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">right</span>: <span class="hljs-number">20px</span>;<span class="hljs-attribute">cursor</span>: pointer;<span class="hljs-attribute">display</span>: none;<span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;}
            <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span>{<span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#09f</span>;}
            <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.close</span>{<span class="hljs-attribute">display</span>: block;}
            <span class="hljs-selector-tag">li</span> <span class="hljs-selector-class">.text-keyword</span>{<span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">box-sizing</span>: border-box;<span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">width</span>: <span class="hljs-number">80%</span>;<span class="hljs-attribute">display</span>: none;}
            <span class="hljs-selector-class">.text-keyword</span>{<span class="hljs-attribute">box-sizing</span>: border-box;<span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">outline</span>: none;}
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;main&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>&#x5C0F;&#x76EE;&#x6807;&#x5217;&#x8868;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>&#x6DFB;&#x52A0;&#x5C0F;&#x76EE;&#x6807;<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-keyword&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;&#x8F93;&#x5165;&#x5C0F;&#x76EE;&#x6807;&#x540E;&#xFF0C;&#x6309;&#x56DE;&#x8F66;&#x786E;&#x8BA4;&quot;</span>/&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x5171;&#x6709;N&#x4E2A;&#x76EE;&#x6807;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;chooseType&quot;</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">&quot;true&quot;</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>&#x6240;&#x6709;&#x76EE;&#x6807;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;chooseType&quot;</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>&#x5DF2;&#x5B8C;&#x6210;&#x76EE;&#x6807;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;chooseType&quot;</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;li1&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;type-span&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>html5<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;close&quot;</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;li1&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;type-span&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>css3<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;close&quot;</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;vue2.4.2.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">&quot;#app&quot;</span>,
        data: {
        },
        computed:{
            
        },
        methods:{
            
        }
    });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>&#x5E03;&#x5C40;&#x6709;&#x4E86;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x4E00;&#x4E2A;&#x9AA8;&#x67B6;&#x5C31;&#x6709;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x5B9E;&#x73B0;&#x529F;&#x80FD;&#xFF0C;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x6765;</p>
<h3 id="articleHeader17">&#x6B65;&#x9AA4;1</h3>
<p>&#x8F93;&#x5165;&#x5E76;&#x56DE;&#x8F66;&#xFF0C;&#x591A;&#x4E00;&#x6761;&#x8BB0;&#x5F55;&#x3002;&#x4E0B;&#x9762;&#x7684;&#x8BB0;&#x5F55;&#x6587;&#x5B57;&#x4E5F;&#x4F1A;&#x6539;&#x53D8;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVS3MW?w=891&amp;h=182" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>&#x9996;&#x5148;&#xFF0C;&#x5927;&#x7684;&#x8F93;&#x5165;&#x6846;&#x56DE;&#x8F66;&#x8981;&#x6DFB;&#x52A0;&#x7EAA;&#x5F55;&#xFF0C;&#x90A3;&#x4E48;&#x8F93;&#x5165;&#x6846;&#x5FC5;&#x987B;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x503C;&#x548C;&#x4E00;&#x4E2A;&#x6DFB;&#x52A0;&#x7EAA;&#x5F55;&#x7684;&#x65B9;&#x6CD5;&#x3002;<br>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;<br>&#x7136;&#x540E;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x8BB0;&#x5F55;&#x4E5F;&#x8981;&#x6539;&#x53D8;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x8BB0;&#x5F55;&#x4E5F;&#x8981;&#x5E2E;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x8BB0;&#x5F55;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x591A;&#x4E2A;&#xFF0C;&#x8FD9;&#x4E2A;&#x503C;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x8BB0;&#x5F55;&#x9664;&#x4E86;&#x540D;&#x79F0;&#xFF0C;&#x8FD8;&#x6709;&#x8BB0;&#x5F55;&#x662F;&#x5426;&#x5B8C;&#x6210;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x7ED1;&#x5B9A;&#x8BB0;&#x5F55;&#x7684;&#x8FD9;&#x4E2A;&#x503C;&#x80AF;&#x5B9A;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x6570;&#x7EC4;&#xFF01;&#x4EE3;&#x7801;&#x5982;&#x4E0B;<br>&#x6700;&#x540E;&#xFF0C;&#x8BB0;&#x5F55;&#x6587;&#x5B57;<span class="img-wrap"><img src="https://static.alili.tech/img/bVS38M?w=128&amp;h=41" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>&#x8981;&#x6539;&#x53D8;&#x3002;&#x8FD9;&#x4E2A;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x5F53;&#x524D;&#x8BB0;&#x5F55;&#x7684;&#x957F;&#x5EA6;&#x5373;&#x53EF;&#xFF01;</p>
<blockquote>&#x4E3A;&#x4E86;&#x7740;&#x91CD;&#x8868;&#x793A;&#x6211;&#x4FEE;&#x6539;&#x4E86;&#x4EC0;&#x4E48;&#x5730;&#x65B9;&#xFF0C;&#x4EE3;&#x7801;&#x6211;&#x73B0;&#x5728;&#x53EA;&#x8D34;&#x51FA;&#x4FEE;&#x6539;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x5927;&#x5BB6;&#x5BF9;&#x7740;&#x4E0A;&#x9762;&#x7684;&#x5E03;&#x5C40;&#xFF0C;&#x5C31;&#x5F88;&#x5BB9;&#x6613;&#x77E5;&#x9053;&#x6211;&#x6539;&#x7684;&#x662F;&#x4EC0;&#x4E48;&#x5730;&#x65B9;&#x4E86;&#xFF01;&#x4E0B;&#x9762;&#x4E5F;&#x662F;&#x8FD9;&#x6837;&#x64CD;&#x4F5C;&#xFF01;</blockquote>
<p>html&#x4EE3;&#x7801;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!--&#x5229;&#x7528;v-model&#x628A;addText&#x7ED1;&#x5B9A;&#x5230;input--&gt;
&lt;input type=&quot;text&quot; class=&quot;text-keyword&quot; placeholder=&quot;&#x8F93;&#x5165;&#x5C0F;&#x76EE;&#x6807;&#x540E;&#xFF0C;&#x6309;&#x56DE;&#x8F66;&#x786E;&#x8BA4;&quot; @keyup.13=&apos;addList&apos; v-model=&quot;addText&quot;/&gt;
&lt;p&gt;&#x5171;&#x6709;{{prolist.length}}&#x4E2A;&#x76EE;&#x6807;&lt;/p&gt;
&lt;!--v-for&#x904D;&#x5386;prolist--&gt;
&lt;li class=&quot;li1&quot; v-for=&quot;list in prolist&quot;&gt;
    &lt;div&gt;
        &lt;span class=&quot;type-span&quot;&gt;&lt;/span&gt;
        &lt;span&gt;{{list.name}}&lt;/span&gt;
        &lt;span class=&quot;close&quot;&gt;X&lt;/span&gt;
    &lt;/div&gt;
&lt;/li&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!--&#x5229;&#x7528;v-model&#x628A;addText&#x7ED1;&#x5B9A;&#x5230;input--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-keyword&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;&#x8F93;&#x5165;&#x5C0F;&#x76EE;&#x6807;&#x540E;&#xFF0C;&#x6309;&#x56DE;&#x8F66;&#x786E;&#x8BA4;&quot;</span> @<span class="hljs-attr">keyup.13</span>=<span class="hljs-string">&apos;addList&apos;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;addText&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x5171;&#x6709;</span><span class="hljs-template-variable">"{{"prolist.length"}}"</span><span class="xml">&#x4E2A;&#x76EE;&#x6807;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-comment">&lt;!--v-for&#x904D;&#x5386;prolist--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;li1&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;list in prolist&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;type-span&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"list.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;close&quot;</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
</span></code></pre>
<p>js&#x4EE3;&#x7801;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: &quot;#app&quot;,
    data: {
        addText:&apos;&apos;,
        //name-&#x540D;&#x79F0;,status-&#x5B8C;&#x6210;&#x72B6;&#x6001;
       prolist:[
               {name:&quot;HTML5&quot;,status:false},
               {name:&quot;CSS3&quot;,status:false},
               {name:&quot;vue&quot;,status:false},
               {name:&quot;react&quot;,status:false}
        ]
    },
    computed:{
        
    },
    methods:{
        addList(){
            //&#x6DFB;&#x52A0;&#x8FDB;&#x6765;&#x9ED8;&#x8BA4;status=false,&#x5C31;&#x662F;&#x672A;&#x5B8C;&#x6210;&#x72B6;&#x6001;
            this.prolist.push({
                name:this.addText,
                status:false
            });
            //&#x6DFB;&#x52A0;&#x540E;&#xFF0C;&#x6E05;&#x7A7A;addText
            this.addText=&quot;&quot;;
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-keyword">new</span> Vue({
<span class="hljs-symbol">    el:</span> <span class="hljs-string">&quot;#app&quot;</span>,
<span class="hljs-symbol">    data:</span> {
<span class="hljs-symbol">        addText:</span><span class="hljs-string">&apos;&apos;</span>,
        <span class="hljs-comment">//name-&#x540D;&#x79F0;,status-&#x5B8C;&#x6210;&#x72B6;&#x6001;</span>
<span class="hljs-symbol">       prolist:</span>[
               {<span class="hljs-string">name:</span><span class="hljs-string">&quot;HTML5&quot;</span>,<span class="hljs-string">status:</span><span class="hljs-literal">false</span>},
               {<span class="hljs-string">name:</span><span class="hljs-string">&quot;CSS3&quot;</span>,<span class="hljs-string">status:</span><span class="hljs-literal">false</span>},
               {<span class="hljs-string">name:</span><span class="hljs-string">&quot;vue&quot;</span>,<span class="hljs-string">status:</span><span class="hljs-literal">false</span>},
               {<span class="hljs-string">name:</span><span class="hljs-string">&quot;react&quot;</span>,<span class="hljs-string">status:</span><span class="hljs-literal">false</span>}
        ]
    },
<span class="hljs-symbol">    computed:</span>{
        
    },
<span class="hljs-symbol">    methods:</span>{
        addList(){
            <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x8FDB;&#x6765;&#x9ED8;&#x8BA4;status=false,&#x5C31;&#x662F;&#x672A;&#x5B8C;&#x6210;&#x72B6;&#x6001;</span>
            <span class="hljs-keyword">this</span>.prolist.push({
<span class="hljs-symbol">                name:</span><span class="hljs-keyword">this</span>.addText,
<span class="hljs-symbol">                status:</span><span class="hljs-literal">false</span>
            });
            <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x540E;&#xFF0C;&#x6E05;&#x7A7A;addText</span>
            <span class="hljs-keyword">this</span>.addText=<span class="hljs-string">&quot;&quot;</span>;
        }
    }
});</code></pre>
<p>&#x6D4B;&#x8BD5;&#x4E00;&#x4E0B;&#xFF0C;&#x6CA1;&#x95EE;&#x9898;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVS88A?w=927&amp;h=501" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader18">&#x6B65;&#x9AA4;2</h3>
<p>&#x70B9;&#x51FB;&#x5207;&#x6362;&#xFF0C;&#x4E0B;&#x9762;&#x8BB0;&#x5F55;&#x4F1A;&#x6539;&#x53D8;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVS3Nj?w=943&amp;h=263" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>&#x770B;&#x5230;&#x4E09;&#x4E2A;&#x9009;&#x9879;&#xFF0C;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x65E0;&#x975E;&#x5C31;&#x662F;&#x4E09;&#x4E2A;&#x9009;&#x62E9;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x6240;&#x6709;&#x7684;&#x76EE;&#x6807;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x6240;&#x6709;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x7684;&#x76EE;&#x6807;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x6240;&#x6709;&#x6CA1;&#x5B8C;&#x6210;&#x7684;&#x76EE;&#x6807;&#x3002;<br>&#x9996;&#x5148;.&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x53D8;&#x91CF;&#xFF08;newList&#xFF09;&#xFF0C;&#x50A8;&#x5B58;prolist&#x3002;&#x904D;&#x5386;&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x518D;&#x904D;&#x5386;prolist&#xFF0C;&#x800C;&#x662F;&#x904D;&#x5386;newList&#x3002;&#x6539;&#x53D8;&#x4E5F;&#x662F;&#x6539;&#x53D8;newList&#x3002;<br>&#x7136;&#x540E;.&#x9009;&#x62E9;&#x6240;&#x6709;&#x76EE;&#x6807;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x663E;&#x793A;&#x5168;&#x90E8;prolist&#xFF0C;&#x628A;prolist&#x8D4B;&#x503C;&#x7ED9;newList&#x3002;<br>&#x7136;&#x540E;.&#x9009;&#x62E9;&#x6240;&#x6709;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x76EE;&#x6807;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EA;&#x663E;&#x793A;prolist&#x4E2D;&#xFF0C;status&#x4E3A;true&#x7684;&#x76EE;&#x6807;&#xFF0C;&#x628A;prolist&#x4E2D;&#xFF0C;status&#x4E3A;true&#x7684;&#x9879;&#x8D4B;&#x503C;&#x7ED9;newList&#xFF0C;<br>&#x6700;&#x540E;.&#x9009;&#x62E9;&#x6240;&#x6709;&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EA;&#x663E;&#x793A;status&#x4E3A;false&#x7684;&#x76EE;&#x6807;&#xFF0C;&#x628A;prolist&#x4E2D;&#xFF0C;status&#x4E3A;false&#x7684;&#x9879;&#x8D4B;&#x503C;&#x7ED9;newList&#x3002;</p>
<p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p>
<p>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;ul&gt;
    &lt;li class=&quot;li1&quot; v-for=&quot;list in newList&quot;&gt;
        &lt;div&gt;
            &lt;span class=&quot;status-span&quot;&gt;&lt;/span&gt;
            &lt;span&gt;{{list.name}}&lt;/span&gt;
            &lt;span class=&quot;close&quot; @click=&apos;delectList(index)&apos;&gt;X&lt;/span&gt;
        &lt;/div&gt;
    &lt;/li&gt;
&lt;/ul&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;li1&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;list in newList&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;status-span&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"list.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;close&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&apos;delectList(index)&apos;</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span></code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: &quot;#app&quot;,
    data: {
        addText:&apos;&apos;,
        //name-&#x540D;&#x79F0;,status-&#x5B8C;&#x6210;&#x72B6;&#x6001;
       prolist:[
               {name:&quot;HTML5&quot;,status:false},
               {name:&quot;CSS3&quot;,status:false},
               {name:&quot;vue&quot;,status:false},
               {name:&quot;react&quot;,status:false}
        ],
        newList:[]
    },
    computed:{
        noend:function(){
            return this.prolist.filter(function(item){
                return !item.status
            }).length;
        }
    },
    methods:{
        addList(){
            //&#x6DFB;&#x52A0;&#x8FDB;&#x6765;&#x9ED8;&#x8BA4;status=false,&#x5C31;&#x662F;&#x672A;&#x5B8C;&#x6210;&#x72B6;&#x6001;
            this.prolist.push({
                name:this.addText,
                status:false
            });
            //&#x6DFB;&#x52A0;&#x540E;&#xFF0C;&#x6E05;&#x7A7A;addText
            this.addText=&quot;&quot;;
        },
        chooseList(type){
            //type=1&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x76EE;&#x6807;
            //type=2&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x5DF2;&#x5B8C;&#x6210;&#x76EE;&#x6807;
            //type=3&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;
            switch(type){
                case 1:this.newList=this.prolist;break;
                case 2:this.newList=this.prolist.filter(function(item){return item.status});break;
                case 3:this.newList=this.prolist.filter(function(item){return !item.status});break;
            }
        },
        delectList(index){
            //&#x6839;&#x636E;&#x7D22;&#x5F15;&#xFF0C;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x67D0;&#x4E00;&#x9879;
            this.prolist.splice(index,1);
            //&#x66F4;&#x65B0;newList  newList&#x53EF;&#x80FD;&#x7ECF;&#x8FC7;this.prolist.filter()&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#xFF0C;&#x5220;&#x9664;&#x4E86;prolist&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230;newList  &#x90A3;&#x4E48;&#x5C31;&#x8981;&#x624B;&#x52A8;&#x66F4;&#x65B0;newList
            this.newList=this.prolist;
        },
    },
    mounted(){
        //&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x628A;prolist&#x8D4B;&#x503C;&#x7ED9;newList&#x3002;&#x9ED8;&#x8BA4;&#x663E;&#x793A;&#x6240;&#x6709;&#x76EE;&#x6807;
        this.newList=this.prolist;
    }
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code>new Vue({
    el: <span class="hljs-string">&quot;#app&quot;</span>,
    <span class="hljs-keyword">data</span>: {
        addText:<span class="hljs-string">&apos;&apos;</span>,
        <span class="hljs-comment">//name-&#x540D;&#x79F0;,status-&#x5B8C;&#x6210;&#x72B6;&#x6001;</span>
       prolist:[
               {name:<span class="hljs-string">&quot;HTML5&quot;</span>,status:<span class="hljs-literal">false</span>},
               {name:<span class="hljs-string">&quot;CSS3&quot;</span>,status:<span class="hljs-literal">false</span>},
               {name:<span class="hljs-string">&quot;vue&quot;</span>,status:<span class="hljs-literal">false</span>},
               {name:<span class="hljs-string">&quot;react&quot;</span>,status:<span class="hljs-literal">false</span>}
        ],
        newList:[]
    },
    computed:{
        noend:function(){
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.prolist.filter(function(item){
                <span class="hljs-keyword">return</span> !item.status
            }).length;
        }
    },
    methods:{
        addList(){
            <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x8FDB;&#x6765;&#x9ED8;&#x8BA4;status=false,&#x5C31;&#x662F;&#x672A;&#x5B8C;&#x6210;&#x72B6;&#x6001;</span>
            <span class="hljs-keyword">this</span>.prolist.push({
                name:<span class="hljs-keyword">this</span>.addText,
                status:<span class="hljs-literal">false</span>
            });
            <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x540E;&#xFF0C;&#x6E05;&#x7A7A;addText</span>
            <span class="hljs-keyword">this</span>.addText=<span class="hljs-string">&quot;&quot;</span>;
        },
        chooseList(type){
            <span class="hljs-comment">//type=1&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x76EE;&#x6807;</span>
            <span class="hljs-comment">//type=2&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x5DF2;&#x5B8C;&#x6210;&#x76EE;&#x6807;</span>
            <span class="hljs-comment">//type=3&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;</span>
            switch(type){
                case <span class="hljs-number">1</span>:<span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist;<span class="hljs-keyword">break</span>;
                case <span class="hljs-number">2</span>:<span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist.filter(function(item){<span class="hljs-keyword">return</span> item.status});<span class="hljs-keyword">break</span>;
                case <span class="hljs-number">3</span>:<span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist.filter(function(item){<span class="hljs-keyword">return</span> !item.status});<span class="hljs-keyword">break</span>;
            }
        },
        delectList(index){
            <span class="hljs-comment">//&#x6839;&#x636E;&#x7D22;&#x5F15;&#xFF0C;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x67D0;&#x4E00;&#x9879;</span>
            <span class="hljs-keyword">this</span>.prolist.splice(index,<span class="hljs-number">1</span>);
            <span class="hljs-comment">//&#x66F4;&#x65B0;newList  newList&#x53EF;&#x80FD;&#x7ECF;&#x8FC7;this.prolist.filter()&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#xFF0C;&#x5220;&#x9664;&#x4E86;prolist&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230;newList  &#x90A3;&#x4E48;&#x5C31;&#x8981;&#x624B;&#x52A8;&#x66F4;&#x65B0;newList</span>
            <span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist;
        },
    },
    mounted(){
        <span class="hljs-comment">//&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x628A;prolist&#x8D4B;&#x503C;&#x7ED9;newList&#x3002;&#x9ED8;&#x8BA4;&#x663E;&#x793A;&#x6240;&#x6709;&#x76EE;&#x6807;</span>
        <span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist;
    }
});
</code></pre>
<p>&#x8FD0;&#x884C;&#x7ED3;&#x679C;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVS9MS?w=481&amp;h=210" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader19">&#x6B65;&#x9AA4;3</h3>
<p>&#x7EA2;&#x8272;&#x5173;&#x95ED;&#x6807;&#x8BC6;&#xFF0C;&#x70B9;&#x51FB;&#x4F1A;&#x5220;&#x9664;&#x8BE5;&#x8BB0;&#x5F55;&#x3002;&#x524D;&#x9762;&#x6309;&#x94AE;&#x70B9;&#x51FB;&#x4F1A;&#x5207;&#x6362;&#x8BE5;&#x8BB0;&#x5F55;&#x5B8C;&#x6210;&#x72B6;&#x6001;&#xFF0C;&#x989C;&#x8272;&#x4E5F;&#x6539;&#x53D8;&#xFF0C;&#x8BB0;&#x5F55;&#x6587;&#x5B57;&#x4E5F;&#x8DDF;&#x7740;&#x6539;&#x53D8;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVS3NR?w=988&amp;h=256" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>&#x9996;&#x5148;&#x70B9;&#x51FB;&#x7EA2;&#x8272;&#x5173;&#x95ED;&#x6807;&#x8BC6;&#xFF0C;&#x70B9;&#x51FB;&#x4F1A;&#x5220;&#x9664;&#x8BE5;&#x8BB0;&#x5F55;&#x3002;&#x8FD9;&#x4E2A;&#x5E94;&#x8BE5;&#x6CA1;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#xFF0C;&#x5C31;&#x662F;&#x5220;&#x9664;prolist&#x7684;&#x4E00;&#x6761;&#x8BB0;&#x5F55;&#xFF01;<br>&#x7136;&#x540E;&#x524D;&#x9762;&#x6309;&#x94AE;&#x70B9;&#x51FB;&#x4F1A;&#x5207;&#x6362;&#x8BE5;&#x8BB0;&#x5F55;&#x5B8C;&#x6210;&#x72B6;&#x6001;&#x3002;&#x8FD9;&#x4E2A;&#x4E5F;&#x6CA1;&#x4EC0;&#x4E48;&#xFF0C;&#x5C31;&#x662F;&#x6539;&#x53D8;prolist&#x7684;&#x4E00;&#x6761;&#x8BB0;&#x5F55;&#x7684;status&#x5B57;&#x6BB5;&#xFF01;<br>&#x6700;&#x540E;&#x8BB0;&#x5F55;&#x6587;&#x5B57;&#x7684;&#x6539;&#x53D8;&#xFF0C;&#x5C31;&#x662F;&#x8BB0;&#x5F55;prolist&#x4E2D;status&#x4E3A;false&#x7684;&#x6709;&#x591A;&#x5C11;&#x6761;&#xFF0C;prolist&#x4E2D;status&#x4E3A;true&#x7684;&#x6709;&#x591A;&#x5C11;&#x6761;&#x800C;&#x5DF2;</p>
<p>html&#x4EE3;&#x7801;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!--&#x5982;&#x679C;noend&#x7B49;&#x4E8E;0&#xFF0C;&#x5C31;&#x662F;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#x4E86;&#x5C31;&#x663E;&#x793A;&#x2018;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#x4E86;&#x2019;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5C31;&#x662F;&#x663E;&#x793A;&#x5DF2;&#x5B8C;&#x6210;&#x591A;&#x5C11;&#x6761;&#xFF08;prolist.length-noend&#xFF09;&#x548C;&#x672A;&#x5B8C;&#x6210;&#x591A;&#x5C11;&#x6761;&#xFF08;noend&#xFF09;--&gt;
&lt;p&gt;&#x5171;&#x6709;{{prolist.length}}&#x4E2A;&#x76EE;&#x6807;&#xFF0C;{{noend==0?&quot;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#x4E86;&quot;:&apos;&#x5DF2;&#x5B8C;&#x6210;&apos;+(prolist.length-noend)+&apos;&#xFF0C;&#x8FD8;&#x6709;&apos;+noend+&apos;&#x6761;&#x672A;&#x5B8C;&#x6210;&apos;}}&lt;/p&gt;


&lt;ul&gt;
    &lt;li class=&quot;li1&quot; v-for=&quot;(list,index) in newList&quot;&gt;
        &lt;div&gt;
            &lt;span class=&quot;status-span&quot; @click=&quot;list.status=!list.status&quot; :class=&quot;{&apos;status-end&apos;:list.status}&quot;&gt;&lt;/span&gt;
            &lt;span&gt;{{list.name}}&lt;/span&gt;
            &lt;span class=&quot;close&quot; @click=&apos;delectList(index)&apos;&gt;X&lt;/span&gt;
        &lt;/div&gt;
    &lt;/li&gt;
&lt;/ul&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-comment">&lt;!--&#x5982;&#x679C;noend&#x7B49;&#x4E8E;0&#xFF0C;&#x5C31;&#x662F;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#x4E86;&#x5C31;&#x663E;&#x793A;&#x2018;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#x4E86;&#x2019;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5C31;&#x662F;&#x663E;&#x793A;&#x5DF2;&#x5B8C;&#x6210;&#x591A;&#x5C11;&#x6761;&#xFF08;prolist.length-noend&#xFF09;&#x548C;&#x672A;&#x5B8C;&#x6210;&#x591A;&#x5C11;&#x6761;&#xFF08;noend&#xFF09;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x5171;&#x6709;</span><span class="hljs-template-variable">"{{"prolist.length}</span><span class="xml">}&#x4E2A;&#x76EE;&#x6807;&#xFF0C;</span><span class="hljs-template-variable">"{{"noend==0?&quot;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#x4E86;&quot;:&apos;&#x5DF2;&#x5B8C;&#x6210;&apos;+(prolist.length-noend)+&apos;&#xFF0C;&#x8FD8;&#x6709;&apos;+noend+&apos;&#x6761;&#x672A;&#x5B8C;&#x6210;&apos;}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>


<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;li1&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(list,index) in newList&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;status-span&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;list.status=!list.status&quot;</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{&apos;status-end&apos;:list.status}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"list.name}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;close&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&apos;delectList(index)&apos;</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span></code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: &quot;#app&quot;,
    data: {
        addText:&apos;&apos;,
        //name-&#x540D;&#x79F0;,status-&#x5B8C;&#x6210;&#x72B6;&#x6001;
       prolist:[
               {name:&quot;HTML5&quot;,status:false},
               {name:&quot;CSS3&quot;,status:false},
               {name:&quot;vue&quot;,status:false},
               {name:&quot;react&quot;,status:false}
        ],
        newList:[]
    },
    computed:{
        //&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF0C;&#x8FD4;&#x56DE;&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;&#x7684;&#x6761;&#x6570;&#xFF0C;&#x5C31;&#x662F;&#x6570;&#x7EC4;&#x91CC;&#x9762;status=false&#x7684;&#x6761;&#x6570;
        noend:function(){
            return this.prolist.filter(function(item){
                return !item.status
            }).length;
        }
    },
    methods:{
        addList(){
            //&#x6DFB;&#x52A0;&#x8FDB;&#x6765;&#x9ED8;&#x8BA4;status=false,&#x5C31;&#x662F;&#x672A;&#x5B8C;&#x6210;&#x72B6;&#x6001;
            this.prolist.push({
                name:this.addText,
                status:false
            });
            //&#x6DFB;&#x52A0;&#x540E;&#xFF0C;&#x6E05;&#x7A7A;addText
            this.addText=&quot;&quot;;
        },
        chooseList(type){
            switch(type){
                case 1:this.newList=this.prolist;break;
                case 2:this.newList=this.prolist.filter(function(item){return item.status});break;
                case 3:this.newList=this.prolist.filter(function(item){return !item.status});break;
            }
        },
        delectList(index){
            //&#x6839;&#x636E;&#x7D22;&#x5F15;&#xFF0C;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x67D0;&#x4E00;&#x9879;
            this.prolist.splice(index,1);
            //&#x66F4;&#x65B0;newList  newList&#x53EF;&#x80FD;&#x7ECF;&#x8FC7;this.prolist.filter()&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#xFF0C;&#x5220;&#x9664;&#x4E86;prolist&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230;newList  &#x90A3;&#x4E48;&#x5C31;&#x8981;&#x624B;&#x52A8;&#x66F4;&#x65B0;newList
            this.newList=this.prolist;
        },
    },
    mounted(){
        this.newList=this.prolist;
    }
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code>new Vue({
    el: <span class="hljs-string">&quot;#app&quot;</span>,
    <span class="hljs-keyword">data</span>: {
        addText:<span class="hljs-string">&apos;&apos;</span>,
        <span class="hljs-comment">//name-&#x540D;&#x79F0;,status-&#x5B8C;&#x6210;&#x72B6;&#x6001;</span>
       prolist:[
               {name:<span class="hljs-string">&quot;HTML5&quot;</span>,status:<span class="hljs-literal">false</span>},
               {name:<span class="hljs-string">&quot;CSS3&quot;</span>,status:<span class="hljs-literal">false</span>},
               {name:<span class="hljs-string">&quot;vue&quot;</span>,status:<span class="hljs-literal">false</span>},
               {name:<span class="hljs-string">&quot;react&quot;</span>,status:<span class="hljs-literal">false</span>}
        ],
        newList:[]
    },
    computed:{
        <span class="hljs-comment">//&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF0C;&#x8FD4;&#x56DE;&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;&#x7684;&#x6761;&#x6570;&#xFF0C;&#x5C31;&#x662F;&#x6570;&#x7EC4;&#x91CC;&#x9762;status=false&#x7684;&#x6761;&#x6570;</span>
        noend:function(){
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.prolist.filter(function(item){
                <span class="hljs-keyword">return</span> !item.status
            }).length;
        }
    },
    methods:{
        addList(){
            <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x8FDB;&#x6765;&#x9ED8;&#x8BA4;status=false,&#x5C31;&#x662F;&#x672A;&#x5B8C;&#x6210;&#x72B6;&#x6001;</span>
            <span class="hljs-keyword">this</span>.prolist.push({
                name:<span class="hljs-keyword">this</span>.addText,
                status:<span class="hljs-literal">false</span>
            });
            <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x540E;&#xFF0C;&#x6E05;&#x7A7A;addText</span>
            <span class="hljs-keyword">this</span>.addText=<span class="hljs-string">&quot;&quot;</span>;
        },
        chooseList(type){
            switch(type){
                case <span class="hljs-number">1</span>:<span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist;<span class="hljs-keyword">break</span>;
                case <span class="hljs-number">2</span>:<span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist.filter(function(item){<span class="hljs-keyword">return</span> item.status});<span class="hljs-keyword">break</span>;
                case <span class="hljs-number">3</span>:<span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist.filter(function(item){<span class="hljs-keyword">return</span> !item.status});<span class="hljs-keyword">break</span>;
            }
        },
        delectList(index){
            <span class="hljs-comment">//&#x6839;&#x636E;&#x7D22;&#x5F15;&#xFF0C;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x67D0;&#x4E00;&#x9879;</span>
            <span class="hljs-keyword">this</span>.prolist.splice(index,<span class="hljs-number">1</span>);
            <span class="hljs-comment">//&#x66F4;&#x65B0;newList  newList&#x53EF;&#x80FD;&#x7ECF;&#x8FC7;this.prolist.filter()&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#xFF0C;&#x5220;&#x9664;&#x4E86;prolist&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230;newList  &#x90A3;&#x4E48;&#x5C31;&#x8981;&#x624B;&#x52A8;&#x66F4;&#x65B0;newList</span>
            <span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist;
        },
    },
    mounted(){
        <span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist;
    }
});
</code></pre>
<p>&#x8FD0;&#x884C;&#x7ED3;&#x679C;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVS9MW?w=939&amp;h=391" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader20">&#x6B65;&#x9AA4;4</h3>
<p>&#x6587;&#x5B57;&#x53CC;&#x51FB;&#x4F1A;&#x51FA;&#x73B0;&#x8F93;&#x5165;&#x6846;&#xFF0C;&#x53EF;&#x8F93;&#x5165;&#x6587;&#x5B57;&#xFF0C;&#x5982;&#x679C;&#x56DE;&#x8F66;&#x6216;&#x8005;&#x5931;&#x53BB;&#x7126;&#x70B9;&#xFF0C;&#x5C31;&#x6539;&#x53D8;&#x6587;&#x5B57;&#xFF0C;&#x5982;&#x679C;&#x6309;&#x4E0B;ESC&#x5C31;&#x6062;&#x590D;&#x539F;&#x6765;&#x7684;&#x6587;&#x5B57;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVS3N2?w=918&amp;h=277" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>&#x9996;&#x5148;.&#x53CC;&#x51FB;&#x51FA;&#x73B0;&#x8F93;&#x5165;&#x6846;&#xFF0C;&#x5C31;&#x662F;&#x53CC;&#x51FB;&#x6587;&#x5B57;&#x540E;&#xFF0C;&#x7ED9;&#x5F53;&#x524D;&#x7684;li&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x7C7B;&#x540D;&#xFF08;&#x2018;<code>eidting</code>&#x2019;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x5199;&#x597D;&#x6837;&#x5F0F;&#x3002;&#x5F53;li&#x51FA;&#x73B0;&#x8FD9;&#x4E2A;&#x7C7B;&#x540D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x51FA;&#x73B0;&#x8F93;&#x5165;&#x6846;&#xFF0C;&#x5E76;&#x4E14;&#x9690;&#x85CF;&#x5176;&#x5B83;&#x5185;&#x5BB9;&#x3002;<br>&#x7136;&#x540E;.&#x56DE;&#x8F66;&#x6216;&#x8005;&#x5931;&#x53BB;&#x7126;&#x70B9;&#xFF0C;&#x5C31;&#x6539;&#x53D8;&#x6587;&#x5B57;&#x8FD9;&#x4E2A;&#x53EA;&#x9700;&#x8981;&#x64CD;&#x4F5C;&#x4E00;&#x4E2A;&#xFF0C;&#x5C31;&#x662F;&#x628A;&#x7C7B;&#x540D;&#xFF08;&#x2018;<code>eidting</code>&#x2019;&#xFF09;&#x6E05;&#x9664;&#x6389;&#x3002;&#x7136;&#x540E;&#x8F93;&#x5165;&#x6846;&#x5C31;&#x4F1A;&#x9690;&#x85CF;&#xFF0C;&#x5176;&#x5B83;&#x5185;&#x5BB9;&#x663E;&#x793A;&#xFF01;<br>&#x6700;&#x540E;.&#x6309;&#x4E0B;ESC&#x5C31;&#x6062;&#x590D;&#x539F;&#x6765;&#x7684;&#x6587;&#x5B57;&#xFF0C;&#x5C31;&#x662F;&#x51FA;&#x73B0;&#x8F93;&#x5165;&#x6846;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7528;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF08;&#x2018;<code>beforeEditText</code>&#x2019;&#xFF09;&#x5148;&#x4FDD;&#x5B58;&#x5F53;&#x524D;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x7136;&#x540E;&#x6309;&#x4E0B;&#x4E86;ESC&#xFF0C;&#x5C31;&#x628A;&#x53D8;&#x91CF;&#xFF08;&#x2018;<code>beforeEditText</code>&#x2019;&#xFF09;&#x8D4B;&#x503C;&#x7ED9;&#x5F53;&#x524D;&#x64CD;&#x4F5C;&#x7684;&#x503C;&#xFF01;</p>
<p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<p>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;ul&gt;
    &lt;li class=&quot;li1&quot; v-for=&quot;(list,index) in newList&quot; :class=&quot;{&apos;eidting&apos;:curIndex===index}&quot;&gt;
        &lt;div&gt;
            &lt;span class=&quot;status-span&quot; @click=&quot;list.status=!list.status&quot; :class=&quot;{&apos;status-end&apos;:list.status}&quot;&gt;&lt;/span&gt;
            &lt;span @dblclick=&quot;curIndex=index&quot;&gt;{{list.name}}&lt;/span&gt;
            &lt;span class=&quot;close&quot; @click=&apos;delectList(index)&apos;&gt;X&lt;/span&gt;
        &lt;/div&gt;
        &lt;input type=&quot;text&quot; class=&quot;text2&quot; v-model=&apos;list.name&apos; @keyup.esc=&apos;cancelEdit(list)&apos; @blur=&apos;edited&apos; @focus=&apos;editBefore(list.name)&apos; @keyup.enter=&apos;edited&apos;/&gt;
    &lt;/li&gt;
&lt;/ul&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;ul&gt;
    &lt;li <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;li1&quot;</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;(list,index) in newList&quot;</span> :<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;{&apos;eidting&apos;:curIndex===index}&quot;</span>&gt;
        &lt;div&gt;
            &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;status-span&quot;</span> <span class="hljs-meta">@click</span>=<span class="hljs-string">&quot;list.status=!list.status&quot;</span> :<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;{&apos;status-end&apos;:list.status}&quot;</span>&gt;&lt;/span&gt;
            &lt;span <span class="hljs-meta">@dblclick</span>=<span class="hljs-string">&quot;curIndex=index&quot;</span>&gt;{{list.name}}&lt;/span&gt;
            &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;close&quot;</span> <span class="hljs-meta">@click</span>=<span class="hljs-symbol">&apos;delectList</span>(index)&apos;&gt;<span class="hljs-type">X</span>&lt;/span&gt;
        &lt;/div&gt;
        &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;text2&quot;</span> v-model=<span class="hljs-symbol">&apos;list</span>.name&apos; <span class="hljs-meta">@keyup</span>.esc=<span class="hljs-symbol">&apos;cancelEdit</span>(list)&apos; <span class="hljs-meta">@blur</span>=<span class="hljs-symbol">&apos;edite</span>d&apos; <span class="hljs-meta">@focus</span>=<span class="hljs-symbol">&apos;editBefore</span>(list.name)&apos; <span class="hljs-meta">@keyup</span>.enter=<span class="hljs-symbol">&apos;edite</span>d&apos;/&gt;
    &lt;/li&gt;
&lt;/ul&gt;</code></pre>
<p>css(&#x52A0;&#x4E0A;)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="li div{display: block;}
li.eidting div{display: none;}
li .text2{height: 40px;padding-left: 10px;box-sizing: border-box;margin-left: 10px;width: 80%;display: none;}
li.eidting .text2{display: block;}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">div</span>{<span class="hljs-attribute">display</span>: block;}
<span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.eidting</span> <span class="hljs-selector-tag">div</span>{<span class="hljs-attribute">display</span>: none;}
<span class="hljs-selector-tag">li</span> <span class="hljs-selector-class">.text2</span>{<span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">box-sizing</span>: border-box;<span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">width</span>: <span class="hljs-number">80%</span>;<span class="hljs-attribute">display</span>: none;}
<span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.eidting</span> <span class="hljs-selector-class">.text2</span>{<span class="hljs-attribute">display</span>: block;}</code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods:{
        addList(){
            //&#x6DFB;&#x52A0;&#x8FDB;&#x6765;&#x9ED8;&#x8BA4;status=false,&#x5C31;&#x662F;&#x672A;&#x5B8C;&#x6210;&#x72B6;&#x6001;
            this.prolist.push({
                name:this.addText,
                status:false
            });
            //&#x6DFB;&#x52A0;&#x540E;&#xFF0C;&#x6E05;&#x7A7A;addText
            this.addText=&quot;&quot;;
        },
        chooseList(type){
            //type=1&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x76EE;&#x6807;
            //type=2&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x5DF2;&#x5B8C;&#x6210;&#x76EE;&#x6807;
            //type=3&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;
            switch(type){
                case 1:this.newList=this.prolist;break;
                case 2:this.newList=this.prolist.filter(function(item){return item.status});break;
                case 3:this.newList=this.prolist.filter(function(item){return !item.status});break;
            }
        },
        delectList(index){
            //&#x6839;&#x636E;&#x7D22;&#x5F15;&#xFF0C;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x67D0;&#x4E00;&#x9879;
            this.prolist.splice(index,1);
            //&#x66F4;&#x65B0;newList  newList&#x53EF;&#x80FD;&#x7ECF;&#x8FC7;this.prolist.filter()&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#xFF0C;&#x5220;&#x9664;&#x4E86;prolist&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230;newList  &#x90A3;&#x4E48;&#x5C31;&#x8981;&#x624B;&#x52A8;&#x66F4;&#x65B0;newList
            this.newList=this.prolist;
        },
        //&#x4FEE;&#x6539;&#x524D;
        editBefore(name){
            //&#x5148;&#x8BB0;&#x5F55;&#x5F53;&#x524D;&#x9879;&#xFF08;&#x6BD4;&#x5982;&#x8FD9;&#x4E00;&#x9879;&#xFF0C;{name:&quot;HTML5&quot;,status:false}&#xFF09;
            //beforeEditText=&quot;HTML5&quot;
            this.beforeEditText=name;
        },
        //&#x4FEE;&#x6539;&#x5B8C;&#x6210;&#x540E;
        edited(){
            //&#x4FEE;&#x6539;&#x5B8C;&#x4E86;&#xFF0C;&#x8BBE;&#x7F6E;curIndex=&quot;&quot;&#xFF0C;&#x8FD9;&#x6837;&#x8F93;&#x5165;&#x6846;&#x5C31;&#x9690;&#x85CF;&#xFF0C;&#x5176;&#x5B83;&#x5143;&#x7D20;&#x5C31;&#x4F1A;&#x663E;&#x793A;&#x3002;&#x56E0;&#x4E3A;&#x5728;li&#x5143;&#x7D20; &#x5199;&#x4E86;&#xFF1A;:class=&quot;{&apos;eidting&apos;:curIndex===index}&quot;  &#x5F53;curIndex&#x4E0D;&#x7B49;&#x4E8E;index&#x65F6;&#xFF0C;eidting&#x7C7B;&#x540D;&#x5C31;&#x6E05;&#x9664;&#x4E86;&#xFF01;
            //&#x8F93;&#x5165;&#x6846;&#x5229;&#x7528;v-model&#x7ED1;&#x5B9A;&#x4E86;&#x5F53;&#x524D;&#x9879;&#xFF08;&#x6BD4;&#x5982;&#x8FD9;&#x4E00;&#x9879;&#xFF0C;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#x7684;name,&#x5F53;&#x5728;&#x8F93;&#x5165;&#x6846;&#x7F16;&#x8F91;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x6210;&#x2018;HTML&#x2019;,&#x5B9E;&#x9645;&#x4E0A;&#x5F53;&#x524D;&#x9879;&#x7684;name&#x5DF2;&#x7ECF;&#x53D8;&#x6210;&#x4E86;&#x2018;HTML&#x2019;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x4E00;&#x6B65;&#x53EA;&#x662F;&#x6E05;&#x9664;eidting&#x7C7B;&#x540D;&#xFF0C;&#x9690;&#x85CF;&#x8F93;&#x5165;&#x6846;&#x800C;&#x5DF2;
            //&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5C31;&#x662F;&#x867D;&#x7136;li&#x904D;&#x5386;&#x7684;&#x662F;newList&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x4E86;newList&#x7684;&#x8FD9;&#x4E00;&#x9879;&#xFF08;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x6210;&#x8FD9;&#x6837;&#xFF08;{name:&quot;HTML&quot;,status:true}&#xFF09;&#x3002;&#x5B9E;&#x9645;&#x4E0A;prolist&#x7684;&#x8FD9;&#x4E00;&#x9879;&#xFF08;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#xFF0C;&#x4E5F;&#x4F1A;&#x88AB;&#x6539;&#x6210;&#xFF08;{name:&quot;HTML&quot;,status:true}&#xFF09;&#x3002;&#x56E0;&#x4E3A;&#x8FD9;&#x91CC;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x4E14;&#x516C;&#x7528;&#x4E00;&#x4E2A;&#x5806;&#x6808;&#xFF01;&#x4FEE;&#x6539;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x4F1A;&#x88AB;&#x5F71;&#x54CD;&#x5230;
            this.curIndex=&quot;&quot;;
        },
        //&#x53D6;&#x6D88;&#x4FEE;&#x6539;
        cancelEdit(val){
            //&#x4E0A;&#x9762;&#x8BF4;&#x4E86;&#x8F93;&#x5165;&#x6846;&#x5229;&#x7528;v-model&#x7ED1;&#x5B9A;&#x4E86;&#x5F53;&#x524D;&#x9879;&#xFF08;&#x6BD4;&#x5982;&#x8FD9;&#x4E00;&#x9879;&#xFF0C;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#x7684;name,&#x5F53;&#x5728;&#x8F93;&#x5165;&#x6846;&#x7F16;&#x8F91;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x6210;&#x2018;HTML&#x2019;,&#x5B9E;&#x9645;&#x4E0A;&#x5F53;&#x524D;&#x9879;&#x7684;name&#x5DF2;&#x7ECF;&#x53D8;&#x6210;&#x4E86;&#x2018;HTML&#x2019;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x4E00;&#x6B65;&#x5C31;&#x662F;&#x628A;&#x4E4B;&#x524D;&#x4FDD;&#x5B58;&#x7684;beforeEditText&#x8D4B;&#x503C;&#x7ED9;&#x5F53;&#x524D;&#x9879;&#x7684;name&#x5C5E;&#x6027;&#xFF0C;&#x8D77;&#x5230;&#x4E00;&#x4E2A;&#x6062;&#x590D;&#x539F;&#x6765;&#x503C;&#x5F97;&#x4F5C;&#x7528;&#xFF01;
            val.name=this.beforeEditText;
            this.curIndex=&quot;&quot;;
        }
 }," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code>methods:{
        addList(){
            <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x8FDB;&#x6765;&#x9ED8;&#x8BA4;status=false,&#x5C31;&#x662F;&#x672A;&#x5B8C;&#x6210;&#x72B6;&#x6001;</span>
            <span class="hljs-keyword">this</span>.prolist.push({
                name:<span class="hljs-keyword">this</span>.addText,
                status:<span class="hljs-literal">false</span>
            });
            <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x540E;&#xFF0C;&#x6E05;&#x7A7A;addText</span>
            <span class="hljs-keyword">this</span>.addText=<span class="hljs-string">&quot;&quot;</span>;
        },
        chooseList(type){
            <span class="hljs-comment">//type=1&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x76EE;&#x6807;</span>
            <span class="hljs-comment">//type=2&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x5DF2;&#x5B8C;&#x6210;&#x76EE;&#x6807;</span>
            <span class="hljs-comment">//type=3&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;</span>
            switch(type){
                case <span class="hljs-number">1</span>:<span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist;<span class="hljs-keyword">break</span>;
                case <span class="hljs-number">2</span>:<span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist.filter(function(item){<span class="hljs-keyword">return</span> item.status});<span class="hljs-keyword">break</span>;
                case <span class="hljs-number">3</span>:<span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist.filter(function(item){<span class="hljs-keyword">return</span> !item.status});<span class="hljs-keyword">break</span>;
            }
        },
        delectList(index){
            <span class="hljs-comment">//&#x6839;&#x636E;&#x7D22;&#x5F15;&#xFF0C;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x67D0;&#x4E00;&#x9879;</span>
            <span class="hljs-keyword">this</span>.prolist.splice(index,<span class="hljs-number">1</span>);
            <span class="hljs-comment">//&#x66F4;&#x65B0;newList  newList&#x53EF;&#x80FD;&#x7ECF;&#x8FC7;this.prolist.filter()&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#xFF0C;&#x5220;&#x9664;&#x4E86;prolist&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230;newList  &#x90A3;&#x4E48;&#x5C31;&#x8981;&#x624B;&#x52A8;&#x66F4;&#x65B0;newList</span>
            <span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist;
        },
        <span class="hljs-comment">//&#x4FEE;&#x6539;&#x524D;</span>
        editBefore(name){
            <span class="hljs-comment">//&#x5148;&#x8BB0;&#x5F55;&#x5F53;&#x524D;&#x9879;&#xFF08;&#x6BD4;&#x5982;&#x8FD9;&#x4E00;&#x9879;&#xFF0C;{name:&quot;HTML5&quot;,status:false}&#xFF09;</span>
            <span class="hljs-comment">//beforeEditText=&quot;HTML5&quot;</span>
            <span class="hljs-keyword">this</span>.beforeEditText=name;
        },
        <span class="hljs-comment">//&#x4FEE;&#x6539;&#x5B8C;&#x6210;&#x540E;</span>
        edited(){
            <span class="hljs-comment">//&#x4FEE;&#x6539;&#x5B8C;&#x4E86;&#xFF0C;&#x8BBE;&#x7F6E;curIndex=&quot;&quot;&#xFF0C;&#x8FD9;&#x6837;&#x8F93;&#x5165;&#x6846;&#x5C31;&#x9690;&#x85CF;&#xFF0C;&#x5176;&#x5B83;&#x5143;&#x7D20;&#x5C31;&#x4F1A;&#x663E;&#x793A;&#x3002;&#x56E0;&#x4E3A;&#x5728;li&#x5143;&#x7D20; &#x5199;&#x4E86;&#xFF1A;:class=&quot;{&apos;eidting&apos;:curIndex===index}&quot;  &#x5F53;curIndex&#x4E0D;&#x7B49;&#x4E8E;index&#x65F6;&#xFF0C;eidting&#x7C7B;&#x540D;&#x5C31;&#x6E05;&#x9664;&#x4E86;&#xFF01;</span>
            <span class="hljs-comment">//&#x8F93;&#x5165;&#x6846;&#x5229;&#x7528;v-model&#x7ED1;&#x5B9A;&#x4E86;&#x5F53;&#x524D;&#x9879;&#xFF08;&#x6BD4;&#x5982;&#x8FD9;&#x4E00;&#x9879;&#xFF0C;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#x7684;name,&#x5F53;&#x5728;&#x8F93;&#x5165;&#x6846;&#x7F16;&#x8F91;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x6210;&#x2018;HTML&#x2019;,&#x5B9E;&#x9645;&#x4E0A;&#x5F53;&#x524D;&#x9879;&#x7684;name&#x5DF2;&#x7ECF;&#x53D8;&#x6210;&#x4E86;&#x2018;HTML&#x2019;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x4E00;&#x6B65;&#x53EA;&#x662F;&#x6E05;&#x9664;eidting&#x7C7B;&#x540D;&#xFF0C;&#x9690;&#x85CF;&#x8F93;&#x5165;&#x6846;&#x800C;&#x5DF2;</span>
            <span class="hljs-comment">//&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5C31;&#x662F;&#x867D;&#x7136;li&#x904D;&#x5386;&#x7684;&#x662F;newList&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x4E86;newList&#x7684;&#x8FD9;&#x4E00;&#x9879;&#xFF08;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x6210;&#x8FD9;&#x6837;&#xFF08;{name:&quot;HTML&quot;,status:true}&#xFF09;&#x3002;&#x5B9E;&#x9645;&#x4E0A;prolist&#x7684;&#x8FD9;&#x4E00;&#x9879;&#xFF08;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#xFF0C;&#x4E5F;&#x4F1A;&#x88AB;&#x6539;&#x6210;&#xFF08;{name:&quot;HTML&quot;,status:true}&#xFF09;&#x3002;&#x56E0;&#x4E3A;&#x8FD9;&#x91CC;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x4E14;&#x516C;&#x7528;&#x4E00;&#x4E2A;&#x5806;&#x6808;&#xFF01;&#x4FEE;&#x6539;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x4F1A;&#x88AB;&#x5F71;&#x54CD;&#x5230;</span>
            <span class="hljs-keyword">this</span>.curIndex=<span class="hljs-string">&quot;&quot;</span>;
        },
        <span class="hljs-comment">//&#x53D6;&#x6D88;&#x4FEE;&#x6539;</span>
        cancelEdit(<span class="hljs-keyword">val</span>){
            <span class="hljs-comment">//&#x4E0A;&#x9762;&#x8BF4;&#x4E86;&#x8F93;&#x5165;&#x6846;&#x5229;&#x7528;v-model&#x7ED1;&#x5B9A;&#x4E86;&#x5F53;&#x524D;&#x9879;&#xFF08;&#x6BD4;&#x5982;&#x8FD9;&#x4E00;&#x9879;&#xFF0C;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#x7684;name,&#x5F53;&#x5728;&#x8F93;&#x5165;&#x6846;&#x7F16;&#x8F91;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x6210;&#x2018;HTML&#x2019;,&#x5B9E;&#x9645;&#x4E0A;&#x5F53;&#x524D;&#x9879;&#x7684;name&#x5DF2;&#x7ECF;&#x53D8;&#x6210;&#x4E86;&#x2018;HTML&#x2019;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x4E00;&#x6B65;&#x5C31;&#x662F;&#x628A;&#x4E4B;&#x524D;&#x4FDD;&#x5B58;&#x7684;beforeEditText&#x8D4B;&#x503C;&#x7ED9;&#x5F53;&#x524D;&#x9879;&#x7684;name&#x5C5E;&#x6027;&#xFF0C;&#x8D77;&#x5230;&#x4E00;&#x4E2A;&#x6062;&#x590D;&#x539F;&#x6765;&#x503C;&#x5F97;&#x4F5C;&#x7528;&#xFF01;</span>
            <span class="hljs-keyword">val</span>.name=<span class="hljs-keyword">this</span>.beforeEditText;
            <span class="hljs-keyword">this</span>.curIndex=<span class="hljs-string">&quot;&quot;</span>;
        }
 },</code></pre>
<p>&#x8FD0;&#x884C;&#x7ED3;&#x679C;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVS9MX?w=939&amp;h=391" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x7EC6;&#x8282;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x80FD;&#x6CE8;&#x610F;&#x5230;&#x4E86;&#xFF0C;&#x5C31;&#x662F;&#x53CC;&#x51FB;&#x6587;&#x5B57;&#xFF0C;&#x51FA;&#x6765;&#x8F93;&#x5165;&#x6846;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD8;&#x8981;&#x81EA;&#x5DF1;&#x624B;&#x52A8;&#x70B9;&#x51FB;&#x4E00;&#x4E0B;&#xFF0C;&#x624D;&#x80FD;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#xFF0C;&#x6211;&#x4EEC;&#x60F3;&#x53CC;&#x51FB;&#x4E86;&#xFF0C;&#x8F93;&#x5165;&#x6846;&#x51FA;&#x6765;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x81EA;&#x52A8;&#x83B7;&#x53D6;&#x7126;&#x70B9;&#xFF0C;&#x600E;&#x4E48;&#x529E;&#xFF1F;&#x81EA;&#x5B9A;&#x4E49;&#x6307;&#x4EE4;&#x5C31;&#x884C;&#x4E86;&#xFF01;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed:{...},
methods:{...},
mounted(){...},
directives:{
    &quot;focus&quot;:{
        update(el){
            el.focus();
        }
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs nimrod"><code>computed:<span class="hljs-meta">{...}</span>,
methods:<span class="hljs-meta">{...}</span>,
mounted()<span class="hljs-meta">{...}</span>,
directives:{
    <span class="hljs-string">&quot;focus&quot;</span>:{
        update(el){
            el.focus();
        }
    }
}
</code></pre>
<p>&#x7136;&#x540E;html &#x8C03;&#x7528;&#x6307;&#x4EE4;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;input type=&quot;text&quot; class=&quot;text2&quot; v-model=&apos;list.name&apos; @keyup.esc=&apos;cancelEdit(list)&apos; @blur=&apos;edited&apos; @focus=&apos;editBefore(list.name)&apos; @keyup.enter=&apos;edited&apos; v-focus/&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs scala"><code style="word-break: break-word; white-space: initial;">&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;text2&quot;</span> v-model=<span class="hljs-symbol">&apos;list</span>.name&apos; <span class="hljs-meta">@keyup</span>.esc=<span class="hljs-symbol">&apos;cancelEdit</span>(list)&apos; <span class="hljs-meta">@blur</span>=<span class="hljs-symbol">&apos;edite</span>d&apos; <span class="hljs-meta">@focus</span>=<span class="hljs-symbol">&apos;editBefore</span>(list.name)&apos; <span class="hljs-meta">@keyup</span>.enter=<span class="hljs-symbol">&apos;edite</span>d&apos; v-focus/&gt;</code></pre>
<h3 id="articleHeader21">&#x5B8C;&#x6574;&#x4EE3;&#x7801;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;&lt;/title&gt;
    &lt;style&gt;
        body{font-family: &quot;&#x5FAE;&#x8F6F;&#x96C5;&#x9ED1;&quot;;font-size: 14px;}
        input{font-size: 14px;}
        body,ul,div,html{padding: 0;margin: 0;}
        .hidden{display: none;}
        .main{width: 800px;margin: 0 auto;}
        li{list-style-type: none;line-height: 40px;position: relative;border: 1px solid transparent;padding: 0 20px;}
        li .status-span{display: block;width: 10px;height: 10px;background: #ccc;margin: 14px 10px 0 0 ;float: left;}
        li .status-span.status-end{
            background: #09f;
        }
        li .close{position: absolute;color: #f00;font-size: 20px;line-height: 40px;height: 40px;right: 20px;cursor: pointer;display: none;top: 0;}
        li:hover{border: 1px solid #09f;}
        li:hover .close{display: block;}
        li div{display: block;}
        li.eidting div{display: none;}
        li .text2{height: 40px;padding-left: 10px;box-sizing: border-box;margin-left: 10px;width: 80%;display: none;}
        li.eidting .text2{display: block;}
        li .text-keyword{height: 40px;padding-left: 10px;box-sizing: border-box;margin-left: 10px;width: 80%;display: none;}
        .text-keyword{box-sizing: border-box;width: 100%;height: 40px;padding-left: 10px;outline: none;}
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;app&quot; class=&quot;main&quot;&gt;
    &lt;h2&gt;&#x5C0F;&#x76EE;&#x6807;&#x5217;&#x8868;&lt;/h2&gt;
    &lt;div class=&quot;list&quot;&gt;
        &lt;h3&gt;&#x6DFB;&#x52A0;&#x5C0F;&#x76EE;&#x6807;&lt;/h3&gt;
        &lt;input type=&quot;text&quot; class=&quot;text-keyword&quot; placeholder=&quot;&#x8F93;&#x5165;&#x5C0F;&#x76EE;&#x6807;&#x540E;&#xFF0C;&#x6309;&#x56DE;&#x8F66;&#x786E;&#x8BA4;&quot; @keyup.13=&apos;addList&apos; v-model=&quot;addText&quot;/&gt;
        &lt;!--&#x5982;&#x679C;noend&#x7B49;&#x4E8E;0&#xFF0C;&#x5C31;&#x662F;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#x4E86;&#x5C31;&#x663E;&#x793A;&#x2018;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#x4E86;&#x2019;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5C31;&#x662F;&#x663E;&#x793A;&#x5DF2;&#x5B8C;&#x6210;&#x591A;&#x5C11;&#x6761;&#xFF08;prolist.length-noend&#xFF09;&#x548C;&#x672A;&#x5B8C;&#x6210;&#x591A;&#x5C11;&#x6761;&#xFF08;noend&#xFF09;--&gt;
        &lt;p&gt;&#x5171;&#x6709;{{prolist.length}}&#x4E2A;&#x76EE;&#x6807;&#xFF0C;{{noend==0?&quot;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#x4E86;&quot;:&apos;&#x5DF2;&#x5B8C;&#x6210;&apos;+(prolist.length-noend)+&apos;&#xFF0C;&#x8FD8;&#x6709;&apos;+noend+&apos;&#x6761;&#x672A;&#x5B8C;&#x6210;&apos;}}&lt;/p&gt;
        &lt;p&gt;
            &lt;input type=&quot;radio&quot; name=&quot;chooseType&quot; checked=&quot;true&quot; @click=&apos;chooseList(1)&apos;/&gt;&lt;label&gt;&#x6240;&#x6709;&#x76EE;&#x6807;&lt;/label&gt;
            &lt;input type=&quot;radio&quot; name=&quot;chooseType&quot; @click=&apos;chooseList(2)&apos;/&gt;&lt;label&gt;&#x5DF2;&#x5B8C;&#x6210;&#x76EE;&#x6807;&lt;/label&gt;
            &lt;input type=&quot;radio&quot; name=&quot;chooseType&quot; @click=&apos;chooseList(3)&apos;/&gt;&lt;label&gt;&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;&lt;/label&gt;
        &lt;/p&gt;
    &lt;/div&gt;
    &lt;ul&gt;
        &lt;li class=&quot;li1&quot; v-for=&quot;(list,index) in newList&quot; :class=&quot;{&apos;eidting&apos;:curIndex===index}&quot;&gt;
            &lt;div&gt;
                &lt;span class=&quot;status-span&quot; @click=&quot;changeType(index)&quot; :class=&quot;{&apos;status-end&apos;:list.status}&quot;&gt;&lt;/span&gt;
                &lt;span @dblclick=&quot;curIndex=index&quot;&gt;{{list.name}}&lt;/span&gt;
                &lt;span class=&quot;close&quot; @click=&apos;delectList(list)&apos;&gt;X&lt;/span&gt;
            &lt;/div&gt;
            &lt;input type=&quot;text&quot; class=&quot;text2&quot; v-model=&apos;list.name&apos; @keyup.esc=&apos;cancelEdit(list)&apos; @blur=&apos;edited&apos; @focus=&apos;editBefore(list.name)&apos; @keyup.enter=&apos;edited&apos; v-focus/&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;script src=&quot;vue.min.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    new Vue({
        el: &quot;#app&quot;,
        data: {
            addText:&apos;&apos;,
            //name-&#x540D;&#x79F0;,status-&#x5B8C;&#x6210;&#x72B6;&#x6001;
            prolist:[
                {name:&quot;HTML5&quot;,status:false},
                {name:&quot;CSS3&quot;,status:false},
                {name:&quot;vue&quot;,status:false},
                {name:&quot;react&quot;,status:false}
            ],
            newList:[],
            curIndex:&apos;&apos;,
            beforeEditText:&quot;&quot;,
            curType:0
        },
        computed:{
            //&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF0C;&#x8FD4;&#x56DE;&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;&#x7684;&#x6761;&#x6570;&#xFF0C;&#x5C31;&#x662F;&#x6570;&#x7EC4;&#x91CC;&#x9762;status=false&#x7684;&#x6761;&#x6570;
            noend:function(){
                return this.prolist.filter(function(item){
                    return !item.status
                }).length;
            }
        },
        methods:{
            addList(){
                //&#x6DFB;&#x52A0;&#x8FDB;&#x6765;&#x9ED8;&#x8BA4;status=false,&#x5C31;&#x662F;&#x672A;&#x5B8C;&#x6210;&#x72B6;&#x6001;
                this.prolist.push({
                    name:this.addText,
                    status:false
                });
                //&#x6DFB;&#x52A0;&#x540E;&#xFF0C;&#x6E05;&#x7A7A;addText
                this.addText=&quot;&quot;;
            },
            chooseList(type){
                //type=1&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x76EE;&#x6807;
                //type=2&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x5DF2;&#x5B8C;&#x6210;&#x76EE;&#x6807;
                //type=3&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;
                this.curType=type;
                switch(type){
                    case 1:this.newList=this.prolist;break;
                    case 2:this.newList=this.prolist.filter(function(item){return item.status});break;
                    case 3:this.newList=this.prolist.filter(function(item){return !item.status});break;
                }
            },
            /*&#x6539;&#x53D8;&#x5355;&#x6761;&#x6570;&#x636E;&#x7684;&#x5B8C;&#x6210;&#x72B6;&#x6001;*/
            changeType(index){
                this.newList[index].status=!this.newList[index].status;
                //&#x66F4;&#x65B0;&#x6570;&#x636E;
                this.chooseList(this.curType);
            },
            delectList(list){
                var index=this.prolist.indexOf(list);
                //&#x6839;&#x636E;&#x7D22;&#x5F15;&#xFF0C;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x67D0;&#x4E00;&#x9879;
                this.prolist.splice(index,1);
                //&#x66F4;&#x65B0;newList  newList&#x53EF;&#x80FD;&#x7ECF;&#x8FC7;this.prolist.filter()&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#xFF0C;&#x5220;&#x9664;&#x4E86;prolist&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230;newList  &#x90A3;&#x4E48;&#x5C31;&#x8981;&#x624B;&#x52A8;&#x66F4;&#x65B0;newList
                //this.newList=this.prolist;
                this.chooseList(this.curType);
            },
            //&#x4FEE;&#x6539;&#x524D;
            editBefore(name){
                //&#x5148;&#x8BB0;&#x5F55;&#x5F53;&#x524D;&#x9879;&#xFF08;&#x6BD4;&#x5982;&#x8FD9;&#x4E00;&#x9879;&#xFF0C;{name:&quot;HTML5&quot;,status:false}&#xFF09;
                //beforeEditText=&quot;HTML5&quot;
                this.beforeEditText=name;
            },
            //&#x4FEE;&#x6539;&#x5B8C;&#x6210;&#x540E;
            edited(){
                //&#x4FEE;&#x6539;&#x5B8C;&#x4E86;&#xFF0C;&#x8BBE;&#x7F6E;curIndex=&quot;&quot;&#xFF0C;&#x8FD9;&#x6837;&#x8F93;&#x5165;&#x6846;&#x5C31;&#x9690;&#x85CF;&#xFF0C;&#x5176;&#x5B83;&#x5143;&#x7D20;&#x5C31;&#x4F1A;&#x663E;&#x793A;&#x3002;&#x56E0;&#x4E3A;&#x5728;li&#x5143;&#x7D20; &#x5199;&#x4E86;&#xFF1A;:class=&quot;{&apos;eidting&apos;:curIndex===index}&quot;  &#x5F53;curIndex&#x4E0D;&#x7B49;&#x4E8E;index&#x65F6;&#xFF0C;eidting&#x7C7B;&#x540D;&#x5C31;&#x6E05;&#x9664;&#x4E86;&#xFF01;
                //&#x8F93;&#x5165;&#x6846;&#x5229;&#x7528;v-model&#x7ED1;&#x5B9A;&#x4E86;&#x5F53;&#x524D;&#x9879;&#xFF08;&#x6BD4;&#x5982;&#x8FD9;&#x4E00;&#x9879;&#xFF0C;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#x7684;name,&#x5F53;&#x5728;&#x8F93;&#x5165;&#x6846;&#x7F16;&#x8F91;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x6210;&#x2018;HTML&#x2019;,&#x5B9E;&#x9645;&#x4E0A;&#x5F53;&#x524D;&#x9879;&#x7684;name&#x5DF2;&#x7ECF;&#x53D8;&#x6210;&#x4E86;&#x2018;HTML&#x2019;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x4E00;&#x6B65;&#x53EA;&#x662F;&#x6E05;&#x9664;eidting&#x7C7B;&#x540D;&#xFF0C;&#x9690;&#x85CF;&#x8F93;&#x5165;&#x6846;&#x800C;&#x5DF2;
                //&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5C31;&#x662F;&#x867D;&#x7136;li&#x904D;&#x5386;&#x7684;&#x662F;newList&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x4E86;newList&#x7684;&#x8FD9;&#x4E00;&#x9879;&#xFF08;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x6210;&#x8FD9;&#x6837;&#xFF08;{name:&quot;HTML&quot;,status:true}&#xFF09;&#x3002;&#x5B9E;&#x9645;&#x4E0A;prolist&#x7684;&#x8FD9;&#x4E00;&#x9879;&#xFF08;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#xFF0C;&#x4E5F;&#x4F1A;&#x88AB;&#x6539;&#x6210;&#xFF08;{name:&quot;HTML&quot;,status:true}&#xFF09;&#x3002;&#x56E0;&#x4E3A;&#x8FD9;&#x91CC;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x4E14;&#x516C;&#x7528;&#x4E00;&#x4E2A;&#x5806;&#x6808;&#xFF01;&#x4FEE;&#x6539;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x4F1A;&#x88AB;&#x5F71;&#x54CD;&#x5230;
                this.curIndex=&quot;&quot;;
            },
            //&#x53D6;&#x6D88;&#x4FEE;&#x6539;
            cancelEdit(val){
                //&#x4E0A;&#x9762;&#x8BF4;&#x4E86;&#x8F93;&#x5165;&#x6846;&#x5229;&#x7528;v-model&#x7ED1;&#x5B9A;&#x4E86;&#x5F53;&#x524D;&#x9879;&#xFF08;&#x6BD4;&#x5982;&#x8FD9;&#x4E00;&#x9879;&#xFF0C;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#x7684;name,&#x5F53;&#x5728;&#x8F93;&#x5165;&#x6846;&#x7F16;&#x8F91;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x6210;&#x2018;HTML&#x2019;,&#x5B9E;&#x9645;&#x4E0A;&#x5F53;&#x524D;&#x9879;&#x7684;name&#x5DF2;&#x7ECF;&#x53D8;&#x6210;&#x4E86;&#x2018;HTML&#x2019;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x4E00;&#x6B65;&#x5C31;&#x662F;&#x628A;&#x4E4B;&#x524D;&#x4FDD;&#x5B58;&#x7684;beforeEditText&#x8D4B;&#x503C;&#x7ED9;&#x5F53;&#x524D;&#x9879;&#x7684;name&#x5C5E;&#x6027;&#xFF0C;&#x8D77;&#x5230;&#x4E00;&#x4E2A;&#x6062;&#x590D;&#x539F;&#x6765;&#x503C;&#x5F97;&#x4F5C;&#x7528;&#xFF01;
                val.name=this.beforeEditText;
                this.curIndex=&quot;&quot;;
            }
        },
        mounted(){
            //&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x628A;prolist&#x8D4B;&#x503C;&#x7ED9;newList&#x3002;&#x9ED8;&#x8BA4;&#x663E;&#x793A;&#x6240;&#x6709;&#x76EE;&#x6807;
            this.newList=this.prolist;
        },
        directives:{
            &quot;focus&quot;:{
                update(el){
                    el.focus();
                }
            }
        }
    });
&lt;/script&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs htmlbars"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">font-family</span>: <span class="hljs-string">&quot;&#x5FAE;&#x8F6F;&#x96C5;&#x9ED1;&quot;</span>;<span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;}
        <span class="hljs-selector-tag">input</span>{<span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;}
        <span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">div</span>,<span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;}
        <span class="hljs-selector-class">.hidden</span>{<span class="hljs-attribute">display</span>: none;}
        <span class="hljs-selector-class">.main</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;}
        <span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">list-style-type</span>: none;<span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">position</span>: relative;<span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid transparent;<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;}
        <span class="hljs-selector-tag">li</span> <span class="hljs-selector-class">.status-span</span>{<span class="hljs-attribute">display</span>: block;<span class="hljs-attribute">width</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;<span class="hljs-attribute">margin</span>: <span class="hljs-number">14px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> ;<span class="hljs-attribute">float</span>: left;}
        <span class="hljs-selector-tag">li</span> <span class="hljs-selector-class">.status-span</span><span class="hljs-selector-class">.status-end</span>{
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
        }
        <span class="hljs-selector-tag">li</span> <span class="hljs-selector-class">.close</span>{<span class="hljs-attribute">position</span>: absolute;<span class="hljs-attribute">color</span>: <span class="hljs-number">#f00</span>;<span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;<span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">right</span>: <span class="hljs-number">20px</span>;<span class="hljs-attribute">cursor</span>: pointer;<span class="hljs-attribute">display</span>: none;<span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;}
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span>{<span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#09f</span>;}
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.close</span>{<span class="hljs-attribute">display</span>: block;}
        <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">div</span>{<span class="hljs-attribute">display</span>: block;}
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.eidting</span> <span class="hljs-selector-tag">div</span>{<span class="hljs-attribute">display</span>: none;}
        <span class="hljs-selector-tag">li</span> <span class="hljs-selector-class">.text2</span>{<span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">box-sizing</span>: border-box;<span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">width</span>: <span class="hljs-number">80%</span>;<span class="hljs-attribute">display</span>: none;}
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.eidting</span> <span class="hljs-selector-class">.text2</span>{<span class="hljs-attribute">display</span>: block;}
        <span class="hljs-selector-tag">li</span> <span class="hljs-selector-class">.text-keyword</span>{<span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">box-sizing</span>: border-box;<span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">width</span>: <span class="hljs-number">80%</span>;<span class="hljs-attribute">display</span>: none;}
        <span class="hljs-selector-class">.text-keyword</span>{<span class="hljs-attribute">box-sizing</span>: border-box;<span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;<span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;<span class="hljs-attribute">outline</span>: none;}
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;main&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>&#x5C0F;&#x76EE;&#x6807;&#x5217;&#x8868;<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>&#x6DFB;&#x52A0;&#x5C0F;&#x76EE;&#x6807;<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-keyword&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;&#x8F93;&#x5165;&#x5C0F;&#x76EE;&#x6807;&#x540E;&#xFF0C;&#x6309;&#x56DE;&#x8F66;&#x786E;&#x8BA4;&quot;</span> @<span class="hljs-attr">keyup.13</span>=<span class="hljs-string">&apos;addList&apos;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;addText&quot;</span>/&gt;</span>
        <span class="hljs-comment">&lt;!--&#x5982;&#x679C;noend&#x7B49;&#x4E8E;0&#xFF0C;&#x5C31;&#x662F;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#x4E86;&#x5C31;&#x663E;&#x793A;&#x2018;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#x4E86;&#x2019;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5C31;&#x662F;&#x663E;&#x793A;&#x5DF2;&#x5B8C;&#x6210;&#x591A;&#x5C11;&#x6761;&#xFF08;prolist.length-noend&#xFF09;&#x548C;&#x672A;&#x5B8C;&#x6210;&#x591A;&#x5C11;&#x6761;&#xFF08;noend&#xFF09;--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x5171;&#x6709;</span><span class="hljs-template-variable">"{{"prolist.length"}}"</span><span class="xml">&#x4E2A;&#x76EE;&#x6807;&#xFF0C;</span><span class="hljs-template-variable">"{{"noend==0?<span class="hljs-string">&quot;&#x5168;&#x90E8;&#x5B8C;&#x6210;&#x4E86;&quot;</span>:&apos;&#x5DF2;&#x5B8C;&#x6210;&apos;+(prolist.length-noend)+&apos;&#xFF0C;&#x8FD8;&#x6709;&apos;+noend+&apos;&#x6761;&#x672A;&#x5B8C;&#x6210;&apos;"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;chooseType&quot;</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">&quot;true&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&apos;chooseList(1)&apos;</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>&#x6240;&#x6709;&#x76EE;&#x6807;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;chooseType&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&apos;chooseList(2)&apos;</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>&#x5DF2;&#x5B8C;&#x6210;&#x76EE;&#x6807;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;chooseType&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&apos;chooseList(3)&apos;</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;li1&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(list,index) in newList&quot;</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;{&apos;eidting&apos;:curIndex===index}&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;status-span&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;changeType(index)&quot;</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;{&apos;status-end&apos;:list.status}&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">dblclick</span>=<span class="hljs-string">&quot;curIndex=index&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"list.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;close&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&apos;delectList(list)&apos;</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text2&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&apos;list.name&apos;</span> @<span class="hljs-attr">keyup.esc</span>=<span class="hljs-string">&apos;cancelEdit(list)&apos;</span> @<span class="hljs-attr">blur</span>=<span class="hljs-string">&apos;edited&apos;</span> @<span class="hljs-attr">focus</span>=<span class="hljs-string">&apos;editBefore(list.name)&apos;</span> @<span class="hljs-attr">keyup.enter</span>=<span class="hljs-string">&apos;edited&apos;</span> <span class="hljs-attr">v-focus</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;vue.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">&quot;#app&quot;</span>,
        data: {
            addText:<span class="hljs-string">&apos;&apos;</span>,
            <span class="hljs-comment">//name-&#x540D;&#x79F0;,status-&#x5B8C;&#x6210;&#x72B6;&#x6001;</span>
            prolist:[
                {name:<span class="hljs-string">&quot;HTML5&quot;</span>,status:<span class="hljs-literal">false</span>},
                {name:<span class="hljs-string">&quot;CSS3&quot;</span>,status:<span class="hljs-literal">false</span>},
                {name:<span class="hljs-string">&quot;vue&quot;</span>,status:<span class="hljs-literal">false</span>},
                {name:<span class="hljs-string">&quot;react&quot;</span>,status:<span class="hljs-literal">false</span>}
            ],
            newList:[],
            curIndex:<span class="hljs-string">&apos;&apos;</span>,
            beforeEditText:<span class="hljs-string">&quot;&quot;</span>,
            curType:<span class="hljs-number">0</span>
        },
        computed:{
            <span class="hljs-comment">//&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF0C;&#x8FD4;&#x56DE;&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;&#x7684;&#x6761;&#x6570;&#xFF0C;&#x5C31;&#x662F;&#x6570;&#x7EC4;&#x91CC;&#x9762;status=false&#x7684;&#x6761;&#x6570;</span>
            noend:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.prolist.filter(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span></span>{
                    <span class="hljs-keyword">return</span> !item.status
                }).length;
            }
        },
        methods:{
            addList(){
                <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x8FDB;&#x6765;&#x9ED8;&#x8BA4;status=false,&#x5C31;&#x662F;&#x672A;&#x5B8C;&#x6210;&#x72B6;&#x6001;</span>
                <span class="hljs-keyword">this</span>.prolist.push({
                    name:<span class="hljs-keyword">this</span>.addText,
                    status:<span class="hljs-literal">false</span>
                });
                <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x540E;&#xFF0C;&#x6E05;&#x7A7A;addText</span>
                <span class="hljs-keyword">this</span>.addText=<span class="hljs-string">&quot;&quot;</span>;
            },
            chooseList(type){
                <span class="hljs-comment">//type=1&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x76EE;&#x6807;</span>
                <span class="hljs-comment">//type=2&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x5DF2;&#x5B8C;&#x6210;&#x76EE;&#x6807;</span>
                <span class="hljs-comment">//type=3&#x65F6;&#xFF0C;&#x9009;&#x62E9;&#x6240;&#x6709;&#x672A;&#x5B8C;&#x6210;&#x76EE;&#x6807;</span>
                <span class="hljs-keyword">this</span>.curType=type;
                <span class="hljs-keyword">switch</span>(type){
                    <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:<span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist;<span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:<span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist.filter(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span></span>{<span class="hljs-keyword">return</span> item.status});<span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:<span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist.filter(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span></span>{<span class="hljs-keyword">return</span> !item.status});<span class="hljs-keyword">break</span>;
                }
            },
            <span class="hljs-comment">/*&#x6539;&#x53D8;&#x5355;&#x6761;&#x6570;&#x636E;&#x7684;&#x5B8C;&#x6210;&#x72B6;&#x6001;*/</span>
            changeType(index){
                <span class="hljs-keyword">this</span>.newList[index].status=!<span class="hljs-keyword">this</span>.newList[index].status;
                <span class="hljs-comment">//&#x66F4;&#x65B0;&#x6570;&#x636E;</span>
                <span class="hljs-keyword">this</span>.chooseList(<span class="hljs-keyword">this</span>.curType);
            },
            delectList(list){
                <span class="hljs-keyword">var</span> index=<span class="hljs-keyword">this</span>.prolist.indexOf(list);
                <span class="hljs-comment">//&#x6839;&#x636E;&#x7D22;&#x5F15;&#xFF0C;&#x5220;&#x9664;&#x6570;&#x7EC4;&#x67D0;&#x4E00;&#x9879;</span>
                <span class="hljs-keyword">this</span>.prolist.splice(index,<span class="hljs-number">1</span>);
                <span class="hljs-comment">//&#x66F4;&#x65B0;newList  newList&#x53EF;&#x80FD;&#x7ECF;&#x8FC7;this.prolist.filter()&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#xFF0C;&#x5220;&#x9664;&#x4E86;prolist&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230;newList  &#x90A3;&#x4E48;&#x5C31;&#x8981;&#x624B;&#x52A8;&#x66F4;&#x65B0;newList</span>
                <span class="hljs-comment">//this.newList=this.prolist;</span>
                <span class="hljs-keyword">this</span>.chooseList(<span class="hljs-keyword">this</span>.curType);
            },
            <span class="hljs-comment">//&#x4FEE;&#x6539;&#x524D;</span>
            editBefore(name){
                <span class="hljs-comment">//&#x5148;&#x8BB0;&#x5F55;&#x5F53;&#x524D;&#x9879;&#xFF08;&#x6BD4;&#x5982;&#x8FD9;&#x4E00;&#x9879;&#xFF0C;{name:&quot;HTML5&quot;,status:false}&#xFF09;</span>
                <span class="hljs-comment">//beforeEditText=&quot;HTML5&quot;</span>
                <span class="hljs-keyword">this</span>.beforeEditText=name;
            },
            <span class="hljs-comment">//&#x4FEE;&#x6539;&#x5B8C;&#x6210;&#x540E;</span>
            edited(){
                <span class="hljs-comment">//&#x4FEE;&#x6539;&#x5B8C;&#x4E86;&#xFF0C;&#x8BBE;&#x7F6E;curIndex=&quot;&quot;&#xFF0C;&#x8FD9;&#x6837;&#x8F93;&#x5165;&#x6846;&#x5C31;&#x9690;&#x85CF;&#xFF0C;&#x5176;&#x5B83;&#x5143;&#x7D20;&#x5C31;&#x4F1A;&#x663E;&#x793A;&#x3002;&#x56E0;&#x4E3A;&#x5728;li&#x5143;&#x7D20; &#x5199;&#x4E86;&#xFF1A;:class=&quot;{&apos;eidting&apos;:curIndex===index}&quot;  &#x5F53;curIndex&#x4E0D;&#x7B49;&#x4E8E;index&#x65F6;&#xFF0C;eidting&#x7C7B;&#x540D;&#x5C31;&#x6E05;&#x9664;&#x4E86;&#xFF01;</span>
                <span class="hljs-comment">//&#x8F93;&#x5165;&#x6846;&#x5229;&#x7528;v-model&#x7ED1;&#x5B9A;&#x4E86;&#x5F53;&#x524D;&#x9879;&#xFF08;&#x6BD4;&#x5982;&#x8FD9;&#x4E00;&#x9879;&#xFF0C;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#x7684;name,&#x5F53;&#x5728;&#x8F93;&#x5165;&#x6846;&#x7F16;&#x8F91;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x6210;&#x2018;HTML&#x2019;,&#x5B9E;&#x9645;&#x4E0A;&#x5F53;&#x524D;&#x9879;&#x7684;name&#x5DF2;&#x7ECF;&#x53D8;&#x6210;&#x4E86;&#x2018;HTML&#x2019;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x4E00;&#x6B65;&#x53EA;&#x662F;&#x6E05;&#x9664;eidting&#x7C7B;&#x540D;&#xFF0C;&#x9690;&#x85CF;&#x8F93;&#x5165;&#x6846;&#x800C;&#x5DF2;</span>
                <span class="hljs-comment">//&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5C31;&#x662F;&#x867D;&#x7136;li&#x904D;&#x5386;&#x7684;&#x662F;newList&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x4E86;newList&#x7684;&#x8FD9;&#x4E00;&#x9879;&#xFF08;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x6210;&#x8FD9;&#x6837;&#xFF08;{name:&quot;HTML&quot;,status:true}&#xFF09;&#x3002;&#x5B9E;&#x9645;&#x4E0A;prolist&#x7684;&#x8FD9;&#x4E00;&#x9879;&#xFF08;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#xFF0C;&#x4E5F;&#x4F1A;&#x88AB;&#x6539;&#x6210;&#xFF08;{name:&quot;HTML&quot;,status:true}&#xFF09;&#x3002;&#x56E0;&#x4E3A;&#x8FD9;&#x91CC;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x4E14;&#x516C;&#x7528;&#x4E00;&#x4E2A;&#x5806;&#x6808;&#xFF01;&#x4FEE;&#x6539;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x4F1A;&#x88AB;&#x5F71;&#x54CD;&#x5230;</span>
                <span class="hljs-keyword">this</span>.curIndex=<span class="hljs-string">&quot;&quot;</span>;
            },
            <span class="hljs-comment">//&#x53D6;&#x6D88;&#x4FEE;&#x6539;</span>
            cancelEdit(val){
                <span class="hljs-comment">//&#x4E0A;&#x9762;&#x8BF4;&#x4E86;&#x8F93;&#x5165;&#x6846;&#x5229;&#x7528;v-model&#x7ED1;&#x5B9A;&#x4E86;&#x5F53;&#x524D;&#x9879;&#xFF08;&#x6BD4;&#x5982;&#x8FD9;&#x4E00;&#x9879;&#xFF0C;{name:&quot;HTML5&quot;,status:false}&#xFF09;&#x7684;name,&#x5F53;&#x5728;&#x8F93;&#x5165;&#x6846;&#x7F16;&#x8F91;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6BD4;&#x5982;&#x6539;&#x6210;&#x2018;HTML&#x2019;,&#x5B9E;&#x9645;&#x4E0A;&#x5F53;&#x524D;&#x9879;&#x7684;name&#x5DF2;&#x7ECF;&#x53D8;&#x6210;&#x4E86;&#x2018;HTML&#x2019;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x4E00;&#x6B65;&#x5C31;&#x662F;&#x628A;&#x4E4B;&#x524D;&#x4FDD;&#x5B58;&#x7684;beforeEditText&#x8D4B;&#x503C;&#x7ED9;&#x5F53;&#x524D;&#x9879;&#x7684;name&#x5C5E;&#x6027;&#xFF0C;&#x8D77;&#x5230;&#x4E00;&#x4E2A;&#x6062;&#x590D;&#x539F;&#x6765;&#x503C;&#x5F97;&#x4F5C;&#x7528;&#xFF01;</span>
                val.name=<span class="hljs-keyword">this</span>.beforeEditText;
                <span class="hljs-keyword">this</span>.curIndex=<span class="hljs-string">&quot;&quot;</span>;
            }
        },
        mounted(){
            <span class="hljs-comment">//&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x628A;prolist&#x8D4B;&#x503C;&#x7ED9;newList&#x3002;&#x9ED8;&#x8BA4;&#x663E;&#x793A;&#x6240;&#x6709;&#x76EE;&#x6807;</span>
            <span class="hljs-keyword">this</span>.newList=<span class="hljs-keyword">this</span>.prolist;
        },
        directives:{
            <span class="hljs-string">&quot;focus&quot;</span>:{
                update(el){
                    el.focus();
                }
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</span></code></pre>
<h2 id="articleHeader22">6.&#x5C0F;&#x7ED3;</h2>
<p>&#x597D;&#x4E86;&#xFF0C;&#x4E09;&#x4E2A;&#x5C0F;&#x5B9E;&#x4F8B;&#x5728;&#x8FD9;&#x91CC;&#x5C31;&#x8BF4;&#x5B8C;&#x4E86;&#xFF01;&#x522B;&#x770B;&#x6587;&#x7AE0;&#x8FD9;&#x4E48;&#x957F;&#xFF0C;&#x5176;&#x5B9E;&#x90FD;&#x662F;&#x57FA;&#x7840;&#xFF0C;&#x53EF;&#x80FD;&#x662F;&#x6211;&#x6BD4;&#x8F83;&#x5570;&#x55E6;&#x800C;&#x5DF2;&#xFF01;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x80FD;&#x719F;&#x900F;&#x8FD9;&#x51E0;&#x4E2A;&#x5C0F;&#x5B9E;&#x4F8B;&#xFF0C;&#x76F8;&#x4FE1;&#x7528;vue&#x505A;&#x9879;&#x76EE;&#x4E5F;&#x662F;&#x4FE1;&#x624B;&#x62C8;&#x6765;&#x3002;&#x57FA;&#x7840;&#x7684;&#x8BED;&#x6CD5;&#x5728;&#x8FD9;&#x91CC;&#x4E86;&#xFF0C;&#x6709;&#x4E86;&#x57FA;&#x7840;&#xFF0C;&#x9AD8;&#x7EA7;&#x7684;&#x5199;&#x6CD5;&#x4E5F;&#x4E0D;&#x4F1A;&#x5F88;&#x96BE;&#x5B66;&#x4E60;&#xFF01;&#x5982;&#x679C;&#x4EE5;&#x540E;&#xFF0C;&#x6211;&#x6709;&#x4EC0;&#x4E48;&#x8981;&#x5206;&#x4EAB;&#x7684;&#xFF0C;&#x6211;&#x4F1A;&#x7EE7;&#x7EED;&#x5206;&#x4EAB;&#x3002;&#x6700;&#x540E;&#x4E00;&#x53E5;&#x8001;&#x8BDD;&#xFF0C;&#x5982;&#x679C;&#x89C9;&#x5F97;&#x6211;&#x54EA;&#x91CC;&#x5199;&#x9519;&#x4E86;&#xFF0C;&#x5199;&#x5F97;&#x4E0D;&#x597D;&#xFF0C;&#x6B22;&#x8FCE;&#x6307;&#x70B9;&#xFF01;</p>
<p>-------------------------&#x534E;&#x4E3D;&#x7684;&#x5206;&#x5272;&#x7EBF;--------------------<br>&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#xFF0C;&#x5173;&#x6CE8;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x5B88;&#x5019;&#x4E66;&#x9601;</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" del-src="https://static.alili.tech/img/bVZasA?w=264&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue快速入门的三个小实例

## 原文链接
[https://segmentfault.com/a/1190000010801357](https://segmentfault.com/a/1190000010801357)

