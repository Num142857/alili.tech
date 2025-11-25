---
title: '只为那句承诺-大话Promise' 
date: 2019-02-01 2:30:10
hidden: true
slug: zeqmdce19g
categories: [reprint]
---

{{< raw >}}

                    
<p>大家周末好，要说最近几年什么语言大红大紫，当属JavaScript了。话说虽然是10天就创造出的语言，但是人家能文能武。web前端自然不必多说了，各种框架你方登罢我上场，前两年还是Angular一统天下，这两年React又是大红大紫，还有Vue最近异军突起，好不红火。要是仅仅是前端也就算了，但是由于Node.js人家在后台也能写，React Native的出现让人家移动端也能做。好吧，还有硬件上也出现Ruff方案，好像硬件上也能写了。真是让人感觉挺有意思的事情。</p>
<p>图表君上边叨叨了这么多，难道是为JavaScript唱赞歌的吗？呵呵，其实并不是。只是最近因为在用上篇文章介绍的AWS Lambda。Lambda现在只支持Java，Node.js,Python。最终选择了Node.js进行开发，不可避免的要牵扯到异步操作的问题。那么今天就来聊聊JavaScript中的Promise。</p>
<h2 id="articleHeader0">什么是Promise</h2>
<blockquote>
<p>Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。</p>
<p>所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。</p>
</blockquote>
<p>上面是Promise的一个定义，引自阮一峰的ES6标准入门一书。<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">S6标准入门</a>。多说一句，目前的JavaScript项目无论是前台或者是后台，都应该采用ES6的标准语法来写，ES6让JavaScript的书写更加的清晰和规范。</p>
<h2 id="articleHeader1">基本用法</h2>
<p>如何来构造一个promise对象呢？ES6中提供了原生Promise可以使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise = new Promise(function(resolve, reject) {
  // ... here is some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  <span class="hljs-comment">// ... here is some code</span>

  <span class="hljs-keyword">if</span> (<span class="hljs-comment">/* 异步操作成功 */</span>){
    resolve(value);
  } <span class="hljs-keyword">else</span> {
    reject(error);
  }
});</code></pre>
<p>上面的例子给出了new一个promise对象的方法，Promise的构造函数接受一个函数作为参数传入，这个函数的两个参数，reject和resolve是JavaScript本身提供的两个函数。<br>一个promise对象有三个状态分别是，pending，resolved，rejected。resolve函数可以将pending状态转变为resolved状态。reject函数可以讲pending状态转变了rejected状态。对象的状态不受外界的影响，同样也是promise名字的由来。外部你拿着我的一个承诺，一会我会告诉你我的状态。</p>
<p>promise对象通过then方法来添加回调函数。例如这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promise.then(data=> console.log(data), err=> console.log(err));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>promise.then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span> <span class="hljs-built_in">console</span>.log(data), <span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span> <span class="hljs-built_in">console</span>.log(err));
</code></pre>
<p>当promise被resolved的时候，就会把data log出来。当promise被rejected的时候，err就会被log出来。<br>看上去好像是挺简单的，的确Promise的应用使得异步的操作，以同步的形式表现出来。当发生错误的时候可以通过catch方法，来定义回调函数。</p>
<h2 id="articleHeader2">怎么用</h2>
<p>上边都是一些干巴巴的定义，那么到底该怎么用呢？Promise又怎么样的解决了问题呢，下边我们看一个例子。假设下边一个场景，我们一个服务，从一个外边service获取数据，然后写到一个db里，或者一个存储里，最后在把存储的状态龙出来，那么如果没有promise是怎么写的呢？可能会是这样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getData(function (value1) {
  storeToDb(value1, function(value2) {
    logStore(value2, function(value3) {
      //...
    });
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>getData(<span class="hljs-name">function</span> (<span class="hljs-name">value1</span>) {
  storeToDb(<span class="hljs-name">value1</span>, function(<span class="hljs-name">value2</span>) {
    logStore(<span class="hljs-name">value2</span>, function(<span class="hljs-name">value3</span>) {
      //...
    })<span class="hljs-comment">;</span>
  })<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span></code></pre>
<p>传统的回调的写法，这样使得代码逻辑混乱在一起。再想想如果再加上错误处理的情况，更是酸爽。那么用promise来写会怎么样呢？看下边这样的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getData(){
    return new Promise((resolve,reject) =>{
        // ... send request to get data
        
        if(/* get successfully*/){
            resolve(data)
        }else{
            reject(err)
        }
    })
}

function storeData(data){
    return new Promise((resolve,reject)=>{
        // ... store the data
        
        if(/*store successfully*/){
            resolve(data)
        }else{
            reject(err)
        }
    })
}


getData()
    .then(data => storeData(data))
    .then(data => console.log('the process is done',data));
    .catch(err => console.error('there is the err',err));

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getData</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span>{
        <span class="hljs-comment">// ... send request to get data</span>
        
        <span class="hljs-keyword">if</span>(<span class="hljs-comment">/* get successfully*/</span>){
            resolve(data)
        }<span class="hljs-keyword">else</span>{
            reject(err)
        }
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">storeData</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
        <span class="hljs-comment">// ... store the data</span>
        
        <span class="hljs-keyword">if</span>(<span class="hljs-comment">/*store successfully*/</span>){
            resolve(data)
        }<span class="hljs-keyword">else</span>{
            reject(err)
        }
    })
}


getData()
    .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> storeData(data))
    .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'the process is done'</span>,data));
    .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'there is the err'</span>,err));

</code></pre>
<p>这样写是不是就是很清楚了，先getData，然后再storeData，最后将这次运行的情况log了出来，其中有任何的问题，在catch中都可以Catch出来。代码的逻辑以同步的方式得到了体现。我们来看看如果是其他语言会怎么写，下边是个ruby的语言的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="def get_data 
    // ...send request
    
    if /*get successfully */
        return data
    else
        raise GetDataError
    end
end


def store_data
    // ...save to db
    
    if /*save successfully */
        return data
    else
        raise StoreDataError
    end
end


/*Main Logic*/
begin
    request_data = get_data
    db_data = store_data request_data
    p &quot;here is the store data #{db_data}&quot;
rescue e
    p &quot;here is some errors #{e}&quot;
end" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>def get_data 
    <span class="hljs-comment">// ...send request</span>
    
    <span class="hljs-built_in">if</span> <span class="hljs-comment">/*get successfully */</span>
        <span class="hljs-built_in">return</span> data
    <span class="hljs-built_in">else</span>
        raise GetDataError
    <span class="hljs-built_in">end</span>
<span class="hljs-built_in">end</span>


def store_data
    <span class="hljs-comment">// ...save to db</span>
    
    <span class="hljs-built_in">if</span> <span class="hljs-comment">/*save successfully */</span>
        <span class="hljs-built_in">return</span> data
    <span class="hljs-built_in">else</span>
        raise StoreDataError
    <span class="hljs-built_in">end</span>
<span class="hljs-built_in">end</span>


<span class="hljs-comment">/*Main Logic*/</span>
<span class="hljs-built_in">begin</span>
    request_data = get_data
    db_data = store_data request_data
    p <span class="hljs-string">"here is the store data #{db_data}"</span>
rescue e
    p <span class="hljs-string">"here is some errors #{e}"</span>
<span class="hljs-built_in">end</span></code></pre>
<p>我们对比两个例子，可以看到在使用的Promise后让JavaScript的异步方式的编程模式更将清楚，也更加让人容易理解。</p>
<p>由于JavaScript的执行环境是单线程的，所以大量采用了异步的方式来进行编程，这使得我们写起代码并不十分符合我们一般的习惯。但是Promise的出现让这种问题能得到一定程度的缓解。</p>
<p>但是异步操作异步操作的好处，比如上边的那个例子，如果我们想要做的同时并发10个操作，那个在ruby或者其他语言中中就要启多个线程来进行。但是JavaScript就完全没有这个问题。只要简单的loop下就行了。</p>
<p>但是如果我们想要在这10个操作完成后根据返回的状态做点其他操作该怎么做呢？这时候用Promise.all就是最好的了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p = Promise.all([p1, p2, p3]);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">let</span> p = Promise.all([<span class="hljs-built_in">p1</span>, <span class="hljs-built_in">p2</span>, <span class="hljs-built_in">p3</span>])<span class="hljs-comment">;</span>
</code></pre>
<p>Promise.all接受数组作为参数传入，每个元素都是一个promise对象。只要所有子promise都resolved以后，p才会被resolved。只要有一个被rejected，这个p就会被rejected。但是有一点是这些子promise之间并不会有顺序的关系。再来看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var guid = 0;
function run() {
  guid++;
  var id = guid;
  return new Promise(resolve => {
    setTimeout(function () {
      console.log(id);
      resolve(id);
    }, (Math.random() * 1.5 | 0) * 1000);
  });
}

var promises = Array.from({ length: 10 }, run);
Promise.all(promises)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> guid = <span class="hljs-number">0</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params"></span>) </span>{
  guid++;
  <span class="hljs-keyword">var</span> id = guid;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(id);
      resolve(id);
    }, (<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">1.5</span> | <span class="hljs-number">0</span>) * <span class="hljs-number">1000</span>);
  });
}

<span class="hljs-keyword">var</span> promises = <span class="hljs-built_in">Array</span>.from({ <span class="hljs-attr">length</span>: <span class="hljs-number">10</span> }, run);
<span class="hljs-built_in">Promise</span>.all(promises)</code></pre>
<p>OUTPUT:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2
3
5
6
7
8
10
1
4
9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">2</span>
<span class="hljs-number">3</span>
<span class="hljs-number">5</span>
<span class="hljs-number">6</span>
<span class="hljs-number">7</span>
<span class="hljs-number">8</span>
<span class="hljs-number">10</span>
<span class="hljs-number">1</span>
<span class="hljs-number">4</span>
<span class="hljs-number">9</span></code></pre>
<p>从这次的output可以看到，promise之间并没有顺序执行，实际上是并发的。那么如何让这些promise是顺序执行呢？留个大家自己思考下，下篇文章，我们揭晓。或者可以联系图表君，私下告诉你答案哦。                                         <br>ps，当然也可以用一些第三方的库和方案，例如（async）来实现顺序操作，但是代码的乐趣不就是做些思维挑战吗:)</p>
<hr>
<p>原创文章，欢迎转发，但请标明出处。欢迎关注图表君的公众号，一起成长。在微信中搜索 “多彩数据” 或者 “Data_Visualization”</p>
<p><span class="img-wrap"><img data-src="/img/bVDMT9?w=258&amp;h=258" src="https://static.alili.tech/img/bVDMT9?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
只为那句承诺-大话Promise

## 原文链接
[https://segmentfault.com/a/1190000007327247](https://segmentfault.com/a/1190000007327247)

