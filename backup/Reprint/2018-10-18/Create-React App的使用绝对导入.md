---
title: Create-React App的使用绝对导入
hidden: true
categories: [reprint]
slug: 8a1e87e3
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p><img src="https://p0.ssl.qhimg.com/t01837865899c4318c4.png" alt=""></p>
<p>默认情况下，create-react-app中的ES6模块使用相对路径，这适用于您要导入的文件在文件树中相对比较近的情况：</p>
<pre><code class="hljs capnproto"><span class="hljs-keyword">import</span> { createGoal } <span class="hljs-keyword">from</span> ‘./actions’
</code></pre><pre><code class="hljs actionscript"><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> { selectAuth } from ‘./selectors’;</span>
</code></pre><pre><code class="hljs clean"><span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> ‘../App’;
</code></pre><p>但是当你开始处理深度嵌套的树结构时，你就会发现使用相对路径是真的让人痛苦不堪，因为你最终会出现点状综合征：</p>
<pre><code class="hljs clean"><span class="hljs-keyword">import</span> { editUser } <span class="hljs-keyword">from</span> ‘../../../AppContainer/actions’;
</code></pre><pre><code class="hljs clean"><span class="hljs-keyword">import</span> { selectAuth } <span class="hljs-keyword">from</span> ‘../../../AppContainer/selectors;
</code></pre><p>当你决定移动该文件时会发生什么？ 或者，也许你想在另一个文件中导入相同的模块？</p>
<p>计算第一次遍历需要多少个点的时间非常繁琐，但现在您必须重新计算每一次，因为当您更改文件的位置时，还会相对于其他文件更改其相对路径。</p>
<p>如果有一种方法每次都以相同的方式导入文件，无论文件与另一文件相关的位置如何？ 这个时候绝对引入就派上用场了：</p>
<pre><code class="hljs gradle"><span class="hljs-keyword">import</span> { editUser } <span class="hljs-keyword">from</span> ‘containers<span class="hljs-regexp">/AppContainer/</span>actions’;
</code></pre><pre><code class="hljs gradle"><span class="hljs-keyword">import</span> { selectAuth } <span class="hljs-keyword">from</span> ‘containers<span class="hljs-regexp">/AppContainer/</span>selectors;
</code></pre><p>无论你从哪里导入这些文件，路径都是一样的。 不用计算要用多少个点。</p>
<p><strong>在Create-React-App中实现绝对导入</strong></p>
<p>在深入了解一堆github issue之后，我终于完成了在create-react-app应用程序中实现绝对导入所需的步骤，最终完成了两个步骤：</p>
<ol>
<li>在根级目录创建'.<strong> env </strong>'文件（与package.json的级别相同）</li>
<li>设置一个环境变量， ‘<strong>NODE_PATH</strong>’ to ‘<strong>src</strong>/’</li>
</ol>
<p>就是这样</p>
<p>据我所知，create-react-app的配置方式是它的webpack配置会自动选取'.env'文件并读取'NODE_PATH'环境变量，然后可用于绝对导入.</p>
<p>自定义环境变量在开发和生产过程中都可以使用，因为变量是在构建时嵌入的，而不是运行时嵌入的，所以你的应用程序可以通过'process.env'访问它的环境：</p>
<p><a href="https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables">https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables</a></p>
<p>The discussions:</p>
<p><a href="https://github.com/facebookincubator/create-react-app/issues/253">https://github.com/facebookincubator/create-react-app/issues/253</a></p>
<p><a href="https://github.com/facebookincubator/create-react-app/issues/102">https://github.com/facebookincubator/create-react-app/issues/102</a></p>
<p>The pull requests:</p>
<p><a href="https://github.com/storybooks/storybook/pull/528/files">https://github.com/storybooks/storybook/pull/528/files</a></p>
<p><a href="https://github.com/facebookincubator/create-react-app/pull/342/files">https://github.com/facebookincubator/create-react-app/pull/342/files</a></p>
<p>以下是从相对导入转换为绝对导入的快速示例。 首先我们创建我们的文件和文件夹。</p>
<p><img src="https://p0.ssl.qhimg.com/t01d63ed268bfaa299c.png" alt=""></p>
<p>我们的AppContainer用来加载AppRoutes。</p>
<p>注意它是如何使用相对导入的。 我们需要绝对路径引入。</p>
<ol>
<li>在根级目录创建'.<strong> env </strong>'文件（与package.json的级别相同）</li>
<li>设置一个环境变量， ‘<strong>NODE_PATH</strong>’ to ‘<strong>src</strong>/’</li>
</ol>
<p><img src="https://p0.ssl.qhimg.com/t01ea4f581bd313267d.png" alt=""></p>
<p>现在我们可以使用绝对导入。</p>
<p>它工作得很好。</p>
<p><img src="https://p0.ssl.qhimg.com/t01ebd1e70323eabfaa.png" alt=""></p>
<p><strong>结论</strong></p>
<p>绝对导入可以为您节省大量时间，不再那么头痛，因为您无需在导入或更改文件位置时随时考虑您需要的点数。 感谢create-react-app，设置一个允许你做到这一点的环境非常简单.</p>
<p><em>我是一位开发人员，他记录了我遇到的新工具和概念，并发现足够有趣以供分享。 请点击该按钮和/或留下评论，以便我可以写出更适合您兴趣的内容.</em></p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/absolute-imports-with-create-react-app](https://www.zcfy.cc/article/absolute-imports-with-create-react-app)
原文标题: Create-React App的使用绝对导入
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
