---
title: '流程控制： jQ Deferred 与 ES6 Promise 使用新手向入坑！' 
date: 2019-02-10 2:30:42
hidden: true
slug: fu12hg3vbdc
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000006771934" src="https://static.alili.tech/img/remote/1460000006771934" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>谢谢<code>n͛i͛g͛h͛t͛i͛r͛e͛</code>大大指出的关于<code>Promise</code>中<code>catch</code>用的不到位的错误</strong>，贴上大大推荐的文章<a href="https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html" rel="nofollow noreferrer" target="_blank">Promise中的菜鸟和高阶错误</a>，文章很详细说明了一些<strong><code>Promise</code>使用中的错误和指导</strong>。另外更正内容在后面补充。</p>
<h2 id="articleHeader0">从 jQuery $.Deferred() 开始</h2>
<p>说到异步流程控制，之前用的比较多的是jQ的Deferred。那Deferred是个啥呢，不清楚没关系，直接控制台来打印看下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005072398" src="https://static.alili.tech/img/remote/1460000005072398" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>喔！看得出$.Deferred()后是个对象，其<em>下面</em>有着熟悉的<code>done</code>, <code>fail</code>, <code>always</code>字眼（对，，是不是有点熟悉了呢？没错！如果经常用ajax的话就会经常接触到这些货色）。 当然了，不止这些，还有最最最重要的<code>reject</code>和<code>resolve</code>方法，说到这两个方法，就得引出下Deferred的状态机制了——其实很简单，实例化后用上图中的<code>state</code>方法就可以查看(<code>$.Deferred().state()</code>),有三种状态</p>
<blockquote><ul>
<li><p>执行resolve/reject前，返回值是pending</p></li>
<li><p>执行了resolve，返回值是resolved</p></li>
<li><p>执行了reject，返回值是rejected</p></li>
</ul></blockquote>
<p>直接来试着用下吧！这里我们假设执行一个随机延时的<code>setTimeout</code>的异步操作，<strong>在<code>setTimeout</code>异步操作结束后</strong>，根据延时大小，做出不同回应 ! 代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function log (msg) {
    console.log(msg);
}
// 包装一个异步操作
var Async = function () {
    // 生成一个0到5秒的延迟
    var delay = Math.floor(Math.random() * 5);
    // 创建一个Deffered对象
    var dfd = $.Deferred();
    // 这里调用一个异步操作
    setTimeout(function(){
        if (delay <= 2) {
            // 置dfd状态为resolved
            dfd.resolve('一切正常!');
        } else {
            // 置dfd状态为rejected
            dfd.reject('超时了!');
        }            
    }, delay * 1000)
    // 这里要返回Deferred下的promise对象Dererred对象的原因下面会解释
    return dfd.promise();
}

Async()
    .done(function (data) {
        log(data) // 如果延迟不大于三秒 输出dfd.resolve()中的数据 '一切正常!'
    })
    .fail(function (err) {
        log(err) // 反之则 输出dfd.reject()中的数据 '超时了!' 
    })
    .always(function () {
        log('执行完毕!'); // 总是输出 '执行完毕!'
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">log</span> (<span class="hljs-params">msg</span>) </span>{
    <span class="hljs-built_in">console</span>.log(msg);
}
<span class="hljs-comment">// 包装一个异步操作</span>
<span class="hljs-keyword">var</span> Async = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 生成一个0到5秒的延迟</span>
    <span class="hljs-keyword">var</span> delay = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">5</span>);
    <span class="hljs-comment">// 创建一个Deffered对象</span>
    <span class="hljs-keyword">var</span> dfd = $.Deferred();
    <span class="hljs-comment">// 这里调用一个异步操作</span>
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span> (delay &lt;= <span class="hljs-number">2</span>) {
            <span class="hljs-comment">// 置dfd状态为resolved</span>
            dfd.resolve(<span class="hljs-string">'一切正常!'</span>);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 置dfd状态为rejected</span>
            dfd.reject(<span class="hljs-string">'超时了!'</span>);
        }            
    }, delay * <span class="hljs-number">1000</span>)
    <span class="hljs-comment">// 这里要返回Deferred下的promise对象Dererred对象的原因下面会解释</span>
    <span class="hljs-keyword">return</span> dfd.promise();
}

Async()
    .done(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
        log(data) <span class="hljs-comment">// 如果延迟不大于三秒 输出dfd.resolve()中的数据 '一切正常!'</span>
    })
    .fail(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
        log(err) <span class="hljs-comment">// 反之则 输出dfd.reject()中的数据 '超时了!' </span>
    })
    .always(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        log(<span class="hljs-string">'执行完毕!'</span>); <span class="hljs-comment">// 总是输出 '执行完毕!'</span>
    })</code></pre>
<h3 id="articleHeader1">尝试下通俗理解整个流程就是</h3>
<blockquote><ol>
<li><p>在某个操作<em>开始前</em>创建一个<code>Deferred</code>对象，然后执行操作</p></li>
<li><p>操作间可根据情况给dfd执行<code>relove</code>或者<code>reject</code>方法改变状态并传入数据</p></li>
<li><p>最后返回出dfd的对象下的一个promise对象，这里不直接返回dfd对象是因为dfd对象的状态是在第一次resolve或者reject后还可以更改的（不过里面的数据以第一次为准）！！</p></li>
<li><p>操作执行后用<code>done</code>和<code>fail</code>方法分别接受resolve和reject状态和数据（一一对应）然后执行回调（其实1.8还有个<code>then</code>方法，接受两个参数，第一个参数为<code>resolve</code>的回调，第二个为<code>reject</code>的）</p></li>
<li><p><code>always</code>是无论<code>resolve</code>还是<code>reject</code>都会执行。</p></li>
</ol></blockquote>
<h3 id="articleHeader2">讲个比较烂的比喻啊</h3>
<p><strong>我是一个流水线车间质检工人，就在平常的这样的一天，来了一批玩具熊，嗯，接下来应该是这样的</strong></p>
<blockquote><ol>
<li><p>来了一个检查目标（<code>$.Dererred()</code>），这时你还不知道它是好是坏</p></li>
<li><p>我靠我几十年的新东方炒菜技巧检验产品并给良品贴上了合格标签（<code>dfd.res* olve(合格标签)</code>），次品贴上回厂标签* （<code>dfd.reject(回厂标签及原因)</code>）</p></li>
<li><p>然后通过的良品和次品都来到了各自的包装口打好包，不能对里面的标签做更改了！（<code>dfd.promise()</code>）去往自己下一个目的地(<code>return dfd.promise</code>)</p></li>
<li><p>再然后良品来到了熊孩子手中（<code>.done()</code>）,次品回到了厂里（<code>.fail()</code>）,最后不管玩具熊到了哪里，其实都会被开膛破肚（<code>.always()</code>好吧这里有点牵强）</p></li>
</ol></blockquote>
<h3 id="articleHeader3">这里再上一张图来解释下！</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005072400" src="https://static.alili.tech/img/remote/1460000005072400" alt="" title="" style="cursor: pointer;"></span></p>
<p>还有值得说一下的是<code>always</code>里的回调，我在实际中使用时发现总是在<code>done</code>和<code>fail</code>里的回调(假设为同步)执行完毕后后执行的。</p>
<h2 id="articleHeader4">金掌银掌仙人掌 掌声有请 ES6 Promise</h2>
<p>和上面一样，先打印一下！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005072402" src="https://static.alili.tech/img/remote/1460000005072402" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以看到Promise下也有熟悉的<code>resolve</code>和<code>reject</code>方法，好像和jQ的<code>Deferred</code>颇为相似！但是不是少了点什么呢？<code>done</code>或者<code>fail</code>之类的流程控制的方法呢？？</p>
<p>不急，其实展开<code>prototype</code>原型上就可以看到挂载着的<code>then</code>方法了！（像极了jQ1.8后那个<code>then</code>，不过我觉得应该说是jQ来遵循<code>Promise</code>才对）<br><span class="img-wrap"><img data-src="/img/remote/1460000005072404" src="https://static.alili.tech/img/remote/1460000005072404" alt="" title="" style="cursor: pointer;"></span></p>
<p>Promise其实就是个构造函数，还是之前的例子，这里我们分三步走</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Async = function () {
    // 第一步，新建个promise对象，所需的异步操作在其中进行
    var prms = new Promise(function(resolve, reject){
        // 生成一个0到5秒的延迟
        var delay = Math.floor(Math.random() * 5);
        // 这里调用一个异步操作
        setTimeout(function(){
            // 第二步， 根据情况置promise为resolve或者reject
            if (delay <= 2) {
                // 置dfd状态为resolved
                resolve('一切正常!');
            } else {
                // 置dfd状态为rejected
                reject('超时了!');
            }            
        }, delay * 1000)
    })
    // 第三步，返回这个Promise对象
    return prms
}

// 强大的来了
Async()
    // then接受两个函数分别处理resolve和reject两种状态
    .then(
    function(data) {
        console.log(data) // 一切正常!
    }, 
    function(err) {
        console.log(err) // 超时了!!
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Async = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 第一步，新建个promise对象，所需的异步操作在其中进行</span>
    <span class="hljs-keyword">var</span> prms = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>)</span>{
        <span class="hljs-comment">// 生成一个0到5秒的延迟</span>
        <span class="hljs-keyword">var</span> delay = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">5</span>);
        <span class="hljs-comment">// 这里调用一个异步操作</span>
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-comment">// 第二步， 根据情况置promise为resolve或者reject</span>
            <span class="hljs-keyword">if</span> (delay &lt;= <span class="hljs-number">2</span>) {
                <span class="hljs-comment">// 置dfd状态为resolved</span>
                resolve(<span class="hljs-string">'一切正常!'</span>);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 置dfd状态为rejected</span>
                reject(<span class="hljs-string">'超时了!'</span>);
            }            
        }, delay * <span class="hljs-number">1000</span>)
    })
    <span class="hljs-comment">// 第三步，返回这个Promise对象</span>
    <span class="hljs-keyword">return</span> prms
}

<span class="hljs-comment">// 强大的来了</span>
Async()
    <span class="hljs-comment">// then接受两个函数分别处理resolve和reject两种状态</span>
    .then(
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data) <span class="hljs-comment">// 一切正常!</span>
    }, 
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
        <span class="hljs-built_in">console</span>.log(err) <span class="hljs-comment">// 超时了!!</span>
    })</code></pre>
<p>粗粗一看好像和<code>Dererred</code>不能更像了，，不过细心点的话可以发现我们在函数里直接返回了<code>prms</code>这个对象，而不是像之前把包装了一层。。。对！因为<code>Promise</code>的特性就是一旦第一次赋予了状态后面就无法更改了，这也算省心多了吧。但是问题来了，我为什么要选择用<code>Promise</code>呢？？</p>
<p>这么说吧，<strong>它是原生的 它是原生的 它是原生的！</strong>，还有<strong>可以链式链式链式链式调用！</strong>，我们可以把每一个<code>then</code>或者<code>catch</code>当做一个处理器, 比如这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Async()
    // 这里暂时只处理resolve
    .then(function(data) {
        console.log(data) // 一切正常!
        return Promise.resolve('随便什么');
    })
    // 下一个then处理器接收到上一个处理器发出的数据
    .then(function(data2) {
        console.log(data2) // 随便什么
        return Promise.reject('错误数据');
    })
    ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Async()
    <span class="hljs-comment">// 这里暂时只处理resolve</span>
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data) <span class="hljs-comment">// 一切正常!</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'随便什么'</span>);
    })
    <span class="hljs-comment">// 下一个then处理器接收到上一个处理器发出的数据</span>
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data2</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data2) <span class="hljs-comment">// 随便什么</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'错误数据'</span>);
    })
    ...</code></pre>
<p>对！没看错，其实在<code>then</code>里面你还可以<code>return</code>其他的<code>promise</code>对象传并递数据！更有甚你甚至可以什么都不返回，比如说这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Async()
    .then(function(data) {
        console.log(data) // 一切正常!
    })
    // 上面那个处理器如果不return任何东西 就会默认返回个resolve(undefined)
    // 然后下面的处理器就会接收到这个resolve(undefined)
    .then(function(data2) {
        console.log(data2) // undefined
        // 虽然没有数据来处理，但是你还可以在这里做一些事情啊，例如
        return Promise.reject('错误数据');
    })
    // 嗒哒，catch就这么登场了，这里用catch处理上个then处理器发出的reject
    .catch(fucntion(err){
        console.log(err) // 错误数据
        return '那直接返回个字符串呢？'
    })
    // 上个catch处理器返回了个字符串其实也会被下个处理器接受
    // 相当于resolve('那直接返回个字符串呢？')
    .then(function(data3){
        console.log(data3) // 那直接返回个字符串呢？
    })
    // 好，接着我们来试试在没有返回任何东西的情况下接一个catch处理器
    .catch(function(err2){
        console.log(err2) 
        // 我们可以来猜一下上面会输出什么，undefined吗？
        // 错，其实这里什么都不会输出，因为这个catch接收的是resolve
        // 但它并不会吞没这个resolve而是选择跳过，例如我们这里再返回
        return Promise.resolve('这个字符串会被跳过')
    })
    // 这里紧接着个then处理器，它接受到的数据呢
    // 其实并不是上个catch返回的resolve('这个字符串会被跳过')
    // 而是catch之前那个then处理器默认返回的resolve(undefined)
    .then(function(data4){
        console.log(data4) // undefined
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Async()
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data) <span class="hljs-comment">// 一切正常!</span>
    })
    <span class="hljs-comment">// 上面那个处理器如果不return任何东西 就会默认返回个resolve(undefined)</span>
    <span class="hljs-comment">// 然后下面的处理器就会接收到这个resolve(undefined)</span>
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data2</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data2) <span class="hljs-comment">// undefined</span>
        <span class="hljs-comment">// 虽然没有数据来处理，但是你还可以在这里做一些事情啊，例如</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'错误数据'</span>);
    })
    <span class="hljs-comment">// 嗒哒，catch就这么登场了，这里用catch处理上个then处理器发出的reject</span>
    .catch(fucntion(err){
        <span class="hljs-built_in">console</span>.log(err) <span class="hljs-comment">// 错误数据</span>
        <span class="hljs-keyword">return</span> <span class="hljs-string">'那直接返回个字符串呢？'</span>
    })
    <span class="hljs-comment">// 上个catch处理器返回了个字符串其实也会被下个处理器接受</span>
    <span class="hljs-comment">// 相当于resolve('那直接返回个字符串呢？')</span>
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data3</span>)</span>{
        <span class="hljs-built_in">console</span>.log(data3) <span class="hljs-comment">// 那直接返回个字符串呢？</span>
    })
    <span class="hljs-comment">// 好，接着我们来试试在没有返回任何东西的情况下接一个catch处理器</span>
    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err2</span>)</span>{
        <span class="hljs-built_in">console</span>.log(err2) 
        <span class="hljs-comment">// 我们可以来猜一下上面会输出什么，undefined吗？</span>
        <span class="hljs-comment">// 错，其实这里什么都不会输出，因为这个catch接收的是resolve</span>
        <span class="hljs-comment">// 但它并不会吞没这个resolve而是选择跳过，例如我们这里再返回</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'这个字符串会被跳过'</span>)
    })
    <span class="hljs-comment">// 这里紧接着个then处理器，它接受到的数据呢</span>
    <span class="hljs-comment">// 其实并不是上个catch返回的resolve('这个字符串会被跳过')</span>
    <span class="hljs-comment">// 而是catch之前那个then处理器默认返回的resolve(undefined)</span>
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data4</span>)</span>{
        <span class="hljs-built_in">console</span>.log(data4) <span class="hljs-comment">// undefined</span>
    })</code></pre>
<p>有点被绕晕了吧<span class="img-wrap"><img data-src="/img/bVvrII" src="https://static.alili.tech/img/bVvrII" alt="5.gif" title="5.gif" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">我们用一句话来梳理下：</h3>
<p>链式调下会有一串<code>then</code>和<code>catch</code>，这些<code>then</code>和<code>catch</code>处理器会<em>按照顺序</em>接受<em>上个处理器</em>所产生的返回值，并且根据<em>传入的状态</em>做出<em>不同</em>响应，要么跳过，要么处理(所以上面23行处的<code>catch</code>处理器被跳过了)</p>
<p>ps: 上面我们用的<code>then</code>处理器只有一个函数参数，所以只会处理<code>resolve</code>状态，如果是两个<code>then</code>就可以处理<code>reject</code>了。</p>
<p>－－－－更新于5月11日－－－－－</p>
<h3 id="articleHeader6">
<code>catch</code>使用的注意</h3>
<p>上面一块代码中引出了<code>catch</code>处理器, 之前以为 <code>cacth()</code> 是 <code>then(null, ...)</code> 的语法糖, 其实这么说不完全正确（功能层面上来说这两个是完全相同的没错——都是处理<code>reject</code>和异常），但是到了实际使用中<a href="https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html" rel="nofollow noreferrer" target="_blank">Promise中的菜鸟和高阶错误</a>文章中给出了明确的情况证明，这里贴一下:</p>
<p>首先只处理异常情况，下面两个是等价的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
somePromise().catch(function (err) {
  // 处理异常
});

somePromise().then(null, function (err) {
  // 处理异常
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
somePromise().catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
  <span class="hljs-comment">// 处理异常</span>
});

somePromise().then(<span class="hljs-literal">null</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
  <span class="hljs-comment">// 处理异常</span>
});</code></pre>
<p>但是，如果不只是处理异常的下面两种情况下就不一样了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="somePromise().then(function () {
  return otherPromise();
}).catch(function (err) {
  // 处理异常
});

somePromise().then(function () {
  return otherPromise();
}, function (err) {
  // 处理异常
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">somePromise().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> otherPromise();
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
  <span class="hljs-comment">// 处理异常</span>
});

somePromise().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> otherPromise();
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
  <span class="hljs-comment">// 处理异常</span>
});</code></pre>
<p>不够清楚吗？那么如果是这样呢？如果<code>第一个回调函数抛出一个错误</code>会发生什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="somePromise().then(function () {
  throw new Error('这里错了！');
}).catch(function (err) {
  console.log(err)
  // 这里错了! :)
});

somePromise().then(
function () {
  throw new Error('这里错了');
}, 
function (err) {
  console.log(err)
  // 未知 :(
  // 并没有catch到上面那个Error
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">somePromise().then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'这里错了！'</span>);
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
  <span class="hljs-built_in">console</span>.log(err)
  <span class="hljs-comment">// 这里错了! :)</span>
});

somePromise().then(
<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'这里错了'</span>);
}, 
<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
  <span class="hljs-built_in">console</span>.log(err)
  <span class="hljs-comment">// 未知 :(</span>
  <span class="hljs-comment">// 并没有catch到上面那个Error</span>
});</code></pre>
<p>结论就是，当使用 <code>then(resolveHandler, rejectHandler)</code> ， <code>rejectHandler</code> 不会捕获在 <code>resolveHandler</code> 中抛出的错误!</p>
<h4>贴完了，好吧，这有什么用呢？</h4>
<p>看似这个注意项并不影响平常使用，原文作者也说道:</p>
<blockquote><p>因为，笔者的个人习惯是从不使用then方法的第二个参数，转而使用 catch() 方法</p></blockquote>
<p>那么，问题来了，如何正确的使用<code>catch</code>呢? 其实我没有很好的想明白，<code>希望指教</code>，随便抛两个砖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1
somePromise()
    .then(resolveHandler)
    // 这个catch会处理somePromise或者resolveHandler的异常
    .catch(rejectHandler) 
    .then(otherResolveHandler)
    // 而这个catch呢只会处理resolveHandler的异常
    .catch(otherRejectHandler)
    
// 2
somePromise()
    .then(resolveHandler)
    .then(otherResolveHandler)
    // 至于这个catch则会处理somePromise、resolveHandler和otherResolveHandler的异常
    .catch(rejectHandler)
    
// 3 
somePromise()
    .catch(console.log.bind(console))
    //等价于
    .catch(function(err){
        console.log(err)
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 1</span>
somePromise()
    .then(resolveHandler)
    <span class="hljs-comment">// 这个catch会处理somePromise或者resolveHandler的异常</span>
    .catch(rejectHandler) 
    .then(otherResolveHandler)
    <span class="hljs-comment">// 而这个catch呢只会处理resolveHandler的异常</span>
    .catch(otherRejectHandler)
    
<span class="hljs-comment">// 2</span>
somePromise()
    .then(resolveHandler)
    .then(otherResolveHandler)
    <span class="hljs-comment">// 至于这个catch则会处理somePromise、resolveHandler和otherResolveHandler的异常</span>
    .catch(rejectHandler)
    
<span class="hljs-comment">// 3 </span>
somePromise()
    .catch(<span class="hljs-built_in">console</span>.log.bind(<span class="hljs-built_in">console</span>))
    <span class="hljs-comment">//等价于</span>
    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
        <span class="hljs-built_in">console</span>.log(err)
    })</code></pre>
<p>哈哈哈哈哈哈,还是好好再去想想Promise去了，弄明白了再来补充，再次谢谢<a href="https://segmentfault.com/u/nightire">@n͛i͛g͛h͛t͛i͛r͛e͛大大</a>，荆柯刺秦王</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006770036" src="https://static.alili.tech/img/remote/1460000006770036" alt="" title="" style="cursor: pointer;"></span></p>
<p>写的很粗糙，有错误的地方希望多多指教！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
流程控制： jQ Deferred 与 ES6 Promise 使用新手向入坑！

## 原文链接
[https://segmentfault.com/a/1190000005072394](https://segmentfault.com/a/1190000005072394)

