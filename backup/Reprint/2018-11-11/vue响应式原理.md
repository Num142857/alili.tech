---
title: vue响应式原理
hidden: true
categories: [reprint]
slug: 6c6ad520
date: 2018-11-11 02:30:06
---

{{< raw >}}
<h1 id="articleHeader0">vue&#x54CD;&#x5E94;&#x5F0F;&#x539F;&#x7406;</h1><h2 id="articleHeader1">initState</h2><p>new Vue() =&gt; _init() =&gt; initState:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch &amp;&amp; opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initState</span> (<span class="hljs-params">vm: Component</span>) </span>{
  vm._watchers = []
  <span class="hljs-keyword">const</span> opts = vm.$options
  <span class="hljs-keyword">if</span> (opts.props) initProps(vm, opts.props)
  <span class="hljs-keyword">if</span> (opts.methods) initMethods(vm, opts.methods)
  <span class="hljs-keyword">if</span> (opts.data) {
    initData(vm)
  } <span class="hljs-keyword">else</span> {
    observe(vm._data = {}, <span class="hljs-literal">true</span> <span class="hljs-comment">/* asRootData */</span>)
  }
  <span class="hljs-keyword">if</span> (opts.computed) initComputed(vm, opts.computed)
  <span class="hljs-keyword">if</span> (opts.watch &amp;&amp; opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}</code></pre><p>&#x5224;&#x65AD;&#x8BE5;vue&#x5B9E;&#x4F8B;&#x662F;&#x5426;&#x5B58;&#x5728;<code>props</code>&#x3001;<code>methods</code>&#x3001;<code>data</code>&#x3001;<code>computed</code>&#x3001;<code>watch</code>&#x8FDB;&#x884C;&#x8C03;&#x7528;&#x76F8;&#x5E94;&#x7684;&#x521D;&#x59CB;&#x5316;&#x51FD;&#x6570;</p><h3 id="articleHeader2"><strong>initProps&#x4E0E;initData</strong></h3><p>&#x4E3B;&#x8981;&#x5DE5;&#x4F5C;&#x662F;&#x8C03;&#x7528;<code>defineProperty</code>&#x7ED9;&#x5C5E;&#x6027;&#x5206;&#x522B;&#x6302;&#x8F7D;get(&#x89E6;&#x53D1;&#x8BE5;&#x94A9;&#x5B50;&#x65F6;&#xFF0C;&#x4F1A;&#x5C06;&#x5F53;&#x524D;&#x5C5E;&#x6027;&#x7684;dep&#x5B9E;&#x4F8B;&#x63A8;&#x5165;&#x5F53;&#x524D;&#x7684;Dep.target&#x4E5F;&#x5C31;&#x662F;&#x5F53;&#x524D;watcher&#x7684;deps&#x4E2D;&#x5373;&#x5B83;&#x8BA2;&#x9605;&#x7684;&#x4F9D;&#x8D56;&#xFF0C;Dep.target&#x4E0B;&#x6587;&#x4F1A;&#x8BB2;&#x5230;&#x3002;&#x4E14;&#x8BE5;dep&#x5B9E;&#x4F8B;&#x4E5F;&#x4F1A;&#x5C06;&#x5F53;&#x524D;watcher&#x5373;&#x89C2;&#x5BDF;&#x8005;&#x63A8;&#x5165;&#x5176;subs&#x6570;&#x7EC4;&#x4E2D;)&#x3001;set&#x65B9;&#x6CD5;&#xFF08;&#x901A;&#x77E5;&#x8BE5;&#x4F9D;&#x8D56;subs&#x4E2D;&#x6240;&#x6709;&#x7684;&#x89C2;&#x5BDF;&#x8005;watcher&#x53BB;&#x8C03;&#x7528;&#x4ED6;&#x4EEC;&#x7684;update&#x65B9;&#x6CD5;&#xFF09;&#x3002;</p><h3 id="articleHeader3"><strong>initComputed</strong></h3><p>&#x5B83;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x5C06;computed&#x5BF9;&#x8C61;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x5C5E;&#x6027;&#x904D;&#x5386;&#xFF0C;&#x5E76;&#x7ED9;&#x8BE5;&#x5C5E;&#x6027;new&#x4E00;&#x4E2A;computed watcher&#xFF08;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E2D;&#x5B9A;&#x4E49;&#x4E86;&#x4E2A;dep&#x4F9D;&#x8D56;&#xFF0C;&#x7ED9;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x8BE5;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;watcher&#x8BA2;&#x9605;&#xFF09;&#x3002;&#x4E5F;&#x4F1A;&#x901A;&#x8FC7;&#x8C03;&#x7528;<code>defineProperty</code>&#x7ED9;computed&#x6302;&#x8F7D;get&#xFF08;get&#x65B9;&#x6CD5;&#xFF09;&#x3001;set&#x65B9;&#x6CD5;&#xFF08;set&#x65B9;&#x6CD5;&#x4F1A;&#x5224;&#x65AD;&#x662F;&#x5426;&#x4F20;&#x5165;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x4F20;&#x5165;&#x4F1A;&#x8BBE;&#x7F6E;&#x6210;noop&#x7A7A;&#x51FD;&#x6570;&#xFF09;<br><code>computed</code>&#x5C5E;&#x6027;&#x7684;get&#x65B9;&#x6CD5;&#x662F;&#x4E0B;&#x9762;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers &amp;&amp; this._computedWatchers[key]
    if (watcher) {
      watcher.depend()
      return watcher.evaluate()
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createComputedGetter</span> (<span class="hljs-params">key</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">computedGetter</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> watcher = <span class="hljs-keyword">this</span>._computedWatchers &amp;&amp; <span class="hljs-keyword">this</span>._computedWatchers[key]
    <span class="hljs-keyword">if</span> (watcher) {
      watcher.depend()
      <span class="hljs-keyword">return</span> watcher.evaluate()
    }
  }
}</code></pre><p>&#x6CE8;&#x610F;&#x5176;&#x4E2D;&#x7684;<code>watcher.depend()</code>,&#x8BE5;&#x65B9;&#x6CD5;&#x8BA9;&#x7528;&#x5230;&#x8BE5;&#x5C5E;&#x6027;&#x7684;watcher&#x89C2;&#x5BDF;&#x8005;&#x8BA2;&#x9605;&#x8BE5;watcher&#x4E2D;&#x7684;&#x4F9D;&#x8D56;&#xFF0C;&#x4E14;&#x8BE5;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;watcher&#x4F1A;&#x5C06;&#x8BA2;&#x9605;&#x5B83;&#x7684;watcher&#x63A8;&#x5165;&#x4ED6;&#x7684;subs&#x4E2D;(&#x5F53;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x503C;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x901A;&#x77E5;&#x8BA2;&#x9605;&#x4ED6;&#x7684;watcher&#x89C2;&#x5BDF;&#x8005;)<br><code>watcher.evaluate()</code>&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x662F;&#x901A;&#x8FC7;&#x8C03;&#x7528;watcher&#x7684;get&#x65B9;&#x6CD5;(&#x5176;&#x4E2D;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;watcher&#x7684;get&#x65B9;&#x6CD5;&#x4F1A;&#x8C03;&#x7528;pushTarget&#x5C06;&#x4E4B;&#x524D;&#x7684;Dep.target&#x5B9E;&#x4F8B;&#x5165;&#x6808;&#xFF0C;&#x5E76;&#x8BBE;&#x7F6E;Dep.target&#x4E3A;&#x8BE5;computed watcher,&#x88AB;&#x8BE5;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4F9D;&#x8D56;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x5C5E;&#x6027;&#x4F1A;&#x5C06;&#x8BE5;computed watcher&#x63A8;&#x5165;&#x5176;subs&#x4E2D;&#xFF0C;&#x6240;&#x4EE5;&#x5F53;&#x88AB;&#x4F9D;&#x8D56;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x5C5E;&#x6027;&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x4F1A;&#x901A;&#x77E5;&#x8BA2;&#x9605;&#x4ED6;&#x7684;computed watcher,computed watcher &#x518D;&#x901A;&#x77E5;&#x8BA2;&#x9605;&#x8BE5;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;watcher&#x8C03;&#x7528;update&#x65B9;&#x6CD5;)&#xFF0C;get&#x65B9;&#x6CD5;&#x4E2D;&#x8C03;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;key&#x7ED1;&#x5B9A;&#x7684;handler&#x51FD;&#x6570;&#x8BA1;&#x7B97;&#x51FA;&#x503C;&#x3002;</p><h3 id="articleHeader4"><strong>initWatch</strong></h3><p>&#x8BE5;watcher &#x4E3A;user watcher&#xFF08;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x81EA;&#x5DF1;&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#xFF09;&#x3002;<br>initWatch&#x7684;&#x4F5C;&#x7528;&#x662F;&#x904D;&#x5386;watch&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x5BF9;&#x6BCF;&#x4E2A;watch&#x76D1;&#x542C;&#x7684;&#x5C5E;&#x6027;&#x8C03;&#x7528;&#x5B9A;&#x4E49;&#x7684;$watch</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true // &#x4EE3;&#x8868;&#x8BE5;watcher&#x662F;&#x7528;&#x6237;&#x81EA;&#x5B9A;&#x4E49;watcher
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      cb.call(vm, watcher.value)
    }
    return function unwatchFn () {
      watcher.teardown()
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Vue.prototype.$watch = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">
    expOrFn: string | Function,
    cb: any,
    options?: Object
  </span>): <span class="hljs-title">Function</span> </span>{
    <span class="hljs-keyword">const</span> vm: Component = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">if</span> (isPlainObject(cb)) {
      <span class="hljs-keyword">return</span> createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = <span class="hljs-literal">true</span> <span class="hljs-comment">// &#x4EE3;&#x8868;&#x8BE5;watcher&#x662F;&#x7528;&#x6237;&#x81EA;&#x5B9A;&#x4E49;watcher</span>
    <span class="hljs-keyword">const</span> watcher = <span class="hljs-keyword">new</span> Watcher(vm, expOrFn, cb, options)
    <span class="hljs-keyword">if</span> (options.immediate) {
      cb.call(vm, watcher.value)
    }
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unwatchFn</span> (<span class="hljs-params"></span>) </span>{
      watcher.teardown()
    }
  }</code></pre><p>&#x4EE3;&#x7801;&#x4E2D;&#x8C03;&#x7528;new Watcher&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E5F;&#x4F1A;&#x540C;render watcher&#x4E00;&#x6837;&#xFF0C;&#x6267;&#x884C;&#x4E0B;watcher&#x7684;get&#x65B9;&#x6CD5;&#xFF0C;&#x8C03;&#x7528;<code>pushTarget</code>&#x5C06;&#x5F53;&#x524D;user watcher&#x8D4B;&#x503C;&#x7ED9;Dep.target,get()&#x4E2D;<code>value = this.getter.call(vm, vm)</code>&#x8FD9;&#x4E2A;&#x8BED;&#x53E5;&#x4F1A;&#x89E6;&#x53D1;&#x8BE5;&#x81EA;&#x5B9A;&#x4E49;watcher&#x76D1;&#x542C;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x5C5E;&#x6027;&#x7684;get&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x5C06;&#x5F53;&#x524D;&#x7684;user watcher&#x63A8;&#x5165;&#x8BE5;&#x5C5E;&#x6027;&#x4F9D;&#x8D56;&#x7684;subs&#x4E2D;&#xFF0C;&#x6240;&#x4EE5;&#x5F53;user watcher&#x76D1;&#x542C;&#x7684;&#x5C5E;&#x6027;set&#x89E6;&#x53D1;&#x540E;&#xFF0C;&#x901A;&#x77E5;&#x8BA2;&#x9605;&#x8BE5;&#x4F9D;&#x8D56;&#x7684;watcher&#x53BB;&#x89E6;&#x53D1;update&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x89E6;&#x53D1;&#x8BE5;watch&#x7ED1;&#x5B9A;&#x7684;key&#x5BF9;&#x5E94;&#x7684;handler&#x3002;&#x7136;&#x540E;&#x5C31;&#x662F;&#x8C03;&#x7528;popTarget&#x51FA;&#x6808;&#x5E76;&#x8D4B;&#x503C;&#x7ED9;Dep.target&#x3002;</p><h2 id="articleHeader5">$mount</h2><p>initState&#x521D;&#x59CB;&#x5316;&#x5DE5;&#x4F5C;&#x5927;&#x81F4;&#x5230;&#x8FD9;&#x91CC;&#x8FC7;&#xFF0C;&#x63A5;&#x4E0B;&#x53BB;&#x4F1A;&#x6267;&#x884C;$mount&#x5F00;&#x59CB;&#x6E32;&#x67D3;&#x5DE5;&#x4F5C;<br>$mount&#x4E3B;&#x8981;&#x5DE5;&#x4F5C;&#xFF1A;new&#x4E86;&#x4E00;&#x4E2A;&#x6E32;&#x67D3;Watcher&#xFF0C;&#x5E76;&#x5C06;updateCompent&#x4F5C;&#x4E3A;callback&#x4F20;&#x9012;&#x8FDB;&#x53BB;&#x5E76;&#x6267;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="updateComponent = () =&gt; {
      vm._update(vm._render(), hydrating)
    }
new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted) {
        callHook(vm, &apos;beforeUpdate&apos;)
      }
    }
  }, true /* isRenderWatcher */)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">updateComponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      vm._update(vm._render(), hydrating)
    }
<span class="hljs-keyword">new</span> Watcher(vm, updateComponent, noop, {
    before () {
      <span class="hljs-keyword">if</span> (vm._isMounted) {
        callHook(vm, <span class="hljs-string">&apos;beforeUpdate&apos;</span>)
      }
    }
  }, <span class="hljs-literal">true</span> <span class="hljs-comment">/* isRenderWatcher */</span>)</code></pre><p>&#x4E09;&#x79CD;watcher&#x4E2D;new Watcher&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EA;&#x6709;computed watcher&#x4E0D;&#x4F1A;&#x4E00;&#x5F00;&#x59CB;&#x5C31;&#x6267;&#x884C;&#x5B83;&#x7684;get()&#x65B9;&#x6CD5;&#x3002;$mount&#x91CC;&#x9762;new&#x7684;&#x8FD9;&#x4E2A;render watcher&#x4F1A;&#x8C03;&#x7528;<code>get()</code>&#x65B9;&#x6CD5;&#xFF0C;&#x8C03;&#x7528;<code>pushTarget</code>&#x5C06;&#x5F53;&#x524D;render watcher&#x8D4B;&#x503C;&#x7ED9;Dep.target&#x3002;&#x63A5;&#x4E0B;&#x53BB;&#x91CD;&#x5934;&#x620F;&#x6765;&#x4E86;&#xFF0C;&#x8C03;&#x7528;<code>updateComponent</code>,&#x8BE5;&#x65B9;&#x6CD5;&#x4F1A;&#x6267;&#x884C;<code>vm._update(vm._render(), hydrating)</code>&#xFF0C;&#x5176;&#x4E2D;render&#x51FD;&#x6570;&#x4F1A;&#x89E6;&#x53D1;html&#x4E2D;&#x4F7F;&#x7528;&#x5230;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x5C5E;&#x6027;&#x7684;get&#x94A9;&#x5B50;&#x3002;get&#x94A9;&#x5B50;&#x4F1A;&#x8BA9;&#x8BE5;&#x54CD;&#x5E94;&#x5F0F;&#x5C5E;&#x6027;&#x7684;&#x4F9D;&#x8D56;&#x5B9E;&#x4F8B;dep&#x5C06;&#x5F53;&#x524D;&#x7684;render watcher&#x63A8;&#x5165;&#x5176;subs&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x6240;&#x4EE5;&#x5F53;&#x4F9D;&#x8D56;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x5C5E;&#x6027;&#x6539;&#x53D8;&#x4E4B;&#x540E;&#xFF0C;&#x4F1A;&#x904D;&#x5386;subs&#x901A;&#x77E5;&#x8BA2;&#x9605;&#x5B83;&#x7684;watcher&#x53BB;&#x8C03;&#x7528;update()&#x3002;</p><h2 id="articleHeader6">&#x4F8B;&#x5B50;</h2><p>&#x53EF;&#x80FD;&#x5927;&#x5BB6;&#x5BF9;watcher&#x548C;dep&#x8C03;&#x6765;&#x8C03;&#x53BB;&#x4E00;&#x5934;&#x96FE;&#x6C34;&#xFF0C;&#x6211;&#x8BB2;&#x4E2A;&#x5B9E;&#x4F8B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;
      &lt;div&gt;{{a}}&lt;/div&gt;
      &lt;div&gt;{{b}}&lt;/div&gt;
    &lt;/div&gt;
new Vue({
  el: &quot;#app&quot;,
  data() {
    return {
      a:1,
    }
  },
  computed:{
    b() {
      return a+1
    }
  },
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">&lt;div id=<span class="hljs-string">&quot;app&quot;</span>&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{"a"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      &lt;div&gt;{{b}}&lt;<span class="hljs-regexp">/div&gt;
    &lt;/</span>div&gt;
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">&quot;#app&quot;</span>,
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,
    }
  },
  <span class="hljs-attr">computed</span>:{
    b() {
      <span class="hljs-keyword">return</span> a+<span class="hljs-number">1</span>
    }
  },
})</code></pre><p>&#x6211;&#x76F4;&#x63A5;&#x4ECE;&#x6E32;&#x67D3;&#x5F00;&#x59CB;&#x8BB2;&#xFF0C;&#x53EA;&#x8BB2;&#x8DDF;dep&#x8DDF;watcher&#x6709;&#x5173;&#x7684;<br><strong>$mount</strong>&#xFF1A;new&#x4E00;&#x4E2A;&#x6E32;&#x67D3;watcher&#xFF08;watcher&#x7684;get&#x65B9;&#x6CD5;&#x4E2D;&#x4F1A;&#x5C06;&#x6E32;&#x67D3;watcher&#x8D4B;&#x503C;&#x7ED9;Dep.target&#xFF09;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1; <code>vm._update(vm._render(), hydrating)</code>&#xFF0C;render&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x83B7;&#x53D6;html&#x4E2D;&#x7528;&#x5230;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x5C5E;&#x6027;&#xFF0C;&#x4E0A;&#x9762;&#x4F8B;&#x5B50;&#x4E2D;&#x5148;&#x7528;&#x5230;&#x4E86;a,&#x8FD9;&#x65F6;&#x4F1A;&#x89E6;&#x53D1;a&#x7684;get&#x94A9;&#x5B50;,&#x5176;&#x4E2D;<code>dep.depend()</code>&#x4F1A;&#x5C06;&#x5F53;&#x524D;&#x7684;&#x6E32;&#x67D3;watcher&#x63A8;&#x5165;&#x5230;a&#x5C5E;&#x6027;&#x7684;dep&#x7684;subs&#x6570;&#x7EC4;&#x4E2D;&#x3002;<br>&#x63A5;&#x4E0B;&#x53BB;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#xFF0C;&#x8BBF;&#x95EE;&#x5230;b&#xFF08;b&#x662F;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x503C;&#xFF09;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;get&#x65B9;&#x6CD5;&#x3002;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;get&#x65B9;&#x6CD5;&#x662F;&#x8C03;&#x7528;<code>createComputedGetter</code>&#x51FD;&#x6570;&#x540E;&#x7684;&#x8FD4;&#x56DE;&#x51FD;&#x6570;<code>computedGetter</code>&#xFF0C;<code>computedGetter</code>&#x51FD;&#x6570;&#x4E2D;&#x4F1A;&#x6267;&#x884C;<code>watcher.depend()</code>&#x3002;Watcher&#x7684;depend&#x65B9;&#x6CD5;&#x662F;&#x4E13;&#x95E8;&#x7559;&#x7ED9;computed watcher&#x4F7F;&#x7528;&#x7684;&#x3002;&#x521A;&#x624D;&#x4E0A;&#x9762;&#x8BF4;&#x8FC7;&#x4E86;&#x9664;&#x4E86;computed watcher&#xFF0C;&#x5176;&#x4ED6;&#x4E24;&#x79CD;watcher&#x5728;new &#x5B8C;&#x4E4B;&#x540E;&#x90FD;&#x4F1A;&#x6267;&#x884C;&#x4ED6;&#x4EEC;&#x7684;get&#x65B9;&#x6CD5;&#xFF0C;&#x90A3;&#x4E48;computed watcher&#x5728;new&#x5B8C;&#x4E4B;&#x540E;&#x5E72;&#x561B;&#x5462;&#xFF0C;&#x5B83;&#x4F1A;new&#x4E00;&#x4E2A;dep&#x3002;&#x56DE;&#x5230;&#x521A;&#x624D;&#x8BF4;&#x7684;&#x4E13;&#x95E8;&#x4E3A;computed watcher&#x5F00;&#x8BBE;&#x7684;&#x65B9;&#x6CD5;<code>watcher.depend()</code>&#xFF0C;&#x4ED6;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x6267;&#x884C;<code>this.dep.depend()</code>&#xFF08;computed watcher&#x5B9A;&#x4E49;&#x7684;dep&#x5C31;&#x662F;&#x5728;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x5230;&#x7684;&#xFF09;&#x3002;<code>this.dep.depend()</code>&#x4F1A;&#x8BA9;&#x5F53;&#x524D;&#x7684;&#x6E32;&#x67D3;watcher&#x8BA2;&#x9605;&#x8BE5;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4F9D;&#x8D56;&#xFF0C;&#x8BE5;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E5F;&#x4F1A;&#x5C06;&#x6E32;&#x67D3;watcher&#x63A8;&#x5165;&#x5230;&#x5B83;&#x81EA;&#x5DF1;&#x7684;subs&#xFF08;[render watcher]&#xFF09;&#x4E2D;&#xFF0C;&#x5F53;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x503C;&#x4FEE;&#x6539;&#x4E4B;&#x540E;&#x4F1A;&#x901A;&#x77E5;subs&#x4E2D;&#x7684;watcher&#x8C03;&#x7528;<code>update()</code>,&#x6240;&#x4EE5;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x503C;&#x53D8;&#x4E86;&#x9875;&#x9762;&#x80FD;&#x5237;&#x65B0;&#x3002;&#x56DE;&#x5230;&#x524D;&#x9762;&#x8BF4;&#x7684;&#x89E6;&#x53D1;b&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;get&#x94A9;&#x5B50;&#x90A3;&#x91CC;&#xFF0C;get&#x94A9;&#x5B50;&#x6700;&#x540E;&#x4F1A;&#x6267;&#x884C;<code>watcher.evaluate()</code>,<code>watcher.evaluate()</code>&#x4F1A;&#x6267;&#x884C;computed watcher&#x7684;<code>get()</code>&#x65B9;&#x6CD5;&#x3002;&#x8FD9;&#x65F6;&#x5019;&#x91CD;&#x70B9;&#x6765;&#x4E86;&#xFF0C;&#x4F1A;&#x5C06;Dep.target&#xFF08;render watcher&#xFF09;&#x63A8;&#x5165;targetStack&#x6808;&#x4E2D;&#xFF08;&#x5B58;&#x5165;&#x4E4B;&#x540E;&#x4EE5;&#x4FBF;&#x5F85;&#x4F1A;&#x513F;&#x53D6;&#x51FA;&#x7EE7;&#x7EED;&#x7528;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x8FD9;&#x4E2A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;computed watcher&#x8D4B;&#x503C;&#x7ED9;Dep.target&#x3002;get&#x65B9;&#x6CD5;&#x4E2D;<code>value = this.getter.call(vm, vm)</code>,&#x4F1A;&#x6267;&#x884C;computed&#x5C5E;&#x6027;&#x7ED1;&#x5B9A;&#x7684;handler&#x3002;&#x5982;&#x4E0A;&#x9762;&#x4F8B;&#x5B50;&#x4E2D;return a + 1&#x3002;&#x4F7F;&#x7528;&#x4E86;a&#x90A3;&#x4E48;&#x5C31;&#x4E00;&#x5B9A;&#x4F1A;&#x89E6;&#x53D1;a&#x7684;get&#x94A9;&#x5B50;&#xFF0C;get&#x94A9;&#x5B50;&#x53C8;&#x4F1A;&#x8C03;&#x7528;<code>dep.depend()</code>&#xFF0C;dep.depend()&#x4F1A;&#x8BA9;computed watcher&#x5C06;dep&#x5B58;&#x5165;&#x5B83;&#x7684;deps&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;a&#x7684;dep&#x4F1A;&#x5C06;<strong>&#x5F53;&#x524D;&#x7684;Dep.target(computed watcher)&#x5B58;&#x5165;&#x5176;subs&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x5F53;&#x524D;&#x4F8B;&#x5B50;&#x4E2D;a&#x7684;subs&#x4E2D;&#x5C31;&#x4F1A;&#x662F;[render watcher,computed watcher]</strong>,&#x6240;&#x4EE5;a&#x503C;&#x53D8;&#x5316;&#x4F1A;&#x904D;&#x5386;a&#x7684;subs&#x4E2D;&#x7684;watcher&#x8C03;&#x7528;<code>update()</code>&#x65B9;&#x6CD5;&#xFF0C;html&#x4E2D;&#x7528;&#x5230;&#x7684;a&#x4F1A;&#x5237;&#x65B0;&#xFF0C;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;watcher&#x8C03;&#x7528;<code>update()</code>&#x65B9;&#x6CD5;&#x4F1A;&#x901A;&#x77E5;&#x4ED6;&#x81EA;&#x5DF1;&#x7684;subs&#xFF08;[render watcher]&#xFF09;&#x4E2D;render watcher&#x53BB;&#x8C03;&#x7528;update&#x65B9;&#x6CD5;&#xFF0C;html&#x4E2D;&#x7528;&#x5230;&#x7684;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;b&#x624D;&#x4F1A;&#x5237;&#x65B0;dom&#xFF08;&#x8FD9;&#x91CC;&#x63D0;&#x4E2A;&#x9192;&#xFF0C;&#x6211;&#x53EA;&#x662F;&#x7C97;&#x7565;&#x7684;&#x8BB2;&#xFF0C;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4F9D;&#x8D56;&#x7684;&#x5C5E;&#x6027;&#x53D8;&#x5316;&#x540E;&#x4ED6;&#x4E0D;&#x4E00;&#x5B9A;&#x4F1A;&#x89E6;&#x53D1;&#x66F4;&#x65B0;&#xFF0C;&#x4ED6;&#x4F1A;&#x6BD4;&#x8F83;&#x8BA1;&#x7B97;&#x5B8C;&#x4E4B;&#x540E;&#x7684;&#x503C;&#x662F;&#x5426;&#x53D8;&#x5316;&#xFF09;&#x3002;computed watcher&#x7684;get()&#x65B9;&#x6CD5;&#x6700;&#x540E;&#x4F1A;&#x8C03;&#x7528;<code>popTarget()</code>,&#x5C06;&#x4E4B;&#x524D;&#x5B58;&#x5165;render watcher&#x51FA;&#x6808;&#x5E76;&#x8D4B;&#x503C;&#x7ED9;Dep.target&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x6211;&#x4F8B;&#x5B50;&#x4E2D;targetStack&#x5C31;&#x53D8;&#x6210;&#x7A7A;&#x6570;&#x7EC4;&#x4E86;&#x3002;render watcher&#x7684;get&#x65B9;&#x6CD5;&#x6267;&#x884C;&#x5230;&#x6700;&#x540E;&#x4E5F;&#x4F1A;&#x51FA;&#x6808;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x4F1A;&#x5C06;Dep.target&#x8D4B;&#x503C;&#x4F1A;&#x7A7A;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue响应式原理

## 原文链接
[https://segmentfault.com/a/1190000016333054](https://segmentfault.com/a/1190000016333054)

