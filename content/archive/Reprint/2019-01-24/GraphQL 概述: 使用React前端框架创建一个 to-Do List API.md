---
title: 'GraphQL 概述: 使用React前端框架创建一个 to-Do List API' 
date: 2019-01-24 2:30:11
hidden: true
slug: xnh0a8yer3d
categories: [reprint]
---

{{< raw >}}

            <p>设想你想要参考食谱烤一个蛋糕。你将需要一些原料，并且一些合适的量。如果你能拿一个盒子装好你烘焙所需要的各种原料 ，并且已经称量好匹配菜谱的份量，那肯定会让烘焙更简单。如果你把前端 UI设想成一块蛋糕的话，那这就是GraphQL所做的事。</p>
<p>在本教程中我们将写一个小的GraphQL server 来响应<a href="http://todomvc.com/examples/react/#/">Todo List app</a>的请求。你也可以 在<a href="http://todomvc.com/">众多app</a>中来挑选，但是这些日子我开始使用React做项目，所以我将会选择React来做前端框架。不过，你也可以挑选你用得习惯的任何js框架。</p>
<h2>GraphQL</h2>
<p><a href="https://github.com/facebook/graphql">GraphQL</a> 允许我们定义 一个查询来提供一个通用的接口在客户端和服务端之间来请求和处理数据。它用一种查询语言来处理，允许客户端使用一种<a href="https://facebook.github.io/graphql/#sec-Overview">直观和灵活的语法</a>和来按照客户端程序的设计和需求来构建和组装数据。</p>
<p>这使客户端从服务端 检索数据更加的高效。举个栗子，设想从一个 <a href="https://todo-graphql-server.herokuapp.com/graphql">GraphQL的实例</a>中, 客户端除了title和id 其它的字段一概不要，那么这个模型应该是长这样：</p>
<pre><code class="hljs dts">query <span class="hljs-class">Query </span>{
  <span class="hljs-class">todos </span>{
    id,
    title
  }
}

</code></pre><p>结果数据（JSON）是：</p>
<p>Which produces the resulting data (in JSON):</p>
<pre><code class="hljs json">{
  <span class="hljs-attr">"data"</span>: {
    <span class="hljs-attr">"todos"</span>: [
      {
        <span class="hljs-attr">"id"</span>: <span class="hljs-number">1446412739542</span>,
        <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Read emails"</span>
      },
      {
        <span class="hljs-attr">"id"</span>: <span class="hljs-number">1446412740883</span>,
        <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Buy orange"</span>
      },
      {
        <span class="hljs-attr">"id"</span>: <span class="hljs-number">1446412741215</span>,
        <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Fix garbage"</span>
      }
    ]
  }
}

</code></pre><p>大概我们的展示demo中没有保存数据。这背后的原因是每次我们都启动服务，在内存中存储的Todo(s)数组变为空了。我们将在下面的内容中展示如何向数组中添加数据。</p>
<p>如你所见，返回的格式已经被替换成了客户端已经定义和描述过了的查询格式。就像文章<a href="https://blog.risingstack.com/graphql-overview-getting-started-with-graphql-and-nodejs/">“GraphQL 概述 – GraphQL 和 Node.js 入门 ”</a>中规定的。</p>
<blockquote>
<p>GraphQL的查询都像是没有属性的JSON对象，<em>GraphQL 不是一种语言特性</em> 这点被提到 很重要，它只是在客户端和服务端中间的一种规范。如果使用通用的语言，任何的客户端都能和任何服务端通信。</p>
</blockquote>
<h2>介绍 GraphQL.js</h2>
<p><a href="https://github.com/graphql/graphql-js">GraphQL.js</a> 是一种基于js的GraphQL参考模型，它提供了两个重要的功能：</p>
<ol>
<li>创建一种类型的语法模型(schema)。</li>
<li>应该该类型的语法(schema)的查询 。</li>
</ol>
<p>需要创建一个匹配代码基层的GraphQL 类型语法(schema)。在接下来的代码中，我们定义一个简单的语法(schema)。它有一种类型和一个汇总的<code>Todo(s)</code>列表（每个列表元素有含有三个字段），额外的，它还提供了服务于该类型语法(schema)和查询结果。</p>
<pre><code class="hljs qml"><span class="hljs-keyword">var</span> graphql = <span class="hljs-built_in">require</span> (<span class="hljs-string">'graphql'</span>);

<span class="hljs-comment">// Here is some dummy data to make this piece of code simpler.</span>
<span class="hljs-comment">// It will be changeable after introducing mutation.</span>
<span class="hljs-keyword">var</span> TODOs = [
  {
    <span class="hljs-string">"id"</span>: <span class="hljs-number">1446412739542</span>,
    <span class="hljs-string">"title"</span>: <span class="hljs-string">"Read emails"</span>,
    <span class="hljs-string">"completed"</span>: <span class="hljs-literal">false</span>
  },
  {
    <span class="hljs-string">"id"</span>: <span class="hljs-number">1446412740883</span>,
    <span class="hljs-string">"title"</span>: <span class="hljs-string">"Buy orange"</span>,
    <span class="hljs-string">"completed"</span>: <span class="hljs-literal">true</span>
  }
];

<span class="hljs-keyword">var</span> TodoType = <span class="hljs-keyword">new</span> graphql.GraphQLObjectType({
  <span class="hljs-attribute">name</span>: <span class="hljs-string">'todo'</span>,
  <span class="hljs-attribute">fields</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attribute">id:</span><span class="hljs-string"> {
        type</span>: graphql.GraphQLInt
      },
      <span class="hljs-attribute">title</span>: {
        <span class="hljs-attribute">type</span>: graphql.GraphQLString
      },
      <span class="hljs-attribute">completed</span>: {
        <span class="hljs-attribute">type</span>: graphql.GraphQLBoolean
      }
    }
  }
});

<span class="hljs-keyword">var</span> queryType = <span class="hljs-keyword">new</span> graphql.GraphQLObjectType({
  <span class="hljs-attribute">name</span>: <span class="hljs-string">'Query'</span>,
  <span class="hljs-attribute">fields</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attribute">todos</span>: {
        <span class="hljs-attribute">type</span>: <span class="hljs-keyword">new</span> graphql.GraphQLList(TodoType),
        <span class="hljs-attribute">resolve</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> TODOs;
        }
      }
    }
  }
});

<span class="hljs-built_in">module</span>.exports = <span class="hljs-keyword">new</span> graphql.GraphQLSchema({
  <span class="hljs-attribute">query</span>: queryType
});

</code></pre><p>让我们现在看一下给我们一个JSON数据结果的js文件的代码:</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> graphql = <span class="hljs-built_in">require</span> (<span class="hljs-string">'graphql'</span>).graphql
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">var</span> graphQLHTTP = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express-graphql'</span>)
<span class="hljs-keyword">var</span> Schema = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./schema'</span>)
<span class="hljs-keyword">var</span> query = <span class="hljs-string">'query { todos { id, title, completed } }'</span>

graphql(Schema, query).then( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(result));
  <span class="hljs-comment">// Prints</span>
  <span class="hljs-comment">// {</span>
  <span class="hljs-comment">//   "data":{</span>
  <span class="hljs-comment">//     "todos":[</span>
  <span class="hljs-comment">//       {</span>
  <span class="hljs-comment">//         "id":1446412739542,</span>
  <span class="hljs-comment">//         "title":"Read emails",</span>
  <span class="hljs-comment">//         "completed":false</span>
  <span class="hljs-comment">//       },</span>
  <span class="hljs-comment">//       {</span>
  <span class="hljs-comment">//         "id":1446412740883,</span>
  <span class="hljs-comment">//         "title":"Buy orange",</span>
  <span class="hljs-comment">//         "completed":true</span>
  <span class="hljs-comment">//       }</span>
  <span class="hljs-comment">//     ]</span>
  <span class="hljs-comment">//   }</span>
  <span class="hljs-comment">// }</span>
});

<span class="hljs-keyword">var</span> app = express()
  .use(<span class="hljs-string">'/'</span>, graphQLHTTP({ <span class="hljs-attr">schema</span>: Schema, <span class="hljs-attr">pretty</span>: <span class="hljs-literal">true</span> }))
  .listen(<span class="hljs-number">8080</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'GraphQL Server is now running on localhost:8080'</span>);
  });

</code></pre><p>下面的代码提供了跟上面同样 的执行结果，<code>cURL</code>在本例中并非是强制执行来得到 更长远的优势 的。它只是一种不用在浏览器中击中<a href="https://todo-graphql-server.herokuapp.com/graphql">例子</a> 来检索数据的方式 。请注意万一你是一个Windows 用户, <a href="https://support.zendesk.com/hc/en-us/articles/203691436-Installing-and-using-cURL#curl_win">你可以使用Windows的命令提示符来执行<code>cURL</code>例子</a>,此外，<a href="https://support.zendesk.com/hc/en-us/articles/203691436-Installing-and-using-cURL#install"> 这里你还可以找到好的资源来在你的系统里安装<code>cURL</code></a>.</p>
<pre><code class="hljs xquery">$ curl -XPOST -H <span class="hljs-string">"Content-Type:application/graphql"</span>  -d <span class="hljs-string">'query { todos { title } }'</span> http://localhost:<span class="hljs-number">8080</span>
{
  <span class="hljs-string">"data"</span>: {
    <span class="hljs-string">"todos"</span>: [
      {
        <span class="hljs-string">"title"</span>: <span class="hljs-string">"Read emails"</span>
      },
      {
        <span class="hljs-string">"title"</span>: <span class="hljs-string">"Buy orange"</span>
      }
    ]
  }
}

</code></pre><p>关于语法(schema)的一个重要的事情 ,自从它描述了用户可以使用的API，它就假定数据已经存储 了。数据存储和描述的方式是一种实现细节。</p>
<h2>React</h2>
<p><a href="https://facebook.github.io/react/index.html">React</a> 是由Facebook和Instagram来开发 的一种用来创建用户界面 JavaScript 库。很多人会认为React是<a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller">MVC</a>模型中的V, <a href="https://facebook.github.io/react/docs/why-react.html">官方文档</a>中是这样规定的：</p>
<blockquote>
<p>我们做出React是为了解决一个问题：创建大型应用时，加载数据超时。根源在于构建可重用的组件。实际上，本质就是构建组件库。</p>
</blockquote>
<p>如果你需要一个React指南，你可以阅读下面的资料：</p>
<ul>
<li><p><a href="http://www.sitepoint.com/video-getting-started-react/">视频: React入门</a></p>
</li>
<li><p><a href="http://developer.telerik.com/featured/introduction-to-the-react-javascript-framework/">React JS库概述</a></p>
</li>
<li><p><a href="http://www.sitepoint.com/video-introducing-one-way-data-flow/">视频: 单向数据流概述</a></p>
</li>
</ul>
<h3>一个简单的React 组件</h3>
<p>React 组件通过<code>render()</code>方法来获取输入数据并将返回结果渲染展示。<a href="https://facebook.github.io/react/">这里是使用JSX（跟XML语法相似）的例子</a>. JSX是一个非必须项。JSX是一种更像是XML的JavaScript 语法扩展，你可以使用React将简单的JSX语法转化。</p>
<p>输入数据可以通过<code>this.props</code>来向<code>render()</code>渲染的组件传值。<a href="http://codepen.io/SitePoint/pen/zrEYRb">下面是关于如何创建一个React 组件的简单的例子 并且在 CodePen中可用</a>.</p>
<pre><code class="hljs actionscript"><span class="hljs-keyword">var</span> Application = React.createClass({
  render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> 
      { <span class="hljs-keyword">this</span>.props.text }
      { <span class="hljs-keyword">this</span>.props.id }
    ;
  }
});

</code></pre><p>和适当的这些预编译的代码，这些未编译过的JavaScript代码由JSX编译器生成。</p>
<pre><code class="hljs javascript"><span class="hljs-meta">"use strict"</span>;
<span class="hljs-keyword">var</span> Application = React.createClass({
  <span class="hljs-attr">displayName</span>: <span class="hljs-string">"Application"</span>,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> React.createElement(
      <span class="hljs-string">"div"</span>,
      <span class="hljs-literal">null</span>,
      <span class="hljs-keyword">this</span>.props.text,
      <span class="hljs-keyword">this</span>.props.id
    );
  }
});

</code></pre><p><img src="http://p0.qhimg.com/t0167b4bc1d1ac37ae7.png" alt="一个简单的React组件"></p>
<p>如果你想探究更多关于React 组件，可以花一分钟 看一下这个视频<a href="http://www.sitepoint.com/video-an-introduction-to-component-state">关于组件状态的介绍</a>.</p>
<h2>一次关于本例子的彩排</h2>
<p>首先，我的们需要 一个服务端 (运行正常的)来接收我们从Todo List应用发出的GraphQL请求。这个服务端已经在上面写好了。</p>
<p>开启我们的服务，在命令行中执行:</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git <span class="hljs-built_in">clone</span> https://github.com/sitepoint-editors/todo-graphql-server.git</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> todo-graphql-server</span>
<span class="hljs-meta">$</span><span class="bash"> npm install</span>
<span class="hljs-meta">$</span><span class="bash"> npm start</span>

</code></pre><p><img src="http://p0.qhimg.com/t01102888eaed571bcf.gif" alt="本地启服务"></p>
<p>你必须已经安装Node v4.0.0以其更高的版本，因为 服务端的代码 使用了在老版本中并不支持的<a href="https://babeljs.io/docs/learn-es2015/">ES2015 特性</a> 。</p>
<p>任何以<code>/graphql</code>结尾的POST请求 将会与我们的GraphQL语法(schema)发生执行冲突。测试一下是否正常运行，输入以下 代码 ：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> curl -XPOST -H <span class="hljs-string">"Content-Type:application/graphql"</span>  -d <span class="hljs-string">'query { todos { title } }'</span> http:<span class="hljs-comment">//localhost:8080</span>
{
  <span class="hljs-string">"data"</span>: {
    <span class="hljs-string">"todos"</span>: []
  }
}

</code></pre><p>还是没有数据保存。所以我们每次重启服务，在内存中的存储了<code>todo(s)</code> 数组数据都会被清空。当然 ，我们不单单想只读空数组，我们还需要添加和更新数据。这种接收异常类型的操作，在GraphQL中被 称作_修改_（<em>mutations</em>），定义一个修改(mutations)跟定义一个查询一样，也会返回一个类型的的值。这个想法是无论什么变量发生了变化 ，就返回什么。</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">var</span> MutationAdd = {
  <span class="hljs-keyword">type</span>: <span class="hljs-keyword">new</span> GraphQLList(TodoType),
  description: <span class="hljs-string">'Add a Todo'</span>,
  args: {
    title: {
      name: <span class="hljs-string">'Todo title'</span>,
      <span class="hljs-keyword">type</span>: <span class="hljs-keyword">new</span> GraphQLNonNull(GraphQLString)
    }
  },
  resolve: <span class="hljs-function">(<span class="hljs-params">root, {title}</span>) =&gt;</span> {
    TODOs.push({
      id: (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).getTime(),
      title: title,
      completed: <span class="hljs-literal">false</span>
    });
    <span class="hljs-keyword">return</span> TODOs;
  }
};

<span class="hljs-keyword">var</span> MutationType = <span class="hljs-keyword">new</span> GraphQLObjectType({
  name: <span class="hljs-string">'Mutation'</span>,
  fields: {
    add: MutationAdd
  }
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> Schema = <span class="hljs-keyword">new</span> GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

</code></pre><p>上面的箭头符号 (=&gt;) 参考<a href="http://www.sitepoint.com/preparing-ecmascript-6-new-function-syntax/">定义函数的新语法</a>, ES2015中最有趣的部分之一。</p>
<p>正如Clay Allsopp所写的这篇题为<a href="https://medium.com/@clayallsopp/your-first-graphql-server-3c766ab4f0a2#.us9jdjuy7">“Your First GraphQL Server”</a> 文章中所写，</p>
<blockquote>
<p>修改（mutation）与查询之间的一个有意义的区别是转换是串行的，但是查询没有这样的规定（实际上，GraphQL鼓励服务端为独立查询开发固有的并行模型）。GraphQL说明书提供 了这个关于修改（mutation）查询的一个集合例子必须按照下面的顺序在服务端执行：</p>
</blockquote>
<pre><code class="hljs clojure">{
  first: changeTheNumber(<span class="hljs-name">newNumber:</span> <span class="hljs-number">1</span>) {
    theNumber
  },
  second: changeTheNumber(<span class="hljs-name">newNumber:</span> <span class="hljs-number">3</span>) {
    theNumber
  },
  third: changeTheNumber(<span class="hljs-name">newNumber:</span> <span class="hljs-number">2</span>) {
    theNumber
  }
}

</code></pre><p>因此，在请求结束， <code>theNumber</code> 字段值一定是<code>2</code>。在这个快速的修改（mutation）的介绍之后，我们可以最终在服务端添加一个<code>todo</code> 。</p>
<pre><code class="hljs gauss">$ curl -XPOST -H <span class="hljs-string">"Content-Type:application/graphql"</span> -d 'mutation { add (<span class="hljs-built_in">title</span>: <span class="hljs-string">"Clean garage"</span>) { id, <span class="hljs-built_in">title</span> } }' http:<span class="hljs-comment">//localhost:8080</span>
{
  <span class="hljs-string">"data"</span>: {
    <span class="hljs-string">"add"</span>: [
      {
        <span class="hljs-string">"id"</span>: <span class="hljs-number">1446443172937</span>,
        <span class="hljs-string">"title"</span>: <span class="hljs-string">"Clean garage"</span>
      }
    ]
  }
}

</code></pre><p><img src="http://p0.qhimg.com/t01e3bfaaea140ee948.gif" alt="服务端运行"></p>
<p>是不是相当的酷？我们除了这个添加(<code>add</code>)修改还有更多的修改（mutation）：<code>toggle</code>, <code>toggleAll</code>, <code>destroy</code>, <code>clearCompleted</code>，和<code>save</code>。一个值得注意的事是我们在所有的修改中传递参数，所以有的字段都 可接收参数。追加参数是相当简单，并且它们都可以被<code>resolve</code>_函数_捕获。</p>
<p>今天的结尾，我们有两种类型的查询：</p>
<ul>
<li>一种是从服务端取数据（<em>get</em>）;</li>
<li>另一种是操作_创建_, _更新_, _删除_（<em>create</em>, <em>update</em>, <em>delete</em>）数据。</li>
</ul>
<p>服务正常运行后，我们已经准备好来用我们基于React的Todo List了。 <a href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/react"> React TodoMVC例子一个分支</a>就像本文一开始提到 的那样，下载，并执行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git <span class="hljs-built_in">clone</span> -b react-graphql https://github.com/sitepoint-editors/todomvc.git</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> todomvc</span>
<span class="hljs-meta">$</span><span class="bash"> npm install</span>
<span class="hljs-meta">$</span><span class="bash"> node server.js</span>

</code></pre><p>浏览器中输入地址<code>http://localhost:3000</code>来运行应用。这个代码对比<a href="https://github.com/tastejs/todomvc">之前的版本</a>有两个主要的变更。首先，服务端的<code>TodoModel</code>已经被修改了。</p>
<p><img src="http://p0.qhimg.com/t015157f304bdff5159.png" alt="react component model"></p>
<p>第二，我们本地创建了一个服务端代理来直接使用GraphQL 请求我们创建的服务。
更多的细节 ，查看下面的图片。</p>
<p><img src="http://p0.qhimg.com/t01b18d063ceda9c94c.png" alt="server proxy"></p>
<p>而且，你能 <a href="https://todo-graphql-server.herokuapp.com/graphql">在这</a> 找到一个demo。</p>
<p><img src="http://p0.qhimg.com/t01518c85b19303281f.gif" alt="graphql overview"></p>
<h2>总结</h2>
<p>如你在本文所看到 的，GraphQL和GraphQL.js是Facebook在2015年最新发布的开源技术 ，它核心的想法是 UI知道组件需要渲染的数据的详细集合。</p>
<p><a href="https://www.sitepoint.com/author/igor-ribeiro-lima/"><img src="http://p0.qhimg.com/t01458cdbe12b80e2e2.jpg" alt="Igor Ribeiro Lima"></a></p>
<p>作者</p>
<p><a href="https://www.sitepoint.com/author/igor-ribeiro-lima/">Igor Ribeiro Lima</a> 
<a href="https://twitter.com/igorribeirolima"></a><a href="https://plus.google.com/109489626425226004248"></a><a href="https://www.facebook.com/igor.r.lima.75"></a><a href="https://www.linkedin.com/in/igorribeirolima"></a>            </p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
GraphQL 概述: 使用React前端框架创建一个 to-Do List API

## 原文链接
[https://www.zcfy.cc/article/graphql-overview-build-a-to-do-list-api-with-a-react-front-end-mdash-sitepoint](https://www.zcfy.cc/article/graphql-overview-build-a-to-do-list-api-with-a-react-front-end-mdash-sitepoint)

