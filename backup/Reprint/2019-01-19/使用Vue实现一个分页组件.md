---
title: '使用Vue实现一个分页组件' 
date: 2019-01-19 2:30:10
hidden: true
slug: 1kcvuasxpqd
categories: [reprint]
---

{{< raw >}}

                    
<p>分页是WEB开发中很常用的功能，尤其是在各种前后端分离的今天，后端API返回数据，前端根据数据的<code>count</code>以及当前页码<code>pageIndex</code>来计算分页页码并渲染到页面上已经是一个很普通很常见的功能了。从最开始的<code>jquery</code>时代到现在的各种各样的前端框架时代，分页功能都是必不可少的。<br>分页大多数（基本上）情况下都是对异步数据列表的处理，这里首先需要明白一下分页的流程。<br>在已知每页显示数据量<code>pageSize</code>以及当前页码<code>pageIndex</code>的情况下：</p>
<ul>
<li><p>请求API，返回第一屏数据（<code>pageSize</code>内）以及所有相关条件的数据总量<code>count</code></p></li>
<li><p>将数据总量传递给<code>page</code>组件，来计算页码并渲染到页面上</p></li>
<li><p>点击页码，发送请求获取该页码的数据，返回数据总量<code>count</code>以及该页码下的数据条目。</p></li>
</ul>
<p>由于获取数据条件的变化（假设是个搜索，关键词变了），<code>count</code>是不定的；再或者，有个<code>select</code>下拉框，来控制每页显示的数据量<code>pageSize</code>，当它变化的时候，总页码肯定也是要变化的。因此很多情况下要重新计算页码并渲染。</p>
<p>了解了流程，在Vue中实现一个分页组件也就变得简单了。</p>
<p>简单处理，样式类似于<code>bootstrap</code>的分页组件，在第一页时，禁用上一页，以及首页按钮；在最后一页时，禁用下一页，一节尾页按钮；超出范围的页码以<code>...</code>来代替，效果图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008606961?w=444&amp;h=64" src="https://static.alili.tech/img/remote/1460000008606961?w=444&amp;h=64" alt="分页组件效果图" title="分页组件效果图" style="cursor: pointer;"></span></p>
<h3 id="articleHeader0">分页组件</h3>
<h4>template</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <ul class=&quot;mo-paging&quot;>
        <!-- prev -->
        <li
        :class=&quot;['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]&quot;
        @click=&quot;prev&quot;>prev</li>
        
        <!-- first -->
        <li
        :class=&quot;['paging-item', 'paging-item--first', {'paging-item--disabled' : index === 1}]&quot;
        @click=&quot;first&quot;>first</li>
        
        <li
        :class=&quot;['paging-item', 'paging-item--more']&quot;
        v-if=&quot;showPrevMore&quot;>...</li>

        <li
        :class=&quot;['paging-item', {'paging-item--current' : index === pager}]&quot;
        v-for=&quot;pager in pagers&quot;
        @click=&quot;go(pager)&quot;>"{{" pager "}}"</li>

        <li
        :class=&quot;['paging-item', 'paging-item--more']&quot;
        v-if=&quot;showNextMore&quot;>...</li>
        
        <!-- last -->
        <li
        :class=&quot;['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]&quot;
        @click=&quot;last&quot;>last</li>

        <!-- next -->
        <li
        :class=&quot;['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]&quot;
        @click=&quot;next&quot;>next</li>
    </ul>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mo-paging"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- prev --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
        <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]"</span>
        @<span class="hljs-attr">click</span>=<span class="hljs-string">"prev"</span>&gt;</span>prev<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        
        <span class="hljs-comment">&lt;!-- first --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
        <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', 'paging-item--first', {'paging-item--disabled' : index === 1}]"</span>
        @<span class="hljs-attr">click</span>=<span class="hljs-string">"first"</span>&gt;</span>first<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
        <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', 'paging-item--more']"</span>
        <span class="hljs-attr">v-if</span>=<span class="hljs-string">"showPrevMore"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
        <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', {'paging-item--current' : index === pager}]"</span>
        <span class="hljs-attr">v-for</span>=<span class="hljs-string">"pager in pagers"</span>
        @<span class="hljs-attr">click</span>=<span class="hljs-string">"go(pager)"</span>&gt;</span>"{{" pager "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
        <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', 'paging-item--more']"</span>
        <span class="hljs-attr">v-if</span>=<span class="hljs-string">"showNextMore"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        
        <span class="hljs-comment">&lt;!-- last --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
        <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]"</span>
        @<span class="hljs-attr">click</span>=<span class="hljs-string">"last"</span>&gt;</span>last<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

        <span class="hljs-comment">&lt;!-- next --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
        <span class="hljs-attr">:class</span>=<span class="hljs-string">"['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]"</span>
        @<span class="hljs-attr">click</span>=<span class="hljs-string">"next"</span>&gt;</span>next<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h4>style(scss)</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".mo-paging {
    display: inline-block;
    padding: 0;
    margin: 1rem 0;
    font-size: 0;
    list-style: none;
    user-select: none;
    > .paging-item {
        display: inline;
        font-size: 14px;
        position: relative;
        padding: 6px 12px;
        line-height: 1.42857143;
        text-decoration: none;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-left: -1px;
        cursor: pointer;
        color: #0275d8;
        &amp;:first-child {
            margin-left: 0;
        }
        &amp;:hover {
            background-color: #f0f0f0;
            color: #0275d8;
        }
        &amp;.paging-item--disabled,
        &amp;.paging-item--more{
            background-color: #fff;
            color: #505050;
        }
        //禁用
        &amp;.paging-item--disabled {
            cursor: not-allowed;
            opacity: .75;
        }
        &amp;.paging-item--more,
        &amp;.paging-item--current {
            cursor: default;
        }
        //选中
        &amp;.paging-item--current {
            background-color: #0275d8;
            color:#fff;
            position: relative;
            z-index: 1;
            border-color: #0275d8;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.mo-paging</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">1rem</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">list-style</span>: none;
    <span class="hljs-attribute">user-select</span>: none;
    &gt; .paging-item {
        <span class="hljs-attribute">display</span>: inline;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">6px</span> <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.42857143</span>;
        <span class="hljs-attribute">text-decoration</span>: none;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">1px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#0275d8</span>;
        &amp;:first-child {
            <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">0</span>;
        }
        &amp;<span class="hljs-selector-pseudo">:hover</span> {
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f0f0f0</span>;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#0275d8</span>;
        }
        &amp;<span class="hljs-selector-class">.paging-item--disabled</span>,
        &amp;<span class="hljs-selector-class">.paging-item--more</span>{
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#505050</span>;
        }
        //禁用
        &amp;<span class="hljs-selector-class">.paging-item--disabled</span> {
            <span class="hljs-attribute">cursor</span>: not-allowed;
            <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">75</span>;
        }
        &amp;<span class="hljs-selector-class">.paging-item--more</span>,
        &amp;<span class="hljs-selector-class">.paging-item--current</span> {
            <span class="hljs-attribute">cursor</span>: default;
        }
        //选中
        &amp;<span class="hljs-selector-class">.paging-item--current</span> {
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#0275d8</span>;
            <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
            <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#0275d8</span>;
        }
    }
}</code></pre>
<h4>javascript</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    name : 'MoPaging',
    //通过props来接受从父组件传递过来的值
    props : {

        //页面中的可见页码，其他的以...替代, 必须是奇数
        perPages : { 
            type : Number,
            default : 5 
        },

        //当前页码
        pageIndex : {
            type : Number,
            default : 1
        },

        //每页显示条数
        pageSize : {
            type : Number,
            default : 10
        },

        //总记录数
        total : {
            type : Number,
            default : 1
        },

    },
    methods : {
        prev(){
            if (this.index > 1) {
                this.go(this.index - 1)
            }
        },
        next(){
            if (this.index < this.pages) {
                this.go(this.index + 1)
            }
        },
        first(){
            if (this.index !== 1) {
                this.go(1)
            }
        },
        last(){
            if (this.index != this.pages) {
                this.go(this.pages)
            }
        },
        go (page) {
            if (this.index !== page) {
                this.index = page
                //父组件通过change方法来接受当前的页码
                this.$emit('change', this.index)
            }
        }
    },
    computed : {

        //计算总页码
        pages(){
            return Math.ceil(this.size / this.limit)
        },

        //计算页码，当count等变化时自动计算
        pagers () {
            const array = []
            const perPages = this.perPages
            const pageCount = this.pages
            let current = this.index
            const _offset = (perPages - 1) / 2

            
            const offset = {
                start : current - _offset,
                end   : current + _offset
            }

            //-1, 3
            if (offset.start < 1) {
                offset.end = offset.end + (1 - offset.start)
                offset.start = 1
            }
            if (offset.end > pageCount) {
                offset.start = offset.start - (offset.end - pageCount)
                offset.end = pageCount
            }
            if (offset.start < 1) offset.start = 1

            this.showPrevMore = (offset.start > 1)
            this.showNextMore = (offset.end < pageCount)

            for (let i = offset.start; i <= offset.end; i++) {
                array.push(i)
            }

            return array
        }
    },
    data () {
        return {
            index : this.pageIndex, //当前页码
            limit : this.pageSize, //每页显示条数
            size : this.total || 1, //总记录数
            showPrevMore : false,
            showNextMore : false
        }
    },
    watch : {
        pageIndex(val) {
            this.index = val || 1
        },
        pageSize(val) {
            this.limit = val || 10
        },
        total(val) {
            this.size = val || 1
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span> : <span class="hljs-string">'MoPaging'</span>,
    <span class="hljs-comment">//通过props来接受从父组件传递过来的值</span>
    props : {

        <span class="hljs-comment">//页面中的可见页码，其他的以...替代, 必须是奇数</span>
        perPages : { 
            <span class="hljs-attr">type</span> : <span class="hljs-built_in">Number</span>,
            <span class="hljs-attr">default</span> : <span class="hljs-number">5</span> 
        },

        <span class="hljs-comment">//当前页码</span>
        pageIndex : {
            <span class="hljs-attr">type</span> : <span class="hljs-built_in">Number</span>,
            <span class="hljs-attr">default</span> : <span class="hljs-number">1</span>
        },

        <span class="hljs-comment">//每页显示条数</span>
        pageSize : {
            <span class="hljs-attr">type</span> : <span class="hljs-built_in">Number</span>,
            <span class="hljs-attr">default</span> : <span class="hljs-number">10</span>
        },

        <span class="hljs-comment">//总记录数</span>
        total : {
            <span class="hljs-attr">type</span> : <span class="hljs-built_in">Number</span>,
            <span class="hljs-attr">default</span> : <span class="hljs-number">1</span>
        },

    },
    <span class="hljs-attr">methods</span> : {
        prev(){
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index &gt; <span class="hljs-number">1</span>) {
                <span class="hljs-keyword">this</span>.go(<span class="hljs-keyword">this</span>.index - <span class="hljs-number">1</span>)
            }
        },
        next(){
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index &lt; <span class="hljs-keyword">this</span>.pages) {
                <span class="hljs-keyword">this</span>.go(<span class="hljs-keyword">this</span>.index + <span class="hljs-number">1</span>)
            }
        },
        first(){
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index !== <span class="hljs-number">1</span>) {
                <span class="hljs-keyword">this</span>.go(<span class="hljs-number">1</span>)
            }
        },
        last(){
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index != <span class="hljs-keyword">this</span>.pages) {
                <span class="hljs-keyword">this</span>.go(<span class="hljs-keyword">this</span>.pages)
            }
        },
        go (page) {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.index !== page) {
                <span class="hljs-keyword">this</span>.index = page
                <span class="hljs-comment">//父组件通过change方法来接受当前的页码</span>
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'change'</span>, <span class="hljs-keyword">this</span>.index)
            }
        }
    },
    <span class="hljs-attr">computed</span> : {

        <span class="hljs-comment">//计算总页码</span>
        pages(){
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.ceil(<span class="hljs-keyword">this</span>.size / <span class="hljs-keyword">this</span>.limit)
        },

        <span class="hljs-comment">//计算页码，当count等变化时自动计算</span>
        pagers () {
            <span class="hljs-keyword">const</span> array = []
            <span class="hljs-keyword">const</span> perPages = <span class="hljs-keyword">this</span>.perPages
            <span class="hljs-keyword">const</span> pageCount = <span class="hljs-keyword">this</span>.pages
            <span class="hljs-keyword">let</span> current = <span class="hljs-keyword">this</span>.index
            <span class="hljs-keyword">const</span> _offset = (perPages - <span class="hljs-number">1</span>) / <span class="hljs-number">2</span>

            
            <span class="hljs-keyword">const</span> offset = {
                <span class="hljs-attr">start</span> : current - _offset,
                <span class="hljs-attr">end</span>   : current + _offset
            }

            <span class="hljs-comment">//-1, 3</span>
            <span class="hljs-keyword">if</span> (offset.start &lt; <span class="hljs-number">1</span>) {
                offset.end = offset.end + (<span class="hljs-number">1</span> - offset.start)
                offset.start = <span class="hljs-number">1</span>
            }
            <span class="hljs-keyword">if</span> (offset.end &gt; pageCount) {
                offset.start = offset.start - (offset.end - pageCount)
                offset.end = pageCount
            }
            <span class="hljs-keyword">if</span> (offset.start &lt; <span class="hljs-number">1</span>) offset.start = <span class="hljs-number">1</span>

            <span class="hljs-keyword">this</span>.showPrevMore = (offset.start &gt; <span class="hljs-number">1</span>)
            <span class="hljs-keyword">this</span>.showNextMore = (offset.end &lt; pageCount)

            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = offset.start; i &lt;= offset.end; i++) {
                array.push(i)
            }

            <span class="hljs-keyword">return</span> array
        }
    },
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">index</span> : <span class="hljs-keyword">this</span>.pageIndex, <span class="hljs-comment">//当前页码</span>
            limit : <span class="hljs-keyword">this</span>.pageSize, <span class="hljs-comment">//每页显示条数</span>
            size : <span class="hljs-keyword">this</span>.total || <span class="hljs-number">1</span>, <span class="hljs-comment">//总记录数</span>
            showPrevMore : <span class="hljs-literal">false</span>,
            <span class="hljs-attr">showNextMore</span> : <span class="hljs-literal">false</span>
        }
    },
    <span class="hljs-attr">watch</span> : {
        pageIndex(val) {
            <span class="hljs-keyword">this</span>.index = val || <span class="hljs-number">1</span>
        },
        pageSize(val) {
            <span class="hljs-keyword">this</span>.limit = val || <span class="hljs-number">10</span>
        },
        total(val) {
            <span class="hljs-keyword">this</span>.size = val || <span class="hljs-number">1</span>
        }
    }
}</code></pre>
<h3 id="articleHeader1">父组件中使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;list&quot;>
        <template v-if=&quot;count&quot;>
            <ul>
                <li v-for=&quot;item in items&quot;>...</li>
            </ul>
            <mo-paging 
            :page-index=&quot;currentPage&quot; 
            :totla=&quot;count&quot; 
            :page-size=&quot;pageSize&quot; 
            @change=&quot;pageChange&quot;>
            </mo-paging>
        </template>
    </div>
</template>
<script>
    import MoPaging from './paging'
    export default {
        //显示的声明组件
        components : {
            MoPaging 
        },
        data () {
            return {
                pageSize : 20 , //每页显示20条数据
                currentPage : 1, //当前页码
                count : 0, //总记录数
                items : []
            }
        },
        methods : {
            //获取数据
            getList () {
                //模拟
                let url = `/api/list/?pageSize=${this.pageSize}&amp;currentPage=${this.currentPage}`
                this.$http.get(url)
                .then(({body}) => {

                    //子组件监听到count变化会自动更新DOM
                    this.count = body.count
                    this.items = body.list
                })
            },

            //从page组件传递过来的当前page
            pageChange (page) {
                this.currentPage = page
                this.getList()
            }
        },
        mounted() {
            //请求第一页数据
            this.getList()
        } 
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"count"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">mo-paging</span> 
            <span class="hljs-attr">:page-index</span>=<span class="hljs-string">"currentPage"</span> 
            <span class="hljs-attr">:totla</span>=<span class="hljs-string">"count"</span> 
            <span class="hljs-attr">:page-size</span>=<span class="hljs-string">"pageSize"</span> 
            @<span class="hljs-attr">change</span>=<span class="hljs-string">"pageChange"</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">mo-paging</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> MoPaging <span class="hljs-keyword">from</span> <span class="hljs-string">'./paging'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-comment">//显示的声明组件</span>
        components : {
            MoPaging 
        },
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">pageSize</span> : <span class="hljs-number">20</span> , <span class="hljs-comment">//每页显示20条数据</span>
                currentPage : <span class="hljs-number">1</span>, <span class="hljs-comment">//当前页码</span>
                count : <span class="hljs-number">0</span>, <span class="hljs-comment">//总记录数</span>
                items : []
            }
        },
        <span class="hljs-attr">methods</span> : {
            <span class="hljs-comment">//获取数据</span>
            getList () {
                <span class="hljs-comment">//模拟</span>
                <span class="hljs-keyword">let</span> url = <span class="hljs-string">`/api/list/?pageSize=<span class="hljs-subst">${<span class="hljs-keyword">this</span>.pageSize}</span>&amp;currentPage=<span class="hljs-subst">${<span class="hljs-keyword">this</span>.currentPage}</span>`</span>
                <span class="hljs-keyword">this</span>.$http.get(url)
                .then(<span class="hljs-function">(<span class="hljs-params">{body}</span>) =&gt;</span> {

                    <span class="hljs-comment">//子组件监听到count变化会自动更新DOM</span>
                    <span class="hljs-keyword">this</span>.count = body.count
                    <span class="hljs-keyword">this</span>.items = body.list
                })
            },

            <span class="hljs-comment">//从page组件传递过来的当前page</span>
            pageChange (page) {
                <span class="hljs-keyword">this</span>.currentPage = page
                <span class="hljs-keyword">this</span>.getList()
            }
        },
        mounted() {
            <span class="hljs-comment">//请求第一页数据</span>
            <span class="hljs-keyword">this</span>.getList()
        } 
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>本文首发于<a href="https://smohan.net/blog/pgk1qr" rel="nofollow noreferrer" target="_blank">我的博客</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Vue实现一个分页组件

## 原文链接
[https://segmentfault.com/a/1190000008606958](https://segmentfault.com/a/1190000008606958)

