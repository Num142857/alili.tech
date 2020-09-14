---
title: '一个基于vue和element-ui的树形穿梭框组件' 
date: 2018-11-24 2:30:10
hidden: true
slug: xtfzzro18y8
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">el-tree-transfer</h1><h2 id="articleHeader1">&#x7B80;&#x4ECB;</h2><p>&#x56E0;&#x4E3A;&#x516C;&#x53F8;&#x4E1A;&#x52A1;&#x4F7F;&#x7528;vue&#x6846;&#x67B6;&#xFF0C;ui&#x5E93;&#x4F7F;&#x7528;&#x7684;element-ui&#x3002;&#x5728;&#x5E02;&#x9762;&#x4E0A;&#x627E;&#x5230;&#x4E00;&#x4E2A;&#x597D;&#x7528;&#x7684;vue&#x6811;&#x5F62;&#x7A7F;&#x68AD;&#x6846;&#x7EC4;&#x4EF6;&#x90FD;&#x5F88;&#x96BE;&#xFF0C;&#x53C8;&#x4E0D;&#x60F3;&#x4EC5;&#x4EC5;&#x56E0;&#x4E3A;&#x4E00;&#x4E2A;&#x7A7F;&#x68AD;&#x6846;&#x5728;element-ui&#x4E4B;&#x5916;&#x5F15;&#x5165;&#x5176;&#x4ED6;&#x91CD;&#x91CF;&#x7EA7;&#x63D2;&#x4EF6;&#xFF0C;&#x56E0;&#x6B64;&#x5C31;&#x6709;&#x4E86;el-tree-transfer&#x3002;&#x8F7B;&#x91CF;&#xFF0C;&#x6613;&#x7528;&#xFF0C;&#x65E0;&#x9700;&#x6295;&#x5165;&#x5176;&#x4ED6;&#x5B66;&#x4E60;&#x6210;&#x672C;&#x3002;</p><p>el-tree-fransfer&#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;VUE&#x548C;element-ui&#x7684;&#x6811;&#x5F62;&#x7A7F;&#x68AD;&#x6846;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;&#x524D;&#x8BF7;&#x786E;&#x8BA4;&#x5DF2;&#x7ECF;&#x5F15;&#x5165;element-ui&#xFF01; &#x6B64;&#x7EC4;&#x4EF6;&#x529F;&#x80FD;&#x7C7B;&#x4F3C;&#x4E8E;element-ui&#x7684;transfer&#x7EC4;&#x4EF6;&#xFF0C;&#x4F46;&#x662F;&#x91CC;&#x9762;&#x7684;&#x6570;&#x636E;&#x662F;&#x6811;&#x5F62;&#x7ED3;&#x6784;&#xFF01; &#x5B9E;&#x9645;&#x4E0A;&#xFF0C;el-tree-transfer&#x4F9D;&#x8D56;&#x7684;element-ui&#x7EC4;&#x4EF6;&#x5206;&#x522B;&#x662F;Checkbox &#x591A;&#x9009;&#x6846;&#xFF0C;Button &#x6309;&#x94AE;&#xFF0C;&#x548C;&#x6700;&#x4E3B;&#x8981;&#x7684;Tree &#x6811;&#x5F62;&#x63A7;&#x4EF6;&#x5199;&#x6210;&#xFF01;&#x5E76;&#x975E;&#x662F;&#x5728;element-ui&#x7684;&#x7A7F;&#x68AD;&#x6846;&#x7EC4;&#x4EF6;&#x4E0A;&#x7684;&#x6269;&#x5C55;&#xFF0C;&#x800C;&#x4EC5;&#x4EC5;&#x662F;&#x53C2;&#x7167;&#x4E86;&#x5176;&#x5916;&#x89C2;&#x6837;&#x5F0F;&#x548C;&#x529F;&#x80FD;&#x3002;ui&#x5B8C;&#x5168;&#x6309;&#x7167;element-ui&#x98CE;&#x683C;&#x3002;<br>&#x6CE8;&#x610F;&#xFF1A;&#x4F7F;&#x7528;&#x6B64;&#x63D2;&#x4EF6;&#x65F6;&#x9ED8;&#x8BA4;&#x4F60;&#x5DF2;&#x7ECF;&#x5F15;&#x5165;&#x4E86;element-ui&#x7684;button&#xFF0C;check-box&#xFF0C;tree&#x7EC4;&#x4EF6;&#xFF01;</p><h3 id="articleHeader2"><a href="http://tree-transfer.zhongxiang.shop/" rel="nofollow noreferrer" target="_blank">&#x5728;&#x7EBF;&#x8BBF;&#x95EE;</a> - <a href="https://github.com/hql7/tree-transfer" rel="nofollow noreferrer" target="_blank">GitHub</a> - <a href="https://www.npmjs.com/package/el-tree-transfer" rel="nofollow noreferrer" target="_blank">NPM</a> - <a href="https://segmentfault.com/a/1190000015553081">SegmentFault</a> - <a href="https://blog.csdn.net/qq_15390381/article/details/80943549" rel="nofollow noreferrer" target="_blank">CSDN</a>- <a href="https://juejin.im/post/5b3ecae8e51d4519213fae4b" rel="nofollow noreferrer" target="_blank">&#x6398;&#x91D1;</a></h3><h4>&#x6CE8;&#x610F;&#xFF01; 1.8.9 &#x7248;&#x672C;&#x4FEE;&#x590D;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x65E2;&#x662F;&#x4E00;&#x4FA7;&#x7684;&#x679D;&#x5E72;&#x8282;&#x70B9;&#x53C8;&#x662F;&#x53E6;&#x4E00;&#x4FA7;&#x7684;&#x53F6;&#x5B50;&#x8282;&#x70B9;&#x65F6;&#x7A7F;&#x68AD;&#x5F15;&#x8D77;&#x7684;&#x91CD;&#x590D;&#x9519;&#x8BEF;&#xFF01;&#x89E3;&#x51B3;&#x81EA;&#x5B9A;&#x4E49;&#x8282;&#x70B9;&#x540D;&#x65F6;&#x7B5B;&#x9009;&#x65E0;&#x6548;&#x9519;&#x8BEF;</h4><h4>&#x6CE8;&#x610F;&#xFF01; 1.8.7 &#x7248;&#x672C;&#x589E;&#x52A0;&#x901A;&#x8BAF;&#x5F55;&#x6A21;&#x5F0F;&#xFF0C;&#x53EF;&#x901A;&#x8FC7; mode &#x5B57;&#x6BB5;&#x914D;&#x7F6E;&#x6A21;&#x5F0F;</h4><h4>&#x6CE8;&#x610F;&#xFF01; 1.7.7 &#x7248;&#x672C;&#x79FB;&#x52A8;&#x4E8B;&#x4EF6;&#x53C2;&#x6570;&#x8C03;&#x6574;&#xFF0C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x79FB;&#x52A8;&#x540E;&#x7684; fromData &#x6570;&#x636E;&#x548C; toData &#x6570;&#x636E;&#x3002;</h4><h4>&#x6CE8;&#x610F;&#xFF01; 1.5 &#x4EE5;&#x4E0A;&#x7248;&#x672C;&#x6539;&#x4E3A;&#x81EA;&#x52A8;&#x5904;&#x7406;</h4><blockquote>&#x7B2C;&#x4E00;&#x5C42;&#x6570;&#x636E;&#x7684; pid &#x8BF7;&#x8BBE;&#x5B9A;&#x4E3A; 0&#xFF01;&#xFF01;<p>id&#x63A8;&#x8350;&#x4E3A;string&#xFF0C;&#x4F46;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;number&#xFF0C;&#x8BF7;&#x4E0D;&#x8981;&#x6DF7;&#x7528;&#xFF0C;id&#x4E0D;&#x80FD;&#x91CD;&#x590D;&#xFF01;</p></blockquote><h2 id="articleHeader3">&#x5FEB;&#x901F;&#x4E0A;&#x624B;</h2><p>&#x5148;npm&#x4E0B;&#x8F7D;&#x63D2;&#x4EF6;</p><p>npm install el-tree-transfer --save</p><p>&#x6216;</p><p>npm i el-tree-transfer -S</p><p>&#x7136;&#x540E;&#x4F60;&#x53EF;&#x4EE5;&#x50CF;&#x4F7F;&#x7528;&#x666E;&#x901A;&#x7EC4;&#x4EF6;&#x4E00;&#x6837;&#x4F7F;&#x7528;el-tree-transfer</p><p><a href="https://github.com/hql7/tree-transfer" rel="nofollow noreferrer" target="_blank">GitHub demo&#x4EE3;&#x7801;&#x5730;&#x5740; &#x6B22;&#x8FCE;star &#x8C22;&#x8C22;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;div&gt;
    // &#x4F60;&#x7684;&#x4EE3;&#x7801;
    ...
    // &#x4F7F;&#x7528;&#x6811;&#x5F62;&#x7A7F;&#x68AD;&#x6846;&#x7EC4;&#x4EF6;
    &lt;tree-transfer :title=&quot;title&quot; :from_data=&apos;fromData&apos; :to_data=&apos;toData&apos; :defaultProps=&quot;{label:&apos;label&apos;}&quot;             @addBtn=&apos;add&apos; @removeBtn=&apos;remove&apos; :mode=&apos;mode&apos; height=&apos;540px&apos; filter openAll&gt;
    &lt;/tree-transfer&gt;
  &lt;/div&gt;
&lt;/template&gt;  

&lt;script&gt;
import treeTransfer from &apos;el-tree-transfer&apos; // &#x5F15;&#x5165;

   export defult {
    data(){
      return:{
        mode: &quot;transfer&quot;, // transfer addressList
        fromData:[
          {
            id: &quot;1&quot;,
            pid: 0,
            label: &quot;&#x4E00;&#x7EA7; 1&quot;,
            children: [
              {
                id: &quot;1-1&quot;,
                pid: &quot;1&quot;,
                label: &quot;&#x4E8C;&#x7EA7; 1-1&quot;,
                children: []
              },
              {
                id: &quot;1-2&quot;,
                pid: &quot;1&quot;,
                label: &quot;&#x4E8C;&#x7EA7; 1-2&quot;,
                children: [
                  {
                    id: &quot;1-2-1&quot;,
                    pid: &quot;1-2&quot;,
                    children: [],
                    label: &quot;&#x4E8C;&#x7EA7; 1-2-1&quot;
                  },
                  {
                    id: &quot;1-2-2&quot;,
                    pid: &quot;1-2&quot;,
                    children: [],
                    label: &quot;&#x4E8C;&#x7EA7; 1-2-2&quot;
                  }
                ]
              }
            ]
          },
        ],
        toData:[]
      }
    },
    methods:{
      // &#x5207;&#x6362;&#x6A21;&#x5F0F; &#x73B0;&#x6709;&#x6811;&#x5F62;&#x7A7F;&#x68AD;&#x6846;&#x6A21;&#x5F0F;transfer &#x548C;&#x901A;&#x8BAF;&#x5F55;&#x6A21;&#x5F0F;addressList
      changeMode() {
        if (this.mode == &quot;transfer&quot;) {
          this.mode = &quot;addressList&quot;;
        } else {
          this.mode = &quot;transfer&quot;;
        }
      },
      // &#x76D1;&#x542C;&#x7A7F;&#x68AD;&#x6846;&#x7EC4;&#x4EF6;&#x6DFB;&#x52A0;
      add(fromData,toData,obj){
        // &#x6811;&#x5F62;&#x7A7F;&#x68AD;&#x6846;&#x6A21;&#x5F0F;transfer&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#x4E3A;&#x5DE6;&#x4FA7;&#x6811;&#x79FB;&#x52A8;&#x540E;&#x6570;&#x636E;&#x3001;&#x53F3;&#x4FA7;&#x6811;&#x79FB;&#x52A8;&#x540E;&#x6570;&#x636E;&#x3001;&#x79FB;&#x52A8;&#x7684;        {keys,nodes,halfKeys,halfNodes}&#x5BF9;&#x8C61;
        // &#x901A;&#x8BAF;&#x5F55;&#x6A21;&#x5F0F;addressList&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#x4E3A;&#x53F3;&#x4FA7;&#x6536;&#x4EF6;&#x4EBA;&#x5217;&#x8868;&#x3001;&#x53F3;&#x4FA7;&#x6284;&#x9001;&#x4EBA;&#x5217;&#x8868;&#x3001;&#x53F3;&#x4FA7;&#x5BC6;&#x9001;&#x4EBA;&#x5217;&#x8868;
        console.log(&quot;fromData:&quot;, fromData);
        console.log(&quot;toData:&quot;, toData);
        console.log(&quot;obj:&quot;, obj);
      },
      // &#x76D1;&#x542C;&#x7A7F;&#x68AD;&#x6846;&#x7EC4;&#x4EF6;&#x79FB;&#x9664;
      remove(fromData,toData,obj){
        // &#x6811;&#x5F62;&#x7A7F;&#x68AD;&#x6846;&#x6A21;&#x5F0F;transfer&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#x4E3A;&#x5DE6;&#x4FA7;&#x6811;&#x79FB;&#x52A8;&#x540E;&#x6570;&#x636E;&#x3001;&#x53F3;&#x4FA7;&#x6811;&#x79FB;&#x52A8;&#x540E;&#x6570;&#x636E;&#x3001;&#x79FB;&#x52A8;&#x7684;{keys,nodes,halfKeys,halfNodes}&#x5BF9;&#x8C61;
        // &#x901A;&#x8BAF;&#x5F55;&#x6A21;&#x5F0F;addressList&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#x4E3A;&#x53F3;&#x4FA7;&#x6536;&#x4EF6;&#x4EBA;&#x5217;&#x8868;&#x3001;&#x53F3;&#x4FA7;&#x6284;&#x9001;&#x4EBA;&#x5217;&#x8868;&#x3001;&#x53F3;&#x4FA7;&#x5BC6;&#x9001;&#x4EBA;&#x5217;&#x8868;
        console.log(&quot;fromData:&quot;, fromData);
        console.log(&quot;toData:&quot;, toData);
        console.log(&quot;obj:&quot;, obj);
      }
    },
    comporents:{ treeTransfer } // &#x6CE8;&#x518C;
  }

&lt;/script&gt;


&lt;style&gt;
...
&lt;/style&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    // &#x4F60;&#x7684;&#x4EE3;&#x7801;
    ...
    // &#x4F7F;&#x7528;&#x6811;&#x5F62;&#x7A7F;&#x68AD;&#x6846;&#x7EC4;&#x4EF6;
    <span class="hljs-tag">&lt;<span class="hljs-name">tree-transfer</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">&quot;title&quot;</span> <span class="hljs-attr">:from_data</span>=<span class="hljs-string">&apos;fromData&apos;</span> <span class="hljs-attr">:to_data</span>=<span class="hljs-string">&apos;toData&apos;</span> <span class="hljs-attr">:defaultProps</span>=<span class="hljs-string">&quot;{label:&apos;label&apos;}&quot;</span>             @<span class="hljs-attr">addBtn</span>=<span class="hljs-string">&apos;add&apos;</span> @<span class="hljs-attr">removeBtn</span>=<span class="hljs-string">&apos;remove&apos;</span> <span class="hljs-attr">:mode</span>=<span class="hljs-string">&apos;mode&apos;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&apos;540px&apos;</span> <span class="hljs-attr">filter</span> <span class="hljs-attr">openAll</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tree-transfer</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>  

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> treeTransfer <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;el-tree-transfer&apos;</span> <span class="hljs-comment">// &#x5F15;&#x5165;</span>

   <span class="hljs-keyword">export</span> defult {
    data(){
      <span class="hljs-attr">return</span>:{
        <span class="hljs-attr">mode</span>: <span class="hljs-string">&quot;transfer&quot;</span>, <span class="hljs-comment">// transfer addressList</span>
        fromData:[
          {
            <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;1&quot;</span>,
            <span class="hljs-attr">pid</span>: <span class="hljs-number">0</span>,
            <span class="hljs-attr">label</span>: <span class="hljs-string">&quot;&#x4E00;&#x7EA7; 1&quot;</span>,
            <span class="hljs-attr">children</span>: [
              {
                <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;1-1&quot;</span>,
                <span class="hljs-attr">pid</span>: <span class="hljs-string">&quot;1&quot;</span>,
                <span class="hljs-attr">label</span>: <span class="hljs-string">&quot;&#x4E8C;&#x7EA7; 1-1&quot;</span>,
                <span class="hljs-attr">children</span>: []
              },
              {
                <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;1-2&quot;</span>,
                <span class="hljs-attr">pid</span>: <span class="hljs-string">&quot;1&quot;</span>,
                <span class="hljs-attr">label</span>: <span class="hljs-string">&quot;&#x4E8C;&#x7EA7; 1-2&quot;</span>,
                <span class="hljs-attr">children</span>: [
                  {
                    <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;1-2-1&quot;</span>,
                    <span class="hljs-attr">pid</span>: <span class="hljs-string">&quot;1-2&quot;</span>,
                    <span class="hljs-attr">children</span>: [],
                    <span class="hljs-attr">label</span>: <span class="hljs-string">&quot;&#x4E8C;&#x7EA7; 1-2-1&quot;</span>
                  },
                  {
                    <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;1-2-2&quot;</span>,
                    <span class="hljs-attr">pid</span>: <span class="hljs-string">&quot;1-2&quot;</span>,
                    <span class="hljs-attr">children</span>: [],
                    <span class="hljs-attr">label</span>: <span class="hljs-string">&quot;&#x4E8C;&#x7EA7; 1-2-2&quot;</span>
                  }
                ]
              }
            ]
          },
        ],
        <span class="hljs-attr">toData</span>:[]
      }
    },
    <span class="hljs-attr">methods</span>:{
      <span class="hljs-comment">// &#x5207;&#x6362;&#x6A21;&#x5F0F; &#x73B0;&#x6709;&#x6811;&#x5F62;&#x7A7F;&#x68AD;&#x6846;&#x6A21;&#x5F0F;transfer &#x548C;&#x901A;&#x8BAF;&#x5F55;&#x6A21;&#x5F0F;addressList</span>
      changeMode() {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.mode == <span class="hljs-string">&quot;transfer&quot;</span>) {
          <span class="hljs-keyword">this</span>.mode = <span class="hljs-string">&quot;addressList&quot;</span>;
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.mode = <span class="hljs-string">&quot;transfer&quot;</span>;
        }
      },
      <span class="hljs-comment">// &#x76D1;&#x542C;&#x7A7F;&#x68AD;&#x6846;&#x7EC4;&#x4EF6;&#x6DFB;&#x52A0;</span>
      add(fromData,toData,obj){
        <span class="hljs-comment">// &#x6811;&#x5F62;&#x7A7F;&#x68AD;&#x6846;&#x6A21;&#x5F0F;transfer&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#x4E3A;&#x5DE6;&#x4FA7;&#x6811;&#x79FB;&#x52A8;&#x540E;&#x6570;&#x636E;&#x3001;&#x53F3;&#x4FA7;&#x6811;&#x79FB;&#x52A8;&#x540E;&#x6570;&#x636E;&#x3001;&#x79FB;&#x52A8;&#x7684;        {keys,nodes,halfKeys,halfNodes}&#x5BF9;&#x8C61;</span>
        <span class="hljs-comment">// &#x901A;&#x8BAF;&#x5F55;&#x6A21;&#x5F0F;addressList&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#x4E3A;&#x53F3;&#x4FA7;&#x6536;&#x4EF6;&#x4EBA;&#x5217;&#x8868;&#x3001;&#x53F3;&#x4FA7;&#x6284;&#x9001;&#x4EBA;&#x5217;&#x8868;&#x3001;&#x53F3;&#x4FA7;&#x5BC6;&#x9001;&#x4EBA;&#x5217;&#x8868;</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;fromData:&quot;</span>, fromData);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;toData:&quot;</span>, toData);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;obj:&quot;</span>, obj);
      },
      <span class="hljs-comment">// &#x76D1;&#x542C;&#x7A7F;&#x68AD;&#x6846;&#x7EC4;&#x4EF6;&#x79FB;&#x9664;</span>
      remove(fromData,toData,obj){
        <span class="hljs-comment">// &#x6811;&#x5F62;&#x7A7F;&#x68AD;&#x6846;&#x6A21;&#x5F0F;transfer&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#x4E3A;&#x5DE6;&#x4FA7;&#x6811;&#x79FB;&#x52A8;&#x540E;&#x6570;&#x636E;&#x3001;&#x53F3;&#x4FA7;&#x6811;&#x79FB;&#x52A8;&#x540E;&#x6570;&#x636E;&#x3001;&#x79FB;&#x52A8;&#x7684;{keys,nodes,halfKeys,halfNodes}&#x5BF9;&#x8C61;</span>
        <span class="hljs-comment">// &#x901A;&#x8BAF;&#x5F55;&#x6A21;&#x5F0F;addressList&#x65F6;&#xFF0C;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#x4E3A;&#x53F3;&#x4FA7;&#x6536;&#x4EF6;&#x4EBA;&#x5217;&#x8868;&#x3001;&#x53F3;&#x4FA7;&#x6284;&#x9001;&#x4EBA;&#x5217;&#x8868;&#x3001;&#x53F3;&#x4FA7;&#x5BC6;&#x9001;&#x4EBA;&#x5217;&#x8868;</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;fromData:&quot;</span>, fromData);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;toData:&quot;</span>, toData);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;obj:&quot;</span>, obj);
      }
    },
    <span class="hljs-attr">comporents</span>:{ treeTransfer } <span class="hljs-comment">// &#x6CE8;&#x518C;</span>
  }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>


<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
...
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre><h2 id="articleHeader4">&#x6587;&#x6863;</h2><ol><li>&#x53C2;&#x6570;&#xFF1A;<code>width</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x5BBD;&#x5EA6;</code> &#x7C7B;&#x578B;&#xFF1A;<code>String</code> &#x5FC5;&#x586B;&#xFF1A;<code>false</code> &#x9ED8;&#x8BA4;&#xFF1A;<code>100%</code> &#x8865;&#x5145;&#xFF1A;<code>&#x5EFA;&#x8BAE;&#x5728;&#x5916;&#x90E8;&#x76D2;&#x5B50;&#x8BBE;&#x5B9A;&#x5BBD;&#x5EA6;&#x548C;&#x4F4D;&#x7F6E;</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>height</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x9AD8;&#x5EA6;</code> &#x7C7B;&#x578B;&#xFF1A;<code>String</code> &#x5FC5;&#x586B;&#xFF1A;<code>false</code> &#x9ED8;&#x8BA4;&#xFF1A;<code>320px</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>title</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x6807;&#x9898;</code> &#x7C7B;&#x578B;&#xFF1A;<code>Array</code> &#x5FC5;&#x586B;&#xFF1A;<code>false</code> &#x9ED8;&#x8BA4;&#xFF1A;<code>[&quot;&#x6E90;&#x5217;&#x8868;&quot;, &quot;&#x76EE;&#x6807;&#x5217;&#x8868;&quot;]</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>button_text</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x6309;&#x94AE;&#x540D;&#x5B57;</code> &#x7C7B;&#x578B;&#xFF1A;<code>Array</code> &#x5FC5;&#x586B;&#xFF1A;<code>false</code> &#x9ED8;&#x8BA4;&#xFF1A;<code>&#x7A7A;</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>from_data</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x6E90;&#x6570;&#x636E;</code> &#x7C7B;&#x578B;&#xFF1A;<code>Array</code> &#x5FC5;&#x586B;&#xFF1A;<code>true</code> &#x8865;&#x5145;&#xFF1A;<code>&#x6570;&#x636E;&#x683C;&#x5F0F;&#x540C;element-ui tree&#x7EC4;&#x4EF6;&#xFF0C;&#x4F46;&#x5FC5;&#x987B;&#x6709;id&#x548C;pid</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>to_data</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x76EE;&#x6807;&#x6570;&#x636E;</code> &#x7C7B;&#x578B;&#xFF1A;<code>Array</code> &#x5FC5;&#x586B;&#xFF1A;<code>true</code> &#x8865;&#x5145;&#xFF1A;<code>&#x6570;&#x636E;&#x683C;&#x5F0F;&#x540C;element-ui tree&#x7EC4;&#x4EF6;&#xFF0C;&#x4F46;&#x5FC5;&#x987B;&#x6709;id&#x548C;pid</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>defaultProps</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x914D;&#x7F6E;&#x9879;-&#x540C;el-tree&#x4E2D;props</code> &#x5FC5;&#x586B;&#xFF1A; <code>false</code> &#x8865;&#x5145;&#xFF1A;<code>&#x7528;&#x6CD5;&#x548C;el-tree&#x7684;props&#x4E00;&#x6837;</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>node_key</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x81EA;&#x5B9A;&#x4E49;node-key&#x7684;&#x503C;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;id</code> &#x5FC5;&#x586B;&#xFF1A;<code>false</code> &#x8865;&#x5145;&#xFF1A;<code>&#x5FC5;&#x987B;&#x4E0E;treedata&#x6570;&#x636E;&#x5185;&#x7684;id&#x53C2;&#x6570;&#x540D;&#x4E00;&#x81F4;&#xFF0C;&#x5FC5;&#x987B;&#x552F;&#x4E00;</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>pid</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x81EA;&#x5B9A;&#x4E49;pid&#x7684;&#x53C2;&#x6570;&#x540D;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&quot;pid&quot;</code> &#x5FC5;&#x586B;&#xFF1A;<code>false</code> &#x8865;&#x5145;&#xFF1A;<code>&#x6709;&#x7F51;&#x53CB;&#x63D0;&#x51FA;&#x540E;&#x53F0;&#x7ED9;&#x7684;&#x5B57;&#x6BB5;&#x540D;&#x4E0D;&#x53EB;pid&#xFF0C;&#x56E0;&#x6B64;&#x589E;&#x52A0;&#x81EA;&#x5B9A;&#x4E49;&#x652F;&#x6301;</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>leafOnly</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x662F;&#x5426;&#x53EA;&#x8FD4;&#x56DE;&#x53F6;&#x5B50;&#x8282;&#x70B9;</code> &#x7C7B;&#x578B;&#xFF1A;<code>Boolean</code> &#x5FC5;&#x586B;&#xFF1A;<code>false</code> &#x8865;&#x5145;&#xFF1A;<code>&#x9ED8;&#x8BA4;false&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x53EA;&#x9700;&#x8981;&#x8FD4;&#x56DE;&#x7684;&#x672B;&#x7AEF;&#x5B50;&#x8282;&#x70B9;&#x53EF;&#x4F7F;&#x7528;&#x6B64;&#x53C2;&#x6570;</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>filter</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x662F;&#x5426;&#x5F00;&#x542F;&#x7B5B;&#x9009;&#x529F;&#x80FD;</code> &#x7C7B;&#x578B;&#xFF1A;<code>Boolean</code> &#x5FC5;&#x586B;&#xFF1A;<code>false</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>openAll</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x662F;&#x5426;&#x9ED8;&#x8BA4;&#x5C55;&#x5F00;&#x5168;&#x90E8;</code> &#x7C7B;&#x578B;&#xFF1A;<code>Boolean</code> &#x5FC5;&#x586B;&#xFF1A;<code>false</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>renderContent</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x81EA;&#x5B9A;&#x4E49;&#x6811;&#x8282;&#x70B9;</code> &#x7C7B;&#x578B;&#xFF1A;<code>Function</code> &#x5FC5;&#x586B;&#xFF1A;<code>false</code> &#x8865;&#x5145;&#xFF1A;<code>&#x7528;&#x6CD5;&#x540C;element-ui tree</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>mode</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x8BBE;&#x7F6E;&#x6A21;&#x5F0F;&#xFF0C;&#x5B57;&#x6BB5;&#x53EF;&#x9009;&#x503C;&#x4E3A;transfer|addressList</code> &#x7C7B;&#x578B;&#xFF1A;<code>String</code> &#x5FC5;&#x586B;&#xFF1A;<code>false</code> &#x8865;&#x5145;&#xFF1A;<code>mode&#x9ED8;&#x8BA4;&#x4E3A;transfer&#x6A21;&#x5F0F;&#xFF0C;&#x5373;&#x6811;&#x5F62;&#x7A7F;&#x68AD;&#x6846;&#x6A21;&#x5F0F;&#xFF0C;&#x53EF;&#x914D;&#x7F6E;&#x5B57;&#x6BB5;&#x4E3A;addressList&#x6539;&#x4E3A;&#x901A;&#x8BAF;&#x5F55;&#x6A21;&#x5F0F;&#xFF0C;&#x901A;&#x8BAF;&#x5F55;&#x6A21;&#x5F0F;&#x65F6;&#x6309;&#x94AE;&#x4E0D;&#x53EF;&#x81EA;&#x5B9A;&#x4E49;&#x540D;&#x5B57;&#xFF0C;&#x5982;&#x8981;&#x81EA;&#x5B9A;&#x4E49;&#x6807;&#x9898;&#x540D;&#x5728;title&#x6570;&#x7EC4;&#x4F20;&#x5165;&#x56DB;&#x4E2A;&#x503C;&#x5373;&#x53EF;&#xFF0C;addressList&#x6A21;&#x5F0F;&#x65F6;&#x6807;&#x9898;&#x9ED8;&#x8BA4;&#x4E3A;&#x901A;&#x8BAF;&#x5F55;&#x3001;&#x6536;&#x4EF6;&#x4EBA;&#x3001;&#x6284;&#x9001;&#x4EBA;&#x3001;&#x5BC6;&#x9001;&#x4EBA;</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>transferOpenNode</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x7A7F;&#x68AD;&#x540E;&#x662F;&#x5426;&#x5C55;&#x5F00;&#x7A7F;&#x68AD;&#x7684;&#x8282;&#x70B9;</code> &#x7C7B;&#x578B;&#xFF1A;<code>Boolean</code> &#x5FC5;&#x586B;&#xFF1A;<code>false</code> &#x8865;&#x5145;&#xFF1A;<code>&#x9ED8;&#x8BA4;&#x4E3A;true&#x5373;&#x5C55;&#x5F00;&#x7A7F;&#x68AD;&#x7684;&#x8282;&#x70B9;&#xFF0C;&#x4FBF;&#x4E8E;&#x89C6;&#x89C9;&#x67E5;&#x770B;&#xFF0C;&#x589E;&#x52A0;&#x6B64;&#x53C2;&#x6570;&#x662F;&#x56E0;&#x4E3A;&#x6570;&#x636E;&#x91CF;&#x5927;&#x65F6;&#x5C55;&#x5F00;&#x4F1A;&#x6709;&#x660E;&#x663E;&#x5361;&#x987F;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x6CE8;&#x610F;&#xFF0C;&#x5982;&#x6B64;&#x53C2;&#x6570;&#x8BBE;&#x7F6E;&#x4E3A;false&#x5219;&#x7A7F;&#x68AD;&#x540E;&#x4E0D;&#x5C55;&#x5F00;&#xFF0C;&#x6BD5;&#x7ADF;&#x65E0;&#x6CD5;&#x786E;&#x5B9A;&#x7B2C;&#x51E0;&#x5C42;&#x5C31;&#x4F1A;&#x6709;&#x5E9E;&#x5927;&#x6570;&#x636E;</code></li><li>&#x53C2;&#x6570;&#xFF1A;<code>defaultCheckedKeys</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x9ED8;&#x8BA4;&#x5C55;&#x5F00;&#x8282;&#x70B9;</code> &#x7C7B;&#x578B;&#xFF1A;<code>Array</code> &#x5FC5;&#x586B;&#xFF1A;<code>false</code> &#x8865;&#x5145;&#xFF1A;<code>&#x53EA;&#x5339;&#x914D;&#x521D;&#x59CB;&#x65F6;&#x9ED8;&#x8BA4;&#x8282;&#x70B9;&#xFF0C;&#x4E0D;&#x4F1A;&#x5728;&#x4F60;&#x64CD;&#x4F5C;&#x540E;&#x52A8;&#x6001;&#x6539;&#x53D8;&#x9ED8;&#x8BA4;&#x8282;&#x70B9;</code></li><li>&#x4E8B;&#x4EF6;&#xFF1A;<code>addBtn</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x70B9;&#x51FB;&#x6DFB;&#x52A0;&#x6309;&#x94AE;&#x65F6;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;</code> &#x56DE;&#x8C03;&#x53C2;&#x6570;&#xFF1A;<code>function(fromData,toData,obj),&#x6811;&#x5F62;&#x7A7F;&#x68AD;&#x6846;transfer&#x6A21;&#x5F0F;&#x5206;&#x522B;&#x4E3A;1.&#x79FB;&#x52A8;&#x540E;&#x5DE6;&#x4FA7;&#x6570;&#x636E;&#xFF0C;2.&#x79FB;&#x52A8;&#x540E;&#x53F3;&#x4FA7;&#x6570;&#x636E;&#xFF0C;3.&#x79FB;&#x52A8;&#x7684;&#x8282;&#x70B9;keys&#x3001;nodes&#x3001;halfKeys&#x3001;halfNodes&#x5BF9;&#x8C61;&#xFF1B;&#x901A;&#x8BAF;&#x5F55;addressList&#x6A21;&#x5F0F;&#x65F6;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#x4E3A;&#x53F3;&#x4FA7;&#x6536;&#x4EF6;&#x4EBA;&#x5217;&#x8868;&#x3001;&#x53F3;&#x4FA7;&#x6284;&#x9001;&#x4EBA;&#x5217;&#x8868;&#x3001;&#x53F3;&#x4FA7;&#x5BC6;&#x9001;&#x4EBA;&#x5217;&#x8868;</code></li><li>&#x4E8B;&#x4EF6;&#xFF1A;<code>removeBtn</code> &#x8BF4;&#x660E;&#xFF1A;<code>&#x70B9;&#x51FB;&#x79FB;&#x9664;&#x6309;&#x94AE;&#x65F6;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;</code> &#x56DE;&#x8C03;&#x53C2;&#x6570;&#xFF1A;<code>function(fromData,toData,obj),&#x6811;&#x5F62;&#x7A7F;&#x68AD;&#x6846;transfer&#x6A21;&#x5F0F;&#x5206;&#x522B;&#x4E3A;1.&#x79FB;&#x52A8;&#x540E;&#x5DE6;&#x4FA7;&#x6570;&#x636E;&#xFF0C;2.&#x79FB;&#x52A8;&#x540E;&#x53F3;&#x4FA7;&#x6570;&#x636E;&#xFF0C;3.&#x79FB;&#x52A8;&#x7684;&#x8282;&#x70B9;keys&#x3001;nodes&#x3001;halfKeys&#x3001;halfNodes&#x5BF9;&#x8C61;&#xFF1B;&#x901A;&#x8BAF;&#x5F55;addressList&#x6A21;&#x5F0F;&#x65F6;&#x8FD4;&#x56DE;&#x53C2;&#x6570;&#x4E3A;&#x53F3;&#x4FA7;&#x6536;&#x4EF6;&#x4EBA;&#x5217;&#x8868;&#x3001;&#x53F3;&#x4FA7;&#x6284;&#x9001;&#x4EBA;&#x5217;&#x8868;&#x3001;&#x53F3;&#x4FA7;&#x5BC6;&#x9001;&#x4EBA;&#x5217;&#x8868;</code></li></ol><h2 id="articleHeader5">&#x7248;&#x672C;&#x8BF4;&#x660E;</h2><blockquote>1.8.9 &#x7248;&#x672C;&#x4FEE;&#x590D;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x65E2;&#x662F;&#x4E00;&#x4FA7;&#x7684;&#x679D;&#x5E72;&#x8282;&#x70B9;&#x53C8;&#x662F;&#x53E6;&#x4E00;&#x4FA7;&#x7684;&#x53F6;&#x5B50;&#x8282;&#x70B9;&#x65F6;&#x7A7F;&#x68AD;&#x5F15;&#x8D77;&#x7684;&#x91CD;&#x590D;&#x9519;&#x8BEF;&#xFF01;&#x89E3;&#x51B3;&#x81EA;&#x5B9A;&#x4E49;&#x8282;&#x70B9;&#x540D;&#x65F6;&#x7B5B;&#x9009;&#x65E0;&#x6548;&#x9519;&#x8BEF;&#x3002;<p>1.8.8 &#x7248;&#x672C;&#x589E;&#x52A0;<code>transferOpenNode</code>&#x53C2;&#x6570;&#x7528;&#x6765;&#x7BA1;&#x7406;&#x7A7F;&#x68AD;&#x540E;&#x662F;&#x5426;&#x5C55;&#x5F00;&#x8282;&#x70B9;&#xFF0C;<code>defaultCheckedKeys</code>&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x521D;&#x59CB;&#x65F6;&#x9ED8;&#x8BA4;&#x5C55;&#x5F00;&#x8282;&#x70B9;&#x3002;</p><p>1.8.7 &#x7248;&#x672C;&#x589E;&#x52A0;&#x901A;&#x8BAF;&#x5F55;&#x6A21;&#x5F0F;&#xFF0C;&#x53EF;&#x901A;&#x8FC7; mode &#x5B57;&#x6BB5;&#x914D;&#x7F6E;&#x6A21;&#x5F0F;&#xFF0C;mode &#x5B57;&#x6BB5;&#x53EF;&#x9009;&#x503C;&#x4E3A;<code>transfer</code>|<code>addressList</code>&#x3002;</p><p>1.7.7 &#x7248;&#x672C; <code>addBtn</code> &#x548C; <code>removeBtn</code> &#x4E8B;&#x4EF6;&#x53C2;&#x6570;&#x8C03;&#x6574;&#xFF0C;&#x8FD4;&#x56DE;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x79FB;&#x52A8;&#x540E;&#x7684;fromData&#x6570;&#x636E;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x79FB;&#x52A8;&#x540E;&#x7684;toData&#x6570;&#x636E;&#xFF0C;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x662F;{keys, nodes, harfKeys, harfNodes}&#x5BF9;&#x8C61;&#x3002;&#x589E;&#x52A0; <code>renderContent</code> &#x53C2;&#x6570;&#x652F;&#x6301;&#x6811;&#x8282;&#x70B9;&#x81EA;&#x5B9A;&#x4E49;&#x3002;</p><p>1.6.7 &#x7248;&#x672C;&#x589E;&#x52A0;<code>filter,openAll</code>&#x53C2;&#x6570;&#xFF0C;&#x6765;&#x8BBE;&#x7F6E;&#x662F;&#x5426;&#x5F00;&#x542F;&#x7B5B;&#x9009;&#x548C;&#x662F;&#x5426;&#x9ED8;&#x8BA4;&#x5C55;&#x5F00;&#x5168;&#x90E8;</p><p>1.5.9&#x7248;&#x672C;&#x589E;&#x52A0;<code>leafOnly</code>&#x53C2;&#x6570;&#xFF0C;&#x6765;&#x8BBE;&#x7F6E;&#x662F;&#x5426;&#x53EA;&#x8FD4;&#x56DE;&#x6811;&#x7684;&#x672B;&#x7AEF;&#x53F6;&#x5B50;&#x8282;&#x70B9;</p><p>1.5.8&#x7248;&#x672C;&#x6062;&#x590D;&#x4E0A;&#x4E2A;&#x7248;&#x672C;&#x83AB;&#x540D;&#x5220;&#x6389;&#x7684;&#x8FD4;&#x56DE;<code>nodes</code>&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5982;&#x679C;&#x60A8;&#x7684;&#x9879;&#x76EE;&#x53EA;&#x9700;&#x8981;&#x7A7F;&#x68AD;&#x7684;node-key&#x503C;&#x5219;&#x65E0;&#x9700;&#x66F4;&#x65B0;&#xFF01;&#x9053;&#x6B49;ing&#x3002;&#x3002;&#x3002;</p><p>1.5.7&#x7248;&#x672C;&#x4FEE;&#x590D;&#x5B50;&#x7EC4;&#x4EF6;&#x5F02;&#x6B65;&#x6570;&#x636E;&#x6709;&#x65F6;&#x4E0D;&#x4F1A;&#x66F4;&#x65B0;&#x7684;&#x95EE;&#x9898;&#xFF01;&#x4FEE;&#x590D;&#x4E86;&#x81EA;&#x5B9A;&#x4E49;&#x53C2;&#x6570;&#x540D;node_key,children&#x65F6;&#x7684;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#xFF0C;&#x81EA;&#x52A8;&#x628A;&#x7B2C;&#x4E00;&#x5C42;&#x6570;&#x636E;&#x7684;pid&#x66FF;&#x6362;&#x4E3A;0</p><p>1.4.9&#x7248;&#x672C;&#x589E;&#x52A0;&#x4E86;&#x6DFB;&#x52A0;&#x548C;&#x79FB;&#x9664;&#x6309;&#x94AE;&#x7684;&#x56DE;&#x8C03;&#x53C2;&#x6570;&#xFF0C;function(keys,nodes)&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x9009;&#x4E2D;&#x8282;&#x70B9;node-key&#x503C;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x9009;&#x4E2D;&#x8282;&#x70B9;node</p><p>1.4.8 &#x7248;&#x672C;&#x4FEE;&#x590D;&#x4E86;id&#x4E3A;number&#x7C7B;&#x578B;&#x65F6;&#x65E0;&#x6CD5;&#x901A;&#x8FC7;&#x91CD;&#x590D;&#x6821;&#x9A8C;&#x51FD;&#x6570;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x4ECD;&#x7136;&#x63A8;&#x8350;id&#x4F7F;&#x7528;string&#x578B;</p><p>1.4.7 &#x7248;&#x672C;&#x589E;&#x52A0;&#x4E86;<code>defaultProps</code>&#x53C2;&#x6570;&#xFF0C;<code>node_key</code>&#x53C2;&#x6570;&#xFF0C;<code>pid</code>&#x53C2;&#x6570;&#xFF0C;&#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x4E3A;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x4E00;&#x4E9B;&#x91CD;&#x8981;&#x5B57;&#x6BB5;&#x540D;&#xFF0C;&#x6765;&#x63D0;&#x9AD8;&#x6570;&#x636E;&#x7075;&#x6D3B;&#x6027;&#xFF0C;&#x907F;&#x514D;&#x548C;&#x540E;&#x53F0;&#x56E0;&#x4E3A;&#x5B57;&#x6BB5;&#x540D;&#x4E0D;&#x540C;&#x800C;&#x88AB;&#x796D;&#x5929;</p><p>1.3.7 &#x7248;&#x672C;&#x53D6;&#x6D88;&#x4E86;&#x5BF9;loadsh&#x5E93;&#x7684;&#x4F9D;&#x8D56;&#xFF0C;&#x6B64;&#x524D;&#x4EC5;&#x7528;&#x6B64;&#x5E93;&#x505A;&#x67D0;&#x4E9B;&#x6DF1;&#x62F7;&#x8D1D;&#x5904;&#x7406;</p></blockquote><h2 id="articleHeader6">&#x5F88;&#x591A;&#x6709;&#x813E;&#x6C14;&#x7684;&#x8001;&#x54E5;&#x627E;&#x6211;&#x7ED9;&#x6253;&#x8D4F;&#xFF0C;&#x8C22;&#x8FC7;&#xFF0C;git&#x4E0A;&#x6709;&#x6536;&#x94B1;&#x7801;<del>~</del>~~</h2>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个基于vue和element-ui的树形穿梭框组件

## 原文链接
[https://segmentfault.com/a/1190000015553081](https://segmentfault.com/a/1190000015553081)

