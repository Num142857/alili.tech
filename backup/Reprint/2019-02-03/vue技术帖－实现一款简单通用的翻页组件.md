---
title: 'vue技术帖－实现一款简单通用的翻页组件' 
date: 2019-02-03 2:30:40
hidden: true
slug: fhmn3m963iu
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">预览</h3>
<p>先上一波效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bVDadf?w=800&amp;h=300" src="https://static.alili.tech/img/bVDadf?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">基本元素</h3>
<p>首先，翻页组件（以下称“<code>pager</code>组件”）一般拥有的元素有：</p>
<ul>
<li><p>上一页</p></li>
<li><p>第一页</p></li>
<li><p>中间显示的页码</p></li>
<li><p>最后一页</p></li>
<li><p>下一页</p></li>
</ul>
<p>初始化时需要的配置有：</p>
<ul>
<li><p><code>totalPage</code>（总页数）</p></li>
<li><p><code>initPage</code>（初始页）</p></li>
<li><p><code>showPrev</code>（是否显示上一页）</p></li>
<li><p><code>showNext</code>（是否显示下一页）</p></li>
<li><p><code>showItems</code>（中间显示几页）</p></li>
<li><p><code>showJump</code>（是否显示跳转到第几页）</p></li>
</ul>
<p>这些可以通过<code>vue</code>的<code>props</code>来接收。</p>
<p>另外，<code>pager</code>组件本身需要有一个记录当前页的<code>currentPage</code>，<code>pages</code>数组用来容纳中间显示的页码，<code>jumpPage</code>绑定输入的跳转页码。</p>
<h3 id="articleHeader2">基本实现</h3>
<p>对应的代码为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;pager-wrapper&quot; v-if=&quot;totalPage > 0&quot;>
        <div class=&quot;pager-pages&quot;>
            <a v-show=&quot;currentPage > 1 &amp;&amp; showPrev&quot; @click=&quot;go(currentPage - 1)&quot;>上一页</a>
            <a :class=&quot;{active: currentPage == 1 ? true : false}&quot; @click=&quot;go(1)&quot;>1</a>
            <strong v-show=&quot;pages[0] > 2&quot;>...</strong>
            <a v-for=&quot;page in pages&quot; :class=&quot;{active: currentPage == page ? true : false}&quot; @click=&quot;go(page)&quot;>"{{"page"}}"</a>
            <strong v-show=&quot;pages[pages.length-1] < totalPage - 1&quot;>...</strong>
            <a v-if=&quot;totalPage > 1&quot; :class=&quot;{active: currentPage == totalPage ? true : false}&quot; @click=&quot;go(totalPage)&quot;>"{{"totalPage"}}"</a>
            <a v-show=&quot;currentPage < totalPage &amp;&amp; showNext&quot; @click=&quot;go(currentPage + 1)&quot;>下一页</a>
        </div>
        <div v-if=&quot;showJump&quot; v-show=&quot;totalPage > 1&quot; class=&quot;pager-jump&quot;>
            <span>共<em class=&quot;jump-total&quot;>"{{"totalPage"}}"</em>页 ，跳至</span>
            <input type=&quot;number&quot; min=&quot;1&quot; :max=&quot;totalPage&quot; v-model=&quot;jumpPage&quot; class=&quot;jump-input&quot;>
            <span>页</span>
            <a @click=&quot;go(jumpPage)&quot;>确定</a>
        </div>
    </div>
</template>
<script>
  export default {
        props: {
            totalPage: { // 总页数
                type: Number,
                default: 1,
                required: true
            },
            showItems: { // 显示出来的页数，如: 1 ... 34[5]67 ... 10
                type: Number,
                default: 5
            },
            showPrev: { // 是否显示“上一页”
                type: Boolean,
                default: true
            },
            showNext: { // 是否显示“下一页”
                type: Boolean,
                default: true
            },
            showJump: { // 是否显示“跳转”
                type: Boolean,
                default: true
            },
            initPage: {
                type: Number,
                default: 1
            }
        },
        data () {
            return {
                currentPage: 0,
                pages: [],
                jumpPage: 0,
            }
        },
        created () {// 初始化时currentPage赋值
            this.currentPage = this.initPage
        }
        methods: {
            go (page) {
                if(page < 1) {
                    page = 1
                }
                if(page > this.totalPage) {
                    page = this.totalPage
                }
                if(page === this.currentPage) {
                    return
                }
                this.currentPage = parseInt(page,10)
                this.$emit('go-page',{
                    page: this.currentPage
                })
            }
        },
        watch: {
            currentPage (newVal) {
                this.jumpPage = newVal
            },
            initPage (newVal) {
                if(this.currentPage !== newVal) {
                    this.currentPage = newVal
                }
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pager-wrapper"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"totalPage &gt; 0"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pager-pages"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"currentPage &gt; 1 &amp;&amp; showPrev"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"go(currentPage - 1)"</span>&gt;</span>上一页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: currentPage == 1 ? true : false}"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"go(1)"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">strong</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"pages[0] &gt; 2"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"page in pages"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: currentPage == page ? true : false}"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"go(page)"</span>&gt;</span>"{{"page"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">strong</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"pages[pages.length-1] &lt; totalPage - 1"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"totalPage &gt; 1"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: currentPage == totalPage ? true : false}"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"go(totalPage)"</span>&gt;</span>"{{"totalPage"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"currentPage &lt; totalPage &amp;&amp; showNext"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"go(currentPage + 1)"</span>&gt;</span>下一页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"showJump"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"totalPage &gt; 1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pager-jump"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>共<span class="hljs-tag">&lt;<span class="hljs-name">em</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"jump-total"</span>&gt;</span>"{{"totalPage"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span>页 ，跳至<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"number"</span> <span class="hljs-attr">min</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">:max</span>=<span class="hljs-string">"totalPage"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"jumpPage"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"jump-input"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>页<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"go(jumpPage)"</span>&gt;</span>确定<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">props</span>: {
            <span class="hljs-attr">totalPage</span>: { <span class="hljs-comment">// 总页数</span>
                type: <span class="hljs-built_in">Number</span>,
                <span class="hljs-attr">default</span>: <span class="hljs-number">1</span>,
                <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
            },
            <span class="hljs-attr">showItems</span>: { <span class="hljs-comment">// 显示出来的页数，如: 1 ... 34[5]67 ... 10</span>
                type: <span class="hljs-built_in">Number</span>,
                <span class="hljs-attr">default</span>: <span class="hljs-number">5</span>
            },
            <span class="hljs-attr">showPrev</span>: { <span class="hljs-comment">// 是否显示“上一页”</span>
                type: <span class="hljs-built_in">Boolean</span>,
                <span class="hljs-attr">default</span>: <span class="hljs-literal">true</span>
            },
            <span class="hljs-attr">showNext</span>: { <span class="hljs-comment">// 是否显示“下一页”</span>
                type: <span class="hljs-built_in">Boolean</span>,
                <span class="hljs-attr">default</span>: <span class="hljs-literal">true</span>
            },
            <span class="hljs-attr">showJump</span>: { <span class="hljs-comment">// 是否显示“跳转”</span>
                type: <span class="hljs-built_in">Boolean</span>,
                <span class="hljs-attr">default</span>: <span class="hljs-literal">true</span>
            },
            <span class="hljs-attr">initPage</span>: {
                <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
                <span class="hljs-attr">default</span>: <span class="hljs-number">1</span>
            }
        },
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">currentPage</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">pages</span>: [],
                <span class="hljs-attr">jumpPage</span>: <span class="hljs-number">0</span>,
            }
        },
        created () {<span class="hljs-comment">// 初始化时currentPage赋值</span>
            <span class="hljs-keyword">this</span>.currentPage = <span class="hljs-keyword">this</span>.initPage
        }
        methods: {
            go (page) {
                <span class="hljs-keyword">if</span>(page &lt; <span class="hljs-number">1</span>) {
                    page = <span class="hljs-number">1</span>
                }
                <span class="hljs-keyword">if</span>(page &gt; <span class="hljs-keyword">this</span>.totalPage) {
                    page = <span class="hljs-keyword">this</span>.totalPage
                }
                <span class="hljs-keyword">if</span>(page === <span class="hljs-keyword">this</span>.currentPage) {
                    <span class="hljs-keyword">return</span>
                }
                <span class="hljs-keyword">this</span>.currentPage = <span class="hljs-built_in">parseInt</span>(page,<span class="hljs-number">10</span>)
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'go-page'</span>,{
                    <span class="hljs-attr">page</span>: <span class="hljs-keyword">this</span>.currentPage
                })
            }
        },
        <span class="hljs-attr">watch</span>: {
            currentPage (newVal) {
                <span class="hljs-keyword">this</span>.jumpPage = newVal
            },
            initPage (newVal) {
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.currentPage !== newVal) {
                    <span class="hljs-keyword">this</span>.currentPage = newVal
                }
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>接下来就是<code>pages</code>数组的值如何获取到。由于<code>pages</code>始终是跟当前页<code>currentPage</code>以及配置中需要显示的<code>showItems</code>强相关的，那么完全可以将<code>pages</code>改为计算属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
    pages () {
        // 根据起始页码和结束页码得到页码数组
        let getPages = (start,end) => {
            if(start <= 1 || start > end || start >= this.totalPage) {
                start = 2
            }
            if(end >= this.totalPage || end < start || end <= 1) {
                end = this.totalPage - 1
            }
            let arr = []
            for(let i = start; i <= end; i++) {
                arr.push(i)
            }
            return arr
        }
        let counts = this.showItems
        if(this.totalPage < counts + 2) {
            return getPages(2,this.totalPage)
        } else {
            if(this.currentPage <= Math.ceil(counts/2)) {
                return getPages(2,counts)
            } else if(this.currentPage >= this.totalPage - Math.floor(counts/2)) {
                return getPages(this.totalPage + 1 - counts,this.totalPage - 1)
            } else {
                let half = Math.ceil(counts/2) - 1
                let end = this.currentPage + half
                if(counts % 2 === 0) {
                    end++
                }
                return getPages(this.currentPage - half,end)
            }
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">computed: {
    pages () {
        <span class="hljs-comment">// 根据起始页码和结束页码得到页码数组</span>
        <span class="hljs-keyword">let</span> getPages = <span class="hljs-function">(<span class="hljs-params">start,end</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span>(start &lt;= <span class="hljs-number">1</span> || start &gt; end || start &gt;= <span class="hljs-keyword">this</span>.totalPage) {
                start = <span class="hljs-number">2</span>
            }
            <span class="hljs-keyword">if</span>(end &gt;= <span class="hljs-keyword">this</span>.totalPage || end &lt; start || end &lt;= <span class="hljs-number">1</span>) {
                end = <span class="hljs-keyword">this</span>.totalPage - <span class="hljs-number">1</span>
            }
            <span class="hljs-keyword">let</span> arr = []
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = start; i &lt;= end; i++) {
                arr.push(i)
            }
            <span class="hljs-keyword">return</span> arr
        }
        <span class="hljs-keyword">let</span> counts = <span class="hljs-keyword">this</span>.showItems
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.totalPage &lt; counts + <span class="hljs-number">2</span>) {
            <span class="hljs-keyword">return</span> getPages(<span class="hljs-number">2</span>,<span class="hljs-keyword">this</span>.totalPage)
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.currentPage &lt;= <span class="hljs-built_in">Math</span>.ceil(counts/<span class="hljs-number">2</span>)) {
                <span class="hljs-keyword">return</span> getPages(<span class="hljs-number">2</span>,counts)
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.currentPage &gt;= <span class="hljs-keyword">this</span>.totalPage - <span class="hljs-built_in">Math</span>.floor(counts/<span class="hljs-number">2</span>)) {
                <span class="hljs-keyword">return</span> getPages(<span class="hljs-keyword">this</span>.totalPage + <span class="hljs-number">1</span> - counts,<span class="hljs-keyword">this</span>.totalPage - <span class="hljs-number">1</span>)
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">let</span> half = <span class="hljs-built_in">Math</span>.ceil(counts/<span class="hljs-number">2</span>) - <span class="hljs-number">1</span>
                <span class="hljs-keyword">let</span> end = <span class="hljs-keyword">this</span>.currentPage + half
                <span class="hljs-keyword">if</span>(counts % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>) {
                    end++
                }
                <span class="hljs-keyword">return</span> getPages(<span class="hljs-keyword">this</span>.currentPage - half,end)
            }
        }
    }
}</code></pre>
<h3 id="articleHeader3">功能拓展</h3>
<p>到这里一个普通的翻页组件基本上就实现了（样式自己可以去定制）。但是很多时候（特别是一些管理后台），结合<code>vue-router</code>做成SPA，通常会有这样的需求：</p>
<blockquote><p>翻到某个列表的某一页之后，点击某一项到编辑页，编辑完成后希望能够返回到跳转之前的那一页。</p></blockquote>
<p>这个需求如果仅仅用上面的<code>pager</code>组件，实现起来就不是很方便。也许有人会说结合<code>vuex</code>可以，但是这样的话需要在state中记录下跳转前的页码。假如有很多个翻页列表，就需要记录多个，这显然并不优雅。</p>
<p>不过因为<code>vue-router</code>实现的优雅，我们要满足上面的需求也很简单：<br>首先props上增加<code>mode</code>配置，由于当<code>mode</code>为<code>params</code>时，跳转需要知道是在哪一个路由下，所以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mode: {
    type: String,
    default: 'event' // 'event' | 'query' | 'params'
},
routeName: {
    type: String
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">mode: {
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
    <span class="hljs-attr">default</span>: <span class="hljs-string">'event'</span> <span class="hljs-comment">// 'event' | 'query' | 'params'</span>
},
<span class="hljs-attr">routeName</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
}</code></pre>
<p>然后再在实际跳转的逻辑方法<code>go(page)</code>里面，做点更改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="go (page) {
    if(page < 1) {
        page = 1
    }
    if(page > this.totalPage) {
        page = this.totalPage
    }
    if(page === this.currentPage) {
        return
    }
    this.currentPage = parseInt(page,10)
    if(this.mode == 'query') {
        let query = this.$route.query
        query.page = this.currentPage
        this.$router.go({query: query})
    } else if(this.mode == 'params') {
        let params = this.$route.params
        params.page = this.currentPage
        this.$router.go({name: this.routeName,params: params})
    } else {
        this.$emit('go-page',{
            page: this.currentPage
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">go (page) {
    <span class="hljs-keyword">if</span>(page &lt; <span class="hljs-number">1</span>) {
        page = <span class="hljs-number">1</span>
    }
    <span class="hljs-keyword">if</span>(page &gt; <span class="hljs-keyword">this</span>.totalPage) {
        page = <span class="hljs-keyword">this</span>.totalPage
    }
    <span class="hljs-keyword">if</span>(page === <span class="hljs-keyword">this</span>.currentPage) {
        <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">this</span>.currentPage = <span class="hljs-built_in">parseInt</span>(page,<span class="hljs-number">10</span>)
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.mode == <span class="hljs-string">'query'</span>) {
        <span class="hljs-keyword">let</span> query = <span class="hljs-keyword">this</span>.$route.query
        query.page = <span class="hljs-keyword">this</span>.currentPage
        <span class="hljs-keyword">this</span>.$router.go({<span class="hljs-attr">query</span>: query})
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.mode == <span class="hljs-string">'params'</span>) {
        <span class="hljs-keyword">let</span> params = <span class="hljs-keyword">this</span>.$route.params
        params.page = <span class="hljs-keyword">this</span>.currentPage
        <span class="hljs-keyword">this</span>.$router.go({<span class="hljs-attr">name</span>: <span class="hljs-keyword">this</span>.routeName,<span class="hljs-attr">params</span>: params})
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'go-page'</span>,{
            <span class="hljs-attr">page</span>: <span class="hljs-keyword">this</span>.currentPage
        })
    }
}</code></pre>
<p>这样基本上就完成了一个简单且通用的翻页组件啦，接下里就是发不到仓库里供大家使用了。<br>本文最终实现的翻页组件已经发布，大家可以看一波源码：<br><a href="https://github.com/hyiso/vue-simple-pager" rel="nofollow noreferrer" target="_blank">vue-simple-pager</a></p>
<h3 id="articleHeader4">总结</h3>
<p>总体上讲的比较浅显，希望能有帮助。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue技术帖－实现一款简单通用的翻页组件

## 原文链接
[https://segmentfault.com/a/1190000006911880](https://segmentfault.com/a/1190000006911880)

