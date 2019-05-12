---
title: '基于Vue.js的表格分页组件' 
date: 2019-02-10 2:30:42
hidden: true
slug: 2lv97n68jey
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>有一段时间没更新文章了，主要是因为自己一直在忙着学习新的东西而忘记分享了，实在惭愧。<br>这不，大半夜发文更一篇文章，分享一个自己编写的一个Vue的小组件，名叫BootPage。不了解Vue.js的童鞋可以移步我的上一篇文章<a href="https://segmentfault.com/a/1190000004704498?_ea=797840">《浅谈Vue.js》</a>了解一下。</p></blockquote>
<h2 id="articleHeader0">BootPage组件简介</h2>
<p>其实也不是啥高大上的组件了，相反确实一个简单的表格分页组件而已，主要是自己最近项目中需要一个表格分页组件，而Vue官方组件库里分页组件都功能太强大或者没有适合我的，所以就自己写了一个凑合着用，或许有人和我一样需要这样一个简单的分页组件来实现简单的分页功能，我便在这里分享一下，大家自觉填坑咯。</p>
<p>如需高大上的组件，可以移步Vue官方组件库：<a href="https://github.com/vuejs/awesome-vue#libraries--plugins" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/vuejs/awesome-vue#libraries--plugins" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/awes...</a></p>
<p>BootPage是一款支持静态数据和服务器数据的表格分页组件，支持调整每页显示行数和页码显示个数，样式基于bootstrap，就像这样：<br><span class="img-wrap"><img data-src="/img/bVzuAG" src="https://static.alili.tech/img/bVzuAG" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在线演示：<a href="https://luozhihao.github.io/BootPage/index.html#" rel="nofollow noreferrer" target="_blank"></a><a href="https://luozhihao.github.io/BootPage/index.html" rel="nofollow noreferrer" target="_blank">https://luozhihao.github.io/B...</a></p>
<h2 id="articleHeader1">使用方法</h2>
<p>在.vue的组件文件中我们这样写template，即html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table class=&quot;table table-hover table-bordered&quot;>
        <thead>
            <tr>
                <th width=&quot;10%&quot;>id</th>
                <th width=&quot;30%&quot;>name</th>
                <th width=&quot;40%&quot;>content</th>
                <th width=&quot;20%&quot;>remark</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for=&quot;data in tableList&quot;>
                <td v-text=&quot;data.num&quot;></td>
                <td v-text=&quot;data.author&quot;></td>
                <td v-text=&quot;data.contents&quot;></td>
                <td v-text=&quot;data.remark&quot;></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan=&quot;4&quot;>
                    <div class=&quot;pull-left&quot;>
                        <button class=&quot;btn btn-default&quot; v-on:click=&quot;refresh&quot;>刷新</button>
                    </div>
                    <div class=&quot;pull-right&quot;>
                        <boot-page :async=&quot;false&quot; :data=&quot;lists&quot; :lens=&quot;lenArr&quot; :page-len=&quot;pageLen&quot; :param=&quot;param&quot;></boot-page>
                    </div>
                </td>
            </tr>
        </tfoot>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"table table-hover table-bordered"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"10%"</span>&gt;</span>id<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"30%"</span>&gt;</span>name<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"40%"</span>&gt;</span>content<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"20%"</span>&gt;</span>remark<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"data in tableList"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"data.num"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"data.author"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"data.contents"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"data.remark"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tfoot</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">colspan</span>=<span class="hljs-string">"4"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pull-left"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-default"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"refresh"</span>&gt;</span>刷新<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pull-right"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">boot-page</span> <span class="hljs-attr">:async</span>=<span class="hljs-string">"false"</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"lists"</span> <span class="hljs-attr">:lens</span>=<span class="hljs-string">"lenArr"</span> <span class="hljs-attr">:page-len</span>=<span class="hljs-string">"pageLen"</span> <span class="hljs-attr">:param</span>=<span class="hljs-string">"param"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">boot-page</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tfoot</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p>&lt;boot-page&gt;标签中async指是否从服务器端获取数据，false为否；data为静态的表格数据数组；lens为每页显示行数的数组；page-len为可显示的页码数；</p>
<p>使用静态数据的javascript代码即script标签内的内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
        import bootPage from './components/BootPage.vue'

        export default {
            data () {
                return {
                    lenArr: [10, 50, 100], // 每页显示长度设置
                    pageLen: 5, // 可显示的分页数
                    lists: [
                        {num: 1, author: 'luozh', contents: 'BootPage是一款支持静态数据和服务器数据的表格分页组件', remark: 'dsds'},
                        {num: 2, author: 'luozh', contents: '支持调整每页显示行数和页码显示个数，样式基于bootstrap', remark: 'dsds'},
                        {num: 3, author: 'luozh', contents: '<boot-page>标签中async指是否从服务器端获取数据，false为否', remark: 'dsds'},
                        {num: 4, author: 'luozh', contents: 'data为静态的表格数据数组；', remark: 'dsds'},
                        {num: 5, author: 'luozh', contents: 'lens为每页显示行数的数组', remark: 'dsds'},
                        {num: 6, author: 'luozh', contents: 'page-len为可显示的页码数', remark: 'dsds'},
                        {num: 7, author: 'luozh', contents: '服务器回传参数为{data:[], page_num: 6}, 其中data为表格数据，page_num为总页数', remark: 'dsds'},
                        {num: 8, author: 'luozh', contents: '可以调用this.$refs.page.refresh()刷新表格数据', remark: 'dsds'}
                    ], // 表格原始数据，使用服务器数据时无需使用
                    tableList: [] // 分页组件传回的分页后数据
                }
            },
            components: {
                bootPage
            },
            events: {

                // 分页组件传回的表格数据
                'data' (data) {
                    this.tableList = data
                }
            }
        }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>&lt;script&gt;
        <span class="hljs-keyword">import</span> bootPage from <span class="hljs-string">'./components/BootPage.vue'</span>

        <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
            data () {
                <span class="hljs-keyword">return</span> {
                    lenArr: [<span class="hljs-number">10</span>, <span class="hljs-number">50</span>, <span class="hljs-number">100</span>], <span class="hljs-comment">// 每页显示长度设置</span>
                    pageLen: <span class="hljs-number">5</span>, <span class="hljs-comment">// 可显示的分页数</span>
                    lists: [
                        {<span class="hljs-built_in">num</span>: <span class="hljs-number">1</span>, author: <span class="hljs-string">'luozh'</span>, contents: <span class="hljs-string">'BootPage是一款支持静态数据和服务器数据的表格分页组件'</span>, remark: <span class="hljs-string">'dsds'</span>},
                        {<span class="hljs-built_in">num</span>: <span class="hljs-number">2</span>, author: <span class="hljs-string">'luozh'</span>, contents: <span class="hljs-string">'支持调整每页显示行数和页码显示个数，样式基于bootstrap'</span>, remark: <span class="hljs-string">'dsds'</span>},
                        {<span class="hljs-built_in">num</span>: <span class="hljs-number">3</span>, author: <span class="hljs-string">'luozh'</span>, contents: <span class="hljs-string">'&lt;boot-page&gt;标签中async指是否从服务器端获取数据，false为否'</span>, remark: <span class="hljs-string">'dsds'</span>},
                        {<span class="hljs-built_in">num</span>: <span class="hljs-number">4</span>, author: <span class="hljs-string">'luozh'</span>, contents: <span class="hljs-string">'data为静态的表格数据数组；'</span>, remark: <span class="hljs-string">'dsds'</span>},
                        {<span class="hljs-built_in">num</span>: <span class="hljs-number">5</span>, author: <span class="hljs-string">'luozh'</span>, contents: <span class="hljs-string">'lens为每页显示行数的数组'</span>, remark: <span class="hljs-string">'dsds'</span>},
                        {<span class="hljs-built_in">num</span>: <span class="hljs-number">6</span>, author: <span class="hljs-string">'luozh'</span>, contents: <span class="hljs-string">'page-len为可显示的页码数'</span>, remark: <span class="hljs-string">'dsds'</span>},
                        {<span class="hljs-built_in">num</span>: <span class="hljs-number">7</span>, author: <span class="hljs-string">'luozh'</span>, contents: <span class="hljs-string">'服务器回传参数为{data:[], page_num: 6}, 其中data为表格数据，page_num为总页数'</span>, remark: <span class="hljs-string">'dsds'</span>},
                        {<span class="hljs-built_in">num</span>: <span class="hljs-number">8</span>, author: <span class="hljs-string">'luozh'</span>, contents: <span class="hljs-string">'可以调用this.$refs.page.refresh()刷新表格数据'</span>, remark: <span class="hljs-string">'dsds'</span>}
                    ], <span class="hljs-comment">// 表格原始数据，使用服务器数据时无需使用</span>
                    tableList: [] <span class="hljs-comment">// 分页组件传回的分页后数据</span>
                }
            },
            components: {
                bootPage
            },
            events: {

                <span class="hljs-comment">// 分页组件传回的表格数据</span>
                <span class="hljs-string">'data'</span> (data) {
                    <span class="hljs-keyword">this</span>.tableList = data
                }
            }
        }
&lt;/script&gt;</code></pre>
<p>一般我们很少使用静态的表格数据，大多数应用的数据都是从服务器端获取的，所以这里提供了获取服务器分页数据的方法：<br>使用服务器数据的组件HTML如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<boot-page v-ref:page :async=&quot;true&quot; :lens=&quot;lenArr&quot; :url=&quot;url&quot; :page-len=&quot;pageLen&quot; :param=&quot;param&quot;></boot-page>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;boot-page v-<span class="hljs-symbol">ref:</span>page <span class="hljs-symbol">:async=<span class="hljs-string">"true"</span></span> <span class="hljs-symbol">:lens=<span class="hljs-string">"lenArr"</span></span> <span class="hljs-symbol">:url=<span class="hljs-string">"url"</span></span> <span class="hljs-symbol">:page-len=<span class="hljs-string">"pageLen"</span></span> <span class="hljs-symbol">:param=<span class="hljs-string">"param"</span>&gt;&lt;/boot-page&gt;</span></code></pre>
<p>其中url为服务器的请求地址；param为需要向服务器发送的参数对象；</p>
<p>使用服务器数据javascript的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
        import bootPage from './components/BootPage.vue'

        export default {
            data () {
                return {
                    lenArr: [10, 50, 100], // 每页显示长度设置
                    pageLen: 5, // 可显示的分页数
                    url: '/bootpage/', // 请求路径
                    param: {}, // 向服务器传递参数
                    tableList: [] // 分页组件传回的分页后数据
                }
            },
            methods: {
                refresh () {
                    this.$refs.page.refresh() // 这里提供了一个表格刷新功能
                }
            },
            components: {
                bootPage
            },
            events: {

                // 分页组件传回的表格数据（这里即为服务器传回的数据）
                'data' (data) {
                    this.tableList = data
                },

                // 刷新数据
                'refresh' () {
                    this.refresh()
                }
            }
        }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;script&gt;
        <span class="hljs-keyword">import</span> bootPage from <span class="hljs-string">'./components/BootPage.vue'</span>

        export <span class="hljs-keyword">default</span> {
            <span class="hljs-keyword">data</span> () {
                <span class="hljs-keyword">return</span> {
                    lenArr: [<span class="hljs-number">10</span>, <span class="hljs-number">50</span>, <span class="hljs-number">100</span>], <span class="hljs-comment">// 每页显示长度设置</span>
                    pageLen: <span class="hljs-number">5</span>, <span class="hljs-comment">// 可显示的分页数</span>
                    url: <span class="hljs-string">'/bootpage/'</span>, <span class="hljs-comment">// 请求路径</span>
                    param: {}, <span class="hljs-comment">// 向服务器传递参数</span>
                    tableList: [] <span class="hljs-comment">// 分页组件传回的分页后数据</span>
                }
            },
            methods: {
                refresh () {
                    <span class="hljs-keyword">this</span>.$refs.page.refresh() <span class="hljs-comment">// 这里提供了一个表格刷新功能</span>
                }
            },
            components: {
                bootPage
            },
            events: {

                <span class="hljs-comment">// 分页组件传回的表格数据（这里即为服务器传回的数据）</span>
                <span class="hljs-string">'data'</span> (<span class="hljs-keyword">data</span>) {
                    <span class="hljs-keyword">this</span>.tableList = <span class="hljs-keyword">data</span>
                },

                <span class="hljs-comment">// 刷新数据</span>
                <span class="hljs-string">'refresh'</span> () {
                    <span class="hljs-keyword">this</span>.refresh()
                }
            }
        }
&lt;/script&gt;</code></pre>
<p>注：服务器除了传给组件表格的数组内容，还需一个总页数的键名，名为page_num</p>
<p>组件自带向服务器传递的参数为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    active: 1, // 当前页码
    length: 5  // 每页显示个数
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">active</span>: <span class="hljs-number">1</span>, // 当前页码
    length: <span class="hljs-number">5</span>  // 每页显示个数
}</code></pre>
<p>服务器回传的参数需为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    data: [], // 表格数据
    page_num: 5  // 总页数
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">data</span>: [], // 表格数据
    page_num: <span class="hljs-number">5</span>  // 总页数
}</code></pre>
<h2 id="articleHeader2">组件源码</h2>
<p>至于分页的实现源码这里的就不展示了，所有源码我都上传到了我的github，地址为：<a href="https://github.com/luozhihao/BootPage" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/luozhihao/BootPage" rel="nofollow noreferrer" target="_blank">https://github.com/luozhihao/...</a></p>
<p>这里事先提个醒：因为这个组件是我用几个小时赶出来的，所以对于Vue组件的编写格式和规范肯定是考虑不周的，没有完全独立出来，所以自觉填坑咯，这里只作分享。</p>
<p>当然你也可以随意的修改组件的代码来适合自己项目的使用，毕竟实现大而全的分页组件还是比较复杂的。</p>
<p>收工，欢迎评论指正。</p>
<p>本文地址：<a href="https://segmentfault.com/a/1190000005174322"></a><a href="https://segmentfault.com/a/1190000005174322" target="_blank">https://segmentfault.com/a/11...</a><br>博客园：<a href="http://www.cnblogs.com/luozhihao/p/5516065.html" rel="nofollow noreferrer" target="_blank"></a><a href="http://www.cnblogs.com/luozhihao/p/5516065.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/luozhi...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Vue.js的表格分页组件

## 原文链接
[https://segmentfault.com/a/1190000005174322](https://segmentfault.com/a/1190000005174322)

