---
title: '如何利用GitHub GraphQL API开发个人博客？' 
date: 2018-12-03 2:30:08
hidden: true
slug: rsktiicfvqj
categories: [reprint]
---

{{< raw >}}

                    
<p>作为一个程序员，搭建一个个人博客几乎是所有人的需求，一来比较酷，二来也可以记录自己的学习和生活总结。但如果你不是全栈工程师，实现这个需求还是有点麻烦。后端搭建一套现有的前端框架及前端写API都还是有一定门槛的，当然，如果你是大牛当我没说，哈哈哈！</p>
<p>下面，我将介绍一个特别简单的方法，甚至不用写代码，执行几个命令就可以搭建一个博客，就算你不是程序员，也是So easy。那就是：fork<a href="https://github.com/simbawus/blog" rel="nofollow noreferrer">我的博客</a>。为什么说fork我的博客就可以搭建一个博客呢？博客重要的是有内容，并且可以随时更新，而不是一个静态页。这就要用到本文的核心：<a href="https://developer.github.com/v4/" rel="nofollow noreferrer">GitHub GraphQL API</a>，这是github提供的一个开放式的API。我们只需要将文章用Markdown写好后，放到博客项目Issues里面，然后通过这个api，获取我们的写的文章，再前端渲染，就可以啦！！是不是特别棒，都不要写API，也不用考虑文章存哪。下面我来介绍如何实现：</p>
<h2>获取access token</h2>
<p>请求GitHub GraphQL API，首先需要按照以下步骤在github申请一个access token：</p>
<blockquote>右上角个人头像 &gt; Settings &gt; Developer settings &gt; Personal access tokens &gt; Generate new token</blockquote>
<p>然后在Token description 写好关于这个token的描述，在<strong>Select scopes</strong>选择相应的权限，这里只需要user &gt;  read:user 就可以，点击<strong>Generate token</strong>按钮后会跳转到token列表页，这时需要马上把这个token记录下来，因为这是敏感数据，刷新后就没有了，不然得重新申请。</p>
<h2>项目搭建</h2>
<p>建议大家直接Fork我的项目 <a href="https://github.com/simbawus/blog" rel="nofollow noreferrer">simbawus/blog</a>，再修改相应配置，这样可以免去开发的成本，并且这个项目会持续更新，配置修改及启动可查看我项目的README。当然也可以fork后进行二次开发。也十分鼓励大家从零开始开发，也顺便练练手。</p>
<h2>获取GraphQL API数据</h2>
<p>关于GraphQL的介绍，可查看我些的这篇文章<a href="https://github.com/simbawus/blog/issues/10" rel="nofollow noreferrer">前端应该知道的GraphQL</a>。</p>
<p><a href="https://developer.github.com/v4/" rel="nofollow noreferrer">GitHub GraphQL API</a>的文档并没有使用示例，如果之前没用过GraphQL API，还是有点懵的，下面我举三个常见的例子说明下，具体可以看我博客代码，别忘了Star噢～。</p>
<h4>获取标签及相关issues</h4>
<p>通常，我们会在博客首页设计一个有分类的文章列表，这就要求在发布Issue时需要选择对应的label。先看<a href="https://developer.github.com/v4/object/label/" rel="nofollow noreferrer">官方label文档</a>：</p>
<p>Connections 里面有issues，所以在查询labels的同时，还可以查询issues。先列出要传输的数据data，核心也在这：</p>
<pre><code class="javascript">data = {
  query: `query {
    repository(owner:"simbawus", name: "blog") {
      issues(orderBy:{field: UPDATED_AT, direction: DESC} , labels: null, first: 10, after: ${page}) {
        edges{
          cursor
          node{
            title
            updatedAt
            bodyText
            number
          }
        }
      }
      labels(first: 100){
        nodes{
          name
        }
      }
    }
  }`
};</code></pre>
<p><code>repository</code>代表查询指定的仓库，括号里的参数owner代表这个仓库的所有者，name代表仓库名称。<code>issues</code>表示要查询的issue列表，里面的参数表示这个列表的条件：<code>orderBy</code>为排序方式，根据更新时间UPDATED_AT和倒序DESC来，<code>labels</code>为null，说明查询的是所有issues，<code>first</code>表示一次查询返回的issues数量，<code>after</code>传上一个issue的id，可用来分页，最终这次请求拿到的数据结构如下，完整的请浏览器查看：</p>
<pre><code class="json">{
  "data": {
    "repository": {
      "issues": {
        "edges": {
          "0": {
            "cursor": "Y3Vyc29yOnYyOpK5MjAxOC0wNC0yNlQxMDoyNjoxNiswODowMM4S8hYL",
            "node": {
              "bodyText": "作为一个程序员...",
              "number": "11",
              "title": "如何利用GitHub GraphQL API开发个人博客？",
              "updatedAt": "2018-04-22T03:46:34Z",
            }
          }
        }
      },
      "labels": {
        "nodes": {
          "0": {
            "name": "JavaScript"
          }
        }
      }
    }
  }
}</code></pre>
<h4>搜索</h4>
<p>search这个connections的文档写的让我一脸懵逼，摸索了好久才写出来，大家可以试着按<a href="https://developer.github.com/v4/query/#connections" rel="nofollow noreferrer">官网文档</a>写一下。</p>
<pre><code class="javascript">let data = {
  query: `query {
      search(query:"${keyWords} repo:simbawus/blog", type: ISSUE, first: 10) {
        issueCount
        edges{
          cursor
          node{
            ... on Issue {
              title
              number
              bodyText
              updatedAt
            }
          }
        }
      }
    }`
};</code></pre>
<p>search的query参数类型为String!，表示一个非空的字符串，怎么也想不到要这么写才行吧？<code>query:"${keyWords} repo:simbawus/blog"</code>。node 这个fields的文档，看的也是二脸懵逼，还好想到es6的扩展符。</p>
<h4>详情</h4>
<p>最重要的是文章内容这部分了，传输数据比较简单：</p>
<pre><code class="javascript">let data = {
  query: `query {
    repository(owner:"simbawus", name: "blog") {
      issue(number: ${articleId}) {
        title
        updatedAt
        bodyHTML
      }
    }
  }`
};</code></pre>
<p>请求直接返回一段HTML，问题是如何处理这段HTML，格式化并且高亮文章里面的代码。这里我用的是React的<code>dangerouslySetInnerHTML</code>和github的css库<code>github-markdown-css</code>，核心代码如下：</p>
<pre><code class="javascript">import 'github-markdown-css';
class ArticlePage extends React.Component {
  _renderHTML() {
    return { __html: this.state.bodyHTML };
  }
  render() {
    return ( 
      &lt;div  className = 'markdown-body'
            dangerouslySetInnerHTML = { this._renderHTML() } &gt;
      &lt;/div&gt;
    );
  }
}</code></pre>
<p>结合GitHub GraphQL API开发个人博客的核心内容基本就这么多了，具体代码欢迎查看github：<a href="https://github.com/simbawus/blog" rel="nofollow noreferrer">simbawus/blog</a>，一起踩坑。</p>
<h2>欢迎讨论，点个赞再走吧～</h2>
<p>文章同步于以下社区，可以选一个关注我噢 ｡◕‿◕｡</p>
<p><a href="http://www.simbawu.com/blog" rel="nofollow noreferrer">simbawu</a> | <a href="https://github.com/simbawus/blog/issues" rel="nofollow noreferrer">github</a> | <a href="https://segmentfault.com/u/simbawu/articles">segmentfault</a> | <a href="https://www.zhihu.com/people/wusb/posts" rel="nofollow noreferrer">知乎</a> | <a href="https://www.jianshu.com/u/54986e6d5fa7" rel="nofollow noreferrer">简书</a> | <a href="https://juejin.im/user/59cd9cb8518825745c637de0/activities" rel="nofollow noreferrer">掘金</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何利用GitHub GraphQL API开发个人博客？

## 原文链接
[https://segmentfault.com/a/1190000014613391](https://segmentfault.com/a/1190000014613391)

