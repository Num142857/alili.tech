---
title: 'JavaScript: ECMAScript 2018（ES2018）有哪些新功能？'
hidden: true
categories: [reprint]
slug: 4968ddc5
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p><img src="https://p0.ssl.qhimg.com/t019902c7bf8c4765f1.png" alt=""></p>
<p>在最新的TC39会议上，选择了将进入<strong>“ECMAScript®2018语言规范”</strong>（ES2018）的新功能。 自<a href="https://www.bram.us/2017/07/18/es2017-es8-language-features/">ES2017</a> 合并以来已达到第4阶段的所有提案都已被选中。 这篇文章让我们快速了解了进入ES2018的功能。 </p>
<p><strong><em>❓ Stage-4</em></strong> <em>TC39委员会有一个5阶段的过程，从第0阶段到第4阶段，通过它开发新的语言功能。 第四阶段是“完成”阶段。GitHub上提供了第4阶段提案列表</em></p>
<h3>对象 Rest/Spread 属性</h3>
<p>在解构对象时, <a href="https://github.com/tc39/proposal-object-rest-spread">对象 Rest 属性</a> 允许您将对象的剩余属性收集到新对象上。 把它想象成吸引所有剩菜的神奇磁铁。</p>
<p><img src="https://p0.ssl.qhimg.com/t018ae788fa61f569f8.png" alt=""></p>
<p>我自己经常使用这个，特别是在React（Native）上下文中，我从<code>this.props</code>中获取某些值供内部使用，然后通过再次传播将所有其他道具转发给返回的子组件。</p>
<p><img src="https://p0.ssl.qhimg.com/t01e5b700f55b4f0e33.png" alt=""></p>
<p>另外，如果你稍微改变你的思维逻辑，对象休息属性为你提供了一种以不可变的方式, <a href="https://www.bram.us/2018/01/10/javascript-removing-a-property-from-an-object-immutably-by-destructuring-it/">从对象中删除属性的好方法</a>.</p>
<h3>异步迭代</h3>
<p>使用 <a href="https://github.com/tc39/proposal-async-iteration">异步迭代</a> 我们得到异步迭代器和异步迭代。 异步迭代器就像常规迭代器一样，除了它们的<code>next（）</code>方法之外，它返回一个<code>{value，done}</code>对的promise。 为了使用异步迭代，我们现在可以使用带有<code>for ...</code>ofloops的<code>await</code>关键字。</p>
<p><img src="https://p0.ssl.qhimg.com/t0185be641b30d874d6.png" alt=""></p>
<h3>Promise.prototype.finally()</h3>
<p><code>Promise.prototype.finally（）</code>最终确定整个promises实现，允许你注册一个在一个promise被解决（被满足或被拒绝）时被调用的回调。</p>
<p>一个典型的用例是在<code>fetch（）</code>请求之后隐藏一个微调器：而不是复制最后一个<code>.then（）</code>和<code>.catch（）</code>中的逻辑，现在可以将它放在<code>.finally（）</code></p>
<p><img src="https://p0.ssl.qhimg.com/t013b661bef1e678083.png" alt=""></p>
<h3>RegExp相关功能</h3>
<p>共有4个“RegExp”相关提案进入ES2018：</p>
<ul>
<li><a href="https://github.com/tc39/proposal-regexp-dotall-flag"><code>s</code></a>(<a href="https://github.com/tc39/proposal-regexp-dotall-flag"><code>dotAll</code></a> )<a href="https://github.com/tc39/proposal-regexp-dotall-flag">flag for regular expressions</a></li>
<li><a href="https://github.com/tc39/proposal-regexp-named-groups">RegExp named capture groups</a></li>
<li><a href="https://github.com/tc39/proposal-regexp-lookbehind">RegExp Lookbehind Assertions</a></li>
<li><a href="https://github.com/tc39/proposal-regexp-unicode-property-escapes">RegExp Unicode Property Escapes</a></li>
</ul>
<p>我特别挖掘了“RegEx命名捕获组”功能，因为它提高了可读性：</p>
<p><img src="https://p0.ssl.qhimg.com/t01759a10d90da7ecc7.png" alt=""></p>
<p>有关这些功能的更多信息可以在Mathias Bynens找到 - 这些建议背后的驱动力之一 - 他的博客: <a href="https://mathiasbynens.be/notes/es-regexp-proposals">ECMAScript正则表达式越来越好！</a></p>
<h3>其他新功能</h3>
<p>最重要的是 <a href="https://github.com/tc39/proposal-template-literal-revision">模板文字调整</a> 着陆：当使用标记模板文字时，对转义序列的限制被删除，从而允许像<code>\ xerxes</code>。 在此调整之前会抛出一个错误，因为<code>\ x</code>是十六进制转义的开始，而'erxes`不是有效的十六进制值。</p>
<p>**<em>❓ 标记模板文字根据MDN：如果模板文字前面有表达式，则模板字符串称为“标记模板文字”。 在这种情况下，标记表达式（通常是函数）将使用已处理的模板文字进行调用，然后您可以在输出之前对其进行操作。</em></p>
<h3>现在怎么办？</h3>
<p>请注意，并非所有浏览器都能提供所有这些功能。 意思是他们是Stage-4意味着他们已经完成了，并且浏览器供应商应该实现它们<em>（一些已经有，其他人正在进行中）</em></p>
<p>至于未来,我已经在期待JavaScript的未来发展方向. 就像 <a href="https://www.bram.us/2017/01/30/javascript-null-propagation-operator/">可选链接操作员</a> 已经让我很兴奋了 😊</p>
<p><em>💻 The examples embedded in this post are part of a talk on ESNext named</em> <strong><em>“What’s next for JavaScript?”</em></strong><em>, which I recently gave at a</em> <a href="https://fronteers.nl/vereniging/commissies/belgie"><em>Fronteers België</em></a> <em>meetup. I’m currently still in the process of preparing the slides for publication. I’m available for bringing this talk at your meetup/conference.</em></p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/javascript-what-s-new-in-ecmascript-2018-es2018](https://www.zcfy.cc/article/javascript-what-s-new-in-ecmascript-2018-es2018)
原文标题: JavaScript: ECMAScript 2018（ES2018）有哪些新功能？
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
