---
title: '关于js的回调、同步回调、异步回调' 
date: 2019-01-14 2:30:07
hidden: true
slug: oxt4efhq7jp
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">回调定义</h3>
<p>刚开始学习javascript时，对回调函数的理解仅仅停留在知道定义阶段。什么是回调函数？ 就是将一个函数作为参数传递给另一个函数，作为参数的这个函数就是回调函数。 至于为什么要用到回调函数？回调函数有什么作用？ 当时对这些一无所知！  最近学习node.js涉及到了大量的异步编程，很多地方都需要用到回调函数，所以这两天深入了解了JavaScript的回调函数，下面是我对回调函数的理解。</p>
<h3 id="articleHeader1">函数也是对象</h3>
<p>想要弄明白js回调函数，首先要清楚函数的规则，在javascript中函数是一个对象，准确的来说函数是用function()构造函数创建的一个function对象，因此我们可以将函数存储在变量中，当然也就可以将存储在变量中的函数作为一个参数传递给另一个函数，这就是回调函数。 <br>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var callback = function(arg3) {
    console.log('callback Totle is:' + arg3)
  }

function fn(arg1, arg2, cb) {
  var Total = arg1 + arg2;
  cb(Total);
  console.log('mainFunction Totle is:' + Total)
}

fn(2, 2, callback)   // 调用fn()函数，并传入2, 2, callback作为参数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> callback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg3</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'callback Totle is:'</span> + arg3)
  }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">arg1, arg2, cb</span>) </span>{
  <span class="hljs-keyword">var</span> Total = arg1 + arg2;
  cb(Total);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'mainFunction Totle is:'</span> + Total)
}

fn(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>, callback)   <span class="hljs-comment">// 调用fn()函数，并传入2, 2, callback作为参数</span></code></pre>
<p>上面例子中我们将一个匿名函数赋值给变量callback，同时将callback作为参数传递给了fn()函数，这时在函数fn()中callback就是回调函数。</p>
<h3 id="articleHeader2">同步回调和异步回调</h3>
<p>上面的代码执行结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="callback Totle is:4
mainFunction Totle is:4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">callback Totle is:<span class="hljs-number">4</span>
mainFunction Totle is:<span class="hljs-number">4</span></code></pre>
<p>不对啊！ 回调函数不是应该在主函数的最后执行吗？ <br>对，很多介绍回调函数的例子讲到这里是就完了，异步回调函数的确是应该在函数的最后执行，不过上面的例子是一个同步回调函数，函数的执行顺序依然自上而下顺序执行。 那么什么是异步回调呢？ 我们又怎么实现异步回调呢？ 下面我们举两个例子来说明：</p>
<p>示例1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f2() {

    console.log('f2 finished') 
}

function f1(cb) {

    setTimeout(cb,1000)        //用setTimeout()模拟耗时操作
    console.log('f1 finished')
}

f1(f2);    //得到的结果是 f1 finished ，f2 finished" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'f2 finished'</span>) 
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params">cb</span>) </span>{

    setTimeout(cb,<span class="hljs-number">1000</span>)        <span class="hljs-comment">//用setTimeout()模拟耗时操作</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'f1 finished'</span>)
}

f1(f2);    <span class="hljs-comment">//得到的结果是 f1 finished ，f2 finished</span></code></pre>
<p>这里我们用setTimeout()来模拟耗时操作的前提是js中的setTimeout()函数支持异步处理，所以我们得到的结果是 f1 finished ，f2 finished</p>
<p>示例2：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require(&quot;fs&quot;);

fs.readFile('input.txt','utf-8', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log(&quot;程序执行结束!&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);

fs.readFile(<span class="hljs-string">'input.txt'</span>,<span class="hljs-string">'utf-8'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, data</span>) </span>{
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.error(err);
    <span class="hljs-built_in">console</span>.log(data.toString());
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"程序执行结束!"</span>);</code></pre>
<p>程序执行的结果是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node app
程序执行结束!
我们来测试一下异步回调函数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$ node app
程序执行结束!
我们来测试一下异步回调函数</code></pre>
<p>上面例子中我们先创建了一个文件input.txt，里面的内容是:'我们来测试一下异步回调函数'<br>如果按照同步的思维，程序应该执行fs.readFile，直到文件读完之后才执行后面的console.log("程序执行结束!");  然而node中的fs.readFile是支持异步处理的，因此程序执行到这儿的时候并不会阻塞，而是继续向后执行，当文件读取完毕之后再自动调用传入的匿名回调函数，因此出现了上面的结果。</p>
<p>参考文章：<br>详解回调函数——以JS为例解读异步、回调和EventLoop <a href="http://blog.csdn.net/tywinstark/article/details/48447135" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/tywinsta...</a><br>Javascript异步编程的4种方法 - 阮一峰的网络日志<a href="http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于js的回调、同步回调、异步回调

## 原文链接
[https://segmentfault.com/a/1190000009391074](https://segmentfault.com/a/1190000009391074)

