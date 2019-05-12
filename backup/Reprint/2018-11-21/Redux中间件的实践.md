---
title: 'Redux中间件的实践' 
date: 2018-11-21 2:30:10
hidden: true
slug: 7i8flubbhka
categories: [reprint]
---

{{< raw >}}
<p>&#x6700;&#x8FD1;&#x9879;&#x76EE;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x6846;&#x67B6;&#x91C7;&#x7528;React+Redux&#x8FDB;&#x884C;&#x5B9E;&#x73B0;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x5982;&#x4F55;&#x5F02;&#x6B65;&#x8BBF;&#x95EE;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#xFF0C;&#x4EE5;&#x53CA;&#x60F3;&#x8981;&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x8FDB;&#x884C;&#x72B6;&#x6001;&#x6811;&#x65E5;&#x5FD7;&#x7684;&#x8F93;&#x51FA;&#xFF0C;&#x6240;&#x4EE5;&#x600E;&#x4E48;&#x624D;&#x80FD;&#x89E3;&#x51B3;&#x8FD9;&#x4E24;&#x4E2A;&#x95EE;&#x9898;? <strong>&#x91C7;&#x7528;Redux&#x4E2D;&#x95F4;&#x4EF6;</strong></p><h2 id="articleHeader0"><strong>&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x4F7F;&#x7528;&#x4E2D;&#x95F4;&#x4EF6;</strong></h2><p>&#x5728;&#x5229;&#x7528;Redux&#x8FDB;&#x884C;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x65F6;&#xFF0C;&#x7528;&#x6237;&#x5728;UI&#x5C42;&#x9762;&#x89E6;&#x53D1;&#x884C;&#x4E3A;&#xFF0C;&#x4E00;&#x4E2A;action&#x5BF9;&#x8C61;&#x901A;&#x8FC7;store.dispatch&#x6D3E;&#x53D1;&#x5230;Reducer&#x8FDB;&#x884C;&#x89E6;&#x53D1;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;Reducer&#x4F1A;&#x6839;&#x636E;type&#x6765;&#x66F4;&#x65B0;&#x5BF9;&#x5E94;&#x7684;Store&#x4E0A;&#x7684;&#x72B6;&#x6001;&#x6811;&#xFF0C;&#x66F4;&#x6539;&#x540E;&#x7684;state&#x4F1A;&#x89E6;&#x53D1;&#x5BF9;&#x5E94;&#x7EC4;&#x4EF6;&#x7684;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x3002;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#x3002;&#x5728;&#x8FD9;&#x4E2A;&#x6D41;&#x7A0B;&#x4E2D;&#xFF0C;action&#x5BF9;&#x8C61;&#x662F;&#x4E00;&#x4E2A;&#x540C;&#x6B65;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x5305;&#x542B;type&#x5B57;&#x6BB5;&#x7684;&#x7B80;&#x5355;&#x5BF9;&#x8C61;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x8BBF;&#x95EE;&#x670D;&#x52A1;&#x5668;&#x65F6;&#xFF0C;&#x7531;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x7684;&#xFF0C;&#x4E0D;&#x4F1A;&#x4E00;&#x904D;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x4E00;&#x904D;&#x7B49;&#x5F85;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8BBE;&#x8BA1;&#x4E00;&#x79CD;&#x5F02;&#x6B65;&#x8BBF;&#x95EE;&#x670D;&#x52A1;&#x5668;&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x5B9E;&#x73B0;&#x4E0E;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x7684;&#x6B63;&#x5E38;&#x901A;&#x4FE1;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbelq9?w=3257&amp;h=1790" src="https://static.alili.tech/img/bVbelq9?w=3257&amp;h=1790" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1"><strong>&#x4E2D;&#x95F4;&#x4EF6;&#x4ECB;&#x7ECD;</strong></h2><p>&#x5728;Redux&#x67B6;&#x6784;&#x4E0B;&#xFF0C;&#x4E00;&#x4E2A;action&#x5BF9;&#x8C61;&#x5728;&#x901A;&#x8FC7;store.dispatch&#x6D3E;&#x53D1;&#xFF0C;&#x5728;&#x8C03;&#x7528;reducer&#x51FD;&#x6570;&#x524D;&#xFF0C;&#x4F1A;&#x5148;&#x7ECF;&#x8FC7;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x73AF;&#x8282;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbelrs?w=3934&amp;h=1426" src="https://static.alili.tech/img/bVbelrs?w=3934&amp;h=1426" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x4ECE;&#x4E0A;&#x56FE;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x5728;&#x4E00;&#x4E2A;Redux&#x67B6;&#x6784;&#x4E2D;&#x53EF;&#x4EE5;&#x7528;&#x591A;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E9B;&#x4E2D;&#x95F4;&#x4EF6;&#x4E00;&#x8D77;&#x7EC4;&#x7EC7;&#x5904;&#x7406;&#x8BF7;&#x6C42;&#x7684;&#x201C;&#x7BA1;&#x9053;&#x201D;&#x3002;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x662F;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x7EC4;&#x5408;&#x4F7F;&#x7528;&#xFF0C;&#x4E2D;&#x95F4;&#x4EF6;&#x6709;&#x4E00;&#x4E2A;&#x7EDF;&#x4E00;&#x7684;&#x63A5;&#x53E3;&#xFF0C;&#x6B63;&#x56E0;&#x4E3A;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x53EA;&#x80FD;&#x5B8C;&#x6210;&#x4E00;&#x4E2A;&#x7279;&#x5B9A;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x6240;&#x4EE5;&#x628A;&#x591A;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x7EC4;&#x5408;&#x5728;&#x4E00;&#x8D77;&#x624D;&#x80FD;&#x6EE1;&#x8DB3;&#x6BD4;&#x8F83;&#x4E30;&#x5BCC;&#x7684;&#x5E94;&#x7528;&#x9700;&#x6C42;&#x3002;&#x5F53;&#x7136;&#x5728;&#x4F7F;&#x7528;&#x65F6;&#xFF0C;&#x4E5F;&#x9700;&#x8981;&#x6309;&#x7167;&#x987A;&#x5E8F;&#x4F9D;&#x6B21;&#x5904;&#x7406;&#x4F20;&#x5165;&#x7684;action&#xFF0C;&#x53EA;&#x6709;&#x6392;&#x5728;&#x524D;&#x9762;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x5B8C;&#x6210;&#x4EFB;&#x52A1;&#x4E4B;&#x540E;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x624D;&#x80FD;&#x6709;&#x673A;&#x4F1A;&#x7EE7;&#x7EED;&#x5904;&#x7406;action&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbelrF?w=875&amp;h=143" src="https://static.alili.tech/img/bVbelrF?w=875&amp;h=143" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader2"><strong>&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x7279;&#x70B9;</strong></h2><ul><li>&#x4E2D;&#x95F4;&#x4EF6;&#x662F;&#x72EC;&#x7ACB;&#x7684;&#x51FD;&#x6570;</li><li>&#x4E2D;&#x95F4;&#x4EF6;&#x53EF;&#x4EE5;&#x7EC4;&#x5408;&#x4F7F;&#x7528;</li><li>&#x4E2D;&#x95F4;&#x4EF6;&#x6709;&#x4E00;&#x4E2A;&#x7EDF;&#x4E00;&#x7684;&#x63A5;&#x53E3;</li></ul><h2 id="articleHeader3"><strong>&#x4E2D;&#x95F4;&#x4EF6;&#x63A5;&#x53E3;</strong></h2><p>&#x6BCF;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x5FC5;&#x987B;&#x5B9A;&#x4E49;&#x4E3A;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x63A5;&#x53D7;next&#x53C2;&#x6570;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;&#x63A5;&#x53D7;next&#x53C2;&#x6570;&#x7684;&#x51FD;&#x6570;&#x53C8;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x63A5;&#x53D7;action&#x53C2;&#x6570;&#x7684;&#x51FD;&#x6570;&#x3002;next&#x53C2;&#x6570;&#x672C;&#x8EAB;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4E2D;&#x95F4;&#x4EF6;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;next&#x51FD;&#x6570;&#x901A;&#x77E5;Redux&#x81EA;&#x5DF1;&#x7684;&#x5904;&#x7406;&#x5DE5;&#x4F5C;&#x5DF2;&#x7ECF;&#x7ED3;&#x675F;&#x3002;<br>&#x4E00;&#x4E2A;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x505A;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function doNothingMiddleware({dispatch, getState}) {
    return function(next){
      return function(action){
        return next(action);
       }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lua"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doNothingMiddleware</span><span class="hljs-params">({dispatch, getState})</span></span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(next)</span></span>{
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(action)</span></span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">next</span>(action);
       }
    }
}</code></pre><p>&#x5305;&#x542B;&#x7684;&#x529F;&#x80FD;&#x6709;&#xFF1A;</p><ul><li>&#x8C03;&#x7528;dispatch&#x6D3E;&#x53D1;&#x51FA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;action&#x5BF9;&#x8C61;</li><li>&#x8C03;&#x7528;getState&#x83B7;&#x5F97;&#x5F53;&#x524D;Redux Store&#x4E0A;&#x7684;&#x72B6;&#x6001;</li><li>&#x8C03;&#x7528;next&#x544A;&#x8BC9;Redux&#x5F53;&#x524D;&#x4E2D;&#x95F4;&#x4EF6;&#x5DE5;&#x4F5C;&#x5B8C;&#x6BD5;&#xFF0C;&#x8BA9;Redux&#x8C03;&#x7528;&#x4E0B;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;</li><li>&#x8BBF;&#x95EE;action&#x5BF9;&#x8C61;action&#x4E0A;&#x7684;&#x6240;&#x6709;&#x6570;&#x636E;</li></ul><p>&#x5728;&#x4E00;&#x4E2A;Redux&#x5E94;&#x7528;&#x5982;&#x679C;&#x60F3;&#x8981;&#x4F7F;&#x7528;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5FC5;&#x987B;&#x901A;&#x8FC7;applyMiddleware&#x6765;&#x751F;&#x6210;&#x3002;Redux&#x7684;&#x6E90;&#x7801;&#x6587;&#x4EF6;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x7531;&#x4E94;&#x4E2A;&#x6587;&#x4EF6;&#x4E00;&#x8D77;&#x7EC4;&#x6210;&#xFF0C;&#x5206;&#x522B;&#x662F;createStore.js&#xFF0C;applyMiddlware.js&#xFF0C;compose.js&#xFF0C;bindActionCreator.js&#xFF0C;combineReducers.js&#x3002;&#x4E0E;createStore&#x662F;&#x7528;&#x6765;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x6811;&#xFF0C;&#x5E76;&#x4E14;&#x66B4;&#x9732;&#x51FA;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5305;&#x62EC;dispatch&#xFF0C;subscribe&#xFF0C;getState&#xFF0C;replaceReducer&#x548C;$$observable&#xFF0C;&#x7ED9;createStore&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x6709;reducer&#xFF0C;preloadedState&#x548C;enhancer&#xFF0C;&#x5176;&#x4E2D;enhancer&#x5C31;&#x662F;&#x4E00;&#x4E2A;store&#x589E;&#x5F3A;&#x5668;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x53EA;&#x80FD;&#x7528;applyMiddleware&#x751F;&#x6210;&#x3002;applyMiddleware&#x51FD;&#x6570;&#x662F;&#x6839;&#x636E;&#x5916;&#x90E8;&#x51FD;&#x6570;&#xFF08;&#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;&#xFF09;&#x5305;&#x88C5;&#x539F;&#x6765;&#x7684;dispatch&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x65B0;&#x7684;dispatch&#x51FD;&#x6570;&#x66B4;&#x9732;&#x51FA;&#x53BB;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x6839;&#x636E;&#x5916;&#x90E8;&#x51FD;&#x6570;&#xFF08;&#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;&#xFF09;&#x5305;&#x88C5;&#x539F;&#x6765;&#x7684;dispatch&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x65B0;&#x7684;dispatch&#x51FD;&#x6570;&#x66B4;&#x9732;&#x4E86;&#x51FA;&#x53BB;
export default function applyMiddleware(...middlewares) {
  //return&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;createStore&#x65B9;&#x6CD5;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x7ED9;&#x8FD4;&#x56DE;&#x7684;store&#x7684;dispatch&#x65B9;&#x6CD5;&#x518D;&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#x5305;&#x88C5;
  return createStore =&gt; (...args) =&gt; {//agrs&#x5305;&#x542B;reducer, preloadedState, enhancer
    const store = createStore(...args)
    let dispatch = () =&gt; {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }

    //&#x66B4;&#x9732;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x7ED9;&#x5916;&#x90E8;&#x51FD;&#x6570;
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) =&gt; dispatch(...args)
    }
    //&#x4F20;&#x5165;middlewareAPI&#x53C2;&#x6570;&#x5E76;&#x6267;&#x884C;&#x6BCF;&#x4E00;&#x4E2A;&#x5916;&#x90E8;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x6C47;&#x805A;&#x6210;&#x6570;&#x7EC4;
    const chain = middlewares.map(middleware =&gt; middleware(middlewareAPI))
    //&#x8FD9;&#x91CC;&#x7528;&#x5230;&#x4E86;compose&#x65B9;&#x6CD5;
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">//&#x6839;&#x636E;&#x5916;&#x90E8;&#x51FD;&#x6570;&#xFF08;&#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;&#xFF09;&#x5305;&#x88C5;&#x539F;&#x6765;&#x7684;dispatch&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x65B0;&#x7684;dispatch&#x51FD;&#x6570;&#x66B4;&#x9732;&#x4E86;&#x51FA;&#x53BB;</span>
export <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span><span class="hljs-params">(<span class="hljs-rest_arg">...middlewares</span>)</span> </span>{
  <span class="hljs-comment">//return&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;createStore&#x65B9;&#x6CD5;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x7ED9;&#x8FD4;&#x56DE;&#x7684;store&#x7684;dispatch&#x65B9;&#x6CD5;&#x518D;&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#x5305;&#x88C5;</span>
  <span class="hljs-keyword">return</span> createStore =&gt; (...args) =&gt; {<span class="hljs-comment">//agrs&#x5305;&#x542B;reducer, preloadedState, enhancer</span>
    <span class="hljs-keyword">const</span> store = createStore(...args)
    let dispatch = () =&gt; {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(
        `Dispatching <span class="hljs-keyword">while</span> constructing your middleware <span class="hljs-keyword">is</span> not allowed. ` +
          `Other middleware would not be applied to <span class="hljs-keyword">this</span> dispatch.`
      )
    }

    <span class="hljs-comment">//&#x66B4;&#x9732;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x7ED9;&#x5916;&#x90E8;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">const</span> middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) =&gt; dispatch(...args)
    }
    <span class="hljs-comment">//&#x4F20;&#x5165;middlewareAPI&#x53C2;&#x6570;&#x5E76;&#x6267;&#x884C;&#x6BCF;&#x4E00;&#x4E2A;&#x5916;&#x90E8;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x6C47;&#x805A;&#x6210;&#x6570;&#x7EC4;</span>
    <span class="hljs-keyword">const</span> chain = middlewares.map(middleware =&gt; middleware(middlewareAPI))
    <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x7528;&#x5230;&#x4E86;compose&#x65B9;&#x6CD5;</span>
    dispatch = compose(...chain)(store.dispatch)

    <span class="hljs-keyword">return</span> {
      ...store,
      dispatch
    }
  }
}</code></pre><h2 id="articleHeader4"><strong>&#x4E2D;&#x95F4;&#x4EF6;&#x4E0E;&#x589E;&#x5F3A;&#x5668;&#x7684;&#x533A;&#x522B;</strong></h2><p>&#x4E2D;&#x95F4;&#x4EF6;&#x548C;&#x589E;&#x5F3A;&#x5668;&#x90FD;&#x662F;&#x5BF9;Redux Store&#x7684;&#x589E;&#x5F3A;&#xFF0C;&#x4F46;&#x662F;&#x4E2D;&#x95F4;&#x4EF6;&#x4EC5;&#x4EC5;&#x662F;&#x5BF9;Redux Store&#x7684;dispatch&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x4E86;&#x589E;&#x5F3A;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4ECE;dispatch&#x51FD;&#x6570;&#x8C03;&#x7528;&#x5230;action&#x5BF9;&#x8C61;&#x88AB;reducer&#x5904;&#x7406;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x589E;&#x5F3A;&#x5668;&#x662F;&#x5BF9;Redux Store&#x8FDB;&#x884C;&#x66F4;&#x6DF1;&#x5C42;&#x6B21;&#x7684;&#x589E;&#x5F3A;&#x5B9A;&#x5236;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;Store Enhancer&#xFF0C;&#x901A;&#x8FC7;&#x9605;&#x8BFB;&#x589E;&#x5F3A;&#x5668;&#x63A5;&#x53E3;&#xFF0C;&#x4E00;&#x4E2A;&#x589E;&#x5F3A;&#x5668;&#x5176;&#x5B9E;&#x5229;&#x7528;&#x968F;&#x7ED9;&#x7684;&#x53C2;&#x6570;&#x521B;&#x9020;&#x51FA;&#x4E00;&#x4E2A;store&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x5B9A;&#x5236;&#x5BF9;&#x8C61;&#xFF0C;&#x6700;&#x540E;&#x628A;Store&#x5BF9;&#x8C61;&#x8FD4;&#x56DE;&#x3002;&#x603B;&#x7684;&#x5BF9;&#x6BD4;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>&#x4E2D;&#x95F4;&#x4EF6;&#xFF1A; &#x53EF;&#x4EE5;&#x7528;&#x6765;&#x589E;&#x5F3A;redux store&#x7684;dispatch&#x51FD;&#x6570;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4ECE;dispatch&#x51FD;&#x6570;&#x8C03;&#x7528;&#x5230;action&#x5BF9;&#x8C61;&#x88AB;reducer&#x5904;&#x7406;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x64CD;&#x4F5C;</li><li>&#x589E;&#x5F3A;&#x5668;&#xFF1A; &#x5BF9;redux store&#x8FDB;&#x884C;&#x66F4;&#x6DF1;&#x5C42;&#x6B21;&#x7684;&#x589E;&#x5F3A;&#x5B9A;&#x5236;&#xFF0C;&#x53EF;&#x4EE5;&#x589E;&#x5F3A;redux store&#x7684;&#x5404;&#x4E2A;&#x65B9;&#x9762;&#x3002;</li></ul><h2 id="articleHeader5"><strong>&#x5F02;&#x6B65;&#x8BBF;&#x95EE;&#x670D;&#x52A1;&#x5668;</strong>&#xFF1A;</h2><h2 id="articleHeader6">&#x5F02;&#x6B65;action&#x5BF9;&#x8C61;</h2><p>&#x5728;&#x6CA1;&#x6709;&#x5F15;&#x5165;&#x4E2D;&#x95F4;&#x4EF6;&#x65F6;&#xFF0C;&#x793E;&#x4F1A;&#x6CBB;&#x7406;&#x5B50;&#x7CFB;&#x7EDF;&#x5728;&#x5F00;&#x53D1;&#x65F6;&#xFF0C;&#x6240;&#x6709;&#x7684;action&#x90FD;&#x662F;&#x540C;&#x6B65;&#x7684;&#xFF0C;&#x4E00;&#x4E2A;&#x540C;&#x6B65;&#x7684;action&#x5BF9;&#x8C61;&#x662F;&#x4E00;&#x4E2A;&#x5305;&#x542B;type&#x5B57;&#x6BB5;&#x7684;&#x7B80;&#x5355;&#x5BF9;&#x8C61;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;action&#x5BF9;&#x8C61;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5728;action&#x89E6;&#x53D1;&#x4E4B;&#x540E;&#xFF0C;&#x5728;reducer&#x63A5;&#x6536;&#x5230;&#x6267;&#x884C;&#x547D;&#x4EE4;&#x4E4B;&#x524D;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3002;<br>&#x6211;&#x4EEC;&#x5F15;&#x5165;redux-thunk&#x6765;&#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#x8BBF;&#x95EE;&#x670D;&#x52A1;&#x5668;&#x65B9;&#x6CD5;&#xFF0C;&#x4E00;&#x4E2A;&#x8BBF;&#x95EE;&#x670D;&#x52A1;&#x5668;&#x7684;action&#xFF0C;&#x81F3;&#x5C11;&#x8981;&#x6D89;&#x53CA;&#x4E09;&#x4E2A;action&#x7C7B;&#x578B;&#xFF1A;</p><ul><li>&#x8868;&#x793A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5DF2;&#x7ECF;&#x5F00;&#x59CB;&#x7684;action&#x7C7B;&#x578B;&#xFF1B;</li><li>&#x8868;&#x793A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6210;&#x529F;&#x7684;action&#x7C7B;&#x578B;&#xFF1B;</li><li>&#x8868;&#x793A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5931;&#x8D25;&#x7684;action&#x7C7B;&#x578B;&#xFF1B;</li></ul><h2 id="articleHeader7">Redux-thunk&#x6E90;&#x4EE3;&#x7801;&#x89E3;&#x6790;</h2><p>Redux-thunk&#x4E2D;&#x95F4;&#x4EF6;&#x662F;Redux&#x4E2D;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x4E4B;&#x4E00;&#xFF0C;&#x5728;action&#x5BF9;&#x8C61;&#x88AB;reducer&#x51FD;&#x6570;&#x5904;&#x7406;&#x4E4B;&#x524D;&#xFF0C;&#x662F;&#x63D2;&#x5165;&#x5F02;&#x6B65;&#x529F;&#x80FD;&#x7684;&#x65F6;&#x673A;&#xFF0C;&#x4EE3;&#x7801;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function create ThunkMiddleware(extraArgument){
    return ({dispatch, getState}) =&gt; next =&gt; action =&gt; {
        if(typeof action === &#x2018;function&#x2019;){
         return action(dispatch, getState, extraArgument);
     }
     return next(action)
    }
}
const thunk = createThunkMiddleware();
export default thunk; " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span> <span class="hljs-title">ThunkMiddleware</span>(<span class="hljs-params">extraArgument</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{dispatch, getState}</span>) =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> action === &#x2018;<span class="hljs-function"><span class="hljs-keyword">function</span>&#x2019;)</span>{
         <span class="hljs-keyword">return</span> action(dispatch, getState, extraArgument);
     }
     <span class="hljs-keyword">return</span> next(action)
    }
}
<span class="hljs-keyword">const</span> thunk = createThunkMiddleware();
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> thunk; </code></pre><p>createThunkMiddleware&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x662F;&#x5B9E;&#x9645;&#x5904;&#x7406;&#x6BCF;&#x4E2A;action&#x5BF9;&#x8C61;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x9996;&#x5148;&#x68C0;&#x67E5;&#x53C2;&#x6570;action&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x6267;&#x884C;&#x8FD9;&#x4E2A;action&#x51FD;&#x6570;&#xFF0C;&#x628A;dispatch&#x548C;getState<br>&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x51FA;&#x53BB;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x8C03;&#x7528;next&#x8BA9;&#x4E0B;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x7EE7;&#x7EED;&#x5904;&#x7406;action&#x3002;</p><h2 id="articleHeader8">Redux-thunk&#x7684;&#x4F7F;&#x7528;&#xFF1A;</h2><p>&#x9996;&#x5148;&#xFF0C;&#x5B89;&#x88C5;redux-thunk&#xFF0C;&#x5728;&#x5DF2;&#x7ECF;&#x5B89;&#x88C5;&#x4E86;node.js&#x7684;&#x547D;&#x4EE4;&#x7A97;&#x53E3;&#x4E2D;&#x8FD0;&#x884C; &#x201C;npm install redux-thunk --save-dev&#x201D;&#xFF0C;&#x5728;store.js&#x4E2D;&#x5F15;&#x5165;redux-thunk&#xFF0C;&#x5E76;&#x4E14;&#x786E;&#x4FDD;redux&#x7684;applyMiddleware&#x51FD;&#x6570;&#x4E5F;&#x5F15;&#x5165;&#x3002;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {createStore, combineReducers, applyMiddleware} from &#x2018;redux&#x2019;;
import {otherState, dataState} from &#x2018;reducers&#x2019;;
import thunkMiddleware from &#x2018;redux-thunk&#x2019;;
var reducers = combineReducers({
    otherState,
    dataState
});
var store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> {createStore, combineReducers, applyMiddleware} <span class="hljs-keyword">from</span> &#x2018;redux&#x2019;;
<span class="hljs-keyword">import</span> {otherState, dataState} <span class="hljs-keyword">from</span> &#x2018;reducers&#x2019;;
<span class="hljs-keyword">import</span> thunkMiddleware <span class="hljs-keyword">from</span> &#x2018;redux-thunk&#x2019;;
<span class="hljs-keyword">var</span> reducers = combineReducers({
    otherState,
    dataState
});
<span class="hljs-keyword">var</span> store = createStore(reducers, applyMiddleware(thunkMiddleware));
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;
</code></pre><p>&#x5728;&#x6210;&#x529F;&#x5F15;&#x5165;&#x4E86;redux-thunk&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x8981;&#x8BBE;&#x8BA1;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7684;action&#x5BF9;&#x8C61;&#xFF0C;&#x4F8B;&#x5982;&#xFF0C;&#x5728;&#x8BBE;&#x5907;&#x7BA1;&#x7406;&#x6A21;&#x5757;&#x4E2D;&#xFF0C;&#x6210;&#x529F;&#x4FDD;&#x5B58;&#x8BBE;&#x5907;&#x4FE1;&#x606F;&#x540E;&#x8981;&#x91CD;&#x65B0;&#x83B7;&#x53D6;&#x8BBE;&#x5907;&#x4FE1;&#x606F;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function saveInfo(params){
    let url = &#x201C;/api/device&#x201D;;
    return function(dispatch, getState){
        dispatch(saveInfoRequest());
        return Http.get(url, {
            params: params
        }).then(res=&gt;{
            if(res &amp;&amp; res.type === 0){
                dispatch(saveInfoSuccess ());
                let dataState = getState().dataState;
                let newParams = {
                    start: dataState.start,
                    limit: dataState.limit,
                    searchName: dataState.searchName
                };
               dispatch(getInfo(newParams))
            }
        }).catch(error=&gt;{
              dispatch(saveInfoFailure (error));
        });
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">saveInfo</span>(<span class="hljs-params">params</span>)</span>{
    <span class="hljs-keyword">let</span> url = &#x201C;/api/device&#x201D;;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dispatch, getState</span>)</span>{
        dispatch(saveInfoRequest());
        <span class="hljs-keyword">return</span> Http.get(url, {
            <span class="hljs-attr">params</span>: params
        }).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{
            <span class="hljs-keyword">if</span>(res &amp;&amp; res.type === <span class="hljs-number">0</span>){
                dispatch(saveInfoSuccess ());
                <span class="hljs-keyword">let</span> dataState = getState().dataState;
                <span class="hljs-keyword">let</span> newParams = {
                    <span class="hljs-attr">start</span>: dataState.start,
                    <span class="hljs-attr">limit</span>: dataState.limit,
                    <span class="hljs-attr">searchName</span>: dataState.searchName
                };
               dispatch(getInfo(newParams))
            }
        }).catch(<span class="hljs-function"><span class="hljs-params">error</span>=&gt;</span>{
              dispatch(saveInfoFailure (error));
        });
    }
}
</code></pre><p>&#x4ECE;&#x8FD9;&#x4E2A;saveDeviceInfo&#x8FD4;&#x56DE;&#x7684;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x4E0D;&#x4EC5;&#x53EF;&#x4EE5;dispatch&#x4E00;&#x4E2A;&#x540C;&#x6B65;&#x7684;action&#x5BF9;&#x8C61;&#xFF0C;&#x8FD8;&#x53EF;&#x6D3E;&#x53D1;&#x53E6;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;action&#x5BF9;&#x8C61;&#xFF0C;&#x6765;&#x6EE1;&#x8DB3;&#x4E00;&#x4E9B;&#x6709;&#x7740;&#x5148;&#x540E;&#x5173;&#x7CFB;&#x7684;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#xFF0C;&#x4EE3;&#x7801;&#x53EF;&#x8BFB;&#x6027;&#x8981;&#x6BD4;&#x7528;Promise&#x5B9E;&#x73B0;&#x8D77;&#x6765;&#x4EE3;&#x7801;&#x66F4;&#x52A0;&#x6E05;&#x6670;&#x3002;</p><h2 id="articleHeader9">Redux-logger&#x4F7F;&#x7528;</h2><p>&#x5728;&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9;redux&#x6570;&#x636E;&#x6D41;&#x4E2D;&#x6BCF;&#x4E2A;&#x6D41;&#x7A0B;&#x8FDB;&#x884C;&#x76D1;&#x63A7;&#xFF0C;&#x9700;&#x8981;log&#x8F93;&#x51FA;&#xFF0C;redux-logger&#x662F;&#x5B98;&#x65B9;&#x63A8;&#x8350;&#x7684;&#x4E00;&#x6B3E;&#x65E5;&#x5FD7;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x975E;&#x5E38;&#x65B9;&#x4FBF;&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x8981;&#x4F7F;redux-logger&#x751F;&#x6548;&#xFF0C;&#x9700;&#x8981;&#x4FDD;&#x8BC1;&#x5728;&#x7CFB;&#x7EDF;&#x4E2D;&#x4F7F;&#x7528;redux&#x8FDB;&#x884C;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#xFF0C;&#x5426;&#x5219;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x65E5;&#x5FD7;&#x8F93;&#x51FA;&#x3002;<br>Redux-logger&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5206;&#x4E3A;&#x4E24;&#x79CD;&#xFF0C;&#x57FA;&#x672C;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { applyMiddleware, createStore} from &#x2018;redux&#x2019;;
import logger from &#x2018;reudx-logger&#x2019;
const store = createStore(
    Reducer,
    applyMiddleware(logger)
)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs capnproto"><code><span class="hljs-keyword">import</span> { applyMiddleware, createStore} <span class="hljs-keyword">from</span> &#x2018;redux&#x2019;;
<span class="hljs-keyword">import</span> logger <span class="hljs-keyword">from</span> &#x2018;reudx-logger&#x2019;
<span class="hljs-keyword">const</span> store = createStore(
    Reducer,
    applyMiddleware(logger)
)
</code></pre><p>&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5199;&#x4E00;&#x4E2A;&#x65E5;&#x5FD7;&#x8F93;&#x51FA;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var logger = store =&gt; next =&gt; action =&gt; {
    console.log(&apos;[action]&apos;, action)
    console.log(`[action] type:${action.type} payload:${JSON.stringify(action.payload)}`)
    next(action)
    console.log(&apos;[store]&apos;, store.getState())
    console.log(`[store] ${JSON.stringify(store.getState())}`)
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> logger = <span class="hljs-function"><span class="hljs-params">store</span> =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;[action]&apos;</span>, action)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`[action] type:<span class="hljs-subst">${action.type}</span> payload:<span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(action.payload)}</span>`</span>)
    next(action)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;[store]&apos;</span>, store.getState())
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`[store] <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(store.getState())}</span>`</span>)
}
</code></pre><h2 id="articleHeader10"><strong>&#x603B;&#x7ED3;</strong></h2><p>Redux&#x4E2D;&#x95F4;&#x4EF6;&#x53EF;&#x4EE5;&#x589E;&#x5F3A;Store.dispatch&#x65B9;&#x6CD5;&#xFF0C;&#x591A;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x53EF;&#x4EE5;&#x7EC4;&#x6210;&#x201C;&#x7BA1;&#x9053;&#x201D;&#xFF0C;&#x6309;&#x7167;&#x987A;&#x5E8F;&#x53BB;&#x5904;&#x7406;action&#x5BF9;&#x8C61;&#xFF0C;&#x5728;&#x4F9D;&#x6B21;&#x5904;&#x7406;&#x8FC7;&#x540E;&#xFF0C;&#x624D;&#x4F1A;&#x6709;&#x673A;&#x4F1A;&#x88AB;reducer&#x5904;&#x7406;&#x3002;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x5E94;&#x7528;&#x573A;&#x666F;&#x5F88;&#x591A;&#xFF0C;&#x9664;&#x4E86;&#x53EF;&#x4EE5;&#x652F;&#x6301;&#x5F02;&#x6B65;&#x8BBF;&#x95EE;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x8FD8;&#x6709;&#x8BB8;&#x591A;&#x5F88;&#x597D;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x63D2;&#x4EF6;&#xFF0C;&#x4F8B;&#x5982;react-addons-perf&#x8FDB;&#x884C;&#x8C03;&#x8BD5;&#xFF0C;&#x548C;redux-logger&#x6765;&#x8BB0;&#x5F55;&#x72B6;&#x6001;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x9700;&#x6C42;&#x6765;&#x81EA;&#x5DF1;&#x7F16;&#x5199;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5E94;&#x7528;&#x975E;&#x5E38;&#x7075;&#x6D3B;&#xFF0C;&#x5728;&#x5176;&#x4ED6;react&#x9879;&#x76EE;&#x4E2D;&#x53EF;&#x4EE5;&#x591A;&#x52A0;&#x5B9E;&#x8DF5;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux中间件的实践

## 原文链接
[https://segmentfault.com/a/1190000015773713](https://segmentfault.com/a/1190000015773713)

