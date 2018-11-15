---
title: 'Tutorial: GraphQL输入类型和自定义解析器'
hidden: true
categories: reprint
slug: 28e8dc11
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <hr>
<p>这是我们全栈GraphQL + React教程的第5部分，它指导您创建消息传递应用程序。 每个部分都是独立的，并且引入了新的关键概念，这意味着在执行此操作之前，您不必完成所有其他部分。 但万一你好奇，以下是我们到目前为止的内容：</p>
<ul>
<li><a href="https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b">Part 1: 创建一个简单的客户端</a></li>
<li><a href="https://dev-blog.apollodata.com/react-graphql-tutorial-part-2-server-99d0528c7928">Part 2: 创建一个简单的服务端</a></li>
<li><a href="https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15">Part 3: 编写mutation并保持客户端同步</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-mutations-optimistic-ui-and-store-updates-f7b6b66bf0e2">Part 4: 良好的用户界面和客户端存储更新</a></li>
<li>Part 5: 输入类型和自定义解析器(你在此!)</li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-server-side-e51c32dc2951">Part 6: 服务器端订阅</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-client-side-40e185e4be76">Part 7: 在客户端使用GraphQL订阅</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-pagination-d1c3b3ee2823">Part 8: 分页</a></li>
</ul>
<hr>
<p>在第4部分中，我们介绍了如何使用store更新和良好的用户界面来处理示例应用的channel列表视图中的网络延迟。</p>
<p>在这一部分中，我们将构建一个频道详情视图，显示channel中的所有消息并允许您发布新消息。 到最后，你会知道如何：</p>
<ul>
<li>在查询中使用字段参数</li>
<li>充分利用Apollo的标准缓存</li>
<li>使用GraphQL输入类型</li>
</ul>
<hr>
<p>在开始之前，我们先克隆git仓库并安装依赖关系：</p>
<pre><code class="hljs crmsh">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/apollographql/graphql-tutorial.gitcd graphql-tutorialgit checkout t5-startcd server &amp;&amp; npm installcd ../client &amp;&amp; npm install
</code></pre><p>为了确保它的工作，让我们启动服务器和客户端，每个都在一个单独的终端中：</p>
<pre><code class="hljs dos"><span class="hljs-built_in">cd</span> servernpm <span class="hljs-built_in">start</span>
</code></pre><p>在另一个终端：</p>
<pre><code class="hljs dos"><span class="hljs-built_in">cd</span> clientnpm <span class="hljs-built_in">start</span>
</code></pre><p>您现在可以导航到localhost:3000并浏览channel详情视图的当前状态。 我们已经为你做了一些工作，所以它应该看起来像这样：</p>
<p><img src="https://p0.ssl.qhimg.com/t01daf8fb03bfb48374.gif" alt=""></p>
<p>由于本教程主要关注GraphQL，因此我们已经为您制作了channel详细信息视图的路由和模板。 您不需要知道它如何在本教程中使用，但是如果您好奇，我们会使用react-router(查看<a href="https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf">react-router tutorial</a> 和 <a href="https://reacttraining.com/react-router/web/guides/quick-start">documentation</a>).</p>
<p>看起来我们已经完成了所有的工作，但新视图目前只是一个存根。 为了使其真正起作用，您需要编写一个GraphQL查询来获取来自服务器的channel名称和消息，并且您需要创建一个mutation来添加新消息。</p>
<h4>添加channel详细信息视图</h4>
<p>channel详情视图应显示channel名称，其信息和新的信息输入。 首先，我们修改架构并编写查询以显示当前channel中的消息。</p>
<p>在schema中（在服务器上），我们需要创建一个消息类型，将消息字段添加到channel类型，并提供一种通过向根查询类型添加channel字段来获取单个channel的方法。 在进行这些更改之后，在schema.js中输入Define应如下所示：</p>
<pre><code class="hljs awk"><span class="hljs-regexp">//</span>server<span class="hljs-regexp">/src/</span>schema.js
</code></pre><pre><code class="hljs routeros">const typeDefs =<span class="hljs-built_in"> type </span>Channel {  id: ID!  name: String  messages: [Message]!}
</code></pre><pre><code class="hljs elm"><span class="hljs-keyword">type</span> <span class="hljs-type">Message</span> {  id: <span class="hljs-type">ID</span>!  text: <span class="hljs-type">String</span>}
</code></pre><pre><code class="hljs css"># <span class="hljs-selector-tag">This</span> <span class="hljs-selector-tag">type</span> <span class="hljs-selector-tag">specifies</span> <span class="hljs-selector-tag">the</span> <span class="hljs-selector-tag">entry</span> <span class="hljs-selector-tag">points</span> <span class="hljs-selector-tag">into</span> <span class="hljs-selector-tag">our</span> <span class="hljs-selector-tag">APItype</span> <span class="hljs-selector-tag">Query</span> {  <span class="hljs-attribute">channels</span>: [Channel]  <span class="hljs-built_in">channel</span>(id: ID!): Channel}
</code></pre><pre><code class="hljs elm"># <span class="hljs-type">The</span> mutation root <span class="hljs-keyword">type</span>, used to define all mutationstype <span class="hljs-type">Mutation</span> {  addChannel(name: <span class="hljs-type">String</span>!): <span class="hljs-type">Channel</span>};
</code></pre><pre><code class="hljs xquery">const <span class="hljs-keyword">schema</span> = makeExecutableSchema({ typeDefs, resolvers });export { schema };
</code></pre><p>请注意，我们获取单个channel的方式是将id添加为字段参数。 这是GraphQL中非常常见的模式，您可能会在您的应用程序中使用它。 参数可以是任何标量或输入类型，我们将在本教程后面详细介绍。</p>
<p>接下来，新查询需要由解析器支持，该解析器返回适当的channel。 为此，将加粗的查询添加到resolvers.js中：</p>
<pre><code class="hljs awk"><span class="hljs-regexp">//</span>server<span class="hljs-regexp">/src/</span>resolvers.js
</code></pre><pre><code class="hljs ebnf"><span class="hljs-attribute">const channels</span> = [{  id: <span class="hljs-string">'1'</span>,  name: <span class="hljs-string">'baseball'</span>,  messages: [{    id: <span class="hljs-string">'2'</span>,    text: <span class="hljs-string">'baseball is life'</span>,  }]}];<span class="hljs-attribute">l</span><span class="hljs-attribute">e</span><span class="hljs-attribute">t</span> <span class="hljs-attribute">n</span><span class="hljs-attribute">e</span><span class="hljs-attribute">x</span><span class="hljs-attribute">t</span><span class="hljs-attribute">I</span><span class="hljs-attribute">d</span> = 3;
</code></pre><pre><code class="hljs javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> resolvers = {  <span class="hljs-attr">Query</span>: {    <span class="hljs-attr">channels</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { ... },    <span class="hljs-attr">channel</span>: <span class="hljs-function">(<span class="hljs-params">root, { id }</span>) =&gt;</span> {      <span class="hljs-keyword">return</span> channels.find(<span class="hljs-function"><span class="hljs-params">channel</span> =&gt;</span> channel.id === id);
},  },};
</code></pre><p><em>注意：我们为channel创建了一个预填充消息的数组。 如果你没有检查t5-start分支，你必须自己创建这个数组.</em></p>
<p>现在服务器支持查询特定channel，客户端 - 特别是ChannelDetails组件 - 需要执行查询。 GraphQL中的最佳做法是使用查询变量作为参数（在这种情况下，为$id）。 GraphQL规范要求我们在查询关键字后面定义我们使用的变量。 如果我们不这样做，服务器会抱怨我们使用了一个变量而没有定义它。 该定义必须与参数期望的类型相匹配。 在这种情况下，它是ID。</p>
<p>在channelDetails.js中写入以下查询：</p>
<pre><code class="hljs crystal">/<span class="hljs-regexp">/client/src</span><span class="hljs-regexp">/components/channel</span>Details.js
</code></pre><pre><code class="hljs applescript">export const channelDetailsQuery = gql  query ChannelDetailsQuery($channelId : ID!) {    channel(<span class="hljs-built_in">id</span>: $channelId) {      <span class="hljs-built_in">id</span>      <span class="hljs-built_in">name</span>      messages {        <span class="hljs-built_in">id</span>        <span class="hljs-built_in">text</span>      }    }  };
</code></pre><p>在ChannelDetails React组件中，将存根替换为呈现实际数据的代码。 首先检查查询是否正在加载（data.loading），然后检查以确保没有错误（data.error），并最终呈现channel名称和MessagesList。</p>
<p>如果你这样做了，你应该得到一个看起来像这样的组件：</p>
<pre><code class="hljs crystal">/<span class="hljs-regexp">/client/src</span><span class="hljs-regexp">/components/</span>ChannelDetails.js
</code></pre><pre><code class="hljs moonscript">const ChannelDetails = <span class="hljs-function"><span class="hljs-params">({ data: {loading, <span class="hljs-built_in">error</span>, channel }, match })</span> =&gt;</span> {  <span class="hljs-keyword">if</span> (loading) {    <span class="hljs-keyword">return</span> Loading...;
}  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">error</span>) {    <span class="hljs-keyword">return</span> {<span class="hljs-built_in">error</span>.message};
}  <span class="hljs-keyword">if</span>(channel === null){    <span class="hljs-keyword">return</span>   }
</code></pre><pre><code class="hljs applescript"><span class="hljs-built_in">  return</span> (              {channel.<span class="hljs-built_in">name</span>}                );}
</code></pre><pre><code class="hljs jboss-cli"><span class="hljs-string">//export</span> const channelDetailsQuery = gql.<span class="hljs-string">..</span>;
</code></pre><pre><code class="hljs jboss-cli"><span class="hljs-string">//</span> <span class="hljs-string">...</span>
</code></pre><p>现在，您只需使用之前编写的查询来打包组件，然后将其导出即可。</p>
<pre><code class="hljs 1c"><span class="hljs-comment">//client/src/components/ChannelDetails.js (at the bottom)</span>
</code></pre><pre><code class="hljs routeros"><span class="hljs-builtin-name">export</span><span class="hljs-built_in"> default </span>(graphql(channelDetailsQuery, {  options: (props) =&gt; ({    variables: { channelId: props.match.params.channelId },  }),})(ChannelDetails));
</code></pre><p>我们正在通往正常运行的可交流的应用程序，亲自尝试一下！ 它应该是这样的：</p>
<p><img src="https://p0.ssl.qhimg.com/t01f1af6ac30657ef7a.gif" alt=""></p>
<p>现在我们有一个channel名称和消息流，让我们添加消息mutation来发布新消息。</p>
<h4>发布新消息</h4>
<p>创建函数AddMessage与<a href="https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15">第三部分</a>添加频道非常相似, 所以首先建议使用带字段的mutation来显示消息文本和channel ID。 但是在将来，我们可能想要关联用户名，时间戳，文本编码，图片，提到的用户或其他元信息。 将这些添加到Mutation的签名中很快变得笨拙和不灵活。 为了保持整洁，我们将使用GraphQL<a href="http://graphql.org/graphql-js/mutations-and-input-types/">输入类型</a>, 这是一个只能包含基本标量类型，列表类型和其他输入类型的对象。 输入类型允许客户端mutation签名保持不变并在模式中提供更好的可读性。</p>
<p>从服务器开始，我们定义MessageInput输入类型，并在schema.js中包含mutation，如下所示：</p>
<pre><code class="hljs awk"><span class="hljs-regexp">//</span>server<span class="hljs-regexp">/src/</span>schema.js
</code></pre><pre><code class="hljs css"><span class="hljs-selector-tag">input</span> <span class="hljs-selector-tag">MessageInput</span>{  <span class="hljs-attribute">channelId</span>: ID!  text: String}
</code></pre><pre><code class="hljs elm"><span class="hljs-keyword">type</span> <span class="hljs-type">Mutation</span> {  # <span class="hljs-type">A</span> mutation to add a new channel to the list of channels  addChannel(name: <span class="hljs-type">String</span>!): <span class="hljs-type">Channel</span>  addMessage(message: <span class="hljs-type">MessageInput</span>!): <span class="hljs-type">Message</span>}
</code></pre><p>resolver.js中的addMessage解析器应该检查输入</p>
<pre><code class="hljs awk"><span class="hljs-regexp">//</span>server<span class="hljs-regexp">/src/</span>resolvers.js
</code></pre><pre><code class="hljs nimrod"><span class="hljs-type">Mutation</span>: {  addChannel: <span class="hljs-meta">{...}</span>,  addMessage: (root, { message }) =&gt; {    <span class="hljs-keyword">const</span> channel = channels.find(channel =&gt; channel.id === message.channelId);
<span class="hljs-keyword">if</span>(!channel)      throw new <span class="hljs-type">Error</span>(<span class="hljs-string">"Channel does not exist"</span>);
</code></pre><pre><code class="hljs haxe">    const <span class="hljs-keyword">new</span><span class="hljs-type">Message</span> = { id: <span class="hljs-type">String</span>(nextMessageId++), text: <span class="hljs-type">message</span>.text };
channel.messages.push(<span class="hljs-keyword">new</span><span class="hljs-type">Message</span>);
<span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Message</span>;
},},
</code></pre><p>接下来在客户端，我们需要完成AddMessage.js，从查询开始：</p>
<pre><code class="hljs crystal">/<span class="hljs-regexp">/client/src</span><span class="hljs-regexp">/components/</span>AddMessage.js
</code></pre><pre><code class="hljs protobuf">const addMessageMutation = gql  mutation addMessage($<span class="hljs-class"><span class="hljs-keyword">message</span>: <span class="hljs-title">MessageInput</span>!) </span>{    addMessage(<span class="hljs-class"><span class="hljs-keyword">message</span>: $<span class="hljs-title">message</span>) </span>{      id      text    }  };
</code></pre><p>AddMessage组件主体将变量添加到AddChannel的基本代码中，其中包括我们在其中使用的相同的UI功能 <a href="https://dev-blog.apollodata.com/tutorial-graphql-mutations-optimistic-ui-and-store-updates-f7b6b66bf0e2">last tutorial</a>. 唯一不同的部分是变量。 我在下面以粗体突出显示了这些变化：</p>
<pre><code class="hljs crystal">/<span class="hljs-regexp">/client/src</span><span class="hljs-regexp">/components/</span>AddMessage.js
</code></pre><pre><code class="hljs groovy">const AddMessage = ({ mutate, match }) =&gt; {  const handleKeyUp = (evt) =&gt; {    <span class="hljs-keyword">if</span> (evt.keyCode === <span class="hljs-number">13</span>) {      mutate({        <span class="hljs-string">variables:</span> {          <span class="hljs-string">message:</span> {            <span class="hljs-string">channelId:</span> match.params.channelId,            <span class="hljs-string">text:</span> evt.target.value          }        },        <span class="hljs-string">optimisticResponse:</span> {          <span class="hljs-string">addMessage:</span> {            <span class="hljs-string">text:</span> evt.target.value,            <span class="hljs-string">id:</span> Math.round(Math.random() * <span class="hljs-number">-1000000</span>),            <span class="hljs-string">__typename:</span> <span class="hljs-string">'Message'</span>,          },        },        <span class="hljs-string">update:</span> (store, { <span class="hljs-string">data:</span> { addMessage } }) =&gt; {          <span class="hljs-comment">// Read the data from the cache for this query.          const data = store.readQuery({            query: channelDetailsQuery,            variables: {              channelId: match.params.channelId,            }          });</span>
<span class="hljs-comment">// Add our Message from the mutation to the end.          data.channel.messages.push(addMessage);</span>
<span class="hljs-comment">// Write the data back to the cache.          store.writeQuery({            query: channelDetailsQuery,            variables: {              channelId: match.params.channelId,            },            data          });</span>
},      });
evt.target.value = <span class="hljs-string">''</span>;
}  };
</code></pre><pre><code class="hljs kotlin">  <span class="hljs-keyword">return</span> (     ...  );};
</code></pre><pre><code class="hljs jboss-cli"><span class="hljs-string">//const</span> addMessageMutation = gql.<span class="hljs-string">..</span>
</code></pre><pre><code class="hljs lisp">const AddMessageWithMutation = graphql(  <span class="hljs-name">addMessageMutation</span>,)(<span class="hljs-name">withRouter</span>(<span class="hljs-name">AddMessage</span>))<span class="hljs-comment">;</span>
</code></pre><pre><code class="hljs routeros"><span class="hljs-builtin-name">export</span><span class="hljs-built_in"> default </span>AddMessageWithMutation;
</code></pre><p><em>Note:</em> <a href="https://reacttraining.com/react-router/web/api/match"><em>match</em></a> <em>是react-router提供的url属性的接口</em> <a href="https://reacttraining.com/react-router/web/api/withRouter"><em>withRouter</em></a></p>
<p>现在我们有一个功能齐全的消息channel！ 但是，有一个小问题：如果网络速度较慢，用户必须等待channel名称和消息从服务器加载。 在加载所有数据之前，用户甚至不知道他们在哪个channel，这是坏的UX。 理想情况下，我们希望用户在加载邮件时看到良好的channel预览。 这就是我们在本教程的最后部分要做的。</p>
<h4>从缓存中读取频channel名称</h4>
<p>正如您可能已经注意到的，客户端已经知道channel名称，因为它在主页上加载了ChannelNameListQuery。 如果有方法让我们保留channel名称，我们可以在不向服务器提出其他请求的情况下显示它！</p>
<p>幸运的是，Apollo Client会自动将每个查询结果存储在<a href="https://dev-blog.apollodata.com/the-concepts-of-graphql-bc68bd819be3">normalized cache</a>中，这意味着我们可以查询数据 我们希望让Apollo Client找出它是否可以从缓存中加载。 但是，有一个小问题：</p>
<p>默认情况下，Apollo客户端使用查询路径（例如/channel(id:5)/name）来确定对象是否被缓存。</p>
<p>由于channels和channel查询导致到同一对象的路径不同，Apollo Client不知道它们是相同的，除非您明确告诉它channel查询可能解析为channel查询检索到的对象。 我们可以通过向App.js中的ApolloClient构造函数添加一个自定义解析器来告诉Apollo客户端这种关系。 每当我们进行channel查询时，这个自定义解析器就会告诉Apollo客户端检查它的缓存中是否有ID $ channelId的Channel对象。 如果它在缓存中找到具有该ID的channel，则不会向服务器发出请求。</p>
<p>以下自定义解析器在App.js中创建此映射：</p>
<pre><code class="hljs awk"><span class="hljs-regexp">//</span>client<span class="hljs-regexp">/src/</span>App.js
</code></pre><pre><code class="hljs nimrod">//function dataIdFromObject (<span class="hljs-literal">result</span>) <span class="hljs-meta">{...}</span>
</code></pre><pre><code class="hljs groovy">const client = <span class="hljs-keyword">new</span> ApolloClient({  networkInterface,  <span class="hljs-string">customResolvers:</span> {    <span class="hljs-string">Query:</span> {      <span class="hljs-string">channel:</span> (_, args) =&gt; {        <span class="hljs-keyword">return</span> toIdValue(dataIdFromObject({ <span class="hljs-string">__typename:</span> <span class="hljs-string">'Channel'</span>, <span class="hljs-string">id:</span> args[<span class="hljs-string">'id'</span>] }))      },    },  },  dataIdFromObject,});
</code></pre><p><em>ApolloClient</em> <em>uses</em> <em>dataIdFromObject</em> <em>to tag GraphQL objects in the cache and</em> <em>toIdValue</em> <em>ensures an ID type is returned.</em></p>
<p>现在您只需要像通常那样创建ChannelPreview组件：</p>
<pre><code class="hljs crystal">/<span class="hljs-regexp">/client/src</span><span class="hljs-regexp">/components/</span>ChannelPreview.js
</code></pre><pre><code class="hljs moonscript">const ChannelPreview = <span class="hljs-function"><span class="hljs-params">({ data: {loading, <span class="hljs-built_in">error</span>, channel } })</span> =&gt;</span> {  <span class="hljs-keyword">return</span> (    
</code></pre><pre><code class="hljs abnf">      Loading Messages      )<span class="hljs-comment">;};</span>
</code></pre><pre><code class="hljs objectivec"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> channelQuery = gql  query ChannelQuery($channelId : ID!) {    channel(<span class="hljs-keyword">id</span>: $channelId) {      <span class="hljs-keyword">id</span>      name    }  };
</code></pre><pre><code class="hljs routeros"><span class="hljs-builtin-name">export</span><span class="hljs-built_in"> default </span>(graphql(channelQuery, {  options: (props) =&gt; ({    variables: { channelId: props.channelId },  }),})(ChannelPreview));
</code></pre><p>最后，我们需要用ChannelPreview组件替换ChannelDetails组件的加载消息：</p>
<pre><code class="hljs crystal">/<span class="hljs-regexp">/client/src</span><span class="hljs-regexp">/components/</span>ChannelDetails.js
</code></pre><pre><code class="hljs coffeescript">const ChannelDetails = <span class="hljs-function"><span class="hljs-params">(...)</span> =&gt;</span> {  <span class="hljs-keyword">if</span> (loading) {    <span class="hljs-keyword">return</span> ;
}
</code></pre><p>通过从缓存中提取数据，我们创建了一个channel详细视图，可以在后台加载消息的同时立即显示channel名称。</p>
<p><img src="https://p0.ssl.qhimg.com/t01502df6fc862839ba.gif" alt=""></p>
<h4>总结</h4>
<p>恭喜，您现在有一个可以提供channel标记的消息流的应用程序！ 该服务几乎已经准备好用于生产，经过几次改进之后：首先，我们需要一种使用GraphQL订阅实时显示消息的方法，从<a href="https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-server-side-e51c32dc2951">下一部分</a>的服务器端开始. 其次，我们希望分页消息，因为一次加载所有消息可能会很慢。 最后，我们还需要添加登录和身份验证，以确保我们知道消息来自哪里。</p>
<blockquote>
<p>如果您喜欢本教程并希望继续学习Apollo和GraphQL，请务必点击下面的“关注”按钮，然后在Twitter上关注我们 <a href="https://twitter.com/apollographql">@apollographql</a> 以及作者 <a href="https://twitter.com/evanshauser">@evanshauser</a>.</p>
</blockquote>
<p>非常感谢<a href="https://medium.com/@helfer">Jonas Helfer</a> 的指导!</p>

          
{{< /raw >}}

# 版权声明
原文链接: [www.zcfy.cc](https://www.zcfy.cc/article/tutorial-graphql-input-types-and-custom-resolvers)
原文标题: Tutorial: GraphQL输入类型和自定义解析器
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
