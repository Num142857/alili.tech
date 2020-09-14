---
title: '在Vue中如何使用axios请求拦截' 
date: 2019-02-15 2:30:44
hidden: true
slug: nn5no7dmupi
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>一、前言</strong></h1>
<h4>axios的基础使用就不过多的讲解啦，如何使用可以看axios文档<a href="https://www.kancloud.cn/yunye/axios/234845" rel="nofollow noreferrer" target="_blank">使用说明·Axios中文说明</a>
</h4>
<h4>在这里和大家分享一下axios拦截在<strong>实际项目</strong>中的使用</h4>
<p>很多人都看过axios的官方文档中拦截器这一栏，有的人可能会有点懵，因为文档只告诉你有这个东西，而不告诉你在什么情况下使用。很多初学者就会放弃使用axios拦截器，毕竟拦截器是可以不使用的，但是使用拦截器，会在页面中减少很多不必要的代码。</p>
<h1 id="articleHeader1"><strong>二、说在前面的</strong></h1>
<h4>项目使用的ui框架是iview</h4>
<p>以下友好提示均使用iview ui的message提示组件，例如this.$Message.xxx<br>/api/request  仅仅只是例子接口，实际开发用后台提供的接口。<br>code是后台状态码，我这里也只是例子，不要问我为毛我的返回码和你的怎么不一样这样的问题哈...这些都需要和后台沟通约定的。<br>使用的请求头是：axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';至于为什么使用这个请求头可以看看我的另外一篇文章<a href="https://segmentfault.com/a/1190000016040998">关于axios会发送两次请求，有个OPTIONS请求的问题</a><br>因为使用的是这个请求头所以需要用<strong>qs模块</strong>，不然后台不认这个数据。</p>
<h1 id="articleHeader2"><strong>三、不使用请求拦截</strong></h1>
<h4>如果不使用请求拦截，也是可以的，但是会多了非常多的代码，我们以登录页为例。</h4>
<p><span class="img-wrap"><img data-src="/img/bVbiAXv?w=427&amp;h=337" src="https://static.alili.tech/img/bVbiAXv?w=427&amp;h=337" alt="" title="" style="cursor: pointer; display: inline;"></span><br>一个单纯，没有花里胡哨的页面，|ω・）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//双向数据绑定获取值
let httpRequest = {};
httpRequest.loginName = this.loginName
httpRequest.password= this.password

this.$axios.post(&quot;/api/request&quot;, this.$qs.stringify(httpRequest)).then(data => {
    //特殊错误处理，状态为10时为登录超时
    if(data.data.code === 10){
        this.$Message.error(&quot;登录已超时，请重新登录&quot;)
        this.$router.push(&quot;/login&quot;)
    //其余错误状态处理    
    }else if(data.data.code != 0){
        this.$Message.error(data.data.msg)
    //请求成功
    }else if(data.data.code === 0){
        //进行成功业务逻辑
    }
    //.......
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//双向数据绑定获取值</span>
let httpRequest = {};
httpRequest.loginName = <span class="hljs-keyword">this</span>.loginName
httpRequest.password= <span class="hljs-keyword">this</span>.password

<span class="hljs-keyword">this</span>.$axios.post(<span class="hljs-string">"/api/request"</span>, <span class="hljs-keyword">this</span>.$qs.stringify(httpRequest)).then(<span class="hljs-keyword">data</span> =&gt; {
    <span class="hljs-comment">//特殊错误处理，状态为10时为登录超时</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.code === <span class="hljs-number">10</span>){
        <span class="hljs-keyword">this</span>.$Message.error(<span class="hljs-string">"登录已超时，请重新登录"</span>)
        <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">"/login"</span>)
    <span class="hljs-comment">//其余错误状态处理    </span>
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.code != <span class="hljs-number">0</span>){
        <span class="hljs-keyword">this</span>.$Message.error(<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.msg)
    <span class="hljs-comment">//请求成功</span>
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.code === <span class="hljs-number">0</span>){
        <span class="hljs-comment">//进行成功业务逻辑</span>
    }
    <span class="hljs-comment">//.......</span>
});</code></pre>
<p>如果不使用请求拦截，那么对每一条请求每一个状态都要特殊处理，如果请求特殊状态有数十个，每个页面有很多请求，那么页面会变得很长很臃肿，不好维护。</p>
<h1 id="articleHeader3"><strong>三、使用请求拦截</strong></h1>
<p>相同的请求返回代码我们可以抽取出来，写在请求拦截中<br>当我们设置了拦截之后，在我们的组件代码中可以简化很多，还是以<strong>登录界面</strong>为例：</p>
<h4>在<strong>main.js</strong>中</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//请求发送拦截，把数据发送给后台之前做些什么......
axios.interceptors.request.use((request) => {

  //这个例子中data是loginName和password
  let REQUEST_DATA = request.data
  //统一进行qs模块转换
  request.data = qs.stringify(REQUEST_DATA)
  //再发送给后台
  return request;

}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//请求返回拦截，把数据返回到页面之前做些什么...
axios.interceptors.response.use((response) => {
  //特殊错误处理，状态为10时为登录超时
  if (response.data.code === 10) {
    iView.Message.error(&quot;登录已超时，请重新登录&quot;);
    router.push(&quot;/login&quot;)
  //其余错误状态处理    
  } else if (response.data.code != 0) {
    iView.Message.error(response.data.msg)
  //请求成功
  } else if(response.data.code === 0){
    //将我们请求到的信息返回页面中请求的逻辑
    return response;
  }
 //......

}, function (error) {
  return Promise.reject(error);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">//请求发送拦截，把数据发送给后台之前做些什么......</span>
axios.interceptors.request.<span class="hljs-keyword">use</span>((request) =&gt; {

  <span class="hljs-comment">//这个例子中data是loginName和password</span>
  <span class="hljs-keyword">let</span> REQUEST_DATA = request.data
  <span class="hljs-comment">//统一进行qs模块转换</span>
  request.data = qs.stringify(REQUEST_DATA)
  <span class="hljs-comment">//再发送给后台</span>
  <span class="hljs-keyword">return</span> request;

}, function (<span class="hljs-built_in">error</span>) {
  <span class="hljs-comment">// Do something with request error</span>
  <span class="hljs-keyword">return</span> Promise.reject(<span class="hljs-built_in">error</span>);
});

<span class="hljs-comment">//请求返回拦截，把数据返回到页面之前做些什么...</span>
axios.interceptors.response.<span class="hljs-keyword">use</span>((response) =&gt; {
  <span class="hljs-comment">//特殊错误处理，状态为10时为登录超时</span>
  <span class="hljs-keyword">if</span> (response.data.<span class="hljs-built_in">code</span> === <span class="hljs-number">10</span>) {
    iView.Message.<span class="hljs-built_in">error</span>(<span class="hljs-string">"登录已超时，请重新登录"</span>);
    router.<span class="hljs-keyword">push</span>(<span class="hljs-string">"/login"</span>)
  <span class="hljs-comment">//其余错误状态处理    </span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (response.data.<span class="hljs-built_in">code</span> != <span class="hljs-number">0</span>) {
    iView.Message.<span class="hljs-built_in">error</span>(response.data.msg)
  <span class="hljs-comment">//请求成功</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(response.data.<span class="hljs-built_in">code</span> === <span class="hljs-number">0</span>){
    <span class="hljs-comment">//将我们请求到的信息返回页面中请求的逻辑</span>
    <span class="hljs-keyword">return</span> response;
  }
 <span class="hljs-comment">//......</span>

}, function (<span class="hljs-built_in">error</span>) {
  <span class="hljs-keyword">return</span> Promise.reject(<span class="hljs-built_in">error</span>);
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//双向数据绑定获取值
let httpRequest = {};
httpRequest.loginName = this.loginName
httpRequest.password= this.password

this.$axios.post(&quot;/api/request&quot;, httpRequest).then(data => {
    //这是要先判断data，如果请求的数据状态code不为0,会被拦截，则data为undefined
    if(data){
        //进行请求返回成功逻辑
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//双向数据绑定获取值</span>
let httpRequest = {};
httpRequest.loginName = <span class="hljs-keyword">this</span>.loginName
httpRequest.password= <span class="hljs-keyword">this</span>.password

<span class="hljs-keyword">this</span>.$axios.post(<span class="hljs-string">"/api/request"</span>, httpRequest).then(<span class="hljs-keyword">data</span> =&gt; {
    <span class="hljs-comment">//这是要先判断data，如果请求的数据状态code不为0,会被拦截，则data为undefined</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">data</span>){
        <span class="hljs-comment">//进行请求返回成功逻辑</span>
    }
});</code></pre>
<p>这样我们就对axios请求添加了拦截，可以减少很多代码逻辑，页面可读性更高，可维护性也更高</p>
<h1 id="articleHeader4"><strong>四、其他</strong></h1>
<p>这就是axios拦截的最基础的用法，当然也不止于此，我们也可以进行扩展延伸，做更多的事情，只要你的业务有需求，axios拦截总能帮到你，这些就需要举一反三，工具是死的人是活的，我可以再举个小例子，比如设置<strong>请求签名</strong>。</p>
<p>请求签名是前台和后台约定的一种沟通方式，对数据进行加密，可以一定程度上保证数据的安全性</p>
<p>还是以这个登录页面为例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//双向数据绑定获取值
let httpRequest = {};
httpRequest.loginName = this.loginName
httpRequest.password= this.password

this.$axios.post(&quot;/api/request&quot;, httpRequest).then(data => {
    //这是要先判断data，如果请求的数据状态code不为0,会被拦截，则data为undefined
    if(data){
        //进行请求返回成功逻辑
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//双向数据绑定获取值</span>
let httpRequest = {};
httpRequest.loginName = <span class="hljs-keyword">this</span>.loginName
httpRequest.password= <span class="hljs-keyword">this</span>.password

<span class="hljs-keyword">this</span>.$axios.post(<span class="hljs-string">"/api/request"</span>, httpRequest).then(<span class="hljs-keyword">data</span> =&gt; {
    <span class="hljs-comment">//这是要先判断data，如果请求的数据状态code不为0,会被拦截，则data为undefined</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">data</span>){
        <span class="hljs-comment">//进行请求返回成功逻辑</span>
    }
});</code></pre>
<p>我们把httpRequest这个data信息数据发送给后台之前，进行签名，并加密数据<br>在<strong>main.js</strong>中，我们对发送的数据进行拦截</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//请求发送拦截
axios.interceptors.request.use((request) => {

  //获取请求的数据，这里是loginName和password
  let REQUEST_DATA = request.data
  //获取请求的地址，这里是/api/request
  let REQUEST_URL = request.url
   
  //设置签名并进行qs转换，且赋值给request的data，签名函数另外封装
  request.data = qs.stringify(requestDataFn(REQUEST_DATA, REQUEST_URL))
  //发送请求给后台
  return request;

}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//已封装好的签名函数
function requestDataFn(data, method) {

  let postData = {}

  //时间戳，时间戳函数不作展示，也是已封装好的
  postData.timestamp = getNowFormatDate();

  //请求用户的session以及secretKey信息,为空是未登录，登录后我把它存在localStorage中，这个存在哪里都可以，这里只作为例子。
  postData.session = localStorage.getItem('session') || '';
  postData.secretKey = localStorage.getItem('secretKey') || '';
  
  //请求的地址，这里是/api/request
  postData.method = method;
    
  //请求的数据这里是loginName和password，进行base64加密
  let base64Data = Base64.encode(JSON.stringify(data));
   
  //设置签名并进行md5加密
  let signature = md5.hex(postData.secretKey + base64Data + postData.method + postData.session + postData.timestamp + postData.secretKey);
   
  //把数据再次进行加密
  postData.data = encodeURI(base64Data);

  postData.signature = signature;
   
  return postData
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//请求发送拦截</span>
axios.interceptors.request.use(<span class="hljs-function">(<span class="hljs-params">request</span>) =&gt;</span> {

  <span class="hljs-comment">//获取请求的数据，这里是loginName和password</span>
  <span class="hljs-keyword">let</span> REQUEST_DATA = request.data
  <span class="hljs-comment">//获取请求的地址，这里是/api/request</span>
  <span class="hljs-keyword">let</span> REQUEST_URL = request.url
   
  <span class="hljs-comment">//设置签名并进行qs转换，且赋值给request的data，签名函数另外封装</span>
  request.data = qs.stringify(requestDataFn(REQUEST_DATA, REQUEST_URL))
  <span class="hljs-comment">//发送请求给后台</span>
  <span class="hljs-keyword">return</span> request;

}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
  <span class="hljs-comment">// Do something with request error</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
});

<span class="hljs-comment">//已封装好的签名函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestDataFn</span>(<span class="hljs-params">data, method</span>) </span>{

  <span class="hljs-keyword">let</span> postData = {}

  <span class="hljs-comment">//时间戳，时间戳函数不作展示，也是已封装好的</span>
  postData.timestamp = getNowFormatDate();

  <span class="hljs-comment">//请求用户的session以及secretKey信息,为空是未登录，登录后我把它存在localStorage中，这个存在哪里都可以，这里只作为例子。</span>
  postData.session = localStorage.getItem(<span class="hljs-string">'session'</span>) || <span class="hljs-string">''</span>;
  postData.secretKey = localStorage.getItem(<span class="hljs-string">'secretKey'</span>) || <span class="hljs-string">''</span>;
  
  <span class="hljs-comment">//请求的地址，这里是/api/request</span>
  postData.method = method;
    
  <span class="hljs-comment">//请求的数据这里是loginName和password，进行base64加密</span>
  <span class="hljs-keyword">let</span> base64Data = Base64.encode(<span class="hljs-built_in">JSON</span>.stringify(data));
   
  <span class="hljs-comment">//设置签名并进行md5加密</span>
  <span class="hljs-keyword">let</span> signature = md5.hex(postData.secretKey + base64Data + postData.method + postData.session + postData.timestamp + postData.secretKey);
   
  <span class="hljs-comment">//把数据再次进行加密</span>
  postData.data = <span class="hljs-built_in">encodeURI</span>(base64Data);

  postData.signature = signature;
   
  <span class="hljs-keyword">return</span> postData
}</code></pre>
<p>这样我们就完成了对数据加密以及签名，这样再发送给后台。</p>
<p><strong>注意：这里只作为例子展示，如果需要用到签名，如何签名，是前台和后台沟通的结果!</strong><br>axios请求拦截的用处远远不止这样，具体如何使用，还需要在实际工作，实际项目中随机应变啦。</p>
<h3 id="articleHeader5"><strong>如果对你有帮助请点赞收藏支持一下，有什么疑问欢迎留言，有错误欢迎大力指出</strong></h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在Vue中如何使用axios请求拦截

## 原文链接
[https://segmentfault.com/a/1190000016787376](https://segmentfault.com/a/1190000016787376)

