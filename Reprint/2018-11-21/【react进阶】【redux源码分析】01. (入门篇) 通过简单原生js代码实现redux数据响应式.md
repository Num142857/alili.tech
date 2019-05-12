---
title: '【react进阶】【redux源码分析】01. (入门篇) 通过简单原生js代码实现redux数据响应式' 
date: 2018-11-21 2:30:10
hidden: true
slug: jemjlk2b0j
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x60F3;&#x8981;&#x628A;&#x6E90;&#x7801;&#x63B0;&#x5F00;&#x63C9;&#x788E;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x4ECE;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#x4E00;&#x70B9;&#x4E00;&#x70B9;&#x5206;&#x6790;</h2><p>&#x5177;&#x8C61;&#x5316;&#x4E00;&#x4E0B;&#xFF0C;&#x6700;&#x5E38;&#x89C1;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x5E73;&#x65F6;&#x90FD;&#x8BA2;&#x9605;&#x8FC7;&#x516C;&#x4F17;&#x53F7;&#x5BF9;&#x5427;&#xFF0C;&#x4F60;&#x8BA2;&#x9605;&#x4E86;&#x67D0;&#x4E2A;&#x516C;&#x4F17;&#x53F7;&#x540E;&#xFF0C;&#x5F53;&#x4F60;&#x8BA2;&#x9605;&#x7684;&#x516C;&#x4F17;&#x53F7;&#x53D1;&#x5E03;&#x4EC0;&#x4E48;&#x901A;&#x77E5;&#x6216;&#x63A8;&#x6587;&#xFF0C;&#x4F60;&#x8FD9;&#x8FB9;&#x5C31;&#x4F1A;&#x6536;&#x5230;&#x3002;&#x4F60;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#xFF0C;&#x8BA2;&#x9605;&#x540E;&#xFF0C;</p><p>&#x6587;&#x7AE0;&#x5730;&#x5740;&#xFF1A;<a href="https://shudong.wang/article/111" rel="nofollow noreferrer" target="_blank">https://shudong.wang/article/111</a></p><h4>&#x6E90;&#x7801;&#x4E2D;&#x7684;</h4><p><span class="img-wrap"><img data-src="http://md.shudong.wang/2018-07-24-22-47-08.png" src="https://static.alili.techhttp://md.shudong.wang/2018-07-24-22-47-08.png" alt="2018-07-24-22-47-08" title="2018-07-24-22-47-08" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="http://md.shudong.wang/2018-07-24-22-48-01.png" src="https://static.alili.techhttp://md.shudong.wang/2018-07-24-22-48-01.png" alt="2018-07-24-22-48-01" title="2018-07-24-22-48-01" style="cursor:pointer;display:inline"></span></p><blockquote>&#x6211;&#x4EEC;&#x5148;&#x7528;&#x539F;&#x751F;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;</blockquote><h4>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5DE5;&#x5382;&#x51FD;&#x6570; createStore</h4><blockquote>&#x8FD4;&#x56DE;&#x4E09;&#x4E2A;&#x51FD;&#x6570;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  getState  &#x83B7;&#x53D6;&#x72B6;&#x6001;
  dispatch  &#x7528;&#x6765;&#x89E6;&#x53D1;Action
  subscribe &#x8BA2;&#x9605;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>  getState  &#x83B7;&#x53D6;&#x72B6;&#x6001;
  <span class="hljs-keyword">dispatch </span> &#x7528;&#x6765;&#x89E6;&#x53D1;Action
  <span class="hljs-keyword">subscribe </span>&#x8BA2;&#x9605;</code></pre><blockquote>createStore &#x5DE5;&#x5382;&#x51FD;&#x6570;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createStore = (reducer) =&gt; {
  let state;
  let listeners = [];

  // &#x7EAF;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x7684;state
  const getState = () =&gt; state

  // &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;dispatch &#x7528;&#x6765;&#x89E6;&#x53D1;action
  const dispatch = (action) =&gt; {
    //&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x4F20;&#x8FDB;&#x6765;&#x7684;reducer&#x51FD;&#x6570;&#x6765;&#x4FEE;&#x6539;state
    //&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x72B6;&#x6001;&#x5E76;&#x8D4B;&#x503C;&#x7ED9;state
    state = reducer(state, action);
  }

  //&#x8BA2;&#x9605;&#x72B6;&#x6001;
  const subscribe = function (data) {
    //&#x5148;&#x628A;&#x6B64;&#x76D1;&#x542C; &#x52A0;&#x5230;&#x6570;&#x7EC4;&#x4E2D;
    listeners.push(data);
    //&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5F53;&#x8C03;&#x7528;&#x5B83;&#x7684;&#x65F6;&#x5019;&#x5C06;&#x6B64;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x4ECE;&#x76D1;&#x542C;&#x6570;&#x7EC4;&#x79FB;&#x9664;
    return function () {
      listeners = listeners.filter(v =&gt; v != data);
    }
  }

  //&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019; &#x8C03;&#x7528;&#x4E00;&#x6B21;dispatch&#x7ED9;state&#x8D4B;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#x503C;
  dispatch({ type: &apos;stark&apos; }) // &#x521D;&#x59CB;&#x5316;&#x5168;&#x5C40;&#x72B6;&#x6001;

  // &#x8FD4;&#x56DE;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;
  return {
    getState,
    dispatch,
    subscribe
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>const createStore = (reducer) =&gt; {
  let <span class="hljs-keyword">state</span>;
  let listeners = [];

  // &#x7EAF;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x7684;<span class="hljs-keyword">state</span>
  const getState = () =&gt; <span class="hljs-keyword">state</span>

  // &#x5B9A;&#x4E49;&#x4E00;&#x4E2A;dispatch &#x7528;&#x6765;&#x89E6;&#x53D1;action
  const dispatch = (action) =&gt; {
    //&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x4F20;&#x8FDB;&#x6765;&#x7684;reducer&#x51FD;&#x6570;&#x6765;&#x4FEE;&#x6539;<span class="hljs-keyword">state</span>
    //&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x72B6;&#x6001;&#x5E76;&#x8D4B;&#x503C;&#x7ED9;<span class="hljs-keyword">state</span>
    <span class="hljs-keyword">state</span> = reducer(<span class="hljs-keyword">state</span>, action);
  }

  //&#x8BA2;&#x9605;&#x72B6;&#x6001;
  const subscribe = function (data) {
    //&#x5148;&#x628A;&#x6B64;&#x76D1;&#x542C; &#x52A0;&#x5230;&#x6570;&#x7EC4;&#x4E2D;
    listeners.push(data);
    //&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5F53;&#x8C03;&#x7528;&#x5B83;&#x7684;&#x65F6;&#x5019;&#x5C06;&#x6B64;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x4ECE;&#x76D1;&#x542C;&#x6570;&#x7EC4;&#x79FB;&#x9664;
    return function () {
      listeners = listeners.filter(v =&gt; v != data);
    }
  }

  //&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019; &#x8C03;&#x7528;&#x4E00;&#x6B21;dispatch&#x7ED9;<span class="hljs-keyword">state</span>&#x8D4B;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#x503C;
  dispatch({ type: &apos;stark&apos; }) // &#x521D;&#x59CB;&#x5316;&#x5168;&#x5C40;&#x72B6;&#x6001;

  // &#x8FD4;&#x56DE;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;
  return {
    getState,
    dispatch,
    subscribe
  }
}</code></pre><h4>&#x521B;&#x5EFA;&#x4E00;&#x4E2A; reducer</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reducer = (state = 0, action) =&gt; {
  switch (action.type) {
    case &apos;INCREMENT&apos;:
      return state + 1
    case &apos;MIN&apos;:
      return state - 1
    default:
      return 10
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>const reducer = (<span class="hljs-keyword">state</span> = <span class="hljs-number">0</span>, action) =&gt; {
  switch (action.type) {
    case &apos;INCREMENT&apos;:
      return <span class="hljs-keyword">state</span> + <span class="hljs-number">1</span>
    case &apos;MIN&apos;:
      return <span class="hljs-keyword">state</span> - <span class="hljs-number">1</span>
    <span class="hljs-keyword">default</span>:
      return <span class="hljs-number">10</span>
  }
}</code></pre><h4>&#x5E94;&#x7528;&#x521B;&#x5EFA; store</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = createStore(reducer);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code><span class="hljs-attribute">let store</span> = createStore(reducer);
</code></pre><h4>&#x83B7;&#x53D6;&#x72B6;&#x6001;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const init = store.getState()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> init = store.getState()</code></pre><h4>&#x628A;&#x6570;&#x636E;&#x6E32;&#x67D3;&#x5230;&#x754C;&#x9762;&#x4E0A;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const render = () =&gt; {
  document.body.innerText = store.getState()
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>const render = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">document</span>.body.innerText = store.getState()
}</code></pre><h4>&#x8BA2;&#x9605;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.subscribe(render);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code style="word-break:break-word;white-space:initial">store.subscribe(render)<span class="hljs-comment">;</span></code></pre><h4>&#x8C03;&#x7528; render();</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code style="word-break:break-word;white-space:initial">render()<span class="hljs-comment">;</span></code></pre><h4>&#x5B9A;&#x4E49;&#x7C7B;&#x578B;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let INCREASE_ACTION = { type: &apos;INCREMENT&apos; };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs bash"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">let</span> INCREASE_ACTION = { <span class="hljs-built_in">type</span>: <span class="hljs-string">&apos;INCREMENT&apos;</span> };</code></pre><h4>&#x70B9;&#x51FB;&#x6587;&#x6863;&#x89E6;&#x53D1;&#x4E00;&#x4E2A;Action</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener(&apos;click&apos;, function (e) {
  //&#x89E6;&#x53D1;&#x4E00;&#x4E2A;Action
  store.dispatch(INCREASE_ACTION);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  <span class="hljs-comment">//&#x89E6;&#x53D1;&#x4E00;&#x4E2A;Action</span>
  store.dispatch(INCREASE_ACTION);
})</code></pre><h4>&#x6709;&#x95EE;&#x9898;&#x7EE7;&#x7EED;&#x7559;&#x8A00;</h4><h4>&#x6E90;&#x7801;&#x5730;&#x5740;&#xFF1A;</h4><p><a href="http://github.com/wsdo/redux.git" rel="nofollow noreferrer" target="_blank">http://github.com/wsdo/redux.git</a></p><blockquote>&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x6162;&#x6162;&#x7406;&#x89E3;redux &#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x521D;&#x6B65;&#x8BA4;&#x8BC6;</blockquote><h4>&#x628A;&#x4E0B;&#x9762;&#x6574;&#x4F53;&#x4EE3;&#x7801;&#x8FD0;&#x884C;&#xFF0C;&#x6162;&#x6162;&#x4F53;&#x4F1A;&#xFF0C;&#x70B9;&#x5F00;&#x63A7;&#x5236;&#x53F0;&#x770B;&#x7ED3;&#x679C;</h4><p><span class="img-wrap"><img data-src="http://md.shudong.wang/2018-07-24-22-16-46.png" src="https://static.alili.techhttp://md.shudong.wang/2018-07-24-22-16-46.png" alt="2018-07-24-22-16-46" title="2018-07-24-22-16-46" style="cursor:pointer;display:inline"></span></p><h4>&#x53EF;&#x4EE5;&#x628A;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x590D;&#x5236; &#x5230;&#x4E00;&#x4E2A;HTML &#x6587;&#x4EF6;&#x91CC;&#x9762;&#x6765;&#xFF0C;&#x81EA;&#x5DF1;&#x8FD0;&#x884C;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
  &lt;title&gt;Document&lt;/title&gt;
  &lt;script src=&quot;https://cdn.bootcss.com/babel-polyfill/7.0.0-beta.44/polyfill.min.js&quot;&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  
&lt;/body&gt;
&lt;script&gt;

const createStore = (reducer) =&gt; {
  let state; // &#x5B9A;&#x4E49;&#x5B58;&#x50A8;&#x7684;state
  let listeners = [];

  const getState = () =&gt; state;

  const dispatch = (action) =&gt; {
    console.log(&apos;====================================&apos;)
    console.log(&apos;action&apos;, action)
    console.log(&apos;state&apos;, state)
    console.log(&apos;====================================&apos;)
    state = reducer(state, action);
    // listeners.forEach(listener =&gt; listener());
  }

  const subscribe = function (listener) {
    listeners.push(listener);
    console.log(&apos;====================================&apos;)
    console.log(listeners)
    console.log(&apos;====================================&apos;)

    return function () {
      listeners = listeners.filter(v =&gt; v != listener);
    }
  }

  dispatch({ type: &apos;stark&apos; }) // &#x521D;&#x59CB;&#x5316;&#x5168;&#x5C40;&#x72B6;&#x6001;
  return {
    getState,
    dispatch,
    subscribe
  }
}

const reducer = (state = 0, action) =&gt; {
  switch (action.type) {
    case &apos;INCREMENT&apos;:
      return state + 1
    case &apos;MIN&apos;:
      return state - 1
    default:
      return 10
  }
}

let store = createStore(reducer);
const init = store.getState()
console.log(&apos;====================================&apos;)
console.log(init)
console.log(&apos;====================================&apos;)

//&#x628A;&#x6570;&#x636E;&#x6E32;&#x67D3;&#x5230;&#x754C;&#x9762;&#x4E0A;
const render = () =&gt; {
  document.body.innerText = store.getState()
}

// &#x8BA2;&#x9605;
store.subscribe(render);
render();
var INCREASE_ACTION = { type: &apos;INCREMENT&apos; };
document.addEventListener(&apos;click&apos;, function (e) {
  //&#x89E6;&#x53D1;&#x4E00;&#x4E2A;Action
  store.dispatch(INCREASE_ACTION);
})

&lt;/script&gt;
&lt;/html&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.bootcss.com/babel-polyfill/7.0.0-beta.44/polyfill.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">const</span> createStore = <span class="hljs-function">(<span class="hljs-params">reducer</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> state; <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x5B58;&#x50A8;&#x7684;state</span>
  <span class="hljs-keyword">let</span> listeners = [];

  <span class="hljs-keyword">const</span> getState = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> state;

  <span class="hljs-keyword">const</span> dispatch = <span class="hljs-function">(<span class="hljs-params">action</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;action&apos;</span>, action)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;state&apos;</span>, state)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>)
    state = reducer(state, action);
    <span class="hljs-comment">// listeners.forEach(listener =&gt; listener());</span>
  }

  <span class="hljs-keyword">const</span> subscribe = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">listener</span>) </span>{
    listeners.push(listener);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>)
    <span class="hljs-built_in">console</span>.log(listeners)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>)

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      listeners = listeners.filter(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v != listener);
    }
  }

  dispatch({ <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;stark&apos;</span> }) <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x5168;&#x5C40;&#x72B6;&#x6001;</span>
  <span class="hljs-keyword">return</span> {
    getState,
    dispatch,
    subscribe
  }
}

<span class="hljs-keyword">const</span> reducer = <span class="hljs-function">(<span class="hljs-params">state = <span class="hljs-number">0</span>, action</span>) =&gt;</span> {
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;INCREMENT&apos;</span>:
      <span class="hljs-keyword">return</span> state + <span class="hljs-number">1</span>
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;MIN&apos;</span>:
      <span class="hljs-keyword">return</span> state - <span class="hljs-number">1</span>
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-number">10</span>
  }
}

<span class="hljs-keyword">let</span> store = createStore(reducer);
<span class="hljs-keyword">const</span> init = store.getState()
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>)
<span class="hljs-built_in">console</span>.log(init)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;====================================&apos;</span>)

<span class="hljs-comment">//&#x628A;&#x6570;&#x636E;&#x6E32;&#x67D3;&#x5230;&#x754C;&#x9762;&#x4E0A;</span>
<span class="hljs-keyword">const</span> render = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">document</span>.body.innerText = store.getState()
}

<span class="hljs-comment">// &#x8BA2;&#x9605;</span>
store.subscribe(render);
render();
<span class="hljs-keyword">var</span> INCREASE_ACTION = { <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;INCREMENT&apos;</span> };
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  <span class="hljs-comment">//&#x89E6;&#x53D1;&#x4E00;&#x4E2A;Action</span>
  store.dispatch(INCREASE_ACTION);
})

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【react进阶】【redux源码分析】01. (入门篇) 通过简单原生js代码实现redux数据响应式

## 原文链接
[https://segmentfault.com/a/1190000015754271](https://segmentfault.com/a/1190000015754271)

