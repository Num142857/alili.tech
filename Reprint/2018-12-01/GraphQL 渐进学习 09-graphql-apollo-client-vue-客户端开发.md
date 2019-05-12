---
title: 'GraphQL 渐进学习 09-graphql-apollo-client-vue-客户端开发' 
date: 2018-12-01 2:30:12
hidden: true
slug: sxm2pnqm6b
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">GraphQL 渐进学习 09-graphql-apollo-client-vue-客户端开发</h1>
<h2 id="articleHeader1">软件环境</h2>
<ul><li>vue &gt; 2.5.x</li></ul>
<h2 id="articleHeader2">目标</h2>
<ul>
<li>创建 graphql 客户端</li>
<li>封装请求处理</li>
<li>基于 token 验证</li>
</ul>
<h2 id="articleHeader3">代码</h2>
<ul><li><a href="https://github.com/ducafecat/eggjs-graphql-vue-example/tree/master/vue-client" rel="nofollow noreferrer" target="_blank">ducafecat/eggjs-graphql-example/vue-client</a></li></ul>
<h2 id="articleHeader4">步骤</h2>
<h3 id="articleHeader5">1 安装依赖包</h3>
<ul><li><code>npm install</code></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save vue-apollo graphql apollo-client apollo-link apollo-link-http apollo-cache-inmemory graphql-tag" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install --save vue-apollo graphql apollo-client apollo-link apollo-link-http apollo-cache-inmemory graphql-tag</code></pre>
<ul><li>
<code>webpack.json</code> 包清单</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;dependencies&quot;: {
    &quot;apollo-cache-inmemory&quot;: &quot;^1.2.0&quot;,
    &quot;apollo-client&quot;: &quot;^2.3.0&quot;,
    &quot;apollo-link&quot;: &quot;^1.2.2&quot;,
    &quot;apollo-link-http&quot;: &quot;^1.5.4&quot;,
    &quot;element-ui&quot;: &quot;^2.3.7&quot;,
    &quot;graphql&quot;: &quot;^0.13.2&quot;,
    &quot;graphql-tag&quot;: &quot;^2.9.2&quot;,
    &quot;vue&quot;: &quot;^2.5.2&quot;,
    &quot;vue-apollo&quot;: &quot;^3.0.0-beta.5&quot;,
    &quot;vue-router&quot;: &quot;^3.0.1&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-attr">"apollo-cache-inmemory"</span>: <span class="hljs-string">"^1.2.0"</span>,
    <span class="hljs-attr">"apollo-client"</span>: <span class="hljs-string">"^2.3.0"</span>,
    <span class="hljs-attr">"apollo-link"</span>: <span class="hljs-string">"^1.2.2"</span>,
    <span class="hljs-attr">"apollo-link-http"</span>: <span class="hljs-string">"^1.5.4"</span>,
    <span class="hljs-attr">"element-ui"</span>: <span class="hljs-string">"^2.3.7"</span>,
    <span class="hljs-attr">"graphql"</span>: <span class="hljs-string">"^0.13.2"</span>,
    <span class="hljs-attr">"graphql-tag"</span>: <span class="hljs-string">"^2.9.2"</span>,
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^2.5.2"</span>,
    <span class="hljs-attr">"vue-apollo"</span>: <span class="hljs-string">"^3.0.0-beta.5"</span>,
    <span class="hljs-attr">"vue-router"</span>: <span class="hljs-string">"^3.0.1"</span>
  },</code></pre>
<blockquote>如果遇到代码编译问题，请对照我使用的包版本</blockquote>
<h3 id="articleHeader6">2 编写 <code>webpack</code> 配置</h3>
<ul><li>文件 <code>build/webpack.base.conf.js</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  module: {
    rules: [
      ...
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
      ...
    ]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  module: {
    rules: [
      ...
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
      ...
    ]
  }</code></pre>
<ul>
<li>当 <code>import</code> 时，自动做 <code>schema js</code> 包装</li>
<li>如 <code>import QUERY_USER from '@/graphql/user.graphql'</code> ，把 <code>QUERY_USER</code> 打印看看</li>
</ul>
<h3 id="articleHeader7">3 编写 <code>config.json</code> 配置</h3>
<ul><li>文件 <code>src/utils/config.json</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;graphqlServer&quot;: &quot;http://127.0.0.1:7001/graphql&quot;,
  &quot;tokenName&quot;: &quot;UU_AUTH_TOKEN&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"graphqlServer"</span>: <span class="hljs-string">"http://127.0.0.1:7001/graphql"</span>,
  <span class="hljs-attr">"tokenName"</span>: <span class="hljs-string">"UU_AUTH_TOKEN"</span>
}</code></pre>
<ul>
<li>
<code>graphqlServer</code> 服务器地址</li>
<li>
<code>tokenName</code> 本地写 <code>localStorage</code> <code>key</code> 名称 ，推荐大家做本地化可以用 <code>cookie</code> 设置过期时间</li>
</ul>
<h3 id="articleHeader8">4 编写 <code>VueApollo</code> 适配器</h3>
<ul><li>文件 <code>src/apolloProvider.js</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { ApolloLink, concat, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import Config from '@/utils/config.json'

Vue.use(VueApollo)

const httpLink = new HttpLink({
  uri: Config.graphqlServer,
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(Config.tokenName) || null
  operation.setContext({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return forward(operation);
})

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  },
  errorHandler (error) {
    console.log('Global apollo error handler')
    console.error(error)
  }
})

export default apolloProvider" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> {ApolloClient} <span class="hljs-keyword">from</span> <span class="hljs-string">'apollo-client'</span>
<span class="hljs-keyword">import</span> {HttpLink} <span class="hljs-keyword">from</span> <span class="hljs-string">'apollo-link-http'</span>
<span class="hljs-keyword">import</span> {InMemoryCache} <span class="hljs-keyword">from</span> <span class="hljs-string">'apollo-cache-inmemory'</span>
<span class="hljs-keyword">import</span> VueApollo <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-apollo'</span>
<span class="hljs-keyword">import</span> { ApolloLink, concat, split } <span class="hljs-keyword">from</span> <span class="hljs-string">'apollo-link'</span>;
<span class="hljs-keyword">import</span> { getMainDefinition } <span class="hljs-keyword">from</span> <span class="hljs-string">'apollo-utilities'</span>;
<span class="hljs-keyword">import</span> Config <span class="hljs-keyword">from</span> <span class="hljs-string">'@/utils/config.json'</span>

Vue.use(VueApollo)

<span class="hljs-keyword">const</span> httpLink = <span class="hljs-keyword">new</span> HttpLink({
  <span class="hljs-attr">uri</span>: Config.graphqlServer,
})

<span class="hljs-keyword">const</span> authMiddleware = <span class="hljs-keyword">new</span> ApolloLink(<span class="hljs-function">(<span class="hljs-params">operation, forward</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> token = localStorage.getItem(Config.tokenName) || <span class="hljs-literal">null</span>
  operation.setContext({
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-attr">Authorization</span>: <span class="hljs-string">`Bearer <span class="hljs-subst">${token}</span>`</span>
    }
  });
  <span class="hljs-keyword">return</span> forward(operation);
})

<span class="hljs-keyword">const</span> apolloClient = <span class="hljs-keyword">new</span> ApolloClient({
  <span class="hljs-attr">link</span>: concat(authMiddleware, httpLink),
  <span class="hljs-attr">cache</span>: <span class="hljs-keyword">new</span> InMemoryCache(),
  <span class="hljs-attr">connectToDevTools</span>: <span class="hljs-literal">true</span>,
})

<span class="hljs-keyword">const</span> apolloProvider = <span class="hljs-keyword">new</span> VueApollo({
  <span class="hljs-attr">defaultClient</span>: apolloClient,
  <span class="hljs-attr">defaultOptions</span>: {
    <span class="hljs-attr">$loadingKey</span>: <span class="hljs-string">'loading'</span>
  },
  errorHandler (error) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Global apollo error handler'</span>)
    <span class="hljs-built_in">console</span>.error(error)
  }
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> apolloProvider</code></pre>
<blockquote>
<code>authMiddleware</code> 中写入 <code>Request headers token</code><br><code>apolloClient</code> 中定义 <code>cache: new InMemoryCache()</code>
</blockquote>
<ul><li>文件 <code>src/main.js</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import apolloProvider from './apolloProvider'
...
new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> apolloProvider <span class="hljs-keyword">from</span> <span class="hljs-string">'./apolloProvider'</span>
...
new Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">provide</span>: apolloProvider.provide(),
  ...
})</code></pre>
<h3 id="articleHeader9">5 编写 <code>schema</code> 定义</h3>
<ul><li>项目中的请求定义 我都放在了 目录 <code>src/graphql</code> 下，有点像 <code>restful</code> 的 <code>api</code> 定义</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── removeUser.graphql
├── user.graphql
└── users.graphql" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">.
├── removeUser.graphql
├── user.graphql
└── users.graphql</code></pre>
<ul><li>我这里写了 2 个查询 1 个更新操作，名称和服务端定义一致，这样方便查询修改</li></ul>
<h3 id="articleHeader10">6 编写 <code>Graphql</code> 请求</h3>
<ul>
<li>文件 <code>src/components/HelloWorld.vue</code>
</li>
<li>官方 <code>readme.md</code> 中只写了一种 <code>组件</code> 方式调用，我还是喜欢 <code>api</code> 方式</li>
<li>代码 <a href="https://github.com/ducafecat/eggjs-graphql-vue-example/blob/master/vue-client/src/components/HelloWorld.vue" rel="nofollow noreferrer" target="_blank">HelloWorld.vue</a>
</li>
</ul>
<h4>6.1 <code>组件</code> 方式</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  apollo: {
    login: {
      query: gql`
        query queryFun($username: String!, $password: String!) {
          user(username: $username, password: $password) {
            id
            name
            token
          }
        }
      `,
      variables() {
        return {
          username: 'ducafecat',
          password: '345457yftgyhdsfghre'
        }
      },
      manual: true,
      result({data, loading}) {
        console.log(data, loading)
        if (!loading) {
          this.res = data
        }
      }
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  apollo: {
    <span class="hljs-attr">login</span>: {
      <span class="hljs-attr">query</span>: gql<span class="hljs-string">`
        query queryFun($username: String!, $password: String!) {
          user(username: $username, password: $password) {
            id
            name
            token
          }
        }
      `</span>,
      variables() {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">username</span>: <span class="hljs-string">'ducafecat'</span>,
          <span class="hljs-attr">password</span>: <span class="hljs-string">'345457yftgyhdsfghre'</span>
        }
      },
      <span class="hljs-attr">manual</span>: <span class="hljs-literal">true</span>,
      result({data, loading}) {
        <span class="hljs-built_in">console</span>.log(data, loading)
        <span class="hljs-keyword">if</span> (!loading) {
          <span class="hljs-keyword">this</span>.res = data
        }
      }
    }
  }
}
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>这种方式做查询，适合功能单一的展示组件，灵活性感觉还是差了点，有兴趣的可以去掉注释大家体会下。</p>
<h4>6.2 <code>api</code> 方式</h4>
<ul><li>
<code>query</code> 查询</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import QUERY_USER from '@/graphql/user.graphql'
...
  methods: {
    handleLogin() {
      this.clearData()
      this.$apollo
        .query({
          // Query
          query: QUERY_USER,
          variables: {
            username: 'ducafecat',
            password: '12321321321321432'
          },
        })
        .then(response => {
          this.loading = false
          this.res = response.data
          localStorage.setItem(Config.tokenName, this.res.user.token)
          alert('登录成功，写入Token完成，重新装载 apolloProvider')
          window.location.reload()
        })
        .catch(error => {
          this.loading = false
          this.err = error
        })
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> QUERY_USER <span class="hljs-keyword">from</span> <span class="hljs-string">'@/graphql/user.graphql'</span>
...
  methods: {
    handleLogin() {
      <span class="hljs-keyword">this</span>.clearData()
      <span class="hljs-keyword">this</span>.$apollo
        .query({
          <span class="hljs-comment">// Query</span>
          query: QUERY_USER,
          <span class="hljs-attr">variables</span>: {
            <span class="hljs-attr">username</span>: <span class="hljs-string">'ducafecat'</span>,
            <span class="hljs-attr">password</span>: <span class="hljs-string">'12321321321321432'</span>
          },
        })
        .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.loading = <span class="hljs-literal">false</span>
          <span class="hljs-keyword">this</span>.res = response.data
          localStorage.setItem(Config.tokenName, <span class="hljs-keyword">this</span>.res.user.token)
          alert(<span class="hljs-string">'登录成功，写入Token完成，重新装载 apolloProvider'</span>)
          <span class="hljs-built_in">window</span>.location.reload()
        })
        .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.loading = <span class="hljs-literal">false</span>
          <span class="hljs-keyword">this</span>.err = error
        })
    },</code></pre>
<ul><li>
<code>mutate</code> 更新</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    handleRemoveUser() {
      this.clearData()
      this.$apollo
        .mutate({
          // Query
          mutation: MUTATION_REMOVE_USER,
          variables: {
            id: 123
          }
        })
        .then(response => {
          this.loading = false
          this.res = response.data
        })
        .catch(error => {
          this.loading = false
          this.err = error
        })
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    handleRemoveUser() {
      <span class="hljs-keyword">this</span>.clearData()
      <span class="hljs-keyword">this</span>.$apollo
        .mutate({
          <span class="hljs-comment">// Query</span>
          mutation: MUTATION_REMOVE_USER,
          <span class="hljs-attr">variables</span>: {
            <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>
          }
        })
        .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.loading = <span class="hljs-literal">false</span>
          <span class="hljs-keyword">this</span>.res = response.data
        })
        .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.loading = <span class="hljs-literal">false</span>
          <span class="hljs-keyword">this</span>.err = error
        })
    },</code></pre>
<h2 id="articleHeader11">参考</h2>
<h3 id="articleHeader12">1 文章</h3>
<ul>
<li><a href="https://github.com/Akryum/vue-apollo" rel="nofollow noreferrer" target="_blank">vue-apollo</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/30604868" rel="nofollow noreferrer" target="_blank">Egg/GraphQL</a></li>
<li><a href="http://facebook.github.io/graphql/October2016/" rel="nofollow noreferrer" target="_blank">facebook/GraphQL</a></li>
<li><a href="https://developer.github.com/v4/" rel="nofollow noreferrer" target="_blank">GraphQL API v4</a></li>
<li><a href="https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql" rel="nofollow noreferrer" target="_blank">github/authenticating-with-graphql</a></li>
<li><a href="https://github.com/Akryum/vueconf-2017-demo" rel="nofollow noreferrer" target="_blank">VueConf 2017 demo</a></li>
</ul>
<h3 id="articleHeader13">2 组件</h3>
<ul>
<li><a href="https://github.com/Akryum/vue-apollo" rel="nofollow noreferrer" target="_blank">vue-apollo</a></li>
<li><a href="https://www.npmjs.com/package/apollo-client" rel="nofollow noreferrer" target="_blank">apollo-client</a></li>
<li><a href="https://github.com/auth0/node-jsonwebtoken" rel="nofollow noreferrer" target="_blank">jsonwebtoken</a></li>
<li><a href="https://github.com/Akryum/vue-apollo/issues/144" rel="nofollow noreferrer" target="_blank">ApolloLink Set headers</a></li>
<li><a href="https://github.com/ElemeFE/element" rel="nofollow noreferrer" target="_blank">element-ui</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
GraphQL 渐进学习 09-graphql-apollo-client-vue-客户端开发

## 原文链接
[https://segmentfault.com/a/1190000014755531](https://segmentfault.com/a/1190000014755531)

