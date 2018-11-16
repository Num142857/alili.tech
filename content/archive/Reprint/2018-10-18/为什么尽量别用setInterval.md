---
title: 为什么尽量别用setInterval
hidden: true
categories: [reprint]
slug: 8830c0b7
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>在开发一个在线聊天工具时，经常会有过多少毫秒就重复执行一次某操作的需求。“没问题”，大家都说，“用setInterval好了。”我觉得这个点子很糟糕。</p>
<h2>原因之一：setInterval无视代码错误</h2>
<p>setInterval有个讨厌的习惯，即对自己调用的代码是否报错这件事漠不关心。换句话说，如果setInterval执行的代码由于某种原因出了错，它还会持续不断（不管不顾）地调用该代码。<a href="http://jsfiddle.net/MUFtV/">看演示</a></p>
<h2>原因之二：setInterval无视网络延迟</h2>
<p>假设你每隔一段时间就通过Ajax轮询一次服务器，看看有没有新数据（注意：如果你真的这么做了，那恐怕你做错了；建议使用<a href="http://github.com/blog/467-smart-js-polling">“补偿性轮询”（backoff polling）</a>）。而由于某些原因（服务器过载、临时断网、流量剧增、用户带宽受限，等等），你的请求要花的时间远比你想象的要长。但setInterval不在乎。它仍然会按定时持续不断地触发请求，最终你的客户端网络队列会塞满Ajax调用。<a href="http://jsfiddle.net/2uEZ5/">看示例</a></p>
<h2>原因之三：setInterval不保证执行</h2>
<p>与setTimeout不同，你并不能保证到了时间间隔，代码就准能执行。如果你调用的函数需要花很长时间才能完成，那某些调用会被直接忽略。<a href="http://jsfiddle.net/snover/9C3J5/">看示例</a></p>
<h2>解决之道很简单：用setTimeout</h2>
<p>与其使用setInterval，不如在适当的时刻通过setTimeout来调用函数自身。在前面两个示例中，使用setInterval的函数a都出错了，而使用setTimeout的函数b则表现很好。</p>
<h2>如果必须保证间隔相等怎么办？</h2>
<p>如果确实要保证事件“匀速”被触发，那可以用希望的延迟减去上次调用所花时间，然后将得到的差值作为延迟动态指定给setTimeout。 不过，要注意的是<a href="http://ejohn.org/blog/accuracy-of-javascript-time/">JavaScript的计时器并不是非常精确</a>。因此你不可能得到绝对“平均”的延迟，即使使用setInterval也不行，原因很多（比如垃圾回收、JavaScript是单线程的，等等）。此外，当前浏览器也会将最小的超时时间固定在4ms到15ms之间。因此不要指望一点误差也没有。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/why-i-consider-setinterval-to-be-harmful-zetafleet](https://www.zcfy.cc/article/why-i-consider-setinterval-to-be-harmful-zetafleet)
原文标题: 为什么尽量别用setInterval
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
