---
title: '自动 Import 工具，前端打字员的自我救赎' 
date: 2018-12-18 2:30:11
hidden: true
slug: te67iwptu98
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">自动 import 工具</h1>
<p>先推荐两个干货，关于正则的<br><a href="https://regexr.com" rel="nofollow noreferrer" target="_blank">regexr</a>，<a href="https://regexper.com/" rel="nofollow noreferrer" target="_blank">regexper</a>，前者验证正则是否和预期一样，后者以图的形式表达正则，有助于理解天书般的别人写的正则</p>
<p>作为一个前端打字员，一个经常遇到的场景就是在<strong>路由文件中引入模块</strong>，比如这样</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012792021?w=1610&amp;h=404" src="https://static.alili.tech/img/remote/1460000012792021?w=1610&amp;h=404" alt="Screenshot_2018-01-11 01.02.52_b1KSEv" title="Screenshot_2018-01-11 01.02.52_b1KSEv" style="cursor: pointer; display: inline;"></span></p>
<p>在 <code>router/index.js</code> 中写入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'

const About = () => import('../pages/About.vue')
const Home = () => import('../pages/Home.vue')

Vue.use(Router)
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>

const About = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'../pages/About.vue'</span>)
const Home = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'../pages/Home.vue'</span>)

Vue.use(Router)
...</code></pre>
<p>如果修改了模块的名字，增加了模块或者删除了模块，就需要重新修改这个路由文件</p>
<p>总是做这么机械的事情无异于消耗我这个<strong>前端打字员</strong>的寿命</p>
<p>不能忍，遂写个工具</p>
<h3 id="articleHeader1">整理思路如下</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012792022?w=1466&amp;h=770" src="https://static.alili.tech/img/remote/1460000012792022?w=1466&amp;h=770" alt="Screenshot_2018-01-11 01.01.36_00Cube" title="Screenshot_2018-01-11 01.01.36_00Cube" style="cursor: pointer;"></span></p>
<p>其中，监视目录下文件的变动依靠的是 <strong>node</strong> API 中<code>fs.watch(filename[, options][, listener])</code></p>
<p>替换目标文件中引入模块的部分，则是通过正则来实现</p>
<p>在这里五星推荐一个验证正则是否正确的网站，<a href="https://regexr.com/?30jrh" rel="nofollow noreferrer" target="_blank">regexr</a></p>
<h3 id="articleHeader2">代码实现</h3>
<p>监视包含模块的目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fs.watch(dir, {
  recursive: true // 目录下子目录也被监视
}, (event, filename) => { 
// event 是文件变动的类型，添加文件、删除文件和修改文件名都是'rename' 事件
// filename 是变化的文件或目录
  if(event === 'rename'){ // 判断文件变动类型
    
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>fs.watch(dir, {
  recursive: <span class="hljs-literal">true</span> <span class="hljs-comment">// 目录下子目录也被监视</span>
}, (<span class="hljs-keyword">event</span>, filename) =&gt; { 
<span class="hljs-comment">// event 是文件变动的类型，添加文件、删除文件和修改文件名都是'rename' 事件</span>
<span class="hljs-comment">// filename 是变化的文件或目录</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">event</span> === <span class="hljs-string">'rename'</span>){ <span class="hljs-comment">// 判断文件变动类型</span>
    
  }
})</code></pre>
<p>当发生<strong>rename</strong>事件后，需要重新获得目录下(<strong>from</strong>)所有的模块，包括模块名<strong>moduleName</strong>，模块文件相对于引用模块文件(<strong>to</strong>)的相对路径<strong>modulePath</strong>，将它们存入变量<strong>modules</strong>中</p>
<p>实际项目中，模块通常都是<strong>.vue</strong>文件，或者<strong>.jsx</strong>文件，因此只将这些作为模块，在路由文件中引用</p>
<p>另外有些模块文件因为各种原因，希望人工引入，而不被<strong>watch</strong>，这样的文件存入<strong>excludeArr</strong>中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _ = require('lodash')
let excludeArr = [...]
let modules = []
let extname = '.vue'
let from = './src/pages'
let to = './src/router/index.js&quot;'

const mapDir = d => {
    // 获得当前文件夹下的所有的文件夹和文件
    const [dirs, files] = _(fs.readdirSync(d)).partition(p =>
        fs.statSync(path.join(d, p)).isDirectory()
    )

    // 映射文件夹
    dirs.forEach(dir => {
        modules.concat(mapDir(path.join(d, dir)))
    })

    // 映射文件
    files.forEach(file => {
        // 文件后缀名
        let filename = path.join(d, file)
        if (path.extname(file) === extname) {
            if (!excludeArr.includes(path.resolve(__dirname, filename))) {
                let moduleName = path.basename(file, extname)
                // 若存在 -
                if (moduleName.match('-')) {
                    moduleName = moduleName.replace(
                        /(-)(.{1})/,
                        (match, p1, p2, offset, string) => p2.toUpperCase()
                    )
                }
                modules.push({
                    moduleName,
                    modulePath: path.relative(path.dirname(to), filename)
                })
            }
        }
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lodash'</span>)
<span class="hljs-keyword">let</span> excludeArr = [...]
<span class="hljs-keyword">let</span> modules = []
<span class="hljs-keyword">let</span> extname = <span class="hljs-string">'.vue'</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">from</span> = <span class="hljs-string">'./src/pages'</span>
<span class="hljs-keyword">let</span> to = <span class="hljs-string">'./src/router/index.js"'</span>

<span class="hljs-keyword">const</span> mapDir = <span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> {
    <span class="hljs-comment">// 获得当前文件夹下的所有的文件夹和文件</span>
    <span class="hljs-keyword">const</span> [dirs, files] = _(fs.readdirSync(d)).partition(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span>
        fs.statSync(path.join(d, p)).isDirectory()
    )

    <span class="hljs-comment">// 映射文件夹</span>
    dirs.forEach(<span class="hljs-function"><span class="hljs-params">dir</span> =&gt;</span> {
        modules.concat(mapDir(path.join(d, dir)))
    })

    <span class="hljs-comment">// 映射文件</span>
    files.forEach(<span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> {
        <span class="hljs-comment">// 文件后缀名</span>
        <span class="hljs-keyword">let</span> filename = path.join(d, file)
        <span class="hljs-keyword">if</span> (path.extname(file) === extname) {
            <span class="hljs-keyword">if</span> (!excludeArr.includes(path.resolve(__dirname, filename))) {
                <span class="hljs-keyword">let</span> moduleName = path.basename(file, extname)
                <span class="hljs-comment">// 若存在 -</span>
                <span class="hljs-keyword">if</span> (moduleName.match(<span class="hljs-string">'-'</span>)) {
                    moduleName = moduleName.replace(
                        <span class="hljs-regexp">/(-)(.{1})/</span>,
                        <span class="hljs-function">(<span class="hljs-params">match, p1, p2, offset, <span class="hljs-built_in">string</span></span>) =&gt;</span> p2.toUpperCase()
                    )
                }
                modules.push({
                    moduleName,
                    modulePath: path.relative(path.dirname(to), filename)
                })
            }
        }
    })
}</code></pre>
<p>生成好新的待引入的模块后，接下来就是在路由文件中，将对应的内容替换掉</p>
<p>所以需要读写文件以及正则替换</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                const regex = /\/\*\sautoImport(.*\n)*\/\*\sautoImport\s\*\//g
                let importStr = ''
                modules.forEach((m, index) => {
                    importStr =
                        importStr +
                        fillTemplate(template, m.moduleName, m.modulePath) +
                        (cache.length - 1 === index ? '' : '\n')
                })
                fs.readFile(to, 'utf8', (err, data) => {
                    if (err) return console.log(err)
                    let result = ''
                    if (data.match(regex)) {
                        result = data.replace(
                            regex,
                            `/* autoImport */
${importStr}
/* autoImport */`
                        )
                    } else {
                        /* 首次插入在文件最后的import插入 */
                        result = data.replace(
                            /(.*import.*)(\n)([^(import)])/,
                            (match, p1, p2, p3, offset, string) => {
                                return `${p1}
/* autoImport */
${importStr}
/* autoImport */
${p3}`
                            }
                        )
                    }

                    fs.writeFile(to, result, 'utf8', err => {
                        if (err) return console.log(err)
                    })
                })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>                <span class="hljs-keyword">const</span> regex = <span class="hljs-regexp">/\/\*\sautoImport(.*\n)*\/\*\sautoImport\s\*\//g</span>
                <span class="hljs-keyword">let</span> importStr = <span class="hljs-string">''</span>
                modules.forEach(<span class="hljs-function">(<span class="hljs-params">m, index</span>) =&gt;</span> {
                    importStr =
                        importStr +
                        fillTemplate(template, m.moduleName, m.modulePath) +
                        (cache.length - <span class="hljs-number">1</span> === index ? <span class="hljs-string">''</span> : <span class="hljs-string">'\n'</span>)
                })
                fs.readFile(to, <span class="hljs-string">'utf8'</span>, <span class="hljs-function">(<span class="hljs-params">err, data</span>) =&gt;</span> {
                    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(err)
                    <span class="hljs-keyword">let</span> result = <span class="hljs-string">''</span>
                    <span class="hljs-keyword">if</span> (data.match(regex)) {
                        result = data.replace(
                            regex,
                            <span class="hljs-string">`/* autoImport */
<span class="hljs-subst">${importStr}</span>
/* autoImport */`</span>
                        )
                    } <span class="hljs-keyword">else</span> {
                        <span class="hljs-comment">/* 首次插入在文件最后的import插入 */</span>
                        result = data.replace(
                            <span class="hljs-regexp">/(.*import.*)(\n)([^(import)])/</span>,
                            <span class="hljs-function">(<span class="hljs-params">match, p1, p2, p3, offset, <span class="hljs-built_in">string</span></span>) =&gt;</span> {
                                <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${p1}</span>
/* autoImport */
<span class="hljs-subst">${importStr}</span>
/* autoImport */
<span class="hljs-subst">${p3}</span>`</span>
                            }
                        )
                    }

                    fs.writeFile(to, result, <span class="hljs-string">'utf8'</span>, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(err)
                    })
                })</code></pre>
<p>其中<code>/\/\*\sautoImport(.*\n)*\/\*\sautoImport\s\*\//g</code>是用于匹配两段注释<code>/* autoImport */</code>及其中间的内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
/* autoImport */
const About = () => import('../pages/About.vue')
const Home = () => import('../pages/Home.vue')
/* autoImport */

Vue.use(Router)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-comment">/* autoImport */</span>
<span class="hljs-keyword">const</span> About = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'../pages/About.vue'</span>)
<span class="hljs-keyword">const</span> Home = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'../pages/Home.vue'</span>)
<span class="hljs-comment">/* autoImport */</span>

Vue.use(Router)
</code></pre>
<p>当第一次使用，没有<code>/* autoImport */</code>时，就需要在最后一个<strong>import</strong>后面，插入引入的模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data.replace(
                            /(.*import.*)(\n)([^(import)])/,
                            (match, p1, p2, p3, offset, string) => {
                                return `${p1}
/* autoImport */
${importStr}
/* autoImport */
${p3}`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">data.replace</span>(
                            /(.*<span class="hljs-meta">import</span>.*)(\n)([^(<span class="hljs-meta">import</span>)])/,
                            (match, <span class="hljs-built_in">p1</span>, <span class="hljs-built_in">p2</span>, <span class="hljs-built_in">p3</span>, offset, <span class="hljs-keyword">string) </span>=&gt; {
                                return `${<span class="hljs-built_in">p1</span>}
<span class="hljs-comment">/* autoImport */</span>
${importStr}
<span class="hljs-comment">/* autoImport */</span>
${<span class="hljs-built_in">p3</span>}`</code></pre>
<p>在这里还可以自定义了引入模块的方式，例如懒加载，<code>"const moduleName = () =&gt; import(modulePath)"</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const template = &quot;const moduleName = () => import(modulePath)&quot;
const fillTemplate = (template, moduleName, modulePath) =>
    template
        .replace('moduleName', moduleName)
        .replace('modulePath', `'${modulePath}'`)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> <span class="hljs-keyword">template</span> = <span class="hljs-string">"const moduleName = () =&gt; import(modulePath)"</span>
<span class="hljs-keyword">const</span> fillTemplate = (<span class="hljs-keyword">template</span>, moduleName, modulePath) =&gt;
    <span class="hljs-keyword">template</span>
        .replace(<span class="hljs-string">'moduleName'</span>, moduleName)
        .replace(<span class="hljs-string">'modulePath'</span>, `<span class="hljs-string">'${modulePath}'</span>`)</code></pre>
<p>为了工具的灵活性，把可配置项写成json文件的形式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;extname&quot;: &quot;.vue&quot;,
    &quot;from&quot;: &quot;src/pages&quot;,
    &quot;to&quot;: &quot;src/router/index.js&quot;,
    &quot;template&quot;: &quot;const moduleName = () => import(modulePath)&quot;,
    &quot;exclude&quot;: [
        &quot;./src/pages/login.vue&quot;,
        &quot;./src/pages/404.vue&quot;,
        &quot;./src/pages/overall/**&quot;,
        &quot;./src/pages/account-result/**&quot;
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"extname"</span>: <span class="hljs-string">".vue"</span>,
    <span class="hljs-attr">"from"</span>: <span class="hljs-string">"src/pages"</span>,
    <span class="hljs-attr">"to"</span>: <span class="hljs-string">"src/router/index.js"</span>,
    <span class="hljs-attr">"template"</span>: <span class="hljs-string">"const moduleName = () =&gt; import(modulePath)"</span>,
    <span class="hljs-attr">"exclude"</span>: [
        <span class="hljs-string">"./src/pages/login.vue"</span>,
        <span class="hljs-string">"./src/pages/404.vue"</span>,
        <span class="hljs-string">"./src/pages/overall/**"</span>,
        <span class="hljs-string">"./src/pages/account-result/**"</span>
    ]
}</code></pre>
<p>然后通过以下的方式来获得</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const config = fs.readFileSync('./autoImport.json')
const { extname, from, to, template, exclude } = JSON.parse(config)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> <span class="hljs-built_in">config</span> = fs.readFileSync(<span class="hljs-string">'./autoImport.json'</span>)
<span class="hljs-keyword">const</span> { extname, from, to, <span class="hljs-keyword">template</span>, exclude } = JSON.parse(<span class="hljs-built_in">config</span>)</code></pre>
<h3 id="articleHeader3">后记</h3>
<p>下一步准备把这个工具写成webpack的插件，名字我都起好了，<a href="https://github.com/nbb3210/AutoImportPlugin" rel="nofollow noreferrer" target="_blank">AutoImportPlugin</a>，先在github上占了个坑，<strong>顺手给颗星，不用改Bug</strong></p>
<p>同时准备用更加成熟的模块<a href="https://github.com/paulmillr/chokidar" rel="nofollow noreferrer" target="_blank">chokidar</a>来代替原生的<strong>watch</strong></p>
<p>工具有问题提issue啊</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
自动 Import 工具，前端打字员的自我救赎

## 原文链接
[https://segmentfault.com/a/1190000012792016](https://segmentfault.com/a/1190000012792016)

