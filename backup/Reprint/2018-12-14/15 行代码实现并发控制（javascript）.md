---
title: '15 行代码实现并发控制（javascript）' 
date: 2018-12-14 2:30:11
hidden: true
slug: p514sl3rbza
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>做过爬虫的都知道，要控制爬虫的请求并发量，其实也就是控制其爬取频率，以免被封IP，还有的就是以此来控制爬虫应用运行内存，否则一下子处理N个请求，内存分分钟会爆。 </p>
<p>而 <code>python</code>爬虫一般用多线程来控制并发，</p>
<p>然而如果是<code>node.js</code>爬虫，由于其<strong>单线程无阻塞</strong>性质以及事件循环机制，一般不用多线程来控制并发（当然<code>node.js</code>也可以实现多线程，此处非重点不再多讲），而是更加简便地直接在代码层级上实现并发。</p>
<p>为图方便，开发者在开发<code>node</code>爬虫一般会找一个并发控制的<code>npm包</code>，然而第三方的模块有时候也并不能完全满足我们的特殊需求，这时候我们可能就需要一个自己定制版的并发控制函数。</p>
<p>下面我们用15行代码实现一个并发控制的函数。</p>
<h1 id="articleHeader1">具体实现</h1>
<h2 id="articleHeader2">参数</h2>
<p>首先，一个基本的并发控制函数，基本要有以下3个参数：</p>
<ul>
<li>
<code>list</code> {Array} - 要迭代的数组</li>
<li>
<code>limit</code> {number} - 控制的并发数量</li>
<li>
<code>asyncHandle</code> {function} - 对<code>list</code>的每一个项的处理函数</li>
</ul>
<h2 id="articleHeader3">设计</h2>
<p>以下以爬虫为实例进行讲解</p>
<p>设计思路其实很简单，假如并发量控制是 5</p>
<ol>
<li>
<p>首先，瞬发 5 个异步请求，我们就得到了并发的 5 个异步请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// limit = 5
while(limit--) {
    handleFunction(list)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// limit = 5</span>
<span class="hljs-function"><span class="hljs-title">while</span><span class="hljs-params">(limit--)</span></span> {
    handleFunction(list)
}</code></pre>
</li>
<li>
<p>然后，等每个异步请求执行完，执行下一个<code>list</code>项</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let recursion = (arr) => {
    return asyncHandle(arr.shift())
        .then(()=>{
            // 迭代数组长度不为0， 递归执行自身
            if (arr.length!==0) return recursion(arr) 
            // 迭代数组长度为0，结束 
            else return 'finish';
        })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>let recursion = <span class="hljs-function"><span class="hljs-params">(arr)</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> asyncHandle(arr.shift())
        .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-regexp">//</span> 迭代数组长度不为<span class="hljs-number">0</span>， 递归执行自身
            <span class="hljs-keyword">if</span> (arr.length!==<span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> recursion(arr) 
            <span class="hljs-regexp">//</span> 迭代数组长度为<span class="hljs-number">0</span>，结束 
            <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> <span class="hljs-string">'finish'</span>;
        })
}</code></pre>
</li>
<li>
<p>等<code>list</code>所有的项迭代完之后的回调</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return Promise.all(allHandle)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> Promise.<span class="hljs-keyword">all</span>(allHandle)</code></pre>
</li>
</ol>
<h2 id="articleHeader4">代码</h2>
<p>上述步骤组合起来，就是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @params list {Array} - 要迭代的数组
 * @params limit {Number} - 并发数量控制数
 * @params asyncHandle {Function} - 对`list`的每一个项的处理函数，参数为当前处理项，必须 return 一个Promise来确定是否继续进行迭代
 * @return {Promise} - 返回一个 Promise 值来确认所有数据是否迭代完成
 */
let mapLimit = (list, limit, asyncHandle) => {
    let recursion = (arr) => {
        return asyncHandle(arr.shift())
            .then(()=>{
                if (arr.length!==0) return recursion(arr)   // 数组还未迭代完，递归继续进行迭代
                else return 'finish';
            })
    };
    
    let listCopy = [].concat(list);
    let asyncList = []; // 正在进行的所有并发异步操作
    while(limit--) {
        asyncList.push( recursion(listCopy) ); 
    }
    return Promise.all(asyncList);  // 所有并发异步操作都完成后，本次并发控制迭代完成
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code><span class="hljs-comment">/**
 * <span class="hljs-doctag">@params</span> list {Array} - 要迭代的数组
 * <span class="hljs-doctag">@params</span> limit {Number} - 并发数量控制数
 * <span class="hljs-doctag">@params</span> asyncHandle {Function} - 对`list`的每一个项的处理函数，参数为当前处理项，必须 return 一个Promise来确定是否继续进行迭代
 * <span class="hljs-doctag">@return</span> {Promise} - 返回一个 Promise 值来确认所有数据是否迭代完成
 */</span>
<span class="hljs-keyword">let</span> mapLimit = (<span class="hljs-keyword">list</span>, limit, asyncHandle) =&gt; {
    <span class="hljs-keyword">let</span> recursion = (arr) =&gt; {
        <span class="hljs-keyword">return</span> asyncHandle(arr.shift())
            .then(()=&gt;{
                <span class="hljs-keyword">if</span> (arr.length!==<span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> recursion(arr)   <span class="hljs-comment">// 数组还未迭代完，递归继续进行迭代</span>
                <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> <span class="hljs-string">'finish'</span>;
            })
    };
    
    <span class="hljs-keyword">let</span> listCopy = [].concat(<span class="hljs-keyword">list</span>);
    <span class="hljs-keyword">let</span> asyncList = []; <span class="hljs-comment">// 正在进行的所有并发异步操作</span>
    <span class="hljs-keyword">while</span>(limit--) {
        asyncList.push( recursion(listCopy) ); 
    }
    <span class="hljs-keyword">return</span> Promise.all(asyncList);  <span class="hljs-comment">// 所有并发异步操作都完成后，本次并发控制迭代完成</span>
}</code></pre>
<h2 id="articleHeader5">测试demo</h2>
<p>模拟一下异步的并发情况</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dataLists = [1,2,3,4,5,6,7,8,9,11,100,123];
var count = 0;
mapLimit(dataLists, 3, (curItem)=>{
    return new Promise(resolve => {
        count++
        setTimeout(()=>{
            console.log(curItem, '当前并发量:', count--)
            resolve();
        }, Math.random() * 5000)  
    });
}).then(response => {
    console.log('finish', response)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> dataLists = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>,<span class="hljs-number">11</span>,<span class="hljs-number">100</span>,<span class="hljs-number">123</span>];
<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>;
mapLimit(dataLists, <span class="hljs-number">3</span>, <span class="hljs-function">(<span class="hljs-params">curItem</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
        count++
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(curItem, <span class="hljs-string">'当前并发量:'</span>, count--)
            resolve();
        }, <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">5000</span>)  
    });
}).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finish'</span>, response)
})</code></pre>
<p>结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV3dMa?w=513&amp;h=263" src="https://static.alili.tech/img/bV3dMa?w=513&amp;h=263" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><br><br><br></p>
<p>手动抛出异常中断并发函数测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dataLists = [1,2,3,4,5,6,7,8,9,11,100,123];
var count = 0;
mapLimit(dataLists, 3, (curItem)=>{
    return new Promise((resolve, reject) => {
        count++
        setTimeout(()=>{
            console.log(curItem, '当前并发量:', count--)
            if(curItem > 4) reject('error happen')
            resolve();
        }, Math.random() * 5000)  
    });
}).then(response => {
    console.log('finish', response)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> dataLists = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>,<span class="hljs-number">11</span>,<span class="hljs-number">100</span>,<span class="hljs-number">123</span>];
<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>;
mapLimit(dataLists, <span class="hljs-number">3</span>, <span class="hljs-function">(<span class="hljs-params">curItem</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        count++
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(curItem, <span class="hljs-string">'当前并发量:'</span>, count--)
            <span class="hljs-keyword">if</span>(curItem &gt; <span class="hljs-number">4</span>) reject(<span class="hljs-string">'error happen'</span>)
            resolve();
        }, <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">5000</span>)  
    });
}).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finish'</span>, response)
})</code></pre>
<p>并发控制情况下，迭代到5,6,7 手动抛出异常，停止后续迭代：<br><span class="img-wrap"><img data-src="/img/bV3dLW?w=361&amp;h=170" src="https://static.alili.tech/img/bV3dLW?w=361&amp;h=170" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
15 行代码实现并发控制（javascript）

## 原文链接
[https://segmentfault.com/a/1190000013128649](https://segmentfault.com/a/1190000013128649)

