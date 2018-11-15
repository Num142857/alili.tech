---
title: 'Tutorial: 在React中使用GraphQL mutation'
reprint: true
categories: reprint
abbrlink: 32ffef6d
date: 2018-10-21 00:00:00
---

{{% raw %}}

            <p>在本教程中，您将学习如何使用简单的mutation来修改服务器上的数据并保持客户端上的状态同步。 具体来说，我们将创建一个将项目添加到列表的mutation。</p>
<p><img src="https://p0.ssl.qhimg.com/t011484902f00001a99.png" alt=""></p>
<p>本文是关于GraphQL + React的教程系列的一部分。 以下是其他部分：</p>
<ul>
<li><a href="https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b">Part 1 —前端: 用GraphQL读取声明性数据</a></li>
<li><a href="https://dev-blog.apollodata.com/react-graphql-tutorial-part-2-server-99d0528c7928">Part 2 — 服务器端: 分五步设置一个简单的GraphQL服务器</a></li>
<li>Part 3 —Mutations (您正在阅读的这一章)</li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-mutations-optimistic-ui-and-store-updates-f7b6b66bf0e2">Part 4 — 友好的的UI和客户端存储更新的mutation</a></li>
<li><a href="https://medium.com/p/tutorial-graphql-input-types-and-client-caching-f11fa0421cfd">Part 5 —输入类型和自定义解析器</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-server-side-e51c32dc2951">Part 6 — 服务器订阅</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-client-side-40e185e4be76">Part 7 —客户端上的GraphQL订阅</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-pagination-d1c3b3ee2823">Part 8 — 分页</a></li>
</ul>
<p>在本教程中，我们将执行以下操作：</p>
<p>1.将我们的前端连接到服务器
2.在服务器上定义GraphQL变化
3.从客户端上的React组件调用GraphQL变体</p>
<p>更新客户端上的状态以确保它与服务器同步每个步骤都非常简单，因此完成整个教程只需要25分钟。如果你还没有完成第1部分和第2部分，你可以先做或者直接跳到这里，并从GitHub仓库中查看本教程的开始状态：</p>
<pre><code class="hljs crmsh">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/apollographql/graphql-tutorial.gitcd graphql-tutorialgit fetchgit checkout t3-<span class="hljs-literal">start</span>
</code></pre><blockquote>
<p>我建议你查看t3-start分支，即使你已经完成了第1和第2部分，因为我们已经对App.css和App.js进行了一些修改，以改善应用的布局和文件夹结构。</p>
</blockquote>
<p>要检查是否有效，让我们启动GraphQL服务器：</p>
<pre><code class="hljs dos"><span class="hljs-built_in">cd</span> servernpm install &amp;&amp; npm <span class="hljs-built_in">start</span>
</code></pre><pre><code class="hljs clean"># ...# GraphQL Server is now running on http:<span class="hljs-comment">//localhost:4000/graphiql</span>
</code></pre><p>我们还要在一个单独的控制台中启动为我们的前端软件包提供服务的dev服务器：</p>
<pre><code class="hljs apache"><span class="hljs-comment"># assuming that you're in the graphql-tutorial directory</span>
</code></pre><pre><code class="hljs dos"><span class="hljs-built_in">cd</span> clientnpm install &amp;&amp; npm <span class="hljs-built_in">start</span>
</code></pre><pre><code class="hljs clean"># ...# The app is running at:##    http:<span class="hljs-comment">//localhost:3000/</span>
</code></pre><p>如果它有效，你已经准备好写下你的第一个 mutation!</p>
<h4>1. 将前端连接到服务器</h4>
<p>在上一篇教程中，我们构建了我们的服务器，但是我们没有将它连接到我们的前端。 为此，我们只需要在服务器和客户端上进行两个较小的更改。</p>
<p>由于服务器在端口400o上运行，客户端从端口3000上运行，因此我们需要在服务器上启用 <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS</a>。 在本教程中，我们将使用Express / Connect的cors包：</p>
<pre><code class="hljs apache"><span class="hljs-comment"># in the server directory (not the client!!)</span>
</code></pre><pre><code class="hljs sql">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save cors</span>
</code></pre><p>现在我们只需在server/server.js中导入cors并修改以下行以允许来自我们前端源的跨源请求：</p>
<pre><code class="hljs coffeescript"><span class="hljs-regexp">//</span> ...<span class="hljs-keyword">import</span> cors <span class="hljs-keyword">from</span> <span class="hljs-string">'cors'</span>;
</code></pre><pre><code class="hljs ada">// ... const server = express();server.<span class="hljs-keyword">use</span>(<span class="hljs-string">'*'</span>, cors({ origin: <span class="hljs-symbol">'http</span>://localhost:<span class="hljs-number">3000</span>' }));
</code></pre><p>在前端，我们需要从react-apollo导入createNetworkInterface，然后用连接到服务器的mockNetworkInterface替换它：</p>
<pre><code class="hljs awk"><span class="hljs-regexp">//</span> client<span class="hljs-regexp">/src/</span>App.js
</code></pre><pre><code class="hljs coffeescript"><span class="hljs-keyword">import</span> {  ApolloClient,  ApolloProvider,  createNetworkInterface, <span class="hljs-regexp">//</span> &lt;-- <span class="hljs-keyword">this</span> line <span class="hljs-keyword">is</span> <span class="hljs-keyword">new</span>!} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-apollo'</span>;
</code></pre><p>您可以删除用于创建mockNetworkInterface（包括导入）的所有代码，并将其替换为以下代码：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">const networkInterface</span> = createNetworkInterface({   uri: <span class="hljs-string">'http://localhost:4000/graphql'</span>,});
</code></pre><pre><code class="hljs routeros">const<span class="hljs-built_in"> client </span>= new ApolloClient({  networkInterface,});
</code></pre><p>您的客户端现在已连接到服务器，您应该看到以下信息 <a href="http://localhost:3000/">localhost:3000</a>:</p>
<p><img src="https://p0.ssl.qhimg.com/t0161d8feb30dff6503.png" alt=""></p>
<h4>2. 在服务器上定义GraphQL mutation</h4>
<p>现在客户端连接到服务器，我们可以开始真正的任务 - 编写一个mutation，将channel添加到我们的channel列表中。</p>
<p>首先，我们将通过将其添加到server / src / schema.js中来定义模式中的mutation：</p>
<pre><code class="hljs routeros">const typeDefs =<span class="hljs-built_in"> type </span>Channel {  id: ID!                # <span class="hljs-string">"!"</span> denotes a required field  name: String}type Query {  channels: [Channel]    # <span class="hljs-string">"[]"</span> means this is a list of channels}
</code></pre><pre><code class="hljs ocaml"># <span class="hljs-type">The</span> mutation root <span class="hljs-keyword">type</span>, used <span class="hljs-keyword">to</span> define all mutations.<span class="hljs-keyword">type</span> <span class="hljs-type">Mutation</span> {  # <span class="hljs-type">A</span> mutation <span class="hljs-keyword">to</span> add a <span class="hljs-keyword">new</span> channel <span class="hljs-keyword">to</span> the <span class="hljs-built_in">list</span> <span class="hljs-keyword">of</span> channels  addChannel(name: <span class="hljs-type">String</span>!): <span class="hljs-type">Channel</span>};
</code></pre><p>我们刚刚添加的新Mutation类型定义了一个单一mutation - addChannel - 它只接受一个参数，即新channel的名称。 mutation返回一个channel对象，然后我们可以选择字段，就像查询一样。 以下是一个有效的mutation示例：</p>
<pre><code class="hljs less"># <span class="hljs-selector-tag">an</span> <span class="hljs-selector-tag">example</span> <span class="hljs-selector-tag">mutation</span> <span class="hljs-selector-tag">call</span><span class="hljs-selector-pseudo">:mutation</span> {  <span class="hljs-selector-tag">addChannel</span>(<span class="hljs-attribute">name</span>: <span class="hljs-string">"basketball"</span>){    <span class="hljs-selector-tag">id</span>    <span class="hljs-selector-tag">name</span>  }}
</code></pre><p>当然，除非我们为它定义一个解析器函数，否则这个mutation不会做任何事情。 我们的解析函数存在于server/src/resolvers.js中，所以让我们来看看并为我们的新addChannel mutation添加一个解析函数。 解析函数必须将提供的名称作为参数，并在将其添加到现有列表之前为新channel生成一个ID。</p>
<p>让我们更改server/src/resolvers.js以添加新的nextId变量并为Mutation.addChanel定义解析器：</p>
<pre><code class="hljs nix">const <span class="hljs-attr">channels</span> = <span class="hljs-comment">/* ... */</span><span class="hljs-keyword">let</span> <span class="hljs-attr">nextId</span> = <span class="hljs-number">3</span>;
</code></pre><pre><code class="hljs coffeescript"><span class="hljs-keyword">export</span> const resolvers = {  Query: {    channels: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {      <span class="hljs-keyword">return</span> channels;
},  },  Mutation: {    addChannel: <span class="hljs-function"><span class="hljs-params">(root, args)</span> =&gt;</span> {      const newChannel = { id: nextId++, name: args.name };
channels.push(newChannel);
<span class="hljs-keyword">return</span> newChannel;
},  },};
</code></pre><p>正如你所看到的，解析器只是推动一个新的channel到channels，递增nextId并返回新创建的channel。 如果你前往 <a href="http://localhost:4000/graphiql?query=mutation%20%7B%0A%20%20addChannel%28name%3A%20%22basketball%22%29%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%7D%0A%7D">localhost:4000/graphiql</a>, 你应该能够从上面运行示例mutation并获得响应。</p>
<p><img src="https://p0.ssl.qhimg.com/t01bb856a60cb422b56.png" alt=""></p>
<p>如果您在localhost：3000上重新加载客户端应用程序，您现在应该看到“basketball”channel出现。</p>
<p><img src="https://p0.ssl.qhimg.com/t011c9d222ab8a531d0.png" alt=""></p>
<blockquote>
<p><strong>Note:</strong> channels目前仅存储在内存中，因此每次重新启动服务器时，新添加的channel都将消失。 我们将在未来的教程中将事物与持久存储挂钩。</p>
</blockquote>
<h4>3. 从React组件调用 mutation</h4>
<p>现在我们已经验证了mutation在服务器上运行，让我们编写必要的代码从客户端调用它。 首先，我们将在src/components/AddChannel.js中创建一个输入组件：</p>
<pre><code class="hljs clean"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
</code></pre><pre><code class="hljs coffeescript">const AddChannel = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {  const handleKeyUp = <span class="hljs-function"><span class="hljs-params">(evt)</span> =&gt;</span> {    <span class="hljs-keyword">if</span> (evt.keyCode === <span class="hljs-number">13</span>) {      <span class="hljs-built_in">console</span>.log(evt.target.value);
evt.target.value = <span class="hljs-string">''</span>;
}  };
</code></pre><pre><code class="hljs kotlin">  <span class="hljs-keyword">return</span> (      );};
</code></pre><pre><code class="hljs routeros"><span class="hljs-builtin-name">export</span><span class="hljs-built_in"> default </span>AddChannel;
</code></pre><p>我们的AddChannel组件非常简单。 到目前为止，它只包含一个文本输入元素和一个handleKeyUp函数，该函数将输入文本输出到控制台，并在用户返回时清除输入字段（代码13）。</p>
<p>让我们将其导入到src/components/ChannelsListWithData.js中，并将其放置在我们的channel列表之前：</p>
<pre><code class="hljs clean"><span class="hljs-keyword">import</span> AddChannel <span class="hljs-keyword">from</span> <span class="hljs-string">'./AddChannel'</span>;
</code></pre><pre><code class="hljs jboss-cli"><span class="hljs-string">//</span> <span class="hljs-string">...</span>
</code></pre><pre><code class="hljs moonscript">const ChannelsList = <span class="hljs-function"><span class="hljs-params">({ data: {loading, <span class="hljs-built_in">error</span>, channels }})</span> =&gt;</span> {  <span class="hljs-keyword">if</span> (loading) {    <span class="hljs-keyword">return</span> Loading ...;
}  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">error</span>) {    <span class="hljs-keyword">return</span> {<span class="hljs-built_in">error</span>.message};
}
</code></pre><pre><code class="hljs lisp">  return (           <span class="hljs-name">//</span> &lt;-- This is the new line.      { channels.map( <span class="hljs-name">ch</span> =&gt;         ({ch.name})      )}      )<span class="hljs-comment">;};</span>
</code></pre><p>如果有效，您现在应该在用户界面中看到“新channel”输入：</p>
<p><img src="https://p0.ssl.qhimg.com/t011736da21ef950b38.png" alt=""></p>
<p>为了使我们的输入组件调用GraphQL mutation，我们必须将它与来自react-apollo的GraphQL高阶组件（HOC）连接起来 (<a href="https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b#573b">就像我们在第一篇教程中所做的一样</a>). 对于mutation，graphql HOC传递一个mutate prop，我们将调用它来执行mutation。</p>
<pre><code class="hljs clean"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;<span class="hljs-keyword">import</span> { gql, graphql } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-apollo'</span>;
</code></pre><pre><code class="hljs javascript"><span class="hljs-keyword">const</span> AddChannel = <span class="hljs-function">(<span class="hljs-params">{ mutate }</span>) =&gt;</span> {  <span class="hljs-keyword">const</span> handleKeyUp = <span class="hljs-function">(<span class="hljs-params">evt</span>) =&gt;</span> {    <span class="hljs-keyword">if</span> (evt.keyCode === <span class="hljs-number">13</span>) {      evt.persist();
mutate({         <span class="hljs-attr">variables</span>: { <span class="hljs-attr">name</span>: evt.target.value }      })      .then( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {        evt.target.value = <span class="hljs-string">''</span>;
});
}  };
</code></pre><pre><code class="hljs kotlin"><span class="hljs-keyword">return</span> (      );};
</code></pre><pre><code class="hljs applescript">const addChannelMutation = gql  mutation addChannel($<span class="hljs-built_in">name</span>: String!) {    addChannel(<span class="hljs-built_in">name</span>: $<span class="hljs-built_in">name</span>) {      <span class="hljs-built_in">id</span>      <span class="hljs-built_in">name</span>    }  };
</code></pre><pre><code class="hljs lisp">const AddChannelWithMutation = graphql(  <span class="hljs-name">addChannelMutation</span>)(<span class="hljs-name">AddChannel</span>)<span class="hljs-comment">;</span>
</code></pre><pre><code class="hljs routeros"><span class="hljs-builtin-name">export</span><span class="hljs-built_in"> default </span>AddChannelWithMutation;
</code></pre><p>让我们看看它是否工作并在输入框中输入内容。 在你进入后文字消失了吗？ 如果确实如此，mutation是成功的，您应该在重新加载页面后看到该项目。 当然，不得不重新加载页面并不是一个很好的用户交互，因此在下一节中，我们将了解为什么Apollo无法知道mutation意味着什么，以及我们需要拿新项目做什么来使列表重新呈现。</p>
<h4>4. 更新客户端状态使用mutation</h4>
<p>我们的channel列表没有自动重新呈现的原因是，Apollo无法知道我们刚刚调用的mutation与呈现我们列表的频道查询有任何关系。 只有服务器知道，但它没有办法通知我们的客户 (为此我们需要一个<a href="https://medium.com/p/new-release-of-graphql-subscriptions-for-javascript-f11be19e6569">订阅</a>, 我们将在未来的教程中介绍).</p>
<p>要在突变后更新客户端状态，我们有三种选择：</p>
<ol>
<li><a href="http://dev.apollodata.com/react/cache-updates.html#refetchQueries">Refetch</a> 可能受mutation影响的查询</li>
<li>基于mutation结果手动 <a href="http://dev.apollodata.com/react/mutations.html#update-after-mutation">更新客户端状态</a> </li>
<li>使用 GraphQL <a href="https://medium.com/p/new-release-of-graphql-subscriptions-for-javascript-f11be19e6569">订阅</a> 来通知我们更新</li>
</ol>
<p>重新读取选项是迄今为止最简单的一种，它是让应用程序快速运行的好方法，所以我们现在就会这样做。</p>
<p>为了告诉Apollo Client我们想要在我们的mutation完成后重新获取channel，我们通过调用中的refetchQueries选项将它传递给mutate。 我们将从ChannelsListWithData.js中导出并将其导入AddChannel.js中，而不是再次写入频道查询。</p>
<pre><code class="hljs 1c"><span class="hljs-comment">// AddChannel.js</span>
</code></pre><pre><code class="hljs coffeescript"><span class="hljs-regexp">//</span> ...<span class="hljs-keyword">import</span> { channelsListQuery } <span class="hljs-keyword">from</span> <span class="hljs-string">'./ChannelsListWithData'</span>;
</code></pre><pre><code class="hljs jboss-cli"><span class="hljs-string">//</span> <span class="hljs-string">...</span>
</code></pre><pre><code class="hljs groovy">    mutate({       <span class="hljs-string">variables:</span> { <span class="hljs-string">name:</span> evt.target.value },      <span class="hljs-string">refetchQueries:</span> [ { <span class="hljs-string">query:</span> channelsListQuery }], <span class="hljs-comment">// &lt;-- new    })</span>
</code></pre><pre><code class="hljs jboss-cli"><span class="hljs-string">//</span> <span class="hljs-string">...</span>
</code></pre><p>现在，如果我们添加一个新频道，列表应该立即刷新！</p>
<p><img src="https://p0.ssl.qhimg.com/t01134f4c61f4ef1016.gif" alt=""></p>
<p>就是这样; 你已经实现了我们的第一个GraphQL mutation！ </p>
<p>当然，这只会在您进行变更后更新UI。 如果mutation是由另一个客户端发起的，那么直到您做出自己的mutation并从服务器重新获取列表，您才会发现。 大多数情况下，这不是问题，但对于实时应用程序，Apollo有一个很好的技巧，可以向程序员几乎毫不费力地透明地向所有客户端传播更新：轮询查询。</p>
<p>为了打开它，只需将src / components / ChannelsListWithData.js中的channelsListQuery传递给pollInterval选项即可：</p>
<pre><code class="hljs routeros"><span class="hljs-builtin-name">export</span><span class="hljs-built_in"> default </span>graphql(channelsListQuery, {  options: { pollInterval: 5000 },})(ChannelsList);
</code></pre><p>有了这个简单的变化，Apollo会每5秒重新运行一次查询，并且您的用户界面将更新最新的channel列表。 您可以通过打开一个新的浏览器窗口并在其中添加一个channel来进行测试。 新的channel应该在一小段延迟后出现在另一个窗口中。</p>
<hr>
<p>恭喜，您已经在GraphQL + React教程的第三步中结束了！ 您已经为GraphQL模式添加了一个mutation，为其编写了一个解析器，并从React组件中调用了mutation，并确保通过重新调取和轮询来更新UI。 结合本教程系列的第1和第2部分，您现在已经熟悉了使用Apollo编写完整的React + GraphQL应用程序的所有基本知识。</p>
<p>要了解如何使您的mutation更加高效并且显然更快，请继续下一部分，您将了解良好的的用户界面和存储更新！</p>
<p><strong>Part 4:</strong> <a href="https://dev-blog.apollodata.com/tutorial-graphql-mutations-optimistic-ui-and-store-updates-f7b6b66bf0e2">具有良好的用户界面和客户端存储更新的GraphQL mutation</a></p>
<blockquote>
<p><em>如果您喜欢本教程并想继续学习Apollo和GraphQL，请务必点击下面的“关注”按钮，并在Twitter上关注我们 [</em>@apollographql_](<a href="https://twitter.com/apollographql">https://twitter.com/apollographql</a>) <em>and</em> <a href="https://twitter.com/helferjs"><em>@helferjs</em></a>_._</p>
</blockquote>
<p><img src="https://p0.ssl.qhimg.com/t01e7df7341936f1cad.png" alt=""></p>

          
{{% /raw %}}

# 版权声明
原文链接: [www.zcfy.cc](https://www.zcfy.cc/article/tutorial-graphql-mutations-with-react)
原文标题: Tutorial: 在React中使用GraphQL mutation
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
