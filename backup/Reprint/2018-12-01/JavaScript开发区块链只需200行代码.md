---
title: 'JavaScript开发区块链只需200行代码' 
date: 2018-12-01 2:30:12
hidden: true
slug: 6fa7i7tfc4p
categories: [reprint]
---

{{< raw >}}

                    
<p>使用JavaScript实现简单的开发一个区块链。通过javascript这一开发区块链的实现过程，你将会真正理解区块链是什么：区块链就是一个分布式数据库，存储结构是一个不断增长的链表，链表中包含着许多有序的记录。</p>
<p>然而，在通常情况下，当我们谈到区块链的时候也会谈起使用区块链来解决的问题，这两者很容易混淆。像流行的比特币和以太坊这样基于区块链的项目就是这样。“区块链”这个术语通常和像交易、智能合约、加密货币这样的概念紧紧联系在一起。</p>
<p>这就令理解区块链变得不必要得复杂起来，特别是当你想理解源码的时候。下面我将通过 200 行 JS 实现的超级简单的区块链来帮助大家理解它，我给这段代码起名为 NaiveChain。你可以在<a href="https://github.com/lhartikk/naivechain" rel="nofollow noreferrer" target="_blank">Github</a> 查看更多的技术细节。</p>
<h2 id="articleHeader0">块结构</h2>
<p>第一个逻辑步骤是决定块结构。为了保证事情尽可能的简单，我们只选择最必要的部分：index（下标）、timestamp（时间戳）、data（数据）、hash（哈希值）和 previous hash（前置哈希值）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014779565?w=800&amp;h=187" src="https://static.alili.tech/img/remote/1460000014779565?w=800&amp;h=187" alt="200行node.js代码让你彻底理解区块链是什么" title="200行node.js代码让你彻底理解区块链是什么" style="cursor: pointer; display: inline;"></span></p>
<p>这个块中必须能找到前一个块的哈希值，以此来保证整条链的完整性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Block {
    constructor(index, previousHash, timestamp, data, hash) {
        this.index = index;
        this.previousHash = previousHash.toString();
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash.toString();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Block</span> </span>{
    <span class="hljs-keyword">constructor</span>(index, previousHash, timestamp, <span class="hljs-keyword">data</span>, hash) {
        <span class="hljs-keyword">this</span>.index = index;
        <span class="hljs-keyword">this</span>.previousHash = previousHash.toString();
        <span class="hljs-keyword">this</span>.timestamp = timestamp;
        <span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span> = <span class="hljs-keyword">data</span>;
        <span class="hljs-keyword">this</span>.hash = hash.toString();
    }
}</code></pre>
<h2 id="articleHeader1">块哈希</h2>
<p>为了保存完整的数据，必须哈希区块。SHA-256会对块的内容进行加密，记录这个值应该和“挖矿”毫无关系，因为这里不需要解决工作量证明的问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var calculateHash = (index, previousHash, timestamp, data) => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>var calculateHash = (<span class="hljs-built_in">index</span>, previousHash, timestamp, <span class="hljs-keyword">data</span>) =&gt; {
    <span class="hljs-keyword">return</span> CryptoJS.SHA256(<span class="hljs-built_in">index</span> + previousHash + timestamp + <span class="hljs-keyword">data</span>).toString();
};</code></pre>
<h2 id="articleHeader2">块的生成</h2>
<p>要生成一个块，必须知道前一个块的哈希值，然后创造其余所需的内容（= index, hash, data and timestamp）。块的data部分是由终端用户所提供的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var generateNextBlock = (blockData) => {
    var previousBlock = getLatestBlock();
    var nextIndex = previousBlock.index + 1;
    var nextTimestamp = new Date().getTime() / 1000;
    var nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> generateNextBlock = <span class="hljs-function">(<span class="hljs-params">blockData</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> previousBlock = getLatestBlock();
    <span class="hljs-keyword">var</span> nextIndex = previousBlock.index + <span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> nextTimestamp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() / <span class="hljs-number">1000</span>;
    <span class="hljs-keyword">var</span> nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
};</code></pre>
<h2 id="articleHeader3">块的存储</h2>
<p>内存中的Javascript数组被用于存储区块链。区块链的第一个块通常被称为“起源块”，是硬编码的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getGenesisBlock = () => {
    return new Block(0, &quot;0&quot;, 1465154705, &quot;my genesis block!!&quot;, &quot;816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7&quot;);
};
 
var blockchain = [getGenesisBlock()];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> getGenesisBlock = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Block(<span class="hljs-number">0</span>, <span class="hljs-string">"0"</span>, <span class="hljs-number">1465154705</span>, <span class="hljs-string">"my genesis block!!"</span>, <span class="hljs-string">"816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7"</span>);
};
 
<span class="hljs-keyword">var</span> blockchain = [getGenesisBlock()];</code></pre>
<h2 id="articleHeader4">确认块的完整性</h2>
<p>在任何时候都必须能确认一个区块或者一整条链的区块是否完整。在我们从其他节点接收到新的区块，并需要决定接受或拒绝它们时，这一点尤为重要。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isValidNewBlock = (newBlock, previousBlock) => {
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index');
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previoushash');
        return false;
    } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
        return false;
    }
    return true;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> isValidNewBlock = (<span class="hljs-keyword">new</span><span class="hljs-type">Block</span>, previousBlock) =&gt; {
    <span class="hljs-keyword">if</span> (previousBlock.index + <span class="hljs-number">1</span> !== <span class="hljs-keyword">new</span><span class="hljs-type">Block</span>.index) {
        console.log(<span class="hljs-string">'invalid index'</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (previousBlock.hash !== <span class="hljs-keyword">new</span><span class="hljs-type">Block</span>.previousHash) {
        console.log(<span class="hljs-string">'invalid previoushash'</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (calculateHashForBlock(<span class="hljs-keyword">new</span><span class="hljs-type">Block</span>) !== <span class="hljs-keyword">new</span><span class="hljs-type">Block</span>.hash) {
        console.log(<span class="hljs-string">'invalid hash: '</span> + calculateHashForBlock(<span class="hljs-keyword">new</span><span class="hljs-type">Block</span>) + <span class="hljs-string">' '</span> + <span class="hljs-keyword">new</span><span class="hljs-type">Block</span>.hash);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
};</code></pre>
<h2 id="articleHeader5">选择最长的链</h2>
<p>任何时候在链中都应该只有一组明确的块。万一冲突了（例如：两个结点都生成了72号块时），会选择有最大数目的块的链。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014779566?w=800&amp;h=439" src="https://static.alili.tech/img/remote/1460000014779566?w=800&amp;h=439" alt="200行node.js代码让你彻底理解区块链是什么" title="200行node.js代码让你彻底理解区块链是什么" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var replaceChain = (newBlocks) => {
    if (isValidChain(newBlocks) &amp;&amp; newBlocks.length > blockchain.length) {
        console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
        blockchain = newBlocks;
        broadcast(responseLatestMsg());
    } else {
        console.log('Received blockchain invalid');
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> replaceChain = (<span class="hljs-keyword">new</span><span class="hljs-type">Blocks</span>) =&gt; {
    <span class="hljs-keyword">if</span> (isValidChain(<span class="hljs-keyword">new</span><span class="hljs-type">Blocks</span>) &amp;&amp; <span class="hljs-keyword">new</span><span class="hljs-type">Blocks</span>.length &gt; blockchain.length) {
        console.log(<span class="hljs-string">'Received blockchain is valid. Replacing current blockchain with received blockchain'</span>);
        blockchain = <span class="hljs-keyword">new</span><span class="hljs-type">Blocks</span>;
        broadcast(responseLatestMsg());
    } <span class="hljs-keyword">else</span> {
        console.log(<span class="hljs-string">'Received blockchain invalid'</span>);
    }
};</code></pre>
<h2 id="articleHeader6">与其他结点的通信</h2>
<p>结点的本质是和其他结点共享和同步区块链，下面的规则能保证网络同步。</p>
<ul>
<li>当一个结点生成一个新块时，它会在网络上散布这个块。</li>
<li>当一个节点连接新peer时，它会查询最新的block。</li>
<li>当一个结点遇到一个块，其index大于当前所有块的index时，它会添加这个块到它当前的链中，  或者到整个区块链中查询这个块。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014779567?w=800&amp;h=295" src="https://static.alili.tech/img/remote/1460000014779567?w=800&amp;h=295" alt="200行node.js代码让你彻底理解区块链是什么" title="200行node.js代码让你彻底理解区块链是什么" style="cursor: pointer; display: inline;"></span></p>
<p>我没有采用自动发现peer的工具。peers的位置（URL）必须是手动添加的。</p>
<h2 id="articleHeader7">节点控制</h2>
<p>在某种程度上用户必须能够控制节点。这一点通过搭建一个HTTP服务器可以实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var initHttpServer = () => {
    var app = express();
    app.use(bodyParser.json());

    app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchain)));
    app.post('/mineBlock', (req, res) => {
        var newBlock = generateNextBlock(req.body.data);
        addBlock(newBlock);
        broadcast(responseLatestMsg());
        console.log('block added: ' + JSON.stringify(newBlock));
        res.send();
    });
    app.get('/peers', (req, res) => {
        res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });
    app.post('/addPeer', (req, res) => {
        connectToPeers([req.body.peer]);
        res.send();
    });
    app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> initHttpServer = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> app = express();
    app.use(bodyParser.json());

    app.get(<span class="hljs-string">'/blocks'</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> res.send(<span class="hljs-built_in">JSON</span>.stringify(blockchain)));
    app.post(<span class="hljs-string">'/mineBlock'</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
        <span class="hljs-keyword">var</span> newBlock = generateNextBlock(req.body.data);
        addBlock(newBlock);
        broadcast(responseLatestMsg());
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'block added: '</span> + <span class="hljs-built_in">JSON</span>.stringify(newBlock));
        res.send();
    });
    app.get(<span class="hljs-string">'/peers'</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
        res.send(sockets.map(<span class="hljs-function"><span class="hljs-params">s</span> =&gt;</span> s._socket.remoteAddress + <span class="hljs-string">':'</span> + s._socket.remotePort));
    });
    app.post(<span class="hljs-string">'/addPeer'</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
        connectToPeers([req.body.peer]);
        res.send();
    });
    app.listen(http_port, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Listening http on port: '</span> + http_port));
};</code></pre>
<p>用户可以用下面的方法和节点互动：</p>
<ul>
<li>列出所有的块</li>
<li>用用户提供的内容创建一个新的块</li>
<li>列出或者新增peers</li>
</ul>
<p>下面这个Curl的例子就是最直接的控制节点的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#get all blocks from the node
curl http://localhost:3001/blocks" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>#<span class="hljs-built_in">get</span> <span class="hljs-built_in">all</span> blocks <span class="hljs-keyword">from</span> the node
curl http:<span class="hljs-comment">//localhost:3001/blocks</span></code></pre>
<h2 id="articleHeader8">系统架构</h2>
<p>需要指出的是，节点实际上展现了两个web服务器：一个（HTTP服务器）是让用户控制节点，另一个（Websocket HTTP服务器）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014779568?w=389&amp;h=176" src="https://static.alili.tech/img/remote/1460000014779568?w=389&amp;h=176" alt="200行node.js代码让你彻底理解区块链是什么" title="200行node.js代码让你彻底理解区块链是什么" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">总结</h2>
<p>创造 NaiveChain 的目的是为了示范和学习，因为它并没有“挖矿”算法（PoS或PoW），不能被用于公用网络，但是它实现了区块链运作的基本特性。</p>
<blockquote>
<p>如果你希望<strong>高效的</strong>学习以太坊DApp开发，可以访问汇智网提供的<strong>最热门</strong>在线互动教程：</p>
<ul>
<li><a href="http://xc.hubwiz.com/course/5a952991adb3847553d205d1?affid=20180508sfw" rel="nofollow noreferrer" target="_blank">适合区块链新手的以太坊DApp实战入门教程</a></li>
<li><a href="http://xc.hubwiz.com/course/5abbb7acc02e6b6a59171dd6?affid=20180508sfw" rel="nofollow noreferrer" target="_blank">区块链+IPFS+Node.js+MongoDB+Express去中心化以太坊电商应用开发实战</a></li>
</ul>
</blockquote>
<p>原文也可以访问<a href="http://blog.hubwiz.com/2018/02/06/blockchain-diy-js/" rel="nofollow noreferrer" target="_blank">这个以太坊博客</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript开发区块链只需200行代码

## 原文链接
[https://segmentfault.com/a/1190000014779560](https://segmentfault.com/a/1190000014779560)

