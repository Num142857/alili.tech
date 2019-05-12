---
title: 'Vue.js开发的读书WebAPP' 
date: 2019-01-08 2:30:11
hidden: true
slug: y03e48pyms8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>初学Vue.js，官网的文档写的很清楚，看着不难。俗话说：光说不练假把式。程序猿学个新东西还是要敲出来看看效果比较好。最开始是想搞个音乐类的，毕竟天天都会听歌，但发现搞音乐类的太多了，我再搞个多没意思。考虑了一下，还是搞个看书的吧，这个还是很少有人搞的。找了找发现只有追书神器的api暴露出来了，起点之类的api找不到。最终效果因为api数据的限制，参考了起点中文网app、起点中文网web端，以及追书神器web端，再加上自己的一些想法搞出来的。项目中的小图标使用的是<a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">阿里巴巴的矢量图标库Iconfont</a>。</p>
<h2 id="articleHeader1">技术栈</h2>
<p>Vue2 + vuex + vue-router + webpack + ES6 + axios + sass</p>
<h2 id="articleHeader2">源码地址</h2>
<p><a href="https://github.com/XNAL/ReadMore" rel="nofollow noreferrer" target="_blank">https://github.com/XNAL/ReadMore</a></p>
<h2 id="articleHeader3">项目运行</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/XNAL/ReadMore
cd ReadMore
npm install

npm run dev（本地运行 访问：http://localhost:8080）

npm run build （部署上线 生成的dist文件夹放到服务器中即可：需要配置代理，如使用nginx，可参考下面问题中的配置）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>git clone https://github.com/XNAL/ReadMore
cd ReadMore
npm install

npm <span class="hljs-keyword">run</span><span class="bash"> dev（本地运行 访问：http://localhost:8080）
</span>
npm <span class="hljs-keyword">run</span><span class="bash"> build （部署上线 生成的dist文件夹放到服务器中即可：需要配置代理，如使用nginx，可参考下面问题中的配置）</span></code></pre>
<h2 id="articleHeader4">说明</h2>
<ul>
<li>目前只做了第一个版本，还存在一些需要进行优化的细节问题，后续会继续进行维护更新。如果发现什么问题，也欢迎跟我联系反馈。</li>
<li>如果觉得做的还行，对您有所帮助，欢迎“start”一下。</li>
</ul>
<h2 id="articleHeader5">开发中遇到的一些问题</h2>
<ul><li>多个子组件循环，父组件如何处理加载状态（精选页面）</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="每个子组件加载完后是同`this.$emit`通知父组件，父组件判断所有子组件加载完成后隐藏loading。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code style="word-break: break-word; white-space: initial;">每个子组件加载完后是同`this.$emit`通知父组件，父组件判断所有子组件加载完成后隐藏loading。</code></pre>
<ul><li><h4>跳转页面后active标记</h4></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="最开始使用url.indexOf来处理，后来直接发现vue-router的exact属性更好用。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code style="word-break: break-word; white-space: initial;">最开始使用url.indexOf来处理，后来直接发现vue-router的<span class="hljs-built_in">exact</span>属性更好用。</code></pre>
<ul><li><h4>调用第三方api接口时跨域的问题</h4></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 本地使用proxyTbale

    在config/index.js中添加配置：
    
    '/api': {
        target: 'http://api.zhuishushenqi.com',
        changeOrigin: true,
        pathRewrite: {                
            '^/api': ''
        }   
    }
    

2. 部署服务器后通过nginx代理

    nginx中配置：
    
    location /api/ {
            proxy_pass http://api.zhuishushenqi.com/;
        }

3. 调用接口时只需要以`/api`开头就可以" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-number">1.</span> 本地使用proxyTbale

    在config/index.js中添加配置：
    
    <span class="hljs-string">'/api'</span>: {
<span class="hljs-symbol">        target:</span> <span class="hljs-string">'http://api.zhuishushenqi.com'</span>,
<span class="hljs-symbol">        changeOrigin:</span> <span class="hljs-literal">true</span>,
<span class="hljs-symbol">        pathRewrite:</span> {                
            <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
        }   
    }
    

<span class="hljs-number">2.</span> 部署服务器后通过nginx代理

    nginx中配置：
    
    location <span class="hljs-regexp">/api/</span> {
            proxy_pass <span class="hljs-string">http:</span><span class="hljs-comment">//api.zhuishushenqi.com/;</span>
        }

<span class="hljs-number">3.</span> 调用接口时只需要以`/api`开头就可以</code></pre>
<ul><li><h4>服务器部署后vue-router的虚拟路由在刷新时出现404页面</h4></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="修改nginx配置：

location / {
        try_files $uri $uri/ @router;          //增加的内容
        root /home/don/book;
        index index.html;
}
    
location @router {                          //增加的内容
    rewrite ^.*$ /index.html last;          //增加的内容
}                                           //增加的内容" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs glsl"><code>修改nginx配置：

<span class="hljs-keyword">location</span> / {
        try_files $uri $uri/ @router;          <span class="hljs-comment">//增加的内容</span>
        root /home/don/book;
        <span class="hljs-keyword">index</span> <span class="hljs-keyword">index</span>.html;
}
    
<span class="hljs-keyword">location</span> @router {                          <span class="hljs-comment">//增加的内容</span>
    rewrite ^.*$ /<span class="hljs-keyword">index</span>.html last;          <span class="hljs-comment">//增加的内容</span>
}                                           <span class="hljs-comment">//增加的内容</span></code></pre>
<h2 id="articleHeader6">访问地址</h2>
<ul>
<li>
<a href="http://www.tdon.site/read-more/" rel="nofollow noreferrer" target="_blank">请访问地址：http://www.tdon.site/read-more/</a>（pc端请用chrome手机模式预览）</li>
<li>扫描下面的二维码</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV0Sfr?w=300&amp;h=300" src="https://static.alili.tech/img/bV0Sfr?w=300&amp;h=300" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">部分截图</h2>
<h4>我的书架</h4>
<p><span class="img-wrap"><img data-src="/img/bVQ4j5?w=468&amp;h=836" src="https://static.alili.tech/img/bVQ4j5?w=468&amp;h=836" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVQ4j7?w=470&amp;h=838" src="https://static.alili.tech/img/bVQ4j7?w=470&amp;h=838" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>精选</h4>
<p><span class="img-wrap"><img data-src="/img/bVQ4kj?w=469&amp;h=836" src="https://static.alili.tech/img/bVQ4kj?w=469&amp;h=836" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>分类</h4>
<p><span class="img-wrap"><img data-src="/img/bVQ4kl?w=471&amp;h=833" src="https://static.alili.tech/img/bVQ4kl?w=471&amp;h=833" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVQ4kn?w=470&amp;h=837" src="https://static.alili.tech/img/bVQ4kn?w=470&amp;h=837" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVQ4ks?w=471&amp;h=837" src="https://static.alili.tech/img/bVQ4ks?w=471&amp;h=837" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>排行</h4>
<p><span class="img-wrap"><img data-src="/img/bVQ4kz?w=469&amp;h=837" src="https://static.alili.tech/img/bVQ4kz?w=469&amp;h=837" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>书籍详情</h4>
<p><span class="img-wrap"><img data-src="/img/bVQ4jZ?w=470&amp;h=836" src="https://static.alili.tech/img/bVQ4jZ?w=470&amp;h=836" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>看书</h4>
<p><span class="img-wrap"><img data-src="/img/bVQ4kD?w=469&amp;h=834" src="https://static.alili.tech/img/bVQ4kD?w=469&amp;h=834" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVQ4kE?w=466&amp;h=835" src="https://static.alili.tech/img/bVQ4kE?w=466&amp;h=835" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVQ4kH?w=471&amp;h=833" src="https://static.alili.tech/img/bVQ4kH?w=471&amp;h=833" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVQ4kJ?w=469&amp;h=836" src="https://static.alili.tech/img/bVQ4kJ?w=469&amp;h=836" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>搜索</h4>
<p><span class="img-wrap"><img data-src="/img/bVQ4kM?w=468&amp;h=833" src="https://static.alili.tech/img/bVQ4kM?w=468&amp;h=833" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVQ4kQ?w=469&amp;h=839" src="https://static.alili.tech/img/bVQ4kQ?w=469&amp;h=839" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js开发的读书WebAPP

## 原文链接
[https://segmentfault.com/a/1190000010225892](https://segmentfault.com/a/1190000010225892)

