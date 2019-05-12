---
title: 'vue项目中的常见问题（vue-cli版本3.0.0）' 
date: 2018-12-06 2:30:09
hidden: true
slug: e40pc1365nk
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">一、样式问题</h3>
<p>1.vue中使用less</p>
<p>安装less依赖 <code>npm install less less-loader --save-dev</code></p>
<p>在使用时 在style标签中加入 <code>lang="less"</code> 也可以加上<code>scoped</code>代表样式只在此作用域中有效。</p>
<p>2.使用element插件时修改其样式，在vue中不起作用，这里有几种方法可以尝试</p>
<ul>
<li>如果 <code>style</code> 中加了 <code>scoped</code> 去掉它。</li>
<li>在要改变的样式前加 <code>/deep/</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" /deep/.el-submenu__title .el-icon-arrow-down{
    margin-top:-5px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> /deep/<span class="hljs-selector-class">.el-submenu__title</span> .el-<span class="hljs-attribute">icon</span>-arrow-down{
    <span class="hljs-attribute">margin-top</span>:-<span class="hljs-number">5px</span>;
}</code></pre>
<h3 id="articleHeader1">二、<code>vue-router</code> 问题</h3>
<p>1.去掉vue项目路径中的 <code>#</code></p>
<p>主要用到<code>router</code> 的 <code>history</code>模式。官网说的很详细，以及注意点：<a href="https://router.vuejs.org/zh-cn/essentials/history-mode.html" rel="nofollow noreferrer" target="_blank">vue-router官网 HTML5 History模式</a></p>
<p>2.当我们通过router 中的query从一A页面想给B页面传递一个Object 对象形式的数据时，第一次B页面可以拿到数据，但是刷新B页面后，数据会消失。这里有一下解决方法：</p>
<ul>
<li>将A页面的数据通过 JSON.stringify() 变成字符串，传递</li>
<li>将A页面数据存储在sessionStorage 中，B页面同该sessionStorage 获取</li>
<li>后台提供单独的接口，在B页面请求A页面传过来的数据</li>
</ul>
<h3 id="articleHeader2">三、页面预渲染（seo优化问题）</h3>
<p>官网也指出，如果你只是为了改善营销页面的SEO优化，你可能需要预渲染了。而无需使用web服务器实时动态变异html，而是使用预渲染方式，在构建时简单地生成针对特定路由的静态 HTML 文件</p>
<p>1.预渲染</p>
<p>如果你想要预渲染需要使用 <code>prerender-spa-plugin</code> 插件来处理你的文件。这里建议你直接看官网的<code>api</code>， <code>2.x</code>版本的和<code>3.x</code>版本的<code>api</code>不同。所以建议直接看官网了解最新的<code>api</code>。  <a href="https://github.com/chrisvfritz/prerender-spa-plugin" rel="nofollow noreferrer" target="_blank">prerender-spa-plugin GitHub</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  plugins: [
    ...
    new PrerenderSPAPlugin({
      // 生成文件的路径
      staticDir: path.join(__dirname, 'dist'),
      // 对应路由生成的目录
      routes: [ '/', '/about', '/some/deep/nested/route' ],
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> PrerenderSPAPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'prerender-spa-plugin'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attribute">plugins</span>: [
    ...
    <span class="hljs-keyword">new</span> PrerenderSPAPlugin({
      <span class="hljs-comment">// 生成文件的路径</span>
      <span class="hljs-attribute">staticDir</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>),
      <span class="hljs-comment">// 对应路由生成的目录</span>
      <span class="hljs-attribute">routes</span>: [ <span class="hljs-string">'/'</span>, <span class="hljs-string">'/about'</span>, <span class="hljs-string">'/some/deep/nested/route'</span> ],
    })
  ]
}</code></pre>
<p>另外为页面做Meta SEO优化 可以使用 <code>vue-meta-info</code> <a href="https://github.com/monkeyWangs/vue-meta-info" rel="nofollow noreferrer" target="_blank">GitHub地址</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/29148760" rel="nofollow noreferrer" target="_blank">vue-meta-info的相关文章</a></p>
<h3 id="articleHeader3">四、数据响应失效</h3>
<p>首先在<code>Vue.js</code> 中对象的响应时依赖<code>Object.defineProperty</code> 方法的，而对于数组是没有这个方法的。</p>
<blockquote>这里需要注意，如果数组中是对象，当对象里数据变化时是可以渲染的，如果类似<code>[0,1,2,3]</code>这样的数组，数据变化时，是不会渲染的。</blockquote>
<p>所以数组存储的数据在更改时是没有响应变化的。所以<code>Vue</code>提供了<code>$set()</code> 方法： <a href="https://cn.vuejs.org/v2/api/#Vue-set" rel="nofollow noreferrer" target="_blank">官网</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue.array.$set(0,'change')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">vue.array.$set(<span class="hljs-number">0</span>,<span class="hljs-string">'change'</span>)
</code></pre>
<h3 id="articleHeader4">五、数据双向绑定问题</h3>
<p>1.在使用vuex时，我们两个模块可能使用同一个数据，比如两模块中的表单使用的是同一个数据，当其中一个模块中的表单填写好时，我们进入另一个模块表单时，也会显示该数据，如果该数据少还可以，如果有很多字段，我们一个一个清空会和麻烦，我这里解决的办法就是：使用<code>JSON.stringify</code> 和 <code>JSON.parse()</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let evaluateReq = { // 初始数据
    type:'0',
    pageSize:10,
    pageNum:1,
}

const state = {
    evaluateListReq:JSON.parse(JSON.stringify(evaluateReq)), 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>
<span class="hljs-keyword">let</span> evaluateReq = { <span class="hljs-comment">// 初始数据</span>
    <span class="hljs-keyword">type</span>:<span class="hljs-string">'0'</span>,
    pageSize:<span class="hljs-number">10</span>,
    pageNum:<span class="hljs-number">1</span>,
}

<span class="hljs-keyword">const</span> state = {
    evaluateListReq:<span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(evaluateReq)), 
}</code></pre>
<p>这样做，当我们初始化 <code>evaluateListReq</code> 数据时，可以讲 <code>evaluateReq</code> 数据 通过 <code>mutations</code> 赋值给<code>evaluateListReq</code> ，如果我们这里不使用<code>JSON.stringify</code> 和 <code>JSON.parse()</code> 而直接赋值， <code>evaluateReq</code> 中的数据与 <code>evaluateListReq</code> 会被vue认为是同一个数据，都绑定上，一个值变化，都会随着变化。</p>
<h3 id="articleHeader5">六、使用Element(饿了么)插件问题</h3>
<p>1.<code>&lt;le-input&gt;</code>表单使用回车触发事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-input  @keyup.enter.native=&quot;onSubmit&quot; ></el-input>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;el-<span class="hljs-selector-tag">input</span>  @keyup<span class="hljs-selector-class">.enter</span><span class="hljs-selector-class">.native</span>=<span class="hljs-string">"onSubmit"</span> &gt;&lt;/el-input&gt;</code></pre>
<p>这里需要在<code>@keyup.enter</code> 后面加上<code>native</code>才会触发回车事件。这个东西在一些实际上处理 DOM 原生事件的场合才需要添加额外的标识符。</p>
<p>2.当浏览器窗口变小时，<code>el-table</code>组件宽度不随窗口响应变小。</p>
<p>这里我们需要冲突掉<code>Element</code> 中<code>el-table</code> 的 <code>max-width:100%</code> 样式，该值不能设置成100%,可以改成99%,小于100%即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".el-table{
   max-width:99.9%
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.el-table</span>{
   <span class="hljs-attribute">max-width</span>:<span class="hljs-number">99.9%</span>
}</code></pre>
<h3 id="articleHeader6">七、axios 交互问题</h3>
<p>1.vue中创建excel 的下载，解决excel下载乱码问题</p>
<p>我们可以在axios的请求拦截或响应拦截中去动态创建a标签下载excel</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function excelDown(res){  // excel 下载请求
  //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
  var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
　　var downloadElement = document.createElement('a');
　　var href = window.URL.createObjectURL(blob); //创建下载的链接
　　downloadElement.href = res.request.responseURL +`&amp;token=${sessionStorage.JRYC_TOKEN}`;
　　downloadElement.download = '列表.xls'; //下载后文件名
　　document.body.appendChild(downloadElement);
　　downloadElement.click(); //点击下载
　　document.body.removeChild(downloadElement); //下载完成移除元素
　　window.URL.revokeObjectURL(href); //释放掉blob对象
}


axios.interceptors.response.use(res => {

   if (res.headers['content-type'] == 'application/vnd.ms-excel' || res.headers['content-type'] == 'application/vnd.ms-excel;charset=UTF-8') {
        excelDown(res)
        return {code:0,state:'success'}
    }else{
      return res
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">excelDown</span>(<span class="hljs-params">res</span>)</span>{  <span class="hljs-comment">// excel 下载请求</span>
  <span class="hljs-comment">//application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型</span>
  <span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">new</span> Blob([res.data], {<span class="hljs-attr">type</span>: <span class="hljs-string">'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'</span>});
　　<span class="hljs-keyword">var</span> downloadElement = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>);
　　<span class="hljs-keyword">var</span> href = <span class="hljs-built_in">window</span>.URL.createObjectURL(blob); <span class="hljs-comment">//创建下载的链接</span>
　　downloadElement.href = res.request.responseURL +<span class="hljs-string">`&amp;token=<span class="hljs-subst">${sessionStorage.JRYC_TOKEN}</span>`</span>;
　　downloadElement.download = <span class="hljs-string">'列表.xls'</span>; <span class="hljs-comment">//下载后文件名</span>
　　<span class="hljs-built_in">document</span>.body.appendChild(downloadElement);
　　downloadElement.click(); <span class="hljs-comment">//点击下载</span>
　　<span class="hljs-built_in">document</span>.body.removeChild(downloadElement); <span class="hljs-comment">//下载完成移除元素</span>
　　<span class="hljs-built_in">window</span>.URL.revokeObjectURL(href); <span class="hljs-comment">//释放掉blob对象</span>
}


axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {

   <span class="hljs-keyword">if</span> (res.headers[<span class="hljs-string">'content-type'</span>] == <span class="hljs-string">'application/vnd.ms-excel'</span> || res.headers[<span class="hljs-string">'content-type'</span>] == <span class="hljs-string">'application/vnd.ms-excel;charset=UTF-8'</span>) {
        excelDown(res)
        <span class="hljs-keyword">return</span> {<span class="hljs-attr">code</span>:<span class="hljs-number">0</span>,<span class="hljs-attr">state</span>:<span class="hljs-string">'success'</span>}
    }<span class="hljs-keyword">else</span>{
      <span class="hljs-keyword">return</span> res
    }
})</code></pre>
<h3 id="articleHeader7">八、其它注意事项</h3>
<p>1.使用v-for 时我们尽量携带key值，以方便vue的渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v-for=&quot;(item, index) in list&quot; class=&quot;list&quot; :key=&quot;index&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;">v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item, index) in list"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"list"</span> :key=<span class="hljs-string">"index"</span></code></pre>
<p>2.在使用 <code>import ... from ...</code> 引入同级目录下的组件时，尽量加上 <code>./</code> ， 不然有时会报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Header from './Header';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'./Header'</span>;</code></pre>
<p>3.使用<code>$emit</code> 不起作用，这里我建议你在子组件绑定父组件事件时 使用 <code>v-on</code> 全写，尽量不使用<code>@</code> 缩写，因为使用<code>@</code> 缩写有时会不起作用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <edit-add-ver   v-on:childMethodShow=&quot;showEdit&quot;></edit-add-ver>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;"> &lt;<span class="hljs-keyword">edit</span>-<span class="hljs-built_in">add</span>-ver   v-<span class="hljs-keyword">on</span>:childMethodShow=<span class="hljs-string">"showEdit"</span>&gt;&lt;/<span class="hljs-keyword">edit</span>-<span class="hljs-built_in">add</span>-ver&gt;</code></pre>
<h3 id="articleHeader8">九、vue-cli 目录的分析以及我个人常用的项目构建</h3>
<p>具体目录分析进入 <a href="https://github.com/webxiaoma/vue-demos/tree/master/vue-cli" rel="nofollow noreferrer" target="_blank">https://github.com/webxiaoma/vue-demos/tree/master/vue-cli</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue项目中的常见问题（vue-cli版本3.0.0）

## 原文链接
[https://segmentfault.com/a/1190000014256745](https://segmentfault.com/a/1190000014256745)

