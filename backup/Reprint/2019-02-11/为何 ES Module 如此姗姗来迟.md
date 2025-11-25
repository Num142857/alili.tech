---
title: '为何 ES Module 如此姗姗来迟' 
date: 2019-02-11 2:30:49
hidden: true
slug: b067o3b5fd
categories: [reprint]
---

{{< raw >}}

                    
<p><em>说明：本文发布之后，此问题的推进峰回路转，不停有新内容。文末新增一节 <a href="https://segmentfault.com/a/1190000004940294#articleHeader5">Updates</a>，跟进本文发布之后的 ES Module 标准化进展情况。</em></p>
<p>浏览器大战多年了热度依旧高涨，大家终于在 JS 新特性的部署上达成一致纷纷追赶最新标准，然而 ES2015 中的 ES Module 这个万众期待的重要特性却始终迟迟未能实现。</p>
<blockquote>等 2020 年回望历史，倘若我们错过了 ES Module 这艘船而 Node.js 死在汪洋大海之中，没有任何其他技术问题的重要性可以与此相比。<br>-- <a href="https://twitter.com/izs/status/766697131646201858" rel="nofollow noreferrer" target="_blank">issac</a>
</blockquote>
<p>Module 的规范是完工了的，只是对于模块如何加载和解析留给了“实现环境决定”——按历史经验，问题往往就出现在这一环。当然了不是烫手山芋 W3C 也不会就这么轻松甩开对吧，事实上这也不是 W3C 一家的事情，牵涉到 TC39、Node 技术委员会、Node 和前端两个开发社群，以及 npm 公司。</p>
<p>故事很长，我们从头说起。<code>import</code> 和 <code>export</code> 的语法规范很明确，模块的解析器 V8 早已实现，万事俱备只欠加载。区区加载能有多麻烦？</p>
<h2 id="articleHeader0">Module 的特性</h2>
<p>在新规范下，JavaScript 程序划分成两种类型：脚本（我们以前写的传统JS）和模块（ES规范中新定义的 Module），模块有四项于脚本不同的特性：</p>
<ol>
<li>强制严格模式（无法取消）</li>
<li>执行环境在一个非全局的作用域中</li>
<li>可以使用 <code>import</code> 导入其他 Module 的 binding</li>
<li>可以使用 <code>export</code> 导出本 Module 的 binding</li>
</ol>
<p>看上去规则简单明白，但是要让一个解析器（parser）区分兼容这两种模式还挺复杂的。</p>
<h2 id="articleHeader1">解析器的难题</h2>
<blockquote>看看代码中是否包含 <code>import</code> 和 <code>export</code> 关键字不就可以判断它的类型了么？</blockquote>
<p>不行。首先猜测用户意图是个危险行为，如果你猜对了，就更加掩盖了猜错可能会造成的风险。</p>
<p>而严格模式，除了运行时的一些要求之外还定义了几个语法错误：</p>
<ol>
<li>使用 <code>with</code> 关键字；</li>
<li>使用八进制字面量（如 <code>010</code>）；</li>
<li>函数参数重名；</li>
<li>对象属性重名（仅在 ES5 环境。ES6 取消了此错误）；</li>
<li>使用 <code>implements</code>、<code>interface</code>、<code>let</code>、<code>package</code>、<code>private</code>、<code>protected</code>、<code>public</code>、<code>static</code> 或 <code>yield</code> 作为标识符。</li>
</ol>
<p>这些语法错误需要在解析时就抛出来。所以如果以脚本模式解析到了文件末尾才发现有 <code>export</code>，就得从头重新解析整个文件来捕捉上述语法错误。</p>
<p>那我们换一条路，开始先假定为模块进行解析代码。既然 Module 语法相当于严格模式 + 导入导出 (<code>import</code> 和 <code>export</code>)，我们可以用脚本模式 + 导入导出的语法来解析整个文件。然而这种解析规则已经超越了规范定义，这么扭曲的路线可以预见它成为 Bug 源泉的样子。</p>
<p>危险但不是不可能。OK 真正的麻烦来了：按照规范 <code>import</code> 和 <code>export</code> 都是可选的——你可以写一个 Module，既不导入也不导出任何东西，它只是对全局作用域做些小动作，比如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一个合法的 Module
window.addEventListener(&quot;load&quot;, function() {
    console.log(&quot;Window is loaded&quot;);
});
// WAT!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 一个合法的 Module</span>
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"load"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Window is loaded"</span>);
});
<span class="hljs-comment">// WAT!</span></code></pre>
<p>总的来说，包含 <code>import</code> 或 <code>export</code> 表明它一定是个 Module，但没有这两个关键字却不能证明它不是 Module。 ╮(╯_╰)╭</p>
<p>区分 JavaScript 文件类型的任务没法放在解析器里自动完成，我们需要在解析文件之前就知道它的类型。</p>
<h2 id="articleHeader2">浏览器的办法</h2>
<p>这就是为什么浏览器的模块引用是这个写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;module&quot; src=&quot;foo.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"module"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"foo.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>当浏览器开始加载这个 <code>foo.js</code>，它会边加载边解析，碰到 <code>import { bar } from './bar.js'</code> 的第一时间开始加载依赖的 <code>bar.js</code>，加载完之后对其解析，检查其中是否导出了 <code>bar</code>。如此往复完成整个 Module 的解析。</p>
<h2 id="articleHeader3">Node.js 呢</h2>
<p>到了 Node.js，新的问题来了。</p>
<p>作为<a href="http://www.modulecounts.com/" rel="nofollow noreferrer" target="_blank">世界上最大的</a>软件包仓库，npm 中现有的软件包都是 CommonJS 规范。ES Module 需要能够与 CommonJS 模块共存，允许开发者们逐步转向新的语法。</p>
<p>所谓的共存，主要是指 <code>import { foobar } from 'foobar'</code> 语法要支持 CJS Module 和 ES Module 两种包格式——如果 <code>import</code> 只能用来导入 ES Module 而 <code>require</code> 可以导入任意模块，那么所有人都会用 <code>require</code>；如果 <code>import</code> 和 <code>require</code> 各自负责导入各自的格式，那么开发者就需要知道所有依赖的库的格式，使用相应语法来导入它，并且在依赖的库们更换到新格式的时候修改自己的代码去兼容……在可预见的 CommonJS -&gt; ES Module 漫长过渡期里这样的负担对社区而言不可接受。</p>
<p>为此社区提出了不少方案，（好消息）经过大量的讨论之后现在已经集中到两个选择还在讨论：</p>
<ol>
<li>
<strong>解析器自动检测</strong>。最大的好处是对用户而言透明，可惜原因如前所述，此方案已否定。</li>
<li>
<strong>使用</strong> <code>"use module"</code> <strong>标注</strong>。一想到 JS 的未来永远都要在文件开头贴这么个膏药大家就不能忍了。否定。</li>
<li>
<strong>新的文件后缀</strong> <code>.jsm</code>。主要问题是现有社区工具链全部需要更新才能支持，另外和浏览器实现的统一也要考虑。</li>
<li>
<strong>在</strong> <code>package.json</code> <strong>上发挥</strong>。这个门类下的提议就更多了，比如添加一个 <code>module</code> 字段逐步替代掉 <code>main</code>：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // ...
    &quot;module&quot;: &quot;lib/index.js&quot;,
    &quot;main&quot;: &quot;old/index.js&quot;,
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>{
    <span class="hljs-comment">// ...</span>
    <span class="hljs-string">"module"</span>: <span class="hljs-string">"lib/index.js"</span>,
    <span class="hljs-string">"main"</span>: <span class="hljs-string">"old/index.js"</span>,
    <span class="hljs-comment">// ...</span>
}</code></pre>
<p>这个方案只适用单入口的情况，对多文件（比如 <code>require('foo/bar.js')</code>的场景）就不行了。那就改成 <code>modules</code> 字段（复杂度陡升）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // ...
    // files:
    &quot;modules&quot;: [&quot;lib/hello.js&quot;, &quot;bin/hello.js&quot;],

    // directories:
    &quot;modules&quot;: [&quot;lib&quot;, &quot;bin&quot;],

    // files and directories:
    &quot;modules&quot;: [&quot;lib&quot;, &quot;bin&quot;, &quot;special.js&quot;],

    // if package never uses CJS Modules
    &quot;modules&quot;: [&quot;.&quot;],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>{
    // ...
    // <span class="hljs-keyword">file</span><span class="hljs-variable">s:</span>
    <span class="hljs-string">"modules"</span>: [<span class="hljs-string">"lib/hello.js"</span>, <span class="hljs-string">"bin/hello.js"</span>],

    // directorie<span class="hljs-variable">s:</span>
    <span class="hljs-string">"modules"</span>: [<span class="hljs-string">"lib"</span>, <span class="hljs-string">"bin"</span>],

    // <span class="hljs-keyword">files</span> <span class="hljs-built_in">and</span> directorie<span class="hljs-variable">s:</span>
    <span class="hljs-string">"modules"</span>: [<span class="hljs-string">"lib"</span>, <span class="hljs-string">"bin"</span>, <span class="hljs-string">"special.js"</span>],

    // <span class="hljs-keyword">if</span> package never uses CJS Modules
    <span class="hljs-string">"modules"</span>: [<span class="hljs-string">"."</span>],
}</code></pre>
<p>这还没完，更多方案就不详述了，大家可以到 <a href="https://github.com/nodejs/node/wiki/ES6-Module-Detection-in-Node#option-4-meta-in-packagejson" rel="nofollow noreferrer" target="_blank">Node.js Wiki</a> 上查看。</p>
<p>就个人偏好而言，尽管所有的方案都有利有弊，而 <code>package.json</code> 这条路为了兼容各种需求，修改版的提案已经越来越复杂，比较起来 <code>.jsm</code> 后缀倒是愈发显得简单清晰了。我更喜欢这个干净的解决方案。</p>
<h2 id="articleHeader4">现在的进展（2016.04.15）</h2>
<p><code>&lt;script type="module" /&gt;</code> 已经<a href="https://github.com/whatwg/html/pull/443" rel="nofollow noreferrer" target="_blank">加入 HTML 规范</a>，WhatWG 刚刚发了<a href="https://blog.whatwg.org/js-modules" rel="nofollow noreferrer" target="_blank">一篇文章</a>讲述他们如何经过艰苦卓绝的努力达成这一目标，接下来就看浏览器厂商实现了。</p>
<p>除此之外 WhatWG 手上还有一个 ES Module loader 规范，用于指定 Module 的动态加载方式。它曾经是 <a href="http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#august_24_2014_draft_rev_27" rel="nofollow noreferrer" target="_blank">ES6 草案的一部分</a>，但因为 ES2015 “要赶着发布来不及了”不幸被砍，目前<a href="https://github.com/whatwg/loader" rel="nofollow noreferrer" target="_blank">归属 WhatWG</a> <a href="https://github.com/ModuleLoader/es6-module-loader/issues/381" rel="nofollow noreferrer" target="_blank">推进</a>。</p>
<p>Node.js 这边，在相当一段时间里我们还要借助 transpiler 来体验 ES Module。这件事需要 V8、Node.js、WhatWG 共同协调完成。</p>
<p><del>按计划</del>本月 Node.js 发布 6.0，<del>顺利的话可以</del> 确定<a href="https://github.com/nodejs/node/issues/5355" rel="nofollow noreferrer" target="_blank">集成 V8 5.0</a>（BTW，一天后 V8 发布了 5.1），对 ES2015 的特性支持<a href="http://v8project.blogspot.com/2016/03/v8-release-50.html?showComment=1458404287701#c475074936038102803" rel="nofollow noreferrer" target="_blank">达到 93%</a>——看来 ES Module 很可能会成为 “The last ES2015 feature” 了。</p>
<p>关注 ES Module 的进展，还可以看看几个地方：</p>
<ol>
<li>Node 社区提案和讨论：<a href="https://github.com/nodejs/node-eps/pull/3" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/nod...</a>
</li>
<li>V8 的实现：<a href="https://bugs.chromium.org/p/v8/issues/detail?id=1569" rel="nofollow noreferrer" target="_blank">https://bugs.chromium.org/p/v...</a>
</li>
<li>Blink 的实现：<a href="https://bugs.chromium.org/p/chromium/issues/detail?id=594639" rel="nofollow noreferrer" target="_blank">https://bugs.chromium.org/p/c...</a>
</li>
</ol>
<p>愿 ES Module 早日到来。</p>
<h2 id="articleHeader5">Updates</h2>
<p>关于 ES Module 在 Node.js 环境下的识别方案，从一月份 bmeck 提出提案开始社区就持续沟通和争论，以下是相关进展更新。</p>
<ul>
<li>
<strong>2016.01.08</strong><br>bmeck 提出关于 <a href="https://github.com/nodejs/node-eps/commit/1beb6c7548f70da4de67daa7a7c8f54d6bebe651" rel="nofollow noreferrer" target="_blank">ES Module 的提案</a>（增加新后缀<code>.mjs</code>），社区讨论开始。</li>
<li>
<strong>2016.02.06</strong><br>社区提的方案归纳起来，有<a href="https://github.com/nodejs/node-eps/pull/3#issuecomment-180426207" rel="nofollow noreferrer" target="_blank">四个方向</a>。</li>
<li>
<strong>2016.04.15</strong><br>本文发布的日子。</li>
<li>
<strong>2016.04.20</strong><br>经过两个月的密集讨论，四个方向只剩下两个存活：<code>.mjs</code> 派和 <code>package.json</code> 派，然而这两派的争论非常激烈。</li>
<li>
<strong>2016.04.27</strong><br>鉴于 <code>.mjs</code> 已经在正式提案中，倘若讨论持续僵持不下，不出意外 <code>.mjs</code> 将会随着时间推移而正式成为规范。怀着这样的危机感，<code>package.json</code> 派发起了 <a href="https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md" rel="nofollow noreferrer" target="_blank">In defense of dot js</a> 来抗衡 <code>.mjs</code> 的提案，要求保持 <code>.js</code> 后缀不变而使用 <code>package.json</code> 来识别 ES Module。</li>
<li>
<strong>2016.06.14</strong><br>重大转折！bmeck 提出一个新的方案 <a href="https://github.com/bmeck/UnambiguousJavaScriptGrammar/commit/7a17303054aef09e6079cdd0b0f910e3f7eedbdf" rel="nofollow noreferrer" target="_blank">UnambiguousJavaScriptGrammar</a>：既然两边的纠结都是因为无法从文件本身识别 ES Module 而起，不妨调整一点语法细节（ES Module 中的 <code>exports</code> 语句不再是可选的，至少有一句 <code>exports {}</code> 来表明该文件是个 ES Module），两派的争论就这么迎刃而解了！</li>
<li>
<strong>2016.07.06</strong><br>经过 Node.js TSC 的讨论，Unambiguous JavaScript Grammar 方案<a href="https://github.com/bmeck/UnambiguousJavaScriptGrammar/commit/abee4845471f12706e2b208f3163253f8c582d97" rel="nofollow noreferrer" target="_blank">正式加入提议（proposal）</a>。</li>
<li>
<strong>2016.07.07</strong><br>虽然 Unambiguous JavaScript Grammar <a href="https://github.com/nodejs/node-eps/blob/master/002-es6-modules.md#51-determining-if-source-is-an-es-module" rel="nofollow noreferrer" target="_blank">加入了 Node.js 的草案提案(5.1章)</a>，但是考虑到距离 TC39 的七月会议只剩下一周时间，而 Node.js 这边希望做更充分的调研和测试再进行讨论，所以<a href="https://github.com/tc39/agendas/pull/198" rel="nofollow noreferrer" target="_blank">从这次 TC39 的议程中拿掉了</a>。</li>
<li>
<strong>2016.09.06</strong><br>Domenic 提了 <a href="https://github.com/tc39/proposal-dynamic-import" rel="nofollow noreferrer" target="_blank"><code>import()</code></a> 作为动态加载的方案，有望取代 <code>System.import()</code> 或 <code>System.loader.import()</code>。</li>
<li>
<strong>2016.09.17</strong><br>ES Module 再次<a href="https://github.com/tc39/agendas/pull/214#issuecomment-243929423" rel="nofollow noreferrer" target="_blank">提上 TC39 的议事日程</a>，相关的还有<a href="https://github.com/tc39/ecma262/issues/395" rel="nofollow noreferrer" target="_blank">内建模块</a>和 <code>import()</code>。</li>
<li>
<p><strong>2016.09.30</strong><br>TC39 9月碰头会的与会者纷纷表示这次会议进展令人愉快，<a href="https://hackernoon.com/node-js-tc-39-and-modules-a1118aecf95e" rel="nofollow noreferrer" target="_blank">会议内容汇总在此</a>，以及<a href="https://medium.com/@awbjs/follow-up-tc39-meets-node-js-modules-76fdea278370" rel="nofollow noreferrer" target="_blank">一些补充</a>。</p>
<ul>
<li>Node.js 开发者想要提出一些修改规范的建议，也不知道合适不合适，沟通之后发现 TC39 是非常关心和在意每个社区的需求的（大家相谈甚欢）。</li>
<li>原本的 ES 规范要求模块加载过程需要先完成静态 parse 然后再 evaluate，但是现在的 Node.js CommonJS 模块无法满足这个要求（CJS 模块必须 evaluate 之后才知道 exports 的是什么）。讨论下来规范将会改为允许 parse 过程在碰到 import CJS 模块时进入一个挂起的状态，等待依赖树中的 CJS 模块 evaluate 之后再完成 parse。</li>
<li>
<p>对模块类型的检测目前是三个方案选项：</p>
<ol>
<li>Unambiguous JavaScript Grammar 看上去比较简单，但实现起来还是有不少坑；</li>
<li>package.json 的办法比较累赘，局限也多；</li>
<li>
<code>.mjs</code> 的方案最简单，看来是最可行的，而且也跟 Node.js 现有方式一致（用后缀 <code>.node</code>、<code>.json</code>、<code>.js</code>来区分加载类型）。除非 Unambiguous JavaScript Grammar 的实现问题都解决掉，否则最终方案就是它了。</li>
</ol>
</li>
<li>
<code>import()</code> 大家都觉得没问题，稳步推进中。</li>
<li>由于 ES Module 的静态特性，以前给 CJS 模块做动态 Mock、MonkeyPatch 的方式都不行了。不过解决办法也有，一是在加载阶段提供钩子，二是允许对已经加载的模块做热替换。</li>
</ul>
</li>
<li>
<p><strong>2017.02.12</strong><br>Node.js CTC 和 TC39 的讨论：</p>
<ul>
<li>由于 ES6 模块的异步特性，require() 将无法加载 ES6 模块。</li>
<li>Babel 目前支持的 <code>import { foo } from 'node-cjs-module'</code> 也不符合规范，想 <code>import</code> 一个 NCJS 模块的话只能 <code>import m from 'node-cjs-module'</code> 然后 <code>m.foo()</code> 调用。</li>
<li>
<code>.mjs</code> 是问题最少的选择。</li>
<li>（悲伤的消息来了）就目前剩余的工作内容估计，距离 ES6 Module 最终实现大约还有至少一年的时间（往好的一面想，终于看得到 timeline 了）。</li>
</ul>
</li>
<li>
<strong>2017.05.10</strong><br>bmeck <a href="https://twitter.com/bradleymeck/status/862059788359827456" rel="nofollow noreferrer" target="_blank">在 Twitter 表示</a>已经实现了 <code>.mjs</code> 加载器的原型，在 Node.js v9 中可以用 flag 的方式启用，（希望）在 v10 中正式推出。也就是还有一年的时间，一切顺利的话 2018 年 4 月就能看到 ES Module 正式加入 Node.js LTS。</li>
<li>
<p><strong>2017.05.11</strong><br>工具链对 <code>.mjs</code> 后缀的支持都在推进中：</p>
<ul>
<li>Babel: <a href="https://github.com/babel/babel/pull/5624" rel="nofollow noreferrer" target="_blank">https://github.com/babel/babe...</a>
</li>
<li>Babili/babel-minify already supports .mjs: <a href="https://github.com/babel/babili/blob/2b1b16ac05596e65ec77c56a1e3e1b7882991341/packages/babili/src/fs.js#L6" rel="nofollow noreferrer" target="_blank">https://github.com/babel/babi...</a>
</li>
<li>AVA: <a href="https://github.com/avajs/ava/issues/631#issuecomment-299106074" rel="nofollow noreferrer" target="_blank">https://github.com/avajs/ava/...</a>
</li>
<li>Visual Studio Code: <a href="https://github.com/Microsoft/vscode/pull/25747" rel="nofollow noreferrer" target="_blank">https://github.com/Microsoft/...</a>
</li>
</ul>
</li>
<li>
<strong>2018.03.30</strong><br>Node.js 项目中<a href="https://github.com/nodejs/node/labels/ES%20Modules" rel="nofollow noreferrer" target="_blank">和 ES Module 实现相关的 Issue 和 PR</a>
</li>
<li>
<strong>2018.04.25</strong><br>Node.js 10.0.0 发布，加入了对 ES Module 的实验性支持（需要 <code>--experimental-modules</code> 开启）<br><a href="https://github.com/nodejs/node/blob/master/doc/api/esm.md" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/nod...</a>
</li>
</ul>
<h2 id="articleHeader6">参考资料</h2>
<ul>
<li><a href="https://www.nczonline.net/blog/2016/04/es6-module-loading-more-complicated-than-you-think/" rel="nofollow noreferrer" target="_blank">https://www.nczonline.net/blo...</a></li>
<li><a href="https://github.com/nodejs/node/wiki/ES6-Module-Detection-in-Node" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/nod...</a></li>
<li><a href="http://awal.js.org/blog/es6/2015/09/10/state-of-es6-modules.html" rel="nofollow noreferrer" target="_blank">http://awal.js.org/blog/es6/2...</a></li>
<li><a href="http://es2015-node.js.org/" rel="nofollow noreferrer" target="_blank">http://es2015-node.js.org/</a></li>
<li><a href="https://medium.com/@jasnell/an-update-on-es6-modules-in-node-js-42c958b890c" rel="nofollow noreferrer" target="_blank">https://medium.com/@jasnell/a...</a></li>
<li><a href="http://2ality.com/2017/05/es-module-specifiers.html#support-for-mjs-in-tools" rel="nofollow noreferrer" target="_blank">http://2ality.com/2017/05/es-...</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为何 ES Module 如此姗姗来迟

## 原文链接
[https://segmentfault.com/a/1190000004940294](https://segmentfault.com/a/1190000004940294)

