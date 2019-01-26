---
title: '初学vue2.0-组件-文档理解笔记v1.0' 
date: 2019-01-27 2:30:59
hidden: true
slug: b9f17h8bvp
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">组件</h1>
<ul>
<li><p>组件可以扩展 HTML 元素，封装可重用的代码</p></li>
<li><p>在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能</p></li>
<li><p>在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。</p></li>
</ul>
<h2 id="articleHeader1">使用组件</h2>
<h3 id="articleHeader2">注册一个全局组件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example&quot;>
<!--web组件的定义脱离了一般的dom元素的写法,相当于自定义了元素-->
  <my-component></my-component>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span>
<span class="hljs-comment">&lt;!--web组件的定义脱离了一般的dom元素的写法,相当于自定义了元素--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注册全局组件,指定之前设定的元素名,然后传入对象
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})
// 创建根实例
new Vue({
  el: '#example'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 注册全局组件,指定之前设定的元素名,然后传入对象</span>
Vue.component(<span class="hljs-string">'my-component'</span>, {
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;A custom component!&lt;/div&gt;'</span>
})
<span class="hljs-comment">// 创建根实例</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#example'</span>
})</code></pre>
<h3 id="articleHeader3">局部注册组件</h3>
<p>不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//将传入给组件的对象单独写
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  //通过components语法创建局部组件
  //将组件仅仅放在这个vue实例里面使用
  components: {
    // <my-component> 将只在父模板可用
    'my-component': Child
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//将传入给组件的对象单独写</span>
<span class="hljs-keyword">var</span> Child = {
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;A custom component!&lt;/div&gt;'</span>
}
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-comment">//通过components语法创建局部组件</span>
  <span class="hljs-comment">//将组件仅仅放在这个vue实例里面使用</span>
  components: {
    <span class="hljs-comment">// &lt;my-component&gt; 将只在父模板可用</span>
    <span class="hljs-string">'my-component'</span>: Child
  }
})</code></pre>
<h3 id="articleHeader4">DOM模板解析说明</h3>
<p>当使用 DOM 作为模版时（例如，将 el 选项挂载到一个已存在的元素上）, 你会受到 HTML 的一些限制，</p>
<blockquote><p>因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模版内容。<br>尤其像这些元素 &lt;ul&gt; ， &lt;ol&gt;， &lt;table&gt; ， &lt;select&gt; 限制了能被它包裹的元素， &lt;option&gt; 只能出现在其它元素内部。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--这种是不行的,会报错-->
<table>
  <my-row>...</my-row>
</table>
<!--要通过is属性来处理-->
<table>
  <tr is=&quot;my-row&quot;></tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--这种是不行的,会报错--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-row</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">my-row</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
<span class="hljs-comment">&lt;!--要通过is属性来处理--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"my-row"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<h3 id="articleHeader5">data必须是函数</h3>
<p>使用组件时，大多数可以传入到 Vue 构造器中的选项可以在注册组件时使用，有一个例外： data 必须是函数。 实际上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这样会报错,提示data必须是一个函数
Vue.component('my-component', {
  template: '<span>"{{" message "}}"</span>',
  data: {
    message: 'hello'
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//这样会报错,提示data必须是一个函数</span>
Vue.component(<span class="hljs-string">'my-component'</span>, {
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;span&gt;"{{" message "}}"&lt;/span&gt;'</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">message</span>: <span class="hljs-string">'hello'</span>
  }
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example-2&quot;>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example-2"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">simple-counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">simple-counter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">simple-counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">simple-counter</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">simple-counter</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">simple-counter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = { counter: 0 }
Vue.component('simple-counter', {
  template: '<button v-on:click=&quot;counter += 1&quot;>"{{" counter "}}"</button>',
  // data 是一个函数，因此 Vue 不会警告，
  // 但是我们为每一个组件返回了同一个对象引用,所以改变其中一个会把其他都改变了
  data: function () {
    return data
  }
})
new Vue({
  el: '#example-2'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> data = { <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span> }
Vue.component(<span class="hljs-string">'simple-counter'</span>, {
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;button v-on:click="counter += 1"&gt;"{{" counter "}}"&lt;/button&gt;'</span>,
  <span class="hljs-comment">// data 是一个函数，因此 Vue 不会警告，</span>
  <span class="hljs-comment">// 但是我们为每一个组件返回了同一个对象引用,所以改变其中一个会把其他都改变了</span>
  data: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> data
  }
})
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#example-2'</span>
})</code></pre>
<p>避免出现同时改变数据的情况</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//返回一个新的对象,而不是返回同一个data对象引用
data: function () {
  return { //字面量写法会创建新对象
    counter: 0
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//返回一个新的对象,而不是返回同一个data对象引用</span>
data: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-comment">//字面量写法会创建新对象</span>
    counter: <span class="hljs-number">0</span>
  }
}</code></pre>
<h2 id="articleHeader6">构成组件</h2>
<p>组件意味着协同工作，通常父子组件会是这样的关系：</p>
<ul>
<li><p>组件 A 在它的模版中使用了组件 B 。它们之间必然需要相互通信</p></li>
<li><p>父组件要给子组件传递数据，子组件需要将它内部发生的事情告知给父组件</p></li>
</ul>
<p>然而，在一个良好定义的接口中尽可能将父子组件解耦是很重要的。这保证了每个组件可以在相对隔离的环境中书写和理解，也大幅提高了组件的可维护性和可重用性。</p>
<p>在 Vue.js 中，父子组件的关系可以总结为 props down, events up 。<br>父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息。看看它们是怎么工作的。<br><span class="img-wrap"><img data-src="/img/remote/1460000008251351?w=790&amp;h=646" src="https://static.alili.tech/img/remote/1460000008251351?w=790&amp;h=646" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">prop</h3>
<p>使用prop传递数据</p>
<ul>
<li><p>组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。</p></li>
<li><p>使用 props 把数据传给子组件。</p></li>
<li><p>prop 是父组件用来传递数据的一个自定义属性</p></li>
<li><p>子组件需要显式地用 props 选项声明 “prop”</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example-2&quot;>
    <!--向这个组件传入一个字符串-->
    <child message=&quot;hello!&quot;></child>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example-2"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--向这个组件传入一个字符串--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">message</span>=<span class="hljs-string">"hello!"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.component('child', {
        // 声明 props,用数组形式的对象
        props: ['message'],
        // 就像 data 一样，prop 可以用在模板内
        // 同样也可以在 vm 实例中像 “this.message” 这样使用
        template: '<span>"{{" message "}}"</span>'
    });
    new Vue({
        el: '#example-2'
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    Vue.component(<span class="hljs-string">'child'</span>, {
        <span class="hljs-comment">// 声明 props,用数组形式的对象</span>
        props: [<span class="hljs-string">'message'</span>],
        <span class="hljs-comment">// 就像 data 一样，prop 可以用在模板内</span>
        <span class="hljs-comment">// 同样也可以在 vm 实例中像 “this.message” 这样使用</span>
        template: <span class="hljs-string">'&lt;span&gt;"{{" message "}}"&lt;/span&gt;'</span>
    });
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#example-2'</span>
    })</code></pre>
<h3 id="articleHeader8">动态prop</h3>
<p>用 v-bind 动态绑定 props 的值到父组件的数据中。每当父组件的数据变化时，该变化也会传导给子组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example-2&quot;>
<!--使用v-modal实现双向绑定-->
    <input v-model=&quot;parentMsg&quot;>
    <br>
    <!--需要注意这里使用短横线的变量,因为在html下是使用短横线变量的,但是在vue下使用驼峰变量-->
    <!--将父组件的parentMsg和子组件的my-message进行绑定-->
    <child v-bind:my-message=&quot;parentMsg&quot;></child>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example-2"</span>&gt;</span>
<span class="hljs-comment">&lt;!--使用v-modal实现双向绑定--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"parentMsg"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
    <span class="hljs-comment">&lt;!--需要注意这里使用短横线的变量,因为在html下是使用短横线变量的,但是在vue下使用驼峰变量--&gt;</span>
    <span class="hljs-comment">&lt;!--将父组件的parentMsg和子组件的my-message进行绑定--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">v-bind:my-message</span>=<span class="hljs-string">"parentMsg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.component('child', {
        // 声明 props
        props: ['my-message'], 
        template: '<span>"{{" myMessage "}}"</span>' //如果写my-message会报错,需要转换为驼峰写法
    });
    new Vue({
        el: '#example-2',
        data: {
            parentMsg: ''
        }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    Vue.component(<span class="hljs-string">'child'</span>, {
        <span class="hljs-comment">// 声明 props</span>
        props: [<span class="hljs-string">'my-message'</span>], 
        <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;span&gt;"{{" myMessage "}}"&lt;/span&gt;'</span> <span class="hljs-comment">//如果写my-message会报错,需要转换为驼峰写法</span>
    });
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#example-2'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">parentMsg</span>: <span class="hljs-string">''</span>
        }
    })</code></pre>
<h3 id="articleHeader9">短横线和驼峰写法</h3>
<p>HTML 特性不区分大小写。当使用非字符串模版时，prop的名字形式会从 camelCase 转为 kebab-case（短横线隔开）</p>
<ul>
<li><p>在javascript里面使用驼峰写法,但是在html里面需要转成短横线写法</p></li>
<li><p>反之亦然,vue会自动处理来自html的短横线写法转为驼峰写法</p></li>
</ul>
<h3 id="articleHeader10">字面量语法和动态语法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 默认只传递了一个字符串&quot;1&quot; -->
<comp some-prop=&quot;1&quot;></comp>

<!-- 用v-bind实现传递实际的数字 -->
<comp v-bind:some-prop=&quot;1&quot;></comp>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 默认只传递了一个字符串"1" --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">some-prop</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 用v-bind实现传递实际的数字 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">v-bind:some-prop</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span></code></pre>
<h3 id="articleHeader11">单向数据流</h3>
<ul>
<li><p>prop 是单向绑定的</p></li>
<li><p>当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。</p></li>
<li><p>每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop 。如果你这么做了，Vue 会在控制台给出警告。</p></li>
</ul>
<p>通常有两种改变 prop 的情况：</p>
<ol><li><p>prop 作为初始值传入，子组件之后只是将它的初始值作为本地数据的初始值使用</p></li></ol>
<p>定义一个局部 data 属性，并将 prop 的初始值作为局部数据的初始值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example-2&quot;>
<!--这里用短横线写法-->
    <child initial-counter=&quot;10&quot;></child>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example-2"</span>&gt;</span>
<span class="hljs-comment">&lt;!--这里用短横线写法--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">initial-counter</span>=<span class="hljs-string">"10"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.component('child', {
        props: ['initialCounter'],//这里用驼峰写法
        data: function () { //转为一个局部变量,写一个data对象给组件使用
            return {counter: this.initialCounter}
        },
        template: '<span>"{{" counter "}}"</span>'
    });
    new Vue({
        el: '#example-2'
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    Vue.component(<span class="hljs-string">'child'</span>, {
        <span class="hljs-attr">props</span>: [<span class="hljs-string">'initialCounter'</span>],<span class="hljs-comment">//这里用驼峰写法</span>
        data: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//转为一个局部变量,写一个data对象给组件使用</span>
            <span class="hljs-keyword">return</span> {<span class="hljs-attr">counter</span>: <span class="hljs-keyword">this</span>.initialCounter}
        },
        <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;span&gt;"{{" counter "}}"&lt;/span&gt;'</span>
    });
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#example-2'</span>
    })</code></pre>
<ol><li><p>prop 作为需要被转变的原始值传入。</p></li></ol>
<p>定义一个 computed 属性，此属性从 prop 的值计算得出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子没有写完,但是根据第一个例子可以知道利用computed的手法原理其实跟写一个data差不多
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//例子没有写完,但是根据第一个例子可以知道利用computed的手法原理其实跟写一个data差不多</span>
props: [<span class="hljs-string">'size'</span>],
<span class="hljs-attr">computed</span>: {
  <span class="hljs-attr">normalizedSize</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.size.trim().toLowerCase()
  }
}    </code></pre>
<blockquote><p>注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。</p></blockquote>
<h3 id="articleHeader12">prop验证</h3>
<p>组件可以为 props 指定验证要求,当组件给其他人使用时这很有用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('example', {
  props: {
    // 基础类型检测 （`null` 意思是任何类型都可以）
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组／对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'example'</span>, {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-comment">// 基础类型检测 （`null` 意思是任何类型都可以）</span>
    propA: <span class="hljs-built_in">Number</span>,
    <span class="hljs-comment">// 多种类型</span>
    propB: [<span class="hljs-built_in">String</span>, <span class="hljs-built_in">Number</span>],
    <span class="hljs-comment">// 必传且是字符串</span>
    propC: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-comment">// 数字，有默认值</span>
    propD: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-number">100</span>
    },
    <span class="hljs-comment">// 数组／对象的默认值应当由一个工厂函数返回</span>
    propE: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> { <span class="hljs-attr">message</span>: <span class="hljs-string">'hello'</span> }
      }
    },
    <span class="hljs-comment">// 自定义验证函数</span>
    propF: {
      <span class="hljs-attr">validator</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">return</span> value &gt; <span class="hljs-number">10</span>
      }
    }
  }
})</code></pre>
<h2 id="articleHeader13">自定义事件</h2>
<p>每个 Vue 实例都实现了事件接口(Events interface)</p>
<ul>
<li><p>使用 $on(eventName) 监听事件</p></li>
<li><p>使用 $emit(eventName) 触发事件</p></li>
<li><p>父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;counter-event-example&quot;>
    <p>"{{" total "}}"</p>
    <!--监听子组件的事件触发,监听increment1事件,处理程序为incrementTotal事件-->
    <button-counter v-on:increment1=&quot;incrementTotal&quot;></button-counter>
    <!--关键在于这里v-on绑定的是一个子组件的事件,并且赋值了一个父组件的方法给他,那么子组件里面就可以使用这个方法-->
    <button-counter v-on:increment1=&quot;incrementTotal&quot;></button-counter>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"counter-event-example"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{" total "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-comment">&lt;!--监听子组件的事件触发,监听increment1事件,处理程序为incrementTotal事件--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button-counter</span> <span class="hljs-attr">v-on:increment1</span>=<span class="hljs-string">"incrementTotal"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button-counter</span>&gt;</span>
    <span class="hljs-comment">&lt;!--关键在于这里v-on绑定的是一个子组件的事件,并且赋值了一个父组件的方法给他,那么子组件里面就可以使用这个方法--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button-counter</span> <span class="hljs-attr">v-on:increment1</span>=<span class="hljs-string">"incrementTotal"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button-counter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.component('button-counter', {
        //监听click事件,处理程序为increment(子组件定义的方法)
        template: '<button v-on:click=&quot;increment&quot;>"{{" counter "}}"</button>',
        //每一个counter都是独立的对象属性
        data: function () {
            return {
                counter: 0
            }
        },
        //子组件的方法
        methods: {
            increment: function () {
                this.counter += 1;
                //在子组件里面直接触发之前监听的increment1事件来执行父组件的方法
                this.$emit('increment1');
            }
        },
    })
    new Vue({
        el: '#counter-event-example',
        data: {
            total: 0
        },
        //父组件的方法
        methods: {
            incrementTotal: function () {
                this.total += 1
            }
        }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    Vue.component(<span class="hljs-string">'button-counter'</span>, {
        <span class="hljs-comment">//监听click事件,处理程序为increment(子组件定义的方法)</span>
        template: <span class="hljs-string">'&lt;button v-on:click="increment"&gt;"{{" counter "}}"&lt;/button&gt;'</span>,
        <span class="hljs-comment">//每一个counter都是独立的对象属性</span>
        data: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>
            }
        },
        <span class="hljs-comment">//子组件的方法</span>
        methods: {
            <span class="hljs-attr">increment</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.counter += <span class="hljs-number">1</span>;
                <span class="hljs-comment">//在子组件里面直接触发之前监听的increment1事件来执行父组件的方法</span>
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'increment1'</span>);
            }
        },
    })
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#counter-event-example'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>
        },
        <span class="hljs-comment">//父组件的方法</span>
        methods: {
            <span class="hljs-attr">incrementTotal</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.total += <span class="hljs-number">1</span>
            }
        }
    })</code></pre>
<blockquote><p>1.组件之间因为作用域不同的关系,所以相互独立,所以子组件想要使用父组件的方法的话需要做一个新的监听映射</p></blockquote>
<h3 id="articleHeader14">给组件绑定原生事件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--代替.on,这么就能够绑定原生js的事件了-->
<my-component v-on:click.native=&quot;doTheThing&quot;></my-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--代替.on,这么就能够绑定原生js的事件了--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">v-on:click.native</span>=<span class="hljs-string">"doTheThing"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span></code></pre>
<h3 id="articleHeader15">使用自定义事件的表单输入组件</h3>
<p>自定义事件也可以用来创建自定义的表单输入组件，使用 v-model 来进行数据双向绑定。<br>所以要让组件的 v-model 生效，它必须：</p>
<ul>
<li><p>接受一个 value 属性</p></li>
<li><p>在有新的 value 时触发 input 事件</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--直接使用v-model,v-modal默认处理input事件-->
<input v-model=&quot;something&quot;>

<!--v-modal是语法糖,翻译过来原理是这样:-->
<!--绑定一个value,然后监听input事件,通过获取input的输入来不断改变绑定的value的值,满足了v-modal的触发条件就可以实现v-modal了-->
<input v-bind:value=&quot;something&quot; v-on:input=&quot;something = $event.target.value&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--直接使用v-model,v-modal默认处理input事件--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"something"</span>&gt;</span>

<span class="hljs-comment">&lt;!--v-modal是语法糖,翻译过来原理是这样:--&gt;</span>
<span class="hljs-comment">&lt;!--绑定一个value,然后监听input事件,通过获取input的输入来不断改变绑定的value的值,满足了v-modal的触发条件就可以实现v-modal了--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-bind:value</span>=<span class="hljs-string">"something"</span> <span class="hljs-attr">v-on:input</span>=<span class="hljs-string">"something = $event.target.value"</span>&gt;</span></code></pre>
<p>一个非常简单的货币输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--绑定一个v-model为price,其实是绑定了一个value-->
<currency-input v-model=&quot;price&quot;></currency-input>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--绑定一个v-model为price,其实是绑定了一个value--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">currency-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"price"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">currency-input</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('currency-input', {
  template: '\
    <span>\
      $\
      <input\
        ref=&quot;input&quot;\ //注册为input,是DOM的节点元素
        v-bind:value=&quot;value&quot;\ //v-model的value(也是prop)
        v-on:input=&quot;updateValue($event.target.value)&quot;\ //封装更新value的函数
      >\
    </span>\
  ',
  props: ['value'], //父组件将绑定的value传给子组件
  methods: {
    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
    updateValue: function (value) {
      var formattedValue = value //对值进行处理
        // 删除两侧的空格符
        .trim()
        // 保留 2 小数位和2位数
        .slice(0, value.indexOf('.') + 3)
      // 如果值不统一，手动覆盖以保持一致,为了保持输入框显示内容跟格式化内容一致
      if (formattedValue !== value) {
      //因为注册是一个input元素,所以this.$refs 就是input元素
        this.$refs.input.value = formattedValue
      }
      //手动触发input事件,将格式化后的值传过去,这是最终显示输入框的输出
      this.$emit('input', Number(formattedValue))
    }
  }
})
//实例化vue实例的
new Vue({
        el: '#aa', //要绑定一个vue实例,例如包裹一个id为aa的div
        data:{
            price:'' //v-model要有数据源
        }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'currency-input'</span>, {
  <span class="hljs-attr">template</span>: <span class="hljs-string">'\
    &lt;span&gt;\
      $\
      &lt;input\
        ref="input"\ //注册为input,是DOM的节点元素
        v-bind:value="value"\ //v-model的value(也是prop)
        v-on:input="updateValue($event.target.value)"\ //封装更新value的函数
      &gt;\
    &lt;/span&gt;\
  '</span>,
  <span class="hljs-attr">props</span>: [<span class="hljs-string">'value'</span>], <span class="hljs-comment">//父组件将绑定的value传给子组件</span>
  methods: {
    <span class="hljs-comment">// 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制</span>
    updateValue: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
      <span class="hljs-keyword">var</span> formattedValue = value <span class="hljs-comment">//对值进行处理</span>
        <span class="hljs-comment">// 删除两侧的空格符</span>
        .trim()
        <span class="hljs-comment">// 保留 2 小数位和2位数</span>
        .slice(<span class="hljs-number">0</span>, value.indexOf(<span class="hljs-string">'.'</span>) + <span class="hljs-number">3</span>)
      <span class="hljs-comment">// 如果值不统一，手动覆盖以保持一致,为了保持输入框显示内容跟格式化内容一致</span>
      <span class="hljs-keyword">if</span> (formattedValue !== value) {
      <span class="hljs-comment">//因为注册是一个input元素,所以this.$refs 就是input元素</span>
        <span class="hljs-keyword">this</span>.$refs.input.value = formattedValue
      }
      <span class="hljs-comment">//手动触发input事件,将格式化后的值传过去,这是最终显示输入框的输出</span>
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, <span class="hljs-built_in">Number</span>(formattedValue))
    }
  }
})
<span class="hljs-comment">//实例化vue实例的</span>
<span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#aa'</span>, <span class="hljs-comment">//要绑定一个vue实例,例如包裹一个id为aa的div</span>
        data:{
            <span class="hljs-attr">price</span>:<span class="hljs-string">''</span> <span class="hljs-comment">//v-model要有数据源</span>
        }
    })</code></pre>
<blockquote><p>ref 被用来给元素或子组件注册引用信息。引用信息会根据父组件的 $refs 对象进行注册。如果在普通的DOM元素上使用，引用信息就是元素; 如果用在子组件上，引用信息就是组件实例 <a href="http://cn.vuejs.org/v2/api/#ref" rel="nofollow noreferrer" target="_blank">ref</a></p></blockquote>
<p>这是一个比较完整的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
<!--有3个组件,分别不同的v-model-->
  <currency-input 
    label=&quot;Price&quot; 
    v-model=&quot;price&quot;
  ></currency-input>
  <currency-input 
    label=&quot;Shipping&quot; 
    v-model=&quot;shipping&quot;
  ></currency-input>
  <currency-input 
    label=&quot;Handling&quot; 
    v-model=&quot;handling&quot;
  ></currency-input>
  <currency-input 
    label=&quot;Discount&quot; 
    v-model=&quot;discount&quot;
  ></currency-input>
  
  <p>Total: $"{{" total "}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
<span class="hljs-comment">&lt;!--有3个组件,分别不同的v-model--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">currency-input</span> 
    <span class="hljs-attr">label</span>=<span class="hljs-string">"Price"</span> 
    <span class="hljs-attr">v-model</span>=<span class="hljs-string">"price"</span>
  &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">currency-input</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">currency-input</span> 
    <span class="hljs-attr">label</span>=<span class="hljs-string">"Shipping"</span> 
    <span class="hljs-attr">v-model</span>=<span class="hljs-string">"shipping"</span>
  &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">currency-input</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">currency-input</span> 
    <span class="hljs-attr">label</span>=<span class="hljs-string">"Handling"</span> 
    <span class="hljs-attr">v-model</span>=<span class="hljs-string">"handling"</span>
  &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">currency-input</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">currency-input</span> 
    <span class="hljs-attr">label</span>=<span class="hljs-string">"Discount"</span> 
    <span class="hljs-attr">v-model</span>=<span class="hljs-string">"discount"</span>
  &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">currency-input</span>&gt;</span>
  
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Total: $"{{" total "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('currency-input', {
  template: '\
    <div>\
      <label v-if=&quot;label&quot;>"{{" label "}}"</label>\
      $\
      <input\
        ref=&quot;input&quot;\  // 这些没什么特别,引用注册为input DOM元素
        v-bind:value=&quot;value&quot;\  
        v-on:input=&quot;updateValue($event.target.value)&quot;\
        v-on:focus=&quot;selectAll&quot;\  //这里多了focus事件监听,焦点在的时候全选,也只是多了处理而已,对整体逻辑理解没啥影响
        v-on:blur=&quot;formatValue&quot;\ //这里多了blur事件监听,焦点离开的时候格式化
      >\
    </div>\
  ',
  props: {  //多个prop传递,因为prop是对象,只要是对象格式就行
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    }
  },
  mounted: function () { //这是vue的过渡状态,暂时忽略不影响理解
    this.formatValue()
  },
  methods: {
    updateValue: function (value) {
      var result = currencyValidator.parse(value, this.value)
      if (result.warning) {
      // 这里也使用了$refs获取引用注册信息
        this.$refs.input.value = result.value
      }
      this.$emit('input', result.value)
    },
    formatValue: function () {
      this.$refs.input.value = currencyValidator.format(this.value) //这里注意下,这个this是prop传递过来的,也相当于这个组件作用域
    },
    selectAll: function (event) { //event可以获取原生的js事件
      // Workaround for Safari bug
      // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
      setTimeout(function () {
          event.target.select()
      }, 0)
    }
  }
})

new Vue({
  el: '#app',
  data: {
    price: 0,
    shipping: 0,
    handling: 0,
    discount: 0
  },
  computed: {
    total: function () {
      return ((
        this.price * 100 + 
        this.shipping * 100 + 
        this.handling * 100 - 
        this.discount * 100
      ) / 100).toFixed(2)
    }
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'currency-input'</span>, {
  <span class="hljs-attr">template</span>: <span class="hljs-string">'\
    &lt;div&gt;\
      &lt;label v-if="label"&gt;"{{" label "}}"&lt;/label&gt;\
      $\
      &lt;input\
        ref="input"\  // 这些没什么特别,引用注册为input DOM元素
        v-bind:value="value"\  
        v-on:input="updateValue($event.target.value)"\
        v-on:focus="selectAll"\  //这里多了focus事件监听,焦点在的时候全选,也只是多了处理而已,对整体逻辑理解没啥影响
        v-on:blur="formatValue"\ //这里多了blur事件监听,焦点离开的时候格式化
      &gt;\
    &lt;/div&gt;\
  '</span>,
  <span class="hljs-attr">props</span>: {  <span class="hljs-comment">//多个prop传递,因为prop是对象,只要是对象格式就行</span>
    value: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">label</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-string">''</span>
    }
  },
  <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//这是vue的过渡状态,暂时忽略不影响理解</span>
    <span class="hljs-keyword">this</span>.formatValue()
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-attr">updateValue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
      <span class="hljs-keyword">var</span> result = currencyValidator.parse(value, <span class="hljs-keyword">this</span>.value)
      <span class="hljs-keyword">if</span> (result.warning) {
      <span class="hljs-comment">// 这里也使用了$refs获取引用注册信息</span>
        <span class="hljs-keyword">this</span>.$refs.input.value = result.value
      }
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, result.value)
    },
    <span class="hljs-attr">formatValue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">this</span>.$refs.input.value = currencyValidator.format(<span class="hljs-keyword">this</span>.value) <span class="hljs-comment">//这里注意下,这个this是prop传递过来的,也相当于这个组件作用域</span>
    },
    <span class="hljs-attr">selectAll</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{ <span class="hljs-comment">//event可以获取原生的js事件</span>
      <span class="hljs-comment">// Workaround for Safari bug</span>
      <span class="hljs-comment">// http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome</span>
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          event.target.select()
      }, <span class="hljs-number">0</span>)
    }
  }
})

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">price</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">shipping</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">handling</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">discount</span>: <span class="hljs-number">0</span>
  },
  <span class="hljs-attr">computed</span>: {
    <span class="hljs-attr">total</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> ((
        <span class="hljs-keyword">this</span>.price * <span class="hljs-number">100</span> + 
        <span class="hljs-keyword">this</span>.shipping * <span class="hljs-number">100</span> + 
        <span class="hljs-keyword">this</span>.handling * <span class="hljs-number">100</span> - 
        <span class="hljs-keyword">this</span>.discount * <span class="hljs-number">100</span>
      ) / <span class="hljs-number">100</span>).toFixed(<span class="hljs-number">2</span>)
    }
  }
})
</code></pre>
<h3 id="articleHeader16">非父子组件通信</h3>
<p>在简单的场景下，使用一个空的 Vue 实例作为中央事件总线：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bus = new Vue()

// 触发组件 A 中的事件
bus.$emit('id-selected', 1)

/*
通过on来监听子组件的事件来实现传递
*/

// 在组件 B 创建的钩子中监听事件
bus.$on('id-selected', function (id) {
  // ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> Vue()

<span class="hljs-comment">// 触发组件 A 中的事件</span>
bus.$emit(<span class="hljs-string">'id-selected'</span>, <span class="hljs-number">1</span>)

<span class="hljs-comment">/*
通过on来监听子组件的事件来实现传递
*/</span>

<span class="hljs-comment">// 在组件 B 创建的钩子中监听事件</span>
bus.$on(<span class="hljs-string">'id-selected'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
  <span class="hljs-comment">// ...</span>
})</code></pre>
<h2 id="articleHeader17">使用Slot分发内容</h2>
<p>为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为 内容分发 (或 “transclusion” 如果你熟悉 Angular)</p>
<h3 id="articleHeader18">编译作用域</h3>
<p>组件作用域简单地说是：父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。<br>假定 someChildProperty 是子组件的属性，上例不会如预期那样工作。父组件模板不应该知道子组件的状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 无效 -->
<child-component v-show=&quot;someChildProperty&quot;></child-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 无效 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child-component</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"someChildProperty"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span></code></pre>
<p>如果要绑定子组件内的指令到一个组件的根节点，应当在它的模板内这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('child-component', {
  // 有效，因为是在正确的作用域内
  template: '<div v-show=&quot;someChildProperty&quot;>Child</div>',
  data: function () {
    return { //因为这个属性在当前组件内编译(创建了)
      someChildProperty: true
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'child-component'</span>, {
  <span class="hljs-comment">// 有效，因为是在正确的作用域内</span>
  template: <span class="hljs-string">'&lt;div v-show="someChildProperty"&gt;Child&lt;/div&gt;'</span>,
  <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> { <span class="hljs-comment">//因为这个属性在当前组件内编译(创建了)</span>
      someChildProperty: <span class="hljs-literal">true</span>
    }
  }
})</code></pre>
<blockquote><p>类似地，分发内容是在父组件作用域内编译。</p></blockquote>
<h3 id="articleHeader19">单个Slot</h3>
<ul>
<li><p>除非子组件模板包含至少一个 &lt;slot&gt; 插口，否则父组件的内容将会被丢弃。</p></li>
<li><p>当子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身。</p></li>
<li><p>备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--父组件模版：-->
<div id=&quot;aa&quot;>
    <h1>我是父组件的标题</h1>
    <!--子组件的作用域内编译，宿主元素为空，且没有要插入的内容-->
    <my-component></my-component>
    <my-component>
        <p>这是一些初始内容</p>
        <p>这是更多的初始内容</p>
    </my-component>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--父组件模版：--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"aa"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我是父组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-comment">&lt;!--子组件的作用域内编译，宿主元素为空，且没有要插入的内容--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一些初始内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是更多的初始内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.component('my-component', { 
    //my-component 组件有下面模板
        template: '\
            <div>\
                <h2>我是子组件的标题</h2> \
                <slot> \  //有slot插口,所以没有被父组件丢弃
                只有在没有要分发的内容时才会显示。\
                </slot> \
            </div> \
        '
    })
    new Vue({
        el: '#aa',
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    Vue.component(<span class="hljs-string">'my-component'</span>, { 
    <span class="hljs-comment">//my-component 组件有下面模板</span>
        template: <span class="hljs-string">'\
            &lt;div&gt;\
                &lt;h2&gt;我是子组件的标题&lt;/h2&gt; \
                &lt;slot&gt; \  //有slot插口,所以没有被父组件丢弃
                只有在没有要分发的内容时才会显示。\
                &lt;/slot&gt; \
            &lt;/div&gt; \
        '</span>
    })
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#aa'</span>,
    })</code></pre>
<p>渲染结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;aa&quot;><h1>我是父组件的标题</h1>
    <div>
        <h2>我是子组件的标题</h2>
        <!--这里是直接插入,没有使用DOM元素-->
        只有在没有要分发的内容时才会显示。
    </div>
    <div>
        <h2>我是子组件的标题</h2>
        <p>这是一些初始内容</p>
        <p>这是更多的初始内容</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"aa"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我是父组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是子组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-comment">&lt;!--这里是直接插入,没有使用DOM元素--&gt;</span>
        只有在没有要分发的内容时才会显示。
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是子组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一些初始内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是更多的初始内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader20">有名字的Slot</h3>
<ul>
<li><p>&lt;slot&gt; 元素可以用一个特殊的属性 name 来配置如何分发内容。多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 slot 特性的元素。</p></li>
<li><p>仍然可以有一个匿名 slot ，它是默认 slot ，作为找不到匹配的内容片段的备用插槽。如果没有默认的 slot ，这些找不到匹配的内容片段将被抛弃。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;aa&quot;>
    <app-layout>
        <!--这是header-->
        <h1 slot=&quot;header&quot;>这里可能是一个页面标题</h1>
        <p>主要内容的一个段落。</p>
        <p>另一个主要段落。</p>
        <!--这是footer-->
        <p slot=&quot;footer&quot;>这里有一些联系信息</p>
    </app-layout>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"aa"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">app-layout</span>&gt;</span>
        <span class="hljs-comment">&lt;!--这是header--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"header"</span>&gt;</span>这里可能是一个页面标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>主要内容的一个段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>另一个主要段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-comment">&lt;!--这是footer--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"footer"</span>&gt;</span>这里有一些联系信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">app-layout</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.component('app-layout', {
        template: '\
            <div class=&quot;container&quot;> \
                <header> \  //找到名字叫header的slot之后替换内容,这里替换的是整个DOM
                    <slot name=&quot;header&quot;></slot> \
                </header> \
                <main> \ //因为slot没有属性,会将内容插入到slot的所在的DOM位置
                    <slot></slot> \
                </main> \
                <footer>\  //跟header类似
                    <slot name=&quot;footer&quot;></slot> \
                </footer> \
            </div> \
        '
    });
    new Vue({
        el: '#aa',
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    Vue.component(<span class="hljs-string">'app-layout'</span>, {
        <span class="hljs-attr">template</span>: <span class="hljs-string">'\
            &lt;div class="container"&gt; \
                &lt;header&gt; \  //找到名字叫header的slot之后替换内容,这里替换的是整个DOM
                    &lt;slot name="header"&gt;&lt;/slot&gt; \
                &lt;/header&gt; \
                &lt;main&gt; \ //因为slot没有属性,会将内容插入到slot的所在的DOM位置
                    &lt;slot&gt;&lt;/slot&gt; \
                &lt;/main&gt; \
                &lt;footer&gt;\  //跟header类似
                    &lt;slot name="footer"&gt;&lt;/slot&gt; \
                &lt;/footer&gt; \
            &lt;/div&gt; \
        '</span>
    });
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#aa'</span>,
    })</code></pre>
<p>渲染结果为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <header>
    <h1>这里可能是一个页面标题</h1>
  </header>
  <main>
    <p>主要内容的一个段落。</p>
    <p>另一个主要段落。</p>
  </main>
  <footer>
    <p>这里有一些联系信息</p>
  </footer>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>这里可能是一个页面标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>主要内容的一个段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>另一个主要段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这里有一些联系信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader21">作用域插槽(vue2.1)</h3>
<ul>
<li><p>作用域插槽是一种特殊类型的插槽，用作使用一个（能够传递数据到）可重用模板替换已渲染元素。</p></li>
<li><p>在子组件中，只需将数据传递到插槽，就像你将 prop 传递给组件一样</p></li>
<li><p>在父级中，具有特殊属性 scope 的 &lt;template&gt; 元素，表示它是作用域插槽的模板。scope 的值对应一个临时变量名，此变量接收从子组件中传递的 prop 对象</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;parent&quot; class=&quot;parent&quot;>
    <child>
    <!--接收从子组件中传递的prop对象(这个就是作用域插槽)-->
        <template scope=&quot;props&quot;>
            <span>hello from parent</span>
            <!--使用这个prop对象-->
            <span>"{{" props.text "}}"</span>
        </template>
    </child>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"parent"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span>&gt;</span>
    <span class="hljs-comment">&lt;!--接收从子组件中传递的prop对象(这个就是作用域插槽)--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"props"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hello from parent<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-comment">&lt;!--使用这个prop对象--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{" props.text "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.component('child', {
        props: ['props'], //这个写不写都可以,作用域插槽固定会接收prop对象,而且这个prop对象是肯定存在的
        template: '\
            <div class=&quot;child&quot;> \
            <slot text=&quot;hello from child&quot;></slot> \ //在子组件里直接将数据传递给slot
            </div> \
        '
    });
    new Vue({
        el: '#parent',
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    Vue.component(<span class="hljs-string">'child'</span>, {
        <span class="hljs-attr">props</span>: [<span class="hljs-string">'props'</span>], <span class="hljs-comment">//这个写不写都可以,作用域插槽固定会接收prop对象,而且这个prop对象是肯定存在的</span>
        template: <span class="hljs-string">'\
            &lt;div class="child"&gt; \
            &lt;slot text="hello from child"&gt;&lt;/slot&gt; \ //在子组件里直接将数据传递给slot
            &lt;/div&gt; \
        '</span>
    });
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#parent'</span>,
    })</code></pre>
<p>渲染结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
  <div class=&quot;child&quot;>
    <span>hello from parent</span>
    <!--子组件的东西出现在这里了-->
    <span>hello from child</span>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hello from parent<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-comment">&lt;!--子组件的东西出现在这里了--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hello from child<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>另外一个例子,作用域插槽更具代表性的用例是列表组件，允许组件自定义应该如何渲染列表每一项</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;parent&quot;>
<!--绑定一个组件的prop ,位置1-->
    <my-awesome-list :items=&quot;items&quot;>
        <!-- 作用域插槽也可以在这里命名 -->
        <!--这里props只代表确定接受prop对象的东西,不关注prop对象里面有什么,位置2-->
        <template slot=&quot;item&quot; scope=&quot;props&quot;>
            <li class=&quot;my-fancy-item&quot;>"{{" props.text "}}"</li>
        </template>
    </my-awesome-list>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"parent"</span>&gt;</span>
<span class="hljs-comment">&lt;!--绑定一个组件的prop ,位置1--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-awesome-list</span> <span class="hljs-attr">:items</span>=<span class="hljs-string">"items"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 作用域插槽也可以在这里命名 --&gt;</span>
        <span class="hljs-comment">&lt;!--这里props只代表确定接受prop对象的东西,不关注prop对象里面有什么,位置2--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"item"</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"props"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"my-fancy-item"</span>&gt;</span>"{{" props.text "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">my-awesome-list</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.component('my-awesome-list', {
        props:['items'], //需要声明prop为items,需要是为下面的循环遍历的items的数据源做设定,位置3
        template: '\
            <ul> \
                <slot name=&quot;item&quot; v-for=&quot;item in items&quot; :text=&quot;item.text&quot;> \ //在slot中,循环遍历输出items的text,位置4
                </slot> \
            </ul> \
        '
    });
    new Vue({
        el: '#parent',
        data : {
            items:[ //初始化items数据
                {text:&quot;aa&quot;},
                {text:&quot;bb&quot;}
            ]
        }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    Vue.component(<span class="hljs-string">'my-awesome-list'</span>, {
        <span class="hljs-attr">props</span>:[<span class="hljs-string">'items'</span>], <span class="hljs-comment">//需要声明prop为items,需要是为下面的循环遍历的items的数据源做设定,位置3</span>
        template: <span class="hljs-string">'\
            &lt;ul&gt; \
                &lt;slot name="item" v-for="item in items" :text="item.text"&gt; \ //在slot中,循环遍历输出items的text,位置4
                &lt;/slot&gt; \
            &lt;/ul&gt; \
        '</span>
    });
    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#parent'</span>,
        <span class="hljs-attr">data</span> : {
            <span class="hljs-attr">items</span>:[ <span class="hljs-comment">//初始化items数据</span>
                {<span class="hljs-attr">text</span>:<span class="hljs-string">"aa"</span>},
                {<span class="hljs-attr">text</span>:<span class="hljs-string">"bb"</span>}
            ]
        }
    })</code></pre>
<ol>
<li><p>位置1,实现了一个组件的prop绑定,prop需要在组件里面声明,这里绑定的是items,这是要将父组件的items传递到子组件,所以在位置3里面需要声明,在vue实例要初始化</p></li>
<li><p>位置2,这里scope的props是代表作用域插槽接收来自prop对象的数据,props.text是代表每一个li要输出的是prop对象的text属性</p></li>
<li><p>位置3,在组件里声明props,为了接收父组件绑定的items属性,然后将其给位置4的循环使用</p></li>
<li><p>位置4,这里绑定了text属性,就是前呼位置2里面输出的prop对象的text属性</p></li>
</ol>
<h2 id="articleHeader22">动态组件</h2>
<p>多个组件可以使用同一个挂载点，然后动态地在它们之间切换。使用保留的 &lt;component&gt; 元素，动态地绑定到它的 is 特性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home' //默认值
  },
  components: { //根据不同的值进行不同的组件切换,这里用components写法
    home: { /* ... */ }, 
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#example'</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">currentView</span>: <span class="hljs-string">'home'</span> <span class="hljs-comment">//默认值</span>
  },
  <span class="hljs-attr">components</span>: { <span class="hljs-comment">//根据不同的值进行不同的组件切换,这里用components写法</span>
    home: { <span class="hljs-comment">/* ... */</span> }, 
    <span class="hljs-attr">posts</span>: { <span class="hljs-comment">/* ... */</span> },
    <span class="hljs-attr">archive</span>: { <span class="hljs-comment">/* ... */</span> }
  }
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--这个is是一个字符串,根据返回值来给组件进行v-bind-->
<component v-bind:is=&quot;currentView&quot;>
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--这个is是一个字符串,根据返回值来给组件进行v-bind--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">v-bind:is</span>=<span class="hljs-string">"currentView"</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 组件在 vm.currentview 变化时改变！ --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span></code></pre>
<h3 id="articleHeader23">keep-alive</h3>
<p>如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive>
  <component :is=&quot;currentView&quot;>
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"currentView"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 非活动组件将被缓存！ --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span></code></pre>
<h2 id="articleHeader24">杂项</h2>
<h3 id="articleHeader25">编写可复用组件</h3>
<p>在编写组件时，记住是否要复用组件有好处。一次性组件跟其它组件紧密耦合没关系，但是可复用组件应当定义一个清晰的公开接口。<br>Vue 组件的 API 来自三部分 - props, events 和 slots ：</p>
<ul>
<li><p>Props 允许外部环境传递数据给组件</p></li>
<li><p>Events 允许组件触发外部环境的副作用</p></li>
<li><p>Slots 允许外部环境将额外的内容组合在组件中。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--v-bind,缩写:,绑定prop-->
<!--v-on,缩写@,监听事件-->
<!--slot插槽-->
<my-component
  :foo=&quot;baz&quot;  
  :bar=&quot;qux&quot;
  @event-a=&quot;doThis&quot;
  @event-b=&quot;doThat&quot;
>
  <img slot=&quot;icon&quot; src=&quot;...&quot;>
  <p slot=&quot;main-text&quot;>Hello!</p>
</my-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--v-bind,缩写:,绑定prop--&gt;</span>
<span class="hljs-comment">&lt;!--v-on,缩写@,监听事件--&gt;</span>
<span class="hljs-comment">&lt;!--slot插槽--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>
  <span class="hljs-attr">:foo</span>=<span class="hljs-string">"baz"</span>  
  <span class="hljs-attr">:bar</span>=<span class="hljs-string">"qux"</span>
  @<span class="hljs-attr">event-a</span>=<span class="hljs-string">"doThis"</span>
  @<span class="hljs-attr">event-b</span>=<span class="hljs-string">"doThat"</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"..."</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"main-text"</span>&gt;</span>Hello!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span></code></pre>
<h3 id="articleHeader26">子组件索引</h3>
<p>尽管有 props 和 events ，但是有时仍然需要在 JavaScript 中直接访问子组件。为此可以使用 ref 为子组件指定一个索引 ID 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;parent&quot;>
  <user-profile ref=&quot;profile&quot;></user-profile>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"parent"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">user-profile</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"profile"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">user-profile</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var parent = new Vue({ el: '#parent' })
// 访问子组件
var child = parent.$refs.profile" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> parent = <span class="hljs-keyword">new</span> Vue({ <span class="hljs-attr">el</span>: <span class="hljs-string">'#parent'</span> })
<span class="hljs-comment">// 访问子组件</span>
<span class="hljs-keyword">var</span> child = parent.$refs.profile</code></pre>
<blockquote><ol>
<li><p>当 ref 和 v-for 一起使用时， ref 是一个数组或对象，包含相应的子组件。</p></li>
<li><p>$refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。</p></li>
<li><p>ref 被用来给元素或子组件注册引用信息。引用信息会根据父组件的 $refs 对象进行注册。如果在普通的DOM元素上使用，引用信息就是元素; 如果用在子组件上，引用信息就是组件实例 <a href="http://cn.vuejs.org/v2/api/#ref" rel="nofollow noreferrer" target="_blank">ref</a></p></li>
</ol></blockquote>
<h3 id="articleHeader27">组件命名约定</h3>
<ul>
<li><p>当注册组件（或者 props）时，可以使用 kebab-case ，camelCase ，或 TitleCase 。Vue 不关心这个。</p></li>
<li><p>在 HTML 模版中，请使用 kebab-case 形式：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在组件定义中
components: {
  // 使用 kebab-case 形式注册--横线写法
  'kebab-cased-component': { /* ... */ },
  // register using camelCase --驼峰写法
  'camelCasedComponent': { /* ... */ },
  // register using TitleCase --标题写法
  'TitleCasedComponent': { /* ... */ }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在组件定义中</span>
components: {
  <span class="hljs-comment">// 使用 kebab-case 形式注册--横线写法</span>
  <span class="hljs-string">'kebab-cased-component'</span>: { <span class="hljs-comment">/* ... */</span> },
  <span class="hljs-comment">// register using camelCase --驼峰写法</span>
  <span class="hljs-string">'camelCasedComponent'</span>: { <span class="hljs-comment">/* ... */</span> },
  <span class="hljs-comment">// register using TitleCase --标题写法</span>
  <span class="hljs-string">'TitleCasedComponent'</span>: { <span class="hljs-comment">/* ... */</span> }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 在HTML模版中始终使用 kebab-case--横线写法 -->
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<title-cased-component></title-cased-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 在HTML模版中始终使用 kebab-case--横线写法 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">kebab-cased-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">kebab-cased-component</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">camel-cased-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">camel-cased-component</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title-cased-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title-cased-component</span>&gt;</span></code></pre>
<h3 id="articleHeader28">递归组件</h3>
<ul>
<li><p>组件在它的模板内可以递归地调用自己，不过，只有当它有 name 选项时才可以</p></li>
<li><p>当你利用Vue.component全局注册了一个组件, 全局的ID作为组件的 name 选项，被自动设置.</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//组件可以用name来写名字
name: 'unique-name-of-my-component'
//也可以在创建的时候默认添加名字
Vue.component('unique-name-of-my-component', {
  // ...
})
//如果同时使用的话,递归的时候就会不断递归自己,导致溢出
name: 'stack-overflow',
template: '<div><stack-overflow></stack-overflow></div>'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//组件可以用name来写名字</span>
name: <span class="hljs-string">'unique-name-of-my-component'</span>
<span class="hljs-comment">//也可以在创建的时候默认添加名字</span>
Vue.component(<span class="hljs-string">'unique-name-of-my-component'</span>, {
  <span class="hljs-comment">// ...</span>
})
<span class="hljs-comment">//如果同时使用的话,递归的时候就会不断递归自己,导致溢出</span>
name: <span class="hljs-string">'stack-overflow'</span>,
<span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;&lt;stack-overflow&gt;&lt;/stack-overflow&gt;&lt;/div&gt;'</span>
</code></pre>
<h3 id="articleHeader29">使用-v-once-的低级静态组件-Cheap-Static-Component</h3>
<p>尽管在 Vue 中渲染 HTML 很快，不过当组件中包含大量静态内容时，可以考虑使用 v-once 将渲染结果缓存起来，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('terms-of-service', {
  template: '\
    <div v-once>\
      <h1>Terms of Service</h1>\
      ... a lot of static content ...\
    </div>\
  '
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'terms-of-service'</span>, {
  <span class="hljs-attr">template</span>: <span class="hljs-string">'\
    &lt;div v-once&gt;\
      &lt;h1&gt;Terms of Service&lt;/h1&gt;\
      ... a lot of static content ...\
    &lt;/div&gt;\
  '</span>
})</code></pre>
<blockquote><p>v-once只渲染元素和组件一次。随后的重新渲染,元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初学vue2.0-组件-文档理解笔记v1.0

## 原文链接
[https://segmentfault.com/a/1190000008251348](https://segmentfault.com/a/1190000008251348)

