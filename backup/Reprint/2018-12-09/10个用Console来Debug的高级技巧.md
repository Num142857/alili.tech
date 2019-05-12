---
title: '10个用Console来Debug的高级技巧' 
date: 2018-12-09 2:30:08
hidden: true
slug: adglkdb5oi4
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>译者按：</strong> 我们往往会局限在自己熟悉的知识圈，但也应担偶尔拓展一下，使用一些不常见而又有用的技巧，扩大自己的舒适圈。</p>
<ul>
<li>原文: <a href="https://medium.com/appsflyer/10-tips-for-javascript-debugging-like-a-pro-with-console-7140027eb5f6" rel="nofollow noreferrer" target="_blank">10 Tips for Javascript Debugging Like a PRO with Console</a>
</li>
<li>译者: <a href="https://fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>
</li>
</ul>
<p><strong>为了保证可读性，本文采用意译而非直译。另外，本文版权归原作者所有，翻译仅用于学习。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV5sWr?w=602&amp;h=364" src="https://static.alili.tech/img/bV5sWr?w=602&amp;h=364" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在过去的十年中，我最热衷的事情之一就是前端开发（特别是JavaScript）。作为一个“匠人”，我喜欢专研各种工具。在本文，我会为你介绍一些用老式console来debug的技巧。</p>
<p>是的，我们都知道下面基本的技巧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(‘Hello World!’);
console.info(‘Something happened…’); 
console.warn(‘Something strange happened…’); 
console.error(‘Something horrible happened…’); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(‘Hello World!’);
<span class="hljs-built_in">console</span>.info(‘Something happened…’); 
<span class="hljs-built_in">console</span>.warn(‘Something strange happened…’); 
<span class="hljs-built_in">console</span>.error(‘Something horrible happened…’); </code></pre>
<p>从现在开始，我将教会你一些你不知道的技巧，让你成为老司机！</p>
<h3 id="articleHeader0">1. console.trace()</h3>
<p>如果你想知道消息是哪里打印出来的，使用<code>console.trace()</code>来获取要打印的数据的stacktrace。</p>
<p><span class="img-wrap"><img data-src="/img/bV5sWq?w=565&amp;h=242" src="https://static.alili.tech/img/bV5sWq?w=565&amp;h=242" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">2. console.time() &amp;&amp; console.timeEnd()</h3>
<p>如果你想分析函数的性能，可以使用<code>console.time()</code>来计时，<code>console.timeEnd()</code>来结束计时，控制台会打印出两次之间的时间差。</p>
<p><span class="img-wrap"><img data-src="/img/bV5sWp?w=264&amp;h=116" src="https://static.alili.tech/img/bV5sWp?w=264&amp;h=116" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">3. console.memory</h3>
<p>如果你发现性能问题很难分析，可能还要考虑是否有内存泄露，你可以使用<code>console.memory</code>（注意memory是console的属性，不是函数），来查看当前的堆的使用情况。</p>
<p><span class="img-wrap"><img data-src="/img/bV5sWo?w=673&amp;h=100" src="https://static.alili.tech/img/bV5sWo?w=673&amp;h=100" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><em><a href="https://www.fundebug.com" rel="nofollow noreferrer" target="_blank">Fundebug</a>助你更好地debug，欢迎试用！</em></p>
<h3 id="articleHeader3">4. console.profile(‘profileName’) &amp; console.profileEnd(‘profileName’)</h3>
<p>虽然不是一个标准的做法，不过被广泛接受使用。你可以使用这两个命令来启动和停止profiling。这样有助你你在代码中做精准的profiling。而不依赖于手动的鼠标点击。你可以在浏览器控制台<code>Javacript Profiler</code>中找到刚刚的profile。</p>
<p><span class="img-wrap"><img data-src="/img/bV59rH?w=2554&amp;h=496" src="https://static.alili.tech/img/bV59rH?w=2554&amp;h=496" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">5. console.count(“STUFF I COUNT”)</h3>
<p>有时候为了记录一个函数或则一段代码重复执行了多少次，可以使用<code>console.count('?')</code>来记录。每一次执行到该代码，就会自动加1。</p>
<p><span class="img-wrap"><img data-src="/img/bV5sWn?w=230&amp;h=171" src="https://static.alili.tech/img/bV5sWn?w=230&amp;h=171" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">6. console.assert(false, “Log me!”)</h3>
<p>你可以使用<code>console.assert</code>来在某些为假的条件下输出消息，而不是用if-else。<br>注意：在Node.js下会报错(Assertion Error)。</p>
<p><span class="img-wrap"><img data-src="/img/bV5sV6?w=292&amp;h=95" src="https://static.alili.tech/img/bV5sV6?w=292&amp;h=95" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">7. console.group(‘group’) &amp; console.groupEnd(‘group’)</h3>
<p>如果你想对打印的log做一个格式化的整理，可以使用<code>console.group()</code>和<code>console.groupEnd()</code>。使用console.group可以将log聚合成组，并且形成嵌套的层级。请看示例：</p>
<p><span class="img-wrap"><img data-src="/img/bV5sV5?w=291&amp;h=285" src="https://static.alili.tech/img/bV5sV5?w=291&amp;h=285" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">8. String substitutions</h3>
<p>你可以使用<code>console.log</code>打印变量(%s = string, %i = integer, %o = object, %f = float)。</p>
<p><span class="img-wrap"><img data-src="/img/bV5sV3?w=410&amp;h=50" src="https://static.alili.tech/img/bV5sV3?w=410&amp;h=50" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">9. console.clear()</h3>
<p>我们已经在控制台输出了很多记录，来使用<code>console.clear()</code>清空一下。</p>
<p><span class="img-wrap"><img data-src="/img/bV5sV4?w=183&amp;h=67" src="https://static.alili.tech/img/bV5sV4?w=183&amp;h=67" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">10. console.table()</h3>
<p>最后一个压轴的！你可以使用<code>console.table()</code>将对象以表格的形式打印出来。</p>
<p><span class="img-wrap"><img data-src="/img/bV5sV2?w=818&amp;h=120" src="https://static.alili.tech/img/bV5sV2?w=818&amp;h=120" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">关于Fundebug</h3>
<p><a href="https://www.fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>专注于JavaScript、微信小程序、微信小游戏、支付宝小程序、React Native、Node.js和Java实时BUG监控。 自从2016年双十一正式上线，Fundebug累计处理了7亿+错误事件，得到了Google、360、金山软件、百姓网等众多知名用户的认可。欢迎免费试用！</p>
<p><span class="img-wrap"><img data-src="/img/bVbhe1G?w=400&amp;h=225" src="https://static.alili.tech/img/bVbhe1G?w=400&amp;h=225" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader11">版权声明</h3>
<p>转载时请注明作者Fundebug以及本文地址：<br><a href="https://blog.fundebug.com/2018/03/19/10-tips-for-debugging-with-console/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/2018/03/19/10-tips-for-debugging-with-console/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
10个用Console来Debug的高级技巧

## 原文链接
[https://segmentfault.com/a/1190000013950518](https://segmentfault.com/a/1190000013950518)

