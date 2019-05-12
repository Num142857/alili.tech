---
title: '【babel+小程序】记“编写babel插件”与“通过语法解析替换小程序路由表”的经历' 
date: 2018-12-14 2:30:11
hidden: true
slug: i9f8gg837si
categories: [reprint]
---

{{< raw >}}

                    
<p>话不多说先上图，简要说明一下干了些什么事。图可能太模糊，可以点<a href="http://o8swwgh2r.bkt.clouddn.com/babel-pages.svg" rel="nofollow noreferrer" target="_blank">svg</a>看看<br><span class="img-wrap"><img data-src="/img/bV3fs4?w=771&amp;h=631" src="https://static.alili.tech/img/bV3fs4?w=771&amp;h=631" alt="流程图" title="流程图" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">背景</h2>
<p>最近公司开展了小程序的业务，派我去负责这一块的业务，其中需要处理的一个问题是接入我们web开发的传统架构--<strong>模块化开发</strong>。<br>我们来详细说一下模块化开发具体是怎么样的。<br>我们的git工作流采用的是<a href="https://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html" rel="nofollow noreferrer" target="_blank">git flow</a>。一个项目会拆分成几个模块，然后一人负责一个模块（对应git flow的一个feature）独立开发。模块开发并与后端联通后再合并至develop进行集成测试，后续经过一系列测试再发布版本。<br>目录结构大体如图所示，一个模块包含了他自己的pages / components / assets / model / mixins / apis / routes / scss等等。</p>
<p><span class="img-wrap"><img data-src="/img/bV3ft6?w=718&amp;h=796" src="https://static.alili.tech/img/bV3ft6?w=718&amp;h=796" alt="开发目录" title="开发目录" style="cursor: pointer; display: inline;"></span></p>
<p>这种开发模式的好处不言而喻，每个人都可以并行开发，大大提升开发速度。这次就是要移植这种开发模式到小程序中。</p>
<h2 id="articleHeader1">目标</h2>
<p>背景说完了，那么来明确一下我们的目标。<br>我采用的是<a href="https://github.com/Tencent/wepy" rel="nofollow noreferrer" target="_blank">wepy</a>框架，类vue语法的开发，开发体验非常棒。在vue中，一个组件就是单文件，包含了js、html、css。wepy采用vue的语法，但由与vue稍稍有点区别，wepy的组件分为三种--wepy.app类，wepy.page类，wepy.component类。<br>对应到我们的目录结构中，每个模块实际上就是一系列的page组件。要组合这一系列的模块，那么很简单，我们要做的就是把这一系列page的路由扫描成一个路由表，然后<a href="https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html" rel="nofollow noreferrer" target="_blank">插入到小程序的入口--app.json中</a>。对应wepy框架那即是app.wpy中的pages字段。</p>
<p><span class="img-wrap"><img data-src="/img/bV3fu8?w=994&amp;h=520" src="https://static.alili.tech/img/bV3fu8?w=994&amp;h=520" alt="pages字段" title="pages字段" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">扫描路由表</h2>
<p>第一步！先得到所有pages的路由并综合成一个<strong>路由表</strong>！<br>我的方案是，在每个模块中新建一份routes文件，相当于注册每个需要插入到入口的page的路由，不需要接入业务的page就不用注册啦。是不是很熟悉呢，对的，就是参考vue-router的注册语法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//routes.js
module.exports = [
    {
        name: 'home-detail',//TODO: name先占位，后续再尝试通过读name跳转某页
        page: 'detail',//需要接入入口的page的文件名。例如这里是index.wpy。相对于src/的路径就是`modules/${moduleName}/pages/index`。
    },
    {
        name: 'home-index',
        page: 'index',
        meta: {
            weight: 100//这里加了一个小功能，因为小程序指定pages数组的第一项为首页，后续我会通过这个权重字段来给pages路由排序。权重越高位置越前。
        }
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//routes.js</span>
<span class="hljs-built_in">module</span>.exports = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'home-detail'</span>,<span class="hljs-comment">//<span class="hljs-doctag">TODO:</span> name先占位，后续再尝试通过读name跳转某页</span>
        page: <span class="hljs-string">'detail'</span>,<span class="hljs-comment">//需要接入入口的page的文件名。例如这里是index.wpy。相对于src/的路径就是`modules/${moduleName}/pages/index`。</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'home-index'</span>,
        <span class="hljs-attr">page</span>: <span class="hljs-string">'index'</span>,
        <span class="hljs-attr">meta</span>: {
            <span class="hljs-attr">weight</span>: <span class="hljs-number">100</span><span class="hljs-comment">//这里加了一个小功能，因为小程序指定pages数组的第一项为首页，后续我会通过这个权重字段来给pages路由排序。权重越高位置越前。</span>
        }
    }
]</code></pre>
<p>而扫描各个模块并合并路由表的脚本非常简单，读写文件就ok了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')
const path = require('path')

const routeDest = path.join(__dirname, '../src/config/routes.js')
const modulesPath = path.join(__dirname, '../src/modules')

let routes = []

fs.readdirSync(modulesPath).forEach(module => {
    if(module.indexOf('.DS_Store') > -1) return 

    const route = require(`${modulesPath}/${module}/route`)
    route.forEach(item => {
        item.page = `modules/${module}/pages/${item.page.match(/\/?(.*)/)[1]}`
    })
    routes = routes.concat(route)
})

fs.writeFileSync(routeDest,`module.exports = ${JSON.stringify(routes)}`, e => {
    console.log(e)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-keyword">const</span> routeDest = path.join(__dirname, <span class="hljs-string">'../src/config/routes.js'</span>)
<span class="hljs-keyword">const</span> modulesPath = path.join(__dirname, <span class="hljs-string">'../src/modules'</span>)

<span class="hljs-keyword">let</span> routes = []

fs.readdirSync(modulesPath).forEach(<span class="hljs-function"><span class="hljs-params">module</span> =&gt;</span> {
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">module</span>.indexOf(<span class="hljs-string">'.DS_Store'</span>) &gt; <span class="hljs-number">-1</span>) <span class="hljs-keyword">return</span> 

    <span class="hljs-keyword">const</span> route = <span class="hljs-built_in">require</span>(<span class="hljs-string">`<span class="hljs-subst">${modulesPath}</span>/<span class="hljs-subst">${<span class="hljs-built_in">module</span>}</span>/route`</span>)
    route.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
        item.page = <span class="hljs-string">`modules/<span class="hljs-subst">${<span class="hljs-built_in">module</span>}</span>/pages/<span class="hljs-subst">${item.page.match(<span class="hljs-regexp">/\/?(.*)/</span>)[<span class="hljs-number">1</span>]}</span>`</span>
    })
    routes = routes.concat(route)
})

fs.writeFileSync(routeDest,<span class="hljs-string">`module.exports = <span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(routes)}</span>`</span>, e =&gt; {
    <span class="hljs-built_in">console</span>.log(e)
})</code></pre>
<p>路由排序策略</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const strategies = {
    sortByWeight(routes) {
        routes.sort((a, b) => {
            a.meta = a.meta || {}
            b.meta = b.meta || {}

            const weightA = a.meta.weight || 0
            const weightB = b.meta.weight || 0

            return weightB - weightA
        })
        return routes
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> strategies = {
    sortByWeight(routes) {
        routes.sort(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
            a.meta = a.meta || {}
            b.meta = b.meta || {}

            <span class="hljs-keyword">const</span> weightA = a.meta.weight || <span class="hljs-number">0</span>
            <span class="hljs-keyword">const</span> weightB = b.meta.weight || <span class="hljs-number">0</span>

            <span class="hljs-keyword">return</span> weightB - weightA
        })
        <span class="hljs-keyword">return</span> routes
    }
}</code></pre>
<p>最后得出路由表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Strategies = require('../src/lib/routes-model')
const routes = Strategies.sortByWeight(require('../src/config/routes'))
const pages = routes.map(item => item.page)
console.log(pages)//['modules/home/pages/index', 'modules/home/pages/detail']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Strategies = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../src/lib/routes-model'</span>)
<span class="hljs-keyword">const</span> routes = Strategies.sortByWeight(<span class="hljs-built_in">require</span>(<span class="hljs-string">'../src/config/routes'</span>))
<span class="hljs-keyword">const</span> pages = routes.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item.page)
<span class="hljs-built_in">console</span>.log(pages)<span class="hljs-comment">//['modules/home/pages/index', 'modules/home/pages/detail']</span></code></pre>
<h2 id="articleHeader3">替换路由数组</h2>
<p>So far so good...问题来了，如何替换入口文件中的路由数组。我如下做了几步尝试。</p>
<h3 id="articleHeader4">直接引入</h3>
<p>我第一感觉就是，这不很简单吗？在wepy编译之前，先跑脚本得出路由表，再import这份路由表就得了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import routes from './routes'
export default class extends wepy.app {
  config = {
    pages: routes,//['modules/home/pages/index']
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '大家好我是渣渣辉',
      navigationBarTextStyle: 'black'
    }
  }
//...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">app</span> </span>{
  config = {
    <span class="hljs-attr">pages</span>: routes,<span class="hljs-comment">//['modules/home/pages/index']</span>
    <span class="hljs-built_in">window</span>: {
      <span class="hljs-attr">backgroundTextStyle</span>: <span class="hljs-string">'light'</span>,
      <span class="hljs-attr">navigationBarBackgroundColor</span>: <span class="hljs-string">'#fff'</span>,
      <span class="hljs-attr">navigationBarTitleText</span>: <span class="hljs-string">'大家好我是渣渣辉'</span>,
      <span class="hljs-attr">navigationBarTextStyle</span>: <span class="hljs-string">'black'</span>
    }
  }
<span class="hljs-comment">//...</span>
}</code></pre>
<p>然而这样小程序肯定会炸啦，pages字段的值必须是静态的，在小程序运行之前就配置好，动态引入是不行的！不信的话诸君可以试试。那么就是说，划重点---<strong>我们必须在wepy编译之前再预编译一次</strong>---事先替换掉pages字段的值！</p>
<h3 id="articleHeader5">正则匹配替换</h3>
<p>既然要事先替换，那就是要精准定位pages字段的值，然后再替换掉。难点在于如果精准定位pages字段的值呢？<br>最捞然而最快的方法：正则匹配。<br>事先定好编码规范，在pages字段的值的前后添加<code>/* __ROUTES__ */</code>的注释</p>
<p>脚本如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')
const path = require('path')
import routes from './routes'

function replace(source, arr) {
    const matchResult = source.match(/\/\* __ROUTE__ \*\/([\s\S]*)\/\* __ROUTE__ \*\//)
    if(!matchResult) {
        throw new Error('必须包含/* __ROUTE__ */标记注释')
    }
    const str = arr.reduce((pre, next, index, curArr) => {
        return pre += `'${curArr[index]}', `
    }, '')
    return source.replace(matchResult[1], str)
}

const entryFile = path.join(__dirname, '../src/app.wpy')
let entry = fs.readFileSync(entryFile, {encoding: 'UTF-8'})

entry = replace(entry, routes)

fs.writeFileSync(entryFile, entry)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replace</span>(<span class="hljs-params">source, arr</span>) </span>{
    <span class="hljs-keyword">const</span> matchResult = source.match(<span class="hljs-regexp">/\/\* __ROUTE__ \*\/([\s\S]*)\/\* __ROUTE__ \*\//</span>)
    <span class="hljs-keyword">if</span>(!matchResult) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'必须包含/* __ROUTE__ */标记注释'</span>)
    }
    <span class="hljs-keyword">const</span> str = arr.reduce(<span class="hljs-function">(<span class="hljs-params">pre, next, index, curArr</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> pre += <span class="hljs-string">`'<span class="hljs-subst">${curArr[index]}</span>', `</span>
    }, <span class="hljs-string">''</span>)
    <span class="hljs-keyword">return</span> source.replace(matchResult[<span class="hljs-number">1</span>], str)
}

<span class="hljs-keyword">const</span> entryFile = path.join(__dirname, <span class="hljs-string">'../src/app.wpy'</span>)
<span class="hljs-keyword">let</span> entry = fs.readFileSync(entryFile, {<span class="hljs-attr">encoding</span>: <span class="hljs-string">'UTF-8'</span>})

entry = replace(entry, routes)

fs.writeFileSync(entryFile, entry)</code></pre>
<p>app.wpy的变化如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//before
export default class extends wepy.app {
  config = {
    pages: [
    /* __ROUTE__ */
    /* __ROUTE__ */
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '大家好我是渣渣辉',
      navigationBarTextStyle: 'black'
    }
  }
//...
}
//after
export default class extends wepy.app {
  config = {
    pages: [
/* __ROUTE__ */'modules/home/pages/index', /* __ROUTE__ */
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '大家好我是渣渣辉',
      navigationBarTextStyle: 'black'
    }
  }
//...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//before</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">app</span> </span>{
  config = {
    <span class="hljs-attr">pages</span>: [
    <span class="hljs-comment">/* __ROUTE__ */</span>
    <span class="hljs-comment">/* __ROUTE__ */</span>
    ],
    <span class="hljs-attr">window</span>: {
      <span class="hljs-attr">backgroundTextStyle</span>: <span class="hljs-string">'light'</span>,
      <span class="hljs-attr">navigationBarBackgroundColor</span>: <span class="hljs-string">'#fff'</span>,
      <span class="hljs-attr">navigationBarTitleText</span>: <span class="hljs-string">'大家好我是渣渣辉'</span>,
      <span class="hljs-attr">navigationBarTextStyle</span>: <span class="hljs-string">'black'</span>
    }
  }
<span class="hljs-comment">//...</span>
}
<span class="hljs-comment">//after</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">app</span> </span>{
  config = {
    <span class="hljs-attr">pages</span>: [
<span class="hljs-comment">/* __ROUTE__ */</span><span class="hljs-string">'modules/home/pages/index'</span>, <span class="hljs-comment">/* __ROUTE__ */</span>
    ],
    <span class="hljs-attr">window</span>: {
      <span class="hljs-attr">backgroundTextStyle</span>: <span class="hljs-string">'light'</span>,
      <span class="hljs-attr">navigationBarBackgroundColor</span>: <span class="hljs-string">'#fff'</span>,
      <span class="hljs-attr">navigationBarTitleText</span>: <span class="hljs-string">'大家好我是渣渣辉'</span>,
      <span class="hljs-attr">navigationBarTextStyle</span>: <span class="hljs-string">'black'</span>
    }
  }
<span class="hljs-comment">//...</span>
}</code></pre>
<p>行吧，也总算跑通了。因为项目很赶，所以先用这个方案开发了一个半星期。开发完之后总觉得这种方案太难受，于是密谋着换另一种各精准的自动的方案。。。</p>
<h3 id="articleHeader6">babel插件替换全局常量</h3>
<h4>1.思路</h4>
<p>想必大家肯定很熟悉这种模式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let host = 'http://www.tanwanlanyue.com/'
if(process.env.NODE_ENV === 'production'){
    host = 'http://www.zhazhahui.com/'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> host = <span class="hljs-string">'http://www.tanwanlanyue.com/'</span>
<span class="hljs-keyword">if</span>(process.env.NODE_ENV === <span class="hljs-string">'production'</span>){
    host = <span class="hljs-string">'http://www.zhazhahui.com/'</span>
}</code></pre>
<p>通过这种只在编译过程中存在的全局常量，我们可以做很多值的匹配。<br>因为wepy已经预编译了一层，在框架内的业务代码是读取不了process.env.NODE_ENV的值。我就想着要不做一个类似于webpack的DefinePlugin的babel插件吧。具体的思路是babel编译过程中访问ast时匹配需要替换的标识符或者表达式，然后替换掉相应的值。例如：<br><strong>In</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class extends wepy.app {
  config = {
    pages: __ROUTE__,
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '大家好我是渣渣辉',
      navigationBarTextStyle: 'black'
    }
  }
//...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">app</span> </span>{
  config = {
    <span class="hljs-attr">pages</span>: __ROUTE__,
    <span class="hljs-attr">window</span>: {
      <span class="hljs-attr">backgroundTextStyle</span>: <span class="hljs-string">'light'</span>,
      <span class="hljs-attr">navigationBarBackgroundColor</span>: <span class="hljs-string">'#fff'</span>,
      <span class="hljs-attr">navigationBarTitleText</span>: <span class="hljs-string">'大家好我是渣渣辉'</span>,
      <span class="hljs-attr">navigationBarTextStyle</span>: <span class="hljs-string">'black'</span>
    }
  }
<span class="hljs-comment">//...</span>
}</code></pre>
<p><strong>Out</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class extends wepy.app {
  config = {
    pages: [
        'modules/home/pages/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '大家好我是渣渣辉',
      navigationBarTextStyle: 'black'
    }
  }
//...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">app</span> </span>{
  config = {
    <span class="hljs-attr">pages</span>: [
        <span class="hljs-string">'modules/home/pages/index'</span>,
    ],
    <span class="hljs-attr">window</span>: {
      <span class="hljs-attr">backgroundTextStyle</span>: <span class="hljs-string">'light'</span>,
      <span class="hljs-attr">navigationBarBackgroundColor</span>: <span class="hljs-string">'#fff'</span>,
      <span class="hljs-attr">navigationBarTitleText</span>: <span class="hljs-string">'大家好我是渣渣辉'</span>,
      <span class="hljs-attr">navigationBarTextStyle</span>: <span class="hljs-string">'black'</span>
    }
  }
<span class="hljs-comment">//...</span>
}</code></pre>
<h4>2.学习如何编写babel插件</h4>
<p>在这里先要给大家推荐几份学习资料：<br>首先是babel官网推荐的这份<a href="https://github.com/thejameskyle/the-super-tiny-compiler" rel="nofollow noreferrer" target="_blank">迷你编译器的代码</a>，读完之后基本能理解编译器做的三件事：解析，转换，生成的过程了。<br>其次是<a href="https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md" rel="nofollow noreferrer" target="_blank">编写Babel插件入门手册</a>。基本涵盖了编写插件的方方面面，不过由于babel几个工具文档的缺失，在写插件的时候需要去翻查代码中的注释阅读api用法。<br>然后是大杀器<a href="https://astexplorer.net/" rel="nofollow noreferrer" target="_blank">AST转换器</a>--astexplorer.net。我们来看一下，babel的解析器--babylon的文档，<a href="https://github.com/babel/babylon/blob/master/ast/spec.md" rel="nofollow noreferrer" target="_blank">涵盖的节点类型</a>这么多，脑绘一张AST树不现实。我在编写脚本的时候会先把代码放在转换器内生成AST树，再一步一步走。</p>
<p>编写babel插件之前先要理解抽象语法树这个概念。编译器做的事可以总结为：解析，转换，生成。具体的概念解释去看入门手册可能会更好。这里讲讲我自己的一些理解。</p>
<p>解析包括词法分析与语法分析。<br>解析过程吧。其实按我的理解（不知道这样合适不合适= =）抽象语法树跟DOM树其实很类似。词法分析有点像是把html解析成一个一个的dom节点的过程，语法分析则有点像是将dom节点描述成dom树。</p>
<p>转换过程是编译器最复杂逻辑最集中的地方。首先要理解“树形遍历”与“访问者模式”两个概念。</p>
<p>“树形遍历”如手册中所举例子:<br>假设有这么一段代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function square(n) {
  return n * n;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">square</span>(n) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">n</span> * n;
}</code></pre>
<p>那么有如下的树形结构:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- FunctionDeclaration
  - Identifier (id)
  - Identifier (params[0])
  - BlockStatement (body)
    - ReturnStatement (body)
      - BinaryExpression (argument)
        - Identifier (left)
        - Identifier (right)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">- FunctionDeclaration
  - Identifier (id)
  - Identifier (params[<span class="hljs-number">0</span>])
  - BlockStatement (body)
    - ReturnStatement (body)
      - BinaryExpression (argument)
        - Identifier (left)
        - Identifier (right)</code></pre>
<ul><li>
<p>进入<code>FunctionDeclaration</code></p>
<ul>
<li>进入<code>Identifier (id)</code>
</li>
<li>走到尽头</li>
<li>退出<code>Identifier (id)</code>
</li>
<li>进入<code>Identifier (params[0])</code>
</li>
<li>走到尽头</li>
<li>退出<code>Identifier (params[0])</code>
</li>
<li>
<p>进入<code>BlockStatement (body)</code></p>
<ul>
<li>
<p>进入 <code>ReturnStatement (body)</code></p>
<ul>
<li>
<p>进入 <code>BinaryExpression (argument)</code></p>
<ul>
<li>进入 <code>Identifier (left)</code>
</li>
<li>退出 <code>Identifier (left)</code>
</li>
<li>进入 <code>Identifier (right)</code>
</li>
<li>退出 <code>Identifier (right)</code>
</li>
</ul>
</li>
<li>退出 <code>BinaryExpression (argument)</code>
</li>
</ul>
</li>
<li>退出 <code>ReturnStatement (body)</code>
</li>
</ul>
</li>
<li>退出<code>BlockStatement (body)</code>
</li>
</ul>
</li></ul>
<p>“访问者模式”则可以理解为，进入一个节点时被调用的方法。例如有如下的访问者：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const idVisitor = {
  Identifier() {//在进行树形遍历的过程中，节点为标识符时，访问者就会被调用
    console.log(&quot;visit an Identifier&quot;)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">const</span> idVisitor = {
  Identifier() {<span class="hljs-comment">//在进行树形遍历的过程中，节点为标识符时，访问者就会被调用</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"visit an Identifier"</span>)
  }
}</code></pre>
<p>结合树形遍历来看，就是说每个访问者有进入、退出两次机会来访问一个节点。<br><strong>而我们这个替换常量的插件的关键之处就是在于，访问节点时，通过识别节点为我们的目标，然后替换他的值！</strong></p>
<h4>3.动手写插件</h4>
<p>话不多说，直接上代码。这里要用到的一个工具是<code>babel-types</code>，用来检查节点。</p>
<p>难度其实并不大，主要工作在于熟悉如何匹配目标节点。如匹配memberExpression时使用matchesPattern方法，匹配标识符则直接检查节点的name等等套路。最终成品及用法可以见<a href="https://github.com/ZhaZhengRefn/babel-plugin-global-define/" rel="nofollow noreferrer" target="_blank">我的github</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const memberExpressionMatcher = (path, key) => path.matchesPattern(key)//复杂表达式的匹配条件
const identifierMatcher = (path, key) => path.node.name === key//标识符的匹配条件

const replacer = (path, value, valueToNode) => {//替换操作的工具函数
    path.replaceWith(valueToNode(value))

    if(path.parentPath.isBinaryExpression()){//转换父节点的二元表达式，如：var isProp = __ENV__ === 'production'   ===>   var isProp = true
        const result = path.parentPath.evaluate()
        if(result.confident){
            path.parentPath.replaceWith(valueToNode(result.value))
        }
    }
}

export default function ({ types: t }){//这里需要用上babel-types这个工具
    return {
        visitor: {
            MemberExpression(path, { opts: params }){//匹配复杂表达式
                Object.keys(params).forEach(key => {//遍历Options
                    if(memberExpressionMatcher(path, key)){
                        replacer(path, params[key], t.valueToNode)
                    }
                })
            },
        
            Identifier(path, { opts: params }){//匹配标识符
                Object.keys(params).forEach(key => {//遍历Options
                    if(identifierMatcher(path, key)){
                        replacer(path, params[key], t.valueToNode)
                    }           
                })
            },
        }        
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> memberExpressionMatcher = <span class="hljs-function">(<span class="hljs-params">path, key</span>) =&gt;</span> path.matchesPattern(key)<span class="hljs-comment">//复杂表达式的匹配条件</span>
<span class="hljs-keyword">const</span> identifierMatcher = <span class="hljs-function">(<span class="hljs-params">path, key</span>) =&gt;</span> path.node.name === key<span class="hljs-comment">//标识符的匹配条件</span>

<span class="hljs-keyword">const</span> replacer = <span class="hljs-function">(<span class="hljs-params">path, value, valueToNode</span>) =&gt;</span> {<span class="hljs-comment">//替换操作的工具函数</span>
    path.replaceWith(valueToNode(value))

    <span class="hljs-keyword">if</span>(path.parentPath.isBinaryExpression()){<span class="hljs-comment">//转换父节点的二元表达式，如：var isProp = __ENV__ === 'production'   ===&gt;   var isProp = true</span>
        <span class="hljs-keyword">const</span> result = path.parentPath.evaluate()
        <span class="hljs-keyword">if</span>(result.confident){
            path.parentPath.replaceWith(valueToNode(result.value))
        }
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{ types: t }</span>)</span>{<span class="hljs-comment">//这里需要用上babel-types这个工具</span>
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">visitor</span>: {
            MemberExpression(path, { <span class="hljs-attr">opts</span>: params }){<span class="hljs-comment">//匹配复杂表达式</span>
                <span class="hljs-built_in">Object</span>.keys(params).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {<span class="hljs-comment">//遍历Options</span>
                    <span class="hljs-keyword">if</span>(memberExpressionMatcher(path, key)){
                        replacer(path, params[key], t.valueToNode)
                    }
                })
            },
        
            Identifier(path, { <span class="hljs-attr">opts</span>: params }){<span class="hljs-comment">//匹配标识符</span>
                <span class="hljs-built_in">Object</span>.keys(params).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {<span class="hljs-comment">//遍历Options</span>
                    <span class="hljs-keyword">if</span>(identifierMatcher(path, key)){
                        replacer(path, params[key], t.valueToNode)
                    }           
                })
            },
        }        
    }
}</code></pre>
<h4>4.结果</h4>
<p>当然啦，这块插件不可以写在wepy.config.js中配置。因为必须在wepy编译之前执行我们的编译脚本，替换pages字段。所以的方案是在跑<code>wepy build --watch</code><br>之前跑我们的编译脚本，具体操作是引入<code>babel-core</code>来转换代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const babel = require('babel-core')
//...省略获取app.wpy过程，待会会谈到。
//...省略编写visitor过程，语法跟编写插件略有一点点不同。
const result = babel.transform(code, {
    parserOpts: {//babel的解析器，babylon的配置。记得加入classProperties，否则会无法解析app.wpy的类语法
        sourceType: 'module',
        plugins: ['classProperties']
    },
    plugins: [
        [{
            visitor: myVistor//使用我们写的访问者
        }, {
            __ROUTES__: pages//替换成我们的pages数组
        }],
    ],
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> babel = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-core'</span>)
<span class="hljs-comment">//...省略获取app.wpy过程，待会会谈到。</span>
<span class="hljs-comment">//...省略编写visitor过程，语法跟编写插件略有一点点不同。</span>
<span class="hljs-keyword">const</span> result = babel.transform(code, {
    <span class="hljs-attr">parserOpts</span>: {<span class="hljs-comment">//babel的解析器，babylon的配置。记得加入classProperties，否则会无法解析app.wpy的类语法</span>
        sourceType: <span class="hljs-string">'module'</span>,
        <span class="hljs-attr">plugins</span>: [<span class="hljs-string">'classProperties'</span>]
    },
    <span class="hljs-attr">plugins</span>: [
        [{
            <span class="hljs-attr">visitor</span>: myVistor<span class="hljs-comment">//使用我们写的访问者</span>
        }, {
            <span class="hljs-attr">__ROUTES__</span>: pages<span class="hljs-comment">//替换成我们的pages数组</span>
        }],
    ],
})</code></pre>
<p>当然最终我们是转换成功啦，这个插件也用上了生产环境。但是后来没有采用这方案替换pages字段。暂时只替换了<code>__ENV__: process.env.NODE_ENV</code>与<code>__VERSION__: version</code>两个常量。<br>为什么呢？<br>因为每次编译之后标识符<code>__ROUTES__</code>都会被转换成我们的路由表，那么下次我想替换的时候难道要手动删掉然后再加上<code>__ROUTES__</code>吗？我当然不会干跟我们自动化工程化的思想八字不合的事情啦。<br>不过写完这个插件之后收获还是挺大的，基本了解该如何通过编译器寻找并替换我们的目标节点了。</p>
<h3 id="articleHeader7">编写babel脚本识别pages字段</h3>
<h4>1.思路</h4>
<ol>
<li>首先获取到源代码：app.wpy是类vue单文件的语法。js都在script标签内，那么怎么获取这部分代码呢？又正则？不好吧，太捞了。通过阅读<a href="https://github.com/Tencent/wepy/blob/052ba8c0abf0247cf197e47677aec6b31b43b97c/packages/wepy-cli/src/compile-wpy.js" rel="nofollow noreferrer" target="_blank">wepy-cli的源码</a>，使用<code>xmldom</code>这个库来解析，获取script标签内的代码。</li>
<li>编写访问者遍历并替换节点：首先是找到继承自<code>wepy.app</code>的类，再找到<code>config</code>字段，最后匹配key为<code>pages</code>的对象的值。最后替换目标节点</li>
<li>babel转换为代码后，通过读写文件替换目标代码。大业已成！done!</li>
</ol>
<h4>2.成果</h4>
<p>最终脚本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @author zhazheng
 * @description 在wepy编译前预编译。获取app.wpy内的pages字段，并替换成已生成的路由表。
 */
const babel = require('babel-core')
const t = require('babel-types')

//1.引入路由
const Strategies = require('../src/lib/routes-model')
const routes = Strategies.sortByWeight(require('../src/config/routes'))
const pages = routes.map(item => item.page)

//2.解析script标签内的js，获取code
const xmldom = require('xmldom')
const fs = require('fs')
const path = require('path')

const appFile = path.join(__dirname, '../src/app.wpy')
const fileContent = fs.readFileSync(appFile, { encoding: 'UTF-8' })
let xml = new xmldom.DOMParser().parseFromString(fileContent)

function getCodeFromScript(xml){
    let code = ''
    Array.prototype.slice.call(xml.childNodes || []).forEach(child => {
        if(child.nodeName === 'script'){
            Array.prototype.slice.call(child.childNodes || []).forEach(c => {
                code += c.toString()
            })
        }
    })
    return code
}
const code = getCodeFromScript(xml)

// 3.在遍历ast树的过程中，嵌套三层visitor去寻找节点
//3.1.找class，父类为wepy.app
const appClassVisitor = {
    Class: {
        enter(path, state) {
            const classDeclaration = path.get('superClass')
            if(classDeclaration.matchesPattern('wepy.app')){
                path.traverse(configVisitor, state)
            }
        }
    }
}
//3.2.找config
const configVisitor = {
    ObjectExpression: {
        enter(path, state){
            const expr = path.parentPath.node
            if(expr.key &amp;&amp; expr.key.name === 'config'){
                path.traverse(pagesVisitor, state)
            }
        }
    }
}
//3.3.找pages，并替换
const pagesVisitor = {
    ObjectProperty: {
        enter(path, { opts }){
            const isPages = path.node.key.name === 'pages'
            if(isPages){
                path.node.value = t.valueToNode(opts.value)
            }
        }
    }
}

// 4.转换并生成code
const result = babel.transform(code, {
    parserOpts: {
        sourceType: 'module',
        plugins: ['classProperties']
    },
    plugins: [
        [{
            visitor: appClassVisitor
        }, {
            value: pages
        }],
    ],
})

// 5.替换源代码
fs.writeFileSync(appFile, fileContent.replace(code, result.code))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * @author zhazheng
 * @description 在wepy编译前预编译。获取app.wpy内的pages字段，并替换成已生成的路由表。
 */</span>
<span class="hljs-keyword">const</span> babel = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-core'</span>)
<span class="hljs-keyword">const</span> t = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-types'</span>)

<span class="hljs-comment">//1.引入路由</span>
<span class="hljs-keyword">const</span> Strategies = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../src/lib/routes-model'</span>)
<span class="hljs-keyword">const</span> routes = Strategies.sortByWeight(<span class="hljs-built_in">require</span>(<span class="hljs-string">'../src/config/routes'</span>))
<span class="hljs-keyword">const</span> pages = routes.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item.page)

<span class="hljs-comment">//2.解析script标签内的js，获取code</span>
<span class="hljs-keyword">const</span> xmldom = <span class="hljs-built_in">require</span>(<span class="hljs-string">'xmldom'</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-keyword">const</span> appFile = path.join(__dirname, <span class="hljs-string">'../src/app.wpy'</span>)
<span class="hljs-keyword">const</span> fileContent = fs.readFileSync(appFile, { <span class="hljs-attr">encoding</span>: <span class="hljs-string">'UTF-8'</span> })
<span class="hljs-keyword">let</span> xml = <span class="hljs-keyword">new</span> xmldom.DOMParser().parseFromString(fileContent)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCodeFromScript</span>(<span class="hljs-params">xml</span>)</span>{
    <span class="hljs-keyword">let</span> code = <span class="hljs-string">''</span>
    <span class="hljs-built_in">Array</span>.prototype.slice.call(xml.childNodes || []).forEach(<span class="hljs-function"><span class="hljs-params">child</span> =&gt;</span> {
        <span class="hljs-keyword">if</span>(child.nodeName === <span class="hljs-string">'script'</span>){
            <span class="hljs-built_in">Array</span>.prototype.slice.call(child.childNodes || []).forEach(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> {
                code += c.toString()
            })
        }
    })
    <span class="hljs-keyword">return</span> code
}
<span class="hljs-keyword">const</span> code = getCodeFromScript(xml)

<span class="hljs-comment">// 3.在遍历ast树的过程中，嵌套三层visitor去寻找节点</span>
<span class="hljs-comment">//3.1.找class，父类为wepy.app</span>
<span class="hljs-keyword">const</span> appClassVisitor = {
    <span class="hljs-attr">Class</span>: {
        enter(path, state) {
            <span class="hljs-keyword">const</span> classDeclaration = path.get(<span class="hljs-string">'superClass'</span>)
            <span class="hljs-keyword">if</span>(classDeclaration.matchesPattern(<span class="hljs-string">'wepy.app'</span>)){
                path.traverse(configVisitor, state)
            }
        }
    }
}
<span class="hljs-comment">//3.2.找config</span>
<span class="hljs-keyword">const</span> configVisitor = {
    <span class="hljs-attr">ObjectExpression</span>: {
        enter(path, state){
            <span class="hljs-keyword">const</span> expr = path.parentPath.node
            <span class="hljs-keyword">if</span>(expr.key &amp;&amp; expr.key.name === <span class="hljs-string">'config'</span>){
                path.traverse(pagesVisitor, state)
            }
        }
    }
}
<span class="hljs-comment">//3.3.找pages，并替换</span>
<span class="hljs-keyword">const</span> pagesVisitor = {
    <span class="hljs-attr">ObjectProperty</span>: {
        enter(path, { opts }){
            <span class="hljs-keyword">const</span> isPages = path.node.key.name === <span class="hljs-string">'pages'</span>
            <span class="hljs-keyword">if</span>(isPages){
                path.node.value = t.valueToNode(opts.value)
            }
        }
    }
}

<span class="hljs-comment">// 4.转换并生成code</span>
<span class="hljs-keyword">const</span> result = babel.transform(code, {
    <span class="hljs-attr">parserOpts</span>: {
        <span class="hljs-attr">sourceType</span>: <span class="hljs-string">'module'</span>,
        <span class="hljs-attr">plugins</span>: [<span class="hljs-string">'classProperties'</span>]
    },
    <span class="hljs-attr">plugins</span>: [
        [{
            <span class="hljs-attr">visitor</span>: appClassVisitor
        }, {
            <span class="hljs-attr">value</span>: pages
        }],
    ],
})

<span class="hljs-comment">// 5.替换源代码</span>
fs.writeFileSync(appFile, fileContent.replace(code, result.code))</code></pre>
<h4>3.使用方法</h4>
<p>只需要在执行<code>wepy build --watch</code>之前先执行这份脚本，就可自动替换路由表，自动化操作。监听文件变动，增加模块时自动重新跑脚本，更新路由表，开发体验一流~</p>
<h3 id="articleHeader8">结语</h3>
<p>把代码往更自动化更工程化的方向写，这样的过程收获还是挺大的。但是确实这份脚本仍有不足之处，起码匹配节点这部分的代码是不大严谨的。<br><strong>另外插播一份广告</strong><br>我司<strong>风变科技</strong>正招聘前端开发：</p>
<ul>
<li>应届、一年经验，熟悉Vue的前端小鲜肉</li>
<li>三年经验的前端大佬</li>
</ul>
<p>我！们！都！想！要！<br>我们开发团队不仅代码写的好，而且男程序员还拥有着100%的脱单率！！快来加入我们吧！</p>
<p>邮箱：nicolas_refn@foxmail.com</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【babel+小程序】记“编写babel插件”与“通过语法解析替换小程序路由表”的经历

## 原文链接
[https://segmentfault.com/a/1190000013130489](https://segmentfault.com/a/1190000013130489)

