---
title: '安息吧 REST API，GraphQL 长存' 
date: 2019-01-01 2:30:07
hidden: true
slug: 4ukw52de6qx
categories: [reprint]
---

{{< raw >}}

                    
<p>首发于<a href="https://medium.freecodecamp.org/rest-apis-are-rest-in-peace-apis-long-live-graphql-d412e559d8e4" rel="nofollow noreferrer" target="_blank">众成翻译</a></p>
<hr>
<p>即使与 REST API 打交道这么多年，当我第一次了解到 GraphQL 和它试图解决的问题时，我还是禁不住把本文的标题发在了 Twitter 上。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011109225" src="https://static.alili.tech/img/remote/1460000011109225" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>请别会错意。我不是在说 GraphQL 会“杀死” REST 或别的类似的东西。REST 可能永远不会消失，就像 XML 从没消失过一样。我只是认为 GraphQL 之于 REST，正如 JSON 之于 XML 那般。</p>
<p>本篇文章实际上并没有100％赞成 GraphQL。后文会有一个专门的章节来阐述 GraphQL 的灵活性成本，更高的灵活性意味着更高的成本。</p>
<p>我喜欢“始终<a href="https://startwithwhy.com/" rel="nofollow noreferrer" target="_blank">以 WHY 开头</a>”，所以让我们开始吧。</p>
<h3 id="articleHeader0">摘要：为什么我们需要 GraphQL ？</h3>
<p>GraphQL 解决的最重要的3个问题分别是：</p>
<ul>
<li>
<strong>需要进行多次往返以获取视图所需的数据</strong>：使用 GraphQL，你可以随时通过<em>单次</em>往返服务器获取视图所需的所有初始数据。要使用 REST API 实现相同的功能，我们需要引入难以管理和扩展的非结构化参数和条件。</li>
<li>
<strong>客户端依赖于服务端</strong>：客户端使用 GraphQL 作为请求语言：(1) 消除了服务器对数据形状或大小进行硬编码的需要，(2) 将客户端与服务端分离。这意味着我们可以把客户端与服务端分离开来，单独进行维护和改进。</li>
<li>
<strong>糟糕的前端开发体验</strong>：使用 GraphQL，开发人员可以声明式地来表达其用户界面的数据需求。他们声明他们需要<em>什么</em>数据，而不是<em>如何</em>获取它。UI 需要哪些数据，与开发人员在 GraphQL 中声明该数据的方式之间存在紧密的联系。</li>
</ul>
<p>本文将详细介绍 GraphQL 如何解决所有这些问题。</p>
<p>在我们开始之前，如果你还不熟悉 GraphQL，可以从简单的定义开始。</p>
<h3 id="articleHeader1">什么是 GraphQL ？</h3>
<p>GraphQL 是一门<em>语言</em>。如果我们将 GraphQL 嵌入某个软件应用，该应用能够声明式地将任意必需的数据传递给同样使用 GraphQL 的后端数据服务。</p>
<blockquote><p>就像一个小孩可以很快学会一门新的语言 - 而成年人则相对没那么容易学会 - 从头开始使用 GraphQL 会比引入 GraphQL 到一个成熟的应用中更容易。</p></blockquote>
<p>要让一个数据服务能够使用 GraphQL，我们需要实现一个<em>运行时</em>层，并将其暴露给想要与服务端通信的客户端。将服务器端的这一层看作简单的 GraphQL 语言的翻译器，或者代表数据服务的 GraphQL 代理。GraphQL 不是存储引擎，所以它并不是一个独立的解决方案。这就是为什么我们不能仅有一个 GraphQL 的服务器，我们还需要实现一个翻译运行时。</p>
<p>这个抽象层可以用任意语言编写，它定义了一个通用的基于图形的 schema 来发布它所代表的数据服务的<em>功能</em>。使用 GraphQL 的客户端程序可以通过其功能查询该 schema。这种方法使得客户端与服务端解耦，并允许其两者独立开发和扩展。</p>
<p>GraphQL 请求可以是<strong>查询</strong>（读取操作）或<strong>突变</strong>（写入操作）。对于这两种情况，请求都是一个简单的字符串，GraphQL 服务可以使用指定格式的数据解释，执行和解析。通常用于移动和 Web 应用的响应格式为 <em>JSON</em>。</p>
<h3 id="articleHeader2">什么是 GraphQL？（大白话版）</h3>
<p>GraphQL 为数据通信而生。你有一个客户端和一个服务器，它们需要相互通信。客户端需要告知服务器需要哪些数据，服务器需要用实际的数据来满足客户端的数据需求。GraphQL 是此种通信方式的中介。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011109226" src="https://static.alili.tech/img/remote/1460000011109226" alt="" title="" style="cursor: pointer;"></span></p>
<p>截图来源于我的 Pluralsight 课程 - 使用 GraphQL 构建可扩展的 API。</p>
<p>你可能会问，为什么客户端不直接与服务器通信呢？ 当然可以。</p>
<p>在客户端和服务器之间加入 GraphQL 层的考量有多种原因。其中之一，也许是最受欢迎的原因便是<em>效率</em>。客户端通常需要向服务器请求<em>多个</em>资源，而服务器会用单个资源进行响应。所以客户端的请求最终会多次往返服务器，以收集所有需要的数据。</p>
<p>使用 GraphQL，我们基本上可以将这种多个请求的复杂度转移到服务器端，并且通过 GraphQL 层处理它。客户端向 GraphQL 层发起单个请求，并获得一个完全符合客户端需求的响应。</p>
<p>引入 GraphQL 层有诸多好处。例如，一大好处便是能与多个服务进行通信。当你有多个客户端请求多个服务的数据时，中间的 GraphQL 层可以简化和标准化此通信过程。尽管这并不是拿来与 REST API 作比较的一个重点 - 因为这很容易实现，而 GraphQL 运行时提供了一种结构化和标准化的方式。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011109227" src="https://static.alili.tech/img/remote/1460000011109227" alt="" title="" style="cursor: pointer;"></span></p>
<p>截图来源于我的 Pluralsight 课程 - 使用 GraphQL 构建可扩展的 API。</p>
<p>我们可以让客户端与 GraphQL 层通信，而不是直接连接两个不同的数据服务（如上面的幻灯片中那样）。然后 GraphQL 层将与两个不同的数据服务进行通信。GraphQL 首先将客户端从需要与多种语言进行通信中隔离，并将单个请求转换为使用不同语言的多个服务的多个请求。</p>
<blockquote><p>想象一下，有三个人说三种不同的语言，并拥有不同的知识类型。然后，只有把所有三个人的知识结合在一起才能得到回答。如果你有一个能说这三种语言翻译人员，那么把你的问题的答案结合在一起就很容易。这正是 GraphQL 运行时所做的。</p></blockquote>
<p>计算机尚未聪明到能回答任何问题（至少现在还没有），所以它们必须遵循既定的算法。这就是为什么我们需要在 GraphQL 运行时中定义一个 schema，并且该 schema 能被客户端所使用。</p>
<p>这个 schema 基本可以视为一个功能文档，其中列出了客户端可以请求 GraphQL 层的所有查询。因为我们在这里使用的是节点的图，所以使用 schema 会带来一些灵活性。该 schema 大致表示了 GraphQL 层可以响应的范围。</p>
<p>还不够清楚？我们可以说 GraphQL 其实根本就是：<em>REST API 的接替者</em>。所以让我回答一下你最有可能问的问题。</p>
<h3 id="articleHeader3">REST API 有什么问题？</h3>
<p>REST API 最大的问题是其多端点的本质。这要求客户端进行多次往返以获取数据。</p>
<p>REST API 通常是端点的集合，其中每个端点代表一个资源。因此，当客户端需要获取多个资源的数据时，需要对 REST API 进行多次往返，以将其所需的数据放在一起。</p>
<p>在 REST API 中，没有客户端请求语言。客户端无法控制服务器返回的数据。没有任何语言可以这样做。更确切地说，可用于客户端的语言非常有限。</p>
<p>例如，<em>READ</em> REST API 端点可能是</p>
<ul>
<li>GET <code>/ResouceName</code> ——从该资源获取所有记录的列表；</li>
<li>GET <code>/ResourceName/ResourceID</code> ——获取该 ID 标识的单条记录。</li>
</ul>
<p>例如，客户端不能指定为该资源中的记录选择哪些<em>字段</em>。这意味着 REST API 服务将始终返回所有字段，而不管客户端实际需要哪些。GraphQL 针对这个问题定义的术语是<em>超量获取</em>不需要的信息。这对客户端和服务器而言都是网络和内存资源的浪费。</p>
<p>REST API 的另一大问题是版本控制。如果你需要支持多个版本，那通常意味着需要新的端点。而在使用和维护这些端点时会导致诸多问题，并且这可能导致服务器上的代码冗余。</p>
<p>上面提到的 REST API 的问题正是 GraphQL 试图要解决的问题。它们当然不是 REST API 的所有问题，我也不想讨论 REST API 是什么。我主要讨论的是比较流行的基于资源的 HTTP 端点 API。这些 API 中的每一个最终都会变成一个具有常规 REST 端点 + 由于性能原因而制定的自定义特殊端点的组合。这就是为什么 GraphQL 提供了更好的选择。</p>
<h3 id="articleHeader4">GraphQL如何做到这一点？</h3>
<p>GraphQL 背后有很多概念和设计决策，但最重要的可能是：</p>
<ul>
<li>GraphQL schema 是强类型 schema。要创建一个 GraphQL schema，我们要定义具有<em>类型</em>的<em>字段</em>。这些类型可以是原语的或者自定义的，并且 schema 中的所有其他类型都需要类型。这种丰富的类型系统带来丰富的功能，如拥有内省 API，并能够为客户端和服务器构建强大的工具。</li>
<li>GraphQL 使用图与数据通信，数据自然是图。如果需要表示任何数据，右侧的结构便是图。GraphQL 运行时允许我们使用与该数据的自然图形式匹配的图 API 来表示我们的数据。</li>
<li>GraphQL 具有表达数据需求的声明性。GraphQL 为客户端提供了一种声明式语言，以便表达它们的数据需求。这种声明性创造了一个关于使用 GraphQL 语言的内在模型，它接近于我们用英语考虑数据需求的方式，并且它让使用 GraphQL API 比备选方案（REST API）容易得多。</li>
</ul>
<p>最后一个概念解释了为什么我个人认为 GraphQL 是一个规则颠覆者的原因。</p>
<p>这些都是高层次的概念。让我们进一步了解一些细节。</p>
<p>为了解决多次往返的问题，GraphQL 让响应服务器只是作为一个端点。本质上，GraphQL 将自定义端点的思想运用到极致，即让整个服务器成为一个可以回复所有数据请求的自定义端点。</p>
<p>与单一端点概念相关的另一大概念是使用该自定义的单个端点所需的富客户端请求语言。没有客户端请求语言，单个端点是没有用的。它需要一种语言来处理自定义请求，并响应该自定义请求的数据。</p>
<p>拥有客户端请求语言意味着客户端将处于控制之中。它们可以明确地请求它们需要什么，服务器将会正确应答它们请求的内容。这解决了超量获取的问题。</p>
<p>对于版本控制，GraphQL 的做法很有趣。我们可以完全避免版本控制。本质上，我们可以添加新的字段，而不需要删除旧的字段，因为我们有一个图，并且我们可以通过添加更多的节点来灵活地扩展图。因此，我们可以在图上留下旧的 API，并引入新的 API，而不会将其标记为新版本。API 只会增长，而不会有版本。</p>
<p>这对于移动客户端尤其重要，因为我们无法控制它们正在使用的 API 版本。一旦安装，移动应用可能会持续使用同一个旧版 API 很多年。对于 Web，则很容易控制 API 的版本，因为我们只需推送新的代码即可。然而对于移动应用，这很难做到。</p>
<p><em>还不完全信服？</em>要不我们用实际的例子来对 GraphQL 和 REST 做个一对一的比较？</p>
<h3 id="articleHeader5">RESTful APIs vs GraphQL APIs — 示例</h3>
<p>假设我们是负责构建展示“星球大战”电影和角色的崭新用户界面的开发者。</p>
<p>我们负责构建的第一个 UI 很简单：显示单个星球大战人物的信息。例如，达斯·维德（Darth Vader），以及该角色参演的所有电影。这个视图需要显示人物的姓名，出生年份，星球名称以及所有他们参演的电影的名称。</p>
<p>就是这么简单，我们只要处理3种不同的资源：人物，星球和电影。这些资源之间的关系也很简单，任何人都能猜到这里的数据形状。人物对象从属于一个星球对象，并且具有一个或多个电影对象。</p>
<p>这个 UI 的 JSON 数据可能类似于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;data&quot;: {
    &quot;person&quot;: {
      &quot;name&quot;: &quot;Darth Vader&quot;,
      &quot;birthYear&quot;: &quot;41.9BBY&quot;,
      &quot;planet&quot;: {
        &quot;name&quot;: &quot;Tatooine&quot;
      },
      &quot;films&quot;: [
        { &quot;title&quot;: &quot;A New Hope&quot; },
        { &quot;title&quot;: &quot;The Empire Strikes Back&quot; },
        { &quot;title&quot;: &quot;Return of the Jedi&quot; },
        { &quot;title&quot;: &quot;Revenge of the Sith&quot; }
      ]
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"data"</span>: {
    <span class="hljs-attr">"person"</span>: {
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Darth Vader"</span>,
      <span class="hljs-attr">"birthYear"</span>: <span class="hljs-string">"41.9BBY"</span>,
      <span class="hljs-attr">"planet"</span>: {
        <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Tatooine"</span>
      },
      <span class="hljs-attr">"films"</span>: [
        { <span class="hljs-attr">"title"</span>: <span class="hljs-string">"A New Hope"</span> },
        { <span class="hljs-attr">"title"</span>: <span class="hljs-string">"The Empire Strikes Back"</span> },
        { <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Return of the Jedi"</span> },
        { <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Revenge of the Sith"</span> }
      ]
    }
  }
}</code></pre>
<p>假设某个数据服务给我们提供了该数据的确切结构，这有一种使用 React.js 表示它的视图的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 容器组件：
<PersonProfile person={data.person} ></PersonProfile>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 容器组件：</span>
&lt;PersonProfile person={data.person} &gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">PersonProfile</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// PersonProfile 组件：
Name: {person.name}
Birth Year: {person.birthYear}
Planet: {person.planet.name}
Films: {person.films.map(film => film.title)}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// PersonProfile 组件：</span>
Name: {person.name}
Birth Year: {person.birthYear}
Planet: {person.planet.name}
Films: {person.films.map(<span class="hljs-function"><span class="hljs-params">film</span> =&gt;</span> film.title)}</code></pre>
<p>这是一个很简单的例子，虽然我们对星球大战的观影经验可能有所帮助，但 UI 和数据之间的关系其实是非常清晰的。UI 使用了我们假想的 JSON 数据对象中的所有“键”。</p>
<p>现在我们来看看如何使用 RESTful API 请求这些数据。</p>
<p>我们需要获取单个人物的信息，并且假定我们知道该人物的 ID，则 RESTful API 会将该信息暴露为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET - /people/{id}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="shell" style="word-break: break-word; white-space: initial;">GET - /people/{<span class="hljs-built_in">id</span>}</code></pre>
<p>这个请求将返回给我们该人物的姓名，出身年份和其他有关信息。一个设计良好的 RESTful API 还会返回给我们该人物的星球 ID 和参演的所有电影 ID 的数组。</p>
<p>这个请求的 JSON 响应可能是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;Darth Vader&quot;,
  &quot;birthYear&quot;: &quot;41.9BBY&quot;,
  &quot;planetId&quot;: 1,
  &quot;filmIds&quot;: [1, 2, 3, 6],
  *** 其他我们暂不需要的信息 ***
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Darth Vader"</span>,
  <span class="hljs-attr">"birthYear"</span>: <span class="hljs-string">"41.9BBY"</span>,
  <span class="hljs-attr">"planetId"</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">"filmIds"</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">6</span>],
  *** 其他我们暂不需要的信息 ***
}</code></pre>
<p>然后为了获取星球的名称，我们再请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET - /planets/1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="shell" style="word-break: break-word; white-space: initial;">GET - <span class="hljs-regexp">/planets/</span><span class="hljs-number">1</span></code></pre>
<p>然后为了获取电影名，我们发出请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET - /films/1
GET - /films/2
GET - /films/3
GET - /films/6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="shell">GET - <span class="hljs-regexp">/films/</span><span class="hljs-number">1</span>
GET - <span class="hljs-regexp">/films/</span><span class="hljs-number">2</span>
GET - <span class="hljs-regexp">/films/</span><span class="hljs-number">3</span>
GET - <span class="hljs-regexp">/films/</span><span class="hljs-number">6</span></code></pre>
<p>一旦我们获取了来自服务器的所有6个响应，我们便可以将它们组合起来，以满足我们的视图所需的数据。</p>
<p>除了我们必须做6次往返以满足一个简单的用户界面的简单数据需求的事实，我们获取数据的方法是命令式的。我们给出了<em>如何</em>获取数据以及<em>如何</em>处理它以使其准备好渲染视图的说明。</p>
<p>如果你不明白我的意思，你可以自己动手尝试一下。星球大战数据有一个 RESTful API，目前由 <a href="http://swapi.co/" rel="nofollow noreferrer" target="_blank">http://swapi.co/</a> 托管。可以去尝试使用它构建我们的人物数据对象。数据的键可能有所不同，但是 API 端点是一样的。你需要执行6次 API 调用。此外，你将不得不超量获取视图不需要的信息。</p>
<p>当然，这只是 RESTful API 对于此数据的一个实现。可能会有更好的实现，能使这个视图更容易实现。例如，如果 API 服务器实现了资源嵌套，并且表明了人物与电影之间的关系，则我们可以通过以下方式读取电影数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET - /people/{id}/films" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="shell" style="word-break: break-word; white-space: initial;">GET - /people/{<span class="hljs-built_in">id</span>}/films</code></pre>
<p>然而，一个纯粹的 RESTful API 服务器很可能不会像这般实现，并且我们需要让我们的后端工程师为我们额外创建这个自定义的端点。这就是扩展 RESTful API 的现实——我们不得不添加自定义端点，以有效满足不断增长的客户端需求。然而管理像这样的自定义端点是很困难的一件事。</p>
<p>现在来看看 GraphQL 的实现方式。服务器端的 GraphQL 包含了自定义端点的思想，并将其运用到极致。服务器将只是单个端点，而通道不再重要。如果我们通过 HTTP 执行此操作，那么 HTTP 方法肯定也不重要。假设我们有单个 GraphQL 端点通过 HTTP 暴露在 <code>/graphql</code>。</p>
<p>由于我们希望在单次往返中请求我们所需的数据，所以我们需要一种表达我们对服务器端完整数据需求的方式。我们使用 GraphQL 查询来做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET or POST - /graphql?query={...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-type">GET</span> <span class="hljs-keyword">or</span> <span class="hljs-type">POST</span> - /graphql?query=<span class="hljs-meta">{...}</span></code></pre>
<p>一个 GraphQL 查询只是一个字符串，但它必须包括我们需要的所有数据。这就是声明式的好处。</p>
<p>在英语中，我们如何声明我们的数据需求：<em>我们需要一个人物的姓名，出生年份，星球名称和所有电影名</em>。在 GraphQL 中，这被转换为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  person(ID: ...) {
    name,
    birthYear,
    planet {
      name
    },
    films {
      title
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code class="graphql">{
  person(<span class="hljs-name">ID:</span> ...) {
    name,
    birthYear,
    planet {
      name
    },
    films {
      title
    }
  }
}</code></pre>
<p>再读一遍英文表述的需求，并将其与 GraphQL 查询进行比较。它们及其相似。现在，将此 GraphQL 查询与我们最开始使用的原始 JSON 数据进行比较。会发现，GraphQL 查询就是 JSON 数据的确切结构，除了没有所有“值”部分。如果我们根据问答关系来考虑这个问题，那么问题就是没有答案的答案声明。</p>
<p>如果答案是：</p>
<blockquote><p><em>离太阳最近的行星是水星。</em></p></blockquote>
<p>这个问题的一个很好的表述方式是同样的没有答案部分的声明：</p>
<blockquote><p><em>（什么是）离太阳最近的行星？</em></p></blockquote>
<p>同样的关系也适用于 GraphQL 查询。采用 JSON 响应，移除所有“答案”部分（键所对应的值），最后得到一个非常适合代表关于该 JSON 响应的问题的 GraphQL 查询。</p>
<p>现在，将 GraphQL 查询与我们为数据定义的声明式的 React UI 进行比较。GraphQL 查询中的所有内容都在 UI 中被用到，UI 中的所有内容都会显示在 GraphQL 查询中。</p>
<p>这便是 GraphQL 设计哲学的伟大之处。UI 知道它需要的确切数据，并且提取出它所要求的数据是相当容易的。设计一个 GraphQL 查询只需从 UI 中直接提取用作变量的数据。</p>
<p>如果我们反转这个模式，它同样有效。如果我们有一个 GraphQL 查询，我们明确知道如何在 UI 中使用它的响应，因为查询与响应具有相同的“结构”。我们不需要检查响应才知道如何使用它，我们也不需要有关 API 的任何文档。这些都是内置的。</p>
<p>星球大战数据有一个 GraphQL API 托管在 <a href="https://github.com/graphql/swapi-graphql" rel="nofollow noreferrer" target="_blank">https://github.com/graphql/swapi-graphql</a>。可以去尝试使用它构建我们的人物数据对象。后续我们探讨的 API 可能会有一些细微的变动，但下面是你可以使用这个 API 来查看我们对视图数据请求的正式查询（以Darth Vader为例）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  person(personID: 4) {
    name,
    birthYear,
    homeworld {
      name
    },
    filmConnection {
      films {
        title
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code class="graphql">{
  person(<span class="hljs-name">personID:</span> <span class="hljs-number">4</span>) {
    name,
    birthYear,
    homeworld {
      name
    },
    filmConnection {
      films {
        title
      }
    }
  }
}</code></pre>
<p>这个请求定义了一个非常接近视图的响应结构，记住，我们是在一次往返中获得的所有这些数据。</p>
<h3 id="articleHeader6">GraphQL 灵活性的代价</h3>
<p>完美的解决方案实际并不存在。由于 GraphQL 过于灵活，将会带来一些明确的问题和担忧。</p>
<p>GraphQL 易导致的一个重要威胁是资源耗尽攻击（亦称为拒绝服务攻击）。GraphQL 服务器可能会受到超复杂查询的攻击，这将耗尽服务器的所有资源。查询深度嵌套关系（用户 -&gt; 朋友 -&gt; 朋友...），或者使用字段别名多次查询相同的字段非常容易。资源耗尽攻击并不是特定于 GraphQL 的场景，但是在使用 GraphQL 时，我们必须格外小心。</p>
<p>我们可以在这里做一些缓和措施。比如，我们可以提前对查询进行成本分析，并对可以使用的数据量实施某种限制。我们也可以设置超时时间来终结需要过长时间解析的请求。此外，由于 GraphQL 只是一个解析层，我们可以在 GraphQL 下的更底层处理速率限制。</p>
<p>如果我们试图保护的 GraphQL API 端点并不公开，而是为了供我们自己的客户端（网络或移动设备）内部使用，那么我们可以使用白名单方法和预先批准服务器可以执行的查询。客户端可以要求服务器只执行使用查询唯一标识符预先批准的查询。据说 Facebook 采用的就是这种方法。</p>
<p>认证和授权是在使用 GraphQL 时需要考虑的其他问题。我们是在 GraphQL 解析过程之前，之后还是之间处理它们？</p>
<p>为了解答这个问题，你可以将 GraphQL 视为在你自己的后端数据获取逻辑之上的 DSL（领域特定语言）。我们只需把它当作可以在客户端和我们的实际数据服务（或多个服务）之间放置的一个中间层。</p>
<p>然后将认证和授权视为另一层。GraphQL 在实际的身份验证或授权逻辑的实现中并无用处，因为它的意义并不在于此。但是，如果我们想将这些层放置于 GraphQL 之后，我们可以使用 GraphQL 来传递客户端和强逻辑之间的访问令牌。这与我们通过 RESTful API 进行认证和授权的方式非常相似。</p>
<p>GraphQL 另一项更具挑战性的任务是客户端的数据缓存。RESTful API 由于其字典性质而更容易缓存。特定地址标识特定数据。我们可以使用地址本身作为缓存键。</p>
<p>使用 GraphQL，我们可以采取类似的基本方式，将查询文本用作缓存其响应的键。但是这种方式有着诸多限制，而且不是很有效率，并且可能导致数据一致性的问题。多个 GraphQL 查询的结果很容易重叠，而这种基础的缓存方式无法解决重叠的问题。</p>
<p>对于这个问题有一个很巧妙的解决方案，那就是使用图查询表示<em>图缓存</em>。如果我们将 GraphQL 查询响应范式化为一个扁平的记录集合，给每条记录一个全局唯一的 ID，那么我们就可以缓存这些记录，而不是缓存完整的响应。</p>
<p>然而这不是一个简单的过程。记录将会相互引用，我们将在其中管理循环图。操作和读取缓存需要遍历查询。尽管我们需要编写一个中间层来处理这些缓存逻辑，但是这种方式总体上比基于响应的缓存更有效率。<a href="https://facebook.github.io/relay/" rel="nofollow noreferrer" target="_blank">Relay.js</a> 便是一个采用这种缓存策略并在内部实现自动管理的框架。</p>
<p>对于 GraphQL，或许我们应该关心的最重要的问题是通常被称为 N+1 SQL 查询的问题。GraphQL 查询字段被设计为独立的功能，并且使用数据库中的数据解析这些字段可能会导致对已解析字段产生新的数据库请求。</p>
<p>对于简单的 RESTful API 端点逻辑，可以通过增强结构化的 SQL 查询来分析，检测和解决 N+1 问题。对于 GraphQL 动态解析的字段，就没那么简单了。好在 Facebook 开创了一个可行的解决方案：<a href="https://github.com/facebook/dataloader" rel="nofollow noreferrer" target="_blank">DataLoader</a>。</p>
<p>顾名思义，DataLoader 是一个可用于从数据库读取数据并使其可用于 GraphQL 解析函数的工具程序。我们可以使用 DataLoader 而不是直接使用 SQL 查询从数据库中读取数据，而 DataLoader 将作为我们的代理，以减少我们发送到数据库的实际 SQL 查询。</p>
<p>DataLoader 的原理是使用批处理和缓存的组合。如果相同的客户端请求导致需要向数据库请求多个数据，则可以使用 DataLoader 来合并这些请求，并从数据库批量加载其响应。DataLoader 还将缓存响应以使其可用于相同资源的后续请求。</p>
<p>谢谢阅读！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
安息吧 REST API，GraphQL 长存

## 原文链接
[https://segmentfault.com/a/1190000011109222](https://segmentfault.com/a/1190000011109222)

