---
title: 'webpack+vue项目实战（二，开发管理系统主页面）' 
date: 2019-01-10 2:30:08
hidden: true
slug: v27yjxelzec
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>上篇文章(<a href="https://segmentfault.com/a/1190000010025189">webpack+vue项目实战（一,搭建运行环境和相关配置）</a>)搭建了好了基本的一个项目目录，安好好了一些要用到的依赖，以及把项目跑了起来。接下来，我们就进行第二步的操作，第二步就是做好一个开发系统的主页面，这个页面主要也就是一个侧边栏，通过侧边栏的各个选项来进行操作（切换各个组件）。比如回款管理，订单管理，物流管理等等的操作。</p>
<h2 id="articleHeader1">2.顶部组件</h2>
<p>开始属于排版这一块了，是时候在index.js引入一个公用样式了,相当于一个样式重置表。</p>
<p><span class="img-wrap"><img data-src="/img/bVQb0E?w=450&amp;h=346" src="https://static.alili.tech/img/bVQb0E?w=450&amp;h=346" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>需求有一个，页面上面需要放一个退出的登录按钮，我就写了一个顶部组件的文件。首先就是创建这个文件</p>
<p><span class="img-wrap"><img data-src="/img/bVQbZE?w=702&amp;h=231" src="https://static.alili.tech/img/bVQbZE?w=702&amp;h=231" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;topbar&quot;>
        <el-button class=&quot;fr mr30 mt15&quot; type=&quot;primary&quot; size=&quot;small&quot; @click=&quot;loginOut&quot;>退出登录</el-button>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                name: 'topbar'
            }
        },
        methods: {
            loginOut(){
                ...
            }
        },
        mounted(){

        }
    }
</script>
<style lang=&quot;scss&quot; scoped>
    .topbar {
        width: 100%;
        height: 60px;
    }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topbar"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fr mr30 mt15"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"loginOut"</span>&gt;</span>退出登录<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        data(){
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'topbar'</span>
            }
        },
        <span class="hljs-attr">methods</span>: {
            loginOut(){
                ...
            }
        },
        mounted(){

        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.topbar</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>然后入口文件(<code>index.js</code>)引用这个文件，并且在vue中注册组件<code>import topbarComponent from './../components/admin_base/topbar.vue';</code></p>
<p><span class="img-wrap"><img data-src="/img/bVQb2m?w=803&amp;h=491" src="https://static.alili.tech/img/bVQb2m?w=803&amp;h=491" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后入口模板文件，index.html引入标签<br><span class="img-wrap"><img data-src="/img/bVQbZW?w=993&amp;h=570" src="https://static.alili.tech/img/bVQbZW?w=993&amp;h=570" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>页面结果（基于上一篇文章，已经跑起来的结果）</p>
<p><span class="img-wrap"><img data-src="/img/bVQb03?w=1890&amp;h=391" src="https://static.alili.tech/img/bVQb03?w=1890&amp;h=391" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote><p>页面上的class在公用样式里面有写好样式，还有一些样式是element-ui提供的，<br><code>&lt;el-button&gt;退出登录&lt;/el-button&gt;</code>就是element-ui提供的组件，在入口文件index.js已经引入了element-ui。这里直接用就好！</p></blockquote>
<p>这个比较简单，我就不多说了。</p>
<h2 id="articleHeader2">3.侧边栏组件</h2>
<p>这个侧边栏就是这篇文章的重点，也是整个项目操作的重点。先在目录上创建这样一个的侧边栏的组件文件。</p>
<p><span class="img-wrap"><img data-src="/img/bVQhOX?w=555&amp;h=155" src="https://static.alili.tech/img/bVQhOX?w=555&amp;h=155" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>下面图片是我们要实现的效果，那些排版切图的样式我不多说了，相信不会难倒大家</p>
<p><span class="img-wrap"><img data-src="/img/bVQeWs?w=208&amp;h=724" src="https://static.alili.tech/img/bVQeWs?w=208&amp;h=724" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">1.首先，创建一下这个侧边栏所需要的数据</h3>
<p>从上面的效果图的看到。有3个菜单（首页，销售消息通知，销售管理）。而且首页这个菜单可以点击，执行跳转，其它两个菜单又有子菜单，点击只是一个子菜单显示与隐藏的操作。<br>所以，侧边栏的数据肯定是一个数组，并且是一个对象数组。每个对象至少有四个属性(要显示的文字，跳转的url，是否有子菜单，是否当前菜单)。然后对于有子菜单的菜单，要给一个属性控制是否展开显示子菜单，要一个属性，储存子菜单。<br>如下面文字</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {
        菜单名:'菜单名称(首页)',
        跳转的url:'url(/index)',
        是否当前标识:'一个标志string(0)',
        是否有子菜单:'是否     true||false'
    }，
    {
        菜单名:'菜单名称(首页)',
        跳转的url:'url(/index)',
        是否当前标识:'一个标志string(0)',
        是否有子菜单:'true||false',
        是否展示:'是否     true||false',
        子菜单:[]
    }
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>[
    {
        菜单名:<span class="hljs-symbol">'菜单名称</span>(<span class="hljs-name">首页</span>)',
        跳转的url:<span class="hljs-symbol">'url</span>(<span class="hljs-name">/index</span>)',
        是否当前标识:<span class="hljs-symbol">'一个标志string</span>(<span class="hljs-name">0</span>)',
        是否有子菜单:<span class="hljs-symbol">'是否</span>     true||false'
    }，
    {
        菜单名:<span class="hljs-symbol">'菜单名称</span>(<span class="hljs-name">首页</span>)',
        跳转的url:<span class="hljs-symbol">'url</span>(<span class="hljs-name">/index</span>)',
        是否当前标识:<span class="hljs-symbol">'一个标志string</span>(<span class="hljs-name">0</span>)',
        是否有子菜单:<span class="hljs-symbol">'true</span>||false',
        是否展示:<span class="hljs-symbol">'是否</span>     true||false',
        子菜单:[]
    }
]
</code></pre>
<p>对于子菜单，由于没有子菜单了，所以需要三个属性（要显示的文字，跳转的url，是否当前标识:'一个标志string(0)'）就好。由于子菜单不止一个，所以，子子菜单这个肯定也是一个数组，每个子菜单也有属性，所以，也是一个对象属性，所以，数据大概如下面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {
        菜单名:'菜单名称   (首页)',
        跳转的url:'url  (/index)',
        是否当前标识:'一个标志string   (0)',
        是否有子菜单:'是否     true||false'
    }，
    {
        菜单名:'菜单名称  (首页)',
        跳转的url:'url  (/index)',
        是否当前标识:'一个标志string    (1)',
        是否有子菜单:'是否     true||false',
        是否展示:'是否    true||false',
        子菜单:[
            {
                菜单名:'菜单名称    (首页)',
                跳转的url:'url   (/index)',
                是否当前标识:'一个标志string   (1_1)'
            },
            {
                菜单名:'菜单名称   (首页)',
                跳转的url:'url   (/index)',
                是否当前标识:'一个标志string   (1_2)'
            }
        ]
    }
]

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>[
    {
        菜单名:<span class="hljs-symbol">'菜单名称</span>   (<span class="hljs-name">首页</span>)',
        跳转的url:<span class="hljs-symbol">'url</span>  (<span class="hljs-name">/index</span>)',
        是否当前标识:<span class="hljs-symbol">'一个标志string</span>   (<span class="hljs-name">0</span>)',
        是否有子菜单:<span class="hljs-symbol">'是否</span>     true||false'
    }，
    {
        菜单名:<span class="hljs-symbol">'菜单名称</span>  (<span class="hljs-name">首页</span>)',
        跳转的url:<span class="hljs-symbol">'url</span>  (<span class="hljs-name">/index</span>)',
        是否当前标识:<span class="hljs-symbol">'一个标志string</span>    (<span class="hljs-name">1</span>)',
        是否有子菜单:<span class="hljs-symbol">'是否</span>     true||false',
        是否展示:<span class="hljs-symbol">'是否</span>    true||false',
        子菜单:[
            {
                菜单名:<span class="hljs-symbol">'菜单名称</span>    (<span class="hljs-name">首页</span>)',
                跳转的url:<span class="hljs-symbol">'url</span>   (<span class="hljs-name">/index</span>)',
                是否当前标识:<span class="hljs-symbol">'一个标志string</span>   (<span class="hljs-name">1_1</span>)'
            },
            {
                菜单名:<span class="hljs-symbol">'菜单名称</span>   (<span class="hljs-name">首页</span>)',
                跳转的url:<span class="hljs-symbol">'url</span>   (<span class="hljs-name">/index</span>)',
                是否当前标识:<span class="hljs-symbol">'一个标志string</span>   (<span class="hljs-name">1_2</span>)'
            }
        ]
    }
]

</code></pre>
<p>最后，整理出来的数据就是！（tag这个标识数据，是我自己起的，大家也可以随意起。这个标识在下面会用到，在这里可以暂时不关注）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
    return {
        currentTag: '0',
        menus: [
            {
                name: '首页',
                url: '/index',
                tag: '0',
                hasExtend: false, //是否有二级菜单
            },
            {
                name: '销售消息通知',
                url: '/saleR',
                tag: 'sale',
                hasExtend: true, //是否有二级菜单
                fold: true, //是否展开
                extend: [
                    {
                        name: '待确认订单',
                        url: '/order/list/0?ordConfirmStatus=0',
                        tag: '1_1',
                    },
                    {
                        name: '待出库物流',
                        url: '/logistics/logisticsList/0',
                        tag: '1_2'
                    },
                    {
                        name: '待发货物流',
                        url: '/logistics/logisticsList/1',
                        tag: '1_3'
                    },
                    {
                        name: '待收货物流',
                        url: '/logistics/logisticsList/2',
                        tag: '1_4'
                    },
                    {
                        name: '待确认回款',
                        url: '/cash/cashList/0',
                        tag: '1_5'
                    },
                    {
                        name: '待开票申请',
                        url: '/invoice/invoiceWriteList/0',
                        tagIndex: '1_6'
                    }
                ]
            },
            {
                name: '销售管理',
                url: '/workbench',
                hasExtend: true, //是否有二级菜单
                fold: true,  //是否展开
                extend: [
                    {
                        name: '创建销售单',
                        url: '/order/create',
                        tag: '2_1'
                    },
                    {
                        name: '销售单管理',
                        url: '/order/list',
                        tag: '2_2'
                    },
                    {
                        name: '物流管理',
                        url: '/logistics/logisticsList',
                        tag: '2_3'
                    },
                    {
                        name: '回款管理',
                        url: '/cash/cashList',
                        tag: '2_4'
                    },
                    {
                        name: '开票管理',
                        url: '/invoice/invoiceWriteList',
                        tag: '2_9'
                    },
                    {
                        name: '票据管理',
                        url: '/invoice/invoiceManageList',
                        tag: '2_5'
                    },
                    {
                        name: '提成管理',
                        url: '/commission/commissionList',
                        tag: '2_6'
                    },
                    {
                        name: '提成设置',
                        url: '/commission/commissionSet',
                        tag: '2_7',
                    },
                    {
                        name: '合同管理',
                        url: '/contract/contractList',
                        tag: '2_8'
                    },
                ]
            },
        ],
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">data</span>(){
    <span class="hljs-selector-tag">return</span> {
        <span class="hljs-attribute">currentTag</span>: <span class="hljs-string">'0'</span>,
        <span class="hljs-attribute">menus</span>: [
            {
                <span class="hljs-attribute">name</span>: <span class="hljs-string">'首页'</span>,
                <span class="hljs-attribute">url</span>: <span class="hljs-string">'/index'</span>,
                <span class="hljs-attribute">tag</span>: <span class="hljs-string">'0'</span>,
                <span class="hljs-attribute">hasExtend</span>: false, <span class="hljs-comment">//是否有二级菜单</span>
            },
            {
                <span class="hljs-attribute">name</span>: <span class="hljs-string">'销售消息通知'</span>,
                <span class="hljs-attribute">url</span>: <span class="hljs-string">'/saleR'</span>,
                <span class="hljs-attribute">tag</span>: <span class="hljs-string">'sale'</span>,
                <span class="hljs-attribute">hasExtend</span>: true, <span class="hljs-comment">//是否有二级菜单</span>
                <span class="hljs-attribute">fold</span>: true, <span class="hljs-comment">//是否展开</span>
                <span class="hljs-attribute">extend</span>: [
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'待确认订单'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/order/list/0?ordConfirmStatus=0'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'1_1'</span>,
                    },
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'待出库物流'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/logistics/logisticsList/0'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'1_2'</span>
                    },
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'待发货物流'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/logistics/logisticsList/1'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'1_3'</span>
                    },
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'待收货物流'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/logistics/logisticsList/2'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'1_4'</span>
                    },
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'待确认回款'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/cash/cashList/0'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'1_5'</span>
                    },
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'待开票申请'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/invoice/invoiceWriteList/0'</span>,
                        <span class="hljs-attribute">tagIndex</span>: <span class="hljs-string">'1_6'</span>
                    }
                ]
            },
            {
                <span class="hljs-attribute">name</span>: <span class="hljs-string">'销售管理'</span>,
                <span class="hljs-attribute">url</span>: <span class="hljs-string">'/workbench'</span>,
                <span class="hljs-attribute">hasExtend</span>: true, <span class="hljs-comment">//是否有二级菜单</span>
                <span class="hljs-attribute">fold</span>: true,  <span class="hljs-comment">//是否展开</span>
                <span class="hljs-attribute">extend</span>: [
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'创建销售单'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/order/create'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'2_1'</span>
                    },
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'销售单管理'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/order/list'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'2_2'</span>
                    },
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'物流管理'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/logistics/logisticsList'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'2_3'</span>
                    },
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'回款管理'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/cash/cashList'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'2_4'</span>
                    },
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'开票管理'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/invoice/invoiceWriteList'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'2_9'</span>
                    },
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'票据管理'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/invoice/invoiceManageList'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'2_5'</span>
                    },
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'提成管理'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/commission/commissionList'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'2_6'</span>
                    },
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'提成设置'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/commission/commissionSet'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'2_7'</span>,
                    },
                    {
                        <span class="hljs-attribute">name</span>: <span class="hljs-string">'合同管理'</span>,
                        <span class="hljs-attribute">url</span>: <span class="hljs-string">'/contract/contractList'</span>,
                        <span class="hljs-attribute">tag</span>: <span class="hljs-string">'2_8'</span>
                    },
                ]
            },
        ],
    }
},</code></pre>
<p>上面的数据相信大家都没什么问题，一一对应上就好（name--菜单名称, url--跳转的url,tag--当前的标识, hasExtend--是否有二级菜单，fold--是否展开extend--子菜单）</p>
<h3 id="articleHeader4">2.遍历侧边栏的数据</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <ul class=&quot;snav-menu&quot; @click=&quot;show=false&quot;>
        <li v-for=&quot;(item,index) in menus&quot; :class=&quot;{active:item.fold,hasextend:item.hasExtend}&quot;>
            <!--如果没有二级菜单-->
            <!--如果遍历到的标识等于当前的标识，就加上active类名，改变样式-->
            <!--点击事件为触发跳转路由，就比如点击‘首页’，就是跳转到‘首页’的对应的路由-->
            <a  v-if=&quot;!item.hasExtend&quot; href=&quot;javascript:;&quot; class=&quot;tit&quot; @click=&quot;switchNav(item.url,item.tag)&quot;
               :class=&quot;{active:item.tag==currentTag}&quot;>
                <em>"{{"item.name"}}"</em>
            </a>
            <!--如果有二级菜单-->
            <!--点击事件为触发子元素的显示或隐藏 比如点击‘销售消息通知’，就触发‘销售消息通知’下面子菜单的显示或者隐藏。如果显示就隐藏，隐藏就显示-->
            <a v-else href=&quot;javascript:;&quot; class=&quot;tit&quot; @click.stop=&quot;flod(index)&quot;>
                <em>"{{"item.name"}}"</em>
            </a>
            <!--如果有二级菜单，遍历子菜单-->
            <!--如果有二级菜单，并且fold属性为true（子菜单展开显示）。就加上active类名，改变样式-->
            <div class=&quot;extend-nav level2&quot; v-if=&quot;item.hasExtend&quot; :class=&quot;{active:item.fold}&quot;>
                <p v-for=&quot;(extend1,deep1) in item.extend&quot;>
                    <!--如果遍历到的标识等于当前的标识，就加上active类名，改变样式-->
                    <!--点击切换路由（页面的操作）-->
                    <a href=&quot;javascript:;&quot; :class=&quot;{active:extend1.tag==currentTag}&quot;
                       @click=&quot;switchNav(extend1.url,extend1.tag)&quot;>
                        <em>"{{"extend1.name"}}"</em>
                    </a>
                </p>
            </div>
        </li>
    </ul>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"snav-menu"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show=false"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in menus"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active:item.fold,hasextend:item.hasExtend}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
            <span class="hljs-comment">&lt;!--如果没有二级菜单--&gt;</span>
            <span class="hljs-comment">&lt;!--如果遍历到的标识等于当前的标识，就加上active类名，改变样式--&gt;</span>
            <span class="hljs-comment">&lt;!--点击事件为触发跳转路由，就比如点击‘首页’，就是跳转到‘首页’的对应的路由--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span>  <span class="hljs-attr">v-if</span>=<span class="hljs-string">"!item.hasExtend"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tit"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"switchNav(item.url,item.tag)"</span>
               <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active:item.tag==currentTag}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">em</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-comment">&lt;!--如果有二级菜单--&gt;</span>
            <span class="hljs-comment">&lt;!--点击事件为触发子元素的显示或隐藏 比如点击‘销售消息通知’，就触发‘销售消息通知’下面子菜单的显示或者隐藏。如果显示就隐藏，隐藏就显示--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-else</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tit"</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"flod(index)"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">em</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-comment">&lt;!--如果有二级菜单，遍历子菜单--&gt;</span>
            <span class="hljs-comment">&lt;!--如果有二级菜单，并且fold属性为true（子菜单展开显示）。就加上active类名，改变样式--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"extend-nav level2"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"item.hasExtend"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active:item.fold}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(extend1,deep1) in item.extend"</span>&gt;</span>
                    <span class="hljs-comment">&lt;!--如果遍历到的标识等于当前的标识，就加上active类名，改变样式--&gt;</span>
                    <span class="hljs-comment">&lt;!--点击切换路由（页面的操作）--&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active:extend1.tag==currentTag}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>
                       @<span class="hljs-attr">click</span>=<span class="hljs-string">"switchNav(extend1.url,extend1.tag)"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">em</span>&gt;</span></span><span class="hljs-template-variable">"{{"extend1.name}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</span></code></pre>
<blockquote><p><code>flod</code>和<code>switchNav</code>这个两个属性大家暂时不需要关注，下面会用到</p></blockquote>
<p>遍历数据这个，大家看了上面的代码和注释，很好理解。我就不多说了！然后，在index.js里面，引入和注册这个组件。</p>
<p><span class="img-wrap"><img data-src="/img/bVQhDb?w=800&amp;h=536" src="https://static.alili.tech/img/bVQhDb?w=800&amp;h=536" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后index.html页面引用<br><span class="img-wrap"><img data-src="/img/bVQeUj?w=687&amp;h=542" src="https://static.alili.tech/img/bVQeUj?w=687&amp;h=542" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后ctrl+s一下，就可以看到效果了（<strong>前面在<code>webpack.config.label.js</code>已经配置了热刷新。所以直接就可以看到效果，保存一下，或者改了一些代码后，一段时间没操作了，浏览器都会刷新，如下图</strong>）</p>
<p><span class="img-wrap"><img data-src="/img/bVQeV0?w=460&amp;h=173" src="https://static.alili.tech/img/bVQeV0?w=460&amp;h=173" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVQeU6?w=1624&amp;h=770" src="https://static.alili.tech/img/bVQeU6?w=1624&amp;h=770" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>看到运行结果，侧边栏出来了。然后，下一步！</p>
<h3 id="articleHeader5">3.给侧边栏写相关的一些操作</h3>
<p>关于侧边栏的操作，比较简单，无非就是点击菜单，跳转路由，标志当前项以及菜单下面子菜单的显示与隐藏。<br>1.首先，触发路由的跳转和标志当前项<br>我们用到的是是上面代码的<code>switchNav</code>这个方法;<br>我们简单分析一下，这个方法，要实现跳转路由，标志当前项。就必须要接收两个参数（要跳转路由的url,当前的标识）。下面就实现下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="switchNav(url,tag){
    //标识当前导航
    this.currentTag = tag;
    //router导航
    this.$router.push({
        'path': url,
        'query': {
            &quot;tag&quot;: tag
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>switchNav(url,tag){
    <span class="hljs-comment">//标识当前导航</span>
    <span class="hljs-keyword">this</span>.currentTag = tag;
    <span class="hljs-comment">//router导航</span>
    <span class="hljs-keyword">this</span>.$router.push({
        <span class="hljs-string">'path'</span>: url,
        <span class="hljs-string">'query'</span>: {
            <span class="hljs-string">"tag"</span>: tag
        }
    });
}</code></pre>
<p>看着代码是不是特别简单，每次点击的时候，用一个变量<code>this.currentTag</code>记录当前的<code>tag</code>，在<code>html</code>遍历的时候，如果遍历道的<code>tag</code>等于<code>currentTag</code>的话，就加上<code>active</code>的类名，标志当前项，不等于就不加类名。</p>
<blockquote><p>比如一开始‘<code>this.currentTag='0'</code>,然后，首页的<code>tag</code>又是等于<code>'0'</code>，所以遍历道‘首页’的时候，就会给‘首页’那个菜单加上<code>active</code>的类名’</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVQfPI?w=698&amp;h=416" src="https://static.alili.tech/img/bVQfPI?w=698&amp;h=416" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>然后跳转路由那个没有什么可以说的了，就把url当成参数传进去而已。</p>
<p>2.最后，实现菜单下面子菜单的显示与隐藏。这个方法就一行代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //展开收起导航面板
flod(index){
    this.menus[index].fold = !this.menus[index].fold;
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code> <span class="hljs-comment">//展开收起导航面板</span>
flod(<span class="hljs-keyword">index</span>){
    <span class="hljs-keyword">this</span>.menus[<span class="hljs-keyword">index</span>].fold = !<span class="hljs-keyword">this</span>.menus[<span class="hljs-keyword">index</span>].fold;
},
</code></pre>
<p>因为只有两级，所以，只是根据传进来的索引（<code>index</code>）来操作menus这个数组而已，把要操作的项的fold属性，取反。</p>
<p>运行一下，发现路由变了，当前项有标识了，子菜单的显示与隐藏也有了！原理也很简单。</p>
<p><span class="img-wrap"><img data-src="/img/bVQfQs?w=723&amp;h=536" src="https://static.alili.tech/img/bVQfQs?w=723&amp;h=536" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>运行完了，附上这个文件(<code>snav-component.vue</code>)的代码大概就是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <ul class=&quot;snav-menu&quot; @click=&quot;show=false&quot;>
        <li v-for=&quot;(item,index) in menus&quot; :class=&quot;{active:item.fold,hasextend:item.hasExtend}&quot;>
            <!--如果没有二级菜单--><!--如果遍历到的标识等于当前的标识，就加上active类名，改变样式-->
            <a  v-if=&quot;!item.hasExtend&quot; href=&quot;javascript:;&quot; class=&quot;tit&quot; @click=&quot;switchNav(item.url,item.tag)&quot;
               :class=&quot;{active:item.tag==currentTag}&quot;>
                <em>"{{"item.name"}}"</em>
            </a>
            <!--如果有二级菜单-->
            <a v-else href=&quot;javascript:;&quot; class=&quot;tit&quot; @click.stop=&quot;flod(index)&quot;>
                <em>"{{"item.name"}}"</em>
            </a>
            <!--如果有二级菜单，遍历子菜单--><!--如果有二级菜单，并且fold属性为true（子菜单展开显示）。就加上active类名，改变样式-->
            <div class=&quot;extend-nav level2&quot; v-if=&quot;item.hasExtend&quot; :class=&quot;{active:item.fold}&quot;>
                <p v-for=&quot;(extend1,deep1) in item.extend&quot;>
                    <!--如果遍历到的标识等于当前的标识，就加上active类名，改变样式--><!--点击切换路由（页面的操作）-->
                    <a href=&quot;javascript:;&quot; :class=&quot;{active:extend1.tag==currentTag}&quot;
                       @click=&quot;switchNav(extend1.url,extend1.tag)&quot;>
                        <em>"{{"extend1.name"}}"</em>
                    </a>
                </p>
            </div>
        </li>
    </ul>
</template>

<script>
    export default{
        data(){
            return {
                //记录当前的标识
                currentTag: '0',
                menus: [
                    {
                        name: '首页',
                        url: '/index',
                        tag: '0',
                        hasExtend: false, //是否有二级菜单
                    },
                    {
                        name: '销售消息通知',
                        url: '/saleR',
                        tag: 'sale',
                        hasExtend: true, //是否有二级菜单
                        fold: true, //是否展开
                        extend: [
                            {
                                name: '待确认订单',
                                url: '/order/list/0?ordConfirmStatus=0',
                                tag: '1_1',
                            },
                            {
                                name: '待出库物流',
                                url: '/logistics/logisticsList/0',
                                tag: '1_2'
                            },
                            {
                                name: '待发货物流',
                                url: '/logistics/logisticsList/1',
                                tag: '1_3'
                            },
                            {
                                name: '待收货物流',
                                url: '/logistics/logisticsList/2',
                                tag: '1_4'
                            },
                            {
                                name: '待确认回款',
                                url: '/cash/cashList/0',
                                tag: '1_5'
                            },
                            {
                                name: '待开票申请',
                                url: '/invoice/invoiceWriteList/0',
                                tagIndex: '1_6'
                            }
                        ]
                    },
                    {
                        name: '销售管理',
                        url: '/workbench',
                        hasExtend: true, //是否有二级菜单
                        fold: true,  //是否展开
                        extend: [
                            {
                                name: '创建销售单',
                                url: '/order/create',
                                tag: '2_1'
                            },
                            {
                                name: '销售单管理',
                                url: '/order/list',
                                tag: '2_2'
                            },
                            {
                                name: '物流管理',
                                url: '/logistics/logisticsList',
                                tag: '2_3'
                            },
                            {
                                name: '回款管理',
                                url: '/cash/cashList',
                                tag: '2_4'
                            },
                            {
                                name: '开票管理',
                                url: '/invoice/invoiceWriteList',
                                tag: '2_9'
                            },
                            {
                                name: '票据管理',
                                url: '/invoice/invoiceManageList',
                                tag: '2_5'
                            },
                            {
                                name: '提成管理',
                                url: '/commission/commissionList',
                                tag: '2_6'
                            },
                            {
                                name: '提成设置',
                                url: '/commission/commissionSet',
                                tag: '2_7',
                            },
                            {
                                name: '合同管理',
                                url: '/contract/contractList',
                                tag: '2_8'
                            },
                        ]
                    },
                ],
            }
        },
        methods: {
            //切换组件
            switchNav(url,tag){
                //标识当前导航
                this.currentTag = tag;
                //router导航
                this.$router.push({
                    'path': url,
                    'query': {
                        &quot;tag&quot;: tag
                    }
                });
            },
            //展开收起导航面板
            flod(index){
                this.menus[index].fold = !this.menus[level1].fold;
            },
        }
    }
</script>

<style lang=&quot;scss&quot;>
    html,body,.zyl-admin-bd,.zyl-admin-wrap {
        width: 100%;
        height: 100%;
    }
    .zyl-admin-wrap{
        position: fixed;
    }
    .zyl-admin-snav {
        position: fixed;
        z-index: 1;
        width: 210px;
        height: 100%;
        overflow-y: auto;
        background: #2a3542;
        box-shadow: 3px 0 30px rgba(0, 0, 0, .2);
        &amp;::-webkit-scrollbar {
            width: 5px;
            height: 100%;
            border-radius: 2px;
            background: #424448;
        }
        &amp;::-webkit-scrollbar-thumb {
            background: #A2A2A2;
            border-radius: 2px;
        }
        .snav-menu {
            margin-top: 10px;
            > li {
                margin:0 10px 10px 10px;
                &amp;.hasextend {
                    .tit {
                        background: #35404d;
                    }
                }
                &amp;.active {
                    background: #35404d;
                    border-radius: 4px;
                    overflow: hidden;
                    .tit {
                        background: #475669 !important;
                        .icon-options-unfold {
                            display: none;
                        }
                        .icon-options-fold {
                            display: inline-block;
                        }
                    }
                    .extend-nav {
                        display: block;
                    }

                }
                .tit {
                    line-height: 22px;
                    color: #aeb2b7;
                    text-decoration: none;
                    display: block;
                    padding: 5px 0 5px 10px;
                    font-size: 12px;
                    outline: none;
                    transition: all 0.3s ease;
                    &amp;:hover, &amp;.active {
                        background: #35404d;
                        color: #fff;
                        em {
                            color: #FF6C60;
                        }
                    }
                    em {
                        display: inline-block;
                        vertical-align: middle;
                        font-style: normal;
                    }
                }
                .extend-nav {
                    display: none;
                    &amp;.active {
                        display: block;
                    }
                    p {
                        position: relative;
                        a {
                            display: block;
                            font-size: 12px;
                            padding: 6px 0;
                            line-height: 25px;
                            height: 25px;
                            color: #aeb2b7;
                            text-decoration: none;
                            transition: all 0.3s ease;
                            text-indent: 40px;
                            &amp;:hover, &amp;.active {
                                color: #FF6C60;
                                background: #2e3844;
                                .icon-arrow {
                                    display: inline-block;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .zyl-admin-content {
        height: 100%;
        margin-left: 210px;
        overflow-y: auto;
        &amp;::-webkit-scrollbar {
            width: 5px;
            height: 100%;
            border-radius: 2px;
            background: #424448;
        }
        &amp;::-webkit-scrollbar-thumb {
            background: #A2A2A2;
            border-radius: 2px;
        }
        .wrapper {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            &amp;::-webkit-scrollbar {
                width: 5px;
                height: 100%;
                border-radius: 2px;
                background: #424448;
            }
            &amp;::-webkit-scrollbar-thumb {
                background: #A2A2A2;
                border-radius: 2px;
            }
        }
    }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>&lt;template&gt;
    &lt;ul class="snav-menu" @click="show=false"&gt;
        &lt;li v-for="(item,index) in menus" :class="{active:item.fold,hasextend:item.hasExtend}"&gt;
            &lt;!--如果没有二级菜单--&gt;&lt;!--如果遍历到的标识等于当前的标识，就加上active类名，改变样式--&gt;
            &lt;a  v-if="!item.hasExtend" href="javascript:;" class="tit" @click="switchNav(item.url,item.tag)"
               :class="{active:item.tag==currentTag}"&gt;
                &lt;em&gt;"{{"item.name"}}"&lt;/em&gt;
            &lt;/a&gt;
            &lt;!--如果有二级菜单--&gt;
            &lt;a v-else href="javascript:;" class="tit" @click.stop="flod(index)"&gt;
                &lt;em&gt;"{{"item.name"}}"&lt;/em&gt;
            &lt;/a&gt;
            &lt;!--如果有二级菜单，遍历子菜单--&gt;&lt;!--如果有二级菜单，并且fold属性为true（子菜单展开显示）。就加上active类名，改变样式--&gt;
            &lt;div class="extend-nav level2" v-if="item.hasExtend" :class="{active:item.fold}"&gt;
                &lt;p v-for="(extend1,deep1) in item.extend"&gt;
                    &lt;!--如果遍历到的标识等于当前的标识，就加上active类名，改变样式--&gt;&lt;!--点击切换路由（页面的操作）--&gt;
                    &lt;a href="javascript:;" :class="{active:extend1.tag==currentTag}"
                       @click="switchNav(extend1.url,extend1.tag)"&gt;
                        &lt;em&gt;"{{"extend1.name"}}"&lt;/em&gt;
                    &lt;/a&gt;
                &lt;/p&gt;
            &lt;/div&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/template&gt;

&lt;script&gt;
    export default{
        data(){
            return {
                //记录当前的标识
                currentTag: '0',
                menus: [
                    {
                        name: '首页',
                        url: '/index',
                        tag: '0',
                        hasExtend: false, //是否有二级菜单
                    },
                    {
                        name: '销售消息通知',
                        url: '/saleR',
                        tag: 'sale',
                        hasExtend: true, //是否有二级菜单
                        fold: true, //是否展开
                        extend: [
                            {
                                name: '待确认订单',
                                url: '/order/list/0?ordConfirmStatus=0',
                                tag: '1_1',
                            },
                            {
                                name: '待出库物流',
                                url: '/logistics/logisticsList/0',
                                tag: '1_2'
                            },
                            {
                                name: '待发货物流',
                                url: '/logistics/logisticsList/1',
                                tag: '1_3'
                            },
                            {
                                name: '待收货物流',
                                url: '/logistics/logisticsList/2',
                                tag: '1_4'
                            },
                            {
                                name: '待确认回款',
                                url: '/cash/cashList/0',
                                tag: '1_5'
                            },
                            {
                                name: '待开票申请',
                                url: '/invoice/invoiceWriteList/0',
                                tagIndex: '1_6'
                            }
                        ]
                    },
                    {
                        name: '销售管理',
                        url: '/workbench',
                        hasExtend: true, //是否有二级菜单
                        fold: true,  //是否展开
                        extend: [
                            {
                                name: '创建销售单',
                                url: '/order/create',
                                tag: '2_1'
                            },
                            {
                                name: '销售单管理',
                                url: '/order/list',
                                tag: '2_2'
                            },
                            {
                                name: '物流管理',
                                url: '/logistics/logisticsList',
                                tag: '2_3'
                            },
                            {
                                name: '回款管理',
                                url: '/cash/cashList',
                                tag: '2_4'
                            },
                            {
                                name: '开票管理',
                                url: '/invoice/invoiceWriteList',
                                tag: '2_9'
                            },
                            {
                                name: '票据管理',
                                url: '/invoice/invoiceManageList',
                                tag: '2_5'
                            },
                            {
                                name: '提成管理',
                                url: '/commission/commissionList',
                                tag: '2_6'
                            },
                            {
                                name: '提成设置',
                                url: '/commission/commissionSet',
                                tag: '2_7',
                            },
                            {
                                name: '合同管理',
                                url: '/contract/contractList',
                                tag: '2_8'
                            },
                        ]
                    },
                ],
            }
        },
        methods: {
            //切换组件
            switchNav(url,tag){
                //标识当前导航
                this.currentTag = tag;
                //router导航
                this.$router.push({
                    'path': url,
                    'query': {
                        "tag": tag
                    }
                });
            },
            //展开收起导航面板
            flod(index){
                this.menus[index].fold = !this.menus[level1].fold;
            },
        }
    }
&lt;/script&gt;

&lt;style lang="scss"&gt;
    html,body,.zyl-admin-bd,.zyl-admin-wrap {
        width: 100%;
        height: 100%;
    }
    .zyl-admin-wrap{
        position: fixed;
    }
    .zyl-admin-snav {
        position: fixed;
        z-index: 1;
        width: 210px;
        height: 100%;
        overflow-y: auto;
        background: #2a3542;
        box-shadow: 3px 0 30px rgba(0, 0, 0, .2);
        &amp;::-webkit-scrollbar {
            width: 5px;
            height: 100%;
            border-radius: 2px;
            background: #424448;
        }
        &amp;::-webkit-scrollbar-thumb {
            background: #A2A2A2;
            border-radius: 2px;
        }
        .snav-menu {
            margin-top: 10px;
            &gt; li {
                margin:0 10px 10px 10px;
                &amp;.hasextend {
                    .tit {
                        background: #35404d;
                    }
                }
                &amp;.active {
                    background: #35404d;
                    border-radius: 4px;
                    overflow: hidden;
                    .tit {
                        background: #475669 !important;
                        .icon-options-unfold {
                            display: none;
                        }
                        .icon-options-fold {
                            display: inline-block;
                        }
                    }
                    .extend-nav {
                        display: block;
                    }

                }
                .tit {
                    line-height: 22px;
                    color: #aeb2b7;
                    text-decoration: none;
                    display: block;
                    padding: 5px 0 5px 10px;
                    font-size: 12px;
                    outline: none;
                    transition: all 0.3s ease;
                    &amp;:hover, &amp;.active {
                        background: #35404d;
                        color: #fff;
                        em {
                            color: #FF6C60;
                        }
                    }
                    em {
                        display: inline-block;
                        vertical-align: middle;
                        font-style: normal;
                    }
                }
                .extend-nav {
                    display: none;
                    &amp;.active {
                        display: block;
                    }
                    p {
                        position: relative;
                        a {
                            display: block;
                            font-size: 12px;
                            padding: 6px 0;
                            line-height: 25px;
                            height: 25px;
                            color: #aeb2b7;
                            text-decoration: none;
                            transition: all 0.3s ease;
                            text-indent: 40px;
                            &amp;:hover, &amp;.active {
                                color: #FF6C60;
                                background: #2e3844;
                                .icon-arrow {
                                    display: inline-block;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .zyl-admin-content {
        height: 100%;
        margin-left: 210px;
        overflow-y: auto;
        &amp;::-webkit-scrollbar {
            width: 5px;
            height: 100%;
            border-radius: 2px;
            background: #424448;
        }
        &amp;::-webkit-scrollbar-thumb {
            background: #A2A2A2;
            border-radius: 2px;
        }
        .wrapper {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            &amp;::-webkit-scrollbar {
                width: 5px;
                height: 100%;
                border-radius: 2px;
                background: #424448;
            }
            &amp;::-webkit-scrollbar-thumb {
                background: #A2A2A2;
                border-radius: 2px;
            }
        }
    }
&lt;/style&gt;
</code></pre>
<blockquote><p>有一点要注意下，除了点击首页能看到一张图片之外，点击其它的菜单，右边都是白色的一片。因为其它的菜单的url。并没有对应的组件。</p></blockquote>
<p>比如：这个url在路由里面并没有对应的组件。</p>
<p><span class="img-wrap"><img data-src="/img/bVQfQ7?w=463&amp;h=91" src="https://static.alili.tech/img/bVQfQ7?w=463&amp;h=91" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>怎么知道？在上一篇文件说到的router.js里面，并没有配置‘<code>/order/list/0?ordConfirmStatus=0</code>’这个<code>url</code>对应的组件。所以在<code>index.html</code>的<code>&lt;router-view&gt;&lt;/router-view&gt;</code>输出的就是空白的一片。现在这里算是复习上一篇的内容了。也是给下一篇埋了一个伏笔。下一篇就讲这个配置。<br><span class="img-wrap"><img data-src="/img/bVQfRx?w=627&amp;h=385" src="https://static.alili.tech/img/bVQfRx?w=627&amp;h=385" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">4.未完待续</h2>
<p>今天就到这里了。主要就是一个主页面，主要是侧边栏的一个开发。这个侧边栏就是根据控制录用的变化。技术栈主要也就是<code>vue</code>和<code>vue-router</code>。原理就是根据路由的变化执行组件的切换。达到一个页面跳转的效果。下一篇就会说到，配置路由和路由对应的组件。希望能帮到大家。最后还是那句老话-如果大家发现我哪里写错了，或者是哪里写得不好，欢迎指点下。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack+vue项目实战（二，开发管理系统主页面）

## 原文链接
[https://segmentfault.com/a/1190000010039810](https://segmentfault.com/a/1190000010039810)

