---
title: 'React结合TypeScript和Mobx初体验' 
date: 2018-11-29 9:34:56
hidden: true
slug: gxw9g6fqav
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVba6Ts?w=1218&amp;h=525" src="https://static.alili.tech/img/bVba6Ts?w=1218&amp;h=525" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">为什么要使用TypeScript</h2>
<h3 id="articleHeader1">侦测错误</h3>
<p>通过静态类型检测可以尽早检测出程序中隐藏的的逻辑错误，对于JavaScript动态的弱类型语言，虽然灵活性高，但是对于初学者来说，如果不熟悉JavaScript内部的语言机制，很容易造成隐藏的事故。但是通过TypeScript的静态类型检测可以规避这些问题，因为其能够约束变量产生的类型。结合IDE编辑器可以推导变量对应的类型以及内部的结构，提高代码的健壮性和可维护性。</p>
<h3 id="articleHeader2">抽象</h3>
<p>类型系统能够强化规范编程，TypeScript提供定义接口。在开发大型复杂的应用软件时十分重要，一个系统模块可以抽象的看做一个TypeScript定义的接口。让设计脱离实现，最终体现出一种 IDL（接口定义语言，Interface Define Language），让程序设计回归本质。</p>
<h3 id="articleHeader3">文档</h3>
<p>TypeScript可以自动根据类型标注生成文档，对于简单的功能实现都不需要编写注释。</p>
<h2 id="articleHeader4">为什么要使用Mobx</h2>
<h3 id="articleHeader5">MobX 和 Redux 的比较</h3>
<p>先要明白 mobx 和 redux 的定位是不同的。redux 管理的是 (STORE -&gt; VIEW -&gt; ACTION) 的整个闭环，而 mobx 只关心 STORE -&gt; VIEW 的部分。</p>
<p>Redux优缺点：</p>
<ul>
<li>数据流流动很自然，因为任何 dispatch 都会触发广播，依据对象引用是否变化来控制更新粒度。</li>
<li>通过充分利用时间回溯的特征，可以增强业务的可预测性与错误定位能力。</li>
<li>时间回溯代价高，因为每次都要更新引用，除非增加代码复杂度，或使用 immutable。</li>
<li>时间回溯的另一个代价是 action 与 reducer 完全脱节，原因是可回溯必然不能保证引用关系。</li>
<li>引入中间件，解决异步带来的副作用，业务逻辑或多或少参杂着 magic。</li>
<li>灵活利用中间件，可以通过约定完成许多复杂的工作。</li>
<li>对 typescript 支持困难。</li>
</ul>
<p>Mobx优缺点：</p>
<ul>
<li>数据流流动不自然，只有用到的数据才会引发绑定，局部精确更新，但避免了粒度控制烦恼。</li>
<li>没有时间回溯能力，因为数据只有一份引用。自始至终一份引用，不需要 immutable，也没有复制对象的额外开销。</li>
<li>数据流动由函数调用一气呵成，便于调试。</li>
<li>业务开发不是脑力活，而是体力活，少一些 magic，多一些效率。</li>
<li>由于没有 magic，所以没有中间件机制，没法通过 magic 加快工作效率（这里 magic 是指 action 分发到 reducer 的过程）。</li>
<li>完美支持 typescript。</li>
</ul>
<p>SO: 前端数据流不太复杂的情况，使用 Mobx，因为更加清晰，也便于维护；如果前端数据流极度复杂，建议谨慎使用 Redux，通过中间件减缓巨大业务复杂度</p>
<h2 id="articleHeader6">使用Create-React-App来建立TypeScript的环境</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g create-react-app
create-react-app tinylog-ui --scripts-version=react-scripts-ts
cd tinylog-ui/
npm start
npm run eject" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm i -g create-react-app
create-react-app tinylog-ui --scripts-version=react-scripts-ts
<span class="hljs-built_in">cd</span> tinylog-ui/
npm start
npm run eject</code></pre>
<p>TPS: 最后一个命令使用eject将所有内建的配置暴露出来</p>
<p>通过create-react-app可以很方便地对整个项目完成环境初始化，如果愿意折腾TypeScript和webpack的环境可以试试，这里忽略webpack和TypeScript的环境搭建过程，而是使用create-react-app来实现环境搭建。</p>
<h2 id="articleHeader7">加入React-Router</h2>
<p>单页应用怎么可以没有前端路由呢，所以我们要加入React-Rotuer, 这里使用的React-Router的版本是v4.2.0</p>
<h3 id="articleHeader8">路由配置使用姿势</h3>
<p>对于React-Router，这里使用到的模块有Router, Route, Switch</p>
<blockquote>React Router 是建立在 history 之上的。 简而言之，一个 history 知道如何去监听浏览器地址栏的变化， 并解析这个 URL 转化为 location 对象， 然后 router 使用它匹配到路由，最后正确地渲染对应的组件。</blockquote>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import registerServiceWorker from './registerServiceWorker';
import { Root } from './containers/Root';
import './index.css';
import Container from './containers/Container';
import SignIn from './containers/Auth/signIn';
import SignUp from './containers/Auth/signUp';

const history = createBrowserHistory();

ReactDOM.render(
  <Root>
    <Router history={history}>
      <Switch>
        <Route
          path=&quot;/signIn&quot;
          component={SignIn}
        />
        <Route
          path=&quot;/signUp&quot;
          component={SignUp}
        />
        <Route
          path=&quot;/&quot;
          component={Container}
        />
      </Switch>
    </Router>
  </Root>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="tsx"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { Router, Route, Switch } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> { createBrowserHistory } <span class="hljs-keyword">from</span> <span class="hljs-string">'history'</span>;
<span class="hljs-keyword">import</span> registerServiceWorker <span class="hljs-keyword">from</span> <span class="hljs-string">'./registerServiceWorker'</span>;
<span class="hljs-keyword">import</span> { Root } <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Root'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./index.css'</span>;
<span class="hljs-keyword">import</span> Container <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Container'</span>;
<span class="hljs-keyword">import</span> SignIn <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Auth/signIn'</span>;
<span class="hljs-keyword">import</span> SignUp <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Auth/signUp'</span>;

const history = createBrowserHistory();

ReactDOM.render(
  &lt;Root&gt;
    &lt;Router history={history}&gt;
      &lt;Switch&gt;
        &lt;Route
          path=<span class="hljs-string">"/signIn"</span>
          component={SignIn}
        /&gt;
        &lt;Route
          path=<span class="hljs-string">"/signUp"</span>
          component={SignUp}
        /&gt;
        &lt;Route
          path=<span class="hljs-string">"/"</span>
          component={Container}
        /&gt;
      &lt;/Switch&gt;
    &lt;/Router&gt;
  &lt;/Root&gt;,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>) <span class="hljs-keyword">as</span> HTMLElement
);
registerServiceWorker();
</code></pre>
<h3 id="articleHeader9">页面的编写</h3>
<p>这里描述一写Container这个组件的编写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as React from 'react';
import Header from '../../layout/Header';
import { IAuth } from '../../interfaces';
import { Route, Switch } from 'react-router';
import App from '../App';
import Website from '../Website';

// 这部分是坑点，一开始不知道配置，后发现react-rotuer的4.0版本下需要配置prop的接口
interface Container extends RouteComponentProps<{}> {
}

class Container extends React.Component<Container, {}> {
  render () {
    return (
      <div>
        <Header {...this.props} />
        <Switch>
          <Route path=&quot;/website&quot; component={Website}/>
          <Route  path=&quot;/&quot; component={App}/>
        </Switch>
      </div>
    )
  }
}

export default Container;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="tsx"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'../../layout/Header'</span>;
<span class="hljs-keyword">import</span> { IAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">'../../interfaces'</span>;
<span class="hljs-keyword">import</span> { Route, Switch } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'../App'</span>;
<span class="hljs-keyword">import</span> Website <span class="hljs-keyword">from</span> <span class="hljs-string">'../Website'</span>;

<span class="hljs-regexp">//</span> 这部分是坑点，一开始不知道配置，后发现react-rotuer的<span class="hljs-number">4.0</span>版本下需要配置prop的接口
interface Container extends RouteComponentProps&lt;{}&gt; {
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Container</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span>&lt;<span class="hljs-title">Container</span>, {}&gt; {</span>
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;Header {...<span class="hljs-keyword">this</span>.props} /&gt;
        &lt;Switch&gt;
          &lt;Route path=<span class="hljs-string">"/website"</span> component={Website}/&gt;
          &lt;Route  path=<span class="hljs-string">"/"</span> component={App}/&gt;
        &lt;/Switch&gt;
      &lt;/div&gt;
    )
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Container;</code></pre>
<p>这样，当我们访问url为'/'的时候，默认会进入Container，其中Container里面是一层子页面，会匹配url，如果url为'/website', 则进入Website页面，若为'/',则进入App页面。</p>
<p>具体关于React-Router的使用请阅读<a href="https://reacttraining.com/react-router/" rel="nofollow noreferrer" target="_blank">React-Router文档</a></p>
<h2 id="articleHeader10">加入Mobx</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i mobx react-mobx mobx-react-router -S " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm i mobx react-mobx mobx-react-router -S </code></pre>
<h3 id="articleHeader11">重新修改index.tsx的入口配置</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
// 定义需要使用到的store来进行数据状态的管理
import { 
  TokenStore, 
  AuthStore, 
  HostStore, 
  OverViewStore,
  AssetsStore,
  CommonDataStore,
  PageStore,
  RealTimeStore  
} from './stores';
import registerServiceWorker from './registerServiceWorker';
import { Root } from './containers/Root';
import './index.css';
import Container from './containers/Container';
import SignIn from './containers/Auth/signIn';
import SignUp from './containers/Auth/signUp';
// 引入Echarts
import './macarons';
import 'echarts/map/js/world';

// 开启mobx的严格模式，规范数据修改操作只能在action中进行
useStrict(true);

const browserHistory = createBrowserHistory();
const routerStore =  new RouterStore();
// 同步路由与mobx的数据状态
const history = syncHistoryWithStore(browserHistory, routerStore);
const rootStore = {
  token: new TokenStore(),
  auth: new AuthStore(),
  host: new HostStore(),
  overview: new OverViewStore(),
  assets: new AssetsStore(),
  commmon: new CommonDataStore(),
  page: new PageStore(),
  realtime: new RealTimeStore(),
  router: routerStore
};

ReactDOM.render(
  <Provider {...rootStore}>
    <Root>
      <Router history={history}>
        <Switch>
          <Route
            path=&quot;/signIn&quot;
            component={SignIn}
          />
          <Route
            path=&quot;/signUp&quot;
            component={SignUp}
          />
          <Route
            path=&quot;/&quot;
            component={Container}
          />
        </Switch>
      </Router>
    </Root>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="tsx"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { Router, Route, Switch } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> { createBrowserHistory } <span class="hljs-keyword">from</span> <span class="hljs-string">'history'</span>;
<span class="hljs-keyword">import</span> { useStrict } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>;
<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>;
<span class="hljs-keyword">import</span> { RouterStore, syncHistoryWithStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react-router'</span>;
<span class="hljs-comment">// 定义需要使用到的store来进行数据状态的管理</span>
<span class="hljs-keyword">import</span> { 
  TokenStore, 
  AuthStore, 
  HostStore, 
  OverViewStore,
  AssetsStore,
  CommonDataStore,
  PageStore,
  RealTimeStore  
} <span class="hljs-keyword">from</span> <span class="hljs-string">'./stores'</span>;
<span class="hljs-keyword">import</span> registerServiceWorker <span class="hljs-keyword">from</span> <span class="hljs-string">'./registerServiceWorker'</span>;
<span class="hljs-keyword">import</span> { Root } <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Root'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./index.css'</span>;
<span class="hljs-keyword">import</span> Container <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Container'</span>;
<span class="hljs-keyword">import</span> SignIn <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Auth/signIn'</span>;
<span class="hljs-keyword">import</span> SignUp <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Auth/signUp'</span>;
<span class="hljs-comment">// 引入Echarts</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./macarons'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'echarts/map/js/world'</span>;

<span class="hljs-comment">// 开启mobx的严格模式，规范数据修改操作只能在action中进行</span>
useStrict(<span class="hljs-literal">true</span>);

<span class="hljs-keyword">const</span> browserHistory = createBrowserHistory();
<span class="hljs-keyword">const</span> routerStore =  <span class="hljs-keyword">new</span> RouterStore();
<span class="hljs-comment">// 同步路由与mobx的数据状态</span>
<span class="hljs-keyword">const</span> history = syncHistoryWithStore(browserHistory, routerStore);
<span class="hljs-keyword">const</span> rootStore = {
  <span class="hljs-attr">token</span>: <span class="hljs-keyword">new</span> TokenStore(),
  <span class="hljs-attr">auth</span>: <span class="hljs-keyword">new</span> AuthStore(),
  <span class="hljs-attr">host</span>: <span class="hljs-keyword">new</span> HostStore(),
  <span class="hljs-attr">overview</span>: <span class="hljs-keyword">new</span> OverViewStore(),
  <span class="hljs-attr">assets</span>: <span class="hljs-keyword">new</span> AssetsStore(),
  <span class="hljs-attr">commmon</span>: <span class="hljs-keyword">new</span> CommonDataStore(),
  <span class="hljs-attr">page</span>: <span class="hljs-keyword">new</span> PageStore(),
  <span class="hljs-attr">realtime</span>: <span class="hljs-keyword">new</span> RealTimeStore(),
  <span class="hljs-attr">router</span>: routerStore
};

ReactDOM.render(
  &lt;Provider {...rootStore}&gt;
    &lt;Root&gt;
      &lt;Router history={history}&gt;
        &lt;Switch&gt;
          &lt;Route
            path="/signIn"
            component={SignIn}
          /&gt;
          &lt;Route
            path="/signUp"
            component={SignUp}
          /&gt;
          &lt;Route
            path="/"
            component={Container}
          /&gt;
        &lt;/Switch&gt;
      &lt;/Router&gt;
    &lt;/Root&gt;
  &lt;/Provider&gt;,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();</code></pre>
<h3 id="articleHeader12">Container容器的修改</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as React from 'react';
import Header from '../../layout/Header';
import { IAuth } from '../../interfaces';
import { Route, Switch } from 'react-router';
// 使用inject和observer来进行数据监听和数据依赖声明
import { inject, observer } from 'mobx-react';
import App from '../App';
import Website from '../Website';

interface Container extends IAuth {
}

@inject('router', 'auth')
@observer
class Container extends React.Component<Container, {}> {
  render () {
    return (
      <div>
        <Header {...this.props} />
        <Switch>
          <Route path=&quot;/website&quot; component={Website}/>
          <Route  path=&quot;/&quot; component={App}/>
        </Switch>
      </div>
    )
  }
}

export default Container;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="tsx"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'../../layout/Header'</span>;
<span class="hljs-keyword">import</span> { IAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">'../../interfaces'</span>;
<span class="hljs-keyword">import</span> { Route, Switch } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-regexp">//</span> 使用inject和observer来进行数据监听和数据依赖声明
<span class="hljs-keyword">import</span> { inject, observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'../App'</span>;
<span class="hljs-keyword">import</span> Website <span class="hljs-keyword">from</span> <span class="hljs-string">'../Website'</span>;

interface Container extends IAuth {
}

@inject(<span class="hljs-string">'router'</span>, <span class="hljs-string">'auth'</span>)
@observer
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Container</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span>&lt;<span class="hljs-title">Container</span>, {}&gt; {</span>
  render () {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;Header {...<span class="hljs-keyword">this</span>.props} /&gt;
        &lt;Switch&gt;
          &lt;Route path=<span class="hljs-string">"/website"</span> component={Website}/&gt;
          &lt;Route  path=<span class="hljs-string">"/"</span> component={App}/&gt;
        &lt;/Switch&gt;
      &lt;/div&gt;
    )
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Container;</code></pre>
<blockquote>@observable 可以在实例字段和属性 getter 上使用。 对于对象的哪部分需要成为可观察的，@observable 提供了细粒度的控制。<p>@inject 相当于Provider 的高阶组件。可以用来从 React 的context中挑选 store 作为 prop 传递给目标组件</p>
</blockquote>
<h3 id="articleHeader13">组件的接口定义</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { RouteComponentProps } from 'react-router';
import {
  RouterStore,
  AuthStore
} from '../stores';

export interface IBase extends RouteComponentProps<{}> {
  router: RouterStore;
}

export interface IAuth extends IBase {
  auth: AuthStore;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">import</span> { RouteComponentProps } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> {
  RouterStore,
  AuthStore
} <span class="hljs-keyword">from</span> <span class="hljs-string">'../stores'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> IBase <span class="hljs-keyword">extends</span> RouteComponentProps&lt;{}&gt; {
  router: RouterStore;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> IAuth <span class="hljs-keyword">extends</span> IBase {
  auth: AuthStore;
}
</code></pre>
<h3 id="articleHeader14">Store的配置</h3>
<p>先看一下RouterStore:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { History } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';

// 路由状态同步
class RouterStore extends BaseRouterStore {
  public history;
  constructor(history?: History) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }
}

export default RouterStore;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">import</span> { History } <span class="hljs-keyword">from</span> <span class="hljs-string">'history'</span>;
<span class="hljs-keyword">import</span> { RouterStore <span class="hljs-keyword">as</span> BaseRouterStore, syncHistoryWithStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react-router'</span>;

<span class="hljs-comment">// 路由状态同步</span>
<span class="hljs-keyword">class</span> RouterStore <span class="hljs-keyword">extends</span> BaseRouterStore {
  <span class="hljs-keyword">public</span> history;
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params">history?: History</span>) {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">if</span> (history) {
      <span class="hljs-keyword">this</span>.history = syncHistoryWithStore(history, <span class="hljs-keyword">this</span>);
    }
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> RouterStore;</code></pre>
<p>然后是AuthStore:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { ISignIn, ISignUp } from './../interfaces/index';
import { observable, action } from 'mobx';
import api from '../api/auth'; 
import { IUser } from '../models';

// 登录注册状态
class AuthStore {
  @observable token;
  @observable id;
  @observable email;
  constructor () {
    this.id = '';
    this.token = '';
    this.email = '';
  }
  setLocalStorage ({ id, token, email }: IUser) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  }
  clearStorage () {
    localStorage.clear();
  }
  @action async signIn (data: ISignIn) {
    try {
      const { data: res } = await api.signIn(data);
      this.id = res.data.id;
      this.token = res.data.token;
      this.email = res.data.email;
      this.setLocalStorage({
        id: this.id,
        token: this.token,
        email: this.email
      });
      return res;
    } catch (error) {
      return error;
    }
  }
  
  @action async signUp (data: ISignUp) {
    try {
      const { data: res } = await api.signUp(data);
      this.id = res.data.id;
      this.token = res.data.token;
      this.email = res.data.email;
      this.setLocalStorage({
        id: this.id,
        token: this.token,
        email: this.email
      });
      return res;
    } catch (error) {
      return error;
    }
  }

  @action signOut () {
    this.id = '';
    this.token = '';
    this.email = '';
    this.clearStorage()
  }
}

export default AuthStore;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">import</span> { ISignIn, ISignUp } <span class="hljs-keyword">from</span> <span class="hljs-string">'./../interfaces/index'</span>;
<span class="hljs-keyword">import</span> { observable, action } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>;
<span class="hljs-keyword">import</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">'../api/auth'</span>; 
<span class="hljs-keyword">import</span> { IUser } <span class="hljs-keyword">from</span> <span class="hljs-string">'../models'</span>;

<span class="hljs-comment">// 登录注册状态</span>
<span class="hljs-keyword">class</span> AuthStore {
  <span class="hljs-meta">@observable</span> token;
  <span class="hljs-meta">@observable</span> id;
  <span class="hljs-meta">@observable</span> email;
  <span class="hljs-keyword">constructor</span> (<span class="hljs-params"></span>) {
    <span class="hljs-keyword">this</span>.id = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">this</span>.token = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">this</span>.email = <span class="hljs-string">''</span>;
  }
  setLocalStorage ({ id, token, email }: IUser) {
    localStorage.setItem(<span class="hljs-string">'id'</span>, id);
    localStorage.setItem(<span class="hljs-string">'token'</span>, token);
    localStorage.setItem(<span class="hljs-string">'email'</span>, email);
  }
  clearStorage () {
    localStorage.clear();
  }
  <span class="hljs-meta">@action</span> <span class="hljs-keyword">async</span> signIn (data: ISignIn) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> { data: res } = <span class="hljs-keyword">await</span> api.signIn(data);
      <span class="hljs-keyword">this</span>.id = res.data.id;
      <span class="hljs-keyword">this</span>.token = res.data.token;
      <span class="hljs-keyword">this</span>.email = res.data.email;
      <span class="hljs-keyword">this</span>.setLocalStorage({
        id: <span class="hljs-keyword">this</span>.id,
        token: <span class="hljs-keyword">this</span>.token,
        email: <span class="hljs-keyword">this</span>.email
      });
      <span class="hljs-keyword">return</span> res;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> error;
    }
  }
  
  <span class="hljs-meta">@action</span> <span class="hljs-keyword">async</span> signUp (data: ISignUp) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> { data: res } = <span class="hljs-keyword">await</span> api.signUp(data);
      <span class="hljs-keyword">this</span>.id = res.data.id;
      <span class="hljs-keyword">this</span>.token = res.data.token;
      <span class="hljs-keyword">this</span>.email = res.data.email;
      <span class="hljs-keyword">this</span>.setLocalStorage({
        id: <span class="hljs-keyword">this</span>.id,
        token: <span class="hljs-keyword">this</span>.token,
        email: <span class="hljs-keyword">this</span>.email
      });
      <span class="hljs-keyword">return</span> res;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> error;
    }
  }

  <span class="hljs-meta">@action</span> signOut () {
    <span class="hljs-keyword">this</span>.id = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">this</span>.token = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">this</span>.email = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">this</span>.clearStorage()
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> AuthStore;</code></pre>
<p>Auth是用于网站的登录注册事件以及对应的Token的数据状态保存，登录注册事件的接口请求等操作。</p>
<p>具体的有关Mobx的用法请阅读<a href="https://cn.mobx.js.org/" rel="nofollow noreferrer" target="_blank">Mobx文档</a></p>
<h2 id="articleHeader15">目录结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app
├── api             后端提供的接口数据请求
├── components      编写的可复用组件
├── config          侧边栏以及导航栏配置
├── constants       常量编写
├── interfaces      接口编写
├── layout          布局外框
├── stores          mobx的数据状态管理
├── index.css       全局样式
├── index.tsx       页面入口
├── reset.css       浏览器重置样式
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>app
├── api             后端提供的接口数据请求
├── components      编写的可复用组件
├── config          侧边栏以及导航栏配置
├── constants       常量编写
├── interfaces      接口编写
├── layout          布局外框
├── stores          mobx的数据状态管理
├── index<span class="hljs-selector-class">.css</span>       全局样式
├── index<span class="hljs-selector-class">.tsx</span>       页面入口
├── reset<span class="hljs-selector-class">.css</span>       浏览器重置样式
</code></pre>
<p>本项目使用了Ant-Design来作为依赖的组件库，具体怎么使用以及配置请参考<a href="https://ant.design/docs/react/use-in-typescript-cn" rel="nofollow noreferrer" target="_blank">Ant-Design</a></p>
<p>到这里其实以及完成对React下TypeScript结合React-Router和Mobx的配置。具体的业务模块如何编写有兴趣可以参阅项目<a href="https://github.com/tinylog/tinylog-ui" rel="nofollow noreferrer" target="_blank">tinylog-ui</a></p>
<p>个人表达能力有限，无法描述得太清晰，请见谅！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React结合TypeScript和Mobx初体验

## 原文链接
[https://segmentfault.com/a/1190000015002112](https://segmentfault.com/a/1190000015002112)

