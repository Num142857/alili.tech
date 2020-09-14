---
title: 'SegmentFault 技术周刊 Vol.15 - “一天精通 Chrome 开发”' 
date: 2019-01-30 2:30:23
hidden: true
slug: 88a6vlwjvy9
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/144/250/1442500719-58468cb5bc4d6" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/144/250/1442500719-58468cb5bc4d6" alt="weekly-vol015" title="weekly-vol015" style="cursor: pointer; display: inline;"></span></p>
<p>遍历 Web 浏览器的发展史，有两个非常关键的节点：IE 捆榜到 Windows 系统和 Google Chrome 的发布，IE 捆绑开始了浏览器大范围的推广使用，而 Chrome 则成为浏览器进入一个全新阶段的起点。</p>
<p>2008 年，在 IE、Firefox、Opera 的乱世里现身的 Chrome，简直是 Web 浏览器里的清流，“干净、简单、快速”，之后以其版本号升级般的快速发展，对 Web 标准、程序开发甚至整个互联网行业的推动做出了巨大的贡献。</p>
<p>如今，Chrome 在 Web 浏览器的市场占有率已经是第一，但它的更新还在跟着版本号一样的快速前行……所以，我们今天准备了一期相关的内容——《“一天精通 Chrome 开发”》，作为第 15 期周刊的主题。</p>
<p>本期周刊，将分为控制台与调试技巧、扩展和应用的学习及示例两个部分。好了，开始吧。</p>
<h2 id="articleHeader0">Chrome 开发技巧</h2>
<p><strong>1. 控制台</strong></p>
<ul>
<li><p><strong><a href="https://segmentfault.com/a/1190000006721606">你所不知道的 Console  // ZHANGXIANGLIANG</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000006866550" target="_blank">Chrome 控制台实用指南  // 秦至</a></strong></p></li>
</ul>
<p>帮你开启上帝视角，从一个简单的 <code>console.log();</code> 展开，呈现远不止于此的强大控制台。</p>
<p><strong>2. 开发者工具：你不知道的 Chrome DevTools 系列 by <a href="/u/civerzhu">@civerzhu</a> </strong></p>
<ul>
<li><p><strong><a href="https://segmentfault.com/a/1190000000425386">（1）神奇的 console</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000000431586" target="_blank">（2）那些 debug 的技巧</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000000460358">（3）随意修改你的 HTML</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000000494090" target="_blank">（4）推荐几款 DevTools 插件</a></strong></p></li>
</ul>
<p>“Chrome 开发者工具作为 Web 前端开发性能调试的必备工具，连隔壁的产品小哥都知道打开 F12 改一下页面元素的标签代码就能看到页面效果。”</p>
<p>但是它能做的远不止平常用的那么简单，这一个小小的开发工具集成了很多高级的功能，作者这个系列的文章，就是对开发者工具的系统学习。</p>
<p><strong>3. 优化页面性能</strong></p>
<p><strong><a href="https://segmentfault.com/a/1190000003991459">使用 Chrome DevTools 的 Timeline 分析页面性能  // Horve大叔</a></strong></p>
<p>Chrome TimeLine 工具可以很好地辅助分析页面的性能瓶颈，提供详细全面的分析数据，为性能优化提供数据依据，以及还包括如 Memery Mode、Screen Shot 等多种多样的技巧，非常强大。</p>
<p><strong>4. 各种奇技增加效率</strong></p>
<ul>
<li><p><strong><a href="https://segmentfault.com/a/1190000002654265" target="_blank">译 丨 15 个必须知道的 Chrome 开发者技巧  // 不写代码的码农</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000005908941">如何在前端开发中增加编码效率，这里有十款 Chrome 扩展可以帮你  // xitucircle</a></strong></p></li>
</ul>
<p>通过各种扩展，强化浏览器，各种前端语言调试工具以及诸如 EnjoyCSS、LiveReload 等这类能够提高效率的强大扩展；快速获取调试技巧，增加开发效率，这两者对前端开发者尤其是不可或缺的。</p>
<p>看了这么多，要不先试试这个技巧？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data:text/html, <textarea style=&quot;width: 100%; height: 100%; border: none; outline: none&quot; autofocus />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">data:text/<span class="hljs-selector-tag">html</span>, &lt;<span class="hljs-selector-tag">textarea</span> style=<span class="hljs-string">"width: 100%; height: 100%; border: none; outline: none"</span> autofocus /&gt;</code></pre>
<h2 id="articleHeader1">Apps &amp; Extensions</h2>
<p><strong>5. 写一个简单的扩展吧</strong></p>
<ul>
<li><p><strong><a href="https://segmentfault.com/a/1190000006035525" target="_blank">第一步：如何成为一名 Chrome 应用开发者  // 动感小前端</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000005896962">第二步：从零开始写一个 Chrome 扩展  // huangtengfei</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000004933553" target="_blank">第三步：开发一个简单 Chrome 浏览器插件  // 崔小拽</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000000357215">第四步：让你的 Chrome App支持多语言 (i18n)  // 狗屌</a></strong></p></li>
</ul>
<p>如何注册成为 Google 开发者、如何开始写 Manifest 文件（<code>browser_action</code>, <code>options_page</code>, <code>permissions</code>, <code>background</code>, <code>chrome_url_overrides</code>, 调试）、如何优化及丰富功能，按这四个步骤，手把手教学。</p>
<p><strong>6. 认真进阶</strong></p>
<ul>
<li><p><strong><a href="https://segmentfault.com/a/1190000007594008" target="_blank">从小目标开始，编写一个简洁的二维码 Chrome 扩展  // mengdu</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000007182038">Chrome 扩展程序开发  // ecmadao</a></strong></p></li>
<li><p><strong><a href="https://segmentfault.com/a/1190000004707879" target="_blank">写一个 Chrome 扩展之 Flat Weibo —— 简洁你的微博世界  // flyow</a></strong></p></li>
</ul>
<p>一个二维码生成器、一个笔记剪辑、一个微博界面改造，非常优秀的学习作品，你也可以写一个。</p>
<p><strong>7. 看看实例，提高一下姿势水平</strong></p>
<p>用了这么多年 Chrome，见过太多奇（tian'ma）奇（xing'kong）怪（hen）怪（zan）的插件和应用了，私货就不跟大家分享了，这里整理出社区里产生的一些扩展应用，很有意思，也值得学习。</p>
<ul>
<li>
<p>知乎改造计划</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000006650616">知乎用户屏蔽插件</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004694211" target="_blank">开发一个用于屏蔽知乎网内容的 Chrome 扩展</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000000404365">知乎界面改造计划 - 开源项目一起来努力！</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000000710498" target="_blank">「知乎 Card」—— 为你的知乎换个新样式（2016 10 18）</a></p></li>
</ul>
</li>
<li>
<p>SegmentFault 升级 by <a href="/u/lizheming">@公子</a></p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000000612699">SF精灵 for Chrome</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000000458838" target="_blank">SF ChatOnline 插件</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000000440113">SF 答案搜索插件</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000002393638" target="_blank">SegmentFault 声望 3D 直方图视图</a></p></li>
</ul>
</li>
<li>
<p>其他</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000005063959">莆田系医院网站提醒（Chrome 插件）</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004344366" target="_blank">Host Switch Plus：基于浏览器的 Hosts 代理插件（Chrome）</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000002693402">我的第二个 Chrome 扩展十阅（TenRead）</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000000749877" target="_blank">ChromeSnifferPlus 插件正式登陆 Chrome Web Store</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000002944416">Chrome 插件 GitHub-Chart Commits 3D 直方图视图</a></p></li>
</ul>
</li>
</ul>
<p><strong>8. 附加阅读</strong></p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000000683599" target="_blank">神器——Chrome 开发者工具(一)</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000003882567">Chrome 开发者工具使用技巧</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006224653" target="_blank">使用 Chrome Timeline 来优化页面性能</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005830268">如何将 Chrome 变成开发利器，开发者们在用这些插件</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005071240" target="_blank">Chrome 扩展的开发</a></p></li>
</ul>
<p><del><strong>这些，你觉得一天可以精通吗？</strong></del></p>
<p><em>（本期完）</em><br><br></p>
<hr>
<blockquote>
<p><strong># SegmentFault 技术周刊 #</strong></p>
<p>「技术周刊」是社区特别推出的技术内容系列，一周一主题。周刊筛选的每篇内容，是作者的独到见解，踩坑总结和经验分享。</p>
<p>每周二更新，欢迎「<a href="https://segmentfault.com/blog/weekly">关注</a>」或者「<a href="https://segmentfault.com/feeds/blog/weekly" target="_blank">订阅</a>」。大家也可以在评论处留言自己感兴趣的主题，推荐主题相关的优秀文章。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SegmentFault 技术周刊 Vol.15 - “一天精通 Chrome 开发”

## 原文链接
[https://segmentfault.com/a/1190000007713707](https://segmentfault.com/a/1190000007713707)

