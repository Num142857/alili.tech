---
title: Vue.js 开发实践：实现精巧的无限加载与分页功能
hidden: true
categories: [reprint]
slug: 8fb3194
date: 2018-10-30 02:30:12
---

{{< raw >}}
<blockquote><p>&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#x662F;&#x4E00;&#x7BC7;Vue.js&#x7684;&#x6559;&#x7A0B;&#xFF0C;&#x76EE;&#x6807;&#x5728;&#x4E8E;&#x7528;&#x4E00;&#x79CD;&#x5E38;&#x89C1;&#x7684;&#x4E1A;&#x52A1;&#x573A;&#x666F;&#x2014;&#x2014;&#x5206;&#x9875;/&#x65E0;&#x9650;&#x52A0;&#x8F7D;&#xFF0C;&#x5E2E;&#x52A9;&#x8BFB;&#x8005;&#x66F4;&#x597D;&#x7684;&#x7406;&#x89E3;Vue.js&#x4E2D;&#x7684;&#x4E00;&#x4E9B;&#x8BBE;&#x8BA1;&#x601D;&#x60F3;&#x3002;&#x4E0E;&#x8BB8;&#x591A;Todo List&#x7C7B;&#x7684;&#x5165;&#x95E8;&#x6559;&#x7A0B;&#x76F8;&#x6BD4;&#xFF0C;&#x66F4;&#x5168;&#x9762;&#x7684;&#x5C55;&#x793A;&#x4F7F;&#x7528;Vue.js&#x5B8C;&#x6210;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#x7684;&#x601D;&#x8003;&#x8FC7;&#x7A0B;&#xFF1B;&#x4E0E;&#x4E00;&#x4E9B;&#x6784;&#x5EFA;&#x5927;&#x578B;&#x5E94;&#x7528;&#x7684;&#x9AD8;&#x9636;&#x6559;&#x7A0B;&#x76F8;&#x6BD4;&#xFF0C;&#x53C8;&#x66F4;&#x4E13;&#x6CE8;&#x4E8E;&#x4E00;&#x4E9B;&#x96F6;&#x788E;&#x7EC6;&#x8282;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x65B9;&#x4FBF;&#x8BFB;&#x8005;&#x5FEB;&#x901F;&#x638C;&#x63E1;&#x3001;&#x81F4;&#x7528;&#x3002;</p></blockquote><h2 id="articleHeader0">&#x9700;&#x6C42;&#x5206;&#x6790;</h2><p>&#x5F53;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x4E2D;&#x4FE1;&#x606F;&#x91CF;&#x8FC7;&#x5927;&#x65F6;&#xFF08;&#x4F8B;&#x5982;&#x4E00;&#x4E2A;&#x65B0;&#x95FB;&#x5217;&#x8868;&#x4E2D;&#x6709;200&#x6761;&#x65B0;&#x95FB;&#x9700;&#x8981;&#x5C55;&#x793A;&#xFF09;&#xFF0C;&#x5C31;&#x4F1A;&#x4EA7;&#x751F;&#x95EE;&#x9898;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><ul><li><p>&#x6570;&#x636E;&#x91CF;&#x8FC7;&#x5927;&#xFF0C;&#x5F71;&#x54CD;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;</p></li><li><p>&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x5DEE;&#xFF0C;&#x5F88;&#x96BE;&#x5B9A;&#x4F4D;&#x5230;&#x4E4B;&#x524D;&#x81EA;&#x5DF1;&#x770B;&#x8FC7;&#x7684;&#x67D0;&#x7BC7;&#x6587;&#x7AE0;</p></li><li><p>&#x6269;&#x5C55;&#x6027;&#x5DEE;&#xFF0C;&#x5982;&#x679C;200&#x6761;&#x53D8;&#x4E3A;2000&#x6761;&#x6216;&#x8005;&#x66F4;&#x591A;</p></li></ul><p>&#x6240;&#x4EE5;&#x5E38;&#x89C1;&#x7684;&#x89E3;&#x51B3;&#x601D;&#x8DEF;&#x5C31;&#x662F;&#x81F3;&#x5E95;&#x65F6;&#x52A0;&#x8F7D;&#x6570;&#x636E;&#x6216;&#x8005;&#x5206;&#x9875;&#x5C55;&#x793A;&#x3002;&#x65E0;&#x9650;&#x52A0;&#x8F7D;&#x7684;&#x5B9E;&#x73B0;&#x8FC7;&#x7A0B;&#x7C7B;&#x4F3C;&#x4E8E;&#xFF1A;</p><ol><li><p>ajax&#x7C7B;&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x6570;&#x636E;</p></li><li><p>&#x6570;&#x636E;&#x5B58;&#x5165;&#x672C;&#x5730;&#x6570;&#x7EC4;</p></li><li><p>&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x6761;&#x6570;&#x636E;&#x5BF9;&#x5E94;&#x63D2;&#x5165;&#x4E00;&#x4E2A;HTML&#x6A21;&#x677F;&#x7247;&#x6BB5;&#x4E2D;</p></li><li><p>&#x5C06;HTML&#x7247;&#x6BB5;append&#x5230;&#x8282;&#x70B9;&#x4E2D;</p></li></ol><p>&#x524D;&#x7AEF;&#x5206;&#x9875;&#x7684;&#x5B9E;&#x73B0;&#x8FC7;&#x7A0B;&#x7C7B;&#x4F3C;&#x4E8E;&#xFF1A;</p><ol><li><p>ajax&#x7C7B;&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x6570;&#x636E;</p></li><li><p>&#x6570;&#x636E;&#x66FF;&#x6362;&#x672C;&#x5730;&#x6570;&#x7EC4;</p></li><li><p>&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x6761;&#x6570;&#x636E;&#x5BF9;&#x5E94;&#x63D2;&#x5165;&#x4E00;&#x4E2A;HTML&#x6A21;&#x677F;&#x7247;&#x6BB5;&#x4E2D;</p></li><li><p>&#x6E05;&#x7A7A;&#x8282;&#x70B9;&#x540E;&#x5C06;HTML&#x7247;&#x6BB5;append&#x5230;&#x8282;&#x70B9;&#x4E2D;</p></li></ol><p>&#x5F80;&#x5F80;&#x4FEE;&#x6539;&#x6216;&#x8005;&#x7EF4;&#x62A4;&#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x53D1;&#x73B0;&#x6E32;&#x67D3;HTML&#x548C;&#x63D2;&#x5165;&#x90E8;&#x5206;&#x662F;&#x6BD4;&#x8F83;&#x70E6;&#x4EBA;&#x7684;&#x3002;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5C06;HTML&#x62FC;&#x63A5;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5728;&#x5BF9;&#x5E94;&#x7684;&#x4F4D;&#x7F6E;&#x63D2;&#x5165;&#x6570;&#x636E;&#xFF0C;&#x5F80;&#x5F80;&#x5C31;&#x662F;&#x4E00;&#x6BB5;&#x975E;&#x5E38;&#x957F;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x4E4B;&#x540E;&#x60F3;&#x8981;&#x52A0;&#x4E2A;class&#x90FD;&#x8D39;&#x52B2;&#x3002;es6&#x7684;&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x8BA9;&#x8FD9;&#x4E2A;&#x60C5;&#x51B5;&#x6709;&#x6240;&#x597D;&#x8F6C;&#xFF0C;&#x4F46;&#x662F;&#x4F9D;&#x7136;&#x6709;&#x7455;&#x75B5;&#xFF08;&#x4F8B;&#x5982;&#x5B9E;&#x9645;&#x7F16;&#x5199;&#x65F6;&#x65E0;&#x6CD5;HTML&#x4EE3;&#x7801;&#x9AD8;&#x4EAE;&#xFF09;&#x3002;</p><p>&#x540C;&#x65F6;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x5199;&#x4E0D;&#x5C11;for&#x6216;&#x8005;forEach&#x53BB;&#x5FAA;&#x73AF;&#x6570;&#x7EC4;&#xFF0C;&#x518D;&#x547D;&#x4EE4;&#x5F0F;&#x7684;append&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x6709;&#x4E00;&#x4E9B;&#x590D;&#x6742;&#x7684;&#x4EA4;&#x4E92;&#xFF0C;&#x53EF;&#x80FD;&#x8FD8;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x4E8B;&#x4EF6;&#x4EE3;&#x7406;&#x7ED1;&#x5B9A;&#x4E00;&#x5806;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x5982;&#x679C;&#x5728;&#x5B8C;&#x6210;&#x8FD9;&#x7C7B;&#x4E1A;&#x52A1;&#x65F6;&#xFF0C;&#x4F60;&#x4E5F;&#x9047;&#x5230;&#x8FC7;&#x4E0A;&#x8FF0;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x90A3;&#x4E48;&#x4F60;&#x5C31;&#x4F1A;&#x53D1;&#x73B0;Vue&#x771F;&#x662F;&#x592A;coooooool&#x4E86;&#xFF0C;let&apos;s vue!</p><h2 id="articleHeader1">&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;Vue.js&#x9879;&#x76EE;</h2><p><strong>&#x5F3A;&#x70C8;&#x63A8;&#x8350;&#x4F7F;&#x7528;vue-cli&#x6765;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x3002;</strong></p><p>&#x4E00;&#x5F00;&#x59CB;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x8BA4;&#x4E3A;&#x7528;node.js&#x548C;npm&#x5B89;&#x88C5;&#x4E00;&#x5927;&#x5806;&#x5E93;&#xFF0C;&#x751F;&#x6210;&#x4E86;&#x4E00;&#x4E9B;&#x4F60;&#x4E0D;&#x592A;&#x4E86;&#x89E3;&#x7684;&#x76EE;&#x5F55;&#x548C;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x4E00;&#x5199;&#x4EE3;&#x7801;&#x8FD8;&#x4F1A;&#x8DF3;&#x51FA;&#x4E00;&#x5806;eslint&#x7684;&#x63D0;&#x793A;&#x3002;&#x4F46;&#x662F;&#x8FD9;&#x7EDD;&#x5BF9;&#x7269;&#x6709;&#x6240;&#x503C;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x6A21;&#x677F;&#x53EF;&#x4EE5;&#x5E2E;&#x4F60;&#x66F4;&#x597D;&#x7684;&#x7406;&#x89E3;Vue.js&#x7EC4;&#x7EC7;&#x6587;&#x4EF6;&#x7684;&#x601D;&#x8DEF;&#xFF0C;&#x5E76;&#x4E14;&#x5F53;&#x4F60;&#x9002;&#x5E94;&#x4E4B;&#x540E;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x8FD9;&#x4E9B;&#x6761;&#x6761;&#x6846;&#x6846;&#x6781;&#x5927;&#x5730;&#x52A0;&#x5FEB;&#x4E86;&#x4F60;&#x7684;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;</p><p>&#x5728;&#x8FD9;&#x6B21;&#x7684;&#x6559;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x65B0;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x540D;&#x53EB;loadmore&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x5177;&#x4F53;&#x7684;&#x65B0;&#x5EFA;&#x9879;&#x76EE;&#x6D41;&#x7A0B;&#x53EF;&#x4EE5;&#x53C2;&#x7167;&#x5B98;&#x7F51;&#x6559;&#x7A0B;&#x7684;&#x5B89;&#x88C5;&#x4E00;&#x8282;&#x3002;</p><h2 id="articleHeader2">&#x5E03;&#x5C40;&#x9875;&#x9762;&#x7ED3;&#x6784;</h2><p>&#x4E3A;&#x4E86;&#x914D;&#x5408;&#x6559;&#x7A0B;&#x7684;&#x9010;&#x6B65;&#x6DF1;&#x5165;&#xFF0C;&#x6211;&#x5148;&#x4ECE;&#x5B8C;&#x6210;<strong>&#x52A0;&#x8F7D;&#x66F4;&#x591A;</strong>&#x529F;&#x80FD;&#x5165;&#x624B;&#x3002;&#x4E3A;&#x4E86;&#x548C;&#x4E4B;&#x540E;&#x7684;&#x5206;&#x9875;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#xFF0C;&#x6211;&#x7684;&#x9875;&#x9762;&#x51C6;&#x5907;&#x7531;&#x4E24;&#x90E8;&#x5206;&#x7EC4;&#x6210;&#xFF0C;&#x4E00;&#x662F;&#x4FE1;&#x606F;&#x5217;&#x8868;&#xFF0C;&#x4E8C;&#x662F;&#x5E95;&#x90E8;&#x7684;&#x4E00;&#x4E2A;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#x7684;&#x6309;&#x94AE;&#xFF0C;&#x6211;&#x5C06;&#x4ED6;&#x4EEC;&#x90FD;&#x653E;&#x5728;App.vue&#x8FD9;&#x4E2A;&#x6839;&#x7EC4;&#x4EF6;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div id=&quot;app&quot;&gt;
    &lt;list&gt;&lt;/list&gt;
    &lt;a class=&quot;button&quot; @click=&quot;next&quot; &gt;GO NEXT&lt;/a&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import List from &apos;./components/List&apos;

export default {
  components: {
    List
  },
  data () {
    return {
      ...
    }
  },
  methods: {
    next () {
      ...
    }
  }
}
&lt;/script&gt;

&lt;style scoped&gt;
  .button {
    display: block;
    width: 100%;
    background: #212121;
    color: #fff;
    font-weight: bold;
    text-align: center;
    padding: 1em;
    cursor: pointer;
    text-decoration: none;
  }
  .button span {
    margin-left: 2em;
    font-size: .5rem;
    color: #d6d6d6;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">list</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">list</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;button&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;next&quot;</span> &gt;</span>GO NEXT<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> List <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/List&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    List
  },
  data () {
    <span class="hljs-keyword">return</span> {
      ...
    }
  },
  <span class="hljs-attr">methods</span>: {
    next () {
      ...
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.button</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#212121</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">text-decoration</span>: none;
  }
  <span class="hljs-selector-class">.button</span> <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">2em</span>;
    <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">5rem</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#d6d6d6</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><p>&#x5728;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x6839;&#x636E;Vue&#x7684;&#x8BBE;&#x8BA1;&#x601D;&#x60F3;&#x6709;&#x4E86;&#x5982;&#x4E0B;&#x601D;&#x8DEF;&#xFF1A;</p><ol><li><p>&#x5728;&#x4FE1;&#x606F;&#x5217;&#x8868;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x5B8C;&#x6210;&#x6211;&#x4EEC;&#x4E0A;&#x6587;&#x4E2D;&#x63D0;&#x5230;&#x7684;&#x51E0;&#x4E2A;&#x6B65;&#x9AA4;&#xFF0C;&#x800C;&#x8FD9;&#x4E9B;&#x6B65;&#x9AA4;&#x90FD;&#x53EA;&#x548C;&#x4FE1;&#x606F;&#x5217;&#x8868;&#x672C;&#x8EAB;&#x6709;&#x5173;&#xFF0C;&#x4E0E;Next&#x6309;&#x94AE;&#x95F4;&#x552F;&#x4E00;&#x7684;&#x8054;&#x7CFB;&#x5C31;&#x662F;Next&#x70B9;&#x51FB;&#x540E;&#x9700;&#x8981;&#x89E6;&#x53D1;&#x4FE1;&#x606F;&#x5217;&#x8868;&#x53BB;&#x83B7;&#x53D6;&#xFF0C;&#x800C;&#x8FD9;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;props&#x4F20;&#x9012;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x628A;&#x5217;&#x8868;&#x53CA;&#x5176;&#x81EA;&#x8EAB;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x3001;&#x6837;&#x5F0F;&#x90FD;&#x653E;&#x5728;List.vue&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E2D;&#x3002;</p></li><li><p>&#x6211;&#x4EEC;&#x4E3A;&#x6309;&#x94AE;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E9B;&#x57FA;&#x672C;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x7528;&#x7684;css&#x9009;&#x62E9;&#x5668;&#x5C31;&#x662F;&#x4E00;&#x4E2A;.button&#x7C7B;&#x540D;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x548C;&#x522B;&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;.button&#x6837;&#x5F0F;&#x51B2;&#x7A81;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x52A0;&#x5165;&#x4E86;&#x4E00;&#x4E2A;scoped&#x5C5E;&#x6027;&#xFF0C;&#x8BA9;App.vue&#x4E2D;&#x7684;style&#x6837;&#x5F0F;&#x53EA;&#x4F5C;&#x7528;&#x4E8E;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x3002;<br><strong>&#x6CE8;&#x610F;&#xFF1A;</strong>scoped&#x5E76;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;css&#x7684;&#x4F5C;&#x7528;&#x4F18;&#x5148;&#x7EA7;&#xFF0C;&#x4F7F;&#x7528;scoped&#x4E0D;&#x4EE3;&#x8868;&#x4E0D;&#x4F1A;&#x88AB;&#x5916;&#x90E8;&#x6837;&#x5F0F;&#x8868;&#x8986;&#x76D6;&#x3002;</p></li><li><p>&#x6211;&#x4EEC;&#x60F3;&#x5F15;&#x5165;&#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x6837;&#x5F0F;&#xFF0C;&#x6BD4;&#x5982;reset.css&#x3002;&#x5982;&#x679C;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x4E86;sass&#x4E4B;&#x7C7B;&#x7684;&#x8BED;&#x8A00;&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x5C06;&#x5BF9;&#x5E94;&#x7684;&#x5916;&#x90E8;sass&#x6587;&#x4EF6;&#x653E;&#x5728;assets&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;import&#x5F15;&#x5165;&#x3002;&#x666E;&#x901A;&#x7684;css&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5199;&#x5728;&#x4E00;&#x4E2A;&#x4E0D;&#x52A0;scoped&#x5C5E;&#x6027;&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x4F60;&#x786E;&#x5B9A;&#x8FD9;&#x4E2A;&#x6837;&#x5F0F;&#x8868;&#x4E0D;&#x4F1A;&#x88AB;&#x9891;&#x7E41;&#x6539;&#x52A8;&#xFF0C;&#x90A3;&#x4E48;&#x4E5F;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x7B2C;&#x4E09;&#x65B9;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x5F15;&#x5165;index.html&#x4E2D;&#x3002;&#x4F8B;&#x5982;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x6211;&#x5728;index.html&#x4E2D;&#x52A0;&#x5165;&#x4E86;&#xFF1A;</p></li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;link rel=&quot;stylesheet&quot; href=&quot;./static/reset.css&quot;&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;./static/reset.css&quot;</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVwCfq" src="https://static.alili.tech/img/bVwCfq" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader3">&#x5B8C;&#x6210;List.vue</h2><p>&#x76EE;&#x524D;&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x7684;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x90FD;&#x662F;&#x56F4;&#x7ED5;&#x4FE1;&#x606F;&#x5217;&#x8868;&#x5C55;&#x5F00;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x7684;List.vue&#x3002;</p><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x83B7;&#x53D6;&#x76EE;&#x6807;&#x6570;&#x636E;&#xFF0C;&#x6211;&#x9009;&#x7528;&#x4E86;cnodejs.org&#x793E;&#x533A;&#x7684;API&#x4F5C;&#x4E3A;&#x4F8B;&#x5B50;&#x8FDB;&#x884C;&#x7F16;&#x5199;&#x3002;&#x5982;&#x679C;&#x4F60;&#x4E5F;&#x60F3;&#x7528;&#x4E00;&#x4E2A;&#x5C01;&#x88C5;&#x597D;&#x7684;ajax&#x5E93;&#x7684;&#x8BDD;&#xFF0C;&#x5E94;&#x8BE5;&#x8FD9;&#x4E48;&#x505A;&#xFF1A;</p><h3 id="articleHeader4">&#x5F15;&#x5165;&#x7B2C;&#x4E09;&#x65B9;JS&#x5E93;</h3><p>&#x5C06;&#x76EE;&#x6807;JS&#x5E93;&#x6587;&#x4EF6;&#x653E;&#x5728;static&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#xFF0C;&#x4F8B;&#x5982;&#x6211;&#x9009;&#x62E9;&#x7684;&#x662F;reqwest.js&#xFF0C;&#x7136;&#x540E;&#x5728;index.html&#x5148;&#x5F15;&#x5165;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;./static/reqwest.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./static/reqwest.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x7136;&#x540E;&#x5728;build&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#xFF0C;&#x4FEE;&#x6539;webpack.base.conf.js&#xFF0C;export externals&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals: {
  &apos;reqwest&apos;: &apos;reqwest&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-string">externals:</span> {
  <span class="hljs-string">&apos;reqwest&apos;</span>: <span class="hljs-string">&apos;reqwest&apos;</span>
}</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5728;&#x6211;&#x4EEC;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x52A0;&#x8F7D;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import reqwest from &apos;reqwest&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> reqwest <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;reqwest&apos;</span></code></pre><h3 id="articleHeader5">&#x5199;&#x4E2A;API&#x63A5;&#x53E3;</h3><p>&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x8C03;&#x7528;&#x6587;&#x7AE0;&#x5217;&#x8868;&#x8FD9;&#x4E00;&#x4E2A;&#x63A5;&#x53E3;&#xFF0C;&#x4F46;&#x662F;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x53EF;&#x80FD;&#x4F60;&#x9700;&#x8981;&#x8C03;&#x7528;&#x5F88;&#x591A;&#x63A5;&#x53E3;&#xFF0C;&#x800C;&#x8FD9;&#x4E9B;&#x63A5;&#x53E3;&#x53C8;&#x4F1A;&#x5728;&#x591A;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E2D;&#x88AB;&#x7528;&#x5230;&#x3002;&#x90A3;&#x4E48;&#x8C03;&#x7528;&#x63A5;&#x53E3;&#x7684;&#x903B;&#x8F91;&#x56DB;&#x6563;&#x5728;&#x5404;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E2D;&#x80AF;&#x5B9A;&#x662F;&#x4E0D;&#x597D;&#x7684;&#xFF0C;&#x60F3;&#x8C61;&#x4E00;&#x4E0B;&#x5BF9;&#x65B9;&#x7684;url&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#xFF0C;&#x4F60;&#x5C31;&#x5F97;&#x5728;&#x65E0;&#x6570;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E2D;&#x4E00;&#x4E2A;&#x4E2A;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x8981;&#x4FEE;&#x6539;&#x3002;</p><p>&#x6240;&#x4EE5;&#x6211;&#x5728;src&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x65B0;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;api&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x7528;&#x4E8E;&#x5B58;&#x653E;&#x5404;&#x7C7B;API&#x63A5;&#x53E3;&#x3002;&#x5F53;&#x524D;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x8981;&#x83B7;&#x53D6;&#x7684;&#x662F;&#x65B0;&#x95FB;&#x5217;&#x8868;&#xFF0C;&#x6240;&#x4EE5;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;news.js&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import reqwest from &apos;reqwest&apos;

const domain = &apos;https://cnodejs.org/api/v1/topics&apos;

export default {
  getList (data, callback) {
    reqwest({
      url: domain,
      data: data
    })
    .then(val =&gt; callback(null, val))
    .catch(e =&gt; callback(e))
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> reqwest <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;reqwest&apos;</span>

<span class="hljs-keyword">const</span> domain = <span class="hljs-string">&apos;https://cnodejs.org/api/v1/topics&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  getList (data, callback) {
    reqwest({
      <span class="hljs-attr">url</span>: domain,
      <span class="hljs-attr">data</span>: data
    })
    .then(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> callback(<span class="hljs-literal">null</span>, val))
    .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> callback(e))
  }
}</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x62E5;&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x83B7;&#x53D6;&#x65B0;&#x95FB;&#x5217;&#x8868;&#x7684;API&#xFF1A;getList&#x3002;</p><h3 id="articleHeader6">&#x7F16;&#x5199;&#x7EC4;&#x4EF6;</h3><p>&#x6211;&#x4EEC;&#x7528;&#x4E00;&#x4E2A;&lt;ol&gt;&#x4F5C;&#x4E3A;&#x65B0;&#x95FB;&#x5217;&#x8868;&#xFF0C;&#x5185;&#x90E8;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&lt;li&gt;&#x5C31;&#x662F;&#x4E00;&#x6761;&#x65B0;&#x95FB;&#xFF0C;&#x5176;&#x4E2D;&#x5305;&#x62EC;&#x6807;&#x9898;&#x3001;&#x65F6;&#x95F4;&#x548C;&#x4F5C;&#x8005;3&#x4E2A;&#x4FE1;&#x606F;&#x3002;</p><p>&#x5728;data&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x7528;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;list&#x7684;&#x6570;&#x7EC4;&#x6765;&#x50A8;&#x5B58;&#x65B0;&#x95FB;&#x5217;&#x8868;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x4E00;&#x5F00;&#x59CB;&#x5F53;&#x7136;&#x662F;&#x7A7A;&#x7684;&#x3002;&#x6211;&#x4EEC;&#x518D;&#x5728;data&#x4E2D;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;limit&#x7684;&#x503C;&#xFF0C;&#x7528;&#x6765;&#x63A7;&#x5236;&#x6BCF;&#x9875;&#x52A0;&#x8F7D;&#x591A;&#x5C11;&#x6761;&#x6570;&#x636E;&#xFF0C;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x7ED9;getList&#x8FD9;&#x4E2A;API&#x3002;</p><p>&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x7684;template&#x90E8;&#x5206;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF08;&#x52A0;&#x5165;&#x4E86;&#x4E00;&#x4E9B;style&#x7F8E;&#x5316;&#x6837;&#x5F0F;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;ol&gt;
    &lt;li v-for=&quot;news of list&quot;&gt;
      &lt;p class=&quot;title&quot;&gt;{{ news.title }}&lt;/p&gt;
      &lt;p class=&quot;date&quot;&gt;{{ news.create_at }}&lt;/p&gt;
      &lt;p class=&quot;author&quot;&gt;By: {{ news.author.loginname }}&lt;/p&gt;
    &lt;/li&gt;
  &lt;/ol&gt;
&lt;/template&gt;

&lt;style scoped&gt;
  ol {
    margin-left: 2rem;
    list-style: outside decimal;
  }
  li {
    line-height: 1.5;
    padding: 1rem;
    border-bottom: 1px solid #b6b6b6;
  }
  .title {
    font-weight: bold;
    font-size: 1.3rem;
  }
  .date {
    font-size: .8rem;
    color: #d6d6d6;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;news of list&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{" news.title "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;date&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{" news.create_at "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;author&quot;</span>&gt;</span>By: </span><span class="hljs-template-variable">"{{" news.author.loginname "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">ol</span> {
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">2rem</span>;
    <span class="hljs-attribute">list-style</span>: outside decimal;
  }
  <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.5</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">1rem</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#b6b6b6</span>;
  }
  <span class="hljs-selector-class">.title</span> {
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.3rem</span>;
  }
  <span class="hljs-selector-class">.date</span> {
    <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">8rem</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#d6d6d6</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre><p>&#x4E4B;&#x540E;&#x6211;&#x4EEC;&#x663E;&#x7136;&#x9700;&#x8981;&#x4F7F;&#x7528;getList&#x6765;&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x4E0D;&#x8FC7;&#x5148;&#x60F3;&#x60F3;&#x6211;&#x4EEC;&#x4F1A;&#x5728;&#x54EA;&#x51E0;&#x4E2A;&#x5730;&#x65B9;&#x4F7F;&#x7528;&#x5462;&#xFF1F;&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x7EC4;&#x4EF6;&#x5F00;&#x59CB;&#x6E32;&#x67D3;&#x65F6;&#x81EA;&#x52A8;&#x83B7;&#x53D6;&#x4E00;&#x6B21;&#x5217;&#x8868;&#xFF0C;&#x586B;&#x5145;&#x57FA;&#x7840;&#x5185;&#x5BB9;&#x3002;&#x5176;&#x6B21;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x6BCF;&#x6B21;&#x70B9;&#x51FB;APP.vue&#x4E2D;&#x7684;Next&#x6309;&#x94AE;&#x65F6;&#x4E5F;&#x9700;&#x8981;&#x83B7;&#x53D6;&#x65B0;&#x7684;&#x5217;&#x8868;&#x3002;</p><p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5728;methods&#x4E2D;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;get&#x65B9;&#x6CD5;&#xFF0C;&#x6210;&#x529F;&#x83B7;&#x53D6;&#x5230;&#x6570;&#x636E;&#x540E;&#xFF0C;&#x5C31;&#x628A;&#x83B7;&#x53D6;&#x7684;&#x6570;&#x7EC4;&#x62FC;&#x63A5;&#x5230;&#x5F53;&#x524D;list&#x6570;&#x7EC4;&#x540E;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x4E86;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#x3002;</p><p>&#x6CBF;&#x7740;&#x8FD9;&#x4E2A;&#x601D;&#x8DEF;&#xFF0C;&#x518D;&#x60F3;&#x60F3;get&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x5305;&#x542B;&#x4E86;page&#x548C;limit&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x662F;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x8BF4;&#x8FC7;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x62FC;&#x63A5;&#x6570;&#x7EC4;&#x5373;&#x53EF;&#xFF0C;&#x56E0;&#x6B64;&#x53EA;&#x5269;&#x4E0B;&#x6700;&#x540E;&#x4E00;&#x4E2A;page&#x53C2;&#x6570;&#x8FD8;&#x6CA1;&#x8BBE;&#x7F6E;&#x3002;</p><p>&#x5728;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;page&#x7684;&#x503C;&#x5E94;&#x8BE5;&#x4E3A;1&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x7B2C;&#x4E00;&#x9875;&#x5185;&#x5BB9;&#x3002;&#x4E4B;&#x540E;page&#x7684;&#x503C;&#x53EA;&#x7531;Next&#x6309;&#x94AE;&#x6539;&#x53D8;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8BA9;page&#x901A;&#x8FC7;props&#x83B7;&#x53D6;App.vue&#x4E2D;&#x4F20;&#x6765;&#x7684;page&#x503C;&#x3002;</p><p>&#x6700;&#x540E;&#x5219;&#x662F;&#x8865;&#x5145;get&#x65B9;&#x6CD5;&#x89E6;&#x53D1;&#x7684;&#x6761;&#x4EF6;&#x3002;&#x4E00;&#x662F;&#x5728;&#x7EC4;&#x4EF6;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;created&#x4E2D;&#x8C03;&#x7528;this.get()&#x83B7;&#x53D6;&#x521D;&#x59CB;&#x5185;&#x5BB9;&#xFF0C;&#x53E6;&#x4E00;&#x662F;&#x5728;page&#x503C;&#x53D8;&#x5316;&#x65F6;&#x5BF9;&#x5E94;&#x83B7;&#x53D6;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;watch&#x4E86;page&#x5C5E;&#x6027;&#xFF0C;&#x5F53;&#x5176;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x8C03;&#x7528;this.get()&#x3002;</p><p>&#x6700;&#x540E;List.vue&#x7684;script&#x957F;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
import news from &apos;../api/news&apos;

export default {
  data () {
    return {
      list: [],
      limit: 10
    }
  },
  props: {
    page: {
      type: Number,
      default: 1
    }
  },
  created () {
    this.get()
  },
  watch: {
    page (val) {
      this.get()
    }
  },
  methods: {
    get () {
      news.getList({
        page: this.page,
        limit: this.limit
      }, (err, list) =&gt; {
        if (err) {
          console.log(err)
        } else {
          list.data.forEach((data) =&gt; {
            const d = new Date(data.create_at)
            data.create_at = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
          })
          this.list = this.list.concat(list.data)
        }
      })
    }
  }
}
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>&lt;script&gt;
<span class="hljs-keyword">import</span> news from <span class="hljs-string">&apos;../api/news&apos;</span>

export <span class="hljs-keyword">default</span> {
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      list: [],
      limit: <span class="hljs-number">10</span>
    }
  },
  props: {
    page: {
      type: Number,
      <span class="hljs-keyword">default</span>: <span class="hljs-number">1</span>
    }
  },
  created () {
    <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>()
  },
  watch: {
    page (<span class="hljs-keyword">val</span>) {
      <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>()
    }
  },
  methods: {
    <span class="hljs-keyword">get</span> () {
      news.getList({
        page: <span class="hljs-keyword">this</span>.page,
        limit: <span class="hljs-keyword">this</span>.limit
      }, (err, list) =&gt; {
        <span class="hljs-keyword">if</span> (err) {
          console.log(err)
        } <span class="hljs-keyword">else</span> {
          list.<span class="hljs-keyword">data</span>.forEach((<span class="hljs-keyword">data</span>) =&gt; {
            const d = new Date(<span class="hljs-keyword">data</span>.create_at)
            <span class="hljs-keyword">data</span>.create_at = `${d.getFullYear()}-${d.getMonth() + <span class="hljs-number">1</span>}-${d.getDate()}`
          })
          <span class="hljs-keyword">this</span>.list = <span class="hljs-keyword">this</span>.list.concat(list.<span class="hljs-keyword">data</span>)
        }
      })
    }
  }
}
&lt;/script&gt;
</code></pre><p>&#x540C;&#x65F6;&#x6211;&#x4EEC;&#x5C06;App.vue&#x4E2D;&#x7684;&lt;list&gt;&#x4FEE;&#x6539;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;list :page=&quot;page&quot;&gt;&lt;/list&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elixir"><code style="word-break:break-word;white-space:initial">&lt;list <span class="hljs-symbol">:page=<span class="hljs-string">&quot;page&quot;</span>&gt;&lt;/list&gt;</span></code></pre><p>&#x518D;&#x4E3A;page&#x5728;App.vue&#x4E2D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x521D;&#x59CB;&#x503C;&#x4EE5;&#x53CA;&#x5BF9;&#x5E94;&#x7684;&#x65B9;&#x6CD5;next&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
  return {
    page: 1
  }
},
methods: {
  next () {
    this.page++
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-keyword">data</span> () {
  <span class="hljs-keyword">return</span> {
    page: <span class="hljs-number">1</span>
  }
},
methods: {
  next () {
    <span class="hljs-keyword">this</span>.page++
  }
}</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#x7684;&#x529F;&#x80FD;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVwChN" src="https://static.alili.tech/img/bVwChN" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader7">&#x6539;&#x5199;&#x4E3A;&#x5206;&#x9875;</h2><p>&#x56E0;&#x4E3A;&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x7684;&#x601D;&#x8DEF;&#x975E;&#x5E38;&#x6E05;&#x6670;&#xFF0C;&#x4EE3;&#x7801;&#x7ED3;&#x6784;&#x4E5F;&#x5F88;&#x660E;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x6539;&#x5199;&#x8D77;&#x6765;&#x4F1A;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5C06;List.vue&#x4E2D;&#x62FC;&#x63A5;&#x6570;&#x7EC4;&#x6539;&#x4E3A;&#x8D4B;&#x503C;&#x6570;&#x7EC4;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5E38;&#x89C4;loadmore
// this.list = this.list.concat(list.data)
// &#x5206;&#x9875;
this.list = list.data" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code><span class="hljs-comment">// &#x5E38;&#x89C4;loadmore</span>
<span class="hljs-comment">// this.list = this.list.concat(list.data)</span>
<span class="hljs-comment">// &#x5206;&#x9875;</span>
<span class="hljs-keyword">this</span>.<span class="hljs-built_in">list</span> = <span class="hljs-built_in">list</span>.data</code></pre><p>&#x5C31;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#x7684;&#x4E00;&#x884C;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x529F;&#x80FD;&#x7684;&#x6539;&#x53D8;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;Vue.js&#x4E2D;&#x6838;&#x5FC3;&#x7684;&#x6570;&#x636E;&#x9A71;&#x52A8;&#x89C6;&#x56FE;&#x7684;&#x5A01;&#x529B;&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x8FD8;&#x8981;&#x505A;&#x70B9;&#x66F4;cooooool&#x7684;&#x3002;</p><h3 id="articleHeader8">&#x6DFB;&#x52A0;&#x529F;&#x80FD;</h3><p>&#x56E0;&#x4E3A;&#x5206;&#x9875;&#x66FF;&#x6362;&#x4E86;&#x539F;&#x6765;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x6240;&#x4EE5;&#x4EC5;&#x4EC5;&#x4E00;&#x4E2A;Next&#x6309;&#x94AE;&#x4E0D;&#x591F;&#x7528;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x4E00;&#x4E2A;Previous&#x6309;&#x94AE;&#x8FD4;&#x56DE;&#x4E0A;&#x4E00;&#x9875;&#x3002;&#x540C;&#x6837;&#x7684;&#xFF0C;&#x4E5F;&#x7ED9;Previous&#x6309;&#x94AE;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;previous&#x65B9;&#x6CD5;&#xFF0C;&#x9664;&#x4E86;&#x7528;this.page--&#x6539;&#x53D8;page&#x7684;&#x503C;&#x4EE5;&#x5916;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5BF9;this.page === 1&#x7684;&#x8FB9;&#x754C;&#x6761;&#x4EF6;&#x8FDB;&#x884C;&#x4E00;&#x4E2A;&#x5224;&#x65AD;&#x3002;</p><p>&#x540C;&#x65F6;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x77E5;&#x9053;&#x6211;&#x4EEC;&#x5F53;&#x524D;&#x7684;&#x9875;&#x6570;&#xFF0C;&#x5728;&#x6309;&#x94AE;&#x4E2D;&#xFF0C;&#x52A0;&#x5165;{{ page }}&#x663E;&#x793A;&#x9875;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;a class=&quot;button&quot; @click=&quot;next&quot; &gt;GO NEXT&lt;span&gt;CURRENT:{{page}}&lt;/span&gt;&lt;/a&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code style="word-break:break-word;white-space:initial"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;button&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;next&quot;</span> &gt;</span>GO NEXT<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>CURRENT:</span><span class="hljs-template-variable">"{{"page"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span></code></pre><h3 id="articleHeader9">transition&#x52A8;&#x753B;</h3><p>&#x7F16;&#x5199;&#x548C;&#x5B8C;&#x5584;&#x529F;&#x80FD;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5DF2;&#x7ECF;&#x5145;&#x5206;&#x4F53;&#x73B0;&#x4E86;Vue.js&#x6E05;&#x6670;&#x548C;&#x4FBF;&#x5229;&#x7684;&#x4E00;&#x9762;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x7EE7;&#x7EED;&#x770B;&#x770B;&#x5176;&#x5B83;&#x597D;&#x7528;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x9996;&#x5148;&#x5C31;&#x662F;transition&#x52A8;&#x753B;&#x3002;</p><p>&#x4E3A;&#x4E86;&#x5C55;&#x793A;transition&#x7684;&#x5A01;&#x529B;&#xFF0C;&#x9996;&#x5148;&#x6211;&#x627E;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x6A21;&#x4EFF;&#x7684;&#x5BF9;&#x8C61;&#xFF1A;lavalamp.js&#xFF08;<a href="http://jgthms.com/lavalamp.js/lavalamp.html" rel="nofollow noreferrer" target="_blank">Demo&#x5730;&#x5740;</a>&#xFF09;&#x3002;</p><p>&#x5728;Demo&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x9875;&#x9762;&#x4EE5;&#x4E00;&#x79CD;&#x975E;&#x5E38;&#x4F18;&#x96C5;&#x7684;&#x52A8;&#x753B;&#x8FC7;&#x6E21;&#x5B8C;&#x6210;&#x4E86;&#x5207;&#x6362;&#x5185;&#x5BB9;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x5176;&#x672C;&#x8EAB;&#x662F;&#x7528;JQuery+CSS&#x52A8;&#x753B;&#x5B8C;&#x6210;&#x7684;&#xFF0C;&#x6211;&#x51C6;&#x5907;&#x7528;Vue.js&#x8FDB;&#x884C;&#x6539;&#x5199;&#x3002;</p><p>&#x9996;&#x5148;&#x5B66;&#x4E60;&#x4E86;&#x4E00;&#x4E0B;&#x539F;&#x4F5C;&#x8005;&#x7684;&#x5B9E;&#x73B0;&#x601D;&#x8DEF;&#x4EE5;&#x540E;&#xFF0C;&#x53D1;&#x73B0;&#x662F;&#x5C06;&#x4E00;&#x4E2A;div&#x4F5C;&#x4E3A;loader&#xFF0C;position&#x8BBE;&#x5B9A;&#x4E3A;fixed&#x3002;&#x5F53;&#x7FFB;&#x9875;&#x65F6;&#xFF0C;&#x6839;&#x636E;&#x70B9;&#x51FB;&#x7684;&#x6309;&#x94AE;&#x4E0D;&#x540C;&#xFF0C;loader&#x4ECE;&#x9876;&#x90E8;&#x6216;&#x8005;&#x5E95;&#x90E8;&#x6269;&#x5C55;&#x9AD8;&#x5EA6;&#xFF0C;&#x8FBE;&#x5230;100%&#x3002;&#x6570;&#x636E;&#x52A0;&#x8F7D;&#x5B8C;&#x6BD5;&#x540E;&#xFF0C;&#x518D;&#x6298;&#x53E0;&#x9AD8;&#x5EA6;&#xFF0C;&#x6700;&#x7EC8;&#x9690;&#x85CF;&#x3002;</p><p>&#x90A3;&#x4E48;&#x521D;&#x6B65;&#x7684;&#x601D;&#x8DEF;&#x5982;&#x4E0B;&#xFF1A;</p><ol><li><p>&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;loader&#xFF0C;&#x6700;&#x5C0F;&#x9AD8;&#x5EA6;&#x4E0E;&#x6309;&#x94AE;&#x4E00;&#x81F4;&#xFF0C;&#x80CC;&#x666F;&#x540C;&#x4E3A;&#x9ED1;&#x8272;&#xFF0C;&#x8BA9;&#x8FC7;&#x6E21;&#x663E;&#x5F97;&#x66F4;&#x81EA;&#x7136;&#x3002;</p></li><li><p>loader&#x9AD8;&#x5EA6;&#x9700;&#x8981;&#x8FBE;&#x5230;&#x4E00;&#x4E2A;&#x5C4F;&#x5E55;&#x7684;&#x9AD8;&#x5EA6;&#xFF0C;&#x6240;&#x4EE5;&#x8BBE;&#x7F6E;html&#x548C;body&#x7684;height&#x4E3A;100%&#x3002;</p></li><li><p>&#x9700;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x4F5C;&#x4E3A;loader&#x662F;&#x5426;&#x663E;&#x793A;&#x7684;&#x4F9D;&#x636E;&#xFF0C;&#x6211;&#x5B9A;&#x4E3A;finish&#xFF0C;&#x5176;&#x9ED8;&#x8BA4;&#x503C;&#x503C;&#x4E3A;true&#xFF0C;&#x901A;&#x8FC7;&#x7ED9;loader&#x6DFB;&#x52A0;v-show=&quot;!finish&quot;&#x6765;&#x63A7;&#x5236;&#x5176;&#x663E;&#x793A;&#x3002;</p></li><li><p>&#x5728;next&#x548C;previous&#x65B9;&#x6CD5;&#x4E2D;&#x6DFB;&#x52A0;this.finish = false&#x89E6;&#x53D1;loader&#x7684;&#x663E;&#x793A;&#x3002;</p></li><li><p>&#x5728;App.vue&#x548C;List.vue&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;&#x53CC;&#x5411;&#x7684;props&#x5C5E;&#x6027;&#x7ED1;&#x5B9A;&#x81F3;finish&#xFF0C;&#x5F53;List.vue&#x4E2D;&#x7684;get&#x65B9;&#x6CD5;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#xFF0C;&#x901A;&#x8FC7;props&#x5C06;App.vue&#x4E2D;&#x7684;finish&#x8BBE;&#x5B9A;&#x4E3A;true&#xFF0C;&#x9690;&#x85CF;loader&#x3002;</p></li><li><p>&#x7ED9;loader&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;transition&#x3002;&#x7531;&#x4E8E;&#x52A8;&#x753B;&#x5206;&#x4E3A;&#x9876;&#x90E8;&#x5C55;&#x5F00;&#x548C;&#x5E95;&#x90E8;&#x5C55;&#x5F00;&#x4E24;&#x79CD;&#xFF0C;&#x6240;&#x4EE5;&#x4F7F;&#x7528;&#x52A8;&#x6001;&#x7684;transition&#x4E3A;&#x5176;&#x6307;&#x5B9A;&#x6B63;&#x786E;&#x7684;transition&#x540D;&#x79F0;&#x3002;</p></li><li><p>&#x65B0;&#x589E;&#x4E00;&#x4E2A;&#x503C;up&#xFF0C;&#x7528;&#x4E8E;&#x5224;&#x65AD;&#x52A8;&#x753B;&#x4ECE;&#x54EA;&#x4E2A;&#x65B9;&#x5411;&#x5F00;&#x59CB;&#xFF0C;&#x5176;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;false&#x3002;&#x5728;previous&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x6267;&#x884C;this.up = true&#xFF0C;&#x53CD;&#x4E4B;&#x5728;next&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x5219;&#x6267;&#x884C;this.up = false&#x3002;</p></li></ol><p>&#x6839;&#x636E;&#x601D;&#x8DEF;&#xFF0C;&#x5199;&#x51FA;&#x7684;loader&#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF08;style&#x7B49;&#x6837;&#x5F0F;&#x8BBE;&#x5B9A;&#x5728;&#x6700;&#x540E;&#x7EDF;&#x4E00;&#x5C55;&#x793A;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;loader&quot; v-show=&quot;!finish&quot; :transition=&quot;up? &apos;up-start&apos;:&apos;down-start&apos;&quot;&gt;
  &lt;span&gt;Loading&lt;/span&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;loader&quot;</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">&quot;!finish&quot;</span> <span class="hljs-attr">:transition</span>=<span class="hljs-string">&quot;up? &apos;up-start&apos;:&apos;down-start&apos;&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Loading<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6211;&#x8BBE;&#x5B9A;&#x4E86;up-start&#x548C;down-start&#x4E24;&#x79CD;transition&#x65B9;&#x5F0F;&#xFF0C;&#x5BF9;&#x5E94;&#x7684;css&#x52A8;&#x753B;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".down-start-transition {
    bottom: 0;
    height: 100%;
  }
  .down-start-enter {
    animation: expand .5s 1 cubic-bezier(0, 1, 0, 1) both;
  }
  .down-start-leave {
    animation: collapse .5s 1 cubic-bezier(0, 1, 0, 1) both;
    top: 0;
    bottom: auto;
  }
  .up-start-transition {
    top: 0;
    height: 100%;
  }
  .up-start-enter {
    animation: expand .5s 1 cubic-bezier(0, 1, 0, 1) both;
  }
  .up-start-leave {
    animation: collapse .5s 1 cubic-bezier(0, 1, 0, 1) both;
    top: auto;
    bottom: 0;
  }
  @keyframes expand {
    0% {
      height: 3em;
      transform: translate3d(0, 0, 0);
    }
    100% {
      height: 100%;
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes collapse {
    0% {
      height: 100%;
      transform: translate3d(0, 0, 0);
    }
    100% {
      height: 3em;
      transform: translate3d(0, 0, 0);
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.down-start-transition</span> {
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  }
  <span class="hljs-selector-class">.down-start-enter</span> {
    <span class="hljs-attribute">animation</span>: expand .<span class="hljs-number">5s</span> <span class="hljs-number">1</span> <span class="hljs-built_in">cubic-bezier</span>(0, 1, 0, 1) both;
  }
  <span class="hljs-selector-class">.down-start-leave</span> {
    <span class="hljs-attribute">animation</span>: collapse .<span class="hljs-number">5s</span> <span class="hljs-number">1</span> <span class="hljs-built_in">cubic-bezier</span>(0, 1, 0, 1) both;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: auto;
  }
  <span class="hljs-selector-class">.up-start-transition</span> {
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  }
  <span class="hljs-selector-class">.up-start-enter</span> {
    <span class="hljs-attribute">animation</span>: expand .<span class="hljs-number">5s</span> <span class="hljs-number">1</span> <span class="hljs-built_in">cubic-bezier</span>(0, 1, 0, 1) both;
  }
  <span class="hljs-selector-class">.up-start-leave</span> {
    <span class="hljs-attribute">animation</span>: collapse .<span class="hljs-number">5s</span> <span class="hljs-number">1</span> <span class="hljs-built_in">cubic-bezier</span>(0, 1, 0, 1) both;
    <span class="hljs-attribute">top</span>: auto;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  }
  @<span class="hljs-keyword">keyframes</span> expand {
    0% {
      <span class="hljs-attribute">height</span>: <span class="hljs-number">3em</span>;
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
    }
    100% {
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
    }
  }
  @<span class="hljs-keyword">keyframes</span> collapse {
    0% {
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
    }
    100% {
      <span class="hljs-attribute">height</span>: <span class="hljs-number">3em</span>;
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
    }
  }</code></pre><p>&#x8BBE;&#x7F6E;&#x4E86;expand&#x548C;collapse&#x4E24;&#x4E2A;animation&#xFF0C;&#x518D;&#x5728;transition&#x7684;&#x5404;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x4E2D;&#x505A;&#x5BF9;&#x5E94;&#x7684;&#x7ED1;&#x5B9A;&#xFF0C;&#x5C31;&#x8FBE;&#x5230;&#x4E86;&#x548C;lavalamp.js&#x76F8;&#x63A5;&#x8FD1;&#x7684;&#x6548;&#x679C;&#x3002;</p><p><strong>&#x4E3A;&#x4E86;&#x4FDD;&#x8BC1;&#x52A8;&#x753B;&#x80FD;&#x6267;&#x884C;&#x5B8C;&#x6574;&#xFF0C;&#x5728;List.vue&#x7684;get&#x65B9;&#x6CD5;&#x6267;&#x884C;&#x5B8C;&#x4E4B;&#x540E;&#xFF0C;&#x8FD8;&#x4F7F;&#x7528;&#x4E86;&#x4E00;&#x4E2A;setTimeout&#x5B9A;&#x65F6;&#x5668;&#x8BA9;finish&#x5EF6;&#x65F6;0.5&#x79D2;&#x53D8;&#x4E3A;true&#x3002;</strong></p><h3 id="articleHeader10">&#x4F18;&#x5316;&#x4F53;&#x9A8C;</h3><p>&#x52A8;&#x753B;&#x6548;&#x679C;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#xFF0C;&#x5B9E;&#x9645;&#x4F7F;&#x7528;&#x65F6;&#x53D1;&#x73B0;lavalamp.js&#x8FD8;&#x6709;&#x4E2A;&#x5DE7;&#x5999;&#x5730;&#x8BBE;&#x8BA1;&#xFF0C;&#x5C31;&#x662F;&#x70B9;&#x51FB;Previous&#x540E;&#xFF0C;&#x9875;&#x9762;&#x524D;&#x5F80;&#x5E95;&#x90E8;&#xFF0C;&#x53CD;&#x4E4B;&#x70B9;&#x51FB;Next&#x540E;&#x5219;&#x524D;&#x5F80;&#x9876;&#x90E8;&#x3002;</p><p>&#x5B9E;&#x73B0;&#x540E;&#x8005;&#x5E76;&#x4E0D;&#x590D;&#x6742;&#xFF0C;&#x5728;next&#x65B9;&#x6CD5;&#x4E2D;&#x52A0;&#x5165;&#x4EE5;&#x4E0B;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#x8C03;&#x6574;&#x4F4D;&#x7F6E;&#x5373;&#x53EF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.body.scrollTop = 0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.scrollTop</span> = <span class="hljs-number">0</span></code></pre><p>previous&#x524D;&#x5F80;&#x5E95;&#x90E8;&#x5219;&#x7565;&#x5FAE;&#x590D;&#x6742;&#x4E00;&#x70B9;&#xFF0C;&#x56E0;&#x4E3A;&#x83B7;&#x53D6;&#x5230;&#x6570;&#x636E;&#x4E4B;&#x540E;&#xFF0C;&#x9875;&#x9762;&#x9AD8;&#x5EA6;&#x4F1A;&#x53D1;&#x751F;&#x6539;&#x53D8;&#xFF0C;&#x5982;&#x679C;&#x5728;previous&#x4E2D;&#x6267;&#x884C;scrollTop&#x7684;&#x6539;&#x53D8;&#xFF0C;&#x6709;&#x53EF;&#x80FD;&#x4F1A;&#x51FA;&#x73B0;&#x65B0;&#x7684;&#x5185;&#x5BB9;&#x586B;&#x5145;&#x540E;&#x9AD8;&#x5EA6;&#x53D8;&#x957F;&#xFF0C;&#x9875;&#x9762;&#x4E0D;&#x5230;&#x5E95;&#x7684;&#x60C5;&#x51B5;&#x3002;</p><p>&#x6240;&#x4EE5;&#x6211;watch&#x4E86;finish&#x7684;&#x503C;&#xFF0C;&#x4EC5;&#x5F53;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x4E3A;previous&#x4E14;finish&#x53D8;&#x5316;&#x4E3A;false&#x81F3;true&#x65F6;&#x524D;&#x5F80;&#x5E95;&#x90E8;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
  finish (val, oldVal) {
    if (!oldVal &amp;&amp; val &amp;&amp; this.up) {
      document.body.scrollTop = document.body.scrollHeight
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>watch: {
  finish (val, oldVal) {
    <span class="hljs-keyword">if</span> (!oldVal &amp;&amp; val &amp;&amp; this.up) {
      document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.scrollTop</span> = document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.scrollHeight</span>
    }
  }
}</code></pre><h3 id="articleHeader11">&#x524D;&#x7AEF;&#x8DEF;&#x7531;</h3><p>&#x5B8C;&#x6210;&#x4EE5;&#x4E0A;&#x5185;&#x5BB9;&#x4E4B;&#x540E;&#xFF0C;&#x53D1;&#x73B0;&#x4E0D;&#x8BBA;&#x7FFB;&#x5230;&#x7B2C;&#x51E0;&#x9875;&#xFF0C;&#x4E00;&#x65E6;&#x5237;&#x65B0;&#xFF0C;&#x5C31;&#x4F1A;&#x56DE;&#x5230;&#x7B2C;&#x4E00;&#x9875;&#x3002;vue-router&#x5C31;&#x662F;&#x4E3A;&#x89E3;&#x51B3;&#x8FD9;&#x7C7B;&#x95EE;&#x9898;&#x800C;&#x751F;&#x7684;&#x3002;</p><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5F15;&#x5165;VueRouter&#xFF0C;&#x65B9;&#x5F0F;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x4E0A;&#x6587;&#x4E2D;&#x7684;&#x201C;&#x5F15;&#x5165;&#x7B2C;&#x4E09;&#x65B9;JS&#x5E93;&#x201D;&#x3002;&#x7136;&#x540E;&#x5728;main.js&#x5BF9;&#x8DEF;&#x7531;&#x89C4;&#x5219;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x3002;</p><p>&#x6211;&#x4EEC;&#x7684;&#x601D;&#x8DEF;&#x5305;&#x62EC;&#xFF1A;</p><ol><li><p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;url&#x4E0A;&#x53CD;&#x6620;&#x51FA;&#x5F53;&#x524D;&#x6240;&#x5904;&#x7684;&#x9875;&#x6570;&#x3002;</p></li><li><p>url&#x4E2D;&#x7684;&#x9875;&#x6570;&#x5E94;&#x8BE5;&#x4E0E;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;page&#x503C;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#x3002;</p></li><li><p>&#x70B9;&#x51FB;Next&#x548C;Previous&#x6309;&#x94AE;&#x8981;&#x8DF3;&#x8F6C;&#x5230;&#x5BF9;&#x5E94;&#x7684;url&#x53BB;&#x3002;</p></li><li><p>&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#x6211;&#x4EEC;&#x6CA1;&#x6709;router-view&#x3002;</p></li></ol><p>&#x56E0;&#x6B64;main.js&#x7684;&#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import App from &apos;./App&apos;
import VueRouter from &apos;VueRouter&apos;

Vue.use(VueRouter)

const router = new VueRouter()
router.map({
  &apos;/page/:pageNum&apos;: {
    name: &apos;page&apos;,
    component: {}
  }
})

router.redirect({
  &apos;/&apos;: &apos;/page/1&apos;
})

router.beforeEach((transition) =&gt; {
  if (transition.to.path !== &apos;/page/0&apos;) {
    transition.next()
  } else {
    transition.abort()
  }
})

router.start(App, &apos;app&apos;)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App&apos;</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;VueRouter&apos;</span>

Vue.use(VueRouter)

const router = <span class="hljs-keyword">new</span> VueRouter()
router.map({
  <span class="hljs-string">&apos;/page/:pageNum&apos;</span>: {
    name: <span class="hljs-string">&apos;page&apos;</span>,
    component: {}
  }
})

router.redirect({
  <span class="hljs-string">&apos;/&apos;</span>: <span class="hljs-string">&apos;/page/1&apos;</span>
})

router.beforeEach(<span class="hljs-function"><span class="hljs-params">(transition)</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (transition.to.path !== <span class="hljs-string">&apos;/page/0&apos;</span>) {
    transition.next()
  } <span class="hljs-keyword">else</span> {
    transition.abort()
  }
})

router.start(App, <span class="hljs-string">&apos;app&apos;</span>)
</code></pre><p>&#x9996;&#x5148;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;page&#x7684;&#x5177;&#x540D;&#x8DEF;&#x5F84;&#x3002;&#x4E4B;&#x540E;&#x5C06;&#x6240;&#x6709;&#x76EE;&#x6807;&#x8DEF;&#x5F84;&#x4E3A;&apos;/&apos;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x521D;&#x59CB;&#x9875;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x91CD;&#x5B9A;&#x5411;&#x5230;&apos;/page/1&apos;&#x4E0A;&#x4FDD;&#x8BC1;&#x4E00;&#x81F4;&#x6027;&#x3002;&#x6700;&#x540E;&#x518D;&#x5728;&#x6BCF;&#x6B21;&#x8DEF;&#x7531;&#x6267;&#x884C;&#x4E4B;&#x524D;&#x505A;&#x4E00;&#x4E2A;&#x5224;&#x65AD;&#xFF0C;&#x5982;&#x679C;&#x5230;&#x4E86;&apos;/page/0&apos;&#x8FD9;&#x6837;&#x7684;&#x975E;&#x6CD5;&#x8DEF;&#x5F84;&#x4E0A;&#xFF0C;&#x5C31;&#x4E0D;&#x6267;&#x884C;transition.next()&#x3002;</p><p>&#x6839;&#x636E;&#x4E4B;&#x524D;&#x7684;&#x601D;&#x8DEF;&#xFF0C;&#x5728;App.vue&#x4E2D;&#xFF0C;&#x83B7;&#x53D6;&#x8DEF;&#x7531;&#x5BF9;&#x8C61;&#x7684;&#x53C2;&#x6570;&#x503C;&#xFF0C;&#x8D4B;&#x503C;&#x7ED9;page&#x3002;&#x540C;&#x65F6;&#x7ED9;&#x4E24;&#x4E2A;&#x6309;&#x94AE;&#x6DFB;&#x52A0;&#x5BF9;&#x5E94;&#x7684;v-link&#x3002;</p><blockquote><p><a href="http://lab.myriptide.com/loadmore/" rel="nofollow noreferrer" target="_blank">&#x6700;&#x7EC8;&#x7684;demo&#x5730;&#x5740;</a><br><a href="https://github.com/Yuyz0112/vue-loadmore-demo" rel="nofollow noreferrer" target="_blank">Github&#x4ED3;&#x5E93;</a></p></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js 开发实践：实现精巧的无限加载与分页功能

## 原文链接
[https://segmentfault.com/a/1190000005351971](https://segmentfault.com/a/1190000005351971)

