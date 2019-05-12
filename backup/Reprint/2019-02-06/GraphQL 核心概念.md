---
title: 'GraphQL 核心概念' 
date: 2019-02-06 2:30:09
hidden: true
slug: otc49i3wh2j
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">A query language created by Facebook for describing data requirements on complex application data models</h2>
<blockquote>
<p>系列文章：</p>
<ol>
<li><p>GraphQL 核心概念(本文)</p></li>
<li><p><a href="https://segmentfault.com/a/1190000006157615">graphql-js 浅尝</a></p></li>
</ol>
</blockquote>
<p>最近因为工作上新产品的需要，让我有机会了解和尝试 <a href="https://github.com/facebook/graphql" rel="nofollow noreferrer" target="_blank">GraphQL</a>。按照套路，在介绍一项新技术的时候总要回答 3 个问题：What, Why &amp; How。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760692?w=410&amp;h=456" src="https://static.alili.tech/img/remote/1460000006760692?w=410&amp;h=456" alt="tradition" title="tradition" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">What is GraphQL?</h2>
<p>正如副标题所说，GraphQL 是由 Facebook 创造的用于描述复杂数据模型的一种查询语言。这里查询语言所指的并不是常规意义上的类似 sql 语句的查询语言，而是一种用于前后端数据查询方式的规范。</p>
<h2 id="articleHeader2">Why using GraphQL?</h2>
<p>当今客户端和服务端主要的交互方式有 2 种，分别是 REST 和 ad hoc 端点。<a href="http://graphql.org/" rel="nofollow noreferrer" target="_blank">GraphQL</a> 官网指出了它们的不足之处主要在于：当需求或数据发生变化时，它们都需要建立新的接口来适应变化，而不断添加的接口，会造成服务器代码的不断增长，即使通过增加接口版本，也并不能够完全限制服务器代码的增长。（更多不足，前往<a href="http://graphql.org/" rel="nofollow noreferrer" target="_blank">官网</a>查看）</p>
<p>既然，GraphQL 指出了它们的缺点，那么它自然解决了这些问题。</p>
<p>如何解决的哪？那就得说说 GraphQL 的 3 大特性。</p>
<ul>
<li><p>首先，它是<strong>声明式的</strong>。查询的结果格式由请求方（即客户端）决定而非响应方（即服务器端）决定，也就是说，一个 GraphQL 查询结果的返回是同客户端请求时的结构一样的，不多不少，不增不减。</p></li>
<li><p>其次，它是<strong>可组合的</strong>。一个 GraphQL 的查询结构是一个有层次的字段集，它可以任意层次地进行嵌套或组合，也就是说它可以通过对字段进行组合、嵌套来满足需求。</p></li>
<li><p>第三，它是<strong>强类型的</strong>。强类型保证，只有当一个 GraphQL 查询满足所设定的查询类型，那么查询的结果才会被执行。</p></li>
</ul>
<p>回到之前的问题，也就是说，当需求或数据发生变化时，客户端可以根据需求来改变查询的结构，只要查询结构满足之前的定义，服务器端代码甚至不需要做任何的修改；即使不满足，也只需修改服务器端的查询结构，而不必额外添加新的接口来满足需求。</p>
<h2 id="articleHeader3">Core Concepts</h2>
<p>可能你会问，按套路这节不该是 HOW to use GraphQL，怎么变成了 Core Concepts？</p>
<p>由于，GraphQL 是一种规范，于是，它的实现不限制某种特定语言，每种语言对 GraphQL 都可以有自己的实现，比如相对 JavaScript 就有 <a href="https://github.com/graphql/graphql-js" rel="nofollow noreferrer" target="_blank">graphql-js</a>。既然，实现都不相同，那么，使用的方法也会不同，所以便不在这里细述了。</p>
<p>这篇文章主要分享的是 GraphQL 的核心概念，主要分为：<code>Type System</code>, <code>Query Syntax</code>, <code>Validation </code> 和 <code>Introspection </code> 四部分。</p>
<h3 id="articleHeader4">Type System</h3>
<p>类型系统是整个 GraphQL 的核心，它用来定义每个查询对象和返回对象的类型，将所有定义的对象组合起来就形成了一整个 GraphQL Schema。</p>
<p>这个概念比较抽象，空说很难理解，还是拿例子来边看边说。个人博客相信大家都很熟悉，这里就尝试用一个简单的博客系统的例子来说明，这会比<a href="http://graphql.org/" rel="nofollow noreferrer" target="_blank">官网</a>星战的例子简单一点。</p>
<p>Let's go!</p>
<p>既然是一个博客，那么，文章肯定少不了，我们首先来建立一个文章的类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Post {
    id: String,
    name: String,
    createDate: String,
    title: String,
    subtitle: String,
    content: String
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-keyword">type</span> <span class="hljs-type">Post</span> {
    id: <span class="hljs-type">String</span>,
    name: <span class="hljs-type">String</span>,
    createDate: <span class="hljs-type">String</span>,
    title: <span class="hljs-type">String</span>,
    subtitle: <span class="hljs-type">String</span>,
    content: <span class="hljs-type">String</span>
}</code></pre>
<p>这样，一个简单的文章类型就定义好了，它是一个自定义的类型，包含了一系列的字段，巧合的是这些字段的类型正好都是 <code>String</code>（字符串类型）。</p>
<p><code>String</code> 没有定义过，为什么可以直接使用哪？因为，<code>String</code> 是 GraphQL 支持的 scalar type(标量类型)，默认的标量类型还包括 <code>Int</code>，<code>Float</code>, <code>Boolean</code> 和 <code>ID</code>。</p>
<p>许多的博客网站都支持给每篇文章打标签，那么我们在来建立一个标签的类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Tag {
    id: String,
    name: String,
    label: String,
    createDate: String
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">type</span> <span class="hljs-keyword">Tag</span> <span class="hljs-title">{
    id</span>: <span class="hljs-keyword">String</span>,
    name: <span class="hljs-keyword">String</span>,
    label: <span class="hljs-keyword">String</span>,
    createDate: <span class="hljs-keyword">String</span>
}</code></pre>
<p>标签类型和文章类型怎么整合到一起哪？</p>
<p>GraphQL 不单单支持简单类型，还支持一些<a href="http://graphql.org/docs/api-reference-type-system/#overview" rel="nofollow noreferrer" target="_blank">其他类型</a>，如 <code>Object</code>, <code>Enum</code>, <code>List</code>, <code>NotNull</code> 这些常见的类型，还有 <code>Interface</code>, <code>Union</code>, <code>InputObject</code> 这几个特殊类型。</p>
<p>PS：一直没搞明白 <code>Interface</code> 和 <code>Union</code> 的区别在哪，它们分别适用于什么场景？谷歌了一下，还真有篇<a href="https://medium.com/the-graphqlhub/graphql-tour-interfaces-and-unions-7dd5be35de0d#.4ywdt7kj4" rel="nofollow noreferrer" target="_blank">文章</a>说它们的区别，不过恕我愚钝，还是没能领悟，还望大神点拨...</p>
<p>再修改一下之前的文章类型，使一个文章可以包含多个标签。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Post {
    id: String,
    name: String,
    createDate: String,
    title: String,
    subtitle: String,
    content: String,
    tags: [Tag]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-keyword">type</span> <span class="hljs-type">Post</span> {
    id: <span class="hljs-type">String</span>,
    name: <span class="hljs-type">String</span>,
    createDate: <span class="hljs-type">String</span>,
    title: <span class="hljs-type">String</span>,
    subtitle: <span class="hljs-type">String</span>,
    content: <span class="hljs-type">String</span>,
    tags: [<span class="hljs-type">Tag</span>]
}</code></pre>
<p>通常在博客网站的标签列表中会显示该标签下的一些文章，由于 GraphQL 是以<strong>产品为中心</strong>的，那么在标签类型下也可以有文章类型。于是，标签类就变成了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Tag {
    id: String,
    name: String,
    label: String,
    createDate: String,
    posts: [Post]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">type</span> <span class="hljs-keyword">Tag</span> <span class="hljs-title">{
    id</span>: <span class="hljs-keyword">String</span>,
    name: <span class="hljs-keyword">String</span>,
    label: <span class="hljs-keyword">String</span>,
    createDate: <span class="hljs-keyword">String</span>,
    posts: [Post]
}</code></pre>
<p>可能你会疑惑，文章类型和标签类型这样相互嵌套会不会造成死循环？我可以负责任的告诉你：不会。你可以尽情地嵌套、组合类型结构来满足你的需求。</p>
<p>最后，根据整个博客网站的需求，组合嵌套刚刚定义的文章类型和标签类型，建立一个根类型作为查询的 schema。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Blog {
    post: Post,        // 查询一篇文章
    posts: [Post],    // 用于博客首页，查询一组文章
    tag: Tag,        // 查询一个标签
    tags: [Tag],    // 用于博客标签页，查询所有标签
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>type <span class="hljs-class">Blog </span>{
<span class="hljs-symbol">    post:</span> Post,        <span class="hljs-comment">// 查询一篇文章</span>
<span class="hljs-symbol">    posts:</span> [Post],    <span class="hljs-comment">// 用于博客首页，查询一组文章</span>
<span class="hljs-symbol">    tag:</span> Tag,        <span class="hljs-comment">// 查询一个标签</span>
<span class="hljs-symbol">    tags:</span> [Tag],    <span class="hljs-comment">// 用于博客标签页，查询所有标签</span>
}</code></pre>
<p>OK，我们的类型和 schema 都定义好了，就可以开始查询了。怎么查哪？那我们来看看 GraphQL 的查询语法。</p>
<h3 id="articleHeader5">Query Syntax</h3>
<p>GraphQL 的查询语法同我们现在所使用的有一大不同是，传输的数据结构并不是 JSON 对象，而是一个字符串，这个字符串描述了客户端希望服务端返回数据的具体结构。</p>
<p>知道了概念，那么一个 GraphQL 的查询到底长什么样哪？继续我们的例子，假设，我们现在要查询一篇文章，那么，GraphQL 的查询语句就可以是这样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="query FetchPostQuery {
    post {
        id,
        name,
        createDate,
        title,
        subtitle,
        content,
        tags {
            name,
            label
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>query FetchPostQuery {
    post {
        id,
        <span class="hljs-keyword">name</span>,
        createDate,
        <span class="hljs-built_in">title</span>,
        <span class="hljs-built_in">subtitle</span>,
        content,
        tags {
            <span class="hljs-keyword">name</span>,
            label
        }
    }
}</code></pre>
<p>它相对应的返回就会是类似这样的一个 JSON 数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;data&quot;: {
        &quot;post&quot;: {
            &quot;id&quot;: &quot;3&quot;,
            &quot;name&quot;: &quot;graphql-core-concepts&quot;,
            &quot;createDate&quot;: &quot;2016-08-01&quot;,
            &quot;title&quot;: &quot;GraphQL 核心概念&quot;,
            &quot;subtitle&quot;: &quot;A query language created by Facebook for decribing data requirements on complex application data models&quot;,
            &quot;content&quot;: &quot;省略...&quot;,
            &quot;tags&quot;: [{
                &quot;name&quot;: &quot;graphql&quot;,
                &quot;label&quot;: &quot;GraphQL&quot;
            }]
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"data"</span>: {
        <span class="hljs-attr">"post"</span>: {
            <span class="hljs-attr">"id"</span>: <span class="hljs-string">"3"</span>,
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"graphql-core-concepts"</span>,
            <span class="hljs-attr">"createDate"</span>: <span class="hljs-string">"2016-08-01"</span>,
            <span class="hljs-attr">"title"</span>: <span class="hljs-string">"GraphQL 核心概念"</span>,
            <span class="hljs-attr">"subtitle"</span>: <span class="hljs-string">"A query language created by Facebook for decribing data requirements on complex application data models"</span>,
            <span class="hljs-attr">"content"</span>: <span class="hljs-string">"省略..."</span>,
            <span class="hljs-attr">"tags"</span>: [{
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"graphql"</span>,
                <span class="hljs-attr">"label"</span>: <span class="hljs-string">"GraphQL"</span>
            }]
        }
    }
}</code></pre>
<p>从中我们可以看到，数据返回了整个文章的属性以及部分的标签属性。其中，标签属性并没有返回全部的字段，而是只返回了 name 和 label 字段的属性，做到了返回数据的结构完成同请求数据的结构相同，没有冗余的数据。</p>
<p>查询添加参数的需求也非常基本，在 GraphQL 的查询语法中也相当简单，就拿刚刚的例子，要查询特定的文章就可以把它改成这样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="query FetchPostQuery {
    post(name: 'graphql-core-concepts') {
        id,
        name,
        createDate,
        title,
        subtitle,
        content,
        tags {
            name,
            label
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>query FetchPostQuery {
    post(<span class="hljs-keyword">name</span>: <span class="hljs-string">'graphql-core-concepts'</span>) {
        id,
        <span class="hljs-keyword">name</span>,
        createDate,
        <span class="hljs-built_in">title</span>,
        <span class="hljs-built_in">subtitle</span>,
        content,
        tags {
            <span class="hljs-keyword">name</span>,
            label
        }
    }
}</code></pre>
<p>返回的结果会是和之前的一样。查询关键字只有在多个查询时才必须，在单个查询时可以省略。同时，也可以对查询的返回起别名，再来看看博客的首页希望展示一个粗略的文章列表，那么这样的一个查询语句可以是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    postList: posts {
        id,
        name,
        createDate,
        title,
        subtitle,
        tags {
            name,
            label
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">postList</span>: posts {
        id,
        name,
        createDate,
        title,
        subtitle,
        tags {
            name,
            label
        }
    }
}</code></pre>
<p>这里，我们省略了查询关键字，并将 <code>posts</code> 起了一个别名为 <code>postList</code>，返回的结果就会是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;data&quot;: {
        &quot;postList&quot;: [{
            &quot;id&quot;: &quot;3&quot;,
            &quot;name&quot;: &quot;graphql-core-concepts&quot;,
            &quot;createDate&quot;: &quot;2016-08-01&quot;,
            &quot;title&quot;: &quot;GraphQL 核心概念&quot;,
            &quot;subtitle&quot;: &quot;A query language created by Facebook for decribing data requirements on complex application data models&quot;,
            &quot;tags&quot;: [{
                &quot;name&quot;: &quot;graphql&quot;,
                &quot;label&quot;: &quot;GraphQL&quot;
            }]
        }, {
            &quot;id&quot;: &quot;2&quot;,
            &quot;name&quot;: &quot;redux-advanced&quot;,
            &quot;createDate&quot;: &quot;2016-07-23&quot;,
            &quot;title&quot;: &quot;Redux 进阶&quot;,
            &quot;subtitle&quot;: &quot;Advanced skill in Redux&quot;,
            &quot;tags&quot;: [{
                &quot;name&quot;: &quot;javascript&quot;,
                &quot;label&quot;: &quot;JavaScript&quot;
            }, {
                &quot;name&quot;: &quot;redux&quot;,
                &quot;label&quot;: &quot;Redux&quot;
            }, {
                &quot;name&quot;: &quot;state-management&quot;,
                &quot;label&quot;: &quot;State management&quot;
            }, {
                &quot;name&quot;: &quot;angular-1.x&quot;,
                &quot;label&quot;: &quot;Angular 1.x&quot;
            }, {
                &quot;name&quot;: &quot;ui-router&quot;,
                &quot;label&quot;: &quot;ui-router&quot;
            }, {
                &quot;name&quot;: &quot;redux-ui-router&quot;,
                &quot;label&quot;: &quot;redux-ui-router&quot;
            }]
        }, {
            &quot;id&quot;: &quot;1&quot;,
            &quot;name&quot;: &quot;getting-started-with-redux&quot;,
            &quot;createDate&quot;: &quot;2016-07-06&quot;,
            &quot;title&quot;: &quot;Redux 入门&quot;,
            &quot;subtitle&quot;: &quot;A tiny predictable state management lib for JavaScript apps&quot;,
            &quot;tags&quot;: [{
                &quot;name&quot;: &quot;javascript&quot;,
                &quot;label&quot;: &quot;JavaScript&quot;
            }, {
                &quot;name&quot;: &quot;redux&quot;,
                &quot;label&quot;: &quot;Redux&quot;
            }, {
                &quot;name&quot;: &quot;state-management&quot;,
                &quot;label&quot;: &quot;State management&quot;
            }, {
                &quot;name&quot;: &quot;angular-1.x&quot;,
                &quot;label&quot;: &quot;Angular 1.x&quot;
            }]
        }]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"data"</span>: {
        <span class="hljs-attr">"postList"</span>: [{
            <span class="hljs-attr">"id"</span>: <span class="hljs-string">"3"</span>,
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"graphql-core-concepts"</span>,
            <span class="hljs-attr">"createDate"</span>: <span class="hljs-string">"2016-08-01"</span>,
            <span class="hljs-attr">"title"</span>: <span class="hljs-string">"GraphQL 核心概念"</span>,
            <span class="hljs-attr">"subtitle"</span>: <span class="hljs-string">"A query language created by Facebook for decribing data requirements on complex application data models"</span>,
            <span class="hljs-attr">"tags"</span>: [{
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"graphql"</span>,
                <span class="hljs-attr">"label"</span>: <span class="hljs-string">"GraphQL"</span>
            }]
        }, {
            <span class="hljs-attr">"id"</span>: <span class="hljs-string">"2"</span>,
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"redux-advanced"</span>,
            <span class="hljs-attr">"createDate"</span>: <span class="hljs-string">"2016-07-23"</span>,
            <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Redux 进阶"</span>,
            <span class="hljs-attr">"subtitle"</span>: <span class="hljs-string">"Advanced skill in Redux"</span>,
            <span class="hljs-attr">"tags"</span>: [{
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"javascript"</span>,
                <span class="hljs-attr">"label"</span>: <span class="hljs-string">"JavaScript"</span>
            }, {
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"redux"</span>,
                <span class="hljs-attr">"label"</span>: <span class="hljs-string">"Redux"</span>
            }, {
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"state-management"</span>,
                <span class="hljs-attr">"label"</span>: <span class="hljs-string">"State management"</span>
            }, {
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"angular-1.x"</span>,
                <span class="hljs-attr">"label"</span>: <span class="hljs-string">"Angular 1.x"</span>
            }, {
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"ui-router"</span>,
                <span class="hljs-attr">"label"</span>: <span class="hljs-string">"ui-router"</span>
            }, {
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"redux-ui-router"</span>,
                <span class="hljs-attr">"label"</span>: <span class="hljs-string">"redux-ui-router"</span>
            }]
        }, {
            <span class="hljs-attr">"id"</span>: <span class="hljs-string">"1"</span>,
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"getting-started-with-redux"</span>,
            <span class="hljs-attr">"createDate"</span>: <span class="hljs-string">"2016-07-06"</span>,
            <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Redux 入门"</span>,
            <span class="hljs-attr">"subtitle"</span>: <span class="hljs-string">"A tiny predictable state management lib for JavaScript apps"</span>,
            <span class="hljs-attr">"tags"</span>: [{
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"javascript"</span>,
                <span class="hljs-attr">"label"</span>: <span class="hljs-string">"JavaScript"</span>
            }, {
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"redux"</span>,
                <span class="hljs-attr">"label"</span>: <span class="hljs-string">"Redux"</span>
            }, {
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"state-management"</span>,
                <span class="hljs-attr">"label"</span>: <span class="hljs-string">"State management"</span>
            }, {
                <span class="hljs-attr">"name"</span>: <span class="hljs-string">"angular-1.x"</span>,
                <span class="hljs-attr">"label"</span>: <span class="hljs-string">"Angular 1.x"</span>
            }]
        }]
    }
}</code></pre>
<p>同样，查询所有标签的语句就可以是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    tags {
        id,
        name,
        label,
        posts {
            name,
            title
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>{
    tags {
        <span class="hljs-built_in">id</span>,
        <span class="hljs-built_in">name</span>,
        label,
        posts {
            <span class="hljs-built_in">name</span>,
            title
        }
    }
}</code></pre>
<p>这样，一个 GraphQL 的接口，满足了一个简单博客网站的所有需求，是不是很神奇？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006132989" src="https://static.alili.tech/img/remote/1460000006132989" alt="萌呆" title="萌呆" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">Validation</h3>
<p>由于 GraphQL 是一个强类型语言，所以它可以在执行查询之前检查每个查询语句是否满足事先设定的 schema，符合则合法，如果查询语句不合法则不进行查询。</p>
<p>以上所举的都是合法的例子，<a href="http://graphql.org/docs/validation/" rel="nofollow noreferrer" target="_blank">官网</a>上举了一些例子，这里就不贴了，我们就总结看看要注意的有哪几点。</p>
<ol>
<li><p><code>fragment</code> 不能引用自己从而形成一个循环</p></li>
<li><p>不能查询类型中不存在的字段</p></li>
<li><p>查询的字段如果不是 scalar type(标量类型)或 enum type（枚举类型），则需要明确该字段下所包含的字段</p></li>
<li><p>同上一条相对，如果查询字段是 scalar type(标量类型)，那么它就不能再有子字段</p></li>
</ol>
<h3 id="articleHeader7">Introspection</h3>
<p>Introspection 这个词的意思是内省，自我检查（第一次发现英语有语义如此丰富的词，又暴露词汇量少了-_-||）。</p>
<p>不扯远了，在 GraphQL 中 Introspection 是一个非常有用的功能，它可以用来查询当前 GraphQL 的 schema，从而得知服务器端支持何种类型的查询。</p>
<p>这是一个非常强大且有用的功能，可以想象一下，现在大型公司的开发基本上都是前后端分离的，客户端并不知道服务器端提供的 schema 结构，但通过 Introspection，客户端就能获得当前服务器端所提供的 schema，这无论对开发，还是调试错误都很有帮助。</p>
<p>还是拿刚刚的博客系统来做例子，我们可以通过查询 <code>__schema</code> 字段来获得当前所支持的查询类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// query string
{
    __schema {
        types {
            name
        }
    }
}

// response data
{
  &quot;data&quot;: {
    &quot;__schema&quot;: {
      &quot;types&quot;: [
        {
          &quot;name&quot;: &quot;String&quot;
        },
        {
          &quot;name&quot;: &quot;BlogType&quot;
        },
        {
          &quot;name&quot;: &quot;PostType&quot;
        },
        {
          &quot;name&quot;: &quot;ID&quot;
        },
        {
          &quot;name&quot;: &quot;TagType&quot;
        },
        {
          &quot;name&quot;: &quot;__Schema&quot;
        },
        {
          &quot;name&quot;: &quot;__Type&quot;
        },
        {
          &quot;name&quot;: &quot;__TypeKind&quot;
        },
        {
          &quot;name&quot;: &quot;Boolean&quot;
        },
        {
          &quot;name&quot;: &quot;__Field&quot;
        },
        {
          &quot;name&quot;: &quot;__InputValue&quot;
        },
        {
          &quot;name&quot;: &quot;__EnumValue&quot;
        },
        {
          &quot;name&quot;: &quot;__Directive&quot;
        },
        {
          &quot;name&quot;: &quot;__DirectiveLocation&quot;
        }
      ]
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>// query string
{
    __schema {
        types {
            name
        }
    }
}

// response data
{
  <span class="hljs-string">"data"</span>: {
    <span class="hljs-string">"__schema"</span>: {
      <span class="hljs-string">"types"</span>: [
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"String"</span>
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"BlogType"</span>
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"PostType"</span>
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"ID"</span>
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"TagType"</span>
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"__Schema"</span>
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"__Type"</span>
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"__TypeKind"</span>
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"Boolean"</span>
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"__Field"</span>
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"__InputValue"</span>
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"__EnumValue"</span>
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"__Directive"</span>
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"__DirectiveLocation"</span>
        }
      ]
    }
  }
}</code></pre>
<p>从返回的数据中可以看到，我们自定义的 BlogType, PostType 和 TagType 类，剩下的都是 GraphQL 内部类型，其中又分为两类：一类是 ID, String 和 Bealoon 所表示的标量类型，另一类以双下划线开头的是用于自我检查的类型。</p>
<p>知道了自定义类，假设，还想知道自定义类中包含哪些属性以及属性的类型，就可以这样查询</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// query string
{
    __type(name: &quot;PostType&quot;) {
        name
        fields {
            name,
            type {
                name,
                kind
            }
        }
    }
}

// response result
{
  &quot;data&quot;: {
    &quot;__type&quot;: {
      &quot;name&quot;: &quot;PostType&quot;,
      &quot;fields&quot;: [
        {
          &quot;name&quot;: &quot;id&quot;,
          &quot;type&quot;: {
            &quot;name&quot;: null,
            &quot;kind&quot;: &quot;NON_NULL&quot;
          }
        },
        {
          &quot;name&quot;: &quot;name&quot;,
          &quot;type&quot;: {
            &quot;name&quot;: null,
            &quot;kind&quot;: &quot;NON_NULL&quot;
          }
        },
        {
          &quot;name&quot;: &quot;createDate&quot;,
          &quot;type&quot;: {
            &quot;name&quot;: null,
            &quot;kind&quot;: &quot;NON_NULL&quot;
          }
        },
        {
          &quot;name&quot;: &quot;title&quot;,
          &quot;type&quot;: {
            &quot;name&quot;: null,
            &quot;kind&quot;: &quot;NON_NULL&quot;
          }
        },
        {
          &quot;name&quot;: &quot;subtitle&quot;,
          &quot;type&quot;: {
            &quot;name&quot;: &quot;String&quot;,
            &quot;kind&quot;: &quot;SCALAR&quot;
          }
        },
        {
          &quot;name&quot;: &quot;content&quot;,
          &quot;type&quot;: {
            &quot;name&quot;: &quot;String&quot;,
            &quot;kind&quot;: &quot;SCALAR&quot;
          }
        },
        {
          &quot;name&quot;: &quot;tags&quot;,
          &quot;type&quot;: {
            &quot;name&quot;: null,
            &quot;kind&quot;: &quot;LIST&quot;
          }
        }
      ]
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>// query string
{
    __type(name: <span class="hljs-string">"PostType"</span>) {
        name
        fields {
            name,
            type {
                name,
                kind
            }
        }
    }
}

// response result
{
  <span class="hljs-string">"data"</span>: {
    <span class="hljs-string">"__type"</span>: {
      <span class="hljs-string">"name"</span>: <span class="hljs-string">"PostType"</span>,
      <span class="hljs-string">"fields"</span>: [
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"id"</span>,
          <span class="hljs-string">"type"</span>: {
            <span class="hljs-string">"name"</span>: null,
            <span class="hljs-string">"kind"</span>: <span class="hljs-string">"NON_NULL"</span>
          }
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"name"</span>,
          <span class="hljs-string">"type"</span>: {
            <span class="hljs-string">"name"</span>: null,
            <span class="hljs-string">"kind"</span>: <span class="hljs-string">"NON_NULL"</span>
          }
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"createDate"</span>,
          <span class="hljs-string">"type"</span>: {
            <span class="hljs-string">"name"</span>: null,
            <span class="hljs-string">"kind"</span>: <span class="hljs-string">"NON_NULL"</span>
          }
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"title"</span>,
          <span class="hljs-string">"type"</span>: {
            <span class="hljs-string">"name"</span>: null,
            <span class="hljs-string">"kind"</span>: <span class="hljs-string">"NON_NULL"</span>
          }
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"subtitle"</span>,
          <span class="hljs-string">"type"</span>: {
            <span class="hljs-string">"name"</span>: <span class="hljs-string">"String"</span>,
            <span class="hljs-string">"kind"</span>: <span class="hljs-string">"SCALAR"</span>
          }
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"content"</span>,
          <span class="hljs-string">"type"</span>: {
            <span class="hljs-string">"name"</span>: <span class="hljs-string">"String"</span>,
            <span class="hljs-string">"kind"</span>: <span class="hljs-string">"SCALAR"</span>
          }
        },
        {
          <span class="hljs-string">"name"</span>: <span class="hljs-string">"tags"</span>,
          <span class="hljs-string">"type"</span>: {
            <span class="hljs-string">"name"</span>: null,
            <span class="hljs-string">"kind"</span>: <span class="hljs-string">"LIST"</span>
          }
        }
      ]
    }
  }
}</code></pre>
<h2 id="articleHeader8">最后</h2>
<p>总结一下，GraphQL 是一种客户端同服务端之间数据交互的概念，具有强大、灵活、易扩展等的特点。既然，它是一种概念，那么，不同的语言就可以有各种不同的实现方式。</p>
<p>概念并不多，在于灵活运用。</p>
<blockquote><p>PS：再次强调，本文主要讲的是 GraphQL 的核心概念，Type System 中所定义的类，都是设计类，并不是具体实现代码。实现请听下回分解。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
GraphQL 核心概念

## 原文链接
[https://segmentfault.com/a/1190000006132986](https://segmentfault.com/a/1190000006132986)

