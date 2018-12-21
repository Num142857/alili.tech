---
title: 'async/await 更好的异步解决方案' 
date: 2018-12-22 2:30:11
hidden: true
slug: 0mplhzfv13t
categories: [reprint]
---

{{< raw >}}

                    
<p>在实际开发中总会遇到许多异步的问题，最常见的场景便是接口请求之后一定要等一段时间才能得到结果，如果遇到多个接口前后依赖，那么问题就变得复杂。大家都一直在尝试使用更好的方案来解决这些问题。最开始只能利用回调函数，后来开始有人使用Promise的思维来搞定。到ES6中开始支持原生的Promise，引入Generator函数。</p>
<p>直到ES7，有了<code>async/await</code>。</p>
<p>这是一个用同步的思维来解决异步问题的方案。</p>
<p>我想很多人可能还不太分得清同步与异步的区别。如果你已经彻底了解了<a href="http://www.jianshu.com/p/12b9f73c5a4f" rel="nofollow noreferrer" target="_blank">事件循环</a>，那么想必对异步的概念应该非常了解。当我们发出了请求，并不会等待响应结果，而是会继续执行后面的代码，响应结果的处理在之后的事件循环中解决。那么同步的意思，就是等结果出来之后，代码才会继续往下执行。</p>
<p>我们可以用一个两人问答的场景来比喻异步与同步。A向B问了一个问题之后，不等待B的回答，接着问下一个问题，这是异步。A向B问了一个问题之后，然后就笑呵呵的等着B回答，B回答了之后他才会接着问下一个问题，这是同步。</p>
<p>那么我们先记住这个特点，<code>async/await</code>使用同步的思维，来解决异步的问题。</p>
<p>在继续分析它的语法与使用之前，我们先介绍一下如何在我们的开发环境中支持该语法。</p>
<blockquote>如果你已经知道如何配置，可跳过</blockquote>
<h3 id="articleHeader0">一、如何在自己的开发环境中支持<code>async/await</code>语法</h3>
<p>这里主要介绍两种方式。</p>
<h4>1. webpack中支持该语法</h4>
<p>首先在当前项目中使用npm下载<code>babel-loader</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm install babel-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&gt; npm install babel-loader --save-dev</code></pre>
<p>然后在配置文件<code>webpack.confing.dev.js</code>中配置，在<code>module.exports.module.rules</code>中添加如下配置元素即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  {
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: require.resolve('babel-loader'),
    options: {
      cacheDirectory: true,
    },
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
    <span class="hljs-attr">include</span>: paths.appSrc,
    <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'babel-loader'</span>),
    <span class="hljs-attr">options</span>: {
      <span class="hljs-attr">cacheDirectory</span>: <span class="hljs-literal">true</span>,
    },
  },</code></pre>
<blockquote>如果你使用最新版本的create-react-app或者vue-cli来构建你的代码，那么它们应该已经支持了该配置。</blockquote>
<h5>2. gulp中支持该语法</h5>
<p>首先安装gulp插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm install gulp-babel --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&gt; npm install gulp-babel --save-dev</code></pre>
<p>然后编写任务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel', function() {
  return gulp.src('src/app.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);
<span class="hljs-keyword">var</span> babel = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-babel'</span>);

gulp.task(<span class="hljs-string">'babel'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'src/app.js'</span>)
    .pipe(babel())
    .pipe(gulp.dest(<span class="hljs-string">'dist'</span>));
});</code></pre>
<h4>二、如何使用</h4>
<p>async函数是Generator的一个语法糖。如果你不知道Generator是什么函数也没有关系，我们只需要知道async函数实际上返回的是一个Promise对象即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function fn() {
    return 30;
}

// 或者
const fn = async () => {
    return 30;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">30</span>;
}

<span class="hljs-comment">// 或者</span>
<span class="hljs-keyword">const</span> fn = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-number">30</span>;
}</code></pre>
<p>在声明函数时，前面加上关键字<code>async</code>，这就是<code>async</code>的用法。当我们用<code>console.log</code>打印出上面声明的函数fn，我们可以看到如下结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(fn());

// result
Promise = {
    __proto__: Promise,
    [[PromiseStatus]]: &quot;resolved&quot;,
    [[PromiseValue]]: 30
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(fn());

<span class="hljs-comment">// result</span>
<span class="hljs-built_in">Promise</span> = {
    <span class="hljs-attr">__proto__</span>: <span class="hljs-built_in">Promise</span>,
    [[PromiseStatus]]: <span class="hljs-string">"resolved"</span>,
    [[PromiseValue]]: <span class="hljs-number">30</span>
}</code></pre>
<p>很显然，fn的运行结果其实就是一个Promise对象。因此我们也可以使用then来处理后续逻辑。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn().then(res => {
    console.log(res);  // 30
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fn().then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(res);  <span class="hljs-comment">// 30</span>
})</code></pre>
<p>await的含义为等待。意思就是代码需要等待await后面的函数运行完并且有了返回结果之后，才继续执行下面的代码。这正是同步的效果。</p>
<p>但是我们需要注意的是，await关键字只能在async函数中使用。并且await后面的函数运行后必须返回一个Promise对象才能实现同步的效果。</p>
<p>当我们使用一个变量去接收await的返回值时，该返回值为Promise中resolve出来的值（也就是PromiseValue）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义一个返回Promise对象的函数
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(30);
        }, 1000);
    })
}

// 然后利用async/await来完成代码
const foo = async () => {
    const t = await fn();
    console.log(t);
    console.log('next code');
}

foo();

// result:
// 30
// next code" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 定义一个返回Promise对象的函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            resolve(<span class="hljs-number">30</span>);
        }, <span class="hljs-number">1000</span>);
    })
}

<span class="hljs-comment">// 然后利用async/await来完成代码</span>
<span class="hljs-keyword">const</span> foo = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> t = <span class="hljs-keyword">await</span> fn();
    <span class="hljs-built_in">console</span>.log(t);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'next code'</span>);
}

foo();

<span class="hljs-comment">// result:</span>
<span class="hljs-comment">// 30</span>
<span class="hljs-comment">// next code</span></code></pre>
<p>运行这个例子我们可以看出，当在async函数中，运行遇到await时，就会等待await后面的函数运行完毕，而不会直接执行<code>next code</code>。</p>
<p>如果我们直接使用then方法的话，想要达到同样的结果，就不得不把后续的逻辑写在then方法中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = () => {
    return fn().then(t => {
        console.log(t);
        console.log('next code');    
    })
}

foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> foo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> fn().then(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(t);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'next code'</span>);    
    })
}

foo();</code></pre>
<p>很显然如果使用async/await的话，代码结构会更加简洁，逻辑也更加清晰。</p>
<h6>异常处理</h6>
<p>在Promise中，我们知道是通过catch的方式来捕获异常。而当我们使用async时，则通过<code>try/catch</code>来捕获异常。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('some error.');
        }, 1000);
    })
}

const foo = async () => {
    try {
        await fn();
    } catch (e) {
        console.log(e);  // some error
    }
}

foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            reject(<span class="hljs-string">'some error.'</span>);
        }, <span class="hljs-number">1000</span>);
    })
}

<span class="hljs-keyword">const</span> foo = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">await</span> fn();
    } <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-built_in">console</span>.log(e);  <span class="hljs-comment">// some error</span>
    }
}

foo();</code></pre>
<p>如果有多个await函数，那么只会返回第一个捕获到的异常。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('some error fn1.');
        }, 1000);
    })
}
function fn2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('some error fn2.');
        }, 1000);
    })
}

const foo = async () => {
    try {
        await fn1();
        await fn2();
    } catch (e) {
        console.log(e);  // some error fn1.
    }
}

foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            reject(<span class="hljs-string">'some error fn1.'</span>);
        }, <span class="hljs-number">1000</span>);
    })
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            reject(<span class="hljs-string">'some error fn2.'</span>);
        }, <span class="hljs-number">1000</span>);
    })
}

<span class="hljs-keyword">const</span> foo = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">await</span> fn1();
        <span class="hljs-keyword">await</span> fn2();
    } <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-built_in">console</span>.log(e);  <span class="hljs-comment">// some error fn1.</span>
    }
}

foo();</code></pre>
<h6>实践</h6>
<p>在实践中我们遇到异步场景最多的就是接口请求，那么这里就以jquery中的<code>$.get</code>为例简单展示一下如何配合<code>async/await</code>来解决这个场景。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 先定义接口请求的方法，由于jquery封装的几个请求方法都是返回Promise实例，因此可以直接使用await函数实现同步
const getUserInfo = () => $.get('xxxx/api/xx');

const clickHandler = async () => {
    try {
        const resp = await getUserInfo();
        // resp为接口返回内容，接下来利用它来处理对应的逻辑
        console.log(resp);

        // do something
    } catch (e) {
        // 处理错误逻辑
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 先定义接口请求的方法，由于jquery封装的几个请求方法都是返回Promise实例，因此可以直接使用await函数实现同步</span>
<span class="hljs-keyword">const</span> getUserInfo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> $.get(<span class="hljs-string">'xxxx/api/xx'</span>);

<span class="hljs-keyword">const</span> clickHandler = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> resp = <span class="hljs-keyword">await</span> getUserInfo();
        <span class="hljs-comment">// resp为接口返回内容，接下来利用它来处理对应的逻辑</span>
        <span class="hljs-built_in">console</span>.log(resp);

        <span class="hljs-comment">// do something</span>
    } <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-comment">// 处理错误逻辑</span>
    }
}</code></pre>
<blockquote>为了保证逻辑的完整性，在实践中<code>try/catch</code>必不可少。总之，不处理错误逻辑的程序员不是好程序员。</blockquote>
<p>与Promise相比，个人认为<code>async/await</code>有一定的简洁性，但也并非就比Promise有绝对的优势，因此只能算是提供了另外一种同样很棒的方式，至于大家学习之后选择哪种方式来解决自己的问题，我认为这仅仅只是个人的喜好问题。</p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
async/await 更好的异步解决方案

## 原文链接
[https://segmentfault.com/a/1190000012411744](https://segmentfault.com/a/1190000012411744)

