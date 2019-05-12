---
title: 'Vue2.0二——模板语法、计算属性、watch、filter、过渡、directive、keep-alive' 
date: 2018-12-23 2:30:07
hidden: true
slug: oa0wb68vy2r
categories: [reprint]
---

{{< raw >}}

                    
<h4>一、模板语法</h4>
<p>a.数据绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"message"}}" 插值表达式 v-once 以后值不变
v-bind:属性 v-bind:id=&quot;root&quot; => :id=&quot;root&quot;
v-html='message'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>"{{"message"}}" 插值表达式 v-once 以后值不变
v-<span class="hljs-string">bind:</span>属性 v-<span class="hljs-string">bind:</span>id=<span class="hljs-string">"root"</span> =&gt; :id=<span class="hljs-string">"root"</span>
v-html=<span class="hljs-string">'message'</span></code></pre>
<p>b.表达式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{" number + 1 "}}"
"{{" ok ? 'YES' : 'NO' "}}"
"{{" message.split('').reverse().join('') "}}"
<div v-bind:id=&quot;'list-' + id&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>"{{" number + <span class="hljs-number">1</span> "}}"
"{{" ok ? <span class="hljs-string">'YES'</span> : <span class="hljs-string">'NO'</span> "}}"
"{{" message.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>) "}}"
&lt;div v-bind:id=<span class="hljs-string">"'list-' + id"</span>&gt;&lt;/div&gt;</code></pre>
<p>c.class</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-bind:class=&quot;{ active: isActive }&quot;></div>
对象
<div class=&quot;static&quot; v-bind:class=&quot;{ active: isActive, 'text-danger': hasError }&quot;></div>
数组
<div v-bind:class=&quot;[activeClass, errorClass]&quot;></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div v-bind:<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"{ active: isActive }"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
对象
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"static"</span> v-bind:<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"{ active: isActive, 'text-danger': hasError }"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
数组
&lt;div v-bind:<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"[activeClass, errorClass]"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
data: {
  <span class="hljs-attr">activeClass</span>: <span class="hljs-string">'active'</span>,
  <span class="hljs-attr">errorClass</span>: <span class="hljs-string">'text-danger'</span>
}</code></pre>
<p>d.style内联</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-bind:style=&quot;{ color: activeColor, fontSize: fontSize + 'px' }&quot;></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
<div v-bind:style=&quot;[baseStyles, overridingStyles]&quot;></div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-bind:style</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{ color: activeColor, fontSize: fontSize + 'px' }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
data: </span><span class="hljs-template-variable">{
  activeColor: 'red',
  fontSize: 30
}</span><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-bind:style</span>=<span class="hljs-string">"[baseStyles, overridingStyles]"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> </span></code></pre>
<p>e.条件渲染</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1)v-if
<h1 v-if=&quot;ok&quot;>Yes</h1>
<h1 v-else>No</h1>  

<template v-if=&quot;ok&quot;>
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>   

 (2)v-show
 <h1 v-show=&quot;ok&quot;>Hello!</h1>
 注意，v-show 不支持 <template> 元素，也不支持 v-else。
 二者区别：
 使用了v-if的时候，如果值为false，那么页面将不会有这个html标签生成。
 v-show则是不管值为true还是false，html元素都会存在，只是CSS中的display显示或隐藏" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>(1)v-if
<span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"ok"</span>&gt;</span>Yes<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">v-else</span>&gt;</span>No<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>  

<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"ok"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Paragraph 1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Paragraph 2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>   

 (2)v-show
 <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"ok"</span>&gt;</span>Hello!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
 注意，v-show 不支持 <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span> 元素，也不支持 v-else。
 二者区别：
 使用了v-if的时候，如果值为false，那么页面将不会有这个html标签生成。
 v-show则是不管值为true还是false，html元素都会存在，只是CSS中的display显示或隐藏</code></pre>
<p>f.for遍历</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="数组：
<ul id=&quot;example-2&quot;>
  <li v-for=&quot;(item, index) in items&quot;>
    "{{" parentMessage "}}" - "{{" index "}}" - "{{" item.message "}}"
  </li>
</ul>
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">数组：
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example-2"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in items"</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{" parentMessage "}}"</span><span class="xml"> - </span><span class="hljs-template-variable">"{{" index "}}"</span><span class="xml"> - </span><span class="hljs-template-variable">"{{" item.message "}}"</span><span class="xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
 </span></code></pre>
<p>可以用 of 替代 in 作为分隔符，因为它是最接近 JavaScript 迭代器的语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-for=&quot;item of items&quot;></div>
对象：
<div v-for=&quot;(value, key, index) in object&quot; :key=&quot;index&quot;>
  "{{" index "}}". "{{" key "}}": "{{" value "}}"
</div>
:key=&quot;index&quot; 在1.0中 track-by=&quot;$index&quot; 最好用id来唯一标识 有利于提高性能" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item of items"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
对象：
&lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(value, key, index) in object"</span> :key=<span class="hljs-string">"index"</span>&gt;
  "{{" index "}}". "{{" key "}}": "{{" value "}}"
&lt;/<span class="hljs-keyword">div</span>&gt;
:key=<span class="hljs-string">"index"</span> 在<span class="hljs-number">1.0</span>中 track-<span class="hljs-keyword">by</span>=<span class="hljs-string">"$index"</span> 最好用<span class="hljs-built_in">id</span>来唯一标识 有利于提高性能</code></pre>
<p>g.事件绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v-on:click => @click" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code style="word-break: break-word; white-space: initial;">v-on:<span class="hljs-function"><span class="hljs-params">click</span> =&gt;</span> <span class="hljs-meta">@click</span></code></pre>
<p>h.事件修饰符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例如：阻止默认事件
<div><a href='#' v-on:click=&quot;gotourl($event)&quot;></a></div>

gotourl (e) {
    <!--原生写法-->
    e.preventDefault()
    console.log(e)
}
<div><a href='#' v-on:click.prevent=&quot;gotourl&quot;></a></div>
gotourl(){
    console.log(0)
}

.stop 阻止冒泡
.cabture 阻止捕获 生成新的子节点 不需要再次绑定
.self 冒泡中 只对该元素生效 对子元素不生效
.once 只想用一次 消费类行为 付款点击一次就解绑 按钮变灰

全部键盘按键 .enter .tab .delete ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>例如：阻止默认事件
&lt;div&gt;&lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">'#'</span> v-on:click=<span class="hljs-string">"gotourl($event)"</span>&gt;&lt;/a&gt;&lt;/div&gt;

gotourl (e) {
    &lt;!--原生写法--&gt;
    e.preventDefault()
    console.log(e)
}
&lt;div&gt;&lt;<span class="hljs-selector-tag">a</span> href=<span class="hljs-string">'#'</span> v-on:click.prevent=<span class="hljs-string">"gotourl"</span>&gt;&lt;/a&gt;&lt;/div&gt;
<span class="hljs-function"><span class="hljs-title">gotourl</span><span class="hljs-params">()</span></span>{
    console.log(<span class="hljs-number">0</span>)
}

<span class="hljs-selector-class">.stop</span> 阻止冒泡
<span class="hljs-selector-class">.cabture</span> 阻止捕获 生成新的子节点 不需要再次绑定
<span class="hljs-selector-class">.self</span> 冒泡中 只对该元素生效 对子元素不生效
<span class="hljs-selector-class">.once</span> 只想用一次 消费类行为 付款点击一次就解绑 按钮变灰

全部键盘按键 <span class="hljs-selector-class">.enter</span> <span class="hljs-selector-class">.tab</span> <span class="hljs-selector-class">.delete</span> ...</code></pre>
<p>i.按键修饰符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-on:keyup.enter=&quot;submit&quot;>
<input @keyup.enter=&quot;submit&quot;>
全部的按键别名：
    .enter
    .tab
    .delete (捕获“删除”和“退格”键)
    .esc
    .space
    .up
    .down
    .left
    .right          " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">input</span> v-on:keyup.enter=<span class="hljs-string">"submit"</span>&gt;
&lt;<span class="hljs-selector-tag">input</span> @keyup.enter=<span class="hljs-string">"submit"</span>&gt;
全部的按键别名：
    <span class="hljs-selector-class">.enter</span>
    <span class="hljs-selector-class">.tab</span>
    <span class="hljs-selector-class">.delete</span> (捕获“删除”和“退格”键)
    <span class="hljs-selector-class">.esc</span>
    <span class="hljs-selector-class">.space</span>
    <span class="hljs-selector-class">.up</span>
    <span class="hljs-selector-class">.down</span>
    <span class="hljs-selector-class">.left</span>
    <span class="hljs-selector-class">.right</span>          </code></pre>
<p>j.鼠标按钮修饰符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2.1.0 新增
.left
.right
.middle   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">2.1</span>.<span class="hljs-number">0</span> 新增
<span class="hljs-selector-class">.left</span>
<span class="hljs-selector-class">.right</span>
<span class="hljs-selector-class">.middle</span>   </code></pre>
<p>k.v-model</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-model=&quot;message&quot; placeholder=&quot;edit me&quot;>
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">input</span> v-model=<span class="hljs-string">"message"</span> placeholder=<span class="hljs-string">"edit me"</span>&gt;
    </code></pre>
<h4>二、计算属性 VS 方法</h4>
<p>methods ：事件方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods : {   //里面的方法只有触发的时候才能改变
    show () {
        console.log(0)
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>methods : {   <span class="hljs-comment">//里面的方法只有触发的时候才能改变</span>
    <span class="hljs-keyword">show</span> () {
        console.<span class="hljs-built_in">log</span>(<span class="hljs-number">0</span>)
    }
}
</code></pre>
<p>computed ：计算属性 差值表达式算新值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {   //相当于ready dom渲染完成就自动执行 
    http () {
        return this.$store.state.http
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>computed: {   //相当于ready dom渲染完成就自动执行 
    http () {
        return this.<span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>.http
    }
},</code></pre>
<p>区别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="计算属性 ：
和普通属性一样是在模板中绑定计算属性的，
当data中对应数据发生改变时，计算属性的值也会发生改变。
Methods：
methods是方法，只要调用它，函数就会执行。

相同：两者达到的效果是同样的。
不同：计算属性是基于它们的依赖进行缓存的，
    只有相关依赖会发生改变时才会重新求职。
    只要相关依赖未改变，只会返回之前的结果，不再执行函数。 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>计算属性 ：
和普通属性一样是在模板中绑定计算属性的，
当<span class="hljs-class"><span class="hljs-keyword">data</span>中对应数据发生改变时，计算属性的值也会发生改变。</span>
<span class="hljs-type">Methods</span>：
<span class="hljs-title">methods</span>是方法，只要调用它，函数就会执行。

相同：两者达到的效果是同样的。
不同：计算属性是基于它们的依赖进行缓存的，
    只有相关依赖会发生改变时才会重新求职。
    只要相关依赖未改变，只会返回之前的结果，不再执行函数。 </code></pre>
<h4>三、watch</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {        //message 是已经注册的属性 有变化就执行
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})      " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> vm = new Vue({
  el: <span class="hljs-string">'#demo'</span>,
  <span class="hljs-keyword">data</span>: {
    firstName: <span class="hljs-string">'Foo'</span>,
    lastName: <span class="hljs-string">'Bar'</span>,
    fullName: <span class="hljs-string">'Foo Bar'</span>
  },
  watch: {        <span class="hljs-comment">//message 是已经注册的属性 有变化就执行</span>
    firstName: function (<span class="hljs-keyword">val</span>) {
      <span class="hljs-keyword">this</span>.fullName = <span class="hljs-keyword">val</span> + <span class="hljs-string">' '</span> + <span class="hljs-keyword">this</span>.lastName
    },
    lastName: function (<span class="hljs-keyword">val</span>) {
      <span class="hljs-keyword">this</span>.fullName = <span class="hljs-keyword">this</span>.firstName + <span class="hljs-string">' '</span> + <span class="hljs-keyword">val</span>
    }
  }
})      </code></pre>
<h4>四、过滤器</h4>
<p>vue2.0里，不再有自带的过滤器，需要自己定义过滤器。<br>定义：注册一个自定义过滤器，它接收两个参数：过滤器 ID 和过滤器函数      <br> 1.0中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div id=&quot;app&quot;>
    "{{"abc|uppercase"}}"
 </div>
 <script>
    new Vue({
        el:'#app',
        data:{
            abc:&quot;aaa&quot;
        }
    })
 </script>    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"abc|uppercase"}}"</span><span class="xml">
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({
        el:<span class="hljs-string">'#app'</span>,
        data:{
            abc:<span class="hljs-string">"aaa"</span>
        }
    })
 </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>    </span></code></pre>
<p>2.0中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div id=&quot;app&quot;>
    "{{"abc|uppercase"}}"
</div>

//过滤器
Vue.filter('uppercase', function(value) {
  if (!value) { return ''}
  value = value.toString()
  return value.toUpperCase()
})

var vm = new Vue({
  el:'#app',
  data: {
    abc: 'aaa'
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code> &lt;div id=<span class="hljs-string">"app"</span>&gt;
    "{{"<span class="hljs-keyword">abc</span>|uppercase"}}"
&lt;/div&gt;

//过滤器
Vue.<span class="hljs-built_in">filter</span>(<span class="hljs-string">'uppercase'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span> {</span>
  <span class="hljs-keyword">if</span> (!value) { <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>}
  value = value.toString()
  <span class="hljs-keyword">return</span> value.toUpperCase()
})

var <span class="hljs-keyword">vm</span> = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span><span class="hljs-string">'#app'</span>,
  dat<span class="hljs-variable">a:</span> {
    <span class="hljs-keyword">abc</span>: <span class="hljs-string">'aaa'</span>
  }
})</code></pre>
<h4>五、动画</h4>
<p>在 CSS 过渡和动画中自动应用 class<br>可以配合使用第三方 CSS 动画库，如 Animate.css<br>在过渡钩子函数中使用 JavaScript 直接操作 DOM<br>可以配合使用第三方 JavaScript 动画库，如 Velocity.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<transition name=&quot;fade&quot;>
    <p v-if=&quot;show&quot;>hello</p>
</transition>

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

动画具体看官方文档(￣▽￣)~*" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>
<span class="hljs-params">&lt;transition name="fade"&gt;</span>
    <span class="hljs-params">&lt;p v-if="show"&gt;</span>hello<span class="hljs-params">&lt;/p&gt;</span>
<span class="hljs-params">&lt;/transition&gt;</span>

.slide-fade-enter-<span class="hljs-class">active </span>{
<span class="hljs-symbol">  transition:</span> all <span class="hljs-number">.3</span>s ease;
}
.slide-fade-leave-<span class="hljs-class">active </span>{
<span class="hljs-symbol">  transition:</span> all <span class="hljs-number">.8</span>s cubic-bezier(<span class="hljs-number">1.0</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">1.0</span>);
}
.slide-fade-enter, .slide-fade-leave-to
<span class="hljs-comment">/* .slide-fade-leave-active for below version 2.1.8 */</span> {
<span class="hljs-symbol">  transform:</span> translateX(<span class="hljs-number">10</span>px);
<span class="hljs-symbol">  opacity:</span> <span class="hljs-number">0</span>;
}

动画具体看官方文档(￣▽￣)~*</code></pre>
<h4>六、自定义指令</h4>
<p>除了常用的v-model 等还可以进行自定义指令来绑定数据<br>栗子：移动端滚动事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-fixtop=&quot;{toggleHeader:toggleHeader}&quot; class=&quot;main&quot;>

methods: {
    toggleHeader(flag){
        this.isHeaderShow=flag
    }
 }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;div v-fixtop=<span class="hljs-string">"{toggleHeader:toggleHeader}"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"main"</span>&gt;

methods: {
    toggleHeader(flag){
        <span class="hljs-keyword">this</span>.isHeaderShow=flag
    }
 }
    </code></pre>
<p>定义：v_scroll_fix.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'

Vue.directive('fixtop',{
    bind: function (el, binding, vnode) {
        el.addEventListener('scroll',function () {
            if(this.scrollTop>30){
                binding.value.toggleHeader(true)
            }else{
                binding.value.toggleHeader(false)
            }
        })
    }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>

Vue.directive(<span class="hljs-string">'fixtop'</span>,{
    <span class="hljs-attr">bind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el, binding, vnode</span>) </span>{
        el.addEventListener(<span class="hljs-string">'scroll'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.scrollTop&gt;<span class="hljs-number">30</span>){
                binding.value.toggleHeader(<span class="hljs-literal">true</span>)
            }<span class="hljs-keyword">else</span>{
                binding.value.toggleHeader(<span class="hljs-literal">false</span>)
            }
        })
    }
})
</code></pre>
<p>钩子函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
unbind：只调用一次，指令与元素解绑时调用。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">bind</span>：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
<span class="hljs-selector-tag">inserted</span>：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
<span class="hljs-selector-tag">update</span>：所在组件的 <span class="hljs-selector-tag">VNode</span> 更新时调用，但是可能发生在其子 <span class="hljs-selector-tag">VNode</span> 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
<span class="hljs-selector-tag">componentUpdated</span>：指令所在组件的 <span class="hljs-selector-tag">VNode</span> 及其子 <span class="hljs-selector-tag">VNode</span> 全部更新后调用。
<span class="hljs-selector-tag">unbind</span>：只调用一次，指令与元素解绑时调用。</code></pre>
<p>参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el：指令所绑定的元素，可以用来直接操作 DOM 。
binding：一个对象，包含以下属性：
    name：指令名，不包括 v- 前缀。
    value：指令的绑定值，例如：v-my-directive=&quot;1 + 1&quot; 中，绑定值为 2。
    oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
    expression：字符串形式的指令表达式。例如 v-my-directive=&quot;1 + 1&quot; 中，表达式为 &quot;1 + 1&quot;。
    arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 &quot;foo&quot;。
    modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
除了 el 之外，其它参数都应该是只读的，切勿进行修改" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>el：指令所绑定的元素，可以用来直接操作 DOM 。
binding：一个对象，包含以下属性：
    <span class="hljs-built_in">name</span>：指令名，不包括 v- 前缀。
    value：指令的绑定值，例如：v-<span class="hljs-keyword">my</span>-directive=<span class="hljs-string">"1 + 1"</span> 中，绑定值为 <span class="hljs-number">2</span>。
    oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
    expression：字符串形式的指令表达式。例如 v-<span class="hljs-keyword">my</span>-directive=<span class="hljs-string">"1 + 1"</span> 中，表达式为 <span class="hljs-string">"1 + 1"</span>。
    arg：传给指令的参数，可选。例如 v-<span class="hljs-keyword">my</span>-directive:foo 中，参数为 <span class="hljs-string">"foo"</span>。
    modifiers：一个包含修饰符的对象。例如：v-<span class="hljs-keyword">my</span>-directive.foo.bar 中，修饰符对象为 { foo: <span class="hljs-literal">true</span>, bar: <span class="hljs-literal">true</span> }。
vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
除了 el 之外，其它参数都应该是只读的，切勿进行修改</code></pre>
<h4>七、keep-alive</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive>是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。
<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。 
keep-alive生命周期钩子函数：activated、deactivated
使用<keep-alive>会将数据保留在内存中，如果要在每次进入页面的时候获取最新的数据，需要在activated阶段获取数据，承担原来created钩子中获取数据的任务。   
当引入keep-alive的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，
在activated中会保留一份一份数据，再次进入就不在重新解析而是读取内存中的数据
退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>&lt;keep-<span class="hljs-built_in">alive</span>&gt;是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。
&lt;keep-<span class="hljs-built_in">alive</span>&gt; 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。 
keep-<span class="hljs-built_in">alive</span>生命周期钩子函数：activated、deactivated
使用&lt;keep-<span class="hljs-built_in">alive</span>&gt;会将数据保留在内存中，如果要在每次进入页面的时候获取最新的数据，需要在activated阶段获取数据，承担原来created钩子中获取数据的任务。   
当引入keep-<span class="hljs-built_in">alive</span>的时候，页面第一次进入，钩子的触发顺序created-&gt; mounted-&gt; activated，
在activated中会保留一份一份数据，再次进入就不在重新解析而是读取内存中的数据
退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。</code></pre>
<h4>八、可能会遇到的坑</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、注：组件以大写字母开头
2、报错：'template or render is not a function' 
   说明一些依赖库的更新或者安装新的依赖库之后
   vue和vue-template-compiler版本不对,或者编译引用用不对
   解决：
   同一版本
    1 &quot;vue&quot;: &quot;2.3.3&quot;,
    2 &quot;vue-template-compiler&quot;: &quot;2.4.4&quot;,
    
    不行的话就更改vue-loader的版本降到12.2.1
    cnpm i vue-loader@12  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-number">1</span>、注：组件以大写字母开头
<span class="hljs-number">2</span>、报错：<span class="hljs-symbol">'template</span> <span class="hljs-keyword">or</span> render <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> a <span class="hljs-keyword">function</span>' 
   说明一些依赖库的更新或者安装新的依赖库之后
   vue和vue-template-compiler版本不对,或者编译引用用不对
   解决：
   同一版本
    <span class="hljs-number">1</span> <span class="hljs-string">"vue"</span>: <span class="hljs-string">"2.3.3"</span>,
    <span class="hljs-number">2</span> <span class="hljs-string">"vue-template-compiler"</span>: <span class="hljs-string">"2.4.4"</span>,
    
    不行的话就更改vue-loader的版本降到<span class="hljs-number">12.2</span>.<span class="hljs-number">1</span>
    cnpm i vue-loader@<span class="hljs-number">12</span>  </code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0二——模板语法、计算属性、watch、filter、过渡、directive、keep-alive

## 原文链接
[https://segmentfault.com/a/1190000012306121](https://segmentfault.com/a/1190000012306121)

