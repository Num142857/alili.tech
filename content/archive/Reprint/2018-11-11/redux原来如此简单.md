---
title: redux原来如此简单
hidden: true
categories: reprint
slug: ca5a1e3
date: 2018-11-11 02:30:07
---

{{< raw >}}
<p>Redux &#x662F; JavaScript &#x72B6;&#x6001;&#x5BB9;&#x5668;&#xFF0C; &#x63D0;&#x4F9B;<strong>&#x53EF;&#x9884;&#x6D4B;&#x5316;</strong>&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x3002;</p><p>&#x90A3;&#x4EC0;&#x4E48;&#x662F;&#x53EF;&#x4EE5;&#x9884;&#x6D4B;&#x5316;&#xFF0C;&#x6211;&#x7684;&#x7406;&#x89E3;&#x5C31;&#x662F;&#x6839;&#x636E;&#x4E00;&#x4E2A;&#x56FA;&#x5B9A;&#x7684;&#x8F93;&#x5165;&#xFF0C;&#x5FC5;&#x7136;&#x4F1A;&#x5F97;&#x5230;&#x4E00;&#x4E2A;&#x56FA;&#x5B9A;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><p>redux&#x662F;&#x4E13;&#x95E8;&#x4E3A;react&#x5F00;&#x53D1;&#x7684;&#xFF0C;&#x4F46;&#x5E76;&#x4E0D;&#x662F;&#x53EA;&#x80FD;&#x7528;&#x4E8E;react,&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x4EFB;&#x4F55;&#x754C;&#x9762;&#x5E93;&#x3002;</p><h1 id="articleHeader0">&#x52A8;&#x673A;</h1><p>&#x968F;&#x7740;&#x5355;&#x9875;&#x9762;&#x5E94;&#x7528;&#x7684;&#x666E;&#x53CA;&#xFF0C;web app&#x5185;&#x90E8;&#x9700;&#x8981;&#x7BA1;&#x7406;&#x7684;&#x72B6;&#x6001;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#xFF0C;&#x8FD9;&#x4E9B;&#x72B6;&#x6001;&#x53EF;&#x80FD;&#x6765;&#x81EA;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#xFF0C;&#x7528;&#x6237;&#x8F93;&#x5165;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x7528;&#x6237;&#x4EA4;&#x4E92;&#x6570;&#x636E;&#xFF0C;&#x5F53;&#x524D;UI&#x72B6;&#x6001;&#xFF0C;&#x672C;&#x5730;&#x7684;&#x7F13;&#x5B58;&#x6570;&#x636E;&#x7B49;&#x7B49;&#x3002;&#x5982;&#x4F55;&#x80FD;&#x591F;&#x6709;&#x6761;&#x7406;&#x7684;&#x7BA1;&#x7406;&#x8FD9;&#x4E9B;&#x6570;&#x636E;&#xFF0C;&#x6210;&#x4E3A;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x4E2D;&#x4E00;&#x4E2A;&#x96BE;&#x9898;&#x3002;</p><h1 id="articleHeader1">&#x6838;&#x5FC3;&#x6982;&#x5FF5;</h1><h2 id="articleHeader2">&#x4E09;&#x5927;&#x539F;&#x5219;</h2><h3 id="articleHeader3">&#x5355;&#x4E00;&#x6570;&#x636E;&#x6E90;</h3><p>&#x4F7F;&#x7528;redux&#x7684;&#x7A0B;&#x5E8F;&#xFF0C;&#x6240;&#x6709;&#x7684;state&#x90FD;&#x5B58;&#x50A8;&#x5728;&#x4E00;&#x4E2A;&#x5355;&#x4E00;&#x7684;&#x6570;&#x636E;&#x6E90;store&#x5185;&#x90E8;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E00;&#x4E2A;&#x5DE8;&#x5927;&#x7684;&#x5BF9;&#x8C61;&#x6811;&#x3002;</p><h3 id="articleHeader4">state&#x662F;&#x53EA;&#x8BFB;&#x7684;</h3><p>state&#x662F;&#x53EA;&#x8BFB;&#x7684;&#xFF0C;&#x80FD;&#x6539;&#x53D8;state&#x7684;&#x552F;&#x4E00;&#x65B9;&#x5F0F;&#x662F;&#x901A;&#x8FC7;&#x89E6;&#x53D1;action&#x6765;&#x4FEE;&#x6539;</p><h3 id="articleHeader5">&#x4F7F;&#x7528;&#x7EAF;&#x51FD;&#x6570;&#x6267;&#x884C;&#x4FEE;&#x6539;</h3><p>&#x4E3A;&#x4E86;&#x63CF;&#x8FF0; action &#x5982;&#x4F55;&#x6539;&#x53D8; state tree &#xFF0C; &#x4F60;&#x9700;&#x8981;&#x7F16;&#x5199; reducers&#x3002;</p><p>reducers&#x662F;&#x4E00;&#x4E9B;&#x7EAF;&#x51FD;&#x6570;&#xFF0C;&#x63A5;&#x53E3;&#x5F53;&#x524D;state&#x548C;action&#x3002;&#x53EA;&#x9700;&#x8981;&#x6839;&#x636E;action&#xFF0C;&#x8FD4;&#x56DE;&#x5BF9;&#x5E94;&#x7684;state&#x3002;&#x800C;&#x4E14;&#x5FC5;&#x987B;&#x8981;&#x6709;&#x8FD4;&#x56DE;&#x3002;</p><p><em>&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x53EA;&#x4F9D;&#x8D56;&#x4E8E;&#x5B83;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x91CC;&#x9762;&#x6CA1;&#x6709;&#x526F;&#x4F5C;&#x7528;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x628A;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x53EB;&#x505A;&#x7EAF;&#x51FD;&#x6570;</em></p><h1 id="articleHeader6">&#x57FA;&#x7840;</h1><h2 id="articleHeader7">action</h2><p>&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF0C;action&#x5C31;&#x662F;&#x52A8;&#x4F5C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x52A8;&#x4F5C;&#x6765;&#x4FEE;&#x6539;state&#x7684;&#x503C;&#x3002;&#x4E5F;&#x662F;&#x4FEE;&#x6539;store&#x7684;&#x552F;&#x4E00;&#x9014;&#x5F84;&#x3002;</p><p>action&#x672C;&#x8D28;&#x4E0A;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x666E;&#x901A;js&#x5BF9;&#x8C61;&#xFF0C;&#x6211;&#x4EEC;&#x7EA6;&#x5B9A;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5FC5;&#x987B;&#x6709;&#x4E00;&#x4E2A;&#x5B57;&#x6BB5;type&#xFF0C;&#x6765;&#x8868;&#x793A;&#x6211;&#x4EEC;&#x7684;&#x52A8;&#x4F5C;&#x540D;&#x79F0;&#x3002;&#x4E00;&#x822C;&#x6211;&#x4EEC;&#x4F1A;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x5E38;&#x91CF;&#x6765;&#x8868;&#x793A;type&#x5BF9;&#x5E94;&#x7684;&#x503C;&#x3002;</p><p>&#x6B64;&#x5916;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x4F1A;&#x628A;&#x5E0C;&#x671B;state&#x53D8;&#x6210;&#x4EC0;&#x4E48;&#x6837;&#x5B50;&#x7684;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#x901A;&#x8FC7;action&#x4F20;&#x8FDB;&#x6765;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x91CC;action&#x53EF;&#x80FD;&#x4F1A;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x5B50;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    type: &apos;TOGGLE_TODO&apos;,
    index: 5
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>{
    <span class="hljs-attribute">type</span>: <span class="hljs-string">&apos;TOGGLE_TODO&apos;</span>,
    index: <span class="hljs-number">5</span>
}</code></pre><h2 id="articleHeader8">Reducer</h2><p>Action &#x53EA;&#x662F;&#x63CF;&#x8FF0;&#x4E86;&#x6709;&#x4E8B;&#x60C5;&#x53D1;&#x751F;&#x4E86;&#x8FD9;&#x4EF6;&#x4E8B;&#x5B9E;&#xFF0C;&#x4F46;&#x5E76;&#x6CA1;&#x6709;&#x8BF4;&#x660E;&#x8981;&#x505A;&#x54EA;&#x4E9B;&#x6539;&#x53D8;&#xFF0C;&#x8FD9;&#x6B63;&#x662F;reducer&#x9700;&#x8981;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x3002;</p><p>Reducer&#x4F5C;&#x4E3A;&#x7EAF;&#x51FD;&#x6570;&#xFF0C;&#x5185;&#x90E8;&#x4E0D;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;&#x4EFB;&#x4F55;&#x6709;&#x526F;&#x4F5C;&#x7528;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x6BD4;&#x5982;&#x64CD;&#x4F5C;&#x5916;&#x90E8;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x4EFB;&#x4F55;&#x5BFC;&#x81F4;&#x76F8;&#x540C;&#x8F93;&#x5165;&#x4F46;&#x8F93;&#x51FA;&#x5374;&#x4E0D;&#x4E00;&#x81F4;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x7684;reducer&#x6BD4;&#x8F83;&#x591A;&#xFF0C;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x80FD;&#x628A;&#x6240;&#x6709;&#x7684;&#x903B;&#x8F91;&#x90FD;&#x653E;&#x5230;&#x4E00;&#x4E2A;reducer&#x91CC;&#x9762;&#x53BB;&#x5904;&#x7406;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x5C31;&#x9700;&#x8981;&#x62C6;&#x5206;reducer&#x3002;</p><p>&#x5E78;&#x597D;&#xFF0C;redux&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;api&#x5C31;&#x662F;combineReducers Api&#x3002;</p><h2 id="articleHeader9">store</h2><p>store&#x662F;redux&#x5E94;&#x7528;&#x7684;&#x552F;&#x4E00;&#x6570;&#x636E;&#x6E90;&#xFF0C;&#x6211;&#x4EEC;&#x8C03;&#x7528;createStore Api&#x521B;&#x5EFA;store&#x3002;</p><h1 id="articleHeader10">&#x8131;&#x79BB;react&#x7684;redux&#x6848;&#x4F8B;</h1><h2 id="articleHeader11">store&#xFF0C;reducer&#x57FA;&#x7840;&#x4F7F;&#x7528;</h2><p>&#x7B2C;&#x4E00;&#x6B65;&#x642D;&#x5EFA;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x4ECB;&#x7ECD;&#x4E86;&#xFF0C;&#x53C2;&#x8003;&#x4E0A;&#x4E00;&#x7BC7;&#x6587;&#x7AE0; <a href="https://segmentfault.com/a/1190000016296697">&#x624B;&#x628A;&#x624B;&#x6559;&#x4F1A;&#x4F7F;&#x7528;react&#x5F00;&#x53D1;&#x65E5;&#x5386;&#x7EC4;&#x4EF6;</a>&#xFF0C;&#x642D;&#x5EFA;&#x73AF;&#x5883;&#x90E8;&#x5206;</p><p>&#x642D;&#x5EFA;&#x597D;&#x73AF;&#x5883;&#x5207;&#x6362;&#x5230;&#x76EE;&#x5F55;&#x4E0B;&#x9762;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install redux --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> redux <span class="hljs-comment">--save</span></code></pre><p>&#x628A;index.tsx&#x4FEE;&#x6539;&#x4E3A;&#x4E4B;&#x4E0B;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, combineReducers, applyMiddleware } from &apos;redux&apos;

var simpleReducer = function(state = {}, action) {
  return {
    user: {
      name: &apos;redux&apos;
    }
  }
}

var store = createStore(simpleReducer)

console.log(store.getState())
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { createStore, combineReducers, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux&apos;</span>

<span class="hljs-keyword">var</span> simpleReducer = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">state = {}, action</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">user</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;redux&apos;</span>
    }
  }
}

<span class="hljs-keyword">var</span> store = createStore(simpleReducer)

<span class="hljs-built_in">console</span>.log(store.getState())
</code></pre><p>&#x6211;&#x4EEC;&#x770B;&#x5230;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x51FA;&#x6765;&#x7684;&#x4E00;&#x4E2A;&#x5305;&#x542B;user&#x4FE1;&#x606F;&#x7684;&#x8FD9;&#x4E48;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;</p><p>&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x5230;&#x4E86;&#x51E0;&#x4E2A;api? <code>createStore</code>&#x521B;&#x5EFA;store&#xFF0C;<code>store.getState()</code>&#x83B7;&#x53D6;store&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x552F;&#x4E00;&#x6570;&#x636E;&#x6E90;&#x7684;&#x6839;&#x8282;&#x70B9;&#x3002;</p><p>&#x4E0A;&#x6587;&#x6211;&#x4EEC;&#x4E5F;&#x8BB2;&#x8FC7;&#xFF0C;action&#x7684;&#x60C5;&#x51B5;&#x53EF;&#x80FD;&#x4F1A;&#x6BD4;&#x8F83;&#x591A;&#xFF0C;redux&#x4E5F;&#x63D0;&#x4F9B;&#x4E86;<code>combineReducers</code> Api&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6709;&#x591A;&#x4E2A;reducer,&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x4E86;&#x3002;</p><p>&#x90A3;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x591A;&#x4E2A;reducer&#x6D4B;&#x8BD5;&#x4E00;&#x4E0B;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, combineReducers, applyMiddleware } from &apos;redux&apos;

function user(state = {name: &apos;redux&apos;}, action) {
  switch (action.type) {
    case &apos;CHANGE_NAME&apos;:
      return {
        ...state,
        name: action.name
      }
  }

  return state
}

function project(state = {name: &apos;min-react&apos;}, action) {
  switch (action.type) {
    case &apos;CHANGE_NAME&apos;:
      return {
        ...state,
        name: action.name
      }
  }

  return state
}


var rootReducer = combineReducers({
  user,
  project
})

var store = createStore(rootReducer)

console.log(store.getState())" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>import { createStore, combineReducers, applyMiddleware } <span class="hljs-keyword">from</span> &apos;redux&apos;

function <span class="hljs-keyword">user</span>(<span class="hljs-keyword">state</span> = {name: &apos;redux&apos;}, action) {
  switch (action.type) {
    case &apos;CHANGE_NAME&apos;:
      return {
        ...<span class="hljs-keyword">state</span>,
        name: action.name
      }
  }

  return <span class="hljs-keyword">state</span>
}

function project(<span class="hljs-keyword">state</span> = {name: &apos;min-react&apos;}, action) {
  switch (action.type) {
    case &apos;CHANGE_NAME&apos;:
      return {
        ...<span class="hljs-keyword">state</span>,
        name: action.name
      }
  }

  return <span class="hljs-keyword">state</span>
}


var rootReducer = combineReducers({
  <span class="hljs-keyword">user</span>,
  project
})

var store = createStore(rootReducer)

console.<span class="hljs-keyword">log</span>(store.getState())</code></pre><p>&#x5982;&#x6211;&#x4EEC;&#x6240;&#x9884;&#x6599;&#x4E00;&#x6837;&#xFF0C;&#x6211;&#x4EEC;&#x5F97;&#x5230;&#x62E5;&#x6709;&#x4E24;&#x4E2A;&#x5B57;&#x6BB5;&#x7684;&#x6839;store&#x3002;</p><h2 id="articleHeader12">&#x7ED3;&#x5408;view&#x4F7F;&#x7528;</h2><p>&#x7B2C;&#x4E00;&#x6B65;&#x6211;&#x4EEC;&#x628A;html&#x6539;&#x9020;&#x6210;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#xFF0C;&#x65B0;&#x589E;&#x4E86;&#x4E00;&#x70B9;&#x6807;&#x7B7E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;style type=&quot;text/css&quot;&gt;
        * {
            margin: 0;
            padding: 0;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id=&quot;userName&quot;&gt;&lt;/div&gt;
    &lt;input id=&quot;userNameInput&quot;/&gt;&lt;button id=&quot;userNameButton&quot;&gt;&#x66F4;&#x6539;userName&lt;/button&gt;
    &lt;script src=&quot;./dist/main.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span>&gt;</span><span class="css">
        * {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;userName&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;userNameInput&quot;</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;userNameButton&quot;</span>&gt;</span>&#x66F4;&#x6539;userName<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./dist/main.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x7B2C;&#x4E8C;&#x6B65;&#xFF0C;&#x4FEE;&#x6539;index.tsx&#xFF0C;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, combineReducers, applyMiddleware } from &apos;redux&apos;
import { func } from &apos;prop-types&apos;

function user(state = {name: &apos;redux&apos;}, action) {
  switch (action.type) {
    case &apos;CHANGE_USER_NAME&apos;:
      return {
        ...state,
        name: action.name
      }
  }

  return state
}

function project(state = {name: &apos;min-react&apos;}, action) {
  switch (action.type) {
    case &apos;CHANGE_PROJECT_NAME&apos;:
      return {
        ...state,
        name: action.name
      }
  }

  return state
}


var rootReducer = combineReducers({
  user,
  project
})

var store = createStore(rootReducer)

function render(state = store.getState()) {
  var $userName = document.getElementById(&apos;userName&apos;)
  $userName.innerHTML = state.user.name
}

render()

console.log(store.getState())" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>import { createStore, combineReducers, applyMiddleware } <span class="hljs-keyword">from</span> &apos;redux&apos;
import { func } <span class="hljs-keyword">from</span> &apos;prop-types&apos;

function <span class="hljs-keyword">user</span>(<span class="hljs-keyword">state</span> = {name: &apos;redux&apos;}, action) {
  switch (action.type) {
    case &apos;CHANGE_USER_NAME&apos;:
      return {
        ...<span class="hljs-keyword">state</span>,
        name: action.name
      }
  }

  return <span class="hljs-keyword">state</span>
}

function project(<span class="hljs-keyword">state</span> = {name: &apos;min-react&apos;}, action) {
  switch (action.type) {
    case &apos;CHANGE_PROJECT_NAME&apos;:
      return {
        ...<span class="hljs-keyword">state</span>,
        name: action.name
      }
  }

  return <span class="hljs-keyword">state</span>
}


var rootReducer = combineReducers({
  <span class="hljs-keyword">user</span>,
  project
})

var store = createStore(rootReducer)

function render(<span class="hljs-keyword">state</span> = store.getState()) {
  var <span class="hljs-variable">$userName</span> = document.getElementById(&apos;<span class="hljs-keyword">user</span>Name&apos;)
  <span class="hljs-variable">$userName</span>.innerHTML = <span class="hljs-keyword">state</span>.<span class="hljs-keyword">user</span>.name
}

render()

console.<span class="hljs-keyword">log</span>(store.getState())</code></pre><p>&#x6211;&#x4EEC;&#x770B;&#x5230;&#x9875;&#x9762;&#x6B63;&#x786E;&#x7684;&#x663E;&#x793A;&#x4E86;&#x6211;&#x4EEC;user&#x7684;&#x540D;&#x79F0;&#x3002;&#x4E0B;&#x4E00;&#x6B65;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x505A;&#x7684;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x7528;&#x6237;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x6539;&#x53D8;store&#x7684;&#x503C;&#xFF0C;&#x8FDB;&#x800C;&#x89E6;&#x53D1;view&#x7684;&#x66F4;&#x65B0;&#x3002;</p><p>&#x4E8E;&#x662F;&#x6211;&#x4EEC;&#x65B0;&#x589E;&#x4E86;&#x8FD9;&#x5757;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.subscribe(function() {
  render()
})

// &#x7ED1;&#x5B9A;&#x7528;&#x6237;&#x4E8B;&#x4EF6;
var $userNameInput = document.getElementById(&apos;userNameInput&apos;)
var userNameButton = document.getElementById(&apos;userNameButton&apos;)
userNameButton.onclick = function() {
  var value = $userNameInput.value
  store.dispatch({
    type: &apos;CHANGE_USER_NAME&apos;,
    name: value
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>store.subscribe(function() {
  render()
})

<span class="hljs-comment">// &#x7ED1;&#x5B9A;&#x7528;&#x6237;&#x4E8B;&#x4EF6;</span>
<span class="hljs-selector-tag">var</span> <span class="hljs-variable">$userNameInput</span> = document.getElementById(<span class="hljs-string">&apos;userNameInput&apos;</span>)
<span class="hljs-selector-tag">var</span> userNameButton = document.getElementById(<span class="hljs-string">&apos;userNameButton&apos;</span>)
userNameButton<span class="hljs-selector-class">.onclick</span> = function() {
  <span class="hljs-selector-tag">var</span> value = <span class="hljs-variable">$userNameInput</span><span class="hljs-selector-class">.value</span>
  store.dispatch({
    type: <span class="hljs-string">&apos;CHANGE_USER_NAME&apos;</span>,
    name: value
  })
}</code></pre><p>&#x6211;&#x4EEC;&#x770B;&#x5230;&#x4FDD;&#x5B58;&#x4E4B;&#x540E;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x8F93;&#x5165;&#x503C;&#x4E4B;&#x540E;&#xFF0C;&#x70B9;&#x51FB;&#x66F4;&#x6539;&#xFF0C;&#x9875;&#x9762;&#x7684;&#x503C;&#x968F;&#x7740;&#x6539;&#x53D8;&#x3002;</p><p>&#x4F46;&#x662F;&#x63A7;&#x5236;&#x53F0;&#x62A5;&#x4E86;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#xFF0C;<code>TS2339: Property &apos;value&apos; does not exist on type &apos;HTMLElement&apos;.</code>,&#x8FD9;&#x662F;&#x7531;&#x4E8E;typescript&#x5F3A;&#x7C7B;&#x578B;&#x6821;&#x9A8C;&#x6CA1;&#x901A;&#x8FC7;&#x5BFC;&#x81F4;&#x7684;&#x3002;&#x53EA;&#x8981;&#x52A0;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x5C31;&#x597D;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $userNameInput = document.getElementById(&apos;userNameInput&apos;) as HTMLInputElement" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">var</span> $userNameInput = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;userNameInput&apos;</span>) <span class="hljs-keyword">as</span> HTMLInputElement</code></pre><p>&#x770B;&#x5230;&#x4E86;&#x5427;&#xFF0C;redux&#x5C31;&#x662F;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#x3002;</p><p>&#x5176;&#x4ED6;&#x6240;&#x6709;&#x4E0A;&#x5C42;&#x5E94;&#x7528;&#xFF0C;&#x90FD;&#x662F;&#x5728;&#x6B64;&#x57FA;&#x7840;&#x4E0A;&#x5F00;&#x53D1;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;redux&#x5E94;&#x7528;&#x7684;&#x6B65;&#x9AA4;&#x5C31;&#x662F;</p><ol><li>&#x5B9A;&#x4E49;action&#x548C;&#x4E0E;&#x4E4B;&#x5BF9;&#x5E94;&#x7684;reducer</li><li>&#x76D1;&#x542C;store&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x63D0;&#x4F9B;&#x56DE;&#x8C03;&#x51FD;&#x6570;</li><li>dispatch&#x4E00;&#x4E2A;action&#xFF0C;&#x7B49;&#x5F85;&#x597D;&#x8FD0;&#x53D1;&#x751F;&#x3002;</li></ol><p>&#x7ED3;&#x5408;react&#xFF0C;&#x5176;&#x4ED6;view&#x7C7B;&#x5E93;&#xFF0C;&#x5F00;&#x53D1;&#x6B65;&#x9AA4;&#x83AB;&#x4E0D;&#x5982;&#x6B64;&#x3002;</p><h1 id="articleHeader13">&#x9AD8;&#x7EA7;&#x5E94;&#x7528;</h1><h2 id="articleHeader14">&#x5F02;&#x6B65;action</h2><p>&#x6211;&#x4EEC;&#x4E5F;&#x770B;&#x5230;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x7684;reducer&#x53EA;&#x80FD;&#x505A;&#x540C;&#x6B65;&#x5E94;&#x7528;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;reducer&#xFF0C;&#x505A;&#x4E00;&#x4E9B;&#x5EF6;&#x8FDF;&#x64CD;&#x4F5C;&#xFF0C;&#x53EF;&#x600E;&#x4E48;&#x529E;</p><p>&#x793E;&#x533A;&#x5DF2;&#x7ECF;&#x6709;&#x6210;&#x719F;&#x7684;&#x7C7B;&#x5E93;&#x505A;&#x8FD9;&#x4EF6;&#x4E8B;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install redux-thunk --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> redux-thunk <span class="hljs-comment">--save</span></code></pre><p>redux&#x672C;&#x8EAB;&#x5DF2;&#x7ECF;&#x63D0;&#x9AD8;&#x4E86;&#x5F88;&#x597D;&#x7684;&#x6269;&#x5C55;&#x673A;&#x5236;&#xFF0C;&#x5C31;&#x662F;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;&#x8FD9;&#x70B9;&#x5F88;&#x7C7B;&#x4F3C;express&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5F15;&#x5165;&#x65B0;&#x7684;&#x7C7B;&#x5E93;
import { createStore, combineReducers, applyMiddleware, compose } from &apos;redux&apos;
import thunk from &apos;redux-thunk&apos;

...
//store&#x90E8;&#x5206;&#x505A;&#x5982;&#x4E0B;&#x4FEE;&#x6539;
const finalCreateStore = compose(applyMiddleware(thunk))(createStore)
const store = finalCreateStore(rootReducer, {})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x5F15;&#x5165;&#x65B0;&#x7684;&#x7C7B;&#x5E93;</span>
<span class="hljs-keyword">import</span> { createStore, combineReducers, applyMiddleware, compose } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux&apos;</span>
<span class="hljs-keyword">import</span> thunk <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-thunk&apos;</span>

...
<span class="hljs-comment">//store&#x90E8;&#x5206;&#x505A;&#x5982;&#x4E0B;&#x4FEE;&#x6539;</span>
<span class="hljs-keyword">const</span> finalCreateStore = compose(applyMiddleware(thunk))(createStore)
<span class="hljs-keyword">const</span> store = finalCreateStore(rootReducer, {})</code></pre><p>redux-thunk&#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x8BA9;dispatch&#x65B9;&#x6CD5;&#x4E0D;&#x4EC5;&#x4EC5;&#x53EA;&#x63A5;&#x6536;action&#x5BF9;&#x8C61;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5185;&#x90E8;&#x53BB;&#x8C03;&#x7528;&#x5F02;&#x6B65;&#x4EE3;&#x7801;</p><p>&#x6211;&#x4EEC;&#x628A;dom&#x4E8B;&#x4EF6;&#x90E8;&#x5206;&#x505A;&#x4E86;&#x5982;&#x4E0B;&#x6539;&#x9020;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="userNameButton.onclick = function() {
  var value = $userNameInput.value
  store.dispatch&lt;any&gt;(function(dispatch, getState) {
    setTimeout(() =&gt; {
      dispatch({
        type: &apos;CHANGE_USER_NAME&apos;,
        name: value
      })
    }, 2000)

  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs fortran"><code>userNameButton.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span> {
  var <span class="hljs-keyword">value</span> = $userNameInput.<span class="hljs-keyword">value</span>
  store.dispatch&lt;<span class="hljs-built_in">any</span>&gt;(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(dispatch, getState)</span></span> {
    setTimeout(() =&gt; {
      dispatch({
        <span class="hljs-keyword">type</span>: <span class="hljs-string">&apos;CHANGE_USER_NAME&apos;</span>,
        <span class="hljs-keyword">name</span>: <span class="hljs-keyword">value</span>
      })
    }, <span class="hljs-number">2000</span>)

  })
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x9875;&#x9762;&#x5143;&#x7D20;&#x786E;&#x5B9E;&#x5728;2s&#x4E4B;&#x540E;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#xFF0C;&#x5B9E;&#x9645;&#x4E1A;&#x52A1;&#x4E2D;&#x554A;&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x505A;&#x4E00;&#x4E9B;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x81F3;&#x4E8E;redux&#x539F;&#x7406;&#xFF0C;&#x4EE5;&#x53CA;&#x6E90;&#x7801;&#x548C;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x6E90;&#x7801;&#x8BB2;&#x89E3;&#x53EF;&#x4EE5;&#x53C2;&#x7167;&#x6211;&#x7684;&#x53E6;&#x5916;&#x4E00;&#x7BC7;&#x6587;&#x7AE0; <a href="https://segmentfault.com/a/1190000009146720" target="_blank">&#x9605;&#x8BFB;redux&#x6E90;&#x7801;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
redux原来如此简单

## 原文链接
[https://segmentfault.com/a/1190000016311891](https://segmentfault.com/a/1190000016311891)

