---
title: '基于Mobx的多页面小程序的全局共享状态管理实践' 
date: 2019-01-06 2:30:10
hidden: true
slug: 06claelu7w48
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">what</h2>
<ul>
<li><p>名字很长很绕靠口，总的来说，本文是对开发小程序过程中使用<code>mobx</code>的一个总结。</p></li>
<li><p>状态管理，相比大家也很熟悉，顾名思义，是对前端页面繁复的状态进行管理，在此，我也不过多赘述。</p></li>
<li><p>所以虽然是是用在小程序上，不过我想对于<code>WebApp</code>的状态管理，也有这么一丢丢启发。</p></li>
</ul>
<h2 id="articleHeader1">why</h2>
<ul>
<li><p>为什么要进行状态管理？   <br>现在的小程序俨然是<code>Hybrid App</code>，又像是<code>PWA</code>，但当然也是一个<code>WebApp</code>，更不用说他的语法和<code>vue</code>略微有这么一丢丢相似。有<code>react</code>和<code>vue</code>的实践在前，所以对于小程序上那么多的页面状态和数据缓存，势必也要引入一个状态管理工具</p></li>
<li><p>为什么是mobx   <br>方便，快捷，学习成本低，当然也是仁者见仁智者见智</p></li>
</ul>
<h2 id="articleHeader2">how</h2>
<ol>
<li><p>在小程序中引入mobx  <br>在这里我使用了<a href="https://github.com/80percent/wechat-weapp-mobx" rel="nofollow noreferrer" target="_blank">wechat-weapp-mobx</a>这个库。在<code>./libs</code>目录下放入<code>mobx.js</code>和<code>observer.js</code>这两个库，同时在<code>./store</code>目录下新建<code>store.js</code>用于存放全局状态。</p></li>
<li>
<p>建立store<br>由于小程序中不支持<code>@decorate</code>装饰器，所以采用了<code>extendObservable</code>的写法。另外，小程序支持<code>import</code>语法和<code>require</code>语法。我比较喜欢<code>import</code>语法，你们呢？我认为在<code>action</code>中不该写入复杂逻辑代码，保持简洁性和可复用性，你们怎么看</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// store.js
// 引入必须的库
const mobx = require('../libs/mobx');
const extendObservable = require('../libs/mobx').extendObservable;
const computed = require('../libs/mobx').computed;
const toJS = require('../libs/mobx').toJS;

let store = function () {
  extendObservable(this, {

    // observable data
    players: [],

    // computed data
    get count() {
      return this.players.length;
    }
  });

  // action
  this.addPlayer = name => {
    let len = this.count;    //此处调用computed data
    let id = len === 0 ? 1 : this.players[len - 1].id + 1;
    this.players.push(new player(name, id));
  }
}

export default store;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// store.js</span>
<span class="hljs-comment">// 引入必须的库</span>
<span class="hljs-keyword">const</span> mobx = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../libs/mobx'</span>);
<span class="hljs-keyword">const</span> extendObservable = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../libs/mobx'</span>).extendObservable;
<span class="hljs-keyword">const</span> computed = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../libs/mobx'</span>).computed;
<span class="hljs-keyword">const</span> toJS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../libs/mobx'</span>).toJS;

<span class="hljs-keyword">let</span> store = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  extendObservable(<span class="hljs-keyword">this</span>, {

    <span class="hljs-comment">// observable data</span>
    players: [],

    <span class="hljs-comment">// computed data</span>
    get count() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.players.length;
    }
  });

  <span class="hljs-comment">// action</span>
  <span class="hljs-keyword">this</span>.addPlayer = <span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> len = <span class="hljs-keyword">this</span>.count;    <span class="hljs-comment">//此处调用computed data</span>
    <span class="hljs-keyword">let</span> id = len === <span class="hljs-number">0</span> ? <span class="hljs-number">1</span> : <span class="hljs-keyword">this</span>.players[len - <span class="hljs-number">1</span>].id + <span class="hljs-number">1</span>;
    <span class="hljs-keyword">this</span>.players.push(<span class="hljs-keyword">new</span> player(name, id));
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;
</code></pre>
</li>
<li>
<p>全局引入store  <br>众所周知，使用<code>mobx</code>的<code>store</code>要使用<code>new store()</code>,如果我们想全局调用，势必不可能在每个页面都<code>new</code>一个<code>sotre</code>，因为这样的话每个页面的<code>store</code>都是一个全新的<code>store</code>。在这里，我在<code>app.js</code>里引入<code>store</code>，并挂载在全局变量<code>globalData</code>下。另外，小程序中不支持路径的省略。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.js
const observer = require('./libs/observer').observer;
import store from './stores/index';  // 小程序中不支持省略调用

App(observer({
  onLaunch: function () {
  },
  globalData: {
    store: new store()
  }
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//app.js</span>
<span class="hljs-keyword">const</span> observer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./libs/observer'</span>).observer;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./stores/index'</span>;  <span class="hljs-comment">// 小程序中不支持省略调用</span>

App(observer({
  <span class="hljs-attr">onLaunch</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  },
  <span class="hljs-attr">globalData</span>: {
    <span class="hljs-attr">store</span>: <span class="hljs-keyword">new</span> store()
  }
}))</code></pre>
</li>
<li>
<p>在pages里调用全局的store   <br>可以同时使用内置的<code>data</code>进行双向绑定哦</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
const observer = require('../../libs/observer').observer;

let app = getApp();
Page(observer({
  data: {
    mes: 'hello jim green'
  },
  props: {
    store: app.globalData.store
  },
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">const</span> observer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../libs/observer'</span>).observer;

<span class="hljs-keyword">let</span> app = getApp();
Page(observer({
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">mes</span>: <span class="hljs-string">'hello jim green'</span>
  },
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">store</span>: app.globalData.store
  },
}))</code></pre>
</li>
<li>
<p>在页面中调用store</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<view class=&quot;players-list&quot;>
  <view class=&quot;players-item&quot; wx:for=&quot;"{{"props.store.players"}}"&quot; wx:key=&quot;"{{"item.id"}}"&quot;>    // 调用observable data
    <text class=&quot;players&quot;>"{{"item.id"}}":"{{"item.name"}}"</text>
  </view>
  <view>"{{"props.sotre.count"}}"</view>    //  调用computed data
</view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"players-list"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"players-item"</span> <span class="hljs-attr">wx:for</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"props.store.players"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">wx:key</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"item.id"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>    // 调用observable data
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"players"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.id"}}"</span><span class="xml">:</span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span>&gt;</span></span><span class="hljs-template-variable">"{{"props.sotre.count"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>    //  调用computed data
<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></span></code></pre>
</li>
<li>
<p>更新多个页面的store   <br>问题来了，这个时候，多个页面的<code>store</code>还是独立的，如何全部更新呢？答案就是在<code>onShow</code>和<code>onHide</code>或者<code>onUnload</code>这三个生命周期函数中跟新全局的<code>store</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onShow: function() {    // 显示时更新本页面store
  this.props.store = app.globalData.store
},
onHide: function() {   // 隐藏时更新全局store
  app.globalData.store = this.props.store;
},
onUnload: function() {    // 页面跳转返回时更新全局store
  app.globalData.store = this.props.store;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>onShow: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{    <span class="hljs-comment">// 显示时更新本页面store</span>
  <span class="hljs-keyword">this</span>.props.store = app.globalData.store
},
onHide: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{   <span class="hljs-comment">// 隐藏时更新全局store</span>
  app.globalData.store = <span class="hljs-keyword">this</span>.props.store;
},
onUnload: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{    <span class="hljs-comment">// 页面跳转返回时更新全局store</span>
  app.globalData.store = <span class="hljs-keyword">this</span>.props.store;
},</code></pre>
</li>
<li>
<p>store和localStorage的长效存储<br>考虑到网络还有程序崩溃的问题，我将<code>store</code>存储在<code>localStorage</code>中以便恢复，我在<code>index.js</code>的<code>onLoad</code>中调用<code>get storage</code>，在<code>onHide</code>中<code>set storage</code>。由于<code>toJS</code>方法返回了一个不支持<code>[Symbol.iterator]()</code>的对象，所以在store里进行了如下设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
onLoad: function () {
  let store = wx.getStorageSync('store');
  if(store) {
    this.props.store.formStorageToStore(store);
  }
},
onHide: function () {
  
  let store =this.props.store.currentStore;
  wx.setStorageSync('store', store)
},

// store.js
  get currentStore() {
    let {players,games,currentGame,hidden,filter} = toJS(this);
    return {players,games,currentGame,hidden,filter};
  }
  this.formStorageToStore = ({players,games,currentGame,hidden,filter}) => {
    this.players = players;
    this.games = games;
    this.currentGame = currentGame;
    this.hidden = hidden;
    this.filter = filter;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// index.js</span>
onLoad: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> store = wx.getStorageSync(<span class="hljs-string">'store'</span>);
  <span class="hljs-keyword">if</span>(store) {
    <span class="hljs-keyword">this</span>.props.store.formStorageToStore(store);
  }
},
<span class="hljs-attr">onHide</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  
  <span class="hljs-keyword">let</span> store =<span class="hljs-keyword">this</span>.props.store.currentStore;
  wx.setStorageSync(<span class="hljs-string">'store'</span>, store)
},

<span class="hljs-comment">// store.js</span>
  get currentStore() {
    <span class="hljs-keyword">let</span> {players,games,currentGame,hidden,filter} = toJS(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">return</span> {players,games,currentGame,hidden,filter};
  }
  <span class="hljs-keyword">this</span>.formStorageToStore = <span class="hljs-function">(<span class="hljs-params">{players,games,currentGame,hidden,filter}</span>) =&gt;</span> {
    <span class="hljs-keyword">this</span>.players = players;
    <span class="hljs-keyword">this</span>.games = games;
    <span class="hljs-keyword">this</span>.currentGame = currentGame;
    <span class="hljs-keyword">this</span>.hidden = hidden;
    <span class="hljs-keyword">this</span>.filter = filter;
  }</code></pre>
</li>
</ol>
<h2 id="articleHeader3">others</h2>
<p>讲点其他</p>
<ul><li><p>本项目的示例小程序地址<a href="https://github.com/laihaibo/weapp-bmscore" rel="nofollow noreferrer" target="_blank">weapp-bmscore</a>，欢迎各位老铁点个关注666</p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Mobx的多页面小程序的全局共享状态管理实践

## 原文链接
[https://segmentfault.com/a/1190000010372573](https://segmentfault.com/a/1190000010372573)

