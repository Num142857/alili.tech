---
title: '用vue框架的基本原理，简单实现一个todo-list' 
date: 2019-01-05 2:30:11
hidden: true
slug: lbtanvz2vr
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近在学习vue框架的基本原理，看了一些技术博客以及一些对vue源码的简单实现，对数据代理、数据劫持、模板解析、变异数组方法、双向绑定有了更深的理解。于是乎，尝试着去实践自己学到的知识，用vue的一些基本原理实现一个<code>简单的todo-list</code>，完成对深度复杂对象的双向绑定以及对数组的监听，加深了对vue基本原理的印象。</p>
<blockquote><ul>
<li><p>github地址：<a href="https://github.com/FatDong1/vueTodoDemo" rel="nofollow noreferrer" target="_blank">todo-list</a></p></li>
<li><p>在线预览： <a href="https://fatdong1.github.io/todo-list/index.html" rel="nofollow noreferrer" target="_blank">https://fatdong1.github.io/to...</a></p></li>
</ul></blockquote>
<h3 id="articleHeader1">学习链接</h3>
<p>前排感谢以下文章，对我理解vue的基本原理有很大的帮助！</p>
<ul>
<li><p><a href="https://github.com/DMQ/mvvm" rel="nofollow noreferrer" target="_blank">剖析vue实现原理，自己动手实现mvvm</a> by DMQ</p></li>
<li><p><a href="https://github.com/youngwind/blog" rel="nofollow noreferrer" target="_blank">对vue早期源码的理解</a>  by 梁少峰</p></li>
</ul>
<h3 id="articleHeader2">实现效果</h3>
<p><span class="img-wrap"><img data-src="/img/bVR7my?w=408&amp;h=460" src="https://static.alili.tech/img/bVR7my?w=408&amp;h=460" alt="todo-list.png" title="todo-list.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">数据代理</h3>
<h4>1.简单介绍数据代理</h4>
<p>正常情况下，我们都会把数据写在data里面，如下面所示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
    el: '#app',
    data: {
        title: 'hello world'
    }
    methods: {
        changeTitle: function () {
            this.title = 'hello vue'
        }
    }
})
console.log(vm.title) // 'hello world' or 'hello vue'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var <span class="hljs-keyword">vm</span> = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#app'</span>,
    dat<span class="hljs-variable">a:</span> {
        title: <span class="hljs-string">'hello world'</span>
    }
    method<span class="hljs-variable">s:</span> {
        changeTitle: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
            this.title = <span class="hljs-string">'hello vue'</span>
        }
    }
})
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">vm</span>.title) // <span class="hljs-string">'hello world'</span> <span class="hljs-built_in">or</span> <span class="hljs-string">'hello vue'</span></code></pre>
<p>如果没有<code>数据代理</code>，而我们又要修改data里面的title的话，methods里面的changeTitle只能这样修改成<code>this.data.title = 'hello vue'</code>, 下面的console也只能改成<code>console.log(vm.data.title)</code>，数据代理就是这样的功能。</p>
<h4>2. 实现原理</h4>
<p>通过遍历data里面的属性，将每个属性通过object.defineProperty()设置getter和setter，将data里面的每个属性都复制到与data同级的对象里。</p>
<p>(对应上面的示例代码)</p>
<p><span class="img-wrap"><img data-src="/img/bVR7A2?w=444&amp;h=412" src="https://static.alili.tech/img/bVR7A2?w=444&amp;h=412" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>触发这里的getter将会触发data里面对应属性的getter，触发这里的setter将会触发data里面对应属性的setter，从而实现代理。实现代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var self = this;   // this为vue实例， 即vm
Object.keys(this.data).forEach(function(key) {
    Object.defineProperty(this, key, {    // this.title, 即vm.title
        enumerable: false,
        configurable: true,
        get: function getter () {
            return self.data[key];   //触发对应data[key]的getter
        },
        set: function setter (newVal) {
            self.data[key] = newVal;  //触发对应data[key]的setter
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;   <span class="hljs-comment">// this为vue实例， 即vm</span>
Object.keys(<span class="hljs-keyword">this</span>.data).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(key)</span> </span>{
    Object.defineProperty(<span class="hljs-keyword">this</span>, key, {    <span class="hljs-comment">// this.title, 即vm.title</span>
        enumerable: <span class="hljs-literal">false</span>,
        configurable: <span class="hljs-literal">true</span>,
        <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getter</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> self.data[key];   <span class="hljs-comment">//触发对应data[key]的getter</span>
        },
        <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setter</span> <span class="hljs-params">(newVal)</span> </span>{
            self.data[key] = newVal;  <span class="hljs-comment">//触发对应data[key]的setter</span>
        }
    });
}</code></pre>
<blockquote><p>对object.defineProperty不熟悉的小伙伴可以在<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">MDN的文档(链接)</a>学习一下</p></blockquote>
<h3 id="articleHeader4">双向绑定</h3>
<ul>
<li><p>数据变动  ---&gt; 视图更新</p></li>
<li><p>视图更新(input、textarea)  --&gt; 数据变动</p></li>
</ul>
<p><code>视图更新 --&gt; 数据变动</code>这个方向的绑定比较简单，主要通过事件监听来改变数据，比如input可以监听input事件，一旦触发input事件就改变data。下面主要来理解一下<code>数据变动---&gt;视图更新</code>这个方向的绑定。</p>
<h4>1. 数据劫持</h4>
<p>不妨让我们自己思考一下，如何实现数据变动，对应绑定数据的视图就更新呢？</p>
<p>答案还是object.defineProperty，通过object.defineProperty遍历设置this.data里面所有属性，在每个属性的setter里面去通知对应的回调函数，这里的回调函数包括dom视图重新渲染的函数、使用$watch添加的回调函数等，这样我们就通过object.defineProperty劫持了数据，当我们对数据重新赋值时，如<code>this.title = 'hello vue'</code>,就会触发setter函数，从而触发dom视图重新渲染的函数，实现数据变动，对应视图更新。</p>
<h4>2. 发布-订阅模式</h4>
<p>那么问题来了，我们如何在setter里面触发所有绑定该数据的回调函数呢？</p>
<p>既然绑定该数据的回调函数不止一个，我们就把所有的回调函数放在一个数组里面，一旦触发该数据的setter，就遍历数组触发里面所有的回调函数，我们把这些回调函数称为<code>订阅者</code>。数组最好就定义在setter函数的最近的上级作用域中，如下面实例代码所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.keys(this.data).forEach(function(key) {
    var subs = [];  // 在这里放置添加所有订阅者的数组
    Object.defineProperty(this.data, key, {    // this.data.title
        enumerable: false,
        configurable: true,
        get: function getter () {
            console.log('访问数据啦啦啦')
            return this.data[key];   //返回对应数据的值
        },
        set: function setter (newVal) {
            if (newVal === this.data[key]) {   
                return;    // 如果数据没有变动，函数结束，不执行下面的代码
            }
            this.data[key] = newVal;  //数据重新赋值
            
            subs.forEach(function () {
                // 通知subs里面的所有的订阅者
            })
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>.data).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{
    <span class="hljs-keyword">var</span> subs = [];  <span class="hljs-comment">// 在这里放置添加所有订阅者的数组</span>
    <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">this</span>.data, key, {    <span class="hljs-comment">// this.data.title</span>
        enumerable: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getter</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'访问数据啦啦啦'</span>)
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.data[key];   <span class="hljs-comment">//返回对应数据的值</span>
        },
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setter</span> (<span class="hljs-params">newVal</span>) </span>{
            <span class="hljs-keyword">if</span> (newVal === <span class="hljs-keyword">this</span>.data[key]) {   
                <span class="hljs-keyword">return</span>;    <span class="hljs-comment">// 如果数据没有变动，函数结束，不执行下面的代码</span>
            }
            <span class="hljs-keyword">this</span>.data[key] = newVal;  <span class="hljs-comment">//数据重新赋值</span>
            
            subs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// 通知subs里面的所有的订阅者</span>
            })
        }
    });
}</code></pre>
<p>那么问题又来了，怎么把绑定数据的所有回调函数放到一个数组里面呢？</p>
<p>我们可以在getter里面做做手脚，我们知道只要访问数据就会触发对应数据的getter，那我们可以先设置一个全局变量target，如果我们要在data里面title属性添加一个订阅者(changeTitle函数)，我们可以先设置target = changeTitle，把changeTitle函数缓存在target中，然后访问this.title去触发title的getter，在getter里面把target这个全局变量的值添加到subs数组里面，添加完成后再把全局变量target设置为null，以便添加其他订阅者。实例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.keys(this.data).forEach(function(key) {
    var subs = [];  // 在这里放置添加所有订阅者的数组
    Object.defineProperty(this.data, key, {    // this.data.title
        enumerable: false,
        configurable: true,
        get: function getter () {
            console.log('访问数据啦啦啦')
            if (target) {
                subs.push(target);                
            }
            return this.data[key];   //返回对应数据的值
        },
        set: function setter (newVal) {
            if (newVal === this.data[key]) {   
                return;    // 如果数据没有变动，函数结束，不执行下面的代码
            }
            this.data[key] = newVal;  //数据重新赋值
            
            subs.forEach(function () {
                // 通知subs里面的所有的订阅者
            })
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>.data).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{
    <span class="hljs-keyword">var</span> subs = [];  <span class="hljs-comment">// 在这里放置添加所有订阅者的数组</span>
    <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">this</span>.data, key, {    <span class="hljs-comment">// this.data.title</span>
        enumerable: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getter</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'访问数据啦啦啦'</span>)
            <span class="hljs-keyword">if</span> (target) {
                subs.push(target);                
            }
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.data[key];   <span class="hljs-comment">//返回对应数据的值</span>
        },
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setter</span> (<span class="hljs-params">newVal</span>) </span>{
            <span class="hljs-keyword">if</span> (newVal === <span class="hljs-keyword">this</span>.data[key]) {   
                <span class="hljs-keyword">return</span>;    <span class="hljs-comment">// 如果数据没有变动，函数结束，不执行下面的代码</span>
            }
            <span class="hljs-keyword">this</span>.data[key] = newVal;  <span class="hljs-comment">//数据重新赋值</span>
            
            subs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// 通知subs里面的所有的订阅者</span>
            })
        }
    });
}</code></pre>
<p>上面的代码为了方便理解都是通过简化的，实际上我们把订阅者写成一个构造函数watcher，在实例化订阅者的时候去访问对应的数据，触发相应的getter，详细的代码可以阅读<a href="https://github.com/DMQ/mvvm" rel="nofollow noreferrer" target="_blank">DMQ的自己动手实现MVVM</a></p>
<h4>3. 模板解析</h4>
<p>通过上面的两个步骤我们已经实现一旦数据变动，就会通知对应绑定数据的订阅者，接下来我们来简单介绍一个特殊的订阅者，也就是视图更新函数，几乎每个数据都会添加对应的视图更新函数，所以我们就来简单了解一下视图更新函数。</p>
<p>假如说有下面这一段代码，我们怎么把它解析成对应的html呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-model=&quot;title&quot;>
<h1>"{{"title"}}"</h1>
<button v-on:click=&quot;changeTitle&quot;>change title<button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"title"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"changeTitle"</span>&gt;</span>change title<span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span></span></code></pre>
<p>先简单介绍视图更新函数的用途，<br>比如解析指令<code>v-model="title"</code>,<code>v-on:click="changeTitle"</code>,还有把"{{"title"}}"替换为对应的数据等。</p>
<p>回到上面那个问题，如何解析模板？我们只要去遍历所有dom节点包括其子节点，</p>
<ul>
<li><p>如果节点属性含有<code>v-model</code>，视图更新函数就为把input的value设置为title的值</p></li>
<li><p>如果节点为文本节点，视图更新函数就为先用正则表达式取出大括号里面的值'title'，再设置文本节点的值为data['title']</p></li>
<li><p>如果节点属性含有<code>v-on:xxxx</code>，视图更新函数就为先用正则获取事件类型为click，然后获取该属性的值为changeTitle，则事件的回调函数为this.methods['changeTitle']，接着用addEventListener监听节点click事件。</p></li>
</ul>
<p>我们要知道视图更新函数也是data对应属性的订阅者，如果不知道如何触发视图更新函数，可以把上面的发布-订阅模式再看一遍。</p>
<p>可能有的小伙伴可能还有个疑问，如何实现input节点的值变化后，下面的h1节点的title值也发生变化？在遍历所有节点后，如果节点含有属性<code>v-model</code>，就用addEventListener监听input事件，一旦触发input事件，改变data['title']的值，就会触发title的setter，从而通知所有的订阅者。</p>
<h3 id="articleHeader5">监听数组变化</h3>
<h4>无法监控每个数组元素</h4>
<p>如果让我们自己实现监听数组的变化，我们可能会想到用object.defineProperty去遍历数组每个元素并设置setter，但是vue源码里面却不是这样写的，因为对每一个数组元素defineProperty带来代码本身的复杂度增加和代码执行效率的降低。</p>
<blockquote><p>感谢Ma63d<a href="https://github.com/youngwind/blog/issues/85#issuecomment-301400937" rel="nofollow noreferrer" target="_blank">这篇文章下面的的评论</a>，对此解释得很详细，这里也就不再赘述。</p></blockquote>
<h4>变异数组方法</h4>
<p>既然无法通过defineProperty监控数组的每个元素，我们可以重写数组的方法(push, pop, shift, unshift, splice, sort, reverse)来改变数组。</p>
<p><a href="https://cn.vuejs.org/v2/guide/list.html#" rel="nofollow noreferrer" target="_blank">vue文档</a>中是这样写的：</p>
<blockquote>
<p>Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：</p>
<ul>
<li><p>push()</p></li>
<li><p>pop()</p></li>
<li><p>shift()</p></li>
<li><p>unshift()</p></li>
<li><p>splice()</p></li>
<li><p>sort()</p></li>
<li><p>reverse()</p></li>
</ul>
</blockquote>
<p>下面是 <a href="https://github.com/youngwind/blog/issues/85" rel="nofollow noreferrer" target="_blank">vue早期源码学习系列之二：如何监听一个数组的变化</a> 中的实例代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = [];

aryMethods.forEach((method)=> {

    // 这里是原生Array的原型方法
    let original = Array.prototype[method];

   // 将push, pop等封装好的方法定义在对象arrayAugmentations的属性上
   // 注意：是属性而非原型属性
    arrayAugmentations[method] = function () {
        console.log('我被改变啦!');

        // 调用对应的原生方法并返回结果
        return original.apply(this, arguments);
    };

});

let list = ['a', 'b', 'c'];
// 将我们要监听的数组的原型指针指向上面定义的空数组对象
// 别忘了这个空数组的属性上定义了我们封装好的push等方法
list.__proto__ = arrayAugmentations;
list.push('d');  // 我被改变啦！ 4

// 这里的list2没有被重新定义原型指针，所以就正常输出
let list2 = ['a', 'b', 'c'];
list2.push('d');  // 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">const</span> aryMethods = [<span class="hljs-string">'push'</span>, <span class="hljs-string">'pop'</span>, <span class="hljs-string">'shift'</span>, <span class="hljs-string">'unshift'</span>, <span class="hljs-string">'splice'</span>, <span class="hljs-string">'sort'</span>, <span class="hljs-string">'reverse'</span>];
<span class="hljs-keyword">const</span> arrayAugmentations = [];

aryMethods.forEach((method)=&gt; {

    <span class="hljs-comment">// 这里是原生Array的原型方法</span>
    <span class="hljs-keyword">let</span> original = <span class="hljs-built_in">Array</span>.prototype[method];

   <span class="hljs-comment">// 将push, pop等封装好的方法定义在对象arrayAugmentations的属性上</span>
   <span class="hljs-comment">// 注意：是属性而非原型属性</span>
    arrayAugmentations[method] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我被改变啦!'</span>);

        <span class="hljs-comment">// 调用对应的原生方法并返回结果</span>
        <span class="hljs-keyword">return</span> original.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
    };

});

<span class="hljs-keyword">let</span> <span class="hljs-built_in">list</span> = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];
<span class="hljs-comment">// 将我们要监听的数组的原型指针指向上面定义的空数组对象</span>
<span class="hljs-comment">// 别忘了这个空数组的属性上定义了我们封装好的push等方法</span>
<span class="hljs-built_in">list</span>.__proto__ = arrayAugmentations;
<span class="hljs-built_in">list</span>.push(<span class="hljs-string">'d'</span>);  <span class="hljs-comment">// 我被改变啦！ 4</span>

<span class="hljs-comment">// 这里的list2没有被重新定义原型指针，所以就正常输出</span>
<span class="hljs-keyword">let</span> list2 = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];
list2.push(<span class="hljs-string">'d'</span>);  <span class="hljs-comment">// 4</span></code></pre>
<p>对__proto__不熟悉的小伙伴可以去看一下<a href="http://www.cnblogs.com/wangfupeng1988/p/3977924.html" rel="nofollow noreferrer" target="_blank">王福明的博客</a>，写的很好。</p>
<h4>变异数组方法的缺陷</h4>
<p><a href="https://cn.vuejs.org/v2/guide/list.html#" rel="nofollow noreferrer" target="_blank">vue文档中变异数组方法的缺陷</a></p>
<blockquote>
<p>由于 JavaScript 的限制， Vue 不能检测以下变动的数组：</p>
<ol>
<li><p>当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue</p></li>
<li><p>当你修改数组的长度时，例如： vm.items.length = newLength</p></li>
</ol>
</blockquote>
<p>同时文档中也介绍了如何解决上面这两个问题。</p>
<h2 id="articleHeader6">最后</h2>
<p>以上是自己对vue一些基本原理的理解，当然还有很多不足的地方，欢迎指正。本来自己也是为了应付面试才去学习vue框架的基本原理，但是简单学习了这些vue基本的原理后，让我明白通过深入学习框架原理，可以有效避开一些自己以后会遇到的坑，所以，有时间的话自己以后还是会去看看框架的基本原理。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue框架的基本原理，简单实现一个todo-list

## 原文链接
[https://segmentfault.com/a/1190000010487690](https://segmentfault.com/a/1190000010487690)

