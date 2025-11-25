---
title: 'Vue 2.0 入门系列（14）学习 Vue.js 需要掌握的 es6 (1)' 
date: 2019-01-15 2:30:12
hidden: true
slug: 55bkeogm5ub
categories: [reprint]
---

{{< raw >}}

                    
<p>针对之前学习 <code>Vue</code> 用到的 <code>es6</code> 特性，以及接下来进一步学习 <code>Vue</code> 要用到的 <code>es6</code> 特性，做下简单总结。</p>
<h2 id="articleHeader0">var、let 与 const</h2>
<h3 id="articleHeader1">var 与 let</h3>
<p><code>es6</code> 之前，JavaScript 并没有块级作用域，所谓的块，就是大括号里面的语句所组成的代码块，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fire(bool) {
    if (bool) {
        var foo = &quot;bar&quot;;
    }
    console.log(foo);
}

fire(true); //=> bar" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fire</span>(<span class="hljs-params">bool</span>) </span>{
    <span class="hljs-keyword">if</span> (bool) {
        <span class="hljs-keyword">var</span> foo = <span class="hljs-string">"bar"</span>;
    }
    <span class="hljs-built_in">console</span>.log(foo);
}

fire(<span class="hljs-literal">true</span>); <span class="hljs-comment">//=&gt; bar</span></code></pre>
<p>虽然变量 <code>foo</code> 位于 <code>if</code> 语句的代码块中，但是 JavaScript 并没有块级作用域的概念，因此被添加到了当前的执行环境 - 即函数中，在函数内都可以访问到。</p>
<p>另外一个令人困惑的地方是变量提升：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fire(bool) {
    if (bool) {
        var foo = &quot;bar&quot;;
    } else {
        console.log(foo);
    }
}
fire(false); //=> undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fire</span>(<span class="hljs-params">bool</span>) </span>{
    <span class="hljs-keyword">if</span> (bool) {
        <span class="hljs-keyword">var</span> foo = <span class="hljs-string">"bar"</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(foo);
    }
}
fire(<span class="hljs-literal">false</span>); <span class="hljs-comment">//=&gt; undefined</span></code></pre>
<p>我们都知道，直接访问一个未定义的变量，会报错:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(nope); //=> Uncaught ReferenceError: nope is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(nope); <span class="hljs-comment">//=&gt; Uncaught ReferenceError: nope is not defined</span></code></pre>
<p>但是在上述的例子中，会返回 <code>undefined</code>。也就是说，变量的定义被提升到了作用域的顶部，等价于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fire(bool) {
    var foo;
    if (bool) {
           foo = &quot;bar&quot;;
    } else {
        console.log(foo);
    }
}
fire(false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fire</span>(<span class="hljs-params">bool</span>) </span>{
    <span class="hljs-keyword">var</span> foo;
    <span class="hljs-keyword">if</span> (bool) {
           foo = <span class="hljs-string">"bar"</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(foo);
    }
}
fire(<span class="hljs-literal">false</span>);</code></pre>
<p>而在 JavaScript 中，声明但是未赋值的变量会被赋值为 <code>undefined</code>，因此，结果输出 <code>undefined</code>。</p>
<p>为了解决上述问题，引入了 <code>let</code> 关键字，<code>let</code> 定义的变量。</p>
<p>首先，<code>let</code> 定义的变量只在代码块内有效：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fire(bool) {
    if (bool) {
        let foo = &quot;bar&quot;;
    }
    console.log(foo);
}

fire(true); //=> Uncaught ReferenceError: foo is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fire</span>(<span class="hljs-params">bool</span>) </span>{
    <span class="hljs-keyword">if</span> (bool) {
        <span class="hljs-keyword">let</span> foo = <span class="hljs-string">"bar"</span>;
    }
    <span class="hljs-built_in">console</span>.log(foo);
}

fire(<span class="hljs-literal">true</span>); <span class="hljs-comment">//=&gt; Uncaught ReferenceError: foo is not defined</span></code></pre>
<p>其次, <code>let</code> 定义的变量不存在变量提升：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fire(bool) {
    if (bool) {
        let foo = &quot;bar&quot;;
    } else {
        console.log(foo);
    }
}
fire(false); //=> Uncaught ReferenceError: foo is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fire</span>(<span class="hljs-params">bool</span>) </span>{
    <span class="hljs-keyword">if</span> (bool) {
        <span class="hljs-keyword">let</span> foo = <span class="hljs-string">"bar"</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(foo);
    }
}
fire(<span class="hljs-literal">false</span>); <span class="hljs-comment">//=&gt; Uncaught ReferenceError: foo is not defined</span></code></pre>
<p>因此，使用 <code>let</code>，上述问题完全解决，这也告诉了我们，应当尽可能的避免用 <code>var</code>，用 <code>let</code> 来代替，除非你需要用到变量提升。</p>
<h3 id="articleHeader2">const</h3>
<p><code>const</code> 与 <code>let</code> 的基本用法相同，定义的变量都具有块级作用域，也不会发生变量提升。不同的地方在于，<code>const</code> 定义的变量，只能赋值一次。</p>
<p>对于基本类型来说，需要通过赋值来改变其值，因此 <code>const</code> 定义之后就相当于无法改变:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const a = 1;
a = 2;  // Uncaught TypeError: Assignment to constant variable.
++a;  // Uncaught TypeError: Assignment to constant variable." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span>;
a = <span class="hljs-number">2</span>;  <span class="hljs-comment">// Uncaught TypeError: Assignment to constant variable.</span>
++a;  <span class="hljs-comment">// Uncaught TypeError: Assignment to constant variable.</span></code></pre>
<p>对于数组和对象来说，值是可以改变的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr  = [&quot;a&quot;,&quot;b&quot;,&quot;c&quot;];
arr.push(&quot;d&quot;);
arr.pop();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> arr  = [<span class="hljs-string">"a"</span>,<span class="hljs-string">"b"</span>,<span class="hljs-string">"c"</span>];
arr.push(<span class="hljs-string">"d"</span>);
arr.pop();</code></pre>
<p>那么什么时候使用 <code>const</code> 呢? 在一些不需要重复赋值的场合可以用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const provinces = [];
const months = [];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> provinces = [];
<span class="hljs-keyword">const</span> months = [];</code></pre>
<p>总而言之，多用 <code>let</code> 和 <code>const</code>，少用 <code>var</code> 。</p>
<h2 id="articleHeader3">箭头函数</h2>
<p>在 Vue 中，使用箭头函数的最大好处就是可以让 <code>this</code> 指向 Vue 实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
    el:'#root',
    data:{
        tasks:[]
    },
    mounted(){
        axios.get('/tasks')
        .then(function (response) {
            vm.tasks = response.data;
        })
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">'#root'</span>,
    <span class="hljs-attr">data</span>:{
        <span class="hljs-attr">tasks</span>:[]
    },
    mounted(){
        axios.get(<span class="hljs-string">'/tasks'</span>)
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
            vm.tasks = response.data;
        })
    }
});</code></pre>
<p>由于回调函数的 <code>this</code> 指向全局对象 <code>window</code>，因此，我们需要通过 <code>vm</code> 来访问实例的方法，如果使用箭头函数，则可以写成:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" new Vue({
    el:'#root',
    data:{
        tasks:[]
    },
    mounted(){
           axios.get('/tasks')
            .then(response => this.tasks = response.data);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">'#root'</span>,
    <span class="hljs-attr">data</span>:{
        <span class="hljs-attr">tasks</span>:[]
    },
    mounted(){
           axios.get(<span class="hljs-string">'/tasks'</span>)
            .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> <span class="hljs-keyword">this</span>.tasks = response.data);
    }
});</code></pre>
<p>箭头函数的 <code>this</code> 对象始终指向定义函数时所在的对象，相当于:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
    el:'#root',
    data:{
        tasks:[]
    },
    mounted(){
        var that = this;
        axios.get('/tasks')
        .then(function (response) {
            that.tasks = response.data;
        })
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">'#root'</span>,
    <span class="hljs-attr">data</span>:{
        <span class="hljs-attr">tasks</span>:[]
    },
    mounted(){
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
        axios.get(<span class="hljs-string">'/tasks'</span>)
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
            that.tasks = response.data;
        })
    }
});</code></pre>
<h2 id="articleHeader4">模板字符串</h2>
<p>模板字符串为 Vue 的组件模板定义带来了巨大的便利，在此之前，需要这样定义一个模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let template = '<div class=&quot;container&quot;><p>Foo</p></div>';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> template = <span class="hljs-string">'&lt;div class="container"&gt;&lt;p&gt;Foo&lt;/p&gt;&lt;/div&gt;'</span>;</code></pre>
<p>如果要写成多行，可以用反斜杠：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let template = '<div class=&quot;container&quot;>\
                    <p>Foo</p>\
                </div>';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> template = <span class="hljs-string">'&lt;div class="container"&gt;\
                    &lt;p&gt;Foo&lt;/p&gt;\
                &lt;/div&gt;'</span>;</code></pre>
<p>或者使用数组形式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let template = [
    '<div class=&quot;container&quot;>',
    '<p>Foo</p>',
    '</div>'
].join('');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> template = [
    <span class="hljs-string">'&lt;div class="container"&gt;'</span>,
    <span class="hljs-string">'&lt;p&gt;Foo&lt;/p&gt;'</span>,
    <span class="hljs-string">'&lt;/div&gt;'</span>
].join(<span class="hljs-string">''</span>);</code></pre>
<p>如果要嵌入变量，可以写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name = &quot;jack&quot;;
let template = `<div class=&quot;container&quot;><p>` + name + '</p></div>';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> name = <span class="hljs-string">"jack"</span>;
<span class="hljs-keyword">let</span> template = <span class="hljs-string">`&lt;div class="container"&gt;&lt;p&gt;`</span> + name + <span class="hljs-string">'&lt;/p&gt;&lt;/div&gt;'</span>;</code></pre>
<p>而使用模板字符串，则可以方便的在多行里面编写模板:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let template = `
    <div class=&quot;container&quot;>
        <p>Foo</p>
    </div>
`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> template = <span class="hljs-string">`
    &lt;div class="container"&gt;
        &lt;p&gt;Foo&lt;/p&gt;
    &lt;/div&gt;
`</span></code></pre>
<p>由于模板字符串的空格和换行会被保留，为了不让首行多出换行符，可以写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let template = `<div class=&quot;container&quot;>
                            <p>Foo</p>
                        </div>
                    `" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> template = <span class="hljs-string">`&lt;div class="container"&gt;
                            &lt;p&gt;Foo&lt;/p&gt;
                        &lt;/div&gt;
                    `</span></code></pre>
<p>或者使用 <code>trim()</code> 方法从字符串中移除 <strong>前导</strong> 空格、尾随空格和行终止符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let template = `
    <div class=&quot;container&quot;>
        <p>Foo</p>
    </div>
`.trim();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> template = <span class="hljs-string">`
    &lt;div class="container"&gt;
        &lt;p&gt;Foo&lt;/p&gt;
    &lt;/div&gt;
`</span>.trim();</code></pre>
<p>模板字符串嵌入变量或者表达式的方式也很简单:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name = &quot;jack&quot;;
let template = `
    <div class=&quot;container&quot;>
        <p>${name} is {100 + 100}</p>
    </div>
`.trim();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> name = <span class="hljs-string">"jack"</span>;
<span class="hljs-keyword">let</span> template = <span class="hljs-string">`
    &lt;div class="container"&gt;
        &lt;p&gt;<span class="hljs-subst">${name}</span> is {100 + 100}&lt;/p&gt;
    &lt;/div&gt;
`</span>.trim();</code></pre>
<h2 id="articleHeader5">默认参数</h2>
<p>在 <code>es6</code> 之前，JavaScript 不能像 PHP 那样支持默认参数，因此需要自己手动定义:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function  takeDiscount(price, discount){
    discount  = discount || 0.9;
    return price * discount;
}
takeDiscount(100);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">takeDiscount</span>(<span class="hljs-params">price, discount</span>)</span>{
    discount  = discount || <span class="hljs-number">0.9</span>;
    <span class="hljs-keyword">return</span> price * discount;
}
takeDiscount(<span class="hljs-number">100</span>);</code></pre>
<p><code>es6</code> 则允许定义默认参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function takeDiscount(price, discount = 0.9){
    return price * discount;
}
takeDiscount(100);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">takeDiscount</span>(<span class="hljs-params">price, discount = <span class="hljs-number">0.9</span></span>)</span>{
    <span class="hljs-keyword">return</span> price * discount;
}
takeDiscount(<span class="hljs-number">100</span>);</code></pre>
<p>甚至可以以函数形式传递参数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getDiscount(){
    return 0.9;
}

function takeDiscount(price, discount = getDiscount()){
    return price * discount;
}
takeDiscount(100);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDiscount</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">0.9</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">takeDiscount</span>(<span class="hljs-params">price, discount = getDiscount(</span>))</span>{
    <span class="hljs-keyword">return</span> price * discount;
}
takeDiscount(<span class="hljs-number">100</span>);</code></pre>
<h2 id="articleHeader6">rest 参数</h2>
<p>先从函数的参数传递说起：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sum(a,b,c){
    let total = a + b + c;
    return total;
}
sum(1, 2, 3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">a,b,c</span>)</span>{
    <span class="hljs-keyword">let</span> total = a + b + c;
    <span class="hljs-keyword">return</span> total;
}
sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);</code></pre>
<p>在  JavaScript 中，函数参数实际上以数组的方式进行传递，参数会被保存在 <code>arguments</code> 数组中，因此上例等价于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sum(){
    let total = arguments[0] + arguments[1] + arguments[2];
    return total;
}
sum(1, 2, 3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> total = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] + <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>] + <span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>];
    <span class="hljs-keyword">return</span> total;
}
sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);</code></pre>
<p>不过 <code>arguments</code>  不单单包括参数，也包括了其他东西，因此没法直接用数组函数来操作 <code>arguments</code>。如果要扩展成任意多个数值相加，可以使用循环:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total = total + arguments[i];
    }
    return total;
}
sum(1, 2, 3, 4, 6);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> total = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) {
        total = total + <span class="hljs-built_in">arguments</span>[i];
    }
    <span class="hljs-keyword">return</span> total;
}
sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>);</code></pre>
<p><code>es6</code> 则提供了 rest 参数来访问多余变量，上例等价于:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sum(...num) {
    let total = 0;
    for (let i = 0; i < num.length; i++) {
        total = total + num[i];
    }
    return total;
}
sum(1, 2, 3, 4, 6);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">...num</span>) </span>{
    <span class="hljs-keyword">let</span> total = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; num.length; i++) {
        total = total + num[i];
    }
    <span class="hljs-keyword">return</span> total;
}
sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>);</code></pre>
<p>可以以变量形式进行传递:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sum(...num) {
    let total = 0;
    for (let i = 0; i < num.length; i++) {
        total = total + num[i];
    }
    return total;
}
let nums = [1, 2, 3, 4, 6];
sum(...nums);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">...num</span>) </span>{
    <span class="hljs-keyword">let</span> total = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; num.length; i++) {
        total = total + num[i];
    }
    <span class="hljs-keyword">return</span> total;
}
<span class="hljs-keyword">let</span> nums = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>];
sum(...nums);</code></pre>
<p>在函数中体内，<code>num</code> 就是单纯由参数构成的数组，因此可以用数组函数 <code>reduce</code> 来实现同样的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sum(...num) {
    return num.reduce( (preval, curval) => {
        return preval + curval;
    })
}
sum(1, 2, 3, 4, 6);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">...num</span>) </span>{
    <span class="hljs-keyword">return</span> num.reduce( <span class="hljs-function">(<span class="hljs-params">preval, curval</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> preval + curval;
    })
}
sum(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>);</code></pre>
<p><code>...</code>  还可以与其他参数结合使用，只需要将其他参数放在前面即可:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sum(total = 0, ...num) {
    return total + num.reduce( (preval, curval) => {
        return preval + curval;
    });
}

let nums = [1,2,3,4];
sum(100, ...nums);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">total = <span class="hljs-number">0</span>, ...num</span>) </span>{
    <span class="hljs-keyword">return</span> total + num.reduce( <span class="hljs-function">(<span class="hljs-params">preval, curval</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> preval + curval;
    });
}

<span class="hljs-keyword">let</span> nums = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>];
sum(<span class="hljs-number">100</span>, ...nums);</code></pre>
<h2 id="articleHeader7">对象的简写</h2>
<h3 id="articleHeader8">函数的简写</h3>
<p>函数的简写，之前在 <code>Vue</code> 中已经用到过:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue({
   el: '#root',
   data:data,
   methods: {
       addName: function() {
           vm.names.push(vm.newName);
           vm.newName = &quot;&quot;;
       }
   }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue({
   <span class="hljs-attr">el</span>: <span class="hljs-string">'#root'</span>,
   <span class="hljs-attr">data</span>:data,
   <span class="hljs-attr">methods</span>: {
       <span class="hljs-attr">addName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
           vm.names.push(vm.newName);
           vm.newName = <span class="hljs-string">""</span>;
       }
   }
});</code></pre>
<p>可以简写为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
   el: '#root',
   data:data,
   methods: {
       addName() {
           vm.names.push(vm.newName);
           vm.newName = &quot;&quot;;
       }
   }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
   <span class="hljs-attr">el</span>: <span class="hljs-string">'#root'</span>,
   <span class="hljs-attr">data</span>:data,
   <span class="hljs-attr">methods</span>: {
       addName() {
           vm.names.push(vm.newName);
           vm.newName = <span class="hljs-string">""</span>;
       }
   }
});</code></pre>
<p>在组件中频繁用到:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('example',{
    data(){
        return {

        };
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'example'</span>,{
    data(){
        <span class="hljs-keyword">return</span> {

        };
    }
});</code></pre>
<h3 id="articleHeader9">属性的简写</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = {
        message: &quot;你好，Vue&quot;
    };

var vm = new Vue({
    el: '#root',
    data:data
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> data = {
        <span class="hljs-attr">message</span>: <span class="hljs-string">"你好，Vue"</span>
    };

<span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#root'</span>,
    <span class="hljs-attr">data</span>:data
})</code></pre>
<p>可以简写成:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = {
        message: &quot;你好，Vue&quot;
    };

var vm = new Vue({
    el: '#root',
    data
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> data = {
        <span class="hljs-attr">message</span>: <span class="hljs-string">"你好，Vue"</span>
    };

<span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#root'</span>,
    data
})</code></pre>
<p>也就是说，可以直接在对象中直接写入变量，当函数的返回值为对象时候，使用简写方式更加简洁直观：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getPerson(){
    let name = 'Jack';
    let age = 10;

    return {name, age};
    // 等价于
    // return {
    //     name : name,
    //     age : age
    // }

}
getPerson();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPerson</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> name = <span class="hljs-string">'Jack'</span>;
    <span class="hljs-keyword">let</span> age = <span class="hljs-number">10</span>;

    <span class="hljs-keyword">return</span> {name, age};
    <span class="hljs-comment">// 等价于</span>
    <span class="hljs-comment">// return {</span>
    <span class="hljs-comment">//     name : name,</span>
    <span class="hljs-comment">//     age : age</span>
    <span class="hljs-comment">// }</span>

}
getPerson();</code></pre>
<h3 id="articleHeader10">解构赋值</h3>
<p>解构赋值可以方便的取到对象的可遍历属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let person = {
    firstname : &quot;steve&quot;,
    lastname : &quot;curry&quot;,
    age : 29,
    sex : &quot;man&quot;
};

let {firstname, lastname} = person;
console.log(firstname, lastname);

// 等价于
// let firstname = person.firstname;
// let lastname = person.lastname;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> person = {
    <span class="hljs-attr">firstname</span> : <span class="hljs-string">"steve"</span>,
    <span class="hljs-attr">lastname</span> : <span class="hljs-string">"curry"</span>,
    <span class="hljs-attr">age</span> : <span class="hljs-number">29</span>,
    <span class="hljs-attr">sex</span> : <span class="hljs-string">"man"</span>
};

<span class="hljs-keyword">let</span> {firstname, lastname} = person;
<span class="hljs-built_in">console</span>.log(firstname, lastname);

<span class="hljs-comment">// 等价于</span>
<span class="hljs-comment">// let firstname = person.firstname;</span>
<span class="hljs-comment">// let lastname = person.lastname;</span></code></pre>
<p>可以将其用于函数传参中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function greet({firstname, lastname}) {
    console.log(`hello,${firstname}.${lastname}!`);
};
greet({
    firstname: 'steve',
    lastname: 'curry'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">greet</span>(<span class="hljs-params">{firstname, lastname}</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`hello,<span class="hljs-subst">${firstname}</span>.<span class="hljs-subst">${lastname}</span>!`</span>);
};
greet({
    <span class="hljs-attr">firstname</span>: <span class="hljs-string">'steve'</span>,
    <span class="hljs-attr">lastname</span>: <span class="hljs-string">'curry'</span>
});</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 2.0 入门系列（14）学习 Vue.js 需要掌握的 es6 (1)

## 原文链接
[https://segmentfault.com/a/1190000009276670](https://segmentfault.com/a/1190000009276670)

