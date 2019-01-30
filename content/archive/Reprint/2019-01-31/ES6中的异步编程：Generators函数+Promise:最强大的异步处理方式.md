---
title: 'ES6中的异步编程：Generators函数+Promise:最强大的异步处理方式' 
date: 2019-01-31 2:31:16
hidden: true
slug: 5x6tenwjeux
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://njfeng.com/2016/11/generation-async/" rel="nofollow noreferrer" target="_blank">访问原文地址</a></p>
<p>generators主要作用就是提供了一种，单线程的，很像同步方法的编程风格，方便你把异步实现的那些细节藏在别处。这让我们可以用一种很自然的方式书写我们代码中的流程和状态逻辑，不再需要去遵循那些奇怪的异步编程风格。</p>
<p>换句话说，通过将我们generator逻辑中的一些值的运算操作和和异步处理(使用generators的迭代器iterator)这些值实现细节分开来写，我们可以非常好的把性能处理和业务关注点给分开。</p>
<p>结果呢？所有那些强大的异步代码，将具备跟同步编程一样的可读性和可维护性。</p>
<p>那么我们将如何完成这些壮举？</p>
<h2 id="articleHeader0">一个简单的异步功能</h2>
<p>先从这个非常的简单的sample代码开始，目前generators并不需要去额外的处理一些这段代码还没有了的异步功能。</p>
<p>举例下，加入现在的异步代码已经是这样的了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeAjaxCall(url, cb) {
    //do some ajax fun
    //call cb(result) when complete
}

makeAjaxCall('http://some.url.1', function(result1) {
    var data = JSON.parse(result1);
    
    makeAjaxCall('http://some.url.2/?id='+data.id, function(result2) {
        var resp = JSON.parse(result2);
        console.log('The value you asked for: '+ resp.value);
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeAjaxCall</span>(<span class="hljs-params">url, cb</span>) </span>{
    <span class="hljs-comment">//do some ajax fun</span>
    <span class="hljs-comment">//call cb(result) when complete</span>
}

makeAjaxCall(<span class="hljs-string">'http://some.url.1'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result1</span>) </span>{
    <span class="hljs-keyword">var</span> data = <span class="hljs-built_in">JSON</span>.parse(result1);
    
    makeAjaxCall(<span class="hljs-string">'http://some.url.2/?id='</span>+data.id, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result2</span>) </span>{
        <span class="hljs-keyword">var</span> resp = <span class="hljs-built_in">JSON</span>.parse(result2);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'The value you asked for: '</span>+ resp.value);
    });
});</code></pre>
<p>用一个generator（不添加任何decoration）去重新实现一遍，代码看这里：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function request(url) {
    // this is where we're hiding the asynchronicity,
    // away from the main code of our generator
    // it.next() 是generators的迭代器
    makeAjaxCall(url, function(response) {
        it.next(response);
    });
}

function *main() {
    var result1 = yield request('http://some.url.1');
    var data = JSON.parse(result1);
    
    var result2 = yield request('http://some.url.2/?id='+data.id);
    var resp = JSON.parse(result2);
    console.log('The value you asked for: '+ resp.value);
}

var it = main();
it.next(); //启动所有请求" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-comment">// this is where we're hiding the asynchronicity,</span>
    <span class="hljs-comment">// away from the main code of our generator</span>
    <span class="hljs-comment">// it.next() 是generators的迭代器</span>
    makeAjaxCall(url, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
        it.next(response);
    });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> result1 = <span class="hljs-keyword">yield</span> request(<span class="hljs-string">'http://some.url.1'</span>);
    <span class="hljs-keyword">var</span> data = <span class="hljs-built_in">JSON</span>.parse(result1);
    
    <span class="hljs-keyword">var</span> result2 = <span class="hljs-keyword">yield</span> request(<span class="hljs-string">'http://some.url.2/?id='</span>+data.id);
    <span class="hljs-keyword">var</span> resp = <span class="hljs-built_in">JSON</span>.parse(result2);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'The value you asked for: '</span>+ resp.value);
}

<span class="hljs-keyword">var</span> it = main();
it.next(); <span class="hljs-comment">//启动所有请求</span></code></pre>
<p>让我们捋一下这是如何工作的</p>
<p><code>request(..)</code>函数对<code>makeAjaxCall(..)</code>做了基本封装，让数据请求的回调函数中调用generator的iterator的<code>next(...)</code>方法。</p>
<p>先来看调用<code>request("..")</code>，你会发现这里根本没有return任何值（换句话来说，这是undefined）。这没关系，但是它跟我们在这篇文章后面会讨论到的方法做对比是很重要的：我需要有效的在这里使用yield undefined.</p>
<p>这时我们来调用yield（这时还是一个undefined值），其实除了暂停一下我们的generators之外没有做别的了。它将等待知道下次再调用it.next(..) 才恢复，我们队列已经把它在安排在（作为一个回调）Ajax请求结束的时候。</p>
<p>但是当yield表达式执行返回结果后我们做了什么？我们把返回值赋值给了result1.。那为什么yield会有从第一个Ajax请求返回的值？</p>
<p>这是因为当it.next(..)在Ajax的callback中调用的是偶，它传递Ajax的返回结果。这说明这个返回值发送到我们的generators时，已经中间那句<code>result1 = yield .. </code>给暂停下来了。</p>
<p>这个真的很酷很强大。实质上看，<code>result1 = yield request(..)</code>这句是请求数据，但是它完全把异步逻辑在我们面前藏起来了，至少不需要我们在这里考虑这部分异步逻辑，它通过yield的暂停能力隐藏了异步逻辑，同时把generator恢复逻辑的功能分离到下一个yield函数中。这就让我们的主要逻辑看上去很像一个同步请求方法。</p>
<p>第二句表达式<code>result2 = yield result(..)</code>也基本一样的作用，它将pauses与resumes传进去，输出一个我们请求的值，也根本不需要对异步操作担心。</p>
<p>当然，因为yield的存在，这里会有一个微妙的提示，在这个点上会发生一些神奇的事情（也称异步）。但是跟噩梦般的嵌套回调地狱（或者是promise链的API开销）相比，yield语句只是需要一个很小的语法开销。</p>
<p>上面的代码总是启动一个异步Ajax请求，但是如果没有做会发生什么？如果我们后来更改了我们程序中先前（预先请求）的Ajax返回的数据，该怎么办？或者我们的程序的URL路由系统通过其他一些复杂的逻辑，可以立即满足Ajax请求，这时就可以不需要fetch数据从服务器了。</p>
<p>这样，我们可以把<code>request(..)</code>代码稍微修改一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cache = {};

function request(url) {
    if(cache[url]) {
        // defer cache里面的数据对现在来说是已经足够了
        // 执行下面
        setTimeout(function() {
            it.next(cache[url])
        }, 0);
    }
    else {
        makeAjaxCall(url, function(resp) {
            cache[url] = resp;
            it.next(resp);
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> cache = {};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">if</span>(cache[url]) {
        <span class="hljs-comment">// defer cache里面的数据对现在来说是已经足够了</span>
        <span class="hljs-comment">// 执行下面</span>
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            it.next(cache[url])
        }, <span class="hljs-number">0</span>);
    }
    <span class="hljs-keyword">else</span> {
        makeAjaxCall(url, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resp</span>) </span>{
            cache[url] = resp;
            it.next(resp);
        })
    }
}</code></pre>
<p>注意：一句很奇妙、神奇的<code>setTimeout(..0)</code>放在了当缓存中已经请求过数据的处理逻辑中。如果我们立即调用<code>it.next(...)</code>，这样会发生一个error，这是因为generator还没有完成paused操作。我们的函数首先要完全调用<code>request(..)</code>,这时才会启动yield的暂停。因此，我们不能立即在<code>request(..)</code>中立即调用<code>it.next(...)</code>，这是因为这时generator仍然在运行(yield并没有执行)。但是我们可以稍后一点调用<code>it.next(...)</code>，等待现在的线程执行完毕，这就是<code>setTimeout(..0)</code>这句有魔性的代码放在这里的意义。我们稍后还会有一个更好的解决办法。</p>
<p>现在，我们的generator代码并不需要发生任何变化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var restult1 = yield request('http://some.url.1');
var data = JSON.parse(result1);
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> restult1 = <span class="hljs-keyword">yield</span> request(<span class="hljs-string">'http://some.url.1'</span>);
<span class="hljs-keyword">var</span> data = <span class="hljs-built_in">JSON</span>.parse(result1);
...</code></pre>
<p>看到没？我们的generator逻辑（也就是我们的流程逻辑）即使增加了缓存处理功能后，仍不需要发生任何改变。</p>
<p><code>*main()</code>中的代码还是只需要请求数据后暂停，之后等到数据返回后顺序执行下去。在我们当前的情况下，‘暂停’可能相对要长一些（做一个服务器的请求，大约要300~800ms），或者他可以几乎立即返回（走setTimeout的逻辑），但是我们的流程逻辑完全不需要关心这些。</p>
<p>这就是将异步编程抽象成更小细节的真正力量。</p>
<h2 id="articleHeader1">更好的异步编程</h2>
<p>上面的方法可以适用于那些比较简单的异步generator工作流程。但是它将很快收到限制，因此我们需要一些更强大的异步机制与我们的generator来合作，这样才可以发挥出更强大的功能。那是什么机制：Promise。</p>
<p>早先的Ajax实例总是会收到嵌套回调的困扰，问题如下：</p>
<ul>
<li><p>1.没有明确的方法来处理请求error。我们都知道，Ajax请求有时是会失败的，这时我们需要使用generator中的<code>it.throw(...)</code>,同时还需要使用<code>try...catch</code>来处理请求错误时的逻辑。但是这更多是一些在后台（我们那些在iterator中的代码）手动的工作。我需要一些可以服用的方法，放在我们自己代码的generator中。</p></li>
<li><p>2.假如<code>makeAjaxCall(..)</code>这段代码不在我们的控制下了，或者他需要多次调用回调，又或者它同时返回success与error，等等。这时我们的generator的会变得乱七八糟（返回error实现，出现异常值，等等）。控制以及防止发生这类问题是需要花费大量的手工时间的，而且一点也不能即插即用。</p></li>
<li><p>3.通常我需要执行并行执行任务（比如同时做2个Ajax请求）。由于generator yield机制都是逐步暂停，无法在同时运行另一个或多个任务，他的任务必须一个一个的按顺序执行。因此，这不是太容易在一个generator中去操作多任务，我们只能默默的在背后手撸大量的代码。</p></li>
</ul>
<p>就像你看到的，所有的问题都被解决了。但是没人愿意每次都去反复的去实现一遍这些方法。我们需要一种更强大的模式，专门设计出一个可信赖的，可重用的基于generator异步编程的解决方法。</p>
<p>什么模式？把promise与yield结合，使得可以在执行完成后恢复generator的流程。</p>
<p>让我们稍微用promise修改下<code>request(..)</code>，让yield返回一个promise。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function request(url) {
    //现在返回一个promise了
    return new Promise( function(resolve, reject) {
        makeAjaxCall(url, resolve);
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-comment">//现在返回一个promise了</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        makeAjaxCall(url, resolve);
    });
}</code></pre>
<p><code>request(..)</code>现在由一个promise构成，当Ajax请求完成后会返回这个promise，但是然后呢？</p>
<p>我们需要控制generator的iterator，它将接受到yield返回的那个promise，同时通过next(...)恢复generator运行，并把他们传递下去，我增加了一个<code>runGenerator(...)</code>方法来做这件事。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//比较简单，没有error事件处理
funtion runGenerator(g) {
    var it = g(), retl
    
    //异步iterator遍历generator
    (function iterate(val) {
        //返回一个promise
        ret = it.next(val);
        
        if(!ret.done) {
            if('then' in ret.value) {
                //等待接收promise
                ret.value.then(iterate);
            }
            //获取立即就有的数据，不是promise了
            else {
                //避免同步操作
                setTimeout(function() {
                    iterate(ret.value);
                }, 0);
            }
        }
    })();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//比较简单，没有error事件处理</span>
funtion runGenerator(g) {
    <span class="hljs-keyword">var</span> it = g(), retl
    
    <span class="hljs-comment">//异步iterator遍历generator</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">iterate</span>(<span class="hljs-params">val</span>) </span>{
        <span class="hljs-comment">//返回一个promise</span>
        ret = it.next(val);
        
        <span class="hljs-keyword">if</span>(!ret.done) {
            <span class="hljs-keyword">if</span>(<span class="hljs-string">'then'</span> <span class="hljs-keyword">in</span> ret.value) {
                <span class="hljs-comment">//等待接收promise</span>
                ret.value.then(iterate);
            }
            <span class="hljs-comment">//获取立即就有的数据，不是promise了</span>
            <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">//避免同步操作</span>
                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    iterate(ret.value);
                }, <span class="hljs-number">0</span>);
            }
        }
    })();
}</code></pre>
<p>关键点 :</p>
<ul>
<li><p>自动初始化generator（直接创建它的iterator），并且异步递将他一直运行到结束（当<code>done:true</code>就不在执行）</p></li>
<li><p>如果Promise被返回出来，这时我们就等待到执行<code>then(...)</code>方法的时候再处理。</p></li>
<li><p>如果是可以立即返回的数据，我们直接把数据返回给generator让他直接去执行下一步。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="runGenerator( function *main(){
    var result1 = yield request( &quot;http://some.url.1&quot; );
    var data = JSON.parse( result1 );

    var result2 = yield request( &quot;http://some.url.2?id=&quot; + data.id );
    var resp = JSON.parse( result2 );
    console.log( &quot;The value you asked for: &quot; + resp.value );
} );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">runGenerator( <span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">main</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> result1 = <span class="hljs-keyword">yield</span> request( <span class="hljs-string">"http://some.url.1"</span> );
    <span class="hljs-keyword">var</span> data = <span class="hljs-built_in">JSON</span>.parse( result1 );

    <span class="hljs-keyword">var</span> result2 = <span class="hljs-keyword">yield</span> request( <span class="hljs-string">"http://some.url.2?id="</span> + data.id );
    <span class="hljs-keyword">var</span> resp = <span class="hljs-built_in">JSON</span>.parse( result2 );
    <span class="hljs-built_in">console</span>.log( <span class="hljs-string">"The value you asked for: "</span> + resp.value );
} );</code></pre>
<p>等一下，现在的generator跟原先的完全一样嘛。尽管我们改用了promise，但是yield方法不需要有什么变化，因为我们把那些逻辑都从我们的流程管理中分离出去了。</p>
<p>尽管现在的yield是返回一个promise了，并把这个promise传递给下一个<code>it.next(..)</code>,但是<code>result1 = yield request(..)</code>这句得到的值跟以前还是一样的。</p>
<p>我们现在开始用promise来管理generator中的异步代码，这样我们就解决掉所有使用回调函数方法中会出现的反转/信任问题。由于我们用了generator+promise的方法，我们不需要增加任何逻辑就解决掉了以上所有问题</p>
<ul>
<li><p>我们可以很容易的增加一个error异常处理。虽然不在<code>runGenerator(...)</code>中，但是很容易从一个promise中监听error，并它他们的逻辑写在<code>it.throw(..)</code>里面，这时我们就可以用上<code>try..catch</code>`方法在我们的generator代码中去获取和管理erros了。</p></li>
<li><p>我们得到到所有的 control/trustability，完全不需要增加代码。</p></li>
<li>
<p>promise有着很强的抽象性，让我们可以实现一些多任务的并行操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="比如：`Promise.all([ .. ])`就可以并行执行一个promise数组，yield虽然只能拿到一个promise，但是这个是所有子promise执行完毕之后的集合数组。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mercury"><code>比如：`Promise.<span class="hljs-built_in">all</span>([ .. ])`就可以并行执行一个<span class="hljs-keyword">promise</span>数组，yield虽然只能拿到一个<span class="hljs-keyword">promise</span>，但是这个是所有子<span class="hljs-keyword">promise</span>执行完毕之后的集合数组。
</code></pre>
</li>
</ul>
<p>先让我们看下error处理的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function request(url) {
    return new Promise( function(resolve, reject) {
        //第一个参数是error
        makeAjaxCall(url, function(err, text) {
            if(err) reject(err);
            else resolve(text);
        });
    });
}

runGenerator(function *main() {
    try {
        var result1 = yield request('http://some.url.1');
    }
    catch(err) {
        console.log('Error:' + err);
        retrun;
    }
    var data = JSON.parse(result1);
    
    try{
        var result2 = yield request('http://some.url.2?id='+data.id);
    }
    catch(err) {
        console.log('Error:' + err);
        retrun;
    }
    var resp = JSON.parse(result2);
    console.log(&quot;The value you asked for: &quot; + resp.value);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-comment">//第一个参数是error</span>
        makeAjaxCall(url, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, text</span>) </span>{
            <span class="hljs-keyword">if</span>(err) reject(err);
            <span class="hljs-keyword">else</span> resolve(text);
        });
    });
}

runGenerator(<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">var</span> result1 = <span class="hljs-keyword">yield</span> request(<span class="hljs-string">'http://some.url.1'</span>);
    }
    <span class="hljs-keyword">catch</span>(err) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Error:'</span> + err);
        retrun;
    }
    <span class="hljs-keyword">var</span> data = <span class="hljs-built_in">JSON</span>.parse(result1);
    
    <span class="hljs-keyword">try</span>{
        <span class="hljs-keyword">var</span> result2 = <span class="hljs-keyword">yield</span> request(<span class="hljs-string">'http://some.url.2?id='</span>+data.id);
    }
    <span class="hljs-keyword">catch</span>(err) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Error:'</span> + err);
        retrun;
    }
    <span class="hljs-keyword">var</span> resp = <span class="hljs-built_in">JSON</span>.parse(result2);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"The value you asked for: "</span> + resp.value);
});
</code></pre>
<p>如果执行url的fetch时promise被reject（请求失败，或者异常）了，promise会给generator抛出一个异常，通过<code>try..catch</code>语句可以获取到了。</p>
<p>现在，我们让promise来处理更复杂的异步操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function request(url) {
    return new Promise( function(resolve, reject) {
        makeAjax(url, resolve);
    })
    //获取到返回的text值后，做一些处理。
    .then( function(text) {
        
            //如果我们拿到的是一个url就把text提前出来在返回
            if(/^http?:\/\/.+/.text(text)) {
                return request(text)；            }
            //如果我们就是要一个text，直接返回
            else {
                return text;
            }
    });
}

runGenerator (function *main() {
    var search_terms = yield Promise.all([
        request( &quot;http://some.url.1&quot; ),
     request( &quot;http://some.url.2&quot; ),
     request( &quot;http://some.url.3&quot; )
    ]);

    var search_results = yield request(
        'http://some.url.4?search='+search_terms.join('+')
    );
    var resp = JSON.parse(search_results);
    
    console.log('Search results:'+resp.value);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        makeAjax(url, resolve);
    })
    <span class="hljs-comment">//获取到返回的text值后，做一些处理。</span>
    .then( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">text</span>) </span>{
        
            <span class="hljs-comment">//如果我们拿到的是一个url就把text提前出来在返回</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/^http?:\/\/.+/</span>.text(text)) {
                <span class="hljs-keyword">return</span> request(text)；            }
            <span class="hljs-comment">//如果我们就是要一个text，直接返回</span>
            <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">return</span> text;
            }
    });
}

runGenerator (<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> search_terms = <span class="hljs-keyword">yield</span> <span class="hljs-built_in">Promise</span>.all([
        request( <span class="hljs-string">"http://some.url.1"</span> ),
     request( <span class="hljs-string">"http://some.url.2"</span> ),
     request( <span class="hljs-string">"http://some.url.3"</span> )
    ]);

    <span class="hljs-keyword">var</span> search_results = <span class="hljs-keyword">yield</span> request(
        <span class="hljs-string">'http://some.url.4?search='</span>+search_terms.join(<span class="hljs-string">'+'</span>)
    );
    <span class="hljs-keyword">var</span> resp = <span class="hljs-built_in">JSON</span>.parse(search_results);
    
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Search results:'</span>+resp.value);
});
</code></pre>
<p>Promise.all([ .. ]) 里面放了3个子promise，主promise完成后就会在runGenerator中恢复generator。子promise拿到的是一天重定向的url，我们会把它丢给下一个request请求，然后获取到最终数据。</p>
<p>任何复杂的异步功能都可以被promise搞定，而且你还可以用generator把这些流程写的像同步代码一样。只要你让yield返回一个promise。</p>
<h2 id="articleHeader2">ES7 async</h2>
<p>现在可以稍微提下ES7了，它更像把<code>runGenerator(..)</code>这个异步执行逻辑做了一层封装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async funtion main() {
    var result1 = await request('http://some.url.1');
    var data = JSON.parse(result1);
    
    var result2 = await request('http://some.url.2?id='+data.id);
    var resp = JSON.parse(result2);
    console.log( &quot;The value you asked for: &quot; + resp.value );
}

main();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> funtion main() {
    <span class="hljs-keyword">var</span> result1 = <span class="hljs-keyword">await</span> request(<span class="hljs-string">'http://some.url.1'</span>);
    <span class="hljs-keyword">var</span> data = <span class="hljs-built_in">JSON</span>.parse(result1);
    
    <span class="hljs-keyword">var</span> result2 = <span class="hljs-keyword">await</span> request(<span class="hljs-string">'http://some.url.2?id='</span>+data.id);
    <span class="hljs-keyword">var</span> resp = <span class="hljs-built_in">JSON</span>.parse(result2);
    <span class="hljs-built_in">console</span>.log( <span class="hljs-string">"The value you asked for: "</span> + resp.value );
}

main();</code></pre>
<p>我们直接调用<code>main()</code>就可以执行完所有的流程，不需要调用<code>next</code>,也不需要去实现<code>runGenerator(..)</code>之类的来管理promise逻辑。只需要把yield关键词换成await就可以告诉异步方法，我们在这里需要等到一个promise后才会接着执行。</p>
<p>有了这些原生的语法支持，是不是很酷。</p>
<h2 id="articleHeader3">小结</h2>
<p><code>generator + yielded promise(s)</code>的组合目前是最强大，也是最优雅的异步流程管理编程方式。通过封装一层流执行逻辑，我们可以自动的让我们的generator执行结束，并且还可以像处理同步逻辑一样管理error事件。</p>
<p>在ES7中，我们甚至连这一层封装都不需要写了，变得更方便</p>
<h2 id="articleHeader4">参考</h2>
<ul>
<li><p><a href="http://blog.mgechev.com/2014/12/21/handling-asynchronous-calls-with-es6-javascript-generators/" rel="nofollow noreferrer" target="_blank">Asynchronous calls with ES6 generators</a></p></li>
<li><p><a href="http://huli.logdown.com/posts/292655-javascript-promise-generator-async-es6" rel="nofollow noreferrer" target="_blank">[Javascript] Promise, generator, async與ES6</a></p></li>
<li><p><a href="https://medium.com/javascript-scene/the-hidden-power-of-es6-generators-observable-async-flow-control-cfa4c7f31435#.4cadgop5s" rel="nofollow noreferrer" target="_blank">The Hidden Power of ES6 Generators: Observable Async Flow Control</a></p></li>
<li><p><a href="https://davidwalsh.name/async-generators" rel="nofollow noreferrer" target="_blank">Going Async With ES6 Generators</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6中的异步编程：Generators函数+Promise:最强大的异步处理方式

## 原文链接
[https://segmentfault.com/a/1190000007546512](https://segmentfault.com/a/1190000007546512)

