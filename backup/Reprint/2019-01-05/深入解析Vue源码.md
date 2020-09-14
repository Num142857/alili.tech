---
title: '深入解析Vue源码' 
date: 2019-01-05 2:30:11
hidden: true
slug: 7lwstc7t1u9
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">Vue简介</h3>
<p>数据绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
*假设有这么两个钟东西
**/
//数据
var object = {
  message: 'Hello World!'
}
//DOM
<div id=&quot;example&quot;>
  "{{" message "}}"
</div>

/**
*我们可以这么写
**/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">/**
*假设有这么两个钟东西
**/</span>
<span class="hljs-comment">//数据</span>
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">object</span> = {
  message: <span class="hljs-string">'Hello World!'</span>
}
<span class="hljs-comment">//DOM</span>
&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"example"</span>&gt;
  "{{" message "}}"
&lt;/div&gt;

<span class="hljs-comment">/**
*我们可以这么写
**/</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: '#example',
  data: object
})

/**
* 如果有个数据
**/

var object1 = {
  message: 'Hello World!'
}

var object2 = {
  message: 'Hello World!'
}

//DOM
<div id=&quot;example1&quot;>
  "{{" message "}}"
</div>

<div id=&quot;example2&quot;>
  "{{" message "}}"
</div>

/**
*我们还可以这么写
**/

var vm1 = new Vue({el: '#example1',data: object})
//改变vm1的数据DOM随之改变
vm2.message = 'oliver'

var vm2 = new Vue({el: '#example2',data: object})

vm2.message = 'lisa'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>new Vue({
  el: <span class="hljs-string">'#example'</span>,
  data: <span class="hljs-selector-tag">object</span>
})

<span class="hljs-comment">/**
* 如果有个数据
**/</span>

<span class="hljs-selector-tag">var</span> object1 = {
  message: <span class="hljs-string">'Hello World!'</span>
}

<span class="hljs-selector-tag">var</span> object2 = {
  message: <span class="hljs-string">'Hello World!'</span>
}

<span class="hljs-comment">//DOM</span>
&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"example1"</span>&gt;
  "{{" message "}}"
&lt;/div&gt;

&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"example2"</span>&gt;
  "{{" message "}}"
&lt;/div&gt;

<span class="hljs-comment">/**
*我们还可以这么写
**/</span>

<span class="hljs-selector-tag">var</span> vm1 = new Vue({el: <span class="hljs-string">'#example1'</span>,data: object})
<span class="hljs-comment">//改变vm1的数据DOM随之改变</span>
vm2<span class="hljs-selector-class">.message</span> = <span class="hljs-string">'oliver'</span>

<span class="hljs-selector-tag">var</span> vm2 = new Vue({el: <span class="hljs-string">'#example2'</span>,data: object})

vm2<span class="hljs-selector-class">.message</span> = <span class="hljs-string">'lisa'</span>
</code></pre>
<p>组件化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Example = Vue.extend({
template: '<div>"{{" message "}}"</div>',
data: function () {
return {
  message: 'Hello Vue.js!'
}
}
})

// 将该组件注册为 <example> 标签
Vue.component('example', Example)

Vue 在组件化上和 React 类似：一切都是组件。
组件使用上也和React一致:

<example></example>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Example = Vue.extend({
<span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;"{{" message "}}"&lt;/div&gt;'</span>,
<span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-keyword">return</span> {
  <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello Vue.js!'</span>
}
}
})

<span class="hljs-comment">// 将该组件注册为 &lt;example&gt; 标签</span>
Vue.component(<span class="hljs-string">'example'</span>, Example)

Vue 在组件化上和 React 类似：一切都是组件。
组件使用上也和React一致:

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">example</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">example</span>&gt;</span></span>
</code></pre>
<p>组件之间数据传递:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.用 props 来定义如何接收外部数据;
Vue.component('child', {
  // 声明 props
  props: ['msg'],
  // prop 可以用在模板内
  // 可以用 `this.msg` 设置
  template: '<span>"{{" msg "}}"</span>'
})
<child msg=&quot;hello!&quot;></child>

2.用自定义事件来向外传递消息;
使用 $on() 监听事件；
使用 $emit() 在它上面触发事件；
使用 $dispatch() 派发事件，事件沿着父链冒泡；
使用 $broadcast() 广播事件，事件向下传导给所有的后代。

3.用 <slot> API 来将外部动态传入的内容（其他组件或是 HTML）和自身模板进行组合;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-number">1.</span>用 props 来定义如何接收外部数据;
Vue.component(<span class="hljs-string">'child'</span>, {
  <span class="hljs-comment">// 声明 props</span>
  props: [<span class="hljs-string">'msg'</span>],
  <span class="hljs-comment">// prop 可以用在模板内</span>
  <span class="hljs-comment">// 可以用 `this.msg` 设置</span>
  template: <span class="hljs-string">'&lt;span&gt;"{{" msg "}}"&lt;/span&gt;'</span>
})
&lt;child msg=<span class="hljs-string">"hello!"</span>&gt;&lt;/child&gt;

<span class="hljs-number">2.</span>用自定义事件来向外传递消息;
使用 $on() 监听事件；
使用 $emit() 在它上面触发事件；
使用 $dispatch() 派发事件，事件沿着父链冒泡；
使用 $broadcast() 广播事件，事件向下传导给所有的后代。

<span class="hljs-number">3.</span>用 &lt;slot&gt; API 来将外部动态传入的内容（其他组件或是 HTML）和自身模板进行组合;
</code></pre>
<p>模块化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Webpack 或者 Browserify，然后再加上 ES2015配合 vue-loader 或是 vueify，就可以把Vue的每一个组件变成
Web Components

<!-- MyComponent.vue -->

<!-- css -->
<style>
.message {
  color: red;
}
</style>

<!-- template -->
<template>
  <div class=&quot;message&quot;>"{{" message "}}"</div>
</template>

<!-- js -->
<script>
export default {
  props: ['message'],
  created() {
    console.log('MyComponent created!')
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">Webpack 或者 Browserify，然后再加上 ES2015配合 vue-loader 或是 vueify，就可以把Vue的每一个组件变成
Web Components

<span class="hljs-comment">&lt;!-- MyComponent.vue --&gt;</span>

<span class="hljs-comment">&lt;!-- css --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.message</span> {
  <span class="hljs-attribute">color</span>: red;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- template --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"message"</span>&gt;</span></span><span class="hljs-template-variable">"{{" message "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: [<span class="hljs-string">'message'</span>],
  created() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'MyComponent created!'</span>)
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="使用Vue重构的Angular项目

www.songxuemeng.com/diary

个人感觉vue-router烦的问题是组件之间的数据交互,rootRouter的数据很难向其他组件传递.

/**
*解决方法
**/
var app = Vue.extend({
  data:function(){
      return {
          data:'',
      };
  },
});
router.map({
      '/': {
          component:  Vue.extend({
                            mixins: [calendar.mixin],
                            data:function(){
                                return {
                                    data:data
                                }
                            }
                      })
      },
  })
router.start(app, '#app');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>使用Vue重构的Angular项目

www.songxuemeng.com/diary

个人感觉vue-router烦的问题是组件之间的数据交互,rootRouter的数据很难向其他组件传递.

<span class="hljs-comment">/**
*解决方法
**/</span>
<span class="hljs-keyword">var</span> app = Vue.extend({
  data:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
      <span class="hljs-keyword">return</span> {
          data:<span class="hljs-string">''</span>,
      };
  },
});
router.map({
      <span class="hljs-string">'/'</span>: {
          component:  Vue.extend({
                            mixins: [calendar.mixin],
                            data:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                                <span class="hljs-keyword">return</span> {
                                    data:data
                                }
                            }
                      })
      },
  })
router.start(app, <span class="hljs-string">'#app'</span>);
</code></pre>
<h3 id="articleHeader1">Vue源码分析</h3>
<p><a href="http://img2.tbcdn.cn/L1/461/1/8142ef3fc2055839f1a93a933d80e17694b4f76b" rel="nofollow noreferrer" target="_blank">http://img2.tbcdn.cn/L1/461/1...</a></p>
<p>Vue.js是一个典型的MVVM的程序结构，程序大体可以分为：<br>全局设计：包括全局接口、默认选项等；<br>vm实例设计：包括接口(vm原形)、实例初始化过程(vm构造函数)</p>
<p>下面是构造函数最核心的工作内容。</p>
<p><a href="http://img3.tbcdn.cn/L1/461/1/00049a09def4aff8d80f3bb7229e3f6d395426fb" rel="nofollow noreferrer" target="_blank">http://img3.tbcdn.cn/L1/461/1...</a></p>
<p>整个实例初始化的过程中，重中之重就是把数据 (Model) 和视图 (View) 建立起关联关系。Vue.js 和诸多 MVVM 的思路是类似的，主要做了三件事：</p>
<p>通过 observer 对 data 进行了监听，并且提供订阅某个数据项的变化的能力<br>把 template 解析成一段 document fragment，然后解析其中的 directive，得到每一个 directive 所依赖的数据项及其更新方法。比如 v-text="message" 被解析之后；<br>所依赖的数据项 this.$data.message，以及<br>相应的视图更新方法 node.textContent = this.$data.message<br>通过 watcher 把上述两部分结合起来，即把 directive 中的数据依赖订阅在对应数据的 observer 上，这样当数据变化的时候，就会触发 observer，进而触发相关依赖对应的视图更新方法，最后达到模板原本的关联效果。<br>所以整个 vm 的核心，就是如何实现 observer, directive (parser), watcher 这三样东西</p>
<h4>vue文件结构</h4>
<p><a href="http://img4.tbcdn.cn/L1/461/1/cb73a147451157e52500734c0d31665a9540adae" rel="nofollow noreferrer" target="_blank">http://img4.tbcdn.cn/L1/461/1...</a></p>
<h4>数据列表的更新</h4>
<p>视图更新效率的焦点问题主要在于大列表的更新和深层数据更新这两方面.</p>
<p>但是工作中经常用的主要是前者</p>
<p>首先 diff(data, oldVms) 这个函数的注释对整个比对更新机制做了个简要的阐述，大概意思是先比较新旧两个列表的 vm 的数据的状态，然后差量更新 DOM。</p>
<p>第一步：便利新列表里的每一项，如果该项的 vm 之前就存在，则打一个 _reused 的标，如果不存在对应的 vm，则创建一个新的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (i = 0, l = data.length; i < l; i++) {
        item = data[i];
        key = convertedFromObject ? item.$key : null;
        value = convertedFromObject ? item.$value : item;
        primitive = !isObject(value);
        frag = !init &amp;&amp; this.getCachedFrag(value, i, key);
        if (frag) {
          // reusable fragment如果存在打上usered
          frag.reused = true;
          // update $index
          frag.scope.$index = i;
          // update $key
          if (key) {
            frag.scope.$key = key;
          }
          // update iterator
          if (iterator) {
            frag.scope[iterator] = key !== null ? key : i;
          }
          // update data for track-by, object repeat &amp;
          // primitive values.
          if (trackByKey || convertedFromObject || primitive) {
            frag.scope[alias] = value;
          }
        } else {
          // new isntance如果不存在就新建一个
          frag = this.create(value, alias, i, key);
          frag.fresh = !init;
        }
        frags[i] = frag;
        if (init) {
          frag.before(end);
        }
      }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>, l = data.length; i &lt; l; i++) {
        item = data[i];
        <span class="hljs-built_in">key</span> = convertedFromObject ? item.$<span class="hljs-built_in">key</span> : <span class="hljs-keyword">null</span>;
        value = convertedFromObject ? item.$value : item;
        primitive = !isObject(value);
        frag = !init &amp;&amp; <span class="hljs-keyword">this</span>.getCachedFrag(value, i, <span class="hljs-built_in">key</span>);
        <span class="hljs-keyword">if</span> (frag) {
          <span class="hljs-comment">// reusable fragment如果存在打上usered</span>
          frag.reused = <span class="hljs-keyword">true</span>;
          <span class="hljs-comment">// update $index</span>
          frag.scope.$index = i;
          <span class="hljs-comment">// update $key</span>
          <span class="hljs-keyword">if</span> (<span class="hljs-built_in">key</span>) {
            frag.scope.$<span class="hljs-built_in">key</span> = <span class="hljs-built_in">key</span>;
          }
          <span class="hljs-comment">// update iterator</span>
          <span class="hljs-keyword">if</span> (iterator) {
            frag.scope[iterator] = <span class="hljs-built_in">key</span> !== <span class="hljs-keyword">null</span> ? <span class="hljs-built_in">key</span> : i;
          }
          <span class="hljs-comment">// update data for track-by, object repeat &amp;</span>
          <span class="hljs-comment">// primitive values.</span>
          <span class="hljs-keyword">if</span> (trackByKey || convertedFromObject || primitive) {
            frag.scope[alias] = value;
          }
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// new isntance如果不存在就新建一个</span>
          frag = <span class="hljs-keyword">this</span>.create(value, alias, i, <span class="hljs-built_in">key</span>);
          frag.fresh = !init;
        }
        frags[i] = frag;
        <span class="hljs-keyword">if</span> (init) {
          frag.before(end);
        }
      }
</code></pre>
<p>第二步：便利旧列表里的每一项，如果 _reused 的标没有被打上，则说明新列表里已经没有它了，就地销毁该 vm。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (i = 0, l = oldFrags.length; i < l; i++) {
    frag = oldFrags[i];
    if (!frag.reused) {
//如果没有used说明不存在,就地销毁
      this.deleteCachedFrag(frag);
      this.remove(frag, removalIndex++, totalRemoved, inDocument);
    }
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>, l = oldFrags.length; i &lt; l; i++) {
    frag = oldFrags[i];
    <span class="hljs-keyword">if</span> (!frag.reused) {
<span class="hljs-comment">//如果没有used说明不存在,就地销毁</span>
      <span class="hljs-keyword">this</span>.deleteCachedFrag(frag);
      <span class="hljs-keyword">this</span>.remove(frag, removalIndex++, totalRemoved, inDocument);
    }
  }
</code></pre>
<p>第三步：整理新的 vm 在视图里的顺序，同时还原之前打上的 _reused 标。就此列表更新完成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (i = 0, l = frags.length; i < l; i++) {
        frag = frags[i];
        // this is the frag that we should be after
        targetPrev = frags[i - 1];
        prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
        if (frag.reused &amp;&amp; !frag.staggerCb) {
          currentPrev = findPrevFrag(frag, start, this.id);
          if (currentPrev !== targetPrev &amp;&amp; (!currentPrev ||
          // optimization for moving a single item.
          // thanks to suggestions by @livoras in #1807
          findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
            this.move(frag, prevEl);
          }
        } else {
          // new instance, or still in stagger.
          // insert with updated stagger index.
          this.insert(frag, insertionIndex++, prevEl, inDocument);
        }
//还原打上的used
        frag.reused = frag.fresh = false;
      }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>, l = frags.length; i &lt; l; i++) {
        frag = frags[i];
        <span class="hljs-comment">// this is the frag that we should be after</span>
        targetPrev = frags[i - <span class="hljs-number">1</span>];
        prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
        <span class="hljs-keyword">if</span> (frag.reused &amp;&amp; !frag.staggerCb) {
          currentPrev = findPrevFrag(frag, start, <span class="hljs-keyword">this</span>.id);
          <span class="hljs-keyword">if</span> (currentPrev !== targetPrev &amp;&amp; (!currentPrev ||
          <span class="hljs-comment">// optimization for moving a single item.</span>
          <span class="hljs-comment">// thanks to suggestions by @livoras in #1807</span>
          findPrevFrag(currentPrev, start, <span class="hljs-keyword">this</span>.id) !== targetPrev)) {
            <span class="hljs-keyword">this</span>.move(frag, prevEl);
          }
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// new instance, or still in stagger.</span>
          <span class="hljs-comment">// insert with updated stagger index.</span>
          <span class="hljs-keyword">this</span>.insert(frag, insertionIndex++, prevEl, inDocument);
        }
<span class="hljs-comment">//还原打上的used</span>
        frag.reused = frag.fresh = <span class="hljs-literal">false</span>;
      }
</code></pre>
<p>keep-alive</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      Vue.js 为其组件设计了一个 [keep-alive] 的特性，如果这个特性存在，那么在组件被重复创建的时候，会通过缓存机制快速创建组件，以提升视图更新的性能。

          bind: function bind() {
      if (!this.el.__vue__) {
        // keep-alive cache
        this.keepAlive = this.params.keepAlive;
        if (this.keepAlive) {
          this.cache = {};
        }
.....
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>      Vue.js 为其组件设计了一个 [keep-alive] 的特性，如果这个特性存在，那么在组件被重复创建的时候，会通过缓存机制快速创建组件，以提升视图更新的性能。

          bind: function bind() {
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.el.__vue__) {
        <span class="hljs-comment">// keep-alive cache</span>
        <span class="hljs-keyword">this</span>.keepAlive = <span class="hljs-keyword">this</span>.params.keepAlive;
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.keepAlive) {
          <span class="hljs-keyword">this</span>.cache = {};
        }
.....
}
</code></pre>
<h3 id="articleHeader2">数据监听机制</h3>
<h4>对象数据监听</h4>
<p>'Vue'使用'Object.defineProperty'这个'API'为想要监听的属性增加了对应的'getter'和'setter',每次数据改变的时候在setter中触发函数'dep.notify()',来达到数据监听的效果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//对要监听的属性使用Object.defineProperty重写get和set函数,增加setter和getter方法
  Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
          //增加getter
          var value = getter ? getter.call(obj) : val;
          if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
          }
          if (isArray(value)) {
            for (var e, i = 0, l = value.length; i < l; i++) {
              e = value[i];
              e &amp;&amp; e.__ob__ &amp;&amp; e.__ob__.dep.depend();
            }
          }
        }
          return value;
        },
        set: function reactiveSetter(newVal) {
          var value = getter ? getter.call(obj) : val;
          //在属性set value的时候调用!!!
          if (newVal === value) {
            return;
          }
          //增加setter
          if (setter) {
            setter.call(obj, newVal);
          } else {
            val = newVal;
          }
          childOb = observe(newVal);
          //最后调用一个自己的函数
          dep.notify();
        }
      });

      然后dep.notify()都做了什么呢?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">//对要监听的属性使用Object.defineProperty重写get和set函数,增加setter和getter方法</span>
  Object.defineProperty(obj, key, {
        enumerable: <span class="hljs-literal">true</span>,
        configurable: <span class="hljs-literal">true</span>,
        <span class="hljs-keyword">get</span>: <span class="hljs-function">function <span class="hljs-title">reactiveGetter</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-comment">//增加getter</span>
          <span class="hljs-keyword">var</span> <span class="hljs-keyword">value</span> = getter ? getter.call(obj) : val;
          <span class="hljs-keyword">if</span> (Dep.target) {
          dep.depend();
          <span class="hljs-keyword">if</span> (childOb) {
            childOb.dep.depend();
          }
          <span class="hljs-keyword">if</span> (isArray(<span class="hljs-keyword">value</span>)) {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> e, i = <span class="hljs-number">0</span>, l = <span class="hljs-keyword">value</span>.length; i &lt; l; i++) {
              e = <span class="hljs-keyword">value</span>[i];
              e &amp;&amp; e.__ob__ &amp;&amp; e.__ob__.dep.depend();
            }
          }
        }
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span>;
        },
        <span class="hljs-keyword">set</span>: <span class="hljs-function">function <span class="hljs-title">reactiveSetter</span>(<span class="hljs-params">newVal</span>) </span>{
          <span class="hljs-keyword">var</span> <span class="hljs-keyword">value</span> = getter ? getter.call(obj) : val;
          <span class="hljs-comment">//在属性set value的时候调用!!!</span>
          <span class="hljs-keyword">if</span> (newVal === <span class="hljs-keyword">value</span>) {
            <span class="hljs-keyword">return</span>;
          }
          <span class="hljs-comment">//增加setter</span>
          <span class="hljs-keyword">if</span> (setter) {
            setter.call(obj, newVal);
          } <span class="hljs-keyword">else</span> {
            val = newVal;
          }
          childOb = observe(newVal);
          <span class="hljs-comment">//最后调用一个自己的函数</span>
          dep.notify();
        }
      });

      然后dep.notify()都做了什么呢?</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  Dep.prototype.notify = function () {
    // stablize the subscriber list first
    var subs = toArray(this.subs)
    for (var i = 0, l = subs.length; i < l; i++) {
      //对相应的数据进行更新
      subs[i].update()
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  Dep.prototype.notify = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// stablize the subscriber list first</span>
    <span class="hljs-keyword">var</span> subs = toArray(<span class="hljs-keyword">this</span>.subs)
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = subs.length; i &lt; l; i++) {
      <span class="hljs-comment">//对相应的数据进行更新</span>
      subs[i].update()
    }
  }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      dep在文档里面定义是:" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">      dep在文档里面定义是:</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //A dep is an observable that can have multiple
  //directives subscribing to it.
  export default function Dep () {
    this.id = uid++
    this.subs = []
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-comment">//A dep is an observable that can have multiple</span>
  <span class="hljs-comment">//directives subscribing to it.</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dep</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.id = uid++
    <span class="hljs-keyword">this</span>.subs = []
  }</code></pre>
<p>'dep'是维护数据的一个数组,对应着一个'watcher'对象</p>
<p>所以整个数据监听的完成是靠set给属性提供一个setter然后当数据更新时,dep会触发watcher对象,返回新值.</p>
<p>之后会有更详细解释</p>
<p>数组可能会有点麻烦，Vue.js 采取的是对几乎每一个可能改变数据的方法进行 prototype 更改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator() {
      // avoid leaking arguments:
      // http://jsperf.com/closure-with-arguments
      var i = arguments.length;
      var args = new Array(i);
      while (i--) {
        args[i] = arguments[i];
      }
      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
          inserted = args;
          break;
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          inserted = args.slice(2);
          break;
      }
      if (inserted) ob.observeArray(inserted);
      // notify change
      ob.dep.notify();
      return result;
    });
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>;[<span class="hljs-string">'push'</span>, <span class="hljs-string">'pop'</span>, <span class="hljs-string">'shift'</span>, <span class="hljs-string">'unshift'</span>, <span class="hljs-string">'splice'</span>, <span class="hljs-string">'sort'</span>, <span class="hljs-string">'reverse'</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">method</span>) </span>{
    <span class="hljs-comment">// cache original method</span>
    <span class="hljs-keyword">var</span> original = arrayProto[method];
    def(arrayMethods, method, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mutator</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// avoid leaking arguments:</span>
      <span class="hljs-comment">// http://jsperf.com/closure-with-arguments</span>
      <span class="hljs-keyword">var</span> i = <span class="hljs-built_in">arguments</span>.length;
      <span class="hljs-keyword">var</span> args = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(i);
      <span class="hljs-keyword">while</span> (i--) {
        args[i] = <span class="hljs-built_in">arguments</span>[i];
      }
      <span class="hljs-keyword">var</span> result = original.apply(<span class="hljs-keyword">this</span>, args);
      <span class="hljs-keyword">var</span> ob = <span class="hljs-keyword">this</span>.__ob__;
      <span class="hljs-keyword">var</span> inserted;
      <span class="hljs-keyword">switch</span> (method) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'push'</span>:
          inserted = args;
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'unshift'</span>:
          inserted = args;
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'splice'</span>:
          inserted = args.slice(<span class="hljs-number">2</span>);
          <span class="hljs-keyword">break</span>;
      }
      <span class="hljs-keyword">if</span> (inserted) ob.observeArray(inserted);
      <span class="hljs-comment">// notify change</span>
      ob.dep.notify();
      <span class="hljs-keyword">return</span> result;
    });
  });
</code></pre>
<p>同时 Vue.js 提供了两个额外的“糖方法” $set 和 $remove 来弥补这方面限制带来的不便。</p>
<p>但这个策略主要面临两个问题：</p>
<p>无法监听数据的 length，导致 arr.length 这样的数据改变无法被监听<br>通过角标更改数据，即类似 arr[2] = 1 这样的赋值操作，也无法被监听</p>
<p>为此 Vue.js 在文档中明确提示不建议直接角标修改数据</p>
<p>"实例计算属性。getter 和 setter 的 this 自动地绑定到实例。"</p>
<p>举个栗子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 仅读取，值只须为函数
    b: function () {
      return this.a * 2
    },
    // 读取和设置
    c: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }
  })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  data: { a: <span class="hljs-number">1</span> },
  computed: {
    <span class="hljs-comment">// 仅读取，值只须为函数</span>
    b: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a * <span class="hljs-number">2</span>
    },
    <span class="hljs-comment">// 读取和设置</span>
    c: {
      <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + <span class="hljs-number">1</span>
      },
      <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(v)</span> </span>{
        <span class="hljs-keyword">this</span>.a = v - <span class="hljs-number">1</span>
      }
    }
  }
  })
</code></pre>
<p>可以看出来computed可以提供自定义一个属性c的getter和setter/b的getter,问题是c和b怎么维护和a的关系</p>
<p>下面是computed怎么提供属性setter和getter的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //初始化computed
  ...
  var userDef = computed[key];
  //userDef指的是computed属性,this -> computed
  def.get = makeComputedGetter(userDef, this);
  //或者makeComputedGetter(userDef.get, this)
  ...
  function makeComputedGetter(getter, owner) {
      var watcher = new Watcher(owner, getter, null, {
        lazy: true
      });
      return function computedGetter() {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value;
      };
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>  <span class="hljs-comment">//初始化computed</span>
  ...
  <span class="hljs-built_in">var</span> userDef = computed[key];
  <span class="hljs-comment">//userDef指的是computed属性,this -&gt; computed</span>
  def.get = makeComputedGetter(userDef, <span class="hljs-keyword">this</span>);
  <span class="hljs-comment">//或者makeComputedGetter(userDef.get, this)</span>
  ...
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeComputedGetter</span>(<span class="hljs-params">getter, owner</span>) </span>{
      <span class="hljs-built_in">var</span> watcher = <span class="hljs-keyword">new</span> Watcher(owner, getter, <span class="hljs-literal">null</span>, {
        <span class="hljs-attribute">lazy</span>: <span class="hljs-literal">true</span>
      });
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">computedGetter</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (watcher.dirty) {
          watcher.evaluate();
        }
        <span class="hljs-keyword">if</span> (Dep.target) {
          watcher.depend();
        }
        <span class="hljs-keyword">return</span> watcher.value;
      };
    }</code></pre>
<p>computed在建立的时候绑定一个对应的 watcher 对象，在计算过程中它把属性记录为依赖。之后当依赖的 setter 被调用时，会触发 watcher 重新计算 ，也就会导致它的关联指令更新 DOM。</p>
<h3 id="articleHeader3">视图解析过程</h3>
<h3 id="articleHeader4">解析器</h3>
<p>parsers/path.js 主要的职责是可以把一个 JSON 数据里的某一个“路径”下的数据取出来，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = 'a.b[1].v'
var obj = {
  a: {
    b: [
      {v: 1},
      {v: 2},
      {v: 3}
    ]
  }
}
parse(obj, path) // 2

var pathStateMachine = []

pathStateMachine[BEFORE_PATH] = {
  'ws': [BEFORE_PATH],
  'ident': [IN_IDENT, APPEND],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
}

pathStateMachine[IN_PATH] = {
  'ws': [IN_PATH],
  '.': [BEFORE_IDENT],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
}

pathStateMachine[BEFORE_IDENT] = {
  'ws': [BEFORE_IDENT],
  'ident': [IN_IDENT, APPEND]
}

pathStateMachine[IN_IDENT] = {
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND],
  'ws': [IN_PATH, PUSH],
  '.': [BEFORE_IDENT, PUSH],
  '[': [IN_SUB_PATH, PUSH],
  'eof': [AFTER_PATH, PUSH]
}

pathStateMachine[IN_SUB_PATH] = {
  &quot;'&quot;: [IN_SINGLE_QUOTE, APPEND],
  '&quot;': [IN_DOUBLE_QUOTE, APPEND],
  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
  ']': [IN_PATH, PUSH_SUB_PATH],
  'eof': ERROR,
  'else': [IN_SUB_PATH, APPEND]
}

pathStateMachine[IN_SINGLE_QUOTE] = {
  &quot;'&quot;: [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_SINGLE_QUOTE, APPEND]
}

pathStateMachine[IN_DOUBLE_QUOTE] = {
  '&quot;': [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_DOUBLE_QUOTE, APPEND]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var path = <span class="hljs-string">'a.b[1].v'</span>
var obj = {
  a: {
    b: [
      {v: <span class="hljs-number">1</span>},
      {v: <span class="hljs-number">2</span>},
      {v: <span class="hljs-number">3</span>}
    ]
  }
}
parse(obj, path) // <span class="hljs-number">2</span>

var pathStateMachine = []

pathStateMachine[<span class="hljs-symbol">BEFORE_PATH</span>] = {
  <span class="hljs-string">'ws'</span>: [<span class="hljs-symbol">BEFORE_PATH</span>],
  <span class="hljs-string">'ident'</span>: [<span class="hljs-symbol">IN_IDENT</span>, <span class="hljs-symbol">APPEND</span>],
  <span class="hljs-string">'['</span>: [<span class="hljs-symbol">IN_SUB_PATH</span>],
  <span class="hljs-string">'eof'</span>: [<span class="hljs-symbol">AFTER_PATH</span>]
}

pathStateMachine[<span class="hljs-symbol">IN_PATH</span>] = {
  <span class="hljs-string">'ws'</span>: [<span class="hljs-symbol">IN_PATH</span>],
  <span class="hljs-string">'.'</span>: [<span class="hljs-symbol">BEFORE_IDENT</span>],
  <span class="hljs-string">'['</span>: [<span class="hljs-symbol">IN_SUB_PATH</span>],
  <span class="hljs-string">'eof'</span>: [<span class="hljs-symbol">AFTER_PATH</span>]
}

pathStateMachine[<span class="hljs-symbol">BEFORE_IDENT</span>] = {
  <span class="hljs-string">'ws'</span>: [<span class="hljs-symbol">BEFORE_IDENT</span>],
  <span class="hljs-string">'ident'</span>: [<span class="hljs-symbol">IN_IDENT</span>, <span class="hljs-symbol">APPEND</span>]
}

pathStateMachine[<span class="hljs-symbol">IN_IDENT</span>] = {
  <span class="hljs-string">'ident'</span>: [<span class="hljs-symbol">IN_IDENT</span>, <span class="hljs-symbol">APPEND</span>],
  <span class="hljs-string">'0'</span>: [<span class="hljs-symbol">IN_IDENT</span>, <span class="hljs-symbol">APPEND</span>],
  <span class="hljs-string">'number'</span>: [<span class="hljs-symbol">IN_IDENT</span>, <span class="hljs-symbol">APPEND</span>],
  <span class="hljs-string">'ws'</span>: [<span class="hljs-symbol">IN_PATH</span>, <span class="hljs-symbol">PUSH</span>],
  <span class="hljs-string">'.'</span>: [<span class="hljs-symbol">BEFORE_IDENT</span>, <span class="hljs-symbol">PUSH</span>],
  <span class="hljs-string">'['</span>: [<span class="hljs-symbol">IN_SUB_PATH</span>, <span class="hljs-symbol">PUSH</span>],
  <span class="hljs-string">'eof'</span>: [<span class="hljs-symbol">AFTER_PATH</span>, <span class="hljs-symbol">PUSH</span>]
}

pathStateMachine[<span class="hljs-symbol">IN_SUB_PATH</span>] = {
  <span class="hljs-string">"'"</span>: [<span class="hljs-symbol">IN_SINGLE_QUOTE</span>, <span class="hljs-symbol">APPEND</span>],
  <span class="hljs-string">'"'</span>: [<span class="hljs-symbol">IN_DOUBLE_QUOTE</span>, <span class="hljs-symbol">APPEND</span>],
  <span class="hljs-string">'['</span>: [<span class="hljs-symbol">IN_SUB_PATH</span>, <span class="hljs-symbol">INC_SUB_PATH_DEPTH</span>],
  <span class="hljs-string">']'</span>: [<span class="hljs-symbol">IN_PATH</span>, <span class="hljs-symbol">PUSH_SUB_PATH</span>],
  <span class="hljs-string">'eof'</span>: <span class="hljs-symbol">ERROR</span>,
  <span class="hljs-string">'else'</span>: [<span class="hljs-symbol">IN_SUB_PATH</span>, <span class="hljs-symbol">APPEND</span>]
}

pathStateMachine[<span class="hljs-symbol">IN_SINGLE_QUOTE</span>] = {
  <span class="hljs-string">"'"</span>: [<span class="hljs-symbol">IN_SUB_PATH</span>, <span class="hljs-symbol">APPEND</span>],
  <span class="hljs-string">'eof'</span>: <span class="hljs-symbol">ERROR</span>,
  <span class="hljs-string">'else'</span>: [<span class="hljs-symbol">IN_SINGLE_QUOTE</span>, <span class="hljs-symbol">APPEND</span>]
}

pathStateMachine[<span class="hljs-symbol">IN_DOUBLE_QUOTE</span>] = {
  <span class="hljs-string">'"'</span>: [<span class="hljs-symbol">IN_SUB_PATH</span>, <span class="hljs-symbol">APPEND</span>],
  <span class="hljs-string">'eof'</span>: <span class="hljs-symbol">ERROR</span>,
  <span class="hljs-string">'else'</span>: [<span class="hljs-symbol">IN_DOUBLE_QUOTE</span>, <span class="hljs-symbol">APPEND</span>]
}
</code></pre>
<p>状态机可以完成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.dom结构中"{{"data.someObj"}}"的解析;
2.对字符型json的取值;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code><span class="hljs-number">1</span>.dom结构中"{{"data.someObj"}}"的解析<span class="hljs-comment">;</span>
<span class="hljs-number">2</span>.对字符型json的取值<span class="hljs-comment">;</span>
</code></pre>
<p>可惜大学里面的编译原理我给忘记了,否则可以给大家解析一下.</p>
<h4>视图解析过程</h4>
<p>视图的解析过程，Vue.js 的策略是把 element 或 template string 先统一转换成 document fragment，然后再分解和解析其中的子组件和 directives。</p>
<p>相比React的visual DOM有一定的性能优化空间，毕竟 DOM 操作相比纯 JavaScript 运算还是会慢一些。</p>
<h3 id="articleHeader5">Vue扩展</h3>
<h4>Mixin</h4>
<p>Mixin (混入) 是一种可以在多个 Vue 组件之间灵活复用特性的机制。你可以像写一个普通 Vue 组件的选项对象一样编写一个 mixin：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.hello()
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-attr">hello</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello from mixin!'</span>)
    }
  }
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// test.js
var myMixin = require('./mixin')
var Component = Vue.extend({
  mixins: [myMixin]
})
var component = new Component() // -> &quot;hello from mixin!&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// test.js</span>
<span class="hljs-selector-tag">var</span> myMixin = require(<span class="hljs-string">'./mixin'</span>)
<span class="hljs-selector-tag">var</span> Component = Vue.extend({
  mixins: [myMixin]
})
<span class="hljs-selector-tag">var</span> component = new Component() <span class="hljs-comment">// -&gt; "hello from mixin!"</span>
</code></pre>
<h4>Vue插件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue插件类型分为以下几种:

1.添加一个或几个全局方法。比如 vue-element
2.添加一个或几个全局资源：指令、过滤器、动画效果等。比如
vue-touch
3.通过绑定到 Vue.prototype 的方式添加一些 Vue 实例方法。这里有个约定，就是 Vue 的实例方法应该带有 $ 前缀，这样就不会和用户的数据和方法产生冲突了。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-type">Vue</span>插件类型分为以下几种:

<span class="hljs-number">1.</span>添加一个或几个全局方法。比如 vue-element
<span class="hljs-number">2.</span>添加一个或几个全局资源：指令、过滤器、动画效果等。比如
<span class="hljs-title">vue</span>-touch
<span class="hljs-number">3.</span>通过绑定到 <span class="hljs-type">Vue</span>.proto<span class="hljs-keyword">type</span> 的方式添加一些 <span class="hljs-type">Vue</span> 实例方法。这里有个约定，就是 <span class="hljs-type">Vue</span> 的实例方法应该带有 $ 前缀，这样就不会和用户的数据和方法产生冲突了。
</code></pre>
<h5>开发Vue插件</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPlugin.install = function (Vue, options) {
// 1. 添加全局方法或属性
Vue.myGlobalMethod = ...
// 2. 添加全局资源
Vue.directive('my-directive', {})
// 3. 添加实例方法
Vue.prototype.$myMethod = ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>MyPlugin<span class="hljs-selector-class">.install</span> = function (Vue, options) {
<span class="hljs-comment">// 1. 添加全局方法或属性</span>
Vue<span class="hljs-selector-class">.myGlobalMethod</span> = ...
<span class="hljs-comment">// 2. 添加全局资源</span>
Vue.directive(<span class="hljs-string">'my-directive'</span>, {})
<span class="hljs-comment">// 3. 添加实例方法</span>
Vue<span class="hljs-selector-class">.prototype</span>.<span class="hljs-variable">$myMethod</span> = ...
}
</code></pre>
<h5>使用Vue插件</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vueTouch = require('vue-touch')
// use the plugin globally
Vue.use(vueTouch)
你也可以向插件里传递额外的选项：

Vue.use(require('my-plugin'), {
/* pass in additional options */
})

全局方法:
Vue.fun()
局部方法:
vm.$fun()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> vueTouch = require(<span class="hljs-string">'vue-touch'</span>)
<span class="hljs-comment">// use the plugin globally</span>
Vue.use(vueTouch)
你也可以向插件里传递额外的选项：

Vue.use(require(<span class="hljs-string">'my-plugin'</span>), {
<span class="hljs-comment">/* pass in additional options */</span>
})

全局方法:
Vue.<span class="hljs-keyword">fun</span>()
局部方法:
vm.$<span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>
</code></pre>
<h4>Vue指令</h4>
<p>Vue.js 允许注册自定义指令，实质上是开放 Vue 一些技巧：怎样将数据的变化映射到 DOM 的行为。你可以使用 Vue.directive(id, definition) 的方法传入指令 id 和定义对象来注册一个全局自定义指令。定义对象需要提供一些钩子函数：<br>bind： 仅调用一次，当指令第一次绑定元素的时候。<br>update： 第一次是紧跟在 bind 之后调用，获得的参数是绑定的初始值；以后每当绑定的值发生变化就会被调用，获得新值与旧值两个参数。<br>unbind：仅调用一次，当指令解绑元素的时候。</p>
<p>一旦注册好自定义指令，你就可以在 Vue.js 模板中像这样来使用它（需要添加 Vue.js 的指令前缀，默认为 <code>v-</code>）：</p>
<p><code>&lt;div v-my-directive="someValue"&gt;&lt;/div&gt;</code></p>
<p>如果你只需要 <code>update</code> 函数，你可以只传入一个函数，而不用传定义对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 这个函数会被作为 update() 函数使用
})```

所有的钩子函数会被复制到实际的**指令对象**中，而这个指令对象将会是所有钩子函数的 `this` 上下文环境。指令对象上暴露了一些有用的公开属性：

- **el**： 指令绑定的元素
- **vm**： 拥有该指令的上下文 ViewModel
- **expression**： 指令的表达式，不包括参数和过滤器
- **arg**： 指令的参数
- **raw**： 未被解析的原始表达式
- **name**： 不带前缀的指令名

>这些属性是只读的，不要修改它们。你也可以给指令对象附加自定义的属性，但是注意不要覆盖已有的内部属性。

使用指令对象属性的示例：

`<div id=&quot;demo&quot; v-demo=&quot;LightSlateGray : msg&quot;></div>`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-code">  // 这个函数会被作为 update() 函数使用</span>
})<span class="hljs-code">```</span>

所有的钩子函数会被复制到实际的*<span class="hljs-strong">*指令对象*</span><span class="hljs-strong">*中，而这个指令对象将会是所有钩子函数的 `this` 上下文环境。指令对象上暴露了一些有用的公开属性：

</span><span class="hljs-bullet">- </span>*<span class="hljs-strong">*el*</span><span class="hljs-strong">*： 指令绑定的元素
- *</span><span class="hljs-strong">*vm*</span><span class="hljs-strong">*： 拥有该指令的上下文 ViewModel
- *</span><span class="hljs-strong">*expression*</span><span class="hljs-strong">*： 指令的表达式，不包括参数和过滤器
- *</span><span class="hljs-strong">*arg*</span><span class="hljs-strong">*： 指令的参数
- *</span><span class="hljs-strong">*raw*</span><span class="hljs-strong">*： 未被解析的原始表达式
- *</span><span class="hljs-strong">*name*</span><span class="hljs-strong">*： 不带前缀的指令名

</span>&gt;这些属性是只读的，不要修改它们。你也可以给指令对象附加自定义的属性，但是注意不要覆盖已有的内部属性。

使用指令对象属性的示例：

<span class="hljs-code">`&lt;div id="demo" v-demo="LightSlateGray : msg"&gt;&lt;/div&gt;`</span>
</code></pre>
<p>bind: function () {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.el.style.color = '#fff'
this.el.style.backgroundColor = this.arg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>this<span class="hljs-selector-class">.el</span><span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.color</span> = <span class="hljs-string">'#fff'</span>
this<span class="hljs-selector-class">.el</span><span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.backgroundColor</span> = this.arg</code></pre>
<p>},<br>  update: function (value) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.el.innerHTML =
  'name - '       + this.name + '<br>' +
  'raw - '        + this.raw + '<br>' +
  'expression - ' + this.expression + '<br>' +
  'argument - '   + this.arg + '<br>' +
  'value - '      + value" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>this<span class="hljs-selector-class">.el</span><span class="hljs-selector-class">.innerHTML</span> =
  <span class="hljs-string">'name - '</span>       + this<span class="hljs-selector-class">.name</span> + <span class="hljs-string">'&lt;br&gt;'</span> +
  <span class="hljs-string">'raw - '</span>        + this<span class="hljs-selector-class">.raw</span> + <span class="hljs-string">'&lt;br&gt;'</span> +
  <span class="hljs-string">'expression - '</span> + this<span class="hljs-selector-class">.expression</span> + <span class="hljs-string">'&lt;br&gt;'</span> +
  <span class="hljs-string">'argument - '</span>   + this<span class="hljs-selector-class">.arg</span> + <span class="hljs-string">'&lt;br&gt;'</span> +
  <span class="hljs-string">'value - '</span>      + value</code></pre>
<p>}<br>})<br>var demo = new Vue({<br>  el: '#demo',<br>  data: {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="msg: 'hello!'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">msg:</span> <span class="hljs-string">'hello!'</span></code></pre>
<p>}<br>})<code>`</code></p>
<p><strong>Result</strong></p>
<ul>
<li>name - demo</li>
<li>raw - LightSlateGray：msg</li>
<li>expression - msg</li>
<li>argument - LightSlateGray</li>
<li>value - hello!</li>
</ul>
<h3 id="articleHeader6">多重从句</h3>
<p>同一个特性内部，逗号分隔的多个从句将被绑定为多个指令实例。在下面的例子中，指令会被创建和调用两次：</p>
<p><code>&lt;div v-demo="color: 'white', text: 'hello!'"&gt;&lt;/div&gt;</code></p>
<p>如果想要用单个指令实例处理多个参数，可以利用字面量对象作为表达式：</p>
<p><code>&lt;div v-demo="{color: 'white', text: 'hello!'}"&gt;&lt;/div&gt;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  console.log(value) // Object {color: 'white', text: 'hello!'}
})```

## 字面指令

如果在创建自定义指令的时候传入 `isLiteral: true`，那么特性值就会被看成直接字符串，并被赋值给该指令的 `expression`。字面指令不会试图建立数据监视。

**Example**：

`<div v-literal-dir=&quot;foo&quot;></div>`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  console.log(value) <span class="hljs-comment">// Object {color: 'white', text: 'hello!'}</span>
})```

## 字面指令

如果在创建自定义指令的时候传入 `isLiteral: true`，那么特性值就会被看成直接字符串，并被赋值给该指令的 `expression`。字面指令不会试图建立数据监视。

**Example**：

`&lt;div v-literal-dir=<span class="hljs-string">"foo"</span>&gt;&lt;/div&gt;`
</code></pre>
<p>isLiteral: true,<br>  bind: function () {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(this.expression) // 'foo'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">this</span>.expression) <span class="hljs-comment">// 'foo'</span></code></pre>
<p>}<br>})<code>`</code></p>
<h3 id="articleHeader7">动态字面指令</h3>
<p>然而，在字面指令含有 <code>Mustache</code> 标签的情形下，指令的行为如下：</p>
<ul>
<li>指令实例会有一个属性，<code>this._isDynamicLiteral</code> 被设为 <code>true</code>；</li>
<li>如果没有提供 <code>update</code> 函数，<code>Mustache</code> 表达式只会被求值一次，并将该值赋给 <code>this.expression</code> 。不会对表达式进行数据监视。</li>
<li>如果提供了 <code>update</code> 函数，指令将会为表达式建立一个数据监视，并且在计算结果变化的时候调用 <code>update</code>。</li>
</ul>
<h2 id="articleHeader8">双向指令</h2>
<p>如果你的指令想向 Vue 实例写回数据，你需要传入 <code>twoWay: true</code> 。该选项允许在指令中使用 <code>this.set(value)</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  twoWay: true,
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
})```

## 内联语句

传入 `acceptStatement: true` 可以让自定义指令像 `v-on` 一样接受内联语句：

`<div v-my-directive=&quot;a++&quot;></div>`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  twoWay: <span class="hljs-literal">true</span>,
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
})<span class="hljs-string">``</span><span class="hljs-string">`

## 内联语句

传入 `</span>acceptStatement: <span class="hljs-literal">true</span><span class="hljs-string">` 可以让自定义指令像 `</span>v-on<span class="hljs-string">` 一样接受内联语句：

`</span>&lt;div v-my-directive=<span class="hljs-string">"a++"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-string">`
</span></code></pre>
<p>acceptStatement: true,<br>  update: function (fn) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// the passed in value is a function which when called,
// will execute the &quot;a++&quot; statement in the owner vm's
// scope." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>// <span class="hljs-keyword">the</span> passed <span class="hljs-keyword">in</span> <span class="hljs-built_in">value</span> is <span class="hljs-keyword">a</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">which</span> <span class="hljs-title">when</span> <span class="hljs-title">called</span>,</span><span class="hljs-comment">
// will execute the "a++" statement in the owner vm's</span><span class="hljs-comment">
// scope.</span></code></pre>
<p>}<br>})<code>`</code></p>
<p>但是请明智地使用此功能，因为通常我们希望避免在模板中产生副作用。</p>
<h2 id="articleHeader9">深度数据观察</h2>
<p>如果你希望在一个对象上使用自定义指令，并且当对象内部嵌套的属性发生变化时也能够触发指令的 <code>update</code> 函数，那么你就要在指令的定义中传入 <code>deep: true</code>。</p>
<p><code>&lt;div v-my-directive="obj"&gt;&lt;/div&gt;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  deep: true,
  update: function (obj) {
    // 当 obj 内部嵌套的属性变化时也会调用此函数
  }
})```

## 指令优先级

你可以选择给指令提供一个优先级数（默认是 0）。同一个元素上优先级越高的指令会比其他的指令处理得早一些。优先级一样的指令会按照其在元素特性列表中出现的顺序依次处理，但是不能保证这个顺序在不同的浏览器中是一致的。

通常来说作为用户，你并不需要关心内置指令的优先级，如果你感兴趣的话，可以参阅源码。逻辑控制指令 `v-repeat`， `v-if` 被视为 “终结性指令”，它们在编译过程中始终拥有最高的优先级。

## 元素指令

有时候，我们可能想要我们的指令可以以自定义元素的形式被使用，而不是作为一个特性。这与 `Angular` 的 `E` 类指令的概念非常相似。元素指令可以看做是一个轻量的自定义组件（后面会讲到）。你可以像下面这样注册一个自定义的元素指令：
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  deep: true,
  update: function (obj) {
    <span class="hljs-comment">// 当 obj 内部嵌套的属性变化时也会调用此函数</span>
  }
})```

## 指令优先级

你可以选择给指令提供一个优先级数（默认是 <span class="hljs-number">0</span>）。同一个元素上优先级越高的指令会比其他的指令处理得早一些。优先级一样的指令会按照其在元素特性列表中出现的顺序依次处理，但是不能保证这个顺序在不同的浏览器中是一致的。

通常来说作为用户，你并不需要关心内置指令的优先级，如果你感兴趣的话，可以参阅源码。逻辑控制指令 `v-repeat`， `v-<span class="hljs-keyword">if</span>` 被视为 “终结性指令”，它们在编译过程中始终拥有最高的优先级。

## 元素指令

有时候，我们可能想要我们的指令可以以自定义元素的形式被使用，而不是作为一个特性。这与 `Angular` 的 `E` 类指令的概念非常相似。元素指令可以看做是一个轻量的自定义组件（后面会讲到）。你可以像下面这样注册一个自定义的元素指令：
</code></pre>
<p>// 和普通指令的 API 一致<br>  bind: function () {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 对 this.el 进行操作..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">// 对 this.el 进行操作...</span></code></pre>
<p>}<br>})</p>
<h3 id="articleHeader10">Vue扩展</h3>
<h4>Mixin</h4>
<p>Mixin (混入) 是一种可以在多个 Vue 组件之间灵活复用特性的机制。你可以像写一个普通 Vue 组件的选项对象一样编写一个 mixin：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.hello()
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-attr">hello</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello from mixin!'</span>)
    }
  }
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// test.js
var myMixin = require('./mixin')
var Component = Vue.extend({
  mixins: [myMixin]
})
var component = new Component() // -> &quot;hello from mixin!&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// test.js</span>
<span class="hljs-selector-tag">var</span> myMixin = require(<span class="hljs-string">'./mixin'</span>)
<span class="hljs-selector-tag">var</span> Component = Vue.extend({
  mixins: [myMixin]
})
<span class="hljs-selector-tag">var</span> component = new Component() <span class="hljs-comment">// -&gt; "hello from mixin!"</span>
</code></pre>
<h4>Vue插件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue插件类型分为以下几种:

1.添加一个或几个全局方法。比如 vue-element
2.添加一个或几个全局资源：指令、过滤器、动画效果等。比如
vue-touch
3.通过绑定到 Vue.prototype 的方式添加一些 Vue 实例方法。这里有个约定，就是 Vue 的实例方法应该带有 $ 前缀，这样就不会和用户的数据和方法产生冲突了。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-type">Vue</span>插件类型分为以下几种:

<span class="hljs-number">1.</span>添加一个或几个全局方法。比如 vue-element
<span class="hljs-number">2.</span>添加一个或几个全局资源：指令、过滤器、动画效果等。比如
<span class="hljs-title">vue</span>-touch
<span class="hljs-number">3.</span>通过绑定到 <span class="hljs-type">Vue</span>.proto<span class="hljs-keyword">type</span> 的方式添加一些 <span class="hljs-type">Vue</span> 实例方法。这里有个约定，就是 <span class="hljs-type">Vue</span> 的实例方法应该带有 $ 前缀，这样就不会和用户的数据和方法产生冲突了。
</code></pre>
<h5>开发Vue插件</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPlugin.install = function (Vue, options) {
// 1. 添加全局方法或属性
Vue.myGlobalMethod = ...
// 2. 添加全局资源
Vue.directive('my-directive', {})
// 3. 添加实例方法
Vue.prototype.$myMethod = ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>MyPlugin<span class="hljs-selector-class">.install</span> = function (Vue, options) {
<span class="hljs-comment">// 1. 添加全局方法或属性</span>
Vue<span class="hljs-selector-class">.myGlobalMethod</span> = ...
<span class="hljs-comment">// 2. 添加全局资源</span>
Vue.directive(<span class="hljs-string">'my-directive'</span>, {})
<span class="hljs-comment">// 3. 添加实例方法</span>
Vue<span class="hljs-selector-class">.prototype</span>.<span class="hljs-variable">$myMethod</span> = ...
}
</code></pre>
<h5>使用Vue插件</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vueTouch = require('vue-touch')
// use the plugin globally
Vue.use(vueTouch)
你也可以向插件里传递额外的选项：

Vue.use(require('my-plugin'), {
/* pass in additional options */
})

全局方法:
Vue.fun()
局部方法:
vm.$fun()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> vueTouch = require(<span class="hljs-string">'vue-touch'</span>)
<span class="hljs-comment">// use the plugin globally</span>
Vue.use(vueTouch)
你也可以向插件里传递额外的选项：

Vue.use(require(<span class="hljs-string">'my-plugin'</span>), {
<span class="hljs-comment">/* pass in additional options */</span>
})

全局方法:
Vue.<span class="hljs-keyword">fun</span>()
局部方法:
vm.$<span class="hljs-function"><span class="hljs-title">fun</span><span class="hljs-params">()</span></span>
</code></pre>
<h4>Vue指令</h4>
<p>Vue.js 允许注册自定义指令，实质上是开放 Vue 一些技巧：怎样将数据的变化映射到 DOM 的行为。你可以使用 Vue.directive(id, definition) 的方法传入指令 id 和定义对象来注册一个全局自定义指令。定义对象需要提供一些钩子函数：<br>bind： 仅调用一次，当指令第一次绑定元素的时候。<br>update： 第一次是紧跟在 bind 之后调用，获得的参数是绑定的初始值；以后每当绑定的值发生变化就会被调用，获得新值与旧值两个参数。<br>unbind：仅调用一次，当指令解绑元素的时候。</p>
<p>一旦注册好自定义指令，你就可以在 Vue.js 模板中像这样来使用它（需要添加 Vue.js 的指令前缀，默认为 <code>v-</code>）：</p>
<p><code>&lt;div v-my-directive="someValue"&gt;&lt;/div&gt;</code></p>
<p>如果你只需要 <code>update</code> 函数，你可以只传入一个函数，而不用传定义对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 这个函数会被作为 update() 函数使用
})```

所有的钩子函数会被复制到实际的**指令对象**中，而这个指令对象将会是所有钩子函数的 `this` 上下文环境。指令对象上暴露了一些有用的公开属性：

- **el**： 指令绑定的元素
- **vm**： 拥有该指令的上下文 ViewModel
- **expression**： 指令的表达式，不包括参数和过滤器
- **arg**： 指令的参数
- **raw**： 未被解析的原始表达式
- **name**： 不带前缀的指令名

>这些属性是只读的，不要修改它们。你也可以给指令对象附加自定义的属性，但是注意不要覆盖已有的内部属性。

使用指令对象属性的示例：

`<div id=&quot;demo&quot; v-demo=&quot;LightSlateGray : msg&quot;></div>`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-code">  // 这个函数会被作为 update() 函数使用</span>
})<span class="hljs-code">```</span>

所有的钩子函数会被复制到实际的*<span class="hljs-strong">*指令对象*</span><span class="hljs-strong">*中，而这个指令对象将会是所有钩子函数的 `this` 上下文环境。指令对象上暴露了一些有用的公开属性：

</span><span class="hljs-bullet">- </span>*<span class="hljs-strong">*el*</span><span class="hljs-strong">*： 指令绑定的元素
- *</span><span class="hljs-strong">*vm*</span><span class="hljs-strong">*： 拥有该指令的上下文 ViewModel
- *</span><span class="hljs-strong">*expression*</span><span class="hljs-strong">*： 指令的表达式，不包括参数和过滤器
- *</span><span class="hljs-strong">*arg*</span><span class="hljs-strong">*： 指令的参数
- *</span><span class="hljs-strong">*raw*</span><span class="hljs-strong">*： 未被解析的原始表达式
- *</span><span class="hljs-strong">*name*</span><span class="hljs-strong">*： 不带前缀的指令名

</span>&gt;这些属性是只读的，不要修改它们。你也可以给指令对象附加自定义的属性，但是注意不要覆盖已有的内部属性。

使用指令对象属性的示例：

<span class="hljs-code">`&lt;div id="demo" v-demo="LightSlateGray : msg"&gt;&lt;/div&gt;`</span>
</code></pre>
<p>bind: function () {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.el.style.color = '#fff'
this.el.style.backgroundColor = this.arg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>this<span class="hljs-selector-class">.el</span><span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.color</span> = <span class="hljs-string">'#fff'</span>
this<span class="hljs-selector-class">.el</span><span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.backgroundColor</span> = this.arg</code></pre>
<p>},<br>  update: function (value) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.el.innerHTML =
  'name - '       + this.name + '<br>' +
  'raw - '        + this.raw + '<br>' +
  'expression - ' + this.expression + '<br>' +
  'argument - '   + this.arg + '<br>' +
  'value - '      + value" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>this<span class="hljs-selector-class">.el</span><span class="hljs-selector-class">.innerHTML</span> =
  <span class="hljs-string">'name - '</span>       + this<span class="hljs-selector-class">.name</span> + <span class="hljs-string">'&lt;br&gt;'</span> +
  <span class="hljs-string">'raw - '</span>        + this<span class="hljs-selector-class">.raw</span> + <span class="hljs-string">'&lt;br&gt;'</span> +
  <span class="hljs-string">'expression - '</span> + this<span class="hljs-selector-class">.expression</span> + <span class="hljs-string">'&lt;br&gt;'</span> +
  <span class="hljs-string">'argument - '</span>   + this<span class="hljs-selector-class">.arg</span> + <span class="hljs-string">'&lt;br&gt;'</span> +
  <span class="hljs-string">'value - '</span>      + value</code></pre>
<p>}<br>})<br>var demo = new Vue({<br>  el: '#demo',<br>  data: {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="msg: 'hello!'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">msg:</span> <span class="hljs-string">'hello!'</span></code></pre>
<p>}<br>})<code>`</code></p>
<p><strong>Result</strong></p>
<ul>
<li>name - demo</li>
<li>raw - LightSlateGray：msg</li>
<li>expression - msg</li>
<li>argument - LightSlateGray</li>
<li>value - hello!</li>
</ul>
<h3 id="articleHeader11">多重从句</h3>
<p>同一个特性内部，逗号分隔的多个从句将被绑定为多个指令实例。在下面的例子中，指令会被创建和调用两次：</p>
<p><code>&lt;div v-demo="color: 'white', text: 'hello!'"&gt;&lt;/div&gt;</code></p>
<p>如果想要用单个指令实例处理多个参数，可以利用字面量对象作为表达式：</p>
<p><code>&lt;div v-demo="{color: 'white', text: 'hello!'}"&gt;&lt;/div&gt;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  console.log(value) // Object {color: 'white', text: 'hello!'}
})```

## 字面指令

如果在创建自定义指令的时候传入 `isLiteral: true`，那么特性值就会被看成直接字符串，并被赋值给该指令的 `expression`。字面指令不会试图建立数据监视。

**Example**：

`<div v-literal-dir=&quot;foo&quot;></div>`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  console.log(value) <span class="hljs-comment">// Object {color: 'white', text: 'hello!'}</span>
})```

## 字面指令

如果在创建自定义指令的时候传入 `isLiteral: true`，那么特性值就会被看成直接字符串，并被赋值给该指令的 `expression`。字面指令不会试图建立数据监视。

**Example**：

`&lt;div v-literal-dir=<span class="hljs-string">"foo"</span>&gt;&lt;/div&gt;`
</code></pre>
<p>isLiteral: true,<br>  bind: function () {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(this.expression) // 'foo'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">this</span>.expression) <span class="hljs-comment">// 'foo'</span></code></pre>
<p>}<br>})<code>`</code></p>
<h3 id="articleHeader12">动态字面指令</h3>
<p>然而，在字面指令含有 <code>Mustache</code> 标签的情形下，指令的行为如下：</p>
<ul>
<li>指令实例会有一个属性，<code>this._isDynamicLiteral</code> 被设为 <code>true</code>；</li>
<li>如果没有提供 <code>update</code> 函数，<code>Mustache</code> 表达式只会被求值一次，并将该值赋给 <code>this.expression</code> 。不会对表达式进行数据监视。</li>
<li>如果提供了 <code>update</code> 函数，指令将会为表达式建立一个数据监视，并且在计算结果变化的时候调用 <code>update</code>。</li>
</ul>
<h2 id="articleHeader13">双向指令</h2>
<p>如果你的指令想向 Vue 实例写回数据，你需要传入 <code>twoWay: true</code> 。该选项允许在指令中使用 <code>this.set(value)</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  twoWay: true,
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
})```

## 内联语句

传入 `acceptStatement: true` 可以让自定义指令像 `v-on` 一样接受内联语句：

`<div v-my-directive=&quot;a++&quot;></div>`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  twoWay: <span class="hljs-literal">true</span>,
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
})<span class="hljs-string">``</span><span class="hljs-string">`

## 内联语句

传入 `</span>acceptStatement: <span class="hljs-literal">true</span><span class="hljs-string">` 可以让自定义指令像 `</span>v-on<span class="hljs-string">` 一样接受内联语句：

`</span>&lt;div v-my-directive=<span class="hljs-string">"a++"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-string">`
</span></code></pre>
<p>acceptStatement: true,<br>  update: function (fn) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// the passed in value is a function which when called,
// will execute the &quot;a++&quot; statement in the owner vm's
// scope." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>// <span class="hljs-keyword">the</span> passed <span class="hljs-keyword">in</span> <span class="hljs-built_in">value</span> is <span class="hljs-keyword">a</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">which</span> <span class="hljs-title">when</span> <span class="hljs-title">called</span>,</span><span class="hljs-comment">
// will execute the "a++" statement in the owner vm's</span><span class="hljs-comment">
// scope.</span></code></pre>
<p>}<br>})<code>`</code></p>
<p>但是请明智地使用此功能，因为通常我们希望避免在模板中产生副作用。</p>
<h2 id="articleHeader14">深度数据观察</h2>
<p>如果你希望在一个对象上使用自定义指令，并且当对象内部嵌套的属性发生变化时也能够触发指令的 <code>update</code> 函数，那么你就要在指令的定义中传入 <code>deep: true</code>。</p>
<p><code>&lt;div v-my-directive="obj"&gt;&lt;/div&gt;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  deep: true,
  update: function (obj) {
    // 当 obj 内部嵌套的属性变化时也会调用此函数
  }
})```

## 指令优先级

你可以选择给指令提供一个优先级数（默认是 0）。同一个元素上优先级越高的指令会比其他的指令处理得早一些。优先级一样的指令会按照其在元素特性列表中出现的顺序依次处理，但是不能保证这个顺序在不同的浏览器中是一致的。

通常来说作为用户，你并不需要关心内置指令的优先级，如果你感兴趣的话，可以参阅源码。逻辑控制指令 `v-repeat`， `v-if` 被视为 “终结性指令”，它们在编译过程中始终拥有最高的优先级。

## 元素指令

有时候，我们可能想要我们的指令可以以自定义元素的形式被使用，而不是作为一个特性。这与 `Angular` 的 `E` 类指令的概念非常相似。元素指令可以看做是一个轻量的自定义组件（后面会讲到）。你可以像下面这样注册一个自定义的元素指令：
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  deep: true,
  update: function (obj) {
    <span class="hljs-comment">// 当 obj 内部嵌套的属性变化时也会调用此函数</span>
  }
})```

## 指令优先级

你可以选择给指令提供一个优先级数（默认是 <span class="hljs-number">0</span>）。同一个元素上优先级越高的指令会比其他的指令处理得早一些。优先级一样的指令会按照其在元素特性列表中出现的顺序依次处理，但是不能保证这个顺序在不同的浏览器中是一致的。

通常来说作为用户，你并不需要关心内置指令的优先级，如果你感兴趣的话，可以参阅源码。逻辑控制指令 `v-repeat`， `v-<span class="hljs-keyword">if</span>` 被视为 “终结性指令”，它们在编译过程中始终拥有最高的优先级。

## 元素指令

有时候，我们可能想要我们的指令可以以自定义元素的形式被使用，而不是作为一个特性。这与 `Angular` 的 `E` 类指令的概念非常相似。元素指令可以看做是一个轻量的自定义组件（后面会讲到）。你可以像下面这样注册一个自定义的元素指令：
</code></pre>
<p>// 和普通指令的 API 一致<br>  bind: function () {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 对 this.el 进行操作..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">// 对 this.el 进行操作...</span></code></pre>
<p>}<br>})</p>
<h3 id="articleHeader15">vuejs vs angularjs</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Angular Modules
angular.module('myModule', [...]);
Components
Vue.extend({
  data: function(){ return {...} },
  created: function() {...},
  ready: function() {...},
  components: {...},
  methods: {...},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-type">Angular</span> <span class="hljs-type">Modules</span>
angular.module('myModule', [...]);
<span class="hljs-type">Components</span>
<span class="hljs-type">Vue</span>.extend({
  data: function(){ <span class="hljs-keyword">return</span> <span class="hljs-meta">{...}</span> },
  created: function() <span class="hljs-meta">{...}</span>,
  ready: function() <span class="hljs-meta">{...}</span>,
  components: <span class="hljs-meta">{...}</span>,
  methods: <span class="hljs-meta">{...}</span>,
</code></pre>
<p>总体来说<br>对于Angular来说module就是一个容器,而对Vue来说一个component里面会有逻辑代码<br>在Vue里面会放进许多代码细节,并且有固定的属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Directives
Angular
myModule.directive('directiveName', function (injectables) {
  return {
    restrict: 'A',
    template: '<div></div>',
    controller: function() { ... },
    compile: function() {...},
    link: function() { ... }
    //(other props excluded)
  };
});
Vue
Vue.directive('my-directive', {
  bind: function () {...},
  update: function (newValue, oldValue) {...},
  unbind: function () {...}
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-type">Directives</span>
<span class="hljs-type">Angular</span>
myModule.directive('directiveName', function (injectables) {
  <span class="hljs-keyword">return</span> {
    restrict: 'A',
    <span class="hljs-keyword">template</span>: '&lt;<span class="hljs-keyword">div</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;',
    controller: function() { ... },
    compile: function() <span class="hljs-meta">{...}</span>,
    link: function() { ... }
    //(other props excluded)
  };
});
<span class="hljs-type">Vue</span>
<span class="hljs-type">Vue</span>.directive('my-directive', {
  <span class="hljs-keyword">bind</span>: function () <span class="hljs-meta">{...}</span>,
  update: function (newValue, oldValue) <span class="hljs-meta">{...}</span>,
  unbind: function () <span class="hljs-meta">{...}</span>
});
</code></pre>
<p>Vue的指令比Angular的简单,而Angular的指令类似Vue的component</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Filters
Angular
myModule.angular.module(‘filterName', [])
.filter('reverse', function() {
return function(input) {...};
});
Vue
Vue.filter('reverse', function (value) {
return function(value){...};
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-type">Filters</span>
<span class="hljs-type">Angular</span>
myModule.angular.module(‘filterName', [])
.filter('reverse', function() {
<span class="hljs-keyword">return</span> function(input) <span class="hljs-meta">{...}</span>;
});
<span class="hljs-type">Vue</span>
<span class="hljs-type">Vue</span>.filter('reverse', function (value) {
<span class="hljs-keyword">return</span> function(value)<span class="hljs-meta">{...}</span>;
});
</code></pre>
<p>filters都是类似的,但是Vue提供了read/wirte功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Templating
Interpolation
"{{"myVariable"}}"
Interpolation
"{{"myVariable"}}"
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mathematica"><code>Templating
<span class="hljs-keyword">Interpolation</span>
"{{"myVariable"}}"
<span class="hljs-keyword">Interpolation</span>
"{{"myVariable"}}"
</code></pre>
<p>当输出是一个对象的时候<br>Vue:[Object]<br>Angular :{[attr:value]}<br>Vue可以使用filters得到正常输出 "{{"someObject|json"}}"</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Model binding
Angular
<input type=&quot;text&quot; ng-model=&quot;myVar&quot;>
<p ng-bind=&quot;myVar&quot;></p>
Vue
<input type=&quot;text&quot; v-model=&quot;myVar&quot;>
<p v-model=&quot;myVar&quot;></p>

Loops
Angular
<li ng-repeat=&quot;item in items&quot; class=&quot;item-"{{"$index"}}"&quot;>
  "{{"item.myProperty"}}"
</li>
Vue
<li v-for=&quot;items&quot; class=&quot;item-"{{"$index"}}"&quot;>
  "{{"myProperty"}}"
</li>

Conditionals
Angular
<div ng-if=&quot;myVar&quot;></div>
<div ng-show=&quot;myVar&quot;></div>
Vue
<div v-if=&quot;myVar&quot;></div>
<div v-show=&quot;myVar&quot;></div>

Conditional classes
Angular
<div ng-class=&quot;{‘active’: myVar}&quot;></div>
Vue
<div v-class=&quot;active: myVar&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">Model binding
Angular
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">ng-model</span>=<span class="hljs-string">"myVar"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"myVar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
Vue
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"myVar"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"myVar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

Loops
Angular
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">"item in items"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item-</span></span></span><span class="hljs-template-variable">"{{"$index}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">}"</span>&gt;</span>
  </span><span class="hljs-template-variable">"{{"item.myProperty}</span><span class="xml">}
<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
Vue
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"items"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item-</span></span></span><span class="hljs-template-variable">"{{"$index}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">}"</span>&gt;</span>
  </span><span class="hljs-template-variable">"{{"myProperty}</span><span class="xml">}
<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

Conditionals
Angular
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-if</span>=<span class="hljs-string">"myVar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-show</span>=<span class="hljs-string">"myVar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
Vue
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"myVar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"myVar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

Conditional classes
Angular
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{‘active’: myVar}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
Vue
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-class</span>=<span class="hljs-string">"active: myVar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></code></pre>
<p>Vue也可以这样写v-repeat='item: items'</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Event binding
Angular
<div ng-click=&quot;myMethod($event)&quot;></div>
Vue
<div v-on=&quot;click: myMethod($event)&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>Event binding
Angular
&lt;<span class="hljs-keyword">div</span> ng-click=<span class="hljs-string">"myMethod($event)"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
Vue
&lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">on</span>=<span class="hljs-string">"click: myMethod($event)"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>通用v-on指令使事件更加一致</p>
<h4>脏值检查</h4>
<p>一个电话列表应用的例子，在其中我们会将一个phones数组中的值（在JavaScript中定义）绑定到一个列表项目中以便于我们的数据和UI保持同步：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<code><html ng-app>
  <head>
...
<script src=&quot;angular.js&quot;></script>
<script src=&quot;controller.js&quot;></script>
  </head>
  <body ng-controller=&quot;PhoneListCtrl&quot;>
<ul>
  <li ng-repeat=&quot;phone in phones&quot;>
"{{"phone.name"}}"
<p>"{{"phone.snippet"}}"</p>
  </li>
</ul>
  </body>
</html>
</code>

<code>var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function($scope) {
  $scope.phones = [
{'name': 'Nexus S',
 'snippet': 'Fast just got faster with Nexus S.'},
{'name': 'Motorola XOOM with Wi-Fi',
 'snippet': 'The Next, Next Generation tablet.'},
{'name': 'MOTOROLA XOOM',
 'snippet': 'The Next, Next Generation tablet.'}
  ];
});  
</code>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">code</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">ng-app</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
...
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"angular.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"controller.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"PhoneListCtrl"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">"phone in phones"</span>&gt;</span>
</span><span class="hljs-template-variable">"{{"phone.name}</span><span class="xml">}
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"phone.snippet}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">code</span>&gt;</span>var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function($scope) </span><span class="hljs-template-variable">{
  $scope.phones = [
{'name': 'Nexus S',
 'snippet': 'Fast just got faster with Nexus S.'}</span><span class="xml">,
</span><span class="hljs-template-variable">{'name': 'Motorola XOOM with Wi-Fi',
 'snippet': 'The Next, Next Generation tablet.'}</span><span class="xml">,
</span><span class="hljs-template-variable">{'name': 'MOTOROLA XOOM',
 'snippet': 'The Next, Next Generation tablet.'}</span><span class="xml">
  ];
});  
<span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span>
</span></code></pre>
<p>任何时候只要是底层的model数据发生了变化，我们在DOM中的列表也会跟着更新。</p>
<p>脏值检查的基本原理就是只要任何时候数据发生了变化，这个库都会通过一个digest或者change cycle去检查变化是否发生了。在Angular中，一个digest循环意味着所有所有被监视的表达式都会被循环一遍以便查看其中是否有变化发生。它智斗一个模型之前的值因此当变化发生时，一个change事件将会被触发。对于开发者来说，这带来的一大好处就是你可以使用原生的JavaScript对象数据，它易于使用及整合。下面的图片展示的是一个非常糟糕的算法，它的开销非常大。</p>
<p>这个操作的开销和被监视的对象的数量是成正比的。我可能需要做很多的脏治检查。同时当数据发生改变时,我也需要一种方式去触发脏值检查.</p>
<p>相比Angular的脏值检查,Vue的setter/getter方案使数据和DOM更新的时间复杂度降低,数据的更新只发生在数据发生改变时,数据更新的时间复杂度只和数据的观察者有关,"它们拥有一些存取器去获取数据并且能够在你设置或者获取对象时捕获到这些行为并在内部进行广播".</p>
<h4>vue的约束的模型系统</h4>
<p>而且相比Object.observer()[在es7标准中],Vue的存取方式可以做到比较好的兼容性.</p>
<h3 id="articleHeader16">Vue实现简单的watcher</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.实现observer
2.Vue消息-订阅器
3.Watcher的实现
4.实现一个Vue
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>实现observer
<span class="hljs-number">2.</span>Vue消息-订阅器
<span class="hljs-number">3.</span>Watcher的实现
<span class="hljs-number">4.</span>实现一个Vue
</code></pre>
<p>实现一个 $wacth</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const v = new Vue({
  data:{
    a:1,
    b:2
  }
})
v.$watch(&quot;a&quot;,()=>console.log(&quot;哈哈，$watch成功&quot;))
setTimeout(()=>{
  v.a = 5
},2000) //打印 哈哈，$watch成功" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>const v = new Vue({
  data:{
    <span class="hljs-selector-tag">a</span>:<span class="hljs-number">1</span>,
    <span class="hljs-selector-tag">b</span>:<span class="hljs-number">2</span>
  }
})
v.<span class="hljs-variable">$watch</span>(<span class="hljs-string">"a"</span>,()=&gt;console.log(<span class="hljs-string">"哈哈，$watch成功"</span>))
<span class="hljs-function"><span class="hljs-title">setTimeout</span><span class="hljs-params">(()</span></span>=&gt;{
  v<span class="hljs-selector-class">.a</span> = <span class="hljs-number">5</span>
},<span class="hljs-number">2000</span>) <span class="hljs-comment">//打印 哈哈，$watch成功</span></code></pre>
<p>为了帮助大家理清思路。。我们就做最简单的实现。。只考虑对象不考虑数组</p>
<h5>实现obserer</h5>
<p>将要observe的对象， 通过递归，将它所有的属性，包括子属性的属性，都给加上set和get， 这样的话，给这个对象的某个属性赋值，就会触发set。就给每个属性（包括子属性）都加上get/set， 这样的话，这个对象的，有任何赋值，就会触发set方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class  Observer{
  constructor(value) {
    this.value = value
    this.walk(value)
  }
  //递归。。让每个字属性可以observe
  walk(value){
    Object.keys(value).forEach(key=>this.convert(key,value[key]))
  }
  convert(key, val){
    defineReactive(this.value, key, val)
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>export <span class="hljs-keyword">default</span> <span class="hljs-keyword">class</span>  <span class="hljs-title">Observer</span>{
  constructor(<span class="hljs-keyword">value</span>) {
    <span class="hljs-keyword">this</span>.<span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span>
    <span class="hljs-keyword">this</span>.walk(<span class="hljs-keyword">value</span>)
  }
  <span class="hljs-comment">//递归。。让每个字属性可以observe</span>
  walk(<span class="hljs-keyword">value</span>){
    Object.keys(<span class="hljs-keyword">value</span>).forEach(key=&gt;<span class="hljs-keyword">this</span>.convert(key,<span class="hljs-keyword">value</span>[key]))
  }
  convert(key, val){
    defineReactive(<span class="hljs-keyword">this</span>.<span class="hljs-keyword">value</span>, key, val)
  }
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function defineReactive (obj, key, val) {
  var childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: ()=>val,
    set:newVal=> {      
     childOb = observe(newVal)//如果新赋值的值是个复杂类型。再递归它，加上set/get。。
     }
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> (<span class="hljs-params">obj, key, val</span>) </span>{
  <span class="hljs-keyword">var</span> childOb = observe(val)
  <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
    enumerable: <span class="hljs-literal">true</span>,
    configurable: <span class="hljs-literal">true</span>,
    <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>val,
    <span class="hljs-keyword">set</span>:<span class="hljs-function"><span class="hljs-params">newVal</span>=&gt;</span> {      
     childOb = observe(newVal)<span class="hljs-comment">//如果新赋值的值是个复杂类型。再递归它，加上set/get。。</span>
     }
  })
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function observe (value, vm) {
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observer(value)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-function">export function <span class="hljs-title">observe</span> (<span class="hljs-params"><span class="hljs-keyword">value</span>, vm</span>) </span>{
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">value</span> || <span class="hljs-keyword">typeof</span> <span class="hljs-keyword">value</span> !== <span class="hljs-string">'object'</span>) {
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Observer(<span class="hljs-keyword">value</span>)
}
</code></pre>
<h5>消息－订阅器</h5>
<p>维护一个数组，，这个数组，就放订阅着，一旦触发notify， 订阅者就调用自己的update方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub){
    this.subs.push(sub)
  }
  notify(){
    this.subs.forEach(sub=>sub.update())
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>export default class Dep {
  constructor() {
    this.subs = []
  }
  addSub(<span class="hljs-function"><span class="hljs-keyword">sub</span>)</span>{
    this.subs.push(<span class="hljs-function"><span class="hljs-keyword">sub</span>)
  }
  <span class="hljs-title">notify</span></span>(){
    this.subs.forEach(<span class="hljs-string">sub=&gt;</span><span class="hljs-function"><span class="hljs-keyword">sub</span>.<span class="hljs-title">update</span>())
  }
}
</span></code></pre>
<p>每次set函数，调用的时候，我们是不是应该，触发notify，对吧。所以 我们把代码补充完整</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function defineReactive (obj, key, val) {
      var dep = new Dep()
      var childOb = observe(val)
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=>val,
        set:newVal=> {
          var value =  val
          if (newVal === value) {
            return
          }
          val = newVal
          childOb = observe(newVal)
          dep.notify()
        }
      })
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> (<span class="hljs-params">obj, key, val</span>) </span>{
      <span class="hljs-keyword">var</span> dep = <span class="hljs-keyword">new</span> Dep()
      <span class="hljs-keyword">var</span> childOb = observe(val)
      <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
        enumerable: <span class="hljs-literal">true</span>,
        configurable: <span class="hljs-literal">true</span>,
        <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>val,
        <span class="hljs-keyword">set</span>:<span class="hljs-function"><span class="hljs-params">newVal</span>=&gt;</span> {
          <span class="hljs-keyword">var</span> value =  val
          <span class="hljs-keyword">if</span> (newVal === value) {
            <span class="hljs-keyword">return</span>
          }
          val = newVal
          childOb = observe(newVal)
          dep.notify()
        }
      })
    }
</code></pre>
<h5>实现一个Watcher</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     v.$watch(&quot;a&quot;,()=>console.log(&quot;哈哈，$watch成功&quot;))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>     v.$watch(<span class="hljs-string">"a"</span>,<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span><span class="hljs-built_in">console</span>.log(<span class="hljs-string">"哈哈，$watch成功"</span>))
</code></pre>
<p>我们想象这个Watcher，应该用什么东西。update方法，嗯这个毋庸置疑， 还有呢，<br>对表达式（就是那个“a”） 和 回调函数，这是最基本的，所以我们简单写写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.cb = cb
    this.vm = vm
    //此处简化.要区分fuction还是expression,只考虑最简单的expression
    this.expOrFn = expOrFn
    this.value = this.get()
  }
  update(){
    this.run()
  }
  run(){
    const  value = this.get()
    if(value !==this.value){
      this.value = value
      this.cb.call(this.vm)
    }
  }
  get(){
    //此处简化。。要区分fuction还是expression
    const value = this.vm._data[this.expOrFn]
    return value
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watcher</span> </span>{
  <span class="hljs-keyword">constructor</span>(vm, expOrFn, cb) {
    <span class="hljs-keyword">this</span>.cb = cb
    <span class="hljs-keyword">this</span>.vm = vm
    <span class="hljs-comment">//此处简化.要区分fuction还是expression,只考虑最简单的expression</span>
    <span class="hljs-keyword">this</span>.expOrFn = expOrFn
    <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>()
  }
  update(){
    <span class="hljs-keyword">this</span>.run()
  }
  run(){
    const  value = <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>()
    <span class="hljs-keyword">if</span>(value !==<span class="hljs-keyword">this</span>.value){
      <span class="hljs-keyword">this</span>.value = value
      <span class="hljs-keyword">this</span>.cb.call(<span class="hljs-keyword">this</span>.vm)
    }
  }
  <span class="hljs-keyword">get</span>(){
    <span class="hljs-comment">//此处简化。。要区分fuction还是expression</span>
    const value = <span class="hljs-keyword">this</span>.vm._data[<span class="hljs-keyword">this</span>.expOrFn]
    <span class="hljs-keyword">return</span> value
  }
}
</code></pre>
<p>怎样将通过addSub(),将Watcher加进去呢。 我们发现var dep = new Dep() 处于闭包当中， 我们又发现Watcher的构造函数里会调用this.get 所以，我们可以在上面动动手脚， 修改一下Object.defineProperty的get要调用的函数， 判断是不是Watcher的构造函数调用，如果是，说明他就是这个属性的订阅者 果断将他addSub()中去，那问题来了， 我怎样判断他是Watcher的this.get调用的，而不是我们普通调用的呢</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Watcher {
  ....省略未改动代码....
  get(){
    Dep.target = this
    //此处简化。。要区分fuction还是expression
    const value = this.vm._data[this.expOrFn]
    Dep.target = null
    return value
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watcher</span> </span>{
  ....省略未改动代码....
  <span class="hljs-keyword">get</span>(){
    Dep.target = <span class="hljs-keyword">this</span>
    <span class="hljs-comment">//此处简化。。要区分fuction还是expression</span>
    const value = <span class="hljs-keyword">this</span>.vm._data[<span class="hljs-keyword">this</span>.expOrFn]
    Dep.target = <span class="hljs-literal">null</span>
    <span class="hljs-keyword">return</span> value
  }
}
</code></pre>
<p>这样的话，我们只需要在Object.defineProperty的get要调用的函数里， 判断有没有值，就知道到底是Watcher 在get，还是我们自己在查看赋值，如果 是Watcher的话就addSub(),代码补充一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function defineReactive (obj, key, val) {
var dep = new Dep()
var childOb = observe(val)

Object.defineProperty(obj, key, {
enumerable: true,
configurable: true,
get: ()=>{
  // 说明这是watch 引起的
  if(Dep.target){
    dep.addSub(Dep.target)
  }
  return val
},
set:newVal=> {
  var value =  val
  if (newVal === value) {
    return
  }
  val = newVal
  childOb = observe(newVal)
  dep.notify()
}
})
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> (<span class="hljs-params">obj, key, val</span>) </span>{
<span class="hljs-keyword">var</span> dep = <span class="hljs-keyword">new</span> Dep()
<span class="hljs-keyword">var</span> childOb = observe(val)

<span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
enumerable: <span class="hljs-literal">true</span>,
configurable: <span class="hljs-literal">true</span>,
<span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  <span class="hljs-comment">// 说明这是watch 引起的</span>
  <span class="hljs-keyword">if</span>(Dep.target){
    dep.addSub(Dep.target)
  }
  <span class="hljs-keyword">return</span> val
},
<span class="hljs-keyword">set</span>:<span class="hljs-function"><span class="hljs-params">newVal</span>=&gt;</span> {
  <span class="hljs-keyword">var</span> value =  val
  <span class="hljs-keyword">if</span> (newVal === value) {
    <span class="hljs-keyword">return</span>
  }
  val = newVal
  childOb = observe(newVal)
  dep.notify()
}
})
}
</code></pre>
<p>最后不要忘记，在Dep.js中加上这么一句</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Dep.target = null
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>Dep.<span class="hljs-keyword">target</span> = <span class="hljs-keyword">null</span>
</code></pre>
<h5>实现一个Vue</h5>
<p>我们要把以上代码配合Vue的$watch方法来用， 要watch Vue实例的属性:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Watcher from '../watcher'
import {observe} from &quot;../observer&quot;

export default class Vue {
  constructor (options={}) {
    //这里简化了。。其实要merge
    this.$options=options
    //这里简化了。。其实要区分的
    let data = this._data=this.$options.data
    Object.keys(data).forEach(key=>this._proxy(key))
    observe(data,this)
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> Watcher from <span class="hljs-string">'../watcher'</span>
<span class="hljs-keyword">import</span> {observe} from <span class="hljs-string">"../observer"</span>

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Vue</span> </span>{
  <span class="hljs-keyword">constructor</span> (options={}) {
    <span class="hljs-comment">//这里简化了。。其实要merge</span>
    <span class="hljs-keyword">this</span>.$options=options
    <span class="hljs-comment">//这里简化了。。其实要区分的</span>
    let <span class="hljs-keyword">data</span> = <span class="hljs-keyword">this</span>._data=<span class="hljs-keyword">this</span>.$options.<span class="hljs-keyword">data</span>
    Object.keys(<span class="hljs-keyword">data</span>).forEach(key=&gt;<span class="hljs-keyword">this</span>._proxy(key))
    observe(<span class="hljs-keyword">data</span>,<span class="hljs-keyword">this</span>)
  }
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  $watch(expOrFn, cb, options){
    new Watcher(this, expOrFn, cb)
  }

  _proxy(key) {
    var self = this
    Object.defineProperty(self, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter () {
        return self._data[key]
      },
      set: function proxySetter (val) {
        self._data[key] = val
      }
    })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>  $watch(expOrFn, cb, options){
    <span class="hljs-keyword">new</span> Watcher(this, expOrFn, cb)
  }

  _proxy(key) {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this
    Object.defineProperty(<span class="hljs-keyword">self</span>, key, {
      configurable: <span class="hljs-keyword">true</span>,
      enumerable: <span class="hljs-keyword">true</span>,
      get: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">proxyGetter</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">self</span>._data[key]
      },
      set: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">proxySetter</span> <span class="hljs-params">(val)</span> </span>{
        <span class="hljs-keyword">self</span>._data[key] = val
      }
    })
  }
}
</code></pre>
<p>两件事，observe自己的data，代理自己的data， 使访问自己的属性，就是访问子data的属性。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入解析Vue源码

## 原文链接
[https://segmentfault.com/a/1190000010485232](https://segmentfault.com/a/1190000010485232)

