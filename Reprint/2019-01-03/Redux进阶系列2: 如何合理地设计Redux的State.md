---
title: 'Redux进阶系列2: 如何合理地设计Redux的State' 
date: 2019-01-03 2:30:10
hidden: true
slug: sui3wxfr0z
categories: [reprint]
---

{{< raw >}}

                    
<p>Redux是一个非常流行的状态管理解决方案，Redux应用执行过程中的任何一个时刻，都是一个状态的反映。可以说，State 驱动了Redux逻辑的运转。设计一个好的State并非易事，本文先从设计State时最容易犯的两个错误开始介绍，然后引出如何合理地设计State。</p>
<h3 id="articleHeader0">错误1：以API为设计State的依据</h3>
<p>以API为设计State的依据，往往是一个API对应一个子State，State的结构同API返回的数据结构保持一致（或接近一致）。例如，一个博客应用，<code>/posts</code>接口返回博客列表，返回的数据结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  {
    &quot;id&quot;: 1,
    &quot;title&quot;: &quot;Blog Title&quot;,
    &quot;create_time&quot;: &quot;2017-01-10T23:07:43.248Z&quot;,
    &quot;author&quot;: {
      &quot;id&quot;: 81,
      &quot;name&quot;: &quot;Mr Shelby&quot;
    }
  }
  ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
  {
    <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Blog Title"</span>,
    <span class="hljs-attr">"create_time"</span>: <span class="hljs-string">"2017-01-10T23:07:43.248Z"</span>,
    <span class="hljs-attr">"author"</span>: {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">81</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Mr Shelby"</span>
    }
  }
  ...
]</code></pre>
<p>我们还需要查看一篇博客的详情，假设通过接口<code>/posts/{id}</code>获取博客详情，通过接口<code>/posts/{id}/comments</code>获取博客的评论，返回的数据结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;id&quot;: 1,
    &quot;title&quot;: &quot;Blog Title&quot;,
    &quot;create_time&quot;: &quot;2017-01-10T23:07:43.248Z&quot;,
    &quot;author&quot;: {
      &quot;id&quot;: 81,
      &quot;name&quot;: &quot;Mr Shelby&quot;
    },
    &quot;content&quot;: &quot;Some really short blog content. &quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Blog Title"</span>,
    <span class="hljs-attr">"create_time"</span>: <span class="hljs-string">"2017-01-10T23:07:43.248Z"</span>,
    <span class="hljs-attr">"author"</span>: {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">81</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Mr Shelby"</span>
    },
    <span class="hljs-attr">"content"</span>: <span class="hljs-string">"Some really short blog content. "</span>
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  {
    &quot;id&quot;: 41,
    &quot;author&quot;: &quot;Jack&quot;,
    &quot;create_time&quot;: &quot;2017-01-11T23:07:43.248Z&quot;,
    &quot;content&quot;: &quot;Good article!&quot;
  }
  ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
  {
    <span class="hljs-attr">"id"</span>: <span class="hljs-number">41</span>,
    <span class="hljs-attr">"author"</span>: <span class="hljs-string">"Jack"</span>,
    <span class="hljs-attr">"create_time"</span>: <span class="hljs-string">"2017-01-11T23:07:43.248Z"</span>,
    <span class="hljs-attr">"content"</span>: <span class="hljs-string">"Good article!"</span>
  }
  ...
]</code></pre>
<p>上面三个接口的数据分别作为3个子State，构成应用全局的State:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;posts&quot;: [
    {
      &quot;id&quot;: 1,
      &quot;title&quot;: &quot;Blog Title&quot;,
      &quot;create_time&quot;: &quot;2017-01-10T23:07:43.248Z&quot;,
      &quot;author&quot;: {
        &quot;id&quot;: 81,
        &quot;name&quot;: &quot;Mr Shelby&quot;
      }
    },
    ...
  ],
  &quot;currentPost&quot;: {
    &quot;id&quot;: 1,
    &quot;title&quot;: &quot;Blog Title&quot;,
    &quot;create_time&quot;: &quot;2017-01-10T23:07:43.248Z&quot;,
    &quot;author&quot;: {
      &quot;id&quot;: 81,
      &quot;name&quot;: &quot;Mr Shelby&quot;
    },
    &quot;content&quot;: &quot;Some really short blog content. &quot;
  },
  &quot;currentComments&quot;: [
    {
      &quot;id&quot;: 1,
      &quot;author&quot;: &quot;Jack&quot;,
      &quot;create_time&quot;: &quot;2017-01-11T23:07:43.248Z&quot;,
      &quot;content&quot;: &quot;Good article!&quot;
    },
    ...
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"posts"</span>: [
    {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Blog Title"</span>,
      <span class="hljs-attr">"create_time"</span>: <span class="hljs-string">"2017-01-10T23:07:43.248Z"</span>,
      <span class="hljs-attr">"author"</span>: {
        <span class="hljs-attr">"id"</span>: <span class="hljs-number">81</span>,
        <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Mr Shelby"</span>
      }
    },
    ...
  ],
  <span class="hljs-attr">"currentPost"</span>: {
    <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Blog Title"</span>,
    <span class="hljs-attr">"create_time"</span>: <span class="hljs-string">"2017-01-10T23:07:43.248Z"</span>,
    <span class="hljs-attr">"author"</span>: {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">81</span>,
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Mr Shelby"</span>
    },
    <span class="hljs-attr">"content"</span>: <span class="hljs-string">"Some really short blog content. "</span>
  },
  <span class="hljs-attr">"currentComments"</span>: [
    {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"author"</span>: <span class="hljs-string">"Jack"</span>,
      <span class="hljs-attr">"create_time"</span>: <span class="hljs-string">"2017-01-11T23:07:43.248Z"</span>,
      <span class="hljs-attr">"content"</span>: <span class="hljs-string">"Good article!"</span>
    },
    ...
  ]
}</code></pre>
<p>这个State中，posts和currentPost存在很多重复的信息，而且posts、currentComments是数组类型的结构，不便于查找，每次查找某条记录时，都需要遍历整个数组。这些问题本质上是因为API是基于服务端逻辑设计的，而不是基于应用的状态设计的。比如，虽然获取博客列表时，已经获取了每篇博客的标题、作者等基本信息，但对于获取博客详情的API来说，根据API的设计原则，这个API依然应该包含博客的这些基本信息，而不能只是返回博客的内容。再比如，posts、currentComments之所以返回数组结构，是考虑到数据的顺序、分页等因素。</p>
<h3 id="articleHeader1">错误2：以页面UI为设计State的依据</h3>
<p>既然不能依据API设计State，很多人又会走到另外一个反面，基于页面UI设计State。页面UI需要什么样的数据和数据格式，State就设计成什么样。我们以todo应用为例，页面会有三种状态：显示所有的事项，显然所有的已办事项和显示所有的待办事项。以页面UI为设计State的依据，那么State将是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;all&quot;: [
    {
      &quot;id&quot;: 1,
      &quot;text&quot;: &quot;todo 1&quot;,
      &quot;completed&quot;: false
    },
    {
      &quot;id&quot;: 2,
      &quot;text&quot;: &quot;todo 2&quot;,
      &quot;completed&quot;: true
    }
  ],
  &quot;uncompleted&quot;: [
    {
      &quot;id&quot;: 1,
      &quot;text&quot;: &quot;todo 1&quot;,
      &quot;completed&quot;: false
    }
  ],
  &quot;completed&quot;: [
    {
      &quot;id&quot;: 2,
      &quot;text&quot;: &quot;todo 2&quot;,
      &quot;completed&quot;: false
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"all"</span>: [
    {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"text"</span>: <span class="hljs-string">"todo 1"</span>,
      <span class="hljs-attr">"completed"</span>: <span class="hljs-literal">false</span>
    },
    {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">"text"</span>: <span class="hljs-string">"todo 2"</span>,
      <span class="hljs-attr">"completed"</span>: <span class="hljs-literal">true</span>
    }
  ],
  <span class="hljs-attr">"uncompleted"</span>: [
    {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"text"</span>: <span class="hljs-string">"todo 1"</span>,
      <span class="hljs-attr">"completed"</span>: <span class="hljs-literal">false</span>
    }
  ],
  <span class="hljs-attr">"completed"</span>: [
    {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">"text"</span>: <span class="hljs-string">"todo 2"</span>,
      <span class="hljs-attr">"completed"</span>: <span class="hljs-literal">false</span>
    }
  ]
}</code></pre>
<p>这个State对于展示UI的组件来说，使用起来非常方便，当前应用处于哪种状态，就用对应状态的数组类型的数据渲染UI，不用做任何的中间数据转换。但这种State存在的问题也很容易被发现，一是这种State依然存在数据重复的问题；二是当新增或修改一条记录时，需要修改不止一个地方。例如，当新增一条记录时，all和uncompleted这两个数组都要添加这条新增记录。这种类型的State，既会造成存储的浪费，又会存在数据不一致的风险。</p>
<p>这两种设计State的方式实际上是两种极端的设计方式，实际项目中，完全按照这两种方式设计State的开发者并不多，但绝大部分人都会受到这两种设计方式的影响。请回忆一下，你是否有过把某个API返回的数据原封不动的作为State的一部分？又是否有过，为了组件渲染方便，专门为某个组件的UI定义一个State？</p>
<h3 id="articleHeader2">合理设计State</h3>
<p>下面我们来看一下应该如何合理地设计State。最重要最核心的原则是像设计数据库一样设计State。把State看做一个数据库，State中的每一部分状态看做数据库中的一张表，状态中的每一个字段对应表的一个字段。设计一个数据库，应该遵循以下三个原则：</p>
<ol>
<li>数据按照领域（Domain）分类，存储在不同的表中，不同的表中存储的列数据不能重复。</li>
<li>表中每一列的数据都依赖于这张表的主键。</li>
<li>表中除了主键以外的其他列，互相之间不能有直接依赖关系。</li>
</ol>
<p>这三个原则，可以翻译出设计State时的原则：</p>
<ol>
<li>把整个应用的状态按照领域（Domain）分成若干子State，子State之间不能保存重复的数据。</li>
<li>State以键值对的结构存储数据，以记录的key/ID作为记录的索引，记录中的其他字段都依赖于索引。</li>
<li>State中不能保存可以通过已有数据计算而来的数据，即State中的字段不互相依赖。</li>
</ol>
<p>按照这三个原则，我们重新设计博客应用的State。按领域划分，State可以拆分为三个子State: posts、comments、authors，posts中的记录以博客的id为key值，包含title、create_time、author、comments，同样的方式可以设计出comments、authors的结构，最终State的结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;posts&quot;: {
    &quot;1&quot;: {
      &quot;id&quot;: 1,
      &quot;title&quot;: &quot;Blog Title&quot;,
      &quot;content&quot;: &quot;Some really short blog content.&quot;,
      &quot;created_at&quot;: &quot;2016-01-11T23:07:43.248Z&quot;,
      &quot;author&quot;: 81,
      &quot;comments&quot;: [
        352
      ]
    },
    ...
  },
  &quot;comments&quot;: {
    &quot;352&quot;: {
      &quot;id&quot;: 352,
      &quot;content&quot;: &quot;Good article!&quot;,
      &quot;author&quot;: 41
    },
    ...
  },
  &quot;authors&quot;: {
    &quot;41&quot;: {
      &quot;id&quot;: 41,
      &quot;name&quot;: &quot;Jack&quot;
    },
    &quot;81&quot;: {
      &quot;id&quot;: 81,
      &quot;name&quot;: &quot;Mr Shelby&quot;
    },
    ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  <span class="hljs-string">"posts"</span>: {
    <span class="hljs-string">"1"</span>: {
      <span class="hljs-string">"id"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">"title"</span>: <span class="hljs-string">"Blog Title"</span>,
      <span class="hljs-string">"content"</span>: <span class="hljs-string">"Some really short blog content."</span>,
      <span class="hljs-string">"created_at"</span>: <span class="hljs-string">"2016-01-11T23:07:43.248Z"</span>,
      <span class="hljs-string">"author"</span>: <span class="hljs-number">81</span>,
      <span class="hljs-string">"comments"</span>: [
        <span class="hljs-number">352</span>
      ]
    },
    ...
  },
  <span class="hljs-string">"comments"</span>: {
    <span class="hljs-string">"352"</span>: {
      <span class="hljs-string">"id"</span>: <span class="hljs-number">352</span>,
      <span class="hljs-string">"content"</span>: <span class="hljs-string">"Good article!"</span>,
      <span class="hljs-string">"author"</span>: <span class="hljs-number">41</span>
    },
    ...
  },
  <span class="hljs-string">"authors"</span>: {
    <span class="hljs-string">"41"</span>: {
      <span class="hljs-string">"id"</span>: <span class="hljs-number">41</span>,
      <span class="hljs-string">"name"</span>: <span class="hljs-string">"Jack"</span>
    },
    <span class="hljs-string">"81"</span>: {
      <span class="hljs-string">"id"</span>: <span class="hljs-number">81</span>,
      <span class="hljs-string">"name"</span>: <span class="hljs-string">"Mr Shelby"</span>
    },
    ...
  }
}</code></pre>
<p>现在这个State看起来是不是很像有三张表的数据库呢？但这个State还有不满足应用需求的地方：键值对的存储方式无法保证博客列表数据的顺序，但对于博客列表，有序性显然是需要的。解决这个问题，我们可以通过定义另外一个状态postIds，以数组格式存储博客的id：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;posts&quot;: {
    &quot;1&quot;: {
      &quot;id&quot;: 1,
      &quot;title&quot;: &quot;Blog Title&quot;,
      &quot;content&quot;: &quot;Some really short blog content.&quot;,
      &quot;created_at&quot;: &quot;2016-01-11T23:07:43.248Z&quot;,
      &quot;author&quot;: 81,
      &quot;comments&quot;: [
        352
      ]
    },
    ...
  },
  &quot;postIds&quot;: [1, ...],
  &quot;comments&quot;: {
    &quot;352&quot;: {
      &quot;id&quot;: 352,
      &quot;content&quot;: &quot;Good article!&quot;,
      &quot;author&quot;: 41
    },
    ...
  },
  &quot;authors&quot;: {
    &quot;41&quot;: {
      &quot;id&quot;: 41,
      &quot;name&quot;: &quot;Jack&quot;
    },
    &quot;81&quot;: {
      &quot;id&quot;: 81,
      &quot;name&quot;: &quot;Mr Shelby&quot;
    },
    ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  <span class="hljs-string">"posts"</span>: {
    <span class="hljs-string">"1"</span>: {
      <span class="hljs-string">"id"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">"title"</span>: <span class="hljs-string">"Blog Title"</span>,
      <span class="hljs-string">"content"</span>: <span class="hljs-string">"Some really short blog content."</span>,
      <span class="hljs-string">"created_at"</span>: <span class="hljs-string">"2016-01-11T23:07:43.248Z"</span>,
      <span class="hljs-string">"author"</span>: <span class="hljs-number">81</span>,
      <span class="hljs-string">"comments"</span>: [
        <span class="hljs-number">352</span>
      ]
    },
    ...
  },
  <span class="hljs-string">"postIds"</span>: [<span class="hljs-number">1</span>, ...],
  <span class="hljs-string">"comments"</span>: {
    <span class="hljs-string">"352"</span>: {
      <span class="hljs-string">"id"</span>: <span class="hljs-number">352</span>,
      <span class="hljs-string">"content"</span>: <span class="hljs-string">"Good article!"</span>,
      <span class="hljs-string">"author"</span>: <span class="hljs-number">41</span>
    },
    ...
  },
  <span class="hljs-string">"authors"</span>: {
    <span class="hljs-string">"41"</span>: {
      <span class="hljs-string">"id"</span>: <span class="hljs-number">41</span>,
      <span class="hljs-string">"name"</span>: <span class="hljs-string">"Jack"</span>
    },
    <span class="hljs-string">"81"</span>: {
      <span class="hljs-string">"id"</span>: <span class="hljs-number">81</span>,
      <span class="hljs-string">"name"</span>: <span class="hljs-string">"Mr Shelby"</span>
    },
    ...
  }
}</code></pre>
<p>这样，当显示博客列表时，根据postIds获取列表顺序，然后根据博客id从posts中获取博客的信息。这个地方有些同学可能有疑惑，认为posts和postIds都保存了id数据，违反了不同State间不能有重复数据的原则。但其实这并不是重复数据，postIds保存的数据是博客列表的顺序，只不过“顺序”这个数据是通过博客id来体现的。这和一张表的主键同时可以用作另外一张表的外键，是同样的道理。同样需要注意的是，当新增加一条博客时，posts和postId这两个状态都要进行修改。这看似变得麻烦，不如直接使用一个数组类型的状态操作简单，但是当需要修改某一篇博客的数据时，这种结构就有了明显的优势，而且直接使用数组保存状态，会存在对象嵌套层级过深的问题，想象下访问评论的内容，需要通过类似<code>posts[0].comments[0].content</code>三层结构才能获取到，当业务越复杂，这个问题越突出。扁平化的State，才具有更好的灵活性和扩展性。</p>
<p>截至目前为止，我们的State都是根据后台API返回的领域数据进行设计的，但实际上，应用的State，不仅包含领域数据，还需要包含应用的UI逻辑数据，例如根据当前是否正在与服务器通信，处理页面的加载效果；当应用运行出错时，需要显示错误信息等。这时，State的结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;isFetching&quot;: false,
  &quot;error&quot;: &quot;&quot;,
  &quot;posts&quot;: {
    ...
  },
  &quot;postIds&quot;: [1, ...],
  &quot;comments&quot;: {
    ...
  },
  &quot;authors&quot;: {
    ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  <span class="hljs-string">"isFetching"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-string">"error"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-string">"posts"</span>: {
    ...
  },
  <span class="hljs-string">"postIds"</span>: [<span class="hljs-number">1</span>, ...],
  <span class="hljs-string">"comments"</span>: {
    ...
  },
  <span class="hljs-string">"authors"</span>: {
    ...
  }
}</code></pre>
<p>随着应用业务逻辑的增加，State的第一层级的节点也会变得越来越多。这时候我们往往会考虑合并关联性较强的节点数据，然后通过拆分reducer的方式，让每一个子reducer处理一个节点的状态逻辑。这个例子中，我们可以把posts、postIds进行合并，同时状态名做了调整，把isFetching、error作为全局的UI逻辑状态合并：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;app&quot;:{
    &quot;isFetching&quot;: false,
      &quot;error&quot;: &quot;&quot;,
  },
  &quot;posts&quot;:{
    &quot;byId&quot;: {
      &quot;1&quot;: {
        ...
      },
      ...
    },
    &quot;allIds&quot;: [1, ...],
  } 
  &quot;comments&quot;: {
    ...
  },
  &quot;authors&quot;: {
    ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  <span class="hljs-string">"app"</span>:{
    <span class="hljs-string">"isFetching"</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-string">"error"</span>: <span class="hljs-string">""</span>,
  },
  <span class="hljs-string">"posts"</span>:{
    <span class="hljs-string">"byId"</span>: {
      <span class="hljs-string">"1"</span>: {
        ...
      },
      ...
    },
    <span class="hljs-string">"allIds"</span>: [<span class="hljs-number">1</span>, ...],
  } 
  <span class="hljs-string">"comments"</span>: {
    ...
  },
  <span class="hljs-string">"authors"</span>: {
    ...
  }
}</code></pre>
<p>这样，我们就可以定义appReducer、postsReducer、commentsReducer、authorsReducer四个reducer分别处理4个子状态。至此，State的结构设计完成。</p>
<p>总结一下，设计Redux State的关键在于，像设计数据库一样设计State。把State看作应用在内存中的一个数据库，action、reducer等看作操作这个数据库的SQL语句。</p>
<hr>
<p><strong>欢迎关注我的公众号：老干部的大前端，领取21本大前端精选书籍!</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV4lGT?w=540&amp;h=193" src="https://static.alili.tech/img/bV4lGT?w=540&amp;h=193" alt="3808299627-5a93ba468b59a" title="3808299627-5a93ba468b59a" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux进阶系列2: 如何合理地设计Redux的State

## 原文链接
[https://segmentfault.com/a/1190000010867852](https://segmentfault.com/a/1190000010867852)

