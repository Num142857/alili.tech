---
title: 'vue项目中对axios的二次封装' 
date: 2018-12-23 2:30:07
hidden: true
slug: zqs2pve9lp
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">近来在使用vue重构公司m站时，使用了axios来进行数据的请求，由于项目的需要，对axios进行了二次封装，<a href="http://github.com/axios/axios" rel="nofollow noreferrer" target="_blank">点击进入axios</a>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引入axios
import axios from 'axios'

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;
//请求拦截器
axios.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
      return config
}, error => {
    return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response
}, err => {
    if (err &amp;&amp; err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break;
        case 401:
          err.message = '未授权，请重新登录'
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = &quot;连接到服务器失败&quot;
    }
    message.err(err.message)
      return Promise.resolve(err.response)
})

axios.defaults.baseURL = '/api'
//设置默认请求头
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 10000

export default {
  //get请求
    get (url,param) {
      return new Promise((resolve,reject) => {
        axios({
          method: 'get',
          url,
          params: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res)
        })
      })
    },
  //post请求
    post (url,param) {
      return new Promise((resolve,reject) => {
        axios({
          method: 'post',
          url,
          data: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res)
        })
      })
     }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//引入axios</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>

<span class="hljs-keyword">let</span> cancel ,promiseArr = {}
<span class="hljs-keyword">const</span> CancelToken = axios.CancelToken;
<span class="hljs-comment">//请求拦截器</span>
axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
    <span class="hljs-comment">//发起请求时，取消掉当前正在进行的相同请求</span>
    <span class="hljs-keyword">if</span> (promiseArr[config.url]) {
        promiseArr[config.url](<span class="hljs-string">'操作取消'</span>)
        promiseArr[config.url] = cancel
    } <span class="hljs-keyword">else</span> {
        promiseArr[config.url] = cancel
    }
      <span class="hljs-keyword">return</span> config
}, error =&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error)
})

<span class="hljs-comment">//响应拦截器即异常处理</span>
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> response
}, err =&gt; {
    <span class="hljs-keyword">if</span> (err &amp;&amp; err.response) {
      <span class="hljs-keyword">switch</span> (err.response.status) {
        <span class="hljs-keyword">case</span> <span class="hljs-number">400</span>:
          err.message = <span class="hljs-string">'错误请求'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">401</span>:
          err.message = <span class="hljs-string">'未授权，请重新登录'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">403</span>:
          err.message = <span class="hljs-string">'拒绝访问'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">404</span>:
          err.message = <span class="hljs-string">'请求错误,未找到该资源'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">405</span>:
          err.message = <span class="hljs-string">'请求方法未允许'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">408</span>:
          err.message = <span class="hljs-string">'请求超时'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">500</span>:
          err.message = <span class="hljs-string">'服务器端出错'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">501</span>:
          err.message = <span class="hljs-string">'网络未实现'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">502</span>:
          err.message = <span class="hljs-string">'网络错误'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">503</span>:
          err.message = <span class="hljs-string">'服务不可用'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">504</span>:
          err.message = <span class="hljs-string">'网络超时'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">505</span>:
          err.message = <span class="hljs-string">'http版本不支持该请求'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">default</span>:
          err.message = <span class="hljs-string">`连接错误<span class="hljs-subst">${err.response.status}</span>`</span>
      }
    } <span class="hljs-keyword">else</span> {
      err.message = <span class="hljs-string">"连接到服务器失败"</span>
    }
    message.err(err.message)
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(err.response)
})

axios.defaults.baseURL = <span class="hljs-string">'/api'</span>
<span class="hljs-comment">//设置默认请求头</span>
axios.defaults.headers = {
    <span class="hljs-string">'X-Requested-With'</span>: <span class="hljs-string">'XMLHttpRequest'</span>
}
axios.defaults.timeout = <span class="hljs-number">10000</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">//get请求</span>
    get (url,param) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span> {
        axios({
          <span class="hljs-attr">method</span>: <span class="hljs-string">'get'</span>,
          url,
          <span class="hljs-attr">params</span>: param,
          <span class="hljs-attr">cancelToken</span>: <span class="hljs-keyword">new</span> CancelToken(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> {
            cancel = c
          })
        }).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          resolve(res)
        })
      })
    },
  <span class="hljs-comment">//post请求</span>
    post (url,param) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span> {
        axios({
          <span class="hljs-attr">method</span>: <span class="hljs-string">'post'</span>,
          url,
          <span class="hljs-attr">data</span>: param,
          <span class="hljs-attr">cancelToken</span>: <span class="hljs-keyword">new</span> CancelToken(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> {
            cancel = c
          })
        }).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          resolve(res)
        })
      })
     }
  }</code></pre>
<h1 id="articleHeader1">说明</h1>
<ol>
<li>为防止发起请求时，当前正在进行的相同请求，在请求拦截器中加入了hash判断，将相同请求url拦截</li>
<li>
<p>将axios中get，post公共配置抽离出来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.defaults.baseURL = '/api'
//设置默认请求头
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 10000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.baseURL</span> = <span class="hljs-string">'/api'</span>
<span class="hljs-comment">//设置默认请求头</span>
axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.headers</span> = {
    <span class="hljs-string">'X-Requested-With'</span>: <span class="hljs-string">'XMLHttpRequest'</span>
}
axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.timeout</span> = <span class="hljs-number">10000</span></code></pre>
</li>
<li>get，post请求的封装</li>
</ol>
<p>可能你会问，这里的axios返回的就是promise对象，为什么还要再次对get,post封装一次promise.因为我这边的话，在开发中使用async await会出现数据请求失败的情况，报的错就是返回的不是promise对象。(ps：可async await返回的就是promise呀,这个问题后续再搞一下)就直接return了一个promise对象，以避免上面的错误。下面是请求接口的一个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import req from '../api/requestType'
/**
 4. 拼团详情
 */
export const groupDetail = param => {
    return req.get('/RestHome/GroupDetail',param)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> req <span class="hljs-keyword">from</span> <span class="hljs-string">'../api/requestType'</span>
<span class="hljs-comment">/**
 4. 拼团详情
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> groupDetail = <span class="hljs-function"><span class="hljs-params">param</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> req.get(<span class="hljs-string">'/RestHome/GroupDetail'</span>,param)
}</code></pre>
<p>下面是数据的获取</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async getData() {
    const params = {
        TopCataID: 0,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
    }
    const res = await groupList(params)
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-function"><span class="hljs-keyword">async</span> <span class="hljs-title">getData</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> <span class="hljs-keyword">params</span> = {
        TopCataID: <span class="hljs-number">0</span>,
        pageNumber: <span class="hljs-keyword">this</span>.pageNumber,
        pageSize: <span class="hljs-keyword">this</span>.pageSize
    }
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> groupList(<span class="hljs-keyword">params</span>)
},</code></pre>
<ol><li>在相应拦截器中对请求常见的错误进行了全局异常处理</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.interceptors.response.use(response => {..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">axios<span class="hljs-selector-class">.interceptors</span><span class="hljs-selector-class">.response</span><span class="hljs-selector-class">.use</span>(response =&gt; {...</code></pre>
<p>到这里我们就简单的封装了一下适合自己项目的axios</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue项目中对axios的二次封装

## 原文链接
[https://segmentfault.com/a/1190000012332982](https://segmentfault.com/a/1190000012332982)

