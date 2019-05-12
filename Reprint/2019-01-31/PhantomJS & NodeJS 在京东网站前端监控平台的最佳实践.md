---
title: 'PhantomJS & NodeJS 在京东网站前端监控平台的最佳实践' 
date: 2019-01-31 2:31:16
hidden: true
slug: 06cwh88ankmd
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文首发于 <a href="http://www.infoq.com/cn/articles/practise-of-phantomjs-and-nodejs-in-jingdong" rel="nofollow noreferrer" target="_blank">infoQ</a> 及「前端之巅」微信公众号（<a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQwMzUwMQ==&amp;mid=2247484138&amp;idx=1&amp;sn=431702ee926dd3a92403bb58417d88d4&amp;scene=2&amp;srcid=0831H070dVHqyZ5Gg62tZRsl&amp;from=timeline&amp;isappinstalled=0&amp;pass_ticket=UAxLVHRLr%2B46hzwgDjfAanLKPSIcnzOQLPJZtqRkoQeHy03khyC2aD7Lat9WgyiL" rel="nofollow noreferrer" target="_blank">微信群直播记录</a>），感谢 infoQ 前端之巅尾尾同学对文章的整理和校对、微信群直播的组织策划</p></blockquote>
<h2 id="articleHeader0">为什么需要一个前端监控系统</h2>
<p>通常在一个大型的 Web 项目中有很多监控，比如后端的服务 API 监控，接口存活、调用、延迟等监控，这些一般都用来监控后台接口数据层面的信息。而且对于大型网站系统来说，从后端服务到前台展示会有很多层：内网 VIP、CDN 等。但是这些监控并不能准确地反应用户看到的前端页面状态，比如：页面第三方系统数据调用失败，模块加载异常，数据不正确，空白开天窗等。这时候就需要从前端 DOM 展示的角度去分析和收集用户真正看到的东西，从而检测出页面是否出现异常问题</p>
<h2 id="articleHeader1">需要监控系统解决的问题</h2>
<p>页面通常出现以下问题时需要使用邮件、短信通知相关人员修复问题</p>
<ul>
<li><p>状态码返回错误（50x, 40x）无法打开</p></li>
<li><p>模块加载失败</p></li>
<li><p>页面乱码</p></li>
<li><p>数据正确性</p></li>
</ul>
<p>触发报警时要有现场快照，以便复现问题</p>
<h2 id="articleHeader2">技术选型</h2>
<p>监控的意义和回归测试的在本质上是一致的，都是对已上线功能进行回归测试，但不同的是监控需要做长期的可持续可循环的回归测试，而测试仅仅需要在上线之后做一次回归</p>
<p>既然监控和测试的本质一致，那我们完全可以采用测试的方式来做监控系统。在自动化测试技术遍地开花的时代，不乏很多好用的自动化工具，我们只需要把这些自动化工具进行整合为我们所用即可</p>
<ul>
<li><p>NodeJS - 特别适用于网络密集型任务</p></li>
<li><p>PhantomJS - 模拟无界面的浏览器，提供丰富的内核交互 API</p></li>
</ul>
<h3 id="articleHeader3">NodeJS</h3>
<p>NodeJS 是一个 JavaScript 运行环境，非阻塞 I/O 和异步、事件驱动，这几点对于我们构建基于 DOM 元素的监控是非常重要的</p>
<h3 id="articleHeader4">PhantomJS</h3>
<p>PhantomJS 是一个基于 webkit 的浏览器引擎，可以使用 JavaScript API 来模拟浏览器的操作。它使用 QtWebKit 作为它的浏览器核心，使用 webkit 来编译解释执行 JavaScript 代码。也就是说任何你可以在 webkit 浏览器里做的事情，它都能做到</p>
<p>它不仅是个隐形的浏览器，提供了诸如 CSS 选择器、支持 Web 标准、DOM 操作、JSON、HTML5、Canvas、SVG 等，同时也提供了处理文件 I/O 的操作等。PhantomJS 的用处可谓非常广泛，诸如网络监测、网页截屏、无浏览器的 Web 测试、页面访问自动化等</p>
<p><strong>为什么不是 Selenium</strong></p>
<p>做自动化测试的同学肯定都知道 Selenium。可以使用 Selenium 将测试用例在浏览器中执行，而且 Selenium 对各种平台和常见浏览器支持比较好，但是 Selenium 上手难度系数略高，而且使用Selenium 需要在服务器端安装浏览器</p>
<p>考虑到监控主要任务在监控不在测试。系统并不需要太多考虑兼容性，而且监控功能相对单一，主要对页面进行功能上的回归测试，所以选择了 PhantomJS</p>
<h2 id="articleHeader5">架构设计</h2>
<h3 id="articleHeader6">架构概览</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007512004?w=910&amp;h=632" src="https://static.alili.tech/img/remote/1460000007512004?w=910&amp;h=632" alt="4" title="4" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">架构简述</h3>
<p>对于 DOM 监控服务，在应用层面上进行了垂直划分：</p>
<ul>
<li><p>规则管理系统</p></li>
<li><p>规则队列生成器</p></li>
<li><p>长时持续处理器</p></li>
<li><p>PhantomJS 服务</p></li>
<li><p>服务化 API</p></li>
</ul>
<p>在应用层面上进行的垂直划分可以对应用做分布式部署，提高处理能力。后期也方便做性能优化、系统改造扩展等</p>
<h2 id="articleHeader8">解决方案</h2>
<h3 id="articleHeader9">前台规则录入</h3>
<p>这是一个独立的 Web 系统，系统主要用来收集用户录入的页面信息、页面对应的规则、展示错误信息。通过调用后端页面抓取服务来完成页面检测的任务，系统可以创建三种类型的检测页面：常规监控、高级监控、可用性监控</p>
<h4>常规监控</h4>
<p>录入一个页面地址，和若干检测规则。注意这里的检测规则，我们把常用的一些检测点抽象成了一条类似测试用例的语句。每条规则用来匹配页面上的一个 DOM 元素，用 DOM 元素的属性来和预期做匹配，如果匹配失败系统就会产生一条错误信息，后续交由报警系统处理</p>
<p><strong>匹配类型</strong> 一般有这么几种：<code>长度、文本、HTML、属性</code></p>
<p><strong>处理器</strong> 类似编程语言中的操作符：<code>大于、大于等于、小于、小于等于、等于、正则</code></p>
<p>这样做的处就是，录入规则的人只要了解一点 DOM 选择器的知识就可以上手操作了，在我们内部通常是交由测试工程师统一完成规则的录入</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007512005?w=910&amp;h=368" src="https://static.alili.tech/img/remote/1460000007512005?w=910&amp;h=368" alt="1" title="1" style="cursor: pointer; display: inline;"></span></p>
<h4>高级监控</h4>
<p>主要用来提供高级页面测试的功能，一般由有经验的工程师来撰写测试用例。这个测试用例写起来会有一些学习成本，但是可以模拟 Web 页面操作，如：点击、鼠标移动等事件从而做到精确捕捉页面信息</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007512006?w=908&amp;h=485" src="https://static.alili.tech/img/remote/1460000007512006?w=908&amp;h=485" alt="2" title="2" style="cursor: pointer; display: inline;"></span></p>
<h4>可用性监控</h4>
<p>可用性监控侧重于对页面的可访问性、内容正确性等比较 <strong>严重的问题</strong> 做即时监控。通常这类页面我们只需要在程序里面启一个 Worker 不断的去获取页面 HTML 就可以对结果进行检测匹配了，所以我们选择了 NodeJS 来做异步的页面抓取队列，高效快速的完成这种网络密集型任务</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007512007?w=909&amp;h=517" src="https://static.alili.tech/img/remote/1460000007512007?w=909&amp;h=517" alt="3" title="3" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">主动错误上报</h3>
<h4>页面脚本执行错误监控</h4>
<p>页面引入一段监控脚本来收集页面产成 error 事件返回的错误信息，自动上报给后端服务，在系统里面可以汇总所有报错信息，以及对应的客户端浏览器版本、操作系统、IP 地址等</p>
<h4>页面主动上报</h4>
<p>这个功能需要对应的前端工程师在代码中调用错误上报 API，来主动提交错误信息。主要使用的场景有，页面异步服务延时无响应、模块降级兜底主动通知等。监控脚本提供几个简单的 API 来完成这项任务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// error 方法调用后立即上报错误信息并发出邮件、短信通知
errorTracker.error('错误描述')
// info 方法调用后立即上报信息，并在单位时间内仅产生一条邮件、短信通知
errorTracker.info('信息描述')
// log 方法调用后由报错检测是否达到设置阀值，最终确认是否报错
errorTracker.log('日志信息')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// error 方法调用后立即上报错误信息并发出邮件、短信通知</span>
errorTracker.error(<span class="hljs-string">'错误描述'</span>)
<span class="hljs-comment">// info 方法调用后立即上报信息，并在单位时间内仅产生一条邮件、短信通知</span>
errorTracker.info(<span class="hljs-string">'信息描述'</span>)
<span class="hljs-comment">// log 方法调用后由报错检测是否达到设置阀值，最终确认是否报错</span>
errorTracker.log(<span class="hljs-string">'日志信息'</span>)</code></pre>
<h3 id="articleHeader11">后端页面抓取服务</h3>
<p>由于京东很多页面内容是异步加载的，像首页、单品等系统有许多第三方异步接口调用，使用后端程序抓取到的页面数据是同步的，并不能取到动态的 JavaScript 渲染的内容，所以就必须使用像 PhantomJS 这种能模拟浏览器的工具</p>
<p>常规监控我们使用 PhantomJS 模拟浏览器打开页面进行抓取，然后将监控规则解析成 JavaScript 代码片段执行并收集结果</p>
<p>高级监控我们使用 PhantomJS 打开页面后向页面注入像 jasmine, mocha 等类似的前端 JavaScript 测试框架，然后在页面执行对应的录入测试用例并返回结果</p>
<h4>规则队列生成器</h4>
<p>规则队列生成器会将采集的规则转化类成消息队列，然后交由长时持续处理器一次处理</p>
<p><strong>为什么采用类消息队列的处理方式？</strong></p>
<p>这和 PhantomJS 的性能是密不可分的，由多次实践发现，PhantomJS 并不能很好地进行并发处理，当并发过多，会导致 CPU 过载，从而导致机器宕机</p>
<p>在本机环境下的虚拟机中进行并发测试，数据并不理想，极限基本在 ab -n 100 -c 50 左右。 所以为了防止并发导致的问题，就选择了使用类消息队列来避免因为并发过高导致的服务不可用</p>
<h4>类消息队列的实现</h4>
<p>我们这里通过调用内部的分布式缓存系统生成类消息队列，队列的生成其实可以参考数据结构--队列。最基本的模型就是在缓存中创建一个 KEY ，然后根据队列数据结构的模式进行数据的插入和读取</p>
<p>当然，类消息队列的中间介质可根据你实际的条件来选择，你也可以使用本机内存实现。这可能会导致应用和类消息队列竞争内存</p>
<h4>长时持续处理器</h4>
<p>长时持续处理器是要功能就是消费规则队列生成器生成的类消息队列</p>
<h4>长时持续处理实现</h4>
<p>在长时持续处理器的具体实现中，我们利用了 JavaScript 的 setInterval 方法来持续获取累消息队列的内容下发给规则转化器，然后转发给负载均衡调度器。之后再对返回的结果进行统一处理，比如邮件或者短信报警</p>
<h4>API</h4>
<p>PhantomJS 服务可以做为公共 API 提供给客户端进行测试需求的处理， API 通过 HTTP 方式调用。在 API 的处理上需要提供 HTTP 数据到规则和 PhantomJS 的转换。从而又演化出了 HTTP 数据到规则转换器</p>
<h4>PhantomJS 服务</h4>
<p>PhantomJS 服务是指将 PhantomJS 结合 HTTP 服务和子进程进行服务化的处理</p>
<p>首先、启动 HTTP 服务，然后将长时处理器下发的规则进行进一步转化，转化后启动子进程，HTTP 服务会监听子进程的处理结果，并在处理完毕之后返回</p>
<h3 id="articleHeader12">报警系统</h3>
<p>报警系统我们目前使用的是京东内部自己的统一监控平台 UMP，通过调用平台提供的一些 API 来实现报警邮件与短信通知</p>
<h4>如何根据报警定位到具体页面？</h4>
<p>用户通过监控管理系统录入规则后，监控系统会根据 UMP 规则针对用户录入的页面生成 UMP 使用的 key。当长时持续处理器发现 PhantomJS 服务返回的结果标示为异常后，就会使用 key 来进行日志记录</p>
<h4>何时出发报警？</h4>
<p>报警主要分为了短信和邮件报警。邮件报警是在每条异常之后就会发给指定系统用户。短信则是根据异常次数来进行处理的，当异常次数过大，就会下发短信通知</p>
<h3 id="articleHeader13">部署</h3>
<p>对于系统部署可以分为两大块进行。因为机器资源数量有限，没有将所有部分都单独部署</p>
<p>规则管理系统以及规则队列生成器和持续处理器整合部署在一台机器上，PhantomJS 服务部署在了其他的机器上。进程管理使用了著名的 NPM 模块 —— PM2</p>
<p>PM2 是一个带有负载均衡功能的 NodeJS 应用的进程管理器。可充分利用 CPU，并保证进程稳定存活</p>
<p>PM2 特性：</p>
<ul>
<li><p>内建负载均衡（使用 Node cluster 集群模块）</p></li>
<li><p>无缝重启类似 nginx reload</p></li>
<li><p>具有 Ubuntu 和 CentOS 的开机启动脚本</p></li>
<li><p>控制台检测</p></li>
</ul>
<p>不过在目前部署任务中，并没有使用内建负载均衡的特性，没用通过集群的方式部署代理。仅使用了后台运行和无缝重启的特性</p>
<h2 id="articleHeader14">总结与展望</h2>
<p>其实我们现在开发的这套监控系统并不复杂，只是合理的运用了一些现有的技术框架。抽象出来我们自己需要的一些功能。但却有效的达到了我们的预期功能，并且节省了很多之前需要人肉测试的时间成本。系统本身还有很多问题在待解决状态，比如报警系统的规则处理与阀值设定，JavaScript 报错的准确过滤机制等，这些问题我们都会逐个解决，并且未来的前端监控系统会成为一个平台，核心服务在后端爬取页面服务，应用端可以有多种形式，比如监控、测试工具等</p>
<p>一些可以持续优化点：</p>
<ul>
<li><p>监控系统虽然在应用层面进行了垂直划分，但是由于机器资源等限制，并没有进行单独功能的部署。这点可能会在后期的使用中进行优化</p></li>
<li><p>PhantomJS 服务还需要进一步优化，以承载大并发，大处理量。提供稳定的服务</p></li>
<li><p>报警由于依赖于公司内部的 UMP 系统，所以并不是特别灵活，后期可以考虑自己实现一套报警机制</p></li>
</ul>
<p>博客原文同步：<a href="https://keelii.github.io/2016/11/17/best-practice-for-phantomjs-and-nodejs-at-jd-s-webdev-front-end-monitor-platform/" rel="nofollow noreferrer" target="_blank">https://keelii.github.io/2016/11/17/best-practice-for-phantomjs-and-nodejs-at-jd-s-webdev-front-end-monitor-platform/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PhantomJS & NodeJS 在京东网站前端监控平台的最佳实践

## 原文链接
[https://segmentfault.com/a/1190000007512001](https://segmentfault.com/a/1190000007512001)

