---
title: 一点感悟：《Node.js学习笔记》star数突破1000+
hidden: true
categories: reprint
slug: cb6887ef
date: 2018-10-23 00:00:00
---

{{< raw >}}

                    
<h2 id="articleHeader0">写作背景</h2>
<p>笔者前年开始撰写的<a href="https://github.com/chyingp/nodejs-learning-guide" rel="nofollow noreferrer" target="_blank">《Node.js学习笔记》</a> github star 数突破了1000，算是个里程碑吧。</p>
<p>从第一次提交（2016.11.03）到现在，1年半过去了。突然有些感慨，想要写点东西，谈谈这期间的收获、心路历程，以及如何学习Node.js。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbbUnn?w=956&amp;h=110" src="https://static.alili.tech/img/bVbbUnn?w=956&amp;h=110" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbbUno?w=1094&amp;h=362" src="https://static.alili.tech/img/bVbbUno?w=1094&amp;h=362" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">心路历程</h2>
<p>笔者一直有做技术笔记的习惯，前几年零零散散的也写了不少Node.js的东西，只不过都存在evernote里。写着写着，觉得有必要系统地整理下，于是就有了这个项目。</p>
<p>粗略统计了下，总共提交了约60篇教程，以及<a href="https://github.com/chyingp/nodejs-learning-guide/tree/master/examples" rel="nofollow noreferrer" target="_blank">将近300个范例脚本</a>。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbbUnp?w=1630&amp;h=310" src="https://static.alili.tech/img/bVbbUnp?w=1630&amp;h=310" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>大部分的commit都集中2016年11、12月份，以及2017年上半年。这段时间其实项目组挺忙的，经常一周6天班，同时在两三个项目间来回切换。</p>
<p>写作的过程挺枯燥的，也有点累人，尤其经常只能抽大半夜或周末的时间来码字，经常写技术文章的同学应该能体会。不管怎么说，一路坚持了下来，感觉还是有不少收获。</p>
<p>1、技术积累。最初存在evernote里的只是零星的笔记，经过整理校对、进一步的思考以及延展性学习，零散的知识点逐渐串联成体系化的知识面。这比单单记住了数百个Node.js的API，以及枯燥的配置项更有用。</p>
<p>2、知识分享。写作的过程中，不少同样正在学习Node.js的同学或通过QQ，或通过私信表达了感谢。对笔者来说，这其实比star数的增加更有意义。</p>
<p>3、技术焦虑有所缓解。众所周知，前端领域变化太快，身处其中的从业者压力非常大，这也是前不久著名的“老子学不动了”的梗突然刷屏的原因。深入学习、思考，掌握学习的方法和规律，能够一定程度上缓解技术焦虑症。</p>
<p>4、意外收获。这期间，收到阿里云栖社区（专家博主）、腾讯云+社区的入驻邀请，多家知名出版社的撰稿邀请，在线教育平台(如慕课)的开课邀请等。</p>
<h2 id="articleHeader2">如何学习Node.js</h2>
<p>2年前在SegmentFault社区上有人问过类似的问题<a href="https://segmentfault.com/q/1010000006807385/a-1020000006811209">《关于nodejs的学习？》</a>，当时简单地回答了下。</p>
<ol>
<li>实践是最好的学习方式，如果能把所学用到实际中去，效率比光学不练要高上很多。</li>
<li>遇到问题，学会使用google、stackoverflow、官方文档。</li>
<li>学习node的障碍，大部分时候不是node本身，而是相关领域知识。</li>
</ol>
<p>实践出真知，这点无需强调。遇到技术问题善用搜索引擎，也算是圈内共识了（初学者需要加强这方面意识）。</p>
<p>其实最难的是第3点，分辨你所遇到的问题。</p>
<p>举个例子，比如现在想学习 <a href="https://nodejs.org/api/https.html" rel="nofollow noreferrer" target="_blank">https</a> 这个模块，不少初学者会显得一筹莫展，常见的问题有：</p>
<ol>
<li>问题一：https、http、net 模块长得好像，API也差不多，它们之间是什么关系？</li>
<li>问题二：配置项里有一项是证书，这是个干嘛的？照着指引配好证书了，为什么浏览器会报错？</li>
<li>问题三：server本地跑得好好的，怎么部署到云服务器上就访问不了，明明可以ping通，端口也启动了，为什么提示拒绝访问？</li>
</ol>
<p>正式回答问题前，先祭出一张网络分层架构图，请读者把它牢记在心。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbbUnq?w=698&amp;h=474" src="https://static.alili.tech/img/bVbbUnq?w=698&amp;h=474" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>互联网基于分层架构实现，包括应用层、传输层、网络层、链路层、物理层。其中，前端开发者比较熟悉的是应用层（HTTP协议），如果想学习Node服务端编程，那么，至少需要对传输层（TCP）、网络层（IP）也有一定的了解。</p>
<p>对于网络的每个层次，Node.js基本都有对应的模块，比如https、http、net(TCP)、tls/crypto等。</p>
<p>前面列举的几个问题，都是对网络知识、服务器知识了解的欠缺导致的，而不是于Node.js的API有多复杂、难以理解。</p>
<p>这里直接回答问题：</p>
<ol>
<li>问题一：http为应用层模块，主要按照特定协议编解码数据；net为传输层模块，主要负责传输编码后的应用层数据；https是个综合模块（涵盖了http/tls/crypto等），主要用于确保数据安全性；该用哪个模块应该很清楚了。</li>
<li>问题二：安全证书是PKI体系的重要一环，主要用于身份校验。本地调试用的证书如果是自己签署的话，浏览器会视为不安全并报错，可以参考 《<a href="https://www.chyingp.com/posts/what-is-https/" rel="nofollow noreferrer" target="_blank">HTTPS科普扫描帖</a>》。</li>
<li>问题三：这种情况大概率是请求被防火墙拦截。ping走的是ICMP协议，由操作系统内核处理，能够ping通不代表TCP连接就能够建立成功，可以参考 《<a href="https://www.chyingp.com/posts/understanding-ping/" rel="nofollow noreferrer" target="_blank">ping的使用与实现原理剖析</a>》</li>
</ol>
<h2 id="articleHeader3">写在后面</h2>
<p>编写《Node.js学习笔记》的过程收获了不少，也有不少感触，这里就不过多碎碎念。对于“如何学习Node.js”这个问题，其实有挺多东西想写，篇幅所限，后面的文章详细展开。</p>
<h2 id="articleHeader4">相关链接</h2>
<p><a href="https://github.com/chyingp/nodejs-learning-guide" rel="nofollow noreferrer" target="_blank">Nodejs学习笔记</a><br><a href="http://www.chyingp.com" rel="nofollow noreferrer" target="_blank">笔者个人博客</a></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbbUnr?w=300&amp;h=390" src="https://static.alili.tech/img/bVbbUnr?w=300&amp;h=390" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000015192313](https://segmentfault.com/a/1190000015192313)

## 原文标题
一点感悟：《Node.js学习笔记》star数突破1000+
