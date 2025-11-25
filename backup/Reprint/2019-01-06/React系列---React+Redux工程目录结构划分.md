---
title: 'React系列---React+Redux工程目录结构划分' 
date: 2019-01-06 2:30:10
hidden: true
slug: fxi5mralt2r
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">按角色组织</h1>
<p>如果你用MVC框架开发过应用，应该知道<code>MVC</code>框架之下，通常有这样一种代码组织方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="controllers/
  todoController.js
  filterController.js
models/
  todoModel.js
  filterModel.js
views/
  todo.js
  todoItem.js
  filter.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs golo"><code>controllers/
  todoController.js
  filterController.js
models/
  todoModel.js
  filterModel.js
views/
  todo.js
  todoItem.js
  <span class="hljs-keyword">filter</span>.js</code></pre>
<p><code>Controller</code>、<code>Model</code>、<code>View</code>分别代表三种模块角色。这种组织代码的方式叫做“按角色组织”。</p>
<p>因为<code>MVC</code>的影响深远，一些风格依然影响了前端人员的思维方式，在Redux应用的构建中，就有这种组织方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="reducers/
  todoReducer.js
  filterReducer.js
actions/
  todoAction.js
  filterActions.js
components/
  todoList.js
  todoItem.js
  filter.js
containers/
  todoListContainer.js
  todoItemContainer.js
  filterContainer.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs golo"><code>reducers/
  todoReducer.js
  filterReducer.js
actions/
  todoAction.js
  filterActions.js
components/
  todoList.js
  todoItem.js
  <span class="hljs-keyword">filter</span>.js
containers/
  todoListContainer.js
  todoItemContainer.js
  filterContainer.js</code></pre>
<p>角色如下：</p>
<ul>
<li>
<code>reducers</code> 目录包含所有Redux的reducer；</li>
<li>
<code>actions</code> 目录包含所有action构造函数；</li>
<li>
<code>components</code> 目录包含所有的展示组件；</li>
<li>
<code>containers</code> 目录包含所有的容器组件。</li>
</ul>
<p>这种按角色组织的方式看起来不错，实际非常不利于应用的扩展。当你需要对一个功能进行修改时，要在多个角色目录下切换，当功能模块多了，这种频繁的目录切换即浪费时间也增加了编码厌倦感。</p>
<p>如果说<code>MVC</code>框架下，因为三个角色之间的交叉关系，也只能默默接受，那么在<code>Redux</code>框架下，我们已经有机会实行严格模块化思想。</p>
<h1 id="articleHeader1">按功能组织</h1>
<p><code>Redux</code>应用适合于“按功能组织”，也就是把完成同一应用功能的代码放在一个目录下，一个应用功能包含多个角色的代码。<code>Redux</code>中，不同的角色就是<code>reducer</code>、<code>actions</code>和视图，而应用功能对应的就是用户界面的交互模块。</p>
<p>拿<code>Todo</code>应用来说，两个基本的功能就是<code>TodoList</code>和<code>Filter</code>，所以按功能组织就是这样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="todoList/
  actions.js
  actionTypes.js
  index.js
  reducer.js
  views/
    components.js
    containers.js
filter/
  actions.js
  actionTypes.js
  index.js
  reducer.js
  views/
    components.js
    container.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>todoList/
  actions<span class="hljs-selector-class">.js</span>
  actionTypes<span class="hljs-selector-class">.js</span>
  index<span class="hljs-selector-class">.js</span>
  reducer<span class="hljs-selector-class">.js</span>
  views/
    components<span class="hljs-selector-class">.js</span>
    containers<span class="hljs-selector-class">.js</span>
<span class="hljs-attribute">filter</span>/
  actions<span class="hljs-selector-class">.js</span>
  actionTypes<span class="hljs-selector-class">.js</span>
  index<span class="hljs-selector-class">.js</span>
  reducer<span class="hljs-selector-class">.js</span>
  views/
    components<span class="hljs-selector-class">.js</span>
    container.js</code></pre>
<p>每个功能模块对应一个目录，分别是<code>todoList</code>和<code>filter</code>，每个目录下包含同样的角色文件：</p>
<ul>
<li>
<code>actionTypes.js</code> 定义action类型；</li>
<li>
<code>actions.js</code> 定义action构造函数；</li>
<li>
<code>reducer.js</code> 定义这个功能模块如果响应actions.js定义的动作；</li>
<li>
<code>views</code> 包含功能模块中所有的React组件，包括展示组件和容器组件；</li>
<li>
<code>index.js</code> 把所有的角色导入，统一导出。</li>
</ul>
<p>这种组织方式下，当你要修改某个模块时，只要关注对应的目录即可。</p>
<p>按功能组织下的每个模块，都有一个index.js，明确了模块对外的接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as actions from './actions.js';
import reducer from './reducer.js';
import view from './views/container.js';

export { actions, reducer, view };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions.js'</span>;
<span class="hljs-keyword">import</span> reducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducer.js'</span>;
<span class="hljs-keyword">import</span> view <span class="hljs-keyword">from</span> <span class="hljs-string">'./views/container.js'</span>;

<span class="hljs-keyword">export</span> { actions, reducer, view };</code></pre>
<p>当filter模块依赖todoList模块时，对应的导入代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { actions, reducer, view as TodoList } from '../todoList';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { actions, reducer, view <span class="hljs-keyword">as</span> TodoList } <span class="hljs-keyword">from</span> <span class="hljs-string">'../todoList'</span>;</code></pre>
<h1 id="articleHeader2">混合方式</h1>
<p>大型应用中，下面这种混合方式（既采用类型划分的优势，又添加了功能划分的特点）也是不错的选择。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src/                 所有源代码存放的路径
  app.js             整个应用的入口
  views/             应用中某个页面的入口文件，一般为路由组件
    Home.js          例如，首页的入口就是Home.js
    Home.css         Home页面对应的样式
    HomeRedux.js     Home页面中所有与Redux相关的reducer、action creator的汇总，即components/Home/下所有*Redux.js的汇总
  components/        所有应用的组件
    Home/            例如，views/中一个名为Home的view，则在components/中就有一个名为Home的子文件夹
      Table.js       Home页面中的一个列表组件
      Table.css      列表组件对应的样式
      TableRedux.js  列表组件的reducer、action creator及action type，整合在一个文件中
      Modal.js
      Modal.css
      ModalRedux.js
    shared/          不归属于任何view的组件，如一些公共组件等
  containers/
    DevTools.js      配置DevTools
    Root.js          一般被app.js依赖，用于根据环境判断是否需要加载DevTools
  layouts/           布局相关的组件及样式，如菜单、侧边栏、header、footer等
  redux/             Redux store相关的配置
    reducers.js      整个应用中所有reducer的汇总
  routes/            路由相关的配置
  utils/             工具函数、常量等
  styles/            全局公共样式
  app.css            应用主样式表" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>src/                 所有源代码存放的路径
  app<span class="hljs-selector-class">.js</span>             整个应用的入口
  views/             应用中某个页面的入口文件，一般为路由组件
    Home<span class="hljs-selector-class">.js</span>          例如，首页的入口就是Home<span class="hljs-selector-class">.js</span>
    Home<span class="hljs-selector-class">.css</span>         Home页面对应的样式
    HomeRedux<span class="hljs-selector-class">.js</span>     Home页面中所有与Redux相关的reducer、action creator的汇总，即components/Home/下所有*Redux.js的汇总
  components/        所有应用的组件
    Home/            例如，views/中一个名为Home的view，则在components/中就有一个名为Home的子文件夹
      Table<span class="hljs-selector-class">.js</span>       Home页面中的一个列表组件
      Table<span class="hljs-selector-class">.css</span>      列表组件对应的样式
      TableRedux<span class="hljs-selector-class">.js</span>  列表组件的reducer、action creator及action type，整合在一个文件中
      Modal<span class="hljs-selector-class">.js</span>
      Modal<span class="hljs-selector-class">.css</span>
      ModalRedux<span class="hljs-selector-class">.js</span>
    shared/          不归属于任何view的组件，如一些公共组件等
  containers/
    DevTools<span class="hljs-selector-class">.js</span>      配置DevTools
    Root<span class="hljs-selector-class">.js</span>          一般被app.js依赖，用于根据环境判断是否需要加载DevTools
  layouts/           布局相关的组件及样式，如菜单、侧边栏、header、footer等
  redux/             Redux store相关的配置
    reducers<span class="hljs-selector-class">.js</span>      整个应用中所有reducer的汇总
  routes/            路由相关的配置
  utils/             工具函数、常量等
  styles/            全局公共样式
  app<span class="hljs-selector-class">.css</span>            应用主样式表</code></pre>
<p>基本上，我们只需要关注的就是views/和components/这两个目录，它们也是存放绝大多数业务代码的地方。</p>
<p>在views/目录中，存放的是每个路由的入口页，如首页（Home）、详情页（Detail）、管理后台页（Admin）等。而每个入口都会有三个文件：<em>.js是入口的组件，</em>.css是对应组件的样式，而*Redux.js是components/Home/目录下所有reducer和action的聚合。</p>
<p>在components/Home/目录里，是当前路由对应的页面（Home）需要的所有内容------components、actions、reducers、样式等。</p>
<blockquote><p>什么是*Redux.js？实际上，按照Redux应用的一般目录结构划分方式，应该分别有reducers、action creator和constants文件夹。但是在实际应用中，我们发现这样的划分方式略显繁琐，添加一个组件需要至少新建4个文件。同时对于业务应用来说，reducers等于Redux相关的文件并不太可能被其他地方复用，因此放在一个文件里组织并管理是更好的选择。目前在Redux社区中也存在一个类似的规范。<a href="https://github.com/erikras/ducks-modular-redux" rel="nofollow noreferrer" target="_blank">Ducks modular redux</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列---React+Redux工程目录结构划分

## 原文链接
[https://segmentfault.com/a/1190000010384268](https://segmentfault.com/a/1190000010384268)

