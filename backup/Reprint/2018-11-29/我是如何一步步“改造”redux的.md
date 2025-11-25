---
title: '我是如何一步步“改造”redux的' 
date: 2018-11-29 9:33:05
hidden: true
slug: hnylg2cpss5
categories: [reprint]
---

{{< raw >}}

                    
<p>&#x4ECE;Vue&#x6362;&#x5230;React+Redux&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x5DF2;&#x7ECF;&#x6709;&#x534A;&#x5E74;&#x591A;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x603B;&#x7684;&#x6765;&#x8BF4;&#x4F53;&#x9A8C;&#x662F;&#x5F88;&#x597D;&#x7684;&#xFF0C;&#x5BF9;&#x4E8E;&#x5404;&#x79CD;&#x903B;&#x8F91;&#x548C;&#x4E1A;&#x52A1;&#x7EC4;&#x4EF6;&#x7684;&#x62BD;&#x8C61;&#x5B9E;&#x5728;&#x662F;&#x65B9;&#x4FBF;&#x7684;&#x4E0D;&#x884C;&#xFF0C;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF0C;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x7B49;&#x7B49;&#x7ED9;&#x6211;&#x5E26;&#x6765;&#x4E86;&#x5F88;&#x591A;&#x7F16;&#x7A0B;&#x601D;&#x60F3;&#x4E0A;&#x7684;&#x63D0;&#x5347;&#x3002;&#x4F46;&#x662F;&#x5728;&#x4F7F;&#x7528;Redux&#x5F00;&#x53D1;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x8FD8;&#x662F;&#x611F;&#x89C9;&#x4E0D;&#x592A;&#x987A;&#x624B;&#xFF0C;&#x672C;&#x6587;&#x5C06;&#x9610;&#x8FF0;&#x6211;&#x662F;&#x5982;&#x4F55;&#x5BF9;Redux&#x8FDB;&#x884C;&#x4E00;&#x6B65;&#x6B65;&#x201C;&#x6539;&#x9020;&#x201D;&#x4EE5;&#x9002;&#x5E94;&#x4E2A;&#x4EBA;&#x548C;&#x56E2;&#x961F;&#x5F00;&#x53D1;&#x9700;&#x6C42;&#x7684;&#x3002;<br>&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x793A;&#x4F8B;&#x548C;&#x7ED3;&#x679C;&#x653E;&#x5728;&#x4E86;<a href="https://github.com/callmedadaxin/easy-redux" rel="nofollow noreferrer" target="_blank">easy-redux</a>,&#x6B22;&#x8FCE;star&#x3002;<br><a href="http://callmedadaxin.github.io/2018/05/18/rethink-redux/" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;&#x94FE;&#x63A5;</a></p>
<h2 id="articleHeader0">&#x95EE;&#x9898;</h2>
<p>&#x5728;&#x4F7F;&#x7528;Redux&#x5F00;&#x53D1;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x9010;&#x6E10;&#x53D1;&#x73B0;&#xFF0C;&#x867D;&#x7136;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5C06;UI&#x7EC4;&#x4EF6;&#x548C;&#x4E1A;&#x52A1;&#x7EC4;&#x4EF6;&#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x8FDB;&#x884C;&#x62BD;&#x79BB;&#xFF0C;&#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x4FDD;&#x8BC1;reduceractions&#x7684;&#x590D;&#x7528;&#x6027;&#xFF0C;<br>&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x8FD8;&#x662F;&#x4F1A;&#x82B1;&#x8D39;&#x5927;&#x91CF;&#x7684;&#x65F6;&#x95F4;&#x6765;&#x4E66;&#x5199;&#x8FD1;&#x4E4E;&#x76F8;&#x540C;&#x7684;&#x4EE3;&#x7801;&#x3002;&#x5C24;&#x5176;&#x662F;&#x6211;&#x4EEC;&#x7EC4;&#x5185;&#x5E0C;&#x671B;&#x79C9;&#x627F;&#x4E00;&#x4E2A;&#x539F;&#x5219;&#xFF1A;&#x5C3D;&#x91CF;&#x5C06;&#x6240;&#x6709;&#x7684;&#x64CD;&#x4F5C;&#x53CA;&#x72B6;&#x6001;&#x4FEE;&#x6539;&#x90FD;&#x4EA4;&#x7531;action&#x6765;&#x6267;&#x884C;&#xFF0C;&#x65B9;&#x4FBF;&#x6211;&#x4EEC;&#x5BF9;&#x95EE;&#x9898;&#x8FDB;&#x884C;&#x5B9A;&#x4F4D;&#x3002;&#x5F53;&#x6211;&#x5728;&#x67D0;&#x5927;&#x578B;&#x524D;&#x7AEF;&#x4EA4;&#x6D41;&#x7FA4;&#x91CC;&#x8FD8;&#x770B;&#x5230;&#x201C;&#x4E0D;&#x7528;Redux,&#x4E0D;&#x60F3;&#x52A0;&#x73ED;&#x201D;&#x7684;&#x8BF4;&#x6CD5;&#x65F6;&#xFF0C;&#x4E0D;&#x5F97;&#x4E0D;&#x611F;&#x53F9;&#xFF0C;&#x9700;&#x8981;&#x505A;&#x4E9B;&#x52AA;&#x529B;&#x6765;&#x89E3;&#x51B3;&#x6211;&#x76EE;&#x524D;&#x7684;&#x95EE;&#x9898;&#x4E86;&#x3002;</p>
<p>&#x662F;&#x7684;&#xFF0C;<strong><em>Redux&#x5BF9;&#x6211;&#x6765;&#x8BF4;&#xFF0C;&#x592A;&#x590D;&#x6742;&#x4E86;</em></strong></p>
<p>&#x9488;&#x5BF9;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x4EE5;&#x4E0B;&#x6B65;&#x9AA4;&#x6765;&#x5B8C;&#x6210;&#xFF1A;</p>
<p>1.&#x5B9A;&#x4E49;action</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const CHANGE_CONDITION = &apos;CHANGE_CONDITION&apos;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CHANGE_CONDITION = <span class="hljs-string">&apos;CHANGE_CONDITION&apos;</span></code></pre>
<p>2.&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x5BF9;&#x5E94;&#x7684;action&#x521B;&#x5EFA;&#x51FD;&#x6570;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const changeCondition = condition =&gt; ({
  type: CHANGE_CONDITION,
  condition
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> changeCondition = <span class="hljs-function"><span class="hljs-params">condition</span> =&gt;</span> ({
  <span class="hljs-attr">type</span>: CHANGE_CONDITION,
  condition
})</code></pre>
<p>3.&#x5F15;&#x5165;action, &#x5B9A;&#x4E49;reducer, &#x5728;&#x590D;&#x6742;&#x7684;switch&#x8BED;&#x53E5;&#x4E2D;&#xFF0C;&#x5BF9;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x66F4;&#x6539;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { CHANGE_CONDITION } from &apos;@actions&apos;

const condition = (state = initCondition, action) =&gt; {
  switch(action.type) {
    case CHANGE_CONDITION:
      return ...
    default:
      return state
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { CHANGE_CONDITION } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@actions&apos;</span>

<span class="hljs-keyword">const</span> condition = <span class="hljs-function">(<span class="hljs-params">state = initCondition, action</span>) =&gt;</span> {
  <span class="hljs-keyword">switch</span>(action.type) {
    <span class="hljs-keyword">case</span> CHANGE_CONDITION:
      <span class="hljs-keyword">return</span> ...
    default:
      <span class="hljs-keyword">return</span> state
  }
}</code></pre>
<p>4.&#x5728;&#x9700;&#x8981;&#x65F6;&#xFF0C;&#x5F15;&#x5165;action&#x521B;&#x5EFA;&#x51FD;&#x6570;, &#x5E76;&#x5C06;&#x5BF9;&#x5E94;&#x7684;state&#x8FDB;&#x884C;&#x8FDE;&#x63A5;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { changeCondition } from &apos;actions&apos;
@connect(...)" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { changeCondition } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;actions&apos;</span>
@connect(...)</code></pre>
<p>&#x6211;&#x53EA;&#x662F;&#x60F3;&#x505A;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x72B6;&#x6001;&#x4FEE;&#x6539;&#x5440;&#xFF01;</p>
<p>&#x53EF;&#x80FD;&#x6211;&#x4EEC;&#x4F1A;&#x8BF4;&#xFF0C;&#x8FD9;&#x6837;&#x62C6;&#x5206;&#x80FD;&#x591F;&#x4FDD;&#x8BC1;&#x6211;&#x4EEC;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x89C4;&#x8303;&#x5316;&#xFF0C;&#x589E;&#x5F3A;&#x4E1A;&#x52A1;&#x7684;&#x53EF;&#x9884;&#x6D4B;&#x6027;&#x4E0E;&#x9519;&#x8BEF;&#x5B9A;&#x4F4D;&#x80FD;&#x529B;&#x3002;<br>&#x4F46;&#x662F;&#x968F;&#x7740;&#x9879;&#x76EE;&#x7684;&#x4E0D;&#x65AD;&#x6269;&#x5927;&#xFF0C;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x6709;&#x4E00;&#x5806;action&#x9700;&#x8981;&#x6211;&#x52A0;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B9E;&#x5728;&#x662F;&#x8BA9;&#x4EBA;&#x5934;&#x75DB;&#x554A;&#x3002;</p>
<p>&#x800C;&#x4E14;&#xFF0C;&#x9488;&#x5BF9;&#x8BF7;&#x6C42;&#x7684;&#x4FEE;&#x6539;&#xFF0C;&#x6211;&#x4EEC;&#x5F80;&#x5F80;&#x8981;&#x628A;action&#x62C6;&#x5206;&#x6210;START,SUCCESS,FAILED&#x4E09;&#x79CD;&#x72B6;&#x6001;&#xFF0C;reducer&#x91CC;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x4E09;&#x6B21;&#x4FEE;&#x6539;&#x3002;&#x800C;&#x4E14;&#x5F80;&#x5F80;<br>&#x9488;&#x5BF9;&#x8FD9;&#x4E9B;&#x4FEE;&#x6539;&#xFF0C;&#x6211;&#x4EEC;&#x8FDB;&#x884C;&#x7684;&#x5904;&#x7406;&#x90FD;&#x662F;&#x5927;&#x81F4;&#x76F8;&#x540C;&#x7684;&#xFF1A;&#x66F4;&#x65B0;loading&#x72B6;&#x6001;&#xFF0C;&#x66F4;&#x65B0;&#x6570;&#x636E;&#xFF0C;&#x66F4;&#x65B0;&#x9519;&#x8BEF;&#x7B49;&#x7B49;&#x3002;</p>
<p>&#x6240;&#x4EE5;&#x8BF4;&#xFF0C;&#x6211;&#x4EEC;&#x5982;&#x4F55;&#x5728;&#x4FDD;&#x8BC1;redux&#x7684;&#x8BBE;&#x8BA1;&#x539F;&#x5219;&#x4EE5;&#x53CA;&#x9879;&#x76EE;&#x89C4;&#x8303;&#x6027;&#x4E0A;&#xFF0C;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x201C;&#x7B80;&#x5316;&#x6539;&#x9020;&#x201D;&#xFF0C;&#x662F;&#x6211;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x89E3;&#x51B3;&#x7684;&#x95EE;&#x9898;&#x3002;</p>
<h2 id="articleHeader1">&#x4F7F;&#x7528;middleware&#x7B80;&#x5316;&#x8BF7;&#x6C42;</h2>
<p>&#x9488;&#x5BF9;&#x8BF7;&#x6C42;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x6211;&#x4E4B;&#x524D;&#x4E5F;&#x5199;&#x8FC7;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;<a href="https://juejin.im/post/5ac1f428f265da23884d3997" rel="nofollow noreferrer" target="_blank">&#x4F18;&#x96C5;&#x5730;&#x51CF;&#x5C11;redux&#x8BF7;&#x6C42;&#x6837;&#x677F;&#x4EE3;&#x7801;</a>, &#x901A;&#x8FC7;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;redux&#x4E2D;&#x95F4;&#x4EF6;<a href="https://github.com/callmedadaxin/react-fetch-middleware" rel="nofollow noreferrer" target="_blank">react-fetch-middleware</a><br>&#x6765;&#x5BF9;&#x8BF7;&#x6C42;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x4F18;&#x5316;&#x3002;</p>
<p>&#x5927;&#x81F4;&#x601D;&#x8DEF;&#x5982;&#x4E0B;&#xFF1A;</p>
<p>1.action&#x521B;&#x5EFA;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684;&#x5185;&#x5BB9;&#x4E3A;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x8BF7;&#x6C42;&#x4FE1;&#x606F;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x5305;&#x542B;&#x9700;&#x8981;&#x5206;&#x53D1;&#x7684;&#x4E09;&#x4E2A;action&#xFF0C;&#x8FD9;&#x4E09;&#x4E2A;action&#x53EF;&#x4EE5;&#x901A;&#x8FC7;actionCreator&#x8FDB;&#x884C;&#x521B;&#x5EFA;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { actionCreator } from &apos;redux-data-fetch-middleware&apos;

// create action types
export const actionTypes = actionCreator(&apos;GET_USER_LIST&apos;)

export const getUserList = params =&gt; ({
  url: &apos;/api/userList&apos;,
  params: params,
  types: actionTypes,
  // handle result
  handleResult: res =&gt; res.data.list,
  // handle error
  handleError: ...
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { actionCreator } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-data-fetch-middleware&apos;</span>

<span class="hljs-comment">// create action types</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> actionTypes = actionCreator(<span class="hljs-string">&apos;GET_USER_LIST&apos;</span>)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getUserList = <span class="hljs-function"><span class="hljs-params">params</span> =&gt;</span> ({
  <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;/api/userList&apos;</span>,
  <span class="hljs-attr">params</span>: params,
  <span class="hljs-attr">types</span>: actionTypes,
  <span class="hljs-comment">// handle result</span>
  handleResult: <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.data.list,
  <span class="hljs-comment">// handle error</span>
  handleError: ...
})</code></pre>
<p>2.&#x5728;redux&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#xFF0C;&#x9488;&#x5BF9;&#x4EE5;&#x4E0A;&#x683C;&#x5F0F;&#x7684;action&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x9996;&#x5148;&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#xFF0C;&#x5E76;&#x5206;&#x53D1;&#x8BF7;&#x6C42;&#x5F00;&#x59CB;&#x7684;action,<br>&#x5728;&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x65F6;&#xFF0C;&#x5206;&#x522B;&#x5206;&#x53D1;&#x5BF9;&#x5E94;&#x7684;action</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const applyFetchMiddleware = (
  fetchMethod = fetch,
  handleResponse = val =&gt; val,
  handleErrorTotal = error =&gt; error
) =&gt;
  store =&gt; next =&gt; action =&gt; {
    // &#x5224;&#x65AD;action&#x7684;&#x683C;&#x5F0F;
    if (!action.url || !Array.isArray(action.types)) {
      return next(action)
    }
    // &#x83B7;&#x53D6;&#x4F20;&#x5165;&#x7684;&#x4E09;&#x4E2A;action
    const [ START, SUCCESS, FAILED ] = action.types

    // &#x5728;&#x4E0D;&#x540C;&#x72B6;&#x6001;&#x5206;&#x53D1;action, &#x5E76;&#x4F20;&#x5165;loading,error&#x72B6;&#x6001;
    next({
      type: START,
      loading: true,
      ...action
    })
    return fetchMethod(url, params)
      .then(ret =&gt; {
        next({
          type: SUCCESS,
          loading: false,
          payload: handleResult(ret)
        })
      })
      .catch(error =&gt; {
        next({
          type: FAILED,
          loading: false,
          error: handleError(error)
        })
      })
  }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> applyFetchMiddleware = (
  fetchMethod = fetch,
  handleResponse = <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> val,
  handleErrorTotal = <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> error
) =&gt;
  <span class="hljs-function"><span class="hljs-params">store</span> =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-comment">// &#x5224;&#x65AD;action&#x7684;&#x683C;&#x5F0F;</span>
    <span class="hljs-keyword">if</span> (!action.url || !<span class="hljs-built_in">Array</span>.isArray(action.types)) {
      <span class="hljs-keyword">return</span> next(action)
    }
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x4F20;&#x5165;&#x7684;&#x4E09;&#x4E2A;action</span>
    <span class="hljs-keyword">const</span> [ START, SUCCESS, FAILED ] = action.types

    <span class="hljs-comment">// &#x5728;&#x4E0D;&#x540C;&#x72B6;&#x6001;&#x5206;&#x53D1;action, &#x5E76;&#x4F20;&#x5165;loading,error&#x72B6;&#x6001;</span>
    next({
      <span class="hljs-attr">type</span>: START,
      <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span>,
      ...action
    })
    <span class="hljs-keyword">return</span> fetchMethod(url, params)
      .then(<span class="hljs-function"><span class="hljs-params">ret</span> =&gt;</span> {
        next({
          <span class="hljs-attr">type</span>: SUCCESS,
          <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">payload</span>: handleResult(ret)
        })
      })
      .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
        next({
          <span class="hljs-attr">type</span>: FAILED,
          <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">error</span>: handleError(error)
        })
      })
  }</code></pre>
<p>3.&#x5C06;reducer&#x8FDB;&#x884C;&#x5BF9;&#x5E94;&#x7684;&#x9ED8;&#x8BA4;&#x5904;&#x7406;&#xFF0C;&#x4F7F;&#x7528;reducerCreator&#x521B;&#x5EFA;&#x7684;&#x51FD;&#x6570;&#x4E2D;&#x81EA;&#x52A8;&#x8FDB;&#x884C;&#x5BF9;&#x5E94;&#x5904;&#x7406;&#xFF0C;&#x5E76;&#x4E14;&#x63D0;&#x4F9B;&#x4E8C;&#x6B21;&#x5904;&#x7406;&#x7684;&#x673A;&#x5236;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const [ GET, GET_SUCCESS, GET_FAILED ] = actionTypes

// &#x4F1A;&#x5728;&#x8FD9;&#x91CC;&#x81EA;&#x52A8;&#x5904;&#x7406;&#x5206;&#x53D1;&#x7684;&#x4E09;&#x4E2A;action
const fetchedUserList = reducerCreator(actionTypes)

const userList = (state = {
  list: []
}, action =&gt; {
  // &#x4E8C;&#x6B21;&#x5904;&#x7406;
  switch(action.type) {
    case GET_SUCCESS:
      return {
        ...state,
        action.payload
      }
  }
})
export default combineReducers({
  userList: fetchedUserList(userList)
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> [ GET, GET_SUCCESS, GET_FAILED ] = actionTypes

<span class="hljs-comment">// &#x4F1A;&#x5728;&#x8FD9;&#x91CC;&#x81EA;&#x52A8;&#x5904;&#x7406;&#x5206;&#x53D1;&#x7684;&#x4E09;&#x4E2A;action</span>
<span class="hljs-keyword">const</span> fetchedUserList = reducerCreator(actionTypes)

<span class="hljs-keyword">const</span> userList = (state = {
  <span class="hljs-attr">list</span>: []
}, action =&gt; {
  <span class="hljs-comment">// &#x4E8C;&#x6B21;&#x5904;&#x7406;</span>
  <span class="hljs-keyword">switch</span>(action.type) {
    <span class="hljs-keyword">case</span> GET_SUCCESS:
      <span class="hljs-keyword">return</span> {
        ...state,
        action.payload
      }
  }
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> combineReducers({
  <span class="hljs-attr">userList</span>: fetchedUserList(userList)
})</code></pre>
<h2 id="articleHeader2">&#x518D;&#x8FDB;&#x4E00;&#x6B65;&#xFF0C;&#x7B80;&#x5316;Redux Api</h2>
<p>&#x7ECF;&#x8FC7;&#x524D;&#x4E00;&#x6B65;&#x5BF9;&#x8BF7;&#x6C42;&#x7684;&#x7B80;&#x5316;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x5728;&#x4FDD;&#x8BC1;&#x4E0D;&#x6539;&#x53D8;redux&#x539F;&#x5219;&#x548C;&#x4E66;&#x5199;&#x4E60;&#x60EF;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x6781;&#x5927;&#x7684;&#x7B80;&#x5316;&#x8BF7;&#x6C42;&#x6837;&#x677F;&#x4EE3;&#x7801;&#x3002;<br>&#x9488;&#x5BF9;&#x666E;&#x901A;&#x7684;&#x6570;&#x636E;&#x5904;&#x7406;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x4E0D;&#x662F;&#x53EF;&#x4EE5;&#x66F4;&#x8FDB;&#x4E00;&#x6B65;&#xFF1F;</p>
<p>&#x5F88;&#x9AD8;&#x5174;&#x770B;&#x5230;&#x8FD9;&#x4E2A;&#x5E93;&#xFF1A; <a href="https://hk.saowen.com/a/904ec76cd8897fc055a07d37b2cc37228a315575c14c8bfdedc727886b736292" rel="nofollow noreferrer" target="_blank">Rematch</a><br>, &#x5BF9;Redux Api&#x8FDB;&#x884C;&#x4E86;&#x6781;&#x5927;&#x7684;&#x7B80;&#x5316;&#x3002;</p>
<p>&#x4F46;&#x662F;&#x6709;&#x4E9B;&#x529F;&#x80FD;&#x548C;&#x6539;&#x8FDB;&#x5E76;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EC5;&#x5BF9;&#x6211;&#x9700;&#x8981;&#x7684;&#x529F;&#x80FD;&#x548C;&#x6539;&#x8FDB;&#x70B9;&#x8FDB;&#x884C;&#x8BF4;&#x660E;&#xFF0C;&#x5E76;&#x7528;&#x81EA;&#x5DF1;&#x7684;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x5B9E;&#x73B0;&#x3002;&#x6211;&#x4EEC;&#x6765;&#x4E00;&#x6B65;&#x6B65;&#x770B;&#x770B;<br>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x89E3;&#x51B3;&#x7684;&#x95EE;&#x9898;&#x4EE5;&#x53CA;&#x5982;&#x4F55;&#x89E3;&#x51B3;&#x7684;&#x3002;</p>
<h3 id="articleHeader3">1.&#x5197;&#x957F;&#x7684;switch&#x8BED;&#x53E5;</h3>
<p>&#x9488;&#x5BF9;reducer&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x5E0C;&#x671B;&#x91CD;&#x590D;&#x7684;&#x5F15;&#x7528;&#x5B9A;&#x4E49;&#x7684;&#x5404;&#x4E2A;action, &#x5E76;&#x4E14;&#x53BB;&#x6389;&#x5197;&#x957F;&#x7684;switch&#x5224;&#x65AD;&#x3002;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#x5176;&#x8FDB;&#x884C;&#x53CD;&#x8F6C;&#x62C6;&#x5206;&#xFF0C;&#x5C06;&#x6BCF;&#x4E00;&#x4E2A;action&#x5B9A;&#x4E49;&#x4E3A;&#x6807;&#x51C6;&#x5316;&#x7684;reducer, &#x5728;&#x5176;&#x4E2D;&#x5BF9;state&#x8FDB;&#x884C;&#x5904;&#x7406;.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const counter = {
  state: 1,
  reducers: {
    add: (state, payload) =&gt; state + payload,
    sub: (state, payload) =&gt; state - payload
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> counter = {
  <span class="hljs-attr">state</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">reducers</span>: {
    <span class="hljs-attr">add</span>: <span class="hljs-function">(<span class="hljs-params">state, payload</span>) =&gt;</span> state + payload,
    <span class="hljs-attr">sub</span>: <span class="hljs-function">(<span class="hljs-params">state, payload</span>) =&gt;</span> state - payload
  }
}</code></pre>
<h3 id="articleHeader4">2.&#x590D;&#x6742;&#x7684;action&#x521B;&#x5EFA;&#x51FD;&#x6570;</h3>
<p>&#x53BB;&#x6389;&#x4E4B;&#x524D;&#x7684;action&#x548C;action&#x521B;&#x5EFA;&#x51FD;&#x6570;&#xFF0C;&#x76F4;&#x63A5;&#x5728;actions&#x4E2D;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x5904;&#x7406;&#xFF0C;&#x5E76;&#x4E0E;&#x5BF9;&#x5E94;&#x7684;reducer&#x8FDB;&#x884C;match</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const addNum = num =&gt; dispatch =&gt; dispatch(&apos;/counter/add&apos;, num)" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> addNum = <span class="hljs-function"><span class="hljs-params">num</span> =&gt;</span> dispatch =&gt; dispatch(<span class="hljs-string">&apos;/counter/add&apos;</span>, num)</code></pre>
<p>&#x6211;&#x4EEC;&#x4F1A;&#x770B;&#x5230;&#xFF0C;&#x4E0E;reducer&#x8FDB;&#x884C;match&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E86;&apos;/counter/add&apos;&#x8FD9;&#x79CD;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;<br>&#x76EE;&#x7684;&#x662F;&#x5728;&#x4FDD;&#x8BC1;&#x5176;&#x76F4;&#x89C2;&#x6027;&#x7684;&#x540C;&#x65F6;&#xFF0C;&#x4FDD;&#x8BC1;action&#x4E0E;&#x5176;reducer&#x662F;&#x4E00;&#x4E00;&#x5BF9;&#x5E94;&#x7684;&#x3002;</p>
<p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x589E;&#x5F3A;&#x7684;combinceReducer&#x8FDB;&#x884C;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x7684;&#x8BBE;&#x5B9A;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const counter1 = {
  ...
}
const counter2 = {
  ...
}

const counters = combinceReducer({
  counter1,
  counter2
})

const list = {
  ...
}
// &#x8BBE;&#x7F6E;&#x5927;reducer&#x7684;&#x6839;&#x547D;&#x540D;&#x7A7A;&#x95F4;
export default combinceReducer({
  counters,
  list
}, &apos;/test&apos;)

// &#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x6837;&#x6765;&#x8BBF;&#x95EE;
dispatch(&apos;/test/counters/counter1/add&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> counter1 = {
  ...
}
<span class="hljs-keyword">const</span> counter2 = {
  ...
}

<span class="hljs-keyword">const</span> counters = combinceReducer({
  counter1,
  counter2
})

<span class="hljs-keyword">const</span> list = {
  ...
}
<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5927;reducer&#x7684;&#x6839;&#x547D;&#x540D;&#x7A7A;&#x95F4;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> combinceReducer({
  counters,
  list
}, <span class="hljs-string">&apos;/test&apos;</span>)

<span class="hljs-comment">// &#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x6837;&#x6765;&#x8BBF;&#x95EE;</span>
dispatch(<span class="hljs-string">&apos;/test/counters/counter1/add&apos;</span>)</code></pre>
<h3 id="articleHeader5">3.&#x522B;&#x5FD8;&#x4E86;&#x8BF7;&#x6C42;</h3>
<p>&#x9488;&#x5BF9;&#x8BF7;&#x6C42;&#x8FD9;&#x4E9B;&#x5F02;&#x6B65;action,&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x6211;&#x4EEC;&#x4E4B;&#x524D;&#x7684;&#x4FEE;&#x6539;, dispatch&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const getList = params =&gt; dispatch =&gt; {
  return dispatch({
    //&#x5BF9;&#x5E94;&#x5230;&#x6211;&#x4EEC;&#x60F3;&#x8981;dispatch&#x7684;&#x547D;&#x540D;&#x7A7A;&#x95F4;
    action: &apos;/list/getList&apos;,
    url: &apos;/api/getList&apos;,
    params,
    handleResponse: res =&gt; res.data.list,
    handleError: error =&gt; error
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getList = <span class="hljs-function"><span class="hljs-params">params</span> =&gt;</span> dispatch =&gt; {
  <span class="hljs-keyword">return</span> dispatch({
    <span class="hljs-comment">//&#x5BF9;&#x5E94;&#x5230;&#x6211;&#x4EEC;&#x60F3;&#x8981;dispatch&#x7684;&#x547D;&#x540D;&#x7A7A;&#x95F4;</span>
    action: <span class="hljs-string">&apos;/list/getList&apos;</span>,
    <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;/api/getList&apos;</span>,
    params,
    <span class="hljs-attr">handleResponse</span>: <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.data.list,
    <span class="hljs-attr">handleError</span>: <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> error
  })
}</code></pre>
<p>&#x540C;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x5728;reducer&#x4E2D;&#x8FDB;&#x884C;&#x7B80;&#x5355;&#x7684;&#x5904;&#x7406;&#x5373;&#x53EF;&#xFF0C;&#x4F9D;&#x65E7;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x9ED8;&#x8BA4;&#x7684;&#x4E09;&#x4E2A;&#x72B6;&#x6001;&#x5904;&#x7406;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const list = {
  // &#x5B9A;&#x4E49;reducer&#x5934;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x53D8;&#x4E3A;getList(&#x5F00;&#x59CB;&#x8BF7;&#x6C42;),getListSuccess,getListFailed
  // &#x5E76;&#x8FDB;&#x884C;loading&#x7B49;&#x9ED8;&#x8BA4;&#x5904;&#x7406;
  fetch: &apos;getList&apos;
  state: {
    list: []
  },
  reducers: {
    // &#x4E8C;&#x6B21;&#x5904;&#x7406;
    getListSuccess: (state, payload) =&gt; ({
      ...state,
      list: payload
    })
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> list = {
  <span class="hljs-comment">// &#x5B9A;&#x4E49;reducer&#x5934;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x53D8;&#x4E3A;getList(&#x5F00;&#x59CB;&#x8BF7;&#x6C42;),getListSuccess,getListFailed</span>
  <span class="hljs-comment">// &#x5E76;&#x8FDB;&#x884C;loading&#x7B49;&#x9ED8;&#x8BA4;&#x5904;&#x7406;</span>
  fetch: <span class="hljs-string">&apos;getList&apos;</span>
  state: {
    <span class="hljs-attr">list</span>: []
  },
  <span class="hljs-attr">reducers</span>: {
    <span class="hljs-comment">// &#x4E8C;&#x6B21;&#x5904;&#x7406;</span>
    getListSuccess: <span class="hljs-function">(<span class="hljs-params">state, payload</span>) =&gt;</span> ({
      ...state,
      <span class="hljs-attr">list</span>: payload
    })
  }
}</code></pre>
<h2 id="articleHeader6">&#x4E0E;&#x9879;&#x76EE;&#x8FDB;&#x884C;&#x6574;&#x5408;</h2>
<p>&#x6211;&#x4EEC;&#x4F1A;&#x770B;&#x5230;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5C06;redux&#x7684;api&#x8FDB;&#x884C;&#x4E86;&#x6781;&#x5927;&#x7684;&#x7B80;&#x5316;&#xFF0C;&#x4F46;&#x662F;&#x4F9D;&#x65E7;&#x4FDD;&#x6301;&#x4E86;&#x539F;&#x6709;&#x7684;&#x7ED3;&#x6784;&#x3002;&#x76EE;&#x7684;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x70B9;&#xFF1A;</p>
<ol>
<li>&#x4F9D;&#x65E7;&#x9075;&#x5FAA;&#x9ED8;&#x8BA4;&#x539F;&#x5219;&#xFF0C;&#x4FDD;&#x8BC1;&#x9879;&#x76EE;&#x7684;&#x89C4;&#x8303;&#x6027;</li>
<li>&#x901A;&#x8FC7;&#x7EA6;&#x5B9A;&#x548C;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x6765;&#x4FDD;&#x8BC1;action&#x548C;reducer&#x7684;match</li>
<li>&#x5E95;&#x5C42;&#x8FD8;&#x662F;&#x4F7F;&#x7528;redux&#x5B9E;&#x73B0;&#xFF0C;&#x8FD9;&#x4E9B;&#x53EA;&#x4E0D;&#x8FC7;&#x662F;&#x8BED;&#x6CD5;&#x7CD6;</li>
<li>&#x4FDD;&#x8BC1;&#x4E0E;&#x8001;&#x9879;&#x76EE;&#x7684;&#x517C;&#x5BB9;&#x6027;</li>
</ol>
<p>&#x539F;&#x6709;&#x7684;&#x6570;&#x636E;&#x6D41;&#x53D8;&#x6210;&#x4E86;&#x8FD9;&#x6837;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbbc1K?w=1352&amp;h=860" src="https://static.alili.tech/img/bVbbc1K?w=1352&amp;h=860" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<p>&#x56E0;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x5728;redux&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x8FDB;&#x884C;&#x4E8C;&#x6B21;&#x5C01;&#x88C5;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x4F9D;&#x7136;&#x4FDD;&#x8BC1;&#x4E86;&#x539F;&#x6709;&#x7684;Redux&#x6570;&#x636E;&#x6D41;&#xFF0C;&#x4FDD;&#x8BC1;&#x6570;&#x636E;&#x7684;&#x53EF;&#x56DE;&#x6EAF;&#x6027;&#xFF0C;&#x589E;&#x5F3A;&#x4E1A;&#x52A1;&#x7684;&#x53EF;&#x9884;&#x6D4B;&#x6027;&#x4E0E;&#x9519;&#x8BEF;&#x5B9A;&#x4F4D;&#x80FD;&#x529B;&#x3002;&#x8FD9;&#x6837;&#x80FD;&#x6781;&#x5927;&#x7684;&#x4FDD;&#x8BC1;&#x4E0E;&#x8001;&#x9879;&#x76EE;&#x7684;&#x517C;&#x5BB9;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x505A;&#x7684;&#xFF0C;&#x53EA;&#x662F;&#x5BF9;action&#x548C;reducer&#x7684;&#x8F6C;&#x5316;&#x5DE5;&#x4F5C;</p>
<h3 id="articleHeader7">1.combinceReducer&#x8FD4;&#x56DE;&#x539F;&#x683C;&#x5F0F;&#x7684;reducer</h3>
<p>&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x65B0;&#x7684;combinceReducer&#xFF0C;&#x5C06;&#x65B0;&#x7684;&#x683C;&#x5F0F;&#xFF0C;&#x8F6C;&#x5316;&#x4E3A;&#x4E4B;&#x524D;&#x7684;reducer&#x683C;&#x5F0F;&#xFF0C;&#x5E76;&#x4FDD;&#x5B58;&#x5404;&#x4E2A;reducer&#x5176;&#x548C;&#x5BF9;&#x5E94;&#x7684;action&#x7684;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x3002;</p>
<p>&#x4EE3;&#x7801;&#x7B80;&#x5355;&#x793A;&#x610F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x83B7;&#x53D6;&#x5404;reducers&#x91CC;&#x7684;&#x65B9;&#x6CD5;
const actionNames = Object.keys(reducers)
const resultActions = actionNames.map(action =&gt; {
  const childNamespace = `${namespace}/${action}`
  // &#x5C06;action&#x5B58;&#x5165;namespace
  Namespace.setActionByNamespace(childNamespace)
  return {
    name: Namespace.toAction(childNamespace),
    fn: reducers[action]
  }
})

// &#x8FD4;&#x56DE;&#x9ED8;&#x8BA4;&#x683C;&#x5F0F;
return (state = inititalState, action) =&gt; {
  // &#x67E5;&#x8BE2;action&#x5BF9;&#x5E94;&#x7684;&#x65B0;&#x7684;reducer&#x91CC;&#x7684;&#x65B9;&#x6CD5;
  const actionFn = resultActions.find(cur =&gt; cur.name === action.type)
  if (actionFn) {
    return actionFn.fn &amp;&amp; actionFn.fn(state, action.payload)
  }
  return state
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//&#x83B7;&#x53D6;&#x5404;reducers&#x91CC;&#x7684;&#x65B9;&#x6CD5;</span>
<span class="hljs-keyword">const</span> actionNames = <span class="hljs-built_in">Object</span>.keys(reducers)
<span class="hljs-keyword">const</span> resultActions = actionNames.map(<span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> childNamespace = <span class="hljs-string">`<span class="hljs-subst">${namespace}</span>/<span class="hljs-subst">${action}</span>`</span>
  <span class="hljs-comment">// &#x5C06;action&#x5B58;&#x5165;namespace</span>
  Namespace.setActionByNamespace(childNamespace)
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">name</span>: Namespace.toAction(childNamespace),
    <span class="hljs-attr">fn</span>: reducers[action]
  }
})

<span class="hljs-comment">// &#x8FD4;&#x56DE;&#x9ED8;&#x8BA4;&#x683C;&#x5F0F;</span>
<span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">state = inititalState, action</span>) =&gt;</span> {
  <span class="hljs-comment">// &#x67E5;&#x8BE2;action&#x5BF9;&#x5E94;&#x7684;&#x65B0;&#x7684;reducer&#x91CC;&#x7684;&#x65B9;&#x6CD5;</span>
  <span class="hljs-keyword">const</span> actionFn = resultActions.find(<span class="hljs-function"><span class="hljs-params">cur</span> =&gt;</span> cur.name === action.type)
  <span class="hljs-keyword">if</span> (actionFn) {
    <span class="hljs-keyword">return</span> actionFn.fn &amp;&amp; actionFn.fn(state, action.payload)
  }
  <span class="hljs-keyword">return</span> state
}</code></pre>
<h3 id="articleHeader8">2.&#x65B0;&#x7684;action&#x521B;&#x5EFA;&#x51FD;&#x6570;&#x6700;&#x7EC8;dispatch&#x51FA;&#x539F;&#x683C;&#x5F0F;&#x7684;action</h3>
<p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x628A;&#x8FD9;&#x6837;&#x683C;&#x5F0F;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x8F6C;&#x5316;&#x6210;&#x8FD9;&#x6837;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="count =&gt; dispatch =&gt; dispatch(&apos;/count/add&apos;, count)

//or
params =&gt; dispatch =&gt; { dispatch(&apos;/count/add&apos;, 1), dispatch(&apos;/count/sub&apos;, 2) }

//&#x7ED3;&#x679C;
count =&gt; ({ type: &apos;count_add&apos;, payload: count })" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">count =&gt; <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> dispatch(<span class="hljs-string">&apos;/count/add&apos;</span>, count)

<span class="hljs-comment">//or</span>
params =&gt; <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> { dispatch(<span class="hljs-string">&apos;/count/add&apos;</span>, <span class="hljs-number">1</span>), dispatch(<span class="hljs-string">&apos;/count/sub&apos;</span>, <span class="hljs-number">2</span>) }

<span class="hljs-comment">//&#x7ED3;&#x679C;</span>
count =&gt; ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;count_add&apos;</span>, <span class="hljs-attr">payload</span>: count })</code></pre>
<p>&#x8FD9;&#x91CC;&#x7684;&#x5904;&#x7406;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x6539;&#x9020;&#x6211;&#x4EEC;&#x7684;dispatch&#x51FD;&#x6570;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="action =&gt; params =&gt; (dispatch, getstate) =&gt; {
  const retDispatch = (namespace, payload) =&gt; {
    return dispatch({
      type: Namespace.get(namespace),
      payload
    })
  }
  return action(params)(retDispatch, getstate)
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">action =&gt; <span class="hljs-function"><span class="hljs-params">params</span> =&gt;</span> (dispatch, getstate) =&gt; {
  <span class="hljs-keyword">const</span> retDispatch = <span class="hljs-function">(<span class="hljs-params">namespace, payload</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> dispatch({
      <span class="hljs-attr">type</span>: Namespace.get(namespace),
      payload
    })
  }
  <span class="hljs-keyword">return</span> action(params)(retDispatch, getstate)
}</code></pre>
<h2 id="articleHeader9">&#x603B;&#x7ED3;</h2>
<p>&#x901A;&#x8FC7;&#x5BF9;Redux Api&#x7684;&#x6539;&#x9020;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x4E8C;&#x6B21;&#x5C01;&#x88C5;&#xFF0C;&#x5DF2;&#x7ECF;&#x5F88;&#x5927;&#x7684;&#x7B80;&#x5316;&#x4E86;&#x76EE;&#x524D;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x6837;&#x677F;&#x4EE3;&#x7801;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x5F88;&#x987A;&#x7545;&#x7684;&#x4F7F;&#x7528;&#x3002;</p>
<p>&#x9488;&#x5BF9;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF0C;&#x5176;&#x5B9E;&#x8FD8;&#x6709;&#x51E0;&#x4E2A;&#x53EF;&#x4EE5;&#x6539;&#x8FDB;&#x7684;&#x5730;&#x65B9;&#xFF1A;</p>
<ul>
<li>actions&#x7684;&#x8F6C;&#x5316;&#x8FC7;&#x7A0B;&#xFF0C;&#x4EA4;&#x7531;&#x4E2D;&#x95F4;&#x4EF6;&#x5904;&#x7406;</li>
<li>&#x6027;&#x80FD;&#x95EE;&#x9898;&#xFF0C;&#x76EE;&#x524D;&#x76F8;&#x5F53;&#x4E8E;&#x591A;&#x505A;&#x4E86;&#x4E00;&#x5C42;&#x8F6C;&#x5316;&#xFF0C;&#x4F46;&#x662F;&#x76EE;&#x524D;&#x5F71;&#x54CD;&#x4E0D;&#x5927;</li>
<li>reducer,action&#x590D;&#x7528;</li>
</ul>
<p>&#x6709;&#x5174;&#x8DA3;&#x7684;&#x8BDD;&#xFF0C;&#x6B22;&#x8FCE;&#x63A2;&#x8BA8;~ &#x9644;&#x4E0A;github <a href="https://github.com/callmedadaxin/easy-redux" rel="nofollow noreferrer" target="_blank">easy-redux</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我是如何一步步“改造”redux的

## 原文链接
[https://segmentfault.com/a/1190000015035012](https://segmentfault.com/a/1190000015035012)

