---
title: '全新Chrome Devtools Performance使用指南' 
date: 2018-12-29 2:30:10
hidden: true
slug: dgv7qwbxixt
categories: [reprint]
---

{{< raw >}}

                    
<p>运行时性能表现（runtime performance）指的是当你的页面在浏览器运行时的性能表现，而不是在下载页面的时候的表现。这篇指南将会告诉你怎么用Chrome DevTools Performance功能去分析运行时性能表现。在RAIL性能评估模型下，你可以在这篇指南中可以学到怎么去用这个performance功能去分析Response, Animation, 以及 Idle 这三个性能指标。</p>
<h1 id="articleHeader0">让我们开始吧</h1>
<p>在这篇指南中，我们会用Performance工具去分析一个现有的在线DEMO，然后教会你怎么去分析，从而找到性能瓶颈。</p>
<ol>
<li>打开Chrome的匿名模式。匿名模式可以保证Chrome在一个相对干净的环境下运行。比如说，你安装了许多chrome插件，这些插件可能会影响我们分析性能表现。</li>
<li>在匿名模式下打开右边这个链接，<a href="https://googlechrome.github.io/devtools-samples/jank/" rel="nofollow noreferrer" target="_blank">DEMO</a>，这个网页就是我们要用来分析的DEMO。这个页面里都是很多上下移动的蓝色小方块。</li>
<li>按下Command+Opiton+I（Mac）或者Control+shift+I (Windows, Linux) 来打开Devtools</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVWtZF?w=2316&amp;h=1626" src="https://static.alili.tech/img/bVWtZF?w=2316&amp;h=1626" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">模拟移动设备的CPU</h2>
<p>移动设备的CPU一般比台式机和笔记本弱很多。当你想分析页面的时候，可以用CPU控制器（CPU Throttling）来模拟移动端设备CPU。</p>
<ol>
<li>在DevTools中，点击 Performance 的 tab。</li>
<li>确保 Screenshots checkbox 被选中</li>
<li>点击 Capture Settings（⚙️）按钮，DevTools会展示很多设置，来模拟各种状况</li>
<li>对于模拟CPU，选择2x slowdown，于是Devtools就开始模拟两倍低速CPU</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVWtZL?w=5166&amp;h=3409" src="https://static.alili.tech/img/bVWtZL?w=5166&amp;h=3409" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">设置DEMO</h2>
<p>为了使得这个DEMO有相对统一的运行表现（不同的读者，机器的性能千差万别）。这个DEMO提供了自定义功能，用来确保这个DEMO的统一表现。</p>
<ol>
<li>一直点击 Add 10 这个按钮直到你能很明显看到蓝色小方块移动变慢，在性能比较好的机器上，大概要点击20次左右。</li>
<li>点击 Optimize按钮，你会发现蓝色小方块会变的很快而且动画变得平滑。</li>
<li>点击 un-optimize 按钮，蓝色小方块又会变成之前的模样。</li>
</ol>
<h2 id="articleHeader3">记录运行时性能表现</h2>
<p>在之前的DEMO中，当你运行优化模式的时候，蓝色小方块移动地非常快。为什么呢？明明两个模式都是移动了同样数量的小方块而且移动的时间也一样。那么现在我们在Performance界面下录制下发生的一切，并且学习如何分析这个记录，从而找到非优化模式下的性能瓶颈。</p>
<ol><li>在DevTools中，点击 Record 。这时候Devtools就开始录制各种性能指标</li></ol>
<p><span class="img-wrap"><img data-src="/img/bVWtZX?w=1238&amp;h=816" src="https://static.alili.tech/img/bVWtZX?w=1238&amp;h=816" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ol>
<li>等待几分钟</li>
<li>点击Stop按钮，Devtools停止录制，处理数据，然后显示性能报告</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVWtZ1?w=1238&amp;h=1376" src="https://static.alili.tech/img/bVWtZ1?w=1238&amp;h=1376" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>wow，看起来有非常多的数据，别害怕，我们一个一个来介绍</p>
<h1 id="articleHeader4">分析报告</h1>
<p>一旦你得到了页面的性能表现报告，那么就可以用它来分析页面的性能，从而找到性能瓶颈。</p>
<h2 id="articleHeader5">分析每一秒的帧</h2>
<p>FPS（frames per second）是用来分析动画的一个主要性能指标。能保持在60的FPS的话，那么用户体验就是不错的。</p>
<ol><li>观察FPS图表，如果你发现了一个红色的长条，那么就说明这些帧存在严重问题，有可能导致非常差的用户体验。一般来说，绿色的长条越高，说明FPS越高，用户体验越好。</li></ol>
<p><span class="img-wrap"><img data-src="/img/bVWtZ2?w=5166&amp;h=3425" src="https://static.alili.tech/img/bVWtZ2?w=5166&amp;h=3425" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol><li>就在FPS图表下方，你会看到CPU图表。在CPU图表中的各种颜色与Summary面板里的颜色是相互对应的，Summary面板就在Performance面板的下方。CPU图表中的各种颜色代表着在这个时间段内，CPU在各种处理上所花费的时间。如果你看到了某个处理占用了大量的时间，那么这可能就是一个可以找到性能瓶颈的线索。</li></ol>
<p><span class="img-wrap"><img data-src="/img/bVWtZ5?w=5166&amp;h=5741" src="https://static.alili.tech/img/bVWtZ5?w=5166&amp;h=5741" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol><li>把鼠标移动到FPS，CPU或者NET图表之上，DevToos就会展示这个时间点界面的截图。左右移动鼠标，可以重发当时的屏幕录像。这被称为scrubbing, 他可以用来分析动画的各个细节。</li></ol>
<p><span class="img-wrap"><img data-src="/img/bVWtZ6?w=1297&amp;h=856" src="https://static.alili.tech/img/bVWtZ6?w=1297&amp;h=856" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ol><li>在Frames图表中，把鼠标移动到绿色条状图上，Devtools会展示这个帧的FPS。每个帧可能都在60以下，都没有达到60的标准。</li></ol>
<p><span class="img-wrap"><img data-src="/img/bVWt0c?w=1328&amp;h=900" src="https://static.alili.tech/img/bVWt0c?w=1328&amp;h=900" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当然这个对于DEMO，可以相当容易观察到性能的问题。但是在现实使用场景下，就不是那么容易观察到了。所以要把常常使用这些工具来分析页面。</p>
<p>小功能：显示实时FPS面板</p>
<p>另外一个好用的小工具就是实时FPS面板，它可以实时展示页面的FPS指标</p>
<ol>
<li>按下 Command+Shift+P（Mac）或者 Control+Shift+P(Windows, Linux) 打开命令菜单</li>
<li>输入Rendering，点选Show Rendering</li>
<li>在Rendering面板里，激活FPS Meter。FPS实时面板就出现在页面的右上方。</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVWt0h?w=1114&amp;h=826" src="https://static.alili.tech/img/bVWt0h?w=1114&amp;h=826" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ol><li>关闭FPS Meter只要按下Escape就可以了。这篇指南里暂时用不上这个功能。</li></ol>
<h2 id="articleHeader6">定位瓶颈</h2>
<p>现在已经确定到这个页面的动画性能表现不太好，那么下一步就是找到为什么</p>
<ol><li>注意Summary面板，你会发现CPU花费了大量的时间在rendering上。因为提高性能就是一门做减法的艺术，你的目标就是减少rendering的时间</li></ol>
<p><span class="img-wrap"><img data-src="/img/bVWt0k?w=5166&amp;h=4625" src="https://static.alili.tech/img/bVWt0k?w=5166&amp;h=4625" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol><li>展开Main图表，Devtools展示了主线程运行状况。X轴代表着时间。每个长条代表着一个event。长条越长就代表这个event花费的时间越长。Y轴代表了调用栈（call stack）。在栈里，上面的event调用了下面的event。</li></ol>
<p><span class="img-wrap"><img data-src="/img/bVWt0l?w=5367&amp;h=4442" src="https://static.alili.tech/img/bVWt0l?w=5367&amp;h=4442" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol><li>在性能报告中，有很多的数据。可以通过双击，拖动等等动作来放大缩小报告范围，从各种时间段来观察分析报告。</li></ol>
<p><span class="img-wrap"><img data-src="/img/bVWt0m?w=1238&amp;h=962" src="https://static.alili.tech/img/bVWt0m?w=1238&amp;h=962" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>在事件长条的右上角出，如果出现了红色小三角，说明这个事件是存在问题的，需要特别注意。</li>
<li>双击这个带有红色小三角的的事件。在Summary面板会看到详细信息。注意reveal这个链接，双击它会让高亮触发这个事件的event。如果点击了app.js:94这个链接，就会跳转到对应的代码处。</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVWt0t?w=1238&amp;h=1270" src="https://static.alili.tech/img/bVWt0t?w=1238&amp;h=1270" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ol>
<li>在app.update这个事件的长条下方，有很多被触发的紫色长条。如果放大这些事件长条，你会看到它们每个都带有红色小三角。点击其中一个紫色事件长条，Devtools在Summary面板里展示了更多关于这个事件的信息。确实，这里有很多reflow的警告。</li>
<li>在summary面板里点击app.js:70链接，Devtools会跳转到需要优化的代码处</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVWt0w?w=1238&amp;h=794" src="https://static.alili.tech/img/bVWt0w?w=1238&amp;h=794" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>OK！Devtools里面还有很多很多指标需要你去探索，但是，对于怎么用Devtools去分析网页的运行时性能表现，你现在已经有了一个基本的概念。</p>
<p><strong>PS：笔者最近开源一款由IBM主导开发设计的叫做Carvue.js的组件库，欢迎有兴趣的朋友一起开发。</strong><a href="https://github.com/nicholaslee119/carbon-components-vue" rel="nofollow noreferrer" target="_blank">Carvue.js</a></p>
<p><a href="https://nicholaslee119.github.io/2017/10/04/Chrome-Devtool-Performance%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/" rel="nofollow noreferrer" target="_blank">译者博客</a><br><a href="https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/" rel="nofollow noreferrer" target="_blank">原文链接</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
全新Chrome Devtools Performance使用指南

## 原文链接
[https://segmentfault.com/a/1190000011516068](https://segmentfault.com/a/1190000011516068)

