---
title: 'webpack+vue项目实战（三，配置功能操作页和组件的按需加载）' 
date: 2019-01-10 2:30:08
hidden: true
slug: ur30fpj2ws
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>上篇文章（<a href="https://segmentfault.com/a/1190000010039810">webpack+vue项目实战（二，开发管理系统主页面）</a>），实现了，侧边栏的一个操作，点击侧边栏的一些操作，最重要的就是路由的切换。看了上一篇的伙伴也不难发现，除了点击侧边栏‘首页’之外，点击其它的都是白色的一片。原因我想大家都知道，就是因为对应的组件文件没有。而今天，就是要做那个对应的组件文件。</p>
<h2 id="articleHeader1">2.使用element-ui开发功能操作页面</h2>
<p><a href="http://element.eleme.io/1.2/#/zh-CN/component/installation" rel="nofollow noreferrer" target="_blank">element-ui</a>是什么就不多解释了，就是一个基于vue开发的一个组件库。里面有很多可以用的组件，样式也不错。<br>好，介绍就到这，下面开始页面的布局。我是按照自己的想法弄的，毕竟，后台的管理系统，不会有什么设计图，效果图的，能用就好，练习的小伙伴也可以发挥自己的想象。</p>
<p>开始动手了，首先我就挑一个‘<strong>回款管理</strong>’这个模块吧！首页在目录上建立回款模块的这个组件。<br><span class="img-wrap"><img data-src="/img/bVQf2X?w=840&amp;h=686" src="https://static.alili.tech/img/bVQf2X?w=840&amp;h=686" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br><strong>看到这个目录，大家不要懵了哦，还是之前那个目录，只是现在这里是在编辑器截图而已。没有改变，大家回想一下就知道了。</strong></p>
<p>然后下一步就是配置这个文件的路由了！从上一篇文章知道回款模块对应的url是‘<code>/cash/cashList</code>’。(下面的图片截图就是<code>snav-component.vue</code>这个文件，对应的就是<code>menus</code>这个数组变量，就是侧边栏数据)</p>
<p><span class="img-wrap"><img data-src="/img/bVQf28?w=357&amp;h=113" src="https://static.alili.tech/img/bVQf28?w=357&amp;h=113" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后去到<code>router.js</code>配置回款模块的组件。</p>
<p><span class="img-wrap"><img data-src="/img/bVQf3H?w=806&amp;h=453" src="https://static.alili.tech/img/bVQf3H?w=806&amp;h=453" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后，在浏览器上，点击回款管理的模块，还是白色的一片，没有东西。因为<code>cashList.vue</code>这个文件没有任何东西。<br>现在加上‘回款管理’，检验下，发现就正常，已经找到了这个组件。</p>
<p><span class="img-wrap"><img data-src="/img/bVQf36?w=1434&amp;h=865" src="https://static.alili.tech/img/bVQf36?w=1434&amp;h=865" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>路由怎么找到这个组件的。第一篇已经说，路由匹配到了url，<code>index.html</code>中的<code>&lt;router-view&gt;&lt;/router-view&gt;</code>就输出相对应的组件的内容。<strong>（在这里栗子这里，url是<code>/cash/cashList</code>，自然而然，输出的组件就是<code>cashList.vue</code>。内容也就是这个组件文件里面包含的内容，还没理清关系的伙伴，现在复习下）</strong></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVQgwx?w=660&amp;h=279" src="https://static.alili.tech/img/bVQgwx?w=660&amp;h=279" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>首页是头部，代码就是这么几行，样式我不多说了，都很简单。按钮还是element-ui提供的组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;cash-title&quot;>
    <span>回款管理</span>
</div>
<div class=&quot;cash-search&quot;>
    <span class=&quot;fs14 mr15&quot;>筛选:</span>
    <el-button type=&quot;primary&quot; size=&quot;small&quot; icon=&quot;search&quot;></el-button>
    <el-button type=&quot;danger&quot; size=&quot;small&quot;>重置</el-button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cash-title"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>回款管理<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cash-search"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs14 mr15"</span>&gt;</span>筛选:<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"search"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span>&gt;</span>重置<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQf1K?w=1236&amp;h=197" src="https://static.alili.tech/img/bVQf1K?w=1236&amp;h=197" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后就是列表。代码比较多，但是很多都是重复的，这个基本都是<code>element-ui</code>提供的组件。<a href="http://element.eleme.io/#/zh-CN/component/table" rel="nofollow noreferrer" target="_blank">el-table</a>这个组件，大家可以看下官网的具体使用，也比较简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;cash-table&quot;>
    <el-table :data=&quot;cashList&quot; border style=&quot;width: 100%&quot; highlight-current-row>
        <el-table-column label=&quot;编号&quot; width=&quot;180&quot;>
            <template scope=&quot;scope&quot;>
                <a href=&quot;javascript:;&quot;>"{{"scope.row.cashId"}}"</a>
            </template>
        </el-table-column>
        
        <el-table-column label=&quot;客户名称&quot; width=&quot;200&quot;>
            <template scope=&quot;scope&quot;>
                <span>"{{" scope.row.custoName "}}"</span>
            </template>
        </el-table-column>
        ....
    </el-table>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cash-table"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"cashList"</span> <span class="hljs-attr">border</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%"</span> <span class="hljs-attr">highlight-current-row</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"编号"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"180"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span></span><span class="hljs-template-variable">"{{"scope.row.cashId"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"客户名称"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{" scope.row.custoName "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
        ....
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p><code>cashList</code>这个数据是我模拟的。我也发两个，让大家可以进行测试下！大家也可以随意的模拟一下这个数据！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {
        &quot;cashId&quot;: &quot;M2017062900049001&quot;,
        &quot;ordId&quot;: &quot;O2017062900075030&quot;,
        &quot;cashType&quot;: 0,
        &quot;payChannel&quot;: null,
        &quot;payType&quot;: null,
        &quot;cashStatus&quot;: 0,
        &quot;custoName&quot;: &quot;UFO&quot;,
        &quot;userName&quot;: &quot;陈&quot;,
        &quot;userMobile&quot;: &quot;16936025651&quot;,
        &quot;merchandisers&quot;: &quot;文&quot;,
        &quot;cashAmount&quot;: 1832500,
        &quot;cashDate&quot;: 1498718850000,
        &quot;cashAccountType&quot;: 0,
        &quot;payNo&quot;: null
    },
    {
        &quot;cashId&quot;: &quot;M2017062900049002&quot;,
        &quot;ordId&quot;: &quot;O2017062900075031&quot;,
        &quot;cashType&quot;: 0,
        &quot;payChannel&quot;: null,
        &quot;payType&quot;: null,
        &quot;cashStatus&quot;: 0,
        &quot;custoName&quot;: &quot;UFO&quot;,
        &quot;userName&quot;: &quot;天使&quot;,
        &quot;userMobile&quot;: &quot;13926085651&quot;,
        &quot;merchandisers&quot;: &quot;乐&quot;,
        &quot;cashAmount&quot;: 1832500,
        &quot;cashDate&quot;: 14987188558400,
        &quot;cashAccountType&quot;: 0,
        &quot;payNo&quot;: null
    }]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
    {
        <span class="hljs-attr">"cashId"</span>: <span class="hljs-string">"M2017062900049001"</span>,
        <span class="hljs-attr">"ordId"</span>: <span class="hljs-string">"O2017062900075030"</span>,
        <span class="hljs-attr">"cashType"</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">"payChannel"</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">"payType"</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">"cashStatus"</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">"custoName"</span>: <span class="hljs-string">"UFO"</span>,
        <span class="hljs-attr">"userName"</span>: <span class="hljs-string">"陈"</span>,
        <span class="hljs-attr">"userMobile"</span>: <span class="hljs-string">"16936025651"</span>,
        <span class="hljs-attr">"merchandisers"</span>: <span class="hljs-string">"文"</span>,
        <span class="hljs-attr">"cashAmount"</span>: <span class="hljs-number">1832500</span>,
        <span class="hljs-attr">"cashDate"</span>: <span class="hljs-number">1498718850000</span>,
        <span class="hljs-attr">"cashAccountType"</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">"payNo"</span>: <span class="hljs-literal">null</span>
    },
    {
        <span class="hljs-attr">"cashId"</span>: <span class="hljs-string">"M2017062900049002"</span>,
        <span class="hljs-attr">"ordId"</span>: <span class="hljs-string">"O2017062900075031"</span>,
        <span class="hljs-attr">"cashType"</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">"payChannel"</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">"payType"</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">"cashStatus"</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">"custoName"</span>: <span class="hljs-string">"UFO"</span>,
        <span class="hljs-attr">"userName"</span>: <span class="hljs-string">"天使"</span>,
        <span class="hljs-attr">"userMobile"</span>: <span class="hljs-string">"13926085651"</span>,
        <span class="hljs-attr">"merchandisers"</span>: <span class="hljs-string">"乐"</span>,
        <span class="hljs-attr">"cashAmount"</span>: <span class="hljs-number">1832500</span>,
        <span class="hljs-attr">"cashDate"</span>: <span class="hljs-number">14987188558400</span>,
        <span class="hljs-attr">"cashAccountType"</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">"payNo"</span>: <span class="hljs-literal">null</span>
    }]
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQisU?w=1918&amp;h=857" src="https://static.alili.tech/img/bVQisU?w=1918&amp;h=857" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>发现是不是一下的功夫，就把排版给搞定了(有些小细节还是得自己动手，这个小伙伴自己动手操作吧)！这是当然的，因为样式和组件的操作，<code>element-ui</code>都提供了，我们需要做的，就是套一下数据。</p>
<h2 id="articleHeader2">3.其它页面</h2>
<p>然后，其它的功能页面呢，也是这样做！比如我挑一个‘开票管理’页面吧！也是同样的操作！</p>
<p><strong>步骤1，创建文件<code>invoiceList.vue</code></strong><br><span class="img-wrap"><img data-src="/img/bVQiDl?w=585&amp;h=614" src="https://static.alili.tech/img/bVQiDl?w=585&amp;h=614" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>步骤2，在router.js中引入组件，配置路由</strong><br><span class="img-wrap"><img data-src="/img/bVQiEA?w=794&amp;h=532" src="https://static.alili.tech/img/bVQiEA?w=794&amp;h=532" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote><p><span class="img-wrap"><img data-src="/img/bVQiEU?w=262&amp;h=38" src="https://static.alili.tech/img/bVQiEU?w=262&amp;h=38" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span>这个<code>path</code>的值怎么得到的？之前说过，看<code>snav-component.vue</code>。得到对应的url。然后用这个url去router.js中配置。现在算是一个复习，小伙伴们记住了！<strong>（如果需要添加新页面，在<code>snav-component.vue</code>，没有记录过的页面，那么就得在<code>snav-component.vue</code>加上页面所对应的各种信息，然后再配置路由！）</strong><br><span class="img-wrap"><img data-src="/img/bVQiFq?w=670&amp;h=110" src="https://static.alili.tech/img/bVQiFq?w=670&amp;h=110" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p></blockquote>
<p><strong>步骤3，整理<code>invoiceList.vue</code>代码</strong><br>为了方便看到测试结果，我把<code>cashList.vue</code>整个文件的内容，直接复制粘贴到刚刚新建的<code>invoiceList.vue</code>里面，除了一个标题，其它都不改！</p>
<p><span class="img-wrap"><img data-src="/img/bVQiHF?w=776&amp;h=460" src="https://static.alili.tech/img/bVQiHF?w=776&amp;h=460" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>步骤4，看结果，在回款管理和开票管理来回切换，是不是就是正常显示了！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVQiKV?w=983&amp;h=758" src="https://static.alili.tech/img/bVQiKV?w=983&amp;h=758" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVQiK7?w=1023&amp;h=748" src="https://static.alili.tech/img/bVQiK7?w=1023&amp;h=748" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>还有一些页面，我就不操作了！也是按照这个步骤，依葫芦画瓢！</p>
<h2 id="articleHeader3">4.按需加载</h2>
<p>大家有没有想到这个问题。比如，一开始访问，只<strong>显示和输出</strong>了'首页'的的组件（<code>welcome.vue</code>）。但是实际上，'回款管理'和'开票管理'的组件文件也是加载了。因为在<code>router.js</code>文件里面<code>import</code>进来的时候，引入的都加载了！</p>
<p><span class="img-wrap"><img data-src="/img/bVQi1P?w=811&amp;h=532" src="https://static.alili.tech/img/bVQi1P?w=811&amp;h=532" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>现在只是三个文件，情况还好。编译后打包的大小，index.js还是84.3k,(vendors.js是公用模块，比如vue,vue-router这些文件,其它是热刷新的文件。)</p>
<p><span class="img-wrap"><img data-src="/img/bVQi6u?w=782&amp;h=179" src="https://static.alili.tech/img/bVQi6u?w=782&amp;h=179" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>但是，如果以后需要引进100个，1000个组件文件呢！这下index.js的大小无法预估！。所以下面引用按需加载来处理。写法没有什么区别</p>
<p><span class="img-wrap"><img data-src="/img/bVQi7M?w=1234&amp;h=578" src="https://static.alili.tech/img/bVQi7M?w=1234&amp;h=578" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后查看结果。是不是小很多了，然后invoiceList.js和cashList.js是按需加载的，就是需要的时候才加载。这样至少在体验上是更好了！</p>
<blockquote><p>魔法注释的作用就是，比如前面用了<code>/*webpackChunkName: "cashList"*/</code>相应的文件，编译出来就是命名为<code>'cashList.js'</code>，不加就是‘<code>1.js</code>或者<code>2.js</code>，<code>3.js</code>’.</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVQi8l?w=756&amp;h=196" src="https://static.alili.tech/img/bVQi8l?w=756&amp;h=196" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote><p>相关资料 <a href="https://router.vuejs.org/zh-cn/advanced/lazy-loading.html" rel="nofollow noreferrer" target="_blank">路由懒加载</a>，<a href="http://vuejs.org/v2/guide/components.html#Async-Components" rel="nofollow noreferrer" target="_blank">异步组件</a>，<a href="https://doc.webpack-china.org//guides/code-splitting-async/#require-ensure-/" rel="nofollow noreferrer" target="_blank">代码分离</a></p></blockquote>
<h2 id="articleHeader4">5.未完待续</h2>
<p>今天，到此为止了。今天主要是利用<code>vue-router</code>实现了在单页面不同的组件切换的一个功能，以及element-ui的简单应用！这个也是单页面应用的一个小模板或者模型了！如果想在项目上加其他页面，也是按照上面所说的方法！<br>按照步骤处理就好！今天做好的功能操作页，比如‘回款管理’，‘开票管理’页面，是一写很简单的展示页面。<br>下篇文章或许会提到一些页面上的一些操作开发。也会提到怎么利用<code>vue-resource</code>来跟后台进行数据的交互操作，前端又应该怎么把数据展示在页面上。</p>
<h2 id="articleHeader5">6.往期占坑</h2>
<p>如果看着有点懵的话，建议再看下我之前发的两篇文章<br><a href="https://segmentfault.com/a/1190000010025189">webpack+vue项目实战（一,搭建运行环境和相关配置）</a><br><a href="https://segmentfault.com/a/1190000010039810" target="_blank">webpack+vue项目实战（二，开发管理系统主页面）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack+vue项目实战（三，配置功能操作页和组件的按需加载）

## 原文链接
[https://segmentfault.com/a/1190000010053886](https://segmentfault.com/a/1190000010053886)

