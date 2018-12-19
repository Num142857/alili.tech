---
title: '每个人都能实现的vue自定义指令' 
date: 2018-12-20 2:30:10
hidden: true
slug: ro77qxxedqc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前文</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  先来bb一堆废话哈哈..
  
  用vue做项目也有一年多了.除了用别人的插件之外.自己也没尝试去封装指令插件之类的东西来用.
  
  刚好最近在项目中遇到一个问题.(快速点击按钮多次触发多次绑定的方法),于是就想说自己封装一个 
  自定义指令来解决这个问题,于是便有了自己的第一个vue自定义指令 vue-reclick . 
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code>  先来bb一堆废话哈哈..
  
  用vue做项目也有一年多了.除了用别人的插件之外.自己也没尝试去封装指令插件之类的东西来用.
  
  刚好最近在项目中遇到一个问题.(快速点击按钮多次触发多次绑定的方法),于是就想说自己封装一个 
  自定义指令来解决这个问题,于是便有了自己的第一个vue自定义指令 vue-reclick . 
 </code></pre>
<p><a href="https://github.com/webfansplz/vue-reclick" rel="nofollow noreferrer" target="_blank">vue-reclick</a>  传送门</p>
<p>哈哈,好了!广告打完了,开始进入正题(等一下,听说star有奖哦)...</p>
<h2 id="articleHeader1">1.使用场景</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 在vue 2.0中,有的情况下,你需要对普通DOM元素进行底层操作，这时候就需要用到自定义指令!   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"> 在<span class="hljs-selector-tag">vue</span> 2<span class="hljs-selector-class">.0</span>中,有的情况下,你需要对普通<span class="hljs-selector-tag">DOM</span>元素进行底层操作，这时候就需要用到自定义指令!   </code></pre>
<h2 id="articleHeader2">2.api详解</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 其实关于vue自定义指令的使用 vue官方文档已经说的非常清楚.这里只是简单的照搬,哦不,讲一下 (23333..).." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"> 其实关于vue自定义指令的使用 vue官方文档已经说的非常清楚.这里只是简单的照搬,哦不,讲一下 (<span class="hljs-number">23333.</span>.)..</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1.首先创建一个指令自定义对象directObj。
 
 let directObj = {}.
 
 2.vue为所有指令的钩子函数都提供一些函数参数。
    
 let args = {
  el:'指令所绑定的元素，可以用来直接操作 DOM ',
  binding:{
   name:'指令名，不包括 v- 前缀。',
   value:'指令的绑定值，例如：v-my-directive=&quot;1 + 1&quot; 中，绑定值为 2。',
   oldValue:'指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。',
   expression:&quot;字符串形式的指令表达式。例如 v-my-directive=&quot;1 + 1&quot; 中，表达式为 &quot;1 + 1&quot;&quot;,
   arg：&quot;传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 &quot;foo&quot;&quot;,
   modifiers:&quot;一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。&quot;,
   vnode:&quot;Vue 编译生成的虚拟节点。&quot;,
   oldVnode:&quot;上一个虚拟节点&quot;
  }
 }
 
 3.在directObj上可根据需要定义一些钩子函数
 
 directObj.bind = function({...args }){
 
     //只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
 } 
 
 directObj.inserted= function({...args }){
 
     //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
 } 

 directObj.update= function({...args }){
 
     //所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
     指令的值可能发生了改变，也可能没有。 
     但是你可以通过比较更新前后的值来忽略不必要的模板更新 
 }

 directObj.componentUpdated= function({...args }){
 
     //指令所在组件的 VNode 及其子 VNode 全部更新后调用。
 }
 
 directObj.unbind= function({...args }){
 
     //只调用一次，指令与元素解绑时调用。
 }

 4.注册自定义指令
  (1).全局注册:
  
      Vue.directive('指令名称','指令对象');
      例:Vue.directive('reclick',directObj);
      注意:全局注册自定义指令需在实例化Vue之前.
    
  (2).局部(组件)注册:
  
      export default{ 
       directives:{
         '指令名称':'指令配置'
       }
      }
      
      例:
      
        export default{ 
       directives:{
         'reclick':directObj
       }
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-number">1.</span>首先创建一个指令自定义对象directObj。
 
 let directObj = {}.
 
 <span class="hljs-number">2.</span>vue为所有指令的钩子函数都提供一些函数参数。
    
 let args = {
  el:<span class="hljs-string">'指令所绑定的元素，可以用来直接操作 DOM '</span>,
  binding:{
   name:<span class="hljs-string">'指令名，不包括 v- 前缀。'</span>,
   value:<span class="hljs-string">'指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。'</span>,
   oldValue:<span class="hljs-string">'指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。'</span>,
   expression:<span class="hljs-string">"字符串形式的指令表达式。例如 v-my-directive="</span><span class="hljs-number">1</span> + <span class="hljs-number">1</span><span class="hljs-string">" 中，表达式为 "</span><span class="hljs-number">1</span> + <span class="hljs-number">1</span><span class="hljs-string">""</span>,
   arg：<span class="hljs-string">"传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "</span>foo<span class="hljs-string">""</span>,
   modifiers:<span class="hljs-string">"一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。"</span>,
   vnode:<span class="hljs-string">"Vue 编译生成的虚拟节点。"</span>,
   oldVnode:<span class="hljs-string">"上一个虚拟节点"</span>
  }
 }
 
 <span class="hljs-number">3.</span>在directObj上可根据需要定义一些钩子函数
 
 directObj.bind = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">({<span class="hljs-rest_arg">...args</span> })</span></span>{
 
     <span class="hljs-comment">//只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。</span>
 } 
 
 directObj.inserted= <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">({<span class="hljs-rest_arg">...args</span> })</span></span>{
 
     <span class="hljs-comment">//被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。</span>
 } 

 directObj.update= <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">({<span class="hljs-rest_arg">...args</span> })</span></span>{
 
     <span class="hljs-comment">//所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。</span>
     指令的值可能发生了改变，也可能没有。 
     但是你可以通过比较更新前后的值来忽略不必要的模板更新 
 }

 directObj.componentUpdated= <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">({<span class="hljs-rest_arg">...args</span> })</span></span>{
 
     <span class="hljs-comment">//指令所在组件的 VNode 及其子 VNode 全部更新后调用。</span>
 }
 
 directObj.unbind= <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">({<span class="hljs-rest_arg">...args</span> })</span></span>{
 
     <span class="hljs-comment">//只调用一次，指令与元素解绑时调用。</span>
 }

 <span class="hljs-number">4.</span>注册自定义指令
  (<span class="hljs-number">1</span>).全局注册:
  
      Vue.directive(<span class="hljs-string">'指令名称'</span>,<span class="hljs-string">'指令对象'</span>);
      例:Vue.directive(<span class="hljs-string">'reclick'</span>,directObj);
      注意:全局注册自定义指令需在实例化Vue之前.
    
  (<span class="hljs-number">2</span>).局部(组件)注册:
  
      export <span class="hljs-keyword">default</span>{ 
       directives:{
         <span class="hljs-string">'指令名称'</span>:<span class="hljs-string">'指令配置'</span>
       }
      }
      
      例:
      
        export <span class="hljs-keyword">default</span>{ 
       directives:{
         <span class="hljs-string">'reclick'</span>:directObj
       }
      }</code></pre>
<h2 id="articleHeader3">3.封装自定义指令</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 好了,简单的讲(抄)完 自定义指令相关的api,接下来我们通过vue-reclick来简单的讲解一下如何封装一个vue自定义指令吧.

 由于vue-reclick 只是用来解决一个问题的小东西,所以代码也相对简单,这里主要讲一个封装自定义指令的过程.
    
 下面我们先来看下vue-reclick的源码:" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code> 好了,简单的讲(抄)完 自定义指令相关的api,接下来我们通过vue-reclick来简单的讲解一下如何封装一个vue自定义指令吧.

 由于vue-reclick 只是用来解决一个问题的小东西,所以代码也相对简单,这里主要讲一个封装自定义指令的过程.
    
 下面我们先来看下vue-reclick的源码:</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" ;(function() {
  /**
   * 函数防抖
   *
   * @param {any} method 方法名
   */
  function debounce(method) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function() {
      method.call();
    }, 200);
  }
  /**
   * 事件绑定
   *
   * @param {any} element  绑定dom
   * @param {any} event    事件类型
   * @param {any} listener 方法
   */
  function addEvent(element, event, listener) {
    if (element.addEventListener) {
      element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + event, listener);
    } else {
      element['on' + event] = listener;
    }
  }
  var vueReclick = {};
  var reclick = {
    bind: function(el, binding) {
      addEvent(el, 'click', function() {
        debounce(binding.value);
      });
    },
    unbind: function(el) {
      addEvent(el, 'click', function() {});
    }
  };

  vueReclick.install = function(Vue) {
    Vue.directive('reclick', reclick);
  };

  if (typeof exports == 'object') {
    module.exports = vueReclick;
  } else if (typeof define == 'function' &amp;&amp; define.amd) {
    define([], function() {
      return vueReclick;
    });
  } else if (window.Vue) {
    window.vueReclick = vueReclick;
    Vue.use(vueReclick);
  }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> ;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">/**
   * 函数防抖
   *
   * @param {any} method 方法名
   */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">method</span>) </span>{
    clearTimeout(method.tId);
    method.tId = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      method.call();
    }, <span class="hljs-number">200</span>);
  }
  <span class="hljs-comment">/**
   * 事件绑定
   *
   * @param {any} element  绑定dom
   * @param {any} event    事件类型
   * @param {any} listener 方法
   */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addEvent</span>(<span class="hljs-params">element, event, listener</span>) </span>{
    <span class="hljs-keyword">if</span> (element.addEventListener) {
      element.addEventListener(event, listener, <span class="hljs-literal">false</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.attachEvent) {
      element.attachEvent(<span class="hljs-string">'on'</span> + event, listener);
    } <span class="hljs-keyword">else</span> {
      element[<span class="hljs-string">'on'</span> + event] = listener;
    }
  }
  <span class="hljs-keyword">var</span> vueReclick = {};
  <span class="hljs-keyword">var</span> reclick = {
    <span class="hljs-attr">bind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el, binding</span>) </span>{
      addEvent(el, <span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        debounce(binding.value);
      });
    },
    <span class="hljs-attr">unbind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>) </span>{
      addEvent(el, <span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{});
    }
  };

  vueReclick.install = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>) </span>{
    Vue.directive(<span class="hljs-string">'reclick'</span>, reclick);
  };

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> exports == <span class="hljs-string">'object'</span>) {
    <span class="hljs-built_in">module</span>.exports = vueReclick;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define == <span class="hljs-string">'function'</span> &amp;&amp; define.amd) {
    define([], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> vueReclick;
    });
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.Vue) {
    <span class="hljs-built_in">window</span>.vueReclick = vueReclick;
    Vue.use(vueReclick);
  }
})();</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.将所有代码包裹在一个立即执行函数之中.

  立即执行函数有自己的作用域,可以避免变量冲突与污染.    
  
  将独立的功能封装在自包含模块中.  

2.vue-reclick功能相关的代码这里简单说明下.

  这里封装了两个方法(1.throttle,2.addEvent)
    
  一个指令配置对象(reclick)

  在reclick对象里定义了bind方法,在指令绑定到dom的时候,在dom上绑定点击事件,并获取指令绑定的方法名称.
  在触发点击事件的时候通过函数节流的方法来调用该方法,从而解决短时间快速点击触发多次方法的问题.
    
  在reclick对象里定义了unbind方法,在指令与dom解绑的时候,将传入方法与dom进行解绑..

3.定义一个vueReclick插件对象,并在该对象上定义一个install方法.

(Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器)

4.在install方法里全局注册指令

 vueReclick.install = function(Vue) {
    Vue.directive('reclick', reclick);
 };
 
5.兼容多种模块规范暴露该插件

  if (typeof exports == 'object') {
    module.exports = vueReclick;
  } else if (typeof define == 'function' &amp;&amp; define.amd) {
    define([], function() {
      return vueReclick;
    });
  } else if (window.Vue) {
    window.vueReclick = vueReclick;
    Vue.use(vueReclick);
  }

6.到这一步,其实一个简单的自定义组件就已经大功告成了.

7.最后.我们来讲一下如何在项目中引入vueReclick并使用.

  (1).非node环境中
      
    在第5点我们在else if(window.Vue)中其实已经Vue的全局方法来使用该插件.
    所以我们可以直接在项目中使用该指令.
    例:https://github.com/webfansplz/vue-reclick/blob/master/example/index.html

  (2).node环境中

    我们可以在项目入口文件中引入该插件,然后全局使用它,下面我们会讲解如何将插件发布到Npm.
    例:
    import vueReclick from 'vue-reclick';
    Vue.use(vueReclick);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1.</span>将所有代码包裹在一个立即执行函数之中.

  立即执行函数有自己的作用域,可以避免变量冲突与污染.    
  
  将独立的功能封装在自包含模块中.  

<span class="hljs-number">2.</span>vue-reclick功能相关的代码这里简单说明下.

  这里封装了两个方法(<span class="hljs-number">1.</span>throttle,<span class="hljs-number">2.</span>addEvent)
    
  一个指令配置对象(reclick)

  在reclick对象里定义了bind方法,在指令绑定到dom的时候,在dom上绑定点击事件,并获取指令绑定的方法名称.
  在触发点击事件的时候通过函数节流的方法来调用该方法,从而解决短时间快速点击触发多次方法的问题.
    
  在reclick对象里定义了unbind方法,在指令与dom解绑的时候,将传入方法与dom进行解绑..

<span class="hljs-number">3.</span>定义一个vueReclick插件对象,并在该对象上定义一个install方法.

(Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器)

<span class="hljs-number">4.</span>在install方法里全局注册指令

 vueReclick.install = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>) </span>{
    Vue.directive(<span class="hljs-string">'reclick'</span>, reclick);
 };
 
<span class="hljs-number">5.</span>兼容多种模块规范暴露该插件

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> exports == <span class="hljs-string">'object'</span>) {
    <span class="hljs-built_in">module</span>.exports = vueReclick;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define == <span class="hljs-string">'function'</span> &amp;&amp; define.amd) {
    define([], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> vueReclick;
    });
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.Vue) {
    <span class="hljs-built_in">window</span>.vueReclick = vueReclick;
    Vue.use(vueReclick);
  }

<span class="hljs-number">6.</span>到这一步,其实一个简单的自定义组件就已经大功告成了.

<span class="hljs-number">7.</span>最后.我们来讲一下如何在项目中引入vueReclick并使用.

  (<span class="hljs-number">1</span>).非node环境中
      
    在第<span class="hljs-number">5</span>点我们在<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.Vue)中其实已经Vue的全局方法来使用该插件.
    所以我们可以直接在项目中使用该指令.
    例:https:<span class="hljs-comment">//github.com/webfansplz/vue-reclick/blob/master/example/index.html</span>

  (<span class="hljs-number">2</span>).node环境中

    我们可以在项目入口文件中引入该插件,然后全局使用它,下面我们会讲解如何将插件发布到Npm.
    例:
    <span class="hljs-keyword">import</span> vueReclick <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-reclick'</span>;
    Vue.use(vueReclick);</code></pre>
<h2 id="articleHeader4">4.将封装好的插件发布到npm.</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.在Npm官网注册一个账号

2.在项目目录下 使用npm login 登录. 

3.在项目目录下 使用npm publish 上传插件

4.大功告成,这样以后我们在所有项目中就都可以使用npm install 来下载我们自己封装好的插件啦!." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>在Npm官网注册一个账号

<span class="hljs-number">2.</span>在项目目录下 使用npm login 登录. 

<span class="hljs-number">3.</span>在项目目录下 使用npm publish 上传插件

<span class="hljs-number">4.</span>大功告成,这样以后我们在所有项目中就都可以使用npm install 来下载我们自己封装好的插件啦!.</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
每个人都能实现的vue自定义指令

## 原文链接
[https://segmentfault.com/a/1190000012566413](https://segmentfault.com/a/1190000012566413)

