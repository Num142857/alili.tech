---
title: '摘自Hacker Noon：Hyperapp 1.0版简介' 
date: 2019-01-25 2:30:23
hidden: true
slug: gf7bptjgpwl
categories: [reprint]
---

{{< raw >}}

            <h1>摘自Hacker Noon：Hyperapp 1.0版简介????</h1>
<h2>用大小为1KB的JavaScript库创建网站程序</h2>
<p><img src="https://cdn-images-1.medium.com/max/2000/1*2KJuqinMNB7z_ab6E1UY5w.png" alt=""></p>
<p>今天，我怀着激动的心情宣布<a href="https://github.com/hyperapp/hyperapp">Hyperapp 1.0版</a>发布！</p>
<p>这是本项目的一个重要阶段，标志着其API接口终于制作成功，能稳定使用了。我们花了几乎一年的时间才把API接口做成现在这样，虽然问题总是会有的，但<a href="http://www.manifestoproject.it/bre-pettis-and-kio-stark">完成胜于完美</a>，而且我对结果非常满意。</p>
<p>谢谢各位，为Hyperapp投入了时间，提出了反馈，还编写了代码！❤️</p>
<h3>Hyperapp是什么？</h3>
<p>有人没听说过<a href="https://github.com/hyperapp/hyperapp">Hyperapp</a>库，那就由我来介绍一下。Hyperapp是一个新型JavaScript<a href="https://github.com/hyperapp/hyperapp/issues/492">软件库</a>，可以用来创建能在浏览器上<a href="http://www.stefankrause.net/js-frameworks-benchmark7/table.html">快速运行</a>，且功能丰富的程序。它是市面上最小的库，仅1.3KB，非常简单，使用起来也很有意思。</p>
<p>Hyperapp的架构借鉴了React框架，Redux库，和Elm库，融合了我自己的想法和群体成员的反馈。下面是一个例子，显示了各组成部分如何一起运行。在CodePen上可以<a href="https://codepen.io/hyperapp/pen/zNxZLP">看一下实际演示</a>。</p>
<pre><code class="hljs pf">import { h, app } <span class="hljs-keyword">from</span> <span class="hljs-string">"hyperapp"</span>

const <span class="hljs-keyword">state</span> = {
  count: <span class="hljs-number">0</span>
}

const actions = {
  down: () =&gt; <span class="hljs-keyword">state</span> =&gt; ({ count: <span class="hljs-keyword">state</span>.count - <span class="hljs-number">1</span> }),
  up: () =&gt; <span class="hljs-keyword">state</span> =&gt; ({ count: <span class="hljs-keyword">state</span>.count + <span class="hljs-number">1</span> })
}

const view = (<span class="hljs-keyword">state</span>, actions) =&gt; (
  <span class="hljs-variable">&lt;main&gt;</span>
    <span class="hljs-variable">&lt;h1&gt;</span>{<span class="hljs-keyword">state</span>.count}&lt;/h1&gt;
    <span class="hljs-variable">&lt;button onclick={actions.down}&gt;</span>-&lt;/button&gt;
    <span class="hljs-variable">&lt;button onclick={actions.up}&gt;</span>+&lt;/button&gt;
  &lt;/main&gt;
)

export const main = app(<span class="hljs-keyword">state</span>, actions, view, document.body)

</code></pre><p>Hyperapp并不依存JSX语言，也不是一定要用到，但为了方便熟悉，我们在文档与实例里一直会用这个语言。</p>
<p>或者也可以用内置的<code>_h_</code>函数，它是hyperscript的简称，或者用<a href="https://github.com/hyperapp/html">hyperapp/html</a>函数，<a href="https://github.com/substack/hyperx">hyperx</a>模块和<a href="https://github.com/trueadm/t7">t7</a>库。</p>
<p>Hyperapp的诞生是为了让我们能以更小的库做更多的事。我一直想尽量减少依存关系，写出更简洁的软件，Hyperapp给了我信心，证明事实上是可以做到的。Hyperapp本身就自带VDOM引擎状态管理功能，支持键控更新和周期事件，无须依靠任何别的库。</p>
<h3>下一步是什么？</h3>
<p>2018年第一季度已经计划好了，其中有一些部分很不错，包括向Hacker News项目<a href="https://hnpwa.com">https://hnpwa.com</a>提交渐进式网站程序(PWA)，以及给<a href="https://github.com/gothinkster/realworld">RealWorld</a>软件实例集加入新的范例实现方法。</p>
<p>我还想完善文档，并花更多功夫在生态圈与工具上，包括基础模板、软件打包、开发者工具整合等。如果大家对我们的改进有什么想法，请参与我们的讨论，可以上<a href="https://hyperappjs.herokuapp.com">Slack</a>群，或在<a href="https://github.com/hyperapp/hyperapp">GitHub</a>上提交差错报告。我们在<a href="https://www.reddit.com/r/Hyperapp/">Reddit</a>也有板块！</p>
<hr>
<p>如果已经在用Hyperapp做出了什么好东西，请在推特<a href="http://twitter.com/hyperappjs">@HyperappJavaScript!</a>上告诉我们。 祝大家玩得开心，2018年快乐！????????</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
摘自Hacker Noon：Hyperapp 1.0版简介

## 原文链接
[https://www.zcfy.cc/article/introducing-hyperapp-1-0-hacker-noon](https://www.zcfy.cc/article/introducing-hyperapp-1-0-hacker-noon)

