---
title: 面试题：你能写一个Vue的双向数据绑定吗？
hidden: true
categories: [reprint]
slug: 4da0f3f4
date: 2018-10-23 00:00:00
---

{{< raw >}}

                    
<blockquote>&#x5728;&#x76EE;&#x524D;&#x7684;&#x524D;&#x7AEF;&#x9762;&#x8BD5;&#x4E2D;&#xFF0C;vue&#x7684;&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x5DF2;&#x7ECF;&#x6210;&#x4E3A;&#x4E86;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x5BB9;&#x6613;&#x8003;&#x5230;&#x7684;&#x70B9;&#xFF0C;&#x5373;&#x4F7F;&#x4E0D;&#x80FD;&#x5F53;&#x573A;&#x5199;&#x51FA;&#x6765;&#xFF0C;&#x81F3;&#x5C11;&#x4E5F;&#x8981;&#x80FD;&#x8BF4;&#x51FA;&#x539F;&#x7406;&#x3002;&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#x6211;&#x5C06;&#x4F1A;&#x4EFF;&#x7167;vue&#x5199;&#x4E00;&#x4E2A;&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x540D;&#x5B57;&#x5C31;&#x53EB;myVue&#x5427;&#x3002;&#x7ED3;&#x5408;&#x6CE8;&#x91CA;&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x8BA9;&#x5927;&#x5BB6;&#x6709;&#x6240;&#x6536;&#x83B7;&#x3002;</blockquote>
<h2 id="articleHeader0">1&#x3001;&#x539F;&#x7406;</h2>
<p>Vue&#x7684;&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x7684;&#x539F;&#x7406;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x4E5F;&#x90FD;&#x5341;&#x5206;&#x4E86;&#x89E3;&#x4E86;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x901A;&#x8FC7;<code> Object&#x5BF9;&#x8C61;&#x7684;defineProperty&#x5C5E;&#x6027;&#xFF0C;&#x91CD;&#x5199;data&#x7684;set&#x548C;get&#x51FD;&#x6570;&#x6765;&#x5B9E;&#x73B0;&#x7684;</code>,&#x8FD9;&#x91CC;&#x5BF9;&#x539F;&#x7406;&#x4E0D;&#x505A;&#x8FC7;&#x591A;&#x63CF;&#x8FF0;&#xFF0C;&#x4E3B;&#x8981;&#x8FD8;&#x662F;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x3002;&#x4E3A;&#x4E86;&#x4F7F;&#x4EE3;&#x7801;&#x66F4;&#x52A0;&#x7684;&#x6E05;&#x6670;&#xFF0C;&#x8FD9;&#x91CC;&#x53EA;&#x4F1A;&#x5B9E;&#x73B0;&#x6700;&#x57FA;&#x672C;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x4E3B;&#x8981;&#x5B9E;&#x73B0;v-model&#xFF0C;v-bind &#x548C;v-click&#x4E09;&#x4E2A;&#x547D;&#x4EE4;&#xFF0C;&#x5176;&#x4ED6;&#x547D;&#x4EE4;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x8865;&#x5145;&#x3002;</p>
<p>&#x6DFB;&#x52A0;&#x7F51;&#x4E0A;&#x7684;&#x4E00;&#x5F20;&#x56FE;</p>
<p><span class="img-wrap"><img src="/img/remote/1460000014274845?w=730&amp;h=390" src="https://static.alili.techhttps://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">2&#x3001;&#x5B9E;&#x73B0;</h2>
<p>&#x9875;&#x9762;&#x7ED3;&#x6784;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5982;&#x4E0B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
    &lt;form&gt;
      &lt;input type=&quot;text&quot;  v-model=&quot;number&quot;&gt;
      &lt;button type=&quot;button&quot; v-click=&quot;increment&quot;&gt;&#x589E;&#x52A0;&lt;/button&gt;
    &lt;/form&gt;
    &lt;h3 v-bind=&quot;number&quot;&gt;&lt;/h3&gt;
  &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>  <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;number&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">v-click</span>=<span class="hljs-string">&quot;increment&quot;</span>&gt;</span>&#x589E;&#x52A0;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">v-bind</span>=<span class="hljs-string">&quot;number&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>&#x5305;&#x542B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1. &#x4E00;&#x4E2A;input&#xFF0C;&#x4F7F;&#x7528;v-model&#x6307;&#x4EE4;
 2. &#x4E00;&#x4E2A;button&#xFF0C;&#x4F7F;&#x7528;v-click&#x6307;&#x4EE4;
 3. &#x4E00;&#x4E2A;h3&#xFF0C;&#x4F7F;&#x7528;v-bind&#x6307;&#x4EE4;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code> <span class="hljs-number">1.</span> &#x4E00;&#x4E2A;input&#xFF0C;&#x4F7F;&#x7528;v-model&#x6307;&#x4EE4;
 <span class="hljs-number">2.</span> &#x4E00;&#x4E2A;button&#xFF0C;&#x4F7F;&#x7528;v-click&#x6307;&#x4EE4;
 <span class="hljs-number">3.</span> &#x4E00;&#x4E2A;h3&#xFF0C;&#x4F7F;&#x7528;v-bind&#x6307;&#x4EE4;&#x3002;
</code></pre>
<p>&#x6211;&#x4EEC;&#x6700;&#x540E;&#x4F1A;&#x901A;&#x8FC7;&#x7C7B;&#x4F3C;&#x4E8E;vue&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x4F7F;&#x7528;&#x6211;&#x4EEC;&#x7684;&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#xFF0C;&#x7ED3;&#x5408;&#x6211;&#x4EEC;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x6DFB;&#x52A0;&#x6CE8;&#x91CA;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new myVue({
      el:&apos;#app&apos;,
      data: {
        number: 0
      },
      methods: {
        increment: function() {
          this.number ++;
        },
      }
    })" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> myVue({
      <span class="hljs-attr">el</span>:<span class="hljs-string">&apos;#app&apos;</span>,
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">number</span>: <span class="hljs-number">0</span>
      },
      <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">increment</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">this</span>.number ++;
        },
      }
    })</code></pre>
<p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;myVue&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myVue(options) {
  
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myVue</span>(<span class="hljs-params">options</span>) </span>{
  
}</code></pre>
<p>&#x4E3A;&#x4E86;&#x521D;&#x59CB;&#x5316;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7ED9;&#x5B83;&#x6DFB;&#x52A0;&#x4E00; &#x4E2A;_init&#x5C5E;&#x6027;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myVue(options) {
  this._init(options);
}
myVue.prototype._init = function (options) {
    this.$options = options;  // options &#x4E3A;&#x4E0A;&#x9762;&#x4F7F;&#x7528;&#x65F6;&#x4F20;&#x5165;&#x7684;&#x7ED3;&#x6784;&#x4F53;&#xFF0C;&#x5305;&#x62EC;el,data,methods
    this.$el = document.querySelector(options.el); // el&#x662F; #app, this.$el&#x662F;id&#x4E3A;app&#x7684;Element&#x5143;&#x7D20;
    this.$data = options.data; // this.$data = {number: 0}
    this.$methods = options.methods;  // this.$methods = {increment: function(){}}
  }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myVue</span>(<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">this</span>._init(options);
}
myVue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
    <span class="hljs-keyword">this</span>.$options = options;  <span class="hljs-comment">// options &#x4E3A;&#x4E0A;&#x9762;&#x4F7F;&#x7528;&#x65F6;&#x4F20;&#x5165;&#x7684;&#x7ED3;&#x6784;&#x4F53;&#xFF0C;&#x5305;&#x62EC;el,data,methods</span>
    <span class="hljs-keyword">this</span>.$el = <span class="hljs-built_in">document</span>.querySelector(options.el); <span class="hljs-comment">// el&#x662F; #app, this.$el&#x662F;id&#x4E3A;app&#x7684;Element&#x5143;&#x7D20;</span>
    <span class="hljs-keyword">this</span>.$data = options.data; <span class="hljs-comment">// this.$data = {number: 0}</span>
    <span class="hljs-keyword">this</span>.$methods = options.methods;  <span class="hljs-comment">// this.$methods = {increment: function(){"}}"</span>
  }</code></pre>
<p>&#x63A5;&#x4E0B;&#x6765;&#x5B9E;&#x73B0;_obverse&#x51FD;&#x6570;&#xFF0C;&#x5BF9;data&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x91CD;&#x5199;data&#x7684;set&#x548C;get&#x51FD;&#x6570;</p>
<p>&#x5E76;&#x6539;&#x9020;_init&#x51FD;&#x6570;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" myVue.prototype._obverse = function (obj) { // obj = {number: 0}
    var value;
    for (key in obj) {  //&#x904D;&#x5386;obj&#x5BF9;&#x8C61;
      if (obj.hasOwnProperty(key)) {
        value = obj[key]; 
        if (typeof value === &apos;object&apos;) {  //&#x5982;&#x679C;&#x503C;&#x8FD8;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x5219;&#x904D;&#x5386;&#x5904;&#x7406;
          this._obverse(value);
        }
        Object.defineProperty(this.$data, key, {  //&#x5173;&#x952E;
          enumerable: true,
          configurable: true,
          get: function () {
            console.log(`&#x83B7;&#x53D6;${value}`);
            return value;
          },
          set: function (newVal) {
            console.log(`&#x66F4;&#x65B0;${newVal}`);
            if (value !== newVal) {
              value = newVal;
            }
          }
        })
      }
    }
  }
 
 myVue.prototype._init = function (options) {
    this.$options = options;
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$methods = options.methods;
   
    this._obverse(this.$data);
  }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> myVue.prototype._obverse = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{ <span class="hljs-comment">// obj = {number: 0}</span>
    <span class="hljs-keyword">var</span> value;
    <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> obj) {  <span class="hljs-comment">//&#x904D;&#x5386;obj&#x5BF9;&#x8C61;</span>
      <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
        value = obj[key]; 
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&apos;object&apos;</span>) {  <span class="hljs-comment">//&#x5982;&#x679C;&#x503C;&#x8FD8;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x5219;&#x904D;&#x5386;&#x5904;&#x7406;</span>
          <span class="hljs-keyword">this</span>._obverse(value);
        }
        <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">this</span>.$data, key, {  <span class="hljs-comment">//&#x5173;&#x952E;</span>
          enumerable: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x83B7;&#x53D6;<span class="hljs-subst">${value}</span>`</span>);
            <span class="hljs-keyword">return</span> value;
          },
          <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">newVal</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x66F4;&#x65B0;<span class="hljs-subst">${newVal}</span>`</span>);
            <span class="hljs-keyword">if</span> (value !== newVal) {
              value = newVal;
            }
          }
        })
      }
    }
  }
 
 myVue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
    <span class="hljs-keyword">this</span>.$options = options;
    <span class="hljs-keyword">this</span>.$el = <span class="hljs-built_in">document</span>.querySelector(options.el);
    <span class="hljs-keyword">this</span>.$data = options.data;
    <span class="hljs-keyword">this</span>.$methods = options.methods;
   
    <span class="hljs-keyword">this</span>._obverse(<span class="hljs-keyword">this</span>.$data);
  }</code></pre>
<p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x4E2A;&#x6307;&#x4EE4;&#x7C7B;Watcher&#xFF0C;&#x7528;&#x6765;&#x7ED1;&#x5B9A;&#x66F4;&#x65B0;&#x51FD;&#x6570;&#xFF0C;&#x5B9E;&#x73B0;&#x5BF9;DOM&#x5143;&#x7D20;&#x7684;&#x66F4;&#x65B0;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Watcher(name, el, vm, exp, attr) {
    this.name = name;         //&#x6307;&#x4EE4;&#x540D;&#x79F0;&#xFF0C;&#x4F8B;&#x5982;&#x6587;&#x672C;&#x8282;&#x70B9;&#xFF0C;&#x8BE5;&#x503C;&#x8BBE;&#x4E3A;&quot;text&quot;
    this.el = el;             //&#x6307;&#x4EE4;&#x5BF9;&#x5E94;&#x7684;DOM&#x5143;&#x7D20;
    this.vm = vm;             //&#x6307;&#x4EE4;&#x6240;&#x5C5E;myVue&#x5B9E;&#x4F8B;
    this.exp = exp;           //&#x6307;&#x4EE4;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#xFF0C;&#x672C;&#x4F8B;&#x5982;&quot;number&quot;
    this.attr = attr;         //&#x7ED1;&#x5B9A;&#x7684;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x672C;&#x4F8B;&#x4E3A;&quot;innerHTML&quot;

    this.update();
  }

  Watcher.prototype.update = function () {
    this.el[this.attr] = this.vm.$data[this.exp]; //&#x6BD4;&#x5982; H3.innerHTML = this.data.number; &#x5F53;number&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;update&#x51FD;&#x6570;&#xFF0C;&#x4FDD;&#x8BC1;&#x5BF9;&#x5E94;&#x7684;DOM&#x5185;&#x5BB9;&#x8FDB;&#x884C;&#x4E86;&#x66F4;&#x65B0;&#x3002;
  }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Watcher</span>(<span class="hljs-params">name, el, vm, exp, attr</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;         <span class="hljs-comment">//&#x6307;&#x4EE4;&#x540D;&#x79F0;&#xFF0C;&#x4F8B;&#x5982;&#x6587;&#x672C;&#x8282;&#x70B9;&#xFF0C;&#x8BE5;&#x503C;&#x8BBE;&#x4E3A;&quot;text&quot;</span>
    <span class="hljs-keyword">this</span>.el = el;             <span class="hljs-comment">//&#x6307;&#x4EE4;&#x5BF9;&#x5E94;&#x7684;DOM&#x5143;&#x7D20;</span>
    <span class="hljs-keyword">this</span>.vm = vm;             <span class="hljs-comment">//&#x6307;&#x4EE4;&#x6240;&#x5C5E;myVue&#x5B9E;&#x4F8B;</span>
    <span class="hljs-keyword">this</span>.exp = exp;           <span class="hljs-comment">//&#x6307;&#x4EE4;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#xFF0C;&#x672C;&#x4F8B;&#x5982;&quot;number&quot;</span>
    <span class="hljs-keyword">this</span>.attr = attr;         <span class="hljs-comment">//&#x7ED1;&#x5B9A;&#x7684;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x672C;&#x4F8B;&#x4E3A;&quot;innerHTML&quot;</span>

    <span class="hljs-keyword">this</span>.update();
  }

  Watcher.prototype.update = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.el[<span class="hljs-keyword">this</span>.attr] = <span class="hljs-keyword">this</span>.vm.$data[<span class="hljs-keyword">this</span>.exp]; <span class="hljs-comment">//&#x6BD4;&#x5982; H3.innerHTML = this.data.number; &#x5F53;number&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;update&#x51FD;&#x6570;&#xFF0C;&#x4FDD;&#x8BC1;&#x5BF9;&#x5E94;&#x7684;DOM&#x5185;&#x5BB9;&#x8FDB;&#x884C;&#x4E86;&#x66F4;&#x65B0;&#x3002;</span>
  }</code></pre>
<p>&#x66F4;&#x65B0;_init&#x51FD;&#x6570;&#x4EE5;&#x53CA;_obverse&#x51FD;&#x6570;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myVue.prototype._init = function (options) {
    //...
    this._binding = {};   //_binding&#x4FDD;&#x5B58;&#x7740;model&#x4E0E;view&#x7684;&#x6620;&#x5C04;&#x5173;&#x7CFB;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x524D;&#x9762;&#x5B9A;&#x4E49;&#x7684;Watcher&#x7684;&#x5B9E;&#x4F8B;&#x3002;&#x5F53;model&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x89E6;&#x53D1;&#x5176;&#x4E2D;&#x7684;&#x6307;&#x4EE4;&#x7C7B;&#x66F4;&#x65B0;&#xFF0C;&#x4FDD;&#x8BC1;view&#x4E5F;&#x80FD;&#x5B9E;&#x65F6;&#x66F4;&#x65B0;
    //...
  }
 
  myVue.prototype._obverse = function (obj) {
    //...
      if (obj.hasOwnProperty(key)) {
        this._binding[key] = {    // &#x6309;&#x7167;&#x524D;&#x9762;&#x7684;&#x6570;&#x636E;&#xFF0C;_binding = {number: _directives: []}                                                                                                                                                  
          _directives: []
        };
        //...
        var binding = this._binding[key];
        Object.defineProperty(this.$data, key, {
          //...
          set: function (newVal) {
            console.log(`&#x66F4;&#x65B0;${newVal}`);
            if (value !== newVal) {
              value = newVal;
              binding._directives.forEach(function (item) {  // &#x5F53;number&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x89E6;&#x53D1;_binding[number]._directives &#x4E2D;&#x7684;&#x7ED1;&#x5B9A;&#x7684;Watcher&#x7C7B;&#x7684;&#x66F4;&#x65B0;
                item.update();
              })
            }
          }
        })
      }
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">myVue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
    <span class="hljs-comment">//...</span>
    <span class="hljs-keyword">this</span>._binding = {};   <span class="hljs-comment">//_binding&#x4FDD;&#x5B58;&#x7740;model&#x4E0E;view&#x7684;&#x6620;&#x5C04;&#x5173;&#x7CFB;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x524D;&#x9762;&#x5B9A;&#x4E49;&#x7684;Watcher&#x7684;&#x5B9E;&#x4F8B;&#x3002;&#x5F53;model&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x89E6;&#x53D1;&#x5176;&#x4E2D;&#x7684;&#x6307;&#x4EE4;&#x7C7B;&#x66F4;&#x65B0;&#xFF0C;&#x4FDD;&#x8BC1;view&#x4E5F;&#x80FD;&#x5B9E;&#x65F6;&#x66F4;&#x65B0;</span>
    <span class="hljs-comment">//...</span>
  }
 
  myVue.prototype._obverse = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-comment">//...</span>
      <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
        <span class="hljs-keyword">this</span>._binding[key] = {    <span class="hljs-comment">// &#x6309;&#x7167;&#x524D;&#x9762;&#x7684;&#x6570;&#x636E;&#xFF0C;_binding = {number: _directives: []}                                                                                                                                                  </span>
          _directives: []
        };
        <span class="hljs-comment">//...</span>
        <span class="hljs-keyword">var</span> binding = <span class="hljs-keyword">this</span>._binding[key];
        <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">this</span>.$data, key, {
          <span class="hljs-comment">//...</span>
          set: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">newVal</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x66F4;&#x65B0;<span class="hljs-subst">${newVal}</span>`</span>);
            <span class="hljs-keyword">if</span> (value !== newVal) {
              value = newVal;
              binding._directives.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{  <span class="hljs-comment">// &#x5F53;number&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x89E6;&#x53D1;_binding[number]._directives &#x4E2D;&#x7684;&#x7ED1;&#x5B9A;&#x7684;Watcher&#x7C7B;&#x7684;&#x66F4;&#x65B0;</span>
                item.update();
              })
            }
          }
        })
      }
    }
  }</code></pre>
<p>&#x90A3;&#x4E48;&#x5982;&#x4F55;&#x5C06;view&#x4E0E;model&#x8FDB;&#x884C;&#x7ED1;&#x5B9A;&#x5462;&#xFF1F;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;_compile&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x89E3;&#x6790;&#x6211;&#x4EEC;&#x7684;&#x6307;&#x4EE4;&#xFF08;v-bind,v-model,v-clickde&#xFF09;&#x7B49;&#xFF0C;&#x5E76;&#x5728;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#x5BF9;view&#x4E0E;model&#x8FDB;&#x884C;&#x7ED1;&#x5B9A;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" myVue.prototype._init = function (options) {
   //...
    this._complie(this.$el);
  }
 
myVue.prototype._complie = function (root) { root &#x4E3A; id&#x4E3A;app&#x7684;Element&#x5143;&#x7D20;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x6839;&#x5143;&#x7D20;
    var _this = this;
    var nodes = root.children;
    for (var i = 0; i &lt; nodes.length; i++) {
      var node = nodes[i];
      if (node.children.length) {  // &#x5BF9;&#x6240;&#x6709;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x904D;&#x5386;&#xFF0C;&#x5E76;&#x8FDB;&#x884C;&#x5904;&#x7406;
        this._complie(node);
      }

      if (node.hasAttribute(&apos;v-click&apos;)) {  // &#x5982;&#x679C;&#x6709;v-click&#x5C5E;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x76D1;&#x542C;&#x5B83;&#x7684;onclick&#x4E8B;&#x4EF6;&#xFF0C;&#x89E6;&#x53D1;increment&#x4E8B;&#x4EF6;&#xFF0C;&#x5373;number++
        node.onclick = (function () {
          var attrVal = nodes[i].getAttribute(&apos;v-click&apos;);
          return _this.$methods[attrVal].bind(_this.$data);  //bind&#x662F;&#x4F7F;data&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E0E;method&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4FDD;&#x6301;&#x4E00;&#x81F4;
        })();
      }

      if (node.hasAttribute(&apos;v-model&apos;) &amp;&amp; (node.tagName == &apos;INPUT&apos; || node.tagName == &apos;TEXTAREA&apos;)) { // &#x5982;&#x679C;&#x6709;v-model&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x4E14;&#x5143;&#x7D20;&#x662F;INPUT&#x6216;&#x8005;TEXTAREA&#xFF0C;&#x6211;&#x4EEC;&#x76D1;&#x542C;&#x5B83;&#x7684;input&#x4E8B;&#x4EF6;
        node.addEventListener(&apos;input&apos;, (function(key) {  
          var attrVal = node.getAttribute(&apos;v-model&apos;);
           //_this._binding[&apos;number&apos;]._directives = [&#x4E00;&#x4E2A;Watcher&#x5B9E;&#x4F8B;]
           // &#x5176;&#x4E2D;Watcher.prototype.update = function () {
           //    node[&apos;vaule&apos;] = _this.$data[&apos;number&apos;];  &#x8FD9;&#x5C31;&#x5C06;node&#x7684;&#x503C;&#x4FDD;&#x6301;&#x4E0E;number&#x4E00;&#x81F4;
           // }
          _this._binding[attrVal]._directives.push(new Watcher(  
            &apos;input&apos;,
            node,
            _this,
            attrVal,
            &apos;value&apos;
          ))

          return function() {
            _this.$data[attrVal] =  nodes[key].value; // &#x4F7F;number &#x7684;&#x503C;&#x4E0E; node&#x7684;value&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#xFF0C;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;
          }
        })(i));
      } 

      if (node.hasAttribute(&apos;v-bind&apos;)) { // &#x5982;&#x679C;&#x6709;v-bind&#x5C5E;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x8981;&#x4F7F;node&#x7684;&#x503C;&#x53CA;&#x65F6;&#x66F4;&#x65B0;&#x4E3A;data&#x4E2D;number&#x7684;&#x503C;&#x5373;&#x53EF;
        var attrVal = node.getAttribute(&apos;v-bind&apos;);
        _this._binding[attrVal]._directives.push(new Watcher(
          &apos;text&apos;,
          node,
          _this,
          attrVal,
          &apos;innerHTML&apos;
        ))
      }
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> myVue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
   <span class="hljs-comment">//...</span>
    <span class="hljs-keyword">this</span>._complie(<span class="hljs-keyword">this</span>.$el);
  }
 
myVue.prototype._complie = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">root</span>) </span>{ root &#x4E3A; id&#x4E3A;app&#x7684;Element&#x5143;&#x7D20;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x6839;&#x5143;&#x7D20;
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> nodes = root.children;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; nodes.length; i++) {
      <span class="hljs-keyword">var</span> node = nodes[i];
      <span class="hljs-keyword">if</span> (node.children.length) {  <span class="hljs-comment">// &#x5BF9;&#x6240;&#x6709;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x904D;&#x5386;&#xFF0C;&#x5E76;&#x8FDB;&#x884C;&#x5904;&#x7406;</span>
        <span class="hljs-keyword">this</span>._complie(node);
      }

      <span class="hljs-keyword">if</span> (node.hasAttribute(<span class="hljs-string">&apos;v-click&apos;</span>)) {  <span class="hljs-comment">// &#x5982;&#x679C;&#x6709;v-click&#x5C5E;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x76D1;&#x542C;&#x5B83;&#x7684;onclick&#x4E8B;&#x4EF6;&#xFF0C;&#x89E6;&#x53D1;increment&#x4E8B;&#x4EF6;&#xFF0C;&#x5373;number++</span>
        node.onclick = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">var</span> attrVal = nodes[i].getAttribute(<span class="hljs-string">&apos;v-click&apos;</span>);
          <span class="hljs-keyword">return</span> _this.$methods[attrVal].bind(_this.$data);  <span class="hljs-comment">//bind&#x662F;&#x4F7F;data&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E0E;method&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4FDD;&#x6301;&#x4E00;&#x81F4;</span>
        })();
      }

      <span class="hljs-keyword">if</span> (node.hasAttribute(<span class="hljs-string">&apos;v-model&apos;</span>) &amp;&amp; (node.tagName == <span class="hljs-string">&apos;INPUT&apos;</span> || node.tagName == <span class="hljs-string">&apos;TEXTAREA&apos;</span>)) { <span class="hljs-comment">// &#x5982;&#x679C;&#x6709;v-model&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x4E14;&#x5143;&#x7D20;&#x662F;INPUT&#x6216;&#x8005;TEXTAREA&#xFF0C;&#x6211;&#x4EEC;&#x76D1;&#x542C;&#x5B83;&#x7684;input&#x4E8B;&#x4EF6;</span>
        node.addEventListener(<span class="hljs-string">&apos;input&apos;</span>, (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{  
          <span class="hljs-keyword">var</span> attrVal = node.getAttribute(<span class="hljs-string">&apos;v-model&apos;</span>);
           <span class="hljs-comment">//_this._binding[&apos;number&apos;]._directives = [&#x4E00;&#x4E2A;Watcher&#x5B9E;&#x4F8B;]</span>
           <span class="hljs-comment">// &#x5176;&#x4E2D;Watcher.prototype.update = function () {</span>
           <span class="hljs-comment">//    node[&apos;vaule&apos;] = _this.$data[&apos;number&apos;];  &#x8FD9;&#x5C31;&#x5C06;node&#x7684;&#x503C;&#x4FDD;&#x6301;&#x4E0E;number&#x4E00;&#x81F4;</span>
           <span class="hljs-comment">// }</span>
          _this._binding[attrVal]._directives.push(<span class="hljs-keyword">new</span> Watcher(  
            <span class="hljs-string">&apos;input&apos;</span>,
            node,
            _this,
            attrVal,
            <span class="hljs-string">&apos;value&apos;</span>
          ))

          <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            _this.$data[attrVal] =  nodes[key].value; <span class="hljs-comment">// &#x4F7F;number &#x7684;&#x503C;&#x4E0E; node&#x7684;value&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#xFF0C;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;</span>
          }
        })(i));
      } 

      <span class="hljs-keyword">if</span> (node.hasAttribute(<span class="hljs-string">&apos;v-bind&apos;</span>)) { <span class="hljs-comment">// &#x5982;&#x679C;&#x6709;v-bind&#x5C5E;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x8981;&#x4F7F;node&#x7684;&#x503C;&#x53CA;&#x65F6;&#x66F4;&#x65B0;&#x4E3A;data&#x4E2D;number&#x7684;&#x503C;&#x5373;&#x53EF;</span>
        <span class="hljs-keyword">var</span> attrVal = node.getAttribute(<span class="hljs-string">&apos;v-bind&apos;</span>);
        _this._binding[attrVal]._directives.push(<span class="hljs-keyword">new</span> Watcher(
          <span class="hljs-string">&apos;text&apos;</span>,
          node,
          _this,
          attrVal,
          <span class="hljs-string">&apos;innerHTML&apos;</span>
        ))
      }
    }
  }</code></pre>
<p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;vue&#x7684;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x529F;&#x80FD;&#xFF0C;&#x5305;&#x62EC;v-bind, v-model, v-click&#x4E09;&#x4E2A;&#x6307;&#x4EE4;&#x3002;&#x6548;&#x679C;&#x5982;&#x4E0B;&#x56FE;</p>
<p><span class="img-wrap"><img src="/img/remote/1460000014274846" src="https://static.alili.techhttps://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>&#x9644;&#x4E0A;&#x5168;&#x90E8;&#x4EE3;&#x7801;&#xFF0C;&#x4E0D;&#x5230;150&#x884C;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;head&gt;
  &lt;title&gt;myVue&lt;/title&gt;
&lt;/head&gt;
&lt;style&gt;
  #app {
    text-align: center;
  }
&lt;/style&gt;
&lt;body&gt;
  &lt;div id=&quot;app&quot;&gt;
    &lt;form&gt;
      &lt;input type=&quot;text&quot;  v-model=&quot;number&quot;&gt;
      &lt;button type=&quot;button&quot; v-click=&quot;increment&quot;&gt;&#x589E;&#x52A0;&lt;/button&gt;
    &lt;/form&gt;
    &lt;h3 v-bind=&quot;number&quot;&gt;&lt;/h3&gt;
  &lt;/div&gt;
&lt;/body&gt;

&lt;script&gt;
  function myVue(options) {
    this._init(options);
  }

  myVue.prototype._init = function (options) {
    this.$options = options;
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$methods = options.methods;

    this._binding = {};
    this._obverse(this.$data);
    this._complie(this.$el);
  }
 
  myVue.prototype._obverse = function (obj) {
    var value;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        this._binding[key] = {                                                                                                                                                          
          _directives: []
        };
        value = obj[key];
        if (typeof value === &apos;object&apos;) {
          this._obverse(value);
        }
        var binding = this._binding[key];
        Object.defineProperty(this.$data, key, {
          enumerable: true,
          configurable: true,
          get: function () {
            console.log(`&#x83B7;&#x53D6;${value}`);
            return value;
          },
          set: function (newVal) {
            console.log(`&#x66F4;&#x65B0;${newVal}`);
            if (value !== newVal) {
              value = newVal;
              binding._directives.forEach(function (item) {
                item.update();
              })
            }
          }
        })
      }
    }
  }

  myVue.prototype._complie = function (root) {
    var _this = this;
    var nodes = root.children;
    for (var i = 0; i &lt; nodes.length; i++) {
      var node = nodes[i];
      if (node.children.length) {
        this._complie(node);
      }

      if (node.hasAttribute(&apos;v-click&apos;)) {
        node.onclick = (function () {
          var attrVal = nodes[i].getAttribute(&apos;v-click&apos;);
          return _this.$methods[attrVal].bind(_this.$data);
        })();
      }

      if (node.hasAttribute(&apos;v-model&apos;) &amp;&amp; (node.tagName == &apos;INPUT&apos; || node.tagName == &apos;TEXTAREA&apos;)) {
        node.addEventListener(&apos;input&apos;, (function(key) {
          var attrVal = node.getAttribute(&apos;v-model&apos;);
          _this._binding[attrVal]._directives.push(new Watcher(
            &apos;input&apos;,
            node,
            _this,
            attrVal,
            &apos;value&apos;
          ))

          return function() {
            _this.$data[attrVal] =  nodes[key].value;
          }
        })(i));
      } 

      if (node.hasAttribute(&apos;v-bind&apos;)) {
        var attrVal = node.getAttribute(&apos;v-bind&apos;);
        _this._binding[attrVal]._directives.push(new Watcher(
          &apos;text&apos;,
          node,
          _this,
          attrVal,
          &apos;innerHTML&apos;
        ))
      }
    }
  }

  function Watcher(name, el, vm, exp, attr) {
    this.name = name;         //&#x6307;&#x4EE4;&#x540D;&#x79F0;&#xFF0C;&#x4F8B;&#x5982;&#x6587;&#x672C;&#x8282;&#x70B9;&#xFF0C;&#x8BE5;&#x503C;&#x8BBE;&#x4E3A;&quot;text&quot;
    this.el = el;             //&#x6307;&#x4EE4;&#x5BF9;&#x5E94;&#x7684;DOM&#x5143;&#x7D20;
    this.vm = vm;             //&#x6307;&#x4EE4;&#x6240;&#x5C5E;myVue&#x5B9E;&#x4F8B;
    this.exp = exp;           //&#x6307;&#x4EE4;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#xFF0C;&#x672C;&#x4F8B;&#x5982;&quot;number&quot;
    this.attr = attr;         //&#x7ED1;&#x5B9A;&#x7684;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x672C;&#x4F8B;&#x4E3A;&quot;innerHTML&quot;

    this.update();
  }

  Watcher.prototype.update = function () {
    this.el[this.attr] = this.vm.$data[this.exp];
  }

  window.onload = function() {
    var app = new myVue({
      el:&apos;#app&apos;,
      data: {
        number: 0
      },
      methods: {
        increment: function() {
          this.number ++;
        },
      }
    })
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;!DOCTYPE html&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>myVue<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></span>
&lt;style&gt;
  #app {
    text-align: center;
  }
&lt;<span class="hljs-regexp">/style&gt;
&lt;body&gt;
  &lt;div id=&quot;app&quot;&gt;
    &lt;form&gt;
      &lt;input type=&quot;text&quot;  v-model=&quot;number&quot;&gt;
      &lt;button type=&quot;button&quot; v-click=&quot;increment&quot;&gt;&#x589E;&#x52A0;&lt;/</span>button&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
    &lt;h3 v-bind=<span class="hljs-string">&quot;number&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/div&gt;
&lt;/</span>body&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myVue</span>(<span class="hljs-params">options</span>) </span>{
    <span class="hljs-keyword">this</span>._init(options);
  }

  myVue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
    <span class="hljs-keyword">this</span>.$options = options;
    <span class="hljs-keyword">this</span>.$el = <span class="hljs-built_in">document</span>.querySelector(options.el);
    <span class="hljs-keyword">this</span>.$data = options.data;
    <span class="hljs-keyword">this</span>.$methods = options.methods;

    <span class="hljs-keyword">this</span>._binding = {};
    <span class="hljs-keyword">this</span>._obverse(<span class="hljs-keyword">this</span>.$data);
    <span class="hljs-keyword">this</span>._complie(<span class="hljs-keyword">this</span>.$el);
  }
 
  myVue.prototype._obverse = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> value;
    <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> obj) {
      <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
        <span class="hljs-keyword">this</span>._binding[key] = {                                                                                                                                                          
          <span class="hljs-attr">_directives</span>: []
        };
        value = obj[key];
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&apos;object&apos;</span>) {
          <span class="hljs-keyword">this</span>._obverse(value);
        }
        <span class="hljs-keyword">var</span> binding = <span class="hljs-keyword">this</span>._binding[key];
        <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">this</span>.$data, key, {
          <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x83B7;&#x53D6;<span class="hljs-subst">${value}</span>`</span>);
            <span class="hljs-keyword">return</span> value;
          },
          <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">newVal</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x66F4;&#x65B0;<span class="hljs-subst">${newVal}</span>`</span>);
            <span class="hljs-keyword">if</span> (value !== newVal) {
              value = newVal;
              binding._directives.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
                item.update();
              })
            }
          }
        })
      }
    }
  }

  myVue.prototype._complie = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">root</span>) </span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> nodes = root.children;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; nodes.length; i++) {
      <span class="hljs-keyword">var</span> node = nodes[i];
      <span class="hljs-keyword">if</span> (node.children.length) {
        <span class="hljs-keyword">this</span>._complie(node);
      }

      <span class="hljs-keyword">if</span> (node.hasAttribute(<span class="hljs-string">&apos;v-click&apos;</span>)) {
        node.onclick = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">var</span> attrVal = nodes[i].getAttribute(<span class="hljs-string">&apos;v-click&apos;</span>);
          <span class="hljs-keyword">return</span> _this.$methods[attrVal].bind(_this.$data);
        })();
      }

      <span class="hljs-keyword">if</span> (node.hasAttribute(<span class="hljs-string">&apos;v-model&apos;</span>) &amp;&amp; (node.tagName == <span class="hljs-string">&apos;INPUT&apos;</span> || node.tagName == <span class="hljs-string">&apos;TEXTAREA&apos;</span>)) {
        node.addEventListener(<span class="hljs-string">&apos;input&apos;</span>, (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{
          <span class="hljs-keyword">var</span> attrVal = node.getAttribute(<span class="hljs-string">&apos;v-model&apos;</span>);
          _this._binding[attrVal]._directives.push(<span class="hljs-keyword">new</span> Watcher(
            <span class="hljs-string">&apos;input&apos;</span>,
            node,
            _this,
            attrVal,
            <span class="hljs-string">&apos;value&apos;</span>
          ))

          <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            _this.$data[attrVal] =  nodes[key].value;
          }
        })(i));
      } 

      <span class="hljs-keyword">if</span> (node.hasAttribute(<span class="hljs-string">&apos;v-bind&apos;</span>)) {
        <span class="hljs-keyword">var</span> attrVal = node.getAttribute(<span class="hljs-string">&apos;v-bind&apos;</span>);
        _this._binding[attrVal]._directives.push(<span class="hljs-keyword">new</span> Watcher(
          <span class="hljs-string">&apos;text&apos;</span>,
          node,
          _this,
          attrVal,
          <span class="hljs-string">&apos;innerHTML&apos;</span>
        ))
      }
    }
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Watcher</span>(<span class="hljs-params">name, el, vm, exp, attr</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;         <span class="hljs-comment">//&#x6307;&#x4EE4;&#x540D;&#x79F0;&#xFF0C;&#x4F8B;&#x5982;&#x6587;&#x672C;&#x8282;&#x70B9;&#xFF0C;&#x8BE5;&#x503C;&#x8BBE;&#x4E3A;&quot;text&quot;</span>
    <span class="hljs-keyword">this</span>.el = el;             <span class="hljs-comment">//&#x6307;&#x4EE4;&#x5BF9;&#x5E94;&#x7684;DOM&#x5143;&#x7D20;</span>
    <span class="hljs-keyword">this</span>.vm = vm;             <span class="hljs-comment">//&#x6307;&#x4EE4;&#x6240;&#x5C5E;myVue&#x5B9E;&#x4F8B;</span>
    <span class="hljs-keyword">this</span>.exp = exp;           <span class="hljs-comment">//&#x6307;&#x4EE4;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#xFF0C;&#x672C;&#x4F8B;&#x5982;&quot;number&quot;</span>
    <span class="hljs-keyword">this</span>.attr = attr;         <span class="hljs-comment">//&#x7ED1;&#x5B9A;&#x7684;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x672C;&#x4F8B;&#x4E3A;&quot;innerHTML&quot;</span>

    <span class="hljs-keyword">this</span>.update();
  }

  Watcher.prototype.update = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.el[<span class="hljs-keyword">this</span>.attr] = <span class="hljs-keyword">this</span>.vm.$data[<span class="hljs-keyword">this</span>.exp];
  }

  <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> myVue({
      <span class="hljs-attr">el</span>:<span class="hljs-string">&apos;#app&apos;</span>,
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">number</span>: <span class="hljs-number">0</span>
      },
      <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">increment</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">this</span>.number ++;
        },
      }
    })
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>&#x5982;&#x679C;&#x559C;&#x6B22;&#x8BF7;&#x5173;&#x6CE8;&#x6211;&#x7684;<a href="https://github.com/louzhedong/blog" rel="nofollow noreferrer" target="_blank">Github</a>&#xFF0C;&#x7ED9;&#x4E2A;<a href="https://github.com/louzhedong/blog" rel="nofollow noreferrer" target="_blank">Star</a>&#x5427;&#xFF0C;&#x6211;&#x4F1A;&#x5B9A;&#x671F;&#x5206;&#x4EAB;&#x4E00;&#x4E9B;JS&#x4E2D;&#x7684;&#x77E5;&#x8BC6;&#xFF0C;^_^</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
面试题：你能写一个Vue的双向数据绑定吗？

## 原文链接
[https://segmentfault.com/a/1190000014274840](https://segmentfault.com/a/1190000014274840)

