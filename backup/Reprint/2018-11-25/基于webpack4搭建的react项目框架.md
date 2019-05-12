---
title: '基于webpack4搭建的react项目框架' 
date: 2018-11-25 2:30:08
hidden: true
slug: xn012ye2bug
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4ECB;&#x7ECD;</h2><p>&#x6846;&#x67B6;&#x4ECB;&#x7ECD;&#xFF0C;&#x4F7F;&#x7528;webpac&#x6784;&#x5EFA;&#x7684;react&#x5355;&#x9875;&#x9762;&#x5E94;&#x7528;&#xFF0C;&#x96C6;&#x6210;antd&#x3002;&#x4F7F;&#x7528;webpack-dev-server&#x542F;&#x52A8;&#x672C;&#x5730;&#x670D;&#x52A1;&#xFF0C;&#x52A0;&#x5165;&#x70ED;&#x66F4;&#x65B0;&#x4FBF;&#x4E8E;&#x5F00;&#x53D1;&#x8C03;&#x8BD5;&#x3002;&#x4F7F;&#x7528;bundle-loader&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x5207;&#x5272;&#x61D2;&#x52A0;&#x8F7D;<br>&#x624B;&#x52A8;&#x642D;&#x5EFA;&#xFF0C;&#x4E0D;&#x4F7F;&#x7528;cli&#xFF0C;&#x5927;&#x91CF;&#x6CE8;&#x91CA;&#x9002;&#x5408;&#x521D;&#x5B66;&#x8005;&#x5BF9;webpack&#x7684;&#x7406;&#x89E3;&#x5B66;&#x4E60;&#xFF0C;&#x5BF9;react&#x9879;&#x76EE;&#x7684;&#x6DF1;&#x5165;&#x4E86;&#x89E3;</p><h3 id="articleHeader1">&#x542F;&#x52A8;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  git clone https://gitee.com/wjj0720/react-demo.git
  cd react-demo
  yarn
  yarn start" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">  git clone https:<span class="hljs-comment">//gitee.com/wjj0720/react-demo.git</span>
  cd react-demo
  yarn
  yarn start</code></pre><h3 id="articleHeader2">&#x6253;&#x5305;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  yarn build" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">  yarn build</code></pre><h3 id="articleHeader3">&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  +node_modules
  -src
    +asset
    +Layout
    +pages
    +redux
    +utils
    +app.js
    +index.html
    +index.js
  .babelrc 
  package.json 
  postcss.config.js
  webpack.config.js //webpack &#x914D;&#x7F6E;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">  +node_modules
  -src
    +asset
    +Layout
    +pages
    +redux
    +utils
    +app.js
    +index.html
    +index.js
  .babelrc 
  package.json 
  postcss.config.js
  webpack.config.js <span class="hljs-comment">//webpack &#x914D;&#x7F6E;</span></code></pre><h2 id="articleHeader4">bundle-loader &#x61D2;&#x52A0;&#x8F7D;&#x4F7F;&#x7528;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // webpack.config.js &#x914D;&#x7F6E;
  module: {
    rules: [
      {
        test: /\.bundle\.js$/,
        use: {
          loader: &apos;bundle-loader&apos;,
          options: {
            name: &apos;[name]&apos;,
            lazy: true
          }
        }
      }
    ]
  }
  // &#x9875;&#x9762;&#x5F15;&#x5165;&#x7EC4;&#x4EF6;
  import Home from &quot;bundle-loader?lazy&amp;name=[name]!./Home&quot;;

  // &#x7EC4;&#x4EF6;&#x4F7F;&#x7528; &#x56E0;&#x4E3A;&#x7EC4;&#x4EF6;&#x61D2;&#x52A0;&#x8F7D; &#x662F;&#x901A;&#x8FC7;&#x5F02;&#x6B65;&#x7684;&#x5F62;&#x5F0F;&#x5F15;&#x5165; &#x6240;&#x4EE5;&#x4E0D;&#x80FD;&#x518D;&#x9875;&#x9762;&#x76F4;&#x63A5;&#x4EE5;&#x6807;&#x7B7E;&#x7684;&#x5F62;&#x5F0F;&#x4F7F;&#x7528; &#x9700;&#x8981;&#x505A;&#x4F7F;&#x7528;&#x5C01;&#x88C5; 
  import React, {Component} from &apos;react&apos;
  import { withRouter } from &apos;react-router-dom&apos;
  class LazyLoad extends Component {
    state = {
      LoadOver: null
    }
    componentWillMount() {
      this.props.Loading(c =&gt; {
        this.setState({
          LoadOver: withRouter(c.default)
        })
      })
    }
  
    render() {
      let {LoadOver} = this.state;
      return (
        LoadOver ? &lt;LoadOver/&gt; : &lt;div&gt;&#x52A0;&#x8F7D;&#x52A8;&#x753B;&lt;/div&gt;
      )
    }
  }
  export default LazyLoad

  // &#x901A;&#x8FC7;&#x5C01;&#x88C5;&#x7684;&#x61D2;&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;&#x8FC7;&#x5EA6; &#x589E;&#x52A0;&#x52A0;&#x8F7D;&#x52A8;&#x753B;
  &lt;LazyLoad Loading={Home} /&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// webpack.config.js &#x914D;&#x7F6E;</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.bundle\.js$/</span>,
        <span class="hljs-attr">use</span>: {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;bundle-loader&apos;</span>,
          <span class="hljs-attr">options</span>: {
            <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;[name]&apos;</span>,
            <span class="hljs-attr">lazy</span>: <span class="hljs-literal">true</span>
          }
        }
      }
    ]
  }
  <span class="hljs-comment">// &#x9875;&#x9762;&#x5F15;&#x5165;&#x7EC4;&#x4EF6;</span>
  <span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;bundle-loader?lazy&amp;name=[name]!./Home&quot;</span>;

  <span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x4F7F;&#x7528; &#x56E0;&#x4E3A;&#x7EC4;&#x4EF6;&#x61D2;&#x52A0;&#x8F7D; &#x662F;&#x901A;&#x8FC7;&#x5F02;&#x6B65;&#x7684;&#x5F62;&#x5F0F;&#x5F15;&#x5165; &#x6240;&#x4EE5;&#x4E0D;&#x80FD;&#x518D;&#x9875;&#x9762;&#x76F4;&#x63A5;&#x4EE5;&#x6807;&#x7B7E;&#x7684;&#x5F62;&#x5F0F;&#x4F7F;&#x7528; &#x9700;&#x8981;&#x505A;&#x4F7F;&#x7528;&#x5C01;&#x88C5; </span>
  <span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
  <span class="hljs-keyword">import</span> { withRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-router-dom&apos;</span>
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LazyLoad</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    state = {
      <span class="hljs-attr">LoadOver</span>: <span class="hljs-literal">null</span>
    }
    componentWillMount() {
      <span class="hljs-keyword">this</span>.props.Loading(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.setState({
          <span class="hljs-attr">LoadOver</span>: withRouter(c.default)
        })
      })
    }
  
    render() {
      <span class="hljs-keyword">let</span> {LoadOver} = <span class="hljs-keyword">this</span>.state;
      <span class="hljs-keyword">return</span> (
        LoadOver ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoadOver</span>/&gt;</span></span> : <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x52A0;&#x8F7D;&#x52A8;&#x753B;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      )
    }
  }
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> LazyLoad

  <span class="hljs-comment">// &#x901A;&#x8FC7;&#x5C01;&#x88C5;&#x7684;&#x61D2;&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;&#x8FC7;&#x5EA6; &#x589E;&#x52A0;&#x52A0;&#x8F7D;&#x52A8;&#x753B;</span>
  &lt;LazyLoad Loading={Home} /&gt;</code></pre><h2 id="articleHeader5">&#x8DEF;&#x7531;&#x914D;&#x7F6E;</h2><p>&#x6846;&#x67B6;&#x6309;&#x7167;&#x6A21;&#x5757;&#x5212;&#x5206;&#xFF0C;pages&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x5177;&#x6709;route.js &#x5373;&#x4E3A;&#x4E00;&#x4E2A;&#x6A21;&#x5757;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // &#x901A;&#x8FC7;require.context&#x8BFB;&#x53D6;&#x6A21;&#x5757;&#x4E0B;&#x8DEF;&#x7531;&#x6587;&#x4EF6;
  const files = require.context(&apos;./pages&apos;, true, /route\.js$/)
  let routers = files.keys().reduce((routers, route) =&gt; {
    let router = files(route).default
    return routers.concat(router)
  }, [])

  // &#x6A21;&#x5757;&#x8DEF;&#x7531;&#x6587;&#x4EF6;&#x683C;&#x5F0F;
  import User from &quot;bundle-loader?lazy&amp;name=[name]!./User&quot;;
  export default [
    {
      path: &apos;/user&apos;,
      component: User
    },
    {
      path: &apos;/user/:id&apos;,
      component: User
    }
  ]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// &#x901A;&#x8FC7;require.context&#x8BFB;&#x53D6;&#x6A21;&#x5757;&#x4E0B;&#x8DEF;&#x7531;&#x6587;&#x4EF6;</span>
  <span class="hljs-keyword">const</span> files = <span class="hljs-built_in">require</span>.context(<span class="hljs-string">&apos;./pages&apos;</span>, <span class="hljs-literal">true</span>, /route\.js$/)
  <span class="hljs-keyword">let</span> routers = files.keys().reduce(<span class="hljs-function">(<span class="hljs-params">routers, route</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> router = files(route).default
    <span class="hljs-keyword">return</span> routers.concat(router)
  }, [])

  <span class="hljs-comment">// &#x6A21;&#x5757;&#x8DEF;&#x7531;&#x6587;&#x4EF6;&#x683C;&#x5F0F;</span>
  <span class="hljs-keyword">import</span> User <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;bundle-loader?lazy&amp;name=[name]!./User&quot;</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/user&apos;</span>,
      <span class="hljs-attr">component</span>: User
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/user/:id&apos;</span>,
      <span class="hljs-attr">component</span>: User
    }
  ]
</code></pre><h2 id="articleHeader6">redux &#x4F7F;&#x7528;&#x4ECB;&#x7ECD;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // ---------&#x521B;&#x5EFA; --------
  // &#x4E3A;&#x4E86;&#x4E0D;&#x514D;action&#x3001;reducer &#x5728;&#x4E0D;&#x540C;&#x6587;&#x4EF6; &#x6765;&#x56DE;&#x5207;&#x6362; &#x5BF9;&#x8C61;&#x7684;&#x5F62;&#x5F0F;&#x521B;&#x5EFA;

  // createReducer &#x5C06;&#x4E66;&#x5199;&#x683C;&#x5F0F;&#x521B;&#x5EFA;&#x6210;rudex&#x8BA4;&#x8BC6;&#x7684;reducer
  export function createReducer({state: initState, reducer}) {
    return (state = initState, action) =&gt; {
      return reducer.hasOwnProperty(action.type) ? reducer[action.type](state, action) : state
    }
  }

  // &#x521B;&#x5EFA;&#x9875;&#x9762;&#x7EA7;&#x522B;&#x7684;store
  const User_Info_fetch_Memo = &apos;User_Info_fetch_Memo&apos;
  const store = {
    // &#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;
    state: {
      memo: 9,
      test: 0
    },
    action: {
      async fetchMemo (params) {
        return {
          type: User_Info_fetch_Memo,
          callAPI: {url: &apos;http://stage-mapi.yimifudao.com/statistics/cc/kpi&apos;, params, config: {"}}",
          payload: params
        }
      },
      ...
    },
    reducer: {
      [User_Info_fetch_Memo] (prevState = {}, {payload}) {
        console.log(&apos;reducer---&gt;&apos;,payload)
        return {
          ...prevState,
          memo: payload.memo
        }
      },
      ...
    }
  }

  export default createReducer(store)
  export const action = store.action

  // &#x6700;&#x7EC8;&#x5728;&#x6A21;&#x5757;&#x754C;&#x522B;&#x7EC4;&#x5408; [&#x5F53;&#x7136;&#x6A21;&#x5757;&#x4E5F;&#x6709;&#x516C;&#x5171;&#x7684;&#x6570;&#x636E;(&#x89C1;Home&#x6A21;&#x5757;&#x4E0B;&#x7684;demo&#x5199;&#x6CD5;)]
  import {combineReducers} from &apos;redux&apos;
  import info from &apos;./Info/store&apos;
  export default combineReducers({
    info,
    &#x3002;&#x3002;&#x3002;
  })

  // &#x6700;&#x7EC8;rudex&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;store.js &#x4F1A;&#x53BB;&#x53D6;&#x6240;&#x6709;&#x6A21;&#x5757;&#x4E0B;&#x7684;store.js  &#x7EC4;&#x6210;&#x4E00;&#x4E2A;&#x5927;&#x7684;store&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x6700;&#x7EC8;&#x4ED3;&#x5E93;

  // --------&#x4F7F;&#x7528;------
  // &#x9996;&#x5148;&#x5728;app.js&#x4E2D;&#x5C06;store&#x548C;app&#x5173;&#x8054;
  import { createStore } from &apos;redux&apos;
  import { Provider } from &apos;react-redux&apos;
  // reducer&#x5373;&#x6211;&#x4EEC;&#x6700;&#x7EC8;
  import reducer from &apos;./redux/store.js&apos;
  // &#x7528;&#x6237;&#x5F02;&#x6B65;action&#x7684;&#x4E2D;&#x95F4;&#x4EF6;
  import middleware from &apos;./utils/middleware.js&apos;
  let store = createStore(reducer, middleware)
  &lt;Provider store={store}&gt;
    &#x3002;&#x3002;&#x3002;
  &lt;/Provider&gt;


  // &#x7136;&#x540E;&#x7EC4;&#x4EF6;&#x8C03;&#x7528; &#x53EA;&#x9700;&#x8981;&#x5728;&#x7EC4;&#x4EF6;&#x5BFC;&#x51FA;&#x65F6;&#x5019; &#x4F7F;&#x7528;connent&#x94FE;&#x63A5;&#x5373;&#x53EF;
  import React, {Component} from &apos;react&apos;
  import {connect} from &apos;react-redux&apos;
  // &#x4ECE;&#x9875;&#x9762;&#x7EA7;&#x522B;&#x7684;store&#x4E2D;&#x5BFC;&#x51FA;action
  import {action} from &apos;./store&apos;

  class Demo extends Component {
    const handle = () =&gt; {
      // &#x89E6;&#x53D1;action
      this.props.dispatch(action.fetchMemo({}))
    }
    render () {
      console.log(this.props.test)
      return &lt;div onClick={this.handle}&gt;ss&lt;/div&gt;
    }
  }
  export default connect(state =&gt; ({
    test: state.user.memo.test
  }) )(demo) 
  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// ---------&#x521B;&#x5EFA; --------</span>
  <span class="hljs-comment">// &#x4E3A;&#x4E86;&#x4E0D;&#x514D;action&#x3001;reducer &#x5728;&#x4E0D;&#x540C;&#x6587;&#x4EF6; &#x6765;&#x56DE;&#x5207;&#x6362; &#x5BF9;&#x8C61;&#x7684;&#x5F62;&#x5F0F;&#x521B;&#x5EFA;</span>

  <span class="hljs-comment">// createReducer &#x5C06;&#x4E66;&#x5199;&#x683C;&#x5F0F;&#x521B;&#x5EFA;&#x6210;rudex&#x8BA4;&#x8BC6;&#x7684;reducer</span>
  <span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createReducer</span>(<span class="hljs-params">{state: initState, reducer}</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">state = initState, action</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> reducer.hasOwnProperty(action.type) ? reducer[action.type](state, action) : state
    }
  }

  <span class="hljs-comment">// &#x521B;&#x5EFA;&#x9875;&#x9762;&#x7EA7;&#x522B;&#x7684;store</span>
  <span class="hljs-keyword">const</span> User_Info_fetch_Memo = <span class="hljs-string">&apos;User_Info_fetch_Memo&apos;</span>
  <span class="hljs-keyword">const</span> store = {
    <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;</span>
    state: {
      <span class="hljs-attr">memo</span>: <span class="hljs-number">9</span>,
      <span class="hljs-attr">test</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">action</span>: {
      <span class="hljs-keyword">async</span> fetchMemo (params) {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">type</span>: User_Info_fetch_Memo,
          <span class="hljs-attr">callAPI</span>: {<span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://stage-mapi.yimifudao.com/statistics/cc/kpi&apos;</span>, params, <span class="hljs-attr">config</span>: {"}}",
          <span class="hljs-attr">payload</span>: params
        }
      },
      ...
    },
    <span class="hljs-attr">reducer</span>: {
      [User_Info_fetch_Memo] (prevState = {}, {payload}) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;reducer---&gt;&apos;</span>,payload)
        <span class="hljs-keyword">return</span> {
          ...prevState,
          <span class="hljs-attr">memo</span>: payload.memo
        }
      },
      ...
    }
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> createReducer(store)
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> action = store.action

  <span class="hljs-comment">// &#x6700;&#x7EC8;&#x5728;&#x6A21;&#x5757;&#x754C;&#x522B;&#x7EC4;&#x5408; [&#x5F53;&#x7136;&#x6A21;&#x5757;&#x4E5F;&#x6709;&#x516C;&#x5171;&#x7684;&#x6570;&#x636E;(&#x89C1;Home&#x6A21;&#x5757;&#x4E0B;&#x7684;demo&#x5199;&#x6CD5;)]</span>
  <span class="hljs-keyword">import</span> {combineReducers} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux&apos;</span>
  <span class="hljs-keyword">import</span> info <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./Info/store&apos;</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> combineReducers({
    info,
    &#x3002;&#x3002;&#x3002;
  })

  <span class="hljs-comment">// &#x6700;&#x7EC8;rudex&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;store.js &#x4F1A;&#x53BB;&#x53D6;&#x6240;&#x6709;&#x6A21;&#x5757;&#x4E0B;&#x7684;store.js  &#x7EC4;&#x6210;&#x4E00;&#x4E2A;&#x5927;&#x7684;store&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x6700;&#x7EC8;&#x4ED3;&#x5E93;</span>

  <span class="hljs-comment">// --------&#x4F7F;&#x7528;------</span>
  <span class="hljs-comment">// &#x9996;&#x5148;&#x5728;app.js&#x4E2D;&#x5C06;store&#x548C;app&#x5173;&#x8054;</span>
  <span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux&apos;</span>
  <span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-redux&apos;</span>
  <span class="hljs-comment">// reducer&#x5373;&#x6211;&#x4EEC;&#x6700;&#x7EC8;</span>
  <span class="hljs-keyword">import</span> reducer <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./redux/store.js&apos;</span>
  <span class="hljs-comment">// &#x7528;&#x6237;&#x5F02;&#x6B65;action&#x7684;&#x4E2D;&#x95F4;&#x4EF6;</span>
  <span class="hljs-keyword">import</span> middleware <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./utils/middleware.js&apos;</span>
  <span class="hljs-keyword">let</span> store = createStore(reducer, middleware)
  &lt;Provider store={store}&gt;
    &#x3002;&#x3002;&#x3002;
  &lt;<span class="hljs-regexp">/Provider&gt;


  /</span><span class="hljs-regexp">/ &#x7136;&#x540E;&#x7EC4;&#x4EF6;&#x8C03;&#x7528; &#x53EA;&#x9700;&#x8981;&#x5728;&#x7EC4;&#x4EF6;&#x5BFC;&#x51FA;&#x65F6;&#x5019; &#x4F7F;&#x7528;connent&#x94FE;&#x63A5;&#x5373;&#x53EF;
  import React, {Component} from &apos;react&apos;
  import {connect} from &apos;react-redux&apos;
  /</span><span class="hljs-regexp">/ &#x4ECE;&#x9875;&#x9762;&#x7EA7;&#x522B;&#x7684;store&#x4E2D;&#x5BFC;&#x51FA;action
  import {action} from &apos;./</span>store<span class="hljs-string">&apos;

  class Demo extends Component {
    const handle = () =&gt; {
      // &#x89E6;&#x53D1;action
      this.props.dispatch(action.fetchMemo({}))
    }
    render () {
      console.log(this.props.test)
      return &lt;div onClick={this.handle}&gt;ss&lt;/div&gt;
    }
  }
  export default connect(state =&gt; ({
    test: state.user.memo.test
  }) )(demo) 
  </span></code></pre><h2 id="articleHeader7">&#x5173;&#x4E8E;redux&#x4E2D;&#x95F4;&#x4EF6;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // &#x4E0E;&#x5176;&#x8BF4;redux&#x4E2D;&#x95F4;&#x4EF6;&#x4E0D;&#x5982;&#x8BF4;action&#x4E2D;&#x95F4;&#x4EF6;
  // &#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x65F6;&#x673A;  &#x5373;&#x6BCF;&#x4E2A;action&#x89E6;&#x53D1;&#x4E4B;&#x524D;&#x6267;&#x884C;

  // 
  import { applyMiddleware } from &apos;redux&apos;
  import fetchProxy from &apos;./fetchProxy&apos;;

  // &#x4E2D;&#x95F4;&#x4EF6; &#x662F;&#x4E09;&#x4E2A;&#x5D4C;&#x5957;&#x7684;&#x51FD;&#x6570; &#x7B2C;&#x4E00;&#x4E2A;&#x5165;&#x53C2;&#x4E3A;&#x6574;&#x4E2A;store &#x7B2C;&#x4E8C;&#x4E2A;&#x4E3A;store.dispatch &#x7B2C;&#x4E09;&#x4E2A;&#x4E3A;&#x672C;&#x6B21;&#x89E6;&#x53D1;&#x7684;action 
  // &#x7B80;&#x5355;&#x5C01;&#x88C5;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;  &#x6CA1;&#x6709;&#x5BF9;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&#x505A;&#x8FC7;&#x591A;&#x5904;&#x7406; &#x76EE;&#x7684;&#x5728;&#x4E0E;&#x9879;&#x9519;&#x8BEF;&#x5904;&#x7406;&#x673A;&#x5236;&#x7ED9;&#x5230;&#x9875;&#x9762;&#x5904;&#x7406;
  const middleware = ({getState}) =&gt; next =&gt; async action =&gt; {
    // &#x6B64;&#x65F6;&#x7684;aciton&#x8FD8;&#x6CA1;&#x6709;&#x88AB;&#x6267;&#x884C; 
    const {type, callAPI, payload} = await action
    // &#x6CA1;&#x6709;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;action
    if (!callAPI) return next({type, payload})
    // &#x8BF7;&#x6C42;&#x6570;&#x636E;
    const res = await fetchProxy(callAPI)
    // &#x8BF7;&#x6C42;&#x6570;&#x636E;&#x5931;&#x8D25; &#x63D0;&#x793A;
    if (res.status !== 200)  return console.log(&apos;&#x7F51;&#x7EDC;&#x9519;&#x8BEF;&#xFF01;&apos;)
    // &#x8BF7;&#x6C42;&#x6210;&#x529F; &#x8FD4;&#x56DE;data
    return next({type, payload: res.data})
  }
  export default applyMiddleware(middleware)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// &#x4E0E;&#x5176;&#x8BF4;redux&#x4E2D;&#x95F4;&#x4EF6;&#x4E0D;&#x5982;&#x8BF4;action&#x4E2D;&#x95F4;&#x4EF6;</span>
  <span class="hljs-comment">// &#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x65F6;&#x673A;  &#x5373;&#x6BCF;&#x4E2A;action&#x89E6;&#x53D1;&#x4E4B;&#x524D;&#x6267;&#x884C;</span>

  <span class="hljs-comment">// </span>
  <span class="hljs-keyword">import</span> { applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux&apos;</span>
  <span class="hljs-keyword">import</span> fetchProxy <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./fetchProxy&apos;</span>;

  <span class="hljs-comment">// &#x4E2D;&#x95F4;&#x4EF6; &#x662F;&#x4E09;&#x4E2A;&#x5D4C;&#x5957;&#x7684;&#x51FD;&#x6570; &#x7B2C;&#x4E00;&#x4E2A;&#x5165;&#x53C2;&#x4E3A;&#x6574;&#x4E2A;store &#x7B2C;&#x4E8C;&#x4E2A;&#x4E3A;store.dispatch &#x7B2C;&#x4E09;&#x4E2A;&#x4E3A;&#x672C;&#x6B21;&#x89E6;&#x53D1;&#x7684;action </span>
  <span class="hljs-comment">// &#x7B80;&#x5355;&#x5C01;&#x88C5;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;  &#x6CA1;&#x6709;&#x5BF9;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&#x505A;&#x8FC7;&#x591A;&#x5904;&#x7406; &#x76EE;&#x7684;&#x5728;&#x4E0E;&#x9879;&#x9519;&#x8BEF;&#x5904;&#x7406;&#x673A;&#x5236;&#x7ED9;&#x5230;&#x9875;&#x9762;&#x5904;&#x7406;</span>
  <span class="hljs-keyword">const</span> middleware = <span class="hljs-function">(<span class="hljs-params">{getState}</span>) =&gt;</span> next =&gt; <span class="hljs-keyword">async</span> action =&gt; {
    <span class="hljs-comment">// &#x6B64;&#x65F6;&#x7684;aciton&#x8FD8;&#x6CA1;&#x6709;&#x88AB;&#x6267;&#x884C; </span>
    <span class="hljs-keyword">const</span> {type, callAPI, payload} = <span class="hljs-keyword">await</span> action
    <span class="hljs-comment">// &#x6CA1;&#x6709;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;action</span>
    <span class="hljs-keyword">if</span> (!callAPI) <span class="hljs-keyword">return</span> next({type, payload})
    <span class="hljs-comment">// &#x8BF7;&#x6C42;&#x6570;&#x636E;</span>
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetchProxy(callAPI)
    <span class="hljs-comment">// &#x8BF7;&#x6C42;&#x6570;&#x636E;&#x5931;&#x8D25; &#x63D0;&#x793A;</span>
    <span class="hljs-keyword">if</span> (res.status !== <span class="hljs-number">200</span>)  <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x7F51;&#x7EDC;&#x9519;&#x8BEF;&#xFF01;&apos;</span>)
    <span class="hljs-comment">// &#x8BF7;&#x6C42;&#x6210;&#x529F; &#x8FD4;&#x56DE;data</span>
    <span class="hljs-keyword">return</span> next({type, <span class="hljs-attr">payload</span>: res.data})
  }
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> applyMiddleware(middleware)
</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于webpack4搭建的react项目框架

## 原文链接
[https://segmentfault.com/a/1190000015430721](https://segmentfault.com/a/1190000015430721)

