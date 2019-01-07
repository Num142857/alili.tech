---
title: '为了vue-cli spa项目优化首屏所做的事情' 
date: 2019-01-07 2:30:10
hidden: true
slug: nhqq7i3ibq
categories: [reprint]
---

{{< raw >}}

                    
<p>第一次写 vue spa项目，但是在实践的过程发现了很多坑，这篇文章主要讲述的是spa项目首屏加载过慢的大坑。<br>在webpack的配置中，在打包的过程中，会将所有的库都打包到vendor.js中，所以导致了vendor.js这包过大，而页面要想出现数据必须在vendor.js加载完成以后，所以后面所做的努力基本就是想办法把vendor.js的体积变小。</p>
<h3 id="articleHeader0">1.externals</h3>
<p>在webpack.base.conf.js这个文件中，module.exports输出的对象里面加一个key 叫做 externals,配置如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.base.conf.js
 externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios',
        // 'vue-lazyload': 'VueLazyload',
        'moment': 'moment',
        // 'element-ui': 'element-ui'
    }
//index.html
    <script src=&quot;//cdn.bootcss.com/vue/2.2.5/vue.min.js&quot;></script>
    <script src=&quot;//cdn.bootcss.com/vue-router/2.3.0/vue-router.min.js&quot;></script>
    <script src=&quot;https://cdn.bootcss.com/axios/0.16.2/axios.min.js&quot;></script>
    <!-- <script src=&quot;https://cdn.bootcss.com/axios/0.11.0/axios.min.js&quot;></script> -->
    <!-- <script src=&quot;https://unpkg.com/vue-lazyload/vue-lazyload.js&quot;></script> -->
    <script src=&quot;https://cdn.bootcss.com/moment.js/2.18.1/moment.js&quot;></script>
    <script src=&quot;https://cdn.bootcss.com/element-ui/1.3.7/index.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//webpack.base.conf.js</span>
 externals: {
        <span class="hljs-string">'vue'</span>: <span class="hljs-string">'Vue'</span>,
        <span class="hljs-string">'vue-router'</span>: <span class="hljs-string">'VueRouter'</span>,
        <span class="hljs-string">'vuex'</span>: <span class="hljs-string">'Vuex'</span>,
        <span class="hljs-string">'axios'</span>: <span class="hljs-string">'axios'</span>,
        <span class="hljs-comment">// 'vue-lazyload': 'VueLazyload',</span>
        <span class="hljs-string">'moment'</span>: <span class="hljs-string">'moment'</span>,
        <span class="hljs-comment">// 'element-ui': 'element-ui'</span>
    }
<span class="hljs-comment">//index.html</span>
    &lt;script src=<span class="hljs-string">"//cdn.bootcss.com/vue/2.2.5/vue.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script src=<span class="hljs-string">"//cdn.bootcss.com/vue-router/2.3.0/vue-router.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script src=<span class="hljs-string">"https://cdn.bootcss.com/axios/0.16.2/axios.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;!-- <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/axios/0.11.0/axios.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span> --&gt;
    <span class="xml"><span class="hljs-comment">&lt;!-- &lt;script src="https://unpkg.com/vue-lazyload/vue-lazyload.js"&gt;&lt;/script&gt; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/moment.js/2.18.1/moment.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/element-ui/1.3.7/index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>externals的左边是给 require用的 ,右边是给全局调用的。建议使用bootcdn，相对来说算是比较快的cdn了。<br>还有一种是dll打包，目前没有实践过，下次可以试试。</p>
<h3 id="articleHeader1">2.开启gzip</h3>
<p>后端用的是nginx，稍微配置即可开启gzip</p>
<blockquote><p>sudo nano /etc/nginx/nginx.conf<br>在Gzip Settings里加入：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gzip on;
gzip_min_length 1k;
gzip_buffers 4 16k;
gzip_comp_level 5;
gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>gzip <span class="hljs-keyword">on</span>;
gzip_min_length <span class="hljs-number">1</span>k;
gzip_buffers <span class="hljs-number">4</span> <span class="hljs-number">16</span>k;
gzip_comp_level <span class="hljs-number">5</span>;
gzip_types <span class="hljs-built_in">text</span>/plain <span class="hljs-built_in">application</span>/x-javascript <span class="hljs-built_in">text</span>/css <span class="hljs-built_in">application</span>/xml <span class="hljs-built_in">text</span>/javascript <span class="hljs-built_in">application</span>/x-httpd-php;</code></pre>
<p>开启了以后，js、css相关的代码可以压缩将近5倍的体积。</p>
<h3 id="articleHeader2">3.开启路由懒加载</h3>
<p>开启了以后不同的路由组件可以分成不同的代码，从而实现进入相应页面以后才加载相关代码。<br>在官方文档中有相关实现的代码，很简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引入的时候改成懒加载的形式
const admin = resolve => require(['../views/admin.vue'], resolve);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//引入的时候改成懒加载的形式</span>
<span class="hljs-keyword">const</span> admin = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'../views/admin.vue'</span>], resolve);</code></pre>
<h3 id="articleHeader3">4.bundleAnalyzerReport检测包的情况</h3>
<p>在config/index.js中一个相关插件叫做bundleAnalyzerReport，上面有几行注释，讲的是只要在打包的时候输入npm run build --report,就可以在打包的同时查看每个打包生成的js，里面的库的构成情况，方便我们进行相关的删减，比如有的库太大了，是否可以自己实现，有的库是否有必要，可否删除之类。</p>
<h3 id="articleHeader4">5.服务端加载</h3>
<p>额，这个太难搞了，刚入行node.js只会npm这一点相关知识，以后有空要好好学学，听说通过nuxt.js是比较容易上手，还得以后慢慢实践。毕竟首屏加载，seo优化都得靠SSR(service side render)了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为了vue-cli spa项目优化首屏所做的事情

## 原文链接
[https://segmentfault.com/a/1190000010410051](https://segmentfault.com/a/1190000010410051)

