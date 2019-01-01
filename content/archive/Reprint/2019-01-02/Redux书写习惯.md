---
title: 'Redux书写习惯' 
date: 2019-01-02 2:30:09
hidden: true
slug: pn7lu35rgh9
categories: [reprint]
---

{{< raw >}}

                    
<p>react+redux项目已经是很常见了，<br>React已经有了成熟的书写规范：<a href="https://github.com/airbnb/javascript/tree/master/react" rel="nofollow noreferrer" target="_blank">React规范-airbnb</a><br>但是redux书写规范目前比较少见，<br>这里分享一种我司 <a href="http://www.xinrenxinshi.com/" rel="nofollow noreferrer" target="_blank">薪人薪事</a> 的redux书写习惯。</p>
<h1 id="articleHeader0">redux的流程图</h1>
<p><span class="img-wrap"><img data-src="/img/bVTXuv?w=638&amp;h=479" src="https://static.alili.tech/img/bVTXuv?w=638&amp;h=479" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>上图摘自阮一峰老师的博客，关键点 React Component / Actions(Action Creators, Action ) / Reducers。<br>我们需要对每个点都要坐下规范，具体规范包括：</p>
<ol>
<li><p>目录结构规范</p></li>
<li><p>redux数据源规范</p></li>
<li><p>redux相关文件名称规范</p></li>
<li><p>action type变量名称规范</p></li>
<li><p>action/action creator书写顺序，export顺序规范</p></li>
<li><p>reducer书写规范</p></li>
<li><p>模块无状态组件规范</p></li>
<li><p>数据和业务分离规范</p></li>
<li><p>公共组件使用redux规范</p></li>
<li><p>搭配 <a href="https://github.com/yannickcr/eslint-plugin-react" rel="nofollow noreferrer" target="_blank">eslint-react</a> 使用</p></li>
</ol>
<p>这里对每个点都做详细的规范介绍，最后展示完整的demo。</p>
<h1 id="articleHeader1">一、目录结构规范</h1>
<p><span class="img-wrap"><img data-src="/img/bVTXyb?w=558&amp;h=1042" src="https://static.alili.tech/img/bVTXyb?w=558&amp;h=1042" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>项目使用的是碎片化目录结构，适合大型项目。<br><code>componets</code>目录存放的公共组件<br><code>containers</code>目录存放项目的公共容器<br><code>routers</code>目录存放不同路由下的不同模块（一级路由区分模块，每个一级路由一个模块）<br><code>routers/List</code>目录下零散的文件是对应的路由文件（chunk）<br><code>routers/List/components</code>目录下是List模块的公共组件<br><code>routers/List/containers</code>目录下是List模块的页面组件<br><code>routers/List/redux</code>目录下是List模块的跟redux相关的文件（action、reducer等）<br><code>routers/List/style</code>目录下是List模块的公共样式和各个页面的样式<br><code>routers/List/util</code>目录下是List模块的公共无状态组件</p>
<p>上述是以<code>List</code>模块为例，其他各个模块均跟此模块类似。</p>
<h1 id="articleHeader2">二、redux数据源规范</h1>
<p>通常情况下，每个页面都有自己的数据源，各个页面的数据源是平级的。<br>所以在react-router里配置的时候，当路由走到对应页面路由的时候，动态注入该数据源。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { injectReducer } from '../../store/reducers'

export default (store) => ({
     path: 'user',
     getComponent (nextState, cb) {
            require.ensure([], (require) => {
                // 拿到reducer和store 动态注入节点
     const {infoReducer} = require('./redux/index').default;
     injectReducer(store, { key: 'info', reducer: infoReducer });
    
     const Info = require('./containers/info').default;
    
     cb(null, Info);
     })
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { injectReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">'../../store/reducers'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (store) =&gt; ({
     path: <span class="hljs-string">'user'</span>,
     getComponent (nextState, cb) {
            <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">require</span>)</span> =&gt;</span> {
                <span class="hljs-regexp">//</span> 拿到reducer和store 动态注入节点
     const {infoReducer} = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./redux/index'</span>).<span class="hljs-keyword">default</span>;
     injectReducer(store, { key: <span class="hljs-string">'info'</span>, reducer: infoReducer });
    
     const Info = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./containers/info'</span>).<span class="hljs-keyword">default</span>;
    
     cb(<span class="hljs-literal">null</span>, Info);
     })
    }
})</code></pre>
<p>上述代码的大致意思就是：当路由走到user页面的时候，到对应模块下的redux文件中 获取对应reducer，<br>创建一个obj，key是数据源的名称，reducer是写好的reducer，注入到全局的store中。 <br>路由结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── list
│   ├── list
│   └── detail 
└── user
    └── info  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>.
├── list
│   ├── list
│   └── detail 
└── <span class="hljs-keyword">user</span>
    <span class="hljs-title">└── info</span>  </code></pre>
<p>对应的redux的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    list: {},
    detail: {},
    info: {}
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">list</span>: {},
    <span class="hljs-selector-tag">detail</span>: {},
    <span class="hljs-selector-tag">info</span>: {}
} </code></pre>
<p><strong>各个页面在redux中的数据源是平铺的，这样各个数据源互不干涉，不影响。</strong><br>每个页面的数据源单独维护。 </p>
<p>之前还想过另一种方式，参考了一个vuex的多页应用设计。<br>就是一个模块一个数据源，每个数据源下对应页面数据源。<br>还是上面那个例子，这样的思想下redux数据结构就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    list: {
        list: {},
        detail: {},
    },
    user: {
        info: {}
    }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">list</span>: {
        list: {},
        <span class="hljs-selector-tag">detail</span>: {},
    },
    <span class="hljs-selector-tag">user</span>: {
        <span class="hljs-attribute">info</span>: {}
    }
} </code></pre>
<p>根路由结构一样，这样的话，以模块为单位，页面数据源是模块下的一个属性。<br>这样路由走到模块级路由的时候，注入reducer。<br>最后放弃了这种方案，原因很多，比如：</p>
<ol>
<li><p>对于这种深层次的对象嵌套是不推荐的（两层级以上），这样很容易出现，改了list中的一个属性，页面没有重绘的问题。</p></li>
<li><p>进入到一个页面，这时候每个页面的数据源已经初始化了，这样造成性能浪费和开发过程中产生一定的问题。</p></li>
<li><p>更新了detail中的一个属性，redux判断整个list改变，从而替换，触发很多不必要的重绘。性能浪费。</p></li>
</ol>
<p>所以，还是应该使用节点平铺的方式。</p>
<h1 id="articleHeader3">三、redux相关文件名称规范</h1>
<p>项目目录按照模块划分的，<br>redux文件都应该放到模块目录下的redux目录下。<br>该目录下包含了包含了该模块下的所有redux文件。<br>总共应该有 <code>actionTypes</code> <code>actions</code> <code>reducers</code> <code>index</code> 四个文件，<br><code>actionTypes</code> 文件表示action的type，文件里都是常量；<br><code>actions</code> 文件表示action和action creator；<br><code>reducers</code> 文件表示模块下的所有reducer的一个集合；<br><code>index</code> 文件只干一件事，import reducers 然后暴露出去，为的是遵循规范。</p>
<h1 id="articleHeader4">四、action type变量名称规范</h1>
<p>在redux中，所有的action type是唯一的，全局不可重复。<br>所以，按理说整个项目应该有一个actionTypes文件，存储的是全局的action type。<br>但是考虑到这样的话 actionTypes文件内容会特别多，不便于维护。<br>所以，每个模块各自创建一个actionTypes文件，通过命名来避免重名问题。</p>
<p>写了一段时间，发现一个急于要解决的问题，就是action type的命名。<br>每个人的命名都按照自己的想法命名，不便于其他人阅读。<br>所以总结出action type的命名规则：<br><code>MODULE_PAGE_ACTION_OTHER</code><br>模块名_页面名_操作名_其他</p>
<p>前两个名字是为了避免变量重名，<br>ACTION表示具体操作名称。<br>数据库有增删改查（CRUD）<br>但是redux的store基本不会存在增删查的情况，所以对改（U）做了细分：</p>
<ol>
<li><p><code>INIT</code> 页面第一次进入获取数据的时候（这种情况通常会对很多数据进行填充，比较复杂，单独算作一种）</p></li>
<li><p><code>UPDATE</code> 更新某些数据</p></li>
<li><p><code>RECOVER</code> 某些页面卸载的时候 需要还原成初始化的数据</p></li>
</ol>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 更新化列表数据
export const LIST_LIST_UPDATE_LIST = 'LIST_LIST_UPDATE_LIST';
// 初始化详情页数据
export const LIST_DETAIL_INIT = 'LIST_DETAIL_INIT';
// 还原详情页数据
export const LIST_DETAIL_RECOVER = 'LIST_DETAIL_RECOVER';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// 更新化列表数据</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> LIST_LIST_UPDATE_LIST = <span class="hljs-string">'LIST_LIST_UPDATE_LIST'</span>;
<span class="hljs-comment">// 初始化详情页数据</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> LIST_DETAIL_INIT = <span class="hljs-string">'LIST_DETAIL_INIT'</span>;
<span class="hljs-comment">// 还原详情页数据</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> LIST_DETAIL_RECOVER = <span class="hljs-string">'LIST_DETAIL_RECOVER'</span>;</code></pre>
<h1 id="articleHeader5">五、action/action creator书写顺序，export顺序规范</h1>
<p>actions里面是整个模块的action和action creator。<br>这里面有很多情况，<br>比如里面有正常的 action：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const updateList = (data) => ({
    type: actionType.LIST_LIST_UPDATE_LIST,
    payload: data
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">const</span> updateList = (<span class="hljs-class"><span class="hljs-keyword">data</span>) =&gt; ({
    <span class="hljs-title">type</span>: <span class="hljs-title">actionType</span>.<span class="hljs-type">LIST_LIST_UPDATE_LIST</span>,
    <span class="hljs-title">payload</span>: <span class="hljs-title">data</span>
});</span></code></pre>
<p>还有发请求，请求数据的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fetchList() {
     return (dispatch, getState) => {
     // 这里使用axios发送请求
     // 此处可以通过getState()获取到整个store的数据
     // 发送请求前处理数据
    
     // return axios.get('/ajax/xxxxxxx')
     // .then(response => response.data)
     // .catch(response => response.data)
    
     // 模拟接口
     return new Promise(()=>{
         const array = [
             {id: 'a1', title: 'this is title', content: 'this is content'},
             {id: 'b2', title: 'this is b2 title', content: 'this is content, 文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容'},
             {id: 'c3', title: 'this is c3 title', content: 'this is 文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容'},
             {id: 'd4', title: 'this is title d4', content: 'this is 文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容'},
             {id: 'e5', title: 'this is e5 title', content: 'this is content 文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容'}
         ];

         dispatch(updateList(array));

         return array;
     });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>function fetchList() {
     <span class="hljs-keyword">return</span> (dispatch, getState) =&gt; {
     <span class="hljs-comment">// 这里使用axios发送请求</span>
     <span class="hljs-comment">// 此处可以通过getState()获取到整个store的数据</span>
     <span class="hljs-comment">// 发送请求前处理数据</span>
    
     <span class="hljs-comment">// return axios.get('/ajax/xxxxxxx')</span>
     <span class="hljs-comment">// .then(response =&gt; response.data)</span>
     <span class="hljs-comment">// .catch(response =&gt; response.data)</span>
    
     <span class="hljs-comment">// 模拟接口</span>
     <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(()=&gt;{
         const array = [
             {<span class="hljs-string">id:</span> <span class="hljs-string">'a1'</span>, <span class="hljs-string">title:</span> <span class="hljs-string">'this is title'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'this is content'</span>},
             {<span class="hljs-string">id:</span> <span class="hljs-string">'b2'</span>, <span class="hljs-string">title:</span> <span class="hljs-string">'this is b2 title'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'this is content, 文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容'</span>},
             {<span class="hljs-string">id:</span> <span class="hljs-string">'c3'</span>, <span class="hljs-string">title:</span> <span class="hljs-string">'this is c3 title'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'this is 文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容'</span>},
             {<span class="hljs-string">id:</span> <span class="hljs-string">'d4'</span>, <span class="hljs-string">title:</span> <span class="hljs-string">'this is title d4'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'this is 文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容'</span>},
             {<span class="hljs-string">id:</span> <span class="hljs-string">'e5'</span>, <span class="hljs-string">title:</span> <span class="hljs-string">'this is e5 title'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'this is content 文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容'</span>}
         ];

         dispatch(updateList(array));

         <span class="hljs-keyword">return</span> array;
     });
}</code></pre>
<p>所以需要区分</p>
<ol>
<li><p>所以发送请求的都以fetch开头，名字与接口一致；</p></li>
<li><p>action与命名规则将actionApplyOther，比如initDetail,updateList等；</p></li>
<li><p>action文件暴露出去的时候，按照一定顺序排列；</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    fetchList,
    getDetailById,

    initDetail,
    
    updateDetailStatus,

    recoverDetail
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    fetchList,
    getDetailById,

    initDetail,
    
    updateDetailStatus,

    recoverDetail
};</code></pre>
<h1 id="articleHeader6">六、reducer书写规范</h1>
<p>reducers文件包含该模块下的所有页面的reducer，<br>文件里可能有一些公用方法，写在最前面。<br>每个页面会有一个初始化页面的state和reducer。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="detailState = {};

function detailReducer (state ={...detilState}, action) {
    switch (action.type) {
        case actionTypes.LIST_DETAIL_INIT: {
            const { title, content } = action.payload;

            state.title = title;
            state.content = content;

            return { ...state };
        }
        case actionTypes.LIST_DETAIL_RECOVER: {
            state = detailState;

            return { ...state };
        }
        default:
            return state;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>detailState = {};

function detailReducer (<span class="hljs-keyword">state</span> ={...detilState}, action) {
    switch (action.type) {
        case actionTypes.LIST_DETAIL_INIT: {
            const { title, content } = action.payload;

            <span class="hljs-keyword">state</span>.title = title;
            <span class="hljs-keyword">state</span>.content = content;

            return { ...<span class="hljs-keyword">state</span> };
        }
        case actionTypes.LIST_DETAIL_RECOVER: {
            <span class="hljs-keyword">state</span> = detailState;

            return { ...<span class="hljs-keyword">state</span> };
        }
        <span class="hljs-keyword">default</span>:
            return <span class="hljs-keyword">state</span>;
    }
};</code></pre>
<h1 id="articleHeader7">七、模块无状态组件规范</h1>
<p>每个模块都会有些可重用的html代码段，这些代码段里通常还有变量，<br>将这些变量提取出来，做成公共的无状态组件，提高代码复用率。<br><code>util</code>目录下的文件就是模块下的无状态组件的集合。<br>这里无状态组件的命名规范：<br><code>get</code> + 模块名 + 具体片段 + <code>DOM</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { Link } from 'react-router'

export function getListListDOM({ list }) {
    const result = [];
    list.map((item) => {
        result.push(
            <li key={item.id}>
                <Link to={`/list/detail/${item.id}`}>{item.title}</Link>
            </li>
        );
    });

    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { Link } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getListListDOM</span>(<span class="hljs-params">{ list }</span>) </span>{
    <span class="hljs-keyword">const</span> result = [];
    list.map(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
        result.push(
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">list</span>/<span class="hljs-attr">detail</span>/${<span class="hljs-attr">item.id</span>}`}&gt;</span>{item.title}<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
        );
    });

    <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>页面使用的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import { getListListDOM } from '../util/'
import '../style/index.scss'
import '../style/list.scss'

class List extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    componentDidMount () {
        this.props.dispatch(actions.fetchList())
            .then((result) => {
                // 在业务层里进行报错提示等业务操作
                if (result) {
                    console.log('获取数据成功');
                }
            });
    }
    render () {
        const listDOM = getListListDOM(this.props.list);

        return (
            <div>
                <ul>
                    {listDOM}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    list: state.list,
});

export default connect(mapStateToProps, dispatch => ({ ...bindActionCreators(actions, dispatch), dispatch }))(List)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>
<span class="hljs-keyword">import</span> { bindActionCreators } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'../redux/actions'</span>
<span class="hljs-keyword">import</span> { getListListDOM } <span class="hljs-keyword">from</span> <span class="hljs-string">'../util/'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'../style/index.scss'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'../style/list.scss'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span> (props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {};
    }
    componentDidMount () {
        <span class="hljs-keyword">this</span>.props.dispatch(actions.fetchList())
            .then(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {
                <span class="hljs-comment">// 在业务层里进行报错提示等业务操作</span>
                <span class="hljs-keyword">if</span> (result) {
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'获取数据成功'</span>);
                }
            });
    }
    render () {
        <span class="hljs-keyword">const</span> listDOM = getListListDOM(<span class="hljs-keyword">this</span>.props.list);

        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                    {listDOM}
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}

<span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> ({
    <span class="hljs-attr">list</span>: state.list,
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps, dispatch =&gt; ({ ...bindActionCreators(actions, dispatch), dispatch }))(List)
</code></pre>
<h1 id="articleHeader8">八、数据和业务分离规范</h1>
<p>引入redux就是帮我们管理数据的，<strong>所以在redux的相关文件里面不要做view层能做的事</strong>。<br>比如: 操作成功提示 报错提示 等等。<br>数据层里<code>action creator</code> 发送请求，<code>action creator</code>中负责简单的数据发送前处理，返回数据的简单处理，涉及到更改<code>store</code>都交给<code>reducer</code>，<br>然后将请求返回结果return给view层 view层再做相关操作 。<br>例子可以见详细的demo。</p>
<h1 id="articleHeader9">九、公共组件使用redux规范</h1>
<p>公共组件面临着在多个页面使用的场景，需要的参数虽然相同，但是可能来自不同的数据节点，<br>这样绑定数据节点的话不好区分，所以公共组件尽量使用父子组件参数传递。<br>如果该组件实在需要redux数据节点，为其建立单独的redux节点，和单独的<code>reducer</code> 。</p>
<h1 id="articleHeader10">十、搭配 eslint-react 使用</h1>
<p>项目中，为了规范大家的代码，使用到了eslint，并且引入了<a href="https://github.com/yannickcr/eslint-plugin-react" rel="nofollow noreferrer" target="_blank">针对react规范的包</a>。<br>该包分别针对react使用和jsx使用设定了规范，<br>我们阅读了所有规范，选出了适合我们的配置方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;rules&quot;: {
    &quot;comma-dangle&quot;: 0,
    &quot;no-console&quot;: 0,

    &quot;react/default-props-match-prop-types&quot;: 2, // 有默认值的属性必须在propTypes中指定
    &quot;react/no-array-index-key&quot;: 2, // 遍历出来的节点必须加key
    &quot;react/no-children-prop&quot;: 2, // 禁止使用children作为prop
    &quot;react/no-direct-mutation-state&quot;: 2, // 禁止直接this.state = 方式修改state 必须使用setState
    &quot;react/no-multi-comp&quot;: 2, // 一个文件只能存在一个组件
    &quot;react/no-set-state&quot;: 2, // 不必要的组件改写成无状态组件
    &quot;react/no-string-refs&quot;: 2, // 禁止字符串的ref
    &quot;react/no-unescaped-entities&quot;: 2, // 禁止'<', '>'等单标签
    &quot;react/no-unknown-property&quot;: 2, // 禁止未知的DOM属性
    &quot;react/no-unused-prop-types&quot;: 2, // 禁止未使用的prop参数
    &quot;react/prefer-es6-class&quot;: 2, // 强制使用es6 extend方法创建组件
    &quot;react/require-default-props&quot;: 2, // 非require的propTypes必须制定默认值
    &quot;react/self-closing-comp&quot;: 2, // 没有children的组件和html必须使用自闭和标签
    &quot;react/sort-comp&quot;: 2, // 对组件的方法排序
    &quot;react/sort-prop-types&quot;: 2, // 对prop排序
    &quot;react/style-prop-object&quot;: 2, // 组件参数如果是style，value必须是object

    &quot;react/jsx-boolean-value&quot;: 2, // 属性值为true的时候，省略值只写属性名
    &quot;react/jsx-closing-bracket-location&quot;: 2, // 强制闭合标签的位置
    &quot;react/jsx-closing-tag-location&quot;: 2, // 强制开始标签闭合标签位置
    &quot;react/jsx-equals-spacing&quot;: 2, // 属性赋值不允许有空格
    &quot;react/jsx-first-prop-new-line&quot;: 2, // 只有一个属性情况下单行
    &quot;react/jsx-key&quot;: 2, // 强制遍历出来的jsx加key
    &quot;react/jsx-max-props-per-line&quot;: [2, { &quot;maximum&quot;: 2 }], // 每行最多几个属性
    &quot;react/jsx-no-comment-textnodes&quot;: 2, // 检查jsx注释
    &quot;react/jsx-no-duplicate-props&quot;: 2, // 检查属性名重名
    &quot;react/jsx-no-target-blank&quot;: 2, // 检查jsx是否被引入和使用
    &quot;react/jsx-no-undef&quot;: 2, // 检查jsx引用规范
    &quot;react/jsx-pascal-case&quot;: 2, // 检查jsx标签名规范
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>{
    <span class="hljs-string">"rules"</span>: {
    <span class="hljs-string">"comma-dangle"</span>: <span class="hljs-number">0</span>,
    <span class="hljs-string">"no-console"</span>: <span class="hljs-number">0</span>,

    <span class="hljs-string">"react/default-props-match-prop-types"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 有默认值的属性必须在propTypes中指定
    <span class="hljs-string">"react/no-array-index-key"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 遍历出来的节点必须加key
    <span class="hljs-string">"react/no-children-prop"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 禁止使用children作为prop
    <span class="hljs-string">"react/no-direct-mutation-state"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 禁止直接this.state = 方式修改state 必须使用setState
    <span class="hljs-string">"react/no-multi-comp"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 一个文件只能存在一个组件
    <span class="hljs-string">"react/no-set-state"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 不必要的组件改写成无状态组件
    <span class="hljs-string">"react/no-string-refs"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 禁止字符串的ref
    <span class="hljs-string">"react/no-unescaped-entities"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 禁止<span class="hljs-string">'&lt;'</span>, <span class="hljs-string">'&gt;'</span>等单标签
    <span class="hljs-string">"react/no-unknown-property"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 禁止未知的DOM属性
    <span class="hljs-string">"react/no-unused-prop-types"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 禁止未使用的prop参数
    <span class="hljs-string">"react/prefer-es6-class"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 强制使用es6 extend方法创建组件
    <span class="hljs-string">"react/require-default-props"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 非<span class="hljs-keyword">require</span>的propTypes必须制定默认值
    <span class="hljs-string">"react/self-closing-comp"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 没有children的组件和html必须使用自闭和标签
    <span class="hljs-string">"react/sort-comp"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 对组件的方法排序
    <span class="hljs-string">"react/sort-prop-types"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 对prop排序
    <span class="hljs-string">"react/style-prop-object"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 组件参数如果是style，value必须是object

    <span class="hljs-string">"react/jsx-boolean-value"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 属性值为<span class="hljs-literal">true</span>的时候，省略值只写属性名
    <span class="hljs-string">"react/jsx-closing-bracket-location"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 强制闭合标签的位置
    <span class="hljs-string">"react/jsx-closing-tag-location"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 强制开始标签闭合标签位置
    <span class="hljs-string">"react/jsx-equals-spacing"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 属性赋值不允许有空格
    <span class="hljs-string">"react/jsx-first-prop-new-line"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 只有一个属性情况下单行
    <span class="hljs-string">"react/jsx-key"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 强制遍历出来的jsx加key
    <span class="hljs-string">"react/jsx-max-props-per-line"</span>: [<span class="hljs-number">2</span>, { <span class="hljs-string">"maximum"</span>: <span class="hljs-number">2</span> }], <span class="hljs-regexp">//</span> 每行最多几个属性
    <span class="hljs-string">"react/jsx-no-comment-textnodes"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 检查jsx注释
    <span class="hljs-string">"react/jsx-no-duplicate-props"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 检查属性名重名
    <span class="hljs-string">"react/jsx-no-target-blank"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 检查jsx是否被引入和使用
    <span class="hljs-string">"react/jsx-no-undef"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 检查jsx引用规范
    <span class="hljs-string">"react/jsx-pascal-case"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> 检查jsx标签名规范
  }
}</code></pre>
<h1 id="articleHeader11">总结</h1>
<p>其实redux引入相当于是前端引入了一个数据库，全局可以使用，但是不可持久化。<br>同时也引入分层概念，与后端框架操作数据库类似，<br>不过redux于数据库还是有本质区别的：后端是存取数据关系，前端是数据和组件相互订阅关系。<br>写多了就会总结出一套固定的写法，互相学习，参考。</p>
<p>完整的项目：<a href="https://github.com/Aus0049/react-redux-demo" rel="nofollow noreferrer" target="_blank">https://github.com/Aus0049/re...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux书写习惯

## 原文链接
[https://segmentfault.com/a/1190000010915166](https://segmentfault.com/a/1190000010915166)

