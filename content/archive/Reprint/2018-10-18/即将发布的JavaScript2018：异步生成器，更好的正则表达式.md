---
title: 即将发布的JavaScript2018：异步生成器，更好的正则表达式
hidden: true
categories: reprint
slug: 3afe893
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>发布于2018年6月的年度<a href="http://www.ecma-international.org/ecma-262/9.0/index.html">ECMAScript 更新</a>, 尽管在常见功能上仅次于ECMAScript6， 但仍是至今为止最大的年度版本。</p>
<p><a href="https://github.com/bterlson">Brian Terlson</a>，是ECMAScript的编辑兼微软在 <a href="https://github.com/tc39">ECMA TC39委员会</a>的代表 ，在The New Stack上发表：这个版本两个最大的开发功能是异步生成器和一些大家期待已久的正则表达式改进，和Rest/Spread属性。</p>
<p>“异步生成器和迭代器是将异步函数和迭代器结合，所以它就像可以在其中等待的异步生成器或者可以得到返回值的异步函数，” 他解释到。此前，ECMAScript允许你写一个yield或异步等待的函数，但是不能生成一个二者同时进行的函数。“对于在Web平台占比越来越大的消耗资源流来说非常方便了，尤其是对于Fetch对象公开流的情况下。”</p>
<p>异步迭代器类似于观察者模式，但是灵活性更大。 ”观察者模式是一个不可逆的模式。一旦你订阅了，不管你是否准备好，将以最快的速度进入了所有的事件发布，所以你必须实施缓冲或采样策略处理干扰，”Terlson解释道。异步迭代器是一个可以推拉的模式——你请求一个值然后发送给你，这对像一些网络IO原语之类的东西更加有效。</p>
<p><a href="https://github.com/tc39/proposal-promise-finally">Promise.prototype.finally</a> 对异步编程也非常的有帮助，在一个promise状态变为fulfilled或者rejected后，指定一个最终方法进行清理。</p>
<h2>更多常规的正则表达式</h2>
<p>Tealson对正则表达式的改进非常兴奋（其中大部分都是由工作于V8引擎的团队完成的，他们已经完成了四个主要的特性的早期实现），因为这是这门语言落后的地方。</p>
<p>“自JavaScript诞生起，ECMAScript正则表达式没有过很大的进步提升，几乎其他所有编程语言的正则表达式库的功能更加高级。” ECMAScript 6 包含了 <a href="http://2ality.com/2015/07/regexp-es6.html">一些小的更新</a> ,但是他将ECMAScript2018视为“第一次明显改变你如何写正则表达式的更新“。</p>
<p><a href="https://github.com/tc39/proposal-regexp-dotall-flag">dotAll 标志</a> 使点字符匹配所有字符，而不会对匹配一些换行（如\n或\f）无效。“除非你在处于多行模式下并且你不在意每行的结束，否则你就不能使用点字符，”他指出。这方面的变通方法创造了不必要的复杂的正则表达式，并且Terlson期待：“每一个人都会在正则表达式中使用该模式”。</p>
<p><a href="https://github.com/tc39/proposal-regexp-named-groups">命名捕获组</a> 类似于一些其他语言的命名组，你可以在命名不同部分的正则表达式匹配的字符串，并将其视为对象。“这几乎等同于在你的正则表达式中添加注释，通过赋予它一个名字来解释这个组试图捕捉的内容，”他解释道，“这部分模式就是月份，这是出生日期......这对于未来其他人维护你的模式真的很有帮助。”</p>
<p>还有关于空字符的提案，告诉了正则表达式引擎忽略模式匹配中的空格，换行以及注释，并且允许在空格后的行尾添加注释，这种特性可能包含了在将来的ECMAScript版本中进一步提高可维护性。</p>
<p>以前的ECMAScript只有先行断言而没有后行断言。“人们使用了一些技巧，就像反转字符串，然后进行匹配，或者一些其他hacks，” Terslon强调。这对于查找和替换的正则表达式非常有用。 “你看到的没有变成你匹配的一部分，所以如果你要替换前后任何一侧有美元符号的数字，你就可以做到这一点无需做额外的工作将美元符号重新放回去” ECMAScript 的<a href="https://github.com/tc39/proposal-regexp-lookbehind">后行断言</a>允许像C#中那样可变长度的后行断言，而不是仅仅的像Perl的固定长度模式。</p>
<p>尤其是对于需要支持国际用户的开发者, 允许在正则表达式中使用<a href="https://github.com/tc39/proposal-regexp-unicode-property-escapes#ecmascript-proposal-unicode-property-escapes-in-regular-expressions">Unicode属性转义</a> \p{…} 和 \P{…} 将使Unicode可识别的正则表达式将会更加简单。目前，这对开发人员来说是一件非常麻烦的事情。</p>
<p>“Unicode定义了数字，但这些数字不仅仅包括基本的拉丁语ASCII 0-9，还包括数学数字，粗体数字，大纲数字，花哨的演示数字，表格数字。如果想匹配Unicode可识别的任何数字，则Unicode可识别的应用程序必须具有可用的整个Unicode数据表格。通过添加这些特性，你可以全部委托给Unicode，”他说道。如果你想要严格匹配Unicode字符，比如进行一些表单校验，并且如果你想要做一件正确的事情，而不是告诉人们它们的名称是不合法的，这在很多情况下很难做到，但是通过使用Unicode字符类你可以明确指出名称所需的字符范围。已经有了一些其他不同语言和脚本的类，所以如果你只想要解决希腊语和汉字，完全可以做到。Emojis符号正变得越来越普遍。</p>
<p>还有很多国际化 API，用于本地化的 <a href="https://github.com/tc39/proposal-intl-formatToParts">时间和日期格式</a>,欧元货币格式, 和<a href="https://github.com/tc39/proposal-intl-plural-rules">复数形式</a>, 这可以轻松地执行本地化标签和按钮。</p>
<p>ECMAScript 2018扩展了对象和数字对Rest/Spread模式的支持（在React生态系统中很常见，有些开发者还没有意识到它还没有完全标准化），Terslon称之为有巨大影响的小特性。Rest/Spread对于拷贝和克隆对象非常的有用。例如，你有一个不可变的结构，而你要改变除了一个属性之外的所有内容，或者你想要复制一个对象但要添加一个额外的属性。这个模式频繁的运用为选项记录分配默认值，Terslom强调，“对于你一直在做的事情来说，这是一个非常好的语法模式。”</p>
<p>类似于Babel和TypeScript的转换器已经支持了一些ECMAScript 2018的许多功能。浏览器支持也会伴随着时间推移实现，并且所有的新特性已经装载到Chrome的发布版本上 (想要获得完整的支持矩阵图表，请查看<a href="http://kangax.github.io/compat-table/es2016plus/">ECMAScript 兼容表格</a>.)</p>
<p><a href="https://cdn.thenewstack.io/media/2018/08/cf694974-ecmascript.png"><img src="https://p0.ssl.qhimg.com/t014ccb6202850cc58c.png" alt=""></a></p>
<p>根据ECMAScript兼容性表格检测到的浏览器支持情况。</p>
<h2>未来的发展；ECMAScript 2019</h2>
<p>一些有趣的提案至今没有达到成为ECMAScript标准的一部分所必需的第四个阶段的程度，包括一些对私有字段和方法的声明的有争议性的想法，其中包括很多备选提案。</p>
<p>当类被引入ECMAScript 6，它们是“最大地最小化”。Terslon解释其中的意思，“有意地在最小化，因为我们也会在以后继续处理它们。”私有字段将会允许开发者声明可以在一个类的内部通过名称进行引用的字段，但是不允许从类的外部进行访问，”他说。不仅仅是提供更好的性能，因为当在类构造函数中声明所有字段时，运行时可以更好地优化对象的处理，但也是语言强制实现隐私性，而 TypeScript 中的私有字段则不是这样。与 symbols 不同，你可以使用 get 属性列出对象上的所有 symbols，私有字段将不允许反射。</p>
<p>“库作者正在寻求一种拥有私人状态的方式，以便开发者不能依赖它，”Terlson 解释道。“即使做了他们不应该做的事情，库也不喜欢打断用户。”例如，类中的私有属性将允许库作者避免暴露内部实现细节，如果他们将来可能会修改的话。</p>
<p>同样在第三阶段的BigInt 提案。目前，ECMAScript 只有 64 位浮点数类型，但许多平台和 web APIs使用 64 位整数 — 包括 <a href="">Twitter 用作推文 ID</a>) 的 64 位整数。“你不能再将 JavaScript 中的推文 ID 表示为数字，”Terlson 解释道。“它们必须表示为一个字符串。” BigInt 是一个更通用的提案，用于添加任意精度的整数，而不只是添加 64 位整数。Cryptographic APIs和高精度计时器也将利用这一点，Terlson 预计 JIT JavaScript 引擎可能会使用原生 64 位字段来提供大整数以提升性能。</p>
<p>两项提案已经进入第四阶段；让 catch 绑定成为可选项（如果你不需要实际使用变量，就不必再将变量传递给 catch 块），以及进行<a href="https://github.com/tc39/proposal-json-superset">小的语法更改</a>以处理 JSON 和 ECMAScript 字符串格式之间的不匹配。这些将与其他在未来几个月内取得进展的提案一起进入 ECMAScript 2019。</p>
<p>微软是The New Stack的赞助商之一。</p>
<p>特性图<a href="https://pixabay.com/en/res-the-wind-pbx-current-3615421/">来自</a>Pixabay。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/what-s-coming-up-in-javascript-2018-async-generators-better-regex](https://www.zcfy.cc/article/what-s-coming-up-in-javascript-2018-async-generators-better-regex)
原文标题: 即将发布的JavaScript2018：异步生成器，更好的正则表达式
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。