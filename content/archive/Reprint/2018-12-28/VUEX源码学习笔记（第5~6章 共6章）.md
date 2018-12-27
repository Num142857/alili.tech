---
title: 'VUEX源码学习笔记（第5~6章 共6章）' 
date: 2018-12-28 2:30:10
hidden: true
slug: 219ekj5pf8
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">第五章 辅助函数</h1>
<p>在第一章我们曾经说过：</p>
<blockquote>VUEX采用的是典型的IIFE(立即执行函数表达式)模式，当代码被加载(通过<code>&lt;script&gt;</code>或<code>Vue.use()</code>)后，VUEX会返回一个对象，这个对象包含了<code>Store</code>类、<code>install</code>方法、<code>mapState</code>辅助函数、<code>mapMutations</code>辅助函数、<code>mapGetters</code>辅助函数、<code>mapActions</code>辅助函数、<code>createNamespacedHelpers</code>辅助函数以及当前的版本号<code>version</code>。</blockquote>
<p>本章就将详细讲解<code>mapState</code>、<code>mapMutations</code>、<code>mapGetters</code>、<code>mapActions</code>、<code>createNamespacedHelpers这5个辅助和函数。</code></p>
<h2 id="articleHeader1">5.1 主要辅助函数</h2>
<h3 id="articleHeader2">5.1.1 mapState</h3>
<p>如果你在使用VUEX过程中使用过<code>mapState</code>辅助函数将state映射为计算属性你应该会为它所支持的多样化的映射形式感到惊讶。我们不妨先来看看官方文档对它的介绍：</p>
<p><span class="img-wrap"><img data-src="/img/bVW7Kr?w=777&amp;h=743" src="https://static.alili.tech/img/bVW7Kr?w=777&amp;h=743" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果你深入思考过你可能会有疑问：VUEX的<code>mapState</code>是如何实现这么多种映射的呢？如果你现在还不明白，那么跟随我们来一起看看吧！</p>
<p><code>mapState</code>辅助函数定义在VUEX源码中的790 ~ 815 行，主要是对多种映射方式以及带命名空间的模块提供了支持，我们来看看它的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).<span class="hljs-keyword">for</span>Each(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var <span class="hljs-keyword">state</span> = this.<span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>;
      var getters = this.<span class="hljs-variable">$store</span>.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.<span class="hljs-variable">$store</span>, 'mapState', namespace);
        if (!module) {
          return
        }
        <span class="hljs-keyword">state</span> = module.context.<span class="hljs-keyword">state</span>;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, <span class="hljs-keyword">state</span>, getters)
        : <span class="hljs-keyword">state</span>[val]
    };
    // mark vuex getter <span class="hljs-keyword">for</span> devtools
    res[key].vuex = true;
  });
  return res
});</code></pre>
<p>可以看到，mapState函数实际上是以函数表达式的形式的形式定义的，它的实际函数是normalizeNamespace函数，这个函数会对mapState函数的输入参数进行归一化/规范化处理，其最主要的功能是实现了支持带命名空间的模块，我们来看一下它的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">normalizeNamespace</span> <span class="hljs-params">(fn)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(namespace, map)</span> </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">namespace</span> !== <span class="hljs-string">'string'</span>) {
      map = <span class="hljs-keyword">namespace</span>;
      <span class="hljs-keyword">namespace</span> = <span class="hljs-string">''</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">namespace</span>.charAt(<span class="hljs-keyword">namespace</span>.length - <span class="hljs-number">1</span>) !== <span class="hljs-string">'/'</span>) {
      <span class="hljs-keyword">namespace</span> += <span class="hljs-string">'/'</span>;
    }
    <span class="hljs-keyword">return</span> fn(<span class="hljs-keyword">namespace</span>, map)
  }
}</code></pre>
<p>可以看到mapState实际上是中间的那段函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return function (namespace, map) {
  if (typeof namespace !== 'string') {
    map = namespace;
    namespace = '';
  } else if (namespace.charAt(namespace.length - 1) !== '/') {
    namespace += '/';
  }
  return fn(namespace, map)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(namespace, map)</span> </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">namespace</span> !== <span class="hljs-string">'string'</span>) {
    map = <span class="hljs-keyword">namespace</span>;
    <span class="hljs-keyword">namespace</span> = <span class="hljs-string">''</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">namespace</span>.charAt(<span class="hljs-keyword">namespace</span>.length - <span class="hljs-number">1</span>) !== <span class="hljs-string">'/'</span>) {
    <span class="hljs-keyword">namespace</span> += <span class="hljs-string">'/'</span>;
  }
  <span class="hljs-keyword">return</span> fn(<span class="hljs-keyword">namespace</span>, map)
}</code></pre>
<p>它实际接收namespace, map可以接收两个参数，也可以只接受一个map参数。</p>
<ol>
<li>当用户只提供了一个map参数时。这种情况由于类型不是string，会直接将其作为map，并将namespace置为空字符串。这种情况其实就和官方文档的使用方式相匹配。我们可以看看官方文档的示例就是只提供了一个map参数，并没有提供namespace参数。</li>
<li>当用户提供了namespace, map两个参数时，但namespace不是字符串类型。实际上这种情况会和情况1做一样的处理，传进去的第一个参数作为实际的map，第二个参数会被忽略。</li>
<li>当用户提供了namespace, map两个参数时，且namespace是字符串类型。这种情况下会根据字符串最末一位字符串是否是反斜线(/)来区别对待。最终程序内部会将namespace统一处理成最后一位是反斜线(/)的字符串。</li>
</ol>
<p>由以上分析我们可以知道，上述官方文档在此处的示例其实并不完善，该实例并没有指出<strong>可以通过提供模块名称作为mapState的第一个参数来映射带命名空间的模块的state</strong>。</p>
<p>我们举个例子看一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const moduleA = {
  namespaced: true,//带命名空间
  state: { count1: 1, age1: 20 }
}
const store = new Vuex.Store({
  state() {
    return {
        count: 0, age: 0
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '#example',
  store,
  computed: Vuex.mapState('a', {// 映射时提供模块名作为第一个参数
     count1: state => state.count1,
     age1: state => state.age1,
  })
})
console.log(vm)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const moduleA = {
  namespaced: true,//带命名空间
  <span class="hljs-keyword">state</span>: { count1: <span class="hljs-number">1</span>, age1: <span class="hljs-number">20</span> }
}
const store = new Vuex.Store({
  <span class="hljs-keyword">state</span>() {
    return {
        count: <span class="hljs-number">0</span>, age: <span class="hljs-number">0</span>
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '<span class="hljs-comment">#example',</span>
  store,
  computed: Vuex.mapState('a', {// 映射时提供模块名作为第一个参数
     count1: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.count1,
     age1: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.age1,
  })
})
console.<span class="hljs-keyword">log</span>(vm)</code></pre>
<p>其输出如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVW7Kz?w=1195&amp;h=552" src="https://static.alili.tech/img/bVW7Kz?w=1195&amp;h=552" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>传递模块名称后，我们只能映射带命名空间的该模块的state，如果该模块不带命名空间（即没有设置namespace属性）、或者对于其它名字的模块，我们是不能映射他们的state的。</p>
<p><strong>传递了模块名称，但该模块不带命名空间，尝试对其进行映射：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const moduleA = {
  // namespaced: true,
  state: { count1: 1, age1: 20 }
}
const store = new Vuex.Store({
  state() {
    return {
        count: 0, age: 0
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '#example',
  store,
  computed: Vuex.mapState('a', {
     count1: state => state.count1,
     age1: state => state.age1,
  })
})
console.log(vm)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const moduleA = {
  // namespaced: true,
  <span class="hljs-keyword">state</span>: { count1: <span class="hljs-number">1</span>, age1: <span class="hljs-number">20</span> }
}
const store = new Vuex.Store({
  <span class="hljs-keyword">state</span>() {
    return {
        count: <span class="hljs-number">0</span>, age: <span class="hljs-number">0</span>
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '<span class="hljs-comment">#example',</span>
  store,
  computed: Vuex.mapState('a', {
     count1: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.count1,
     age1: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.age1,
  })
})
console.<span class="hljs-keyword">log</span>(vm)</code></pre>
<p><strong>传递了模块名称，但尝试映射其它模块的state：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const moduleA = {
  namespaced: true,
  state: { count1: 1, age1: 20 }
}
const store = new Vuex.Store({
  state() {
    return {
        count: 0, age: 0
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '#example',
  store,
  computed: Vuex.mapState('a', {
     count1: state => state.count,
     age1: state => state.age,
  })
})
console.log(vm)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const moduleA = {
  namespaced: true,
  <span class="hljs-keyword">state</span>: { count1: <span class="hljs-number">1</span>, age1: <span class="hljs-number">20</span> }
}
const store = new Vuex.Store({
  <span class="hljs-keyword">state</span>() {
    return {
        count: <span class="hljs-number">0</span>, age: <span class="hljs-number">0</span>
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '<span class="hljs-comment">#example',</span>
  store,
  computed: Vuex.mapState('a', {
     count1: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.count,
     age1: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.age,
  })
})
console.<span class="hljs-keyword">log</span>(vm)</code></pre>
<p>这两种情况下的输出结果都会是undefined:</p>
<p><span class="img-wrap"><img data-src="/img/bVW7KC?w=945&amp;h=481" src="https://static.alili.tech/img/bVW7KC?w=945&amp;h=481" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>讲完了mapState的参数，我们接着回过头来看看mapState的实现。这里重复粘贴一下前面有关mapState定义的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">normalizeNamespace</span> <span class="hljs-params">(fn)</span> </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(namespace, map)</span> </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">namespace</span> !== <span class="hljs-string">'string'</span>) {
      map = <span class="hljs-keyword">namespace</span>;
      <span class="hljs-keyword">namespace</span> = <span class="hljs-string">''</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">namespace</span>.charAt(<span class="hljs-keyword">namespace</span>.length - <span class="hljs-number">1</span>) !== <span class="hljs-string">'/'</span>) {
      <span class="hljs-keyword">namespace</span> += <span class="hljs-string">'/'</span>;
    }
    <span class="hljs-keyword">return</span> fn(<span class="hljs-keyword">namespace</span>, map)
  }
}</code></pre>
<p>我们可以看到，在归一化/规范化输入参数后，mapState函数实际上是返回了另外一个函数的执行结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return fn(namespace, map)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> fn(<span class="hljs-keyword">namespace</span>, <span class="hljs-built_in">map</span>)</code></pre>
<p>这个<code>fn</code>就是以函数表达式定义mapState函数时的normalizeNamespace 函数的参数，我们在前面已经见到过。再次粘贴其代码以便于分析：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>function (namespace, states) {
  var res = {};
  normalizeMap(states).<span class="hljs-keyword">for</span>Each(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var <span class="hljs-keyword">state</span> = this.<span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>;
      var getters = this.<span class="hljs-variable">$store</span>.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.<span class="hljs-variable">$store</span>, 'mapState', namespace);
        if (!module) {
          return
        }
        <span class="hljs-keyword">state</span> = module.context.<span class="hljs-keyword">state</span>;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, <span class="hljs-keyword">state</span>, getters)
        : <span class="hljs-keyword">state</span>[val]
    };
    // mark vuex getter <span class="hljs-keyword">for</span> devtools
    res[key].vuex = true;
  });
  return res
};</code></pre>
<p>粗略来看，这个函数会重新定义map对象的key-value对，并作为一个新的对象返回。我们来进一步具体分析一下。</p>
<p>该函数首先调用normalizeMap函数对state参数进行归一化/规范化。normalizeMap函数定义在VUEX源码的899 ~ 903行，我们来具体看看它的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>function normalizeMap (<span class="hljs-built_in">map</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">Array</span>.isArray(<span class="hljs-built_in">map</span>)
    ? <span class="hljs-built_in">map</span>.<span class="hljs-built_in">map</span>(function (<span class="hljs-built_in">key</span>) { <span class="hljs-keyword">return</span> ({ <span class="hljs-built_in">key</span>: <span class="hljs-built_in">key</span>, val: <span class="hljs-built_in">key</span> }); })
    : <span class="hljs-keyword">Object</span>.keys(<span class="hljs-built_in">map</span>).<span class="hljs-built_in">map</span>(function (<span class="hljs-built_in">key</span>) { <span class="hljs-keyword">return</span> ({ <span class="hljs-built_in">key</span>: <span class="hljs-built_in">key</span>, val: <span class="hljs-built_in">map</span>[<span class="hljs-built_in">key</span>] }); })
}</code></pre>
<p>该函数实际上意味着mapState函数的map参数同时支持数组和对象两种形式。</p>
<ol>
<li>如果是数组，则会遍历数组元素，将数组元素转成{value: value}对象。</li>
<li>如果是对象，则会遍历对象key，以key-value构成{key: value}对象。</li>
</ol>
<p>这两种形式最终都会得到一个新数组，而数组元素就是{key: value}形式的对象。</p>
<p>这也与官方文档的描述相印证，官方文档的既提供了mapState函数的map参数是对象的例子，也提供了参数是数组的例子。</p>
<p>回过头来看，normalizeMap(states)函数执行完后会遍历，针对每一个对象元素的value做进一步的处理。它首先拿的是根实例上挂载的store模块的state：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var state = this.$store.state;
var getters = this.$store.getters;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>var <span class="hljs-keyword">state</span> = this.<span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>;
var getters = this.<span class="hljs-variable">$store</span>.getters;</code></pre>
<p>而如果mapState函数提供了命名空间参数（即模块名），则会拿带命名空间模块的state:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (namespace) {
  var module = getModuleByNamespace(this.$store, 'mapState', namespace);
  if (!module) {
    return
  }
  state = module.context.state;
  getters = module.context.getters;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">if</span> (<span class="hljs-keyword">namespace</span>) {
  var <span class="hljs-keyword">module</span> = getModuleByNamespace(<span class="hljs-keyword">this</span>.$store, <span class="hljs-string">'mapState'</span>, <span class="hljs-keyword">namespace</span>);
  <span class="hljs-built_in">if</span> (!<span class="hljs-keyword">module</span>) {
    <span class="hljs-built_in">return</span>
  }
  state = <span class="hljs-keyword">module</span>.context.state;
  getters = <span class="hljs-keyword">module</span>.context.getters;
}</code></pre>
<p>这其中会调用一个从根store开始，向下查找对应命名空间模块的方法getModuleByNamespace，它定义在VUEX源码的917 ~ 923 行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (&quot;development&quot; !== 'production' &amp;&amp; !module) {
    console.error((&quot;[vuex] module namespace not found in &quot; + helper + &quot;(): &quot; + namespace));
  }
  return module
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getModuleByNamespace</span> (<span class="hljs-params">store, helper, namespace</span>) </span>{
  <span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = store._modulesNamespaceMap[namespace];
  <span class="hljs-keyword">if</span> (<span class="hljs-string">"development"</span> !== <span class="hljs-string">'production'</span> &amp;&amp; !<span class="hljs-built_in">module</span>) {
    <span class="hljs-built_in">console</span>.error((<span class="hljs-string">"[vuex] module namespace not found in "</span> + helper + <span class="hljs-string">"(): "</span> + namespace));
  }
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>
}</code></pre>
<p>因为我们在实例化Store类的时候已经把所有模块以namespace的为key的形式挂载在了根store实例的_modulesNamespaceMap属性上，所以这个查询过程只是一个对象key的查找过程，实现起来比较简单。</p>
<p>回过头来继续看mapState函数中“<code>normalizeMap(states)函数执行完后会遍历，针对每一个对象元素的value做进一步的处理</code>”的最后的执行，它会根据原始的value是否是function而进一步处理：</p>
<ol>
<li>如果是不是function，则直接拿对应模块的state中key对应的value。</li>
<li>如果是function，那么将会执行该function，并且会将state, getters分别暴露给该function作为第一个和第二个参数。</li>
</ol>
<p>第二种情况在前述官方文档的例子中也有所体现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 为了能够使用 `this` 获取局部状态，必须使用常规函数
countPlusLocalState (state) {
  return state.count + this.localCount
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// 为了能够使用 `this` 获取局部状态，必须使用常规函数
countPlusLocalState (<span class="hljs-keyword">state</span>) {
  return <span class="hljs-keyword">state</span>.count + this.localCount
}
</code></pre>
<p><strong>但这个官方文档例子并不完整，它并没有体现出还会暴露出getters参数</strong>，实际上，上述例子的完整形式应该是这样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 为了能够使用 `this` 获取局部状态，必须使用常规函数
countPlusLocalState (state, getters) {
  return state.count + this.localCount + getters.somegetter
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// 为了能够使用 `this` 获取局部状态，必须使用常规函数
countPlusLocalState (<span class="hljs-keyword">state</span>, getters) {
  return <span class="hljs-keyword">state</span>.count + this.localCount + getters.somegetter
}
</code></pre>
<h3 id="articleHeader3">5.1.2 mapMutations</h3>
<p>与mapState可以映射模块的state为计算属性类似，mapMutations也可以将模块的mutations映射为methods，我们来看看官方文档的介绍：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      'increment',

      // `mapMutations` 也支持载荷：
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      'incrementBy' 
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { mapMutations } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-regexp">//</span> ...
  methods: {
    ...mapMutations([
      <span class="hljs-regexp">//</span> 将 `<span class="javascript"><span class="hljs-keyword">this</span>.increment()</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'increment'</span>)</span>`
      <span class="hljs-string">'increment'</span>,

      <span class="hljs-regexp">//</span> `<span class="javascript">mapMutations</span>` 也支持载荷：
      <span class="hljs-regexp">//</span> 将 `<span class="javascript"><span class="hljs-keyword">this</span>.incrementBy(amount)</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'incrementBy'</span>, amount)</span>`
      <span class="hljs-string">'incrementBy'</span> 
    ]),
    ...mapMutations({
      add: <span class="hljs-string">'increment'</span> <span class="hljs-regexp">//</span> 将 `<span class="javascript"><span class="hljs-keyword">this</span>.add()</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'increment'</span>)</span>`
    })
  }
}
</code></pre>
<p>同样我们来看看它是如何实现的，它的实现定义在VUEX源码中的817 ~ 841 行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> mapMutations = normalizeNamespace(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">namespace, mutations</span>) </span>{
  <span class="hljs-keyword">var</span> res = {};
  normalizeMap(mutations).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ref</span>) </span>{
    <span class="hljs-keyword">var</span> key = ref.key;
    <span class="hljs-keyword">var</span> val = ref.val;

    res[key] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mappedMutation</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> args = [], len = <span class="hljs-built_in">arguments</span>.length;
      <span class="hljs-keyword">while</span> ( len-- ) args[ len ] = <span class="hljs-built_in">arguments</span>[ len ];

      <span class="hljs-keyword">var</span> commit = <span class="hljs-keyword">this</span>.$store.commit;
      <span class="hljs-keyword">if</span> (namespace) {
        <span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = getModuleByNamespace(<span class="hljs-keyword">this</span>.$store, <span class="hljs-string">'mapMutations'</span>, namespace);
        <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">module</span>) {
          <span class="hljs-keyword">return</span>
        }
        commit = <span class="hljs-built_in">module</span>.context.commit;
      }
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'function'</span>
        ? val.apply(<span class="hljs-keyword">this</span>, [commit].concat(args))
        : commit.apply(<span class="hljs-keyword">this</span>.$store, [val].concat(args))
    };
  });
  <span class="hljs-keyword">return</span> res
});</code></pre>
<p>和mapState的实现几乎完全一样，唯一的差别只有两点：</p>
<ol>
<li>提交mutaion时可以传递载荷，所以这里有一步是拷贝载荷。</li>
<li>mutation是用来提交的，所以这里拿的是commit。</li>
</ol>
<p>我们来具体分析一下代码的执行：</p>
<p>首先是拷贝载荷：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var args = [], len = arguments.length;
while ( len-- ) args[ len ] = arguments[ len ];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code><span class="hljs-built_in">var</span> args = [], <span class="hljs-built_in">len</span> = arguments.length;
while ( <span class="hljs-built_in">len</span>-- ) args[ <span class="hljs-built_in">len</span> ] = arguments[ <span class="hljs-built_in">len</span> ];</code></pre>
<p>然后是拿commit，如果mapMutations函数提供了命名空间参数（即模块名），则会拿带命名空间模块的commit:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var commit = this.$store.commit;
if (namespace) {
  var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
  if (!module) {
    return
  }
  commit = module.context.commit;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>var commit = <span class="hljs-keyword">this</span>.$store.commit;
<span class="hljs-built_in">if</span> (<span class="hljs-keyword">namespace</span>) {
  var <span class="hljs-keyword">module</span> = getModuleByNamespace(<span class="hljs-keyword">this</span>.$store, <span class="hljs-string">'mapMutations'</span>, <span class="hljs-keyword">namespace</span>);
  <span class="hljs-built_in">if</span> (!<span class="hljs-keyword">module</span>) {
    <span class="hljs-built_in">return</span>
  }
  commit = <span class="hljs-keyword">module</span>.context.commit;
}</code></pre>
<p>最后则会看对应mutation的value是不是函数：</p>
<ol>
<li>如果不是函数，则直接执行commit，参数是value和载荷组成的数组。</li>
<li>如果是函数，则直接执行该函数，并将comit作为其第一个参数，arg仍然作为后续参数。</li>
</ol>
<p>也就是说，<strong>官方文档例子并不完整，它并没有体现第二种情况</strong>，实际上，官方文档例子的完整形式还应当包括：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations('moduleName', {
       addAlias: function(commit, playload) {
           //将 `this.addAlias()` 映射为 `this.$store.commit('increment', amount)`
           commit('increment') 
           //将 `this.addAlias(playload)` 映射为 `this.$store.commit('increment', playload)`
           commit('increment', playload)
       }
     })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { mapMutations } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-regexp">//</span> ...
  methods: {
    ...mapMutations(<span class="hljs-string">'moduleName'</span>, {
       addAlias: function(commit, playload) {
           <span class="hljs-regexp">//</span>将 `<span class="javascript"><span class="hljs-keyword">this</span>.addAlias()</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'increment'</span>, amount)</span>`
           commit(<span class="hljs-string">'increment'</span>) 
           <span class="hljs-regexp">//</span>将 `<span class="javascript"><span class="hljs-keyword">this</span>.addAlias(playload)</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'increment'</span>, playload)</span>`
           commit(<span class="hljs-string">'increment'</span>, playload)
       }
     })
  }
}
</code></pre>
<p>同样，mapMutations上述映射方式都支持传递一个模块名作为命名空间参数，这个在官方文档也没有体现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations('moduleName', [
      // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      'increment',

      // `mapMutations` 也支持载荷：
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      'incrementBy' 
    ]),
    ...mapMutations('moduleName', {
      // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      add: 'increment' 
    }),
    ...mapMutations('moduleName', {
      addAlias: function(commit) {
          //将 `this.addAlias()` 映射为 `this.$store.commit('increment')`
          commit('increment') 
      }
    })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { mapMutations } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-regexp">//</span> ...
  methods: {
    ...mapMutations(<span class="hljs-string">'moduleName'</span>, [
      <span class="hljs-regexp">//</span> 将 `<span class="javascript"><span class="hljs-keyword">this</span>.increment()</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'increment'</span>)</span>`
      <span class="hljs-string">'increment'</span>,

      <span class="hljs-regexp">//</span> `<span class="javascript">mapMutations</span>` 也支持载荷：
      <span class="hljs-regexp">//</span> 将 `<span class="javascript"><span class="hljs-keyword">this</span>.incrementBy(amount)</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'incrementBy'</span>, amount)</span>`
      <span class="hljs-string">'incrementBy'</span> 
    ]),
    ...mapMutations(<span class="hljs-string">'moduleName'</span>, {
      <span class="hljs-regexp">//</span> 将 `<span class="javascript"><span class="hljs-keyword">this</span>.add()</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'increment'</span>)</span>`
      add: <span class="hljs-string">'increment'</span> 
    }),
    ...mapMutations(<span class="hljs-string">'moduleName'</span>, {
      addAlias: function(commit) {
          <span class="hljs-regexp">//</span>将 `<span class="javascript"><span class="hljs-keyword">this</span>.addAlias()</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'increment'</span>)</span>`
          commit(<span class="hljs-string">'increment'</span>) 
      }
    })
  }
}
</code></pre>
<p>我们可以举个例子证明一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const moduleA = {
  namespaced: true,
  state: { source: 'moduleA' },
  mutations: {
    increment (state, playload) {
      // 这里的 `state` 对象是模块的局部状态
      state.source += playload
    }
  }
}
const store = new Vuex.Store({
  state() {
    return {
        source: 'root'
    }
  },
  mutations: {
    increment (state, playload) {
      state.source += playload
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '#example',
  store,
  mounted() {
    console.log(this.source)
    this.localeincrement('testdata')
    console.log(this.source)
  },
    computed: Vuex.mapState([
      'source'
    ]
  ),
  methods: {
    ...Vuex.mapMutations({
      localeincrement (commit, args) {
        commit('increment', args)
      }
    })
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const moduleA = {
  namespaced: true,
  <span class="hljs-keyword">state</span>: { source: 'moduleA' },
  mutations: {
    increment (<span class="hljs-keyword">state</span>, playload) {
      // 这里的 `<span class="hljs-keyword">state</span>` 对象是模块的局部状态
      <span class="hljs-keyword">state</span>.source += playload
    }
  }
}
const store = new Vuex.Store({
  <span class="hljs-keyword">state</span>() {
    return {
        source: 'root'
    }
  },
  mutations: {
    increment (<span class="hljs-keyword">state</span>, playload) {
      <span class="hljs-keyword">state</span>.source += playload
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '<span class="hljs-comment">#example',</span>
  store,
  mounted() {
    console.<span class="hljs-keyword">log</span>(this.source)
    this.localeincrement('testdata')
    console.<span class="hljs-keyword">log</span>(this.source)
  },
    computed: Vuex.mapState([
      'source'
    ]
  ),
  methods: {
    ...Vuex.mapMutations({
      localeincrement (commit, args) {
        commit('increment', args)
      }
    })
  }
})
</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="root
test.html:139 roottestdata" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">root</span>
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.html</span><span class="hljs-selector-pseudo">:139</span> <span class="hljs-selector-tag">roottestdata</span></code></pre>
<p>另外一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const moduleA = {
  namespaced: true,
  state: { source: 'moduleA' },
  mutations: {
    increment (state, playload) {
      // 这里的 `state` 对象是模块的局部状态
      state.source += playload
    }
  }
}
const store = new Vuex.Store({
  state() {
    return {
        source: 'root'
    }
  },
  mutations: {
    increment (state, playload) {
      state.source += playload
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '#example',
  store,
  mounted() {
    console.log(this.source)
    this.localeincrement('testdata')
    console.log(this.source)
  },
    computed: Vuex.mapState('a', [
      'source'
    ]
  ),
  methods: {
    ...Vuex.mapMutations('a', {
      localeincrement (commit, args) {
        commit('increment', args)
      }
    })
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const moduleA = {
  namespaced: true,
  <span class="hljs-keyword">state</span>: { source: 'moduleA' },
  mutations: {
    increment (<span class="hljs-keyword">state</span>, playload) {
      // 这里的 `<span class="hljs-keyword">state</span>` 对象是模块的局部状态
      <span class="hljs-keyword">state</span>.source += playload
    }
  }
}
const store = new Vuex.Store({
  <span class="hljs-keyword">state</span>() {
    return {
        source: 'root'
    }
  },
  mutations: {
    increment (<span class="hljs-keyword">state</span>, playload) {
      <span class="hljs-keyword">state</span>.source += playload
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '<span class="hljs-comment">#example',</span>
  store,
  mounted() {
    console.<span class="hljs-keyword">log</span>(this.source)
    this.localeincrement('testdata')
    console.<span class="hljs-keyword">log</span>(this.source)
  },
    computed: Vuex.mapState('a', [
      'source'
    ]
  ),
  methods: {
    ...Vuex.mapMutations('a', {
      localeincrement (commit, args) {
        commit('increment', args)
      }
    })
  }
})
</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moduleA
test.html:139 moduleAtestdata" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">moduleA</span>
<span class="hljs-selector-tag">test</span><span class="hljs-selector-class">.html</span><span class="hljs-selector-pseudo">:139</span> <span class="hljs-selector-tag">moduleAtestdata</span></code></pre>
<h3 id="articleHeader4">5.1.3 mapGetters</h3>
<p>与mapState可以映射模块的state为计算属性类似，mapGetters也可以将模块的getters映射为计算属性，我们来看看官方文档的介绍：</p>
<p><span class="img-wrap"><img data-src="/img/bVW7KO?w=777&amp;h=605" src="https://static.alili.tech/img/bVW7KO?w=777&amp;h=605" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>mapGetters辅助函数定义在VUEX源码中的843 ~ 864 行，我们来看看它的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace &amp;&amp; !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (&quot;development&quot; !== 'production' &amp;&amp; !(val in this.$store.getters)) {
        console.error((&quot;[vuex] unknown getter: &quot; + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> mapGetters = normalizeNamespace(function (namespace, getters) {
  <span class="hljs-keyword">var</span> res = {};
  normalizeMap(getters).forEach(function (ref) {
    <span class="hljs-keyword">var</span> key = ref.key;
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">val</span> = ref.<span class="hljs-keyword">val</span>;

    <span class="hljs-keyword">val</span> = namespace + <span class="hljs-keyword">val</span>;
    res[key] = function mappedGetter () {
      <span class="hljs-keyword">if</span> (namespace &amp;&amp; !getModuleByNamespace(<span class="hljs-keyword">this</span>.$store, <span class="hljs-string">'mapGetters'</span>, namespace)) {
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-keyword">if</span> (<span class="hljs-string">"development"</span> !== <span class="hljs-string">'production'</span> &amp;&amp; !(<span class="hljs-keyword">val</span> <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.$store.getters)) {
        console.error((<span class="hljs-string">"[vuex] unknown getter: "</span> + <span class="hljs-keyword">val</span>));
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters[<span class="hljs-keyword">val</span>]
    };
    <span class="hljs-comment">// mark vuex getter for devtools</span>
    res[key].vuex = <span class="hljs-literal">true</span>;
  });
  <span class="hljs-keyword">return</span> res
});</code></pre>
<p>和mapState的实现几乎完全一样，唯一的差别只有1点：就是最后不会出现value为函数的情况。直接拿的是对应模块上的getters:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return this.$store.getters[val]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters[<span class="hljs-keyword">val</span>]</code></pre>
<h3 id="articleHeader5">5.1.4 mapActions</h3>
<p>与mapMutations可以映射模块的mutation为methods类似，mapActions也可以将模块的actions映射为methods，我们来看看官方文档的介绍：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      'increment',

      // `mapActions` 也支持载荷：
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      'incrementBy' 
    ]),
    ...mapActions({
      // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      add: 'increment' 
    })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { mapActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-regexp">//</span> ...
  methods: {
    ...mapActions([
      <span class="hljs-regexp">//</span> 将 `<span class="javascript"><span class="hljs-keyword">this</span>.increment()</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'increment'</span>)</span>`
      <span class="hljs-string">'increment'</span>,

      <span class="hljs-regexp">//</span> `<span class="javascript">mapActions</span>` 也支持载荷：
      <span class="hljs-regexp">//</span> 将 `<span class="javascript"><span class="hljs-keyword">this</span>.incrementBy(amount)</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'incrementBy'</span>, amount)</span>`
      <span class="hljs-string">'incrementBy'</span> 
    ]),
    ...mapActions({
      <span class="hljs-regexp">//</span> 将 `<span class="javascript"><span class="hljs-keyword">this</span>.add()</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'increment'</span>)</span>`
      add: <span class="hljs-string">'increment'</span> 
    })
  }
}
</code></pre>
<p>同样我们来看看它是如何实现的，它的实现定义在VUEX源码中的866 ~ 890 行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> mapActions = normalizeNamespace(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">namespace, actions</span>) </span>{
  <span class="hljs-keyword">var</span> res = {};
  normalizeMap(actions).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ref</span>) </span>{
    <span class="hljs-keyword">var</span> key = ref.key;
    <span class="hljs-keyword">var</span> val = ref.val;

    res[key] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mappedAction</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> args = [], len = <span class="hljs-built_in">arguments</span>.length;
      <span class="hljs-keyword">while</span> ( len-- ) args[ len ] = <span class="hljs-built_in">arguments</span>[ len ];

      <span class="hljs-keyword">var</span> dispatch = <span class="hljs-keyword">this</span>.$store.dispatch;
      <span class="hljs-keyword">if</span> (namespace) {
        <span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = getModuleByNamespace(<span class="hljs-keyword">this</span>.$store, <span class="hljs-string">'mapActions'</span>, namespace);
        <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">module</span>) {
          <span class="hljs-keyword">return</span>
        }
        dispatch = <span class="hljs-built_in">module</span>.context.dispatch;
      }
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'function'</span>
        ? val.apply(<span class="hljs-keyword">this</span>, [dispatch].concat(args))
        : dispatch.apply(<span class="hljs-keyword">this</span>.$store, [val].concat(args))
    };
  });
  <span class="hljs-keyword">return</span> res
});</code></pre>
<p>和mapMutations的实现几乎完全一样，唯一的差别只有1点：</p>
<ol><li>action是用来分派的，所以这里拿的是dispatch。</li></ol>
<p>我们来具体分析一下代码的执行：</p>
<p>首先是拷贝载荷：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var args = [], len = arguments.length;
while ( len-- ) args[ len ] = arguments[ len ];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code><span class="hljs-built_in">var</span> args = [], <span class="hljs-built_in">len</span> = arguments.length;
while ( <span class="hljs-built_in">len</span>-- ) args[ <span class="hljs-built_in">len</span> ] = arguments[ <span class="hljs-built_in">len</span> ];</code></pre>
<p>然后是拿dispatch，如果mapActions函数提供了命名空间参数（即模块名），则会拿带命名空间模块的dispatch:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dispatch = this.$store.dispatch;
if (namespace) {
  var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
  if (!module) {
    return
  }
  dispatch = module.context.dispatch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>var dispatch = <span class="hljs-keyword">this</span>.$store.dispatch;
<span class="hljs-built_in">if</span> (<span class="hljs-keyword">namespace</span>) {
  var <span class="hljs-keyword">module</span> = getModuleByNamespace(<span class="hljs-keyword">this</span>.$store, <span class="hljs-string">'mapActions'</span>, <span class="hljs-keyword">namespace</span>);
  <span class="hljs-built_in">if</span> (!<span class="hljs-keyword">module</span>) {
    <span class="hljs-built_in">return</span>
  }
  dispatch = <span class="hljs-keyword">module</span>.context.dispatch;
}</code></pre>
<p>最后则会看对应action的value是不是函数：</p>
<ol>
<li>如果不是函数，则直接执行dispatch，参数是value和载荷组成的数组。</li>
<li>如果是函数，则直接执行该函数，并将dispatch作为其第一个参数，arg仍然作为后续参数。</li>
</ol>
<p>也就是说，<strong>官方文档例子并不完整，它并没有体现第二种情况</strong>，实际上，官方文档例子的完整形式还应当包括：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions ('moduleName', {
       addAlias: function(dispatch, playload) {
           //将 `this.addAlias()` 映射为 `this.$store.dispatch('increment', amount)`
           dispatch('increment') 
           //将 `this.addAlias(playload)` 映射为 `this.$store.dispatch('increment', playload)`
           dispatch('increment', playload)
       }
     })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { mapActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-regexp">//</span> ...
  methods: {
    ...mapActions (<span class="hljs-string">'moduleName'</span>, {
       addAlias: function(dispatch, playload) {
           <span class="hljs-regexp">//</span>将 `<span class="javascript"><span class="hljs-keyword">this</span>.addAlias()</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'increment'</span>, amount)</span>`
           dispatch(<span class="hljs-string">'increment'</span>) 
           <span class="hljs-regexp">//</span>将 `<span class="javascript"><span class="hljs-keyword">this</span>.addAlias(playload)</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'increment'</span>, playload)</span>`
           dispatch(<span class="hljs-string">'increment'</span>, playload)
       }
     })
  }
}
</code></pre>
<p>同样，mapActions上述映射方式都支持传递一个模块名作为命名空间参数，这个在官方文档也没有体现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions('moduleName', [
      // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      'increment', 

      // `mapActions` 也支持载荷：
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      'incrementBy' 
    ]),
    ...mapActions('moduleName', {
      // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      add: 'increment' 
    }),
    ...mapActions('moduleName', {
      addAlias: function (dispatch) {
        // 将 `this.addAlias()` 映射为 `this.$store.dispatch('increment')`
        dispatch('increment') 
      }
    })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { mapActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-regexp">//</span> ...
  methods: {
    ...mapActions(<span class="hljs-string">'moduleName'</span>, [
      <span class="hljs-regexp">//</span> 将 `<span class="javascript"><span class="hljs-keyword">this</span>.increment()</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'increment'</span>)</span>`
      <span class="hljs-string">'increment'</span>, 

      <span class="hljs-regexp">//</span> `<span class="javascript">mapActions</span>` 也支持载荷：
      <span class="hljs-regexp">//</span> 将 `<span class="javascript"><span class="hljs-keyword">this</span>.incrementBy(amount)</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'incrementBy'</span>, amount)</span>`
      <span class="hljs-string">'incrementBy'</span> 
    ]),
    ...mapActions(<span class="hljs-string">'moduleName'</span>, {
      <span class="hljs-regexp">//</span> 将 `<span class="javascript"><span class="hljs-keyword">this</span>.add()</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'increment'</span>)</span>`
      add: <span class="hljs-string">'increment'</span> 
    }),
    ...mapActions(<span class="hljs-string">'moduleName'</span>, {
      addAlias: function (dispatch) {
        <span class="hljs-regexp">//</span> 将 `<span class="javascript"><span class="hljs-keyword">this</span>.addAlias()</span>` 映射为 `<span class="javascript"><span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'increment'</span>)</span>`
        dispatch(<span class="hljs-string">'increment'</span>) 
      }
    })
  }
}
</code></pre>
<p>我们可以举个例子证明一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const moduleA = {
  namespaced: true,
  state: { source: 'moduleA' },
  mutations: {
    increment (state, playload) {
      // 这里的 `state` 对象是模块的局部状态
      state.source += playload
    }
  },
  actions: {
    increment (context) {
      context.commit('increment', 'testdata')
    }
  }
}
const store = new Vuex.Store({
  state() {
    return {
        source: 'root'
    }
  },
  mutations: {
    increment (state, playload) {
      state.source += playload
    }
  },
  actions: {
    increment (context) {
      context.commit('increment', 'testdata')
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '#example',
  store,
  mounted() {
    console.log(this.source)
    this.localeincrement()
    console.log(this.source)
  },
    computed: Vuex.mapState([
      'source'
    ]
  ),
  methods: {
    ...Vuex.mapActions( {
      localeincrement (dispatch) {
        dispatch('increment')
      }
    })
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const moduleA = {
  namespaced: true,
  <span class="hljs-keyword">state</span>: { source: 'moduleA' },
  mutations: {
    increment (<span class="hljs-keyword">state</span>, playload) {
      // 这里的 `<span class="hljs-keyword">state</span>` 对象是模块的局部状态
      <span class="hljs-keyword">state</span>.source += playload
    }
  },
  actions: {
    increment (context) {
      context.commit('increment', 'testdata')
    }
  }
}
const store = new Vuex.Store({
  <span class="hljs-keyword">state</span>() {
    return {
        source: 'root'
    }
  },
  mutations: {
    increment (<span class="hljs-keyword">state</span>, playload) {
      <span class="hljs-keyword">state</span>.source += playload
    }
  },
  actions: {
    increment (context) {
      context.commit('increment', 'testdata')
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '<span class="hljs-comment">#example',</span>
  store,
  mounted() {
    console.<span class="hljs-keyword">log</span>(this.source)
    this.localeincrement()
    console.<span class="hljs-keyword">log</span>(this.source)
  },
    computed: Vuex.mapState([
      'source'
    ]
  ),
  methods: {
    ...Vuex.mapActions( {
      localeincrement (dispatch) {
        dispatch('increment')
      }
    })
  }
})
</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="root
roottestdata" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">root
roottestdata</span></code></pre>
<p>另外一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const moduleA = {
  namespaced: true,
  state: { source: 'moduleA' },
  mutations: {
    increment (state, playload) {
      // 这里的 `state` 对象是模块的局部状态
      state.source += playload
    }
  },
  actions: {
    increment (context) {
      context.commit('increment', 'testdata')
    }
  }
}
const store = new Vuex.Store({
  state() {
    return {
        source: 'root'
    }
  },
  mutations: {
    increment (state, playload) {
      state.source += playload
    }
  },
  actions: {
    increment (context) {
      context.commit('increment', 'testdata')
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '#example',
  store,
  mounted() {
    console.log(this.source)
    this.localeincrement()
    console.log(this.source)
  },
    computed: Vuex.mapState('a', [
      'source'
    ]
  ),
  methods: {
    ...Vuex.mapActions('a', {
      localeincrement (dispatch) {
        dispatch('increment')
      }
    })
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const moduleA = {
  namespaced: true,
  <span class="hljs-keyword">state</span>: { source: 'moduleA' },
  mutations: {
    increment (<span class="hljs-keyword">state</span>, playload) {
      // 这里的 `<span class="hljs-keyword">state</span>` 对象是模块的局部状态
      <span class="hljs-keyword">state</span>.source += playload
    }
  },
  actions: {
    increment (context) {
      context.commit('increment', 'testdata')
    }
  }
}
const store = new Vuex.Store({
  <span class="hljs-keyword">state</span>() {
    return {
        source: 'root'
    }
  },
  mutations: {
    increment (<span class="hljs-keyword">state</span>, playload) {
      <span class="hljs-keyword">state</span>.source += playload
    }
  },
  actions: {
    increment (context) {
      context.commit('increment', 'testdata')
    }
  },
  modules: {
    a: moduleA
  }
})
var vm = new Vue({
  el: '<span class="hljs-comment">#example',</span>
  store,
  mounted() {
    console.<span class="hljs-keyword">log</span>(this.source)
    this.localeincrement()
    console.<span class="hljs-keyword">log</span>(this.source)
  },
    computed: Vuex.mapState('a', [
      'source'
    ]
  ),
  methods: {
    ...Vuex.mapActions('a', {
      localeincrement (dispatch) {
        dispatch('increment')
      }
    })
  }
})
</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moduleA
moduleAtestdata" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">moduleA
moduleAtestdata</span></code></pre>
<h3 id="articleHeader6">5.1.5 createNamespacedHelpers</h3>
<p>createNamespacedHelpers主要是根据传递的命名空间产生对应模块的局部化mapState、mapGetters、mapMutations、mapActions映射函数，它定义在VUEX源码的892 ~ 897行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> createNamespacedHelpers = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(namespace)</span> </span>{ <span class="hljs-keyword">return</span> ({
  mapState: mapState.bind(<span class="hljs-literal">null</span>, <span class="hljs-keyword">namespace</span>),
  mapGetters: mapGetters.bind(<span class="hljs-literal">null</span>, <span class="hljs-keyword">namespace</span>),
  mapMutations: mapMutations.bind(<span class="hljs-literal">null</span>, <span class="hljs-keyword">namespace</span>),
  mapActions: mapActions.bind(<span class="hljs-literal">null</span>, <span class="hljs-keyword">namespace</span>)
}); };</code></pre>
<h2 id="articleHeader7">5.2 其它辅助函数</h2>
<h3 id="articleHeader8">5.2.1 isObject</h3>
<p>isObject定义在VUEX源码的94 ~ 96 行，主要判断目标是否是有效对象，其实现比较简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//判断是不是object
function isObject (obj) {
  return obj !== null &amp;&amp; typeof obj === 'object'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//判断是不是object</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isObject</span> <span class="hljs-params">(obj)</span> </span>{
  <span class="hljs-keyword">return</span> obj !== <span class="hljs-literal">null</span> &amp;&amp; <span class="hljs-keyword">typeof</span> obj === <span class="hljs-string">'object'</span>
}</code></pre>
<h3 id="articleHeader9">5.2.2 isPromise</h3>
<p>isPromise定义在VUEX源码的98 ~ 100 行，主要判断目标是否是promise，其实现比较简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isPromise (val) {
  return val &amp;&amp; typeof val.then === 'function'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">isPromise</span> (val) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">val</span> &amp;&amp; typeof val.<span class="hljs-keyword">then</span> === <span class="hljs-symbol">'function</span>'
}</code></pre>
<h3 id="articleHeader10">5.2.3 assert</h3>
<p>assert定义在VUEX源码的102 ~ 104 行，主要用来断言，其实现比较简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function assert (condition, msg) {
  if (!condition) { throw new Error((&quot;[vuex] &quot; + msg)) }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">assert</span> (<span class="hljs-params">condition, msg</span>) </span>{
  <span class="hljs-keyword">if</span> (!condition) { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>((<span class="hljs-string">"[vuex] "</span> + msg)) }
}</code></pre>
<h1 id="articleHeader11">第六章 总结</h1>
<p>到此这本VUEX学习笔记算是写完了，总体而言是对个人在学习VUEX源码过程中的理解、想法进行的记录和总结，这其中除了不可避免的主观视角外，自然还会存在一些理解上的偏差甚至错误，希望看到这本书的人能够指正。</p>
<p>更多内容可查看<a href="http://www.dulinrain.top" rel="nofollow noreferrer" target="_blank">本人博客</a>以及<a href="https://github.com/DuLinRain" rel="nofollow noreferrer" target="_blank">github</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUEX源码学习笔记（第5~6章 共6章）

## 原文链接
[https://segmentfault.com/a/1190000011668825](https://segmentfault.com/a/1190000011668825)

