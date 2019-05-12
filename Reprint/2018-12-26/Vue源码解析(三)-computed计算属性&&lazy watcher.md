---
title: 'Vue源码解析(三)-computed计算属性&&lazy watcher' 
date: 2018-12-26 2:30:14
hidden: true
slug: bel0lilt1hg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>1、<a href="https://segmentfault.com/a/1190000011816036">Vue源码解析(一)-模版渲染</a><br>2、<a href="https://segmentfault.com/a/1190000011850156" target="_blank">Vue源码解析(二)-MVVM双向绑定</a></p>
<h2 id="articleHeader1">demo</h2>
<p>官网给出的demo如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;></div>

new Vue({
  el: '#app',
  template: 
  `<div>
    <p>Original message is: "{{" message "}}"</p>
    <p>Computed reversed message:: "{{" reversedMessage "}}"</p>
  </div>`,
  data(){
    return {
      message: 'Hello',
    }
  },
  computed:{
    reversedMessage(){
        return this.message.split('').reverse().join('')
    }
  }
})
结果：
Original message: &quot;Hello&quot;
Computed reversed message: &quot;olleH&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>&lt;div id=<span class="hljs-string">"app"</span>&gt;&lt;/div&gt;

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#app'</span>,
  template: 
  `<span class="hljs-symbol">&lt;div&gt;</span>
    <span class="hljs-symbol">&lt;p&gt;</span>Original message i<span class="hljs-variable">s:</span> "{{" message "}}"&lt;/<span class="hljs-keyword">p</span>&gt;
    <span class="hljs-symbol">&lt;p&gt;</span>Computed reversed message:: "{{" reversedMessage "}}"&lt;/<span class="hljs-keyword">p</span>&gt;
  &lt;/div&gt;`,
  data(){
    <span class="hljs-keyword">return</span> {
      message: <span class="hljs-string">'Hello'</span>,
    }
  },
  computed:{
    reversedMessage(){
        <span class="hljs-keyword">return</span> this.message.<span class="hljs-keyword">split</span>(<span class="hljs-string">''</span>).<span class="hljs-built_in">reverse</span>().<span class="hljs-keyword">join</span>(<span class="hljs-string">''</span>)
    }
  }
})
结果：
Original message: <span class="hljs-string">"Hello"</span>
Computed reversed message: <span class="hljs-string">"olleH"</span></code></pre>
<h2 id="articleHeader2">源码分析</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//判断参数是否包含computed属性
if (opts.computed) { initComputed(vm, opts.computed); }

function initComputed (vm, computed) {
   var watchers = vm._computedWatchers = Object.create(null);
   //本例中key=‘reversedMessage’
   for (var key in computed) {
      //本例中userDef和getter是reversedMessage函数
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get;
      //监听计算属性,设置lazy=true，延迟执行watcher的get方法
      watchers[key] = new Watcher(vm,getter,{lazy:true});
      //设置可以通过vm[key](本例vm.reversedMessage)方式访问计算属性
      defineComputed(vm, key, userDef);
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//判断参数是否包含computed属性</span>
<span class="hljs-keyword">if</span> (opts.computed) { initComputed(vm, opts.computed); }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initComputed</span> (<span class="hljs-params">vm, computed</span>) </span>{
   <span class="hljs-keyword">var</span> watchers = vm._computedWatchers = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>);
   <span class="hljs-comment">//本例中key=‘reversedMessage’</span>
   <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> computed) {
      <span class="hljs-comment">//本例中userDef和getter是reversedMessage函数</span>
      <span class="hljs-keyword">var</span> userDef = computed[key];
      <span class="hljs-keyword">var</span> getter = <span class="hljs-keyword">typeof</span> userDef === <span class="hljs-string">'function'</span> ? userDef : userDef.get;
      <span class="hljs-comment">//监听计算属性,设置lazy=true，延迟执行watcher的get方法</span>
      watchers[key] = <span class="hljs-keyword">new</span> Watcher(vm,getter,{<span class="hljs-attr">lazy</span>:<span class="hljs-literal">true</span>});
      <span class="hljs-comment">//设置可以通过vm[key](本例vm.reversedMessage)方式访问计算属性</span>
      defineComputed(vm, key, userDef);
   }
}</code></pre>
<p>1、vue对象初始化时会针对computed属性的所有key值分别new一个watcher对象，在<a href="https://segmentfault.com/a/1190000011850156">Vue源码解析(二)</a>中有详细介绍watcher的原理，当时提到watcher初始化会立即调用一次watcher.get方法,然后实际上可以通过传入{lazy:true}参数来延迟watcher.get方法的执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Watcher = function Watcher (vm,expOrFn,options){
    //延迟计算
    this.lazy = options.lazy;
    //还没有计算，所以数据是脏的
    this.dirty = options.lazy;
    this.value = this.lazy
    ? undefined
    //计算getter值和收集依赖
    : this.get();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> Watcher = function Watcher (vm,expOrFn,options){
    <span class="hljs-comment">//延迟计算</span>
    <span class="hljs-keyword">this</span>.lazy = options.lazy;
    <span class="hljs-comment">//还没有计算，所以数据是脏的</span>
    <span class="hljs-keyword">this</span>.dirty = options.lazy;
    <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.lazy
    ? undefined
    <span class="hljs-comment">//计算getter值和收集依赖</span>
    : <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>();
}</code></pre>
<p>2、defineComputed(vm, key, userDef)，将computed属性代理到vm上，通过vm[key]访问computed属性值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defineComputed (target,key,userDef){
    //userDef是function，getter设为userDef或userDef的值
    if (typeof userDef === 'function') {
        //shouldCache是否缓存，这也是使用computed属性最重要的原因，computed值会被缓存起来，而不是每次重新执行函数生成
        sharedPropertyDefinition.get = shouldCache
          ? createComputedGetter(key)
          : userDef;
        sharedPropertyDefinition.set = null;
    //userDef是不是function，getter设为userDef.get,setter设为userDef.set
    } else {
        sharedPropertyDefinition.get = userDef.get
          ? shouldCache &amp;&amp; userDef.cache !== false
            ? createComputedGetter(key)
            : userDef.get
          : null;
        sharedPropertyDefinition.set = userDef.set
          ? userDef.set
          : null;
    }
    //，将computed属性代理到vm上，通过vm[key]访问computed属性值
    Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
      //shouldCache = true时直接返回缓存值watcher.value
      var watcher = this._computedWatchers &amp;&amp; this._computedWatchers[key];
      //存在脏数据则重新计算watcher的值
      if (watcher.dirty) {
        watcher.evaluate();
      }
      //直接返回缓存中watcher的值
      return watcher.value
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>function defineComputed (target,<span class="hljs-built_in">key</span>,userDef){
    <span class="hljs-comment">//userDef是function，getter设为userDef或userDef的值</span>
    <span class="hljs-keyword">if</span> (typeof userDef === <span class="hljs-string">'function'</span>) {
        <span class="hljs-comment">//shouldCache是否缓存，这也是使用computed属性最重要的原因，computed值会被缓存起来，而不是每次重新执行函数生成</span>
        sharedPropertyDefinition.<span class="hljs-built_in">get</span> = shouldCache
          ? createComputedGetter(<span class="hljs-built_in">key</span>)
          : userDef;
        sharedPropertyDefinition.<span class="hljs-built_in">set</span> = <span class="hljs-keyword">null</span>;
    <span class="hljs-comment">//userDef是不是function，getter设为userDef.get,setter设为userDef.set</span>
    } <span class="hljs-keyword">else</span> {
        sharedPropertyDefinition.<span class="hljs-built_in">get</span> = userDef.<span class="hljs-built_in">get</span>
          ? shouldCache &amp;&amp; userDef.cache !== <span class="hljs-keyword">false</span>
            ? createComputedGetter(<span class="hljs-built_in">key</span>)
            : userDef.<span class="hljs-built_in">get</span>
          : <span class="hljs-keyword">null</span>;
        sharedPropertyDefinition.<span class="hljs-built_in">set</span> = userDef.<span class="hljs-built_in">set</span>
          ? userDef.<span class="hljs-built_in">set</span>
          : <span class="hljs-keyword">null</span>;
    }
    <span class="hljs-comment">//，将computed属性代理到vm上，通过vm[key]访问computed属性值</span>
    <span class="hljs-keyword">Object</span>.defineProperty(target, <span class="hljs-built_in">key</span>, sharedPropertyDefinition);
}

function createComputedGetter (<span class="hljs-built_in">key</span>) {
  <span class="hljs-keyword">return</span> function computedGetter () {
      <span class="hljs-comment">//shouldCache = true时直接返回缓存值watcher.value</span>
      var watcher = <span class="hljs-keyword">this</span>._computedWatchers &amp;&amp; <span class="hljs-keyword">this</span>._computedWatchers[<span class="hljs-built_in">key</span>];
      <span class="hljs-comment">//存在脏数据则重新计算watcher的值</span>
      <span class="hljs-keyword">if</span> (watcher.dirty) {
        watcher.evaluate();
      }
      <span class="hljs-comment">//直接返回缓存中watcher的值</span>
      <span class="hljs-keyword">return</span> watcher.value
    }
  }
}</code></pre>
<p>3、前面提到watcher.get方法会延迟执行，那么到底啥时执行呢？这又得提到<a href="https://segmentfault.com/a/1190000011850156" target="_blank">Vue源码解析(二)</a>中的updateComponent方法，由于本例引用了计算属性"{{" reversedMessage "}}"，updateComponent中的render函数则会调用vm.reversedMessage,因此触发第二步的sharedPropertyDefinition.get函数,调用        watcher.evaluate(),最终调用watcher.get()来计算watcher的值和收集依赖。（watcher.get方法将监听vm.reversedMessage的watcher对象和发布vm.message变化的dep对象绑定，因此当vm.message变化时，vm.reversedMessage值也会同步变化）<br>因此watcher.get是在第一次访问vm.reversedMessage对象时调用的，所以如果模版没有用到"{{" reversedMessage "}}"值的话vm.reversedMessage的值是不会被计算的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */</span>
Watcher.prototype.evaluate = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">evaluate</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.get();
  <span class="hljs-keyword">this</span>.dirty = <span class="hljs-literal">false</span>;
};</code></pre>
<h2 id="articleHeader3">双向绑定问题</h2>
<p>正好之前看到过一个问题<a href="https://segmentfault.com/q/1010000004571556">vue.js使用computed计算某个属性后，该属性的双向绑定没了</a>,看了本文的源码后大家应该了解了计算属性用在v-model上应该设置setter方法，例如本例中demo应该这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: '#app',
  template: 
  `<div>
    <input v-model=&quot;reversedMessage&quot; placeholder=&quot;edit me&quot;>
    <p>Original message is: "{{" message "}}"</p>
    <p>Computed reversed message:: "{{" reversedMessage "}}"</p>
  </div>`,
  data(){
    return {
      message: 'jixiangwu',
    }
  },
  computed:{
    reversedMessage:{
        get(){
            return this.message.split('').reverse().join('')
        },
        set(val){
            this.message = val.split('').reverse().join('')
        }
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#app'</span>,
  template: 
  `<span class="hljs-symbol">&lt;div&gt;</span>
    &lt;<span class="hljs-built_in">input</span> v-model=<span class="hljs-string">"reversedMessage"</span> placeholder=<span class="hljs-string">"edit me"</span>&gt;
    <span class="hljs-symbol">&lt;p&gt;</span>Original message i<span class="hljs-variable">s:</span> "{{" message "}}"&lt;/<span class="hljs-keyword">p</span>&gt;
    <span class="hljs-symbol">&lt;p&gt;</span>Computed reversed message:: "{{" reversedMessage "}}"&lt;/<span class="hljs-keyword">p</span>&gt;
  &lt;/div&gt;`,
  data(){
    <span class="hljs-keyword">return</span> {
      message: <span class="hljs-string">'jixiangwu'</span>,
    }
  },
  computed:{
    reversedMessage:{
        <span class="hljs-built_in">get</span>(){
            <span class="hljs-keyword">return</span> this.message.<span class="hljs-keyword">split</span>(<span class="hljs-string">''</span>).<span class="hljs-built_in">reverse</span>().<span class="hljs-keyword">join</span>(<span class="hljs-string">''</span>)
        },
        <span class="hljs-keyword">set</span>(val){
            this.message = val.<span class="hljs-keyword">split</span>(<span class="hljs-string">''</span>).<span class="hljs-built_in">reverse</span>().<span class="hljs-keyword">join</span>(<span class="hljs-string">''</span>)
        }
    }
  }
})</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue源码解析(三)-computed计算属性&&lazy watcher

## 原文链接
[https://segmentfault.com/a/1190000011912328](https://segmentfault.com/a/1190000011912328)

