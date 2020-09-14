---
title: 'vue做后台管理系统，记住列表的查询条件和分页' 
date: 2018-12-27 2:30:12
hidden: true
slug: k3g6t2s7lu
categories: [reprint]
---

{{< raw >}}

                    
<p>需求：后台管理系统列表，带查询条件和分页，点编辑，新页面打开，保存之后再跳转回之前的页面。<br>（如果是表单字段少，强烈建议dialog修改。请忽略本文）</p>
<p>实现思路：</p>
<ol>
<li>store存储一个map，这个map的键是列表页面的path（也就是路由），值是查询条件和分页页码（等等根据条件自己定义）；</li>
<li>列表页面created()的时候，读取sotre的map</li>
<li>列表页面的数据查询之前（也就是条件变化的时候），存储到store的map</li>
</ol>
<p>我个人认为还是很方便的，优点有2个：一是如果需要记录列表的页面，添加4行代码就OK了；二是通用，不需要再额外定制参数</p>
<p>下面进入正题：</p>
<p>1、 store添加一个state</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="listPagePars:new Map()," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code style="word-break: break-word; white-space: initial;">listPagePars:<span class="hljs-keyword">new</span> Map(),</code></pre>
<p>2、muntations添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SAVE_LIST_PAGE_PARS: (state,{ path,pars }) => {
    state.listPagePars.set(path,pars);
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>SAVE_LIST_PAGE_PARS: (<span class="hljs-keyword">state</span>,{ path,pars }) =&gt; {
    <span class="hljs-keyword">state</span>.listPagePars.<span class="hljs-built_in">set</span>(path,pars);
},</code></pre>
<p>3、 actions添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="saveListPagePars: ({ commit },{path,pars}) => {
    commit('SAVE_LIST_PAGE_PARS',{ path,pars });
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>saveListPagePars: ({ commit },{path,pars}) =&gt; {
    commit(<span class="hljs-string">'SAVE_LIST_PAGE_PARS'</span>,{ path,pars });
},</code></pre>
<p>4、 经过上面3个步骤是store的部分，代码都很少，浅显易懂，然后是使用的地方（需要记录查询条件和页码的vue页面才用）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
  return{
    pars: {//核心的，列表页面的统一参数，建议整个后台管理系统的列表页都统一这种格式
      filter: {
        customer_name:'',//查询条件，有多少写多少
        mobile:''
      },
      page:1,
      page_size:15,
      order_field:'customer_id', //排序字段
      order_type:'desc', //排序方式
},

// ……

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">data</span>() {
  <span class="hljs-selector-tag">return</span>{
    <span class="hljs-attribute">pars</span>: {<span class="hljs-comment">//核心的，列表页面的统一参数，建议整个后台管理系统的列表页都统一这种格式</span>
      <span class="hljs-attribute">filter</span>: {
        <span class="hljs-attribute">customer_name</span>:<span class="hljs-string">''</span>,<span class="hljs-comment">//查询条件，有多少写多少</span>
        <span class="hljs-attribute">mobile</span>:<span class="hljs-string">''</span>
      },
      <span class="hljs-attribute">page</span>:<span class="hljs-number">1</span>,
      <span class="hljs-attribute">page_size</span>:<span class="hljs-number">15</span>,
      <span class="hljs-attribute">order_field</span>:<span class="hljs-string">'customer_id'</span>, <span class="hljs-comment">//排序字段</span>
      <span class="hljs-attribute">order_type</span>:<span class="hljs-string">'desc'</span>, <span class="hljs-comment">//排序方式</span>
},

<span class="hljs-comment">// ……</span>

}</code></pre>
<p>5、 列表查询的时候，如methods里面有个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getCustomers() {
  this.$store.dispatch('saveListPagePars',{path:this.$route.path,pars:this.pars});  //核心，每次查询条件变化，都先存一次
  // 后面是自己的ajax查询方法，
  // this.$http.get(API_URL.customer_list,{params:this.pars }).then((res) => {
  // ……
  // });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>getCustomers() {
  <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'saveListPagePars'</span>,{path:<span class="hljs-keyword">this</span>.$route.path,pars:<span class="hljs-keyword">this</span>.pars});  <span class="hljs-comment">//核心，每次查询条件变化，都先存一次</span>
  <span class="hljs-comment">// 后面是自己的ajax查询方法，</span>
  <span class="hljs-comment">// this.$http.get(API_URL.customer_list,{params:this.pars }).then((res) =&gt; {</span>
  <span class="hljs-comment">// ……</span>
  <span class="hljs-comment">// });</span></code></pre>
<p>6、 列表页面初始化<br>说明：如果store存储了当前path的参数，就用该path的参数覆盖当前页面的默认参数，再查询</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created() {
  if(this.$store.state.listPagePars.has(this.$route.path)) {
    this.pars=this.$store.state.listPagePars.get(this.$route.path);
  }
  this.getCustomers();
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>created() {
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$store.state.listPagePars.has(<span class="hljs-keyword">this</span>.$route.path)) {
    <span class="hljs-keyword">this</span>.pars=<span class="hljs-keyword">this</span>.$store.state.listPagePars.<span class="hljs-keyword">get</span>(<span class="hljs-keyword">this</span>.$route.path);
  }
  <span class="hljs-keyword">this</span>.getCustomers();
},</code></pre>
<p>完毕，代码量很少，需要注意的是列表的查询表单，统一用你定义好的pars这种格式，有个好处是，查询的ajax也需要pars参数，比较统一。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue做后台管理系统，记住列表的查询条件和分页

## 原文链接
[https://segmentfault.com/a/1190000011807931](https://segmentfault.com/a/1190000011807931)

