---
title: '【用故事解读 MobX源码（二）】 computed' 
date: 2018-12-06 2:30:09
hidden: true
slug: f4myl7767yl
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>================前言===================</strong></p>
<ul>
<li>
<strong>初衷</strong>：以系列故事的方式展现 MobX 源码逻辑，尽可能以易懂的方式讲解源码；</li>
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
<li><strong>本文基于 MobX 4 源码讲解</strong></li>
</ul>
<p><strong>=======================================</strong></p>
<p>在写本文的时候，由于 MobX 以及升级到 4.x，API 有较大的变化，因此后续的文章默认都将基于 4.x 以上版本进行源码阅读。</p>
<p><a href="https://segmentfault.com/a/1190000013682735" target="_blank">前一篇文章</a>仍然以 mobx v3.5.1 的源码，<code>autorun</code> 逻辑在新版中没有更改，因此源码逻辑仍旧一致。</p>
<h1 id="articleHeader0">A. Story Time</h1>
<h2 id="articleHeader1">1、 场景</h2>
<p>为了多维度掌控嫌疑犯的犯罪特征数据，你（警署最高长官）想要获取并实时监控张三的 <strong>贷款数额、存贷比（存款和贷款两者比率）</strong> 的变化。</p>
<p>于是你就拟定了新的命令给执行官 MobX：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bankUser = mobx.observable({
  income: 3,
  debit: 2
});

var divisor = mobx.computed(() => {
  return bankUser.income / bankUser.debit;
});

mobx.autorun(() => {
  console.log('张三的贷款：', bankUser.debit, '；张三的存贷比: ' + divisor);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bankUser = mobx.observable({
  <span class="hljs-attr">income</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">debit</span>: <span class="hljs-number">2</span>
});

<span class="hljs-keyword">var</span> divisor = mobx.computed(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> bankUser.income / bankUser.debit;
});

mobx.autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三的贷款：'</span>, bankUser.debit, <span class="hljs-string">'；张三的存贷比: '</span> + divisor);
});
</code></pre>
<p>相比上一次的命令，除了监控张三贷款这项直接的指标，还需要监控 <strong>贷款比</strong>（<code>divisor</code>） 这项间接指标。</p>
<p>执行官 MobX 稍作思忖，要完成这个任务比之前的要难一点点，需要费一点儿精力。</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdE4?w=270&amp;h=400" src="https://static.alili.tech/img/bVbfdE4?w=270&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>不过，这也难不倒能力强大的 MobX 执行官，一番策略调整之后，重新拿出新的执行方案。部署实施之后，当张三去银行存款、贷款后，这些变化都实时反馈出来了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015981479?w=844&amp;h=446" src="https://static.alili.tech/img/remote/1460000015981479?w=844&amp;h=446" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">2、部署方案</h2>
<p>这次的部署和前一次相差不大，除了需要让观察员 O2（监视 <code>income</code>）参与进来之外，考虑到警署最高长官所需的 <strong>存贷比</strong> （<code>divisor</code>），还得派出另一类职员 ——  <strong>会计师</strong>：</p>
<ul><li>
<strong>会计师</strong>：此类职员专门负责计算，从事 <strong>数据的再加工</strong>（此项任务中，就是搜集数据并计算 <strong>存贷比</strong>）</li></ul>
<p><span class="img-wrap"><img data-src="/img/bVbfdE8?w=88&amp;h=100" src="https://static.alili.tech/img/bVbfdE8?w=88&amp;h=100" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>会计师是一个很有意思的角色，要想理解他们，必须得思考他们的数据“从哪儿来？到哪里去？” 这两个问题：</p>
<ul>
<li>从哪儿来：从<strong>观察员</strong>那儿获取，也可以从<strong>其他会计师</strong>那儿获取；</li>
<li>到哪儿去：所生产的数据，要么是被<strong>探长</strong>消费，要么被<strong>其他会计师</strong>所用；（当然，没有人消费他所生产的数据也是可能的，不过这就得追究 MobX 执行官的责任了，浪费了人力资源）</li>
</ul>
<p>引入了会计师角色之后，MobX 执行官重新绘制了部署计划图：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdE9?w=800&amp;h=439" src="https://static.alili.tech/img/bVbfdE9?w=800&amp;h=439" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>解释一下此计划图的意思：</p>
<ol><li>明确此次任务是 <strong>当张三账户存款或者贷款变更时，打印其贷款数额（<code>debit</code>）和存贷比（<code>divisor</code>）</strong>：</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="() => {
  console.log('张三的贷款：', bankUser.debit, '；张三的存贷比: ' + divisor);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">() =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三的贷款：'</span>, bankUser.debit, <span class="hljs-string">'；张三的存贷比: '</span> + divisor);
}</code></pre>
<ol>
<li>将任务指派给执行组中的探长 R1</li>
<li>派遣 2 名观察组中的观察员 O1、O2 分别监察张三账户的 <code>bankUser.income</code> 属性和 <code>bankUser.debit</code> 属性；</li>
<li>派遣计算组中的会计师 C1 计算张三的贷款比，其所需数值来源于观察员 O1、O2；</li>
<li>探长 R1 任务中所需的“张三的账户存款” 数值从观察员 O2 那儿获取；所需的 “张三的存贷比” 数值从会计师 C1 那儿获取；</li>
<li>同时架设数据情报室，方便信息交换；</li>
</ol>
<h3 id="articleHeader3">2.1、部署细节</h3>
<p>因为还是 <code>autorun</code> 命令，所以仍然执行 A计划方案（详情参考上一篇《<a href="https://segmentfault.com/a/1190000013682735">【用故事解读 MobX源码（一）】 autorun</a>》）MobX 执行官的部署方案从整体上看是一样的，考虑到多了<strong>会计师</strong>这个角色的参与，所以特意在探长 <strong>获取存贷比（<code>divisor</code>）</strong> 逻辑处空出一部分留给会计师让它自由发挥：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdFa?w=706&amp;h=1200" src="https://static.alili.tech/img/bVbfdFa?w=706&amp;h=1200" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>这样做，MobX 执行官也为了在实际行动中向他的警署长官证实该 A计划方案 的确拥有“良好的扩展性”。</blockquote>
<p>解开这层新增的会计师计算逻辑 “面纱”，图示如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdFb?w=800&amp;h=669" src="https://static.alili.tech/img/bVbfdFb?w=800&amp;h=669" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>你会发现历史总是惊人的相似，新增的会计师执行计算任务的逻辑其实 <strong>探长</strong> 执行任务的逻辑是一样的，下图中我特意用 <strong>相同的序号（不同的颜色形状）标示</strong> 出，序号所对应含义如下：</p>
<ol>
<li>设置成 <strong>正在执勤人员</strong>
</li>
<li>开始执行任务</li>
<li>从观察员或会计师那儿获取执行任务所需的数值，并同他们取得联系，</li>
<li>计算任务执行完成后，更新与观察员 O1、观察员 O2 之间的联系；</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVbfdFd?w=704&amp;h=1200" src="https://static.alili.tech/img/bVbfdFd?w=704&amp;h=1200" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>此执行计算任务的逻辑，如果不告诉观察员的话，观察员还以为又来了一名“探长”上级。?</p>
<p>从部署图里我们可以看出会计师具有两面性；</p>
<ol>
<li>对探长而言：会计师和观察员地位差不多，都属于“下级”，都需要将自己的信息及时反馈给探长；</li>
<li>对观察员而言：会计师是属于 “上级”，拥有部分类似探长执行任务权力，只不过其任务类型只能是 <strong>计算类型</strong>的任务，执行任务结束之后，像探长那样和观察员互相关联起来，方便下一次的运算；</li>
</ol>
<p>自从有了会计师的参与，探长还是那个探长，但他的下级已经不是之前的下级了。借助 A计划任务的执行，会计师 C1 在上报计算值的时候，会顺水推舟地执行计算任务，同时更新他的 ”<strong>关系网</strong>“。</p>
<h3 id="articleHeader4">2.2、 懒惰的会计师</h3>
<p>会计师有一个特性就是<strong>比较懒</strong>：就算观察员所观察到的值变更了，他们也不会立即重新计算，而只在必要的时候（比如<strong>当上级前来索取时</strong>）才会重新计算。</p>
<p>举个例子，当观察员 O1 发现张三的账户存款从原来的 3 变成 6 ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bankUser.income = 6;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">bankUser.income = <span class="hljs-number">6</span>;</code></pre>
<p>这个时候会触发一系列的 “涟漪”：</p>
<ul>
<li>① 观察员 O1 先注册事务，相当于到数据情报室”上班打卡“，声明这次事件由 观察员 O1 主导</li>
<li>② 告知其上级，也就是会计师 C1 ，说是张三存款（<code>income</code>）有变更</li>
<li>③  会计师 C1 获知消息后，”慵懒地“调整自己的状态</li>
<li>④  随后会计师 C1 继续往上级汇报，告知本会计师的值有更改（注意，此时<strong>会计师只是告诉上级自己的值有更改这一事实，但并没有执行计算任务</strong> ！）</li>
<li>⑤  探长 R1 接收到会计师的反馈后，就向 MobX 执行官申请要执行任务！因为其下级会计师 C1 汇报说值有更改，说明这个时候应该要重新执行任务啦~</li>
<li>⑥  执行官 MobX 调阅数据情报室信息一看，发现目前观察员 O1 正在执行事务，就让探长 R1 再等等，现在不是执行任务的最佳时机，等到事务结束再说。</li>
<li>⑦  不一会儿观察员 O1 完成了自己的职责，”下班打卡“，在数据情报室中注销事务</li>
<li>⑧  这个时候，执行官 MobX 才让探长 R1 开始执行任务</li>
</ul>
<p>将上面的文字转换成流程图，可以清晰看到各角色在这次“涟漪”中所起到的作用：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdFf?w=800&amp;h=688" src="https://static.alili.tech/img/bVbfdFf?w=800&amp;h=688" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这里需要注意 3 点：</p>
<ol>
<li>当观察员O1 汇报张三存款有更改的时候，会计师 C1 并没有立即重新计算值哦，仅仅是更改自身的状态；</li>
<li>会计师告知上级（探长 R1）自己有值更改，探长申请执行任务，不过 MobX 执行官并没有允许他这么做，而是让他先等待一下，因为此时 <strong>观察员 O1</strong> 还在汇报工作。等观察员 O1 工作汇报完毕，这个时候才让探长执行任务。因为有可能有其他计算组职员也正在响应该观察值的更改，事情一件一件来，不要着急，这和 debounce 思想一致，减少不必要的计算。</li>
<li>只有在最后探长执行任务时 <strong>需要用到会计师的值的时候，会计师才会去执行计算操作</strong>。这就是典型的惰性求值思维。</li>
</ol>
<p>会计师这种拖延到 <strong>只有被需要的时候才进行计算</strong> 的行为，有没有让你回忆起学生时代寒假结束前一天疯狂补作业的场景？?</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdFj?w=400&amp;h=297" src="https://static.alili.tech/img/bVbfdFj?w=400&amp;h=297" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">2.3、避免不必要的计算</h3>
<p>当执行官 MobX 拿着这份执行报告送达给你（警署最高长官），阅览完毕：”不错，这套方案的确部分证实了你之前所言的可扩展性。但随着职员的引入，运转机构逐渐庞大，如何避免不必要的开销的呢？“</p>
<p>”长官您高瞻远瞩，这的确是一个问题。在井然有序的规则下，个别职员的运作效率的确会打折扣。因此避免职员不必要的计算开销，也是在我方案部署规划之内。正如您所见，上述方案中会计师的‘惰性’、探员在事务之后再进行任务等机制，都是基于优化性能所采取的措施。“ 执行官 MobX 稍作停顿，继续道，”为了更好地阐述这套运行方案的性能优化机制，我明天呈上一份报告，好让您得以全面了解。“</p>
<p>”Good Job！期待你的报告“。 </p>
<p>那么，执行官 MobX 是凭借什么机制减少开销的呢？且听下回分解。<br>（本节完，未完待续）</p>
<h1 id="articleHeader6">B. Source Code Time</h1>
<p>本节部分，仍然是就着上面的”故事“来讲 MobX 中的源码。</p>
<p>先罗列本文故事中新出现的 <strong>会计师</strong> 角色与 MobX 源码概念映射关系：</p>
<table>
<thead><tr>
<th>故事人物</th>
<th>MobX 源码</th>
<th>解释</th>
</tr></thead>
<tbody><tr>
<td>会计师</td>
<td><a href="https://github.com/mobxjs/mobx/blob/master/src/core/computedvalue.ts" rel="nofollow noreferrer" target="_blank">computedvalue</a></td>
<td>官方文档 - <a href="http://cn.mobx.js.org/refguide/computed-decorator.html" rel="nofollow noreferrer" target="_blank">(@)computed 计算值</a>
</td>
</tr></tbody>
</table>
<blockquote>探长、执行官等角色的映射关系，参考上一篇《<a href="https://segmentfault.com/a/1190000013682735">【用故事解读 MobX源码（一）】 autorun</a>》</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVbfdFn?w=800&amp;h=312" src="https://static.alili.tech/img/bVbfdFn?w=800&amp;h=312" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>本文的重点内容就是 <a href="https://github.com/mobxjs/mobx/blob/master/src/core/computedvalue.ts" rel="nofollow noreferrer" target="_blank">computedvalue</a> 的部分源码（它在 <code>autorun</code> 等场景中的应用）</p>
<p><code>autorun</code>（A 计划）的源码在上一节讲过，这里不再赘述。我们仅仅讲解一下 <strong>computedValue</strong> 在 <code>autorun</code> 中的表现。</p>
<h2 id="articleHeader7">1、会计师，请开始你的表演</h2>
<p>在故事中我们讲到过，当探长向会计师索要计算值的时候，此时懒惰的会计师为了 ”应付交差“，这时候才开始计算，其计算的过程和探长执行的任务流程几乎一致。</p>
<p>从源码角度去看一下其中的原因。</p>
<p>当探长执行任务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="() => {
  console.log('张三的贷款：', bankUser.debit, '；张三的存贷比: ' + divisor);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">() =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三的贷款：'</span>, bankUser.debit, <span class="hljs-string">'；张三的存贷比: '</span> + divisor);
}</code></pre>
<p>任务中也涉及 <code>bankUser.debit</code> 变量和 <code>divisor</code> 变量；其中在获取 <code>bankUser.debit</code> 变量之时会让观察员 O2 触发 <code>reportObserved</code>方法，这个上一篇文章着重讲过，此处就不详细展开了；而请求 <code>divisor</code> 数值的时候，则会触发该值的 <code>valueOf()</code> 方法 —— 即调用会计师（<strong>computedValue</strong>）的 <code>valueOf()</code> 方法。</p>
<p>为什么调用就触发 <code>valueOf()</code> 方法呢？请看下方的“知识点”备注?</p>
<blockquote>======== 插播知识点 =========<p>任何原始值还是对象其实都包含 <code>valueOf()</code> 或 <code>toString()</code> 方法，<code>valueOf()</code> 会返回最适合该对象类型的原始值，<code>toString()</code> 将该对象的原始值以字符串形式返回。<br>这两个方法一般是交由 JS 去隐式调用，以满足不同的运算情况。比如在数值运算（如<code>a + b</code>）里会优先调用 <code>valueOf()</code>，而在字符串运算（如alert(<code>c</code>)）里，会优先调用 <code>toString()</code> 方法<br>顺带附上两篇 参考文章</p>
</blockquote>
<ul>
<li>
<a href="https://www.zhihu.com/question/24262399" rel="nofollow noreferrer" target="_blank">js中 toString 和 valueOf 的区别？</a>：知乎问答</li>
<li>
<a href="https://stackoverflow.com/questions/2485632/valueof-vs-tostring-in-javascript" rel="nofollow noreferrer" target="_blank">valueOf() vs. toString() in Javascript</a>：SF 上的回答，非常详尽地告诉你其执行结果</li>
</ul>
<blockquote>======== 完毕 ==========</blockquote>
<p>一旦调用调用会计师的 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/computedvalue.ts#L283" rel="nofollow noreferrer" target="_blank">valueOf</a> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="valueOf(): T {
    return toPrimitive(this.get())
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">valueOf(): T {
    <span class="hljs-keyword">return</span> toPrimitive(<span class="hljs-keyword">this</span>.get())
}</code></pre>
<p>其实就是调用 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/computedvalue.ts#L142" rel="nofollow noreferrer" target="_blank">this.get()</a> 方法，我们瞧一眼源码；</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdFs?w=800&amp;h=385" src="https://static.alili.tech/img/bVbfdFs?w=800&amp;h=385" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">1.1、 <strong>重量级计算</strong> 还是 <strong>轻量级</strong> 计算？</h3>
<p>这里有个分叉点，根据 <code>globalState.inBatch</code> 决定到底是启用 <strong>重量级计算</strong> 还是 <strong>轻量级计算</strong>：</p>
<ul>
<li>当 <code>globalState.inBatch</code> 值大于 <strong>0</strong>，说明会计师被上级征调（处于上级事务中），比如此案例中，陷于 A 计划（<code>autorun </code>）的会计师，在上级探长 R1 需要查阅计算值时候，就会进入<strong>重量级计算</strong>模式</li>
<li>当会计师无上级征调的时候，<code>globalState.inBatch</code> 值为 <strong>0</strong>，就会进入<strong>轻量级计算</strong>模式，简化计算的逻辑。</li>
</ul>
<p>但无论轻量级还是重量级计算，都会涉及到调用 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/computedvalue.ts#L209" rel="nofollow noreferrer" target="_blank">computeValue()</a> 方法来执行计算任务。</p>
<p>调用的时候，如果是 <strong>重量级计算</strong> 则 <code>track</code> 这个 bool 值为 <strong>true</strong>，否则<code>track</code> 值为 <strong>false</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdFv?w=800&amp;h=327" src="https://static.alili.tech/img/bVbfdFv?w=800&amp;h=327" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>计算值有个属性，<code>this.derivation</code> 就是会计师要计算数值时所依据的<strong>计算表达式</strong>，也就是而我们定义会计师时所传入的匿名函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="() => {
  return bankUser.income / bankUser.debit;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">() =&gt; {
  <span class="hljs-keyword">return</span> bankUser.income / bankUser.debit;
}</code></pre>
<p>无论是 <strong>重量级计算</strong> 模式还是 <strong>轻量级计算</strong> 模式，<strong>最终都是会调用该计算表达式获取计算值</strong>。</p>
<p><strong>重量级计算</strong> 模式和 <strong>轻量级计算</strong> 模式两者的差别只是在于前者在执行该计算表达式之前会设置很多环境，后者直接就按这个表达式计算数值返回。</p>
<p>在上述的故事中，由于探长 R1 人物的存在，会计师会执行 <strong>重量级计算</strong> 模式，接下来的源码分析也走这条分支路线。（ <strong>轻量级计算</strong> 模式的情况当做课后思考题）。</p>
<h3 id="articleHeader9">1.2、像探长学习</h3>
<p>在 <strong>重量级计算</strong>的时候，<code>computeValue(true)</code> 就会走和  <strong>探长</strong> 操作模式一样 <code>trackDerivedFunction</code> 步骤。没错，探长和会计师调用的就是同一个方法，所以他们在执行任务的时候，行为痕迹是一样的，没毛病。</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdFw?w=800&amp;h=327" src="https://static.alili.tech/img/bVbfdFw?w=800&amp;h=327" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote>如果忘记 <code>trackDerivedFunction</code> 方法内容，请查看 《【用故事解读 MobX源码（一）】 autorun》的 ”2.2.2、trackDerivedFunction“ 部分</blockquote>
<p>只不过会计师<strong>只能执行计算类的任务</strong>（纯函数）罢了，探长可以执行任意类型的任务。</p>
<p>和探长一样，会计师执行计算任务完毕之后调用 <code>bindDependencies</code> 将绑定 观察员 O1 和 观察员 O2 ；而在执行计算之后，会计师会调用 <code>propagateChangeConfirmed</code> 方法，更改自己和上级 <strong>探长</strong> 的状态 —— 这说明，对探长而言，会计师就相当于 <strong>观察员</strong>的角色，在探长执行任务结束后像观察员一样需要上报自己的计算值，并和 <strong>探长</strong> 取得联系；</p>
<p>这么看会计师还真 ”墙头草，两边倒”。</p>
<p>至此，会计师这个角色以较低的成本就能完美地整合进执行官 MobX 所部署的 A 集合部署方案中。??</p>
<h2 id="articleHeader10">2、 响应观察值的变化</h2>
<p>一旦张三的账户存款（<code>income</code>）发生变化，将会触发 MobX 所提供的 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/atom.ts#L52" rel="nofollow noreferrer" target="_blank">reportChanged</a> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  public reportChanged() {
      startBatch()
      propagateChanged(this)
      endBatch()
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  public reportChanged() {
      startBatch()
      propagateChanged(<span class="hljs-keyword">this</span>)
      endBatch()
  }</code></pre>
<blockquote>注意这里的 <code>startBatch</code> 和 <code>endBatch</code> 方法，说明观察员 O1 发起事务了。</blockquote>
<h3 id="articleHeader11">2.1、传递变化的信息</h3>
<p>我们知道（不知道的请阅读上一篇文章）该 <code>reportChanged()</code> 方法中的 <code>propagateChanged()</code> 会触发上级的 <code>onBecomeStale()</code> 方法。</p>
<p>观察员 O1 此时的上级是 <strong>会计师 C1</strong>，其所定义的 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/computedvalue.ts#L130" rel="nofollow noreferrer" target="_blank">onBecomeStale</a> 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onBecomeStale() {
    propagateMaybeChanged(this)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">onBecomeStale() {
    propagateMaybeChanged(<span class="hljs-keyword">this</span>)
}</code></pre>
<p>看一下 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/observable.ts#L238" rel="nofollow noreferrer" target="_blank">propagateMaybeChanged(this)</a> 源码，也比较简单，主要做了两件事情，① 会计师会调整自身的状态； ②然后触发其上级（探长 R1）的 <code>onBecomeStale()</code> 方法。</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdFE?w=800&amp;h=347" src="https://static.alili.tech/img/bVbfdFE?w=800&amp;h=347" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>可见观察员 01 会引起会计师 C1 的响应，而会计师会引起探长 R1 的响应，这种响应“涟漪”就是通过下级触发上级的 <code>onBecomeStale</code> 方法形成的连锁反应。</p>
<blockquote>不同上级（比如会计师和探长）的 <code>onBecomeStale</code> 定义不同。</blockquote>
<p>探长的这个 <code>onBecomeStale</code> 方法在上一篇文章的 “3、响应观察值的变化 - propagateChanged”  中我们讲过，探长将请求 MobX 请求重新执行一遍 A 计划方案。</p>
<p>然而，MobX 拒绝了这次请求，让他再等待一下。??</p>
<p>这是因为在 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/reaction.ts#L198" rel="nofollow noreferrer" target="_blank">runReactions</a> 方法中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (globalState.inBatch > 0 || globalState.isRunningReactions) return" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (globalState.inBatch &gt; <span class="hljs-number">0</span> || globalState.isRunningReactions) <span class="hljs-keyword">return</span></code></pre>
<p>由于此时 <code>inBatch</code> 是 1（因为观察员执行了 <code>startBatch()</code>），所以会直接 return 掉。</p>
<p>直到观察员执行 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/observable.ts#L126" rel="nofollow noreferrer" target="_blank">endBatch()</a> 的时候，除了会结束本次的上报事务，同时执行官 MobX 会重新执行 <code>runReactions</code> 方法，让久等的探长去执行任务：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014238855?w=1286&amp;h=326" src="https://static.alili.tech/img/remote/1460000014238855?w=1286&amp;h=326" alt="endBatch" title="endBatch" style="cursor: pointer; display: inline;"></span></p>
<p>探长在执行任务的时候，就会打印张三的贷款（<code>debit</code>）、存贷比（<code>divisor</code>）了。</p>
<h3 id="articleHeader12">2.2、虽然懒，但是懒得有技巧</h3>
<p>综上，当张三存款（<code>income</code>）变更，就能让 A 计划（<code>autorun</code>）自动运行，探长会打印张三的贷款（<code>debit</code>）、存贷比（<code>divisor</code>）。</p>
<p>这里需要提及一下，关于会计师重新计算的时机，是在探长执行 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/derivation.ts#L76" rel="nofollow noreferrer" target="_blank">shouldCompute</a> 的时候，探长发现会计师值 <strong>陈旧</strong> 了，就让会计师重新计算：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdFK?w=800&amp;h=457" src="https://static.alili.tech/img/bVbfdFK?w=800&amp;h=457" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>看看这里，对计算值而言，<code>isComputedValue()</code>（如果是计算值）返回 true，就会执行 <code>obj.get()</code> 方法，这个方法刚才刚讲过，会让会计师执行 <strong>重量型计算操作</strong>，更新自己的计算值。</p>
<p>所以，<strong>这次计算时机并非等到探长执行任务时（真正用到该值）的时候才让其重新计算，和第一次 <code>autorun</code> 的时机不一致</strong>。</p>
<p>估计这是 MobX 考虑到会计师的值肯定需要更新的（已经确定要被探长 R1 用到），还有可能会被其他上级引用，既然迟早要更新的，那就尽可能将更新前置，这样在整体上能降低成本。</p>
<p>更新完之后，在探长执行任务的时候，会计师汇报自己是最新的值了，就不用再重新计算一遍。</p>
<p>虽然懒，但是懒得有技巧。</p>
<p>至此，有关会计师的源码解读已经差不多，后续有想到的再补充。</p>
<h2 id="articleHeader13">3、其他说明</h2>
<p>本文为了方便说明，所以单独使用 <code>mobx.computed</code> 方法定义计算值，平时使用中更多则是直接应用在 <strong>对象中属性</strong> 上，使用 <strong>get</strong> 语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bankUser = mobx.observable({
  income: 3,
  debit: 2,
  get divisor() {
    return this.income / this.debit;
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bankUser = mobx.observable({
  <span class="hljs-attr">income</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">debit</span>: <span class="hljs-number">2</span>,
  get divisor() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.income / <span class="hljs-keyword">this</span>.debit;
  }
});</code></pre>
<p>这仅仅是写法上不一样，源码分析的思路是一致的。</p>
<h2 id="articleHeader14">4、小测试</h2>
<h3 id="articleHeader15">4.1、测试1</h3>
<p><strong>问题</strong>：当我们更改张三贷款数额 <code>bankUser.debit = 4;</code> 时，请从源码角度解答 MobX 的执行流程是如何的？</p>
<p><strong>参考答案提示</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="reportChanged() 
    => propagateChanged() 
    => propagateMaybeChanged() 
    => runReaction() 
    => track() 
    => get() 
    => computeValue() 
    => bindDependencies()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">reportChanged() 
    =&gt; propagateChanged() 
    =&gt; propagateMaybeChanged() 
    =&gt; runReaction() 
    =&gt; track() 
    =&gt; get() 
    =&gt; computeValue() 
    =&gt; bindDependencies()</code></pre>
<h3 id="articleHeader16">4.2、测试2</h3>
<p><strong>问题</strong>：如果不存在 <code>autorun</code> （即没有探长参与，仅有观察员和会计师），此时仅改变张三存款数值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bankUser = mobx.observable({
  income: 3,
  debit: 2
});

var divisor = mobx.computed(() => {
  return bankUser.income / bankUser.debit;
});

bankUser.income = 6; // 请问此时的执行情况是什么样的？

console.log('张三的存贷比：', divisor)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bankUser = mobx.observable({
  <span class="hljs-attr">income</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">debit</span>: <span class="hljs-number">2</span>
});

<span class="hljs-keyword">var</span> divisor = mobx.computed(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> bankUser.income / bankUser.debit;
});

bankUser.income = <span class="hljs-number">6</span>; <span class="hljs-comment">// 请问此时的执行情况是什么样的？</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三的存贷比：'</span>, divisor)
</code></pre>
<p>请问会计师会重新计算数值么？此时这套系统的执行情况又会是怎么样的呢？</p>
<p><strong>参考答案提示</strong>：会计师此时执行 <strong>轻量级计算模式</strong>。</p>
<h2 id="articleHeader17">5、小结</h2>
<p>此篇文章讲解 MobX 中 <strong>计算值</strong> （computedValue） 的概念，类比故事中的会计师角色。总结一下 <strong>计算值</strong> （computedValue）的特征：</p>
<ol>
<li>计算值是基于现有状态或其他计算值衍生出的数值，一般是通过 <strong>纯函数</strong> 的方式衍生而得。</li>
<li>一旦观察值更改之后，计算值是能够重新执行计算，不过并非立即执行，而是 <strong>惰性</strong> 的 ———— 只有在必要的时候才会执行计算。</li>
<li>对观察值而言，计算值和 <code>autorun</code>（或<code>reaction</code>） 很像，之所以相似是在 <strong>执行任务</strong> 时都涉及到调用 <code>trackDerivedFunction</code> 方法；而对 <code>autorun</code>（或<code>reaction</code>）而言，计算值和观察值很相，都是数据提供者。</li>
</ol>
<p>正如 <a href="http://cn.mobx.js.org/refguide/computed-decorator.html" rel="nofollow noreferrer" target="_blank">官方文档</a> 而言，计算值是高度优化过的，所以尽可能应用他们。</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdFR?w=800&amp;h=421" src="https://static.alili.tech/img/bVbfdFR?w=800&amp;h=421" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>下一篇文章将探讨 MobX 中与 <code>autorun</code> 和 <code>computed</code> 相关的计算性能优化的机制，看看 MobX 如何平衡复杂场景下状态管理时的效率和性能。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【用故事解读 MobX源码（二）】 computed

## 原文链接
[https://segmentfault.com/a/1190000014238836](https://segmentfault.com/a/1190000014238836)

