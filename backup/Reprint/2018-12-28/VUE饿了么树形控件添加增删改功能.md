---
title: 'VUE饿了么树形控件添加增删改功能' 
date: 2018-12-28 2:30:11
hidden: true
slug: ge3ockwokek
categories: [reprint]
---

{{< raw >}}

                    
<p>element-ui树形控件：<a href="http://element.eleme.io/1.4/#/zh-CN/component/tree" rel="nofollow noreferrer" target="_blank">地址</a></p>
<p>在原文档中有个案例是有新增和删除功能，但是后来发现其修改的数据并不能直接影响到树形数据，所以采用了 <code>render-content</code> 的API重新写了个组件。<br>写个开发的步骤，所以文章比较长emmm</p>
<hr>
<h2 id="articleHeader0">2018.07.25更新</h2>
<p>elementUI ^2.2.0提供了一个slot的自定义节点方法，相关代码已在<code>github</code>更新，原理一样。</p>
<hr>
<p>大致效果如图：<br><span class="img-wrap"><img data-src="/img/bVWHQd?w=642&amp;h=490" src="https://static.alili.tech/img/bVWHQd?w=642&amp;h=490" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader1">1.省市API</h2>
<p>在网上复制了个省市的list，有两个属性是新增的</p>
<ul>
<li>
<code> isEdit </code>：控制编辑状态</li>
<li>
<code> maxexpandId </code>：为现下id的最大值</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default{
    maxexpandId: 95,
    treelist: [{  
        id: 1,  
        name: &quot;北京市&quot;,  
        ProSort: 1,  
        remark: &quot;直辖市&quot;,
        pid: '',
        isEdit: false,
        children: [{
            id: 35,
            name: &quot;朝阳区&quot;,
            pid: 1,
            remark: '',
            isEdit: false,
            children: []
        }]
    }{...}]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span>{
    <span class="hljs-attribute">maxexpandId</span>: <span class="hljs-number">95</span>,
    <span class="hljs-attribute">treelist</span>: [{  
        <span class="hljs-attribute">id</span>: <span class="hljs-number">1</span>,  
        <span class="hljs-attribute">name</span>: <span class="hljs-string">"北京市"</span>,  
        <span class="hljs-attribute">ProSort</span>: <span class="hljs-number">1</span>,  
        <span class="hljs-attribute">remark</span>: <span class="hljs-string">"直辖市"</span>,
        <span class="hljs-attribute">pid</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attribute">isEdit</span>: false,
        <span class="hljs-attribute">children</span>: [{
            <span class="hljs-attribute">id</span>: <span class="hljs-number">35</span>,
            <span class="hljs-attribute">name</span>: <span class="hljs-string">"朝阳区"</span>,
            <span class="hljs-attribute">pid</span>: <span class="hljs-number">1</span>,
            <span class="hljs-attribute">remark</span>: <span class="hljs-string">''</span>,
            <span class="hljs-attribute">isEdit</span>: false,
            <span class="hljs-attribute">children</span>: []
        }]
    }{...}]
}</code></pre>
<hr>
<h2 id="articleHeader2">2.el-tree Component基本</h2>
<p>咱们一步步来，先写个饿了么的组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <el-tree ref=&quot;expandMenuList&quot; class=&quot;expand-tree&quot;
        v-if=&quot;isLoadingTree&quot;
        :data=&quot;setTree&quot;
        node-key=&quot;id&quot;
        highlight-current
        :props=&quot;defaultProps&quot;
        :expand-on-click-node=&quot;false&quot;
        :render-content=&quot;renderContent&quot;
        :default-expanded-keys=&quot;defaultExpandKeys&quot;></el-tree>
</template>
<!--
* highlight-current ：为了点击时节点高亮
* expand-on-click-node : 只能箭头控制树形的展开收缩
* render-content : 节点渲染方式
* default-expanded-keys ：默认展开节点
-->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-tree</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"expandMenuList"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"expand-tree"</span>
        <span class="hljs-attr">v-if</span>=<span class="hljs-string">"isLoadingTree"</span>
        <span class="hljs-attr">:data</span>=<span class="hljs-string">"setTree"</span>
        <span class="hljs-attr">node-key</span>=<span class="hljs-string">"id"</span>
        <span class="hljs-attr">highlight-current</span>
        <span class="hljs-attr">:props</span>=<span class="hljs-string">"defaultProps"</span>
        <span class="hljs-attr">:expand-on-click-node</span>=<span class="hljs-string">"false"</span>
        <span class="hljs-attr">:render-content</span>=<span class="hljs-string">"renderContent"</span>
        <span class="hljs-attr">:default-expanded-keys</span>=<span class="hljs-string">"defaultExpandKeys"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-tree</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-comment">&lt;!--
* highlight-current ：为了点击时节点高亮
* expand-on-click-node : 只能箭头控制树形的展开收缩
* render-content : 节点渲染方式
* default-expanded-keys ：默认展开节点
--&gt;</span></code></pre>
<p>同时引入API和节点渲染的组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import TreeRender from '@/components/tree_render'
import api from '@/resource/api'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> TreeRender <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/tree_render'</span>
<span class="hljs-keyword">import</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">'@/resource/api'</span></code></pre>
<p>然后搭建好基础</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
  return{
    maxexpandId: api.maxexpandId,//新增节点开始id
    non_maxexpandId: api.maxexpandId,//新增节点开始id(不更改)
    isLoadingTree: false,//是否加载节点树
    setTree: api.treelist,//节点树数据
    defaultProps: {
      children: 'children',
      label: 'name'
    },
    defaultExpandKeys: [],//默认展开节点列表
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">data</span><span class="hljs-params">()</span></span>{
  return{
    maxexpandId: api<span class="hljs-selector-class">.maxexpandId</span>,<span class="hljs-comment">//新增节点开始id</span>
    non_maxexpandId: api<span class="hljs-selector-class">.maxexpandId</span>,<span class="hljs-comment">//新增节点开始id(不更改)</span>
    isLoadingTree: false,<span class="hljs-comment">//是否加载节点树</span>
    setTree: api<span class="hljs-selector-class">.treelist</span>,<span class="hljs-comment">//节点树数据</span>
    defaultProps: {
      children: <span class="hljs-string">'children'</span>,
      <span class="hljs-selector-tag">label</span>: <span class="hljs-string">'name'</span>
    },
    defaultExpandKeys: [],<span class="hljs-comment">//默认展开节点列表</span>
  }
},</code></pre>
<p>添加个渲染的method</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    renderContent(h,{node,data,store}){
      let that = this;//指向vue
      return h(TreeRender,{
        props: {
          DATA: data,//节点数据
          NODE: node,//节点内容
          STORE: store,//完整树形内容
        },
        on: {//绑定方法
          nodeAdd: ((s,d,n) => that.handleAdd(s,d,n)),
          nodeEdit: ((s,d,n) => that.handleEdit(s,d,n)),
          nodeDel: ((s,d,n) => that.handleDelete(s,d,n))
        }
      });
    },
    handleAdd(s,d,n){//增加节点
      console.log(s,d,n)
    },
    handleEdit(s,d,n){//编辑节点
      console.log(s,d,n)
    },
    handleDelete(s,d,n){//删除节点
      console.log(s,d,n)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>methods: {
    renderContent(h,{node,data,store}){
      <span class="hljs-keyword">let</span> that = <span class="hljs-keyword">this</span>;<span class="hljs-comment">//指向vue</span>
      <span class="hljs-keyword">return</span> h(TreeRender,{
        props: {
          DATA: data,<span class="hljs-comment">//节点数据</span>
          NODE: node,<span class="hljs-comment">//节点内容</span>
          STORE: store,<span class="hljs-comment">//完整树形内容</span>
        },
        on: {<span class="hljs-comment">//绑定方法</span>
          nodeAdd: <span class="hljs-function">(<span class="hljs-params">(<span class="hljs-params">s,d,n</span>) =&gt; that.handleAdd(<span class="hljs-params">s,d,n</span>)</span>),
          <span class="hljs-params">nodeEdit</span>: (<span class="hljs-params">(<span class="hljs-params">s,d,n</span>) =&gt; that.handleEdit(<span class="hljs-params">s,d,n</span>)</span>),
          <span class="hljs-params">nodeDel</span>: (<span class="hljs-params">(<span class="hljs-params">s,d,n</span>) =&gt; that.handleDelete(<span class="hljs-params">s,d,n</span>)</span>)
        }
      });
    },
    <span class="hljs-params">handleAdd</span>(<span class="hljs-params">s,d,n</span>){//增加节点
      <span class="hljs-params">console</span>.<span class="hljs-params">log</span>(<span class="hljs-params">s,d,n</span>)
    },
    <span class="hljs-params">handleEdit</span>(<span class="hljs-params">s,d,n</span>){//编辑节点
      <span class="hljs-params">console</span>.<span class="hljs-params">log</span>(<span class="hljs-params">s,d,n</span>)
    },
    <span class="hljs-params">handleDelete</span>(<span class="hljs-params">s,d,n</span>){//删除节点
      <span class="hljs-params">console</span>.<span class="hljs-params">log</span>(<span class="hljs-params">s,d,n</span>)
    }
}</span></code></pre>
<h2 id="articleHeader3">3.tree_render Component基本</h2>
<p>渲染组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <span class=&quot;tree-expand&quot;>
        <span class=&quot;tree-label&quot;>
            <span>"{{"DATA.name"}}"</span>
        </span>
        <span class=&quot;tree-btn&quot;>
            <i class=&quot;el-icon-plus&quot; @click.stop=&quot;nodeAdd(STORE,DATA,NODE)&quot;></i>
            <i class=&quot;el-icon-edit&quot; @click.stop=&quot;nodeEdit(STORE,DATA,NODE)&quot;></i>
            <i class=&quot;el-icon-delete&quot; @click.stop=&quot;nodeDel(STORE,DATA,NODE)&quot;></i>
        </span>
    </span>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tree-expand"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tree-label"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"DATA.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tree-btn"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-plus"</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"nodeAdd(STORE,DATA,NODE)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-edit"</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"nodeEdit(STORE,DATA,NODE)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-delete"</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"nodeDel(STORE,DATA,NODE)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>添加好几个按钮（element-ui自带icon：<a href="http://element.eleme.io/1.4/#/zh-CN/component/icon" rel="nofollow noreferrer" target="_blank">地址</a>）对应的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default{
    props: ['NODE', 'DATA', 'STORE'],
    methods: {
      nodeAdd(s,d,n){//新增
        this.$emit('nodeAdd',s,d,n)
      },
      nodeEdit(s,d,n){//编辑
        this.$emit('nodeEdit',s,d,n)
      },
      nodeDel(s,d,n){//删除
        this.$emit('nodeDel',s,d,n)
      }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>export <span class="hljs-keyword">default</span>{
    props: [<span class="hljs-string">'NODE'</span>, <span class="hljs-string">'DATA'</span>, <span class="hljs-string">'STORE'</span>],
    methods: {
      nodeAdd(s,d,n){<span class="hljs-comment">//新增</span>
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'nodeAdd'</span>,s,d,n)
      },
      nodeEdit(s,d,n){<span class="hljs-comment">//编辑</span>
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'nodeEdit'</span>,s,d,n)
      },
      nodeDel(s,d,n){<span class="hljs-comment">//删除</span>
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'nodeDel'</span>,s,d,n)
      }
    }
}</code></pre>
<h2 id="articleHeader4">4.改</h2>
<p>我们用<code>isEdit</code>来切换<code>input</code>和<code>span</code>的显示状态，首先加个input：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- tree_render component -->
<template>
    <span class=&quot;tree-expand&quot;>
        <span class=&quot;tree-label&quot; v-if=&quot;DATA.isEdit&quot;>
            <el-input class=&quot;edit&quot; size=&quot;mini&quot;
            :ref=&quot;'treeInput'+DATA.id&quot;
            v-model=&quot;DATA.name&quot;></el-input>
        </span>
        <template v-else>
            <span class=&quot;tree-label&quot;>
                <span>"{{"DATA.name"}}"</span>
            </span>
            <span class=&quot;tree-btn&quot; v-show=&quot;!DATA.isEdit&quot;>
                <i class=&quot;el-icon-plus&quot; @click.stop=&quot;nodeAdd(STORE,DATA,NODE)&quot;></i>
                <i class=&quot;el-icon-edit&quot; @click.stop=&quot;nodeEdit(STORE,DATA,NODE)&quot;></i>
                <i class=&quot;el-icon-delete&quot; @click.stop=&quot;nodeDel(STORE,DATA,NODE)&quot;></i>
            </span>
        </template>
    </span>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- tree_render component --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tree-expand"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tree-label"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"DATA.isEdit"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"edit"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"mini"</span>
            <span class="hljs-attr">:ref</span>=<span class="hljs-string">"'treeInput'+DATA.id"</span>
            <span class="hljs-attr">v-model</span>=<span class="hljs-string">"DATA.name"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-else</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tree-label"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"DATA.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tree-btn"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"!DATA.isEdit"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-plus"</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"nodeAdd(STORE,DATA,NODE)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-edit"</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"nodeEdit(STORE,DATA,NODE)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-delete"</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"nodeDel(STORE,DATA,NODE)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>编辑的时候按钮同时消失，那么什么时候编辑完成呢？</p>
<ul>
<li>编辑完按enter键=》监听input的enter输入</li>
<li>点击其他节点=》input失焦-<code>blur</code>=》编辑时自动聚焦-<code>focus</code>
</li>
<li>点击当前节点范围</li>
</ul>
<p>当以上三点发生一项，节点对应的data都要<code>isEdit = false;</code></p>
<ol>
<li>
<p>enter键</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- tree_render component -->
<el-input @keyup.enter.native=&quot;nodeEditPass(STORE,DATA,NODE)&quot;></el-input>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- tree_render component --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> @<span class="hljs-attr">keyup.enter.native</span>=<span class="hljs-string">"nodeEditPass(STORE,DATA,NODE)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span></code></pre>
<p>添加方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//tree_render component
methods: {
    nodeEditPass(s,d,n){
        d.isEdit = false;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//tree_render component</span>
<span class="hljs-string">methods:</span> {
    nodeEditPass(s,d,n){
        d.isEdit = <span class="hljs-literal">false</span>;
    }
}</code></pre>
</li>
<li>
<p><code>focus or blur</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- tree_render component -->
<el-input @blur=&quot;nodeEditPass(STORE,DATA,NODE)&quot;></el-input>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- tree_render component --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> @<span class="hljs-attr">blur</span>=<span class="hljs-string">"nodeEditPass(STORE,DATA,NODE)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span></code></pre>
<p>后来发现第一次编辑时能让<code>input</code>聚焦，点击第二个<code>input</code>就不起作用了，加了<code>autofocus</code>属性也同样如此。所以我们要在点击编辑<code>icon</code>的时候，用原生的<code>input autofocus</code>。<br>  修改方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//tree_render component
nodeEdit(s,d,n){//编辑
  d.isEdit = true;
  this.$nextTick(() => {
    this.$refs['treeInput'+d.id].$refs.input.focus()
  })
  this.$emit('nodeEdit',s,d,n)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//tree_render component</span>
nodeEdit(s,d,n){<span class="hljs-comment">//编辑</span>
  d.isEdit = <span class="hljs-literal">true</span>;
  <span class="hljs-keyword">this</span>.$nextTick(() =&gt; {
    <span class="hljs-keyword">this</span>.$refs[<span class="hljs-string">'treeInput'</span>+d.id].$refs.input.focus()
  })
  <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'nodeEdit'</span>,s,d,n)
}</code></pre>
</li>
<li>
<p><strong>当前节点</strong>点击<br>  采用<code>el-tree</code>已有的API——<code>node-click</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- el-tree component -->
<el-tree @node-click=&quot;handleNodeClick&quot;></el-tree>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- el-tree component --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-tree</span> @<span class="hljs-attr">node-click</span>=<span class="hljs-string">"handleNodeClick"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-tree</span>&gt;</span></code></pre>
<p>添加methods：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//el-tree component
methods: {
    handleNodeClick(d,n,s){//点击节点
      d.isEdit = false;//放弃编辑状态
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//el-tree component</span>
<span class="hljs-string">methods:</span> {
    handleNodeClick(d,n,s){<span class="hljs-comment">//点击节点</span>
      d.isEdit = <span class="hljs-literal">false</span>;<span class="hljs-comment">//放弃编辑状态</span>
    }
}</code></pre>
<p>问题来了，如果在编辑状态下点击此节点也同样会影响input，这就无法进入编辑，所以要阻止input<strong>事件冒泡</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- tree_render component -->
<el-input @click.stop.native=&quot;nodeEditFocus&quot;></el-input>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- tree_render component --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> @<span class="hljs-attr">click.stop.native</span>=<span class="hljs-string">"nodeEditFocus"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span></code></pre>
<p>添加methods：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//tree_render component
methods: {
    nodeEditFocus(){}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">//tree_render component</span>
<span class="hljs-symbol">methods:</span> {
    nodeEditFocus(){}
}</code></pre>
</li>
<li>
<code>v-show</code>代替<code>v-if</code>
</li>
</ol>
<p>这里有个新的问题，当用户经常编辑修改，<code>v-if</code>模板的开销更高，所以改用v-show。而后者不支持template模板，所以要适当调整一下位置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <span class=&quot;tree-expand&quot;>
        <span class=&quot;tree-label&quot; v-show=&quot;DATA.isEdit&quot;>
            <el-input class=&quot;edit&quot; size=&quot;mini&quot; autofocus
            v-model=&quot;DATA.name&quot;
            :ref=&quot;'treeInput'+DATA.id&quot;
            @click.stop.native=&quot;nodeEditFocus&quot;
            @blur=&quot;nodeEditPass(STORE,DATA,NODE)&quot;
            @keyup.enter.native=&quot;nodeEditPass(STORE,DATA,NODE)&quot;></el-input>
        </span>
        <span v-show=&quot;!DATA.isEdit&quot;>
            <span>"{{"DATA.name"}}"</span>
        </span>
        <span class=&quot;tree-btn&quot; v-show=&quot;!DATA.isEdit&quot;>
            <i class=&quot;el-icon-plus&quot; @click.stop=&quot;nodeAdd(STORE,DATA,NODE)&quot;></i>
            <i class=&quot;el-icon-edit&quot; @click.stop=&quot;nodeEdit(STORE,DATA,NODE)&quot;></i>
            <i class=&quot;el-icon-delete&quot; @click.stop=&quot;nodeDel(STORE,DATA,NODE)&quot;></i>
        </span>
    </span>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;template&gt;
    &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"tree-expand"</span>&gt;
        &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"tree-label"</span> v-show=<span class="hljs-string">"DATA.isEdit"</span>&gt;
            &lt;el-<span class="hljs-selector-tag">input</span> class=<span class="hljs-string">"edit"</span> size=<span class="hljs-string">"mini"</span> autofocus
            v-model=<span class="hljs-string">"DATA.name"</span>
            :ref=<span class="hljs-string">"'treeInput'+DATA.id"</span>
            @click<span class="hljs-selector-class">.stop</span><span class="hljs-selector-class">.native</span>=<span class="hljs-string">"nodeEditFocus"</span>
            @blur=<span class="hljs-string">"nodeEditPass(STORE,DATA,NODE)"</span>
            @keyup<span class="hljs-selector-class">.enter</span><span class="hljs-selector-class">.native</span>=<span class="hljs-string">"nodeEditPass(STORE,DATA,NODE)"</span>&gt;&lt;/el-input&gt;
        &lt;/span&gt;
        &lt;<span class="hljs-selector-tag">span</span> v-show=<span class="hljs-string">"!DATA.isEdit"</span>&gt;
            &lt;span&gt;"{{"DATA.name"}}"&lt;/span&gt;
        &lt;/span&gt;
        &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"tree-btn"</span> v-show=<span class="hljs-string">"!DATA.isEdit"</span>&gt;
            &lt;<span class="hljs-selector-tag">i</span> class=<span class="hljs-string">"el-icon-plus"</span> @click.stop=<span class="hljs-string">"nodeAdd(STORE,DATA,NODE)"</span>&gt;&lt;/i&gt;
            &lt;<span class="hljs-selector-tag">i</span> class=<span class="hljs-string">"el-icon-edit"</span> @click.stop=<span class="hljs-string">"nodeEdit(STORE,DATA,NODE)"</span>&gt;&lt;/i&gt;
            &lt;<span class="hljs-selector-tag">i</span> class=<span class="hljs-string">"el-icon-delete"</span> @click.stop=<span class="hljs-string">"nodeDel(STORE,DATA,NODE)"</span>&gt;&lt;/i&gt;
        &lt;/span&gt;
    &lt;/span&gt;
&lt;/template&gt;</code></pre>
<h2 id="articleHeader5">5.增</h2>
<p>新增节点 =》添加一条数据</p>
<ol>
<li>新增的同时展开父节点</li>
<li>是否考虑无限新增</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//el-tree component
handleAdd(s,d,n){//增加节点
  console.log(s,d,n)
  if(n.level >=6){
    this.$message.error(&quot;最多只支持五级！&quot;)
    return false;
  }
  //添加数据
  d.children.push({
    id: ++this.maxexpandId,
    name: '新增节点',
    pid: d.id,
    isEdit: false,
    children: []
  });
  //展开节点
  if(!n.expanded){
    n.expanded = true;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//el-tree component</span>
handleAdd(s,d,n){<span class="hljs-comment">//增加节点</span>
  console.log(s,d,n)
  <span class="hljs-keyword">if</span>(n.level &gt;=<span class="hljs-number">6</span>){
    <span class="hljs-keyword">this</span>.$message.error(<span class="hljs-string">"最多只支持五级！"</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
  <span class="hljs-comment">//添加数据</span>
  d.children.push({
    id: ++<span class="hljs-keyword">this</span>.maxexpandId,
    name: <span class="hljs-string">'新增节点'</span>,
    pid: d.id,
    isEdit: <span class="hljs-literal">false</span>,
    children: []
  });
  <span class="hljs-comment">//展开节点</span>
  <span class="hljs-keyword">if</span>(!n.expanded){
    n.expanded = <span class="hljs-literal">true</span>;
  }
}</code></pre>
<p>新增节点字体加粗 =》给节点添加一个class =》 如何判断是否新增？<br>我们有一个参数<code>maxexpandId</code><br>给<code>tree_render</code>添加一个<code>prop</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//el-tree component
renderContent(h,{node,data,store}){//加载节点
  let that = this;
  return h(TreeRender,{
    props: {
      ...
      maxexpandId: that.non_maxexpandId
    },
    on: {...}
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>//el-tree component
renderContent(h,{node,data,store}){//加载节点
  <span class="hljs-keyword">let</span> that = this;
  <span class="hljs-keyword">return</span> h(<span class="hljs-type">TreeRender</span>,{
    props: {
      ...
      maxexpandId: that.non_maxexpandId
    },
    on: <span class="hljs-meta">{...}</span>
  });
}</code></pre>
<p>根据id判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//tree_render component
props: ['NODE', 'DATA', 'STORE', 'maxexpandId']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//tree_render component</span>
<span class="hljs-string">props:</span> [<span class="hljs-string">'NODE'</span>, <span class="hljs-string">'DATA'</span>, <span class="hljs-string">'STORE'</span>, <span class="hljs-string">'maxexpandId'</span>]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- tree_render component -->
<span v-show=&quot;!DATA.isEdit&quot; 
:class=&quot;[DATA.id > maxexpandId ? 'tree-new tree-label' : 'tree-label']&quot;
:ref=&quot;'treeLabel'+DATA.id&quot;>
    <span>"{{"DATA.name"}}"</span>
</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- tree_render component --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"!DATA.isEdit"</span> 
<span class="hljs-attr">:class</span>=<span class="hljs-string">"[DATA.id &gt; maxexpandId ? 'tree-new tree-label' : 'tree-label']"</span>
<span class="hljs-attr">:ref</span>=<span class="hljs-string">"'treeLabel'+DATA.id"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"DATA.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".tree-expand .tree-label.tree-new{
    font-weight:600;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.tree-expand</span> <span class="hljs-selector-class">.tree-label</span><span class="hljs-selector-class">.tree-new</span>{
    <span class="hljs-attribute">font-weight</span>:<span class="hljs-number">600</span>;
}</code></pre>
<h2 id="articleHeader6">6.删</h2>
<p>跟新增同义：删除节点 =》删除一条数据</p>
<ol>
<li>新增节点直接删除</li>
<li>已有节点需提示再删除</li>
<li>已有子级节点不能删除</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleDelete(s,d,n){//删除节点
  console.log(s,d,n)
  let that = this;
  //有子级不删除
  if(d.children &amp;&amp; d.children.length !== 0){
    this.$message.error(&quot;此节点有子级，不可删除！&quot;)
    return false;
  }else{
    //删除操作
    let delNode = () => {
      let list = n.parent.data.children || n.parent.data,
      //节点同级数据，顶级节点时无children
        _index = 99999;//要删除的index
      list.map((c,i) => {
        if(d.id == c.id){
          _index = i;
        }
      })
      let k = list.splice(_index,1);
      //console.log(_index,k)
      this.$message.success(&quot;删除成功！&quot;)
    }
    let isDel = () => {
      that.$confirm(&quot;是否删除此节点？&quot;,&quot;提示&quot;,{
        confirmButtonText: &quot;确认&quot;,
        cancelButtonText: &quot;取消&quot;,
        type: &quot;warning&quot;
      }).then(() => {
        delNode()//此处可通过ajax做删除操作
      }).catch(() => {
        return false;
      })
    }
    //新增节点直接删除，否则要通过请求数据删除
    d.id > this.non_maxexpandId ? delNode() : isDel()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>handleDelete(s,d,n){<span class="hljs-comment">//删除节点</span>
  <span class="hljs-built_in">console</span>.log(s,d,n)
  <span class="hljs-keyword">let</span> that = <span class="hljs-keyword">this</span>;
  <span class="hljs-comment">//有子级不删除</span>
  <span class="hljs-keyword">if</span>(d.children &amp;&amp; d.children.length !== <span class="hljs-number">0</span>){
    <span class="hljs-keyword">this</span>.$message.error(<span class="hljs-string">"此节点有子级，不可删除！"</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }<span class="hljs-keyword">else</span>{
    <span class="hljs-comment">//删除操作</span>
    <span class="hljs-keyword">let</span> delNode = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">let</span> list = n.parent.data.children || n.parent.data,
      <span class="hljs-comment">//节点同级数据，顶级节点时无children</span>
        _index = <span class="hljs-number">99999</span>;<span class="hljs-comment">//要删除的index</span>
      list.map(<span class="hljs-function">(<span class="hljs-params">c,i</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span>(d.id == c.id){
          _index = i;
        }
      })
      <span class="hljs-keyword">let</span> k = list.splice(_index,<span class="hljs-number">1</span>);
      <span class="hljs-comment">//console.log(_index,k)</span>
      <span class="hljs-keyword">this</span>.$message.success(<span class="hljs-string">"删除成功！"</span>)
    }
    <span class="hljs-keyword">let</span> isDel = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      that.$confirm(<span class="hljs-string">"是否删除此节点？"</span>,<span class="hljs-string">"提示"</span>,{
        confirmButtonText: <span class="hljs-string">"确认"</span>,
        cancelButtonText: <span class="hljs-string">"取消"</span>,
        <span class="hljs-keyword">type</span>: <span class="hljs-string">"warning"</span>
      }).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        delNode()<span class="hljs-comment">//此处可通过ajax做删除操作</span>
      }).catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      })
    }
    <span class="hljs-comment">//新增节点直接删除，否则要通过请求数据删除</span>
    d.id &gt; <span class="hljs-keyword">this</span>.non_maxexpandId ? delNode() : isDel()
  }
}</code></pre>
<h2 id="articleHeader7">7.拓展</h2>
<p>还有一些特别的需求，例如：</p>
<ol>
<li>
<p>点击高亮的时候显示icon</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".expand-tree .is-current>.el-tree-node__content .tree-btn,
.expand-tree .el-tree-node__content:hover .tree-btn{
  display: inline-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.expand-tree</span> <span class="hljs-selector-class">.is-current</span>&gt;<span class="hljs-selector-class">.el-tree-node__content</span> <span class="hljs-selector-class">.tree-btn</span>,
<span class="hljs-selector-class">.expand-tree</span> <span class="hljs-selector-class">.el-tree-node__content</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.tree-btn</span>{
  <span class="hljs-attribute">display</span>: inline-block;
}</code></pre>
</li>
<li>
<p>添加顶级节点<br>   添加按钮：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- el-tree component -->
<el-button @click=&quot;handleAddTop&quot;>添加顶级节点</el-button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- el-tree component --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleAddTop"</span>&gt;</span>添加顶级节点<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span></code></pre>
<p>添加methods：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//el-tree component
methods: {
  handleAddTop(){
    this.setTree.push({
      id: ++this.maxexpandId,
      name: '新增节点',
      pid: '',
      isEdit: false,
      children: []
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//el-tree component</span>
<span class="hljs-attribute">methods</span>: {
  handleAddTop(){
    this.setTree.push({
      <span class="hljs-attribute">id</span>: ++this.maxexpandId,
      <span class="hljs-attribute">name</span>: <span class="hljs-string">'新增节点'</span>,
      <span class="hljs-attribute">pid</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attribute">isEdit</span>: false,
      <span class="hljs-attribute">children</span>: []
    })
  }
}</code></pre>
</li>
<li>
<p>默认展开树形第一级</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//el-tree component
mounted(){
  this.initExpand()
},
methods: {
  initExpand(){
    //isLoadingTree用意也是在此
    this.setTree.map((a) => {
      this.defaultExpandKeys.push(a.id)
    });
    this.isLoadingTree = true;
  },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//el-tree component</span>
mounted(){
  <span class="hljs-keyword">this</span>.initExpand()
},
methods: {
  initExpand(){
    <span class="hljs-comment">//isLoadingTree用意也是在此</span>
    <span class="hljs-keyword">this</span>.setTree.map((a) =&gt; {
      <span class="hljs-keyword">this</span>.defaultExpandKeys.push(a.id)
    });
    <span class="hljs-keyword">this</span>.isLoadingTree = <span class="hljs-literal">true</span>;
  },
}</code></pre>
</li>
</ol>
<h2 id="articleHeader8">8.github</h2>
<p>还有些具体的样式都放在<a href="https://github.com/xiaoniezi/tree" rel="nofollow noreferrer" target="_blank">github</a>了</p>
<p><strong>如有错漏，欢迎指正╰(<em> ◕ ▽ ◕ </em>)╯</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE饿了么树形控件添加增删改功能

## 原文链接
[https://segmentfault.com/a/1190000011574698](https://segmentfault.com/a/1190000011574698)

