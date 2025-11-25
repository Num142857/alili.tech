---
title: 'Tutorial: 用良好的用户界面加速GraphQL mutation'
hidden: true
categories: [reprint]
slug: c0dd4948
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <hr>
<p>这是我们全栈React+GraphQL系列教程的第四部分，每一部分都是独立的且都会介绍一个新的关键的知识点。所以你可以单独的阅读任何一部分或者一整个系列教程，这完全取决于你。</p>
<p>以下使我们到目前为止所涉及的部分：</p>
<ul>
<li><a href="https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b">Part 1: 前端</a></li>
<li><a href="https://dev-blog.apollodata.com/react-graphql-tutorial-part-2-server-99d0528c7928">Part 2: 服务器端</a></li>
<li><a href="https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15">Part 3: 基本的 GraphQL Mutations</a></li>
<li>Part 4: 良好的UI (你在此)</li>
<li><a href="https://medium.com/p/tutorial-graphql-input-types-and-client-caching-f11fa0421cfd">Part 5: 输入类型和自定义解析器</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-server-side-e51c32dc2951">Part 6: 服务器订阅</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-client-side-40e185e4be76">Part 7: 在客户端使用GraphQL订阅</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-pagination-d1c3b3ee2823">Part 8: 分页</a></li>
</ul>
<p>在这一部分，我们将继续深入学习GraphQL mutation在客户端是如何工作的，我们从<a href="https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15">part 3</a> 拿到一个列表视图和mutation。模拟500毫秒的网络延迟，然后从用户的角度使用存储更新用户界面使延迟几乎消失。</p>
<p>到本教程结束时，您将知道良好的用户界面是如何使用存储更新来处理网络延迟。</p>
<blockquote>
<p>提示: 如果某些事情不能像预期的那样工作，您可以随时通过运行 <em>git checkout t4-end</em> 解决该问题</p>
</blockquote>
<hr>
<p>开始之前，让我们克隆教程git repo并安装依赖关系：</p>
<pre><code class="hljs jboss-cli">git clone https:<span class="hljs-string">//github.com/apollographql/graphql-tutorial.gitcd</span> graphql-tutorialgit checkout t4-startcd server &amp;&amp; npm install &amp;&amp; <span class="hljs-keyword">cd</span> <span class="hljs-string">../client</span> &amp;&amp; npm install &amp;&amp; <span class="hljs-keyword">cd</span> <span class="hljs-string">..</span>
</code></pre><p>为确保一切按预期工作，让我们分别在不同的终端中启动服务器和客户端：</p>
<pre><code class="hljs dos"><span class="hljs-built_in">cd</span> servernpm <span class="hljs-built_in">start</span>
</code></pre><p>在另一个终端：</p>
<pre><code class="hljs dos"><span class="hljs-built_in">cd</span> clientnpm <span class="hljs-built_in">start</span>
</code></pre><p>如果它正常工作，您现在应该在浏览器中看到第3部分末尾的ChannelsView：</p>
<p><img src="https://p0.ssl.qhimg.com/t01134f4c61f4ef1016.gif" alt=""></p>
<h4>Mutations和延迟</h4>
<p>正如您在上图中看到的那样，您添加的任何新channel都会立即显示在列表中。 这很好，因为反应性有助于实现更好的用户体验。</p>
<p>然而，如果你在第3部分中跟着教程学习的话，你可能还记得，这个更新实际上是<strong>两次往返</strong> 现在！ 一个用于mutation请求，另一个用于在mutation完成后重新获取列表。 第二次往返当前是必需的，因为客户无法知道您刚刚添加的新项目应该在列表中。 GraphQL根本没有任何方式编码该信息，因为它将后端视为黑盒子：在数据输出中查询。 在我们解决这个问题之前，让我们看看为什么这是一个问题。</p>
<p>为了了解如果网络速度较慢UX会是什么样子，我们将通过添加中间件来模拟Apollo网络接口中500毫秒的网络延迟。</p>
<p>为此，请在声明networkInterface常量之后立即将以下行添加到client/src/App.js中。</p>
<pre><code class="hljs autoit">// <span class="hljs-keyword">const</span> networkInterface = ...networkInterface.use([{  applyMiddleware(req, <span class="hljs-keyword">next</span>) {    setTimeout(<span class="hljs-keyword">next</span>, <span class="hljs-number">500</span>)<span class="hljs-comment">;</span>
},}])<span class="hljs-comment">;</span>
</code></pre><hr>
<p>现在我们已经为每个请求添加了500毫秒的延迟，添加一个新channel感觉有点不同：</p>
<p><img src="https://p0.ssl.qhimg.com/t012fc7466e2c3a53fa.gif" alt=""></p>
<p>从“tennis”这个词变暗到消失的时间，您看到的延迟是mutation完成其服务器往返所花费的时间。 从输入框中单词“tennis”消失直到它出现的时间的延迟是列表重新读取查询的延迟。</p>
<p>尽管重新初始化让我们能够轻松快捷地建立此功能，但我们需要一个更好的解决方案，让用户体验到延迟的制作应用程序。 目前，这些用户的体验并不是很好：首先，他们在等待，没有任何反应; 然后，他们看到他们的输入完全消失，然后它终于出现在他们预期的地方。 </p>
<p>特别是在移动网络上，几百毫秒的延迟并不罕见，我们需要一种方法来处理它。 我们可以做的第一件事是避免第二次往返重新获取列表。</p>
<h4>mutation完成后存储更新</h4>
<p>对我们来说幸运的是，mutation已经返回了我们需要将新项目加入到列表中的所有信息。 我们只需告诉Apollo Client 如何为我们做这些！ </p>
<p>对于基于客户端操作需要更新存储的mutation和其他情况，Apollo提供了一组功能强大的工具来执行必要的存储更新：readQuery，writeQuery，readFragment和writeFragment。 你可以阅读所有关于它们<a href="http://dev.apollodata.com/core/read-and-write.html">点这里</a>.</p>
<p>因为在mutation后更新存储是一种常见的用例，所以Apollo Client通过mutate中暴露的update属性可以非常容易地使用这些函数。 </p>
<p>要使用它，我们用下面的调用来替换AddChannel.js中的refetchQueries选项来更新：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> handleKeyUp = <span class="hljs-function">(<span class="hljs-params">evt</span>) =&gt;</span> {    <span class="hljs-keyword">if</span> (evt.keyCode === <span class="hljs-number">13</span>) {      evt.persist();
mutate({         <span class="hljs-attr">variables</span>: { <span class="hljs-attr">name</span>: evt.target.value },        <span class="hljs-attr">update</span>: <span class="hljs-function">(<span class="hljs-params">store, { data: { addChannel } }</span>) =&gt;</span> {            <span class="hljs-comment">// Read the data from the cache for this query.            const data = store.readQuery({query: channelsListQuery });</span>
<span class="hljs-comment">// Add our channel from the mutation to the end.            data.channels.push(addChannel);</span>
<span class="hljs-comment">// Write the data back to the cache.            store.writeQuery({ query: channelsListQuery, data });</span>
},      })      .then( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {        evt.target.value = <span class="hljs-string">''</span>;
});
}  };
</code></pre><p>现在，只要mutation完成，我们就从存储中读取channelsListQuery的当前结果，将新channel追加到它里面，并告诉Apollo Client将其写回存储。 这就是我们必须做的！ 我们的ChannelsListWithData组件会自动更新新数据。</p>
<p>如果您运行另一个mutation，您会注意到在输入消失并重新出现在列表末尾之间不再有任何延迟。 它几乎是瞬间的，这太棒了！</p>
<p><img src="https://p0.ssl.qhimg.com/t015df62ef46b8ed7d3.gif" alt=""></p>
<p>初始mutation的潜伏期仍然存在，但幸运的是，还有一种方法可以解决这个问题！</p>
<h4>良好的 UI</h4>
<p>Apollo Client可以利用一般称为乐观用户界面的技巧来模拟零延迟的服务器响应。 乐观的用户界面非常难以手动设置，但是由于Apollo同时管理存储和网络请求，使用乐观用户界面非常简单。</p>
<p>您只需模拟零延迟服务器响应即可将optimisticResponse属性添加到mutate调用中。 optimisticResponse应该是您期望从服务器获得的响应。 我们已经知道我们期望的channel名称。 ID并不重要，所以我们只是采取一个随机值来确保没有冲突。 最后，我们还必须指定__typename以确保Apollo Client知道它是什么类型的对象：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">mutate</span>({   <span class="hljs-attribute">variables</span>: { name: evt.target.value },  <span class="hljs-selector-tag">optimisticResponse</span>: {     <span class="hljs-attribute">addChannel</span>: {       name: evt.target.value,       id: Math.<span class="hljs-built_in">round</span>(Math.random() * -<span class="hljs-number">1000000</span>),       __typename: <span class="hljs-string">'Channel'</span>,     },   },   <span class="hljs-selector-tag">update</span>: ...})
</code></pre><p>如果将optimisticResponse添加到您的代码中，您会注意到在返回时间和项目出现在列表底部之间没有更多延迟。</p>
<p>事实上，optimisticResponse速度非常快，即使在输入字段中删除项目之前，该项目也会出现在列表中。这是因为我们有一段代码在成功返回mutation时清除输入字段。现在我们拥有乐观的用户界面，这已经不再适合了。相反，让我们给用户一些关于哪些列表项已被服务器确认，哪些列表项没有被确认的视觉反馈。</p>
<p>为了让用户知道channel尚未被服务器确认，我们需要以某种方式将该信息添加到该项目。与其修改服务器模式以跟踪某些客户端状态，我们将在此处使用一些小技巧来跟踪哪些项目是乐观的。</p>
<p>我们知道所有服务器生成的ID都是正整数，但乐观的“生成”ID都是负数 - 多么幸运！ ;-)</p>
<pre><code class="hljs qml"><span class="hljs-attribute">id:</span><span class="hljs-string"> Math.round</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">-1000000</span>),
</code></pre><blockquote>
<p>Note: 有更清晰的方法来跟踪您的用户界面中的乐观项目，但他们需要更多的设置，所以我们将在未来的教程中讲述这些。</p>
</blockquote>
<p>为了使乐观的channel在视觉上截然不同，我们在ChannelsListWithData.js中给他们一个额外的CSS类：</p>
<pre><code class="hljs lisp">return (                { channels.map( <span class="hljs-name">ch</span> =&gt;         ({ch.name})      )}      )<span class="hljs-comment">;</span>
</code></pre><p>最后，我们只需要定义App.css中的那个类。 出于我们的目的，我们只是让文本变得更加灰色：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.optimistic</span> {  <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.5);}
</code></pre><p>就是这样！ 通过这些更改，addChannel mutation现在应该看起来好多了！</p>
<p><img src="https://p0.ssl.qhimg.com/t01b62dab10c3e19d94.gif" alt=""></p>
<hr>
<h4>结论</h4>
<p>因此，本教程系列中的第4部分已经完成了！ 您已经学会了如何使用存储更新和乐观的用户界面来隐藏用户的网络延迟。 结合本教程系列的第1,2和3部分，您现在已经熟悉使用Apollo编写具有卓越用户体验的简单React + GraphQL应用程序的所有基础知识。</p>
<p>在本系列的<a href="https://medium.com/p/tutorial-graphql-input-types-and-client-caching-f11fa0421cfd">下一节</a> 我们将向应用添加第二个视图，并学习如何使用缓存数据和预取以更快地显示预览和加载页面。 如果你不想错过未来的部分，一定要订阅！</p>
<blockquote>
<p>如果您喜欢本教程并希望继续学习Apollo和GraphQL，请务必点击下面的“关注”按钮，然后在Twitter上关注我们<a href="https://twitter.com/apollographql">@apollographql</a> 和 <a href="https://twitter.com/helferjs">@helferjs</a>.</p>
</blockquote>

          
{{< /raw >}}

# 版权声明
原文链接: [www.zcfy.cc](https://www.zcfy.cc/article/tutorial-speeding-up-graphql-mutations-with-optimistic-ui)
原文标题: Tutorial: 用良好的用户界面加速GraphQL mutation
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
