---
title: 'Vue源码阅读 - 依赖收集原理' 
date: 2018-11-24 2:30:10
hidden: true
slug: 96uobb4bqg
categories: [reprint]
---

{{< raw >}}
<p>vue&#x5DF2;&#x662F;&#x76EE;&#x524D;&#x56FD;&#x5185;&#x524D;&#x7AEF;web&#x7AEF;&#x4E09;&#x5206;&#x5929;&#x4E0B;&#x4E4B;&#x4E00;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x4F5C;&#x4E3A;&#x672C;&#x4EBA;&#x4E3B;&#x8981;&#x6280;&#x672F;&#x6808;&#x4E4B;&#x4E00;&#xFF0C;&#x5728;&#x65E5;&#x5E38;&#x4F7F;&#x7528;&#x4E2D;&#x77E5;&#x5176;&#x7136;&#x4E5F;&#x597D;&#x5947;&#x7740;&#x6240;&#x4EE5;&#x7136;&#xFF0C;&#x53E6;&#x5916;&#x6700;&#x8FD1;&#x7684;&#x793E;&#x533A;&#x6D8C;&#x73B0;&#x4E86;&#x4E00;&#x5927;&#x7968;vue&#x6E90;&#x7801;&#x9605;&#x8BFB;&#x7C7B;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x5728;&#x4E0B;&#x501F;&#x8FD9;&#x4E2A;&#x673A;&#x4F1A;&#x4ECE;&#x5927;&#x5BB6;&#x7684;&#x6587;&#x7AE0;&#x548C;&#x8BA8;&#x8BBA;&#x4E2D;&#x6C72;&#x53D6;&#x4E86;&#x4E00;&#x4E9B;&#x8425;&#x517B;&#xFF0C;&#x540C;&#x65F6;&#x5BF9;&#x4E00;&#x4E9B;&#x9605;&#x8BFB;&#x6E90;&#x7801;&#x65F6;&#x7684;&#x60F3;&#x6CD5;&#x8FDB;&#x884C;&#x603B;&#x7ED3;&#xFF0C;&#x51FA;&#x4EA7;&#x4E00;&#x4E9B;&#x6587;&#x7AE0;&#xFF0C;&#x4F5C;&#x4E3A;&#x81EA;&#x5DF1;&#x601D;&#x8003;&#x7684;&#x603B;&#x7ED3;&#xFF0C;&#x672C;&#x4EBA;&#x6C34;&#x5E73;&#x6709;&#x9650;&#xFF0C;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x8BA8;&#x8BBA;~</p><p>&#x76EE;&#x6807;Vue&#x7248;&#x672C;&#xFF1A;<code>2.5.17-beta.0</code><br>vue&#x6E90;&#x7801;&#x6CE8;&#x91CA;&#xFF1A;<a href="https://github.com/SHERlocked93/vue-analysis" rel="nofollow noreferrer" target="_blank">https://github.com/SHERlocked...</a><br>&#x58F0;&#x660E;&#xFF1A;&#x6587;&#x7AE0;&#x4E2D;&#x6E90;&#x7801;&#x7684;&#x8BED;&#x6CD5;&#x90FD;&#x4F7F;&#x7528; Flow&#xFF0C;&#x5E76;&#x4E14;&#x6E90;&#x7801;&#x6839;&#x636E;&#x9700;&#x8981;&#x90FD;&#x6709;&#x5220;&#x8282;(&#x4E3A;&#x4E86;&#x4E0D;&#x88AB;&#x8FF7;&#x7CCA; @_@)&#xFF0C;&#x5982;&#x679C;&#x8981;&#x770B;&#x5B8C;&#x6574;&#x7248;&#x7684;&#x8BF7;&#x8FDB;&#x5165;&#x4E0A;&#x9762;&#x7684;<a href="https://github.com/SHERlocked93/vue-analysis" rel="nofollow noreferrer" target="_blank">github&#x5730;&#x5740;</a>&#xFF0C;&#x672C;&#x6587;&#x662F;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#xFF0C;&#x6587;&#x7AE0;&#x5730;&#x5740;&#x89C1;&#x5E95;&#x90E8;~</p><h2 id="articleHeader0">1. &#x54CD;&#x5E94;&#x5F0F;&#x7CFB;&#x7EDF;</h2><p>&#x901A;&#x8FC7;&#x5B98;&#x7F51;&#x7684;&#x4ECB;&#x7ECD;&#x6211;&#x4EEC;&#x77E5;&#x9053; Vue.js &#x662F;&#x4E00;&#x4E2A;MVVM&#x6846;&#x67B6;&#xFF0C;&#x5B83;&#x5E76;&#x4E0D;&#x5173;&#x5FC3;&#x89C6;&#x56FE;&#x53D8;&#x5316;&#xFF0C;&#x800C;&#x901A;&#x8FC7;&#x6570;&#x636E;&#x9A71;&#x52A8;&#x89C6;&#x56FE;&#x66F4;&#x65B0;&#xFF0C;&#x8FD9;&#x8BA9;&#x6211;&#x4EEC;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x800C;&#x8FD9;&#x662F;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x7684;&#x5462;&#x3002;&#x76D7;&#x7528;&#x5B98;&#x7F51;&#x4E00;&#x5F20;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/bVbdsBv?w=726&amp;h=454" src="https://static.alili.tech/img/bVbdsBv?w=726&amp;h=454" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x90FD;&#x6709;&#x76F8;&#x5E94;&#x7684; <code>Watcher</code> &#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x4F1A;&#x5728;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x628A;&#x5C5E;&#x6027;&#x8BB0;&#x5F55;&#x4E3A;&#x4F9D;&#x8D56;&#xFF0C;&#x4E4B;&#x540E;&#x5F53;&#x4F9D;&#x8D56;&#x9879;&#x7684; <code>setter</code> &#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x4F1A;&#x901A;&#x77E5; <code>watcher</code> &#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#xFF0C;&#x4ECE;&#x800C;&#x81F4;&#x4F7F;&#x5B83;&#x5173;&#x8054;&#x7684;&#x7EC4;&#x4EF6;&#x5F97;&#x4EE5;&#x66F4;&#x65B0;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6709;&#x4E09;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x6982;&#x5FF5; <code>Observe</code>&#x3001;<code>Dep</code>&#x3001;<code>Watcher</code>&#xFF0C;&#x5206;&#x522B;&#x4F4D;&#x4E8E;<code>src/core/observer/index.js</code>&#x3001;<code>src/core/observer/dep.js</code>&#x3001;<code>src/core/observer/watcher.js</code></p><ul><li><code>Observe</code> &#x7C7B;&#x4E3B;&#x8981;&#x7ED9;&#x54CD;&#x5E94;&#x5F0F;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x6DFB;&#x52A0; <code>getter/setter</code> &#x7528;&#x4E8E;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x4E0E;&#x6D3E;&#x53D1;&#x66F4;&#x65B0;</li><li><code>Dep</code> &#x7C7B;&#x7528;&#x4E8E;&#x6536;&#x96C6;&#x5F53;&#x524D;&#x54CD;&#x5E94;&#x5F0F;&#x5BF9;&#x8C61;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;</li><li><code>Watcher</code> &#x7C7B;&#x662F;&#x89C2;&#x5BDF;&#x8005;&#xFF0C;&#x5B9E;&#x4F8B;&#x5206;&#x4E3A;&#x6E32;&#x67D3; watcher&#x3001;&#x8BA1;&#x7B97;&#x5C5E;&#x6027; watcher&#x3001;&#x4FA6;&#x542C;&#x5668; watcher&#x4E09;&#x79CD;</li></ul><h2 id="articleHeader1">2. &#x4EE3;&#x7801;&#x5B9E;&#x73B0;</h2><h3 id="articleHeader2">2.1 initState</h3><p>&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#x7684;&#x5165;&#x53E3;&#x4F4D;&#x4E8E; src/core/instance/init.js &#x7684; <code>initState</code> &#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/instance/state.js

export function initState(vm: Component) {
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)              // &#x521D;&#x59CB;&#x5316;props
  if (opts.methods) initMethods(vm, opts.methods)        // &#x521D;&#x59CB;&#x5316;methods
  if (opts.data) initData(vm)                            // &#x521D;&#x59CB;&#x5316;data
  if (opts.computed) initComputed(vm, opts.computed)     // &#x521D;&#x59CB;&#x5316;computed
  if (opts.watch) initWatch(vm, opts.watch)              // &#x521D;&#x59CB;&#x5316;watch
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/instance/state.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initState</span>(<span class="hljs-params">vm: Component</span>) </span>{
  <span class="hljs-keyword">const</span> opts = vm.$options
  <span class="hljs-keyword">if</span> (opts.props) initProps(vm, opts.props)              <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;props</span>
  <span class="hljs-keyword">if</span> (opts.methods) initMethods(vm, opts.methods)        <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;methods</span>
  <span class="hljs-keyword">if</span> (opts.data) initData(vm)                            <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;data</span>
  <span class="hljs-keyword">if</span> (opts.computed) initComputed(vm, opts.computed)     <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;computed</span>
  <span class="hljs-keyword">if</span> (opts.watch) initWatch(vm, opts.watch)              <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;watch</span>
  }
}</code></pre><p>&#x5B83;&#x975E;&#x5E38;&#x89C4;&#x5F8B;&#x7684;&#x5B9A;&#x4E49;&#x4E86;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x6765;&#x521D;&#x59CB;&#x5316; <code>props</code>&#x3001;<code>methods</code>&#x3001;<code>data</code>&#x3001;<code>computed</code>&#x3001;<code>wathcer</code>&#xFF0C;&#x8FD9;&#x91CC;&#x770B;&#x4E00;&#x4E0B; <code>initData</code> &#x65B9;&#x6CD5;&#xFF0C;&#x6765;&#x7AA5;&#x4E00;&#x8C79;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/instance/state.js

function initData(vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === &apos;function&apos;
                    ? getData(data, vm)
                    : data || {}
  observe(data, true /* asRootData */)             // &#x7ED9;data&#x505A;&#x54CD;&#x5E94;&#x5F0F;&#x5904;&#x7406;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/instance/state.js</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initData</span>(<span class="hljs-params">vm: Component</span>) </span>{
  <span class="hljs-keyword">let</span> data = vm.$options.data
  data = vm._data = <span class="hljs-keyword">typeof</span> data === <span class="hljs-string">&apos;function&apos;</span>
                    ? getData(data, vm)
                    : data || {}
  observe(data, <span class="hljs-literal">true</span> <span class="hljs-comment">/* asRootData */</span>)             <span class="hljs-comment">// &#x7ED9;data&#x505A;&#x54CD;&#x5E94;&#x5F0F;&#x5904;&#x7406;</span>
}</code></pre><p>&#x9996;&#x5148;&#x5224;&#x65AD;&#x4E86;&#x4E0B; data &#x662F;&#x4E0D;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x662F;&#x5219;&#x53D6;&#x8FD4;&#x56DE;&#x503C;&#x4E0D;&#x662F;&#x5219;&#x53D6;&#x81EA;&#x8EAB;&#xFF0C;&#x4E4B;&#x540E;&#x6709;&#x4E00;&#x4E2A; <code>observe</code> &#x65B9;&#x6CD5;&#x5BF9; <code>data</code> &#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5C1D;&#x8BD5;&#x7ED9;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;Observer&#x5B9E;&#x4F8B; <code>__ob__</code>&#xFF0C;&#x5982;&#x679C;&#x6210;&#x529F;&#x521B;&#x5EFA;&#x5219;&#x8FD4;&#x56DE;&#x65B0;&#x7684;Observer&#x5B9E;&#x4F8B;&#xFF0C;&#x5982;&#x679C;&#x5DF2;&#x6709;Observer&#x5B9E;&#x4F8B;&#x5219;&#x8FD4;&#x56DE;&#x73B0;&#x6709;&#x7684;Observer&#x5B9E;&#x4F8B;</p><h3 id="articleHeader3">2.2 Observer/defineReactive</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/observer/index.js

export function observe (value: any, asRootData: ?boolean): Observer | void {
  let ob: Observer | void
  ob = new Observer(value)
  return ob
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/observer/index.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observe</span> (<span class="hljs-params">value: any, asRootData: ?boolean</span>): <span class="hljs-title">Observer</span> | <span class="hljs-title">void</span> </span>{
  <span class="hljs-keyword">let</span> ob: Observer | <span class="hljs-keyword">void</span>
  ob = <span class="hljs-keyword">new</span> Observer(value)
  <span class="hljs-keyword">return</span> ob
}</code></pre><p>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4E3B;&#x8981;&#x7528; <code>data</code> &#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x53BB;&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A; Observer &#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#xFF0C;Observer &#x662F;&#x4E00;&#x4E2A; Class&#xFF0C;&#x7528;&#x4E8E;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x548C; <code>notify</code> &#x66F4;&#x65B0;&#xFF0C;Observer &#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F7F;&#x7528; <code>defineReactive</code> &#x65B9;&#x6CD5;&#x7ED9;&#x5BF9;&#x8C61;&#x7684;&#x952E;&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#xFF0C;&#x7ED9;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x9012;&#x5F52;&#x6DFB;&#x52A0; <code>getter/setter</code> &#xFF0C;&#x5F53;data&#x88AB;&#x53D6;&#x503C;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1; <code>getter</code> &#x5E76;&#x641C;&#x96C6;&#x4F9D;&#x8D56;&#xFF0C;&#x5F53;&#x88AB;&#x4FEE;&#x6539;&#x503C;&#x7684;&#x65F6;&#x5019;&#x5148;&#x89E6;&#x53D1; <code>getter</code> &#x518D;&#x89E6;&#x53D1; <code>setter</code> &#x5E76;&#x6D3E;&#x53D1;&#x66F4;&#x65B0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/observer/index.js

export class Observer {
  value: any;
  dep: Dep;

  constructor (value: any) {
    value: any;
    this.dep = new Dep()
    def(value, &apos;__ob__&apos;, this)    // def&#x65B9;&#x6CD5;&#x4FDD;&#x8BC1;&#x4E0D;&#x53EF;&#x679A;&#x4E3E;
    this.walk(value)
  }

  // &#x904D;&#x5386;&#x5BF9;&#x8C61;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x5E76;&#x5C06;&#x5B83;&#x4EEC;&#x8F6C;&#x6362;&#x4E3A;getter/setter
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i &lt; keys.length; i++) { // &#x628A;&#x6240;&#x6709;&#x53EF;&#x904D;&#x5386;&#x7684;&#x5BF9;&#x8C61;&#x54CD;&#x5E94;&#x5F0F;&#x5316;
      defineReactive(obj, keys[i])
    }
  }
}

export function defineReactive ( obj: Object, key: string, val: any, customSetter?: ?Function, shallow?: boolean) {
  const dep = new Dep()         // &#x5728;&#x6BCF;&#x4E2A;&#x54CD;&#x5E94;&#x5F0F;&#x952E;&#x503C;&#x7684;&#x95ED;&#x5305;&#x4E2D;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;dep&#x5BF9;&#x8C61;

  // &#x5982;&#x679C;&#x4E4B;&#x524D;&#x8BE5;&#x5BF9;&#x8C61;&#x5DF2;&#x7ECF;&#x9884;&#x8BBE;&#x4E86;getter/setter&#x5219;&#x5C06;&#x5176;&#x7F13;&#x5B58;&#xFF0C;&#x65B0;&#x5B9A;&#x4E49;&#x7684;getter/setter&#x4E2D;&#x4F1A;&#x5C06;&#x5176;&#x6267;&#x884C;
  const getter = property &amp;&amp; property.get
  const setter = property &amp;&amp; property.set

  let childOb = !shallow &amp;&amp; observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val         // &#x5982;&#x679C;&#x539F;&#x672C;&#x5BF9;&#x8C61;&#x62E5;&#x6709;getter&#x65B9;&#x6CD5;&#x5219;&#x6267;&#x884C;
      if (Dep.target) {                    // &#x5982;&#x679C;&#x5F53;&#x524D;&#x6709;watcher&#x5728;&#x8BFB;&#x53D6;&#x5F53;&#x524D;&#x503C;
        dep.depend()                       // &#x90A3;&#x4E48;&#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#xFF0C;dep.addSub
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val    // &#x5148;getter
      if (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {   // &#x5982;&#x679C;&#x8DDF;&#x539F;&#x6765;&#x503C;&#x4E00;&#x6837;&#x5219;&#x4E0D;&#x7BA1;
        return
      }
      if (setter) { setter.call(obj, newVal) }         // &#x5982;&#x679C;&#x539F;&#x672C;&#x5BF9;&#x8C61;&#x62E5;&#x6709;setter&#x65B9;&#x6CD5;&#x5219;&#x6267;&#x884C;
      else { val = newVal }
      dep.notify()                                     // &#x5982;&#x679C;&#x53D1;&#x751F;&#x53D8;&#x66F4;&#xFF0C;&#x5219;&#x901A;&#x77E5;&#x66F4;&#x65B0;&#xFF0C;&#x8C03;&#x7528;watcher.update()
    }
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/observer/index.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Observer</span> </span>{
  value: any;
  dep: Dep;

  <span class="hljs-keyword">constructor</span> (value: any) {
    value: any;
    <span class="hljs-keyword">this</span>.dep = <span class="hljs-keyword">new</span> Dep()
    def(value, <span class="hljs-string">&apos;__ob__&apos;</span>, <span class="hljs-keyword">this</span>)    <span class="hljs-comment">// def&#x65B9;&#x6CD5;&#x4FDD;&#x8BC1;&#x4E0D;&#x53EF;&#x679A;&#x4E3E;</span>
    <span class="hljs-keyword">this</span>.walk(value)
  }

  <span class="hljs-comment">// &#x904D;&#x5386;&#x5BF9;&#x8C61;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x5E76;&#x5C06;&#x5B83;&#x4EEC;&#x8F6C;&#x6362;&#x4E3A;getter/setter</span>
  walk (obj: <span class="hljs-built_in">Object</span>) {
    <span class="hljs-keyword">const</span> keys = <span class="hljs-built_in">Object</span>.keys(obj)
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) { <span class="hljs-comment">// &#x628A;&#x6240;&#x6709;&#x53EF;&#x904D;&#x5386;&#x7684;&#x5BF9;&#x8C61;&#x54CD;&#x5E94;&#x5F0F;&#x5316;</span>
      defineReactive(obj, keys[i])
    }
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> (<span class="hljs-params"> obj: Object, key: string, val: any, customSetter?: ?Function, shallow?: boolean</span>) </span>{
  <span class="hljs-keyword">const</span> dep = <span class="hljs-keyword">new</span> Dep()         <span class="hljs-comment">// &#x5728;&#x6BCF;&#x4E2A;&#x54CD;&#x5E94;&#x5F0F;&#x952E;&#x503C;&#x7684;&#x95ED;&#x5305;&#x4E2D;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;dep&#x5BF9;&#x8C61;</span>

  <span class="hljs-comment">// &#x5982;&#x679C;&#x4E4B;&#x524D;&#x8BE5;&#x5BF9;&#x8C61;&#x5DF2;&#x7ECF;&#x9884;&#x8BBE;&#x4E86;getter/setter&#x5219;&#x5C06;&#x5176;&#x7F13;&#x5B58;&#xFF0C;&#x65B0;&#x5B9A;&#x4E49;&#x7684;getter/setter&#x4E2D;&#x4F1A;&#x5C06;&#x5176;&#x6267;&#x884C;</span>
  <span class="hljs-keyword">const</span> getter = property &amp;&amp; property.get
  <span class="hljs-keyword">const</span> setter = property &amp;&amp; property.set

  <span class="hljs-keyword">let</span> childOb = !shallow &amp;&amp; observe(val)
  <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveGetter</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">const</span> value = getter ? getter.call(obj) : val         <span class="hljs-comment">// &#x5982;&#x679C;&#x539F;&#x672C;&#x5BF9;&#x8C61;&#x62E5;&#x6709;getter&#x65B9;&#x6CD5;&#x5219;&#x6267;&#x884C;</span>
      <span class="hljs-keyword">if</span> (Dep.target) {                    <span class="hljs-comment">// &#x5982;&#x679C;&#x5F53;&#x524D;&#x6709;watcher&#x5728;&#x8BFB;&#x53D6;&#x5F53;&#x524D;&#x503C;</span>
        dep.depend()                       <span class="hljs-comment">// &#x90A3;&#x4E48;&#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#xFF0C;dep.addSub</span>
      }
      <span class="hljs-keyword">return</span> value
    },
    <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactiveSetter</span> (<span class="hljs-params">newVal</span>) </span>{
      <span class="hljs-keyword">const</span> value = getter ? getter.call(obj) : val    <span class="hljs-comment">// &#x5148;getter</span>
      <span class="hljs-keyword">if</span> (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {   <span class="hljs-comment">// &#x5982;&#x679C;&#x8DDF;&#x539F;&#x6765;&#x503C;&#x4E00;&#x6837;&#x5219;&#x4E0D;&#x7BA1;</span>
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-keyword">if</span> (setter) { setter.call(obj, newVal) }         <span class="hljs-comment">// &#x5982;&#x679C;&#x539F;&#x672C;&#x5BF9;&#x8C61;&#x62E5;&#x6709;setter&#x65B9;&#x6CD5;&#x5219;&#x6267;&#x884C;</span>
      <span class="hljs-keyword">else</span> { val = newVal }
      dep.notify()                                     <span class="hljs-comment">// &#x5982;&#x679C;&#x53D1;&#x751F;&#x53D8;&#x66F4;&#xFF0C;&#x5219;&#x901A;&#x77E5;&#x66F4;&#x65B0;&#xFF0C;&#x8C03;&#x7528;watcher.update()</span>
    }
  })
}</code></pre><p><code>getter</code> &#x7684;&#x65F6;&#x5019;&#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x7684;&#x6536;&#x96C6;&#xFF0C;&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#xFF0C;&#x53EA;&#x6709;&#x5728; <code>Dep.target</code> &#x4E2D;&#x6709;&#x503C;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#xFF0C;&#x8FD9;&#x4E2A; <code>Dep.target</code> &#x662F;&#x5728;Watcher&#x5B9E;&#x4F8B;&#x7684; <code>get</code> &#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019; <code>pushTarget</code> &#x4F1A;&#x628A;&#x5F53;&#x524D;&#x53D6;&#x503C;&#x7684;watcher&#x63A8;&#x5165; <code>Dep.target</code>&#xFF0C;&#x539F;&#x5148;&#x7684;watcher&#x538B;&#x6808;&#x5230; <code>targetStack</code> &#x6808;&#x4E2D;&#xFF0C;&#x5F53;&#x524D;&#x53D6;&#x503C;&#x7684;watcher&#x53D6;&#x503C;&#x7ED3;&#x675F;&#x540E;&#x51FA;&#x6808;&#x5E76;&#x628A;&#x539F;&#x5148;&#x7684;watcher&#x503C;&#x8D4B;&#x7ED9; <code>Dep.target</code>&#xFF0C;<code>cleanupDeps</code> &#x6700;&#x540E;&#x628A;&#x65B0;&#x7684; <code>newDeps</code> &#x91CC;&#x5DF2;&#x7ECF;&#x6CA1;&#x6709;&#x7684;watcher&#x6E05;&#x7A7A;&#xFF0C;&#x4EE5;&#x9632;&#x6B62;&#x89C6;&#x56FE;&#x4E0A;&#x5DF2;&#x7ECF;&#x4E0D;&#x9700;&#x8981;&#x7684;&#x65E0;&#x7528;watcher&#x89E6;&#x53D1;</p><p><code>setter</code> &#x7684;&#x65F6;&#x5019;&#x9996;&#x5148; <code>getter</code>&#xFF0C;&#x5E76;&#x4E14;&#x6BD4;&#x5BF9;&#x65E7;&#x503C;&#x6CA1;&#x6709;&#x53D8;&#x5316;&#x5219;return&#xFF0C;&#x5982;&#x679C;&#x53D1;&#x751F;&#x53D8;&#x66F4;&#xFF0C;&#x5219;dep&#x901A;&#x77E5;&#x6240;&#x6709;subs&#x4E2D;&#x5B58;&#x653E;&#x7684;&#x4F9D;&#x8D56;&#x672C;&#x6570;&#x636E;&#x7684;Watcher&#x5B9E;&#x4F8B; <code>update</code> &#x8FDB;&#x884C;&#x66F4;&#x65B0;&#xFF0C;&#x8FD9;&#x91CC; <code>update</code> &#x4E2D;&#x4F1A; <code>queueWatcher( )</code> &#x5F02;&#x6B65;&#x63A8;&#x9001;&#x5230;&#x8C03;&#x5EA6;&#x8005;&#x89C2;&#x5BDF;&#x8005;&#x961F;&#x5217; <code>queue</code> &#x4E2D;&#xFF0C;&#x5728;nextTick&#x65F6; <code>flushSchedulerQueue( )</code> &#x628A;&#x961F;&#x5217;&#x4E2D;&#x7684;watcher&#x53D6;&#x51FA;&#x6765;&#x6267;&#x884C; <code>watcher.run</code> &#x4E14;&#x6267;&#x884C;&#x76F8;&#x5173;&#x94A9;&#x5B50;&#x51FD;&#x6570;</p><h3 id="articleHeader4">2.3 Dep</h3><p>&#x4E0A;&#x9762;&#x591A;&#x6B21;&#x63D0;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x5173;&#x952E;&#x8BCD; <code>Dep</code>&#xFF0C;&#x4ED6;&#x662F;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x7684;&#x5BB9;&#x5668;&#xFF0C;&#x6216;&#x8005;&#x79F0;&#x4E3A;<strong>&#x4F9D;&#x8D56;&#x641C;&#x96C6;&#x5668;</strong>&#xFF0C;&#x4ED6;&#x8BB0;&#x5F55;&#x4E86;&#x54EA;&#x4E9B;Watcher&#x4F9D;&#x8D56;&#x81EA;&#x5DF1;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x6216;&#x8005;&#x8BF4;&#xFF0C;&#x54EA;&#x4E9B;Watcher&#x8BA2;&#x9605;&#x4E86;&#x81EA;&#x5DF1;&#x7684;&#x53D8;&#x5316;&#xFF1B;&#x8FD9;&#x91CC;&#x5F15;&#x7528;&#x4E00;&#x4E2A;&#x7F51;&#x53CB;&#x7684;&#x53D1;&#x8A00;&#xFF1A;</p><blockquote>@liuhongyi0101 &#xFF1A;&#x7B80;&#x5355;&#x70B9;&#x8BF4;&#x5C31;&#x662F;&#x5F15;&#x7528;&#x8BA1;&#x6570; &#xFF0C;&#x8C01;&#x501F;&#x4E86;&#x6211;&#x7684;&#x94B1;&#xFF0C;&#x6211;&#x5C31;&#x628A;&#x90A3;&#x4E2A;&#x4EBA;&#x8BB0;&#x4E0B;&#x6765;&#xFF0C;&#x4EE5;&#x540E;&#x6211;&#x7684;&#x94B1;&#x5C11;&#x4E86; &#x6211;&#x5C31;&#x901A;&#x77E5;&#x4ED6;&#x4EEC;&#x8BF4;&#x6211;&#x6CA1;&#x94B1;&#x4E86;</blockquote><p>&#x800C;&#x628A;&#x501F;&#x94B1;&#x7684;&#x4EBA;&#x8BB0;&#x4E0B;&#x6765;&#x7684;&#x5C0F;&#x672C;&#x672C;&#x5C31;&#x662F;&#x8FD9;&#x91CC; <code>Dep</code> &#x5B9E;&#x4F8B;&#x91CC;&#x7684;subs</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/observer/dep.js

let uid = 0            // Dep&#x5B9E;&#x4F8B;&#x7684;id&#xFF0C;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x53BB;&#x91CD;

export default class Dep {
  static target: ?Watcher           // &#x5F53;&#x524D;&#x662F;&#x8C01;&#x5728;&#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x7684;&#x6536;&#x96C6;
  id: number
  subs: Array&lt;Watcher&gt;              // &#x89C2;&#x5BDF;&#x8005;&#x96C6;&#x5408;
  
  constructor() {
    this.id = uid++                             // Dep&#x5B9E;&#x4F8B;&#x7684;id&#xFF0C;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x53BB;&#x91CD;
    this.subs = []                              // &#x5B58;&#x50A8;&#x6536;&#x96C6;&#x5668;&#x4E2D;&#x9700;&#x8981;&#x901A;&#x77E5;&#x7684;Watcher
  }

  addSub(sub: Watcher) { ... }  /* &#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x5BF9;&#x8C61; */
  removeSub(sub: Watcher) { ... }  /* &#x79FB;&#x9664;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x5BF9;&#x8C61; */
  depend() { ... }  /* &#x4F9D;&#x8D56;&#x6536;&#x96C6;&#xFF0C;&#x5F53;&#x5B58;&#x5728;Dep.target&#x7684;&#x65F6;&#x5019;&#x628A;&#x81EA;&#x5DF1;&#x6DFB;&#x52A0;&#x89C2;&#x5BDF;&#x8005;&#x7684;&#x4F9D;&#x8D56;&#x4E2D; */
  notify() { ... }  /* &#x901A;&#x77E5;&#x6240;&#x6709;&#x8BA2;&#x9605;&#x8005; */
}

const targetStack = []           // watcher&#x6808;

export function pushTarget(_target: ?Watcher) { ... }  /* &#x5C06;watcher&#x89C2;&#x5BDF;&#x8005;&#x5B9E;&#x4F8B;&#x8BBE;&#x7F6E;&#x7ED9;Dep.target&#xFF0C;&#x7528;&#x4EE5;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x3002;&#x540C;&#x65F6;&#x5C06;&#x8BE5;&#x5B9E;&#x4F8B;&#x5B58;&#x5165;target&#x6808;&#x4E2D; */
export function popTarget() { ... }  /* &#x5C06;&#x89C2;&#x5BDF;&#x8005;&#x5B9E;&#x4F8B;&#x4ECE;target&#x6808;&#x4E2D;&#x53D6;&#x51FA;&#x5E76;&#x8BBE;&#x7F6E;&#x7ED9;Dep.target */" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/observer/dep.js</span>

<span class="hljs-keyword">let</span> uid = <span class="hljs-number">0</span>            <span class="hljs-comment">// Dep&#x5B9E;&#x4F8B;&#x7684;id&#xFF0C;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x53BB;&#x91CD;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dep</span> </span>{
  <span class="hljs-keyword">static</span> target: ?Watcher           <span class="hljs-comment">// &#x5F53;&#x524D;&#x662F;&#x8C01;&#x5728;&#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x7684;&#x6536;&#x96C6;</span>
  id: number
  subs: <span class="hljs-built_in">Array</span>&lt;Watcher&gt;              <span class="hljs-comment">// &#x89C2;&#x5BDF;&#x8005;&#x96C6;&#x5408;</span>
  
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.id = uid++                             <span class="hljs-comment">// Dep&#x5B9E;&#x4F8B;&#x7684;id&#xFF0C;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x53BB;&#x91CD;</span>
    <span class="hljs-keyword">this</span>.subs = []                              <span class="hljs-comment">// &#x5B58;&#x50A8;&#x6536;&#x96C6;&#x5668;&#x4E2D;&#x9700;&#x8981;&#x901A;&#x77E5;&#x7684;Watcher</span>
  }

  addSub(sub: Watcher) { ... }  <span class="hljs-comment">/* &#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x5BF9;&#x8C61; */</span>
  removeSub(sub: Watcher) { ... }  <span class="hljs-comment">/* &#x79FB;&#x9664;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x5BF9;&#x8C61; */</span>
  depend() { ... }  <span class="hljs-comment">/* &#x4F9D;&#x8D56;&#x6536;&#x96C6;&#xFF0C;&#x5F53;&#x5B58;&#x5728;Dep.target&#x7684;&#x65F6;&#x5019;&#x628A;&#x81EA;&#x5DF1;&#x6DFB;&#x52A0;&#x89C2;&#x5BDF;&#x8005;&#x7684;&#x4F9D;&#x8D56;&#x4E2D; */</span>
  notify() { ... }  <span class="hljs-comment">/* &#x901A;&#x77E5;&#x6240;&#x6709;&#x8BA2;&#x9605;&#x8005; */</span>
}

<span class="hljs-keyword">const</span> targetStack = []           <span class="hljs-comment">// watcher&#x6808;</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pushTarget</span>(<span class="hljs-params">_target: ?Watcher</span>) </span>{ ... }  <span class="hljs-comment">/* &#x5C06;watcher&#x89C2;&#x5BDF;&#x8005;&#x5B9E;&#x4F8B;&#x8BBE;&#x7F6E;&#x7ED9;Dep.target&#xFF0C;&#x7528;&#x4EE5;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x3002;&#x540C;&#x65F6;&#x5C06;&#x8BE5;&#x5B9E;&#x4F8B;&#x5B58;&#x5165;target&#x6808;&#x4E2D; */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">popTarget</span>(<span class="hljs-params"></span>) </span>{ ... }  <span class="hljs-comment">/* &#x5C06;&#x89C2;&#x5BDF;&#x8005;&#x5B9E;&#x4F8B;&#x4ECE;target&#x6808;&#x4E2D;&#x53D6;&#x51FA;&#x5E76;&#x8BBE;&#x7F6E;&#x7ED9;Dep.target */</span></code></pre><p>&#x8FD9;&#x91CC; <code>Dep</code> &#x7684;&#x5B9E;&#x4F8B;&#x4E2D;&#x7684; <code>subs</code> &#x641C;&#x96C6;&#x7684;&#x4F9D;&#x8D56;&#x5C31;&#x662F; watcher &#x4E86;&#xFF0C;&#x5B83;&#x662F; <code>Watcher</code> &#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x5C06;&#x6765;&#x7528;&#x6765;&#x901A;&#x77E5;&#x66F4;&#x65B0;</p><h3 id="articleHeader5">2.4 Watcher</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/core/observer/watcher.js

/* &#x4E00;&#x4E2A;&#x89E3;&#x6790;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x7684;&#x89C2;&#x5BDF;&#x8005;&#xFF0C;&#x540C;&#x65F6;&#x5728;&#x8868;&#x8FBE;&#x5F0F;&#x6570;&#x636E;&#x53D8;&#x66F4;&#x65F6;&#x89E6;&#x53D1;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#x5B83;&#x88AB;&#x7528;&#x4E8E;$watch api&#x4EE5;&#x53CA;&#x6307;&#x4EE4; */
export default class Watcher {
  constructor(
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean      // &#x662F;&#x5426;&#x662F;&#x6E32;&#x67D3;watcher&#x7684;&#x6807;&#x5FD7;&#x4F4D;
  ) {
    this.getter = expOrFn                // &#x5728;get&#x65B9;&#x6CD5;&#x4E2D;&#x6267;&#x884C;
    if (this.computed) {                   // &#x662F;&#x5426;&#x662F; &#x8BA1;&#x7B97;&#x5C5E;&#x6027;
      this.value = undefined
      this.dep = new Dep()                 // &#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x521B;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E2D;&#x5E76;&#x672A;&#x6C42;&#x503C;
    } else {                               // &#x4E0D;&#x662F;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4F1A;&#x7ACB;&#x523B;&#x6C42;&#x503C;
      this.value = this.get()
    }
  }

  /* &#x83B7;&#x5F97;getter&#x7684;&#x503C;&#x5E76;&#x4E14;&#x91CD;&#x65B0;&#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x6536;&#x96C6; */
  get() {
    pushTarget(this)                // &#x8BBE;&#x7F6E;Dep.target = this
    let value
    value = this.getter.call(vm, vm)
    popTarget()                      // &#x5C06;&#x89C2;&#x5BDF;&#x8005;&#x5B9E;&#x4F8B;&#x4ECE;target&#x6808;&#x4E2D;&#x53D6;&#x51FA;&#x5E76;&#x8BBE;&#x7F6E;&#x7ED9;Dep.target
    this.cleanupDeps()
    return value
  }

  addDep(dep: Dep) { ... }  /* &#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x5230;Deps&#x96C6;&#x5408;&#x4E2D; */
  cleanupDeps() { ... }  /* &#x6E05;&#x7406;newDeps&#x91CC;&#x6CA1;&#x6709;&#x7684;&#x65E0;&#x7528;watcher&#x4F9D;&#x8D56; */
  update() { ... }  /* &#x8C03;&#x5EA6;&#x8005;&#x63A5;&#x53E3;&#xFF0C;&#x5F53;&#x4F9D;&#x8D56;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x8FDB;&#x884C;&#x56DE;&#x8C03; */
  run() { ... }  /* &#x8C03;&#x5EA6;&#x8005;&#x5DE5;&#x4F5C;&#x63A5;&#x53E3;&#xFF0C;&#x5C06;&#x88AB;&#x8C03;&#x5EA6;&#x8005;&#x56DE;&#x8C03; */
  getAndInvoke(cb: Function) { ... }
  evaluate() { ... }  /* &#x6536;&#x96C6;&#x8BE5;watcher&#x7684;&#x6240;&#x6709;deps&#x4F9D;&#x8D56; */
  depend() { ... }  /* &#x6536;&#x96C6;&#x8BE5;watcher&#x7684;&#x6240;&#x6709;deps&#x4F9D;&#x8D56;&#xFF0C;&#x53EA;&#x6709;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4F7F;&#x7528; */
  teardown() { ... }  /* &#x5C06;&#x81EA;&#x8EAB;&#x4ECE;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x8BA2;&#x9605;&#x5217;&#x8868;&#x5220;&#x9664; */
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/core/observer/watcher.js</span>

<span class="hljs-comment">/* &#x4E00;&#x4E2A;&#x89E3;&#x6790;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x7684;&#x89C2;&#x5BDF;&#x8005;&#xFF0C;&#x540C;&#x65F6;&#x5728;&#x8868;&#x8FBE;&#x5F0F;&#x6570;&#x636E;&#x53D8;&#x66F4;&#x65F6;&#x89E6;&#x53D1;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#x5B83;&#x88AB;&#x7528;&#x4E8E;$watch api&#x4EE5;&#x53CA;&#x6307;&#x4EE4; */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watcher</span> </span>{
  <span class="hljs-keyword">constructor</span>(
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean      // &#x662F;&#x5426;&#x662F;&#x6E32;&#x67D3;watcher&#x7684;&#x6807;&#x5FD7;&#x4F4D;
  ) {
    <span class="hljs-keyword">this</span>.getter = expOrFn                <span class="hljs-comment">// &#x5728;get&#x65B9;&#x6CD5;&#x4E2D;&#x6267;&#x884C;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.computed) {                   <span class="hljs-comment">// &#x662F;&#x5426;&#x662F; &#x8BA1;&#x7B97;&#x5C5E;&#x6027;</span>
      <span class="hljs-keyword">this</span>.value = <span class="hljs-literal">undefined</span>
      <span class="hljs-keyword">this</span>.dep = <span class="hljs-keyword">new</span> Dep()                 <span class="hljs-comment">// &#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x521B;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E2D;&#x5E76;&#x672A;&#x6C42;&#x503C;</span>
    } <span class="hljs-keyword">else</span> {                               <span class="hljs-comment">// &#x4E0D;&#x662F;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4F1A;&#x7ACB;&#x523B;&#x6C42;&#x503C;</span>
      <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.get()
    }
  }

  <span class="hljs-comment">/* &#x83B7;&#x5F97;getter&#x7684;&#x503C;&#x5E76;&#x4E14;&#x91CD;&#x65B0;&#x8FDB;&#x884C;&#x4F9D;&#x8D56;&#x6536;&#x96C6; */</span>
  get() {
    pushTarget(<span class="hljs-keyword">this</span>)                <span class="hljs-comment">// &#x8BBE;&#x7F6E;Dep.target = this</span>
    <span class="hljs-keyword">let</span> value
    value = <span class="hljs-keyword">this</span>.getter.call(vm, vm)
    popTarget()                      <span class="hljs-comment">// &#x5C06;&#x89C2;&#x5BDF;&#x8005;&#x5B9E;&#x4F8B;&#x4ECE;target&#x6808;&#x4E2D;&#x53D6;&#x51FA;&#x5E76;&#x8BBE;&#x7F6E;&#x7ED9;Dep.target</span>
    <span class="hljs-keyword">this</span>.cleanupDeps()
    <span class="hljs-keyword">return</span> value
  }

  addDep(dep: Dep) { ... }  <span class="hljs-comment">/* &#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x5230;Deps&#x96C6;&#x5408;&#x4E2D; */</span>
  cleanupDeps() { ... }  <span class="hljs-comment">/* &#x6E05;&#x7406;newDeps&#x91CC;&#x6CA1;&#x6709;&#x7684;&#x65E0;&#x7528;watcher&#x4F9D;&#x8D56; */</span>
  update() { ... }  <span class="hljs-comment">/* &#x8C03;&#x5EA6;&#x8005;&#x63A5;&#x53E3;&#xFF0C;&#x5F53;&#x4F9D;&#x8D56;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x8FDB;&#x884C;&#x56DE;&#x8C03; */</span>
  run() { ... }  <span class="hljs-comment">/* &#x8C03;&#x5EA6;&#x8005;&#x5DE5;&#x4F5C;&#x63A5;&#x53E3;&#xFF0C;&#x5C06;&#x88AB;&#x8C03;&#x5EA6;&#x8005;&#x56DE;&#x8C03; */</span>
  getAndInvoke(cb: <span class="hljs-built_in">Function</span>) { ... }
  evaluate() { ... }  <span class="hljs-comment">/* &#x6536;&#x96C6;&#x8BE5;watcher&#x7684;&#x6240;&#x6709;deps&#x4F9D;&#x8D56; */</span>
  depend() { ... }  <span class="hljs-comment">/* &#x6536;&#x96C6;&#x8BE5;watcher&#x7684;&#x6240;&#x6709;deps&#x4F9D;&#x8D56;&#xFF0C;&#x53EA;&#x6709;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4F7F;&#x7528; */</span>
  teardown() { ... }  <span class="hljs-comment">/* &#x5C06;&#x81EA;&#x8EAB;&#x4ECE;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x8BA2;&#x9605;&#x5217;&#x8868;&#x5220;&#x9664; */</span>
}</code></pre><p><code>get</code> &#x65B9;&#x6CD5;&#x4E2D;&#x6267;&#x884C;&#x7684; <code>getter</code> &#x5C31;&#x662F;&#x5728;&#x4E00;&#x5F00;&#x59CB;new&#x6E32;&#x67D3;watcher&#x65F6;&#x4F20;&#x5165;&#x7684; <code>updateComponent = () =&gt; { vm._update(vm._render(), hydrating) }</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x9996;&#x5148; <code>vm._render()</code> &#x751F;&#x6210;&#x6E32;&#x67D3;VNode&#x6811;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#x5B8C;&#x6210;&#x5BF9;&#x5F53;&#x524D;Vue&#x5B9E;&#x4F8B; <code>vm</code> &#x4E0A;&#x7684;&#x6570;&#x636E;&#x8BBF;&#x95EE;&#xFF0C;&#x89E6;&#x53D1;&#x76F8;&#x5E94;&#x4E00;&#x4F17;&#x54CD;&#x5E94;&#x5F0F;&#x5BF9;&#x8C61;&#x7684; <code>getter</code>&#xFF0C;&#x7136;&#x540E; <code>vm._update()</code> &#x53BB; <code>patch</code></p><p>&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684; <code>get</code> &#x65B9;&#x6CD5;&#x6700;&#x540E;&#x6267;&#x884C;&#x4E86; <code>getAndInvoke</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x9996;&#x5148;&#x904D;&#x5386;watcher&#x4E2D;&#x5B58;&#x7684; <code>deps</code>&#xFF0C;&#x79FB;&#x9664; <code>newDep</code> &#x4E2D;&#x5DF2;&#x7ECF;&#x6CA1;&#x6709;&#x7684;&#x8BA2;&#x9605;&#xFF0C;&#x7136;&#x540E; <code>depIds = newDepIds; deps = newDeps</code> &#xFF0C;&#x628A; <code>newDepIds</code> &#x548C; <code>newDeps</code> &#x6E05;&#x7A7A;&#x3002;&#x6BCF;&#x6B21;&#x6DFB;&#x52A0;&#x5B8C;&#x65B0;&#x7684;&#x8BA2;&#x9605;&#x540E;&#x79FB;&#x9664;&#x65E7;&#x7684;&#x5DF2;&#x7ECF;&#x4E0D;&#x9700;&#x8981;&#x7684;&#x8BA2;&#x9605;&#xFF0C;&#x8FD9;&#x6837;&#x5728;&#x67D0;&#x4E9B;&#x60C5;&#x51B5;&#xFF0C;&#x6BD4;&#x5982; <code>v-if</code> &#x5DF2;&#x4E0D;&#x9700;&#x8981;&#x7684;&#x6A21;&#x677F;&#x4F9D;&#x8D56;&#x7684;&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#x5C31;&#x4E0D;&#x4F1A;&#x901A;&#x77E5;watcher&#x53BB; <code>update</code> &#x4E86;</p><h3 id="articleHeader6">2.5 &#x5C0F;&#x7ED3;</h3><p>&#x6574;&#x4E2A;&#x6536;&#x96C6;&#x7684;&#x6D41;&#x7A0B;&#x5927;&#x7EA6;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x5BF9;&#x7167;&#x7740;&#x4E0A;&#x9762;&#x7684;&#x6D41;&#x7A0B;&#x770B;&#x4E00;&#x4E0B;</p><p><span class="img-wrap"><img data-src="/img/bVbgEbX?w=648&amp;h=720" src="https://static.alili.tech/img/bVbgEbX?w=648&amp;h=720" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>watcher &#x6709;&#x4E0B;&#x9762;&#x51E0;&#x79CD;&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF1A;</p><ul><li><code>render watcher</code> &#x6E32;&#x67D3; watcher&#xFF0C;&#x6E32;&#x67D3;&#x89C6;&#x56FE;&#x7528;&#x7684; watcher</li><li><code>computed watcher</code> &#x8BA1;&#x7B97;&#x5C5E;&#x6027; watcher&#xFF0C;&#x56E0;&#x4E3A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x5373;&#x4F9D;&#x8D56;&#x522B;&#x4EBA;&#x4E5F;&#x88AB;&#x4EBA;&#x4F9D;&#x8D56;&#xFF0C;&#x56E0;&#x6B64;&#x4E5F;&#x4F1A;&#x6301;&#x6709;&#x4E00;&#x4E2A; <code>Dep</code> &#x5B9E;&#x4F8B;</li><li><code>watch watcher</code> &#x4FA6;&#x542C;&#x5668; watcher</li></ul><p>&#x53EA;&#x8981;&#x4F1A;&#x88AB;&#x522B;&#x7684;&#x89C2;&#x5BDF;&#x8005; (<code>watchers</code>) &#x4F9D;&#x8D56;&#xFF0C;&#x6BD4;&#x5982;data&#x3001;data&#x7684;&#x5C5E;&#x6027;&#x3001;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x3001;props&#xFF0C;&#x5C31;&#x4F1A;&#x5728;&#x95ED;&#x5305;&#x91CC;&#x751F;&#x6210;&#x4E00;&#x4E2A; Dep &#x7684;&#x5B9E;&#x4F8B; <code>dep</code> &#x5E76;&#x5728;&#x88AB;&#x8C03;&#x7528; <code>getter</code> &#x7684;&#x65F6;&#x5019; <code>dep.depend</code> &#x6536;&#x96C6;&#x5B83;&#x88AB;&#x8C01;&#x4F9D;&#x8D56;&#x4E86;&#xFF0C;&#x5E76;&#x628A;&#x88AB;&#x4F9D;&#x8D56;&#x7684;watcher&#x5B58;&#x653E;&#x5230;&#x81EA;&#x5DF1;&#x7684;subs&#x4E2D; <code>this.subs.push(sub)</code>&#xFF0C;&#x4EE5;&#x4FBF;&#x5728;&#x81EA;&#x8EAB;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x901A;&#x77E5; <code>notify</code> &#x5B58;&#x653E;&#x5728; <code>dep.subs</code> &#x6570;&#x7EC4;&#x4E2D;&#x4F9D;&#x8D56;&#x81EA;&#x5DF1;&#x7684; <code>watchers</code> &#x81EA;&#x5DF1;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x8BF7;&#x53CA;&#x65F6; <code>update</code> ~</p><p>&#x53EA;&#x8981;&#x4F9D;&#x8D56;&#x522B;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#x5BF9;&#x8C61;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x90FD;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005; <code>watcher</code> &#xFF0C;&#x7528;&#x6765;&#x7EDF;&#x8BA1;&#x8FD9;&#x4E2A; <code>watcher</code> &#x4F9D;&#x8D56;&#x4E86;&#x54EA;&#x4E9B;&#x54CD;&#x5E94;&#x5F0F;&#x5BF9;&#x8C61;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A; <code>watcher</code> &#x6C42;&#x503C;&#x524D;&#x628A;&#x5F53;&#x524D; <code>watcher</code> &#x8BBE;&#x7F6E;&#x5230;&#x5168;&#x5C40; <code>Dep.target</code>&#xFF0C;&#x5E76;&#x5728;&#x81EA;&#x5DF1;&#x4F9D;&#x8D56;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x5BF9;&#x8C61;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x53CA;&#x65F6; <code>update</code></p><hr><p>&#x672C;&#x6587;&#x662F;<strong>&#x7CFB;&#x5217;&#x6587;&#x7AE0;</strong>&#xFF0C;&#x968F;&#x540E;&#x4F1A;&#x66F4;&#x65B0;&#x540E;&#x9762;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x5171;&#x540C;&#x8FDB;&#x6B65;~</p><blockquote><ol><li><a href="https://segmentfault.com/a/1190000015440980">Vue&#x6E90;&#x7801;&#x9605;&#x8BFB; - &#x6587;&#x4EF6;&#x7ED3;&#x6784;&#x4E0E;&#x8FD0;&#x884C;&#x673A;&#x5236;</a></li><li><a href="https://segmentfault.com/a/1190000015562213" target="_blank">Vue&#x6E90;&#x7801;&#x9605;&#x8BFB; - &#x4F9D;&#x8D56;&#x6536;&#x96C6;&#x539F;&#x7406;</a></li><li><a href="https://segmentfault.com/a/1190000015698196">Vue&#x6E90;&#x7801;&#x9605;&#x8BFB; - &#x6279;&#x91CF;&#x5F02;&#x6B65;&#x66F4;&#x65B0;&#x4E0E;nextTick&#x539F;&#x7406;</a></li></ol></blockquote><p>&#x7F51;&#x4E0A;&#x7684;&#x5E16;&#x5B50;&#x5927;&#x591A;&#x6DF1;&#x6D45;&#x4E0D;&#x4E00;&#xFF0C;&#x751A;&#x81F3;&#x6709;&#x4E9B;&#x524D;&#x540E;&#x77DB;&#x76FE;&#xFF0C;&#x5728;&#x4E0B;&#x7684;&#x6587;&#x7AE0;&#x90FD;&#x662F;&#x5B66;&#x4E60;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x603B;&#x7ED3;&#xFF0C;&#x5982;&#x679C;&#x53D1;&#x73B0;&#x9519;&#x8BEF;&#xFF0C;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x6307;&#x51FA;~</p><blockquote><p>&#x53C2;&#x8003;&#xFF1A;</p><ol><li><a href="http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/" rel="nofollow noreferrer" target="_blank">Vue2.1.7&#x6E90;&#x7801;&#x5B66;&#x4E60;</a></li><li><a href="https://ustbhuangyi.github.io/vue-analysis" rel="nofollow noreferrer" target="_blank">Vue.js &#x6280;&#x672F;&#x63ED;&#x79D8;</a></li><li><a href="https://juejin.im/book/5a36661851882538e2259c0f/" rel="nofollow noreferrer" target="_blank">&#x5256;&#x6790; Vue.js &#x5185;&#x90E8;&#x8FD0;&#x884C;&#x673A;&#x5236;</a></li><li><a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue.js &#x6587;&#x6863;</a></li><li><a href="https://juejin.im/post/5adff30f518825672d33d596" rel="nofollow noreferrer" target="_blank">&#x3010;&#x5927;&#x578B;&#x5E72;&#x8D27;&#x3011;&#x624B;&#x62C9;&#x624B;&#x5E26;&#x4F60;&#x8FC7;&#x4E00;&#x904D;vue&#x90E8;&#x5206;&#x6E90;&#x7801;</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">MDN - Object.defineProperty()</a></li><li><a href="https://segmentfault.com/a/1190000013579636">Vue.js&#x6E90;&#x7801;&#x5B66;&#x4E60;&#x4E00; &#x2014;&#x2014; &#x6570;&#x636E;&#x9009;&#x9879; State &#x5B66;&#x4E60;</a></li></ol></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue源码阅读 - 依赖收集原理

## 原文链接
[https://segmentfault.com/a/1190000015562213](https://segmentfault.com/a/1190000015562213)

