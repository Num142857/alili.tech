---
title: '异步Promise及Async/Await可能最完整入门攻略' 
date: 2019-02-15 2:30:44
hidden: true
slug: eumgejkx1ln
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>此文只介绍Async/Await与Promise基础知识与实际用到注意的问题，将通过很多代码实例进行说明，两个实例代码是<code>setDelay</code>和<code>setDelaySecond</code>。</blockquote>
<hr>
<p><strong>tips:本文系原创转自我的博客<a href="http://www.tangyida.top/detail/152" rel="nofollow noreferrer" target="_blank">异步Promise及Async/Await最完整入门攻略</a>，欢迎前端大神交流，指出问题</strong></p>
<hr>
<h2 id="articleHeader0">一、为什么有Async/Await？</h2>
<p>我们都知道已经有了<code>Promise</code>的解决方案了，为什么还要ES7提出新的Async/Await标准呢？</p>
<p>答案其实也显而易见：<code>Promise</code>虽然跳出了异步嵌套的怪圈，用链式表达更加清晰，但是我们也发现如果有大量的异步请求的时候，流程复杂的情况下，会发现充满了屏幕的<code>then</code>，看起来非常吃力，而ES7的Async/Await的出现就是为了解决这种复杂的情况。</p>
<p>首先，我们必须了解<code>Promise</code>。</p>
<h2 id="articleHeader1">二、Promise简介</h2>
<h3 id="articleHeader2">2.1 Promise实例</h3>
<p>什么是Promise，很多人应该都知道基础概念？直接看下面的代码（<strong>全文的例子都是基于<code>setDelaySecond</code>和<code>setDelay</code>两个函数，请务必记住</strong>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const setDelay = (millisecond) => {
  return new Promise((resolve, reject)=>{
      if (typeof millisecond != 'number') reject(new Error('参数必须是number类型'));
      setTimeout(()=> {
        resolve(`我延迟了${millisecond}毫秒后输出的`)
      }, millisecond)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> setDelay = <span class="hljs-function">(<span class="hljs-params">millisecond</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>)=&gt;</span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> millisecond != <span class="hljs-string">'number'</span>) reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'参数必须是number类型'</span>));
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
        resolve(<span class="hljs-string">`我延迟了<span class="hljs-subst">${millisecond}</span>毫秒后输出的`</span>)
      }, millisecond)
  })
}</code></pre>
<p>我们把一个Promise封装在一个函数里面同时返回了一个Promise，这样比较规范。</p>
<p>可以看到定义的Promise有两个参数，<code>resolve</code>和<code>reject</code>。</p>
<ul>
<li>
<code>resolve</code>：将异步的执行从<code>pending(请求)</code>变成了<code>resolve(成功返回)</code>，是个函数执行返回。</li>
<li>
<code>reject</code>：顾名思义“拒绝”，就是从请求变成了"失败"，是个函数可以执行返回一个结果，但我们这里推荐大家返回一个错误<code>new Error()</code>。</li>
</ul>
<blockquote>上述例子，你可以<code>reject('返回一个字符串')</code>，随便你返回，但是我们还是<strong>建议返回一个Error对象，这样更加清晰是“失败的”，这样更规范一点</strong>。</blockquote>
<h3 id="articleHeader3">2.2 Promise的then和catch</h3>
<p>我们通过Promise的原型方法<code>then</code>拿到我们的返回值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setDelay(3000)
.then((result)=>{
    console.log(result) // 输出“我延迟了2000毫秒后输出的”
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setDelay(<span class="hljs-number">3000</span>)
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(result) <span class="hljs-comment">// 输出“我延迟了2000毫秒后输出的”</span>
})</code></pre>
<p>输出下列的值：“我延迟了2000毫秒后输出的”。</p>
<p>如果出错呢？那就用<code>catch</code>捕获：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setDelay('我是字符串')
.then((result)=>{
    console.log(result) // 不进去了
})
.catch((err)=>{
    console.log(err) // 输出错误：“参数必须是number类型”
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setDelay(<span class="hljs-string">'我是字符串'</span>)
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(result) <span class="hljs-comment">// 不进去了</span>
})
.catch(<span class="hljs-function">(<span class="hljs-params">err</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(err) <span class="hljs-comment">// 输出错误：“参数必须是number类型”</span>
})</code></pre>
<p>是不是很简单？好，现在我增加一点难度，如果多个<code>Promise</code>执行会是怎么样呢？</p>
<h3 id="articleHeader4">2.3 Promise相互依赖</h3>
<p>我们在写一个Promise：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const setDelaySecond = (seconds) => {
  return new Promise((resolve, reject)=>{
      if (typeof seconds != 'number' || seconds > 10) reject(new Error('参数必须是number类型，并且小于等于10'));
      setTimeout(()=> {
        console.log(`先是setDelaySeconds函数输出，延迟了${seconds}秒，一共需要延迟${seconds+2}秒`)
        resolve(setDelay(2000)) // 这里依赖上一个Promise
      }, seconds * 1000)
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> setDelaySecond = <span class="hljs-function">(<span class="hljs-params">seconds</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>)=&gt;</span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> seconds != <span class="hljs-string">'number'</span> || seconds &gt; <span class="hljs-number">10</span>) reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'参数必须是number类型，并且小于等于10'</span>));
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`先是setDelaySeconds函数输出，延迟了<span class="hljs-subst">${seconds}</span>秒，一共需要延迟<span class="hljs-subst">${seconds+<span class="hljs-number">2</span>}</span>秒`</span>)
        resolve(setDelay(<span class="hljs-number">2000</span>)) <span class="hljs-comment">// 这里依赖上一个Promise</span>
      }, seconds * <span class="hljs-number">1000</span>)
  })
}
</code></pre>
<p>在下一个需要依赖的<code>resolve</code>去返回另一个Promise，会发生什么呢？我们执行一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setDelaySecond(3).then((result)=>{
  console.log(result)
}).catch((err)=>{
  console.log(err);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setDelaySecond(<span class="hljs-number">3</span>).then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result)
}).catch(<span class="hljs-function">(<span class="hljs-params">err</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(err);
})</code></pre>
<p>你会发现结果是先执行：<strong>“先是setDelaySeconds输出，延迟了2秒，一共需要延迟5秒”</strong></p>
<p>再执行<code>setDelay</code>的<code>resolve</code>：<strong>“我延迟了2000毫秒后输出的”</strong>。的确做到了依次执行的目的。</p>
<p>有人说，我不想耦合性这么高，想先执行<code>setDelay</code>函数再执行<code>setDelaySecond</code>，但不想用上面那种写法，可以吗，答案是当然可以。</p>
<h3 id="articleHeader5">2.4 Promise链式写法</h3>
<p>先改写一下<code>setDelaySecond</code>，拒绝依赖，降低耦合性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const setDelaySecond = (seconds) => {
  return new Promise((resolve, reject)=>{
      if (typeof seconds != 'number' || seconds > 10) reject(new Error('参数必须是number类型，并且小于等于10'));
      setTimeout(()=> {
        resolve(`我延迟了${seconds}秒后输出的，是第二个函数`)
      }, seconds * 1000)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> setDelaySecond = <span class="hljs-function">(<span class="hljs-params">seconds</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>)=&gt;</span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> seconds != <span class="hljs-string">'number'</span> || seconds &gt; <span class="hljs-number">10</span>) reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'参数必须是number类型，并且小于等于10'</span>));
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
        resolve(<span class="hljs-string">`我延迟了<span class="hljs-subst">${seconds}</span>秒后输出的，是第二个函数`</span>)
      }, seconds * <span class="hljs-number">1000</span>)
  })
}</code></pre>
<p>先执行<code>setDelay</code>在执行<code>setDelaySecond</code>，只需要在第一个<code>then</code>的结果中<strong>返回下一个Promise就可以一直链式写下去了，相当于依次执行</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setDelay(2000)
.then((result)=>{
  console.log(result)
  console.log('我进行到第一步的');
  return setDelaySecond(3)
})
.then((result)=>{
  console.log('我进行到第二步的');
  console.log(result);
}).catch((err)=>{
  console.log(err);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setDelay(<span class="hljs-number">2000</span>)
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我进行到第一步的'</span>);
  <span class="hljs-keyword">return</span> setDelaySecond(<span class="hljs-number">3</span>)
})
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我进行到第二步的'</span>);
  <span class="hljs-built_in">console</span>.log(result);
}).catch(<span class="hljs-function">(<span class="hljs-params">err</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(err);
})</code></pre>
<p>发现确实达到了可喜的链式（终于脱离异步嵌套苦海，哭），可以看到<code>then</code>的链式写法非常优美。</p>
<h3 id="articleHeader6">2.5 链式写法需要注意的地方</h3>
<p>这里一定要提到一点：</p>
<p><code>then</code>式链式写法的本质其实是一直<strong>往下传递返回一个新的Promise</strong>，也就是说<strong>then在下一步接收的是上一步返回的Promise</strong>，理解这个对于后面的细节非常重要！！</p>
<p>那么并不是这么简单，then的返回我们可以看出有2个参数(都是回调)：</p>
<ul>
<li>第一个回调是resolve的回调，也就是第一个参数用得最多，拿到的是上一步的<code>Promise</code>成功<code>resolve</code>的值。</li>
<li>第二个回调是reject的回调，用的不多，但是求求大家不要写错了，通常是拿到上一个的错误，那么这个错误处理和catch有什么区别和需要注意的地方呢？</li>
</ul>
<p>我们修改上面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setDelay(2000)
.then((result)=>{
  console.log(result)
  console.log('我进行到第一步的');
  return setDelaySecond(20)
})
.then((result)=>{
  console.log('我进行到第二步的');
  console.log(result);
}, (_err)=> {
  console.log('我出错啦，进到这里捕获错误，但是不经过catch了');
})
.then((result)=>{
  console.log('我还是继续执行的！！！！')
})
.catch((err)=>{
  console.log(err);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setDelay(<span class="hljs-number">2000</span>)
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我进行到第一步的'</span>);
  <span class="hljs-keyword">return</span> setDelaySecond(<span class="hljs-number">20</span>)
})
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我进行到第二步的'</span>);
  <span class="hljs-built_in">console</span>.log(result);
}, (_err)=&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我出错啦，进到这里捕获错误，但是不经过catch了'</span>);
})
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我还是继续执行的！！！！'</span>)
})
.catch(<span class="hljs-function">(<span class="hljs-params">err</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(err);
})</code></pre>
<p>可以看到输出结果是：进到了<code>then</code>的第二个参数（reject）中去了，而且最重要的是！不再经过<code>catch</code>了。</p>
<p>那么我们把catch挪上去，写到<code>then</code>错误处理前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setDelay(2000)
.then((result)=>{
  console.log(result)
  console.log('我进行到第一步的');
  return setDelaySecond(20)
})
.catch((err)=>{ // 挪上去了
  console.log(err); // 这里catch到上一个返回Promise的错误
})
.then((result)=>{
  console.log('我进行到第二步的');
  console.log(result);
}, (_err)=> {
  console.log('我出错啦，但是由于catch在我前面，所以错误早就被捕获了，我这没有错误了');
})
.then((result)=>{
  console.log('我还是继续执行的！！！！')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setDelay(<span class="hljs-number">2000</span>)
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我进行到第一步的'</span>);
  <span class="hljs-keyword">return</span> setDelaySecond(<span class="hljs-number">20</span>)
})
.catch(<span class="hljs-function">(<span class="hljs-params">err</span>)=&gt;</span>{ <span class="hljs-comment">// 挪上去了</span>
  <span class="hljs-built_in">console</span>.log(err); <span class="hljs-comment">// 这里catch到上一个返回Promise的错误</span>
})
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我进行到第二步的'</span>);
  <span class="hljs-built_in">console</span>.log(result);
}, (_err)=&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我出错啦，但是由于catch在我前面，所以错误早就被捕获了，我这没有错误了'</span>);
})
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我还是继续执行的！！！！'</span>)
})</code></pre>
<p>可以看到先经过<code>catch</code>的捕获，后面就没错误了。</p>
<p>可以得出需要注意的：</p>
<ul>
<li>
<code>catch</code>写法是针对于整个链式写法的错误捕获的，而<code>then</code>第二个参数是针对于上一个返回<code>Promise</code>的。</li>
<li>两者的优先级：就是<strong>看谁在链式写法的前面</strong>，在前面的先捕获到错误，后面就没有错误可以捕获了，链式前面的优先级大，而且两者都不是<code>break</code>， 可以继续执行后续操作不受影响。</li>
</ul>
<h3 id="articleHeader7">2.5 链式写法的错误处理</h3>
<p>上述已经写好了关于then里面三个回调中第二个回调（reject）会与catch冲突的问题，那么我们实际写的时候，参数捕获的方式基本写得少，catch的写法会用到更多。</p>
<p>既然有了很多的Promise，那么我需不需要写很多catch呢？</p>
<p>答案当然是：<strong>不需要！</strong>，哪有那么麻烦的写法，只需要在末尾<code>catch</code>一下就可以了，因为链式写法的错误处理具有“冒泡”特性，<strong>链式中任何一个环节出问题，都会被<code>catch</code>到，同时在某个环节后面的代码就不会执行了</strong>。</p>
<p>既然说到这里，我们把<code>catch</code>移到第一个链式的返回里面会发生什么事呢？看下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setDelay('2000')
.then((result)=>{
  console.log('第一步完成了');
  console.log(result)
  return setDelaySecond(3)
})
.catch((err)=>{ // 这里移到第一个链式去，发现上面的不执行了，下面的继续执行
  console.log(err);
})
.then((result)=>{
  console.log('第二步完成了');
  console.log(result);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setDelay(<span class="hljs-string">'2000'</span>)
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一步完成了'</span>);
  <span class="hljs-built_in">console</span>.log(result)
  <span class="hljs-keyword">return</span> setDelaySecond(<span class="hljs-number">3</span>)
})
.catch(<span class="hljs-function">(<span class="hljs-params">err</span>)=&gt;</span>{ <span class="hljs-comment">// 这里移到第一个链式去，发现上面的不执行了，下面的继续执行</span>
  <span class="hljs-built_in">console</span>.log(err);
})
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二步完成了'</span>);
  <span class="hljs-built_in">console</span>.log(result);
})</code></pre>
<p>惊喜的发现，<strong>链式继续走下去了</strong>！！输出如下（undefined是因为上一个then没有返回一个Promise）：</p>
<p><span class="img-wrap"><img data-src="/img/bVbiBBM?w=1622&amp;h=296" src="https://static.alili.tech/img/bVbiBBM?w=1622&amp;h=296" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>重点来了！敲黑板！！<strong>链式中的<code>catch</code>并不是终点！！catch完如果还有then还会继续往下走！</strong>不信的话可以把第一个<code>catch</code>在最后面的那个例子后面再加几个<code>then</code>，你会发现<strong>并不会跳出链式执行</strong>。</p>
<p>如果顺序执行<code>setDelay，setDelay1,setDelaySecond</code>，按照上述的逻辑，流程图可以概括如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVbiBBR?w=335&amp;h=727" src="https://static.alili.tech/img/bVbiBBR?w=335&amp;h=727" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><code>catch</code>只是捕获错误的一个链式表达，并不是break！</p>
<p>所以，<strong>catch放的位置也很有讲究</strong>，一般放在一些重要的、必须catch的程序的最后。**这些重要的程序中间一旦出现错误，会马上跳过其他后续程序的操作直接执行到最近的catch代码块，但不影响catch后续的操作！！！！</p>
<p>到这就不得不体一个ES2018标准新引入的<strong>Promise的<code>finally</code></strong>，表示在catch后必须肯定会默认执行的的操作。这里不多展开，细节可以参考：<a href="http://es6.ruanyifeng.com/#docs/promise#Promise-prototype-finally" rel="nofollow noreferrer" target="_blank">Promise的finally</a></p>
<h3 id="articleHeader8">2.5 Promise链式中间想返回自定义的值</h3>
<p>其实很简单，用<code>Promise</code>的原型方法<code>resolve</code>即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setDelay(2000).then((result)=>{
  console.log('第一步完成了');
  console.log(result);
  let message = '这是我自己想处理的值'; 
  return Promise.resolve(message) // 这里返回我想在下一阶段处理的值
})
.then((result)=>{
  console.log('第二步完成了');
  console.log(result); // 这里拿到上一阶段的返回值
  //return Promise.resolve('这里可以继续返回')
})
.catch((err)=>{
  console.log(err);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setDelay(<span class="hljs-number">2000</span>).then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第一步完成了'</span>);
  <span class="hljs-built_in">console</span>.log(result);
  <span class="hljs-keyword">let</span> message = <span class="hljs-string">'这是我自己想处理的值'</span>; 
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(message) <span class="hljs-comment">// 这里返回我想在下一阶段处理的值</span>
})
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'第二步完成了'</span>);
  <span class="hljs-built_in">console</span>.log(result); <span class="hljs-comment">// 这里拿到上一阶段的返回值</span>
  <span class="hljs-comment">//return Promise.resolve('这里可以继续返回')</span>
})
.catch(<span class="hljs-function">(<span class="hljs-params">err</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(err);
})</code></pre>
<h3 id="articleHeader9">2.7 如何跳出或停止Promise链式</h3>
<p>不同于一般的<code>function</code>的<code>break</code>的方式，如果你是这样的操作：<code>func().then().then().then().catch()</code>的方式，你想在第一个<code>then</code>就跳出链式，后面的不想执行了，不同于一般的<code>break;return null;return false</code>等操作，可以说，如何停止Promise链，是一大难点，是整个Promise最复杂的地方。</p>
<p><strong>1.用链式的思维想，我们拒绝掉某一链，那么不就是相当于直接跳到了catch模块吗？</strong></p>
<p>我们是不是可以直接“拒绝“掉达到停止的目的？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setDelay(2000)
.then((result)=>{
  console.log(result)
  console.log('我进行到第一步的');
  return setDelaySecond(1)
})
.then((result)=>{
  console.log('我进行到第二步的');
  console.log(result);
  console.log('我主动跳出循环了');
  return Promise.reject('跳出循环的信息') // 这里返回一个reject,主动跳出循环了
})
.then((result)=>{
  console.log('我不执行');
})
.catch((mes)=>{
  console.dir(mes)
  console.log('我跳出了');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setDelay(<span class="hljs-number">2000</span>)
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我进行到第一步的'</span>);
  <span class="hljs-keyword">return</span> setDelaySecond(<span class="hljs-number">1</span>)
})
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我进行到第二步的'</span>);
  <span class="hljs-built_in">console</span>.log(result);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我主动跳出循环了'</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'跳出循环的信息'</span>) <span class="hljs-comment">// 这里返回一个reject,主动跳出循环了</span>
})
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我不执行'</span>);
})
.catch(<span class="hljs-function">(<span class="hljs-params">mes</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.dir(mes)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我跳出了'</span>);
})</code></pre>
<p>但是很容易看到缺点：有时候你并不确定是因为错误跳出的，还是主动跳出的，所以我们可以加一个标志位：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return Promise.reject({
    isNotErrorExpection: true // 返回的地方加一个标志位，判断是否是错误类型，如果不是，那么说明可以是主动跳出循环的
}) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject({
    <span class="hljs-attr">isNotErrorExpection</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// 返回的地方加一个标志位，判断是否是错误类型，如果不是，那么说明可以是主动跳出循环的</span>
}) </code></pre>
<p>或者根据上述的代码判断catch的地方输出的类型是不是属于错误对象的，是的话说明是错误，不是的话说明是主动跳出的，你可以自己选择（这就是为什么要统一错误reject的时候输出new Error('错误信息')的原因，规范！）</p>
<p>当然你也可以直接抛出一个错误跳出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="throw new Error('错误信息') // 直接跳出，那就不能用判断是否为错误对象的方法进行判断了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'错误信息'</span>) <span class="hljs-comment">// 直接跳出，那就不能用判断是否为错误对象的方法进行判断了</span></code></pre>
<p><strong>2.那有时候我们有这个需求：catch是放在中间（不是末尾），而同时我们又不想执行catch后面的代码，也就是链式的绝对中止，应该怎么办？</strong></p>
<p>我们看这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setDelay(2000)
.then((result)=>{
  console.log(result)
  console.log('我进行到第一步的');
  return setDelaySecond(1)
})
.then((result)=>{
  console.log('我进行到第二步的');
  console.log(result);
  console.log('我主动跳出循环了');
  return Promise.reject('跳出循环的信息') // 这里直接调用Promise原型方法返回一个reject,主动跳出循环了
})
.then((result)=>{
  console.log('我不执行');
})
.catch((mes)=>{
  console.dir(mes)
  console.log('我跳出了');
})
.then((res)=>{
    console.log('我不想执行，但是却执行了'); // 问题在这，上述的终止方法治标不治本。
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setDelay(<span class="hljs-number">2000</span>)
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我进行到第一步的'</span>);
  <span class="hljs-keyword">return</span> setDelaySecond(<span class="hljs-number">1</span>)
})
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我进行到第二步的'</span>);
  <span class="hljs-built_in">console</span>.log(result);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我主动跳出循环了'</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'跳出循环的信息'</span>) <span class="hljs-comment">// 这里直接调用Promise原型方法返回一个reject,主动跳出循环了</span>
})
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我不执行'</span>);
})
.catch(<span class="hljs-function">(<span class="hljs-params">mes</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.dir(mes)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我跳出了'</span>);
})
.then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我不想执行，但是却执行了'</span>); <span class="hljs-comment">// 问题在这，上述的终止方法治标不治本。</span>
})</code></pre>
<p>这时候最后一步<code>then</code>还是执行了，整条链都其实没有本质上的跳出，那应该怎么办呢？</p>
<p><strong>敲黑板！！重点来了！</strong>我们看<a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">Promise/A+</a>规范可以知道：</p>
<blockquote>A promise must be in one of three states: pending, fulfilled, or rejected.</blockquote>
<p>Promise其实是有三种状态的：<strong>pending，resolve，rejected</strong>，那么我们一直在讨论<code>resolve和rejected</code>这2个状态，是不是忽视了<code>pending</code>这个状态呢？pending状态顾名思义就是请求中的状态，成功请求就是resolve，失败就是reject，其实他就是个中间过渡状态。</p>
<p>而我们上面讨论过了，<strong><code>then</code>的下一层级其实得到的是上一层级返回的Promise对象，也就是说原Promise对象与新对象状态保持一致</strong>。那么重点来了，如果你想在这一层级进行终止，是不是直接让它永远都<code>pending</code>下去，那么后续的操作不就没了吗？是不是就达到这个目的了？？觉得有疑问的可以参考<a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">Promise/A+</a>规范。</p>
<p>我们直接看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setDelay(2000)
.then((result)=>{
  console.log(result)
  console.log('我进行到第一步的');
  return setDelaySecond(1)
})
.then((result)=>{
  console.log(result);
  console.log('我主动跳出循环了');
  // return Promise.reject('跳出循环的信息')
  // 重点在这
  return new Promise(()=>{console.log('后续的不会执行')}) // 这里返回的一个新的Promise，没有resolve和reject，那么会一直处于pending状态，因为没返回啊，那么这种状态就一直保持着，中断了这个Promise
})
.then((result)=>{
  console.log('我不执行');
})
.catch((mes)=>{
  console.dir(mes)
  console.log('我跳出了');
})
.then((res)=>{
  console.log('我也不会执行')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setDelay(<span class="hljs-number">2000</span>)
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我进行到第一步的'</span>);
  <span class="hljs-keyword">return</span> setDelaySecond(<span class="hljs-number">1</span>)
})
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我主动跳出循环了'</span>);
  <span class="hljs-comment">// return Promise.reject('跳出循环的信息')</span>
  <span class="hljs-comment">// 重点在这</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'后续的不会执行'</span>)}) <span class="hljs-comment">// 这里返回的一个新的Promise，没有resolve和reject，那么会一直处于pending状态，因为没返回啊，那么这种状态就一直保持着，中断了这个Promise</span>
})
.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我不执行'</span>);
})
.catch(<span class="hljs-function">(<span class="hljs-params">mes</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.dir(mes)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我跳出了'</span>);
})
.then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我也不会执行'</span>)
})</code></pre>
<p>这样就解决了上述，错误跳出而导致无法完全终止Promise链的问题。</p>
<p>但是！随之而来也有一个问题，那就是可能会导致<strong>潜在的内存泄漏</strong>，因为我们知道这个一直处于pending状态下的Promise会一直处于被挂起的状态，而我们具体不知道浏览器的机制细节也不清楚，一般的网页没有关系，但大量的复杂的这种pending状态势必会导致内存泄漏，具体的没有测试过，后续可能会跟进测试（nodeJS或webapp里面不推荐这样），而我通过查询也难以找到答案，这篇文章可以推荐看一下：<a href="https://github.com/xieranmaya/blog/issues/5" rel="nofollow noreferrer" target="_blank">从如何停掉 Promise 链说起</a>。可能对你有帮助在此种情况下如何做。</p>
<p>当然一般情况下是不会存在泄漏，只是有这种风险，无法取消Promise一直是它的痛点。而上述两个奇妙的取消方法要具体情形具体使用。</p>
<h3 id="articleHeader10">2.8 Promise.all</h3>
<p>其实这几个方法就简单了，就是一个简写串联所有你需要的<code>Promise</code>执行，具体可以参照<a href="http://es6.ruanyifeng.com/#docs/promise#Promise-all" rel="nofollow noreferrer" target="_blank">阮一峰的ES6Promise.all教程</a>。</p>
<p>我这上一个代码例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all([setDelay(1000), setDelaySecond(1)]).then(result=>{
  console.log(result);
})
.catch(err=>{
  console.log(err);
})
// 输出[&quot;我延迟了1000毫秒后输出的&quot;, &quot;我延迟了1秒后输出的，注意单位是秒&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Promise</span>.all([setDelay(<span class="hljs-number">1000</span>), setDelaySecond(<span class="hljs-number">1</span>)]).then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result);
})
.catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(err);
})
<span class="hljs-comment">// 输出["我延迟了1000毫秒后输出的", "我延迟了1秒后输出的，注意单位是秒"]</span></code></pre>
<p>输出的是一个数组，相当于把<code>all</code>方法里面的<code>Promise</code><strong>并行执行</strong>，注意是并行。<br>相当于两个Promise同时开始执行，同时返回值，并不是先执行第一个再执行第二个，如果你想串行执行，请参考我后面写的循环<a href="https://segmentfault.com/a/1190000016788484?_ea=4854890#articleHeader20">Promise循环串行（第4.2小节）</a>。</p>
<p>然后把resolve的值保存在数组中输出。类似的还有<a href="http://es6.ruanyifeng.com/#docs/promise#Promise-race" rel="nofollow noreferrer" target="_blank">Promise.race</a>这里就不多赘述了。</p>
<h2 id="articleHeader11">三、Async/await介绍</h2>
<h3 id="articleHeader12">3.1 基于Promise的Async/await</h3>
<p>什么是<code>async/await</code>呢？可以总结为一句话：<strong>async/await是一对好基友，缺一不可，他们的出生是为Promise服务的</strong>。可以说async/await是Promise的爸爸，进化版。为什么这么说呢？且听我细细道来。</p>
<p>为什么要有<code>async/await</code>存在呢？</p>
<p>前文已经说过了，为了解决大量复杂不易读的Promise异步的问题，才出现的改良版。</p>
<p><strong>这两个基友必须同时出现，缺一不可</strong>，那么先说一下<code>Async</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function process() {
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">process</span>(<span class="hljs-params"></span>) </span>{
}</code></pre>
<p>上面可以看出，<strong><code>async</code>必须声明的是一个function</strong>，不要去声明别的，要是那样<code>await</code>就不理你了（报错）。</p>
<p>这样声明也是错的！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const async demo =  function () {} // 错误" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> <span class="hljs-keyword">async</span> demo =  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{} <span class="hljs-comment">// 错误</span></code></pre>
<p>必须紧跟着<code>function</code>。接下来说一下它的兄弟<code>await</code>。</p>
<p>上面说到必须是个函数（function），<strong>那么<code>await</code>就必须是在这个<code>async</code>声明的函数内部使用</strong>，否则就会报错。</p>
<p>就算你这样写，也是错的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = 'data'
demo  = async function () {
    const test = function () {
        await data
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> data = <span class="hljs-string">'data'</span>
demo  = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> test = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">await</span> data
    }
}</code></pre>
<p>必须是直系（作用域链不能隔代），这样会报错：<code>Uncaught SyntaxError: await is only valid in async function</code>。</p>
<p>讲完了基本规范，我们接下去说一下他们的本质。</p>
<h3 id="articleHeader13">3.2 async的本质</h3>
<p>敲黑板！！！很重要！<strong>async声明的函数的返回本质上是一个Promise</strong>。</p>
<p>什么意思呢？就是说你只要声明了这个函数是<code>async</code>，那么内部不管你怎么处理，它的返回肯定是个Promise。</p>
<p>看下列例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async function () {
    return '我是Promise'
})()
// 返回是Promise
//Promise&nbsp;{<resolved>: &quot;我是Promise&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'我是Promise'</span>
})()
<span class="hljs-comment">// 返回是Promise</span>
<span class="hljs-comment">//Promise&nbsp;{&lt;resolved&gt;: "我是Promise"}</span></code></pre>
<p>你会发现返回是这个：<code>Promise&nbsp;{&lt;resolved&gt;: "我是Promise"}</code>。</p>
<p>自动解析成<code>Promise.resolve('我是Promise');</code></p>
<p>等同于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async function () {
    return Promise.resolve('我是Promise');
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'我是Promise'</span>);
})()</code></pre>
<p>所以你想像一般<code>function</code>的返回那样，拿到返回值，原来的思维要改改了！你可以这样拿到返回值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const demo = async function () {
    return Promise.resolve('我是Promise');
    // 等同于 return '我是Promise'
    // 等同于 return new Promise((resolve,reject)=>{ resolve('我是Promise') })
}
demo.then(result=>{
    console.log(result) // 这里拿到返回值
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> demo = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'我是Promise'</span>);
    <span class="hljs-comment">// 等同于 return '我是Promise'</span>
    <span class="hljs-comment">// 等同于 return new Promise((resolve,reject)=&gt;{ resolve('我是Promise') })</span>
}
demo.then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(result) <span class="hljs-comment">// 这里拿到返回值</span>
})</code></pre>
<p><strong>上述三种写法都行，要看注释细节都写在里面了！！像对待Promise一样去对待async的返回值！！！</strong></p>
<p>好的接下去我们看<code>await</code>的干嘛用的.</p>
<h3 id="articleHeader14">3.3 await的本质与例子</h3>
<p>await的本质是<strong>可以提供等同于”同步效果“的等待异步返回能力的语法糖</strong>。</p>
<p>这一句咋一看很别扭，好的不急，我们从例子开始看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const demo = async ()=>{
    let result = await new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve('我延迟了一秒')
      }, 1000)
    });
    console.log('我由于上面的程序还没执行完，先不执行“等待一会”');
}
// demo的返回当做Promise
demo().then(result=>{
  console.log('输出',result);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> demo = <span class="hljs-keyword">async</span> ()=&gt;{
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        resolve(<span class="hljs-string">'我延迟了一秒'</span>)
      }, <span class="hljs-number">1000</span>)
    });
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我由于上面的程序还没执行完，先不执行“等待一会”'</span>);
}
<span class="hljs-comment">// demo的返回当做Promise</span>
demo().then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'输出'</span>,result);
})</code></pre>
<p><strong>await顾名思义就是等待一会</strong>，只要<code>await</code>声明的函数还没有返回，<strong>那么下面的程序是不会去执行的！！！</strong>。这就是字面意义的等待一会（等待返回再去执行）。</p>
<p>那么你到这测试一下，你会发现输出是这个：<code>输出 undefined</code>。这是为什么呢？这也是我想强调的一个地方！！！</p>
<p>你在<code>demo</code>函数里面都没声明返回，哪来的<code>then</code>？所以正确写法是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const demo = async ()=>{
    let result = await new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve('我延迟了一秒')
      }, 1000)
    });
    console.log('我由于上面的程序还没执行完，先不执行“等待一会”');
    return result;
}
// demo的返回当做Promise
demo().then(result=>{
  console.log('输出',result); // 输出 我延迟了一秒
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> demo = <span class="hljs-keyword">async</span> ()=&gt;{
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        resolve(<span class="hljs-string">'我延迟了一秒'</span>)
      }, <span class="hljs-number">1000</span>)
    });
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我由于上面的程序还没执行完，先不执行“等待一会”'</span>);
    <span class="hljs-keyword">return</span> result;
}
<span class="hljs-comment">// demo的返回当做Promise</span>
demo().then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'输出'</span>,result); <span class="hljs-comment">// 输出 我延迟了一秒</span>
})</code></pre>
<p>我推荐的写法是带上<code>then</code>，规范一点，当然你没有返回也是没问题的，<code>demo</code>会照常执行。下面这种写法是不带返回值的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const demo = async ()=>{
    let result = await new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve('我延迟了一秒')
      }, 1000)
    });
    console.log('我由于上面的程序还没执行完，先不执行“等待一会”');
}
demo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> demo = <span class="hljs-keyword">async</span> ()=&gt;{
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        resolve(<span class="hljs-string">'我延迟了一秒'</span>)
      }, <span class="hljs-number">1000</span>)
    });
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我由于上面的程序还没执行完，先不执行“等待一会”'</span>);
}
demo();</code></pre>
<p>所以可以发现，只要你用await声明的异步返回，是必须“等待”到有返回值的时候，代码才继续执行下去。</p>
<p>那事实是这样吗？你可以跑一下这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const demo = async ()=>{
    let result = await setTimeout(()=>{
      console.log('我延迟了一秒');
    }, 1000)
    console.log('我由于上面的程序还没执行完，先不执行“等待一会”');
    return result
}
demo().then(result=>{
  console.log('输出',result);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> demo = <span class="hljs-keyword">async</span> ()=&gt;{
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我延迟了一秒'</span>);
    }, <span class="hljs-number">1000</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我由于上面的程序还没执行完，先不执行“等待一会”'</span>);
    <span class="hljs-keyword">return</span> result
}
demo().then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'输出'</span>,result);
})</code></pre>
<p>你会发现，输出是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="我由于上面的程序还没执行完，先不执行“等待一会”
输出 1
我延迟了一秒" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">我由于上面的程序还没执行完，先不执行“等待一会”
输出 <span class="hljs-number">1</span>
我延迟了一秒</code></pre>
<p>奇怪，并没有await啊？<code>setTimeout</code>是异步啊，问题在哪？问题就在于<code>setTimeout</code><strong>这是个异步，但是不是<code>Promise</code></strong>！起不到“等待一会”的作用。</p>
<p>所以更准确的说法应该是<strong>用await声明的Promise异步返回，必须“等待”到有返回值的时候，代码才继续执行下去。</strong></p>
<h4>请记住await是在等待一个Promise的异步返回</h4>
<p>当然这种等待的效果只存在于“异步”的情况，await可以用于声明一般情况下的传值吗？</p>
<p>事实是当然可以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const demo = async ()=>{
    let message = '我是声明值'
    let result = await message;
    console.log(result); 
    console.log('我由于上面的程序还没执行完，先不执行“等待一会”');
    return result
}
demo().then(result=>{
  console.log('输出',result);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> demo = <span class="hljs-keyword">async</span> ()=&gt;{
    <span class="hljs-keyword">let</span> message = <span class="hljs-string">'我是声明值'</span>
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> message;
    <span class="hljs-built_in">console</span>.log(result); 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我由于上面的程序还没执行完，先不执行“等待一会”'</span>);
    <span class="hljs-keyword">return</span> result
}
demo().then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'输出'</span>,result);
})</code></pre>
<p>输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="我是声明值
我由于上面的程序还没执行完，先不执行“等待一会”
输出 我是声明值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">我是声明值
我由于上面的程序还没执行完，先不执行“等待一会”
输出 我是声明值</code></pre>
<p>这里只要注意一点：<code>then</code>的执行总是最后的。</p>
<h3 id="articleHeader15">3.4 async/await 优势实战</h3>
<p>现在我们看一下实战：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const setDelay = (millisecond) => {
  return new Promise((resolve, reject)=>{
      if (typeof millisecond != 'number') reject(new Error('参数必须是number类型'));
      setTimeout(()=> {
        resolve(`我延迟了${millisecond}毫秒后输出的`)
      }, millisecond)
  })
}
const setDelaySecond = (seconds) => {
  return new Promise((resolve, reject)=>{
      if (typeof seconds != 'number' || seconds > 10) reject(new Error('参数必须是number类型，并且小于等于10'));
      setTimeout(()=> {
        resolve(`我延迟了${seconds}秒后输出的，注意单位是秒`)
      }, seconds * 1000)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> setDelay = <span class="hljs-function">(<span class="hljs-params">millisecond</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>)=&gt;</span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> millisecond != <span class="hljs-string">'number'</span>) reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'参数必须是number类型'</span>));
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
        resolve(<span class="hljs-string">`我延迟了<span class="hljs-subst">${millisecond}</span>毫秒后输出的`</span>)
      }, millisecond)
  })
}
<span class="hljs-keyword">const</span> setDelaySecond = <span class="hljs-function">(<span class="hljs-params">seconds</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>)=&gt;</span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> seconds != <span class="hljs-string">'number'</span> || seconds &gt; <span class="hljs-number">10</span>) reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'参数必须是number类型，并且小于等于10'</span>));
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
        resolve(<span class="hljs-string">`我延迟了<span class="hljs-subst">${seconds}</span>秒后输出的，注意单位是秒`</span>)
      }, seconds * <span class="hljs-number">1000</span>)
  })
}</code></pre>
<p>比如上面两个延时函数（写在上面），比如我想先延时1秒，在延迟2秒，再延时1秒，最后输出“完成”，这个过程，如果用<code>then</code>的写法，大概是这样（嵌套地狱写法出门右拐不送）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setDelay(1000)
.then(result=>{
    console.log(result);
    return setDelaySecond(2)
})
.then(result=>{
    console.log(result);
    return setDelay(1000)
})
.then(result=>{
    console.log(result);
    console.log('完成')
})
.catch(err=>{
    console.log(err);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setDelay(<span class="hljs-number">1000</span>)
.then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(result);
    <span class="hljs-keyword">return</span> setDelaySecond(<span class="hljs-number">2</span>)
})
.then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(result);
    <span class="hljs-keyword">return</span> setDelay(<span class="hljs-number">1000</span>)
})
.then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(result);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'完成'</span>)
})
.catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(err);
})</code></pre>
<p>咋一看是不是挺繁琐的？如果逻辑多了估计看得更累，现在我们来试一下async/await</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async ()=>{
  const result = await setDelay(1000);
  console.log(result);
  console.log(await setDelaySecond(2));
  console.log(await setDelay(1000));
  console.log('完成了');
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-keyword">async</span> ()=&gt;{
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> setDelay(<span class="hljs-number">1000</span>);
  <span class="hljs-built_in">console</span>.log(result);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> setDelaySecond(<span class="hljs-number">2</span>));
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> setDelay(<span class="hljs-number">1000</span>));
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'完成了'</span>);
})()</code></pre>
<p>看！是不是没有冗余的长长的链式代码，语义化也非常清楚，非常舒服，那么你看到这里，一定还发现了，上面的<code>catch</code>我们是不是没有在async中实现？接下去我们就分析一下async/await如何处理错误？</p>
<h3 id="articleHeader16">3.5 async/await错误处理</h3>
<p>因为async函数返回的是一个Promise，所以我们可以在外面<code>catch</code>住错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const demo = async ()=>{
  const result = await setDelay(1000);
  console.log(result);
  console.log(await setDelaySecond(2));
  console.log(await setDelay(1000));
  console.log('完成了');
}
demo().catch(err=>{
    console.log(err);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> demo = <span class="hljs-keyword">async</span> ()=&gt;{
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> setDelay(<span class="hljs-number">1000</span>);
  <span class="hljs-built_in">console</span>.log(result);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> setDelaySecond(<span class="hljs-number">2</span>));
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> setDelay(<span class="hljs-number">1000</span>));
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'完成了'</span>);
}
demo().catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(err);
})</code></pre>
<p>在async函数的<code>catch</code>中捕获错误，当做一个Pormise处理，<strong>同时你不想用这种方法，可以使用<code>try...catch</code>语句：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async ()=>{
  try{
    const result = await setDelay(1000);
    console.log(result);
    console.log(await setDelaySecond(2));
    console.log(await setDelay(1000));
    console.log('完成了');
  } catch (e) {
    console.log(e); // 这里捕获错误
  }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-keyword">async</span> ()=&gt;{
  <span class="hljs-keyword">try</span>{
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> setDelay(<span class="hljs-number">1000</span>);
    <span class="hljs-built_in">console</span>.log(result);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> setDelaySecond(<span class="hljs-number">2</span>));
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> setDelay(<span class="hljs-number">1000</span>));
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'完成了'</span>);
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-built_in">console</span>.log(e); <span class="hljs-comment">// 这里捕获错误</span>
  }
})()</code></pre>
<p>当然这时候你就不需要在外面<code>catch</code>了。</p>
<p>通常我们的<code>try...catch</code>数量不会太多，几个最多了，<strong>如果太多了，说明你的代码肯定需要重构了，一定没有写得非常好。还有一点就是try...catch通常只用在需要的时候，有时候不需要catch错误的地方就可以不写。</strong></p>
<p>有人会问了，我<code>try...catch</code>好像只能包裹代码块，如果我需要拆分开分别处理，<strong>不想因为一个的错误就整个process都crash掉了</strong>，那么难道我要写一堆<code>try...catch</code>吗？我就是别扭，我就是不想写<code>try...catch</code>怎嘛办？下面有一种很好的解决方案，仅供参考：</p>
<p>我们知道await后面跟着的肯定是一个<code>Promise</code>那是不是可以这样写？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async ()=>{
  const result = await setDelay(1000).catch(err=>{
      console.log(err)
  });
  console.log(result);
  const result1 = await setDelaySecond(12).catch(err=>{
      console.log(err)
  })
  console.log(result1);
  console.log(await setDelay(1000));
  console.log('完成了');
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-keyword">async</span> ()=&gt;{
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> setDelay(<span class="hljs-number">1000</span>).catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
      <span class="hljs-built_in">console</span>.log(err)
  });
  <span class="hljs-built_in">console</span>.log(result);
  <span class="hljs-keyword">const</span> result1 = <span class="hljs-keyword">await</span> setDelaySecond(<span class="hljs-number">12</span>).catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
      <span class="hljs-built_in">console</span>.log(err)
  })
  <span class="hljs-built_in">console</span>.log(result1);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> setDelay(<span class="hljs-number">1000</span>));
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'完成了'</span>);
})()</code></pre>
<p>这样输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="我延迟了1000毫秒后输出的
Error: 参数必须是number类型，并且小于等于10
    at Promise (test4.html:19)
    at new Promise (<anonymous>)
    at setDelaySecond (test4.html:18)
    at test4.html:56
undefined
我延迟了1000毫秒后输出的
完成了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">我延迟了<span class="hljs-number">1000</span>毫秒后输出的
<span class="hljs-built_in">Error</span>: 参数必须是number类型，并且小于等于<span class="hljs-number">10</span>
    at <span class="hljs-built_in">Promise</span> (test4.html:<span class="hljs-number">19</span>)
    at <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">anonymous</span>&gt;</span>)
    at setDelaySecond (test4.html:18)
    at test4.html:56
undefined
我延迟了1000毫秒后输出的
完成了</span></code></pre>
<p>是不是就算有错误，也不会影响后续的操作，是不是很棒？<strong>当然不是，你说这代码也忒丑了吧，乱七八糟的，写得别扭await又跟着catch</strong>。那么我们可以改进一下，封装一下提取错误的代码函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// to function
function to(promise) {
   return promise.then(data => {
      return [null, data];
   })
   .catch(err => [err]); // es6的返回写法
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// to function</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">to</span>(<span class="hljs-params">promise</span>) </span>{
   <span class="hljs-keyword">return</span> promise.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> [<span class="hljs-literal">null</span>, data];
   })
   .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> [err]); <span class="hljs-comment">// es6的返回写法</span>
}</code></pre>
<p>返回的是一个数组，第一个是错误，第二个是异步结果，使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async ()=>{
   // es6的写法，返回一个数组(你可以改回es5的写法觉得不习惯的话)，第一个是错误信息，第二个是then的异步返回数据，这里要注意一下重复变量声明可能导致问题（这里举例是全局，如果用let，const，请换变量名）。
  [err, result] = await to(setDelay(1000)) 
   // 如果err存在就是有错，不想继续执行就抛出错误
  if (err) throw new Error('出现错误，同时我不想执行了');
  console.log(result);
  [err, result1] = await to(setDelaySecond(12))
   // 还想执行就不要抛出错误
  if (err) console.log('出现错误，同时我想继续执行', err);
  console.log(result1);
  console.log(await setDelay(1000));
  console.log('完成了');
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-keyword">async</span> ()=&gt;{
   <span class="hljs-comment">// es6的写法，返回一个数组(你可以改回es5的写法觉得不习惯的话)，第一个是错误信息，第二个是then的异步返回数据，这里要注意一下重复变量声明可能导致问题（这里举例是全局，如果用let，const，请换变量名）。</span>
  [err, result] = <span class="hljs-keyword">await</span> to(setDelay(<span class="hljs-number">1000</span>)) 
   <span class="hljs-comment">// 如果err存在就是有错，不想继续执行就抛出错误</span>
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'出现错误，同时我不想执行了'</span>);
  <span class="hljs-built_in">console</span>.log(result);
  [err, result1] = <span class="hljs-keyword">await</span> to(setDelaySecond(<span class="hljs-number">12</span>))
   <span class="hljs-comment">// 还想执行就不要抛出错误</span>
  <span class="hljs-keyword">if</span> (err) <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'出现错误，同时我想继续执行'</span>, err);
  <span class="hljs-built_in">console</span>.log(result1);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> setDelay(<span class="hljs-number">1000</span>));
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'完成了'</span>);
})()</code></pre>
<h3 id="articleHeader17">3.6 async/await的中断（终止程序）</h3>
<p>首先我们要明确的是，<code>Promise</code><strong>本身是无法中止的</strong>，<code>Promise</code>本身<strong>只是一个状态机</strong>，存储三个状态（pending，resolved，rejected），一旦发出请求了，<strong>必须闭环，无法取消</strong>，之前处于pending状态只是一个挂起请求的状态，并不是取消，一般不会让这种情况发生，只是用来临时中止链式的进行。</p>
<p>中断（终止）的本质在链式中只是挂起，并不是本质的取消<code>Promise</code>请求，那样是做不到的，<code>Promise</code>也没有<code>cancel</code>的状态。</p>
<p>不同于<code>Promise</code>的链式写法，写在async/await中想要中断程序就很简单了，因为语义化非常明显，其实就和一般的<code>function</code>写法一样，想要中断的时候，直接<code>return</code>一个值就行，<code>null</code>，空，<code>false</code>都是可以的。看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let count = 6;
const demo = async ()=>{
  const result = await setDelay(1000);
  console.log(result);
  const result1 = await setDelaySecond(count);
  console.log(result1);
  if (count > 5) {
      return '我退出了，下面的不进行了';
    // return; 
    // return false; // 这些写法都可以
    // return null;
  }
  console.log(await setDelay(1000));
  console.log('完成了');
};
demo().then(result=>{
  console.log(result);
})
.catch(err=>{
  console.log(err);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> count = <span class="hljs-number">6</span>;
<span class="hljs-keyword">const</span> demo = <span class="hljs-keyword">async</span> ()=&gt;{
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> setDelay(<span class="hljs-number">1000</span>);
  <span class="hljs-built_in">console</span>.log(result);
  <span class="hljs-keyword">const</span> result1 = <span class="hljs-keyword">await</span> setDelaySecond(count);
  <span class="hljs-built_in">console</span>.log(result1);
  <span class="hljs-keyword">if</span> (count &gt; <span class="hljs-number">5</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-string">'我退出了，下面的不进行了'</span>;
    <span class="hljs-comment">// return; </span>
    <span class="hljs-comment">// return false; // 这些写法都可以</span>
    <span class="hljs-comment">// return null;</span>
  }
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> setDelay(<span class="hljs-number">1000</span>));
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'完成了'</span>);
};
demo().then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result);
})
.catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(err);
})</code></pre>
<p>实质就是直接<code>return</code>返回了一个<code>Promise</code>，相当于<code>return Promise.resolve('我退出了下面不进行了')</code>，当然你也可以返回一个“拒绝”：<code>return Promise.reject(new Error('拒绝'))</code>那么就会进到错误信息里去。</p>
<h5>async函数实质就是返回一个Promise！</h5>
<h2 id="articleHeader18">四、实战中异步需要注意的地方</h2>
<p>我们经常会使用上述两种写法，也可能混用，有时候会遇到一些情况，这边举例子说明：</p>
<h3 id="articleHeader19">4.1 Promise获取数据(串行)之then写法注意</h3>
<p>并行的不用多说，很简单，直接循环发出请求就可以或者用<code>Promise.all</code>。如果我们需要串行循环一个请求，那么应该怎么做呢？</p>
<p>我们需要实现<strong>一个依次分别延迟1秒输出值，一共5秒的程序</strong>，首先是Promise的循环，这个循环就相对来说比较麻烦：</p>
<h5>我们经常会犯的错误！就是不重视函数名与函数执行对程序的影响</h5>
<p>先不说循环，我们先举一个错误的例子，现在有一个延迟函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const setDelay = (millisecond) => {
  return new Promise((resolve, reject)=>{
      if (typeof millisecond != 'number') reject(new Error('参数必须是number类型'));
      setTimeout(()=> {
        resolve(`我延迟了${millisecond}毫秒后输出的`)
      }, millisecond)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> setDelay = <span class="hljs-function">(<span class="hljs-params">millisecond</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>)=&gt;</span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> millisecond != <span class="hljs-string">'number'</span>) reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'参数必须是number类型'</span>));
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
        resolve(<span class="hljs-string">`我延迟了<span class="hljs-subst">${millisecond}</span>毫秒后输出的`</span>)
      }, millisecond)
  })
}</code></pre>
<p>我们想做到：<strong>“循环串行执行延迟一秒的Promise函数”</strong>，期望的结果应该是：隔一秒输出<code>我延迟了1000毫秒后输出的</code>，一共经过循环3次。我们想当然地写出下列的链式写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr = [setDelay(1000), setDelay(1000), setDelay(1000)]
arr[0]
.then(result=>{
  console.log(result)
  return arr[1]
})
.then(result=>{
  console.log(result)
  return arr[2]
})
.then(result=>{
  console.log(result)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">arr = [setDelay(<span class="hljs-number">1000</span>), setDelay(<span class="hljs-number">1000</span>), setDelay(<span class="hljs-number">1000</span>)]
arr[<span class="hljs-number">0</span>]
.then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result)
  <span class="hljs-keyword">return</span> arr[<span class="hljs-number">1</span>]
})
.then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result)
  <span class="hljs-keyword">return</span> arr[<span class="hljs-number">2</span>]
})
.then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result)
})</code></pre>
<p>但是很不幸，<strong>你发现输出是并行的！！！也就是说一秒钟一次性输出了3个值！</strong>。那么这是什么情况呢？其实很简单。。。<strong>就是你把<code>setDelay(1000)</code>这个直接添加到数组的时候，其实就已经执行了，注意你的执行语句<code>(1000)</code></strong></p>
<p>这其实是基础，是语言的特性，很多粗心的人（或者是没有好好学习JS的人）会以为这样就把函数添加到数组里面了，殊不知函数已经执行过一次了。</p>
<p>那么这样导致的后果是什么呢？也就是说数组里面保存的每个<code>Promise</code>状态都是<code>resolve</code>完成的状态了，那么你后面链式调用直接<code>return arr[1]</code>其实没有去请求，只是<strong>立即返回了一个resolve的状态</strong>。所以你会发现程序是相当于并行的，没有依次顺序调用。</p>
<p>那么解决方案是什么呢？直接函数名存储函数的方式（不执行Promise）来达到目的</p>
<p>我们这样改一下程序：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr = [setDelay, setDelay, setDelay]
arr[0](1000)
.then(result=>{
  console.log(result)
  return arr[1](1000)
})
.then(result=>{
  console.log(result)
  return arr[2](1000)
})
.then(result=>{
  console.log(result)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">arr = [setDelay, setDelay, setDelay]
arr[<span class="hljs-number">0</span>](<span class="hljs-number">1000</span>)
.then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result)
  <span class="hljs-keyword">return</span> arr[<span class="hljs-number">1</span>](<span class="hljs-number">1000</span>)
})
.then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result)
  <span class="hljs-keyword">return</span> arr[<span class="hljs-number">2</span>](<span class="hljs-number">1000</span>)
})
.then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result)
})</code></pre>
<p>上述相当于把<code>Promise</code>预先存储在一个数组中，在你需要调用的时候，再去执行。当然你也可以用闭包的方式存储起来，需要调用的时候再执行。</p>
<h3 id="articleHeader20">4.2 Promise循环获取数据(串行)之for循环</h3>
<p>上述写法是不优雅的，次数一多就GG了，为什么要提一下上面的<code>then</code>，其实就是为了后面的<code>for</code>循环做铺垫。</p>
<p>上面的程序根据规律改写一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr = [setDelay, setDelay, setDelay]
var temp
temp = arr[0](1000)
for (let i = 1; i <= arr.length; i++) {
    if (i == arr.length) {
      temp.then(result=>{
        console.log('完成了');
      })
      break;
    }
    temp = temp.then((result)=>{
        console.log(result);
        return arr[i-1](1000)
    });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">arr = [setDelay, setDelay, setDelay]
<span class="hljs-keyword">var</span> temp
temp = arr[<span class="hljs-number">0</span>](<span class="hljs-number">1000</span>)
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt;= arr.length; i++) {
    <span class="hljs-keyword">if</span> (i == arr.length) {
      temp.then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'完成了'</span>);
      })
      <span class="hljs-keyword">break</span>;
    }
    temp = temp.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(result);
        <span class="hljs-keyword">return</span> arr[i<span class="hljs-number">-1</span>](<span class="hljs-number">1000</span>)
    });
}
</code></pre>
<p>错误处理可以在for循环中套入<code>try...catch</code>，或者在你每个循环点进行<code>.then().catch()</code>、都是可行的。如果你想提取成公共方法，可以再改写一下，利用递归的方式：</p>
<p>首先你需要闭包你的<code>Promise</code>程序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeout(millisecond) {
  return ()=> {
    return setDelay(millisecond);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span>(<span class="hljs-params">millisecond</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
    <span class="hljs-keyword">return</span> setDelay(millisecond);
  }
}</code></pre>
<p>如果不闭包会导致什么后果呢？不闭包的话，你传入的参数值后，<strong>你的Promise会马上执行，导致状态改变</strong>，如果用闭包实现的话，你的Promise会一直保存着，等到你需要调用的时候再使用。而且<strong>最大的优点是可以预先传入你需要的参数</strong>。</p>
<p>改写数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr = [timeout(2000), timeout(1000), timeout(1000)]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">arr = [timeout(<span class="hljs-number">2000</span>), timeout(<span class="hljs-number">1000</span>), timeout(<span class="hljs-number">1000</span>)]</code></pre>
<p>提取方法，<code>Promise</code>数组作为参数传入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const syncPromise = function (arr) {
  const _syncLoop = function (count) {
    if (count === arr.length - 1) { // 是最后一个就直接return
      return arr[count]()
    }
    return arr[count]().then((result)=>{
      console.log(result);
      return _syncLoop(count+1) // 递归调用数组下标
    });
  }
  return _syncLoop(0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> syncPromise = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">const</span> _syncLoop = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">count</span>) </span>{
    <span class="hljs-keyword">if</span> (count === arr.length - <span class="hljs-number">1</span>) { <span class="hljs-comment">// 是最后一个就直接return</span>
      <span class="hljs-keyword">return</span> arr[count]()
    }
    <span class="hljs-keyword">return</span> arr[count]().then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
      <span class="hljs-built_in">console</span>.log(result);
      <span class="hljs-keyword">return</span> _syncLoop(count+<span class="hljs-number">1</span>) <span class="hljs-comment">// 递归调用数组下标</span>
    });
  }
  <span class="hljs-keyword">return</span> _syncLoop(<span class="hljs-number">0</span>);
}</code></pre>
<p>使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="syncPromise(arr).then(result=>{
  console.log(result);
  console.log('完成了');
})
// 或者 添加到Promise类中方法
Promise.syncAll = function syncAll(){
  return syncPromise
}// 以后可以直接使用
Promise.syncAll(arr).then(result=>{
  console.log(result);
  console.log('完成了');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">syncPromise(arr).then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'完成了'</span>);
})
<span class="hljs-comment">// 或者 添加到Promise类中方法</span>
<span class="hljs-built_in">Promise</span>.syncAll = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">syncAll</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> syncPromise
}<span class="hljs-comment">// 以后可以直接使用</span>
<span class="hljs-built_in">Promise</span>.syncAll(arr).then(<span class="hljs-function"><span class="hljs-params">result</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(result);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'完成了'</span>);
})</code></pre>
<p>还有大神总结了一个<code>reduce</code>的写法，其实就是一个迭代数组的过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const p = arr.reduce((total, current)=>{
    return total.then((result)=>{
        console.log(result);
        return current()
    })
}, Promise.resolve('程序开始'))
p.then((result)=>{
    console.log('结束了', result);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> p = arr.reduce(<span class="hljs-function">(<span class="hljs-params">total, current</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> total.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(result);
        <span class="hljs-keyword">return</span> current()
    })
}, <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'程序开始'</span>))
p.then(<span class="hljs-function">(<span class="hljs-params">result</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'结束了'</span>, result);
})</code></pre>
<p>都是可行的，在<code>Promise</code>的循环领域。</p>
<h3 id="articleHeader21">4.3 async/await循环获取数据(串行)之for循环</h3>
<p>现在就来介绍一下牛逼的async/await实战，上述的代码你是不是要看吐了，的确，我也觉得好麻烦啊，那么如果用<code>async/await</code>能有什么改进吗？这就是它出现的意义：</p>
<p>模拟上述代码的循环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async ()=>{
    arr = [timeout(2000), timeout(1000), timeout(1000)]
    for (var i=0; i < arr.length; i++) {
        result = await arr[i]();
        console.log(result);
    }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-keyword">async</span> ()=&gt;{
    arr = [timeout(<span class="hljs-number">2000</span>), timeout(<span class="hljs-number">1000</span>), timeout(<span class="hljs-number">1000</span>)]
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        result = <span class="hljs-keyword">await</span> arr[i]();
        <span class="hljs-built_in">console</span>.log(result);
    }
})()</code></pre>
<p>。。。这就完了？是的。。。就完了，是不是特别方便！！！！语义化也非常明显！！这里为了保持与上面风格一致，没有加入错误处理，所以实战的时候记得加入你的<code>try...catch</code>语句来捕获错误。</p>
<h2 id="articleHeader22">四、后记</h2>
<p>一直想总结一下<code>Promise</code>和<code>async/await</code>，很多地方可能总结得不够，已经尽力扩大篇幅了，后续有新的知识点和总结点可能会更新（未完待续），但是入门这个基本够用了。</p>
<p>我们常说什么<code>async/await</code>的出现淘汰了Promise，可以说是大错特错，恰恰相反，正因为有了Promise，才有了改良版的<code>async/await</code>，从上面分析就可以看出，两者是相辅相成的，缺一不可。</p>
<p>想学好<code>async/await</code>必须先精通<code>Promise</code>，两者密不可分，有不同意见和改进的欢迎指导！</p>
<p>前端小白，大家互相交流，peace！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
异步Promise及Async/Await可能最完整入门攻略

## 原文链接
[https://segmentfault.com/a/1190000016788484](https://segmentfault.com/a/1190000016788484)

