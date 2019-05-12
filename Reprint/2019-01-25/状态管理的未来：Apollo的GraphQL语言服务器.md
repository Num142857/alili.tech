---
title: '状态管理的未来：Apollo的GraphQL语言服务器' 
date: 2019-01-25 2:30:23
hidden: true
slug: lmej6cr9lw
categories: [reprint]
---

{{< raw >}}

            <hr>
<p><img src="http://p0.qhimg.com/t01526cb0a8a9b36f56.png" alt="">
在Apollo的开发工具(DevTools)中查询程序当前状态</p>
<h1>状态管理的未来</h1>
<h2>在Apollo客户端程序(Apollo Client)里使用链路状态(apollo-link-state)软件包管理本地数据</h2>
<p>一个程序随着大小的增加，状态常常会变得更复杂。作为开发人员，我们的任务不仅是要同时兼顾来自多个远程服务器的数据，还要处理由用户界面互动得来的本地数据。总而言之，我们要把数据的每个部分都以某种方式存储起来，使得程序无论从的哪个组件那里都能轻松地获取数据。</p>
<p>许许多多开发人员告诉过我们Apollo客户端程序(Apollo Client)非常擅于管理远程数据，这差不多占了他们<strong>80%</strong>的数据需求，但<strong>剩下的20%</strong>，如全局开关和设备接口结果之类的本地数据怎么办呢？</p>
<p>在过去，Apollo用户靠Redux库或MobX库的独立store对象来管理那20%。这种方法在Apollo客户端程序(Apollo Client)1.0版里也是行得通的，但Apollo客户端程序(Apollo Client)2.0版里没有Redux部分了，要同步两个store对象间的本地和远程数据就变得更困难了。常常听到用户反映，他们想把程序的所有状态都封装进Apollo客户端程序(Apollo Client)里去，保证<strong>信息来源的单一性</strong>。</p>
<h3>方案建立在坚实基础上</h3>
<p>我们知道这个问题必须解决，所以自问：要在Apollo客户端程序(Apollo Client)里管理状态的话看上去会是怎么样的？首先，我们考虑了Redux库一些讨人喜欢的特色，比如其开发工具，以及通过connect将状态和组件绑定等功能。我们还考虑了Redux带来的痛点，比如异步行为生成器、缓存和优化界面之类的核心功能要用到样板和DIY方法来实现才行。</p>
<p>为了能理想地管理状态，我们想过要以Redux的优点作为基础建立方案，同时解决一些受到批评的问题。我们也想过利用GraphQL语言的优势，只用一个查询(query)语句就能向多个来源请求数据。</p>
<p><img src="http://p0.qhimg.com/t01c46c0bb84ee464ca.png" alt=""></p>
<p>Apollo客户端程序(Apollo Client)数据流向架构图</p>
<h3>学习一次就能在任何地方使用GraphQL语言</h3>
<p>关于GraphQL语言有一种常见的误解，那就是这种模式要与某种特定的服务器实现方法结合在一起。实际上，这种模式要灵活得多。无论是从<a href="https://github.com/iheanyi/go-grpc-graphql-simple-example">gRPC服务器</a>上，或是<a href="https://github.com/apollographql/apollo-link-rest">REST端点</a>上，或是<a href="https://github.com/apollographql/apollo-link-state">客户端缓存</a>里请求获取数据， GraphQL语言都可以用作一种<strong>通用数据语言</strong>，完全不管数据来源。</p>
<p>这就是为什么用GraphQL语言查询(query)与修改(mutation)来描述程序形成的状态是完美的。我们可以用GraphQL修改(mutation)操作来表示状态的变化，可以用GraphQL查询(query)操作来声明表达组件所需要的数据，以此访问状态数据。</p>
<p>GraphQL的一大优点是能把从多个来源得到的数据汇总，可以是本地的也可以是远程的。在一个查询(query)操作里指定数据域指令即可。?让我们看看怎么做吧！</p>
<h3>用Apollo客户端程序(Apollo Client)实现状态管理</h3>
<p>在Apollo客户端程序(Apollo Client)里管理本地数据可以通过<a href="https://www.apollographql.com/docs/link/">Apollo Link</a>这个模块化网络栈来实现，它能在任意一点上与GraphQL请求操作的循环挂钩。要从GraphQL服务器上访问数据，我们可以用<code>HttpLink</code>链路，但要从缓存中请求本地数据，我们需要安装一个新的链路：<code>链路状态(apollo-link-state)</code>。</p>
<pre><code class="hljs livescript"><span class="hljs-keyword">import</span> { ApolloClient } <span class="hljs-keyword">from</span> <span class="hljs-string">'apollo-client'</span>;
<span class="hljs-keyword">import</span> { InMemoryCache } <span class="hljs-keyword">from</span> <span class="hljs-string">'apollo-cache-inmemory'</span>;
<span class="hljs-keyword">import</span> { ApolloLink } <span class="hljs-keyword">from</span> <span class="hljs-string">'apollo-link'</span>;
<span class="hljs-keyword">import</span> { withClientState } <span class="hljs-keyword">from</span> <span class="hljs-string">'apollo-link-state'</span>;
<span class="hljs-keyword">import</span> { HttpLink } <span class="hljs-keyword">from</span> <span class="hljs-string">'apollo-link-http'</span>;

<span class="hljs-keyword">import</span> { defaults, resolvers } <span class="hljs-keyword">from</span> <span class="hljs-string">'./resolvers/todos'</span>;

<span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">new</span> InMemoryCache();

<span class="hljs-keyword">const</span> stateLink = withClientState({ resolvers, cache, defaults });

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> ApolloClient({
  cache,
  link: ApolloLink.<span class="hljs-keyword">from</span>([stateLink, <span class="hljs-keyword">new</span> HttpLink()]),
});
</code></pre><p>Apollo客户端程序(Apollo Client)带链路状态(apollo-link-state)模块的初始化</p>
<p>要创建状态链路，用<code>withClientState</code>函数，把<code>解析器(resolvers)</code>对象<code>默认(defaults)</code>对象和Apollo的<code>缓存(cache)</code>对象组成一个参数对象传入，然后把状态链路与整个链路拼接起来，作为其中一环。状态链路应该放在<code>HttpLink</code>链路前面，这样程序就能先拦截执行本地的查询(query)与修改(mutation)，然后再进入网络。</p>
<h4>默认对象(Defaults)</h4>
<p><code>默认(defaults)</code>这个对象表示了创建状态链路时要写入缓存的初始状态。虽然不是必需的，但传入<code>默认(defaults)</code>对象给缓存预热一下是很重要的，因为这样不管什么组件查询(query)数据都不会出现错误。<code>默认(defaults)</code>对象的形态应该反映程序里缓存的计划查询方式。</p>
<pre><code class="hljs arduino"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> defaults = {
  visibilityFilter: <span class="hljs-string">'SHOW_ALL'</span>,
  todos: [],
};
</code></pre><p>默认(Defaults)代表了想写入缓存的初始状态</p>
<h4>解析器(Resolvers)</h4>
<p>用Apollo客户端程序(Apollo Client)管理状态时，Apollo缓存就成了程序里所有本地和远程数据的唯一来源。如何更新并访问缓存里的数据呢？这时就要用到解析器了。如果大家在服务器端用过<code>graphql-tools</code>工具，那客户端解析器的类型签名和它是一样的：</p>
<pre><code class="hljs coffeescript">fieldName: <span class="hljs-function"><span class="hljs-params">(obj, args, context, info)</span> =&gt;</span> result;

</code></pre><p>不熟悉这个也不用担心。这里要注意的有两点最重要，一是查询(query)或修改(mutation)部分中的变量是作为第二个参数传入的，二是缓存会自动添加到语句环境里去。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> defaults = { <span class="hljs-comment">// 和之前一样 }</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> resolvers = {
  <span class="hljs-attr">Mutation</span>: {
    <span class="hljs-attr">visibilityFilter</span>: <span class="hljs-function">(<span class="hljs-params">_, { filter }, { cache }</span>) =&gt;</span> {
      cache.writeData({ <span class="hljs-attr">data</span>: { <span class="hljs-attr">visibilityFilter</span>: filter } });
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    },
    <span class="hljs-attr">addTodo</span>: <span class="hljs-function">(<span class="hljs-params">_, { text }, { cache }</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> query = gql<span class="hljs-string">`
        query GetTodos {
          todos @client {
            id
            text
            completed
          }
        }
      `</span>;
      <span class="hljs-keyword">const</span> previous = cache.readQuery({ query });
      <span class="hljs-keyword">const</span> newTodo = {
        <span class="hljs-attr">id</span>: nextTodoId++,
        text,
        <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">__typename</span>: <span class="hljs-string">'TodoItem'</span>,
      };
      <span class="hljs-keyword">const</span> data = {
        <span class="hljs-attr">todos</span>: previous.todos.concat([newTodo]),
      };
      cache.writeData({ data });
      <span class="hljs-keyword">return</span> newTodo;
    },
  }
}
</code></pre><p>解析器函数可以用来更新和访问缓存里的数据</p>
<p>要把数据写入缓存的根路径，我们调用<code>cache.writeData</code>函数并传入数据。有时我们写入缓存的数据取决于之前缓存里已有的数据，比如上面<code>addTodo</code>的修改(mutation)部分。在那种情况下，可以用<code>cache.readQuery</code>函数先从缓存里读取，再进行写入。如果要把缓存内已有对象的一部分写进去，也可以选择传入一个<code>id</code>号，它与对象在缓存里的键相对应。因为我们用的是<code>InMemoryCache</code>，键值就是<code>__typename:id</code>。</p>
<p><code>链路状态(apollo-link-state)</code>模块支持异步解析函数，这对于实施异步操作的附加效果很有用，比如访问设备API接口。然而，建议大家不要在解析函数中调用REST端点，而是用<code>[apollo-link-rest](https://github.com/apollographql/apollo-link-rest)</code>库，有自己的<code>@rest</code>指令可用。</p>
<h4><code>@client</code>客户指令</h4>
<p>从用户界面发起修改(mutation)操作时，Apollo的网络栈需要知道更新的数据是在客户端还是在服务器上。<code>链路状态(apollo-link-state)</code>模块用的是<code>@client</code>客户指令来设定只用于客户端的数据域。然后，<code>链路状态(apollo-link-state)</code>再为这些域调用解析函数。</p>
<pre><code class="hljs coffeescript">const SET_VISIBILITY = gql`<span class="javascript">
  mutation SetFilter($filter: <span class="hljs-built_in">String</span>!) {
    visibilityFilter(filter: $filter) @client
  }
</span>`;

const setVisibilityFilter = graphql(SET_VISIBILITY, {
  props: <span class="hljs-function"><span class="hljs-params">({ mutate, ownProps })</span> =&gt;</span> ({
    onClick: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> mutate({ variables: { filter: ownProps.filter } }),
  }),
});
</code></pre><p>用@client客户指令对本地数据进行修改(mutation)</p>
<p>查询(query)操作看起来和修改(mutation)很像。在查询(query)中有什么异步操作要执行的话，Apollo客户端程序(Apollo Client)会帮忙追踪加载与错误状态。对React框架来说，这些状态可以在<code>this.props.data</code>属性里找到，同时那里还可以找到无数的辅助函数，可以用来重新获取数据、分页和轮询。</p>
<p>有一个让人兴奋的特色是可以在一个查询(query)里请求多个数据源的数据！? 在这个例子里，我们要用Apollo缓存里的<code>可视化过滤器(visibilityFilter)</code>从GraphQL服务器那里请求一个<code>用户(user)</code>数据。</p>
<pre><code class="hljs routeros">const GET_USERS_ACTIVE_TODOS = gql`
  {
    visibilityFilter @client
    user(id: 1) {
      name
     <span class="hljs-built_in"> address
</span>    }
  }
`;

const withActiveState = graphql(GET_USERS_ACTIVE_TODOS, {
  props: ({ ownProps, data }) =&gt; ({
    active: ownProps.filter === data.visibilityFilter,
    data,
  }),
});
</code></pre><p>用@client客户指令查询Apollo缓存</p>
<p>如果想要看更多的例子和窍门，想将<code>链路状态(apollo-link-state)</code>整合到程序里去，请到我们<a href="https://www.apollographql.com/docs/link/links/state.html">更新后的文档页</a>。</p>
<h3>1.0版路线图</h3>
<p><code>链路状态(apollo-link-state)</code>模块已经很稳定了，在现在的程序里已经够用了，不过我们还是想尽快弄好一些新的特色：</p>
<ul>
<li><p><strong>客户端模式：</strong> 目前，我们还不支持根据客户端模式进行类型验证。这是因为如果在运行阶段要把<code>graphql-js</code>用于构建验证模式的模块都包括进去，那会极大地增加软件包的大小。与之相反，我们希望能把模式构建转移到生成阶段去，并支持模式自我查询(introspection)，这样大家就仍然可以利用到GraphQL的绝妙特色。</p>
</li>
<li><p><strong>辅助组件：</strong> 我们的目标是要在Apollo程序中尽量实现无缝状态管理。我们想编写一些React组件，使常规操作不那么冗长，比如在后台实现修改(mutation)本身，同时把变量传进去。</p>
</li>
</ul>
<p>如果对这些问题有兴趣，请加入我们的<a href="https://github.com/apollographql/apollo-link-state">GitHub</a>小组或Apollo Slack的<code>#local-state</code>频道。我们希望有你的参与和帮助，一起塑造下一代状态管理！?</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
状态管理的未来：Apollo的GraphQL语言服务器

## 原文链接
[https://www.zcfy.cc/article/the-future-of-state-management-apollo-graphql](https://www.zcfy.cc/article/the-future-of-state-management-apollo-graphql)

