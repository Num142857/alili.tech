---
title: '从Facebook的React框架事件学习一下开源协议' 
date: 2018-12-30 2:30:10
hidden: true
slug: 4br0ixlaeq3
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVVSne?w=1242&amp;h=536" src="https://static.alili.tech/img/bVVSne?w=1242&amp;h=536" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">前言</h3>
<p>前一阵子由于Facebook BSD+PATENTS License的原因，Apache项目禁止使用带该license的代码，引人注目的就是Facebook的React前端框架。<br>后来在知乎上看到百度内部也要求在半年内完成内部产品的转型，如下图所示。<br><span class="img-wrap"><img data-src="/img/remote/1460000011371384" src="https://static.alili.tech/img/remote/1460000011371384" alt="" title="" style="cursor: pointer;"></span><br>最近又看到Facebook 的React框架又重新将Facebook BSD+PATENTS License更新为了MIT协议。<br><span class="img-wrap"><img data-src="/img/remote/1460000011371385" src="https://static.alili.tech/img/remote/1460000011371385" alt="" title="" style="cursor: pointer;"></span><br>以上这些变化，引起了我的好奇，在接下来的内容中将对以下内容进行阐述。</p>
<h3 id="articleHeader1">目录</h3>
<ol>
<li>Facebook的BSD+PATENTS License到底说了些什么，以React为例子。</li>
<li>开源协议选择</li>
<li>结尾</li>
</ol>
<h3 id="articleHeader2">BSD+PATENTS License</h3>
<p>根据维基百科的定义，License即软件许可证，含义如下</p>
<blockquote><p>软件许可证是一种具有法律性质的合同或指导，目的在规范受著作权保护的软件的使用或散布行为。通常的授权方式会允许用户来使用单一或多份该软件的复制，因为若无授权而径予使用该软件，将违反著作权法给予该软件开发者的专属保护。效用上来说，软件授权是软件开发者与其用户之间的一份合约，用来保证在匹配授权范围的情况下，用户将不会受到控告。</p></blockquote>
<p>根据更新前的Facebook React仓库中的 Readme文件所示。<br><span class="img-wrap"><img data-src="/img/remote/1460000011371386" src="https://static.alili.tech/img/remote/1460000011371386" alt="" title="" style="cursor: pointer;"></span><br>React使用的是BSD协议，另外附加了专利许可证。而引起讨论的重点则出在PATENTS 专利许可上。<br>节选PATENTS专利许可证上的一段话</p>
<blockquote><p>The license granted hereunder will terminate, automatically and without notice, if you (or any of your subsidiaries, corporate affiliates or agents) initiate directly or indirectly, or take a direct financial interest in, any Patent  Assertion: (i) against Facebook or any of its subsidiaries or corporate affiliates, (ii) against any party if such Patent Assertion arises in whole or in part from any software, technology, product or service of Facebook or any of its subsidiaries or corporate affiliates, or (iii) against any party relating  to the Software</p></blockquote>
<p>这一段整体说明了，如果违反了以下三个限制，就会被撤销使用React的许可，在我个人的理解来说，就是Facebook可以反告你一把了。<br>由 (i)和(ii)看出，如果你采取专利申诉或者是挑战到了Facebook,Facebook的子公司以及合作方，你的React许可就会被撤销。<br>由(iii) 可以看出：你不能够其他使用了React的公司产生纠纷，不然也会被撤销React许可。<br>这一段是引起了很大的反向，换句话来说，只要你使用着Facebook的React框架，那么Facebook如果侵权你的专利，你还不能告他，你告他的话，你的React许可就会被撤销，然后被反告一把实锤，想想还真的是挺心塞的哈哈。<br>所以百度以及其他的一些公司有一些对应的举措也不足为怪。</p>
<h3 id="articleHeader3">各种开源协议以及如何选择</h3>
<p>因为社区的反响实在强烈，以及Apache基金会的强硬举措，Facebook在近期是妥协了，将Facebook BSD+PATENTS License更新为了MIT协议。<br>开源协议的数量非常多，但一般来说，我们只需要在常用的当中进行选择即可。阮一峰老师在乌克兰程序员Paul Bagwell的基础上绘制了一份中文的协议选择图，非常浅显易懂。<br><span class="img-wrap"><img data-src="/img/remote/1460000011371387" src="https://static.alili.tech/img/remote/1460000011371387" alt="" title="" style="cursor: pointer;"></span><br>对于Facebook这次的升级来说，MIT相对于BSD的不同之处在于，使用MIT协议的是可以用原有作者的名字打广告的，其实就是更为宽松了一些。<br>在这些常见的协议当中，BSD和MIT的协议相对比较宽松，Apache次之，会保留作者的专利版权，GPL限定性更强。知乎网友<a href="http://www.gcssloop.com/tips/choose-license" rel="nofollow noreferrer" target="_blank">http://www.gcssloop.com/tips/...</a>也画了一张对应的示例图，从图中可以很清晰的看到各个协议之间的区别。<br><span class="img-wrap"><img data-src="/img/remote/1460000011371388" src="https://static.alili.tech/img/remote/1460000011371388" alt="" title="" style="cursor: pointer;"></span><br><a href="https://choosealicense.com/" rel="nofollow noreferrer" target="_blank">https://choosealicense.com/</a> 这个网站提供了选择开源协议上的一些建议。<br><span class="img-wrap"><img data-src="/img/remote/1460000011371389" src="https://static.alili.tech/img/remote/1460000011371389" alt="" title="" style="cursor: pointer;"></span><br>知乎网友gcssloop在这个的基础上对其做了汉化处理，具体网址见<a href="http://choosealicense.online/" rel="nofollow noreferrer" target="_blank">http://choosealicense.online/</a><br><span class="img-wrap"><img data-src="/img/remote/1460000011371390" src="https://static.alili.tech/img/remote/1460000011371390" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">结尾</h3>
<p>这是个人对这次Facebook React开源协议事件的一些资料收集以及个人看法，希望对大家有所帮助。<br>同时也对之前网络上盛传的“ 不用学React”这种言论说一句。</p>
<blockquote><p>且不说你的公司使用React会不会和Facebook引起冲突，哪怕公司层面上有冲突，私下去学习这样一个优秀的框架也是极好的提升机会，切莫浮躁啊。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从Facebook的React框架事件学习一下开源协议

## 原文链接
[https://segmentfault.com/a/1190000011371379](https://segmentfault.com/a/1190000011371379)

