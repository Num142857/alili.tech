---
title: 'Ant Design Pro 上手备忘录' 
date: 2018-12-15 2:30:11
hidden: true
slug: tl3q8p572p
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文基于 Ant Design Pro 1.1.0 版本，参考前请注意版本信息。</blockquote>
<p><a href="https://pro.ant.design" rel="nofollow noreferrer" target="_blank">Ant Design Pro</a> 是蚂蚁金服团队在 Ant Design 的设计规范与组件库基础上推出的一套 React 实现的企业级中后台前端/设计解决方案。</p>
<h2 id="articleHeader0">上手</h2>
<p>使用方法是直接 clone 其 GitHub 仓库然后执行 <code>npm install</code>，或是安装官方提供的 cli 工具创建项目（但在这过程中也会涉及到 clone 其 GitHub 仓库）。新项目创建后，自带模板页面和工具链，可以快速更改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone --depth=1 https://github.com/ant-design/ant-design-pro.git my-project
cd my-project
npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">git <span class="hljs-built_in">clone</span> --depth=1 https://github.com/ant-design/ant-design-pro.git my-project
<span class="hljs-built_in">cd</span> my-project
npm install</code></pre>
<p>对于开发者而言，要做的当然是将项目快速适配自己的需求。官方提供了<a href="https://pro.ant.design/docs/getting-started-cn" rel="nofollow noreferrer" target="_blank">中文文档</a>，但其中内容组织较为零碎。在这里和大家简单地以示例页面中的<code>标准列表</code>为例子，做一个整理，希望能帮助到大家快速上手这个框架。</p>
<p><span class="img-wrap"><img data-src="/img/bV27NT?w=561&amp;h=467" src="https://static.alili.tech/img/bV27NT?w=561&amp;h=467" alt="官方示例中的code标准列表/code" title="官方示例中的code标准列表/code" style="cursor: pointer;"></span></p>
<p>安装完成后，我们运行 <code>npm run start</code> 来启动本地开发服务器，稍等片刻脚本就会自动完成打包。Ant Design Pro 默认通过只需浏览器单方面就可处理的 <code>HashHistory</code> 来完成路由。如果要切换为 <code>BrowserHistory</code>，那在 <code>src/index.js</code> 中也有对应的内容可以直接修改，但需要在后端服务器进行相应路由配置。</p>
<h2 id="articleHeader1">从路由到组件</h2>
<p>我们在左侧的导航栏点击 <code>列表页 &gt; 标准列表</code> 后，可以进入到上面截图所示的页面。导航栏的内容在 <code>src/common/menu.js</code> 中，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 导航栏记录
 * src/common/menu.js
 */

{
  name: '列表页',
  icon: 'table',
  path: 'list',
  children: [{
    name: '查询表格',
    path: 'table-list',
  }, {
    name: '标准列表',
    path: 'basic-list',
  }
  ...],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 导航栏记录
 * src/common/menu.js
 */</span>

{
  <span class="hljs-attr">name</span>: <span class="hljs-string">'列表页'</span>,
  <span class="hljs-attr">icon</span>: <span class="hljs-string">'table'</span>,
  <span class="hljs-attr">path</span>: <span class="hljs-string">'list'</span>,
  <span class="hljs-attr">children</span>: [{
    <span class="hljs-attr">name</span>: <span class="hljs-string">'查询表格'</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'table-list'</span>,
  }, {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'标准列表'</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'basic-list'</span>,
  }
  ...],
}</code></pre>
<p>全局的路由关系是这样一个走向：<code>src/index.js</code> 中通过 <code>app.router(require('./router').default);</code>，将 <code>src/router.js</code> 绑定到 <code>dva</code> 实例的 <code>router</code> 方法上。而在 <code>src/router.js</code> 中又引入了 <code>src/common/router.js</code> 中的 <code>getRouterData</code> 作为数据源。如果有点绕，不太能一下子看明白，那就直接记下面的结论：</p>
<p>因而，<code>src/common/menu.js</code> 中 <code>path</code> 所指向的路径对应于 <code>src/common/router.js</code> 中的路由记录。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 路由记录
 * src/common/router.js
 */

export const getRouterData = (app) => {
  const routerConfig = {
    ...,
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
    },
    ...,
  };
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 路由记录
 * src/common/router.js
 */</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getRouterData = <span class="hljs-function">(<span class="hljs-params">app</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> routerConfig = {
    ...,
    <span class="hljs-string">'/list/basic-list'</span>: {
      <span class="hljs-attr">component</span>: dynamicWrapper(app, [<span class="hljs-string">'list'</span>], () =&gt; <span class="hljs-keyword">import</span>(<span class="hljs-string">'../routes/List/BasicList'</span>)),
    },
    ...,
  };
  ...
}</code></pre>
<p>这里调用了同文件内的 lazy-loading 的动态加载函数 <code>dynamicWrapper</code>，有 3 个参数，<code>app</code> 为全局 <code>dva</code> 实例，<code>models</code> 为一个带有相关 <code>dva</code> Model <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup> 的 Array，<code>component</code> 即为该路由记录对应的实际组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dynamicWrapper = (app, models, component) => {...};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> dynamicWrapper = <span class="hljs-function">(<span class="hljs-params">app, models, component</span>) =&gt;</span> {...};</code></pre>
<p>顺藤摸瓜，我们打开 <code>src/routes/List/BasicList.js</code>，开始考察具体组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  render() {
    return (
      <PageHeaderLayout>{/* 具体页面内容 */}</PageHeaderLayout>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">PureComponent</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> { connect } from <span class="hljs-symbol">'dv</span>a';
<span class="hljs-keyword">import</span> <span class="hljs-type">PageHeaderLayout</span> from '../../layouts/<span class="hljs-type">PageHeaderLayout</span>';

<span class="hljs-meta">@connect</span>(({ list, loading }) =&gt; ({
  list,
  loading: loading.models.list,
}))
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BasicList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">PureComponent</span> </span>{
  componentDidMount() {
    <span class="hljs-keyword">this</span>.props.dispatch({
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'list</span>/fetch',
      payload: {
        count: <span class="hljs-number">5</span>,
      },
    });
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">PageHeaderLayout</span>&gt;{<span class="hljs-comment">/* 具体页面内容 */</span>}&lt;/<span class="hljs-type">PageHeaderLayout</span>&gt;
    );
  }
}</code></pre>
<blockquote>
<h3 id="articleHeader2">@connect 装饰器</h3>
<p>首先的组件写法中调用了 <code>dva</code> 所封装的 <code>react-redux</code> 的 <code>@connect</code> 装饰器，用来接收绑定的 <code>list</code> 这个 model 对应的 redux store。注意到这里的装饰器实际除了 <code>app.state.list</code> 以外还实际接收 <code>app.state.loading</code> 作为参数，这个 <code>loading</code> 的来源是 <code>src/index.js</code> 中调用的 <code>dva-loading</code> <sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup> 这个插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
* src/index.js
*/
import createLoading from 'dva-loading';
app.use(createLoading());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*
* src/index.js
*/</span>
<span class="hljs-keyword">import</span> createLoading <span class="hljs-keyword">from</span> <span class="hljs-string">'dva-loading'</span>;
app.use(createLoading());</code></pre>
<p>它返回的信息包含了 global、model 和 effect 的异步加载完成情况。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;global&quot;: true,
  &quot;models&quot;: {
    &quot;list&quot;: false,
    &quot;user&quot;: true,
    &quot;rule&quot;: false
  },
  &quot;effects&quot;: {
    &quot;list/fetch&quot;: false,
    &quot;user/fetchCurrent&quot;: true,
    &quot;rule/fetch&quot;: false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"global"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">"models"</span>: {
    <span class="hljs-attr">"list"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"user"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"rule"</span>: <span class="hljs-literal">false</span>
  },
  <span class="hljs-attr">"effects"</span>: {
    <span class="hljs-attr">"list/fetch"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"user/fetchCurrent"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"rule/fetch"</span>: <span class="hljs-literal">false</span>
  }
}</code></pre>
</blockquote>
<p>我们注意到在这里带上 <code>{count: 5}</code> 这个 payload 向 store 进行了一个类型为 <code>list/fetch</code> 的 dispatch，那我们到 <code>src/models/list.js</code> 中就可以找到具体的对应操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { queryFakeList } from '../services/api';

export default {
  namespace: 'list',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    /* ... */
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    /* ... */
  },
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { queryFakeList } <span class="hljs-keyword">from</span> <span class="hljs-string">'../services/api'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">namespace</span>: <span class="hljs-string">'list'</span>,

  <span class="hljs-attr">state</span>: {
    <span class="hljs-attr">list</span>: [],
  },

  <span class="hljs-attr">effects</span>: {
    *fetch({ payload }, { call, put }) {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">yield</span> call(queryFakeList, payload);
      <span class="hljs-keyword">yield</span> put({
        <span class="hljs-attr">type</span>: <span class="hljs-string">'queryList'</span>,
        <span class="hljs-attr">payload</span>: <span class="hljs-built_in">Array</span>.isArray(response) ? response : [],
      });
    },
    <span class="hljs-comment">/* ... */</span>
  },

  <span class="hljs-attr">reducers</span>: {
    queryList(state, action) {
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">list</span>: action.payload,
      };
    },
    <span class="hljs-comment">/* ... */</span>
  },
};
</code></pre>
<h2 id="articleHeader3">后端模拟数据</h2>
<p>通过上面的分析，我们可以看到 <code>list/fetch</code> 会造成带上 payload 的对 <code>src/services/api</code> 中 <code>queryFakeList</code> 的一次异步请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">queryFakeList</span>(<span class="hljs-params">params</span>) </span>{
  <span class="hljs-keyword">return</span> request(<span class="hljs-string">`/api/fake_list?<span class="hljs-subst">${stringify(params)}</span>`</span>);
}</code></pre>
<p>走到这一步的时候，后端交互开始产生了。我们退到根目录下的 <code>.roadhogrc.mock.js</code> 这个文件。Ant Design Pro 直接沿用了 <a href="https://github.com/sorrycc/roadhog" rel="nofollow noreferrer" target="_blank">roadhog</a> 中自带的 mock 功能，在这里我们简单搜索一下就能看到具体的 mock 转发配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { getActivities, getNotice, getFakeList } from './mock/api';

const proxy = {
  // ...,
  'GET /api/fake_list': getFakeList,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { getActivities, getNotice, getFakeList } <span class="hljs-keyword">from</span> <span class="hljs-string">'./mock/api'</span>;

<span class="hljs-keyword">const</span> proxy = {
  <span class="hljs-comment">// ...,</span>
  <span class="hljs-string">'GET /api/fake_list'</span>: getFakeList,
};</code></pre>
<p>那我们转进 <code>mock/api.js</code> 就可以看到 JSON 内容的生成了。</p>
<p>在开发环境中，前后端开发服务器常常部署在 localhost 的不同端口，这个问题常常困扰前后端分离范式的开发者。但有了 roadhog 之后，对上述的 <code>.roadhogrc.mock.js</code> 稍做修改就可以在前端的开发服务器上“构建”一个本地反代，轻松避免这个问题。</p>
<blockquote>
<h3 id="articleHeader4">本地开发中的跨域问题</h3>
<p>大多数浏览器要求 fetch 通过 HTTPS 进行，但对 localhost 有本地赦免，HTTP 下的 fetch 请求并不会遇到问题。（但是如果你给 localhost 做了 hosts 规则那本地开发赦免就不适用了。）</p>
<p>另外，对于本地，浏览器依旧强制执行 CORS 跨域检查，后端端口如果不设置 <code>Access-Control-Allow-Origin</code> 响应头依旧会遇到跨域安全问题。roadhog 提供的这个功能就良好解决了本地开发调试的跨域问题。</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// FROM https://github.com/sorrycc/roadhog#proxy
&quot;proxy&quot;: {
  &quot;/api&quot;: {
    &quot;target&quot;: &quot;http://localhost:8080&quot;,
    &quot;changeOrigin&quot;: true,
    &quot;pathRewrite&quot;: { &quot;^/api&quot; : &quot;&quot; }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// FROM https://github.com/sorrycc/roadhog#proxy</span>
<span class="hljs-string">"proxy"</span>: {
  <span class="hljs-string">"/api"</span>: {
    <span class="hljs-string">"target"</span>: <span class="hljs-string">"http://localhost:8080"</span>,
    <span class="hljs-string">"changeOrigin"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"pathRewrite"</span>: { <span class="hljs-string">"^/api"</span> : <span class="hljs-string">""</span> }
  }
}</code></pre>
<h2 id="articleHeader5">结语</h2>
<p><code>create-react-app</code> 预先配置了基本的工具链，让我们能很快上手纯前端的项目。而 Ant Design Pro 这个脚手架预先配置了更为完整的开发工具链，让我们能快速进行前后端交互的开发。上手的主要难点是理解庞大的工程结构，以及了解更为庞大的依赖链。</p>
<p>作者水平有限，如有纰漏请尽管指出。</p>
<hr>
<ol>
<li id="fn-1"> 关于 <code>dva</code> 中 Model 的概念，可以参见 <a href="https://ant.design/docs/react/practical-projects-cn#%E5%AE%9A%E4%B9%89-Model" rel="nofollow noreferrer" target="_blank">Andt Design 项目实践 — 定义 Model</a>，以及 <a href="https://github.com/dvajs/dva/issues/886" rel="nofollow noreferrer" target="_blank">关于dva实际应用的一些经验以及疑惑</a> <a href="#fnref-1" class="footnote-backref">↩</a>
</li>
<li id="fn-2"> 关于 <code>dva-loading</code>，可见 <a href="https://www.jianshu.com/p/61fe7a57fad4" rel="nofollow noreferrer" target="_blank">dva-loading 实践用法</a> <a href="#fnref-2" class="footnote-backref">↩</a>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ant Design Pro 上手备忘录

## 原文链接
[https://segmentfault.com/a/1190000013102730](https://segmentfault.com/a/1190000013102730)

