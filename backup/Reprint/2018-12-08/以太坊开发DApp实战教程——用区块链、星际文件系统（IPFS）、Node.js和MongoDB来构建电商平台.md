---
title: '以太坊开发DApp实战教程——用区块链、星际文件系统（IPFS）、Node.js和MongoDB来构建电商平台' 
date: 2018-12-08 2:30:30
hidden: true
slug: 3pagy4a7e35
categories: [reprint]
---

{{< raw >}}

                    
<h4>第一节 简介</h4>
<p>欢迎和我们一起来用以太坊开发构建一个去中心化电商DApp！我们将会构建一个类似淘宝的在线电商应用，卖家可以自由地出售商品，买家可以自由地购物：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014076909?w=657&amp;h=374" src="https://static.alili.tech/img/remote/1460000014076909?w=657&amp;h=374" alt="ethereum dapp 以太坊DApp开发" title="ethereum dapp 以太坊DApp开发" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>去中心化： 和淘宝或<strong>eBay</strong>不同，我们把所有的商业逻辑和核心数据都放在以太坊区块链上，这使 得它成为一个完全去中心化的应用。和淘宝这样中心化的电商平台相比，一个去中心化的<strong>P2P</strong>电商应用显然有其独特的价值——至少你不用担心被平台封账户了。</li>
<li>IPFS： 在以太坊上存储用于商品展示的图片和描述超文本十分昂贵，由于以太坊虚拟机的限制， 有时甚至是不可行的。为了解决这个问题，我们将会把商品图片和商品描述信息存储在同样去中心化的<strong>星际文件系统</strong>（<strong>IPFS</strong>)中，而仅仅在链上保存这些数据的<strong>ID</strong>。</li>
<li>商品拍卖： 对于卖家而言，拍卖显然是一种非常好的提升商品利润空间的销售手段。因此我们在课程项目中将实现去中心化环境下的维科瑞（<strong>Vickery</strong>）拍卖 —— 这非常类似于<strong>eBay</strong>的自动竞价系统，而不是简单地对商品进行固定标价。</li>
<li>资金托管： <strong>中心化</strong>的平台有一个优点在于它天然提供了买卖双方之间的信任中介。在<strong>去中心化</strong>的环境中，我们将使用一个多方托管合约来应对买卖双方可能的风险，<strong>托管合约</strong>采用<strong>投票机制</strong>来决定买家货款的最终流向。</li>
<li>链下数据存储： 不要被去中心化限制我们的思维，传统的技术依然有其强大之处。我们将使用<strong>MongoDB</strong>在链下做一个同步的数据备份，以便实现单纯用区块链很难实现的功能：灵活的商品查询。</li>
</ol>
<p>课程地址：<a href="http://xc.hubwiz.com/course/5abbb7acc02e6b6a59171dd6/?affid=sfw" rel="nofollow noreferrer" target="_blank">http://xc.hubwiz.com/course/5abbb7acc02e6b6a59171dd6</a></p>
<h4>第二节 去中心化，why？</h4>
<p>在开始构建我们的应用之前，非常值得花一分钟时间，来理解为什么要在像以太坊这样的<strong>去中心化平台</strong>上搭建在线卖场。</p>
<p><strong>eBay</strong>或<strong>淘宝</strong>这样的<strong>C2C电商平台</strong>已经获得了巨大成功，因为它使得买卖双方都相当便利：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014076910?w=518&amp;h=135" src="https://static.alili.tech/img/remote/1460000014076910?w=518&amp;h=135" alt="ebay-taobao 淘宝c2c电商平台" title="ebay-taobao 淘宝c2c电商平台" style="cursor: pointer; display: inline;"></span></p>
<p>在互联网成为主流之前，人们只能在小范围内、或者在邻里之间买卖商品。当越来越多的人使用互联网， 出现了像eBay这样的平台，无论来自世界的任何一个地方，你都可以在网上买卖商品。无论是商家还 是消费者，这样的平台都有其价值。</p>
<p>尽管<strong>eBay</strong>这样的平台方便了大家，也改善了贸易和经济，但它也存在一些缺点：</p>
<ol>
<li>被平台束缚。参与的商家受制于拥有平台的企业。在任何时候，平台拥有者可以自行决定在是否对某个商家进行封号处理，而如果商家严重依赖于平台，那么账号被封就是一个巨大的打击。</li>
<li>商家费用高。商家上架商品要交费，售出商品也要交佣金。收费本身并没有错，毕竟eBay这样的平台提供了服务。但是，上架费有时太高了，这导致商家最后盈利很少，或是将成本转嫁到消费者身上。</li>
<li>数据失控。商家或消费者都无法拥有本应属于自己的数据。评论、购买历史等等所有数据都为平台拥有者所有。比如，如果一个商家想要换一个提供商，或者想要导出商品评论或是其他数据都非常不容易，甚至不可能。</li>
</ol>
<p>在<strong>以太坊</strong>上构建的去中心化电商平台就解决了这些问题：商家的账户不会被封；数据也是公开的，所以很容易导出数据；相对于中心化的平台，交易佣金也会低得多。</p>
<h4>第三节  初步的功能特性</h4>
<p>现在你应该已经理解了为什么要构建去中心化的电商应用，也了解了我们要构建的应用是什么，现在让我们来大致看一下，在这个项目中将要实现的主要功能特性：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014076911?w=704&amp;h=510" src="https://static.alili.tech/img/remote/1460000014076911?w=704&amp;h=510" alt="ebay user case" title="ebay user case" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>
<strong>商品上架</strong>：应用应该支持卖家上架商品进行销售。我们将实现让任何人自由上架商品的功能。</li>
<li>
<strong>商品浏览与搜索</strong>：应用应该支持买家方便地<strong>浏览商品列表</strong>。我们会实现浏览商品的功能，以及基于商品类别、拍卖时间等条件进行查询的功能。</li>
<li>
<strong>商品拍卖</strong>：跟eBay一样，我们会实现<strong>维科瑞</strong>拍卖方式的商品竞价销售。由于<strong>以太坊</strong>上的一切交易都是公开的，因此我们的实现将会与中心化环境下有所不同。</li>
<li>
<strong>资金托管</strong>：一旦出价结束，商品拍卖有了赢家以后，我们会创建由胜出的买方、卖方和任意第三方参与的托管合约，由<strong>托管合约</strong>来管理交易资金。</li>
<li>
<strong>托管资金保护</strong>：为了保护托管资金，我们将采用<strong>多重签名</strong>（2/3）来实现防欺诈保护，即三个参与者有两个同意时，才会将托管资金释放给卖方，或是将托管资金返还给买方。</li>
</ol>
<p>为了便于查询，我们会将商品数据同时存在链上和链下（数据库）；同时，为了避免图片等数据占用昂贵的链上存储，我们将把图片和商品描述信息上传到同样<strong>去中心化</strong>的<strong>IPFS</strong>网络。</p>
<p>课程地址：<a href="http://xc.hubwiz.com/course/5abbb7acc02e6b6a59171dd6/?affid=sfw" rel="nofollow noreferrer" target="_blank">http://xc.hubwiz.com/course/5abbb7acc02e6b6a59171dd6</a></p>
<h4>第四节  基础知识要求</h4>
<p>为了顺利地完成本课程的学习，你应该对以下语言/技术有一些了解：</p>
<ol><li>
<strong>Solidity/Truffle</strong>：课程将会深入使用<strong>solidity</strong>来编写合约。如果你还没有学过，建议你先学习一下<a href="http://xc.hubwiz.com/course/5a952991adb3847553d205d1/?affid=sfw" rel="nofollow noreferrer" target="_blank"><strong>以太坊开发DApp入门教程</strong></a>，这样至少写过一两个简单的<strong>合约</strong>。同时，对<strong>truffle</strong>开发框架的基本了解也会十分有助于完成本课程。</li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014076912?w=500&amp;h=133" src="https://static.alili.tech/img/remote/1460000014076912?w=500&amp;h=133" alt="solidity truffle" title="solidity truffle" style="cursor: pointer;"></span></p>
<ol><li>
<strong>HTML/CSS/JavaScript</strong>：相比入门课程，本课程将会有更多的HTML和CSS代码。你应该对使用HTML/CSS构建前端有基本的了解。同时，我们将会进一步使用JavaScript。它会在服务端将数据保存到数据库，查询数据库并将结果返回给前端。<strong>web3.js</strong>用于前端与区块链的交互。为了适用各种背景的学习者，我们已经保持<strong>JavaScript</strong>代码尽可能地简单。</li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014076913?w=620&amp;h=150" src="https://static.alili.tech/img/remote/1460000014076913?w=620&amp;h=150" alt="html css js web3.js" title="html css js web3.js" style="cursor: pointer; display: inline;"></span></p>
<ol><li>
<strong>Database</strong>：我们会用<strong>MongoDB</strong>在链下保存产品信息。无须特别了解MongoDB，但是基本的数据库知识有助于你顺利完成本课程的。</li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014076914?w=431&amp;h=117" src="https://static.alili.tech/img/remote/1460000014076914?w=431&amp;h=117" alt="mongodb" title="mongodb" style="cursor: pointer; display: inline;"></span></p>
<h4>第五节  系统架构</h4>
<p>在开始着手具体的实现之前，先来看一下在本课程我们将要构建的<strong>去中心化电商DApp</strong>的<strong>架构</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014076915?w=582&amp;h=494" src="https://static.alili.tech/img/remote/1460000014076915?w=582&amp;h=494" alt="ebay dapp architecture" title="ebay dapp architecture" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>
<strong>Web前端</strong>：web前端使用<strong>HTML/CSS/JavaScript</strong>开发，其中大量使用了<strong>web3js</strong>来访问区块链。用户将会通过这个前端应用来访问<strong>以太坊</strong>、<strong>IPFS</strong>和<strong>NodeJS</strong>服务器。</li>
<li>
<strong>以太坊区块链</strong>：这是去中心化应用的核心，所有的代码（<strong>电商合约</strong>、<strong>资金托管合约</strong>）和交易都存储在链上，这包括所有的商品信息、买家的出价信息、商品竞价结果、资金流向投票结果等。</li>
<li>
<strong>MongoDB</strong>：尽管核心数据存储在<strong>区块链</strong>上，但是为了方便买家对商品的检索和查询，例如只显示某一类的商品，或者显示即将过期的商品等等，我们会用MongoDB数据库来同步地存储和检索商品信息。</li>
<li>
<strong>NodeJS服务器</strong>：这是<strong>后端</strong>服务器，我们会利用它给前端提供<strong>REST</strong>风格的<strong>API</strong>来查询商品， 同时，也利用它来响应对前端<strong>静态页面</strong>的请求。</li>
<li>
<strong>IPFS</strong>: 当卖家上架一个商品时，前端会商品图片文件和介绍文本上传到<strong>IPFS</strong>，并将所上传文件的<strong>哈希值</strong>存到链上。</li>
</ol>
<h4>第六节 理解架构的作用</h4>
<p>为了帮助理解上一节谈到的那些组件的作用，让我们来看看一下卖家上架一个商品的流程：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014076916?w=590&amp;h=495" src="https://static.alili.tech/img/remote/1460000014076916?w=590&amp;h=495" alt="ebay list item" title="ebay list item" style="cursor: pointer;"></span></p>
<ul>
<li>(1)前端使用一个<strong>HTML表单</strong>来采集用户输入的商品细节，例如起拍价、商品图片、描述信息等。</li>
<li>(2)(3) 前端将商品图片和介绍文本上传到<strong>IPFS</strong>，并返回所上传内容对应的链接（<strong>哈希</strong>）。</li>
<li>(4)(5) 然后，<strong>web前端</strong>会调用电商合约将<strong>商品信息</strong>和<strong>IPFS</strong>链接存储到链上。当合约成功地将商品存入<strong>区块链</strong>后，就会触发一个<strong>事件</strong>，该事件中包含了商品所有的信息。</li>
<li>(6)(7)(8) <strong>NodeJS</strong>服务器监听<strong>区块链事件</strong>，当事件被<strong>电商合约触发</strong>时，服务器读取事件内容并将商品信息插入到<strong>MongoDB</strong>数据库中。</li>
</ul>
<p>当开始具体实现商品上架这一特性时，我们将重温这一流程。</p>
<h4>第七节  敏捷开发</h4>
<p>我们将采用<strong>敏捷开发</strong>的思想来实现去中心化电商<strong>DApp</strong>：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014076917?w=727&amp;h=604" src="https://static.alili.tech/img/remote/1460000014076917?w=727&amp;h=604" alt="scrum way" title="scrum way" style="cursor: pointer; display: inline;"></span></p>
<p>我们将全部的产品特性分别列入8个<strong>迭代</strong>周期，通过每一次的<strong>冲刺</strong>（<strong>sprint</strong>），我们都将得到一个可以发布的版本：</p>
<p>前两个<strong>冲刺</strong>主要集中在使用<strong>solidity</strong>和<strong>truffle框架</strong>实现电商合约方面，这包括<strong>合约的设计、开发 、编译、部署与测试</strong>：</p>
<ul>
<li>sprint-1：实现电商合约的商品上架和展示方法。</li>
<li>sprint-2：实现电商合约的商品竞价和出价揭示方法。</li>
</ul>
<p>在电商合约基本实现之后，接下来的三个冲刺主要集中在前端用户界面的构建方面，这包括使用web3 与合约的交互，以及通过ipfs的开发接口上传图片等数据交互，当然，还有必不可少的DOM操作：</p>
<ul>
<li>sprint-3：为买家提供商品浏览界面。</li>
<li>sprint-4：为卖家提供商品上架操作界面。</li>
<li>sprint-5：为买家提供商品详情界面、竞价表单以及出价揭示表单。在接下来的两个冲刺里，我们将首先实现资金托管合约，用来管理竞价结束后胜出买家的资金；然后实现相应的用户操作界面。</li>
<li>sprint-6：实现资金托管合约。</li>
<li>sprint-7：基于资金托管合约，为参与托管各方提供操作界面。最后，为了便于商品的查询检索，我们将使用MongoDB来实现商品数据的链下存储。</li>
<li>sprint-8：实现链下数据的同步与数据查询。</li>
</ul>
<p>课程地址：<a href="http://xc.hubwiz.com/course/5abbb7acc02e6b6a59171dd6/?affid=sfw" rel="nofollow noreferrer" target="_blank">http://xc.hubwiz.com/course/5abbb7acc02e6b6a59171dd6</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
以太坊开发DApp实战教程——用区块链、星际文件系统（IPFS）、Node.js和MongoDB来构建电商平台

## 原文链接
[https://segmentfault.com/a/1190000014076904](https://segmentfault.com/a/1190000014076904)

