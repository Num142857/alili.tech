---
title: '基于CPS变换的尾递归转换算法' 
date: 2019-01-26 2:30:18
hidden: true
slug: ghd59291xh6
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>众所周知，<strong>递归函数容易爆栈</strong>，究其原因，便是函数调用前需要先将参数、运行状态压栈，而<strong>递归则会导致函数的多次无返回调用，参数、状态积压在栈上，最终耗尽栈空间</strong>。</p>
<p>一个解决的办法是从算法上解决，把递归算法改良成只依赖于少数状态的迭代算法，然而此事知易行难，线性递归还容易，树状递归就难以转化了，而且并不是所有递归算法都有非递归实现。</p>
<p>在这里，我介绍一种方法，<strong>利用<code>CPS变换</code>，把任意递归函数改写成尾调用形式，以<code>continuation</code>链的形式，将递归占用的栈空间转移到堆上，避免爆栈的悲剧</strong>。<br><em>需要注意的是，这种方法并不能降低算法的时间复杂度，若是指望此法缩短运行时间无异于白日做梦</em></p>
<p>下文先引入<strong>尾调用、尾递归、<code>CPS</code>等概念</strong>，然后介绍<strong><code>Trampoline</code>技法</strong>，将尾递归转化为循环形式（无尾调用优化语言的必需品），再<strong>以<code>sum</code>、<code>Fibonacci</code>为例子讲解<code>CPS变换</code>过程</strong>（虽然这两个例子可以轻易写成迭代算法，没必要搞这么复杂，但是最为常见好懂，因此拿来做例子，免得说题目都得说半天），最后讲<strong>通用的<code>CPS变换</code>法则</strong></p>
<p>看完这篇文章，大家可以去看看<code>Essentials of Programming Languages</code>相关章节，可以有更深的认识</p>
<p>文中代码皆用<code>JavaScript</code>实现</p>
<h1 id="articleHeader1">尾调用 &amp;&amp; 尾递归</h1>
<p>先来探讨下在什么情况下函数调用才需要保存状态</p>
<p>像<code>Add(1, 2)</code>、<code>MUL(1, 2)</code>这种明显不需要保存状态，</p>
<p>像<code>Add(1, MUL(1, 2))</code>这种呢？计算完<code>MUL(1, 2)</code>后需要返回结果接着计算<code>Add</code>，因此计算<code>MUL</code>前需要保存状态</p>
<p><strong>由此，可以得到一个结论，只有函数调用处于参数位置上，调用后需要返回的函数调用才需要保存状态</strong>，上面的例子中，<code>Add</code>是不需要保存状态，<code>MUL</code>需要保存</p>
<p><strong>尾调用指的就是，无需返回的函数调用，即函数调用不处于参数位置上</strong>，上面的例子中，<code>Add</code>是尾调用，<code>MUL</code>则不是<br><strong>写成尾调用形式有助于编译器对函数调用进行优化</strong>，对于有尾调用优化的语言，只要编译器判断为尾调用，就不会保存状态</p>
<p><strong>尾递归则是指，写成尾调用形式的递归函数</strong>，下面是一例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fact_iter = (x, r) => x == 1 ? 1 : fact_iter(x-1, x*r)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">fact_iter = <span class="hljs-function">(<span class="hljs-params">x, r</span>) =&gt;</span> x == <span class="hljs-number">1</span> ? <span class="hljs-number">1</span> : fact_iter(x<span class="hljs-number">-1</span>, x*r)</code></pre>
<p>而下面的例子则不是尾递归，因为<code>fact_rec(x-1)</code>处于<code>*</code>的第二个参数位置上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fact_rec = x => x == 1 ? 1 : x * fact_rec(x-1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">fact_rec = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x == <span class="hljs-number">1</span> ? <span class="hljs-number">1</span> : x * fact_rec(x<span class="hljs-number">-1</span>)</code></pre>
<p>因为尾递归无需返回，结果只跟传入参数有关，因此只需用少量变量记录其参数变化，便能轻易改写成循环形式，因此<strong>尾递归和循环是等价</strong>的，下面把fact_iter改写成循环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fact_loop(x)
{
    var r = 1
    
    while(x >= 1)
    {
        r *= x
        x--;
    }
    
    return r;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fact_loop</span>(<span class="hljs-params">x</span>)
</span>{
    <span class="hljs-keyword">var</span> r = <span class="hljs-number">1</span>
    
    <span class="hljs-keyword">while</span>(x &gt;= <span class="hljs-number">1</span>)
    {
        r *= x
        x--;
    }
    
    <span class="hljs-keyword">return</span> r;
}</code></pre>
<h1 id="articleHeader2">CPS ( Continuation Passing Style )</h1>
<p>要解释<code>CPS</code>，便先要解释<code>continuation</code>，<br><strong><code>continuation</code>是程序控制流的抽象，表示后面将要进行的计算步骤</strong></p>
<p>比如下面这段阶乘函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fact_rec = x => x == 1 ? 1 : x * fact_rec(x-1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">fact_rec = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x == <span class="hljs-number">1</span> ? <span class="hljs-number">1</span> : x * fact_rec(x<span class="hljs-number">-1</span>)</code></pre>
<p>显然，计算fact_rec(4)之前要先计算fact_rec(3)，计算fact_rec(3)之前要先计算fact_rec(2)，...<br>于是，可以得到下面的计算链：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 ---> fact_rec(1) ---> fact_rec(2) ---> fact_rec(3) ---> fact_rec(4) ---> print" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-number">1</span> ---&gt; fact_rec(<span class="hljs-number">1</span>) ---&gt; fact_rec(<span class="hljs-number">2</span>) ---&gt; fact_rec(<span class="hljs-number">3</span>) ---&gt; fact_rec(<span class="hljs-number">4</span>) ---&gt; print</code></pre>
<p>展开计算链后，再从前往后执行，就可以得到最终结果。</p>
<p>对于链上的任意一个步骤，在其之前的是历史步骤，之后的是将要进行的计算，因此之后的都是<code>continuation</code><br>比如，对于<code>fact_rec(3)</code>，其<code>continuation</code>是<code>fact_rec(4) ---&gt; print</code><br>对于<code>fact(1)</code>，其<code>continuation</code>是<code>fact_rec(2) ---&gt; fact_rec(3) ---&gt; fact_rec(4) ---&gt; print</code></p>
<p>当然，上面的计算链不需要我们手工展开和运行，<strong>程序的控制流已经由语法规定好，我们只需要按语法写好程序，解释器自动会帮我们分解计算步骤并按部就班地计算</strong></p>
<p>然而，当现有语法无法满足我们的控制流需求怎么办？比如我们想从一个函数跳转至另一个函数的某处执行，<strong>语言并没有提供这样的跳转机制，那便需要手工传递控制流</strong>了。</p>
<p><strong><code>CPS</code>是一种显式地把<code>continuation</code>作为对象传递的<code>coding</code>风格，以便能更自由地操控程序的控制流</strong></p>
<p>既然是一种风格，自然需要有约定，<strong><code>CPS</code>约定：每个函数都需要有一个参数<code>kont</code>，<code>kont</code>是<code>continuation</code>的简写，表示对计算结果的后续处理</strong></p>
<p>比如上面的<code>fact_rec(x)</code>就需要改写为<code>fact_rec(x, kont)</code>，读作 “计算出<code>x</code>阶乘后，用<code>kont</code>对阶乘结果做处理”</p>
<p><code>kont</code>同样需要有约定，因为<code>continuation</code>是对某计算阶段结果做处理的，因此<strong>规定<code>kont</code>为一个单参数输入，单参数输出的函数</strong>，即<code>kont</code>的类型是<code>a-&gt;b</code></p>
<p>因此，按<code>CPS</code>约定改写后的<code>fact_rec</code>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fact_rec = (x, kont) => x == 1 ? kont(1) : fact_rec(x-1, res => kont(x*res))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">fact_rec = <span class="hljs-function">(<span class="hljs-params">x, kont</span>) =&gt;</span> x == <span class="hljs-number">1</span> ? kont(<span class="hljs-number">1</span>) : fact_rec(x<span class="hljs-number">-1</span>, res =&gt; kont(x*res))</code></pre>
<p>当我们运行<code>fact_rec(4, r=&gt;r)</code>，就可以得到结果<code>24</code></p>
<p>模拟一下<code>fact_rec(3, r=&gt;r)</code>的执行过程，就会发现，<strong>解释器会先将计算链分解展开</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fact_rec(3, r=>r)
fact_rec(2, res => (r=>r)(3*res))
fact_rec(1, res => (res => (r=>r)(3*res))(2*res))
(res => (res => (r=>r)(3*res))(2*res))(1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">fact_rec(<span class="hljs-number">3</span>, r=&gt;r)
fact_rec(<span class="hljs-number">2</span>, res =&gt; (<span class="hljs-function"><span class="hljs-params">r</span>=&gt;</span>r)(<span class="hljs-number">3</span>*res))
fact_rec(<span class="hljs-number">1</span>, res =&gt; (<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> (<span class="hljs-function"><span class="hljs-params">r</span>=&gt;</span>r)(<span class="hljs-number">3</span>*res))(<span class="hljs-number">2</span>*res))
(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> (<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> (<span class="hljs-function"><span class="hljs-params">r</span>=&gt;</span>r)(<span class="hljs-number">3</span>*res))(<span class="hljs-number">2</span>*res))(<span class="hljs-number">1</span>)</code></pre>
<p>当然，这种风格非常<strong>反人类</strong>，因为<strong>内层函数被外层函数的参数分在两端包裹住，不符合人类的线性思维</strong></p>
<p>我们写成下面这种符合直觉的形式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 ---> res => 2*res ---> res => 3*res ---> res => res" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-number">1</span> ---&gt; <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-number">2</span>*res ---&gt; <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-number">3</span>*res ---&gt; <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res</code></pre>
<p>链上每一个步骤的输出作为下一步骤的输入</p>
<p><strong>当解释器展开成上面的计算链后，便开始从左往右的计算，直到运行完所有的计算步骤</strong></p>
<p>需要注意到的是，<strong>因为<code>kont</code>承担了函数后续所有的计算流程，因此不需要返回，所以对<code>kont</code>的调用便是尾调用</strong><br><strong>当我们把程序中所有的函数都按<code>CPS</code>约定改写以后，程序中所有的函数调用就都变成了尾调用了</strong>，而这正是本文的目的<br>这个改写的过程就称为<strong>CPS变换</strong></p>
<p>需要警惕的是，<strong><code>CPS变换</code>并非没有状态保存这个过程，它只是把状态保存到continuation对象中</strong>，然后一级一级地往下传，因此<strong>空间复杂度并没有降低，只是不需要由函数栈帧来承受保存状态的负担而已</strong></p>
<p><strong><code>CPS</code>约定简约，却可显式地控制程序的执行，程序里各种形式的控制流都可以用它来表达（比如协程、循环、选择等）</strong>，<br>所以很多函数式语言的实现都采用了<code>CPS</code>形式，将语句的执行分解成一个小步骤一次执行，<br>当然，<strong>也因为<code>CPS</code>形式过于简洁，表达起来过于繁琐，可以看成一种高级的汇编语言</strong></p>
<h1 id="articleHeader3">Trampoline技法</h1>
<p>经过<code>CPS变换</code>后，递归函数已经转化成一条长长的<code>continuation</code>链</p>
<p>尾调用函数层层嵌套，永不返回，然而<strong>在缺乏尾调用优化的语言中，并不知晓函数不会返回，状态、参数压栈依旧会发生，因此需要手动强制弹出下一层调用的函数，禁止解释器的压栈行为，这就是所谓的<code>Trampoline</code></strong></p>
<p>因为<code>continuation</code>只接受一个结果参数，然后调用另一个<code>continuation</code>处理结果，因此我们<strong>需要显式地用变量<code>v</code>、<code>kont</code>分别表示上一次的结果</strong>、下一个<code>continuation</code>，然后在一个循环里不断地计算<code>continuation</code>，直到处理完整条<code>continuation</code>链，然后返回结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function trampoline(kont_v)  // kont_v = { kont: ..., v: ... }
{
    while(kont_v.kont)
        kont_v = kont_v.kont(kont_v.v);
    
    return kont_v.v;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">trampoline</span>(<span class="hljs-params">kont_v</span>)  // <span class="hljs-title">kont_v</span> = </span>{ kont: ..., <span class="hljs-attr">v</span>: ... }
{
    <span class="hljs-keyword">while</span>(kont_v.kont)
        kont_v = kont_v.kont(kont_v.v);
    
    <span class="hljs-keyword">return</span> kont_v.v;
}</code></pre>
<p><strong><code>kont_v.kont</code>是一个<code>bounce</code>，每次执行<code>kont_v.kont(kont_v.v)</code>时，都会根据上次结果计算出本次结果，然后弹出下一级<code>continuation</code>，然后保存在对象<code>{v: ..., kont: ...}</code>里</strong></p>
<p><strong>当然，在<code>bounce</code>中用<code>bind</code>的话，就不需要构造对象显式保存<code>v</code>了，因为<code>bind</code>会将<code>v</code>保存到闭包中，此时，<code>trampoline</code>变成：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function trampoline(kont)
{
    while(typeof kont == &quot;function&quot;)
        kont = kont();
    return kont.val;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">trampoline</span>(<span class="hljs-params">kont</span>)
</span>{
    <span class="hljs-keyword">while</span>(<span class="hljs-keyword">typeof</span> kont == <span class="hljs-string">"function"</span>)
        kont = kont();
    <span class="hljs-keyword">return</span> kont.val;
}</code></pre>
<p>用<code>bind</code>改写会更简洁，<strong>然而，因为想要求的值有可能是个<code>function</code>，我们需要在<code>bounce</code>里用对象<code>{val: ...}</code>把结果包装起来</strong></p>
<p>具体应用可看下面的例子</p>
<h1 id="articleHeader4">线性递归的CPS变换：求和</h1>
<p><strong>求和的递归实现：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sum = x => { if(x == 0) return 0; else return x + sum(x-1) }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">sum = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> { <span class="hljs-keyword">if</span>(x == <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>; <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> x + sum(x<span class="hljs-number">-1</span>) }</code></pre>
<p>当参数过大，比如<code>sum(4000000)</code>，提示<code>Uncaught RangeError: Maximum call stack size exceeded</code>，爆栈了！</p>
<p><strong>现在，我们通过<code>CPS变换</code>，将上面的函数改写成尾递归形式：</strong></p>
<p>首先，<strong>为<code>sum</code>多添加一个参数表示<code>continuation</code>，表示对计算结果进行的后续处理，</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sum = (x, kont) => ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">sum = <span class="hljs-function">(<span class="hljs-params">x, kont</span>) =&gt;</span> ...</code></pre>
<p>其中，<code>kont</code>是一个单参数函数，形如 <code>res =&gt; ...</code>，表示对结果<code>res</code>的后续处理</p>
<p>然后<strong>逐情况考虑</strong>：</p>
<p>当<code>x == 0</code>时，计算结果直接为<code>0</code>，并将<code>kont</code>应用到结果上,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sum = (x, kont) => { if(x == 0) return kont(0); else ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">sum = <span class="hljs-function">(<span class="hljs-params">x, kont</span>) =&gt;</span> { <span class="hljs-keyword">if</span>(x == <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> kont(<span class="hljs-number">0</span>); <span class="hljs-keyword">else</span> ... }</code></pre>
<p>当<code>x != 0</code>时，需要先计算<code>x-1</code>的求和，然后将计算结果与<code>x</code>相加，然后把相加结果输入<code>kont</code>中，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sum = (x, kont) => { 
       if(x == 0) return kont(0); 
       else return sum( x - 1, res => kont(res + x) ) };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">sum = <span class="hljs-function">(<span class="hljs-params">x, kont</span>) =&gt;</span> { 
       <span class="hljs-keyword">if</span>(x == <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> kont(<span class="hljs-number">0</span>); 
       <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> sum( x - <span class="hljs-number">1</span>, res =&gt; kont(res + x) ) };
}</code></pre>
<p><strong>好了，现在我们已经完成了<code>sum</code>的<code>CPS变换</code>，大家仔细看看，上面的函数已经是尾递归形式啦。</strong></p>
<p>现在还有最后的问题，<strong>怎么去调用？</strong>比如要算<code>4的求和</code>，<code>sum(4, kont)</code>，这里的<code>kont</code>应该是什么呢？</p>
<p>可以这样想，当我们计算出结果，后续的处理就是把结果简单地输出，因此<strong><code>kont</code>应为<code>res =&gt; res</code></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sum(4, res => res)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">sum(<span class="hljs-number">4</span>, res =&gt; res)</code></pre>
<p>把上面的代码复制到<code>Console</code>，运行就能得到结果<code>10</code></p>
<p><strong>下面我们模拟一下sum(3, res =&gt; res)的运作，以对其有个直观的认识</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sum( 3, res => res )
sum( 2, res => ( (res => res)(res+3) ) )
sum( 1, res => ( res => ( (res => res)(res+3) ) )(res+2) ) )
sum( 0, res => ( res => ( res => ( (res => res)(res+3) ) )(res+2) ) )(res+1) )

// 展开continuation链
( res => ( res => ( res => ( (res => res)(res+3) ) )(res+2) ) )(res+1) )(0)

// 收缩continuation链
( res => ( res => ( (res => res)(res+3) ) )(res+2) )(0+1)
( res => ( (res => res)(res+3) ) )(0+1+2)
(res => res)(0+1+2+3)
6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">sum( <span class="hljs-number">3</span>, res =&gt; res )
sum( <span class="hljs-number">2</span>, res =&gt; ( (<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res)(res+<span class="hljs-number">3</span>) ) )
sum( <span class="hljs-number">1</span>, res =&gt; ( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> ( (<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res)(res+<span class="hljs-number">3</span>) ) )(res+<span class="hljs-number">2</span>) ) )
sum( <span class="hljs-number">0</span>, res =&gt; ( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> ( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> ( (<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res)(res+<span class="hljs-number">3</span>) ) )(res+<span class="hljs-number">2</span>) ) )(res+<span class="hljs-number">1</span>) )

<span class="hljs-comment">// 展开continuation链</span>
( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> ( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> ( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> ( (<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res)(res+<span class="hljs-number">3</span>) ) )(res+<span class="hljs-number">2</span>) ) )(res+<span class="hljs-number">1</span>) )(<span class="hljs-number">0</span>)

<span class="hljs-comment">// 收缩continuation链</span>
( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> ( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> ( (<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res)(res+<span class="hljs-number">3</span>) ) )(res+<span class="hljs-number">2</span>) )(<span class="hljs-number">0</span>+<span class="hljs-number">1</span>)
( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> ( (<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res)(res+<span class="hljs-number">3</span>) ) )(<span class="hljs-number">0</span>+<span class="hljs-number">1</span>+<span class="hljs-number">2</span>)
(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res)(<span class="hljs-number">0</span>+<span class="hljs-number">1</span>+<span class="hljs-number">2</span>+<span class="hljs-number">3</span>)
<span class="hljs-number">6</span></code></pre>
<p>从上面的展开过程可以看到，<strong><code>sum(x, kont)</code>分为两个步骤</strong>：</p>
<ul>
<li><p><strong>展开<code>continuation</code>链</strong>，尾调用函数层层嵌套，先做的<code>continuation</code>在外层，后做的<code>continuation</code>放内层，这也是<strong><code>CPS</code>反人类的原因</strong>，<strong>人类思考阅读都是线性</strong>的（从上往下，从左往右），而<strong><code>CPS</code>则是从外到内，而且外层函数和参数包裹着内层</strong>，阅读时还需要眼睛在左右两端不断游离</p></li>
<li><p><strong>收缩<code>continuation</code>链</strong>，不断将外层<code>continuation</code>计算的结果往内层传</p></li>
</ul>
<p>当然，现在运行<code>sum(4000000， res =&gt; res)</code>，依然会爆栈，因为<code>js</code>默认并没有对尾调用做优化，<strong>我们需要利用上面的<code>Trampoline</code>技法将其改成循环形式</strong>（上文已经提过，尾递归和循环等价）</p>
<p>可是等等，上面说的<code>Trampoline</code>技法只针对于收缩<code>continuation</code>链过程，可是<code>sum(x, kont)</code>还包括展开过程啊？别担心，<strong>可以看到展开过程也是尾递归形式，我们只需稍作修改，就可以将其改成<code>continuation</code>的形式</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="( r => sum( x - 1, res => kont(res + x) )(null)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">( <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> sum( x - <span class="hljs-number">1</span>, res =&gt; kont(res + x) )(<span class="hljs-literal">null</span>)</code></pre>
<p><strong>如此便可把<code>continuation</code>链的展开和收缩过程统一起来，写成以下的循环形式</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function trampoline(kont_v)
{
    while(kont_v.kont)
        kont_v = kont_v.kont(kont_v.v);
    
    return kont_v.v;
}

function sum_bounce(x, kont)
{    
    if(x == 0) return {kont: kont, v: 0};
    else return { kont: r => sum_bounce(x - 1, res => {
                                                 return { kont: kont, 
                                                          v: res + x }
                                               } ),
                  v: null };
}

var sum = x => trampoline( sum_bounce(x, res => 
                                            {return { kont: null, 
                                                      v: res } }) )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">trampoline</span>(<span class="hljs-params">kont_v</span>)
</span>{
    <span class="hljs-keyword">while</span>(kont_v.kont)
        kont_v = kont_v.kont(kont_v.v);
    
    <span class="hljs-keyword">return</span> kont_v.v;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum_bounce</span>(<span class="hljs-params">x, kont</span>)
</span>{    
    <span class="hljs-keyword">if</span>(x == <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> {<span class="hljs-attr">kont</span>: kont, <span class="hljs-attr">v</span>: <span class="hljs-number">0</span>};
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> { <span class="hljs-attr">kont</span>: <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> sum_bounce(x - <span class="hljs-number">1</span>, res =&gt; {
                                                 <span class="hljs-keyword">return</span> { <span class="hljs-attr">kont</span>: kont, 
                                                          <span class="hljs-attr">v</span>: res + x }
                                               } ),
                  <span class="hljs-attr">v</span>: <span class="hljs-literal">null</span> };
}

<span class="hljs-keyword">var</span> sum = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> trampoline( sum_bounce(x, res =&gt; 
                                            {<span class="hljs-keyword">return</span> { <span class="hljs-attr">kont</span>: <span class="hljs-literal">null</span>, 
                                                      <span class="hljs-attr">v</span>: res } }) )</code></pre>
<p>OK，<strong>以上便是改成循环形式的尾递归写法</strong>，<br>把<code>sum(4000000)</code>输入<code>Console</code>，稍等片刻，便能得到答案<code>8000002000000</code></p>
<p><strong>当然，用<code>bind</code>的话可以改写成更简约的形式：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function trampoline(kont)
{
    while(typeof kont == &quot;function&quot;)
        kont = kont();
    return kont.val;
}

function sum_bounce(x, kont)
{    
    if(x == 0) return kont.bind(null, {val: 0});
    else return sum_bounce.bind( null, x - 1, res => kont.bind(null, {val: res.val + x}) );
}

var sum = x => trampoline( sum_bounce(x, res => res) )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">trampoline</span>(<span class="hljs-params">kont</span>)
</span>{
    <span class="hljs-keyword">while</span>(<span class="hljs-keyword">typeof</span> kont == <span class="hljs-string">"function"</span>)
        kont = kont();
    <span class="hljs-keyword">return</span> kont.val;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum_bounce</span>(<span class="hljs-params">x, kont</span>)
</span>{    
    <span class="hljs-keyword">if</span>(x == <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> kont.bind(<span class="hljs-literal">null</span>, {<span class="hljs-attr">val</span>: <span class="hljs-number">0</span>});
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> sum_bounce.bind( <span class="hljs-literal">null</span>, x - <span class="hljs-number">1</span>, res =&gt; kont.bind(<span class="hljs-literal">null</span>, {<span class="hljs-attr">val</span>: res.val + x}) );
}

<span class="hljs-keyword">var</span> sum = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> trampoline( sum_bounce(x, res =&gt; res) )</code></pre>
<p>也能起到同样的效果</p>
<h1 id="articleHeader5">树状递归的CPS变换：Fibonacci</h1>
<p>因为<code>Fibonacci</code>是<code>树状递归</code>，转换起来要比线性递归的<code>sum</code>麻烦一些，先<strong>写出普通的递归算法</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fib = x => x == 0 ? 1 : ( x == 1 ? 1 : fib(x-1) + fib(x-2) )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">fib = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x == <span class="hljs-number">0</span> ? <span class="hljs-number">1</span> : ( x == <span class="hljs-number">1</span> ? <span class="hljs-number">1</span> : fib(x<span class="hljs-number">-1</span>) + fib(x<span class="hljs-number">-2</span>) )</code></pre>
<p>同样，当参数过大，比如<code>fib(40000)</code>，就会爆栈</p>
<p><strong>开始做<code>CPS变换</code></strong>，有前面例子铺垫，下面只讲关键点</p>
<p><strong>添加<code>kont</code>参数</strong>，则<code>fib = (x, kont) =&gt; ...</code></p>
<p><strong>分情况考虑</strong></p>
<p><strong>当<code>x == 0 or 1</code></strong>，<code>fib = (x, kont) =&gt; x == 0 ? kont(1) : ( x == 1 ? kont(1) ...</code></p>
<p><strong>当<code>x != 1 or 1</code></strong>，需要先计算<code>x-1</code>的<code>fib</code>，再计算出<code>x-2</code>的<code>fib</code>，然后将两个结果相加，然后将kont应用到相加结果上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fib = (x, kont) => 
      x == 0 ? kont(1) : 
      x == 1 ? kont(1) : 
               fib( x - 1, res1 => fib(x - 2, res2 => kont(res1 + res2) ) )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">fib = <span class="hljs-function">(<span class="hljs-params">x, kont</span>) =&gt;</span> 
      x == <span class="hljs-number">0</span> ? kont(<span class="hljs-number">1</span>) : 
      x == <span class="hljs-number">1</span> ? kont(<span class="hljs-number">1</span>) : 
               fib( x - <span class="hljs-number">1</span>, res1 =&gt; fib(x - <span class="hljs-number">2</span>, res2 =&gt; kont(res1 + res2) ) )</code></pre>
<p><strong>以上便是<code>fib</code>经<code>CPS变换</code>后的尾递归形式</strong>，可见<strong>难点在于<code>kont</code>的转化</strong>，这里需要好好揣摩</p>
<p><strong>最后利用<code>Trampoline</code>技法将尾递归转换成循环形式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function trampoline(kont_v)
{
    while(kont_v.kont)
        kont_v = kont_v.kont(kont_v.v);
    
    return kont_v.v;
}

function fib_bounce(x, kont)
{    
    if(x == 0 || x == 1) return {kont: kont, v: 1};
    else return { 
                  kont: r => fib_bounce( x - 1, 
                                         res1 => 
                                         {
                                            return { 
                                             kont: r => fib_bounce(x - 2,
                                                                   res2 =>
                                                                   { 
                                                                     return  { 
                                                                       kont: kont,
                                                                       v: res1 + res2
                                                                     }
                                                                   }), 
                                             v: null 
                                           }
                                         } ),
                  v: null 
                };
}

var fib = x => trampoline( fib_bounce(x, res => 
                                            {return { kont: null, 
                                                      v: res } }) )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">trampoline</span>(<span class="hljs-params">kont_v</span>)
</span>{
    <span class="hljs-keyword">while</span>(kont_v.kont)
        kont_v = kont_v.kont(kont_v.v);
    
    <span class="hljs-keyword">return</span> kont_v.v;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fib_bounce</span>(<span class="hljs-params">x, kont</span>)
</span>{    
    <span class="hljs-keyword">if</span>(x == <span class="hljs-number">0</span> || x == <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> {<span class="hljs-attr">kont</span>: kont, <span class="hljs-attr">v</span>: <span class="hljs-number">1</span>};
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> { 
                  <span class="hljs-attr">kont</span>: <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> fib_bounce( x - <span class="hljs-number">1</span>, 
                                         res1 =&gt; 
                                         {
                                            <span class="hljs-keyword">return</span> { 
                                             <span class="hljs-attr">kont</span>: <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> fib_bounce(x - <span class="hljs-number">2</span>,
                                                                   res2 =&gt;
                                                                   { 
                                                                     <span class="hljs-keyword">return</span>  { 
                                                                       <span class="hljs-attr">kont</span>: kont,
                                                                       <span class="hljs-attr">v</span>: res1 + res2
                                                                     }
                                                                   }), 
                                             <span class="hljs-attr">v</span>: <span class="hljs-literal">null</span> 
                                           }
                                         } ),
                  <span class="hljs-attr">v</span>: <span class="hljs-literal">null</span> 
                };
}

<span class="hljs-keyword">var</span> fib = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> trampoline( fib_bounce(x, res =&gt; 
                                            {<span class="hljs-keyword">return</span> { <span class="hljs-attr">kont</span>: <span class="hljs-literal">null</span>, 
                                                      <span class="hljs-attr">v</span>: res } }) )</code></pre>
<p>OK，<strong>以上便是改成循环形式的尾递归写法</strong>，<br>在<code>console</code>中输入<code>fib(5)</code>、<code>fib(6)</code>、<code>fib(7)</code>可以验证其正确性，</p>
<p>当然，<strong>当你运行<code>fib(40000)</code>时，发现的确没有提示爆栈了，但是程序却卡死了，何也？</strong></p>
<p>正如我在前言说过，这种方法并不会降低树状递归算法的时间复杂度，只是将占用的栈空间以闭包链的形式转移至堆上，免去爆栈的可能，但是<strong>当参数过大时，运行复杂度过高，<code>continuation</code>链过长也导致大量内存被占用</strong>，因此，优化算法才是王道</p>
<p><strong>当然，用<code>bind</code>的话可以改写成更简约的形式：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function trampoline(kont)
{
    while(typeof kont == &quot;function&quot;)
        kont = kont();
    return kont.val;
}

fib_bounce = (x, kont) =>
 x == 0 ? kont.bind(null, {val: 1}) : 
 x == 1 ? kont.bind(null, {val: 1}) : 
          fib_bounce.bind( null, x - 1, 
                           res1 => fib_bounce.bind(null, x - 2,
                                                   res2 => kont.bind(null, {val: res1.val + res2.val}) ) )

var fib = x => trampoline( fib_bounce(x, res => res) )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">trampoline</span>(<span class="hljs-params">kont</span>)
</span>{
    <span class="hljs-keyword">while</span>(<span class="hljs-keyword">typeof</span> kont == <span class="hljs-string">"function"</span>)
        kont = kont();
    <span class="hljs-keyword">return</span> kont.val;
}

fib_bounce = <span class="hljs-function">(<span class="hljs-params">x, kont</span>) =&gt;</span>
 x == <span class="hljs-number">0</span> ? kont.bind(<span class="hljs-literal">null</span>, {<span class="hljs-attr">val</span>: <span class="hljs-number">1</span>}) : 
 x == <span class="hljs-number">1</span> ? kont.bind(<span class="hljs-literal">null</span>, {<span class="hljs-attr">val</span>: <span class="hljs-number">1</span>}) : 
          fib_bounce.bind( <span class="hljs-literal">null</span>, x - <span class="hljs-number">1</span>, 
                           res1 =&gt; fib_bounce.bind(<span class="hljs-literal">null</span>, x - <span class="hljs-number">2</span>,
                                                   res2 =&gt; kont.bind(<span class="hljs-literal">null</span>, {<span class="hljs-attr">val</span>: res1.val + res2.val}) ) )

<span class="hljs-keyword">var</span> fib = <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> trampoline( fib_bounce(x, res =&gt; res) )</code></pre>
<p>也能起到同样的效果</p>
<h1 id="articleHeader6">CPS变换法则</h1>
<p>对于基本表达式如数字、变量、函数对象、参数是基本表达式的内建函数(如四则运算等)等，不需要进行变换，</p>
<p>若是函数定义，则需要添加一个参数<code>kont</code>，然后对函数体做<code>CPS变换</code></p>
<p>若是参数位置有函数调用的函数调用，<code>fn(simpleExp1, exp2, ..., expn)</code>，如<code>exp2</code>就是第一个是函数调用的参数<br>则过程比较复杂，用伪代码表述如下：(<code>&lt;&lt;...&gt;&gt;</code>内表示表达式， <code>&lt;&lt;...@exp...&gt;</code>表示对exp求值后再代回<code>&lt;&lt;...&gt;&gt;</code>中)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cpsOfExp(<< fn(simpleExp1, exp2, ..., expn) >>, kont)
= cpsOfExp(exp2, << r2 => @cpsOfExp(<< fn(simpleExp1, r2, ..., expn) >>, kont) >>)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">cpsOfExp(<span class="xml"><span class="hljs-tag">&lt;&lt; <span class="hljs-attr">fn</span>(<span class="hljs-attr">simpleExp1</span>, <span class="hljs-attr">exp2</span>, <span class="hljs-attr">...</span>, <span class="hljs-attr">expn</span>) &gt;</span>&gt;, kont)
= cpsOfExp(exp2, <span class="hljs-tag">&lt;&lt; <span class="hljs-attr">r2</span> =&gt;</span> @cpsOfExp(<span class="hljs-tag">&lt;&lt; <span class="hljs-attr">fn</span>(<span class="hljs-attr">simpleExp1</span>, <span class="hljs-attr">r2</span>, <span class="hljs-attr">...</span>, <span class="hljs-attr">expn</span>) &gt;</span>&gt;, kont) &gt;&gt;)</span></code></pre>
<p>顺序表达式的变换亦与上类似</p>
<p>当然这个问题不是这么容易讲清楚，首先你需要对你想要变换的语言了如指掌，知道其表达式类型、求值策略等，<br><code>JavaScript</code>语法较为繁杂，解释起来不太方便，<br>之前我用<code>C++</code>模板写过一个<code>CPS</code>风格的<code>Lisp</code>解释器，日后有时间以此为例详细讲讲</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于CPS变换的尾递归转换算法

## 原文链接
[https://segmentfault.com/a/1190000008489245](https://segmentfault.com/a/1190000008489245)

