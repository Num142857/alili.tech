---
title: GraphQL如何取代Redux
hidden: true
categories: reprint
slug: 31cd5561
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>“你说什么？”“GraphQL是一个服务端查询语言，Redux是一个客户端状态管理库，他们如何替换对方？”真是一个好问题<em>坐稳了，接下来我就要回答这个问题了.</em></p>
<h4>⚛️切换到React</h4>
<p>首先，有点背景故事。 早在2016年，<a href="https://www.pathwright.com/">Pathwright</a> 的前端团队就开始将我们的客户端代码从Backbone＆Marionette堆栈切换到React。 UI的声明性模型比我们处理的MVC模式更有意义。</p>
<p>这仍然在很大程度上。是一股清新的空气</p>
<p>除了我们的应用程序的状态管理方面，一切都很美。 我们迅速转向Flux架构，起初感觉就像是一项重大改进。 循环数据流和单一事实来源的概念在哲学上是合理的，并且至少比大多数MVC库的以模型为中心的视图绑定方法更为安全。</p>
<p>然而，随着我们的状态管理需求变得越来越复杂，它开始感觉越来越多的间接层。 在状态树中有一些stores或分支后，最终会在客户端上复制服务器端业务数据和关系。</p>
<p>我们有这些精美的声明式React组件，其数据层成为action，reducers，异步中间件和去规范的业务数据/逻辑的非规范化嵌套。</p>
<p><em>这一切都感觉非常错误。</em></p>
<h4>↪️ 切换到GraphQL</h4>
<p>那是我们尝试GraphQL的时候。 我们首先在一个新的dashboard 上实现它，它结合了大量不同的数据源（这可能是我们的RESTfull API的噩梦）并很快坠入爱河。 这就像是第一次发现React。 热情非常高，我们最终在短短两周内就将新开发的GraphQL服务器投入生产！</p>
<p>不久之后，我们开始用GraphQL替换一堆REST API，它仍然令人惊叹。</p>
<p>其中一个副作用(sagas)是我们使用这些新的GraphQL端点的UI根本不再需要存储。 我们通常会像新store，action等一样开始，但最终会删除它们，因为根本没有任何东西可供他们去做。</p>
<h4>🤯 三个惊人的实现</h4>
<p>这导致了三个惊人的，但在后视中显而易见的实现：</p>
<ol>
<li>我们的大多数状态管理代码都关注将来自离散REST资源的数据合并和变换为适合我们UI的形状（reducers，selectors，actiond等）。.</li>
<li>很多我们最复杂的状态管理试图管理异步性质，以正确的顺序获取特定路由的所有数据（sagas，中间件，thunk等）.</li>
<li>实际上，其他一切，UI状态，与普通的旧React状态一起工作.</li>
</ol>
<p>“该死的，“我们说，”该死的，“同时将硬币砸入发誓罐子里。</p>
<p>然后我们删除了很多代码.  感觉很好。</p>
<h4>关于GraphQL和Redux…</h4>
<p>我的标题是一个小错误导致（让你点击？）。 我们真正替换的是我们的REST API，然后发现我们的大多数状态管理代码都<em>不再需要</em>。</p>
<p>当客户端可以从服务器控制所需状态的确切形状并将其全部返回到单个请求中时，根本不需要状态管理库。</p>
<p>为了说明这一点，让我们假装我们的UI通过我们正在使用的状态管理库与我们的后端服务进行对话。</p>
<p>这可能是这样的：</p>
<p><img src="https://p0.ssl.qhimg.com/t01f656d1ce77fc0b5a.png" alt=""></p>
<p>Redux和副作用管理库所做的大部分工作都是试图简化上面最左边的对话。</p>
<p>我认为对于<em>大多数</em>客户端应用程序，GraphQL可以完全取代对Redux的需求。</p>
<p>我不是说Redux不能达到目的。 这是一个很棒的库，它所引入的状态管理模式将会存在很长时间。</p>
<p>有时您无法控制后端堆栈，并且您不得不强制REST为客户端UI执行操作。 糟透了，Redux真的有助于这个环境。</p>
<p>在某些情况下，您需要管理需要可跟踪和一致控制的非常复杂的状态：较低级别的事情，如客户端缓存，离线同步等.Redux非常适合这些情况。 事实上，像Apollo这样的流行的GraphQL库可以将Redux作为缓存使用。</p>
<p>但是…</p>
<p><strong><em>如果你可以使用GraphQL而不是REST，你应该</em></strong>. 切换将消除客户端状态管理中的大量复杂性，并将客户端代码的范围缩小到数据应该如何在UI中呈现（这应该是一直以来）。</p>
<p>哦，你仍然可以使用Redux和GraphQL，你不会非常需要它。 另外，您可以删除一半感觉很棒的代码。</p>
<p>🤔 想了解更多关于美国职业足球大联盟有类似经历的信息吗？ 在这里的伟大帖子: <a href="https://dev-blog.apollodata.com/reducing-our-redux-code-with-react-apollo-5091b9de9c2a">https://dev-blog.apollodata.com/reducing-our-redux-code-with-react-apollo-5091b9de9c2a</a></p>
<p>👉有兴趣尝试GraphQL吗？ 这是一个开始的好地方： <a href="https://www.howtographql.com/">https://www.howtographql.com/</a></p>
<p>🤨思考？有问题吗？ 粗鲁的评论？ 在推特上@我： <a href="https://twitter.com/wmdmark">https://twitter.com/wmdmark</a></p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/how-graphql-replaces-redux](https://www.zcfy.cc/article/how-graphql-replaces-redux)
原文标题: GraphQL如何取代Redux
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
