---
title: '30分钟理解GraphQL核心概念' 
date: 2018-12-07 2:30:10
hidden: true
slug: g8x5xffigy9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>在上一篇文章<a href="https://segmentfault.com/a/1190000013961872">RPC vs REST vs GraphQL</a>中，对于这三者的优缺点进行了比较宏观的对比，而且我们也会发现，一般比较简单的项目其实并不需要GraphQL，但是我们仍然需要对新的技术有一定的了解和掌握，在新技术普及时才不会措手不及。</p>
<p>这篇文章主要介绍一些我接触GraphQL的这段时间，觉得需要了解的比较核心的概念，比较适合一下人群：</p>
<ul>
<li>听说过GraphQL的读者，想深入了解一下</li>
<li>想系统地学习GraphQL的读者</li>
<li>正在调研GraphQL技术的读者</li>
</ul>
<p>这些概念并不局限于服务端或者是客户端，如果你熟悉这些概念，在接触任意使用GraphQL作为技术背景的库或者框架时，都可以通过文档很快的上手。</p>
<p>如果你已经GraphQL应用于了实际项目中，那么这篇文章可能不适合你，因为其中并没有包含一些实践中的总结和经验，关于实践的东西我会在之后再单另写一篇文章总结。</p>
<h2 id="articleHeader1">什么是GraphQL</h2>
<p>介绍GraphQL是什么的文章网上一搜一大把，篇幅有长有短，但是从最核心上讲，它是一种查询语言，再进一步说，是一种API查询语言。</p>
<p>这里可能有的人就会说，什么？API还能查？API不是用来调用的吗？是的，这正是GraphQL的强大之处，引用官方文档的一句话：</p>
<blockquote>ask exactly what you want.</blockquote>
<p>我们在使用REST接口时，接口返回的数据格式、数据类型都是后端预先定义好的，如果返回的数据格式并不是调用者所期望的，作为前端的我们可以通过以下两种方式来解决问题：</p>
<ul>
<li>和后端沟通，改接口（更改数据源）</li>
<li>自己做一些适配工作（处理数据源）</li>
</ul>
<p>一般如果是个人项目，改后端接口这种事情可以随意搞，但是如果是公司项目，改后端接口往往是一件比较敏感的事情，尤其是对于三端（web、andriod、ios）公用同一套后端接口的情况。大部分情况下，均是按第二种方式来解决问题的。</p>
<p>因此如果接口的返回值，可以通过某种手段，从静态变为动态，即调用者来声明接口返回什么数据，很大程度上可以进一步解耦前后端的关联。</p>
<p>在GraphQL中，我们通过预先定义一张<code>Schema</code>和声明一些<code>Type</code>来达到上面提及的效果，我们需要知道：</p>
<ul>
<li>对于数据模型的抽象是通过Type来描述的</li>
<li>对于接口获取数据的逻辑是通过Schema来描述的</li>
</ul>
<p>这么说可能比较抽象，我们一个一个来说明。</p>
<h2 id="articleHeader2">Type</h2>
<p>对于数据模型的抽象是通过Type来描述的，每一个Type有若干Field组成，每个Field又分别指向某个Type。</p>
<p>GraphQL的Type简单可以分为两种，一种叫做<code>Scalar Type(标量类型)</code>，另一种叫做<code>Object Type(对象类型)</code>。</p>
<h3 id="articleHeader3">Scalar Type</h3>
<p>GraphQL中的内建的标量包含，<code>String</code>、<code>Int</code>、<code>Float</code>、<code>Boolean</code>、<code>Enum</code>，对于熟悉编程语言的人来说，这些都应该很好理解。</p>
<p>值得注意的是，GraphQL中可以通过<code>Scalar</code>声明一个新的标量，比如：</p>
<ul>
<li>prisma（一个使用GraphQL来抽象数据库操作的库）中，还有<code>DateTime</code>和<code>ID</code>这两个标量分别代表日期格式和主键</li>
<li>在使用GraphQL实现文件上传接口时，需要声明一个<code>Upload</code>标量来代表要上传的文件</li>
</ul>
<p>总之，我们只需要记住，标量是GraphQL类型系统中最小的颗粒，关于它在GraphQL解析查询结果时，我们还会再提及它。</p>
<h3 id="articleHeader4">Object Type</h3>
<p>仅有标量是不够的抽象一些复杂的数据模型的，这时候我们需要使用对象类型，举个例子(先忽略语法，仅从字面上看)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Article {
  id: ID
  text: String
  isPublished: Boolean
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-keyword">type</span> <span class="hljs-type">Article</span> {
  id: <span class="hljs-type">ID</span>
  text: <span class="hljs-type">String</span>
  isPublished: <span class="hljs-type">Boolean</span>
}</code></pre>
<p>上面的代码，就声明了一个<code>Article</code>类型，它有3个Field，分别是<code>ID</code>类型的id，<code>String</code>类型的text和<code>Boolean</code>类型的isPublished。</p>
<p>对于对象类型的Field的声明，我们一般使用标量，但是我们也可以使用另外一个对象类型，比如如果我们再声明一个新的<code>User</code>类型，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type User {
  id: ID
  name: String
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">type</span> <span class="hljs-keyword">User</span> <span class="hljs-title">{
  id</span>: ID
  name: <span class="hljs-keyword">String</span>
}</code></pre>
<p>这时我们就可以稍微的更改一下关于<code>Article</code>类型的声明代码，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Article {
  id: ID
  text: String
  isPublished: Boolean
  author: User
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-keyword">type</span> <span class="hljs-type">Article</span> {
  id: <span class="hljs-type">ID</span>
  text: <span class="hljs-type">String</span>
  isPublished: <span class="hljs-type">Boolean</span>
  author: <span class="hljs-type">User</span>
}</code></pre>
<p><code>Article</code>新增的<code>author</code>的Field是<code>User</code>类型, 代表这篇文章的作者。</p>
<p>总之，我们通过对象模型来构建GraphQL中关于一个数据模型的形状，同时还可以声明各个模型之间的内在关联（一对多、一对一或多对多）。</p>
<h3 id="articleHeader5">Type Modifier</h3>
<p>关于类型，还有一个较重要的概念，即类型修饰符，当前的类型修饰符有两种，分别是<code>List</code>和<code>Required </code>，它们的语法分别为<code>[Type]</code>和<code>Type!</code>, 同时这两者可以互相组合，比如<code>[Type]!</code>或者<code>[Type!]</code>或者<code>[Type!]!</code>(请仔细看这里<code>!</code>的位置)，它们的含义分别为：</p>
<ul>
<li>列表本身为必填项，但其内部元素可以为空</li>
<li>列表本身可以为空，但是其内部元素为必填</li>
<li>列表本身和内部元素均为必填</li>
</ul>
<p>我们进一步来更改上面的例子，假如我们又声明了一个新的<code>Comment</code>类型，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Comment {
  id: ID!
  desc: String,
  author: User!
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-keyword">type</span> <span class="hljs-type">Comment</span> {
  id: <span class="hljs-type">ID</span>!
  desc: <span class="hljs-type">String</span>,
  author: <span class="hljs-type">User</span>!
}</code></pre>
<p>你会发现这里的<code>ID</code>有一个<code>!</code>，它代表这个Field是必填的，再来更新<code>Article</code>对象，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Article {
  id: ID!
  text: String
  isPublished: Boolean
  author: User!
  comments: [Comment!]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-keyword">type</span> <span class="hljs-type">Article</span> {
  id: <span class="hljs-type">ID</span>!
  text: <span class="hljs-type">String</span>
  isPublished: <span class="hljs-type">Boolean</span>
  author: <span class="hljs-type">User</span>!
  comments: [<span class="hljs-type">Comment</span>!]
}</code></pre>
<p>我们这里的作出的更改如下：</p>
<ul>
<li>id字段改为必填</li>
<li>author字段改为必填</li>
<li>新增了comments字段，它的类型是一个元素为Comment类型的List类型</li>
</ul>
<p>最终的<code>Article</code>类型，就是GraphQL中关于文章这个数据模型，一个比较简单的类型声明。</p>
<h2 id="articleHeader6">Schema</h2>
<p>现在我们开始介绍<code>Schema</code>，我们之前简单描述了它的作用，即它是用来描述<code>对于接口获取数据逻辑</code>的，但这样描述仍然是有些抽象的，我们其实不妨把它当做REST架构中每个独立资源的<code>uri</code>来理解它，只不过在GraphQL中，我们用Query来描述资源的获取方式。因此，我们可以将<code>Schema</code>理解为多个Query组成的一张表。</p>
<p>这里又涉及一个新的概念<code>Query</code>，GraphQL中使用<code>Query</code>来抽象数据的查询逻辑，当前标准下，有三种查询类型，分别是<em>query（查询）</em>、<em>mutation（更改）</em>和<em>subscription（订阅）</em>。 </p>
<p>Note: 为了方便区分，<code>Query</code>特指GraphQL中的查询（包含三种类型），<code>query</code>指GraphQL中的查询类型（仅指查询类型）</p>
<h3 id="articleHeader7">Query</h3>
<p>上面所提及的3中基本查询类型是作为<code>Root Query（根查询）</code>存在的，对于传统的CRUD项目，我们只需要前两种类型就足够了，第三种是针对当前日趋流行的<code>real-time</code>应用提出的。</p>
<p>我们按照字面意思来理解它们就好，如下：</p>
<ul>
<li>query（查询）：当获取数据时，应当选取Query类型</li>
<li>mutation（更改）：当尝试修改数据时，应当使用mutation类型</li>
<li>subscription（订阅）：当希望数据更改时，可以进行消息推送，使用subscription类型</li>
</ul>
<p>仍然以一个例子来说明。</p>
<p>首先，我们分别以REST和GraphQL的角度，以<code>Article</code>为数据模型，编写一系列CRUD的接口，如下：</p>
<p>Rest 接口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET /api/v1/articles/
GET /api/v1/article/:id/
POST /api/v1/article/
DELETE /api/v1/article/:id/
PATCH /api/v1/article/:id/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>GET <span class="hljs-meta-keyword">/api/</span>v1<span class="hljs-meta-keyword">/articles/</span>
GET <span class="hljs-meta-keyword">/api/</span>v1<span class="hljs-meta-keyword">/article/</span>:id/
POST <span class="hljs-meta-keyword">/api/</span>v1<span class="hljs-meta-keyword">/article/</span>
DELETE <span class="hljs-meta-keyword">/api/</span>v1<span class="hljs-meta-keyword">/article/</span>:id/
PATCH <span class="hljs-meta-keyword">/api/</span>v1<span class="hljs-meta-keyword">/article/</span>:id/
</code></pre>
<p>GraphQL Query</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="query {
  articles(): [Article!]!
  article(id: Int): Article!
}

mutation {
  createArticle(): Article!
  updateArticle(id: Int): Article!
  deleteArticle(id: Int): Article!
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">query</span> {
  <span class="hljs-selector-tag">articles</span>(): <span class="hljs-selector-attr">[Article!]</span>!
  <span class="hljs-selector-tag">article</span>(<span class="hljs-attribute">id</span>: Int): <span class="hljs-selector-tag">Article</span>!
}

<span class="hljs-selector-tag">mutation</span> {
  <span class="hljs-selector-tag">createArticle</span>(): <span class="hljs-selector-tag">Article</span>!
  <span class="hljs-selector-tag">updateArticle</span>(<span class="hljs-attribute">id</span>: Int): <span class="hljs-selector-tag">Article</span>!
  <span class="hljs-selector-tag">deleteArticle</span>(<span class="hljs-attribute">id</span>: Int): <span class="hljs-selector-tag">Article</span>!
}</code></pre>
<p>对比我们较熟悉的REST的接口我们可以发现，GraphQL中是按根查询的类型来划分Query职能的，同时还会明确的声明每个Query所返回的数据类型，这里的关于类型的语法和上一章节中是一样的。需要注意的是，我们所声明的任何<code>Query</code>都必须是<code>Root Query</code>的子集，这和GraphQL内部的运行机制有关。</p>
<p>例子中我们仅仅声明了Query类型和Mutation类型，如果我们的应用中对于评论列表有<code>real-time</code>的需求的话，在REST中，我们可能会直接通过长连接或者通过提供一些带验证的获取长连接url的接口，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="POST /api/v1/messages/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">POST <span class="hljs-regexp">/api/</span>v1<span class="hljs-regexp">/messages/</span></code></pre>
<p>之后长连接会将新的数据推送给我们，在GraphQL中，我们则会以更加声明式的方式进行声明，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="subscription {
  updatedArticle() {
    mutation
    node {
        comments: [Comment!]!
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>subscription {
  updatedArticle() {
    mutation
    <span class="hljs-keyword">node</span> <span class="hljs-title">{
        comments</span>: [Comment!]!
    }
  }
}</code></pre>
<p>我们不必纠结于这里的语法，因为这篇文章的目的不是让你在30分钟内学会GraphQL的语法，而是理解的它的一些核心概念，比如这里，我们就声明了一个订阅Query，这个Query会在有新的Article被创建或者更新时，推送新的数据对象。当然，在实际运行中，其内部实现仍然是建立于长连接之上的，但是我们能够以更加声明式的方式来进行声明它。</p>
<h3 id="articleHeader8">Resolver</h3>
<p>如果我们仅仅在Schema中声明了若干Query，那么我们只进行了一半的工作，因为我们并没有提供相关Query所返回数据的逻辑。为了能够使GraphQL正常工作，我们还需要再了解一个核心概念，<code>Resolver（解析函数）</code>。</p>
<p>GraphQL中，我们会有这样一个约定，Query和与之对应的Resolver是同名的，这样在GraphQL才能把它们对应起来，举个例子，比如关于<code>articles(): [Article!]!</code>这个Query, 它的Resolver的名字必然叫做<code>articles</code>。</p>
<p>在介绍Resolver之前，是时候从整体上了解下GraphQL的内部工作机制了，假设现在我们要对使用我们已经声明的<code>articles</code>的Query，我们可能会写以下查询语句（同样暂时忽略语法）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Query {
  articles {
       id
       author {
           name
       }
       comments {
      id
      desc
      author
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">Query</span> {
  <span class="hljs-section">articles</span> {
       <span class="hljs-attribute">id</span>
       author {
           <span class="hljs-attribute">name</span>
       }
       comments {
      <span class="hljs-attribute">id</span>
      desc
      author
    }
  }
}</code></pre>
<p>GraphQL在解析这段查询语句时会按如下步骤（简略版）：</p>
<ul>
<li>首先进行第一层解析，当前<code>Query</code>的<code>Root Query</code>类型是<code>query</code>，同时需要它的名字是<code>articles</code>
</li>
<li>之后会尝试使用<code>articles</code>的<code>Resolver</code>获取解析数据，第一层解析完毕</li>
<li>
<p>之后对第一层解析的返回值，进行第二层解析，当前<code>articles</code>还包含三个子<code>Query</code>，分别是<code>id</code>、<code>author</code>和<code>comments</code></p>
<ul>
<li>id在Author类型中为标量类型，解析结束</li>
<li>author在Author类型中为对象类型User，尝试使用<code>User</code>的<code>Resolver</code>获取数据，当前field解析完毕</li>
<li>之后对第二层解析的返回值，进行第三层解析，当前<code>author</code>还包含一个<code>Query</code>, <code>name</code>，由于它是标量类型，解析结束</li>
<li>comments同上...</li>
</ul>
</li>
</ul>
<p>我们可以发现，GraphQL大体的解析流程就是遇到一个Query之后，尝试使用它的Resolver取值，之后再对返回值进行解析，这个过程是递归的，直到所解析Field的类型是<code>Scalar Type（标量类型）</code>为止。解析的整个过程我们可以把它想象成一个很长的Resolver Chain（解析链）。</p>
<p>这里对于GraphQL的解析过程只是很简单的概括，其内部运行机制远比这个复杂，当然这些对于使用者是黑盒的，我们只需要大概了解它的过程即可。</p>
<p>Resolver本身的声明在各个语言中是不一样的，因为它代表数据获取的具体逻辑。它的函数签名(以js为例子)如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(parent, args, ctx, info) {
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(parent, args, ctx, info)</span> </span>{
    ...
}</code></pre>
<p>其中的参数的意义如下：</p>
<ul>
<li>parent: 当前上一个Resolver的返回值</li>
<li>args: 传入某个Query中的函数（比如上面例子中<code>article(id: Int)</code>中的<code>id</code>）</li>
<li>ctx: 在Resolver解析链中不断传递的中间变量（类似中间件架构中的context）</li>
<li>info: 当前Query的AST对象</li>
</ul>
<p>值得注意的是，Resolver内部实现对于GraphQL完全是黑盒状态。这意味着Resolver如何返回数据、返回什么样的数据、从哪返回数据，完全取决于Resolver本身，基于这一点，在实际中，很多人往往把GraphQL作为一个中间层来使用，数据的获取通过Resolver来封装，内部数据获取的实现可能基于RPC、REST、WS、SQL等多种不同的方式。同时，基于这一点，当你在对一些未使用GraphQL的系统进行迁移时（比如REST），可以很好的进行增量式迁移。</p>
<h2 id="articleHeader9">总结</h2>
<p>大概就这么多，首先感谢你耐心的读到这里，虽然题目是30分钟熟悉GraphQL核心概念，但是可能已经超时了，不过我相信你对GraphQL中的核心概念已经比较熟悉了。但是它本身所涉及的东西远远比这个丰富，同时它还处于飞速的发展中。</p>
<p>最后我尝试根据这段时间的学习GraphQL的经验，提供一些进一步学习和了解GraphQL的方向和建议，仅供参考：</p>
<h3 id="articleHeader10">想进一步了解GraphQL本身</h3>
<p>我建议再仔细去官网，读一下官方文档，如果有兴趣的话，看看GraphQL的spec也是极好的。这篇文章虽然介绍了核心概念，但是其他一些概念没有涉及，比如Union、Interface、Fragment等等，这些概念均是基于核心概念之上的，在了解核心概念后，应当会很容易理解。</p>
<h3 id="articleHeader11">偏向服务端</h3>
<p>偏向服务端方向的话，除了需要进一步了解GraphQL在某个语言的具体生态外，还需要了解一些关于缓存、上传文件等特定方向的东西。如果是想做系统迁移，还需要对特定的框架做一些调研，比如graphene-django。</p>
<p>如果是想使用GraphQL本身做系统开发，这里推荐了解一个叫做<a href="https://www.prisma.io/docs/" rel="nofollow noreferrer" target="_blank">prisma</a>的框架，它本身是在GraphQL的基础上构建的，并且与一些GraphQL的生态框架兼容性也较好，在各大编程语言也均有适配，它本身可以当做一个ORM来使用，也可以当做一个与数据库交互的中间层来使用。</p>
<h3 id="articleHeader12">偏向客户端</h3>
<p>偏向客户端方向的话，需要进一步了解关于graphql-client的相关知识，我这段时间了解的是apollo，一个开源的grapql-client框架，并且与各个主流前端技术栈如Angular、React等均有适配版本，使用感觉良好。</p>
<p>同时，还需要了解一些额外的查询概念，比如分页查询中涉及的Connection、Edge等。</p>
<p>大概就这么多，如有错误，还望指正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
30分钟理解GraphQL核心概念

## 原文链接
[https://segmentfault.com/a/1190000014131950](https://segmentfault.com/a/1190000014131950)

