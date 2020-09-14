---
title: 在webpack中使用prefetch/preload
hidden: true
categories: [reprint]
slug: ccbf6875
date: 2018-10-19 00:00:00
---

{{< raw >}}

            <p>这是什么？</p>
<h4>什么是prefetch？</h4>
<p>这种“资源提示” 告诉浏览器这是一个在未来<strong>可能</strong>使用到的资源。</p>
<p>浏览器通常会在空闲状态取得这些资源，在取得资源之后搁在HTTP缓存以便于实现将来的请求。如果有多个‘预请求提示’则会在浏览器空闲时排队执行。当浏览器离开空闲状态时正好在‘预请求’资源，那么浏览器会取消任何正在进行中的请求（同时会将部分响应数据放置在缓存中，而在Header中继续使用Content-Range字段 ）并停止处理‘预请求’队列。</p>
<p>总之:在闲置时获取资源</p>
<h4>什么是preload？</h4>
<p>这种“资源提示” 告诉浏览器这是一种在这次导航中必须的资源，只是会在之后才会被使用， chrome甚至会在资源加载后3秒没有被使用时打印一个警告</p>
<p>浏览器通常以中等优先级（非布局阻塞）获取此资源。</p>
<p>总之：正常获取，及早发现</p>
<h4>为什么Prefetch/Preload有用？</h4>
<p>Preload用于更早地发现资源并避免发起类似瀑布一样的请求。 它可以将页面加载降低到2次往返（1. HTML，2。所有其他资源）。 使用它不会花费额外的带宽。</p>
<p>prefetch用于使用浏览器的空闲时间来加速将来的导航。 当用户未执行预期的未来导航时，使用它可能会花费额外的带宽。</p>
<h4>代码分割</h4>
<p>我们假设您使用webpack构建庞大的应用程序，并通过import()来使用按需加载仅加载用户当前所需的部分。</p>
<p>例如，我们有一个HomePage，其中包含一个LoginButton，这个按钮用于打开一个登录模态框(LoginModal)。 登录之后会跳转到DashboardPage——可能包含其他按钮，但这些按钮不太常见。</p>
<p>为了获得更好的用户体验，你在LoginButton那里使用import("LoginModal") 来保持主页的体积达到最小。与之类似的，LoginModal包含import("DashboardPage")</p>
<p>现在，这个示例程序被拆分为至少3块：home-chunk，login-chunk，dashboard-chunk。 在初始加载时，只需要加载home-chunk，这会产生很好的用户体验。 但是当用户单击LoginButton时，在LoginModal打开之前会有一段延迟，因为需要加载应用程序的这一部分。 DashboardPage与之类似。</p>
<h4>在webpack中使用预请求</h4>
<p>新的prefetch功能可以改善这个工作流程。 并且这非常容易。</p>
<p>在LoginButton处，把import("LoginModal") 改成 import(/ webpackPrefetch: true / "LoginModal")</p>
<p>同样的把 import("DashboardPage") 改成import(/ webpackPrefetch: true / "DashboardPage")</p>
<p>这将告诉webpack在父块完成加载时预取（在浏览器空闲时间内）这个按需加载的模块。 在这个例子中：当home-chunk完成加载时，将login-chunk添加到预取队列。 当login-chunk完成加载（实际加载，而不是预取）时，将dashboard-chunk添加到预取队列。</p>
<p>假设home-chunk是一个入口，那么它将会被添加到html文件里。 login-chunk是一个按需加载模块，因此一旦login-chunk加载完成，webpack运行时将负责注入。</p>
<p>用这种方式将会提升用户体验：</p>
<p>当用户访问HomePage时。 这时的用户体验和性能与以前一样。一旦HomePage完成加载，浏览器就会进入空闲状态并开始在后台获取login-chunk。而用户并不会注意到这一点。 假设用户需要一些时间来查找LoginButton，那么预请求将在用户单击按钮之前完成。 当用户单击该按钮时，login-chunk已经位于HTTP缓存中，浏览器仅会花费最少的时间来命中缓存中的数据，那么用户将立即看到LoginModal。 同时，webpack运行时将dashboard-chunk添加到预取队列，因此登录后加载dashboard-chunk也不需要额外的时间。</p>
<p>请注意，用户可能并不总是具有这种即时LoginModal体验。 对LoginButton来说，有许多因素会使chunk重新加载以至于延迟：慢速网络，用户快速点击，在带宽有限的设备上禁用预取，没有预取浏览器支持，块的执行速度非常慢，......</p>
<h4>在webpack中使用preload</h4>
<p>与import（/ webpackPrefetch：true /“...”）类似，也可以使用import（/ webpackPreload：true /“...”）。 与预取相比，这有很多不同之处：</p>
<ul>
<li><p>preload的块与父块并行加载。prefetch的块在父块完成之后开始加载。</p>
</li>
<li><p>preload的块具有中等优先级并立即下载。prefetch的块在浏览器空闲时间下载。</p>
</li>
<li><p>preload的块会被父块立即请求。 prefetch的块可能会在将来的任何时间请求</p>
</li>
<li><p>浏览器支持是不同的。</p>
</li>
</ul>
<p>preload这种特性的用例很少见。 如果模块总是立即import()某些内容，则可以使用它。 如果一个组件依赖一个单独块中的大型库，那么这是有意义的。 示例：ChartComponent使用大的ChartingLibrary。 它在使用时显示一个LoadingIndicator并立即导入（/ webpackPreload：true /“ChartingLibrary”）。 当请求使用ChartComponent的页面时，也会通过请求图表库块。 假设页面块较小并且完成得更快，则将使用LoadingIndicator显示页面，直到已经请求的图表库块完成为止。 这将提供一点加载时间，因为它只需要一次往返而不是两次。 特别是在高延迟环境中。</p>
<p>如果使用webpackPreload不当实际上会损害性能，因此要小心使用它。</p>
<p>在考虑预加载与预请求时，您可能需要预请。 但是要注意：此声明与webpack import()有关。 在HTML页面中，您可能需要预加载。</p>
<h4>多个prefetch的块</h4>
<p>您可以将webpackPrefetch标志添加到任意数量的import()，但请注意所有prefetch的块都会争夺带宽。 它们实际上是排队的，当用户请求它时，真正使用的块可能不会被预取。</p>
<p>当所有块被请求的可能性相同时，这不是一个大问题。 但是当某些块比其他块被访问的可能性更大时，您可能想要控制prefetch的顺序。</p>
<p>幸运的是，我们可以让你满意。 （注意这是一个高级用例。）</p>
<p>您可以传递数字作为值，而不是使用webpackPrefetch:true。 webpack将按您指定的顺序预取块。比如：webpackPrefetch:42将在webpackPrefetch:1之前被预取，它将在webpackPrefetch:true之前被预取，它将在webpackPrefetch:-99999（如z-order）之前被预取。 实际上，true等价于为0。</p>
<p>webpackPreload与之类似，但我不认为您会需要它</p>
<h4>常见问题</h4>
<p><strong>如果多个import()请求相同的块并且其中一些被预取/预加载怎么办？</strong> 预加载胜过预取。 在同一类别中，更高优先级获胜。</p>
<p><strong>如果浏览器不支持预取/预加载怎么办？</strong> 它会被浏览器忽略。 webpack不会尝试做任何后备。 不管怎样这都是一个暗示，所以即使是支持它的浏览器也可能会忽略它，如果他们感觉如此。</p>
<p><strong>Prefetch/preload在入口点中不起作用。 有什么问题？</strong> webpack运行时只负责按需加载的块的Prefetch/preload。 当在entry chunk中使用预取/预加载时，html会添加标记到HTML。 stats.json在entrypoints[].childAssets中提供了信息</p>
<p><strong>为什么不在每个import()上使用prefetch / preload？</strong> 你浪费了很多带宽。 有选择地将它用于很可能被访问的import()也更有益。 不要浪费带宽。</p>
<p><strong>我不需要/想要这个功能。 不使用它的成本是多少？</strong> 只有在您的一个按需加载的块中使用此功能时，才会添加运行时代码。 因此，当不使用它时，您不必支付任何开销。</p>
<p><strong>我已经在import（）上有一个comment了。 我可以添加多个吗？</strong> 是的，要么用单独的comment分开，要么在单独的评论中：</p>
<pre><code class="hljs yaml"><span class="hljs-string">import(</span>  <span class="hljs-string">/*</span> <span class="hljs-attr">webpackChunkName:</span> <span class="hljs-string">"test"</span><span class="hljs-string">,</span> <span class="hljs-attr">webpackPrefetch:</span> <span class="hljs-literal">true</span> <span class="hljs-string">*/</span>  <span class="hljs-string">"LoginModal"</span><span class="hljs-string">)//</span> <span class="hljs-string">orimport(</span>  <span class="hljs-string">/*</span> <span class="hljs-attr">webpackChunkName:</span> <span class="hljs-string">"test"</span> <span class="hljs-string">*/</span>  <span class="hljs-string">/*</span> <span class="hljs-attr">webpackPrefetch:</span> <span class="hljs-literal">true</span> <span class="hljs-string">*/</span>  <span class="hljs-string">"LoginModal"</span><span class="hljs-string">)//</span> <span class="hljs-string">spacing</span> <span class="hljs-string">optional</span>

</code></pre><p><strong>我使用rollup构建我的库，并使用import(), 我的库中使用webpack的用户可以从prefetch中获益吗？</strong>是的，您可以将webpack魔术注释添加到import()中，rollup将保留注释。 当使用webpack构建它的结果时，它将使用注释。 如果没有使用webpack构建，评论将被minimizers删除。</p>
<p><strong>我不确定是否为特定import()添加预取可以提高性能。 我应该加吗？</strong> 最好的衡量标准。 A / B测试。 这里没有一般建议。 它取决于用户访问此应用程序路径的概率。</p>
<p><strong>我已经有一个service worker，可以在加载时缓存整个应用程序。 使用预取对我有意义吗？</strong> 这取决于您的应用程序。 通常，这种service worker无顺序加载应用程序的所有资产，而预取允许指定顺序并依赖于用户在应用程序中的实际位置。 预取也可以提高带宽效率，并且只能在浏览器空闲时下载。 与第一次用户导航发生时相比，测量在低带宽环境中下载整个应用程序所需的时间。 在大型应用程序中，使用预取代替是有意义的。</p>
<p><strong>我想将初始页面加载拆分为关键资源和非关键资源，并按此顺序加载它们。 预加载有帮助吗？</strong> 是的，您可以将关键资源放入入口点，将非关键资源放在import（/webpackPreload：true/）之后。 注意不要忘记为entry chunk 添加（在子标记之前）。</p>
<hr>
<p>与许多其他大型开源产品不同，webpack没有大公司的支持。 该发展项目由捐赠资助。 如果你依赖网络包，请考虑捐赠...（问你的老板！）</p>
<p>特别感谢这些赞助商:(前5名）</p>
<ul>
<li><p>Trivago（Hotel metasearch）共捐赠了100,000美元</p>
</li>
<li><p>Trivago（Hotel metasearch）共捐赠了100,000美元</p>
</li>
<li><p>分部（数据基础设施）共捐赠了24,000美元</p>
</li>
<li><p>Adobe（软件）共捐赠了12,000美元</p>
</li>
<li><p>Capital One（银行）共捐赠了12,000美元</p>
</li>
<li><p><a href="https://webpack.js.org/">相关链接</a></p>
</li>
</ul>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/link-rel-prefetch-preload-in-webpack](https://www.zcfy.cc/article/link-rel-prefetch-preload-in-webpack)
原文标题: 在webpack中使用prefetch/preload
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
