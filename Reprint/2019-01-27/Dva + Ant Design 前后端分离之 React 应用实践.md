---
title: 'Dva + Ant Design 前后端分离之 React 应用实践' 
date: 2019-01-27 2:30:59
hidden: true
slug: zopj8uo03n
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>源站链接 <a href="https://tkvern.com/20170204/Dva%20+%20Ant%20Design%20%E5%89%8D%E5%90%8E%E7%AB%AF%E5%88%86%E7%A6%BB%E4%B9%8B%20React%20%E5%BA%94%E7%94%A8%E5%AE%9E%E8%B7%B5/" rel="nofollow noreferrer" target="_blank">https://tkvern.com</a></p></blockquote>
<p>继 <a href="https://ruby-china.org/topics/30594" rel="nofollow noreferrer" target="_blank">Rails 从入门到完全放弃 拥抱 Elixir + Phoenix + React + Redux</a> 这篇文章被喷之后，笔者很长一段时候没有上社区逛了。现在 <a>tkvern</a> 又回归了，给大家带来React实践的一些经验，一些踩坑的经验。</p>
<p>Rails嘛，很好用，Laravel也好用。Phoenix也好用。都好，哪个方便用哪个。</p>
<p>还有关于<em>Turbolinks</em>之争，不能单从页面渲染时间去对比，要综合考虑。</p>
<h2 id="articleHeader0">Why Dva？</h2>
<p>Dva是基于Redux做了一层封装，对于React的state管理，有很多方案，我选择了轻量、简单的Dva。至于Mobx，还没应用到项目中来。先等友军踩踩坑，再往里面跳。</p>
<ul>
<li><p><a href="https://github.com/dvajs/dva/issues/1" rel="nofollow noreferrer" target="_blank">Why dva and what's dva</a></p></li>
<li><p><a href="https://www.github.com/sorrycc/blog/issues/6" rel="nofollow noreferrer" target="_blank">支付宝前端应用架构的发展和选择</a></p></li>
</ul>
<p>顺便贴下Dva的特性：</p>
<ul>
<li><p><strong>易学易用</strong>：仅有 5 个 api，对 redux 用户尤其友好</p></li>
<li><p><strong>elm 概念</strong>：通过 <code>reducers</code>, <code>effects</code> 和 <code>subscriptions</code> 组织 model</p></li>
<li><p><strong>支持 mobile 和 react-native</strong>：跨平台 (<a href="https://github.com/sorrycc/dva-example-react-native" rel="nofollow noreferrer" target="_blank">react-native 例子</a>)</p></li>
<li><p><strong>支持 HMR</strong>：目前基于 <a href="https://github.com/dvajs/babel-plugin-dva-hmr" rel="nofollow noreferrer" target="_blank">babel-plugin-dva-hmr</a> 支持 components 和 routes 的 HMR</p></li>
<li><p><strong>动态加载 Model 和路由</strong>：按需加载加快访问速度 (<a href="https://github.com/dvajs/dva/tree/master/examples/dynamic-load" rel="nofollow noreferrer" target="_blank">例子</a>)</p></li>
<li><p><strong>插件机制</strong>：比如 <a href="https://github.com/dvajs/dva-loading" rel="nofollow noreferrer" target="_blank">dva-loading</a> 可以自动处理 loading 状态，不用一遍遍地写 showLoading 和 hideLoading</p></li>
<li><p><strong>完善的语法分析库 <a href="https://github.com/dvajs/dva-ast" rel="nofollow noreferrer" target="_blank">dva-ast</a></strong>：<a href="https://github.com/dvajs/dva-cli" rel="nofollow noreferrer" target="_blank">dva-cli</a> 基于此实现了智能创建 model, router 等</p></li>
<li><p><strong>支持 TypeScript</strong>：通过 d.ts (<a href="https://github.com/sorrycc/dva-boilerplate-typescript" rel="nofollow noreferrer" target="_blank">例子</a>)</p></li>
</ul>
<h2 id="articleHeader1">Why Ant Design?</h2>
<p>做为传道士，这么好的UI设计语言，肯定不会藏着掖着啦。蚂蚁金服的东西，确实不错，除了Ant Design外，还有Ant Design Mobile、AntV、AntMotion、G2。</p>
<h2 id="articleHeader2">Why yarn?</h2>
<p><code>npm install</code> 太慢，试试<a href="https://yarnpkg.com/" rel="nofollow noreferrer" target="_blank">yarn</a>吧。建议用<code>npm install yarn -g</code>进行安装。</p>
<h2 id="articleHeader3">开发过程中的前后端分离</h2>
<p>项目开始了，前端视图写完，要开始数据交互了，后端提供的API还没好。</p>
<p>那么问题来了，如何在不依靠后端提供API的情况下，实现数据交互？</p>
<p>使用<a href="http://mockjs.com/" rel="nofollow noreferrer" target="_blank">Mock.js</a>可以解决这个问题。先对接好API数据格式，然后使用Mockjs拦截Ajax请求，模拟后端真实数据。</p>
<p>在Mockjs官方提供的API不够用的情况下，还可以使用正则产生模拟数据。</p>
<h3 id="articleHeader4">如何对模拟做数据持久化处理？</h3>
<p>这里给出一个模拟用户数据并持久化的实例实例：<a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/mock/users.js" rel="nofollow noreferrer" target="_blank">mock/users.js</a></p>
<p>代码摘要:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

const qs = require('qs');
const mockjs = require('mockjs');

const Random = mockjs.Random;

// 数据持久化
let tableListData = {};

if (!global.tableListData) {
  const data = mockjs.mock({
    'data|100': [{
      'id|+1': 1,
      'name': () => {
        return Random.cname();
      },
      'mobile': /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
      'avatar': () => {
        return Random.image('125x125');
      },
      'status|1-2': 1,
      'email': () => {
        return Random.email('visiondk.com');
      },
      'isadmin|0-1': 1,
      'created_at': () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss');
      },
      'updated_at': () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss');
      },
    }],
    page: {
      total: 100,
      current: 1,
    },
  });
  tableListData = data;
  global.tableListData = tableListData;
} else {
  tableListData = global.tableListData;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">const</span> qs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'qs'</span>);
<span class="hljs-keyword">const</span> mockjs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mockjs'</span>);

<span class="hljs-keyword">const</span> Random = mockjs.Random;

<span class="hljs-comment">// 数据持久化</span>
<span class="hljs-keyword">let</span> tableListData = {};

<span class="hljs-keyword">if</span> (!global.tableListData) {
  <span class="hljs-keyword">const</span> data = mockjs.mock({
    <span class="hljs-string">'data|100'</span>: [{
      <span class="hljs-string">'id|+1'</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">'name'</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> Random.cname();
      },
      <span class="hljs-string">'mobile'</span>: <span class="hljs-regexp">/1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/</span>,
      <span class="hljs-string">'avatar'</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> Random.image(<span class="hljs-string">'125x125'</span>);
      },
      <span class="hljs-string">'status|1-2'</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">'email'</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> Random.email(<span class="hljs-string">'visiondk.com'</span>);
      },
      <span class="hljs-string">'isadmin|0-1'</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">'created_at'</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> Random.datetime(<span class="hljs-string">'yyyy-MM-dd HH:mm:ss'</span>);
      },
      <span class="hljs-string">'updated_at'</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> Random.datetime(<span class="hljs-string">'yyyy-MM-dd HH:mm:ss'</span>);
      },
    }],
    <span class="hljs-attr">page</span>: {
      <span class="hljs-attr">total</span>: <span class="hljs-number">100</span>,
      <span class="hljs-attr">current</span>: <span class="hljs-number">1</span>,
    },
  });
  tableListData = data;
  global.tableListData = tableListData;
} <span class="hljs-keyword">else</span> {
  tableListData = global.tableListData;
}</code></pre>
<h3 id="articleHeader5">模拟API怎么写？</h3>
<p>完成持久化处理后，就可以像操作数据库一样进行增、删、改、查</p>
<p>下面是一个删除用户的API</p>
<p>参见<a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/mock/users.js#L106" rel="nofollow noreferrer" target="_blank">mock/users.js#L106</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'DELETE /api/users' (req, res) {
    setTimeout(() => {
      const deleteItem = qs.parse(req.body);

      tableListData.data = tableListData.data.filter((item) => {
        if (item.id === deleteItem.id) {
          return false;
        }

        return true;
      });

      tableListData.page.total = tableListData.data.length;

      global.tableListData = tableListData;

      res.json({
        success: true,
        data: tableListData.data,
        page: tableListData.page,
      });
    }, 200);
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">'DELETE /api/users'</span> (req, res) {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> deleteItem = qs.parse(req.body);

      tableListData.data = tableListData.data.filter(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (item.id === deleteItem.id) {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }

        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
      });

      tableListData.page.total = tableListData.data.length;

      global.tableListData = tableListData;

      res.json({
        <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">data</span>: tableListData.data,
        <span class="hljs-attr">page</span>: tableListData.page,
      });
    }, <span class="hljs-number">200</span>);
  },</code></pre>
<h3 id="articleHeader6">还有一步</h3>
<p>模拟数据和API写好了，还需要拦截Ajax请求</p>
<p>修改<code>package.json</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .
  .
  .
  &quot;scripts&quot;: {
    &quot;start&quot;: &quot;dora --plugins \&quot;proxy,webpack,webpack-hmr\&quot;&quot;,
    &quot;build&quot;: &quot;atool-build -o ../../../public&quot;,
    &quot;test&quot;: &quot;atool-test-mocha ./src/**/*-test.js&quot;
  }
  .
  .
  ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  .
  .
  .
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"dora --plugins \"proxy,webpack,webpack-hmr\""</span>,
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"atool-build -o ../../../public"</span>,
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"atool-test-mocha ./src/**/*-test.js"</span>
  }
  .
  .
  .</code></pre>
<p>如果与<code>dora</code>有端口冲突可修改<code>dora</code>的端口号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;start&quot;: &quot;dora --port 8888 --plugins \&quot;proxy,webpack,webpack-hmr\&quot;&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"start"</span>: <span class="hljs-string">"dora --port 8888 --plugins \"proxy,webpack,webpack-hmr\""</span>,</code></pre>
<p>完成这些基本工作就做好了</p>
<h3 id="articleHeader7">友情提示</h3>
<p>在模拟数据环境，<code>services</code>下的模块这么写就好了，真实API则替换为真实API的地址。可将地址前缀写到统一配置中去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import request from '../utils/request';
import qs from 'qs';
export async function query(params) {
  return request(`/api/users?${qs.stringify(params)}`);
}

export async function create(params) {
  return request('/api/users', {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function remove(params) {
  return request('/api/users', {
    method: 'delete',
    body: qs.stringify(params),
  });
}

export async function update(params) {
  return request('/api/users', {
    method: 'put',
    body: qs.stringify(params),
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> request <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils/request'</span>;
<span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">query</span>(<span class="hljs-params">params</span>) </span>{
  <span class="hljs-keyword">return</span> request(<span class="hljs-string">`/api/users?<span class="hljs-subst">${qs.stringify(params)}</span>`</span>);
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>(<span class="hljs-params">params</span>) </span>{
  <span class="hljs-keyword">return</span> request(<span class="hljs-string">'/api/users'</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">'post'</span>,
    <span class="hljs-attr">body</span>: qs.stringify(params),
  });
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove</span>(<span class="hljs-params">params</span>) </span>{
  <span class="hljs-keyword">return</span> request(<span class="hljs-string">'/api/users'</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">'delete'</span>,
    <span class="hljs-attr">body</span>: qs.stringify(params),
  });
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span>(<span class="hljs-params">params</span>) </span>{
  <span class="hljs-keyword">return</span> request(<span class="hljs-string">'/api/users'</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">'put'</span>,
    <span class="hljs-attr">body</span>: qs.stringify(params),
  });
}</code></pre>
<p>真实API参考实例: <a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/src/services/users.js" rel="nofollow noreferrer" target="_blank">src/services/users.js</a></p>
<h2 id="articleHeader8">如何保持登录状态</h2>
<p>在看dva的引导手册时，并没有介绍登录相关的内容。因为不同的项目，对于登录这块的实现会有所不同，并不是唯一的。通常我们会使用Cookie的方式保持登录状态，或者 Auth 2.0的技术。</p>
<p>这里介绍Cookie的方式。</p>
<p>登录成功之后服务器会设置一个当前域可以使用的Cookie，例如<code>token</code>啥的。然后在每次数据请求的时候在<code>Request Headers</code>中携带<code>token</code>，后端会基于这个<code>token</code>进行权限验证。思路清晰了，来看看具体实现吧。（注：在这次项目中使用了统一登录模块，通过Header中的<code>Authorization</code>进行验证，将只介绍拿到<code>token</code>之后的数据处理）</p>
<h3 id="articleHeader9">准备工作</h3>
<p>对于操作Cookie的一些操作，建议先封装到工具类模块下。同时我把操作<code>LocalStrage</code>的一些操作也写进来了。</p>
<p>参见<a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/src/utils/helper.js" rel="nofollow noreferrer" target="_blank">src/utils/helper.js</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
.
.
// Operation Cookie
export function getCookie(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  const arr = document.cookie.match(reg);
  if (arr) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}

export function delCookie({ name, domain, path }) {
  if (getCookie(name)) {
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=' + 
                      path + '; domain=' + 
                      domain;
  }
}
.
.
." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">.
.
.
<span class="hljs-comment">// Operation Cookie</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCookie</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">const</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'(^| )'</span> + name + <span class="hljs-string">'=([^;]*)(;|$)'</span>);
  <span class="hljs-keyword">const</span> arr = <span class="hljs-built_in">document</span>.cookie.match(reg);
  <span class="hljs-keyword">if</span> (arr) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">decodeURIComponent</span>(arr[<span class="hljs-number">2</span>]);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">delCookie</span>(<span class="hljs-params">{ name, domain, path }</span>) </span>{
  <span class="hljs-keyword">if</span> (getCookie(name)) {
    <span class="hljs-built_in">document</span>.cookie = name + <span class="hljs-string">'=; expires=Thu, 01-Jan-70 00:00:01 GMT; path='</span> + 
                      path + <span class="hljs-string">'; domain='</span> + 
                      domain;
  }
}
.
.
.</code></pre>
<p>Header的预处理我放在了<a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/src/utils/auth.js#L5" rel="nofollow noreferrer" target="_blank">src/utils/auth.js#L5</a>，这里后端返回的数据都是JSON格式，所以在Header里面需要添加<code>application/json</code>进去，而<code>Authorization</code>是后端用来验证用户信息的。变量<code>sso_token</code>为了方便代码阅读就没有按照规范命名了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function getAuthHeader(sso_token) {
  return ({
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sso_token,
      'Content-Type': 'application/json',
    },
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAuthHeader</span>(<span class="hljs-params">sso_token</span>) </span>{
  <span class="hljs-keyword">return</span> ({
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-string">'Accept'</span>: <span class="hljs-string">'application/json'</span>,
      <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">'Bearer '</span> + sso_token,
      <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>,
    },
  });
}</code></pre>
<h3 id="articleHeader10">修改Request</h3>
<p>这里没有使用自带的catch机制来处理请求错误，在开发过程中，最开始打算使用统一错误处理，但是发现请求失败后，不能在<code>models</code>层处理<code>components</code>，所以就换了一种方式处理，后面会讲到。</p>
<p>参见<a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/src/utils/request.js#L29" rel="nofollow noreferrer" target="_blank">src/utils/request.js#L29</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function request(url, options) {
  const sso_token = getCookie('sso_token');
  const authHeader = getAuthHeader(sso_token);
  return fetch(url, { ...options, ...authHeader })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }));
    // .catch((err) => ({ err }));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">url, options</span>) </span>{
  <span class="hljs-keyword">const</span> sso_token = getCookie(<span class="hljs-string">'sso_token'</span>);
  <span class="hljs-keyword">const</span> authHeader = getAuthHeader(sso_token);
  <span class="hljs-keyword">return</span> fetch(url, { ...options, ...authHeader })
    .then(checkStatus)
    .then(parseJSON)
    .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> ({ data }));
    <span class="hljs-comment">// .catch((err) =&gt; ({ err }));</span>
}</code></pre>
<p>完成这些配置之后，每次向服务器发送的请求就都携带了用户<code>token</code>了。在<code>token</code>无效时，服务器会抛出<code>401</code>错误，这时就需要在中间件中处理<code>401</code>错误。</p>
<p>参见<a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/src/utils/request.js#L10" rel="nofollow noreferrer" target="_blank">src/utils/request.js#L10</a></p>
<p><code>redirectLogin</code>是工具类<a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/src/utils/auth" rel="nofollow noreferrer" target="_blank">src/utils/auth.js</a>中的重定向登录方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkStatus(response) {
  if (response &amp;&amp; response.status === 401) {
    redirectLogin();
  }
  if (response.status >= 200 &amp;&amp; response.status < 500) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStatus</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-keyword">if</span> (response &amp;&amp; response.status === <span class="hljs-number">401</span>) {
    redirectLogin();
  }
  <span class="hljs-keyword">if</span> (response.status &gt;= <span class="hljs-number">200</span> &amp;&amp; response.status &lt; <span class="hljs-number">500</span>) {
    <span class="hljs-keyword">return</span> response;
  }
  <span class="hljs-keyword">const</span> error = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(response.statusText);
  error.response = response;
  <span class="hljs-keyword">throw</span> error;
}</code></pre>
<p>到此为止，登录状态的配置基本完成。</p>
<h2 id="articleHeader11">Router</h2>
<p>我们的应用中会有多个页面，而且有的需要登录才可见，那么如何控制呢？</p>
<p>React的路由控制是比较灵活的，来看看下面这个例子：</p>
<p><a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/src/router.jsx" rel="nofollow noreferrer" target="_blank">src/router.jsx</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { Router, Route } from 'dva/router';
import { authenticated } from './utils/auth';
import Dashboard from './routes/Dashboard';
import Users from './routes/Users';
import User from './routes/User';
import Password from './routes/Password';
import Roles from './routes/Roles';
import Permissions from './routes/Permissions';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path=&quot;/&quot; component={Dashboard} onEnter={authenticated} />
      <Route path=&quot;/user&quot; component={User} onEnter={authenticated} />
      <Route path=&quot;/password&quot; component={Password} onEnter={authenticated} />
      <Route path=&quot;/users&quot; component={Users} onEnter={authenticated} />
      <Route path=&quot;/roles&quot; component={Roles} onEnter={authenticated} />
      <Route path=&quot;/permissions&quot; component={Permissions} onEnter={authenticated} />
    </Router>
  );
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { Router, Route } <span class="hljs-keyword">from</span> <span class="hljs-string">'dva/router'</span>;
<span class="hljs-keyword">import</span> { authenticated } <span class="hljs-keyword">from</span> <span class="hljs-string">'./utils/auth'</span>;
<span class="hljs-keyword">import</span> Dashboard <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Dashboard'</span>;
<span class="hljs-keyword">import</span> Users <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Users'</span>;
<span class="hljs-keyword">import</span> User <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/User'</span>;
<span class="hljs-keyword">import</span> Password <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Password'</span>;
<span class="hljs-keyword">import</span> Roles <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Roles'</span>;
<span class="hljs-keyword">import</span> Permissions <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes/Permissions'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{ history }</span>) </span>{
  <span class="hljs-keyword">return</span> (
    &lt;Router history={history}&gt;
      &lt;Route path="/" component={Dashboard} onEnter={authenticated} /&gt;
      &lt;Route path="/user" component={User} onEnter={authenticated} /&gt;
      &lt;Route path="/password" component={Password} onEnter={authenticated} /&gt;
      &lt;Route path="/users" component={Users} onEnter={authenticated} /&gt;
      &lt;Route path="/roles" component={Roles} onEnter={authenticated} /&gt;
      &lt;Route path="/permissions" component={Permissions} onEnter={authenticated} /&gt;
    &lt;/Router&gt;
  );
}
</code></pre>
<p>对于路由的验证配置在<code>onEnter</code>属性中，<code>authenticated</code>方法可统一进行路由验证，要注意每一个<code>Route</code>节点的验证都需要配置相应的<code>onEnter</code>属性。如果权限较为复杂需对每一个<code>Route</code>单独验证。其实这种基于客户端渲染的应用，如果页面限制有遗漏也关系不太，后端提供的API会对数据进行验证，即使前端访问到没有权限的页面，也同样不用担心，做好客户端错误处理即可。</p>
<h2 id="articleHeader12">数据缓存</h2>
<p>对于一个React应用来说，缓存是很重要的一步。前后端分离后，频繁的Ajax请求会消耗大量的服务器资源，如果一些不长变动的持久化数据不做缓存的话，会浪费许多资源。所以，比较常见的方法就是将数据缓存在<code>LocalStorage</code>中。针对一些敏感信息可适当进行加密混淆处理，我这里就不介绍了。</p>
<h3 id="articleHeader13">什么时候做数据缓存?</h3>
<p>例：用户信息缓存</p>
<p>参见<a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/src/models/auth.js#L64" rel="nofollow noreferrer" target="_blank">src/models/auth.js#L64</a></p>
<p>在<code>subscriptions</code>中配置了<code>setup</code>检测<code>LocalStorage</code>中的<code>user</code>是否存在。不存在时会去<code>query</code>用户信息，然后保存到<code>user</code>中，如果存在就将<code>user</code>中的数据添加到<code>state</code>的<code>user: {}</code>中。当然在进行请求时，已经在<code>src/utils/auth.js</code>验证用户信息是否正确，同时做了相应的限制<a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/src/utils/auth.js#L20" rel="nofollow noreferrer" target="_blank">src/utils/auth.js#L20</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { parse } from 'qs';
import { message } from 'antd';
import { query, update, password } from '../services/auth';
import { getLocalStorage, setLocalStorage } from '../utils/helper';

export default {
  namespace: 'auth',
  state: {
    user: {},
    isLogined: false,
    currentMenu: [],
  },
  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload, isLogined: true };
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { data } = yield call(query, parse(payload));
      if (data &amp;&amp; data.err_msg === 'SUCCESS') {
        setLocalStorage('user', data.data);
        yield put({
          type: 'querySuccess',
          payload: {
            user: data.data,
          },
        });
      }
    },
  }
  subscriptions: {
    setup({ dispatch }) {
      const data = getLocalStorage('user');
      if (!data) {
        dispatch({
          type: 'query',
          payload: {},
        });
      } else {
        dispatch({
          type: 'querySuccess',
          payload: {
            user: data,
          },
        });
      }
    },
  },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { parse } <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>;
<span class="hljs-keyword">import</span> { message } <span class="hljs-keyword">from</span> <span class="hljs-string">'antd'</span>;
<span class="hljs-keyword">import</span> { query, update, password } <span class="hljs-keyword">from</span> <span class="hljs-string">'../services/auth'</span>;
<span class="hljs-keyword">import</span> { getLocalStorage, setLocalStorage } <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils/helper'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">namespace</span>: <span class="hljs-string">'auth'</span>,
  <span class="hljs-attr">state</span>: {
    <span class="hljs-attr">user</span>: {},
    <span class="hljs-attr">isLogined</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">currentMenu</span>: [],
  },
  <span class="hljs-attr">reducers</span>: {
    querySuccess(state, action) {
      <span class="hljs-keyword">return</span> { ...state, ...action.payload, <span class="hljs-attr">isLogined</span>: <span class="hljs-literal">true</span> };
    },
  },
  <span class="hljs-attr">effects</span>: {
    *query({ payload }, { call, put }) {
      <span class="hljs-keyword">const</span> { data } = <span class="hljs-keyword">yield</span> call(query, parse(payload));
      <span class="hljs-keyword">if</span> (data &amp;&amp; data.err_msg === <span class="hljs-string">'SUCCESS'</span>) {
        setLocalStorage(<span class="hljs-string">'user'</span>, data.data);
        <span class="hljs-keyword">yield</span> put({
          <span class="hljs-attr">type</span>: <span class="hljs-string">'querySuccess'</span>,
          <span class="hljs-attr">payload</span>: {
            <span class="hljs-attr">user</span>: data.data,
          },
        });
      }
    },
  }
  subscriptions: {
    setup({ dispatch }) {
      <span class="hljs-keyword">const</span> data = getLocalStorage(<span class="hljs-string">'user'</span>);
      <span class="hljs-keyword">if</span> (!data) {
        dispatch({
          <span class="hljs-attr">type</span>: <span class="hljs-string">'query'</span>,
          <span class="hljs-attr">payload</span>: {},
        });
      } <span class="hljs-keyword">else</span> {
        dispatch({
          <span class="hljs-attr">type</span>: <span class="hljs-string">'querySuccess'</span>,
          <span class="hljs-attr">payload</span>: {
            <span class="hljs-attr">user</span>: data,
          },
        });
      }
    },
  },
}</code></pre>
<p>简单来说，就是没有缓存的时候缓存。</p>
<h3 id="articleHeader14">什么时候更新数据缓存？</h3>
<p>例如，<code>roles</code>中<code>添加</code>和<code>修改</code>功能都需要用到<code>permissions</code>的数据，哪我怎么拿到最新的<code>permissions</code>数据呢。首先，我在加载<code>roles</code>列表页面时就需要将<code>permissions</code>的数据缓存，这样，在每次点<code>添加</code>或<code>修改</code>功能时就不需要再去拉取已缓存的数据了。</p>
<p>参见<a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/src/models/roles.js#L166" rel="nofollow noreferrer" target="_blank">src/models/roles.js#L166</a></p>
<p>在监听路由到<code>roles</code>时查询<code>permissions</code>是否缓存，将其更新到缓存中去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
.
.
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/roles').exec(location.pathname);
        if (match) {
          const data = getLocalStorage('permissions');
          if (!data) {
            dispatch({
              type: 'permissions/updateCache',
            });
          }
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
      });
    },
  },
.
.
." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">.
.
.
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(<span class="hljs-function">(<span class="hljs-params">location</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> match = pathToRegexp(<span class="hljs-string">'/roles'</span>).exec(location.pathname);
        <span class="hljs-keyword">if</span> (match) {
          <span class="hljs-keyword">const</span> data = getLocalStorage(<span class="hljs-string">'permissions'</span>);
          <span class="hljs-keyword">if</span> (!data) {
            dispatch({
              <span class="hljs-attr">type</span>: <span class="hljs-string">'permissions/updateCache'</span>,
            });
          }
          dispatch({
            <span class="hljs-attr">type</span>: <span class="hljs-string">'query'</span>,
            <span class="hljs-attr">payload</span>: location.query,
          });
        }
      });
    },
  },
.
.
.</code></pre>
<h3 id="articleHeader15">什么时候删除数据缓存？</h3>
<p>删除缓存的配置是比较灵活的，这里的业务场景并不复杂所以，我用了比较简单的处理方式。</p>
<p>参见<a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/src/models/permissions.js#L112" rel="nofollow noreferrer" target="_blank">src/models/permissions.js#L112</a></p>
<p>在执行新增或更新操作成功后，将本地原有的缓存删除。加上数据联动的特性，当再次回到<code>roles</code>操作时，缓存已经更新了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
.
.
    *update({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const id = yield select(({ permissions }) => permissions.currentItem.id);
      const newRole = { ...payload, id };
      const { data } = yield call(update, newRole);
      if (data &amp;&amp; data.err_msg === 'SUCCESS') {
        yield put({
          type: 'updateSuccess',
          payload: newRole,
        });
        localStorage.removeItem('permissions');
        message.success('更新成功!');
      }
    },
.
.
." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">.
.
.
    *update({ payload }, { select, call, put }) {
      <span class="hljs-keyword">yield</span> put({ <span class="hljs-attr">type</span>: <span class="hljs-string">'hideModal'</span> });
      <span class="hljs-keyword">yield</span> put({ <span class="hljs-attr">type</span>: <span class="hljs-string">'showLoading'</span> });
      <span class="hljs-keyword">const</span> id = <span class="hljs-keyword">yield</span> select(<span class="hljs-function">(<span class="hljs-params">{ permissions }</span>) =&gt;</span> permissions.currentItem.id);
      <span class="hljs-keyword">const</span> newRole = { ...payload, id };
      <span class="hljs-keyword">const</span> { data } = <span class="hljs-keyword">yield</span> call(update, newRole);
      <span class="hljs-keyword">if</span> (data &amp;&amp; data.err_msg === <span class="hljs-string">'SUCCESS'</span>) {
        <span class="hljs-keyword">yield</span> put({
          <span class="hljs-attr">type</span>: <span class="hljs-string">'updateSuccess'</span>,
          <span class="hljs-attr">payload</span>: newRole,
        });
        localStorage.removeItem(<span class="hljs-string">'permissions'</span>);
        message.success(<span class="hljs-string">'更新成功!'</span>);
      }
    },
.
.
.</code></pre>
<h3 id="articleHeader16">State的临时缓存</h3>
<p>state的中的数据是变化的，刷新页面之后会重置掉，也可以将部分<code>models</code>中的<code>state</code>存到<code>Localstorage</code>中，让state的数据从<code>Localstorage</code>读取，但不是必要的。而<code>list</code>数据的更新，是直接操作state中的数据的。</p>
<p>如下(这样就不用更新整个list的数据了)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
.
.
    grantSuccess(state, action) {
      const grantUser = action.payload;
      const newList = state.list.map((user) => {
        if (user.id === grantUser.id) {
          user.roles = grantUser.roles;
          return { ...user };
        }
        return user;
      });
      return { ...state, ...newList, loading: false };
    },
.
.
." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">.
.
.
    grantSuccess(state, action) {
      <span class="hljs-keyword">const</span> grantUser = action.payload;
      <span class="hljs-keyword">const</span> newList = state.list.map(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (user.id === grantUser.id) {
          user.roles = grantUser.roles;
          <span class="hljs-keyword">return</span> { ...user };
        }
        <span class="hljs-keyword">return</span> user;
      });
      <span class="hljs-keyword">return</span> { ...state, ...newList, <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span> };
    },
.
.
.</code></pre>
<h2 id="articleHeader17">视图组件运用</h2>
<p>Ant 提供的组件非常多，但用起来还是需要一些学习成本的，同时多个组件组合使用时也需要有很多地方注意的。</p>
<h3 id="articleHeader18">Modal注意事项</h3>
<p>在使用Modal组件时，难免会出现一个页面多个Modal的情况，首先要注意的就是Modal的命名，在多Modal情况下，命名不注意很容易出现分不清用的是哪个Modal。建议命名时能望名知意。然后就是Modal需要用到别的Models的数据时，如果在弹窗时通过Ajax获取需要的数据再显示Modal，这样就会出现Modal延迟，而且Modal的动画也无法加载出来。所以，我的处理方式是，在进入这一级<code>Route</code>的时候就将需要的数据<code>预缓存</code>，这样调用时就可随用随取，不会出现延迟了。</p>
<p>参见<a href="https://github.com/tkvern/dva-passport/blob/develop/resources/assets/ant_passport/src/components/user/UserModalGrant.jsx#L33" rel="nofollow noreferrer" target="_blank">src/components/user/UserModalGrant.jsx#L33</a></p>
<h3 id="articleHeader19">Form注意</h3>
<p>Ant的form组件很完善，需要注意的就是表单的多条件查询。如果单单是一个条件查询的处理比较简单，将查询关键词设成<code>string</code>类型存到相应的Models中的state即可，多条件的话，稍微麻烦一点，需存成Hash对象。灵活处理即可。</p>
<h3 id="articleHeader20">其他</h3>
<p>官方文档的描述很清楚，我就不充大头了。注意写法规范即可，直接复制粘贴官方例子代码会很难看。</p>
<h2 id="articleHeader21">跨域问题</h2>
<p>终于说到点子上了，前后端分离遇到跨域问题很正常，而这种基于RESTful API的前后端分离就更好弄了。我这以Fetch + PHP + Laravel为例，这种并不是最有解决方案！仅供参考！</p>
<p>在<code>header</code>中进行如下配置</p>
<p><code>Access-Control-Allow-Origin</code>配置允许的域</p>
<p><code>Access-Control-Allow-Methods</code>配置允许的请求方式</p>
<p><code>Access-Control-Allow-Headers</code>配置允许的请求头</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the &quot;api&quot; middleware group. Enjoy building your API!
|
*/

Route::group(['middleware'=> ['auth:api']], function() {
    header(&quot;Access-Control-Allow-Origin: *&quot;);
    header(&quot;Access-Control-Allow-Methods: GET, HEAD, POST, PUT, PATCH, DELETE&quot;);
    header(&quot;Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers&quot;);
    require base_path('routes/common.php');
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-meta">&lt;?php</span>

<span class="hljs-keyword">use</span> <span class="hljs-title">Illuminate</span>\<span class="hljs-title">Http</span>\<span class="hljs-title">Request</span>;

<span class="hljs-comment">/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/</span>

Route::group([<span class="hljs-string">'middleware'</span>=&gt; [<span class="hljs-string">'auth:api'</span>]], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    header(<span class="hljs-string">"Access-Control-Allow-Origin: *"</span>);
    header(<span class="hljs-string">"Access-Control-Allow-Methods: GET, HEAD, POST, PUT, PATCH, DELETE"</span>);
    header(<span class="hljs-string">"Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"</span>);
    <span class="hljs-keyword">require</span> base_path(<span class="hljs-string">'routes/common.php'</span>);
});
</code></pre>
<p>基于其他编程语言的处理类似。</p>
<h2 id="articleHeader22">结语</h2>
<p>了解前端、熟悉前端、精通前端、熟悉前端、不懂前端</p>
<p>了解 X X 、熟悉 X X 、精通 X X 、熟悉 X X 、不懂 X X</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Dva + Ant Design 前后端分离之 React 应用实践

## 原文链接
[https://segmentfault.com/a/1190000008250977](https://segmentfault.com/a/1190000008250977)

