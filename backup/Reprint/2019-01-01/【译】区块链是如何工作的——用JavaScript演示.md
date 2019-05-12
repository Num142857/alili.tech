---
title: '【译】区块链是如何工作的——用JavaScript演示' 
date: 2019-01-01 2:30:07
hidden: true
slug: 8n4b8ip1q0b
categories: [reprint]
---

{{< raw >}}

                    
<p>原文：<a href="https://medium.freecodecamp.org/how-does-blockchain-really-work-i-built-an-app-to-show-you-6b70cd4caf7d" rel="nofollow noreferrer" target="_blank">How does blockchain really work? I built an app to show you.</a><br>作者：<a href="https://medium.freecodecamp.org/@seanseany?source=post_header_lockup" rel="nofollow noreferrer" target="_blank">Sean Han</a><br>译者：<a href="http://weibo.com/jly199518" rel="nofollow noreferrer" target="_blank">JeLewine</a></p>
<p>根据维基百科，区块链是：</p>
<blockquote><p>一个用于维护不断增长的记录列表的分布式数据库，我们称之为区块链。</p></blockquote>
<p>这听起来很棒，那它是如何工作的呢？</p>
<p>为了说明区块链，我们将会使用一个名为Blockchain CLI的开源命令行工具。</p>
<p>我同时也建立了一个<a href="http://blockchaindemo.io/" rel="nofollow noreferrer" target="_blank">基于浏览器的版本</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011104650" src="https://static.alili.tech/img/remote/1460000011104650" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">安装命令行工具</h2>
<p>在此之前请先安装<a href="https://nodejs.org/download/" rel="nofollow noreferrer" target="_blank">Node.js</a></p>
<p>然后在你的命令行中运行以下指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install blockchain-cli -g
blockchain" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>npm <span class="hljs-keyword">install </span><span class="hljs-keyword">blockchain-cli </span>-g
<span class="hljs-keyword">blockchain</span></code></pre>
<p>你应该会看到<code>? Welcome to Blockchain CLI!</code>和一个<code>blockchain →</code>提示。这说明已经准备好了。</p>
<h2 id="articleHeader1">区块长什么样？</h2>
<p>想要查看当前的区块链，你需要在命令提示行下输入<code>blockchain</code>或者<code>bc</code>。你应该会看到像下面的图片一样的一个区块。<br><span class="img-wrap"><img data-src="/img/remote/1460000011104651" src="https://static.alili.tech/img/remote/1460000011104651" alt="区块链上的一个区块" title="区块链上的一个区块" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>Index：是哪一个区块（创世块的索引是0）？</p></li>
<li><p>Hash：块是否有效？</p></li>
<li><p>Previous Hash：前一个区块是否有效？</p></li>
<li><p>Timestamp：什么时候添加的区块？</p></li>
<li><p>Data：什么信息存储在区块上？</p></li>
<li><p>Nonce：在找到有效区块之前，我们进行了多少次迭代？</p></li>
</ul>
<h4>创世块</h4>
<p>每一个区块链都是从<code>? Genesis Block</code>开始的。正如你们将要在后面看到的，区块链上的每一个区块都依赖于前一个区块。所以，需要创世块来挖出我们的第一个区块。</p>
<h2 id="articleHeader2">当一个新的区块被开采时会发生什么？</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011104652" src="https://static.alili.tech/img/remote/1460000011104652" alt="" title="" style="cursor: pointer; display: inline;"></span><br>让我们挖出我们的第一个区块。在命令行中输入<code>mine freeCodeCamp♥︎</code>。</p>
<p>区块链查看链上最新的区块来获取<code>index</code>和<code>previous hash</code>。在这个案例下创世块是最新的区块。</p>
<ul>
<li><p>Index：0+1=1</p></li>
<li><p>Previous Hash：0000018035a828da0…</p></li>
<li><p>Timestamp：区块被添加的时间</p></li>
<li><p>Data：freeCodeCamp❤</p></li>
<li><p>Hash：？？？</p></li>
<li><p>Nonce：？？？</p></li>
</ul>
<h2 id="articleHeader3">Hash是如何计算的？</h2>
<p>哈希值是唯一标识数据的固定长度的数值。</p>
<p>Hash是通过将<code>Index</code>、<code>Previous Hash</code>、<code>Timestamp</code>、<code>Data</code>和<code>Nonce</code>作为输入值来计算的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CryptoJS.SHA256(index + previousHash + timestamp + data + nonce)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code style="word-break: break-word; white-space: initial;">CryptoJS.SHA256(<span class="hljs-built_in">index</span> + previousHash + timestamp + <span class="hljs-keyword">data</span> + nonce)</code></pre>
<p>SHA256算法将会依据这些输入计算出一个唯一Hash值。同样的输入总是会返回同样的结果。</p>
<h4>你是否注意到区块Hash中的四个前导0？</h4>
<p>四个前导0是一个有效Hash的最低要求。所需前导0的数量被称之为<strong>难度</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isValidHashDifficulty(hash, difficulty) {
  for (var i = 0, b = hash.length; i < b; i ++) {
      if (hash[i] !== '0') {
          break;
      }
  }
  return i >= difficulty;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isValidHashDifficulty</span><span class="hljs-params">(hash, difficulty)</span> {</span>
  <span class="hljs-keyword">for</span> (var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>, b = hash.<span class="hljs-built_in">length</span>; <span class="hljs-built_in">i</span> &lt; b; <span class="hljs-built_in">i</span> ++) {
      if (hash[i] !== <span class="hljs-string">'0'</span>) {
          break;
      }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">i</span> &gt;= difficulty;
}</code></pre>
<p>这也被称为<a href="https://en.wikipedia.org/wiki/Proof-of-work_system" rel="nofollow noreferrer" target="_blank">工作证明系统</a></p>
<h2 id="articleHeader4">Nonce是什么？</h2>
<p>Nonce是用来查找一个有效Hash的次数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let nonce = 0;
let hash;
let input;
while(!isValidHashDifficulty(hash)) {     
  nonce = nonce + 1;
  input = index + previousHash + timestamp + data + nonce;
  hash = CryptoJS.SHA256(input)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">let</span> nonce = 0;
<span class="hljs-built_in">let</span> <span class="hljs-built_in">hash</span>;
<span class="hljs-built_in">let</span> input;
<span class="hljs-keyword">while</span>(!isValidHashDifficulty(<span class="hljs-built_in">hash</span>)) {     
  nonce = nonce + 1;
  input = index + previousHash + timestamp + data + nonce;
  <span class="hljs-built_in">hash</span> = CryptoJS.SHA256(input)
}</code></pre>
<p>Nonce迭代到直到Hash有效。在我们的案例中，一个有效的Hash至少要拥有4个前置0。查找与有效Hash对应的Nonce的过程就是挖矿。</p>
<p>随着<strong>难度</strong>的增加，可能的有效Hash数量就会减少。伴随着有效Hash的减少，我们需要更强的算力来查找有效Hash。</p>
<h2 id="articleHeader5">为什么这么重要？</h2>
<p>这些机制非常重要，它们使区块链不可变。</p>
<p>如果我们有这么一个区块链“A-&gt;B-&gt;C”，而且有一个人想要改变区块A上的数据。那么会发生什么呢？</p>
<ol>
<li><p>区块A上的数据改变了。</p></li>
<li><p>区块A的hash改变了，因为数据被用来计算hash。</p></li>
<li><p>区块A失效了，因为它的hash不再有4个前导0。</p></li>
<li><p>区块B的hash改变了，因为区块A的hash被用来计算区块B的hash。</p></li>
<li><p>区块B失效了，因为它的hash不再有4个前导0。</p></li>
<li><p>区块B的hash改变了，因为区块C的hash被用来计算区块B的hash。</p></li>
<li><p>区块C失效了，因为它的hash不再有4个前导0。</p></li>
</ol>
<p><strong>改变一个区块的唯一方法就是将这个区块重新挖一遍，接下来是所有的区块。由于总是有新的区块被添加，因此改变区块几乎是一件不可能的事。</strong></p>
<p>我希望这个教程能够对您有所帮助！</p>
<p>如果您想要查看网页版的演示，请出门右转<a href="http://blockchaindemo.io/" rel="nofollow noreferrer" target="_blank">http://blockchaindemo.io</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】区块链是如何工作的——用JavaScript演示

## 原文链接
[https://segmentfault.com/a/1190000011104645](https://segmentfault.com/a/1190000011104645)

