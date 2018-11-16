---
title: 深入了解Vue.js组件笔记
hidden: true
categories: [reprint]
slug: d1cb9bff
date: 2018-11-10 02:30:10
---

{{< raw >}}
<p><strong>1&#x3001;&#x7EC4;&#x4EF6;&#x6CE8;&#x518C;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;name&apos;,{}) &#x521B;&#x5EFA;&#x7684;&#x7EC4;&#x4EF6;&#x90FD;&#x662F;&#x5168;&#x5C40;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B83;&#x4EEC;&#x5728;&#x6CE8;&#x518C;&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x7528;&#x5728;&#x4EFB;&#x4F55;&#x65B0;&#x521B;&#x5EFA;&#x7684;Vue&#x6839;&#x5B9E;&#x4F8B;(new Vue)&#x7684;&#x6A21;&#x677F;&#x4E2D;&#x3002;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x7EC4;&#x4EF6;&#x7684;&#x540D;&#x5B57;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x5176;&#x4E2D;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684;data&#x6570;&#x636E;&#x3001;template&#x6A21;&#x677F;&#x3001;props&#x4F20;&#x503C;&#x3001;components&#x7EC4;&#x4EF6;&#x6CE8;&#x518C;&#x3001;computed&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x3001;method&#x65B9;&#x6CD5;&#x3001;watch&#x76D1;&#x542C;&#x6570;&#x636E;&#x53D8;&#x5316;&#x3001;&#x4EE5;&#x53CA;&#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x6784;&#x5B50;&#x51FD;&#x6570;&#xFF1A;beforeCreate&#x3001;created&#x3001;beforeMount&#x3001;mounted&#x3001;beforeupdate&#x3001;updated&#x3001;beforeDestroy&#x3001;destroyed&#x3002;
&#x63A8;&#x8350;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; components &#x76EE;&#x5F55;&#xFF0C;&#x5E76;&#x5C06;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x653E;&#x7F6E;&#x5728;&#x5176;&#x5404;&#x81EA;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#xFF1A;
import ComponentA from &apos;./ComponentA&apos;
import ComponentC from &apos;./ComponentC&apos;
export default {
  components: {
    ComponentA,
    ComponentC
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs oxygene"><code>Vue.component(<span class="hljs-string">&apos;name&apos;</span>,<span class="hljs-comment">{}</span>) &#x521B;&#x5EFA;&#x7684;&#x7EC4;&#x4EF6;&#x90FD;&#x662F;&#x5168;&#x5C40;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B83;&#x4EEC;&#x5728;&#x6CE8;&#x518C;&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x7528;&#x5728;&#x4EFB;&#x4F55;&#x65B0;&#x521B;&#x5EFA;&#x7684;Vue&#x6839;&#x5B9E;&#x4F8B;(<span class="hljs-keyword">new</span> Vue)&#x7684;&#x6A21;&#x677F;&#x4E2D;&#x3002;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x7EC4;&#x4EF6;&#x7684;&#x540D;&#x5B57;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x5176;&#x4E2D;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684;data&#x6570;&#x636E;&#x3001;template&#x6A21;&#x677F;&#x3001;props&#x4F20;&#x503C;&#x3001;components&#x7EC4;&#x4EF6;&#x6CE8;&#x518C;&#x3001;computed&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x3001;<span class="hljs-function"><span class="hljs-keyword">method</span>&#x65B9;&#x6CD5;&#x3001;<span class="hljs-title">watch</span>&#x76D1;&#x542C;&#x6570;&#x636E;&#x53D8;&#x5316;&#x3001;&#x4EE5;&#x53CA;&#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x6784;&#x5B50;&#x51FD;&#x6570;&#xFF1A;<span class="hljs-title">beforeCreate</span>&#x3001;<span class="hljs-title">created</span>&#x3001;<span class="hljs-title">beforeMount</span>&#x3001;<span class="hljs-title">mounted</span>&#x3001;<span class="hljs-title">beforeupdate</span>&#x3001;<span class="hljs-title">updated</span>&#x3001;<span class="hljs-title">beforeDestroy</span>&#x3001;<span class="hljs-title">destroyed</span>&#x3002;
&#x63A8;&#x8350;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; <span class="hljs-title">components</span> &#x76EE;&#x5F55;&#xFF0C;&#x5E76;&#x5C06;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x653E;&#x7F6E;&#x5728;&#x5176;&#x5404;&#x81EA;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#xFF1A;
<span class="hljs-title">import</span> <span class="hljs-title">ComponentA</span> <span class="hljs-title">from</span> &apos;./<span class="hljs-title">ComponentA</span>&apos;
<span class="hljs-title">import</span> <span class="hljs-title">ComponentC</span> <span class="hljs-title">from</span> &apos;./<span class="hljs-title">ComponentC</span>&apos;
<span class="hljs-title">export</span> <span class="hljs-title">default</span> <span class="hljs-comment">{
  components: {
    ComponentA,
    ComponentC
  }</span>
}</span></code></pre><p><strong>2&#x3001;Prop</strong></p><ul><li><p>&#x7531;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x628A;&#x6240;&#x6709;&#x5927;&#x5199;&#x5B57;&#x7B26;&#x89E3;&#x91CA;&#x4E3A;&#x5C0F;&#x5199;&#x5B57;&#x7B26;&#x3002;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x5F53;&#x4F60;&#x4F7F;&#x7528; DOM &#x4E2D;&#x7684;&#x6A21;&#x677F;&#x65F6;&#xFF0C;camelCase (&#x9A7C;&#x5CF0;&#x547D;&#x540D;&#x6CD5;) &#x7684; prop&#x540D;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x5176;&#x7B49;&#x4EF7;&#x7684; kebab-case (&#x77ED;&#x6A2A;&#x7EBF;&#x5206;&#x9694;&#x547D;&#x540D;) &#x547D;&#x540D;&#x3002;prop&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x4F55;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#x3001;&#x53D8;&#x91CF;&#x6216;&#x5BF9;&#x8C61;&#xFF0C;&#x5F53;prop&#x662F;&#x5BF9;&#x8C61;&#x65F6;&#xFF0C;&#x5373;&#x4F7F;&#x5BF9;&#x8C61;&#x662F;&#x9759;&#x6001;&#x7684;&#x4E5F;&#x5FC5;&#x987B;&#x4F7F;&#x7528;v-bind&#x3002;&#x4E0D;&#x8981;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x6539;&#x53D8;prop&#x7684;&#x6570;&#x636E;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x81EA;&#x8EAB;&#x7684;data&#x91CC;&#x4FDD;&#x5B58;&#x4E00;&#x4EFD;&#x8BE5;prop&#x5C5E;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   Vue.component(&apos;user&apos;, {
     props: [&apos;sayHello&apos;]
   })
   &lt;user say-Hello=&quot;hello!&quot;&gt;&lt;/user&gt;
&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F20;&#x9012;&#x9759;&#x6001;Prop&#xFF08;&#x5982;&#x4E0A;&#xFF09;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;v-bind&#x4F20;&#x9012;&#x52A8;&#x6001;Prop&#xFF08;&#x5982;&#x4E0B;&#xFF09;
&lt;user :title=&quot;post.title&quot;&gt;&lt;/user&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>   Vue.component(<span class="hljs-string">&apos;user&apos;</span>, {
     <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;sayHello&apos;</span>]
   })
   &lt;user say-Hello=<span class="hljs-string">&quot;hello!&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">user</span>&gt;</span></span>
&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F20;&#x9012;&#x9759;&#x6001;Prop&#xFF08;&#x5982;&#x4E0A;&#xFF09;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;v-bind&#x4F20;&#x9012;&#x52A8;&#x6001;Prop&#xFF08;&#x5982;&#x4E0B;&#xFF09;
&lt;user :title=<span class="hljs-string">&quot;post.title&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">user</span>&gt;</span></span>
</code></pre></li><li><p>prop&#x9A8C;&#x8BC1;&#xFF08;&#x63A7;&#x5236;&#x4F20;&#x5165;&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x7684;&#x7C7B;&#x578B;&#xFF09;<br>Vue.component(&apos;mycomponent&apos;,{</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   props:{
       propZ&#xFF1A;null,    //&#x5339;&#x914D;&#x4EFB;&#x4F55;&#x7C7B;&#x578B;
       propA:Number,    //&#x6570;&#x5B57;&#x7C7B;&#x578B;
       propB&#xFF1A;[Number,String],    //&#x591A;&#x4E2A;&#x53EF;&#x80FD;&#x7684;&#x7C7B;&#x578B;
       propC&#xFF1A;{
           type:String,
           required:true,    //&#x5FC5;&#x586B;
           default:&apos;Hello&apos;    //&#x9ED8;&#x8BA4;
       },
       propD:{
           type:Object,    //&#x5BF9;&#x8C61;&#x7C7B;&#x578B;
           default:function(){    //&#x9ED8;&#x8BA4;&#x51FD;&#x6570;
               return {
                   msg:&apos;hello&apos;
               }
           }
       },
       propE:{
           //&#x81EA;&#x5B9A;&#x4E49;&#x9A8C;&#x8BC1;
           validator: function (value) {
               // &#x8FD9;&#x4E2A;&#x503C;&#x5FC5;&#x987B;&#x5339;&#x914D;&#x4E0B;&#x5217;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;
               return [&apos;success&apos;, &apos;warning&apos;, &apos;danger&apos;].indexOf(value) !== -1
           }
       },
       user:Person
   }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>   props:{
       propZ&#xFF1A;<span class="hljs-literal">null</span>,    <span class="hljs-comment">//&#x5339;&#x914D;&#x4EFB;&#x4F55;&#x7C7B;&#x578B;</span>
       propA:<span class="hljs-built_in">Number</span>,    <span class="hljs-comment">//&#x6570;&#x5B57;&#x7C7B;&#x578B;</span>
       propB&#xFF1A;[<span class="hljs-built_in">Number</span>,<span class="hljs-built_in">String</span>],    <span class="hljs-comment">//&#x591A;&#x4E2A;&#x53EF;&#x80FD;&#x7684;&#x7C7B;&#x578B;</span>
       propC&#xFF1A;{
           <span class="hljs-attr">type</span>:<span class="hljs-built_in">String</span>,
           <span class="hljs-attr">required</span>:<span class="hljs-literal">true</span>,    <span class="hljs-comment">//&#x5FC5;&#x586B;</span>
           <span class="hljs-keyword">default</span>:<span class="hljs-string">&apos;Hello&apos;</span>    <span class="hljs-comment">//&#x9ED8;&#x8BA4;</span>
       },
       <span class="hljs-attr">propD</span>:{
           <span class="hljs-attr">type</span>:<span class="hljs-built_in">Object</span>,    <span class="hljs-comment">//&#x5BF9;&#x8C61;&#x7C7B;&#x578B;</span>
           <span class="hljs-keyword">default</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{    <span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x51FD;&#x6570;</span>
               <span class="hljs-keyword">return</span> {
                   <span class="hljs-attr">msg</span>:<span class="hljs-string">&apos;hello&apos;</span>
               }
           }
       },
       <span class="hljs-attr">propE</span>:{
           <span class="hljs-comment">//&#x81EA;&#x5B9A;&#x4E49;&#x9A8C;&#x8BC1;</span>
           validator: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
               <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x503C;&#x5FC5;&#x987B;&#x5339;&#x914D;&#x4E0B;&#x5217;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;</span>
               <span class="hljs-keyword">return</span> [<span class="hljs-string">&apos;success&apos;</span>, <span class="hljs-string">&apos;warning&apos;</span>, <span class="hljs-string">&apos;danger&apos;</span>].indexOf(value) !== <span class="hljs-number">-1</span>
           }
       },
       <span class="hljs-attr">user</span>:Person
   }</code></pre><p>})</p></li></ul><p><strong>3&#x3001;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1&#x3001;&#x4E8B;&#x4EF6;&#x540D;&#x5EFA;&#x8BAE;&#x59CB;&#x7EC8;&#x4F7F;&#x7528;&#x77ED;&#x6A2A;&#x7EBF;&#x8FDE;&#x63A5;&#x7684;&#x65B9;&#x5F0F;&#x5982;&#xFF1A;my-event
2&#x3001;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684; v-model&#xFF1A;
    Vue.component(&apos;base-checkbox&apos;, {
      model: {
        prop: &apos;checked&apos;,
        event: &apos;change&apos;
      },
      props: {
        checked: Boolean
      },
      template: `
        &lt;input
          type=&quot;checkbox&quot;
          v-bind:checked=&quot;checked&quot;
          v-on:change=&quot;$emit(&apos;change&apos;, $event.target.checked)&quot;
        &gt;
      `
    })
    &lt;base-checkbox v-model=&quot;lovingVue&quot;&gt;&lt;/base-checkbox&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code><span class="hljs-number">1</span>&#x3001;&#x4E8B;&#x4EF6;&#x540D;&#x5EFA;&#x8BAE;&#x59CB;&#x7EC8;&#x4F7F;&#x7528;&#x77ED;&#x6A2A;&#x7EBF;&#x8FDE;&#x63A5;&#x7684;&#x65B9;&#x5F0F;&#x5982;&#xFF1A;my-event
<span class="hljs-number">2</span>&#x3001;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684; v-model&#xFF1A;
    Vue.component(<span class="hljs-string">&apos;base-checkbox&apos;</span>, {
      <span class="hljs-keyword">mode</span><span class="hljs-variable">l:</span> {
        prop: <span class="hljs-string">&apos;checked&apos;</span>,
        even<span class="hljs-variable">t:</span> <span class="hljs-string">&apos;change&apos;</span>
      },
      prop<span class="hljs-variable">s:</span> {
        checked: Boolean
      },
      template: `
        &lt;<span class="hljs-built_in">input</span>
          <span class="hljs-built_in">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
          v-bind:checked=<span class="hljs-string">&quot;checked&quot;</span>
          v-<span class="hljs-keyword">on</span>:<span class="hljs-keyword">change</span>=<span class="hljs-string">&quot;$emit(&apos;change&apos;, $event.target.checked)&quot;</span>
        &gt;
      `
    })
    &lt;base-checkbox v-model=<span class="hljs-string">&quot;lovingVue&quot;</span>&gt;&lt;/base-checkbox&gt;</code></pre><p><strong>4&#x3001;&#x63D2;&#x69FD;&lt;slot&gt;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1&#x3001;&#x7EC4;&#x4EF6;&#xFF1A;&lt;base-layout&gt;&#xFF1A;
    &lt;div class=&quot;container&quot;&gt;
        &lt;header&gt;
            &lt;slot name=&quot;header&quot;&gt;&lt;/slot&gt;
        &lt;/header&gt;
        &lt;main&gt;
            &lt;slot&gt;&lt;/slot&gt;
        &lt;/main&gt;
        &lt;footer&gt;
            &lt;slot name=&apos;footer&apos;&gt;&lt;/slot&gt;
        &lt;/footer&gt;
        &lt;slot name=&quot;footer&quot;&gt;&lt;/slot&gt;
    &lt;/div&gt;
    
    &lt;base-layout&gt;
        &lt;template slot=&apos;header&apos;&gt;
            &lt;h3&gt;&#x6211;&#x662F;Header&lt;/h3&gt;
        &lt;/template&gt;
        &lt;p&gt;&#x6211;&#x6CA1;&#x6709;&#x540D;&#x5B57;&lt;/p&gt;
        &lt;p&gt;&#x663E;&#x793A;&#x5728;&#x9ED8;&#x8BA4;&#x63D2;&#x69FD;&lt;/p&gt;
        &lt;h3 slot=&apos;footer&apos;&gt;&#x5177;&#x540D;&#x63D2;&#x69FD;2&lt;/h3&gt;
    &lt;/base-layout&gt;
    &#x7ED3;&#x679C;&#xFF1A;
    &lt;div class=&quot;container&quot;&gt;
        &lt;header&gt;
            &lt;h3&gt;&#x6211;&#x662F;Header&lt;/h3&gt;
        &lt;/header&gt;
        &lt;main&gt;
            &lt;p&gt;&#x6211;&#x6CA1;&#x6709;&#x540D;&#x5B57;&lt;/p&gt;
            &lt;p&gt;&#x663E;&#x793A;&#x5728;&#x9ED8;&#x8BA4;&#x63D2;&#x69FD;&lt;/p&gt;
        &lt;/main&gt;
        &lt;footer&gt;
            &lt;h3&gt;&#x5177;&#x540D;&#x63D2;&#x69FD;2&lt;/h3&gt;
        &lt;/footer&gt;
    &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>1&#x3001;&#x7EC4;&#x4EF6;&#xFF1A;<span class="hljs-tag">&lt;<span class="hljs-name">base-layout</span>&gt;</span>&#xFF1A;
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;header&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&apos;footer&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">base-layout</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&apos;header&apos;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>&#x6211;&#x662F;Header<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x6211;&#x6CA1;&#x6709;&#x540D;&#x5B57;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x663E;&#x793A;&#x5728;&#x9ED8;&#x8BA4;&#x63D2;&#x69FD;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&apos;footer&apos;</span>&gt;</span>&#x5177;&#x540D;&#x63D2;&#x69FD;2<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">base-layout</span>&gt;</span>
    &#x7ED3;&#x679C;&#xFF1A;
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>&#x6211;&#x662F;Header<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x6211;&#x6CA1;&#x6709;&#x540D;&#x5B57;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x663E;&#x793A;&#x5728;&#x9ED8;&#x8BA4;&#x63D2;&#x69FD;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>&#x5177;&#x540D;&#x63D2;&#x69FD;2<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p><strong>5&#x3001;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#x4E0E;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- &#x5931;&#x6D3B;&#x7684;&#x7EC4;&#x4EF6;&#x5C06;&#x4F1A;&#x88AB;&#x7F13;&#x5B58;&#xFF01;--&gt;
&lt;keep-alive&gt;    //&lt;keep-alive&gt;&#x7F13;&#x5B58;&#x7EC4;&#x4EF6;&#x5207;&#x6362;&#x72B6;&#x6001;&#xFF0C;&#x7EC4;&#x4EF6;&#x5FC5;&#x987B;&#x6709;&#x540D;&#x5B57;
  &lt;component v-bind:is=&quot;currentTabComponent&quot;&gt;&lt;/component&gt;    //is &#x7279;&#x6027;&#x6765;&#x5207;&#x6362;&#x4E0D;&#x540C;&#x7684;&#x7EC4;&#x4EF6;
&lt;/keep-alive&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- &#x5931;&#x6D3B;&#x7684;&#x7EC4;&#x4EF6;&#x5C06;&#x4F1A;&#x88AB;&#x7F13;&#x5B58;&#xFF01;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>    //<span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>&#x7F13;&#x5B58;&#x7EC4;&#x4EF6;&#x5207;&#x6362;&#x72B6;&#x6001;&#xFF0C;&#x7EC4;&#x4EF6;&#x5FC5;&#x987B;&#x6709;&#x540D;&#x5B57;
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">v-bind:is</span>=<span class="hljs-string">&quot;currentTabComponent&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>    //is &#x7279;&#x6027;&#x6765;&#x5207;&#x6362;&#x4E0D;&#x540C;&#x7684;&#x7EC4;&#x4EF6;
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入了解Vue.js组件笔记

## 原文链接
[https://segmentfault.com/a/1190000016354966](https://segmentfault.com/a/1190000016354966)

