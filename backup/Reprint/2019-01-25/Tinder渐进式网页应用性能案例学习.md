---
title: 'Tinder渐进式网页应用性能案例学习' 
date: 2019-01-25 2:30:23
hidden: true
slug: bft7yf7b6vu
categories: [reprint]
---

{{< raw >}}

            <p>Tinder最近对移动端“右滑”了。他们最近出品的响应式的<a href="https://developers.google.com/web/progressive-web-apps/">渐进式网页应用</a>——<a href="https://tinder.com">Tinder Online</a>——已经可以在桌面和移动端使用了，应用采用了新技术做<a href="https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e">JavaScript性能优化</a>，并用<a href="https://developers.google.com/web/fundamentals/primers/service-workers/">Service Workers</a>和<a href="https://developers.google.com/web/fundamentals/push-notifications/">Push Notification</a>分别做了网络弹性和对话约会。今天我们来简单过一遍他们的性能学习之路。</p>
<p><img src="http://p0.qhimg.com/t01a70821d7a1eacd8a.png" alt=""></p>
<h3>踏上渐进式网页应用的旅程</h3>
<p>Tinder Online的目标是在新市场站稳脚跟，力争达到在其它平台上Tinder V1版本的使用体验。</p>
<p><strong>PWA的MVP花了三个月，采用了</strong><a href="https://reactjs.com"><strong>React</strong></a><strong>构架UI库和</strong><a href="https://redux.js.org"><strong>Redux</strong></a><strong>做状态管理。</strong>这些努力的结果就是，渐进式网页应用只使用了10%的流量消耗就达到了Tinder核心的应用体验，这对流量费用昂贵或连接速度慢的地区的人来讲尤为重要：</p>
<p><img src="http://p0.qhimg.com/t012b2b37d979c84e27.png" alt=""></p>
<p>上图是Tinder Online和原生应用的流量消耗对比。值得注意的是，这并不是横向的比较。PWA只会按需从新路由上加载代码，这些额外的代码加载分散在应用的整个生命周期里面。后续导航消耗流量依旧比下载整个app的要少。</p>
<p>早期征兆显示，对比原生应用，PWA表现出了流畅的滑动体验，更多的消息操作和更长的会话时间。在PWA上：</p>
<ul>
<li>用户的滑动操作更多</li>
<li>用户之间发送的消息更多</li>
<li>用户的购买量与原生应用持平</li>
<li>用户对个人资料的编辑更为频繁</li>
<li>用户的会话时间更长</li>
</ul>
<h3>性能</h3>
<p>Tinder Online的移动端用户使用最多的设备包括：</p>
<ul>
<li>Apple iPhone和iPad</li>
<li>Samsung Galaxy S8</li>
<li>Samsung Galaxy S7</li>
<li>Motorola Moto G4</li>
</ul>
<p>通过使用<a href="https://developers.google.com/web/tools/chrome-user-experience-report/">Chrome用户体验报告</a> (CrUX)，我们了解到大部分的用户在浏览Tinder Online的时候使用的是4G网络：</p>
<p><img src="http://p0.qhimg.com/t01f3dc813ad3990ef6.png" alt=""></p>
<p><em>注：Rick Viscomi最近在<a href="https://calendar.perfplanet.com/2017/finding-your-competitive-edge-with-the-chrome-user-experience-report/">PerfPlanet</a>中加入了CrUX，Inian Parameshwaran使用了<a href="https://calendar.perfplanet.com/2017/introducing-ruxt-visualizing-real-user-experience-data-for-1-2-million-websites/">rUXt</a>将数据变得更加可视化。</em></p>
<p>在使用<a href="https://www.webpagetest.org/result/171224_ZB_13cef955385ddc4cae8847f451db8403/">WebPageTest</a>和<a href="https://github.com/GoogleChrome/lighthouse/">Lighthouse</a>（4G下使用Galaxy S7）测试后，我们看到用户在<strong>五秒钟之内</strong>即可加载完毕并进入可交互状态。</p>
<p><img src="http://p0.qhimg.com/t01322e56839095d723.png" alt=""></p>
<p>当然，在受CPU约束的<a href="https://www.webpagetest.org/lighthouse.php?test=171224_NP_f7a489992a86a83b892bf4b4da42819d&amp;run=3">中端移动设备</a>（比如Moto G4）上，仍然存在很多可优化空间：</p>
<p><img src="http://p0.qhimg.com/t01a2b47f851f99e0d7.png" alt=""></p>
<p>Tinder正在努力优化他们的体验，未来我们也希望能看到他们在网页性能优化上所做的工作。</p>
<h3>性能优化</h3>
<p>Tinder使用了很多技术来提升加载速度和减少进入可交互状态之前的时间。他们使用了基于路由的代码分割，并引入了性能预算和资源的长期缓存。</p>
<h3>基于路由的代码分割</h3>
<p>Tinder网页端最初包含了庞大的JavaScript代码包，这延长了应用的加载时间。这些包中包含了很多并不需要立即加载的代码，因此这些代码可以通过使用<a href="https://webpack.js.org/guides/code-splitting/">代码分割</a>打碎。<strong>只加载用户首屏使用的代码，其它的在需要的时候懒加载，这种办法非常有用。</strong></p>
<p>为了达到这一点，Tinder使用了<a href="https://reacttraining.com/react-router/">React Router</a>和<a href="https://github.com/thejameskyle/react-loadable">React Loadable</a>。他们的应用把路由和渲染信息集中在了一个配置里面，他们发现可以直接在顶层做代码分割。</p>
<p><strong>简介：</strong>
React Loadable的的作者是James Kyle，他的初衷是简化以组件为中心的React应用的<strong>代码分割</strong>。<strong>Loadable</strong>是一个高阶组件（一个创建组件的函数），能够在组件层使得<strong>分割</strong>代码包更加简单。</p>
<p>比如我们有两个组件，“A”和“B”。在做代码分割之前，Tinder静态地将所有东西（A、B等等）都引入到主包里面。这种方式很低效，因为我们并不立刻且同时需要A和B两个组件：</p>
<p><img src="http://p0.qhimg.com/t0117f97a162902aff3.png" alt=""></p>
<p>在做了代码分割之后，组件A和组件B会在需要的时候再加载。Tinder在JS中引入了React Loadable，<a href="https://webpack.js.org/guides/code-splitting/#dynamic-imports">动态导入</a>和<a href="https://medium.com/faceyspacey/how-to-use-webpacks-new-magic-comment-feature-with-react-universal-component-ssr-a38fd3e296a">webpack的魔法注释</a>（针对命名动态代码块）：</p>
<p><img src="http://p0.qhimg.com/t01da4af3b5fffd8b99.png" alt=""></p>
<p>针对“vendor”（库），Tinder使用了<a href="https://webpack.js.org/plugins/commons-chunk-plugin/"><strong>CommonsChunkPlugin</strong></a>将频繁使用的公共库单独打包，这样可以有效利用长缓存：</p>
<p><img src="http://p0.qhimg.com/t01af6e8120c8d95d03.png" alt=""></p>
<p>接着，Tinder使用<a href="https://github.com/thejameskyle/react-loadable#loadablecomponentpreload">React Loadable的预加载支持</a>来预加载下一页可能会使用到的资源：</p>
<p><img src="http://p0.qhimg.com/t01c58de62023ae4dfc.png" alt=""></p>
<p>Tinder也使用了<a href="https://developers.google.com/web/fundamentals/primers/service-workers/">Service Workers</a>来预缓存所有路由层的代码包，并把用户最有可能访问的路由在未做分割的情况下加进了主包中。当然他们也使用了最常用的优化手段，例如通过UglifyJS最小化JavaScript文件的体积：</p>
<pre><code class="hljs yaml"><span class="hljs-string">new</span> <span class="hljs-string">webpack.optimize.UglifyJsPlugin({</span>
<span class="hljs-attr">    parallel:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    compress:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    warnings:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        screw_ie8:</span> <span class="hljs-literal">true</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    sourceMap:</span> <span class="hljs-string">SHOULD_SOURCEMAP</span>
<span class="hljs-string">}),</span>

</code></pre><h4>影响</h4>
<p>在引入了基于路由的代码分割之后，他们的主包的大小从166KB降至了101KB，DCL从5.46秒降至4.69秒：</p>
<p><img src="http://p0.qhimg.com/t01ea1e7b6bfadfaffb.png" alt=""></p>
<h3>资源的长期缓存</h3>
<p>通过使用webpack的[chunkhash]向文件名中加入独一无二的字段，这保证了静态资源的<a href="https://webpack.js.org/guides/caching/">长期缓存</a>。</p>
<p><img src="http://p0.qhimg.com/t0181f677a9d045c9f1.png" alt=""></p>
<p>Tinder在依赖中使用了很多开源的库。vendor的[chunkhash]会随着对这些库作出的改变而改变，这就会使缓存失效。为了解决这个问题，Tinder定义了一个<a href="https://gist.github.com/tinder-rhsiao/89cd682c34d1e1307111b091801e6fe5">外部库白名单</a>，并将他们的manifest文件从主代码块中分离出来，以改善缓存。现在两个代码包的大小大约都是160KB。</p>
<h3>预加载后期使用资源</h3>
<p>作为一名新手，<a href="https://developers.google.com/web/fundamentals/performance/resource-prioritization">&lt;link rel="preload"&gt;</a>是一个声明式的命令，指导浏览器预先加载关键的、后续会用到的资源。在一个单页面应用里面，这些资源可能会是JavaScript包。</p>
<p><img src="http://p0.qhimg.com/t01c71a5401eb753861.png" alt=""></p>
<p>Tinder启用了对对用户体验至关重要的JavaScript/webpack包的预加载的支持。这将加载时间减少了1秒，初次绘制时间也从1000毫秒降至500毫秒左右。</p>
<p><img src="http://p0.qhimg.com/t018a5d21004b40ef92.png" alt=""></p>
<h3>性能预算</h3>
<p>Tinder采用了<strong>性能预算</strong>来帮助他们在移动端达到他们的目标。正如Alex Russell在“<a href="https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/">Can you afford it?: real-world performance budgets</a>”提及的，在使用3G网络的中端移动设备上，你所能利用的资源是非常有限的。</p>
<p>为了保证快速的交互，Tinder制定了一个强制性的体积预算——主包和vendor包155KB，异步加载（懒加载）55KB，其它的块35KB。CSS也有限制，20KB。如果他们想将不同设备上的性能保持一致，这些至关重要。</p>
<p><img src="http://p0.qhimg.com/t0186aaaafde8d61b39.png" alt=""></p>
<h3>Webpack打包分析</h3>
<p><a href="https://github.com/webpack-contrib/webpack-bundle-analyzer">Webpack打包分析器</a>可以绘制JavaScript包的依赖关系图，可以使你更容易地发现性能瓶颈，以便继续做优化。</p>
<p><img src="http://p0.qhimg.com/t01e35ec62f2ffd3e85.png" alt=""></p>
<p>Tinder使用了Webpack Bundle Analyzer发现了很多可以继续优化的地方：</p>
<ul>
<li><p><strong>Polyfills：</strong>Tinder的目标是现代浏览器，但他们同样兼顾IE11和Android 4.4设备及以上的浏览器，<strong>为了使polyfills和编译后的代码体积尽可能小，他们使用了</strong><a href="https://github.com/babel/babel-preset-env"><strong>babel-preset-env</strong></a><strong>以及</strong><a href="https://github.com/zloirock/core-js"><strong>core-js</strong></a>**。</p>
</li>
<li><p><strong>削减库的使用：</strong>Tinder直接使用IndexedDB替代<a href="https://github.com/localForage/localForage">localForage</a>。</p>
</li>
<li><p><strong>更好的分割：</strong>将首屏/首次交互不需要的组件从主包中分离出去。</p>
</li>
<li><p><strong>代码复用：</strong>将使用次数超过三次的模块提取出来，创建为异步加载的公共模块。</p>
</li>
<li><p><strong>CSS：</strong>Tinder将<a href="https://www.smashingmagazine.com/2015/08/understanding-critical-css/">关键CSS</a>从核心包中分离了出来（因为他们使用了服务端渲染，无论如何都将这部分CSS发回到客户端）</p>
</li>
</ul>
<p><img src="http://p0.qhimg.com/t0109afde917d007f70.png" alt=""></p>
<p>使用打包分析器同样使Tinder意识到Webpack的<a href="https://github.com/lodash/lodash-webpack-plugin">Lodash Module Replacement Plugin</a>的重要性。这个插件可以使用更简单的替换包，创建出更小的Lodash构建包：</p>
<p><img src="http://p0.qhimg.com/t010923c95ba7bb8853.png" alt=""></p>
<p>Webpack打包分析器可以嵌入到你的Webpack配置中。Tinder的设置看起来就像下面的这样：</p>
<pre><code class="hljs yaml"><span class="hljs-attr">plugins:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">new</span> <span class="hljs-string">BundleAnalyzerPlugin({</span>
<span class="hljs-attr">        analyzerMode:</span> <span class="hljs-string">'server'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        analyzerPort:</span> <span class="hljs-number">8888</span><span class="hljs-string">,</span>
<span class="hljs-attr">        reportFilename:</span> <span class="hljs-string">'report.html'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        openAnalyzer:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        generateStatsFile:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        statsFilename:</span> <span class="hljs-string">'stats.json'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        statsOptions:</span> <span class="hljs-literal">null</span>
    <span class="hljs-string">})</span>
<span class="hljs-string">]</span>
</code></pre><p>剩下的大部分JavaScript就是主包，如果不对Redux Reducer和Saga Register做架构上的改变的话，很难再去做这部分的分割工作。</p>
<h3>CSS策略</h3>
<p>Tinder使用了<a href="https://acss.io/">Atomic CSS</a>来创建高度可复用的CSS样式。所有的这些原子化的CSS样式会在初次绘制时加入到内联样式中，剩下的CSS则会在样式表中加载（包括动画和基础/重置样式）。关键的样式有20KB的限制，最近的打包体积已经降低到了11KB以下。</p>
<p>Tinder使用<a href="http://cssstats.com/stats?url=https%253A%252F%252Ftinder.com&amp;ua=Browser%2520Default%0A">CSS stats</a>和Google Analystics来分析每个发行版本中改动的地方。在采用Atomic CSS之前，页面的平均加载时间是6.75秒，之后则降低为5.75秒。</p>
<p><img src="http://p0.qhimg.com/t019469fc37704570a6.png" alt=""></p>
<p>Tinder Online同样使用了PostCSS <a href="https://twitter.com/autoprefixer">Autoprefixer plugin</a>解析CSS，并按照<a href="http://caniuse.com/">Can I Use</a>的规则为CSS加上前缀。</p>
<pre><code class="hljs less"><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.LoaderOptionsPlugin</span>({
    <span class="hljs-attribute">options</span>: {
        <span class="hljs-attribute">context</span>: paths.basePath,
        <span class="hljs-attribute">output</span>: { <span class="hljs-attribute">path</span>: <span class="hljs-string">'./'</span> },
        <span class="hljs-attribute">minimize</span>: true,
        <span class="hljs-attribute">postcss</span>: [
            autoprefixer({
            <span class="hljs-attribute">browsers</span>: [
                <span class="hljs-string">'last 2 versions'</span>,
                <span class="hljs-string">'not ie &lt; 11'</span>,
                <span class="hljs-string">'Safari &gt;= 8'</span>
                ]
            })
        ]
    }
}),
</code></pre><h3>运行时性能</h3>
<h4>使用requestIdleCallback()延迟非关键工作</h4>
<p>为了提高运行时的性能，Tinder选择了使用<a href="https://developers.google.com/web/updates/2015/08/using-requestidlecallback">requestIdleCallback()</a>将非关键动作推迟到空闲时间中。</p>
<pre><code class="hljs lisp">requestIdleCallback(<span class="hljs-name">myNonEssentialWork</span>)<span class="hljs-comment">;</span>
</code></pre><p>其中包括诸如instrumentation beacons这样的工作。他们也对HTML复合层做了简化处理，以减少滑动时的绘制次数。
<strong>在滑动时对instrumentation beacons使用requestIdleCallback()：</strong></p>
<p>之前..</p>
<p><img src="http://p0.qhimg.com/t01b8290f3346471572.png" alt=""></p>
<p>之后</p>
<p><img src="http://p0.qhimg.com/t01c003f7a26d4f2994.png" alt=""></p>
<h3>依赖升级</h3>
<p><strong>Webpack 3 + 作用域提升</strong>
在旧版本的webpack中打包时，每个模块都会被包含在一个单独的闭包中。这些包含函数会拖慢浏览器中JavaScript的执行速度。<a href="https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b">Webpack 3</a>引入了“作用域提升”——可以将所有的模块打包进一个闭包之中，这样可以使浏览器中JavaScript的执行速度更快。这个功能使用的是Module Concatenation plugin：</p>
<pre><code class="hljs stylus">new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.ModuleConcatenationPlugin</span>()
</code></pre><p><strong>Webpack 3的作用域提升将Tinder的vendor包的初次解析时间降低了8%。</strong></p>
<p><strong>React 16</strong></p>
<p>React16相比之前的版本，做了一些改进，<a href="https://reactjs.org/blog/2017/09/26/react-v16.0.html#reduced-file-size">降低了React包的体积大小</a>。这去除了现在已经不再使用的代码，带来了更好的打包体验（使用Rollup）。</p>
<p><strong>通过将React 15升级为React 16，Tinder将gzip压缩后的vendor包的体积减小了7%</strong>
react + react-dom的体积过去是50KB，现在已经降低为35KB。这要感谢<a href="https://twitter.com/dan_abramov">Dan Abramov</a>，<a href="https://twitter.com/trueadm">Dominic Gannaway</a>和<a href="https://twitter.com/natehunzaker">Nate Hunzaker</a>，他们在这项工作中起到了指导性的作用。</p>
<h3>Workbox——网络弹性和离线资源缓存</h3>
<p>Tinder还使用了<a href="https://developers.google.com/web/tools/workbox/get-started/webpack">Workbox Webpack plugin</a>，来缓存<a href="https://developers.google.com/web/fundamentals/architecture/app-shell">应用骨架</a>和诸如主包、vendor包、manifest包以及CSS等的核心静态资源。针对频繁的访问，这保证了网络弹性，并且确保用户在回到应用时的加载速度会更快。</p>
<p><img src="http://p0.qhimg.com/t01d8e7f34082b4207f.png" alt=""></p>
<h3>机遇</h3>
<p>使用<a href="https://www.npmjs.com/package/source-map-explorer">source-map-explorer</a>（另一个包分析器）对Tinder包做深入分析之后，我们发现仍然存在很多机会可以减小应用的体积。在登录之前，Facebook Photos、推送消息和验证码就已经获取了。这些如果从关键路径中移除，还可以将主包体积降低20%：</p>
<p><img src="http://p0.qhimg.com/t01b581564f4b3c0a08.png" alt=""></p>
<p>关键路径中的另一个依赖则是Facebook SDK脚本，体积为200KB。丢掉这个（可以在需要的时候懒加载）可以节省1秒的初次加载时间。</p>
<h3>结语</h3>
<p>Tinder仍然在迭代他们的渐进式网页应用，但是已经从他们的工作中看到了很多好的结果。赶快去浏览<a href="https://tinder.com/">Tinder.com</a>，跟上他们未来的进度吧！</p>
<p><em>恭喜Roderick Hsiao、Jordan Banafsheha和Erik Hellenbrand上线Tinder Online，感谢他们为这篇文章的付出。并衷心感谢Cheney Tsai为这篇文章做的审校工作。</em></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Tinder渐进式网页应用性能案例学习

## 原文链接
[https://www.zcfy.cc/article/a-tinder-progressive-web-app-performance-case-study](https://www.zcfy.cc/article/a-tinder-progressive-web-app-performance-case-study)

