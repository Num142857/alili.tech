---
title: '记一次XX前端面试' 
date: 2018-11-29 9:34:56
hidden: true
slug: l5048bn11w
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前因，没有比摸鱼有趣的事了</h2>
<p>距离自己被外派(俗称外包)出去，已经过了快五个月，工作的话，很闲。人啊，一定保持好的习惯，懒惰是会上瘾，日常摸鱼，怀疑人生，我是谁，我在哪，我要干什么。</p>
<p>中午吃饭的时候，收到了boss直聘的一条消息，XX发来一个信息，是一个前端职位，问我是否感兴趣，讲道理，我还是很诧异的，一是我BOSS直聘上的简历很久没更新了，二是我的在线简历写的一塌糊涂，连项目介绍都没有，我猜应该是HR手点错了，发错消息了。思考了一会，想着试试吧，就点了感兴趣，一天过去了，我看没回，emmm，果然点错了。结果后来又联系我，希望我把简历发给她，我一想，还有戏，晚上的时候草草写了一份简历递了过去。然后又一天过去了，接着又过去了一天，我想，差不多凉了。谁知道后来又联系了我，问我下周有没有时间去面试，我靠，那天可是星期五啊，我啥都木有准备，面试不是直接翻船，而且下周这边的项目还要上线，问星期五可以不？两天过去了，我想，差不多凉了吧，后面又回了了，说可以，邮件已经发到我邮箱了。我掐指一算，还有四天，赶紧将自己的switch、3DSLL收了起来，开始准备面试，然后自己给自己出面试题。</p>
<h2 id="articleHeader1">过程</h2>
<p>自己给自己出面试题是个艰难的过程，就像自己和自己下象棋一样。花了好几天做了个总结，将自己记录过的难点和自己想理解的东西做了个总结。除了排序的话，其他都是自己写的，整个过程也碰到些麻烦，改了很多次。我把这些放在了<a href="https://github.com/shiyangzhaoa/easy-tips" rel="nofollow noreferrer" target="_blank">GitHub</a>上，我用了我老婆的照片，各位别介意。这些问题，有的我给了详细的解题过程，喜欢的话点个star吧。后期遇到一些有趣的东西我也会在上面更新的。</p>
<blockquote>我会在最后分析一些问题的解题过程。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVbaPZK?w=1622&amp;h=1010" src="https://static.alili.tech/img/bVbaPZK?w=1622&amp;h=1010" alt="姿势" title="姿势" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">面试过程</h2>
<p>讲道理，XX的大楼，感觉还不错。来的有点早，在下面找了个奶茶店，一边疯狂喝水，一遍思考人生。然后到点了，就上去了，面试是在8楼，讲道理，还是有点紧张的，毕竟一年没准备过面试了，心里还是很玄的。进去以后，和其他面试的小伙伴分配到一个房间了，过了一会，有人拿了面试题过来，给了隔壁的小伙伴。。。我偷偷瞄了一眼，是 爪哇。过了一会又过来了，拿了两份面试题，一份给了我，一份给了另一个小伙伴，都是前端的。面试题总共三页还是四页，都是基础，拿起笔 pia pia 就写了起来，过了一会就交了，刚交就想起来自己一道题做错了，感觉很难受。。。小插曲：旁边面 爪哇 的小伙伴用手机疯狂百度，笔试过程没人管的，我是老实人，不干这事</p>
<h3 id="articleHeader3">一面</h3>
<p>面试官感觉人不错，拿着我的面试题和简历到外面去了，我赶紧和他说我一道题做错了，并说了正确答案。面试官表示他还没看面试题，然后过了一遍，不好意思，我好像全做对了。。。刚开始就随便问了问this，严格模式和非严格模式下执行函数的this。</p>
<blockquote>干货，整个过程都是用笔写的</blockquote>
<ol>
<li>我提了，说面试题目太简单了（现在想想的确这样说不好），然后面试官就说，那我给你出个不简单的，<code>flatten</code>的实现，我一想，这个我好像写过，拿起笔，啪啪啪就写起来了。过</li>
<li>问了我知不知道最近网上的快排事件，我说知道，就让我写了，我用的是最常用的3<code>while</code>写法，写到一半他就没让我写了，我写的和书上的一毛一样。。。然后又让我说出归并排序的原理，这个没有让我写了，我就直接说了，就是切成两个数组，巴拉巴拉，具体自己上网查询。过</li>
<li>知道<code>immer.js</code>吗，Mobx作者弄的一个不可变数据，知道的不多，就随便说了说，然后又让我说明了<code>immutable.js</code>的数据更新原理，和react的tree diff有点像，巴拉巴拉将自己知道说了。过</li>
<li>
<code>KOA</code>中间件原理，卧槽，这个我读过源码，还分析过，就是通过compose组合中间件，巴拉巴拉。过</li>
<li>获取所有文件和文件夹。这个就是个树结构，因为我记不清fs APi的使用了，就问能不能用dom树去代替，面试官说可以，这个我写过。。。巴拉巴拉，面试官说，能不能不用递归，用while+广度+深度还是啥，我靠，我懵了，虽然我知道广度优先，深度优先，有点紧张，抓着笔思考了会人生，面试官看我这样，就向我解释了下。答案放在GitHub上了。zi</li>
<li>面试官说：“那我问你一个哲学的问题，为什么有数据结构这种东西？”哇，这是啥，巴拉巴拉扯了一通，大致就是物以类聚，人以群分，先人积累下来的经验，这些让我们更方便处理数据啥的。尬</li>
<li>对函数式编程了解多少，对算法了解多少。我函数式懂的不多，函数式编程还是比较难的，什么y组合子，听着就晕。算法就随便说了些，动态规划树啊啥的。面试官问我是怎样学习算法的，我就说自己平时会在知乎看些相关的文章。然后面试官就说想我这样零散的看并不能获得太大提高，应该有组织的去看。关于函数式，他向我推荐了Haskell，说我只需要看看基本就可以了，然后再去看redux就会好很多。懵</li>
<li>又问了很多，然后问我想了解什么，其实我知道XX的技术栈的，所以就说了些，表示有很大的兴趣。</li>
</ol>
<p>其他问题就不一一列举了，他还问我看了关于node的什么书籍，我张口差点说了《九浅一深nodejs》。。。我已经记不清楚是谁带的头了</p>
<p>总结：面试官和我说，人的知识结构是T字型的，底下的都是基础知识，只有基础知识弄好才能学习更广的知识，然后说了我基础不太好。。。我一想，完蛋，这下真凉了，我的认知里，基础是最重要的。</p>
<h3 id="articleHeader4">二面</h3>
<p>一面面试官把我带回去了，让我等一会，过了一会，二面面试官来了，继续和面试官一起出去。二面问的问题就是舒服多了。</p>
<ol>
<li>因为我在简历中写了用了react和vue，就问了我两者有什么不同。我就说了更新策略啊，react通过setState手动批量更新，vue是<code>Object.defineProperty</code>去监听属性变化。然后还有什么slot和this.props.children这样。</li>
<li>关于redux的一些问题，熟悉redux一般不会有太大问题。</li>
<li>就是一些杂碎的问题，为啥想离职，关于离职，多从自身找问题，别说公司咋的咋的，很不好。</li>
<li>又问了些，然后问我想知道什么，我balala说了一些，然后问面试是不是结束了，然后他说是，结果下个星期出来，我一听，这下真凉了，好歹有个三面人事面吧。。。</li>
</ol>
<p>最后面试官把我带了回去，也没说让我走，等了半个小时，我想大概挂了，就找了别的员工问了下是不是自己可以走了，然后问了人事，说把我忘了。。。以为二面面试官把我送走了，准备打电话和我通知的。然后人事说让我放心，给了口头offer，正式offer下个星期给我，然后就是和说要准备什么，让我看邮件。</p>
<h2 id="articleHeader5">结局</h2>
<p>还算满意吧，表现的的确不太好，但也算把自己学的东西说出来了。结局也是好的，顺利拿到offer。</p>
<h2 id="articleHeader6">解析，补充一些小东西，具体看源码</h2>
<ol>
<li>
<p>扁平化数组，flatten已经进入规范，在MDN上的Array可以查到该方法，记住一点，能用reduce的都用reduce，数组运算，你的下次运算结果需要用到上次运算的结果，都可以用reduce。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const flatten = (arr) => arr.reduce((a, b) => {
  if (Array.isArray(b)) {
    return a.concat(flatten(b));
    // 该项是数组，连接 递归调用的结果，否则直接连接
  }
  return a.concat(b);
}, []);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> flatten = <span class="hljs-function">(<span class="hljs-params">arr</span>) =&gt;</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(b)) {
    <span class="hljs-keyword">return</span> a.concat(flatten(b));
    <span class="hljs-comment">// 该项是数组，连接 递归调用的结果，否则直接连接</span>
  }
  <span class="hljs-keyword">return</span> a.concat(b);
}, []);</code></pre>
</li>
<li>深克隆<p>需要注意的坑就是<code>typeof null</code>、<code>typeof RegExp('test')</code>、<code>typeof Date()</code>、<code>typeof Boolean(true)</code>、<code>typeof String('t')</code>、<code>typeof Number(1)</code>为object，数组和对象也要区分开，具体看源码。</p>
</li>
<li>求一个页面多少dom节点<p>原理和flatten一样，都是递归，看源码</p>
</li>
<li>求dom树结构<p>这个个人觉得挺重要的，也很有趣，看源码，也是递归</p>
</li>
<li>
<p>求一颗dom树的最大深度<br>原理是递归一次，就说明向下走了一层，记录最大值，比较，结束后返回</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getDomDepth = (node) => {
  let max = 1;

  void function fn(d, m) {
    m++;
    Array.from(d.children).forEach(n => {
      if (n.children.length) {
        fn(n, m);
      } else {
        if (max < m) max = m;
      }
    })
  }(node, 1);

  return max;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> getDomDepth = <span class="hljs-function">(<span class="hljs-params">node</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> max = <span class="hljs-number">1</span>;

  <span class="hljs-keyword">void</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">d, m</span>) </span>{
    m++;
    <span class="hljs-built_in">Array</span>.from(d.children).forEach(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (n.children.length) {
        fn(n, m);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (max &lt; m) max = m;
      }
    })
  }(node, <span class="hljs-number">1</span>);

  <span class="hljs-keyword">return</span> max;
}</code></pre>
</li>
</ol>
<p><a href="https://github.com/shiyangzhaoa/easy-tips" rel="nofollow noreferrer" target="_blank">看源码</a>-&gt;<a href="https://github.com/shiyangzhaoa/easy-tips" rel="nofollow noreferrer" target="_blank">看源码</a>-&gt;<a href="https://github.com/shiyangzhaoa/easy-tips" rel="nofollow noreferrer" target="_blank">看源码</a>，<b>帮忙点star ==</b> 遇到不理解的在<code>issues</code>里面提出来，倒数第二题我还没写，因为当晚去看react的东西了，今天又去了前端千人峰会（一个人）。晚点补充。</p>
<p>这些东西也不算简单，如果感到疑惑也没什么，分析出来只是希望能帮助大家理解一些东西，与君共勉，加油～</p>
<p>补充：明天好像是520，可惜我是只单身狗。。。希望大家玩的开心吧</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
记一次XX前端面试

## 原文链接
[https://segmentfault.com/a/1190000014938084](https://segmentfault.com/a/1190000014938084)

