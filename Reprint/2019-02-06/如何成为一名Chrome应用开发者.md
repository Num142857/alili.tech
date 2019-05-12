---
title: '如何成为一名Chrome应用开发者' 
date: 2019-02-06 2:30:09
hidden: true
slug: iabqan1ydy
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010600178" src="https://static.alili.tech/img/remote/1460000010600178" alt="Chrome网上应用店" title="Chrome网上应用店" style="cursor: pointer; display: inline;"></span></p>
<p>Chrome网上应用店有丰富的应用和插件，这些工具极大的提高了我们的生产效率。不过本文不是给大家推荐那些精品插件名单，而是教你如何作为一名开发者，为Chrome贡献自己的插件。</p>
<h2 id="articleHeader0">准备工作</h2>
<h4>万里长城第零步，首先你得先翻墙</h4>
<p>推荐用收费的VPN，以便于后续的一系列工作。不要把精力都花在了弄免费的翻墙工具上，毕竟收费的也不贵。</p>
<h4>万里长城第一步，不必去办VISA卡</h4>
<p>要想在Chrome网上应用店（下文简称webstore）发布应用，需要在webstore<a href="https://chrome.google.com/webstore/developer/dashboard/" rel="nofollow noreferrer" target="_blank">的开发者信息中心</a>注册一下，填信息的时候你会发现没有中国大陆地区，所以Google在暗示天朝人民要用假的地址注册，于是我机智的选择了宝岛台湾。</p>
<p>然后Google还要你提供一个VISA/MasterCard账号，用来缴纳5美元注册费。我差点就真去办VISA卡了，后来网上一查，国内的VISA卡可能会认证失败，去淘宝上买虚拟卡又不放心，奋战一小时后我发现一个神奇的网站：<a href="https://www.globalcash.hk/" rel="nofollow noreferrer" target="_blank">全球付</a>.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010600179" src="https://static.alili.tech/img/remote/1460000010600179" alt="mastercard" title="mastercard" style="cursor: pointer; display: inline;"></span></p>
<p>这网站专门用来搞全球购物的，冲100块钱，自动给你生成MasterCard账号，然后你就可以拿这个卡号信息去注册webstore开发者了，分分钟验证通过，并没有网友说的那么麻烦。</p>
<p>至于剩下的钱，你可以买点儿别的，或者转到其他银行卡里,机智如我。</p>
<h2 id="articleHeader1">应用开发</h2>
<h4>基础入门</h4>
<p>webstore有四种程序类别：应用、游戏、扩展程序、主题背景。</p>
<p>放心，都是用JS来写的，对于前端来说只有一星门槛。本文不会讲具体基础开发知识，因为这里已经有非常好的教学资料了：</p>
<ul>
<li>
<a href="http://www.ituring.com.cn/book/1421" rel="nofollow noreferrer" target="_blank">Chrome 扩展及应用开发</a>.来自图灵社区的免费电子书，适合入门。</li>
<li>
<a href="http://open.chrome.360.cn/extension_dev/overview.html" rel="nofollow noreferrer" target="_blank">Chrome扩展开发文档</a>.来自360极速浏览器翻译的官方文档。</li>
<li>
<a href="https://developer.chrome.com/extensions" rel="nofollow noreferrer" target="_blank">Chrome 插件开发官方文档(英文)</a>.前两个适合入门，实际开发的时候还是推荐官方的，查API啥的都很方便。</li>
</ul>
<h4>经验之谈</h4>
<p>webstore开发本人其实也是新手，但些许经验应该能帮助到其他人：</p>
<h5>1.如何优雅的调试</h5>
<p>右键Chrome工具栏的小图标会弹出一个窗口，选择<strong>审查弹出内容</strong>即可调试。<br>但是这种方法极度低效，直接chrome://extensions/找到你插件的ID：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010600180" src="https://static.alili.tech/img/remote/1460000010600180" alt="Chrome 插件 ID" title="Chrome 插件 ID" style="cursor: pointer; display: inline;"></span></p>
<p>然后浏览器访问：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome-extension://<插件ID>/插件入口html文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">chrome-<span class="hljs-string">extension:</span><span class="hljs-comment">//&lt;插件ID&gt;/插件入口html文件</span></code></pre>
<p>比如我的是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome-extension://fnfchnalfnjbjbfeccpophocngdgapad/index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">chrome-<span class="hljs-string">extension:</span><span class="hljs-comment">//fnfchnalfnjbjbfeccpophocngdgapad/index.html</span></code></pre>
<p>然后就可以愉快的调试了。</p>
<h5>2.如何查看其他插件的源码</h5>
<p>访问chrome://version 找到Chrome插件安装的本机目录：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010600181" src="https://static.alili.tech/img/remote/1460000010600181" alt="chrome://version" title="chrome://version" style="cursor: pointer; display: inline;"></span></p>
<p>然后找到extension目录，所有插件和数据都在这里，可以随便参考其他插件源码。</p>
<h5>3.不要把JS代码写在html文件里</h5>
<p>出于安全考虑，入口html文件中的JS代码只能通过script标签引用外部脚本文件，内嵌的JS代码会失效的。</p>
<h5>4.注意国际化</h5>
<p>webstore面向的是全球用户，你辛辛苦苦写的小工具肯定不想只限于国内用户吧，所以在你的项目里面加上_locales文件夹，写代码的时候时刻考虑到如何才能更好地支持国际化。</p>
<h5>5.用好Google</h5>
<p>开发遇到的问题Google一下一般能找到，StackOverflow 和Google网上论坛这两个站点要尤其留意，大部分问题这上面都有解决方案。</p>
<p>更多小技巧就不一一列举了，多看官方文档，有更详细的介绍。</p>
<h2 id="articleHeader2">扩展发布</h2>
<p>扩展写好之后打包上传就好了，上传时Google会让你提供几张宣传图片，每一个需要填写的选项后面都有详细说明，需要认真阅读一下。</p>
<p>发布之后大概过上几个小时就能在webstore搜索到你的扩展了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010600182" src="https://static.alili.tech/img/remote/1460000010600182" alt="iBookmark" title="iBookmark" style="cursor: pointer; display: inline;"></span></p>
<p>至此大功告成，之后可以继续关注你的扩展情况，适时更新。<br>最后附上自己写的一个Chrome收藏夹扩展源码，仅供参考交流：<br><a href="https://github.com/0326/iBookmark" rel="nofollow noreferrer" target="_blank">https://github.com/0326/iBookmark</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何成为一名Chrome应用开发者

## 原文链接
[https://segmentfault.com/a/1190000006035525](https://segmentfault.com/a/1190000006035525)

