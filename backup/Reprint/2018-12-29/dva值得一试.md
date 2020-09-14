---
title: 'dva值得一试' 
date: 2018-12-29 2:30:10
hidden: true
slug: 6klc5egm705
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="http://realtcg.com/2017/08/25/dva%E5%80%BC%E5%BE%97%E4%B8%80%E8%AF%95/" rel="nofollow noreferrer" target="_blank">原文地址</a>在我的博客, 转载请注明出处，谢谢！</p></blockquote>
<h3 id="articleHeader0">前言</h3>
<p>使用React技术栈管理大型复杂的应用往往要使用Redux来管理应用的状态，然而随着深度使用，Redux也暴露出了一些问题。如编写页面配套（action、reducer）过于繁琐、复杂，组件之间耦合较深、不够扁平化、调用action creator发起动作破坏action纯洁性且必须层层传递等。这些缺点迫使使用Redux的人开始探索好的架构方式，解决或减轻使用Redux的问题。业界标杆阿里为此推出了dva 和 Mirror两种改良Redux的架构方案，不过这两者类似，本文就介绍一下dva。</p>
<h3 id="articleHeader1">概述</h3>
<p>本文介绍了dva的产生背景，dva是什么，用来做什么，解决了什么问题，使用场景，原理，实践以及我的使用心得。</p>
<h3 id="articleHeader2">背景</h3>
<p>Redux 文档中介绍，我们需要编写页面的action creator来提交，需要写reducer来更新state，最好对action 和 reducer 做页面为单位的分割，利用redux 给的API 构建容器组件包裹父组件来connect store拿到数据，然后再向下传递给functional component 来渲染，整个过程就实现了单向数据流。当应用复杂起来，一般的做法是配合react-router 做页面分割，光这个分割，你就得 做redux store 的创建，中间件的配置，路由的初始化，Provider 的 store 的绑定，saga 的初始化，还要处理 reducer, component, saga之间的联系...这个没办法，Redux就这么复杂；但是每个页面下要有自己对应的action、reducer，一般还会有saga，这样的话每个页面下都要有四五个文件目录（还有components、containers），每个文件目录下估计还要有不同功能的action、reducer、saga...如果这能忍的话，你在组件里发起action有两个方案，第一：调用经过<strong>层层传递</strong>的action creator 或者 sagas，第二，让saga监听action，再在组件里直接dispatch相应action类型就行了，不用层层传递，但是得提前 fork -&gt; watcher -&gt; worker.....真的是非常复杂，容易出错。</p>
<h3 id="articleHeader3">dva 是什么</h3>
<p>dva名字取自游戏守望先锋里的一个驾驶机甲的韩国英雄叫dva，大概含义就是Redux的机甲吧...</p>
<p>确实,</p>
<blockquote><p>dva 是基于现有应用架构 (redux + react-router + redux-saga 等)的一层轻量封装，没有引入任何新概念，全部代码不到 100 行。( Inspired by elm and choo. )</p></blockquote>
<p>dva 帮你自动化了Redux 架构一些繁琐的步骤，比如上面所说的redux store 的创建，中间件的配置，路由的初始化等等,没有什么魔法，只是帮你做了redux + react-router + redux-saga 架构的那些恶心、繁琐、容易出错的步骤，只需写几行代码就可以实现上述步骤，它解决了背景所说的所有缺点。<a href="https://github.com/dvajs/dva/issues/1" rel="nofollow noreferrer" target="_blank">dva介绍</a></p>
<p>此外，dva重要的特性就是把一个路由下的state、reducer、sagas 写到一块了，清晰明了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.model({
  namespace: 'products', //分割的路由，对应要combine到root Reducer里的名字，这里就是state.products
  state: {  //这个路由下初始state
    list: [],
    loading: false,
  },
  subscriptions: [  //用来监听路径变化，这里就是当路由为products时dispatch一个获取数据的请求
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === 'products') {
          //dispatch({ type: 'getUserInfo', payload: {} });
        }
      });
    },
  },
  ],
  effects: { //saga里的effects，里面的各种处理异步操作的saga
    ['products/query']: function*() {
      yield call(delay(800));
      yield put({
        type: 'products/query/success',
        payload: ['ant-tool', 'roof'],
      });
    },
  },
  reducers: {  // reducers 
    ['products/query'](state) {
      return { ...state, loading: true, };
    },
    ['products/query/success'](state, { payload }) {
      return { ...state, loading: false, list: payload };
    },
  },
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.model({
  <span class="hljs-attr">namespace</span>: <span class="hljs-string">'products'</span>, <span class="hljs-comment">//分割的路由，对应要combine到root Reducer里的名字，这里就是state.products</span>
  state: {  <span class="hljs-comment">//这个路由下初始state</span>
    list: [],
    <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
  },
  <span class="hljs-attr">subscriptions</span>: [  <span class="hljs-comment">//用来监听路径变化，这里就是当路由为products时dispatch一个获取数据的请求</span>
    setup({ dispatch, history }) {
      <span class="hljs-keyword">return</span> history.listen(<span class="hljs-function">(<span class="hljs-params">{ pathname }</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (pathname === <span class="hljs-string">'products'</span>) {
          <span class="hljs-comment">//dispatch({ type: 'getUserInfo', payload: {} });</span>
        }
      });
    },
  },
  ],
  <span class="hljs-attr">effects</span>: { <span class="hljs-comment">//saga里的effects，里面的各种处理异步操作的saga</span>
    [<span class="hljs-string">'products/query'</span>]: <span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">yield</span> call(delay(<span class="hljs-number">800</span>));
      <span class="hljs-keyword">yield</span> put({
        <span class="hljs-attr">type</span>: <span class="hljs-string">'products/query/success'</span>,
        <span class="hljs-attr">payload</span>: [<span class="hljs-string">'ant-tool'</span>, <span class="hljs-string">'roof'</span>],
      });
    },
  },
  <span class="hljs-attr">reducers</span>: {  <span class="hljs-comment">// reducers </span>
    [<span class="hljs-string">'products/query'</span>](state) {
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span>, };
    },
    [<span class="hljs-string">'products/query/success'</span>](state, { payload }) {
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">list</span>: payload };
    },
  },
});</code></pre>
<h3 id="articleHeader4">dva的思想</h3>
<p><a href="https://github.com/dvajs/dva/blob/master/docs/Concepts_zh-CN.md" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<p>dva就是把之前Redux每个路由下的state、reducer、sagas写到一块去了，做了写到一块去也能做到以前redux能做的事，并且让思路变得很清晰 ：</p>
<p>每个路由下都有一个model，这个model掌管这个路由的所有状态（action、state、reducer、sagas），组件想改变状态dispatch type名字就行了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010645726" src="https://static.alili.tech/img/remote/1460000010645726" alt="img" title="img" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">实践</h3>
<p>搞懂框架的脚手架是快速上手这个框架的一个好方法，下面是dva-cli</p>
<h4>项目架构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── src                    
    ├── assets             # 图片、logo
    ├── components         # 公用UI组件
    ├── index.css          # CSS for entry file
    ├── index.html         # HTML for entry file
    ├── index.js           # 入口文件
    ├── models             # 这里存放的就是上面说的dva的model，最好每个路由一个model
    ├── router.js          # 路由文件
    ├── routes             # 路由组件，跟Redux相同
    ├── services           # 每个页面的services，通常是获取后端数据的接口定义
    └── utils              # 存放一些工具
        └── request.js     # 这里封装一个用来与后端通信的接口
├── .editorconfig          #
├── .eslintrc              # Eslint config
├── .gitignore             #
├── .roadhogrc             # Roadhog config
└── package.json           #" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>.
├── src                    
    ├── assets             <span class="hljs-comment"># 图片、logo</span>
    ├── components         <span class="hljs-comment"># 公用UI组件</span>
    ├── index.css          <span class="hljs-comment"># CSS for entry file</span>
    ├── index.html         <span class="hljs-comment"># HTML for entry file</span>
    ├── index.<span class="hljs-keyword">js </span>          <span class="hljs-comment"># 入口文件</span>
    ├── models             <span class="hljs-comment"># 这里存放的就是上面说的dva的model，最好每个路由一个model</span>
    ├── router.<span class="hljs-keyword">js </span>         <span class="hljs-comment"># 路由文件</span>
    ├── routes             <span class="hljs-comment"># 路由组件，跟Redux相同</span>
    ├── services           <span class="hljs-comment"># 每个页面的services，通常是获取后端数据的接口定义</span>
    └── utils              <span class="hljs-comment"># 存放一些工具</span>
        └── request.<span class="hljs-keyword">js </span>    <span class="hljs-comment"># 这里封装一个用来与后端通信的接口</span>
├── .editorconfig          <span class="hljs-comment">#</span>
├── .eslintrc              <span class="hljs-comment"># Eslint config</span>
├── .gitignore             <span class="hljs-comment">#</span>
├── .roadhogrc             <span class="hljs-comment"># Roadhog config</span>
└── package.<span class="hljs-keyword">json </span>          <span class="hljs-comment">#</span></code></pre>
<p>按照dva的架构，每个路由下都有个model层，在model定义好这个路由的initialstate、reducers、sagas、subscriptions；然后connect组件，当在组件里发起action时，直接dispatch就行了，dva会帮你自动调用sagas/reducers。当发起同步action时，type写成<code>'(namespace)/(reducer)'</code>dva就帮你调用对应名字的reducer直接更新state，当发起异步action，type就写成<code>'(namespace)/(saga)'</code>,dva就帮你调用对应名字的saga异步更新state，非常方便：</p>
<p>在组件里：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ...
  const { dispatch } = this.props
  dispatch({
    type: 'namespace/sagas', //这里的type规范为model里面定义的namespace和effects下面定义的sagas或者    
    payload: {               // reducers,这样就能实现自动调用这些函数
      ...
    }
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  ...
  const { dispatch } = <span class="hljs-keyword">this</span>.props
  dispatch({
    <span class="hljs-attr">type</span>: <span class="hljs-string">'namespace/sagas'</span>, <span class="hljs-comment">//这里的type规范为model里面定义的namespace和effects下面定义的sagas或者    </span>
    payload: {               <span class="hljs-comment">// reducers,这样就能实现自动调用这些函数</span>
      ...
    }
  })</code></pre>
<p><strong>注意，</strong>dispatch用来更新state某个数据后，下一步从state拿到的这个数据并不是更新后的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
  const { dispatch, data } = this.props
  dispatch({
    type: 'namespace/sagas', //这里的type规范为model里面定义的namespace和effects下面定义的sagas或者    
    payload: {               // reducers,这样就能实现自动调用这些函数
      data      //这里想更新data
    }
  })
  console.log(data) // 仍然是之前的数据，并不是dispatch更新后的数据
                      // 因为dispatch是异步的，如同React的setState后面打印state" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">...
  const { dispatch, data } = <span class="hljs-keyword">this</span>.props
  dispatch({
    <span class="hljs-attr">type</span>: <span class="hljs-string">'namespace/sagas'</span>, <span class="hljs-comment">//这里的type规范为model里面定义的namespace和effects下面定义的sagas或者    </span>
    payload: {               <span class="hljs-comment">// reducers,这样就能实现自动调用这些函数</span>
      data      <span class="hljs-comment">//这里想更新data</span>
    }
  })
  <span class="hljs-built_in">console</span>.log(data) <span class="hljs-comment">// 仍然是之前的数据，并不是dispatch更新后的数据</span>
                      <span class="hljs-comment">// 因为dispatch是异步的，如同React的setState后面打印state</span></code></pre>
<p>此外，由于不用层层传递action creator，<code>mapDispatchToProps</code>就不用再写了，组件之间的耦合度也降低了，或者说根本没有关系了，dva使组件之间的关系变得更加扁平化,没有什么父子、兄弟关系，这样组件就具有很高的可重用性。所有需要在组件里通信的数据都要放在state中，然后connect组件，只拿到组件关心的数据，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  ...
}
 
function mapStateToProps(state) {
  const {
    data
  } = state.user;  // user 对应namespace
  const loading = state.loading.effects['user/fetch'];
  return {
    data,
    loading
  };
}
export default connect(mapStateToProps)(User);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  ...
}
 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapStateToProps</span>(<span class="hljs-params">state</span>) </span>{
  <span class="hljs-keyword">const</span> {
    data
  } = state.user;  <span class="hljs-comment">// user 对应namespace</span>
  <span class="hljs-keyword">const</span> loading = state.loading.effects[<span class="hljs-string">'user/fetch'</span>];
  <span class="hljs-keyword">return</span> {
    data,
    loading
  };
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps)(User);</code></pre>
<p>这样写，除了具有很高的重用性，也避免了父组件更新，子组件也会随之更新的缺点了！只要这个组件关心的数据没变，它就不会重新渲染，省掉了重写shouldComponentUpdate来提高性能，逻辑也变得清晰、简单起来！</p>
<p>另外，model下有个<code>subscriptions</code>用于订阅一个数据源，可以在这里面监听路由变化，比如当路由跳转到本页面时，发起请求来获取初始数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="subscriptions: {
    setup: ({ history, dispatch }) => history.listen(({ pathname, query }) => {
      if (pathname === '/user') {
        dispatch({
          type: 'fetch',
          payload: {
            query
          }
        });
      }
    }),
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">subscriptions: {
    <span class="hljs-attr">setup</span>: <span class="hljs-function">(<span class="hljs-params">{ history, dispatch }</span>) =&gt;</span> history.listen(<span class="hljs-function">(<span class="hljs-params">{ pathname, query }</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (pathname === <span class="hljs-string">'/user'</span>) {
        dispatch({
          <span class="hljs-attr">type</span>: <span class="hljs-string">'fetch'</span>,
          <span class="hljs-attr">payload</span>: {
            query
          }
        });
      }
    }),
  },
};</code></pre>
<h3 id="articleHeader6">问题</h3>
<p>使用没多久，了解较浅，暂时没发现什么问题</p>
<h3 id="articleHeader7">总结</h3>
<p>dva框架封装了Redux 架构一些繁琐、复杂的步骤和常用库，使用dva，不会构建Redux架构也可以，dva帮你做好了;</p>
<p>dva 降低了组件之间的耦合度，没有父子、兄弟组件的关系，提高了组件可重用性以及渲染性能，使思路变得简单清晰；</p>
<p>dva架构思路清晰，代码书写方式固定，有利于团队合作，但可扩展性不强</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
dva值得一试

## 原文链接
[https://segmentfault.com/a/1190000011523348](https://segmentfault.com/a/1190000011523348)

