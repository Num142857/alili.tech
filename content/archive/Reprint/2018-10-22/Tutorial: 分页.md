---
title: 'Tutorial: 分页'
hidden: true
categories: [reprint]
slug: 66bfda4
date: 2018-10-22 00:00:00
---

{{< raw >}}

            <hr>
<p>这是我们的完整的React + GraphQL教程系列的第8部分。 每个部分都是独立的，并且引入了一个新的关键概念，因此您可以单独执行每个部分，也可以按照整个系列学习 - 当然这取决于您！</p>
<p>以下是我们迄今为止所涉及的部分：</p>
<ul>
<li><a href="https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b">Part 1: 前端</a></li>
<li><a href="https://dev-blog.apollodata.com/react-graphql-tutorial-part-2-server-99d0528c7928">Part 2: 服务端</a></li>
<li><a href="https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15">Part 3: 基础的 GraphQL Mutations</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-mutations-optimistic-ui-and-store-updates-f7b6b66bf0e2">Part 4: 友好的用户界面和客户端存储更新</a></li>
<li><a href="https://medium.com/p/tutorial-graphql-input-types-and-client-caching-f11fa0421cfd">Part 5:输入类型和自定义解析器</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-server-side-e51c32dc2951">Part 6: 订阅服务器</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-client-side-40e185e4be76">Part 7: 客户端上的GraphQL订阅</a></li>
</ul>
<p>在第6部分和第7部分中，我们介绍了如何向服务器添加订阅以及在客户端中热修改服务器。 在本部分中，我们将添加分页，以便您的服务器可以以更小的块发送数据，而不是一次发送所有内容。 到最后，你会知道以下部分：</p>
<ul>
<li>使用游标和限制来控制从服务器返回的数据量</li>
<li>使用Apollo客户端获取更多功能</li>
<li>响应按钮点击实现基于光标的分页</li>
</ul>
<p>首先，让我们克隆git仓库并安装依赖关系。 即使您完成了教程的前几部分，我们也建议您重新克隆存储库，因为我们已经对上一步中的应用程序的文件结构进行了一些有用的更改。</p>
<pre><code class="hljs jboss-cli">git clone https:<span class="hljs-string">//github.com/apollographql/graphql-tutorial.gitcd</span> graphql-tutorialgit checkout t8-startcd server &amp;&amp; npm install &amp;&amp; <span class="hljs-keyword">cd</span> <span class="hljs-string">../client</span> &amp;&amp; npm install &amp;&amp; <span class="hljs-keyword">cd</span> <span class="hljs-string">..</span>
</code></pre><p>为了确保它的工作，让我们启动服务器和客户端，每个都在一个单独的终端中：</p>
<pre><code class="hljs dos"><span class="hljs-built_in">cd</span> servernpm <span class="hljs-built_in">start</span>
</code></pre><p>在另一个终端中输入：</p>
<pre><code class="hljs dos"><span class="hljs-built_in">cd</span> clientnpm <span class="hljs-built_in">start</span>
</code></pre><p>当您将浏览器导航到<a href="http://localhost:3000">http://localhost:3000</a> 时，您应该会看到我们的消息应用程序的主页。 当你点击“faker”频道时，你会看到一长串随机生成的消息。 （我们需要为这一步生成一个长列表，以演示如何避免一次加载它。）</p>
<p><img src="https://p0.ssl.qhimg.com/t01dff36efab2c10c8f.gif" alt=""></p>
<p>与其预先加载所有这些消息，我们可以实现分页并且一次只加载一页的价值数据。</p>
<h3>更新架构</h3>
<p>我们首先对服务器的模式进行一些更改，以公开一个API来加载更小的项目块。</p>
<pre><code class="hljs awk"><span class="hljs-regexp">//</span>server<span class="hljs-regexp">/src/</span>schema.js
</code></pre><pre><code class="hljs routeros">const typeDefs =<span class="hljs-built_in"> type </span>Channel {  id: ID!                # <span class="hljs-string">"!"</span> denotes a required field  name: String  messages: [Message]  # messages will be returned <span class="hljs-keyword">in</span> a MessageFeed object wrapper  messageFeed(cursor: String): MessageFeed  }
</code></pre><pre><code class="hljs css"><span class="hljs-selector-tag">input</span> <span class="hljs-selector-tag">MessageInput</span>{  <span class="hljs-attribute">channelId</span>: ID!  text: String}
</code></pre><pre><code class="hljs clean"># ...
</code></pre><pre><code class="hljs elm"><span class="hljs-keyword">type</span> <span class="hljs-type">Message</span> {  id: <span class="hljs-type">ID</span>!  text: <span class="hljs-type">String</span>  createdAt: <span class="hljs-type">Int</span>}
</code></pre><pre><code class="hljs vim"><span class="hljs-built_in">type</span> MessageFeed {  # <span class="hljs-built_in">cursor</span> specifies the place in the <span class="hljs-keyword">list</span> where we <span class="hljs-keyword">left</span> off  <span class="hljs-built_in">cursor</span>: String!    # this <span class="hljs-keyword">is</span> <span class="hljs-keyword">a</span> chunk of <span class="hljs-keyword">messages</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">be</span> returned  message<span class="hljs-variable">s:</span> [Message]!}
</code></pre><p>除了返回正确的消息块之外，messageFeed类型还返回一个游标，该游标告诉客户端我们在列表中的位置。 然后，当我们想要加载更多的消息时，我们可以将这个值传递回服务器，告诉它接下来给我们的消息。</p>
<hr>
<p><strong><em>分页中的游标是什么?</em></strong></p>
<p><em>游标是指向我们在数据中遗漏的位置的指针。 更具体地说，游标是可以保存客户端可以传递给服务器的任何值的变量，以帮助它找到应该开始返回数据的点。 不管你使用什么样的价值，事实上，从客户的角度来看，它应该是不透明的。</em></p>
<p><em>在这个例子中，我们将使用时间戳作为游标。 这比指向数组中的实际消息ID或消息索引要好得多。 如果我们使用ID或索引，则删除和插入的消息可能会导致问题：我们可能无法找到该特定ID，或者索引现在可能指向不同的消息。 在我们的网站阅读更多</em> <a href="https://dev-blog.apollodata.com/understanding-pagination-rest-graphql-and-relay-b10f835549e7"><em>previous article about understanding pagination</em></a>_._</p>
<hr>
<p>接下来，让我们为服务器上的解析器文件中的messageFeed添加一个新的解析器。 让我们在查询解析器下添加加粗的代码：</p>
<pre><code class="hljs coffeescript">  Query: {    channels: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {      <span class="hljs-keyword">return</span> channels;
},
</code></pre><pre><code class="hljs coffeescript">    channel: <span class="hljs-function"><span class="hljs-params">(root, { id })</span> =&gt;</span> {      <span class="hljs-keyword">return</span> getChannel(id);
},  },
</code></pre><pre><code class="hljs arduino">  <span class="hljs-comment">// The new resolvers are under the Channel type  Channel: {    messageFeed: (channel, { cursor }) =&gt; {      // The cursor passed in by the client will be an      // integer timestamp. If no cursor is passed in,      // set the cursor equal to the time at which the      // last message in the channel was created.      if (!cursor) {        cursor =          channel.messages[channel.messages.length - 1].createdAt;</span>
}            <span class="hljs-built_in">cursor</span> = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">cursor</span>);
</code></pre><pre><code class="hljs nimrod">      // limit <span class="hljs-keyword">is</span> the number <span class="hljs-keyword">of</span> messages we will <span class="hljs-keyword">return</span>.      // <span class="hljs-type">We</span> could pass it <span class="hljs-keyword">in</span> <span class="hljs-keyword">as</span> an argument but <span class="hljs-keyword">in</span> this      // <span class="hljs-keyword">case</span> <span class="hljs-keyword">let</span>'s use a <span class="hljs-keyword">static</span> value.      <span class="hljs-keyword">const</span> limit = <span class="hljs-number">10</span>;
<span class="hljs-keyword">const</span> newestMessageIndex = channel.messages.findIndex(        message =&gt; message.createdAt === cursor      );
// find index <span class="hljs-keyword">of</span> message created at time held <span class="hljs-keyword">in</span> cursor
</code></pre><pre><code class="hljs haxe">      <span class="hljs-comment">// We need to return a new cursor to the client so that it      // can find the next page. Let's set newCursor to the      // createdAt time of the last message in this messageFeed:      const newCursor =        channel.messages[newestMessageIndex - limit].createdAt;</span>
const messageFeed = {        messages: <span class="hljs-type">channel</span>.messages.slice(          <span class="hljs-keyword">new</span><span class="hljs-type">estMessageIndex</span> - limit,          <span class="hljs-keyword">new</span><span class="hljs-type">estMessageIndex</span>        ),        cursor: <span class="hljs-type">newCursor</span>,      };
<span class="hljs-keyword">return</span> messageFeed;
},  },
</code></pre><p>请注意，如果没有将光标传递给查询，我们将光标设置为等于创建最近消息的时间，并且服务器将返回最近的消息。 这样，客户端可以轻松查询最初的页面加载时的最新消息。 我们还使用10的限制来指定要获取的消息数量，并相应地更新由messageFeed返回的游标，以便客户端稍后可以获取下一页的项目。</p>
<h4>Test it out</h4>
<p>此时，您应该能够测试您的服务器以确保上述所有代码都正确运行。 在浏览器中导航到 <a href="http://localhost:4000/graphiql">http://localhost:4000/graphiql</a> ，然后运行以下查询：</p>
<p><img src="https://p0.ssl.qhimg.com/t012d42c097310e0f5b.png" alt=""></p>
<p>您会看到我们现在可以通过messageFeed包装器检索邮件，该邮件还向我们提供了有关下一页的光标的信息，而且我们一次只能获得10个项目，而不是整个列表。 如果我们通过光标，我们得到了一个参数，我们得到了10个消息的新列表，它们代表我们离开的地方：</p>
<p><img src="https://p0.ssl.qhimg.com/t01e14e88233fc698ae.png" alt=""></p>
<p>现在，让我们使用我们新发现的功能，通过加载正在显示的消息来提高客户端的效率。</p>
<h3>更新客户端</h3>
<p>在src / components / ChannelDetails.js（在客户端代码中），将频道详细信息查询替换为以下查询，其中包括新的messageFeed字段和一些关于分页的信息：</p>
<pre><code class="hljs arduino"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> channelDetailsQuery = gql  query ChannelDetailsQuery($channelId: ID!, $<span class="hljs-built_in">cursor</span>: <span class="hljs-keyword">String</span>) {    channel(id: $channelId) {      id      name      messageFeed(<span class="hljs-built_in">cursor</span>: $<span class="hljs-built_in">cursor</span>) @connection(key: <span class="hljs-string">"messageFeed"</span>) {        <span class="hljs-built_in">cursor</span>        messages {          id          <span class="hljs-built_in">text</span>        }      }    }  };
</code></pre><p>由于我们将在UI中显示的消息现在嵌套在messageFeed下，我们还需要更新我们的ChannelDetails组件。 对粗体渲染函数进行粗体更改以访问messageFeed属性：</p>
<pre><code class="hljs applescript"><span class="hljs-built_in">    return</span> (                        {channel.<span class="hljs-built_in">name</span>}                          );
</code></pre><p>更新后的查询现在一次只能返回10条消息，而不是返回通道中的所有消息。</p>
<h4>更新我们的变异和订阅代码</h4>
<p>我们现在加载嵌套在messageFeed字段下的消息，所以这些消息将存储在Apollo客户端缓存中。 您可以通过打开Chrome开发工具并检查商店选项卡来确认：</p>
<p><img src="https://p0.ssl.qhimg.com/t01394223ea308ad2f7.png" alt=""></p>
<p>因此，我们需要更新我们的订阅和突变代码，该代码更新该列表以注意该嵌套，基本上用channel.messageFeed.messages替换channel.messages。</p>
<p><strong>In src/components/AddMessage.js:</strong></p>
<pre><code class="hljs armasm">// don’t double <span class="hljs-keyword">add </span>the messageif (!<span class="hljs-meta">data</span>.channel.messageFeed.messages.find((msg) =&gt;    msg.id === <span class="hljs-keyword">addMessage.id)) </span>{  // <span class="hljs-keyword">Add </span>our Message from the mutation to the <span class="hljs-meta">end</span>.  <span class="hljs-meta">data</span>.channel.messageFeed.messages.<span class="hljs-keyword">push(addMessage);}
</span></code></pre><p><strong>Similarly, in src/components/ChannelDetails.js:</strong></p>
<pre><code class="hljs coffeescript"><span class="hljs-regexp">//</span> don’t double add the messageif (!prev.channel.messageFeed.messages.find(<span class="hljs-function"><span class="hljs-params">(msg)</span> =&gt;</span>    msg.id === newMessage.id)) {
</code></pre><pre><code class="hljs xquery">  <span class="hljs-keyword">return</span> Object.assign({}, prev, {    channel: Object.assign({}, prev.channel, {      messageFeed: {        messages: […prev.channel.messageFeed.messages, newMessage],      }    })  });} <span class="hljs-keyword">else</span> {  return prev;}
</code></pre><p>现在，进入用户界面，在相同频道中打开两个制表符，然后测试添加消息。 它应该通过突变支持和订阅在屏幕和其他屏幕上正确显示。</p>
<p>如果你被困在这一步，请检查[第8步开始和结束之间的差异]（<a href="https://github.com/apollographql/graphql-tutorial/compare/t8-start...t8-end）">https://github.com/apollographql/graphql-tutorial/compare/t8-start...t8-end）</a> 到 查看所有必要的更改。</p>
<hr>
<p><strong><em>连接指令</em></strong></p>
<p>_我们还在查询中将_connection _directive添加到 _messageFeed _field。 这是一个专门的客户端指令，用于控制该字段下的数据如何缓存在Apollo客户端存储中。 由于处理分页的字段通常会有一些额外的参数，如_cursor _或<em>limit</em>，我们要确保我们有一个干净的缓存键，不包含这些参数._</p>
<p>_I在这种情况下，我们指定从该字段返回的数据应该存储在key_messageFeed_下，这使得从添加新消息的突变中添加到该列表更容易。 如果我们没有在该字段上使用_connection_directive，那么我们的mutation _update_function将需要重现最初传递给该字段的参数的确切集合._</p>
<hr>
<p>现在我们准备添加fetchMore函数，这是我们在Apollo客户端添加分页的主要方式。 我们将定义一个名为loadOlderMessages的函数，可以通过传递给我们ChannelDetails组件的道具来访问它。 该函数将使用Apollo Client附加到数据通道的fetchMore方法。</p>
<p>让我们将粗体代码添加到选项字段旁的channelDetailsQuery容器中：</p>
<pre><code class="hljs routeros"><span class="hljs-builtin-name">export</span><span class="hljs-built_in"> default </span>(graphql(channelDetailsQuery, {  options: (props) =&gt; ({    variables: {       channelId: props.match.params.channelId,    },  }),
</code></pre><pre><code class="hljs kotlin">  props: (props) =&gt; {    <span class="hljs-keyword">return</span> {      <span class="hljs-keyword">data</span>: props.<span class="hljs-keyword">data</span>,      loadOlderMessages: () =&gt; {        <span class="hljs-keyword">return</span> props.<span class="hljs-keyword">data</span>.fetchMore({          variables: {            channelId: props.<span class="hljs-keyword">data</span>.channel.id,            cursor: props.<span class="hljs-keyword">data</span>.channel.messageFeed.cursor,          },
</code></pre><pre><code class="hljs actionscript">          updateQuery(previousResult, { fetchMoreResult }) {            <span class="hljs-keyword">const</span> prevMessageFeed =              previousResult.channel.messageFeed;
<span class="hljs-keyword">const</span> newMessageFeed =              fetchMoreResult.channel.messageFeed;
</code></pre><pre><code class="hljs vim">            const newChannelData = {...previousResult.channel,              messageFeed: {                message<span class="hljs-variable">s:</span> [                  ...newMessageFeed.<span class="hljs-keyword">messages</span>,                  ...prevMessageFeed.<span class="hljs-keyword">messages</span>                ],                <span class="hljs-built_in">cursor</span>: newMessageFeed.<span class="hljs-built_in">cursor</span>              }            }
</code></pre><pre><code class="hljs ebnf"><span class="hljs-attribute">            const newData</span> =  {              ...previousResult,              channel: newChannelData            };
</code></pre><pre><code class="hljs abnf">            return newData<span class="hljs-comment">;</span>
}        })<span class="hljs-comment">;</span>
}    }<span class="hljs-comment">;</span>
}})(ChannelDetails))<span class="hljs-comment">;</span>
</code></pre><p>loadOlderMessages函数使用消息所属通道的id和第一个channelDetailsQuery返回的游标调用fetchMore。 fetchMore函数将默认使用原始查询（在本例中为channelDetailsQuery），所以我们只传入新变量。 请注意，我们实际上需要在loadOlderMessages函数中指定游标，因为我们不再需要最近的消息。 一旦从服务器返回新数据，我们使用Apollo Client的updateQuery函数将新数据与现有数据合并，这将导致您的UI组件的扩展列表重新呈现。 作为最后一步，让我们在ChannelDetails组件中添加一个'Load Old Messages'按钮。 用粗体代码更新渲染功能：</p>
<pre><code class="hljs applescript"><span class="hljs-built_in">return</span> (                        Load Older Messages                                {channel.<span class="hljs-built_in">name</span>}                            );
</code></pre><p>现在，如果您访问<a href="http://localhost:3000/channel/1">http://localhost:3000/channel/1</a>， 然后单击“Load Older Messages”按钮， 出现在屏幕的顶部，并且已经显示的消息将被压入列表中！ 并且，您已经实现了基于光标的分页。</p>
<h3>总结</h3>
<p>恭喜，您已经在本系列教程的第8部分结束了！ 您已经学会了如何使用游标，限制和fetchMore函数更新您的服务器和客户端，并在您的应用中实现基于光标的分页。 随着更多的变化像auth，我们将在后面的教程中介绍，您的应用程序将准备好实际使用！</p>
<p><em>Thanks to my mentor</em> <a href="https://medium.com/@stubailo"><em>Sashko Stubailo</em></a> <em>and fellow intern</em> <a href="https://medium.com/@klaire_tan"><em>Klaire Tan</em></a> <em>for helping me understand pagination and write this tutorial!</em></p>
<p><img src="https://p0.ssl.qhimg.com/t014fc6606574d991f5.jpg" alt=""></p>

          
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://www.zcfy.cc/article/tutorial-pagination](https://www.zcfy.cc/article/tutorial-pagination)

## 原文标题
Tutorial: 分页
