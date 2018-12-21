---
title: 'React同构与极致的性能优化' 
date: 2018-12-21 2:30:11
hidden: true
slug: lwwv8qreoq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文发表于<a href="https://github.com/alibaba/beidou/blob/master/packages/beidou-docs/articles/high-performance-isomorphic-app.md" rel="nofollow noreferrer" target="_blank">北斗同构github</a>, 转载请注明出处</blockquote>
<p>注： 本文为<a href="http://d2forum.alibaba-inc.com/" rel="nofollow noreferrer" target="_blank">第12届D2前端技术论坛《打造高可靠与高性能的React同构解决方案》</a>分享内容，已经过数据脱敏处理。</p>
<h2 id="articleHeader0">前言</h2>
<ul><li>随着React的兴起, 结合Node直出的性能优势和React的组件化，React同构已然成为趋势之一。享受技术福利的同时，直面技术挑战，在复杂场景下，挑战10倍以上极致的性能优化。</li></ul>
<h2 id="articleHeader1">什么是同构？</h2>
<ul><li>一套代码既可以在服务端运行又可以在客户端运行，这就是同构应用。简而言之, 就是服务端直出和客户端渲染的组合, 能够充分结合两者的优势，并有效避免两者的不足。</li></ul>
<h2 id="articleHeader2">为什么同构？</h2>
<ul>
<li>性能: 通过Node直出, 将传统的三次串行http请求简化成一次http请求，降低首屏渲染时间</li>
<li>SEO: 服务端渲染对搜索引擎的爬取有着天然的优势，虽然阿里电商体系对SEO需求并不强，但随着国际化的推进, 越来越多的国际业务加入阿里大家庭，很多的业务依赖Google等搜索引擎的流量导入，比如Lazada.</li>
<li>兼容性: 部分展示类页面能够有效规避客户端兼容性问题，比如白屏。</li>
</ul>
<h2 id="articleHeader3">性能数据</h2>
<p>性能是一个综合性的问题, 不能简单地断言同构应用一定比非同构应用性能好，只能说合适的场景加上合理的运用，同构应用确实能带来一定的性能提升, 先来看一个线上的案例。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464038?w=700&amp;h=650" src="https://static.alili.tech/img/remote/1460000012464038?w=700&amp;h=650" alt="isomorphic" title="isomorphic" style="cursor: pointer;"></span></p>
<p>通常来说，网络状况越差，同构的优势越明显，下图是在不同网络状况下首屏渲染时间的一组对比</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464039?w=2468&amp;h=1190" src="https://static.alili.tech/img/remote/1460000012464039?w=2468&amp;h=1190" alt="isomorphic" title="isomorphic" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">线上案例</h2>
<ul>
<li>近两年，无论是业界还是阿里内部都涌现了大量同构实践, 业界比较有影响力的包括Facebook, Quora, Medium, Twitter, Airbnb, Walmart、手Q以及QQ兴趣部落等</li>
<li>
<p>阿里内部也有大量的应用，仅列举部分<a href="https://github.com/alibaba/beidou" rel="nofollow noreferrer" target="_blank">beidou开发组</a>做过技术支持的项目</p>
<ul>
<li>阿里云 - 大数据地产</li>
<li>钉钉 - 企业主页</li>
<li>钉钉 - 钉钉日志和审批模板市场</li>
<li>菜鸟 - 物流大市场</li>
<li>云零售 - 店掌柜</li>
<li>Lazada - PDP</li>
<li>国际事业部 - AGLA</li>
<li>AILab - 行业解决方案</li>
<li>AILab - 智能硬件平台</li>
<li>AILab - AliGenie开放平台</li>
<li>AILab - AR官网</li>
<li>ICBU - ICBU店铺</li>
<li>业务平台 - 门店评价</li>
<li>国际UED - 数据运营</li>
<li>国际UED - 知之</li>
<li>国际UED - 探花</li>
<li>国际UED - Nuke官网及过程管理</li>
<li>国际UED - 会议记录，实时翻译</li>
<li>国际UED - LBS数据地图</li>
<li>国际UED - 数探</li>
<li>国际UED - 微策</li>
<li>国际UED - shuttle</li>
<li>国际UED - fie portal</li>
<li>...</li>
</ul>
</li>
</ul>
<h2 id="articleHeader5">业界生态</h2>
<ul>
<li>
<a href="https://react-server.io/" rel="nofollow noreferrer" target="_blank">react-server</a>: React服务端渲染框架</li>
<li>
<a href="https://github.com/zeit/next.js" rel="nofollow noreferrer" target="_blank">next.js</a>: 轻量级的同构框架</li>
<li>
<a href="https://github.com/alibaba/beidou" rel="nofollow noreferrer" target="_blank">beidou</a>: 阿里自己的同构框架，基于eggjs, 定位是企业级同构框架</li>
</ul>
<p>除了开源框架，底层方面React16重构了SSR, react-router提供了更加友好的SSR支持等等, 从某种程度上来说，同构也是一种趋势，至少是方向之一。</p>
<h2 id="articleHeader6">思考 与 实现</h2>
<p>同构的出发点不是 “为了做同构，所以做了”, 而是回归业务，去解决业务场景中SEO、首屏性能、用户体验 等问题，驱动我们去寻找可用的解决方案。在这样的场景下，除了同构本身，我们还需要考虑的是:</p>
<ul>
<li>高性能的 Node Server</li>
<li>可靠的 同构渲染服务</li>
<li>可控的 运维成本</li>
<li>可复用的 解决方案</li>
<li>...</li>
</ul>
<p>简单归纳就是, 我们需要一个 企业级的同构渲染解决方案。</p>
<p><strong>我们是怎么做的？</strong></p>
<h4>基于 eggjs 加入可拔插的同构能力</h4>
<ul>
<li>
<a href="https://github.com/alibaba/beidou/tree/master/packages/beidou-plugin-react" rel="nofollow noreferrer" target="_blank">beidou-plugin-react</a><br>作为原有MVC架构中, view 层的替换, 使用 React 组件作为视图层模板, 可以直接渲染 React Component 并输出给客户端</li>
<li>
<a href="https://github.com/alibaba/beidou/tree/master/packages/beidou-plugin-webpack" rel="nofollow noreferrer" target="_blank">beidou-plugin-webpack</a><br>集成 Webpack 到框架中, 在开发阶段, 提供代码的编译和打包服务</li>
<li>
<a href="https://github.com/alibaba/beidou/tree/master/packages/beidou-plugin-isomorphic" rel="nofollow noreferrer" target="_blank">beidou-plugin-isomorphic</a><br>服务端的 React 运行时: babel-register<br>polyfill 注入: 环境变量, BOM等<br>非js文件解析: css, images, fonts...</li>
<li>服务端支持css modules</li>
<li>
<a href="https://github.com/alibaba/beidou/blob/master/packages/beidou-docs/basic/router.md#auto-router" rel="nofollow noreferrer" target="_blank">自动路由</a>: 纯静态页面无需编写任何服务端代码，像写纯前端页面一样简单</li>
<li>...</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464040?w=620&amp;h=415" src="https://static.alili.tech/img/remote/1460000012464040?w=620&amp;h=415" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这里不再赘述具体如何实现，有兴趣的读者可以阅读我们的开源同构框架<a href="https://github.com/alibaba/beidou" rel="nofollow noreferrer" target="_blank">beidou</a> -- <a href="https://github.com/alibaba/beidou" rel="nofollow noreferrer" target="_blank">https://github.com/alibaba/beidou</a></p>
<h2 id="articleHeader7">热点问题</h2>
<p>任何一种技术都有其适用场景和局限性, 同构也不例外，以下试举一二，以做抛砖引玉.</p>
<ul>
<li>内存泄漏</li>
<li>性能瓶颈</li>
<li>...</li>
</ul>
<p>内存泄漏不是同构应用所特有的，理论上所有服务端应用都可能内存泄漏，但同构应用是“高危群体”, 具体如何解决请参考本人的<a href="https://github.com/alibaba/beidou/blob/master/packages/beidou-docs/articles/node-memory-leak.md" rel="nofollow noreferrer" target="_blank">《Node应用内存泄漏分析方法论与实战》</a>, 接下来重点剖析下性能优化。</p>
<h2 id="articleHeader8">极致的性能优化</h2>
<p>前面也提到了，同构应用并不一定就比非同构应用性能好，影响性能的因素实在太多了，再来看一组数据</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464041?w=1732&amp;h=822" src="https://static.alili.tech/img/remote/1460000012464041?w=1732&amp;h=822" alt="react15 performance" title="react15 performance" style="cursor: pointer;"></span></p>
<p>上图是基于Node v8.9.1 和 React@15.5.4, 开4个进程采集到的数据, X轴是最终生成页面节点数量，Y轴红色的线表示RT(包括渲染时间和网络时间), 绿色的柱子表示QPS. 可以看出来:</p>
<ul><li>随着页面节点的增多渲染时间可能变得很长，QPS下降非常迅速。在页面节点超过3000左右的时候，QPS接近个位数了，而且实际页面中可能包含较复杂的逻辑以及不友好的写法，情况可能会更糟。</li></ul>
<p>顺带提一下, 笔者采样了<a href="https://www.taobao.com/" rel="nofollow noreferrer" target="_blank">淘宝首页</a> 和<a href="https://item.taobao.com/item.htm?id=558951082993" rel="nofollow noreferrer" target="_blank">淘宝某详情页</a>以及<a href="https://www.lazada.com.my/vanier-classic-gentlemen-fashion-laser-series-wristwatch-all-black-59739287.html?spm=a2o4k.home.sku-feed-slider-with-banner_42126.4.rpGQzs" rel="nofollow noreferrer" target="_blank">Lazada某详情页</a>，页面节点数分别是2620、2467和3701. 大部分情况下，页面节点数低于1000， 比如<a href="https://56.cainiao.com/" rel="nofollow noreferrer" target="_blank">菜鸟物流市场</a>首页看起来内容不少，其实节点数是775.</p>
<p>那针对3000节点以上的页面，我们该怎么做呢？笔者总结了以下策略并重点阐述其中一两点：</p>
<ul>
<li>采用编译后的React版本: 根据Sasha Aickin的博客，React15在Node4、Node6、Node8下，采用编译后的版本性能相比未编译版本分别提升了2.36倍、3倍、3.85倍</li>
<li>模块拆分: 模块拆分有利于并发渲染，目前ICBU店铺装修采用的就是这种方式</li>
<li>模块级别缓存: 页面中某些模块其实是很适合缓存的，比如Lazada详情页中节点数虽然高达3701, 但其实页头部分就占比55.5%，页尾占比3.5%，而页头页尾是常年不变的.</li>
<li>组件级缓存： 最小粒度的缓存单位了，性能提升依赖于缓存的范围和命中率，运用得当，可能带来非常大的性能提升。参考<a href="https://medium.com/walmartlabs/reactjs-ssr-profiling-and-caching-5d8e9e49240c" rel="nofollow noreferrer" target="_blank">walmartlabs</a>
</li>
<li>采用hsf代替http对外提供服务: hsf的网络消耗远低于http, 在店铺同构实践中，改用hsf, java端调用Node端的耗时缩短了一半.</li>
<li>部分模块客户端渲染(对SEO无用的部分): 直接降低SSR部分的复杂度</li>
<li>智能降级: 当流量暴增，接近或超过阈值时，会直接导致服务的RT快速上升。可以实时监测CPU和内存的使用率，超过一定的比例自动降级为客户端渲染，降低服务端压力，CPU和内存恢复常态时，自动切回服务端渲染。</li>
<li>采用Node8: 同样在店铺实践中，采用Node8相比Node6, 渲染时间从28ms降低到了18ms, 提升幅度为36%.</li>
<li>采用最新版React16: <a href="https://reactjs.org/blog/2017/09/26/react-v16.0.html#better-server-side-rendering" rel="nofollow noreferrer" target="_blank">facebook官方数据</a>, 在Node8下，React16相比编译后的react15仍有3.8倍提升，相比未编译的React15更是有数量级的提升。</li>
</ul>
<h4>组件级缓存</h4>
<p>如果说性能优化有"万能"的招式，那一定是缓存, 从Nigix缓存到模块级缓存到组件级缓存，其中最让人兴奋的就是组件级缓存，让我们一起来看看如何实现</p>
<ul>
<li>
<p>拦截React的渲染逻辑，业界主要有三种实现方式</p>
<ul>
<li>Fork一份React, 暴力加入缓存逻辑, 代表库是<a href="https://github.com/aickin/react-dom-stream" rel="nofollow noreferrer" target="_blank">react-dom-stream</a>, 虽然这个库的人气很高，但笔者还是反对这种实现方式的。</li>
<li>通过require hook拦截instantiateReactComponent的载入并注入缓存逻辑，参考<a href="https://github.com/walmartlabs/react-ssr-optimization/blob/master/lib/index.js#L211-L220" rel="nofollow noreferrer" target="_blank">react-ssr-optimization</a>
</li>
<li>扩展ReactCompositeComponent的mountComponent方法，参考<a href="https://github.com/electrode-io/electrode-react-ssr-caching/blob/master/lib/ssr-caching.js#L148-L161" rel="nofollow noreferrer" target="_blank">electrode-react-ssr-cachin</a>
</li>
</ul>
</li>
<li>注入缓存逻辑, 代码如下</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ReactCompositeComponent = require(&quot;react/lib/ReactCompositeComponent&quot;);

ReactCompositeComponent.Mixin._mountComponent = ReactCompositeComponent.Mixin.mountComponent;
ReactCompositeComponent.Mixin.mountComponent = function(rootID, transaction, context) {
  
  const hashKey = generateHashKey(this._currentElement.props);
  if (cacheStorage.hasEntry(hashKey)) {
    // 命中缓存则直接返回缓存结果
    return cacheStorage.getEntry(hashKey);
  } else {
    // 若未命中，则调用react的mountComponent渲染组件，并缓存结果
    const html = this._mountComponent(rootID, transaction, context);
    cacheStorage.addEntry(hashKey, html);
    return html;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> ReactCompositeComponent = <span class="hljs-built_in">require</span>(<span class="hljs-string">"react/lib/ReactCompositeComponent"</span>);

ReactCompositeComponent.Mixin._mountComponent = ReactCompositeComponent.Mixin.mountComponent;
ReactCompositeComponent.Mixin.mountComponent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">rootID, transaction, context</span>) </span>{
  
  <span class="hljs-keyword">const</span> hashKey = generateHashKey(<span class="hljs-keyword">this</span>._currentElement.props);
  <span class="hljs-keyword">if</span> (cacheStorage.hasEntry(hashKey)) {
    <span class="hljs-comment">// 命中缓存则直接返回缓存结果</span>
    <span class="hljs-keyword">return</span> cacheStorage.getEntry(hashKey);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 若未命中，则调用react的mountComponent渲染组件，并缓存结果</span>
    <span class="hljs-keyword">const</span> html = <span class="hljs-keyword">this</span>._mountComponent(rootID, transaction, context);
    cacheStorage.addEntry(hashKey, html);
    <span class="hljs-keyword">return</span> html;
  }
};</code></pre>
<ul><li>设置最大缓存和缓存更新策略</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lruCacheSettings: {
      max: 500,  // The maximum size of the cache
      maxAge: 1000 * 5 // The maximum age in milliseconds
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">lruCacheSettings: {
      <span class="hljs-attr">max</span>: <span class="hljs-number">500</span>,  <span class="hljs-comment">// The maximum size of the cache</span>
      maxAge: <span class="hljs-number">1000</span> * <span class="hljs-number">5</span> <span class="hljs-comment">// The maximum age in milliseconds</span>
  }</code></pre>
<p>上述缓存逻辑是基于属性的，能覆盖大部分的应用场景，但有一个要求，属性值必须可枚举且可选项很少. 请看下面的场景。<br><span class="img-wrap"><img data-src="/img/remote/1460000012464042?w=1476&amp;h=1068" src="https://static.alili.tech/img/remote/1460000012464042?w=1476&amp;h=1068" alt="items" title="items" style="cursor: pointer;"></span></p>
<p>淘宝某页面上有大量的商品，而淘宝的商品又何止百万，就算某个被缓存，下次被命中的可能性依然微乎其微。那如何解决这个问题？聪明的读者可能已经看出来了，虽然每个商品最终渲染的结果千变万化，但结构始终是一致的，因此结构是可以缓存的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464043?w=390&amp;h=666" src="https://static.alili.tech/img/remote/1460000012464043?w=390&amp;h=666" alt="template" title="template" style="cursor: pointer;"></span></p>
<p>要实现结构的缓存，需要在上述逻辑上额外新增三步。</p>
<ul>
<li>
<p>生成中间结构：</p>
<ul><li>以组件<code>&lt;Price&gt;${price}&lt;/Price&gt;</code>为例，将变量price以占位符<code>${price}</code>代替<code>set(price, "${price}")</code>, 再调用react原生的mountComponent方法则可以生成中间结构<code>&lt;div&gt;${price}&lt;/div</code>
</li></ul>
</li>
<li>缓存中间结构</li>
<li>生成最终组件</li>
</ul>
<p>以上就是组件级缓存的实现方式, 特别要提醒的是缓存是把双刃剑，运用不当可能会引发内存泄漏以及数据的不一致。</p>
<h4>React16 SSR</h4>
<ul><li>FB在9.26发布了React16正式版，之前万众期待的<a href="https://hackernoon.com/whats-new-with-server-side-rendering-in-react-16-9b0d78585d67" rel="nofollow noreferrer" target="_blank">SSR性能提升</a>没有让大家失望, 引用React核心开发Sasha Aickin的对比图</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464044?w=1600&amp;h=987" src="https://static.alili.tech/img/remote/1460000012464044?w=1600&amp;h=987" alt="react16" title="react16" style="cursor: pointer; display: inline;"></span></p>
<p>笔者拿之前的应用升级到React16, 对比下3909节点，RT从295ms降到了51ms, QPS从9提升到了44, 提升非常明显。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464045?w=1662&amp;h=812" src="https://static.alili.tech/img/remote/1460000012464045?w=1662&amp;h=812" alt="react16" title="react16" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">实战</h2>
<p>接下来通过一个例子，展示如何一步步地提升性能。<br><a href="https://github.com/alibaba/beidou/tree/master/examples/performance" rel="nofollow noreferrer" target="_blank">代码仓库</a> -- <a href="https://github.com/alibaba/beidou/" rel="nofollow noreferrer" target="_blank">https://github.com/alibaba/beidou/</a></p>
<h3 id="articleHeader10">10倍以上性能提升</h3>
<ul><li>首先构造一个非常复杂的页面, 页面节点数是3342, 对比之下，<a href="https://www.taobao.com/" rel="nofollow noreferrer" target="_blank">淘宝首页</a>首屏的页面节点数是831, 异步充分加载之后(懒加载完成),整个页面节点数为3049. 注： 淘宝页面为动态页面，每次采样可能会有差异。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464046?w=2420&amp;h=1276" src="https://static.alili.tech/img/remote/1460000012464046?w=2420&amp;h=1276" alt="复杂页面" title="复杂页面" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464047?w=2532&amp;h=1110" src="https://static.alili.tech/img/remote/1460000012464047?w=2532&amp;h=1110" alt="淘宝首屏" title="淘宝首屏" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464048?w=2582&amp;h=1324" src="https://static.alili.tech/img/remote/1460000012464048?w=2582&amp;h=1324" alt="淘宝全屏" title="淘宝全屏" style="cursor: pointer;"></span></p>
<ul><li>初始平均渲染时间为<code>295.75ms</code>(Node6.92, React15.6.2), 注: 图中有<code>296.50ms</code>,<code>317.25ms</code>,<code>297.25ms</code>,<code>295.75ms</code>四个平均值，是因为开启了四个进程，采样最后一个，下同。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464049?w=848&amp;h=612" src="https://static.alili.tech/img/remote/1460000012464049?w=848&amp;h=612" alt="初始渲染时间" title="初始渲染时间" style="cursor: pointer;"></span></p>
<ul><li>启用<a href="https://github.com/alibaba/beidou/blob/master/examples/performance/.babelrc#L3-L6" rel="nofollow noreferrer" target="_blank">babel性能加速插件</a>, 平均渲染时间为<code>219.00ms</code>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464050?w=796&amp;h=618" src="https://static.alili.tech/img/remote/1460000012464050?w=796&amp;h=618" alt="babel性能加速插件" title="babel性能加速插件" style="cursor: pointer;"></span></p>
<ul><li>采用Node8.9.1(或更新版本)平均渲染时间为<code>207ms</code>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464051?w=837&amp;h=614" src="https://static.alili.tech/img/remote/1460000012464051?w=837&amp;h=614" alt="Node8" title="Node8" style="cursor: pointer;"></span></p>
<ul><li>采用<code>production</code>模式平均渲染时间为<code>81.75ms</code>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464052?w=835&amp;h=614" src="https://static.alili.tech/img/remote/1460000012464052?w=835&amp;h=614" alt="production mode" title="production mode" style="cursor: pointer;"></span></p>
<ul><li>部分内容客户端渲染，平均渲染时间为<code>44.63ms</code>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464053?w=837&amp;h=633" src="https://static.alili.tech/img/remote/1460000012464053?w=837&amp;h=633" alt="part csr" title="part csr" style="cursor: pointer;"></span></p>
<ul><li>部分内容组件级别cache,平均渲染时间为<code>22.65ms</code>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464054?w=834&amp;h=635" src="https://static.alili.tech/img/remote/1460000012464054?w=834&amp;h=635" alt="part cache" title="part cache" style="cursor: pointer;"></span></p>
<ul><li>采用React16(或更新版本)，平均渲染时间为<code>5.17ms</code>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464055?w=837&amp;h=631" src="https://static.alili.tech/img/remote/1460000012464055?w=837&amp;h=631" alt="react16" title="react16" style="cursor: pointer;"></span></p>
<ul><li>结合React16和部分客户端渲染，平均渲染时间为<code>2.68ms</code>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012464056" src="https://static.alili.tech/img/remote/1460000012464056" alt="react16+csr" title="react16+csr" style="cursor: pointer;"></span></p>
<p>至此，服务端渲染时间已经最初的<code>295.75ms</code>降低到了<code>2.68ms</code>，提升了超过100倍。</p>
<h3 id="articleHeader11">更多性能策略</h3>
<p>其实除了上述应用的策略，还有其它的策略，比如</p>
<ul>
<li>采用<code>Async</code>, 有数据称性能提升30%, 笔者试了下，未见明显提升。应该是经过了babel的编译，最终没有发挥出<code>Async</code>的优势，这是因为<a href="https://github.com/alibaba/beidou" rel="nofollow noreferrer" target="_blank">beidou框架</a>在服务端要支持<code>import</code>等ES6的写法以及支持React的<code>JSX语法</code>。其实也非常简单，直接缩小<code>babel</code>的编译范围，在<a href="https://github.com/alibaba/beidou" rel="nofollow noreferrer" target="_blank">beidou框架</a>中是可以自己定义的。</li>
<li>降低React组件的嵌套层级。试验数据，同样的页面节点数，服务端渲染时间和组件的嵌套层级是线性正相关的。</li>
<li>热点缓存</li>
</ul>
<p>...</p>
<h3 id="articleHeader12">万变不离其宗</h3>
<p>借用《功夫》中的一句经典台词<code>天下武功，无坚不破，唯快不破</code>，同样的，<br>随着时间的推移，上面这些策略策略迟早会<code>被破</code>，比如react16 ssr重构之后，之前的组件级别缓存逻辑不再有效。<br>另外，可能由于架构设计/技术选型根本就使不上劲，比如react16是今年9月26才正式发版，很多第三方组件还没来得及升级，如果应用中有些组件强依赖于react15或者更早的版本，可能根本就没法利用react16的性能优势。</p>
<p>那么有没有一种<code>万能的办法</code>，能够做到<code>唯快不破</code>呢？</p>
<p>答案是： 有的。 只有掌握了方法论，才能在不断变化中，找到适合自己应用的性能优化策略。</p>
<p>具体的方法论，请参考本人的另外一篇文章<a href="https://github.com/alibaba/beidou/blob/master/packages/beidou-docs/articles/node-performance-optimization.md" rel="nofollow noreferrer" target="_blank">《唯快不破，让nodejs再快一点》</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React同构与极致的性能优化

## 原文链接
[https://segmentfault.com/a/1190000012464033](https://segmentfault.com/a/1190000012464033)

