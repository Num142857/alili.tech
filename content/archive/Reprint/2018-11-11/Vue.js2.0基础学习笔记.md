---
title: Vue.js2.0基础学习笔记
hidden: true
categories: [reprint]
slug: 85eff157
date: 2018-11-11 02:30:07
---

{{< raw >}}
<p><strong>1&#x3001;&#x4F7F;&#x7528;&#x811A;&#x624B;&#x67B6;Vue-cli&#x6784;&#x5EFA;vue&#x9879;&#x76EE;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#xFF1A;vue create project  &#x6216; vue ui
&#x8FDB;&#x5165;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#xFF1A;cd project
&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E2D;&#x6253;&#x5F00;&#xFF1A;npm run serve  &#x6216;  yarn serve
&#x6253;&#x5305;&#x9879;&#x76EE;&#xFF1A;npm run build   &#x6216;  yarn build
&#x6D4B;&#x8BD5;&#x9879;&#x76EE;&#xFF1A;npm run lint   &#x6216;  yarn lint
&#x5B89;&#x88C5;&#x63D2;&#x4EF6;&#x6216;&#x4F9D;&#x8D56;&#xFF1A;vue add element &#x6216; yarn add element-ui &#x6216; npm install element-ui --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code>&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#xFF1A;vue <span class="hljs-keyword">create</span> <span class="hljs-keyword">project</span>  &#x6216; vue ui
&#x8FDB;&#x5165;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#xFF1A;cd <span class="hljs-keyword">project</span>
&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E2D;&#x6253;&#x5F00;&#xFF1A;npm run serve  &#x6216;  yarn serve
&#x6253;&#x5305;&#x9879;&#x76EE;&#xFF1A;npm run <span class="hljs-keyword">build</span>   &#x6216;  yarn <span class="hljs-keyword">build</span>
&#x6D4B;&#x8BD5;&#x9879;&#x76EE;&#xFF1A;npm run lint   &#x6216;  yarn lint
&#x5B89;&#x88C5;&#x63D2;&#x4EF6;&#x6216;&#x4F9D;&#x8D56;&#xFF1A;vue <span class="hljs-keyword">add</span> <span class="hljs-keyword">element</span> &#x6216; yarn <span class="hljs-keyword">add</span> <span class="hljs-keyword">element</span>-ui &#x6216; npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">element</span>-ui <span class="hljs-comment">--save</span></code></pre><p><strong>2&#x3001;&#x7533;&#x660E;&#x5F0F;&#x6E32;&#x67D3;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    {{msg}}
&lt;/div&gt;

var app=new Vue({
    el:&apos;#app&apos;,
    data:{
        msg:&apos;Hello World!&apos;
    }
})

result&#xFF1A; hello world" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    {{msg}}
&lt;/div&gt;

<span class="hljs-selector-tag">var</span> app=new Vue({
    el:<span class="hljs-string">&apos;#app&apos;</span>,
    data:{
        msg:<span class="hljs-string">&apos;Hello World!&apos;</span>
    }
})

result&#xFF1A; hello world</code></pre><p><strong>3&#x3001;Vue&#x5B9E;&#x4F8B;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data={a:1}
var vm=new Vue({
    el:&apos;example&apos;,
    data:data
})

vm.$data===data    //=&gt;true
vm.$el===document.getElementById(&apos;example&apos;)    //=&gt;true
vm.$watch(&apos;a&apos;,function(newValue,oldValue){
    //=&gt;&#x5F53; &#x201C; $vm.a &#x201D;&#x6539;&#x53D8;&#x540E;&#x8C03;&#x7528;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">data</span>={a:<span class="hljs-number">1</span>}
<span class="hljs-built_in">var</span> vm=<span class="hljs-literal">new</span> Vue({
    el:<span class="hljs-string">&apos;example&apos;</span>,
    <span class="hljs-built_in">data</span>:<span class="hljs-built_in">data</span>
})

vm.$data===<span class="hljs-built_in">data</span>    <span class="hljs-comment">//=&gt;true</span>
vm.$el===document.getElementById(<span class="hljs-string">&apos;example&apos;</span>)    <span class="hljs-comment">//=&gt;true</span>
vm.$watch(<span class="hljs-string">&apos;a&apos;</span>,function(newValue,oldValue){
    <span class="hljs-comment">//=&gt;&#x5F53; &#x201C; $vm.a &#x201D;&#x6539;&#x53D8;&#x540E;&#x8C03;&#x7528;</span>
})</code></pre><p><strong>4&#x3001;Vue&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x6784;&#x5B50;</strong></p><ul><li>new Vue()&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;vue&#x5BF9;&#x8C61;</li><li>&#x521D;&#x59CB;&#x5316;&#x4E8B;&#x4EF6;&#x548C;&#x751F;&#x547D;&#x5468;&#x671F;</li><li>beforeCreate&#x6784;&#x5B50;&#xFF1A;&#x7EC4;&#x4EF6;&#x521B;&#x5EFA;&#x4E4B;&#x524D;&#xFF0C;&#x6570;&#x636E;data&#x548C;&#x4E8B;&#x4EF6;&#x76D1;&#x6D4B;&#x5DF2;&#x521D;&#x59CB;&#x5316;</li><li>&#x901A;&#x8FC7;&#x4F9D;&#x8D56;&#x6CE8;&#x5165;&#x5BFC;&#x5165;&#x4F9D;&#x8D56;&#x9879;</li><li>created&#x6784;&#x5B50;&#xFF1A;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x4EE5;&#x521B;&#x5EFA;&#x5B8C;&#x6210;&#xFF0C;&#x6B64;&#x65F6;Dom&#x8FD8;&#x672A;&#x751F;&#x6210;</li><li>&#x68C0;&#x67E5;&#x662F;&#x5426;&#x914D;&#x7F6E;&#x6302;&#x8F7D;&#x8282;&#x70B9; el &#x9879;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5219;&#x7B49;&#x5F85;&#x4F7F;&#x7528;vm.$mount(el)&#x7ED1;&#x5B9A;</li><li>&#x662F;&#x5426;&#x5B58;&#x5728;&#xFF1A;template &#x9009;&#x9879;&#xFF0C;&#x5B58;&#x5728;&#x5219;&#x5C06;&#x5176;&#x7F16;&#x8BD1;&#x5230;&#x6E32;&#x67D3;&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x5219;&#x4EE5;el&#x7684;outHTML&#x4E3A;&#x7F16;&#x8BD1;&#x6A21;&#x677F;</li><li>beforeMount&#x6784;&#x5B50;&#xFF1A;&#x6A21;&#x677F;&#x7F16;&#x8BD1;&#x3001;&#x6302;&#x8F7D;&#x4E4B;&#x524D;&#x8C03;&#x7528;</li><li>&#x7F16;&#x8BD1;&#xFF0C;&#x5E76;&#x66FF;&#x6362;&#x4E86;&#x88AB;&#x7ED1;&#x5B9A;&#x5143;&#x7D20;</li><li>mounted&#x6784;&#x5B50;&#xFF1A;&#x7EC4;&#x4EF6;&#x7F16;&#x8BD1;&#x3001;&#x6302;&#x8F7D;&#x8282;&#x70B9;</li><li>beforeupdate&#x6784;&#x5B50;&#xFF1A;&#x5F53;data&#x6570;&#x636E;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x6B64;&#x65F6;&#x5373;&#x5C06;&#x66F4;&#x65B0;&#x6E32;&#x67D3;</li><li>updated&#x6784;&#x5B50;&#xFF1A;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x6210;&#x529F;</li><li>beforeDestroy:&#x7EC4;&#x4EF6;&#x5373;&#x5C06;&#x9500;&#x6BC1;</li><li>destroyed&#xFF1A;&#x7EC4;&#x4EF6;&#x5DF2;&#x7ECF;&#x9500;&#x6BC1;</li></ul><p><strong>5&#x3001;Vue&#x5E38;&#x7528;&#x8BED;&#x6CD5;&#x3001;&#x6307;&#x4EE4;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x8BED;&#x6CD5;&#xFF1A;&lt;span&gt;{{msg}}&lt;/span&gt;
 &#x4E00;&#x6B21;&#x6027;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#xFF1A;&lt;span v-once&gt;{{msg}}&lt;/span&gt;    //&#x4F46;&#x6570;&#x636E;&#x6539;&#x53D8;&#x65F6;msg&#x4E0D;&#x66F4;&#x65B0;
 &#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x53EA;&#x80FD;&#x89E3;&#x91CA;&#x666E;&#x901A;&#x6587;&#x672C;&#xFF0C;&#x89E3;&#x91CA;html&#x53EF;&#x7528;v-html&#xFF1A;&lt;span v-html=&quot;tem&quot;&gt;&lt;/span&gt;
 
 v-if&#x6307;&#x4EE4;&#xFF1A;&#x7528;&#x4E8E;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#x79FB;&#x9664;&#x663E;&#x793A;&#x5143;&#x7D20;&#xFF0C;v-if&#x662F;&#x771F;&#x6B63;&#x7684;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#xFF0C;v-show&#x662F;&#x5207;&#x6362;display
     &lt;span v-if=&quot;ok&quot;&gt;yes&lt;/span&gt;
     &lt;span v-else&gt;No&lt;/span&gt;
     &lt;template v-if=&quot;true&quot;&gt;
         &lt;h1&gt;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;template&#x5305;&#x88F9;&#x4F4F;&#x5143;&#x7D20;&#x6765;&#x5224;&#x65AD;&#xFF0C;&#x4E0D;&#x4F1A;&#x663E;&#x793A;&#x591A;&#x4F59;&#x7684;template&#x6807;&#x7B7E;&lt;/h1&gt;
     &lt;/template&gt;
 
 v-bind&#x6307;&#x4EE4;&#xFF1A;&#x7528;&#x4E8E;&#x7ED1;&#x5B9A;HTML&#x7279;&#x6027;&#x5982;  Class&#x3001;src&#x3001;href&#x3001;style
 
      &lt;a :href=&quot;url&quot;&gt;&lt;/a&gt; 
      &lt;div class=&quot;a&quot; :class=&quot;{active:isActive,&apos;text-danger&apos;:hasErr}&quot;&gt;&lt;/div&gt;
      data:{
          isActive:true,
          hasErr:false
      }
      result:    &lt;div class=&quot;a active&quot;&gt;&lt;/div&gt;
      

 v-on&#x6307;&#x4EE4;&#xFF1A;&#x7528;&#x4E8E;&#x76D1;&#x542C;Dom&#x4E8B;&#x4EF6;   &lt;a @click=&quot;&quot;&gt;&lt;/a&gt;
 
 v-for&#x6307;&#x4EE4;&#x7528;&#x4E8E;&#x5FAA;&#x73AF;&#xFF1A;
 
     &lt;div id=&quot;app&quot;&gt;
         &lt;ul&gt;
             &lt;li v-for=&quot;item in items&quot;&gt;{{item.text}}&lt;/li&gt;
         &lt;/ul&gt;
     &lt;/div&gt;
     var app=new Vue({
         el:&apos;#app&apos;,
         data:{
             items:[
                 {text:&apos;Javascript&apos;},
                 {text:&apos;Vue&apos;}
             ]
         }
     })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"> &#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x8BED;&#x6CD5;&#xFF1A;<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
 &#x4E00;&#x6B21;&#x6027;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#xFF1A;<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-once</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>    //&#x4F46;&#x6570;&#x636E;&#x6539;&#x53D8;&#x65F6;msg&#x4E0D;&#x66F4;&#x65B0;
 &#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x53EA;&#x80FD;&#x89E3;&#x91CA;&#x666E;&#x901A;&#x6587;&#x672C;&#xFF0C;&#x89E3;&#x91CA;html&#x53EF;&#x7528;v-html&#xFF1A;<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">&quot;tem&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
 
 v-if&#x6307;&#x4EE4;&#xFF1A;&#x7528;&#x4E8E;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#x79FB;&#x9664;&#x663E;&#x793A;&#x5143;&#x7D20;&#xFF0C;v-if&#x662F;&#x771F;&#x6B63;&#x7684;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#xFF0C;v-show&#x662F;&#x5207;&#x6362;display
     <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;ok&quot;</span>&gt;</span>yes<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-else</span>&gt;</span>No<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x53EF;&#x4EE5;&#x4F7F;&#x7528;template&#x5305;&#x88F9;&#x4F4F;&#x5143;&#x7D20;&#x6765;&#x5224;&#x65AD;&#xFF0C;&#x4E0D;&#x4F1A;&#x663E;&#x793A;&#x591A;&#x4F59;&#x7684;template&#x6807;&#x7B7E;<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
 
 v-bind&#x6307;&#x4EE4;&#xFF1A;&#x7528;&#x4E8E;&#x7ED1;&#x5B9A;HTML&#x7279;&#x6027;&#x5982;  Class&#x3001;src&#x3001;href&#x3001;style
 
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">&quot;url&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span> 
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;a&quot;</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{active:isActive,&apos;text-danger&apos;:hasErr}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      data:</span><span class="hljs-template-variable">{
          isActive:true,
          hasErr:false
      }</span><span class="xml">
      result:    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;a active&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      

 v-on&#x6307;&#x4EE4;&#xFF1A;&#x7528;&#x4E8E;&#x76D1;&#x542C;Dom&#x4E8B;&#x4EF6;   <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
 
 v-for&#x6307;&#x4EE4;&#x7528;&#x4E8E;&#x5FAA;&#x73AF;&#xFF1A;
 
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;item in items&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.text}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
         <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
     var app=new Vue(</span><span class="hljs-template-variable">{
         el:&apos;#app&apos;,
         data:{
             items:[
                 {text:&apos;Javascript&apos;}</span><span class="xml">,
                 </span><span class="hljs-template-variable">{text:&apos;Vue&apos;}</span><span class="xml">
             ]
         }
     })</span></code></pre><p><strong>6&#x3001;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E0E;&#x4FA6;&#x542C;&#x5668;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7528;&#x4E8E;&#x7B80;&#x5355;&#x8BA1;&#x7B97;&#xFF0C;&#x7531;&#x4E8E;&#x5728;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x4E2D;&#x5199;&#x8868;&#x8FBE;&#x5F0F;&#x96BE;&#x4EE5;&#x7EF4;&#x62A4;&#xFF0C;&#x4E5F;&#x65E0;&#x6CD5;&#x8FDB;&#x884C;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#x7B49;&#x52A8;&#x4F5C;,&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4F1A;&#x6839;&#x636E;&#x5176;&#x4F9D;&#x8D56;&#x7684;&#x503C;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x5E76;&#x7F13;&#x5B58;
     &lt;span&gt;{{reversedMsg}}&lt;/span&gt;
     new Vue({
         el:&apos;app&apos;,
         data:{
             Msg:&apos;Hello&apos;
         },
         computed:{
             reversedMsg:function(){
                 return this.Msg.split(&apos;&apos;).reverse.join(&apos;&apos;)
             }
         },
         watch:{
             Msg:function(newMsg,oldMsg){
                 newMsg=oldMsg+1
             }
         }
     })
     
     result: gsMdesrevrr
     
&#x4FA6;&#x542C;&#x5668;watch&#x4FA6;&#x542C;&#x6570;&#x636E;&#x53D8;&#x5316;&#xFF08;Msg&#xFF09;&#xFF1A;&#x5F53;&#x9700;&#x8981;&#x5728;&#x6570;&#x636E;&#x53D8;&#x5316;&#x65F6;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x6216;&#x5F00;&#x9500;&#x8F83;&#x5927;&#x7684;&#x64CD;&#x4F5C;&#x65F6;&#x4F7F;&#x7528;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code> &#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7528;&#x4E8E;&#x7B80;&#x5355;&#x8BA1;&#x7B97;&#xFF0C;&#x7531;&#x4E8E;&#x5728;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x4E2D;&#x5199;&#x8868;&#x8FBE;&#x5F0F;&#x96BE;&#x4EE5;&#x7EF4;&#x62A4;&#xFF0C;&#x4E5F;&#x65E0;&#x6CD5;&#x8FDB;&#x884C;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#x7B49;&#x52A8;&#x4F5C;,&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4F1A;&#x6839;&#x636E;&#x5176;&#x4F9D;&#x8D56;&#x7684;&#x503C;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x5E76;&#x7F13;&#x5B58;
     <span class="hljs-symbol">&lt;span&gt;</span>"{{"reversedMsg}}&lt;/span&gt;
     <span class="hljs-keyword">new</span> Vue({
         <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span><span class="hljs-string">&apos;app&apos;</span>,
         dat<span class="hljs-variable">a:</span>{
             Ms<span class="hljs-variable">g:</span><span class="hljs-string">&apos;Hello&apos;</span>
         },
         computed:{
             reversedMs<span class="hljs-variable">g:function</span>(){
                 <span class="hljs-keyword">return</span> this.Msg.<span class="hljs-keyword">split</span>(<span class="hljs-string">&apos;&apos;</span>).<span class="hljs-built_in">reverse</span>.<span class="hljs-keyword">join</span>(<span class="hljs-string">&apos;&apos;</span>)
             }
         },
         watch:{
             Ms<span class="hljs-variable">g:function</span>(newMsg,oldMsg){
                 newMsg=oldMsg+<span class="hljs-number">1</span>
             }
         }
     })
     
     resul<span class="hljs-variable">t:</span> gsMdesrevrr
     
&#x4FA6;&#x542C;&#x5668;watch&#x4FA6;&#x542C;&#x6570;&#x636E;&#x53D8;&#x5316;&#xFF08;Msg&#xFF09;&#xFF1A;&#x5F53;&#x9700;&#x8981;&#x5728;&#x6570;&#x636E;&#x53D8;&#x5316;&#x65F6;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x6216;&#x5F00;&#x9500;&#x8F83;&#x5927;&#x7684;&#x64CD;&#x4F5C;&#x65F6;&#x4F7F;&#x7528;</code></pre><p><strong>7&#x3001;&#x5217;&#x8868;&#x6E32;&#x67D3;(v-for&#x7684;&#x4F18;&#x5148;&#x7EA7;&#x6BD4;v-if&#x9AD8;)</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;ul&gt;
    &lt;template v-for=&quot;(item,index) in items&quot; :key=&quot;item.index&quot; v-if(item.age&gt;20)&gt;
       &lt;li&gt; {{aaa}}-{{index}}-{{item.messge}}&lt;/li&gt;
       &lt;li class=&quot;more&quot;&gt;&#x5E95;&#x90E8;&#x52A0;&#x8F7D;&#x6570;&#x636E;&lt;/li&gt;
    &lt;/template&gt;
&lt;/ul&gt;
data:{
    aaa:333,
    items:[
        {messge:111,age:444},
        {messge:222}
    ]
}
&#x5EFA;&#x8BAE;&#x5C3D;&#x53EF;&#x80FD;&#x5728;&#x4F7F;&#x7528; v-for &#x65F6;&#x63D0;&#x4F9B; key&#xFF0C;&#x9664;&#x975E;&#x904D;&#x5386;&#x8F93;&#x51FA;&#x7684; DOM &#x5185;&#x5BB9;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x6216;&#x8005;&#x662F;&#x523B;&#x610F;&#x4F9D;&#x8D56;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#x4EE5;&#x83B7;&#x53D6;&#x6027;&#x80FD;&#x4E0A;&#x7684;&#x63D0;&#x5347;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item,index) in items&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;item.index&quot;</span> <span class="hljs-attr">v-if</span>(<span class="hljs-attr">item.age</span>&gt;</span>20)&gt;
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span> </span><span class="hljs-template-variable">"{{"aaa}</span><span class="xml">}-</span><span class="hljs-template-variable">"{{"index}</span><span class="xml">}-</span><span class="hljs-template-variable">"{{"item.messge}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;more&quot;</span>&gt;</span>&#x5E95;&#x90E8;&#x52A0;&#x8F7D;&#x6570;&#x636E;<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
data:</span><span class="hljs-template-variable">{
    aaa:333,
    items:[
        {messge:111,age:444}</span><span class="xml">,
        </span><span class="hljs-template-variable">{messge:222}</span><span class="xml">
    ]
}
&#x5EFA;&#x8BAE;&#x5C3D;&#x53EF;&#x80FD;&#x5728;&#x4F7F;&#x7528; v-for &#x65F6;&#x63D0;&#x4F9B; key&#xFF0C;&#x9664;&#x975E;&#x904D;&#x5386;&#x8F93;&#x51FA;&#x7684; DOM &#x5185;&#x5BB9;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x6216;&#x8005;&#x662F;&#x523B;&#x610F;&#x4F9D;&#x8D56;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#x4EE5;&#x83B7;&#x53D6;&#x6027;&#x80FD;&#x4E0A;&#x7684;&#x63D0;&#x5347;</span></code></pre><p><strong>8&#x3001;&#x4F7F;&#x7528;Vue.set()&#x54CD;&#x5E94;&#x5F0F;&#x63A7;&#x5236;&#x6570;&#x636E;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm =new Vue({
    data:{
        user:{
            name:&apos;Cai&apos;
        }
    }
})

&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x65B0;&#x7684; age &#x5C5E;&#x6027;&#x5230;&#x5D4C;&#x5957;&#x7684; userProfile &#x5BF9;&#x8C61;
vm.set(vm.user,&apos;age&apos;,22)
&#x6709;&#x65F6;&#x4F60;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x4E3A;&#x5DF2;&#x6709;&#x5BF9;&#x8C61;&#x8D4B;&#x4E88;&#x591A;&#x4E2A;&#x65B0;&#x5C5E;&#x6027;&#xFF0C;&#x6BD4;&#x5982;&#x4F7F;&#x7528; Object.assign()
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: &apos;Vue Green&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> vm =new Vue({
    data:{
        user:{
            name:<span class="hljs-string">&apos;Cai&apos;</span>
        }
    }
})

&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x65B0;&#x7684; age &#x5C5E;&#x6027;&#x5230;&#x5D4C;&#x5957;&#x7684; userProfile &#x5BF9;&#x8C61;
vm.set(vm<span class="hljs-selector-class">.user</span>,<span class="hljs-string">&apos;age&apos;</span>,<span class="hljs-number">22</span>)
&#x6709;&#x65F6;&#x4F60;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x4E3A;&#x5DF2;&#x6709;&#x5BF9;&#x8C61;&#x8D4B;&#x4E88;&#x591A;&#x4E2A;&#x65B0;&#x5C5E;&#x6027;&#xFF0C;&#x6BD4;&#x5982;&#x4F7F;&#x7528; Object.assign()
vm<span class="hljs-selector-class">.userProfile</span> = Object.assign({}, vm<span class="hljs-selector-class">.userProfile</span>, {
  age: <span class="hljs-number">27</span>,
  favoriteColor: <span class="hljs-string">&apos;Vue Green&apos;</span>
})</code></pre><p><strong>9&#x3001;&#x4E8B;&#x4EF6;&#x5904;&#x7406;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;button @click=&quot;wran(&apos;&#x4F20;&#x5165;&#x6D88;&#x606F;&apos;,$event)&quot;&gt;&lt;/button&gt;
methods&#xFF1A;{
    warn:function(message,event){
        if(event){
            // &#x73B0;&#x5728;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x539F;&#x751F;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;
        }
    }
}

&lt;a @click.stop=&apos;doThis&apos;&gt;&lt;/a&gt;    //&#x963B;&#x6B62;&#x5355;&#x51FB;&#x4E8B;&#x4EF6;&#x7EE7;&#x7EED;&#x4F20;&#x64AD;

&lt;form @submit.prevent=&apos;&apos;&gt;&lt;/form&gt;    //&#x63D0;&#x4EA4;&#x4E8B;&#x4EF6;&#x4E0D;&#x518D;&#x91CD;&#x8F7D;&#x9875;&#x9762;

&lt;div @click.capture=&apos;&apos;&gt;&lt;/div&gt;    // &#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;&#x65F6;&#x4F7F;&#x7528;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x6A21;&#x5F0F;,&#x5373;&#x5143;&#x7D20;&#x81EA;&#x8EAB;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;&#x5148;&#x5728;&#x6B64;&#x5904;&#x7406;&#xFF0C;&#x7136;&#x540E;&#x624D;&#x4EA4;&#x7531;&#x5185;&#x90E8;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x5904;&#x7406;
&lt;div @click.self=&quot;&quot;&gt;...&lt;/div&gt;    //&#x53EA;&#x5F53;&#x5728; event.target &#x662F;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x81EA;&#x8EAB;&#x65F6;&#x89E6;&#x53D1;&#x5904;&#x7406;&#x51FD;&#x6570;
&lt;div @click.once=&quot;&quot;&gt;&lt;/div&gt;    //&#x53EA;&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#x70B9;&#x51FB;

&lt;div v-on:scroll.passive=&quot;onScroll&quot;&gt;...&lt;/div&gt;    //&#x6EDA;&#x52A8;&#x4E8B;&#x4EF6;&#x7684;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A; (&#x5373;&#x6EDA;&#x52A8;&#x884C;&#x4E3A;) &#x5C06;&#x4F1A;&#x7ACB;&#x5373;&#x89E6;&#x53D1;&#xFF0C;&#x800C;&#x4E0D;&#x4F1A;&#x7B49;&#x5F85; `onScroll` &#x5B8C;&#x6210;&#xFF0C;&#x53EF;&#x63D0;&#x5347;&#x6027;&#x80FD;

&#x952E;&#x76D8;&#x4E8B;&#x4EF6;&#xFF1A;
&lt;input @keyup.enter=&quot;submit&quot; /&gt;    //&#x6309; enter&#x952E;&#x89E6;&#x53D1;
&lt;input @keyup.page-down=&quot;onPageDown&quot;&gt;    //&#x5904;&#x7406;&#x51FD;&#x6570;&#x4EC5;&#x5728; $event.key === &apos;PageDown&apos; &#x65F6;&#x88AB;&#x8C03;&#x7528;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">button</span> @click=<span class="hljs-string">&quot;wran(&apos;&#x4F20;&#x5165;&#x6D88;&#x606F;&apos;,$event)&quot;</span>&gt;&lt;/button&gt;
methods&#xFF1A;{
    warn:function(message,event){
        <span class="hljs-keyword">if</span>(event){
            <span class="hljs-comment">// &#x73B0;&#x5728;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x539F;&#x751F;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;</span>
        }
    }
}

&lt;<span class="hljs-selector-tag">a</span> @click.stop=<span class="hljs-string">&apos;doThis&apos;</span>&gt;&lt;/a&gt;    <span class="hljs-comment">//&#x963B;&#x6B62;&#x5355;&#x51FB;&#x4E8B;&#x4EF6;&#x7EE7;&#x7EED;&#x4F20;&#x64AD;</span>

&lt;<span class="hljs-selector-tag">form</span> @submit.prevent=<span class="hljs-string">&apos;&apos;</span>&gt;&lt;/form&gt;    <span class="hljs-comment">//&#x63D0;&#x4EA4;&#x4E8B;&#x4EF6;&#x4E0D;&#x518D;&#x91CD;&#x8F7D;&#x9875;&#x9762;</span>

&lt;<span class="hljs-selector-tag">div</span> @click.capture=<span class="hljs-string">&apos;&apos;</span>&gt;&lt;/div&gt;    <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;&#x65F6;&#x4F7F;&#x7528;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x6A21;&#x5F0F;,&#x5373;&#x5143;&#x7D20;&#x81EA;&#x8EAB;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;&#x5148;&#x5728;&#x6B64;&#x5904;&#x7406;&#xFF0C;&#x7136;&#x540E;&#x624D;&#x4EA4;&#x7531;&#x5185;&#x90E8;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x5904;&#x7406;</span>
&lt;<span class="hljs-selector-tag">div</span> @click.self=<span class="hljs-string">&quot;&quot;</span>&gt;...&lt;/div&gt;    <span class="hljs-comment">//&#x53EA;&#x5F53;&#x5728; event.target &#x662F;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x81EA;&#x8EAB;&#x65F6;&#x89E6;&#x53D1;&#x5904;&#x7406;&#x51FD;&#x6570;</span>
&lt;<span class="hljs-selector-tag">div</span> @click.once=<span class="hljs-string">&quot;&quot;</span>&gt;&lt;/div&gt;    <span class="hljs-comment">//&#x53EA;&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#x70B9;&#x51FB;</span>

&lt;<span class="hljs-selector-tag">div</span> v-on:scroll.passive=<span class="hljs-string">&quot;onScroll&quot;</span>&gt;...&lt;/div&gt;    <span class="hljs-comment">//&#x6EDA;&#x52A8;&#x4E8B;&#x4EF6;&#x7684;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A; (&#x5373;&#x6EDA;&#x52A8;&#x884C;&#x4E3A;) &#x5C06;&#x4F1A;&#x7ACB;&#x5373;&#x89E6;&#x53D1;&#xFF0C;&#x800C;&#x4E0D;&#x4F1A;&#x7B49;&#x5F85; `onScroll` &#x5B8C;&#x6210;&#xFF0C;&#x53EF;&#x63D0;&#x5347;&#x6027;&#x80FD;</span>

&#x952E;&#x76D8;&#x4E8B;&#x4EF6;&#xFF1A;
&lt;<span class="hljs-selector-tag">input</span> @keyup.enter=<span class="hljs-string">&quot;submit&quot;</span> /&gt;    <span class="hljs-comment">//&#x6309; enter&#x952E;&#x89E6;&#x53D1;</span>
&lt;<span class="hljs-selector-tag">input</span> @keyup.page-down=<span class="hljs-string">&quot;onPageDown&quot;</span>&gt;    <span class="hljs-comment">//&#x5904;&#x7406;&#x51FD;&#x6570;&#x4EC5;&#x5728; $event.key === &apos;PageDown&apos; &#x65F6;&#x88AB;&#x8C03;&#x7528;</span></code></pre><p><strong>10&#x3001;Vue&#x8868;&#x5355;&#x5904;&#x7406;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v-model&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;

    &lt;input v-model=&quot;message&quot;&gt;    //&#x8F93;&#x5165;&#x6846;
    &lt;p style=&quot;white-space: pre-line;&quot;&gt;{{message}}&lt;/p&gt;
    &lt;textarea v-model=&quot;message&quot;&gt;&lt;/textarea&gt;    //&#x591A;&#x884C;&#x8F93;&#x5165;&#x6846;
    
    ==&gt;&#x590D;&#x9009;&#x6846;
    &lt;div id=&quot;example&quot;&gt;
        &lt;input type=&quot;checkbox&quot; id=&quot;red&quot; value=&quot;red&quot; v-model=&quot;selectColor&quot; &gt;
        &lt;label for=&quot;red&quot;&gt;&#x7EA2;&#x8272;&lt;/babel&gt;
        &lt;input type=&quot;checkbox&quot; id=&quot;green&quot; value=&quot;green&quot; v-model=&quot;selectColor&quot; &gt;
        &lt;label for=&quot;green&quot;&gt;&#x7EFF;&#x8272;&lt;/babel&gt;
        &lt;input type=&quot;checkbox&quot; id=&quot;blue&quot; value=&quot;blue&quot; v-model=&quot;selectColor&quot; &gt;
        &lt;label for=&quot;blue&quot;&gt;&#x84DD;&#x8272;&lt;/babel&gt;
        &lt;span&gt;{{selectColor}}&lt;/span&gt;
    &lt;/div&gt;
    new Vue({
        el:&apos;example&apos;,
        data:{
            selectColor:[]    //&#x9009;&#x4E2D;&#x9879;&#x4F1A;&#x6DFB;&#x52A0;&#x81F3;&#x6570;&#x7EC4;selectColor&#x4E2D;
        }
    })
    
    ==&gt;&#x5355;&#x9009;&#x6309;&#x94AE;
    &lt;input type=&quot;radio&quot; v-model=&quot;select&quot; value=&quot;&#x7537;&quot;&gt;
    &lt;input type=&quot;radio&quot; v-model=&quot;select&quot; value=&quot;&#x5973;&quot;&gt;
    &lt;span&gt;{{select}}&lt;/span&gt;
    data:{
        select:&apos;&apos;
    }
    
    ==&gt;&#x4E0B;&#x62C9;&#x9009;&#x62E9;&#x6846;
    &lt;select v-model=&quot;such&quot;&gt;    //&#x52A0; multiple &#x591A;&#x9009;&#xFF0C;&#x5F97;&#x5230;&#x6570;&#x7EC4;
        &lt;template v-for=&quot;option in options&quot;&gt;
            &lt;option disabled&gt;&#x8BF7;&#x9009;&#x62E9;&lt;/option&gt;
            &lt;option :value=&apos;option.value&apos;&gt;{{option.text}}&lt;/option&gt;
        &lt;/template&gt;
    &lt;/select&gt;
    &lt;span&gt;{{such}}&lt;/span&gt;
    data:{
        such:&apos;A&apos;,
        options:[
            {text:&apos;one&apos;,value:&apos;A&apos;},
            {text:&apos;two&apos;,value:&apos;B&apos;}
        ]
    }
    &lt;input type=&quot;checkbox&quot; v-model=&quot;toggle&quot;&gt;    //&#x5F53;&#x9009;&#x4E2D;&#x65F6;vm.toggle===true
    &lt;input type=&quot;radio&quot; v-model=&quot;pick&quot; :value=&quot;a&quot;&gt;    //&#x9009;&#x4E2D;&#x65F6;vm.pick===vm.a
    &lt;input v-model.lazy=&quot;msg&quot; &gt;   //&#x5728;change&#x65F6;&#x66F4;&#x65B0;&#x800C;&#x975E;input
    &lt;input v-model.number=&quot;age&quot; type=&quot;number&quot;&gt;    //&#x5C06;&#x7528;&#x6237;&#x7684;&#x8F93;&#x5165;&#x503C;&#x8F6C;&#x4E3A;&#x6570;&#x503C;&#x7C7B;&#x578B;
    &lt;input v-model.trim=&quot;msg&quot;&gt;    //&#x81EA;&#x52A8;&#x8FC7;&#x6EE4;&#x7528;&#x6237;&#x8F93;&#x5165;&#x7684;&#x9996;&#x5C3E;&#x7A7A;&#x767D;&#x5B57;
 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>v-model&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;

    &lt;<span class="hljs-selector-tag">input</span> v-model=<span class="hljs-string">&quot;message&quot;</span>&gt;    <span class="hljs-comment">//&#x8F93;&#x5165;&#x6846;</span>
    &lt;<span class="hljs-selector-tag">p</span> style=<span class="hljs-string">&quot;white-space: pre-line;&quot;</span>&gt;{{message}}&lt;/p&gt;
    &lt;<span class="hljs-selector-tag">textarea</span> v-model=<span class="hljs-string">&quot;message&quot;</span>&gt;&lt;/textarea&gt;    <span class="hljs-comment">//&#x591A;&#x884C;&#x8F93;&#x5165;&#x6846;</span>
    
    ==&gt;&#x590D;&#x9009;&#x6846;
    &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">&quot;example&quot;</span>&gt;
        &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">&quot;checkbox&quot;</span> id=<span class="hljs-string">&quot;red&quot;</span> value=<span class="hljs-string">&quot;red&quot;</span> v-model=<span class="hljs-string">&quot;selectColor&quot;</span> &gt;
        &lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;red&quot;</span>&gt;&#x7EA2;&#x8272;&lt;/babel&gt;
        &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">&quot;checkbox&quot;</span> id=<span class="hljs-string">&quot;green&quot;</span> value=<span class="hljs-string">&quot;green&quot;</span> v-model=<span class="hljs-string">&quot;selectColor&quot;</span> &gt;
        &lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;green&quot;</span>&gt;&#x7EFF;&#x8272;&lt;/babel&gt;
        &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">&quot;checkbox&quot;</span> id=<span class="hljs-string">&quot;blue&quot;</span> value=<span class="hljs-string">&quot;blue&quot;</span> v-model=<span class="hljs-string">&quot;selectColor&quot;</span> &gt;
        &lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;blue&quot;</span>&gt;&#x84DD;&#x8272;&lt;/babel&gt;
        &lt;span&gt;{{selectColor}}&lt;/span&gt;
    &lt;/div&gt;
    new Vue({
        el:<span class="hljs-string">&apos;example&apos;</span>,
        data:{
            selectColor:[]    <span class="hljs-comment">//&#x9009;&#x4E2D;&#x9879;&#x4F1A;&#x6DFB;&#x52A0;&#x81F3;&#x6570;&#x7EC4;selectColor&#x4E2D;</span>
        }
    })
    
    ==&gt;&#x5355;&#x9009;&#x6309;&#x94AE;
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">&quot;radio&quot;</span> v-model=<span class="hljs-string">&quot;select&quot;</span> value=<span class="hljs-string">&quot;&#x7537;&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">&quot;radio&quot;</span> v-model=<span class="hljs-string">&quot;select&quot;</span> value=<span class="hljs-string">&quot;&#x5973;&quot;</span>&gt;
    &lt;span&gt;{{select}}&lt;/span&gt;
    data:{
        select:<span class="hljs-string">&apos;&apos;</span>
    }
    
    ==&gt;&#x4E0B;&#x62C9;&#x9009;&#x62E9;&#x6846;
    &lt;select v-model=<span class="hljs-string">&quot;such&quot;</span>&gt;    <span class="hljs-comment">//&#x52A0; multiple &#x591A;&#x9009;&#xFF0C;&#x5F97;&#x5230;&#x6570;&#x7EC4;</span>
        &lt;template v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;option in options&quot;</span>&gt;
            &lt;option disabled&gt;&#x8BF7;&#x9009;&#x62E9;&lt;/option&gt;
            &lt;option :value=<span class="hljs-string">&apos;option.value&apos;</span>&gt;{{option.text}}&lt;/option&gt;
        &lt;/template&gt;
    &lt;/select&gt;
    &lt;span&gt;{{such}}&lt;/span&gt;
    data:{
        such:<span class="hljs-string">&apos;A&apos;</span>,
        options:[
            {text:<span class="hljs-string">&apos;one&apos;</span>,value:<span class="hljs-string">&apos;A&apos;</span>},
            {text:<span class="hljs-string">&apos;two&apos;</span>,value:<span class="hljs-string">&apos;B&apos;</span>}
        ]
    }
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">&quot;checkbox&quot;</span> v-model=<span class="hljs-string">&quot;toggle&quot;</span>&gt;    <span class="hljs-comment">//&#x5F53;&#x9009;&#x4E2D;&#x65F6;vm.toggle===true</span>
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">&quot;radio&quot;</span> v-model=<span class="hljs-string">&quot;pick&quot;</span> :value=<span class="hljs-string">&quot;a&quot;</span>&gt;    <span class="hljs-comment">//&#x9009;&#x4E2D;&#x65F6;vm.pick===vm.a</span>
    &lt;<span class="hljs-selector-tag">input</span> v-model.lazy=<span class="hljs-string">&quot;msg&quot;</span> &gt;   <span class="hljs-comment">//&#x5728;change&#x65F6;&#x66F4;&#x65B0;&#x800C;&#x975E;input</span>
    &lt;<span class="hljs-selector-tag">input</span> v-model.number=<span class="hljs-string">&quot;age&quot;</span> type=<span class="hljs-string">&quot;number&quot;</span>&gt;    <span class="hljs-comment">//&#x5C06;&#x7528;&#x6237;&#x7684;&#x8F93;&#x5165;&#x503C;&#x8F6C;&#x4E3A;&#x6570;&#x503C;&#x7C7B;&#x578B;</span>
    &lt;<span class="hljs-selector-tag">input</span> v-model.trim=<span class="hljs-string">&quot;msg&quot;</span>&gt;    <span class="hljs-comment">//&#x81EA;&#x52A8;&#x8FC7;&#x6EE4;&#x7528;&#x6237;&#x8F93;&#x5165;&#x7684;&#x9996;&#x5C3E;&#x7A7A;&#x767D;&#x5B57;</span>
 </code></pre><p><strong>11&#x3001;Vue&#x7EC4;&#x4EF6;&#x57FA;&#x7840;</strong></p><ul><li><p>&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6; &#xFF08;&#x7EC4;&#x4EF6;&#x4E0E; new Vue &#x63A5;&#x6536;&#x76F8;&#x540C;&#x7684;&#x9009;&#x9879;&#xFF0C;&#x9664;el&#x5916;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;my-component&apos;,{
   data:function(){        //&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684; data &#x9009;&#x9879;&#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;
       return{
           count:0
       }
   },
   template:&apos;&lt;button @click=&apos;count++&apos;&gt;{{count}}&lt;/button&gt;&apos;
})
&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#xFF1A;&lt;my-component&gt;&lt;/my-component&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>,{
   <span class="hljs-attr">data</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{        <span class="hljs-comment">//&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684; data &#x9009;&#x9879;&#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;</span>
       <span class="hljs-keyword">return</span>{
           <span class="hljs-attr">count</span>:<span class="hljs-number">0</span>
       }
   },
   <span class="hljs-attr">template</span>:<span class="hljs-string">&apos;&lt;button @click=&apos;</span>count++<span class="hljs-string">&apos;&gt;{{count}}&lt;/button&gt;&apos;</span>
})
&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#xFF1A;&lt;my-component&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
</span></code></pre></li><li><p>&#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;Prop&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;child&apos;,{
   props:[&apos;title&apos;],
   template:&apos;&lt;h3&gt;{{title}}&lt;/h3&gt;&apos;
})
&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;&#xFF1A;&lt;child title=&apos;&#x6211;&#x662F;&#x6807;&#x9898;&apos;&gt;&lt;/child&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml">Vue.component(&apos;child&apos;,{
   props:[&apos;title&apos;],
   template:&apos;<span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>&apos;
})
&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;&#xFF1A;<span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&apos;&#x6211;&#x662F;&#x6807;&#x9898;&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>

</span></code></pre></li><li><p>&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x6570;&#x636E;&#x6765;&#x81EA;&#x7236;&#x7EC4;&#x4EF6;&#x7684;data</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;child&apos;,{
   props:[&apos;title&apos;],
   template:&apos;&lt;h3&gt;{{title}}&lt;/h3&gt;&apos;
})

new Vue({
    el:&apos;#app&apos;,
    data:{
        posts:[
            {id:1,title:&apos;title1&apos;},
            {id:2,title:&apos;title2&apos;}
        ]
    }
})
&lt;child v-for=&apos;post in posts&apos; :key=&apos;post.id&apos; :title=&apos;post.title&apos;&gt;&lt;/child&gt;    //&#x5FAA;&#x73AF;&#x52A8;&#x6001;&#x6E32;&#x67D3;&#x4E24;&#x4E2A;child&#x7EC4;&#x4EF6;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code>Vue.component(<span class="hljs-string">&apos;child&apos;</span>,{
   <span class="hljs-attribute">props</span>:[<span class="hljs-string">&apos;title&apos;</span>],
   <span class="hljs-attribute">template</span>:<span class="hljs-string">&apos;&lt;h3&gt;{{title}}&lt;/h3&gt;&apos;</span>
})

<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attribute">el</span>:<span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attribute">data</span>:{
        <span class="hljs-attribute">posts</span>:[
            {<span class="hljs-attribute">id:</span><span class="hljs-string">1,title</span>:<span class="hljs-string">&apos;title1&apos;</span>},
            {<span class="hljs-attribute">id:</span><span class="hljs-string">2,title</span>:<span class="hljs-string">&apos;title2&apos;</span>}
        ]
    }
})
&lt;child v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&apos;post in posts&apos;</span> :key=<span class="hljs-string">&apos;post.id&apos;</span> :title=<span class="hljs-string">&apos;post.title&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>    //&#x5FAA;&#x73AF;&#x52A8;&#x6001;&#x6E32;&#x67D3;&#x4E24;&#x4E2A;child&#x7EC4;&#x4EF6;

</span></code></pre></li><li><p>&#x5F53;&#x9700;&#x8981;&#x4F20;&#x9012;&#x7684;props&#x592A;&#x591A;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x6216;&#x5BF9;&#x8C61;,&#x7136;&#x540E;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x63A5;&#x6536;<br>Vue.component(&apos;child&apos;,{</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   props:[&apos;post&apos;],
   template:`
       &lt;div&gt;
           &lt;h2&gt;{{post.title}}&lt;/h2&gt;
           &lt;div&gt;{{post.content}}&lt;/div&gt;
       &lt;/div&gt;
   `
   })
   &lt;child v-for=&apos;post in posts&apos; :key=&apos;post.id&apos; :post=&apos;post&apos;&gt;&lt;/child&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml">   props:[&apos;post&apos;],
   template:`
       <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span></span><span class="hljs-template-variable">"{{"post.title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">"{{"post.content"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   `
   })
   <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&apos;post in posts&apos;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&apos;post.id&apos;</span> <span class="hljs-attr">:post</span>=<span class="hljs-string">&apos;post&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
</span></code></pre></li><li><p>&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;&#x4E8B;&#x4EF6;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x53D1;&#x9001;&#x6D88;&#x606F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   Vue.component(&apos;child&apos;,{
       template:`&lt;button @click=&apos;$emit(&apos;setFont&apos;,0.1)&apos;&gt;&lt;/button&gt;`
   })
   
   new Vue({
       el:&apos;#app&apos;,
       data:{
           postFontSize:1
       },
       template:`
           &lt;div style=&apos;{fontSize:postFontSize+&apos;em&apos;}&apos;&gt;
               &lt;p&gt;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x653E;&#x5927;&#x6587;&#x5B57;&lt;/p&gt;
               &lt;child @setFont=&apos;postFontSize+=$event&apos;&gt;&lt;/child&gt;
           &lt;/div&gt;
       `
   })

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>   Vue.component(<span class="hljs-string">&apos;child&apos;</span>,{
       template:`<span class="javascript">&lt;button @click=<span class="hljs-string">&apos;$emit(&apos;</span>setFont<span class="hljs-string">&apos;,0.1)&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span></span>`
   })
   
   <span class="hljs-keyword">new</span> Vue({
       el:<span class="hljs-string">&apos;#app&apos;</span>,
       data:{
           postFontSize:<span class="hljs-number">1</span>
       },
       template:`<span class="javascript">
           &lt;div style=<span class="hljs-string">&apos;{fontSize:postFontSize+&apos;</span>em<span class="hljs-string">&apos;}&apos;</span>&gt;
               <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x653E;&#x5927;&#x6587;&#x5B57;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
               &lt;child @setFont=<span class="hljs-string">&apos;postFontSize+=$event&apos;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span></span>
           &lt;<span class="hljs-regexp">/div&gt;
       </span></span>`
   })

</code></pre></li><li><p>&#x5982;&#x679C;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x4F7F;&#x7528; v-model &#x5B9E;&#x73B0;&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   Vue.component(&apos;my-input&apos;,{
       props:[&apos;value&apos;],
       template:`
           &lt;input :value=&apos;value&apos; :input=&apos;$emit(&apos;input&apos;,$event.target.value)&apos;&gt;
       `
   })
   &lt;my-input v-model=&apos;searchText&apos;&gt;&lt;/my-input&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>   Vue.component(<span class="hljs-string">&apos;my-input&apos;</span>,{
       prop<span class="hljs-variable">s:</span>[<span class="hljs-string">&apos;value&apos;</span>],
       template:`
           &lt;<span class="hljs-built_in">input</span> :value=<span class="hljs-string">&apos;value&apos;</span> :<span class="hljs-built_in">input</span>=<span class="hljs-string">&apos;$emit(&apos;</span><span class="hljs-built_in">input</span><span class="hljs-string">&apos;,$event.target.value)&apos;</span>&gt;
       `
   })
   &lt;my-<span class="hljs-built_in">input</span> v-model=<span class="hljs-string">&apos;searchText&apos;</span>&gt;&lt;/my-<span class="hljs-built_in">input</span>&gt;

</code></pre></li><li><p>&lt;slot&gt;&#x63D2;&#x69FD;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   &lt;alert-box&gt;
         //&#x5982;&#x679C;&#x60F3;&#x5728;&#x8FD9;&#x91CC;&#x9762;&#x5199;&#x4E1C;&#x897F;,&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x7528;&#x63D2;&#x69FD;
   &lt;/alert-box&gt;
   Vue.component(&apos;alert-box&apos;,{
       template:`
           &lt;div class=&apos;demo&apos;&gt;
               &lt;slot&gt;&lt;/slot&gt;
           &lt;/div&gt;
       `
   })
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>   &lt;alert-box&gt;
         <span class="hljs-regexp">//</span>&#x5982;&#x679C;&#x60F3;&#x5728;&#x8FD9;&#x91CC;&#x9762;&#x5199;&#x4E1C;&#x897F;,&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x7528;&#x63D2;&#x69FD;
   &lt;/alert-box&gt;
   Vue.component(<span class="hljs-string">&apos;alert-box&apos;</span>,{
       template:`<span class="javascript">
           &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&apos;demo&apos;</span>&gt;
               <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span></span>
           &lt;<span class="hljs-regexp">/div&gt;
       </span></span>`
   })
</code></pre></li><li><p>&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#x4E0E; is &#x7279;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   &lt;ul&gt;&#x3001;&lt;ol&gt;&#x3001;&lt;table&gt; &#x548C; &lt;select&gt;&#x7B49;&#x5143;&#x7D20;&#x5BF9;&#x5185;&#x90E8;&#x5143;&#x7D20;&#x6709;&#x4E25;&#x683C;&#x7684;&#x8981;&#x6C42;&#x5982;&#xFF1A;li/tr/option,&#x5982;&#x679C;&#x60F3;&#x5728;&#x8FD9;&#x4E9B;&#x5143;&#x7D20;&#x4E2D;&#x5D4C;&#x5165;&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; is &#x7279;&#x6027;&#xFF1A;
   &lt;ul&gt;
       &lt;li is=&apos;my-component&apos;&gt;&lt;/li&gt;
   &lt;/ul&gt;
   
   &#x4F7F;&#x7528; is &#x5B9E;&#x73B0;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;
   &lt;component :is=&apos;creunt&apos;&gt;&lt;/component&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>   <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>&#x3001;<span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>&#x3001;<span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span> &#x548C; <span class="hljs-tag">&lt;<span class="hljs-name">select</span>&gt;</span>&#x7B49;&#x5143;&#x7D20;&#x5BF9;&#x5185;&#x90E8;&#x5143;&#x7D20;&#x6709;&#x4E25;&#x683C;&#x7684;&#x8981;&#x6C42;&#x5982;&#xFF1A;li/tr/option,&#x5982;&#x679C;&#x60F3;&#x5728;&#x8FD9;&#x4E9B;&#x5143;&#x7D20;&#x4E2D;&#x5D4C;&#x5165;&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; is &#x7279;&#x6027;&#xFF1A;
   <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">is</span>=<span class="hljs-string">&apos;my-component&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
   
   &#x4F7F;&#x7528; is &#x5B9E;&#x73B0;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;
   <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">&apos;creunt&apos;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span></code></pre></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js2.0基础学习笔记

## 原文链接
[https://segmentfault.com/a/1190000016327775](https://segmentfault.com/a/1190000016327775)

