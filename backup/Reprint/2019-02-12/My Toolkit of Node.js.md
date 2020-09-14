---
title: 'My Toolkit of Node.js' 
date: 2019-02-12 2:30:12
hidden: true
slug: ww991rl167f
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文链接：<a href="http://huang-jerryc.com/2015/01/29/My-Nodejs-Tool-Kit/" rel="nofollow noreferrer" target="_blank">BlueSun | My Toolkit of Node.js</a></p></blockquote>
<h2 id="articleHeader0"><a href="https://github.com/cheeriojs/cheerio" rel="nofollow noreferrer" target="_blank">Cheerio</a></h2>
<blockquote><p>Fast, flexible, and lean implementation of core jQuery designed specifically for the server.</p></blockquote>
<p>Cheerio，说它是服务器端的jQuery一点也不为过，在github上也是大受欢迎，star数达4500有余，至目前为止，已经有923次commit。它兼容jQuery绝大部分的库，以至于你只需要一句<code>$ = require('cheerio').load(YOUR_HTML_CONTENT);</code>，便可以像在前端用jQuery一样的舒畅，愉快。<br>By the way，和Cheerio类似的框架还有：<a href="https://github.com/tmpvar/jsdom" rel="nofollow noreferrer" target="_blank">jsdom</a>，一个受欢迎程度略低于Cheerio，但是它有2,147多的commit，可见维护者之诚意。</p>
<h2 id="articleHeader1"><a href="https://github.com/balderdashy/waterline" rel="nofollow noreferrer" target="_blank">Waterline</a></h2>
<blockquote><p>An adapter-based ORM for Node.js with support for mysql, mongo, postgres, redis, and more</p></blockquote>
<p>Waterline是从Sails框架衍生出来的Nodejs平台下的ORM，除了支持常见的mysql、mongodb，还支持PostgreSQL、Redis、Memory、Disk等等</p>
<h2 id="articleHeader2"><a href="https://github.com/tgriesser/bookshelf" rel="nofollow noreferrer" target="_blank">Bookshelf</a></h2>
<blockquote><p>A Node.js ORM for PostgreSQL, MySQL and SQLite3 in the style of Backbone.js</p></blockquote>
<p>与Waterline类似，但作为同类产品且被Ghost选择标配之一的Bookshelf必然有它的特别之处，仍待君细细品来。</p>
<h2 id="articleHeader3"><a href="https://github.com/vpulim/node-soap" rel="nofollow noreferrer" target="_blank">Node-Soap</a></h2>
<blockquote><p>A SOAP client and server for node.js.</p></blockquote>
<p>对于REST，大家必然熟悉，就算不熟悉，也是久仰其大名，或者是略有耳闻。REST简单而直观，把HTTP协议利用到了极限，在这种思想指导下，它甚至用HTTP请求的头信息来指明资源的表示形式，用HTTP的错误机制来返回访问资源的错误。但在R.T. Fielding博士在他的论文里提出REST之前，又是谁来承担Web Service这份差使呢？<br>SOAP (Simple Object Access Protocol) 顾名思义，是一个严格定义的信息交换协议，用于在Web Service中把远程调用和返回封装成机器可读的格式化数据。它基于 XML 格式，在绝大多数情况下，使用HTTP协议传输WSDL请求。<br>而node-soap模块，则允许在node环境中，接入其他程序语言 (诸如 ASP.net、Java 等) 开发的WebService。也能够在node中开发基于SOAP的WebService供其他程序调用。<br>当然，在大多数情况下，过去SOAP能做的事，REST也是能做到的，且REST更加优雅，简单。以我的水平，我也是想不清楚SOAP依然存在的必然性，但是有那么一句话：「存在，就是合理的」。既然，它存在，也有人用到，那么在合作开发中和SOAP相遇也是有可能性的，相信那是我们的缘分。<br>如果你有兴趣，听一下我和SOAP邂逅的故事：<a href="http://www.jianshu.com/p/5443f90e36de" rel="nofollow noreferrer" target="_blank">SOAP，Web service的枢纽</a></p>
<h2 id="articleHeader4"><a href="https://github.com/jaredhanson/passport" rel="nofollow noreferrer" target="_blank">Passport</a></h2>
<blockquote><p>Simple, unobtrusive authentication for Node.js.</p></blockquote>
<p>如果你的站点想快速建立passport-user结构的用户系统，且能够简单的接入流行的第三方登录，用passport就没错了。它不但提供了本站登录的解决方案，还有一大堆第三方登录的策略，见:<a href="https://github.com/jaredhanson/passport/wiki/Strategies#providers" rel="nofollow noreferrer" target="_blank">Strategies</a><br>如果你用Sails的话，这里还有一个承接Sails和passport的模块：<a href="https://github.com/kasperisager/sails-generate-auth" rel="nofollow noreferrer" target="_blank">sails-generate-auth</a></p>
<h2 id="articleHeader5"><a href="https://github.com/petkaantonov/bluebird" rel="nofollow noreferrer" target="_blank">Bluebird</a></h2>
<blockquote><p>Bluebird is a full featured promise library with unmatched performance.</p></blockquote>
<p>Javascript 的世界有一种痛叫「callback hell」，中文翻译过来叫「回调地狱」，如果能承受得了她带来的痛楚，且继续爱着她，这是「真爱」。Promise的概念，能够让你与javascript好好爱的深沉。<br>实现Promise的库有很多，我知道的有：</p>
<ul>
<li><p>Q</p></li>
<li><p>when</p></li>
<li><p>bluebird</p></li>
<li><p>jQuery的deferred</p></li>
<li><p>javascript自带的Promise（一些高级浏览器内置的Promise对象）</p></li>
</ul>
<p>其中，我用的比较顺手的当属bluebird，它也是时下最优秀博客系统Ghost的标配之一。<br>如果你想深入了解Promise的概念，可以点这里：<a href="http://blog.getify.com/promises-part-1/" rel="nofollow noreferrer" target="_blank">Promises: The Sync Problem</a><br>如果你想珍惜时间，珍惜生命，这里有中文版：<a href="http://segmentfault.com/blog/kk_470661">深入理解Promise五部曲</a></p>
<h2 id="articleHeader6"><a href="https://github.com/lodash/lodash" rel="nofollow noreferrer" target="_blank">Lodash</a></h2>
<blockquote><p>A JavaScript utility library delivering consistency, modularity, performance, &amp; extras.</p></blockquote>
<p>我想称它为Javascript的瑞士军刀，或者是一个蓝色工具箱。lodash提供了一系列相当不错的跟函数式编程相关的方法。函数式编程就像搭积木一样，像_.identity、_.partial、_.compose、splat、unsplat等都是职责单一的函数。别看它们简单，把它们当作积木看待，它们释放的是无尽的活力。 越是简单的东西，蕴藏的越是更为无限的可能性。</p>
<h2 id="articleHeader7"><a href="https://github.com/ncb000gt/node.bcrypt.js" rel="nofollow noreferrer" target="_blank">Node.bcrypt.js</a></h2>
<blockquote><p>bcrypt for NodeJs</p></blockquote>
<p>bcrypt，是一个跨平台的文件加密工具。由它加密的文件可在所有支持的操作系统和处理器上进行转移。它的口令必须是8至56个字符，并将在内部被转化为448位的密钥。然而，所提供的所有字符都具有十分重要的意义。密码越强大，您的数据就越安全。而node.bcrypt.js则是披上Nodejs斗篷的bcrypt，它的62.2%是C++代码，而Javascript代码只有30.3%。</p>
<h2 id="articleHeader8"><a href="https://github.com/moment/moment" rel="nofollow noreferrer" target="_blank">Moment</a></h2>
<blockquote><p>Parse, validate, manipulate, and display dates in javascript.</p></blockquote>
<p>Moment是一个轻量级用于处理日期的工具，除了对日期进行格式化以外，你还能够对日期进行操作，验证，解析。其在github的star数有1.9W+，比众所周知的Express(github star是1.7w+)还多一点。这么优秀的框架实在是相见恨晚。</p>
<h2 id="articleHeader9"><a href="https://github.com/balderdashy/skipper" rel="nofollow noreferrer" target="_blank">Skipper</a></h2>
<blockquote><p>Streaming multi-uploads for Sails/Express - supports disk, S3, gridfs, and custom file adapters</p></blockquote>
<p>Skipper是一款Sails衍生的处理多文件上传的组件，支持上传文件到本地或者远端服务器，如果默认adapter没有你需要的服务，你还能够自定义一套adapter满足你的需求。就像我为了把文件上传到又拍云而定制了的adapter： <a href="https://github.com/JerryC8080/skipper-upyun" rel="nofollow noreferrer" target="_blank">skipper-upyun</a></p>
<h2 id="articleHeader10"><a href="https://github.com/jprichardson/node-fs-extra" rel="nofollow noreferrer" target="_blank">Node-fs-extra</a></h2>
<blockquote><p>Node.js: extra methods for the fs object.</p></blockquote>
<p>Node-fs-extra提供了一些额外的fs没有的函数，如果Nodejs自带的fs模块，还不能满足你在进行文件操作的使用，或者用着不顺心。不妨来node-fs-extra找一下有没有你想要的解决方案。</p>
<h2 id="articleHeader11"><a href="https://github.com/mochajs/mocha" rel="nofollow noreferrer" target="_blank">Mocha</a></h2>
<blockquote><p>mocha - simple, flexible, fun javascript test framework for node.js &amp; the browser. (BDD, TDD, QUnit styles via interfaces)</p></blockquote>
<p>Nodejs单元测试哪家强？   <br>mocha，mocha，似魔鬼的步伐~~yo!</p>
<h2 id="articleHeader12"><a href="https://github.com/tj/should.js" rel="nofollow noreferrer" target="_blank">Should</a></h2>
<blockquote><p>BDD style assertions for node.js -- test framework agnostic</p></blockquote>
<p>BDD风格的断言模块，旨在让编程像说白话（至少在测试断言上）。</p>
<h2 id="articleHeader13"><a href="https://github.com/tj/supertest" rel="nofollow noreferrer" target="_blank">Supertest</a></h2>
<blockquote><p>Super-agent driven library for testing node.js HTTP servers using a fluent API</p></blockquote>
<p>如果测试的时候，需要HTTP请求呢？找Supertest吧，和Should同一个作者，TJ大神，你值得信赖。</p>
<h2 id="articleHeader14"><a href="https://github.com/Unitech/PM2" rel="nofollow noreferrer" target="_blank">PM2</a></h2>
<blockquote><p>Production process manager for Node.JS applications. Perfectly designed for microservice architecture.</p></blockquote>
<p>Nodejs单线程的特性，意味着，如果你的某一行代码阻塞了，你的整个程序都会崩溃。人非圣贤，孰能无过，没有人能保证自己的写的代码永无BUG（难道要在文件头加上无BUG神兽？）。在生产环境下，如果程序挂了怎么办？让它自动重启呗。<br>PM2就是一款解决这种问题的工具，当然，作为一个进程管理器，它的作用不仅仅如此。</p>
<h2 id="articleHeader15"><a href="https://github.com/evilstreak/markdown-js" rel="nofollow noreferrer" target="_blank">Markdown-js</a></h2>
<blockquote><p>A Markdown parser for javascript</p></blockquote>
<p>Markdown时下越来越受欢迎了，实质上markdown最终是转换成HTML格式才能显示于网页的。而markdown-js则是把markdown格式的文本转化成HTML格式的工具。但是，如果从HTML格式的文本转化成Markdown格式的文本呢？markdown-js好像不支持，那就用<a href="https://github.com/domchristie/to-markdown" rel="nofollow noreferrer" target="_blank">to-markdown</a>吧。</p>
<h2 id="articleHeader16">后话</h2>
<p>本文的描述及用语，仅基于本人目前的水平而写，难免有所局限和措辞不当之处。如果有BUG或者不当之处，欢迎指出与吐槽。</p>
<hr>
<p>如果本文对您有用<br>请不要吝啬你们的Follow与Start<br>这会大大支持我们继续创作</p>
<p><strong>「Github」</strong><br>MZMonster ：<a href="https://github.com/MZMonster/" rel="nofollow noreferrer" target="_blank">@MZMonster</a><br>JC_Huang ：<a href="https://github.com/JerryC8080" rel="nofollow noreferrer" target="_blank">@JerryC8080</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
My Toolkit of Node.js

## 原文链接
[https://segmentfault.com/a/1190000004627998](https://segmentfault.com/a/1190000004627998)

