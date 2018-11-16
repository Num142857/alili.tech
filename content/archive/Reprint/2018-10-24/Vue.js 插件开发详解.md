---
title: Vue.js 插件开发详解
hidden: true
categories: [reprint]
slug: 4c1814ab
date: 2018-10-24 08:17:54
---

{{< raw >}}

                    
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2>
<p>&#x968F;&#x7740; Vue.js &#x8D8A;&#x6765;&#x8D8A;&#x706B;&#xFF0C;Vue.js &#x7684;&#x76F8;&#x5173;&#x63D2;&#x4EF6;&#x4E5F;&#x5728;&#x4E0D;&#x65AD;&#x7684;&#x88AB;&#x8D21;&#x732E;&#x51FA;&#x6765;&#xFF0C;&#x6570;&#x4E0D;&#x80DC;&#x6570;&#x3002;&#x6BD4;&#x5982;&#x5B98;&#x65B9;&#x63A8;&#x8350;&#x7684; vue-router&#x3001;vuex &#x7B49;&#xFF0C;&#x90FD;&#x662F;&#x975E;&#x5E38;&#x4F18;&#x79C0;&#x7684;&#x63D2;&#x4EF6;&#x3002;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x66F4;&#x591A;&#x7684;&#x4EBA;&#x8FD8;&#x53EA;&#x505C;&#x7559;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x9636;&#x6BB5;&#xFF0C;&#x6BD4;&#x8F83;&#x5C11;&#x81EA;&#x5DF1;&#x5F00;&#x53D1;&#x3002;&#x6240;&#x4EE5;&#x63A5;&#x4E0B;&#x6765;&#x4F1A;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684; vue-toast &#x63D2;&#x4EF6;&#xFF0C;&#x6765;&#x4E86;&#x89E3;&#x638C;&#x63E1;&#x63D2;&#x4EF6;&#x7684;&#x5F00;&#x53D1;&#x548C;&#x4F7F;&#x7528;&#x3002;</p>
<h2 id="articleHeader1">&#x8BA4;&#x8BC6;&#x63D2;&#x4EF6;</h2>
<p>&#x60F3;&#x8981;&#x5F00;&#x53D1;&#x63D2;&#x4EF6;&#xFF0C;&#x5148;&#x8981;&#x8BA4;&#x8BC6;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#x662F;&#x4EC0;&#x4E48;&#x6837;&#x5B50;&#x7684;&#x3002;</p>
<p>Vue.js &#x7684;&#x63D2;&#x4EF6;&#x5E94;&#x5F53;&#x6709;&#x4E00;&#x4E2A;&#x516C;&#x5F00;&#x65B9;&#x6CD5; install &#x3002;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F; Vue &#x6784;&#x9020;&#x5668; , &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x9009;&#x7684;&#x9009;&#x9879;&#x5BF9;&#x8C61;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPlugin.install = function (Vue, options) {
  Vue.myGlobalMethod = function () {  // 1. &#x6DFB;&#x52A0;&#x5168;&#x5C40;&#x65B9;&#x6CD5;&#x6216;&#x5C5E;&#x6027;&#xFF0C;&#x5982;: vue-custom-element
    // &#x903B;&#x8F91;...
  }
  Vue.directive(&apos;my-directive&apos;, {  // 2. &#x6DFB;&#x52A0;&#x5168;&#x5C40;&#x8D44;&#x6E90;&#xFF1A;&#x6307;&#x4EE4;/&#x8FC7;&#x6EE4;&#x5668;/&#x8FC7;&#x6E21;&#x7B49;&#xFF0C;&#x5982; vue-touch
    bind (el, binding, vnode, oldVnode) {
      // &#x903B;&#x8F91;...
    }
    ...
  })
  Vue.mixin({
    created: function () {  // 3. &#x901A;&#x8FC7;&#x5168;&#x5C40; mixin&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x7EC4;&#x4EF6;&#x9009;&#x9879;&#xFF0C;&#x5982;: vuex
      // &#x903B;&#x8F91;...
    }
    ...
  })
  Vue.prototype.$myMethod = function (options) {  // 4. &#x6DFB;&#x52A0;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#xFF0C;&#x901A;&#x8FC7;&#x628A;&#x5B83;&#x4EEC;&#x6DFB;&#x52A0;&#x5230; Vue.prototype &#x4E0A;&#x5B9E;&#x73B0;
    // &#x903B;&#x8F91;...
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">MyPlugin.install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue, options</span>) </span>{
  Vue.myGlobalMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  <span class="hljs-comment">// 1. &#x6DFB;&#x52A0;&#x5168;&#x5C40;&#x65B9;&#x6CD5;&#x6216;&#x5C5E;&#x6027;&#xFF0C;&#x5982;: vue-custom-element</span>
    <span class="hljs-comment">// &#x903B;&#x8F91;...</span>
  }
  Vue.directive(<span class="hljs-string">&apos;my-directive&apos;</span>, {  <span class="hljs-comment">// 2. &#x6DFB;&#x52A0;&#x5168;&#x5C40;&#x8D44;&#x6E90;&#xFF1A;&#x6307;&#x4EE4;/&#x8FC7;&#x6EE4;&#x5668;/&#x8FC7;&#x6E21;&#x7B49;&#xFF0C;&#x5982; vue-touch</span>
    bind (el, binding, vnode, oldVnode) {
      <span class="hljs-comment">// &#x903B;&#x8F91;...</span>
    }
    ...
  })
  Vue.mixin({
    <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  <span class="hljs-comment">// 3. &#x901A;&#x8FC7;&#x5168;&#x5C40; mixin&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x7EC4;&#x4EF6;&#x9009;&#x9879;&#xFF0C;&#x5982;: vuex</span>
      <span class="hljs-comment">// &#x903B;&#x8F91;...</span>
    }
    ...
  })
  Vue.prototype.$myMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{  <span class="hljs-comment">// 4. &#x6DFB;&#x52A0;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#xFF0C;&#x901A;&#x8FC7;&#x628A;&#x5B83;&#x4EEC;&#x6DFB;&#x52A0;&#x5230; Vue.prototype &#x4E0A;&#x5B9E;&#x73B0;</span>
    <span class="hljs-comment">// &#x903B;&#x8F91;...</span>
  }
}</code></pre>
<p>&#x63A5;&#x4E0B;&#x6765;&#x8981;&#x8BB2;&#x5230;&#x7684; vue-toast &#x63D2;&#x4EF6;&#x5219;&#x662F;&#x901A;&#x8FC7;&#x6DFB;&#x52A0;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x7684;&#x3002;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x4E2A;&#x5C0F;&#x4F8B;&#x5B50;&#x3002;&#x5148;&#x65B0;&#x5EFA;&#x4E2A;js&#x6587;&#x4EF6;&#x6765;&#x7F16;&#x5199;&#x63D2;&#x4EF6;&#xFF1A;toast.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// toast.js
var Toast = {};
Toast.install = function (Vue, options) {
    Vue.prototype.$msg = &apos;Hello World&apos;;
}
module.exports = Toast;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// toast.js</span>
<span class="hljs-keyword">var</span> Toast = {};
Toast.install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue, options</span>) </span>{
    Vue.prototype.$msg = <span class="hljs-string">&apos;Hello World&apos;</span>;
}
<span class="hljs-built_in">module</span>.exports = Toast;</code></pre>
<p>&#x5728; main.js &#x4E2D;&#xFF0C;&#x9700;&#x8981;&#x5BFC;&#x5165; toast.js &#x5E76;&#x4E14;&#x901A;&#x8FC7;&#x5168;&#x5C40;&#x65B9;&#x6CD5; Vue.use() &#x6765;&#x4F7F;&#x7528;&#x63D2;&#x4EF6;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import Vue from &apos;vue&apos;;
import Toast from &apos;./toast.js&apos;;
Vue.use(Toast);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> Toast <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./toast.js&apos;</span>;
Vue.use(Toast);</code></pre>
<p>&#x7136;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x6765;&#x83B7;&#x53D6;&#x8BE5;&#x63D2;&#x4EF6;&#x5B9A;&#x4E49;&#x7684; $msg &#x5C5E;&#x6027;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.vue
export default {
    mounted(){
        console.log(this.$msg);         // Hello World
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// App.vue</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    mounted(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$msg);         <span class="hljs-comment">// Hello World</span>
    }
}</code></pre>
<p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x63A7;&#x5236;&#x53F0;&#x6210;&#x529F;&#x7684;&#x6253;&#x5370;&#x51FA;&#x4E86; Hello World &#x3002;&#x65E2;&#x7136; $msg &#x80FD;&#x83B7;&#x53D6;&#x5230;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x6765;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x7684; vue-toast &#x63D2;&#x4EF6;&#x4E86;&#x3002;</p>
<h2 id="articleHeader2">&#x5F00;&#x53D1; vue-toast</h2>
<p>&#x9700;&#x6C42;&#xFF1A;&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x901A;&#x8FC7;&#x8C03;&#x7528; this.$toast(&apos;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&apos;) &#x6765;&#x5F39;&#x51FA;&#x63D0;&#x793A;&#xFF0C;&#x9ED8;&#x8BA4;&#x5728;&#x5E95;&#x90E8;&#x663E;&#x793A;&#x3002;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8C03;&#x7528; this.$toast.top() &#x6216; this.$toast.center() &#x7B49;&#x65B9;&#x6CD5;&#x6765;&#x5B9E;&#x73B0;&#x5728;&#x4E0D;&#x540C;&#x4F4D;&#x7F6E;&#x663E;&#x793A;&#x3002; </p>
<p>&#x6574;&#x7406;&#x4E00;&#x4E0B;&#x601D;&#x8DEF;&#xFF0C;&#x5F39;&#x51FA;&#x63D0;&#x793A;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x53EF;&#x4EE5;&#x5728; body &#x4E2D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A; div &#x7528;&#x6765;&#x663E;&#x793A;&#x63D0;&#x793A;&#x4FE1;&#x606F;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x4F4D;&#x7F6E;&#x6211;&#x901A;&#x8FC7;&#x6DFB;&#x52A0;&#x4E0D;&#x540C;&#x7684;&#x7C7B;&#x540D;&#x6765;&#x5B9A;&#x4F4D;&#xFF0C;&#x90A3;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x5199;&#x4E86;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// toast.js
var Toast = {};
Toast.install = function (Vue, options) {
    Vue.prototype.$toast = (tips) =&gt; {
        let toastTpl = Vue.extend({     // 1&#x3001;&#x521B;&#x5EFA;&#x6784;&#x9020;&#x5668;&#xFF0C;&#x5B9A;&#x4E49;&#x597D;&#x63D0;&#x793A;&#x4FE1;&#x606F;&#x7684;&#x6A21;&#x677F;
            template: &apos;&lt;div class=&quot;vue-toast&quot;&gt;&apos; + tips + &apos;&lt;/div&gt;&apos;
        });
        let tpl = new toastTpl().$mount().$el;  // 2&#x3001;&#x521B;&#x5EFA;&#x5B9E;&#x4F8B;&#xFF0C;&#x6302;&#x8F7D;&#x5230;&#x6587;&#x6863;&#x4EE5;&#x540E;&#x7684;&#x5730;&#x65B9;
        document.body.appendChild(tpl);     // 3&#x3001;&#x628A;&#x521B;&#x5EFA;&#x7684;&#x5B9E;&#x4F8B;&#x6DFB;&#x52A0;&#x5230;body&#x4E2D;
        setTimeout(function () {        // 4&#x3001;&#x5EF6;&#x8FDF;2.5&#x79D2;&#x540E;&#x79FB;&#x9664;&#x8BE5;&#x63D0;&#x793A;
            document.body.removeChild(tpl);
        }, 2500)
    }
}
module.exports = Toast;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// toast.js</span>
<span class="hljs-keyword">var</span> Toast = {};
Toast.install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue, options</span>) </span>{
    Vue.prototype.$toast = <span class="hljs-function">(<span class="hljs-params">tips</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> toastTpl = Vue.extend({     <span class="hljs-comment">// 1&#x3001;&#x521B;&#x5EFA;&#x6784;&#x9020;&#x5668;&#xFF0C;&#x5B9A;&#x4E49;&#x597D;&#x63D0;&#x793A;&#x4FE1;&#x606F;&#x7684;&#x6A21;&#x677F;</span>
            template: <span class="hljs-string">&apos;&lt;div class=&quot;vue-toast&quot;&gt;&apos;</span> + tips + <span class="hljs-string">&apos;&lt;/div&gt;&apos;</span>
        });
        <span class="hljs-keyword">let</span> tpl = <span class="hljs-keyword">new</span> toastTpl().$mount().$el;  <span class="hljs-comment">// 2&#x3001;&#x521B;&#x5EFA;&#x5B9E;&#x4F8B;&#xFF0C;&#x6302;&#x8F7D;&#x5230;&#x6587;&#x6863;&#x4EE5;&#x540E;&#x7684;&#x5730;&#x65B9;</span>
        <span class="hljs-built_in">document</span>.body.appendChild(tpl);     <span class="hljs-comment">// 3&#x3001;&#x628A;&#x521B;&#x5EFA;&#x7684;&#x5B9E;&#x4F8B;&#x6DFB;&#x52A0;&#x5230;body&#x4E2D;</span>
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{        <span class="hljs-comment">// 4&#x3001;&#x5EF6;&#x8FDF;2.5&#x79D2;&#x540E;&#x79FB;&#x9664;&#x8BE5;&#x63D0;&#x793A;</span>
            <span class="hljs-built_in">document</span>.body.removeChild(tpl);
        }, <span class="hljs-number">2500</span>)
    }
}
<span class="hljs-built_in">module</span>.exports = Toast;</code></pre>
<p>&#x597D;&#x50CF;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5B9E;&#x73B0;&#x4E86; this.$toast() &#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x663E;&#x793A;&#x4E0D;&#x540C;&#x4F4D;&#x7F6E;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// toast.js
[&apos;bottom&apos;, &apos;center&apos;, &apos;top&apos;].forEach(type =&gt; {
    Vue.prototype.$toast[type] = (tips) =&gt; {
        return Vue.prototype.$toast(tips,type)
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// toast.js</span>
[<span class="hljs-string">&apos;bottom&apos;</span>, <span class="hljs-string">&apos;center&apos;</span>, <span class="hljs-string">&apos;top&apos;</span>].forEach(<span class="hljs-function"><span class="hljs-params">type</span> =&gt;</span> {
    Vue.prototype.$toast[type] = <span class="hljs-function">(<span class="hljs-params">tips</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> Vue.prototype.$toast(tips,type)
    }
})</code></pre>
<p>&#x8FD9;&#x91CC;&#x628A; type &#x4F20;&#x7ED9; $toast &#x5728;&#x8BE5;&#x65B9;&#x6CD5;&#x91CC;&#x8FDB;&#x884C;&#x4E0D;&#x540C;&#x4F4D;&#x7F6E;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x4E0A;&#x9762;&#x8BF4;&#x4E86;&#x901A;&#x8FC7;&#x6DFB;&#x52A0;&#x4E0D;&#x540C;&#x7684;&#x7C7B;&#x540D;(toast-bottom&#x3001;toast-top&#x3001;toast-center)&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x90A3; $toast &#x65B9;&#x6CD5;&#x9700;&#x8981;&#x5C0F;&#x5C0F;&#x4FEE;&#x6539;&#x4E00;&#x4E0B;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.$toast = (tips,type) =&gt; {     // &#x6DFB;&#x52A0; type &#x53C2;&#x6570;
    let toastTpl = Vue.extend({             // &#x6A21;&#x677F;&#x6DFB;&#x52A0;&#x4F4D;&#x7F6E;&#x7C7B;
        template: &apos;&lt;div class=&quot;vue-toast toast-&apos;+ type +&apos;&quot;&gt;&apos; + tips + &apos;&lt;/div&gt;&apos;
    });
    ...
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.prototype.$toast = <span class="hljs-function">(<span class="hljs-params">tips,type</span>) =&gt;</span> {     <span class="hljs-comment">// &#x6DFB;&#x52A0; type &#x53C2;&#x6570;</span>
    <span class="hljs-keyword">let</span> toastTpl = Vue.extend({             <span class="hljs-comment">// &#x6A21;&#x677F;&#x6DFB;&#x52A0;&#x4F4D;&#x7F6E;&#x7C7B;</span>
        template: <span class="hljs-string">&apos;&lt;div class=&quot;vue-toast toast-&apos;</span>+ type +<span class="hljs-string">&apos;&quot;&gt;&apos;</span> + tips + <span class="hljs-string">&apos;&lt;/div&gt;&apos;</span>
    });
    ...
}</code></pre>
<p>&#x597D;&#x50CF;&#x5DEE;&#x4E0D;&#x591A;&#x4E86;&#x3002;&#x4F46;&#x662F;&#x5982;&#x679C;&#x6211;&#x60F3;&#x9ED8;&#x8BA4;&#x5728;&#x9876;&#x90E8;&#x663E;&#x793A;&#xFF0C;&#x6211;&#x6BCF;&#x6B21;&#x90FD;&#x8981;&#x8C03;&#x7528; this.$toast.top() &#x597D;&#x50CF;&#x5C31;&#x6709;&#x70B9;&#x591A;&#x4F59;&#x4E86;&#xFF0C;&#x6211;&#x80FD;&#x4E0D;&#x80FD; this.$toast() &#x5C31;&#x76F4;&#x63A5;&#x5728;&#x6211;&#x60F3;&#x8981;&#x7684;&#x5730;&#x65B9;&#x5462;&#xFF1F;&#x8FD8;&#x6709;&#x6211;&#x4E0D;&#x60F3;&#x8981; 2.5s &#x540E;&#x624D;&#x6D88;&#x5931;&#x5462;&#xFF1F;&#x8FD9;&#x65F6;&#x5019;&#x6CE8;&#x610F;&#x5230; Toast.install(Vue,options) &#x91CC;&#x7684; options &#x53C2;&#x6570;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728; Vue.use() &#x901A;&#x8FC7; options &#x4F20;&#x8FDB;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x53C2;&#x6570;&#x3002;&#x6700;&#x540E;&#x4FEE;&#x6539;&#x63D2;&#x4EF6;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Toast = {};
Toast.install = function (Vue, options) {
    let opt = {
        defaultType:&apos;bottom&apos;,   // &#x9ED8;&#x8BA4;&#x663E;&#x793A;&#x4F4D;&#x7F6E;
        duration:&apos;2500&apos;         // &#x6301;&#x7EED;&#x65F6;&#x95F4;
    }
    for(let property in options){
        opt[property] = options[property];  // &#x4F7F;&#x7528; options &#x7684;&#x914D;&#x7F6E;
    }
    Vue.prototype.$toast = (tips,type) =&gt; {
        if(type){
            opt.defaultType = type;         // &#x5982;&#x679C;&#x6709;&#x4F20;type&#xFF0C;&#x4F4D;&#x7F6E;&#x5219;&#x8BBE;&#x4E3A;&#x8BE5;type
        }
        if(document.getElementsByClassName(&apos;vue-toast&apos;).length){
            // &#x5982;&#x679C;toast&#x8FD8;&#x5728;&#xFF0C;&#x5219;&#x4E0D;&#x518D;&#x6267;&#x884C;
            return;
        }
        let toastTpl = Vue.extend({
            template: &apos;&lt;div class=&quot;vue-toast toast-&apos;+opt.defaultType+&apos;&quot;&gt;&apos; + tips + &apos;&lt;/div&gt;&apos;
        });
        let tpl = new toastTpl().$mount().$el;
        document.body.appendChild(tpl);
        setTimeout(function () {
            document.body.removeChild(tpl);
        }, opt.duration)
    }
    [&apos;bottom&apos;, &apos;center&apos;, &apos;top&apos;].forEach(type =&gt; {
        Vue.prototype.$toast[type] = (tips) =&gt; {
            return Vue.prototype.$toast(tips,type)
        }
    })
}
module.exports = Toast;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Toast = {};
Toast.install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue, options</span>) </span>{
    <span class="hljs-keyword">let</span> opt = {
        <span class="hljs-attr">defaultType</span>:<span class="hljs-string">&apos;bottom&apos;</span>,   <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x663E;&#x793A;&#x4F4D;&#x7F6E;</span>
        duration:<span class="hljs-string">&apos;2500&apos;</span>         <span class="hljs-comment">// &#x6301;&#x7EED;&#x65F6;&#x95F4;</span>
    }
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> property <span class="hljs-keyword">in</span> options){
        opt[property] = options[property];  <span class="hljs-comment">// &#x4F7F;&#x7528; options &#x7684;&#x914D;&#x7F6E;</span>
    }
    Vue.prototype.$toast = <span class="hljs-function">(<span class="hljs-params">tips,type</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span>(type){
            opt.defaultType = type;         <span class="hljs-comment">// &#x5982;&#x679C;&#x6709;&#x4F20;type&#xFF0C;&#x4F4D;&#x7F6E;&#x5219;&#x8BBE;&#x4E3A;&#x8BE5;type</span>
        }
        <span class="hljs-keyword">if</span>(<span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">&apos;vue-toast&apos;</span>).length){
            <span class="hljs-comment">// &#x5982;&#x679C;toast&#x8FD8;&#x5728;&#xFF0C;&#x5219;&#x4E0D;&#x518D;&#x6267;&#x884C;</span>
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">let</span> toastTpl = Vue.extend({
            <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div class=&quot;vue-toast toast-&apos;</span>+opt.defaultType+<span class="hljs-string">&apos;&quot;&gt;&apos;</span> + tips + <span class="hljs-string">&apos;&lt;/div&gt;&apos;</span>
        });
        <span class="hljs-keyword">let</span> tpl = <span class="hljs-keyword">new</span> toastTpl().$mount().$el;
        <span class="hljs-built_in">document</span>.body.appendChild(tpl);
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">document</span>.body.removeChild(tpl);
        }, opt.duration)
    }
    [<span class="hljs-string">&apos;bottom&apos;</span>, <span class="hljs-string">&apos;center&apos;</span>, <span class="hljs-string">&apos;top&apos;</span>].forEach(<span class="hljs-function"><span class="hljs-params">type</span> =&gt;</span> {
        Vue.prototype.$toast[type] = <span class="hljs-function">(<span class="hljs-params">tips</span>) =&gt;</span> {
            <span class="hljs-keyword">return</span> Vue.prototype.$toast(tips,type)
        }
    })
}
<span class="hljs-built_in">module</span>.exports = Toast;</code></pre>
<p>&#x8FD9;&#x6837;&#x5B50;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684; vue &#x63D2;&#x4EF6;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; npm &#x6253;&#x5305;&#x53D1;&#x5E03;&#xFF0C;&#x4E0B;&#x6B21;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; npm install &#x6765;&#x5B89;&#x88C5;&#x4E86;&#x3002;</p>
<h3 id="articleHeader3">&#x6E90;&#x7801;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/lin-xin/vue-toast" rel="nofollow noreferrer" target="_blank">vue-toast</a>
</h3>
<h3 id="articleHeader4">&#x66F4;&#x591A;&#x6587;&#x7AE0;&#xFF1A;<a href="https://github.com/lin-xin/blog" rel="nofollow noreferrer" target="_blank">blog</a>
</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js 插件开发详解

## 原文链接
[https://segmentfault.com/a/1190000008869576](https://segmentfault.com/a/1190000008869576)

