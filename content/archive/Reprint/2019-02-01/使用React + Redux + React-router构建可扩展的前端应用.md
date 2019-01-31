---
title: '使用React + Redux + React-router构建可扩展的前端应用' 
date: 2019-02-01 2:30:10
hidden: true
slug: 4h4i56jtmvo
categories: [reprint]
---

{{< raw >}}

                    
<p>现在是前端开发最好的时代，有太多很好的框架和工具帮你更好的实现复杂需求；同时又是最困难的时代，因为需要掌握太多的框架和工具。如何利用好各种框架来提高前端开发质量是大家都在探索的问题。本文就将介绍如何使用 React 及其相关技术，来进行实际前端项目的开发。因为主要介绍如何将技术用于实践，所以希望读者已经对相关概念已经有一定的了解。</p>
<p>本文最初来源于笔者在 <a href="http://www.stuq.org/" rel="nofollow noreferrer" target="_blank">StuQ</a> 的一次同名课程直播，现在加以整理成文，希望能对更多的人有所启发。为了固化这种实践方式，当时还开发了一个名为 <a href="https://github.com/supnate/rekit" rel="nofollow noreferrer" target="_blank">Rekit</a> 的工具，用于确保项目能够始终遵循这种实践方式。现在工具也获得进一步完善，大家也可以结合 Rekit 来理解文中提到的实践方案。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007265802" src="https://static.alili.tech/img/remote/1460000007265802" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>其实无论使用什么样的技术，一个理想中的 Web 项目大概都需要考虑以下几个方面：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007265803" src="https://static.alili.tech/img/remote/1460000007265803" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li><p><strong>易于开发</strong>：在功能开发时，无需关注复杂的技术架构，能够直观的写功能相关的代码。</p></li>
<li><p><strong>易于扩展</strong>：增加新功能时，无需对已有架构进行调整，新功能和已有功能具有很好的隔离性，并能很好的衔接。新功能的增加并不会带来显著的性能问题。</p></li>
<li><p><strong>易于维护</strong>：代码直观易读易理解。即使是新加入的开发成员，也能够很快的理解技术架构和代码逻辑。</p></li>
<li><p><strong>易于测试</strong>：代码单元性好，能够尽量使用纯函数。无需或很少需要 mock 即可完成单元测试。</p></li>
<li><p><strong>易于构建</strong>：代码和静态资源结构符合主流模式，能够使用标准的构建工具进行构建。无需自己实现复杂的构建逻辑。</p></li>
</ol>
<p>这些方面并不是互相独立，而是互相依赖互相制约。当某个方面做到极致，其它点就会受到影响。举例来说，写一个计数器功能，用jQuery一个页面内即可完成，但是易开发了，却不易扩展。因此我们通常都需要根据实际项目情况在这些点之间做一个权衡，达到适合项目的最佳状态。庆幸的是，现在的前端技术快速发展，不断出现的新技术帮助我们在各个方面都获得很大提升。</p>
<p>本文将要介绍的就是如何利用 React + Redux + React-router 来构建可扩展的前端应用。这里强调可扩展，因为传统前端实现方案通常在面对复杂应用时常常力不从心，代码结构容易混乱，性能问题难以解决。而可扩展则意味着能够从项目的初始阶段就具有了支持复杂项目的能力。首先我们看下涉及到的主要技术。</p>
<h3 id="articleHeader0">React</h3>
<p><a href="https://facebook.github.io/reactjs" rel="nofollow noreferrer" target="_blank">React</a> 相信大家已经非常熟悉，其组件化的思想和虚拟 DOM 的实现都是颠覆性的变革，从而让前端开发可以在新的方向上不断提升。无论是 <a href="https://github.com/gaearon/react-hot-loader" rel="nofollow noreferrer" target="_blank">React-hot-loader</a>，<a href="http://redux.js.org" rel="nofollow noreferrer" target="_blank">Redux</a> 还是 <a href="https://github.com/ReactTraining/react-router" rel="nofollow noreferrer" target="_blank">React-router</a>，都正是因为充分利用了 React 的这些特性，才能够提供如此强大的功能。笔者曾经写过<a href="http://www.infoq.com/cn/articles/react-art-of-simplity" rel="nofollow noreferrer" target="_blank">《深入浅出React》</a> 的系列文章，有需要的话可以进一步阅读。</p>
<h3 id="articleHeader1">Redux</h3>
<p><a href="http://redux.js.org" rel="nofollow noreferrer" target="_blank">Redux</a> 是 JavaScript 程序状态管理框架。尽管是一个通用型的框架，但是和 React 在一起能够更好的工作，因为当状态变化时，React 可以不用关心变化的细节，由虚拟 DOM 机制完成优化过的UI更新逻辑。</p>
<p>Redux 也被认为整个 React 生态圈最难掌握的技术之一。其 action，reducer 和各种中间件虽然将代码逻辑充分隔离，即常说的 separation of concerns，但在一定程度上也给开发带来了不便。这也是上面提到的，在易维护、易扩展、易测试上得到了提升，那么易开发则受到了影响。</p>
<h3 id="articleHeader2">React-router</h3>
<p>即使对于一个简单的应用，路由功能也是极其重要的。正如传统 Web 程序用页面来组织不同的功能模块，由不同的 URL 来区分和导航，单页应用使用 Router 来实现同样的功能，只是在前端进行渲染而不是服务器端。React 应用的“标准”路由方案就是使用 React-router。</p>
<p>路由功能不仅让用户更容易使用（例如刷新页面后维持 UI），也能够在开发时让我们思考如何更好组织功能单元，这也是功能复杂之后的必然需求。所以即使一开始的需求很简单，我们也应该引入 React-router 帮助我们以页面为单元进行功能的组织。</p>
<h3 id="articleHeader3">其它需要的技术</h3>
<p>正如前面提到的，开发前端应用需要很多周边技术，这进一步增加了前端开发的门槛，例如：</p>
<ul>
<li><p>使用 <a href="https://babeljs.io" rel="nofollow noreferrer" target="_blank">Babel</a> 支持 ES2016 和 JSX 语法；</p></li>
<li><p>使用 <a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">react-redux</a> 将 Redux 和 React 无缝结合；</p></li>
<li><p>使用 <a href="https://webpack.github.io/" rel="nofollow noreferrer" target="_blank">Webpack</a> 进行项目打包；</p></li>
<li><p>使用 <a href="http://webpack.github.io/docs/list-of-plugins.html#dllplugin" rel="nofollow noreferrer" target="_blank">webpack-dll-plugin</a> 优化打包性能；</p></li>
<li><p>使用 <a href="http://eslint.org" rel="nofollow noreferrer" target="_blank">ESLint</a> 进行语法检查；</p></li>
<li><p>使用 <a href="http://mochajs.org" rel="nofollow noreferrer" target="_blank">Mocha</a>，<a href="https://github.com/airbnb/enzyme" rel="nofollow noreferrer" target="_blank">Enzyme</a>，<a href="https://github.com/gotwarlost/istanbul" rel="nofollow noreferrer" target="_blank">Istanbul</a> 进行单元测试；</p></li>
<li><p>使用 <a href="http://lesscss.org" rel="nofollow noreferrer" target="_blank">Less</a>、<a href="https://sass-lang.com/" rel="nofollow noreferrer" target="_blank">Scss</a> 或其它进行 CSS 预编译。</p></li>
</ul>
<p>这些工具提高了前端开发的能力和效率，但是了解并配置它们却并非易事，而事实上这些工具和需要开发的功能并没有直接的关系。使用工具来自动化这些配置是必然的发展方向，正如现在开发一个 C++ 应用，Visual Studio 会帮你完成所有的配置并搭建合适的项目结构，让你专注于功能逻辑的开发。无论是自己实现，还是利用第三方，我们都应该为自己的项目创建这样的工具链。</p>
<p>简单介绍了相关技术，下面我们来看如何去构建可扩展的 Web 项目。</p>
<h3 id="articleHeader4">按功能（feature）来组织文件夹结构</h3>
<p>无论是 <a href="https://github.com/facebook/flux" rel="nofollow noreferrer" target="_blank">Flux</a> 还是 Redux，提供的官方示例都是以技术逻辑来组织文件夹的，例如，下面是 Redux 的 Todo 示例应用的文件夹结构：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007265804" src="https://static.alili.tech/img/remote/1460000007265804" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>虽然这种模式在技术上很清晰，在实际项目中却有很大的缺点：</p>
<ol>
<li><p><strong>难以扩展。</strong>当应用功能增加，规模变大时，一个 components 文件夹下可能会有几十上百个文件，组件间的关系极不直观。</p></li>
<li><p><strong>难以开发。</strong>在开发某个功能时，通常需要同时开发组件，action，reducer 和样式。把它们分布在不同文件夹下严重影响开发效率。尤其是项目复杂之后，不同文件的切换会消耗大量时间。</p></li>
</ol>
<p>因此，我们使用按功能来组织文件夹的方式，即功能相关的代码放到一个文件夹。例如，对于一个简单论坛程序，可能包含 user，topic，comment 这么几个核心功能。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007265805" src="https://static.alili.tech/img/remote/1460000007265805" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<p>每个功能文件夹下包含自己的页面，组件，样式，action 和 reducer。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007265806" src="https://static.alili.tech/img/remote/1460000007265806" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<p>这种文件夹结构在功能上而非技术上对代码逻辑进行区分，使得应用具有更好的扩展性，当增加新的功能时，只需增加一个新的文件夹即可；删除功能时同理。</p>
<h3 id="articleHeader5">使用页面（Page）的概念</h3>
<p>前面提到了路由是当今前端应用的不可缺少的部分之一，那么对应到组件级别，就是页面组件。因此我们在开发的过程中，需要明确定义页面的概念：</p>
<ol>
<li><p>一个页面拥有自己的 URL 地址。页面的展现和隐藏完全由 React-router 进行控制。当创建一个页面时，通常意味着在路由配置里增加一条新的规则。这和传统 Web 应用非常类似。</p></li>
<li><p>一个页面对应 Redux 的<a href="http://redux.js.org/docs/basics/UsageWithReact.html" rel="nofollow noreferrer" target="_blank">容器组件</a>的概念。页面首先是一个标准的 React 组件，其次它通过 <a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">react-redux</a> 封装成容器组件从而具备和 Redux 交互的能力。</p></li>
</ol>
<p>页面是导航的基本模块单元，同时也是同一功能相关 UI 的容器，这种符合传统 Web 开发方式的概念有助于让项目结构更容易理解。</p>
<h3 id="articleHeader6">每个 action 一个独立文件</h3>
<p>使用 Redux 来管理状态，就需要进行 action 和 reducer 的开发。在官方示例以及几乎所有的教程中，所有的 action 都放在一个文件，而所有的 reducer 则放在另外的文件。这种做法易于理解但是不具备很好的可扩展性，而且当项目复杂后，action 文件和 reducer 文件都会变得很冗长，不易开发和维护。</p>
<p>因此我们使用每个 action 一个独立文件的模式：每个 Redux 的 action 和对应的 reducer 放在同一个文件。使用这个做法的另一个原因是我们发现每次创建完 action 几乎都需要立刻创建 reducer 对其进行处理。把它们放在同一个文件有利于开发效率和维护。</p>
<p>以开发一个计数器组件为例：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007265807" src="https://static.alili.tech/img/remote/1460000007265807" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>为实现点击“+”号增加1的功能，我们首先需要创建一个类型为 "COUNTER_PLUS_ONE" 的 action ，之后就立刻需要创建对应的 Reducer 来更新 store 的数据。官方示例的做法是分别在 actions.js 和 reducer.js 中分别加入相应的逻辑。而使用每个 action 独立文件的做法，则是创建一个名为 counterPlusOne.js 的文件，加入如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {
  COUNTER_PLUS_ONE,
} from './constants';

export function counterPlusOne() {
  return {
    type: COUNTER_PLUS_ONE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COUNTER_PLUS_ONE:
      return {
        ...state,
        count: state.count + 1,
      };

    default:
      return state;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {
  COUNTER_PLUS_ONE,
} <span class="hljs-keyword">from</span> <span class="hljs-string">'./constants'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">counterPlusOne</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: COUNTER_PLUS_ONE,
  };
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reducer</span>(<span class="hljs-params">state, action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> COUNTER_PLUS_ONE:
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">count</span>: state.count + <span class="hljs-number">1</span>,
      };

    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state;
  }
}</code></pre>
<p>按我们的经验，大部分的 reducer 都会对应到相应的 action，很少需要跨功能全局使用。因此，将它们放入一个文件是完全合理的，有助于提高开发效率。需要注意的是，这里定义的 reducer 并不是标准的 Redux reducer，因为它没有初始状态（initial state）。它仅仅是被功能文件夹下的根 reducer 调用。注意这个 reducer 固定命名为 "reducer"，从而方便其被自动加载。</p>
<p>对于异步 action（通常是远程 API 请求），则需要对错误信息进行处理，因此在这个文件中有多个标准 action 存在。例如以保存文章为例，在 saveArticle.js 这个 action 文件中，同时存在 saveArticle 和 dismissSaveArticleError 这两个 action。</p>
<h3 id="articleHeader7">如何处理跨功能的 action？</h3>
<p>尽管不是很常见，但是有些 action 是可能被多个 reducer 处理的。例如，对于站内聊天功能，当收到一条新消息时：</p>
<ol>
<li><p>如果聊天框开着，那么直接显示新消息。</p></li>
<li><p>否则，显示一条通知提示有新的消息。</p></li>
</ol>
<p>可见，NEW_MESSAGE 这个 action 类型需要被不同的 reducer 处理，从而能够在不同的 UI 组件做不同的展现。为了处理这类 action，每个功能文件夹下都有一个 reducer.js 文件，在里面可以处理跨功能的 action。</p>
<p>虽然不同 action 的 reducer 分布在不同的文件中，但它们和功能相关的 root reducer 共同操作同一个状态，即同一个 store 分支。因此 feature/reducer.js 具有如下的代码结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import initialState from './initialState';
import { reducer as counterPlusOne } from './counterPlusOne';
import { reducer as counterMinusOne } from './counterMinusOne';
import { reducer as resetCounter } from './resetCounter';

const reducers = [
  counterPlusOne,
  counterMinusOne,
  resetCounter,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Put global reducers here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> initialState <span class="hljs-keyword">from</span> <span class="hljs-string">'./initialState'</span>;
<span class="hljs-keyword">import</span> { reducer <span class="hljs-keyword">as</span> counterPlusOne } <span class="hljs-keyword">from</span> <span class="hljs-string">'./counterPlusOne'</span>;
<span class="hljs-keyword">import</span> { reducer <span class="hljs-keyword">as</span> counterMinusOne } <span class="hljs-keyword">from</span> <span class="hljs-string">'./counterMinusOne'</span>;
<span class="hljs-keyword">import</span> { reducer <span class="hljs-keyword">as</span> resetCounter } <span class="hljs-keyword">from</span> <span class="hljs-string">'./resetCounter'</span>;

<span class="hljs-keyword">const</span> reducers = [
  counterPlusOne,
  counterMinusOne,
  resetCounter,
];

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reducer</span>(<span class="hljs-params">state = initialState, action</span>) </span>{
  <span class="hljs-keyword">let</span> newState;
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-comment">// Put global reducers here</span>
    <span class="hljs-keyword">default</span>:
      newState = state;
      <span class="hljs-keyword">break</span>;
  }
  <span class="hljs-keyword">return</span> reducers.reduce(<span class="hljs-function">(<span class="hljs-params">s, r</span>) =&gt;</span> r(s, action), newState);
}
</code></pre>
<p>它负责引入不同 action 的 reducer，当有 action 过来时，遍历所有的 reducer 并结合需要的全局 reducer 来实现对 store 的更新。所有功能相关的 root reducer 最终被组合到全局的 Redux root reducer 从而保证全局只有一个 store 的存在。</p>
<p>需要注意的是，每当创建一个新的 action 时，都需要在这个文件中注册。因为其模式非常固定，我们完全可以使用工具来自动注册相应的代码。Rekit 可以帮助做到这一点：当创建 action 时，它会自动在 reducer.js 中加入相应的代码，既减少了工作量，又可以避免出错。</p>
<h3 id="articleHeader8">使用单文件 action 的好处</h3>
<p>使用这种方式，可以带来很多好处，比如：</p>
<ol>
<li><p><strong>易于开发</strong>：当创建 action 时，无需在多个文件中跳转；</p></li>
<li><p><strong>易于维护</strong>：因为每个 action 在单独的文件，因此每个文件都很短小，通过文件名就可以定位到相应的功能逻辑；</p></li>
<li><p><strong>易于测试</strong>：每个 action 都可以使用一个独立的测试文件进行覆盖，测试文件中也是同时包含对 action 和 reducer 的测试；</p></li>
<li><p><strong>易于工具化</strong>：因为使用 Redux 的应用具有较为复杂的技术结构，我们可以使用工具来自动化一些逻辑。现在我们无需进行语法分析就可以自动生成代码。</p></li>
<li><p><strong>易于静态分析</strong>：全局的 action 和 reducer 通常意味着模块间的依赖。这时我们只要分析功能文件夹下的 reducer.js，即可以找到所有这些依赖。</p></li>
</ol>
<h3 id="articleHeader9">React-router 的规则定义</h3>
<p>通常来说，我们会通过一个配置文件定义所有的路由规则。同样的，这种方式不具有扩展性，当项目变复杂之后，规则定义表会变得冗长而复杂。既然我们已经以功能为单位进行文件夹的组织，我们同样可以把功能相关的路由规则也放到对应文件夹下。因此，我们可以利用 React-router 的 JavaScript API 进行路由规则的定义，而不是用常见的 JSX 语法。</p>
<p>例如，对于一个简单论坛程序，主题功能对应的路由定义就放在 features/topic/route.js 中，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {
  EditPage,
  ListPage,
  ViewPage,
} from './index';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: '', component: ListPage, name: 'Topic List', isIndex: true },
    { path: 'topic/add', component: EditPage, name: 'New Topic' },
    { path: 'topic/:topicId', component: ViewPage },
  ],
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {
  EditPage,
  ListPage,
  ViewPage,
} <span class="hljs-keyword">from</span> <span class="hljs-string">'./index'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">path</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">childRoutes</span>: [
    { <span class="hljs-attr">path</span>: <span class="hljs-string">''</span>, <span class="hljs-attr">component</span>: ListPage, <span class="hljs-attr">name</span>: <span class="hljs-string">'Topic List'</span>, <span class="hljs-attr">isIndex</span>: <span class="hljs-literal">true</span> },
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'topic/add'</span>, <span class="hljs-attr">component</span>: EditPage, <span class="hljs-attr">name</span>: <span class="hljs-string">'New Topic'</span> },
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'topic/:topicId'</span>, <span class="hljs-attr">component</span>: ViewPage },
  ],
};</code></pre>
<p>所有功能相关的路由定义都被全局的根路由配置自动加载，因此，路由加载器具有如下的代码模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import topicRoute from '../features/topic/route';
import commentRoute from '../features/comment/route';

const routes = [{
  path: '/rekit-example',
  component: App,
  childRoutes: [
    topicRoute,
    commentRoute,
    { path: '*', name: 'Page not found', component: PageNotFound },
  ],
}];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> topicRoute <span class="hljs-keyword">from</span> <span class="hljs-string">'../features/topic/route'</span>;
<span class="hljs-keyword">import</span> commentRoute <span class="hljs-keyword">from</span> <span class="hljs-string">'../features/comment/route'</span>;

<span class="hljs-keyword">const</span> routes = [{
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/rekit-example'</span>,
  <span class="hljs-attr">component</span>: App,
  <span class="hljs-attr">childRoutes</span>: [
    topicRoute,
    commentRoute,
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'Page not found'</span>, <span class="hljs-attr">component</span>: PageNotFound },
  ],
}];</code></pre>
<p>可见，这个全局路由加载器负责加载所有 feature 的路由规则。类似 root reducer，这里的代码模式也是非常固定的，因此可以借助工具来维护这个文件。当使用 Rekit 创建页面时，就会自动在此加入路由规则。</p>
<h3 id="articleHeader10">使用工具辅助开发</h3>
<p>由上面的介绍可以看到，开发一个 React 程序并不容易，即使一个简单的功能，也需要大量的琐碎的，但却非常重要的代码来确保一个良好的架构，从而让应用易于扩展和维护，虽然这些周边代码和你需要的功能并没有直接关系。</p>
<p>例如，对于一个论坛程序，需要一个列表界面展示最近发表的主题，为了做这样一个页面，我们通常都需要完成以下步骤：</p>
<ol>
<li><p>创建一个名为 TopicList 的 React 组件；</p></li>
<li><p>为 TopicList 定义一条路由规则；</p></li>
<li><p>创建一个名为 TopicList.css 的样式文件，并在合适的位置引入；</p></li>
<li><p>使用 react-redux 将 TopicList 组件封装成容器组件，从而使其可以使用 Redux store；</p></li>
<li><p>创建4种不同的 action 类型：FETCH_BEGIN,&nbsp;FETCH_PENDING,&nbsp;FETCH_SUCCESS, FETCH_FAILURE，通常定义在 constants.js；</p></li>
<li><p>创建两个 action：fetchTopicList 和 dismissFetchTopicListError；</p></li>
<li><p>在 action 文件中引入类型常量；</p></li>
<li><p>在 reducer 中创建4个 swtich case 来处理不同的 action 类型；</p></li>
<li><p>在 reducer 文件中引入类型常量；</p></li>
<li><p>创建组件的测试文件及其代码结构；</p></li>
<li><p>创建 action 的测试文件及其代码结构；</p></li>
<li><p>创建 reducer 的测试文件及其代码结构。</p></li>
</ol>
<p>天！在正式开始写论坛逻辑的第一行代码之前，竟然需要做这么多琐碎的事情。当这样的事情手动重复了多次之后，我们觉得应该有工具来自动化这样的事情。为此创建了 Rekit 工具包，可以帮助自动生成这些文件结构和代码。不同于其它的代码生成器，Rekit 基于一个相对固定的文件和代码结构，因此可以做更多的事情，例如：</p>
<ol>
<li><p>它知道在哪里以及如何定义路由规则；</p></li>
<li><p>它知道如何生成 action 类型常量；</p></li>
<li><p>它知道如何根据 action 名字来生成类型常量；</p></li>
<li><p>它知道如何根据 action 类型来创建 reducer；</p></li>
<li><p>它知道如何创建有意义的测试案例。</p></li>
</ol>
<p>借助于精心维护的工具，我们可以不必关注技术细节，而只需专注于功能相关的代码，提高了开发效率。不仅如此，工具也可以减少错误，并在代码结构，命名，配置等方面维持高度一致性，让代码更加容易理解和维护。</p>
<p>Rekit 针对本文提出的 React + Redux 开发实践提供了一套工具集，其本身也是可扩展的。你完全可以根据需要更改代码模板，或者提供自己的工具，针对自己的项目特性提供便捷的工具来提高开发效率。</p>
<h3 id="articleHeader11">小结</h3>
<p>本文主要介绍了如何使用 React，Redux 以及 React-router 来开发可扩展的 Web 应用。其核心思路有两个，一是以功能（feature）为单位组件文件夹结构；二是采用每个 action 单独文件的模式。这样能够让代码更加模块化，增加和删除功能都不会对其它模块产生太大影响。同时使用 React-router 来帮助实现页面的概念，让单页应用（SPA）也拥有传统 Web 应用的 URL 导航功能，进一步降低了功能模块间的耦合行，让应用结构更加清晰直观。</p>
<p>为了支持这样的实践，文中还介绍了 Rekit 工具集，不仅可以帮助创建和配置初始的项目模板，而且还提供了大量实用的工具帮助以文中提到的方式自动生成技术结构，提高了开发效率。更多的工具介绍可以访问其官网：<a href="http://rekit.js.org" rel="nofollow noreferrer" target="_blank">http://rekit.js.org</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用React + Redux + React-router构建可扩展的前端应用

## 原文链接
[https://segmentfault.com/a/1190000007265799](https://segmentfault.com/a/1190000007265799)

