---
title: '该死的IEEE-754浮点数，说「约」就「约」，你的底线呢？以JS的名义来好好查查你' 
date: 2019-01-16 2:30:08
hidden: true
slug: lf7lhvy3nt8
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>IEEE 754 表示：你尽管抓狂、骂娘，但你能完全避开我，算我输。</p></blockquote>
<h2 id="articleHeader0">一、IEEE-754浮点数捅出的那些娄子</h2>
<p>首先我们还是来看几个简单的问题，能说出每一个问题的<strong>细节</strong>的话就可以跳过了，而如果只能泛泛说一句“因为IEEE754浮点数精度问题”，那么下文还是值得一看。</p>
<p>第一个问题是知名的<code>0.1+0.2 != 0.3</code>，为什么？菜鸟会告诉你“因为IEEE 754的浮点数表示标准”，老鸟会补充道“0.1和0.2不能被二进制浮点数精确表示，这个加法会使精度丧失”，巨鸟会告诉你整个过程是怎样的，小数加法精度可能在哪几步丧失，你能答上细节么？</p>
<p>第二个问题，既然十进制<code>0.1</code>不能被二进制浮点数精确存储，那么为什么<code>console.log(0.1)</code>打印出来的确确实实是<code>0.1</code>这个精确的值？</p>
<p>第三个问题，你知道这些比较结果是怎么回事么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这相等和不等是怎么回事？
0.100000000000000002 ==
0.100000000000000010 // true

0.100000000000000002 ==
0.100000000000000020 // false

//显然下面的数值没有超过Number.MAX_SAFE_INTEGER的范围，为什么是这样？
Math.pow(10, 10) + Math.pow(10, -7) === Math.pow(10, 10) //  true
Math.pow(10, 10) + Math.pow(10, -6) === Math.pow(10, 10) //  false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//这相等和不等是怎么回事？</span>
<span class="hljs-number">0.100000000000000002</span> ==
<span class="hljs-number">0.100000000000000010</span> <span class="hljs-comment">// true</span>

<span class="hljs-number">0.100000000000000002</span> ==
<span class="hljs-number">0.100000000000000020</span> <span class="hljs-comment">// false</span>

<span class="hljs-comment">//显然下面的数值没有超过Number.MAX_SAFE_INTEGER的范围，为什么是这样？</span>
<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>) + <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">-7</span>) === <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>) <span class="hljs-comment">//  true</span>
<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>) + <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">-6</span>) === <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>) <span class="hljs-comment">//  false</span>
</code></pre>
<p><strong>追问一句，给出一个数，给这个数加一个增量，再和这个数比较，要保持结果是true，即相等，那么大约这个增量的数量级最大可以到多少，你能估计出来么？</strong></p>
<p>第四个问题，旁友，你知道下面这段<strong>一直在被引用的的代码</strong>么（这段代码用于解决常见范围内的小数加法以符合常识，比如将0.1+0.2结果精确计算为0.3）？你理解这样做的思路么？但是你知道这段代码有问题么？比如你计算<code>268.34+0.83</code>就会出现问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//注意函数接受两个string形式的数
function numAdd(num1/*:String*/, num2/*:String*/) { 
    var baseNum, baseNum1, baseNum2; 
    try { 
        baseNum1 = num1.split(&quot;.&quot;)[1].length; 
    } catch (e) { 
        baseNum1 = 0; 
    } 
    try { 
        baseNum2 = num2.split(&quot;.&quot;)[1].length; 
    } catch (e) { 
        baseNum2 = 0;
    } 
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2)); 
    return (num1 * baseNum + num2 * baseNum) / baseNum; 
};

//看上去好像解决了0.1+0.2
numAdd(&quot;0.1&quot;,&quot;0.2&quot;); //返回精确的0.3

//但是你试试这个
numAdd(&quot;268.34&quot;,&quot;0.83&quot;);//返回 269.16999999999996" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//注意函数接受两个string形式的数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">numAdd</span>(<span class="hljs-params">num1<span class="hljs-regexp">/*:String*/</span>, num2<span class="hljs-regexp">/*:String*/</span></span>) </span>{ 
    <span class="hljs-keyword">var</span> baseNum, baseNum1, baseNum2; 
    <span class="hljs-keyword">try</span> { 
        baseNum1 = num1.split(<span class="hljs-string">"."</span>)[<span class="hljs-number">1</span>].length; 
    } <span class="hljs-keyword">catch</span> (e) { 
        baseNum1 = <span class="hljs-number">0</span>; 
    } 
    <span class="hljs-keyword">try</span> { 
        baseNum2 = num2.split(<span class="hljs-string">"."</span>)[<span class="hljs-number">1</span>].length; 
    } <span class="hljs-keyword">catch</span> (e) { 
        baseNum2 = <span class="hljs-number">0</span>;
    } 
    baseNum = <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-built_in">Math</span>.max(baseNum1, baseNum2)); 
    <span class="hljs-keyword">return</span> (num1 * baseNum + num2 * baseNum) / baseNum; 
};

<span class="hljs-comment">//看上去好像解决了0.1+0.2</span>
numAdd(<span class="hljs-string">"0.1"</span>,<span class="hljs-string">"0.2"</span>); <span class="hljs-comment">//返回精确的0.3</span>

<span class="hljs-comment">//但是你试试这个</span>
numAdd(<span class="hljs-string">"268.34"</span>,<span class="hljs-string">"0.83"</span>);<span class="hljs-comment">//返回 269.16999999999996</span></code></pre>
<p>那么多问题，还真是该死的IEEE-754，而这一切都源于IEEE-754浮点数本身的格式，以及“说「约」就「约」”（舍入）的规则，致使精度丧失，计算沦丧，作为一个前端，我们就从JS的角度来扒一扒。</p>
<h2 id="articleHeader1">二、端详一下IEEE-754双精度浮点的样貌</h2>
<p>所谓“知己知彼，百战不殆”，要从内部瓦解敌人，就要先了解敌人，但为什么只选择双精度呢，因为知道了双精度就明白了单精度，而且在JavaScript中，所有的Number都是以64-bit的双精度浮点数存储的，所以我们来回顾一下到底是怎么存储的，以及这样子存储怎么映射到具体的数值。</p>
<p><span class="img-wrap"><img data-src="https://ommw6ejay.qnssl.com/IEEE754_floating.jpg" src="https://static.alili.techhttps://ommw6ejay.qnssl.com/IEEE754_floating.jpg" alt="IEEE754浮点数形式" title="IEEE754浮点数形式" style="cursor: pointer;"></span></p>
<p>二进制在存储的时候是以二进制的“科学计数法”来存储的，我们回顾下十进制的科学计数法，比如54846.3，这个数我们在用标准的科学计数法应该是这样的：5.48463e4，这里有三部分，第一是符号，这是一个正数，只是一般省略正号不写，第二是有效数字部分，这里就是5.48463，最后是指数部分，这里是4。以上就是在十进制领域下的科学计数法，换到二进制也是一样，只是十进制下以10为底，二进制以2为底。</p>
<p>双精度的浮点数在这64位上划分为3段，而这3段也就确定了一个浮点数的值，64bit的划分是“1-11-52”的模式，具体来说：</p>
<ul>
<li><p>就是1位最高位（最左边那一位）表示符号位，0表示正，1表示负</p></li>
<li><p>接下去11位表示指数部分</p></li>
<li><p>最后52位表示尾数部分，也就是有效域部分</p></li>
</ul>
<p>这里幺蛾子就很多了。首先“每个实数都有一个相反数”这是中学教的，于是符号位改变下就是一个相反数了，但是对于数字0来说，相反数就是自己，而符号位对于每一个由指数域和尾数域确定的数都是一视同仁，有正就有负，要么都没有。所以这里就有正0和负0的概念，但是正0和负0是相等的，但是他们能反应出符号位的不同，和正零、负零相关的有意思的事这里不赘述。</p>
<p>然后，指数不一定要正数吧，可以是负数吧，一种方式是指数域部分也设置一个符号位，第二种是IEEE754采取的方式，设置一个偏移，使指数部分永远表现为一个非负数，然后减去某个偏移值才是真实的指数，这样做的好处是可以表现一些极端值，我们等会会看到。而64bit的浮点数设置的偏移值是1023，因为指数域表现为一个非负数，11位，所以 0 &lt;= e &lt;= 2^11 -1，实际的E=e-1023，所以 -1023 &lt;= E &lt;= 1024。<strong>这两端的两个极端值结合不同的尾数部分代表了不同的含义</strong>。</p>
<p>最后，尾数部分，也就是有效域部分，为什么叫有效域部分，举个栗子，这里有52个坑，但是你的数字由60个二进制1组成，不管怎样，你都是不能完全放下的，只能放下52个1，那剩下的8个1呢？要么舍入要么舍弃了，总之是无效了。所以，尾数部分决定了这个数的精度。</p>
<p>而对于二进制的科学计数法，如果保持小数点前必须有一位非0的，那有效域是不是必然是1.XXXX的形式？而这样子的二进制被称为<strong>规格化的</strong>，这样的二进制在存储时，<strong>小数点前的1是默认存在，但是默认不占坑的，尾数部分就存储小数点后的部分</strong>。</p>
<p>问题来了，如果这个二进制小数太小了，那么会出现什么情况呢？对于一个接近于0的二进制小数，一味追求1.xxx的形式，必然导致指数部分会向负无穷靠拢，而真实的指数部分最小也就能表示-1023，一旦把指数部分逼到了-1023，还没有到1.xxx的形式，那么只能用0.xxx的形式表示有效部分，这样的二进制浮点数表示<strong>非规格化的</strong>。</p>
<p>于是，我们整一个64位浮点数能表示的值由符号位s，指数域e和尾数域f确定如下，从中我们可以看到正负零、规格化和非规格化二进制浮点数、正负无穷是怎么表示的：</p>
<p><span class="img-wrap"><img data-src="https://ommw6ejay.qnssl.com/floatingandnumber.jpg" src="https://static.alili.techhttps://ommw6ejay.qnssl.com/floatingandnumber.jpg" alt="浮点数形式和数值的映射" title="浮点数形式和数值的映射" style="cursor: pointer;"></span></p>
<p>这里的<code>(0.f)</code>和<code>(1.f)</code>指的是二进制的表示，都要转化为十进制再去计算，这样你就可以得到最终值。</p>
<p>回顾了IEEE754的64bit浮点数之后，有以下3点需要牢记的：</p>
<ol>
<li><p>指数和尾数域是有限的，一个是11位，一个是52位</p></li>
<li><p>符号位决定正负，指数域决定数量级，尾数域决定精度</p></li>
<li><p><strong>所有数值的计算和比较，都是这样以64个bit的形式来进行的</strong>，抛开脑海中想当然的十进制</p></li>
</ol>
<h2 id="articleHeader2">三、精度在哪里发生丢失</h2>
<p>当你直接计算<code>0.1+0.2</code>时，你要知道“你大妈已经不是你大妈，你大爷也已经不是你大爷了，所以他们生的孩子（结果）出现问题就可以理解了”。这里的<code>0.1</code>和<code>0.2</code>是十进制下的0.1和0.2，当它们转化为二进制时，它们是无限循环的二进制表示。</p>
<p>这引出<strong>第一处可能丢失精度的地方</strong>，即在十进制转二进制的过程中丢失精度。因为大部分的十进制小数是不能被这52位尾数的二进制小数表示完毕的，我们眼中最简单的0.1、0.2在转化为二进制小数时都是无限循环的，还有些可能不是无限循环的，但是转化为二进制小数的时候，小数部分超过了52位，那也是放不下的。</p>
<p>那么既然只有52位的有效域，那么必然超出52位的部分会发生一件灵异事件——阉割，文明点叫“舍入”。IEEE754规定了几种舍入规则，但是<strong>默认的是舍入到最接近的值，如果“舍”和“入”一样接近，那么取结果为偶数的选择。</strong></p>
<p>所以上面的<code>0.1+0.2</code>中，当0.1和0.2被存储时，存进去的已经不是精确的0.1和0.2了，而是精度发生一定丢失的值。但是精度丢失还没有完，当这个两个值发生相加时，精度还可能进一步丢失，注意几次精度丢失的叠加不一定使结果偏差越来越大哦。</p>
<p><strong>第二处可能丢失精度的地方</strong>是浮点数参与计算时，浮点数参与计算时，有一个步骤叫<strong>对阶</strong>，以加法为例，要把小的指数域转化为大的指数域，也就是左移小指数浮点数的小数点，一旦小数点左移，必然会把52位有效域的最右边的位给挤出去，这个时候挤出去的部分也会发生“舍入”。这就又会发生一次精度丢失。</p>
<p>所以就<code>0.1+0.2</code>这个例子精度在两个数转为二进制过程中和相加过程中都已经丢失了精度，那么最后的结果有问题，不能如愿也就不奇怪了，如果你很想探究具体这是怎么计算的，文末附录的链接能帮助你。</p>
<h2 id="articleHeader3">四、疑惑：0.1不能被精确表示，但打印0.1它就是0.1啊</h2>
<p>是的，照理说，0.1不能被精确表示，存储的是0.1的一个近似值，那么我打印0.1时，比如<code>console.log(0.1)</code>，就是打印出了精确的0.1啊。</p>
<p>事实是，当你打印的时候，其实发生了二进制转为十进制，十进制转为字符串，最后输出的。而十进制转为二进制会发生近似，那么二进制转为十进制也会发生近似，打印出来的值其实是近似过的值，并不是对浮点数存储内容的精确反映。</p>
<p>关于这个问题，StackOverflow上有一个回答可以参考，回答中指出了一篇文献，有兴趣的可以去看：</p>
<p><a href="http://stackoverflow.com/questions/28494758/how-does-javascript-print-0-1-with-such-accuracy" rel="nofollow noreferrer" target="_blank">How does javascript print 0.1 with such accuracy?</a></p>
<h2 id="articleHeader4">五、相等不相等，就看这64个bit</h2>
<p>再次强调，<strong>所有数值的计算和比较，都是这样以64个bit的形式来进行的</strong>，当这64个bit容不下时，就会发生近似，一近似就发生意外了。</p>
<p>有一些在线的小数转IEEE754浮点数的应用对于验证一些结果还是很有帮助的，你可以用<a href="http://babbage.cs.qc.cuny.edu/IEEE-754.old/Decimal.html" rel="nofollow noreferrer" target="_blank">这个IEEE-754 Floating-Point Conversion工具</a>帮你验证你的小数转化为IEEE754浮点数之后是怎么个鬼样。</p>
<p>来看第一部分中提出两个简单的比较问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这相等和不等是怎么回事？
0.100000000000000002 ==
0.1  //true

0.100000000000000002 ==
0.100000000000000010 // true

0.100000000000000002 ==
0.100000000000000020 // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//这相等和不等是怎么回事？</span>
<span class="hljs-number">0.100000000000000002</span> ==
<span class="hljs-number">0.1</span>  <span class="hljs-comment">//true</span>

<span class="hljs-number">0.100000000000000002</span> ==
<span class="hljs-number">0.100000000000000010</span> <span class="hljs-comment">// true</span>

<span class="hljs-number">0.100000000000000002</span> ==
<span class="hljs-number">0.100000000000000020</span> <span class="hljs-comment">// false</span></code></pre>
<p>当你把<code>0.1</code>、<code>0.100000000000000002</code>、<code>0.10000000000000001</code>和<code>0.10000000000000002</code>用上面的工具转为浮点数后，你会发现，他们的尾数部分（注意看尾数部分最低4位，其余位都是相同的），前三个是相同的，最低4位是1010，但是最后一个转化为浮点数尾数最低4位是1011。</p>
<p>这是因为它们在转为二进制时要舍入部分的不同可能造成的不同舍入导致在尾数上可能呈现不一致，而<strong>比较两个数，本质上是比较这两个数的这64个bit</strong>，不同即是不等的，<strong>有一个例外，+0==-0</strong>。</p>
<p>再来看提到的第二个相等问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.pow(10, 10) + Math.pow(10, -7) === Math.pow(10, 10) //  true
Math.pow(10, 10) + Math.pow(10, -6) === Math.pow(10, 10) //  false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>) + <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">-7</span>) === <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>) <span class="hljs-comment">//  true</span>
<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>) + <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">-6</span>) === <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>) <span class="hljs-comment">//  false</span></code></pre>
<p>为什么上面一个是可以相等的，下面一个就不行了，首先我们来转化下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.pow(10, 10) =>
指数域 e =1056 ，即 E = 33
尾数域 (1.)0010101000000101111100100000000000000000000000000000

Math.pow(10, -7) =>
指数域 e =999 ，即 E = -24

Math.pow(10, -6) =>
指数域 e =1003 ，即 E = -20
尾数域 (1.)0000110001101111011110100000101101011110110110001101" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>) =&gt;
指数域 e =<span class="hljs-number">1056</span> ，即 E = <span class="hljs-number">33</span>
尾数域 (<span class="hljs-number">1.</span>)<span class="hljs-number">0010101000000101111100100000000000000000000000000000</span>

<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">-7</span>) =&gt;
指数域 e =<span class="hljs-number">999</span> ，即 E = <span class="hljs-number">-24</span>

<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-number">-6</span>) =&gt;
指数域 e =<span class="hljs-number">1003</span> ，即 E = <span class="hljs-number">-20</span>
尾数域 (<span class="hljs-number">1.</span>)<span class="hljs-number">0000110001101111011110100000101101011110110110001101</span></code></pre>
<p>可以看到1e10的指数是33次，而<code>Math.pow(10, -7)</code>指数是-24次，相差57次，远大于52，因此，<strong>相加时发生对阶，早就把Math.pow(10, -7)近似成0了</strong>。</p>
<p>而<code>Math.pow(10, -6)</code>指数是-20次，相差53次，看上去大于52次，但有一个默认的前导1别忘了，于是当发生对阶，小数点左移53位时，这一串尾数（别忘了前导1）正好被挤出第52位，这时候就会发生”舍入“，舍入结果是最低位，也就是bit0位变成1，这个时候和<code>Math.pow(10, 10)</code>相加，结果的最低位变成了1，自然和<code>Math.pow(10, 10)</code>不相等。</p>
<p>你可以用这个<a href="http://weitz.de/ieee/" rel="nofollow noreferrer" target="_blank">IEEE754计算器</a>来验证结果。</p>
<h2 id="articleHeader5">六、浅析数值和数值精度的数量级对应关系</h2>
<p>承接上面的那个结果，我们发现当数值为10的10次时，加一个-7数量级的数，对于值没有影响，加一个-6数量级的数，却对值由影响，这里的<strong>本质</strong>我们也是知道的：</p>
<p>这是由于计算时要对阶，如果一个小的增量在对阶时最高有效位右移（因为小数点在左移）到了52位开外，那么这个增量就很可能被忽略，即对阶完尾数被近似成0。</p>
<p>换句话说，我们可以说对于10<sup>10</sup>数量级，其精确度大约在10<sup>-6</sup>数量级，那么对于10<sup>9</sup>、10<sup>8</sup>、10<sup>0</sup>等等数量级的值，精确度又大约在多少呢？</p>
<p>有一张图很好地说明了这个对应关系：</p>
<p><span class="img-wrap"><img data-src="https://ommw6ejay.qnssl.com/ieee754.png" src="https://static.alili.techhttps://ommw6ejay.qnssl.com/ieee754.png" alt="数值数量级和精确度数量级对应关系" title="数值数量级和精确度数量级对应关系" style="cursor: pointer;"></span></p>
<p>这张图，横坐标表示浮点数值数量级，纵坐标表示可以到达的精度的数量级，当然这里横坐标对应的数值数量级指的是十进制表示下的数量级。</p>
<p>比如你在控制台测试（.toFixed()函数接受一个20及以内的整数n以显示小数点后n位）：</p>
<p><code>0.1.toFixed(20) ==&gt; 0.10000000000000000555</code>（这里也可以看出0.1是精确存储的），根据上面的图我们知道0.1是10<sup>-1</sup>数量级的，那么精确度大约在10<sup>-17</sup>左右，而我们验证一下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//动10的-18数量级及之后的数字，并不会有什么，依旧判定相等
0.10000000000000000555 ==
0.10000000000000000999  //true
//动10的-17数量级上的数字，结果马上不一样了
0.10000000000000000555 ==
0.10000000000000001555  //false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//动10的-18数量级及之后的数字，并不会有什么，依旧判定相等</span>
<span class="hljs-number">0.10000000000000000555</span> ==
<span class="hljs-number">0.10000000000000000999</span>  <span class="hljs-comment">//true</span>
<span class="hljs-comment">//动10的-17数量级上的数字，结果马上不一样了</span>
<span class="hljs-number">0.10000000000000000555</span> ==
<span class="hljs-number">0.10000000000000001555</span>  <span class="hljs-comment">//false</span></code></pre>
<p>从图上也可以看到之前的那个例子，10<sup>10</sup>数量级，精确度在10<sup>-6</sup>数量级。</p>
<p>也就是说，在IEEE754的64位浮点数表示下，如果一个数的数量级在10<sup>X</sup>，其精确度在10<sup>Y</sup>，那么X和Y大致满足：</p>
<p><strong>X-16=Y</strong></p>
<p>知道这个之后我们再回过头来看ECMA在定义的<code>Number.EPSILON</code>，如果还不知道有这个的存在，可以控制台去输出下，这个数大约是10<sup>-16</sup>数量级的一个数，这个数定义为”大于1的能用IEEE754浮点数表示为数值的最小数与1的差值“，这个数用来干嘛呢？</p>
<p><code>0.1+0.2-0.3&lt;Number.EPSILON</code>是返回<code>true</code>的，也就是说ECMA预设了一个精度，便于开发者使用，但是我们现在可以知道这个预定义的值其实是对应 10<sup>0</sup> 数量级数值的精确度，如果你要比较更小数量级的两个数，预定义的这个Number.EPSILON就不够用了（不够精确了），你可以用数学方式将这个预定义值的数量级进行缩小。</p>
<h2 id="articleHeader6">七、麻烦稍小的整数提供一种解决思路</h2>
<p>那么怎样能在计算机中实现看上去比较正常和自然的小数计算呢？比如<code>0.1+0.2</code>就输出<code>0.3</code>。其中一个思路，也是目前足够应付大多数场景的思路就是，将小数转化为整数，在整数范围内计算结果，再把结果转化为小数，因为<strong>存在一个范围，这个范围内的整数是可以被IEEE754浮点形式精确表示的</strong>，换句话说这个范围内的整数运算，结果都是精确的，而大部分场景下这个数的范围已经够用，所以这种思路可行。</p>
<h3 id="articleHeader7">1. JS中数的“量程”和“精度”</h3>
<p>之所以说一个范围，而不是所有的整数，是因为整数也存在精确度的问题，<strong>要深刻地理解，”可表示范围“和”精确度“两个概念的区别，就像一把尺子的”量程“和”精度“</strong>。</p>
<p>JS所能表示的数的范围，以及能表示的安全整数范围（安全是指不损失精确度）由以下几个值界定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//自己可以控制台打印看看
Number.MAX_VALUE => 能表示的最大正数，数量级在10的308次
Number.MIN_VALUE => 能表示的最小正数，注意不是最小数，最小数是上面那个取反，10的-324数量级

Number.MAX_SAFE_INTEGER => 能表示的最大安全数，9开头的16位数
Number.MIN_SAFE_INTEGER => 能表示的最小安全数，上面那个的相反数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//自己可以控制台打印看看</span>
<span class="hljs-built_in">Number</span>.MAX_VALUE =&gt; 能表示的最大正数，数量级在<span class="hljs-number">10</span>的<span class="hljs-number">308</span>次
<span class="hljs-built_in">Number</span>.MIN_VALUE =&gt; 能表示的最小正数，注意不是最小数，最小数是上面那个取反，<span class="hljs-number">10</span>的<span class="hljs-number">-324</span>数量级

<span class="hljs-built_in">Number</span>.MAX_SAFE_INTEGER =&gt; 能表示的最大安全数，<span class="hljs-number">9</span>开头的<span class="hljs-number">16</span>位数
<span class="hljs-built_in">Number</span>.MIN_SAFE_INTEGER =&gt; 能表示的最小安全数，上面那个的相反数</code></pre>
<p>为什么超过最大安全数的整数都不精确了呢？还是回到IEEE754的那几个坑上，尾数就52个坑，有效数再多，就要发生舍入了。</p>
<h3 id="articleHeader8">2. 一段有瑕疵的解决浮点计算异常问题的代码</h3>
<p>因此，回到解决JS浮点数的精确计算上来，可以把待计算的小数转化为整数，在安全整数范围内，再计算结果，再转回小数。</p>
<p>所以有了下面这段代码（<strong>但这是有问题的</strong>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//注意要传入两个小数的字符串表示，不然在小数转成二进制浮点数的过程中精度就已经损失了
function numAdd(num1/*:String*/, num2/*:String*/) { 
    var baseNum, baseNum1, baseNum2; 
    try { 
        //取得第一个操作数小数点后有几位数字，注意这里的num1是字符串形式的
        baseNum1 = num1.split(&quot;.&quot;)[1].length; 
    } catch (e) {
        //没有小数点就设为0 
        baseNum1 = 0; 
    } 
    try { 
        //取得第二个操作数小数点后有几位数字
        baseNum2 = num2.split(&quot;.&quot;)[1].length; 
    } catch (e) { 
        baseNum2 = 0;
    }
    //计算需要 乘上多少数量级 才能把小数转化为整数 
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2)); 
    //把两个操作数先乘上计算所得数量级转化为整数再计算，结果再除以这个数量级转回小数
    return (num1 * baseNum + num2 * baseNum) / baseNum; 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//注意要传入两个小数的字符串表示，不然在小数转成二进制浮点数的过程中精度就已经损失了</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">numAdd</span>(<span class="hljs-params">num1<span class="hljs-regexp">/*:String*/</span>, num2<span class="hljs-regexp">/*:String*/</span></span>) </span>{ 
    <span class="hljs-keyword">var</span> baseNum, baseNum1, baseNum2; 
    <span class="hljs-keyword">try</span> { 
        <span class="hljs-comment">//取得第一个操作数小数点后有几位数字，注意这里的num1是字符串形式的</span>
        baseNum1 = num1.split(<span class="hljs-string">"."</span>)[<span class="hljs-number">1</span>].length; 
    } <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-comment">//没有小数点就设为0 </span>
        baseNum1 = <span class="hljs-number">0</span>; 
    } 
    <span class="hljs-keyword">try</span> { 
        <span class="hljs-comment">//取得第二个操作数小数点后有几位数字</span>
        baseNum2 = num2.split(<span class="hljs-string">"."</span>)[<span class="hljs-number">1</span>].length; 
    } <span class="hljs-keyword">catch</span> (e) { 
        baseNum2 = <span class="hljs-number">0</span>;
    }
    <span class="hljs-comment">//计算需要 乘上多少数量级 才能把小数转化为整数 </span>
    baseNum = <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, <span class="hljs-built_in">Math</span>.max(baseNum1, baseNum2)); 
    <span class="hljs-comment">//把两个操作数先乘上计算所得数量级转化为整数再计算，结果再除以这个数量级转回小数</span>
    <span class="hljs-keyword">return</span> (num1 * baseNum + num2 * baseNum) / baseNum; 
};</code></pre>
<p>思路没有问题，看上去也解决了<code>0.1+0.2</code>的问题，用上面的函数计算<code>numAdd("0.1","0.2")</code>时，输出确实是0.3。但是再多试几个，比如<code>numAdd("268.34","0.83")</code>，输出是<code>269.16999999999996</code>，瞬间爆炸，这些代码一行都不想再看。</p>
<p>其实仔细分析一下，这个问题还是很好解决的。问题是这么发生的，<strong>有一个隐式的类型转换，上面的num1和num2传入都是字符串类型的，但是在最后return的那个表达式中，直接参与计算，于是num1和num2隐式地从String转为Number，而Number是以IEEE754浮点数形式储存的，在十进制转为二进制过程中，精度会损失</strong>。</p>
<p>我们可以在上面代码的<code>return</code>语句之上加上这两句看看输出是什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(num1 * baseNum);
console.log(num2 * baseNum);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(num1 * baseNum);
<span class="hljs-built_in">console</span>.log(num2 * baseNum);</code></pre>
<p>你会发现针对<code>numAdd("268.34","0.83")</code>的例子，上面两行输出<code>26833.999999999996</code>、<code>83</code>。可以看到转化为整数的梦想并没有被很好地实现</p>
<p>要解决这个问题也很容易，就是我们显式地让小数“乖乖”转为整数，因为我们知道两个操作数乘上计算所得数量级必然应该是一个整数，只是由于精度损失放大导致被近似成了一个小数，那我们把结果保留到整数部分不就可以了么？</p>
<p>也就是把上面最后一句的</p>
<p><code>return (num1 * baseNum + num2 * baseNum) / baseNum;</code> <br>改为<br><code>return (num1 * baseNum + num2 * baseNum).toFixed(0) / baseNum;</code></p>
<p>分子上的<code>.toFixed(0)</code>表示精确到整数位，这<strong>基于我们明确地知道分子是一个整数</strong>。</p>
<h3 id="articleHeader9">3. 局限性和其他可能的思路</h3>
<p>这种方式的局限性在于我要乘上一个数量级把小数转为整数，如果小数部分很长呢，那么通过这个方式转化出的整数就超过了安全整数的范围，那么计算也就不安全了。</p>
<p>不过还是一句话，看使用场景进行选择，如果局限性不会出现或者出现了但是无伤大雅，那就可以应用。</p>
<p>另一种思路是将小数转为字符串，用字符串去模拟，这样子做可适用的范围比较广，但是实现过程会比较繁琐。</p>
<p>如果你的项目中需要多次面临这样的计算，又不想自己实现，那么也有现成的库可以使用，比如<code>math.js</code>，感谢这个美好的世界吧。</p>
<h2 id="articleHeader10">八、小结</h2>
<p>作为一个JS程序员，IEEE754浮点数可能不会经常让你心烦，但是明白这些能让你在以后遇到相关意外时保持冷静，正常看待。看完全文，我们应该能明白IEEE754的64位浮点数表示方式和对应的值，能明白精度和范围的区别，能明白精度损失、意外的比较结果都是源自于那有限数量的bit，而不用每次遇到类似问题就发一个日经的问题，不会就知道“IEEE754”这一个词的皮毛却说不出一句完整的表达，最重要是能够心平气和地骂一句“你这该死的IEEE754”后继续coding...</p>
<p>如有纰漏烦请留言指出，谢谢。</p>
<h2 id="articleHeader11">附：感谢以下内容对我的帮助</h2>
<p><a href="http://www.cnblogs.com/junjieok/p/3306155.html" rel="nofollow noreferrer" target="_blank">实现js浮点数加、减、乘、除的精确计算</a>  <br><a href="http://babbage.cs.qc.cuny.edu/IEEE-754.old/Decimal.html" rel="nofollow noreferrer" target="_blank">IEEE-754 Floating-Point Conversion IEEE-754浮点数转换工具</a>   <br><a href="https://segmentfault.com/a/1190000008268668">IEEE754 浮点数格式 与 Javascript number 的特性</a>   <br><a href="https://cselftrain.wordpress.com/2016/11/15/number-epsilon%E5%8F%8A%E5%85%B6%E5%AE%83%E5%B1%9E%E6%80%A7/" rel="nofollow noreferrer" target="_blank">Number.EPSILON及其它属性</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
该死的IEEE-754浮点数，说「约」就「约」，你的底线呢？以JS的名义来好好查查你

## 原文链接
[https://segmentfault.com/a/1190000009084877](https://segmentfault.com/a/1190000009084877)

