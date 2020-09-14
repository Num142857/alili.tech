---
title: 'Vue 中 extend / component / mixins / extends 的区别' 
date: 2019-01-09 2:30:12
hidden: true
slug: 0k9fnil1bql
categories: [reprint]
---

{{< raw >}}

                    
<p>在segmentfault上看到了一个问题<a href="https://segmentfault.com/q/1010000007312426">vue.extend, vue.component 区别</a>,突然有些方,好歹也写了几个小vue项目,自己都弄不清楚这些东西...</p>
<h3 id="articleHeader0">new Vue()、component</h3>
<p>首先我们来约定一个<strong>选项对象</strong>  baseOptions,后面的代码会用到.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let options = {
    template: '<p>"{{"firstName"}}" "{{"lastName"}}" aka "{{"alias"}}"</p>',
    data: function () {
        return {
            firstName: 'Walter',
            lastName: 'White',
            alias: 'Heisenberg'
        }
    },
    created(){
        console.log('onCreated-1');
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> options = {
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;p&gt;"{{"firstName"}}" "{{"lastName"}}" aka "{{"alias"}}"&lt;/p&gt;'</span>,
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">firstName</span>: <span class="hljs-string">'Walter'</span>,
            <span class="hljs-attr">lastName</span>: <span class="hljs-string">'White'</span>,
            <span class="hljs-attr">alias</span>: <span class="hljs-string">'Heisenberg'</span>
        }
    },
    created(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'onCreated-1'</span>);
    }
};</code></pre>
<h4>
<a href="http://cn.vuejs.org/v2/guide/instance.html" rel="nofollow noreferrer" target="_blank">new Vue()</a> <strong>source:vue/src/core/instance/index.js</strong>
</h4>
<blockquote><p>实例化一个组件.</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue(baseOptions);
// -> onCreated-1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue(baseOptions);
<span class="hljs-comment">// -&gt; onCreated-1</span></code></pre>
<h4>
<a href="http://cn.vuejs.org/v2/api/#Vue-component" rel="nofollow noreferrer" target="_blank">component</a> <strong>source:vue/src/core/global-api/assets.js</strong>
</h4>
<blockquote><p>Vue.component 是用来注册或获取全局组件的方法，其作用是将通过 Vue.extend 生成的扩展实例构造器注册（命名）为一个组件.全局注册的组件可以在所有晚于该组件注册语句构造的Vue实例中使用.</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('global-component', Vue.extend(baseOptions));
//传入一个选项对象（自动调用 Vue.extend）,等价于上行代码.
Vue.component('global-component', baseOptions);
// 获取注册的组件（始终返回构造器）
var MyComponent = Vue.component('my-component')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'global-component'</span>, Vue.extend(baseOptions));
<span class="hljs-comment">//传入一个选项对象（自动调用 Vue.extend）,等价于上行代码.</span>
Vue.component(<span class="hljs-string">'global-component'</span>, baseOptions);
<span class="hljs-comment">// 获取注册的组件（始终返回构造器）</span>
<span class="hljs-keyword">var</span> MyComponent = Vue.component(<span class="hljs-string">'my-component'</span>)</code></pre>
<hr>
<p>当我们需要在其他页面‘扩展’或者叫‘混合’baseOptions时,Vue中提供了多种的实现方式:extend,mixins,extends.</p>
<h4>
<a href="http://cn.vuejs.org/v2/api/#Vue-extend" rel="nofollow noreferrer" target="_blank">extend</a> <strong>source:vue/src/core/global-api/extend.js</strong>
</h4>
<blockquote><p>可以扩展 Vue 构造器，从而用预定义选项创建可复用的组件构造器。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let BaseComponent = Vue.extend(baseOptions);
//基于基础组件BaseComponent,再扩展新逻辑.
new BaseComponent({
    created(){
        //do something
        console.log('onCreated-2');
    }
    //其他自定义逻辑
});
// -> onCreated-1
// -> onCreated-2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> BaseComponent = Vue.extend(baseOptions);
<span class="hljs-comment">//基于基础组件BaseComponent,再扩展新逻辑.</span>
<span class="hljs-keyword">new</span> BaseComponent({
    created(){
        <span class="hljs-comment">//do something</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'onCreated-2'</span>);
    }
    <span class="hljs-comment">//其他自定义逻辑</span>
});
<span class="hljs-comment">// -&gt; onCreated-1</span>
<span class="hljs-comment">// -&gt; onCreated-2</span></code></pre>
<h4><a href="http://cn.vuejs.org/v2/api/#mixins" rel="nofollow noreferrer" target="_blank">mixins</a></h4>
<blockquote><p>mixins 选项接受一个混合对象的数组。这些混合实例对象可以像正常的实例对象一样包含选项,他们将在 Vue.extend() 里最终选择使用相同的选项合并逻辑合并。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    mixins: [baseOptions],
    created(){
        //do something
        console.log('onCreated-2');
    }
    //其他自定义逻辑
});
// -> onCreated-1
// -> onCreated-2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">mixins</span>: [baseOptions],
    created(){
        <span class="hljs-comment">//do something</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'onCreated-2'</span>);
    }
    <span class="hljs-comment">//其他自定义逻辑</span>
});
<span class="hljs-comment">// -&gt; onCreated-1</span>
<span class="hljs-comment">// -&gt; onCreated-2</span></code></pre>
<h4><a href="http://cn.vuejs.org/v2/api/#extends" rel="nofollow noreferrer" target="_blank">extends</a></h4>
<blockquote><p>这和 mixins 类似，区别在于，组件自身的选项会比要扩展的源组件具有更高的优先级.</p></blockquote>
<p>官方文档是这么写的,除了优先级,可能就剩下接受参数的类型吧,mixins接受的是数组.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    extends: baseOptions,
    created(){
        //do something
        console.log('onCreated-2');
    }
    //其他自定义逻辑
});
// -> onCreated-1
// -> onCreated-2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">extends</span>: baseOptions,
    created(){
        <span class="hljs-comment">//do something</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'onCreated-2'</span>);
    }
    <span class="hljs-comment">//其他自定义逻辑</span>
});
<span class="hljs-comment">// -&gt; onCreated-1</span>
<span class="hljs-comment">// -&gt; onCreated-2</span></code></pre>
<p>从结果上看,三种方式都能实现需求,但是形式却有不同.</p>
<ul>
<li>
<p>Vue.extend</p>
<ul><li><p>Vue.extend只是创建一个构造器,他是为了创建可复用的组件.</p></li></ul>
</li>
<li>
<p>mixins,extends</p>
<ul><li><p>而mixins和extends是为了拓展组件.</p></li></ul>
</li>
</ul>
<p>从源码来看通过extend,extends和mixins三种方式接收的options,最终都是通过mergeOptions进行合并的.差异只是官方文档中提到的优先级不同extend &gt; extends &gt; mixins. 所以,如果是简单的扩展组件功能,三个方式都可以达到目的.</p>
<p><span class="img-wrap"><img data-src="/img/bVQsjQ?w=618&amp;h=747" src="https://static.alili.tech/img/bVQsjQ?w=618&amp;h=747" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>而这三种方式使用场景上细化的区分,目前我也蒙圈中...</p>
<p>//几种方式的不同示例:<br><a href="https://jsfiddle.net/willnewii/dzks1r4d/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/willnewi...</a><button class="btn btn-xs btn-default ml10 preview" data-url="willnewii/dzks1r4d/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader1">选项对象合并策略   <strong>Vue.config.optionMergeStrategies</strong>
</h3>
<p>上面提到的选项对象,是在mergeOptions中按照一定策略进行合并的.</p>
<p>打印Vue.config.optionMergeStrategies,你会看默认的optionMergeStrategies如下:<br><span class="img-wrap"><img data-src="/img/bVQu03?w=685&amp;h=350" src="https://static.alili.tech/img/bVQu03?w=685&amp;h=350" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<p>mergeHook</p>
<ul><li><p>子组件和父组件的生命周期事件会合并在一个数组里。父组件在前，子组件在后。</p></li></ul>
</li>
<li>
<p>watch</p>
<ul><li><p>子组件和父组件的watchers会合并在一个数组里。父组件在前，子组件在后。</p></li></ul>
</li>
<li>
<p>mergeAssets(filters，components，directives)</p>
<ul><li><p>首先会在子组件里查找，如果没有，才会沿着原型链向上，找父组件中对应的属性。</p></li></ul>
</li>
<li>
<p>data 合并规则</p>
<ul>
<li><p>无重复的属性保留</p></li>
<li><p>同名覆盖</p></li>
<li><p>data中的对象也是相同规则,无重复的属性保留,同名覆盖</p></li>
</ul>
</li>
<li><p>props、methods、computed: 无重复保留,同名子组件覆盖父组件</p></li>
</ul>
<h5>mergeAssets</h5>
<p>mergeAssets合并方法里,用到了原型委托.他会先把父组件的属性放在创建的新对象的原型链上.然后扩展新对象</p>
<blockquote><p><strong>对象里查找属性的规则</strong> :举个例子，当查找一个属性时，如 obj[a] ,如果 obj 没有 a 这个属性，那么将会在 obj 对象的原型里找，如果还没有，在原型的原型上找，直到原型链的尽头，如果还没有找到，返回 undefined。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span> (<span class="hljs-params">to, _from</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> _from) {
    to[key] = _from[key];
  }
  <span class="hljs-keyword">return</span> to
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeAssets</span> (<span class="hljs-params">parentVal, childVal</span>) </span>{
  <span class="hljs-keyword">var</span> res = <span class="hljs-built_in">Object</span>.create(parentVal || <span class="hljs-literal">null</span>);
  <span class="hljs-keyword">return</span> childVal
    ? extend(res, childVal)
    : res
}</code></pre>
<h3 id="articleHeader2">总结</h3>
<ul>
<li><p>Vue.component 注册全局组件,为了方便</p></li>
<li><p>Vue.extend 创建组件的构造函数,为了复用</p></li>
<li><p>mixins、extends 为了扩展</p></li>
</ul>
<p>如果按照优先级去理解,当你需要继承一个组件时,可以使用Vue.extend().当你需要扩展组件功能的时候,可以使用extends,mixins.但目前为止还没有碰到完美诠释他们的场景,抱歉,能力有限?</p>
<h3 id="articleHeader3">参考</h3>
<ul>
<li><p><a href="http://mario.studio/vue-course/#/0?_k=chseqx" rel="nofollow noreferrer" target="_blank">Vue 代码详解</a></p></li>
<li><p><a href="http://www.qinshenxue.com/article/20170616121212.html" rel="nofollow noreferrer" target="_blank">Vue官方文档梳理-全局配置 合并策略</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007087912#articleHeader4">vue2.0源码解读之选项合并策略 optionMergeStrategies</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000009721209" target="_blank">vue源码解读－component机制</a></p></li>
</ul>
<h4>Tips</h4>
<ul>
<li>
<p>href 属性用于保持光标形状为正常的手形，也可以使用 css 实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;javascript:void(0);&quot; @click=&quot;currentView = 'home'&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"currentView = 'home'"</span>&gt;</span></code></pre>
</li>
<li><p>FOUC Flash Of Unstyled Content 文档样式闪烁</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 中 extend / component / mixins / extends 的区别

## 原文链接
[https://segmentfault.com/a/1190000010095089](https://segmentfault.com/a/1190000010095089)

