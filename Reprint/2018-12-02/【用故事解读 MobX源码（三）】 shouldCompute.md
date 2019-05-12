---
title: '【用故事解读 MobX源码（三）】 shouldCompute' 
date: 2018-12-02 2:30:15
hidden: true
slug: m2901nt2uq
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
<strong>文章编排</strong>：每篇文章分成两大段，第一大段以简单的侦探系列故事的形式讲解（<strong>所涉及人物、场景都以 MobX 中的概念为原型创建</strong>），第二大段则是源码讲解。</li>
<li><strong>本文基于 MobX 4 源码讲解</strong></li>
</ul>
<p><strong>=======================================</strong></p>
<h1 id="articleHeader0">A. Story Time</h1>
<p>宁静的早上，执行官 MobX 将自己的计算性能优化机制报告呈现给警署最高长官。</p>
<p>在这份报告解说中，谈及部署成本最高的地方是在<strong>执行任务部分</strong>。因此优化这部分任务执行机制，也就相当于优化性能。</p>
<p>警署最高长官浏览了报告前言部分，大致总结以下 2 点核心思想：</p>
<ul><li>有<strong>两组人</strong>会涉及到任务的执行：<strong>执行组</strong>（探长） 和 <strong>计算组</strong>（会计师）</li></ul>
<blockquote>言外之意，<strong>观察组</strong>（观察员）不在优化机制里，他们的行为仍旧按部就班，该汇报的时候就汇报，该提供数据的时候提供数据。</blockquote>
<ul><li>由于<strong>执行任务的比较消耗资源</strong>，因此执行人员对每一次任务的执行都要问一个”为什么“，最核心的一点是：如果下级人员的<strong>数据不是最新</strong>的时候，上级人员就不应该执行任务。</li></ul>
<p><span class="img-wrap"><img data-src="/img/bVbfdF1?w=549&amp;h=511" src="https://static.alili.tech/img/bVbfdF1?w=549&amp;h=511" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>那么，执行人员依据什么样的规则来决定是否执行呢？</p>
<p>警署最高长官继续往下阅读，找到了解答该问题的详细解说。简言之，为了解决该问题执行官 MobX 给出了<strong>状态调整策略</strong>，并在这套策略之上指定的<strong>任务执行规则</strong>。</p>
<p>由于专业性较强，行文解释里多处使用代码。为了更生动形象地解释这套行为规范，执行官 MobX 在报告里采用 <strong>示例 + 图示</strong> 的方式给出生动形象的解释。</p>
<p>接下来我们在 <strong>B. Source Code Time</strong> 部分详细阐述这份 <strong>任务执行规则</strong> 的内容。</p>
<h1 id="articleHeader1">B. Source Code Time</h1>
<p>执行人员（探长和会计师）依据什么样的规则来决定是否执行呢？</p>
<p>答案是，执行官 MobX 提供了一个名为 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/derivation.ts#L76" rel="nofollow noreferrer" target="_blank">shouldCompute</a> 的方法，每次执行人员（探长和会计师）需要执行之前都要调用该方法 —— 只有该方法返回 <code>true</code> 的时候才会执行任务（或计算）。</p>
<blockquote>在源码里搜索一下关键字 <code>shouldCompute</code>，就可以知道的确只有 <strong>derivation</strong>（执行组，探长也属于执行组）、<strong>reaction</strong>（探长）、<strong>computeValue</strong>（会计师）这些有执行权力的人才能调用这个方法，而 <strong>observerable</strong>（观察员）并不在其中。<br><span class="img-wrap"><img data-src="/img/bVbfdF5?w=267&amp;h=400" src="https://static.alili.tech/img/bVbfdF5?w=267&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>
</blockquote>
<p>也就说 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/derivation.ts#L76" rel="nofollow noreferrer" target="_blank">shouldCompute</a> 就是<strong>任务执行规则</strong>，<strong>任务执行规则</strong>就是 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/derivation.ts#L76" rel="nofollow noreferrer" target="_blank">shouldCompute</a>。而背后支撑 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/derivation.ts#L76" rel="nofollow noreferrer" target="_blank">shouldCompute</a> 的则是一套 <strong>状态调整策略</strong></p>
<h2 id="articleHeader2">1、状态调整策略</h2>
<h3 id="articleHeader3">1.1、<strong>L 属性</strong> 和 <strong>D 属性</strong>
</h3>
<p>翻开 <code>shouldCompute</code> 源码， 将会看到 <code>dependenciesState</code> 属性。</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdGa?w=600&amp;h=211" src="https://static.alili.tech/img/bVbfdGa?w=600&amp;h=211" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>其实这个 <code>dependenciesState</code>（以下简称 <strong>D 属性</strong>） 属性还存在一个”孪生“属性<code>lowestObserverState</code> （以下简称 <strong>L 属性</strong>）。这两个属性正是执行官 MobX 状态调整策略的核心。</p>
<p><strong>L 属性</strong> 和 <strong>D 属性</strong>反映当前对象<strong>所处的状态</strong>， 都是枚举值，且取值区间都是一致的，只能是以下 4 个值之一：</p>
<ul>
<li>
<strong>-1</strong>： 即 <strong>NOT_TRACKING</strong>，表示不在调整环节内（还未进入调整调整，或者已经退出调整环节）</li>
<li>
<strong>0</strong>：即 <strong>UP_TO_DATE</strong>，表示状态很稳定</li>
<li>
<strong>1</strong>： 即 <strong>POSSIBLY_STALE</strong>，表示状态有可能不稳定</li>
<li>
<strong>2</strong>：即 <strong>STALE</strong>，表示状态不稳定</li>
</ul>
<p>上面的文字表述比较枯燥，我们来张图感受一下：</p>
<p><span class="img-wrap"><img data-src="/img/bVbfdGm?w=400&amp;h=142" src="https://static.alili.tech/img/bVbfdGm?w=400&amp;h=142" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们以 “阶梯” 来表示上述的状态值；</p>
<ul>
<li>
<strong>UP_TO_DATE</strong>（0） 是地面（表示“非常稳定”）</li>
<li>
<strong>POSSIBLY_STALE</strong>（1） 是第一个台阶</li>
<li>
<strong>STALE</strong>（2） 是第 2 个台阶，</li>
<li>
<strong>NOT_TRACKING</strong>（-1）则到地下一层去了</li>
<li>所谓 “高处不胜寒”，<strong>距离地面越高，就代表越不稳定</strong>。</li>
<li>状态值 <strong>UP_TO_DATE</strong>（0）代表的含义是 <strong>稳定的状态</strong>，是每个对象所倾向的状态值。</li>
</ul>
<h3 id="articleHeader4">1.2、调整策略</h3>
<p>依托<strong>L 属性</strong> 和 <strong>D 属性</strong>，执行官 MobX 的调整策略应运而生：</p>
<ul>
<li>只有在 <strong>观察值发生变化</strong> 的时候（比如修改了 <code>bankUser.income</code> 属性值），才会启用这套机制；</li>
<li>
<p>下级成员拥有 <strong>L 属性</strong>；而上级成员拥有 <strong>D 属性</strong>，比如：</p>
<ul>
<li>观察员 O1 只拥有 <strong>L 属性</strong>
</li>
<li>探长 R1 只拥有 <strong>D 属性</strong>
</li>
<li>会计师 C1 既拥有 <strong>L 属性</strong>，也拥有 <strong>D 属性</strong>
</li>
</ul>
</li>
<li>某下级成员调整属性时，调整的策略必须要满足：自身的 <strong>D 属性</strong> 永远不大于（≤）上级的 <strong>L 属性</strong>
</li>
<li>某上级成员调整属性时，调整的策略必须要满足：其下级成员的 <strong>D 属性</strong> 永远不大于（≤）自身的 <strong>L 属性</strong>
</li>
<li>观察值的变更会让成员的属性值 <strong>上升</strong>（提高不稳定性），MobX 执行任务会让成员属性值 <strong>降低</strong>（不稳定性降低）；</li>
</ul>
<p>上述调整策略给我们的直观感受，<strong>就是外界的影响导致 MobX 执行官的部署系统不稳定性上升，为了消除这些不稳定，MobX 会尽可能协调各方去执行任务，从而消除这些个不稳定性</strong>。<br>（举个不甚恰当的例子，参考人类的免疫机制，病毒感冒后体温上升就是典型的免疫机制激活的外在表现，抵御完病毒之后体温又回归正常）</p>
<h2 id="articleHeader5">2、执行任务规则</h2>
<p>我们知道，只有上级成员（探长或者设计师）才有执行任务的权力；而一旦满足上面的调整策略，<strong>在任何时刻</strong>，执行官 MobX 直接查阅该上级成员的 <strong>D 属性</strong> 就能断定该上级成员（探长或者设计师）是否需要执行任务了，非常简单方便。</p>
<p>执行官 MobX 判断的依据都体现在 <a href="https://github.com/mobxjs/mobx/blob/4.1.0/src/core/derivation.ts#L76" rel="nofollow noreferrer" target="_blank">shouldCompute</a> 方法中了。</p>
<blockquote>本人窃认为这个 <code>shouldCompute</code> 函数的名字太过于抽象，如果让我命名的话，我更倾向于使用 <code>shouldExecuteTask</code> 这个单词。</blockquote>
<p>依托<strong>L 属性</strong> 和 <strong>D 属性</strong>，执行任务规则（即 <code>shouldCompute</code>）就出炉了：</p>
<ul>
<li>如果属性值为 <strong>NOT_TRACKING</strong>（-1）或者 <strong>STALE</strong>（2），说明自己所依赖的下级数值陈旧了，是时候该重新执行任务（或重新计算）了；</li>
<li>如果属性值为 <strong>UP_TO_DATE</strong>（0），说明所依赖的下级的数值没有更改，是稳定的，不需要重新执行任务。</li>
<li>如果属性值为 <strong>POSSIBLY_STALE</strong>（1），说明所依赖的值（一定是计算值，只有计算值的参与才会出现这种状态）有可能变更，需要让下级先确认完后再做进一步判断。这种情况可能不太好理解，后文会详细说明。</li>
</ul>
<p>执行任务规则看上去比较简单，但应用到执行官 MobX 自动化部署方案中情况就复杂了。下面将通过 3 个场景，从简单到复杂，一步一步来演示<strong>L 属性</strong>和<strong>D 属性</strong> 是如何巧妙地融合到已有的部署方案中，并以最小的成本实现性能优化的。</p>
<h3 id="articleHeader6">2.1、最简单的情况</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bankUser = mobx.observable({
  income: 3,
  debit: 2
});

mobx.autorun(() => {
  console.log('张三的存贷：', income);
});

bankUser.income = 4;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bankUser = mobx.observable({
  <span class="hljs-attr">income</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">debit</span>: <span class="hljs-number">2</span>
});

mobx.autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三的存贷：'</span>, income);
});

bankUser.income = <span class="hljs-number">4</span>;</code></pre>
<p>这里我们创建了 <code>autorun</code> 实例 （探长 R1）、<code>observable</code>实例（观察员O1）</p>
<p>这个示例和我们之前在首篇文章《<a href="https://segmentfault.com/a/1190000013682735">【用故事解读 MobX源码（一）】 autorun</a>》中所用示例是一致的。</p>
<p>当执行 <code>bankUser.income = 4;</code> 语句的时候，观察员 O1 观察到的数值变化直接上报给探长 R1，然后探长就执行任务了。关系简单：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014726492?w=331&amp;h=198" src="https://static.alili.tech/img/remote/1460000014726492?w=331&amp;h=198" alt="upstream" title="upstream" style="cursor: pointer; display: inline;"></span></p>
<p>从代码层面上来讲，该 <strong>响应链</strong> 上的关键函数执行顺序如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(O1) reportChange 
    -> (O1) propagateChanged 
    -> (R1) onBecomeStale 
      -> (R1) trackDerivedFunction 
         -> fn(即执行 autorun 中的回调) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(O1) reportChange 
    -&gt; (O1) propagateChanged 
    -&gt; (R1) onBecomeStale 
      -&gt; (R1) trackDerivedFunction 
         -&gt; fn(即执行 autorun 中的回调) </code></pre>
<p>其中涉及到 <strong>L、D属性</strong> 更改的函数有 <code>propagateChanged</code> 和 <code>track</code> 这两个。</p>
<p><strong>Step 1</strong>：在 <a href="https://github.com/mobxjs/mobx/blob/4.1.0/src/core/observable.ts#L197" rel="nofollow noreferrer" target="_blank">propagateChanged</a> 方法执行时，让观察员 O1 的 <strong>L 属性</strong> 从 0 → 2 ，按照上述的调整原则，探长 R1 的 <strong>D属性</strong> 必须要高于观察员 O1 的 <strong>L 属性</strong>，所以其值也只能用从 0 → 2。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014726493?w=829&amp;h=378" src="https://static.alili.tech/img/remote/1460000014726493?w=829&amp;h=378" alt="pagechagned" title="pagechagned" style="cursor: pointer;"></span></p>
<p><strong>Step 2</strong>：而随着 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/derivation.ts#L144" rel="nofollow noreferrer" target="_blank">trackDerivedFunction</a> 方法的执行（即探长执行任务）后，观察员 O1 的 <strong>L 属性</strong> 又从 2 → 0，同时也让探长 R1 的 <strong>D属性</strong> 从 2 → 0；</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014726494?w=826&amp;h=376" src="https://static.alili.tech/img/remote/1460000014726494?w=826&amp;h=376" alt="track" title="track" style="cursor: pointer;"></span></p>
<p>在这里我们已经可以明显感受到 <strong>非稳态的上升</strong> 和 <strong>削减</strong> 这两个阶段：</p>
<ul>
<li>
<strong>非稳态的上升</strong>：外界更改 <code>bankUser.income</code> 属性，触发 <code>propagateChanged</code> 方法，从而让观察员的 <strong>L 属性</strong> 以及探长的 <strong>D属性</strong> 都变成了 2 ，这是系统趋向不稳定的表现。从 层级上来看，是<strong>自下而上</strong>的过程。</li>
<li>
<strong>非稳态的削减</strong>：随着变更的传递，将触发探长 R1 的 <code>onBecameStale</code> 方法。执行期间 MobX 执行官查阅探长的 <strong>D属性</strong> 是 2，依据 <code>shouldCompute</code> 中的执行规定，同意让探长执行任务。执行完之后，观察员的 <strong>L 属性</strong>、探长的 <strong>D属性</strong> 都下降为 0，表示系统又重新回到稳定状态。从 层级上来看，是<strong>自上而下</strong>的过程。</li>
</ul>
<h3 id="articleHeader7">2.2、有单个会计师的情况</h3>
<p>上面介绍了最简单的情况，只有一个探长 R1（<code>autorun</code>）和一个观察员 O1（<code>income</code>）。</p>
<p>现在我们将环境稍微弄复杂一些，新增一个 <strong>会计师 C1</strong>（<code>divisor</code>） ，此时再来看看上述的变更原则是如何在系统运转时起作用的：</p>
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
  console.log('张三的 divisor：', divisor);
});

bankUser.income = 4;" title="" data-original-title="复制"></span>
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
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三的 divisor：'</span>, divisor);
});

bankUser.income = <span class="hljs-number">4</span>;</code></pre>
<p>这个示例和我们之前在首篇文章《<a href="https://segmentfault.com/a/1190000014238836">【用故事解读 MobX源码（二）】 computed </a>》中所用示例是一致的。</p>
<p>当我们执行 <code>bankUser.income = 4;</code> 语句的时候，观察员 O1 先上报给会计师 C1，接着会计师 C1 会重新执行计算任务后，上报给探长，探长R1 再重新执行任务。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014726495?w=351&amp;h=276" src="https://static.alili.tech/img/remote/1460000014726495?w=351&amp;h=276" alt="c1 upstream" title="c1 upstream" style="cursor: pointer; display: inline;"></span></p>
<p>上面描述起来比较简单，但从代码层面上来讲还是有些绕，先列出该 <strong>响应链</strong> 上的关键函数执行顺序如下（很明显比上面的示例要稍微复杂一些）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(O1) reportChange 
    -> (O1) propagateChanged
      -> (C1) propagateMaybeChanged
      -> (R1) onBecomeStale（这里并不会让探长 `runReaction`）
-> (O1) endBatch
    -> (R1) runReaction（到这里才让探长执行 `runReaction`）
      -> (C1) reportObserved
      -> (C1) shouldCompute
         -> (C1) trackAndCompute 
         -> (C1) propagateChangeConfirmed
      -> (R1) trackDerivedFunction
         -> fn(即执行 autorun 中的回调) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(O1) reportChange 
    -&gt; (O1) propagateChanged
      -&gt; (C1) propagateMaybeChanged
      -&gt; (R1) onBecomeStale（这里并不会让探长 <span class="hljs-string">`runReaction`</span>）
-&gt; (O1) endBatch
    -&gt; (R1) runReaction（到这里才让探长执行 <span class="hljs-string">`runReaction`</span>）
      -&gt; (C1) reportObserved
      -&gt; (C1) shouldCompute
         -&gt; (C1) trackAndCompute 
         -&gt; (C1) propagateChangeConfirmed
      -&gt; (R1) trackDerivedFunction
         -&gt; fn(即执行 autorun 中的回调) </code></pre>
<blockquote>注：这里还需要啰嗦一句，虽然这里会触发探长 R1 的 <code>onBecomeStale</code> 方法，但 MobX 并不会直接让探长执行任务，这也是 MobX 优化的一种手段体现，详细分析请移步《<a href="https://segmentfault.com/a/1190000014238836" target="_blank">【用故事解读 MobX源码（二）】 computed </a>》。</blockquote>
<p><strong>Step 1</strong>：在 <a href="https://github.com/mobxjs/mobx/blob/4.1.0/src/core/observable.ts#L197" rel="nofollow noreferrer" target="_blank">propagateChanged</a> 方法执行时，让观察员 O1 的 <strong>L 属性</strong> 从 -1 → 2 ，按照上述的调整原则，其直接上级 C1 的 <strong>D属性</strong> 必须要高于观察员 O1 的 <strong>L 属性</strong>，所以其值也只能用从 0 → 2；</p>
<p>和上述简单示例中最大的不同，<strong>在于该期间还涉及到会计师 C1 的状态更改</strong>，具体表现就是调用 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/observable.ts#L238" rel="nofollow noreferrer" target="_blank">propagateMaybeChanged</a> ，在该方法执行后让会计师 C1 的 <strong>L 属性</strong> 从 0 → 1 ，其直接上级 R1 的 <strong>D属性</strong> 必须要高于会计师 C1 的 <strong>L 属性</strong>，所以其值也从 0 → 1；</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014726496?w=1220&amp;h=385" src="https://static.alili.tech/img/remote/1460000014726496?w=1220&amp;h=385" alt="maybechanged" title="maybechanged" style="cursor: pointer;"></span></p>
<blockquote>注：虽然观察员 O1 的状态更改 <strong>不能直接</strong> 触发探长 R1 的状态更改，却可以凭借会计师 C1 <strong>间接</strong> 地让 探长 R1 的状态发生更改。</blockquote>
<p><strong>Step 2</strong>：此步骤是以 <strong>会计师</strong> 状态变更为中心演变过程，上一个案例并不存在会计师，所以并不会有该步骤。通过 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/computedvalue.ts#L189" rel="nofollow noreferrer" target="_blank">trackAndCompute</a> 方法，会计师 C1 的 <strong>D 属性</strong> 又从 2 → 0，同时也让观察员 O1 的 <strong>L属性</strong> 从 2 → 0；这个过程表明会计师 C1 的计算值已经更新了。</p>
<p>随后在 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/observable.ts#L218" rel="nofollow noreferrer" target="_blank">propagateChangeConfirmed</a> 中让探长 R1 的 <strong>D 属性</strong> 从 1 （下级数值可能有更新）→ 2 （确定下级数值确定有更新），同时也让会计师 C1 的 <strong>L 属性</strong> 从 1（告知上级自己的值可能有更新）→ 2 （告知上级自己的值的确有更新）；表明探长 R1 和 会计师 C1 的稳态还未达成，需要 <strong>Step 3</strong> 的执行去消除非稳态。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014726497?w=1227&amp;h=379" src="https://static.alili.tech/img/remote/1460000014726497?w=1227&amp;h=379" alt="trackAndCompute" title="trackAndCompute" style="cursor: pointer;"></span></p>
<p><strong>Step 3</strong>：会计师的计算值 C1 更新完毕之后，探长才执行任务。通过 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/derivation.ts#L144" rel="nofollow noreferrer" target="_blank">trackDerivedFunction</a> 方法的执行（即探长执行任务）后，会计师 C1 的 <strong>L 属性</strong> 又从 2 → 0，同时也让探长 R1 的 <strong>D 属性</strong> 从 2 → 0；</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014726498?w=853&amp;h=399" src="https://static.alili.tech/img/remote/1460000014726498?w=853&amp;h=399" alt="track" title="track" style="cursor: pointer;"></span></p>
<p>虽然这个示例中，状态的变更比上面的示例要复杂一些，不过我们依然可以从整体上感受到 <strong>非稳态的上升</strong> 和 <strong>削减</strong> 这两个阶段：</p>
<ul>
<li>
<strong>非稳态的上升</strong>：外界更改 <code>bankUser.income</code> 属性，触发 <code>propagateChanged</code> 方法，从而让观察员 O1 的 <strong>L 属性</strong> 以及会计师 C1 的 <strong>D属性</strong> 都变成了 2 ，同时让会计师 C1 的 <strong>L 属性</strong> 以及探长 R1 的 <strong>D属性</strong> 都变成了 1 。这是系统趋向不稳定的表现。从 层级上来看，是<strong>自下而上</strong>的过程。</li>
<li>
<strong>非稳态的削减</strong>：随着变更的传递，有两次削减非稳态的手段： ① 让会计师 C1 重新计算； ② 让探长执行任务。这两个阶段结束之后，所有成员的属性都下降为 0，表示系统又重新回到稳定状态。从 层级上来看，是<strong>自上而下</strong>的过程。</li>
</ul>
<h3 id="articleHeader8">2.3、有两个会计师的情况</h3>
<p>我们继续在上一个示例上修改，再新增一个计算值 <code>indication</code>（这个变量的创建没有特殊的含义，纯粹是为了做演示），由会计师 C2 了负责其进行计算。</p>
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

var indication = mobx.computed(() => {
  return divisor / (bankUser.income + 1);
});

mobx.autorun(() => {
  console.log('张三的 indication', indication);
});

bankUser.debit = 4;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bankUser = mobx.observable({
  <span class="hljs-attr">income</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">debit</span>: <span class="hljs-number">2</span>
});

<span class="hljs-keyword">var</span> divisor = mobx.computed(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> bankUser.income / bankUser.debit;
});

<span class="hljs-keyword">var</span> indication = mobx.computed(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> divisor / (bankUser.income + <span class="hljs-number">1</span>);
});

mobx.autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三的 indication'</span>, indication);
});

bankUser.debit = <span class="hljs-number">4</span>;</code></pre>
<p>大体成员和之前的示例相差不大，只是这次我们修改 <code>bankUser.debit</code> 变量（前面两个示例都是修改 <code>bankUser.income</code>）。</p>
<p>这么做的目的是为了营造出下述的 <strong>响应链</strong> 结构，我们通过修改 <code>bankUser.debit</code> 变量，从而影响 会计师 C1，继而影响 会计师 C2，最终让探长 R1 执行任务。 </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014726499?w=365&amp;h=305" src="https://static.alili.tech/img/remote/1460000014726499?w=365&amp;h=305" alt="two compute" title="two compute" style="cursor: pointer; display: inline;"></span></p>
<p>同样的，我们从代码层面上来列出该 响应链 上的关键函数执行顺序，比上两个示例都复杂些，大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(O2) reportChange 
    -> (O2) propagateChanged
      -> (C1) propagateMaybeChanged
      -> (C2) propagateMaybeChanged
      -> (R1) onBecomeStale（这里并不会让探长 `runReaction`）
-> (O2) endBatch
    -> (R1) runReaction（到这里才让探长执行 `runReaction`）
      -> (R1) shouldCompute
         -> (C2) shouldCompute
           -> (C1) shouldCompute
           -> (C1) trackAndCompute
           -> (C1) propagateChangeConfirmed
         -> (C2) trackAndCompute
         -> (C2) propagateChangeConfirmed
      -> trackDerivedFunction
         -> fn(即执行 autorun 中的回调) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(O2) reportChange 
    -&gt; (O2) propagateChanged
      -&gt; (C1) propagateMaybeChanged
      -&gt; (C2) propagateMaybeChanged
      -&gt; (R1) onBecomeStale（这里并不会让探长 <span class="hljs-string">`runReaction`</span>）
-&gt; (O2) endBatch
    -&gt; (R1) runReaction（到这里才让探长执行 <span class="hljs-string">`runReaction`</span>）
      -&gt; (R1) shouldCompute
         -&gt; (C2) shouldCompute
           -&gt; (C1) shouldCompute
           -&gt; (C1) trackAndCompute
           -&gt; (C1) propagateChangeConfirmed
         -&gt; (C2) trackAndCompute
         -&gt; (C2) propagateChangeConfirmed
      -&gt; trackDerivedFunction
         -&gt; fn(即执行 autorun 中的回调) </code></pre>
<p><strong>Step 1</strong>：在 <a href="https://github.com/mobxjs/mobx/blob/4.1.0/src/core/observable.ts#L197" rel="nofollow noreferrer" target="_blank">propagateChanged</a> 方法执行时，让观察员 O1 的 <strong>L 属性</strong> 从 0 → 2 ，按照上述的调整原则，其直接上级 C1 的 <strong>D属性</strong> 必须要高于观察员 O1 的 <strong>L 属性</strong>，所以其值也只能用从 0 → 2；</p>
<p><strong>该期间还涉及到会计师 C1、C2 的状态更改</strong>，具体表现就是调用 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/observable.ts#L238" rel="nofollow noreferrer" target="_blank">propagateMaybeChanged</a> ，在该方法执行后让会计师 C1、C2 的 <strong>L 属性</strong> 从 0 → 1 ，他们各自的直接上级 C2、 R1 的 <strong>D属性</strong> 值也从 0 → 1；</p>
<p>描述起来比较复杂，其实无非就是多了一个 会计师 C2 的 <code>propagateMaybeChanged</code> 方法过程，一图胜千言：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014726500?w=1420&amp;h=316" src="https://static.alili.tech/img/remote/1460000014726500?w=1420&amp;h=316" alt="c2 upstream" title="c2 upstream" style="cursor: pointer;"></span></p>
<p><strong>Step 2</strong>：此步骤是以 <strong>会计师</strong> 状态变更为中心演变过程，该步骤是上一个示例中 <strong>Step 2</strong> 的“复数”版，多个人参与就复杂些，不过条理还是清晰明了的。上个示例中只有一个会计师，所以 <strong>trackAndCompute -&gt;propagateChangeConfirmed</strong> 的过程只有一次，而这里有两个会计师，所以这个过程就有两次（下图中两个蓝框）；</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014726501?w=1847&amp;h=378" src="https://static.alili.tech/img/remote/1460000014726501?w=1847&amp;h=378" alt="c2 compute" title="c2 compute" style="cursor: pointer;"></span></p>
<p>经过该步骤之后会计师 O2、C1 的 <strong>L 属性</strong> 又从 2 → 0，同时也让C1、C2 的 <strong>D 属性</strong> 从 2 → 0；这个过程表明观察员 O1 和 会计师 C1 的计算值已经更新，达到稳态。</p>
<p>而 C2 的 <strong>L 属性</strong> 、探长 R1 的 <strong>D 属性</strong> 又从 0 → 2，表明探长 R1 和 会计师 C2 的稳态还未达成，需要 <strong>Step 3</strong> 的执行去消除非稳态。</p>
<p><strong>Step 3</strong>：探长执行任务，通过 <a href="https://github.com/mobxjs/mobx/blob/4.1.1/src/core/derivation.ts#L144" rel="nofollow noreferrer" target="_blank">trackDerivedFunction</a> 方法的执行（即探长执行任务）后，会计师 C2 的 <strong>L 属性</strong> 又从 2 → 0，同时也让探长 R1 的 <strong>D 属性</strong> 从 2 → 0；这一步和上个示例中的 <strong>Step 3</strong> 几乎相同。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014726502?w=670&amp;h=321" src="https://static.alili.tech/img/remote/1460000014726502?w=670&amp;h=321" alt="c2 track" title="c2 track" style="cursor: pointer;"></span></p>
<p>在这个示例中，状态的变更纵使比上面的示例要复杂得多，但我们还是很清晰地从整体上感受到 <strong>非稳态的上升</strong> 和 <strong>削减</strong> 这两个阶段：</p>
<ul>
<li>
<strong>非稳态的上升</strong>：外界更改 <code>bankUser.debit</code> 属性，触发 <code>propagateChanged</code> 方法，从而让观察员 O1 开始，依次影响 会计师 C1、C2，以及探长 R1 的 <strong>L、D 属性</strong>从 0 变成 1 或者 2，这是系统趋向不稳定的表现。从 层级上来看，是<strong>自下而上</strong>的过程。</li>
<li>
<strong>非稳态的削减</strong>：随着变更的传递，有两次削减非稳态的手段： ① 让会计师 C1 、C2 重新计算； ② 让探长 R1 执行任务。这两个阶段结束之后，所有成员的属性都下降为 0，表示系统又重新回到稳定状态。从 层级上来看，是<strong>自上而下</strong>的过程。</li>
</ul>
<h3 id="articleHeader9">2.4、一点点总结</h3>
<p>通过上面三个从简单逐步到复杂的示例，我们简单总结归纳一下 MobX 在处理状态变更过程中所采取执行机制以及其背后的调整策略：</p>
<ul>
<li>
<strong>先是自下而上传递非稳态</strong>：这是一个自下而上的过程，由观察员发起这个过程，在这个过程中依次将外界的变更层层向上传递，改变每个相关成员的 <strong>L、D属性</strong>。 这个期间会拒绝一切成员任务执行的申请（比如探长执行任务、会计师执行计算任务等等）。</li>
<li>
<strong>其次自上而下消解非稳态</strong>：这是一个自上而下的过程。当非稳态到达顶层后，由顶层人员（一般是探长类）开始做决策执行任务，在执行任务中凡是遇到有非稳态的成员（比如会计师、观察员），责令他们更新状态，消除非稳态，逐层逐层地消除非稳态。等整个任务执行完之后，每个成员都处于稳态状态，开始下一个变更的到来。</li>
</ul>
<h2 id="articleHeader10">3、状态图</h2>
<p>在软件设计中，为了更好地显示这种状态变更和事件之间的关系，常常使用 <strong>状态图</strong> 来展现（没错，就是 UML建模中的那个状态图）</p>
<blockquote>如果不太熟悉，这里给个参考文章 <a href="http://www.cnblogs.com/ywqu/archive/2009/12/17/1626043.html" rel="nofollow noreferrer" target="_blank">UML建模之状态图（Statechart Diagram）</a> 方便查阅。</blockquote>
<p>挨个总结上述 3 个案例中 <strong>L、D属性</strong>，我们将其中的事件和属性改变抽离出来，就能获取状态图了，方便我们从另外一个角度理解和体会。</p>
<h3 id="articleHeader11">3.1、L 属性</h3>
<p>Observable（观察员）、ComputeValue（会计师）这两种类型拥有 <strong>L 属性</strong> ：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014726503?w=1376&amp;h=624" src="https://static.alili.tech/img/remote/1460000014726503?w=1376&amp;h=624" alt="L attr" title="L attr" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">3.2、D 属性</h3>
<p>Reaction（探长）、ComputeValue（会计师）这两种类型拥有 <strong>D 属性</strong>：<br><span class="img-wrap"><img data-src="/img/remote/1460000014726504?w=1297&amp;h=608" src="https://static.alili.tech/img/remote/1460000014726504?w=1297&amp;h=608" alt="D attr" title="D attr" style="cursor: pointer;"></span></p>
<blockquote>所以，会计师同时拥有 <strong>L属性</strong> 和 <strong>D 属性</strong>
</blockquote>
<h2 id="articleHeader13">4、小测试</h2>
<p>如果我们将 <strong>2.3、有两个会计师的情况</strong> 示例中的 <code>bankUser.debit = 4;</code> 修改成 <code>bankUser.income = 6;</code> 的话，那各个成员对象的 <strong>D 属性</strong>、<strong>L 属性</strong> 的变化情况又是怎么样的？</p>
<h2 id="articleHeader14">5、本文总结</h2>
<p>如何在复杂的场景下兼顾计算性能？</p>
<p>MobX 提供了 <code>shouldCompute</code> 方法用于直接判断是否执行计算（或任务），判断的依据非常简单，只要根据对象的 <code>dependenciesState</code> 属性是否为 <code>true</code> 就能直接作出判断。</p>
<p>而其背后的支持则是 <code>dependenciesState</code> 属性（上文中的 <strong>D 属性</strong>）和 <code>lowestObserverState</code> （上文中的 <strong>L 属性</strong>），这两个属性依托 MobX 中自动化机制在适当时机（搭”顺风车“）进行变更。因此，<strong>无论多么复杂的场景下 MobX 能以低廉的成本兼顾性能方面的治理，充分运用惰性求值思想减少计算开销</strong>。</p>
<p>初看 MobX 源码，它往往给你一种 ”杂项丛生“的感觉（调试这段代码的时候真是心里苦啊），但其实在这背后运转着一套清晰的 <strong>非稳态传递</strong> 和 <strong>非稳态削减</strong> 的固定模式，一旦掌握这套模式之后，MobX 自动化响应体系的脉络已清晰可见，这将为你更好理解 MobX 的运行机制打下扎实的基础。</p>
<p>到本篇为止，我们已经耗费 3 篇文章来解释 MobX 的（绝大部分）自动化响应机制。经过这 3 篇文章，读者应该对 MobX 的整个运转机制有了一个比较清晰明了的理解。后续的文章中将逐渐缩减”故事“成分，将讲解重心转移到 MobX 本身概念（比如 <code>Observable</code>、<code>decorator</code>、<code>Atom</code>等）源码的解读上，相信有了这三篇文章的作为打底，理解其余部分更多的是在语法层面，阅读起来将更加游刃有余。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【用故事解读 MobX源码（三）】 shouldCompute

## 原文链接
[https://segmentfault.com/a/1190000014726483](https://segmentfault.com/a/1190000014726483)

