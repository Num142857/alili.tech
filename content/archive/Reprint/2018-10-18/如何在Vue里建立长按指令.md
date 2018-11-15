---
title: 如何在Vue里建立长按指令
reprint: true
categories: reprint
abbrlink: b6184b9d
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p><img src="https://p0.ssl.qhimg.com/t016d5e9e243fc800e7.png" alt=""></p>
<p>您是否曾想过按住按钮几秒钟才能在Vue应用程序中执行某个功能？</p>
<p>您是否曾想在应用程序上创建一个按钮，通过按一次（或按住按钮的整个输入）来清除单个输入？</p>
<p>如果你曾有过这些想法，很好，我也是。那么恭喜你看到了这篇文章。</p>
<p>本文将解释如何通过按下（或按住）按钮来执行功能和删除输入。</p>
<p>首先，我将解释如何在VanillaJS中实现这一目标。然后，为它创建一个Vue指令。</p>
<p>那么，让我们开始吧。</p>
<h3>原理</h3>
<p>为了实现长按，用户需要按住按钮几秒钟。</p>
<p>要在代码中复制它，我们需要在按下鼠标“单击”按钮时监听，启动计时器，不管我们希望用户在执行函数之前按住按钮，并在时间设置之后执行该功能。</p>
<p>非常简单！但是，我们需要知道用户何时按住该按钮。</p>
<p><img src="https://p0.ssl.qhimg.com/t019d1f5c33580f6d70.png" alt=""></p>
<h3><strong>怎么做</strong></h3>
<p>当用户单击按钮时，在单击事件之前会触发另外两个事件： <strong>mousedown</strong> 和 <strong>mouseup</strong> 。</p>
<p>当用户按下鼠标按钮时会调用 <strong>_ mousedown _</strong> 事件，而当用户释放该按钮时会调用mouseup事件。</p>
<p>我们需要做的就是：</p>
<ol>
<li><p>发生mousedown事件后启动计时器。</p>
</li>
<li><p>清除该计时器，并且在2secs标记之前触发mouseup事件后不执行该函数。即完整点击事件。</p>
</li>
</ol>
<p>只要计时器在到达那个时间之前没有被清除，我们就会发现mouseup事件没有被触发 - 我们可以说用户没有释放按钮。因此，它被认为是长按，然后我们可以继续执行所述功能。</p>
<h3>实际操作</h3>
<p>让我们深入研究代码并完成这项工作。</p>
<p>首先，我们必须定义3件事，即：</p>
<ol>
<li><p><strong>_ variable _</strong> 用于存储计时器。</p>
</li>
<li><p><strong>_ start _</strong> 函数启动计时器。</p>
</li>
<li><p><strong>_ cancel _</strong> 函数取消定时器</p>
</li>
</ol>
<h4>变量</h4>
<p>这个变量基本上保存了setTimeout的值，所以我们可以在发生mouseup事件时取消它。</p>
<p>我们将变量设置为<em>null</em>，这样我们就可以检查变量，以便知道当前是否有一个活动定时器，然后才能取消它。</p>
<h4>启动功能</h4>
<p>该函数由<a href="https://www.w3schools.com/jsref/met_win_settimeout.asp">setTimeout</a>组成，它基本上是Javascript中的一种方法，它允许我们在函数中声明的特定持续时间之后执行函数。</p>
<p>请记住，在创建click事件的过程中，会触发两个事件。但我们需要启动计时器的是mousedown事件。因此，如果是单击事件，我们不需要启动计时器。</p>
<h4>取消功能</h4>
<p>这个函数基本上就是名字所说的，取消了调用start函数时创建的setTimeout。</p>
<p>要取消setTimeout，我们将在javascript中使用 <a href="https://www.w3schools.com/jsref/met_win_cleartimeout.asp"><strong>_ clearTimeout _</strong></a> 方法，该方法基本上清除了使用<a href="https://www.w3schools.com/jsref/met_win_settimeout.asp">setTimeout（）</a>设置的计时器方法。</p>
<p>在使用clearTimeout之前，我们首先需要检查 <strong>_ pressTimer _</strong> 变量是否设置为null。如果它未设置为null，则表示存在活动计时器。所以，我们需要清除计时器，你猜对了，将 <strong>_ pressTimer _</strong> 变量设置为 <strong>_ null _</strong> 。</p>
<p>一旦 <strong>_ mouseup _</strong> 事件被触发，就会调用此函数。</p>
<h4>设置触发器</h4>
<p>剩下的就是将事件监听器添加到要添加长按效果的按钮上。</p>
<pre><code class="hljs less"><span class="hljs-selector-tag">addEventListener</span>(<span class="hljs-string">"mousedown"</span>, start);<span class="hljs-selector-tag">addEventListener</span>(<span class="hljs-string">"click"</span>, cancel);

</code></pre><p>总而言之，我们有：</p>
<h4>将它全部包装在Vue指令中</h4>
<p>在创建Vue指令时，Vue允许我们在组件的全局或本地定义指令，但在本文中我们将使用全局路由。</p>
<p>让我们构建完成此任务的指令。</p>
<p>首先，我们必须声明自定义指令的名称。</p>
<p>这基本上注册了一个名为 <strong>_ v-longpress的全局自定义指令._</strong></p>
<p>接下来，我们使用一些参数添加<em>bind</em> <a href="https://vuejs.org/v2/guide/custom-directive.html#Hook-Functions"><strong>_ hook函数_</strong></a> ，这允许我们引用元素指令绑定，获取传递给指令的值并标识使用该指令的组件。</p>
<p>接下来，我们在bind函数中添加我们的长按javascript代码。</p>
<p>接下来，我们需要添加一个函数来运行将传递给 <strong>_ longpress _</strong> 指令的方法。</p>
<p>现在我们可以在我们的Vue应用程序中使用该指令，该指令将正常工作，直到用户添加的值不是指令值中的函数。所以我们必须通过在发生这种情况时警告用户来防止这种情况。</p>
<p>要警告用户，我们将以下内容添加到bind函数：</p>
<p>最后，这个指令也适用于触控设备。所以我们为 <a href="https://developer.mozilla.org/en-US/docs/Web/Events/touchstart"><strong>touchstart</strong></a> <strong>，</strong> <a href=""><strong>touchend</strong></a> <strong>＆</strong> <a href="https://developer.mozilla.org/en-US/docs/网络/活动/ touchcancel"><strong>touchcancel</strong></a> <strong>添加事件监听器。</strong></p>
<p>把所有东西放在一起：</p>
<p>现在引用我们的Vue组件：</p>
<hr>
<p>如果您希望了解有关自定义指令的更多信息，可以使用的钩子函数，可以传递给此钩子函数的参数，函数缩写。伟大的家伙@vuejs在解释它<a href="https://vuejs.org/v2/guide/custom-directive.html">这里</a>方面做得很好。</p>
<p>成功 !!!</p>
<hr>
<h3>插件：<a href="">LogRocket</a>，一个用于网络应用的DVR</h3>
<p><img src="https://p0.ssl.qhimg.com/t01072f290c6077ac46.png" alt=""></p>
<p><a href="https://logrocket.com/signup/">LogRocket</a>是一个前端日志记录工具，可让您像在自己的浏览器中一样重放问题。LogRocket不是猜测错误发生的原因，也不是要求用户提供屏幕截图和日志转储，而是让您重播会话以快速了解出现了什么问题。它适用于任何应用程序，无论框架如何，并且具有从Redux，Vuex和@ngrx / store记录其他上下文的插件。</p>
<p>除了记录Redux操作和状态之外，LogRocket还记录控制台日志，JavaScript错误，堆栈跟踪，带有标题+正文的网络请求/响应，浏览器元数据和自定义日志。它还使用DOM来记录页面上的HTML和CSS，重新创建即使是最复杂的单页应用程序的像素完美视频。</p>
<p><a href="https://logrocket.com/signup/">在这里试一试吧。</a></p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/building-a-long-press-directive-in-vue](https://www.zcfy.cc/article/building-a-long-press-directive-in-vue)
原文标题: 如何在Vue里建立长按指令
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
