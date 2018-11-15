---
title: 揭密 Vue 的双向绑定
reprint: true
categories: reprint
abbrlink: 9b7ea80d
date: 2018-11-03 02:30:13
---

{{% raw %}}
<p>Vue &#x4E2D;&#x9700;&#x8981;&#x8F93;&#x5165;&#x4EC0;&#x4E48;&#x5185;&#x5BB9;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x81EA;&#x7136;&#x4F1A;&#x60F3;&#x5230;&#x4F7F;&#x7528; <code>&lt;input v-model=&quot;xxx&quot; /&gt;</code> &#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5B9E;&#x73B0;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x3002;&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684;&#x793A;&#x4F8B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;h2&gt;What&apos;s your name:&lt;/h2&gt;
    &lt;input v-model=&quot;name&quot; /&gt;
    &lt;div&gt;Hello {{ name }}&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>What&apos;s your name:<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;name&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello </span><span class="hljs-template-variable">{{ name }}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: &quot;#app&quot;,
    data: {
           name: &quot;&quot;
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&quot;#app&quot;</span>,
    <span class="hljs-attr">data</span>: {
           <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;&quot;</span>
    }
});</code></pre><blockquote><strong>JsFiddle &#x6F14;&#x793A;</strong><p><a href="https://jsfiddle.net/0okxhc6f/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/0okxhc6f/</a><button class="btn btn-xs btn-default ml10 preview" data-url="0okxhc6f/" data-typeid="0">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p></blockquote><p>&#x5728;&#x8FD9;&#x4E2A;&#x793A;&#x4F8B;&#x7684;&#x8F93;&#x5165;&#x6846;&#x4E2D;&#x8F93;&#x5165;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x4F1A;&#x968F;&#x540E;&#x5448;&#x73B0;&#x51FA;&#x6765;&#x3002;&#x8FD9;&#x662F; Vue &#x539F;&#x751F;&#x5BF9; <code>&lt;input&gt;</code> &#x7684;&#x826F;&#x597D;&#x652F;&#x6301;&#xFF0C;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x7236;&#x7EC4;&#x4EF6;&#x548C;&#x5B50;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x8FDB;&#x884C;&#x53CC;&#x5411;&#x6570;&#x636E;&#x4F20;&#x9012;&#x7684;&#x5178;&#x578B;&#x793A;&#x4F8B;&#x3002;&#x4E0D;&#x8FC7; <code>v-model</code> &#x662F; Vue 2.2.0 &#x624D;&#x52A0;&#x5165;&#x7684;&#x4E00;&#x4E2A;&#x65B0;&#x529F;&#x80FD;&#xFF0C;&#x5728;&#x6B64;&#x4E4B;&#x524D;&#xFF0C;Vue &#x53EA;&#x652F;&#x6301;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x3002;</p><h2 id="articleHeader0">Vue &#x7684;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;</h2><p>Vue &#x7684;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x548C; React &#x76F8;&#x4F3C;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8BBE;&#x7F6E;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5C5E;&#x6027;&#xFF08;Props&#xFF09;&#x6765;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x7236;&#x7EC4;&#x4EF6;&#x60F3;&#x83B7;&#x5F97;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5F97;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x6CE8;&#x518C;&#x4E8B;&#x4EF6;&#xFF0C;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x9AD8;&#x5174;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x628A;&#x6570;&#x636E;&#x4F20;&#x9012;&#x51FA;&#x6765;&#x3002;&#x4E00;&#x53E5;&#x8BDD;&#x603B;&#x7ED3;&#x8D77;&#x6765;&#x5C31;&#x662F;&#xFF0C;Props &#x5411;&#x4E0B;&#x4F20;&#x9012;&#x6570;&#x636E;&#xFF0C;&#x4E8B;&#x4EF6;&#x5411;&#x4E0A;&#x4F20;&#x9012;&#x6570;&#x636E;&#x3002;</p><p>&#x4E0A;&#x9762;&#x90A3;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x4F7F;&#x7528; <code>v-model</code>&#xFF0C;&#x5B83;&#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x6837;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;input :value=&quot;name&quot; @input=&quot;name = $event.target.value&quot; /&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ceylon"><code class="vue" style="word-break:break-word;white-space:initial">&lt;input :<span class="hljs-keyword">value</span>=<span class="hljs-string">&quot;name&quot;</span> <span class="hljs-meta">@input</span>=<span class="hljs-string">&quot;name = $event.target.value&quot;</span> /&gt;</code></pre><p>&#x7531;&#x4E8E;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x5199;&#x6210;&#x4E86;&#x5185;&#x8054;&#x6A21;&#x5F0F;&#xFF0C;&#x6240;&#x4EE5;&#x811A;&#x672C;&#x90E8;&#x5206;&#x4E0D;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x3002;&#x4F46;&#x662F;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4E8B;&#x4EF6;&#x4E00;&#x822C;&#x90FD;&#x4F1A;&#x5B9A;&#x4E49;&#x6210;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x4EE3;&#x7801;&#x5C31;&#x4F1A;&#x590D;&#x6742;&#x5F97;&#x591A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;input :value=&quot;name&quot; @input=&quot;updateName&quot; /&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ceylon"><code class="vue" style="word-break:break-word;white-space:initial">&lt;input :<span class="hljs-keyword">value</span>=<span class="hljs-string">&quot;name&quot;</span> <span class="hljs-meta">@input</span>=<span class="hljs-string">&quot;updateName&quot;</span> /&gt;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    // ....
    methods: {
        updateName(e) {
            this.name = e.target.value;
        }
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-comment">// ....</span>
    methods: {
        updateName(e) {
            <span class="hljs-keyword">this</span>.name = e.target.value;
        }
    }
})</code></pre><p>&#x4ECE;&#x4E0A;&#x9762;&#x7684;&#x793A;&#x4F8B;&#x6765;&#x770B; <code>v-model</code> &#x8282;&#x7EA6;&#x4E86;&#x4E0D;&#x5C11;&#x4EE3;&#x7801;&#xFF0C;&#x6700;&#x91CD;&#x8981;&#x7684;&#x662F;&#x53EF;&#x4EE5;&#x5C11;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#x3002;&#x6240;&#x4EE5; <code>v-model</code> &#x5B9E;&#x9645;&#x5E72;&#x7684;&#x4E8B;&#x4EF6;&#x5305;&#x62EC;</p><ul><li>&#x4F7F;&#x7528; <code>v-bind</code>&#xFF08;&#x5373; <code>:</code>&#xFF09;&#x5355;&#x5411;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF08;&#x793A;&#x4F8B;&#xFF1A;<code>:value=&quot;name&quot;</code>&#xFF09;</li><li>&#x7ED1;&#x5B9A; <code>input</code> &#x4E8B;&#x4EF6;&#xFF08;&#x5373; <code>@input</code>&#xFF09;&#x5230;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#x5B9E;&#x73B0;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#xFF08;&#x793A;&#x4F8B;&#xFF1A;<code>@input=updateName</code></li><li>&#x8FD9;&#x4E2A;&#x9ED8;&#x8BA4;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#x4F1A;&#x6839;&#x636E;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#x5E26;&#x5165;&#x7684;&#x503C;&#x6765;&#x4FEE;&#x6539;&#x88AB;&#x7ED1;&#x5B9A;&#x7684;&#x6570;&#x636E;&#xFF08;&#x793A;&#x4F8B;&#xFF1A;<code>this.name = e.target.value</code>&#xFF09;</li></ul><h2 id="articleHeader1">&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684; <code>v-model</code></h2><p>Vue &#x5BF9;&#x539F;&#x751F;&#x7EC4;&#x4EF6;&#x8FDB;&#x884C;&#x4E86;&#x5C01;&#x88C5;&#xFF0C;&#x6240;&#x4EE5; <code>&lt;input&gt;</code> &#x5728;&#x8F93;&#x5165;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1; <code>input</code> &#x4E8B;&#x4EF6;&#x3002;&#x4F46;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x5E94;&#x8BE5;&#x600E;&#x4E48;&#x5462;&#xFF1F;&#x8FD9;&#x91CC;&#x4E0D;&#x59A8;&#x501F;&#x52A9; JsFiddle Vue &#x6837;&#x677F;&#x7684; Todo List &#x793A;&#x4F8B;&#x3002;</p><h3 id="articleHeader2">JsFiddle &#x7684; Vue &#x6837;&#x677F;</h3><blockquote>&#x70B9;&#x51FB; JsFilddle &#x7684; Logo&#xFF0C;&#x5728;&#x4E0A;&#x9762;&#x5F39;&#x51FA;&#x9762;&#x677F;&#x4E2D;&#x9009;&#x62E9; Vue &#x6837;&#x677F;&#x5373;&#x53EF;</blockquote><p>&#x6837;&#x677F;&#x4EE3;&#x7801;&#x5305;&#x542B; HTML &#x548C; Vue(js) &#x4E24;&#x4E2A;&#x90E8;&#x5206;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
  &lt;h2&gt;Todos:&lt;/h2&gt;
  &lt;ol&gt;
    &lt;li v-for=&quot;todo in todos&quot;&gt;
      &lt;label&gt;
        &lt;input type=&quot;checkbox&quot;
          v-on:change=&quot;toggle(todo)&quot;
          v-bind:checked=&quot;todo.done&quot;&gt;

        &lt;del v-if=&quot;todo.done&quot;&gt;
          {{ todo.text }}
        &lt;/del&gt;
        &lt;span v-else&gt;
          {{ todo.text }}
        &lt;/span&gt;
      &lt;/label&gt;
    &lt;/li&gt;
  &lt;/ol&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Todos:<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;todo in todos&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
          <span class="hljs-attr">v-on:change</span>=<span class="hljs-string">&quot;toggle(todo)&quot;</span>
          <span class="hljs-attr">v-bind:checked</span>=<span class="hljs-string">&quot;todo.done&quot;</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">del</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;todo.done&quot;</span>&gt;</span>
          </span><span class="hljs-template-variable">{{ todo.text }}</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">del</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-else</span>&gt;</span>
          </span><span class="hljs-template-variable">{{ todo.text }}</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: &quot;#app&quot;,
  data: {
    todos: [
      { text: &quot;Learn JavaScript&quot;, done: false },
      { text: &quot;Learn Vue&quot;, done: false },
      { text: &quot;Play around in JSFiddle&quot;, done: true },
      { text: &quot;Build something awesome&quot;, done: true }
    ]
  },
  methods: {
      toggle: function(todo){
        todo.done = !todo.done
    }
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">&quot;#app&quot;</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">todos</span>: [
      { <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Learn JavaScript&quot;</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span> },
      { <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Learn Vue&quot;</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span> },
      { <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Play around in JSFiddle&quot;</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> },
      { <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Build something awesome&quot;</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> }
    ]
  },
  <span class="hljs-attr">methods</span>: {
      <span class="hljs-attr">toggle</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">todo</span>)</span>{
        todo.done = !todo.done
    }
  }
})</code></pre><h3 id="articleHeader3">&#x5B9A;&#x4E49; Todo &#x7EC4;&#x4EF6;</h3><p>JsFiddle &#x7684; Vue &#x6A21;&#x677F;&#x9ED8;&#x8BA4;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A; Todo &#x5217;&#x8868;&#x7684;&#x5C55;&#x793A;&#xFF0C;&#x6570;&#x636E;&#x662F;&#x56FA;&#x5B9A;&#x7684;&#xFF0C;&#x6240;&#x6709;&#x5185;&#x5BB9;&#x5728;&#x4E00;&#x4E2A;&#x6A21;&#x677F;&#x4E2D;&#x5B8C;&#x6210;&#x3002;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x8981;&#x505A;&#x4E8B;&#x60C5;&#x662F;&#x628A;&#x5355;&#x4E2A; Todo &#x6539;&#x6210;&#x4E00;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;&#x56E0;&#x4E3A;&#x5728; JsFiddle &#x4E2D;&#x4E0D;&#x80FD;&#x5199;&#x6210;&#x591A;&#x6587;&#x4EF6;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x6240;&#x4EE5;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528; <code>Vue.component()</code> &#x5728;&#x811A;&#x672C;&#x4E2D;&#x5B9A;&#x4E49;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x628A; <code>&lt;li&gt;</code> &#x5185;&#x5BB9;&#x4E2D;&#x7684;&#x90A3;&#x90E8;&#x5206;&#x62CE;&#x51FA;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&quot;todo&quot;, {
    template: `
&lt;label&gt;
    &lt;input type=&quot;checkbox&quot; @change=&quot;toggle&quot; :checked=&quot;isDone&quot;&gt;
    &lt;del v-if=&quot;isDone&quot;&gt;
        {{ text }}
    &lt;/del&gt;
    &lt;span v-else&gt;
        {{ text }}
    &lt;/span&gt;
&lt;/label&gt;
`,
    props: [&quot;text&quot;, &quot;done&quot;],
    data() {
        return {
            isDone: this.done
        };
    },
    methods: {
        toggle() {
            this.isDone = !this.isDone;
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">&quot;todo&quot;</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
&lt;label&gt;
    &lt;input type=&quot;checkbox&quot; @change=&quot;toggle&quot; :checked=&quot;isDone&quot;&gt;
    &lt;del v-if=&quot;isDone&quot;&gt;
        {{ text }}
    &lt;/del&gt;
    &lt;span v-else&gt;
        {{ text }}
    &lt;/span&gt;
&lt;/label&gt;
`</span>,
    <span class="hljs-attr">props</span>: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;done&quot;</span>],
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">isDone</span>: <span class="hljs-keyword">this</span>.done
        };
    },
    <span class="hljs-attr">methods</span>: {
        toggle() {
            <span class="hljs-keyword">this</span>.isDone = !<span class="hljs-keyword">this</span>.isDone;
        }
    }
});</code></pre><p>&#x539F;&#x6765;&#x5B9A;&#x4E49;&#x5728; App &#x4E2D;&#x7684; <code>toggle()</code> &#x65B9;&#x6CD5;&#x4E5F;&#x7A0D;&#x4F5C;&#x6539;&#x52A8;&#xFF0C;&#x5B9A;&#x4E49;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x4E86;&#x3002;<code>toggle()</code> &#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x4FEE;&#x6539;&#x8868;&#x793A;&#x662F;&#x5426;&#x5B8C;&#x6210;&#x7684; <code>done</code> &#x7684;&#x503C;&#x3002;&#x4F46;&#x7531;&#x4E8E; <code>done</code> &#x662F;&#x5B9A;&#x4E49;&#x5728; <code>props</code> &#x4E2D;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x8D4B;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x91C7;&#x7528;&#x4E86;&#x5B98;&#x65B9;&#x63A8;&#x8350;&#x7684;&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#xFF0C;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x6570;&#x636E; <code>isDone</code>&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x4E3A; <code>this.done</code>&#xFF0C;&#x5E76;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x4F7F;&#x7528; <code>isDone</code> &#x6765;&#x63A7;&#x5236;&#x662F;&#x5426;&#x5B8C;&#x6210;&#x8FD9;&#x4E00;&#x72B6;&#x6001;&#x3002;</p><p>&#x76F8;&#x5E94;&#x7684; App &#x90E8;&#x5206;&#x7684;&#x6A21;&#x677F;&#x548C;&#x4EE3;&#x7801;&#x7CBE;&#x51CF;&#x4E86;&#x4E0D;&#x5C11;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;h2&gt;Todos:&lt;/h2&gt;
    &lt;ol&gt;
        &lt;li v-for=&quot;todo in todos&quot;&gt;
            &lt;todo :text=&quot;todo.text&quot; :done=&quot;todo.done&quot;&gt;&lt;/todo&gt;
        &lt;/li&gt;
    &lt;/ol&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Todos:<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;todo in todos&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">todo</span> <span class="hljs-attr">:text</span>=<span class="hljs-string">&quot;todo.text&quot;</span> <span class="hljs-attr">:done</span>=<span class="hljs-string">&quot;todo.done&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">todo</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: &quot;#app&quot;,
    data: {
        todos: [
            { text: &quot;Learn JavaScript&quot;, done: false },
            { text: &quot;Learn Vue&quot;, done: false },
            { text: &quot;Play around in JSFiddle&quot;, done: true },
            { text: &quot;Build something awesome&quot;, done: true }
        ]
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&quot;#app&quot;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">todos</span>: [
            { <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Learn JavaScript&quot;</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span> },
            { <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Learn Vue&quot;</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span> },
            { <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Play around in JSFiddle&quot;</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> },
            { <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Build something awesome&quot;</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> }
        ]
    }
});</code></pre><blockquote><strong>JsFiddle &#x6F14;&#x793A;</strong><p><a href="https://jsfiddle.net/0okxhc6f/1/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/0okxhc6f/1/</a><button class="btn btn-xs btn-default ml10 preview" data-url="0okxhc6f/1/" data-typeid="0">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p></blockquote><p>&#x4E0D;&#x8FC7;&#x5230;&#x6B64;&#x4E3A;&#x6B62;&#xFF0C;&#x6570;&#x636E;&#x4ECD;&#x7136;&#x662F;&#x5355;&#x5411;&#x7684;&#x3002;&#x4ECE;&#x6548;&#x679C;&#x4E0A;&#x6765;&#x770B;&#xFF0C;&#x70B9;&#x51FB;&#x590D;&#x9009;&#x6846;&#x53EF;&#x4EE5;&#x53CD;&#x9988;&#x51FA;&#x5220;&#x9664;&#x7EBF;&#x7EBF;&#x6548;&#x679C;&#xFF0C;&#x4F46;&#x8FD9;&#x4E9B;&#x52A8;&#x6001;&#x53D8;&#x5316;&#x90FD;&#x662F;&#x5728; <code>todo</code> &#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x5B8C;&#x6210;&#x7684;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x7684;&#x95EE;&#x9898;&#x3002;</p><h3 id="articleHeader4">&#x4E3A; Todo List &#x6DFB;&#x52A0;&#x8BA1;&#x6570;</h3><p>&#x4E3A;&#x4E86;&#x8BA9; <code>todo</code> &#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x7684;&#x72B6;&#x6001;&#x53D8;&#x5316;&#x80FD;&#x5728; Todo List &#x4E2D;&#x5448;&#x73B0;&#x51FA;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x5728; Todo List &#x4E2D;&#x6DFB;&#x52A0;&#x8BA1;&#x6570;&#xFF0C;&#x5C55;&#x793A;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x7684; Todo &#x6570;&#x91CF;&#x3002;&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x6570;&#x91CF;&#x53D7; <code>todo</code> &#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x72B6;&#x6001;&#xFF08;&#x6570;&#x636E;&#xFF09;&#x7684;&#x5F71;&#x54CD;&#xFF0C;&#x8FD9;&#x5C31;&#x9700;&#x8981;&#x5C06; <code>todo</code> &#x5185;&#x90E8;&#x6570;&#x636E;&#x53D8;&#x5316;&#x53CD;&#x5E94;&#x5230;&#x5176;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x8FD9;&#x624D;&#x6709; <code>v-model</code> &#x7684;&#x7528;&#x6B66;&#x4E4B;&#x5730;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x6570;&#x91CF;&#x6211;&#x4EEC;&#x5728;&#x6807;&#x9898;&#x4E2D;&#x4EE5; <code>n/m</code> &#x7684;&#x5F62;&#x5F0F;&#x5448;&#x73B0;&#xFF0C;&#x6BD4;&#x5982; <code>2/4</code> &#x8868;&#x793A;&#x4E00;&#x5171; 4 &#x6761; Todo&#xFF0C;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210; 2 &#x6761;&#x3002;&#x8FD9;&#x9700;&#x8981;&#x5BF9; Todo List &#x7684;&#x6A21;&#x677F;&#x548C;&#x4EE3;&#x7801;&#x90E8;&#x5206;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#xFF0C;&#x6DFB;&#x52A0; <code>countDone</code> &#x548C; <code>count</code> &#x4E24;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;h2&gt;Todos ({{ countDone }}/{{ count }}):&lt;/h2&gt;
    &lt;!-- ... --&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Todos (</span><span class="hljs-template-variable">{{ countDone }}</span><span class="xml">/</span><span class="hljs-template-variable">{{ count }}</span><span class="xml">):<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    // ...
    computed: {
        count() {
            return this.todos.length;
        },
        countDone() {
            return this.todos.filter(todo =&gt; todo.done).length;
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-comment">// ...</span>
    computed: {
        count() {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.todos.length;
        },
        countDone() {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.todos.filter(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> todo.done).length;
        }
    }
});</code></pre><p>&#x73B0;&#x5728;&#x8BA1;&#x6570;&#x5448;&#x73B0;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x73B0;&#x5728;&#x6539;&#x53D8;&#x4EFB;&#x52A1;&#x72B6;&#x6001;&#x5E76;&#x4E0D;&#x4F1A;&#x5BF9;&#x8FD9;&#x4E2A;&#x8BA1;&#x6570;&#x4EA7;&#x751F;&#x5F71;&#x54CD;&#x3002;&#x6211;&#x4EEC;&#x8981;&#x8BA9;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x53D8;&#x52A8;&#x5BF9;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#x4EA7;&#x751F;&#x5F71;&#x54CD;&#x3002;<code>v-model</code> &#x5F85;&#x4F1A;&#x513F;&#x518D;&#x8BF4;&#xFF0C;&#x5148;&#x7528;&#x6700;&#x5E38;&#x89C1;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4E8B;&#x4EF6;&#xFF1A;</p><ul><li>&#x5B50;&#x7EC4;&#x4EF6; <code>todo</code> &#x5728; <code>toggle()</code> &#x4E2D;&#x89E6;&#x53D1; <code>toggle</code> &#x4E8B;&#x4EF6;&#x5E76;&#x5C06; <code>isDone</code> &#x4F5C;&#x4E3A;&#x4E8B;&#x4EF6;&#x53C2;&#x6570;</li><li>&#x7236;&#x7EC4;&#x4EF6;&#x4E3A;&#x5B50;&#x7EC4;&#x4EF6;&#x7684; <code>toggle</code> &#x4E8B;&#x4EF6;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&quot;todo&quot;, {
    //...
    methods: {
        toggle(e) {
            this.isDone = !this.isDone;
            this.$emit(&quot;toggle&quot;, this.isDone);
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">&quot;todo&quot;</span>, {
    <span class="hljs-comment">//...</span>
    methods: {
        toggle(e) {
            <span class="hljs-keyword">this</span>.isDone = !<span class="hljs-keyword">this</span>.isDone;
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&quot;toggle&quot;</span>, <span class="hljs-keyword">this</span>.isDone);
        }
    }
});</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- #app &#x4E2D;&#x5176;&#x5B83;&#x4EE3;&#x7801;&#x7565; --&gt;
&lt;todo :text=&quot;todo.text&quot; :done=&quot;todo.done&quot; @toggle=&quot;todo.done = $event&quot;&gt;&lt;/todo&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue"><span class="hljs-comment">&lt;!-- #app &#x4E2D;&#x5176;&#x5B83;&#x4EE3;&#x7801;&#x7565; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">todo</span> <span class="hljs-attr">:text</span>=<span class="hljs-string">&quot;todo.text&quot;</span> <span class="hljs-attr">:done</span>=<span class="hljs-string">&quot;todo.done&quot;</span> @<span class="hljs-attr">toggle</span>=<span class="hljs-string">&quot;todo.done = $event&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">todo</span>&gt;</span></code></pre><p>&#x8FD9;&#x91CC;&#x4E3A; <code>@toggle</code> &#x7ED1;&#x5B9A;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x3002;&#x56E0;&#x4E3A;&#x8FD9;&#x91CC;&#x7684; <code>todo</code> &#x662F;&#x4E00;&#x4E2A;&#x4E34;&#x65F6;&#x53D8;&#x91CF;&#xFF0C;&#x5982;&#x679C;&#x5728; <code>methods</code> &#x4E2D;&#x5B9A;&#x4E49;&#x4E13;&#x95E8;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#x5F88;&#x96BE;&#x5C06;&#x8FD9;&#x4E2A;&#x4E34;&#x65F6;&#x53D8;&#x91CF;&#x7ED1;&#x5B9A;&#x8FC7;&#x53BB;&#xFF08;&#x5F53;&#x7136;&#x5B9A;&#x4E49;&#x666E;&#x901A;&#x65B9;&#x6CD5;&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x7684;&#x5F62;&#x5F0F;&#x662F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7684;&#xFF09;&#x3002;</p><blockquote>&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#xFF0C;&#x4E00;&#x822C;&#x76F4;&#x63A5;&#x5BF9;&#x5E94;&#x4E8E;&#x8981;&#x5904;&#x7406;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x6BD4;&#x5982;&#x5B9A;&#x4E49; <code>onToggle(e)</code>&#xFF0C;&#x7ED1;&#x5B9A;&#x4E3A; <code>@toggle=&quot;onToggle&quot;</code>&#x3002;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x4E0D;&#x80FD;&#x4F20;&#x5165; <code>todo</code> &#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x3002;<p>&#x666E;&#x901A;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9A;&#x4E49;&#x6210; <code>toggle(todo, e)</code>&#xFF0C;&#x5728;&#x4E8B;&#x4EF6;&#x5B9A;&#x4E49;&#x4E2D;&#x4EE5;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x5F62;&#x5F0F;&#x8C03;&#x7528;&#xFF1A;<code>@toggle=&quot;toggle(todo, $event)&quot;&#x3002;&#x5B83;&#x548C;</code>todo.done = $event` &#x540C;&#x5C5E;&#x8868;&#x8FBE;&#x5F0F;&#x3002;</p><p>&#x6CE8;&#x610F;&#x4E8C;&#x8005;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x524D;&#x8005;&#x662F;&#x7ED1;&#x5B9A;&#x7684;&#x5904;&#x7406;&#x51FD;&#x6570;&#xFF08;&#x5F15;&#x7528;&#xFF09;&#xFF0C;&#x540E;&#x8005;&#x662F;&#x7ED1;&#x5B9A;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#xFF08;&#x8C03;&#x7528;&#xFF09;</p></blockquote><p>&#x73B0;&#x5728;&#x901A;&#x8FC7;&#x4E8B;&#x4EF6;&#x65B9;&#x5F0F;&#x5DF2;&#x7ECF;&#x8FBE;&#x5230;&#x4E86;&#x9884;&#x671F;&#x6548;&#x679C;</p><blockquote><strong>Js Fiddle &#x6F14;&#x793A;</strong><p><a href="https://jsfiddle.net/0okxhc6f/2/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/0okxhc6f/2/</a><button class="btn btn-xs btn-default ml10 preview" data-url="0okxhc6f/2/" data-typeid="0">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p></blockquote><h3 id="articleHeader5">&#x6539;&#x9020;&#x6210; <code>v-model</code></h3><p>&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x8BF4;&#x4E86;&#x8981;&#x7528; <code>v-model</code> &#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x73B0;&#x5728;&#x6765;&#x6539;&#x9020;&#x4E00;&#x4E0B;&#x3002;&#x6CE8;&#x610F;&#x5B9E;&#x73B0; <code>v-model</code> &#x7684;&#x51E0;&#x4E2A;&#x8981;&#x7D20;</p><ul><li>&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7; <code>value</code> &#x5C5E;&#x6027;&#xFF08;Prop&#xFF09;&#x63A5;&#x53D7;&#x8F93;&#x5165;</li><li>&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;&#x89E6;&#x53D1; <code>input</code> &#x4E8B;&#x4EF6;&#x8F93;&#x51FA;&#xFF0C;&#x5E26;&#x6570;&#x7EC4;&#x53C2;&#x6570;</li><li>&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x7528; <code>v-model</code> &#x7ED1;&#x5B9A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&quot;todo&quot;, {
    // ...
    props: [&quot;text&quot;, &quot;value&quot;],   // &lt;-- &#x6CE8;&#x610F; done &#x6539;&#x6210;&#x4E86; value
    data() {
        return {
            isDone: this.value    // &lt;-- &#x6CE8;&#x610F; this.done &#x6539;&#x6210;&#x4E86; this.value
        };
    },
    methods: {
        toggle(e) {
            this.isDone = !this.isDone;
            this.$emit(&quot;input&quot;, this.isDone);  // &lt;-- &#x6CE8;&#x610F;&#x4E8B;&#x4EF6;&#x540D;&#x79F0;&#x53D8;&#x4E86;
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">&quot;todo&quot;</span>, {
    <span class="hljs-comment">// ...</span>
    props: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;value&quot;</span>],   <span class="hljs-comment">// &lt;-- &#x6CE8;&#x610F; done &#x6539;&#x6210;&#x4E86; value</span>
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">isDone</span>: <span class="hljs-keyword">this</span>.value    <span class="hljs-comment">// &lt;-- &#x6CE8;&#x610F; this.done &#x6539;&#x6210;&#x4E86; this.value</span>
        };
    },
    <span class="hljs-attr">methods</span>: {
        toggle(e) {
            <span class="hljs-keyword">this</span>.isDone = !<span class="hljs-keyword">this</span>.isDone;
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&quot;input&quot;</span>, <span class="hljs-keyword">this</span>.isDone);  <span class="hljs-comment">// &lt;-- &#x6CE8;&#x610F;&#x4E8B;&#x4EF6;&#x540D;&#x79F0;&#x53D8;&#x4E86;</span>
        }
    }
});</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- #app &#x4E2D;&#x5176;&#x5B83;&#x4EE3;&#x7801;&#x7565; --&gt;
&lt;todo :text=&quot;todo.text&quot; v-model=&quot;todo.done&quot;&gt;&lt;/todo&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue"><span class="hljs-comment">&lt;!-- #app &#x4E2D;&#x5176;&#x5B83;&#x4EE3;&#x7801;&#x7565; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">todo</span> <span class="hljs-attr">:text</span>=<span class="hljs-string">&quot;todo.text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;todo.done&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">todo</span>&gt;</span></code></pre><h2 id="articleHeader6"><code>.sync</code> &#x5B9E;&#x73B0;&#x5176;&#x5B83;&#x6570;&#x636E;&#x7ED1;&#x5B9A;</h2><p>&#x524D;&#x9762;&#x8BB2;&#x5230;&#x4E86; Vue 2.2.0 &#x5F15;&#x5165; <code>v-model</code> &#x7279;&#x6027;&#x3002;&#x7531;&#x4E8E;&#x67D0;&#x4E9B;&#x539F;&#x56E0;&#xFF0C;&#x5B83;&#x7684;&#x8F93;&#x5165;&#x5C5E;&#x6027;&#x662F; <code>value</code>&#xFF0C;&#x4F46;&#x8F93;&#x51FA;&#x4E8B;&#x4EF6;&#x53EB; <code>input</code>&#x3002;<code>v-model</code>&#x3001;<code>value</code>&#x3001;<code>input</code> &#x8FD9;&#x4E09;&#x4E2A;&#x540D;&#x79F0;&#x4ECE;&#x5B57;&#x9762;&#x4E0A;&#x770B;&#x4E0D;&#x5230;&#x534A;&#x70B9;&#x5173;&#x7CFB;&#x3002;&#x867D;&#x7136;&#x8FD9;&#x770B;&#x8D77;&#x6765;&#x6709;&#x70B9;&#x5947;&#x8469;&#xFF0C;&#x4F46;&#x8FD9;&#x4E0D;&#x662F;&#x91CD;&#x70B9;&#xFF0C;&#x91CD;&#x70B9;&#x662F;&#x4E00;&#x4E2A;&#x63A7;&#x4EF6;&#x53EA;&#x80FD;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x5417;&#xFF1F;</p><p>Vue 2.3.0 &#x5F15;&#x5165;&#x4E86; <code>.sync</code> &#x4FEE;&#x9970;&#x8BED;&#x7528;&#x4E8E;&#x4FEE;&#x9970; <code>v-bind</code>&#xFF08;&#x5373; <code>:</code>&#xFF09;&#xFF0C;&#x4F7F;&#x4E4B;&#x6210;&#x4E3A;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x3002;&#x8FD9;&#x540C;&#x6837;&#x662F;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x6DFB;&#x52A0;&#x4E86; <code>.sync</code> &#x4FEE;&#x9970;&#x7684;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x4F1A;&#x50CF; <code>v-model</code> &#x4E00;&#x6837;&#x81EA;&#x52A8;&#x6CE8;&#x518C;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#x6765;&#x5BF9;&#x88AB;&#x7ED1;&#x5B9A;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#x3002;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x540C;&#x6837;&#x8981;&#x6C42;&#x5B50;&#x7EC4;&#x4EF6;&#x89E6;&#x53D1;&#x7279;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;&#x3002;&#x4E0D;&#x8FC7;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x7684;&#x540D;&#x79F0;&#x597D;&#x6B79;&#x548C;&#x7ED1;&#x5B9A;&#x5C5E;&#x6027;&#x540D;&#x6709;&#x70B9;&#x5173;&#x7CFB;&#xFF0C;&#x662F;&#x5728;&#x7ED1;&#x5B9A;&#x5C5E;&#x6027;&#x540D;&#x524D;&#x6DFB;&#x52A0; <code>update:</code> &#x524D;&#x7F00;&#x3002;</p><p>&#x6BD4;&#x5982; <code>&lt;sub :some.sync=&quot;any&quot; /&gt;</code> &#x5C06;&#x5B50;&#x7EC4;&#x4EF6;&#x7684; <code>some</code> &#x5C5E;&#x6027;&#x4E0E;&#x7236;&#x7EC4;&#x4EF6;&#x7684; <code>any</code> &#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x8D77;&#x6765;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x9700;&#x8981;&#x901A;&#x8FC7; <code>$emit(&quot;update:some&quot;, value)</code> &#x6765;&#x89E6;&#x53D1;&#x53D8;&#x66F4;&#x3002;</p><p>&#x4E0A;&#x9762;&#x7684;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528; <code>v-model</code> &#x7ED1;&#x5B9A;&#x59CB;&#x7EC8;&#x611F;&#x89C9;&#x6709;&#x70B9;&#x522B;&#x626D;&#xFF0C;&#x56E0;&#x4E3A; <code>v-model</code> &#x7684;&#x5B57;&#x9762;&#x610F;&#x4E49;&#x662F;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x6570;&#x503C;&#xFF0C;&#x800C;&#x8868;&#x793A;&#x662F;&#x5426;&#x672A;&#x5B8C;&#x6210;&#x7684; <code>done</code> &#x5176;&#x5B9E;&#x662F;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x503C;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x518D;&#x6B21;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#xFF0C;&#x4ECD;&#x7136;&#x4F7F;&#x7528; <code>done</code> &#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x540D;&#x79F0;&#xFF08;&#x800C;&#x4E0D;&#x662F; <code>value</code>&#xFF09;&#xFF0C;&#x901A;&#x8FC7; <code>.sync</code> &#x6765;&#x5B9E;&#x73B0;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&quot;todo&quot;, {
    // ...
    props: [&quot;text&quot;, &quot;done&quot;],   // &lt;-- &#x6062;&#x590D;&#x6210; done
    data() {
        return {
            isDone: this.done    // &lt;-- &#x6062;&#x590D;&#x6210; done
        };
    },
    methods: {
        toggle(e) {
            this.isDone = !this.isDone;
            this.$emit(&quot;update:done&quot;, this.isDone);  // &lt;-- &#x4E8B;&#x4EF6;&#x540D;&#x79F0;&#xFF1A;update:done
        }
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">&quot;todo&quot;</span>, {
    <span class="hljs-comment">// ...</span>
    props: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;done&quot;</span>],   <span class="hljs-comment">// &lt;-- &#x6062;&#x590D;&#x6210; done</span>
    data() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">isDone</span>: <span class="hljs-keyword">this</span>.done    <span class="hljs-comment">// &lt;-- &#x6062;&#x590D;&#x6210; done</span>
        };
    },
    <span class="hljs-attr">methods</span>: {
        toggle(e) {
            <span class="hljs-keyword">this</span>.isDone = !<span class="hljs-keyword">this</span>.isDone;
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&quot;update:done&quot;</span>, <span class="hljs-keyword">this</span>.isDone);  <span class="hljs-comment">// &lt;-- &#x4E8B;&#x4EF6;&#x540D;&#x79F0;&#xFF1A;update:done</span>
        }
    }
});</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- #app &#x4E2D;&#x5176;&#x5B83;&#x4EE3;&#x7801;&#x7565; --&gt;
&lt;!-- &#x6CE8;&#x610F; v-model &#x53D8;&#x6210;&#x4E86; :done.sync&#xFF0C;&#x522B;&#x5FD8;&#x4E86;&#x5192;&#x53F7;&#x54DF; --&gt;
&lt;todo :text=&quot;todo.text&quot; :done.sync=&quot;todo.done&quot;&gt;&lt;/todo&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue"><span class="hljs-comment">&lt;!-- #app &#x4E2D;&#x5176;&#x5B83;&#x4EE3;&#x7801;&#x7565; --&gt;</span>
<span class="hljs-comment">&lt;!-- &#x6CE8;&#x610F; v-model &#x53D8;&#x6210;&#x4E86; :done.sync&#xFF0C;&#x522B;&#x5FD8;&#x4E86;&#x5192;&#x53F7;&#x54DF; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">todo</span> <span class="hljs-attr">:text</span>=<span class="hljs-string">&quot;todo.text&quot;</span> <span class="hljs-attr">:done.sync</span>=<span class="hljs-string">&quot;todo.done&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">todo</span>&gt;</span></code></pre><blockquote><strong>Js Fiddle &#x6F14;&#x793A;</strong><p><a href="https://jsfiddle.net/0okxhc6f/3/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/0okxhc6f/3/</a><button class="btn btn-xs btn-default ml10 preview" data-url="0okxhc6f/3/" data-typeid="0">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p></blockquote><h2 id="articleHeader7">&#x63ED;&#x5BC6; Vue &#x53CC;&#x5411;&#x7ED1;&#x5B9A;</h2><p>&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x8BB2;&#x8FF0;&#xFF0C;&#x6211;&#x60F3;&#x5927;&#x5BB6;&#x5E94;&#x8BE5;&#x5DF2;&#x7ECF;&#x660E;&#x767D;&#x4E86; Vue &#x7684;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x666E;&#x901A;&#x5355;&#x5411;&#x7ED1;&#x5B9A;&#x548C;&#x4E8B;&#x4EF6;&#x7EC4;&#x5408;&#x6765;&#x5B8C;&#x6210;&#x7684;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x901A;&#x8FC7; <code>v-model</code> &#x548C; <code>.sync</code> &#x6CE8;&#x518C;&#x4E86;&#x9ED8;&#x8BA4;&#x7684;&#x5904;&#x7406;&#x51FD;&#x6570;&#x6765;&#x66F4;&#x65B0;&#x6570;&#x636E;&#x3002;Vue &#x6E90;&#x7801;&#x4E2D;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x6BB5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// @file: src/compiler/parser/index.js

if (modifiers.sync) {
    addHandler(
        el,
        `update:${camelize(name)}`,
        genAssignmentCode(value, `$event`)
    )
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// @file: src/compiler/parser/index.js</span>

<span class="hljs-keyword">if</span> (modifiers.sync) {
    addHandler(
        el,
        <span class="hljs-string">`update:<span class="hljs-subst">${camelize(name)}</span>`</span>,
        genAssignmentCode(value, <span class="hljs-string">`$event`</span>)
    )
}</code></pre><p>&#x4ECE;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x6765;&#xFF0C;<code>.sync</code> &#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7F16;&#x8BD1;&#x5668;&#x4F1A;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A; <code>update:${camelize(name)}</code> &#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#x6765;&#x5BF9;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#xFF08;<code>genAssignmentCode</code> &#x7684;&#x5B57;&#x9762;&#x610F;&#x601D;&#x662F;&#x751F;&#x6210;&#x8D4B;&#x503C;&#x7684;&#x4EE3;&#x7801;&#xFF09;&#x3002;</p><h2 id="articleHeader8">&#x5C55;&#x671B;</h2><p>&#x76EE;&#x524D; Vue &#x7684;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x8FD8;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x6765;&#x5B9E;&#x73B0;&#x6570;&#x636E;&#x56DE;&#x4F20;&#x3002;&#x8FD9;&#x548C;&#x5F88;&#x591A;&#x6240;&#x7684;&#x671F;&#x671B;&#x7684;&#x8D4B;&#x503C;&#x56DE;&#x4F20;&#x8FD8;&#x662F;&#x6709;&#x4E00;&#x5B9A;&#x7684;&#x5DEE;&#x8DDD;&#x3002;&#x9020;&#x6210;&#x8FD9;&#x4E00;&#x5DEE;&#x8DDD;&#x7684;&#x4E3B;&#x8981;&#x539F;&#x56E0;&#x6709;&#x4E24;&#x4E2A;</p><ol><li>&#x9700;&#x8981;&#x901A;&#x8FC7;&#x4E8B;&#x4EF6;&#x56DE;&#x4F20;&#x6570;&#x636E;</li><li>&#x5C5E;&#x6027;&#xFF08;prop&#xFF09;&#x4E0D;&#x53EF;&#x8D4B;&#x503C;</li></ol><p>&#x5728;&#x73B0;&#x5728;&#x7684; Vue &#x7248;&#x672C;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5B9A;&#x4E49;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x6765;&#x5B9E;&#x73B0;&#x7B80;&#x5316;&#xFF0C;&#x6BD4;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
    isDone: {
        get() {
            return this.done;
        },
        set(value) {
            this.$emit(&quot;update:done&quot;, value);
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>computed: {
    isDone: {
        <span class="hljs-keyword">get</span>() {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.done;
        },
        <span class="hljs-keyword">set</span>(value) {
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&quot;update:done&quot;</span>, value);
        }
    }
}</code></pre><p>&#x8BF4;&#x5B9E;&#x5728;&#x7684;&#xFF0C;&#x8981;&#x591A;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x610F;&#x4E49;&#x76F8;&#x540C;&#x540D;&#x79F0;&#x4E0D;&#x540C;&#x7684;&#x53D8;&#x91CF;&#x540D;&#x4E5F;&#x662F;&#x633A;&#x8D39;&#x8111;&#x7B4B;&#x7684;&#x3002;&#x5E0C;&#x671B; Vue &#x5728;&#x5C06;&#x6765;&#x7684;&#x7248;&#x672C;&#x4E2D;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E00;&#x5B9A;&#x7684;&#x6280;&#x672F;&#x624B;&#x6BB5;&#x51CF;&#x5316;&#x8FD9;&#x4E00;&#x8FC7;&#x7A0B;&#xFF0C;&#x6BD4;&#x5982;&#x4E3A;&#x5C5E;&#x6027;&#xFF08;Prop&#xFF09;&#x58F0;&#x660E;&#x6DFB;&#x52A0; <code>sync</code> &#x9009;&#x9879;&#xFF0C;&#x53EA;&#x8981;&#x58F0;&#x660E; <code>sync: true</code> &#x7684;&#x90FD;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8D4B;&#x503C;&#x5E76;&#x81EA;&#x52A8;&#x89E6;&#x53D1; <code>update:xxx</code> &#x4E8B;&#x4EF6;&#x3002;</p><p>&#x5F53;&#x7136;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x6846;&#x67B6;&#xFF0C;&#x5728;&#x89E3;&#x51B3;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD8;&#x8981;&#x8003;&#x8651;&#x5BF9;&#x5176;&#x5B83;&#x7279;&#x6027;&#x7684;&#x5F71;&#x54CD;&#xFF0C;&#x4EE5;&#x53CA;&#x6846;&#x67B6;&#x7684;&#x6269;&#x5C55;&#x6027;&#x7B49;&#x95EE;&#x9898;&#xFF0C;&#x6240;&#x4EE5;&#x6700;&#x7EC8;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x4F1A;&#x6F14;&#x8FDB;&#x6210;&#x4EC0;&#x4E48;&#x6837;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9; Vue 3.0 &#x62ED;&#x76EE;&#x4EE5;&#x5F85;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
揭密 Vue 的双向绑定

## 原文链接
[https://segmentfault.com/a/1190000016593014](https://segmentfault.com/a/1190000016593014)

