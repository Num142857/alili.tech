---
title: 'vue首屏加载优化' 
date: 2019-01-10 2:30:08
hidden: true
slug: hqbyjgipeuv
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">库使用情况</h3>
<ul>
<li><p>vue</p></li>
<li><p>vue-router</p></li>
<li><p>axios</p></li>
<li><p>muse-ui</p></li>
<li><p>material-icons</p></li>
<li><p>vue-baidu-map</p></li>
</ul>
<h3 id="articleHeader1">未优化前</h3>
<p>首先我们在正常情况下build<br><span class="img-wrap"><img data-src="/img/bVQh4x?w=729&amp;h=103" src="https://static.alili.tech/img/bVQh4x?w=729&amp;h=103" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">优化</h3>
<h4>1. 按需加载</h4>
<p>当前流行的UI框架如iview,muse-ui,Element UI都支持按需加载,只需稍微改动一下代码.</p>
<p>修改前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
Vue.use(MuseUI)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> MuseUI <span class="hljs-keyword">from</span> <span class="hljs-string">'muse-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'muse-ui/dist/muse-ui.css'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'muse-ui/dist/theme-light.css'</span>
Vue.use(MuseUI)</code></pre>
<p>修改后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import appBar from 'muse-ui/src/appBar'
import toast from 'muse-ui/src/toast'
import drawer from 'muse-ui/src/drawer'
import popup from 'muse-ui/src/popup'

Vue.component(appBar.name, appBar);
Vue.component(toast.name, toast);
Vue.component(drawer.name, drawer);
Vue.component(popup.name, popup);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> appBar <span class="hljs-keyword">from</span> <span class="hljs-string">'muse-ui/src/appBar'</span>
<span class="hljs-keyword">import</span> toast <span class="hljs-keyword">from</span> <span class="hljs-string">'muse-ui/src/toast'</span>
<span class="hljs-keyword">import</span> drawer <span class="hljs-keyword">from</span> <span class="hljs-string">'muse-ui/src/drawer'</span>
<span class="hljs-keyword">import</span> popup <span class="hljs-keyword">from</span> <span class="hljs-string">'muse-ui/src/popup'</span>

Vue.component(appBar.name, appBar);
Vue.component(toast.name, toast);
Vue.component(drawer.name, drawer);
Vue.component(popup.name, popup);</code></pre>
<p>这里有点麻烦的就是你要把整个项目用到的muse-ui组件都注册一遍,当然你也可以只在用到的页面做局部引用.<br>让我们来看看使用按需加载后的效果?</p>
<p><span class="img-wrap"><img data-src="/img/bVQh9B?w=726&amp;h=104" src="https://static.alili.tech/img/bVQh9B?w=726&amp;h=104" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在当前项目引用了16个muse-ui组件的情况下 css减少了80kb,js减少了快200kb.</p>
<h4>2. 基于DllPlugin 和 DllReferencePlugin 的 webpack 构建优化</h4>
<p>这一步并没有对项目产出的文件进行什么优化.而是优化了构建速度.<br>DllPlugin 预编译模块.有点像android开发中的lib Module,或者iOS的framework.<br>我们可以对项目中用到的vue,vue-router,axios,muse-ui 这些固定的,基本不变动的模块进行预编译. 具体操作不在赘述,可以看一下<a href="http://blog.mayday5.me/20170615/%E5%9F%BA%E4%BA%8EDllPlugin-%E5%92%8C-DllReferencePlugin-%E7%9A%84-webpack-%E6%9E%84%E5%BB%BA%E4%BC%98%E5%8C%96/" rel="nofollow noreferrer" target="_blank">这篇文章</a>,也是我写的,但是觉得自己没讲利索? .</p>
<p>看一下构建时间的结果对比:</p>
<p><span class="img-wrap"><img data-src="/img/bVQikO?w=721&amp;h=127" src="https://static.alili.tech/img/bVQikO?w=721&amp;h=127" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>before:38291ms    <br>after :10089ms</p>
<p>项目中多了core.dll.css和core.dll.js 他们就是划分出来的固定的,基本不变的模块,所以只需要编译一次,以后引用就好.有点library的感觉.这样每次构建省去了构建固定模块的时间.  时间有38s降到了10s,如果你构建比较频繁,应该还是很有用的.</p>
<h4>3. 异步组件 <a href="https://cn.vuejs.org/v2/guide/components.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6" rel="nofollow noreferrer" target="_blank">官方文档</a>
</h4>
<p>官方文档是这么介绍的:</p>
<blockquote><p>在大型应用中，我们可能需要将应用拆分为多个小模块，按需从服务器下载。为了让事情更简单， Vue.js 允许将组件定义为一个工厂函数，动态地解析组件的定义。Vue.js 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。</p></blockquote>
<p>修改router</p>
<p>before：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import search from './search.vue'
{
            path: '/search',
            name: 'search',
            component: search
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> search <span class="hljs-keyword">from</span> <span class="hljs-string">'./search.vue'</span>
{
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/search'</span>,
            <span class="hljs-attr">name</span>: <span class="hljs-string">'search'</span>,
            <span class="hljs-attr">component</span>: search
}</code></pre>
<p>after：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const search = resolve => require(['./search.vue'], resolve);
{
            path: '/search',
            name: 'search',
            component: search
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> search = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'./search.vue'</span>], resolve);
{
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/search'</span>,
            <span class="hljs-attr">name</span>: <span class="hljs-string">'search'</span>,
            <span class="hljs-attr">component</span>: search
}</code></pre>
<p>具体我们来看看改造后的效果:<br><span class="img-wrap"><img data-src="/img/bVQipH?w=728&amp;h=145" src="https://static.alili.tech/img/bVQipH?w=728&amp;h=145" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>因为我的项目目前只有7个页面,即使把页面都做成异步加载,效果并不是很'喜人',整体缩小了30kb.</p>
<h4>4. 优化组件加载时机</h4>
<p>再使用别人的组件时,上手教程都会提示让你在main.js里注册一下就好.当然这是最省事的办法.<br>但是根据项目情况,比如我的项目用到了vue-baidu-map.<br>如果你按照默认的加载方式,vue-baidu-map是会被打在vendor.js .但其实这个组件我只有某个二级页面才使用.所以让我们来调整一下加载位置看看.把注册的vue-baidu-map放在真正使用它的地方.</p>
<p><span class="img-wrap"><img data-src="/img/bVQiuF?w=722&amp;h=147" src="https://static.alili.tech/img/bVQiuF?w=722&amp;h=147" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这样,verdor.js 又小了56kb.因为首页根本用不到vue-baidu-map. 当然这样会带来一个问题:当多个页面使用vue-baidu-map,会出现多个页面重复打包.</p>
<p><span class="img-wrap"><img data-src="/img/bVQixp?w=1916&amp;h=977" src="https://static.alili.tech/img/bVQixp?w=1916&amp;h=977" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>怎么异步加载插件,这个我还没搞明白...</p>
<h4>5. webpack-bundle-analyzer</h4>
<p>webpack-bundle-analyzer是用来分析 Webpack 生成的包体组成并且以可视化的方式反馈给开发者的工具.你可以通过命令:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build --report" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-built_in">run</span> build <span class="hljs-comment">--report</span></code></pre>
<p>来查看依赖关系.然后再根据具体情况划分代码块.效果图就是上面那张花里胡哨的图...它清楚的告诉你了打包时模块划分的情况.</p>
<h4>6. 前后对比:</h4>
<p><span class="img-wrap"><img data-src="/img/bVQh4x?w=729&amp;h=103" src="https://static.alili.tech/img/bVQh4x?w=729&amp;h=103" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVQiuF?w=722&amp;h=147" src="https://static.alili.tech/img/bVQiuF?w=722&amp;h=147" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>638.7kb vs 286.2kb  <br>这还是在未开启gzip的情况下.</p>
<p>新增一张开启gzip的截图,84.8kb,相对最后的优化结果286.2kb是70%的压缩比...哈哈<br><span class="img-wrap"><img data-src="/img/bVQlGy?w=677&amp;h=146" src="https://static.alili.tech/img/bVQlGy?w=677&amp;h=146" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">总结</h3>
<ol>
<li><p>在使用ui库时,尽量使用按需加载方式.</p></li>
<li><p>异步加载,官方文档很详尽,改造起来也不难,可以试试</p></li>
<li><p>合理规划三方库的引用.这个听起来有点龟毛,'收益'可能也不是很高,不过是个调整方向</p></li>
<li><p>善用webpack-bundle-analyzer优化项目依赖</p></li>
<li><p>服务端开启 gzip压缩,谁用谁知道！</p></li>
</ol>
<p>如果你能看到这,十分感谢你赏脸听一个android开发bb前端开发? .</p>
<h3 id="articleHeader4">参考</h3>
<ul>
<li><p><a href="https://segmentfault.com/r/1250000009352622?shareId=1210000009352623">Vue SPA(单页应用)首屏优化实践</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005969643" target="_blank">Webpack的dll功能</a></p></li>
<li><p><a href="https://cn.vuejs.org/v2/guide/components.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6" rel="nofollow noreferrer" target="_blank">vue官方文档-异步组件</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue首屏加载优化

## 原文链接
[https://segmentfault.com/a/1190000010042512](https://segmentfault.com/a/1190000010042512)

