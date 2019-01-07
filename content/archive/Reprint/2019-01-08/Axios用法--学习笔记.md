---
title: 'Axios用法--学习笔记' 
date: 2019-01-08 2:30:11
hidden: true
slug: xgffa9hi8ym
categories: [reprint]
---

{{< raw >}}

                    
<p>Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。<br><a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">Axios Github</a></p>
<h2 id="articleHeader0">功能特性</h2>
<ul>
<li><p>从浏览器中创建 XMLHttpRequests</p></li>
<li><p>从 node.js 创建 http 请求</p></li>
<li><p>支持 Promise API</p></li>
<li><p>拦截请求和响应</p></li>
<li><p>转换请求数据和响应数据</p></li>
<li><p>取消请求</p></li>
<li><p>自动转换 JSON 数据</p></li>
<li><p>客户端支持防御 XSRF</p></li>
</ul>
<h2 id="articleHeader1">安装</h2>
<p>使用 bower:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ bower install axios
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>$ <span class="hljs-keyword">bower </span><span class="hljs-keyword">install </span>axios
</code></pre>
<p>使用 npm:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install axios
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>$ npm <span class="hljs-keyword">install</span> axios
</code></pre>
<h2 id="articleHeader2">Example</h2>
<p>执行 GET 请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 可选地，上面的请求可以这样做
axios.get('/user', {
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
      </div><pre class="hljs scilab"><code><span class="hljs-comment">// 为给定 ID 的 user 创建请求</span>
axios.get(<span class="hljs-string">'/user?ID=12345'</span>)
  .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(response)</span> {</span>
    console.<span class="hljs-built_in">log</span>(response);
  })
  .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(error)</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">error</span>);
  });

<span class="hljs-comment">// 可选地，上面的请求可以这样做</span>
axios.get(<span class="hljs-string">'/user'</span>, {
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
<p>执行 POST 请求</p>
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
  });
" title="" data-original-title="复制"></span>
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
  });
</code></pre>
<p>执行多个并发请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">getUserAccount</span>() {
  <span class="hljs-keyword">return</span> <span class="hljs-type">axios.get('/user/12345')</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title">getUserPermissions</span>() {
  <span class="hljs-keyword">return</span> <span class="hljs-type">axios.get('/user/12345/permissions')</span>;
}

axios.<span class="hljs-keyword">all</span>([getUserAccount(), getUserPermissions()])
  .<span class="hljs-keyword">then</span>(axios.spread(<span class="hljs-keyword">function</span> <span class="hljs-title"></span>(acct, perms) {
    // 两个请求现在都执行完成
  }));
</code></pre>
<h2 id="articleHeader3">axios API</h2>
<p>可以通过向 axios 传递相关配置来创建请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    axios(config)
    // 发送 POST 请求
    axios({
      method: 'post',
      url: '/user/12345',
      data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
      }
    });
    axios(url[, config])

// 发送 GET 请求（默认的方法）

    axios('/user/12345');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-selector-tag">axios</span>(config)
    <span class="hljs-comment">// 发送 POST 请求</span>
    <span class="hljs-selector-tag">axios</span>({
      <span class="hljs-attribute">method</span>: <span class="hljs-string">'post'</span>,
      <span class="hljs-attribute">url</span>: <span class="hljs-string">'/user/12345'</span>,
      <span class="hljs-attribute">data</span>: {
        <span class="hljs-attribute">firstName</span>: <span class="hljs-string">'Fred'</span>,
        <span class="hljs-attribute">lastName</span>: <span class="hljs-string">'Flintstone'</span>
      }
    });
    <span class="hljs-selector-tag">axios</span>(url[, config])

<span class="hljs-comment">// 发送 GET 请求（默认的方法）</span>

    <span class="hljs-selector-tag">axios</span>(<span class="hljs-string">'/user/12345'</span>);
</code></pre>
<p>请求方法的别名<br>为方便起见，为所有支持的请求方法提供了别名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.request</span>(<span class="hljs-selector-tag">config</span>)
<span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.get</span>(<span class="hljs-selector-tag">url</span><span class="hljs-selector-attr">[, config]</span>)
<span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.delete</span>(<span class="hljs-selector-tag">url</span><span class="hljs-selector-attr">[, config]</span>)
<span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.head</span>(<span class="hljs-selector-tag">url</span><span class="hljs-selector-attr">[, config]</span>)
<span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.post</span>(<span class="hljs-selector-tag">url</span><span class="hljs-selector-attr">[, data[, config]</span>])
<span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.put</span>(<span class="hljs-selector-tag">url</span><span class="hljs-selector-attr">[, data[, config]</span>])
<span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.patch</span>(<span class="hljs-selector-tag">url</span><span class="hljs-selector-attr">[, data[, config]</span>])
</code></pre>
<p>NOTE<br>在使用别名方法时， url、method、data 这些属性都不必在配置中指定。</p>
<h2 id="articleHeader4">并发</h2>
<p>处理并发请求的助手函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.all(iterable)
axios.spread(callback)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.all</span>(<span class="hljs-selector-tag">iterable</span>)
<span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.spread</span>(<span class="hljs-selector-tag">callback</span>)
</code></pre>
<h2 id="articleHeader5">创建实例</h2>
<p>可以使用自定义配置新建一个 axios 实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.create([config])
var instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>axios.create([config])
var<span class="hljs-built_in"> instance </span>= axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
</code></pre>
<h2 id="articleHeader6">实例方法</h2>
<p>以下是可用的实例方法。指定的配置将与实例的配置合并</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs leaf"><code>axios<span class="hljs-function"><span class="hljs-keyword">#</span><span class="hljs-title">request</span><span class="hljs-params">(<span class="hljs-variable">config</span>)</span></span>
axios<span class="hljs-function"><span class="hljs-keyword">#</span><span class="hljs-title">get</span><span class="hljs-params">(<span class="hljs-variable">url</span>[, <span class="hljs-variable">config</span>])</span></span>
axios<span class="hljs-function"><span class="hljs-keyword">#</span><span class="hljs-title">delete</span><span class="hljs-params">(<span class="hljs-variable">url</span>[, <span class="hljs-variable">config</span>])</span></span>
axios<span class="hljs-function"><span class="hljs-keyword">#</span><span class="hljs-title">head</span><span class="hljs-params">(<span class="hljs-variable">url</span>[, <span class="hljs-variable">config</span>])</span></span>
axios<span class="hljs-function"><span class="hljs-keyword">#</span><span class="hljs-title">post</span><span class="hljs-params">(<span class="hljs-variable">url</span>[, <span class="hljs-variable">data</span>[, <span class="hljs-variable">config</span>]])</span></span>
axios<span class="hljs-function"><span class="hljs-keyword">#</span><span class="hljs-title">put</span><span class="hljs-params">(<span class="hljs-variable">url</span>[, <span class="hljs-variable">data</span>[, <span class="hljs-variable">config</span>]])</span></span>
axios<span class="hljs-function"><span class="hljs-keyword">#</span><span class="hljs-title">patch</span><span class="hljs-params">(<span class="hljs-variable">url</span>[, <span class="hljs-variable">data</span>[, <span class="hljs-variable">config</span>]])</span></span>
</code></pre>
<h2 id="articleHeader7">请求配置</h2>
<p>这些是创建请求时可以用的配置选项。只有 url 是必需的。如果没有指定 method，请求将默认使用 get 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认的

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认的

  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的

  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 &amp;&amp; status < 300; // 默认的
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // 默认的

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: : {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>{
  <span class="hljs-comment">// `url` 是用于请求的服务器 URL</span>
  url: <span class="hljs-string">'/user'</span>,

  <span class="hljs-comment">// `method` 是创建请求时使用的方法</span>
  method: <span class="hljs-string">'get'</span>, <span class="hljs-comment">// 默认是 get</span>

  <span class="hljs-comment">// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。</span>
  <span class="hljs-comment">// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL</span>
  baseURL: <span class="hljs-string">'https://some-domain.com/api/'</span>,

  <span class="hljs-comment">// `transformRequest` 允许在向服务器发送前，修改请求数据</span>
  <span class="hljs-comment">// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法</span>
  <span class="hljs-comment">// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream</span>
  transformRequest: [<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(data)</span> </span>{
    <span class="hljs-comment">// 对 data 进行任意转换处理</span>

    <span class="hljs-keyword">return</span> data;
  }],

  <span class="hljs-comment">// `transformResponse` 在传递给 then/catch 前，允许修改响应数据</span>
  transformResponse: [<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(data)</span> </span>{
    <span class="hljs-comment">// 对 data 进行任意转换处理</span>

    <span class="hljs-keyword">return</span> data;
  }],

  <span class="hljs-comment">// `headers` 是即将被发送的自定义请求头</span>
  headers: {<span class="hljs-string">'X-Requested-With'</span>: <span class="hljs-string">'XMLHttpRequest'</span>},

  <span class="hljs-comment">// `params` 是即将与请求一起发送的 URL 参数</span>
  <span class="hljs-comment">// 必须是一个无格式对象(plain object)或 URLSearchParams 对象</span>
  params: {
    ID: <span class="hljs-number">12345</span>
  },

  <span class="hljs-comment">// `paramsSerializer` 是一个负责 `params` 序列化的函数</span>
  <span class="hljs-comment">// (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)</span>
  paramsSerializer: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(params)</span> </span>{
    <span class="hljs-keyword">return</span> Qs.stringify(params, {arrayFormat: <span class="hljs-string">'brackets'</span>})
  },

  <span class="hljs-comment">// `data` 是作为请求主体被发送的数据</span>
  <span class="hljs-comment">// 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'</span>
  <span class="hljs-comment">// 在没有设置 `transformRequest` 时，必须是以下类型之一：</span>
  <span class="hljs-comment">// - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams</span>
  <span class="hljs-comment">// - 浏览器专属：FormData, File, Blob</span>
  <span class="hljs-comment">// - Node 专属： Stream</span>
  data: {
    firstName: <span class="hljs-string">'Fred'</span>
  },

  <span class="hljs-comment">// `timeout` 指定请求超时的毫秒数(0 表示无超时时间)</span>
  <span class="hljs-comment">// 如果请求话费了超过 `timeout` 的时间，请求将被中断</span>
  timeout: <span class="hljs-number">1000</span>,

  <span class="hljs-comment">// `withCredentials` 表示跨域请求时是否需要使用凭证</span>
  withCredentials: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 默认的</span>

  <span class="hljs-comment">// `adapter` 允许自定义处理请求，以使测试更轻松</span>
  <span class="hljs-comment">// 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).</span>
  adapter: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(config)</span> </span>{
    <span class="hljs-comment">/* ... */</span>
  },

  <span class="hljs-comment">// `auth` 表示应该使用 HTTP 基础验证，并提供凭据</span>
  <span class="hljs-comment">// 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头</span>
  auth: {
    username: <span class="hljs-string">'janedoe'</span>,
    password: <span class="hljs-string">'s00pers3cret'</span>
  },

  <span class="hljs-comment">// `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'</span>
  responseType: <span class="hljs-string">'json'</span>, <span class="hljs-comment">// 默认的</span>

  <span class="hljs-comment">// `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称</span>
  xsrfCookieName: <span class="hljs-string">'XSRF-TOKEN'</span>, <span class="hljs-comment">// default</span>

  <span class="hljs-comment">// `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称</span>
  xsrfHeaderName: <span class="hljs-string">'X-XSRF-TOKEN'</span>, <span class="hljs-comment">// 默认的</span>

  <span class="hljs-comment">// `onUploadProgress` 允许为上传处理进度事件</span>
  onUploadProgress: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(progressEvent)</span> </span>{
    <span class="hljs-comment">// 对原生进度事件的处理</span>
  },

  <span class="hljs-comment">// `onDownloadProgress` 允许为下载处理进度事件</span>
  onDownloadProgress: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(progressEvent)</span> </span>{
    <span class="hljs-comment">// 对原生进度事件的处理</span>
  },

  <span class="hljs-comment">// `maxContentLength` 定义允许的响应内容的最大尺寸</span>
  maxContentLength: <span class="hljs-number">2000</span>,

  <span class="hljs-comment">// `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte</span>
  validateStatus: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(status)</span> </span>{
    <span class="hljs-keyword">return</span> status &gt;= <span class="hljs-number">200</span> &amp;&amp; status &lt; <span class="hljs-number">300</span>; <span class="hljs-comment">// 默认的</span>
  },

  <span class="hljs-comment">// `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目</span>
  <span class="hljs-comment">// 如果设置为0，将不会 follow 任何重定向</span>
  maxRedirects: <span class="hljs-number">5</span>, <span class="hljs-comment">// 默认的</span>

  <span class="hljs-comment">// `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：</span>
  <span class="hljs-comment">// `keepAlive` 默认没有启用</span>
  httpAgent: <span class="hljs-keyword">new</span> http.Agent({ keepAlive: <span class="hljs-literal">true</span> }),
  httpsAgent: <span class="hljs-keyword">new</span> https.Agent({ keepAlive: <span class="hljs-literal">true</span> }),

  <span class="hljs-comment">// 'proxy' 定义代理服务器的主机名称和端口</span>
  <span class="hljs-comment">// `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据</span>
  <span class="hljs-comment">// 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。</span>
  proxy: {
    host: <span class="hljs-string">'127.0.0.1'</span>,
    port: <span class="hljs-number">9000</span>,
    auth: : {
      username: <span class="hljs-string">'mikeymike'</span>,
      password: <span class="hljs-string">'rapunz3l'</span>
    }
  },

  <span class="hljs-comment">// `cancelToken` 指定用于取消请求的 cancel token</span>
  <span class="hljs-comment">// （查看后面的 Cancellation 这节了解更多）</span>
  cancelToken: <span class="hljs-keyword">new</span> CancelToken(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(cancel)</span> </span>{
  })
}
</code></pre>
<h2 id="articleHeader8">响应结构</h2>
<p>某个请求的响应包含以下信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

  // `config` 是为请求提供的配置信息
  config: {}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>{
  <span class="hljs-regexp">//</span> <span class="hljs-string">`data`</span> 由服务器提供的响应
  <span class="hljs-symbol">data:</span> {},

  <span class="hljs-regexp">//</span> <span class="hljs-string">`status`</span> 来自服务器响应的 HTTP 状态码
  <span class="hljs-symbol">status:</span> <span class="hljs-number">200</span>,

  <span class="hljs-regexp">//</span> <span class="hljs-string">`statusText`</span> 来自服务器响应的 HTTP 状态信息
  <span class="hljs-symbol">statusText:</span> <span class="hljs-string">'OK'</span>,

  <span class="hljs-regexp">//</span> <span class="hljs-string">`headers`</span> 服务器响应的头
  <span class="hljs-symbol">headers:</span> {},

  <span class="hljs-regexp">//</span> <span class="hljs-string">`config`</span> 是为请求提供的配置信息
  <span class="hljs-symbol">config:</span> {}
}
</code></pre>
<p>使用 then 时，你将接收下面这样的响应：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get('/user/12345')
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code>axios.<span class="hljs-keyword">get</span>(<span class="hljs-comment">'/user/12345')</span>
  .<span class="hljs-keyword">then</span>(<span class="hljs-keyword">function</span>(<span class="hljs-built_in">response</span>) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">response</span>.data);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">response</span>.status);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">response</span>.statusText);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">response</span>.headers);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">response</span>.config);
  });
</code></pre>
<p>在使用 catch 时，或传递 rejection callback 作为 then 的第二个参数时，响应可以通过 error 对象可被使用，正如在错误处理这一节所讲。。<br>配置的默认值/defaults<br>你可以指定将被用在各个请求的配置默认值</p>
<h2 id="articleHeader9">全局的 axios 默认值</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>axios.defaults.baseURL = <span class="hljs-string">'https://api.example.com'</span>;
axios.defaults.headers.common[<span class="hljs-string">'Authorization'</span>] = <span class="hljs-symbol">AUTH_TOKEN</span>;
axios.defaults.headers.post[<span class="hljs-string">'Content-Type'</span>] = <span class="hljs-string">'application/x-www-form-urlencoded'</span>;
</code></pre>
<p>自定义实例默认值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 在实例已创建后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>// 创建实例时设置配置的默认值
var<span class="hljs-built_in"> instance </span>= axios.create({
  baseURL: 'https://api.example.com'
});

// 在实例已创建后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
</code></pre>
<p>配置的优先顺序<br>配置会以一个优先顺序进行合并。这个顺序是：在 lib/defaults.js 找到的库的默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。后者将优先于前者。这里是一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var<span class="hljs-built_in"> instance </span>= axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000
});
</code></pre>
<h2 id="articleHeader10">拦截器</h2>
<p>在请求或响应被 then 或 catch 处理前拦截它们。</p>
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
<p>如果你想在稍后移除拦截器，可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> myInterceptor = axios.interceptors.request.<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{<span class="hljs-comment">/*...*/</span>});
axios.interceptors.request.eject(myInterceptor);
</code></pre>
<p>可以为自定义 axios 实例添加拦截器</p>
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
<h2 id="articleHeader11">错误处理</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>axios.get(<span class="hljs-string">'/user/12345'</span>)
  .<span class="hljs-keyword">catch</span>(function (<span class="hljs-keyword">error</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">error</span>.response) {
      <span class="hljs-comment">// 请求已发出，但服务器响应的状态码不在 2xx 范围内</span>
      console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">error</span>.response.data);
      console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">error</span>.response.status);
      console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">error</span>.response.headers);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Something happened in setting up the request that triggered an Error</span>
      console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'Error'</span>, <span class="hljs-keyword">error</span>.message);
    }
    console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">error</span>.config);
  });
</code></pre>
<p>可以使用 validateStatus 配置选项定义一个自定义 HTTP 状态码的错误范围。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // 状态码在大于或等于500时才会 reject
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>axios.get(<span class="hljs-string">'/user/12345'</span>, {
  validateStatus: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(status)</span> </span>{
    <span class="hljs-keyword">return</span> status &lt; <span class="hljs-number">500</span>; <span class="hljs-comment">// 状态码在大于或等于500时才会 reject</span>
  }
})
</code></pre>
<h2 id="articleHeader12">取消</h2>
<p>使用 cancel token 取消请求<br>Axios 的 cancel token API 基于cancelable promises proposal，它还处于第一阶段。<br>可以使用 CancelToken.source 工厂方法创建 cancel token，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> CancelToken = axios.CancelToken;
<span class="hljs-keyword">var</span> source = CancelToken.source();

axios.<span class="hljs-keyword">get</span>(<span class="hljs-string">'/user/12345'</span>, {
  cancelToken: <span class="hljs-type">source</span>.token
}).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span></span>(thrown) {
  <span class="hljs-keyword">if</span> (axios.isCancel(thrown)) {
    console.log(<span class="hljs-string">'Request canceled'</span>, thrown.message);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 处理错误</span>
  }
});

<span class="hljs-comment">// 取消请求（message 参数是可选的）</span>
source.cancel(<span class="hljs-string">'Operation canceled by the user.'</span>);
</code></pre>
<p>还可以通过传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CancelToken = axios.CancelToken;
var cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> CancelToken = axios.CancelToken;
<span class="hljs-keyword">var</span> cancel;

axios.get(<span class="hljs-string">'/user/12345'</span>, {
  cancelToken: <span class="hljs-keyword">new</span> CancelToken(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">executor</span><span class="hljs-params">(c)</span> </span>{
    <span class="hljs-comment">// executor 函数接收一个 cancel 函数作为参数</span>
    cancel = c;
  })
});

<span class="hljs-comment">// 取消请求</span>
cancel();
</code></pre>
<p>Note : 可以使用同一个 cancel token 取消多个请求</p>
<p>摘自axios github</p>
<p><a href="http://www.wheelsfactory.cn/" rel="nofollow noreferrer" target="_blank">轮子工厂</a>--一个分享优秀的vue,angular组件的网站</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Axios用法--学习笔记

## 原文链接
[https://segmentfault.com/a/1190000010262522](https://segmentfault.com/a/1190000010262522)

