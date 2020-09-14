---
title: 'axios 中文文档 翻译' 
date: 2019-01-26 2:30:18
hidden: true
slug: qa2c1jrsv1
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">axios</h1>
<p>版本:v0.18.0</p>
<p><strong>0.18.0的版本更新有一段时间了，使用起来跟原先基本没有什么变化。但是增加了一些功能，例如错误处理的辨别，于<code>07-06-2018</code>重新翻译和校验了该翻译，更正了一些错别字和表达不准的地方，但是难免仍有错误，欢迎指出。</strong></p>
<p>由于工作需要，个人也包装了一个简易的跟axios风格一样在小程序中使用的请求函数。方便一些使用类似vue写法框架来开发小程序的人更方便的无缝桥接。<br>有需要的读者可以观看一下。 <a href="https://segmentfault.com/a/1190000016711468">传送门</a></p>
<p>关于<code>Promise</code>的一练习和训练，此处有一个比较好的集合。<a href="https://segmentfault.com/a/1190000016848192" target="_blank">传送门</a></p>
<h2 id="articleHeader1">正文</h2>
<p>基于Promise的http库，适用于浏览器和node.js。</p>
<h2 id="articleHeader2">原文</h2>
<p><a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">点击</a>查看原文</p>
<h2 id="articleHeader3">特色</h2>
<ul>
<li>浏览器端发起XMLHttpRequests请求</li>
<li>node端发起http请求</li>
<li>支持Promise API</li>
<li>拦截请求和返回</li>
<li>转化请求和返回（数据）</li>
<li>取消请求</li>
<li>自动转化json数据</li>
<li>客户端支持抵御<a href="http://baike.baidu.com/link?url=eFrTMGA9IsLxlOnyqKky-t6vTs3g6YoAfFc1sYmv2fVVS1FrfIoI3q3jxUV_o1AgIIoLdk9N0Ni_TxLItoRU3K" rel="nofollow noreferrer" target="_blank">XSRF（跨站请求伪造）</a>
</li>
</ul>
<h2 id="articleHeader4">浏览器支持</h2>
<table><tbody>
<tr>
<td align="center"><span class="img-wrap"><img data-src="/img/remote/1460000015548820?w=48&amp;h=48" src="https://static.alili.tech/img/remote/1460000015548820?w=48&amp;h=48" alt="Chrome" title="Chrome" style="cursor: pointer;"></span></td>
<td align="center"><span class="img-wrap"><img data-src="/img/remote/1460000015548821?w=48&amp;h=48" src="https://static.alili.tech/img/remote/1460000015548821?w=48&amp;h=48" alt="Firefox" title="Firefox" style="cursor: pointer;"></span></td>
<td align="center"><span class="img-wrap"><img data-src="/img/remote/1460000015548822?w=48&amp;h=48" src="https://static.alili.tech/img/remote/1460000015548822?w=48&amp;h=48" alt="Safari" title="Safari" style="cursor: pointer;"></span></td>
<td align="center"><span class="img-wrap"><img data-src="/img/remote/1460000015548823?w=48&amp;h=48" src="https://static.alili.tech/img/remote/1460000015548823?w=48&amp;h=48" alt="Opera" title="Opera" style="cursor: pointer;"></span></td>
<td align="center"><span class="img-wrap"><img data-src="/img/remote/1460000015548824?w=48&amp;h=48" src="https://static.alili.tech/img/remote/1460000015548824?w=48&amp;h=48" alt="Edge" title="Edge" style="cursor: pointer;"></span></td>
<td align="center"><span class="img-wrap"><img data-src="/img/remote/1460000015548825?w=48&amp;h=48" src="https://static.alili.tech/img/remote/1460000015548825?w=48&amp;h=48" alt="IE" title="IE" style="cursor: pointer;"></span></td>
</tr>
<tr>
<td align="center">Latest ✔</td>
<td align="center">Latest ✔</td>
<td align="center">Latest ✔</td>
<td align="center">Latest ✔</td>
<td align="center">Latest ✔</td>
<td align="center">8+ ✔</td>
</tr>
</tbody></table>
<h2 id="articleHeader5">安装</h2>
<p>使用npm：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i axios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-selector-tag">i</span> axios</code></pre>
<p>使用 bower</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ bower instal axios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="shell" style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">bower </span><span class="hljs-keyword">instal </span>axios</code></pre>
<p>使用cdn</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--国内bootCDN-->
<script src=&quot;https://cdn.bootcss.com/axios/0.18.0/axios.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="shell"><span class="hljs-comment">&lt;!--国内bootCDN--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/axios/0.18.0/axios.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader6">示例</h2>
<p>发起一个<code>GET</code>请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const axios = require('axios')

//发起一个user请求，参数为给定的ID
axios.get('/user?ID=12345')
.then(function(respone){
    console.log(response);
})
.catch(function(error){
    console.log(error);
});

//可配置的方式实现上面的代码如下
axios.get('/user',{
    params:{
        ID:12345
    }
}).then(function(response){
        console.log(response);
  }).catch(function(error){
        console.log(error)
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> axios = <span class="hljs-built_in">require</span>(<span class="hljs-string">'axios'</span>)

<span class="hljs-comment">//发起一个user请求，参数为给定的ID</span>
axios.get(<span class="hljs-string">'/user?ID=12345'</span>)
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">respone</span>)</span>{
    <span class="hljs-built_in">console</span>.log(response);
})
.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
    <span class="hljs-built_in">console</span>.log(error);
});

<span class="hljs-comment">//可配置的方式实现上面的代码如下</span>
axios.get(<span class="hljs-string">'/user'</span>,{
    <span class="hljs-attr">params</span>:{
        <span class="hljs-attr">ID</span>:<span class="hljs-number">12345</span>
    }
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
        <span class="hljs-built_in">console</span>.log(response);
  }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
        <span class="hljs-built_in">console</span>.log(error)
    });</code></pre>
<p><strong>注意：<code>async/await</code>是ECMAScript2017的语法，ie和一些老旧的浏览器不支持，请小心使用。</strong><br><strong>（译者话：使用ts的话可以很容易的编译和使用，也不需要任何垫片，目标编译成es5即可）</strong></p>
<p>发起一个<code>POST</code>请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.post('/user',{
    firstName:'friend',
    lastName:'Flintstone'
})
.then(function(response){
    console.log(response);
})
.catch(function(error){
    console.log(error);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">axios.post(<span class="hljs-string">'/user'</span>,{
    <span class="hljs-attr">firstName</span>:<span class="hljs-string">'friend'</span>,
    <span class="hljs-attr">lastName</span>:<span class="hljs-string">'Flintstone'</span>
})
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
    <span class="hljs-built_in">console</span>.log(response);
})
.catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
    <span class="hljs-built_in">console</span>.log(error);
});</code></pre>
<p>发起一个多重并发请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getUserAccount(){
    return axios.get('/user/12345');
}

function getUserPermissions(){
    return axios.get('/user/12345/permissions');
}

axios.all([getUerAccount(),getUserPermissions()])
    .then(axios.spread(function(acc,pers){
        //两个请求现在都完成
    }));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserAccount</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> axios.get(<span class="hljs-string">'/user/12345'</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUserPermissions</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> axios.get(<span class="hljs-string">'/user/12345/permissions'</span>);
}

axios.all([getUerAccount(),getUserPermissions()])
    .then(axios.spread(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">acc,pers</span>)</span>{
        <span class="hljs-comment">//两个请求现在都完成</span>
    }));</code></pre>
<p><strong>译者话：因为<code>axios.all</code>使用的是类似<code>Primise.all</code>的功能，所以如果其中有一个请求出现了错误那么就会停止请求，所以建议对于单个请求最好附加上处理的catch。</strong></p>
<h2 id="articleHeader7">axios API</h2>
<hr>
<p>根据自己需求可以对axios传递一些的设置来生成请求（Request）。</p>
<p><code>axios(config)</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//发起 POST请求

axios({
    method:'post',//方法
    url:'/user/12345',//地址
    data:{//参数
        firstName:'Fred',
        lastName:'Flintstone'
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//发起 POST请求</span>

axios({
    <span class="hljs-attr">method</span>:<span class="hljs-string">'post'</span>,<span class="hljs-comment">//方法</span>
    url:<span class="hljs-string">'/user/12345'</span>,<span class="hljs-comment">//地址</span>
    data:{<span class="hljs-comment">//参数</span>
        firstName:<span class="hljs-string">'Fred'</span>,
        <span class="hljs-attr">lastName</span>:<span class="hljs-string">'Flintstone'</span>
    }
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//通过请求获取远程图片
axios({
    method:'get',
    url:'http://bit.ly/2mTM3Ny',
    responseType:'stream'
})
    .then(function(response){
        response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//通过请求获取远程图片</span>
axios({
    <span class="hljs-attr">method</span>:<span class="hljs-string">'get'</span>,
    <span class="hljs-attr">url</span>:<span class="hljs-string">'http://bit.ly/2mTM3Ny'</span>,
    <span class="hljs-attr">responseType</span>:<span class="hljs-string">'stream'</span>
})
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
        response.data.pipe(fs.createWriteStream(<span class="hljs-string">'ada_lovelace.jpg'</span>))
    })</code></pre>
<p><code>axios(url[,config])</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//发起一个GET请求
axios('/user/12345/);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//发起一个GET请求</span>
axios(<span class="hljs-string">'/user/12345/);
</span></code></pre>
<h2 id="articleHeader8">请求方法的别名。</h2>
<p>为了方便，axios提供了所有请求方法的别名支持</p>
<p><strong>axios.request(config)</strong><br><strong>axios.get(url[,config])</strong><br><strong>axios.delete(url[,config])</strong><br><strong>axios.head(url[,config])</strong><br><strong>axios.options(url[,config])</strong><br><strong>axios.post(url[,data[,config]])</strong><br><strong>axios.put(url[,data[,config]])</strong><br><strong>axios.patch(url[,data[,config]])</strong></p>
<h3 id="articleHeader9">注意</h3>
<p>当时用别名方法时<code>url</code>,<code>method</code>,以及<code>data</code>属性不必在config中明确指定（如上面示例的post方法请求）。</p>
<h2 id="articleHeader10">并发 Concurrency</h2>
<p>有用的方法</p>
<p><strong>axios.all(iterable)</strong><br><strong>axios.spread(callback)</strong></p>
<h3 id="articleHeader11">创建一个实例（instance）</h3>
<p>你可以使用自定义设置创建一个新的实例</p>
<p><strong>axios.create([config])</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var instance = axios.create({
    baseURL:'http://some-domain.com/api/',
    timeout:1000,
    headers:{'X-Custom-Header':'foobar'}
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> instance = axios.create({
    <span class="hljs-attr">baseURL</span>:<span class="hljs-string">'http://some-domain.com/api/'</span>,
    <span class="hljs-attr">timeout</span>:<span class="hljs-number">1000</span>,
    <span class="hljs-attr">headers</span>:{<span class="hljs-string">'X-Custom-Header'</span>:<span class="hljs-string">'foobar'</span>}
});</code></pre>
<h3 id="articleHeader12">实例方法</h3>
<p>下面列出了一些实例可用方法，具体的设置将在实例中应用。</p>
<p><strong>axios#request(config)</strong><br><strong>axios#get(url[,config])</strong><br><strong>axios#delete(url[,config])</strong><br><strong>axios#head(url[,config])</strong><br><strong>axios#options(url[,config])</strong><br><strong>axios#post(url[,data[,config]])</strong><br><strong>axios#put(url[,data[,config]])</strong><br><strong>axios#patch(url[,data[,config]])</strong></p>
<h2 id="articleHeader13">Requeset Config请求设置</h2>
<p>以下列出了一些请求时的设置选项。只有<code>url</code>是必须的，如果没有指明<code>method</code>的话，默认的请求方法是<code>GET</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    //`url`是服务器链接，用来请求
    url:'/user',

    //`method`是发起请求时的方法
    method:`get`,

    //`baseURL`如果`url`不是绝对地址，那么将会加在其前面。
    //可以很方便的对相对地址的axios实例设置`baseUrl`。
    baseURL:'http://some-domain.com/api/',

    //`transformRequest`允许请求的数据在发送至服务器之前进行转化。
    //这个只适用于`PUT`,`GET`,`PATCH`方法。
    //数组中的最后一个函数必须返回一个字符串或者一个`ArrayBuffer`,或者`Stream`,`Buffer`实例,`ArrayBuffer`,`FormData`
    //此外你也可能需要设置下headers对象
    transformRequest:[function(data,headers){
        //依自己的需求对请求数据进行处理
        return data;
    }],

    //`transformResponse`允许对返回的数据传入then/catch之前进行处理
    transformResponse:[function(data){
        //依需要对数据进行处理
        return data;
    }],

    //`headers`是自定义的要被发送的信息头
    headers:{'X-Requested-with':'XMLHttpRequest'},

    //`params`是请求连接中的请求参数，必须是一个纯对象，或者URLSearchParams对象
    params:{
        ID:12345
    },
    
    //`paramsSerializer`是一个可选的函数，用来控制和序列化参数
    //例如：（https://ww.npmjs.com/package/qs,http://api.jquery.com/jquery.param/)
    paramsSerializer: function(params){
        return Qs.stringify(params,{arrayFormat:'brackets'})
    },

    //`data`是请求时作为请求体的数据
    //只适用于应用的'PUT','POST','PATCH'，请求方法
    //当没有设置`transformRequest`时，必须是以下其中之一的类型（不可重复？）：
    //-string(字符串),plain object(纯对象),ArrayBuffer,ArrayBufferView,URLSearchParams
    //-限浏览器：FormData(表格数据),File(文件数据),Blob
    //-限Node：Stream
    data:{
        firstName:'fred'
    },
    //`timeout`定义请求的时间，单位是毫秒。
    //如果请求的时间超过这个设定时间，请求将会停止。
    timeout:1000,
    
    //`withCredentials`表明跨跨域请求书否需要证明。
    withCredentials:false //默认值

    //`adapter`适配器，允许自定义处理请求，这会使测试更简单。
    //返回一个promise，并且提供一个有效的相应。（查看[response docs](#response-api)）
    adapter:function(config){
        /*...*/
    },

    //`auth`表明HTTP基础的认证应该被使用，并且提供证书。
    //这个会设置一个`authorization` 头（header），并且覆盖你在header设置的Authorization头信息。
    auth:{
        username:'janedoe',
        password:'s00pers3cret'
    },

    //`responsetype`表明服务器返回的数据类型，这些类型的设置应该是
    //'arraybuffer','blob','document','json','text',stream'
    responsetype:'json',

    //`responseEncoding`表明解析相应的编码方式。
    //**注意**会忽视responseType为stream或者客户端的请求。
    responseEncoding:'utf8'//默认值

    //`xsrfCookieName`时cookie做xsrf会话时的名字。
    xsrfCookieName:'XSRF-TOKEN',//默认值

    //`xsrfHeaderName` 是http头（header）的名字，并且该头携带xsrf的值
    xrsfHeadername:'X-XSRF-TOKEN'，//默认值

    //`onUploadProgress`允许处理上传过程的进程事件
    onUploadProgress: function(progressEvent){
        //本地过程事件发生时想做的事
    },

    //`onDownloadProgress`允许处理下载过程的进程事件
    onDownloadProgress: function(progressEvent){
        //下载过程中想做的事
    },

    //`maxContentLength` 定义http返回内容的最大字节容量
    maxContentLength: 2000,

    //`validateStatus` 定义promise的resolve和reject。
    //http返回状态码，如果`validateStatus`返回true（或者设置成null/undefined），promise将会resolve；其他的promise将reject。
    validateStatus: function(status){
        return status >= 200 &amp;&amp; stauts < 300;//默认
    },

    //`maxRedirect`定义重导向到node.js中的最大数量。
    //如果值为0，那么没有redirect。
    maxREdirects:5,//默认值

    //`socketPath`定义一个在node.js中使用的 `UNIX Socket`。
    //例如 `/var/run/docker.sock`发送请求到docker daemon。
    //`socketPath`和`proxy`只可定义其一。
    //如果都定义则只会使用`socketPath`。
    socketPath:null,//默认值

    //`httpAgent` 和 `httpsAgent`当产生一个http或者https请求时分别定义一个自定义的代理，在nodejs中。
    //这个允许设置一些选选个，像是`keepAlive`--这个在默认中是没有开启的。
    httpAgent: new http.Agent({keepAlive:treu}),
    httpsAgent: new https.Agent({keepAlive:true}),

    //`proxy`定义服务器的主机名字和端口号。
    //`auth`表明HTTP基本认证应该跟`proxy`相连接，并且提供证书。
    //这个将设置一个'Proxy-Authorization'头(header)，覆盖原先自定义的。
    proxy:{
        host:127.0.0.1,
        port:9000,
        auth:{
            username:'cdd',
            password:'123456'
        }
    },

    //`cancelTaken` 定义一个取消，能够用来取消请求
    //（查看 下面的Cancellation 的详细部分）
    cancelToken: new CancelToken(function(cancel){
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-comment">//`url`是服务器链接，用来请求</span>
    url:<span class="hljs-string">'/user'</span>,

    <span class="hljs-comment">//`method`是发起请求时的方法</span>
    method:<span class="hljs-string">`get`</span>,

    <span class="hljs-comment">//`baseURL`如果`url`不是绝对地址，那么将会加在其前面。</span>
    <span class="hljs-comment">//可以很方便的对相对地址的axios实例设置`baseUrl`。</span>
    baseURL:<span class="hljs-string">'http://some-domain.com/api/'</span>,

    <span class="hljs-comment">//`transformRequest`允许请求的数据在发送至服务器之前进行转化。</span>
    <span class="hljs-comment">//这个只适用于`PUT`,`GET`,`PATCH`方法。</span>
    <span class="hljs-comment">//数组中的最后一个函数必须返回一个字符串或者一个`ArrayBuffer`,或者`Stream`,`Buffer`实例,`ArrayBuffer`,`FormData`</span>
    <span class="hljs-comment">//此外你也可能需要设置下headers对象</span>
    transformRequest:[<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data,headers</span>)</span>{
        <span class="hljs-comment">//依自己的需求对请求数据进行处理</span>
        <span class="hljs-keyword">return</span> data;
    }],

    <span class="hljs-comment">//`transformResponse`允许对返回的数据传入then/catch之前进行处理</span>
    transformResponse:[<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-comment">//依需要对数据进行处理</span>
        <span class="hljs-keyword">return</span> data;
    }],

    <span class="hljs-comment">//`headers`是自定义的要被发送的信息头</span>
    headers:{<span class="hljs-string">'X-Requested-with'</span>:<span class="hljs-string">'XMLHttpRequest'</span>},

    <span class="hljs-comment">//`params`是请求连接中的请求参数，必须是一个纯对象，或者URLSearchParams对象</span>
    params:{
        <span class="hljs-attr">ID</span>:<span class="hljs-number">12345</span>
    },
    
    <span class="hljs-comment">//`paramsSerializer`是一个可选的函数，用来控制和序列化参数</span>
    <span class="hljs-comment">//例如：（https://ww.npmjs.com/package/qs,http://api.jquery.com/jquery.param/)</span>
    paramsSerializer: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">params</span>)</span>{
        <span class="hljs-keyword">return</span> Qs.stringify(params,{<span class="hljs-attr">arrayFormat</span>:<span class="hljs-string">'brackets'</span>})
    },

    <span class="hljs-comment">//`data`是请求时作为请求体的数据</span>
    <span class="hljs-comment">//只适用于应用的'PUT','POST','PATCH'，请求方法</span>
    <span class="hljs-comment">//当没有设置`transformRequest`时，必须是以下其中之一的类型（不可重复？）：</span>
    <span class="hljs-comment">//-string(字符串),plain object(纯对象),ArrayBuffer,ArrayBufferView,URLSearchParams</span>
    <span class="hljs-comment">//-限浏览器：FormData(表格数据),File(文件数据),Blob</span>
    <span class="hljs-comment">//-限Node：Stream</span>
    data:{
        <span class="hljs-attr">firstName</span>:<span class="hljs-string">'fred'</span>
    },
    <span class="hljs-comment">//`timeout`定义请求的时间，单位是毫秒。</span>
    <span class="hljs-comment">//如果请求的时间超过这个设定时间，请求将会停止。</span>
    timeout:<span class="hljs-number">1000</span>,
    
    <span class="hljs-comment">//`withCredentials`表明跨跨域请求书否需要证明。</span>
    withCredentials:<span class="hljs-literal">false</span> <span class="hljs-comment">//默认值</span>

    <span class="hljs-comment">//`adapter`适配器，允许自定义处理请求，这会使测试更简单。</span>
    <span class="hljs-comment">//返回一个promise，并且提供一个有效的相应。（查看[response docs](#response-api)）</span>
    adapter:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>)</span>{
        <span class="hljs-comment">/*...*/</span>
    },

    <span class="hljs-comment">//`auth`表明HTTP基础的认证应该被使用，并且提供证书。</span>
    <span class="hljs-comment">//这个会设置一个`authorization` 头（header），并且覆盖你在header设置的Authorization头信息。</span>
    auth:{
        <span class="hljs-attr">username</span>:<span class="hljs-string">'janedoe'</span>,
        <span class="hljs-attr">password</span>:<span class="hljs-string">'s00pers3cret'</span>
    },

    <span class="hljs-comment">//`responsetype`表明服务器返回的数据类型，这些类型的设置应该是</span>
    <span class="hljs-comment">//'arraybuffer','blob','document','json','text',stream'</span>
    responsetype:<span class="hljs-string">'json'</span>,

    <span class="hljs-comment">//`responseEncoding`表明解析相应的编码方式。</span>
    <span class="hljs-comment">//**注意**会忽视responseType为stream或者客户端的请求。</span>
    responseEncoding:<span class="hljs-string">'utf8'</span><span class="hljs-comment">//默认值</span>

    <span class="hljs-comment">//`xsrfCookieName`时cookie做xsrf会话时的名字。</span>
    xsrfCookieName:<span class="hljs-string">'XSRF-TOKEN'</span>,<span class="hljs-comment">//默认值</span>

    <span class="hljs-comment">//`xsrfHeaderName` 是http头（header）的名字，并且该头携带xsrf的值</span>
    xrsfHeadername:<span class="hljs-string">'X-XSRF-TOKEN'</span>，<span class="hljs-comment">//默认值</span>

    <span class="hljs-comment">//`onUploadProgress`允许处理上传过程的进程事件</span>
    onUploadProgress: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">progressEvent</span>)</span>{
        <span class="hljs-comment">//本地过程事件发生时想做的事</span>
    },

    <span class="hljs-comment">//`onDownloadProgress`允许处理下载过程的进程事件</span>
    onDownloadProgress: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">progressEvent</span>)</span>{
        <span class="hljs-comment">//下载过程中想做的事</span>
    },

    <span class="hljs-comment">//`maxContentLength` 定义http返回内容的最大字节容量</span>
    maxContentLength: <span class="hljs-number">2000</span>,

    <span class="hljs-comment">//`validateStatus` 定义promise的resolve和reject。</span>
    <span class="hljs-comment">//http返回状态码，如果`validateStatus`返回true（或者设置成null/undefined），promise将会resolve；其他的promise将reject。</span>
    validateStatus: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">status</span>)</span>{
        <span class="hljs-keyword">return</span> status &gt;= <span class="hljs-number">200</span> &amp;&amp; stauts &lt; <span class="hljs-number">300</span>;<span class="hljs-comment">//默认</span>
    },

    <span class="hljs-comment">//`maxRedirect`定义重导向到node.js中的最大数量。</span>
    <span class="hljs-comment">//如果值为0，那么没有redirect。</span>
    maxREdirects:<span class="hljs-number">5</span>,<span class="hljs-comment">//默认值</span>

    <span class="hljs-comment">//`socketPath`定义一个在node.js中使用的 `UNIX Socket`。</span>
    <span class="hljs-comment">//例如 `/var/run/docker.sock`发送请求到docker daemon。</span>
    <span class="hljs-comment">//`socketPath`和`proxy`只可定义其一。</span>
    <span class="hljs-comment">//如果都定义则只会使用`socketPath`。</span>
    socketPath:<span class="hljs-literal">null</span>,<span class="hljs-comment">//默认值</span>

    <span class="hljs-comment">//`httpAgent` 和 `httpsAgent`当产生一个http或者https请求时分别定义一个自定义的代理，在nodejs中。</span>
    <span class="hljs-comment">//这个允许设置一些选选个，像是`keepAlive`--这个在默认中是没有开启的。</span>
    httpAgent: <span class="hljs-keyword">new</span> http.Agent({<span class="hljs-attr">keepAlive</span>:treu}),
    <span class="hljs-attr">httpsAgent</span>: <span class="hljs-keyword">new</span> https.Agent({<span class="hljs-attr">keepAlive</span>:<span class="hljs-literal">true</span>}),

    <span class="hljs-comment">//`proxy`定义服务器的主机名字和端口号。</span>
    <span class="hljs-comment">//`auth`表明HTTP基本认证应该跟`proxy`相连接，并且提供证书。</span>
    <span class="hljs-comment">//这个将设置一个'Proxy-Authorization'头(header)，覆盖原先自定义的。</span>
    proxy:{
        <span class="hljs-attr">host</span>:<span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>,
        <span class="hljs-attr">port</span>:<span class="hljs-number">9000</span>,
        <span class="hljs-attr">auth</span>:{
            <span class="hljs-attr">username</span>:<span class="hljs-string">'cdd'</span>,
            <span class="hljs-attr">password</span>:<span class="hljs-string">'123456'</span>
        }
    },

    <span class="hljs-comment">//`cancelTaken` 定义一个取消，能够用来取消请求</span>
    <span class="hljs-comment">//（查看 下面的Cancellation 的详细部分）</span>
    cancelToken: <span class="hljs-keyword">new</span> CancelToken(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cancel</span>)</span>{
    })
}</code></pre>
<h2 id="articleHeader14">返回响应概要 Response Schema</h2>
<p>一个请求的返回包含以下信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    //`data`是服务器的提供的回复（相对于请求）
    data{},

    //`status`是服务器返回的http状态码
    status:200,


    //`statusText`是服务器返回的http状态信息
    statusText: 'ok',

    //`headers`是服务器返回中携带的headers
    headers:{},

    //`config`是对axios进行的设置，目的是为了请求（request）
    config:{}

    //`request`是获取当前相应的请求
    //它是node.js中最后一次的 ClientRequest的实例（在redirect中）
    //或者是在浏览器中的XMLHttpREquest实例
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-comment">//`data`是服务器的提供的回复（相对于请求）</span>
    data{},

    <span class="hljs-comment">//`status`是服务器返回的http状态码</span>
    status:<span class="hljs-number">200</span>,


    <span class="hljs-comment">//`statusText`是服务器返回的http状态信息</span>
    statusText: <span class="hljs-string">'ok'</span>,

    <span class="hljs-comment">//`headers`是服务器返回中携带的headers</span>
    headers:{},

    <span class="hljs-comment">//`config`是对axios进行的设置，目的是为了请求（request）</span>
    config:{}

    <span class="hljs-comment">//`request`是获取当前相应的请求</span>
    <span class="hljs-comment">//它是node.js中最后一次的 ClientRequest的实例（在redirect中）</span>
    <span class="hljs-comment">//或者是在浏览器中的XMLHttpREquest实例</span>
}
</code></pre>
<p>使用<code>then</code>时，你会接受到下面的信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get('/user/12345')
    .then(function(response){
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">axios.get(<span class="hljs-string">'/user/12345'</span>)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
        <span class="hljs-built_in">console</span>.log(response.data);
        <span class="hljs-built_in">console</span>.log(response.status);
        <span class="hljs-built_in">console</span>.log(response.statusText);
        <span class="hljs-built_in">console</span>.log(response.headers);
        <span class="hljs-built_in">console</span>.log(response.config);
    });</code></pre>
<p>使用<code>catch</code>时，或者传入一个<code>reject callback</code>作为<code>then</code>的第二个参数，那么返回的错误信息将能够被处理。</p>
<hr>
<h2 id="articleHeader15">默认设置（Config Default)</h2>
<p>你可以设置一个默认的设置，这设置将在之后的每次请求中生效。</p>
<h3 id="articleHeader16">全局默认设置 Global axios defaults</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">axios.defaults.baseURL = <span class="hljs-string">'https://api.example.com'</span>;
axios.defaults.headers.common[<span class="hljs-string">'Authorization'</span>] = AUTH_TOKEN;
axios.defaults.headers.post[<span class="hljs-string">'Content-Type'</span>]=<span class="hljs-string">'application/x-www-form-urlencoded'</span>;</code></pre>
<h3 id="articleHeader17">实例中自定义默认值 Custom instance default</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//当创建一个实例时进行默认设置
var instance = axios.create({
    baseURL:'https://api.example.com'
});

//或者在实例创建之后改变默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//当创建一个实例时进行默认设置</span>
<span class="hljs-keyword">var</span> instance = axios.create({
    <span class="hljs-attr">baseURL</span>:<span class="hljs-string">'https://api.example.com'</span>
});

<span class="hljs-comment">//或者在实例创建之后改变默认值</span>
instance.defaults.headers.common[<span class="hljs-string">'Authorization'</span>] = AUTH_TOKEN;</code></pre>
<h3 id="articleHeader18">设置优先级 Config order of precedence</h3>
<p>设置(config)将按照优先顺序合并起来。首先的是在<code>lib/defaults.js</code>中定义的默认设置，其次是<code>defaults</code>实例属性的设置，最后是请求中<code>config</code>参数的设置。越往后面的等级越高，会覆盖前面的设置。<br>看下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//使用默认库的设置创建一个实例，
//这个实例中，使用的是默认库的timeout设置，默认值是0。
var instance = axios.create();

//覆盖默认库中timeout的默认值
//此时，所有的请求的timeout时间是2.5秒
instance.defaults.timeout = 2500;

//覆盖该次请求中timeout的值，这个值设置的时间更长一些
instance.get('/longRequest',{
    timeout:5000
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//使用默认库的设置创建一个实例，</span>
<span class="hljs-comment">//这个实例中，使用的是默认库的timeout设置，默认值是0。</span>
<span class="hljs-keyword">var</span> instance = axios.create();

<span class="hljs-comment">//覆盖默认库中timeout的默认值</span>
<span class="hljs-comment">//此时，所有的请求的timeout时间是2.5秒</span>
instance.defaults.timeout = <span class="hljs-number">2500</span>;

<span class="hljs-comment">//覆盖该次请求中timeout的值，这个值设置的时间更长一些</span>
instance.get(<span class="hljs-string">'/longRequest'</span>,{
    <span class="hljs-attr">timeout</span>:<span class="hljs-number">5000</span>
});</code></pre>
<hr>
<h2 id="articleHeader19">拦截器 interceptors</h2>
<p>你可以在<code>请求</code>或者<code>返回</code>被<code>then</code>或者<code>catch</code>处理之前对他们进行拦截。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//添加一个请求拦截器
axios.interceptors.request.use(function(config){
    //在请求发送之前做一些事
    return config;
},function(error){
    //当出现请求错误是做一些事
    return Promise.reject(error);
});

//添加一个返回拦截器
axios.interceptors.response.use(function(response){
    //对返回的数据进行一些处理
    return response;
},function(error){
    //对返回的错误进行一些处理
    return Promise.reject(error);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//添加一个请求拦截器</span>
axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>)</span>{
    <span class="hljs-comment">//在请求发送之前做一些事</span>
    <span class="hljs-keyword">return</span> config;
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
    <span class="hljs-comment">//当出现请求错误是做一些事</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
});

<span class="hljs-comment">//添加一个返回拦截器</span>
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
    <span class="hljs-comment">//对返回的数据进行一些处理</span>
    <span class="hljs-keyword">return</span> response;
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
    <span class="hljs-comment">//对返回的错误进行一些处理</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
});</code></pre>
<p>如果你需要在稍后移除拦截器,你可以</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myInterceptor = axios.interceptors.request.use(function(){/*...*/});
axios.interceptors.request.eject(myInterceptor);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> myInterceptor = axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/*...*/</span>});
axios.interceptors.request.eject(myInterceptor);</code></pre>
<p>你可以在一个axios实例中使用拦截器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var instance = axios.create();
instance.interceptors.request.use(function(){/*...*/});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> instance = axios.create();
instance.interceptors.request.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/*...*/</span>});</code></pre>
<hr>
<h2 id="articleHeader20">错误处理 Handling Errors</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get('user/12345')
    .catch(function(error){
        if(error.response){
            //存在请求，但是服务器的返回一个状态码
            //他们是在2xx之外
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }else if(error.request){
          //如果是请求时的错误，且没有收到相应
          //`error.request`是一个浏览器的XMLHttpRequest实例，或者node.js的 ClientRequest实例。
          console.log(error.request)
        } 
        else{
            //一些错误是在设置请求时触发的
            console.log('Error',error.message);
        }
        console.log(error.config);
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">axios.get(<span class="hljs-string">'user/12345'</span>)
    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
        <span class="hljs-keyword">if</span>(error.response){
            <span class="hljs-comment">//存在请求，但是服务器的返回一个状态码</span>
            <span class="hljs-comment">//他们是在2xx之外</span>
            <span class="hljs-built_in">console</span>.log(error.response.data);
            <span class="hljs-built_in">console</span>.log(error.response.status);
            <span class="hljs-built_in">console</span>.log(error.response.headers);
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(error.request){
          <span class="hljs-comment">//如果是请求时的错误，且没有收到相应</span>
          <span class="hljs-comment">//`error.request`是一个浏览器的XMLHttpRequest实例，或者node.js的 ClientRequest实例。</span>
          <span class="hljs-built_in">console</span>.log(error.request)
        } 
        <span class="hljs-keyword">else</span>{
            <span class="hljs-comment">//一些错误是在设置请求时触发的</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Error'</span>,error.message);
        }
        <span class="hljs-built_in">console</span>.log(error.config);
    });</code></pre>
<p>你可以使用<code>validateStatus</code>设置选项自定义HTTP状态码的错误范围。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get('user/12345',{
    validateStatus:function(status){
        return status < 500;//当返回码小于等于500时视为错误
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">axios.get(<span class="hljs-string">'user/12345'</span>,{
    <span class="hljs-attr">validateStatus</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">status</span>)</span>{
        <span class="hljs-keyword">return</span> status &lt; <span class="hljs-number">500</span>;<span class="hljs-comment">//当返回码小于等于500时视为错误</span>
    }
});</code></pre>
<hr>
<h2 id="articleHeader21">取消 Cancellation</h2>
<p>你可以使用<strong>cancel token</strong>取消一个请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios的cancel token API是基于已经撤销的**cnacelable promises proposal**提议。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>axios的<span class="hljs-built_in">cancel</span> <span class="hljs-keyword">token</span> API是基于已经撤销的**cnacelable promises proposal**提议。
</code></pre>
<p>你可以使用<code>CancelToken.source</code>工厂函数创建一个cancel token，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
    cancelToken:source.toke
}).catch(function(thrown){
    if(axiso.isCancel(thrown)){
        console.log('Rquest canceled', thrown.message);
    }else{
        //handle error
    }
});

//取消请求(信息参数设可设置的)
source.cancel(&quot;操作被用户取消&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> CancelToken = axios.CancelToken;
<span class="hljs-keyword">var</span> source = CancelToken.source();

axios.get(<span class="hljs-string">'/user/12345'</span>, {
    <span class="hljs-attr">cancelToken</span>:source.toke
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">thrown</span>)</span>{
    <span class="hljs-keyword">if</span>(axiso.isCancel(thrown)){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Rquest canceled'</span>, thrown.message);
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-comment">//handle error</span>
    }
});

<span class="hljs-comment">//取消请求(信息参数设可设置的)</span>
source.cancel(<span class="hljs-string">"操作被用户取消"</span>);</code></pre>
<p>你可以给<code>CancelToken</code>构造函数传递一个executor function来创建一个cancel token:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CancelToken = axios.CancelToken;
var source = CancelToken.source()

axios.get('/user/12345',{
  cancelToke:source.token
}).catch(function(thrown){
  if(axios.isCancel(throw)){
    console.log('请求已取消',throw.message)
  }else{
    //处理错误
  }
})

axios.post('/user/2345',{
  name:'new name'
},{
  cancelToken:source.toke
})

source.cancel('错做已被用户取消！')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> CancelToken = axios.CancelToken;
<span class="hljs-keyword">var</span> source = CancelToken.source()

axios.get(<span class="hljs-string">'/user/12345'</span>,{
  <span class="hljs-attr">cancelToke</span>:source.token
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">thrown</span>)</span>{
  <span class="hljs-keyword">if</span>(axios.isCancel(<span class="hljs-keyword">throw</span>)){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'请求已取消'</span>,<span class="hljs-keyword">throw</span>.message)
  }<span class="hljs-keyword">else</span>{
    <span class="hljs-comment">//处理错误</span>
  }
})

axios.post(<span class="hljs-string">'/user/2345'</span>,{
  <span class="hljs-attr">name</span>:<span class="hljs-string">'new name'</span>
},{
  <span class="hljs-attr">cancelToken</span>:source.toke
})

source.cancel(<span class="hljs-string">'错做已被用户取消！'</span>)</code></pre>
<p>你也可以给<code>CancelToke</code>的构造函数传递一个处理函数来生成一个cancel token。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CancelToken = axios.CancelToken
let cancel;

acios.get('/user/12345',{
  cancelToken:new CancelToken(function excutor(c){
    //一个处理函数接受一个cancel函数作为参数
    cancel = c
  })
})

// 取消请求
cancel()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> CancelToken = axios.CancelToken
<span class="hljs-keyword">let</span> cancel;

acios.get(<span class="hljs-string">'/user/12345'</span>,{
  <span class="hljs-attr">cancelToken</span>:<span class="hljs-keyword">new</span> CancelToken(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">excutor</span>(<span class="hljs-params">c</span>)</span>{
    <span class="hljs-comment">//一个处理函数接受一个cancel函数作为参数</span>
    cancel = c
  })
})

<span class="hljs-comment">// 取消请求</span>
cancel()</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="注意：你可以使用同一个cancel token取消多个请求。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>注意：你可以使用同一个<span class="hljs-built_in">cancel</span> <span class="hljs-keyword">token</span>取消多个请求。
</code></pre>
<hr>
<h2 id="articleHeader22">使用 application/x-www-form-urlencoded 格式</h2>
<p><a href="https://segmentfault.com/n/1330000012118415"><code>本人做的简单包装</code></a></p>
<p>默认情况下，axios串联js对象为<code>JSON</code>格式。为了发送<code>application/x-wwww-form-urlencoded</code>格式数据，<br>你可以使用一下的设置。</p>
<h3 id="articleHeader23">浏览器 Browser</h3>
<p>在浏览器中你可以如下使用<code>URLSearchParams</code> API:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var params = new URLSearchParams();
params.append('param1','value1');
params.append('param2','value2');
axios.post('/foo',params);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> params = <span class="hljs-keyword">new</span> URLSearchParams();
params.append(<span class="hljs-string">'param1'</span>,<span class="hljs-string">'value1'</span>);
params.append(<span class="hljs-string">'param2'</span>,<span class="hljs-string">'value2'</span>);
axios.post(<span class="hljs-string">'/foo'</span>,params);</code></pre>
<p>注意：<code>URLSearchParams</code>不支持所有的浏览器，但是这里有个<a href="https://github.com/WebReflection/url-search-params" rel="nofollow noreferrer" target="_blank">垫片</a><br>（poly fill）可用（确保垫片在浏览器全局环境中）</p>
<p>其他方法：你可以使用<a href="https://github.com/ljharb/qs" rel="nofollow noreferrer" target="_blank"><code>qs</code></a>库来对数据编码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var qs = require('qs');
axios.post('/foo', qs.stringify({'bar':123}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> qs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'qs'</span>);
axios.post(<span class="hljs-string">'/foo'</span>, qs.stringify({<span class="hljs-string">'bar'</span>:<span class="hljs-number">123</span>}));</code></pre>
<p>或者其他方法(es6)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import qs from 'qs';
const data = {'bar':123};
const options = {
  method:'POST',
  headers:{
    'content-type':'application/x-www-from-urlencoded'
  },
  data:qs.stringify(data),
  url
}
axios(options)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>;
<span class="hljs-keyword">const</span> data = {<span class="hljs-string">'bar'</span>:<span class="hljs-number">123</span>};
<span class="hljs-keyword">const</span> options = {
  <span class="hljs-attr">method</span>:<span class="hljs-string">'POST'</span>,
  <span class="hljs-attr">headers</span>:{
    <span class="hljs-string">'content-type'</span>:<span class="hljs-string">'application/x-www-from-urlencoded'</span>
  },
  <span class="hljs-attr">data</span>:qs.stringify(data),
  url
}
axios(options)</code></pre>
<h2 id="articleHeader24">兼容Semver</h2>
<p>当axios放出<code>1.0</code>版本时，一些不兼容的更改将会放在新的版本中。例如<code>0.5.1</code>和<code>0.5.4</code>有相同的api，但是<code>0.6.0</code>会有不兼容的变化。</p>
<p><strong>译者：小知识</strong><br><strong>在npn的版本习惯中，版本使用的习惯是a.b.c,其中c的变化是一些bug的修复，b是一些功能的添加，a是大的版本的变化，会出现不兼容的情况。</strong></p>
<h2 id="articleHeader25">Node.js</h2>
<p>在nodejs中，你可以如下使用<code>querystring</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({foo:'bar'}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> querystring = <span class="hljs-built_in">require</span>(<span class="hljs-string">'querystring'</span>);
axios.post(<span class="hljs-string">'http://something.com/'</span>, querystring.stringify({<span class="hljs-attr">foo</span>:<span class="hljs-string">'bar'</span>}));</code></pre>
<p>你同样可以使用<code>qs</code>库。</p>
<hr>
<h2 id="articleHeader26">promises</h2>
<p>axios 基于原生的ES6 Promise 实现。如果环境不支持请使用<a href="https://github.com/stefanpenner/es6-promise" rel="nofollow noreferrer" target="_blank">垫片</a>.</p>
<h2 id="articleHeader27">TypeScript</h2>
<p>axios 包含<code>TypeScript</code>定义</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
axios.get('/user?ID=12345')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">import</span> axios from <span class="hljs-string">'axios'</span>
axios.<span class="hljs-built_in">get</span>(<span class="hljs-string">'/user?ID=12345'</span>)</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
axios 中文文档 翻译

## 原文链接
[https://segmentfault.com/a/1190000008470355](https://segmentfault.com/a/1190000008470355)

