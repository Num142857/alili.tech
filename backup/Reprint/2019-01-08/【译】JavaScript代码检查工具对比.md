---
title: '【译】JavaScript代码检查工具对比' 
date: 2019-01-08 2:30:10
hidden: true
slug: xnesxvirmh
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>看到很多团队和开源项目都在用代码检查工具，自己一直没用过，最近加入了新团队有项目在用，就想着研究一下。看到sitepoint上的一篇2015年的文章觉得不错就给翻译出来了。本文译自<a href="https://www.sitepoint.com/comparison-javascript-linting-tools/" rel="nofollow noreferrer" target="_blank">A Comparison of JavaScript Linting Tools</a>，本文由 <a href="https://segmentfault.com/u/darko">@Darko</a> 翻译，转载请保留原文链接。</p></blockquote>
<p>JavaScript代码校验工具能够让你在写代码时避免一些低级的错误。尽管我有很多年的开发经验，我仍然会犯一些语法错误并且忘记处理我的错误。一个好的校验工具或者格式化工具，可以让我避免这些错误，以免浪费我的时间（甚至是我客户的时间）。一个好的校验工具还能确保一个项目保持一个固定的代码风格。</p>
<p>有很多关于JavaScript的校验工具，你怎样选择其中的某一个呢？让我们一起来看看它们有什么样的特性以及优缺点。接下来我要介绍四种常用的选择：<code>JSLint</code>，<code>JSHint</code>，<code>JSCS</code>和<code>ESLint</code>。</p>
<h2 id="articleHeader0">Overview</h2>
<p>这四个工具的基本用法都是类似的，它们定义了一套规则用来解析和报告js文件里面的问题。它们都可以通过npm来进行安装。可以通过命令行来调用它们，给命令行传递文件参数，也可以作为<code>grunt</code>这一类工具的插件被使用，或者可以集成到编辑器中。它们都支持使用注释作为配置。</p>
<p>以上就是它们所有的相似之处了，每一个工具都有优缺点，只是有些工具相比于其它工具更加有优势。</p>
<h2 id="articleHeader1">JSLint</h2>
<p>JSLint是这四种校验工具中最为古老的。<code>Douglas Crockford</code>（译注:《JavaScript 语言精粹》的作者）在2002年创造了它，它是强制使用的，为了保留它所认为的JavaScript这门语言的精华部分。如果你认同他的观点，对你而言，JSLint将会是一个好的工具。安装完成马上即可使用。</p>
<p>JSLint的缺点是它是不可以进行配置和扩展的。你不能禁用它的某些特性，并且缺乏文档。它的官网并没有什么用处，例如，它缺少如果将这个工具整合到你的编辑器的任何信息。</p>
<p><span class="img-wrap"><img data-src="/img/bVRel4?w=300&amp;h=93" src="https://static.alili.tech/img/bVRel4?w=300&amp;h=93" alt="1425566558jslint-logo-300x93.gif" title="1425566558jslint-logo-300x93.gif" style="cursor: pointer; display: inline;"></span></p>
<p><strong>优点：</strong></p>
<ul><li><p>配置规则都已经定好了，安装即可使用（如果你同意这些强制的规则的话）</p></li></ul>
<p><strong>缺点：</strong></p>
<ul>
<li><p>JSLint没有可配置文件，你无法对它的规则进行更改</p></li>
<li><p>配置规则的数量有限，有些规则无法禁用</p></li>
<li><p>不支持自定义规则</p></li>
<li><p>缺少文档</p></li>
<li><p>很难定位到哪条规则导致了错误</p></li>
</ul>
<h2 id="articleHeader2">JSHint</h2>
<p>JSHint是JSLint的一个更加灵活，可配置的一个版本，它从JSLint中fork出来。你能够自己配置每一条规则，并且把他们写到一个配置文件里，这让JSHint更易于在大型项目中使用。同时，JSHint也有友好的文档针对每一条规则。所以能够准确的知道它做了些什么。把它整合到编辑器中也是很简单的一件事。</p>
<p>JSHint的一个小缺点就是，它的默认配置是非常轻量级的。这就意味着你要做一些设置才能使其变得有用。和ESLint相比，为了启用或者禁用某些错误的报告，要知道需要修改哪些规则也是比较困难的。</p>
<p><span class="img-wrap"><img data-src="/img/bVRd01?w=300&amp;h=133" src="https://static.alili.tech/img/bVRd01?w=300&amp;h=133" alt="1425566554jshint-logo-300x133.png" title="1425566554jshint-logo-300x133.png" style="cursor: pointer;"></span></p>
<p><strong>优点：</strong></p>
<ul>
<li><p>大多数设置都是可配置的</p></li>
<li><p>支持配置文件，更易于在大型项目中使用</p></li>
<li><p>支持很多第三方库或和框架，例如jqery,QUnit,NodeJs,Mocha等等</p></li>
<li><p>支持基本的ES语法</p></li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li><p>很难定位到哪条规则造成了错误</p></li>
<li><p>有两种类型的配置：强制执行的和比较松散的，这让配置变得有些混乱</p></li>
<li><p>不支持自定义规则</p></li>
</ul>
<h2 id="articleHeader3">JSCS</h2>
<p>JSCS和以上两个都是不同的，如果不给它一个配置文件或者使用一套预设的规则，它将什么也不做不了，不过你可以从别的网站下载配置文件，所以这并不是什么大问题，并且它有很多的预设规则，比如说jQuery的代码风格的预设规则以及Google的代码风格的预设规则。</p>
<p>它有超过90种不同的规则，并且你可以通过插件创造自定义规则。JSCS也支持自定义输出报告，这使得其更容易与需要其以特定格式输入的工具集成。</p>
<p>JSCS是一个代码风格检查器，这意味着它只捕获与代码格式相关的问题，而不包含潜在的错误。因此，它比其他工具的灵活性更低，但是如果您需要强制执行特定的编码风格，那么JSCS就可以做的很好。</p>
<p><span class="img-wrap"><img data-src="/img/bVRemj?w=130&amp;h=130" src="https://static.alili.tech/img/bVRemj?w=130&amp;h=130" alt="1425566551jscs-logo.png" title="1425566551jscs-logo.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>优点：</strong></p>
<ul>
<li><p>支持自定义输出报告，可以使其更容易和其它工具进行集成</p></li>
<li><p>如果您遵循现有的可用编码风格之一，预设和现成的配置文件可以轻松设置</p></li>
<li><p>在报告中，有一个标志包含在规则名之中，所以很容易找出是哪条规则导致了错误</p></li>
<li><p>可以利用自定义的插件进行拓展</p></li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li><p>只检测到代码风格的违规，不检测潜在的错误，比如说未使用的变量或者变量的全局污染等</p></li>
<li><p>四个工具中性能最差的，但是这并不是一个典型用途的问题</p></li>
</ul>
<h2 id="articleHeader4">ESLint</h2>
<p>ESLint是这四个工具中最新的，它被设计为易于拓展的，具有大量的自定义规则，并且很容易通过插件的形式来安装。它输出简洁的报告，但是默认包含规则的名称，因此你始终知道是那条规则导致了错误的信息。</p>
<p>ESLint的文档多少有些混乱，规则的列表容易查找，并且按逻辑进行分类，但配置说明在某些地方有点混乱。然而，它提供了如何对编辑器进行集成，插件和示例的链接。</p>
<p><span class="img-wrap"><img data-src="/img/bVReml?w=150&amp;h=150" src="https://static.alili.tech/img/bVReml?w=150&amp;h=150" alt="1425566547eslint-logo-150x150.png" title="1425566547eslint-logo-150x150.png" style="cursor: pointer;"></span></p>
<p><strong>优点：</strong></p>
<ul>
<li><p>灵活：任何规则都可以切换使用，并且有些规则有额外的配置可以使用</p></li>
<li><p>可拓展性好，并且有很多可用的插件</p></li>
<li><p>易于理解的输出报告</p></li>
<li><p>包含一些其它工具所没有的规则，使得ESLint更容易检测出代码中潜在的错误</p></li>
<li><p>对ES6的支持性最好，是唯一支持JSX的工具</p></li>
<li><p>支持自定义输出报告</p></li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li><p>需要一些配置</p></li>
<li><p>性能差，但这并不是主要的障碍</p></li>
</ul>
<h2 id="articleHeader5">推荐</h2>
<p>在这四个工具中，我选择了ESLint，JSLint太严格并且不可配置，而JSHint缺乏扩展机制。如果您只想检查编码风格，则JSCS是一个不错的选择，但是ESLint也可以这样做，并且它会检查代码中的错误和其他问题。</p>
<p>如果你想使用ES6的话，ESLint也是显而易见的选择。在上文提高的所有工具当中它对ES6有着最好的支持。</p>
<p>JSHint是第二好的选择，如果你不需要ESLint的那些高级特性的话。一旦被正确的配置，JSHint可以捕捉到大量的问题。JSCS有大量可用的规则，如果你不需要编码样式检查（缩进、括号等）以外的任何事情，那么它就是首选。</p>
<p>对于JSLint，我很犹豫要不要推荐它，其它的工具可以做到和他同样的事情但是不会强制要求使用者去使用特定的规则。如果你正巧非常同意它的哪些强制规则，那么也许值得好好去了解一下。</p>
<p>一个好的校验工具是捕捉问题非常重要的一步，但是它只能检测出它的规则许可范围之内的错误。对于更多简单明了的bug的捕捉，我建议使用单元测试，Code reviews也是也是不错的方式。</p>
<p>你和你的团队是如果保证代码质量的呢？可以在评论区留言。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】JavaScript代码检查工具对比

## 原文链接
[https://segmentfault.com/a/1190000010264410](https://segmentfault.com/a/1190000010264410)

