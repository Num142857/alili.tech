---
title: 'vue源码解析系列－compute实现机制' 
date: 2019-01-11 2:30:08
hidden: true
slug: 73n3ycuuo4
categories: [reprint]
---

{{< raw >}}

                    
<p>本来vue的响应式应该才是重中之重。但是网上的文章很多很多。在看computed的实现之前。肯定还是要把vue的响应式如何实现好好看一下。或者说两者根本就是一样的东西。这边推荐几篇文章关于vue的响应式。</p>
<p><a href="http://www.cnblogs.com/caizhenbo/p/6710174.html" rel="nofollow noreferrer" target="_blank">vue响应式简单实现</a></p>
<p><a href="http://www.imooc.com/article/14466" rel="nofollow noreferrer" target="_blank">vue慕课响应式手记</a></p>
<p>还是看看官网对于响应式的解释：<br><span class="img-wrap"><img data-src="/img/bVPuc4?w=1800&amp;h=1482" src="https://static.alili.tech/img/bVPuc4?w=1800&amp;h=1482" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>总的来说。vue实现响应式的关键有三个：watcher,dep,observe;</p>
<ol>
<li><p>observe:遍历data中的属性。在get,set方法中设置核心数据劫持</p></li>
<li><p>dep：每个属性都有一个自己的dep（消息订阅起）用于订制该属性上的所有观察者</p></li>
<li><p>watcher：观察者，通过dep实现对响应属性的监听观察。观察得到结果后，主动触发自己的回调</p></li>
</ol>
<p>可以去看看vue2.3的这三部分源码。中间还是有很多精美的设计。比如一个全局唯一的Dep.target，在任何时候都是唯一的值。以确保同一时间只有一个观察者在订阅。再比如，watcher中也会存下相关的订阅器，实现去重和实现同一个观察者的分组（这里是实现computed的关键），再如。watcher中的id也会唯一。用于异步更新的时候不同时出发相同的订阅。仔细看看会收获不小。改天我把所有的响应式的代码也整理一下。<br>   在理解了响应式的情况下。我们来看看computed的实现。最简单的一个demo如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<html>
<head>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; />
</head>
<body>
<div id=&quot;app&quot;>
  <div name=&quot;test&quot;>"{{"computeA"}}"</div>

</div>
</body>
<script src=&quot;vue.js&quot;></script>
<script type=&quot;text/javascript&quot;>
  new Vue({
  el: '#app',
  data: function () {
    return {
      firstName: 111,
      lastName: 222
    }
  },
  computed: {
    computeA: function () {
      return this.firstName + ' ' + this.lastName
    }
  },
  created(){
    setTimeout(
      () => {
        this.firstName = 333;
      },1000
    )
  }
})
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=utf-8"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"test"</span>&gt;</span></span><span class="hljs-template-variable">"{{"computeA"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">firstName</span>: <span class="hljs-number">111</span>,
      <span class="hljs-attr">lastName</span>: <span class="hljs-number">222</span>
    }
  },
  <span class="hljs-attr">computed</span>: {
    <span class="hljs-attr">computeA</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.firstName + <span class="hljs-string">' '</span> + <span class="hljs-keyword">this</span>.lastName
    }
  },
  created(){
    setTimeout(
      <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.firstName = <span class="hljs-number">333</span>;
      },<span class="hljs-number">1000</span>
    )
  }
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>我们来从源码的角度看看发生了什么：</p>
<ol><li><p>在初始化实例创建响应式的时候。对options中的computed做了特殊处理：</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    {
      if (getter === undefined) {
        warn(
          (&quot;No getter function has been defined for computed property \&quot;&quot; + key + &quot;\&quot;.&quot;),
          vm
        );
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);//为每一个computed项目订制一个watcher

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn((&quot;The computed property \&quot;&quot; + key + &quot;\&quot; is already defined in data.&quot;), vm);
      } else if (vm.$options.props &amp;&amp; key in vm.$options.props) {
        warn((&quot;The computed property \&quot;&quot; + key + &quot;\&quot; is already defined as a prop.&quot;), vm);
      }
    }
  

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {//构造该computed的get函数
  return function computedGetter () {
    var watcher = this._computedWatchers &amp;&amp; this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();//收集该watcher的订阅
      }
      if (Dep.target) {
        watcher.depend();//同一为这一组订阅再加上组件re-render的订阅（该订阅负责更新组件）
      }
      return watcher.value
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initComputed</span> </span>(vm, computed) {
  <span class="hljs-keyword">var</span> watchers = vm._computedWatchers = Object.create(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> computed) {
    <span class="hljs-keyword">var</span> userDef = computed[key];
    <span class="hljs-keyword">var</span> getter = typeof userDef === <span class="hljs-string">'function'</span> ? userDef : <span class="hljs-type">userDef</span>.<span class="hljs-keyword">get</span>;
    {
      <span class="hljs-keyword">if</span> (getter === undefined) {
        warn(
          (<span class="hljs-string">"No getter function has been defined for computed property \""</span> + key + <span class="hljs-string">"\"."</span>),
          vm
        );
        getter = noop;
      }
    }
    <span class="hljs-comment">// create internal watcher for the computed property.</span>
    watchers[key] = <span class="hljs-keyword">new</span> <span class="hljs-type">Watcher</span>(vm, getter, noop, computedWatcherOptions);<span class="hljs-comment">//为每一个computed项目订制一个watcher</span>

    <span class="hljs-comment">// component-defined computed properties are already defined on the</span>
    <span class="hljs-comment">// component prototype. We only need to define computed properties defined</span>
    <span class="hljs-comment">// at instantiation here.</span>
    <span class="hljs-keyword">if</span> (!(key <span class="hljs-keyword">in</span> vm)) {
      defineComputed(vm, key, userDef);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (key <span class="hljs-keyword">in</span> vm.$data) {
        warn((<span class="hljs-string">"The computed property \""</span> + key + <span class="hljs-string">"\" is already defined in data."</span>), vm);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (vm.$options.props &amp;&amp; key <span class="hljs-keyword">in</span> vm.$options.props) {
        warn((<span class="hljs-string">"The computed property \""</span> + key + <span class="hljs-string">"\" is already defined as a prop."</span>), vm);
      }
    }
  

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineComputed</span> </span>(target, key, userDef) {
  <span class="hljs-keyword">if</span> (typeof userDef === <span class="hljs-string">'function'</span>) {
    sharedPropertyDefinition.<span class="hljs-keyword">get</span> = createComputedGetter(key);
    sharedPropertyDefinition.<span class="hljs-keyword">set</span> = noop;
  } <span class="hljs-keyword">else</span> {
    sharedPropertyDefinition.<span class="hljs-keyword">get</span> = userDef.<span class="hljs-keyword">get</span>
      ? userDef.cache !== <span class="hljs-literal">false</span>
        ? createComputedGetter(key)
        : <span class="hljs-type">userDef</span>.<span class="hljs-keyword">get</span>
      : <span class="hljs-type">noop</span>;
    sharedPropertyDefinition.<span class="hljs-keyword">set</span> = userDef.<span class="hljs-keyword">set</span>
      ? userDef.<span class="hljs-keyword">set</span>
      : <span class="hljs-type">noop</span>;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createComputedGetter</span> </span>(key) {<span class="hljs-comment">//构造该computed的get函数</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">computedGetter</span> </span>() {
    <span class="hljs-keyword">var</span> watcher = <span class="hljs-built_in">this</span>._computedWatchers &amp;&amp; <span class="hljs-built_in">this</span>._computedWatchers[key];
    <span class="hljs-keyword">if</span> (watcher) {
      <span class="hljs-keyword">if</span> (watcher.dirty) {
        watcher.evaluate();<span class="hljs-comment">//收集该watcher的订阅</span>
      }
      <span class="hljs-keyword">if</span> (Dep.target) {
        watcher.depend();<span class="hljs-comment">//同一为这一组订阅再加上组件re-render的订阅（该订阅负责更新组件）</span>
      }
      <span class="hljs-keyword">return</span> watcher.value
    }
  }
}</code></pre>
<p>总的来说。理解了响应式的构建之后。再来看computed的实现还是很直观的。组件初始化的时候。computed项和data中的分别建立响应式。data中的数据直接对属性的get,set做数据拦截。而computed则建立一个新的watcher，在组件渲染的时候。先touch一下这个computed的getter函数。将这个watcher订阅起来。这里相当于这个computed的watcher订阅了firstname和lastname。touch完后。Dep.target此时又变为之前那个用于更新组件的。再通过watcher.depend()将这个组统一加上这个订阅。这样一旦firstname和lastname变了。同时会触发两个订阅更新。其中一个便是更新组件。重新re-render的函数。感觉看的还不够细啊</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue源码解析系列－compute实现机制

## 原文链接
[https://segmentfault.com/a/1190000009862528](https://segmentfault.com/a/1190000009862528)

