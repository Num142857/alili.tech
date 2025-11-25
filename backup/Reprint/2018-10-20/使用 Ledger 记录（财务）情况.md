---
title: 使用 Ledger 记录（财务）情况
hidden: true
categories: [reprint]
slug: 6bdca400
date: 2018-10-20 00:00:00
---

{{< raw >}}

            <h1><a href="#使用-ledger-记录财务情况"></a>使用 Ledger 记录（财务）情况</h1>
<p>自 2005 年搬到加拿大以来，我使用 <a href="http://www.ledger-cli.org/">Ledger CLI</a> 来跟踪我的财务状况。我喜欢纯文本的方式，它支持虚拟信封意味着我可以同时将我的银行帐户余额和我的虚拟分配到不同的目录下。以下是我们如何使用这些虚拟信封分别管理我们的财务状况。</p>
<p>每个月，我都有一个条目将我生活开支分配到不同的目录中，包括家庭开支的分配。W- 不要求太多， 所以我要谨慎地处理这两者之间的差别和我自己的生活费用。我们处理它的方式是我支付固定金额，这是贷记我支付的杂货。由于我们的杂货总额通常低于我预算的家庭开支，因此任何差异都会留在标签上。我过去常常给他写支票，但最近我只是支付偶尔额外的大笔费用。</p>
<p>这是个示例信封分配：</p>
<pre><code class="hljs mipsasm"><span class="hljs-number">2014</span>.<span class="hljs-number">10</span>.<span class="hljs-number">01</span> * <span class="hljs-keyword">Budget
</span> [Envelopes:Living]
 [Envelopes:Household] $<span class="hljs-number">500</span>
 <span class="hljs-comment">;; More lines go here</span>

</code></pre><p>这是设置的信封规则之一。它鼓励我正确地分类支出。所有支出都从我的 “Play” 信封中取出。</p>
<pre><code class="hljs asciidoc"><span class="hljs-section">= /^Expenses/</span>
<span class="hljs-code"> (Envelopes:Play) -1.0</span>

</code></pre><p>这个为家庭支出报销 “Play” 信封，将金额从 “Household” 信封转移到 “Play” 信封。</p>
<pre><code class="hljs asciidoc"><span class="hljs-section">= /^Expenses:House$/</span>
<span class="hljs-code"> (Envelopes:Play) 1.0</span>
<span class="hljs-code"> (Envelopes:Household) -1.0</span>

</code></pre><p>我有一套定期的支出来模拟我的预算中的家庭开支。例如，这是 10 月份的。</p>
<pre><code class="hljs dts"><span class="hljs-number">2014.10</span><span class="hljs-number">.1</span> * House
<span class="hljs-symbol"> Expenses:</span>House
<span class="hljs-symbol"> Assets:</span>Household $<span class="hljs-number">-500</span>

</code></pre><p>这是杂货交易的形式：</p>
<pre><code class="hljs yaml"><span class="hljs-number">2014.09</span><span class="hljs-number">.28</span> <span class="hljs-string">*</span> <span class="hljs-literal">No</span> <span class="hljs-string">Frills</span>
<span class="hljs-attr"> Assets:</span><span class="hljs-attr">Household:Groceries</span> <span class="hljs-string">$70.45</span>
<span class="hljs-attr"> Liabilities:</span><span class="hljs-attr">MBNA:September</span> <span class="hljs-string">$-70.45</span>


</code></pre><p>接着 <code>ledger bal Assets:Household</code> 就会告诉我是否欠他钱（负余额）。如果我支付大笔费用（例如：机票、通管道），那么正常家庭开支预算会逐渐减少余额。</p>
<p>我从 W- 那找到了一个为我的信用卡交易添加一个月标签的技巧，他还使用 Ledger 跟踪他的交易。它允许我再次检查条目的余额，看看前一个条目是否已被正确清除。</p>
<p>这个资产分类使用有点奇怪，但它在精神上对我有用。</p>
<p>使用 Ledger 以这种方式跟踪它可以让我跟踪我们的杂货费用以及我实际支付费用和我预算费用之间的差额。如果我最终支出超出预期，我可以从更多可自由支配的信封中移动虚拟货币，因此我的预算始终保持平衡。</p>
<p>Ledger 是一个强大的工具。相当极客，但也许更多的工作流描述可能会帮助那些正在搞清楚它的人！</p>
<hr>
<p>via: <a href="http://sachachua.com/blog/2014/11/keeping-financial-score-ledger/">http://sachachua.com/blog/2014/11/keeping-financial-score-ledger/</a></p>
<p>作者：<a href="http://sachachua.com">Sacha Chua</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/keeping-financial-score-with-ledger](https://www.zcfy.cc/article/keeping-financial-score-with-ledger)
原文标题: 使用 Ledger 记录（财务）情况
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
