---
title: 2018年你应该知道的11个Javascript实用程序库
reprint: true
categories: reprint
abbrlink: cca8f40d
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p>由于Javascript在2018年仍然是<a href="https://insights.stackoverflow.com/survey/2018/#technology">最受欢迎和最广泛使用的编程语言</a>，因此使得它的生态系统得到了更好的扩展。</p>
<p><img src="https://p0.ssl.qhimg.com/t017d7ef7f1ed125a35.png" alt=""></p>
<p>尽管如此，Javascript的小型“标准库”仍然会<a href="https://www.infoworld.com/article/3048833/open-source-tools/brendan-eich-javascript-standard-library-will-stay-small.html">保持这种状态</a>。为填补这一空白，许多流行的实用程序库在过去几年中在GitHub上发展壮大。以下是有用且高度维护的库的简短列表。</p>
<p>提示：列表中的大多数（如果不是全部）库都可以与<a href="https://bitsrc.io">Bit的组件平台结合使用</a>，这样您就可以单独使用任何功能来发现，使用甚至从使用它的任何项目开发。</p>
<p>使用也在<a href="https://github.com/teambit/bit">GitHub上的Bit</a>，您可以无缝地隔离任何这些库中的组件（无重构），并使用NPM将它们安装在其他项目中，使用Bit，更新更改，协作和保持同步从任何项目开发它们。随意跳进去。</p>
<p><a href="https://bitsrc.io" title="https://bitsrc.io"><strong>Bit - Share and build with code components</strong> _Bit helps you share, discover and use code components between projects and applications to build new features and…_bitsrc.io</a><a href="https://bitsrc.io"></a></p>
<h3>1. Underscore &amp; Lodash (dah)</h3>
<p>大多数人可能已经知道了。构建Underscore是为了在Javascript中为常见任务提供实用程序功能。 <a href="https://www.npmjs.com/package/lodash">Lodash是NPM下载量最大</a>，<a href="https://www.npmjs.com/browse/depended">依赖性最强的软件包</a>，旨在为数组，字符串，对象和参数对象提供更一致的跨环境<a href="https://stackoverflow.com/questions/13789618/differences-between-lodash-and-underscore?utm_medium=organic&amp;utm_source=google_rich_qa&amp;utm_campaign=google_rich_qa">迭代支持</a>。它已经成为Underscore的超集，并且都由相同的核心贡献者维护。绝对应该在你的技术堆栈中。</p>
<p><a href="https://github.com/lodash/lodash" title="https://github.com/lodash/lodash"><strong>lodash/lodash</strong> _lodash - A modern JavaScript utility library delivering modularity, performance, &amp; extras._github.com</a><a href="https://github.com/lodash/lodash"></a></p>
<p><a href="https://github.com/jashkenas/underscore" title="https://github.com/jashkenas/underscore"><strong>jashkenas/underscore</strong> _underscore - JavaScript's utility _ belt_github.com</a><a href="https://github.com/jashkenas/underscore"></a></p>
<p><a href="https://bitsrc.io/lodash/lodash" title="https://bitsrc.io/lodash/lodash"><strong>lodash. Javascript components by lodash.</strong> _Non-Official and community generated collection of the Lodash JS utility library functionalities made individually…_bitsrc.io</a><a href="https://bitsrc.io/lodash/lodash"></a></p>
<p><img src="https://p0.ssl.qhimg.com/t0119a2cd849ad7b254.png" alt=""></p>
<h3>2. Ramda</h3>
<p>这个JS实用程序库超过12K星，专为函数式编程而设计，可以轻松创建不会改变用户数据的功能管道。不可变性和无副作用功能是其设计理念的核心。所有功能都自动进行curried，并且相应地安排传递的参数以便于使用。</p>
<p><a href="https://github.com/ramda/ramda" title="https://github.com/ramda/ramda"><strong>ramda/ramda</strong> _ramda - :ram: Practical functional Javascript_github.com</a><a href="https://github.com/ramda/ramda"></a></p>
<ul>
<li>另请查看: <a href="https://github.com/facebook/immutable-js/">immutable.js</a></li>
</ul>
<h3>3. MathJS</h3>
<p>在6K星级，Math.js是一个广泛的JavaScript和Node.js数学库，它与JavaScript的内置数学库兼容。该库包含一个灵活的表达式解析器，能够执行符号计算，并带有大量内置函数和常量。你甚至可以自己扩展它。</p>
<p><a href="https://github.com/josdejong/mathjs" title="https://github.com/josdejong/mathjs"><strong>josdejong/mathjs</strong> _mathjs - An extensive math library for JavaScript and Node.js_github.com</a><a href="https://github.com/josdejong/mathjs"></a></p>
<h3>4. Moment/date-fns</h3>
<p>在近40K星级，moment.js是一个JavaScript日期和时间操作库，用于解析，验证，操作和格式化日期。 Moment旨在在浏览器和Node.js中工作。从v 2.10.0开始，代码编写在ECMAScript 6模块中。</p>
<p>Date-fns是一个越来越流行的（11K星，每周超过50万次NPM安装）时间操作库，用于Javascript，由许多开发人员选择替换 <a href="https://momentjs.com/">moment.js</a>（<a href="https://github.com/date-fns/date-fns/issues/275#issuecomment-264934189">参见比较</a>），提供超过130个函数来操作浏览器和节点中的日期.js文件。 Date-fns是使用纯函数构建的，并且在不更改传递日期实例的情况下保持不可变。它适用于webpack，Browserify或Rollup等捆绑器，并且还支持<a href="https://juejin.im/post/5a4dc842518825698e7279a9">tree-shaking</a>。</p>
<p><a href="https://github.com/moment/moment/" title="https://github.com/moment/moment/"><strong>moment/moment</strong> _moment - Parse, validate, manipulate, and display dates in javascript._github.com</a><a href="https://github.com/moment/moment/"></a></p>
<p><a href="https://github.com/date-fns/date-fns" title="https://github.com/date-fns/date-fns"><strong>date-fns/date-fns</strong> _date-fns - ⏳ Modern JavaScript date utility library ⌛️_github.com</a><a href="https://github.com/date-fns/date-fns"></a></p>
<h3>5. Sugar</h3>
<p>在3.5K星级，Sugar是一个用于处理本机对象的Javascript实用程序库。自定义构建和模块化的npm包允许您只使用您需要的东西（也可以与<a href="https://bitsrc.io">Bit</a>结合使用），用户可以定义方法或使用插件来处理专门的用例。值得一试。</p>
<p><a href="https://github.com/andrewplummer/Sugar" title="https://github.com/andrewplummer/Sugar"><strong>andrewplummer/Sugar</strong> _Sugar - A Javascript library for working with native objects._github.com</a><a href="https://github.com/andrewplummer/Sugar"></a></p>
<p><img src="https://p0.ssl.qhimg.com/t01bcadb9187f3ca144.png" alt=""></p>
<h3>6. Lazy</h3>
<p>在5K星级，lazy.js是一个用于JavaScript的函数实用程序库，它具有一个懒加载引擎，“尽可能少地工作”，同时仍然足够灵活。该库没有外部依赖关系，这是一个将<a href="http://danieltao.com/lazy.js/demos/events/">Dome</a> 事件作为序列进行测试的现场演示。以下是要开始使用的<a href="http://danieltao.com/lazy.js/docs/">API文档</a> 。</p>
<p><a href="https://github.com/dtao/lazy.js" title="https://github.com/dtao/lazy.js"><strong>dtao/lazy.js</strong> _lazy.js - Like Underscore, but lazier_github.com</a><a href="https://github.com/dtao/lazy.js"></a></p>
<h3>7. CollectJS</h3>
<p>在3.5K星级，collect.js是一个非常有前途和无依赖性的包装器，用于在Javascript中处理数组和对象，其中有许多有用的功能和API（几乎）与<a href="https://laravel.com/docs/5.5/collections">Laravel Collections</a>相同。这个library得到了积极维护，值得关注。</p>
<p><a href="https://github.com/ecrmnn/collect.js/" title="https://github.com/ecrmnn/collect.js/"><strong>ecrmnn/collect.js</strong> _collect.js - 💎 Convenient and dependency free wrapper for working with arrays and objects_github.com</a><a href="https://github.com/ecrmnn/collect.js/"></a></p>
<h3>8. ChanceJS</h3>
<p>Chance是随机字符串，数字等的极简主义生成器，有助于减少一些单调，同时编写自动化测试或任何其他随机需要的东西。只有3K星，这个库非常有用，因为我们倾向于在被要求生成随机事物时重复我们的模式。</p>
<p><a href="https://github.com/chancejs/chancejs" title="https://github.com/chancejs/chancejs"><strong>chancejs/chancejs</strong> _chancejs - Chance - Random generator helper for JavaScript_github.com</a><a href="https://github.com/chancejs/chancejs"></a></p>
<h3>9. ChartJS</h3>
<p>在近40k的星星上，chart.js是一个很好的例子，说明8种不同的数据可视化类型，有时甚至更少，每种类型都是动画和可自定义的。
Chart.js允许您使用<code>&lt;canvas&gt;</code>标签创建简单的HTML5图表，在所有现代浏览器中都具有出色的渲染性能。
绝对是列表中最有用和最优雅的库之一。</p>
<p><a href="https://github.com/chartjs/Chart.js" title="https://github.com/chartjs/Chart.js"><strong>chartjs/Chart.js</strong> _Chart.js - Simple HTML5 Charts using the tag_github.com</a><a href="https://github.com/chartjs/Chart.js"></a></p>
<p><img src="https://p0.ssl.qhimg.com/t01d21e6d9172c04a78.png" alt=""></p>
<h3>10. Polished</h3>
<p>由<a href="https://github.com/styled-components/styled-components">styled-components</a> 团队撰写的Polished拥有3.5K星，Polished是一个非常轻量级的工具集，用于在JavaScript中使用Sass风格的辅助函数和mixin编写样式。该库与样式组件，Aphrodite，Radium或纯内联样式兼容。这个个人最爱可以在GitHub上获得，并且所有单一功能都在Bit的社区（非官方）中提供，因此可以单独安装/导入和使用它们。</p>
<p><a href="https://github.com/styled-components/polished" title="https://github.com/styled-components/polished"><strong>styled-components/polished</strong> _polished - A lightweight toolset for writing styles in JavaScript ✨_github.com</a><a href="https://github.com/styled-components/polished"></a></p>
<p><a href="https://bitsrc.io/ranm8/polished" title="https://bitsrc.io/ranm8/polished"><strong>polished. Javascript components by ranm8.</strong> _A lightweight toolset for writing styles in JavaScript ✨ 72 Javascript components. Examples: color / adjust-hue, color…_bitsrc.io</a><a href="https://bitsrc.io/ranm8/polished"></a></p>
<h3>11. Mout</h3>
<p>Mout.js是模块化JavaScript实用程序的集合，可以在浏览器中用作AMD模块或node.js，提供类似于其他语言标准库（Python，Ruby，PHP等）上的辅助方法。 mout.js允许您仅加载所需的模块/功能，并提供一致的API并规范多个浏览器的行为。</p>
<p><a href="https://github.com/mout/mout" title="https://github.com/mout/mout"><strong>mout/mout</strong> _mout - Modular JavaScript Utilities_github.com</a><a href="https://github.com/mout/mout"></a></p>
<h3>相关阅读：</h3>
<h4>* Bit utils</h4>
<p>Javascript实用程序功能提供模块化和性能，在Bit的Web中心本身使用。这些功能可以单独使用，可以使用NPM / Yarn进行安装，也可以使用Bit本身从任何使用它们的项目（在任何环境中）进行开发。您可以创建自己的类似集合，并从不同的库和项目中收集有用的功能。</p>
<p><a href="https://bitsrc.io/bit/utils" title="https://bitsrc.io/bit/utils"><strong>Bit - icons-utils / icons / secure - React component by grommet</strong> _Secure SVG Icon. - written in react. Dependencies: classnames, prop-types, react. Javascript utility functions for…_bitsrc.io</a><a href="https://bitsrc.io/bit/utils"></a></p>
<p><img src="https://p0.ssl.qhimg.com/t011e4585fd59589b04.png" alt=""></p>
<h4>* Voca</h4>
<p>用于字符串操作的Javascript库。它包括有用的功能，如<em>change case，trim，pad，slugify，latinise，sprintf'y，truncate，escape</em>等等。您可以加载单个函数以最小化应用程序构建。该库有高测试覆盖率，没有依赖性。</p>
<p><a href="https://github.com/panzerdp/voca" title="https://github.com/panzerdp/voca"><strong>panzerdp/voca</strong> _voca - The ultimate JavaScript string library_github.com</a><a href="https://github.com/panzerdp/voca"></a></p>
<h4>* Licia</h4>
<p>这个有趣的项目只有400颗星，基本上是一个简单的有用的JavaScript代码片段集合，具有高级文档和测试覆盖率。 v 2.0在master上预发布，并且是积极维护和开发的。</p>
<p>了解更多<a href="https://hackernoon.com/a-new-utility-library-designed-to-get-things-done-d203daa91429">在此Hackernoon帖子中</a>.</p>
<p><a href="https://github.com/liriliri/licia" title="https://github.com/liriliri/licia"><strong>liriliri/licia</strong> _licia - Useful utility collection with zero dependencies_github.com</a><a href="https://github.com/liriliri/licia"></a></p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/11-javascript-utility-libraries-you-should-know-in-2018](https://www.zcfy.cc/article/11-javascript-utility-libraries-you-should-know-in-2018)
原文标题: 2018年你应该知道的11个Javascript实用程序库
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
