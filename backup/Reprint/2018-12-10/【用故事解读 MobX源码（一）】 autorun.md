---
title: '【用故事解读 MobX源码（一）】 autorun' 
date: 2018-12-10 2:30:08
hidden: true
slug: g56pd1r6omk
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>================前言===================</strong></p>
<ul>
<li>
<strong>初衷</strong>：网上已有很多关于 MobX 源码解读的文章，但大多阅读成本甚高。本人在找文章时对此深有体会，故将以系列故事的方式展现源码逻辑，尽可能以易懂的方式讲解 MobX 源码；</li>
<li>
<p><strong>本系列文章</strong>：</p>
<ul>
<li>《<a href="https://segmentfault.com/a/1190000013682735">【用故事解读 MobX源码（一）】 autorun</a>》</li>
<li>《<a href="https://segmentfault.com/a/1190000014238836" target="_blank">【用故事解读 MobX源码（二）】 computed</a>》</li>
<li>《<a href="https://segmentfault.com/a/1190000014726483">【用故事解读 MobX源码（三）】 shouldCompute</a>》</li>
<li>《<a href="https://segmentfault.com/a/1190000015481998" target="_blank">【用故事解读 MobX 源码（四）】装饰器 和 Enhancer</a>》</li>
<li>《<a href="https://segmentfault.com/a/1190000015875144">【用故事解读 MobX 源码（五）】 Observable</a>》</li>
</ul>
</li>
<li>
<strong>文章编排</strong>：每篇文章分成两大段，第一大段以简单的侦探系列故事的形式讲解（<strong>所涉及人物、场景都以 MobX 中的概念为原型创建</strong>），第二大段则是相对于的源码讲解。</li>
<li><strong>本文基于 MobX 3 源码讲解</strong></li>
</ul>
<p><strong>=======================================</strong></p>
<h1 id="articleHeader0">A. Story Time</h1>
<h2 id="articleHeader1">1、 场景</h2>
<hr>
<p><strong>场景</strong>：<br>一位名为 <strong>张三</strong> 的银行用户账户情况为：</p>
<ul>
<li>账户存款为 3（万元）</li>
<li>信用借贷为 2（万元）</li>
</ul>
<p>你作为警署最高长官，在一起金融犯罪中认定 <strong>张三</strong> 为金融犯罪嫌疑犯，想自动化跟踪这位用户的储蓄情况，比如他一旦银行存款有变更就打印出他当前的账户存款</p>
<hr>
<p>为了实现这个任务，你下发命令给你的执行官（MobX）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bankUser = mobx.observable({
  name: '张三',
  income: 3,
  debit: 2
});

mobx.autorun(() => {
  console.log('张三的账户存款:', bankUser.income);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bankUser = mobx.observable({
  <span class="hljs-attr">name</span>: <span class="hljs-string">'张三'</span>,
  <span class="hljs-attr">income</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">debit</span>: <span class="hljs-number">2</span>
});

mobx.autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三的账户存款:'</span>, bankUser.income);
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015981309?w=600&amp;h=431" src="https://static.alili.tech/img/remote/1460000015981309?w=600&amp;h=431" alt="start" title="start" style="cursor: pointer;"></span></p>
<p>执行官拿着这几行代码开始部署警力来完成你下发的指令，并将这次行动命名为 <strong>A计划</strong> （是不是很酷？??）。你所要做的，就是等执行官 MobX 执行行动部署完毕之后，坐在办公室里一边惬意地喝着咖啡，一边在电脑上观察张三账户的存款变化。</p>
<p>执行官部署完毕后，首先会立即打印出 <strong>张三的账户存款: 3</strong> </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013682741?w=548&amp;h=132" src="https://static.alili.tech/img/remote/1460000013682741?w=548&amp;h=132" alt="income" title="income" style="cursor: pointer;"></span></p>
<p>后续张三的账户存款有更改的话，会 <strong>自动执行该部署方案</strong>，控制台里就自动打印其存款；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 更改账户存款
bankUser.income = 4;
bankUser.income = 10;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 更改账户存款</span>
bankUser.income = <span class="hljs-number">4</span>;
bankUser.income = <span class="hljs-number">10</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013682742?w=379&amp;h=115" src="https://static.alili.tech/img/remote/1460000013682742?w=379&amp;h=115" alt="autorun" title="autorun" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015981310?w=600&amp;h=343" src="https://static.alili.tech/img/remote/1460000015981310?w=600&amp;h=343" alt="income" title="income" style="cursor: pointer; display: inline;"></span></p>
<p>是不是很神奇很自动化？</p>
<h2 id="articleHeader2">2、 部署方案</h2>
<p>作为警署最高长官，你不必事必躬亲过问执行官（MobX）部署的细节，只要等着要结果就可以。</p>
<p>而作为执行官（MobX），你得知道 <strong>A计划</strong> 中部署方案的每一步细节。下面我们来一探究竟执行官 MobX 到底是如何部署 <strong>A计划</strong> 的。</p>
<h3 id="articleHeader3">2.1、 组织架构</h3>
<p>执行官（MobX） 拥有一套成熟的运作机构组织支撑任务的执行。为了执行这项任务，涉及到 2 类职员和 1 个数据情报室：</p>
<ul><li>
<strong>观察员</strong>：其工作职责是观察并监督嫌疑人特定信息，比如这里，监视张三的收入（<code>income</code>）属性，当这项特征有变更的时候，及时向上级汇报（并执行特定的操作）；</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015981311?w=59&amp;h=100" src="https://static.alili.tech/img/remote/1460000015981311?w=59&amp;h=100" alt="observer" title="observer" style="cursor: pointer;"></span></p>
<ul><li>
<strong>探长</strong>：一方面负责管理划归给他的 <strong>观察员</strong>，整合观察员反馈的资讯；另一方面接受 MobX 执行官交给他的任务，在 <strong>适当的时机</strong> 执行这项任务（此任务是打印张三的存款）；</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015981312?w=50&amp;h=100" src="https://static.alili.tech/img/remote/1460000015981312?w=50&amp;h=100" alt="tanzhang" title="tanzhang" style="cursor: pointer;"></span></p>
<ul><li>此外还会架设一个 <strong>数据情报室</strong>，方便执行官 MobX、探长和观察员们 互相通过情报室进行数据信息的交换。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015981313?w=100&amp;h=81" src="https://static.alili.tech/img/remote/1460000015981313?w=100&amp;h=81" alt="room" title="room" style="cursor: pointer;"></span></p>
<p>具体组织架构关系图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015981314?w=800&amp;h=418" src="https://static.alili.tech/img/remote/1460000015981314?w=800&amp;h=418" alt="structor" title="structor" style="cursor: pointer;"></span></p>
<p>按照组织架构，执行官 MobX 分解计划细节并安排人员如下：</p>
<p>1.明确此次任务是 <strong>当张三账户存款变更时，打印其存款</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="() => {
  console.log('张三的账户存款:', bankUser.income);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code class="c">() =&gt; {
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'张三的账户存款:'</span>, bankUser.income)<span class="hljs-comment">;</span>
}</code></pre>
<p>2.将任务指派给执行组中的探长 R1<br> 3.派遣观察组中的观察员 O1 监察张三账户的 <code>bankUser.income</code> 属性<br> 4.探长 R1 任务中所需的“张三的账户存款” 数值必须从观察员 O1 那儿获取；<br> 5.同时架设数据情报室，方便信息交换；</p>
<h3 id="articleHeader4">2.2、 部署细节</h3>
<p>人员安排完毕，执行官拿出一份 <strong>部署方案书</strong>，一声令下 “各位就按这套方案执行任务吧！”；</p>
<p>在部署方案中下达之后，机构各组成员各司其职，开始有条不紊地开始运作，具体操作时序图如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013682748?w=1849&amp;h=2627" src="https://static.alili.tech/img/remote/1460000013682748?w=1849&amp;h=2627" alt="detail" title="detail" style="cursor: pointer;"></span></p>
<p>对时序图中的关键点做一下解释：</p>
<ol><li>
<p>执行官 MobX 先将探长 R1 信息注册到中心情报室；（有些情况下，比如侦破大案要案时需要多位探长协作，将存在多位探长同时待命的情况；当然此次任务中，只有探长 R1 在待命）</p>
<ol>
<li>中心情报室给执行官 MobX  返回所有待命探长列表（此例中仅有探长 R1）；</li>
<li>
<p>执行官 MobX 挨个让每位待命探长按以下步骤操作：</p>
<ul>
<li>3.1. 探长出发做任务时，记得给中心情报室通告一声，好比上班“打卡”操作。（记录事务序号，好让中心情报室知晓案情复杂度；有些案件中将有很多探长同时执行任务）</li>
<li>3.2 探长 R1 开始监督并执行 MobX 交给他的任务（“打印张三的存款”）</li>
<li>3.3 首先在数据情报室中“注册”，将自己设置成 <strong>正在执勤人员</strong>；（这一步很重要）</li>
<li>3.4 随后真正进入执行任务的状态</li>
<li>3.5 在执行任务的时候，发现需要张三的存款（<code>income</code>）这个数值，可这个数值探长 R1 不能直接获取，<strong>必须通过观察员 O1 取得</strong>，于是通过专用通讯机和观察员 O1 取得联系，请求获取要张三的存款（<code>income</code>）</li>
<li>
<p>3.6 观察员 O1 发现有人通过专用通讯机请求张三的存款（<code>income</code>），就开始如下操作：</p>
<ul>
<li>3.6.1 将自己的信息 <strong>经过 数据情报室</strong>，然后传达给请求方；只有上级（不一定是探长，有可能是其他的上级领导）才能通过这个专用通讯机发消息给观察员；</li>
<li>3.6.2 <strong>数据情报室</strong> 将该信息同步给 <strong>正在执勤人员</strong> —— 即探长 R1</li>
<li>3.6.3 同时将张三的存款（<code>income</code>）返回给请求方；（该消息不用经过 <strong>数据情报室</strong>）</li>
</ul>
</li>
<li>3.7 此时探长拥有两份信息：任务所需要的张三的存款（<code>income</code>），以及观察员 O1 的相关信息；因时间紧，执行任务优先级高，探长 R1 先拿着张三的存款（<code>income</code>）数据，先做完任务。（至于观察员 O1 的信息 <strong>先临时保存</strong> ，方便后续处理）；</li>
<li>3.8 等到任务执行完了，探长松了一口气，汇总并整理临时保存的观察员信息；<strong>在这一阶段，探长 R1 才和 观察员 O1 互相建立牢固的关系（可以理解为，互留联系方式，可随时联系得上对方），也是在这个时候，观察员 O1 才知晓其上级领导是探长 01</strong>；</li>
<li>3.9 此后，探长 R1 发消息告知中心情报室，削去此次事务（说明事务执行完了），好比下班 “打卡”操作。</li>
</ul>
</li>
<li>至此 A 计划部署完毕</li>
</ol>
</li></ol>
<p>上述时序图中有些地方需要强调一下：</p>
<ol>
<li>张三的存款（<code>income</code>）只归观察员 O1 监视，探长 R1 所获取的张三的存款只能通过观察员 O1 <strong>间接获取到</strong>，探长不能越权去直接获取；</li>
<li>
<p>探长 R1 和观察员 O1 建立关系并非一步到位，是 <strong>分两个阶段</strong> 的：</p>
<ul>
<li>第一阶段（对应上述步骤中 3.6.2）是在执行任务期间，仅仅是建立短暂的 <strong>单向关系</strong>；<strong>即，此时探长 R1 知晓观察员 O1 的情况，但反过来，但观察员 O1 并不知晓探长 R1 ；</strong>
</li>
<li>第二阶段（对应上述步骤中 3.8）在任务执行完，收尾阶段的时候，探长才有时间梳理、整合任务期间的探员信息（因为任务中涉及到有可能多个观察员，当然此次任务中只有 1 个），那时候才有时间 <strong>慢慢地</strong> 和各位探员互相交换信息，建立 <strong>明确且牢固</strong> 的关系；</li>
</ul>
</li>
</ol>
<h3 id="articleHeader5">2.3、 任务执行自动化</h3>
<p>作为警署最高长官的你，拿着这份部署方案，眉头紧锁：“我说执行官 ，就为了区区获取张三的存款这么件事儿，耗费那么多人力资源，值么？直接获取 <code>bankUser.income</code> 不就行了？！”</p>
<p>“emm...，这所做的努力，图的是普适性和 <strong>自动化响应</strong>。”执行官 MobX 淡然自如，不紧不慢徐徐道来，“有了上面那套机制，一方面每当张三的存款变更后，就会 <strong>自动化执行上述部署方案的过程</strong>；另一方面很方便扩展，后续针对其他监察，只需要在此部署方案中稍加改动就可以，所需要的高级功能都是基于这个方案做延伸。真正做到了 ’部署一次，全自动化执行‘ 的目的。“</p>
<p>随后，执行官 MobX 给出一张当张三存款发生变化之时，此机构的运作时序图；</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015981315?w=766&amp;h=511" src="https://static.alili.tech/img/remote/1460000015981315?w=766&amp;h=511" alt="auto" title="auto" style="cursor: pointer;"></span></p>
<p>"的确，小机构靠人力运作，大机构才靠制度运转。那就先试运行这份部署计划，看它能否经受得起时间的考验吧。" 警署最高长官拍拍执行官 MobX 的肩膀，若有所思地踱步出了办公室。</p>
<p>（此节完。未完待续）</p>
<h1 id="articleHeader6">B. Source Code Time</h1>
<p>上面讲那么久的故事，是为了给讲源码做铺垫。</p>
<p>接下来将会贴 MobX 源码相关的代码，稍显枯燥，我只能尽量用通俗易懂的话来分析讲解。</p>
<p>先罗列本文故事中人物与 MobX 源码概念映射关系：</p>
<table>
<thead><tr>
<th>故事人物</th>
<th>MobX 源码</th>
<th>解释</th>
</tr></thead>
<tbody>
<tr>
<td>警署最高长官</td>
<td>(无)</td>
<td>MobX 用户，没错，就是你</td>
</tr>
<tr>
<td>执行官 MobX</td>
<td>MobX</td>
<td>整个 MobX 运行环境</td>
</tr>
<tr>
<td>A计划</td>
<td><a href="https://github.com/mobxjs/mobx/blob/master/src/api/autorun.ts" rel="nofollow noreferrer" target="_blank">autorun</a></td>
<td>官方文档 -<a href="http://cn.mobx.js.org/refguide/autorun.html" rel="nofollow noreferrer" target="_blank">mobx.autorun</a>方法</td>
</tr>
<tr>
<td>探长</td>
<td><a href="https://github.com/mobxjs/mobx/blob/master/src/core/reaction.ts" rel="nofollow noreferrer" target="_blank">reaction</a></td>
<td>官方文档 - <a href="http://cn.mobx.js.org/refguide/extending.html#reactions%E5%8F%8D%E5%BA%94" rel="nofollow noreferrer" target="_blank">Reaction 响应对象</a>
</td>
</tr>
<tr>
<td>观察员</td>
<td><a href="https://github.com/mobxjs/mobx/blob/master/src/core/observable.ts" rel="nofollow noreferrer" target="_blank">observable</a></td>
<td>官方文档 - <a href="http://cn.mobx.js.org/refguide/observable.html" rel="nofollow noreferrer" target="_blank">Observable 对象</a>
</td>
</tr>
<tr>
<td>数据情报室</td>
<td><a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/globalstate.ts" rel="nofollow noreferrer" target="_blank">globalstate</a></td>
<td>MobX 运行环境中的 ”全局变量“，不同对象通过它进行数据传递通信，十分重要；（但这其实在一定程度上破坏了内聚性，给源码阅读、程序 debug 造成一定的难度）</td>
</tr>
</tbody>
</table>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015981316?w=800&amp;h=354" src="https://static.alili.tech/img/remote/1460000015981316?w=800&amp;h=354" alt="reflect" title="reflect" style="cursor: pointer;"></span></p>
<p>本文的重点是讲解 A 计划所对应的 <a href="https://github.com/mobxjs/mobx/blob/master/src/api/autorun.ts" rel="nofollow noreferrer" target="_blank">autorun</a> 的源码，先从整体上对 MobX 的运行有个大致了解，而所涉及到的 <code>Reaction</code>、<code>Observable</code> 等细节概念后续章节再做展开，这里仅仅大致提及其部分功能和属性；</p>
<h2 id="articleHeader7">1、下达的命令</h2>
<p>回到故事的最开始，你给 MobX 下达的命令如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bankUser = mobx.observable({
  name: '张三',
  income: 3,
  debit: 2
});

mobx.autorun(() => {
  console.log('张三的账户存款:', bankUser.income);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bankUser = mobx.observable({
  <span class="hljs-attr">name</span>: <span class="hljs-string">'张三'</span>,
  <span class="hljs-attr">income</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">debit</span>: <span class="hljs-number">2</span>
});

mobx.autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三的账户存款:'</span>, bankUser.income);
});</code></pre>
<p>只有两条语句，第一条语句是创建观察员，第二条语句是执行 A 计划（内含委派探长、架设情报局等工作）</p>
<p>我们挨个细分讲解。</p>
<h3 id="articleHeader8">1.1、第一条语句：创建观察员 - Observable</h3>
<p>第一条语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bankUser = mobx.observable({
  name: '张三',
  income: 3,
  debit: 2
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> bankUser = mobx.observable({
  <span class="hljs-attr">name</span>: <span class="hljs-string">'张三'</span>,
  <span class="hljs-attr">income</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">debit</span>: <span class="hljs-number">2</span>
})</code></pre>
<p>我们调用 <code>mobx.observable</code> 的时候，就创建了 <a href="http://cn.mobx.js.org/refguide/observable.html" rel="nofollow noreferrer" target="_blank">Observable 对象</a>，对象的所有属性都将被拷贝至一个克隆对象并将克隆对象转变成可观察的。</p>
<p>因此这一行代码执行后， <code>name</code>、<code>income</code> 和 <code>debit</code> 这三个属性都变成可观察的；</p>
<p>若以故事场景来叙述中，执行官 MobX 在部署的时候委派了 3 位探员，分别监视这 3 个属性；而故事中交给探长任务中仅仅涉及了那位监视 <code>income</code> 属性的观察员 O1；（所以另外两位探员都还在休息）</p>
<blockquote>在这里可以看到 <strong>惰性求值</strong> 的思想的应用，只有在 <strong>必要的时候</strong> 启用 <strong>所观察对象</strong>，粒度细，有利于性能提升；</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015981317?w=128&amp;h=200" src="https://static.alili.tech/img/remote/1460000015981317?w=128&amp;h=200" alt="o1" title="o1" style="cursor: pointer;"></span></p>
<p>之所以只有 1 位观察员，是因为由于上级下达的具体任务内容是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="() => {
  console.log('张三的账户存款:', bankUser.income);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">() =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三的账户存款:'</span>, bankUser.income);
}</code></pre>
<p>看看任务中出现 <code>bankUser.income</code> 而并没有出现 <code>bankUser.debit</code> 和 <code>bankUser.name</code>，说明这个任务只 <strong>牵连</strong> 探员O1，而和其他探员无关。</p>
<blockquote>注：本文暂时先不分析 <code>mobx.observable</code> 的源码，留待后续专门的一章来分析；迫不及待的读者，可以先阅读网上其他源码文章，比如：<a href="https://zhuanlan.zhihu.com/p/31705632" rel="nofollow noreferrer" target="_blank">Mobx 源码解读（二） Observable</a>
</blockquote>
<p>观察员有两个非常重要的行为特征：</p>
<ul>
<li>当有人请求观察员所监控的值（比如<code>income</code>）时，会触发 MobX 所提供的 <code>reportObserved</code> 方法；</li>
<li>当观察员所监控的值（比如<code>income</code>）发生变化时，会触发 MobX 所提供的 <code>propagateChanged</code> 方法；</li>
</ul>
<p>这里留一个印象，本文后续在适当的时机再讲解这两个方法是在什么时候触发的；</p>
<h3 id="articleHeader9">1.2、第二条语句：A 计划的实施 - <a href="https://github.com/mobxjs/mobx/blob/master/src/api/autorun.ts" rel="nofollow noreferrer" target="_blank">autorun</a>
</h3>
<p>第二条语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mobx.autorun(() => {
  console.log('张三的账户存款:', bankUser.income);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">mobx.autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三的账户存款:'</span>, bankUser.income);
});</code></pre>
<p>这里出现的 MobX 中的 <a href="http://cn.mobx.js.org/refguide/autorun.html" rel="nofollow noreferrer" target="_blank">mobx.autorun</a> 方法对应故事中的 <strong>整个A计划的实施</strong>：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015981318?w=400&amp;h=214" src="https://static.alili.tech/img/remote/1460000015981318?w=400&amp;h=214" alt="autorun" title="autorun" style="cursor: pointer;"></span></p>
<p>autorun 的直观含义就是 <strong>响应式函数</strong> —— 响应观察值的变化而自动执行指定的函数。</p>
<p>我们看一下其源码：</p>
<blockquote>附源码位置：<a href="https://github.com/mobxjs/mobx/blob/master/src/api/autorun.ts" rel="nofollow noreferrer" target="_blank">autorun</a>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015981319?w=800&amp;h=423" src="https://static.alili.tech/img/remote/1460000015981319?w=800&amp;h=423" alt="autorun" title="autorun" style="cursor: pointer; display: inline;"></span></p>
<p>从这里可以看出 autorun 大致的脉络如下：</p>
<p>① <strong>首先创建 Reaction 类型对象</strong>。<code>new Reaction</code> 操作可以理解为创建探长 R1 ；</p>
<p>探长对应的类是  <a href="https://github.com/mobxjs/mobx/blob/master/src/core/reaction.ts" rel="nofollow noreferrer" target="_blank">Reaction</a>，其关键特征是 <strong>监督并控制任务的执行</strong>；</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdDb?w=122&amp;h=200" src="https://static.alili.tech/img/bVbfdDb?w=122&amp;h=200" alt="reaction" title="reaction" style="cursor: pointer; display: inline;"></span></p>
<p>本文的下一节将详细介绍探长们的 "生活日常"，此处先放一放。</p>
<p>② <strong>其次分配任务</strong>。源码中所涉及到的 <code>view()</code> 方法 就是具体的任务内容，即上述故事中的 <strong>打印张三账户存款</strong> 这项任务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="() => {
  console.log('张三的账户存款:', bankUser.income);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">() =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三的账户存款:'</span>, bankUser.income);
}</code></pre>
<p>③ 最后,<strong>立即执行一次部署方案</strong>。</p>
<p>代码中的 <a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/reaction.ts#L77" rel="nofollow noreferrer" target="_blank">reaction.schedule()</a>  表示让探长 R1 立即执行执行一次部署任务，<strong>执行的结果是完成人员部署，并让探长 R1 打印了一次张三账户存款</strong>；（同时和观察员 O1 建立关系）</p>
<p>现在你应该会理解<a href="http://cn.mobx.js.org/refguide/autorun.html" rel="nofollow noreferrer" target="_blank">官方文档</a>中的那句 ”使用 autorun 时，所提供的函数总是<strong>立即被触发一次</strong>“ 话了。</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdDJ?w=800&amp;h=406" src="https://static.alili.tech/img/bVbfdDJ?w=800&amp;h=406" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>看一下 schedule 方法：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdDS?w=800&amp;h=226" src="https://static.alili.tech/img/bVbfdDS?w=800&amp;h=226" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>看上去很简单，不到 5 行代码做了两件事情：<br> ① 将探长入列；<br> ② 让队列中的 <strong>所有探长</strong>（当然，在我们的示例中仅仅只有 1 名探长）都执行 <code>runReaction</code> 方法</p>
<p>对应时序图中所标注的 1、2 两部分：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdDW?w=800&amp;h=267" src="https://static.alili.tech/img/bVbfdDW?w=800&amp;h=267" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>所谓的 <strong>部署</strong>（schedule） 就是敦促 <strong>各位探长执行 <code>runReaction</code> 方法</strong>。</p>
<p>第二条语句从整体上看就这样了。</p>
<p>接下来就让我们来详细分析探长的 <code>runReaction</code> 的方法，在该方法中 <strong>探长将联动观察员、数据情报室一起在部署方案中发挥监督、自动化响应功能</strong>。</p>
<h2 id="articleHeader10">2、每位探长的生活日常</h2>
<p>任务的执行全靠探长，不过探长的存在常常是 <strong>依赖观察员</strong> 的，这是因为在任务过程中，<strong>如果想要获取所监视的张三的存款（<code>income</code>），必须通过观察员获取，自身是没有权力绕过观察员直接获取的哦</strong>。</p>
<p>每位探长的任务执行流大致如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdD3?w=800&amp;h=561" src="https://static.alili.tech/img/bVbfdD3?w=800&amp;h=561" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>主流程大致只有 4 步：<br> ① 开始执行（<a href="https://github.com/mobxjs/mobx/blob/master/src/core/reaction.ts#L92" rel="nofollow noreferrer" target="_blank">runReaction</a>）<br> ② 判断是否执行（<a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/derivation.ts#L77" rel="nofollow noreferrer" target="_blank">shouldCompute</a>）<br> ③ 执行任务（onInvalidate）<br> ④ 结束</p>
<p>这些基就是每位探长的生活的总体了。下面我们挑其中的第 ① 、 ③ 步来讲解。</p>
<blockquote>其实图中另外有一个很重要的 <strong><a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/derivation.ts#L77" rel="nofollow noreferrer" target="_blank">shouldCompute</a></strong> 判断方法步骤，根据这个方法探长可以自行判断 <strong>是否执行任务</strong>，并非所有的任务都需要执行，这一步的作用是优化 MobX 执行效率。该方法源码内容先略过，后续章节再展开。</blockquote>
<h3 id="articleHeader11">2.1、开始执行 - <a href="https://github.com/mobxjs/mobx/blob/master/src/core/reaction.ts#L92" rel="nofollow noreferrer" target="_blank">runReaction</a>
</h3>
<p><span class="img-wrap"><img data-src="/img/bVbfdD7?w=800&amp;h=422" src="https://static.alili.tech/img/bVbfdD7?w=800&amp;h=422" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>该函数比较简单，主要是为执行任务 ”做一些准备“，给任务营造氛围。用 <code>startBatch()</code> 开头，用 <code>endBatch()</code> 结尾，中间隔着 <code>onInvalidate</code>。</p>
<p><code>startBatch()</code> 和 <code>endBatch()</code> 这两个方法一定是成对出现，用于影响 <code>globalState</code> 的 <code>inBatch</code> 属性，表明开启/关闭 <strong>一层新的事务</strong>，可以理解为 <strong>上下班打卡</strong> 操作。</p>
<p>只不过 <a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/observable.ts#L122" rel="nofollow noreferrer" target="_blank">startBatch()</a> 是 ”上班打卡“，对应时序图（3.1) 部分：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdD9?w=800&amp;h=88" src="https://static.alili.tech/img/bVbfdD9?w=800&amp;h=88" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/observable.ts#L126" rel="nofollow noreferrer" target="_blank">endBatch()</a> 相当于 “下班打卡”，不过稍微复杂一些，包含一些 <strong>收尾</strong> 操作，对应时序图（3.9）部分：<br><span class="img-wrap"><img data-src="/img/bVbfdEb?w=787&amp;h=82" src="https://static.alili.tech/img/bVbfdEb?w=787&amp;h=82" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们继续看隔在中间的 <code>onInvalidate</code> 方法。?</p>
<h3 id="articleHeader12">2.2、执行任务 - onInvalidate</h3>
<p>此阶段是流程中最重要的阶段。</p>
<p>你翻看源码，将会发现此方法 <code>onInvalidate</code> 是 Reaction 类的一个属性，且在初始化 Reaction 时传入到构造函数中的，这样做的目的是方便做扩展。</p>
<p><strong>所以，autorun 方法本质就是一种预定义好的 Reaction</strong> —— 你可以依葫芦画瓢，将自定义 <code>onInvalidate</code> 方法传给 <strong>Reaction</strong> 来实现自己的 <strong>计划任务</strong>（什么 <strong>Z计划</strong>啊、<strong>阿波罗计划</strong>啊，名字都起好了，就差实现了！！....）；</p>
<p>回过头来，在刚才所述的 autorun 源码中找到 Reaction 类初始化部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reaction = new Reaction(name, function() {
    this.track(reactionRunner)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> reaction = <span class="hljs-keyword">new</span> Reaction(name, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.track(reactionRunner)
})</code></pre>
<p>可以看到 <strong>onInvalidate</strong> 方法就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function() {
    this.track(reactionRunner)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.track(reactionRunner)
}</code></pre>
<p>这就不难理解 <code>onInvalidate</code> 实际执行的是 <code>reaction.track</code> 方法。</p>
<p>继续跟踪源码，会发现该 <code>onInvalidate</code> 阶段主要是由 3 个很重要的子流程所构成：</p>
<ul>
<li>3.1 跟踪任务（<a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/reaction.ts#L112" rel="nofollow noreferrer" target="_blank">track</a>）</li>
<li>3.2 执行任务（<a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/derivation.ts#L131" rel="nofollow noreferrer" target="_blank">trackDerivedFunction</a>）</li>
<li>3.3 更新依赖（<a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/derivation.ts#L156" rel="nofollow noreferrer" target="_blank">bindDependencies</a>）</li>
</ul>
<p>这 3 个函数并非是并行关系，而是嵌套关系，后者是嵌套在前者内执行的：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdEc?w=507&amp;h=448" src="https://static.alili.tech/img/bVbfdEc?w=507&amp;h=448" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>题外话：是不是很像 Koa 的 <a href="https://eggjs.org/zh-cn/intro/egg-and-koa.html#middleware" rel="nofollow noreferrer" target="_blank">洋葱圈模型</a> ？?</blockquote>
<h4>2.2.1、<a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/reaction.ts#L112" rel="nofollow noreferrer" target="_blank">track</a>
</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013682763?w=1374&amp;h=412" src="https://static.alili.tech/img/remote/1460000013682763?w=1374&amp;h=412" alt="track" title="track" style="cursor: pointer; display: inline;"></span></p>
<p>track 方法内容也简单，和刚才所说的 <strong>runReaction</strong> 方法类似 —— 也是用 <code>startBatch()</code> 开头，用 <code>endBatch()</code> 结尾，中间隔着 <code>trackDerivedFunction</code>。</p>
<p>所以在这个案例中，整个部署阶段是执行 <strong>两次</strong> <code>startBatch()</code> 和 <code>endBatch()</code> 的；在往后复杂的操作中，执行的次数有可能更多。</p>
<p>我们都知道数据库中的事务概念，其表示一组原子性的操作。Mobx 则借鉴了 <strong>事务</strong> 这个概念，它实现比较简单，就是通过 <strong>成对</strong> 使用 <code>startBatch</code> 和 <code>endBatch</code> 来开始和结束一个事务，用于批量处理 Reaction 的执行，避免不必要的重新计算。</p>
<p>因此到目前这一步，MobX 程序正处在 <strong>第二层</strong> 事务中。</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdEg?w=519&amp;h=481" src="https://static.alili.tech/img/bVbfdEg?w=519&amp;h=481" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>MobX 暴露了 <code>transaction</code> 这一底层 API 供用户调用，让用户能够实现一些较为高级的应用，具体可参考 <a href="http://cn.mobx.js.org/refguide/transaction.html" rel="nofollow noreferrer" target="_blank">官方文档 - Transaction(事务)</a> 章节获取更多信息。</p>
<p>接下来继续看隔在中间的 <code>trackDerivedFunction</code> 方法。?</p>
<h4>2.2.2、<a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/derivation.ts#L131" rel="nofollow noreferrer" target="_blank">trackDerivedFunction</a>
</h4>
<p><span class="img-wrap"><img data-src="/img/bVbfdEq?w=800&amp;h=411" src="https://static.alili.tech/img/bVbfdEq?w=800&amp;h=411" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们总算到了探长 <strong>真正执行任务</strong> 的步骤了，之前讲的所有流程都是为了这个函数服务的。</p>
<p>该环节的第 1 条语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="globalState.trackingDerivation = derivation;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">globalState.trackingDerivation = derivation;</code></pre>
<p>对应时序图（3.3）：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdEs?w=639&amp;h=95" src="https://static.alili.tech/img/bVbfdEs?w=639&amp;h=95" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>作用是将 <strong>derivation</strong> （此处等同于 <code>reaction</code> 对象）挂载到 ”全局变量“ <code>globalState</code> 的 <code>trackingDerivation</code> 属性上，这样其他对象就能获取到该 <code>derivation</code> 对象的数据了。这好比将探长在数据情报室中注册为 <strong>正在执勤人员</strong>，后续观察员 O1 会向数据情报室索取 <strong>正在执勤人员</strong> 人，然后将自身信息输送给他 —— 从结果上看，就相当于 <strong>观察员 O1</strong> 直接和 <strong>探长 R1</strong> 汇报；（之所以要经由数据情报室，是因为在执行任务时候，有可能其他工种的人也需要 <strong>正在执勤人员</strong> 的信息）</p>
<p>该环节的第 2 条语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result = f.call(context); // 效果等同于 result = console.log('张三的账户存款:', bankUser.income);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">result = f.call(context); <span class="hljs-comment">// 效果等同于 result = console.log('张三的账户存款:', bankUser.income);</span></code></pre>
<p>对应时序图（3.4）:</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdEx?w=603&amp;h=99" src="https://static.alili.tech/img/bVbfdEx?w=603&amp;h=99" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>没错，就是本次部署的 <strong>终极目的</strong> —— 打印张三账户存款！</p>
<p>MobX 将真正的目的执行之前里三层外三层地包裹其他操作，是为了将任务的运行情况<strong>控制在自己营造的环境氛围中</strong>。为什么这么做呢？</p>
<p>这么做是基于一个前提，该前提是：<strong>所运行的任务 MobX 它无法控制（警署长官今天下达 A 命令，明天下达 B 命令，控制不了）</strong>。</p>
<p>所以 MobX 就将任务的执行笼罩在自己所营造的氛围中，改变不了任务实体，我改变环境总行了吧？！！</p>
<p>由于环境是自己营造的，MobX 可以为所欲为，在环境中穿插各种因素：探长、观察员、数据情报室等等（后续还有其他角色），这样就将任务的运行尽最大可能地控制在这套所创造的体系中 —— 孙猴子不也翻不出如来佛的五指山么？</p>
<p>虽然更改不了任务内容，不过 MobX 实际在任务中安插观察员 O1 了，所以呢，当探长在执行任务时，将触发时序图中 （3.5）（3.6）两步反应：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdEz?w=466&amp;h=203" src="https://static.alili.tech/img/bVbfdEz?w=466&amp;h=203" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>复杂么？也还好，（3.6）是由 （3.5）触发的，（3.5）对应的操作是：探长 R1 想要获取的张三 <strong>income</strong> 属性。<br>（所以，划重点，敲黑板！！ 如果任务中不涉及到 <strong>income</strong> 这项属性，那么就不会有 （3.5）的操作，也就没有 （3.6）什么事）</p>
<p>由于探长 R1 所执行的任务中用到 <code>bankUser.income</code> 变量，这里的 <code>.</code> 符号其实就是 <strong>get()</strong> 操作；一旦涉及到 <strong>get()</strong> 操作，监督这个 <code>income</code> 属性的观察员 O1 就会执行 <strong><code>reportObserved</code></strong> 方法。 该 <strong><code>reportObserved</code></strong> 方法对应的源码如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdEB?w=800&amp;h=408" src="https://static.alili.tech/img/bVbfdEB?w=800&amp;h=408" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>那么多行代码，我们主要关注其中操作影响到探长（<code>derivation</code>）中的操作：</p>
<ul>
<li><ol><li>更新探长的 <code>lastAccessedBy</code> 属性（事务 id），这个是为了避免重复操作而设置的</li></ol></li>
<li><ol><li>更新探长的 <code>newObserving</code> 属性，将探员信息推入到该队列中（对应时序图 （3.6.2）操作），这个比较重要，<strong>后续探长和观察员更新依赖关系就靠这个属性了</strong>；</li></ol></li>
</ul>
<p>随后，任务执行完（时序图（3.7））后，探长就开始着手更新和观察员 O1 的关联关系了。?</p>
<h4>2.2.3、<a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/derivation.ts#L156" rel="nofollow noreferrer" target="_blank">bindDependencies</a>
</h4>
<p>探长 R1 整理和观察员的关系是在时序图 （3.8）处：<br><span class="img-wrap"><img data-src="/img/bVbfdEE?w=679&amp;h=136" src="https://static.alili.tech/img/bVbfdEE?w=679&amp;h=136" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>两者依赖更新的算法在参考文章<a href="https://zhuanlan.zhihu.com/p/31706360" rel="nofollow noreferrer" target="_blank">Mobx 源码解读（四） Reaction</a> 中有详细的注解，推荐阅读。这里也做一下简单介绍。</p>
<p>该函数的目的，是用 <code>derivation.newObserving</code> 去更新 <code>derivation.observing</code> 属性：</p>
<ul>
<li>
<code>derivation.newObserving</code> 就是刚才在所述时序图 （3.6.2）操作是生成的</li>
<li>执行完之后 <code>derivation.newObserving</code> 会置空，而 <code>derivation.observing</code> 属性获得更新，该属性反映的 <strong>探长</strong> 和 <strong>观察员</strong> 之间最新的关联关系；</li>
</ul>
<p>依赖更新肯定需要遍历，由于涉及到探长、观察员两个维度的数组，朴素算法的时间复杂度将是 <strong>O(n^2)</strong>，而 MobX 中使用 3 次遍历  + <code>diffValue</code> 属性的辅助将复杂度降到了 <strong>O(n)</strong>。? ?</p>
<p>下面我用示例来展现这 3 次遍历过程。</p>
<p><strong>2.2.3.1、先看一下整体的 input / output</strong></p>
<p>假设在执行 <code>bindDependencies</code> 函数之前， <code>derivation.observing</code> 已有 2 个元素，<code>derivation.newObserving</code> 有 5 个对象（由于 A、B 各重复一次，实际只有 3 个不同的对象 A、B、C），经过 <code>bindDependencies</code> 函数后 <code>derivation.observing</code> 将获得更新，如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdEH?w=680&amp;h=440" src="https://static.alili.tech/img/bVbfdEH?w=680&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>2.2.3.2、第一次循环：<code>newObserving</code> 数组去重</strong></p>
<p>第一次循环遍历 <code>newObserving</code>，利用 <code>diffValue</code> 进行去重，一次遍历就完成了（这种 <strong>数组去重算法</strong> 可以添加到面试题库中了??）。注意其中 <code>diffValue</code> 改变情况：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdEJ?w=783&amp;h=467" src="https://static.alili.tech/img/bVbfdEJ?w=783&amp;h=467" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>由于 A 对象（引用）既在 <code>observing</code> 数组也在 <code>newObserving</code> 数组中，<strong>当改变 <code>newObserving</code> 中 A 元素的 <code>diffValue</code> 值的时候，<code>observing</code> 数组 A 属性也自然跟着改变</strong>；</blockquote>
<p>这次遍历后，所有 <strong>最新的依赖</strong> 的 <code>diffValue</code> 值都是 1 了哦，而且去除了所有重复的依赖。</p>
<p><strong>2.2.3.3、第二次循环：去除<code>observing</code> 数组陈旧关联</strong></p>
<p>接下去第二次遍历针对 <strong><code>observing</code> 数组</strong>，做了两件事：</p>
<ul>
<li>如果对象的 <code>diffValue</code> 值为 0 （为 0 说明不在 <code>newObserving</code> 数组中，是陈旧的关联），则调用 <code>removeObserver</code> 去除该关联；因此这次遍历之后会删除 <code>observing</code> 数组中 <strong>D 对象</strong>
</li>
<li>让 <code>observing</code> 数组中剩余对象的 <code>diffValue</code> 值变成 0；</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbfdEN?w=799&amp;h=447" src="https://static.alili.tech/img/bVbfdEN?w=799&amp;h=447" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这一次遍历之后，去除了所有陈旧的依赖，且遗留下来的对象的 <code>diffValue</code> 值都是 0 了。</p>
<p><strong>2.2.3.4、第三次循环：将新增依赖添加到 <code>observing</code></strong></p>
<p>第二次遍历针对 <strong><code>newObserving</code> 数组</strong>，做了一件事：</p>
<ul><li>如果 <code>diffValue</code> 为 1，说明是新增的依赖，调用 <code>addObserver</code> 新增依赖，并将 <code>diffValue</code> 置为 0</li></ul>
<p><span class="img-wrap"><img data-src="/img/bVbfdEP?w=800&amp;h=447" src="https://static.alili.tech/img/bVbfdEP?w=800&amp;h=447" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这最后一次遍历，<code>observing</code> 数组关联都是最新，且 <code>diffValue</code> 都是 0 ，为下一次的 <code>bindDependencies</code> 做好了准备。</p>
<p><strong>至此，A计划部署方案（autorun 源码）就讲完了。 A 计划执行后，探长 R1 完成上级下达的任务，同时也和观察员 O1 建立起明确且牢固的依赖</strong>。</p>
<h2 id="articleHeader13">3、响应观察值的变化 - <a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/observable.ts#L183" rel="nofollow noreferrer" target="_blank">propagateChanged</a>
</h2>
<p>一旦张三存款发生变化，那么一定会被观察员 O1 监视到，请问此时观察员会怎么做？</p>
<p>或许有人会说，<strong>观察员 O1 然后上报给探长 R1 ，然后让探长 R1 再执行一次打印任务</strong>；</p>
<p>从最终结果角度去理解，上面的陈述其实没毛病，<strong>的确是观察员 O1 驱动探长 R1 再打印一次</strong>；</p>
<p>但若从执行过程角度去看，以上陈述是 <strong>错误的</strong>！ ?</p>
<p>观察员 O1 监视到变化之后，的确通知探长 R1了，<strong>但探长并非直接执行任务，而是通知 MobX 再按照 A 计划部署方案执行一遍！</strong>；（不得不感慨，这是多么死板地执行机制）</p>
<p>源码中是怎么体现的呢？</p>
<p>上面提及到过，当观察员所监控的值（比如<code>income</code>）发生变化时，会触发 MobX 所提供的 <code>propagateChanged</code> 方法。</p>
<p><code>propagateChanged</code> 对应的源码如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdES?w=800&amp;h=328" src="https://static.alili.tech/img/bVbfdES?w=800&amp;h=328" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>代码很简单，即遍历观察员的上级们，让他们调用 <strong>onBecomeStale()</strong> 方法 。该观察员有可能不止对一位上级（上级也不一定只有探长）负责，每位上级的 <strong>onBecomeStale()</strong> 是不一样的。（当然，此故事中观察员 O1 只有 1 位上级 —— 探长 R1）</p>
<p>我们看一下探长这类上级所定义的 <a href="https://github.com/mobxjs/mobx/blob/3.5.1/src/core/reaction.ts#L73" rel="nofollow noreferrer" target="_blank">onBecomeStale</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onBecomeStale() {
        this.schedule()
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">onBecomeStale() {
        <span class="hljs-keyword">this</span>.schedule()
    }</code></pre>
<p>简单明了，就是直接 <strong>再一次执行部署方案</strong>。如此简单朴素，真正做到了 “一视同仁” —— 无论什么任务，一旦部署就绪，任何观察员反馈情况有变（比如张三账户余额发生变动了），探长都是让 MobX 重新执行一遍部署方案，并不会直接执行任务，反正部署方案中有探长执行任务的步骤嘛。??</p>
<p>所谓的流程化、设计模式，<strong>都多多少少在一定程度上约束个体行为（丧失了一部分灵活性），而取得整体上的普适性和可扩展性</strong>。</p>
<p>现在再回过头来看刚才官方文档截图中的第二句话："<strong>然后每次它的依赖关系改变时会再次被触发</strong>" </p>
<p><span class="img-wrap"><img data-src="/img/bVbfdET?w=800&amp;h=406" src="https://static.alili.tech/img/bVbfdET?w=800&amp;h=406" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>它所表达的意思其实就是：当张三余额发生变化的时候，将 <strong>自动触发</strong> 上述的 A 计划部署方案。</p>
<h2 id="articleHeader14">4、小测试</h2>
<p>问：下列代码中 <code>message.title = "Hello world"</code> 为何不会触发 autorun 再次执行？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const message = observable({ title: &quot;hello&quot; })

autorun(() => {
    console.log(message)
})

// 不会触发重新运行
message.title = &quot;Hello world&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> message = observable({ <span class="hljs-attr">title</span>: <span class="hljs-string">"hello"</span> })

autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(message)
})

<span class="hljs-comment">// 不会触发重新运行</span>
message.title = <span class="hljs-string">"Hello world"</span></code></pre>
<p>其实上述问题来自官方的一个问题，若无思路的，可以先参考官方文档 <a href="http://cn.mobx.js.org/best/react.html#%E5%B8%B8%E8%A7%81%E9%99%B7%E9%98%B1-consolelog" rel="nofollow noreferrer" target="_blank">常见陷阱: console.log</a>。如果能从源码角度回答这个问题，则说明已经理解本节所讲的 <strong>autorun</strong> 的知识点了</p>
<h2 id="articleHeader15">5、小结</h2>
<p>此篇是开篇，所阐述的概念仅仅占 MobX 体系冰山一角。</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdEU?w=451&amp;h=284" src="https://static.alili.tech/img/bVbfdEU?w=451&amp;h=284" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>故事中还还有很多问题，比如：</p>
<ol>
<li>如何成为一名合格的探员、观察员？（用程序员的话讲，就是有哪些属性和方法）</li>
<li>数据情报室到底还存有哪些关键信息？</li>
<li>组织机构中是否还有其他组、成员？</li>
<li>多个探长、观察员情况下，这套部署方案又是如何的呢？</li>
<li>....</li>
</ol>
<p>以上问题的答案，读者可能已经知道，那些还不知道的可以自己留作自己思考；在后续章节，我也会在适当的时机解答上述中的问题；<br>（也欢迎大家提问，将有可能采纳编入后续的故事叙述中来解答）</p>
<p>后续的章节中，将继续介绍 <code>ComputedValue</code>、<code>Action</code>、<code>Atom</code>、<code>Derivation</code>、<code>Spy</code> 等，正是这些功能角色使得 MobX 有着强大的自动化能力，合理运用了惰性求值、函数式编程等编程范式，使 MobX 在复杂交互应用中大放异彩；</p>
<h2 id="articleHeader16">参考文章</h2>
<p>罗列本文所参考的文章，感谢他们所给予的帮助：</p>
<ul>
<li>
<a href="http://cn.mobx.js.org/" rel="nofollow noreferrer" target="_blank">官方中文文档</a>：不多讲，官方文档最好翻一遍。</li>
<li>
<a href="https://github.com/mobxjs/awesome-mobx/blob/master/README-CN.md" rel="nofollow noreferrer" target="_blank">awesome-mobx</a>： MobX 相关资源整合，方便多看多练。</li>
<li>
<a href="https://zhuanlan.zhihu.com/p/31704920" rel="nofollow noreferrer" target="_blank">Mobx 源码解读（一） 基本概念</a>：优质的 MobX 源码解读文章，受益匪浅。</li>
<li>
<a href="https://qiutc.me/post/mobx-core.html#comment-wrap" rel="nofollow noreferrer" target="_blank">MobX 核心源码解析</a>：本文深入 MobX 源码来解析其核心原理以及工作流程，推荐阅读；</li>
<li>
<a href="http://blog.fedeoo.cn/2017/03/30/%E6%8E%A2%E7%A7%98-MobX/" rel="nofollow noreferrer" target="_blank">探秘 MobX</a>：本文短小精悍，主讲<code>observable</code> 和 <code>autorun</code> 原理</li>
<li>
<a href="https://github.com/sorrycc/blog/issues/3" rel="nofollow noreferrer" target="_blank">MobX 原理</a>：本文对 <code>deviration</code> 着墨较多</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【用故事解读 MobX源码（一）】 autorun

## 原文链接
[https://segmentfault.com/a/1190000013682735](https://segmentfault.com/a/1190000013682735)

