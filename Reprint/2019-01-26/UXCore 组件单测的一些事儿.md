---
title: 'UXCore 组件单测的一些事儿' 
date: 2019-01-26 2:30:18
hidden: true
slug: 5jbqt5cbauk
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="http://uxco.re/" rel="nofollow noreferrer" target="_blank">UXCore</a> 是 XUX 团队开源的 PC 端 React UI 套件，作为一个支持企业级应用的 React UI 开源套件，为了保持项目的持续集成，良好的单元测试必不可少。本文来分享一下在编写单元测试的过程中遇到的一些问题和总结。</p></blockquote>
<p>在编写单测的时候首先可能会遇到一个开发顺序的问题，是先写测试代码还是先写程序代码，那么先来介绍两种开发技术：<a href="https://zh.wikipedia.org/wiki/%E8%A1%8C%E4%B8%BA%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91" rel="nofollow noreferrer" target="_blank">BDD</a> 和 <a href="https://zh.wikipedia.org/wiki/%E6%B5%8B%E8%AF%95%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91" rel="nofollow noreferrer" target="_blank">TDD</a>。BDD 是行为驱动开发，更趋向于需求，从写单测的顺序上可以理解为先了解行为，然后去写单测来检测是否符合需求期望；TDD 是测试驱动开发，先编写符合需求期望的测试，然后根据测试来实现最简功能代码，不断进行迭代打磨代码，在写单测的顺序上那就是先写单测，根据单测来编写功能代码。这两种开发技术分别适用于不同的场景，可根据自己的情况来选择使用。</p>
<p>UXCore 目前已有的组件采用的是 BDD ，由于组价代码都已 ready 我们就编写测试来验证需求是否已经满足，首先要做的就是通读组件代码（因为有的组件的作者不是自己），将其内部逻辑和实现要搞清楚，接下来才会知道怎么具体写测试代码！</p>
<h3 id="articleHeader0">UXCore 组件单测环境</h3>
<p>在编写单测时我们要将测试代码运行起来，实时看到测试结果，并且要查看测试覆盖率以更好的提高代码质量，那么这就需要测试运行器、测试框架等等工具或框架来支持，以下是 UXCore 组件采用的单测环境，其他 React 项目也可参考使用。</p>
<ol>
<li><p>测试运行器（Test runner）主要负责测试的自动化，它可以自动调起多种浏览器或者 js 环境让你来调试测试代码。目前有 <a href="https://code.google.com/archive/p/js-test-driver/" rel="nofollow noreferrer" target="_blank">JSTD</a> 、<a href="https://karma-runner.github.io/1.0/index.html" rel="nofollow noreferrer" target="_blank">Karma</a> 、<a href="http://swarm.jquery.org/" rel="nofollow noreferrer" target="_blank">TestSwarm</a>、 <a href="http://docs.busterjs.org/en/latest/" rel="nofollow noreferrer" target="_blank">Buster</a> 等测试运行器，UXCore 使用的是 <a href="https://karma-runner.github.io/1.0/index.html" rel="nofollow noreferrer" target="_blank">Karma</a> ，原因是它集成了 Istanbul 的 coverage 功能，可检测测试覆盖率，并且支持多种测试框架。在 uxcore-tools 中已经集成 karma ，你只需执行几个命令就可以。</p></li>
<li><p>测试框架（Testing Framework），即运行测试的工具，测试框架规定了测试风格和测试的生命周期，通过测试框架为程序添加测试，保证代码质量。目前有 <a href="https://jasmine.github.io/" rel="nofollow noreferrer" target="_blank">Jasmine</a> 、<a href="http://qunitjs.com/" rel="nofollow noreferrer" target="_blank">Qunit</a> 、<a href="http://sinonjs.org/" rel="nofollow noreferrer" target="_blank">Sinon</a> 、<a href="https://mochajs.org/" rel="nofollow noreferrer" target="_blank">Mocha</a> 等测试框架。UXCore 选择的是 <a href="https://mochajs.org/" rel="nofollow noreferrer" target="_blank">Mocha</a> ，它来自 TJ 大神，不但可以在bash中进行测试，而且还拥有一整套命令对测试进行操作，Mocha 的异步测试做的比较好，在 it 的回调函数中会获取一个参数 done ，类型是 function ，用于异步回调，当执行这个函数时就会继续测试。</p></li>
<li><p>当然，除了测试运行器 、测试框架之外我们还需要断言库（Assertion library）来帮助我们判断代码执行的正误，比较流行的断言库有：<a href="https://www.npmjs.com/package/expect.js" rel="nofollow noreferrer" target="_blank">expect.js</a>、<a href="https://www.npmjs.com/package/should" rel="nofollow noreferrer" target="_blank">should</a>、<a href="https://www.npmjs.com/package/chai" rel="nofollow noreferrer" target="_blank">chai</a>，我们使用的是 expect.js ，支持 IE6+ ，语法通俗易懂。</p></li>
<li><p>在测试 react 组件时还要用到 React UI 测试库，<a href="https://facebook.github.io/react/docs/test-utils.html" rel="nofollow noreferrer" target="_blank">React 官方提供了工具库</a>，它对虚拟 DOM 和 真实 DOM 都有对应的测试方法，但是它使用起来不太方便。还有一个 Airbnb 公司的封装的 <a href="https://github.com/airbnb/enzyme" rel="nofollow noreferrer" target="_blank">Enzyme</a> ，非常容易上手。我们选择的是后者。</p></li>
</ol>
<h3 id="articleHeader1">测试覆盖率</h3>
<p>测试覆盖率是测试中的一种度量，描述源代码被测试的比例和程度。通过测试覆盖率可以检测哪些代码没有被测试，但是测试覆盖率并不能作为衡量代码质量的标准和目标，而是一种发现未被测试代码的手段。</p>
<p>覆盖率的统计的核心思想就是，在源代码对应的位置注入统计代码，当代码运行后，根据统计代码统计的数据确定程序运行的路径，最终生成覆盖率统计报告。整个过程可以分为三部分：转换(instrument)、执行(run)、生成报告(report)。</p>
<ol><li>
<p>转换(instrument)</p>
<ul>
<li><p>首先对源代码进行语法分析生成语法树</p></li>
<li><p>在语法树相应的位置注入统计代码，在程序执行到这个位置的时候对相应的全局变量赋值，确保执行之后能够根据全局变量知道代码的执行流程</p></li>
<li><p>根据注入之后的语法树生成对应的 JavaScript 代码，即转换之后的代码(instrumented code)</p></li>
</ul>
</li></ol>
<blockquote><p>注：这里进行语法分析的好处是，针对书写不规范的代码（比如一行多个语句），依然能够很好统计出分支覆盖和组合覆盖等信息。反过来想，如果想要提高覆盖率，那么代码要书写规范。</p></blockquote>
<ol><li><p>执行(run)</p></li></ol>
<p>这一步需要先载入转换后的代码：</p>
<ul><li><p>浏览器环境：需要将转换后的代码传给浏览器。如果是 karma 之类的带 server 的测试框架，需要通过 socket 传输至浏览器，执行完之后再将包含覆盖率信息的执行结果传回 server ，生成测试报告。</p></li></ul>
<p>然后执行单元测试，产生的统计信息会挂在全局变量 this 下面。对于浏览器环境，this 就是 window。</p>
<ol><li><p>生成报告(report)</p></li></ol>
<p>这一步会根据全局标量中的覆盖率信息生成特定格式的报告，如 html、lcov、cobertura、teamcity等。</p>
<p>想要了解更详细的内容可移步：<a href="https://yq.aliyun.com/articles/2656" rel="nofollow noreferrer" target="_blank">https://yq.aliyun.com/article...</a>，如果想了解 <a href="http://www.ruanyifeng.com/blog/2015/06/istanbul.html" rel="nofollow noreferrer" target="_blank">Istanbul入门使用</a>的童鞋可以看一下阮大神的这篇。</p>
<h3 id="articleHeader2">如何编写 React 组件单测</h3>
<p>编写单元测试就是用一段代码来测试一个模块或功能是否能达到预期结果的一个过程。</p>
<p>下边列出两个常见的例子给大家作为参考：</p>
<ol><li>
<p>最简单的 props 测试。</p>
<ul><li><p>首先创建组件的真实 DOM 结构</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const wrapper = mount(<Select2 prefixCls=&quot;kuma-select2&quot; ></Select2>);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> wrapper = mount(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Select2</span> <span class="hljs-attr">prefixCls</span>=<span class="hljs-string">"kuma-select2"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Select2</span>&gt;</span></span>);</code></pre>
<ul><li><p>然后获取到当前组件的 prefixCls props，用 enzyme 的 <a href="https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/props.md" rel="nofollow noreferrer" target="_blank">.props()</a> API 就可以很容易的取到  props 的值（这里有一点要说明，.props() 只能取到 root component 的 props），然后用断言句进行判断当前的 prefixCls 是否是 'kuma-select2'</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="expect(wrapper.props().prefixCls).to.equal('kuma-select2');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">expect(wrapper.props().prefixCls).to.equal(<span class="hljs-string">'kuma-select2'</span>);</code></pre>
<ul><li><p>完成上边两步就可以了吗？上边只是 get props 符合了我们的期望，那我们再给组件更新一下 props 看会不会生效。enzyme 也提供了对应的 <a href="https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/setProps.md" rel="nofollow noreferrer" target="_blank">.setProps()</a> 的 API ，真是太方便啦。然后再次验证新的 prefixCls 有没有更新。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wrapper.setProps({ prefixCls: 'kuma-select2-test' });
expect(wrapper.props().prefixCls).to.equal('kuma-select2-test');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">wrapper.setProps({ <span class="hljs-attr">prefixCls</span>: <span class="hljs-string">'kuma-select2-test'</span> });
expect(wrapper.props().prefixCls).to.equal(<span class="hljs-string">'kuma-select2-test'</span>);</code></pre>
</li></ol>
<ol><li>
<p>模拟下拉框选中动作，测试 value 值是否已更新。</p>
<ul><li><p>首先还是创建组件的真实 DOM 结构</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const wrapper = mount(<CascadeSelect options={options} />);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> wrapper = mount(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">CascadeSelect</span> <span class="hljs-attr">options</span>=<span class="hljs-string">{options}</span> /&gt;</span>);</span></code></pre>
<ul><li><p>然后要创建 Trigger 组件（ dropdown的子组件 ）的真实 DOM 结构，这里要提一下 enzyme 的 <a href="https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/find.md" rel="nofollow noreferrer" target="_blank">.find()</a> API ，它的参数除了可以是选择器外还可以是子组件的名称。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dropdownWrapper = mount(wrapper.find('Trigger').node.getComponent());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> dropdownWrapper = mount(wrapper.find(<span class="hljs-string">'Trigger'</span>).node.getComponent());</code></pre>
<ul><li><p>接下来找到下拉选项中的第一项触发 click 事件，<a href="https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/simulate.md" rel="nofollow noreferrer" target="_blank">.simulate()</a> API 用来做事件绑定。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dropdownWrapper.find('li').at(0).simulate('click');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">dropdownWrapper.find(<span class="hljs-string">'li'</span>).at(<span class="hljs-number">0</span>).simulate(<span class="hljs-string">'click'</span>);</code></pre>
<ul><li><p>模拟完后就来验证你要验证的逻辑，获取到子组件 CascadeSubmenu 的一项 option ，调用 CascadeSubmenu 的 props onItemClick 函数，将获取到的 option 传入进去，最后断言句判断最后组件的 value 是否不为空。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const option = dropdownWrapper.find('CascadeSubmenu').props().options[0];
dropdownWrapper.find('CascadeSubmenu').props().onItemClick(option,2,false);
expect(wrapper.state('value').length > 0).to.be.ok()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> option = dropdownWrapper.find(<span class="hljs-string">'CascadeSubmenu'</span>).props().options[<span class="hljs-number">0</span>];
dropdownWrapper.find(<span class="hljs-string">'CascadeSubmenu'</span>).props().onItemClick(option,<span class="hljs-number">2</span>,<span class="hljs-literal">false</span>);
expect(wrapper.state(<span class="hljs-string">'value'</span>).length &gt; <span class="hljs-number">0</span>).to.be.ok()</code></pre>
</li></ol>
<p>上边的代码使用了 Enzyme 的 <a href="https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md" rel="nofollow noreferrer" target="_blank">Full DOM Rendering API</a> ，首先创建 CascadeSelect 组件的真实 DOM 结构，然后再次创建 dropdown 的 Trigger 子组件的真实 DOM 结构，最后找到第一个选项触发 click 事件。</p>
<blockquote><p>Tip：如果组件引用了其他的组件，那么单测应该测到什么程度呢？要不要测引用的其他组件的代码？答案就是：你不需要测试它引用的组件的代码逻辑，引用组件的代码测试会在它自己内部完成，当然你测了也不会提高覆盖率，我们只需测试我们组件的代码即可。</p></blockquote>
<p>最后，怎么能更加清晰的知道自己哪些代码还没有覆盖到呢？如果可以看到就好了，能够对症下药，绝对提高覆盖率啊！当然，Karma 都帮你做好了，执行过 coverage 后会生成一个 coverage 目录，它的 src  目录下的组件文件命名的 html 文件打开后就会看到非常清晰的记录，红色的表示还没有覆盖到的。当然也可以本地起一个服务，可用 anywhere 直接浏览器里查看覆盖率列表和对应的详细文件。下图是一份coverage 报告。<br><span class="img-wrap"><img data-src="/img/remote/1460000008328280?w=1018&amp;h=407" src="https://static.alili.tech/img/remote/1460000008328280?w=1018&amp;h=407" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000008328281?w=472&amp;h=281" src="https://static.alili.tech/img/remote/1460000008328281?w=472&amp;h=281" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
UXCore 组件单测的一些事儿

## 原文链接
[https://segmentfault.com/a/1190000008328277](https://segmentfault.com/a/1190000008328277)

