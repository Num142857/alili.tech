---
title: 'Thunk深入解析' 
date: 2019-01-31 2:31:16
hidden: true
slug: 672s4hjh70k
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一步步打造thunkify</h1>
<p>本文的思路：</p>
<ol>
<li><p>学习thunk相关知识，主要参考阮一峰的介绍</p></li>
<li><p>一步步实现thunkify模块，并且使用测试用例来完善我们的代码，打造出一个<code>健壮</code>的模块</p></li>
</ol>
<h2 id="articleHeader1">1. 诞生背景</h2>
<p>Thunk函数的诞生是源于一个编译器设计的问题：<code>求值策略</code>，即函数的参数到底应该何时求值。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 1;
function f(m) {
    return m * 2;
}
f(x + 5);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">m</span>) </span>{
    <span class="hljs-keyword">return</span> m * <span class="hljs-number">2</span>;
}
f(x + <span class="hljs-number">5</span>);</code></pre>
<p>其中<code>x+5</code>这个表达式应该什么时候求值，有两种思路</p>
<ul>
<li><p>传值调用(call by value)，即在进入函数体之间，先计算x+5的值，再将这个值（6）传入函数f，例如c语言，这种做法的好处是实现比较简单，但是有可能会造成性能损失。</p></li>
<li><p>传名调用(call by name)，即直接将表达式(x+5)传入函数体，只在用到它的时候求值。</p></li>
</ul>
<h2 id="articleHeader2">2. Thunk函数的含义</h2>
<p>编译器的<code>传名调用</code>实现，往往就是将参数放到一个临时函数之中，再将这个临时函数转入函数体，这个临时函数就叫做<code>Thunk函数</code>。</p>
<p>来看一段代码示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f(m) {
    return m*2;
}

f(x + 5);

// 等价于以下代码
var thunk = function () {
    return x + 5;
};

function f(thunk) {
    return thunk() * 2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">m</span>) </span>{
    <span class="hljs-keyword">return</span> m*<span class="hljs-number">2</span>;
}

f(x + <span class="hljs-number">5</span>);

<span class="hljs-comment">// 等价于以下代码</span>
<span class="hljs-keyword">var</span> thunk = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> x + <span class="hljs-number">5</span>;
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">thunk</span>) </span>{
    <span class="hljs-keyword">return</span> thunk() * <span class="hljs-number">2</span>;
}</code></pre>
<h2 id="articleHeader3">3. javascript中的Thunk函数</h2>
<p>我们都知道Javascript是传值调用的，那么js中的Thunk函数又是怎么回事？</p>
<p>在Javascript语言中，Thunk函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。</p>
<p>还是通过代码来理解，即</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正常版本的readFile，需要两个参数filename、callback
fs.readFile(fileName, callback);

// thunk版本的readFile
var readFileThunk = thunkify(fs.readFile);
readFileThunk(fileName)(callback);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 正常版本的readFile，需要两个参数filename、callback</span>
fs.readFile(fileName, callback);

<span class="hljs-comment">// thunk版本的readFile</span>
<span class="hljs-keyword">var</span> readFileThunk = thunkify(fs.readFile);
readFileThunk(fileName)(callback);</code></pre>
<p><em>原文中例子就是柯里化，预置参数fileName，直接调用fs.readFile</em></p>
<p>好，现在我们来思考如何实现<code>thunkify</code>函数。我们从调用的形式来看，返回的应该是一个高阶函数，即返回一个函数a，a的返回还是一个函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var thunkify = function (fn) {
    return function () {
        return function () {

        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> thunkify = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

        }
    }
};</code></pre>
<p>结合上述例子，因为是包装函数，因此最终还是readFile执行，且需要fileName，因此：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var thunkify = function (fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function (callback) {
            args.push(callback);
            return fn.apply(this, args);
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> thunkify = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
            args.push(callback);
            <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, args);
        }
    }
};</code></pre>
<p>这样似乎很完美，我们运行整个示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs');

var thunkify = function (fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function (callback) {
            args.push(callback);
            return fn.apply(this, args);
        }
    }
};

var readFileThunk = thunkify(fs.readFile);
readFileThunk('test.txt', 'utf-8')( (err, data) => {
    console.log(data);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

<span class="hljs-keyword">var</span> thunkify = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
            args.push(callback);
            <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, args);
        }
    }
};

<span class="hljs-keyword">var</span> readFileThunk = thunkify(fs.readFile);
readFileThunk(<span class="hljs-string">'test.txt'</span>, <span class="hljs-string">'utf-8'</span>)( <span class="hljs-function">(<span class="hljs-params">err, data</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(data);
});</code></pre>
<p>运行结果为</p>
<p><span class="img-wrap"><img data-src="/img/bVFJOD?w=592&amp;h=80" src="https://static.alili.tech/img/bVFJOD?w=592&amp;h=80" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">4. 打造thunkify模块</h2>
<p>要写出一个健壮的<code>thunkify</code>函数，需要考虑的各种情况，而我们通过tj大神写的<a href="https://github.com/tj/node-thunkify/blob/master/test/index.js" rel="nofollow noreferrer" target="_blank">thunkify模块</a>的测试代码，来看看我们自己的<code>thunkify</code>还存在哪些不足，一步步来优化。</p>
<p>1、保存上下文的问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function load(fn) {
  fn(null, this.name);
}

var user = {
  name: 'tobi',
  load: thunkify(load)
};

user.load()((err, res) => {
    console.log(res);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">load</span>(<span class="hljs-params">fn</span>) </span>{
  fn(<span class="hljs-literal">null</span>, <span class="hljs-keyword">this</span>.name);
}

<span class="hljs-keyword">var</span> user = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'tobi'</span>,
  <span class="hljs-attr">load</span>: thunkify(load)
};

user.load()(<span class="hljs-function">(<span class="hljs-params">err, res</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(res);
});</code></pre>
<p>运行之后，res的结果为<code>undefined</code>，原因是没有保存上下文，改进一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var thunkify = function (fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        var ctx = this;
        return function (callback) {
            args.push(callback);
            return fn.apply(ctx, args);
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> thunkify = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">var</span> ctx = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
            args.push(callback);
            <span class="hljs-keyword">return</span> fn.apply(ctx, args);
        }
    }
};</code></pre>
<p>2、捕抓错误</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function load(fn) {
  throw new Error('boom');
}
load = thunkify(load);
load()(err => console.log(err.message));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">load</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'boom'</span>);
}
load = thunkify(load);
load()(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err.message));</code></pre>
<p>运行之后，发现并没有捕抓到错误，我们需要执行函数进行try/catch，并且当出错时，传递出错信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var thunkify = function (fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        var ctx = this;
        return function (callback) {
            args.push(callback);
            var result;
            // try/catch捕抓信息，并且出错时，传递给回调函数
            try {
                result = fn.apply(ctx, args);
            } catch (e) {
                callback(e);
            }
            return result;
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> thunkify = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">var</span> ctx = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
            args.push(callback);
            <span class="hljs-keyword">var</span> result;
            <span class="hljs-comment">// try/catch捕抓信息，并且出错时，传递给回调函数</span>
            <span class="hljs-keyword">try</span> {
                result = fn.apply(ctx, args);
            } <span class="hljs-keyword">catch</span> (e) {
                callback(e);
            }
            <span class="hljs-keyword">return</span> result;
        }
    }
};</code></pre>
<p>3、回调函数应该只调用一次。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function load(fn) {
  fn(null, 1);
  fn(null, 2);
  fn(null, 3);
}

load = thunkify(load);

load()((err,ret) => console.log(ret));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">load</span>(<span class="hljs-params">fn</span>) </span>{
  fn(<span class="hljs-literal">null</span>, <span class="hljs-number">1</span>);
  fn(<span class="hljs-literal">null</span>, <span class="hljs-number">2</span>);
  fn(<span class="hljs-literal">null</span>, <span class="hljs-number">3</span>);
}

load = thunkify(load);

load()(<span class="hljs-function">(<span class="hljs-params">err,ret</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(ret));</code></pre>
<p>运行输出结果为<code>1 2 3</code>，而我们期望结果只为<code>1</code>，那么需要判断callback是否已经执行过了，使其只执行一次。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var thunkify = function (fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        var ctx = this;
        return function (callback) {
            var called; 
            // 对callback进行封装，使其只能执行一次。
            args.push(function () {
                if(called) return;
                called = true;
                callback.apply(null, arguments);
            });
            var result;
            try {
                result = fn.apply(ctx, args);
            } catch (e) {
                callback(e);
            }
            return result;
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> thunkify = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">var</span> ctx = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
            <span class="hljs-keyword">var</span> called; 
            <span class="hljs-comment">// 对callback进行封装，使其只能执行一次。</span>
            args.push(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">if</span>(called) <span class="hljs-keyword">return</span>;
                called = <span class="hljs-literal">true</span>;
                callback.apply(<span class="hljs-literal">null</span>, <span class="hljs-built_in">arguments</span>);
            });
            <span class="hljs-keyword">var</span> result;
            <span class="hljs-keyword">try</span> {
                result = fn.apply(ctx, args);
            } <span class="hljs-keyword">catch</span> (e) {
                callback(e);
            }
            <span class="hljs-keyword">return</span> result;
        }
    }
};</code></pre>
<p>到这里，我们通过了所有的测试，完成了一个<code>健壮</code>的<code>thunkify</code>模块。</p>
<h2 id="articleHeader5">5. 总结</h2>
<p>在学习一个概念或者一个模块时，测试代码加深你对知识的理解和掌握。</p>
<h2 id="articleHeader6">来源</h2>
<ol>
<li><p><a href="http://www.ruanyifeng.com/blog/2015/05/thunk.html" rel="nofollow noreferrer" target="_blank">Thunk-阮一峰</a></p></li>
<li><p><a href="https://github.com/tj/node-thunkify" rel="nofollow noreferrer" target="_blank">thunkify-tj</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Thunk深入解析

## 原文链接
[https://segmentfault.com/a/1190000007525293](https://segmentfault.com/a/1190000007525293)

