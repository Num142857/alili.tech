---
title: '简单说说vue的父子组件，父子组件传值和vuex' 
date: 2018-11-24 2:30:10
hidden: true
slug: v6y9e3x2yl
categories: [reprint]
---

{{< raw >}}
<p><strong>&#x4E00;&#x3001;vue&#x7684;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x662F;&#x5982;&#x4F55;&#x4F20;&#x503C;&#x7684;&#xFF1F;</strong><br>&#x9996;&#x5148;&#x5462;&#xFF0C;&#x9700;&#x8981;&#x8BF4;&#x8BF4;&#x7684;&#x662F;&#xFF0C;vue&#x65E2;&#x7136;&#x6709;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#xFF0C;&#x90A3;&#x4E3A;&#x4F55;&#x4F1A;&#x6709;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x4F20;&#x503C;&#x95EE;&#x9898;&#xFF1F;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x4E5F;&#x7B80;&#x5355;&#xFF0C;vue&#x7684;&#x7EC4;&#x4EF6;&#x4F1A;&#x4F9B;&#x5176;&#x4ED6;&#x7684;vue&#x9875;&#x9762;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#xFF0C;&#x5982;&#x679C;&#x6570;&#x7EC4;&#x90FD;&#x662F;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x8BDD;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x5BB9;&#x6613;&#x6DF7;&#x4E71;&#x4E86;&#xFF0C;&#x6BD4;&#x5982;a,b&#x9875;&#x9762;&#x7ED1;&#x4E86;&#x4E00;&#x4E2A;num=10&#xFF0C;&#x90A3;b&#xFF0C;c&#x9875;&#x9762;&#x53C8;&#x7ED1;&#x4E86;num=5,&#x90A3;vue&#x5B9E;&#x4F8B;&#x7684;num&#x5230;&#x5E95;&#x542C;&#x8C01;&#x7684;&#xFF1F;&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;vue&#x5B98;&#x7F51;&#x4E3A;&#x4EC0;&#x4E48;&#x8BF4;<br><strong>&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x53EA;&#x80FD;&#x662F;&#x5355;&#x9879;&#x6D41;&#x901A;&#x7684;&#xFF0C;&#x800C;&#x4E14;&#x7531;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;</strong><br>&#x597D;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#x4E86;&#xFF0C;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x662F;&#x5982;&#x4F55;&#x4F20;&#x503C;&#x7684;&#xFF0C;&#x800C;&#x4E14;&#x8C01;&#x662F;&#x7236;&#x8C01;&#x662F;&#x5B50;&#x5462;&#xFF1F;<br>&#x4F8B;&#x5B50;1&#xFF1A;&#x5148;&#x5199;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x653E;&#x5728;component&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x53EB;son.vue&#x597D;&#x4E86;&#xFF08;&#x6709;&#x70B9;&#x5267;&#x900F;&#x7684;&#x547D;&#x540D;...&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    &lt;button class=&quot;test-btn&quot; @click=&quot;add&quot;&gt;+&lt;/button&gt;
    &lt;button class=&quot;test-btn&quot; @click=&quot;minu&quot;&gt;-&lt;/button&gt;
    &lt;p class=&quot;text-link&quot;&gt;&#x8FD9;&#x91CC;&#x662F;son&#x7684;num&#xFF1A;"{{"num"}}"&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  //props:[&quot;num&quot;],//&#x63A5;&#x6536;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;&#x503C;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x5148;&#x5199;&#x4E0A;
  data () {
    return {
        num:0
    }
  },
   methods:{
       add(){//es6&#x7684;&#x8BED;&#x6CD5;&#x76F8;&#x5F53;&#x4E8E;add:function(){}
           this.num++;
       },
       minu(){
           this.num--;
       }
   }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;test-btn&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;add&quot;</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;test-btn&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;minu&quot;</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-link&quot;</span>&gt;</span>&#x8FD9;&#x91CC;&#x662F;son&#x7684;num&#xFF1A;</span><span class="hljs-template-variable">"{{"num"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">//props:[&quot;num&quot;],//&#x63A5;&#x6536;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;&#x503C;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x5148;&#x5199;&#x4E0A;</span>
  data () {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">num</span>:<span class="hljs-number">0</span>
    }
  },
   <span class="hljs-attr">methods</span>:{
       add(){<span class="hljs-comment">//es6&#x7684;&#x8BED;&#x6CD5;&#x76F8;&#x5F53;&#x4E8E;add:function(){}</span>
           <span class="hljs-keyword">this</span>.num++;
       },
       minu(){
           <span class="hljs-keyword">this</span>.num--;
       }
   }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x8FD9;&#x4E2A;son.vue&#x7684;&#x7EC4;&#x4EF6;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x90FD;&#x770B;&#x5F97;&#x61C2;&#xFF0C;&#x52A0;&#x51CF;num&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x5199;&#x4E00;&#x4E2A;index.vue&#x8C03;&#x7528;son.vue</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;son v-bind:num=&quot;num&quot;&gt;&lt;/son&gt;//&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x503C;&#x7ED9;son.vue&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x628A;son.vue&#x7684;props&#x90A3;&#x4E2A;&#x6CE8;&#x91CA;&#x6CE8;&#x9500;&#x6389;&#x4E86;
    &lt;p class=&quot;text-link&quot;&gt;&#x8FD9;&#x91CC;&#x662F;index&#x7684;num&#xFF1A;"{{"num"}}"&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
import son from &apos;./../components/son&apos; 
export default {
  data () {
    return {
      num:10
    }
  },
  components:{
       son
     }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml">//index.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">son</span> <span class="hljs-attr">v-bind:num</span>=<span class="hljs-string">&quot;num&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">son</span>&gt;</span>//&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x503C;&#x7ED9;son.vue&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x628A;son.vue&#x7684;props&#x90A3;&#x4E2A;&#x6CE8;&#x91CA;&#x6CE8;&#x9500;&#x6389;&#x4E86;
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-link&quot;</span>&gt;</span>&#x8FD9;&#x91CC;&#x662F;index&#x7684;num&#xFF1A;</span><span class="hljs-template-variable">"{{"num}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> son <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./../components/son&apos;</span> 
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  data () {
    return {
      num:10
    }</span><span class="xml"><span class="undefined">
  },
  components:</span></span><span class="hljs-template-variable">{
       son
     }</span><span class="xml"><span class="undefined">
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x8FD9;&#x65F6;&#x5019;&#x4E24;&#x4E2A;num&#x90FD;&#x662F;10&#x3002;&#x518D;&#x6B21;&#x70B9;&#x51FB;&#x52A0;&#x51CF;&#x6309;&#x94AE;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x2018;son&#x7684;num&#x2019;&#x4E00;&#x76F4;&#x6709;&#x53D8;&#x5316;&#xFF0C;&#x800C;&#x2018;index&#x7684;num&#x2019;&#x4E00;&#x76F4;&#x662F;10&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x6570;&#x636E;&#x7684;&#x5355;&#x9879;&#x6D41;&#x901A;&#x3002;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5982;&#x4F55;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x7136;&#x540E;&#x6539;&#x53D8;&#x2018;index&#x7684;num&#x2019;&#x5462;&#xFF1F;&#x8FD9;&#x65F6;&#x5019;&#xFF0C;&#x9700;&#x8981;$emit&#x5E72;&#x6D3B;&#x4E86;&#x3002;</p><p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;index.vue&#x91CC;&#x6539;&#x52A8;&#x4E00;&#x4E0B;&#x4EE3;&#x7801;<br>&#x9996;&#x5148;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;son v-bind:num=&quot;num&quot; v-on:add=&quot;icr&quot; v-on:minu=&quot;der&quot;&gt;&lt;/son&gt;//v-on:add=&quot;icr&quot;&#x5C31;&#x662F;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>&lt;son v-bind:num=<span class="hljs-string">&quot;num&quot;</span> v-<span class="hljs-keyword">on</span>:<span class="hljs-built_in">add</span>=<span class="hljs-string">&quot;icr&quot;</span> v-<span class="hljs-keyword">on</span>:minu=<span class="hljs-string">&quot;der&quot;</span>&gt;&lt;/son&gt;//v-<span class="hljs-keyword">on</span>:<span class="hljs-built_in">add</span>=<span class="hljs-string">&quot;icr&quot;</span>&#x5C31;&#x662F;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;
</code></pre><p>&#x518D;&#x589E;&#x52A0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods:{
   icr(){
       this.num++;
   },
   der(){
       this.num--;
   }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code>methods:{
   icr(){
       <span class="hljs-keyword">this</span>.<span class="hljs-built_in">num</span>++;
   },
   der(){
       <span class="hljs-keyword">this</span>.<span class="hljs-built_in">num</span>--;
   }
}
</code></pre><p>&#x7136;&#x540E;&#x5728;son.vue&#x4E2D;methods&#x53D8;&#x6210;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods:{
   add(){
       this.$emit(&quot;add&quot;);//$emit(&quot;add&quot;)&#x5C31;&#x662F;&#x89E6;&#x53D1;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;add&#x65B9;&#x6CD5;
   },
   minu(){
       this.$emit(&quot;minu&quot;);
   }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>methods:{
   <span class="hljs-keyword">add</span><span class="bash">(){
</span>       this.$emit(<span class="hljs-string">&quot;add&quot;</span>);//$emit(<span class="hljs-string">&quot;add&quot;</span>)&#x5C31;&#x662F;&#x89E6;&#x53D1;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;<span class="hljs-keyword">add</span><span class="bash">&#x65B9;&#x6CD5;
</span>   },
   minu(){
       this.$emit(<span class="hljs-string">&quot;minu&quot;</span>);
   }
}</code></pre><p>&#x6240;&#x4EE5;&#xFF0C;<strong>$emit(&quot;xxx&quot;)&#x89E6;&#x53D1;&#x4E86;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6539;&#x53D8;&#x4E86;&#x7236;&#x7EC4;&#x4EF6;&#x7684;data&#x7684;num&#x503C;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x518D;&#x901A;&#x8FC7;props&#x4F20;&#x503C;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x6570;&#x636E;&#x4F20;&#x9012;&#xFF0C;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</strong>&#x3002;<br>&#x8FD9;&#x662F;son.vue&#x548C;index.vue&#x7684;&#x5B8C;&#x6574;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//son.vue
&lt;template&gt;
&lt;div&gt;
    &lt;button class=&quot;test-btn&quot; @click=&quot;add&quot;&gt;+&lt;/button&gt;
    &lt;button class=&quot;test-btn&quot; @click=&quot;minu&quot;&gt;-&lt;/button&gt;
    &lt;p class=&quot;text-link&quot;&gt;&#x8FD9;&#x91CC;&#x662F;"{{"num"}}"&lt;/p&gt;
&lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  props:[&quot;num&quot;],
  data () {
    return {
        num:10
    }
  },
   methods:{
       add(){
           this.$emit(&quot;add&quot;);
       },
       minu(){
           this.$emit(&quot;minu&quot;);
       }
   }
}
&lt;/script&gt;

//index.vue
&lt;template&gt;
 &lt;div&gt;
    &lt;son v-bind:num=&quot;num&quot; v-on:add=&quot;icr&quot; v-on:minu=&quot;der&quot;&gt;&lt;/son&gt;
    &lt;p class=&quot;text-link&quot;&gt;&#x7236;"{{"num"}}"&lt;/p&gt;
&lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
import son from &apos;./../components/son&apos;
export default {
  data () {
    return {
      num:10
    }
  },
  components:{
       son
   },
   methods:{
       icr(){
           this.num++;
       },
       der(){
           this.num--;
       }
   }
}
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml">//son.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;test-btn&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;add&quot;</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;test-btn&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;minu&quot;</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-link&quot;</span>&gt;</span>&#x8FD9;&#x91CC;&#x662F;</span><span class="hljs-template-variable">"{{"num"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>:[<span class="hljs-string">&quot;num&quot;</span>],
  data () {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">num</span>:<span class="hljs-number">10</span>
    }
  },
   <span class="hljs-attr">methods</span>:{
       add(){
           <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&quot;add&quot;</span>);
       },
       minu(){
           <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&quot;minu&quot;</span>);
       }
   }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

//index.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">son</span> <span class="hljs-attr">v-bind:num</span>=<span class="hljs-string">&quot;num&quot;</span> <span class="hljs-attr">v-on:add</span>=<span class="hljs-string">&quot;icr&quot;</span> <span class="hljs-attr">v-on:minu</span>=<span class="hljs-string">&quot;der&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">son</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-link&quot;</span>&gt;</span>&#x7236;</span><span class="hljs-template-variable">"{{"num"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> son <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./../components/son&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">num</span>:<span class="hljs-number">10</span>
    }
  },
  <span class="hljs-attr">components</span>:{
       son
   },
   <span class="hljs-attr">methods</span>:{
       icr(){
           <span class="hljs-keyword">this</span>.num++;
       },
       der(){
           <span class="hljs-keyword">this</span>.num--;
       }
   }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre><p><strong>&#x4E8C;&#x3001;&#x8BF4;&#x8BF4;vuex&#x4EE5;&#x53CA;&#x4ED6;&#x7684;state&#x3001;actions&#x3001;getters&#x3001;mutations&#x3001;modules&#x3001;store</strong><br>&#x9996;&#x5148;&#xFF0C;vuex&#x5B98;&#x7F51;&#x4E0A;&#x8BF4;&#x662F;&#x4E00;&#x4E2A;vue&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#x3002;&#x53EF;&#x80FD;&#x72B6;&#x6001;&#x6BD4;&#x8F83;&#x96BE;&#x7406;&#x89E3;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x5730;&#x628A;&#x72B6;&#x6001;&#x7406;&#x89E3;&#x6210;&#x4E3A;vue&#x7684;data&#x91CC;&#x9762;&#x7684;&#x53D8;&#x91CF;&#x3002;&#x5F53;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;data&#x53D8;&#x91CF;&#x5173;&#x7CFB;&#x590D;&#x6742;&#x4E00;&#x70B9;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x628A;&#x5176;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x62BD;&#x79BB;&#x51FA;&#x6765;&#x7BA1;&#x7406;&#x3002;&#x521A;&#x597D;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x4E0A;&#x9762;&#xFF0C;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;num&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#x662F;&#x4E0D;&#x662F;&#x6BD4;&#x8F83;&#x9EBB;&#x70E6;&#xFF0C;&#x6539;&#x53D8;&#x6570;&#x636E;&#x8FD8;&#x8981;&#x7528;$emit&#x3002;&#x5982;&#x679C;&#x6709;&#x4E00;&#x4E2A;&#x5730;&#x65B9;&#x8DDF;&#x4ED3;&#x5E93;&#x4E00;&#x6837;&#x5C31;&#x5B58;&#x653E;&#x7740;num&#x7684;&#x503C;&#xFF0C;&#x8C01;&#x8981;&#x7528;&#x8C01;&#x53BB;&#x8BF7;&#x6C42;num&#x7684;&#x503C;&#xFF0C;&#x8C01;&#x60F3;&#x6539;&#x5C31;&#x6539;&#x8BE5;&#x591A;&#x597D;&#x662F;&#x5427;&#xFF0C;vuex&#x5C31;&#x662F;&#x5E72;&#x8FD9;&#x4E2A;&#x7684;&#xFF0C;&#x6709;&#x70B9;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x7684;&#x610F;&#x601D;&#x3002;&#x4EFB;&#x4F55;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x62FF;&#xFF0C;&#x6539;&#x4E1C;&#x897F;&#xFF0C;&#x90FD;&#x53EF;&#x4EE5;&#x627E;&#x4ED6;&#x3002;</p><p>1&#x3001;&#x9996;&#x5148;state&#x662F;&#x60DF;&#x4E00;&#x7684;&#x6570;&#x636E;&#x8F7D;&#x4F53;&#xFF0C;&#x8DDF;&#x4ED3;&#x5E93;&#x4E00;&#x6837;&#x3002;<br>2&#x3001;&#x800C;mutations&#x662F;&#x552F;&#x4E00;&#x53EF;&#x4EE5;&#x6539;&#x53D8;state&#x7684;&#x503C;&#x7684;&#x4E1C;&#x4E1C;&#xFF0C;&#x4F7F;&#x7528;commit&#x7B49;&#x3002;<br>&#x8FD9;&#x4E24;&#x4E2A;&#x662F;vuex&#x6700;&#x6700;&#x57FA;&#x7840;&#x7F3A;&#x4E00;&#x4E0D;&#x53EF;&#x7684;&#x3002;&#x7B80;&#x5355;&#x7684;vuex&#x7BA1;&#x7406;&#x5C31;&#x4F7F;&#x7528;&#x8FD9;&#x4E24;&#x4E2A;&#x5C31;&#x884C;&#xFF0C;&#x5982;&#x4F55;&#x4F7F;&#x7528;vuex&#xFF1F;&#x770B;&#x8FD9;&#x91CC;<a href="https://segmentfault.com/a/1190000015392842?_ea=3918042">https://segmentfault.com/a/11...</a><br>3&#x3001;getters&#x7684;&#x5B98;&#x65B9;&#x8BF4;&#x660E;&#xFF1A;&#x6D3E;&#x751F;&#x51FA;&#x65B0;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x8FD9;&#x4E2A;&#x6BD4;&#x8F83;&#x96BE;&#x7406;&#x89E3;&#x3002;&#x7B80;&#x5355;&#x6765;&#x8BF4;&#xFF0C;&#x5C31;&#x662F;<strong>&#x8FC7;&#x6EE4;&#xFF0C;&#x7EC4;&#x5408;&#xFF01;</strong><br>&#x6BD4;&#x5982;&#x8BF4;state&#x91CC;&#x9762;&#x5B58;&#x4E86;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x6570;&#x7EC4;&#x6709;&#x597D;&#x591A;&#x4E2A;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x6211;&#x53EA;&#x60F3;&#x8981;&#x7528;status&#xFF1A;0&#x7684;&#x90A3;&#x4E9B;&#x4E2A;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x7528;getters&#x3002;&#x662F;&#x4E0D;&#x662F;&#x6709;&#x70B9;&#x8FC7;&#x6EE4;&#x7684;&#x610F;&#x601D;&#x3002;&#x6240;&#x4EE5;getters&#x6709;&#x65F6;&#x5019;&#x8FD8;&#x5F88;&#x597D;&#x7528;&#xFF0C;&#x5F88;&#x5FC5;&#x8981;&#xFF01;&#x3002;<br>4&#x3001;actions&#x662F;&#x7528;&#x6765;&#x63D0;&#x4EA4;mutations&#xFF0C;wtf&#xFF1F;&#x600E;&#x4E48;&#x611F;&#x89C9;&#x90A3;&#x4E48;&#x591A;&#x4F59;&#xFF01;&#x5176;&#x5B9E;&#x4E0D;&#x662F;&#x7684;&#xFF0C;&#x8FD9;&#x4E2A;actions&#x6700;&#x91CD;&#x8981;&#x7684;&#x662F;&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3002;&#x5982;&#x4F55;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5C31;&#x4E0D;&#x6F14;&#x793A;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x5927;&#x5BB6;&#x53EF;&#x80FD;&#x5F88;&#x591A;&#x60C5;&#x51B5;&#x90FD;&#x4E0D;&#x4F1A;&#x4F7F;&#x7528;&#x5B83;&#x3002;<br>5&#x3001;modules&#x4E5F;&#x662F;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;&#x3002;&#x6BD4;&#x5982;modulesA&#x6709;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;state&#x3001;actions&#x3001;getters&#x3001;mutations&#xFF1B;modulesB&#x4E5F;&#x53EF;&#x4EE5;&#x6709;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;state&#x3001;actions&#x3001;getters&#x3001;mutations&#xFF0C;&#x4ED6;&#x5C31;&#x662F;&#x5C06;store&#x5206;&#x5272;&#x6210;&#x6A21;&#x5757;&#xFF0C;&#x907F;&#x514D;&#x6DF7;&#x6DC6;&#x3002;</p><p>&#x597D;&#x4E86;&#xFF0C;&#x4ECA;&#x5929;&#x5C31;&#x8BF4;&#x8FD9;&#x4E00;&#x4E9B;&#xFF0C;&#x8FD8;&#x662F;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x591A;&#x770B;&#x5B98;&#x7F51;&#x6587;&#x6863;&#xFF0C;&#x591A;&#x5B9E;&#x8DF5;&#x3002;&#x8DEA;&#x6C42;&#x5404;&#x4F4D;&#x5927;&#x725B;&#x6307;&#x5BFC;&#xFF01;&#x5B66;&#x4E60;&#x771F;&#x96BE;&#xFF0C;&#x6C42;&#x5E26;&#x5E26;&#x6211;...</p><p>&#x6700;&#x540E;&#x8FD8;&#x662F;&#x8BF4;&#x4E00;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x6587;&#x7AE0;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x7684;&#x8BDD;&#xFF0C;&#x8BF7;&#x7ED9;&#x6211;&#x4E00;&#x4E2A;star&#x9F13;&#x52B1;&#x4E00;&#x4E0B;&#xFF0C;&#x6211;&#x8FD8;&#x6CA1;&#x5DE5;&#x4F5C;&#x5462;&#x3002;&#x3002;&#x3002;&#x545C;&#x545C;&#x545C;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单说说vue的父子组件，父子组件传值和vuex

## 原文链接
[https://segmentfault.com/a/1190000015497612](https://segmentfault.com/a/1190000015497612)

