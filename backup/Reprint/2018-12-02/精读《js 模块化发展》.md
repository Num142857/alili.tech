---
title: '精读《js 模块化发展》' 
date: 2018-12-02 2:30:15
hidden: true
slug: zi1qo3hu9ns
categories: [reprint]
---

{{< raw >}}

                    
<p>这次是前端精读期刊与大家第一次正式碰面，我们每周会精读并分析若干篇精品好文，试图讨论出结论性观点。没错，我们试图通过观点的碰撞，争做无主观精品好文的意见领袖。</p>
<p>我是这一期的主持人 —— <a href="https://github.com/ascoders" rel="nofollow noreferrer" target="_blank">黄子毅</a></p>
<p>本期精读的文章是：<a href="https://github.com/myshov/history-of-javascript/tree/master/4_evolution_of_js_modularity" rel="nofollow noreferrer" target="_blank">evolutionOfJsModularity</a>。</p>
<p>懒得看文章？没关系，稍后会附上文章内容概述，同时，更希望能通过阅读这一期的精读，穿插着深入阅读原文。</p>
<h1 id="articleHeader0">1 引言</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014747918?w=475&amp;h=297" src="https://static.alili.tech/img/remote/1460000014747918?w=475&amp;h=297" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>如今，Javascript 模块化规范非常方便、自然，但这个新规范仅执行了2年，就在 4 年前，js 的模块化还停留在运行时支持，10 年前，通过后端模版定义、注释定义模块依赖。对经历过来的人来说，历史的模块化方式还停留在脑海中，反而新上手的同学会更快接受现代的模块化规范。</blockquote>
<p>但为什么要了解 Javascript 模块化发展的历史呢？因为凡事都有两面性，了解 Javascript 模块化规范，有利于我们思考出更好的模块化方案，纵观历史，从 1999 年开始，模块化方案最多维持两年，就出现了新的替代方案，比原有的模块化更清晰、强壮，我们不能被现代模块化方式限制住思维，因为现在的 ES2015 模块化方案距离发布也仅仅过了两年。</p>
<h1 id="articleHeader1">2 内容概要</h1>
<p><strong>直接定义依赖 (1999)</strong>: 由于当时 js 文件非常简单，模块化方式非常简单粗暴 —— 通过全局方法定义、引用模块。这种定义方式与现在的 commonjs 非常神似，区别是 commonjs 以文件作为模块，而这种方法可以在任何文件中定义模块，模块不与文件关联。</p>
<p><strong>闭包模块化模式 (2003)</strong>: 用闭包方式解决了变量污染问题，闭包内返回模块对象，只需对外暴露一个全局变量。</p>
<p><strong>模版依赖定义 (2006)</strong>: 这时候开始流行后端模版语法，通过后端语法聚合 js 文件，从而实现依赖加载，说实话，现在 go 语言等模版语法也很流行这种方式，写后端代码的时候不觉得，回头看看，还是挂在可维护性上。</p>
<p><strong>注释依赖定义 (2006)</strong>: 几乎和模版依赖定义同时出现，与 1999 年方案不同的，不仅仅是模块定义方式，而是终于以文件为单位定义模块了，通过 <a href="https://github.com/bevacqua/lazyjs" rel="nofollow noreferrer" target="_blank">lazyjs</a> 加载文件，同时读取文件注释，继续递归加载剩下的文件。</p>
<p><strong>外部依赖定义 (2007)</strong>: 这种定义方式在 cocos2d-js 开发中普遍使用，其核心思想是将依赖抽出单独文件定义，这种方式不利于项目管理，毕竟依赖抽到代码之外，我是不是得两头找呢？所以才有通过 webpack 打包为一个文件的方式暴力替换为 commonjs 的方式出现。</p>
<p><strong>Sandbox模式 (2009)</strong>: 这种模块化方式很简单，暴力，将所有模块塞到一个 <code>sanbox</code> 变量中，硬伤是无法解决明明冲突问题，毕竟都塞到一个 <code>sandbox</code> 对象里，而 <code>Sandbox</code> 对象也需要定义在全局，存在被覆盖的风险。模块化需要保证全局变量尽量干净，目前为止的模块化方案都没有很好的做到这一点。</p>
<p><strong>依赖注入 (2009)</strong>: 就是大家熟知的 angular1.0，依赖注入的思想现在已广泛运用在 react、vue 等流行框架中。但依赖注入和解决模块化问题还差得远。</p>
<p><strong>CommonJS (2009)</strong>: 真正解决模块化问题，从 node 端逐渐发力到前端，前端需要使用构建工具模拟。</p>
<p><strong>Amd (2009)</strong>: 都是同一时期的产物，这个方案主要解决前端动态加载依赖，相比 commonJs，体积更小，按需加载。</p>
<p><strong>Umd (2011)</strong>: 兼容了 CommonJS 与 Amd，其核心思想是，如果在 commonjs 环境（存在 <code>module.exports</code>，不存在 <code>define</code>），将函数执行结果交给 <code>module.exports</code> 实现 Commonjs，否则用 Amd 环境的 <code>define</code>，实现 Amd。</p>
<p><strong>Labeled Modules (2012)</strong>: 和 Commonjs 很像了，没什么硬伤，但生不逢时，碰上 Commonjs 与 Amd，那只有被人遗忘的份了。</p>
<p><strong>YModules (2013)</strong>: 既然都出了 Commonjs Amd，文章还列出了此方案，一定有其独到之处。其核心思想在于使用 <code>provide</code> 取代 <code>return</code>，可以控制模块结束时机，处理异步结果；拿到第二个参数 <code>module</code>，修改其他模块的定义（虽然很有拓展性，但用在项目里是个搅屎棍）。</p>
<p><strong>ES2015 Modules (2015)</strong>: 就是我们现在的模块化方案，还没有被浏览器实现，大部分项目已通过 <code>babel</code> 或 <code>typescript</code> 提前体验。</p>
<h1 id="articleHeader2">3 精读</h1>
<p>本次提出独到观点的同学有：<a href="https://github.com/arcthur" rel="nofollow noreferrer" target="_blank">流形</a>，<a href="https://github.com/ascoders" rel="nofollow noreferrer" target="_blank">黄子毅</a>，<a href="https://github.com/javie007" rel="nofollow noreferrer" target="_blank">苏里约</a>，<a href="https://github.com/camsong" rel="nofollow noreferrer" target="_blank">camsong</a>，<a href="https://github.com/jasonslyvia" rel="nofollow noreferrer" target="_blank">杨森</a>，<a href="https://github.com/BlackGanglion" rel="nofollow noreferrer" target="_blank">淡苍</a>，<a href="https://github.com/fanhc019" rel="nofollow noreferrer" target="_blank">留影</a>，精读由此归纳。</p>
<h3 id="articleHeader3">从语言层面到文件层面的模块化</h3>
<blockquote>从 1999 年开始，模块化探索都是基于语言层面的优化，真正的革命从 2009 年 CommonJS 的引入开始，前端开始大量使用预编译。</blockquote>
<p>这篇文章所提供的模块化历史的方案都是逻辑模块化，<strong>从 CommonJS 方案开始前端把服务端的解决方案搬过来之后，算是看到标准物理与逻辑统一的模块化</strong>。但之后前端工程不得不引入模块化构建这一步。正是这一步给前端开发无疑带来了诸多的不便，尤其是现在我们开发过程中经常为了优化这个工具带了很多额外的成本。</p>
<p>从 CommonJS 之前其实都只是封装，并没有一套模块化规范，这个就有些像类与包的概念。我在10年左右用的最多的还是 YUI2，YUI2 是用 namespace 来做模块化的，但有很多问题没有解决，比如多版本共存，因此后来 YUI3 出来了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="YUI().use('node', 'event', function (Y) {
    // The Node and Event modules are loaded and ready to use.
    // Your code goes here!
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">YUI().use(<span class="hljs-string">'node'</span>, <span class="hljs-string">'event'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Y</span>) </span>{
    <span class="hljs-comment">// The Node and Event modules are loaded and ready to use.</span>
    <span class="hljs-comment">// Your code goes here!</span>
});</code></pre>
<p>YUI3 的 sandbox 像极了差不多同时出现的 AMD 规范，但早期 yahoo 在前端圈的影响力还是很大的，而 requirejs 到 2011 年才诞生，因此圈子不是用着 YUI 要不就自己封装一套 sandbox，内部使用 jQuery。</p>
<p>为什么模块化方案这么晚才成型，可能早期应用的复杂度都在后端，前端都是非常简单逻辑。后来 Ajax 火了之后，web app 概念的开始流行，前端的复杂度也呈指数级上涨，到今天几乎和后端接近一个量级。<strong>工程发展到一定阶段，要出现的必然会出现。</strong><br>　</p>
<h3 id="articleHeader4">前端三剑客的模块化展望</h3>
<blockquote>从 js 模块化发展史，我们还看到了 css html 模块化方面的严重落后，如今依赖编译工具的模块化增强在未来会被标准所替代。</blockquote>
<p>原生支持的模块化，<strong>解决 html 与 css 模块化问题正是以后的方向。</strong></p>
<p>再回到 JS 模块化这个主题，开头也说到是为了构建 scope，实则提供了业务规范标准的输入输出的方式。但文章中的 JS 的模块化还不等于前端工程的模块化，Web 界面是由 HTML、CSS 和 JS 三种语言实现，不论是 CommonJS 还是 AMD 包括之后的方案都无法解决 CSS 与 HTML 模块化的问题。</p>
<p>对于 CSS 本身它就是 global scope，因此开发样式可以说是喜忧参半。近几年也涌现把 HTML、CSS 和 JS 合并作模块化的方案，其中 react/css-modules 和 vue 都为人熟知。当然，这一点还是非常依赖于 webpack/rollup 等构建工具，让我们意识到在 browser 端还有很多本质的问题需要推进。</p>
<p>对于 css 模块化，目前不依赖预编译的方式是 <code>styled-component</code>，通过 js 动态创建 class。而目前 css 也引入了<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables" rel="nofollow noreferrer" target="_blank">与 js 通信的机制 与 原生变量支持</a>。未来 css 模块化也很可能是运行时的，所以目前比较看好 <code>styled-component</code> 的方向。</p>
<p>对于 html 模块化，小尤最近爆出与 chrome 小组调研 html Modules，如果 html 得到了浏览器，编辑器的模块化支持，未来可能会取代 jsx 成为最强大的模块化、模板语言。</p>
<p>对于 js 模块化，最近出现的 <code>&lt;script type="module"&gt;</code> 方式，虽然还没有得到浏览器原生支持，但也是我比较看好的未来趋势，这样就连 webpack 的拆包都不需要了，直接把源代码传到服务器，配合 http2.0 完美抛开预编译的枷锁。</p>
<p>上述三中方案都不依赖预编译，分别实现了 html、css、js 模块化，相信这就是未来。</p>
<h3 id="articleHeader5">模块化标准推进速度仍然缓慢</h3>
<blockquote>2015 年提出的标准，在 17 年依然没有得到实现，即便在 nodejs 端。</blockquote>
<p>这几年 TC39 对语言终于重视起来了，慢慢有动作了，但针对模块标准制定的速度，与落实都非常缓慢，与 javascript 越来越流行的趋势逐渐脱节。nodejs 至今也没有实现 ES2015 模块化规范，所有 jser 都处在构建工具的阴影下。</p>
<h3 id="articleHeader6">Http 2.0 对 js 模块化的推动</h3>
<blockquote>js 模块化定义的再美好，浏览器端的支持粒度永远是瓶颈，http 2.0 正是考虑到了这个因素，大力支持了 ES 2015 模块化规范。</blockquote>
<p>幸运的是，模块化构建将来可能不再需要。随着 HTTP/2 流行起来，请求和响应可以并行，一次连接允许多个请求，对于前端来说宣告不再需要在开发和上线时再做编译这个动作。</p>
<p>几年前，模块化几乎是每个流行库必造的轮子（YUI、Dojo、Angular），大牛们自己爽的同时其实造成了社区的分裂，很难积累。有了 ES2015 Modules 之后，JS 开发者终于可以像 Java 开始者十年前一样使用一致的方式愉快的互相引用模块。</p>
<p>不过 ES2015 Modules 也只是解决了开发的问题，由于浏览器的特殊性，还是要经过繁琐打包的过程，等 Import，Export 和 HTTP 2.0 被主流浏览器支持，那时候才是彻底的模块化。</p>
<h3 id="articleHeader7">Http 2.0 后就不需要构建工具了吗？</h3>
<blockquote>看到大家基本都提到了 HTTP/2，对这项技术解决前端模块化及资源打包等工程问题抱有非常大的期待。很多人也认为 HTTP/2 普及后，基本就没有 Webpack 什么事情了。</blockquote>
<p>不过 Webpack 作者 @sokra 在他的文章 <a href="https://medium.com/webpack/webpack-http-2-7083ec3f3ce6#.zdo4juvgo" rel="nofollow noreferrer" target="_blank">webpack &amp; HTTP/2</a> 里提到了一个新的 Webpack 插件 <code>AggressiveSplittingPlugin</code>。简单的说，这款插件就是为了充分利用 HTTP/2 的文件缓存能力，将你的业务代码自动拆分成若干个数十 KB 的小文件。后续若其中任意一个文件发生变化，可以保证其他的小 chunck 不需要重新下载。</p>
<p>可见，<strong>即使不断的有新技术出现，也依然需要配套的工具来将前端工程问题解决方案推向极致。</strong></p>
<h3 id="articleHeader8">模块化是大型项目的银弹吗？</h3>
<blockquote>只要遵循了最新模块化规范，就可以使项目具有最好的可维护性吗？ Js 模块化的目的是支持前端日益上升的复杂度，但绝不是唯一的解决方案。</blockquote>
<p>分析下 JavaScript 为什么没有模块化，为什么又需要模块化：这个 95 年被设计出来的时候，语言的开发者根本没有想到它会如此的大放异彩，也没有将它设计成一种模块化语言。按照文中的说法，99 年也就是 4 年后开始出现了模块化的需求。如果只有几行代码用模块化是扯，初始的 web 开发业务逻辑都写在 server 端，js 的作用小之又小。而现在 spa 都出现了，几乎所有的渲染逻辑都在前端，如果还是没有模块化的组织，开发过程会越来越难，维护也是更痛苦。</p>
<p>文中已经详细说明了模块化的发展和优劣，这里不准备做过多的讨论。我想说的是，<strong>在模块化之后还有一个模块间耦合的问题，如果模块间耦合度大也会降低代码的可重用性或者说复用性</strong>。所以也出现了降低耦合的观察者模式或者发布/订阅模式。这对于提升代码重用，复用性和避免单点故障等都很重要。说到这里，还想顺便提一下最近流行起来的响应式编程（RxJS），响应式编程中有一个很核心的概念就是 observable，也就是 Rx 中的流（stream）。它可以被 subscribe，其实也就是观察者设计模式。</p>
<h3 id="articleHeader9">补充阅读</h3>
<ul>
<li><a href="https://huangxuan.me/2015/07/09/js-module-7day/" rel="nofollow noreferrer" target="_blank">JavaScript 模块化七日谈</a></li>
<li><a href="https://yuguo.us/weblog/javascript-module-development-history/" rel="nofollow noreferrer" target="_blank">JavaScript模块化编程简史（2009-2016）</a></li>
</ul>
<h1 id="articleHeader10">总结</h1>
<p>未来前端复杂度不断增加已成定论，随着后端成熟，自然会将焦点转移到前端领域，而且服务化、用户体验越来越重要，前端体验早不是当初能看就行，任何网页的异常、视觉的差异，或文案的模糊，都会导致用户流失，支付中断。前端对公司营收的影响，渐渐与后端服务宕机同等严重，所以前端会越来越重，异常监控，性能检测，工具链，可视化等等都是这几年大家逐渐重视起来的。</p>
<p>我们早已不能将 javascript 早期玩具性质的模块化方案用于现代越来越重要的系统中，前端界必然出现同等重量级的模块化管理方案，感谢 TC39 制定的 ES2015 模块化规范，我们已经离不开它，哪怕所有人必须使用 babel。</p>
<p>话说回来，标准推进的太慢，我们还是把编译工具当作常态，抱着哪怕支持了 ES2015 所有特性，babel 依然还有用的心态，将预编译进行到底。一句话，模块化仍在路上。js 模块化的矛头已经对准了 css 与 html，这两位元老也该向前卫的 js 学习学习了。</p>
<p>未来 css、html 的模块化会自立门户，还是赋予 js 更强的能力，让两者的模块化依附于 js 的能力呢？目前 html 有自立门户的苗头（htmlModules），而 css 迟迟没有改变，社区出现的 <code>styled-component</code> 已经用 js 将 css 模块化得很好了，最新 css 规范也支持了与 js 的变量通信，难道希望依附于 js 吗？这里希望得到大家更广泛的讨论。</p>
<p>我也认同，毕竟压缩、混淆、md5、或者利用 <a href="https://www.thepolyglotdeveloper.com/2015/03/create-a-random-nonce-string-using-javascript/" rel="nofollow noreferrer" target="_blank">nonce</a> 属性对 script 标签加密，都离不开本地构建工具。</p>
<p>据说 http2 的优化中，有个最佳文件大小与数量的比例，那么还是脱离不了构建工具，前端未来会越来越复杂，同时也越来越美好。</p>
<p>至此，对于 javascript 模块化讨论已接近尾声，对其优缺点也基本达成了一致。前端复杂度不断提高，促使着模块化的改进，代理（浏览器、node） 的支持程度，与前端特殊性（流量、缓存）可能前端永远也离不开构建工具，新的标准会让这些工作做的更好，同时取代、增强部分特征，前端的未来是更加美好的，复杂度也更高。</p>
<p><strong>如果你想参与讨论，请<a href="https://github.com/dt-fe/weekly" rel="nofollow noreferrer" target="_blank">点击这里</a>，每周都有新的主题，每周五发布。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精读《js 模块化发展》

## 原文链接
[https://segmentfault.com/a/1190000014747913](https://segmentfault.com/a/1190000014747913)

