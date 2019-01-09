---
title: '一些关于使用axios的心得' 
date: 2019-01-10 2:30:08
hidden: true
slug: d87erjw8roh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.带cookie请求</h2>
<p>​    axios默认是请求的时候不会带上cookie的，需要通过设置<code>withCredentials: true</code>来解决。</p>
<h2 id="articleHeader1">2.使post请求发送的是formdata格式数据</h2>
<ul>
<li>
<p>首先必须设置请求头</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//可以通过这种方式给axios设置的默认请求头
axios.defaults.headers = {
&quot;Content-Type&quot;: &quot;application/x-www-form-urlencoded&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//可以通过这种方式给axios设置的默认请求头</span>
axios.defaults.headers = {
<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"application/x-www-form-urlencoded"</span>
}</code></pre>
</li>
<li>
<p>其次再发送之前需要处理一下数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 发送请求前处理request的数据
axios.defaults.transformRequest = [function (data) {
// Do whatever you want to transform the data
let newData = ''
for (let k in data) {
newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&amp;'
}
return newData
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 发送请求前处理request的数据</span>
axios.defaults.transformRequest = [<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
<span class="hljs-comment">// Do whatever you want to transform the data</span>
<span class="hljs-keyword">let</span> newData = <span class="hljs-string">''</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> k <span class="hljs-keyword">in</span> data) {
newData += <span class="hljs-built_in">encodeURIComponent</span>(k) + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(data[k]) + <span class="hljs-string">'&amp;'</span>
}
<span class="hljs-keyword">return</span> newData
}]</code></pre>
</li>
</ul>
<h2 id="articleHeader2">3.拦截器</h2>
<blockquote>
<p>你可以截取请求或响应在被 then 或者 catch 处理之前。</p>
<p>举个小例子：发ajax请求的时候需要有一个loading动画，而在请求回来之后需要把loading动画关掉，就可以使用这个拦截器来实现。</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//添加请求拦截器
axios.interceptors.request.use(config => {
  //在发送请求之前做某事，比如说 设置loading动画显示
  return config
}, error => {
  //请求错误时做些事
  return Promise.reject(error)
})

//添加响应拦截器
axios.interceptors.response.use(response => {
  //对响应数据做些事，比如说把loading动画关掉
  return response
}, error => {
  //请求错误时做些事
  return Promise.reject(error)
})

//如果不想要这个拦截器也简单，可以删除拦截器
var myInterceptor = axios.interceptors.request.use(function () {/*...*/})
axios.interceptors.request.eject(myInterceptor)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//添加请求拦截器</span>
axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
  <span class="hljs-comment">//在发送请求之前做某事，比如说 设置loading动画显示</span>
  <span class="hljs-keyword">return</span> config
}, error =&gt; {
  <span class="hljs-comment">//请求错误时做些事</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error)
})

<span class="hljs-comment">//添加响应拦截器</span>
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
  <span class="hljs-comment">//对响应数据做些事，比如说把loading动画关掉</span>
  <span class="hljs-keyword">return</span> response
}, error =&gt; {
  <span class="hljs-comment">//请求错误时做些事</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error)
})

<span class="hljs-comment">//如果不想要这个拦截器也简单，可以删除拦截器</span>
<span class="hljs-keyword">var</span> myInterceptor = axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{<span class="hljs-comment">/*...*/</span>})
axios.interceptors.request.eject(myInterceptor)
</code></pre>
<hr>
<h2 id="articleHeader3">ps.另外附上自己在项目中使用axios的方式</h2>
<p>​    一般会将所有的ajax请求放在一个模块中，新建一个<code>http.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//http.js
//设置请求baseURL
axios.defaults.baseURL = '/api'
//设置默认请求头
axios.defaults.headers = {
&quot;Content-Type&quot;: &quot;application/x-www-form-urlencoded&quot;
}
// 发送请求前处理request的数据
axios.defaults.transformRequest = [function (data) {
let newData = ''
for (let k in data) {
  newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&amp;'
}
return newData
}]
// 带cookie请求
axios.defaults.withCredentials = true

//get请求
function get(url) {
    return body => axios.get(url, { params: body })
  }
//post请求
function post(url) {
return body => axios.post(url, body)
}

//导出使用 
export const login = get('/login')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//http.js</span>
<span class="hljs-comment">//设置请求baseURL</span>
axios.defaults.baseURL = <span class="hljs-string">'/api'</span>
<span class="hljs-comment">//设置默认请求头</span>
axios.defaults.headers = {
<span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"application/x-www-form-urlencoded"</span>
}
<span class="hljs-comment">// 发送请求前处理request的数据</span>
axios.defaults.transformRequest = [<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
<span class="hljs-keyword">let</span> newData = <span class="hljs-string">''</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> k <span class="hljs-keyword">in</span> data) {
  newData += <span class="hljs-built_in">encodeURIComponent</span>(k) + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(data[k]) + <span class="hljs-string">'&amp;'</span>
}
<span class="hljs-keyword">return</span> newData
}]
<span class="hljs-comment">// 带cookie请求</span>
axios.defaults.withCredentials = <span class="hljs-literal">true</span>

<span class="hljs-comment">//get请求</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">body</span> =&gt;</span> axios.get(url, { <span class="hljs-attr">params</span>: body })
  }
<span class="hljs-comment">//post请求</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">post</span>(<span class="hljs-params">url</span>) </span>{
<span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">body</span> =&gt;</span> axios.post(url, body)
}

<span class="hljs-comment">//导出使用 </span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> login = get(<span class="hljs-string">'/login'</span>)</code></pre>
<p>假设配合vue使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入login模块
import { login } from 'http'
export default {
  methods:{
    //配合 async/await使用效果更佳
      async get() {
          try {
              let res = await login({ account: 'admin' })
              console.log(res)
          } 
          catch (e) {
              console.log(e)
          }
      }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 引入login模块</span>
<span class="hljs-keyword">import</span> { login } <span class="hljs-keyword">from</span> <span class="hljs-string">'http'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span>:{
    <span class="hljs-comment">//配合 async/await使用效果更佳</span>
      <span class="hljs-keyword">async</span> get() {
          <span class="hljs-keyword">try</span> {
              <span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> login({ <span class="hljs-attr">account</span>: <span class="hljs-string">'admin'</span> })
              <span class="hljs-built_in">console</span>.log(res)
          } 
          <span class="hljs-keyword">catch</span> (e) {
              <span class="hljs-built_in">console</span>.log(e)
          }
      }
    }
}</code></pre>
<hr>
<blockquote>
<p>再另外有些人可能喜欢把axios挂载到Vue的原型上，从而在子组件内可以直接访问的到，做法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.$http = axios  //其他页面在使用axios的时候直接  this.$http就可以了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Vue.prototype.$http = axios  <span class="hljs-comment">//其他页面在使用axios的时候直接  this.$http就可以了</span></code></pre>
<p>除非页面足够简单，不然我个人不太喜欢这种做法。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一些关于使用axios的心得

## 原文链接
[https://segmentfault.com/a/1190000010002593](https://segmentfault.com/a/1190000010002593)

