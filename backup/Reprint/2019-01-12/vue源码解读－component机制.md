---
title: 'vue源码解读－component机制' 
date: 2019-01-12 2:30:25
hidden: true
slug: givlb1h7m0m
categories: [reprint]
---

{{< raw >}}

                    
<p>身为原来的jquery，angular使用者。后面接触了react和vue。渐渐的喜欢上了vue。抱着学习的态度呀。看看源码。果然菜要付出代价。一步步单步调试。头好疼。看到哪里记到哪里。来一点点心得。错误的地方请帮我指出来。谢谢。最近看的是vue component部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="先上一段最简单的代码，来剖析component机制：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code style="word-break: break-word; white-space: initial;">先上一段最简单的代码，来剖析<span class="hljs-keyword">component</span>机制：</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <div>"{{"a"}}"</div>
  <input v-model=&quot;heihei&quot;>
  <button v-on:click=&quot;click1&quot;>
  click1
  </button>
  <my-component>
  <div slot='dudu'>111</div>
  <Child>"{{"a"}}"</Child>
  </my-component>
  <button @click.stop=&quot;click2&quot;>
  click2
  </button>
</div>
</body>
<script src=&quot;vue.js&quot;></script>
<script type=&quot;text/javascript&quot;>
var Child = {
  template: '<div>A custom component!</div>'
} 
Vue.component('my-component', {
  name: 'my-component',
  template: '<div>A custom component!<Child></Child><slot></slot></div>',
  components: {
    Child:Child
  },
  created(){
    console.log(this);
  },
  mounted(){
    console.log(this);
  }
})
    new Vue({
  el: '#app',
  data: function () {
    return {
      heihei:{name:3333},
      a:1
    }
  },
  components: {
    Child:Child
  },
  created(){
  
  },
  methods: {
    click1: function(){
      console.log(this);
    },
    click2: function(){
      alert('click2')
    }
  }
})
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">"{{"a"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"heihei"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"click1"</span>&gt;</span>
  click1
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">'dudu'</span>&gt;</span>111<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Child</span>&gt;</span></span><span class="hljs-template-variable">"{{"a"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">Child</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"click2"</span>&gt;</span>
  click2
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">var</span> Child = {
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;A custom component!&lt;/div&gt;'</span>
} 
Vue.component(<span class="hljs-string">'my-component'</span>, {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'my-component'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;A custom component!&lt;Child&gt;&lt;/Child&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/div&gt;'</span>,
  <span class="hljs-attr">components</span>: {
    <span class="hljs-attr">Child</span>:Child
  },
  created(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
  },
  mounted(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
  }
})
    <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">heihei</span>:{<span class="hljs-attr">name</span>:<span class="hljs-number">3333</span>},
      <span class="hljs-attr">a</span>:<span class="hljs-number">1</span>
    }
  },
  <span class="hljs-attr">components</span>: {
    <span class="hljs-attr">Child</span>:Child
  },
  created(){
  
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-attr">click1</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
    },
    <span class="hljs-attr">click2</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      alert(<span class="hljs-string">'click2'</span>)
    }
  }
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>我们按照浏览器的思维逐行来。执行到脚本时。首先执行了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-component', {
  name: 'my-component',
  template: '<div>A custom component!<Child></Child><slot></slot></div>',
  components: {
    Child:Child
  },
  created(){
    console.log(this);
  },
  mounted(){
    console.log(this);
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'my-component'</span>, {
  <span class="hljs-attribute">name</span>: <span class="hljs-string">'my-component'</span>,
  <span class="hljs-attribute">template</span>: <span class="hljs-string">'&lt;div&gt;A custom component!&lt;Child&gt;&lt;/Child&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/div&gt;'</span>,
  <span class="hljs-attribute">components</span>: {
    <span class="hljs-attribute">Child</span>:Child
  },
  <span class="hljs-selector-tag">created</span>(){
    <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(this);
  },
  <span class="hljs-selector-tag">mounted</span>(){
    <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(this);
  }
})</code></pre>
<p>我们来看看这个函数经历了什么：<br>vue.js初始化的时候。调用了initGlobalAPI(vue),为vue挂上了工具函数vue.component<br>经过initGlobalAPI（vue)中的initAssetRegisters (Vue) 后。变为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue.component = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        {
          if (type === 'component' &amp;&amp; config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' &amp;&amp; isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' &amp;&amp; typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;／／全局的组件或者指令和过滤器。统一挂在vue.options上。等待init的时候利用策略合并侵入实例。供实例使用
        return definition
      }
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>vue.component = <span class="hljs-keyword">function</span> <span class="hljs-title"></span>(
      id,
      definition
    ) {
      if (!definition) {
        <span class="hljs-keyword">return</span> <span class="hljs-type">this.options[type</span> + <span class="hljs-string">'s'</span>][id]
      } <span class="hljs-keyword">else</span> {
        /* istanbul ignore <span class="hljs-keyword">if</span> */
        {
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> <span class="hljs-type">=== </span><span class="hljs-symbol">'component</span>' &amp;&amp; config.isReservedTag(id)) {
            warn(
              <span class="hljs-symbol">'Do</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">use</span> built-<span class="hljs-keyword">in</span> <span class="hljs-keyword">or</span> reserved HTML elements as component ' +
              <span class="hljs-symbol">'id</span>: ' + id
            );
          }
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> <span class="hljs-type">=== </span><span class="hljs-symbol">'component</span>' &amp;&amp; isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> <span class="hljs-type">=== </span><span class="hljs-symbol">'directive</span>' &amp;&amp; typeof definition === <span class="hljs-symbol">'function</span>') {
          definition = { bind: definition, update: definition };
        }
        this.options[<span class="hljs-keyword">type</span> <span class="hljs-type">+ </span><span class="hljs-string">'s'</span>][id] = definition;／／全局的组件或者指令和过滤器。统一挂在vue.options上。等待init的时候利用策略合并侵入实例。供实例使用
        <span class="hljs-keyword">return</span> definition
      }
    };</code></pre>
<p>this.options._base在initGlobalAPI（vue)中为Vue.options._base = Vue;<br>so vue.component调用了vue.extend。找到了源头。我们来好好看看这个vue.extend这个function。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]／／如果组件已经被缓存在extendOptions上则直接取出
    }

    var name = extendOptions.name || Super.options.name;
    {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: &quot;' + name + '&quot;. Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'／／校验组件名
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;／／将vue上原型的方法挂在Sub.prototype中，Sub的实例同时也继承了vue.prototype上的所有属性和方法。
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions／／通过vue的合并策略合并添加项到新的构造器上
    );
    Sub['super'] = Super;缓存父构造器

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {   ／／处理props和computed相关响应式配置项
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.              ／／在新的构造器上挂上vue的工具方法
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;//缓存组件构造器在extendOptions上
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, &quot;_props&quot;, key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Vue.extend = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">extendOptions</span>) </span>{
    extendOptions = extendOptions || {};
    <span class="hljs-keyword">var</span> Super = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> SuperId = Super.cid;
    <span class="hljs-keyword">var</span> cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    <span class="hljs-keyword">if</span> (cachedCtors[SuperId]) {
      <span class="hljs-keyword">return</span> cachedCtors[SuperId]／／如果组件已经被缓存在extendOptions上则直接取出
    }

    <span class="hljs-keyword">var</span> name = extendOptions.name || Super.options.name;
    {
      <span class="hljs-keyword">if</span> (!<span class="hljs-regexp">/^[a-zA-Z][\w-]*$/</span>.test(name)) {
        warn(
          <span class="hljs-string">'Invalid component name: "'</span> + name + <span class="hljs-string">'". Component names '</span> +
          <span class="hljs-string">'can only contain alphanumeric characters and the hyphen, '</span> +
          <span class="hljs-string">'and must start with a letter.'</span>／／校验组件名
        );
      }
    }

    <span class="hljs-keyword">var</span> Sub = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">VueComponent</span> (<span class="hljs-params">options</span>) </span>{
      <span class="hljs-keyword">this</span>._init(options);
    };
    Sub.prototype = <span class="hljs-built_in">Object</span>.create(Super.prototype);
    Sub.prototype.constructor = Sub;／／将vue上原型的方法挂在Sub.prototype中，Sub的实例同时也继承了vue.prototype上的所有属性和方法。
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions／／通过vue的合并策略合并添加项到新的构造器上
    );
    Sub[<span class="hljs-string">'super'</span>] = Super;缓存父构造器

    <span class="hljs-comment">// For props and computed properties, we define the proxy getters on</span>
    <span class="hljs-comment">// the Vue instances at extension time, on the extended prototype. This</span>
    <span class="hljs-comment">// avoids Object.defineProperty calls for each instance created.</span>
    <span class="hljs-keyword">if</span> (Sub.options.props) {
      initProps$<span class="hljs-number">1</span>(Sub);
    }
    <span class="hljs-keyword">if</span> (Sub.options.computed) {   ／／处理props和computed相关响应式配置项
      initComputed$<span class="hljs-number">1</span>(Sub);
    }

    <span class="hljs-comment">// allow further extension/mixin/plugin usage</span>
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    <span class="hljs-comment">// create asset registers, so extended classes</span>
    <span class="hljs-comment">// can have their private assets too.              ／／在新的构造器上挂上vue的工具方法</span>
    ASSET_TYPES.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">type</span>) </span>{
      Sub[type] = Super[type];
    });
    <span class="hljs-comment">// enable recursive self-lookup</span>
    <span class="hljs-keyword">if</span> (name) {
      Sub.options.components[name] = Sub;
    }

    <span class="hljs-comment">// keep a reference to the super options at extension time.</span>
    <span class="hljs-comment">// later at instantiation we can check if Super's options have</span>
    <span class="hljs-comment">// been updated.</span>
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    <span class="hljs-comment">// cache constructor</span>
    cachedCtors[SuperId] = Sub;<span class="hljs-comment">//缓存组件构造器在extendOptions上</span>
    <span class="hljs-keyword">return</span> Sub
  };
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initProps$1</span> (<span class="hljs-params">Comp</span>) </span>{
  <span class="hljs-keyword">var</span> props = Comp.options.props;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> props) {
    proxy(Comp.prototype, <span class="hljs-string">"_props"</span>, key);
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initComputed$1</span> (<span class="hljs-params">Comp</span>) </span>{
  <span class="hljs-keyword">var</span> computed = Comp.options.computed;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}</code></pre>
<p>总的来说vue.extend是返回了一个带有附加配置相的新的vue的构造器。在函数中，构造器叫做Sub，等待render时候初始化。<br>经过vue.component的调用。vue增加了一个全局组件my-component;此时vue.options.component如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVOUw4?w=732&amp;h=228" src="https://static.alili.tech/img/bVOUw4?w=732&amp;h=228" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>前三个是vue内置的三个组件，在initgloabalapi的时候初始化。<br>至此全局组件创建完成。全局组件放置在最底层。在以后的策略合并里会在子组件中的component项的__proto__中。</p>
<hr>
<h2 id="articleHeader0">通过组件的递归创建渲染来看vue整体的生命周期（理解vue如何巧妙构建应用）</h2>
<p>上图：<br><span class="img-wrap"><img data-src="/img/bVOWLQ?w=311&amp;h=274" src="https://static.alili.tech/img/bVOWLQ?w=311&amp;h=274" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>vue官方的生命周期图，其实也就是vue组件的构成的生命周期。沿着new Vue()我们来大概看看这些生命周期在什么阶段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (&quot;development&quot; !== 'production' &amp;&amp; config.performance &amp;&amp; mark) {
      startTag = &quot;vue-perf-init:&quot; + (vm._uid);
      endTag = &quot;vue-perf-end:&quot; + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options &amp;&amp; options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);//内部组件调用此快捷方法
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),//策略合并，每项属性都有对应的合并规则
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);／／属性代理，即vm.xx = vm.data.xx
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);//初始化生命周期状态变量，建立子父关系初始值，如$children，$parent.
    initEvents(vm);//&nbsp;初始化事件
    initRender(vm);//初始化render核心函数_$createElement和$slots $scopedSlots等
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);//利用数据劫持做响应式
    initProvide(vm); //resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (&quot;development&quot; !== 'production' &amp;&amp; config.performance &amp;&amp; mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + &quot; init&quot;), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);//如果有el配置相则主动挂载。触发之后的compile.render
    }
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>Vue.prototype._init = function (<span class="hljs-keyword">options</span>) {
    var vm = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">// a uid</span>
    vm._uid = uid$<span class="hljs-number">1</span>++;

    var startTag, endTag;
    <span class="hljs-comment">/* istanbul ignore if */</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-string">"development"</span> !== <span class="hljs-string">'production'</span> &amp;&amp; config.performance &amp;&amp; mark) {
      startTag = <span class="hljs-string">"vue-perf-init:"</span> + (vm._uid);
      endTag = <span class="hljs-string">"vue-perf-end:"</span> + (vm._uid);
      mark(startTag);
    }

    <span class="hljs-comment">// a flag to avoid this being observed</span>
    vm._isVue = <span class="hljs-keyword">true</span>;
    <span class="hljs-comment">// merge options</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">options</span> &amp;&amp; <span class="hljs-keyword">options</span>._isComponent) {
      <span class="hljs-comment">// optimize internal component instantiation</span>
      <span class="hljs-comment">// since dynamic options merging is pretty slow, and none of the</span>
      <span class="hljs-comment">// internal component options needs special treatment.</span>
      initInternalComponent(vm, <span class="hljs-keyword">options</span>);<span class="hljs-comment">//内部组件调用此快捷方法</span>
    } <span class="hljs-keyword">else</span> {
      vm.$<span class="hljs-keyword">options</span> = mergeOptions(
        resolveConstructorOptions(vm.constructor),<span class="hljs-comment">//策略合并，每项属性都有对应的合并规则</span>
        <span class="hljs-keyword">options</span> || {},
        vm
      );
    }
    <span class="hljs-comment">/* istanbul ignore else */</span>
    {
      initProxy(vm);／／属性代理，即vm.xx = vm.data.xx
    }
    <span class="hljs-comment">// expose real self</span>
    vm._self = vm;
    initLifecycle(vm);<span class="hljs-comment">//初始化生命周期状态变量，建立子父关系初始值，如$children，$parent.</span>
    initEvents(vm);<span class="hljs-comment">//&nbsp;初始化事件</span>
    initRender(vm);<span class="hljs-comment">//初始化render核心函数_$createElement和$slots $scopedSlots等</span>
    callHook(vm, <span class="hljs-string">'beforeCreate'</span>);
    initInjections(vm); <span class="hljs-comment">// resolve injections before data/props</span>
    initState(vm);<span class="hljs-comment">//利用数据劫持做响应式</span>
    initProvide(vm); <span class="hljs-comment">//resolve provide after data/props</span>
    callHook(vm, <span class="hljs-string">'created'</span>);

    <span class="hljs-comment">/* istanbul ignore if */</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-string">"development"</span> !== <span class="hljs-string">'production'</span> &amp;&amp; config.performance &amp;&amp; mark) {
      vm._name = formatComponentName(vm, <span class="hljs-keyword">false</span>);
      mark(endTag);
      measure(((vm._name) + <span class="hljs-string">" init"</span>), startTag, endTag);
    }

    <span class="hljs-keyword">if</span> (vm.$<span class="hljs-keyword">options</span>.el) {
      vm.$mount(vm.$<span class="hljs-keyword">options</span>.el);<span class="hljs-comment">//如果有el配置相则主动挂载。触发之后的compile.render</span>
    }
  };</code></pre>
<p>介绍了大概的_init函数，我们继续往下看程序的运行。完成了vue.component()之后。开始执行new vue()，创建实例。<br>对照_init函数。我们知道它分别进行了对传入参数的合并。初始化实例参数。创建响应的响应式。最后挂载：vm.$mount(vm.$options.el);<br>简单说说挂载。好吧。我们还是往方法里面看，挂载的时候发生了什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el &amp;&amp; inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

var mount = Vue$3.prototype.$mount//缓存mount,用来触发render
Vue$3.prototype.$mount = function (//核心mount用来构建render函数
  el,
  hydrating
) {
  el = el &amp;&amp; query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    &quot;development&quot; !== 'production' &amp;&amp; warn(
      &quot;Do not mount Vue to <html> or <body> - mount to normal elements instead.&quot;／／检测，排除不可挂载的元素
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;／／假如输入的是template模版时。
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (&quot;development&quot; !== 'production' &amp;&amp; !template) {
            warn(
              (&quot;Template element not found or is empty: &quot; + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;//输入的是dom节点时
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);／／如果是一个id，如此次初始化挂载的id=app，会取到id=app的html
    }
    if (template) {
      /* istanbul ignore if */
      if (&quot;development&quot; !== 'production' &amp;&amp; config.performance &amp;&amp; mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,／／核心compile函数。用于生成render函数。这里不细说
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;／／挂载render到实例options中。待调用
      options.staticRenderFns = staticRenderFns;／／静态的元素区分开。提升性能，后续虚拟dom树比较时，不会比较静态节点

      /* istanbul ignore if */
      if (&quot;development&quot; !== 'production' &amp;&amp; config.performance &amp;&amp; mark) {
        mark('compile end');
        measure(((this._name) + &quot; compile&quot;), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)／／利用缓存的mount调用准备好的render
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// public mount method</span>
Vue$<span class="hljs-number">3.</span>prototype.$mount = function (
  el,
  hydrating
) {
  el = el &amp;&amp; inBrowser ? query(el) : undefined;
  <span class="hljs-built_in">return</span> mountComponent(<span class="hljs-keyword">this</span>, el, hydrating)
};

var mount = Vue$<span class="hljs-number">3.</span>prototype.$mount<span class="hljs-comment">//缓存mount,用来触发render</span>
Vue$<span class="hljs-number">3.</span>prototype.$mount = function (<span class="hljs-comment">//核心mount用来构建render函数</span>
  el,
  hydrating
) {
  el = el &amp;&amp; query(el);

  <span class="hljs-comment">/* istanbul ignore if */</span>
  <span class="hljs-built_in">if</span> (el === document.body || el === document.documentElement) {
    <span class="hljs-string">"development"</span> !== <span class="hljs-string">'production'</span> &amp;&amp; warn(
      <span class="hljs-string">"Do not mount Vue to &lt;html&gt; or &lt;body&gt; - mount to normal elements instead."</span>／／检测，排除不可挂载的元素
    );
    <span class="hljs-built_in">return</span> <span class="hljs-keyword">this</span>
  }

  var options = <span class="hljs-keyword">this</span>.$options;
  <span class="hljs-comment">// resolve template/el and convert to render function</span>
  <span class="hljs-built_in">if</span> (!options.render) {
    var <span class="hljs-keyword">template</span> = options.<span class="hljs-keyword">template</span>;／／假如输入的是<span class="hljs-keyword">template</span>模版时。
    <span class="hljs-built_in">if</span> (<span class="hljs-keyword">template</span>) {
      <span class="hljs-built_in">if</span> (typeof <span class="hljs-keyword">template</span> === <span class="hljs-string">'string'</span>) {
        <span class="hljs-built_in">if</span> (<span class="hljs-keyword">template</span>.charAt(<span class="hljs-number">0</span>) === <span class="hljs-string">'#'</span>) {
          <span class="hljs-keyword">template</span> = idToTemplate(<span class="hljs-keyword">template</span>);
          <span class="hljs-comment">/* istanbul ignore if */</span>
          <span class="hljs-built_in">if</span> (<span class="hljs-string">"development"</span> !== <span class="hljs-string">'production'</span> &amp;&amp; !<span class="hljs-keyword">template</span>) {
            warn(
              (<span class="hljs-string">"Template element not found or is empty: "</span> + (options.<span class="hljs-keyword">template</span>)),
              <span class="hljs-keyword">this</span>
            );
          }
        }
      } <span class="hljs-built_in">else</span> <span class="hljs-built_in">if</span> (<span class="hljs-keyword">template</span>.nodeType) {
        <span class="hljs-keyword">template</span> = <span class="hljs-keyword">template</span>.innerHTML;<span class="hljs-comment">//输入的是dom节点时</span>
      } <span class="hljs-built_in">else</span> {
        {
          warn(<span class="hljs-string">'invalid template option:'</span> + <span class="hljs-keyword">template</span>, <span class="hljs-keyword">this</span>);
        }
        <span class="hljs-built_in">return</span> <span class="hljs-keyword">this</span>
      }
    } <span class="hljs-built_in">else</span> <span class="hljs-built_in">if</span> (el) {
      <span class="hljs-keyword">template</span> = getOuterHTML(el);／／如果是一个id，如此次初始化挂载的id=app，会取到id=app的html
    }
    <span class="hljs-built_in">if</span> (<span class="hljs-keyword">template</span>) {
      <span class="hljs-comment">/* istanbul ignore if */</span>
      <span class="hljs-built_in">if</span> (<span class="hljs-string">"development"</span> !== <span class="hljs-string">'production'</span> &amp;&amp; <span class="hljs-built_in">config</span>.performance &amp;&amp; mark) {
        mark(<span class="hljs-string">'compile'</span>);
      }

      var ref = compileToFunctions(<span class="hljs-keyword">template</span>, {
        shouldDecodeNewlines: shouldDecodeNewlines,／／核心compile函数。用于生成render函数。这里不细说
        delimiters: options.delimiters
      }, <span class="hljs-keyword">this</span>);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;／／挂载render到实例options中。待调用
      options.staticRenderFns = staticRenderFns;／／静态的元素区分开。提升性能，后续虚拟dom树比较时，不会比较静态节点

      <span class="hljs-comment">/* istanbul ignore if */</span>
      <span class="hljs-built_in">if</span> (<span class="hljs-string">"development"</span> !== <span class="hljs-string">'production'</span> &amp;&amp; <span class="hljs-built_in">config</span>.performance &amp;&amp; mark) {
        mark(<span class="hljs-string">'compile end'</span>);
        measure(((<span class="hljs-keyword">this</span>._name) + <span class="hljs-string">" compile"</span>), <span class="hljs-string">'compile'</span>, <span class="hljs-string">'compile end'</span>);
      }
    }
  }
  <span class="hljs-built_in">return</span> mount.call(<span class="hljs-keyword">this</span>, el, hydrating)／／利用缓存的mount调用准备好的render
};</code></pre>
<p>$mount方法的核心其实就是准备好组件的render函数。这里最核心的一个方法就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,／／核心compile函数。用于生成render函数。这里不细说
        delimiters: options.delimiters
      }, this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">ref</span> = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,／／核心compile函数。用于生成render函数。这里不细说
        delimiters: options.delimiters
      }, <span class="hljs-keyword">this</span>);</code></pre>
<p>compileToFunctions这个函数中主要做了两件事：<br>1:对模版进行compile（按标签解析,生成ast（抽象语法树）<br>2:利用generate(ast, options),生成render函数语法</p>
<p>我们来看看最后实例生成的render函数：<br><span class="img-wrap"><img data-src="/img/bVOWLR?w=357&amp;h=277" src="https://static.alili.tech/img/bVOWLR?w=357&amp;h=277" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>没有错就是这个样子，很有感觉。生成的render函数保存在options中，等待调用</p>
<p>好吧。开始调用吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mount.call(this, el, hydrating)＝》mountComponent(this, el, hydrating)＝》updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };＝》vm._watcher = new Watcher(vm, updateComponent, noop);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>mount.call(<span class="hljs-keyword">this</span>, el, hydrating)＝》mountComponent(<span class="hljs-keyword">this</span>, el, hydrating)＝》updateComponent = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      vm._update(vm._render(), hydrating);
    };＝》vm._watcher = <span class="hljs-keyword">new</span> Watcher(vm, updateComponent, noop);</code></pre>
<p>new Watcher中会主动调用updateComponent去touch依赖（给页面中引用过的data中的变量假如监听）正式调用render函数。既然都说了。那就来看看render函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode &amp;&amp; _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns &amp;&amp; !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);//核心函数，调用render
    } catch (e) {
      handleError(e, vm, &quot;render function&quot;);
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (&quot;development&quot; !== 'production' &amp;&amp; Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>Vue.prototype._render = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> vm = this;
    <span class="hljs-keyword">var</span> ref = vm.$options;
    <span class="hljs-keyword">var</span> render = ref.render;
    <span class="hljs-keyword">var</span> staticRenderFns = ref.staticRenderFns;
    <span class="hljs-keyword">var</span> _parentVnode = ref._parentVnode;

    <span class="hljs-keyword">if</span> (vm._isMounted) {
      <span class="hljs-comment">// clone slot nodes on re-renders</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode &amp;&amp; _parentVnode.data.scopedSlots) || emptyObject;

    <span class="hljs-keyword">if</span> (staticRenderFns &amp;&amp; !vm._staticTrees) {
      vm._staticTrees = [];
    }
    <span class="hljs-comment">// set parent vnode. this allows render functions to have access</span>
    <span class="hljs-comment">// to the data on the placeholder node.</span>
    vm.$vnode = _parentVnode;
    <span class="hljs-comment">// render self</span>
    <span class="hljs-keyword">var</span> vnode;
    <span class="hljs-keyword">try</span> {
      vnode = render.call(vm._renderProxy, vm.$createElement);<span class="hljs-comment">//核心函数，调用render</span>
    } <span class="hljs-keyword">catch</span> (e) {
      handleError(e, vm, <span class="hljs-string">"render function"</span>);
      <span class="hljs-comment">// return error render result,</span>
      <span class="hljs-comment">// or previous vnode to prevent render error causing blank component</span>
      <span class="hljs-comment">/* istanbul ignore else */</span>
      {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      }
    }
    <span class="hljs-comment">// return empty vnode in case the render function errored out</span>
    <span class="hljs-keyword">if</span> (!(vnode <span class="hljs-keyword">instanceof</span> VNode)) {
      <span class="hljs-keyword">if</span> (<span class="hljs-string">"development"</span> !== <span class="hljs-string">'production'</span> &amp;&amp; <span class="hljs-keyword">Array</span>.isArray(vnode)) {
        warn(
          <span class="hljs-string">'Multiple root nodes returned from render function. Render function '</span> +
          <span class="hljs-string">'should return a single root node.'</span>,
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    <span class="hljs-comment">// set parent</span>
    vnode.<span class="hljs-keyword">parent</span> = _parentVnode;
    <span class="hljs-keyword">return</span> vnode
  };</code></pre>
<p>_render()间接调用了vnode = render.call(vm._renderProxy, vm.$createElement);</p>
<p>然后结合render函数。看看发生了什么。vm.$createElement是核心的创建虚拟dom的函数。</p>
<p>继续看看核心构建虚拟dom函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createElement (
  context,
  tag,
  data,
  children,//children是该元素下的所有子元素
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) &amp;&amp; isDef((data).__ob__)) {
    &quot;development&quot; !== 'production' &amp;&amp; warn(
      &quot;Avoid using observed data object as vnode data: &quot; + (JSON.stringify(data)) + &quot;\n&quot; +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &amp;&amp;
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {假如是组件则从上下文中取出组件的构造相关参数
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (vnode !== undefined) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function createElement (
  context,
  tag,
  <span class="hljs-keyword">data</span>,
  children,<span class="hljs-comment">//children是该元素下的所有子元素</span>
  normalizationType,
  alwaysNormalize
) {
  <span class="hljs-keyword">if</span> (Array.isArray(<span class="hljs-keyword">data</span>) || isPrimitive(<span class="hljs-keyword">data</span>)) {
    normalizationType = children;
    children = <span class="hljs-keyword">data</span>;
    <span class="hljs-keyword">data</span> = undefined;
  }
  <span class="hljs-keyword">if</span> (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  <span class="hljs-keyword">return</span> _createElement(context, tag, <span class="hljs-keyword">data</span>, children, normalizationType)
}

function _createElement (
  context,
  tag,
  <span class="hljs-keyword">data</span>,
  children,
  normalizationType
) {
  <span class="hljs-keyword">if</span> (isDef(<span class="hljs-keyword">data</span>) &amp;&amp; isDef((<span class="hljs-keyword">data</span>).__ob__)) {
    <span class="hljs-string">"development"</span> !== <span class="hljs-string">'production'</span> &amp;&amp; warn(
      <span class="hljs-string">"Avoid using observed data object as vnode data: "</span> + (JSON.stringify(<span class="hljs-keyword">data</span>)) + <span class="hljs-string">"\n"</span> +
      <span class="hljs-string">'Always create fresh vnode data objects in each render!'</span>,
      context
    );
    <span class="hljs-keyword">return</span> createEmptyVNode()
  }
  <span class="hljs-keyword">if</span> (!tag) {
    <span class="hljs-comment">// in case of component :is set to falsy value</span>
    <span class="hljs-keyword">return</span> createEmptyVNode()
  }
  <span class="hljs-comment">// support single function children as default scoped slot</span>
  <span class="hljs-keyword">if</span> (Array.isArray(children) &amp;&amp;
      typeof children[<span class="hljs-number">0</span>] === <span class="hljs-string">'function'</span>) {
    <span class="hljs-keyword">data</span> = <span class="hljs-keyword">data</span> || {};
    <span class="hljs-keyword">data</span>.scopedSlots = { <span class="hljs-keyword">default</span>: children[<span class="hljs-number">0</span>] };
    children.length = <span class="hljs-number">0</span>;
  }
  <span class="hljs-keyword">if</span> (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  <span class="hljs-keyword">var</span> vnode, ns;
  <span class="hljs-keyword">if</span> (typeof tag === <span class="hljs-string">'string'</span>) {
    <span class="hljs-keyword">var</span> Ctor;
    ns = config.getTagNamespace(tag);
    <span class="hljs-keyword">if</span> (config.isReservedTag(tag)) {
      <span class="hljs-comment">// platform built-in elements</span>
      vnode = new VNode(
        config.parsePlatformTagName(tag), <span class="hljs-keyword">data</span>, children,
        undefined, undefined, context
      );
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(Ctor = resolveAsset(context.$options, <span class="hljs-string">'components'</span>, tag))) {假如是组件则从上下文中取出组件的构造相关参数
      <span class="hljs-comment">// component</span>
      vnode = createComponent(Ctor, <span class="hljs-keyword">data</span>, context, children, tag);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// unknown or unlisted namespaced elements</span>
      <span class="hljs-comment">// check at runtime because it may get assigned a namespace when its</span>
      <span class="hljs-comment">// parent normalizes children</span>
      vnode = new VNode(
        tag, <span class="hljs-keyword">data</span>, children,
        undefined, undefined, context
      );
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// direct component options / constructor</span>
    vnode = createComponent(tag, <span class="hljs-keyword">data</span>, context, children);
  }
  <span class="hljs-keyword">if</span> (vnode !== undefined) {
    <span class="hljs-keyword">if</span> (ns) { applyNS(vnode, ns); }
    <span class="hljs-keyword">return</span> vnode
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> createEmptyVNode()
  }
}</code></pre>
<p>这里其实我们不难看出vue在构造虚拟dom时。递归的去调用createElement去生成虚拟dom树。当children是组件或者是普通元素时。做不同的处理。这里我们关注的是。当子元素是组建时。这里调用了 <br>vnode = createComponent(tag, data, context, children);<br>细心的人可以在去看看这个函数做了什么。简单来说这个函数将组件的构造参数取出来，放置在元素的componentOptions上。供后续创建真实dom时。标记该元素是组件。递归初始化。<br>跳过这些沉重的。我们直接看看我们的这个html生成的最终的虚拟dom长什么样。如下：<br><span class="img-wrap"><img data-src="/img/bVOWLQ?w=311&amp;h=274" src="https://static.alili.tech/img/bVOWLQ?w=311&amp;h=274" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我们在来看看我们的my-component组件长什么样子：<br><span class="img-wrap"><img data-src="/img/bVOWLR?w=357&amp;h=277" src="https://static.alili.tech/img/bVOWLR?w=357&amp;h=277" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>componentOptios上存着初始化组件需要的参数。</p>
<p>构建好虚拟dom后。vue进入update阶段：<br>这个阶段vue会判断先前有无该元素。是否为第一次渲染。假如是第一次。那么直接创建。如果不是有先前的ovnode,则比较差异。最小化更新。看看具体函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nction lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;//取出缓存的久的虚拟dom
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;//缓存当前vnode，供下次更新使用
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {//假如第一次渲染。直接创建
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);//更新时。会比较差异
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode &amp;&amp; vm.$parent &amp;&amp; vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>nction lifecycleMixin (Vue) {
  Vue.prototype._update = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(vnode, hydrating)</span> </span>{
    <span class="hljs-keyword">var</span> vm = this;
    <span class="hljs-keyword">if</span> (vm._isMounted) {
      callHook(vm, <span class="hljs-string">'beforeUpdate'</span>);
    }
    <span class="hljs-keyword">var</span> prevEl = vm.$el;
    <span class="hljs-keyword">var</span> prevVnode = vm._vnode;<span class="hljs-comment">//取出缓存的久的虚拟dom</span>
    <span class="hljs-keyword">var</span> prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;<span class="hljs-comment">//缓存当前vnode，供下次更新使用</span>
    <span class="hljs-comment">// Vue.prototype.__patch__ is injected in entry points</span>
    <span class="hljs-comment">// based on the rendering backend used.</span>
    <span class="hljs-keyword">if</span> (!prevVnode) {<span class="hljs-comment">//假如第一次渲染。直接创建</span>
      <span class="hljs-comment">// initial render</span>
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, <span class="hljs-keyword">false</span> <span class="hljs-comment">/* removeOnly */</span>,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// updates</span>
      vm.$el = vm.__patch__(prevVnode, vnode);<span class="hljs-comment">//更新时。会比较差异</span>
    }
    activeInstance = prevActiveInstance;
    <span class="hljs-comment">// update __vue__ reference</span>
    <span class="hljs-keyword">if</span> (prevEl) {
      prevEl.__vue__ = <span class="hljs-keyword">null</span>;
    }
    <span class="hljs-keyword">if</span> (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    <span class="hljs-comment">// if parent is an HOC, update its $el as well</span>
    <span class="hljs-keyword">if</span> (vm.$vnode &amp;&amp; vm.$parent &amp;&amp; vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    <span class="hljs-comment">// updated hook is called by the scheduler to ensure that children are</span>
    <span class="hljs-comment">// updated in a parent's updated hook.</span>
  };</code></pre>
<p>__patch__函数我们就不细看了。算了看一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;//假如第一次渲染。直接创建
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement &amp;&amp; sameVnode(oldVnode, vnode)) {／／假如更新并且前后虚拟dom相似，这里相似有自己的一个算法。比如tag,key必需一致。才会去diff比较
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 &amp;&amp; oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patch</span> <span class="hljs-params">(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm)</span> </span>{
    <span class="hljs-keyword">if</span> (isUndef(vnode)) {
      <span class="hljs-keyword">if</span> (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      <span class="hljs-keyword">return</span>
    }

    <span class="hljs-keyword">var</span> isInitialPatch = <span class="hljs-keyword">false</span>;
    <span class="hljs-keyword">var</span> insertedVnodeQueue = [];

    <span class="hljs-keyword">if</span> (isUndef(oldVnode)) {
      <span class="hljs-comment">// empty mount (likely as component), create new root element</span>
      isInitialPatch = <span class="hljs-keyword">true</span>;<span class="hljs-comment">//假如第一次渲染。直接创建</span>
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">var</span> isRealElement = isDef(oldVnode.nodeType);
      <span class="hljs-keyword">if</span> (!isRealElement &amp;&amp; sameVnode(oldVnode, vnode)) {／／假如更新并且前后虚拟dom相似，这里相似有自己的一个算法。比如tag,key必需一致。才会去diff比较
        <span class="hljs-comment">// patch existing root node</span>
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (isRealElement) {
          <span class="hljs-comment">// mounting to a real element</span>
          <span class="hljs-comment">// check if this is server-rendered content and if we can perform</span>
          <span class="hljs-comment">// a successful hydration.</span>
          <span class="hljs-keyword">if</span> (oldVnode.nodeType === <span class="hljs-number">1</span> &amp;&amp; oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = <span class="hljs-keyword">true</span>;
          }
          <span class="hljs-keyword">if</span> (isTrue(hydrating)) {
            <span class="hljs-keyword">if</span> (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, <span class="hljs-keyword">true</span>);
              <span class="hljs-keyword">return</span> oldVnode
            } <span class="hljs-keyword">else</span> {
              warn(
                <span class="hljs-string">'The client-side rendered virtual DOM tree is not matching '</span> +
                <span class="hljs-string">'server-rendered content. This is likely caused by incorrect '</span> +
                <span class="hljs-string">'HTML markup, for example nesting block-level elements inside '</span> +
                <span class="hljs-string">'&lt;p&gt;, or missing &lt;tbody&gt;. Bailing hydration and performing '</span> +
                <span class="hljs-string">'full client-side render.'</span>
              );
            }
          }
          <span class="hljs-comment">// either not server-rendered, or hydration failed.</span>
          <span class="hljs-comment">// create an empty node and replace it</span>
          oldVnode = emptyNodeAt(oldVnode);
        }
        <span class="hljs-comment">// replacing existing element</span>
        <span class="hljs-keyword">var</span> oldElm = oldVnode.elm;
        <span class="hljs-keyword">var</span> parentElm$<span class="hljs-number">1</span> = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          <span class="hljs-comment">// extremely rare edge case: do not insert if old element is in a</span>
          <span class="hljs-comment">// leaving transition. Only happens when combining transition +</span>
          <span class="hljs-comment">// keep-alive + HOCs. (#4590)</span>
          oldElm._leaveCb ? <span class="hljs-keyword">null</span> : parentElm$<span class="hljs-number">1</span>,
          nodeOps.nextSibling(oldElm)
        );

        <span class="hljs-keyword">if</span> (isDef(vnode.<span class="hljs-keyword">parent</span>)) {
          <span class="hljs-comment">// component root element replaced.</span>
          <span class="hljs-comment">// update parent placeholder node element, recursively</span>
          <span class="hljs-keyword">var</span> ancestor = vnode.<span class="hljs-keyword">parent</span>;
          <span class="hljs-keyword">while</span> (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.<span class="hljs-keyword">parent</span>;
          }
          <span class="hljs-keyword">if</span> (isPatchable(vnode)) {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.<span class="hljs-keyword">parent</span>);
            }
          }
        }

        <span class="hljs-keyword">if</span> (isDef(parentElm$<span class="hljs-number">1</span>)) {
          removeVnodes(parentElm$<span class="hljs-number">1</span>, [oldVnode], <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    <span class="hljs-keyword">return</span> vnode.elm
  }</code></pre>
<p>patch方法中核心的是createElm：看懂这个函数非常重要代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {//根据之前保存的componentoptions来识别是否为组件。若是。则进这个逻辑
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data &amp;&amp; data.pre) {
          inPre++;
        }
        if (
          !inPre &amp;&amp;
          !vnode.ns &amp;&amp;
          !(config.ignoredElements.length &amp;&amp; config.ignoredElements.indexOf(tag) > -1) &amp;&amp;
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the &quot;name&quot; option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (&quot;development&quot; !== 'production' &amp;&amp; data &amp;&amp; data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; <span class="hljs-comment">// for transition enter check</span>
    <span class="hljs-keyword">if</span> (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {<span class="hljs-comment">//根据之前保存的componentoptions来识别是否为组件。若是。则进这个逻辑</span>
      <span class="hljs-keyword">return</span>
    }

    <span class="hljs-built_in">var</span> <span class="hljs-built_in">data</span> = vnode.<span class="hljs-built_in">data</span>;
    <span class="hljs-built_in">var</span> children = vnode.children;
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">tag</span> = vnode.<span class="hljs-built_in">tag</span>;
    <span class="hljs-keyword">if</span> (isDef(<span class="hljs-built_in">tag</span>)) {
      {
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">data</span> &amp;&amp; <span class="hljs-built_in">data</span>.pre) {
          inPre++;
        }
        <span class="hljs-keyword">if</span> (
          !inPre &amp;&amp;
          !vnode.ns &amp;&amp;
          !(config.ignoredElements.length &amp;&amp; config.ignoredElements.indexOf(<span class="hljs-built_in">tag</span>) &gt; <span class="hljs-number">-1</span>) &amp;&amp;
          config.isUnknownElement(<span class="hljs-built_in">tag</span>)
        ) {
          warn(
            <span class="hljs-string">'Unknown custom element: &lt;'</span> + <span class="hljs-built_in">tag</span> + <span class="hljs-string">'&gt; - did you '</span> +
            <span class="hljs-string">'register the component correctly? For recursive components, '</span> +
            <span class="hljs-string">'make sure to provide the "name" option.'</span>,
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, <span class="hljs-built_in">tag</span>)
        : nodeOps.createElement(<span class="hljs-built_in">tag</span>, vnode);
      setScope(vnode);

      <span class="hljs-comment">/* istanbul ignore if */</span>
      {
        createChildren(vnode, children, insertedVnodeQueue);
        <span class="hljs-keyword">if</span> (isDef(<span class="hljs-built_in">data</span>)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      <span class="hljs-keyword">if</span> (<span class="hljs-string">"development"</span> !== <span class="hljs-string">'production'</span> &amp;&amp; <span class="hljs-built_in">data</span> &amp;&amp; <span class="hljs-built_in">data</span>.pre) {
        inPre--;
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } <span class="hljs-keyword">else</span> {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }</code></pre>
<p>我们这边还是先关注自己的组件部分。当children是组件元素时，很显然调用了createComponent(vnode, insertedVnodeQueue, parentElm, refElm)；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,//调用了组件内部的_init方法递归创建子组件。正式进入子组件的生命周期
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);触发子组件的挂载。出发子组件的编译和render。又重新来一遍／直到子组件完全渲染好。再开始creelem下一个child
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> componentVNodeHooks = {
  init: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span> <span class="hljs-params">(
    vnode,
    hydrating,
    parentElm,
    refElm
  )</span> </span>{
    <span class="hljs-keyword">if</span> (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      <span class="hljs-keyword">var</span> child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,<span class="hljs-comment">//调用了组件内部的_init方法递归创建子组件。正式进入子组件的生命周期</span>
        refElm
      );
      child.$mount(hydrating ? vnode.elm : <span class="hljs-literal">undefined</span>, hydrating);触发子组件的挂载。出发子组件的编译和render。又重新来一遍／直到子组件完全渲染好。再开始creelem下一个child
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (vnode.data.keepAlive) {
      <span class="hljs-comment">// kept-alive components, treat as a patch</span>
      <span class="hljs-keyword">var</span> mountedNode = vnode; <span class="hljs-comment">// work around flow</span>
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },</code></pre>
<p>这里就是递归创建子组件的核心部分.</p>
<p>总结： 第一次写这个vue。失败了。切模块切的不够细。组件机制感觉用了好多东西。这个面太大了。自己讲的时候也不知道该细讲还是。。。</p>
<p>总的来说：vue在创建虚拟dom的时候，如果元素是组件。则准备好组件的构造参数。包括模版和数据等等。组件中的元素如slot，和child放在组件元素的children下。供后面的内容分发用组件中的元素也是在父组件的作用域内编译的。看—_render（）函数就知道。然后在vue需要将虚拟dom变为真实dom时。遇到组件元素时。开始递归初始化。直到把组件compile,render构建完后。开始构建下一个元素。最后添加到真实id=app上。并且把旧的删了。哈哈。随便写了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue源码解读－component机制

## 原文链接
[https://segmentfault.com/a/1190000009721209](https://segmentfault.com/a/1190000009721209)

