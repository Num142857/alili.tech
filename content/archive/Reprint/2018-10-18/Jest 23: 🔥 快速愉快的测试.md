---
title: "Jest 23: \U0001F525 快速愉快的测试 "
hidden: true
categories: reprint
slug: 916cf636
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>今天我们很高兴地宣布Jest 23，这是我们迄今为止最大的主要版本！我们与100多名贡献者一起发布了大量功能和错误修复程序。感谢社区中的每个人让JavaScript测试更加轻松。</p>
<p>我们也欢迎<a href="https://babeljs.io/">Babel</a> 和<a href="https://webpack.js.org/">Webpack</a>加入Jest社区！从Mocha转换为Jest 23 Beta后，Webpack的总测试套件时间从13分钟减少到2分20秒。 <a href="https://twitter.com/search?q=%23blazingmeansgood">#blazingmeansgood</a></p>
<p>以下是Jest 23的一些重点和突破性变化。</p>
<p>有关完整列表，请参阅更改<a href="https://github.com/facebook/jest/blob/master/CHANGELOG.md">日志</a>。</p>
<h2><a href="https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing.html/#interactive-snapshot-mode"></a>交互式快照模式</h2>
<p>我们添加了一个新的默认监视菜单选项，我们称之为交互式快照模式。此新模式允许您逐步查看每个失败的套件中的每个失败快照，以查看失败的快照，并选择单独更新或跳过每个快照。</p>
<p><img src="https://p0.ssl.qhimg.com/t01eb06812b698ab850.gif" alt="Interactive snapshot mode in action"></p>
<p>请在此处查看交互式快照模式<a href="https://jestjs.io/docs/en/snapshot-testing.html#interactive-snapshot-mode">文档</a>。</p>
<h2><a href="https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing.html/#snapshot-property-matchers"></a>快照属性匹配器</h2>
<p>通常，您正在快照的对象包含生成的值，如日期和ID。 Jest现在允许您将属性传递给快照匹配器，该快照匹配器指定数据的结构而不是特定的值。然后在序列化匹配器类型（而不是值）之前验证这些属性匹配器，从而为测试运行提供一致的快照结果。</p>
<p><img src="https://p0.ssl.qhimg.com/t010da504eae83c26be.png" alt="Snapshot Property Matchers"></p>
<p>有关详细信息，请参阅更新的<a href="https://jestjs.io/docs/en/expect.html#tomatchsnapshotpropertymatchers-snapshotname">toMatchSnapshot文档</a> 或<a href="https://jestjs.io/docs/en/snapshot-testing.html#property-matchers">“属性匹配器”指南</a>。</p>
<h2><a href="https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing.html/#custom-asynchronous-matchers"></a>自定义异步匹配器</h2>
<p>我们现在支持expect.extends的异步匹配器！异步匹配器返回Promise，以便您可以等待匹配器解析。举个例子：</p>
<p><img src="https://p0.ssl.qhimg.com/t016277f085644d0e05.png" alt="Custom asynchronous matchers in action"></p>
<p><a href="https://jestjs.io/docs/en/expect.html#expectextendmatchers">文档</a>可在此处获得。</p>
<h2><a href="https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing.html/#custom-asymmetric-matchers"></a>句子自定义不对称匹配器</h2>
<p>当您只关心不对称平等时，非对称匹配器是一个很好的工具。例如，当左侧预期是右侧具有某些属性子集的对象时，而不是完全匹配。 Jest提供了许多开箱即用的不对称匹配器，在此版本中我们引入了自定义非对称匹配器。</p>
<p><img src="https://p0.ssl.qhimg.com/t013b317c71da1fef99.png" alt="Custom asymmetric matchers in action"></p>
<h2><a href="https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing.html/#jest-each"></a>Jest 遍历</h2>
<p><a href="https://twitter.com/mattphillipsio">@mattphillipsio</a>已经将Jest-each软件包捐赠给了Jest Core（感谢Matt！）。 jest-each是一个受<a href="https://yarnpkg.com/en/package/mocha-each">mocha-each</a>和<a href="http://spockframework.org/spock/docs/1.1/data_driven_testing.html#data-tables">Spock数据表启发</a>的库，它允许您定义测试用例表，然后使用指定的列值对每一行运行测试。我们支持所有类型的describe和test的数组类型和模板文字。文档可以在<a href="https://jestjs.io/docs/en/api.html#testeachtable-name-fn">这里</a>找到，对于那些还没有在Jest 23上的，我们可以在<a href="https://yarnpkg.com/en/package/jest-each">jest-each</a>找到。 </p>
<p><img src="https://p0.ssl.qhimg.com/t016e41c999f92902fc.png" alt="jest-each in action"></p>
<p>快速修复表格格式（<a href="https://prettier.io/blog/2018/05/23/1.13.0.html#format-new-describeeach-table-in-jest-23-4423-by-ikatyang">参见Prettier 1.13</a>）！</p>
<h2><a href="https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing.html/#new-matchers"></a>新的Matchers</h2>
<p>如果我们认为它们对Jest社区中的大量人员有用，并且将大多数匹配者留给社区（参见<a href="https://yarnpkg.com/en/package/jest-extended">jest-extended</a>），我们只会将匹配器添加到核心。一些匹配者将切入核心，Jest 23补充道：</p>
<ul>
<li>nthCalledWith</li>
<li>toReturn</li>
<li>toReturnTimes</li>
<li>toReturnWith</li>
<li>lastReturnedWith</li>
<li>nthReturnedWith</li>
<li>toStrictEqual</li>
</ul>
<p><img src="https://p0.ssl.qhimg.com/t01ffcbf28f2f2845f5.png" alt="New matchers in action"></p>
<p>请在<a href="https://jestjs.io/docs/en/expect.html">此处</a>查看更新的期望文档。</p>
<h2><a href="https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing.html/#debug-hanging-tests"></a>Debug Hanging Tests</h2>
<p>我们在问题跟踪器上看到的一个常见问题与测试运行后挂起的“Jest”有关。这通常是由于应用程序代码处于打开状态，导致Jest无法退出。过去，用户已经使用--forceExit来修复（不推荐）。</p>
<p>为了帮助调试这些问题，我们现在检测Jest何时不退出：</p>
<p><img src="https://p0.ssl.qhimg.com/t01f61202230f1d9047.png" alt="Detecting hanging tests"></p>
<p>我们提供了一个新标志--detectOpenHandles来帮助找到打开的句柄：</p>
<p><img src="https://p0.ssl.qhimg.com/t01786f640c153c3f13.png" alt="Running detectOpenHandles"></p>
<p>请在<a href="https://jestjs.io/docs/en/cli.html#detectopenhandles">此处</a>查看更新的CLI文档。</p>
<h2><a href="https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing.html/#watch-mode-plugins"></a>观看模式插件</h2>
<p>我们已完全重写了监视模式系统，以允许将自定义插件添加到监视模式。 Watch Mode Plugins现在可以挂钩Jest事件并在Watch Mode菜单中提供自定义菜单选项。所有默认的Watch Mode提示都在此系统中实现为插件，<a href="https://jestjs.io/docs/en/watch-plugins.html">此处</a>提供了创建自己的文档。</p>
<p>通过这一改变，我们现在还可以通过<a href="https://yarnpkg.com/en/package/jest-watch-typeahead">jest-watch-typeahead</a>将类型支持作为Watch Mode插件带回来！
<img src="https://p0.ssl.qhimg.com/t018dbad6d31b47b1fd.gif" alt="Typeahead plugin in action"></p>
<p>有关文档和安装说明，请参阅<a href="https://github.com/jest-community/jest-watch-typeahead">jest-watch-typeahead</a>。非常感谢<a href="https://twitter.com/rogeliog">@rogeliog</a>了解新的watch mode插件系统和jest-watch-typeahead插件！</p>
<h2><a href="https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing.html/#breaking-changes"></a>突破性变化</h2>
<p>与每个主要版本一样，我们正在进行一些重大更改，以便在未来进行更大的更改，并将测试体验提升到一个新的水平。以下是您可能会看到的最大变化列表：</p>
<ul>
<li>需要测试描述和功能：我们现在失败的测试不包括功能和描述。</li>
<li>从React快照中删除未定义的props：较小的快照和正确的React行为。</li>
<li>删除弃用：我们删除了mapCoverage，因为不再需要它。另外，我们删除了jest.genMockFunction和jest.genMockFn，因为它们与jest.fn相同。</li>
<li>将故障名称添加到故障：我们将快照名称（如果提供）添加到快照故障消息中，以便更容易找到失败的快照。</li>
<li>替换模拟时间戳：我们用invocationCallOrder替换了模拟时间戳，因为两个或模拟通常可能具有相同的时间戳，从而无法测试调用顺序。</li>
<li>将结果添加到模拟快照：我们将模拟函数调用结果添加到快照，以便跟踪调用和调用结果。</li>
</ul>
<h2><a href="https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing.html/#other-improvements"></a>其他改进</h2>
<ul>
<li>监视模式覆盖：现在，覆盖范围仅限于在监视模式下或使用--onlyChanged和--findRelatedTests时测试的文件。</li>
<li>版本文档：我们将每个次要版本的文档添加回Jest 22，并从文档中删除了所有“Requires Jest X.X +”。</li>
<li>更好的快照摘要：我们对快照摘要输出进行了全面检查，以使过时的快照更具信息性。</li>
<li>更好的堆栈跟踪：我们将堆栈跟踪添加到异步错误，超时错误，expect.assertions和抛出的非错误。我们还在代码框中指出了这一列！</li>
<li>更好的React 16支持：为React.Fragment，React.forwardRef和React.createContext添加快照支持。</li>
<li>跟踪模拟返回和抛出值：添加mock.results，其中包含每个模拟调用的返回值或抛出值。</li>
<li>Blazing🔥：我们在自述文件中添加了一个炽热的徽章，表明Jest非常棒。</li>
</ul>
<h2><a href="https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing.html/#jest-summit"></a>Jest Summit</h2>
<p>上周，Jest核心团队在Facebook伦敦举行了Jest Summit，在那里工作并发布了Jest 23，宣布了Jest Open Collective，并进行了多次会谈：</p>
<ul>
<li><strong>Christoph Nakazawa</strong> – <a href="https://www.youtube.com/watch?v=cAKYQpTC7MA">Intro</a></li>
<li><strong>Aaaron Abramov</strong> – <a href="https://youtu.be/cAKYQpTC7MA?t=440">Writing Meaningful Tests</a></li>
<li><strong>Rick Hanlon II</strong> – <a href="https://youtu.be/cAKYQpTC7MA?t=1881">Blazing Fast Snapshot Testing in Jest 23</a></li>
<li><strong>Simen Bekkhus</strong> – <a href="https://youtu.be/cAKYQpTC7MA?t=2990">Jest's Delightful Error Messages</a></li>
<li><strong>Matt Phillips</strong> – <a href="https://youtu.be/cAKYQpTC7MA?t=3852">Level up your Jest experience with community packages</a></li>
<li><strong>Michele Bertoli</strong> – <a href="https://youtu.be/cAKYQpTC7MA?t=4582">Snapshot all the things</a></li>
<li><strong>Jordan Eldredge</strong> – <a href="https://youtu.be/cAKYQpTC7MA?t=5185">Webamp: Learn by imitating</a></li>
</ul>
<p><a href="https://www.youtube.com/watch?v=cAKYQpTC7MA">这里</a>有完整的演讲。</p>
<p>投票率非常高，我们能够亲自会见很多伦敦社区。感谢所有加入我们的人，感谢您的支持！请继续关注我们的下一篇文章，其中将概述Jest Open Collective以及我们未来的计划。</p>
<p><em>一如既往，如果没有JavaScript社区，这个版本是不可能实现的。
我们非常感谢我们有机会共同改进JavaScript测试。
如果您想为Jest做出贡献，请随时与我们联系<a href="https://github.com/facebook/jest">GitHub</a>或<a href="">Discord</a>.</em></p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/jest-23-blazing-fast-delightful-testing](https://www.zcfy.cc/article/jest-23-blazing-fast-delightful-testing)
原文标题: Jest 23: 🔥 快速愉快的测试
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
