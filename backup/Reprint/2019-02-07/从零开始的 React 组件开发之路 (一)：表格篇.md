---
title: '从零开始的 React 组件开发之路 (一)：表格篇' 
date: 2019-02-07 2:30:15
hidden: true
slug: kj45uromsdt
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React 下的表格狂想曲</h1>
<h2 id="articleHeader1">0. 前言</h2>
<p>欢迎大家阅读「从零开始的 React 组件开发之路」系列第一篇，表格篇。本系列的特色是从 需求分析、API 设计和代码设计 三个递进的过程中，由简到繁地开发一个 React 组件，并在讲解过程中穿插一些 React 组件开发的技巧和心得。  </p>
<p>为什么从表格开始呢？在企业系统中，表格是最常见但功能需求最丰富的组件之一，同时也是基于 React 数据驱动的思想受益最多的组件之一，十分具有代表性。这篇文章也是近期南京谷歌开发者大会前端专场的分享总结。UXCore table 组件 <a href="http://uxco.re/components/table/" rel="nofollow noreferrer" target="_blank">Demo</a> 也可以和本文行文思路相契合，可做参考。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006770470?w=907&amp;h=552" src="https://static.alili.tech/img/remote/1460000006770470?w=907&amp;h=552" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">1. 一个简单 React 表格的构造</h2>
<h3 id="articleHeader3">1.1 需求分析</h3>
<ul>
<li><p>有表头，每行的展示方式相同，只是数据上有所不同</p></li>
<li><p>每一列可能有不同的对齐方式，可能有不同的展示类型，比如金额，比如手机号码等</p></li>
</ul>
<h3 id="articleHeader4">1.2 API 设计</h3>
<ul>
<li><p>因为每一列的展示类型不同，因此列配置应该作为一个 Prop，由于有多列应该是一个数组</p></li>
<li><p>数据源应该作为基础配置之一，应该作为一个 prop，由于有多行也应该是一个数组</p></li>
<li><p>现在的样子：&lt;Table columns={[]} data={[]} /&gt;</p></li>
<li><p>基本思路是通过遍历列配置来生成每一行</p></li>
<li>
<p>data 中的每一个元素应该是一行的数据，是一个 hash 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    city: '北京',
    name: '小李'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">city</span>: <span class="hljs-string">'北京'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'小李'</span>
}</code></pre>
</li>
<li>
<p>columns 中的每一个元素是一列的配置，也是一个 hash 对象，至少应该包括如下几部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    title: '表头',
    dataKey: 'city', // 该列使用行中的哪个 key 进行显示
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">title</span>: <span class="hljs-string">'表头'</span>,
    <span class="hljs-attr">dataKey</span>: <span class="hljs-string">'city'</span>, <span class="hljs-comment">// 该列使用行中的哪个 key 进行显示</span>
}</code></pre>
</li>
<li>
<p>易用性与通用性的平衡</p>
<ul>
<li><p>易用性与通用性互相制衡，但并不是绝对矛盾。</p></li>
<li><p>何为易用？使用尽量少的配置来完成最典型的场景。</p></li>
<li><p>何为通用？提供尽量多的定制接口已适应各种不同场景。</p></li>
<li><p>在 API 设计上尽量开放保证通用性</p></li>
<li><p>在默认值上提炼最典型的场景提高易用性。</p></li>
<li><p>从易用性角度出发</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    align: 'left', // 默认左对齐
    type: 'money/action', // 提供 'money', 'card', 'cnmobile' 等常用格式化形式
    delimiter: ',', // 格式化时的分隔符，默认是空格
    actions: { // 表格中常见的操作列，不以数据进行渲染，只包含动作，hash 对象使配置最简化
      &quot;编辑&quot;: function() {doEdit();}
    }, 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">align</span>: <span class="hljs-string">'left'</span>, <span class="hljs-comment">// 默认左对齐</span>
    type: <span class="hljs-string">'money/action'</span>, <span class="hljs-comment">// 提供 'money', 'card', 'cnmobile' 等常用格式化形式</span>
    delimiter: <span class="hljs-string">','</span>, <span class="hljs-comment">// 格式化时的分隔符，默认是空格</span>
    actions: { <span class="hljs-comment">// 表格中常见的操作列，不以数据进行渲染，只包含动作，hash 对象使配置最简化</span>
      <span class="hljs-string">"编辑"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{doEdit();}
    }, 
}</code></pre>
<ul><li><p>从通用性角度出发</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    actions: [ // 相对繁琐，但定制能力更强
      {
          title: '编辑',
          callback: function() {doEdit();},
          render: function(rowData) {
              // 根据当前行数据，决定是否渲染，及渲染成定制的样子
          }
      }
    ],
    render: function(cellData, rowData) {
        // 根据当前行数据，完全由用户决定如何渲染
        return <span>{`${rowData.city} - ${rowData.name}`}</span>
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">actions</span>: [ <span class="hljs-comment">// 相对繁琐，但定制能力更强</span>
      {
          <span class="hljs-attr">title</span>: <span class="hljs-string">'编辑'</span>,
          <span class="hljs-attr">callback</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{doEdit();},
          <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">rowData</span>) </span>{
              <span class="hljs-comment">// 根据当前行数据，决定是否渲染，及渲染成定制的样子</span>
          }
      }
    ],
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cellData, rowData</span>) </span>{
        <span class="hljs-comment">// 根据当前行数据，完全由用户决定如何渲染</span>
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{`${rowData.city} - ${rowData.name}`}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
    }
}</code></pre>
<ul><li>
<p>提供定制化渲染的两种方式：</p>
<ul><li><p>渲染函数 (更推荐)</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    render: function(rowData) {
        return <CustomComp url={rowData.url} />
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">rowData</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">CustomComp</span> <span class="hljs-attr">url</span>=<span class="hljs-string">{rowData.url}</span> /&gt;</span>
    },
}</span></code></pre>
<ul><li><p>渲染组件</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    renderComp: <CustomComp />, // 内部接收 rowData 作为参数
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">renderComp</span>: <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">CustomComp</span> /&gt;</span>, // 内部接收 rowData 作为参数
}</span></code></pre>
<ul><li>
<p>推荐渲染函数的原因：</p>
<ol>
<li><p>函数在做属性比较时，更简单</p></li>
<li><p>约定更少，渲染组件的方式需要配合 <code>Table</code> 预留比如 <code>rowData</code> 一类的接口，不够灵活。</p></li>
</ol>
</li></ul>
</li></ul>
</li>
</ul>
<h3 id="articleHeader5">1.3 代码设计</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006004249" src="https://static.alili.tech/img/remote/1460000006004249" alt="Table 分层" title="Table 分层" style="cursor: pointer;"></span></p>
<blockquote><p>图：Table 的分层设计</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006004251" src="https://static.alili.tech/img/remote/1460000006004251" alt="table 简单架构" title="table 简单架构" style="cursor: pointer;"></span></p>
<blockquote><p>图：最初的 Table 结构，详细的分层为后续的功能扩展做好准备。</p></blockquote>
<h2 id="articleHeader6">2. 加入更多的内置功能</h2>
<blockquote><p>目前的表格可以满足我们的最简单常用的场景，但仍然有很多经常需要使用的功能没有支持，如列排序，分页，搜索过滤、常用动作条、行选择和行筛选等。</p></blockquote>
<h3 id="articleHeader7">2.1 需求分析</h3>
<ul>
<li><p>列排序：升序/降序/默认顺序 Head/Cell 相关</p></li>
<li><p>分页：当表格需要展示的条数很多时，分页展示固定的条数 Table/Pagination 相关，这里假设已有 Pagination 组件</p></li>
<li><p>搜索过滤：Table 相关</p></li>
<li><p>常用操作：Table 相关</p></li>
<li><p>行选择：选中某些行，Row/Cell 相关</p></li>
<li><p>行筛选：手动展示或者隐藏一些行，不属于任何一列，因此是 Table 级</p></li>
</ul>
<h3 id="articleHeader8">2.2 API 设计</h3>
<blockquote><p>根据上面对于功能的需求分析，我们很容易定位 API 的位置，完成相应的扩展。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// table 配置，需求对应的模块对应了他的配置在整个配置中的位置
{
    columns: [ // HEAD/ROW 相关
        {
            order: true, // 是否展示排序按钮
            hidden: false, // 是否隐藏，行筛选需要
        }
    ],
    onOrder: function (activeColumn, order) { // 排序时的回调
        doOrder(activeColumn, order)
    }, 
    actionBar: { // 常用操作条
        &quot;打印&quot;: function() {doPrint()}, 
    },
    showSeach: true, // 是否显示搜索过滤，为什么不直接用下面的，这里也是设计上的一个优化点
    onSearch: function(keyword) { doSearch(keyword) }, // 搜索时的回调
    showPager: true, // 是否显示分页
    onPagerChange: function(current, pageSize) {}, // 分页改变时的回调
    rowSelection: { // 行选择相关
        onSelect: function(isSelected, currentRow, selectedRows) { 
            doSelect() 
        }
    }
}
// data 结构
{
    data: [{
        city: 'xxx',
        name: 'xxx',
        __selected__: true, // 行选择相关，用以标记该行是否被选中，用前后的 __ 来做特殊标记，另一方面也尽可能避免与用户的字段重复
    }],
    currentPage: 1, // 当前页数
    totalCount: 50, // 总条数
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// table 配置，需求对应的模块对应了他的配置在整个配置中的位置</span>
{
    <span class="hljs-attr">columns</span>: [ <span class="hljs-comment">// HEAD/ROW 相关</span>
        {
            <span class="hljs-attr">order</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否展示排序按钮</span>
            hidden: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 是否隐藏，行筛选需要</span>
        }
    ],
    <span class="hljs-attr">onOrder</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">activeColumn, order</span>) </span>{ <span class="hljs-comment">// 排序时的回调</span>
        doOrder(activeColumn, order)
    }, 
    <span class="hljs-attr">actionBar</span>: { <span class="hljs-comment">// 常用操作条</span>
        <span class="hljs-string">"打印"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{doPrint()}, 
    },
    <span class="hljs-attr">showSeach</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否显示搜索过滤，为什么不直接用下面的，这里也是设计上的一个优化点</span>
    onSearch: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">keyword</span>) </span>{ doSearch(keyword) }, <span class="hljs-comment">// 搜索时的回调</span>
    showPager: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否显示分页</span>
    onPagerChange: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">current, pageSize</span>) </span>{}, <span class="hljs-comment">// 分页改变时的回调</span>
    rowSelection: { <span class="hljs-comment">// 行选择相关</span>
        onSelect: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">isSelected, currentRow, selectedRows</span>) </span>{ 
            doSelect() 
        }
    }
}
<span class="hljs-comment">// data 结构</span>
{
    <span class="hljs-attr">data</span>: [{
        <span class="hljs-attr">city</span>: <span class="hljs-string">'xxx'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'xxx'</span>,
        <span class="hljs-attr">__selected__</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 行选择相关，用以标记该行是否被选中，用前后的 __ 来做特殊标记，另一方面也尽可能避免与用户的字段重复</span>
    }],
    <span class="hljs-attr">currentPage</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">// 当前页数</span>
    totalCount: <span class="hljs-number">50</span>, <span class="hljs-comment">// 总条数</span>
}</code></pre>
<h3 id="articleHeader9">2.3 代码设计</h3>
<h3 id="articleHeader10">结构图</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006004253" src="https://static.alili.tech/img/remote/1460000006004253" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>图：扩展后的 Table 结构</p></blockquote>
<h3 id="articleHeader11">内部数据的处理</h3>
<blockquote><p>目前组件的数据流向还比较简单，我们似乎可以全部通过 props 来控制状态，制作一个 stateless 的组件。</p></blockquote>
<h3 id="articleHeader12">何时该用 state？何时该用 props？</h3>
<p><strong>UI=fn(state, props)</strong>, 人们常说 React 组件是一个状态机，但我们应该清楚的是他是由 state 和 props 构成的双状态机;</p>
<p>props 和 state 的改变都会触发组件的重新渲染，那么我们使用它们的时机分别是什么呢？由于 state 是组件自身维护的，并不与他的父级组件进行沟通，进而也无法与他的兄弟组件进行沟通，因此我们应该尽量只在页面的根节点组件或者复杂组件的根节点组件使用 state，而在其他情况下尽量只使用 props，这可以增强整个 React 项目的可预知性和可控性。</p>
<p>但凡事不是绝对的，全都使用 Props 固然可以使组件可维护性变强，但全部交给用户来操作会使用户的使用成本大大提高，利用 state，我们可以让组件自己维护一些状态，从而减轻用户使用的负担。</p>
<p>我们举个简单的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{/* 受控模式 */}
<input value=&quot;a&quot; onChange={ function() {doChange()} } />
{/* 非受控模式 */}
<input onChange={ function() {doChange()} } />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{<span class="hljs-comment">/* 受控模式 */</span>}
&lt;input value=<span class="hljs-string">"a"</span> onChange={ <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{doChange()} } /&gt;
{<span class="hljs-comment">/* 非受控模式 */</span>}
&lt;input onChange={ <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{doChange()} } /&gt;</code></pre>
<p>value 配置时，input 的值由 value 控制，value 没有配置时，input 的值由自己控制，如果把 &lt;input /&gt; 看做一个组件，那么此时可以认为 input 此时有一个 state 是 value。显然，无 value 状态下的配置更少，降低了使用的成本，我们在做组件时也可以参考这种模式。</p>
<p>例如在我们希望为用户提供 <code>行选择</code> 的功能时，用户通常是不希望自己去控制行的变化的，而只是关心行的变化时应该拿取的数据，此时我们就可以将 data 这个 prop 变成 state。有一点需要注意的是，用户的 prop</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Table extends React.Component {
    constructor(props) {
        super(props);
        this.data = deepcopy(props.data);
        this.state = {
            data: this.data,
        };
    }
    
    /**
     * 在 data 发生改变时，更改对应的 state 值。
     */
    componentWillReceiveProps(nextProps, nextState) {
        if (!deepEqual(nextProps.data, this.data) {
            this.data = deepcopy(nextProps.data);
            this.setState({
                data: this.data,
            });
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Table</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.data = deepcopy(props.data);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">data</span>: <span class="hljs-keyword">this</span>.data,
        };
    }
    
    <span class="hljs-comment">/**
     * 在 data 发生改变时，更改对应的 state 值。
     */</span>
    componentWillReceiveProps(nextProps, nextState) {
        <span class="hljs-keyword">if</span> (!deepEqual(nextProps.data, <span class="hljs-keyword">this</span>.data) {
            <span class="hljs-keyword">this</span>.data = deepcopy(nextProps.data);
            <span class="hljs-keyword">this</span>.setState({
                <span class="hljs-attr">data</span>: <span class="hljs-keyword">this</span>.data,
            });
        }
    }
}</code></pre>
<p>这里涉及的一个很重要的点，就是如何处理一个复杂类型数据的 prop 作为 state。因为 JS 对象传地址的特性，如果我们直接对比 <code>nextProps.data</code> 和 <code>this.props.data</code> 有些情况下会永远相等(当用户直接修改 data 的情况下)，所以我们需要对这个 prop 做一个备份。</p>
<h3 id="articleHeader13">生命周期的使用时机</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007277146?w=853&amp;h=954" src="https://static.alili.tech/img/remote/1460000007277146?w=853&amp;h=954" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote><p>图：React 的生命周期</p></blockquote>
<ul>
<li><p>constructor: 尽量简洁，只做最基本的 state 初始化</p></li>
<li><p>willMount: 一些内部使用变量的初始化</p></li>
<li><p>render: 触发非常频繁，尽量只做渲染相关的事情。</p></li>
<li><p>didMount: 一些不影响初始化的操作应该在这里完成，比如根据浏览器不同进行操作，获取数据，监听 document 事件等（server render）。</p></li>
<li><p>willUnmount: 销毁操作，销毁计时器，销毁自己的事件监听等。</p></li>
<li><p>willReceiveProps: 当有 prop 做 state 时，监听 prop 的变化去改变 state，在这个生命周期里 setState 不会触发两次渲染。</p></li>
<li><p>shouldComponentUpdate: 手动判断组件是否应该更新，避免因为页面更新造成的无谓更新，组件的重要优化点之一。</p></li>
<li><p>willUpdate: 在 state 变化后如果需要修改一些变量，可以在这里执行。</p></li>
<li><p>didUpdate: 与 didMount 类似，进行一些不影响到 render 的操作，update 相关的生命周期里最好不要做 setState 操作，否则容易造成死循环。</p></li>
</ul>
<h3 id="articleHeader14">父子级组件间的通信</h3>
<p>父级向子级通信不用多说，使用 prop 进行传递，那么子级向父级通信呢？有人会说，靠回调啊~ onChange等等，本质上是没有错误的，但当组件比较复杂，存在多级结构时，如果每一级都去处理他的子级的回调的话，不仅写起来非常麻烦，而且很多时候是没有意义的。</p>
<p>我们采取的办法是，只在顶级组件也就是 Table 这一层控制所有的 state，其他的各个子层都是完全由 prop 来控制，这样一来，我们只需要 Table 去操作数据，那么我们逐级向下传递一个属于 Table 的回调函数，完成所有子级都只向 Table 做“汇报”，进行跨级通信。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006004257" src="https://static.alili.tech/img/remote/1460000006004257" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>图：父子级间的通信</p></blockquote>
<h2 id="articleHeader15">3. 自行获取数据</h2>
<h3 id="articleHeader16">3.1 需求分析</h3>
<p>作为一个尽可能为用户提高效率的组件，除了手动传入 data 外，我们也应该有自行获取数据的能力，用户只需要配置 url 和相应的参数就可以完成表格的配置，为此我们可能需要以下参数：</p>
<ul>
<li><p>数据源，返回的数据格式应和我们之前定义的 data 数据结构一致。 (易用)</p></li>
<li><p>随请求一起发出去的参数。(通用)</p></li>
<li><p>在发请求前的回调，可以在这里调整发送的参数。(通用)</p></li>
<li><p>请求回来后的回调，可以在这里调整数据结构以满足对 data 的要求。(通用)</p></li>
<li><p>同时要考虑到内置功能的适配。(易用)</p></li>
</ul>
<h3 id="articleHeader17">3.2 API 设计</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// table 配置，需求对应的模块对应了他的配置在整个配置中的位置
{
    url: &quot;//fetchurl.com/data&quot;, // 数据源，只支持 json 和 jsonp
    fetchParams: { // 额外的一些参数
        token: &quot;xxxabxc_sa&quot;
    },
    beforeFetch: function(data, from) { // data 为要发送的参数，from 参数用来区分发起 fetch 的来源(分页，排序，搜索还是其他位置)
        return data; // 返回值为真正发送的参数
    },
    afterFetch: function(result) { // result 为请求回来的数据
        return process(result); // 返回值为真正交给 table 进行展示的数据。
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// table 配置，需求对应的模块对应了他的配置在整个配置中的位置</span>
{
    <span class="hljs-attr">url</span>: <span class="hljs-string">"//fetchurl.com/data"</span>, <span class="hljs-comment">// 数据源，只支持 json 和 jsonp</span>
    fetchParams: { <span class="hljs-comment">// 额外的一些参数</span>
        token: <span class="hljs-string">"xxxabxc_sa"</span>
    },
    <span class="hljs-attr">beforeFetch</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, from</span>) </span>{ <span class="hljs-comment">// data 为要发送的参数，from 参数用来区分发起 fetch 的来源(分页，排序，搜索还是其他位置)</span>
        <span class="hljs-keyword">return</span> data; <span class="hljs-comment">// 返回值为真正发送的参数</span>
    },
    <span class="hljs-attr">afterFetch</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{ <span class="hljs-comment">// result 为请求回来的数据</span>
        <span class="hljs-keyword">return</span> process(result); <span class="hljs-comment">// 返回值为真正交给 table 进行展示的数据。</span>
    },
}</code></pre>
<h3 id="articleHeader18">3.3 代码设计</h3>
<blockquote><p>基于前面良好的通信模式，url 的扩展变得非常简单，只需要在所有的回调中加入是否配置 url 的判断即可。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Table extends React.Component {
    constructor(props) {
        super(props);
        this.data = deepcopy(props.data);
        this.fetchParams = deepcopy(props.fetchParams);
        this.state = {
            data: this.data,
        };
    }
    
    /**
     * 获取数据的方法
     */
    fetchData(props, from) {
        props = props || this.props;
        const otherParams = process(this.state);
        ajax(props.url, this.fetchParams, otherParams, from);
    }
    
    /**
     * 搜索时的回调
     */
    handleSearch(key) {
        if (this.props.url) {
            this.setState({
                searchKey: key,
            }, () => {
                this.fetchData();
            });
        } else {
            this.props.onSearch(key);
        }
        
    }
    
    componentDidMount() {
        if (this.props.url) {
            this.fetchData();
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        let newState = {};
        if (!deepEqual(nextProps.data, this.data) {
            this.data = deepcopy(nextProps.data);
            newState['data'] = this.data; 
        }
        if (!deepEqual(nextProps.fetchParams, this.fetchParams)) {
            this.fetchParams = deepcopy(nextProps.fetchParams);
            this.fetchData();
        }
        if (nextProps.url !== this.props.url) {
            this.fetchData(nextProps);
        }
        if (Object.keys(newState) !== 0) {
            this.setState(newState);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Table</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.data = deepcopy(props.data);
        <span class="hljs-keyword">this</span>.fetchParams = deepcopy(props.fetchParams);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">data</span>: <span class="hljs-keyword">this</span>.data,
        };
    }
    
    <span class="hljs-comment">/**
     * 获取数据的方法
     */</span>
    fetchData(props, <span class="hljs-keyword">from</span>) {
        props = props || <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">const</span> otherParams = process(<span class="hljs-keyword">this</span>.state);
        ajax(props.url, <span class="hljs-keyword">this</span>.fetchParams, otherParams, <span class="hljs-keyword">from</span>);
    }
    
    <span class="hljs-comment">/**
     * 搜索时的回调
     */</span>
    handleSearch(key) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.url) {
            <span class="hljs-keyword">this</span>.setState({
                <span class="hljs-attr">searchKey</span>: key,
            }, () =&gt; {
                <span class="hljs-keyword">this</span>.fetchData();
            });
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.props.onSearch(key);
        }
        
    }
    
    componentDidMount() {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.url) {
            <span class="hljs-keyword">this</span>.fetchData();
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        <span class="hljs-keyword">let</span> newState = {};
        <span class="hljs-keyword">if</span> (!deepEqual(nextProps.data, <span class="hljs-keyword">this</span>.data) {
            <span class="hljs-keyword">this</span>.data = deepcopy(nextProps.data);
            newState[<span class="hljs-string">'data'</span>] = <span class="hljs-keyword">this</span>.data; 
        }
        <span class="hljs-keyword">if</span> (!deepEqual(nextProps.fetchParams, <span class="hljs-keyword">this</span>.fetchParams)) {
            <span class="hljs-keyword">this</span>.fetchParams = deepcopy(nextProps.fetchParams);
            <span class="hljs-keyword">this</span>.fetchData();
        }
        <span class="hljs-keyword">if</span> (nextProps.url !== <span class="hljs-keyword">this</span>.props.url) {
            <span class="hljs-keyword">this</span>.fetchData(nextProps);
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.keys(newState) !== <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">this</span>.setState(newState);
        }
    }
}</code></pre>
<h2 id="articleHeader19">4. 行内编辑</h2>
<h3 id="articleHeader20">4.1 需求分析</h3>
<p>通过双击或者点击编辑按钮，实现行内可编辑状态的切换。如果只是变成普通的文本框那就太 low 了，有追求的我们希望每个列根据数据类型可以有不同的编辑形式。既然是可编辑的，那么关于表单的一套东西都适用，他要可以验证，可以重置，也可以联动。</p>
<h3 id="articleHeader21">4.2 API 设计</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// table 配置，需求对应的模块对应了他的配置在整个配置中的位置，显然行内编辑是和列相关的
{
    columns: [ // HEAD/ROW 相关
        {   
            dataKey: 'cityName', // 展示时操作的变量
            editKey: 'cityValue', // 编辑时操作的变量
            customField: SelectField, // 编辑状态的类型
            config: {}, // 编辑状态的一些配置
            renderChildren: function() {
                return [
                {id: 'bj', name: '北京'},
                {id: 'hz', name: '杭州'}].map((item) => {
                    return <Option key={item.id}>{item.name}</Option>
                });
            },
            rules: function(value) { // 校验相关
                return true;
            }
        }
    ],
    onChange: function(result) {
        doSth(result); // result 包括 {data: 表格的所有数据, changedData: 变动行的数据, dataKey: xxx, editKey: xxx, pass: 正在编辑的域是否通过校验}
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// table 配置，需求对应的模块对应了他的配置在整个配置中的位置，显然行内编辑是和列相关的</span>
{
    <span class="hljs-attr">columns</span>: [ <span class="hljs-comment">// HEAD/ROW 相关</span>
        {   
            <span class="hljs-attr">dataKey</span>: <span class="hljs-string">'cityName'</span>, <span class="hljs-comment">// 展示时操作的变量</span>
            editKey: <span class="hljs-string">'cityValue'</span>, <span class="hljs-comment">// 编辑时操作的变量</span>
            customField: SelectField, <span class="hljs-comment">// 编辑状态的类型</span>
            config: {}, <span class="hljs-comment">// 编辑状态的一些配置</span>
            renderChildren: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> [
                {<span class="hljs-attr">id</span>: <span class="hljs-string">'bj'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'北京'</span>},
                {<span class="hljs-attr">id</span>: <span class="hljs-string">'hz'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'杭州'</span>}].map(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
                    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Option</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">Option</span>&gt;</span></span>
                });
            },
            <span class="hljs-attr">rules</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{ <span class="hljs-comment">// 校验相关</span>
                <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
            }
        }
    ],
    <span class="hljs-attr">onChange</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{
        doSth(result); <span class="hljs-comment">// result 包括 {data: 表格的所有数据, changedData: 变动行的数据, dataKey: xxx, editKey: xxx, pass: 正在编辑的域是否通过校验}</span>
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// data 结构
{
    data: [{
        cityName: 'xxx',
        cityValue: 'yyy',
        name: 'xxx',
        __selected__: true, 
        __mode__: &quot;edit&quot;, // 用来区分当前行的状态
    }],
    currentPage: 1, // 当前页数
    totalCount: 50, // 总条数
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// data 结构</span>
{
    <span class="hljs-attr">data</span>: [{
        <span class="hljs-attr">cityName</span>: <span class="hljs-string">'xxx'</span>,
        <span class="hljs-attr">cityValue</span>: <span class="hljs-string">'yyy'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'xxx'</span>,
        <span class="hljs-attr">__selected__</span>: <span class="hljs-literal">true</span>, 
        <span class="hljs-attr">__mode__</span>: <span class="hljs-string">"edit"</span>, <span class="hljs-comment">// 用来区分当前行的状态</span>
    }],
    <span class="hljs-attr">currentPage</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">// 当前页数</span>
    totalCount: <span class="hljs-number">50</span>, <span class="hljs-comment">// 总条数</span>
}</code></pre>
<h3 id="articleHeader22">4.3 代码设计</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006004259" src="https://static.alili.tech/img/remote/1460000006004259" alt="table edit mode" title="table edit mode" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>图：行内编辑模式下的表格架构</p></blockquote>
<ul>
<li><p>所有的 CellField 继承一个基类 Field，这个基类提供通用的与 Table 通信，校验的方式，具体的 Field 只负责交互部分的实现。</p></li>
<li><p>下面是这部分设计的具体代码实现，碍于篇幅，不在文章中直接贴出。</p></li>
<li><p><a href="https://github.com/uxcore/uxcore-table/blob/master/src/Cell/CellField.js" rel="nofollow noreferrer" target="_blank">https://github.com/uxcore/uxc...</a></p></li>
<li><p><a href="https://github.com/uxcore/uxcore-table/blob/master/src/Cell/SelectField.js" rel="nofollow noreferrer" target="_blank">https://github.com/uxcore/uxc...</a></p></li>
</ul>
<h2 id="articleHeader23">5. 总结</h2>
<blockquote><p>这篇文章以复杂表格组件的开发为切入点，讨论了以下内容：</p></blockquote>
<ul>
<li><p>组件设计的通用流程</p></li>
<li><p>组件分层架构与 API 的对应设计</p></li>
<li><p>组件设计中易用性与通用性的权衡</p></li>
<li><p>State 和 Props 的正确使用</p></li>
<li><p>生命周期的实战应用</p></li>
<li><p>父子级间组件通信</p></li>
</ul>
<blockquote><p>碍于整体篇幅，有一些和这个组件相关的点未详细讨论，我们会在本系列的后续文章中详细说明。</p></blockquote>
<ul>
<li><p>数据的 不可变性（immutability）</p></li>
<li><p>shouldComponentUpdate 和 pure render</p></li>
<li><p>树形表格 和 数据的递归处理</p></li>
<li><p>在目前架构上进行折叠面板的扩展</p></li>
</ul>
<h2 id="articleHeader24">最后</h2>
<p>惯例地来宣传一下团队开源的 React PC 组件库 <a href="https://github.com/uxcore/uxcore" rel="nofollow noreferrer" target="_blank">UXCore</a> ，上面提到的点，在我们的<a href="https://github.com/uxcore/uxcore-tools" rel="nofollow noreferrer" target="_blank">组件开发工具</a>中都有体现，欢迎大家一起讨论，也欢迎在我们的 <a href="https://segmentfault.com/t/uxcore">SegmentFault 专题</a>下进行提问讨论。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006768158?w=1000&amp;h=500" src="https://static.alili.tech/img/remote/1460000006768158?w=1000&amp;h=500" alt="uxcore" title="uxcore" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始的 React 组件开发之路 (一)：表格篇

## 原文链接
[https://segmentfault.com/a/1190000006004245](https://segmentfault.com/a/1190000006004245)

