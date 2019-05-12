---
title: 'vue 2之 axios' 
date: 2018-12-15 2:30:11
hidden: true
slug: dqe6o2e8pyj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue.js 2之axios</h2>
<p><strong>1、axios官方文档</strong></p>
<p>Axios 是一个基于 promise 的 HTTP 库。<br><a href="https://www.kancloud.cn/yunye/axios/234845" rel="nofollow noreferrer" target="_blank">https://www.kancloud.cn/yunye...</a></p>
<p><strong>2、配合vue使用</strong></p>
<blockquote>注意：之前的Vue.js使用的是vue-resource， 不过后期不在维护，而是使用axios.</blockquote>
<p><strong>(1)、安装axios</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install axios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> axios</code></pre>
<p><strong>(2)、引入axios</strong></p>
<blockquote>在main.js中引入axios,注意：下面使用的是：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Axios from 'axios'
Vue.prototype.$axios = Axios;  //在Vue的原型上添加$axios方法
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>import Axios from <span class="hljs-string">'axios'</span>
Vue.prototype.<span class="hljs-variable">$axios</span> = Axios;  <span class="hljs-regexp">//</span>在Vue的原型上添加<span class="hljs-variable">$axios</span>方法
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV20zR?w=926&amp;h=592" src="https://static.alili.tech/img/bV20zR?w=926&amp;h=592" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>(3)、组件中进行网络请求</strong><br>(axios官方文档:<a href="https://www.kancloud.cn/yunye/axios/234845)" rel="nofollow noreferrer" target="_blank">https://www.kancloud.cn/yunye...</a></p>
<blockquote><strong>①、get请求：</strong></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //基本情况请求方式
  this.$axios.get(url)
    .then(rsp => {console.log(rsp)})
    .catch(error => {console.log(error)})
    
    
  //包含参数的情况一
  this.$axios.get('/user', {
    params: {
      ID: 12345
    }
  })
     .then(rsp => {console.log(rsp)})
     .catch(error => {console.log(error)})
   
   
   
   //包含参数的情况二
   this.$axios.get('/user?ID=12345')
     .then(rsp => {console.log(rsp)})
     .catch(error => {console.log(error)})
     " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-comment">//基本情况请求方式</span>
  <span class="hljs-keyword">this</span>.$axios.get(url)
    .then(<span class="hljs-function"><span class="hljs-params">rsp</span> =&gt;</span> {<span class="hljs-built_in">console</span>.log(rsp)})
    .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {<span class="hljs-built_in">console</span>.log(error)})
    
    
  <span class="hljs-comment">//包含参数的情况一</span>
  <span class="hljs-keyword">this</span>.$axios.get(<span class="hljs-string">'/user'</span>, {
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">ID</span>: <span class="hljs-number">12345</span>
    }
  })
     .then(<span class="hljs-function"><span class="hljs-params">rsp</span> =&gt;</span> {<span class="hljs-built_in">console</span>.log(rsp)})
     .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {<span class="hljs-built_in">console</span>.log(error)})
   
   
   
   <span class="hljs-comment">//包含参数的情况二</span>
   <span class="hljs-keyword">this</span>.$axios.get(<span class="hljs-string">'/user?ID=12345'</span>)
     .then(<span class="hljs-function"><span class="hljs-params">rsp</span> =&gt;</span> {<span class="hljs-built_in">console</span>.log(rsp)})
     .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {<span class="hljs-built_in">console</span>.log(error)})
     </code></pre>
<blockquote><strong>②、POST请求：</strong></blockquote>
<p>post请求参数的两种格式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    form-data:?name=iwen&amp;age=10
    x-www-form-urlencoded:{name:'iwen',age:20} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>    <span class="hljs-keyword">form</span>-<span class="hljs-keyword">data</span>:?<span class="hljs-keyword">name</span>=iwen&amp;age=<span class="hljs-number">10</span>
    x-www-<span class="hljs-keyword">form</span>-urlencoded:{<span class="hljs-keyword">name</span>:<span class="hljs-string">'iwen'</span>,age:<span class="hljs-number">20</span>} </code></pre>
<p>注意：axios接收的post请求参数的格式是form-data格式,所以需要使用插件“qs”，将请求参数转换为form-data格式。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  import qs from 'qs'

  export default {
    name: &quot;axios&quot;,
    data(){
      return{

      }
    },
    created (){
    //使用qs.stringify将参数格式进行转换         
    this.$axios.post('https://route.showapi.com/25-3',qs.stringify({
        id:'130310',
        showapi_appid:'223355',
        showapi_test_draft:false,
        showapi_timestamp:'20180228102233',
        showapi_sign:'8755acc9b708272bdce7bbbb168f4193'
      }))
      .then(rsp=>{ 
          console.log(rsp)
      })
     .catch(error=>{
     //在不清楚error的返回数据结构时，可以返回error,然后打断点，查看error返回结构
         console.log(error)
     })
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"axios"</span>,
    data(){
      <span class="hljs-keyword">return</span>{

      }
    },
    created (){
    <span class="hljs-comment">//使用qs.stringify将参数格式进行转换         </span>
    <span class="hljs-keyword">this</span>.$axios.post(<span class="hljs-string">'https://route.showapi.com/25-3'</span>,qs.stringify({
        <span class="hljs-attr">id</span>:<span class="hljs-string">'130310'</span>,
        <span class="hljs-attr">showapi_appid</span>:<span class="hljs-string">'223355'</span>,
        <span class="hljs-attr">showapi_test_draft</span>:<span class="hljs-literal">false</span>,
        <span class="hljs-attr">showapi_timestamp</span>:<span class="hljs-string">'20180228102233'</span>,
        <span class="hljs-attr">showapi_sign</span>:<span class="hljs-string">'8755acc9b708272bdce7bbbb168f4193'</span>
      }))
      .then(<span class="hljs-function"><span class="hljs-params">rsp</span>=&gt;</span>{ 
          <span class="hljs-built_in">console</span>.log(rsp)
      })
     .catch(<span class="hljs-function"><span class="hljs-params">error</span>=&gt;</span>{
     <span class="hljs-comment">//在不清楚error的返回数据结构时，可以返回error,然后打断点，查看error返回结构</span>
         <span class="hljs-built_in">console</span>.log(error)
     })
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>（4）、全局的 axios 默认值</strong></p>
<p>首先，安装qs插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install qs --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install qs --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>然后，在main.js中全局设置加入以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引入qs
import qs from 'qs'

//设置baseURL
Axios.defaults.baseURL = 'https://route.showapi.com';
//设置token值    
Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//请求头
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">//引入qs</span>
<span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>

<span class="hljs-comment">//设置baseURL</span>
Axios.defaults.baseURL = <span class="hljs-string">'https://route.showapi.com'</span>;
<span class="hljs-comment">//设置token值    </span>
Axios.defaults.headers.common[<span class="hljs-string">'Authorization'</span>] = AUTH_TOKEN;
<span class="hljs-comment">//请求头</span>
Axios.defaults.headers.post[<span class="hljs-string">'Content-Type'</span>] = <span class="hljs-string">'application/x-www-form-urlencoded'</span>; 
</code></pre>
<p>最后，在hello.vue中将url去掉baseURL部分即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created (){
//原来的url为&quot;https://route.showapi.com/25-3&quot;,在main.js中全局设置后，此处只写url剩下的部分即可。
  this.$axios.post('/25-3',qs.stringify({
    id:'130130',
    showapi_appid:'232357',
    showapi_test_draft:false,
    showapi_timestamp:'20180228104641',
    showapi_sign:'8d01a1a499fb65a920e8def2c92fa57f'
  }))
  .then(rsp=>{
    console.log('succsee:')
    console.log(rsp)
  })
  .catch(error=>{
     console.log(error)
  })
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>created (){
<span class="hljs-comment">//原来的url为"https://route.showapi.com/25-3",在main.js中全局设置后，此处只写url剩下的部分即可。</span>
  <span class="hljs-keyword">this</span>.$axios.post(<span class="hljs-string">'/25-3'</span>,qs.stringify({
    <span class="hljs-attr">id</span>:<span class="hljs-string">'130130'</span>,
    <span class="hljs-attr">showapi_appid</span>:<span class="hljs-string">'232357'</span>,
    <span class="hljs-attr">showapi_test_draft</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">showapi_timestamp</span>:<span class="hljs-string">'20180228104641'</span>,
    <span class="hljs-attr">showapi_sign</span>:<span class="hljs-string">'8d01a1a499fb65a920e8def2c92fa57f'</span>
  }))
  .then(<span class="hljs-function"><span class="hljs-params">rsp</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'succsee:'</span>)
    <span class="hljs-built_in">console</span>.log(rsp)
  })
  .catch(<span class="hljs-function"><span class="hljs-params">error</span>=&gt;</span>{
     <span class="hljs-built_in">console</span>.log(error)
  })
}    </code></pre>
<p><strong>（5）、axios拦截器</strong></p>
<blockquote>在main.js中设置拦截，且他们是在请求和响应的then和catch之前拦截的。语法如下：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 添加请求拦截器</span>
Axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">config</span>) </span>{
    <span class="hljs-comment">// 在发送请求之前做些什么</span>
    <span class="hljs-keyword">return</span> config;
  }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">// 对请求错误做些什么</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
  });

<span class="hljs-comment">// 添加响应拦截器</span>
Axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
    <span class="hljs-comment">// 对响应数据做点什么</span>
    <span class="hljs-keyword">return</span> response;
  }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">// 对响应错误做点什么</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
  });</code></pre>
<blockquote>实例应用：在post请求的时候需要将请求参数进行转换，这个操作可以在拦截器中处理，这样在单独的组件中，请求参数就不需要处理了。如下：</blockquote>
<p><strong>main.js中配置：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import qs from 'qs'

Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config)
  if(config.method === 'post'){
  //将请求参数进行转换，这里是全局配置post请求参数
    config.data = qs.stringify(config.data)
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});        
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>

Axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">config</span>) </span>{
  <span class="hljs-comment">// 在发送请求之前做些什么</span>
  <span class="hljs-built_in">console</span>.log(config)
  <span class="hljs-keyword">if</span>(config.method === <span class="hljs-string">'post'</span>){
  <span class="hljs-comment">//将请求参数进行转换，这里是全局配置post请求参数</span>
    config.data = qs.stringify(config.data)
  }
  <span class="hljs-keyword">return</span> config;
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
  <span class="hljs-comment">// 对请求错误做些什么</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
});        
</code></pre>
<p><strong>相应组件设置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created (){
//这里的请求参数不需要处理，按照之前的书写方式即可。
  this.$axios.post('/25-3',{
    id:'13030300',
    showapi_appid:'231235',
    showapi_test_draft:false,
    showapi_timestamp:'20180228110925',
    showapi_sign:'437f31128631e33542ad23a65678e709'
  })
  .then(rsp=>{
    console.log('succsee:')
    console.log(rsp)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>created (){
<span class="hljs-comment">//这里的请求参数不需要处理，按照之前的书写方式即可。</span>
  <span class="hljs-keyword">this</span>.$axios.post(<span class="hljs-string">'/25-3'</span>,{
    <span class="hljs-attr">id</span>:<span class="hljs-string">'13030300'</span>,
    <span class="hljs-attr">showapi_appid</span>:<span class="hljs-string">'231235'</span>,
    <span class="hljs-attr">showapi_test_draft</span>:<span class="hljs-literal">false</span>,
    <span class="hljs-attr">showapi_timestamp</span>:<span class="hljs-string">'20180228110925'</span>,
    <span class="hljs-attr">showapi_sign</span>:<span class="hljs-string">'437f31128631e33542ad23a65678e709'</span>
  })
  .then(<span class="hljs-function"><span class="hljs-params">rsp</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'succsee:'</span>)
    <span class="hljs-built_in">console</span>.log(rsp)
  })
}</code></pre>
<p><strong>3、跨域解决方案</strong></p>
<blockquote>注意：此种跨域解决方案，只适用于测试阶段。因为打包（准备上线，此时前后端是放在一起了）的时候，不会具备服务器，此时不存在跨域问题，这时候就后由端解决API接口问题。</blockquote>
<p>(1)、首先起一个服务为localhost:8080</p>
<p>新建localserver文件，执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" sudo npm install -g http-server " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;"> sudo npm <span class="hljs-keyword">install</span> -g <span class="hljs-keyword">http</span>-<span class="hljs-keyword">server</span> </code></pre>
<p>然后在localserver下创建文件data.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//data.json文件
{
  &quot;name&quot;: &quot;localserver&quot;,
  &quot;version&quot;: &quot;0.0.1&quot;,
  &quot;size&quot;:30,
  &quot;age&quot;:20,
  &quot;class&quot;:&quot;university&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>//<span class="hljs-class"><span class="hljs-keyword">data</span>.json文件</span>
{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"localserver"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"0.0.1"</span>,
  <span class="hljs-string">"size"</span>:<span class="hljs-number">30</span>,
  <span class="hljs-string">"age"</span>:<span class="hljs-number">20</span>,
  <span class="hljs-string">"class"</span>:<span class="hljs-string">"university"</span>
}</code></pre>
<p>最后终端进入文件localserver执行http-server,这样就可以访问data.json文件了。</p>
<p><span class="img-wrap"><img data-src="/img/bV4y2a?w=816&amp;h=370" src="https://static.alili.tech/img/bV4y2a?w=816&amp;h=370" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>（2）、假设本地项目是localhost：8020，这样访问127.0.0.1:8080/data.json就属于跨域访问。</p>
<p>① 项目的config/index.js文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
  '/api':{
    //需要跨区请求的地址
    target:&quot;http://127.0.0.1:8080&quot;,
    changeOrigin:true, //允许跨域
    pathRewrite:{
      '^/api':''
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
  <span class="hljs-string">'/api'</span>:{
    <span class="hljs-comment">//需要跨区请求的地址</span>
    <span class="hljs-attribute">target</span>:<span class="hljs-string">"http://127.0.0.1:8080"</span>,
    <span class="hljs-attribute">changeOrigin</span>:true, <span class="hljs-comment">//允许跨域</span>
    <span class="hljs-attribute">pathRewrite</span>:{
      <span class="hljs-string">'^/api'</span>:<span class="hljs-string">''</span>
    }
  }
}</code></pre>
<blockquote>pathRewrite用法：使用代理, 首先你得有一个标识, 告诉他你这个连接要用代理. 不然的话, 可能你的 html, css, js这些静态资源都跑去代理. 所以我们只要接口用代理, 静态文件用本地.'/iclient': {}, 就是告诉node, 我接口只要是'/iclient'开头的才用代理.所以你的接口就要这么写 /iclient/xx/xx. 最后代理的路径就是 <a href="http://xxx.xx.com/iclient/xx/xx.%E5%8F%AF%E6%98%AF%E4%B8%8D%E5%AF%B9%E5%95%8A," rel="nofollow noreferrer" target="_blank">http://xxx.xx.com/iclient/xx/...</a> 我正确的接口路径里面没有/iclient啊. 所以就需要 pathRewrite,用''^/iclient'':'', 把'/iclient'去掉, 这样既能有正确标识, 又能在请求接口的时候去掉iclient.</blockquote>
<p>②项目的main.js文件添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.HOST = '/api'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">Vue<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.HOST</span> = <span class="hljs-string">'/api'</span></code></pre>
<p>③项目的组件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created(){
  let url = this.HOST + &quot;/data.json&quot;;
  console.log(url);//url为：api/data.json,此处的api就是指localhost:8080。
  this.$axios.get(url).then(
    rsp=>{
      console.log(rsp)
    }
  ).catch(error=>{
    console.log(error)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>created(){
  <span class="hljs-keyword">let</span> url = <span class="hljs-keyword">this</span>.HOST + <span class="hljs-string">"/data.json"</span>;
  <span class="hljs-built_in">console</span>.log(url);<span class="hljs-comment">//url为：api/data.json,此处的api就是指localhost:8080。</span>
  <span class="hljs-keyword">this</span>.$axios.get(url).then(
    <span class="hljs-function"><span class="hljs-params">rsp</span>=&gt;</span>{
      <span class="hljs-built_in">console</span>.log(rsp)
    }
  ).catch(<span class="hljs-function"><span class="hljs-params">error</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(error)
  })
}</code></pre>
<blockquote>注意：以上跨域解决办法只适用于开发环境，如果想要一套兼容开发和生产环境的代码，避免生产和开发环境之间啊的切换，频繁修改接口调用代码，需要做如下判断：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let urlApi = ''
let url = window.location.href
if(url.indexOf('8080') > -1){
    urlApi = '/list/1/xxx'
}else{
    urlApi = 'http://api.xxxxxxxx.com/1/xxx'
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>let urlApi = <span class="hljs-string">''</span>
let url = window<span class="hljs-selector-class">.location</span><span class="hljs-selector-class">.href</span>
<span class="hljs-function"><span class="hljs-title">if</span><span class="hljs-params">(url.indexOf(<span class="hljs-string">'8080'</span>)</span></span> &gt; -<span class="hljs-number">1</span>){
    urlApi = <span class="hljs-string">'/list/1/xxx'</span>
}<span class="hljs-keyword">else</span>{
    urlApi = <span class="hljs-string">'http://api.xxxxxxxx.com/1/xxx'</span>
}

</code></pre>
<p><strong>4、免费的豆瓣API使用方法</strong> </p>
<p>豆瓣API网站：<a href="https://developers.douban.com/wiki/?title=guide" rel="nofollow noreferrer" target="_blank">https://developers.douban.com...</a></p>
<p>使用豆瓣API手册 ——&gt; 豆瓣Api V2(测试版) ——&gt; Api V2索引找需要的API ——&gt; 电影API ——&gt; 榜单：Top250，可以看到下图的API详细信息</p>
<p><span class="img-wrap"><img data-src="/img/bV5fPc?w=712&amp;h=366" src="https://static.alili.tech/img/bV5fPc?w=712&amp;h=366" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>根据图中的URI，访问:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'api.douban.com/v2/movie/top250'   即可得到数据。

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>'api.douban.com/v2/movie/top250'   即可得到数据。

</code></pre>
<p><strong>5、mock：数据模拟</strong>   </p>
<p>（1）、mock数据模拟三种情况：</p>
<p>①自己创建JSON文件使用GET请求形式访问数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 优点：方便快捷
 缺点：只能使用GET请求" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code> 优点：方便快捷
 缺点：只能使用<span class="hljs-meta">GET</span>请求</code></pre>
<p>②项目中集成服务器，模拟各种接口。(使用的最多)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 优点：模拟真实上线环境
 缺点：增加开发成本" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code> 优点：模拟真实上线环境
 缺点：增加开发成本</code></pre>
<p>③直接使用线上数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 优点：真实
 缺点：不一定每个项目都存在，一般都是前后端同时开发的。这种一般是重构项目时候用到。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code> 优点：真实
 缺点：不一定每个项目都存在，一般都是前后端同时开发的。这种一般是重构项目时候用到。</code></pre>
<p>④数据模拟库</p>
<p><a href="http://mockjs.com/" rel="nofollow noreferrer" target="_blank">http://mockjs.com/</a>  （需要开VPN访问） <br>   它可以随机生成数据</p>
<p><strong>6、axios访问vue-cli项目的本地json文件</strong></p>
<p><code>（1）、访问服务器文件，应该把 json文件放在最外层的static文件夹，这个文件夹是vue-cli内置服务器向外暴露的静态文件夹。</code></p>
<p><span class="img-wrap"><img data-src="/img/bVbfCKL?w=203&amp;h=507" src="https://static.alili.tech/img/bVbfCKL?w=203&amp;h=507" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>(2)、   一定要用get的请求方式，post就会404。</p>
<p><span class="img-wrap"><img data-src="/img/bVbfCK2?w=800&amp;h=53" src="https://static.alili.tech/img/bVbfCK2?w=800&amp;h=53" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 2之 axios

## 原文链接
[https://segmentfault.com/a/1190000013071458](https://segmentfault.com/a/1190000013071458)

