---
title: 'vue中extend，mixins，extends，components,install的几个操作' 
date: 2018-11-23 2:30:11
hidden: true
slug: zcqp0hxx1kp
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><blockquote>&#x4F60;&#x77E5;&#x9053;extend,mixins,extends&#xFF0C;components,install&#x7528;&#x6CD5;&#x5417;?<br>&#x4F60;&#x77E5;&#x9053;&#x4ED6;&#x4EEC;&#x7684;&#x533A;&#x522B;&#x5417;?<br>&#x4F60;&#x77E5;&#x9053;&#x4ED6;&#x4EEC;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x561B;?<br>&#x4E0B;&#x9762;&#x90FD;&#x80FD;&#x627E;&#x5230;&#x8FD9;&#x4E9B;&#x7B54;&#x6848;.</blockquote><h2 id="articleHeader1">1.Vue.extend</h2><p>1.&#x4F7F;&#x7528;vue&#x6784;&#x9020;&#x5668;,&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5B50;&#x7C7B;,&#x53C2;&#x6570;&#x662F;&#x5305;&#x542B;&#x7EC4;&#x4EF6;&#x9009;&#x9879;&#x7684;&#x5BF9;&#x8C61;;<br>2.&#x662F;&#x5168;&#x5C40;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;&#x6784;&#x9020;&#x5668;
var Profile = Vue.extend({
  template: &apos;&lt;p&gt;"{{"extendData"}}"&lt;/br&gt;&#x5B9E;&#x4F8B;&#x4F20;&#x5165;&#x7684;&#x6570;&#x636E;&#x4E3A;:"{{"propsExtend"}}"&lt;/p&gt;&apos;,//template&#x5BF9;&#x5E94;&#x7684;&#x6807;&#x7B7E;&#x6700;&#x5916;&#x5C42;&#x5FC5;&#x987B;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x6807;&#x7B7E;
  data: function () {
    return {
      extendData: &apos;&#x8FD9;&#x662F;extend&#x6269;&#x5C55;&#x7684;&#x6570;&#x636E;&apos;,
    }
  },
  props:[&apos;propsExtend&apos;]
})
// &#x521B;&#x5EFA; Profile &#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x6302;&#x8F7D;&#x5230;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E0A;&#x3002;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;propsData&#x4F20;&#x53C2;.
new Profile({propsData:{propsExtend:&apos;&#x6211;&#x662F;&#x5B9E;&#x4F8B;&#x4F20;&#x5165;&#x7684;&#x6570;&#x636E;&apos;"}}").$mount(&apos;#app-extend&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-comment">// &#x521B;&#x5EFA;&#x6784;&#x9020;&#x5668;</span>
<span class="hljs-keyword">var</span> Profile = Vue.extend({
  template: <span class="hljs-string">&apos;&lt;p&gt;"{{"extendData"}}"&lt;/br&gt;&#x5B9E;&#x4F8B;&#x4F20;&#x5165;&#x7684;&#x6570;&#x636E;&#x4E3A;:"{{"propsExtend"}}"&lt;/p&gt;&apos;</span>,<span class="hljs-comment">//template&#x5BF9;&#x5E94;&#x7684;&#x6807;&#x7B7E;&#x6700;&#x5916;&#x5C42;&#x5FC5;&#x987B;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x6807;&#x7B7E;</span>
  data: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> {
      extendData: <span class="hljs-string">&apos;&#x8FD9;&#x662F;extend&#x6269;&#x5C55;&#x7684;&#x6570;&#x636E;&apos;</span>,
    }
  },
  props:[<span class="hljs-string">&apos;propsExtend&apos;</span>]
})
<span class="hljs-comment">// &#x521B;&#x5EFA; Profile &#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x6302;&#x8F7D;&#x5230;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E0A;&#x3002;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;propsData&#x4F20;&#x53C2;.</span>
<span class="hljs-keyword">new</span> Profile({propsData:{propsExtend:<span class="hljs-string">&apos;&#x6211;&#x662F;&#x5B9E;&#x4F8B;&#x4F20;&#x5165;&#x7684;&#x6570;&#x636E;&apos;</span>"}}").$mount(<span class="hljs-string">&apos;#app-extend&apos;</span>)</code></pre><p>&#x7ED3;&#x8BBA;:<br>Vue.extend&#x5B9E;&#x9645;&#x662F;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x5668;,&#x5BF9;&#x5E94;&#x7684;&#x521D;&#x59CB;&#x5316;&#x6784;&#x9020;&#x5668;,&#x5E76;&#x5C06;&#x5176;&#x6302;&#x8F7D;&#x5230;&#x6807;&#x7B7E;&#x4E0A;</p><p><a href="https://github.com/lanzhsh/vue-api" rel="nofollow noreferrer" target="_blank">github&#x6E90;&#x7801;,&#x8BF7;&#x6233;&#x8FD9;&#x91CC;</a> ,&#x6B22;&#x8FCE;star</p><h2 id="articleHeader2">2.Vue.component</h2><p>1.&#x5C06;&#x901A;&#x8FC7; Vue.extend &#x751F;&#x6210;&#x7684;&#x6269;&#x5C55;&#x5B9E;&#x4F8B;&#x6784;&#x9020;&#x5668;&#x6CE8;&#x518C;&#xFF08;&#x547D;&#x540D;&#xFF09;&#x4E3A;&#x4E00;&#x4E2A;<strong>&#x5168;&#x5C40;</strong>&#x7EC4;&#x4EF6;,&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x662F;Vue.extend()&#x6269;&#x5C55;&#x7684;&#x5B9E;&#x4F8B;,&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;(&#x4F1A;&#x81EA;&#x52A8;&#x8C03;&#x7528;extend&#x65B9;&#x6CD5;)<br>2.&#x4E24;&#x4E2A;&#x53C2;&#x6570;,&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x540D;,&#x4E00;&#x4E2A;extend&#x6784;&#x9020;&#x5668;&#x6216;&#x8005;&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1.&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668;
  var obj = {
    props: [],
    template: &apos;&lt;div&gt;&lt;p&gt;"{{"extendData"}}"&lt;/p&gt;&lt;/div&gt;&apos;,//&#x6700;&#x5916;&#x5C42;&#x53EA;&#x80FD;&#x6709;&#x4E00;&#x4E2A;&#x5927;&#x76D2;&#x5B50;,&#x8FD9;&#x4E2A;&#x548C;&lt;tempalte&gt;&#x5BF9;&#x5E94;&#x89C4;&#x5219;&#x4E00;&#x81F4;
    data: function () {
      return {
        extendData: &apos;&#x8FD9;&#x662F;Vue.component&#x4F20;&#x5165;Vue.extend&#x6CE8;&#x518C;&#x7684;&#x7EC4;&#x4EF6;&apos;,
      }
    },
  };

  var Profile = Vue.extend(obj);

  //2.&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x65B9;&#x6CD5;&#x4E00;:&#x4F20;&#x5165;Vue.extend&#x6269;&#x5C55;&#x8FC7;&#x5F97;&#x6784;&#x9020;&#x5668;
  Vue.component(&apos;component-one&apos;, Profile)

  //2.&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x65B9;&#x6CD5;&#x4E8C;:&#x76F4;&#x63A5;&#x4F20;&#x5165;
  Vue.component(&apos;component-two&apos;, obj)

  //3.&#x6302;&#x8F7D;
  new Vue({
    el: &apos;#app&apos;
  });

  //&#x83B7;&#x53D6;&#x6CE8;&#x518C;&#x7684;&#x7EC4;&#x4EF6; (&#x59CB;&#x7EC8;&#x8FD4;&#x56DE;&#x6784;&#x9020;&#x5668;)
  var oneComponent=Vue.component(&apos;component-one&apos;);
  console.log(oneComponent===Profile)//true,&#x8FD4;&#x56DE;&#x7684;Profile&#x6784;&#x9020;&#x5668;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//1.&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668;</span>
  <span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">props</span>: [],
    <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div&gt;&lt;p&gt;"{{"extendData"}}"&lt;/p&gt;&lt;/div&gt;&apos;</span>,<span class="hljs-comment">//&#x6700;&#x5916;&#x5C42;&#x53EA;&#x80FD;&#x6709;&#x4E00;&#x4E2A;&#x5927;&#x76D2;&#x5B50;,&#x8FD9;&#x4E2A;&#x548C;&lt;tempalte&gt;&#x5BF9;&#x5E94;&#x89C4;&#x5219;&#x4E00;&#x81F4;</span>
    data: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">extendData</span>: <span class="hljs-string">&apos;&#x8FD9;&#x662F;Vue.component&#x4F20;&#x5165;Vue.extend&#x6CE8;&#x518C;&#x7684;&#x7EC4;&#x4EF6;&apos;</span>,
      }
    },
  };

  <span class="hljs-keyword">var</span> Profile = Vue.extend(obj);

  <span class="hljs-comment">//2.&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x65B9;&#x6CD5;&#x4E00;:&#x4F20;&#x5165;Vue.extend&#x6269;&#x5C55;&#x8FC7;&#x5F97;&#x6784;&#x9020;&#x5668;</span>
  Vue.component(<span class="hljs-string">&apos;component-one&apos;</span>, Profile)

  <span class="hljs-comment">//2.&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x65B9;&#x6CD5;&#x4E8C;:&#x76F4;&#x63A5;&#x4F20;&#x5165;</span>
  Vue.component(<span class="hljs-string">&apos;component-two&apos;</span>, obj)

  <span class="hljs-comment">//3.&#x6302;&#x8F7D;</span>
  <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>
  });

  <span class="hljs-comment">//&#x83B7;&#x53D6;&#x6CE8;&#x518C;&#x7684;&#x7EC4;&#x4EF6; (&#x59CB;&#x7EC8;&#x8FD4;&#x56DE;&#x6784;&#x9020;&#x5668;)</span>
  <span class="hljs-keyword">var</span> oneComponent=Vue.component(<span class="hljs-string">&apos;component-one&apos;</span>);
  <span class="hljs-built_in">console</span>.log(oneComponent===Profile)<span class="hljs-comment">//true,&#x8FD4;&#x56DE;&#x7684;Profile&#x6784;&#x9020;&#x5668;</span></code></pre><h2 id="articleHeader3">3.mixins</h2><p>&#x503C;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x6DF7;&#x5408;&#x5BF9;&#x8C61;&#x6570;&#x7EC4;,&#x6DF7;&#x5408;&#x5B9E;&#x4F8B;&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x9009;&#x9879;,&#x5C06;&#x5728;extend&#x5C06;&#x76F8;&#x540C;&#x7684;&#x9009;&#x9879;&#x5408;&#x5E76;<br>mixins&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var mixin={
    data:{mixinData:&apos;&#x6211;&#x662F;mixin&#x7684;data&apos;},
    created:function(){
      console.log(&apos;&#x8FD9;&#x662F;mixin&#x7684;created&apos;);
    },
    methods:{
      getSum:function(){
        console.log(&apos;&#x8FD9;&#x662F;mixin&#x7684;getSum&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;&apos;);
      }
    }
  }

  var mixinTwo={
    data:{mixinData:&apos;&#x6211;&#x662F;mixinTwo&#x7684;data&apos;},
    created:function(){
      console.log(&apos;&#x8FD9;&#x662F;mixinTwo&#x7684;created&apos;);
    },
    methods:{
      getSum:function(){
        console.log(&apos;&#x8FD9;&#x662F;mixinTwo&#x7684;getSum&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;&apos;);
      }
    }
  } 

  var vm=new Vue({
    el:&apos;#app&apos;,
    data:{mixinData:&apos;&#x6211;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;data&apos;},
    created:function(){
      console.log(&apos;&#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;created&apos;);
    },
    methods:{
      getSum:function(){
        console.log(&apos;&#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x91CC;&#x9762;getSum&#x7684;&#x65B9;&#x6CD5;&apos;);
      }
    },
    mixins:[mixin,mixinTwo]
  })
  
  //&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A;:
  &#x8FD9;&#x662F;mixin&#x7684;created
  &#x8FD9;&#x662F;mixinTwo&#x7684;created
  &#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;created
  &#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x91CC;&#x9762;getSum&#x7684;&#x65B9;&#x6CD5;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> mixin={
    <span class="hljs-attr">data</span>:{<span class="hljs-attr">mixinData</span>:<span class="hljs-string">&apos;&#x6211;&#x662F;mixin&#x7684;data&apos;</span>},
    <span class="hljs-attr">created</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8FD9;&#x662F;mixin&#x7684;created&apos;</span>);
    },
    <span class="hljs-attr">methods</span>:{
      <span class="hljs-attr">getSum</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8FD9;&#x662F;mixin&#x7684;getSum&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;&apos;</span>);
      }
    }
  }

  <span class="hljs-keyword">var</span> mixinTwo={
    <span class="hljs-attr">data</span>:{<span class="hljs-attr">mixinData</span>:<span class="hljs-string">&apos;&#x6211;&#x662F;mixinTwo&#x7684;data&apos;</span>},
    <span class="hljs-attr">created</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8FD9;&#x662F;mixinTwo&#x7684;created&apos;</span>);
    },
    <span class="hljs-attr">methods</span>:{
      <span class="hljs-attr">getSum</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8FD9;&#x662F;mixinTwo&#x7684;getSum&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;&apos;</span>);
      }
    }
  } 

  <span class="hljs-keyword">var</span> vm=<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>:{<span class="hljs-attr">mixinData</span>:<span class="hljs-string">&apos;&#x6211;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;data&apos;</span>},
    <span class="hljs-attr">created</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;created&apos;</span>);
    },
    <span class="hljs-attr">methods</span>:{
      <span class="hljs-attr">getSum</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x91CC;&#x9762;getSum&#x7684;&#x65B9;&#x6CD5;&apos;</span>);
      }
    },
    <span class="hljs-attr">mixins</span>:[mixin,mixinTwo]
  })
  
  <span class="hljs-comment">//&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A;:</span>
  &#x8FD9;&#x662F;mixin&#x7684;created
  &#x8FD9;&#x662F;mixinTwo&#x7684;created
  &#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;created
  &#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x91CC;&#x9762;getSum&#x7684;&#x65B9;&#x6CD5;</code></pre><p>&#x7ED3;&#x8BBA;:<br>1.mixins&#x6267;&#x884C;&#x7684;&#x987A;&#x5E8F;&#x4E3A;mixins&gt;mixinTwo&gt;created(vue&#x5B9E;&#x4F8B;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;);<br>2.&#x9009;&#x9879;&#x4E2D;&#x6570;&#x636E;&#x5C5E;&#x6027;&#x5982;data,methods,&#x540E;&#x9762;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8986;&#x76D6;&#x524D;&#x9762;&#x7684;,&#x800C;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x90FD;&#x4F1A;&#x6267;&#x884C;</p><h2 id="articleHeader4">3.extends</h2><p>extends&#x7528;&#x6CD5;&#x548C;mixins&#x5F88;&#x76F8;&#x4F3C;,&#x53EA;&#x4E0D;&#x8FC7;&#x63A5;&#x6536;&#x7684;&#x53C2;&#x6570;&#x662F;&#x7B80;&#x5355;&#x7684;&#x9009;&#x9879;&#x5BF9;&#x8C61;&#x6216;&#x6784;&#x9020;&#x51FD;&#x6570;,&#x6240;&#x4EE5;extends&#x53EA;&#x80FD;&#x5355;&#x6B21;&#x6269;&#x5C55;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var extend={
    data:{extendData:&apos;&#x6211;&#x662F;extend&#x7684;data&apos;},
    created:function(){
      console.log(&apos;&#x8FD9;&#x662F;extend&#x7684;created&apos;);
    },
    methods:{
      getSum:function(){
        console.log(&apos;&#x8FD9;&#x662F;extend&#x7684;getSum&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;&apos;);
      }
    }
  }

  var mixin={
    data:{mixinData:&apos;&#x6211;&#x662F;mixin&#x7684;data&apos;},
    created:function(){
      console.log(&apos;&#x8FD9;&#x662F;mixin&#x7684;created&apos;);
    },
    methods:{
      getSum:function(){
        console.log(&apos;&#x8FD9;&#x662F;mixin&#x7684;getSum&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;&apos;);
      }
    }
  }
  
    
  var vm=new Vue({
    el:&apos;#app&apos;,
    data:{mixinData:&apos;&#x6211;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;data&apos;},
    created:function(){
      console.log(&apos;&#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;created&apos;);
    },
    methods:{
      getSum:function(){
        console.log(&apos;&#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x91CC;&#x9762;getSum&#x7684;&#x65B9;&#x6CD5;&apos;);
      }
    },
    mixins:[mixin],
    extends:extend
  })
  
  //&#x6253;&#x5370;&#x7ED3;&#x679C;
  &#x8FD9;&#x662F;extend&#x7684;created
  &#x8FD9;&#x662F;mixin&#x7684;created
  &#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;created
  &#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;getSum&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> extend={
    <span class="hljs-attr">data</span>:{<span class="hljs-attr">extendData</span>:<span class="hljs-string">&apos;&#x6211;&#x662F;extend&#x7684;data&apos;</span>},
    <span class="hljs-attr">created</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8FD9;&#x662F;extend&#x7684;created&apos;</span>);
    },
    <span class="hljs-attr">methods</span>:{
      <span class="hljs-attr">getSum</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8FD9;&#x662F;extend&#x7684;getSum&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;&apos;</span>);
      }
    }
  }

  <span class="hljs-keyword">var</span> mixin={
    <span class="hljs-attr">data</span>:{<span class="hljs-attr">mixinData</span>:<span class="hljs-string">&apos;&#x6211;&#x662F;mixin&#x7684;data&apos;</span>},
    <span class="hljs-attr">created</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8FD9;&#x662F;mixin&#x7684;created&apos;</span>);
    },
    <span class="hljs-attr">methods</span>:{
      <span class="hljs-attr">getSum</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8FD9;&#x662F;mixin&#x7684;getSum&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;&apos;</span>);
      }
    }
  }
  
    
  <span class="hljs-keyword">var</span> vm=<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">&apos;#app&apos;</span>,
    <span class="hljs-attr">data</span>:{<span class="hljs-attr">mixinData</span>:<span class="hljs-string">&apos;&#x6211;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;data&apos;</span>},
    <span class="hljs-attr">created</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;created&apos;</span>);
    },
    <span class="hljs-attr">methods</span>:{
      <span class="hljs-attr">getSum</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x91CC;&#x9762;getSum&#x7684;&#x65B9;&#x6CD5;&apos;</span>);
      }
    },
    <span class="hljs-attr">mixins</span>:[mixin],
    <span class="hljs-attr">extends</span>:extend
  })
  
  <span class="hljs-comment">//&#x6253;&#x5370;&#x7ED3;&#x679C;</span>
  &#x8FD9;&#x662F;extend&#x7684;created
  &#x8FD9;&#x662F;mixin&#x7684;created
  &#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;created
  &#x8FD9;&#x662F;vue&#x5B9E;&#x4F8B;&#x7684;getSum&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;
</code></pre><p>&#x7ED3;&#x8BBA;:<br>1.extends&#x6267;&#x884C;&#x987A;&#x5E8F;&#x4E3A;:extends&gt;mixins&gt;mixinTwo&gt;created<br>2.&#x5B9A;&#x4E49;&#x7684;&#x5C5E;&#x6027;&#x8986;&#x76D6;&#x89C4;&#x5219;&#x548C;mixins&#x4E00;&#x81F4;</p><h2 id="articleHeader5">4.components</h2><p>&#x6CE8;&#x518C;&#x4E00;&#x4E2A;&#x5C40;&#x90E8;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1.&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668;
  var obj = {
    props: [],
    template: &apos;&lt;div&gt;&lt;p&gt;"{{"extendData"}}"&lt;/p&gt;&lt;/div&gt;&apos;,//&#x6700;&#x5916;&#x5C42;&#x53EA;&#x80FD;&#x6709;&#x4E00;&#x4E2A;&#x5927;&#x76D2;&#x5B50;,&#x8FD9;&#x4E2A;&#x548C;&lt;tempalte&gt;&#x5BF9;&#x5E94;&#x89C4;&#x5219;&#x4E00;&#x81F4;
    data: function () {
      return {
        extendData: &apos;&#x8FD9;&#x662F;component&#x5C40;&#x90E8;&#x6CE8;&#x518C;&#x7684;&#x7EC4;&#x4EF6;&apos;,
      }
    },
  };

  var Profile = Vue.extend(obj);
  
  //3.&#x6302;&#x8F7D;
  new Vue({
    el: &apos;#app&apos;,
    components:{
      &apos;component-one&apos;:Profile,
      &apos;component-two&apos;:obj
    }
  });
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">//1.&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668;</span>
  <span class="hljs-keyword">var</span> obj = {
    props: [],
    template: <span class="hljs-string">&apos;&lt;div&gt;&lt;p&gt;"{{"extendData"}}"&lt;/p&gt;&lt;/div&gt;&apos;</span>,<span class="hljs-comment">//&#x6700;&#x5916;&#x5C42;&#x53EA;&#x80FD;&#x6709;&#x4E00;&#x4E2A;&#x5927;&#x76D2;&#x5B50;,&#x8FD9;&#x4E2A;&#x548C;&lt;tempalte&gt;&#x5BF9;&#x5E94;&#x89C4;&#x5219;&#x4E00;&#x81F4;</span>
    data: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">return</span> {
        extendData: <span class="hljs-string">&apos;&#x8FD9;&#x662F;component&#x5C40;&#x90E8;&#x6CE8;&#x518C;&#x7684;&#x7EC4;&#x4EF6;&apos;</span>,
      }
    },
  };

  <span class="hljs-keyword">var</span> Profile = Vue.extend(obj);
  
  <span class="hljs-comment">//3.&#x6302;&#x8F7D;</span>
  <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">&apos;#app&apos;</span>,
    components:{
      <span class="hljs-string">&apos;component-one&apos;</span>:Profile,
      <span class="hljs-string">&apos;component-two&apos;</span>:obj
    }
  });
</code></pre><h2 id="articleHeader6">5.install</h2><p>1.&#x662F;&#x5F00;&#x53D1;vue&#x7684;&#x63D2;&#x4EF6;,&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F; Vue &#x6784;&#x9020;&#x5668;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x9009;&#x7684;&#x9009;&#x9879;&#x5BF9;&#x8C61;(&#x53EF;&#x9009;)<br>2.vue.use&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x8C03;&#x7528;install&#x65B9;&#x6CD5;,&#x4F1A;&#x81EA;&#x52A8;&#x963B;&#x6B62;&#x591A;&#x6B21;&#x6CE8;&#x518C;&#x76F8;&#x540C;&#x63D2;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var MyPlugin = {};
  MyPlugin.install = function (Vue, options) {
    // 2. &#x6DFB;&#x52A0;&#x5168;&#x5C40;&#x8D44;&#x6E90;,&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4F20;&#x4E00;&#x4E2A;&#x503C;&#x9ED8;&#x8BA4;&#x662F;update&#x5BF9;&#x5E94;&#x7684;&#x503C;
    Vue.directive(&apos;click&apos;, {
      bind(el, binding, vnode, oldVnode) {
        //&#x505A;&#x7ED1;&#x5B9A;&#x7684;&#x51C6;&#x5907;&#x5DE5;&#x4F5C;,&#x6DFB;&#x52A0;&#x65F6;&#x95F4;&#x76D1;&#x542C;
        console.log(&apos;&#x6307;&#x4EE4;my-directive&#x7684;bind&#x6267;&#x884C;&#x5566;&apos;);
      },
      inserted: function(el){
      //&#x83B7;&#x53D6;&#x7ED1;&#x5B9A;&#x7684;&#x5143;&#x7D20;
      console.log(&apos;&#x6307;&#x4EE4;my-directive&#x7684;inserted&#x6267;&#x884C;&#x5566;&apos;);
      },
      update: function(){
      //&#x6839;&#x636E;&#x83B7;&#x5F97;&#x7684;&#x65B0;&#x503C;&#x6267;&#x884C;&#x5BF9;&#x5E94;&#x7684;&#x66F4;&#x65B0;
      //&#x5BF9;&#x4E8E;&#x521D;&#x59CB;&#x503C;&#x4E5F;&#x4F1A;&#x8C03;&#x7528;&#x4E00;&#x6B21;
      console.log(&apos;&#x6307;&#x4EE4;my-directive&#x7684;update&#x6267;&#x884C;&#x5566;&apos;);
      },
      componentUpdated: function(){
      console.log(&apos;&#x6307;&#x4EE4;my-directive&#x7684;componentUpdated&#x6267;&#x884C;&#x5566;&apos;);
      },
      unbind: function(){
      //&#x505A;&#x6E05;&#x7406;&#x64CD;&#x4F5C;
      //&#x6BD4;&#x5982;&#x79FB;&#x9664;bind&#x65F6;&#x7ED1;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;
      console.log(&apos;&#x6307;&#x4EE4;my-directive&#x7684;unbind&#x6267;&#x884C;&#x5566;&apos;);
      }
    })

    // 3. &#x6CE8;&#x5165;&#x7EC4;&#x4EF6;
    Vue.mixin({
      created: function () {
        console.log(&apos;&#x6CE8;&#x5165;&#x7EC4;&#x4EF6;&#x7684;created&#x88AB;&#x8C03;&#x7528;&#x5566;&apos;);
        console.log(&apos;options&#x7684;&#x503C;&#x4E3A;&apos;,options)
      }
    })

    // 4. &#x6DFB;&#x52A0;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;
    Vue.prototype.$myMethod = function (methodOptions) {
      console.log(&apos;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;myMethod&#x88AB;&#x8C03;&#x7528;&#x5566;&apos;);
    }
  }

  //&#x8C03;&#x7528;MyPlugin
  Vue.use(MyPlugin,{someOption: true })

  //3.&#x6302;&#x8F7D;
  new Vue({
    el: &apos;#app&apos;
  });
  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> MyPlugin = {};
  MyPlugin.install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue, options</span>) </span>{
    <span class="hljs-comment">// 2. &#x6DFB;&#x52A0;&#x5168;&#x5C40;&#x8D44;&#x6E90;,&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4F20;&#x4E00;&#x4E2A;&#x503C;&#x9ED8;&#x8BA4;&#x662F;update&#x5BF9;&#x5E94;&#x7684;&#x503C;</span>
    Vue.directive(<span class="hljs-string">&apos;click&apos;</span>, {
      bind(el, binding, vnode, oldVnode) {
        <span class="hljs-comment">//&#x505A;&#x7ED1;&#x5B9A;&#x7684;&#x51C6;&#x5907;&#x5DE5;&#x4F5C;,&#x6DFB;&#x52A0;&#x65F6;&#x95F4;&#x76D1;&#x542C;</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6307;&#x4EE4;my-directive&#x7684;bind&#x6267;&#x884C;&#x5566;&apos;</span>);
      },
      <span class="hljs-attr">inserted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{
      <span class="hljs-comment">//&#x83B7;&#x53D6;&#x7ED1;&#x5B9A;&#x7684;&#x5143;&#x7D20;</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6307;&#x4EE4;my-directive&#x7684;inserted&#x6267;&#x884C;&#x5566;&apos;</span>);
      },
      <span class="hljs-attr">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-comment">//&#x6839;&#x636E;&#x83B7;&#x5F97;&#x7684;&#x65B0;&#x503C;&#x6267;&#x884C;&#x5BF9;&#x5E94;&#x7684;&#x66F4;&#x65B0;</span>
      <span class="hljs-comment">//&#x5BF9;&#x4E8E;&#x521D;&#x59CB;&#x503C;&#x4E5F;&#x4F1A;&#x8C03;&#x7528;&#x4E00;&#x6B21;</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6307;&#x4EE4;my-directive&#x7684;update&#x6267;&#x884C;&#x5566;&apos;</span>);
      },
      <span class="hljs-attr">componentUpdated</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6307;&#x4EE4;my-directive&#x7684;componentUpdated&#x6267;&#x884C;&#x5566;&apos;</span>);
      },
      <span class="hljs-attr">unbind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-comment">//&#x505A;&#x6E05;&#x7406;&#x64CD;&#x4F5C;</span>
      <span class="hljs-comment">//&#x6BD4;&#x5982;&#x79FB;&#x9664;bind&#x65F6;&#x7ED1;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6307;&#x4EE4;my-directive&#x7684;unbind&#x6267;&#x884C;&#x5566;&apos;</span>);
      }
    })

    <span class="hljs-comment">// 3. &#x6CE8;&#x5165;&#x7EC4;&#x4EF6;</span>
    Vue.mixin({
      <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6CE8;&#x5165;&#x7EC4;&#x4EF6;&#x7684;created&#x88AB;&#x8C03;&#x7528;&#x5566;&apos;</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;options&#x7684;&#x503C;&#x4E3A;&apos;</span>,options)
      }
    })

    <span class="hljs-comment">// 4. &#x6DFB;&#x52A0;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;</span>
    Vue.prototype.$myMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">methodOptions</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;myMethod&#x88AB;&#x8C03;&#x7528;&#x5566;&apos;</span>);
    }
  }

  <span class="hljs-comment">//&#x8C03;&#x7528;MyPlugin</span>
  Vue.use(MyPlugin,{<span class="hljs-attr">someOption</span>: <span class="hljs-literal">true</span> })

  <span class="hljs-comment">//3.&#x6302;&#x8F7D;</span>
  <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>
  });
  </code></pre><h2 id="articleHeader7">6.&#x5404;&#x4E2A;&#x65B9;&#x6CD5;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;</h2><blockquote>Vue.extend&#x548C;Vue.component&#x662F;&#x4E3A;&#x4E86;&#x521B;&#x5EFA;&#x6784;&#x9020;&#x5668;&#x548C;&#x7EC4;&#x4EF6;;<br>mixins&#x548C;extends&#x662F;&#x4E3A;&#x4E86;&#x62D3;&#x5C55;&#x7EC4;&#x4EF6;;<br>install&#x662F;&#x5F00;&#x53D1;&#x63D2;&#x4EF6;; &#x603B;&#x7684;&#x987A;&#x5E8F;&#x5173;&#x7CFB;: Vue.extend&gt;Vue.component&gt;extends&gt;mixins</blockquote><p><a href="https://github.com/lanzhsh/vue-api" rel="nofollow noreferrer" target="_blank">github&#x6E90;&#x7801;,&#x8BF7;&#x6233;&#x8FD9;&#x91CC;</a>,&#x6B22;&#x8FCE;star</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue中extend，mixins，extends，components,install的几个操作

## 原文链接
[https://segmentfault.com/a/1190000015608340](https://segmentfault.com/a/1190000015608340)

