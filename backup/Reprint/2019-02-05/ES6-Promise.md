---
title: 'ES6-Promise' 
date: 2019-02-05 2:30:09
hidden: true
slug: 12m8jcvj96c
categories: [reprint]
---

{{< raw >}}

                    
<p>前段时间看到关于microTask的文章，<a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" rel="nofollow noreferrer" target="_blank">《Tasks, microTasks, queues and schedules》</a>，感觉有必要澄清一下。本篇里用setTimeout来实现的Promise，和浏览器原生的Promise是有本质区别的。多数时候感觉不到差异，但正如文章所说，如果不搞清楚microTasks，在实战中一旦遇到和这家伙有关的问题，真得会一点方向都没有。"Yeah, it'll bite you in obscure places (ouch). "推荐一读。</p>
<hr>
<p>前两天看到前端早读课的一篇“【第666期】剖析&nbsp;Promise 内部机制”，从实现角度讲解promise底层实现原理的。看得我两天里寝食难安，脑袋疼胸口闷，严重怀疑脑洞太小。终于还是把逻辑理顺了。短短几十行代码威力如此惊人，逼得我把洪荒之力都用完了……<br>趁热打铁把自己的理解记录一下~</p>
<h1 id="articleHeader0">Promise使用场景</h1>
<p>要弄清原理，必须要非常清楚Promise想实现什么。<br>比如现在有两件事情，第一件事情是要洗衣服，第二件事情是晾衣服。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function wash(){
    console.log('开始洗衣服...');
    setTimeout(()=>{
        console.log('洗完了！');
        return '一堆洗干净的衣服';
    }, 2000);
}

function hang(clothes){
    console.log('开始晾衣服...');
    /*...晾衣服中...*/
    console.log(clothes+'晾完了！');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wash</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始洗衣服...'</span>);
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'洗完了！'</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-string">'一堆洗干净的衣服'</span>;
    }, <span class="hljs-number">2000</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hang</span>(<span class="hljs-params">clothes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始晾衣服...'</span>);
    <span class="hljs-comment">/*...晾衣服中...*/</span>
    <span class="hljs-built_in">console</span>.log(clothes+<span class="hljs-string">'晾完了！'</span>);
}</code></pre>
<p>晾衣服hang(clothes)是一定要等洗衣服wash()结束，然后接收到洗好了的衣服clothes以后，才能执行的。<br>类似这种有明确先后执行顺序，并且可能会有依赖关系的（没有前面执行完返回的结果后面就处理不下去）场景，就是Promise的用武之地。</p>
<h1 id="articleHeader1">Promise语法</h1>
<p>先看下怎么用Promise来完成先洗衣服后晾干这两步的。</p>
<ul>
<li>第一步：<p>var promise = new Promise(wash);<br>   告诉Promise立刻执行wash开始洗衣服。</p>
</li>
<li>第二步：<p>promise.then(hang);<br>   告诉Promise等wash结束以后执行hang开始晾衣服。</p>
</li>
</ul>
<p>Promise用起来就是这么简单！这么清爽！<br>如果等晾干以后还要收衣服的话，就继续再后面加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   promise.then(hang).then(pickup);   //pickup就是收衣服方法，等后面再实现
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>   promise.<span class="hljs-keyword">then</span>(hang).<span class="hljs-keyword">then</span>(pickup);   <span class="hljs-comment">//pickup就是收衣服方法，等后面再实现</span>
</code></pre>
<p>那么问题来了，promise怎么知道衣服啥时候洗完？<br>Promise规定，丢给Promise执行的方法，需要将一个方法(resolve)作为参数，在执行完成以后，将返回的结果传给这个resolve方法。（有点难说清楚，上代码试试）<br>这样就需要改写wash方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function wash(resolve){
    console.log('开始洗衣服...');
    setTimeout(()=>{
        console.log('洗完了！');
        resolve('一堆洗干净的衣服');
    }, 2000);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wash</span>(<span class="hljs-params">resolve</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始洗衣服...'</span>);
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'洗完了！'</span>);
        resolve(<span class="hljs-string">'一堆洗干净的衣服'</span>);
    }, <span class="hljs-number">2000</span>);
}
</code></pre>
<p>resolve('一堆干净的衣服')会调用Promise里的resolve方法，Promise就会知道洗衣服wash操作已经成功完成了，可以接下去处理then后面的事情了。<br>把事情变得稍微复杂点试试。衣服洗完了要晾出去，晾完以后要等晒干，晒干了以后要收衣服。我们需要重写hang方法并新增dry和pickup方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hang(clothes){
    console.log('开始晾衣服...');
    /*...晾衣服中...*/
    console.log(clothes+'晾好了！');
    return '一堆晾好的衣服';
}

function dry(clothes){
    console.log('等衣服干...');
    /*...晾干中...*/
    console.log(clothes+'晾干了！');
    return '一堆晾干的衣服';
}

function pickup(clothes){
    console.log('开始收衣服...');
    /*...收衣服中...*/
    console.log(clothes+'收完了！');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hang</span>(<span class="hljs-params">clothes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始晾衣服...'</span>);
    <span class="hljs-comment">/*...晾衣服中...*/</span>
    <span class="hljs-built_in">console</span>.log(clothes+<span class="hljs-string">'晾好了！'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'一堆晾好的衣服'</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dry</span>(<span class="hljs-params">clothes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'等衣服干...'</span>);
    <span class="hljs-comment">/*...晾干中...*/</span>
    <span class="hljs-built_in">console</span>.log(clothes+<span class="hljs-string">'晾干了！'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">'一堆晾干的衣服'</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pickup</span>(<span class="hljs-params">clothes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始收衣服...'</span>);
    <span class="hljs-comment">/*...收衣服中...*/</span>
    <span class="hljs-built_in">console</span>.log(clothes+<span class="hljs-string">'收完了！'</span>);
}
</code></pre>
<p>对比之前的代码，发现多了一行return语句，将处理后得到的结果输出，作为参数传入接下去的要处理的方法。<br>准备好了wash,hang,dry,pickup四个方法后，执行一下看看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise = new Promise(wash);
promise.then(hang).then(dry).then(pickup);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> promise = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Promise</span>(wash);
<span class="hljs-title">promise</span>.<span class="hljs-title">then</span>(hang).<span class="hljs-title">then</span>(dry).<span class="hljs-title">then</span>(pickup);
</span></code></pre>
<p>输出结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="开始洗衣服...
洗完了，去晾干!
开始晾衣服...
一堆洗干净的衣服晾完了！
等衣服干...
一堆晾好的衣服晾干了!
开始收衣服...
一堆晾干了的衣服收完了!
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>开始洗衣服...
洗完了，去晾干!
开始晾衣服...
一堆洗干净的衣服晾完了！
等衣服干...
一堆晾好的衣服晾干了!
开始收衣服...
一堆晾干了的衣服收完了!
</code></pre>
<p>再稍微复杂点儿试试~<br>上面输出结果可以看到，从’开始晾衣服...’到’一堆晾干了的衣服收完了!’几乎是同时输出的。每个动作都应该有段时间间隔才对呀~再改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hang(clothes){
    console.log('开始晾衣服...');
    setTimeout(()=>{
        console.log(clothes+'晾完了！');
    }, 3000);
    return (&quot;一堆晾好的衣服&quot;);
}

function dry(clothes){
    console.log('等衣服干...');
    setTimeout(()=>{
        console.log(clothes+'晾干了!');
    }, 3000);
    return (&quot;一堆晾干了的衣服&quot;);
}

function pickup(clothes){
    console.log('开始收衣服...');
    setTimeout(()=>{
        console.log(clothes+'收完了!');
    }, 3000)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hang</span>(<span class="hljs-params">clothes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始晾衣服...'</span>);
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(clothes+<span class="hljs-string">'晾完了！'</span>);
    }, <span class="hljs-number">3000</span>);
    <span class="hljs-keyword">return</span> (<span class="hljs-string">"一堆晾好的衣服"</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dry</span>(<span class="hljs-params">clothes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'等衣服干...'</span>);
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(clothes+<span class="hljs-string">'晾干了!'</span>);
    }, <span class="hljs-number">3000</span>);
    <span class="hljs-keyword">return</span> (<span class="hljs-string">"一堆晾干了的衣服"</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pickup</span>(<span class="hljs-params">clothes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始收衣服...'</span>);
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(clothes+<span class="hljs-string">'收完了!'</span>);
    }, <span class="hljs-number">3000</span>)
}
</code></pre>
<p>执行一下看看……</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="开始洗衣服...
洗完了！
开始晾衣服...
等衣服干...
开始收衣服...
一堆洗干净的衣服晾完了！
一堆晾好的衣服晾干了!
一堆晾干了的衣服收完了!
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>开始洗衣服...
洗完了！
开始晾衣服...
等衣服干...
开始收衣服...
一堆洗干净的衣服晾完了！
一堆晾好的衣服晾干了!
一堆晾干了的衣服收完了!
</code></pre>
<p>问题比较明显：</p>
<ul>
<li>第一.顺序乱了</li>
<li>第二.从’洗完了’到’开始收衣服...’同时输出</li>
<li>第三.最后三句话隔了3秒后同时输出</li>
</ul>
<p>可以看出then执行的方法并不会等setTimeout执行完才去执行接下去的then中的方法，因为then执行的方法都是同步的。咋办呢？再改~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hang(clothes){
    console.log('开始晾衣服...');
    return new Promise(resolve=>{
        setTimeout(()=>{
            console.log(clothes+'晾完了！');
            resolve(&quot;一堆晾好的衣服&quot;);
        }, 3000)
    });
}

function dry(clothes){
    console.log('等衣服干...');
    return new Promise(resolve=>{
        setTimeout(()=>{
            console.log(clothes+'晾干了!');
            resolve('一堆晾干了的衣服');
        }, 3000)
    });
}

function pickup(clothes){
    console.log('开始收衣服...');
    setTimeout(()=>{
        console.log(clothes+'收完了!');
    }, 3000)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hang</span>(<span class="hljs-params">clothes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始晾衣服...'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span>=&gt;</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(clothes+<span class="hljs-string">'晾完了！'</span>);
            resolve(<span class="hljs-string">"一堆晾好的衣服"</span>);
        }, <span class="hljs-number">3000</span>)
    });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dry</span>(<span class="hljs-params">clothes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'等衣服干...'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span>=&gt;</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(clothes+<span class="hljs-string">'晾干了!'</span>);
            resolve(<span class="hljs-string">'一堆晾干了的衣服'</span>);
        }, <span class="hljs-number">3000</span>)
    });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pickup</span>(<span class="hljs-params">clothes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始收衣服...'</span>);
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(clothes+<span class="hljs-string">'收完了!'</span>);
    }, <span class="hljs-number">3000</span>)
}
</code></pre>
<p>hang和dry方法返回值改成了一个Promise对象。这里有点难理解，then传入的方法如果返回的是个Promise对象，那么再后面的then传入的方法就会等到这个Promise（实际上是传入Promise的方法）调用了resolve()为止，才会继续执行。</p>
<h1 id="articleHeader2">Promise原理</h1>
<p>最头疼的部分来了，看看new Promise(wash).then(hang).then(dry).then(pickup)到底怎么实现的。<br><strong>首先new Promise(wash):</strong><br>实例化Promise并传入一个方法，这个方法就立刻开始执行了，所以Promise里会执行wash(resolve)方法；<br>wash方法中通过调用resolve(‘一堆洗干净的衣服’)通知Promise自己执行完了，所以Promise里会有一个resolve(_result_value)方法处理wash的返回结果；<br><strong>再看then(hang):</strong><br>then是Promise的实例方法，所以Promise里会有一个this.then = function(mission){...}实例方法。<br>再根据Promise的实现结果，即then后面的方法要等到wash中执行到resolve(‘一堆洗干净的衣服’)以后才能开始执行。实现方法就是在调用then(hang)的时候，不直接执行hang方法，而是把hang方法存起来，由resolve(_result_value)来触发。</p>
<h2 id="articleHeader3">初步实现</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myPromise(fn){
    const missions = [];//待执行队列
    var value = null;
    
    //执行传入的方法
    fn(resolve);
    
    //当传入的方法中调用resolve(value)时，异步执行mission
    function resolve(_return_value){
        value = _return_value;
        missions.forEach(mission=>{
            mission(value);
        });
    }

    //执行then方法时，将传入的方法加入missions，等待resolve触发。
    this.then = function(mission){
        missions.push(mission);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myPromise</span>(<span class="hljs-params">fn</span>)</span>{
    <span class="hljs-keyword">const</span> missions = [];<span class="hljs-comment">//待执行队列</span>
    <span class="hljs-keyword">var</span> value = <span class="hljs-literal">null</span>;
    
    <span class="hljs-comment">//执行传入的方法</span>
    fn(resolve);
    
    <span class="hljs-comment">//当传入的方法中调用resolve(value)时，异步执行mission</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">_return_value</span>)</span>{
        value = _return_value;
        missions.forEach(<span class="hljs-function"><span class="hljs-params">mission</span>=&gt;</span>{
            mission(value);
        });
    }

    <span class="hljs-comment">//执行then方法时，将传入的方法加入missions，等待resolve触发。</span>
    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">mission</span>)</span>{
        missions.push(mission);
    }
}</code></pre>
<p>同时修改一下wash方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function wash(resolve){
    console.log('开始洗衣服...');
    console.log('洗完了！');
    resolve('一堆洗干净的衣服');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wash</span>(<span class="hljs-params">resolve</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始洗衣服...'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'洗完了！'</span>);
    resolve(<span class="hljs-string">'一堆洗干净的衣服'</span>);
}
</code></pre>
<p>执行new myPromise(wash).then(hang);<br>输出结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="开始洗衣服...
洗完了！
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>开始洗衣服...
洗完了！
</code></pre>
<p>晾衣服动作没执行~<br>来看一下发生了什么<br>new myPromise(wash)触发执行wash(resolve)方法=&gt;wash(resolve)触发执行resolve(‘一堆洗干净的衣服’)=&gt;resolve(_return_value)执行mission(value)……等下，还没执行then(hang)之前missions里还没任务呢！<br>所以需要改下resolve方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resolve(_return_value){
    value = _return_value;
    setTimeout(()=>{
        missions.forEach(mission=>{
            mission(value);
        })
    }, 0);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">function</span> resolve(<span class="hljs-number">_</span><span class="hljs-keyword">return</span><span class="hljs-number">_</span><span class="hljs-keyword">value</span>){
    <span class="hljs-keyword">value</span> = <span class="hljs-number">_</span><span class="hljs-keyword">return</span><span class="hljs-number">_</span><span class="hljs-keyword">value</span>;
    setTimeout(()=&gt;{
        missions.forEach(mission=&gt;{
            mission(<span class="hljs-keyword">value</span>);
        })
    }, <span class="hljs-number">0</span>);
}
</code></pre>
<p>在执行一下new myPromise(wash).then(hang);结果就对了。</p>
<h2 id="articleHeader4">增加状态控制</h2>
<p>如果我们想这样使用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promise = new myPromise(wash);
setTimeout(()=>{
    promise.then(hang)
}, 1000)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>var promise = new myPromise(<span class="hljs-name">wash</span>)<span class="hljs-comment">;</span>
setTimeout(()=&gt;{
    promise.then(<span class="hljs-name">hang</span>)
}, <span class="hljs-number">1000</span>)
</code></pre>
<p>开始洗衣服以后干别的事情去了，过一段时间回来如果洗完了就直接晾衣服，没洗完就接着等待。<br>因为hang也是个异步操作，会延迟到mission(value)之后才执行，所以此时myPromise又没法正常工作了。<br>解决办法是给myPromise增加一个状态state。当没有触发resovle(_return_value)时，状态处在pending处理中；当触发了resovle(_return_value)时，状态置为fulfilled已处理。而this.then = function(mission){...}在处理前先对状态做个判断，pending时将mission插入missions任务队列，fulfilled时就直接执行mission(value)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resolve(_return_value){
    state = 'fulfilled';
    ...//省略其他未改动代码
}

this.then = function(mission){
    if(state === 'fulfilled'){
        mission(value);
    }else{
        missions.push(mission);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span><span class="hljs-params">(_return_value)</span></span>{
    state = <span class="hljs-string">'fulfilled'</span>;
    ...<span class="hljs-comment">//省略其他未改动代码</span>
}

<span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(mission)</span></span>{
    <span class="hljs-keyword">if</span>(state === <span class="hljs-string">'fulfilled'</span>){
        mission(value);
    }<span class="hljs-keyword">else</span>{
        missions.push(mission);
    }
}
</code></pre>
<h2 id="articleHeader5">任务链处理</h2>
<p>目前执行new myPromise(wash).then(hang).then(dry).then(pickup)会报错。then方法没有设置返回值。稍微调整下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.then = function(mission){
    if(state === 'fulfilled'){
        mission(value);
    }else{
        missions.push(mission);
    }
    return this;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(mission)</span></span>{
    <span class="hljs-keyword">if</span>(state === <span class="hljs-string">'fulfilled'</span>){
        mission(value);
    }<span class="hljs-keyword">else</span>{
        missions.push(mission);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
</code></pre>
<p>简化hang, dry, pickup方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hang(clothes){
    console.log('开始晾衣服...');
    console.log(clothes+'晾完了！');
    return (&quot;一堆晾好的衣服&quot;);
}

function dry(clothes) {
    console.log('等衣服干...');
    console.log(clothes + '晾干了!');
    return ('一堆晾干了的衣服');
}

function pickup(clothes){
    console.log('开始收衣服...');
    console.log(clothes+'收完了!');
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hang</span>(<span class="hljs-params">clothes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始晾衣服...'</span>);
    <span class="hljs-built_in">console</span>.log(clothes+<span class="hljs-string">'晾完了！'</span>);
    <span class="hljs-keyword">return</span> (<span class="hljs-string">"一堆晾好的衣服"</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dry</span>(<span class="hljs-params">clothes</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'等衣服干...'</span>);
    <span class="hljs-built_in">console</span>.log(clothes + <span class="hljs-string">'晾干了!'</span>);
    <span class="hljs-keyword">return</span> (<span class="hljs-string">'一堆晾干了的衣服'</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pickup</span>(<span class="hljs-params">clothes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始收衣服...'</span>);
    <span class="hljs-built_in">console</span>.log(clothes+<span class="hljs-string">'收完了!'</span>);
}
</code></pre>
<p>执行new myPromise(wash).then(hang).then(dry).then(pickup)，错是不报了。但是then之间没有正常传递返回的值。clothes始终是“一堆洗干净的衣服”。<br>myPromise中的value是在执行resolve(_return_value)时赋值的。一个myPromise对象只有一个初始任务（这里是wash），初始任务就执行了一次resovle(‘一堆洗干净的衣服’)。而所有的then方法返回的都是同一个myPromise对象，所以value指向的都是同一个值。<br>解决思路是，每次调用then方法后，返回一个新的myPromise对象 new myPromise(fn);在fn中执行then方法中要执行的操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.then = function(mission){
    function fn(resolve){
        if(state === 'pending'){
            missions.push(mission)
        }else{
            const result = mission(value);
            resolve(result);//关键！
        }
    }
    
    return new myPromise(fn);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(mission)</span></span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span><span class="hljs-params">(resolve)</span></span>{
        <span class="hljs-keyword">if</span>(state === <span class="hljs-string">'pending'</span>){
            missions.push(mission)
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">const</span> result = mission(value);
            resolve(result);<span class="hljs-comment">//关键！</span>
        }
    }
    
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> myPromise(fn);
}
</code></pre>
<p>当触发mission(value)时，将返回的结果作为result执行resolve(result)，这就将result传递给了下一个myPromise。<br>then直接触发mission(value)执行的操作和resolve(_result_value)是一样的，所以resolve也要调整</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resolve(_return_value){
    value = _return_value;
    state = 'fulfilled';
    setTimeout(()=>{
        missions.forEach(mission=>{
            const result = mission(value);
            resolve(result); //死循环
        })
    }, 0);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">_return_value</span>)</span>{
    value = _return_value;
    state = <span class="hljs-string">'fulfilled'</span>;
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        missions.forEach(<span class="hljs-function"><span class="hljs-params">mission</span>=&gt;</span>{
            <span class="hljs-keyword">const</span> result = mission(value);
            resolve(result); <span class="hljs-comment">//死循环</span>
        })
    }, <span class="hljs-number">0</span>);
}
</code></pre>
<p>执行下？死循环！resolve中应该调用的是then创建的新myPromise的resolve方法，而不是他本身。所以then方法必须把自己创建的myPromise的resolve传递出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var next_resolve = null;//保存then生成的下一个myPromise的resolve方法
this.then = function(mission){
    function fn(resolve){
        next_resolve = resolve;
        if(state === 'pending'){
            missions.push(mission)
        }else{
            const result = mission(value);
            resolve(result);
        }
    }

    return new myPromise(fn);
}

function resolve(_return_value){
    value = _return_value;
    state = 'fulfilled';
    setTimeout(()=>{
        missions.forEach(mission=>{
            const result = mission(value);
            next_resolve(result); 
        })
    }, 0);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> next_resolve = <span class="hljs-literal">null</span>;<span class="hljs-comment">//保存then生成的下一个myPromise的resolve方法</span>
<span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">mission</span>)</span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">resolve</span>)</span>{
        next_resolve = resolve;
        <span class="hljs-keyword">if</span>(state === <span class="hljs-string">'pending'</span>){
            missions.push(mission)
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">const</span> result = mission(value);
            resolve(result);
        }
    }

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> myPromise(fn);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">_return_value</span>)</span>{
    value = _return_value;
    state = <span class="hljs-string">'fulfilled'</span>;
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        missions.forEach(<span class="hljs-function"><span class="hljs-params">mission</span>=&gt;</span>{
            <span class="hljs-keyword">const</span> result = mission(value);
            next_resolve(result); 
        })
    }, <span class="hljs-number">0</span>);
}
</code></pre>
<p>执行下代码看看结果吧~</p>
<h2 id="articleHeader6">Promise对象传递</h2>
<p>最后一个问题~（最后一关逻辑有点绕）<br>还记得之前用Promise对象来作为hang()和dry()的返回值的场景吗？hang()返回Promise对象后，Promise中resolve(‘一堆晾好的衣服’)被执行后，才会将’一堆晾好的衣服’作为参数传递给dry(clothes)方法并开始执行。<br>这种情况下，用前面写好的myPromise执行一下，又不对了。dry()和pickup()的形参变成了一个new myPromise，结果肯定出错嘛。<br>解决思路是，当遇到任务的返回值是一个object或者function，并且有自己的then方法的时候，就将它当做是一个Promise对象处理，等这个Promise对象中的方法处理到resolve(_return_result)的时候，把_return_result作为参数输出传递给后续的任务。<br>重写then和resolve</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.then = function(mission){
    var fn = function(resolve){
        next_resolve = resolve;
        if(state === 'pending'){
            missions.push(mission)
        }else{
            const result = mission(value);
            if(result &amp;&amp; (typeof result == 'object' || typeof result == 'function')){
                if(result.then &amp;&amp; typeof result.then == 'function'){
                    result.then(next_resolve);//关键！
                }
            }else{
                next_resolve(result);
            }
        }
    }

    return new myPromise(fn);
}

function resolve(_return_value){
    value = _return_value;
    state = 'fulfilled';
    setTimeout(()=>{
        missions.forEach(mission=>{
            const result = mission(value);
            if(result &amp;&amp; (typeof result == 'object' || typeof result == 'function')){
                if(result.then &amp;&amp; typeof result.then == 'function'){
                    result.then(next_resolve);//关键！
                }
            }else{
                next_resolve(result);
            }
        })
    }, 0);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">mission</span>)</span>{
    <span class="hljs-keyword">var</span> fn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>)</span>{
        next_resolve = resolve;
        <span class="hljs-keyword">if</span>(state === <span class="hljs-string">'pending'</span>){
            missions.push(mission)
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">const</span> result = mission(value);
            <span class="hljs-keyword">if</span>(result &amp;&amp; (<span class="hljs-keyword">typeof</span> result == <span class="hljs-string">'object'</span> || <span class="hljs-keyword">typeof</span> result == <span class="hljs-string">'function'</span>)){
                <span class="hljs-keyword">if</span>(result.then &amp;&amp; <span class="hljs-keyword">typeof</span> result.then == <span class="hljs-string">'function'</span>){
                    result.then(next_resolve);<span class="hljs-comment">//关键！</span>
                }
            }<span class="hljs-keyword">else</span>{
                next_resolve(result);
            }
        }
    }

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> myPromise(fn);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">_return_value</span>)</span>{
    value = _return_value;
    state = <span class="hljs-string">'fulfilled'</span>;
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        missions.forEach(<span class="hljs-function"><span class="hljs-params">mission</span>=&gt;</span>{
            <span class="hljs-keyword">const</span> result = mission(value);
            <span class="hljs-keyword">if</span>(result &amp;&amp; (<span class="hljs-keyword">typeof</span> result == <span class="hljs-string">'object'</span> || <span class="hljs-keyword">typeof</span> result == <span class="hljs-string">'function'</span>)){
                <span class="hljs-keyword">if</span>(result.then &amp;&amp; <span class="hljs-keyword">typeof</span> result.then == <span class="hljs-string">'function'</span>){
                    result.then(next_resolve);<span class="hljs-comment">//关键！</span>
                }
            }<span class="hljs-keyword">else</span>{
                next_resolve(result);
            }
        })
    }, <span class="hljs-number">0</span>);
}
</code></pre>
<p>有必要解释一下result.then(next_resolve)。result此时是一个Promise对象（取名resultPromise），我们需要在resultPromise对象方法执行到resolve(_result_value)时，获取到_result_value并传递给next_resolve(result)执行。<br>而then方法正是干这事儿的：将next_resolve放进resultPromise的执行队列missions里，resultPromise执行resolve(_result_value)，state状态变为fulfilled，触发执行next_resolve(_result_value)。后面就是next_promise状态变为fulfilled，触发执行接下去的mission...</p>
<hr>
<p>最后把公共代码提取出来整理一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myPromise(fn){
    const missions = [];  //待执行队列
    var value = null;
    var state = 'pending';
    var next_resolve = null;

    //执行传入的方法
    fn(resolve);

    //当传入的方法中调用resolve(value)时，异步执行mission
    function resolve(_return_value){
        value = _return_value;
        state = 'fulfilled';
        setTimeout(()=>{
            missions.forEach(mission=>{
                handle(mission);
            })
        }, 0);
    }

    //执行then方法时，将传入的方法加入missions，等待resolve触发。
    this.then = function(mission){
        var fn = function(resolve){
            next_resolve = resolve;
            if(state === 'pending'){
                missions.push(mission)
            }else{
                handle(mission);
            }
        }
        return new myPromise(fn);
    }

    function handle(mission){
        const result = mission(value);
        //当处理结果为Promise对象时，将next_resolve推入待执行队列
        if(result &amp;&amp; (typeof result == 'object' || typeof result == 'function')){
            if(result.then &amp;&amp; typeof result.then == 'function'){
                result.then(next_resolve);
            }
        }else{
            next_resolve(result);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myPromise</span>(<span class="hljs-params">fn</span>)</span>{
    <span class="hljs-keyword">const</span> missions = [];  <span class="hljs-comment">//待执行队列</span>
    <span class="hljs-keyword">var</span> value = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">var</span> state = <span class="hljs-string">'pending'</span>;
    <span class="hljs-keyword">var</span> next_resolve = <span class="hljs-literal">null</span>;

    <span class="hljs-comment">//执行传入的方法</span>
    fn(resolve);

    <span class="hljs-comment">//当传入的方法中调用resolve(value)时，异步执行mission</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">_return_value</span>)</span>{
        value = _return_value;
        state = <span class="hljs-string">'fulfilled'</span>;
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            missions.forEach(<span class="hljs-function"><span class="hljs-params">mission</span>=&gt;</span>{
                handle(mission);
            })
        }, <span class="hljs-number">0</span>);
    }

    <span class="hljs-comment">//执行then方法时，将传入的方法加入missions，等待resolve触发。</span>
    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">mission</span>)</span>{
        <span class="hljs-keyword">var</span> fn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>)</span>{
            next_resolve = resolve;
            <span class="hljs-keyword">if</span>(state === <span class="hljs-string">'pending'</span>){
                missions.push(mission)
            }<span class="hljs-keyword">else</span>{
                handle(mission);
            }
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> myPromise(fn);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params">mission</span>)</span>{
        <span class="hljs-keyword">const</span> result = mission(value);
        <span class="hljs-comment">//当处理结果为Promise对象时，将next_resolve推入待执行队列</span>
        <span class="hljs-keyword">if</span>(result &amp;&amp; (<span class="hljs-keyword">typeof</span> result == <span class="hljs-string">'object'</span> || <span class="hljs-keyword">typeof</span> result == <span class="hljs-string">'function'</span>)){
            <span class="hljs-keyword">if</span>(result.then &amp;&amp; <span class="hljs-keyword">typeof</span> result.then == <span class="hljs-string">'function'</span>){
                result.then(next_resolve);
            }
        }<span class="hljs-keyword">else</span>{
            next_resolve(result);
        }
    }
}</code></pre>
<p>代码和前端早读课的“剖析&nbsp;Promise 内部机制”稍有区别，但个人觉得这样写逻辑更清晰一些。至于promise的reject部分，偷懒省略啦~ 当是留点思考空间咯~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6-Promise

## 原文链接
[https://segmentfault.com/a/1190000006557624](https://segmentfault.com/a/1190000006557624)

