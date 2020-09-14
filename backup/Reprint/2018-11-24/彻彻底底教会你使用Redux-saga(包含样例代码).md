---
title: '彻彻底底教会你使用Redux-saga(包含样例代码)' 
date: 2018-11-24 2:30:09
hidden: true
slug: 2szx9i5rbib
categories: [reprint]
---

{{< raw >}}
<p>Redux-saga&#x4F7F;&#x7528;&#x5FC3;&#x5F97;&#x603B;&#x7ED3;&#xFF08;&#x5305;&#x542B;&#x6837;&#x4F8B;&#x4EE3;&#x7801;&#xFF09;&#xFF0C;</p><p>&#x672C;&#x6587;&#x7684;&#x539F;&#x6587;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/forthealllight/blog/issues/14" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;&#x5730;&#x5740;</a></p><p>&#x672C;&#x6587;&#x7684;&#x6837;&#x4F8B;&#x4EE3;&#x7801;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/forthealllight/redux-saga-example" rel="nofollow noreferrer" target="_blank">&#x6837;&#x4F8B;&#x4EE3;&#x7801;&#x5730;&#x5740;</a> &#xFF0C;&#x6B22;&#x8FCE;star</p><hr><p>&#x6700;&#x8FD1;&#x5C06;&#x9879;&#x76EE;&#x4E2D;redux&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4ECE;redux-thunk&#x66FF;&#x6362;&#x6210;&#x4E86;redux-saga&#xFF0C;&#x505A;&#x4E2A;&#x7B14;&#x8BB0;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;redux-saga&#x7684;&#x4F7F;&#x7528;&#x5FC3;&#x5F97;&#xFF0C;&#x9605;&#x8BFB;&#x672C;&#x6587;&#x9700;&#x8981;&#x4E86;&#x89E3;&#x4EC0;&#x4E48;&#x662F;redux&#xFF0C;redux&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x7528;&#x5904;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&#x5982;&#x679C;&#x5F04;&#x61C2;&#x4E0A;&#x8FF0;&#x4E24;&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x7EE7;&#x7EED;&#x9605;&#x8BFB;&#x672C;&#x6587;&#x3002;</p><blockquote><ul><li>redux-thunk&#x5904;&#x7406;&#x526F;&#x4F5C;&#x7528;&#x7684;&#x7F3A;&#x70B9;</li><li>redux-saga&#x5199;&#x4E00;&#x4E2A;hellosaga</li><li>redux-saga&#x7684;&#x4F7F;&#x7528;&#x6280;&#x672F;&#x7EC6;&#x8282;</li><li>redux-saga&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x767B;&#x9646;&#x548C;&#x5217;&#x8868;&#x6837;&#x4F8B;</li></ul></blockquote><hr><h2 id="articleHeader0">1.redux-thunk&#x5904;&#x7406;&#x526F;&#x4F5C;&#x7528;&#x7684;&#x7F3A;&#x70B9;</h2><h3 id="articleHeader1">&#xFF08;1&#xFF09;redux&#x7684;&#x526F;&#x4F5C;&#x7528;&#x5904;&#x7406;</h3><p>redux&#x4E2D;&#x7684;&#x6570;&#x636E;&#x6D41;&#x5927;&#x81F4;&#x662F;&#xFF1A;</p><p><strong><em>UI&#x2014;&#x2014;&#x2014;&#x2014;&#x2014;&gt;action&#xFF08;plain&#xFF09;&#x2014;&#x2014;&#x2014;&#x2014;&#x2014;&gt;reducer&#x2014;&#x2014;&#x2014;&#x2014;&#x2014;&#x2014;&gt;state&#x2014;&#x2014;&#x2014;&#x2014;&#x2014;&#x2014;&gt;UI</em></strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015583154?w=573&amp;h=327" src="https://static.alili.tech/img/remote/1460000015583154?w=573&amp;h=327" alt="default" title="default" style="cursor:pointer;display:inline"></span></p><p>redux&#x662F;&#x9075;&#x5FAA;&#x51FD;&#x6570;&#x5F0F;&#x7F16;&#x7A0B;&#x7684;&#x89C4;&#x5219;&#xFF0C;&#x4E0A;&#x8FF0;&#x7684;&#x6570;&#x636E;&#x6D41;&#x4E2D;&#xFF0C;action&#x662F;&#x4E00;&#x4E2A;&#x539F;&#x59CB;js&#x5BF9;&#x8C61;&#xFF08;plain object&#xFF09;&#x4E14;reducer&#x662F;&#x4E00;&#x4E2A;&#x7EAF;&#x51FD;&#x6570;&#xFF0C;&#x5BF9;&#x4E8E;&#x540C;&#x6B65;&#x4E14;&#x6CA1;&#x6709;&#x526F;&#x4F5C;&#x7528;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x4E0A;&#x8FF0;&#x7684;&#x6570;&#x636E;&#x6D41;&#x8D77;&#x5230;&#x53EF;&#x4EE5;&#x7BA1;&#x7406;&#x6570;&#x636E;&#xFF0C;&#x4ECE;&#x800C;&#x63A7;&#x5236;&#x89C6;&#x56FE;&#x5C42;&#x66F4;&#x65B0;&#x7684;&#x76EE;&#x7684;&#x3002;</p><p><strong><em>&#x4F46;&#x662F;&#x5982;&#x679C;&#x5B58;&#x5728;&#x526F;&#x4F5C;&#x7528;&#xFF0C;&#x6BD4;&#x5982;ajax&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x7B49;&#x7B49;&#xFF0C;&#x90A3;&#x4E48;&#x5E94;&#x8BE5;&#x600E;&#x4E48;&#x505A;&#xFF1F;</em></strong></p><p>&#x5982;&#x679C;&#x5B58;&#x5728;&#x526F;&#x4F5C;&#x7528;&#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x9996;&#x5148;&#x5904;&#x7406;&#x526F;&#x4F5C;&#x7528;&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x751F;&#x6210;&#x539F;&#x59CB;&#x7684;js&#x5BF9;&#x8C61;&#x3002;&#x5982;&#x4F55;&#x5904;&#x7406;&#x526F;&#x4F5C;&#x7528;&#x64CD;&#x4F5C;&#xFF0C;&#x5728;redux&#x4E2D;&#x9009;&#x62E9;&#x5728;&#x53D1;&#x51FA;action&#xFF0C;&#x5230;reducer&#x5904;&#x7406;&#x51FD;&#x6570;&#x4E4B;&#x95F4;&#x4F7F;&#x7528;&#x4E2D;&#x95F4;&#x4EF6;&#x5904;&#x7406;&#x526F;&#x4F5C;&#x7528;&#x3002;</p><p>redux&#x589E;&#x52A0;&#x4E2D;&#x95F4;&#x4EF6;&#x5904;&#x7406;&#x526F;&#x4F5C;&#x7528;&#x540E;&#x7684;&#x6570;&#x636E;&#x6D41;&#x5927;&#x81F4;&#x5982;&#x4E0B;&#xFF1A;</p><p><strong><em>UI&#x2014;&#x2014;&gt;action(side function)&#x2014;&gt;middleware&#x2014;&gt;action(plain)&#x2014;&gt;reducer&#x2014;&gt;state&#x2014;&gt;UI</em></strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015583155?w=719&amp;h=323" src="https://static.alili.tech/img/remote/1460000015583155?w=719&amp;h=323" alt="default" title="default" style="cursor:pointer"></span></p><p>&#x5728;&#x6709;&#x526F;&#x4F5C;&#x7528;&#x7684;action&#x548C;&#x539F;&#x59CB;&#x7684;action&#x4E4B;&#x95F4;&#x589E;&#x52A0;&#x4E2D;&#x95F4;&#x4EF6;&#x5904;&#x7406;&#xFF0C;&#x4ECE;&#x56FE;&#x4E2D;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#xFF1A;</p><p><strong><em>&#x8F6C;&#x6362;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x751F;&#x6210;&#x539F;&#x59CB;&#x7684;action&#xFF0C;&#x8FD9;&#x6837;&#xFF0C;reducer&#x51FD;&#x6570;&#x5C31;&#x80FD;&#x5904;&#x7406;&#x76F8;&#x5E94;&#x7684;action&#xFF0C;&#x4ECE;&#x800C;&#x6539;&#x53D8;state&#xFF0C;&#x66F4;&#x65B0;UI&#x3002;</em></strong></p><h3 id="articleHeader2">&#xFF08;2&#xFF09;redux-thunk</h3><p>&#x5728;redux&#x4E2D;&#xFF0C;thunk&#x662F;redux&#x4F5C;&#x8005;&#x7ED9;&#x51FA;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5B9E;&#x73B0;&#x6781;&#x4E3A;&#x7B80;&#x5355;&#xFF0C;10&#x591A;&#x884C;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) =&gt; next =&gt; action =&gt; {
    if (typeof action === &apos;function&apos;) {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createThunkMiddleware</span>(<span class="hljs-params">extraArgument</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch, getState }</span>) =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">&apos;function&apos;</span>) {
      <span class="hljs-keyword">return</span> action(dispatch, getState, extraArgument);
    }

    <span class="hljs-keyword">return</span> next(action);
  };
}

<span class="hljs-keyword">const</span> thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> thunk;
</code></pre><p>&#x8FD9;&#x51E0;&#x884C;&#x4EE3;&#x7801;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5224;&#x522B;action&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x5982;&#x679C;action&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x5C31;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8C03;&#x7528;&#x7684;&#x6B65;&#x9AA4;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="action(dispatch, getState, extraArgument);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code>action(<span class="hljs-name">dispatch</span>, getState, extraArgument)<span class="hljs-comment">;</span>
</code></pre><p>&#x53D1;&#x73B0;&#x5B9E;&#x53C2;&#x4E3A;dispatch&#x548C;getState&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x5728;&#x5B9A;&#x4E49;action&#x4E3A;thunk&#x51FD;&#x6570;&#x662F;&#xFF0C;&#x4E00;&#x822C;&#x5F62;&#x53C2;&#x4E3A;dispatch&#x548C;getState&#x3002;</p><h3 id="articleHeader3">&#xFF08;3&#xFF09;redux-thunk&#x7684;&#x7F3A;&#x70B9;</h3><p>hunk&#x7684;&#x7F3A;&#x70B9;&#x4E5F;&#x662F;&#x5F88;&#x660E;&#x663E;&#x7684;&#xFF0C;thunk&#x4EC5;&#x4EC5;&#x505A;&#x4E86;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E0D;&#x5728;&#x4E4E;&#x51FD;&#x6570;&#x4E3B;&#x4F53;&#x5185;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;thunk&#x4F7F;<br>&#x5F97;redux&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;action&#xFF0C;&#x4F46;&#x662F;&#x51FD;&#x6570;&#x7684;&#x5185;&#x90E8;&#x53EF;&#x4EE5;&#x591A;&#x79CD;&#x591A;&#x6837;&#x3002;&#x6BD4;&#x5982;&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x83B7;&#x53D6;&#x5546;&#x54C1;&#x5217;&#x8868;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6240;&#x5BF9;&#x5E94;&#x7684;action&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default ()=&gt;(dispatch)=&gt;{
    fetch(&apos;/api/goodList&apos;,{ //fecth&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;promise
      method: &apos;get&apos;,
      dataType: &apos;json&apos;,
    }).then(function(json){
      var json=JSON.parse(json);
      if(json.msg==200){
        dispatch({type:&apos;init&apos;,data:json.data});
      }
    },function(error){
      console.log(error);
    });
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ()=&gt;<span class="hljs-function">(<span class="hljs-params">dispatch</span>)=&gt;</span>{
    fetch(<span class="hljs-string">&apos;/api/goodList&apos;</span>,{ <span class="hljs-comment">//fecth&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;promise</span>
      method: <span class="hljs-string">&apos;get&apos;</span>,
      <span class="hljs-attr">dataType</span>: <span class="hljs-string">&apos;json&apos;</span>,
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">json</span>)</span>{
      <span class="hljs-keyword">var</span> json=<span class="hljs-built_in">JSON</span>.parse(json);
      <span class="hljs-keyword">if</span>(json.msg==<span class="hljs-number">200</span>){
        dispatch({<span class="hljs-attr">type</span>:<span class="hljs-string">&apos;init&apos;</span>,<span class="hljs-attr">data</span>:json.data});
      }
    },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
      <span class="hljs-built_in">console</span>.log(error);
    });
};
</code></pre><p>&#x4ECE;&#x8FD9;&#x4E2A;&#x5177;&#x6709;&#x526F;&#x4F5C;&#x7528;&#x7684;action&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x6781;&#x4E3A;&#x590D;&#x6742;&#x3002;&#x5982;&#x679C;&#x9700;&#x8981;&#x4E3A;&#x6BCF;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x90FD;&#x5982;&#x6B64;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;action&#xFF0C;&#x663E;&#x7136;action&#x4E0D;&#x6613;&#x7EF4;&#x62A4;&#x3002;</p><p>action&#x4E0D;&#x6613;&#x7EF4;&#x62A4;&#x7684;&#x539F;&#x56E0;&#xFF1A;</p><ul><li>action&#x7684;&#x5F62;&#x5F0F;&#x4E0D;&#x7EDF;&#x4E00;</li><li>&#x5C31;&#x662F;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x592A;&#x4E3A;&#x5206;&#x6563;&#xFF0C;&#x5206;&#x6563;&#x5728;&#x4E86;&#x5404;&#x4E2A;action&#x4E2D;</li></ul><h2 id="articleHeader4">2.redux-saga&#x5199;&#x4E00;&#x4E2A;hellosaga</h2><p>&#x8DDF;redux-thunk,redux-saga&#x662F;&#x63A7;&#x5236;&#x6267;&#x884C;&#x7684;generator&#xFF0C;&#x5728;redux-saga&#x4E2D;action&#x662F;&#x539F;&#x59CB;&#x7684;js&#x5BF9;&#x8C61;&#xFF0C;&#x628A;&#x6240;&#x6709;&#x7684;&#x5F02;&#x6B65;&#x526F;&#x4F5C;&#x7528;&#x64CD;&#x4F5C;&#x653E;&#x5728;&#x4E86;saga&#x51FD;&#x6570;&#x91CC;&#x9762;&#x3002;&#x8FD9;&#x6837;&#x65E2;&#x7EDF;&#x4E00;&#x4E86;action&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x53C8;&#x4F7F;&#x5F97;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x96C6;&#x4E2D;&#x53EF;&#x4EE5;&#x88AB;&#x96C6;&#x4E2D;&#x5904;&#x7406;&#x3002;</p><p>redux-saga&#x662F;&#x901A;&#x8FC7;genetator&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x652F;&#x6301;generator&#x9700;&#x8981;&#x901A;&#x8FC7;&#x63D2;&#x4EF6;babel-polyfill&#x8F6C;&#x4E49;&#x3002;&#x6211;&#x4EEC;&#x63A5;&#x7740;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x8F93;&#x51FA;hellosaga&#x7684;&#x4F8B;&#x5B50;&#x3002;</p><h3 id="articleHeader5">&#xFF08;1&#xFF09;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;helloSaga.js&#x6587;&#x4EF6;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function * helloSaga() {
  console.log(&apos;Hello Sagas!&apos;);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> * <span class="hljs-title">helloSaga</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Hello Sagas!&apos;</span>);
}
</code></pre><h3 id="articleHeader6">&#xFF08;2&#xFF09;&#x5728;redux&#x4E2D;&#x4F7F;&#x7528;redux-saga&#x4E2D;&#x95F4;&#x4EF6;</h3><p>&#x5728;main.js&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, applyMiddleware } from &apos;redux&apos;
import createSagaMiddleware from &apos;redux-saga&apos;
import { helloSaga } from &apos;./sagas&apos;
const sagaMiddleware=createSagaMiddleware();
const store = createStore(
 reducer,
 applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(helloSaga);
//&#x4F1A;&#x8F93;&#x51FA;Hello, Sagas!
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { createStore, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux&apos;</span>
<span class="hljs-keyword">import</span> createSagaMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-saga&apos;</span>
<span class="hljs-keyword">import</span> { helloSaga } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./sagas&apos;</span>
<span class="hljs-keyword">const</span> sagaMiddleware=createSagaMiddleware();
<span class="hljs-keyword">const</span> store = createStore(
 reducer,
 applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(helloSaga);
<span class="hljs-comment">//&#x4F1A;&#x8F93;&#x51FA;Hello, Sagas!</span>
</code></pre><p>&#x548C;&#x8C03;&#x7528;redux&#x7684;&#x5176;&#x4ED6;&#x4E2D;&#x95F4;&#x4EF6;&#x4E00;&#x6837;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x4F7F;&#x7528;redux-saga&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x90A3;&#x4E48;&#x53EA;&#x8981;&#x5728;applyMiddleware&#x4E2D;&#x8C03;&#x7528;&#x4E00;&#x4E2A;createSagaMiddleware&#x7684;&#x5B9E;&#x4F8B;&#x3002;&#x552F;&#x4E00;&#x4E0D;&#x540C;&#x7684;&#x662F;&#x9700;&#x8981;&#x8C03;&#x7528;run&#x65B9;&#x6CD5;&#x4F7F;&#x5F97;generator&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x6267;&#x884C;&#x3002;</p><h2 id="articleHeader7">3.redux-saga&#x7684;&#x4F7F;&#x7528;&#x6280;&#x672F;&#x7EC6;&#x8282;</h2><p>redux-saga&#x9664;&#x4E86;&#x4E0A;&#x8FF0;&#x7684;action&#x7EDF;&#x4E00;&#x3001;&#x53EF;&#x4EE5;&#x96C6;&#x4E2D;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7B49;&#x4F18;&#x70B9;&#x5916;&#xFF0C;redux-saga&#x4E2D;&#x4F7F;&#x7528;&#x58F0;&#x660E;&#x5F0F;&#x7684;Effect&#x4EE5;&#x53CA;&#x63D0;&#x4F9B;&#x4E86;&#x66F4;&#x52A0;&#x7EC6;&#x817B;&#x7684;&#x63A7;&#x5236;&#x6D41;&#x3002;</p><h3 id="articleHeader8">&#xFF08;1&#xFF09;&#x58F0;&#x660E;&#x5F0F;&#x7684;Effect</h3><p>redux-saga&#x4E2D;&#x6700;&#x5927;&#x7684;&#x7279;&#x70B9;&#x5C31;&#x662F;&#x63D0;&#x4F9B;&#x4E86;&#x58F0;&#x660E;&#x5F0F;&#x7684;Effect&#xFF0C;&#x58F0;&#x660E;&#x5F0F;&#x7684;Effect&#x4F7F;&#x5F97;redux-saga&#x76D1;&#x542C;&#x539F;&#x59CB;js&#x5BF9;&#x8C61;&#x5F62;&#x5F0F;&#x7684;action&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x65B9;&#x4FBF;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x4E00;&#x6765;&#x770B;&#x3002;</p><ul><li>&#x9996;&#x5148;&#xFF0C;&#x5728;redux-saga&#x4E2D;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x7CFB;&#x5217;&#x7684;api&#xFF0C;&#x6BD4;&#x5982;take&#x3001;put&#x3001;all&#x3001;select&#x7B49;API &#xFF0C;&#x5728;redux-saga&#x4E2D;&#x5C06;&#x8FD9;&#x4E00;&#x7CFB;&#x5217;&#x7684;api&#x90FD;&#x5B9A;&#x4E49;&#x4E3A;Effect&#x3002;&#x8FD9;&#x4E9B;Effect&#x6267;&#x884C;&#x540E;&#xFF0C;&#x5F53;&#x51FD;&#x6570;resolve&#x65F6;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;redux-saga&#x4E2D;&#x95F4;&#x4EF6;&#x6839;&#x636E;&#x8FD9;&#x4E2A;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#x6062;&#x590D;&#x6267;&#x884C;generator&#x4E2D;&#x7684;&#x51FD;&#x6570;&#x3002;</li></ul><p>&#x9996;&#x5148;&#x6765;&#x770B;redux-thunk&#x7684;&#x5927;&#x4F53;&#x8FC7;&#x7A0B;&#xFF1A;</p><p><strong><em>action1(side function)&#x2014;&gt;redux-thunk&#x76D1;&#x542C;&#x2014;&gt;&#x6267;&#x884C;&#x76F8;&#x5E94;&#x7684;&#x6709;&#x526F;&#x4F5C;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#x2014;&gt;action2(plain object)</em></strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015583156?w=674&amp;h=150" src="https://static.alili.tech/img/remote/1460000015583156?w=674&amp;h=150" alt="2" title="2" style="cursor:pointer"></span></p><p>&#x8F6C;&#x5316;&#x5230;action2&#x662F;&#x4E00;&#x4E2A;&#x539F;&#x59CB;js&#x5BF9;&#x8C61;&#x5F62;&#x5F0F;&#x7684;action&#xFF0C;&#x7136;&#x540E;&#x6267;&#x884C;reducer&#x51FD;&#x6570;&#x5C31;&#x4F1A;&#x66F4;&#x65B0;store&#x4E2D;&#x7684;state&#x3002;</p><p>&#x800C;redux-saga&#x7684;&#x5927;&#x4F53;&#x8FC7;&#x7A0B;&#x5982;&#x4E0B;&#xFF1A;</p><p><strong><em>action1(plain object)&#x2014;&#x2014;&gt;redux-saga&#x76D1;&#x542C;&#x2014;&gt;&#x6267;&#x884C;&#x76F8;&#x5E94;&#x7684;Effect&#x65B9;&#x6CD5;&#x2014;&#x2014;&gt;&#x8FD4;&#x56DE;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#x2014;&gt;&#x6062;&#x590D;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x548C;&#x526F;&#x4F5C;&#x7528;&#x51FD;&#x6570;&#x2014;&gt;action2(plain object)</em></strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015583157" src="https://static.alili.tech/img/remote/1460000015583157" alt="default" title="default" style="cursor:pointer"></span></p><p>&#x5BF9;&#x6BD4;redux-thunk&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#xFF0C;redux-saga&#x4E2D;&#x76D1;&#x542C;&#x5230;&#x4E86;&#x539F;&#x59CB;js&#x5BF9;&#x8C61;action&#xFF0C;&#x5E76;&#x4E0D;&#x4F1A;&#x9A6C;&#x4E0A;&#x6267;&#x884C;&#x526F;&#x4F5C;&#x7528;&#x64CD;&#x4F5C;&#xFF0C;&#x4F1A;&#x5148;&#x901A;&#x8FC7;Effect&#x65B9;&#x6CD5;&#x5C06;&#x5176;&#x8F6C;&#x5316;&#x6210;&#x4E00;&#x4E2A;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5C06;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#xFF0C;&#x4F5C;&#x4E3A;&#x6807;&#x8BC6;&#xFF0C;&#x518D;&#x6062;&#x590D;&#x6267;&#x884C;&#x526F;&#x4F5C;&#x7528;&#x51FD;&#x6570;&#x3002;</p><p>&#x901A;&#x8FC7;&#x4F7F;&#x7528;Effect&#x7C7B;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x65B9;&#x4FBF;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x6D4B;&#x8BD5;&#x526F;&#x4F5C;&#x7528;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x3002;&#x53EA;&#x9700;&#x8981;&#x6BD4;&#x8F83;&#x6267;&#x884C;Effect&#x65B9;&#x6CD5;&#x540E;&#x8FD4;&#x56DE;&#x7684;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0E;&#x6211;&#x4EEC;&#x6240;&#x671F;&#x671B;&#x7684;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#x662F;&#x5426;&#x76F8;&#x540C;&#x5373;&#x53EF;&#x3002;</p><p>&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF0C;call&#x65B9;&#x6CD5;&#x662F;&#x4E00;&#x4E2A;Effect&#x7C7B;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { call } from &apos;redux-saga/effects&apos;

function* fetchProducts() {
  const products = yield call(Api.fetch, &apos;/products&apos;)
  // ...
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { call } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-saga/effects&apos;</span>

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">fetchProducts</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> products = <span class="hljs-keyword">yield</span> call(Api.fetch, <span class="hljs-string">&apos;/products&apos;</span>)
  <span class="hljs-comment">// ...</span>
}
</code></pre><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6D4B;&#x8BD5;Api.fetch&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x5426;&#x7B26;&#x5408;&#x9884;&#x671F;&#xFF0C;&#x901A;&#x8FC7;&#x8C03;&#x7528;call&#x65B9;&#x6CD5;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#x3002;&#x8FD9;&#x4E2A;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#x5305;&#x542B;&#x4E86;&#x6240;&#x9700;&#x8981;&#x8C03;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#x548C;&#x6267;&#x884C;&#x65B9;&#x6CD5;&#x65F6;&#x7684;&#x5B9E;&#x9645;&#x53C2;&#x6570;&#xFF0C;&#x6211;&#x4EEC;&#x8BA4;&#x4E3A;&#x53EA;&#x8981;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#x76F8;&#x540C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x53EA;&#x8981;&#x8C03;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#x548C;&#x6267;&#x884C;&#x8BE5;&#x65B9;&#x6CD5;&#x65F6;&#x7684;&#x5B9E;&#x9645;&#x53C2;&#x6570;&#x76F8;&#x540C;&#xFF0C;&#x5C31;&#x8BA4;&#x4E3A;&#x6700;&#x540E;&#x6267;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x80AF;&#x5B9A;&#x662F;&#x6EE1;&#x8DB3;&#x9884;&#x671F;&#x7684;&#xFF0C;&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x65B9;&#x4FBF;&#x7684;&#x8FDB;&#x884C;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x6A21;&#x62DF;Api.fetch&#x51FD;&#x6570;&#x7684;&#x5177;&#x4F53;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { call } from &apos;redux-saga/effects&apos;
import Api from &apos;...&apos;

const iterator = fetchProducts()

// expects a call instruction
assert.deepEqual(
  iterator.next().value,
  call(Api.fetch, &apos;/products&apos;),
  &quot;fetchProducts should yield an Effect call(Api.fetch, &apos;./products&apos;)&quot;
)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> { <span class="hljs-keyword">call</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-saga/effects&apos;</span>
<span class="hljs-keyword">import</span> Api <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;...&apos;</span>

const iterator = fetchProducts()

<span class="hljs-comment">// expects a call instruction</span>
assert.deepEqual(
  iterator.<span class="hljs-keyword">next</span>().value,
  <span class="hljs-keyword">call</span>(Api.fetch, <span class="hljs-string">&apos;/products&apos;</span>),
  <span class="hljs-string">&quot;fetchProducts should yield an Effect call(Api.fetch, &apos;./products&apos;)&quot;</span>
)
</code></pre><h3 id="articleHeader9">&#xFF08;2&#xFF09;Effect&#x63D0;&#x4F9B;&#x7684;&#x5177;&#x4F53;&#x65B9;&#x6CD5;</h3><p>&#x4E0B;&#x9762;&#x6765;&#x4ECB;&#x7ECD;&#x51E0;&#x4E2A;Effect&#x4E2D;&#x5E38;&#x7528;&#x7684;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x4ECE;&#x4F4E;&#x9636;&#x7684;API&#xFF0C;&#x6BD4;&#x5982;take&#xFF0C;call(apply)&#xFF0C;fork&#xFF0C;put&#xFF0C;select&#x7B49;&#xFF0C;&#x4EE5;&#x53CA;&#x9AD8;&#x9636;API&#xFF0C;&#x6BD4;&#x5982;takeEvery&#x548C;takeLatest&#x7B49;&#xFF0C;&#x4ECE;&#x800C;&#x52A0;&#x6DF1;&#x5BF9;redux-saga&#x7528;&#x6CD5;&#x7684;&#x8BA4;&#x8BC6;(&#x8FD9;&#x8282;&#x53EF;&#x80FD;&#x6BD4;&#x8F83;&#x751F;&#x6DA9;&#xFF0C;&#x5728;&#x7B2C;&#x4E09;&#x7AE0;&#x4E2D;&#x4F1A;&#x7ED3;&#x5408;&#x5177;&#x4F53;&#x7684;&#x5B9E;&#x4F8B;&#x6765;&#x5206;&#x6790;&#xFF0C;&#x672C;&#x5C0F;&#x8282;&#x5148;&#x5BF9;&#x5404;&#x79CD;Effect&#x6709;&#x4E00;&#x4E2A;&#x521D;&#x6B65;&#x7684;&#x4E86;&#x89E3;)&#x3002;</p><p>&#x5F15;&#x5165;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {take,call,put,select,fork,takeEvery,takeLatest} from &apos;redux-saga/effects&apos;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> {take,<span class="hljs-keyword">call</span>,put,select,fork,takeEvery,takeLatest} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-saga/effects&apos;</span>
</code></pre><ul><li>take</li></ul><p>take&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x662F;&#x7528;&#x6765;&#x76D1;&#x542C;action&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x76D1;&#x542C;&#x5230;&#x7684;action&#x5BF9;&#x8C61;&#x3002;&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const loginAction = {
   type:&apos;login&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs go"><code><span class="hljs-keyword">const</span> loginAction = {
   <span class="hljs-keyword">type</span>:<span class="hljs-string">&apos;login&apos;</span>
}</code></pre><p>&#x5728;UI Component&#x4E2D;dispatch&#x4E00;&#x4E2A;action:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch(loginAction)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">dispatch</span><span class="hljs-params">(loginAction)</span></span>
</code></pre><p>&#x5728;saga&#x4E2D;&#x4F7F;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const action = yield take(&apos;login&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-keyword">const</span> action = <span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">take</span>(<span class="hljs-params"><span class="hljs-string">&apos;login&apos;</span></span>)</span>;
</code></pre><p>&#x53EF;&#x4EE5;&#x76D1;&#x542C;&#x5230;UI&#x4F20;&#x9012;&#x5230;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;Action,&#x4E0A;&#x8FF0;take&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#xFF0C;&#x5C31;&#x662F;dipath&#x7684;&#x539F;&#x59CB;&#x5BF9;&#x8C61;&#x3002;&#x4E00;&#x65E6;&#x76D1;&#x542C;&#x5230;login&#x52A8;&#x4F5C;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;action&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type:&apos;login&apos;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>{
  <span class="hljs-attribute">type</span>:<span class="hljs-string">&apos;login&apos;</span>
}
</code></pre><ul><li>call(apply)</li></ul><p>call&#x548C;apply&#x65B9;&#x6CD5;&#x4E0E;js&#x4E2D;&#x7684;call&#x548C;apply&#x76F8;&#x4F3C;&#xFF0C;&#x6211;&#x4EEC;&#x4EE5;call&#x65B9;&#x6CD5;&#x4E3A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="call(fn, ...args)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">call</span><span class="hljs-params">(fn, ...args)</span></span>
</code></pre><p>call&#x65B9;&#x6CD5;&#x8C03;&#x7528;fn&#xFF0C;&#x53C2;&#x6570;&#x4E3A;args&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x63CF;&#x8FF0;&#x5BF9;&#x8C61;&#x3002;&#x4E0D;&#x8FC7;&#x8FD9;&#x91CC;call&#x65B9;&#x6CD5;&#x4F20;&#x5165;&#x7684;&#x51FD;&#x6570;fn&#x53EF;&#x4EE5;&#x662F;&#x666E;&#x901A;&#x51FD;&#x6570;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;generator&#x3002;call&#x65B9;&#x6CD5;&#x5E94;&#x7528;&#x5F88;&#x5E7F;&#x6CDB;&#xFF0C;&#x5728;redux-saga&#x4E2D;&#x4F7F;&#x7528;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x7B49;&#x5E38;&#x7528;call&#x65B9;&#x6CD5;&#x6765;&#x5B9E;&#x73B0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yield call(fetch,&apos;/userInfo&apos;,username)

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code>yield call(<span class="hljs-name">fetch</span>,&apos;/userInfo&apos;,username)

</code></pre><ul><li>put</li></ul><p>&#x5728;&#x524D;&#x9762;&#x63D0;&#x5230;&#xFF0C;redux-saga&#x505A;&#x4E3A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5DE5;&#x4F5C;&#x6D41;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><p><strong><em>UI&#x2014;&#x2014;&gt;action1&#x2014;&#x2014;&#x2014;&#x2014;&gt;redux-saga&#x4E2D;&#x95F4;&#x4EF6;&#x2014;&#x2014;&#x2014;&#x2014;&gt;action2&#x2014;&#x2014;&#x2014;&#x2014;&gt;reducer..</em></strong></p><p>&#x4ECE;&#x5DE5;&#x4F5C;&#x6D41;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53D1;&#x73B0;redux-saga&#x6267;&#x884C;&#x5B8C;&#x526F;&#x4F5C;&#x7528;&#x51FD;&#x6570;&#x540E;&#xFF0C;&#x5FC5;&#x987B;&#x53D1;&#x51FA;action&#xFF0C;&#x7136;&#x540E;&#x8FD9;&#x4E2A;action&#x88AB;reducer&#x76D1;&#x542C;&#xFF0C;&#x4ECE;&#x800C;&#x8FBE;&#x5230;&#x66F4;&#x65B0;state&#x7684;&#x76EE;&#x7684;&#x3002;&#x76F8;&#x5E94;&#x7684;&#x8FD9;&#x91CC;&#x7684;put&#x5BF9;&#x5E94;&#x4E0E;redux&#x4E2D;&#x7684;dispatch&#xFF0C;&#x5DE5;&#x4F5C;&#x6D41;&#x7A0B;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015583158?w=751&amp;h=150" src="https://static.alili.tech/img/remote/1460000015583158?w=751&amp;h=150" alt="default" title="default" style="cursor:pointer;display:inline"></span></p><p>&#x4ECE;&#x56FE;&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x51FA;redux-saga&#x6267;&#x884C;&#x526F;&#x4F5C;&#x7528;&#x65B9;&#x6CD5;&#x8F6C;&#x5316;action&#x65F6;&#xFF0C;put&#x8FD9;&#x4E2A;Effect&#x65B9;&#x6CD5;&#x8DDF;redux&#x539F;&#x59CB;&#x7684;dispatch&#x76F8;&#x4F3C;&#xFF0C;&#x90FD;&#x662F;&#x53EF;&#x4EE5;&#x53D1;&#x51FA;action&#xFF0C;&#x4E14;&#x53D1;&#x51FA;&#x7684;action&#x90FD;&#x4F1A;&#x88AB;reducer&#x76D1;&#x542C;&#x5230;&#x3002;put&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" yield put({type:&apos;login&apos;})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code> <span class="hljs-selector-tag">yield</span> <span class="hljs-selector-tag">put</span>({<span class="hljs-attribute">type</span>:<span class="hljs-string">&apos;login&apos;</span>})
</code></pre><ul><li>select</li></ul><p>put&#x65B9;&#x6CD5;&#x4E0E;redux&#x4E2D;&#x7684;dispatch&#x76F8;&#x5BF9;&#x5E94;&#xFF0C;&#x540C;&#x6837;&#x7684;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x5728;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x83B7;&#x53D6;state&#xFF0C;&#x90A3;&#x4E48;&#x9700;&#x8981;&#x4F7F;&#x7528;select&#x3002;select&#x65B9;&#x6CD5;&#x5BF9;&#x5E94;&#x7684;&#x662F;redux&#x4E2D;&#x7684;getState&#xFF0C;&#x7528;&#x6237;&#x83B7;&#x53D6;store&#x4E2D;&#x7684;state&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const state= yield select()
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>const <span class="hljs-keyword">state</span>= yield select()
</code></pre><ul><li>fork</li></ul><p>fork&#x65B9;&#x6CD5;&#x5728;&#x7B2C;&#x4E09;&#x7AE0;&#x7684;&#x5B9E;&#x4F8B;&#x4E2D;&#x4F1A;&#x8BE6;&#x7EC6;&#x7684;&#x4ECB;&#x7ECD;&#xFF0C;&#x8FD9;&#x91CC;&#x5148;&#x63D0;&#x4E00;&#x7B14;&#xFF0C;fork&#x65B9;&#x6CD5;&#x76F8;&#x5F53;&#x4E8E;web work&#xFF0C;fork&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x963B;&#x585E;&#x4E3B;&#x7EBF;&#x7A0B;&#xFF0C;&#x5728;&#x975E;&#x963B;&#x585E;&#x8C03;&#x7528;&#x4E2D;&#x5341;&#x5206;&#x6709;&#x7528;&#x3002;</p><ul><li>takeEvery&#x548C;takeLatest</li></ul><p>takeEvery&#x548C;takeLatest&#x7528;&#x4E8E;&#x76D1;&#x542C;&#x76F8;&#x5E94;&#x7684;&#x52A8;&#x4F5C;&#x5E76;&#x6267;&#x884C;&#x76F8;&#x5E94;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x662F;&#x6784;&#x5EFA;&#x5728;take&#x548C;fork&#x4E0A;&#x9762;&#x7684;&#x9AD8;&#x9636;api&#xFF0C;&#x6BD4;&#x5982;&#x8981;&#x76D1;&#x542C;login&#x52A8;&#x4F5C;&#xFF0C;&#x597D;&#x7528;takeEvery&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="takeEvery(&apos;login&apos;,loginFunc)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">takeEvery</span><span class="hljs-params">(<span class="hljs-string">&apos;login&apos;</span>,loginFunc)</span></span>
</code></pre><p>takeEvery&#x76D1;&#x542C;&#x5230;login&#x7684;&#x52A8;&#x4F5C;&#xFF0C;&#x5C31;&#x4F1A;&#x6267;&#x884C;loginFunc&#x65B9;&#x6CD5;&#xFF0C;&#x9664;&#x6B64;&#x4E4B;&#x5916;&#xFF0C;takeEvery&#x53EF;&#x4EE5;&#x540C;&#x65F6;&#x76D1;&#x542C;&#x5230;&#x591A;&#x4E2A;&#x76F8;&#x540C;&#x7684;action&#x3002;</p><p>takeLatest&#x65B9;&#x6CD5;&#x8DDF;takeEvery&#x662F;&#x76F8;&#x540C;&#x65B9;&#x5F0F;&#x8C03;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="takeLatest(&apos;login&apos;,loginFunc)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">takeLatest</span><span class="hljs-params">(<span class="hljs-string">&apos;login&apos;</span>,loginFunc)</span></span>
</code></pre><p>&#x4E0E;takeLatest&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;takeLatest&#x662F;&#x4F1A;&#x76D1;&#x542C;&#x6267;&#x884C;&#x6700;&#x8FD1;&#x7684;&#x90A3;&#x4E2A;&#x88AB;&#x89E6;&#x53D1;&#x7684;action&#x3002;</p><h2 id="articleHeader10">4.redux-saga&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x767B;&#x9646;&#x548C;&#x5217;&#x8868;&#x6837;&#x4F8B;</h2><p>&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;redux-saga&#x6837;&#x4F8B;&#xFF0C;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x767B;&#x9646;&#x9875;&#xFF0C;&#x767B;&#x9646;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x663E;&#x793A;&#x5217;&#x8868;&#x9875;&#xFF0C;&#x5E76;&#x4E14;&#xFF0C;&#x5728;&#x5217;&#x8868;&#x9875;&#xFF0C;&#x53EF;</p><p>&#x4EE5;&#x70B9;&#x51FB;&#x767B;&#x51FA;&#xFF0C;&#x8FD4;&#x56DE;&#x5230;&#x767B;&#x9646;&#x9875;&#x3002;&#x4F8B;&#x5B50;&#x7684;&#x6700;&#x7EC8;&#x5C55;&#x793A;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015583159" src="https://static.alili.tech/img/remote/1460000015583159" alt="login" title="login" style="cursor:pointer"></span></p><p>&#x6837;&#x4F8B;&#x7684;&#x529F;&#x80FD;&#x6D41;&#x7A0B;&#x56FE;&#x4E3A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015583160?w=364&amp;h=493" src="https://static.alili.tech/img/remote/1460000015583160?w=364&amp;h=493" alt="default" title="default" style="cursor:pointer"></span></p><p>&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x6309;&#x7167;&#x4E0A;&#x8FF0;&#x7684;&#x6D41;&#x7A0B;&#x6765;&#x4E00;&#x6B65;&#x6B65;&#x7684;&#x5B9E;&#x73B0;&#x6240;&#x5BF9;&#x5E94;&#x7684;&#x529F;&#x80FD;&#x3002;</p><h3 id="articleHeader11">(1)LoginPanel(&#x767B;&#x9646;&#x9875;)</h3><p>&#x767B;&#x9646;&#x9875;&#x7684;&#x529F;&#x80FD;&#x5305;&#x62EC;</p><ul><li>&#x8F93;&#x5165;&#x65F6;&#x65F6;&#x4FDD;&#x5B58;&#x7528;&#x6237;&#x540D;</li><li>&#x8F93;&#x5165;&#x65F6;&#x65F6;&#x4FDD;&#x5B58;&#x5BC6;&#x7801;</li><li>&#x70B9;&#x51FB;sign in &#x8BF7;&#x6C42;&#x5224;&#x65AD;&#x662F;&#x5426;&#x767B;&#x9646;&#x6210;&#x529F;</li></ul><h4>I&#xFF09;&#x8F93;&#x5165;&#x65F6;&#x65F6;&#x4FDD;&#x5B58;&#x7528;&#x6237;&#x540D;&#x548C;&#x5BC6;&#x7801;</h4><p>&#x7528;&#x6237;&#x540D;&#x8F93;&#x5165;&#x6846;&#x548C;&#x5BC6;&#x7801;&#x6846;onchange&#x65F6;&#x89E6;&#x53D1;&#x7684;&#x51FD;&#x6570;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" changeUsername:(e)=&gt;{
    dispatch({type:&apos;CHANGE_USERNAME&apos;,value:e.target.value});
 },
changePassword:(e)=&gt;{
  dispatch({type:&apos;CHANGE_PASSWORD&apos;,value:e.target.value});
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ocaml"><code> changeUsername:(e)=&gt;{
    dispatch({<span class="hljs-keyword">type</span>:<span class="hljs-symbol">&apos;CHANGE_USERNAME&apos;</span>,<span class="hljs-keyword">value</span>:e.target.<span class="hljs-keyword">value</span>});
 },
changePassword:(e)=&gt;{
  dispatch({<span class="hljs-keyword">type</span>:<span class="hljs-symbol">&apos;CHANGE_PASSWORD&apos;</span>,<span class="hljs-keyword">value</span>:e.target.<span class="hljs-keyword">value</span>});
}
</code></pre><p>&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x6700;&#x540E;&#x4F1A;dispatch&#x4E24;&#x4E2A;action&#xFF1A;<strong><em>CHANGE_USERNAME&#x548C;CHANGE_PASSWORD</em></strong>&#x3002;</p><p>&#x5728;saga.js&#x6587;&#x4EF6;&#x4E2D;&#x76D1;&#x542C;&#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x5E76;&#x6267;&#x884C;&#x526F;&#x4F5C;&#x7528;&#x51FD;&#x6570;&#xFF0C;&#x6700;&#x540E;put&#x53D1;&#x51FA;&#x8F6C;&#x5316;&#x540E;&#x7684;action&#xFF0C;&#x7ED9;reducer&#x51FD;&#x6570;&#x8C03;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function * watchUsername(){
  while(true){
    const action= yield take(&apos;CHANGE_USERNAME&apos;);
    yield put({type:&apos;change_username&apos;,
    value:action.value});
  }
}
function * watchPassword(){
  while(true){
    const action=yield take(&apos;CHANGE_PASSWORD&apos;);
    yield put({type:&apos;change_password&apos;,
    value:action.value});
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>function * watchUsername(){
  <span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>){
    <span class="hljs-keyword">const</span> action= <span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">take</span>(<span class="hljs-params"><span class="hljs-string">&apos;CHANGE_USERNAME&apos;</span></span>)</span>;
    <span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">put</span>(<span class="hljs-params">{type:<span class="hljs-string">&apos;change_username&apos;</span>,
    <span class="hljs-keyword">value</span>:action.<span class="hljs-keyword">value</span>}</span>)</span>;
  }
}
function * watchPassword(){
  <span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>){
    <span class="hljs-keyword">const</span> action=<span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">take</span>(<span class="hljs-params"><span class="hljs-string">&apos;CHANGE_PASSWORD&apos;</span></span>)</span>;
    <span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">put</span>(<span class="hljs-params">{type:<span class="hljs-string">&apos;change_password&apos;</span>,
    <span class="hljs-keyword">value</span>:action.<span class="hljs-keyword">value</span>}</span>)</span>;
  }
}
</code></pre><p>&#x6700;&#x540E;&#x5728;reducer&#x4E2D;&#x63A5;&#x6536;&#x5230;redux-saga&#x7684;put&#x65B9;&#x6CD5;&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;action&#xFF1A;<strong><em>change_username&#x548C;change_password</em></strong>&#xFF0C;&#x7136;&#x540E;&#x66F4;&#x65B0;state&#x3002;</p><h4>II&#xFF09;&#x76D1;&#x542C;&#x767B;&#x9646;&#x4E8B;&#x4EF6;&#x5224;&#x65AD;&#x767B;&#x9646;&#x662F;&#x5426;&#x6210;&#x529F;</h4><p>&#x5728;UI&#x4E2D;&#x53D1;&#x51FA;&#x7684;&#x767B;&#x9646;&#x4E8B;&#x4EF6;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="toLoginIn:(username,password)=&gt;{
  dispatch({type:&apos;TO_LOGIN_IN&apos;,username,password});
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>toLoginIn:<span class="hljs-function"><span class="hljs-params">(username,password)</span>=&gt;</span>{
  dispatch({type:<span class="hljs-string">&apos;TO_LOGIN_IN&apos;</span>,username,password});
}
</code></pre><p>&#x767B;&#x9646;&#x4E8B;&#x4EF6;&#x7684;action&#x4E3A;&#xFF1A;TO_LOGIN_IN.&#x5BF9;&#x4E8E;&#x767B;&#x5165;&#x4E8B;&#x4EF6;&#x7684;&#x5904;&#x7406;&#x51FD;&#x6570;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" while(true){
    //&#x76D1;&#x542C;&#x767B;&#x5165;&#x4E8B;&#x4EF6;
    const action1=yield take(&apos;TO_LOGIN_IN&apos;);
    const res=yield call(fetchSmart,&apos;/login&apos;,{
      method:&apos;POST&apos;,
      body:JSON.stringify({
        username:action1.username,
        password:action1.password
    })
    if(res){
      put({type:&apos;to_login_in&apos;});
    }
});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code> <span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>){
    <span class="hljs-comment">//&#x76D1;&#x542C;&#x767B;&#x5165;&#x4E8B;&#x4EF6;</span>
    <span class="hljs-keyword">const</span> action1=<span class="hljs-keyword">yield</span> take(<span class="hljs-string">&apos;TO_LOGIN_IN&apos;</span>);
    <span class="hljs-keyword">const</span> res=<span class="hljs-keyword">yield</span> call(fetchSmart,<span class="hljs-string">&apos;/login&apos;</span>,{
      method:<span class="hljs-string">&apos;POST&apos;</span>,
      body:<span class="hljs-built_in">JSON</span>.stringify({
        username:action1.username,
        password:action1.password
    })
    <span class="hljs-keyword">if</span>(res){
      put({<span class="hljs-keyword">type</span>:<span class="hljs-string">&apos;to_login_in&apos;</span>});
    }
});
</code></pre><p>&#x5728;&#x4E0A;&#x8FF0;&#x7684;&#x5904;&#x7406;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x9996;&#x5148;&#x76D1;&#x542C;&#x539F;&#x59CB;&#x52A8;&#x4F5C;&#x63D0;&#x53D6;&#x51FA;&#x4F20;&#x9012;&#x6765;&#x7684;&#x7528;&#x6237;&#x540D;&#x548C;&#x5BC6;&#x7801;&#xFF0C;&#x7136;&#x540E;&#x8BF7;&#x6C42;&#x662F;&#x5426;&#x767B;&#x9646;&#x6210;&#x529F;&#xFF0C;&#x5982;&#x679C;&#x767B;&#x9646;&#x6210;&#x529F;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x5219;&#x6267;&#x884C;put&#x7684;action:to_login_in.</p><h3 id="articleHeader12">(2) LoginSuccess(&#x767B;&#x9646;&#x6210;&#x529F;&#x5217;&#x8868;&#x5C55;&#x793A;&#x9875;)</h3><p>&#x767B;&#x9646;&#x6210;&#x529F;&#x540E;&#x7684;&#x9875;&#x9762;&#x529F;&#x80FD;&#x5305;&#x62EC;&#xFF1A;</p><ul><li>&#x83B7;&#x53D6;&#x5217;&#x8868;&#x4FE1;&#x606F;&#xFF0C;&#x5C55;&#x793A;&#x5217;&#x8868;&#x4FE1;&#x606F;</li><li>&#x767B;&#x51FA;&#x529F;&#x80FD;&#xFF0C;&#x70B9;&#x51FB;&#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x767B;&#x9646;&#x9875;&#x9762;</li></ul><h4>I&#xFF09;&#x83B7;&#x53D6;&#x5217;&#x8868;&#x4FE1;&#x606F;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {delay} from &apos;redux-saga&apos;;

function * getList(){
  try {
   yield delay(3000);
   const res = yield call(fetchSmart,&apos;/list&apos;,{
     method:&apos;POST&apos;,
     body:JSON.stringify({})
   });
   yield put({type:&apos;update_list&apos;,list:res.data.activityList});
 } catch(error) {
   yield put({type:&apos;update_list_error&apos;, error});
 }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> {delay} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-saga&apos;</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> * <span class="hljs-title">getList</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">try</span> {
   <span class="hljs-keyword">yield</span> delay(<span class="hljs-number">3000</span>);
   <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">yield</span> call(fetchSmart,<span class="hljs-string">&apos;/list&apos;</span>,{
     method:<span class="hljs-string">&apos;POST&apos;</span>,
     body:<span class="hljs-built_in">JSON</span>.stringify({})
   });
   <span class="hljs-keyword">yield</span> put({<span class="hljs-keyword">type</span>:<span class="hljs-string">&apos;update_list&apos;</span>,list:res.data.activityList});
 } <span class="hljs-keyword">catch</span>(error) {
   <span class="hljs-keyword">yield</span> put({<span class="hljs-keyword">type</span>:<span class="hljs-string">&apos;update_list_error&apos;</span>, error});
 }
}
</code></pre><p>&#x4E3A;&#x4E86;&#x6F14;&#x793A;&#x8BF7;&#x6C42;&#x8FC7;&#x7A0B;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x672C;&#x5730;mock&#xFF0C;&#x901A;&#x8FC7;redux-saga&#x7684;&#x5DE5;&#x5177;&#x51FD;&#x6570;delay&#xFF0C;delay&#x7684;&#x529F;&#x80FD;&#x76F8;&#x5F53;&#x4E8E;&#x5EF6;&#x8FDF;xx&#x79D2;&#xFF0C;&#x56E0;&#x4E3A;&#x771F;&#x5B9E;&#x7684;&#x8BF7;&#x6C42;&#x5B58;&#x5728;&#x5EF6;&#x8FDF;&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x7528;delay&#x5728;&#x672C;&#x5730;&#x6A21;&#x62DF;&#x771F;&#x5B9E;&#x573A;&#x666F;&#x4E0B;&#x7684;&#x8BF7;&#x6C42;&#x5EF6;&#x8FDF;&#x3002;</p><h4>II&#xFF09;&#x767B;&#x51FA;&#x529F;&#x80FD;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const action2=yield take(&apos;TO_LOGIN_OUT&apos;);
yield put({type:&apos;to_login_out&apos;});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-keyword">const</span> action2=<span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">take</span>(<span class="hljs-params"><span class="hljs-string">&apos;TO_LOGIN_OUT&apos;</span></span>)</span>;
<span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">put</span>(<span class="hljs-params">{type:<span class="hljs-string">&apos;to_login_out&apos;</span>}</span>)</span>;
</code></pre><p>&#x4E0E;&#x767B;&#x5165;&#x76F8;&#x4F3C;&#xFF0C;&#x767B;&#x51FA;&#x7684;&#x529F;&#x80FD;&#x4ECE;UI&#x5904;&#x63A5;&#x53D7;action:TO_LOGIN_OUT,&#x7136;&#x540E;&#x8F6C;&#x53D1;action:to_login_out</p><h3 id="articleHeader13">(3) &#x5B8C;&#x6574;&#x7684;&#x5B9E;&#x73B0;&#x767B;&#x5165;&#x767B;&#x51FA;&#x548C;&#x5217;&#x8868;&#x5C55;&#x793A;&#x7684;&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function * getList(){
  try {
   yield delay(3000);
   const res = yield call(fetchSmart,&apos;/list&apos;,{
     method:&apos;POST&apos;,
     body:JSON.stringify({})
   });
   yield put({type:&apos;update_list&apos;,list:res.data.activityList});
 } catch(error) {
   yield put({type:&apos;update_list_error&apos;, error});
 }
}

function * watchIsLogin(){
  while(true){
    //&#x76D1;&#x542C;&#x767B;&#x5165;&#x4E8B;&#x4EF6;
    const action1=yield take(&apos;TO_LOGIN_IN&apos;);
    
    const res=yield call(fetchSmart,&apos;/login&apos;,{
      method:&apos;POST&apos;,
      body:JSON.stringify({
        username:action1.username,
        password:action1.password
      })
    });
    
    //&#x6839;&#x636E;&#x8FD4;&#x56DE;&#x7684;&#x72B6;&#x6001;&#x7801;&#x5224;&#x65AD;&#x767B;&#x9646;&#x662F;&#x5426;&#x6210;&#x529F;
    if(res.status===10000){
      yield put({type:&apos;to_login_in&apos;});
      //&#x767B;&#x9646;&#x6210;&#x529F;&#x540E;&#x83B7;&#x53D6;&#x9996;&#x9875;&#x7684;&#x6D3B;&#x52A8;&#x5217;&#x8868;
      yield call(getList);
    }
    
    //&#x76D1;&#x542C;&#x767B;&#x51FA;&#x4E8B;&#x4EF6;
    const action2=yield take(&apos;TO_LOGIN_OUT&apos;);
    yield put({type:&apos;to_login_out&apos;});
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>function * getList(){
  <span class="hljs-keyword">try</span> {
   <span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">delay</span>(<span class="hljs-params"><span class="hljs-number">3000</span></span>)</span>;
   <span class="hljs-keyword">const</span> res = <span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">call</span>(<span class="hljs-params">fetchSmart,<span class="hljs-string">&apos;/list&apos;</span>,{
     method:<span class="hljs-string">&apos;POST&apos;</span>,
     body:JSON.stringify({}</span>)
   })</span>;
   <span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">put</span>(<span class="hljs-params">{type:<span class="hljs-string">&apos;update_list&apos;</span>,list:res.data.activityList}</span>)</span>;
 } <span class="hljs-keyword">catch</span>(error) {
   <span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">put</span>(<span class="hljs-params">{type:<span class="hljs-string">&apos;update_list_error&apos;</span>, error}</span>)</span>;
 }
}

function * watchIsLogin(){
  <span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>){
    <span class="hljs-comment">//&#x76D1;&#x542C;&#x767B;&#x5165;&#x4E8B;&#x4EF6;</span>
    <span class="hljs-keyword">const</span> action1=<span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">take</span>(<span class="hljs-params"><span class="hljs-string">&apos;TO_LOGIN_IN&apos;</span></span>)</span>;
    
    <span class="hljs-keyword">const</span> res=<span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">call</span>(<span class="hljs-params">fetchSmart,<span class="hljs-string">&apos;/login&apos;</span>,{
      method:<span class="hljs-string">&apos;POST&apos;</span>,
      body:JSON.stringify({
        username:action1.username,
        password:action1.password
      }</span>)
    })</span>;
    
    <span class="hljs-comment">//&#x6839;&#x636E;&#x8FD4;&#x56DE;&#x7684;&#x72B6;&#x6001;&#x7801;&#x5224;&#x65AD;&#x767B;&#x9646;&#x662F;&#x5426;&#x6210;&#x529F;</span>
    <span class="hljs-keyword">if</span>(res.status===<span class="hljs-number">10000</span>){
      <span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">put</span>(<span class="hljs-params">{type:<span class="hljs-string">&apos;to_login_in&apos;</span>}</span>)</span>;
      <span class="hljs-comment">//&#x767B;&#x9646;&#x6210;&#x529F;&#x540E;&#x83B7;&#x53D6;&#x9996;&#x9875;&#x7684;&#x6D3B;&#x52A8;&#x5217;&#x8868;</span>
      <span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">call</span>(<span class="hljs-params">getList</span>)</span>;
    }
    
    <span class="hljs-comment">//&#x76D1;&#x542C;&#x767B;&#x51FA;&#x4E8B;&#x4EF6;</span>
    <span class="hljs-keyword">const</span> action2=<span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">take</span>(<span class="hljs-params"><span class="hljs-string">&apos;TO_LOGIN_OUT&apos;</span></span>)</span>;
    <span class="hljs-function"><span class="hljs-keyword">yield</span> <span class="hljs-title">put</span>(<span class="hljs-params">{type:<span class="hljs-string">&apos;to_login_out&apos;</span>}</span>)</span>;
  }
}
</code></pre><p>&#x901A;&#x8FC7;&#x8BF7;&#x6C42;&#x72B6;&#x6001;&#x7801;&#x5224;&#x65AD;&#x767B;&#x5165;&#x662F;&#x5426;&#x6210;&#x529F;&#xFF0C;&#x5728;&#x767B;&#x9646;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yield call(getList)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs excel"><code><span class="hljs-built_in">yield</span> <span class="hljs-built_in">call</span>(getList)
</code></pre><p>&#x7684;&#x65B9;&#x5F0F;&#x8C03;&#x7528;&#x83B7;&#x53D6;&#x6D3B;&#x52A8;&#x5217;&#x8868;&#x7684;&#x51FD;&#x6570;getList&#x3002;&#x8FD9;&#x6837;&#x548B;&#x4E00;&#x770B;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#x6CE8;&#x610F;call&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x662F;&#x4F1A;&#x963B;&#x585E;&#x4E3B;&#x7EBF;&#x7A0B;&#x7684;&#xFF0C;&#x5177;&#x4F53;&#x6765;&#x8BF4;&#xFF1A;</p><ul><li>&#x5728;call&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x7ED3;&#x675F;&#x4E4B;&#x524D;&#xFF0C;call&#x65B9;&#x6CD5;&#x4E4B;&#x540E;&#x7684;&#x8BED;&#x53E5;&#x662F;&#x65E0;&#x6CD5;&#x6267;&#x884C;&#x7684;</li><li>&#x5982;&#x679C;call(getList)&#x5B58;&#x5728;&#x5EF6;&#x8FDF;&#xFF0C;call(getList)&#x4E4B;&#x540E;&#x7684;&#x8BED;&#x53E5; const action2=yieldtake(&apos;TO_LOGIN_OUT&apos;)&#x5728;call&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x4E4B;&#x524D;&#x65E0;&#x6CD5;&#x6267;&#x884C;</li><li><p>&#x5728;&#x5EF6;&#x8FDF;&#x671F;&#x95F4;&#x7684;&#x767B;&#x51FA;&#x64CD;&#x4F5C;&#x4F1A;&#x88AB;&#x5FFD;&#x7565;&#x3002;</p></li></ul><p>&#x7528;&#x6846;&#x56FE;&#x53EF;&#x4EE5;&#x66F4;&#x6E05;&#x695A;&#x7684;&#x5206;&#x6790;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015583161" src="https://static.alili.tech/img/remote/1460000015583161" alt="default" title="default" style="cursor:pointer"></span></p><p>call&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x963B;&#x585E;&#x4E3B;&#x7EBF;&#x7A0B;&#x7684;&#x5177;&#x4F53;&#x6548;&#x679C;&#x5982;&#x4E0B;&#x52A8;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015583162" src="https://static.alili.tech/img/remote/1460000015583162" alt="login_1" title="login_1" style="cursor:pointer"></span></p><p>&#x767D;&#x5C4F;&#x65F6;&#x4E3A;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#x7684;&#x7B49;&#x5F85;&#x65F6;&#x95F4;&#xFF0C;&#x5728;&#x6B64;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x70B9;&#x51FB;&#x767B;&#x51FA;&#x6309;&#x94AE;&#xFF0C;&#x65E0;&#x6CD5;&#x54CD;&#x5E94;&#x767B;&#x51FA;&#x529F;&#x80FD;&#xFF0C;&#x76F4;&#x5230;&#x8BF7;&#x6C42;&#x5217;&#x8868;&#x6210;&#x529F;&#xFF0C;&#x5C55;&#x793A;&#x5217;&#x8868;&#x4FE1;&#x606F;&#x540E;&#xFF0C;&#x70B9;&#x51FB;&#x767B;&#x51FA;&#x6309;&#x94AE;&#x624D;&#x6709;&#x76F8;&#x5E94;&#x7684;&#x767B;&#x51FA;&#x529F;&#x80FD;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;call&#x65B9;&#x6CD5;&#x963B;&#x585E;&#x4E86;&#x4E3B;&#x7EBF;&#x7A0B;&#x3002;</p><h3 id="articleHeader14">(4) &#x65E0;&#x963B;&#x585E;&#x8C03;&#x7528;</h3><p>&#x6211;&#x4EEC;&#x5728;&#x7B2C;&#x4E8C;&#x7AE0;&#x4E2D;&#xFF0C;&#x4ECB;&#x7ECD;&#x4E86;fork&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x7C7B;&#x4F3C;&#x4E0E;web work&#xFF0C;fork&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x963B;&#x585E;&#x4E3B;&#x7EBF;&#x7A0B;&#x3002;&#x5E94;&#x7528;&#x4E8E;&#x4E0A;&#x8FF0;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yield call(getList)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs excel"><code><span class="hljs-built_in">yield</span> <span class="hljs-built_in">call</span>(getList)
</code></pre><p>&#x4FEE;&#x6539;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yield fork(getList)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code>yield fork(<span class="hljs-name">getList</span>)
</code></pre><p>&#x8FD9;&#x6837;&#x5C55;&#x793A;&#x7684;&#x7ED3;&#x679C;&#x4E3A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015583163" src="https://static.alili.tech/img/remote/1460000015583163" alt="login_2" title="login_2" style="cursor:pointer"></span></p><p>&#x901A;&#x8FC7;fork&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x963B;&#x585E;&#x4E3B;&#x7EBF;&#x7A0B;&#xFF0C;&#x5728;&#x767D;&#x5C4F;&#x65F6;&#x70B9;&#x51FB;&#x767B;&#x51FA;&#xFF0C;&#x53EF;&#x4EE5;&#x7ACB;&#x523B;&#x54CD;&#x5E94;&#x767B;&#x51FA;&#x529F;&#x80FD;&#xFF0C;&#x4ECE;&#x800C;&#x8FD4;&#x56DE;&#x767B;&#x9646;&#x9875;&#x9762;&#x3002;</p><h2 id="articleHeader15">5.&#x603B;&#x7ED3;</h2><p>&#x901A;&#x8FC7;&#x4E0A;&#x8FF0;&#x7AE0;&#x8282;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6982;&#x62EC;&#x51FA;redux-saga&#x505A;&#x4E3A;redux&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x5168;&#x90E8;&#x4F18;&#x70B9;&#xFF1A;</p><ul><li>&#x7EDF;&#x4E00;action&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x5728;redux-saga&#x4E2D;&#xFF0C;&#x4ECE;UI&#x4E2D;dispatch&#x7684;action&#x4E3A;&#x539F;&#x59CB;&#x5BF9;&#x8C61;</li><li>&#x96C6;&#x4E2D;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x7B49;&#x5B58;&#x5728;&#x526F;&#x4F5C;&#x7528;&#x7684;&#x903B;&#x8F91;</li><li>&#x901A;&#x8FC7;&#x8F6C;&#x5316;effects&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x65B9;&#x4FBF;&#x8FDB;&#x884C;&#x5355;&#x5143;&#x6D4B;&#x8BD5;</li><li>&#x5B8C;&#x5584;&#x548C;&#x4E25;&#x8C28;&#x7684;&#x6D41;&#x7A0B;&#x63A7;&#x5236;&#xFF0C;&#x53EF;&#x4EE5;&#x8F83;&#x4E3A;&#x6E05;&#x6670;&#x7684;&#x63A7;&#x5236;&#x590D;&#x6742;&#x7684;&#x903B;&#x8F91;&#x3002;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
彻彻底底教会你使用Redux-saga(包含样例代码)

## 原文链接
[https://segmentfault.com/a/1190000015583055](https://segmentfault.com/a/1190000015583055)

