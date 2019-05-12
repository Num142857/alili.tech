---
title: 'vue基于Element构建自定义树' 
date: 2018-12-31 2:30:29
hidden: true
slug: r8hc5bduqxc
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">说明</h1>
<hr>
<p>做项目的时候要使用到一个自定义的树形控件来构建表格树，在github上搜了一下没有搜索到合适的（好看的）可以直接用的，查看Element的组件说明时发现它的<a href="http://element.eleme.io/#/zh-CN/component/tree" rel="nofollow noreferrer" target="_blank">Tree控件</a>可以使用render来自定义节点样式，于是基于它封装了一个可以增、删、改的树形组件，现在分享一下它的使用与实现。</p>
<h2 id="articleHeader1">控件演示</h2>
<p>github上挂的gif可能会比较卡，有没有大佬知道还有哪里可以挂静态资源的，谢谢。。！<br><span class="img-wrap"><img data-src="/img/remote/1460000011239989" src="https://static.alili.tech/img/remote/1460000011239989" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">控件使用</h2>
<hr>
<h4>概要</h4>
<ul>
<li>基于element-ui树形控件的二次封装</li>
<li>提供编辑、删除节点的接口</li>
<li>提供一个next钩子，在业务处理失败时可使用next(false)回滚操作</li>
<li>控件源码见 <a href="https://github.com/calebman/vue-DBM" rel="nofollow noreferrer" target="_blank">github</a>
</li>
</ul>
<h4>文档</h4>
<ul><li>props</li></ul>
<table>
<thead><tr>
<th>属性</th>
<th>说明</th>
<th>类型</th>
</tr></thead>
<tbody><tr>
<td>value</td>
<td>源数据，可使用v-model双向绑定</td>
<td>Array</td>
</tr></tbody>
</table>
<ul><li>events</li></ul>
<table>
<thead><tr>
<th>事件名</th>
<th>说明</th>
<th>参数</th>
</tr></thead>
<tbody>
<tr>
<td>SaveEdit</td>
<td>点击编辑或者添加树节点后的保存事件</td>
<td>(父节点数据、当前节点数据、next)</td>
</tr>
<tr>
<td>DelNode</td>
<td>删除节点事件</td>
<td>(父节点数据、当前节点数据、next)</td>
</tr>
<tr>
<td>NodeClick</td>
<td>节点点击事件</td>
<td>(当前节点数据)</td>
</tr>
</tbody>
</table>
<ul><li>源数据描述</li></ul>
<table>
<thead><tr>
<th>属性</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>value</td>
<td>树节点的唯一标识</td>
</tr>
<tr>
<td>label</td>
<td>树节点的显示名称</td>
</tr>
<tr>
<td>status</td>
<td>(1：编辑状态)(0：显示状态)(-1不可编辑状态)</td>
</tr>
<tr>
<td>children</td>
<td>子节点数据</td>
</tr>
</tbody>
</table>
<ul><li>调用示例</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <m-tree
    v-model=&quot;tableTree&quot;
    @SaveEdit=&quot;SaveEdit&quot;
    @DelNode=&quot;DelNode&quot;
    @NodeClick=&quot;handleNodeClick&quot;></m-tree>

SaveEdit(parentNode,data,next){
    var param = {
      parentNode:parentNode,
      node:data
    }
    this.$http.post(URL,param).then((response) => {
      if(response.status == 200){
        next(true,response.body.data.nodeId)
      }else{
        next(false)
      }
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code> &lt;m-tree
    v-model=<span class="hljs-string">"tableTree"</span>
    @SaveEdit=<span class="hljs-string">"SaveEdit"</span>
    @DelNode=<span class="hljs-string">"DelNode"</span>
    @NodeClick=<span class="hljs-string">"handleNodeClick"</span>&gt;&lt;/m-tree&gt;

SaveEdit(parentNode,data,<span class="hljs-built_in">next</span>){
    var param = {
      <span class="hljs-name">parentNode</span>:parentNode,
      <span class="hljs-name">node</span>:data
    }
    this.$http.post(URL,param).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(response)</span> =&gt;</span> {
      <span class="hljs-keyword">if</span>(response.status == <span class="hljs-number">200</span>){
        <span class="hljs-built_in">next</span>(<span class="hljs-literal">true</span>,response.body.data.nodeId)
      }<span class="hljs-keyword">else</span>{
        <span class="hljs-built_in">next</span>(<span class="hljs-literal">false</span>)
      }
    })
}</code></pre>
<h2 id="articleHeader3">实现方式</h2>
<hr>
<ul><li>构建子节点的模板</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <span class=&quot;span_item&quot;>
    <span @click=&quot;Expanded&quot;>
      <Input v-if=&quot;node.status == 1&quot; style=&quot;width: 100px;&quot; v-model=&quot;node.label&quot; size=&quot;small&quot; ></Input>
      <Icon  v-if=&quot;node.status == 0&quot; type=&quot;asterisk&quot;></Icon>
      <Icon v-if=&quot;node.status == -1&quot; type=&quot;ios-keypad-outline&quot;></Icon>
      <span v-if=&quot;node.status != 1&quot;>"{{"node.label"}}"</span>
    </span>
    <span v-if=&quot;node.status == 1&quot;>
      <Button  style=&quot;margin-left: 8px;&quot; size=&quot;small&quot; type=&quot;success&quot; icon=&quot;checkmark-circled&quot; @click=&quot;SaveEdit&quot;>确认</Button>
      <Button style=&quot;margin-left: 8px;&quot; size=&quot;small&quot; type=&quot;ghost&quot; icon=&quot;checkmark-circled&quot; @click=&quot;CancelEdit&quot;>取消</Button>
    </span>
    <span class=&quot;span_icon&quot;>
       <Icon v-if=&quot;node.status == 0&quot; style=&quot;margin-left: 8px&quot; color=&quot;gray&quot; type=&quot;edit&quot; size=&quot;16&quot; @click.native=&quot;OpenEdit&quot;></Icon>
       <Icon v-if=&quot;node.status == 0&quot; style=&quot;margin-left: 8px&quot; type=&quot;plus-round&quot; color=&quot;gray&quot; size=&quot;16&quot; @click.native=&quot;Append&quot;></Icon>
       <Icon v-if=&quot;node.status == 0&amp;&amp;node.children.length < 1&quot; style=&quot;margin-left: 8px&quot; type=&quot;ios-trash&quot; color=&quot;red&quot; size=&quot;18&quot; @click.native=&quot;Delete&quot;></Icon>
    </span>
  </span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>  &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"span_item"</span>&gt;
    &lt;span <span class="hljs-meta">@click</span>=<span class="hljs-string">"Expanded"</span>&gt;
      &lt;<span class="hljs-type">Input</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"node.status == 1"</span> style=<span class="hljs-string">"width: 100px;"</span> v-model=<span class="hljs-string">"node.label"</span> size=<span class="hljs-string">"small"</span> &gt;&lt;/<span class="hljs-type">Input</span>&gt;
      &lt;<span class="hljs-type">Icon</span>  v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"node.status == 0"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"asterisk"</span>&gt;&lt;/<span class="hljs-type">Icon</span>&gt;
      &lt;<span class="hljs-type">Icon</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"node.status == -1"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"ios-keypad-outline"</span>&gt;&lt;/<span class="hljs-type">Icon</span>&gt;
      &lt;span v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"node.status != 1"</span>&gt;"{{"node.label"}}"&lt;/span&gt;
    &lt;/span&gt;
    &lt;span v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"node.status == 1"</span>&gt;
      &lt;<span class="hljs-type">Button</span>  style=<span class="hljs-string">"margin-left: 8px;"</span> size=<span class="hljs-string">"small"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"success"</span> icon=<span class="hljs-string">"checkmark-circled"</span> <span class="hljs-meta">@click</span>=<span class="hljs-string">"SaveEdit"</span>&gt;确认&lt;/<span class="hljs-type">Button</span>&gt;
      &lt;<span class="hljs-type">Button</span> style=<span class="hljs-string">"margin-left: 8px;"</span> size=<span class="hljs-string">"small"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"ghost"</span> icon=<span class="hljs-string">"checkmark-circled"</span> <span class="hljs-meta">@click</span>=<span class="hljs-string">"CancelEdit"</span>&gt;取消&lt;/<span class="hljs-type">Button</span>&gt;
    &lt;/span&gt;
    &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"span_icon"</span>&gt;
       &lt;<span class="hljs-type">Icon</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"node.status == 0"</span> style=<span class="hljs-string">"margin-left: 8px"</span> color=<span class="hljs-string">"gray"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"edit"</span> size=<span class="hljs-string">"16"</span> <span class="hljs-meta">@click</span>.native=<span class="hljs-string">"OpenEdit"</span>&gt;&lt;/<span class="hljs-type">Icon</span>&gt;
       &lt;<span class="hljs-type">Icon</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"node.status == 0"</span> style=<span class="hljs-string">"margin-left: 8px"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"plus-round"</span> color=<span class="hljs-string">"gray"</span> size=<span class="hljs-string">"16"</span> <span class="hljs-meta">@click</span>.native=<span class="hljs-string">"Append"</span>&gt;&lt;/<span class="hljs-type">Icon</span>&gt;
       &lt;<span class="hljs-type">Icon</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"node.status == 0&amp;&amp;node.children.length &lt; 1"</span> style=<span class="hljs-string">"margin-left: 8px"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"ios-trash"</span> color=<span class="hljs-string">"red"</span> size=<span class="hljs-string">"18"</span> <span class="hljs-meta">@click</span>.native=<span class="hljs-string">"Delete"</span>&gt;&lt;/<span class="hljs-type">Icon</span>&gt;
    &lt;/span&gt;
  &lt;/span&gt;</code></pre>
<ul><li>子节点通过$emit通知父节点事件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SaveEdit(){
    //保存节点事件
    this.$emit('SaveEdit',this.nodeData)
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>SaveEdit(){
    <span class="hljs-comment">//保存节点事件</span>
    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'SaveEdit'</span>,<span class="hljs-keyword">this</span>.nodeData)
},</code></pre>
<ul><li>父节点核心实现，使用renderContent函数加载子节点模板，点击保存节点时将业务参数保存在runParam中用于在业务操作失败（网络请求失败、服务端异常等情况）的数据回滚</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <el-tree
      class=&quot;filter-tree&quot;
      style=&quot;overflow:auto;&quot;
      :data=&quot;treeData&quot;
      :filter-node-method=&quot;filterNode&quot;
      @node-click=&quot;handleNodeClick&quot;
      ref=&quot;tree&quot;
      node-key=&quot;value&quot;
      :expand-on-click-node=&quot;false&quot;
      :render-content=&quot;renderContent&quot;
      default-expand-all>
    </el-tree>
    //子节点模板
    renderContent(h, { node, data, store }) {
        return h(TreeItem,{
          props:{
            value:data,
            treeNode:node
          },
          on:{
            input:(node)=>{
              data = node
            },
            Append: () => {
              node.expanded = true
              data.children.push({ value: this.$utilHelper.generateUUID(), label: '请输入模块名称', children: [],status:1,isAdd:true })
            },
            //保存节点
            SaveEdit:(nodeData)=> {
              //递归查找父节点
              var parentNode = this.$utilHelper.getNode(this.treeData,data.value).parentNode
              this.runParam.parentNode = parentNode
              this.runParam.data = data
              this.runParam.nodeData = nodeData
              this.$emit('SaveEdit',parentNode,data,this.CanSaveNext)
            }
          }
        })
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    &lt;el-tree
      <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">filter</span>-<span class="hljs-title">tree</span>"</span>
      style=<span class="hljs-string">"overflow:auto;"</span>
      :<span class="hljs-keyword">data</span>=<span class="hljs-string">"treeData"</span>
      :filter-node-method=<span class="hljs-string">"filterNode"</span>
      <span class="hljs-meta">@node</span>-click=<span class="hljs-string">"handleNodeClick"</span>
      ref=<span class="hljs-string">"tree"</span>
      node-key=<span class="hljs-string">"value"</span>
      :expand-on-click-node=<span class="hljs-string">"false"</span>
      :render-content=<span class="hljs-string">"renderContent"</span>
      <span class="hljs-keyword">default</span>-expand-all&gt;
    &lt;/el-tree&gt;
    <span class="hljs-comment">//子节点模板</span>
    renderContent(h, { node, <span class="hljs-keyword">data</span>, store }) {
        <span class="hljs-keyword">return</span> h(TreeItem,{
          props:{
            value:<span class="hljs-keyword">data</span>,
            treeNode:node
          },
          on:{
            input:(node)=&gt;{
              <span class="hljs-keyword">data</span> = node
            },
            Append: () =&gt; {
              node.expanded = <span class="hljs-literal">true</span>
              <span class="hljs-keyword">data</span>.children.push({ value: <span class="hljs-keyword">this</span>.$utilHelper.generateUUID(), label: <span class="hljs-string">'请输入模块名称'</span>, children: [],status:<span class="hljs-number">1</span>,isAdd:<span class="hljs-literal">true</span> })
            },
            <span class="hljs-comment">//保存节点</span>
            SaveEdit:(nodeData)=&gt; {
              <span class="hljs-comment">//递归查找父节点</span>
              <span class="hljs-keyword">var</span> parentNode = <span class="hljs-keyword">this</span>.$utilHelper.getNode(<span class="hljs-keyword">this</span>.treeData,<span class="hljs-keyword">data</span>.value).parentNode
              <span class="hljs-keyword">this</span>.runParam.parentNode = parentNode
              <span class="hljs-keyword">this</span>.runParam.<span class="hljs-keyword">data</span> = <span class="hljs-keyword">data</span>
              <span class="hljs-keyword">this</span>.runParam.nodeData = nodeData
              <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'SaveEdit'</span>,parentNode,<span class="hljs-keyword">data</span>,<span class="hljs-keyword">this</span>.CanSaveNext)
            }
          }
        })
      }</code></pre>
<ul><li>操作结果钩子，如果next函数传入false则判定操作失败，使用runParam中的参数进行回滚，该节点的编辑保存操作将无效</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      CanSaveNext(isNext,nodeId){
        let parentNode = this.runParam.parentNode
        let nodeData = this.runParam.nodeData
        let data = this.runParam.data
        if(isNext){
          parentNode.children.forEach((v,i)=>{
            if(v.value == data.value){
              if(this.HOST != &quot;static&quot;&amp;&amp;data.isAdd){
                data.value = nodeId
              }
              data.status = 0
              parentNode.children.splice(i,1,data)
            }
          })
        }else{
          if(!data.isAdd){
            parentNode.children.forEach((v,i)=>{
              if(v.value == nodeData.value){
                data.label = nodeData.label
                parentNode.children.splice(i,1,data)
              }
            })
          }
        }
        this.runParam = {}
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>      CanSaveNext(isNext,nodeId){
        let parentNode = this<span class="hljs-selector-class">.runParam</span><span class="hljs-selector-class">.parentNode</span>
        let nodeData = this<span class="hljs-selector-class">.runParam</span><span class="hljs-selector-class">.nodeData</span>
        let data = this<span class="hljs-selector-class">.runParam</span><span class="hljs-selector-class">.data</span>
        <span class="hljs-keyword">if</span>(isNext){
          parentNode<span class="hljs-selector-class">.children</span><span class="hljs-selector-class">.forEach</span>((v,i)=&gt;{
            <span class="hljs-keyword">if</span>(v<span class="hljs-selector-class">.value</span> == data.value){
              <span class="hljs-keyword">if</span>(this<span class="hljs-selector-class">.HOST</span> != <span class="hljs-string">"static"</span>&amp;&amp;data.isAdd){
                data<span class="hljs-selector-class">.value</span> = nodeId
              }
              data<span class="hljs-selector-class">.status</span> = <span class="hljs-number">0</span>
              parentNode<span class="hljs-selector-class">.children</span><span class="hljs-selector-class">.splice</span>(<span class="hljs-selector-tag">i</span>,<span class="hljs-number">1</span>,data)
            }
          })
        }<span class="hljs-keyword">else</span>{
          <span class="hljs-keyword">if</span>(!data.isAdd){
            parentNode<span class="hljs-selector-class">.children</span><span class="hljs-selector-class">.forEach</span>((v,i)=&gt;{
              <span class="hljs-keyword">if</span>(v<span class="hljs-selector-class">.value</span> == nodeData.value){
                data<span class="hljs-selector-class">.label</span> = nodeData<span class="hljs-selector-class">.label</span>
                parentNode<span class="hljs-selector-class">.children</span><span class="hljs-selector-class">.splice</span>(<span class="hljs-selector-tag">i</span>,<span class="hljs-number">1</span>,data)
              }
            })
          }
        }
        this<span class="hljs-selector-class">.runParam</span> = {}
      }</code></pre>
<p>如果觉得有用，欢迎star <a href="https://github.com/calebman/vue-DBM" rel="nofollow noreferrer" target="_blank">calebman/vue-DBM</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue基于Element构建自定义树

## 原文链接
[https://segmentfault.com/a/1190000011239985](https://segmentfault.com/a/1190000011239985)

