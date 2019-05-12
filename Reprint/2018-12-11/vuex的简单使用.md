---
title: 'vuex的简单使用' 
date: 2018-12-11 2:30:10
hidden: true
slug: 0lhk4yn0ouyc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一 目录的配置</h2>
<p>根据官方推荐在src目录里面创建store目录</p>
<h2 id="articleHeader1">二 创建store里面的文件</h2>
<p>根据官方推荐创建 actions.js, getters.js,index.js, mutations.js, mutations-types.js, state.js</p>
<h3 id="articleHeader2">2.1 state.js</h3>
<p>state.js: 是vuex的单一状态数，用一个对象就包含了全部的应用层级状态。至此它便作为一个『唯一数据源(SSOT)』而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。（用来管理所有vuex状态数据）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
* 是vuex的单一状态数，用一个对象就包含了全部的应用层级状态
* 单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。（用来管理所有vuex状态数据）
*
*/

const state = {

  // 城市状态，用来管理城市
  city: {},
  cityList: [],
  fullScreen: true,
  palyer: false
};

export default state;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
* 是vuex的单一状态数，用一个对象就包含了全部的应用层级状态
* 单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。（用来管理所有vuex状态数据）
*
*/</span>

<span class="hljs-keyword">const</span> state = {

  <span class="hljs-comment">// 城市状态，用来管理城市</span>
  city: {},
  <span class="hljs-attr">cityList</span>: [],
  <span class="hljs-attr">fullScreen</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">palyer</span>: <span class="hljs-literal">false</span>
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> state;</code></pre>
<h3 id="articleHeader3">2.2 mutations-types.js  存取mutations相关的字符常量 (一些常量)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
* 存取mutations相关的字符常量
*
*/

// 定义常量并导出
export const SET_CITY = 'SET_CITY';
export const SET_PLAY = 'SET_PLAY';
export const SET_FULL_SCREEN = 'SET_FULL_SCREEN';
export const SET_CITY_LIST = 'SET_CITY_LIST';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
* 存取mutations相关的字符常量
*
*/</span>

<span class="hljs-comment">// 定义常量并导出</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_CITY = <span class="hljs-string">'SET_CITY'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_PLAY = <span class="hljs-string">'SET_PLAY'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_FULL_SCREEN = <span class="hljs-string">'SET_FULL_SCREEN'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_CITY_LIST = <span class="hljs-string">'SET_CITY_LIST'</span>;</code></pre>
<h3 id="articleHeader4">2.3 mutations.js （定义修改的操作）</h3>
<p>更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
 * Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
 */

// 导入mutation-type.js里面所有的常量
import * as types from './mutation-types';

// 定义一个mutation可以供设置和修改值
const mutations = {

  /*
  * 1 表达式作为属性表达式放在方括号之内
  * 2 形参state （获取当前状态树的state）
  * 3 形参city，是提交mutation时传的参数
  * 4 使用mutation便于书写方便
  * 5 这个操作相当于往state.js里面写入city
   */
  [types.SET_CITY](state, city) {
    state.city = city;
  },
  [types.SET_CITY_LIST](state, list) {
    state.cityList = list;
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_PLAY](state, palyState) {
    state.palyer = palyState;
  }
};

// 导出mutation
export default mutations;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
 * Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
 */</span>

<span class="hljs-comment">// 导入mutation-type.js里面所有的常量</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutation-types'</span>;

<span class="hljs-comment">// 定义一个mutation可以供设置和修改值</span>
<span class="hljs-keyword">const</span> mutations = {

  <span class="hljs-comment">/*
  * 1 表达式作为属性表达式放在方括号之内
  * 2 形参state （获取当前状态树的state）
  * 3 形参city，是提交mutation时传的参数
  * 4 使用mutation便于书写方便
  * 5 这个操作相当于往state.js里面写入city
   */</span>
  [types.SET_CITY](state, city) {
    state.city = city;
  },
  [types.SET_CITY_LIST](state, list) {
    state.cityList = list;
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_PLAY](state, palyState) {
    state.palyer = palyState;
  }
};

<span class="hljs-comment">// 导出mutation</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> mutations;
</code></pre>
<h3 id="articleHeader5">2.4 getters.js 有时候我们需要从 store 中的 state 中派生出一些状态。</h3>
<p>mapGetters 辅助函数仅仅是将 store 中的 getters 映射到局部计算属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
* 有时候我们需要从 store 中的 state 中派生出一些状态
* 这里的常量主要是对state里面做一些映射
* mapGetters 辅助函数仅仅是将 store 中的 getters 映射到局部计算属性
*/

// 对state里面的属性做一些映射

export const city = state => state.city;   // 箭头函数的简写
export const cityList = state => state.cityList;
export const fullScreen = state => state.fullScreen;
export const palyer = state => state.palyer;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
* 有时候我们需要从 store 中的 state 中派生出一些状态
* 这里的常量主要是对state里面做一些映射
* mapGetters 辅助函数仅仅是将 store 中的 getters 映射到局部计算属性
*/</span>

<span class="hljs-comment">// 对state里面的属性做一些映射</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> city = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.city;   <span class="hljs-comment">// 箭头函数的简写</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> cityList = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.cityList;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fullScreen = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.fullScreen;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> palyer = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.palyer;
</code></pre>
<h3 id="articleHeader6">2.5 actions.js</h3>
<p>Action 类似于 mutation，不同在于：</p>
<ol>
<li>Action 提交的是 mutation，而不是直接变更状态。</li>
<li>Action 可以包含任意异步操作。</li>
<li>在一个动作中多次改变mutation可以封装一个action</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
*  actions类似mutation
*  区别：
*  1：action提交的是mutation
*  2：action可以包含任意异步操作
*/

/*
 * 使用：
 *  1：在一个动作中多次改变mutation可以封装一个action
 */

import * as types from './mutation-types';

export const selectList = function ({commit, state}, {list, index}) {
  commit(types.SET_CITY_LIST, list);
  commit(types.SET_PLAY, false);
  commit(types.SET_FULL_SCREEN, true);
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
*  actions类似mutation
*  区别：
*  1：action提交的是mutation
*  2：action可以包含任意异步操作
*/</span>

<span class="hljs-comment">/*
 * 使用：
 *  1：在一个动作中多次改变mutation可以封装一个action
 */</span>

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutation-types'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> selectList = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{commit, state}, {list, index}</span>) </span>{
  commit(types.SET_CITY_LIST, list);
  commit(types.SET_PLAY, <span class="hljs-literal">false</span>);
  commit(types.SET_FULL_SCREEN, <span class="hljs-literal">true</span>);
};
</code></pre>
<h3 id="articleHeader7">2.6 index.js入口</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
* 入口
*/

import Vue from 'vue';
import Vuex from 'vuex';

// import * as obj from 'xxxx'; 会将xxxx中所有export导出的内容组合成一个对象返回。
import * as actions from './actions';

// 拿到getters里面的映射
import * as getters from './getter';
import state from './state';
import mutations from './mutations';
import createdLogger from 'vuex/dist/logger';

Vue.use(Vuex);
const debug = process.env.NODE_ENV != 'production';

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createdLogger()] : []
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
* 入口
*/</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;

<span class="hljs-comment">// import * as obj from 'xxxx'; 会将xxxx中所有export导出的内容组合成一个对象返回。</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions'</span>;

<span class="hljs-comment">// 拿到getters里面的映射</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> getters <span class="hljs-keyword">from</span> <span class="hljs-string">'./getter'</span>;
<span class="hljs-keyword">import</span> state <span class="hljs-keyword">from</span> <span class="hljs-string">'./state'</span>;
<span class="hljs-keyword">import</span> mutations <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutations'</span>;
<span class="hljs-keyword">import</span> createdLogger <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex/dist/logger'</span>;

Vue.use(Vuex);
<span class="hljs-keyword">const</span> debug = process.env.NODE_ENV != <span class="hljs-string">'production'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  <span class="hljs-attr">strict</span>: debug,
  <span class="hljs-attr">plugins</span>: debug ? [createdLogger()] : []
});
</code></pre>
<h2 id="articleHeader8">三 使用</h2>
<h3 id="articleHeader9">3.1 在mian.js注册store</h3>
<p>在main.js里面new的Vue的实例里面注册store</p>
<h3 id="articleHeader10">3.2 写入值，要在组件中引入mapMutations的语法糖</h3>
<h4>1. 引入语法糖</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {mapMutations, mapActions} from 'vuex';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> {mapMutations, mapActions} <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;</code></pre>
<h4>2. 在methods里面mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...mapMutations({
  // 这里和mutation里面的常量做一个映射
  setCity: 'SET_CITY'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">...mapMutations({
  <span class="hljs-comment">// 这里和mutation里面的常量做一个映射</span>
  setCity: <span class="hljs-string">'SET_CITY'</span>
})</code></pre>
<h4>3. 在需要的地方写入值</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setCity(city);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.setCity(city);</code></pre>
<h3 id="articleHeader11">3.3获取值</h3>
<p>获得vuex中的值，要在组件中引入mapGetters（mapGetters 辅助函数仅仅是将 store 中的 getters 映射到局部计算属性）</p>
<h4>1.引入mapGetters</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {mapGetters} from 'vuex';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> {mapGetters} <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;</code></pre>
<h4>2.在computed计算属性里面使用对象展开运算符将 getters 混入 computed 对象中</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
    // 这里面的city映射的是state.js里面的city
    // 可以映射多个值
    ...mapGetters([
      'city',
      'cityList',
      'palyer',
      'fullScreen'
    ])
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">computed: {
    <span class="hljs-comment">// 这里面的city映射的是state.js里面的city</span>
    <span class="hljs-comment">// 可以映射多个值</span>
    ...mapGetters([
      <span class="hljs-string">'city'</span>,
      <span class="hljs-string">'cityList'</span>,
      <span class="hljs-string">'palyer'</span>,
      <span class="hljs-string">'fullScreen'</span>
    ])
  }</code></pre>
<h4>3.拿到值</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created() {
    console.log(this.city);
    console.log(this.cityList[1]);
    console.log(this.palyer);
    console.log(this.fullScreen);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">created() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.city);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.cityList[<span class="hljs-number">1</span>]);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.palyer);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.fullScreen);
  }</code></pre>
<h3 id="articleHeader12">3.4 action存入值</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...mapActions(['selectList'])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">...mapActions([<span class="hljs-string">'selectList'</span>])</code></pre>
<p>在需要存入的地方使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.selectList({
  list: this.citys,
  index: 1
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.selectList({
  <span class="hljs-attr">list</span>: <span class="hljs-keyword">this</span>.citys,
  <span class="hljs-attr">index</span>: <span class="hljs-number">1</span>
});</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuex的简单使用

## 原文链接
[https://segmentfault.com/a/1190000013656746](https://segmentfault.com/a/1190000013656746)

