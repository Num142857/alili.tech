---
title: '定时器在大型web项目中的应用和实现' 
date: 2019-02-12 2:30:12
hidden: true
slug: nmc0s3od7n
categories: [reprint]
---

{{< raw >}}

                    
<p>在大规模分布式系统中，每个业务都可能是集群，每个业务机都会产生定时任务，不同的业务会有不同的任务管理需求，统一的任务调度和管理变得非常有必要。</p>
<ol>
<li><p>定时如何准确，大量的定时被同时触发怎么办？</p></li>
<li><p>定时结束的时候，怎么通知业务机去处理呢？</p></li>
<li><p>某台业务机下线了怎么办？</p></li>
<li><p>如何提供任务更新、删除功能？</p></li>
</ol>
<p>基本模型如下图：<br><span class="img-wrap"><img data-src="/img/bVt1UQ" src="https://static.alili.tech/img/bVt1UQ" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>定时器在社会中有着广泛的应用，比如每天叫你起床的闹钟。在软件项目中，定时器也被应用到了各方各面，本文将从 web 项目入手，讲述定时器，本文的例子都以 <code>node</code> 为例。</p>
<h2 id="articleHeader0">为什么要用定时器？</h2>
<p>没有什么比机器更加准时！在我接触单片机的时候，已经开始感叹，为什么机器时间可以做到这么准！</p>
<p>比如文章的定时发布、商品的准点开始抢购、活动定时上下架，肯定不会是一个又一个管理员在后台帮你点击按钮，完成操作！系统的准时可以定位到毫秒级，虽然每个用户可能和服务器的时间不一致，秒级的差别还是在可接受范围的，但是在某些领域也会有很多精细到毫秒级的定时任务需求，比如航空航天、定时炸弹等等。</p>
<h2 id="articleHeader1">定时器总类</h2>
<p>定时器有两种 <code>interval</code>、<code>timeout</code>, 对应重复任务和一次性任务。在我的理解里，interval 任务只是在 timeout 的时候再次注册了本任务。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 重复性任务
var timer = setInterval(function(){
 // do something
}, milliseconds)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 重复性任务</span>
<span class="hljs-keyword">var</span> timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
 <span class="hljs-comment">// do something</span>
}, milliseconds)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一次性任务
var timer = setTimeout(function(){
 // do something
}, milliseconds)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 一次性任务</span>
<span class="hljs-keyword">var</span> timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
 <span class="hljs-comment">// do something</span>
}, milliseconds)</code></pre>
<h2 id="articleHeader2">unix crontab 能解决问题吗？</h2>
<p>crontab 并不能精确到秒，crontab 的最小粒度是分，即当第一位是「*/1」时，即最小单位是每分钟执行，（不排除你们有奇淫技巧可以做到秒级控制的）。unix 本身支持强大的定时任务管理 crontab，定时的格式也是强大得令人惊叹。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* * * * * *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │ |
│ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
│ │ │ │ └───── month (1 - 12)
│ │ │ └────────── day of month (1 - 31)
│ │ └─────────────── hour (0 - 23)
│ └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, optional)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>* * * * * *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │ |
│ │ │ │ │ └ day of week (<span class="hljs-number">0</span> - <span class="hljs-number">7</span>) (<span class="hljs-number">0</span> or <span class="hljs-number">7</span> is Sun)
│ │ │ │ └───── month (<span class="hljs-number">1</span> - <span class="hljs-number">12</span>)
│ │ │ └────────── day of month (<span class="hljs-number">1</span> - <span class="hljs-number">31</span>)
│ │ └─────────────── hour (<span class="hljs-number">0</span> - <span class="hljs-number">23</span>)
│ └──────────────────── minute (<span class="hljs-number">0</span> - <span class="hljs-number">59</span>)
└───────────────────────── second (<span class="hljs-number">0</span> - <span class="hljs-number">59</span>, optional)</code></pre>
<p>1）Cron 表达式的格式：秒 分 时 日 月 周 年 (可选)。</p>
<p>字段名 允许的值 允许的特殊字符 <br> 秒 0-59 , - * / <br> 分 0-59 , - * / <br> 小时 0-23 , - * / <br> 日 1-31 , - * ? / L W C <br> 月 1-12 or JAN-DEC , - * / <br> 周几 1-7 or SUN-SAT , - * ? / L C # <br> 年 (可选字段) empty, 1970-2099 , - * /</p>
<p>「?」字符：表示不确定的值</p>
<p>「,」字符：指定数个值</p>
<p>「-」字符：指定一个值的范围</p>
<p>「/」字符：指定一个值的增加幅度。n/m 表示从 n 开始，每次增加 m</p>
<p>「L」字符：用在日表示一个月中的最后一天，用在周表示该月最后一个星期 X</p>
<p>「W」字符：指定离给定日期最近的工作日 (周一到周五)</p>
<p>「#」字符：表示该月第几个周 X。6#3 表示该月第 3 个周五</p>
<h4>Cron 表达式范例：</h4>
<p>每隔 5 秒执行一次：<em>/5 </em> <em> </em> * ?</p>
<p>每隔 1 分钟执行一次：0 <em>/1 </em> <em> </em> ?</p>
<p>每天 23 点执行一次：0 0 23 <em> </em> ?</p>
<p>每天凌晨 1 点执行一次：0 0 1 <em> </em> ?</p>
<p>每月 1 号凌晨 1 点执行一次：0 0 1 1 * ?</p>
<p>每月最后一天 23 点执行一次：0 0 23 L * ?</p>
<p>每周星期天凌晨 1 点实行一次：0 0 1 ? * L</p>
<p>在 26 分、29 分、33 分执行一次：0 26,29,33 <em> </em> * ?</p>
<p>每天的 0 点、13 点、18 点、21 点都执行一次：0 0 0,13,18,21 <em> </em> ?</p>
<p>每种开发语言都提供了 crontab 的相关封装，让开发者调用起来得心应手。以 <code>node</code> 为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
require('crontab').load(function(err, crontab) {
 // create with string expression
 var job = crontab.create('ls -la', '0 7 * * 1,2,3,4,5');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'crontab'</span>).<span class="hljs-built_in">load</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err, crontab)</span></span> {
 // <span class="hljs-built_in">create</span> with string expression
 var job = crontab.<span class="hljs-built_in">create</span>(<span class="hljs-string">'ls -la'</span>, <span class="hljs-string">'0 7 * * 1,2,3,4,5'</span>);
});</code></pre>
<p>你在 github 搜索 <a href="https://github.com/search?q=crontab&amp;type=Repositories&amp;utf8=%E2%9C%93" rel="nofollow noreferrer" target="_blank">crontab</a> 能搜到主流语言的实现。</p>
<blockquote><p>有个问题，定时器不准时!</p></blockquote>
<p>setInterval 的回调函数并不是到时后立即执行，而是等系统计算资源空闲下来后才会执行。而下一次触发时间则是在 setInterval 回调函数执行完毕之后才开始计时，所以如果 setInterval 内执行的计算过于耗时，或者有其他耗时任务在执行,setInterval 的计时会越来越不准, 延迟很厉害。crontab 也是同样的原理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var startTime = new Date().getTime();
var count = 0;
//耗时任务
setInterval(function(){
 var i = 0;
 while(i++ < 100000000);
}, 0);
setInterval(function(){
 count++;
 console.log(new Date().getTime() - (startTime + count * 1000));
}, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>;
<span class="hljs-comment">//耗时任务</span>
setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
 <span class="hljs-keyword">while</span>(i++ &lt; <span class="hljs-number">100000000</span>);
}, <span class="hljs-number">0</span>);
setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 count++;
 <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() - (startTime + count * <span class="hljs-number">1000</span>));
}, <span class="hljs-number">1000</span>);</code></pre>
<p>结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="126
176
163
112
109
107
203
189
170" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">126</span>
<span class="hljs-number">176</span>
<span class="hljs-number">163</span>
<span class="hljs-number">112</span>
<span class="hljs-number">109</span>
<span class="hljs-number">107</span>
<span class="hljs-number">203</span>
<span class="hljs-number">189</span>
<span class="hljs-number">170</span></code></pre>
<p>当然，不排除你们有奇淫技巧可以做到秒级控制的。</p>
<h2 id="articleHeader3">成千上万定时任务时怎么管理？</h2>
<p>Crontab 存在任务上限（其实我也不知道上限是多少，知道的麻烦告诉我），任务的同步、备份管理都比较麻烦，也会有比较多的并发问题需要处理。在分布式系统中，单独去部署一个定时任务机器也是可行的。不过任务调度、定时结束通知客户端也需要蛮多工作量的。</p>
<p>unix 的 crontab 不再是我们的第一选择，每种编程可能都有定时任务管理的相关框架。比如 java 的 Quartz，Python 的 APScheduler。nodejs 的 node-schedule。但是这些东西是否能真的满足你的需求呢？</p>
<blockquote><p>So，我们需要一个定时任务管理平台。</p></blockquote>
<h2 id="articleHeader4">思路和实现</h2>
<p>目标</p>
<ol>
<li><p>业务方可以定义定时时间、时间结束的触发任务</p></li>
<li><p>业务方可以更新或者删除已经发布的定时任务</p></li>
<li><p>定时任务管理平台统一接收和调度任务</p></li>
</ol>
<p>主要解决两个问题:</p>
<ol>
<li><p>设置准确的定时时间</p></li>
<li><p>时间结束触发客户端，不能重复消费</p></li>
</ol>
<p>redis 在 2.8.X 版本可以开启了键空间通知，更多相关请移步 <a href="http://redis.io/topics/notifications" rel="nofollow noreferrer" target="_blank">Redis Keyspace Notifications</a>。（默认不开启,3.x 版本好像就失效了。），redis 支持的很多键空间事件，比如：<code>DEL</code>,<code>RENAME</code>,<code>EXPIRE</code>等等，redis 本身可以定义某个键的过期时间，<a href="http://redis.io/commands/ttl" rel="nofollow noreferrer" target="_blank">ttl key</a>。</p>
<p>这个值正好用来设置为定时任务的时间。更多相关请移步 <a href="http://redis.io/topics/notifications" rel="nofollow noreferrer" target="_blank">Redis Keyspace Notifications</a>。如果客户端订阅了某种规则的键通知，比如过期，那么在某个键过期的时候就会收到一个通知，这个事件就是定时结束，可以告诉业务机可以开启任务了。</p>
<p><strong> 可如果有多个 redis 客户端订阅了某个键的过期时间，那么任务还是会被触发很多次。</strong> 因为每个客户端<br>都是平等的，你能订阅，我同样可以订阅。解决办法就是 <strong>生产者和消费者模式</strong>。同一个过期消息只能被消费一次。</p>
<h4>重点来了</h4>
<p>把所有的定时任务按照定时开启的时间倒序排列，存入 sorted Sets , 把时间设置为 score。这样就会形成一个按照时间排好序的集合，可以按照时间先后依次取出所有的任务，需要新增和修改任务，也是可以通过 redis 的命令实现的。</p>
<p>定时管理服务器每 1000ms 去取 sorted sets 顶部的数据，如果获取到的 task 离触发小于 1s，那么就可以执行 pop() 操作，表示这个任务开始被调度执行，因为 redis 的 pop() 是原子性的，同一个 task 永远只会被消费一次。这样就解决了 redis 键空间通知会被重复消费的问题。</p>
<p>伪代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var taskSorts = new Sets(task1, task2, task3); // 在 redis 中建立按时间排序的集合

// 每隔一秒执行一下操作，
var newOne = taskSorts.zrank(-1); // 获取到最快发生的任务
if(newOne.time < 1000){ // 如果满足消费条件
 newOne = taskSorts.pop(); // 消费该任务，重复此循环，继续消费下一个任务
 setTimeout(function(){
 // dosomething
 }, newOne.time)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> taskSorts = <span class="hljs-keyword">new</span> <span class="hljs-type">Sets</span>(task1, task2, task3); <span class="hljs-comment">// 在 redis 中建立按时间排序的集合</span>

<span class="hljs-comment">// 每隔一秒执行一下操作，</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">One</span> = taskSorts.zrank(<span class="hljs-number">-1</span>); <span class="hljs-comment">// 获取到最快发生的任务</span>
<span class="hljs-keyword">if</span>(<span class="hljs-keyword">new</span><span class="hljs-type">One</span>.time &lt; <span class="hljs-number">1000</span>){ <span class="hljs-comment">// 如果满足消费条件</span>
 <span class="hljs-keyword">new</span><span class="hljs-type">One</span> = taskSorts.pop(); <span class="hljs-comment">// 消费该任务，重复此循环，继续消费下一个任务</span>
 setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span></span>(){
 <span class="hljs-comment">// dosomething</span>
 }, <span class="hljs-keyword">new</span><span class="hljs-type">One</span>.time)
}
</code></pre>
<h4>任务触发</h4>
<ol>
<li><p>任务的提交和触发都应该在业务方完成。定时任务管理平台只是帮助管理和调度任务。在定义的任务里面定义好任务执行的回调参数和接口。</p></li>
<li><p>客户端定义任务的时候，同时注册好定时结束的回调接口，或者应该在项目启动的时候，就注册好所有回调的接口。因为同一个业务的 A 机器提交了任务，触发的时候可能 A 机器下线了，只能定时任务平台只能去触发业务 A 的 B 机器了。</p></li>
<li><p>引入跨服务远程调用。业务和定时任务管理平台可能不在同一个机器，可能分布在不同的 ip。听起来很复杂，实际上跨语言的调用调用方式有很多，比如 REST API、消息队列、RPC。我的团队选择了 Thrift（Facebook 开源的，跨语言的，现在共享给了 Apache 基金）。以上的方式都可以实现任务只被触发了一次，远程通知给客户端（任务注册方）。</p></li>
</ol>
<h4>成品 -- nodejs 的实现 cron-redis</h4>
<p><a href="https://github.com/MZMonster/cron-redis" rel="nofollow noreferrer" target="_blank">https://github.com/MZMonster/cron-redis</a><br>主要依赖 bull 实现了任务队列的管理功能实现的定时任务管理工具。</p>
<p>demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 就这样定义，3 秒钟之后，hello 函数将被执行。
function hello (x, y){
 console.log(new Date());
 console.log(x + ' + '+ y +' = %s', x+y);
}

// 我是一个任务
var task1 = {
 method: hello.name, // 任务回调的函数
 params: [2, 3], // 任务执行的参数
 rule: moment().add(3, 's').toDate() // 任务执行间隔，支持 crontab 格式
}

queue.register(hello)
queue.publish(task1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 就这样定义，3 秒钟之后，hello 函数将被执行。</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span> (<span class="hljs-params">x, y</span>)</span>{
 <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());
 <span class="hljs-built_in">console</span>.log(x + <span class="hljs-string">' + '</span>+ y +<span class="hljs-string">' = %s'</span>, x+y);
}

<span class="hljs-comment">// 我是一个任务</span>
<span class="hljs-keyword">var</span> task1 = {
 <span class="hljs-attr">method</span>: hello.name, <span class="hljs-comment">// 任务回调的函数</span>
 params: [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], <span class="hljs-comment">// 任务执行的参数</span>
 rule: moment().add(<span class="hljs-number">3</span>, <span class="hljs-string">'s'</span>).toDate() <span class="hljs-comment">// 任务执行间隔，支持 crontab 格式</span>
}

queue.register(hello)
queue.publish(task1);</code></pre>
<p>如果你要求不高，unix 自带的 crontab 也足够你折腾了。使用 redis 来实现定时也是一种极好的思路，<a href="https://github.com/MZMonster/cron-redis" rel="nofollow noreferrer" target="_blank">cron-redis</a> 值得你去试一试。</p>
<p>该库只是一个定时任务的库，实际上可以通过以上的思路实现微服务————定时任务管理平台。通过 cron-redis 组合远程服务调用 thrift、服务的注册发现工具 zookeeper，定时任务管理平台分分钟就被搭建了（等我下一篇文章吧，分分钟搭建微服务）。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
定时器在大型web项目中的应用和实现

## 原文链接
[https://segmentfault.com/a/1190000004736079](https://segmentfault.com/a/1190000004736079)

