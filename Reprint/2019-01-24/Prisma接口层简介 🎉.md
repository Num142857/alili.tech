---
title: 'Prisma接口层简介 🎉' 
date: 2019-01-24 2:30:11
hidden: true
slug: sagyq7dhx
categories: [reprint]
---

{{< raw >}}

            <h2>开源GraphQL语言数据库API接口层</h2>
<p>今天我们怀着非常激动的心情宣布<a href="https://www.prismagraphql.com/">Prisma</a>库（曾名Graphcool库1.0版）发布。</p>
<p><strong>Prisma是一个GraphQL语言数据库的代理模块，能将数据库转换成GraphQL语言API接口。</strong> 有了这个API接口，就可以以其作为基础来构建自己的GraphQL语言服务器程序或直接从前台程序连接过来。</p>
<p><img src="https://cdn-images-1.medium.com/max/800/1*9_360jxyWUrGjVxuRz4R5w.png" alt=""></p>
<h3>Prisma如何运作？</h3>
<p>Prisma是一个独立的组件，部署在SQL语言数据库的前面，形成一个GraphQL语言API接口。只要用GraphQL语言的SDL语言定义数据模型，然后用<a href="https://github.com/graphcool/prisma">Prisma命令行</a>工具把更改的部分部署上去，就能以Primsa开始新创建一个GraphQL语言API接口了。</p>
<p>Prisma依照数据模型会生成一个立即可用的GraphQL语言 API接口，提供了一个功能强大的增删读改<a href="https://blog.graph.cool/graphql-server-basics-the-schema-ac5e2950214e">GraphQL语言模式</a>。</p>
<p>举个例子，以下数据模型定义了一个<code>用户(User)</code>类型：</p>
<pre><code class="hljs less"><span class="hljs-selector-tag">type</span> <span class="hljs-selector-tag">User</span> {
  <span class="hljs-attribute">id</span>: ID! <span class="hljs-variable">@unique</span>
  <span class="hljs-attribute">name</span>: String!
}
</code></pre><p>数据模型是所有Prisma服务的基础</p>
<p>由Prisma生成的GraphQL语言模式看起来就是这样的：</p>
<pre><code class="hljs routeros">type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  user(where: UserWhereUniqueInput!):<span class="hljs-built_in"> User
</span>}
<span class="hljs-built_in">
type </span>Mutation {
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!):<span class="hljs-built_in"> User
</span>  deleteUser(where: UserWhereUniqueInput!):<span class="hljs-built_in"> User
</span>}
<span class="hljs-built_in">
type </span>Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}
</code></pre><p>生成后的<strong>Prisma模式</strong>简化版，完整版请看<a href="https://gist.github.com/gc-codesnippets/f302c104f2806f9e13f41d909e07d82d">这里</a></p>
<p>有了这个模式，就能对<code>用户(User)</code>类型进行完全的增删读改操作了。其中包括强大的过滤功能、排序功能和分页功能，以此对数据库里的<code>用户(User)</code>记录进行读写。</p>
<h3>开始使用</h3>
<p>只要安装Prisma命令行程序(CLI)，并使用其<a href="https://www.prismagraphql.com/docs/reference/cli-command-reference/database-service/prisma-init-eeb1ohr4ec">初始<code>init</code></a> 命令，就可以开始使用Prisma库了：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> 安装Prisma命令行(CLI)</span>
npm install -g prisma
<span class="hljs-meta">
#</span><span class="bash"> 初始化Prisma服务。选择`只用数据库(database-only)`</span>
prisma init hello-world
<span class="hljs-meta">
#</span><span class="bash"> 部署安装GraphQL语言API接口</span>
cd hello-world
prisma deploy
<span class="hljs-meta">
#</span><span class="bash"> 开始在活动空间探究API接口吧</span>
prisma playground
</code></pre><blockquote>
<p>初始<code>_prisma init_</code>命令提供给用户交互式提示问答，让用户在<code>_只用数据库(database-only)_</code>设置下探究Prisma，也可以用Node.js平台或TypeScript库，基于<a href="https://github.com/graphcool/graphql-boilerplate">GraphQL样板</a>引导一个GraphQL语言服务器。</p>
</blockquote>
<p>观看这个四分钟的短视频，学习如何使用Prisma构建简单的GraphQL语言服务器：</p>
<p><a href="https://youtu.be/20zGexpEitc">https://youtu.be/20zGexpEitc</a></p>
<p>想要了解更多Prisma入门知识，可以查看<a href="https://www.prismagraphql.com/docs"><strong>文档</strong></a>或以下资源：</p>
<ul>
<li><strong>快速入门</strong>: <a href="https://www.prismagraphql.com/docs/1.0/quickstart/backend/node/node-phe8vai1oo">Node.js</a>，<a href="https://www.prismagraphql.com/docs/1.0/quickstart/backend/typescript/typescript-rohd6ipoo4">TypeScript</a>，<a href="https://www.prismagraphql.com/docs/tutorials/prisma-basics/getting-started-ouzia3ahqu">Prisma基础知识</a></li>
<li><strong>如何使用GraphQL语言</strong>: <a href="https://www.howtographql.com/graphql-js/0-introduction/">用Prisma和Node.js平台复刻Hackernews程序</a></li>
</ul>
<h3>Prisma如何融入GraphQL语言生态圈</h3>
<p>像<a href="https://github.com/apollographql/apollo-server"><code>apollo-server</code></a>，<a href="https://www.prismagraphql.com/docs/graphql-ecosystem/graphql-yoga/overview-chaha122ho"><code>graphql-yoga</code></a>和<a href="https://blog.graph.cool/reusing-composing-graphql-apis-with-graphql-bindings-80a4aa37cff5"><code>GraphQL绑定</code></a>之类的开源工具软件让人们构建GraphQL语言服务器变得非常容易，甚至容易过头了。但是，开发出的GraphQL语言服务器要想处理更复杂的用例，为GraphQL语言API接口实现解析器依然是技术难关。</p>
<p>这正是Prisma想要简化的过程。结合<a href="https://www.prismagraphql.com/docs/graphql-ecosystem/graphql-binding/prisma-binding-gai5urai6u"><code>prisma-bindings</code></a>，Prisma可以使解析器实现更直接，只要通过<a href="https://blog.graph.cool/graphql-schema-stitching-explained-schema-delegation-4c6caf468405"><em>代理(delegating)</em></a>，把收到查询的执行部分分配给底层的Prisma API接口即可。然后这些查询就能由Prisma的查询引擎高效解析。</p>
<p><img src="https://cdn-images-1.medium.com/max/800/1*HL-fBLNk_GHZLUAJ3va9ZQ.gif" alt=""></p>
<p>GraphQL开发人员制作GraphQL APIs接口时，得益于静态绑定能方便使用自动完成功能，与GraphQL Playgrounds/GraphiQL功能类似</p>
<h3>万分感谢整个开发群体 ????</h3>
<p>在Graphcool公司，我们有着一个使命，就是使GraphQL语言程序构建过程尽可能地方便。两年前我们刚开始项目时，GraphQL语言生态圈仍处于起步阶段，开发人员在开始阶段并没有多少工具可以使用。</p>
<p>GraphQL语言要加快普及，最好的方法是提供一种服务型后台方案，这样开发人员就能用自己的GraphQL语言后台程序快速设定并运行。为了让我们的客户项目保有灵活性，<a href="https://blog.graph.cool/introducing-the-graphcool-framework-d9edab2a7816">我们在2017年把整个平台开源化了</a>。</p>
<p>我们为今天要发布的Prisma激动不已，另外能与这样出色的开发群体合作，我们也非常感谢大家！✨</p>
<p>感谢<a href="https://medium.com/@sorenbs?source=post_page">Søren Bramer Schmidt</a></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Prisma接口层简介 🎉

## 原文链接
[https://www.zcfy.cc/article/introducing-prisma-x1f389-graphcool-blog](https://www.zcfy.cc/article/introducing-prisma-x1f389-graphcool-blog)

