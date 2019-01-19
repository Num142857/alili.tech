---
title: 'Tutorial: GraphQL 订阅服务器消息' 
date: 2019-01-20 2:30:11
hidden: true
slug: adx3hvnq4us
categories: [reprint]
---

{{< raw >}}

            <h2>Full-stack GraphQL + React Tutorial — Part 6</h2>
<p>这是全栈Graph+React手册里面的第六部分，该系列将指导你创建一个消息应用。并且每一部分都是独立的，并且聚焦于一些新的话题，所以你可以跳跃到吸引你的某一部分开始阅读，或者你也可以从头到尾阅读，下面是该手册的其他部分：</p>
<ul>
<li><a href="https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b">Part 1: 创建一个简单的客户端</a></li>
<li><a href="https://dev-blog.apollodata.com/react-graphql-tutorial-part-2-server-99d0528c7928">Part 2: 创建一个简单的服务器</a></li>
<li><a href="https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15">Part 3: 编写Mutation并保持客户端同步</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-mutations-optimistic-ui-and-store-updates-f7b6b66bf0e2">Part 4: 良好的用户界面和客户端存储更新</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-input-types-and-client-caching-f11fa0421cfd">Part 5: 输入类型和自定义解析器</a></li>
<li>Part 6: 服务器端订阅 (当前)</li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-client-side-40e185e4be76">Part 7: 客户端上的GraphQL订阅</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-pagination-d1c3b3ee2823">Part 8: 分页</a></li>
</ul>
<hr>
<p>在本教程中，我们将介绍如何将GraphQL订阅添加到我们的服务器的过程。 在第5部分中，我们添加了消息的概念，并在客户端实现了channel Detail的视图，以在每个channel中显示消息。 但现在，消息不会跨客户端同步，因为服务器无法通知客户端已添加新消息。</p>
<p>与许多其他应用程序一样，我们的消息应用程序需要对某些功能进行实时更新，因此在本教程中，我们将构建服务器端逻辑，以使我们的客户端能够实时显示新消息，这归功于GraphQL订阅。 如果您想深入了解订阅如何工作，请查看[本博客文章]（<a href="https://dev-blog.apollodata.com/graphql-subscriptions-in-apollo-client-9a2457f015fb），介绍Apollo客户支持">https://dev-blog.apollodata.com/graphql-subscriptions-in-apollo-client-9a2457f015fb），介绍Apollo客户支持</a> 订阅和<a href="https://github.com/facebook/graphql/blob/master/rfcs/Subscriptions.md">请求评论</a> 来添加对GraphQL规范的订阅。</p>
<hr>
<p>我们先开始克隆git仓库并且安装依赖包</p>
<pre><code class="hljs crmsh">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/apollographql/graphql-tutorial.gitcd graphql-tutorialgit checkout t6-startcd server &amp;&amp; npm installcd ../client &amp;&amp; npm install
</code></pre><p>首先我们得确认客户端和服务端都正常运行</p>
<p>在一个命令行终端我们开启一个运行在4000端口的服务端服务</p>
<pre><code class="hljs dos"><span class="hljs-built_in">cd</span> servernpm <span class="hljs-built_in">start</span>
</code></pre><p>在另一个终端我们开启一个运行在3000端口的客户端</p>
<pre><code class="hljs dos"><span class="hljs-built_in">cd</span> clientnpm <span class="hljs-built_in">start</span>
</code></pre><p>当你在你的浏览器地址栏输入<a href="http://localhost:3000">http://localhost:3000</a>，其中有一个用户创建的channel列表。 点击其中一个频道，您将看到我们在最后一部分创建的detail视图，您可以在该频道中添加新消息。</p>
<p><img src="https://p0.ssl.qhimg.com/t019758a4f4a761f61f.gif" alt=""></p>
<p>我们不会在本教程中编写任何客户端代码，但我们将使用客户端UI来插入消息以测试我们的订阅实现。</p>
<h4>GraphQL 订阅</h4>
<p>要将消息添加到channel时通知客户端，我们将使用GraphQL订阅，这使得客户端可以进行查询，并在特定的服务器端事件的情况下通知新的结果。 在我们的服务器实现中，我们将使用带有WebSockets的Express服务器将更新推送到客户端。</p>
<p>在本教程中，我们将首先添加一个订阅，通知客户端有新消息。 接下来，我们将向我们的GraphQL模式添加一个字段并为订阅实现一个解析器。 最后，我们将使用内存中的pub-sub对象来处理传递有关添加消息的通知。 总之，消息创建和订阅通知的流程如下所示：</p>
<p><img src="https://p0.ssl.qhimg.com/t0125463a2210df4ca8.png" alt=""></p>
<p>现在让我们通过添加一个订阅来监听消息添加到我们的服务器端模式！ 在server / src / schema.js中的GraphQL模式的最后，我们添加了一个新的根类型的Subscription，它与Query和Mutation处于同一级别。 该根类型包含messageAdded（channelId：ID！），该字段表示客户端可以侦听的主题，以通知添加到特定channel的消息。 总之，我们补充道：</p>
<pre><code class="hljs elm">// server/src/schema.js<span class="hljs-keyword">type</span> <span class="hljs-type">Subscription</span> {  messageAdded(channelId: <span class="hljs-type">ID</span>!): <span class="hljs-type">Message</span>}
</code></pre><p>随着我们继续实现订阅，我们的模式现在为我们提供了坚实的参考。</p>
<h4>添加订阅解析器</h4>
<p>现在我们有一个模式来定义客户端可以请求哪些订阅，下一步是允许事件发送到订阅。 为了简单起见，我们将使用graphql-subscriptions包中的内存PubSub系统实现我们的订阅模型。 我们还需要使用来自同一个包的withFilter帮助程序来分解他们用于哪个channel的事件。 在server / src / resolvers.js中，我们有必要开始添加一些导入语句</p>
<pre><code class="hljs awk"><span class="hljs-regexp">//</span> server<span class="hljs-regexp">/src/</span>resolvers.jsimport { PubSub, withFilter } from ‘graphql-subscriptions’;
</code></pre><p>接下来，我们将构建一个PubSub实例来处理我们应用程序的订阅主题。 在我们定义解析器之前，我们将添加此实例，在创建消息时我们需要使用该实例生成事件。</p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">const</span> pubsub = <span class="hljs-keyword">new</span> PubSub();
</code></pre><pre><code class="hljs cpp"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> resolvers = {
</code></pre><p>一旦我们设置了订阅管理器，我们需要用它发布消息！ 使用PubSub类，这与调用pubsub.publish（topic，data）一样简单。 对于我们的应用程序，我们将每条新消息发布到messageAdded主题以及一个携带channel ID的附加属性（本教程稍后将更加重要）。 有一点需要注意：主题名称不必与订阅名称匹配; 我们在这里使用了相同的名称来保持简单。</p>
<pre><code class="hljs javascript">addMessage: <span class="hljs-function">(<span class="hljs-params">root, { message }</span>) =&gt;</span> {  <span class="hljs-keyword">const</span> channel = channels.find(<span class="hljs-function"><span class="hljs-params">channel</span> =&gt;</span> channel.id ===message.channelId);
<span class="hljs-keyword">if</span>(!channel)    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(“Channel does not exist”);
</code></pre><pre><code class="hljs arduino">  <span class="hljs-keyword">const</span> newMessage = { id: <span class="hljs-keyword">String</span>(nextMessageId++), <span class="hljs-built_in">text</span>: message.<span class="hljs-built_in">text</span> };
channel.messages.push(newMessage);
</code></pre><pre><code class="hljs css">  <span class="hljs-selector-tag">pubsub</span><span class="hljs-selector-class">.publish</span>(‘<span class="hljs-selector-tag">messageAdded</span>’, { <span class="hljs-attribute">messageAdded</span>: newMessage, channelId: message.channelId });
</code></pre><pre><code class="hljs haxe">  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Message</span>;}
</code></pre><p>接下来，让我们使用发布的事件来解析订阅查询！ 通过graphql-subscriptions包，这非常容易。 我们在解析器中设置嵌套对象，就像我们通常会那样，而不是在最后返回一个对象，我们返回一个异步迭代器，它将发送消息发送到客户端。 由于messageAdded主题包含<em>all</em> channels的事件，因此我们还使用前面导入的withFilter函数来节省资源。 这将过滤事件以仅选择查询中指定的通道的事件。 当使用withFilter时，第一个参数是一个返回我们正在过滤的异步迭代器的函数。 第二个参数是一个条件，指定事件是否应通过给定事件数据和查询变量的过滤器。</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">Subscription</span>: {  <span class="hljs-attribute">messageAdded</span>: {    subscribe: <span class="hljs-built_in">withFilter</span>(      () =&gt; pubsub.<span class="hljs-built_in">asyncIterator</span>(‘messageAdded’),      (payload, variables) =&gt; {        return payload.channelId === variables.channelId;
}    )  "}}"
</code></pre><p>这就是解决GraphQL订阅查询所需的全部内容！</p>
<h4>用于订阅的WebSocket传输</h4>
<p>本教程的最后一步是通过WebSockets为我们的GraphQL服务器添加订阅支持，因为我们无法通过HTTP将频繁的更新从服务器推送到客户端。 感谢subscriptions-transport-ws包，这非常简单！ 首先，让我们开始在server / server.js中添加必要的导入语句</p>
<pre><code class="hljs puppet"><span class="hljs-keyword">import</span> { execute, <span class="hljs-literal">subscribe</span> } <span class="hljs-keyword">from</span> ‘graphql’;<span class="hljs-keyword">import</span> { createServer } <span class="hljs-keyword">from</span> ‘http’;<span class="hljs-keyword">import</span> { SubscriptionServer } <span class="hljs-keyword">from</span> ‘subscriptions-transport-ws’;
</code></pre><p>接下来，我们可以在我们的GraphQL服务器中打开WebSocket。 我们分两步执行此操作：首先用createServer包装Express服务器，然后使用包装的服务器设置WebSocket来侦听GraphQL订阅。</p>
<pre><code class="hljs 1c"><span class="hljs-comment">// Wrap the Express serverconst ws = createServer(server);</span>
</code></pre><pre><code class="hljs coffeescript">ws.listen(PORT, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {  <span class="hljs-built_in">console</span>.log(GraphQL Server <span class="hljs-keyword">is</span> now running <span class="hljs-literal">on</span> http:<span class="hljs-regexp">//</span>localhost:${PORT});
</code></pre><pre><code class="hljs lua">  // Set up the WebSocket <span class="hljs-keyword">for</span> handling GraphQL subscriptions  new SubscriptionServer({    <span class="hljs-built_in">execute</span>,    subscribe,    schema  }, {    server: ws,    <span class="hljs-built_in">path</span>: <span class="hljs-string">'/subscriptions'</span>,  });});
</code></pre><p>接下来，我们将Graph_i_QL配置为使用我们刚刚设置的订阅WebSocket。</p>
<pre><code class="hljs groovy">server.use(<span class="hljs-string">'/graphiql'</span>, graphiqlExpress({  <span class="hljs-string">endpointURL:</span> <span class="hljs-string">'/graphql'</span>,  <span class="hljs-string">subscriptionsEndpoint:</span> <span class="hljs-string">ws:</span><span class="hljs-comment">//localhost:4000/subscriptions}));</span>
</code></pre><p>与此同时，我们的服务器已准备就绪！ 要试用它，我们可以在<a href="http://localhost:4000/graphiql">http://localhost:4000/graphiql</a> 上打开GraphiQL并运行以下查询</p>
<pre><code class="hljs applescript">subscription {  messageAdded(channelId: <span class="hljs-number">1</span>) {    <span class="hljs-built_in">id</span>    <span class="hljs-built_in">text</span>  "}}"
</code></pre><p>当您运行查询时，您应该看到类似下面的这样一条消息</p>
<pre><code class="hljs smalltalk"><span class="hljs-comment">"Your subscription data will appear here after server publication!"</span>
</code></pre><p>Graph_i_QL现在正在监听新消息的创建，我们可以通过在客户端创建消息来触发该消息。 因为我们只在收听channel1，所以请务必导航到客户端的第一个channel（或直接将浏览器指向<a href="http://localhost:3000/channel/1">http://localhost:3000/channel/1</a>).当你创建一条新消息时，你应该看到它立即显示在你的Graph_i_QL窗口中！</p>
<p><img src="https://p0.ssl.qhimg.com/t011a43227d4cdb94e9.gif" alt=""></p>
<h4>总结</h4>
<p>万岁！ 您现在已经实现了GraphQL订阅的服务器端部分，方法是向模式添加订阅类型并通过WebSockets实现订阅传输！ 通过对客户端进行一些更改（将在[下一个教程]（<a href="https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-client-side-40e185e4be76）">https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-client-side-40e185e4be76）</a>
中进行解释）我们的客户端将能够几乎实时查看消息添加。</p>
<blockquote>
<p>如果您喜欢本教程并希望继续学习Apollo和GraphQL，请务必点击下面的“关注”按钮，然后在Twitter上关注我们<a href="https://twitter.com/apollographql">@apollographql</a> 和作者 <a href="http://twitter.com/shadajl">@ShadajL</a>.</p>
</blockquote>
<p>感谢我的导师, <a href="https://medium.com/@helfer">Jonas Helfer</a>, 感谢他在我写这篇文章时的所做的支持!</p>
<p><img src="https://p0.ssl.qhimg.com/t014fc6606574d991f5.jpg" alt=""></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Tutorial: GraphQL 订阅服务器消息

## 原文链接
[https://www.zcfy.cc/article/tutorial-graphql-subscriptions-server-side](https://www.zcfy.cc/article/tutorial-graphql-subscriptions-server-side)

