---
title: 我的源码阅读之路：redux源码剖析
hidden: true
categories: [reprint]
slug: c9ac83df
date: 2018-11-03 02:30:13
---

{{< raw >}}
<h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p>&#x7528;&#x8FC7;react&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x5BF9;redux&#x5176;&#x5B9E;&#x5E76;&#x4E0D;&#x964C;&#x751F;&#xFF0C;&#x57FA;&#x672C;&#x5927;&#x591A;&#x6570;&#x7684;React&#x5E94;&#x7528;&#x7528;&#x5230;&#x5B83;&#x3002;&#x4E00;&#x822C;&#x5927;&#x5BB6;&#x7528;redux&#x7684;&#x65F6;&#x5019;&#x57FA;&#x672C;&#x90FD;&#x4E0D;&#x4F1A;&#x5355;&#x72EC;&#x53BB;&#x4F7F;&#x7528;&#x5B83;&#xFF0C;&#x800C;&#x662F;&#x914D;&#x5408;react-redux&#x4E00;&#x8D77;&#x53BB;&#x4F7F;&#x7528;&#x3002;&#x521A;&#x5B66;&#x4E60;redux&#x7684;&#x65F6;&#x5019;&#x5F88;&#x5BB9;&#x6613;&#x5F04;&#x6DF7;&#x6DC6;redux&#x548C;react-redux&#xFF0C;&#x4EE5;&#x4E3A;&#x4ED6;&#x4FE9;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x4E1C;&#x897F;&#x3002;&#x5176;&#x5B9E;&#x4E0D;&#x7136;&#xFF0C;redux&#x662F;javascript&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684;&#x53EF;&#x9884;&#x6D4B;&#x72B6;&#x6001;&#x5BB9;&#x5668;,&#x800C;react-redux&#x5219;&#x662F;&#x7528;&#x6765;&#x8FDE;&#x63A5;&#x8FD9;&#x4E2A;&#x72B6;&#x6001;&#x5BB9;&#x5668;&#x4E0E;react&#x7EC4;&#x4EF6;&#x3002;&#x53EF;&#x80FD;&#x524D;&#x7AEF;&#x65B0;&#x4EBA;&#x5BF9;&#x8FD9;&#x4E24;&#x8005;&#x8FD8;&#x662F;&#x89C9;&#x5F97;&#x5F88;&#x62BD;&#x8C61;&#xFF0C;&#x6253;&#x4E2A;&#x6BD4;&#x65B9;&#x8BF4;&#xFF0C;&#x5728;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x5BB6;&#x5EAD;&#x4E2D;&#xFF0C;&#x5988;&#x5988;&#x5728;&#x5BB6;&#x91CC;&#x90FD;&#x662F;&#x81F3;&#x9AD8;&#x65E0;&#x4E0A;&#x7684;&#x5730;&#x4F4D;&#xFF0C;&#x638C;&#x63E1;&#x5BB6;&#x4E2D;&#x7ECF;&#x6D4E;&#x5927;&#x6743;&#xFF0C;&#x5BB6;&#x91CC;&#x7684;&#x7ECF;&#x6D4E;&#x6D41;&#x6C34;&#x90FD;&#x8981;&#x7ECF;&#x8FC7;&#x4F60;&#x7684;&#x5988;&#x5988;&#xFF0C;&#x800C;&#x4F60;&#x7684;&#x7238;&#x7238;&#x5219;&#x8D1F;&#x8D23;&#x4ECE;&#x5916;&#x9762;&#x8D5A;&#x94B1;&#x7136;&#x540E;&#x4EA4;&#x7ED9;&#x4F60;&#x7684;&#x5988;&#x5988;&#x3002;&#x8FD9;&#x91CC;&#x628A;&#x4F60;&#x7684;&#x5988;&#x5988;&#x7C7B;&#x6BD4;&#x6210;redux&#xFF0C;&#x800C;&#x4F60;&#x7684;&#x7238;&#x7238;&#x53EF;&#x4EE5;&#x7C7B;&#x6BD4;&#x6210;react-redux,&#x800C;&#x5916;&#x9762;&#x7684;&#x5927;&#x5343;&#x4E16;&#x754C;&#x5219;&#x662F;react&#x7EC4;&#x4EF6;&#x3002;&#x76F8;&#x4FE1;&#x8FD9;&#x6837;&#x7684;&#x7C7B;&#x6BD4;&#xFF0C;&#x5927;&#x5BB6;&#x5BF9;&#x8FD9;react&#x548C;react-redux&#x7684;&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x521D;&#x6B65;&#x8BA4;&#x8BC6;&#x3002;&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#x4ECB;&#x7ECD;&#x7684;&#x4E3B;&#x8981;&#x5185;&#x5BB9;&#x662F;&#x5BF9;redux&#x7684;&#x6E90;&#x7801;&#x7684;&#x5206;&#x6790;&#xFF0C;react-redux&#x7684;&#x6E90;&#x7801;&#x5206;&#x6790;&#x5C06;&#x4F1A;&#x5728;&#x6211;&#x7684;&#x4E0B;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#xFF0C;&#x656C;&#x8BF7;&#x671F;&#x5F85;&#xFF01;&#x5404;&#x4F4D;&#x5C0F;&#x4F19;&#x4EEC;&#x5982;&#x679C;&#x89C9;&#x5F97;&#x5199;&#x7684;&#x4E0D;&#x9519;&#x7684;&#x8BDD;&#xFF0C;&#x9EBB;&#x70E6;&#x591A;&#x591A;&#x70B9;&#x8D5E;&#x6536;&#x85CF;&#x5173;&#x6CE8;&#x54E6;&#xFF01;</p><h1 id="articleHeader1">redux&#x7684;&#x4F7F;&#x7528;</h1><p>&#x5728;&#x8BB2;redux&#x7684;&#x6E90;&#x7801;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x56DE;&#x987E;&#x4E00;&#x4E0B;redux&#x662F;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x7684;&#xFF0C;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x518D;&#x5BF9;&#x7167;&#x7740;redux&#x7684;&#x4F7F;&#x7528;&#x53BB;&#x9605;&#x8BFB;&#x6E90;&#x7801;&#xFF0C;&#x8FD9;&#x6837;&#x5927;&#x5BB6;&#x7684;&#x5370;&#x8C61;&#x53EF;&#x80FD;&#x4F1A;&#x66F4;&#x52A0;&#x6DF1;&#x523B;&#x70B9;&#x3002;&#x5148;&#x8D34;&#x4E0A;&#x4E00;&#x6BB5;demo&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const initialState={
  cash:200,

}
const reducer=(state=initialState,action)=&gt;{
  const {type,payload} = action;
  switch(type){
    case &apos;INCREMENT&apos;:
      return Object.assign({},state,{
        cash:state.cash+payload
      });
    case &apos;DECREMENT&apos;:
      return Object.assign({},state,{
        cash:state.cash-payload
      });
    default :
      return state;
  }
}

const reducers=Redux.combineReducers({treasury:reducer});

//&#x521B;&#x5EFA;&#x5C0F;&#x91D1;&#x5E93;
const store=Redux.createStore(reducers);

//&#x5F53;&#x5C0F;&#x91D1;&#x5E93;&#x7684;&#x73B0;&#x91D1;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x6253;&#x5370;&#x5F53;&#x524D;&#x7684;&#x91D1;&#x989D;
store.subscribe(()=&gt;{
  console.log(`&#x4F59;&#x989D;&#xFF1A;${store.getState().treasury.cash}`);
});

//&#x5C0F;&#x660E;&#x7238;&#x7238;&#x53D1;&#x4E86;&#x5DE5;&#x8D44;300&#x5757;&#x4E0A;&#x4EA4;
store.dispatch({
  type:&apos;INCREMENT&apos;,
  payload:300
});
//&#x5C0F;&#x660E;&#x62FF;&#x7740;&#x6C34;&#x7535;&#x8D39;&#x5355;&#x4EA4;100&#x5757;&#x6C34;&#x7535;&#x8D39;
store.dispatch({
  type:&apos;DECREMENT&apos;,
  payload:100
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> initialState={
  cash:<span class="hljs-number">200</span>,

}
<span class="hljs-keyword">const</span> reducer=<span class="hljs-function">(<span class="hljs-params">state=initialState,action</span>)=&gt;</span>{
  <span class="hljs-keyword">const</span> {<span class="hljs-keyword">type</span>,payload} = action;
  <span class="hljs-keyword">switch</span>(<span class="hljs-keyword">type</span>){
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;INCREMENT&apos;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({},state,{
        cash:state.cash+payload
      });
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;DECREMENT&apos;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({},state,{
        cash:state.cash-payload
      });
    <span class="hljs-keyword">default</span> :
      <span class="hljs-keyword">return</span> state;
  }
}

<span class="hljs-keyword">const</span> reducers=Redux.combineReducers({treasury:reducer});

<span class="hljs-comment">//&#x521B;&#x5EFA;&#x5C0F;&#x91D1;&#x5E93;</span>
<span class="hljs-keyword">const</span> store=Redux.createStore(reducers);

<span class="hljs-comment">//&#x5F53;&#x5C0F;&#x91D1;&#x5E93;&#x7684;&#x73B0;&#x91D1;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x6253;&#x5370;&#x5F53;&#x524D;&#x7684;&#x91D1;&#x989D;</span>
store.subscribe(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x4F59;&#x989D;&#xFF1A;<span class="hljs-subst">${store.getState().treasury.cash}</span>`</span>);
});

<span class="hljs-comment">//&#x5C0F;&#x660E;&#x7238;&#x7238;&#x53D1;&#x4E86;&#x5DE5;&#x8D44;300&#x5757;&#x4E0A;&#x4EA4;</span>
store.dispatch({
  <span class="hljs-keyword">type</span>:<span class="hljs-string">&apos;INCREMENT&apos;</span>,
  payload:<span class="hljs-number">300</span>
});
<span class="hljs-comment">//&#x5C0F;&#x660E;&#x62FF;&#x7740;&#x6C34;&#x7535;&#x8D39;&#x5355;&#x4EA4;100&#x5757;&#x6C34;&#x7535;&#x8D39;</span>
store.dispatch({
  <span class="hljs-keyword">type</span>:<span class="hljs-string">&apos;DECREMENT&apos;</span>,
  payload:<span class="hljs-number">100</span>
});</code></pre><p>&#x4E0A;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x5178;&#x578B;&#x7684;redux&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x8DDF;&#x5927;&#x5BB6;&#x5E73;&#x65F6;&#x5728;&#x9879;&#x76EE;&#x91CC;&#x7528;&#x7684;&#x4E0D;&#x592A;&#x4E00;&#x6837;&#xFF0C;&#x53EF;&#x80FD;&#x6709;&#x4E9B;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x4E0D;&#x80FD;&#x7406;&#x89E3;&#xFF0C;&#x5176;&#x5B9E;react-redux&#x53EA;&#x4E0D;&#x8FC7;&#x5728;&#x8FD9;&#x79CD;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x4E0A;&#x505A;&#x4E86;&#x4E00;&#x5C42;&#x5C01;&#x88C5;&#x3002;&#x7B49;&#x5F53;&#x6211;&#x4EEC;&#x5F04;&#x6E05;&#x695A;redux&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x518D;&#x53BB;&#x770B;react-redux&#x6E90;&#x7801;&#x4FBF;&#x4F1A;&#x660E;&#x767D;&#x4E86;&#x6211;&#x4EEC;&#x5728;&#x9879;&#x76EE;&#x91CC;&#x4E3A;&#x4F55;&#x662F;&#x90A3;&#x79CD;&#x5199;&#x6CD5;&#x800C;&#x4E0D;&#x662F;&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x3002;</p><p>&#x8BF4;&#x5230;redux&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x4E0D;&#x514D;&#x8981;&#x8BF4;&#x4E00;&#x4E0B;action&#x3001;reducer&#x548C;store&#x4E09;&#x8005;&#x7684;&#x5173;&#x7CFB;&#x3002;&#x8BB0;&#x5F97;&#x5F53;&#x521D;&#x7B2C;&#x4E00;&#x6B21;&#x4F7F;&#x7528;redux&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E00;&#x76F4;&#x5206;&#x4E0D;&#x6E05;&#x8FD9;&#x4E09;&#x8005;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x611F;&#x89C9;&#x8FD9;&#x4E09;&#x4E2A;&#x5F88;&#x62BD;&#x8C61;&#x5F88;&#x7384;&#x5B66;&#xFF0C;&#x76F8;&#x4FE1;&#x4E0D;&#x5C11;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x8DDF;&#x6211;&#x4E00;&#x6837;&#x9047;&#x5230;&#x8FC7;&#x540C;&#x6837;&#x7684;&#x60C5;&#x51B5;&#x3002;&#x5176;&#x5B9E;&#x5E76;&#x4E0D;&#x96BE;&#xFF0C;&#x6211;&#x8FD8;&#x662F;&#x7528;&#x6587;&#x7AE0;&#x5F00;&#x5934;&#x6253;&#x7684;&#x6BD4;&#x65B9;&#x8FD8;&#x89E3;&#x91CA;&#x8FD9;&#x4E09;&#x8005;&#x7684;&#x5173;&#x7CFB;&#x3002;</p><blockquote>&#x73B0;&#x5728;&#x4FDD;&#x9669;&#x7BB1;&#xFF08;store&#xFF09;&#x91CC;&#x5B58;&#x653E;200&#x5757;&#x5927;&#x6D0B;&#x3002;&#x5230;&#x6708;&#x5E95;&#x4E86;&#xFF0C;&#x5C0F;&#x660E;&#x7684;&#x7238;&#x7238;&#x7684;&#x5355;&#x4F4D;&#x53D1;&#x4E86;&#x5DE5;&#x8D44;&#x603B;&#x8BA1;300&#x5757;&#x5927;&#x6D0B;&#xFF0C;&#x62FF;&#x5230;&#x5DE5;&#x8D44;&#x4E4B;&#x540E;&#x7B2C;&#x4E00;&#x4EF6;&#x7684;&#x4E8B;&#x60C5;&#x5C31;&#x662F;&#x4E0A;&#x4EA4;&#xFF0C;&#x6BEB;&#x65E0;&#x7591;&#x95EE;&#x7684;&#xFF0C;&#x9664;&#x975E;&#x5C0F;&#x660E;&#x7238;&#x7238;&#x4E0D;&#x8981;&#x547D;&#x4E86;&#x3002;&#x5C0F;&#x660E;&#x7684;&#x7238;&#x7238;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5C06;&#x8FD9;300&#x5757;&#x5927;&#x6D0B;&#x653E;&#x5230;&#x5BB6;&#x91CC;&#x7684;&#x4FDD;&#x9669;&#x7BB1;&#x91CC;&#x9762;&#x5417;&#xFF1F;&#x663E;&#x7136;&#x662F;&#x4E0D;&#x53EF;&#x4EE5;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5C0F;&#x660E;&#x7684;&#x7238;&#x7238;&#x5F97;&#x5411;&#x5C0F;&#x660E;&#x7684;&#x7238;&#x7238;&#x63D0;&#x4EA4;&#x7533;&#x8BF7;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;&#x7533;&#x8BF7;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x6240;&#x8BF4;&#x7684;action&#x3002;&#x8FD9;&#x4E2A;&#x7533;&#x8BF7;&#xFF08;action&#xFF09;&#x5305;&#x62EC;&#x64CD;&#x4F5C;&#x7C7B;&#x578B;&#x548C;&#x5BF9;&#x5E94;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x7533;&#x8BF7;&#x7C7B;&#x578B;&#x5C31;&#x662F;&#x5B58;&#x94B1;&#xFF08;INCREMENT&#xFF09;,&#x5BF9;&#x5E94;&#x7684;&#x4E1C;&#x897F;&#x5C31;&#x662F;300&#x5757;&#x5927;&#x6D0B;&#xFF08;payload&#xFF09;&#x3002;&#x6B64;&#x65F6;&#x5C0F;&#x660E;&#x7684;&#x5988;&#x5988;&#x62FF;&#x5230;&#x8FD9;&#x4E2A;&#x7533;&#x8BF7;&#x4E4B;&#x540E;&#xFF0C;&#x5C06;&#x6839;&#x636E;&#x8FD9;&#x4E2A;&#x7533;&#x8BF7;&#x6267;&#x884C;&#x5BF9;&#x5E94;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x662F;&#x5F80;&#x4FDD;&#x9669;&#x7BB1;&#x91CC;&#x7684;&#x73B0;&#x91D1;&#x91CC;&#x653E;300&#x5757;&#x5927;&#x6D0B;&#x8FDB;&#x53BB;&#xFF0C;&#x6B64;&#x65F6;&#x5C0F;&#x660E;&#x7684;&#x5988;&#x5988;&#x5E72;&#x7684;&#x4E8B;&#x60C5;&#x5C31;&#x662F;reducer&#x5E72;&#x7684;&#x4E8B;&#x60C5;&#x3002;&#x5F53;300&#x5757;&#x5927;&#x6D0B;&#x653E;&#x5B8C;&#x4E4B;&#x540E;&#xFF0C;&#x5C0F;&#x660E;&#x7684;&#x5988;&#x5988;&#x5C31;&#x901A;&#x77E5;&#x5BB6;&#x91CC;&#x7684;&#x6240;&#x6709;&#x4EBA;&#x73B0;&#x5728;&#x7684;&#x5C0F;&#x91D1;&#x5E93;&#x7684;&#x91D1;&#x989D;&#x5DF2;&#x7ECF;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#xFF0C;&#x73B0;&#x5728;&#x7684;&#x4F59;&#x989D;&#x662F;500&#x5757;&#x3002;&#x5F53;&#x5C0F;&#x660E;&#x7684;&#x7238;&#x7238;&#x6536;&#x5230;&#x8FD9;&#x4E2A;&#x901A;&#x77E5;&#x4E4B;&#x540E;&#xFF0C;&#x5FC3;&#x7684;&#x4E00;&#x5757;&#x5927;&#x77F3;&#x5934;&#x4E5F;&#x5C31;&#x653E;&#x4E0B;&#x6765;&#x4E86;&#x3002;&#x8FC7;&#x4E86;&#x4E00;&#x4F1A;&#xFF0C;&#x5C0F;&#x660E;&#x56DE;&#x6765;&#x4E86;&#xFF0C;&#x5E76;&#x4E14;&#x62FF;&#x7740;&#x4E00;&#x5F20;&#x4EF7;&#x503C;100&#x5757;&#x7684;&#x6C34;&#x7535;&#x8D39;&#x7684;&#x50AC;&#x6536;&#x5355;&#x3002;&#x4E8E;&#x662F;&#xFF0C;&#x5C0F;&#x660E;&#x60F3;&#x5C0F;&#x660E;&#x5988;&#x5988;&#x7533;&#x8BF7;&#x4EA4;&#x6C34;&#x7535;&#x8D39;&#xFF0C;&#x5C0F;&#x660E;&#x5988;&#x5988;&#x4ECE;&#x4FDD;&#x9669;&#x5E93;&#x4E2D;&#x53D6;&#x51FA;&#x6765;100&#x5757;&#x7ED9;&#x4E86;&#x5C0F;&#x660E;&#xFF0C;&#x5E76;&#x901A;&#x77E5;&#x4E86;&#x5BB6;&#x91CC;&#x6240;&#x6709;&#x4EBA;&#x5C0F;&#x91D1;&#x5E93;&#x7684;&#x91D1;&#x989D;&#x53C8;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#xFF0C;&#x73B0;&#x5728;&#x4F59;&#x989D;400&#x5757;&#x3002;</blockquote><p>&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x76F8;&#x4FE1;&#x5C0F;&#x4F19;&#x4EEC;&#x5BF9;&#x4E09;&#x8005;&#x7684;&#x5173;&#x7CFB;&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x6E05;&#x6670;&#x7684;&#x8BA4;&#x8BC6;&#x3002;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x7406;&#x6E05;&#x695A;&#x4E86;action&#x3001;reducer&#x548C;store&#x4E09;&#x8005;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x5E76;&#x4E14;&#x4E5F;&#x77E5;&#x9053;&#x4E86;redux&#x662F;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x7684;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x5C06;&#x5F00;&#x59CB;&#x6211;&#x4EEC;&#x5F97;&#x6E90;&#x7801;&#x9605;&#x8BFB;&#x4E4B;&#x65C5;&#x3002;</p><h1 id="articleHeader2">redux&#x9879;&#x76EE;&#x7ED3;&#x6784;</h1><p>&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#x662F;&#x57FA;&#x4E8E;redux&#x7684;4.0.0&#x7248;&#x672C;&#x505A;&#x7684;&#x6E90;&#x7801;&#x5206;&#x6790;&#xFF0C;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x5728;&#x5BF9;&#x7167;&#x6E90;&#x7801;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5343;&#x4E07;&#x522B;&#x5F04;&#x9519;&#x4E86;&#x3002;&#x6574;&#x4E2A;redux&#x9879;&#x76EE;&#x7684;&#x6E90;&#x7801;&#x7684;&#x9605;&#x8BFB;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x5173;&#x6CE8;src&#x7684;&#x76EE;&#x5F55;&#x5373;&#x53EF;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbg72D?w=548&amp;h=494" src="https://static.alili.tech/img/bVbg72D?w=548&amp;h=494" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x5206;&#x4E3A;&#x4E24;&#x5927;&#x5757;&#xFF0C;&#x4E00;&#x5757;&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5DE5;&#x5177;&#x5E93;&#xFF0C;&#x53E6;&#x4E00;&#x5757;&#x5219;&#x662F;redux&#x7684;&#x903B;&#x8F91;&#x4EE3;&#x7801;&#x3002;&#x5148;&#x4ECE;&#x54EA;&#x5757;&#x5F00;&#x59CB;&#x9605;&#x8BFB;&#x5462;&#xFF1F;&#x6211;&#x4E2A;&#x4EBA;&#x5EFA;&#x8BAE;&#x5148;&#x9605;&#x8BFB;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5DE5;&#x5177;&#x5E93;&#x8FD9;&#x5757;&#x3002;&#x4E3B;&#x8981;&#x6709;&#x8FD9;&#x4E48;&#x4E24;&#x4E2A;&#x539F;&#x56E0;&#xFF1A;&#x7B2C;&#x4E00;&#x4E2A;&#xFF0C;&#x8FD9;&#x5757;&#x4EE3;&#x7801;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x5BB9;&#x6613;&#x7406;&#x89E3;&#xFF0C;&#x5927;&#x5BB6;&#x66F4;&#x80FD;&#x8FDB;&#x5165;&#x9605;&#x8BFB;&#x7684;&#x72B6;&#x6001;&#xFF1B;&#x7B2C;&#x4E8C;&#x4E2A;&#xFF0C;redux&#x903B;&#x8F91;&#x4EE3;&#x7801;&#x4F1A;&#x7528;&#x5230;&#x8FD9;&#x4E9B;&#x81EA;&#x5B9A;&#x4E49;&#x5DE5;&#x5177;&#xFF0C;&#x5148;&#x641E;&#x61C2;&#x8FD9;&#x4E9B;&#xFF0C;&#x5BF9;&#x540E;&#x7EED;&#x903B;&#x8F91;&#x4EE3;&#x7801;&#x7684;&#x9605;&#x8BFB;&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7684;&#x94FA;&#x57AB;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6B63;&#x5F0F;&#x5F00;&#x59CB;&#x6211;&#x4EEC;&#x7684;&#x6E90;&#x7801;&#x9605;&#x8BFB;&#x4E4B;&#x65C5;&#x3002;</p><h1 id="articleHeader3">utils</h1><h2 id="articleHeader4">actionTypes.js</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ActionTypes = {
  INIT:
    &apos;@@redux/INIT&apos; +
    Math.random()
      .toString(36)
      .substring(7)
      .split(&apos;&apos;)
      .join(&apos;.&apos;),
  REPLACE:
    &apos;@@redux/REPLACE&apos; +
    Math.random()
      .toString(36)
      .substring(7)
      .split(&apos;&apos;)
      .join(&apos;.&apos;)
}

export default ActionTypes" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code><span class="hljs-keyword">const</span> ActionTypes = {
  INIT:
    <span class="hljs-string">&apos;@@redux/INIT&apos;</span> +
    Math.<span class="hljs-built_in">random</span>()
      .toString(<span class="hljs-number">36</span>)
      .substring(<span class="hljs-number">7</span>)
      .<span class="hljs-built_in">split</span>(<span class="hljs-string">&apos;&apos;</span>)
      .<span class="hljs-built_in">join</span>(<span class="hljs-string">&apos;.&apos;</span>),
  REPLACE:
    <span class="hljs-string">&apos;@@redux/REPLACE&apos;</span> +
    Math.<span class="hljs-built_in">random</span>()
      .toString(<span class="hljs-number">36</span>)
      .substring(<span class="hljs-number">7</span>)
      .<span class="hljs-built_in">split</span>(<span class="hljs-string">&apos;&apos;</span>)
      .<span class="hljs-built_in">join</span>(<span class="hljs-string">&apos;.&apos;</span>)
}

export <span class="hljs-keyword">default</span> ActionTypes</code></pre><p>&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x5F88;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x5C31;&#x662F;&#x5BF9;&#x5916;&#x66B4;&#x9732;&#x4E24;&#x4E2A;action&#x7C7B;&#x578B;&#xFF0C;&#x6CA1;&#x4EC0;&#x4E48;&#x96BE;&#x70B9;&#x3002;&#x4F46;&#x662F;&#x6211;&#x8FD9;&#x91CC;&#x60F3;&#x4ECB;&#x7ECD;&#x7684;&#x662F;Number.prototype.toString&#x65B9;&#x6CD5;&#xFF0C;&#x4F30;&#x8BA1;&#x5E94;&#x8BE5;&#x6709;&#x4E0D;&#x5C11;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x4E0D;&#x77E5;&#x9053;toString&#x662F;&#x53EF;&#x4EE5;&#x4F20;&#x53C2;&#x7684;&#xFF0C;toString&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x53C2;&#x6570;radix&#xFF0C;&#x4EE3;&#x8868;&#x6570;&#x5B57;&#x7684;&#x57FA;&#x6570;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x6240;&#x8BF4;&#x7684;2&#x8FDB;&#x5236;&#x3001;10&#x8FDB;&#x5236;&#x3001;16&#x8FDB;&#x5236;&#x7B49;&#x7B49;&#x3002;radix&#x7684;&#x53D6;&#x503C;&#x8303;&#x56F4;&#x4E5F;&#x5F88;&#x5BB9;&#x6613;&#x5F97;&#x51FA;&#x6765;&#xFF0C;&#x6700;&#x5C0F;&#x8FDB;&#x5236;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x5F97;&#x4E8C;&#x8FDB;&#x5236;&#xFF0C;&#x6240;&#x4EE5;redix&gt;=2&#x3002;0-9&#xFF08;10&#x4E2A;&#x6570;&#x5B57;&#xFF09;+a-z&#xFF08;26&#x4E2A;&#x82F1;&#x6587;&#x5B57;&#x6BCD;&#xFF09;&#x603B;&#x5171;36&#x4E2A;&#xFF0C;&#x6240;&#x4EE5;redix&lt;=36&#x3002;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;2&lt;=radix&lt;=36,&#x9ED8;&#x8BA4;&#x662F;10&#x3002;&#x57FA;&#x4E8E;&#x8FD9;&#x4E2A;&#x7279;&#x6027;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5199;&#x4E00;&#x4E2A;&#x83B7;&#x53D6;&#x6307;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x968F;&#x673A;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x957F;&#x5EA6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x83B7;&#x53D6;&#x6307;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x968F;&#x673A;&#x5B57;&#x7B26;&#x4E32;
function randomString(length){
  let str=&apos;&apos;;
  while(length&gt;0){
    const fragment= Math.random().toString(36).substring(2);
    if(length&gt;fragment.length){
      str+=fragment;
      length-=fragment.length;
    }else{
      str+=fragment.substring(0,length);
      length=0;
    }
  }
  return str;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs hsp"><code><span class="hljs-comment">//&#x83B7;&#x53D6;&#x6307;&#x5B9A;&#x957F;&#x5EA6;&#x7684;&#x968F;&#x673A;&#x5B57;&#x7B26;&#x4E32;</span>
function randomString(<span class="hljs-keyword">length</span>){
  let <span class="hljs-keyword">str</span>=<span class="hljs-string">&apos;&apos;</span><span class="hljs-comment">;</span>
  <span class="hljs-keyword">while</span>(<span class="hljs-keyword">length</span>&gt;<span class="hljs-number">0</span>){
    const fragment= Math.random().toString(<span class="hljs-number">36</span>).substring(<span class="hljs-number">2</span>)<span class="hljs-comment">;</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">length</span>&gt;fragment.length){
      <span class="hljs-keyword">str</span>+=fragment<span class="hljs-comment">;</span>
      <span class="hljs-keyword">length</span>-=fragment.length<span class="hljs-comment">;</span>
    }<span class="hljs-keyword">else</span>{
      <span class="hljs-keyword">str</span>+=fragment.substring(<span class="hljs-number">0</span>,<span class="hljs-keyword">length</span>)<span class="hljs-comment">;</span>
      <span class="hljs-keyword">length</span>=<span class="hljs-number">0</span><span class="hljs-comment">;</span>
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">str</span><span class="hljs-comment">;</span>
}
</code></pre><h2 id="articleHeader5">isPlainObject.js</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function isPlainObject(obj) {
  if (typeof obj !== &apos;object&apos; || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isPlainObject</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> obj !== <span class="hljs-string">&apos;object&apos;</span> || obj === <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>

  <span class="hljs-keyword">let</span> proto = obj
  <span class="hljs-keyword">while</span> (<span class="hljs-built_in">Object</span>.getPrototypeOf(proto) !== <span class="hljs-literal">null</span>) {
    proto = <span class="hljs-built_in">Object</span>.getPrototypeOf(proto)
  }

  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.getPrototypeOf(obj) === proto
}</code></pre><p>isPlainObject.js&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x4EC5;&#x4EC5;&#x53EA;&#x662F;&#x5411;&#x5916;&#x66B4;&#x9732;&#x4E86;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x5224;&#x65AD;&#x662F;&#x5426;&#x7B80;&#x5355;&#x5BF9;&#x8C61;&#x7684;&#x51FD;&#x6570;&#x3002;&#x4EC0;&#x4E48;&#x7B80;&#x5355;&#x5BF9;&#x8C61;&#xFF1F;&#x5E94;&#x8BE5;&#x6709;&#x4E00;&#x4E9B;&#x5C0F;&#x4F19;&#x4F34;&#x4E0D;&#x7406;&#x89E3;&#xFF0C;&#x6240;&#x8C13;&#x7684;&#x7B80;&#x5355;&#x5BF9;&#x8C61;&#x5C31;&#x662F;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;__proto__&#x7B49;&#x4E8E;Object.prototype,&#x7528;&#x4E00;&#x53E5;&#x901A;&#x4FD7;&#x6613;&#x61C2;&#x7684;&#x8BDD;&#x5C31;&#x662F;:</p><blockquote><strong>&#x51E1;&#x4E0D;&#x662F;new Object()&#x6216;&#x8005;&#x5B57;&#x9762;&#x91CF;&#x7684;&#x65B9;&#x5F0F;&#x6784;&#x5EFA;&#x51FA;&#x6765;&#x7684;&#x5BF9;&#x8C61;&#x90FD;&#x4E0D;&#x662F;&#x7B80;&#x5355;&#x5BF9;&#x8C61;</strong></blockquote><p>&#x4E0B;&#x9762;&#x770B;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Fruit{
  sayName(){
    console.log(this.name)
  }
}

class Apple extends Fruit{
  constructor(){
    super();
    this.name=&quot;&#x82F9;&#x679C;&quot;
  }
}

const apple = new Apple();
const fruit = new Fruit();
const cherry = new Object({
  name:&apos;&#x6A31;&#x6843;&apos;
});
const banana = {
  name:&apos;&#x9999;&#x8549;&apos;
};

console.log(isPlainObject(apple));//false
console.log(isPlainObject(fruit));//false
console.log(isPlainObject(cherry));//true
console.log(isPlainObject(banana));//true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Fruit</span></span>{
  sayName(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Apple</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Fruit</span></span>{
  <span class="hljs-keyword">constructor</span>(){
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.name=<span class="hljs-string">&quot;&#x82F9;&#x679C;&quot;</span>
  }
}

<span class="hljs-keyword">const</span> apple = <span class="hljs-keyword">new</span> Apple();
<span class="hljs-keyword">const</span> fruit = <span class="hljs-keyword">new</span> Fruit();
<span class="hljs-keyword">const</span> cherry = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>({
  <span class="hljs-attr">name</span>:<span class="hljs-string">&apos;&#x6A31;&#x6843;&apos;</span>
});
<span class="hljs-keyword">const</span> banana = {
  <span class="hljs-attr">name</span>:<span class="hljs-string">&apos;&#x9999;&#x8549;&apos;</span>
};

<span class="hljs-built_in">console</span>.log(isPlainObject(apple));<span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(isPlainObject(fruit));<span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(isPlainObject(cherry));<span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(isPlainObject(banana));<span class="hljs-comment">//true</span></code></pre><p>&#x8FD9;&#x91CC;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x4EBA;&#x4E0D;&#x7406;&#x89E3;<strong>isPlainObject(fruit)===false</strong>&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x8FD9;&#x4E2A;&#x4E0D;&#x80FD;&#x7406;&#x89E3;&#x7684;&#x8BDD;&#xFF0C;&#x81EA;&#x5DF1;&#x540E;&#x9762;&#x8981;&#x8865;&#x4E60;&#x4E00;&#x4E0B;&#x539F;&#x578B;&#x94FE;&#x7684;&#x76F8;&#x5173;&#x77E5;&#x8BC6;&#xFF0C;&#x8FD9;&#x91CC;fruit.__proto__.__proto__&#x624D;&#x7B49;&#x4EF7;&#x4E8E;Object.prototype&#x3002;</p><h2 id="articleHeader6">warning.js</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function warning(message) {
  if (typeof console !== &apos;undefined&apos; &amp;&amp; typeof console.error === &apos;function&apos;) {
    console.error(message)
  }
  try {
    throw new Error(message)
  } catch (e) {} 
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">warning</span>(<span class="hljs-params">message</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">console</span> !== <span class="hljs-string">&apos;undefined&apos;</span> &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">console</span>.error === <span class="hljs-string">&apos;function&apos;</span>) {
    <span class="hljs-built_in">console</span>.error(message)
  }
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(message)
  } <span class="hljs-keyword">catch</span> (e) {} 
}</code></pre><p>&#x8FD9;&#x4E2A;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x4EC5;&#x4EC5;&#x662F;&#x6253;&#x5370;&#x4E00;&#x4E0B;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x3002;&#x4E0D;&#x8FC7;&#x8FD9;&#x91CC;&#x5B83;&#x7684;console&#x5C45;&#x7136;&#x52A0;&#x4E86;&#x4E00;&#x5C42;&#x5224;&#x65AD;&#xFF0C;&#x6211;&#x67E5;&#x9605;&#x4E86;&#x4E00;&#x4E0B;&#x53D1;&#x73B0;console&#x5176;&#x5B9E;&#x662F;&#x6709;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;&#xFF0C;ie8&#x53CA;&#x5176;&#x4EE5;&#x4E0B;&#x90FD;&#x662F;&#x4E0D;&#x652F;&#x6301;console&#x7684;&#x3002;&#x54CE;&#xFF0C;&#x4E0D;&#x4EC5;&#x611F;&#x53F9;&#x4E00;&#x53E5;&#xFF01;</p><blockquote><strong>&#x5982;&#x679C;&#x8BF4;&#x9A6C;&#x8D5B;&#x514B;&#x963B;&#x788D;&#x4E86;&#x4EBA;&#x7C7B;&#x6587;&#x660E;&#x7684;&#x8FDB;&#x7A0B;&#xFF0C;&#x90A3;ie&#x4FBF;&#x662F;&#x963B;&#x788D;&#x4E86;&#x524D;&#x7AEF;&#x6280;&#x672F;&#x7684;&#x53D1;&#x5C55;&#x3002;</strong></blockquote><h1 id="articleHeader7">&#x903B;&#x8F91;&#x4EE3;&#x7801;</h1><p>&#x5230;&#x8FD9;&#x91CC;&#x6211;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x5BF9;utils&#x4E0B;&#x7684;js&#x5206;&#x6790;&#xFF0C;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x5927;&#x5BB6;&#x60F3;&#x8C61;&#x7684;&#x90A3;&#x4E48;&#x96BE;&#x3002;&#x4EC5;&#x4EC5;&#x4ECE;&#x8FD9;&#x51E0;&#x4E2A;&#x7B80;&#x5355;&#x7684;js&#x4E2D;&#xFF0C;&#x5C31;&#x7275;&#x5F15;&#x51FA;&#x597D;&#x51E0;&#x4E2A;&#x6211;&#x4EEC;&#x5E73;&#x65F6;&#x4E0D;&#x592A;&#x5173;&#x6CE8;&#x7684;&#x77E5;&#x8BC6;&#x70B9;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x4E0D;&#x8BFB;&#x8FD9;&#x4E9B;&#x6E90;&#x7801;&#xFF0C;&#x8FD9;&#x4E9B;&#x5BB9;&#x6613;&#x88AB;&#x5FFD;&#x89C6;&#x7684;&#x77E5;&#x8BC6;&#x70B9;&#x5C31;&#x5F88;&#x96BE;&#x88AB;&#x6361;&#x8D77;&#x6765;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x5F88;&#x591A;&#x5927;&#x4F6C;&#x5EFA;&#x8BAE;&#x9605;&#x8BFB;&#x6E90;&#x7801;&#x7684;&#x539F;&#x56E0;&#x3002;&#x6211;&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A;&#xFF0C;&#x9605;&#x8BFB;&#x6E90;&#x7801;&#xFF0C;&#x7406;&#x89E3;&#x539F;&#x7406;&#x662F;&#x6B21;&#x8981;&#x7684;&#x3002;&#x5B66;&#x4E60;&#x5927;&#x4F6C;&#x7684;&#x4EE3;&#x7801;&#x98CE;&#x683C;&#x3001;&#x4E00;&#x4E9B;&#x89E3;&#x51B3;&#x601D;&#x8DEF;&#x4EE5;&#x53CA;&#x5BF9;&#x81EA;&#x5DF1;&#x77E5;&#x8BC6;&#x76F2;&#x70B9;&#x7684;&#x70B9;&#x4EAE;&#x66F4;&#x4E3A;&#x91CD;&#x8981;&#x3002;&#x5E9F;&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x5F00;&#x59CB;&#x6211;&#x4EEC;&#x4E0B;&#x4E00;&#x4E2A;&#x90E8;&#x5206;&#x7684;&#x4EE3;&#x7801;&#x9605;&#x8BFB;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x90E8;&#x5206;&#x5C31;&#x662F;&#x6574;&#x4E2A;redux&#x7684;&#x6838;&#x5FC3;&#x90E8;&#x5206;&#x3002;</p><h2 id="articleHeader8">index.js</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import createStore from &apos;./createStore&apos;
import combineReducers from &apos;./combineReducers&apos;
import bindActionCreators from &apos;./bindActionCreators&apos;
import applyMiddleware from &apos;./applyMiddleware&apos;
import compose from &apos;./compose&apos;
import warning from &apos;./utils/warning&apos;
import __DO_NOT_USE__ActionTypes from &apos;./utils/actionTypes&apos;

function isCrushed() {}

if (
  process.env.NODE_ENV !== &apos;production&apos; &amp;&amp;
  typeof isCrushed.name === &apos;string&apos; &amp;&amp;
  isCrushed.name !== &apos;isCrushed&apos;
) {
  warning(
    &quot;You are currently using minified code outside of NODE_ENV === &apos;production&apos;. &quot; +
      &apos;This means that you are running a slower development build of Redux. &apos; +
      &apos;You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify &apos; +
      &apos;or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) &apos; +
      &apos;to ensure you have the correct code for your production build.&apos;
  )
}

export {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose,
  __DO_NOT_USE__ActionTypes
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> createStore <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./createStore&apos;</span>
<span class="hljs-keyword">import</span> combineReducers <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./combineReducers&apos;</span>
<span class="hljs-keyword">import</span> bindActionCreators <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./bindActionCreators&apos;</span>
<span class="hljs-keyword">import</span> applyMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./applyMiddleware&apos;</span>
<span class="hljs-keyword">import</span> compose <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./compose&apos;</span>
<span class="hljs-keyword">import</span> warning <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./utils/warning&apos;</span>
<span class="hljs-keyword">import</span> __DO_NOT_USE__ActionTypes <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./utils/actionTypes&apos;</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isCrushed</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-keyword">if</span> (
  process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span> &amp;&amp;
  <span class="hljs-keyword">typeof</span> isCrushed.name === <span class="hljs-string">&apos;string&apos;</span> &amp;&amp;
  isCrushed.name !== <span class="hljs-string">&apos;isCrushed&apos;</span>
) {
  warning(
    <span class="hljs-string">&quot;You are currently using minified code outside of NODE_ENV === &apos;production&apos;. &quot;</span> +
      <span class="hljs-string">&apos;This means that you are running a slower development build of Redux. &apos;</span> +
      <span class="hljs-string">&apos;You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify &apos;</span> +
      <span class="hljs-string">&apos;or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) &apos;</span> +
      <span class="hljs-string">&apos;to ensure you have the correct code for your production build.&apos;</span>
  )
}

<span class="hljs-keyword">export</span> {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose,
  __DO_NOT_USE__ActionTypes
}
</code></pre><p>index.js&#x662F;&#x6574;&#x4E2A;redux&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x5C3E;&#x90E8;&#x7684;export&#x51FA;&#x6765;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x4E0D;&#x662F;&#x90FD;&#x5F88;&#x719F;&#x6089;&#xFF0C;&#x6BCF;&#x4E2A;&#x65B9;&#x6CD5;&#x5BF9;&#x5E94;&#x4E86;&#x4E00;&#x4E2A;js,&#x8FD9;&#x4E5F;&#x662F;&#x540E;&#x9762;&#x6211;&#x4EEC;&#x8981;&#x5206;&#x6790;&#x7684;&#x3002;&#x8FD9;&#x4E2A;&#x6709;&#x4E24;&#x4E2A;&#x70B9;&#x9700;&#x8981;&#x8BB2;&#x4E00;&#x4E0B;&#xFF1A;</p><p><strong>&#x7B2C;&#x4E00;&#x4E2A;&#xFF0C;__DO_NOT_USE__ActionTypes&#x3002;</strong> &#x8FD9;&#x4E2A;&#x5F88;&#x964C;&#x751F;&#xFF0C;&#x5E73;&#x65F6;&#x5728;&#x9879;&#x76EE;&#x91CC;&#x9762;&#x6211;&#x4EEC;&#x662F;&#x4E0D;&#x592A;&#x4F1A;&#x7528;&#x5230;&#x7684;&#xFF0C;redux&#x7684;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x4E5F;&#x6CA1;&#x6709;&#x63D0;&#x5230;&#x8FD9;&#x4E2A;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x770B;&#x6E90;&#x7801;&#x4F60;&#x53EF;&#x80FD;&#x5C31;&#x4E0D;&#x77E5;&#x9053;&#x8FD9;&#x4E2A;&#x4E1C;&#x897F;&#x7684;&#x5B58;&#x5728;&#x3002;&#x8FD9;&#x4E2A;&#x5E72;&#x561B;&#x7684;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x4E00;&#x70B9;&#x4E00;&#x70B9;&#x5F80;&#x4E0A;&#x627E;&#xFF0C;&#x627E;&#x5230;&#x8FD9;&#x4E48;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import __DO_NOT_USE__ActionTypes from &apos;./utils/actionTypes&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> __DO_NOT_USE__ActionTypes <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./utils/actionTypes&apos;</span></code></pre><p>&#x8FD9;&#x4E2A;&#x5F15;&#x5165;&#x7684;js&#x4E0D;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x4E4B;&#x524D;&#x5206;&#x6790;&#x7684;utils&#x7684;&#x5176;&#x4E2D;&#x4E00;&#x5458;&#x5417;&#xFF1F;&#x91CC;&#x9762;&#x5B9A;&#x4E49;&#x4E86;redux&#x81EA;&#x5E26;&#x7684;action&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x4ECE;&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#x7684;&#x547D;&#x540D;&#x6765;&#x770B;&#xFF0C;&#x8FD9;&#x662F;&#x5E2E;&#x52A9;&#x5F00;&#x53D1;&#x8005;&#x68C0;&#x67E5;&#x4E0D;&#x8981;&#x4F7F;&#x7528;redux&#x81EA;&#x5E26;&#x7684;action&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x4EE5;&#x9632;&#x51FA;&#x73B0;&#x9519;&#x8BEF;&#x3002;</p><p><strong>&#x7B2C;&#x4E8C;&#x4E2A;&#xFF0C;&#x51FD;&#x6570;isCrushed&#x3002;</strong> &#x8FD9;&#x91CC;&#x9762;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x51FD;&#x6570;isCrushed&#xFF0C;&#x4F46;&#x662F;&#x51FD;&#x6570;&#x4F53;&#x91CC;&#x9762;&#x5E76;&#x6CA1;&#x6709;&#x4E1C;&#x897F;&#x3002;&#x7B2C;&#x4E00;&#x6B21;&#x770B;&#x7684;&#x65F6;&#x5019;&#x5F88;&#x5947;&#x602A;&#xFF0C;&#x4E3A;&#x5565;&#x8981;&#x8FD9;&#x4E48;&#x5E72;&#xFF1F;&#x76F8;&#x4FE1;&#x6709;&#x4E0D;&#x5C11;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x8DDF;&#x6211;&#x6709;&#x4E00;&#x6837;&#x7684;&#x7591;&#x95EE;&#xFF0C;&#x7EE7;&#x7EED;&#x5F80;&#x4E0B;&#x770B;&#xFF0C;&#x7D27;&#x8DDF;&#x7740;&#x540E;&#x9762;&#x6709;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (
  process.env.NODE_ENV !== &apos;production&apos; &amp;&amp;
  typeof isCrushed.name === &apos;string&apos; &amp;&amp;
  isCrushed.name !== &apos;isCrushed&apos;
) {
  warning(
    &quot;You are currently using minified code outside of NODE_ENV === &apos;production&apos;. &quot; +
      &apos;This means that you are running a slower development build of Redux. &apos; +
      &apos;You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify &apos; +
      &apos;or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) &apos; +
      &apos;to ensure you have the correct code for your production build.&apos;
  )
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-keyword">if</span> (
  process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span> &amp;&amp;
  typeof isCrushed.<span class="hljs-keyword">name</span> === <span class="hljs-string">&apos;string&apos;</span> &amp;&amp;
  isCrushed.<span class="hljs-keyword">name</span> !== <span class="hljs-string">&apos;isCrushed&apos;</span>
) <span class="hljs-comment">{
  warning(
    &quot;You are currently using minified code outside of NODE_ENV === &apos;production&apos;. &quot; +
      &apos;This means that you are running a slower development build of Redux. &apos; +
      &apos;You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify &apos; +
      &apos;or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) &apos; +
      &apos;to ensure you have the correct code for your production build.&apos;
  )
}</span></code></pre><p>&#x770B;&#x5230;process.env.NODE_ENV&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x8981;&#x8DDF;&#x6211;&#x4EEC;&#x6253;&#x5305;&#x65F6;&#x7528;&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x8054;&#x7CFB;&#x8D77;&#x6765;&#x3002;&#x5F53;process.env.NODE_ENV===&apos;production&apos;&#x8FD9;&#x53E5;&#x8BDD;&#x76F4;&#x63A5;&#x4E0D;&#x6210;&#x7ACB;&#xFF0C;&#x6240;&#x4EE5;warning&#x4E5F;&#x5C31;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#xFF1B;&#x5F53;process.env.NODE_ENV!==&apos;production&apos;&#xFF0C;&#x6BD4;&#x5982;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x538B;&#x7F29;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;typeof isCrushed.name === &apos;string&apos; &amp;&amp; isCrushed.name !== &apos;isCrushed&apos;&#x4E5F;&#x4E0D;&#x4F1A;&#x6210;&#x7ACB;&#xFF1B;&#x5F53;process.env.NODE_ENV!==&apos;production&apos;&#xFF0C;&#x540C;&#x6837;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x6211;&#x4EEC;&#x8FDB;&#x884C;&#x4E86;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#xFF0C;&#x6B64;&#x65F6;isCrushed.name === &apos;string&apos; &amp;&amp; isCrushed.name !== &apos;isCrushed&apos;&#x5C31;&#x6210;&#x7ACB;&#x4E86;&#xFF0C;&#x53EF;&#x80FD;&#x6709;&#x4EBA;&#x4E0D;&#x7406;&#x89E3;isCrushed&#x51FD;&#x6570;&#x4E0D;&#x662F;&#x5728;&#x7684;&#x5417;&#xFF1F;&#x4E3A;&#x5565;&#x8FD9;&#x53E5;&#x8BDD;&#x5C31;&#x4E0D;&#x6210;&#x7ACB;&#x4E86;&#x5462;&#xFF1F;&#x5176;&#x5B9E;&#x5F88;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x4E86;&#x89E3;&#x8FC7;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#x7684;&#x539F;&#x7406;&#x7684;&#x4EBA;&#x90FD;&#x77E5;&#x9053;&#xFF0C;&#x51FD;&#x6570;isCrushed&#x7684;&#x51FD;&#x6570;&#x540D;&#x5C06;&#x4F1A;&#x88AB;&#x4E00;&#x4E2A;&#x5B57;&#x6BCD;&#x6240;&#x66FF;&#x4EE3;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x5C06;redux&#x9879;&#x76EE;&#x7684;&#x5728;development&#x73AF;&#x5883;&#x4E0B;&#x8FDB;&#x884C;&#x4E86;&#x4E00;&#x6B21;&#x538B;&#x7F29;&#x6253;&#x5305;&#x3002;&#x4EE3;&#x7801;&#x505A;&#x4E86;&#x8FD9;&#x4E48;&#x4E00;&#x5C42;&#x8F6C;&#x6362;&#xFF1A;</p><p><strong>&#x672A;&#x538B;&#x7F29;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isCrushed() {}
if (
  process.env.NODE_ENV !== &apos;production&apos; &amp;&amp;
  typeof isCrushed.name === &apos;string&apos; &amp;&amp;
  isCrushed.name !== &apos;isCrushed&apos;
)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isCrushed</span><span class="hljs-params">()</span> </span>{}
<span class="hljs-keyword">if</span> (
  process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span> &amp;&amp;
  <span class="hljs-keyword">typeof</span> isCrushed.name === <span class="hljs-string">&apos;string&apos;</span> &amp;&amp;
  isCrushed.name !== <span class="hljs-string">&apos;isCrushed&apos;</span>
)
</code></pre><p><strong>&#x538B;&#x7F29;&#x540E;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function d(){}&quot;string&quot;==typeof d.name&amp;&amp;&quot;isCrushed&quot;!==d.name" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code style="word-break:break-word;white-space:initial"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">d</span><span class="hljs-params">()</span></span>{}<span class="hljs-string">&quot;string&quot;</span>==<span class="hljs-keyword">typeof</span> d.name&amp;&amp;<span class="hljs-string">&quot;isCrushed&quot;</span>!==d.name</code></pre><p>&#x6B64;&#x65F6;&#x5224;&#x65AD;&#x6761;&#x4EF6;&#x5C31;&#x6210;&#x7ACB;&#x4E86;&#xFF0C;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x5C31;&#x4F1A;&#x6253;&#x5370;&#x51FA;&#x6765;&#x3002;&#x8FD9;&#x4E2A;&#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x9632;&#x6B62;&#x5F00;&#x53D1;&#x8005;&#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x5BF9;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x538B;&#x7F29;&#x3002;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x538B;&#x7F29;&#x4EE3;&#x7801;&#xFF0C;&#x4E0D;&#x4EC5;&#x8BA9;&#x6211;&#x4EEC;</p><h2 id="articleHeader9">createStore.js</h2><p>&#x51FD;&#x6570;createStore&#x63A5;&#x53D7;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF08;reducer&#x3001;preloadedState&#x3001;enhancer&#xFF09;&#xFF0C;reducer&#x548C;enhancer&#x6211;&#x4EEC;&#x7528;&#x7684;&#x6BD4;&#x8F83;&#x591A;&#xFF0C;preloadedState&#x7528;&#x7684;&#x6BD4;&#x8F83;&#x5C11;&#x3002;&#x7B2C;&#x4E00;&#x4E2A;reducer&#x5F88;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8FC7;&#x591A;&#x89E3;&#x91CA;&#x4E86;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;preloadedState&#xFF0C;&#x5B83;&#x4EE3;&#x8868;&#x7740;&#x521D;&#x59CB;&#x72B6;&#x6001;&#xFF0C;&#x6211;&#x4EEC;&#x5E73;&#x65F6;&#x5728;&#x9879;&#x76EE;&#x91CC;&#x4E5F;&#x5F88;&#x5C11;&#x7528;&#x5230;&#x5B83;&#xFF0C;&#x4E3B;&#x8981;&#x8BF4;&#x4E00;&#x4E0B;enhancer&#xFF0C;&#x4E2D;&#x6587;&#x540D;&#x53EB;&#x589E;&#x5F3A;&#x5668;&#xFF0C;&#x987E;&#x540D;&#x601D;&#x4E49;&#x5C31;&#x662F;&#x6765;&#x589E;&#x5F3A;redux&#x7684;&#xFF0C;&#x5B83;&#x7684;&#x7C7B;&#x578B;&#x7684;&#x662F;Function&#xFF0C;createStore.js&#x91CC;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" if (typeof enhancer !== &apos;undefined&apos;) {
    if (typeof enhancer !== &apos;function&apos;) {
      throw new Error(&apos;Expected the enhancer to be a function.&apos;)
    }

    return enhancer(createStore)(reducer, preloadedState)
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> enhancer !== <span class="hljs-string">&apos;undefined&apos;</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> enhancer !== <span class="hljs-string">&apos;function&apos;</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;Expected the enhancer to be a function.&apos;</span>)
    }

    <span class="hljs-keyword">return</span> enhancer(createStore)(reducer, preloadedState)
  }</code></pre><p>&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#x5C55;&#x793A;&#x4E86;enhancer&#x7684;&#x8C03;&#x7528;&#x8FC7;&#x7A0B;&#xFF0C;&#x6839;&#x636E;&#x8FD9;&#x4E2A;&#x8C03;&#x7528;&#x8FC7;&#x7A0B;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x63A8;&#x5BFC;&#x51FA;enhancer&#x7684;&#x51FD;&#x6570;&#x4F53;&#x7684;&#x67B6;&#x5B50;&#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x7684;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function enhancer(createStore) {
    return (reducer,preloadedState) =&gt; {
         //&#x903B;&#x8F91;&#x4EE3;&#x7801;
        .......
    }
 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enhancer</span>(<span class="hljs-params">createStore</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">reducer,preloadedState</span>) =&gt;</span> {
         <span class="hljs-comment">//&#x903B;&#x8F91;&#x4EE3;&#x7801;</span>
        .......
    }
 }</code></pre><p>&#x5E38;&#x89C1;&#x7684;enhancer&#x5C31;&#x662F;redux-thunk&#x4EE5;&#x53CA;redux-saga&#xFF0C;&#x4E00;&#x822C;&#x90FD;&#x4F1A;&#x914D;&#x5408;applyMiddleware&#x4E00;&#x8D77;&#x4F7F;&#x7528;&#xFF0C;&#x800C;applyMiddleware&#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x5C06;&#x8FD9;&#x4E9B;enhancer&#x683C;&#x5F0F;&#x5316;&#x6210;&#x7B26;&#x5408;redux&#x8981;&#x6C42;&#x7684;enhancer&#x3002;&#x5177;&#x4F53;applyMiddleware&#x5B9E;&#x73B0;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5C06;&#x4F1A;&#x8BB2;&#x5230;&#x3002;&#x6211;&#x4EEC;&#x5148;&#x770B;redux-thunk&#x7684;&#x4F7F;&#x7528;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, applyMiddleware } from &apos;redux&apos;;
import thunk from &apos;redux-thunk&apos;;
import rootReducer from &apos;./reducers/index&apos;;

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { createStore, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux&apos;</span>;
<span class="hljs-keyword">import</span> thunk <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-thunk&apos;</span>;
<span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./reducers/index&apos;</span>;

<span class="hljs-keyword">const</span> store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);</code></pre><p>&#x770B;&#x5B8C;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x4EBA;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x4E2A;&#x7591;&#x95EE;&#x201C;<strong>createStore&#x51FD;&#x6570;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E0D;&#x662F;preloadedState&#x5417;&#xFF1F;&#x8FD9;&#x6837;&#x4E0D;&#x4F1A;&#x62A5;&#x9519;&#x5417;&#xFF1F;</strong>&#x201D; &#x9996;&#x5148;&#x80AF;&#x5B9A;&#x4E0D;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x6BD5;&#x7ADF;&#x5B98;&#x65B9;&#x7ED9;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x4E0D;&#x7136;&#x5199;&#x4E2A;&#x9519;&#x8BEF;&#x7684;&#x4F8B;&#x5B50;&#x4E5F;&#x592A;&#x5927;&#x8DCC;&#x773C;&#x955C;&#x4E86;&#x5427;&#xFF01;redux&#x80AF;&#x5B9A;&#x662F;&#x505A;&#x4E86;&#x8FD9;&#x4E48;&#x4E00;&#x5C42;&#x8F6C;&#x6362;&#xFF0C;&#x6211;&#x5728;createStore.js&#x627E;&#x5230;&#x4E86;&#x8FD9;&#x4E48;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" if (typeof preloadedState === &apos;function&apos; &amp;&amp; typeof enhancer === &apos;undefined&apos;) {
    enhancer = preloadedState
    preloadedState = undefined
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> preloadedState === <span class="hljs-string">&apos;function&apos;</span> &amp;&amp; <span class="hljs-keyword">typeof</span> enhancer === <span class="hljs-string">&apos;undefined&apos;</span>) {
    enhancer = preloadedState
    preloadedState = <span class="hljs-literal">undefined</span>
  }</code></pre><p>&#x5F53;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;preloadedState&#x7684;&#x7C7B;&#x578B;&#x662F;Function&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5E76;&#x4E14;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;enhancer&#x672A;&#x5B9A;&#x4E49;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6B64;&#x65F6;preloadedState&#x5C06;&#x4F1A;&#x88AB;&#x8D4B;&#x503C;&#x7ED9;enhancer&#xFF0C;preloadedState&#x4F1A;&#x66FF;&#x4EE3;enhancer&#x53D8;&#x6210;undefined&#x7684;&#x3002;&#x6709;&#x4E86;&#x8FD9;&#x4E48;&#x4E00;&#x5C42;&#x8F6C;&#x6362;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5927;&#x80C6;&#x5730;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4F20;enhancer&#x4E86;&#x3002;</p><p>&#x8BF4;&#x5B8C;createStore&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x8BF4;&#x4E00;&#x4E0B;&#x51FD;&#x6570;createStore&#x6267;&#x884C;&#x5B8C;&#x4E4B;&#x540E;&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x90FD;&#x6709;&#x4EC0;&#x4E48;&#xFF1F;&#x5728;createStore.js&#x6700;&#x4E0B;&#x9762;&#x4E00;&#x884C;&#x6709;&#x8FD9;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs puppet"><code><span class="hljs-keyword">return</span> {
    dispatch,
    <span class="hljs-literal">subscribe</span>,
    getState,
    replaceReducer,
    [$<span class="hljs-variable">$observable</span>]: observable
  }</code></pre><p>&#x4ED6;&#x8FD4;&#x56DE;&#x4E86;&#x6709;&#x8FD9;&#x4E48;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5176;&#x4E2D;&#x524D;&#x4E09;&#x4E2A;&#x6700;&#x4E3A;&#x5E38;&#x7528;&#xFF0C;&#x540E;&#x9762;&#x4E24;&#x4E2A;&#x5728;&#x9879;&#x76EE;&#x57FA;&#x672C;&#x4E0A;&#x4E0D;&#x600E;&#x4E48;&#x7528;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x53BB;&#x4E00;&#x4E00;&#x5256;&#x6790;&#x3002;</p><h3 id="articleHeader10">&#x5B9A;&#x4E49;&#x7684;&#x4E00;&#x4E9B;&#x53D8;&#x91CF;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let currentState = preloadedState //&#x4ECE;&#x51FD;&#x6570;createStore&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;preloadedState&#x83B7;&#x5F97;
let currentReducer = reducer  //&#x4ECE;&#x51FD;&#x6570;createStore&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;reducer&#x83B7;&#x5F97;
let currentListeners = [] //&#x5F53;&#x524D;&#x8BA2;&#x9605;&#x8005;&#x5217;&#x8868;
let nextListeners = currentListeners //&#x65B0;&#x7684;&#x8BA2;&#x9605;&#x8005;&#x5217;&#x8868;
let isDispatching = false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">currentState</span> = preloadedState //&#x4ECE;&#x51FD;&#x6570;createStore&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;preloadedState&#x83B7;&#x5F97;
<span class="hljs-keyword">let</span> <span class="hljs-attr">currentReducer</span> = reducer  //&#x4ECE;&#x51FD;&#x6570;createStore&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;reducer&#x83B7;&#x5F97;
<span class="hljs-keyword">let</span> <span class="hljs-attr">currentListeners</span> = [] //&#x5F53;&#x524D;&#x8BA2;&#x9605;&#x8005;&#x5217;&#x8868;
<span class="hljs-keyword">let</span> <span class="hljs-attr">nextListeners</span> = currentListeners //&#x65B0;&#x7684;&#x8BA2;&#x9605;&#x8005;&#x5217;&#x8868;
<span class="hljs-keyword">let</span> <span class="hljs-attr">isDispatching</span> = <span class="hljs-literal">false</span></code></pre><p>&#x5176;&#x4E2D;&#x53D8;&#x91CF;isDispatching&#xFF0C;&#x4F5C;&#x4E3A;&#x9501;&#x6765;&#x7528;&#xFF0C;&#x6211;&#x4EEC;redux&#x662F;&#x4E00;&#x4E2A;&#x7EDF;&#x4E00;&#x7BA1;&#x7406;&#x72B6;&#x6001;&#x5BB9;&#x5668;&#xFF0C;&#x5B83;&#x8981;&#x4FDD;&#x8BC1;&#x6570;&#x636E;&#x7684;&#x4E00;&#x81F4;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x540C;&#x4E00;&#x4E2A;&#x65F6;&#x95F4;&#x91CC;&#xFF0C;&#x53EA;&#x80FD;&#x505A;&#x4E00;&#x6B21;&#x6570;&#x636E;&#x4FEE;&#x6539;&#xFF0C;&#x5982;&#x679C;&#x4E24;&#x4E2A;action&#x540C;&#x65F6;&#x89E6;&#x53D1;reducer&#x5BF9;&#x540C;&#x4E00;&#x6570;&#x636E;&#x7684;&#x4FEE;&#x6539;&#xFF0C;&#x90A3;&#x4E48;&#x5C06;&#x4F1A;&#x5E26;&#x6765;&#x5DE8;&#x5927;&#x7684;&#x707E;&#x96BE;&#x3002;&#x6240;&#x4EE5;&#x53D8;&#x91CF;isDispatching&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x9632;&#x6B62;&#x8FD9;&#x4E00;&#x70B9;&#x800C;&#x5B58;&#x5728;&#x7684;&#x3002;</p><h3 id="articleHeader11">dispatch</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        &apos;Actions must be plain objects. &apos; +
          &apos;Use custom middleware for async actions.&apos;
      )
    }

    if (typeof action.type === &apos;undefined&apos;) {
      throw new Error(
        &apos;Actions may not have an undefined &quot;type&quot; property. &apos; +
          &apos;Have you misspelled a constant?&apos;
      )
    }

    if (isDispatching) {
      throw new Error(&apos;Reducers may not dispatch actions.&apos;)
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i &lt; listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params">action</span>) </span>{
    <span class="hljs-keyword">if</span> (!isPlainObject(action)) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        <span class="hljs-string">&apos;Actions must be plain objects. &apos;</span> +
          <span class="hljs-string">&apos;Use custom middleware for async actions.&apos;</span>
      )
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action.type === <span class="hljs-string">&apos;undefined&apos;</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        <span class="hljs-string">&apos;Actions may not have an undefined &quot;type&quot; property. &apos;</span> +
          <span class="hljs-string">&apos;Have you misspelled a constant?&apos;</span>
      )
    }

    <span class="hljs-keyword">if</span> (isDispatching) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;Reducers may not dispatch actions.&apos;</span>)
    }

    <span class="hljs-keyword">try</span> {
      isDispatching = <span class="hljs-literal">true</span>
      currentState = currentReducer(currentState, action)
    } <span class="hljs-keyword">finally</span> {
      isDispatching = <span class="hljs-literal">false</span>
    }

    <span class="hljs-keyword">const</span> listeners = (currentListeners = nextListeners)
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; listeners.length; i++) {
      <span class="hljs-keyword">const</span> listener = listeners[i]
      listener()
    }

    <span class="hljs-keyword">return</span> action
  }</code></pre><p>&#x51FD;&#x6570;dispatch&#x5728;&#x51FD;&#x6570;&#x4F53;&#x4E00;&#x5F00;&#x59CB;&#x5C31;&#x8FDB;&#x884C;&#x4E86;&#x4E09;&#x6B21;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#xFF0C;&#x5206;&#x522B;&#x662F;&#x4EE5;&#x4E0B;&#x4E09;&#x4E2A;&#xFF1A;</p><ul><li><strong>&#x5224;&#x65AD;action&#x662F;&#x5426;&#x4E3A;&#x7B80;&#x5355;&#x5BF9;&#x8C61;</strong></li><li><strong>&#x5224;&#x65AD;action.type&#x662F;&#x5426;&#x5B58;&#x5728;</strong></li><li><strong>&#x5224;&#x65AD;&#x5F53;&#x524D;&#x662F;&#x5426;&#x6709;&#x6267;&#x884C;&#x5176;&#x4ED6;&#x7684;reducer&#x64CD;&#x4F5C;</strong></li></ul><p>&#x5F53;&#x524D;&#x4E09;&#x4E2A;&#x9884;&#x7F6E;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#x90FD;&#x6210;&#x7ACB;&#x65F6;&#xFF0C;&#x624D;&#x4F1A;&#x6267;&#x884C;&#x540E;&#x7EED;&#x64CD;&#x4F5C;&#xFF0C;&#x5426;&#x5219;&#x629B;&#x51FA;&#x5F02;&#x5E38;&#x3002;&#x5728;&#x6267;&#x884C;reducer&#x7684;&#x64CD;&#x4F5C;&#x7684;&#x65F6;&#x5019;&#x7528;&#x5230;&#x4E86;try-finally&#xFF0C;&#x53EF;&#x80FD;&#x5927;&#x5BB6;&#x5E73;&#x65F6;try-catch&#x7528;&#x7684;&#x6BD4;&#x8F83;&#x591A;&#xFF0C;&#x8FD9;&#x4E2A;&#x7528;&#x5230;&#x7684;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x5C11;&#x3002;&#x6267;&#x884C;&#x524D;isDispatching&#x8BBE;&#x7F6E;&#x4E3A;true&#xFF0C;&#x963B;&#x6B62;&#x540E;&#x7EED;&#x7684;action&#x8FDB;&#x6765;&#x89E6;&#x53D1;reducer&#x64CD;&#x4F5C;&#xFF0C;&#x5F97;&#x5230;&#x7684;state&#x503C;&#x8D4B;&#x503C;&#x7ED9;currentState&#xFF0C;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x518D;finally&#x91CC;&#x5C06;isDispatching&#x518D;&#x6539;&#x4E3A;false&#xFF0C;&#x5141;&#x8BB8;&#x540E;&#x7EED;&#x7684;action&#x8FDB;&#x6765;&#x89E6;&#x53D1;reducer&#x64CD;&#x4F5C;&#x3002;&#x63A5;&#x7740;&#x4E00;&#x4E00;&#x901A;&#x77E5;&#x8BA2;&#x9605;&#x8005;&#x505A;&#x6570;&#x636E;&#x66F4;&#x65B0;&#xFF0C;&#x4E0D;&#x4F20;&#x5165;&#x4EFB;&#x4F55;&#x53C2;&#x6570;&#x3002;&#x6700;&#x540E;&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x7684;action&#x3002;</p><h3 id="articleHeader12">getState</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getState() {
    if (isDispatching) {
      throw new Error(
        &apos;You may not call store.getState() while the reducer is executing. &apos; +
          &apos;The reducer has already received the state as an argument. &apos; +
          &apos;Pass it down from the top reducer instead of reading it from the store.&apos;
      )
    }

    return currentState
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs monkey"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getState</span>(</span>) {
    <span class="hljs-keyword">if</span> (isDispatching) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        <span class="hljs-comment">&apos;You may not call store.getState() while the reducer is executing. &apos; +</span>
          <span class="hljs-comment">&apos;The reducer has already received the state as an argument. &apos; +</span>
          <span class="hljs-comment">&apos;Pass it down from the top reducer instead of reading it from the store.&apos;</span>
      )
    }

    <span class="hljs-keyword">return</span> currentState
  }</code></pre><p>getState&#x76F8;&#x6BD4;&#x8F83;dispatch&#x8981;&#x7B80;&#x5355;&#x8BB8;&#x591A;,&#x8FD4;&#x56DE;currentState&#x5373;&#x53EF;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;currentState&#x5728;&#x6BCF;&#x6B21;dispatch&#x5F97;&#x65F6;&#x5019;&#x90FD;&#x4F1A;&#x5F97;&#x5230;&#x54CD;&#x5E94;&#x7684;&#x66F4;&#x65B0;&#x3002;&#x540C;&#x6837;&#x662F;&#x4E3A;&#x4E86;&#x4FDD;&#x8BC1;&#x6570;&#x636E;&#x7684;&#x4E00;&#x81F4;&#x6027;&#xFF0C;&#x5F53;&#x5728;reducer&#x64CD;&#x4F5C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x662F;&#x4E0D;&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x5F53;&#x524D;&#x7684;state&#x503C;&#x7684;&#x3002;&#x8BF4;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x60F3;&#x5230;&#x4E4B;&#x524D;&#x4E00;&#x6B21;&#x7684;&#x9762;&#x8BD5;&#x7ECF;&#x5386;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x9762;&#x8BD5;&#x5B98;&#xFF1A;&#x6267;&#x884C;createStore&#x51FD;&#x6570;&#x751F;&#x6210;&#x7684;store,&#x53EF;&#x4E0D;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x5B83;&#x7684;state&#xFF1F;

&#x6211;&#xFF1A;&#x53EF;&#x4EE5;&#x3002;&#xFF08;&#x666E;&#x7F57;&#x5927;&#x4F17;&#x7684;&#x7B2C;&#x4E00;&#x53CD;&#x5E94;&#xFF09;

&#x9762;&#x8BD5;&#x5B98;&#xFF1A;&#x4F60;&#x77E5;&#x9053;redux&#x600E;&#x4E48;&#x505A;&#x5230;&#x4E0D;&#x80FD;&#x4FEE;&#x6539;store&#x7684;state&#x5417;&#xFF1F;

&#x6211;&#xFF1A;&#x989D;......&#xFF08;&#x5904;&#x4E8E;&#x61F5;&#x903C;&#x72B6;&#x6001;&#xFF09;

&#x9762;&#x8BD5;&#x5B98;&#xFF1A;&#x5F88;&#x7B80;&#x5355;&#x554A;&#xFF01;&#x91CD;&#x5199;store&#x7684;set&#x65B9;&#x6CD5;&#x554A;&#xFF01;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>&#x9762;&#x8BD5;&#x5B98;&#xFF1A;&#x6267;&#x884C;createStore&#x51FD;&#x6570;&#x751F;&#x6210;&#x7684;store,&#x53EF;&#x4E0D;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x5B83;&#x7684;<span class="hljs-keyword">state</span>&#xFF1F;

&#x6211;&#xFF1A;&#x53EF;&#x4EE5;&#x3002;&#xFF08;&#x666E;&#x7F57;&#x5927;&#x4F17;&#x7684;&#x7B2C;&#x4E00;&#x53CD;&#x5E94;&#xFF09;

&#x9762;&#x8BD5;&#x5B98;&#xFF1A;&#x4F60;&#x77E5;&#x9053;redux&#x600E;&#x4E48;&#x505A;&#x5230;&#x4E0D;&#x80FD;&#x4FEE;&#x6539;store&#x7684;<span class="hljs-keyword">state</span>&#x5417;&#xFF1F;

&#x6211;&#xFF1A;&#x989D;......&#xFF08;&#x5904;&#x4E8E;&#x61F5;&#x903C;&#x72B6;&#x6001;&#xFF09;

&#x9762;&#x8BD5;&#x5B98;&#xFF1A;&#x5F88;&#x7B80;&#x5355;&#x554A;&#xFF01;&#x91CD;&#x5199;store&#x7684;<span class="hljs-built_in">set</span>&#x65B9;&#x6CD5;&#x554A;&#xFF01;</code></pre><p>&#x90A3;&#x4F1A;&#x6CA1;&#x770B;&#x8FC7;redux&#x7684;&#x6E90;&#x7801;&#xFF0C;&#x5C31;&#x88AB;&#x4ED6;&#x5FFD;&#x60A0;&#x4E86;&#xFF01;&#x8BFB;&#x5B8C;redux&#x6E90;&#x7801;&#x4E4B;&#x540E;&#xFF0C;&#x9760;&#xFF01;&#x8FD9;&#x5BB6;&#x4F19;&#x5C31;&#x662F;&#x4E2A;&#x9A97;&#x5B50;&#xFF01;&#x81EA;&#x5DF1;&#x6CA1;&#x8BFB;&#x8FC7;&#x6E90;&#x7801;&#x8FD8;&#x8DDF;&#x6211;&#x804A;&#x6E90;&#x7801;&#xFF0C;&#x65E0;&#x8BED;&#x4E86;&#xFF01;&#x5F53;&#x7136;&#xFF0C;&#x6211;&#x81EA;&#x5DF1;&#x4E5F;&#x6709;&#x539F;&#x56E0;&#xFF0C;&#x5B66;&#x827A;&#x4E0D;&#x7CBE;&#xFF0C;&#x88AB;&#x5FFD;&#x60A0;&#x4E86;&#x3002;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x770B;&#x4E86;&#x6E90;&#x7801;&#x4E4B;&#x540E;&#xFF0C;getState&#x51FD;&#x6570;&#x8FD4;&#x56DE;state&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x5BF9;currentState&#x505A;&#x4E00;&#x5C42;&#x62F7;&#x8D1D;&#x518D;&#x7ED9;&#x6211;&#x4EEC;&#xFF0C;&#x6240;&#x4EE5;&#x662F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x7684;&#x3002;&#x53EA;&#x662F;&#x8FD9;&#x4E48;&#x4FEE;&#x6539;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x4E0D;&#x4F1A;&#x901A;&#x77E5;&#x8BA2;&#x9605;&#x8005;&#x505A;&#x6570;&#x636E;&#x66F4;&#x65B0;&#x3002;&#x5F97;&#x51FA;&#x7684;&#x7ED3;&#x8BBA;&#x662F;&#xFF1A;</p><blockquote>store&#x901A;&#x8FC7;getState&#x5F97;&#x51FA;&#x7684;state&#x662F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x88AB;&#x66F4;&#x6539;&#x7684;&#xFF0C;&#x4F46;&#x662F;redux&#x4E0D;&#x5141;&#x8BB8;&#x8FD9;&#x4E48;&#x505A;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x6837;&#x4E0D;&#x4F1A;&#x901A;&#x77E5;&#x8BA2;&#x9605;&#x8005;&#x66F4;&#x65B0;&#x6570;&#x636E;&#x3002;</blockquote><h3 id="articleHeader13">subscribe</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function subscribe(listener) {
    if (typeof listener !== &apos;function&apos;) {
      throw new Error(&apos;Expected the listener to be a function.&apos;)
    }

    if (isDispatching) {
      throw new Error(
        &apos;You may not call store.subscribe() while the reducer is executing. &apos; +
          &apos;If you would like to be notified after the store has been updated, subscribe from a &apos; +
          &apos;component and invoke store.getState() in the callback to access the latest state. &apos; +
          &apos;See https://redux.js.org/api-reference/store#subscribe(listener) for more details.&apos;
      )
    }

    let isSubscribed = true //&#x8868;&#x793A;&#x8BE5;&#x8BA2;&#x9605;&#x8005;&#x5728;&#x8BA2;&#x9605;&#x72B6;&#x6001;&#x4E2D;&#xFF0C;true-&#x8BA2;&#x9605;&#x4E2D;&#xFF0C;false-&#x53D6;&#x6D88;&#x8BA2;&#x9605;

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      if (isDispatching) {
        throw new Error(
          &apos;You may not unsubscribe from a store listener while the reducer is executing. &apos; +
            &apos;See https://redux.js.org/api-reference/store#subscribe(listener) for more details.&apos;
        )
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs monkey"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(</span>listener) {
    <span class="hljs-keyword">if</span> (typeof listener !== <span class="hljs-comment">&apos;function&apos;) {</span>
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-comment">&apos;Expected the listener to be a function.&apos;)</span>
    }

    <span class="hljs-keyword">if</span> (isDispatching) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        <span class="hljs-comment">&apos;You may not call store.subscribe() while the reducer is executing. &apos; +</span>
          <span class="hljs-comment">&apos;If you would like to be notified after the store has been updated, subscribe from a &apos; +</span>
          <span class="hljs-comment">&apos;component and invoke store.getState() in the callback to access the latest state. &apos; +</span>
          <span class="hljs-comment">&apos;See https://redux.js.org/api-reference/store#subscribe(listener) for more details.&apos;</span>
      )
    }

    let isSubscribed = <span class="hljs-literal">true</span> //&#x8868;&#x793A;&#x8BE5;&#x8BA2;&#x9605;&#x8005;&#x5728;&#x8BA2;&#x9605;&#x72B6;&#x6001;&#x4E2D;&#xFF0C;<span class="hljs-literal">true</span>-&#x8BA2;&#x9605;&#x4E2D;&#xFF0C;<span class="hljs-literal">false</span>-&#x53D6;&#x6D88;&#x8BA2;&#x9605;

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unsubscribe</span>(</span>) {
      <span class="hljs-keyword">if</span> (!isSubscribed) {
        <span class="hljs-keyword">return</span>
      }

      <span class="hljs-keyword">if</span> (isDispatching) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
          <span class="hljs-comment">&apos;You may not unsubscribe from a store listener while the reducer is executing. &apos; +</span>
            <span class="hljs-comment">&apos;See https://redux.js.org/api-reference/store#subscribe(listener) for more details.&apos;</span>
        )
      }

      isSubscribed = <span class="hljs-literal">false</span>

      ensureCanMutateNextListeners()
      <span class="hljs-keyword">const</span> index = nextListeners.indexOf(listener)
      nextListeners.splice(index, <span class="hljs-number">1</span>)
    }
  }</code></pre><p>&#x5728;&#x6CE8;&#x518C;&#x8BA2;&#x9605;&#x8005;&#x4E4B;&#x524D;&#xFF0C;&#x505A;&#x4E86;&#x4E24;&#x4E2A;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#xFF1A;</p><ul><li><strong>&#x5224;&#x65AD;&#x76D1;&#x542C;&#x8005;&#x662F;&#x5426;&#x4E3A;&#x51FD;&#x6570;</strong></li><li><strong>&#x662F;&#x5426;&#x6709;reducer&#x6B63;&#x5728;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x4FEE;&#x6539;&#xFF08;&#x4FDD;&#x8BC1;&#x6570;&#x636E;&#x7684;&#x4E00;&#x81F4;&#x6027;&#xFF09;</strong></li></ul><p>&#x63A5;&#x4E0B;&#x6765;&#x6267;&#x884C;&#x4E86;&#x51FD;&#x6570;ensureCanMutateNextListeners&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;ensureCanMutateNextListeners&#x51FD;&#x6570;&#x7684;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x903B;&#x8F91;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ensureCanMutateNextListeners</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">if</span> (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }</code></pre><p>&#x903B;&#x8F91;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5224;&#x65AD;nextListeners&#x548C;currentListeners&#x662F;&#x5426;&#x4E3A;&#x540C;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#xFF0C;&#x8FD8;&#x8BB0;&#x5F97;dispatch&#x51FD;&#x6570;&#x4E2D;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x53E5;&#x4EE3;&#x7801;&#x4EE5;&#x53CA;&#x5B9A;&#x4E49;&#x53D8;&#x91CF;&#x65F6;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#x5417;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Function dispatch
const listeners = (currentListeners = nextListeners)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs monkey"><code>// <span class="hljs-function"><span class="hljs-keyword">Function</span> <span class="hljs-title">dispatch</span></span>
<span class="hljs-keyword">const</span> listeners = (currentListeners = nextListeners)</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9A;&#x4E49;&#x53D8;&#x91CF;
let currentListeners = []
let nextListeners = currentListeners" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>// &#x5B9A;&#x4E49;&#x53D8;&#x91CF;
<span class="hljs-keyword">let</span> <span class="hljs-attr">currentListeners</span> = []
<span class="hljs-keyword">let</span> <span class="hljs-attr">nextListeners</span> = currentListeners</code></pre><p>&#x8FD9;&#x4E24;&#x5904;&#x5C06;nextListeners&#x548C;currentListeners&#x5F15;&#x7528;&#x4E86;&#x540C;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x53E6;&#x5916;&#x5B9A;&#x4E49;&#x53D8;&#x91CF;&#x65F6;&#x4E5F;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x53E5;&#x8BDD;&#x4EE3;&#x7801;&#x3002;&#x800C;ensureCanMutateNextListeners&#x5C31;&#x662F;&#x7528;&#x6765;&#x5224;&#x65AD;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x7684;&#xFF0C;&#x5F53;nextListeners&#x548C;currentListeners&#x4E3A;&#x540C;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#x65F6;&#xFF0C;&#x5219;&#x505A;&#x4E00;&#x5C42;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x8FD9;&#x91CC;&#x7528;&#x7684;&#x5C31;&#x662F;Array.prototype.slice&#x65B9;&#x6CD5;,&#x8BE5;&#x65B9;&#x6CD5;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x8FBE;&#x5230;&#x6D45;&#x62F7;&#x8D1D;&#x7684;&#x6548;&#x679C;&#x3002;</p><p>&#x51FD;&#x6570;ensureCanMutateNextListeners&#x4F5C;&#x4E3A;&#x5904;&#x7406;&#x4E4B;&#x540E;&#xFF0C;&#x5C06;&#x65B0;&#x7684;&#x8BA2;&#x9605;&#x8005;&#x52A0;&#x5165;nextListeners&#x4E2D;&#xFF0C;&#x5E76;&#x4E14;&#x8FD4;&#x56DE;&#x53D6;&#x6D88;&#x8BA2;&#x9605;&#x7684;&#x51FD;&#x6570;unsubscribe&#x3002;&#x51FD;&#x6570;unsubscribe&#x6267;&#x884C;&#x65F6;&#xFF0C;&#x4E5F;&#x4F1A;&#x6267;&#x884C;&#x4E24;&#x4E2A;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#xFF1A;</p><ul><li><strong>&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x53D6;&#x6D88;&#x8BA2;&#x9605;&#xFF08;&#x5DF2;&#x53D6;&#x6D88;&#x7684;&#x4E0D;&#x5FC5;&#x6267;&#x884C;&#xFF09;</strong></li><li><strong>&#x662F;&#x5426;&#x6709;reducer&#x6B63;&#x5728;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x4FEE;&#x6539;&#xFF08;&#x4FDD;&#x8BC1;&#x6570;&#x636E;&#x7684;&#x4E00;&#x81F4;&#x6027;&#xFF09;</strong></li></ul><p>&#x901A;&#x8FC7;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#x4E4B;&#x540E;&#xFF0C;&#x8BB2;&#x8BE5;&#x8BA2;&#x9605;&#x8005;&#x4ECE;nextListeners&#x4E2D;&#x5220;&#x9664;&#x3002;&#x770B;&#x5230;&#x8FD9;&#x91CC;&#x53EF;&#x80FD;&#x6709;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x5BF9;currentListeners&#x548C;nextListeners&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x4E2A;&#x7591;&#x95EE;&#xFF1F;&#x51FD;&#x6570;dispatch&#x91CC;&#x9762;&#x5C06;&#x4E8C;&#x8005;&#x5408;&#x5E76;&#x6210;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#xFF0C;&#x4E3A;&#x5565;&#x8FD9;&#x91CC;&#x6709;&#x5565;&#x7ED9;&#x4ED6;&#x4FE9;&#x5206;&#x5F00;&#xFF1F;&#x76F4;&#x63A5;&#x7528;currentListeners&#x4E0D;&#x53EF;&#x4EE5;&#x5417;&#xFF1F;&#x8FD9;&#x91CC;&#x8FD9;&#x6837;&#x505A;&#x5176;&#x5B9E;&#x4E5F;&#x662F;&#x4E3A;&#x4E86;&#x6570;&#x636E;&#x7684;&#x4E00;&#x81F4;&#x6027;&#xFF0C;&#x56E0;&#x4E3A;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x79CD;&#x7684;&#x60C5;&#x51B5;&#x5B58;&#x5728;&#x3002;&#x5F53;redux&#x5728;&#x901A;&#x77E5;&#x6240;&#x6709;&#x8BA2;&#x9605;&#x8005;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6B64;&#x65F6;&#x53C8;&#x6709;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x8BA2;&#x9605;&#x8005;&#x52A0;&#x8FDB;&#x6765;&#x4E86;&#x3002;&#x5982;&#x679C;&#x53EA;&#x7528;currentListeners&#x7684;&#x8BDD;&#xFF0C;&#x5F53;&#x65B0;&#x7684;&#x8BA2;&#x9605;&#x8005;&#x63D2;&#x8FDB;&#x6765;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x4F1A;&#x6253;&#x4E71;&#x539F;&#x6709;&#x7684;&#x987A;&#x5E8F;&#xFF0C;&#x4ECE;&#x800C;&#x5F15;&#x53D1;&#x4E00;&#x4E9B;&#x4E25;&#x91CD;&#x7684;&#x95EE;&#x9898;&#x3002;</p><h3 id="articleHeader14">replaceReducer</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== &apos;function&apos;) {
      throw new Error(&apos;Expected the nextReducer to be a function.&apos;)
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.REPLACE })
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replaceReducer</span>(<span class="hljs-params">nextReducer</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> nextReducer !== <span class="hljs-string">&apos;function&apos;</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;Expected the nextReducer to be a function.&apos;</span>)
    }

    currentReducer = nextReducer
    dispatch({ <span class="hljs-attr">type</span>: ActionTypes.REPLACE })
  }</code></pre><p>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x662F;&#x7528;&#x6765;&#x66FF;&#x6362;reducer&#x7684;&#xFF0C;&#x5E73;&#x65F6;&#x9879;&#x76EE;&#x91CC;&#x57FA;&#x672C;&#x5F88;&#x96BE;&#x7528;&#x5230;&#xFF0C;replaceReducer&#x51FD;&#x6570;&#x6267;&#x884C;&#x524D;&#x4F1A;&#x505A;&#x4E00;&#x4E2A;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#xFF1A;</p><ul><li>&#x5224;&#x65AD;&#x6240;&#x4F20;reducer&#x662F;&#x5426;&#x4E3A;&#x51FD;&#x6570;</li></ul><p>&#x901A;&#x8FC7;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#x4E4B;&#x540E;&#xFF0C;&#x5C06;nextReducer&#x8D4B;&#x503C;&#x7ED9;currentReducer&#xFF0C;&#x4EE5;&#x8FBE;&#x5230;&#x66FF;&#x6362;reducer&#x6548;&#x679C;&#xFF0C;&#x5E76;&#x89E6;&#x53D1;state&#x66F4;&#x65B0;&#x64CD;&#x4F5C;&#x3002;</p><h3 id="articleHeader15">observable</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs puppet"><code>  /**
   * Interoperability point for observable/reactive libraries.
   * @<span class="hljs-keyword">returns</span> {observable} <span class="hljs-keyword">A</span> <span class="hljs-keyword">minimal</span> <span class="hljs-keyword">observable</span> <span class="hljs-keyword">of</span> <span class="hljs-keyword">state</span> <span class="hljs-keyword">changes</span>.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */</code></pre><p>&#x8FD9;&#x91CC;&#x6CA1;&#x8D34;&#x4EE3;&#x7801;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x5757;&#x4EE3;&#x7801;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x638C;&#x63E1;&#x3002;&#x8FD9;&#x4E2A;observable&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x8C03;&#x7528;&#xFF0C;&#x5373;&#x4FBF;&#x66B4;&#x9732;&#x51FA;&#x6765;&#x6211;&#x4EEC;&#x4E5F;&#x529E;&#x6CD5;&#x4F7F;&#x7528;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5C31;&#x8DF3;&#x8FC7;&#x8FD9;&#x5757;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x53BB;&#x4F5C;&#x8005;&#x7ED9;&#x7684;github&#x7684;&#x5730;&#x5740;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#x3002;</p><hr><p>&#x8BB2;&#x5B8C;&#x8FD9;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x4E4B;&#x540E;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x7EC6;&#x8282;&#x9700;&#x8981;&#x8BF4;&#x4E00;&#x4E0B;&#xFF0C;createStore&#x51FD;&#x6570;&#x4F53;&#x91CC;&#x6709;&#x8FD9;&#x6837;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch({ type: ActionTypes.INIT })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">dispatch</span>({ <span class="hljs-attribute">type</span>: ActionTypes.INIT })</code></pre><p>&#x4E3A;&#x5565;&#x8981;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#xFF1F;&#x539F;&#x56E0;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x6CA1;&#x6709;&#x8FD9;&#x6837;&#x4EE3;&#x7801;&#xFF0C;&#x6B64;&#x65F6;currentState&#x5C31;&#x662F;undefined&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x6211;&#x8BF4;&#x6211;&#x4EEC;&#x6CA1;&#x6709;&#x9ED8;&#x8BA4;&#x503C;&#x4E86;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;dispatch&#x4E00;&#x4E2A;action&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x65E0;&#x6CD5;&#x5728;currentState&#x57FA;&#x7840;&#x4E0A;&#x505A;&#x66F4;&#x65B0;&#x3002;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x62FF;&#x5230;&#x6240;&#x6709;reducer&#x9ED8;&#x8BA4;&#x7684;state&#xFF0C;&#x8FD9;&#x6837;&#x540E;&#x7EED;&#x7684;dispatch&#x4E00;&#x4E2A;action&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x624D;&#x53EF;&#x4EE5;&#x66F4;&#x65B0;&#x6211;&#x4EEC;&#x7684;state&#x3002;</p><h2 id="articleHeader16">combineReducers.js</h2><p>&#x8FD9;&#x4E2A;js&#x5BF9;&#x5E94;&#x7740;redux&#x91CC;&#x7684;combineReducers&#x65B9;&#x6CD5;&#xFF0C;&#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x5408;&#x5E76;&#x591A;&#x4E2A;reducer&#x3002;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5148;&#x7ED9;&#x4E00;&#x4E2A;&#x7A7A;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x4E00;&#x6B65;&#x6B65;&#x5730;&#x6839;&#x636E;&#x8FD8;&#x539F;&#x6E90;&#x7801;&#xFF0C;&#x8FD9;&#x6837;&#x5927;&#x5BB6;&#x53EF;&#x80FD;&#x7406;&#x89E3;&#x5F97;&#x66F4;&#x4E3A;&#x900F;&#x5F7B;&#x70B9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//reducers  Object&#x7C7B;&#x578B;  &#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#x90FD;&#x8981;&#x662F;function
export default function combineReducers(reducers) {
    ....
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//reducers  Object&#x7C7B;&#x578B;  &#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#x90FD;&#x8981;&#x662F;function</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combineReducers</span>(<span class="hljs-params">reducers</span>) </span>{
    ....
}</code></pre><h3 id="articleHeader17">&#x7B2C;&#x4E00;&#x6B65;:&#x6D45;&#x62F7;&#x8D1D;reducers</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  for (let i = 0; i &lt; reducerKeys.length; i++) {
    const key = reducerKeys[i]

    if (process.env.NODE_ENV !== &apos;production&apos;) {
      if (typeof reducers[key] === &apos;undefined&apos;) {
        warning(`No reducer provided for key &quot;${key}&quot;`)
      }
    }

    if (typeof reducers[key] === &apos;function&apos;) {
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combineReducers</span>(<span class="hljs-params">reducers</span>) </span>{
  <span class="hljs-keyword">const</span> reducerKeys = <span class="hljs-built_in">Object</span>.keys(reducers)
  <span class="hljs-keyword">const</span> finalReducers = {}
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; reducerKeys.length; i++) {
    <span class="hljs-keyword">const</span> key = reducerKeys[i]

    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span>) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> reducers[key] === <span class="hljs-string">&apos;undefined&apos;</span>) {
        warning(<span class="hljs-string">`No reducer provided for key &quot;<span class="hljs-subst">${key}</span>&quot;`</span>)
      }
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> reducers[key] === <span class="hljs-string">&apos;function&apos;</span>) {
      finalReducers[key] = reducers[key]
    }
  }
  <span class="hljs-keyword">const</span> finalReducerKeys = <span class="hljs-built_in">Object</span>.keys(finalReducers)
}</code></pre><p>&#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;finalReducers&#x548C;finalReducerKeys&#xFF0C;&#x5206;&#x522B;&#x7528;&#x6765;&#x62F7;&#x8D1D;reducers&#x548C;&#x5176;&#x5C5E;&#x6027;&#x3002;&#x5148;&#x7528;Object.keys&#x65B9;&#x6CD5;&#x62FF;&#x5230;reducers&#x6240;&#x6709;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x7136;&#x540E;&#x8FDB;&#x884C;for&#x5FAA;&#x73AF;&#xFF0C;&#x6BCF;&#x4E00;&#x9879;&#x53EF;&#x6839;&#x636E;&#x5176;&#x5C5E;&#x6027;&#x62FF;&#x5230;&#x5BF9;&#x5E94;&#x7684;reducer&#xFF0C;&#x5E76;&#x6D45;&#x62F7;&#x8D1D;&#x5230;finalReducers&#x4E2D;&#xFF0C;&#x4F46;&#x662F;&#x524D;&#x63D0;&#x6761;&#x4EF6;&#x662F;&#x6BCF;&#x4E2A;reducer&#x7684;&#x7C7B;&#x578B;&#x5FC5;&#x987B;&#x662F;Function&#xFF0C;&#x4E0D;&#x7136;&#x4F1A;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;&#x4E0D;&#x62F7;&#x8D1D;&#x3002;</p><h3 id="articleHeader18">&#x7B2C;&#x4E8C;&#x6B65;&#xFF1A;&#x68C0;&#x6D4B;finalReducers&#x91CC;&#x7684;&#x6BCF;&#x4E2A;reducer&#x662F;&#x5426;&#x90FD;&#x6709;&#x9ED8;&#x8BA4;&#x8FD4;&#x56DE;&#x503C;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(key =&gt; {
    const reducer = reducers[key]
    const initialState = reducer(undefined, { type: ActionTypes.INIT })

    if (typeof initialState === &apos;undefined&apos;) {
      throw new Error(
        `Reducer &quot;${key}&quot; returned undefined during initialization. ` +
          `If the state passed to the reducer is undefined, you must ` +
          `explicitly return the initial state. The initial state may ` +
          `not be undefined. If you don&apos;t want to set a value for this reducer, ` +
          `you can use null instead of undefined.`
      )
    }

    const type =
      &apos;@@redux/PROBE_UNKNOWN_ACTION_&apos; +
      Math.random()
        .toString(36)
        .substring(7)
        .split(&apos;&apos;)
        .join(&apos;.&apos;)
    if (typeof reducer(undefined, { type }) === &apos;undefined&apos;) {
      throw new Error(
        `Reducer &quot;${key}&quot; returned undefined when probed with a random type. ` +
          `Don&apos;t try to handle ${
            ActionTypes.INIT
          } or other actions in &quot;redux/*&quot; ` +
          `namespace. They are considered private. Instead, you must return the ` +
          `current state for any unknown actions, unless it is undefined, ` +
          `in which case you must return the initial state, regardless of the ` +
          `action type. The initial state may not be undefined, but can be null.`
      )
    }
  })
}

export default function combineReducers(reducers) {
    //&#x7701;&#x7565;&#x7B2C;&#x4E00;&#x6B65;&#x7684;&#x4EE3;&#x7801;
    ......
    let shapeAssertionError
    try {
        assertReducerShape(finalReducers)
    } catch (e) {
        shapeAssertionError = e
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">assertReducerShape</span>(<span class="hljs-params">reducers</span>) </span>{
  <span class="hljs-built_in">Object</span>.keys(reducers).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> reducer = reducers[key]
    <span class="hljs-keyword">const</span> initialState = reducer(<span class="hljs-literal">undefined</span>, { <span class="hljs-keyword">type</span>: ActionTypes.INIT })

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> initialState === <span class="hljs-string">&apos;undefined&apos;</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        <span class="hljs-string">`Reducer &quot;<span class="hljs-subst">${key}</span>&quot; returned undefined during initialization. `</span> +
          <span class="hljs-string">`If the state passed to the reducer is undefined, you must `</span> +
          <span class="hljs-string">`explicitly return the initial state. The initial state may `</span> +
          <span class="hljs-string">`not be undefined. If you don&apos;t want to set a value for this reducer, `</span> +
          <span class="hljs-string">`you can use null instead of undefined.`</span>
      )
    }

    <span class="hljs-keyword">const</span> <span class="hljs-keyword">type</span> =
      <span class="hljs-string">&apos;@@redux/PROBE_UNKNOWN_ACTION_&apos;</span> +
      <span class="hljs-built_in">Math</span>.random()
        .toString(<span class="hljs-number">36</span>)
        .substring(<span class="hljs-number">7</span>)
        .split(<span class="hljs-string">&apos;&apos;</span>)
        .join(<span class="hljs-string">&apos;.&apos;</span>)
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> reducer(<span class="hljs-literal">undefined</span>, { <span class="hljs-keyword">type</span> }) === <span class="hljs-string">&apos;undefined&apos;</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        <span class="hljs-string">`Reducer &quot;<span class="hljs-subst">${key}</span>&quot; returned undefined when probed with a random type. `</span> +
          <span class="hljs-string">`Don&apos;t try to handle <span class="hljs-subst">${
            ActionTypes.INIT
          }</span> or other actions in &quot;redux/*&quot; `</span> +
          <span class="hljs-string">`namespace. They are considered private. Instead, you must return the `</span> +
          <span class="hljs-string">`current state for any unknown actions, unless it is undefined, `</span> +
          <span class="hljs-string">`in which case you must return the initial state, regardless of the `</span> +
          <span class="hljs-string">`action type. The initial state may not be undefined, but can be null.`</span>
      )
    }
  })
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combineReducers</span>(<span class="hljs-params">reducers</span>) </span>{
    <span class="hljs-comment">//&#x7701;&#x7565;&#x7B2C;&#x4E00;&#x6B65;&#x7684;&#x4EE3;&#x7801;</span>
    ......
    <span class="hljs-keyword">let</span> shapeAssertionError
    <span class="hljs-keyword">try</span> {
        assertReducerShape(finalReducers)
    } <span class="hljs-keyword">catch</span> (e) {
        shapeAssertionError = e
    }
}</code></pre><p>assertReducerShape&#x65B9;&#x6CD5;&#x4E3B;&#x8981;&#x68C0;&#x6D4B;&#x4E24;&#x70B9;&#xFF1A;</p><ul><li>&#x4E0D;&#x80FD;&#x5360;&#x7528;&lt;redux/*&gt;&#x7684;&#x547D;&#x540D;&#x7A7A;&#x95F4;</li><li>&#x5982;&#x679C;&#x9047;&#x5230;&#x672A;&#x77E5;&#x7684;action&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x8981;&#x7528;&#x9ED8;&#x8BA4;&#x8FD4;&#x56DE;&#x503C;</li></ul><p>&#x5982;&#x679C;&#x4F20;&#x5165;type&#x4E3A; <strong>@@redux/INIT&lt;&#x968F;&#x673A;&#x503C;&gt;</strong> &#x7684;action&#xFF0C;&#x8FD4;&#x56DE;undefined&#xFF0C;&#x8BF4;&#x660E;&#x6CA1;&#x6709;&#x5BF9;&#x672A;<br>&#x77E5;&#x7684;action&#x7684;&#x7C7B;&#x578B;&#x505A;&#x54CD;&#x5E94;&#xFF0C;&#x9700;&#x8981;&#x52A0;&#x9ED8;&#x8BA4;&#x503C;&#x3002;&#x5982;&#x679C;&#x5BF9;&#x5E94;type&#x4E3A; <strong>@@redux/INIT&lt;&#x968F;&#x673A;&#x503C;&gt;</strong> &#x7684;action&#x8FD4;&#x56DE;&#x4E0D;&#x4E3A;undefined,&#x4F46;&#x662F;&#x5374;&#x5BF9;&#x5E94;type&#x4E3A; <strong>@@redux/PROBE_UNKNOWN_ACTION_&lt;&#x968F;&#x673A;&#x503C;&gt;</strong> &#x8FD4;&#x56DE;&#x4E3A;undefined&#xFF0C;&#x8BF4;&#x660E;&#x5360;&#x7528;&#x4E86; &lt;redux/*&gt; &#x547D;&#x540D;&#x7A7A;&#x95F4;&#x3002;&#x6574;&#x4E2A;&#x903B;&#x8F91;&#x76F8;&#x5BF9;&#x7B80;&#x5355;&#xFF0C;&#x597D;&#x597D;&#x81EA;&#x5DF1;&#x68B3;&#x7406;&#x4E00;&#x4E0B;&#x3002;</p><h3 id="articleHeader19">&#x7B2C;&#x4E09;&#x6B65;&#xFF1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x4E8E;&#x4EE3;&#x7406;&#x6240;&#x6709;&#x7684;reducer</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
export default function combineReducers(reducers) {
    //&#x7701;&#x7565;&#x7B2C;&#x4E00;&#x6B65;&#x548C;&#x7B2C;&#x4E8C;&#x6B65;&#x7684;&#x4EE3;&#x7801;
    ......
    let unexpectedKeyCache
        if (process.env.NODE_ENV !== &apos;production&apos;) {
        unexpectedKeyCache = {}
    }
    return function combination(state = {}, action) {
        if (shapeAssertionError) {
            throw shapeAssertionError
        }

        if (process.env.NODE_ENV !== &apos;production&apos;) {
            const warningMessage = getUnexpectedStateShapeWarningMessage(
                state,
                finalReducers,
                action,
                unexpectedKeyCache
            )
            if (warningMessage) {
                warning(warningMessage)
            }
        }

        let hasChanged = false
        const nextState = {}
        for (let i = 0; i &lt; finalReducerKeys.length; i++) {
            const key = finalReducerKeys[i]
            const reducer = finalReducers[key]
            const previousStateForKey = state[key]
            const nextStateForKey = reducer(previousStateForKey, action)
            if (typeof nextStateForKey === &apos;undefined&apos;) {
            const errorMessage = getUndefinedStateErrorMessage(key, action)
                throw new Error(errorMessage)
            }
        nextState[key] = nextStateForKey
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
        }
        return hasChanged ? nextState : state
    }    
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combineReducers</span>(<span class="hljs-params">reducers</span>) </span>{
    <span class="hljs-comment">//&#x7701;&#x7565;&#x7B2C;&#x4E00;&#x6B65;&#x548C;&#x7B2C;&#x4E8C;&#x6B65;&#x7684;&#x4EE3;&#x7801;</span>
    ......
    <span class="hljs-keyword">let</span> unexpectedKeyCache
        <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span>) {
        unexpectedKeyCache = {}
    }
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">combination</span>(<span class="hljs-params">state = {}, action</span>) </span>{
        <span class="hljs-keyword">if</span> (shapeAssertionError) {
            <span class="hljs-keyword">throw</span> shapeAssertionError
        }

        <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span>) {
            <span class="hljs-keyword">const</span> warningMessage = getUnexpectedStateShapeWarningMessage(
                state,
                finalReducers,
                action,
                unexpectedKeyCache
            )
            <span class="hljs-keyword">if</span> (warningMessage) {
                warning(warningMessage)
            }
        }

        <span class="hljs-keyword">let</span> hasChanged = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">const</span> nextState = {}
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; finalReducerKeys.length; i++) {
            <span class="hljs-keyword">const</span> key = finalReducerKeys[i]
            <span class="hljs-keyword">const</span> reducer = finalReducers[key]
            <span class="hljs-keyword">const</span> previousStateForKey = state[key]
            <span class="hljs-keyword">const</span> nextStateForKey = reducer(previousStateForKey, action)
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> nextStateForKey === <span class="hljs-string">&apos;undefined&apos;</span>) {
            <span class="hljs-keyword">const</span> errorMessage = getUndefinedStateErrorMessage(key, action)
                <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(errorMessage)
            }
        nextState[key] = nextStateForKey
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
        }
        <span class="hljs-keyword">return</span> hasChanged ? <span class="hljs-attribute">nextState</span> : state
    }    
}</code></pre><p>&#x9996;&#x5148;&#x5BF9;&#x4F20;&#x5165;&#x7684;state&#x7528;getUnexpectedStateShapeWarningMessage&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x5F02;&#x5E38;&#x68C0;&#x6D4B;&#xFF0C;&#x627E;&#x51FA;state&#x91CC;&#x9762;&#x6CA1;&#x6709;&#x5BF9;&#x5E94;reducer&#x7684;key&#xFF0C;&#x5E76;&#x63D0;&#x793A;&#x5F00;&#x53D1;&#x8005;&#x505A;&#x8C03;&#x6574;&#x3002;&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x8DF3;&#x5230;getUnexpectedStateShapeWarningMessage&#x91CC;&#xFF0C;&#x770B;&#x5176;&#x5B9E;&#x73B0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getUnexpectedStateShapeWarningMessage(
  inputState,
  reducers,
  action,
  unexpectedKeyCache
) {
  const reducerKeys = Object.keys(reducers)
  const argumentName =
    action &amp;&amp; action.type === ActionTypes.INIT
      ? &apos;preloadedState argument passed to createStore&apos;
      : &apos;previous state received by the reducer&apos;

  if (reducerKeys.length === 0) {
    return (
      &apos;Store does not have a valid reducer. Make sure the argument passed &apos; +
      &apos;to combineReducers is an object whose values are reducers.&apos;
    )
  }

  if (!isPlainObject(inputState)) {
    return (
      `The ${argumentName} has unexpected type of &quot;` +
      {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] +
      `&quot;. Expected argument to be an object with the following ` +
      `keys: &quot;${reducerKeys.join(&apos;&quot;, &quot;&apos;)}&quot;`
    )
  }

  const unexpectedKeys = Object.keys(inputState).filter(
    key =&gt; !reducers.hasOwnProperty(key) &amp;&amp; !unexpectedKeyCache[key]
  )

  unexpectedKeys.forEach(key =&gt; {
    unexpectedKeyCache[key] = true
  })

  if (action &amp;&amp; action.type === ActionTypes.REPLACE) return

  if (unexpectedKeys.length &gt; 0) {
    return (
      `Unexpected ${unexpectedKeys.length &gt; 1 ? &apos;keys&apos; : &apos;key&apos;} ` +
      `&quot;${unexpectedKeys.join(&apos;&quot;, &quot;&apos;)}&quot; found in ${argumentName}. ` +
      `Expected to find one of the known reducer keys instead: ` +
      `&quot;${reducerKeys.join(&apos;&quot;, &quot;&apos;)}&quot;. Unexpected keys will be ignored.`
    )
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUnexpectedStateShapeWarningMessage</span>(<span class="hljs-params">
  inputState,
  reducers,
  action,
  unexpectedKeyCache
</span>) </span>{
  <span class="hljs-keyword">const</span> reducerKeys = <span class="hljs-built_in">Object</span>.keys(reducers)
  <span class="hljs-keyword">const</span> argumentName =
    action &amp;&amp; action.type === ActionTypes.INIT
      ? <span class="hljs-string">&apos;preloadedState argument passed to createStore&apos;</span>
      : <span class="hljs-string">&apos;previous state received by the reducer&apos;</span>

  <span class="hljs-keyword">if</span> (reducerKeys.length === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> (
      <span class="hljs-string">&apos;Store does not have a valid reducer. Make sure the argument passed &apos;</span> +
      <span class="hljs-string">&apos;to combineReducers is an object whose values are reducers.&apos;</span>
    )
  }

  <span class="hljs-keyword">if</span> (!isPlainObject(inputState)) {
    <span class="hljs-keyword">return</span> (
      <span class="hljs-string">`The <span class="hljs-subst">${argumentName}</span> has unexpected type of &quot;`</span> +
      {}.toString.call(inputState).match(<span class="hljs-regexp">/\s([a-z|A-Z]+)/</span>)[<span class="hljs-number">1</span>] +
      <span class="hljs-string">`&quot;. Expected argument to be an object with the following `</span> +
      <span class="hljs-string">`keys: &quot;<span class="hljs-subst">${reducerKeys.join(<span class="hljs-string">&apos;&quot;, &quot;&apos;</span>)}</span>&quot;`</span>
    )
  }

  <span class="hljs-keyword">const</span> unexpectedKeys = <span class="hljs-built_in">Object</span>.keys(inputState).filter(
    <span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> !reducers.hasOwnProperty(key) &amp;&amp; !unexpectedKeyCache[key]
  )

  unexpectedKeys.forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
    unexpectedKeyCache[key] = <span class="hljs-literal">true</span>
  })

  <span class="hljs-keyword">if</span> (action &amp;&amp; action.type === ActionTypes.REPLACE) <span class="hljs-keyword">return</span>

  <span class="hljs-keyword">if</span> (unexpectedKeys.length &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> (
      <span class="hljs-string">`Unexpected <span class="hljs-subst">${unexpectedKeys.length &gt; <span class="hljs-number">1</span> ? <span class="hljs-string">&apos;keys&apos;</span> : <span class="hljs-string">&apos;key&apos;</span>}</span> `</span> +
      <span class="hljs-string">`&quot;<span class="hljs-subst">${unexpectedKeys.join(<span class="hljs-string">&apos;&quot;, &quot;&apos;</span>)}</span>&quot; found in <span class="hljs-subst">${argumentName}</span>. `</span> +
      <span class="hljs-string">`Expected to find one of the known reducer keys instead: `</span> +
      <span class="hljs-string">`&quot;<span class="hljs-subst">${reducerKeys.join(<span class="hljs-string">&apos;&quot;, &quot;&apos;</span>)}</span>&quot;. Unexpected keys will be ignored.`</span>
    )
  }
}</code></pre><p>getUnexpectedStateShapeWarningMessage&#x63A5;&#x6536;&#x56DB;&#x4E2A;&#x53C2;&#x6570; inputState&#xFF08;state&#xFF09;&#x3001;reducers&#xFF08;finalReducers&#xFF09;&#x3001;action&#xFF08;action&#xFF09;&#x3001;unexpectedKeyCache&#xFF08;unexpectedKeyCache&#xFF09;&#xFF0C;&#x8FD9;&#x91CC;&#x8981;&#x8BF4;&#x4E00;&#x4E0B;unexpectedKeyCache&#x662F;&#x4E0A;&#x4E00;&#x6B21;&#x68C0;&#x6D4B;inputState&#x5F97;&#x5230;&#x7684;&#x5176;&#x91CC;&#x9762;&#x6CA1;&#x6709;&#x5BF9;&#x5E94;&#x7684;reducer&#x96C6;&#x5408;&#x91CC;&#x7684;&#x5F02;&#x5E38;key&#x7684;&#x96C6;&#x5408;&#x3002;&#x6574;&#x4E2A;&#x903B;&#x8F91;&#x5982;&#x4E0B;&#xFF1A;</p><ol><li><strong>&#x524D;&#x7F6E;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#xFF0C;&#x4FDD;&#x8BC1;reducers&#x96C6;&#x5408;&#x4E0D;&#x4E3A;{}&#x4EE5;&#x53CA;inputState&#x4E3A;&#x7B80;&#x5355;&#x5BF9;&#x8C61;</strong></li><li><strong>&#x627E;&#x51FA;inputState&#x91CC;&#x6709;&#x7684;key&#x4F46;&#x662F; reducers&#x96C6;&#x5408;&#x91CC;&#x6CA1;&#x6709;key</strong></li><li><strong>&#x5982;&#x679C;&#x662F;&#x66FF;&#x6362;reducer&#x7684;action,&#x8DF3;&#x8FC7;&#x7B2C;&#x56DB;&#x6B65;&#xFF0C;&#x4E0D;&#x6253;&#x5370;&#x5F02;&#x5E38;&#x4FE1;&#x606F;</strong></li><li><strong>&#x5C06;&#x6240;&#x6709;&#x5F02;&#x5E38;&#x7684;key&#x6253;&#x5370;&#x51FA;&#x6765;</strong></li></ol><p>getUnexpectedStateShapeWarningMessage&#x5206;&#x6790;&#x5B8C;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x63A5;&#x7740;&#x770B;&#x540E;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let hasChanged = false
    const nextState = {}
    for (let i = 0; i &lt; finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === &apos;undefined&apos;) {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code>    let hasChanged = <span class="hljs-keyword">false</span>
    <span class="hljs-keyword">const</span> nextState = {}
    <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>; i &lt; finalReducerKeys.length; i++) {
      <span class="hljs-keyword">const</span> <span class="hljs-built_in">key</span> = finalReducerKeys[i]
      <span class="hljs-keyword">const</span> reducer = finalReducers[<span class="hljs-built_in">key</span>]
      <span class="hljs-keyword">const</span> previousStateForKey = state[<span class="hljs-built_in">key</span>]
      <span class="hljs-keyword">const</span> nextStateForKey = reducer(previousStateForKey, action)
      <span class="hljs-keyword">if</span> (typeof nextStateForKey === <span class="hljs-string">&apos;undefined&apos;</span>) {
        <span class="hljs-keyword">const</span> errorMessage = getUndefinedStateErrorMessage(<span class="hljs-built_in">key</span>, action)
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(errorMessage)
      }
      nextState[<span class="hljs-built_in">key</span>] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    <span class="hljs-keyword">return</span> hasChanged ? nextState : state</code></pre><p>&#x9996;&#x5148;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;hasChanged&#x53D8;&#x91CF;&#x7528;&#x6765;&#x8868;&#x793A;state&#x662F;&#x5426;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x904D;&#x5386;reducers&#x96C6;&#x5408;,&#x5C06;&#x6BCF;&#x4E2A;reducer&#x5BF9;&#x5E94;&#x7684;&#x539F;state&#x4F20;&#x5165;&#x5176;&#x4E2D;&#xFF0C;&#x5F97;&#x51FA;&#x5176;&#x5BF9;&#x5E94;&#x7684;&#x65B0;&#x7684;state&#x3002;&#x7D27;&#x63A5;&#x7740;&#x540E;&#x9762;&#x5BF9;&#x65B0;&#x7684;state&#x505A;&#x4E86;&#x4E00;&#x5C42;&#x672A;&#x5B9A;&#x4E49;&#x7684;&#x6821;&#x9A8C;&#xFF0C;&#x51FD;&#x6570;getUndefinedStateErrorMessage&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getUndefinedStateErrorMessage(key, action) {
  const actionType = action &amp;&amp; action.type
  const actionDescription =
    (actionType &amp;&amp; `action &quot;${String(actionType)}&quot;`) || &apos;an action&apos;

  return (
    `Given ${actionDescription}, reducer &quot;${key}&quot; returned undefined. ` +
    `To ignore an action, you must explicitly return the previous state. ` +
    `If you want this reducer to hold no value, you can return null instead of undefined.`
  )
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livescript"><code><span class="hljs-keyword">function</span> getUndefinedStateErrorMessage(key, action) {
  <span class="hljs-keyword">const</span> actionType = action &amp;&amp; action.type
  <span class="hljs-keyword">const</span> actionDescription =
    (actionType &amp;&amp; `action <span class="hljs-string">&quot;${String(actionType)}&quot;</span>`) || <span class="hljs-string">&apos;an action&apos;</span>

  <span class="hljs-keyword">return</span> (
    `Given ${actionDescription}, reducer <span class="hljs-string">&quot;${key}&quot;</span> returned <span class="hljs-literal">undefined</span>. ` +
    `To ignore an action, you must explicitly <span class="hljs-keyword">return</span> the previous state. ` +
    `If you want <span class="hljs-keyword">this</span> reducer <span class="hljs-keyword">to</span> hold <span class="hljs-literal">no</span> value, you can <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span> instead <span class="hljs-keyword">of</span> <span class="hljs-literal">undefined</span>.`
  )
}</code></pre><p>&#x903B;&#x8F91;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x4EC5;&#x4EC5;&#x505A;&#x4E86;&#x4E00;&#x4E0B;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x7684;&#x62FC;&#x63A5;&#x3002;&#x672A;&#x5B9A;&#x4E49;&#x6821;&#x9A8C;&#x5B8C;&#x4E86;&#x4E4B;&#x540E;&#xFF0C;&#x4F1A;&#x8DDF;&#x539F;state&#x4F5C;&#x5BF9;&#x6BD4;&#xFF0C;&#x5F97;&#x51FA;&#x5176;&#x662F;&#x5426;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x3002;&#x6700;&#x540E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x8FD4;&#x56DE;nextState,&#x5426;&#x5219;&#x8FD4;&#x56DE;state&#x3002;</p><h2 id="articleHeader20">compose.js</h2><p>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x5C06;&#x591A;&#x4E2A;&#x51FD;&#x6570;&#x8FDE;&#x63A5;&#x8D77;&#x6765;&#xFF0C;&#x5C06;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4F5C;&#x4E3A;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x4F20;&#x53C2;&#x8FDB;&#x884C;&#x8BA1;&#x7B97;&#xFF0C;&#x5F97;&#x51FA;&#x6700;&#x7EC8;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;&#x4EE5;&#x70F9;&#x996A;&#x4E3A;&#x4F8B;&#xFF0C;&#x6BCF;&#x5230;&#x6599;&#x7406;&#x90FD;&#x662F;&#x4ECE;&#x6700;&#x521D;&#x7684;&#x98DF;&#x6750;&#x7ECF;&#x8FC7;&#x4E00;&#x9053;&#x53C8;&#x4E00;&#x9053;&#x7684;&#x5DE5;&#x5E8F;&#x5904;&#x7406;&#x624D;&#x5F97;&#x5230;&#x7684;&#x3002;compose&#x7684;&#x7528;&#x5904;&#x5C31;&#x53EF;&#x4EE5;&#x5C06;&#x8FD9;&#x4E9B;&#x70F9;&#x996A;&#x5DE5;&#x5E8F;&#x8FDE;&#x63A5;&#x5230;&#x4E00;&#x8D77;&#xFF0C;&#x4F60;&#x53EA;&#x9700;&#x8981;&#x63D0;&#x4F9B;&#x98DF;&#x6750;&#xFF0C;&#x5B83;&#x4F1A;&#x81EA;&#x52A8;&#x5E2E;&#x4F60;&#x7ECF;&#x8FC7;&#x4E00;&#x9053;&#x53C8;&#x4E00;&#x9053;&#x7684;&#x5DE5;&#x5E8F;&#x5904;&#x7406;&#xFF0C;&#x70F9;&#x996A;&#x51FA;&#x8FD9;&#x9053;&#x6599;&#x7406;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg =&gt; arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) =&gt; (...args) =&gt; a(b(...args)))
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>export <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span><span class="hljs-params">(<span class="hljs-rest_arg">...funcs</span>)</span> </span>{
  <span class="hljs-keyword">if</span> (funcs.length === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> arg =&gt; arg
  }

  <span class="hljs-keyword">if</span> (funcs.length === <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> funcs[<span class="hljs-number">0</span>]
  }

  <span class="hljs-keyword">return</span> funcs.reduce((a, b) =&gt; (...args) =&gt; a(b(...args)))
}</code></pre><p>&#x4E0A;&#x9762;&#x662F;es6&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x53EF;&#x80FD;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x5E76;&#x4E0D;&#x662F;&#x5F88;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x5927;&#x5BB6;&#x7406;&#x89E3;&#xFF0C;&#x6211;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x6210;es5&#x4EE3;&#x7801;&#x53BB;&#x505A;&#x8BB2;&#x89E3;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compose() {
  var _len = arguments.length;
  var funcs = [];
  for (var i = 0; i &lt; _len; i++) {
    funcs[i] = arguments[i];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> _len = <span class="hljs-built_in">arguments</span>.length;
  <span class="hljs-keyword">var</span> funcs = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; _len; i++) {
    funcs[i] = <span class="hljs-built_in">arguments</span>[i];
  }

  <span class="hljs-keyword">if</span> (funcs.length === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">arg</span>) </span>{
      <span class="hljs-keyword">return</span> arg;
    };
  }

  <span class="hljs-keyword">if</span> (funcs.length === <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> funcs[<span class="hljs-number">0</span>];
  }

  <span class="hljs-keyword">return</span> funcs.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> a(b.apply(<span class="hljs-literal">undefined</span>, <span class="hljs-built_in">arguments</span>));
    };
  });
}</code></pre><p>&#x68B3;&#x7406;&#x4E00;&#x4E0B;&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#xFF0C;&#x5927;&#x81F4;&#x5206;&#x4E3A;&#x8FD9;&#x4E48;&#x51E0;&#x6B65;&#xFF1A;</p><ol><li>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x6570;&#x7EC4;funcs&#xFF0C;&#x5C06;arguments&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x4E00;&#x4E00;&#x62F7;&#x8D1D;&#x5230;funcs&#x4E2D;&#x53BB;</li><li>&#x5F53;funcs&#x7684;&#x957F;&#x5EA6;&#x4E3A;0&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x4F20;&#x5165;&#x4EC0;&#x4E48;&#x5C31;&#x8FD4;&#x56DE;&#x4EC0;&#x4E48;&#x7684;&#x51FD;&#x6570;</li><li>&#x5F53;funcs&#x7684;&#x957F;&#x5EA6;&#x4E3A;1&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;funcs&#x7B2C;0&#x9879;&#x5BF9;&#x5E94;&#x7684;&#x51FD;&#x6570;</li><li>&#x5F53;funcs&#x7684;&#x957F;&#x5EA6;&#x5927;&#x4E8E;1&#x65F6;&#xFF0C;&#x8C03;&#x7528;Array.prototype.reduce&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x6574;&#x5408;</li></ol><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x6B63;&#x597D;&#x590D;&#x4E60;&#x4E00;&#x4E0B;&#x6570;&#x7EC4;&#x7684;reduce&#x65B9;&#x6CD5;&#xFF0C;&#x51FD;&#x6570;reduce&#x63A5;&#x53D7;&#x4E0B;&#x9762;&#x56DB;&#x4E2A;&#x53C2;&#x6570;</p><ul><li>total &#x521D;&#x59CB;&#x503C;&#x6216;&#x8005;&#x8BA1;&#x7B97;&#x5F97;&#x51FA;&#x7684;&#x8FD4;&#x56DE;&#x503C;</li><li>current &#x5F53;&#x524D;&#x5143;&#x7D20;</li><li>index &#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x4E0B;&#x6807;</li><li>array &#x5F53;&#x524D;&#x5143;&#x7D20;&#x6240;&#x5728;&#x7684;&#x6570;&#x7EC4;</li></ul><p><strong>&#x793A;&#x4F8B;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const array = [1,2,3,4,5,6,7,8,9,10];
const totalValue=array.reduce((total,current)=&gt;{
  return total+current
}); //55" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs smali"><code>const<span class="hljs-built_in"> array </span>= [1,2,3,4,5,6,7,8,9,10];<span class="hljs-built_in">
const </span>totalValue=array.reduce((total,current)=&gt;{
 <span class="hljs-built_in"> return </span>total+current
}); //55</code></pre><p>&#x8FD9;&#x91CC;&#x7684;compose&#x6709;&#x4E2A;&#x7279;&#x70B9;&#xFF0C;&#x4ED6;&#x4E0D;&#x662F;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x800C;&#x662F;&#x4ECE;&#x53F3;&#x5230;&#x5DE6;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x770B;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const value=compose(function(value){
  return value+1;
},function(value){
  return value*2;
},function(value){
  return value-3;
})(2);
console.log(value);//(2-3)*2+1=-1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs fortran"><code>const <span class="hljs-keyword">value</span>=compose(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span>+<span class="hljs-number">1</span>;
},<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span>*<span class="hljs-number">2</span>;
},<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span>-<span class="hljs-number">3</span>;
})(<span class="hljs-number">2</span>);
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">value</span>);//(<span class="hljs-number">2</span>-<span class="hljs-number">3</span>)*<span class="hljs-number">2</span>+<span class="hljs-number">1</span>=-<span class="hljs-number">1</span></code></pre><p>&#x5982;&#x679C;&#x60F3;&#x8981;&#x5176;&#x4ECE;&#x5DE6;&#x5411;&#x53F3;&#x6267;&#x884C;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x505A;&#x4E00;&#x4E0B;&#x987A;&#x5E8F;&#x7684;&#x98A0;&#x5012;&#x5373;&#x53EF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="===&gt; &#x8F6C;&#x6362;&#x524D; return a(b.apply(undefined, arguments));
===&gt; &#x8F6C;&#x6362;&#x540E; return b(a.apply(undefined, arguments));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>==<span class="hljs-function">=&gt;</span> &#x8F6C;&#x6362;&#x524D; <span class="hljs-keyword">return</span> a(b.apply(<span class="hljs-literal">undefined</span>, arguments));
==<span class="hljs-function">=&gt;</span> &#x8F6C;&#x6362;&#x540E; <span class="hljs-keyword">return</span> b(a.apply(<span class="hljs-literal">undefined</span>, arguments));</code></pre><h2 id="articleHeader21">applyMiddleware.js</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function applyMiddleware(...middlewares) {
  return createStore =&gt; (...args) =&gt; {
    const store = createStore(...args)
    let dispatch = () =&gt; {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) =&gt; dispatch(...args)
    }
    const chain = middlewares.map(middleware =&gt; middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>export <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMiddleware</span><span class="hljs-params">(<span class="hljs-rest_arg">...middlewares</span>)</span> </span>{
  <span class="hljs-keyword">return</span> createStore =&gt; (...args) =&gt; {
    <span class="hljs-keyword">const</span> store = createStore(...args)
    let dispatch = () =&gt; {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(
        `Dispatching <span class="hljs-keyword">while</span> constructing your middleware <span class="hljs-keyword">is</span> not allowed. ` +
          `Other middleware would not be applied to <span class="hljs-keyword">this</span> dispatch.`
      )
    }

    <span class="hljs-keyword">const</span> middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) =&gt; dispatch(...args)
    }
    <span class="hljs-keyword">const</span> chain = middlewares.map(middleware =&gt; middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    <span class="hljs-keyword">return</span> {
      ...store,
      dispatch
    }
  }
}</code></pre><p>&#x524D;&#x9762;&#x6211;&#x4EEC;&#x8BB2;enhancer&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x63D0;&#x5230;&#x8FC7;&#x8FD9;&#x4E2A;applyMiddleware&#xFF0C;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5C06;&#x4E8C;&#x8005;&#x7684;&#x683C;&#x5F0F;&#x5BF9;&#x6BD4;&#x770B;&#x4E00;&#x4E0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// enhancer
 function enhancer(createStore) {
    return (reducer,preloadedState) =&gt; {
         //&#x903B;&#x8F91;&#x4EE3;&#x7801;
        .......
    }
 }
//applyMiddleware
function //applyMiddleware(...middlewares) {
    return createStore =&gt; (...args) =&gt; {
        //&#x903B;&#x8F91;&#x4EE3;&#x7801;
        ....... 
    }
 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// enhancer</span>
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enhancer</span>(<span class="hljs-params">createStore</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">reducer,preloadedState</span>) =&gt;</span> {
         <span class="hljs-comment">//&#x903B;&#x8F91;&#x4EE3;&#x7801;</span>
        .......
    }
 }
<span class="hljs-comment">//applyMiddleware</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> //<span class="hljs-title">applyMiddleware</span>(<span class="hljs-params">...middlewares</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">createStore</span> =&gt;</span> (...args) =&gt; {
        <span class="hljs-comment">//&#x903B;&#x8F91;&#x4EE3;&#x7801;</span>
        ....... 
    }
 }</code></pre><p>&#x901A;&#x8FC7;&#x4E8C;&#x8005;&#x7684;&#x5BF9;&#x6BD4;&#xFF0C;&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#x51FD;&#x6570;applyMiddleware&#x7684;&#x8FD4;&#x56DE;&#x5C31;&#x662F;&#x4E00;&#x4E2A;enhancer&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x518D;&#x770B;&#x5176;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x903B;&#x8F91;&#xFF1A;</p><ol><li>&#x901A;&#x8FC7;createStore&#x65B9;&#x6CD5;&#x521B;&#x5EFA;&#x51FA;&#x4E00;&#x4E2A;store</li><li>&#x5B9A;&#x4E00;&#x4E2A;dispatch&#xFF0C;&#x5982;&#x679C;&#x5728;&#x4E2D;&#x95F4;&#x4EF6;&#x6784;&#x9020;&#x8FC7;&#x7A0B;&#x4E2D;&#x8C03;&#x7528;&#xFF0C;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#x63D0;&#x793A;</li><li>&#x5B9A;&#x4E49;middlewareAPI&#xFF0C;&#x6709;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;getState&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x662F;dispatch&#xFF0C;&#x5C06;&#x5176;&#x4F5C;&#x4E3A;&#x4E2D;&#x95F4;&#x4EF6;&#x8C03;&#x7528;&#x7684;store&#x7684;&#x6865;&#x63A5;</li><li>middlewares&#x8C03;&#x7528;Array.prototype.map&#x8FDB;&#x884C;&#x6539;&#x9020;&#xFF0C;&#x5B58;&#x653E;&#x5728;chain</li><li>&#x7528;compose&#x6574;&#x5408;chain&#x6570;&#x7EC4;&#xFF0C;&#x5E76;&#x8D4B;&#x503C;&#x7ED9;dispatch</li><li>&#x5C06;&#x65B0;&#x7684;dispatch&#x66FF;&#x6362;&#x539F;&#x5148;&#x7684;store.dispatch</li></ol><p>&#x770B;&#x5B8C;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x53EF;&#x80FD;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x8FD8;&#x662F;&#x4E00;&#x5934;&#x96FE;&#x6C34;&#xFF0C;&#x7384;&#x5B66;&#x7684;&#x5F88;&#xFF01;&#x4E0D;&#x8FC7;&#x6CA1;&#x5173;&#x7CFB;&#xFF0C;&#x6211;&#x4EEC;&#x4EE5;redux-thunk&#x4E3A;&#x4F8B;&#xFF0C;&#x6A21;&#x62DF;&#x4E00;&#x4E0B;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5148;&#x628A;redux-thunk&#x7684;&#x6E90;&#x7801;&#x8D34;&#x51FA;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) =&gt; next =&gt; action =&gt; {
    if (typeof action === &apos;function&apos;) {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createThunkMiddleware</span>(<span class="hljs-params">extraArgument</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch, getState }</span>) =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">&apos;function&apos;</span>) {
      <span class="hljs-keyword">return</span> action(dispatch, getState, extraArgument);
    }

    <span class="hljs-keyword">return</span> next(action);
  };
}

<span class="hljs-keyword">const</span> thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> thunk;</code></pre><p>&#x54C8;&#x54C8;&#x54C8;&#xFF01;&#x770B;&#x5B8C;redux-thunk&#x7684;&#x6E90;&#x7801;&#x4E4B;&#x540E;&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x5954;&#x6E83;&#xFF0C;&#x51E0;&#x5343;star&#x7684;&#x9879;&#x76EE;&#x5C45;&#x7136;&#x5C31;&#x51E0;&#x884C;&#x4EE3;&#x7801;&#xFF0C;&#x987F;&#x65F6;&#x4E09;&#x89C2;&#x5C31;&#x6BC1;&#x4E86;&#x6709;&#x6728;&#x6709;&#xFF1F;&#x5176;&#x5B9E;&#x6E90;&#x7801;&#x6CA1;&#x6709;&#x5927;&#x5BB6;&#x60F3;&#x8C61;&#x7684;&#x90A3;&#x4E48;&#x590D;&#x6742;&#xFF0C;&#x4E0D;&#x8981;&#x4E00;&#x542C;&#x6E90;&#x7801;&#x5C31;&#x614C;&#x3002;&#x7A33;&#x4F4F;&#xFF01;&#x6211;&#x4EEC;&#x80FD;&#x8D62;&#xFF01;&#x6839;&#x636E;redux-thunk&#x7684;&#x6E90;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x62FF;&#x5230;&#x7684;thunk&#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const thunk = ({ dispatch, getState })=&gt;{
    return next =&gt; action =&gt; {
        if (typeof action === &apos;function&apos;) {
            return action(dispatch, getState);
        }
        return next(action);
    };
 }  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-keyword">const</span> thunk = <span class="hljs-function">(<span class="hljs-params">{ dispatch, getState }</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">next</span> =&gt;</span> action =&gt; {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">&apos;function&apos;</span>) {
            <span class="hljs-keyword">return</span> action(dispatch, getState);
        }
        <span class="hljs-keyword">return</span> next(action);
    };
 }  </code></pre><p>&#x6211;&#x4EEC;&#x7ECF;&#x8FC7;applyMiddleware&#x5904;&#x7406;&#x4E00;&#x4E0B;&#xFF0C;&#x5230;&#x7B2C;&#x56DB;&#x6B65;&#x7684;&#x65F6;&#x5019;&#xFF0C;chain&#x6570;&#x7EC4;&#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const newDispatch;
const middlewareAPI={
  getState:store.getState,
  dispatch: (...args) =&gt; newDispatch(...args)
}
const { dispatch, getState } = middlewareAPI;
const  fun1 = (next)=&gt;{
  return action =&gt; {
    if (typeof action === &apos;function&apos;) {
        return action(dispatch, getState);
    }
    return next(action);
  }
}
const chain = [fun1]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> newDispatch;
<span class="hljs-keyword">const</span> middlewareAPI={
  <span class="hljs-attr">getState</span>:store.getState,
  <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> newDispatch(...args)
}
<span class="hljs-keyword">const</span> { dispatch, getState } = middlewareAPI;
<span class="hljs-keyword">const</span>  fun1 = <span class="hljs-function">(<span class="hljs-params">next</span>)=&gt;</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">&apos;function&apos;</span>) {
        <span class="hljs-keyword">return</span> action(dispatch, getState);
    }
    <span class="hljs-keyword">return</span> next(action);
  }
}
<span class="hljs-keyword">const</span> chain = [fun1]</code></pre><p>compose&#x6574;&#x5408;&#x5B8C;chain&#x6570;&#x7EC4;&#x4E4B;&#x540E;&#x5F97;&#x5230;&#x7684;&#x65B0;&#x7684;dispatch&#x7684;&#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const newDispatch;
const middlewareAPI={
  getState:store.getState,
  dispatch: (...args) =&gt; newDispatch(...args)
}
const { dispatch, getState } = middlewareAPI;
const next = store.dispatch;
newDispatch = action =&gt;{
  if (typeof action === &apos;function&apos;) {
    return action(dispatch, getState);
  }
  return next(action);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> newDispatch;
<span class="hljs-keyword">const</span> middlewareAPI={
  <span class="hljs-attr">getState</span>:store.getState,
  <span class="hljs-attr">dispatch</span>: <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> newDispatch(...args)
}
<span class="hljs-keyword">const</span> { dispatch, getState } = middlewareAPI;
<span class="hljs-keyword">const</span> next = store.dispatch;
newDispatch = <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">&apos;function&apos;</span>) {
    <span class="hljs-keyword">return</span> action(dispatch, getState);
  }
  <span class="hljs-keyword">return</span> next(action);
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7ED3;&#x5408;redux-thunk&#x7684;&#x4F8B;&#x5B50;&#x6765;&#x6A21;&#x62DF;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeASandwichWithSecretSauce(forPerson) {
  return function (dispatch) {
    return fetchSecretSauce().then(
      sauce =&gt; dispatch(makeASandwich(forPerson, sauce)),
      error =&gt; dispatch(apologize(&apos;The Sandwich Shop&apos;, forPerson, error))
    );
  };
}
// store.dispatch&#x5C31;&#x7B49;&#x4EF7;&#x4E8E;newDispatch
store.dispatch(makeASandwichWithSecretSauce(&apos;Me&apos;))

====&gt; &#x8F6C;&#x6362;
const forPerson = &apos;Me&apos;;
const action = (dispatch)=&gt;{
    return fetchSecretSauce().then(
      sauce =&gt; dispatch(makeASandwich(forPerson, sauce)),
      error =&gt; dispatch(apologize(&apos;The Sandwich Shop&apos;, forPerson, error))
    );
}
newDispatch()

===&gt; typeof action === &apos;function&apos; &#x6210;&#x7ACB;&#x65F6;

 ((dispatch)=&gt;{
    return fetchSecretSauce().then(
      sauce =&gt; dispatch(makeASandwich(forPerson, sauce)),
      error =&gt; dispatch(apologize(&apos;The Sandwich Shop&apos;, forPerson, error))
    );
  })( (...args) =&gt; newDispatch(...args), getState)

====&gt; &#x8BA1;&#x7B97;&#x8FD0;&#x884C;&#x7ED3;&#x679C;
const forPerson = &apos;Me&apos;;
const dispatch = (...args) =&gt; newDispatch(...args) &#xFF1B;
fetchSecretSauce().then(
      sauce =&gt; dispatch(makeASandwich(forPerson, sauce)),
      error =&gt; dispatch(apologize(&apos;The Sandwich Shop&apos;, forPerson, error))
);
// &#x5176;&#x4E2D;&#xFF1A;
function fetchSecretSauce() {
  return fetch(&apos;https://www.google.com/search?q=secret+sauce&apos;);
}
function makeASandwich(forPerson, secretSauce) {
  return {
    type: &apos;MAKE_SANDWICH&apos;,
    forPerson,
    secretSauce
  };
}

function apologize(fromPerson, toPerson, error) {
  return {
    type: &apos;APOLOGIZE&apos;,
    fromPerson,
    toPerson,
    error
  };
}
====&gt; &#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x53EA;&#x8BA1;&#x7B97;Promise.resolve&#x7684;&#x7ED3;&#x679C;,&#x5E76;&#x4E14;&#x5047;&#x8BBE;fetchSecretSauce&#x8FD4;&#x56DE;&#x503C;&#x4E3A;&apos;666&apos;,&#x5373;sauce=&apos;666&apos;

const forPerson = &apos;Me&apos;;
const dispatch = (...args) =&gt; newDispatch(...args) &#xFF1B;
dispatch({
    type: &apos;MAKE_SANDWICH&apos;,
    &apos;Me&apos;,
    &apos;666&apos;
})
====&gt; &#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x5BF9;&#x6BD4;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x6B21;&#x8F6C;&#x6362;&#x4E00;&#x4E0B;

const action = {
    type: &apos;MAKE_SANDWICH&apos;,
    &apos;Me&apos;,
    &apos;666&apos;
};

const next = store.dispatch

const newDispatch = action =&gt;{
  if (typeof action === &apos;function&apos;) {
    return action(dispatch, getState);
  }
  return next(action);
}

newDispatch(action)

====&gt; &#x6700;&#x7EC8;&#x7ED3;&#x679C;
store.dispatch({
    type: &apos;MAKE_SANDWICH&apos;,
    &apos;Me&apos;,
    &apos;666&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeASandwichWithSecretSauce</span>(<span class="hljs-params">forPerson</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dispatch</span>) </span>{
    <span class="hljs-keyword">return</span> fetchSecretSauce().then(
      <span class="hljs-function"><span class="hljs-params">sauce</span> =&gt;</span> dispatch(makeASandwich(forPerson, sauce)),
      <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> dispatch(apologize(<span class="hljs-string">&apos;The Sandwich Shop&apos;</span>, forPerson, error))
    );
  };
}
<span class="hljs-comment">// store.dispatch&#x5C31;&#x7B49;&#x4EF7;&#x4E8E;newDispatch</span>
store.dispatch(makeASandwichWithSecretSauce(<span class="hljs-string">&apos;Me&apos;</span>))

====&gt; &#x8F6C;&#x6362;
<span class="hljs-keyword">const</span> forPerson = <span class="hljs-string">&apos;Me&apos;</span>;
<span class="hljs-keyword">const</span> action = <span class="hljs-function">(<span class="hljs-params">dispatch</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> fetchSecretSauce().then(
      <span class="hljs-function"><span class="hljs-params">sauce</span> =&gt;</span> dispatch(makeASandwich(forPerson, sauce)),
      <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> dispatch(apologize(<span class="hljs-string">&apos;The Sandwich Shop&apos;</span>, forPerson, error))
    );
}
newDispatch()

===&gt; <span class="hljs-keyword">typeof</span> action === <span class="hljs-string">&apos;function&apos;</span> &#x6210;&#x7ACB;&#x65F6;

 (<span class="hljs-function">(<span class="hljs-params">dispatch</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> fetchSecretSauce().then(
      <span class="hljs-function"><span class="hljs-params">sauce</span> =&gt;</span> dispatch(makeASandwich(forPerson, sauce)),
      <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> dispatch(apologize(<span class="hljs-string">&apos;The Sandwich Shop&apos;</span>, forPerson, error))
    );
  })( <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> newDispatch(...args), getState)

====&gt; &#x8BA1;&#x7B97;&#x8FD0;&#x884C;&#x7ED3;&#x679C;
<span class="hljs-keyword">const</span> forPerson = <span class="hljs-string">&apos;Me&apos;</span>;
<span class="hljs-keyword">const</span> dispatch = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> newDispatch(...args) &#xFF1B;
fetchSecretSauce().then(
      <span class="hljs-function"><span class="hljs-params">sauce</span> =&gt;</span> dispatch(makeASandwich(forPerson, sauce)),
      <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> dispatch(apologize(<span class="hljs-string">&apos;The Sandwich Shop&apos;</span>, forPerson, error))
);
<span class="hljs-comment">// &#x5176;&#x4E2D;&#xFF1A;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchSecretSauce</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">&apos;https://www.google.com/search?q=secret+sauce&apos;</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeASandwich</span>(<span class="hljs-params">forPerson, secretSauce</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-keyword">type</span>: <span class="hljs-string">&apos;MAKE_SANDWICH&apos;</span>,
    forPerson,
    secretSauce
  };
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">apologize</span>(<span class="hljs-params">fromPerson, toPerson, error</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-keyword">type</span>: <span class="hljs-string">&apos;APOLOGIZE&apos;</span>,
    fromPerson,
    toPerson,
    error
  };
}
====&gt; &#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x53EA;&#x8BA1;&#x7B97;<span class="hljs-built_in">Promise</span>.resolve&#x7684;&#x7ED3;&#x679C;,&#x5E76;&#x4E14;&#x5047;&#x8BBE;fetchSecretSauce&#x8FD4;&#x56DE;&#x503C;&#x4E3A;<span class="hljs-string">&apos;666&apos;</span>,&#x5373;sauce=<span class="hljs-string">&apos;666&apos;</span>

<span class="hljs-keyword">const</span> forPerson = <span class="hljs-string">&apos;Me&apos;</span>;
<span class="hljs-keyword">const</span> dispatch = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> newDispatch(...args) &#xFF1B;
dispatch({
    <span class="hljs-keyword">type</span>: <span class="hljs-string">&apos;MAKE_SANDWICH&apos;</span>,
    <span class="hljs-string">&apos;Me&apos;</span>,
    <span class="hljs-string">&apos;666&apos;</span>
})
====&gt; &#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x5BF9;&#x6BD4;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x6B21;&#x8F6C;&#x6362;&#x4E00;&#x4E0B;

<span class="hljs-keyword">const</span> action = {
    <span class="hljs-keyword">type</span>: <span class="hljs-string">&apos;MAKE_SANDWICH&apos;</span>,
    <span class="hljs-string">&apos;Me&apos;</span>,
    <span class="hljs-string">&apos;666&apos;</span>
};

<span class="hljs-keyword">const</span> next = store.dispatch

<span class="hljs-keyword">const</span> newDispatch = <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">&apos;function&apos;</span>) {
    <span class="hljs-keyword">return</span> action(dispatch, getState);
  }
  <span class="hljs-keyword">return</span> next(action);
}

newDispatch(action)

====&gt; &#x6700;&#x7EC8;&#x7ED3;&#x679C;
store.dispatch({
    <span class="hljs-keyword">type</span>: <span class="hljs-string">&apos;MAKE_SANDWICH&apos;</span>,
    <span class="hljs-string">&apos;Me&apos;</span>,
    <span class="hljs-string">&apos;666&apos;</span>
});</code></pre><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;redux-thunk&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#xFF0C;&#x7B2C;&#x4E00;&#x6B21;&#x770B;&#x80AF;&#x80FD;&#x4F9D;&#x65E7;&#x4F1A;&#x5F88;&#x61F5;&#xFF0C;&#x540E;&#x9762;&#x53EF;&#x4EE5;&#x8D70;&#x4E00;&#x904D;&#xFF0C;&#x63A8;&#x5BFC;&#x4E00;&#x4E0B;&#x52A0;&#x6DF1;&#x81EA;&#x5DF1;&#x7684;&#x7406;&#x89E3;&#x3002;</p><h2 id="articleHeader22">bindActionCreators.js</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === &apos;function&apos;) {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== &apos;object&apos; || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? &apos;null&apos; : typeof actionCreators
      }. ` +
        `Did you write &quot;import ActionCreators from&quot; instead of &quot;import * as ActionCreators from&quot;?`
    )
  }

  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i &lt; keys.length; i++) {
    const key = keys[i]
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === &apos;function&apos;) {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindActionCreators</span>(<span class="hljs-params">actionCreators, dispatch</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> actionCreators === <span class="hljs-string">&apos;function&apos;</span>) {
    <span class="hljs-keyword">return</span> bindActionCreator(actionCreators, dispatch)
  }

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> actionCreators !== <span class="hljs-string">&apos;object&apos;</span> || actionCreators === <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
      <span class="hljs-string">`bindActionCreators expected an object or a function, instead received <span class="hljs-subst">${
        actionCreators === <span class="hljs-literal">null</span> ? <span class="hljs-string">&apos;null&apos;</span> : <span class="hljs-keyword">typeof</span> actionCreators
      }</span>. `</span> +
        <span class="hljs-string">`Did you write &quot;import ActionCreators from&quot; instead of &quot;import * as ActionCreators from&quot;?`</span>
    )
  }

  <span class="hljs-keyword">const</span> keys = <span class="hljs-built_in">Object</span>.keys(actionCreators)
  <span class="hljs-keyword">const</span> boundActionCreators = {}
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
    <span class="hljs-keyword">const</span> key = keys[i]
    <span class="hljs-keyword">const</span> actionCreator = actionCreators[key]
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> actionCreator === <span class="hljs-string">&apos;function&apos;</span>) {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  <span class="hljs-keyword">return</span> boundActionCreators
}</code></pre><p>bindActionCreators&#x9488;&#x5BF9;&#x4E8E;&#x4E09;&#x79CD;&#x60C5;&#x51B5;&#x6709;&#x4E09;&#x79CD;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6839;&#x636E;&#x6BCF;&#x79CD;&#x60C5;&#x51B5;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x53BB;&#x5206;&#x6790;&#x3002;&#xFF08;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x7406;&#x89E3;&#xFF0C;&#x6211;&#x4EEC;&#x9009;&#x62E9;&#x5728;&#x65E0;&#x96C6;&#x6210;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x60C5;&#x51B5;&#xFF09;</p><h3 id="articleHeader23">typeof actionCreators === &apos;function&apos;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}
const actionFun=bindActionCreator(actionCreators, dispatch)

===&gt; &#x6574;&#x5408;&#x4E00;&#x4E0B;

const fun1 = actionCreators;
const dispatch= stror.dispatch;
const actionFun=function () {
    return dispatch(fun1.apply(this, arguments))
 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindActionCreator</span>(<span class="hljs-params">actionCreator, dispatch</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> dispatch(actionCreator.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>))
  }
}
<span class="hljs-keyword">const</span> actionFun=bindActionCreator(actionCreators, dispatch)

===&gt; &#x6574;&#x5408;&#x4E00;&#x4E0B;

<span class="hljs-keyword">const</span> fun1 = actionCreators;
<span class="hljs-keyword">const</span> dispatch= stror.dispatch;
<span class="hljs-keyword">const</span> actionFun=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> dispatch(fun1.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>))
 }</code></pre><p>&#x6839;&#x636E;&#x4E0A;&#x9762;&#x7684;&#x63A8;&#x5BFC;&#xFF0C;&#x5F53;&#x53D8;&#x91CF;actionCreators&#x7684;&#x7C7B;&#x578B;&#x4E3A;Function&#x65F6;&#xFF0C;actionCreators&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;action&#x3002;</p><h3 id="articleHeader24">typeof actionCreators !== &apos;object&apos; || actionCreators === null</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? &apos;null&apos; : typeof actionCreators
      }. ` +
        `Did you write &quot;import ActionCreators from&quot; instead of &quot;import * as ActionCreators from&quot;?`
    )" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code> <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(
      `<span class="javascript">bindActionCreators expected an object or a <span class="hljs-function"><span class="hljs-keyword">function</span>, <span class="hljs-title">instead</span> <span class="hljs-title">received</span> <span class="hljs-title">$</span></span>{
        actionCreators === <span class="hljs-literal">null</span> ? <span class="hljs-string">&apos;null&apos;</span> : <span class="hljs-keyword">typeof</span> actionCreators
      }. </span>` +
        `<span class="javascript">Did you write <span class="hljs-string">&quot;import ActionCreators from&quot;</span> instead <span class="hljs-keyword">of</span> <span class="hljs-string">&quot;import * as ActionCreators from&quot;</span>?</span>`
    )</code></pre><p>&#x63D0;&#x793A;&#x5F00;&#x53D1;&#x8005;actionCreators&#x7C7B;&#x578B;&#x9519;&#x8BEF;&#xFF0C;&#x5E94;&#x8BE5;&#x662F;&#x4E00;&#x4E2A;&#x975E;&#x7A7A;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x662F;&#x51FD;&#x6570;&#x3002;</p><h3 id="articleHeader25">&#x9ED8;&#x8BA4;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i &lt; keys.length; i++) {
    const key = keys[i]
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === &apos;function&apos;) {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code> <span class="hljs-keyword">const</span> keys = <span class="hljs-keyword">Object</span>.keys(actionCreators)
  <span class="hljs-keyword">const</span> boundActionCreators = {}
  <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">key</span> = keys[i]
    <span class="hljs-keyword">const</span> actionCreator = actionCreators[<span class="hljs-built_in">key</span>]
    <span class="hljs-keyword">if</span> (typeof actionCreator === <span class="hljs-string">&apos;function&apos;</span>) {
      boundActionCreators[<span class="hljs-built_in">key</span>] = bindActionCreator(actionCreator, dispatch)
    }
  }
  <span class="hljs-keyword">return</span> boundActionCreators</code></pre><p>&#x901A;&#x8FC7;&#x548C;&#x7B2C;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#x5BF9;&#x6BD4;&#x53D1;&#x73B0;&#xFF0C;&#x5F53;actionCreators&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x90FD;&#x6267;&#x884C;&#x4E00;&#x6B21;&#x7B2C;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#x7684;&#x64CD;&#x4F5C;&#x3002;&#x6362;&#x53E5;&#x8BDD;&#x8BF4;&#xFF0C;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x662F;&#x7B2C;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#x7684;&#x96C6;&#x5408;&#x3002;</p><hr><p>&#x4EE5;&#x4E0A;&#x662F;&#x5BF9;bindActionCreators&#x7684;&#x5256;&#x6790;&#xFF0C;&#x53EF;&#x80FD;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x5BF9;&#x8FD9;&#x4E2A;&#x8FD8;&#x662F;&#x4E0D;&#x591F;&#x7406;&#x89E3;&#xFF0C;&#x4E0D;&#x8FC7;&#x6CA1;&#x6709;&#x5173;&#x7CFB;&#xFF0C;&#x53EA;&#x8981;&#x77E5;&#x9053;bindActionCreators&#x5E72;&#x4E86;&#x5565;&#x5C31;&#x884C;&#x3002;bindActionCreators&#x662F;&#x9700;&#x8981;&#x7ED3;&#x5408;react-redux&#x4E00;&#x8D77;&#x4F7F;&#x7528;&#x7684;&#xFF0C;&#x7531;&#x4E8E;&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#x6CA1;&#x6709;&#x8BB2;&#x89E3;react-redux&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4E0D;&#x5BF9;bindActionCreators&#x505A;&#x66F4;&#x6DF1;&#x5165;&#x7684;&#x8BB2;&#x89E3;&#x3002;&#x4E0B;&#x7BC7;&#x6587;&#x7AE0;&#x8BB2;react-redux&#xFF0C;&#x4F1A;&#x518D;&#x6B21;&#x63D0;&#x5230;bindActionCreators&#x3002;</p><h1 id="articleHeader26">&#x7ED3;&#x8BED;</h1><p>&#x5230;&#x8FD9;&#x91CC;&#x6574;&#x4E2A;redux&#x7684;&#x6E90;&#x7801;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5256;&#x6790;&#x5B8C;&#x4E86;&#xFF0C;&#x6574;&#x4E2A;redux&#x4EE3;&#x7801;&#x91CF;&#x4E0D;&#x662F;&#x5F88;&#x5927;&#xFF0C;&#x4F46;&#x662F;&#x91CC;&#x9762;&#x7684;&#x4E1C;&#x897F;&#x8FD8;&#x662F;&#x5F88;&#x591A;&#x7684;&#xFF0C;&#x903B;&#x8F91;&#x76F8;&#x5BF9;&#x6765;&#x8BF4;&#x6709;&#x70B9;&#x7ED5;&#x3002;&#x4E0D;&#x8FC7;&#x6CA1;&#x5173;&#x7CFB;&#xFF0C;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x662F;&#x770B;&#x4E86;&#x597D;&#x51E0;&#x6B21;&#x90FD;&#x770B;&#x4E0D;&#x61C2;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x90A3;&#x5C31;&#x518D;&#x591A;&#x770B;&#x51E0;&#x6B21;&#x561B;&#xFF01;&#x53E6;&#x5916;&#x518D;&#x591A;&#x4E00;&#x5634;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x5FEB;&#x8BFB;&#x63D0;&#x9AD8;&#x81EA;&#x5DF1;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#xFF0C;&#x6211;&#x4E2A;&#x4EBA;&#x662F;&#x5F3A;&#x70C8;&#x63A8;&#x8350;&#x770B;&#x6E90;&#x7801;&#x7684;&#x3002;&#x6B63;&#x6240;&#x8C13;&#x201C;&#x8FD1;&#x6731;&#x8005;&#x8D64;&#xFF0C;&#x8FD1;&#x58A8;&#x8005;&#x9ED1;&#x201D;&#xFF0C;&#x591A;&#x770B;&#x770B;&#x5927;&#x795E;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5BF9;&#x81EA;&#x5DF1;&#x7684;&#x4EE3;&#x7801;&#x4E66;&#x5199;&#x3001;&#x4EE3;&#x7801;&#x903B;&#x8F91;&#x3001;&#x77E5;&#x8BC6;&#x70B9;&#x67E5;&#x7F3A;&#x8865;&#x6F0F;&#x7B49;&#x7B49;&#x65B9;&#x9762;&#x90FD;&#x662F;&#x5F88;&#x5927;&#x5E2E;&#x52A9;&#x7684;&#x3002;&#x5C31;&#x62FF;&#x6211;&#x81EA;&#x5DF1;&#x6765;&#x8BF4;&#xFF0C;&#x6211;&#x6BCF;&#x6B21;&#x9605;&#x8BFB;&#x5B8C;&#x4E00;&#x7BC7;&#x6E90;&#x7801;&#x4E4B;&#x540E;&#xFF0C;&#x90FD;&#x53D7;&#x76CA;&#x532A;&#x6D45;&#x3002;&#x53EF;&#x80FD;&#x7B2C;&#x4E00;&#x6B21;&#x770B;&#x6E90;&#x7801;&#xFF0C;&#x6709;&#x7740;&#x8BF8;&#x591A;&#x7684;&#x4E0D;&#x9002;&#x5E94;&#xFF0C;&#x6BD5;&#x7ADF;&#x4E07;&#x4E8B;&#x5F00;&#x5934;&#x96BE;&#xFF0C;&#x5982;&#x679C;&#x5F3A;&#x8FEB;&#x81EA;&#x5DF1;&#x5B8C;&#x6210;&#x7B2C;&#x4E00;&#x6B21;&#x7684;&#x6E90;&#x7801;&#x9605;&#x8BFB;&#xFF0C;&#x90A3;&#x5F80;&#x540E;&#x7684;&#x6E90;&#x7801;&#x9605;&#x8BFB;&#x5C06;&#x4F1A;&#x8D8A;&#x6765;&#x8D8A;&#x8F7B;&#x677E;&#xFF0C;&#x5BF9;&#x81EA;&#x5DF1;&#x7684;&#x63D0;&#x5347;&#x4E5F;&#x5C31;&#x8D8A;&#x6765;&#x8D8A;&#x5FEB;&#x3002;&#x5404;&#x4F4D;&#x9A9A;&#x5E74;&#x4EEC;&#xFF0C;&#x64B8;&#x8D77;&#x8896;&#x5B50;&#x52A0;&#x6CB9;&#x5E72;&#x5427;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我的源码阅读之路：redux源码剖析

## 原文链接
[https://segmentfault.com/a/1190000016460366](https://segmentfault.com/a/1190000016460366)

