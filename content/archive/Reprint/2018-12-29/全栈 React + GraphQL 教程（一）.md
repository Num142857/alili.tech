---
title: '全栈 React + GraphQL 教程（一）' 
date: 2018-12-29 2:30:10
hidden: true
slug: ua10uhrbbl
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://www.zcfy.cc/article/4341" rel="nofollow noreferrer" target="_blank">首发于众成翻译</a></p>
<hr>
<h2 id="articleHeader0">Part 1——前端：使用 Apollo 声明式地请求和 mock 数据</h2>
<p><span class="img-wrap"><img data-src="http://p0.qhimg.com/t016f72370e1c54946d.png" src="https://static.alili.techhttp://p0.qhimg.com/t016f72370e1c54946d.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://graphql.org/" rel="nofollow noreferrer" target="_blank">GraphQL</a> 是一种新的 API 定义和查询语言，<a href="https://dev-blog.apollodata.com/why-graphql-is-the-future-3bec28193807" rel="nofollow noreferrer" target="_blank">有可能成为新的 REST</a>。它使 UI 组件易于声明式地获取数据，而不必关注后端实现细节。GraphQL 作为一种强大的抽象，可以加快应用开发速度，使代码更容易维护。</p>
<p>然而，尽管使用 GraphQL 有诸多好处，但迈出第一步可能并不容易。这就是为什么我编写了这一系列教程，带你一步步地编写一个包含 GraphQL 和 <a href="https://github.com/apollographql/apollo-client" rel="nofollow noreferrer" target="_blank">Apollo Client</a> 的全栈 React 应用。该系列将引导你完整构建一个使用 GraphQL 的即时消息应用：</p>
<ul>
<li>Part 1（本文）：设置一个简单的客户端</li>
<li><a href="https://medium.com/p/react-graphql-tutorial-part-2-server-99d0528c7928" rel="nofollow noreferrer" target="_blank">Part 2：设置一个简单的服务器</a></li>
<li><a href="https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15" rel="nofollow noreferrer" target="_blank">Part 3：编写变更并保持客户端同步</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-mutations-optimistic-ui-and-store-updates-f7b6b66bf0e2" rel="nofollow noreferrer" target="_blank">Part 4：积极 UI 和客户端 store 更新</a></li>
<li><a href="https://medium.com/p/tutorial-graphql-input-types-and-client-caching-f11fa0421cfd" rel="nofollow noreferrer" target="_blank">Part 5：输入类型和自定义缓存解析器</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-server-side-e51c32dc2951" rel="nofollow noreferrer" target="_blank">Part 6：服务器端的订阅</a></li>
<li><a href="https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-client-side-40e185e4be76" rel="nofollow noreferrer" target="_blank">Part 7：客户端的 GraphQL 订阅</a></li>
</ul>
<p>本教程——作为这一系列中的第一篇——是关于如何在前端开始使用 GraphQL。只需要大约20-30分钟，最终你会得到一个非常简单的 React UI，它使用 GraphQL 加载数据，看起来像这样：</p>
<p><span class="img-wrap"><img data-src="http://p0.qhimg.com/t014c016666012751a1.png" src="https://static.alili.techhttp://p0.qhimg.com/t014c016666012751a1.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>一个使用 GraphQL 加载数据的简易 React UI</p>
<p>让我们开始吧！</p>
<h4>1. 环境搭建</h4>
<blockquote><p>注意：要完成此教程，你需要在你的机器上安装 node，npm 和 git，并且对 React 有所了解。</p></blockquote>
<p>我们将在本教程中使用 <a href="https://github.com/facebookincubator/create-react-app" rel="nofollow noreferrer" target="_blank"><code>create-react-app</code></a>，所以执行安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm install -g create-react-app
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; npm install -g create-react-app
</code></pre>
<p>我们还需要从 GitHub 中克隆本教程的代码库，其中包含了我们稍后会使用到的 CSS 和图像。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> git clone https://github.com/apollographql/graphql-tutorial.git
> cd graphql-tutorial
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; git <span class="hljs-built_in">clone</span> https://github.com/apollographql/graphql-tutorial.git
&gt; <span class="hljs-built_in">cd</span> graphql-tutorial
</code></pre>
<p>接下来，我们使用 <code>create-react-app</code> 创建我们的 react 应用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> create-react-app client
> cd client
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; create-react-app client
&gt; <span class="hljs-built_in">cd</span> client
</code></pre>
<p>为了确保它能工作，我们启动服务器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm start
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; npm start
</code></pre>
<p>如果一切正常，你现在应该在浏览器中看到如下内容：</p>
<p><span class="img-wrap"><img data-src="http://p0.qhimg.com/t011549dbbf33b1146f.png" src="https://static.alili.techhttp://p0.qhimg.com/t011549dbbf33b1146f.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>2. 编写第一个组件</h4>
<p>由于我们正在使用 Apollo 构建一个应用，所以我们通过从 <code>../ resources</code> 复制 <code>logo.svg</code> 和 <code>App.css</code> 来修改 logo 和 CSS。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> cd src
> cp ../../resources/* .
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; <span class="hljs-built_in">cd</span> src
&gt; cp ../../resources/* .
</code></pre>
<p>为了简化初始教程，我们今天只构建一个简单的列表视图。让我们修改 <code>App.js</code> 中的代码：</p>
<ol>
<li>修改 “Welcome to React” 为 “Welcome to Apollo”。Apollo 是我们将在本教程系列中使用的 GraphQL 客户端的名称。</li>
<li>删除 “To get started ..”段落，并用纯 React 组件替换它，该组件将渲染一个具有<code>两个列表项</code>的无序列表，“Channel 1”和 “Channel 2”（是的，你猜到了，我们要构建一个通信应用！）。我们将列表组件命名为 <code>ChannelsList</code>。</li>
</ol>
<p>现在你的 <code>App.js</code> 应该如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> logo <span class="hljs-keyword">from</span> <span class="hljs-string">'./logo.svg'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./App.css'</span>;
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ChannelsList = () =>
     (<ul>
       <li>Channel 1</li>
       <li>Channel 2</li>
     </ul>);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> ChannelsList = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
     (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Channel 1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Channel 2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>);
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
   render() {
     return (
       <div className=&quot;App&quot;>
         <div className=&quot;App-header&quot;>
           <img src={logo} className=&quot;App-logo&quot; alt=&quot;logo&quot; />
           <h2>Welcome to Apollo</h2>
         </div>
         <ChannelsList />
       </div>
     );
   }
 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
   render() {
     <span class="hljs-keyword">return</span> (
       <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App"</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-header"</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{logo}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-logo"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"logo"</span> /&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Welcome to Apollo<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
         <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">ChannelsList</span> /&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
     );
   }
 }
</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default App;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;
</code></pre>
<p><code>create-react-app</code> 为你设置好了热加载，所以一旦你保存文件，你的应用所在的浏览器窗口将会更新以反映更改：</p>
<p><span class="img-wrap"><img data-src="http://p0.qhimg.com/t016d7f3d3770c6577e.png" src="https://static.alili.techhttp://p0.qhimg.com/t016d7f3d3770c6577e.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果看起来像这样，你的设置就是正确的。</p>
<h4>3. 编写你的 GraphQL schema</h4>
<p>现在我们有一个简单的应用正在运行，现在是为它编写 GraphQL 类型定义的时候了。 Schema 将指定我们的应用中存在哪些对象类型，以及它们有哪些字段。此外，它指定了我们的 API 的入口。我们新建一个名为 <code>schema.js</code> 的文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const typeDefs = `
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> typeDefs = <span class="hljs-string">`
</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Channel {
   id: ID!                # &quot;!&quot; 为必填
   name: String
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">type</span> <span class="hljs-selector-tag">Channel</span> {
   <span class="hljs-attribute">id</span>: ID!                # <span class="hljs-string">"!"</span> 为必填
   name: String
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 此类型指定了我们的 API 的入口点。在本例中，只有一个——&quot;channels&quot;——返回频道列表。
type Query {
   channels: [Channel]    # &quot;[]&quot; 意味着这是频道列表
}
`;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-meta"># 此类型指定了我们的 API 的入口点。在本例中，只有一个——<span class="hljs-string">"channels"</span>——返回频道列表。</span>
type <span class="hljs-class">Query </span>{
<span class="hljs-symbol">   channels:</span> [Channel]    <span class="hljs-meta"># <span class="hljs-string">"[]"</span> 意味着这是频道列表</span>
}
`;
</code></pre>
<p>有了这个 schema，我们可以在下节中编写一个简单的查询来获取我们的 <code>ChannelList</code> 组件的数据。这是我们的查询：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="query ChannelsListQuery {
  channels {
    id
    name
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">query</span> ChannelsListQuery {
  <span class="hljs-section">channels</span> {
    <span class="hljs-attribute">id</span>
    name
  }
}
</code></pre>
<h4>4. 将你的组件连接 GraphQL 查询</h4>
<p>好，现在我们有了 schema 和查询，我们只需要使用 <a href="http://dev.apollodata.com/" rel="nofollow noreferrer" target="_blank">Apollo Client</a> 连接我们的组件！我们来安装 Apollo Client 和一些辅助软件包，我们需要将 GraphQL 添加到我们的应用中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm i -S react-apollo
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; npm i -S react-apollo
</code></pre>
<p><code>react-apollo</code> 是 Apollo Client 与 React 的整合，可以让你使用名为 <code>graphql</code> 的<a href="https://facebook.github.io/react/docs/higher-order-components.html" rel="nofollow noreferrer" target="_blank">高阶组件</a>来装饰组件，它将你的 GraphQL 数据不费力地导入到组件中。React Apollo 还提供了 <code>ApolloClient</code>，它是 Apollo 的核心，处理所有数据获取，缓存和积极更新（我们将在另一个教程中讨论）。</p>
<p>现在，我们在 <code>App.js</code> 的顶部添加一些导入，并创建一个 Apollo Client 的实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
} from 'react-apollo';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-apollo'</span>;
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const client = new ApolloClient();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> ApolloClient();
</code></pre>
<p>接下来，我们使用 GraphQL 高阶组件来装饰原来的 <code>ChannelsList</code>，该高阶组件接受查询并将数据传递给我们的组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const channelsListQuery = gql`
   query ChannelsListQuery {
     channels {
       id
       name
     }
   }
 `;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> channelsListQuery = gql<span class="hljs-string">`
   query ChannelsListQuery {
     channels {
       id
       name
     }
   }
 `</span>;
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);
</code></pre>
<p>当我们的 <code>ChannelsList</code>  组件使用 <code>graphql</code> HOC 包装时，将会收到一个名为 <code>data</code> 的 prop，当它可用时会包含 <code>channel</code>，当有错误时会显示 <code>error</code>。另外 <code>data</code> 还包含一个 <code>loading</code> 属性，当 Apollo Client 在等待数据获取的时候它的值为 <code>true</code>。</p>
<p>接下来修改我们的 <code>ChannelsList</code> 组件，以确保用户知道该组件是否正在加载，或者是否出现错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ChannelsList = ({ data: {loading, error, channels "}}") => {
   if (loading) {
     return <p>Loading ...</p>;
   }
   if (error) {
     return <p>{error.message}</p>;
   }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">const</span> ChannelsList = <span class="hljs-function">(<span class="hljs-params">{ data: {loading, error, channels "}}"</span>) =&gt;</span> {
   <span class="hljs-keyword">if</span> (loading) {
     <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Loading ...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;
   }
   <span class="hljs-keyword">if</span> (error) {
     <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;
   }
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   return <ul>
     { channels.map( ch => <li key={ch.id}>{ch.name}</li> ) }
   </ul>;
 };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx">   <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
     { channels.map( ch =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{ch.id}</span>&gt;</span>{ch.name}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span> ) }
   <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>;
 };
</code></pre>
<p>最后，我们用 <code>ChannelsListWithData</code> 替换 App 的 render 函数中的 <code>ChannelsList</code>。 为了让我们刚创建的组件能够使用 Apollo Client 的实例，我们用 ApolloProvider 包裹顶级的应用组件，这会将 Apollo Client 的一个实例放在 UI 上。</p>
<p>现在你的 <code>App</code> 组件应该如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
   render() {
     return (
       <ApolloProvider client={client}>
         <div className=&quot;App&quot;>
           <div className=&quot;App-header&quot;>
             <img src={logo} className=&quot;App-logo&quot; alt=&quot;logo&quot; />
             <h2>Welcome to Apollo</h2>
           </div>
           <ChannelsListWithData />
         </div>
       </ApolloProvider>
     );
   }
 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
   render() {
     <span class="hljs-keyword">return</span> (
       <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ApolloProvider</span> <span class="hljs-attr">client</span>=<span class="hljs-string">{client}</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App"</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-header"</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{logo}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-logo"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"logo"</span> /&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Welcome to Apollo<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
           <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">ChannelsListWithData</span> /&gt;</span>
         <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">ApolloProvider</span>&gt;</span>
     );
   }
 }
</span></code></pre>
<p>好的，我们快完成了！如果你现在尝试运行，应该会看到以下错误：</p>
<p><span class="img-wrap"><img data-src="http://p0.qhimg.com/t01f21b35abb908c424.png" src="https://static.alili.techhttp://p0.qhimg.com/t01f21b35abb908c424.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>起作用了！——好吧，至少部分如此。</p>
<p>这是怎么回事？尽管我们正确地连接了所有的组件，但我们还没有写一个服务器，所以当然没有数据可以获取或显示！ 如果你没有为 GraphQL 端点指定 URL，Apollo Client 将假定它运行在同一个域下的 <code>/graphql</code>。因此我们需要创建一个具有自定义 URL 的网络接口。</p>
<p>但是，由于本教程不是关于编写服务器的，所以我们将利用 GraphQL 代码即文档这一特性，根据我们先前写过的类型定义自动创建 mock。要实现这一点，我们只需要停止服务器，安装一些其他的软件包，然后重新启动它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -S graphql-tools apollo-test-utils graphql
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm i -S graphql-tools apollo-test-utils graphql
</code></pre>
<p>我们将使用这些软件包根据我们前面写的 schema 为 Apollo Client 创建一个模拟网络接口。将以下导入和定义添加到 <code>App.js</code> 的顶部：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { 
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
 import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
 import { typeDefs } from './schema';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { 
  makeExecutableSchema,
  addMockFunctionsToSchema
} <span class="hljs-keyword">from</span> <span class="hljs-string">'graphql-tools'</span>;
 <span class="hljs-keyword">import</span> { mockNetworkInterfaceWithSchema } <span class="hljs-keyword">from</span> <span class="hljs-string">'apollo-test-utils'</span>;
 <span class="hljs-keyword">import</span> { typeDefs } <span class="hljs-keyword">from</span> <span class="hljs-string">'./schema'</span>;
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });
</code></pre>
<p>现在你只需将 <code>mockNetworkInterface</code> 传递给 Apollo Client 的构造函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const client = new ApolloClient({
   networkInterface: mockNetworkInterface,
 });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> ApolloClient({
   <span class="hljs-attr">networkInterface</span>: mockNetworkInterface,
 });
</code></pre>
<p>就是这样，你已经完成了！你的屏幕现在应该如下所示：</p>
<p><span class="img-wrap"><img data-src="http://p0.qhimg.com/t017b95642d7cf0ba87.png" src="https://static.alili.techhttp://p0.qhimg.com/t017b95642d7cf0ba87.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>我们做到了，我们的第一个使用 Apollo 的 React + GraphQL 应用！</p>
<blockquote><p>注意：“Hello World” 只是字符串的默认模拟文本。 如果你想自定义酷炫的 mock，<a href="https://dev-blog.apollodata.com/mocking-your-server-with-just-one-line-of-code-692feda6e9cd" rel="nofollow noreferrer" target="_blank">请查看我之前写的这篇文章</a>。</p></blockquote>
<p>如果某些代码不起作用，并且你搞不清是为什么，你可以将其与<a href="https://github.com/apollographql/graphql-tutorial/blob/t1-end/client/src/App.js" rel="nofollow noreferrer" target="_blank">此文件</a>进行比较，以发现代码差异。或者，你可以查看 <code>t1-end</code> <a href="https://github.com/apollographql/graphql-tutorial/tree/t1-end" rel="nofollow noreferrer" target="_blank">Git 分支</a>来检查代码。</p>
<hr>
<p>恭喜，你已经正式完成了教程的第一部分！可能没什么感觉，但实际上已经做了很多工作：你已经编写了一个 GraphQL schema，从中生成模拟数据，并将 GraphQL 查询与 React 组件相连。在本教程的其余部分中，你将了解到我们构建一个真正的通信应用的基础。在<a href="https://medium.com/p/react-graphql-tutorial-part-2-server-99d0528c7928" rel="nofollow noreferrer" target="_blank">第2部分</a>中，我们将编写一个简单的服务器并将其连接到我们的应用！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
全栈 React + GraphQL 教程（一）

## 原文链接
[https://segmentfault.com/a/1190000011541295](https://segmentfault.com/a/1190000011541295)

