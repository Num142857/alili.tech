---
title: 'axios-mock-adapter：axios的模拟调试器' 
date: 2019-01-14 2:30:07
hidden: true
slug: 3r0swpvu9vu
categories: [reprint]
---

{{< raw >}}

                    
<p>最近学习vue,需要后台模拟数据，从npm中搜索到axios-mock-adapter，即axios的模拟调试器，通过axios模拟调用后台，后台数据可以使用mock.js来造假数据。现将研究的做如下记录：<br><a href="https://www.npmjs.com/package/axios-mock-adapter" rel="nofollow noreferrer" target="_blank">npm包链接</a></p>
<h2 id="articleHeader0">1.安装</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.1 npm方式    
    npm install axios-mock-adapter --save-dev
1.2 script引入方式
<script src=&quot;https://unpkg.com/axios-mock-adapter/dist/axios-mock-adapter.js&quot;></script>
<script src=&quot;https://unpkg.com/axios-mock-adapter/dist/axios-mock-adapter.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>1.1 npm方式    
    npm install axios-mock-adapter --save-dev
1.2 script引入方式
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/axios-mock-adapter/dist/axios-mock-adapter.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/axios-mock-adapter/dist/axios-mock-adapter.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader1">2.引入</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2.1 es6  引入方式  import
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
2.2 require  引入方式
var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">2.1</span> es6  引入方式  <span class="hljs-keyword">import</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
<span class="hljs-keyword">import</span> MockAdapter <span class="hljs-keyword">from</span> <span class="hljs-string">'axios-mock-adapter'</span>;
<span class="hljs-number">2.2</span> <span class="hljs-built_in">require</span>  引入方式
<span class="hljs-keyword">var</span> axios = <span class="hljs-built_in">require</span>(<span class="hljs-string">'axios'</span>);
<span class="hljs-keyword">var</span> MockAdapter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'axios-mock-adapter'</span>);</code></pre>
<h2 id="articleHeader2">3.使用 example</h2>
<p>首先创建一个实例<br>let mock = new MockAdapter(axios);</p>
<p>3.1模拟一个GET请求   ES6</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//导入模块
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// 设置模拟调试器实例 
var mock = new MockAdapter(axios);
// 模拟任意GET请求到 /users 
//reply的参数为 (status, data, headers) 
mock.onGet('/users').reply(200, {
  users: [
    { id: 1, name: 'John Smith' }
  ]
});
axios.get('/users')
  .then(function(response) {
    console.log(response.data);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//导入模块</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
<span class="hljs-keyword">import</span> MockAdapter <span class="hljs-keyword">from</span> <span class="hljs-string">'axios-mock-adapter'</span>;
<span class="hljs-comment">// 设置模拟调试器实例 </span>
<span class="hljs-keyword">var</span> mock = <span class="hljs-keyword">new</span> MockAdapter(axios);
<span class="hljs-comment">// 模拟任意GET请求到 /users </span>
<span class="hljs-comment">//reply的参数为 (status, data, headers) </span>
mock.onGet(<span class="hljs-string">'/users'</span>).reply(<span class="hljs-number">200</span>, {
  <span class="hljs-attr">users</span>: [
    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'John Smith'</span> }
  ]
});
axios.get(<span class="hljs-string">'/users'</span>)
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
    <span class="hljs-built_in">console</span>.log(response.data);
  });</code></pre>
<p>3.2 模拟一个GET请求带参数的parameters</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mock.onGet('/users', { params: { searchText: 'John' } }).reply(200, {
  users: [
    { id: 1, name: 'John Smith' }
  ]
});
 
axios.get('/users', { params: { searchText: 'John' } } )
  .then(function(response) {
    console.log(response.data);
  });
//在初始化模拟调试器的时候，设置几秒的延迟：响应的延迟 
var mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>mock.onGet(<span class="hljs-string">'/users'</span>, { params: { searchText: <span class="hljs-string">'John'</span> } }).reply(<span class="hljs-number">200</span>, {
  users: [
    { id: <span class="hljs-number">1</span>, name: <span class="hljs-string">'John Smith'</span> }
  ]
});
 
axios.get(<span class="hljs-string">'/users'</span>, { params: { searchText: <span class="hljs-string">'John'</span> } } )
  .<span class="hljs-keyword">then</span>(<span class="hljs-keyword">function</span>(response) {
    console.log(response.data);
  });
//在初始化模拟调试器的时候，设置几秒的延迟：响应的延迟 
var mock = new MockAdapter(axiosInstance, { delayResponse: <span class="hljs-number">2000</span> });</code></pre>
<p>3.3 传递一个function to reply</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mock.onGet('/users').reply(function(config) {
  //config是axios config 
  //返回一个数组[status, data, headers] 
  return [200, {
    users: [
      { id: 1, name: 'John Smith' }
    ]
  }];
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>mock.onGet(<span class="hljs-string">'/users'</span>).reply(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>) </span>{
  <span class="hljs-comment">//config是axios config </span>
  <span class="hljs-comment">//返回一个数组[status, data, headers] </span>
  <span class="hljs-keyword">return</span> [<span class="hljs-number">200</span>, {
    <span class="hljs-attribute">users</span>: [
      { <span class="hljs-attribute">id:</span><span class="hljs-string"> 1, name</span>: <span class="hljs-string">'John Smith'</span> }
    ]
  }];
});</code></pre>
<p>3.4 没有具体路径的时候</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 拒绝所有的 POST 请求，返回 HTTP 500 
mock.onPost().reply(500);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 拒绝所有的 POST 请求，返回 HTTP 500 </span>
<span class="hljs-selector-tag">mock</span><span class="hljs-selector-class">.onPost</span>()<span class="hljs-selector-class">.reply</span>(<span class="hljs-number">500</span>);</code></pre>
<p>3.5 模拟一个put请求  body/data</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mock.onPut('/product', { id: 4, name: 'foo' }).reply(204);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">mock</span><span class="hljs-selector-class">.onPut</span>(<span class="hljs-string">'/product'</span>, { <span class="hljs-attribute">id</span>: <span class="hljs-number">4</span>, <span class="hljs-attribute">name</span>: <span class="hljs-string">'foo'</span> })<span class="hljs-selector-class">.reply</span>(<span class="hljs-number">204</span>);</code></pre>
<h2 id="articleHeader3">4.实例</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let mock = new MockAdapter(axios);
// 模拟成功请求
mock.onGet('/success').reply(200, {
  msg: 'success'
});
// 模拟错误请求
mock.onGet('/error').reply(500, {
  msg: 'failure'
});
//模拟登录                POST
mock.onPost('/login').reply(config => {
  let {username, password} = JSON.parse(config.data);
  return new Promise((resolve, reject) => {
    let user = null;
    setTimeout(() => {
      let hasUser = LoginUsers.some(u => {
        if (u.username === username &amp;&amp; u.password === password) {
          user = JSON.parse(JSON.stringify(u));
          user.password = undefined;
          return true;
        }
      });

      if (hasUser) {
        resolve([200, { code: 200, msg: '请求成功', user }]);
      } else {
        resolve([200, { code: 500, msg: '账号或密码错误' }]);
      }
    }, 1000);
  });
});
axios.post('/login', params).then(res => res.data);
//模拟批量删除                           GET
mock.onGet('/user/batchremove').reply(config => {
  let { ids } = config.params;
  ids = ids.split(',');
 ***_Users = _Users.filter(u => !ids.includes(u.id));***
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([200, {
        code: 200,
        msg: '删除成功'
      }]);
    }, 500);
  });
});
axios.get(`${base}/user/batchremove`, { params: params }); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> mock = <span class="hljs-keyword">new</span> MockAdapter(axios);
<span class="hljs-comment">// 模拟成功请求</span>
mock.onGet(<span class="hljs-string">'/success'</span>).reply(<span class="hljs-number">200</span>, {
  <span class="hljs-attr">msg</span>: <span class="hljs-string">'success'</span>
});
<span class="hljs-comment">// 模拟错误请求</span>
mock.onGet(<span class="hljs-string">'/error'</span>).reply(<span class="hljs-number">500</span>, {
  <span class="hljs-attr">msg</span>: <span class="hljs-string">'failure'</span>
});
<span class="hljs-comment">//模拟登录                POST</span>
mock.onPost(<span class="hljs-string">'/login'</span>).reply(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
  <span class="hljs-keyword">let</span> {username, password} = <span class="hljs-built_in">JSON</span>.parse(config.data);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> user = <span class="hljs-literal">null</span>;
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">let</span> hasUser = LoginUsers.some(<span class="hljs-function"><span class="hljs-params">u</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (u.username === username &amp;&amp; u.password === password) {
          user = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(u));
          user.password = <span class="hljs-literal">undefined</span>;
          <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
      });

      <span class="hljs-keyword">if</span> (hasUser) {
        resolve([<span class="hljs-number">200</span>, { <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">msg</span>: <span class="hljs-string">'请求成功'</span>, user }]);
      } <span class="hljs-keyword">else</span> {
        resolve([<span class="hljs-number">200</span>, { <span class="hljs-attr">code</span>: <span class="hljs-number">500</span>, <span class="hljs-attr">msg</span>: <span class="hljs-string">'账号或密码错误'</span> }]);
      }
    }, <span class="hljs-number">1000</span>);
  });
});
axios.post(<span class="hljs-string">'/login'</span>, params).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.data);
<span class="hljs-comment">//模拟批量删除                           GET</span>
mock.onGet(<span class="hljs-string">'/user/batchremove'</span>).reply(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
  <span class="hljs-keyword">let</span> { ids } = config.params;
  ids = ids.split(<span class="hljs-string">','</span>);
 ***_Users = _Users.filter(<span class="hljs-function"><span class="hljs-params">u</span> =&gt;</span> !ids.includes(u.id));***
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      resolve([<span class="hljs-number">200</span>, {
        <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">msg</span>: <span class="hljs-string">'删除成功'</span>
      }]);
    }, <span class="hljs-number">500</span>);
  });
});
axios.get(<span class="hljs-string">`<span class="hljs-subst">${base}</span>/user/batchremove`</span>, { <span class="hljs-attr">params</span>: params }); </code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
axios-mock-adapter：axios的模拟调试器

## 原文链接
[https://segmentfault.com/a/1190000009464850](https://segmentfault.com/a/1190000009464850)

