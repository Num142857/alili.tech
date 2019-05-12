---
title: '基于vue.js实现树形表格的封装' 
date: 2018-11-21 2:30:10
hidden: true
slug: h08gplv0yjq
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x57FA;&#x4E8E;vue.js&#x5B9E;&#x73B0;&#x6811;&#x5F62;&#x8868;&#x683C;&#x7684;&#x5C01;&#x88C5;&#xFF08;vue-tree-table&#xFF09;</h1><h1 id="articleHeader1">&#x524D;&#x8A00;</h1><blockquote>&#x7531;&#x4E8E;&#x516C;&#x53F8;&#x4EA7;&#x54C1;&#xFF08;&#x57FA;&#x4E8E;vue.js&#xFF09;&#x9700;&#x8981;&#xFF0C;&#x8981;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;<a href="https://github.com/sijinglei/vue-tree-table" rel="nofollow noreferrer" target="_blank">&#x6811;&#x5F62;&#x8868;&#x683C;</a>&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x767E;&#x5EA6;&#x3001;google&#x627E;&#x4E86;&#x4E00;&#x901A;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x53D1;&#x73B0;&#x5F88;&#x9760;&#x8C31;&#x7684;&#xFF0C;&#x4E5F;&#x4E0D;&#x662F;&#x5F88;&#x7075;&#x6D3B;&#x3002;&#x6240;&#x4EE5;&#x5C31;&#x7528;vue&#x81EA;&#x5DF1;&#x64B8;&#x4E86;&#x4E00;&#x4E2A;&#xFF0C;&#x8FD8;&#x671B;&#x5927;&#x5BB6;&#x591A;&#x591A;&#x6307;&#x6559;&#x3002;</blockquote><h4>&#x4E3B;&#x8981;&#x6280;&#x672F;&#x70B9;&#xFF1A;<code>vue&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x9012;&#x5F52;&#x5B9E;&#x73B0;&#x53CA;&#x76F8;&#x5173;&#x6837;&#x5F0F;&#x7684;&#x5B9E;&#x73B0;</code></h4><h2 id="articleHeader2">&#x6811;&#x5F62;&#x8868;&#x683C;&#x5B9E;&#x73B0;</h2><ul><li>&#x6548;&#x679C;&#x56FE;(<a href="https://sijinglei.github.io/vue-tree-table/dist/#/" rel="nofollow noreferrer" target="_blank">Demo</a>)</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000015763133?w=1492&amp;h=998" src="https://static.alili.tech/img/remote/1460000015763133?w=1492&amp;h=998" alt="" title="" style="cursor:pointer;display:inline"></span></p><ul><li>&#x4E3B;&#x8981;&#x4EE3;&#x7801;</li></ul><blockquote>index.vue&#x9875;&#x9762;&#x5B9E;&#x73B0;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4EE3;&#x7801;&#xFF0C;&#x6BD4;&#x5982;&#x6811;&#x8868;&#x683C;&#x4E0A;&#x9762;&#x7684;&#x4E00;&#x4E9B;&#x64CD;&#x4F5C;&#x6309;&#x94AE;&#x7684;&#x5B9E;&#x73B0;&#x53CA;&#x6570;&#x636E;&#x83B7;&#x53D6;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div class=&quot;contains&quot;&gt;
    &lt;h1&gt;&#x6811;&#x8868;&#x683C;&#x5B9E;&#x73B0;&lt;/h1&gt;
    &lt;tree-table ref=&quot;recTree&quot;
    :list.sync=&quot;treeDataSource&quot;
    @actionFunc=&quot;actionFunc&quot;
    @deleteFunc=&quot;deleteFunc&quot;
    @orderByFunc=&quot;orderByFunc&quot;&gt;&lt;/tree-table&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
import treeTable from &apos;@/components/tree-table.vue&apos;
export default {
  data() {
    return {
      list: [], // &#x8BF7;&#x6C42;&#x539F;&#x59CB;&#x6570;&#x636E;
      treeDataSource: [] // &#x7EC4;&#x5408;&#x6210;&#x6811;&#x8868;&#x683C;&#x63A5;&#x6536;&#x7684;&#x6570;&#x636E;
    }
  },
  components: {
    treeTable
  },
  methods: {
    orderByFunc(val) {
      alert(&apos;&#x6392;&#x5E8F;&apos;)
      alert(val)
    },
    actionFunc(m) {
      alert(&apos;&#x7F16;&#x8F91;&apos;)
    },
    deleteFunc(m) {
      alert(&apos;&#x5220;&#x9664;&apos;)
    }
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;contains&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x6811;&#x8868;&#x683C;&#x5B9E;&#x73B0;<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tree-table</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;recTree&quot;</span>
    <span class="hljs-attr">:list.sync</span>=<span class="hljs-string">&quot;treeDataSource&quot;</span>
    @<span class="hljs-attr">actionFunc</span>=<span class="hljs-string">&quot;actionFunc&quot;</span>
    @<span class="hljs-attr">deleteFunc</span>=<span class="hljs-string">&quot;deleteFunc&quot;</span>
    @<span class="hljs-attr">orderByFunc</span>=<span class="hljs-string">&quot;orderByFunc&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tree-table</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> treeTable <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/components/tree-table.vue&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">list</span>: [], <span class="hljs-comment">// &#x8BF7;&#x6C42;&#x539F;&#x59CB;&#x6570;&#x636E;</span>
      treeDataSource: [] <span class="hljs-comment">// &#x7EC4;&#x5408;&#x6210;&#x6811;&#x8868;&#x683C;&#x63A5;&#x6536;&#x7684;&#x6570;&#x636E;</span>
    }
  },
  <span class="hljs-attr">components</span>: {
    treeTable
  },
  <span class="hljs-attr">methods</span>: {
    orderByFunc(val) {
      alert(<span class="hljs-string">&apos;&#x6392;&#x5E8F;&apos;</span>)
      alert(val)
    },
    actionFunc(m) {
      alert(<span class="hljs-string">&apos;&#x7F16;&#x8F91;&apos;</span>)
    },
    deleteFunc(m) {
      alert(<span class="hljs-string">&apos;&#x5220;&#x9664;&apos;</span>)
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x539F;&#x59CB;&#x6570;&#x636E;`list`&#xFF1A;&#x662F;&#x4E0D;&#x5305;&#x542B;&#x5B50;&#x6570;&#x636E;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x5373;&#x6CA1;&#x6709;&#x5C42;&#x7EA7;&#x7ED3;&#x6784;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;
[{id:111,parentId:0,name:&apos;&#x7236;&#x53CA;&apos;},{id:111,parentId:111,name:&apos;&#x5B50;&#x7EA7;&apos;}...]&#xFF0C;&#x901A;&#x8FC7;parentId&#x6765;&#x83B7;&#x53D6;&#x5BF9;&#x5E94;&#x7236;&#x5B50;&#x5C42;&#x7EA7;&#x7ED3;&#x6784;
`treeDataSource`&#xFF1A;&#x662F;&#x6811;&#x8868;&#x683C;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;
[{id:0,name:&apos;&#x7236;&#x53CA;&apos;,children:[{id:10,name:&apos;&#x5B50;&#x7EA7;&apos;,children:[]}]},...]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">&#x539F;&#x59CB;&#x6570;&#x636E;`list`&#xFF1A;&#x662F;&#x4E0D;&#x5305;&#x542B;&#x5B50;&#x6570;&#x636E;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x5373;&#x6CA1;&#x6709;&#x5C42;&#x7EA7;&#x7ED3;&#x6784;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;
[{id:111,parentId:0,name:<span class="hljs-string">&apos;&#x7236;&#x53CA;&apos;</span>},{id:111,parentId:111,name:<span class="hljs-string">&apos;&#x5B50;&#x7EA7;&apos;</span>}...]&#xFF0C;&#x901A;&#x8FC7;parentId&#x6765;&#x83B7;&#x53D6;&#x5BF9;&#x5E94;&#x7236;&#x5B50;&#x5C42;&#x7EA7;&#x7ED3;&#x6784;
`treeDataSource`&#xFF1A;&#x662F;&#x6811;&#x8868;&#x683C;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;
[{id:0,name:<span class="hljs-string">&apos;&#x7236;&#x53CA;&apos;</span>,children:[{id:10,name:<span class="hljs-string">&apos;&#x5B50;&#x7EA7;&apos;</span>,children:[]}]},...]</code></pre><blockquote>&#x5982;&#x679C;&#x540E;&#x53F0;&#x8FD4;&#x56DE;&#x7ED9;&#x4F60;&#x7684;&#x662F;&#x539F;&#x59CB;&#x6570;&#x636E;&#x683C;&#x5F0F;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x7528;&#x4E0B;&#x9762;&#x65B9;&#x6CD5;&#x5C01;&#x88C5;&#x6210;&#x6811;&#x8868;&#x683C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF1A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    getTreeData() {
      // &#x53D6;&#x7236;&#x8282;&#x70B9;
      let parentArr = this.list.filter(l =&gt; l.parentId === 0)
      this.treeDataSource = this.getTreeData(this.list, parentArr)
    },
    // &#x8FD9;&#x91CC;&#x5904;&#x7406;&#x6CA1;&#x6709;children&#x7ED3;&#x6784;&#x7684;&#x6570;&#x636E;
    getTreeData(list, dataArr) {
      dataArr.map((pNode, i) =&gt; {
        let childObj = []
        list.map((cNode, j) =&gt; {
          if (pNode.Id === cNode.parentId) {
            childObj.push(cNode)
          }
        })
        pNode.children = childObj
        if (childObj.length &gt; 0) {
          this.getTreeData(list, childObj)
        }
      })
      return dataArr
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">    <span class="hljs-function"><span class="hljs-title">getTreeData</span></span>() {
      // &#x53D6;&#x7236;&#x8282;&#x70B9;
      <span class="hljs-built_in">let</span> parentArr = this.list.filter(l =&gt; l.parentId === 0)
      this.treeDataSource = this.getTreeData(this.list, parentArr)
    },
    // &#x8FD9;&#x91CC;&#x5904;&#x7406;&#x6CA1;&#x6709;children&#x7ED3;&#x6784;&#x7684;&#x6570;&#x636E;
    getTreeData(list, dataArr) {
      dataArr.map((pNode, i) =&gt; {
        <span class="hljs-built_in">let</span> childObj = []
        list.map((cNode, j) =&gt; {
          <span class="hljs-keyword">if</span> (pNode.Id === cNode.parentId) {
            childObj.push(cNode)
          }
        })
        pNode.children = childObj
        <span class="hljs-keyword">if</span> (childObj.length &gt; 0) {
          this.getTreeData(list, childObj)
        }
      })
      <span class="hljs-built_in">return</span> dataArr
    }</code></pre><blockquote>tree-table.vue&#x9875;&#x9762;&#x3002;&#x6B64;&#x9875;&#x9762;&#x662F;&#x5B9E;&#x73B0;&#x6811;&#x8868;&#x683C;&#x7684;&#x5173;&#x5065;&#x9875;&#x9762;&#x3002;&#x4E3B;&#x8981;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;div class=&quot;tree-table&quot;&gt;
        &lt;div class=&quot;tree-head&quot;&gt;
            &lt;table&gt;
                &lt;tr&gt;
                    &lt;td class=&quot;td1&quot;&gt;&#x804C;&#x4F4D;&#x540D;&#x79F0;&lt;/td&gt;
                    &lt;td class=&quot;td2&quot;&gt;&#x8D1F;&#x8D23;&#x4EBA;&lt;/td&gt;
                    &lt;td class=&quot;td3&quot; @click=&quot;isDesc=!isDesc&quot;&gt;
                        &#x521B;&#x5EFA;&#x65F6;&#x95F4;
                        &lt;div class=&quot;arrow&quot;&gt;
                            &lt;span class=&quot;up-arrow&quot; :class=&quot;{&apos;sort&apos;:isDesc}&quot;&gt;&lt;/span&gt;
                            &lt;span class=&quot;down-arrow&quot; :class=&quot;{&apos;sort&apos;:!isDesc}&quot;&gt;&lt;/span&gt;
                        &lt;/div&gt;
                    &lt;/td&gt;
                    &lt;td class=&quot;td4&quot;&gt;&#x5DE5;&#x4F5C;&#x7ECF;&#x9A8C;&lt;/td&gt;
                    &lt;td class=&quot;td5&quot;&gt;&#x53D1;&#x5E03;&#x65F6;&#x95F4;&lt;/td&gt;
                    &lt;td class=&quot;td6&quot;&gt;&#x64CD;&#x4F5C;&lt;/td&gt;
                &lt;/tr&gt;
            &lt;/table&gt;
        &lt;/div&gt;
        &lt;div id=&quot;scrollWrap&quot; class=&quot;tree-wrap&quot;&gt;
            &lt;div class=&quot;tree-body&quot;&gt;
                &lt;table v-if=&apos;treeDataSource.length&gt;0&apos;&gt;
                    &lt;tbody&gt;
                        &lt;tr&gt;
                            &lt;td&gt;
                                &lt;tree-item
                                    v-for=&quot;(model,i) in treeDataSource&quot;
                                    :key=&quot;&apos;root_node_&apos;+i&quot;
                                    :root=&quot;0&quot;
                                    :num=&quot;i&quot;
                                    @actionFunc=&quot;actionFunc&quot;
                                    @deleteFunc=&quot;deleteFunc&quot;
                                    :nodes=&quot;treeDataSource.length&quot;
                                    :trees.sync=&quot;treeDataSource&quot;
                                    :model.sync=&quot;model&quot;&gt;
                                &lt;/tree-item&gt;
                            &lt;/td&gt;
                        &lt;/tr&gt;
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tree-table&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tree-head&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td1&quot;</span>&gt;</span>&#x804C;&#x4F4D;&#x540D;&#x79F0;<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td2&quot;</span>&gt;</span>&#x8D1F;&#x8D23;&#x4EBA;<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td3&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;isDesc=!isDesc&quot;</span>&gt;</span>
                        &#x521B;&#x5EFA;&#x65F6;&#x95F4;
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;arrow&quot;</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;up-arrow&quot;</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;{&apos;sort&apos;:isDesc}&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;down-arrow&quot;</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;{&apos;sort&apos;:!isDesc}&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td4&quot;</span>&gt;</span>&#x5DE5;&#x4F5C;&#x7ECF;&#x9A8C;<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td5&quot;</span>&gt;</span>&#x53D1;&#x5E03;&#x65F6;&#x95F4;<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;td6&quot;</span>&gt;</span>&#x64CD;&#x4F5C;<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;scrollWrap&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tree-wrap&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tree-body&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&apos;treeDataSource.length&gt;0&apos;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
                                <span class="hljs-tag">&lt;<span class="hljs-name">tree-item</span>
                                    <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(model,i) in treeDataSource&quot;</span>
                                    <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;&apos;root_node_&apos;+i&quot;</span>
                                    <span class="hljs-attr">:root</span>=<span class="hljs-string">&quot;0&quot;</span>
                                    <span class="hljs-attr">:num</span>=<span class="hljs-string">&quot;i&quot;</span>
                                    @<span class="hljs-attr">actionFunc</span>=<span class="hljs-string">&quot;actionFunc&quot;</span>
                                    @<span class="hljs-attr">deleteFunc</span>=<span class="hljs-string">&quot;deleteFunc&quot;</span>
                                    <span class="hljs-attr">:nodes</span>=<span class="hljs-string">&quot;treeDataSource.length&quot;</span>
                                    <span class="hljs-attr">:trees.sync</span>=<span class="hljs-string">&quot;treeDataSource&quot;</span>
                                    <span class="hljs-attr">:model.sync</span>=<span class="hljs-string">&quot;model&quot;</span>&gt;</span>
                                <span class="hljs-tag">&lt;/<span class="hljs-name">tree-item</span>&gt;</span>
                            <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre><p>&#x9996;&#x5148;&#x8FD9;&#x91CC;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;<code>tree-item</code>&#x6CA1;&#x6709;&#x5728;&#x9875;&#x9762;&#x4E0A;&#x6709;&#x5F15;&#x5165;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x4F7F;&#x7528;&#x3002;&#x8FD9;&#x91CC;&#x5C31;&#x662F;&#x5173;&#x5065;&#x70B9;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#x662F;&#x9700;&#x8981;&#x9012;&#x5F52;&#x5B9E;&#x73B0;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x9700;&#x8981;&#x52A8;&#x6001;&#x6CE8;&#x518C;&#x5230;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x4E2D;&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF08;&#x7531;&#x4E8E;&#x4EE3;&#x7801;&#x592A;&#x591A;&#xFF0C;&#x5148;&#x8D34;&#x56FE;&#x8BF4;&#x660E;&#x5427;&#xFF0C;<a href="https://github.com/sijinglei/vue-tree-table/blob/master/src/components/tree-table.vue" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x8FD9;&#x91CC;</a>&#x53EF;&#x4EE5;&#x770B;&#x6E90;&#x7801;&#xFF09;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015763134?w=672&amp;h=862" src="https://static.alili.tech/img/remote/1460000015763134?w=672&amp;h=862" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x91CC;&#x5B50;&#x7EC4;&#x4EF6;&#x770B;&#x8D77;&#x6765;&#x662F;&#x4E0D;&#x662F;&#x633A;&#x5947;&#x602A;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x4E3A;&#x4E86;&#x9012;&#x5F52;&#x4ED6;&#x672C;&#x8EAB;&#xFF0C;&#x6682;&#x65F6;&#x4E5F;&#x53EA;&#x60F3;&#x5230;&#x8FD9;&#x79CD;&#x529E;&#x6CD5;&#x3002;&#x5982;&#x679C;&#x6709;&#x66F4;&#x597D;&#x7684;&#x529E;&#x6CD5;&#xFF0C;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x6307;&#x6B63;&#x3002;<br><br>&#x90A3;&#x4E48;&#xFF0C;&#x6811;&#x8868;&#x683C;&#x7684;&#x7ED3;&#x6784;&#x5B9E;&#x73B0;&#x5728;&#x54EA;&#x91CC;&#x5462;&#xFF1F;&#xFF1F;&#x5BF9;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x7248;(<code>template</code>)&#x91CC;&#x9762;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8D34;&#x4EE3;&#x7801;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x79FB;&#x6B65;&#x5230;<a href="https://github.com/sijinglei/vue-tree-table/blob/master/src/components/tree-table.vue" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;</a>&#x67E5;&#x770B;&#x3002;<br></p><ul><li>&#x611F;&#x8C22;</li></ul><blockquote>&#x6536;&#x5230;<a href="https://juejin.im/user/5b0d3e2d5188251558575c17" rel="nofollow noreferrer" target="_blank">favourli</a>&#x7684;&#x6307;&#x6B63;&#xFF0C;&#x73B0;&#x5DF2;&#x5C06;&#x539F;&#x6709;&#x5199;&#x6CD5;&#x66F4;&#x65B0;,&#x91C7;&#x7528;<a href="https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%BB%84%E4%BB%B6%E4%B9%8B%E9%97%B4%E7%9A%84%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8" rel="nofollow noreferrer" target="_blank">&#x9012;&#x5F52;&#x7EC4;&#x4EF6;</a>&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x8FD9;&#x6837;&#x9875;&#x9762;&#x770B;&#x8D77;&#x6765;&#x5C31;&#x66F4;&#x6E05;&#x6670;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    components: {
            treeItem: () =&gt; import(&apos;./tree-item.vue&apos;)
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">    components: {
            treeItem: () =&gt; import(&apos;./tree-item.vue&apos;)
    }</code></pre><blockquote>&#x8865;&#x5145;&#x4E00;&#x70B9;&#xFF1A;&#x4E0D;&#x8981;&#x53EA;&#x770B;js&#x90E8;&#x5206;&#xFF0C;css&#x90E8;&#x5206;&#x624D;&#x662F;&#x8FD9;&#x4E2A;&#x6811;&#x8868;&#x683C;&#x7684;&#x5173;&#x5065;&#x6240;&#x5728;&#x3002;&#x5F53;&#x7136;&#x91CC;&#x9762;&#x6211;&#x91C7;&#x7528;&#x4E86;&#x5927;&#x91CF;&#x7684;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x53BB;&#x5224;&#x65AD;&#x5404;&#x79CD;&#x6837;&#x5F0F;&#x7684;&#x5C55;&#x793A;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x662F;&#x5728;<code>initTreeData</code>&#x65B9;&#x6CD5;&#x91CC;&#x9762;&#x53BB;&#x5B9E;&#x73B0;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x5904;&#x7406;&#x6216;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x6211;&#x4EEC;&#x6811;&#x8868;&#x683C;&#x6240;&#x4F7F;&#x7528;&#x7684;&#x4FE1;&#x606F;&#x3002;&#x6BD4;&#x5982;&#x6211;&#x73B0;&#x5728;&#x5728;&#x91CC;&#x9762;&#x5B9E;&#x73B0;&#x7684;&#x5C42;&#x7EA7;&#x7EBF;&#x7684;&#x504F;&#x79FB;&#x91CF;<code>m.bLeft = level === 1 ? 34 : (level - 2) * 16 + 34</code> &#x8FD9;&#x4E2A;&#x8BA1;&#x7B97;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x770B;&#x660E;&#x767D;&#xFF0C;&#x53EF;&#x4EE5;&#x7559;&#x8A00;&#x3002;</blockquote><p>&#x6700;&#x540E;&#xFF0C;&#x6B64;&#x7BC7;&#x4E43;&#x6211;&#x7684;&#x5F00;&#x7BC7;&#x4E4B;&#x4F5C;&#xFF0C;&#x5982;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x8FD8;&#x8BF7;&#x591A;&#x591A;&#x5305;&#x542B;&#xFF0C;&#x591A;&#x591A;&#x6307;&#x6559;&#xFF01;&#xFF01;&#xFF01;&#x987A;&#x4FBF;&#x7ED9;&#x6211;&#x597D;&#x4E45;&#x6CA1;&#x6709;&#x66F4;&#x65B0;&#x7684;&#x535A;&#x5BA2;&#x6253;&#x4E2A;&#x5E7F;&#x544A;,<br>&#x6B22;&#x8FCE;&#x70B9;&#x51FB;&#xFF08;<a href="http://yizuocity.com/" rel="nofollow noreferrer" target="_blank">&lt;span style=&quot;color:#f24c27;font-weight:600&quot;&gt;&#x4E00;&#x5EA7;&#x57CE;&#x6C60;&lt;/span&gt;</a>&#xFF09;</p><ul><li>&#x6E90;&#x7801;&#x5730;&#x5740;<a href="https://github.com/sijinglei/vue-tree-table" rel="nofollow noreferrer" target="_blank">github</a>&#xFF0C;&#x6B22;&#x8FCE;star&#x3002;</li></ul><blockquote>&#x53C2;&#x8003;&#x8D44;&#x6E90;<a href="https://www.cnblogs.com/ychl/p/6075106.html" rel="nofollow noreferrer" target="_blank">&#x9694;&#x58C1;&#x5BB6;&#x7684;&#x8001;&#x9EC4;</a></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue.js实现树形表格的封装

## 原文链接
[https://segmentfault.com/a/1190000015763130](https://segmentfault.com/a/1190000015763130)

