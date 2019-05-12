---
title: '从vue源码来看Proxy的用途' 
date: 2019-01-27 2:30:59
hidden: true
slug: ohqta45t29
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">从vue源码来看Proxy的用途</h1>
<p>The Proxy object is used to define custom behavior for fundamental operations (e.g. property lookup, assignment, enumeration, function invocation, etc).<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy" rel="nofollow noreferrer" target="_blank">MDN Proxy</a></p>
<hr>
<p>MDN表述该对象构造器是用于对某对象定义用户自定义行为的。那么，这到底是什么意思呢？我们下面直接来分析一下Vue源码中应用到Proxy对象的地方，来理解该对象构造器的作用。</p>
<h3 id="articleHeader1">Proxy在Vue中的应用</h3>
<p>首先我们来看一看<a href="https://github.com/vuejs/vue/blob/dev/dist/vue.js#L1430" rel="nofollow noreferrer" target="_blank">Vue源码的 1430行</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* not type checking this file because flow doesn't play well with Proxy */

  var initProxy;

  {
    var allowedGlobals = makeMap(
      'Infinity,undefined,NaN,isFinite,isNaN,' +
      'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
      'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
      'require' // for Webpack/Browserify
    );

    var warnNonPresent = function(target, key) {
      warn(
        &quot;Property or method \&quot;&quot; + key + &quot;\&quot; is not defined on the instance but &quot; +
        &quot;referenced during render. Make sure to declare reactive data &quot; +
        &quot;properties in the data option.&quot;,
        target
      );
    };

    var hasProxy = typeof Proxy !== 'undefined' &amp;&amp;
    Proxy.toString().match(/native code/);

    if (hasProxy) {
      var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
      config.keyCodes = new Proxy(config.keyCodes, {
        set: function set(target, key, value) {
          if (isBuiltInModifier(key)) {
            warn((&quot;Avoid overwriting built-in modifier in config.keyCodes: .&quot; + key));
            return false
          } else {
            target[key] = value;
            return true
          }
        }
      });
    }

    var hasHandler = {
      has: function has(target, key) {
        var has = key in target;
        var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
        if (!has &amp;&amp; !isAllowed) {
          warnNonPresent(target, key);
        }
        return has || !isAllowed
      }
    };

    var getHandler = {
      get: function get(target, key) {
        if (typeof key === 'string' &amp;&amp; !(key in target)) {
          warnNonPresent(target, key);
        }
        return target[key]
      }
    };

    initProxy = function initProxy(vm) {
      if (hasProxy) {
        // determine which proxy handler to use
        var options = vm.$options;
        var handlers = options.render &amp;&amp; options.render._withStripped
          ? getHandler
          : hasHandler;
        vm._renderProxy = new Proxy(vm, handlers);
      } else {
        vm._renderProxy = vm;
      }
    };
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* not type checking this file because flow doesn't play well with Proxy */</span>

  <span class="hljs-keyword">var</span> initProxy;

  {
    <span class="hljs-keyword">var</span> allowedGlobals = makeMap(
      <span class="hljs-string">'Infinity,undefined,NaN,isFinite,isNaN,'</span> +
      <span class="hljs-string">'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,'</span> +
      <span class="hljs-string">'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,'</span> +
      <span class="hljs-string">'require'</span> <span class="hljs-comment">// for Webpack/Browserify</span>
    );

    <span class="hljs-keyword">var</span> warnNonPresent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target, key</span>) </span>{
      warn(
        <span class="hljs-string">"Property or method \""</span> + key + <span class="hljs-string">"\" is not defined on the instance but "</span> +
        <span class="hljs-string">"referenced during render. Make sure to declare reactive data "</span> +
        <span class="hljs-string">"properties in the data option."</span>,
        target
      );
    };

    <span class="hljs-keyword">var</span> hasProxy = <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Proxy</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp;
    <span class="hljs-built_in">Proxy</span>.toString().match(<span class="hljs-regexp">/native code/</span>);

    <span class="hljs-keyword">if</span> (hasProxy) {
      <span class="hljs-keyword">var</span> isBuiltInModifier = makeMap(<span class="hljs-string">'stop,prevent,self,ctrl,shift,alt,meta'</span>);
      config.keyCodes = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(config.keyCodes, {
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">set</span>(<span class="hljs-params">target, key, value</span>) </span>{
          <span class="hljs-keyword">if</span> (isBuiltInModifier(key)) {
            warn((<span class="hljs-string">"Avoid overwriting built-in modifier in config.keyCodes: ."</span> + key));
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
          } <span class="hljs-keyword">else</span> {
            target[key] = value;
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
          }
        }
      });
    }

    <span class="hljs-keyword">var</span> hasHandler = {
      <span class="hljs-attr">has</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">has</span>(<span class="hljs-params">target, key</span>) </span>{
        <span class="hljs-keyword">var</span> has = key <span class="hljs-keyword">in</span> target;
        <span class="hljs-keyword">var</span> isAllowed = allowedGlobals(key) || key.charAt(<span class="hljs-number">0</span>) === <span class="hljs-string">'_'</span>;
        <span class="hljs-keyword">if</span> (!has &amp;&amp; !isAllowed) {
          warnNonPresent(target, key);
        }
        <span class="hljs-keyword">return</span> has || !isAllowed
      }
    };

    <span class="hljs-keyword">var</span> getHandler = {
      <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params">target, key</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> key === <span class="hljs-string">'string'</span> &amp;&amp; !(key <span class="hljs-keyword">in</span> target)) {
          warnNonPresent(target, key);
        }
        <span class="hljs-keyword">return</span> target[key]
      }
    };

    initProxy = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initProxy</span>(<span class="hljs-params">vm</span>) </span>{
      <span class="hljs-keyword">if</span> (hasProxy) {
        <span class="hljs-comment">// determine which proxy handler to use</span>
        <span class="hljs-keyword">var</span> options = vm.$options;
        <span class="hljs-keyword">var</span> handlers = options.render &amp;&amp; options.render._withStripped
          ? getHandler
          : hasHandler;
        vm._renderProxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(vm, handlers);
      } <span class="hljs-keyword">else</span> {
        vm._renderProxy = vm;
      }
    };
  }</code></pre>
<p>首先，我们要明白一件事情，vue放弃了对ie9以下的支持。即使这样，由于Proxy作为一个es6的新特性，支持度依然不高，作者也只是尝试着使用了一下。下面我们来一步一步讲解。</p>
<h4>源码讲解</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var allowedGlobals = makeMap(
      'Infinity,undefined,NaN,isFinite,isNaN,' +
      'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
      'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
      'require' // for Webpack/Browserify
    );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-keyword">var</span> allowedGlobals = makeMap(
      <span class="hljs-string">'Infinity,undefined,NaN,isFinite,isNaN,'</span> +
      <span class="hljs-string">'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,'</span> +
      <span class="hljs-string">'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,'</span> +
      <span class="hljs-string">'require'</span> <span class="hljs-comment">// for Webpack/Browserify</span>
    );</code></pre>
<p>该处定义了所允许的全局对象类型。</p>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var warnNonPresent = function(target, key) {
      warn(
        &quot;Property or method \&quot;&quot; + key + &quot;\&quot; is not defined on the instance but &quot; +
        &quot;referenced during render. Make sure to declare reactive data &quot; +
        &quot;properties in the data option.&quot;,
        target
      );
 };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> warnNonPresent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target, key</span>) </span>{
      warn(
        <span class="hljs-string">"Property or method \""</span> + key + <span class="hljs-string">"\" is not defined on the instance but "</span> +
        <span class="hljs-string">"referenced during render. Make sure to declare reactive data "</span> +
        <span class="hljs-string">"properties in the data option."</span>,
        target
      );
 };</code></pre>
<p>该处定义了一个报警方法，传入键名或方法名，log显示一条警告</p>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var hasProxy = typeof Proxy !== 'undefined' &amp;&amp;
    Proxy.toString().match(/native code/);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-keyword">var</span> hasProxy = <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Proxy</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp;
    <span class="hljs-built_in">Proxy</span>.toString().match(<span class="hljs-regexp">/native code/</span>);</code></pre>
<p>该处是对es6特性Proxy的检测， 其检测手段是确认Proxy是原生实现并未被用户代码所覆盖。</p>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
        set: function set(target, key, value) {
          if (isBuiltInModifier(key)) {
            warn((&quot;Avoid overwriting built-in modifier in config.keyCodes: .&quot; + key));
            return false
          } else {
            target[key] = value;
            return true
          }
        }
      });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">var</span> isBuiltInModifier = makeMap(<span class="hljs-string">'stop,prevent,self,ctrl,shift,alt,meta'</span>);
    config.keyCodes = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(config.keyCodes, {
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">set</span>(<span class="hljs-params">target, key, value</span>) </span>{
          <span class="hljs-keyword">if</span> (isBuiltInModifier(key)) {
            warn((<span class="hljs-string">"Avoid overwriting built-in modifier in config.keyCodes: ."</span> + key));
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
          } <span class="hljs-keyword">else</span> {
            target[key] = value;
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
          }
        }
      });</code></pre>
<p>该段代码对config.keyCodes对象进行了代理，其意义在于禁止用户修改Vue内建的一些按键值，这些按键值和按键名是对应的。如果用过Vue的用户应该知道，Vue在事件对象上对一些常用按键和常用操作进行了内建（这个内建过程被用eval函数压缩了，由一堆代码段构成的，没什么看头），作者肯定不希望也不允许用户修改配置的时候覆盖了内建内容。于是，当我们做config.keyCodes['stop'] = xxx这样的操作的时候,Vue就会告诉你说“你这个人，不老实，为什么想着改我东西”，直接打出禁止改写内建配置的警告。如果非内建内容，那么可以直接设置上。</p>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    initProxy = function initProxy(vm) {
      if (hasProxy) {
        // determine which proxy handler to use
        var options = vm.$options;
        var handlers = options.render &amp;&amp; options.render._withStripped
          ? getHandler
          : hasHandler;
        vm._renderProxy = new Proxy(vm, handlers);
      } else {
        vm._renderProxy = vm;
      }
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    initProxy = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initProxy</span>(<span class="hljs-params">vm</span>) </span>{
      <span class="hljs-keyword">if</span> (hasProxy) {
        <span class="hljs-comment">// determine which proxy handler to use</span>
        <span class="hljs-keyword">var</span> options = vm.$options;
        <span class="hljs-keyword">var</span> handlers = options.render &amp;&amp; options.render._withStripped
          ? getHandler
          : hasHandler;
        vm._renderProxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(vm, handlers);
      } <span class="hljs-keyword">else</span> {
        vm._renderProxy = vm;
      }
    };</code></pre>
<p>这句话就不再解释了，类似上面。不过读者可能会问has是什么？ 那么下面我们来讲解一下Proxy的各个参数</p>
<h3 id="articleHeader2">Proxy所需参数</h3>
<p>两个, var b = new Proxy(a, { has: fn xxx, get: fn xxx, set: fn xxx .... })</p>
<blockquote>
<p>target 被代理的对象</p>
<p>handler 处理器对象</p>
<blockquote><p>用来定义我们对该对象的各种操作</p></blockquote>
</blockquote>
<p>完整的handler处理器对象内容:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    get: '咋获取',
    set: '咋设置',
    deleteProperty: '咋删除',
    enumerate: '咋枚举',
    ownKeys: '咋获取所有该对象的属性键 ',
    has: '问你有没有, 比如 &quot;xxx&quot; in target',
    defineProperty: '如何defineProperty， 这个我们也是可以代理的',
    getOwnPropertyDescriptor: '获取属性描述的代理',
    getPrototypeOf: '找原型时候的代理',
    setPrototypeOf: '设置对象原型的时候的代理',
    isExtensible: '判断对象是否可扩展的时候的代理',
    preventExtensions: '设置阻止对象扩展的时候的代理',
    apply: '执行调用操作的时候的代理',
    construct: '执行实例化的时候的代理'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">get</span>: <span class="hljs-string">'咋获取'</span>,
    <span class="hljs-attr">set</span>: <span class="hljs-string">'咋设置'</span>,
    <span class="hljs-attr">deleteProperty</span>: <span class="hljs-string">'咋删除'</span>,
    <span class="hljs-attr">enumerate</span>: <span class="hljs-string">'咋枚举'</span>,
    <span class="hljs-attr">ownKeys</span>: <span class="hljs-string">'咋获取所有该对象的属性键 '</span>,
    <span class="hljs-attr">has</span>: <span class="hljs-string">'问你有没有, 比如 "xxx" in target'</span>,
    <span class="hljs-attr">defineProperty</span>: <span class="hljs-string">'如何defineProperty， 这个我们也是可以代理的'</span>,
    <span class="hljs-attr">getOwnPropertyDescriptor</span>: <span class="hljs-string">'获取属性描述的代理'</span>,
    <span class="hljs-attr">getPrototypeOf</span>: <span class="hljs-string">'找原型时候的代理'</span>,
    <span class="hljs-attr">setPrototypeOf</span>: <span class="hljs-string">'设置对象原型的时候的代理'</span>,
    <span class="hljs-attr">isExtensible</span>: <span class="hljs-string">'判断对象是否可扩展的时候的代理'</span>,
    <span class="hljs-attr">preventExtensions</span>: <span class="hljs-string">'设置阻止对象扩展的时候的代理'</span>,
    <span class="hljs-attr">apply</span>: <span class="hljs-string">'执行调用操作的时候的代理'</span>,
    <span class="hljs-attr">construct</span>: <span class="hljs-string">'执行实例化的时候的代理'</span>
}</code></pre>
<p>以上皆是函数~~</p>
<h3 id="articleHeader3">所以Proxy的作用是?</h3>
<p>拦截，预警，上报，扩展功能，统计，强化对象...能想得到的都能沾到点边，这里Vue的代码主要将代理运用于拦截。并且由于规范依然在发展，所以大家慎用。。。</p>
<h3 id="articleHeader4">资料</h3>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy" rel="nofollow noreferrer" target="_blank">MDN js Proxy Object</a></p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler" rel="nofollow noreferrer" target="_blank">MDN Proxy Handler</a></p>
<p><a href="http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots" rel="nofollow noreferrer" target="_blank">sec-proxy-object-internal-methods-and-internal-slots</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从vue源码来看Proxy的用途

## 原文链接
[https://segmentfault.com/a/1190000008303003](https://segmentfault.com/a/1190000008303003)

