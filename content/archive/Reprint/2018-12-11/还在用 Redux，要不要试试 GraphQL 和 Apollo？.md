---
title: '还在用 Redux，要不要试试 GraphQL 和 Apollo？' 
date: 2018-12-11 2:30:10
hidden: true
slug: hz02a1jaqpp
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">还在用 Redux，要不要试试 GraphQL &amp; Apollo？</h1>
<p><span class="img-wrap"><img data-src="/img/bV48Lu?w=618&amp;h=602" src="https://static.alili.tech/img/bV48Lu?w=618&amp;h=602" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>前段时间刷 Twitter 的时候看到大 V 纷纷提到 Apollo，预测它将在 2018 年崛起。正巧碰上有使用 GraphQL 的机会，在大概翻了下 Apollo 的文档之后，我下定决心在新的前端项目里尝试下抛开已经熟悉的 Redux，完全使用 Apollo 来写数据层。一个月后的现在，我必须出来好好赞美下这位“太阳神”了。</p>
<h2 id="articleHeader1">GraphQL</h2>
<p>转眼已经 2018 年了，GraphQL 已不再是个新鲜的名词了。15 年短暂的掀起一波讨论之后，似乎也没有听到多少它的声音了。然而 Github 在这几年里慢慢成熟，Github 也将新版 api 完全用 GraphQL 实现。在这里我就不展开讨论 GraphQL 的本身了，它让前后端之间的数据获取变得更加简单。</p>
<h2 id="articleHeader2">Redux</h2>
<p>提到前端数据管理，最先想到的就是 Redux，我想很多人都体验过对 Redux 从陌生到熟悉的各个阶段，大致应该是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/bV48LC?w=1492&amp;h=830" src="https://static.alili.tech/img/bV48LC?w=1492&amp;h=830" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>开始：Facebook 设计的 Flux 架构，很厉害的样子，大家都在用那我也用吧</li>
<li>半年：数据管理变的清晰些，终于不用在组件里来回混乱的 setState 了</li>
<li>一年：我就是个 CRUD 工程师，写个千篇一律的列表，表单页用 redux 真是折腾，多些了多少代码啊</li>
<li>一年半：看了 redux-action，redux-promise，dva， mirror ...，根据团队的业务场景定制了最合适的中间件和插件。代码又变的简洁啦</li>
<li>两年：该折腾的都折腾过了。有点累了，但是也离不开了。</li>
</ul>
<p>为什么累了呢？因为 Flux 的单向数据流对你来说已经不再新鲜了。大部分时候，store 里存放的都是从后端请求来的数据，对于它们而言，怎么样做 dispatch 和 reduce 其实并不是关键，反倒是怎么设计 store 值得考虑。</p>
<h1 id="articleHeader3">当 Redux 遇上业务需求</h1>
<p>让我们直接以一个真实的场景作为例子吧：</p>
<p><span class="img-wrap"><img data-src="/img/bV48LJ?w=1280&amp;h=658" src="https://static.alili.tech/img/bV48LJ?w=1280&amp;h=658" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这是一个很常见的评论列表，拿到需求后我们就开始写我们的 <code>&lt;Comments /&gt;</code> 组件了，在 Redux 的范式下，我们难免要按照这个逻辑来写：</p>
<ol>
<li>在 <code>Comments</code> 的 <code>didMount</code> 里，<code>dispatch</code> 一个获取数据的 <code>action</code>，在这个 <code>fetch action</code> 内发送请求。为了做 loading，我们很可能要再 dispatch 一个 action 去通知 redux 我们发起了一个请求。</li>
<li>如果请求顺利成功了，我们 dispatch 一个请求数据成功的 action，然后在 reducer 内处理并更新数据。</li>
<li>在 <code>Comments</code> 内我们收到了 props 传来的数据，正式开始渲染</li>
</ol>
<p>我们大量的工作花费在了如何获取数据上。而我们面临的挑战又是什么呢？看几个产品经理们可能会提的需求</p>
<ol><li>用户创建或修改评论，要能立刻在列表中看到更新；</li></ol>
<p>简单，重新请求一遍整个列表接口就好了！一般而言确实足够了，不过要求高的产品可能会要求你做”乐观“更新来让体验更好。这也没什么问题，加个 <code>reducer</code> 就是。</p>
<ol><li>当鼠标 hover 在用户头像上的时候，要弹出用户的详细数据（个人简介，联系方式...）</li></ol>
<p>首先你会想，后端大哥能不能把这些字段都帮我加在评论的接口数据里，他毫不犹豫的拒绝了你，拿出一个 commonUser 的接口让你自己去调。细一想用户数据量不小，评论里也有大量的相同用户，不放在列表里也确实合理。心一横，干脆把前端这里的数据结构全部 normalize 化，按用户 id 为 key 用哈希表来存放数据。也就一个下午，你得到了一个非常完美的解决方案。</p>
<p>面对这样的场景，我们写了太多的 <em>命令式</em> 代码，我们一步步的描述了怎么去获取评论数据，在得到评论数据后再提取出所有的用户 id，去重后再次请求获取所有的用户数据，等等。我们还需要考虑缓 normalize, 缓存，乐观更新等等细节上的问题。而这些，恰恰是 redux 帮不了我们的。于是我们会基于 Redux 封装更强大的库和框架，但真正 focus 在数据获取上的好像还真没看到非常合适的。</p>
<h1 id="articleHeader4">Declarative（声明式） vs Imperative（命令式）</h1>
<p>那么在 Apollo 的世界里是什么样的呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { graphql } from 'react-apollo';

const CommentsQuery = gql`
    query Comments() {
        comments {
            id
            content
            creator {
                id
                name
            }
        }
    }
`;

export default graphql(CommentsQuery)(Comments);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { graphql } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-apollo'</span>;

<span class="hljs-keyword">const</span> CommentsQuery = gql<span class="hljs-string">`
    query Comments() {
        comments {
            id
            content
            creator {
                id
                name
            }
        }
    }
`</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> graphql(CommentsQuery)(Comments);</code></pre>
<p>我们使用了 <code>graphql</code>(类比到 redux 中的 connect) 作为高阶组件将一条 GraphQL 的查询语句绑定到了 Comments 组件上，然后你所有的一切就准备就绪了。这么简单么？是的，我们不再需要描述怎么在 didMount 里发送请求，怎么处理请求来的数据。而是委托 Apollo 帮我们处理这些所有事情，它会称职的帮我们在需要的时候发送请求获取数据，然后将 data 映射到 Comments 的 props 中交给我们。</p>
<p><span class="img-wrap"><img data-src="/img/bV48LQ?w=689&amp;h=378" src="https://static.alili.tech/img/bV48LQ?w=689&amp;h=378" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>不止于此，当我们做更新操作的时候也会便捷许多。比如修改一条评论。我们定义一个 graphql 的 mutation 操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...

const updateComment = gql`
    mutation UpdateComment($id: Int!, $content: String!) {
      UpdateComment(id: $id, content: $content) {
        id
        content
        gmtModified
      }
    }
`;

class Comments extends React.Component {
    // ...
    onUpdateComment(id, content) {
        this.props.updateComment(id, content);
    }
    
    // ...
}

export default graphql(updateComment)(graphql(CommentsQuery)(Comments));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="es6"><span class="hljs-comment">// ...</span>

const updateComment = gql`
    mutation <span class="hljs-type">UpdateComment</span>($id: <span class="hljs-type">Int</span>!, $content: <span class="hljs-type">String</span>!) {
      <span class="hljs-type">UpdateComment</span>(id: $id, content: $content) {
        id
        content
        gmtModified
      }
    }
`;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Comments</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">// ...</span>
    onUpdateComment(id, content) {
        <span class="hljs-keyword">this</span>.props.updateComment(id, content);
    }
    
    <span class="hljs-comment">// ...</span>
}

export <span class="hljs-keyword">default</span> graphql(updateComment)(graphql(<span class="hljs-type">CommentsQuery</span>)(<span class="hljs-type">Comments</span>));</code></pre>
<p>当我们调用 updateComment 时，你就会神奇的发现，列表中的评论数据自动更新了。这是因为 apollo-client 把数据按照类型自动缓存在了 cache 中，GraphQL 节点返回的任何数据都会自动被用来更新缓存，在 UpdateComment 这个 mutation 中，我们定义了它的返回值，一条类型为 Comment 的新修改评论，并且指定了需要接受的字段，<code>content</code> 和 <code>gmtModified</code>。这样，apollo-client 就会自动通过 id 和类型去更新缓存中的数据，从而重新渲染我们的列表。</p>
<p>再看看剩下的需求，我们需要在鼠标停留在用户头像时展开用户详情。这个需求下我们不仅仅需要定义我们需要什么数据，还会关心“怎么”获取数据（在 hover 头像时发送请求）。Apollo 同样为我们提供了 “命令式” 的支持。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class UserItem extends React.Component {
    // ...
    onHover() {
        const { client, id } = this.props;
        
        client.query({
           query: UserQuery,
           variables: { id }
        }).then(data => {
            this.setState({ fullUserInfo: data });
        });
    }
}

export default withApollo(UserItem);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="es6"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UserItem</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">// ...</span>
    onHover() {
        const { client, id } = <span class="hljs-keyword">this</span>.props;
        
        client.query({
           query: <span class="hljs-type">UserQuery</span>,
           variables: { id }
        }).then(data =&gt; {
            <span class="hljs-keyword">this</span>.setState({ fullUserInfo: data });
        });
    }
}

export <span class="hljs-keyword">default</span> withApollo(<span class="hljs-type">UserItem</span>);</code></pre>
<p>幸运的是这里我们依然不需要自己考虑缓存的问题。得益于 Apollo 全局的数据缓存，当我们查询过用户 A 之后，再次查询相同 id 的数据会直接命中缓存，apollo-client 会直接 resolve 缓存中的数据，并不发送请求。这时候问题来了，假设我就是想要每次都重新查询呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="client.query({
   query: UserQuery,
   variables: { id },
   fetchPolicy: 'cache-and-network'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">client.query({
   <span class="hljs-attr">query</span>: UserQuery,
   <span class="hljs-attr">variables</span>: { id },
   <span class="hljs-attr">fetchPolicy</span>: <span class="hljs-string">'cache-and-network'</span>
});</code></pre>
<p>Apollo 给我们提供了很多策略来自定义缓存逻辑，比如默认的 <code>cache-first</code> (优先使用缓存)，这里的 <code>cache-and-network</code>（先使用缓存，同时发请求更新），以及 <code>cache-only</code> 和 <code>network-only</code>。</p>
<p>这些就是 GraphQL 和 Apollo 很吸引我的一些地方。当你开始从 GraphQL 的角度来思考，你更多的关心的是你的业务组件需要什么数据，而不是怎么一步步的获得它。而剩下的大部分业务场景，都可以通过前端的数据类型推导和缓存自动解决掉。当然，篇幅有限，还有很多优雅的地方来不及提及，比如分页，直接操作缓存达到乐观更新，轮询查询，以及数据订阅等等。如果有机会的话我们可以继续深入探讨。</p>
<h2 id="articleHeader5">REST 和其他本地状态 ？</h2>
<p>看到这里，你可能会觉得 “GraphQL 很酷，Apollo 也很酷，但是我的后端是 REST，目前是与他们无缘了”。其实不然，从 Apollo Client 的 2.0 版本开始引入了 Apollo Link，理论上来说我们可以通过 GraphQL 从任何类型的数据源获取数据。</p>
<p><span class="img-wrap"><img data-src="/img/bV48LZ?w=1552&amp;h=950" src="https://static.alili.tech/img/bV48LZ?w=1552&amp;h=950" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>“通过 GraphQL“ 意味着我们可以使用书写 GraphQL 的查询语句来获取无论是 rest api 或是 client state 中的数据，这样 Apollo Client 可以替我们管理应用中所有的数据，包括缓存和数据拼接。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const MIXED_QUERY = gql`
    query UserInfo() {
        // graphql endpoint
        currentUser {
            id
            name
        }
        // client state
        browserInfo @client {
            platform
        }
        // rest api
        messages @rest(route: '/user/messages') @type(type: '[Message]') {
            title
        }
    }
`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> MIXED_QUERY = gql<span class="hljs-string">`
    query UserInfo() {
        // graphql endpoint
        currentUser {
            id
            name
        }
        // client state
        browserInfo @client {
            platform
        }
        // rest api
        messages @rest(route: '/user/messages') @type(type: '[Message]') {
            title
        }
    }
`</span>;</code></pre>
<p>在这样一个 Query 查询中，我们使用 GraphQL 的 directive 拼接了来自于 GraphQL，rest，client state 中的数据，将它们抽象在一起维护。与之类似的，我们还可以封装相应的 mutation 实现。</p>
<h2 id="articleHeader6">尾巴</h2>
<p>以上大概就是我这段时间使用 Apollo 和 GraphQL 的一些浅浅的实践。虽然接触的不深，但我可以感受到 Thinking in GraphQL 为前端带来的更优雅的解决方式，和 Apollo Client 这样一个完整的前端数据层解决方案的高效。我相信在 2018 年，它们会迎来更大的增长，甚至有代替 redux 成为通用数据管理方案的可能。</p>
<p>Apollo 相关的社区也比较活跃，在 <a>dev-blog.apollodata.com</a> 上也经常发表一些很有参考价值的文章，有兴趣可以随便看看~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
还在用 Redux，要不要试试 GraphQL 和 Apollo？

## 原文链接
[https://segmentfault.com/a/1190000013579354](https://segmentfault.com/a/1190000013579354)

