---
title: 'vue源码解析－事件机制' 
date: 2019-01-12 2:30:25
hidden: true
slug: 9y1nxcikk24
categories: [reprint]
---

{{< raw >}}

                    
<p>上一章没什么经验。直接写了组件机制。感觉涉及到的东西非常的多，不是很方便讲。今天看了下vue的关于事件的机制。有一些些体会。写出来。大家一起纠正，分享。源码都是基于最新的Vue.js v2.3.0。下面我们来看看vue中的事件机制：<br>  老样子还是先上一段贯穿全局的代码，常见的事件机制demo都会包含在这段代码中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <div id=&quot;test1&quot; @click=&quot;click1&quot;>click1</div>
  <div id=&quot;test2&quot; @click.stop=&quot;click2&quot;>click2</div>
  <my-component v-on:click.native=&quot;nativeclick&quot; v-on:componenton=&quot;parentOn&quot;>
  </my-component>
</div>
</body>
<script src=&quot;vue.js&quot;></script>
<script type=&quot;text/javascript&quot;>
var Child = {
  template: '<div>A custom component!</div>'
} 
Vue.component('my-component', {
  name: 'my-component',
  template: '<div>A custom component!<div @click.stop=&quot;toParent&quot;>test click</div></div>',
  components: {
    Child:Child
  },
  created(){
    console.log(this);
  },
  methods: {
    toParent(){
      this.$emit('componenton','toParent')
    }
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
  methods: {
    click1(){
      alert('click1')
    },
    click2(){
      alert('click2')
    },
    nativeclick(){
      alert('nativeclick')
    },
    parentOn(value){
      alert(value)
    }
  }
})
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test1"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"click1"</span>&gt;</span>click1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test2"</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"click2"</span>&gt;</span>click2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">v-on:click.native</span>=<span class="hljs-string">"nativeclick"</span> <span class="hljs-attr">v-on:componenton</span>=<span class="hljs-string">"parentOn"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">var</span> Child = {
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;A custom component!&lt;/div&gt;'</span>
} 
Vue.component(<span class="hljs-string">'my-component'</span>, {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'my-component'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;A custom component!&lt;div @click.stop="toParent"&gt;test click&lt;/div&gt;&lt;/div&gt;'</span>,
  <span class="hljs-attr">components</span>: {
    <span class="hljs-attr">Child</span>:Child
  },
  created(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
  },
  <span class="hljs-attr">methods</span>: {
    toParent(){
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'componenton'</span>,<span class="hljs-string">'toParent'</span>)
    }
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
  <span class="hljs-attr">methods</span>: {
    click1(){
      alert(<span class="hljs-string">'click1'</span>)
    },
    click2(){
      alert(<span class="hljs-string">'click2'</span>)
    },
    nativeclick(){
      alert(<span class="hljs-string">'nativeclick'</span>)
    },
    parentOn(value){
      alert(value)
    }
  }
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>上面的demo中一共有四个事件。基本涵盖了vue中最经典的事件的四种情况</p>
<h2 id="articleHeader0">普通html元素上的事件</h2>
<p>好吧。想想我们还是一个个来看。如果懂vue组件相关的机制会更容易懂。那么首先我们看看最简单的第一、二个(两个事件只差了个修饰符)：<br><code>&lt;div id="test1" @click="click1"&gt;click1&lt;/div&gt;</code><br>这是简单到不能在简单的一个点击事件。<br>我们来看看建立这么一个简单的点击事件，vue中发生了什么。<br>1:new Vue()中调用了initState(vue):看代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }//初始化事件
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

//接着看看initMethods
function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);//调用了bind方法，我们再看看bind
    {
      if (methods[key] == null) {
        warn(
          &quot;method \&quot;&quot; + key + &quot;\&quot; has an undefined value in the component definition. &quot; +
          &quot;Did you reference the function correctly?&quot;,
          vm
        );
      }
      if (props &amp;&amp; hasOwn(props, key)) {
        warn(
          (&quot;method \&quot;&quot; + key + &quot;\&quot; has already been defined as a prop.&quot;),
          vm
        );
      }
    }
  }
}

//我们接着看看bind

function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)//通过返回函数修饰了事件的回调函数。绑定了事件回调函数的this。并且让参数自定义。更加的灵活
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initState</span> (<span class="hljs-params">vm</span>) </span>{
  vm._watchers = [];
  <span class="hljs-keyword">var</span> opts = vm.$options;
  <span class="hljs-keyword">if</span> (opts.props) { initProps(vm, opts.props); }
  <span class="hljs-keyword">if</span> (opts.methods) { initMethods(vm, opts.methods); }<span class="hljs-comment">//初始化事件</span>
  <span class="hljs-keyword">if</span> (opts.data) {
    initData(vm);
  } <span class="hljs-keyword">else</span> {
    observe(vm._data = {}, <span class="hljs-literal">true</span> <span class="hljs-comment">/* asRootData */</span>);
  }
  <span class="hljs-keyword">if</span> (opts.computed) { initComputed(vm, opts.computed); }
  <span class="hljs-keyword">if</span> (opts.watch) { initWatch(vm, opts.watch); }
}

<span class="hljs-comment">//接着看看initMethods</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initMethods</span> (<span class="hljs-params">vm, methods</span>) </span>{
  <span class="hljs-keyword">var</span> props = vm.$options.props;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> methods) {
    vm[key] = methods[key] == <span class="hljs-literal">null</span> ? noop : bind(methods[key], vm);<span class="hljs-comment">//调用了bind方法，我们再看看bind</span>
    {
      <span class="hljs-keyword">if</span> (methods[key] == <span class="hljs-literal">null</span>) {
        warn(
          <span class="hljs-string">"method \""</span> + key + <span class="hljs-string">"\" has an undefined value in the component definition. "</span> +
          <span class="hljs-string">"Did you reference the function correctly?"</span>,
          vm
        );
      }
      <span class="hljs-keyword">if</span> (props &amp;&amp; hasOwn(props, key)) {
        warn(
          (<span class="hljs-string">"method \""</span> + key + <span class="hljs-string">"\" has already been defined as a prop."</span>),
          vm
        );
      }
    }
  }
}

<span class="hljs-comment">//我们接着看看bind</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bind</span> (<span class="hljs-params">fn, ctx</span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">boundFn</span> (<span class="hljs-params">a</span>) </span>{
    <span class="hljs-keyword">var</span> l = <span class="hljs-built_in">arguments</span>.length;
    <span class="hljs-keyword">return</span> l
      ? l &gt; <span class="hljs-number">1</span>
        ? fn.apply(ctx, <span class="hljs-built_in">arguments</span>)<span class="hljs-comment">//通过返回函数修饰了事件的回调函数。绑定了事件回调函数的this。并且让参数自定义。更加的灵活</span>
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  <span class="hljs-comment">// record original fn length</span>
  boundFn._length = fn.length;
  <span class="hljs-keyword">return</span> boundFn
}</code></pre>
<p>总的来说。vue初始化的时候，将method中的方法代理到vue[key]的同时修饰了事件的回调函数。绑定了作用域。</p>
<p>2:vue进入compile环节需要将该div变成ast(抽象语法树）。当编译到该div时经过核心函数genHandler：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return (&quot;[&quot; + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + &quot;]&quot;)
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression//假如没有修饰符。直接返回回调函数
      ? handler.value
      : (&quot;function($event){&quot; + (handler.value) + &quot;}&quot;) // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];//处理修饰符数组，例如.stop就在回调函数里加入event.stopPropagation()再返回。实现修饰的目的
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? (&quot;(&quot; + (handler.value) + &quot;)($event)&quot;)
        : handler.value;
    return (&quot;function($event){&quot; + code + handlerCode + &quot;}&quot;)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-function">function <span class="hljs-title">genHandler</span> (<span class="hljs-params">
  name,
  handler
</span>) </span>{
  <span class="hljs-keyword">if</span> (!handler) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'function(){}'</span>
  }

  <span class="hljs-keyword">if</span> (Array.isArray(handler)) {
    <span class="hljs-keyword">return</span> (<span class="hljs-string">"["</span> + (handler.map(function (handler) { <span class="hljs-keyword">return</span> genHandler(name, handler); }).<span class="hljs-keyword">join</span>(<span class="hljs-string">','</span>)) + <span class="hljs-string">"]"</span>)
  }

  <span class="hljs-keyword">var</span> isMethodPath = simplePathRE.test(handler.<span class="hljs-keyword">value</span>);
  <span class="hljs-keyword">var</span> isFunctionExpression = fnExpRE.test(handler.<span class="hljs-keyword">value</span>);

  <span class="hljs-keyword">if</span> (!handler.modifiers) {
    <span class="hljs-keyword">return</span> isMethodPath || isFunctionExpression<span class="hljs-comment">//假如没有修饰符。直接返回回调函数</span>
      ? handler.<span class="hljs-keyword">value</span>
      : (<span class="hljs-string">"function($event){"</span> + (handler.<span class="hljs-keyword">value</span>) + <span class="hljs-string">"}"</span>) <span class="hljs-comment">// inline statement</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">var</span> code = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">var</span> genModifierCode = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">var</span> keys = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> handler.modifiers) {
      <span class="hljs-keyword">if</span> (modifierCode[key]) {
        genModifierCode += modifierCode[key];<span class="hljs-comment">//处理修饰符数组，例如.stop就在回调函数里加入event.stopPropagation()再返回。实现修饰的目的</span>
        <span class="hljs-comment">// left/right</span>
        <span class="hljs-keyword">if</span> (keyCodes[key]) {
          keys.push(key);
        }
      } <span class="hljs-keyword">else</span> {
        keys.push(key);
      }
    }
    <span class="hljs-keyword">if</span> (keys.length) {
      code += genKeyFilter(keys);
    }
    <span class="hljs-comment">// Make sure modifiers like prevent and stop get executed after key filtering</span>
    <span class="hljs-keyword">if</span> (genModifierCode) {
      code += genModifierCode;
    }
    <span class="hljs-keyword">var</span> handlerCode = isMethodPath
      ? handler.<span class="hljs-keyword">value</span> + <span class="hljs-string">'($event)'</span>
      : isFunctionExpression
        ? (<span class="hljs-string">"("</span> + (handler.<span class="hljs-keyword">value</span>) + <span class="hljs-string">")($event)"</span>)
        : handler.<span class="hljs-keyword">value</span>;
    <span class="hljs-keyword">return</span> (<span class="hljs-string">"function($event){"</span> + code + handlerCode + <span class="hljs-string">"}"</span>)
  }
}</code></pre>
<p>genHandler函数简单明了，如果事件函数有修饰符。就处理完修饰符，添加修饰符对应的函数语句。再返回。这个过程还会单独对native修饰符做特殊处理。这个等会说。compile完后自然就render。我们看看render函数中这块区域长什么样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_c('div',{attrs:{&quot;id&quot;:&quot;test1&quot;},on:{&quot;click&quot;:click1"}}",[_v(&quot;click1&quot;)]),_v(&quot; &quot;),_c('div',{attrs:{&quot;id&quot;:&quot;test2&quot;},on:{&quot;click&quot;:function($event){$event.stopPropagation();click2($event)"}}"}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code style="word-break: break-word; white-space: initial;">_c(<span class="hljs-string">'div'</span>,{attrs:{<span class="hljs-string">"id"</span>:<span class="hljs-string">"test1"</span>},on:{<span class="hljs-string">"click"</span>:click1"}}",[_v(<span class="hljs-string">"click1"</span>)]),_v(<span class="hljs-string">" "</span>),_c(<span class="hljs-string">'div'</span>,{attrs:{<span class="hljs-string">"id"</span>:<span class="hljs-string">"test2"</span>},on:{<span class="hljs-string">"click"</span>:function($event){$event.stopPropagation();click2($event)"}}"}</code></pre>
<p>一目了然。最后在虚拟dom－》真实dom的时候。会调用核心函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }//此处绑定点击事件
      : capture
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>function add<span class="hljs-variable">$1</span> (
  event,
  handler,
  once$<span class="hljs-variable">$1</span>,
  <span class="hljs-keyword">capture</span>,
  passive
) {
  <span class="hljs-keyword">if</span> (once$<span class="hljs-variable">$1</span>) {
    <span class="hljs-keyword">var</span> oldHandler = handler;
    <span class="hljs-keyword">var</span> _target = target<span class="hljs-variable">$1</span>; <span class="hljs-comment">// save current target element in closure</span>
    handler = function (ev) {
      <span class="hljs-keyword">var</span> res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      <span class="hljs-keyword">if</span> (res !== null) {
        remove<span class="hljs-variable">$2</span>(event, handler, <span class="hljs-keyword">capture</span>, _target);
      }
    };
  }
  target<span class="hljs-variable">$1</span>.addEventListener(
    event,
    handler,
    supportsPassive
      ? { <span class="hljs-keyword">capture</span>: <span class="hljs-keyword">capture</span>, passive: passive }<span class="hljs-comment">//此处绑定点击事件</span>
      : <span class="hljs-keyword">capture</span>
  );
}</code></pre>
<h2 id="articleHeader1">组件上的事件</h2>
<p>好了下面就是接下来的组件上的点击事件了。可以预感到他走的和普通的html元素应该是不同的道路。事实也是如此：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-component v-on:click.native=&quot;nativeclick&quot; v-on:componenton=&quot;parentOn&quot;>
  </my-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">my</span>-component v-<span class="hljs-keyword">on</span>:click.native=<span class="hljs-string">"nativeclick"</span> v-<span class="hljs-keyword">on</span>:componenton=<span class="hljs-string">"parentOn"</span>&gt;
  &lt;/<span class="hljs-keyword">my</span>-component&gt;</code></pre>
<p>最简单的一个例子。两个事件的区别就是一个有.native的修饰符。我们来看看官方.native的作用：在原生dom上绑定事件。好吧。很简单。我们跟随源码看看有何不同。这里可以往回看看我少的可怜的上一章组件机制。vue中的组件都是扩展的vue的一个新实例。在compile结束的时候你还是可以发现他也是类似的一个样子。如下图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_c('my-component',{on:{&quot;componenton&quot;:parentOn},nativeOn:{&quot;click&quot;:function($event){nativeclick($event)"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code style="word-break: break-word; white-space: initial;">_c(<span class="hljs-string">'my-component'</span>,{on:{<span class="hljs-string">"componenton"</span>:parentOn},nativeOn:{<span class="hljs-string">"click"</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">($event)</span></span>{nativeclick($event)"}}"</code></pre>
<p>可以看到加了.native修饰符的会被放入nativeOn的数组中。等待后续特殊处理。等不及了。我们直接来看看特殊处理。render函数在执行时。如果遇到组件。看过上一章的可以知道。会执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn((&quot;Invalid Component definition: &quot; + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      return
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props &amp; events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;//listeners缓存data.on的函数。这里就是componenton事件
  // replace with listeners with .native modifier
  data.on = data.nativeOn;//正常的data.on会被native修饰符的事件所替换

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props &amp; listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    (&quot;vue-component-&quot; + (Ctor.cid) + (name ? (&quot;-&quot; + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>function createComponent (
  Ctor,
  <span class="hljs-built_in">data</span>,
  context,
  children,
  <span class="hljs-built_in">tag</span>
) {
  <span class="hljs-keyword">if</span> (isUndef(Ctor)) {
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-built_in">var</span> baseCtor = context.$options._base;

  <span class="hljs-comment">// plain options object: turn it into a constructor</span>
  <span class="hljs-keyword">if</span> (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  <span class="hljs-comment">// if at this stage it's not a constructor or an async component factory,</span>
  <span class="hljs-comment">// reject.</span>
  <span class="hljs-keyword">if</span> (typeof Ctor !== <span class="hljs-string">'function'</span>) {
    {
      warn((<span class="hljs-string">"Invalid Component definition: "</span> + (<span class="hljs-built_in">String</span>(Ctor))), context);
    }
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// async component</span>
  <span class="hljs-keyword">if</span> (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    <span class="hljs-keyword">if</span> (Ctor === undefined) {
      <span class="hljs-comment">// return nothing if this is indeed an async component</span>
      <span class="hljs-comment">// wait for the callback to trigger parent update.</span>
      <span class="hljs-keyword">return</span>
    }
  }

  <span class="hljs-comment">// resolve constructor options in case global mixins are applied after</span>
  <span class="hljs-comment">// component constructor creation</span>
  resolveConstructorOptions(Ctor);

  <span class="hljs-built_in">data</span> = <span class="hljs-built_in">data</span> || {};

  <span class="hljs-comment">// transform component v-model data into props &amp; events</span>
  <span class="hljs-keyword">if</span> (isDef(<span class="hljs-built_in">data</span>.model)) {
    transformModel(Ctor.options, <span class="hljs-built_in">data</span>);
  }

  <span class="hljs-comment">// extract props</span>
  <span class="hljs-built_in">var</span> propsData = extractPropsFromVNodeData(<span class="hljs-built_in">data</span>, Ctor, <span class="hljs-built_in">tag</span>);

  <span class="hljs-comment">// functional component</span>
  <span class="hljs-keyword">if</span> (isTrue(Ctor.options.functional)) {
    <span class="hljs-keyword">return</span> createFunctionalComponent(Ctor, propsData, <span class="hljs-built_in">data</span>, context, children)
  }

  <span class="hljs-comment">// extract listeners, since these needs to be treated as</span>
  <span class="hljs-comment">// child component listeners instead of DOM listeners</span>
  <span class="hljs-built_in">var</span> listeners = <span class="hljs-built_in">data</span>.<span class="hljs-keyword">on</span>;<span class="hljs-comment">//listeners缓存data.on的函数。这里就是componenton事件</span>
  <span class="hljs-comment">// replace with listeners with .native modifier</span>
  <span class="hljs-built_in">data</span>.<span class="hljs-keyword">on</span> = <span class="hljs-built_in">data</span>.nativeOn;<span class="hljs-comment">//正常的data.on会被native修饰符的事件所替换</span>

  <span class="hljs-keyword">if</span> (isTrue(Ctor.options.abstract)) {
    <span class="hljs-comment">// abstract components do not keep anything</span>
    <span class="hljs-comment">// other than props &amp; listeners</span>
    <span class="hljs-built_in">data</span> = {};
  }

  <span class="hljs-comment">// merge component management hooks onto the placeholder node</span>
  mergeHooks(<span class="hljs-built_in">data</span>);

  <span class="hljs-comment">// return a placeholder vnode</span>
  <span class="hljs-built_in">var</span> name = Ctor.options.name || <span class="hljs-built_in">tag</span>;
  <span class="hljs-built_in">var</span> vnode = <span class="hljs-literal">new</span> VNode(
    (<span class="hljs-string">"vue-component-"</span> + (Ctor.cid) + (name ? (<span class="hljs-string">"-"</span> + name) : <span class="hljs-string">''</span>)),
    <span class="hljs-built_in">data</span>, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, <span class="hljs-built_in">tag</span>: <span class="hljs-built_in">tag</span>, children: children }
  );
  <span class="hljs-keyword">return</span> vnode
}</code></pre>
<p>整段代码关于事件核心操作：</p>
<p>var listeners = data.on;//listeners缓存data.on的函数。这里就是componenton事件<br>  // replace with listeners with .native modifier<br>  data.on = data.nativeOn;//正常的data.on会被native修饰符的事件所替换</p>
<p>经过这两句话。.native修饰符的事件会被放在data.on上面。接下来data.on上的事件（这里就是nativeclick）会按普通的html事件往下走。最后执行target.add('',''')挂上原生的事件。而先前的data.on上的被缓存在listeneners的事件就没着么愉快了。接下来他会在组件init的时候。它会进入一下分支：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initEvents</span> <span class="hljs-params">(vm)</span> </span>{
  vm._events = Object.create(<span class="hljs-keyword">null</span>);
  vm._hasHookEvent = <span class="hljs-keyword">false</span>;
  <span class="hljs-comment">// init parent attached events</span>
  <span class="hljs-keyword">var</span> listeners = vm.$options._parentListeners;
  <span class="hljs-keyword">if</span> (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateComponentListeners</span> <span class="hljs-params">(
  vm,
  listeners,
  oldListeners
)</span> </span>{
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$<span class="hljs-number">1</span>, vm);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span> <span class="hljs-params">(event, fn, once$$<span class="hljs-number">1</span>)</span> </span>{
  <span class="hljs-keyword">if</span> (once$$<span class="hljs-number">1</span>) {
    target.$once(event, fn);
  } <span class="hljs-keyword">else</span> {
    target.$on(event, fn);
  }
}
</code></pre>
<p>发现组件上的没有.native的修饰符调用的是$on方法。这个好熟悉。进入到<code>$on,$emit</code>大致想到是一个典型的观察者模式的事件。看看相关<code>$on,$emit</code>代码。我加点注解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);//存入事件
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

Vue.prototype.$emit = function (event) {
    var vm = this;
    console.log(vm);
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event &amp;&amp; vm._events[lowerCaseEvent]) {
        tip(
          &quot;Event \&quot;&quot; + lowerCaseEvent + &quot;\&quot; is emitted in component &quot; +
          (formatComponentName(vm)) + &quot; but the handler is registered for \&quot;&quot; + event + &quot;\&quot;. &quot; +
          &quot;Note that HTML attributes are case-insensitive and you cannot use &quot; +
          &quot;v-on to listen to camelCase events when using in-DOM templates. &quot; +
          &quot;You should probably use \&quot;&quot; + (hyphenate(event)) + &quot;\&quot; instead of \&quot;&quot; + event + &quot;\&quot;.&quot;
        );
      }
    }
    var cbs = vm._events[event];
    console.log(cbs);
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);／／当emit的时候调用该事件。注意上面说的vue在初始化的守候。用bind修饰了事件函数。所以组件上挂载的事件都是在父作用域中的
      }
    }
    return vm
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>Vue.prototype.$<span class="hljs-keyword">on</span> = function (<span class="hljs-keyword">event</span>, fn) {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">this</span>$<span class="hljs-number">1</span> = <span class="hljs-keyword">this</span>;

    <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">if</span> (Array.isArray(<span class="hljs-keyword">event</span>)) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = <span class="hljs-keyword">event</span>.length; i &lt; l; i++) {
        <span class="hljs-keyword">this</span>$<span class="hljs-number">1.</span>$<span class="hljs-keyword">on</span>(<span class="hljs-keyword">event</span>[i], fn);
      }
    } <span class="hljs-keyword">else</span> {
      (vm._events[<span class="hljs-keyword">event</span>] || (vm._events[<span class="hljs-keyword">event</span>] = [])).push(fn);<span class="hljs-comment">//存入事件</span>
      <span class="hljs-comment">// optimize hook:event cost by using a boolean flag marked at registration</span>
      <span class="hljs-comment">// instead of a hash lookup</span>
      <span class="hljs-keyword">if</span> (hookRE.test(<span class="hljs-keyword">event</span>)) {
        vm._hasHookEvent = <span class="hljs-literal">true</span>;
      }
    }
    <span class="hljs-keyword">return</span> vm
  };

Vue.prototype.$emit = function (<span class="hljs-keyword">event</span>) {
    <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">this</span>;
    console.log(vm);
    {
      <span class="hljs-keyword">var</span> lowerCaseEvent = <span class="hljs-keyword">event</span>.toLowerCase();
      <span class="hljs-keyword">if</span> (lowerCaseEvent !== <span class="hljs-keyword">event</span> &amp;&amp; vm._events[lowerCaseEvent]) {
        tip(
          <span class="hljs-string">"Event \""</span> + lowerCaseEvent + <span class="hljs-string">"\" is emitted in component "</span> +
          (formatComponentName(vm)) + <span class="hljs-string">" but the handler is registered for \""</span> + <span class="hljs-keyword">event</span> + <span class="hljs-string">"\". "</span> +
          <span class="hljs-string">"Note that HTML attributes are case-insensitive and you cannot use "</span> +
          <span class="hljs-string">"v-on to listen to camelCase events when using in-DOM templates. "</span> +
          <span class="hljs-string">"You should probably use \""</span> + (hyphenate(<span class="hljs-keyword">event</span>)) + <span class="hljs-string">"\" instead of \""</span> + <span class="hljs-keyword">event</span> + <span class="hljs-string">"\"."</span>
        );
      }
    }
    <span class="hljs-keyword">var</span> cbs = vm._events[<span class="hljs-keyword">event</span>];
    console.log(cbs);
    <span class="hljs-keyword">if</span> (cbs) {
      cbs = cbs.length &gt; <span class="hljs-number">1</span> ? toArray(cbs) : cbs;
      <span class="hljs-keyword">var</span> args = toArray(arguments, <span class="hljs-number">1</span>);
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = cbs.length; i &lt; l; i++) {
        cbs[i].apply(vm, args);／／当emit的时候调用该事件。注意上面说的vue在初始化的守候。用bind修饰了事件函数。所以组件上挂载的事件都是在父作用域中的
      }
    }
    <span class="hljs-keyword">return</span> vm
  };</code></pre>
<p>看了上面的<span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-1-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-1" role="math" style="width: 1.55em; display: inline-block;"><span style="display: inline-block; position: relative; width: 1.267em; height: 0px; font-size: 121%;"><span style="position: absolute; clip: rect(1.873em, 1001.21em, 2.786em, -1000em); top: -2.479em; left: 0em;"><span class="mrow" id="MathJax-Span-2"><span class="mi" id="MathJax-Span-3" style="font-family: STIXGeneral-Italic;">o</span><span class="mi" id="MathJax-Span-4" style="font-family: STIXGeneral-Italic;">n</span><span class="mo" id="MathJax-Span-5" style="font-family: STIXGeneral-Regular;">,</span></span><span style="display: inline-block; width: 0px; height: 2.479em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.237em; border-left: 0px solid; width: 0px; height: 0.838em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-1">on,</script>emit用法下面这个demo也就瞬间秒解了（一个经常用的非父子组件通信）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bus = new Vue()
// 触发组件 A 中的事件
bus.$emit('id-selected', 1)
// 在组件 B 创建的钩子中监听事件
bus.$on('id-selected', function (id) {
  // ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> Vue()
<span class="hljs-comment">// 触发组件 A 中的事件</span>
bus.$emit(<span class="hljs-string">'id-selected'</span>, <span class="hljs-number">1</span>)
<span class="hljs-comment">// 在组件 B 创建的钩子中监听事件</span>
bus.$on(<span class="hljs-string">'id-selected'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(id)</span> </span>{
  <span class="hljs-comment">// ...</span>
})</code></pre>
<p>是不是豁然开朗。</p>
<p>又到了愉快的总结时间了。segementfault的编辑器真难用。内容多就卡。哎。烦。卡的时间够看好多肥皂剧了。<br>总的来说。vue对于事件有两个底层的处理逻辑。<br>1:普通html元素和在组件上挂了.native修饰符的事件。最终EventTarget.addEventListener() 挂载事件<br>2:组件上的，vue实例上的事件会调用原型上的<code>$on,$emit</code>（包括一些其他api <code>$off,$once</code>等等）</p>
<p>荆轲刺秦王。下次见</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue源码解析－事件机制

## 原文链接
[https://segmentfault.com/a/1190000009750348](https://segmentfault.com/a/1190000009750348)

