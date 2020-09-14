---
title: 'vue.js 可复用性&组合- 混合 - 自定义指令 - 插件 基础' 
date: 2019-01-01 2:30:07
hidden: true
slug: 8kxucvgl4z
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue的复用性与组合</h1>
<h2 id="articleHeader1">混合</h2>
<p>混合 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混合对象可以包含任意组件选项。以组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.extend()用以创建没有挂载的的子类,可以使用该子累创建多个实例
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>Vue.<span class="hljs-keyword">extend</span>()用以创建没有挂载的的子类,可以使用该子累创建多个实例
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[javascript] view plain copy

var Profile = Vue.extend({  
             template: '<p>"{{"firstName"}}" "{{"lastName"}}" aka "{{"alias"}}"</p>',  
             data: function () {  
               return {  
                 firstName: 'Walter',  
                 lastName: 'White',  
                 alias: 'Heisenberg'  
               }  
             }  
           })  
           // 创建 Profile 实例，并挂载到一个元素上。  
           new Profile().$mount('#mount-point') " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[javascript] view plain copy

<span class="hljs-keyword">var</span> Profile = Vue.extend({  
             <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;p&gt;"{{"firstName"}}" "{{"lastName"}}" aka "{{"alias"}}"&lt;/p&gt;'</span>,  
             <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  
               <span class="hljs-keyword">return</span> {  
                 <span class="hljs-attr">firstName</span>: <span class="hljs-string">'Walter'</span>,  
                 <span class="hljs-attr">lastName</span>: <span class="hljs-string">'White'</span>,  
                 <span class="hljs-attr">alias</span>: <span class="hljs-string">'Heisenberg'</span>  
               }  
             }  
           })  
           <span class="hljs-comment">// 创建 Profile 实例，并挂载到一个元素上。  </span>
           <span class="hljs-keyword">new</span> Profile().$mount(<span class="hljs-string">'#mount-point'</span>) </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mixins 将两个的对象的混合为一个数组，彼此都可以被调用,下面为演示代码及其结果

当对象键值对 键名冲突时，保留非mixin对象的键值对
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs d"><code>mixins 将两个的对象的混合为一个数组，彼此都可以被调用,下面为演示代码及其结果

当对象键值对 键名冲突时，保留非<span class="hljs-keyword">mixin</span>对象的键值对
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;></div>  
       <script>  
           var myMixin={  
               template:'<h1>holle mixin</h1>',  
               methods:{  
                   hello:function(){  
                       console.log('this is mixin')  
                   },  
                   say:function(){  
                       console.log('I am mixin')  
                   }  
               }  
           };  
  
           var Component=Vue.extend({  
               mixins:[myMixin],  
               methods:{  
                   lsit:function(){  
                       console.log('I am lsit')  
                   },  
                   say:function(){  
                        console.log('I am mixin say')  
                   }  
               }  
  
           });  
           var newcom=new Component().$mount('#app')  
           newcom.hello();  
           newcom.lsit();  
           newcom.say();  
       </script>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div id=<span class="hljs-string">"app"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>  
       &lt;script&gt;  
           <span class="hljs-keyword">var</span> myMixin={  
               <span class="hljs-attr">template</span>:<span class="hljs-string">'&lt;h1&gt;holle mixin&lt;/h1&gt;'</span>,  
               <span class="hljs-attr">methods</span>:{  
                   <span class="hljs-attr">hello</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{  
                       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this is mixin'</span>)  
                   },  
                   <span class="hljs-attr">say</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{  
                       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am mixin'</span>)  
                   }  
               }  
           };  
  
           <span class="hljs-keyword">var</span> Component=Vue.extend({  
               <span class="hljs-attr">mixins</span>:[myMixin],  
               <span class="hljs-attr">methods</span>:{  
                   <span class="hljs-attr">lsit</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{  
                       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am lsit'</span>)  
                   },  
                   <span class="hljs-attr">say</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{  
                        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am mixin say'</span>)  
                   }  
               }  
  
           });  
           <span class="hljs-keyword">var</span> newcom=<span class="hljs-keyword">new</span> Component().$mount(<span class="hljs-string">'#app'</span>)  
           newcom.hello();  
           newcom.lsit();  
           newcom.say();  
       <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>  </code></pre>
<h2 id="articleHeader2">全局混合</h2>
<p>也可以全局注册混合对象。 注意使用！ 一旦使用全局混合对象，将会影响到 所有 之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})
new Vue({
  myOption: 'hello!'
})
// => &quot;hello!&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 为自定义的选项 'myOption' 注入一个处理器。</span>
Vue.mixin({
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> myOption = <span class="hljs-keyword">this</span>.$options.myOption
    <span class="hljs-keyword">if</span> (myOption) {
      <span class="hljs-built_in">console</span>.log(myOption)
    }
  }
})
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">myOption</span>: <span class="hljs-string">'hello!'</span>
})
<span class="hljs-comment">// =&gt; "hello!"</span></code></pre>
<p>谨慎使用全局混合对象，因为会影响到每个单独创建的 Vue 实例（包括第三方模板）。大多数情况下，只应当应用于自定义选项，就像上面示例一样。 也可以将其用作 Plugins 以避免产生重复应用</p>
<h1 id="articleHeader3">自定义指令</h1>
<p>Vue.js 允许你注册自定义指令，实质上是让你教 Vue 一些新技巧：怎样将数据的变化映射到 DOM 的行为。你可以使用Vue.directive(id, definition)的方法传入指令id和定义对象来注册一个全局自定义指令。定义对象需要提供一些钩子函数（全部可选）：</p>
<ul>
<li><p>bind: 仅调用一次，当指令第一次绑定元素的时候。</p></li>
<li><p>update: 第一次是紧跟在 bind 之后调用，获得的参数是绑定的初始值；以后每当绑定的值发生变化就会被调用，获得新值与旧值两个参数。</p></li>
<li><p>unbind：仅调用一次，当指令解绑元素的时候。</p></li>
</ul>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('my-directive', {
  bind: function () {
    // 做绑定的准备工作
    // 比如添加事件监听器，或是其他只需要执行一次的复杂操作
  },
  update: function (newValue, oldValue) {
    // 根据获得的新值执行对应的更新
    // 对于初始值也会被调用一次
  },
  unbind: function () {
    // 做清理工作
    // 比如移除在 bind() 中添加的事件监听器
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.directive(<span class="hljs-string">'my-directive'</span>, {
  <span class="hljs-attr">bind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 做绑定的准备工作</span>
    <span class="hljs-comment">// 比如添加事件监听器，或是其他只需要执行一次的复杂操作</span>
  },
  <span class="hljs-attr">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">newValue, oldValue</span>) </span>{
    <span class="hljs-comment">// 根据获得的新值执行对应的更新</span>
    <span class="hljs-comment">// 对于初始值也会被调用一次</span>
  },
  <span class="hljs-attr">unbind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 做清理工作</span>
    <span class="hljs-comment">// 比如移除在 bind() 中添加的事件监听器</span>
  }
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="一旦注册好自定义指令，你就可以在 Vue.js 模板中像这样来使用它（需要添加 Vue.js 的指令前缀，默认为 v-）：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">一旦注册好自定义指令，你就可以在 Vue<span class="hljs-selector-class">.js</span> 模板中像这样来使用它（需要添加 Vue<span class="hljs-selector-class">.js</span> 的指令前缀，默认为 v-）：</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-my-directive=&quot;someValue&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-my-directive</span>=<span class="hljs-string">"someValue"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果你只需要 update 函数，你可以只传入一个函数，而不用传定义对象：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code style="word-break: break-word; white-space: initial;">如果你只需要 <span class="hljs-keyword">update</span> 函数，你可以只传入一个函数，而不用传定义对象：</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('my-directive', function (value) {
  // 这个函数会被作为 update() 函数使用
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Vue.directive(<span class="hljs-string">'my-directive'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value)</span> </span>{
  <span class="hljs-comment">// 这个函数会被作为 update() 函数使用</span>
})</code></pre>
<p>所有的钩子函数会被复制到实际的指令对象中，而这个指令对象将会是所有钩子函数的this<br>上下文环境。指令对象上暴露了一些有用的公开属性：</p>
<ul>
<li><p>el: 指令绑定的元素</p></li>
<li><p>vm: 拥有该指令的上下文 ViewModel</p></li>
<li><p>expression: 指令的表达式，不包括参数和过滤器</p></li>
<li><p>arg: 指令的参数</p></li>
<li><p>raw: 未被解析的原始表达式</p></li>
<li><p>name: 不带前缀的指令名</p></li>
</ul>
<p>这些属性是只读的，不要修改它们。你也可以给指令对象附加自定义的属性，但是注意不要覆盖已有的内部属性。</p>
<h2 id="articleHeader4">钩子函数</h2>
<h4>指令定义函数提供了几个钩子函数（可选）：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
* bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。

* inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。

* update: 所在组件的 VNode 更新时调用，但是可能发生在其孩子的 VNode 更新之前。指令的值可能发生了改变也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

* componentUpdated: 所在组件的 VNode 及其孩子的 VNode 全部更新时调用。

* unbind: 只调用一次， 指令与元素解绑时调用。

* 接下来我们来看一下钩子函数的参数 (包括 el，binding，vnode，oldVnode) 。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>
<span class="hljs-bullet">* </span>bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。

<span class="hljs-bullet">* </span>inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。

<span class="hljs-bullet">* </span>update: 所在组件的 VNode 更新时调用，但是可能发生在其孩子的 VNode 更新之前。指令的值可能发生了改变也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

<span class="hljs-bullet">* </span>componentUpdated: 所在组件的 VNode 及其孩子的 VNode 全部更新时调用。

<span class="hljs-bullet">* </span>unbind: 只调用一次， 指令与元素解绑时调用。

<span class="hljs-bullet">* </span>接下来我们来看一下钩子函数的参数 (包括 el，binding，vnode，oldVnode) 。
</code></pre>
<h2 id="articleHeader5">钩子函数参数</h2>
<h4>钩子函数被赋予了以下参数：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*el: 指令所绑定的元素，可以用来直接操作 DOM 。
* binding: 一个对象，包含以下属性：

* name: 指令名，不包括 v- 前缀。
* value: 指令的绑定值， 例如： v-my-directive=&quot;1 + 1&quot;, value 的值是 2。
* oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
* expression: 绑定值的字符串形式。 例如 v-my-directive=&quot;1 + 1&quot; ， expression 的值是 &quot;1 + 1&quot;。
* arg: 传给指令的参数。例如 v-my-directive:foo， arg 的值是 &quot;foo&quot;。
* modifiers: 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。
* vnode: Vue 编译生成的虚拟节点，查阅 VNode API 了解更多详情。
* oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>*<span class="hljs-string">el:</span> 指令所绑定的元素，可以用来直接操作 DOM 。
* <span class="hljs-string">binding:</span> 一个对象，包含以下属性：

* <span class="hljs-string">name:</span> 指令名，不包括 v- 前缀。
* <span class="hljs-string">value:</span> 指令的绑定值， 例如： v-my-directive=<span class="hljs-string">"1 + 1"</span>, value 的值是 <span class="hljs-number">2</span>。
* <span class="hljs-string">oldValue:</span> 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
* <span class="hljs-string">expression:</span> 绑定值的字符串形式。 例如 v-my-directive=<span class="hljs-string">"1 + 1"</span> ， expression 的值是 <span class="hljs-string">"1 + 1"</span>。
* <span class="hljs-string">arg:</span> 传给指令的参数。例如 v-my-<span class="hljs-string">directive:</span>foo， arg 的值是 <span class="hljs-string">"foo"</span>。
* <span class="hljs-string">modifiers:</span> 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { <span class="hljs-string">foo:</span> <span class="hljs-literal">true</span>, <span class="hljs-string">bar:</span> <span class="hljs-literal">true</span> }。
* <span class="hljs-string">vnode:</span> Vue 编译生成的虚拟节点，查阅 VNode API 了解更多详情。
* <span class="hljs-string">oldVnode:</span> 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
</code></pre>
<ul><li><p>除了 el 之外，其它参数都应该是只读的，尽量不要修改他们。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。</p></li></ul>
<h2 id="articleHeader6">多重从句</h2>
<p>同一个特性内部，逗号分隔的多个从句将被绑定为多个指令实例。在下面的例子中，指令会被创建和调用两次：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-demo=&quot;color: 'white', text: 'hello!'&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-demo</span>=<span class="hljs-string">"color: 'white', text: 'hello!'"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>如果想要用单个指令实例处理多个参数，可以利用字面量对象作为表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-demo=&quot;{color: 'white', text: 'hello!'}&quot;></div>

    Vue.directive('demo', function (value) {
    
          console.log(value) // Object {color: 'white', text: 'hello!'}
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div v-demo=<span class="hljs-string">"{color: 'white', text: 'hello!'}"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

    Vue.directive(<span class="hljs-string">'demo'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
    
          <span class="hljs-built_in">console</span>.log(value) <span class="hljs-comment">// Object {color: 'white', text: 'hello!'}</span>
})</code></pre>
<h2 id="articleHeader7">字面指令</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果在创建自定义指令的时候传入 isLiteral: true ，那么特性值就会被看成直接字符串，并被赋值给该指令的 expression。字面指令不会试图建立数据监视。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">如果在创建自定义指令的时候传入</span> <span class="hljs-attr">isLiteral:</span> <span class="hljs-literal">true</span> <span class="hljs-string">，那么特性值就会被看成直接字符串，并被赋值给该指令的</span> <span class="hljs-string">expression。字面指令不会试图建立数据监视。</span>
</code></pre>
<h3 id="articleHeader8">例子：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-literal-dir=&quot;foo&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-literal-dir</span>=<span class="hljs-string">"foo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.directive('literal-dir', {
      isLiteral: true,
      bind: function () {
        console.log(this.expression) // 'foo'
      }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    Vue.directive(<span class="hljs-string">'literal-dir'</span>, {
      <span class="hljs-attr">isLiteral</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">bind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.expression) <span class="hljs-comment">// 'foo'</span>
      }
    })</code></pre>
<h2 id="articleHeader9">动态字面指令</h2>
<p>然而，在字面指令含有 Mustache 标签的情形下，指令的行为如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="指令实例会有一个属性，this._isDynamicLiteral被设为true；

如果没有提供update函数，Mustache 表达式只会被求值一次，并将该值赋给this.expression。不会对表达式进行数据监视。

如果提供了update函数，指令将会为表达式建立一个数据监视，并且在计算结果变化的时候调用update。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>指令实例会有一个属性，<span class="hljs-keyword">this</span>._isDynamicLiteral被设为<span class="hljs-literal">true</span>；

如果没有提供update函数，Mustache 表达式只会被求值一次，并将该值赋给<span class="hljs-keyword">this</span>.expression。不会对表达式进行数据监视。

如果提供了update函数，指令将会为表达式建立一个数据监视，并且在计算结果变化的时候调用update。
</code></pre>
<h2 id="articleHeader10">双向指令</h2>
<p>如果你的指令想向 Vue 实例写回数据，你需要传入 twoWay: true 。该选项允许在指令中使用 <br>this.set(value)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('example', {
  twoWay: true,
  bind: function () {
    this.handler = function () {
      // 把数据写回 vm
      // 如果指令这样绑定 v-example=&quot;a.b.c&quot;,
      // 这里将会给 `vm.a.b.c` 赋值
      this.set(this.el.value)
    }.bind(this)
    this.el.addEventListener('input', this.handler)
  },
  unbind: function () {
    this.el.removeEventListener('input', this.handler)
  }
})    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.directive(<span class="hljs-string">'example'</span>, {
  <span class="hljs-attr">twoWay</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">bind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.handler = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 把数据写回 vm</span>
      <span class="hljs-comment">// 如果指令这样绑定 v-example="a.b.c",</span>
      <span class="hljs-comment">// 这里将会给 `vm.a.b.c` 赋值</span>
      <span class="hljs-keyword">this</span>.set(<span class="hljs-keyword">this</span>.el.value)
    }.bind(<span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">this</span>.el.addEventListener(<span class="hljs-string">'input'</span>, <span class="hljs-keyword">this</span>.handler)
  },
  <span class="hljs-attr">unbind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.el.removeEventListener(<span class="hljs-string">'input'</span>, <span class="hljs-keyword">this</span>.handler)
  }
})    </code></pre>
<h2 id="articleHeader11">内联语句</h2>
<p>传入 acceptStatement: true 可以让自定义指令像 v-on 一样接受内联语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-my-directive=&quot;a++&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-my-directive</span>=<span class="hljs-string">"a++"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('my-directive', {
  acceptStatement: true,
  update: function (fn) {
    // the passed in value is a function which when called,
    // will execute the &quot;a++&quot; statement in the owner vm's
    // scope.
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.directive(<span class="hljs-string">'my-directive'</span>, {
  <span class="hljs-attr">acceptStatement</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-comment">// the passed in value is a function which when called,</span>
    <span class="hljs-comment">// will execute the "a++" statement in the owner vm's</span>
    <span class="hljs-comment">// scope.</span>
  }
})</code></pre>
<p>但是请明智地使用此功能，因为通常我们希望避免在模板中产生副作用。</p>
<h2 id="articleHeader12">元素指令</h2>
<p>有时候，我们可能想要我们的指令可以以自定义元素的形式被使用，而不是作为一个特性。这与 Angular 的 E 类指令的概念非常相似。元素指令可以看做是一个轻量的自定义组件（后面会讲到）。你可以像下面这样注册一个自定义的元素指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.elementDirective('my-directive', {
  // 和普通指令的 API 一致
  bind: function () {
    // 对 this.el 进行操作...
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.elementDirective(<span class="hljs-string">'my-directive'</span>, {
  <span class="hljs-comment">// 和普通指令的 API 一致</span>
  bind: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 对 this.el 进行操作...</span>
  }
})</code></pre>
<p>使用时我们不再用这样的写法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-my-directive></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-my-directive</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>而是写成:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-directive></my-directive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code style="word-break: break-word; white-space: initial;"><span class="hljs-section">&lt;my-directive&gt;</span><span class="hljs-section">&lt;/my-directive&gt;</span></code></pre>
<p>元素指令不能接受参数或表达式，但是它可以读取元素的特性，来决定它的行为。与通常的指令有个很大的不同，元素指令是终结性的，这意味着，一旦 Vue 遇到一个元素指令，它将跳过对该元素和其子元素的编译 - 即只有该元素指令本身可以操作该元素及其子元素。</p>
<h1 id="articleHeader13">插件</h1>
<h2 id="articleHeader14">开发插件</h2>
<ul>
<li><p>插件通常会为Vue添加全局功能。插件的范围没有限制——一般有下面几种：</p></li>
<li><p>添加全局方法或者属性，如: vue-custom-element</p></li>
<li><p>添加全局资源：指令/过滤器/过渡等，如 vue-touch</p></li>
<li><p>通过全局 mixin 方法添加一些组件选项，如: vue-router</p></li>
<li><p>添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。</p></li>
<li><p>一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 vue-router</p></li>
</ul>
<p>Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器 , 第二个参数是一个可选的选项对象:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }
  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })
  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>MyPlugin.install = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(Vue, options)</span> </span>{
  <span class="hljs-comment">// 1. 添加全局方法或属性</span>
  Vue.myGlobalMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }
  <span class="hljs-comment">// 2. 添加全局资源</span>
  Vue.directive(<span class="hljs-string">'my-directive'</span>, {
    bind (el, binding, vnode, oldVnode) {
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })
  <span class="hljs-comment">// 3. 注入组件</span>
  Vue.mixin({
    created: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })
  <span class="hljs-comment">// 4. 添加实例方法</span>
  Vue.prototype.$myMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(methodOptions)</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }
}</code></pre>
<h2 id="articleHeader15">使用插件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="通过全局方法 Vue.use() 使用插件:" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">通过全局方法 Vue.<span class="hljs-keyword">use</span>() 使用插件:</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 调用 `MyPlugin.install(Vue)`</span>
Vue.use(MyPlugin)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="也可以传入一个选项对象:" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">也可以传入一个选项对象:</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.use(MyPlugin, { someOption: true })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">Vue.use(MyPlugin, { <span class="hljs-attr">someOption</span>: <span class="hljs-literal">true</span> })</code></pre>
<p>Vue.use 会自动阻止注册相同插件多次，届时只会注册一次该插件。</p>
<p>Vue.js 官方提供的一些插件 (例如 vue-router) 在检测到 Vue 是可访问的全局变量时会自动调用 Vue.use()。</p>
<p>然而在例如 CommonJS 的模块环境中，你应该始终显式地调用 Vue.use()：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时
var Vue = require('vue')
var VueRouter = require('vue-router')
// 不要忘了调用此方法
Vue.use(VueRouter)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时</span>
<span class="hljs-keyword">var</span> Vue = <span class="hljs-keyword">require</span>(<span class="hljs-string">'vue'</span>)
<span class="hljs-keyword">var</span> VueRouter = <span class="hljs-keyword">require</span>(<span class="hljs-string">'vue-router'</span>)
<span class="hljs-comment">// 不要忘了调用此方法</span>
Vue.<span class="hljs-keyword">use</span>(VueRouter)</code></pre>
<h1 id="articleHeader16">本章已完结 （待续  ……）</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                        文章来自 ： 搜狗搜到你
                        
                        个人网站 ：huai.ye2012vip@qq.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>                        文章来自 ： 搜狗搜到你
                        
                        个人网站 ：<span class="hljs-selector-tag">huai</span><span class="hljs-selector-class">.ye2012vip</span>@<span class="hljs-keyword">qq</span>.<span class="hljs-keyword">com</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js 可复用性&组合- 混合 - 自定义指令 - 插件 基础

## 原文链接
[https://segmentfault.com/a/1190000011030499](https://segmentfault.com/a/1190000011030499)

