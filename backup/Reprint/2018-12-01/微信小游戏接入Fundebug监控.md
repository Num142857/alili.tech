---
title: '微信小游戏接入Fundebug监控' 
date: 2018-12-01 2:30:12
hidden: true
slug: osg0gq5xvv
categories: [reprint]
---

{{< raw >}}

                    
<p>在SegmentFault上看到<a href="https://segmentfault.com/p/1210000014719565">Fundebug上线小游戏监控</a>，刚好最近开始玩微信小游戏，于是尝试接入试了一下。</p>
<h4>接入方法</h4>
<p>创建项目的时候选择左下角的微信小游戏图标。</p>
<p><span class="img-wrap"><img data-src="/img/bV94bJ?w=928&amp;h=756" src="https://static.alili.tech/img/bV94bJ?w=928&amp;h=756" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>点击继续进入接入插件页面。</p>
<p><span class="img-wrap"><img data-src="/img/bV94bS?w=2068&amp;h=978" src="https://static.alili.tech/img/bV94bS?w=2068&amp;h=978" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>第三方插件在小游戏的接入流程和小程序是类似的，你需要将插件代码下载到本地，放到自己的项目中。并且需要将Fundebug的接收域名配置到request合法域名。</p>
<p>微信在监管/安全这一块可以说做得非常严格， 你需要非常清楚你自己使用的插件有哪些网络交互，如果有非法插件偷偷摸摸往其他地方发送数据，在微信中就会被屏蔽了。</p>
<h4>接入打飞机游戏</h4>
<p>使用无AppID模式创建一个微信小游戏后可以看到官方demo，其中入口文件和配置文件：game.js和game.json。game.js引入并初始化包含整个打飞机的游戏场景、参与者（玩家飞机和敌方飞机）、游戏逻辑的主函数的main.js。</p>
<p>新建一个名为<code>libs</code>的文件夹，用来存放第三方库文件。右键硬盘打开，然后将刚刚下载的fundebug插件放进去。</p>
<p><span class="img-wrap"><img data-src="/img/bV94b7?w=800&amp;h=483" src="https://static.alili.tech/img/bV94b7?w=800&amp;h=483" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后在game.js文件中引入，记得将复制的代码中的<code>release</code>改成<code>libs</code>。</p>
<p><span class="img-wrap"><img data-src="/img/bV94cb?w=808&amp;h=324" src="https://static.alili.tech/img/bV94cb?w=808&amp;h=324" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>报错测试</h4>
<p>根据微信小游戏的文档，在微信开发者工具的控制台执行以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fundebug.test(&quot;Test&quot;, &quot;Hello, Fundebug&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">fundebug.test(<span class="hljs-string">"Test"</span>, <span class="hljs-string">"Hello, Fundebug"</span>)</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV94cj?w=1449&amp;h=269" src="https://static.alili.tech/img/bV94cj?w=1449&amp;h=269" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>Fundebug的控制台就可以看到这条报错的信息了：</p>
<p><span class="img-wrap"><img data-src="/img/bV94cA?w=1137&amp;h=566" src="https://static.alili.tech/img/bV94cA?w=1137&amp;h=566" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我觉得最赞的是，竟然还有报错截图！也就是说，你可以看到在出错的时候，用户所看到的界面是什么样子，是白屏了还是显示混乱了等等，都可以一目了然。</p>
<p><span class="img-wrap"><img data-src="/img/bV94cF?w=852&amp;h=672" src="https://static.alili.tech/img/bV94cF?w=852&amp;h=672" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这个功能，绝对要打电话。</p>
<p>不过，我发现一个问题，就是出错时候基的系统信息、用户信息都没有。如果真的要和这个用户联系，我还不知道找谁！<br>后来看了一下文档，这些默认是不抓取的，需要手动配置一下。具体请查看配置文档: <a href="https://docs.fundebug.com/notifier/wegame/customize/" rel="nofollow noreferrer" target="_blank">属性配置</a></p>
<p><span class="img-wrap"><img data-src="/img/bV94cM?w=1017&amp;h=523" src="https://static.alili.tech/img/bV94cM?w=1017&amp;h=523" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我增加了一些监控属性：</p>
<p><span class="img-wrap"><img data-src="/img/bV94cQ?w=863&amp;h=310" src="https://static.alili.tech/img/bV94cQ?w=863&amp;h=310" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>并且故意将代码改错(划红线位置)：</p>
<p><span class="img-wrap"><img data-src="/img/bV94cU?w=1796&amp;h=1184" src="https://static.alili.tech/img/bV94cU?w=1796&amp;h=1184" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>Fundebug会有一个小红点提示：</p>
<p><span class="img-wrap"><img data-src="/img/bV94c6?w=417&amp;h=42" src="https://static.alili.tech/img/bV94c6?w=417&amp;h=42" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>点击，可以查看信息的报错信息，包括设备信息都显示出来了。</p>
<p><span class="img-wrap"><img data-src="/img/bV94de?w=1267&amp;h=740" src="https://static.alili.tech/img/bV94de?w=1267&amp;h=740" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>而且，metaData中也有我配置的meta信息。</p>
<p><span class="img-wrap"><img data-src="/img/bV94dk?w=377&amp;h=189" src="https://static.alili.tech/img/bV94dk?w=377&amp;h=189" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>配置request合法域名</h4>
<p>一定要<strong>配置request合法域名</strong>。这个事情很容易搞忘记了。因为在开发者模式下，已经可以报错到Fundebug，所以很容易忘记去配置了。我就是犯了这个错，结果一直没有收到报错！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小游戏接入Fundebug监控

## 原文链接
[https://segmentfault.com/a/1190000014753583](https://segmentfault.com/a/1190000014753583)

