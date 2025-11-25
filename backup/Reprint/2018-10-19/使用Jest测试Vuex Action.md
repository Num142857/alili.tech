---
title: 使用Jest测试Vuex Action
hidden: true
categories: [reprint]
slug: 4984842d
date: 2018-10-19 00:00:00
---

{{< raw >}}

            <p>在隔离状态下测试Action是非常直接的。action应该与调用它的组件解耦，独立的进行测试。</p>
<p><a href="https://lmiller1990.github.io/vue-testing-handbook/vuex-in-components-mutations-and-actions.html">本文</a>主要讲述在组件中正确的测试action</p>
<hr>
<p>我正在书写一本关于VUE应用程序测试的<a href="https://lmiller1990.github.io/vue-testing-handbook/">开源书籍</a>。它包括Vue组件、Vuex和Vue Router。<a href="https://lmiller1990.github.io/vue-testing-handbook/">这是一些来源和贡献指南</a>（欢迎所有人提出idea）</p>
<p><em>本文中涉及到的测试代码</em> <a href="https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/actions.spec.js">点击查看</a></p>
<hr>
<h3>创建 Action</h3>
<p>我们先按照普通Vuex模式写一个action。</p>
<ol>
<li><p>对API进行异步调用</p>
</li>
<li><p>对数据做一些处理（可选）</p>
</li>
<li><p>把结果作为moutation的参数进行提交</p>
</li>
</ol>
<p>有一个身份验证action，它将用户名和密码发送到外部API，检查它们是否匹配。然后提交SET_AUTHENTICATED moutation 来更新状态。</p>
<p><img src="https://p0.ssl.qhimg.com/t01cbc30c6bef7323c7.jpg" alt=""></p>
<p>action 测试 assert:</p>
<ol>
<li><p>api调用正确吗？</p>
</li>
<li><p>payload正确吗？</p>
</li>
<li><p>提交mutation正确吗？</p>
</li>
</ol>
<p>让我们继续写测试，让失败的消息指导我们。</p>
<h3>测试</h3>
<p><img src="" alt=""></p>
<p>由于axios是异步的，为了确保Jest等待测试完成，我们需要将其声明为异步的，然后等待对action.authenticate的调用。否则，测试将在预期断言之前完成，我们将会看到一个常青树一样的测试——一个永远不会失败的测试。</p>
<p>运行上面的测试给了我们以下的失败信息：</p>
<p><img src="https://p0.ssl.qhimg.com/t01cbc30c6bef7323c7.jpg" alt=""></p>
<p>这个错误来自Axios内部。我们正在向/api...发出请求，并且由于我们在测试环境中运行，所以甚至没有服务器向其发出请求，因此出现错误。我们也没有定义url或bod，我们应该这样做</p>
<p>由于我们正在使用Jest，所以可以很容易地使用jest.mock模拟API调用。我们将使用模拟的axios,而不是真实的axios，这将使我们对它的行为有更多的处理。JEST提供了<a href="https://jestjs.io/docs/en/es6-class-mocks">ES6 Class Mocks</a>，这是一个非常适合模拟axios的工具。</p>
<p>axios 模拟如下</p>
<p>axios 模拟如下</p>
<p>我们将url和body保存到变量中，由于我们可以确定返回值是正确的。因此不需要等待返回值，我们可以立即给API调用的promise返回resolve（成功）</p>
<p>测试通过</p>
<h3>测试api的异常情况</h3>
<p>我们只测试了API调用成功的情况。测试所有可能的结果是很重要的。让我们为发生错误的情况写一个测试。这一次，我们先写测试，然后再执行。</p>
<p>测试用例可以写成这样:</p>
<p><img src="https://p0.ssl.qhimg.com/t01cbc30c6bef7323c7.jpg" alt=""></p>
<p>我们需要找到一种方法来强制axios模拟抛出一个错误，我们选择使用MockError变量。更新axios模拟：</p>
<p><img src="https://p0.ssl.qhimg.com/t01cbc30c6bef7323c7.jpg" alt=""></p>
<p>如果变量名称是用mock预置的话， JEST允许在ES6类模拟中访问外部变量。现在我们可以简单地写mockError＝true，AXIOS将抛出一个错误。</p>
<p>运行这个测试给我们错误信息如下:</p>
<p><img src="https://p0.ssl.qhimg.com/t01cbc30c6bef7323c7.jpg" alt=""></p>
<p>成功地捕获了一个错误……但不是我们预期的那个错误。更新身份验证以抛出测试所预期的错误：</p>
<p><img src="https://p0.ssl.qhimg.com/t01cbc30c6bef7323c7.jpg" alt=""></p>
<p>测试通过。</p>
<h3>改进</h3>
<p>现在你知道如何孤立地测试action了。至少有一个可能成功的优化， 作为一个 <a href="https://jestjs.io/docs/en/manual-mocks">manual mock</a>调用axion 模拟.（https：/ / jestjs。IO /文档/ EN /手动嘲笑）。在node_modules同级创建一个<strong>MOCK</strong>目录，并在那里实现模拟模块。</p>
<p>通过使用手动模拟，您可以在所有测试中共享模拟实现。JEST将自动使用<strong>MOCK</strong>模拟实现。在Jest网站和互联网上有很多关于如何做到这一点的例子。使用手动模拟重构这个测试作为练习留给读者。</p>
<h3>结论</h3>
<p>本文指南:</p>
<ul>
<li><p>使用 Jest ES6 class 模拟</p>
</li>
<li><p>测试action成功个和失败的情况</p>
</li>
</ul>
<p>在<a href="https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/actions.spec.js">这里</a>可以找到本页描述的测试的源代码</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/testing-vuex-actions-correctly-with-jest](https://www.zcfy.cc/article/testing-vuex-actions-correctly-with-jest)
原文标题: 使用Jest测试Vuex Action
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
