---
title: 'JavaScript中setTimeout执行顺序' 
date: 2019-01-09 2:30:12
hidden: true
slug: 17yz2psf9y4
categories: [reprint]
---

{{< raw >}}

                    
<p>网上关于JavaScript中setTimeout的文章很多，但总感觉例子不够直接具体，因此写了个简单的例子并加以解释希望能让大家明白setTimeout是如何执行的。<br>实例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var time1=new Date().getTime();
    console.log(1,time1);
    setTimeout(function(){
        var time4=new Date().getTime();
        console.log(4,time4);
        for(var a=0;a<10000000000;a++){
            a=a+1;
        }
        var time2=new Date().getTime();
        console.log(2,time2);
    },2000);

    setTimeout(function(){
        var time3=new Date().getTime();
        console.log(3,time3);
    },1000);
    setTimeout(function(){
        var time5=new Date().getTime();
        console.log(5,time5);
    },3000);
    setTimeout(function(){
        var time6=new Date().getTime();
        console.log(6,time6);
    },14000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> time1=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>,time1);
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> time4=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>,time4);
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> a=<span class="hljs-number">0</span>;a&lt;<span class="hljs-number">10000000000</span>;a++){
            a=a+<span class="hljs-number">1</span>;
        }
        <span class="hljs-keyword">var</span> time2=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>,time2);
    },<span class="hljs-number">2000</span>);

    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> time3=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>,time3);
    },<span class="hljs-number">1000</span>);
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> time5=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>,time5);
    },<span class="hljs-number">3000</span>);
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> time6=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">6</span>,time6);
    },<span class="hljs-number">14000</span>);</code></pre>
<p>代码十分简单，想必大家都能看懂，执行结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVQz8s?w=488&amp;h=258" src="https://static.alili.tech/img/bVQz8s?w=488&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>解释：setTimeout属于异步执行函数，当程序执行完console.log(1,time1)后;遇到setTimeout会将该函数放入等待队列，等待当前主程序执行完毕后开始执行setTimeout,由于后面的几个都是setTimeout,因此都会放到等待队列~~~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="那么这些队列里的函数谁先执行呢？就是根据setTimeout里的第二个参数（延迟时间）决定的，例如            
    setTimeout(function(){
        var time3=new Date().getTime();
        console.log(3,time3);
    },1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>那么这些队列里的函数谁先执行呢？就是根据setTimeout里的第二个参数（延迟时间）决定的，例如            
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> time3=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>,time3);
    },<span class="hljs-number">1000</span>);</code></pre>
<p>那么主程序执行完成以后的1000ms后就会执行这段代码，如果延迟时间为2000,那么主程序执行完成后2000ms就会执行这段代码，只需记住一点：<strong>延迟时间始终是相对主程序执行完毕的那个时间算的</strong> ,并且多个setTimeout的先后顺序也是由这个延迟时间决定的，如果遇到某个setTimeout需要花费大量的时间怎么办？可以参照上图里执行结果的数字2和数字5对应的时间，由于js是单线程，所以当执行到这个setTimeout后，会将这个程序执行完成后再去执行下一个setTimeout,无论下一个setTimeout的延迟时间为多少，如果这两个setTimeout时间的差值小于第一个setTimeout消耗的时间，程序会等待这个setTimeout执行完成后立即执行下一个setTimeout,如果差值大于消耗的时间，就按照和主程序约定的延迟（setTimeout里的第二个参数）执行即可</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript中setTimeout执行顺序

## 原文链接
[https://segmentfault.com/a/1190000010109751](https://segmentfault.com/a/1190000010109751)

