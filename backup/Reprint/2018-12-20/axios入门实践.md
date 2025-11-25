---
title: 'axios入门实践' 
date: 2018-12-20 2:30:10
hidden: true
slug: cbdt3juqm2q
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一 前言</h1>
<p>本文适合刚接触axios或者使用过几次的同学来分享交流一些入门经验，本文同样适用熟悉axios的同学来作为参考手册。<br>默认你已经看过axios的相关文档：<a href="https://www.kancloud.cn/yunye/axios/234845" rel="nofollow noreferrer" target="_blank">axios文档</a> <a href="https://github.com/axios/axios" rel="nofollow noreferrer" target="_blank">GitHub</a>，通过文档了解基础的使用之后，接下来你可以进入正文。</p>
<h1 id="articleHeader1">二 正文</h1>
<p><strong>axios = Ajax + 异步处理</strong></p>
<h2 id="articleHeader2">1.axios的get与post方法传入参数的区别</h2>
<p>（1）get</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>axios.get(<span class="hljs-string">'/user'</span>, {
    params: {
      ID: <span class="hljs-number">12345</span>
    }
  })
  .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(response)</span> {</span>
    console.<span class="hljs-built_in">log</span>(response);
  })
  .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(error)</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">error</span>);
  });
</code></pre>
<p>（2）post</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>axios.post(<span class="hljs-string">'/user'</span>, {
    firstName: <span class="hljs-string">'Fred'</span>,
    lastName: <span class="hljs-string">'Flintstone'</span>
  })
  .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(response)</span> {</span>
    console.<span class="hljs-built_in">log</span>(response);
  })
  .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(error)</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">error</span>);
  });</code></pre>
<p>get是放在参数对象的params属性里面，post是直接放在参数对象里面。</p>
<h2 id="articleHeader3">2.学会使用axios.create( )创建axios实例</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>var<span class="hljs-built_in"> instance </span>= axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});</code></pre>
<p>创建实例的好处：统一（批量）处理request/response<br>（1）例如你在每次的请求中都要带 cookie, 你或许可以在每个请求中这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get('/user1',{withCredentials:true});
axios.get('/user2',{withCredentials:true});
... ...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>axios.<span class="hljs-keyword">get</span>(<span class="hljs-string">'/user1'</span>,{withCredentials:<span class="hljs-literal">true</span>});
axios.<span class="hljs-keyword">get</span>(<span class="hljs-string">'/user2'</span>,{withCredentials:<span class="hljs-literal">true</span>});
... ...
</code></pre>
<p>但是你也可以这么用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var instance = axios.create({
    withCredentials:true
    });
   instance.get('/user1').then();
   instance.get('/user2').then();
    ... ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>var<span class="hljs-built_in"> instance </span>= axios.create({
    withCredentials:true
    });
   instance.get('/user1').then();
   instance.get('/user2').then();
<span class="hljs-keyword">    .</span>.. ...</code></pre>
<p>(2)如果你的多个请求前缀都是相同的，那么你就可以使用baseUrl<br>bad:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get('http://www.baidu.com/api/city').then();
axios.get('http://www.baidu.com/api/region').then();
axios.get('http://www.baidu.com/api/user').then();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.get</span>(<span class="hljs-string">'http://www.baidu.com/api/city'</span>)<span class="hljs-selector-class">.then</span>();
<span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.get</span>(<span class="hljs-string">'http://www.baidu.com/api/region'</span>)<span class="hljs-selector-class">.then</span>();
<span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.get</span>(<span class="hljs-string">'http://www.baidu.com/api/user'</span>)<span class="hljs-selector-class">.then</span>();
</code></pre>
<p>good:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var instance = axios.create({
    baseUrl: http://www.baidu.com/api
    });
instance.get('/city').then();
instance.get('/region').then();
instance.get('/user').then();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>var <span class="hljs-keyword">instance</span> = axios.create({
    baseUrl: http://www.baidu.com/api
    });
<span class="hljs-keyword">instance</span>.get(<span class="hljs-string">'/city'</span>).<span class="hljs-keyword">then</span>();
<span class="hljs-keyword">instance</span>.get(<span class="hljs-string">'/region'</span>).<span class="hljs-keyword">then</span>();
<span class="hljs-keyword">instance</span>.get(<span class="hljs-string">'/user'</span>).<span class="hljs-keyword">then</span>();</code></pre>
<p>(3)其他方法推荐<br>设置超时时间：timeout<br>设置报文头：header<br>等等</p>
<h2 id="articleHeader4">3.功能强大的拦截器：在请求或响应被 then 或 catch 处理前拦截它们</h2>
<p>（1）使用与取消<br>我们可以这么用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 添加请求拦截器</span>
axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">config</span>) </span>{
    <span class="hljs-comment">// 在发送请求之前做些什么</span>
    <span class="hljs-keyword">return</span> config;
  }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">// 对请求错误做些什么</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
  });

<span class="hljs-comment">// 添加响应拦截器</span>
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
    <span class="hljs-comment">// 对响应数据做点什么</span>
    <span class="hljs-keyword">return</span> response;
  }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">// 对响应错误做点什么</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
  });
</code></pre>
<p>建议将拦截器挂在到实例上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>var<span class="hljs-built_in"> instance </span>= axios.create();
instance.interceptors.request.use(function () {/*...*/});
</code></pre>
<p>如果你想在稍后移除拦截器，可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> myInterceptor = axios.interceptors.request.<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{<span class="hljs-comment">/*...*/</span>});
axios.interceptors.request.eject(myInterceptor);</code></pre>
<p>（2）注意事项<br>拦截器可以拦截请求和拦截响应，在请求或响应被 then 或 catch 处理前拦截它们。<br>它接受两个函数类型的参数，一个是成功请求/返回的函数，一个是失败请求/返回的函数；可以在这些函数里面做一些事情，例如对于401未授权的错误，我们可以重定向到登陆页：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="instance.interceptors.response.use(function (res) {
    return res;
},function(error){
    if (error.response.status === 401) {
        login();
        return;
      }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>instance.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(res)</span></span> {
    <span class="hljs-keyword">return</span> res;
},<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error)</span></span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">error</span>.response.<span class="hljs-built_in">status</span> === <span class="hljs-number">401</span>) {
        login();
        <span class="hljs-keyword">return</span>;
      }
});</code></pre>
<p>需要记住的是<em>一旦你返回成功，如果没什么事可做，其他的事交给then之后来做，记得返回response/request,</em>不然then接受不到响应。</p>
<p>（3）使用了拦截器处理相关问题，这样就不再需要使用catch来做错误的处理。</p>
<h2 id="articleHeader5">4.万恶的拦截器</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="instance.interceptors.response.use(function (res) {
    return res;
},function(error){
    if (error.response.status === 401) {
        /*一些处理*/
        throw error;
      }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>instance.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(res)</span></span> {
    <span class="hljs-keyword">return</span> res;
},<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error)</span></span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">error</span>.response.<span class="hljs-built_in">status</span> === <span class="hljs-number">401</span>) {
        /*一些处理*/
        throw <span class="hljs-built_in">error</span>;
      }
});</code></pre>
<p>无论是对成功的处理还是对失败的处理，如果拦截器不抛出错误throw error，那么终将还会执行then里面处理请求成功的函数，即使你返回undefined。<br>所以，建议在错误处理的最后抛出错误!</p>
<h2 id="articleHeader6">5.可供参考的二次封装</h2>
<p>转载文章链接：<a href="https://juejin.im/post/5a293e50f265da432153f190" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/5a293e...</a></p>
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
}, error => {
    if (error &amp;&amp; error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break;
        case 401:
          error.message = '未授权，请重新登录'
          break;
        case 403:
          error.message = '拒绝访问'
          break;
        case 404:
          error.message = '请求错误,未找到该资源'
          break;
        case 405:
          error.message = '请求方法未允许'
          break;
        case 408:
          error.message = '请求超时'
          break;
        case 500:
          error.message = '服务器端出错'
          break;
        case 501:
          error.message = '网络未实现'
          break;
        case 502:
          error.message = '网络错误'
          break;
        case 503:
          error.message = '服务不可用'
          break;
        case 504:
          error.message = '网络超时'
          break;
        case 505:
          error.message = 'http版本不支持该请求'
          break;
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      error.message = &quot;连接到服务器失败&quot;
    }
    Message.error(error);//Message 一个UI提示组件
      return Promise.resolve(error.response)
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
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//引入axios</span>
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
}, <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error)
})

<span class="hljs-comment">//响应拦截器即异常处理</span>
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> response
}, <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (error &amp;&amp; error.response) {
      <span class="hljs-keyword">switch</span> (error.response.status) {
        <span class="hljs-keyword">case</span> <span class="hljs-number">400</span>:
          error.message = <span class="hljs-string">'错误请求'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">401</span>:
          error.message = <span class="hljs-string">'未授权，请重新登录'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">403</span>:
          error.message = <span class="hljs-string">'拒绝访问'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">404</span>:
          error.message = <span class="hljs-string">'请求错误,未找到该资源'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">405</span>:
          error.message = <span class="hljs-string">'请求方法未允许'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">408</span>:
          error.message = <span class="hljs-string">'请求超时'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">500</span>:
          error.message = <span class="hljs-string">'服务器端出错'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">501</span>:
          error.message = <span class="hljs-string">'网络未实现'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">502</span>:
          error.message = <span class="hljs-string">'网络错误'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">503</span>:
          error.message = <span class="hljs-string">'服务不可用'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">504</span>:
          error.message = <span class="hljs-string">'网络超时'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">505</span>:
          error.message = <span class="hljs-string">'http版本不支持该请求'</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">default</span>:
          error.message = <span class="hljs-string">`连接错误<span class="hljs-subst">${error.response.status}</span>`</span>
      }
    } <span class="hljs-keyword">else</span> {
      error.message = <span class="hljs-string">"连接到服务器失败"</span>
    }
    Message.error(error);<span class="hljs-comment">//Message 一个UI提示组件</span>
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(error.response)
})

axios.defaults.baseURL = <span class="hljs-string">'/api'</span>
<span class="hljs-comment">//设置默认请求头</span>
axios.defaults.headers = {
    <span class="hljs-string">'X-Requested-With'</span>: <span class="hljs-string">'XMLHttpRequest'</span>
}
axios.defaults.timeout = <span class="hljs-number">10000</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">//get请求</span>
    <span class="hljs-keyword">get</span> (url,param) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span> {
        axios({
          method: <span class="hljs-string">'get'</span>,
          url,
          params: param,
          cancelToken: <span class="hljs-keyword">new</span> CancelToken(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> {
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
          method: <span class="hljs-string">'post'</span>,
          url,
          data: param,
          cancelToken: <span class="hljs-keyword">new</span> CancelToken(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> {
            cancel = c
          })
        }).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          resolve(res)
        })
      })
     }
  }</code></pre>
<p>注意：这段代码中没有创建axios实例，个人觉得创建实例会更方便调用。<br>根据官方文档，如何取消一个尚未得到响应的请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CancelToken = axios.CancelToken;
var cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

// cancel the request
cancel();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> CancelToken = axios.CancelToken;
<span class="hljs-keyword">var</span> cancel;

axios.get(<span class="hljs-string">'/user/12345'</span>, {
  cancelToken: <span class="hljs-keyword">new</span> CancelToken(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">executor</span><span class="hljs-params">(c)</span> </span>{
    <span class="hljs-comment">// An executor function receives a cancel function as a parameter</span>
    cancel = c;
  })
});

<span class="hljs-comment">// cancel the request</span>
cancel();
</code></pre>
<h1 id="articleHeader7">三 后记</h1>
<p>简单的介绍了一些常见事项和基础用法，有更多的内容等待大家去探索，欢迎留言交流～～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
axios入门实践

## 原文链接
[https://segmentfault.com/a/1190000012611865](https://segmentfault.com/a/1190000012611865)

