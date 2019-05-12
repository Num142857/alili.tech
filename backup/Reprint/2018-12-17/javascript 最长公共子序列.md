---
title: 'javascript 最长公共子序列' 
date: 2018-12-17 2:30:07
hidden: true
slug: g6uc6q1k5zs
categories: [reprint]
---

{{< raw >}}

                    
<p>最长公共子序列（Longest Common Subsequence LCS）是从给定的两个序列X和Y中取出尽可能多的一部分字符，按照它们在原序列排列的先后次序排列得到。LCS问题的算法用途广泛，如在软件不同版本的管理中，用LCS算法找到新旧版本的异同处;在软件测试中，用LCS算法对录制和回放的序列进行比较，在基因工程领域，用LCS算法检查患者DNA连与键康DNA链的异同;在防抄袭系统中，用LCS算法检查论文的抄袭率。LCS算法也可以用于程序代码相似度度量，人体运行的序列检索，视频段匹配等方面，所以对LCS算法进行研究具有很高的应用价值。</p>
<h2 id="articleHeader0">基本概念</h2>
<ol>
<li>子序列(subsequence)： 一个特定序列的子序列就是将给定序列中零个或多个元素去掉后得到的结果(不改变元素间相对次序)。例如序列&lt;A,B,C,B,D,A,B&gt;的子序列有：&lt;A,B&gt;、&lt;B,C,A&gt;、&lt;A,B,C,D,A&gt;等。</li>
<li>公共子序列(common subsequence)： 给定序列X和Y，序列Z是X的子序列，也是Y的子序列，则Z是X和Y的公共子序列。例如X=[A,B,C,B,D,A,B]，Y=[B,D,C,A,B,A[，那么序列Z=[B,C,A]为X和Y的公共子序列，其长度为3。但Z不是X和Y的最长公共子序列，而序列[B,C,B,A]和[B,D,A,B]也均为X和Y的最长公共子序列，长度为4，而X和Y不存在长度大于等于5的公共子序列。对于序列[A,B,C]和序列[E,F,G]的公共子序列只有空序列[]。</li>
<li>最长公共子序列：给定序列X和Y，从它们的所有公共子序列中选出长度最长的那一个或几个。</li>
<li>子串： 将一个序列从最前或最后或同时删掉零个或几个字符构成的新系列。区别与子序列，子序列是可以从中间抠掉字符的。cnblogs这个字符串中子序列有多少个呢？很显然有27个，比如其中的cb,cgs等等都是其子序列</li>
</ol>
<p>给一个图再解释一下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012864960?w=585&amp;h=493" src="https://static.alili.tech/img/remote/1460000012864960?w=585&amp;h=493" alt="image_1c3ofq79gg4f1u7sf3o40gls29.png-95.5kB" title="image_1c3ofq79gg4f1u7sf3o40gls29.png-95.5kB" style="cursor: pointer;"></span></p>
<p>我们可以看出子序列不见得一定是连续的，连续的是子串。</p>
<h2 id="articleHeader1">问题分析</h2>
<p>我们还是从一个矩阵开始分析,自己推导出状态迁移方程。</p>
<p>首先，我们把问题转换成前端够为熟悉的概念，不要序列序列地叫了，可以认为是数组或字符串。一切从简，我们就估且认定是两个字符串做比较吧。</p>
<p>我们重点留意”子序列“的概念，它可以删掉多个或零个，也可以全部干掉。这时我们的第一个子序列为<strong>空字符串</strong>（如果我们的序列不是字符串，我们还可以 ）！这个真是千万要注意到！许多人就是看不懂《算法导论》的那个图表，还有许多博客的作者不懂装懂。我们总是从左到右比较，当然了第一个字符串，由于作为矩阵的高，就垂直放置了。</p>
<table>
<thead><tr>
<th>x</th>
<th>""</th>
<th>B</th>
<th>D</th>
<th>C</th>
<th>A</th>
<th>B</th>
<th>A</th>
</tr></thead>
<tbody>
<tr><td colspan="11">""</td></tr>
<tr><td colspan="14">A</td></tr>
<tr><td colspan="14">B</td></tr>
<tr><td colspan="14">C</td></tr>
<tr><td colspan="14">D</td></tr>
<tr><td colspan="14">A</td></tr>
<tr><td colspan="14">B</td></tr>
</tbody>
</table>
<p>假令X ＝ "ABCDAB"， Y＝"BDCABA"，各自取出最短的序列，也就是空字符串与空字符串比较。LCS的方程解为一个数字，那么这个表格也只能填数字。两个空字符串的公同区域的长度为0.</p>
<table>
<thead><tr>
<th>x</th>
<th>""</th>
<th>B</th>
<th>D</th>
<th>C</th>
<th>A</th>
<th>B</th>
<th>A</th>
</tr></thead>
<tbody>
<tr>
<td>""</td>
<td colspan="10">0</td>
</tr>
<tr><td colspan="14">A</td></tr>
<tr><td colspan="14">B</td></tr>
<tr><td colspan="14">C</td></tr>
<tr><td colspan="14">D</td></tr>
<tr><td colspan="14">A</td></tr>
<tr><td colspan="14">B</td></tr>
</tbody>
</table>
<p>然后我们X不动，继续让空字符串出阵，Y让“B”出阵，很显然，它们的公共区域的长度为0. Y换成其他字符， D啊，C啊， 或者， 它们的连续组合DC、 DDC， 情况没有变， 依然为0.  因此第一行都为0.  然后我们Y不动，Y只出空字任串，那么与上面的分析一样，都为0，第一列都是0.</p>
<table>
<thead><tr>
<th>x</th>
<th>""</th>
<th>B</th>
<th>D</th>
<th>C</th>
<th>A</th>
<th>B</th>
<th>A</th>
</tr></thead>
<tbody>
<tr>
<td>""</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
</tr>
<tr>
<td>A</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>B</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>C</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>D</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>A</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>B</td>
<td colspan="13">0</td>
</tr>
</tbody>
</table>
<p>LCS问题与背包问题有点不一样，背包问题还可以设置-1行，而最长公共子序列因为有空子序列的出现，一开始就把左边与上边固定死了。</p>
<p>然后我们再将问题放大些，这次双方都出一个字符，显然只有两都相同时，才有存在不为空字符串的公共子序列，长度也理解数然为1。</p>
<p>A为"X", Y为"BDCA"的子序列的任意一个</p>
<table>
<thead><tr>
<th>x</th>
<th>""</th>
<th>B</th>
<th>D</th>
<th>C</th>
<th>A</th>
<th>B</th>
<th>A</th>
</tr></thead>
<tbody>
<tr>
<td>""</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
</tr>
<tr>
<td>A</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td colspan="5">1</td>
</tr>
<tr>
<td>B</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>C</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>D</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>A</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>B</td>
<td colspan="13">0</td>
</tr>
</tbody>
</table>
<p>继续往右填空，该怎么填？显然，LCS不能大于X的长度，Y的从A字符串开始的子序列与B的A序列相比，怎么也能等于1。</p>
<table>
<thead><tr>
<th>x</th>
<th>""</th>
<th>B</th>
<th>D</th>
<th>C</th>
<th>A</th>
<th>B</th>
<th>A</th>
</tr></thead>
<tbody>
<tr>
<td>""</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
</tr>
<tr>
<td>A</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>B</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>C</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>D</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>A</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>B</td>
<td colspan="13">0</td>
</tr>
</tbody>
</table>
<p>如果X只从派出前面个字符A,B吧，亦即是“”，“A”, "B", "AB"这四种组合，前两个已经解说过了。那我们先看B，${X_1} == ${Y_0}， 我们得到一个新的公共子串了，应该加1。为什么呢？因为我们这个矩阵是一个状态表，从左到右，从上到下描述状态的迁移过程，并且这些状态是基于已有状态<strong>累加</strong>出来的。<strong>现在我们需要确认的是，现在我们要填的这个格子的值与它周围已经填好的格子的值是存在何种关系</strong>。目前，信息太少，就是一个孤点，直接填1。</p>
<table>
<thead><tr>
<th>x</th>
<th>""</th>
<th>B</th>
<th>D</th>
<th>C</th>
<th>A</th>
<th>B</th>
<th>A</th>
</tr></thead>
<tbody>
<tr>
<td>""</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
</tr>
<tr>
<td>A</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>B</td>
<td>0</td>
<td colspan="12">1</td>
</tr>
<tr>
<td>C</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>D</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>A</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>B</td>
<td colspan="13">0</td>
</tr>
</tbody>
</table>
<p>然后我们让Y多出一个D做帮手，{"",A,B,AB} vs {"",B,D,BD}，显然，继续填1. 一直填到Y的第二个B之前，都是1。 因为到BDCAB时，它们有另一个公共子序列，AB。</p>
<table>
<thead><tr>
<th>x</th>
<th>""</th>
<th>B</th>
<th>D</th>
<th>C</th>
<th>A</th>
<th>B</th>
<th>A</th>
</tr></thead>
<tbody>
<tr>
<td>""</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
</tr>
<tr>
<td>A</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>B</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td colspan="4">2</td>
</tr>
<tr>
<td>C</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>D</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>A</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>B</td>
<td colspan="13">0</td>
</tr>
</tbody>
</table>
<p>到这一步，我们可以总结一些规则了，之后就是通过计算验证我们的想法，加入新的规则或限定条件来完善。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012864990?w=679&amp;h=99" src="https://static.alili.tech/img/remote/1460000012864990?w=679&amp;h=99" alt="image_1c3vdki881bpc127h1rdu11tu128b9.png-22.9kB" title="image_1c3vdki881bpc127h1rdu11tu128b9.png-22.9kB" style="cursor: pointer; display: inline;"></span><br>Y将所有字符派上去，X依然是2个字符，经仔细观察，还是填2.</p>
<p>看五行，X再多派一个C，ABC的子序列集合比AB的子序列集合大一些，那么它与Y的B子序列集合大一些，就算不大，就不能比原来的小。显然新增的C不能成为战力，不是两者的公共字符，因此值应该等于AB的子序列集合。</p>
<table>
<thead><tr>
<th>×</th>
<th>""</th>
<th>B</th>
<th>D</th>
<th>C</th>
<th>A</th>
<th>B</th>
<th>A</th>
</tr></thead>
<tbody>
<tr>
<td>""</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
</tr>
<tr>
<td>A</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>B</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>2</td>
<td>2</td>
</tr>
<tr>
<td>C</td>
<td>0</td>
<td colspan="11">1</td>
</tr>
<tr>
<td>D</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>A</td>
<td colspan="13">0</td>
</tr>
<tr>
<td>B</td>
<td colspan="13">0</td>
</tr>
</tbody>
</table>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012864961?w=648&amp;h=320" src="https://static.alili.tech/img/remote/1460000012864961?w=648&amp;h=320" alt="image_1c3tbtfjjmhm17n6gt5mkt1s0h9.png-27.8kB" title="image_1c3tbtfjjmhm17n6gt5mkt1s0h9.png-27.8kB" style="cursor: pointer; display: inline;"></span></p>
<p>并且我们可以确定，如果两个字符串要比较的字符不一样，那么要填的格子是与其左边或上边有关，那边大就取那个。</p>
<p>如果比较的字符一样呢，稍安毋躁，刚好X的C要与Y的C进行比较，即ABC的子序列集合{"",A,B,C,AB,BC,ABC}与BDC的子序列集合｛"",B,D,C,BD,DC,BDC｝比较，得到公共子串有“”,B,D 。这时还是与之前的结论一样，当字符相等时，它对应的格子值等于左边与右边与左上角的值，并且左边，上边，左上边总是相等的。这些奥秘需要更严格的数学知识来论证。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="假设有两个数组，A和B。A[i]为A的第i个元素，A(i)为由A的第一个元素到第i个元素所组成的前缀。m(i, j)为A(i)和B(j)的最长公共子序列长度。

由于算法本身的递推性质，其实只要证明，对于某个i和j：

  m(i, j) = m(i-1, j-1) + 1 （当A[i] = B[j]时）

  m(i, j) = max( m(i-1, j), m(i, j-1) ) （当A[i] != B[j]时）

第一个式子很好证明，即当A[i] = B[j]时。可以用反证，假设m(i, j) > m(i-1, j-1) + 1 （m(i, j)不可能小于m(i-1, j-1) + 1，原因很明显），那么可以推出m(i-1, j-1)不是最长的这一矛盾结果。

第二个有些trick。当A[i] != B[j]时，还是反证，假设m(i, j) > max( m(i-1, j), m(i, j-1) )。

由反证假设，可得m(i, j) > m(i-1, j)。这个可以推出A[i]一定在m(i, j)对应的LCS序列中（反证可得）。而由于A[i] != B[j]，故B[j]一定不在m(i, j)对应的LCS序列中。所以可推出m(i, j) = m(i, j-1)。这就推出了与反正假设矛盾的结果。

得证。

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code>假设有两个数组，A和B。A[i]为A的第<span class="hljs-built_in">i</span>个元素，A(<span class="hljs-built_in">i</span>)为由A的第一个元素到第<span class="hljs-built_in">i</span>个元素所组成的前缀。m(<span class="hljs-built_in">i</span>, <span class="hljs-built_in">j</span>)为A(<span class="hljs-built_in">i</span>)和B(<span class="hljs-built_in">j</span>)的最长公共子序列长度。

由于算法本身的递推性质，其实只要证明，对于某个<span class="hljs-built_in">i</span>和<span class="hljs-built_in">j</span>：

  m(<span class="hljs-built_in">i</span>, <span class="hljs-built_in">j</span>) = m(<span class="hljs-built_in">i</span><span class="hljs-number">-1</span>, <span class="hljs-built_in">j</span><span class="hljs-number">-1</span>) + <span class="hljs-number">1</span> （当A[i] = B[j]时）

  m(<span class="hljs-built_in">i</span>, <span class="hljs-built_in">j</span>) = max( m(<span class="hljs-built_in">i</span><span class="hljs-number">-1</span>, <span class="hljs-built_in">j</span>), m(<span class="hljs-built_in">i</span>, <span class="hljs-built_in">j</span><span class="hljs-number">-1</span>) ) （当A[i] != B[j]时）

第一个式子很好证明，即当A[i] = B[j]时。可以用反证，假设m(<span class="hljs-built_in">i</span>, <span class="hljs-built_in">j</span>) &gt; m(<span class="hljs-built_in">i</span><span class="hljs-number">-1</span>, <span class="hljs-built_in">j</span><span class="hljs-number">-1</span>) + <span class="hljs-number">1</span> （m(<span class="hljs-built_in">i</span>, <span class="hljs-built_in">j</span>)不可能小于m(<span class="hljs-built_in">i</span><span class="hljs-number">-1</span>, <span class="hljs-built_in">j</span><span class="hljs-number">-1</span>) + <span class="hljs-number">1</span>，原因很明显），那么可以推出m(<span class="hljs-built_in">i</span><span class="hljs-number">-1</span>, <span class="hljs-built_in">j</span><span class="hljs-number">-1</span>)不是最长的这一矛盾结果。

第二个有些trick。当A[i] != B[j]时，还是反证，假设m(<span class="hljs-built_in">i</span>, <span class="hljs-built_in">j</span>) &gt; max( m(<span class="hljs-built_in">i</span><span class="hljs-number">-1</span>, <span class="hljs-built_in">j</span>), m(<span class="hljs-built_in">i</span>, <span class="hljs-built_in">j</span><span class="hljs-number">-1</span>) )。

由反证假设，可得m(<span class="hljs-built_in">i</span>, <span class="hljs-built_in">j</span>) &gt; m(<span class="hljs-built_in">i</span><span class="hljs-number">-1</span>, <span class="hljs-built_in">j</span>)。这个可以推出A[i]一定在m(<span class="hljs-built_in">i</span>, <span class="hljs-built_in">j</span>)对应的LCS序列中（反证可得）。而由于A[i] != B[j]，故B[j]一定不在m(<span class="hljs-built_in">i</span>, <span class="hljs-built_in">j</span>)对应的LCS序列中。所以可推出m(<span class="hljs-built_in">i</span>, <span class="hljs-built_in">j</span>) = m(<span class="hljs-built_in">i</span>, <span class="hljs-built_in">j</span><span class="hljs-number">-1</span>)。这就推出了与反正假设矛盾的结果。

得证。

</code></pre>
<p>我们现在用下面的方程来继续填表了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012864991?w=720&amp;h=131" src="https://static.alili.tech/img/remote/1460000012864991?w=720&amp;h=131" alt="image_1c3vdljfs1g5p1s5lpppcln1s88m.png-36.7kB" title="image_1c3vdljfs1g5p1s5lpppcln1s88m.png-36.7kB" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">程序实现</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by 司徒正美
function LCS(str1, str2){
        var rows =  str1.split(&quot;&quot;)
        rows.unshift(&quot;&quot;)
        var cols =  str2.split(&quot;&quot;)
        cols.unshift(&quot;&quot;)
        var m = rows.length 
        var n = cols.length 
        var dp = []
        for(var i = 0; i < m; i++){ 
            dp[i] = []
            for(var j = 0; j < n; j++){ 
                if(i === 0 || j === 0){
                    dp[i][j] = 0
                    continue
                }
              
                if(rows[i] === cols[j]){ 
                    dp[i][j] = dp[i-1][j-1] + 1 //对角＋1
                }else{
                    dp[i][j] = Math.max( dp[i-1][j], dp[i][j-1]) //对左边，上边取最大
                }
            }
            console.log(dp[i].join(&quot;&quot;))//调试
        } 
        return dp[i-1][j-1]
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//by 司徒正美</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">LCS</span>(<span class="hljs-params">str1, str2</span>)</span>{
        <span class="hljs-keyword">var</span> rows =  str1.split(<span class="hljs-string">""</span>)
        rows.unshift(<span class="hljs-string">""</span>)
        <span class="hljs-keyword">var</span> cols =  str2.split(<span class="hljs-string">""</span>)
        cols.unshift(<span class="hljs-string">""</span>)
        <span class="hljs-keyword">var</span> m = rows.length 
        <span class="hljs-keyword">var</span> n = cols.length 
        <span class="hljs-keyword">var</span> dp = []
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; m; i++){ 
            dp[i] = []
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; n; j++){ 
                <span class="hljs-keyword">if</span>(i === <span class="hljs-number">0</span> || j === <span class="hljs-number">0</span>){
                    dp[i][j] = <span class="hljs-number">0</span>
                    <span class="hljs-keyword">continue</span>
                }
              
                <span class="hljs-keyword">if</span>(rows[i] === cols[j]){ 
                    dp[i][j] = dp[i<span class="hljs-number">-1</span>][j<span class="hljs-number">-1</span>] + <span class="hljs-number">1</span> <span class="hljs-comment">//对角＋1</span>
                }<span class="hljs-keyword">else</span>{
                    dp[i][j] = <span class="hljs-built_in">Math</span>.max( dp[i<span class="hljs-number">-1</span>][j], dp[i][j<span class="hljs-number">-1</span>]) <span class="hljs-comment">//对左边，上边取最大</span>
                }
            }
            <span class="hljs-built_in">console</span>.log(dp[i].join(<span class="hljs-string">""</span>))<span class="hljs-comment">//调试</span>
        } 
        <span class="hljs-keyword">return</span> dp[i<span class="hljs-number">-1</span>][j<span class="hljs-number">-1</span>]
    }</code></pre>
<p>LCS可以进一步简化，只要通过挪位置，省去新数组的生成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by司徒正美
function LCS(str1, str2){
    var m = str1.length 
    var n = str2.length
    var dp = [new Array(n+1).fill(0)] //第一行全是0
    for(var i = 1; i <= m; i++){ //一共有m+1行
        dp[i] = [0] //第一列全是0
        for(var j = 1; j <= n; j++){//一共有n+1列
            if(str1[i-1] === str2[j-1]){ 
                //注意这里，str1的第一个字符是在第二列中，因此要减1，str2同理
                dp[i][j] = dp[i-1][j-1] + 1 //对角＋1
            } else {
                 dp[i][j] = Math.max( dp[i-1][j], dp[i][j-1]) 
            }
        }
    } 
    return dp[m][n];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//by司徒正美</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">LCS</span>(<span class="hljs-params">str1, str2</span>)</span>{
    <span class="hljs-keyword">var</span> m = str1.length 
    <span class="hljs-keyword">var</span> n = str2.length
    <span class="hljs-keyword">var</span> dp = [<span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(n+<span class="hljs-number">1</span>).fill(<span class="hljs-number">0</span>)] <span class="hljs-comment">//第一行全是0</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= m; i++){ <span class="hljs-comment">//一共有m+1行</span>
        dp[i] = [<span class="hljs-number">0</span>] <span class="hljs-comment">//第一列全是0</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">1</span>; j &lt;= n; j++){<span class="hljs-comment">//一共有n+1列</span>
            <span class="hljs-keyword">if</span>(str1[i<span class="hljs-number">-1</span>] === str2[j<span class="hljs-number">-1</span>]){ 
                <span class="hljs-comment">//注意这里，str1的第一个字符是在第二列中，因此要减1，str2同理</span>
                dp[i][j] = dp[i<span class="hljs-number">-1</span>][j<span class="hljs-number">-1</span>] + <span class="hljs-number">1</span> <span class="hljs-comment">//对角＋1</span>
            } <span class="hljs-keyword">else</span> {
                 dp[i][j] = <span class="hljs-built_in">Math</span>.max( dp[i<span class="hljs-number">-1</span>][j], dp[i][j<span class="hljs-number">-1</span>]) 
            }
        }
    } 
    <span class="hljs-keyword">return</span> dp[m][n];
}</code></pre>
<h2 id="articleHeader3">打印一个LCS</h2>
<p>我们再给出打印函数，先看如何打印一个。我们从右下角开始寻找，一直找到最上一行终止。因此目标字符串的构建是倒序。为了避免使用stringBuffer这样麻烦的中间量，我们可以通过递归实现，每次执行程序时，只返回一个字符串，没有则返回一个空字符串， 以<code>printLCS(x,y,...) + str[i]</code>相加，就可以得到我们要求的字符串。</p>
<p>我们再写出一个方法，来验证我们得到的字符串是否真正的LCS字符串。作为一个已经工作的人，不能写的代码像在校生那样，不做单元测试就放到线上让别人踩坑。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by 司徒正美，打印一个LCS
function printLCS(dp, str1, str2, i, j){
    if (i == 0 || j == 0){
        return &quot;&quot;;
    }
    if( str1[i-1] == str2[j-1] ){
        return printLCS(dp, str1, str2, i-1, j-1) + str1[i-1];
    }else{
        if (dp[i][j-1] > dp[i-1][j]){
            return printLCS(dp, str1, str2, i, j-1);
        }else{
            return printLCS(dp, str1, str2, i-1, j);
        }
    }
}
//by司徒正美， 将目标字符串转换成正则，验证是否为之前两个字符串的LCS
function validateLCS(el, str1, str2){
   var re =  new RegExp( el.split(&quot;&quot;).join(&quot;.*&quot;) )
   console.log(el, re.test(str1),re.test(str2))
   return re.test(str1) &amp;&amp; re.test(str2)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>//<span class="hljs-keyword">by </span>司徒正美，打印一个LCS
<span class="hljs-symbol">function</span> printLCS(dp, <span class="hljs-keyword">str1, </span><span class="hljs-keyword">str2, </span>i, j){
    <span class="hljs-meta">if</span> (i == <span class="hljs-number">0</span> <span class="hljs-title">||</span> j == <span class="hljs-number">0</span>){
        return <span class="hljs-string">""</span><span class="hljs-comment">;</span>
    }
    <span class="hljs-meta">if</span>( <span class="hljs-keyword">str1[i-1] </span>== <span class="hljs-keyword">str2[j-1] </span>){
        return printLCS(dp, <span class="hljs-keyword">str1, </span><span class="hljs-keyword">str2, </span>i-<span class="hljs-number">1</span>, j-<span class="hljs-number">1</span>) + <span class="hljs-keyword">str1[i-1];
</span>    }<span class="hljs-meta">else</span>{
        <span class="hljs-meta">if</span> (dp[i][j-<span class="hljs-number">1</span>] &gt; dp[i-<span class="hljs-number">1</span>][j]){
            return printLCS(dp, <span class="hljs-keyword">str1, </span><span class="hljs-keyword">str2, </span>i, j-<span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
        }<span class="hljs-meta">else</span>{
            return printLCS(dp, <span class="hljs-keyword">str1, </span><span class="hljs-keyword">str2, </span>i-<span class="hljs-number">1</span>, j)<span class="hljs-comment">;</span>
        }
    }
}
//<span class="hljs-keyword">by司徒正美， </span>将目标字符串转换成正则，验证是否为之前两个字符串的LCS
<span class="hljs-symbol">function</span> validateLCS(el, <span class="hljs-keyword">str1, </span><span class="hljs-keyword">str2){
</span>   var re =  new RegExp( el.split(<span class="hljs-string">""</span>).join(<span class="hljs-string">".*"</span>) )
   console.log(el, re.test(<span class="hljs-keyword">str1),re.test(str2))
</span>   return re.test(<span class="hljs-keyword">str1) </span>&amp;&amp; re.test(<span class="hljs-keyword">str2)
</span>}</code></pre>
<p>使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function LCS(str1, str2){
    var m = str1.length 
    var n = str2.length
    //....略，自行补充
    var s = printLCS(dp, str1, str2, m, n)
    validateLCS(s, str1, str2)
    return dp[m][n]
}
var c1 = LCS( &quot;ABCBDAB&quot;,&quot;BDCABA&quot;);
console.log(c1) //4 BCBA、BCAB、BDAB
var c2 = LCS(&quot;13456778&quot; , &quot;357486782&quot; );
console.log(c2) //5 34678 
var c3 = LCS(&quot;ACCGGTCGAGTGCGCGGAAGCCGGCCGAA&quot; ,&quot;GTCGTTCGGAATGCCGTTGCTCTGTAAA&quot; );
console.log(c3) //20 GTCGTCGGAAGCCGGCCGAA" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">LCS</span>(<span class="hljs-params">str1, str2</span>)</span>{
    <span class="hljs-keyword">var</span> m = str1.length 
    <span class="hljs-keyword">var</span> n = str2.length
    <span class="hljs-comment">//....略，自行补充</span>
    <span class="hljs-keyword">var</span> s = printLCS(dp, str1, str2, m, n)
    validateLCS(s, str1, str2)
    <span class="hljs-keyword">return</span> dp[m][n]
}
<span class="hljs-keyword">var</span> c1 = LCS( <span class="hljs-string">"ABCBDAB"</span>,<span class="hljs-string">"BDCABA"</span>);
<span class="hljs-built_in">console</span>.log(c1) <span class="hljs-comment">//4 BCBA、BCAB、BDAB</span>
<span class="hljs-keyword">var</span> c2 = LCS(<span class="hljs-string">"13456778"</span> , <span class="hljs-string">"357486782"</span> );
<span class="hljs-built_in">console</span>.log(c2) <span class="hljs-comment">//5 34678 </span>
<span class="hljs-keyword">var</span> c3 = LCS(<span class="hljs-string">"ACCGGTCGAGTGCGCGGAAGCCGGCCGAA"</span> ,<span class="hljs-string">"GTCGTTCGGAATGCCGTTGCTCTGTAAA"</span> );
<span class="hljs-built_in">console</span>.log(c3) <span class="hljs-comment">//20 GTCGTCGGAAGCCGGCCGAA</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012864962?w=398&amp;h=123" src="https://static.alili.tech/img/remote/1460000012864962?w=398&amp;h=123" alt="image_1c3v0n1qnhq1sqa36min2goi16.png-11.6kB" title="image_1c3v0n1qnhq1sqa36min2goi16.png-11.6kB" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">打印全部LCS</h2>
<p>思路与上面差不多，我们注意一下，在LCS方法有一个Math.max取值，这其实是整合了三种情况，因此可以分叉出三个字符串。我们的方法将返回一个es6集合对象，方便自动去掉。然后每次都用新的集合合并旧的集合的字任串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by 司徒正美 打印所有LCS
function printAllLCS(dp, str1, str2, i, j){
    if (i == 0 || j == 0){
        return new Set([&quot;&quot;])
    }else if(str1[i-1] == str2[j-1]){
        var newSet = new Set()
        printAllLCS(dp, str1, str2, i-1, j-1).forEach(function(el){
            newSet.add(el + str1[i-1])
        })
        return newSet
    }else{
        var set = new Set()
        if (dp[i][j-1] >= dp[i-1][j]){
            printAllLCS(dp, str1, str2, i, j-1).forEach(function(el){
              set.add(el)
            })
        }
        if (dp[i-1][j] >= dp[i][j-1]){//必须用>=，不能简单一个else搞定
            printAllLCS(dp, str1, str2, i-1, j).forEach(function(el){
              set.add(el)
            })
        }   
        return set
    } 
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>//by 司徒正美 打印所有LCS
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printAllLCS</span><span class="hljs-params">(dp, str1, str2, i, j)</span>{</span>
    <span class="hljs-keyword">if</span> (i == <span class="hljs-number">0</span> || <span class="hljs-keyword">j</span> == <span class="hljs-number">0</span>){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Set([<span class="hljs-string">""</span>])
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(str1[i-<span class="hljs-number">1</span>] == str2[<span class="hljs-keyword">j</span>-<span class="hljs-number">1</span>]){
        var newSet = <span class="hljs-keyword">new</span> Set()
        printAllLCS(<span class="hljs-keyword">dp</span>, str1, str2, i-<span class="hljs-number">1</span>, <span class="hljs-keyword">j</span>-<span class="hljs-number">1</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el)</span>{</span>
            newSet.<span class="hljs-built_in">add</span>(<span class="hljs-keyword">el</span> + str1[i-<span class="hljs-number">1</span>])
        })
        <span class="hljs-keyword">return</span> newSet
    }<span class="hljs-keyword">else</span>{
        var <span class="hljs-keyword">set</span> = <span class="hljs-keyword">new</span> Set()
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">dp</span>[i][<span class="hljs-keyword">j</span>-<span class="hljs-number">1</span>] &gt;= <span class="hljs-keyword">dp</span>[i-<span class="hljs-number">1</span>][<span class="hljs-keyword">j</span>]){
            printAllLCS(<span class="hljs-keyword">dp</span>, str1, str2, i, <span class="hljs-keyword">j</span>-<span class="hljs-number">1</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el)</span>{</span>
              <span class="hljs-keyword">set</span>.<span class="hljs-built_in">add</span>(<span class="hljs-keyword">el</span>)
            })
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">dp</span>[i-<span class="hljs-number">1</span>][<span class="hljs-keyword">j</span>] &gt;= <span class="hljs-keyword">dp</span>[i][<span class="hljs-keyword">j</span>-<span class="hljs-number">1</span>]){//必须用&gt;=，不能简单一个<span class="hljs-keyword">else</span>搞定
            printAllLCS(<span class="hljs-keyword">dp</span>, str1, str2, i-<span class="hljs-number">1</span>, <span class="hljs-keyword">j</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el)</span>{</span>
              <span class="hljs-keyword">set</span>.<span class="hljs-built_in">add</span>(<span class="hljs-keyword">el</span>)
            })
        }   
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">set</span>
    } 
 }</code></pre>
<p>使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function LCS(str1, str2){
    var m = str1.length 
    var n = str2.length
    //....略，自行补充
    var s =  printAllLCS(dp, str1, str2, m, n)
    console.log(s)
    s.forEach(function(el){
        validateLCS(el,str1, str2)
        console.log(&quot;输出LCS&quot;,el)
    })
    return dp[m][n]
}
var c1 = LCS( &quot;ABCBDAB&quot;,&quot;BDCABA&quot;);
console.log(c1) //4 BCBA、BCAB、BDAB
var c2 = LCS(&quot;13456778&quot; , &quot;357486782&quot; );
console.log(c2) //5 34678 
var c3 = LCS(&quot;ACCGGTCGAGTGCGCGGAAGCCGGCCGAA&quot; ,&quot;GTCGTTCGGAATGCCGTTGCTCTGTAAA&quot; );
console.log(c3) //20 GTCGTCGGAAGCCGGCCGAA" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">LCS</span>(<span class="hljs-params">str1, str2</span>)</span>{
    <span class="hljs-keyword">var</span> m = str1.length 
    <span class="hljs-keyword">var</span> n = str2.length
    <span class="hljs-comment">//....略，自行补充</span>
    <span class="hljs-keyword">var</span> s =  printAllLCS(dp, str1, str2, m, n)
    <span class="hljs-built_in">console</span>.log(s)
    s.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{
        validateLCS(el,str1, str2)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"输出LCS"</span>,el)
    })
    <span class="hljs-keyword">return</span> dp[m][n]
}
<span class="hljs-keyword">var</span> c1 = LCS( <span class="hljs-string">"ABCBDAB"</span>,<span class="hljs-string">"BDCABA"</span>);
<span class="hljs-built_in">console</span>.log(c1) <span class="hljs-comment">//4 BCBA、BCAB、BDAB</span>
<span class="hljs-keyword">var</span> c2 = LCS(<span class="hljs-string">"13456778"</span> , <span class="hljs-string">"357486782"</span> );
<span class="hljs-built_in">console</span>.log(c2) <span class="hljs-comment">//5 34678 </span>
<span class="hljs-keyword">var</span> c3 = LCS(<span class="hljs-string">"ACCGGTCGAGTGCGCGGAAGCCGGCCGAA"</span> ,<span class="hljs-string">"GTCGTTCGGAATGCCGTTGCTCTGTAAA"</span> );
<span class="hljs-built_in">console</span>.log(c3) <span class="hljs-comment">//20 GTCGTCGGAAGCCGGCCGAA</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012864963?w=392&amp;h=404" src="https://static.alili.tech/img/remote/1460000012864963?w=392&amp;h=404" alt="image_1c3v1al221m5l1cdlmui48vd831j.png-54.5kB" title="image_1c3v1al221m5l1cdlmui48vd831j.png-54.5kB" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">空间优化</h2>
<p>使用滚动数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function LCS(str1, str2){
    var m = str1.length 
    var n = str2.length
    var dp = [new Array(n+1).fill(0)],now = 1，row //第一行全是0
    for(var i = 1; i <= m; i++){ //一共有2行
        row = dp[now] = [0] //第一列全是0
        for(var j = 1; j <= n; j++){//一共有n+1列
            if(str1[i-1] === str2[j-1]){ 
                //注意这里，str1的第一个字符是在第二列中，因此要减1，str2同理
                dp[now][j] = dp[i-now][j-1] + 1 //对角＋1
            } else {
                dp[now][j] = Math.max( dp[i-now][j], dp[now][j-1]) 
            }
        }
        now = 1- now; //1-1=>0;1-0=>1; 1-1=>0 ...
    } 
    return row ? row[n]: 0
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>function LCS(str1, str2){
    <span class="hljs-built_in">var</span> m = str1.length 
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">n</span> = str2.length
    <span class="hljs-built_in">var</span> dp = [new Array(<span class="hljs-built_in">n</span>+<span class="hljs-number">1</span>).fill(<span class="hljs-number">0</span>)],<span class="hljs-built_in">now</span> = <span class="hljs-number">1</span>，<span class="hljs-built_in">row</span> //第一行全是<span class="hljs-number">0</span>
    for(<span class="hljs-built_in">var</span> i = <span class="hljs-number">1</span>; i &lt;= m; i++){ //一共有<span class="hljs-number">2</span>行
        <span class="hljs-built_in">row</span> = dp[<span class="hljs-built_in">now</span>] = [<span class="hljs-number">0</span>] //第一列全是<span class="hljs-number">0</span>
        for(<span class="hljs-built_in">var</span> j = <span class="hljs-number">1</span>; j &lt;= <span class="hljs-built_in">n</span>; j++){//一共有<span class="hljs-built_in">n</span>+<span class="hljs-number">1</span>列
            <span class="hljs-built_in">if</span>(str1[i-<span class="hljs-number">1</span>] === str2[j-<span class="hljs-number">1</span>]){ 
                //注意这里，str1的第一个字符是在第二列中，因此要减<span class="hljs-number">1</span>，str2同理
                dp[<span class="hljs-built_in">now</span>][j] = dp[i-<span class="hljs-built_in">now</span>][j-<span class="hljs-number">1</span>] + <span class="hljs-number">1</span> //对角＋<span class="hljs-number">1</span>
            } else {
                dp[<span class="hljs-built_in">now</span>][j] = Math.max( dp[i-<span class="hljs-built_in">now</span>][j], dp[<span class="hljs-built_in">now</span>][j-<span class="hljs-number">1</span>]) 
            }
        }
        <span class="hljs-built_in">now</span> = <span class="hljs-number">1</span>- <span class="hljs-built_in">now</span>; //<span class="hljs-number">1</span>-<span class="hljs-number">1</span>=&gt;<span class="hljs-number">0</span>;<span class="hljs-number">1</span>-<span class="hljs-number">0</span>=&gt;<span class="hljs-number">1</span>; <span class="hljs-number">1</span>-<span class="hljs-number">1</span>=&gt;<span class="hljs-number">0</span> ...
    } 
    return <span class="hljs-built_in">row</span> ? <span class="hljs-built_in">row</span>[<span class="hljs-built_in">n</span>]<span class="hljs-symbol">:</span> <span class="hljs-number">0</span>
}</code></pre>
<h2 id="articleHeader6">危险的递归解法</h2>
<p>str1的一个子序列相应于下标序列{1, 2, …, m}的一个子序列，因此，str1共有${2^m}$个不同子序列（str2亦如此，如为${2^n}$），因此复杂度达到惊人的指数时间（${2^m * 2^n}$）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//警告，字符串的长度一大就会爆栈
function LCS(str1, str2, a, b) {
      if(a === void 0){
          a = str1.length - 1
      }
      if(b === void 0){
          b = str2.length - 1
      }
      if(a == -1 || b == -1){
          return 0
      } 
      if(str1[a] == str2[b]) {
         return LCS(str1, str2,  a-1, b-1)+1;
      }
      if(str1[a] != str2[b]) {
         var x =  LCS(str1, str2, a, b-1)
         var y =  LCS(str1, str2, a-1, b)
         return x >= y ? x : y
      }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>//警告，字符串的长度一大就会爆栈
<span class="hljs-symbol">function</span> LCS(<span class="hljs-keyword">str1, </span><span class="hljs-keyword">str2, </span>a, <span class="hljs-keyword">b) </span>{
      <span class="hljs-meta">if</span>(a === void <span class="hljs-number">0</span>){
          a = <span class="hljs-keyword">str1.length </span>- <span class="hljs-number">1</span>
      }
      <span class="hljs-meta">if</span>(<span class="hljs-keyword">b </span>=== void <span class="hljs-number">0</span>){
          <span class="hljs-keyword">b </span>= <span class="hljs-keyword">str2.length </span>- <span class="hljs-number">1</span>
      }
      <span class="hljs-meta">if</span>(a == -<span class="hljs-number">1</span> <span class="hljs-title">||</span> <span class="hljs-keyword">b </span>== -<span class="hljs-number">1</span>){
          return <span class="hljs-number">0</span>
      } 
      <span class="hljs-meta">if</span>(<span class="hljs-keyword">str1[a] </span>== <span class="hljs-keyword">str2[b]) </span>{
         return LCS(<span class="hljs-keyword">str1, </span><span class="hljs-keyword">str2, </span> a-<span class="hljs-number">1</span>, <span class="hljs-keyword">b-1)+1;
</span>      }
      <span class="hljs-meta">if</span>(<span class="hljs-keyword">str1[a] </span>!= <span class="hljs-keyword">str2[b]) </span>{
         var x =  LCS(<span class="hljs-keyword">str1, </span><span class="hljs-keyword">str2, </span>a, <span class="hljs-keyword">b-1)
</span>         var y =  LCS(<span class="hljs-keyword">str1, </span><span class="hljs-keyword">str2, </span>a-<span class="hljs-number">1</span>, <span class="hljs-keyword">b)
</span>         return x &gt;= y ? x : y
      }
  }</code></pre>
<h2 id="articleHeader7">参考链接</h2>
<ol>
<li><a href="http://blog.csdn.net/hrn1216/article/details/51534607" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/hrn1216/...</a></li>
<li><a href="https://segmentfault.com/a/1190000002641054">https://segmentfault.com/a/11...</a></li>
<li><a href="https://www.cnblogs.com/ider/p/longest-common-substring-problem-optimization.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/ider/...</a></li>
<li><a href="http://www.cppblog.com/mysileng/archive/2013/05/14/200265.html" rel="nofollow noreferrer" target="_blank">http://www.cppblog.com/mysile...</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript 最长公共子序列

## 原文链接
[https://segmentfault.com/a/1190000012864957](https://segmentfault.com/a/1190000012864957)

