---
title: '还我一个干净的Mac OS（如何彻底删除不需要的App）' 
date: 2019-02-11 2:30:49
hidden: true
slug: cgawtijjax7
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>当初我买MacBook Air的时候特地选择了高配版本，硬盘空间是128G（2011年的古董机器），在最开始的1-2年内使用还不错，后来发现越来越力不从心，为了尽可能腾出空间，几乎把所有的照片、视频和PDF文档都移到了云上，也经常用CleanMyMac等工具进行清理，但还是发现空间被一些已经卸载的App蚕食，既然没有更好的方案，那就自己写一个工具来清理吧。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012254568?w=800&amp;h=688" src="https://static.alili.tech/img/remote/1460000012254568?w=800&amp;h=688" alt="主界面" title="主界面" style="cursor: pointer; display: inline;"></span></p>
<p><strong>前几节内容是比较繁琐的技术介绍，不感兴趣的同学可以直接跳到工具的使用那一节</strong></p>
<h2 id="articleHeader0">App最喜欢的几个目录</h2>
<p>Mac和Windows操作系统有一个很大的不同，大部分App是没有安装程序的，一般下载下来就是一个dmg文件，解开之后直接将App拖到<code>应用程序</code>目录下就可以了，所以给人感觉卸载也就是将App拖到<code>废纸篓</code>然后清空。如果真这样做就大错特错，即使一个最简单的App都会在下面几个目录中或多或少留下纪念，这些目录一般有：</p>
<ul>
<li><p>~/Library</p></li>
<li><p>~/Library/Application Support</p></li>
<li><p>~/Library/Application Support/CrashReporter</p></li>
<li><p>~/Library/Caches</p></li>
<li><p>~/Library/Containers</p></li>
<li><p>~/Library/LaunchAgents</p></li>
<li><p>~/Library/Preferences</p></li>
<li><p>~/Library/PreferencePanes</p></li>
</ul>
<p>如果一个程序是通过<code>pkg</code>方式安装，或者是在第一次运行时请求管理员权限，那一般还会在如下几个目录中留点纪念：</p>
<ul>
<li><p>/Library</p></li>
<li><p>/Library/Application Support</p></li>
<li><p>/Library/Extensions</p></li>
<li><p>/Library/LaunchAgents</p></li>
<li><p>/Library/LaunchDaemons</p></li>
<li><p>/Library/PreferencePanes</p></li>
<li><p>/Library/Preferences</p></li>
</ul>
<p>以上都还是只是列出了部分，不同的App由于需要还会在其他目录中安装一些文件，比如字处理软件一般会在/Library/Fonts下面安装字体，有些扩展组件会放在/Library/ScriptingAdditions下面。</p>
<p>限于篇幅，我不能一一介绍所有目录的内容，选几个重点的目录大概说一下：</p>
<h3 id="articleHeader1">~/Library/Application Support</h3>
<p>这个目录可以说是App最重要的文件目录，一些App本身并不大，但是需要的支持组件和内容非常多，特别是采用第三方插件和缓存网络内容的软件，例如我用的<code>Dash</code>，本身的大小只有24MB左右，但是由于经常浏览资料，所以缓存了很多网络内容，使得它的Support目录达到了<strong>1.37GB</strong>！可想而知，如果只是将App扔到废纸篓，几乎不会节省任何空间。<br><span class="img-wrap"><img data-src="/img/remote/1460000012254569?w=800&amp;h=623" src="https://static.alili.tech/img/remote/1460000012254569?w=800&amp;h=623" alt="Dash的占用空间情况" title="Dash的占用空间情况" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">~/Library/Preferences</h3>
<p>这个目录下保存的是App设置，一般来说，稍微有点规模的软件都有自己的配置信息，放在这里的文件虽然占空间不多，但是清理掉还是有好处的，例如有些App不能正常工作，即使卸载重装也不行，往往就是配置文件出错了，把这里清理掉之后再重装就会有比较好的效果。</p>
<h3 id="articleHeader3">~/Library/Containers</h3>
<p>这个目录对于App Store上下载的软件来说，是最重要的一个目录，由于Apple的限制，AppStore的软件都在<code>沙箱</code>中运行，每个软件在沙箱都有自己的一个完整空间，对于App来说，它以为自己在一个正常的目录系统中运行，但实际上不是，操作系统重定位了读写位置到沙箱之中。<br>要是卸载软件的时候，只是简单的在<code>Launchpad</code>中点一下叉来删除，那不知道又有多少空间莫名其妙地消失了，我曾经用这种方式卸载了网易云音乐，结果后来才发现，整整417MB的空间不见了……<br><span class="img-wrap"><img data-src="/img/remote/1460000012254570?w=598&amp;h=619" src="https://static.alili.tech/img/remote/1460000012254570?w=598&amp;h=619" alt="网易云音乐卸载之后仍然占用大量空间" title="网易云音乐卸载之后仍然占用大量空间" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">~/Library/LaunchAgents</h3>
<p>Mac上的随机启动方式<strong>之一</strong>，熟悉OS X操作系统的同学应该立刻想到了<code>launchctl</code>，这里就是存放启动配置文件的地方，大部分App只会往这里写启动信息，请神容易送神难，要送神，只有用第三方工具或是自己手动清理了，还有，LaunchAgents 和 LaunchDaemons 是有一些区别的，两者虽然都是随机启动，详细对比请看<a href="http://www.grivet-tools.com/blog/2014/launchdaemons-vs-launchagents/" rel="nofollow noreferrer" target="_blank">LaunchAgents VS LaunchDaemons</a></p>
<h2 id="articleHeader5">本工具的概述</h2>
<p>直到现在我还在想，要是用Cocoa来写这个工具的话，程序会小很多，现在这个程序压缩包有40+MB，其实绝大部分都是Electron、React的框架库，真正的代码也就几个文件，加起来不到1M大小。而之所以选择用JavaScript来做，其实就是想验证一下React开发一个桌面应用到底会怎样，JavaScript是不是有一统江湖的本事？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012254571?w=969&amp;h=671" src="https://static.alili.tech/img/remote/1460000012254571?w=969&amp;h=671" alt="部分代码" title="部分代码" style="cursor: pointer;"></span></p>
<p>用JavaScript最大的顾虑也许是性能问题，程序虽然难度不大，也有几个运算比较密集的地方，一是plist信息的解析，二是正则表达式。我将plist解析放到外部库去做了，正则表达式仍然用Google的V8引擎，目前来看还行。</p>
<p>程序的I/O比较多，需要频繁统计文件占用空间大小，查找相关文件，读取文件信息，虽然JavaScript的最大好处是异步操作，但是在统计出结果之前，界面能做出再多的响应也没有什么意义，因此在有些地方，我没有使用异步操作，要是你感觉界面有点卡，那是我的原因，不是React的错:)</p>
<p>再给大家推荐一下Mac系统上自带的AppleScript，这个是Mac上的瑞士军刀，能和Windows上的Powershell有得一比，我在这个软件中最后的清理工作实质上就是通过AppleScript来完成的，例如清理工作首先要关闭目标程序，你要是自己编程打算怎样实现？枚举系统进程然后kill？用AppleScript就能非常优雅地完成，例如你打开Safari，再同时开一个终端窗口，然后在终端中输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="osascript -e 'quit app &quot;safari&quot;' " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">osascript <span class="hljs-_">-e</span> <span class="hljs-string">'quit app "safari"'</span> </code></pre>
<h2 id="articleHeader6">名字的来由</h2>
<p>来自于同名电影《Total Recall》，奎德在一次虚拟体验之后，突然发现自己原来不是一个默默无闻的工人，而是一个超级特工，那自己到底是什么呢？也许真正的自己永远也找不回来了，但是至少不是现在这样浑浑噩噩。</p>
<p>我也想借这个意思表示即使通过努力清理，也不一定能还原到最初的状态，但至少不会这么糟糕。</p>
<h2 id="articleHeader7">工具的使用</h2>
<p>这个好像没有什么太多可以说的了，我只是对比了和CleanMyMac的清理效果，至少，在大部分情况下，我感觉还不错。</p>
<h3 id="articleHeader8">卸载百度云的对比</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012254572?w=598&amp;h=525" src="https://static.alili.tech/img/remote/1460000012254572?w=598&amp;h=525" alt="CleanMyMac的查找情况" title="CleanMyMac的查找情况" style="cursor: pointer;"></span></p>
<p>可以清楚地看到，CleanMyMac没有找到百度云的Application Support目录，此外，只找到了登录项，没有找到启动项和启动文件。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012254573?w=800&amp;h=688" src="https://static.alili.tech/img/remote/1460000012254573?w=800&amp;h=688" alt="Total Recall的查找情况" title="Total Recall的查找情况" style="cursor: pointer;"></span></p>
<p>Total Recall不仅找到了CleanMyMac所有的内容，还找到了Application Support，这里有1.14MB空间，此外还找到了LaunchDeamons里面的启动项和启动文件，还发现了<code>com.baidu.netdiskmac.BDYunFinderInstaller</code>这么一个鬼……</p>
<h3 id="articleHeader9">比较一下卸载AppStore上的App</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012254574?w=888&amp;h=525" src="https://static.alili.tech/img/remote/1460000012254574?w=888&amp;h=525" alt="感觉找到了挺多的啊……" title="感觉找到了挺多的啊……" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012254575" src="https://static.alili.tech/img/remote/1460000012254575" alt="其实只有两个，别忽悠了" title="其实只有两个，别忽悠了" style="cursor: pointer;"></span></p>
<p>CleanMyMac列出了一大堆感觉挺吓人的，仔细看才发现其实都是<code>Containers\com.tencent.xinWeChat</code>这个目录里面的子目录，还拿一个系统临时目录来充数（电脑重启后系统临时目录都会清空），卸载的时候其实只要删除沙箱目录就万事大吉。</p>
<h2 id="articleHeader10">存在的不足</h2>
<ul>
<li><p>有一类软件是以Package方式发布的，里面有复杂的安装步骤，例如Microsoft Office 2016 for Mac这样的，对于这类软件，需要分析的内容比较多，打算在完善后将Package卸载整合</p></li>
<li><p>软件界面很简陋，一是不大会玩CSS和HTML布局，二是初次使用React，前端高手可以指点我一下?</p></li>
</ul>
<h2 id="articleHeader11">参考内容</h2>
<ul>
<li><p>《深入解析MAC OS X &amp; IOS操作系统》  这本书对于想了解Mac系统的人来说是不二之选，值得拥有</p></li>
<li><p><a href="https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html#//apple_ref/doc/uid/TP40009248-SW1" rel="nofollow noreferrer" target="_blank">Information Property List Key Reference</a>    App里最重要的文件Info.plist的介绍，开发必备</p></li>
<li><p><a href="https://github.com/electron" rel="nofollow noreferrer" target="_blank">Electron</a>   如果打算用Electron构建一个桌面App，必须从这里开始</p></li>
<li><p><a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a>    React的官方网站，虽然我的界面做得挺难看，那是因为我还不怎么会玩css</p></li>
<li><p><a href="http://pan.baidu.com/s/1i5EWiep" rel="nofollow noreferrer" target="_blank">Total Recall</a>  这……</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
还我一个干净的Mac OS（如何彻底删除不需要的App）

## 原文链接
[https://segmentfault.com/a/1190000005035742](https://segmentfault.com/a/1190000005035742)

