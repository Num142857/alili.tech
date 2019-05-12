---
title: '如何优雅的在Vue Project中使用vue-apollo' 
date: 2019-01-05 2:30:10
hidden: true
slug: ipqaf7cbkdf
categories: [reprint]
---

{{< raw >}}

                    
<p>首先我们来熟悉下graphql的工作机制</p>
<p>一个GraphQL查询可以包含一个或者多个操作（operation），类似于一个RESTful API。操作（operation）可以使两种类型：查询（Query）或者修改（mutation）。我们看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`query {
  client(id: 1) {
    id 
    name
  }
}`    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>`query {
  client(<span class="hljs-built_in">id</span>: <span class="hljs-number">1</span>) {
    <span class="hljs-built_in">id</span> 
    <span class="hljs-built_in">name</span>
  }
}`    </code></pre>
<p>那么问题来了，我们已经用熟了axios或者fetch 再或者ajax来进行数据的交互，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getRecommdBook (type) {
      this.axios.get(`/books/web/recommendation-api/recommendation/official?type=${type}`)
        .then(res => {
          if (res.data) {
            this.recommdBookfun(res.data)
            console.log(this.recommdBook)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>getRecommdBook (<span class="hljs-keyword">type</span>) {
      <span class="hljs-keyword">this</span>.axios.get(<span class="hljs-string">`/books/web/recommendation-api/recommendation/official?type=<span class="hljs-subst">${type}</span>`</span>)
        .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          <span class="hljs-keyword">if</span> (res.data) {
            <span class="hljs-keyword">this</span>.recommdBookfun(res.data)
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.recommdBook)
          }
        })
        .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
          <span class="hljs-built_in">console</span>.log(err)
        })
    },
</code></pre>
<p>怎样以我们熟悉的形式来运用apollo，使查询更加简便呢</p>
<p>首先我们先在vue项目中引用apollo-vue（apollo非亲生儿子） 作者是Guillaume Chau（vue的开发团队人员）</p>
<p>git<a href="https://github.com/Akryum/vue-apollo" rel="nofollow noreferrer" target="_blank">：</a><a href="https://github.com/Akryum/vue-apollo" rel="nofollow noreferrer" target="_blank">https://github.com/Akryum/vue...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save vue-apollo apollo-client" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save vue-apollo apollo-client</span></code></pre>
<p>main.js引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// apollo配置

    import { ApolloClient, createNetworkInterface } from 'apollo-client'
    import VueApollo from 'vue-apollo'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// apollo配置</span>

    <span class="hljs-keyword">import</span> { ApolloClient, createNetworkInterface } <span class="hljs-keyword">from</span> <span class="hljs-string">'apollo-client'</span>
    <span class="hljs-keyword">import</span> VueApollo <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-apollo'</span></code></pre>
<p>构建客户端<br>可以构建多个适应不同接口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const networkInterfaceTask = createNetworkInterface({
      uri: '/api/tasks/graphql',
      transportBatching: true,
      opts: {
        credentials: 'include'
      }
    })
    
    const apolloClientTask = new ApolloClient({
      networkInterface: networkInterfaceTask,
      connectToDevTools: true
    })
    
    const apolloProvider = new VueApollo({
      clients: {
        task: apolloClientTask
      },
      defaultClient: apolloClientTask
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>    <span class="hljs-string">const</span> <span class="hljs-string">networkInterfaceTask</span> <span class="hljs-string">=</span> <span class="hljs-string">createNetworkInterface({</span>
<span class="hljs-attr">      uri:</span> <span class="hljs-string">'/api/tasks/graphql'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      transportBatching:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">      opts:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        credentials:</span> <span class="hljs-string">'include'</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">})</span>
    
    <span class="hljs-string">const</span> <span class="hljs-string">apolloClientTask</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">ApolloClient({</span>
<span class="hljs-attr">      networkInterface:</span> <span class="hljs-string">networkInterfaceTask,</span>
<span class="hljs-attr">      connectToDevTools:</span> <span class="hljs-literal">true</span>
    <span class="hljs-string">})</span>
    
    <span class="hljs-string">const</span> <span class="hljs-string">apolloProvider</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">VueApollo({</span>
<span class="hljs-attr">      clients:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        task:</span> <span class="hljs-string">apolloClientTask</span>
      <span class="hljs-string">},</span>
<span class="hljs-attr">      defaultClient:</span> <span class="hljs-string">apolloClientTask</span>
    <span class="hljs-string">})</span></code></pre>
<p>使用apollo</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.use(VueApollo)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>Vue.<span class="hljs-keyword">use</span>(VueApollo)
</code></pre>
<p>根目录引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: '#app',
  router,
  axios,
  store,
  apolloProvider,
  template: '<App/>',
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
  router,
  axios,
  store,
  apolloProvider,
  <span class="hljs-attribute">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  <span class="hljs-attribute">components</span>: { App }
})</code></pre>
<p>好到此为止，基础配置就已经ok了<br>接下来就是实际的请求了<br>在vue 的组件中，比如 test.vue</p>
<p>我们的例子是带参数的查询<br>首先在组件里构建查询的变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import gql from 'graphql-tag'

const getErSeasons = gql`query erSeasons($classId: Long!) {
                            erSeasons{
                              id
                              name
                              startTime
                              endTime
                              classTask(class:$classId){
                                id
                                classId
                                startTime
                                endTime
                                status
                              }
                            }
                          }`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">import</span> gql from <span class="hljs-string">'graphql-tag'</span>

const getErSeasons = gql`query erSeasons($classId: Long!) {
                            erSeasons{
                              id
                              name
                              startTime
                              endTime
                              classTask(class:$classId){
                                id
                                classId
                                startTime
                                endTime
                                status
                              }
                            }
                          }`</code></pre>
<p>不懂的话先去查下教程api<br>   然后在methods里面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" changeClass (id) {
      this.ClassSeasons = []
      this.Select = id
      console.log(this.$apollo.query)
      this.$apollo.query({
        query: getErSeasons,
        variables: {
          classId: this.Select
        }
      })
        .then(res => {
          this.Parse(res.data.erSeasons)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    
这个形式是不是有点熟悉了。哈哈哈
可以了。以后就又可以愉快的装逼了
本文章只适于初学者

作者：考拉阅读前端工程师
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> changeClass (id) {
      <span class="hljs-keyword">this</span>.ClassSeasons = []
      <span class="hljs-keyword">this</span>.Select = id
      console.log(<span class="hljs-keyword">this</span>.$apollo.query)
      <span class="hljs-keyword">this</span>.$apollo.query({
        query: getErSeasons,
        variables: {
          classId: <span class="hljs-keyword">this</span>.Select
        }
      })
        .then(res =&gt; {
          <span class="hljs-keyword">this</span>.Parse(res.<span class="hljs-keyword">data</span>.erSeasons)
          console.log(res)
        })
        .<span class="hljs-keyword">catch</span>(err =&gt; {
          console.log(err)
        })
    }
    
这个形式是不是有点熟悉了。哈哈哈
可以了。以后就又可以愉快的装逼了
本文章只适于初学者

作者：考拉阅读前端工程师
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何优雅的在Vue Project中使用vue-apollo

## 原文链接
[https://segmentfault.com/a/1190000010569331](https://segmentfault.com/a/1190000010569331)

